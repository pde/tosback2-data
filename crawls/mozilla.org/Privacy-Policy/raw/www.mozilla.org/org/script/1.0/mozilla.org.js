/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Mozilla.org website JavaScript classes and functions
 *
 * Initial version created by the friendly folks at Happy Cog -
 * http://www.happycog.com/
 *
 * Further enhancments and modifications by:
 *
 * silverorange.
 * and 
 * Ned Schwartz of The Interned [http://www.theinterned.net]
 *
 * @copyright 2009 Mozilla Corporation
 * @license   http://www.mozilla.org/MPL/ Mozilla Public License
 */

/**
 * Namespace
 */
if (typeof org == 'undefined') {
    var org = {};
}

org.mozilla = function() {
    return {
        init: function() {
            // general functions
            org.mozilla.greyInitialValues();
            org.mozilla.initSearchText();

            // get involved [new!]
            org.mozilla.tabSwitch();

            // Internet Health Check (script/1.0/ihc.js)
            org.mozilla.internetHealthCheck();

            // OneWebDay Poster Gallery
            org.mozilla.oneWebDayPosters();

            // What is an Open Web
            org.mozilla.whatOpenWeb();
        }
    };
}();

/**
 * String resources
 *
 * All in one spot for later translation.
 */
org.mozilla.strings = {
    'prev':       'Prev',
    'next':       'Next',
    'pagination': '%s of %s'
};

/**
 * Page initialization
 */
$(document).ready(function() { org.mozilla.init(); });

org.mozilla.greyInitialValues = function() {

    $('input.filled').each(function() {

        this.startText = $(this).attr('value');

    }).focus(function() {

        if ($(this).val() == this.startText) {
            $(this).val('');
            $(this).removeClass('filled');
        }

    }).blur(function() {

        if ($(this).val() == '') {
            $(this).val(this.startText);
            $(this).addClass('filled');
        }

    });

    $('textarea.filled').each(function() {

        this.startText = $(this).attr('value');

    }).focus(function() {

        if ($(this).val() == this.startText) {
            $(this).val('');
            $(this).removeClass('filled');
        }

    }).blur(function() {

        if ($(this).val() == '') {
            $(this).val(this.startText);
            $(this).addClass('filled');
        }

    });

};

org.mozilla.initSearchText = function() {

    var label = $('label[for="q"]');
    var text = $('#q');

    // hide label if page is reloaded with text inside search field
    if(text.val() != '') {
        label.fadeOut('fast');
    }

    text.focus(function() {
        if ($(this).val() == '') {
            label.fadeOut('fast');
        }
    }).blur(function() {
        if ($(this).val() == '') {
            label.fadeIn('fast');
        }
    });

};


/* =======================================
	Tab Changer [new!]
======================================= */
org.mozilla.tabSwitch = function(){

	$('#options-nav li').click(function(){
		var clickedIDtoClass = '.' + this.id;

		$('#options-nav li').removeClass("active");
		$(this).addClass("active");
		
		$('#options div').removeClass("active");
		$(clickedIDtoClass).addClass("active");
		
		return false;
	});
	
};



/* =======================================
	Internet Health Check
	/causes/serviceweek/internethealth/
	
	2009/09/10 -  Initial version created by Ned Schwartz of The Interned [http://www.theinterned.net]	
======================================= */
org.mozilla.internetHealthCheck = function() {
	// display the browsers in random order.
	var browsers = $('#modern_browsers ul').shuffle();
	// these pages need to render well in IE so fix the alpha
	if( typeof DD_belatedPNG === "object") DD_belatedPNG.fix('.pngfix');
};



/* =======================================
	OneWebDay Posteres
	/causes/onewebday/poster/
	
	2009/09/16 -  Initial version created by Ned Schwartz of The Interned [http://www.theinterned.net]    
======================================= */
org.mozilla.oneWebDayPosters =  function(){
	// OneWebDay Poster Gallery
	posterIDs = $.makeArray($('ul.thumbs li').map(function(){return this.id;}));
	$('ul.thumbs li').live("mouseover", function(e){				
		var preview = $('#poster_preview');
		var img = $('img', this).attr('src');
		var href = $('a', this).attr("href");		
		$(this).addClass("active").siblings().removeClass("active");
		$("#poster")
			.removeClass( posterIDs.join(" "))
			.addClass(this.id);		
		preview.find("a").attr("href", href);		
	});
	$("#poster_preview").click(function(e){
		window.location = $("a", this).attr("href");
	});
	$('#owd_poster_thumbs').shuffle().owdFeature().find("li:first").mouseover();
	// submit the Poster Picture Contest Form
	$('form#poster_contest_form').submit(function(e){
		// simple validation if one of the fields marked with the class 'required'
		// has an empty value then don't submit the form
		required = $.makeArray($('.required', this).map(function(i,n){
		  return n.value !== "";
		}));
		// if a required field has no value
		if( required.indexOf(false) !== -1 ) {
			var response = '<div class="ajaxmsg error">'+
				'<p>Oops! You need to fill in all the fields before submitting.</p>'+
				'<p>Please try again</p>'+
				'</div>';
				$('#poster_contest')
					.prepend(response)
					.find('.ajaxmsg').hide()
						.fadeIn("", function(){
							el = $(this);
							setTimeout( function(){el.click();}, 2000 );							
						});
			
			return false;
		}
		// disable the form while submitting		
		$('input[type=submit]',this).attr('disabled', 'disabled');
		// got the form values
		var data = $(this).serialize();
		// this is the expected command at the ajax endpoint
		var command = "&cmd=sendemail";
		// submit the form via ajax
		$.post(
			this.action,
			data+command,
			function(r) {			
				if (r === "success") {					
					var response = '<div class="ajaxmsg success">'+
						'<p>We have received your submission.</p>'+
						'<p>Thank you!</p>'+
						'</div>';					
				}
				else {
					var response = '<div class="ajaxmsg error">'+
						'<p>Oops! Something has gone wrong.</p>'+
						'<p>Please try again</p>'+
						'</div>';
				}
				// display a status message				
				$('#poster_contest')
					.prepend(response)
					.find('.ajaxmsg').hide()
						.fadeIn("", function(){
							el = $(this);
							setTimeout( function(){
								el.click();
								if(r==="success"){
									$('input:text', 'form#poster_contest_form').val("");
									$('input:checkbox','form#poster_contest_form').removeAttr("checked");																	
								}
								$('form#poster_contest_form input[type=submit]').removeAttr('disabled');
							}, 2000 );							
						});			
			}
		);
		return false;
	});
	$('.ajaxmsg').live('click', function(){$(this).fadeOut("",function(){$(this).remove();});} );	
	// owdposter social feed
  $('#friendfeed').friendfeed({num:5, start:0});	
};

/* =======================================
	Open Web - What is an Open Web
	/causes/openweb/what/
	
	2010/01/05 -  Initial version created by Ned Schwartz of The Interned [http://www.theinterned.net]    
======================================= */
org.mozilla.whatOpenWeb =  function(){

  $('form#whatopenweb_form').submit(function(e){
  	// simple validation if one of the fields marked with the class 'required'
  	// has an empty value then don't submit the form
  	$this = $(this);  	
    required =[];
  	required = $.grep($.makeArray($('.required'), this), function(n, i){
  	  $n = $(n);
      return ($.trim($n.val()) == "" || $.trim($n.val()) == $n.attr('placeholder'));
  	});
    if( required.length !== 0) {
      $.each(required, (function(){
        $req = $(this);
        $('label[for='+this.id+']').addClass("missing");
        $req.addClass("missing").blur(function(){
          $('label[for='+this.id+']').removeClass("missing");
          $req.removeClass("missing");
        });
      }));
  		var response = '<div class="ajaxmsg error">'+
  			'<p>Oops! You missed some stuff.</p>'+
  			'<p>You need to fill in all the <span class="red">red fields</span> before submitting.</p>'+
  			'<p>Please try again</p>'+
  			'</div>';
  			$this
  				.prepend(response)
  				.find('.ajaxmsg').hide()
  					.fadeIn("", function(){
  						el = $(this);
              setTimeout( function(){el.click();}, 2000 );              
  					});
  		return false;
  	}
  	// disable the form while submitting		
  	$('input[type=submit]',this).attr('disabled', 'disabled');
  	// got the form values
  	var data = $(this).serialize();
  	// this is the expected command at the ajax endpoint
  	var command = "&cmd=sendemail";
    // submit the form via ajax
    $.post(
     this.action,
     data+command,
     function(r) {     
       if (r === "success") {          
         $('#whatopenweb_contest').swap("#success");
         $('input:text, textarea', $this).val("").blur();
         $('input[type=submit]', $this).removeAttr('disabled');
         return false;        
       }
       else {
         var response = '<div class="ajaxmsg error">'+
           '<p>Oops! Something has gone wrong.</p>'+
           '<p>Please try again</p>'+
           '</div>';
       }
       // display a status message          
       $this
         .prepend(response)
         .find('.ajaxmsg').hide()
           .fadeIn("", function(){
             el = $(this);
             setTimeout( function(){
               el.click();
               if(r==="success"){
                 $('input:text, textarea', $this).val("").blur();                       
               }
               $('input[type=submit]', $this).removeAttr('disabled');
             }, 2000 );              
           });     
     }
    );
  	return false;
  });
  // make the jax response hidable
  $('.ajaxmsg').live('click', function(){$(this).fadeOut("",function(){$(this).remove();});} );    
  // char count for the Open Web Submission textarea
  $('form#whatopenweb_form textarea#submission_text').keyup(function(){
    var $textarea = $(this);
    var $counter = $('form#whatopenweb_form #charcount .count');
    var max = 500;
    var charcount = $textarea.val().length;
    var remaining = max - charcount;    
    var charClass = "safe";
    var charClass = (remaining < (max*0.25)) ? "warning" : charClass;
    var charClass = (remaining < 0) ? "error" : charClass;
    $counter.html(remaining).parent().removeClass('safe warning error').addClass(charClass);
  })
  .keypress(function(){$(this).keyup();})
  .keyup();
  
  // What Open Web social feed 
  $('#wow_friendfeed').friendfeed({num:8, start:0, url:'http://friendfeed-api.com/v2/feed/mozopen'});  
};
// hides siblings (defined by options.panelClass) and shows the caller jQuery element.
(function($){
  $.fn.swap = function(panel, options) {
    $this = $(this);
    settings = $.extend({
      panelClass : '.panel',
      hideDuration : 600,
      showDuration : 600
    }, options);              
    $showing = $(settings.panelClass+':visible', $this);
    $showing.animate({opacity: 'hide', height: 'hide'}, settings.hideDuration, 'swing', function(){
      $(panel).animate({opacity: 'show', height: 'show'}, settings.showDuration, 'swing');
    });
    return($this);
  };
})(jQuery);
/* =======================================
	OneWebDay Posteres jQuery Plugins
	/causes/onewebday/poster/
	
	2009/09/16 -  Initial version created by Ned Schwartz of The Interned [http://www.theinterned.net]
	2010/01/05 -  friendfeed plugin modified to extend it's use on the 'What is an Open Web' page by Ned Schwartz of The Interned [http://www.theinterned.net]	
======================================= */
(function($){
// owdFeature
// quick little funciton to make sure one of the elements with 
// the class of ".featured" ends up at the front of the list.
$.fn.owdFeature = function() {
	$(this).find(".featured:first").remove().prependTo(this);
	return this;
};
})(jQuery);
(function($){
// object to handle freindfeedness
// friendfeed API: http://code.google.com/p/friendfeed-api/wiki/ApiDocumentation
// Code modified from code by john girvin, july 2009 [http://www.johngirvin.com/blog/archives/reading-friendfeed-with-jquery.html]
$.fn.friendfeed = function() {
    if(this.length === 0) return; // if the collection is empty short-circuit
	args = (arguments[0]) ? arguments[0] : {};
	args.container = this;
	org.mozilla.oneWebDayPosters.friendfeed.init(args);	
};
org.mozilla.oneWebDayPosters.friendfeed = {
	// kick it all off, set params and make theAjax call
	init : function(){
		args = arguments[0];
		this.opts = {
			container : (args  && args.container) ? args.container : '#none',
			url : (args  && args.url) ? args.url : 'http://friendfeed-api.com/v2/feed/owdposter',
			start : (args  && args.start) ? args.start : 0,
			num : (args  && args.num) ? args.num : 10,
			maxcomments : (args  && args.maxcomments) ? args.maxcomments : 'auto',
			maxlikes : (args  && args.maxlikes) ? maxlikes :'auto'
		};
		// call friendfeed api
	    $.getJSON(
	        // construct the fetch url
	        this.opts.url+'?callback=?',
			{
				'start':this.opts.start,
				'num':this.opts.num,
				'maxcomments':this.opts.maxcomments,
				'maxlikes':this.opts.maxlikes
			},
	    // build content from api results
			this.buildHTML
	    );
	},
	// build the returned entries and stick them in the supplied conatiner element
	buildHTML : function(data) {	  
        // reference container to hold generated content
        var container = $(org.mozilla.oneWebDayPosters.friendfeed.opts.container);
        // loop for each friendfeed entry retrieved
        $.each(data.entries, function(i, entry) {
            // build markup for entry - adapt as you require
            buildAction = (entry.thumbnails) ? "buildPicture" : "buildText";
            // append content to container
            container.append( org.mozilla.oneWebDayPosters.friendfeed[buildAction](entry) );

        });
    },
	// functions to build the actaul entries - can add more types as needed
	buildText : function(entry) {	  
		var t = $([
        	'<li class="text_entry">',
				'<p class="friendfeed_body">',
		            entry.body,
				'</p>',
				'<p class="friendfeed_info">',
		            '<span class="friendfeed_date">',
						'<a href="'+entry.url+'">',
			            this.formatFriendFeedDate(entry.date),
			            '</a>',
		            '</span>',					
				'</p>',
            '</li>'
		].join('\n'));
				
		if(entry.via){
		  var via = ['<span class="friendfeed_via">',
		    ' &ndash;',
				'<a href="'+entry.via.url+'" >',
	            'via '+entry.via.name,
				'</a>',
			'</span>'
			].join('\n');
      $('p.friendfeed_info', t).append(via);
		};
		return t;
	},
	buildPicture : function(entry) {
		var t = $([
			'<li class="picture_entry">',
				'<p class="friendfeed_body">',
					'<span class="thumbnail">',
						'<a href="'+entry.thumbnails[0].link+'">',
						'<img src="'+entry.thumbnails[0].url+'" width="'+entry.thumbnails[0].width+'" height="'+entry.thumbnails[0].height+'" />',
						'</a>',
					'</span>',
		            '<span class="caption">'+entry.body+'</span>',
				'</p>',
				'<p class="friendfeed_info">',
		            '<span class="friendfeed_date">',
						'<a href="'+entry.url+'">'+this.formatFriendFeedDate(entry.date)+'</a>',
		            '</span>',
				'</p>',
			'</li>'
		].join('\n'));
		
		if(entry.via){
		  var via = ['<span class="friendfeed_via">',
		    ' &ndash;',
				'<a href="'+entry.via.url+'" >',
	            'via '+entry.via.name,
				'</a>',
			'</span>'
			].join('\n');
      $('p.friendfeed_info', t).append(via);
		};
		return t;
	},
	
	// convert rfc3339 formatted date (as returned by friendfeed api) to
	// a normal javascript date object
	// adapted from: http://www.ibm.com/developerworks/library/x-atom2json.html
	rfc3339ToDate : function(val) {
	    var pattern = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?(?:[Tt](\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?)?([Zz])?(?:([+-])(\d{2}):(\d{2}))?$/;
	    var m = pattern.exec(val);
	    var year = new Number(m[1] ? m[1] : 0);
	    var month = new Number(m[2] ? m[2] : 0);
	    var day = new Number(m[3] ? m[3] : 0);
	    var hour = new Number(m[4] ? m[4] : 0);
	    var minute = new Number(m[5] ? m[5] : 0);
	    var second = new Number(m[6] ? m[6] : 0);
	    var millis = new Number(m[7] ? m[7] : 0);
	    var gmt = m[8];
	    var dir = m[9];
	    var offhour = new Number(m[10] ? m[10] : 0);
	    var offmin = new Number(m[11] ? m[11] : 0);
	    if (dir && offhour && offmin) {
	        var offset = ((offhour * 60) + offmin);
	        if (dir == "+") {
	            minute -= offset;
	        } else if (dir == "-") {
	            minute += offset;
	        }
	    }
	    return new Date(Date.UTC(year, month, day, hour, minute, second, millis));
	},	
	// zeropad a number to two digits
	pad : function (v) {
	    if (v < 10) {
	        v = "0" + v;
	    }
	    return v;
	},
	// format a date returned from friendfeed api for display
	formatFriendFeedDate : function (ffdate) {
	    var m = new Array('dec', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov');
	    var d = this.rfc3339ToDate(ffdate);
	    return d.getDate() + ' ' + m[d.getMonth()] + ', ' + this.pad(d.getHours()) + ':' + this.pad(d.getMinutes());
	}
};
})(jQuery);

/**
 * Nothing to see here.
 *
 * @copyright 2010 Mozilla Foundation, 2010 silverorange Inc.
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License 1.1
 * @author    Michael Gauthier <mike@silverorange.com>
 */
$(document).ready(function() {

	var stateMachine = [
		/* 0  */ {38: 1},
		/* 1  */ {38: 2},
		/* 2  */ {40: 3,  38: 1},
		/* 3  */ {40: 4,  38: 1},
		/* 4  */ {37: 5,  40: 3,  38: 1},
		/* 5  */ {39: 6,  38: 1},
		/* 6  */ {37: 7,  38: 1},
		/* 7  */ {39: 8,  38: 1},
		/* 8  */ {66: 9,  38: 1},
		/* 10 */ {65: 10, 38: 1},
		/* 11 */ {}
	];

	var state = 0;

	$(document).keyup(function (e) {

		if (typeof stateMachine[state][e.which] !== 'undefined') {
			state = stateMachine[state][e.which];
		} else {
			state = 0;
		}

		if (state == stateMachine.length - 1) {
			$(document).trigger('mozami');
		}

	});
});

window.mozWebGLEgg = false;

$(document).bind('mozami', function() {
    if (window.mozWebGLDemo) {
        window.mozWebGLDemo.start();
    } else {
        var script = document.createElement('script');
        script.src = '/script/1.0/J3DIMath.js';
        document.body.appendChild(script);

        function checkLoad() {
            if (typeof J3DIMatrix4 !== 'undefined') {
                if (loadInterval) {
                    clearInterval(loadInterval);
                    loadInterval = null;
                }
                loadDemo();
            }
        }

        var loadInterval = setInterval( checkLoad, 20);
        checkLoad();

        function loadDemo() {
            var script = document.createElement('script');
            script.src = '/script/1.0/webgl-demo.js';
            document.body.appendChild(script);
        }
    }
});


/* =======================================
    Third-Party jQuery plugins
======================================= */

/*
 * jQuery shuffle
 *
 * Copyright (c) 2008 Ca-Phun Ung <caphun at yelotofu dot com>
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://yelotofu.com/labs/jquery/snippets/shuffle/
 *
 * Shuffles an array or the children of a element container.
 * This uses the Fisher-Yates shuffle algorithm <http://jsfromhell.com/array/shuffle [v1.0]>
 */	
(function($){
$.fn.shuffle=function(){return this.each(function(){var items=$(this).children();return(items.length)?$(this).html($.shuffle(items)):this;});};$.shuffle=function(arr){for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i,10),x=arr[--i],arr[i]=arr[j],arr[j]=x);return arr;};
})(jQuery);

