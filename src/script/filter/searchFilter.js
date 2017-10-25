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