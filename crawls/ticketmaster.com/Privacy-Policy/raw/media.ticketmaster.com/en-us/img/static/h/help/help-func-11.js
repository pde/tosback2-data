function toggleHelpFaq(t,q,h){
			var lid = document.getElementById(t);
			var faqID = document.getElementById(q);
			var box = document.getElementById(h);
			
			
			if (faqID.style.display == "block"){
				lid.className="q-close";
				box.className="q-div-c";
				faqID.style.display = "none";
			}
			else if(faqID.style.display = "none"){
				lid.className="q-open";
				box.className="q-div-o";
				faqID.style.display = "block";
				var num = q.substring(1);
				if (!tm_omni_temp.get(q)){
					tm_omni_temp.set(q, '1');
					omniTracking.navigation_link('helpFAQ' + num, false);
				}
			} 
	}





// generates the left navigation
var thisServer = window.location.protocol + "//" + window.location.host + "/h/";

// if title of module wraps, add <br> at linebreak

var shipping = new Array(
						"Shipping, Delivery<br>and Returns", //Title of the module	
					 	"Print Your Tickets",
					 	"View Shipping Options",
					 	"Refund Policy",
					 	"Canceled and Rescheduled Events",
					 	"Lost or Destroyed Tickets"
					);

var shippingLink = new Array (
						  thisServer + "print.html?tm_link=help_nav_1_print",
						  thisServer + "shipping.html?tm_link=help_nav_1_shipping",
						  thisServer + "returns.html?tm_link=help_nav_1_return",
						  thisServer + "cancelled.html?tm_link=help_nav_1_canceled",
						  thisServer + "lost_tix.html?tm_link=help_nav_1_lost"
					);

var account = new Array(
						"Using Your Account", //Title of the module	
					 	"Sign In or Create Account",
					 	"View Your Order History",
					 	"Forgot Your Password?",
					 	"Edit Profile",
					 	"Edit Preferences",
					 	"Edit Billing Info"
					);

var accountLink = new Array (
						  "https://www.ticketmaster.com/member?tm_link=help_nav_2_account",
						  "https://www.ticketmaster.com/member/order_history?tm_link=help_nav_2_orders",
						  "https://www.ticketmaster.com/member?tm_link=help_nav_2_forgotpass",
						  "https://www.ticketmaster.com/member/edit_profile?tm_link=help_nav_2_editprofile",
						  "https://www.ticketmaster.com/member/edit_subscriptions?tm_link=help_nav_2_preferences",
						  "https://www.ticketmaster.com/member/edit_billing?tm_link=help_nav_2_billing"
					);

var buying = new Array(
						"Buying Tickets", //Title of the module	
					 	"Order Online",
					 	"Order by Phone",
					 	"Ticketmaster Retail Outlets",
					 	"Ticket Tips",
					 	"Accessible Seating"
					);

var buyingLink = new Array (
						  thisServer + "orderonline.html?tm_link=help_nav_3_online",
						  thisServer + "orderbyphone.html?tm_link=help_nav_3_phone",
						  thisServer + "retaillocations.html?tm_link=help_nav_3_retail",
						  thisServer + "help_tips.html?tm_link=help_nav_3_faqs",
						  thisServer + "a_seating.html?tm_link=help_nav_3_seating"
					);

var werehere = new Array(
						"We&#39;re Here To Help", //Title of the module						 	
					 	"Read All FAQs",
					 	"Correct Your Order",
					 	"Closing Your Account",
					 	"Contact Us",
					 	"Live Chat"
					);

var werehereLink = new Array (
						  thisServer + "help.html?tm_link=help_nav_4_top10",
						  thisServer + "correcting.html?tm_link=help_nav_4_correcting",
						  thisServer + "closeaccount.html?tm_link=help_nav_4_close",
						  thisServer + "customer_serve.html?tm_link=help_nav_4_contact",
						  "javascript:liveChatWindow('http://ticketmasterus.custhelp.com/app/utils/chat');"
					);

var policies = new Array(
						"Policies and Security", //Title of the module	
					 	"Terms of Use",
					 	"Purchase Policy",
					 	"Privacy Policy",
					 	"Fan Ratings and Reviews Policy"
					);

