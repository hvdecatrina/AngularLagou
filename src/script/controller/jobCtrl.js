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