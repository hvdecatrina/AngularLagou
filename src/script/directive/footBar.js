'use strict'

angular.module('app').directive('appFootBar' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/footBar.html'
	}
}])