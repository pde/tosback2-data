/** $Id: MI_AdDrivers.js 2966 2012-07-10 20:45:10Z scowles $ */
/******************************************************************
 * @fileoverview Class for implementing the side scroll ad, used to provide the
 * scroll event bindings that cause the ad to slide in and out of view, and
 * the functionality for the 'close' button in the ad.
 *
 * In order to use this class, simply call the constructor to instantiate the
 * object, passing it the css selector of the outermost container element in the ad
 * markup, like:
 *   var sideScrollAd = new mi.SideScrollAd('#slideadContainer');
 *
 * @minify true
 * @author Ryan Storment
 * @requires jQuery-1.2.6
 *************************************************************************************/

var mi = (!mi) ? {'media_domain':''} : mi;

/** 
 * SideScrollAd @constructor. Accepts a single parameter, a string representing the css selector
 * of the outermost container element within the ad markup--can be any css selector
 * string, just like using jQuery element selection.  Instantiates an object that handles
 * event bindings for scrolling past a certain percentage of the page, and for clicking on
 * the 'close' link in the ad.
 *
 * @param container {string} the css selector of the ad's outermost element
 */
mi.SideScrollAd = function( container ) {
    
    /** css selector of the outermost container element within the ad markup
     * @type String
     */
    this.container = $(container).length ? $(container) : '';
    
    /** percentage of the page at which the ad should be triggered to slide
     *  in/out of view
     * @type Integer
     */
    this.trigger_percentage = 70;
    
    this.show = false;
    
    /* create event bindings if ad markup has been loaded, otherwise fail gracefully */
    if ( this.container !== '' )
    { 
        this.right = this.container.css('right');
        
        /* handle scroll event */
        $(window).bind( 'scroll', {obj: this}, function(event) {
        
            var obj = event.data.obj;
        
            if ( obj.getScrollPosition() > obj.trigger_percentage && obj.show === false )
            {
                obj.container.stop().animate( {'right': '0px'}, 850 );
                obj.visible('true');
            }
            else if ( obj.getScrollPosition() < obj.trigger_percentage )
            {
                obj.container.stop().animate( {'right': obj.right}, 850 );
                obj.visible('false');
            }        
        });
        
        /* handle click on 'close' link */
        $("#closeSlideout a").bind( 'click', {obj: this}, function(event) {
            var obj = event.data.obj;
            obj.container.stop().animate( {'right': obj.right}, 850 );
        });
    }
    else
    {
        console.warn( "Slide ad cannot be instantiated. "+container+" does not exist." );
    }

};


/**
 * gets/sets the 'show' property of the ad, flagging whether the ad has been shown
 *
 * getter/setter
 * @private
 * @param value {Boolean} value to set the 'show' property to.
 */
mi.SideScrollAd.prototype.visible = function( value )
{
    if ( value === undefined )
    {
        return this.show;
    }
    else
    {
        switch (value)
        {
            case 'true':
            case 1:
                this.show = true;
                break;
            case 'false':
            case 0:
                this.show = false;
                break;
            default:
                break;
        }
    }
};

/**
* returns the amount of the page that has been scrolled into view as a percentage of
* the page's total height--this is essentially a measure of what percentage of the
* page is represented by the BOTTOM visible row of pixels in the browser's window.
*
* @private
*/
mi.SideScrollAd.prototype.getScrollPosition = function()
{
     var bottom = $(window).height() + $(window).scrollTop();
     var height = $(document).height();

     return Math.round(100*bottom/height);
};


/**
 * FloorAd @constructor. Accepts a single parameter, a string representing the css selector
 * of the outermost container element within the ad markup--can be any css selector
 * string, just like using jQuery element selection.  Instantiates an object that handles
 * event bindings for clicking on the ad to open and close.
 *
 * @param container {string} the css selector of the ad's outermost element
 * @param repeat {string} repeat time in hours before given floorboard is served expanded
 */

mi.floorAd = function( container, repeat ) {
    mi.App.apply(this, arguments);
    /* get needed information */
    this.container = $(container).length ? $(container) : '';
    this.wrapper = $(container + ' #floorboard-wrapper');
    this.mainImg = $(container + ' img:eq(0)');  //main image
    this.mainWidth = this.mainImg.width();  //main image width
    this.mainHeight = this.mainImg.height();  //main image height
    this.leaveImg = $(container + ' img:eq(1)');  //leave behind image
    this.leaveHeight = this.leaveImg.height();  //leave behind height
    this.closeLink = $(container + ' map[name="floorclosemap"]  area');  //get area link(s?) for close button
    this.openLink = $(container + ' map[name="flooropenmap"] area');  //get area link(s?) for open button
    this.repeat = typeof repeat !== 'undefined' ? repeat : 240;//default to 4 hours (240 minutes) before a given floorboard is expanded
    
    this.setConf('repeat',this.repeat);//repeat time in minutes before given floorboard is expanded
    this.setConf('container',container);
    this.timeStamp = Math.round(new Date().getTime()/60000);//epoch minutes
    this.cookieName = 'mi_floorboard';
    this.expand = true;
    
    this.cookie = new mi.Cookie(document, this.cookieName);
    this.cookie.load();
    
    if (this.container !== '')
    {
        this.container.css({'position' : 'fixed',
                            'text-align' : 'left',
                            'bottom' : '0',
                            'right' : '0',
                            'left' : '0'});
        // work around a bug in iPad/iPhone viewport
        if(navigator.platform == 'iPad' || 
           navigator.platform == 'iPhone' || 
           navigator.platform == 'iPod' || 
           navigator.platform == 'Linux armv7l') 
        {
            this.container.css("position", "static");
        }
        // end workaround

        this.wrapper.css({'width' : this.mainWidth + 'px',
                          'text-align' : 'left',
                          'margin' : '0 auto'});

        if (this.mainImg !== '')
        {
            this.flightID = this.mainImg[0].getAttribute('data-flightid');
            if(this.flightID == null){
                this.leaveImg[0].getAttribute('data-flightid');
            }
            this.flightID = this.flightID != null ? this.flightID : '';
            
            var minutesAgo = this.lastShown();
            if(minutesAgo >= 0 && minutesAgo <= this.repeat){
                this.expand = false;
            }
            
            this.setCookie();
            
            this.mainImg.css({'position' : 'absolute', 
                              'border' : '0', 
                              'bottom' : (-1 * this.mainHeight), 
                              'z-index' : '2147483647'});            
            
            
            if (this.leaveImg !== '' && this.closeLink !== '')
            {
                this.leaveImg.css({'visibility' : 'hidden', 
                                   'border' : '0', 
                                   'position' : 'absolute', 
                                   'bottom' : (-1 * this.leaveHeight), 
                                   'z-index' : '2147483647'});
                
                this.closeAd = function(){
                    $(container + ' img:eq(1)').css({'visibility' : 'visible',
                                                     'bottom' : (-1 * $(container + ' img:eq(0)').height())});
                    $(container + ' img:eq(0)').animate({'bottom' : (-1 * $(container + ' img:eq(0)').height())});
                    $('body').animate({'margin-bottom' : $(container + ' img:eq(1)').height()});
                    $(container + ' img:eq(1)').animate({'bottom' : '0'});
                };               
                this.closeLink.click(this.closeAd);

                // set up open button if it exists
                if (this.openLink != '') 
                {
                    this.openLink.click(function() {
                        $(container + ' img:eq(1)').animate({'bottom' : (-1 * $(container + ' img:eq(1)').height())});
                        $(container + ' img:eq(0)').animate({'bottom' : '0'});
                        $('body').animate({'margin-bottom' : $(container + ' img:eq(0)').height()});
                    });
                }
            }

            // animate main image into view first thing
            var passAd2ready = this;
            $(document).ready(function() {
                if(passAd2ready.expand){
                    $(container + ' img:eq(1)').css({'bottom' : (-1 * $(container + ' img:eq(1)').height())});
                    $(container + ' img:eq(0)').animate({'bottom' : '0'});
                    $('body').css({'margin-bottom' : $(container + ' img:eq(0)').height()});
                }
                else{
                    passAd2ready.closeAd();
                }
            });
        }
        else
        {
            console.warn("No floor ad images to display");
        }
    }
    else
    {
        console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");
    }
};

/**
 * FloorAd @setCookie. Stores info on when each ad campaign was last seen.
 */
mi.floorAd.prototype.setCookie = function()
{
    var cookieData = new Array();
    var flightKey = 'fbid' + this.flightID;
    if(this.cookie){//if there was an existing cookie, read and get rid of expired timestamps
        for(var prop in this.cookie) {
            //if(prop.indexOf('fbid') != -1 && prop != flightKey){
            if(prop.indexOf('fbid') != -1){
                var id_time = parseInt(this.cookie[prop]);
                if((this.timeStamp - id_time) <= this.repeat){//if we saw this ad within the repeat period, retain it in cookie, else throw it out
                    cookieData[prop] = this.cookie[prop];
                }
            }
        }
    }
    this.cookie.remove();
    this.cookie = new mi.Cookie(document, this.cookieName, this.getConf('repeat'), '/');//new mi.Cookie(document, name, minutes, path, domain, secure);
    this.cookie[flightKey] = this.timeStamp;
    for(var prop in cookieData) {
        this.cookie[prop] = cookieData[prop];
    }
    this.cookie.store();
};

/**
 * FloorAd @lastShown. Given the flight id of an ad, returns minutes ago add was last shown, or false if we haven't seen it
 * @param flightID {string} unique identifier for this ad, embedded in the ad
 */
mi.floorAd.prototype.lastShown = function(flightID)
{
    flightKey = 'fbid' + this.flightID;
    if(this.cookie){
        if(this.cookie[flightKey]){
            var id_time = parseInt(this.cookie[flightKey]);
            return (this.timeStamp - id_time);
        }
        else{return -1;} //we haven't seen this ad since the cookie was created
    }
    return -1;//no cookie
}

