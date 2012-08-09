/* temporary location */
// HTML5 shim for IE8 and earlier
document.createElement('header');
document.createElement('nav');

// masthead js
webmd = window.webmd || {};
webmd.p = webmd.p || {};
webmd.p.header = webmd.p.header || {};

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
		this.nickname = (typeof window.nickname !== 'undefined' && window.nickname !== '') ? window.nickname : '';

		this.setupTabHighlighting();

		this.setupNav();

		this.setupAuthorization();

		this.setupSearch();

		this.setupPageEventHandlers();

		// CURRENTLY LOADS ON EVERY PAGE, HOW CAN WE REDUCE THIS?
		webmd.load({
			css: image_server_url + "/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css"
		});

		// this.debug('overlay_on');
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

	debug : function(obj){
		var self = this,
			old_value = '';

		setInterval(function(){
			if(old_value != self[obj]){
			}
			old_value = self[obj];
		}, 2);
	},

	/**
	 * function displays content from ajax or session storage
	 */
	displayProgrammedContent : function(links, referenced_objects){
		var self = this,
			protocol = "http://",
			chronic_id_to_links = $.extend({}, {image_prefix: self.image_prefix}),
			mapping = { 'pb11': 't2', 'pb20': 't2', 'pb29': 't3', 'pb30': 't3' },
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


		// go through referenced_objects: set url and rename for efficiency
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

		// go through "links" from api
		$.each(links, function(key, value){
			var $elem = $("#pb" + key);

			// check is there is an id that matches the index
			if($elem.length){

				var onclick_attr = $("#pb" + key + ' a').attr('onclick');

				// select the appropriate template - default to 't1' is the id is not found
				// replace some of the values using the 'value' variable
				var html = webmd.substitute(nav_templates[ (mapping["pb" + key] || 't1') ], value);
				

				// get the href value
				var href_array = html.match(/href="\{([^\}]+)\}"/i);

				// make sure there is an href value
				if(href_array && href_array[1]){

					// get the link
					var href_value = chronic_id_to_links[href_array[1]];

					// look for strings in the link and add the icons
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

				// templates t2 and t3 have images and should appear only after the image has loaded
				if(mapping["pb" + key]){

					// load the image first
					// the callback shows the new html
					webmd.load({ image: (self.image_prefix + value.link_source_icon["@path"]), load: function(){

						// replace html, show the link, then add the onclick attribute
						$elem.html(html).removeClass('hide_link').click(onclick_attr);
					}});
				} else {
					
					// replace html, show the link, then add the onclick attribute
					$elem.html(html).removeClass('hide_link').click(onclick_attr);
				}
			}
		});
		
		// remove class to display any that didn't get replaced
		// $(".hide_link").removeClass('hide_link');
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
					// CHRONIC ID DOES NOT SEEM TO ALWAYS APPEAR
					// is there another way to check the chronicleID?
					// if(typeof data.webmd_rendition !== "undefined" && typeof data.webmd_rendition.content !== "undefined" && typeof data.webmd_rendition.content.wbmd_asset !== "undefined" && typeof data.webmd_rendition.content.wbmd_asset["@id"] !== "undefined" && data.webmd_rendition.content.wbmd_asset["@id"] === self.chronicle_id){
					
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

		// hover intent for entire nav container
		$(self.default_elements.nav_container).hoverIntent(function(){

			// load programmed content and two images when hovered
			if(!self.nav_content_loaded){
				self.getProgrammedContent();

				// MAYBE NOT NEEDED
				$("<img/>").attr("src", image_server_url + "/webmd/consumer_assets/site_images/layout/2012Chrome/pill_identifier_bg.jpg");
				$("<img/>").attr("src", image_server_url + "/webmd/consumer_assets/site_images/layout/2012Chrome/symptom_checker_bg.jpg");

				self.nav_content_loaded = true
			}

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

		// individual tabs open immediately
		$(self.default_elements.nav_tab_class).hover(function(){

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

		// login
		$(self.default_elements.login_container).hoverIntent(function(){

			self.wmdPageLink('reg-login-imp');

			$(this).addClass('on');
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
		}, function(){

			if(!self.reg_typing && !self.login_dropdown_open){

				self.closeLogin();
			}
		});


		$(self.default_elements.login_tab_id).bind('click', function(){
			return false;
		});


		// login focus and click
		$(self.default_elements.login_tab_id).bind('focus', function(){
			self.overlay_on = self.default_elements.login_container;

			self.closeNavTabs();

			self.login_dropdown_open = true;

			$(self.default_elements.login_container).addClass('on');
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
		});

		self.addTabbingBlur(self.default_elements.login_container, self.closeLogin);

		// setup for javascript users
		$("#reglogin_password").hide().val("");
		$("#reglogin_password_text").show();
		$("#reglogin_password_text").val("Please enter your password");
		$("#reglogin_username").val("Please enter email address");

		// login form
		// login dropdown stays if focus is on an input
		$("#reglogin_username").bind("focus", function(){

			self.wmdPageLink('reg-login-imp');

			self.reg_typing = true;
			if($(this).val() == "Please enter email address"){

				$(this).val("");
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

		// all input and links that are focused in the form keep the dropdown open
		$(self.default_elements.login_container + " form input, " + self.default_elements.login_container + " form a").bind("focus", function(){

			self.reg_typing = true;
		});

		// user clicks fake pw input and it takes them to the real input
		$("#reglogin_password_text").bind("focus", function(){

			$(this).hide();
			$("#reglogin_password").val("").show().focus();
		});

		// user stopped typing email
		$("#reglogin_username").bind("blur", function(){

			self.reg_typing = false;
			if($(this).val() == ""){

				$(this).val("Please enter email address");
			}
		});
		// user stopped typing password
		$("#reglogin_password").bind("blur", function(){

			self.reg_typing = false;
			if($(this).val() == ""){

				$(this).hide();
				$("#reglogin_password_text").show();
			}
		});
		// login submit
		$("#globalreg").bind('submit', function(){
			if(self.validateLoginForm()){
				self.wmdPageLink('reg-login_core');
			} else {
				self.wmdPageLink('reg-login-error_core');
				return false;
			}
		});
		// tooltip
		$("#reg_add_info a").hoverIntent(function() {
			$("#reg_add_info p").show();
		}, function() {
			$("#reg_add_info p").hide();
		});

		$('#globalreg input').bind('keypress', function(e) {
			if(e.keyCode == 13) {
				$('#globalreg').submit();
			}
		});

		// logged in
		$(self.default_elements.logged_in_container).hoverIntent(function(){

			self.wmdPageLink('ov-mymd-imp');

			$(this).addClass('on');
			$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
		}, function(){

			if(!self.logged_in_dropdown_open){

				self.closeLoggedIn();
			}
		});
		// logged in clicks
		$(self.default_elements.logged_in_tab_id).bind('click', function(){
			return false;
		});
		// logged in tab click
		$(self.default_elements.logged_in_tab_id).bind('focus', function(){

			if(!self.logged_in_dropdown_open){
	
				self.wmdPageLink('ov-mymd-imp');

				$(self.default_elements.logged_in_container).addClass('on');
				$(self.default_elements.overlay).removeClass('tab_on').addClass('authorization_on');
				self.logged_in_dropdown_open = true;
			} else {

				self.closeLoggedIn();
			}
			return false;
		});

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
		// nickname, WBMD_AUTH, webmd.p.registration.isLoggedIn()
		if(self.domain_vals.signcookie){

			$(self.default_elements.login_container).hide();
			$("#why_webmd").hide();
			$("#logged_in_text").css('display', 'block');
			$(self.default_elements.logged_in_container).css('display', 'block');

			if(self.nickname){
				$("#greeting").html('|&nbsp&nbspWelcome <a id="nickname" href="https://member.' + self.domain_vals.current_domain + 'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">' + self.nickname + '</a>');
			} else {
				$("#greeting").html('|&nbsp&nbsp<a id="nickname" href="https://member.' + self.domain_vals.current_domain + 'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');" title="User Profile">My Profile</a>');
			}
		}
	},

	setupSearch : function(){
		// remove default text
		$("#searchQuery_fmt").bind("focus", function(){
			if($(this).val() == "Search"){
				$(this).val("");
			}
		});
		// add default text
		$("#searchQuery_fmt").bind("blur", function(){
			if($(this).val() == ""){
				$(this).val("Search");
			}
		});
		// do search
		$(".searchButton_fmt").bind("click", function(){
			if($("#searchQuery_fmt").val() == "Search"){
				$("#searchQuery_fmt").val("");
			}
			return DoSearch();
		});

		$("#searchQuery_fmt").val("Search");
  	},

  	// event handler checked for clicks to wrapper for all content
  	setupPageEventHandlers : function(){
  		var self = this;
		
		$(self.default_elements.overlay).bind('touchstart', function(e){
			e.preventDefault();
		});

		$(self.default_elements.overlay).bind('touchend click', function(e){
			e.preventDefault();

			self.closeNavTabs();
			self.closeLogin();
			// add function as above
			$(self.default_elements.logged_in_container).removeClass('on');

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
			nav_dropdown_mousedown = false;

			self.closeLogin();
			self.closeNavTabs();
		});		
	},

	// checks for center to highlight one tab
	setupTabHighlighting : function(){
		// s_publication_source = "WebMD Health & Wellness Center"

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
		if(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i.test($("#reglogin_username").val())){
			$("#email_message").addClass('on');
			email_message = 'Please enter a valid email address';
		} else if(($("#reglogin_username").val() == '') || ($("#reglogin_username").val() == 'Please enter email address')){
			$("#email_message").addClass('on');
			email_message = 'Please enter your email address';
		} else {
			email_okay = true;
			$("#email_message").removeClass('on');
		}

		// check password
		if(($("#reglogin_password").val() == '') || ($("#reglogin_password").val() == 'Password')){
			$("#password_message").addClass('on');
			password_message = 'Please enter your password';
		} else {
			password_okay = true;
			$("#password_message").removeClass('on');
		}

		if(email_okay && password_okay){
			return true;
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

webmd.p.reg_data = {
	services: {
		defaults: {
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			timeout: 10000,
			type: "GET",
			cache: "false"
		}
	}
};
