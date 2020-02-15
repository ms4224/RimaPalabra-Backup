(function () {
	'use strict';

	angular.module('rimador')
		.service('getListService', getListService);

	function getListService() {
		//var fullList = getRimadorList();
		var fullList = getRimadorListV2();//this new version returns the accents equal to the non-accents
		this.getList = function () { return fullList }
		// console.log(this.fullList);

		var fullTrie = new trie();
		this.getTrie = function () { return fullTrie };

	}



})();//end IIFE