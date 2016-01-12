(function($) { // Because certain pages don't like jQuery

	jQuery.fn.exists = function() { return this.length>0; };

	$(document).ready(function() {



		// Clean up empty <p>s by removing whitespace, so :empty can then target and hide them.
		if ($('.SpektrixPage p').exists) {
			$('.SpektrixPage p').each(function(){
				if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
					$(this).html('');
				}
			});
		}

		// …and WikiText holders while we're at it. NOT QUITE WORKING
		if ($('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div')) {
			$('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div').each(function(){
				if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
					$(this).html('');
				}
			});
		}




		// See what page we're on
		if ($('.SpektrixPage.EventsList').exists()) {

		}

		if ($('.SpektrixPage.EventDetails').exists()) {
			
			// The heading is in a <h2>, let's make it into a <h1> to be consistent with other pages
			$('h2.DatesAndTimesHeading').replaceWith('<h1 class="DatesAndTimesHeading">Dates and times</h1>');

		}

		if ($('.SpektrixPage.ChooseSeats').exists()) {

			// Fix inconsistent capitalisation in heading
			$('.ChooseSeatsHeading h1').replaceWith('<h1>Choose seats</h1>');

		}

		if ($('.SpektrixPage.EditTickets').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			var eventName = $('.EventName').html();
			$('h1.EditTicketsHeading').replaceWith('<h1 class="EditTicketsHeading">Choose ticket type</h1>');
			$('h1.EditTicketsHeading').append('<span class="booking-for">Booking tickets for: <b>' + eventName + '</b></span>');

		}

		if ($('.SpektrixPage.Basket2').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			if ($('dt.Item')) {
				$('dt.Item').each(function(){
					$(this).find('span').addClass('ItemName');
					var itemName = $(this).html();
					$(this).next('dd').find('.Details').prepend(itemName);
					$(this).remove();
				});
			}

			// Hide an all caps optional message (?!?!)
			$('.SpektrixPage.Basket2 .OptionalMessage').remove();
		}

		if ($('.SpektrixPage.EventsList').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			$('.SpektrixPage .More_Info').text('Book now');

		}


		// Stick an event name in the header if we can find one
		if ($('.EventName').exists()) {
			var eventName = $('.EventName').html();
			$('h1').append('<span class="booking-for">Booking tickets for: <b>' + eventName + '</b></span>');
		}


	});

})(jQuery);