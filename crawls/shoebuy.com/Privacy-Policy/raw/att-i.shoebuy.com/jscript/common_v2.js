var $j = jQuery;

/* inputPrompt */
$j.fn.inputPrompt = function(options) {
	var defaults = {
		activeColor:'#000000',
		inactiveColor:'#999999'
	};

	var opts = $j.extend(defaults, options);
	if ( ! 'prompt' in opts)
		return false;

	var input = $(this);

	input.val(opts.prompt);
	input.addClass('inputprompt-off');
	//input.css({color:opts.inactiveColor});

	input.focus(function() {
		if (input.val() == opts.prompt)
		 input.val('');

		//input.css({color:opts.activeColor});
		input.removeClass('inputprompt-off').addClass('inputprompt-on');
	});

	input.blur(function() {
		if (input.val() == '')
		 input.val(opts.prompt);

		//input.css({color:opts.inactiveColor});
		input.removeClass('inputprompt-on').addClass('inputprompt-off');
	});
}

/* Generic function to open a popup window, with defaults */
function popup(url, height, width) {
	height = (height == null) ? 600 : height;
	width = (width == null) ? 525 : width;
	window.open(url, 'window','width=' + width + ',height=' + height + ',scrollbars=yes,resizable=1');
	return false;
}

/* detail zoom */
function enableZoom(element) {
	if (element == undefined) element = 'a#jblink';
	$j(element).jqzoom({
		zoomWidth: 200,
		zoomHeight: 200, 
		xOffset: 10,
		yOffset: 0,
		title: false,
		position: "right",
		preloadImages: false
	});
}

/* scroll widget */
$j.fn.scrollWidget = function() {
	$(this).find('ul li').hover(function() {
		$(this).find('a.scr-txtlink').animate({
		 marginBottom:'-20px'
		},
		200);
		$j('p#' + this.id + '-desc').insertAfter("#scroll-widget ul");
	},
	function() {
		$(this).find('a.scr-txtlink').animate({
		 marginBottom:'0'
		},
		200);
	});
}

function alternate(div_1, div_2) {
	$j('#' + div_1).toggle();
	$j('#' + div_2).toggle();
}

function fmtShippingCost(cost) {
	if (cost == 0) return 'FREE';
	else return '$' + formatPrice(cost);
}

// read a cookie by name
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		for (var j=0; c.charAt(j)==' '; ) j++;
		if (c.indexOf(nameEQ,j) == j) return c.substring(nameEQ.length+j);
	}
	return null;
}

function createCookie(name,value,days,domain,path) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	var cookie_domain = '';
	if(domain) {
		cookie_domain = '; domain=' + domain;
	}
	var cookie_path = '; path=';
	if(path) {
		cookie_path += path;
	} else {
		cookie_path += '/';
	}
	document.cookie = name+"="+value+expires+cookie_domain+cookie_path;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// decode a URL encoded string
function url_decode(str) {
	 return unescape(str.replace(/\+/g, " "));
}

// decode a base64 encoded string
function base64_decode(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
 
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
	while (i < input.length) {
 
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
 
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
 
		output = output + String.fromCharCode(chr1);
 
		if (enc3 != 64) {
		output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
		output = output + String.fromCharCode(chr3);
		}
 
	}
 
	return output;
}

// decode a URL safe base64 encoded string
function url_base64_decode (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    data += '';
 
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
 
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
 
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
 
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
 
    dec = tmp_arr.join('');
 
    return dec;
}