// IMPORTANT: executes when complete page is fully loaded, including all frames, objects and images
// meaning, we can't bind click for the ad until after the window.load
$(window).load(function() {
    $('div[name=adx_al]').bind('click', function() {
        /* keep this scoped inside of he click */
        var $curMarg = $('body').css('margin-bottom').replace("px", "");
        $curMarg = ($curMarg == 30) ? 110 : 30;
        $('body').css('margin-bottom', $curMarg + 'px');
    });
    
    //fix for extra spacing and images displaying in untargeted ad slots
    //FIXME: this should be moved out of document.ready to bottom of page when we add a js file to the bottom
    $('.advertisement img').each(function(index) {
        if(this.height==1 && this.width==1){
            $(this).css("display", "none");
         }
    });
});

// $Id: MI.js 1603 2011-03-24 20:29:00Z bjones $
/** MI.js **********************************************************************
 * @fileoverview Inclusion of this library creates an MI object within a
 * variable named <tt>mi</tt>. The MI object is intended to namespace
 * functionality developed by McClatchy Interactive. Because the MI object is
 * self-instantiating there is no constructor per se, and there should be no
 * reason to try to create any additional copies/instances, it is a generic
 * object.
 *
 * <p><strong>window.console</strong><br>In addition to automatically creating
 * the <tt>mi</tt> variable this library also will create a
 * <tt>window.console</tt> object in browsers that don't already have one. The
 * window.console object is then provided with Firebug-like methods if they do
 * not already exist. At the very least this allows you to use
 * <tt>console.log()</tt> in your code without the fear of throwing errors in
 * browsers that don't support it. <em>Note:</em> Safari natively supports
 * console.log, but not (m)any of the other Firebug console methods. With Safari
 * and Firefox/Firebug output from console methods can be viewed in the
 * browser's console window. In browsers without a console window the console's
 * log can be accessed via an alert window at page load if the page is loaded
 * with the query string <em>?viewlog=1</em>. Currently all supported Firebug
 * methods are basically aliases for the log, though the log will report what
 * method was used. Future updates may provide additional features with these
 * methods to make them more Firebug-like.</p>
 *
 * <p><strong>Extending the MI object</strong><br>
 * The MI object is an evolving piece of code and extending its functionality is
 * encouraged. However, we do ask that you follow these guidelines.</p>
 * <ul>
 * 	<li><strong>Document your code -</strong> This was specifically chosen as 
 * 		the first item. The more the better. With the aggregator's ability to strip 
 * 		comments don't be shy about putting too much documentation into your code. 
 * 		For the win, write your documentation in the format used by JSDoc so that 
 * 		your documentation can be parsed. See this file as an example. Inclusion of 
 * 		the <tt>&#64;minify true</tt> flag will allow your code to be minified, thus 
 * 		stripping whitespace and comments from code used on live sites.</li>
 * 	<li><strong>More, smaller files -</strong> Your code should be included on
 * 		pages via aggregation, so there's no need to write huge library files that
 * 		contain the kitchen sink. Organize your code into files of related 
 * 		functionality.</li>
 * 	<li><strong>Consolidate features into apps -</strong> The MI object provides
 * 		the <tt>mi.App</tt> class that facilitates easy creation of applications
 * 		for specific features.</li>
 * 	<li><strong>Stick to naming conventions -</strong>
 * 		<ul>
 * 			<li>CamelCase constructors with an initial cap</li>
 * 			<li>Start private method and variable names with an underscore</li>
 * 			<li>File names should imply scope, separated by underscores. For example
 * 			<tt>MI_Search.js</tt>.</li>
 * 		</ul>
 * 	</li>
 * 	<li><strong>Overwrite similar functionality -</strong> There's no need to 
 * 		have multiple apps or methods that do similar tasks. Instead overwrite the
 * 		existing feature with your new version. Even better, make your new version
 * 		accept input and produce output the same as the old version, but with 
 * 		additional options to facilitate your new behavior. This will preserve 
 * 		backward compatability.</li>
 * 	<li><strong>Contain dependencies -</strong> Don't rely on, or trust in 
 * 		global variables. Either pass values in during execution, or make them
 * 		configurable options.</li>
 * 	<li><strong>Generalize -</strong> Any code within the MI object should be 
 * 		considered general in that it could be utilized on any site. No 
 * 		site-specific code. Any site-specific values should be configuration 
 * 		options.</li>
 * 	<li><strong>Exit gracefully -</strong> With the console now available on all
 * 		browsers there's little or no need to use <tt>alert()</tt> and fear users
 * 		getting messages meant for developers. Test for dependencies and exit if
 * 		they don't meet your requirements after outputting a message to the 
 * 		console.</li>
 * </ul>
 * 
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @namespace mi
 * @aggpath js/MI.js
 */

var mi = (typeof mi == 'undefined') ? {'media_domain':''} : mi;
if (window.miAppControler) {
	mi.control = new miAppControler();
}



/** This method parses name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object.
 * @author Adapted from "Javascript: The Definitive Guide" by David Flanagan
 */
mi.getArgs = function() {
        if (typeof mi.args == 'undefined') {
	        mi.args = {};
	        var query = location.search.substring(1);
	        var pairs = query.split('&');
	        for(var i=pairs.length -1; i >= 0; i--) {
		        var pos = pairs[i].indexOf('=');
		        if (pos == -1) {continue;}
		        mi.args[pairs[i].substring(0,pos)] = unescape(pairs[i].substring(pos+1));
	        }
        }
        return mi.args;
};


/** A stand-in for console.log() for browsers without the functionality
 * The logged message is stored for later retreival. This function gets set as
 * console.log by mi.fixConsole if needed. Each logged message is separated by 
 * a line of hyphens.
 * @private
 */
mi._console = function(s) {
	mi._console.log = (mi._console.log && mi._console.log.length > 0) ? mi._console.log + '\n---------------------------------------------------\n' + s : s;
};



/** Use console methods even in browsers without a console.
 * Defines a console object in browsers that lack one and then populates the
 * console with any missing methods from a list based on those used by Firebug.
 * Any methods created in this manner act effectively as a self-identifying
 * alias for console.log.
 *
 * <p>This method is automatically executed as the code is loaded. With this
 * in place developers can make use of console methods without worrying about
 * causing errors on browsers with no console. This makes troubleshooting during
 * development easier, as well as allowing standing error reporting features to
 * be utilized even on live pages.</p>
 *
 * This method is based on Pluck's NYX object method of the same name.
 */
mi.fixConsole = function() {
	if (typeof window.console != "object") { window.console = {}; }
	if (window.console.is_fixed) {/*already fixed*/}
	else {
		// list of firebug method names, "log" should always be first
		// this list is used to create "stand-in" methods for the console object if needed
		var firebugMethods = ["log","debug","info","warn","error","assert","dir","dirxml",
			"trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];
		var methodCount = firebugMethods.length;
		var args = mi.getArgs();
		var view = (args.viewlog && args.viewlog == '1');
		for (var i = 0; i < methodCount; i++) {
			var methodName = firebugMethods[i];
			if (typeof window.console[methodName] != "function") {
				switch (methodName) {
					// Firebug console methods can be replicated here by adding cases
					case 'log':
						if (view) {
							window.console.log = mi._console;
							if (window.addEventListener) {
								window.addEventListener("load", function(){alert(mi._console.log);}, false);
							} else if (window.attachEvent) {
								window.attachEvent("onload", function(){alert(mi._console.log);});
							}
						} else {
							window.console.log = function(){};
						}
						break;
					default:
						eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase() + ": '+ s)};");
				}
			}
		}
	}
	//add our tracking flag
	window.console.is_fixed = true;
};
mi.fixConsole();

/** handy method/constructor for cloning objects
 * by default, setting a variable equal to a pre-existing object just creates
 * a reference to the original, this allows you to create an independant copy
 * of the original with no back-reference
 * @param {Object} sourceObj The object to be cloned.
 * @return A copy of the source object, <b>not</b> a reference to the original
 * @type Object
 */
mi.cloneObject = function(sourceObj) {
	if (sourceObj == null || typeof sourceObj != 'object') {
		return sourceObj;
	}
	var temp = new sourceObj.constructor();
	for (var key in sourceObj) {
			temp[key] = mi.cloneObject(sourceObj[key]);
	}
	return temp;
};


/** A constructor for applications that come pre-loaded with useful features.
 *
 * <p>Application objects come with features that facilitate the management of
 * configuration values with a system of methods used to make setting and 
 * accessing configuration values easily while protecting those settings from 
 * accidental or malevolent corruption.</p>
 * <h2>Creating your App</h2>
 * <p>In order to properly inherit all of the private properties that keep your 
 * configuration settings safe you need to use a somewhat non-traditional manner 
 * to instantiate your App. Instead of creating an instance of mi.App you 
 * instead create a constuctor for your App and inherit from the mi.App "class",
 * making your constructor a sub-class of mi.App.</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
}</pre>
 * <h2>Enforcing config values</h2>
 * <p>With the only way to set configuration values being via the 
 * {@link #setConf} method you have the ability to define rules around what 
 * kinds of values are acceptable per configurable option. This is accomplished 
 * by defining a method named <tt>_manageConf</tt> specifically to
 * apply your rules. It is up to you to develop the enforcement of your rules. 
 * Here's an example:</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
  this._manageConf = function(prop, val) {  
    switch (prop) {
      case 'gender':          // each case is based on the name of the configurable option
        if (
          val != 'male' ||
          val != 'female' ||
          val != 'unknown'
        ) {
          val = 'unknown';
        }
      break;
    }
    return val;
  };
}</pre>
 * <p>This example only enforces the setting of the <i>gender</i> configuration,
 * with three possible values. If an unacceptable value is passed the config 
 * gets set to an acceptable default value. Set up a case for each configuration
 * that needs enforcement. In any case, your method needs to accept two variables,
 * the name of the config and the value, and must return the value to be used.</p>
 * @constructor
 */