var policiesLink = new Array (
						  thisServer + "terms.html?tm_link=help_nav_5_terms",
						  thisServer + "purchase.html?tm_link=help_nav_5_purchase",
						  thisServer + "privacy.html?tm_link=help_nav_5_privacy",
						  thisServer + "customerratings.html?tm_link=help_nav_5_ratings"
					);

var whoweare = new Array(
						"Who We Are", //Title of the module	
					 	"About Ticketmaster",
					 	"Our Fan Guarantee",
					 	"Ticketmaster Blog",
					 	"Across the Globe",
					 	"Careers",
					 	"Ticketmaster Logos"
					);

var whoweareLink = new Array (
						  thisServer + "about_us.html?tm_link=help_nav_6_about",
						  "http://www.ticketmaster.com/ourguarantee?tm_link=help_nav_6_guarantee",
						  "http://blog.ticketmaster.com/?tm_link=help_nav_6_ticketology",
						  "http://www.ticketmaster.com/international?tm_link=help_nav_6_intl",
						  "http://www.livenation.com/careers/index.html?tm_link=help_nav_6_careers",
						  "https://client.ticketmaster.com/Extranet/style.aspx"
					);

var beapart = new Array(
						"Be A Part of It", //Title of the module	
					 	"Ticket Your Event"
					);

var beapartLink = new Array (
						"http://www.ticketweb.com/tm/ticketyourevent.html"
					);

//Write out the entire right navigation
function createNav(){
	writeLid(shipping[0]);
	showModule(shipping,shippingLink);
	writeLid(account[0]);
	showModule(account,accountLink);
	writeLid(buying[0]);
	showModule(buying,buyingLink);
	writeLid(werehere[0]);
	showModule(werehere,werehereLink);
	writeLid(policies[0]);
	showModule(policies,policiesLink);
	writeLid(whoweare[0]);
	showModule(whoweare,whoweareLink);
	writeLid(beapart[0]);
	showModule(beapart,beapartLink);
}

//define module title
function writeLid(title) {
	var title;
	if (title.indexOf("<br") < 0) { document.write("<div class=\"lid-secondary\"><h4>"); }
	else { document.write("<div class=\"lid-secondary lid-tall\"><h4>"); }
	document.write( title + "</h4></div>");
}

//Find current page
var theURL = window.location.pathname.split('/');
var thePage = theURL.last();

//write out the links within a module
function showModule(leftNavArray, navLink) {
	document.write("<div class=\"container-neutralZone\"><ul class=\"bullet\">");
	
			for (var counter=1,counter2=0; counter< leftNavArray.length,counter2<navLink.length; counter ++,counter2++){
					if ( navLink[counter2].match(thePage) ){
							document.write("<li><strong>");
							document.write(leftNavArray[counter]);		
							document.write("</strong></li>");
						} else {
							document.write("<li><a href=\"");
							document.write(navLink[counter2]);		
							document.write("\">" + leftNavArray[counter]);
							document.write("</a></li>");
						}
			}
			
	document.write("</ul></div>");
}

// Open a new window
function liveChatWindow(url) {
	omniTracking.navigation_link('help_nav_4_chat',false);
	popUpWin = window.open(url,'chatWindow','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=640,height=640' );
	if (navigator.appName == 'Netscape') {
		popUpWin.focus();
	}
} 


function helpInit() {
  var s = getQry("faq");
	var ans_id = getQry("ans_id");
  var iframe_src = "";
  if(s == 1){
    $("help_frame").src = "https://ticketmasterus.custhelp.com/app/answers/detail/a_id/1480/";
    $("help_frame").height = "1300";
  }
  else {
    $("help_frame").src = "https://ticketmasterus.custhelp.com/app/answers/list";  
  }
	
	if(ans_id != ""){
		$("help_frame").src = "https://ticketmasterus.custhelp.com/app/answers/detail/a_id/"+ ans_id +"/";
	}
}

if( $("help_frame") != undefined ) {
 window.onload = helpInit;
}