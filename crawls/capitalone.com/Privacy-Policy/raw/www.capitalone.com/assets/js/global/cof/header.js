if( typeof Cof == 'undefined' )
    Cof = {};
    
Cof.Header = function() {

    var c1server = window.location.protocol + "//" + window.location.hostname;

	if(window.location.port != null){
	 c1server = c1server + ":" + window.location.port;
	}
    jQuery.preloadImages(c1server + '/assets/img/global/bg/trans-border.png');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-global_grad.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/icon/sprite/account-access.png');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-primary_hl.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/nav-primary_btm.gif');
    jQuery.preloadImages(c1server + '/assets/img/global/bg/modal_bg.png');
    jQuery.preloadImages(c1server + '/assets/img/global/btn/tb_x.gif');

    jQuery.elReady('#header #nav-global', function() {
        // zip code rolldown
        jQuery('#header #nav-global li.zip-product-search').mouseover(function() {
            jQuery('ul#nav-global li.zip-product-search').addClass('zipCodeOver');
        });
        jQuery('#header #nav-global li.zip-product-search').mouseout(function() {
            jQuery('#header #nav-global li.zip-product-search').removeClass('zipCodeOver');
        });

        jQuery('#header #nav-global input[name=zip]').focus(function() {
            jQuery('#header #nav-global li.zip-product-search').addClass('zipCodeFocus');
        });
        jQuery('#header #nav-global input[name=zip]').blur(function() {
            jQuery('#header #nav-global li.zip-product-search').removeClass('zipCodeFocus');
        });

        // find-a-branch rolldown
        jQuery('#header #nav-global li.find-branch').mouseover(function() {
            jQuery('#header #nav-global li.find-branch').addClass('bankZipCodeOver');
        });
        jQuery('#header #nav-global li.find-branch').mouseout(function() {
            jQuery('#header #nav-global li.find-branch').removeClass('bankZipCodeOver');
        });

        jQuery('#header #nav-global input#bank-zipcode').focus(function() {
            jQuery('#header #nav-global li.find-branch').addClass('bankZipCodeFocus');
        });
        jQuery('#header #nav-global input#bank-zipcode').blur(function() {
            jQuery('#header #nav-global li.find-branch').removeClass('bankZipCodeFocus');
        });

        // account access rolldown
        jQuery('#header #nav-global li.account').mouseover(function() {
            jQuery('#header #nav-global li.account').addClass('accessAccountOver');
        });
        jQuery('#header #nav-global li.account').mouseout(function() {
            jQuery('#header #nav-global li.account').removeClass('accessAccountOver');
        });
    });

    Cof.Header.Search();
    Cof.Header.Zipcode.init();
    Cof.Header.PrimaryNav();
    Cof.Header.GlobalNav();

};

Cof.Header.Search = function() {

    jQuery.elReady('#search-field', function() {

        var searchLabel = this.val();

        this.focus(function(){
            jQuery(this).addClass('js-focus');

            if (this.value == searchLabel) {
                jQuery(this).val('');
            };
        });

        this.blur(function(){
            jQuery(this).removeClass('js-focus');

            if (this.value == '') {
                jQuery(this).val(searchLabel);
            };
        });

        jQuery('#c1-search-form').submit(function(){
            var value = jQuery('#search-field').val();

            if (value == searchLabel) {
                jQuery('#search-field').val('');
            }

            if (typeof cg2 != 'undefined') {
                jQuery(this).append('<input type="hidden" name="cg2" value="' + unescape(cg2) + '" />');
            }

            jQuery(this).append('<input type="hidden" name="refer" value="' + encodeURI(location.href) + '" />');
        });
    });
};

Cof.Header.GlobalNav = function() {
    var findBranchLabel = 'Zip or City, State';

    jQuery.elReady('#bank-zipcode', function() {

        if (typeof(c1zip) != 'undefined' && c1zip.length == 5) {
            jQuery(this).val(c1zip);
        } else {
            jQuery(this).val(findBranchLabel);
        }

        this.focus(function() {
            if (this.value == findBranchLabel) {
                this.value = '';
            }
        });

        this.blur(function() {
            if (this.value == '') {
                this.value = findBranchLabel;
            }
        });

    });
};

Cof.Header.PrimaryNav = function() {

    jQuery.elReady('#nav-primary', function() {
		Cof.Header.PrimaryNav.Render();
        
    });
};

