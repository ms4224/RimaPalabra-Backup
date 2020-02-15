(function () {
	'use strict';

	angular.module('rimador')
		.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider'];

	function RoutesConfig($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/rimador/{language}',
				templateUrl: 'src/home/home.html',
				controller: 'HomeController as HomeCtrl',
				resolve: {
					language: ['$stateParams', function ($stateParams) {
						return $stateParams.language;
					}]
				}
			})
	}





})();//end IIFE