/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/button-facebook.js */
function omnitureTrackShareLinks(shareName, typeName, donotredirect) {
	var redirect = false;
	if (!donotredirect) { // we want to redirect
		redirect = true;
	}
	s.linkTrackVars = 'eVar12,events';
	s.linkTrackEvents = 'event16';
	s.eVar12 = typeName;
	s.events = 'event16';
	s.tl(this, 'o', shareName);
	if (redirect) {
		setTimeout('document.location = "' + shareName.href + '"', 500);
	}
}

// Look for facebook share buttons and get share count from Facebook GraphAPI
jQ(document).ready(function() {
	var requestCache = {};

	jQ('.facebook-share').each(function(){
		var node   = jQ(this),
			url    = jQ('.facebook-share-btn', node).data('href');

		// Setup popup
		node.find('.facebook-share-btn').click(function(e) {
			e.preventDefault();
			popUpNewWindow(this.href, 580, 400);
		});

		// Check if a previous request to the same url has been done already
		// this prevents multiple AJAX requests to Facebook
		if (typeof(requestCache[url]) === 'undefined') {
			requestCache[url] = 0;

			var fqlQuery = 'select share_count,like_count from link_stat where url="' + url + '"',
				queryUrl = 'http://graph.facebook.com/fql?q='+fqlQuery+'&callback=?';

			jQ.ajax({
				url: queryUrl,
				dataType: 'json',
				jsonpCallback: 'fbCallback',
				success: function(response) {
					requestCache[url] = response.data[0].share_count + response.data[0].like_count || 0;

					// Insert counts into all instances of buttons with the same data-href attr
					var FBshareCounts = '<span class="facebook-share-count"><i></i><u></u>'+requestCache[url]+'</span>';
					jQ('ul:not(.col-8.b3, .undocked-share) .facebook-share-btn[data-href="'+url+'"]').after(FBshareCounts);

					if(jQ('.undocked-share').length){
						FBshareCounts = '<span class="facebook-share-count"><i></i><u></u><span>'+requestCache[url]+'</span></span>';
						jQ('.undocked-share .facebook-share-btn[data-href="'+url+'"]').before(FBshareCounts);
					}
				}
			});
		}
	});
});
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/button-google-plus.js */
window.___gcfg = {lang: 'en-GB'};

(function() {
  var po = document.createElement('script');
      po.async = true;

  po.src = 'https://apis.google.com/js/plusone.js';

  var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(po, s);
})();

function trackGPlus(obj) {
    try {
        omnitureTrackShareLinks('comp: r2: Share tools: GooglePlus Share', 'GooglePlus', true);
    } catch(er) {
        // ignore
    }
}
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/button-linkedin.js */
(function() {

  // Asynchronously load the LinkedIn library
  jQ.getScript('//platform.linkedin.com/in.js');

})();


function trackLinkedIn() {
    try {
        omnitureTrackShareLinks('comp: r2: Share tools: LinkedIn Share', 'LinkedIn', true);
    } catch(er) {
        // ignore
    }
}
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/button-tweet.js */
jQ(function ($) {
	if ('undefined' === typeof twttr) {
		window.twttr = (function (d,s,id) {
			var t, js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js=d.createElement(s);
			js.id=id;
			js.src="//platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
			return window.twttr || (t = { _e: [], ready: function(f) { t._e.push(f); } });
		} (document, 'script', 'twitter-wjs'));
	}

	twttr.ready(function(twttr) {
		twttr.events.bind('click', function(event) {
			if ('tweet' === event.region) {
				rs_logSocialNetwork('Twitter');
				try {
					omnitureTrackShareLinks('comp: r2: Share tools: Twitter Share', 'Twitter', true);
				} catch(er) {
					// ignore
				}
			}
		});
	});
});

