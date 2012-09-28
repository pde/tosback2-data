var RWWApp = (function(window, document, $, Socialite, _gaq, _kmq, RWShare, undefined){$(function(){

	var a = navigator.userAgent||navigator.vendor||window.opera; // for isMobile
	var self = this,
		updateTimeout = null, // socializer scrolling timer
		showEntryTimeout = null,
		socialised = { },
		
		// cached selectors
		$win = $(window),
		$body = $('body'),
		$sidebar = $(".sidebar"),
		$footer = $("footer"),
		$alpha = $("#alpha"),
		$beta = $("#beta"),
		$newsletter = $('.social .mail'),
		$socialInit = $('div.social-init, #social-share-horz, #social-share-vert, div#paper-0'),
		$entries = $('div.entry-listing ul li, div.entry-featured'),
		inHome = $('a.home')[0],
		
		// check for mobile browsers
		isMobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)) || navigator.userAgent.match(/iPad/i) != null
	;
	
	// Detect if the browser is a mobile browser or a desktop browser and conditionally include your JavaScript
	if(isMobile) {
		$body.addClass('is-mobile');
	} else {
		$body.addClass('is-desktop');
		
		$.getScript(window._conf.root+'js/variscroll.min.js', function(){
			$sidebar.variScroll({
				ratio: 0.1,
				isRollbackEnabled: true,
				isManual: true,
				isOuterContainerHeightChangeEnabled: false,
				outerContainer: $beta,
				footerElement: $footer
			});
		});
	}
	
	$newsletter.click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		window.open('http://readwriteweb.us2.list-manage.com/subscribe?u=f5a0df2d9082c86e808468c10&id=9fbeb5d667', 'popupwindow', 'scrollbars=yes,width=620,height=550');
		RWShare.trackEvent({type: false, href: undefined},'Header','click','newsletter');
		return false;
	});
	
	// the search field
	$('#search-submit-text').focus(function(){$(this).parent().addClass('focus')});
	$('#search-submit-text').blur(function(){$(this).parent().removeClass('focus')});
	
	// for the slider on entry pages
	$('#upprev_close').click(function(){
		$('#upprev_box').remove();
	});
	
	// load right away, entry page, basic page
	$socialInit.each(function(e) {
		Socialite.load($(this)[0]);
		$(this).find('.static-social-horz').hide();
		$(this).find('.dynamic-social-horz').fadeIn(1000);
	});
	
	var getScrollY = function() {
		scrOfY = 0;
		if( typeof( window.pageYOffset ) == "number" ) {
			scrOfY = window.pageYOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			scrOfY = document.body.scrollTop;
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			scrOfY = document.documentElement.scrollTop;
		}
		return scrOfY;
	}
	
	// listing pages on scroll loader
	var onUpdateThrottled = function() {
		//
		// lazy loading social buttons
		//
		
		// switch left and center social buttons
		if($win.width() < 1114 ){
			$('#social-share-vert').hide();
			$('#social-share-horz').fadeIn(1000);
		} else {
			$('#social-share-horz').fadeOut(1000);
			$('#social-share-vert').fadeIn(1000);
		};
		
		// viewport bounds
		var	wT = $win.scrollTop(),
			wL = $win.scrollLeft(),
			wR = wL + $win.width(),
			wB = wT + $win.height();
		// check which articles are visible and socialise!
		for (var i = 0; i < $entries.length; i++) {
			if (socialised[i]) {
				continue;
			}
			// article bounds
			var	art = $($entries[i]),
				aT = art.offset().top,
				aL = art.offset().left,
				aR = aL + art.width(),
				aB = aT + art.height();
			// vertial point inside viewport
			if ((aT >= wT && aT <= wB) || (aB >= wT && aB <= wB)) {
				// horizontal point inside viewport
				if ((aL >= wL && aL <= wR) || (aR >= wL && aR <= wR)) {
					socialised[i] = true;
					Socialite.load($entries[i]);
					$($entries[i]).find('.static-social-horz').hide();
					$($entries[i]).find('.dynamic-social-horz').fadeIn(1000);
				}
			}
		}
	};
	
	var onUpdate = function(e) {
	
		// throttled to run only every 250ms
		
		if (updateTimeout) {
			clearTimeout(updateTimeout);
		}
		updateTimeout = setTimeout(onUpdateThrottled, 250);
		
		// run every tick
		
		var scrollY = getScrollY();
		var inHomeTriggerY = $('.subheader-bar')[0].offsetTop - $('#ubernav')[0].clientHeight;
		
		if(scrollY >= inHomeTriggerY && inHome) {
			$('a.home').addClass('home-mini').removeClass('home');
		} else if (scrollY < inHomeTriggerY && !inHome) {
			$('a.home-mini').addClass('home').removeClass('home-mini');
		}
		
		if($('body.entry-page')[0]) {
			window.showingUprev = window.showingUprev || false;
			var articleEnd = $('div.entry-words')[0].offsetHeight + $('div.entry-words')[0].offsetTop - 240;
			//alert($('div.entry-words')[0].offsetHeight + $('div.entry-words')[0].offsetTop );
			var uprevTriggerY = articleEnd - 900;
			var uprevTriggerY2 = $('footer')[0].offsetTop - window.innerHeight;
			
			// for the slider on entry pages
			if (scrollY >= uprevTriggerY2 && showingUprev) {
				// past the footer
				$('#upprev_box').hide();
				window.showingUprev = false;
			} else if(scrollY >= uprevTriggerY && scrollY < uprevTriggerY2 && !showingUprev) {
				// bottom of article
				$('#upprev_box').show().animate({
					right: 0
				});
				window.showingUprev = true;
			} else if (scrollY < uprevTriggerY && showingUprev) {
				// top of page and article
				$('#upprev_box').animate({
					right: -500
				}, function(){
					$('#upprev_box').hide();
				});
				window.showingUprev = false;
			}
			
			// for Social icons in the left in entry page
			if ( scrollY > articleEnd) { 
				var endScrollPt = scrollY - articleEnd; 
				$('#social-share-vert').css('top', -(endScrollPt));
			}
			else if(scrollY > ($('#content').offset().top - 30) ) {
				var startPt = $('#ubernav')[0].clientHeight + 15;
				$('#social-share-vert').css('top', startPt);
			} else {
			    var startScrollPt = $('#content').offset().top - scrollY;
				$('#social-share-vert').css('top', startScrollPt);
			}
			
		}
	};
	
	// set up the event callbacks
	$win.resize(onUpdate).scroll(onUpdate);
	
	// now trigger everything to start loading
	onUpdate();

});}(window, document, jQuery, Socialite, window._gaq || [], window._kmq || [], RWShare));