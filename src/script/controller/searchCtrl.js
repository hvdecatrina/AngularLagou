'use strict'

angular.module('app').controller('searchCtrl' , ['ajax' , '$scope' , function (ajax , $scope) {
	ajax.getData("data/city.json")
		.then(function (res) {
			$scope.citylist = res.data.data;
		})
}])