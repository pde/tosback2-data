(function(e,x){if(e.TRC){return}e.TRC={};var c="_taboola",r=null,q=[],t=null,d=[],k=null,a=false,o=[],g={publisher:TRC.publisherId="dailymotion"},m=false,n=null;function b(){}function u(){var z,y;while(z=o.shift()){switch(z.notify){case"videoPlay":y=r.delayedDispatchLoadRequest!=null;for(p in r.boxes){y=true}if(y){r.playVideo(z.id,z.url);continue}(function(A){TRC.aspect.after(r,"handleLoadResponse",function(){r.playVideo(A.id,A.url)},true)})(z)}}}function j(){k=null;if(a){while(d.length){r.pollTillContainerAvailable(d.shift())}return}a=true;r.loadRBox.apply(r,d);d=[];(b=u)()}function w(){}function v(){if(!d.length){return m=false}if(m){m=false;j();return}if(k!=null){e.clearTimeout(k)}k=e.setTimeout(j,500)}TRC.ready=function(z){var y={"modes":{"rbox-blended":{"component-id":"rbox-blended","tabbed":false,"header":"Videos","expandable":false,"list-size":4,"orientation":"horizontal","navigation-type":"paging","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"124","thumbnail-height":"82","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,description","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"");}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d);},"sponsored-location":"thumbnail-top","thumbnail-position":"top","emblem":"http:\/\/cdn.taboolasyndication.com\/taboola\/play-light.png","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;<\/span>|<span class=\"pager-cont\">&raquo;<\/span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"none","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title,url","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"bottom","shade-scroll":true,"attribution-text":"<span>by<span style=\"font-size:12px;\">Taboola<\/span><\/span>","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":300,"maxWc":369,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":370,"maxWc":529,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":530,"maxWc":750,"minWsRange":8,"maxWsRange":11,"n":4}],"rows":1},"verticalx15":{"component-id":"rbox-c2v","tabbed":false,"header":"Suggestions","layout-template":"Horizontal 4","style-template":"Light","color-scheme":"White","title":"Related Videos","expandable":false,"list-size":15,"orientation":"vertical","attribution-position":"bottom","navigation-type":"scrolling","pager-type-style":"numbers","pager-position":"start","pager-button-location":"pager","pager-button-style":"<span class=\"pager-cont\">&laquo;<\/span>|<span class=\"pager-cont\">&raquo;<\/span>","shade-scroll":false,"attribution-text":"<span>by Taboola<\/span>","required-attributes":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"107","thumbnail-height":"60","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":	function(uploader){
		var uploaderName = uploader.substring(27),
			html = ['<span class="uploaderPrefix">By</span>'];
		html.push('<a class="video-uploader" href="', uploader, '" ');
		html.push('title="', uploaderName, '">', uploaderName, '</a>');
		return html.join('');
	}
,"format-views":	function(views){
		return views && views > 0 ? this.formatNumber(views) + '<span class="viewsSuffix">views.</span>' : '';
	}
,"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d);},"format-external-data":'%s',"sponsored-location":"top","thumbnail-position":"start","detail-order":"title,uploader,views","detail-order-ad":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"");}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":	function(itemsContainer, data){
		TRC.dom.addClass(data.element, 'trcLoaded');
		TRC.dom.addClass(data.element, window.TRC.Browser.isOutdatedBrowser() ? 'badBrowser' : 'goodBrowser');
		var spriteAnimator = {
			config: {
				effect: {
					duration: 8,
					pulses: 4,
					fps: 25,
					beforeUpdate: function(effect){
						window.TRC.customJs.currentEffect = effect;
						var isFrame = effect.currentFrame % this.fps === 0,
							frameNum = isFrame && effect.currentFrame / this.fps,
							isBackHidden = frameNum % 2 === 0,
							newTop,
							framesConf = spriteAnimator.config.frames,
							frameToMove = isBackHidden ? framesConf.back : framesConf.front;
						if (isFrame) {
							newTop = frameToMove.current + framesConf.stepSize;
							old = frameToMove.current;
							frameToMove.current = newTop < frameToMove.end ? frameToMove.start : newTop;
							if (window.TRC.customJs.debug) {
								console.log(frameNum, '-> ', isBackHidden ? 'back' : 'front', ' is invisible, moving it: ', old, ' -> ', frameToMove.current);
							}
							frameToMove.image.setStyle({top: frameToMove.current + 'px'});
						}
					},
					afterFinish: function(){}
				},
				frames: {
					stepSize: -160,
					back: {
						start: -10,
						end: -490,
						current: null,
						image: null
					},
					front: {
						start: -90,
						end: -580,
						current: null,
						image: null
					}
				}
			},
			pulsate: function($frontImage, $backImage){
				$backImage.setStyle({opacity: 1});
				var conf = this.config,
					frameBack = conf.frames.back,
					frameFront = conf.frames.front;
				frameBack.current = frameBack.start,
				frameBack.image = $backImage;
				frameFront.current = frameFront.start;
				frameFront.image = $frontImage;
				new Effect.Pulsate($frontImage, conf.effect);
			},
			resetImageView: function(image){
				if (image) {
					image.setStyle({opacity: 0, top: '-10px'});
				}
			},
			stopCurrentEffect: function(){
				var currentEffect = window.TRC.customJs.currentEffect,
					framesConfig = this.config.frames,
					$backImage = framesConfig.back.image,
					$frontImage = framesConfig.front.image;
				if (currentEffect && currentEffect.cancel) {
					if (window.TRC.customJs.debug) {
						console.log('another effect is running - cancelling.');
					}
					currentEffect.cancel();
					this.resetImageView($backImage);
					this.resetImageView($frontImage);
				}
			},
			/** Begins sprite animation by grabbing the images, fades front image in */
			start: function(e){
				var $frontImage = $(e.element()).select('.trcPreview.trcFront > img')[0],
					$backImage = $(e.element()).select('.trcPreview.trcBack > img')[0],
					that = this,
					frameConfig = that.config.frames;
				/** Ignore non relevant targets */
				if (!$frontImage || $frontImage.tagName !== 'IMG' || !$backImage || $backImage.tagName !== 'IMG') {
					return;
				}
				that.stopCurrentEffect();
				if (window.TRC.customJs.debug) {
					console.log('start:', $frontImage, $backImage);
				}
				frameConfig.front.image = $frontImage;
				frameConfig.back.image = $backImage;
				var pulsate = function(){
					that.pulsate($frontImage, $backImage);
				};
				that.config.effect.afterFinish = pulsate;
				
				if ($frontImage && window.Effect) {
					new Effect.Opacity($frontImage, {
						duration: 1,
						beforeUpdate: function(effect){
							window.TRC.customJs.currentEffect = effect;
						},
						afterFinish: pulsate
					});
				}
			},
			mouseOut: function(e){
				window.TRC.dom.stop(e);
				if (window.TRC.customJs.debug) {
					console.log('out: ', e, e.element());
				}
				spriteAnimator.stopCurrentEffect();
			}
		}
		if (window.TRC.Browser.isOutdatedBrowser() && window.$ && window.Effect) {
			$(itemsContainer).select('.videoCube .thumbBlock').each(function(el){
				el.observe('mouseenter', function(e){
					if (window.TRC.customJs.debug) {
						console.log('mouseenter', e);
					}
					spriteAnimator.start(e);
				});
				el.observe('mouseleave', spriteAnimator.mouseOut);
			});
			$(itemsContainer).select('.videoCube .thumbBlock .trcPreview img').each(function(el){
				$(el).setStyle({opacity: 0});
			});
		}
		var	clearDiv = data.element.lastChild,
			ogMetas = document.head.getElementsByTagName('meta'),
			allVideosText = 'See all videos »',
			allVideosHtml = ['<a title="', allVideosText, '" href="/related/', window.trc_video_id, '/1?videoid='],
			relatedVideoId;
		for (var i = 0; i < ogMetas.length; i++) {
			var meta = ogMetas[i],
				property = meta.attributes['property'] && meta.attributes['property'].value === 'og:image',
				content = property && meta.attributes['content'] && meta.attributes['content'].value && meta.attributes['content'].value.match(/([^\/]+):[^\/]+$/);
			if (content) {
				relatedVideoId = content.pop();
				break;
			}
		}
		allVideosHtml.push(relatedVideoId, '&relatedtype=related&related_algo=Taboola">', allVideosText, '</a>')
		clearDiv.innerHTML = allVideosHtml.join('');
		TRC.dom.addClass(clearDiv, 'trcMoreVideos');
	}
,"item-data-filter":function(data) {},"item-renderer":	(function(){
		window.TRC.customJs = window.TRC.customJs || {
			currentEffect: null,
			debug: false
		};
		/** Traverses el's ancestors looking for one with class className.
		  *	Returns first found element, or null if none found. */
		var getParentByClass = function(el, className){
				while (el) {
					if (el.nodeType === 1 && el.className && el.className.indexOf(className) !== -1) {
						return el;
					}
					el = el.parentNode;
				}
				return null;
			},
			hasClass = function(el, cls){
				return el.classList && el.classList.contains ? el.classList.contains(cls) : el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
			},
			addClass = window.TRC.dom.addClass = window.TRC.dom.addClass || function(el, cls){
				if (el.classList && el.classList.add) {
					el.classList.add(cls);
				} else {
					if (!hasClass(el, cls)) {
						el.className += ' ' + cls;
					}
				}
			},
			removeClass = function(el, cls){
				if (el.classList && el.classList.add) {
					el.classList.add(cls);
				} else {
					if (hasClass(el, cls)) {
						var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
						el.className = el.className.replace(reg, ' ');
					}
				}
			},
			stop = window.TRC.dom.stop = window.TRC.dom.stop = function(e){
				e = e || event;
				e.cancelBubble = true;
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.returnValue = false;
			},
			/** Checks whether CSS property is supported, either standard or a vendor prefixed one. If supported by browser, returns name, otherwise false. */
			isCssSupported = window.TRC.dom.isCssSupported = window.TRC.dom.isCssSupported || (function(){
				var	checked = {},
					prefixes = ['Webkit', 'Moz', 'Ms', 'O'],
					elementStyle = document.createElement('div').style,
					capitaliseFirstLetter = function(str) {
						return str.charAt(0).toUpperCase() + str.slice(1);  
					};
				return function(property) {
					if (typeof checked[property] !== 'undefined') {
						return checked[property];
					}
					return checked[property] = (function(){
						if (typeof elementStyle[property] !== 'undefined') {
							return property;
						}
						for (var i = 0; i < prefixes.length; i++) {
							var vendorProperty = prefixes[i] + capitaliseFirstLetter(property);
							if (typeof elementStyle[vendorProperty] !== 'undefined') {
								return vendorProperty;
							}
						}
						return false;
					}());
				};
			}()),
			scriptLoader = {
				prototypeJs: {
					src: 'http://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js',
					isLoaded: function(){
						return typeof window.Prototype !== 'undefined';
					}
				},
				scriptaculous: {
					src: 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.9.0/effects.js',
					isLoaded: function(){
						return typeof window.Effect !== 'undefined';
					}
				},
				loadedScripts: {},
				loadCallback: function(src){
					this.loadedScripts[src] = 'loaded';
					if (window.TRC.customJs.debug) {
						console.log('loaded dependency:', src);
					}
				},
				firstScript: document.getElementsByTagName('script')[0],
				/** Loads script from src, testing success via testFn, on success calls callback */
				load: function(src, testFn, callback){
					//console.log(this.loadedScripts);
					if (testFn && testFn() || this.loadedScripts[src]) {
						if (callback) {
							callback();
						}
						return;
					}
					this.loadedScripts[src] = 'loading';
					var s = document.createElement('script');
					s.type = 'text/javascript';
					s.onload = callback;
					s.async = false;
					/** IE 6 & 7 */
					s.onreadystatechange = function(){
						if (this.readyState === 'complete' && callback) {
							callback();
						}
					};
					s.src = src;
					this.firstScript.parentNode.appendChild(s);
				},
				loadDependencies: function(){
					if (window.TRC.customJs.debug) {
						console.log('loading dependencies');
					}
					var	that = this,
						innerCallback = function(){
							return that.loadCallback(that.scriptaculous.src);
						},
						callback = function(){
							that.load(that.scriptaculous.src, that.scriptaculous.isLoaded, innerCallback);
							return that.loadCallback(that.prototypeJs.src);
						};
					this.load(this.prototypeJs.src, this.prototypeJs.isLoaded, callback);
				}
			},
			isOutdatedBrowser = window.TRC.Browser.isOutdatedBrowser = (function(){
				var isOutdated;
				return function(){
					if (typeof isOutdated === 'undefined') {
						if (isOutdated = !isCssSupported('transition') || !isCssSupported('animation')) {
							if (!window.$ || !window.Effect) {
								scriptLoader.loadDependencies();
							}
						}
						if (window.TRC.customJs.debug) {
							console.log('browsers is outdated?', isOutdated);
						}
					}
					return isOutdated;
				}
			}()),
			quickListClasses = {
				base: 'trcQuicklist',
				added: 'trcQuicklistAdded'
			},
			playlist = {
				queue: [],
				add: function(e){
					e = e || event;
					var ql = e.currentTarget || getParentByClass(e.srcElement, quickListClasses.base);
					if (!hasClass(ql, quickListClasses.added)) {
						addClass(ql, quickListClasses.added);
						if (window.TRC.customJs.debug) {
							playlist.queue.push(ql);
							console.log('add', playlist.queue);
						}
						if (window.DM_Widget_PageItem_Video_Preview && DM_Widget_PageItem_Video_Preview.addToQuicklist) {
							window.DM_Widget_PageItem_Video_Preview.addToQuicklist(ql.parentNode.parentNode.parentNode, null, e);
						}
						if (isOutdatedBrowser()) {
							this.deflate(e);
						}
					}
					stop(e);
				},
				inflate: function(e){
					e = e || event;
					var ql = e.currentTarget || getParentByClass(e.srcElement, quickListClasses.base);
					if (!hasClass(ql, quickListClasses.added) && window.Effect) {
						new Effect.Morph($(ql).select('span')[0], {style: {width: '56px'}, duration: 0.5});
					}
				},
				deflate: function(e){
					e = e || event;
					stop(e);
					var ql = e.currentTarget || getParentByClass(e.srcElement, quickListClasses.base);
					if (window.$) {
						$(ql).select('span')[0].setStyle({width: ''});
					}
				},
				getElement: (function(){
					var quicklist = document.createElement('span');
					quicklist.appendChild(quicklist.cloneNode(true));
					quicklist.className = quickListClasses.base;
					return function(){
						var ql = quicklist.cloneNode(true);
						TRC.dom.on(ql, 'click', this.add.trcBind(this));
						if (isOutdatedBrowser()) {
							TRC.dom.on(ql, 'mouseenter', this.inflate.trcBind(this));
							TRC.dom.on(ql, 'mouseleave', this.deflate.trcBind(this));
						}
						return ql;
					};
				}())
			},
			getDataDiv = (function(){
				var dataDiv = document.createElement('div'),
					dataAnchor = document.createElement('a'),
					dmContextTail = '&relatedtype=related&related_algo=Taboola';
				dataDiv.className = 'trcData';
				dataDiv.appendChild(dataAnchor);
				return function(data){
					var div = dataDiv.cloneNode(true),
						anchor = div.firstChild,
						videoIdNumericData = data.thumbnail.match(/([^\/]+):[^\/]+$/),
						videoIdNumeric = videoIdNumericData && videoIdNumericData.pop();
					div.setAttribute('data-id', data.id);
					anchor.id = data.id;
					anchor.href = data.url;
					if (videoIdNumeric) {
						anchor.setAttribute('dm:context', '/related/' + data.id + '?videoid=' + videoIdNumeric + dmContextTail);
					}
					return div;
				}
			}()),
			itemRenderer = function(cube, data){
				if (window.TRC.customJs.debug) {
					console.log(data);
				}
				var	videoLabels = cube.lastChild.firstChild,
					videoLabelsClone = videoLabels.cloneNode(true),
					videoTitle = videoLabels.firstChild,
					cloneTitle = videoLabelsClone.firstChild,
					videoUploader = videoLabels.children[1],
					videoUploaderLink = videoUploader.getElementsByTagName('a')[0],
					videoViews = videoLabels.lastChild,
					thumbAnchor = cube.firstChild,
					thumbBlock = thumbAnchor.firstChild,
					thumbOverlay = thumbBlock.firstChild,
					spriteFader = thumbOverlay.cloneNode(true),
					spriteBack = spriteFader.cloneNode(true),
					spriteSrc = data.thumbnail.replace('_large.jpg', '_sprite.jpg'),
					dataDiv = getDataDiv(data);
				cube.insertBefore(dataDiv, thumbAnchor);
				thumbAnchor.removeAttribute('title');
				if (isOutdatedBrowser()) {
					//spriteBack.innerHTML = '<img src="http://cdn.taboolasyndication.com/libtrc/dailymotion/sprite8test.jpg"/>';
					spriteBack.innerHTML = '<img src="' + spriteSrc + '"/>';
				} else {
					spriteBack.style.backgroundImage = 'url("' + spriteSrc + '")';
				}
				var	spriteFront = spriteBack.cloneNode(true);
				
				TRC.dom.on(videoUploaderLink, 'click', stop);
				/** Remove uploader and views from original anchor */
				videoLabels.removeChild(videoUploader);
				videoLabels.removeChild(videoViews);
				/** Some titles are without whitespace at all, so when inline, they 'fall off' the view. We add a class to keep them in block */ 
				if (!videoTitle.innerHTML.match(/\s/)) {
					addClass(videoTitle, 'trcNoWhiteSpace');
				}
				/** Remove title from clone */
				videoLabelsClone.removeChild(cloneTitle);
				/** Add uploader and views without anchor; add playlist element */
				cube.appendChild(videoLabelsClone);
				thumbBlock.appendChild(playlist.getElement());
				
				spriteFader.className = spriteBack.className = spriteFront.className = 'trcPreview';
				addClass(spriteBack, 'trcBack');
				addClass(spriteFader, 'trcFader');
				addClass(spriteFront, 'trcFront');
				thumbOverlay.appendChild(spriteBack);
				spriteFader.appendChild(spriteFront);
				thumbOverlay.appendChild(spriteFader);
			};
		return itemRenderer;
	}())
,"pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":300,"maxWc":369,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":370,"maxWc":529,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":530,"maxWc":750,"minWsRange":8,"maxWsRange":11,"n":4}],"rows":1}},"language":"en","testmode":false,"direction":"ltr","default-thumbnail":"http:\/\/cdn.taboolasyndication.com\/taboola\/dflthumb.png","domains":"","sponsored-link-text":"Sponsored Link","sponsored-video-text":"Sponsored Video","branding-url":{},"configuration-version":"0","external-credentials":null,"brightcove-list-id":null,"publisher-start":function() {
        if (TRC.listOrigin.getSource() == 'v') {
		var urlParts = window.location.toString().match(/(\/video\/|#video=)([^_#&?]+)/);
	
        	// Check if video is playing on the page
	        if (urlParts != null) {
                	// It is, so set the id and allow a request to be sent
        	        window.trc_video_id = urlParts.pop();
	        } else {
        	        // It isn't, so cancel the request
	                try { window.trc_video_id = null; }
                	catch (e) { window.trc_video_id = null; }
        	}
	
	        window.TRC.___urlChangeInterval = setInterval(function() {
        	        var urlParts = window.location.toString().match(/(\/video\/|#video=)([^_#&?]+)/);
	                if (urlParts != null && window._taboola && window._taboola.push) {
                        	var newVideoId = urlParts.pop();
                	        _taboola.push({notify:'videoPlay', id: newVideoId, url: 'http://' + window.location.host + '/video/' + newVideoId});
        	        }
	        },10000);
	}
	// Else, we do nothing.
        // Meaning if the integration code specifies it is not a video page we do not try to normalize anything.
}
,"get-user":function(){return null;},"get-creator":function(){var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='uploader'||m[i].name=='item-uploader')return m[i].content;}},"get-views":function() {
	var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');
	for(var i=0; i<m.length; i++) {
		if(m[i].name=='views'||m[i].name=='item-views') {
			return m[i].content;
		}
	}

	var viewsElement = document.getElementById('video_views_count');
	if (viewsElement != null && typeof viewsElement.title != 'undefined') {
		return viewsElement.title.split(' ')[0].replace(/[,.]/g,'');
	}
}
,"get-rating":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='rating'||m[i].name=='item-rating'){ if(!isNaN(parseFloat(m[i].content))) return m[i].content;}}},"get-tags":function() {return [];},"logo-image":"http:\/\/cdn.taboolasyndication.com\/taboola\/powered-by.png","has_valid_rss":false,"actionscript_version":"3","brightcove-uses-reference":false,"publisher-end":function(id){ },"ie-logo-image":"http:\/\/cdn.taboolasyndication.com\/taboola\/powered-by-small.gif","attribution":true,"notify-loaded":true,"metafields":"","normalize-item-id":function(itemid,type,canon){if(!canon&&type=='text'&&typeof itemid=='string'&&itemid.search(new RegExp('^https?://'))==0)itemid=itemid.replace(/\?.*/,'');return itemid.toLowerCase();},"normalize-item-url":function(itemurl,type,canon){return itemurl;},"read-paused-bcplayer":false,"normalize-request-param":function(req,mode) {
	if (typeof req.u != 'undefined') { 
		req.u = "http://" + window.location.host + "/video/" + window.trc_video_id;
	}
	return req;
}