mi.App = function() {
	var _configs = {};
	/**
	 * Stand in method to be used for managing configuration values. By default
	 * this method does not do anything. Individual apps have the option to overwrite
	 * this method with their own functionality.
	 * @private
	 */
	this._manageConf = function(prop, val) { return val; };
	/**
	 * Set configuration values in the app.
	 * <p>Configurations may be loaded in one of two ways:</p>
	 * <ol><li>Individually: Pass two arguments, the first being the name of the
	 * configuration value and the second being the value, or</li>
	 * <li>Batch: Pass an object with attributes named after the config name and
	 * their values being the desired config setting.</li></ol>
	 * <p>Actually, you can also use these two means of configuring your app when
	 * you instantiate it by passing arguments to the constructor.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.yourApp1 &#61; new mi.YourApp('gender','male');
mi.yourApp2 &#61; new mi.YourApp({'gender':'unknown','name':'Pat'});</pre>
	 * <p>If you have multiple configurations to set at one time, passing an object
	 * is probably the most efficient means of getting them set.</p>
	 * @param {Object} confs A generic object containing one or more attributes
	 * that will be used to create the configuration(s), or
	 * @param {String} name The name of the configuration value to be set, this
	 * should be a string value, and
	 * @param value The value to be used.
	 */
	this.setConf = function() {
		switch (arguments.length) {
			case 1:
				for (var prop in arguments[0]) {
					_configs[prop] = this._manageConf(prop, arguments[0][prop]);
				}
				break;
			case 2:
				_configs[arguments[0]] = this._manageConf(arguments[0],arguments[1]);
				break;
			default:
				console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');
		}
	};
	/**
	 * Retreive a configuration value from the app.
	 *
	 * <p>Any configuration value can be retrieved using this method. Simply pass
	 * the name of the config setting as the one argument. The value of the 
	 * setting is returned.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.example.setConf('name','Fred');
name &#61; mi.example.getConf('name');	//name is now equal to "Fred"</pre>
	 * @param {String} prop The configuration setting name you want returned; a string.
	 * @return The value associated with the named setting.
	 */
	this.getConf = function(prop) {
		return _configs[prop];
	};
	/**
	 * Outputs all configuration settings to the console.
	 *
	 * A convenience method for troubleshooting. Calling this method will output
	 * the name and value of each configuration setting in the app.
	 */
	this.viewConfs = function() {
		console.dir(_configs);
	};
	/**
	 * Object used for storing temporary values.
	 *
	 * <p>Rather than littering your app with variables used by the app's methods
	 * this object is provided as a bucket for storing those values. There are no
	 * controls around what can be set in this object. Basically it's an 
	 * unprotected bucket, so values shouldn't necessarily be trusted, test them
	 * before relying on them.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.exampleApp.cache.foo = "bar";</pre>
	 */
	this.cache = {};
	/* pass any arguments on to setConf() to configure the app as it's instantiated
	 */
	switch (arguments.length) {
		case 1:
			this.setConf(arguments[0]);
			break;
		case 2:
			this.setConf(arguments[0], arguments[1]);
			break;
	}
};


/** A Method for discovering the object/node that kicked off the current event.
 *
 * <p>This can be a very handy method to make determining what element kicked
 * off an even a snap. It can also be frustrating without proper documentation.
 * Basically, when called correctly this will return the source element of the
 * current event.</p>
 * <b>Usage Example:</b><br>
 * <pre>jQuery(window).click(function(e){
	console.log(mi.getEventSrc(e));
});</pre>
 * <p>In this case the object that was clicked on will be output to the console.
 * Due to event bubbling it is the object clicked, not the object with the
 * listener that is reported. That's what makes this so useful. So if in this
 * example you clicked on a paragraph object it would be that paragraph that
 * would be returned not the window object.</p>
 * <p><i>Note:</i> it is key that an argument representing the event object is 
 * passed to the handler for browsers that do not support IE's <tt>window.event</tt>
 * object.</p>
 */
mi.getEventSrc = function (e) {
	if (!e) {e = window.event;}
	if (e.target) {
		return e.target;
	} else if (e.srcElement) {
		return e.srcElement;
	}
};


/**
 * Pattern used by {@link #templateParser} to find variables.
 * @type RegEx
 */
mi.templateVarPattern = /\@([^\@]+)\@/g;
/** method for parsing a template and replacing a pattern with the equivalent
 * attributes from an object
 *
 * <pre>var data object to get values from
 *var template string containing placeholders</pre>
 *
 * <p>Placeholders in the template should be given the name of the attribute to be 
 * used as the substitute surrounded by "@" symbols, i.e. @name@</p>
 *
 * <p>The pattern is defined outside of the method to avoid instantiating the 
 * pattern every time the method is used.</p>
 *
 * @param {Object} data Attributes should be the name of the variable to be searched for
 * and value is what will be put into the template.
 * @param {String} template The template string used to format the output.
 * @return The template with each variable replaced with the corresponding value from
 * the <i>data</i> argument.
 * @type String
 */
mi.templateParser = function(data, template) {
	return template.replace(mi.templateVarPattern, function() {
			return data[arguments[1]];
		}
	)
};


/** method for parsing name/value data into name/value pairs
 *
 * @param {Object} sourceData Each attribute will be made into part of the resulting string.
 * @param {String} firstDelimiter Delimiter to be used between attributes.
 * @param {String} secondDelimiter Delimiter to be used between the name and the value.
 * @author Jamie Kirk
 * @type String
 */
mi.makeHash = function (sourceData, firstDelimiter, secondDelimiter) {
	if (sourceData && firstDelimiter && secondDelimiter) {
        	var hash = {};
        	var pairs = sourceData.split(firstDelimiter);
        	var pos; 
        	for(var i=pairs.length -1; i >= 0; i--) {
			if (typeof(pairs[i + 1]) != 'undefined') {
                		pos = pairs[i].indexOf(secondDelimiter);
                		if (pos == -1) {continue;}
                		hash[pairs[i].substring(0,pos)] = pairs[i].substring(pos+1);
                	}
        	}
        	return hash;
	}
        else {
		console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');
	}
};

/**
 * Checks for a pageInfo object in the global namespace and loads any data, that
 * doesn't already exist, into the mi.pageInfo object.
 * <p>Any objects will be cloned, not referenced, and pre-existing values will 
 * not be overwritten.</p>
 * <p> This method only officially supports one nested object, 
 * i.e. pageInfo.asset.id. A second-level nested object may be created,
 * i.e., pageInfo.asset.foo.bar; however, pageInfo.asset.foo cannot then
 * accept additional attributes, nor can pageInfo.asset.foo.bar be overwritten.</p>
 * <p>The global object is nullified after loading is complete to encourage
 * accessing data in the mi object.</p>
 */
mi.loadPageInfo = function() {
	if (window.pageInfo) {
		var pi = window.pageInfo;
		if (this.pageInfo == undefined) {
			this.pageInfo = this.cloneObject(pi);
		} else {
			for (var key in pi) {
				if (key === 'version' && ( parseFloat(pi[key]) > parseFloat(this.pageInfo.version) ) ) {
					this.pageInfo.version = pi[key];
				} else if (this.pageInfo[key] == undefined) {
					this.pageInfo[key] = this.cloneObject(pi[key]);
				} else if (typeof this.pageInfo[key] == 'object') {
					for (var key2 in pi[key]) {
						this.pageInfo[key][key2] = (this.pageInfo[key][key2]) ? this.pageInfo[key][key2] : this.cloneObject(pi[key][key2]);
					}
				}
			}
		}
	}
	window.pageInfo = null;
}

/** method for ensuring that js executes only after the document is ready
 *
 * @param {Integer} time How long (in seconds) to wait for the document to render
 * @param {String} target A JQuery-type selector
 * @param {Object} callback The function to execute when the document is ready
 * @author Scot Billman
 */
mi.wait_for_ready = function( time, target, callback ){
   var checker, time_spent = 0, interval = 3000;

   _check_document = function(){
      if( null !== $(target) ){
         clearInterval( checker );
         callback();
      } else {
         time_spent += interval/1000;
         if( time_spent >= time ){
            clearInterval( checker );
         }
      }
   };

   $(document).ready( function() {
      checker = setInterval( _check_document, interval );
   });
};

/** MI.js ^ ***************************************************************** */

/** MI_Search.js ***************************************************************
 * @fileOverview
 * App used to provide function behind search options within the standard search
 * widget.
 *
 * @minify true
 * @author Jamison Kirk (jkirk [at] mcclatchyinteractive.com)
 */


mi.Search = function() {
        mi.App.apply(this, arguments);   // makes this a sub-class of the mi.App class
        mi.getArgs();
        this.kill;
};

//  called from form onsubmit
//  uses option/radio setting to determine which URL to build and then calls the appropriate method
mi.Search.prototype.submitForm = function(searchType) {
        this.kill = "false";

        switch (this.getConf("searchSelectorType")) {
                case "option" :
                        searchType = document.miSearchForm.aff.value;
                break;
                case "radio" :
                        searchType = $('input:radio[name=aff]:checked').val();
                break;
        }

        /* Test to see what the name (q or keywords) of the search
         * query input field and use that to set searchText. 
         */
        var queryInputField;
        if (document.miSearchForm.keywords) {
                queryInputField = document.miSearchForm.keywords;
        }
        else {
                queryInputField = document.miSearchForm.q;
        }

        /*  Not all sites will contain the HTML5 'placeholder' input attribute
         *  Also, browswers that are not yet HTML5 capable don't handle the 'placeholder'
         *  value well so we must check when the user fails to enter a search term.
         */ 
        var searchText = "";
        if ($(queryInputField).attr("placeholder")) {
                if (!(queryInputField.value == $(queryInputField).attr("placeholder"))) {
                        searchText = queryInputField.value;
                }
        }
        else {
                searchText = queryInputField.value;
        }     

        
        if (searchType == parseInt(searchType)){
                return;
        }
        
        else {
                this.searchParamConfig(searchType, searchText);  //build configuration object
                this.buildForm(searchType);                              //create the form input elemnets
        }
        // if no config case present in affiliates configuration file,
        if (this.kill == "false") {
                document.miSearchForm.submit();
        }
        else {
                return false;
        }
};


