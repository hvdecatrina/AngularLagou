'use strict'

angular.module('app').directive('appCompanyCategory' , [function () {
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/companyCategory.html',
		scope : {
			com : "="
		},
		link : function ($scope) {
			$scope.showTypeList = function (id) {
				if($scope.com.jobCategory[id].num === 0){
					return;
				}else{
					$scope.isActive = id;
					$scope.typelist = $scope.com.jobCategory[id].typelist;	
				}
			};
			$scope.$watch('com' , function (newVal) {
				if(newVal){
					var arr = $scope.com.jobCategory;
					for(var i = 0 , len = arr.length; i < len ; i++){
						if(arr[i].num > 0){
							$scope.showTypeList(i);
							break;
						}
					}
				}
			})	
		}
	}
}])