/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/floating-share-tools.js */
var checkViewport = function () {
  
  var pullout = jQ('.undocked-share');
  var mainCol = jQ('#article-body-blocks');
  var wideViewport = jQ(window).width() >= 1130;
  
  var mainColTop = mainCol.position().top;  
  var scrollFromTop = jQ(window).scrollTop(); 

  var dynTop =  parseInt(mainCol.position().top, 10) +'px';
  var dynLeft = mainCol.offset().left - 20;
  dynLeft = '-' + dynLeft +'px';  

//if it's big enough
  if (wideViewport) {

  if((scrollFromTop < mainColTop) && wideViewport) {
    pullout.removeClass('floating').css({'top' : dynTop, 'left' : dynLeft });
  } else {
    pullout.addClass('floating').removeAttr('style');    
  }
  
  if(jQ.waypoints){
    jQ.waypoints.settings.scrollThrottle = 4;
    jQ.waypoints.settings.resizeThrottle = 500;
    mainCol.waypoint({offset: 8});
    mainCol.waypoint(function(event, direction) {  
      if (direction === 'down' && jQ(window).width() >= 1130) { 
        pullout.addClass('floating').removeAttr('style');

      //if it's not going down
      } else {
        pullout.removeClass('floating').css({'top' : dynTop, 'left' : dynLeft });      
      }
  
    });
  }
  } else {
    pullout.removeClass('floating').css({'top' : '-1000px', 'left' : '-1000px' });
  }
};

jQ(window).bind("load resize", checkViewport);

/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/formChecker.js */
// -----------------------formChecker.js starts here ------------------------------

function _formChecker(elem, limit, warning) {
	var charsLeft = limit - elem.value.length;
	warning.innerHTML = charsLeft + ' characters left';
	warning.className = "";
	if (elem.value.length > limit) {
		elem.value = elem.value.substring(0, limit);
		warning.innerHTML = "Max 250 characters";
		warning.className = "warning";
		elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	}
}

function formChecker(elem, limit) {
	_formChecker(elem, limit, document.getElementById('warning'));
}

function formCheckerSide(elem, limit) {
	_formChecker(elem, limit, document.getElementById('warning-side'));
}

/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/glossaryPopupView.js */
ensurePackage("guardian.r2");

function glossaryPopupView() {
	
	function attachLinksToGlossary(identifier, header, footer) {
	
		var allGlossaryLinks = guardian.r2.dom.element.getElementsByClassName(identifier);
		if (!allGlossaryLinks) {
			return;
		}
		
		for (var i = 0; i < allGlossaryLinks.length; ++i) {
			
			// onclick, get href from link
			var href = allGlossaryLinks[i].getAttribute('href');
			href = allGlossaryLinks[i].getAttribute('href', 2);
			href = href.substring(1);
			
			// attach click event
			addEvent(allGlossaryLinks[i], 'click', toggleGlossaryPopup(href, allGlossaryLinks[i], i, header, footer));
		}
	}
	
	function toggleGlossaryPopup(href, ele, num, header, footer) {
		return function (e) {
			guardian.r2.event.stop(e);
			var popUp = document.getElementById(href + '-popup-' + num);
			if (popUp === null || popUp === 'null') {
				
				// get the glossary element the link goes to
				var glossaryItem = document.getElementById(href);
				var linkPositionLeft = ele.offsetLeft;

				// create new element
				// populate new element with cloned heading and text from glossary
				popUp = document.createElement('div');
				popUpBox = glossaryItem.cloneNode(true);
				popUpHeading = document.createElement('h3');
				if (header !== null) {
					popUpHeadingText = document.createTextNode(header);				
					popUpHeading.appendChild(popUpHeadingText);
				}
				popUpClose = document.createElement('a');
				addEvent(popUpClose, 'click', toggleGlossaryPopup(href, ele, num));
				popUpClose.setAttribute('class', 'close');
				popUpClose.setAttribute('className', 'close');
				popUpCloseText = document.createTextNode('Close');
				popUpClose.appendChild(popUpCloseText);
				popUpFooter = document.createElement('p');
				
				if (footer !== null) {
					
					popUpFooterText = document.createTextNode(footer);
					popUpFooter.appendChild(popUpFooterText);
				}
				if (header !== null) { 
					popUp.appendChild(popUpHeading); 
				}
				
				popUp.appendChild(popUpClose);
				popUp.appendChild(popUpBox);
				popUp.appendChild(popUpFooter);
			
				// amend ID and class
				popUp.setAttribute('id', href + '-popup-' + num);
				popUp.setAttribute('class', 'glossary-popup');
				popUp.setAttribute('className', 'glossary-popup');
				
				// append new element beneath link
				ele.parentNode.insertBefore(popUp, ele);
			
				// position popup
				var popupId = popUp.getAttribute('id');
				jQ('#' + popupId).css("position", "absolute");
				jQ('#' + popupId).css("left", linkPositionLeft + ele.offsetWidth + "px");
				
			}
			
			// toggle display of new element
			toggleDisplay(popUp);

		};
	}
	
	function toggleDisplay(popUp) {
		popUp.style.display = popUp.style.display === ('block') ? popUp.style.display = 'none' : popUp.style.display = ('block');
	}
	
	attachLinksToGlossary('gloss-link', 'Glossary', '');
	attachLinksToGlossary('gu-gloss-link', null, null);
	insertStyleSheet('styles/glossary-popup.css');

}

