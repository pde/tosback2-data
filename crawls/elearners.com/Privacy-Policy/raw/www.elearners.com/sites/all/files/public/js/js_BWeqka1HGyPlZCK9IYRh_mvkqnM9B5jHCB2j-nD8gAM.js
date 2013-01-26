/*
*
* jQuery listnav plugin
* Copyright (c) 2009 iHwy, Inc.
* Author: Jack Killpatrick
*
* Version 2.1 (08/09/2009)
* Requires jQuery 1.3.2, jquery 1.2.6 or jquery 1.2.x plus the jquery dimensions plugin
*
* Visit http://www.ihwy.com/labs/jquery-listnav-plugin.aspx for more information.
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/

eval(function(p, a, c, k, e, r) { e = function(c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function(e) { return r[e] } ]; e = function() { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('(3($){$.15.16=3(f){4 g=$.1O({},$.15.16.1m,f);4 h=[\'T\',\'a\',\'b\',\'c\',\'d\',\'e\',\'f\',\'g\',\'h\',\'i\',\'j\',\'k\',\'l\',\'m\',\'n\',\'o\',\'p\',\'q\',\'r\',\'s\',\'t\',\'u\',\'v\',\'w\',\'x\',\'y\',\'z\',\'-\'];4 j=E;g.K=$.1P(g.K,3(n){F n.17()});F 7.1n(3(){4 d,8,$8,$5,$G,U;U=7.U;d=$(\'#\'+U+\'-1Q\');$8=$(7);4 e={},18=0,V=A,1R=0,X=\'\';3 1o(){d.1p(1q());$5=$(\'.6-5\',d).L(0,1);2(g.M)$G=$(\'.6-1r-1s\',d).L(0,1);1t();1u();2(g.1v)1w();1x();2(!g.Y)$8.N();2(!g.Y)$(\'.O\',$5).19();2(!g.1a)$(\'.T\',$5).19();2(!g.1S)$(\'.-\',$5).19();$(\':1y\',$5).P(\'6-1y\');2($.Z&&(g.Q!=H)){4 a=$.Z(g.Q);2(a!=H)g.10=a}2(g.10!=\'\'){j=A;$(\'.\'+g.10.17(),$5).L(0,1).1b()}D{2(g.Y)$(\'.O\',$5).P(\'6-11\');D{1c(4 i=((g.1a)?0:1);i<h.I;i++){2(e[h[i]]>0){j=A;$(\'.\'+h[i],$5).L(0,1).1b();1T}}}}}3 1z(){$G.1A({1d:$(\'.a\',$5).L(0,1).1U({1e:E,1V:A}).1d-$G.1W({1e:A})})}3 1t(){4 a,J,1X,R,$7,1B=(g.K.I>0);$($8).B().1n(3(){$7=$(7),J=\'\',a=$.1Y($7.1C()).17();2(a!=\'\'){2(1B){R=a.1f(\' \');2((R.I>1)&&($.1Z(R[0],g.K)>-1)){J=R[1].1D(0);1g(J,$7,A)}}J=a.1D(0);1g(J,$7)}})}3 1g(a,b,c){2(/\\W/.20(a))a=\'-\';2(!21(a))a=\'T\';b.P(\'6-\'+a);2(e[a]==1h)e[a]=0;e[a]++;2(!c)18++}3 1w(){1c(4 i=0;i<h.I;i++){2(e[h[i]]==1h)$(\'.\'+h[i],$5).P(\'6-22\')}}3 1u(){$8.1p(\'<1E C="6-12-13" 1F="1G:1H">\'+g.1I+\'</1E>\')}3 1i(a){2($(a).23(\'O\'))F 18;D{4 b=e[$(a).1J(\'C\').1f(\' \')[0]];F(b!=1h)?b:0}}3 1x(){2(g.M){d.1K(3(){1z()})}2(g.M){$(\'a\',$5).1K(3(){4 a=$(7).1L().1j;4 b=($(7).24({1e:A})-1)+\'25\';4 c=1i(7);$G.1A({1j:a,1M:b}).1C(c).N()});$(\'a\',$5).26(3(){$G.S()})}$(\'a\',$5).1b(3(){$(\'a.6-11\',$5).27(\'6-11\');4 a=$(7).1J(\'C\').1f(\' \')[0];2(a==\'O\'){$8.B().N();$8.B(\'.6-12-13\').S();V=A}D{2(V){$8.B().S();V=E}D 2(X!=\'\')$8.B(\'.6-\'+X).S();4 b=1i(7);2(b>0){$8.B(\'.6-12-13\').S();$8.B(\'.6-\'+a).N()}D $8.B(\'.6-12-13\').N();X=a}2($.Z&&(g.Q!=H))$.Z(g.Q,a);$(7).P(\'6-11\');$(7).28();2(!j&&(g.1k!=H))g.1k(a);D j=E;F E})}3 1q(){4 a=[];1c(4 i=1;i<h.I;i++){2(a.I==0)a.1N(\'<a C="O" 1l="#">29</a><a C="T" 1l="#">0-9</a>\');a.1N(\'<a C="\'+h[i]+\'" 1l="#">\'+((h[i]==\'-\')?\'...\':h[i].2a())+\'</a>\')}F\'<14 C="6-5">\'+a.2b(\'\')+\'</14>\'+((g.M)?\'<14 C="6-1r-1s" 1F="1G:1H; 1L:2c; 1d:0; 1j:0; 1M:2d;">0</14>\':\'\')}1o()})};$.15.16.1m={10:\'\',Y:A,2e:E,1a:A,1v:A,1I:\'2f 2g 2h\',M:A,Q:H,1k:H,K:[]}})(2i);', 62, 143, '||if|function|var|letters|ln|this|list||||||||||||||||||||||||||||true|children|class|else|false|return|letterCount|null|length|firstChar|prefixes|slice|showCounts|show|all|addClass|cookieName|spl|hide|_|id|isAll||prevLetter|includeAll|cookie|initLetter|selected|no|match|div|fn|listnav|toLowerCase|allCount|remove|includeNums|click|for|top|margin|split|addLetterClass|undefined|getLetterCount|left|onClick|href|defaults|each|init|append|createLettersHtml|letter|count|addClasses|addNoMatchLI|flagDisabled|addDisabledClass|bindHandlers|last|setLetterCountTop|css|hasPrefixes|text|charAt|li|style|display|none|noMatchText|attr|mouseover|position|width|push|extend|map|nav|numCount|includeOther|break|offset|border|outerHeight|firstWord|trim|inArray|test|isNaN|disabled|hasClass|outerWidth|px|mouseout|removeClass|blur|ALL|toUpperCase|join|absolute|20px|incudeOther|No|matching|entries|jQuery'.split('|'), 0, {}))
;
(function ($) {
	$(document).ready(function(){
		var toggleBrowseOriginalText = $(".toggle-accordion-trigger").text();
		$(".toggle-accordion-trigger").click(function(event){
			event.preventDefault();
			var toggleAltText = $(this).attr("data-read-less-text");
			$('.ellipsis, .overflow').toggle();
			$(".accordion-content").slideToggle(500);
			$(this).text($(this).text() == toggleBrowseOriginalText ? toggleAltText : toggleBrowseOriginalText);
			$(this).toggleClass('active');
		});

		//Details Tabs
		
		//Add Button inside Content
		var $detailsButtonHTML = $('.detail-request-info-button-holder').html();
		$('.group-tab-1 .fieldset-wrapper, .has-button .fieldset-wrapper').after($detailsButtonHTML);
		
		//Add Second title using the tab title
		$('.add-title-to-item').each(function(){
			var $detailsTabTitle = $(this).find('.fieldset-legend').text();
			$(this).find('.field-item').before('<h2>' + $detailsTabTitle + '</h2>');
		});
		
		//Newsletter Signup
		var emailField = $(".newsletter-signup .form-text");
		
		// var $originalValue;

		// if($(emailField).val() == "") {
			// $(emailField).val("Enter Your Email");
			// var $originalValue = emailField.val();
		// }
		
		var $originalValue = "Enter Your Email";
		
		if($(emailField).val() == "") {
			$(emailField).val($originalValue);
		}

		$(emailField).focus(function(){
			if($(this).val() == $originalValue){
				$(this).val("");
			}
		});
		$(emailField).blur(function(){
			if($(this).val() == ""){
				$(this).val($originalValue);
			}
		});
		
		$('.newsletter-signup .form-submit').click(function(){
			if(emailField.val() == '' || emailField.val() == $originalValue){
				alert('Please enter an email address.');
				return false;
			}
		});
		
		
		//Add Newsletter Thank You Message.
		var thankYouHTML = '\
			<div id="node-15" class="node node-webform clearfix" about="/content/newsletter-signup/" typeof="sioc:Item foaf:Document"> \
			  <div class="content clearfix"> \
				<div class="field field-name-body field-type-text-with-summary field-label-hidden"> \
				  <div class="field-items"> \
				    <div class="field-item even" property="content:encoded"> \
				      <h3>Bonus!</h3> \
				      <h3>Free e-book:</h3> \
				      <p>Get Set for Learning</p> \
				      <p>Thank you for signing up for our newsletter!</p> \
				      <p>To sign up with a different email address <a href="?reset_newsletter=true">click here!</a></p> \
				      <p>Your privacy is important to us. View our <a href="/help/privacy.asp">policy</a>.</p> \
					</div> \
				  </div> \
				</div> \
			  </div> \
			</div>';

		if($.cookie('newsletter') == 'submitted'){
			$('.newsletter-signup .content').html(thankYouHTML);
		}
		
		// Share-this box
		$(".blog .share-this").click(function(event){
			event.preventDefault();
			
			$(this).parents(".header-links-container").find(".share-box").css("display","block");
		});
		$(".blog .share-box .close").click(function(event){
			event.preventDefault();
			$(this).parents(".header-links-container").find(".share-box").css("display","none");
		});
		/* close share-this box when click document
		// $(document).click(function(event) {
			// //$(".blog .share-box").css("display","none");
		// });
		*/
		// Active First Question When First Time Load FAQs about Teacher Certification
		
		//FAQ Content Accordion
		$(".faq-content:first").slideDown(500).parents("li").addClass("active");
		$(".faq-title").click(function(){
			if(!$(this).next().is(':visible')) {
				$(this).parents(".faq-holder").find(".faq-content:visible").slideUp(500).parents("li").removeClass("active");
				$(this).next().slideDown(500).parents("li").addClass("active");
			}
		});
		
		//Accordian Menu for Mini Guides Section
		$("a.numbered-list-link").click(function(event){
			$(this).parents("li").find(".hidden").slideToggle(500);
			$(this).parents("li").toggleClass("active");
			return false;
		});
		
		//Blog Search
		$(".blog-search input").click(function(){		
			if($(this).val() == "Search Blogs for..."){
				$(this).addClass("active").val("");
			}
		});
		
		//Blog Comments -- move submitted info below title
		$('#comments .comment .submitted').each(function(){
			$(this).insertAfter(($(this)).parents(".comment").find(".comment-text h3"));
		});
		
		//Check Zip Code on Campus Page
		$('#campus-search-submit').click(function(){
			if($('#campus-zip-code-field').val() == '' || $('#campus-zip-code-field').val().length < 5){
				alert("Please enter a valid zip code.");
				return false;
			}
		});

		$('#campus-zip-code-field').keyup(function() {
			$(this).val($(this).val().replace(/[^\d]/g,''));
		});

		//Adds Alpha list for School Page
		 // $('#all-accredited-online-colleges').listnav({
			 // initLetter: 'a',
			 // showcounts: false,
			 // onClick: function(letter){addLastClass(letter)},
			 // includeAll: true
		 // });
		 
		 // function addLastClass(letter){
			// $('#all-accredited-online-colleges').find('li:visible:last').addClass('listing-row-last');
		 // }addLastClass('a');
		 
		 //Adds Hash URL to Tabs on Details Pages
		 $('.horizontal-tab-button').each(function(){
			$(this).find('a').attr('href', '#' + $(this).text().toLowerCase().replace(' ','-'));
		 });
		 
		 //Adds DIV to the page for International Student Pop-Up
		 $('#page-wrapper').before('<div class="element-hidden pop-up-holder" id="internationl-pop-up"></div>');

	});
	
	$(window).bind("load", function() {

	
		//International Student Pop-Up
		function getCountryCode(){
			var result = null;
			$.ajax({
				url: '/sites/all/files/pop_ups/country.php',
				type: 'GET',
				async: false,
				success: function(data) {
					$.cookie('countryCode', data, {path: '/', expires: 365});
					result = data;
				}
			});
			return result;
		}
		
		var countryCode;
		if($.cookie('countryCode') == null)	
			countryCode = getCountryCode();
		else
			countryCode = $.cookie('countryCode');
		
		//Adds Overlay for international students
		if((countryCode != 'US' && countryCode != 'CA') && $.cookie('InternationalPop') != 'False'){
			
			$('#page-wrapper').before('<div class="pop-up-overlay" id="internationl-overlay"></div>');
			$('#internationl-pop-up').load('/sites/all/files/pop_ups/international.php', function(){
				$("#internationl-pop-up").fadeIn(100);
			});
			$("#internationl-pop-up").css("left", $(window).width() / 2 - ($("#internationl-pop-up").width() / 2));
			//$("#internationl-pop-up").css("top", (($(window).height() - $("#internationl-pop-up").outerHeight()) / 2) + $(window).scrollTop() + "px");
		
			//Sets Google Analytics Event for a View
			_gaq.push(['_trackEvent', 'International Pop Up', 'View', countryCode]);
		
		}
		
		$("#close-pop-up").live("click", function(event){
		
			event.preventDefault();
			$("#internationl-pop-up, .pop-up-overlay").fadeOut(500);
			
			$.cookie('InternationalPop', 'False', {path: '/', expires: 365});
			
			//Sets Google Analytics Event for an Exit and an Opt Out
			_gaq.push(['_trackEvent', 'International Pop Up', 'Close', countryCode]);

		});
		
		$(".pop-up-overlay").live("click", function(event){
			
			event.preventDefault();
			$("#internationl-pop-up, .pop-up-overlay").fadeOut(500);
			
			//Sets Google Analytics Event for an Exit without Opt Out
			_gaq.push(['_trackEvent', 'International Pop Up', 'Escape', countryCode]);
		
		});
		
		$(".int-uab-link").live("click", function(event){
			
			//Sets Google Analytics Event for a Click to go to UAB
			_gaq.push(['_trackEvent', 'International Pop Up', 'Click', countryCode]);
		
		});
		
		

	
	});
	
	//End Document Ready
})(jQuery);;
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};;
