'use strict'

angular.module('app' , ['ui.router' ,'ngSanitize' , 'ngCookies'])
'use strict';
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate.get(url).then(function(resp) {
        def.resolve(resp);
      }).catch(function(err) {
        def.reject(err);
      });
      return {
        then: function(cb){
          def.promise.then(cb);
        },
        catch: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);
'use strict'
// 显示申明的方式,隐式声明的方式会对压缩产生影响，但可用插件转为显示声明的方式
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$stateProvider
		.state('main' , {
			url : '/main',
			templateUrl : 'view/main.html',
			controller : 'mainCtrl'
		})
		.state('job' , {
			url : '/job/:id',
			templateUrl : 'view/job.html',
			controller : 'jobCtrl'
		})
		.state('company' , {
			url : '/company/:id',
			templateUrl : 'view/company.html',
			controller : 'companyCtrl'
		})
		.state('search' , {
			url : '/search',
			templateUrl : 'view/search.html',
			controller : 'searchCtrl'
		})
		.state('mine' , {
			url : '/mine',
			templateUrl : 'view/mine.html',
			controller : 'mineCtrl'
		})
		.state('login' , {
			url : '/login',
			templateUrl : 'view/login.html',
			controller : 'loginCtrl'
		})
		.state('register' , {
			url : '/register',
			templateUrl : 'view/register.html',
			controller : 'registerCtrl'
		})
	$urlRouterProvider.otherwise('main')
}])
'use strict'

angular.module('app').controller('companyCtrl' , [ 'ajax' , '$scope' , '$state' , function (ajax , $scope , $state) {
		ajax.getData('data/company.json' , {
			id : $state.params.id
		}).then( function (res) {
			$scope.company = res.data.data[$state.params.id-1]
		})
		$scope.cc  = {
			"bol" : false,
			"ts" : 'textStyle'
		}
}])
'use strict'

angular.module('app').controller('jobCtrl' , [ 'ajax' , '$scope' , '$state' , function (ajax , $scope , $state) {
	ajax.getData("data/position.json" , {
		id : $state.params.id
	}).then( function (res) {
		$scope.position = res.data.data[res.config.params.id-1];
		return ajax.getData('data/company.json?' , {
			id : $scope.position.companyId
		})
	}).then( function (res) {
		$scope.company = res.data.data[res.config.params.id-1]
	})
	
	$scope.jc = {
		"bol" : true,
		"ts" : ''
	};
}])
'use strict'

angular.module('app').controller('loginCtrl' , ['$scope' , 'cache' , '$state' , function ($scope,cache,$state) {
	$scope.login = function (form) {
		form.$submitted = false;
		if(form.$valid && form.$dirty){
			var key = cache.get("psw");
			if($scope.user.password != key){
				$scope.isPswTrue = true;
			}else{
				$scope.isPswTrue = false;
				cache.put("name",$scope.user.password)
				$state.go("main");
			}
		}else{
			form.$submitted = true;
		}
	};
	$scope.inputType = "password";
	$scope.openEye = function () {
		if($scope.inputType == "password"){
			$scope.inputType = "text";
			$scope.isEyeon = true;
		}else{
			$scope.inputType = "password";
			$scope.isEyeon = false;
		}
	}
}])
'use strict'

angular.module('app').controller('mainCtrl' , ['$scope' , '$timeout' , function ($http , $scope , $timeout) {
	$scope.isShow = false;
}])
'use strict'

angular.module('app').controller('mineCtrl' , [function () {
	
}])
'use strict'

angular.module('app').controller('registerCtrl' , ['$scope' , 'cache' , '$http' , '$state' , function ($scope , cache , $http , $state) {
	$scope.yzmCode = "a 4 4 c"
	$scope.createYZM = function () {
		var numA = [];
		for(var i = 0 ; i < 10 ; i++){
			numA.push(+String.fromCharCode(48+i));
		};
		var letterA = [];
		for(var i = 0 ; i < 26 ; i++){
			letterA.push(String.fromCharCode(65+i));
			letterA.push(String.fromCharCode(97+i));
		};
		var arr = numA.concat(letterA);
		var yzm = [];
		for(var i = 0 ; i < 4 ; i++){
			yzm.push(arr[Math.floor(Math.random() * 62)])
		};
		$scope.yzmCode = yzm.join(" ");
		cache.remove("yzm");
		cache.put("yzm" , $scope.yzmCode);
	};
	$scope.createYZM();
	$scope.changeYzm = function () {
		$scope.createYZM();
	}
	$scope.signup = function (form) {
		$scope.rForm.$submitted = false;
		if($scope.rForm.$valid && $scope.rForm.$dirty){
			$http.post('data/register.json',$scope.user).then(function (res) {				
				var yzm = cache.get("yzm");
				if($scope.user.vcode.toLowerCase() != yzm.replace(/\s+/g,"").toLowerCase()){
					$scope.isYzmTrue = true;
				}else{
					$scope.isYzmTrue = false;
					$state.go('login');
					cache.remove("psw");
					cache.put("psw" , $scope.user.psw);
				}
			}) 
		}else{
			$scope.rForm.$submitted = true;
		}
	};
}])
'use strict'

