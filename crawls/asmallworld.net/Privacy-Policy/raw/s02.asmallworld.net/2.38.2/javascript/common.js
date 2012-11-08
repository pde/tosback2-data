// common.js 
// should contain javascript that is used frequently throughout the ASW platform

// PREVENT USER FROM SEARCHING KEYWORD 'Search' (case sensitive) 

jQuery(function() {

    jQuery("#gh-primary-search form").submit(function() {
        var inputValue = jQuery.trim(jQuery(this).children('input').val());

        if ((inputValue === "Search") || (inputValue === "")) {
            jQuery(this).children('input').attr("value", "")
            return false;
        }
    });

    // combine two functions in mini

    jQuery("#asw-search-header form").submit(function() {
        if ((jQuery(this).children('input').val().trim()) == "") {
            jQuery(this).children('input').attr("value", "")
            return false;
        }
    });


    // SEARCH INPUT BLUR AND FOCUS HANDLER

    //create an array of default values
    textInputs = jQuery('.search-input');
    var defaultValue = new Array();

    jQuery('.search-input').each(function(i) {
        defaultValue[i] = textInputs[i].value;
    });

    //bind blur and focus events to each input
    jQuery('.search-input').each(function(i) {
        jQuery(this).bind("focus", function() {
            if (jQuery(this).attr("value") == defaultValue[i]) {
                jQuery(this).attr("value", "")
            }
            ;
        });
        jQuery(this).bind("blur", function() {
            if (jQuery(this).attr("value") == "") {
                jQuery(this).attr("value", defaultValue[i])
            }
            ;
        });
    });


    //
    // focus and blur events for forms (not cross platform yet)
    //
    jQuery('#asw-registration .field input, #asw-registration .field select').bind('focus blur', function() {
        if (jQuery(this).parents('li').hasClass('focused')) {
            jQuery(this).parents('li').removeClass('focused');
        }
        else {
            jQuery(this).parents('li').addClass('focused');
        }
    });


});


// Easy access to the GET url parameters
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


// CHECK FOR LEADERBOARD AD, PAINT AD AND CLOCK ONCE WINDOW LOADED 

jQuery(document).ready(function() {
    // IF LEADERBOARD AD (EMBED OR IMG) EXISTS THEN SET BG-COLOR AND BORDER-COLOR


    var leaderboard = jQuery("#banner-leaderboard");
    var leaderboard_object = jQuery("#banner-leaderboard object");
    var leaderboard_embed = jQuery("#banner-leaderboard embed");
    var leaderboard_image = jQuery("#banner-leaderboard img");
    var leaderboard_iframe = jQuery("#banner-leaderboard iframe");

    if ((leaderboard.length > 0) && ( (leaderboard_object.length > 0) || (leaderboard_embed.length > 0) || (leaderboard_image.length > 0) || (leaderboard_iframe.length > 0) )) {


        if (leaderboard_embed.length > 0) {
            leaderboard_embed.each(function() {
                if (jQuery(this).width() > 300) {
                    leaderboard.addClass('banner-leaderboard-active');
                    jQuery("#outer-wrp").addClass('has-leaderboard');
                    return false;
                }
            });
        }

        if (leaderboard_object.length > 0) {
            leaderboard_object.each(function() {
                if (jQuery(this).width() > 300) {
                    leaderboard.addClass('banner-leaderboard-active');
                    jQuery("#outer-wrp").addClass('has-leaderboard');
                    return false;
                }
            });
        }

        if (leaderboard_iframe.length > 0) {
            leaderboard_iframe.each(function() {
                if (jQuery(this).width() > 300) {
                    leaderboard.addClass('banner-leaderboard-active');
                    jQuery("#outer-wrp").addClass('has-leaderboard');
                    return false;
                }
            });
        }

        if (leaderboard_image.length > 0) {
            leaderboard_image.each(function() {
                if (jQuery(this).width() > 300) {
                    leaderboard.addClass('banner-leaderboard-active');
                    jQuery("#outer-wrp").addClass('has-leaderboard');
                    return false;
                }
            });
        }
    }
    // hide leaderboard if there's a 1px dummy image in it'
    // if (jQuery("#banner-leaderboard").length>0 && jQuery("#banner-leaderboard").get(0).offsetHeight<50) {
    //     jQuery("#banner-leaderboard").hide();
    // }

    // IF CLOCK EXISTS
    if (jQuery('#gh-nav-clock object,#gh-nav-clock embed').length > 0) {
        jQuery('body').addClass('has-clock');
    }

    // if the banner ad has a div container, ensure that the top level div for the ad is centered
    var banner = jQuery("#banner-leaderboard");
    var ad_div = banner.find("div")[0];

    if (ad_div) {
      jQuery(ad_div).css("margin-left", "auto").css("margin-right", "auto");
    }
});


jQuery.noConflict();

/* 
 * Auto Expanding Text Area (1.2.2)
 * by Chrys Bader (www.chrysbader.com)
 * chrysb@gmail.com
 *
 * Special thanks to:
 * Jake Chapa - jake@hybridstudio.com
 * John Resig - jeresig@gmail.com
 *
 * Copyright (c) 2008 Chrys Bader (www.chrysbader.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 *
 */

