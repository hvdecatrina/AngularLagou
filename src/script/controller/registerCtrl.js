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