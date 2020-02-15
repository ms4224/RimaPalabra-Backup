

describe('trie.js', function(){



var fullArray = getRimadorList();
console.log(fullArray);
var fullTrie = new trie();
for(var i =0; i<fullArray.length; i++){
	fullTrie.add(fullArray[i], i);
}
console.log('finished writing fullTrie');


it('fullDictionary Trie test, return correr', function(){
	var resultIndex = fullTrie.search('orrer');
	expect(fullArray[resultIndex]).toBe('correr');
})

it('fullDictionary Trie test, return manceba', function(){
	var resultIndex = fullTrie.search('manceba');
	expect(fullArray[resultIndex]).toBe('manceba');
})


})//end describe trie


describe('cleanString helper function for trie', function(){
	var test = 'YOLO';

	it('should return lowercase yolo', function(){
		var result = cleanString(test);
		expect(result).toBe('yolo');
	})

	it('should return lowercase yolo', function(){
		expect(cleanString('yOlO')).toBe('yolo');
	})
})