!function($){jQuery.fn.exists=function(){return this.length>0},jQuery.fn.cleanWhitespace=function(){return textNodes=this.contents().filter(function(){return 3==this.nodeType&&!/\S/.test(this.nodeValue)}).remove(),this},$(document).ready(function(){if($(".SpektrixPage p").exists&&$(".SpektrixPage p").each(function(){$(this).text().trim().length<1&&$(this).children().length<1&&$(this).html("")}),$('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div')&&$('.SpektrixPage div[class$="WikiText"], .SpektrixPage div[class$="WikiText"] > div').each(function(){$(this).text().trim().length<1&&$(this).children().length<1&&$(this).html("")}),$("p.ErrorMessage span:empty, div.ErrorMessage span:empty").remove(),$("p.ErrorMessage, div.ErrorMessage, div.InfoMessage").each(function(){$(this).text().trim().length<1&&$(this).children().length<1&&$(this).html("")}),$(".SpektrixPage.EventDetails").exists()&&$("h2.DatesAndTimesHeading").replaceWith('<h1 class="DatesAndTimesHeading">Dates and times</h1>'),$(".SpektrixPage.ChooseSeats").exists()&&($(".SpektrixPage.ChooseSeats .PricesContainer .Price").each(function(){var e=$(this).text();$(this).text(e.replace(/\*/g,""))}),$(".SpektrixPage.ChooseSeats .SeatingAreaHeading").prepend('<span class="SeatingAreaHeadingLabel">Showing seating for: </span>'),$(".SpektrixPage.ChooseSeats .SeatingAreaHeading").insertBefore($(".SeatingSelector")),$(".SpektrixPage.ChooseSeats .BestAvailableLink").insertBefore($(".SeatingSelector")),$(".SpektrixPage.ChooseSeats .SeatingAreaInstructions").text("You can pick up to 10 seats per order, for this event.")),$(".SpektrixPage.EditTickets").exists()){var e=$(".EventName").html();$("h1.EditTicketsHeading").replaceWith('<h1 class="EditTicketsHeading">Choose ticket type</h1>'),$("h1.EditTicketsHeading").append('<span class="booking-for">Booking tickets for: <b>'+e+"</b></span>"),$('a[href*="ChooseSeats"]').addClass("ChangeMySeatsLink"),$("th.Delete").text("Remove")}if($(".SpektrixPage.EditAddress").exists()&&($("h1.AddressEditHeading").replaceWith('<h1 class="AddressEditHeading">Edit address</h1>'),$(".AddressEditInstructions").remove(),$(".SpektrixPage.EditAddress .Container").cleanWhitespace(),$("div.ErrorMessage").remove()),$(".SpektrixPage.Basket2").exists()&&($("dt.Item.Instance")&&$("dt.Item.Instance").each(function(){$(this).find("span").addClass("ItemName");var e=$(this).html();$(this).next("dd").find(".Details").prepend(e),$(this).remove()}),$("dt.Item.Donation")&&$("dt.Item.Donation").each(function(){$(this).remove()}),$("dd.Item.Donation")&&$("dd.Item.Donation > p:first-child").addClass("Details").prepend('<span class="ItemName">Donation</span>'),$(".SpektrixPage.Basket2 .Savings")&&$(".SpektrixPage.Basket2 .Savings").insertAfter($(".SpektrixPage.Basket2 .Savings").next()),$(".SpektrixPage.Basket2 .OptionalMessage").remove()),$(".SpektrixPage.EventsList").exists()&&$(".SpektrixPage .More_Info").text("Book now"),$(".SpektrixPage.NewAccount").exists()&&($("div.ErrorMessage").remove(),$(".SpektrixPage.NewAccount .Container").cleanWhitespace(),$(".SpektrixPage.NewAccount .View h2.YourDetailsHeading").text("Please enter your details"),$(".SpektrixPage.NewAccount .View h2.YourAddressHeading").text("Please enter your address"),$(".SpektrixPage.NewAccount .View h2.YourPreferencesHeading").text("Please set your preferences"),$(".SpektrixPage.NewAccount .View p.SelectMessage").text("We found these addresses, please choose one.")),$(".SpektrixPage.MyAccount").exists()&&($("h1").prepend($(".Button.Logout").parent()),$(".MyAccountHeading span, .MyDetailsHeading span, .MyAddressesHeading span, .MyPreferencesHeading span, .MyOffersHeading span, .Options a").each(function(){var e=$(this).text();e=e.replace("My","Your"),$(this).text(e)})),$(".SpektrixPage.Donations").exists()&&$(".SpektrixPage.Donations .FundContainer").each(function(){var e=$(this).find(".DonationAmount").detach();$(this).wrapInner("<div class='FundContainerTextContent'></div>"),$(this).append(e)}),$(".SpektrixPage.ChangePassword").exists()&&$(".SpektrixPage.ChangePassword .Container").cleanWhitespace(),$(".SpektrixPage.Error").exists()&&$(".SpektrixPage.Error h2").replaceWith('<h1 class="ErrorHeading">Oops, something went wrong.</h1>'),$(".SpektrixPage.SupplementaryEventsPage").exists()&&$(".SpektrixPage.SupplementaryEventsPage .Event_Text").each(function(){var e=$(this).find("#SimpleSeatingDiv").detach();$(this).wrapInner("<div class='SupplementaryEventDivTextContent'></div>"),$(this).append(e)}),$(".EventName").exists()){var e=$(".EventName").html();$("h1").append('<span class="booking-for">Booking tickets for <b>'+e+"</b></span>")}})}(jQuery);