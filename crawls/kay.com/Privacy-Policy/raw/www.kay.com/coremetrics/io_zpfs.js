/*
 * JSON@ script added at beginning to provide JSON object in IE 6 & IE 7
 */

/*
 http://www.JSON.org/json2.js
 2011-02-23

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value any JavaScript value, usually an object or array.

 replacer an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear() + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate()) + 'T' +
 f(this.getUTCHours()) + ':' +
 f(this.getUTCMinutes()) + ':' +
 f(this.getUTCSeconds()) + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
var JSON;
if (!JSON) {
	JSON = {};
}

( function() {
	"use strict";

	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}

	if (typeof Date.prototype.toJSON !== 'function') {

		Date.prototype.toJSON = function(key) {

			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-'
					+ f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate())
					+ 'T' + f(this.getUTCHours()) + ':'
					+ f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds())
					+ 'Z' : null;
		};

		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
				key) {
			return this.valueOf();
		};
	}

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { // table
																																																																						// of
																																																																						// character
																																																																						// substitutions
		'\b' : '\\b',
		'\t' : '\\t',
		'\n' : '\\n',
		'\f' : '\\f',
		'\r' : '\\r',
		'"' : '\\"',
		'\\' : '\\\\'
	}, rep;

	function quote(string) {

		// If the string contains no control characters, no quote characters,
		// and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe
		// escape
		// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable,
				function(a) {
					var c = meta[a];
					return typeof c === 'string' ? c : '\\u' + ('0000' + a
							.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' : '"' + string + '"';
	}

	function str(key, holder) {

		// Produce a string from holder[key].

		var i, // The loop counter.
		k, // The member key.
		v, // The member value.
		length, mind = gap, partial, value = holder[key];

		// If the value has a toJSON method, call it to obtain a replacement
		// value.

		if (value && typeof value === 'object'
				&& typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

		// What happens next depends on the value's type.

		switch (typeof value) {
		case 'string':
			return quote(value);

		case 'number':

			// JSON numbers must be finite. Encode non-finite numbers as null.

			return isFinite(value) ? String(value) : 'null';

		case 'boolean':
		case 'null':

			// If the value is a boolean or null, convert it to a string. Note:
			// typeof null does not produce 'null'. The case is included here in
			// the remote chance that this gets fixed someday.

			return String(value);

			// If the type is 'object', we might be dealing with an object or an
			// array or
			// null.

		case 'object':

			// Due to a specification blunder in ECMAScript, typeof null is
			// 'object',
			// so watch out for that case.

			if (!value) {
				return 'null';
			}

			// Make an array to hold the partial results of stringifying this
			// object value.

			gap += indent;
			partial = [];

			// Is the value an array?

			if (Object.prototype.toString.apply(value) === '[object Array]') {

				// The value is an array. Stringify every element. Use null as a
				// placeholder
				// for non-JSON values.

				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}

				// Join all of the elements together, separated with commas, and
				// wrap them in
				// brackets.

				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap
						+ partial.join(',\n' + gap) + '\n' + mind + ']'
						: '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}

			// If the replacer is an array, use it to select the members to be
			// stringified.

			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === 'string') {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {

				// Otherwise, iterate through all of the keys in the object.

				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}

			// Join all of the member texts together, separated with commas,
			// and wrap them in braces.

			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap
					+ partial.join(',\n' + gap) + '\n' + mind + '}'
					: '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}

	// If the JSON object does not yet have a stringify method, give it one.

	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function(value, replacer, space) {

			// The stringify method takes a value and an optional replacer, and
			// an optional
			// space parameter, and returns a JSON text. The replacer can be a
			// function
			// that can replace values, or an array of strings that will select
			// the keys.
			// A default replacer method can be provided. Use of the space
			// parameter can
			// produce text that is more easily readable.

			var i;
			gap = '';
			indent = '';

			// If the space parameter is a number, make an indent string
			// containing that
			// many spaces.

			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}

				// If the space parameter is a string, it will be used as the
				// indent string.

			} else if (typeof space === 'string') {
				indent = space;
			}

			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.

			rep = replacer;
			if (replacer
					&& typeof replacer !== 'function'
					&& (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}

			// Make a fake root object containing our value under the key of ''.
			// Return the result of stringifying the value.

			return str('', {
				'' : value
			});
		};
	}

	// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== 'function') {
		JSON.parse = function(text, reviver) {

			// The parse method takes a text and an optional reviver function,
			// and returns
			// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key) {

				// The walk method is used to recursively walk the resulting
				// structure so
				// that modifications can be made.

				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}

			// Parsing happens in four stages. In the first stage, we replace
			// certain
			// Unicode characters with escape sequences. JavaScript handles many
			// characters
			// incorrectly, either silently deleting them, or treating them as
			// line endings.

			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16))
							.slice(-4);
				});
			}

			// In the second stage, we run the text against regular expressions
			// that look
			// for non-JSON patterns. We are especially concerned with '()' and
			// 'new'
			// because they can cause invocation, and '=' because it can cause
			// mutation.
			// But just to be safe, we want to reject all unexpected forms.

			// We split the second stage into 4 regexp operations in order to
			// work around
			// crippling inefficiencies in IE's and Safari's regexp engines.
			// First we
			// replace the JSON backslash pairs with '@' (a non-JSON character).
			// Second, we
			// replace all simple value tokens with ']' characters. Third, we
			// delete all
			// open brackets that follow a colon or comma or that begin the
			// text. Finally,
			// we look to see that the remaining characters are only whitespace
			// or ']' or
			// ',' or ':' or '{' or '}'. If that is so, then the text is safe
			// for eval.

			if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

				// In the third stage we use the eval function to compile the
				// text into a
				// JavaScript structure. The '{' operator is subject to a
				// syntactic ambiguity
				// in JavaScript: it can begin a block or an object literal. We
				// wrap the text
				// in parens to eliminate the ambiguity.

				j = eval('(' + text + ')');

				// In the optional fourth stage, we recursively walk the new
				// structure, passing
				// each name/value pair to a reviver function for possible
				// transformation.

				return typeof reviver === 'function' ? walk( {
					'' : j
				}, '') : j;
			}

			// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError('JSON.parse');
		};
	}
}());

function io_zpfs(a_product_ids, zone, symbolic, target_id, category,
		rec_attributes, target_attributes, target_header_txt, ab_test_id,
		div_id, b_display_target) {
	var html = "<!-- " + zone + "_zp: No recommendations returned -->";

	if (symbolic !== '_NR_'&& div_id == 'more-products-love') {
		var html = document.getElementById(div_id).innerHTML + "<ul class='related'>";

		var i_description = 0;
		var i_image_url = 3;
		var image_prefix = '/images/products';

		var n_recs = a_product_ids.length;
		var lines = [];
		var width = 100 / n_recs;
		var xmlhttp = getAjaxObject();
		if (xmlhttp) {

			xmlhttp.onreadystatechange = function(pricingResponse) {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					result = xmlhttp.responseText;
					ind = result.indexOf("*");
					result = result.substring(ind + 1);
					ind = result.indexOf("*");
					result = result.substring(0, ind);
					var the_object = {};
					the_object = JSON.parse(result);
					pricingResponse = the_object["priceList"];
					priceArray = the_object["priceMap"];
					ratingsMap = the_object["ratingsMap"];
					catentryMap = the_object["catentryMap"];
					// Ratings icon path with products.
					loadPDPRecs(priceArray, ratingsMap,catentryMap);		
					document.getElementById(div_id).innerHTML = html;
					//if (symbolic !== '_NR_')
						//loadQV();
				}

			};
			xmlhttp.open("GET",
					"SterlingAJAX?method=getcmiopricing&methodParams="
							+ encodeURIComponent(a_product_ids), true);
			xmlhttp.send(null);
		}

	}
	
	if (symbolic !== '_NR_'&& div_id == 'hp_io_zone') {
		//var html = '<h3 style="text-align : center;" class="feature-title">Featured Items</h3><hr class="dottedline">';
		var html = "";
		var i_description = 0;
		var i_image_url = 3;
		var image_prefix = '/images/products';

		var n_recs = a_product_ids.length;
		var lines = [];
		loadHPRecs();
		document.getElementById(div_id).innerHTML = html;		
	}

	//To load recommendations.
	function loadPDPRecs(pricingResponse, ratingsMap,catentryMap) {
		for ( var ii = 0; ii < n_recs; ii++) {
			if(ii <= 4) {
				lines.push("<li>");
				
				var rec_prod_id = b_display_target ? (ii == 0 ? target_id : a_product_ids[ii - 1]) : a_product_ids[ii];
				var imageAlt = "No Image Available";
				var productName = rec_attributes[ii][0];
				var labels = rec_attributes[ii][1];
				var image = rec_attributes[ii][2];
				var seoUrl = rec_attributes[ii][3];
				var ratings = rec_attributes[ii][4];
				var style = rec_attributes[ii][5];
				var isModelThree = false;
				var storeId = 10101;
				var startingAt = "";
				var alt_product_name = "";
				
				if (style && style != rec_prod_id) {
					isModelThree = true;
				}
				
				alt_product_name = productName.replace(/\|/g, ' ');
				alt_product_name = alt_product_name.replace(/\'/g, '&apos;');
				alt_product_name = alt_product_name.replace(/$/, ', ');
				
				productName = productName.replace(/\|/g, "<br/>");
				
				if (!image) {
					image = image_prefix + "/NoImageIcon_sm.jpg";
				}
				
				if (productName) {
					imageAlt = productName.replace(/\<br\/\>/g, " ");
				}
				
				var selected_href = "";
				if (isModelThree) {
					selected_href = "/personalizedProduct|" + storeId + "|" + catalogId + "|"+ langId + "||||||||||" + rec_prod_id.replace(style, "") + "|" + style;
					startingAt = "Starting at";
				}
				else {
					selected_href = "/" + "product1|" + storeId + "|" + catalogId + "|" + langId + "|" + rec_prod_id + "|" + topCatId + "|" + bcCatIds + "||||" + zone + "|" + zone;  // href for link
					image = image_prefix + image;
				}
				
				var price = 0;
				if ((pricingResponse) && (pricingResponse[rec_prod_id])) {
					price = pricingResponse[rec_prod_id];
				} 
				
				var catEntryDisplayUrl = "Product2" + "?catalogId=" + catalogId + "&storeId=" + storeId + "&productId=" + rec_prod_id + "&langId=" + langId + "&parent_category_rn=&top_category=";
				
				var compareImageDescription = "No Image";			
				
				var thumbnailImg = image_prefix + "NoImageIcon_sm45.jpg";
				if (image) {
					thumbnailImg = image_prefix + image.substring(0, image.indexOf("_")) + "_MV_TB" + image.substring(image.length-4, image.length);
				}

				var ratingImg = "/img/bv/small/rating-0_0.gif";
				var alt_text_rating = "0";
				if (ratings) {
					var iRating = parseInt(ratings*10)/10;
					ratings = iRating.toString();
				
					if (ratings.indexOf(".") < 0) {
						ratings += ".0";
					}
					
					ratingImg = "/img/bv/small/rating-" + ratings.toString().replace(".","_") + ".gif";
					alt_text_rating = ratings;
				}
				
				var compareCatentryId = '';
				if(catentryMap && catentryMap[rec_prod_id]){
					compareCatentryId = catentryMap[rec_prod_id];
				} else {
					compareCatentryId = rec_prod_id;
				}
				
				var quickViewURL = getAbsoluteURL() + "QuickView?storeId="+ storeId +"&catalogId="+catalogId
					+"&langId="+langId+"&productId="+rec_prod_id+"&prdImage="+escape(image)+"&amp;partNumber="
					+ rec_prod_id+ "&amp;topCat="+ topCatId+"&amp;bcCatIds="+ bcCatIds+ "&amp;io="+ zone
					+"&amp;productName="+ imageAlt.replace("<br/>", "");
				
				lines.push("<div class='img-wrap'><a class='tips' onclick='return false;' href='"+quickViewURL+"' " 
						+ "rel='"+quickViewURL+"' aria-hidden='true' role='presentation' tabindex='-1'>"
						+ "<img alt='' onclick='return false;' oncontextmenu='return false;' role='presentation' src='" + image
						+ "' class='img-product-border'></img>"
						+ "</a></div>");
				
				lines.push("<a href='" + selected_href + "'>" + imageAlt + "</a>");
				
				lines.push("<p class='price'>" + startingAt + " $" + parseFloat(price).toFixed(2) + "</p>");
				
				//alert("productName = " + productName);
				lines.push("<div><span class='rating'><a href='" + selected_href + "?reviews'>" + 
						"<img src='" + ratingImg + "' alt='" + alt_product_name + alt_text_rating + " out of 5 stars'>"+ "</a></span></div>");
				
				if (!isModelThree) {
					lines.push("<p><label class='ada-hide' for='check_" + compareCatentryId + "'>Compare</label>" +
							"<input type='checkbox' id='check_" + compareCatentryId + "' name='checkboxid' " +
							"onclick='JavaScript:categoryDisplayJS.Add2CompareAjax(\""+compareCatentryId+"\" , \""+thumbnailImg
							+"\",\""+catEntryDisplayUrl+"\", \""+compareImageDescription+"\")'>" +
							"&nbsp;Compare</p>");
				}
				if (labels != null && labels.indexOf("PREVIOUSLY OWNED") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Previously Owned'>Previously Owned</span></span>");
				}
				else if (labels != null && labels.indexOf("CLEARANCE") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Clearance'>Clearance</span></span>");
				}
				else if (labels != null && labels.indexOf("SUPER VALUE") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Super Value'>Super Value</span></span>");
				}
				else if (labels != null && labels.indexOf("ENGRAVABLE") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Engravable'>Engravable</span></span>");
				}
				else if (labels != null && labels.indexOf("PERSONALIZED") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Personalized'>Personalized</span></span>");
				}
				else if (labels != null && labels.indexOf("RETIRED") > -1) {
					lines.push("<br/><span class='flag-name'><span alt='Retired'>Retired</span></span>");
				}
				lines.push("</li>");				
			}			
		}
		
		// make a text string
		html += lines.join("\n") + "<\/ul\>";

		/* If there is one product or more to display in more products to love section 
		   remove "display:none" property from the more-products-love div*/
		if(n_recs > 0) {
			document.getElementById("more-products-love").removeAttribute("style");
		}	
	}	
	
	function loadHPRecs() {
		lines.push('<div class="grid_39 bottom_space_5">');
		for ( var ii = 0; ii < n_recs; ii++) {
			if(ii <= 4) {
				if (ii==0){
					lines.push('<div class="grid_7 alpha featured-center">');
				}
				else if (ii==4){
					lines.push('<div class="grid_7 prefix_1 omega featured-center">');
				}				
				else{
					lines.push('<div class="grid_7 prefix_1 featured-center">')
				}
				
				var rec_prod_id = b_display_target ? (ii == 0 ? target_id : a_product_ids[ii - 1]) : a_product_ids[ii];
				var imageAlt = "No Image Available";
				var productName = rec_attributes[ii][0];
				var labels = rec_attributes[ii][1];
				var image = rec_attributes[ii][2];
				var seoUrl = rec_attributes[ii][3];
				var ratings = rec_attributes[ii][4];
				var style = rec_attributes[ii][5];
				var isModelThree = false;
				var storeId = 10101;
				
				if (style && style != rec_prod_id) {
					isModelThree = true;
				}
				
				productName = productName.replace(/\|/g, "<br/>");
				imageAlt = productName.replace(/\<br\/\>/g, " ");
				
				if (!image) {
					image = image_prefix + "/NoImageIcon_sm.jpg";
				}
				
				var selected_href = "";
				if (isModelThree) {
					selected_href = "/personalizedProduct|" + storeId + "|" + catalogId + "|"+ langId + "||||||||||" + rec_prod_id.replace(style, "") + "|" + style;
				}
				else {
					selected_href = "/" + "product1|" + storeId + "|" + catalogId + "|" + langId + "|" + rec_prod_id + "|" + topCatId + "|" + bcCatIds + "||||" + zone + "|" + zone;  // href for link
					image = image_prefix + image;
				}
				
				var thumbnailImg = image_prefix + "NoImageIcon_sm45.jpg";
				if (image) {
					thumbnailImg = image_prefix + image.substring(0, image.indexOf("_")) + "_MV_TB" + image.substring(image.length-4, image.length);
				}
				
				lines.push('<a href=' + selected_href + ' aria-hidden="true" role="presentation" tabindex="-1"><img style="border:1px solid #999;" alt="' + 
						imageAlt + '" role="presentation" src="' + image + '" /></a>');
				lines.push('<p class="featuredprod"><a href=' + selected_href + '>' + productName + '</a></p>');
				lines.push("</div>");
			}			
		}
		
		// make a text string
		html += lines.join("\n") + "<\/div\>";
		
		if(n_recs > 0) {
			document.getElementById("hp_io_zone").removeAttribute("style");
			document.getElementById("coremetrics_title").removeAttribute("style");
		}	
	}	
}

function PDPZ1_zp(a, b, c, d, e, f, g, h, i) {
	io_zpfs(a, b, c, d, e, f, g, h, i, 'more-products-love', false);
}

function HPZ1_zp(a, b, c, d, e, f, g, h, i) {
	io_zpfs(a, b, c, d, e, f, g, h, i, 'hp_io_zone', false);
}

function getAjaxObject() {
	var activexmodes = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ] // activeX
																	// versions
																	// to check
																	// for in IE
	if (window.ActiveXObject) { // Test for support for ActiveXObject in IE
								// first (as XMLHttpRequest in IE7 is broken)
		for ( var i = 0; i < activexmodes.length; i++) {
			try {
				return new ActiveXObject(activexmodes[i])
			} catch (e) {
				// suppress error
			}
		}
	} else if (window.XMLHttpRequest) // if Mozilla, Safari etc
		return new XMLHttpRequest()
	else
		return false
}