//  removes current hidden input elements and adds new ones based on configuration "query_fields"
mi.Search.prototype.buildForm = function(search_type) {
        var self = this;

        // if the #searchInputContainer div contains data via innerHTML then proceed into JQuery.
        // That simple test decreases obtrusive overhead of jquery processes when unnecesary which
        // happens to be most of the time. But when the condition is met removing any unneeded input
        // elements is essential to reliable search execution.
        // The following .remove() removes hidden input elements from the page. Although the
        // #searchInputContainer div is placed only around the hidden input elements, thus only those
        // being affected by the .remove, the jquery also limits based on type="hidden" in case the
        // container div encompases other type input elements
        var searchInputContainer_div = document.getElementById("searchInputContainer").innerHTML;
        if (searchInputContainer_div) {
                $("#searchInputContainer > input[type='hidden']").each(function(){
                        $(this).remove(); //  remove input
                });
        }

        //assign site config value "post" or "get" to method attribute of form
        $("#search_widget_form").attr('method', self.getConf("form_method"));

//        if (self.getConf("form_method")) {
//                $("#search_widget_form").attr('method', self.getConf("form_method"));
//        }

        // creates input elements using getConf method from siteConfig file
        // In any case that the buildform method is executed the following jquery must be executed as
        // there are input elements to be appended. In the case that the config hasn't been properly
        // set up with params and values the error thrown will be caught.
        try{
                jQuery.each(self.getConf("query_fields"), function(paramName, paramValue) {
                        paramName = paramName.replace(/(.*)_mihyphen_(.*)/, "$1-$2");

                        $("<input type='hidden' name='" + paramName + "' value='" + paramValue + "' />").appendTo("#searchInputContainer");
                });
        }
        catch (e) {
                console.error("Script Caught Error - " + e);
        }

        document.miSearchForm.action = self.getConf("form_action");  //set action using getConf method from siteConfig file
};


// if the search results site honors the search query string we submit, this sets the option
// or radio button to the kind just searched on the search results page.
mi.Search.prototype.checkOption = function() {
        var self = this;

        if (typeof mi.args.collection != "undefined") {
                switch (self.getConf("searchSelectorType")) {
                        case "option" :
                                if (mi.args.collection == "WEB"){
                                        $("select#search_select option[value='web_search']").attr("selected", 1);
                                } else if (mi.args.collection == "ARCHIVES") {
                                        $("select#search_select option[value='archives']").attr("selected", 1);
                                } else {
                                        $("select#search_select option[value='h_archives']").attr("selected", 1);
                                }
                        break;
                        case "radio" :
                                if (mi.args.collection == "WEB"){
                                        $("#search_web").attr("checked", 1);
                                } else if (mi.args.collection == "ARCHIVES") {
                                        $("#search_archives").attr("checked", 1);
                                } else {
                                        $("#search_history").attr("checked", 1);
                                }
                        break;
                }
        }



};

