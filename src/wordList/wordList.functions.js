function goToTarget(tracker, wordList, target) {
	$('.dictionary').empty();//clear current list

	initPopulate(tracker, wordList, target);
	scrollToTarget(target, tracker);
}//end goToTarget


function extendListView(tracker, wordList) {
	if (tracker.status != 0) {
		tracker.indexTop -= 1;
		tracker.indexBottom += 1;
		tracker.status = 0;//not accepting scrolls temporarily
		updateBox(wordList, tracker);
		setTimeout(function () { tracker.status = 1 }, 500);//reset the status after .5s
	}//end if
}


function scrollToTarget(target, tracker) {
	// scroll to target
	var id = "#" + target.toString();
	console.log('$(id).position().top supposed position in scroll to target function', $(id).position().top);
	$('.dictionary').animate({ scrollTop: 0 }, 0, 'linear');//to fix the random coordinates bug, resets the coordinates of all elements within .dictionary
	$('.dictionary').animate(//css style, time, easing (linear or swing), callback
		{ scrollTop: $(id).position().top },
		// {scrollTop: 0},
		500,
		'swing',
		function () { tracker.status = 1 }
	);
	//make the target red in background
	$(id).css('background-color', '#C00000');

}//end scrollToTarget


function initPopulate(tracker, wordList, target) {
	//initialize the matching rhymes view based on current target (fill 100 above, 100 below)
	var startIndex = target;
	var top = startIndex - 800;
	var bottom = startIndex + 800;
	for (var i = top; i <= bottom; i++) {
		if ((i >= 0) && (i < wordList.length)) {
			var word = wordList[i];
			var tag = "<p id='" + i.toString() + "'" + ">" + word + "</p>";
			$(".dictionary").append(tag);
		}
	}
	if (top < 0) { top = 0; };
	if (bottom >= wordList.length) { bottom = wordList.length - 1; }
	tracker.indexTop = top;
	tracker.indexBottom = bottom;
	//console.log('finished init, here are the top and bottom ', tracker.indexTop, tracker.indexBottom);
}//end initPopulate



function updateBox(wordList, tracker) {
	var origHeight = $('.dictionary')[0].scrollHeight;

	//append more words to the top and bottom of the list
	var newBottom;
	var newTop;
	for (var i = tracker.indexBottom; (i < (tracker.indexBottom + 20)) && (i < wordList.length); i++) {
		var word = wordList[i];
		var tag = "<p id='" + i.toString() + "'" + ">" + word + "</p>";
		$(".dictionary").append(tag);
		newBottom = i;
	}


	for (var i = tracker.indexTop; (i > (tracker.indexTop - 20)) && (i >= 0); i--) {
		var word = wordList[i];
		var tag = "<p id='" + i.toString() + "'" + ">" + word + "</p>";
		$(".dictionary").prepend(tag);
		newTop = i;
	}


	//**bug fixing the scroll glitch on firefox where when you prepend elements it autoscrolls to top, going to return to saved position
	var newHeight = $('.dictionary')[0].scrollHeight;
	var offset = newHeight - origHeight;
	offset = offset / 2;
	var currentPosition = $('.dictionary').scrollTop()
	if (!(tracker.usingChrome)) {//bug fix if not using chrome
		console.log('not using chrome!')
		$('.dictionary').animate({ scrollTop: (currentPosition + offset) }, 0, 'linear');
	}
	//


	if (newTop == undefined) { newTop = 0 };
	tracker.indexTop = newTop;
	if (newBottom == undefined) { newBottom = wordList.length - 1 };
	tracker.indexBottom = newBottom;
}




function isScrolledIntoView(elem)//this helper function is not used anymore
{
	// var containerTop = $(".dictionary").scrollTop();
	var containerTop = 0;
	var containerBottom = containerTop + $(".dictionary").height();
	var elemTop = $(elem).position().top;
	var elemBottom = elemTop + $(elem).height();
	return ((elemBottom <= containerBottom) && (elemTop >= containerTop));
}