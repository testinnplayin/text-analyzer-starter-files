function cleaner(text) { //cleans up given test text
	return text.toLowerCase().replace(/\W[^a-z']/g, ' ').replace(/\./g, '').split(' ');
}

function calcLength(arr) {
	return arr.length;
}

function calcUniq(arr) {
	var wordFreq = {};

	arr.forEach(function(word) {
		wordFreq[word] = (wordFreq || 0) + 1;
	});

	return Object.keys(wordFreq).length;
}


function displayData(select, f) {
	$(select).empty().append("<dd>" + f + "</dd>");
}

function handleSubmit() {
	$('button[type="submit"]').click(function(e) {
		e.preventDefault();
		var crudeText, cleanedText;

		crudeText = $('#user-text').val();
		cleanedText = cleaner(crudeText);

		$('main dl').removeClass('hidden');

		var displayObj = {
			'.js-word-count' : calcLength(cleanedText),
			'.js-uniq-cnt' : calcUniq(cleanedText)
		};

		for (var selector in displayObj) {
			var fnc = displayObj[selector];
			displayData(selector, fnc);
		}
	});
}

$(document).ready(handleSubmit);