// drives dropdown functionality for sites not using radio buttons nor selects
mi.Search.prototype.dropDownSelection = function(target) {

                mi.search.cache.mi_search_type = target.children('a').attr("id");

                if ( target.children('a').is('#site_search') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                else if ( target.children('a').is('#web_search') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                else if ( target.children('a').is('#archives') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                $("#search_keywords").focus();
                return false;

}


// called from each sites configuration file default case in the event that a
// radio/option type has not been configured
mi.Search.prototype.configErrorReporter = function() {

        this.kill = "true";
        alert("Option doesn't exist in your configuration. Please review your browsers error console.");
        console.error("Option doesn't exist in your configuration. Please submit a ticket to MI Support for assistance.");
        return false;
}

mi.Search.prototype.setUp = function() {
                mi.search.searchParamConfig();
                if ( !mi.search.getConf("noWebSearch") ) {
                    mi.search.getConf("mi_search_drop_down_web_search_item").show();
                    mi.search.getConf("yahoo_credit").css("visibility","visible");
                }
                mi.search.getConf("mi_search_dropdown_keys").hover(function(){mi.search.getConf("mi_search_drop_down").show();},function(){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_drop_down_link").bind("click",function(e){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_dropdown_input").focus(function(){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_selected").click(function(){mi.search.dropDownSelection($(this));return false;});
                mi.search.checkOption();
                mi.search.cache.mi_search_type=mi.search.getConf("defaultSearchType");
                var mi_search_form=document.miSearchForm;
                mi_search_form.onsubmit=function(){
                    return mi.search.submitForm(mi.search.cache.mi_search_type);
                }
}
/** MI_Search.js ^ ***************************************************************** */

// *****************************************************************************
// Function:	fetchKeywordUrlMap( 'myTargetSelector' )
// Arguments:	myKeywordUrlMap:  A string of URL to keyword mappings
//		myTargetSelector: JQuery style selector to inject keyword
//		mapping into.
// Purpose:	Based on keywords extrapolated from the current URL will compare
//		these keywords to a user generated mapping of URLs to Keywords
//		and if matched will output the URL link passed.
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchKeywordUrlMap = function( myKeywordUrlMap, myTargetSelector ){

    // If 'myKeywordUrlMap' has a trailing '++' then we need to strip this, the
    //   '++' is replaced by Template Toolkit for every line break, and having
    //   a trailing '++' means the page element had a trailing line break with
    //   no data after it
    if( myKeywordUrlMap.match( /\++$/ ) )
	myKeywordUrlMap = myKeywordUrlMap.replace( /\+*$/, '' );
	
    // This will contain all the HTML to be injected into the selector passed
    //   above after processing.
    var formattedOutput		= '';
    // All the keywords extrapolated from the current URL, urlKeyword == Array
    var urlKeywords		= this.fetch404Keywords( );
    
    // This array will house all objects of class type keywordUrlMapClass
    var keywordUrlMapObjects	= [];
    
    // Now we have to parse the Keyword -> URL mappings so we can match on the
    //   404 keywords found.
    myKeywordUrlMap 	= myKeywordUrlMap.split( '++' );
    for( var i in myKeywordUrlMap ){
	// Example Map: Link Name 1||http://www.link1.com||link1, test1, keyword
	
	// Split the current keyword / url map by '||' and create new object
	var currentKeywordUrlMap	= myKeywordUrlMap[i].split( '||' );
	// Create the object and set the name and URL
	keywordUrlMapObjects[i]	= new this.keywordUrlMapClass( currentKeywordUrlMap[0], currentKeywordUrlMap[1] );
	
	// Now split the 3rd( [2] ) part of data by ',' and add to list of
	//   keywords for this object
	var currentKeywords		= currentKeywordUrlMap[2].split( ',' );
	for( var x in currentKeywords ){
	    keywordUrlMapObjects[i].addKeyword( currentKeywords[x] );
	}
    }
    
    
    // Finally loop through all the 404 keywords extrapolated, and call the
    //   keywordUrlMapClass objects 'matchKeyword' method to see if any of the
    //   objects keywords match the 404 keyword
    for( var i in urlKeywords ){	
	for( var x in keywordUrlMapObjects ){
	    if( keywordUrlMapObjects[x].matchKeyword( urlKeywords[i] ) ){
		// Then add the output code
		formattedOutput += "\
		    <li><a href='" + keywordUrlMapObjects[x].url + "'>" +
			    keywordUrlMapObjects[x].name + "</a>\
		    </li>";
	    }
	}
    }
    
    // Output the final HTML to the page
    $( myTargetSelector ).append( formattedOutput );
    
    
}

/**
 * Construct a keywordUrlMapClass
 * @class Basic class to house keyword to url mappings, and any helper methods
 * needed.
 * @constructor
 * @param {String} myName The human readable link name, used for innerHTML of
 * the anchor when outputting to the user.
 * @param {String} myUrl The actual href URL for the anchor
 * @return A new keywordUrlMapClass
 */
mi.Search.prototype.keywordUrlMapClass = function( myName, myUrl){
    this.name		= myName;		// Name of link to display
    this.url		= myUrl;		// Actual URL
    this.keywords	= [];			// An array of keywords match
    this.matchedKeyword = false;		// This is set to true when we
						// match a keyword to prevent dups
        
    
     /**
    * Adds a new keyword to the Array 'keywords' for the current instance of
    * this object, also lowercases the keyword
    * @type String
    */
    this.addKeyword 	= function( myKeyword ){
	this.keywords.push( myKeyword.toLowerCase() );
    }
    
    /**
     * Given a passed keyword, see if it matches any keywords in this object,
     * if so then return true, and set that object as matchedKeyword == true
     * to prevent duplicate outputs
     * @type String
     * @return 'true' if match found, 'false' otherwise
    */
    this.matchKeyword 	= function( myKeyword ){
	
	if( ( !this.matchedKeyword ) && ( this.getKeywords().match( myKeyword ) ) ){
		this.matchedKeyword 	= true;
		return( true );
	}
	return( false );
    }
    
    /**
     * Will return a list of this objects instance keywords, in comma delimited
     * format.
     * @return String of comma delimited keywords
     */
    this.getKeywords 	= function( ){
	
	return( this.keywords.join( ', ' ) );
    }
    
}
// *****************************************************************************


// *****************************************************************************
// Function:	fetchSearchResults( 'myTargetSelector' )
// Arguments:	myTargetSelector: JQuery style selector to inject SOLR results in
// Purpose:	Based on keywords extrapolated from the current URL, will inject
// 		SOLR search results into the passed JQuery selector
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchSearchResults = function( myTargetSelector ){
    
    // 'keywordList' is a space separated list of keywords found in the URL
    var keywordList 	= '';
    
    // Get the URL and send to function to get keywords, will return an array
    //   of keywords.
    var keywords 		= this.fetch404Keywords( );
    
    // Here we loop through the keywords, and assemble into a space separated
    //   string that SOLR can parse
    for( var i in keywords ){
	keywordList += ' ' + keywords[i];
    }
    
    // Now inject the search results into the passed selector
    $( myTargetSelector ).load( '/search/ #search', { q: keywordList } );

}
// *****************************************************************************


// *****************************************************************************
// Function:	fetch404Keywords( )
// Purpose:	Will parse for all words between forward slashes after the
// 		domain name and return this list of words as an array
// Return:	An array of keywords found in the url after the domain name
// *****************************************************************************
mi.Search.prototype.fetch404Keywords = function( ){
    
    // This will be the array that holds the unedited version of all 404 keywords
    var keywordsArray 		= [];
    // This will be the array returned by this function containing all keywords
    //   after filtering out the 'bad' keywords as defined by the regex below
    var returnKeywordsList 	= [];
    
    // Get the list of 404 keywords from the current URL
    keywordsArray = window.location.pathname.toLowerCase().slice(1).split('/');
    
    // Go through all the keywords and filter out for 'invalid' keywords
    //   based on the regex in the loop.
    for( var x in keywordsArray ){	

	// If the current keyword doesn't match the regex then assign on the
	//   returned keyword array
	if(  ( keywordsArray[x].match( /story/ ) ) || ( keywordsArray[x].match( /[0-9]+/ ) ) ){
	    //console.log( 'INVALID KEYWORD FOUND: ' + keywordsArray[x] );
	} else {
	    //console.log( 'VALID KEYWORD FOUND: ' + keywordsArray[x] ); 
	    returnKeywordsList.push( keywordsArray[x] );
	}
    }
	
    return( returnKeywordsList );

}

/**
 * @fileOverview
 * This is the configuration file for the affiliate. Making changes to this file could result in
 * breaking your search. If you have any questions please submit a ticket via the Support Portal.
 *
 * When hyphens (-) are used in URL query params, the string "_mihyphen_" is used in place of an
 * actual hyphen (-) in the object property names below. Hyphens can't be used in object property
 * names.
 *
 *
 *
 * @minify true
 * @author Jamison Kirk (jkirk [at] mcclatchyinteractive.com)
 */


mi.Search.prototype.searchParamConfig = function(search_type, search_text) {

        this.setConf("searchSelectorType","");

        this.setConf("defaultSearchType","site_search");
        this.setConf("mi_search_dropdown_keys",$("form#search_widget_form div.arrow, form#search_widget_form ul, form#search_widget_form div.icon, form#search_widget_form input#search_keywords"));
        this.setConf("mi_search_drop_down",$("form#search_widget_form ul"));
        this.setConf("mi_search_drop_down_link",$("form#search_widget_form ul.search_widget_choice li a"));
        this.setConf("mi_search_dropdown_input",$("#search_keywords"));
        this.setConf("mi_search_widget_icon",$("#search_widget_form div.icon img"));
        this.setConf("mi_search_selected",$("#search_widget_choice li"));
        this.setConf("mi_search_drop_down_web_search_item",$("#search_widget_web_search_choice"));
        this.setConf("yahoo_credit",$("p.yahoo_credit"));

        if (search_type) {
                switch (search_type) {
                        case "site_search":
                                this.setConf("form_action","http://www.adn.com/search_results?");
                        break;
                        case "web_search":
                                this.setConf("form_action","http://www.adn.com/web_search?");
                                this.setConf("query_fields",{sf_Keywords:search_text,
                                                                product:"Yahoo,Overture",
                                                                collection:"WEB",
                                                                live_template:"http://www.adn.com/searchresults/v-ysr/index.html",
                                                                error_template:"http://www.adn.com/searchresults/v-yerr/index.html",
                                                                preview_template:"http://preview.adn.com/searchresults/v-ysr/index.html",
                                                                results_per_page:"10",
                                                                preview:"0",
                                                                prop_related:"1",
                                                                prop_dym:"1"}
                                                );
                        break;
                        case "archives":
                                this.setConf("form_action","http://www.newslibrary.com/nlsearch.asp?");
                                this.setConf("query_fields",{search_mode:"all",
                                                                date_mode:"year",
                                                                year:"last+180+days",
                                                                sort:"d%3Ah",
                                                                nitems:"10",
                                                                region:"AS",
                                                                dbquery:search_text,
                                                                collection:"ARCHIVES"}                                                                                                                   
                                                );                                                                                                                                                       
                        break;
                        default:
                                this.configErrorReporter();
                }
        }
};
/** MI.js **********************************************************************
 * @fileoverview Inclusion of this library creates an MI object within a
 * variable named <tt>mi</tt>. The MI object is intended to namespace
 * functionality developed by McClatchy Interactive. Because the MI object is
 * self-instantiating there is no constructor per se, and there should be no
 * reason to try to create any additional copies/instances, it is a generic
 * object.
 *
 * <p><strong>window.console</strong><br>In addition to automatically creating
 * the <tt>mi</tt> variable this library also will create a
 * <tt>window.console</tt> object in browsers that don't already have one. The
 * window.console object is then provided with Firebug-like methods if they do
 * not already exist. At the very least this allows you to use
 * <tt>console.log()</tt> in your code without the fear of throwing errors in
 * browsers that don't support it. <em>Note:</em> Safari natively supports
 * console.log, but not (m)any of the other Firebug console methods. With Safari
 * and Firefox/Firebug output from console methods can be viewed in the
 * browser's console window. In browsers without a console window the console's
 * log can be accessed via an alert window at page load if the page is loaded
 * with the query string <em>?viewlog=1</em>. Currently all supported Firebug
 * methods are basically aliases for the log, though the log will report what
 * method was used. Future updates may provide additional features with these
 * methods to make them more Firebug-like.</p>
 *
 * <p><strong>Extending the MI object</strong><br>
 * The MI object is an evolving piece of code and extending its functionality is
 * encouraged. However, we do ask that you follow these guidelines.</p>
 * <ul>
 * 	<li><strong>Document your code -</strong> This was specifically chosen as 
 * 		the first item. The more the better. With the aggregator's ability to strip 
 * 		comments don't be shy about putting too much documentation into your code. 
 * 		For the win, write your documentation in the format used by JSDoc so that 
 * 		your documentation can be parsed. See this file as an example. Inclusion of 
 * 		the <tt>&#64;minify true</tt> flag will allow your code to be minified, thus 
 * 		stripping whitespace and comments from code used on live sites.</li>
 * 	<li><strong>More, smaller files -</strong> Your code should be included on
 * 		pages via aggregation, so there's no need to write huge library files that
 * 		contain the kitchen sink. Organize your code into files of related 
 * 		functionality.</li>
 * 	<li><strong>Consolidate features into apps -</strong> The MI object provides
 * 		the <tt>mi.App</tt> class that facilitates easy creation of applications
 * 		for specific features.</li>
 * 	<li><strong>Stick to naming conventions -</strong>
 * 		<ul>
 * 			<li>CamelCase constructors with an initial cap</li>
 * 			<li>Start private method and variable names with an underscore</li>
 * 			<li>File names should imply scope, separated by underscores. For example
 * 			<tt>MI_Search.js</tt>.</li>
 * 		</ul>
 * 	</li>
 * 	<li><strong>Overwrite similar functionality -</strong> There's no need to 
 * 		have multiple apps or methods that do similar tasks. Instead overwrite the
 * 		existing feature with your new version. Even better, make your new version
 * 		accept input and produce output the same as the old version, but with 
 * 		additional options to facilitate your new behavior. This will preserve 
 * 		backward compatability.</li>
 * 	<li><strong>Contain dependencies -</strong> Don't rely on, or trust in 
 * 		global variables. Either pass values in during execution, or make them
 * 		configurable options.</li>
 * 	<li><strong>Generalize -</strong> Any code within the MI object should be 
 * 		considered general in that it could be utilized on any site. No 
 * 		site-specific code. Any site-specific values should be configuration 
 * 		options.</li>
 * 	<li><strong>Exit gracefully -</strong> With the console now available on all
 * 		browsers there's little or no need to use <tt>alert()</tt> and fear users
 * 		getting messages meant for developers. Test for dependencies and exit if
 * 		they don't meet your requirements after outputting a message to the 
 * 		console.</li>
 * </ul>
 * 
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @namespace mi
 * @aggpath js/MI.js
 */

var mi = (typeof mi == 'undefined') ? {'media_domain':''} : mi;
if (window.miAppControler) {
	mi.control = new miAppControler();
}



/** This method parses name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object.
 * @author Adapted from "Javascript: The Definitive Guide" by David Flanagan
 */
mi.getArgs = function() {
        if (typeof mi.args == 'undefined') {
	        mi.args = {};
	        var query = location.search.substring(1);
	        var pairs = query.split('&');
	        for(var i=pairs.length -1; i >= 0; i--) {
		        var pos = pairs[i].indexOf('=');
		        if (pos == -1) {continue;}
		        mi.args[pairs[i].substring(0,pos)] = unescape(pairs[i].substring(pos+1));
	        }
        }
        return mi.args;
};


/** A stand-in for console.log() for browsers without the functionality
 * The logged message is stored for later retreival. This function gets set as
 * console.log by mi.fixConsole if needed. Each logged message is separated by 
 * a line of hyphens.
 * @private
 */
mi._console = function(s) {
	mi._console.log = (mi._console.log && mi._console.log.length > 0) ? mi._console.log + '\n---------------------------------------------------\n' + s : s;
};



/** Use console methods even in browsers without a console.
 * Defines a console object in browsers that lack one and then populates the
 * console with any missing methods from a list based on those used by Firebug.
 * Any methods created in this manner act effectively as a self-identifying
 * alias for console.log.
 *
 * <p>This method is automatically executed as the code is loaded. With this
 * in place developers can make use of console methods without worrying about
 * causing errors on browsers with no console. This makes troubleshooting during
 * development easier, as well as allowing standing error reporting features to
 * be utilized even on live pages.</p>
 *
 * This method is based on Pluck's NYX object method of the same name.
 */
mi.fixConsole = function() {
	if (typeof window.console != "object") { window.console = {}; }
	if (window.console.is_fixed) {/*already fixed*/}
	else {
		// list of firebug method names, "log" should always be first
		// this list is used to create "stand-in" methods for the console object if needed
		var firebugMethods = ["log","debug","info","warn","error","assert","dir","dirxml",
			"trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];
		var methodCount = firebugMethods.length;
		var args = mi.getArgs();
		var view = (args.viewlog && args.viewlog == '1');
		for (var i = 0; i < methodCount; i++) {
			var methodName = firebugMethods[i];
			if (typeof window.console[methodName] != "function") {
				switch (methodName) {
					// Firebug console methods can be replicated here by adding cases
					case 'log':
						if (view) {
							window.console.log = mi._console;
							if (window.addEventListener) {
								window.addEventListener("load", function(){alert(mi._console.log);}, false);
							} else if (window.attachEvent) {
								window.attachEvent("onload", function(){alert(mi._console.log);});
							}
						} else {
							window.console.log = function(){};
						}
						break;
					default:
						eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase() + ": '+ s)};");
				}
			}
		}
	}
	//add our tracking flag
	window.console.is_fixed = true;
};
mi.fixConsole();

/** handy method/constructor for cloning objects
 * by default, setting a variable equal to a pre-existing object just creates
 * a reference to the original, this allows you to create an independant copy
 * of the original with no back-reference
 * @param {Object} sourceObj The object to be cloned.
 * @return A copy of the source object, <b>not</b> a reference to the original
 * @type Object
 */
mi.cloneObject = function(sourceObj) {
	if (sourceObj == null || typeof sourceObj != 'object') {
		return sourceObj;
	}
	var temp = new sourceObj.constructor();
	for (var key in sourceObj) {
			temp[key] = mi.cloneObject(sourceObj[key]);
	}
	return temp;
};


/** A constructor for applications that come pre-loaded with useful features.
 *
 * <p>Application objects come with features that facilitate the management of
 * configuration values with a system of methods used to make setting and 
 * accessing configuration values easily while protecting those settings from 
 * accidental or malevolent corruption.</p>
 * <h2>Creating your App</h2>
 * <p>In order to properly inherit all of the private properties that keep your 
 * configuration settings safe you need to use a somewhat non-traditional manner 
 * to instantiate your App. Instead of creating an instance of mi.App you 
 * instead create a constuctor for your App and inherit from the mi.App "class",
 * making your constructor a sub-class of mi.App.</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
}</pre>
 * <h2>Enforcing config values</h2>
 * <p>With the only way to set configuration values being via the 
 * {@link #setConf} method you have the ability to define rules around what 
 * kinds of values are acceptable per configurable option. This is accomplished 
 * by defining a method named <tt>_manageConf</tt> specifically to
 * apply your rules. It is up to you to develop the enforcement of your rules. 
 * Here's an example:</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
  this._manageConf = function(prop, val) {  
    switch (prop) {
      case 'gender':          // each case is based on the name of the configurable option
        if (
          val != 'male' ||
          val != 'female' ||
          val != 'unknown'
        ) {
          val = 'unknown';
        }
      break;
    }
    return val;
  };
}</pre>
 * <p>This example only enforces the setting of the <i>gender</i> configuration,
 * with three possible values. If an unacceptable value is passed the config 
 * gets set to an acceptable default value. Set up a case for each configuration
 * that needs enforcement. In any case, your method needs to accept two variables,
 * the name of the config and the value, and must return the value to be used.</p>
 * @constructor
 */
mi.App = function() {
	var _configs = {};
	/**
	 * Stand in method to be used for managing configuration values. By default
	 * this method does not do anything. Individual apps have the option to overwrite
	 * this method with their own functionality.
	 * @private
	 */
	this._manageConf = function(prop, val) { return val; };
	/**
	 * Set configuration values in the app.
	 * <p>Configurations may be loaded in one of two ways:</p>
	 * <ol><li>Individually: Pass two arguments, the first being the name of the
	 * configuration value and the second being the value, or</li>
	 * <li>Batch: Pass an object with attributes named after the config name and
	 * their values being the desired config setting.</li></ol>
	 * <p>Actually, you can also use these two means of configuring your app when
	 * you instantiate it by passing arguments to the constructor.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.yourApp1 &#61; new mi.YourApp('gender','male');
mi.yourApp2 &#61; new mi.YourApp({'gender':'unknown','name':'Pat'});</pre>
	 * <p>If you have multiple configurations to set at one time, passing an object
	 * is probably the most efficient means of getting them set.</p>
	 * @param {Object} confs A generic object containing one or more attributes
	 * that will be used to create the configuration(s), or
	 * @param {String} name The name of the configuration value to be set, this
	 * should be a string value, and
	 * @param value The value to be used.
	 */
	this.setConf = function() {
		switch (arguments.length) {
			case 1:
				for (var prop in arguments[0]) {
					_configs[prop] = this._manageConf(prop, arguments[0][prop]);
				}
				break;
			case 2:
				_configs[arguments[0]] = this._manageConf(arguments[0],arguments[1]);
				break;
			default:
				console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');
		}
	};
	/**
	 * Retreive a configuration value from the app.
	 *
	 * <p>Any configuration value can be retrieved using this method. Simply pass
	 * the name of the config setting as the one argument. The value of the 
	 * setting is returned.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.example.setConf('name','Fred');
name &#61; mi.example.getConf('name');	//name is now equal to "Fred"</pre>
	 * @param {String} prop The configuration setting name you want returned; a string.
	 * @return The value associated with the named setting.
	 */
	this.getConf = function(prop) {
		return _configs[prop];
	};
	/**
	 * Outputs all configuration settings to the console.
	 *
	 * A convenience method for troubleshooting. Calling this method will output
	 * the name and value of each configuration setting in the app.
	 */
	this.viewConfs = function() {
		console.dir(_configs);
	};
	/**
	 * Object used for storing temporary values.
	 *
	 * <p>Rather than littering your app with variables used by the app's methods
	 * this object is provided as a bucket for storing those values. There are no
	 * controls around what can be set in this object. Basically it's an 
	 * unprotected bucket, so values shouldn't necessarily be trusted, test them
	 * before relying on them.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.exampleApp.cache.foo = "bar";</pre>
	 */
	this.cache = {};
	/* pass any arguments on to setConf() to configure the app as it's instantiated
	 */
	switch (arguments.length) {
		case 1:
			this.setConf(arguments[0]);
			break;
		case 2:
			this.setConf(arguments[0], arguments[1]);
			break;
	}
};


/** A Method for discovering the object/node that kicked off the current event.
 *
 * <p>This can be a very handy method to make determining what element kicked
 * off an even a snap. It can also be frustrating without proper documentation.
 * Basically, when called correctly this will return the source element of the
 * current event.</p>
 * <b>Usage Example:</b><br>
 * <pre>jQuery(window).click(function(e){
	console.log(mi.getEventSrc(e));
});</pre>
 * <p>In this case the object that was clicked on will be output to the console.
 * Due to event bubbling it is the object clicked, not the object with the
 * listener that is reported. That's what makes this so useful. So if in this
 * example you clicked on a paragraph object it would be that paragraph that
 * would be returned not the window object.</p>
 * <p><i>Note:</i> it is key that an argument representing the event object is 
 * passed to the handler for browsers that do not support IE's <tt>window.event</tt>
 * object.</p>
 */
mi.getEventSrc = function (e) {
	if (!e) {e = window.event;}
	if (e.target) {
		return e.target;
	} else if (e.srcElement) {
		return e.srcElement;
	}
};


/**
 * Pattern used by {@link #templateParser} to find variables.
 * @type RegEx
 */
mi.templateVarPattern = /\@([^\@]+)\@/g;
/** method for parsing a template and replacing a pattern with the equivalent
 * attributes from an object
 *
 * <pre>var data object to get values from
 *var template string containing placeholders</pre>
 *
 * <p>Placeholders in the template should be given the name of the attribute to be 
 * used as the substitute surrounded by "@" symbols, i.e. @name@</p>
 *
 * <p>The pattern is defined outside of the method to avoid instantiating the 
 * pattern every time the method is used.</p>
 *
 * @param {Object} data Attributes should be the name of the variable to be searched for
 * and value is what will be put into the template.
 * @param {String} template The template string used to format the output.
 * @return The template with each variable replaced with the corresponding value from
 * the <i>data</i> argument.
 * @type String
 */
mi.templateParser = function(data, template) {
	return template.replace(mi.templateVarPattern, function() {
			return data[arguments[1]];
		}
	)
};


/** method for parsing name/value data into name/value pairs
 *
 * @param {Object} sourceData Each attribute will be made into part of the resulting string.
 * @param {String} firstDelimiter Delimiter to be used between attributes.
 * @param {String} secondDelimiter Delimiter to be used between the name and the value.
 * @author Jamie Kirk
 * @type String
 */
mi.makeHash = function (sourceData, firstDelimiter, secondDelimiter) {
	if (sourceData && firstDelimiter && secondDelimiter) {
        	var hash = {};
        	var pairs = sourceData.split(firstDelimiter);
        	var pos; 
        	for(var i=pairs.length -1; i >= 0; i--) {
			if (typeof(pairs[i + 1]) != 'undefined') {
                		pos = pairs[i].indexOf(secondDelimiter);
                		if (pos == -1) {continue;}
                		hash[pairs[i].substring(0,pos)] = pairs[i].substring(pos+1);
                	}
        	}
        	return hash;
	}
        else {
		console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');
	}
};

/**
 * Checks for a pageInfo object in the global namespace and loads any data, that
 * doesn't already exist, into the mi.pageInfo object.
 * <p>Any objects will be cloned, not referenced, and pre-existing values will 
 * not be overwritten.</p>
 * <p> This method only officially supports one nested object, 
 * i.e. pageInfo.asset.id. A second-level nested object may be created,
 * i.e., pageInfo.asset.foo.bar; however, pageInfo.asset.foo cannot then
 * accept additional attributes, nor can pageInfo.asset.foo.bar be overwritten.</p>
 * <p>The global object is nullified after loading is complete to encourage
 * accessing data in the mi object.</p>
 */
mi.loadPageInfo = function() {
	if (window.pageInfo) {
		var pi = window.pageInfo;
		if (this.pageInfo == undefined) {
			this.pageInfo = this.cloneObject(pi);
		} else {
			for (var key in pi) {
				if (key === 'version' && ( parseFloat(pi[key]) > parseFloat(this.pageInfo.version) ) ) {
					this.pageInfo.version = pi[key];
				} else if (this.pageInfo[key] == undefined) {
					this.pageInfo[key] = this.cloneObject(pi[key]);
				} else if (typeof this.pageInfo[key] == 'object') {
					for (var key2 in pi[key]) {
						this.pageInfo[key][key2] = (this.pageInfo[key][key2]) ? this.pageInfo[key][key2] : this.cloneObject(pi[key][key2]);
					}
				}
			}
		}
	}
	window.pageInfo = null;
}

/** method for ensuring that js executes only after the document is ready
 *
 * @param {Integer} time How long (in seconds) to wait for the document to render
 * @param {String} target A JQuery-type selector
 * @param {Object} callback The function to execute when the document is ready
 * @author Scot Billman
 */
mi.wait_for_ready = function( time, target, callback ){
   var checker, time_spent = 0, interval = 3000;

   _check_document = function(){
      if( null !== $(target) ){
         clearInterval( checker );
         callback();
      } else {
         time_spent += interval/1000;
         if( time_spent >= time ){
            clearInterval( checker );
         }
      }
   };

   $(document).ready( function() {
      checker = setInterval( _check_document, interval );
   });
};

/** MI.js ^ ***************************************************************** */

/** MI_Cookie.js ****************************************************************
 * @fileoverview Class for managing cookies. This class allows you to interact with cookies
 * as an object with each named value represented as a property of the object.
 * This class will store multiple name/value pairs in a single cookie, reducing 
 * the number of cookies needed. Browsers may enforce limits to the number of 
 * individual cookies stored, so bundling values up in a single cookie is a good
 * idea. New cookies should be used if there's a difference in access rights, or
 * a cookie is getting too big, 4k of data is generally the limit.
 * @minify true
 * @author Joe Whetzel
 * @aggpath js/MI_Cookie.js
 *************************************************************************** */
 var mi = (!mi) ? {'media_domain':''} : mi;
 
/** Cookie object constructor. This constructor creates the javascript object, it
 * does not create the browser cookie, use {@link #store} to store the cookie in 
 * the browser.
 * @param document the Document object for which the cookie is stored
 * @param {String} name string that specifies a name for the cookie, defaults to "cookie"
 * @param {Integer} minutes how long until the cookie expires, defaults to current session
 * @param {String} path the path with which the cookie is associated, defaults to current page
 * @param {String} domain domain the cookie is associated to
 * @param {Boolean} secure whether or not the cookie is secure, only if the connection is secure
 * @constructor
 */
mi.Cookie = function (document, name, minutes, path, domain, secure) {
	/** Document object for which the cookie is stored. Default is to use the current document. */
	this.$document = (document) ? document : window.document;
	/** Name of the cookie. Defaults to "cookie".
	 * @type Document
	 */
	this.$name = (name) ? name : 'cookie';
	/** Minutes until the cookie expires. Default is at the end of the current session.
	 * @type Integer
	 */
	this.$expiration = (minutes) ? new Date((new Date()).getTime() + minutes * 60000) : null;
	/** Path associated with the cookie.
	 * @type String
	 */
	this.$path = (path) ? path : null;
	/** Domain associated with the cookie.
	 * @type String
	 */
	this.$domain = (domain) ? domain : null;
	/** Whether or not the cookie is secure.
	 * @type Boolean
	 */
	this.$secure = (secure) ? true : false;
};

/** Stores the cookie in the browser. Defining or changing values in the cookie
 * object alone does not save the values to the browser. After working with the
 * cookie object it must be stored in the browser.
 */
mi.Cookie.prototype.store = function() {
	var cookieVal = "";
	for(var prop in this) {
		if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) {
			continue;
		}
		if (cookieVal !== "") {
			cookieVal += '&';
		}
		cookieVal += prop + ':' + escape(this[prop]);
	}
	var cookie = this.$name + '=' + cookieVal;
	cookie += (this.$expiration) ? '; expires=' + this.$expiration.toGMTString() : '';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += (this.$secure) ? '; secure' : '';
	this.$document.cookie = cookie;
};

/** Loads a single cookie from the browser into the cookie object, making each 
 * name/value pair properties of the object.
 * @type Boolean
 */
mi.Cookie.prototype.load = function() {
	var allCookies = this.$document.cookie;
	if (allCookies === "") {
		return false;
	}
	var start = allCookies.indexOf(this.$name + '=');
	if (start == -1) {
		return false;
	}
	start += this.$name.length + 1;
	var end = allCookies.indexOf(';', start);
	if (end == -1) {
		end = allCookies.length;
	}
	var cookieVal = allCookies.substring(start, end);
	var a = cookieVal.split('&');
	if ((a.length == 1) && (a[0].indexOf(':') == -1)) {
		var prop = this.$name;
		this[prop] = unescape(cookieVal.replace(/\+/g, '%20')); // PHP encodes spaces with a '+'
		return true;
	}
	for(var i=0; i < a.length; i++) {
		a[i] = a[i].split(':');
	}
	for(i=0; i < a.length; i++) {
		this[a[i][0]] = unescape(a[i][1]);
	}
	return true;
};

/** Method for removing the entire cookie from the browser.
 */
mi.Cookie.prototype.remove = function() {
	var cookie = this.$name + '=';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	this.$document.cookie = cookie;
};



/* MI_Cookie.js ^ *********************************************************** */
// $Id: MI_Commenting.js 1603 2011-03-24 20:29:00Z bjones $
/** MI_Commenting.js ***************************************************************
 * @fileOverview
 * A generic class for managing commenting functionality. This app should be
 * extended with an backend-specific extension.
 *
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @aggpath commenting/js/MI_Commenting.js
 */

/**
 * Commenting app constructor. This app functions as a generalized API for 
 * commenting functionality, a backend-specific extension is required.
 *
 * <p>All that is required to implement commenting on a page is:</p>
 * <ol>
 *   <li>A target div, default is to look for a div with an id of "commentingStage",</li>
 *   <li>Instantiate the commenting app, and</li>
 *   <li>Call the commenting app's display method.</li>
 * </ol>
 * <pre><div id='commentingStage'></div>
<script>
	mi.commenting = new mi.Commenting();
	mi.commenting.display();
</script></pre>
 *
 * <h3>Configuration options</h3>
 * <dl>
 *   <dt>accountName</dt>
 *   <dd>Name used by the backend to identify the site, default is derived from 
 *     the domain.</dd>
 *   <dt>enabled</dt>
 *   <dd>Integer value to enable/disable commenting, default is enabled.<br>
 *     0 = fully disabled<br>
 *     1 = fully enabled<br>
 *     2 = disable comment submission & display<br>
 *     3 = enable comment submission & display only<br>
 *     4 = disable popular threads widget<br>
 *   </dd>
 *   <dt>target</dt>
 *   <dd>Id value of the target element on the page in which the commenting 
 *     features are inserted, default is "commentingStage".</dd>
 * </dl>
 *
 * @constructor
 */
mi.Commenting = function() {
  mi.App.apply(this, arguments);
/**
 * @private
 */
   this._manageConf = function(prop, val) {
    switch (prop) {
      case 'enabled':
        var v = parseInt(val);
        if (isNaN(v)) {
					val = (val.toLowerCase) ? val.toLowerCase() : val;
        	switch (val) {
						case true:
						case 'true':
						case 'yes':
						case 'on':
							v = 1;
							break;
						default:
							v = 0;
							break;
        	}
        }
        val = v;
			default:
				break;
    }
    return val;
  };
  // without the ability to disable commenting globally commenting will default to disabled
  if (mi.control && mi.control.commenting != undefined) {
		this.setConf('enabled',mi.control.commenting);
  } else {
  	this.setConf('enabled',0);
  	console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');
  }
  mi.loadPageInfo();
  // account name is based on the domain, i.e. for www.mireference.com the account name is "mireference"
  var splitHost = window.location.host.split('.');
	this.setConf('accountName',splitHost[splitHost.length - 2]);
	this.setConf('target','commentingStage');
	this.finish();
};

/**
 * Hook used to add a process to the end of the constructor.
 *
 * <p>This is called by default, but out of the box  doesn't contain any functionality. Overwrite this method if you want to add your own functionality.</p>
 */
mi.Commenting.prototype.finish = function() {};

/**
 * Calling this method will add commenting features to the page.
 *
 * <p>For commenting to be successfully added the page must have a target element
 * present on the page.</p>
 */
mi.Commenting.prototype.display = function() {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('display commenting');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 2 ) {
		this._renderCommenting();
	} else {
		console.info('Submission and display of comments has been disabled.');
	}
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('display commenting');}
};

mi.Commenting.prototype.displayPopular = function(count) {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 3 && e !== 4 ) {
		this._displayPopular(count);
	} else {
		console.info('The popular comment threads widget has been disabled.');
	}
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}
};

mi.Commenting.prototype.displayCommentCount = function() {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('comment count');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 2 ) {
		this._displayCommentCount();
  } else {
		console.info('Submission and display of comments has been disabled.');
  }
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('comment count');}
}