addEvent(window, "load", glossaryPopupView);
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/guardian.geolocation.js */
/* GeoLocation 1.0 */

/** @namespace */
guardian = guardian || {};
(function (jQuery) {

    var url = "http://guardian-geo-location.appspot.com/geo-location";

    function GeoLocation() {
    }

    GeoLocation.cached = null;

    GeoLocation.prototype.getCachedGeoCode = function () {
        if (window.sessionStorage) {
            return sessionStorage.getItem("geoLocation_countryCode");
        } else {
            return this.cached;
        }
    };

    GeoLocation.prototype.setCachedGeoCode = function (countryCode) {
        if (window.sessionStorage) {
            sessionStorage.setItem("geoLocation_countryCode", countryCode);
        } else {
            this.cached = countryCode;
        }
    };

    GeoLocation.prototype.getGeoCode = function () {

        if (this.getCachedGeoCode()) {
            return jQuery.Deferred()
                .resolve(this.getCachedGeoCode())
                .promise();
        }

        var promise = jQuery.ajax({
            url:url,
            dataType:'jsonp',
            jsonpCallback: 'geolocation',
            cache: true
        });
        promise.then(jQuery.proxy(this.setCachedGeoCode, this));
        return promise;

    };

    GeoLocation.prototype.init = function () {

        var dataOnlyInCountry = jQuery("[data-only-in-country]");

        if (!dataOnlyInCountry.length) {
            return;
        }

        this.getGeoCode().then(function (actualCountryCode) {

            dataOnlyInCountry.each(function (i, obj) {

                var jObj = jQuery(obj),
                    expectedCountryCode = jObj.attr("data-only-in-country");

                if (expectedCountryCode.toUpperCase() !== actualCountryCode.toUpperCase()) {
                    jObj.closest(".embed").remove();
                }

            });

        });

    };

    guardian.GeoLocation = GeoLocation;

    jQuery(function() {
        new guardian.GeoLocation().init();
    })

})(jQuery);
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/guardian.r2.EmailToAFriend.js */
ensurePackage('guardian.r2');
guardian.r2.EmailToAFriend = (function (node, options, tracking_options) {
	jQ(function () {
		var email_forms = jQ(document.forms.emailthis);

		email_forms.bind('submit', function (e) {
			e.preventDefault();
			var form_elem = jQ(this);
			var form = this;
			var form_data = {};
            var page_url = jQ('meta[name="content-id"]').attr('content');
			var post_url = 'http://email-share.guardianapps.co.uk/share/content' + page_url;
			var submit_button = form_elem.find('input[type="submit"]');
			submit_button.attr('disabled', 'disabled');

			form_data.recipient		= this.to.value;
            form_data.from          = this.from.value;

            var errorFunc = function(jsonMessage) {
                submit_button.removeAttr('disabled');
                form_elem.find('.validation-error').remove();
                if (typeof(jsonMessage) !== 'string') { jsonMessage = 'There is a problem with this service. Please try again later.'; }
                form_elem.find('[name="to"]').after('<div class="validation-error">' + jsonMessage + '</div>');
            };


            jQ.ajax({
                url: post_url + '?recipient=' + form_data.recipient + '&from=' + form_data.from + '&callback=?',
                dataType: 'jsonp',
                data: {},
                success: function(data) {
                    var jsonStatus = data.status;

                    if (jsonStatus === 'ok'){
                        submit_button.removeAttr('disabled');
                        form_elem.find('.validation-error').remove();

                        form_elem.parents('.toolbox-popup').find('a.close-toolbox').click();
                        form.to.value = '';
                    }
                    else {
                        errorFunc(data.message);
                    }
                },
                error: errorFunc
            });
			return false;
		});
	});
})();

