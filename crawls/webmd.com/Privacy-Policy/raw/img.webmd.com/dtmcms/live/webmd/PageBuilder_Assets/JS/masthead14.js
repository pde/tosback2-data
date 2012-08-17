/* temporary location */
// HTML5 shim for IE8 and earlier
document.createElement('header');
document.createElement('nav');

// masthead js
webmd = window.webmd || {};
webmd.p = webmd.p || {};

webmd.p.masthead = {
	//standard function to return object with environment vars
	domain_vals: (function() {
		var current_domain = (document.location.href.indexOf('perf.w') !== -1) ? 'perf.' : (document.location.href.indexOf('qa00.w') !== -1) ? 'qa00.' : '';

		return {
			current_domain: current_domain,
			member_url: 'https://member.' + current_domain + 'webmd.com',
			signcookie: webmd.cookie.exists("WBMD_AUTH")
		};
	}()),

	// defaults
	default_elements : {
		nav_container : '#nav',
		nav_tab_id_prefix : '#nav_',
		nav_tab_class : '.nav',
		nav_dropdown : '.nav_dropdown',
		nav_link : '.nav_link',
		login_container : '#login',
		login_tab_id : '#login_tab',
		logged_in_container : '#logged_in',
		logged_in_tab_id : '#logged_in_tab',
		overlay : '#global_overlay'
	},

	// set to true is user is using a tablet or mobile device
	touch_enabled : (function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	})(),

	nav_content_loaded : false,

	// inside the nav
	inside_nav : false,

	nav_dropdown_mousedown : false,

	// tab 1-5 will be highlighted in certain centers
	tab_highlighting : '',

	// tab that's hovered
	hover_tab : '',

	// is an integer when a tab needs to stay open
	dropdown_open : '',

	// used to set overlay after the blurring using the tab key
	overlay_on : null,

	// true while typing in login form
	reg_typing : false,

	login_dropdown_mousedown : false,

	//
	login_dropdown_open : '',

	//
	logged_in_dropdown_open : '',

	// when focus is in the login form, this will be true
	login_typing : false,

	nickname : '',
	/**
	 * link data can be stored:
	 * 1. if sessionStorage is supported
	 * 2. if the JSON object exists (to stringify and parse)
	*/
	session_storage_supported : (typeof Storage !== "undefined" && typeof JSON !== "undefined" && JSON) ? true : false,

	// ajax variables
	chronicle_id : '091e9c5e80acf2b1',
	site : '',
	image_prefix : '',

	init : function(){
		// nickname is set here because sometimes the nickname global variable appears later in the code
		this.nickname = (typeof window.nickname !== 'undefined' && window.nickname !== '') ? window.nickname : '';

		// currently not used
		// this will determine which tab is highlighted once we have the ability to do this
		this.setupTabHighlighting();

		// sets up all navigation functionality
		this.setupNav();

		// sets up all login functionality
		this.setupAuthorization();

		// sets up all search functionality
		this.setupSearch();

		// sets up miscellaneous necessary page event handlers
		this.setupPageEventHandlers();

		// CURRENTLY LOADS ON EVERY PAGE, HOW CAN WE REDUCE THIS?
		webmd.load({
			css: image_server_url + "/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css"
		});
	},

	// change the aria attributes of the dropdown
	// for the second parameter, if true or blank, dropdown is expanded
	changeAriaAttributes : function(elem, on){
		on = (typeof on === 'undefined' || on === true) ? true : false;

		var aria_expanded = on,
			aria_hidden = !on;

		if($(elem).length > 0){
			$(elem).attr('aria-expanded', aria_expanded).attr('aria-hidden', aria_hidden);
		}
	},

	// function displays content from ajax or session storage
	displayProgrammedContent : function(links, referenced_objects){
		var self = this,
			protocol = "http://",
			chronic_id_to_links = $.extend({}, {image_prefix: self.image_prefix}),
			mapping = { 'pb11': 't2', 'pb20': 't2', 'pb29': 't3', 'pb30': 't3' },

			// these are templates of the current markup of the sections pulled in from the PageBuilder masthead module
			nav_templates = {
				t1 : '<a href="{{link_url.@chronic_id}}" class="{type}">{link_text}{i_tag}</a>',
				t2 : '                        <img src="{image_prefix}{link_source_icon.@path}" alt="{link_source_icon.@alt}" />\
                        <a href="{{link_url.@chronic_id}}" class="bold">{link_text}</a>\
                        <p>{action_text}</p>\
                        <a href="{{link_url.@chronic_id}}" class="link_overlay" tabindex="-1"></a>',
				t3 : '                        <a href="{{link_url.@chronic_id}}" class="nav_image"><img src="{image_prefix}{link_source_icon.@path}" alt="{link_source_icon.@alt}" /></a>\
                        <a href="{{link_url.@chronic_id}}" class="shorter">{link_text}</a>\
                        <p>{action_text}</p>'
			};


		/**
		 * go through referenced_objects: set url and rename for efficiency
		 * this prevents the need to iterate through all the "referenced_objects" objects each time to search for the chronic_id
		 *
		 * the chronic id becomes the key
		 * the href becomes the value
		 */
		$.each(referenced_objects, function(key, value){
			
			if(value["@pointer"] === "0"){
				if(typeof value.target[0] !== "undefined"){
					for(var c = 0; c < value.target.length; c++){
						if(value.target[c]["@siteid"] === '3'){
							chronic_id_to_links[value["@chronic_id"]] = protocol + value.target[c]["@prefix"] + "." + self.site + value.target[c]["@friendlyurl"];
						}
					}
				} else {
					chronic_id_to_links[value["@chronic_id"]] = protocol + value.target["@prefix"] + "." + self.site + value.target["@friendlyurl"];
				}
			} else {
				chronic_id_to_links[value["@chronic_id"]] = value.target["@friendlyurl"];
			}
		});

		/**
		 * go through the "link" object
		 *
		 * the key is the array number, which should match the "#pb" ids that are hardcoded in the base template html
		 * the value is an object of the information needed to be inserted into the element
		 *
		 * -------------- value OBJECT STRUCTURE for t1 --------------
			link_link_view			"Page Refresh(Default)"
			link_source_icon	
				@alt 				""
				@chronic_id 		""
				@directive			"imageurl"
				@object_type		""
				@path 				""
				@wbmd_lookup_type	""
				@wbmd_storage_value ""
			link_text				"Fish Oil Doesn't Cut Diabetes Patients' Heart Risk"
			link_url
				@chronic_id 		"091e9c5e80ae38c0"
				@directive			"friendlyurl"
				@object_type		"wbmd_cons_article"
				@wbmd_lookup_type	""
				@wbmd_storage_value ""

		 * -------------- value OBJECT STRUCTURE for t2 --------------
		 	action_text				"Soccer star Alex Morgan and other Olympians share their secrets."
			link_link_view			"Page Refresh(Default)"
			link_source_icon	
				@alt 				"Alex Morgan"
				@chronic_id 		"091e9c5e80afa91a"
				@directive			"imageurl"
				@object_type		"wbmd_cons_img"
				@path 				"/webmd/consumer_assets/site_images/article_thumbnails/video/alex_morgan_video/210x130_alex_morgan_video.jpg"
				@wbmd_lookup_type	""
				@wbmd_storage_value ""
			link_text				"Team USA"
			link_url
				@chronic_id 		"091e9c5e80afaa7e"
				@directive			"friendlyurl"
				@object_type		"wbmd_cons_ptr"
				@wbmd_lookup_type	""
				@wbmd_storage_value ""				

		 */
		$.each(links, function(key, value){
			// store the element which matches this array item
			var elem = "pb" + key,
				$elem = $("#" + elem),
				elem_timeout;

			// check is there is an id that matches the index
			if($elem.length){

				var onclick_attr = $("#pb" + key + ' a').attr('onclick');

				// select the appropriate template - default to 't1' is the id is not found
				// replace some of the values using the 'value' variable
				var html = webmd.substitute(nav_templates[ (mapping[elem] || 't1') ], value);
				

				// get the href value
				var href_array = html.match(/href="\{([^\}]+)\}"/i);

				// make sure there is an href value
				if(href_array && href_array[1]){

					// get the link
					var href_value = chronic_id_to_links[href_array[1]];

					// look for strings in the link and add icons if necessary
					if(/\/ss\/|slideshow/i.test(href_value)){
						html = webmd.substitute(html, {type: 'type_ss', i_tag: ' <i> </i>'});
					} else if(/vid/i.test(href_value)){
						html = webmd.substitute(html, {type: 'type_vid', i_tag: ' <i> </i>'});
					} else if(/blogs\.|exchanges\./i.test(href_value)){
						html = webmd.substitute(html, {type: 'type_com', i_tag: ' <i> </i>'});
					} else {
						html = webmd.substitute(html, {type: '', i_tag: ''});
					}
				}

				// replace the chronic id in curly brackets with the link
				html = webmd.substitute(html, chronic_id_to_links);

				// remove any left over brackets
				html = html.replace(/\{+[^\}]*\}+/g, '');

				/*
				// templates t2 and t3 have images and should appear only after the image has loaded
				if(mapping[elem]){

					// start timeout

					// load the image first
					// the callback shows the new html
					webmd.load({ image: (self.image_prefix + value.link_source_icon["@path"]), load: function(){

						// replace html, show the link, then add the onclick attribute
						$elem.html(html).removeClass('hide_link').click(onclick_attr);
					}});
				} else {}
				*/	

				// replace html, show the link, then add the onclick attribute
				$elem.html(html).removeClass('hide_link hide_pb_link').click(onclick_attr);
			}
		});
	},

	getProgrammedContent : function(){
		var self = this;

		/**
		 * fetch the data from local storage if:
		 * 1. the browser supports local storage
		 * 2. all the values needed are present
		 *
		 * then parse the strigified object and send to displayProgrammedContent
		 */

		if(self.session_storage_supported && sessionStorage.links_storage && sessionStorage.referenced_objects_storage && sessionStorage.site && sessionStorage.image_prefix){
			self.site = sessionStorage.site;
			self.image_prefix = sessionStorage.image_prefix;

			webmd.debug('masthead populated by sessionStorage');
			self.displayProgrammedContent(JSON.parse(sessionStorage.links_storage), JSON.parse(sessionStorage.referenced_objects_storage));
		} else {
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/api/repository/repositoryservice.svc/GetModuleXML',
				data: {
					chronicleID: self.chronicle_id
				},
				success: function(data){
					
					if(data && typeof data.webmd_rendition !== "undefined"){
						self.site = data.webmd_rendition.resources.sites.site[0]["@domain"];
						self.image_prefix = data.webmd_rendition.resources.ImageServerUrls.ImageServerUrl[0]["@url"];

						if(self.session_storage_supported){

							// objects from the module needs to be stringified to be stored
							sessionStorage.links_storage = JSON.stringify(data.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link);
							sessionStorage.referenced_objects_storage = JSON.stringify(data.webmd_rendition.referenced_objects["object"]);

							// these two values are already strings
							sessionStorage.site = data.webmd_rendition.resources.sites.site[0]["@domain"];
							sessionStorage.image_prefix = data.webmd_rendition.resources.ImageServerUrls.ImageServerUrl[0]["@url"];
						}

						webmd.debug('masthead populated by ajax call');
						self.displayProgrammedContent(data.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link, data.webmd_rendition.referenced_objects["object"]);
					} else {
						$(".hide_link").removeClass('hide_link');
					}
				},
				error: function(){
					webmd.debug('error loading chronic_id ' + self.chronicle_id);
					$(".hide_link").removeClass('hide_link');
				}
			});
		}
	},

	// sets up the event handlers for the masthead elements
	setupNav : function(){
		var self = this;

		// in IE mouseover occurs if mouse is over a tab on page load
		// this will wait for a mouse before the hover events are set
		$(document).one('mousemove', function(){ 

			// hover intent for entire nav container
			$(self.default_elements.nav_container).hoverIntent(function(){

				// load programmed content and two images when hovered
				if(!self.nav_content_loaded){
					self.getProgrammedContent();

					// preload masthead images
					$("<img/>").attr("src", image_server_url + "/webmd/consumer_assets/site_images/layout/2012Chrome/pill_identifier_bg.jpg");
					$("<img/>").attr("src", image_server_url + "/webmd/consumer_assets/site_images/layout/2012Chrome/symptom_checker_bg.jpg");

					// now that content is loaded, this will no longer run
					self.nav_content_loaded = true;
				}

				// if inside the nav wrapper, the hover function below will work
				self.inside_nav = true;

				if(self.dropdown_open === ''){
					$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
					$(self.default_elements.nav_tab_id_prefix + self.hover_tab).addClass('tab_on dropdown_on');
					$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
				}
			}, function(){

				self.inside_nav = false;
				if(self.dropdown_open === ''){

					$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
					$(self.default_elements.overlay).removeClass('authorization_on tab_on');
					if(self.tab_highlighting){

						$(self.default_elements.nav_tab_id_prefix + self.tab_highlighting).addClass('tab_on');
					}
				}
			});

			// individual tabs open immediately when 'inside_tab' is true
			$(self.default_elements.nav_tab_class).hover(function(){

				// gets the tab number, from 1 to 5
				self.hover_tab = $(this).attr("id").substring(4,5);

				if(self.inside_nav && self.dropdown_open === ''){

					$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
					$(this).addClass('tab_on dropdown_on');
					$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
				}
			}, function(){

				self.hover_tab = '';
				if(self.inside_nav && self.dropdown_open === ''){

					self.closeNavTabs();

					if(self.tab_highlighting){

						$(self.default_elements.nav_tab_id_prefix + self.tab_highlighting).addClass('tab_on');
						$(self.default_elements.overlay).removeClass('authorization_on tab_on');
					}
				}
			});

		});

		// makes the nav tabs clickable
		if(self.touch_enabled){

			// do not link to allow clicking of tabs
			$(self.default_elements.nav_link).bind("click", function(e){
				// load programmed content when clicked on a tablet
				if(!self.nav_content_loaded){
					self.getProgrammedContent();
					self.nav_content_loaded = true;
				}

				if(self.dropdown_open){
					var new_id = $(this).attr("id").substring(9,10);

					if(new_id !== self.dropdown_open){
						self.dropdown_open = new_id;

						$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
						$(self.default_elements.nav_tab_id_prefix + self.dropdown_open).addClass('tab_on dropdown_on');
						$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
					} else {
						self.closeNavTabs();
					}
				} else {
					self.dropdown_open = $(this).attr("id").substring(9,10);
	
					$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
					$(self.default_elements.nav_tab_id_prefix + self.dropdown_open).addClass('tab_on dropdown_on');
					$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
				}

				return false;
			});

			// add the buttons to the dropdown
			$(".nav_link").append('<span class="arrow_nav"></span>');
		} else {

			$(self.default_elements.nav_link).bind("focus", function(e){
				// load programmed content when focused
				if(!self.nav_content_loaded){
					self.getProgrammedContent();
					self.nav_content_loaded = true
				}

				self.overlay_on = self.default_elements.nav_container;

				self.dropdown_open = $(this).attr("id").substring(9,10);
				$(self.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');

				$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
				$(self.default_elements.nav_tab_id_prefix + self.dropdown_open).addClass('tab_on dropdown_on');

				self.changeAriaAttributes('.nav_dropdown' + self.dropdown_open, false);

				self.changeAriaAttributes('#menu_' + self.dropdown_open);

				return false;
			});
		}

		// keeps the click from propagating to "centering_area" and closing the tab
		$(self.default_elements.nav_tab_class).bind('click', function(e){

			e.stopPropagation();
		});

		// keeps the login dropdown from closing when the link blurs
		$(self.default_elements.nav_dropdown).bind('mousedown', function(e){

			self.nav_dropdown_mousedown = true;
		});

	},

	addTabbingBlur : function(id, callback){
		var self = this,
			blur_timeout = null;

		// nav focus cancels the timeout to blur
		function enterTab(){
			self.overlay_on = id;

			if(blur_timeout){
				clearTimeout(blur_timeout);
			}
		}

		// wrapper element is blurred with each change of inner element
		// if wrapper element is focused within the time set in the timeout, the close function is cancelled and the dropdown stays open
		function leaveTab(){

			// criteria to close tab
			if(
				// for login if a mousedown event did not occur in the dropdown
				(id === self.default_elements.login_container && self.login_dropdown_mousedown === false) ||
				(id === self.default_elements.nav_container && self.nav_dropdown_mousedown === false)
			){

				self.overlay_on = null;

				blur_timeout = setTimeout(function(){

					// change the scope of this callback from 'window' to the masthead object
					callback.apply(self);

					// after dropdown closes, determine if overlay should be open
					if(self.overlay_on){
						if(self.overlay_on === self.default_elements.nav_container){
							$(self.default_elements.overlay).removeClass('authorization_on').addClass('tab_on');
						} else if(self.overlay_on === self.default_elements.login_container){
							$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
						}
					}
				}, 10);
			}
		}

		if($(id).length){
			$(id)[0].onfocusout = leaveTab;
			$(id)[0].onfocusin = enterTab;

			if($(id)[0].addEventListener){
				$(id)[0].addEventListener('blur', leaveTab, true);
				$(id)[0].addEventListener('focus', enterTab, true);
			}
		}
	},

	closeNavTabs : function(){
		this.dropdown_open = '';
		$(this.default_elements.overlay).removeClass('tab_on authorization_on');

		$(this.default_elements.nav_tab_class).removeClass('tab_on dropdown_on');
	},
	
	closeLogin : function(){
		this.login_dropdown_open = false;
		$(this.default_elements.overlay).removeClass('tab_on authorization_on');

		$(this.default_elements.login_container).removeClass('on');
	},

	closeLoggedIn : function(){
		this.logged_in_dropdown_open = false;
		$(this.default_elements.overlay).removeClass('tab_on authorization_on');

		$(this.default_elements.logged_in_container).removeClass('on');
	},

	setupAuthorization : function(){
		var self = this;

		// login mouseover
		$(self.default_elements.login_container).hoverIntent(function(){

			// generate an impression
			self.wmdPageLink('reg-login-imp');

			// show dropdown
			$(this).addClass('on');
			// change overlay position 
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');

		// login mouseout
		}, function(){

			// if the user isn't typing and the dropdown is not focused, then close
			if(!self.reg_typing && !self.login_dropdown_open){
				self.closeLogin();
			}
		});

		// the click does not follow any link, however clicking focuses
		$(self.default_elements.login_tab_id).bind('click', function(){
			return false;
		});


		// login focus and click
		$(self.default_elements.login_tab_id).bind('focus', function(){

			// generate an impression
			self.wmdPageLink('reg-login-imp');

			// saves login container id
			self.overlay_on = self.default_elements.login_container;

			// close tabs if open
			self.closeNavTabs();

			self.login_dropdown_open = true;

			// show login dropdown
			$(self.default_elements.login_container).addClass('on');
			// change overlay position
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
		});

		// setup login container to work with tabbing
		self.addTabbingBlur(self.default_elements.login_container, self.closeLogin);

		// setup for javascript users
		// non-javascript users get a slightly different experience
		$("#reglogin_password").hide().val("");
		$("#reglogin_password_text").show();
		$("#reglogin_password_text").val("Please enter your password");
		$("#reglogin_username").val("Please enter email address");

		// login form

		// all input and links that are focused in the form keep the dropdown open
		$(self.default_elements.login_container + " form input, " + self.default_elements.login_container + " form a").bind("focus", function(){
			self.reg_typing = true;
		});

		// clear default text if focus is on an input
		$("#reglogin_username").bind("focus", function(){
			if($(this).val() == "Please enter email address"){
				$(this).val("");
			}
		});
		
		// user stopped typing email
		$("#reglogin_username").bind("blur", function(){

			// user is no longer typing
			self.reg_typing = false;

			// shows default text if empty
			if($(this).val() == ""){
				$(this).val("Please enter email address");
			}
		});

		// keeps the click from propagating to "centering_area" and closing the tab
		$("#login").bind('click', function(e){
			e.stopPropagation();
		});

		// keeps the login dropdown from closing when the link blurs
		$("#login_dropdown").bind('mousedown', function(e){
			self.login_dropdown_mousedown = true;
		});

		// user clicks "fake" password input and it takes them to the real password input
		$("#reglogin_password_text").bind("focus", function(){

			// hide the "fake" password field
			$(this).hide();

			$("#reglogin_password").val("").show().focus();
		});

		// user stopped typing password
		$("#reglogin_password").bind("blur", function(){

			// user is no longer typing
			self.reg_typing = false;

			// hide the real password field if blank
			if($(this).val() == ""){
				$(this).hide();
				$("#reglogin_password_text").show();
			}
		});

		// login submit
		$("#globalreg").bind('submit', function(){

			// validate the form
			if(self.validateLoginForm()){

				// generate an impression
				self.wmdPageLink('reg-login_core');
			} else {

				// generate an impression
				self.wmdPageLink('reg-login-error_core');

				// stop submission of form
				return false;
			}
		});
		
		// pressing enter submits the form
		$('#globalreg input').bind('keypress', function(e) {
			if(e.keyCode == 13) {
				$('#globalreg').submit();
			}
		});

		// show tooltip
		$("#reg_add_info a").hoverIntent(function() {
			$("#reg_add_info p").show();
		}, function() {
			$("#reg_add_info p").hide();
		});

		// logged in mouseover
		$(self.default_elements.logged_in_container).hoverIntent(function(){

			// generate an impression
			self.wmdPageLink('ov-mymd-imp');

			// show dropdown
			$(this).addClass('on');
			// change overlay position
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');

		// logged in mouseout
		}, function(){

			// close if not focused
			if(!self.logged_in_dropdown_open){
				self.closeLoggedIn();
			}
		});

		// the click does not follow any link, however it focuses
		$(self.default_elements.logged_in_tab_id).bind('click', function(){
			return false;
		});

		// logged in tab click
		$(self.default_elements.logged_in_tab_id).bind('focus', function(){

			// if dropdown not open
			if(!self.logged_in_dropdown_open){

				// generate an impression
				self.wmdPageLink('ov-mymd-imp');

				// show dropdown
				$(self.default_elements.logged_in_container).addClass('on');
				// change overlay position
				$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
				// dropdown is focused
				self.logged_in_dropdown_open = true;

			// if dropdown open
			} else {
				self.closeLoggedIn();
			}
		});

		// add tabbing functionality to dropdown
		self.addTabbingBlur(self.default_elements.logged_in_container, self.closeLoggedIn);

		// needed to keep clicks in the signin div from closing div
		$(self.default_elements.login_container).bind('click', function(e){
			e.stopPropagation();
		});

		// needed to keep clicks in the signed in div from closing div
		$(self.default_elements.logged_in_container).bind('click', function(e){
			e.stopPropagation();
		});		

		// check if cookie exists to show new tab
		if(self.domain_vals.signcookie){

			// hide login and "why WebMD"
			$(self.default_elements.login_container).hide();
			$("#why_webmd").hide();

			// show text specific to user and logged in container
			$("#logged_in_text").css('display', 'block');
			$(self.default_elements.logged_in_container).css('display', 'block');

			// if nickname is set, display name, otherwise a generic message
			if(self.nickname){
				$("#greeting").html('|&nbsp&nbspWelcome <a id="nickname" href="https://member.' + self.domain_vals.current_domain + 'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">' + self.nickname + '</a>');
			} else {
				$("#greeting").html('|&nbsp&nbsp<a id="nickname" href="https://member.' + self.domain_vals.current_domain + 'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">My Profile</a>');
			}
		}
	},

	setupSearch : function(){
		function doSearch(){
			// if user didn't type anything and clicked, the search value is changed to empty
			if($("#searchQuery_fmt").val() == "Search"){
				$("#searchQuery_fmt").val("");
			}

			// search function
			return DoSearch();
		}

		// remove default text when focused
		$("#searchQuery_fmt").bind("focus", function(){
			if($(this).val() == "Search"){
				$(this).val("");
			}
		});

		// add default text when blurred
		$("#searchQuery_fmt").bind("blur", function(){
			if($(this).val() == ""){
				$(this).val("Search");
			}
		});

		$("#searchQuery_fmt").bind("keypress", function(e){
			if(e.keyCode == 13) {
				e.preventDefault();
				doSearch();
			}
		});

		// do search on click
		$(".searchButton_fmt").bind("click", function(e){
			e.preventDefault();
			doSearch();
		});

		// search input value changed to "Search" if javascript is enabled
		$("#searchQuery_fmt").val("Search");
	},

	// event handler checked for clicks to wrapper for all content
	setupPageEventHandlers : function(){
		var self = this;
		
		// prevents clicking through overlay to underlying link on tablets
		$(self.default_elements.overlay).bind('touchstart', function(e){
		e.preventDefault();
		});

		// clicking the overlay
		// touchend for tablets and click for desktop
		$(self.default_elements.overlay).bind('touchend click', function(e){
			e.preventDefault();

			// close dropdowns
			self.closeNavTabs();
			self.closeLogin();
			self.closeLoggedIn();

			self.reg_typing = false;
			self.login_dropdown_open = false;
			self.logged_in_dropdown_open = false;

			if(self.tab_highlighting){
				$(self.default_elements.nav_tab_id_prefix + tab_highlighting).addClass('tab_on');
			}
		});

		// clicks on the whole page not stopped by "stopPropagation"
		$("#centering_area").bind('click', function(e){
			self.login_dropdown_mousedown = false;
			self.nav_dropdown_mousedown = false;

			// close dropdowns
			self.closeNavTabs();
			self.closeLogin();
			self.closeLoggedIn();
		});		
	},

	// checks for center to highlight one tab
	setupTabHighlighting : function(){
		// s_publication_source = "WebMD Health & Wellness Center"

		// if set to an integer, this tab will remain highlighted
		this.tab_highlighting = '';

		if(this.tab_highlighting){
			$(this.default_elements.nav_tab_id_prefix + this.tab_highlighting).addClass('tab_on');
		}		
	},

	// validates login form submission
	validateLoginForm : function(){
		var email_message = '',
			password_message = '',
			email_okay = false,
			password_okay = false;

		// check email
		// if email is blank or the default text
		if(($("#reglogin_username").val() == '') || ($("#reglogin_username").val() == 'Please enter email address')){

			// show error message that it is blank
			$("#email_message").addClass('on');
			email_message = 'Please enter your email address';

		// if the regex pattern does not validate
		} else if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test($("#reglogin_username").val())){

			// show error message that the format is wrong
			$("#email_message").addClass('on');
			email_message = 'Please enter a valid email address';

		// else email is okay and error hidden
		} else {
			email_okay = true;
			$("#email_message").removeClass('on');
		}

		// check if password is empty
		if($("#reglogin_password").val() == ''){

			// show error message
			$("#password_message").addClass('on');
			password_message = 'Please enter your password';

		// password not empty
		} else {

			// password is okay and error is removed
			password_okay = true;
			$("#password_message").removeClass('on');
		}

		// if email and password are okay allow submission
		if(email_okay && password_okay){
			return true;

		// otherwise display error and stop submission
		} else {
			$("#email_message").html(email_message);
			$("#password_message").html(password_message);
			return false;
		}
	},

	// shim for wmdPageLink function, which may be called before page load at times
	wmdPageLink : function(tracking){
		if(window.wmdPageLink){
			window.wmdPageLink(tracking);
		}
	}
}