Cof.Header.PrimaryNav.Render = function() {
	var navEntries = jQuery("#nav-primary > li");

        jQuery('ul.nav-primary-menu').supersubs({
            minWidth   : 12,   // minimum width of sub-menus in em units
            maxWidth   : 31,   // maximum width of sub-menus in em units
            extraWidth : 1     // extra width can ensure lines don't sometimes turn over
                               // due to slight rounding differences and font-family
        }).superfish({
            animation : {
                opacity : 'show',
                height  : 'show'
            },
            autoArrows : false,
            speed      : 'fast',
            delay      : 750
		}).find('ul').bgIframe({opacity:false}).find('iframe.bgiframe').each(function() {
            // Fixes the conflict with the primary nav menu and the form select dropdown in IE6
            var iframeDocument = this.contentWindow.document;
            var interval = setInterval(function() {
                if (typeof iframeDocument != 'undefined') {
                    iframeDocument.body.style.backgroundColor = '#1b4876';
                    clearInterval(interval);
                }
            }, 100);
		});

        // "hack" for the "For Business" primary nav item regionalization
        navEntries.children("a[href^='/smallbusiness']").add(navEntries.children("a[href^='/bank/business']")).click(function() {
            // add a cookie so we know that "For Business" was clicked
            jQuery.cookie("forbusiness", "true", {path : '/', domain: '.capitalone.com'});
        });
}


