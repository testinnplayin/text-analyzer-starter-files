function cleaner(text) { //cleans up given test text
	return text.toLowerCase().replace(/\W[^a-z']/g, ' ').split(' ');
}

function calcLength(arr) {
	return arr.length;
}

function handleSubmit() {
	$('button[type="submit"]').click(function(e) {
		e.preventDefault();
		var crudeText, cleanedText;

		crudeText = $('#user-text').val();
		cleanedText = cleaner(crudeText);

		$('main dl').removeClass('hidden');

		$('.js-word-count').empty().append("<dd>" + calcLength(cleanedText) + "</dd>");
	});
}

$(document).ready(handleSubmit);