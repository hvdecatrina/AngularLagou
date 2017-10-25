'use strict'

angular.module('app').controller('companyCtrl' , [ 'ajax' , '$scope' , '$state' , function (ajax , $scope , $state) {
		ajax.getData('data/company.json' , {
			id : $state.params.id
		}).then( function (res) {
			$scope.company = res.data.data[$state.params.id-1]
		})
		$scope.cc  = {
			"bol" : false,
			"ts" : 'textStyle'
		}
}])