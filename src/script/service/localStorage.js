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