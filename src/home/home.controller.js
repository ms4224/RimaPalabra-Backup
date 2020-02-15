(function () {
	'use strict';

	angular.module('rimador')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['language'];

	function HomeController(language) {
		var HomeCtrl = this;
		HomeCtrl.language = language;
		HomeCtrl.message;
		HomeCtrl.disclaimer;
		var english_message = 'This spanish rhyming dictionary is intended for those technically-minded poets.  When searching for a rhyme, the result will point to the closest possible match in all of the spanish dictionary.  Then, you can scroll up or down to see which words in the dictionary also rhyme, or are a close rhyme to the word.  NO WORD from the spanish language is left out!  Amazing right?  If you are looking for that perfect word but it does not quite rhyme, you can keep scrolling up or down to find a word that rhymes a bit less, but might be just what you are looking for.  Enjoy!'
		var spanish_message = 'Este diccionario de rima está destinado a aquellos poetas con mentalidad técnica. Al buscar una rima, el resultado apuntará a la coincidencia más cercana posible en todo el diccionario español. Luego, puede desplazarse hacia arriba o hacia abajo para ver qué palabras del diccionario también riman, o son una rima cercana a la palabra. NINGUNA PALABRA del idioma español queda fuera! Increíble ¿verdad? Si busca la palabra perfecta pero no rima, puede seguir desplazándose hacia arriba o hacia abajo para encontrar una palabra que rima un poco menos, pero podría ser justo lo que está buscando.'
		var english_disclaimer = 'This rimador works best with Google Chrome Browser'
		var spanish_disclaimer = 'Este rimador funciona de manera óptima con el navegador Google Chrome'

		if (language == 'english') {
			HomeCtrl.message = english_message;
			HomeCtrl.disclaimer = english_disclaimer;
		}

		else if (language == 'spanish') {
			HomeCtrl.message = spanish_message;
			HomeCtrl.disclaimer = spanish_disclaimer;
		}

		else {
			HomeCtrl.message = spanish_message;
			HomeCtrl.disclaimer = spanish_disclaimer;
		}


	}




})();//end IIFE