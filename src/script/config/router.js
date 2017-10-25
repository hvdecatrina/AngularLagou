'use strict'
// 显示申明的方式,隐式声明的方式会对压缩产生影响，但可用插件转为显示声明的方式
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$stateProvider
		.state('main' , {
			url : '/main',
			templateUrl : 'view/main.html',
			controller : 'mainCtrl'
		})
		.state('job' , {
			url : '/job/:id',
			templateUrl : 'view/job.html',
			controller : 'jobCtrl'
		})
		.state('company' , {
			url : '/company/:id',
			templateUrl : 'view/company.html',
			controller : 'companyCtrl'
		})
		.state('search' , {
			url : '/search',
			templateUrl : 'view/search.html',
			controller : 'searchCtrl'
		})
		.state('mine' , {
			url : '/mine',
			templateUrl : 'view/mine.html',
			controller : 'mineCtrl'
		})
		.state('login' , {
			url : '/login',
			templateUrl : 'view/login.html',
			controller : 'loginCtrl'
		})
		.state('register' , {
			url : '/register',
			templateUrl : 'view/register.html',
			controller : 'registerCtrl'
		})
	$urlRouterProvider.otherwise('main')
}])