(function(jQuery) {

    var self = null;

    jQuery.fn.autogrow = function(o)
    {
        return this.each(function() {
            new jQuery.autogrow(this, o);
        });
    };


    /**
     * The autogrow object.
     *
     * @constructor
     * @name jQuery.autogrow
     * @param Object e The textarea to create the autogrow for.
     * @param Hash o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/autogrow
     */

    jQuery.autogrow = function (e, o)
    {
        this.options = o || {};
        this.dummy = null;
        this.interval = null;
        this.line_height = this.options.lineHeight || parseInt(jQuery(e).css('line-height'));
        this.min_height = this.options.minHeight || parseInt(jQuery(e).css('min-height'));
        this.max_height = this.options.maxHeight || parseInt(jQuery(e).css('max-height'));
        ;
        this.textarea = jQuery(e);

        if (this.line_height == NaN)
            this.line_height = 0;

        // Only one textarea activated at a time, the one being used
        this.init();
    };

    jQuery.autogrow.fn = jQuery.autogrow.prototype = {
        autogrow: '1.2.2'
    };

    jQuery.autogrow.fn.extend = jQuery.autogrow.extend = jQuery.extend;

    jQuery.autogrow.fn.extend({

        init: function() {
            var self = this;
            this.textarea.css({overflow: 'hidden', display: 'block'});
            this.textarea.bind('focus', function() {
                self.startExpand()
            }).bind('blur', function() {
                self.stopExpand()
            });
            this.checkExpand();
        },

        startExpand: function() {
            var self = this;
            this.interval = window.setInterval(function() {
                self.checkExpand()
            }, 400);
        },

        stopExpand: function() {
            clearInterval(this.interval);
        },

        checkExpand: function() {

            if (this.dummy == null)
            {
                this.dummy = jQuery('<div></div>');
                this.dummy.css({
                    'font-size'  : this.textarea.css('font-size'),
                    'font-family': this.textarea.css('font-family'),
                    'width'      : this.textarea.css('width'),
                    'padding'    : this.textarea.css('padding'),
                    'line-height': this.line_height + 'px',
                    'overflow-x' : 'hidden',
                    'position'   : 'absolute',
                    'top'        : 0,
                    'left'     : -9999
                }).appendTo('body');
            }

            // Strip HTML tags
            var html = this.textarea.val().replace(/(<|>)/g, '');

            // IE is different, as per usual
            if (jQuery.browser.msie)
            {
                html = html.replace(/\n/g, '<BR>new');
            }
            else
            {
                html = html.replace(/\n/g, '<br>new');
            }

            if (this.dummy.html() != html)
            {
                this.dummy.html(html);

                if (this.max_height > 0 && (this.dummy.height() + this.line_height > this.max_height))
                {
                    this.textarea.css('overflow-y', 'auto');
                }
                else
                {
                    this.textarea.css('overflow-y', 'hidden');
                    if (this.textarea.height() < this.dummy.height() + this.line_height || (this.dummy.height() < this.textarea.height()))
                    {
                        this.textarea.animate({height: (this.dummy.height() + this.line_height) + 'px'}, 100);
                    }
                }
            }
        }

    });
})(jQuery);


function flip_class(flag, elem, class1, class2) {
    var newClass = flag ? class1 : class2;
    var oldClass = flag ? class2 : class1;
    elem.removeClass(oldClass).addClass(newClass)
}


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


//
// This URI parser is copied from http://gunblad3.blogspot.com/2008/05/uri-url-parsing.html
//

function UriParser(uri) {
    //define class (for use with prototype.js) to do URI parsing
    //modified from FlogUriParser found at http://www.flog.co.nz/index.php/journal/prototype-uri-parser-class/
    this._regExp = /^((\w+):\/\/\/?)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#;\|]+)?([;\|])?([^\?#]+)?\??([^#]+)?#?(\w*)/;
    this.username = "";
    this.password = "";
    this.port = "";
    this.protocol = "";
    this.host = "";
    this.pathname = "";
    this.url = "";
    this.urlparamseparator = "";
    this.urlparam = "";
    this.querystring = {};
    this.fragment = "";
    this.results = null;

    this._getVal = function(r, i) {
        if (!r) return null;
        return (typeof(r[i]) == 'undefined' ? "" : r[i]);
    };

    this.parse = function(uri) {
        var r = this._regExp.exec(uri);
        this.results = r;
        this.url = this._getVal(r, 0);
        this.protocol = this._getVal(r, 2);
        this.username = this._getVal(r, 4);
        this.password = this._getVal(r, 5);
        this.host = this._getVal(r, 6);
        this.port = this._getVal(r, 7);
        this.pathname = this._getVal(r, 8);
        this.urlparamseparator = this._getVal(r, 9);
        this.urlparam = this._getVal(r, 10);
        this.querystring = this._getVal(r, 11);
        this.fragment = this._getVal(r, 12);
        return r;
    };

    if (uri) this.parse(uri);
}

// qTip
// qTip Options Object

var qTipOptions;
qTipOptions = {content: {
    text: false
},
    show: {
        ready: true
    },
    style: {
        background: '#369',
        color: '#eee',
        border: {
            width: 4,
            color: '#00457C'
        },
        padding: 10,
        name: 'dark',
        tip: true
    },
    position: {
        corner: {
            target: 'topLeft',
            tooltip: 'bottomLeft'
        }
    },
    api: {
        onRender: function() {
            this.elements.target.bind('click', this.hide);
        }
    }};


// set qTip tooltip using .live()
//

jQuery('a.tooltip').live('mouseover', function()
{
    if (jQuery(this).data('qtip')) return true;
    jQuery(this).qtip(qTipOptions);
});