/**
 * ==============================================================================================================
 * ==============================================================================================================
 * 8/10/2012
 * 
 * TEMPORARY FIX UNTIL THIS CAN BE MOVED INTO A BETTER LOCATION
 * 
 * THIS IS NECESSARY FOR THE BOOKMARK FUNCTIONALITY TO WORK BUT THIS SHOULD NOT BE IN masthead.js
 *
 * ==============================================================================================================
 * ==============================================================================================================
 */

webmd.p.reg_data={
    services:{
        defaults:{
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout: 10000,
            type: 'GET',
            cache:'false'
        },

        // on articles when adding a page to the list of bookmarks
            add_bookmark:function(){
            var title = $('.add_bookmark_input').val();
            var url = document.URL;
            var host = ( window.location.host.split(".")[1] == 'webmd' ) ? 'member' : 'member.'+window.location.host.split(".")[1];
            url = url.replace('//','\/\/');
            var dataObj = {"title" : title, "url" : url};
            var overrides = {

            	// when adding a bookmark on an article is successful
                success: function(data){
                    webmd.p.header.addBMSsuccess();
                    webmd.p.header.kill_cache();
                },

                // when adding a bookmark on an article and there is an error
                // eg. the page was already saved
                error:function(jqXHR, textStatus, errorThrown){
                    var errorTxt = "There was an error in your request. Please try again later.";
                    var response = jQuery.parseJSON(jqXHR.responseText);
                    if(response){
                        if(response.code == -1000){
                            errorTxt = "This page has already been saved";
                        }else if(response.code == -1001){
                            errorTxt = "There is already a saved item with that name.  Please type a new name.";
                        }else if(response.code == -1002){
                            errorTxt = "You have exceeded the max amount of bookmarks.  Please delete some of the above in order to add more.";
                        }else if(response.code == -2){
                            var signin_url = '<a class="signin_overlay_utn" href="https://'+host+'.webmd.com/default.aspx?returl='+encodeURIComponent(webmd.url.addParam('bookmark', 'true', document.location.href))+'" onclick="return sl(this,\'\',\'reg-ovlylogin\');">sign in</a>';
                            errorTxt = 'Your session has ended. To protect your privacy, please ' + signin_url + ' again.';
                        }
                    }
                    webmd.p.header.showOverlayError(errorTxt);
                },
                type:'POST', data:webmd.json.stringify(dataObj),
                url:window.location.protocol+'//'+window.location.hostname+'/api/reg/Bookmarks.svc/json/add'
            };
            return $.extend({}, this.defaults, overrides);
        }
    },

    // returns whether local storage is supported
    supports_storage:function(){
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    bm_data:[],
    app_data:{}
};

webmd.p.header = {
    //standard function to return object with environment vars
    domain_vals: function(){
        prvwDmn = ((document.location.href.indexOf('preview.w') != -1) || (document.location.href.indexOf('member.perf') != -1)) ? 'preview.' : '';
        currDmn = (document.location.href.indexOf('perf.w') != -1) ? 'perf.' : (document.location.href.indexOf('qa00.w') != -1) ? 'qa00.' : (document.location.href.indexOf('preview.w') != -1) ? 'perf.' : '';
        var member_url = 'https://member.'+currDmn+'webmd.com';
        var signcookie = webmd.cookie.exists("WBMD_AUTH");
        if(image_server_url.indexOf(currDmn) == -1 && image_server_url.indexOf('preview') < 0){
            image_server_url = image_server_url.replace('img.','img.'+currDmn);
        }

        return {
            prvwDmn:prvwDmn,
            currDmn:currDmn,
            member_url:member_url,
            signcookie:signcookie
        };
    },

    addBMSsuccess:function(){
        webmd.overlay.close();
    },

    //whenever an api call is made, clear local storage and reset bookmarks array
    kill_cache:function(){
        var _data = webmd.p.reg_data;
        if (_data.supports_storage()){
            localStorage.clear();
        }
        _data.bm_data.length = 0;
    },

    //user signs in on different account, force storage to be cleared
    cleanSession:function(){
        var _self = this;
        var prevUrl = document.referrer;
        var curHost = '';
        if(prevUrl != ''){
            prevUrl = prevUrl.split('/')[2].split('.')[0];
        }
        curHost = window.location.host.split('.')[0];
        if(curHost != prevUrl)
            _self.kill_cache();
    },

    setup_page_header:function(){
        var _self = this;
        var domain_vals = _self.domain_vals();

        //clean up localstorage from previous session and domain transfer
        $('#ctl00_ContentWell_Login_imgCmdSubmit').bind('click',function(){
            _self.kill_cache();
        });
        _self.cleanSession();

        bookmark_link = $('<a title="Save" href="#" rel="nofollow">Save</a>');
        $(bookmark_link).unbind('click').bind('click',function(e){
            e.preventDefault();
            wmdPageLink('bkmrkpg');
            webmd.p.header.bookmark_page();
        });

        if($('#headerLinks_print').length && hdr){
            var bothHidden = (!$("#headerLinks_email").is(':visible') && !$("#headerLinks_print").is(':visible')) ? true : false;
            if(!bothHidden){
                var targetLink = (!$(".headerLinks_fmt:last").is(':visible')) ? $(".headerLinks_fmt:first") : $(".headerLinks_fmt:last");
                if(targetLink.length < 1) targetLink = $('#breadcrumb_rdr'); //all else fails, just put if after breadcrumb_rdr
                $(bookmark_link).insertAfter(targetLink).wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
            }
        } else if(hdr && location.host.indexOf('member.') == -1){
            if($('#breadcrumb_rdr').length > 0 && $('#exchange-group-tools').length < 1){
                $(bookmark_link).appendTo('#breadcrumb_rdr').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
                $('#breadcrumb_rdr').css('width','100%');

            //exchanges has an extra menu
            }else if($('#exchange-group-tools').length > 0){
                $(bookmark_link).insertAfter('#exchange-group-tools').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
            //all other pages where breadcrumb does not match
            }else{
                $(bookmark_link).prependTo('#breadcrumb_ctr').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
            }
        }

        //check for subscription return flag
        if(webmd.url.getParam('retsub')){
            var submitComplete = '';
            if(document.location.href.indexOf('/diet/')>-1){
                submitComplete = function(){
                    window.location.href=domain_vals.member_url+"/subscriptions.aspx";
                };
                webmd.overlay = $.extend(webmd.overlay, {
                    close: function(){
                        $.fn.colorbox.close();
                        submitComplete();
                    }
                });
            }
        } else if(document.location.host.indexOf('vaccine')>-1 && document.referrer.indexOf('retsub=t')>-1){
            window.location.href = domain_vals.member_url+"/subscriptions.aspx";
        }
    },


    is_overlay_loaded:function(show){
        //loads js when not loaded
        if (!webmd.p.registration) {
            webmd.p.registration = {};
        }
        //for sponsored pages, we have to load the reg_hdr_styles for the overlay
        if($("link[href$='reg_hdr_styles.css']","head").length==0){
            webmd.load({
                css:image_server_url + "/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css",
                load: function() {
                    $('.login_rdr').parent().css('top','0px');
                }
            });
        }
        if(!webmd.p.registration.loginOverlay) {
            webmd.load({
                js:image_server_url + "/webmd/PageBuilder_Assets/JS_static/registration/loginOverlay.js",
                load: function() {
                    show();
                }
            });
        }else{
            show();
            return true;
        }
    },

    showOverlayError:function(message){
        //error to be shown when a service call triggered from overlay returns error
        var _self = this;
        if($('.overlay_error').length<1){
            $('<p class="overlay_error">'+message+'</p>').insertAfter('.add_bookmark_rdr p:first');
        }else{
            $('.overlay_error').html(message);
        }
        $('.add_bookmark_input','#webmdHoverLoadedContent')
            .css({'border':'1px solid #EC1919','background':'#ffffff'});
        _self.bindErrorLogin();
        webmd.overlay.resize('height');
    },

    bindErrorLogin:function(){
        function showPromo(){
            var promoApp = webmd.p.header.getPromoApp();
            var signin_params={
                appid:  promoApp,
                unAuth: true
            };
            webmd.p.registration.loginOverlay.show(signin_params);
        }
        $('.signin_overlay_utn').click(function(e){
            e.preventDefault();
            wmdPageLink('reg-ovlylogin');
            is_overlay_loaded = webmd.p.header.is_overlay_loaded(showPromo);
            if(is_overlay_loaded){
                webmd.p.registration.loginOverlay.show(signin_params);
            }
        });
    },

    /*
        * Checks if user is logged in and shows bookmark overlay.
        * If not logged in, loads js for webmd overlay, then opens bookmark overlay after successful sign in
    */
    bookmark_page:function(){

        //check if overlay js is loaded, then checks if person is logged in
        var _data = webmd.p.reg_data;

        function showPromo(){
            if(webmd.p.registration.isLoggedIn()){
                show_bm_overlay();
            }else{
                var promoApp = webmd.p.header.getPromoApp();

                var signin_params={
                    appid:  promoApp,
                    returl: webmd.url.addParam('bookmark', 'true', document.location.href)
                };
                webmd.p.registration.loginOverlay.show(signin_params);
            }
        }

        // the popup in article pages when you click "Save This Article For Later"
        function show_bm_overlay(){
                var bm_markup  = '<div class="add_bookmark_rdr"><h2>Save to My WebMD Pages</h2>'
                                    +'<p>You can save this page with the current page title or you can create a new page title.</p>'
                                    +'<input type="text" class="add_bookmark_input" />'
                                    +'<a href="#" id="add_bm_butn" class="webmd-btn webmd-btn-pr webmd-btn-s">Add</a>'
                                    +'<a href="#" id="cancel_bm_butn">Cancel</a>'
                                    +'</div>';

                webmd.overlay.open({
                    width: "550px",
                    html: bm_markup,
                    onComplete: function(){
                        $('#cancel_bm_butn').click(function(e){
                            e.preventDefault();
                            webmd.overlay.close();
                        });
                        $('.add_bookmark_input')
                            .val(document.title)
                            .focus(function(){
                                $(this).data('o_val',$(this).val());
                                //$(this).val('');
                            })
                            .blur(function(){
                                if($(this).val()==''){
                                    $(this).val($(this).data('o_val'));
                                }
                            });
                        $('#add_bm_butn').unbind('click').bind('click',function(e){
                            e.preventDefault();
                            xhr = $.ajax(_data.services.add_bookmark());
                            wmdPageLink('bkmrk-ovly-add_sub');
                        });
                    }
                });
        }

        is_overlay_loaded = webmd.p.header.is_overlay_loaded(showPromo);
        if(is_overlay_loaded){
            if(webmd.p.registration.isLoggedIn()){
                wmdPageLink('bkmrk-ovly-imp');
                show_bm_overlay();
            }else{
                //call login overlay function
                promo = showPromo;
            }
        }
    },

    getPromoApp:function(){
        var promoApp = 1;
        promoApp = (window.location.pathname.indexOf('/magazine/')>-1) ? 6 : promoApp;  //Magazine promo
        promoApp = (window.location.host.indexOf('exchanges')>-1) ? 5 : promoApp;       //Exchanges promo
        return promoApp;
    },    

    regHdOpt:{
        speed : {
            i : 300,
            o : 250
        },
        delay : 300,
        leave : null,
        enter : null,
        tt : null,
        typing : false
    }
}

var header = webmd.object(webmd.p.header);
domain_vals = webmd.p.header.domain_vals();

if(window.location.protocol=='https:'){
    image_server_url = image_server_url.replace('http:','https:');
}
try {
    var hdr = true;
    if(hdr && pf_param != "true") {
        $('head').append(webmd.load({css:image_server_url+'/webmd/consumer_assets/site_images/css/masthead_badge.css'}));
    }

} catch (e) {
    var hdr = false;
}

$(function() {
    header.setup_page_header();
});
