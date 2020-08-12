$(document).ready(() => {

	$('#tweet-text').on('keyup', function() {
		let length = $(this).val().length;
		const char = $(this).parent().children().children()[1];
		
		if (length <= 140) {
			$(char).text(length).css('color', '#1A535C');
		} else {
			$(char).text(140 - length).css('color', '#EA526F');
		}
	})

});