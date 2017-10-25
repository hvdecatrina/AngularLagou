'use strict'
/*
	1.初始页面
		显示城市名为全国
		显示历史记录列表
		隐藏搜索结果列表
		隐藏城市选项表
	2.交互
		点击城市名：
			显示城市选项表，隐藏其它，选择城市后返回并更改城市名
		返回键：
			返回上级页面
		输入关键字：
			关键字不为空，显示搜索结果，若删除关键字，隐藏搜索结果
			关键字为空，不显示任何变化
		点击历史记录列表，显示搜索结果
		点击职位项，跳转职位页面
		若搜索结果为空显示失败dom
 */
angular.module('app').directive('appSearchContent' , ['$filter' , 'localStorageService' , 'dealUtil' , function ($filter , localStorageService , dealUtil) {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/searchContent.html',
		scope : {
			"city" : "="
		},
		link : function ($scope , $element , $attr){
			// 初始页面显隐变量
			$scope.isShow = true;
			// 是否显示城市
			$scope.isCityShow = false;
			// 是否显示历史
			$scope.isHistoryShow = true;
			// 是否显示职位列表
			$scope.isJobShow = false;
			// 初始城市名为全国
			$scope.cityName = "全国";
			// 搜索关键字过滤对象
			$scope.filterObj = {};
			// 获取搜索历史记录，初始化历史记录列表
			$scope.history = localStorageService.getLocalStorage("history");
			// 页面显隐控制变量
			$scope.boolA = ["isJobShow","isHistoryShow","isEmpty"];
			// 过滤对象的属性
			$scope.attrA = ["city","jobName","company"];
			// 点击显示城市列表选项
			$scope.showCityList = function () {
				$scope.isCityShow = true;
			};
			// 隐藏城市列表选项
			$scope.hideCityList = function () {
				$scope.isCityShow = false;
			};
			// 点击搜索事件
			$scope.search = function () {
				if($scope.val){
					// 关键字不为空
					// 设置过滤参数
					$scope.setAttr($scope.filterObj,$scope.attrA,[$scope.cityName,$scope.val,$scope.val]);
					// 存储历史记录值并去重
					$scope.history.unshift($scope.val); 
					$scope.history = $filter("uniqueArry")($scope.history);
					// 设置页面显隐
					$scope.sEvent();				
				}else{
					// 关键字为空
					// 设置页面显隐
					$scope.setAttr($scope,$scope.boolA,[false,true,false]);
				};
				if($scope.history.length > 6){
					// 历史记录最大为6
					$scope.history.pop()
				};
				// 保存历史记录到本地
				localStorageService.removeLocalStorage("history");
				localStorageService.setLocalStorage("history",$scope.history)
			};
			// 点击城市列表获取城市名
			$scope.getCity = function (it) {
				$scope.isCityShow = false;
				$scope.cityName = it;
				$scope.filterObj.city = it;
			};
			$scope.$watch('val' , function (newdata , olddata){
				if(!newdata){
					$scope.setAttr($scope,$scope.boolA,[false,true,false]);
					$scope.delAttr($scope.filterObj,["jobName","company"])
				}
			});
			$scope.hisClick = function (item) {
				$scope.setAttr($scope.filterObj,$scope.attrA,[$scope.cityName,item,item]);
				$scope.sEvent()
				$scope.val = item;
			}
			// 搜索成功事件
			$scope.sEvent = function () {
				$scope.$watch('filter' , function (newdata , olddata){
					if(newdata.length != 0){
						$scope.setAttr($scope,$scope.boolA,[true,false,false]);
					}else{
						$scope.setAttr($scope,$scope.boolA,[false,false,true]);
					}
				})		
			}
			$scope.delAttr = function (obj,arr) {
				for(var i = 0 ; i < arr.length ; i++){
					delete obj[arr[i]];
				}
			};
			$scope.setAttr = function (obj,name,value){
				for(var i = 0 ; i < name.length ; i++){
					obj[name[i]] = value[i]
				}
			};
			$scope.delHis = function ($event,item) {
				$event.stopPropagation();
				dealUtil.removeItem($scope.history,item);
				localStorageService.removeLocalStorage("history");
				localStorageService.setLocalStorage("history",$scope.history)
			}
		}
	}	
}])