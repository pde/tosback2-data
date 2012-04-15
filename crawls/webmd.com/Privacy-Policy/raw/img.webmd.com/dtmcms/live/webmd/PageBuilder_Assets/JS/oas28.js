webmd = window.webmd || {};
webmd.p = window.webmd.p || {};

/**
 * replaces template values with values from OAS response and replaces programmed module with created module
 * function name given by the OAS response
 *
 * @param {Object} data  (a json-like object)
 */
webmd.p.fe_content_update = function(data){
	var img_obj,
		template_name,
		link_position,
		replace_values,
		replacement_object;

	// cancel the timeout
	if(webmd.oas.timeout){
		clearTimeout(webmd.oas.timeout);
	}

	// traverses elements array created from setTemplates()
	$.each(webmd.oas.elements_mapping, function(x_element_value, template_name){

		// this must be declared here, otherwise when the images load (after this loop) the content will be equal to only the last element
		var substitute_text,
			x_value_object = data[x_element_value],
			type_prefix = '',
			onclick_append = 'othr',
			i_tag = '';

		// the string 'null' is what OAS passes for a null value
		// if the string 'null' is the value, no action is taken
		if(typeof x_value_object !== 'undefined' && x_value_object !== 'null'){

			// link_position is used to replace {link_position} in the template
			// to determine this, a search is done on the original mapping array set by the module
			// the position of the x value in the map is found (starting from 0) and incremented by 1 for the final position
			link_position = $.inArray(x_element_value, webmd.oas.mapping[template_name]) + 1;

			// SPECIFIC RULES
			if(typeof x_value_object.type !== 'undefined' && x_value_object.type !== 'null' && x_value_object.type !== ''){
	
				// if 'type' exists, three variables are changed that may or may not be used, depending on the module
				type_prefix = 'type_';
				i_tag = ' <i> </i>';
				onclick_append = x_value_object.type;
			}

			// the initial replacement values object is constructed from the object that corresponds to the x value and the link position
			replace_values = $.extend({ 'link_position': link_position, 'type_prefix': type_prefix, 'onclick_append': onclick_append, 'i_tag': i_tag }, x_value_object);

			if(typeof replace_values.alt_text == 'undefined' || replace_values.alt_text == ''){
				replace_values.alt_text = replace_values.alt;
			}

			// make substitutions from 'replace_values' object then
			// remove any stray {} brackets left over in the template
			substitute_text = webmd.substitute(webmd.oas.templates[template_name], replace_values).replace(/\{[^\}]*\}|^\s*|\s*$/g, '');

			// if there is an image iut needs to be preloaded
			if(typeof x_value_object.img !== 'undefined' && x_value_object.img !== ''){

				var x_element_reference = webmd.oas.imageTimeout(x_element_value);
				
				webmd.load({ image: x_value_object.img, load: function(){
					webmd.oas.showElement(x_element_value, substitute_text, x_element_reference);
				}});

			// when there is no image, the x element is displayed immediately
			} else {
				webmd.oas.showElement(x_element_value, substitute_text);
			}

		// when the OAS response is null, just show the programmed content
		} else {
			webmd.oas.showElement(x_element_value);
		}
	});
};

/**
 * OAS object
 */
