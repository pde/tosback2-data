$(function(){			   
	//Focus for form inputs
	focusfix("input:text, textarea, select, input:password","focused");

	phoneFormatter();
	
	// Tab functionality
	//setTabs();
	var tab, openTab;
	if (parseParm("tab")){
		openTab = '#'+ parseParm("tab");
		$(openTab).trigger('click');
	}

	// Table striping
	if($("table.data").length){
		dataTables();
	}

	$(".bulletlist, .tabcontentlist").find("li:odd").addClass("odd");

	$(".box").each(function(){
		$(this).prepend("<div style='float:left;position:relative;width:0;height:0;'><div class='box-overlay' style='height:" + $(this).height() + "px; width:" + ($(this).width() - 14) + "px;'></div></div><div class='clear'></div>");
	});

	$("a.pop-up").live('click', function(e) {
		var thisLeft = ($(window).width()/2) - 340,
			newHeight = 600;
			if($("body").is("#shopping-cart")){
				newHeight = 350;
			}
		var po = window.open($(this).attr("href"),'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=702,height=' + newHeight + ',top=120,left=' + thisLeft);
		e.preventDefault();
	});
	
	$(".infoMessages .expand").click(function(){
		var btnImg = $(this).find("img");
		if($(this).hasClass('full-open')){
			btnImg.attr('src',btnImg.attr('src').replace('collapse','expand'));
			$(this).removeClass('full-open');
		} else {
			btnImg.attr('src',btnImg.attr('src').replace('expand','collapse'));
			$(this).addClass('full-open');
		}
		$(this).parent().find(".full-details").toggle();						
	});
	
	$(".toggleButton img").click(function(){
		if($(this).parent().hasClass("open")){
			$(this).attr("src", $(this).attr("src").match(/[^\.]+/) + "-close.gif");
			$(this).parent().removeClass("open");
			$("#toggleDetails").show();
		} else {
			$(this).attr("src", $(this).attr("src").replace("-close", ""));
			$(this).parent().addClass("open");
			$("#toggleDetails").hide();
		}
	});
	
	$("#email-deals-signup").submit(function(){
		var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
		
		if (!emailfilter.test(this.email.value)) {
			alert("Please enter a valid email address.");
			return false;
		} else if ((this.firstname.value == "")) {
			alert("Please enter your first name.");
			return false;
		} else if ((this.zipcode.value.length < 5)) {
			alert("Please enter a valid 5 digit U.S. ZIP code or a Canadian postal code.");
			return false;
		}
	});

	$("#email-login").submit(function(){
		var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
		
		if (!emailfilter.test(this.eMail.value)) {
			alert("Please enter a valid email address.");
			return false;
		}							  
	});
	
	$("a[rel*=facebox]").facebox({
        loadingImage : '/images/colors/color1/loading.gif',
		closeImage   : '/images/buttons/close-pop-up.gif'
      });

	//Function for limiting character count in text form fields

	$('textarea#comments').keyup(function() {
		var char = $(this).val();
		var charLength = char.length;
		$('span#charCount').html(charLength + ' / 400');
		if(charLength > 400){
			$('span#charCount').html('<strong>You may only have up to 400 characters.</strong>');
			var new_text = char.substr(0, 400);
			$(this).val(new_text);
		}
	});
	
	//MSP swap function
	$('#msp .over').hover(function(){
		$(this).attr('src',$(this).attr('src').replace('.jpg','_over.jpg'));
	},
	function(){
		$(this).attr('src',$(this).attr('src').replace('_over.jpg','.jpg'));
	});
	
	$('.default-value').each(function() {
		   var default_value = this.value;
		   $(this).focus(function(){
			   if(this.value == default_value) {
					this.value = '';
			   }
		   });
		   $(this).blur(function(){
			   if(this.value == '') {
					this.value = default_value;
			   }
		   });
	});
	
});

function phoneFormatter(){
	var phoneField = $("input[name*='phone']"),
		countryField = $("select[name*='country']").eq(0),
		country = countryField.val();
		
		if(country == "US" || countryField.length == 0){
			phoneField.mask("(999) 999-9999");
	}
		
		$(countryField).change(function(){
			country = countryField.val();
			if(phoneField.length && country == "US"){
				phoneField.mask("(999) 999-9999");
			} else {
				phoneField.unmask();
			}
		});
}

function dataTables(){
	$("table.data").each(function(){
		$(this)
			.find("tr:odd").addClass("odd")
			.find("td:first, th:first").addClass("hpadding6 padding6")
			.find("td:last, th:last").addClass("last");
	});
}

var oldIE = false;
	
	if($.browser.msie && $.browser.version < 7){
		oldIE = true;
	}

// Navigation drop downs
function setDropDown(){
	$("#main-nav").children().hover(
		function(){
			$(this).addClass("active").siblings().removeClass("active");
			if(oldIE){
				$(this).append('<iframe src="javascript:;" frameborder="0" id="ie-menu-fix"></iframe>');
			}
		},
		function(){
			$(this).removeClass("active");
			if(oldIE){
				$(this).find("#ie-menu-fix").remove();
			}
	});
}

function searchClear(){
	$('#search .text-input').focus(function() {
		$(this).addClass('focused');
		if($(this).val() == "Keyword(s) or Item #"){
			$(this).val('');
		}
	});
	$('#search .text-input').blur(function() {
		$(this).removeClass('focused');
		if($(this).val() == ""){
			$(this).val("Keyword(s) or Item #");
		}
	});
}

function checkSearchForm(form) {
	var keyword = document.NTECatalogSearchForm.searchTerm.value;;
	if (keyword == "" || keyword == "Keyword(s) or Item #")
	{
	alert("Please enter a value in the search box");
	 return false;
	}
}
function checkSearchForm2(form) {
	var keyword = document.NTECatalogSearchForm2.searchTerm.value;;
	if (keyword == "" || keyword == "Keyword(s) or Item #")
	{
	alert("Please enter a value in the search box");
		return false;
	}
}

