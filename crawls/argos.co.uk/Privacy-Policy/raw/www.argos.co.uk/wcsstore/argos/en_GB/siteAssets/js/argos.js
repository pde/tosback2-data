var argos = (function() {
	var _ecxreg = {};
	var _jsDir = this.app.siteAssetsDir + "js/";

	this.check = function(what) {
		// Like the usual checks, this shouldn't be required
		// but is available if it makes you feel better.
		if(!this[what]) this[what] = {};
	}

	this.ecxreg = function(obj) {
		// Store values from ecxreg available only in template, for retrieval in JS.
		var value = (obj && obj.constructor === (new String()).constructor);
		if(!value) {
			for(var i in obj) {
				_ecxreg[String(i)] = obj[i];
			}
		}
		return value ? _ecxreg[obj] : _ecxreg;		
	}

	this.history = (new function() {
		var _history = this;
		var _window = null;
		
		this.init = function(func, location) {
			// Use location if you want to set an initial value rather than a default of blank (empty string);
			var qs = "?" + (location ? location : "");
			_history.action = func;
			$("body").append($("<iframe id=\"history\" height=\"1\" width=\"1\" frameborder=\"0\" style=\"visibility:hidden\" src=\"" + _jsDir + "history.html" + qs + "\"></iframe>"));
		}
		
		this.setWindow = function(win) {
			// This should be called automatically in history.html
			if(!_window) {
				_window = win;
			} 
		}

		this.add = function(location, args) {
			// Use args if you want to make argos.history.args available to your action function.
			_history.args = args || [];
			if(_window) {
				_window.location.href = _window.location.pathname + "?" + location;
				_history.args = []; // reset.
			}
		}
	});

	this.tracking = (new function(){
		this.set = function(element, linkName, properties, delay){
			// Disable links by using in click event as "return argos.tracking.set(blah...);"
			// Add extra delay for tagging to happen by specifying a delay (ms) time.
			var s = s_gi(s_account);
			for( var p in properties ) {
				if(String(p) == "events") {
					s["linkTrackEvents"] += String("," + properties[p]);
				}
				s[p] = properties[p];
				s["linkTrackVars"] += String("," + p);
			}
			s["linkTrackEvents"] = s["linkTrackEvents"].replace(/^None,(.*)$/, "$1"); // Initial value and comma.
			s["linkTrackVars"] = s["linkTrackVars"].replace(/^None,(.*)$/, "$1"); // Initial value and comma.
			s.tl(element, "o", linkName);
			if(arguments.length > 3) {
				setTimeout(function() {
					if (element["href"]) {
						location.href = element.href;
					}
				}, delay);
			}
			return false;
		}
		
		this.setReferrer = function(s) {
			var ref = argos.url.getParameter(location.href, "sRefURL");
			if(ref != "") {
				s["referrer"] = argos.url.decode(ref);
			}
		}
		
		this.page = {
			// capture parent page omniture values.
			capture : function() {
				this.s = {
					pageName : s.pageName,
					prop4 : s.prop4,
					channel : s.channel,
					prop7 : s.prop7
				}
				//console.debug("capture: \n" + s.prop4 + "\n" + s.channel + "\n" + s.prop7);
			},
		
			// reset omniture values back to previous page values.
			reset : function() {
		    	s.pageName = argos.tracking.page.s.pageName;
				s.prop4 = argos.tracking.page.s.prop4;
				s.channel = argos.tracking.page.s.channel;
				s.prop7 = argos.tracking.page.s.prop7;
				//console.debug("reset: \n" + s.prop4 + "\n" + s.channel + "\n" + s.prop7);	
			},
			
			set : function(properties){
				// Set prop=blah on global 's' variable for passed property/value pairs.
				// Skip properties where value==null.
				for( var p in properties ) {
					if(properties.hasOwnProperty(p) && properties[p] != null) {
						s[p] = properties[p];
					}
				}
			}
		}
		
		this.cleanString = function(str) {
			str = str.toLowerCase();
			str = str.replace(/\s/g, ""); //remove whitespace
			str = str.replace(/\s/g, " "); //remove spaces 
			str = str.replace(/&/g, "and"); //replace & character
			str = str.replace(/>/g, ":"); //replace > character			
			str = str.replace(/</g, ":"); //replace > character
			str = str.replace(/[^\w\:\>\<\d]/g,""); //remove non alphanumeric	or ':'
			return str;
		}
		
		this.breadcrumb = function() {				
			var breadcrumb = $('#breadcrumb li a');	
			var results = [];		
			$.each(breadcrumb, function() {
				results.push($(this).text());
			});
			return results;
		}
		
		/*
		this.delayedGet = function(el, delay) {// get elements after event: args: element to find
			setTimeout(function(el, delay){ //wait for errors to populate						
				var collection = $(el);	
					returnCollection(collection);					
				},delay);		
			
			function returnCollection(collection) {			
				console.log(collection.length)
				return collection;
			}
		}
		*/
		
		
		

	});
	
	this.messages = new (function() {
		// Message property format when declared in script.
		//	argos.messages.myMessage = {
		//		title : "My Message Title",
	 	//		text : "<p>Whatever message text/mark-up I required</p>"
		//	};
		// Message format when declared in HTML file or page (add class="messageActivatee" to dl for in-page content).
		//	<dl>
		//		<dt>Remember me explained</dt>
		//		<dd>
		//			<p>If selected, this will save your email address and telephone number on any computer you use to sign in to your argos.co.uk account, so you don't have to re-enter it every time you visit our website.</p>
		//			<p>Not recommended if using a public computer.</p>
		//		</dd>
		// 		...
		//	</dl>
		this.addMessage = function(config) {
			this[config.id] = {
				title: config.title ? config.title : "",
				text: config.text
			}
		}
		
		this.addToHtml = function(content) {
			var $html = $(this.html);
			var tag = $html.length > 0 ? $html.get(0).tagName.toLowerCase() : "";
			if(content.length > 0 && $html.length > 0) {
				if(content.jquery) {
					content.each(function() {
						$html.append(this.innerHTML);
					});
				}
				else {
					// Content = Node or HTML
					$html.append(content);
				}
				this.html = "<" + tag + ">" + $html.html() + "</" + tag + ">";
			}
		}
		
		this.getFromHtml = function(str, showTitle) {
			var message;
			var $dt, $dd;
			if(this.html) {
				$dt = $(this.html).children().filter("dt:contains('" + str + "')");
				$dd = $dt.next("dd");
				if($dt.length > 0) {
					message = new Object();
					message.title = showTitle ? $dt.text() : ""; 
					message.text = $dd.html();
				}
			}
			return message;
		}
				
		this.addProducts = function($products) {
			// Pass jQuery collection of Product elements
			$products.each(function() {
				var $product = $(this);
				var tag = $product.get(0).tagName.toLowerCase();
				var pn = $product.contents("dd.number").text().match(/\d{7}/mi);
				var message = "";
				// If no part number something is wrong with product, so skip it.
				if(pn && pn.length > 0) {
					// Select what product information goes into message area.
					$product.children().not(".title, .number, .price").remove();
					message += "\n\t\t<" + tag + " class=\"product\">";
					message += "\n\t\t" + $product.html().replace(/[\t\r\n]/mig,"");
					message += "\n\t\t</" + tag + ">";
					argos.messages.addMessage({
						id: "PARTNUMBER_" + pn[0], 
						text: message
					});
				}
			});
		}
		
		this.html = "<dl></dl>"; // Default content. Gets actual content from messages.htm file.
	})

	this.cookie = new (function() {
		// Cookie handling
		this.set = function(name,value,days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			}
			document.cookie = name+"="+value+expires+"; path=/";
		}

		this.get = function(name) {
			var cookie = null;
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
					cookie = c.substring(nameEQ.length,c.length);
				}
			}
			return cookie;
		}

		this.remove = function(name) {
			this.set(name,"",-1);
		}
	});
	
	this.url = new (function() {
		var _constants = {
			URI_SEP : "?",
			PARAM_DELIM : "&",
			PARAM_ASSIGN_CHAR : "=",
			ANCHOR_CHAR : "#"
		};
		
		function _utf8Encode(str) {
			str = str.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < str.length; n++) {
				var c = str.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		}
		
		function _utf8Decode(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
		
		this.encode = function(str) {
			return escape(_utf8Encode(str));
	    }
	
		this.decode = function(str) {
			return _utf8Decode(unescape(str));
	    }
		
		// Pass variable name X, where X is "something" in example URL "my/example/url/name?something=blah".
		// Using the above example, this function returns "blah".
		this.getParameter = function(url, name) {
			var re = new RegExp(".*?[\?|&]{1}" + name + "=([^&]*)");
			var value = url.match(re);
			return value && value.length > 1 ? value[1] : null; 
		}
		
		this.getPathAndData = function(url) {
			var url = url || ""; // Defensive.
			var qsStart = url.indexOf("?");
			return {
				path : qsStart > 0 ? url.substr(0, qsStart) : url,
				data : qsStart >= 0 ? url.substr(qsStart + 1) : ""
			};
		}
		
		this.extractCatValues = function() {
			//usage: argos.url.extractCatValues()[0].text
			var results = [];			
			var toObject = function(str) {
				var split = str.split('|');
				var obj = {};				
				if (str.length > 0) {
					obj.level = split[0],
					obj.parent = split[1],
					obj.text = split[2],
					obj.id = split[3]
				}
				return obj;
			}
			results.push(toObject(argos.app.c1));
			results.push(toObject(argos.app.c2));
			results.push(toObject(argos.app.c3));
			results.push(toObject(argos.app.c4));
			results.push(toObject(argos.app.c5));			
			return results;
		}
		
	});
	
	
	
	return this;
}).call(argos);

