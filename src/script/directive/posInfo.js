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