// Text input field focus
function focusfix(selector, className) {
	$(selector).focus(function() {
		$(this).addClass(className);
	});
	$(selector).blur(function() {
		$(this).removeClass(className);
	});
}

function getCookie (name) {
  var arg = name + "=";
	if (document.cookie.length > 0) { // if there are any cookies
		offset = document.cookie.indexOf(arg);
		if (offset != -1) { // if cookie exists
			offset += arg.length;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// set index of end of cookie value
			if (end == -1)
				end = document.cookie.length;
				return unescape(document.cookie.substring(offset, end));
      }
    }
}

function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value, expires, path) {
  document.cookie=name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "");
}

function SetSessionCookie(name, value, path) {
  document.cookie=name + "=" + escape(value) +
    ((path) ? "; path=" + path : "");
}

// Mac date fix
function FixCookieDate(date) {
	var base=new Date(0);
	var sku=base.getTime();
	if (sku > 0) { date.setTime(date.getTime() - sku); }
}

function deletesignOutCookie(){
	var expdate = new Date("dec 25,2000 00:00:00");
	FixCookieDate(expdate);  // For Mac bug
	SetCookie("sign_out", "", expdate, "/"); // remove sign out link from header: eckman
}

// Header quick cart
function itemInCart(sku) {
	var skusearch = sku + '#';
	var cartItems = getCookie("CartItems");
	if (cartItems != null && cartItems != "") {
		var index = cartItems.indexOf(skusearch);
		return index != -1;
	}
	return false;
}

function deleteCookie(name){
	var expdate = new Date("dec 25,2000 00:00:00");
	FixCookieDate(expdate);  // For Mac bug
	SetCookie(name, "", expdate, "/"); 
}

function eraseCookies(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function resetCookies() {
	eraseCookies("cOrdId","",-1);
	eraseCookies("PaRes","",-1);
	eraseCookies("promoKey","",-1);
	eraseCookies("NTE_ship","",-1);
}

function parseit(optStr){ //Ron
	var oarray = new Array();
	var urlArg = new Array();
	oarray = optStr.split("&");
	for (var loop = 0; loop < oarray.length; loop++) {
		var broken_info = oarray[loop].split("=");
		var the_property = broken_info[0];
		var the_value = broken_info[1];
		if (the_property) urlArg[the_property] = the_value;
	}
	return urlArg;
}
	
function parseParm(name) {
	var regexS = "[\\?&]"+name+"=([^&#]*)",
		regex = new RegExp( regexS ),
		tmpURL = window.location.href,
		results = regex.exec( tmpURL );
  if( results == null ) return "";
  else return results[1];
}

/* Removes all whitespace (spaces, tabs, and line breaks) right to left */
function stringTrimR(strToTrim) {
	return(strToTrim.replace(/\s+$/g, ''));
}
/* Left to right */
function stringTrimL(strToTrim) {
	return(strToTrim.replace(/^\s+/g, ''));
}
/* From both sides */
function stringTrim(strToTrim) {
	return(strToTrim.replace(/^\s+|\s+$/g, ''));
}

function setTabs() {
	$(".tab-container").each(function(){
		var tabs = this;
		var tabcontent = $(".tab-content-container").eq($(".tab-container").index(this));
		$(this).find(".tab")
			.click(function(){
				$(tabs).find(".tab").removeClass("open");
				$(this).removeClass("hover").addClass("open");
				$(".tab-content").eq($(".tab").index(this)).parent().find(".tab-content").removeClass("open");
				$(".tab-content").eq($(".tab").index(this)).addClass("open");
			})
			.hover(function(){
					$(this).addClass("hover");
			},
			function(){
				$(this).removeClass("hover");
			});
		$(this).find(".tab").removeClass("open");
		$(tabcontent).find(".tab-content").removeClass("open");
		$(this).find(".tab").eq(0).addClass("open");
		$(tabcontent).find(".tab-content").eq(0).addClass("open");
	});
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode > 31 && (charCode <= 46 || charCode > 57 || charCode == 47))) {
		return false;
	}
	return true;
} 

// Cookie parsing plugin
jQuery.returnCookie = function(cookie) {
	var string = getCookie(cookie);
	var array = new Array();
	if(string) {
		$(string.split("|")).each(function(){
			var child = new Array();
			if(this.length > 0) {
				$(this.split("~")).each(function(){
					if(this != "") {
						child.push(this);
					}
				});
				array.push(child);
			} 
		});
	}
	if(array == "") {
		return false;
	} else {
		return $(array);
	}
}

//Function for tax form lists in Customer Help static content
	$('#stateforms').change(function(){
		var state = $(this).val();
		var forms = $('#taxExemptForms tbody tr');
					
		if(state == "ALL"){
			forms.show();
		} else {
			forms.each(function(){
				if($(this).hasClass(state)){
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}
	});


/*
var prefix = window.parent.document.location.protocol + "//";
var site = "www.northerntool.com";
var fullUrl = prefix + site;

function include(filename){
	document.write('<script type="text/javascript" src="'
	+ fullUrl + filename + '"></scr' + 'ipt>'); 
}

include("/storestatic/en_US/html/js/search/jquery.jsonSuggest.js");
include("/storestatic/en_US/html/js/search/json2.js");
*/

var prefix = window.parent.document.location.protocol + "//";
var site = window.parent.document.domain;
var fullUrl = prefix + site;

function include(filename){
	document.write('<script type="text/javascript" src="'
	+ fullUrl + filename + '"></scr' + 'ipt>'); 
}

include("/javascript/coreMetrics.js");

