$(document).ready(() => {
	console.log("lol i am here");


	$('#tweet-text').on('keyup', function() {
		let length = $(this).val().length;
		const char = $(this).parent().children().children()[1];
		console.log(char)
		if (length < 140) {
			$(char).text(length);
		} else {
			$(char).text(140 - length).css('color', 'red');
		}

	})


});