,"normalize-log-param":function(name,value,mode) {return value;},"timeout":8000,"prenormalize-item-id":{"host":true,"fragment":"^(\/video\/|!)","query":["p","id"],"truncate-at":["search.searchcompletion.com","org.mozilla.javascript.undefined"],"trailing-dirsep":true},"prenormalize-item-url":false,"loader-impl":null,"global":{"explore-delay":0,"publisher-domains":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<domains><domain type=\"host\">dailymotion.com<\/domain><domain type=\"host\" staging=\"1\">stage-02.dailymotion.com<\/domain><\/domains>\n","requests-domain":"trc.taboolasyndication.com","syndication-embed-code":function (box, recommendation, affiliate) {},"syndicator-affiliate-id":"dailyrecord","visible-delay":0,"style":".rbox-blended .video-title{font-family:\"Trebuchet MS\", Helvetica, sans-serif;font-size:12px;line-height:15px;font-weight:normal;max-height:1.29em;*height:1.29em;color:#678db8;text-decoration:none;}.rbox-blended .video-description{font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:#737373;text-decoration:none;}.rbox-blended .trc_rbox_div{width:auto;_width:99%;height:146px;border-width:0px 2px;padding:0 5px;}.rbox-blended .videoCube .video-duration{left:36px;display:block;}.rbox-blended .videoCube .video-label-box{margin-left:5px;margin-right:5px;}.rbox-blended .video-label,.rbox-blended .sponsored,.rbox-blended .sponsored-url{font-family:\"Trebuchet MS\", Helvetica, sans-serif;}.rbox-blended .trc_rbox_header{font-family:\"Trebuchet MS\", Helvetica, sans-serif;font-size:18px;font-weight:normal;text-decoration:none;color:#3A3A3A;border-width:0;background:transparent;border-style:none none solid none;border-color:#D6D5D3;padding:0;}.rbox-blended .sponsored-url{font-size:10px;font-weight:normal;text-decoration:none;color:#678DB8;}.rbox-blended .sponsored{font-size:10px;font-weight:normal;text-decoration:none;color:#9C9A9C;}.rbox-blended .video-category{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .video-duration-detail{font-size:10px;font-weight:normal;text-decoration:none;color:#678db8;}.rbox-blended .video-rating{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .video-uploader{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .video-views{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .video-published-date{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .sponsored-default .video-title{max-height:2.58em;*height:2.58em;}.rbox-blended .sponsored-default .video-description{max-height:2.2em;*height:2.2em;}.rbox-blended .videoCube{width:124px;_width:124px;background-color:white;border-width:1px;border-color:#C8D6E5;padding:0px;height:146px;margin-left:4px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;}.rbox-blended div.videoCube:hover,.rbox-blended  div.videoCube_hover{background-color:#dddddd;}.rbox-blended .sponsored-default{background-color:#F0F0F0;}.rbox-blended div.sponsored-default:hover,.rbox-blended  div.sponsored-default.videoCube_hover{background-color:#dddddd;}.rbox-blended .videoCube .thumbnail-overlay{background-image:null;background-position:5% 5%;}.rbox-blended .videoCube:hover .thumbnail-overlay,.rbox-blended  .videoCube_hover .thumbnail-overlay{background-image:null;}.rbox-blended .trc_rbox_border_elm{border-color:#c8d6e5;}.rbox-blended .videoCube .thumbBlock{border-width:0px;border-color:darkgray;}.rbox-blended div.videoCube:hover .thumbBlock{border-color:inherit;}.rbox-blended .pager_enabled{color:#737373;}.rbox-blended .trc_pager_counter{color:#000000;}.rbox-blended .pager_disabled{color:#A0A0A0;}.rbox-blended .trc_pager_prev:hover,.rbox-blended  .trc_pager_next:hover{color:#CDE28F;}.rbox-blended .trc_pager_selected{color:#A0A0A0;}.rbox-blended .trc_pager_unselected{color:#737373;}.rbox-blended div.trc_pager_pages div:hover{color:#CDE28F;}.rbox-blended .trc_lightbox_overlay{background-color:#000000;opacity:0.70;filter:alpha(opacity=70);}.rbox-blended .video-label-box{text-align:left;}.rbox-blended .trc_sponsored_overlay{background-color:black;}.rbox-blended .thumbnail-emblem{background-position:5% 95%;}.rbox-blended .videoCube .sponsored{margin-top:-2px;}.rbox-blended{width:522px;_width:522px;border-width:0px;border-style:solid solid solid solid;border-color:#000000;padding:0;}.rbox-blended .videoCube.vertical{border-style:none none solid none;}.rbox-blended .videoCube.horizontal{border-style:none none solid none;}.rbox-blended .trc_pager_prev,.rbox-blended .trc_pager_next{font-size:12px;font-weight:normal;text-decoration:none;}.rbox-blended .trc_pager_pages div{font-size:12px;font-weight:normal;text-decoration:none;}.rbox-blended .video-external-data{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .trc_pager div{font-family:serif;}.rbox-blended .playerCube .thumbnail-overlay{background-image:null;background-position:5% 5%;}.rbox-blended .playerCube:hover .thumbnail-overlay,.rbox-blended  .playerCube_hover .thumbnail-overlay{background-image:null;}.rbox-blended .playerCube .videoCube{background-color:transparent;border-color:#D6D5D3;border-width:1px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;margin-left:0px;margin-top:0px;padding:3px;}.rbox-blended .playerCube .videoCube.horizontal{border-style:none none none none;}.rbox-blended .playerCube .videoCube .video-label-box{margin-left:81px;margin-right:0px;}.rbox-blended .playerCube .video-duration-detail{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-external-data{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-label-box{text-align:left;}.rbox-blended .playerCube .video-published-date{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-category{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-description{font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;text-decoration:none;max-height:2.2em;*height:2.2em;color:black;}.rbox-blended .playerCube .videoCube .video-duration{display:block;left:36px;}.rbox-blended .playerCube .videoCube .thumbBlock{border-width:0px;border-color:darkgray;}.rbox-blended .playerCube .video-rating{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-uploader{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-views{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.rbox-blended .playerCube .video-title{font-family:Arial, Helvetica, sans-serif;text-decoration:none;font-size:14px;line-height:17.5px;font-weight:bold;max-height:2.58em;*height:2.58em;color:black;}.rbox-blended .playerCube div.videoCube:hover,.rbox-blended  div.videoCube_hover{background-color:transparent;}.rbox-blended .whatsThisSyndicated{font-family:Arial, Verdana, sans-serif;font-size:9px;font-weight:normal;color:black;text-decoration:none;padding:0;}.rbox-blended div.syndicatedItem:hover,.rbox-blended  div.syndicatedItem.videoCube_hover{background-color:transparent;}.rbox-blended div.syndicatedItem:hover .thumbBlock{border-color:inherit;}.rbox-blended .videoCube.syndicatedItem{background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;}.rbox-blended .videoCube.syndicatedItem.horizontal{border-style:none none none solid;}.rbox-blended .videoCube.syndicatedItem:hover .thumbnail-overlay,.rbox-blended  .videoCube_hover.syndicatedItem .thumbnail-overl{:null;}.rbox-blended .videoCube.syndicatedItem .thumbBlock{border-color:darkgray;border-width:0px;}.rbox-blended .videoCube.syndicatedItem .thumbnail-overlay{background-image:null;background-position:5% 5%;}.rbox-blended .videoCube.syndicatedItem.vertical{border-style:solid none none none;}.rbox-blended .videoCube.syndicatedItem .video-duration{display:block;left:36px;}.rbox-blended .videoCube.syndicatedItem .video-label-box{margin-left:0px;}.rbox-blended .syndicatedItem{background-color:transparent;}.rbox-blended .syndicatedItem .video-description{max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;}.rbox-blended .syndicatedItem .video-title{max-height:2.58em;*height:2.58em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:17.5px;font-weight:bold;text-decoration:none;}.rbox-blended .syndicatedItem .sponsored{color:#9C9A9C;font-size:9px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .sponsored-url{color:green;font-size:9px;font-weight:bold;text-decoration:underline;}.rbox-blended .syndicatedItem .video-category{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-duration-detail{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-external-data{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-published-date{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-rating{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-uploader{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .video-views{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.rbox-blended .syndicatedItem .branding{color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;}.rbox-blended .videoCube.syndicatedItem .thumbBlock .branding{text-align:left;background-color:transparent;display:block;left:0px;color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;}.rbox-blended .videoCube.syndicatedItem .thumbBlock .static-text{text-align:left;background-color:black;display:block;color:white;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;}.verticalx15 .video-label,.verticalx15 .sponsored,.verticalx15 .sponsored-url{font-family:Arial, Verdana, sans-serif;}.verticalx15 .videoCube .thumbnail-overlay{background-image:null;background-position:5% 5%;}.verticalx15 .thumbnail-emblem{background-position:5% 5%;}.verticalx15 .videoCube:hover .thumbnail-overlay,.verticalx15  .videoCube_hover .thumbnail-overlay{background-image:null;}.verticalx15 .pager_enabled{color:#0056b3;}.verticalx15 .pager_disabled{color:#7d898f;}.verticalx15 .trc_pager_prev:hover,.verticalx15  .trc_pager_next:hover{color:#6497ED;}.verticalx15 .trc_pager_prev,.verticalx15 .trc_pager_next{font-size:12px;font-weight:normal;text-decoration:none;}.verticalx15 .trc_pager_selected{color:#0056b3;}.verticalx15 .trc_pager_unselected{color:#7d898f;}.verticalx15 div.trc_pager_pages div:hover{color:#6497ED;}.verticalx15 .trc_pager_counter{color:#000000;}.verticalx15 .trc_pager_pages div{font-size:12px;font-weight:normal;text-decoration:none;}.verticalx15 .trc_lightbox_overlay{background-color:#000000;opacity:0.70;filter:alpha(opacity=70);}.verticalx15 .trc_rbox_header{font-family:Arial,Helvetica,Clean,Sans-serif;font-size:12px;border-width:1px;font-weight:normal;text-decoration:none;color:#202020;background:transparent;border-style:none none solid;border-color:#D6D5D3;padding:0 5px 2px;}.verticalx15 .video-label-box{text-align:left;}.verticalx15 .trc_sponsored_overlay{background-color:black;}.verticalx15 .video-title{font-family:Arial, Verdana, sans-serif;text-decoration:none;font-size:12px;line-height:16px;font-weight:bold;max-height:2.6em;*height:2.6em;color:#18658B;}.verticalx15 .video-description{font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;text-decoration:none;max-height:2.2em;*height:2.2em;color:black;}.verticalx15 .sponsored-url{font-size:9px;font-weight:bold;text-decoration:underline;color:green;}.verticalx15 .sponsored{font-size:9px;font-weight:normal;text-decoration:none;color:#9C9A9C;}.verticalx15 .videoCube .sponsored{margin-top:-7px;}.verticalx15 .videoCube .video-duration{display:block;left:54px;}.verticalx15 .video-category{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .video-duration-detail{font-size:9px;font-weight:normal;text-decoration:none;color:white;}.verticalx15 .video-rating{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .video-uploader{font-size:11px;font-weight:bold;text-decoration:none;color:#42AEDC;}.verticalx15 .video-views{font-size:11px;font-weight:bold;text-decoration:none;color:#666;}.verticalx15 .video-published-date{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .video-external-data{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .sponsored-default .video-title{max-height:2.58em;*height:2.58em;}.verticalx15 .sponsored-default .video-description{max-height:2.2em;*height:2.2em;}.verticalx15 .trc_rbox_div{width:auto;_width:99%;border-width:0;padding:0;height:1220px;}.verticalx15{width:300px;_width:300px;border-width:0px;border-style:solid solid solid solid;border-color:#000000;padding:0;}.verticalx15 .trc_rbox_border_elm{border-color:#e8e8e8;}.verticalx15 .videoCube{border-width:1px;border-color:#D6D5D3;padding:5px;width:auto;_width:auto;height:70px;margin-left:0;margin-top:0;background-color:transparent;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;}.verticalx15 .videoCube.vertical{border-style:none;}.verticalx15 .videoCube.horizontal{border-style:none none none solid;}.verticalx15 .videoCube .thumbBlock{border-width:1px;border-color:transparent;}.verticalx15 div.videoCube:hover .thumbBlock{border-color:inherit;}.verticalx15 .videoCube .video-label-box{margin-left:99px;margin-right:0px;}.verticalx15 div.videoCube:hover,.verticalx15  div.videoCube_hover{background-color:transparent;}.verticalx15 .sponsored-default{background-color:#F7F6C6;}.verticalx15 div.sponsored-default:hover,.verticalx15  div.sponsored-default.videoCube_hover{background-color:inherit;}.verticalx15 .trc_pager div{font-family:serif;}.verticalx15 .playerCube .thumbnail-overlay{background-image:null;background-position:5% 5%;}.verticalx15 .playerCube:hover .thumbnail-overlay,.verticalx15  .playerCube_hover .thumbnail-overlay{background-image:null;}.verticalx15 .playerCube .videoCube{background-color:transparent;border-color:#D6D5D3;border-width:1px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;margin-left:0px;margin-top:0px;padding:3px;}.verticalx15 .playerCube .videoCube.horizontal{border-style:none none none none;}.verticalx15 .playerCube .videoCube .video-label-box{margin-left:81px;margin-right:0px;}.verticalx15 .playerCube .video-duration-detail{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-external-data{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-label-box{text-align:left;}.verticalx15 .playerCube .video-published-date{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-category{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-description{font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;text-decoration:none;max-height:2.2em;*height:2.2em;color:black;}.verticalx15 .playerCube .videoCube .video-duration{display:block;left:36px;}.verticalx15 .playerCube .videoCube .thumbBlock{border-width:0px;border-color:darkgray;}.verticalx15 .playerCube .video-rating{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-uploader{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-views{font-size:10px;font-weight:normal;text-decoration:none;color:black;}.verticalx15 .playerCube .video-title{font-family:Arial, Helvetica, sans-serif;text-decoration:none;font-size:14px;line-height:17.5px;font-weight:bold;max-height:2.58em;*height:2.58em;color:black;}.verticalx15 .playerCube div.videoCube:hover,.verticalx15  div.videoCube_hover{background-color:transparent;}.verticalx15 .whatsThisSyndicated{font-family:Arial, Verdana, sans-serif;font-size:9px;font-weight:normal;color:black;text-decoration:none;padding:0;}.verticalx15 div.syndicatedItem:hover,.verticalx15  div.syndicatedItem.videoCube_hover{background-color:transparent;}.verticalx15 div.syndicatedItem:hover .thumbBlock{border-color:inherit;}.verticalx15 .videoCube.syndicatedItem{background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;}.verticalx15 .videoCube.syndicatedItem.horizontal{border-style:none none none solid;}.verticalx15 .videoCube.syndicatedItem:hover .thumbnail-overlay,.verticalx15  .videoCube_hover.syndicatedItem .thumbnail-overl{:null;}.verticalx15 .videoCube.syndicatedItem .thumbBlock{border-color:darkgray;border-width:0px;}.verticalx15 .videoCube.syndicatedItem .thumbnail-overlay{background-image:null;background-position:5% 5%;}.verticalx15 .videoCube.syndicatedItem.vertical{border-style:solid none none none;}.verticalx15 .videoCube.syndicatedItem .video-duration{display:block;left:36px;}.verticalx15 .videoCube.syndicatedItem .video-label-box{margin-left:0px;}.verticalx15 .syndicatedItem{background-color:transparent;}.verticalx15 .syndicatedItem .video-description{max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;}.verticalx15 .syndicatedItem .video-title{max-height:2.58em;*height:2.58em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:17.5px;font-weight:bold;text-decoration:none;}.verticalx15 .syndicatedItem .sponsored{color:#9C9A9C;font-size:9px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .sponsored-url{color:green;font-size:9px;font-weight:bold;text-decoration:underline;}.verticalx15 .syndicatedItem .video-category{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-duration-detail{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-external-data{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-published-date{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-rating{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-uploader{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .video-views{color:black;font-size:10px;font-weight:normal;text-decoration:none;}.verticalx15 .syndicatedItem .branding{color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;}.verticalx15 .videoCube.syndicatedItem .thumbBlock .branding{text-align:left;background-color:transparent;display:block;left:0px;color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;}.verticalx15 .videoCube.syndicatedItem .thumbBlock .static-text{text-align:left;background-color:black;display:block;color:white;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;}\t\/** Containers *\/\n\t\/** Header **\/\n\t.verticalx15 .trc_rbox_header {\n\t\tmargin-bottom: 12px;\n\t}\n\t\/** Recommendations *\/\n\t.verticalx15 .trc_rbox_div {\n\t\t*height: 1300px !important;\n\t\tmargin: 0;\n\t\toverflow: hidden !important;\n\t}\n\t.verticalx15 .videoCube {\n\t\tposition: relative;\n\t\tcursor: default;\n\t\tmargin-bottom: 12px;\n\t\t*margin-bottom: 7px;\n\t}\n\t.verticalx15 .videoCube:hover {\n\t\tcursor: default;\n\t}\n\t.verticalx15 .videoCube .trcData {\n\t\tdisplay: none;\n\t}\n\t.verticalx15 .videoCube a {\n\t\tcursor: default;\n\t}\n\t.verticalx15 .videoCube .thumbBlock {\n\t\tcursor: pointer;\n\t}\n\t.verticalx15 div.videoCube:hover .thumbBlock {\n\t\tborder-color: transparent;\n\t}\n\t.verticalx15 .videoCube .thumbnail-overlay {\n\t\tborder: 1px solid #eaeaea;\n\t\twidth: 109px !important;\n\t\theight: 62px !important;\n\t\tleft: 5px;\n\t\ttop: 4px;\n\t}\n\t.verticalx15 .videoCube .thumbBlock:hover .thumbnail-overlay {\n\t\tborder-color: #3784CC;\n\t}\n\t\/** Quicklist button *\/\n\t.verticalx15 .videoCube .trcQuicklist,\n\t.verticalx15 .videoCube .trcQuicklist span {\n\t\tdisplay: inline-block;\n\t\theight: 22px;\n\t\tposition: absolute;\n\t\tvisibility: hidden;\n\t\tbackground-image: url('http:\/\/cdn.taboolasyndication.com\/libtrc\/dailymotion\/vertical_new.png');\n\t\tbackground-repeat: no-repeat;\n\t\t\/*border-style: solid;\n\t\tborder-width: 1px;*\/\n\t\tz-index: 60;\n\t}\n\t\/** Quicklist icon *\/\n\t.verticalx15 .videoCube .trcQuicklist {\n\t\tcursor: pointer;\n\t\twidth: 19px;\n\t\tleft: 94px;\n\t\ttop: 43px;\n\t\t*bottom: 14px;\n\t\tbackground-position: -110px -1210px;\n\t\t\/*border-color: blue;*\/\n\t}\n\t\/** Quicklist text *\/\n\t.verticalx15 .videoCube .trcQuicklist span {\n\t\twidth: 0;\n\t\ttop: 0;\n\t\tright: 19px;\n\t\tbackground-position: -56px -1210px;\n\t\t\/*border-color: red;*\/\n\t}\n\t.verticalx15 .videoCube:hover .trcQuicklist {\n\t\tvisibility: visible;\n\t}\n\t\/** Enqueued items are always visible *\/\n\t.verticalx15 .videoCube .trcQuicklist.trcQuicklistAdded,\n\t.verticalx15 .videoCube .trcQuicklist.trcQuicklistAdded:hover {\n\t\tbackground-position: -110px -1254px;\n\t\tvisibility: visible;\n\t}\n\t.verticalx15.goodBrowser .videoCube .trcQuicklist.trcQuicklistAdded:hover span {\n\t\tvisibility: hidden;\n\t}\n\t.verticalx15 .videoCube .trcQuicklist:hover {\n\t\tbackground-position: -110px -1232px;\n\t}\n\t\/** Quicklist text animates via width 'inflation' *\/\n\t.verticalx15 .videoCube .trcQuicklist:hover span,\n\t.verticalx15.goodBrowser .videoCube .trcQuicklist:hover span {\n\t\tvisibility: visible;\n\t\tbackground-position: -56px -1232px;\n\t}\n\t.verticalx15.goodBrowser .videoCube .trcQuicklist:hover span {\n\t\twidth: 56px;\n\t\ttransition: width 0.5s ease-out 0s;\n\t\t-o-transition: width 0.5s ease-out 0s;\n\t\t-ms-transition: width 0.5s ease-out 0s;\n\t\t-moz-transition: width 0.5s ease-out 0s;\n\t\t-webkit-transition: width 0.5s ease-out 0s;\n\t}\n\t\/** Meta data *\/\n\t.verticalx15 .videoCube .video-title {\n\t\tcursor: pointer;\n\t}\n\t.verticalx15.trcLoaded .video-title {\n\t\tdisplay: inline;\n\t}\n\t.verticalx15.trcLoaded .video-title.trcNoWhiteSpace {\n\t\tdisplay: block;\n\t}\n\t.verticalx15 .videoCube .video-title:hover {\n\t\ttext-decoration: underline;\n\t}\n\t.verticalx15 .video-duration {\n\t\ttop: 3px !important;\n\t\tz-index: 60;\n\t}\n\t.verticalx15 .video-duration dt {\n\t\tborder-radius: 2px;\n\t}\n\t.verticalx15 .video-uploader .uploaderPrefix,\n\t.verticalx15 .video-views .viewsSuffix {\n\t\tfont-weight: normal;\n\t}\n\t.verticalx15 .video-uploader .uploaderPrefix {\n\t\tcolor: black;\n\t\tmargin-right: 0.3em;\n\t}\n\t.verticalx15 .video-views .viewsSuffix {\n\t\tcolor: gray;\n\t\tmargin-left: 0.3em;\n\t}\n\t.verticalx15 a.video-uploader {\n\t\tcursor: pointer;\n\t}\n\t.verticalx15 a.video-uploader:hover {\n\t\ttext-decoration: underline !important;\n\t}\n\t\/** Animations *\/\n\t.verticalx15 .trcPreview {\n\t\tposition: absolute;\n\t\ttop: 1px;\n\t\tleft: 1px;\n\t\tdisplay: block;\n\t\tvisibility: hidden;\n\t\t\/*background-image: url('http:\/\/static2.dmcdn.net\/static\/video\/071\/732\/46237170:jpeg_preview_sprite.jpg');\n\t\tbackground-image: url('http:\/\/cdn.taboolasyndication.com\/libtrc\/dailymotion\/sprite8test.jpg');*\/\n\t\tbackground-size: cover;\n\t\toverflow: hidden;\n\t}\n\t.verticalx15.badBrowser .trcPreview {\n\t\tvisibility: visible;\n\t\tbackground-image: none;\n\t}\n\t.verticalx15.goodBrowser .trcPreview.trcBack {\n\t\topacity: 0;\n\t}\n\t.verticalx15 .trcPreview.trcFront {\n\t\tposition: static;\n\t}\n\t\/** For older browsers, where animations and transitions aren't supported *\/\n\t.verticalx15 .trcPreview img {\n\t\twidth: 100%;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: -10px;\n\t}\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcBack,\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcFront {\n\t\tvisibility: visible;\n\t\t-webkit-animation-duration: 8000ms;\n\t\t-moz-animation-duration: 8000ms;\n\t\t-ms-animation-duration: 8000ms;\n\t\t-o-animation-duration: 8000ms;\n\t\tanimation-duration: 8000ms;\n\t\t-webkit-animation-iteration-count: infinite;\n\t\t-moz-animation-iteration-count: infinite;\n\t\t-ms-animation-iteration-count: infinite;\n\t\t-o-animation-iteration-count: infinite;\n\t\tanimation-iteration-count: infinite;\n\t\t-webkit-animation-timing-function: step-start;\n\t\t-moz-animation-timing-function: step-start;\n\t\t-ms-animation-timing-function: step-start;\n\t\t-o-animation-timing-function: step-start;\n\t\tanimation-timing-function: step-start;\n\t}\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcBack {\n\t\topacity: 1;\n\t}\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcBack {\n\t\t-webkit-transition: opacity 2s ease-in-out 0s;\n\t\t-moz-transition: opacity 2s ease-in-out 0s;\n\t\t-ms-transition: opacity 2s ease-in-out 0s;\n\t\t-o-transition: opacity 2s ease-in-out 0s;\n\t\ttransition: opacity 2s ease-in-out 0s;\n\t\t-webkit-animation-name: verticalx15-preview-vertical-8-background-back;\n\t\t-moz-animation-name: verticalx15-preview-vertical-8-background-back;\n\t\t-ms-animation-name: verticalx15-preview-vertical-8-background-back;\n\t\t-o-animation-name: verticalx15-preview-vertical-8-background-back;\n\t\tanimation-name: verticalx15-preview-vertical-8-background-back;\n\t}\n\t@-webkit-keyframes \"verticalx15-preview-vertical-8-background-back\" {\n\t\t0%\t\t{ background-position: 0 -580px; }\n\t\t12.5%\t{ background-position: 0 -580px; }\n\t\t\/* frame 2*\/\n\t\t25%\t\t{ background-position: 0 -90px; }\n\t\t37.5%\t{ background-position: 0 -90px; }\n\t\t\/* frame 4*\/\n\t\t50%\t\t{ background-position: 0 -250px; }\n\t\t62.5%\t{ background-position: 0 -250px; }\n\t\t\/* frame 6 *\/\n\t\t75%\t\t{ background-position: 0 -410px; }\n\t\t87.5%\t{ background-position: 0 -410px; }\n\t\t\/* frame 8 *\/\n\t\t100%\t{ background-position: 0 -580px; }\n\t}\n\t@-moz-keyframes verticalx15-preview-vertical-8-background-back {\n\t\t0%\t\t{ background-position: 0 -580px; }\n\t\t12.5%\t{ background-position: 0 -580px; }\n\t\t\/* frame 2*\/\n\t\t25%\t\t{ background-position: 0 -90px; }\n\t\t37.5%\t{ background-position: 0 -90px; }\n\t\t\/* frame 4*\/\n\t\t50%\t\t{ background-position: 0 -250px; }\n\t\t62.5%\t{ background-position: 0 -250px; }\n\t\t\/* frame 6 *\/\n\t\t75%\t\t{ background-position: 0 -410px; }\n\t\t87.5%\t{ background-position: 0 -410px; }\n\t\t\/* frame 8 *\/\n\t\t100%\t{ background-position: 0 -580px; }\n\t}\n\t@-ms-keyframes \"verticalx15-preview-vertical-8-background-back\" {\n\t\t0%\t\t{ background-position: 0 -580px; }\n\t\t12.5%\t{ background-position: 0 -580px; }\n\t\t\/* frame 2*\/\n\t\t25%\t\t{ background-position: 0 -90px; }\n\t\t37.5%\t{ background-position: 0 -90px; }\n\t\t\/* frame 4*\/\n\t\t50%\t\t{ background-position: 0 -250px; }\n\t\t62.5%\t{ background-position: 0 -250px; }\n\t\t\/* frame 6 *\/\n\t\t75%\t\t{ background-position: 0 -410px; }\n\t\t87.5%\t{ background-position: 0 -410px; }\n\t\t\/* frame 8 *\/\n\t\t100%\t{ background-position: 0 -580px; }\n\t}\n\t@-o-keyframes \"verticalx15-preview-vertical-8-background-back\" {\n\t\t0%\t\t{ background-position: 0 -580px; }\n\t\t12.5%\t{ background-position: 0 -580px; }\n\t\t\/* frame 2*\/\n\t\t25%\t\t{ background-position: 0 -90px; }\n\t\t37.5%\t{ background-position: 0 -90px; }\n\t\t\/* frame 4*\/\n\t\t50%\t\t{ background-position: 0 -250px; }\n\t\t62.5%\t{ background-position: 0 -250px; }\n\t\t\/* frame 6 *\/\n\t\t75%\t\t{ background-position: 0 -410px; }\n\t\t87.5%\t{ background-position: 0 -410px; }\n\t\t\/* frame 8 *\/\n\t\t100%\t{ background-position: 0 -580px; }\n\t}\n\t@keyframes \"verticalx15-preview-vertical-8-background-back\" {\n\t\t\/* frame 8 *\/\n\t\t0%\t\t{ background-position: 0 -580px; }\n\t\t12.5%\t{ background-position: 0 -580px; }\n\t\t\/* frame 2*\/\n\t\t25%\t\t{ background-position: 0 -90px; }\n\t\t37.5%\t{ background-position: 0 -90px; }\n\t\t\/* frame 4*\/\n\t\t50%\t\t{ background-position: 0 -250px; }\n\t\t62.5%\t{ background-position: 0 -250px; }\n\t\t\/* frame 6 *\/\n\t\t75%\t\t{ background-position: 0 -410px; }\n\t\t87.5%\t{ background-position: 0 -410px; }\n\t\t\/* frame 8 *\/\n\t\t100%\t{ background-position: 0 -580px; }\n\t}\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcFront {\n\t\t-webkit-animation-name: verticalx15-preview-vertical-8-background-front;\n\t\t-moz-animation-name: verticalx15-preview-vertical-8-background-front;\n\t\t-ms-animation-name: verticalx15-preview-vertical-8-background-front;\n\t\t-o-animation-name: verticalx15-preview-vertical-8-background-front;\n\t\tanimation-name: verticalx15-preview-vertical-8-background-front;\n\t}\n\t@-webkit-keyframes verticalx15-preview-vertical-8-background-front {\n\t\t\/* frame 7 *\/\n\t\t0%\t\t{ background-position: 0 -490px; }\n\t\t\/* frame 1 *\/\n\t\t12.5%\t{ background-position: 0 -10px; }\n\t\t25%\t\t{ background-position: 0 -10px; }\n\t\t\/* frame 3*\/\n\t\t37.5%\t{ background-position: 0 -170px; }\n\t\t50%\t\t{ background-position: 0 -170px; }\n\t\t\/* frame 5 *\/\n\t\t62.5%\t{ background-position: 0 -330px; }\n\t\t75%\t\t{ background-position: 0 -330px; }\n\t\t\/* frame 7 *\/\n\t\t87.5%\t{ background-position: 0 -490px; }\n\t\t100%\t{ background-position: 0 -490px; }\n\t}\n\t@-moz-keyframes verticalx15-preview-vertical-8-background-front {\n\t\t\/* frame 7 *\/\n\t\t0%\t\t{ background-position: 0 -490px; }\n\t\t\/* frame 1 *\/\n\t\t12.5%\t{ background-position: 0 -10px; }\n\t\t25%\t\t{ background-position: 0 -10px; }\n\t\t\/* frame 3*\/\n\t\t37.5%\t{ background-position: 0 -170px; }\n\t\t50%\t\t{ background-position: 0 -170px; }\n\t\t\/* frame 5 *\/\n\t\t62.5%\t{ background-position: 0 -330px; }\n\t\t75%\t\t{ background-position: 0 -330px; }\n\t\t\/* frame 7 *\/\n\t\t87.5%\t{ background-position: 0 -490px; }\n\t\t100%\t{ background-position: 0 -490px; }\n\t}\n\t@-ms-keyframes verticalx15-preview-vertical-8-background-front {\n\t\t\/* frame 7 *\/\n\t\t0%\t\t{ background-position: 0 -490px; }\n\t\t\/* frame 1 *\/\n\t\t12.5%\t{ background-position: 0 -10px; }\n\t\t25%\t\t{ background-position: 0 -10px; }\n\t\t\/* frame 3*\/\n\t\t37.5%\t{ background-position: 0 -170px; }\n\t\t50%\t\t{ background-position: 0 -170px; }\n\t\t\/* frame 5 *\/\n\t\t62.5%\t{ background-position: 0 -330px; }\n\t\t75%\t\t{ background-position: 0 -330px; }\n\t\t\/* frame 7 *\/\n\t\t87.5%\t{ background-position: 0 -490px; }\n\t\t100%\t{ background-position: 0 -490px; }\n\t}\n\t@-o-keyframes verticalx15-preview-vertical-8-background-front {\n\t\t\/* frame 7 *\/\n\t\t0%\t\t{ background-position: 0 -490px; }\n\t\t\/* frame 1 *\/\n\t\t12.5%\t{ background-position: 0 -10px; }\n\t\t25%\t\t{ background-position: 0 -10px; }\n\t\t\/* frame 3*\/\n\t\t37.5%\t{ background-position: 0 -170px; }\n\t\t50%\t\t{ background-position: 0 -170px; }\n\t\t\/* frame 5 *\/\n\t\t62.5%\t{ background-position: 0 -330px; }\n\t\t75%\t\t{ background-position: 0 -330px; }\n\t\t\/* frame 7 *\/\n\t\t87.5%\t{ background-position: 0 -490px; }\n\t\t100%\t{ background-position: 0 -490px; }\n\t}\n\t@keyframes verticalx15-preview-vertical-8-background-front {\n\t\t\/* frame 7 *\/\n\t\t0%\t\t{ background-position: 0 -490px; }\n\t\t\/* frame 1 *\/\n\t\t12.5%\t{ background-position: 0 -10px; }\n\t\t25%\t\t{ background-position: 0 -10px; }\n\t\t\/* frame 3*\/\n\t\t37.5%\t{ background-position: 0 -170px; }\n\t\t50%\t\t{ background-position: 0 -170px; }\n\t\t\/* frame 5 *\/\n\t\t62.5%\t{ background-position: 0 -330px; }\n\t\t75%\t\t{ background-position: 0 -330px; }\n\t\t\/* frame 7 *\/\n\t\t87.5%\t{ background-position: 0 -490px; }\n\t\t100%\t{ background-position: 0 -490px; }\n\t}\n\t\/** Opacity animation: the even element fades in and out, while the odd one appears behind the even one and stays opaque *\/\n\t.verticalx15 .thumbBlock:hover .trcPreview.trcFader {\n\t\tvisibility: visible;\n\t}\n\t.verticalx15.goodBrowser .thumbBlock:hover .trcPreview.trcFader {\n\t\t-webkit-animation-duration: 8000ms;\n\t\t-moz-animation-duration: 8000ms;\n\t\t-ms-animation-duration: 8000ms;\n\t\t-o-animation-duration: 8000ms;\n\t\tanimation-duration: 8000ms;\n\t\t-webkit-animation-iteration-count: infinite;\n\t\t-moz-animation-iteration-count: infinite;\n\t\t-ms-animation-iteration-count: infinite;\n\t\t-o-animation-iteration-count: infinite;\n\t\tanimation-iteration-count: infinite;\n\t\t-webkit-animation-timing-function: ease-in-out;\n\t\t-moz-animation-timing-function: ease-in-out;\n\t\t-ms-animation-timing-function: ease-in-out;\n\t\t-o-animation-timing-function: ease-in-out;\n\t\tanimation-timing-function: ease-in-out;\n\t\t-webkit-animation-name: verticalx15-preview-vertical-8-fader;\n\t\t-moz-animation-name: verticalx15-preview-vertical-8-fader;\n\t\t-ms-animation-name: verticalx15-preview-vertical-8-fader;\n\t\t-o-animation-name: verticalx15-preview-vertical-8-fader;\n\t\tanimation-name: verticalx15-preview-vertical-8-fader;\n\t}\n\t@-webkit-keyframes verticalx15-preview-vertical-8-fader {\n\t\t0%\t\t{ opacity: 0; }\n\t\t12.5%\t{ opacity: 1; }\n\t\t25%\t\t{ opacity: 0; }\n\t\t37.5%\t{ opacity: 1; }\n\t\t50%\t\t{ opacity: 0; }\n\t\t62.5%\t{ opacity: 1; }\n\t\t75%\t\t{ opacity: 0; }\n\t\t87.5%\t{ opacity: 1; }\n\t\t100%\t{ opacity: 0; }\n\t}\n\t@-moz-keyframes verticalx15-preview-vertical-8-fader {\n\t\t0%\t\t{ opacity: 0; }\n\t\t12.5%\t{ opacity: 1; }\n\t\t25%\t\t{ opacity: 0; }\n\t\t37.5%\t{ opacity: 1; }\n\t\t50%\t\t{ opacity: 0; }\n\t\t62.5%\t{ opacity: 1; }\n\t\t75%\t\t{ opacity: 0; }\n\t\t87.5%\t{ opacity: 1; }\n\t\t100%\t{ opacity: 0; }\n\t}\n\t@-ms-keyframes verticalx15-preview-vertical-8-fader {\n\t\t0%\t\t{ opacity: 0; }\n\t\t12.5%\t{ opacity: 1; }\n\t\t25%\t\t{ opacity: 0; }\n\t\t37.5%\t{ opacity: 1; }\n\t\t50%\t\t{ opacity: 0; }\n\t\t62.5%\t{ opacity: 1; }\n\t\t75%\t\t{ opacity: 0; }\n\t\t87.5%\t{ opacity: 1; }\n\t\t100%\t{ opacity: 0; }\n\t}\n\t@-o-keyframes verticalx15-preview-vertical-8-fader {\n\t\t0%\t\t{ opacity: 0; }\n\t\t12.5%\t{ opacity: 1; }\n\t\t25%\t\t{ opacity: 0; }\n\t\t37.5%\t{ opacity: 1; }\n\t\t50%\t\t{ opacity: 0; }\n\t\t62.5%\t{ opacity: 1; }\n\t\t75%\t\t{ opacity: 0; }\n\t\t87.5%\t{ opacity: 1; }\n\t\t100%\t{ opacity: 0; }\n\t}\n\t@keyframes verticalx15-preview-vertical-8-fader {\n\t\t0%\t\t{ opacity: 0; }\n\t\t12.5%\t{ opacity: 1; }\n\t\t25%\t\t{ opacity: 0; }\n\t\t37.5%\t{ opacity: 1; }\n\t\t50%\t\t{ opacity: 0; }\n\t\t62.5%\t{ opacity: 1; }\n\t\t75%\t\t{ opacity: 0; }\n\t\t87.5%\t{ opacity: 1; }\n\t\t100%\t{ opacity: 0; }\n\t}\n\t\/** Attribution *\/\n\t.verticalx15 .logoDiv {\n\t\tfloat: left !important;\n\t\tclear: both;\n\t\tmargin: 5px 0;\n\t}\n\t.verticalx15 .logoDiv a {\n\t\tfont-size: 13px;\n\t}\n\t.verticalx15 .logoDiv a span,\n\t.verticalx15 .trcMoreVideos a {\n\t\tcolor: #333;\n\t\tfont-size: 12px;\n\t\ttext-decoration: underline;\n\t}\n\t.verticalx15 .trcMoreVideos {\n\t\tfloat: right;\n\t\tclear: none !important;\n\t\tmargin: 5px 0;\n\t\t*height: 15px !important;\n\t}\n","locale":{"rbox":{"\":{\"MIME-Version":null,"Sponsored Link":[null,"Sponsored Link"],"Sponsored Link:":[null,"Sponsored Link:"],"Sponsored Video:":[null,"Sponsored Video:"],"Sponsored Video":[null,"Sponsored Video"],"in %1 Seconds":[null,"%1"],"%1 of %2":[null,"%1 of %2"]}}}};y.defaults=z;y.version="5-41-3-61030-4940592";TRC.publisherId=g.publisher;e.TRCImpl=r=new TRC.Manager(y,g);(w=v)();r.onclick=n.onclick;if(r.invisible){TRC.aspect.after(r,"internalDrawRBox",function(){(b=u)()},true)}return r};function s(y){if(t){return}var z=x.getElementsByTagName("script");t=x.createElement("script");if(z.length){z[0].parentNode.insertBefore(t,z[0])}t.charset="UTF-8";t.type="text/javascript";t.src="http://cdn.taboolasyndication.com/libtrc/"+y}function f(){if(!q.length){return}var y;while(y=q.shift()){for(var z in y){if(z=="onclick"){n.onclick=y[z]}else{g[z]=y[z]}}}s("impl.5-41-3-61030.js")}function h(){f();w();b()}function i(y){if(!!y.mode){d.push(y)}else{if(!!y.notify){o.push(y)}else{q.push(y)}}if(!!y.flush){m=true}}function l(y){for(var A=0;A<arguments.length;A++){y=arguments[A];if(y instanceof Array){for(var z=0;z<y.length;z++){i(y[z])}}else{i(y)}}h();return arguments.length}n=e[c]=e[c]||[];if(n.registered){return}n.push=l;n.registered=true;while(n.length){l(n.shift())}})(window,document);