(function () {
	'use strict';

	angular.module('rimador', ['ui.router'])
		.config(RoutesConfig);

	RoutesConfig.$inject = ['$urlRouterProvider'];

	function RoutesConfig($urlRouterProvider) {

		$urlRouterProvider.otherwise('/rimador/spanish');//default state is /



	};





})();//end IIFE