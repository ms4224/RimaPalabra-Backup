(function () {
	'use strict';

	angular.module('rimador')
		.controller('WordListController', WordListController);

	WordListController.$inject = ['getListService', '$scope'];

	function WordListController(getListService, $scope) {
		var listCtrl = this;
		listCtrl.message = 'yolo';
		var currentSearchTerm;

		listCtrl.$onInit = function () {//initialize the dict list and the searchTrie
			listCtrl.fullList = getListService.getList();
			//set up trie
			listCtrl.searchTrie = getListService.getTrie();
			for (var i = 0; i < listCtrl.fullList.length; i++) {
				listCtrl.searchTrie.add(listCtrl.fullList[i], i);
			}
		}

		//on postLink, initialize the dictionary to point to a, and set up scroll event
		//need tracker to be accessible within the controller's scope
		var tracker = { indexTop: 0, indexBottom: 0, status: 0, currentTarget: 0, usingChrome: false }//status 0 means not initialized, 1 means finished initialization; current target is initialized to 0
		listCtrl.$postLink = function () {
			//check for chrome browsers
			var isChrome = (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
			tracker.usingChrome = isChrome;
			//
			goToTarget(tracker, listCtrl.fullList, tracker.currentTarget)
			$(".dictionary").scroll(function () {//extend endpoints of list on scroll event, only on chrome browser
				if (tracker.usingChrome) {
					extendListView(tracker, listCtrl.fullList)
				}
			})
			//hit enter key event for the button
			$("#searchField").keyup(function (event) {
				if (event.keyCode == 13) {
					$("#searchButton").click();
				}
			});
		}//end postLink

		listCtrl.closestMatch = '';
		listCtrl.latestSearch = '';
		listCtrl.search = function () {

			if (tracker.status == 0) {//safety feature in case the button is still available
				console.log('search not available now');
			}
			else if (listCtrl.searchTerm == undefined) {
				listCtrl.warning = 'The search field is empty';
			}
			else {
				listCtrl.buttonOff();
				tracker.status = 0;//disable scrolling events until new list is initialized
				var searchTerm = listCtrl.searchTerm;
				listCtrl.latestSearch = searchTerm;
				tracker.currentTarget = listCtrl.searchTrie.search(searchTerm);//search for index of closest match to searchTerm, it is the current target
				listCtrl.closestMatch = listCtrl.fullList[tracker.currentTarget];
				goToTarget(tracker, listCtrl.fullList, tracker.currentTarget);
			}
		}//end searchIndex


		//Turning off search button momentarily when you search
		listCtrl.readyForSearch = true;
		$scope.$watch('listCtrl.readyForSearch', function () {
		})

		listCtrl.buttonOff = function () {
			listCtrl.readyForSearch = false;
			setTimeout(function () {
				listCtrl.readyForSearch = true;
				$scope.$apply();
			}, 600);
		}


		function moveContent(px) {
			var top = $('.dictionary').scrollTop();
			$(".dictionary").css("scrollTop", top + px);
		}

		$(document).keydown(function (e) {
			if (e.keyCode == 38) {
				moveContent(-5);
			}
			if (e.keyCode == 40) {
				moveContent(5);
			}
		});

	}//end Controller




})();//end IIFE