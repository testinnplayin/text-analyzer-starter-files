function cleaner(text) { //cleans up given test text
	return text.toLowerCase().replace(/\W[^a-z']/g, ' ').replace(/\./g, '').split(' '); //second replace added because of end period not being selected
}

function createWordObj(arr) {
	var wordFreq = {};

	arr.forEach(function(word) {
		wordFreq[word] = (wordFreq || 0) + 1;
	});

	return wordFreq;
}

function calcLength(arr) {
	return arr.length;
}

function calcUniq(wordFreq) {
	return Object.keys(wordFreq).length;
}

function calcAvWordLng(wordFreq) {
	var wordLngArr = [];
	var words = Object.keys(wordFreq);
	var lng = words.length;

	for (var word of words) {
		wordLngArr.push(word.length);
	}

	return wordLngArr.reduce(function(a, b) {
		return (a + b);
	}) / lng;
	
}

function displayData(select, f) {
	$(select).empty().append("<dd>" + f + "</dd>");
}

function handleSubmit() {
	$('button[type="submit"]').click(function(e) {
		e.preventDefault();
		
		var crudeText, cleanedText, wordObj;

		crudeText = $('#user-text').val();
		cleanedText = cleaner(crudeText);
		wordObj = createWordObj(cleanedText);

		$('main dl').removeClass('hidden');

		var displayObj = {
			'.js-word-count' : calcLength(cleanedText),
			'.js-uniq-cnt' : calcUniq(wordObj),
			'.js-word-lng' : calcAvWordLng(wordObj)
		};

		for (var selector in displayObj) {
			var fnc = displayObj[selector];
			displayData(selector, fnc);
		}
	});
}

$(document).ready(handleSubmit);