angular.module("app").controller('searchContentCtrl' , ['ajax' , '$scope' , function (ajax,$scope) {
	
}])
'use strict'

angular.module('app').controller('searchCtrl' , ['ajax' , '$scope' , function (ajax , $scope) {
	ajax.getData("data/city.json")
		.then(function (res) {
			$scope.citylist = res.data.data;
		})
}])
'use strict'

angular.module('app').directive('appCompanyCategory' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/companyCategory.html',
		scope : {
			com : "="
		},
		link : function ($scope) {
			$scope.showTypeList = function (id) {
				if($scope.com.jobCategory[id].num === 0){
					return;
				}else{
					$scope.isActive = id;
					$scope.typelist = $scope.com.jobCategory[id].typelist;	
				}
			};
			$scope.$watch('com' , function (newVal) {
				if(newVal){
					var arr = $scope.com.jobCategory;
					for(var i = 0 , len = arr.length; i < len ; i++){
						if(arr[i].num > 0){
							$scope.showTypeList(i);
							break;
						}
					}
				}
			})	
		}
	}
}])
'use strict'

angular.module('app').directive('appCompanyInfo' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/companyInfo.html',
		scope : {
			com : "=",
			ds : "="
		}
	}
}])
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
'use strict'

angular.module('app').directive('appFoot' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/foot.html'
	}	
}])
'use strict'

angular.module('app').directive('appFootBar' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/footBar.html'
	}
}])
'use strict'

angular.module('app').directive('appHead' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/head.html'
	};
}])
'use strict'

angular.module('app').directive('appHeadBar' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/headBar.html',
		scope : {
			text : '=',
			isShow : '='
		},
		link : function (scope) {
			scope.back = function () {
				window.history.back();
			}
		}
	}
}])
'use strict'

angular.module('app').directive('appMineContent' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/mineContent.html'
	}
}])
'use strict'

angular.module('app').directive('appPosDesc' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/posDesc.html',
		scope : {
			desc : '='
		}
	}
}])
'use strict'

angular.module('app').directive('appPosInfo' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/posInfo.html',
		scope : {
			pos : "="
		}
	}
}])
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
'use strict'

angular.module('app').filter('searchFilter' , [function () {
	return function (arr , keyObj) {
		var result = [] ;
		angular.forEach(arr , function (item) {
			if(keyObj.city == "全国"){
				if(item.jobName.indexOf(keyObj.jobName) > 0 || item.company == keyObj.company){
					result.push(item)
				}
			}else{
				if(item.city == keyObj.city && (item.jobName.indexOf(keyObj.jobName) > 0 || item.company == keyObj.company)){
					result.push(item)
				}
			}
		})
		return result;
	}
}])
'use strict'

angular.module("app").filter("uniqueArry" , [ function () {
	return function (arr) {
		var obj = {};
		var temp = [];
		for(var len = arr.length , i = len - 1 ; i >= 0 ; i--){
			if(!obj[arr[i]]){
				temp.unshift(arr[i]);
				obj[arr[i]] = 1;
			}
		}
		return temp;
	}
}])
'use strict'

angular.module('app').service('cache' , ['$cookies' , function ($cookies) {
	this.put = function (key , value) {
		$cookies.put(key , value);
	};
	this.get = function (key) {
		return $cookies.get(key);
	};
	this.remove = function (key) {
		$cookies.remove(key);
	}
}])
'use strict'

angular.module("app").service('dealUtil' , [ function () {
	this.shuffle = function (array) {
		var _array = array.concat();
		for (var i = _array.length; i--; ) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = _array[i];
			_array[i] = _array[j];
			_array[j] = temp;
		}
  		return _array;
	};
	this.removeItem = function (arr,item) {
		for(var i = 0 ; i < arr.length ; i++){
			if(arr[i] = item){
				arr.splice(i,1)
				break;
			}
		}
		return arr;
	}
}])
'use strict'

angular.module("app").service('ajax' , ['$http' , '$q' , function ($http , $q) {
	this.getData = function (url,obj) {
		// 创建一个deferred对象，返回promise对象
		var deferred = $q.defer();
		var promise = deferred.promise;
		$http({
			method : 'get',
			url : url,
			params : obj
		}).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err){
			deferred.reject(err);
		})
		return promise;
	}
}])
'use strict'

angular.module("app").service('localStorageService' , ['$window' , function($window){
	this.setLocalStorage = function (key,value) {
		if(typeof value == 'object'){
			$window.localStorage[key] = JSON.stringify(value);
		}else{
			$window.localStorage[key] = value;
		}
	};
	this.getLocalStorage = function (key) {
		if($window.localStorage[key]){		
			return JSON.parse($window.localStorage[key]);
		}
	};
	this.removeLocalStorage = function (key) {
		$window.localStorage.removeItem(key)
	}
}])