webmd.oas = {
	
	// holds the template markup from the <script type="text/html"> elements
	templates: {},

	// set by the module XSL to match a template id to x values
	// example:  webmd.oas.mapping['oas_urr_1'] = ['x20','x21','x22','x23'];
	mapping: {},

	// set by the module XSL to set rules for conditional values
	// example:  webmd.oas.ruleset['oas_urr_1'] = { 'tracking_suffix': { 'oas_key': 'text', 'replacement': { 'ARTICLE': 'othr', 'VIDEO': 'vid', 'QUIZ': 'rmq', 'SLIDESHOW': 'ss' } } };
	ruleset: {},

	// holds an array of all x values from 'mapping'
	elements_array: [],

	// maps the x values to the template id
	elements_mapping: {},

	// the query string for the OAS call
	query: '',

	// the time in milliseconds before element is displayed, regardless of whether it is loaded or not
	default_timeout: 2000,

	/**
	 * if there is no sponsor, an 'oas' class is added to html element and the init() function is bound to 'beacon_load'
	 *
	 * @returns {Boolean} true  (this is not used)
	 */
	executeImmediately: (function(){
		var sponsor = window.s_sponsor_program || window.s_sponsor_brand || '';

		// to display content, the page should be non-sponsored and not a secure page
		if(!sponsor && window.location.protocol !== 'https:'){

			// the 'oas' class is needed to hide the x elements
			document.documentElement.className += ' oas';

			// binds the init() function to the 'beacon_load' event
			$(document).bind('beacon_load', function(){
				webmd.oas.init();
			});			
		}

		return true;
	}()),

	/**
	 * sets the section to be used in the OAS query
	 *
	 * @returns {String}
	 */
	section: (function(){
		// precedence of global variables to determine center
		var s_channel = window.s_channel_health || window.s_channel_super_portal || window.s_package_name || window.s_business_reference || '';

		// edge cases not likely to change
		if(s_channel === "Medical Reference"){ s_channel = "Nav - A-Z page"; }

		// make lowercase and remove everything but letters
		return s_channel.toLowerCase().replace(/[^a-z]/g, '');
	}()),

	/**
	 * adds templates from markup to an array,
	 * creates and array of all the x values found,
	 * creates a mapping object to match each x value to a template
	 */
	setTemplates: function(){
		var self = this;

		// get the id of each template <script type="text/html"> and add to the templates object
		$(".oas_template").each(function(){
			var template_id = $(this).attr('id');

			// add the markup from the <script type="text/html"> element and add it to the 'templates' array
			self.templates[template_id] = $("#" + template_id).html();

			// the template must have mapping, otherwise it will crash the javascript
			// if not, don't even add
			// it will be blank, but will not crash
			if(typeof webmd.oas.mapping[template_id] !== 'undefined'){

				// the value is the x value in the 'mapping' arrays
				$.each(webmd.oas.mapping[template_id], function(key, value){

					// combines all x values
					self.elements_array.push(value);

					// pairs each x value to it's template
					self.elements_mapping[value] = template_id;
				});
			}
		});
	},

	// set a timeout to show images due to image onloads events not always working
	imageTimeout: function(x_element_value){
		return setTimeout(function(){
			$('#' + x_element_value).css('visibility', 'visible');
		}, this.default_timeout);
	},

	/**
	 * displays one x value elements
	 */
	showElement: function(x_element_value, substitute_text, x_element_reference){

		// clear the timeout before displaying
		if(typeof x_element_reference !== 'undefined'){
			clearTimeout(x_element_reference);
		}

		// if the argument 'substitute_text' is passed (should be a string), the content of the x element is changed
		if(typeof substitute_text === 'string'){
			$('#' + x_element_value).html(substitute_text);
		}

		$('#' + x_element_value).css('visibility', 'visible');
	},

	/**
	 * once started, the OAS response must be received by the number of milliseconds set here
	 * example: 2000 = 2 seconds
	 */
	startTimeout: function(){
		var self = this;

		// in case it doesn't load, it will appear anyway after a time
		self.timeout = setTimeout(function(){
			// rewrite the function to do nothing
			// if the page loads after this, nothing will change
			webmd.p.fe_content_update = function(){
				return false;
			};

			document.documentElement.className = document.documentElement.className.replace(/oas/i, '');
		}, self.default_timeout);
	},

	/**
	 * constructs the OAS call and loads it
	 */
	loadOAS: function(){
		var self = this;

		// construct the query for OAS
		// 'section' is needed to retrieve the proper content
		// 'elements_array' is a list of x elements and is converted to a comma-separated list
		self.query = "http://ls.webmd.com/2/webmd/" + self.section + "/" + ((Math.floor(Math.random() * 1000000000)) + 1000000000) + "@Position1," + self.elements_array.join(',') + ",Position2?_RM_NO_COMMENT_";

		// add "env=1" if the page is being viewed in preview or staging
		if((window.location.href.indexOf("preview.webmd") !== -1) || (window.location.href.indexOf("staging.webmd") !== -1)){
			self.query += "&env=1";
		}

		// load the OAS file, no callback here because some responses have been without the function and only if function runs should the timeout be cancelled
		webmd.load({ js: self.query });
	},

	/**
	 * starts the process to display OAS content
	 */
	init: function(){

		// if the section is not an empty string
		if(this.section){

			// groups templates and elements that use them
			this.setTemplates();

			// start the timer to display the programmed content if OAS times out
			this.startTimeout();

			// now load the OAS url
			this.loadOAS();
		} else {

			// remove oas class which would show the elements (e.g.  .oas #x01 hidden)
			document.documentElement.className = document.documentElement.className.replace(/oas/i,'');
		}
	}
};