// encode a string using base64 encoding
function generic_base64_encode (data, charset) {
    var b64 = charset;
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
 
        bits = o1 << 16 | o2 << 8 | o3;
 
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
 
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
 
    enc = tmp_arr.join('');
    
    var r = data.length % 3;
    
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function base64_encode (data) {
	var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return generic_base64_encode(data, charset);
}

// encode a string using a URL safe base64 encoding
function url_base64_encode (data) {
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
    return generic_base64_encode(data, charset);
}

function loginMsg(settings) {
	if ( ! settings.baseurl_ssl)
		return false;

	if ( ! settings.loginphrase)
		settings.loginphrase = 'Log In';

	if ( ! settings.logoutphrase)
		settings.logoutphrase = 'Log Out';

	if ( ! settings.registerphrase)
		settings.registerphrase = 'Register';

	if ( ! settings.accountphrase)
		settings.accountphrase = 'Your Account';

	if ( ! settings.compact)
		settings.compact = false;

	if ( ! settings.login_url)
		settings.login_url = settings.baseurl_ssl + '/cust';

	if ( ! settings.logout_url)
		settings.logout_url = '/cust/logout';

	if ( ! settings.register_url)
		settings.register_url = settings.baseurl_ssl + '/cust/register';

	if ( ! settings.use_separate_elements)
		settings.use_separate_elements = false;

	if ( ! settings.hello_extra)
		settings.hello_extra = '';

	var lin = readCookie('lin');
	if ( ! lin) {
		var login_link = '<span id="sign-in"><a href="' + settings.login_url + '">' + settings.loginphrase + '</a></span>';
		if (settings.use_separate_elements) {
			document.getElementById(settings.login_element).innerHTML= login_link;
			document.getElementById(settings.register_element).innerHTML= '<a href="' + settings.register_url + '">' + settings.registerphrase + '</a>';
		} else if (settings.compact) {
			var currentLinks = document.getElementById('toplinks2');
			if (currentLinks != null)
				currentLinks.innerHTML = login_link + ' <span id="signin-or">or</span> <span id="sign-up"><a href="' + settings.register_url + '">' + settings.registerphrase + '</a></span>' + (/\S/g.test(currentLinks.innerHTML) ? ' | ' + currentLinks.innerHTML : '');
		} else {
			var usermsg = document.getElementById('usermsg');
			if (usermsg != null)
				usermsg.innerHTML = login_link + ' | <a href="' + settings.baseurl_ssl + '/cust">' + settings.accountphrase + '</a>';
		}
		return false;
	}

	lin = base64_decode(url_decode(lin)).split('\t');
	if ( ! lin[0])
		return false;

	if (settings.use_separate_elements) {
		document.getElementById(settings.welcome_element).innerHTML = '<span>Welcome, ' + lin[0] + '</span>';
		document.getElementById(settings.logout_element).innerHTML = '<a href="' + settings.logout_url + '">' + settings.logoutphrase + '</a>';
		if (settings.not_me_link_element) {
			document.getElementById(settings.not_me_link_element).innerHTML = '<span>(<a id="signin-not-me" href="' + settings.logout_url + '">Not ' + lin[0] + '</a>?)</span>';
		}
		if (settings.account_element) {
			document.getElementById(settings.account_element).innerHTML = '<a href="' + settings.baseurl_ssl + '/cust">' + settings.accountphrase + '</a>';
		}
	} else {
		var helloMsg = '<span id="signed-in"><span id="signed-in-hello">Hello, ' + lin[0] + '</span>' + settings.hello_extra + '</span> <span id="sign-out"><a href="' + settings.logout_url + '">' + settings.logoutphrase + '</a></span>';
		if ( ! settings.compact)
			helloMsg = helloMsg + ' | <a href="' + settings.baseurl_ssl + '/cust">' + settings.accountphrase + '</a>';

		document.getElementById('usermsg').innerHTML = helloMsg;
	}
	return true;
}

function setCartItemCount(elementName, singular, plural, isRecursive) {
	var element = document.getElementById(elementName);
	if (element == null)
		return;
	var crtqty = readCookie('sbcrt');
	if (!crtqty) {
		if (isRecursive) return;

		$j.get("/count_cart_items.jsp",
			function(data) {
				if (data && data.cart_qty == undefined)
					data = eval('(' + data + ')');
				var expdat = new Date();
				expdat.setDate(expdat.getDate()+1);
				var cookieVal = "sbcrt=" + data.cart_qty +
					"; path=/; expires=" + expdat.toGMTString() +
					((data.domain == undefined) ? "" : "; domain=" + data.domain);
				document.cookie = cookieVal;
				setCartItemCount(elementName, singular, plural, true);
			},
			"json");
		return;
	}

	var cartItemsText = crtqty + " " + ((crtqty != 1) ? plural : singular);
	element.innerHTML = cartItemsText;
}

function getBloomreachContent(url, pageType, searchTerm, prodId, prodName, 
		status, userAgent, referrer, relatedContentWrapper, moreResultsWrapper) 
{
	$j.get("/fetchBloomreachContent.jsp?url=" + url + "&pageType=" + pageType + "&searchTerm=" + searchTerm + "&prodId=" + prodId + "&prodName=" + prodName + "&status=" + status + "&userAgent=" + userAgent + "&referrer=" + referrer, 
			function(data) {
				if (data && (data.relatedContent || data.moreResults)) {
					if (data.relatedContent) {
						$j('#br-related-content').html(data.relatedContent);
						if (data.relatedContent.indexOf('</div>') != -1) {
							if (!relatedContentWrapper) relatedContentWrapper = 'br-related-content';
							$j('#' + relatedContentWrapper).show();
						}
					}
					if (data.moreResults) {
						$j("#br-more-results").html(data.moreResults);
						if (data.moreResults.indexOf('</div>') != -1) {
							if (!moreResultsWrapper) moreResultsWrapper = 'br-more-results';
							$j('#' + moreResultsWrapper).show();
						}
					}
				}
				try {
					var tracker = BrTrk.getTracker(0.2, br_data);
					tracker.enableTracking();
				}
				catch(err) { }
			},
			"json");
}

//Function to pick up current url parameters returns hash 
function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}

