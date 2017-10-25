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