Cof.Header.Zipcode = (function() {

    // Indicator for when the zip has been successfully accepted and submitted
    var hasSubmitZip = false;

    var modalOpen = function(dialog) {
        dialog.overlay.show();
        dialog.container.show();
        dialog.data.show();
    }

    var modalClose = function(dialog) {
        if (!hasSubmitZip) {
            Cof.Header.Zipcode.rejectZip();
        }

        dialog.data.hide();
        dialog.container.hide();
        dialog.overlay.hide();
        dialog.iframe && dialog.iframe.hide();
    }

    return {
        direct:         false,
        noPromptCookie: 'nozip',
        goToUrl:        '',

        init: function() {
            jQuery(document).ready(function() {

                if (!Cof.Header.Zipcode.validZip()                                          && // only run if the ZIP is not valid
                    !Cof.Header.Zipcode.validRegion()                                       && // only run if the region is not valid
                    window.location.hostname.indexOf('capitalone.com') != -1                && // only run if the hostname contains "capitalone.com"
                    (document.cookie.indexOf(Cof.Header.Zipcode.noPromptCookie) == -1 ||
                     jQuery.cookie(Cof.Header.Zipcode.noPromptCookie) != 'true')            && // only run if the noPromptCookie is not set to "true" (or doesn't exist)
                    typeof jQuery.modal == 'function'                                       && // only run if simple modal is loaded
                    window.c1zip!==1                                                        && // only if the c1zip variable is specifically not 1
					zipOptOutFlag == false                                                     // only if they have not opted out
                ) {
                    jQuery('a').click(function() {
						if( $(this).hasClass('zip-prompt-flag') ) {
							Cof.Header.Zipcode.askForZip(this.href);
							return false;
						} 
                    });
                }

                jQuery('form[name=change-zip], form[name=zipcode-overlay-form]').submit(function() {
                    return Cof.Header.Zipcode.submitZip(jQuery(this).attr('id'));
                });
            });

            jQuery.elReady('#zipcode-prompt-input', function() {

                if (this.val() == "") {
                    jQuery("#zipcode-prompt-form label").css('display','block');
                } else {
                    jQuery("#zipcode-prompt-form label").css('display','none');
                }

                // clear input on focus
                this.focus(function() {
                    jQuery("#zipcode-prompt-form label").css('display','none');
                });

                // if field is empty afterward, add text again
                this.blur(function() {
                    if (jQuery('#zipcode-prompt-input').val() == "") {
                        jQuery("#zipcode-prompt-form label").css('display','block');
                    }
                });
            });
        },

        askForZip: function(linkUrl) {
            if (this.validZip() || window.c1zip == 1) {
                // we're good to move on
                return true;
            }

            this.goToUrl = linkUrl;

            jQuery.modal(jQuery('#zipcode-overlay-content'), {
                onOpen      :  modalOpen,
                onClose     :  modalClose,
                overlayId   : 'zipcode-overlay',
                containerId : 'zipcode-overlay-container',
                closeClass  : 'close'
            });

            jQuery('#zipcode-overlay-input').focus();

            // enable escape key closing of dialog
            document.onkeyup = function(e) {
                if (e == null) {  // ie
                    keycode = event.keyCode;
                } else { // mozilla
                    keycode = e.which;
                }
                if (keycode == 27) { // close
                    jQuery.modal.close();
                }
            };

            // return false to avoid going to the next url
            return false;
        },

        rejectZip: function() {
            jQuery.cookie(this.noPromptCookie, 'true', {path: '/', domain: '.capitalone.com'});
            window.location.assign(this.goToUrl);
            return false;
        },

        submitZip: function(formId) {

            var oldzip = window.c1zip;
            var inputCurrentHost = null;

            //this if condition is for zipcode-prompt bank redesign
            if(formId == 'zipcode-prompt-form') {
                window.c1zip = jQuery("#zipcode-prompt-input").val();
            } else {
                window.c1zip = jQuery("#" + formId + " input.zipcode-input").val();
            }

            if (!this.validZip()) {
                if (formId == 'zipcode-overlay-form') {
                    jQuery('#zipcode-overlay-content p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
                } else if (formId == 'change-zip') {
                    jQuery('#change-zip label').text('ZIP code is invalid').addClass('error');
                } else if (formId == 'zipcode-prompt-form') { // this if condition is for form id name having zipcode-prompt-form for bank redesign
                    jQuery('#zipcode-prompt-form p').text('Please enter a valid five-digit ZIP Code.').addClass('error');
                }

                window.c1zip = oldzip;
                return false;

            } else if (window.location.hostname.search(/(?:qa|pt-web|qa-web|qamain|dev|local|www|beta-www|driver|bunker|celtics|camber|thunder|spurs|celtics|knicks|hornets|pistons|suns|portal-ite|portal-bau|portal-project|staging-web|portal|((kdc|pdc)staging)).*?\.capitalone\.com/) == -1) {
                inputCurrentHost = document.createElement("input");
                jQuery(inputCurrentHost).attr("type", "hidden").attr("name", "exthost").attr("value", escape(window.location.href));
                jQuery("#" + formId).append(inputCurrentHost);
            } else {
                if (Cof.Header.Zipcode.goToUrl == '') {
                    Cof.Header.Zipcode.goToUrl = window.location.href;
                }

                if (jQuery("#" + formId + " input[name=dest]").length == 0) {
                    inputCurrentHost = document.createElement("input");
                    jQuery(inputCurrentHost).attr("type", "hidden").attr("name", "dest").attr("value", escape(Cof.Header.Zipcode.goToUrl));
                    jQuery("#" + formId).append(inputCurrentHost);
                } else {
					if(formId == 'zipcode-prompt-form'){
												
					}
					else{
                    	jQuery("#" + formId + " input[name=dest]").attr("value", escape(Cof.Header.Zipcode.goToUrl));
					}
                }

                if (Cof.Header.Zipcode.direct) {
                    inputDirect = document.createElement("input");
                    jQuery(inputDirect).attr("type", "hidden").attr("name", "direct").attr("value", "yes");
                    jQuery("#" + formId).append(inputDirect);
                }

                // if changing the zip code, set a cookie to re-check for region on designated pages
                if (formId == 'change-zip') {
                    jQuery.cookie('setzipcode', 'yes', {path: '/', domain: '.capitalone.com'});
                }
            }

            hasSubmitZip = true;

            if (typeof jQuery.modal == 'function') {
                jQuery.modal.close();
            }

            return true;
        },

        validRegion: function() {
            if (typeof window.validRegion == 'undefined')
                return false;
            if (window.validRegion !== true)
                return false;

            return true;
        },

        validZip: function() {
			if(document.getElementById('zipcode')!=null && document.getElementById('zipcode').value.length >0)
	        {
				c1zip = document.getElementById('zipcode').value;
			}	
			else if(document.getElementById('zipcode-overlay-input')!=null && document.getElementById('zipcode-overlay-input').value.length >0)
	        {
				c1zip = document.getElementById('zipcode-overlay-input').value;
			}
            if (typeof window.c1zip == 'undefined')
                return false;
            if (window.c1zip.constructor != String)
                return false;
            if (/\d{5}/.test(window.c1zip) == false)
                return false;

            var zip = parseInt(window.c1zip, 10);
            // the IRS has the lowest zip code at 00501 (see http://en.wikipedia.org/wiki/ZIP_code)
            if (zip < 501 || zip > 99950)
                return false;

            return true;
        }
    }
})();


/**
 * Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-07-21 18:44:59 -0500 (Sat, 21 Jul 2007) $
 * $Rev: 2446 $
 *
 * Version 2.1.1
 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var a=function(n){return n&&n.constructor==Number?n+'px':n},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':a(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':a(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':a(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':a(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild)})}return this}})(jQuery);

/**
 * hoverIntent is similar to jQuery's built-in "hover" function except that
 * instead of firing the onMouseOver event immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the onMouseOver event.
 *
 * hoverIntent r5 // 2007.03.27 // jQuery 1.1.2
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * hoverIntent is currently available for use in all personal or commercial
 * projects under both MIT and GPL licenses. This means that you can choose
 * the license that best suits your project, and use it accordingly.
 */
(function(A){A.fn.hoverIntent=function(I,H){var J={sensitivity:7,interval:100,timeout:0};J=A.extend(J,H?{over:I,out:H}:I);var L,K,F,D;var E=function(M){L=M.pageX;K=M.pageY};var C=function(N,M){M.hoverIntent_t=clearTimeout(M.hoverIntent_t);if((Math.abs(F-L)+Math.abs(D-K))<J.sensitivity){A(M).unbind("mousemove",E);M.hoverIntent_s=1;return J.over.apply(M,[N])}else{F=L;D=K;M.hoverIntent_t=setTimeout(function(){C(N,M)},J.interval)}};var G=function(N,M){M.hoverIntent_t=clearTimeout(M.hoverIntent_t);M.hoverIntent_s=0;return J.out.apply(M,[N])};var B=function(P){var O=(P.type=="mouseover"?P.fromElement:P.toElement)||P.relatedTarget;while(O&&O!=this){try{O=O.parentNode}catch(P){O=this}}if(O==this){return false}var N=jQuery.extend({},P);var M=this;if(M.hoverIntent_t){M.hoverIntent_t=clearTimeout(M.hoverIntent_t)}if(P.type=="mouseover"){F=N.pageX;D=N.pageY;A(M).bind("mousemove",E);if(M.hoverIntent_s!=1){M.hoverIntent_t=setTimeout(function(){C(N,M)},J.interval)}}else{A(M).unbind("mousemove",E);if(M.hoverIntent_s==1){M.hoverIntent_t=setTimeout(function(){G(N,M)},J.timeout)}}};return this.mouseover(B).mouseout(B)}})(jQuery);

/**
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *     http://www.opensource.org/licenses/mit-license.php
 *     http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
(function($){$.fn.superfish=function(d){var e=$.fn.superfish,c=e.c,$arrow=$(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),over=function(){var a=$(this),menu=getMenu(a);clearTimeout(menu.sfTimer);a.showSuperfishUl().siblings().hideSuperfishUl()},out=function(){var a=$(this),menu=getMenu(a),o=e.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray(a[0],o.$path)>-1);a.hideSuperfishUl();if(o.$path.length&&a.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path)}},o.delay)},getMenu=function(a){var b=a.parents(['ul.',c.menuClass,':first'].join(''))[0];e.op=e.o[b.serial];return b},addArrow=function(a){a.addClass(c.anchorClass).append($arrow.clone())};return this.each(function(){var s=this.serial=e.o.length;var o=$.extend({},e.defaults,d);o.$path=$('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)});e.o[s]=e.op=o;$('li:has(ul)',this)[($.fn.hoverIntent&&!o.disableHI)?'hoverIntent':'hover'](over,out).each(function(){if(o.autoArrows)addArrow($('>a:first-child',this))}).not('.'+c.bcClass).hideSuperfishUl();var b=$('a',this);b.each(function(i){var a=b.eq(i).parents('li');b.eq(i).focus(function(){over.call(a)}).blur(function(){out.call(a)})});o.onInit.call(this)}).each(function(){menuClasses=[c.menuClass];if(e.op.dropShadows&&!($.browser.msie&&$.browser.version<7))menuClasses.push(c.shadowClass);$(this).addClass(menuClasses.join(' '))})};var f=$.fn.superfish;f.o=[];f.op={};f.IE7fix=function(){var o=f.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined)this.toggleClass(f.c.shadowClass+'-off')};f.c={bcClass:'sf-breadcrumb',menuClass:'sf-js-enabled',anchorClass:'sf-with-ul',arrowClass:'sf-sub-indicator',shadowClass:'sf-shadow'};f.defaults={hoverClass:'sfHover',pathClass:'overideThisToUse',pathLevels:1,delay:800,animation:{opacity:'show'},speed:'normal',autoArrows:false,dropShadows:false,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=f.op,not=(o.retainPath===true)?o.$path:'';o.retainPath=false;var a=$(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');o.onHide.call(a);return this},showSuperfishUl:function(){var o=f.op,sh=f.c.shadowClass+'-off',$ul=this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');f.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){f.IE7fix.call($ul);o.onShow.call($ul)});return this}})})(jQuery);

/**
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *     http://www.opensource.org/licenses/mit-license.php
 *     http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
(function($){$.fn.supersubs=function(k){var l=$.extend({},$.fn.supersubs.defaults,k);return this.each(function(){var h=$(this);var o=$.meta?$.extend({},l,h.data()):l;var j=$('<li id="menu-fontsize">&#8212;</li>').css({'padding':0,'position':'absolute','top':'-999em','width':'auto'}).appendTo(h).width();$('#menu-fontsize').remove();$ULs=h.find('ul');$ULs.each(function(i){var c=$ULs.eq(i);var d=c.children();var e=d.children('a');var f=d.css('white-space','nowrap').css('float');var g=c.add(d).add(e).css({'float':'none','width':'auto'}).end().end()[0].clientWidth/j;g+=o.extraWidth;if(g>o.maxWidth){g=o.maxWidth}else if(g<o.minWidth){g=o.minWidth}g+='em';c.css('width',g);d.css({'float':f,'width':'100%','white-space':'normal'}).each(function(){var a=$('>ul',this);var b=a.css('left')!==undefined?'left':'right';a.css(b,g)})})})};$.fn.supersubs.defaults={minWidth:9,maxWidth:25,extraWidth:0}})(jQuery);

/**
 * SimpleModal 1.2.3 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * Copyright (c) 2009 Eric Martin
 * Dual licensed under the MIT and GPL licenses
 * Revision: $Id: header.js,v 1.2.2.5 2010/01/21 03:56:55 166616 Exp $
 */
(function($){var f=$.browser.msie&&parseInt($.browser.version)==6&&typeof window['XMLHttpRequest']!="object",ieQuirks=null,w=[];$.modal=function(a,b){return $.modal.impl.init(a,b)};$.modal.close=function(){$.modal.impl.close()};$.fn.modal=function(a){return $.modal.impl.init(this,a)};$.modal.defaults={opacity:50,overlayId:'simplemodal-overlay',overlayCss:{},containerId:'simplemodal-container',containerCss:{},dataCss:{},zIndex:1000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:'simplemodal-close',position:null,persist:false,onOpen:null,onShow:null,onClose:null};$.modal.impl={opts:null,dialog:{},init:function(a,b){if(this.dialog.data){return false}ieQuirks=$.browser.msie&&!$.boxModel;this.opts=$.extend({},$.modal.defaults,b);this.zIndex=this.opts.zIndex;this.occb=false;if(typeof a=='object'){a=a instanceof jQuery?a:$(a);if(a.parent().parent().size()>0){this.dialog.parentNode=a.parent();if(!this.opts.persist){this.dialog.orig=a.clone(true)}}}else if(typeof a=='string'||typeof a=='number'){a=$('<div/>').html(a)}else{alert('SimpleModal Error: Unsupported data type: '+typeof a);return false}this.dialog.data=a.addClass('simplemodal-data').css(this.opts.dataCss);a=null;this.create();this.open();if($.isFunction(this.opts.onShow)){this.opts.onShow.apply(this,[this.dialog])}return this},create:function(){w=this.getDimensions();if(f){this.dialog.iframe=$('<iframe src="javascript:false;"/>').css($.extend(this.opts.iframeCss,{display:'none',opacity:0,position:'fixed',height:w[0],width:w[1],zIndex:this.opts.zIndex,top:0,left:0})).appendTo('body')}this.dialog.overlay=$('<div/>').attr('id',this.opts.overlayId).addClass('simplemodal-overlay').css($.extend(this.opts.overlayCss,{display:'none',opacity:this.opts.opacity/100,height:w[0],width:w[1],position:'fixed',left:0,top:0,zIndex:this.opts.zIndex+1})).appendTo('body');this.dialog.container=$('<div/>').attr('id',this.opts.containerId).addClass('simplemodal-container').css($.extend(this.opts.containerCss,{display:'none',position:'fixed',zIndex:this.opts.zIndex+2})).append(this.opts.close?$(this.opts.closeHTML).addClass(this.opts.closeClass):'').appendTo('body');this.setPosition();if(f||ieQuirks){this.fixIE()}this.dialog.container.append(this.dialog.data.hide())},bindEvents:function(){var a=this;$('.'+this.opts.closeClass).bind('click.simplemodal',function(e){e.preventDefault();a.close()});$(window).bind('resize.simplemodal',function(){w=a.getDimensions();a.setPosition();if(f||ieQuirks){a.fixIE()}else{a.dialog.iframe&&a.dialog.iframe.css({height:w[0],width:w[1]});a.dialog.overlay.css({height:w[0],width:w[1]})}})},unbindEvents:function(){$('.'+this.opts.closeClass).unbind('click.simplemodal');$(window).unbind('resize.simplemodal')},fixIE:function(){var p=this.opts.position;$.each([this.dialog.iframe||null,this.dialog.overlay,this.dialog.container],function(i,a){if(a){var b='document.body.clientHeight',bcw='document.body.clientWidth',bsh='document.body.scrollHeight',bsl='document.body.scrollLeft',bst='document.body.scrollTop',bsw='document.body.scrollWidth',ch='document.documentElement.clientHeight',cw='document.documentElement.clientWidth',sl='document.documentElement.scrollLeft',st='document.documentElement.scrollTop',s=a[0].style;s.position='absolute';if(i<2){s.removeExpression('height');s.removeExpression('width');s.setExpression('height',''+bsh+' > '+b+' ? '+bsh+' : '+b+' + "px"');s.setExpression('width',''+bsw+' > '+bcw+' ? '+bsw+' : '+bcw+' + "px"')}else{var c,le;if(p&&p.constructor==Array){var d=p[0]?typeof p[0]=='number'?p[0].toString():p[0].replace(/px/,''):a.css('top').replace(/px/,'');c=d.indexOf('%')==-1?d+' + (t = '+st+' ? '+st+' : '+bst+') + "px"':parseInt(d.replace(/%/,''))+' * (('+ch+' || '+b+') / 100) + (t = '+st+' ? '+st+' : '+bst+') + "px"';if(p[1]){var e=typeof p[1]=='number'?p[1].toString():p[1].replace(/px/,'');le=e.indexOf('%')==-1?e+' + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"':parseInt(e.replace(/%/,''))+' * (('+cw+' || '+bcw+') / 100) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"'}}else{c='('+ch+' || '+b+') / 2 - (this.offsetHeight / 2) + (t = '+st+' ? '+st+' : '+bst+') + "px"';le='('+cw+' || '+bcw+') / 2 - (this.offsetWidth / 2) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"'}s.removeExpression('top');s.removeExpression('left');s.setExpression('top',c);s.setExpression('left',le)}}})},getDimensions:function(){var a=$(window);var h=$.browser.opera&&$.browser.version>'9.5'&&$.fn.jquery<='1.2.6'?document.documentElement['clientHeight']:a.height();return[h,a.width()]},setPosition:function(){var a,left,hCenter=(w[0]/2)-((this.dialog.container.height()||this.dialog.data.height())/2),vCenter=(w[1]/2)-((this.dialog.container.width()||this.dialog.data.width())/2);if(this.opts.position&&this.opts.position.constructor==Array){a=this.opts.position[0]||hCenter;left=this.opts.position[1]||vCenter}else{a=hCenter;left=vCenter}this.dialog.container.css({left:left,top:a})},open:function(){this.dialog.iframe&&this.dialog.iframe.show();if($.isFunction(this.opts.onOpen)){this.opts.onOpen.apply(this,[this.dialog])}else{this.dialog.overlay.show();this.dialog.container.show();this.dialog.data.show()}this.bindEvents()},close:function(){if(!this.dialog.data){return false}if($.isFunction(this.opts.onClose)&&!this.occb){this.occb=true;this.opts.onClose.apply(this,[this.dialog])}else{if(this.dialog.parentNode){if(this.opts.persist){this.dialog.data.hide().appendTo(this.dialog.parentNode)}else{this.dialog.data.remove();this.dialog.orig.appendTo(this.dialog.parentNode)}}else{this.dialog.data.remove()}this.dialog.container.remove();this.dialog.overlay.remove();this.dialog.iframe&&this.dialog.iframe.remove();this.dialog={}}this.unbindEvents()}}})(jQuery);

jQuery(document).ready(function() {
	// Run Header
	Cof.Header();
});