//function to add functions to existing body onload event so that you don't overwrite existing functions
function AddOnload(myfunc) {
	if(window.addEventListener)
		window.addEventListener('load', myfunc, false);
	else if(window.attachEvent)
		window.attachEvent('onload', myfunc);
}

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

(function($) {
	$.fn.tabwidget = function(options) {
		var widget = $(this);

		var headings = $('.tabwidget-pane > a.tabwidget-title');
		var panes = $('.tabwidget-pane');

		if (headings.length != panes.length)
		 return false;

		widget.prepend('<ul class="tabwidget-tabs clearfix"></ul>');
		var tabs = $(this).find('ul.tabwidget-tabs');

		var selected_tab = false;
		var hash = document.location.hash.substring(1);
		if (hash) {
		 hash = hash.split(':');
		 selected_tab = hash[0];
		 selected_res = hash[1];
		}

		for (i = 0; i < panes.length; i++) {
		 var badge = '';

		 /* --- Temporary --- */
		 if ($(headings[i]).attr('title') == 'Customer Photos')
			badge = '<img style="position: absolute; right: -14px; top: -16px;" src="/images/new_badge.png">';
		 /* --- /Temporary --- */

		 tabs.append('<li><a href="#' + $(headings[i]).attr('name') + '">' + $(headings[i]).attr('title') + '</a>' + badge + '</li>');
		 panes[i].id = 'tabwidget-pane-' + $(headings[i]).attr('name');
		}

		tabs.find('a').click(function() {
		 widget.find('.tabwidget-pane').css({display:'none'});
		 var anchor = $(this).attr('href').replace(/(.*)#/, '');
		 widget.find('div[id*=tabwidget-pane-' + anchor + ']').css({display:'block'});
		 tabs.find('li.selected').removeClass('selected');
		 $(this).parent('li').addClass('selected');
		 return false;
		});


		if (selected_tab)
		 tabs.find('a[href*=#' + selected_tab + ']').click();
		else
		 tabs.find('a:first').click();
	};
})(jQuery);

/* ftab1 : Featured widget */
(function ($) {
	$.fn.ftab1 = function(options) {
		settings = jQuery.extend({
			rotate: "n",
			rotateDelay: 4000,
			rotations: '0'
		}, options);
		
		var widget = $(this);
		widget.find('div.ftab1-pane').hide();

		widget.append('<ul></ul>');
		var numbers = widget.find('ul');
		var panes = widget.find('.ftab1-pane');
		for (i = 1; i <= panes.length; i++) {
		 numbers.append('<li><a href="#ftab1-pane' + i + '">' + i + '</a></li>');
		}

		numbers.find('li:first').addClass('active');
		widget.find('div.ftab1-pane:first').show();

		numbers.find('li').click(function() {
		 widget.find('div.ftab1-pane').hide();
		 widget.find('li.active').removeClass('active');
		 var anchor = $(this).children('a').attr('href').replace(/(.*)#/, '');
		 widget.find('div#' + anchor).fadeIn();
		 $(this).addClass('active'); /* meh...*/
		 return false;
		});

		var cycle = 0;
		var ftab1Auto, autoPlay;
		
		autoPlay = function() {
			var current = widget.find("li.active");
			if (current.next("li").html() != null) {
				current.next("li").click();
			} else {
				cycle++;
				widget.find("li:first").click();
			}
			if (cycle >= settings.rotations)
				clearInterval(ftab1Auto);
			return true;
		};
		
		if (settings.rotate == 'y') {
			ftab1Auto = setInterval(autoPlay, settings.rotateDelay);
			widget.find("ul a").click(function() {
				clearInterval(ftab1Auto);
			});
		}
			
	};
})(jQuery);

var toggle_closed_text = '[ + ]';
var toggle_open_text = '[ - ]';

$(function() {
	$('span[class="toggle_closed"]').text(toggle_closed_text);
	$('span[class="toggle_open"]').text(toggle_open_text);
});

function togglesign(element) {
	var index = element.id.lastIndexOf("_");
	if (index == -1)
		return false;
	var stem = "#" + element.id.substring(0, index);
	var sign = $(stem + "_sign");
	if (sign.text() == toggle_closed_text) {
		sign.text(toggle_open_text);
	}
	else {
		sign.text(toggle_closed_text);
	}
	$(stem + "_div").toggle();
	return false;
}

function formatPrice(c, d, t) {
	if (!d) d = ".";
	if (!t) t = ",";
	var whole = Math.floor(c / 100) + "";
	var frac = (c % 100) + "";
	if (frac.length == 1) frac = "0" + frac;
	var skip = (skip = whole.length) > 3 ? skip % 3 : 0;

	return (skip ? whole.substr(0, skip) + t : "") + whole.substr(skip).replace(/(\d{3})(?=\d)/g, "$1" + t) + d + frac;
}