/** ^ MI_Commenting.js ****************************************************** */
// $Id: MI_Commenting_Disqus.js 3007 2012-08-01 18:26:24Z scowles $
/** MI_Commenting_Disqus.js ****************************************************
 * @fileOverview
 * This is an extension to MI_Commenting.js that enables commenting via Disqus.
 *
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @aggpath commenting/js/MI_Commenting_Disqus.js
 */

mi.Commenting.prototype.extended = true;

/** Required to resolve some IE scoping issues.
*/
var disqus_identifier, disqus_shortname, disqus_remote_auth_s2, disqus_title;

/**
 * facebookXdReceiverPath used to prevent a conflict between Disqus and Facebook
 * Connect that can cause analytics issues. The variable will be defined when
 * Disqus commenting is instantiated. We define it here to avoid IE problems
 * declaring variables in the window after the page has loaded.
 */
if (typeof facebookXdReceiverPath == "undefined") {
	var facebookXdReceiverPath;
}

/**
 * Method that handles any of the Disqus specific processes required in adding
 * commenting features to a page. Both the input form and comments are included.
 *
 * <p>This method should not be called directly, instead it is called via the
   mi.Commenting.display method.</p>
 *
 * @private
 */

mi.Commenting.prototype._displayCommentingDisqus = function() {
	// global variables used by Disqus
	window.disqus_identifier = this.getThreadId();	// identifies thread
	var cookie = new mi.Cookie(document, 'disqus');
	if(cookie.load()){
		window.disqus_remote_auth_s2 = cookie.disqus;	// single sign on, original disqus
	}
	window.disqus_title = mi.pageInfo.asset.title;

	if (window.disqus_identifier != undefined) {
		var target = document.getElementById(this.getConf('target'));

		// since a Disqus-specific element is targeted we'll handle creating and adding it to the configured target
		var thread = document.createElement('div');
		thread.id = 'disqus_thread';
		target.appendChild(thread);

		// add the call to Disqus' script
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = 'http://'+ this.getConf('accountName') +'.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

                /* replace the disqus logout link if needed */
                //mi.wait_for_ready( 15, this.getConf( 'selectorTarget' ), this.linkReplace() );
	} else {
		console.error('Commenting could not be loaded because there was no defined thread id.');
	}
};
// a non-vendor-specific method name is used so that vendors can be changed
// vendor-specific names used in extensions so that multiple vendors can be present
mi.Commenting.prototype._renderCommenting = mi.Commenting.prototype._displayCommentingDisqus;
/**
 * Writes the Disqus Popular Threads widget. WARNING: makes use of document.write().
 * @private
 */
