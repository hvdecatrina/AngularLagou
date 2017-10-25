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