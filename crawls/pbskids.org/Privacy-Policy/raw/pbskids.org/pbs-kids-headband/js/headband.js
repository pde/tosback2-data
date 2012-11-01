/*
 *
 * PBS KIDS Headband 1.0
 *
 * Headband events:
 *
 * headband-ready - fires when the headband markup has been loaded
 * headband-depebndencies-loaded  - fires when all dependencies are done loading
 * overrides-loaded - fires when the extra configuration has been loaded into the main config
 *
 */


function conditional_function(events, func){
    //Executes function func only 
    //after all events have been triggered
    var _events = events;
    var _collected_events = Array();
    
    var _func = function(e, args){
	_collected_events.push(e);
	if (_.intersection(_collected_events, _events).length == _events.length ){
	    return func(args)
	}
    }
    return _func;
}

if (typeof PBS == 'undefined'){
    var PBS = {
	'KIDS' : {}
    }
}
else {
    if (typeof PBS.KIDS == 'undefined'){
	PBS.KIDS = {}
    }
}
 
PBS.KIDS.Headband = (function(){

    var dispatcher;

    //Sites blacklist
    //A list of regex
    //If path matches regex
    //Headband is not displayed
    var _exclude = [ 
	    /^\/sesame\/swf\/gameloader.html/,
	    /^\/go\/apps/,   //Exclude the login pages
	    /^\/[^\/]+\/(parents|teachers|pareduc|grownups)/,  //Exclude all P&T sections that are on iframed on dipsy
	    /^\/mayaandmiguel\/(english|espanol)\/parents/,  //M&M both english and spanish sites
	    /^\/noah\/printables/,
	    /^\/barney\/children\/coloring\/(?!index.html).+/,
	    /^\/berenstainbears\/art\/coloring\/(?!index.html).+/,
	    /^\/betsy\/(color|maze)\.html/,
	    /^\/caillou\/activities\/(dots|storybook|memory_act)\//,
	    /^\/caillou\/activities\/(coloringbook|paperdolls)\/(?!index.html).+/,
	    /^\/clifford\/printables/,
	    /^\/curiousgeorge\/printables\/(?!index.html).+/,
	    /^\/dinosaurtrain\/print\/print\d+.html/,
	    /^\/rogers\/color\w+.html/,
	    /^\/georgeshrinks\/characters\/(?!index.html).+/,
	    /^\/jayjay\/colr\.(book|activity)\.\d+\.print\.\d+\.html/,
	    /^\/noddy\/popup-/,
	    /^\/mayaandmiguel\/(english|espanol)\/print\/(?!index.html).+/,
	    /^\/rogers\/color[a-zA-Z]+\.html$/,
	    /^\/sagwa\/color\/(?!index.html).+/,
	    /^\/sid\/print/,
	    /^\/wordworld\/printables/,
	    /^\/shareastory\/print\/(?!index.html).+/,
	    /^\/boohbah\/noflash\/bb_coloring\/(?!index.html).+/,
	    /^\/historydetectives\/printables\/bookmark\/(?!index.html).+/,
	    /^\/historydetectives\/printables\/notebook\/(?!(index|step0).html).+/,
	    /^\/cgi-registry\/you_are_in_the_story.cgi$/,
	    /^\/historydetectives\/printables\/booklist/,
	    /^\/lab/,
	    /^\/fetch\/mobile/,
	    /^\/martha\/mobile/,
	    /^\/sesame\/videoPlayer/,
	    /^\/itsmylife\/games\/story_strips_print.html/
    ];

    //Dynmically compute CDN domain
    var _base = undefined;
    // cdn_base represents the base url to the CDN.
    var _cdn_base = undefined;
    // Cdn represents the host of our CDN.                                                                                                                                                                                        
    var _cdn_host =  "www-tc.pbskids.org";
    // Compute CDN base url based on host.
    var _protocol = window.location.protocol;
    var _host = window.location.host;
    var _base = _protocol + "//" + _host;
    if (_host.match(/.*ernie.*/)) {
        _cdn_host = "ernie-tc.pbskids.org";
    }
    if (_host.match(/.*soup.*/)) {
        _cdn_host = "soup-tc.pbskids.org";
    }
    if (_host.match(/.*localhost.*/)) {
        _cdn_host = "localhost";
    }
    _cdn_base = _protocol + "//" + _cdn_host;

    var _head = document.getElementsByTagName('head')[0];

    var _load_css = function(href){
	var css = document.createElement('link');
	css.setAttribute('type', 'text/css');
	css.setAttribute('media', 'screen');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', href);
	_head.appendChild(css);
    }

    //Load the headband and login styles
    _load_css(_cdn_base + '/pbs-kids-headband/css/headband.css');
    _load_css(_cdn_base + '/includes/auth/ajax.css');

    //Default configuration
    var _config = {
        brand : "preschool",
	go_login: true,
        parents_url : "http://pbs.org/parents",
        teachers_url : "http://pbs.org/teachers",
	shop_partner: false,
        shop_url : "http://shop.pbs.org/",
        buttons_color : "#3C9ECE"
    };

    var get_config = function(){
	return _config;
    };

    //A helper function that sets a condition timer 
    //And performs an optional callback
    //when condition is met
    var _wait_until = function(condition, callback){
	var _wait = window.setInterval(function (){
	    //If condition is true
	    if(condition()){
		//Move on
		window.clearInterval(_wait);
		//Perform callback
		if(callback){
		    callback();
		}
	    }
	}, 10);	
    }

    //A helper function that gets the value
    //of a cookie or an optional default value
    var _get_cookie = function(c_name, def) {
	if (document.cookie.length>0) {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
            }
	}
	return (def ? def : "");
    };

    var _check_login = function(){
	//Look for username and userid cookies
	//Return all preference values if user is logged in
	//If user is not logged in return minimal config
	var username = _get_cookie('pbskids.username');
	var userid = _get_cookie('pbskids.userid');
	if (username && userid){
	    return {
		username: username,
		userid: userid,
		boxname: _get_cookie('pbskids.boxname', 'Secret Box'), 
		avatar: 'http://www-tc.pbskids.org/go/secretbox/images/avatars/' + _get_cookie('pbskids.avatar', 'trophy') + '.jpg',
		login_status: "logged-in",
		current_url: escape(window.location)
	    }
	}
	else {
	    return {
		login_status: "logged-out"
	    }
	}
    }

    var _get_base_url = function(){
	//Find the root url of the site
	//e.g. http://pbskids.org/somesite/games/index.html ==> http://pbskids.org/somesite
	var path = window.location.pathname;
	var root_path = path.match(/(.[^/]*)/)[1];
	var root_url = 'http://' + window.location.hostname + root_path;
	//Return url without trailing slash
	return root_url.replace(/\/$/, '');
    }

    var _get_config_url = function(){
	//Return the path to the constumization json
	return _get_base_url() + '/headband/config.js';
    }

    var _set_body_class = function(){
	//Sets a unique class on the body
	//for css targeting
	var path = window.location.pathname;
	var root_path_match = path.match(/^\/([^/]+)\//);
	var root_path;
	if ( root_path_match === null || root_path_match.length < 2){ //Not a match
	    root_path = 'home';
	} 
	else {
	    root_path = root_path_match[1];
	}
	var headband_class = 'headband-' + root_path;
	PBS.KIDS.$_auth('body').addClass(headband_class);
    }

    var _setup = function(){
	//Perform early initialization 
	_set_body_class();
    }

    //List of dependencies to be loaded, in order specified
    //'condition' and 'callback'  are anonymous functions
    //When condition() evaluates to true, callback is executed
    var _dependencies = [
	{'url': _cdn_base + '/pbs-kids-headband/js/underscore/underscore-min.js',
	 'condition': function(){ return typeof _ != 'undefined' },  
	 'callback': function(){ _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.eventDispatcher.js',
	 'condition': function(){ return typeof PBS.KIDS.eventDispatcher != 'undefined' },  
	 'callback': function(){ dispatcher = PBS.KIDS.eventDispatcher(); 
				 dispatcher.addEventListener('headband-ready', _conditional_show_user_block),
				 dispatcher.addEventListener('headband-dependencies-loaded', _conditional_show_user_block),
				 _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.jquery-1.4.2.min.js',
	 'condition': function(){ return typeof PBS.KIDS.$_auth != 'undefined' },  
	 'callback': function(){ _setup(); _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.sites.js', 
	 'condition': function(){ return typeof PBS.KIDS.Sites != 'undefined' },  
	 'callback': function(){ _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.handlebars.runtime-1.0.0.beta.js', 
	 'condition': function(){ return typeof PBS.KIDS.Handlebars != 'undefined' },  
	 'callback': function(){ _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/headband.tmpl.html', 
	 'condition': function(){ return typeof PBS.KIDS.Handlebars.templates != 'undefined' },  
	 'callback': function(){ _load_next(); _load_headband(); }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.jquery.outside.js',
	 'condition': function(){ return true },  
	 'callback': function(){ _load_next(); }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/PBS.KIDS.jquery.bxSlider.min.js',
	 'condition': function(){ return true },  
	 'callback': function(){ _load_next() }
	},
	{'url': _cdn_base + '/scripts/soundmanager2/script/PBS.KIDS.soundmanager2-nodebug-jsmin.js', 
	 'condition': function(){ return typeof soundManager != "undefined" }, 
	 'callback': function(){ _load_next() }
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/colorbox/PBS.KIDS.jquery.colorbox.js', 
	 'condition': function(){ return typeof PBS.KIDS.$_auth.fn.colorbox != "undefined" }, 
	 'callback': function(){ _load_next() } 
	},
	{'url': _cdn_base + '/pbs-kids-headband/js/auth/PBS.KIDS.auth.min.js', 
	 'condition': function(){ return typeof PKG != "undefined" && PKG.loaded  === true }, 
	 'callback': function(){ _load_callback(); _send_event('body', 'headband-dependencies-loaded') }
	}
    ];

    
    //Creates the <script> element
    //and injects it in head
    //sets the timer that checks for condition
    var _load_dependency = function(dependency){
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', dependency.url);
	_head.appendChild(js);
	_wait_until(dependency.condition, dependency.callback) 
    }

    //Load next dependency in the _dependencies array
    var _load_next = function(){ 
	_dependencies.shift(); 
	_load_dependency(_dependencies[0]);
    }

    var _load_callback = function(){
	var callback_script = document.getElementById('headband-callback');
        if (callback_script){
            callback_script.setAttribute('src', callback_script.getAttribute('_src'));
        }
    }

    var _send_event = function(el, event){
	//This is for the PBS.KIDS instance
	PBS.KIDS.$_auth(el).trigger(event);
	//This is in case there is a jQuery namespace out there
	if ( typeof jQuery != 'undefined' ){
	    jQuery(el).trigger(event);
	}
	dispatcher.dispatchEvent(event);
    }

    var _load_overrides = function(context){
	//Loads the override configuration in the 
	//context object

	//Look for override configuration
	var overrides = document.getElementById('headband-overrides');
	if (overrides){
	    overrides.setAttribute('src', overrides.getAttribute('_src'));
	    //Function that checks that overrides
	    //have beedn loaded
	    var _overrides_defined = function(){
		return typeof ( PBS.KIDS.Headband.overrides ) != "undefined" 
	    }
	    _wait_until( 
		_overrides_defined,
		function(){
		    //place overrides in context
		    for (var attrname in PBS.KIDS.Headband.overrides) { 
			context[attrname] = PBS.KIDS.Headband.overrides[attrname]
		    };
		    //Send notification that overrides are loaded
		    _send_event('body', 'overrides-loaded');
		}
	    )
	}
	else{
	    _send_event('body', 'overrides-loaded')
	}
    }
    
    var _load_headband = function(){

	var _render = function(context){
	    //Compile the template and inject the headband
	    var template = PBS.KIDS.Handlebars.templates['headband.source.html'];
	    var headband_container = PBS.KIDS.$_auth('#headband-container')[0];
	    if(! headband_container){ 
		headband_container = PBS.KIDS.$_auth('<div id="headband-container"></div>')
		headband_container.prependTo('body');
	    }
	    document.getElementById("headband-container").innerHTML = template(context);	    
	    _init_UI(PBS.KIDS.$_auth);
	    //Send out the ready event
	    _send_event('body', 'headband-ready');
	};


	//Load the customization file
	//When complete create the context, render the template 
	//and inject it at top of document body
	PBS.KIDS.$_auth.ajax({
	    url:  _get_config_url(),
	    complete: function(response){
		if (response.status == 200){
		    //If configuration file is found, override default config
		    config_string = response.responseText;
		    var _site_config = PBS.KIDS.$_auth.parseJSON(config_string);
		    for (var attrname in _site_config) { _config[attrname] = _site_config[attrname] };
		}

		var context = _config;
		var login_status = _check_login();
		//Merge login data object with customization object
		for (var attrname in login_status) { 
		    context[attrname] = login_status[attrname]; 
		}
		//Add sites links to context
		context.sites = PBS.KIDS.Sites.order(context['brand']);
		
		//When the overrides are done loading,
		//render the headband
		PBS.KIDS.$_auth("body").bind("overrides-loaded", 
					     function(){ _render(context) });

		//Add override configuration
		//This sends notification that overrides are loaded
		_load_overrides(context);
	    },
	    dataType: 'json'
	})
    }
	
    var _init = function(){
	//Loop through blacklist
	//exit early if found
	for (var i=0; i < _exclude.length; i++){
            if (window.location.pathname.match(_exclude[i])){
		return 0;
            }
	}
	//else
	//Initiate dependency loading chain
	_load_dependency(_dependencies[0]);
    }

    var _set_button_color = function(hex){	
	PBS.KIDS.$_auth("#headband-grownups-block ul li.button").css('background-color', hex);
	PBS.KIDS.$_auth("#headband-grownups-block ul li.label").css('color', hex);
	PBS.KIDS.$_auth("#headband-grownups-block ul").css('background-color', hex);
    }

    var _show_user_block = function(){
	PBS.KIDS.$_auth('a[href*="/go/apps/auth/"]:not([href*="logout"])').colorbox({
	    onCleanup: function() {
                soundManager.pauseAll();
	    },
	    onComplete: function() {
                PBS.KIDS.$_auth('body').trigger('init.go');
	    }, overlayClose: false
        });

	PBS.KIDS.$_auth("#pbskids-headband.login #headband-user-block").show();
	PBS.KIDS.$_auth("#pbskids-headband").addClass('login-ready');
    }

    //Show the user block after headband markup is ready AND all the dependencies havs been loaded
    var _conditional_show_user_block = conditional_function(['headband-ready', 'headband-dependencies-loaded'], _show_user_block);

    var _init_UI = function($){

	//Define the behaviour of menu/buttons
	var siteHEX = '#3C9ECE';
	var $siteButtonColors = _config['buttons_color'] || siteHEX; // Default Value. Change this var to change right button colors
	
	_set_button_color($siteButtonColors);
	
	$('#headband-grownups-block ul li.button:last-child').addClass('last');
	$('#pbskids-headband').append('<span class="jimmy"></span>');

	var exploreToggle = function() {
        var $trigger = $(this);
	    var $siblingMenu = $('#site-exlpore-menu');
	    var $parentHeadband =  $trigger.parent('#pbskids-headband');
	    
	    
	    if ($('#mobile-sub-nav').hasClass('open')){ 
		$('#headband-grownups-block ul li.button').fadeOut(100);
		$('#mobile-sub-nav').slideUp().removeClass('open').addClass('closed');
		$('#headband-grownups-block ul li.label').removeClass('active');
        }
            
	    if ($siblingMenu.hasClass('closed')) { 
		$siblingMenu.slideDown();
		$('#site-exlpore-menu ul.handpicked-shows').fadeIn(1600);
		loadShows();
		$('#site-exlpore-menu span.fader').fadeIn(800); 
		$('#site-exlpore-menu .bx-next').fadeIn(800); 
		$('#site-exlpore-menu .bx-prev').fadeIn(800); 
		$siblingMenu.find('#explorer-close').fadeIn(800);  
		$siblingMenu.removeClass('closed').addClass('open');
		$trigger.addClass('active');
		$('body').addClass('headband-open');
		
	    } else if ($siblingMenu.hasClass('open')) {   
		$siblingMenu.slideUp();
		$('#site-exlpore-menu ul.handpicked-shows').fadeOut(800);  
		$siblingMenu.removeClass('open').addClass('closed');  
		$trigger.removeClass('active');
		$('body').removeClass('headband-open'); 
		
	    }
	    function closeExplorer(){
		$siblingMenu.find('#explorer-close').fadeOut(100); 
		$('#site-exlpore-menu ul.handpicked-shows').fadeOut(800); 
		$siblingMenu.slideUp().removeClass('open').addClass('closed');
		$('button.brand-action-toggle').removeClass('active');
		$('body').removeClass('headband-open');  
	    }     
	    
	    $('#explorer-close').unbind("click").click(function(){           
		  closeExplorer();      
	    });  
	    
	};
	$('button.brand-action-toggle').bind('click', exploreToggle);
	
    var outsideClose = function(event) {
      if ($(event.target).is('#pbskids-headband')) {
      
        //This is to prevent the function firing twice since after AJAX reload
      
      } else {
	    if ($('#site-exlpore-menu').hasClass('open')){ 
		  $('#site-exlpore-menu').find('#explorer-close').fadeOut(100); 
		  $('#site-exlpore-menu ul.handpicked-shows').fadeOut(800); 
		  $('#site-exlpore-menu').slideUp().removeClass('open').addClass('closed').addClass('pk-resize');
		  $('button.brand-action-toggle').removeClass('active');
		  $('#mobile-sub-nav').removeClass('pk-resize');
	    }
	    if ($('#mobile-sub-nav.active').hasClass('open')){ 
		  $('#headband-grownups-block ul li.button').fadeOut(100);
		  $('#mobile-sub-nav').slideUp().removeClass('open').addClass('closed').addClass('pk-resize'); 
		  $('#headband-grownups-block ul li.label').removeClass('active');
		  ('#site-exlpore-menu').removeClass('pk-resize');
	    }
	   
	    
        $('body').removeClass('headband-open');     
      }  
	};
    
    $('#headband-container').bind('clickoutside', outsideClose);
	
	function activateGrownups(){   
	    $('#headband-grownups-block ul li.label').bind('click',function(event){
		if ($('#site-exlpore-menu').hasClass('open')){
		    $('#site-exlpore-menu').find('#explorer-close').fadeOut(100); 
		    $('#site-exlpore-menu ul.handpicked-shows').fadeOut(800);  
		    $('#site-exlpore-menu').slideUp().removeClass('open').addClass('closed');
		    $('button.brand-action-toggle').removeClass('active');
		}
		if ($('#mobile-sub-nav').hasClass('open')) {
		    $('#headband-grownups-block ul li.button').fadeOut(100);
		    $('#mobile-sub-nav').slideUp().removeClass('open').addClass('closed');
		    $('body').removeClass('headband-open');   
		} else {
		    $('#headband-grownups-block ul li.button').fadeIn(100); 
		    $('#mobile-sub-nav').slideDown().removeClass('closed').addClass('open');
		    $('body').addClass('headband-open');
		}
		
		if ($(this).hasClass('active')) {
		    $(this).removeClass('active');
		} else {
	            $(this).addClass('active');  
		}		 
		 
		$('#mobile-sub-nav').addClass('active');
	    });
	} 
	
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
	    var timeout;
	    return function debounced () {
		var obj = this, args = arguments;
		function delayed () {
		    if (!execAsap)
			func.apply(obj, args);
		    timeout = null; 
		}; 
		if (timeout)
		    clearTimeout(timeout);
		else if (execAsap)
		    func.apply(obj, args);
		timeout = setTimeout(delayed, threshold || 600); 
            };
	}
	// smartresize 
	$.fn['smartresize'] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	
	// Deafault Grown-ups Button State
	if ($(window).width()<837){
	    activateGrownups();
	} 
	
	$(window).smartresize(function(){  
	    $('#headband-grownups-block ul li.label').unbind('click');
	    if (($(window).width()>837)) {
		$('#headband-grownups-block ul li.button').show(); 
		$('#headband-grownups-block ul li.label').removeClass('active');
		$('#mobile-sub-nav').addClass('closed').removeClass('open').removeClass('active').hide();
	    }
	    
	    if ($(window).width()<837){ 
		activateGrownups();
	    }      
	});
	
	var ua = navigator.userAgent;
    function is_touch_device() {
      return !!('ontouchstart' in window);
    }
    
    if ((is_touch_device()) || ua.match(/(iPhone|iPod|iPad)/) 
    || ua.match(/BlackBerry/) || ua.match(/Android/)) {
      $('#headband-menu').bind('touchstart',function(event){
	    var $trigger = $(this);
	    var $subMenu =   $trigger.find('li.username ul');
	    var $userArrow = $trigger.find('.username span');
	    
	    if ($trigger.hasClass('open')) {
		    $trigger.removeClass('open');
		    $subMenu.slideUp(); 	
	    } else {
		  $trigger.addClass('open');
		  $subMenu.slideDown();     
	    }
	    $("#headband-menu ul li a").bind('touchstart',function(event){
          event.stopPropagation();
        });
	  });
    
    } else {
      $('#headband-menu').bind('mouseover',function(event){
	    var $trigger = $(this);
	    var $subMenu =   $trigger.find('li.username ul');
	    var $userArrow = $trigger.find('.username span');
	    
	    if ($trigger.hasClass('open')) {
		  $trigger.bind('mouseleave', function(event) {
		    $trigger.removeClass('open');
		    $subMenu.slideUp();
		  }); 
	    } else {
		  $trigger.addClass('open');
		  $subMenu.slideDown();     
	    }
	  });	    
    }	
	
	var mySlider;
	function loadShows(){
	    
	    var viewWidth = $(document).width();
	    var showCount = $('#site-exlpore-menu ul.handpicked-shows li').length;
	    var pageSteps = Math.round(viewWidth/60);
	    var slideSteps = 3;
	    
	    if (!mySlider) {
		mySlider= $('#site-exlpore-menu ul.handpicked-shows').bxSlider({
		    displaySlideQty:pageSteps,
		    moveSlideQty:slideSteps,
		    infiniteLoop: true,
		    speed: 1000,
		    startingSlide: 0
   		});
   		$('<span class="fader left"></span><span class="fader right"></span>').insertAfter('#site-exlpore-menu .bx-window');   	      
   	    }
	    
	}
	
	//Bind Grownup buttons to bridge overlay
	var $teachers_anchor = $('#teachers-anchor');
	var $parents_anchor = $('#parents-anchor');
	var $shop_anchor = $('#shop-anchor');

	_wait_until(
	    function(){ return typeof 'bridge' != 'undefined' },
	    function(){ 
		$teachers_anchor.click(function() { return bridge($teachers_anchor.attr('href') , 'PBS KIDS Teachers') });  
		$parents_anchor.click(function() { return bridge($parents_anchor.attr('href') , 'PBS KIDS Parents') });
		if ($shop_anchor){
		    $shop_anchor.click(function() { return bridge($shop_anchor.attr('href') , 'PBS KIDS Shop') });
		}
	    }
	)
	
	// Class used for reset of init to fix resize issue after AJAX on Preschool Home	
    $('#go-auth .button input').live('click', function() {
      $('body').addClass('headband-reloaded');  
    });	
	$('body').removeClass('headband-open').addClass('has-headband');
		
    } // End    
    
    return {
	init: function(){ _init() },
	reload: function(){ 
	    _load_headband(); 
	},
	button: function(hex){
	    //Use PBS.KIDS.$_auth for jQuery
	    _set_button_color(hex);
	}
    }
    
})();

PBS.KIDS.Headband.init()



