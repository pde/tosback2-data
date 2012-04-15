var HomepageHelper;

(function ($) {

	HomepageHelper = {
		initialize: function () {
			var self = this;
			
			$('.do_flyout').addHoverState();
			self.validateSearch();
			$('#vote_ttp').click(function (e) { self.openVote(e) });
		},
		
		exitSite: function (from, destination, windowName, options, goesto, pid, sSite) {
			if (typeof sSite == "undefined") sSite = "us";
			while (destination.indexOf('+') != -1)
				destination = destination.replace('+', 'FPSMBplusFPSMB');
		
			if (destination.indexOf("golink.asp") != -1)
				newWindow = window.open(destination + '&FPFrom=' + from, windowName, options);
			else 
				newWindow = window.open('/' + sSite + '/leaving.asp?FPDest=' + encodeURIComponent(destination) + '&FPFrom=' + escape(from) + '&goto=' + escape(goesto) + '&pid=' + pid, windowName, options);
		},		
		
		openVote : function (e) {
			e.preventDefault();		
			thisHref = $('#vote_ttp').attr('href');
			this.exitSite('/us/default.aspx?', thisHref, 'TTPVOTE', 'left=5,top=10,screenX=100,screenY=100,resizable=yes,location=yes,scrollbars=yes,toolbar=yes,menubar=yes,width=1000,height=590', 'Time to Play Vote', '-1', 'us');
		},
		
		validateSearch: function (options) {
			var defaults = {
				error_tooltip: false
			};
			
			var $input = $('#keyword_box');
			
			if ($input.length > 0) {
				var opts = $.extend({}, defaults, options);
				var placeholdable = ('placeholder' in document.createElement('input'));
				var default_text = $input.attr('placeholder');
				var error_text = $input.attr('data-error');

				if (!placeholdable) {
					if ($input.val() == '') {
						$input.val(default_text);
					}

					$input.blur(function () { 
						var $this = $(this);
						if ($.trim($this.val()) == '') {
							$this.val(default_text);
						}
					});
				}
			
				$input.focus(function () {
					var $this = $(this);

					if ($this.hasClass('error')) {
						$this.removeClass('error');
					}

					if ((!placeholdable && $.trim($this.val()) == default_text) || $.trim($this.val()) == $input.attr('data-error')) {
						$this.val('');
					}
				});
			
	//			$('#keywordsearch').submit(function () {
	//				return HomepageHelper.keywordValue();
	//			});
				$('form#keywordsearch').submit(function () {
					var $form = $(this);
					var from = "";
					if (location.href.match(/\/us\/default.aspx/i)) {
						from = "homepage";
					} else if($form.parents("#globalnav").length > 0) {
						from = "globalnav";
					} else {
						from = "innerpage";
					}

					if ($.trim($input.val()) != default_text && $input.val() != '' && $input.val() != $input.attr('data-error')) {
								//wt8 tracking for keyword search from homepage
						switch (from){
							case "homepage": 
								if(typeof Tracker != 'undefined') Tracker.track({name:'Search',campaign:CAMPAIGN.NONE,channel:CHANNEL.HOME,contenttype:CONTENTTYPE.BUTTON,action:ACTION.CLICK});
								break;
							case "globalnav":
								if(typeof Tracker != 'undefined') Tracker.track({name:'Global Nav Search Button',campaign:CAMPAIGN.NONE,channel:CHANNEL.HOME,contenttype:CONTENTTYPE.BUTTON,action:ACTION.CLICK});
								break;
							case "innerpage":
								if(typeof Tracker != 'undefined') Tracker.track({name:'Search Button',campaign:CAMPAIGN.NONE,channel:CHANNEL.INNER,contenttype:CONTENTTYPE.BUTTON,action:ACTION.CLICK});
								break;
							default: break;
						}
	//					if (location.href.match(/\/us\/default.aspx/i)) {
	//						if(typeof Tracker != 'undefined') Tracker.track({name:'Search',campaign:CAMPAIGN.NONE,channel:CHANNEL.HOME,contenttype:CONTENTTYPE.BUTTON,action:ACTION.CLICK});
	//					}
						return true;
					} else {
						$input.blur();
						if (opts.error_tooltip) {
							$.getUniqueScript('/pages/script/jquery/jquery.fp.plugin.tooltip.js', function () {
								$form.tooltip(opts.error_text, { name: 'search', corner: true });
							});
						} else {
							$input.val($input.attr('data-error'));

							if(!$input.hasClass('error')) {
								$input.addClass('error');
							}
						}
						return false;
					}
				});
			}
		},
		
		hasImages: function () {
			var img = new Image();
			var tmp = new Date();
			var suffix = tmp.getTime();
			
					//suffix ensures a unique image, so that IE won't use it's cached image but will instead look for a "new" image			
			$(img).attr('src', '/img/spacer.gif?'+suffix)
					.load( function() {	
						HomepageHelper.assignBodyClass();
					});
		},

		assignBodyClass: function () {
			var $body = $('body');
			if(!$body.hasClass('images')) {
				$body.addClass('images');
			}
		},
		
		keywordValue: function () {

			var theForm = $('#keywordsearch');
			var keyword = $('#keyword_box').val();
			
			if ((keyword.toLowerCase() == 'search') || (keyword == '') || (keyword == 'Enter keyword or item #')) {
				$('#keyword_box').blur();				
				if(!$('#keyword_box').hasClass('error')) {
					$('#keyword_box').addClass('error');
				}
				return false;
			}			
			
					//wt8 tracking for keyword search from homepage
			if (location.href.match(/\/us\/default.aspx/i)) {
				if(typeof Tracker != 'undefined') Tracker.track({name:'Search',campaign:CAMPAIGN.NONE,channel:CHANNEL.HOME,contenttype:CONTENTTYPE.BUTTON,action:ACTION.CLICK});
			}
					// now we call tracking function to add keyword searches to WebTrends WRC Reports
					// Object detection to determine whether we have new or old tracking script available
//			if (typeof Tracker != 'undefined') {
//				
//						// If we're on a new dotnet page, hit the search report
//				Tracker.trackInterstitial('search', 'keyword', keyword);
//				
//			} else if (typeof TrackInterstitial == 'function') {
//						// If we have old tracking script and we're on the US homepage, hit golink report ...
//				if (location.href.match(/\/us\/default.asp/i)) {
//					TrackInterstitial('Homepage', 'Section', 'Button - GO');
//				}
//						// ... and the search report
//				TrackInterstitial('search', 'keyword', keyword);	
//			}
			
			return true;
		},
		
		getPhotoupload: function () {
			var options = {
				controller: '/fpxml.aspx',
				state: 10,
				event: 'getphotos'
			};	
			var query = options.controller;				
			var currentDate		= new Date();
			var maxdate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
			
			var dataXml =	
				'<request st="' + options.state +  '" e="' + options.event + '">' + 
				'<parameters>' +
				'<parameter name="uimaxdate">' + maxdate.getFullYear()+"-"+(maxdate.getMonth()+1)+"-"+maxdate.getDate() + '</parameter>' +
				'</parameters></request>';
				
			$.post(query, dataXml, function(xml){
				HomepageHelper.processPhotoXml(xml);
			  }, "html");

		},
		
		processPhotoXml: function (xml) {
				var xmlDoc = null;
				var imageToLoad = "";
				var captionForReplacement = "";
				var thisMonth = (new Date()).getMonth() + 1;
				var thisYear = (new Date()).getFullYear();
				//check if ie
				try {
					if($.browser.msie) {
						xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
						xmlDoc.async="false";
						xmlDoc.loadXML(xml);
					} else {
						var parser = new DOMParser();
						xmlDoc = parser.parseFromString(xml, "text/xml");
					}
				} 
				catch (err) {
					//this.onAjaxFailure(xml);
				}
				
				var $photoupladDiv = $('#photo-upload');
				var elements = new Array();
				var images = xmlDoc.getElementsByTagName('userInput');	
			    
				try {
					if(images == null || images.length == 0) {
						// reserved for future use like inserting default picture
					}
					else {
						var randomEntry = Math.floor(Math.random() * images.length) + 1;
						var userInput = images[randomEntry];
						var albumPage = 1;
				    
						var uiid = userInput.getAttribute('id');		    
						var attributeNodes = userInput.getElementsByTagName('attribute');
						var captionForImage = 'Caption Not Found!';
				        
						for(i=0; i < attributeNodes.length; i++){
							var code = attributeNodes[i].getAttribute('code');    			
							switch(code){
								case 'photoCaption': 
									captionForImage = attributeNodes[i].firstChild.firstChild.nodeValue;
									if(captionForImage.length > 100) {
										captionForImage = captionForImage.substring(0, captionForImage.substring(0,100).lastIndexOf(' ')); 
									}
									break;
								case 'thumb183URL': 
									imageToDisplay = ('http://' + window.location.hostname + attributeNodes[i].firstChild.firstChild.nodeValue).replace(/\\/g,"/");
									break;
								default:
									//maybe default load failed caption and image
									break;
							}
						}	        
						var href_viewphoto = '/fp.aspx?st=10&e=viewphoto' + '&uiid=' + uiid + '&m='+ thisMonth + '&y='+ thisYear + '&albumpage=' + albumPage;			
						var href_viewalbum = '/fp.aspx?st=10&e=viewalbum' + '&uiid=' + uiid + '&m='+ thisMonth + '&y='+ thisYear + '#thumbnail-div';
						/*
						<dl id="photo">
							<dt><a id="imagelink"><img id="mainimage" src="/img/s.gif" style="width:183px; height:137px;" alt=""/></a></dt>
							<dd id="caption"><fp:copy name="PhotoCaption" runat="server"/></dd>
						</dl>
						<p id="viewlarger"><a track="Tile - Photo Upload">View Larger</a></p>
						<p id="seemore"><a track="Tile - Photo Upload">See More</a></p>
						<p id="sendyours"><a href="/fp.aspx?st=10&amp;e=uploadphoto" track="Tile - Photo Upload">Send us your photo</a></p>							
						*/
						$('#imagelink').attr('href', href_viewphoto);
						$('#viewlargerlink').attr('href', href_viewphoto);
						$('#seemorelink').attr('href', href_viewalbum);
						$('#mainimage').attr('src', imageToDisplay);
						$('#caption').text(captionForImage); 
					}
				} catch (err) {
				}
		},
		
		formatBrandTiles: function(scroll) {
			var self = this;
			var cookieName = "hpBrandsStart";
			var start = 1;
			
			if (!readCookie(cookieName) || parseInt(readCookie(cookieName))== NaN){
				start = 1;
			} 
			else {
				start = parseInt(readCookie(cookieName));
			}
			
			$("#brand-tiles li").click(function () {
			  var index = $("#brand-tiles li").index(this);
			  start = self.getTilesStartPosition("#brand-tiles", scroll, index)
			  document.cookie = cookieName + "=" + start + ";";				
			});
			
			var jcarousel = {
						start: start,
						scroll: scroll
					};
			$container = $('#brand-tiles');
			$items = $('li', $container);
			$('ul', $container).jcarousel({ 
				size: $items.length, 
				scroll: jcarousel.scroll,
				start: jcarousel.start
			});
				// This is to fix the alert from jcarousel.js
//			var defaultCssObj = {
//				'height' : '45px',
//				'width' : '97px',
//				'margin-right' : '9px',
//				'margin-left' : '0px',
//				'margin-top' : '0px',
//				'margin-bottom' : '0px'
//			  }
//			$('#brand-tiles .jcarousel-item').css(defaultCssObj);
		},
		
		formatPlaytimeTiles: function(scroll) {
			var self = this;
			var cookieName = "hpPlaytimeStart";
			var start = 1;
			
			if (!readCookie(cookieName) || parseInt(readCookie(cookieName))== NaN){
				start = 1;
			} 
			else {
				start = parseInt(readCookie(cookieName));
			}
			
			$("#playtime-tiles li").click(function () {
			  var index = $("#playtime-tiles li").index(this);
			  start = self.getTilesStartPosition("#playtime-tiles", scroll, index)
			  document.cookie = cookieName + "=" + start + ";";				
			});

			var jcarousel = {
						start: start,
						scroll: scroll
					};
			$container = $('#playtime-tiles');
			$items = $('li', $container);
			$('ul', $container).jcarousel({ 
				size: $items.length, 
				scroll: jcarousel.scroll,
				start: jcarousel.start
			});
		},
		
		getTilesStartPosition: function (divTile, scroll, index) {
			$container = $(divTile);
			$items = $('li', $container);
			size = $items.length;
			var start = 1;
			if(index <= 0 || size <= 0 || index >= size) {
				start = 1;
			} else {
				start = Math.floor(index / scroll) * scroll + 1;
			}
			return start;
		},
		
		popUnder: function(url, cookieName, popCount) {
		
			// url: either an array of URLs, or a string url
			//		when url is an array, randomly popup one of the urls.
			//		when url is a string url, check cookie and popCount.
			
			var selectedUrl = "";
			var useCookie = false;
			var curCount = 0;
			if($.isArray(url)){
				var randomIndex = Math.floor(Math.random()*url.length);
				selectedUrl = url[randomIndex];
			} else {
				selectedUrl = url;
				useCookie = (cookieName && cookieName!="" && popCount > 0);				
				if (useCookie && (!readCookie(cookieName) || parseInt(readCookie(cookieName))== NaN)){
					writeCookie(cookieName, 0);
				}
			}
			
			if (selectedUrl != null && selectedUrl != "") {
			var options = selectedUrl.split('|');				
			var settings = {
				width: options[1] || 800,
				height: options[2] || 600,
				winname: options[3] || 'TheNewpop',
				scrollbars: ($.inArray('scrollbars', options) != -1) ? 1 : 0,
				resizable: ($.inArray('resizable', options) != -1) ? 1 : 0,
				toolbar: ($.inArray('toolbar', options) != -1) ? 1 : 0,
				status: ($.inArray('status', options) != -1) ? 1 : 0,
				location: ($.inArray('location', options) != -1) ? 1 : 0,
				menubar: ($.inArray('menubar', options) != -1) ? 1 : 0
			};
			
			if(!useCookie || (curCount = parseInt(readCookie(cookieName))) < popCount) {
				NewWin=window.open(options[0],settings.winname,'top=50,left=50,width=' + settings.width + ',height=' + settings.height + ',scrollbars=' + settings.scrollbars + ',toolbar=' + settings.toolbar + ',status=' + settings.status + ',resizable=' + settings.resizable + ',location=' + settings.location + ',menubar=' + settings.menubar);
			}
			
			if (NewWin) {
				NewWin.blur();
				setTimeout('NewWin.blur();',0);
				if(useCookie) writeCookie(cookieName, curCount+1);
			}
			}
		},
		
		getRMASequence: function(number_of_sets) {
			var cookieName = 'hpRMASequence';
			var sequence = Math.floor(Math.random() * number_of_sets) + 1; // randomize the set number on initial load
			var curSeq = 1;
			if(!readCookie(cookieName) || parseInt(readCookie(cookieName))== NaN) {
				writeCookie(cookieName, sequence);
			} else {
				curSeq = parseInt(readCookie(cookieName));
				if(curSeq >= number_of_sets) {
					sequence = 1;
				} else {
					sequence = curSeq + 1;
				}
				writeCookie(cookieName, sequence);
			}
			return sequence;
		}
		
		
	};

	$(document).ready(function () {
		HomepageHelper.initialize();
	});
	
	// following functions are used by flash tiles
	//this is for the old shoshkeles flash redirect
	trackandgo = function(sLink, sWebTrack) { 
		if(typeof (document.wt) != 'undefined'){
			document.wt.trackInterstitial('homepage', 'Section', sWebTrack);
		}
		location.href = sLink;
	};
	//this is for the shoshkeles flash remove itself from page after playing the movie
	removeElements = function (el, elClass) {
		$(el + "." + elClass).remove();
	};
	
	writeCookie = function (name, value){
		var nextYear = new Date();
		nextYear.setFullYear(nextYear.getFullYear() + 1);
		var cookie = name + "=" + value + ";";			
		document.cookie = cookie + "expires="+ nextYear.toGMTString();
	};	
	readCookie = function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	openWin = function (url, name, options) {
		var win;
		win = window.open(url, name, options);
	};
	exitSite = function(from, destination, windowName, options, goesto, pid, sSite) {
		HomepageHelper.exitSite(from, destination, windowName, options, goesto, pid, sSite);
	}

}) (jQuery);