mi.Commenting.prototype._displayPopularDisqus = function(count) {
	count = (isNaN(count)) ? this.getConf('discoveryCount') : count;
	if (isNaN(count)) {
		count = 0;
	}
	count = (count > 0 && count < 21) ? Math.floor(count) : 5;
	document.write('<script type="text/javascript" src="http://disqus.com/forums/' + this.getConf('accountName') + '/popular_threads_widget.js?num_items='+ count +'"></script>');
};
mi.Commenting.prototype._displayPopular = mi.Commenting.prototype._displayPopularDisqus;
/**
 * Writes the number of comments to a specified a tag. WARNING: makes use of document.write().
 * @private
 */
mi.Commenting.prototype._displayCommentCountDisqus = function() {
	window.disqus_identifier = this.getThreadId();	// identifies thread
	window.disqus_shortname = this.getConf('accountName');	// identifies site
  document.getElementById('commentCount').href = document.getElementById('commentCount').href + '#disqus_thread';
  document.getElementById('commentCount').setAttribute('data-disqus-identifier', this.getThreadId());

  var s = document.createElement('script'); s.async = true;
  s.src = 'http://disqus.com/forums/' + this.getConf('accountName') + '/count.js';
  (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
};
mi.Commenting.prototype._displayCommentCount = mi.Commenting.prototype._displayCommentCountDisqus;
/**
 * Method used to construct the id used to uniquely identify threads for an asset.
 */
mi.Commenting.prototype.getThreadId = function() {
	return (mi.pageInfo && mi.pageInfo.asset && mi.pageInfo.asset.id) ? mi.pageInfo.asset.id : undefined;
};

/**
 *  Method to replace the Disqus comment widget logout link
 *  with the InSite logout link. The 'target' and 'source' are
 *  JQuery selectors. The 'target' is delivered by Disqus,
 *  it should always be that value. The 'source' may have a
 *  different value if there is a non-standard install.
 */
//mi.Commenting.prototype.linkReplace = function() {
//   var obj = this;
//
//   return( function(){
//      if( !obj.getConf( 'selectorTarget' ) ){
//         obj.setConf( 'selectorTarget', '.dsq-request-user-logout' );
//      }
//      if( !obj.getConf( 'selectorSource' ) ){
//         obj.setConf( 'selectorSource', '#pluckLogOut' );
//      }
//      var target = $( obj.getConf( 'selectorTarget' ) );
//      var source = $( obj.getConf( 'selectorSource' ) );
//      if ( null !== source && null !== target && 'Guest' !== account_user_name ){
//         var s = source.clone( 1 );
//         s.attr( 'class', target.attr( 'class' ) );
//         target.replaceWith( s );
//      }
//   });
//};

/**
 * Overwrites the Commenting app's default, empty finish method.
 * 
 * <p>This is being used to set the facebookXdReceiverPath variable to avoid
   Facebook Connect conflicts with Disqus.</p>
 */
mi.Commenting.prototype.finish = function() {
	window.facebookXdReceiverPath = '/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';
}

/**
 * Redefine the disqus_config for disqus 2012.
 * 
 * <p>This is being used to reset the disqus_config function to add parameters for this.page.remote_auth_s3 and this.page.api_key</p>
 */
mi.Commenting.prototype.reset_disqus_config = function(disqus_cookie_val,public_api_key) {
	var mi_disqus_config = new disqus_config();
	var sso_name = mi_disqus_config.sso.name.toString(); 
	var sso_button = mi_disqus_config.sso.button.toString(); 
	var sso_url = mi_disqus_config.sso.url.toString(); 
	var sso_logout = mi_disqus_config.sso.logout.toString(); 
	var sso_width = mi_disqus_config.sso.width.toString(); 
	var sso_height = mi_disqus_config.sso.height.toString();
	
	disqus_config = function () {
		this.page.remote_auth_s3 = disqus_cookie_val;
		this.page.api_key = public_api_key;

		this.sso = {
		    name:    sso_name,
		    button:  sso_button,
		    url:     sso_url,
		    logout:  sso_logout,
		    width:   sso_width,
		    height:  sso_height
		};
	};
	
}

/** ^ MI_Commenting_Disqus.js *********************************************** */
 mi.commenting = new mi.Commenting();
 // If necessary, you can add configuration overrides here.
 mi.commenting.setConf('accountName','anchoragedailynews');

 var disqus_config = function () {
     this.sso = {
         name:    "ADN",
         button:  "http://media.adn.com/static/images/dsq-login-button-mi.png",
         url:     "http://registration.adn.com/static/insite/disqus_login.html",
         logout:  "http://registration.adn.com/reg-bin/tint.cgi?mode=logout",
         width:   "600",
         height:  "375"
     };
 };

/** DealSaver.js **********************************************************************
 * @minify true
 * @author Todd Edwards (tedwards [at] mcclatchyinteractive.com)
 * @aggpath dealsaver/js/MI_DealSaver.js
 */

mi.DealSaver = function() {
  mi.App.apply(this, arguments);
  if (mi.control && mi.control.dealsaver !== undefined) {
    this.setConf("enabled",mi.control.dealsaver);
  } else {
    this.setConf("enabled",0);
    console.warn("DealSaver has been instantiated, but disabled because mi.control.dealsaver is not defined.");
  }
};

mi.DealSaver.prototype.executeDs = function() {
  var self = this;
  var e = self.getConf("enabled");

  if ( e !== 0 ) {
    dsUrl = "http://" + window.location.hostname + "/static/dealsaver/widget/dealsaver.json";

    jQuery.ajax({
      type: "GET",
      cache: false,
      dataType: "json",
      url: dsUrl,
      success: function(data) {
        self.checkData(data);
        self.displayWidget(self.getConf("enabled"));
      },
      error: function() {
        self.setConf("enabled",0);
        self.displayWidget(self.getConf("enabled"));
      }
    });
  }
  else {
    console.info('Display of DealSaver has been disabled.');
  }
};

mi.DealSaver.prototype.checkData = function(data) {
  var self = this;

  if (data.page.deals.deal == undefined) {
    self.setConf("enabled",0);
    console.warn("The DealSaver widget has been disabled because it can't find any deal information in the feed.");
  } else if (data.page.deals.deal.saleprice.$t <= 0 || data.page.deals.deal.saleprice.$t == undefined) {
    self.setConf("enabled",2);
    console.warn("The DealSaver widget has been placed in PlaceHolder mode because saleprice is empty or 0.");
    self.distributeData(data);
  } else {
    self.distributeData(data);
  }
}

mi.DealSaver.prototype.distributeData = function(data) {
  var self = this;

  if (self.getConf("LID") !== undefined) {
    var lid = self.getConf("LID");
    var lidHash = "&LID=" + lid;
  } else {
    console.warn("DealSaver can't find mi.dealSaver.getConf('LID'). Disabling the LID hash tag in URLs.");
    var lidHash = '';
  }

  var dsvalue = data.page.deals.deal.productvalue.$t;
  var dsprice = data.page.deals.deal.saleprice.$t;
  var dollarsoff = (dsvalue-dsprice);
  var percentoff = (dollarsoff / dsvalue) * 100;
  var misitelink = data.page.site.sitelink.$t + lidHash + "#widget=ds_rrail";
  var mideallink = data.page.deals.deal.link.$t + lidHash + "#widget=ds_rrail";

  jQuery("#ds_value").html("$"+Math.round(dsvalue));
  jQuery("#ds_discount").html(Math.floor(percentoff)+"%");
  jQuery("#ds_save").html("$"+Math.round(dollarsoff));
  jQuery("#dealsaver_td .ds_title_link").attr("href",mideallink);
  jQuery("#dealsaver_td .ds_title_link").html(data.page.deals.deal.offer.$t);
  jQuery("#dealsaver_td .ds_pricetag_container").html("$"+data.page.deals.deal.saleprice.$t);
  jQuery("#dealsaver_td .ds_deal_image img").attr("src",data.page.deals.deal.splashpagethumbnail.$t);
  jQuery("#dealsaver_td .ds_logo_link").attr("href",misitelink);
  jQuery("#dealsaver_td .ds_dealtitle").attr("href",misitelink);
  jQuery("#dealsaver_td .ds_deal_image a").attr("href",mideallink);
  jQuery("#dealsaver_td .ds_pricetag a").attr("href",mideallink);
};

mi.DealSaver.prototype.displayWidget = function(display_mode) {
  var self = this;

  if ( display_mode !== 0 && display_mode !== 2 ) {
    jQuery("#dealSaverWidget").attr("style", "display:block");
  } else if ( display_mode == 2 ) {
    jQuery("#dealSaverWidget .ds_buycontainer").attr("style", "display:none");
    jQuery("#dealSaverWidget .ds_deal_image").attr("style", "float:none; text-align:center");
    jQuery("#dealSaverWidget").attr("style", "display:block");
  }
};
/**
 * Equal Heights Plugin
 * @minify true
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 * 
 * Version 1.0
 * Updated 12/10/2008
 *
 * Copyright (c) 2008 Rob Glazebrook (cssnewbie.com) 
 *
 * Usage: $(object).equalHeights([minHeight], [maxHeight]);
 * 
 * Example 1: $(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: $(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: $(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * 
 */

(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);