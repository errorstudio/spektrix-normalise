(function($) { // Because certain pages don't like jQuery

	jQuery.fn.exists = function() { return this.length>0; };

	jQuery.fn.cleanWhitespace = function() {
		textNodes = this.contents().filter(
			function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
		.remove();
		return this;
	}

	$(document).ready(function() {


		// General ----------


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


		// Remove junk from p.ErrorMessage so we can hide it with css when :empty

		$('p.ErrorMessage span:empty').remove();

		$('p.ErrorMessage').each(function(){
			if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
				$(this).html('');
			}
		});



		// Specific pages ----------


		// EventDetails

		if ($('.SpektrixPage.EventDetails').exists()) {
			
			// The heading is in a <h2>, let's make it into a <h1> to be consistent with other pages
			$('h2.DatesAndTimesHeading').replaceWith('<h1 class="DatesAndTimesHeading">Dates and times</h1>');

		}


		// ChooseSeats

		if ($('.SpektrixPage.ChooseSeats').exists()) {

			/*// Fix inconsistent capitalisation in heading
			$('.ChooseSeatsHeading h1').replaceWith('<h1>Choose seats</h1>');*/

			// Remove asterisk blast on pricing table
			$('.SpektrixPage.ChooseSeats .PricesContainer .Price').each(function(){
				var str = $(this).text();
				$(this).text(str.replace(/\*/g, ''));
			});

			// Add an explanatory label to the seating area dropdown
			$('.SpektrixPage.ChooseSeats .SeatingAreaHeading').prepend('<span class="SeatingAreaHeadingLabel">Showing seating for: </span>');

			// Move the seating area selector to next to the seating area display
			$('.SpektrixPage.ChooseSeats .SeatingAreaHeading').insertBefore($('.SeatingSelector'));

			// Move the 'choose best available instead' button to next to the seating area display
			$('.SpektrixPage.ChooseSeats .BestAvailableLink').insertBefore($('.SeatingSelector'));

			// Improve the instruction wording, was 'Please select your seats (maximum 10 for this event per order)'
			$('.SpektrixPage.ChooseSeats .SeatingAreaInstructions').text('You can pick up to 10 seats per order, for this event.');



		}


		// EditTickets

		if ($('.SpektrixPage.EditTickets').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			var eventName = $('.EventName').html();
			$('h1.EditTicketsHeading').replaceWith('<h1 class="EditTicketsHeading">Choose ticket type</h1>');
			$('h1.EditTicketsHeading').append('<span class="booking-for">Booking tickets for: <b>' + eventName + '</b></span>');

		}


		// Basket2

		if ($('.SpektrixPage.Basket2').exists()) {
			
			// Put the item name in the <dd> so at least everything is in the same container
			if ($('dt.Item.Instance')) {
				$('dt.Item.Instance').each(function(){
					$(this).find('span').addClass('ItemName');
					var itemName = $(this).html();
					$(this).next('dd').find('.Details').prepend(itemName);
					$(this).remove();
				});
			}

			// Remove the dt for donations to be consistent
			if ($('dt.Item.Donation')) {
				$('dt.Item.Donation').each(function(){
					$(this).remove();
				});
			}

			// Put the correct class name on the name so it's consistent with other non donation items
			if ($('dd.Item.Donation')) {
				$('dd.Item.Donation > p:first-child').addClass('Details').prepend('<span class="ItemName">Donation</span>');
			}

			// Put the promo code box after the basket
			if ($('.SpektrixPage.Basket2 .Savings')) {
				$('.SpektrixPage.Basket2 .Savings').insertAfter($('.SpektrixPage.Basket2 .Savings').next());
			}

			// Hide an all caps optional message (?!?!)
			$('.SpektrixPage.Basket2 .OptionalMessage').remove();

		}

		// EventsList

		if ($('.SpektrixPage.EventsList').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			$('.SpektrixPage .More_Info').text('Book now');

		}


		// NewAccount

		if ($('.SpektrixPage.NewAccount').exists()) {

			// A curious div.errormessage containing inappropriate errors appears outside the normal page structure if you hit next without selecting an address
			// I'm going to hide this once instance with JS for now
			$('div.ErrorMessage').remove();

			// Make whitespace consistent between form field elements
			$('.SpektrixPage.NewAccount .Container').cleanWhitespace();

			// Reword titles to be more useful (we've hidden the <p>'s of instructive text with css)
			$('.SpektrixPage.NewAccount .View h2.YourDetailsHeading').text('Please enter your details');
			$('.SpektrixPage.NewAccount .View h2.YourAddressHeading').text('Please enter your address');
			$('.SpektrixPage.NewAccount .View h2.YourPreferencesHeading').text('Please set your preferences');

			$('.SpektrixPage.NewAccount .View p.SelectMessage').text('We found these addresses, please choose one.');

			

		}



		// MyAccount

		if ($('.SpektrixPage.MyAccount').exists()) {

			// Move the logout button into the header
			$('h1').prepend( $('.Button.Logout').parent());

		}


		// Donations

		if ($('.SpektrixPage.Donations').exists()) {

			$('.SpektrixPage.Donations .FundContainer').each(function(){
				var amountBox = $(this).find('.DonationAmount').detach();
				$(this).wrapInner( "<div class='FundContainerTextContent'></div>");
				$(this).append(amountBox);
			});

		}



		// After

		// Stick an event name in the header if we can find one
		if ($('.EventName').exists()) {
			var eventName = $('.EventName').html();
			$('h1').append('<span class="booking-for">Booking tickets for <b>' + eventName + '</b></span>');
		}



	});

})(jQuery);