/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/guardian.r2.OmnitureTracking.js */
/*
 *  Written by Matt Andrews
 *
 *  Requires Omniture tracking
 *  Use as follows:
 *
 <a href="#" class="tracking-link">click me</a>

 var omniture = {
 "evars":
 [{
 "key": "37",
 "value": "Books:Carousel:Latest Reader Review"
 },
 {
 "key": "32",
 "value": "Books:Carousel:Something Else"
 }],

 "props":
 [{
 "key": "11",
 "value": "23 results found"
 }],

 "events":
 [{
 "id": "11"
 },
 {
 "id": "44"
 } ]
 }

 jQ(document).ready(function(){
 jQ('a.tracking-link').click(function(){
 track(omniture);
 });
 });
 *
 * */
ensurePackage('guardian.r2');
guardian.r2.OmnitureTracking = function track(omniture) {

	if (guardian.r2.omniture.isAvailable()) {
		var i = 0, len = 0;
		
		// first gather eVars and linkTrackVars
		if (omniture.evars) {
			var num_evars = omniture.evars.length;
			var evar_key_list = [];
			var evar_value_list = [];

			for (i = 0, len = omniture.evars.length; i < len; i++) {
				if (omniture.evars.hasOwnProperty(i)) {
					var evar = omniture.evars[i];

					// first build up array of keys
					if (i < num_evars - 1) {
						evar_key_list[i] = 'eVar' + evar.key;
						evar_value_list[i] = evar.value;

						// if we're on the last item, add it to the array
						// then *optionally* add the events var if events are set
						// (this avoids looping through the evars a second time)
						// todo: work out why i thought this was a good idea
					} else {
						evar_key_list[i] = 'eVar' + evar.key;
						evar_value_list[i] = evar.value;

						if (omniture.events) {
							var c = parseInt(i, 10) + 1; // avoid overwriting the current eVar
							evar_key_list[c] = 'events';
						}

						// turn the array into a string
						var linkTrackVars = evar_key_list.join(",");
						s.linkTrackVars = linkTrackVars;

						// now create the evars themselves
						for (var j, j_len = evar_key_list.length; j < j_len; j++) {
							if (evar_key_list[j] !== 'events') { // we add this one later
								s[evar_key_list[j]] = evar_value_list[j];
							}
						}
					}
				}
			}

		}
		// now gather events
		if (omniture.events) {
			var events_list = [];

			for (i = 0, len = omniture.events.length; i < len; i++) {
				if (omniture.events.hasOwnProperty(i)) {
					events_list[i] = 'event' + omniture.events[i].id;
				}
			}

			// now set the events variable
			var events = events_list.join(",");
			s.linkTrackEvents = events;
			s.events = events;

		}

		// and finally the props
		if (omniture.props) {
			for (i, len = omniture.props.length; i < len; i++) {
				if (omniture.props.hasOwnProperty(i)) {
					var prop = omniture.props[i];
					s['prop' + prop.key] = prop.value;
				}
			}
		}

		s.tl(true, 'o', omniture.description);
	}

	// IT LIVES!!!
	//console.log(s);

};
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/guardian.r2.ShareThis.js */
ensurePackage('guardian.r2');
guardian.r2.ShareThis = (function () {
	jQ(document).ready(function () {
		jQ('input.share-this-tracking, a.share-this-tracking, .share-this-tracking a').bind('click', function(e) {
			var is_input= this.tagName.toLowerCase() === 'input' ? true : false;
			
			var elem = jQ(this);
			var track_name = elem.data('link-name');
			var redirect = elem.data('trackredirect') === 'false' ? false : true;

			s.linkTrackVars = 'eVar12,events';
			s.linkTrackEvents = 'event16';
			s.eVar12 = track_name;
			s.events = 'event16';
			s.tl(this, 'o', this);
			
			// Revenue science
			rs_logSocialNetwork(track_name);

			if (!is_input) {
				e.preventDefault();
				var share_window = window.open(elem.attr('href'), 'gu_share', 'scrollbars=1,height=500,width=1010');
				return false;
			}
		});
	});
})();
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/modules/sticky-sidebar.js */
(function(jQ,k,m,i,d){var e=jQ(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){jQ.extend(this,{element:jQ(n),oldScroll:0,waypoints:[],didScroll:false,didResize:false,doScroll:jQ.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=jQ.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){jQ[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}jQ.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});jQ(n).scroll(jQ.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout(jQ.proxy(function(){this.doScroll();this.didScroll=false},this),jQ[m].settings.scrollThrottle)}},this)).resize(jQ.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout(jQ.proxy(function(){jQ[m]("refresh");this.didResize=false},this),jQ[m].settings.resizeThrottle)}},this));e.load(jQ.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;jQ.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=jQ.fn[k].defaults.context,q,t=jQ(this);if(n&&n.context){u=n.context}if(!jQ.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?jQ.fn[k].defaults:q.waypoints[p].options,r=jQ.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=jQ.isWindow(u)?jQ[m]("viewportHeight"):jQ(u).height();return v-jQ(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:null,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}if(n&&n.handler){t.bind(g,n.handler)}});jQ[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=jQ(p);jQ.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1)}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){jQ.each(f,function(r,s){var q=jQ.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?jQ[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();jQ.each(s.waypoints,function(u,x){if(!x){return}var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(x.options.onlyOnScroll){return}if(w!==null&&s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(w!==null&&s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}else{if(!w&&o>x.offset){b(x,["down"])}}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=jQ();jQ.each(f,function(o,p){jQ.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};jQ.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{jQ.error("Method "+n+" does not exist on jQuery "+k)}}}};jQ.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};jQ[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};jQ[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){jQ[m]("refresh")})})(jQuery,"waypoint","waypoints",this);

/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/sendtoafriend.js */
guardian.r2.OverlayPanel = function (selector) {

	function close() {
		if (visible) {
			visible = false;
			selector.removeAttr('style');
		}
		return false;
	}

	var visible = false;
	selector.find('a.close-toolbox').click(close);

	function toggle(xPos, yPos) {
		if (visible === false) {
			open(xPos, yPos);
		} else {
			close();
		}
	}

	function open(xPos, yPos) {
		visible = true;
		var x = getXCoordinate(xPos);
		selector.css('left', x).css('top', yPos + 25);
		selector.show();
	}

	function getXCoordinate(xPos) {
		var availableWidth = jQ(document).width();
		// if panel is going to display off the right of the screen, bring it in further
		if (xPos + 450 > availableWidth) {
			return xPos - 450;
		} else {
			return xPos;
		}
	}

	function getSelector() {
		return selector;
	}

	this.toggle = toggle;
	this.close = close;
	this.getSelector = getSelector;
};

guardian.r2.OverlayController = (function () {

	var anchors = [ 'embed-link', 'send-share', 'send-email', 'contact-link', 'history-link', 'settings-link' ];
	var panels = [];
	var activePanel = null;

	function init() {
		jQ('body').append('<div id="dialogue"></div>');
		jQ('div.toolbox-popup').appendTo('#dialogue');
		bind();
	}

	function bind() {
		var i= anchors.length;
		while(i--) {
			bindAnchors(anchors[i]);
		}
		
		jQ('body').click(function () {
			if (activePanel) {
				activePanel.close();
			}
		});

		jQ('.send-inner').click(function (e) {
			e.stopPropagation();
		});
	}

	function bindAnchors(anchor) {
		var panel = new guardian.r2.OverlayPanel(jQ('#' + anchor + '-box'));
		panels.push(panel);
		jQ('a.' + anchor).bind('click', function (target) {
			return function () {
				var offset = jQ(this).offset();
				if (activePanel && activePanel.getSelector() !== target.getSelector()) {
					activePanel.close();
				}
				activePanel = target;
				target.toggle(offset.left, offset.top);
				return false;
			};
		}(panel));
	}

	jQ(init);
})();
/* ed14f5867e9493fefef569a1d43f6fea92bd2b2b/common/scripts/signinTopNav.js */
jQ(document).ready(function () {
	var dropdowns = jQ('.drop-down');
	jQ('.drop-down').bind('click', function() {
		jQ(this).focus();
	});
	jQ(window).bind('click', function() {
		dropdowns.blur();
	});

	jQ('#editionSwitch a').click(function () {
		var currentEdition    = jQ('#edition-selector .current-edition').text(),
			switchToEdition   = jQ(this).text(),
			editionSwitchDesc = "Edition Change: " + currentEdition + " to " + switchToEdition;

		guardian.r2.OmnitureTracking({
			"evars": [{"key": "37", "value": editionSwitchDesc }],
			"events": [{"id": "37"}],
			"description": editionSwitchDesc
		});
	});
});
