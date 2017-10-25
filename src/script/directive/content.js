'use strict'

angular.module('app').directive('appContent' , ['$filter' , '$timeout', 'ajax' , 'dealUtil' , 'cache' , function ($filter,$timeout,ajax,dealUtil,cache) {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/content.html',
		link : function($scope) {
			if(cache.get("name")){
				$scope.goLogin = "编辑";
			}else{
				$scope.goLogin = "去登陆";
			}
			$scope.pagenum = 1;
			$scope.isLoadShow = false;
			$scope.sortData = function (data) {
				// 获取数据长度
				$scope.listLen = data.length;
				// 计算总加载次数
				$scope.total = Math.ceil($scope.listLen / 10);
				if($scope.total <= 1){
					$scope.isLoadShow = false;
				}else{
					$scope.isLoadShow = true;
				}
				// 将原始数据打乱顺序
				$scope.newData = dealUtil.shuffle(data);
				// 截取乱序后的前十个数
				$scope.list = $scope.newData.slice(0,10 * $scope.pagenum);
				// 按公司id再次排序
				$scope.list.sort(function(a,b){
					return a.companyId-b.companyId;
				});
			};
			$scope.loadHandler = function () {
				$scope.pagenum++;
				if($scope.pagenum > $scope.total) return;				
				$scope.piece = $scope.newData.slice(10 * ($scope.pagenum-1),10 * $scope.pagenum);
				$scope.piece.sort(function(a,b){
					return a.companyId-b.companyId;
				});
				$scope.list = $scope.list.concat($scope.piece);
				if($scope.pagenum == $scope.total) {
					var el = angular.element(document.querySelector(".more"));
					$timeout(function(){
						el.html("没有更多加载");
					},600)
				}
			};
			ajax.getData("data/position.json").then(function(result){
				$scope.oldData = result.data.data;
				$scope.$watch('filterObj' , function (newdata,olddata){
					if(newdata){
						if(Object.getOwnPropertyNames(newdata).length == 1 && newdata.hasOwnProperty("city")){
							return;
						}else{
							$scope.filter = $filter("searchFilter")($scope.oldData,newdata);
							$scope.sortData($scope.filter);
							$scope.loadMore = $scope.loadHandler;
						}					
					}else {
						$scope.sortData($scope.oldData);
						$scope.loadMore = $scope.loadHandler;
					}
				},true)	
			});
		}
	}
}])