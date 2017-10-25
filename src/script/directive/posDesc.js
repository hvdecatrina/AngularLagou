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