'use strict'

angular.module("app").service('ajax' , ['$http' , '$q' , function ($http , $q) {
	this.getData = function (url,obj) {
		// 创建一个deferred对象，返回promise对象
		var deferred = $q.defer();
		var promise = deferred.promise;
		$http({
			method : 'get',
			url : url,
			params : obj
		}).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err){
			deferred.reject(err);
		})
		return promise;
	}
}])