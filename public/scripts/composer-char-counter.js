$(document).ready(() => {
	console.log("lol i am here");


	$('#tweet-text').on('keyup', function() {
		let length = $(this).val().length;
		const output = $(this).parent().children(2).children(2);
		
		if (length < 140) {
			return output.text(length);
		} else {
			output.text(140 - length).css('color', 'red');
		}

	})


});