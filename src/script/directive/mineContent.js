'use strict'

angular.module('app').directive('appMineContent' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/mineContent.html'
	}
}])