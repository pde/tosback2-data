/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/convertJSONtoAd.js */
convertJSONtoAd = function (imgTarget, linkText, trailText, sponJSON, title, slot) {
	if (sponJSON && typeof(sponJSON) === 'object') {
		imgTarget.attr('src', sponJSON.ad.image).attr('alt', sponJSON.ad['alt-image-text']).parent().attr('href', sponJSON.ad.link);
		linkText.attr('href', sponJSON.ad.link).text(sponJSON.ad.linkText);
		trailText.text(sponJSON.ad.description);
		if (sponJSON.ad.title) {
			title.text(sponJSON.ad.title);
		}
		jQ('.json-features.' + slot).show();
	}
};
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/formChecker.js */
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

/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/glossaryPopupView.js */
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
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/guardian.r2.EmailToAFriend.js */
ensurePackage('guardian.r2');
guardian.r2.EmailToAFriend = (function (node, options, tracking_options) {
	jQ(function () {
		var email_forms = jQ(document.forms.emailthis);

		email_forms.bind('submit', function (e) {
			e.preventDefault();
			var form_elem = jQ(this);
			var form = this;
			var form_data = {};
			var post_url = this.action;
			var submit_button = form_elem.find('input[type="submit"]');
			submit_button.attr('disabled', 'disabled');

			form_data.to		= this.to.value;
			form_data.firstName	= this.firstName.value;
			form_data.surname	= this.surname.value;
			form_data.note		= this.note.value;

			jQ.ajax({
				url: post_url,
				type: 'post',
				data: form_data,
				dataType: 'html',
				success: function (d) {
					submit_button.removeAttr('disabled');
					form_elem.find('.validation-error').remove();
					
					var data = jQ(d);
					var mail_to_message = data.find('#mail-to-message');
					var mail_name_message =  data.find('#mail-name-message');

					if (mail_to_message.length === 0 && mail_name_message.length === 0) {
						form_elem.parents('.toolbox-popup').find('a.close-toolbox').click();
						form.to.value = '';
						form.firstName.value = '';
						form.surname.value = '';
						form.note.value = '';
					} else {
						form_elem.find('input[name="to"]').after(mail_to_message);
						form_elem.find('input[name="surname"]').after(mail_name_message);
					}
				},
				error: function (xhr, text, error) {
					submit_button.removeAttr('disabled');
					form_elem.find('.validation-error').remove();
					form_elem.find('[name="note"]').after('<div class="validation-error">There has been an error sending your mail. Please try again later.</div>');
				}
			});
			return false;
		});
	});
})();

/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/guardian.r2.OmnitureTracking.js */
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
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/guardian.r2.ShareThis.js */
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
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/sendtoafriend.js */
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
			return xPos - 100;
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
		for (var i = 0; i < anchors.length; i++) {
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

	jQ(document).ready(init);
})();
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/shareCounts.js */
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
			jQ.getJSON('http://graph.facebook.com/'+url+'?callback=?', function(response) {
				requestCache[url] = response.shares;

				// Insert counts into all instances of buttons with the same data-href attr
				if (typeof(response.shares) !== 'undefined') {
					jQ('.facebook-share-btn[data-href="'+url+'"]').after('<span class="facebook-share-count"><i></i><u></u>'+requestCache[url]+'</span>');
				}

			});
		}
	});
});
/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/signinTopNav.js */
jQ(document).ready(function () {
	var dropdowns = jQ('.drop-down');
	jQ('.drop-down').bind('click', function() {
		jQ(this).focus();
	});
	jQ(window).bind('click', function() {
		dropdowns.blur();
	});

	jQ('#editionSwitchLink').click(function () {
		var editionSwitchDesc = "Edition Change: US to UK";
		if (jQ(this).text() === "US") {
			editionSwitchDesc = "Edition Change: UK to US";
		}

		guardian.r2.OmnitureTracking({
			"evars": [{"key": "37", "value": editionSwitchDesc }],
			"events": [{"id": "37"}],
			"description": editionSwitchDesc
		});
	});
});

/* 9e8b82205d3e1e5b43897b809e8a92ac774af2ad/common/scripts/tweet_button.js */
jQ(function ($) {
	if ('undefined' === typeof twttr) {
		window.twttr = (function (d,s,id) {
			var t, js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
			js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
			return window.twttr || (t = { _e: [], ready: function(f) { t._e.push(f); } });
		} (document, 'script', 'twitter-wjs'));
	}

	twttr.ready(function(twttr) {
		twttr.events.bind('click', function(event) {
			if ('tweet' === event.region) {
				rs_logSocialNetwork('Twitter');
			}
		});
	});
});
