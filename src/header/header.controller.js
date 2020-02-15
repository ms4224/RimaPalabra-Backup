(function () {
	'use strict';

	angular.module('rimador')
		.controller('HeaderController', HeaderController)

	HeaderController.$inject = ['serverService', '$timeout'];

	function HeaderController(serverService, $timeout) {
		var HeaderCtrl = this;
		HeaderCtrl.visits;
		ensureData();

		function ensureData() {
			if (HeaderCtrl.visits == undefined) {
				console.log('data currently empty set. going to talk to server and see if it is ready');
				serverService.getServerData()
					.then(function (res) {
						HeaderCtrl.visits = res.data.visits;
						$timeout(ensureData, 500)//wait 500ms then try again to get data from server (this is to deal with heroku's sleeping server issue, don't want null values on the header dropdowns)
					})
			}//end if

			else {
				console.log('data available!');
			}

		}
		//serverService.getVisits(HeaderCtrl);
	}



})();//end IIFE