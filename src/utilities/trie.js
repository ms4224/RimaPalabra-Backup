

//going to attempt to make a trie
//each node needs to have 
// 1. children chars: if the node signifies the end of a string, it should have an index value (this give sthe proper index of the word in the alphabetized array)
// 2. the root will be empty, just an object consisting of its children nodes


function trie() {
	this.root = { parent: 0 };
}

trie.prototype.add = function (word, listIndex) {
	var curNode = this.root;
	word = cleanString(word);

	for (var i = word.length - 1; i >= 0; i--) {
		//if current char child node does not exist, create it
		if (!(word[i] in curNode)) {
			curNode[word[i]] = { parent: curNode };
		}
		//make the current node the next node
		curNode = curNode[word[i]];
	}//end for loop

	//signal the end of the word in the nodes
	curNode.listIndex = listIndex;
}

trie.prototype.search = function (word) {
	var curNode = this.root;
	word = cleanString(word);

	//traverse the trie through the word (backwards)
	for (var i = word.length - 1; i >= 0; i--) {
		if (!(word[i] in curNode)) {//if the next char does not exist, return the index of current node or nearest parent node
			//if index exists
			return findNearestIndex(curNode);

		}
		//go to next node
		curNode = curNode[word[i]];
	}

	return findNearestIndex(curNode);
}


var findNearestIndex = function (node) {
	var curNode = node;

	if ('listIndex' in curNode) { return curNode.listIndex }
	else {
		var nodeProperties = Object.keys(curNode);//go to the next node that has a character (it will get the first possible, which will be the lowest in the alphabet, or 'parent', in which case we go to the next one)
		if (nodeProperties[0] == "parent") {
			curNode = curNode[nodeProperties[1]];
		}
		else {
			curNode = curNode[nodeProperties[0]];
		}
		return findNearestIndex(curNode);
	}
}

var cleanString = function (word) {
	var cleanWord = '';
	//remove ! and ' '
	word = word.replace('!', '');
	word = word.replace('¡', '');
	word = word.replace(' ', '');
	word = word.replace('-', '');
	word = word.replace('?', '');
	//make capital letters lowercase
	for (var i = 0; i < word.length; i++) {
		var num = word.charCodeAt(i);
		//check for normal capital letters, convert to lowercase
		if ((num >= 65) && (num <= 90)) {
			num += 32;
		}

		//convert accented capitals to lowercase capitals, a, e, i, o, u, y
		if ((num == 225) || (num == 193)) { num = 225; };
		if ((num == 233) || (num == 201)) { num = 233; };
		if ((num == 237) || (num == 205)) { num = 237; };
		if ((num == 243) || (num == 211)) { num = 243; };
		if ((num == 250) || (num == 218)) { num = 250; };
		if ((num == 253) || (num == 221)) { num = 253; };
		//egne
		if ((num == 241) || (num == 209)) { num = 241 };

		//double dotted a, o, u
		if ((num == 228) || (num == 196)) { num = 228; };//a//place after accented version of same character
		if ((num == 246) || (num == 214)) { num = 246; };//o
		if ((num == 252) || (num == 220)) { num = 252; };//u



		//add cleaning letter to cleanWord
		cleanWord += String.fromCharCode(num);
	}//end for loop

	return cleanWord;
}


// var myTrie = new trie();

// myTrie.add('yolo', 2);
// console.log('myTrie', myTrie);
// var index = myTrie.search('yolo');
// console.log('index', index);

