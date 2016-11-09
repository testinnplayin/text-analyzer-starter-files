function cleaner(text) { //cleans up given test text
	return text.toLowerCase().replace(/[\W[^a-z']]/g, ' ').replace(/\./g, '').split(' '); //second replace added because of end period not being selected
}

//creation functions

function createWordObj(arr) { //creates wordFreq object that contains words and their frequencies
	var wordFreq = {};

	arr.forEach(function(word) {
		wordFreq[word] = (wordFreq || 0) + 1;
	});

	return wordFreq;
}

//calculation functions

function calcLength(arr) { //calculate length of text
	return arr.length;
}

function calcUniq(wordFreq) { //calculate amount of unique words in text
	return Object.keys(wordFreq).length;
}

function calcAvWordLng(wordFreq) { //calculate average word length
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

function calcAvSent(str) { //calculate average sentence length
	var sentences, lng, sentLng, sum;

	sentences = str.split(/[!?.]/g);
	lng = sentences.length;
	sum = 0;

	for (var i = 0; i < lng - 1; i++) {
		sentLng = sentences[i].trim().split(' ').join('').length;
		sum += sentLng;
		console.log(sum);
	}

	return sum / (lng - 1);
}

//display functions

function displayData(select, f) {
	$(select).empty().append("<dd>" + f + "</dd>");
}

//event handlers

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
			'.js-word-lng' : calcAvWordLng(wordObj),
			'.js-sent-lng' : calcAvSent(crudeText)
		};

		for (var selector in displayObj) {
			var fnc = displayObj[selector];
			displayData(selector, fnc);
		}
	});
}

$(document).ready(handleSubmit);