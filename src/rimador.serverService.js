(function () {
	'use strict';

	angular.module('rimador')
		.service('serverService', serverService);

	serverService.$inject = ['$http', '$timeout']
	function serverService($http, $timeout) {

		this.getServerData = function () {

			return $http({
				method: 'GET',
				url: 'REMOVING THIS FOR PUBLIC GITHUB'
			})

		}//end get serverData


	}





})();//end IIFE