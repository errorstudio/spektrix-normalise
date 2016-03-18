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

		if ($('.SpektrixPage p').exists()) {
			$('.SpektrixPage p').each(function(){
				if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
					$(this).html('');
				}
			});
		}


		// …and WikiText holders while we're at it. NOT QUITE WORKING

		if ($('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div').exists()) {
			$('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div').each(function(){
				if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
					$(this).html('');
				}
			});
		}


		// Remove junk from p.ErrorMessage so we can hide it with css when :empty

		$('p.ErrorMessage span:empty, div.ErrorMessage span:empty').remove();

		$('p.ErrorMessage, div.ErrorMessage, div.InfoMessage').each(function(){
			if ($(this).text().trim().length < 1 && $(this).children().length < 1) {
				$(this).html('');
			}
		});



		// Specific pages ----------


		// EventDetails

		if ($('.SpektrixPage.EventDetails').exists()) {
			
			// The heading is in a <h2>, let's make it into a <h1> to be consistent with other pages
			$('h2.DatesAndTimesHeading').replaceWith('<h1 class="DatesAndTimesHeading">Dates and times</h1>');

			// The description is above the main header, let's put it under
			$('.DetailsContainer').insertAfter('.DatesAndTimesHeading');

			// Savings is haunted by an empty <ul>, let's take out the whitespace and hide it with :empty in CSS
			if ($('.Savings > ul').exists()) {
				$('.Savings > ul').cleanWhitespace();
			}

		}


		// ChooseSeats

		if ($('.SpektrixPage.ChooseSeats').exists()) {

			// Add 'Booking for…' to header
			if ($('.EventName').exists()) {
				var eventName = $('.EventName').html();
				$('.ChooseSeatsHeading').append('<span class="booking-for"><em>Booking tickets for:</em> <b>' + eventName + '</b></span>');
			}

			// Remove asterisk blast on pricing table
			$('.SpektrixPage.ChooseSeats .PricesContainer .Price').each(function(){
				var str = $(this).text();
				$(this).text(str.replace(/\*/g, ''));
			});

			// Add an explanatory label to the seating area dropdown - if there's anything in it ie. if it's needed
			if ($('.SeatingAreaHeading').exists()) {
				if ($('.SeatingAreaHeading').children().length > 0) { 
					$('.SpektrixPage.ChooseSeats .SeatingAreaHeading').prepend('<span class="SeatingAreaHeadingLabel">Showing seating for: </span>');
				}
			}

			// Move the seating area selector to next to the seating area display
			$('.SpektrixPage.ChooseSeats .SeatingAreaHeading').insertBefore($('.SeatingSelector'));

			// Move the 'choose best available instead' button to next to the seating area display
			$('.SpektrixPage.ChooseSeats .BestAvailableLink').insertBefore($('.SeatingSelector'));

			// Improve the instruction wording, was 'Please select your seats (maximum 10 for this event per order)'
			// CAN'T DO THIS BECAUSE THAT NUMBER IS DYNAMIC
			//$('.SpektrixPage.ChooseSeats .SeatingAreaInstructions').text('You can pick up to 10 seats per order, for this event.');

			// The error message on Best Available is uniquely called .ErrorPanel instead of .ErrorMessage, let's swap it back
			// It is also formatted differently to other errors, so we'll fix that too
			var errorText = $('.ErrorPanel li').text();
			$('.ErrorPanel').html('<span>There was an error. ' + errorText + '</span>');
			$('.ErrorPanel').addClass('ErrorMessage').removeClass('ErrorPanel');

			// Savings is haunted by an empty <ul>, let's take out the whitespace and hide it with :empty in CSS
			if ($('.Savings > ul').exists()) {
				$('.Savings > ul').cleanWhitespace();
			}

			// Let's give the pricing table some data-labels so it can reformat for responsive
			if ($('.PriceListTable').exists()) {
				$('.PriceListTable thead th').each(function (i) {
					$('.PriceListTable tbody tr td:nth-child(' + (i+1) + ')').attr('data-label', $(this).find('span').text());
				});
			}

			// Add a back button
			$('.SpektrixPage.ChooseSeats .Buttons').prepend('<button class="BackButton ButtonAlignLeft">Back</button>');
			$('.SpektrixPage.ChooseSeats .Buttons .BackButton').click(function() {
				
				if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
					window.top.history.go(-1);
				} else {
					window.history.back();
				}
				//window.top.location.href = "http://www.example.com"; 
				//document.location = document.referrer;
			});


			// THEME
			// If this exists then we're logged out
			if ($('#ctl00_ContentPlaceHolder_RelatedOffersControl1_LoginForDiscounts').exists()) {
				// Insert our own neat little message
				console.log("ok");
				$('.Savings').after('<div class="LoginForDiscounts"><p>Special Offers and Centre Stage Membership discounts are applied in the basket once you have logged in.</div>' );
				// Remove the old one
				$('#ctl00_ContentPlaceHolder_RelatedOffersControl1_LoginForDiscounts').remove();

				if ($('.Savings > ul').text().trim().length < 1 && $('.Savings > ul').children().length < 1) {
					$('.Savings > ul').remove();
				}

				$('.Savings').cleanWhitespace();
				$('.Savings').insertAfter('.Buttons');
				$('.LoginForDiscounts').insertAfter('.Buttons');
			}

		}


		// EditTickets

		if ($('.SpektrixPage.EditTickets').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			var eventName = $('.EventName').html();
			$('h1.EditTicketsHeading').replaceWith('<div class="EditTicketsHeading"><h1>Choose ticket type</h1></div>');
			$('h2.EditTicketsHeading').remove(); // This H2 appeared at some point. The identical class name threw things off.
			$('.EditTicketsHeading').append('<span class="booking-for"><em>Booking tickets for:</em> <b>' + eventName + '</b></span>');

			// Add membership login message
			$('.EditTicketsHeading').after('<div class="LoginForDiscounts"><p>Special Offers and Centre Stage Membership discounts are applied in the basket once you have logged in.</div>' );

			// Targeting - Link is not reliably targetable, let's give it a classname
			$('a[href*="ChooseSeats"]').addClass('ChangeMySeatsLink');

			// Rename 'Delete' to 'Remove'
			$('th.Delete').text('Remove');

		}


		// EditAddress

		if ($('.SpektrixPage.EditAddress').exists()) {

			// 'Address edit' renamed to 'Edit address' inline with copy standards
			$('h1.AddressEditHeading').replaceWith('<h1 class="AddressEditHeading">Edit address</h1>');
			
			// Remove superfluous instructive text
			$('.AddressEditInstructions').remove();

			// Make whitespace consistent between form field elements
			$('.SpektrixPage.EditAddress .Container').cleanWhitespace();

			// A curious div.errormessage containing inappropriate errors appears outside the normal page structure if you hit next without selecting an address
			// I'm going to hide this once instance with JS for now
			$('div.ErrorMessage').remove();

		}


		// Basket2

		if ($('.SpektrixPage.Basket2').exists()) {
			
			// Put the .Instance item name in the <dd> so everything is in the same container
			if ($('dt.Item.Instance').exists()) {
				$('dt.Item.Instance').each(function(){
					$(this).find('span').addClass('ItemName');
					var itemName = $(this).html();
					$(this).next('dd').find('.Details').prepend(itemName);
					$(this).remove();
				});
			}

			// …and do the same with .Merchandise (structure is slightly different)
			if ($('dt.Item.Merchandise').exists()) {
				$('dt.Item.Merchandise').each(function(){
					$(this).find('span').addClass('ItemName');
					var itemName = $(this).html();
					$(this).next('dd').prepend('<p class="Details">' + itemName + '</p>');
					$(this).remove();
				});
			}

			// …and do the same with .GiftVoucher (structure is slightly different)
			if ($('dt.Item.GiftVoucher').exists()) {
				$('dt.Item.GiftVoucher').each(function(){
					//$(this).find('span').addClass('ItemName');
					//var itemName = $(this).html();
					$(this).next('dd').prepend('<p class="Details"><span class="ItemName">Gift Voucher</span></p>');
					$(this).remove();
				});
			}

			// Wrap loose button in a <dd>
			if ($('.AddAnotherGiftVoucher').exists()) {
				$('.AddAnotherGiftVoucher').wrap('<dd class="AddGiftVoucherRow"></dd>');
			}

			// Move details to correct place, add quantity
			if ($('dd.Item.GiftVoucher').exists()) {
				$('dd.Item.GiftVoucher').each(function(){
					var toHTML = $(this).find('.To').html();
					$(this).find('.ItemName').after('<span>' + toHTML + '</span>');
					$(this).find('.To').remove();
					$(this).find('.Breakdown').prepend('<li class="Quantity">1</li>');
				});
			}

			// Add missing class to Merchandise > Quantity error field 
			if ($('dd.Item.Merchandise .Quantity input').exists()) {
				$('dd.Item.Merchandise .Quantity input + span').addClass('ValidationError');
			}
			
			// Remove the dt for donations to be consistent
			if ($('dt.Item.Donation').exists()) {
				$('dt.Item.Donation').remove();
			}

			// Add missing class and span to membership details
			if ($('dd.Item.Membership').exists()) {
				$('dd.Item.Membership > p:first-child').addClass('Details').wrapInner('<span class="ItemName">');
			}

			// Remove the dt for membership to be consistent
			if ($('dt.Item.Membership').exists()) {
				$('dt.Item.Membership').remove();
			}

			// Put the correct class name on the name so it's consistent with other non-donation items
			if ($('dd.Item.Donation').exists()) {
				$('dd.Item.Donation > p:first-child').addClass('Details').prepend('<span class="ItemName">Donation</span>');
			}

			// Savings is haunted by an empty <ul>, let's take out the whitespace and hide it with :empty in CSS
			if ($('.Savings > ul').exists()) {
				$('.Savings > ul').cleanWhitespace();
			}

			// Check if savings actually contains anything
			if ($('.Savings').exists()) {
				if (!$('.Savings p, .Savings label, .Savings input').exists()) {
					$('.Savings').remove(); // If there's no STUFF in savings then remove it (!!!)
				}
			}

			// Put the savings box after the basket
			if ($('.Savings').exists()) {
				$('.Savings').insertAfter($('.Savings').next());
			}

			// Relabel the promo code box
			if($('#ctl00_ContentPlaceHolder_PromoCodeBox_PromoCodeDiv label').text().indexOf('Enter a promotion code here if you have one') != -1) {
				$('#ctl00_ContentPlaceHolder_PromoCodeBox_PromoCodeDiv label').text('Promo code')
			}

			// Fix capitalisation on 'Apply code' button
			$('.PromoCode .Button').attr('value', 'Apply code');	

			// Hide an all caps optional message
			$('.SpektrixPage.Basket2 .OptionalMessage').remove();

			// The 'You may also be interested in' box appears in the middle of the basket after plays, but before donations and membership.
			// Let's take it out and give it it's own space.
			// The title reads 'You may also be interested in the following:', let's make it snappier.
			if ($('dt.Promo').exists()) {
				//var titleText = $('dt.Promo').text();
				$('.Items').after('<div class="Promo"><h2>You may like to add…</h2></div>' );
				$('dd.Promo').each(function() { // There can be multiple promos (events and merch, possibly more?)
					var promoContent = $(this).html();
					$('div.Promo').append(promoContent);
				});
				$('dd.Promo, dt.Promo').remove();
			}

			// Does the basket need to show the commission column?
			if ($('.Breakdown .Commission').exists()) {
				$('.Items').addClass('ItemsWithCommission');
			}

			// Get rid of some colons
			$('.Breakdown .Total .Label').text('Total');
			$('.Breakdown .Quantity .Label').text('Quantity');
			$('.Breakdown .Commission .Label').text('CMSN');
			$('.Breakdown .Saving .Label').text('Saving');

			// Does the basket need to show the savings column?
			if ($('.Breakdown .Saving').exists()) {
				$('.Items').addClass('ItemsWithSaving');
			}

			// Add in 'Continue shopping' link, if the checkout button is there.
			if ($('.CheckoutLink').exists()) {
				$('.Basket2 > .Buttons').after('<div class="ContinueShopping"><span>or</span><a target="_parent" href="http://www.sheffieldtheatres.co.uk/whats-on">Continue shopping</a></div>');
			}

			// THEME
			// If this exists then we're logged out
			if ($('#ctl00_ContentPlaceHolder_RelatedOffersControl_LoginForDiscounts').exists()) {
				// Insert our own neat little message
				$('.Items').after('<div class="LoginForDiscounts"><p>Special Offers and Centre Stage Membership discounts are applied in the basket once you have logged in.</div>' );
				// Remove the old one and the Savings title
				$('#ctl00_ContentPlaceHolder_RelatedOffersControl_LoginForDiscounts').parent().prev().remove();
				$('#ctl00_ContentPlaceHolder_RelatedOffersControl_LoginForDiscounts').parent().remove(); 
			}
			
		}


		// EventsList

		if ($('.SpektrixPage.EventsList').exists()) {
			
			// The heading doesn't describe the page and is inconsistent, let's replace it
			$('.SpektrixPage .More_Info').text('Book now');

		}


		// NewAccount

		if ($('.SpektrixPage.NewAccount').exists()) {

			// A curious div.errormessage containing inappropriate errors appears outside the normal page structure if you hit next without selecting an address
			// I'm going to hide this one instance with JS for now
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

			// 'Your' is better than 'My'
			$('.MyAccountHeading span, .MyDetailsHeading span, .MyAddressesHeading span, .MyPreferencesHeading span, .MyOffersHeading span, .Options a').each(function(){
				var value = $(this).text()
				value = value.replace("My", "Your");
				$(this).text(value)
			});

		}


		// Donations

		if ($('.SpektrixPage.Donations').exists()) {

			$('.SpektrixPage.Donations .FundContainer').each(function(){
				var amountBox = $(this).find('.DonationAmount').detach();
				$(this).wrapInner( "<div class='FundContainerTextContent'></div>");
				$(this).append(amountBox);
			});

			// Add missing class to Amount field error message 
			if ($('.SpektrixPage.Donations .DonationAmount input').exists()) {
				$('.SpektrixPage.Donations .DonationAmount input + span').addClass('ValidationError');
			}

			// 'Donations' sounds very inward-facing, let's replace it with 'Would you like to make a donation?' 
			$('.DonationsBlurb h1').replaceWith('<h1>Would you like to make a donation?</h1>');

			// Fix capitalisation on 'Add to basket' button
			$('.SpektrixPage.Donations input.ContinueButton').attr('value', 'Add to basket');	
			

		}


		// Memberships

		if ($('.SpektrixPage.Memberships').exists()) {

			// Change <h1>'s and <h2>'s in WikiText to <h3's>
			$('.SpektrixPage.Memberships .Membership .WikiText h1, .SpektrixPage.Memberships .Membership .WikiText h2').each(function(){
				var txt = $(this).text();
				$(this).after('<h3>' + txt + '</h3>');
				$(this).remove();
			});

		}


		// GiftVouchers

		if ($('.SpektrixPage.AddGiftVoucher').exists()) {

			// Replace bad error message with a consistent one
			$('.AddGiftVoucher > div.ValidationError').replaceWith('<p class="ErrorMessage"><span>Please correct the problems below before continuing.</span></p>');
			// For reasons passing understanding the <h1> disappears if there is an error
			if (!$('.AddGiftVoucherBlurb h1').exists()) {
				$('.AddGiftVoucherBlurb').html('<h1>Gift Vouchers</h1>');
			}

			$('.SendTo *:gt(0)').wrapAll('<div class="wrap-group"></div>');

		}


		// GiftAidDeclarationForm

		if ($('.SpektrixPage.GiftAidDeclarationForm').exists()) {

			// Neither inputs, nor labels, nor field containers have class names - and the nearest parent with a class name is the page, let's fix that.
			$('.SpektrixPage.GiftAidDeclarationForm input[type="radio"]').parent().addClass('GiftAidDeclarationFormField');

			// The error message on GiftAidDeclarationForm is rendered outside the normal .SpectrixPage container, let's swap it back
			// It is also formatted differently to other errors, so we'll fix that too
			var errorText = $('.ErrorMessage li').text();
			$('.ErrorMessage').html('<span>' + errorText + '</span>');
			$('.ErrorMessage').insertAfter('.GiftAidDeclarationFormHeading');

			// Insert andy form
			$('.GiftAidDeclarationFormDescription').after('<div class="GiftAidFormSimple"><input type="checkbox" name="GiftAidFormSimpleCheckbox" id="GiftAidFormSimpleCheckbox"><label for="GiftAidFormSimpleCheckbox">Yes! I would like Sheffield Theatres to claim Gift Aid on my donation.</label><p class="GiftAidNote">I want all donations I\'ve made to Sheffield Theatres in the past four years and all donations in future to be treated as Gift Aid donations until I notify you otherwise.</p></div>');
			
			// Hide original form
			$('.GiftAidDeclarationFormField').addClass('visuallyhidden');

			// Auto-check DON't giftaid it
			$('#ctl00_ContentPlaceHolder_NoneBox').prop('checked', true);

			$(".GiftAidFormSimple input").change(function() {
				if ($(this).prop('checked')) {
					$('#ctl00_ContentPlaceHolder_SinceDateBox').prop('checked', true);
				} else if (!$(this).prop('checked')) {
					$('#ctl00_ContentPlaceHolder_NoneBox').prop('checked', true);
				}
			});

			$('.GiftAidDeclarationFormDescription').after('<p class="GiftAidDeclarationFormDescriptionSimple">Boost your donations by an extra 25p on every £1 with Gift Aid, at no extra cost to you. Sound good?</p>');
			//$('.GiftAidFormSimple').after('');
			//$('.GiftAidFormSimple').after('<p class="GiftAidDeclarationFormPledgeSimple">I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year it is my responsibility to pay any difference.</p><p>Please notify the charity if you: want to cancel this declaration, change your name or home address, or no longer pay sufficient tax on your income and/or capital gains. If you pay Income Tax at the higher or additional rate and want to receive the additional tax relief due to you, you must include all your Gift Aid donations on your Self-Assessment tax return or ask HM Revenue and Customs to adjust your tax code.</p>');

			$('.GiftAidDeclarationFormDescription').remove();
		}


		// Checkout
		
		if ($('.SpektrixPage.Checkout').exists()) {

			// Fix capitalisation on 'Edit basket' button
			$('.SummaryView > .Buttons .Button').attr('value', 'Edit basket');

			// Put the Ts & Cs checkbox before the label, for consistency
			$('.TermsAndConditions input').insertBefore('.TermsAndConditions label');
			console.log("ok");

		}


		// Change password

		if ($('.SpektrixPage.ChangePassword').exists()) {

			// Make whitespace consistent between form field elements
			$('.SpektrixPage.ChangePassword .Container').cleanWhitespace();

		}


		// Error

		if ($('.SpektrixPage.Error').exists()) {

			// The heading is in a <h2>, let's make it into a <h1> to be consistent with other pages
			$('.SpektrixPage.Error h2').replaceWith('<h1 class="ErrorHeading">Oops, something went wrong.</h1>');

		}


		// SupplementaryEventsPage

		if ($('.SpektrixPage.SupplementaryEventsPage').exists()) {

			$('.SpektrixPage.SupplementaryEventsPage .Event_Text').each(function(){
				var amountBox = $(this).find('#SimpleSeatingDiv').detach();
				$(this).wrapInner( "<div class='SupplementaryEventDivTextContent'></div>");
				$(this).append(amountBox);
			});

			// Fix capitalisation in button text
			$('.SpektrixPage.SupplementaryEventsPage input[value="Continue To Basket"].Button').attr('value', 'Continue to basket').wrap('<div class="Buttons"></div>');
			$('.SpektrixPage.SupplementaryEventsPage #SimpleSeatingDiv .Button').attr('value', 'Add to basket')
			
		}



	});

})(jQuery);