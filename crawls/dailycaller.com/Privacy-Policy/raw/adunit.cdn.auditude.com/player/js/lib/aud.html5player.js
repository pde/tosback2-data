(function()
{
	aud = (typeof aud != 'undefined') ? aud : {};
	aud.html5 = {};

	/* Browser and Device Detection */
	function isIPad() { return navigator.userAgent.match(/iPad/i) !== null; }
	function isIPhone() { return navigator.userAgent.match(/iPhone/i) !== null; }
	function isIOS() { return isIPhone() || isIPad(); }
	function isAndroid() { return navigator.userAgent.match(/Android/i) !== null; }
	
	var _eventMap = {},
		_eventId = 0;

	aud.events = {
		init_complete 			: 'initComplete',
		init_failed 			: 'initFailed',
		break_begin 			: 'breakBegin',
		break_end 				: 'breakEnd',
		linear_ad_begin 		: 'linearAdBegin',
		linear_ad_end 			: 'linearAdEnd',
		non_linear_ad_begin 	: 'nonLinearAdBegin',
		non_linear_ad_end 		: 'nonLinearAdEnd',
		companion_banner_show 	: 'companionBannerShow',
		companion_banner_hide 	: 'companionBannerHide',
		pause_playback 			: 'pausePlayback',
		resume_playback 		: 'resumePlayback',
		ad_click 				: 'adClick',
		ad_progress 			: 'adProgress'
	};
	
	aud.notifications = {
		break_begin 			: 'notifyBreakBegin',
		break_end 				: 'notifyBreakEnd',
		video_playback_started 	: 'notifyVideoPlaybackStarted',
		video_playback_paused 	: 'notifyVideoPlaybackPaused',
		video_playback_resumed 	: 'notifyVideoPlaybackResumed',
		video_playback_complete : 'notifyVideoPlaybackComplete',
		video_playhead_update 	: 'notifyVideoPlayheadUpdate',
		notify_event			: 'notifyEvent'
	};
	
	var slice = Array.prototype.slice;
	aud.util = {
		handler : function(context, fn) {
			if (typeof fn == "string") { fn = context[fn]; }
			var args = slice.call(arguments, 2),
				cb = function() { return fn.apply(context, args.concat(slice.apply(arguments))); };
			return cb;
		},
		subscribe : function(name, fn) {
			if (!_eventMap[name]) { _eventMap[name] = []; }
			_eventMap[name].push(fn);
		},
		publish : function(name) {
			var fns = _eventMap[name];
			if (fns) {
				var l = fns.length;
				var i;
				for (i = 0; i < l; i++) {
					fns[i].apply(null, arguments);
				}
			}
		},
		remove : function(nm, fn) {
			if (!fn) { _eventMap[nm] = []; }
			else {}
		},
		addEvent : function(element, type, fn) {
			if (element.attachEvent) {
				element.attachEvent('on' + type, fn);
			} else {
				element.addEventListener(type, fn, false);
			}
		},
		removeEvent: function(element, type, fn) {
			if (element.removeEventListener) {
				element.removeEventListener(type, fn, false);
			} else if (element.detachEvent) {
				element.detachEvent('on' + type, fn);
			}
		},		
		trigger : function(video, mtd) {
			if (video[mtd]) { video[mtd](); }
			if (video.fireEvent)
			{
				if (video[mtd]) { video[mtd](); }
				else { video.fireEvent('on' + mtd); }
			}
			return true;
		},
		extend : function(to, from) {
			if (!to || !from) { return; }
			var k;
			for (k in from)
			{
				if(from[k]) { to[k] = from[k]; }
			}
		},
		pingUrl : function(url, data, method) {
			if (!url)
			{
				if (!data && !method) { (new Image()).src = type; }
				return;
			}
			if (method != 'post') {
				if (data)
				{
					if (url.indexOf('?') < 0) url += '?';
					
					var k; 
					for (k in data)
					{
						url += '&' + k + '=' + data[k];
					}
				}
				(new Image()).src = url;
			} else {
				try
				{
					var xdr = new XMLHttpRequest();
		            xdr.open("POST", url);
					xdr.setRequestHeader('Content-Type', 'text/plain');
		            xdr.send(data);
				}
				catch(e) {}
			}
		},		
		getChildrenByTagName : function(parent, name) {
			var data = [],
			    nodes = parent.childNodes;
			for(node in nodes)
			{
				if(nodes[node].tagName == name)
				{
					data.push(nodes[node]);
				}
			}
			return data;
		}		
	}

	aud.AdServerClient = {
		idx: 0,
		pre: 'audxdrs',
		request: function(uid, domain, zid, userData, cb)
		{
			var id = this.pre + (++this.idx), t = this;
			this[id] = function(resp) { t.handleResp(resp, cb); }
			var scr = this.script = document.createElement('script');
			// TODO (venkat): support for default media id.
			aud.util.extend(scr, {
					id : id,
					async : true,
					src : 'http://ad.' + domain + '/adserver?tm=15&jcb=aud.AdServerClient.' + id + 
							'&u=' + aud.util.MD5(uid) + 
							'&l=' + this.localTimeAsString() + 
							'&z=' + zid + 
							'&of=1.4' + 
							'&g=' + this.groupId() + 
							(userData ? '&k=' + userData : '')
			});
			document.body.appendChild(scr);
		},
		handleResp: function(resp, cb)
		{
			cb((new DOMParser()).parseFromString(resp, "text/xml"));
			document.body.removeChild(this.script);
			delete this[this.script.id];
			this.script = null;
		},
		groupId : function()
		{
			if (isIOS()) { return "1000004"; }
			if (isAndroid()) { return "1000005"; }
			return "1000006";
		},
		localTimeAsString : function()
		{
			var dt = new Date(),
				y = dt.getFullYear(),
				mo = dt.getMonth() + 1,
				d = dt.getDate(),
				h = dt.getHours(),
				mi = dt.getMinutes(),
				s = dt.getSeconds();

			if (mo < 10) mo = '0' + mo;
			if (d < 10) d = '0' + d;
			if (h < 10) h = '0' + h;
			if (mi < 10) mi = '0' + mi;
			if (s < 10) s = '0' + s;

			return y + mo + d + h + mi + s;
		}
	}
	
	aud.html5.AdPlayer = function(video, container, ad_domain, zone_id, opts) {
		if (!(this instanceof aud.html5.AdPlayer))
		{
			return new aud.html5.AdPlayer(video, container, ad_domain, zone_id, opts);
		}
		
		this.VERSION = "1.0.0";

		this._name = video;
		this._container = container;
		this._elem = null;
		this._overlay = null;
		this._adDomain = ad_domain;
		this._zoneId = zone_id;
		this._evtId = 'evtid_' + (++_eventId);
		this._addListeners();
		this._opts = (opts || zone_id) || {};
		this._serverTimeout = this._opts._serverTimeout || 10000;
	};
	
	var ap_proto = aud.html5.AdPlayer.prototype;
	
	var utils = ['publish', 'subscribe', 'remove'];
	for (var i = 0; i < utils.length; i++) {
		var method = utils[i];
		ap_proto[method] = (function (name) {
			return function() {
				var a = arguments;
				a[0] = a[0] + '.' + this._evtId;
				aud.util[name].apply(null, a);
				return this;
			}
		})(method);
	}                  	
	
	aud.util.extend(ap_proto, {
		init : function(video_id, params)
		{
			this._audVideoPlayer = null;
			this._submissions = {};
			this._globalSubmissionData = {};
			this._breaks = [];
			this._chapters = [];
			this._ads = {};
			this._breakIdx = 0;
			this._sequenceIndex = 0;
			this._currentGroup = null;
			this._currentSequence = null;
			this._currentChapterSequence = null;
			this._currentPar = null;
			this._parIndex = 0;
			this._chapterIdx = 0;
			this._initFailed = false;
			this._params = params || {};
			this._initCompleted = false; 
			this._bStart = false; 
			
			aud.AdServerClient.request(video_id, this._adDomain, this._zoneId, this._params.userData, aud.util.handler(this, this._loadXml));
			var t = this;
			setTimeout(function()
			{
				if (!t._initCompleted) { t._failInit(); }
			}, this._serverTimeout);
			return this;
		},
		
		_failInit : function()
		{
			if(this._initFailed || this._initCompleted) { return; }
			this.publish(aud.events.init_failed,this);
			this._initFailed = true;
		},

		_startBreak : function()
		{
			var current = this._breaks[this._breakIdx];
			this.publish(aud.events.break_begin, this);

			_currentGroup = this._breaks[this._breakIdx];
			if (!_currentGroup || !_currentGroup.seqs)
			{
				this._endBreak();
			}
				
			//reset break variables
			this._bStart = true;
			this._sequenceIndex = 0;
			this._currentSequence = null;
			this._showNextSequence();			
		},

		_endBreak : function(forced)
		{
			this._breakIdx++;
			this._bStart = false;

			if (this._audVideoPlayer)
			{
				this._audVideoPlayer.destroy();
				this._audVideoPlayer = null;
			}

			if (!forced)
			{
				this.publish(aud.events.break_end, this);
			}
		},

		_showNextSequence : function()
		{
			// ping sequence end for the current sequence
			if (this._currentSequence)
			{
				this._pingSequence(this._currentSequence, false, true);
			}
			
			var seqs = _currentGroup.seqs;
			
			if (seqs && (this._sequenceIndex < seqs.length))
			{
				this._currentSequence = seqs[this._sequenceIndex];
				this._sequenceIndex++;
				if (!this._currentSequence)
				{          
					this._showNextSequence();
					return;
				}
				
				this._pingSequence(this._currentSequence, true, false);
				
				if(this._currentSequence.pars.length > 0)
				{                     
					this._parIndex = 0; 
					this._showNextPar();
				}
				else
				{
					this._showNextSequence();
					return;
				}				
			}
			else
			{
				this._endBreak();
			}			
		},		

		_showNextPar : function()
		{
			var pars = this._currentSequence.pars;  
			var t = this;
			var progressSent = [];
			var adStarted = false;

			if (pars && (this._parIndex < pars.length))
			{
				this._currentPar = this._currentSequence.pars[this._parIndex];
				this._parIndex++;
				
				if (this._currentPar && this._currentPar.assets)
				{
					var current = null;
					var banners = [];
					var id;
					for (id in this._currentPar.assets)
					{
						var asset = this._currentPar.assets[id];
						switch (asset.contentType)
						{
							case 'linear':
								current = asset;
								break;
							case 'companion':
								switch (asset.behaviour.format)
								{
									case 'onpage':
										banners.push(asset);
										break;
									default:
										break;
								}
								break;
							default:
								break;
						}
					}

					var context = {
						banners: banners,
					};
					context.session = this._createSession(this, context, current, this._currentSequence, this._currentPar);
					
					console.log("#####");

					switch (current.behaviour.format)
					{
						case 'video':   
							var opts = {
									w: current.mediaFiles[0].width,
									h: current.mediaFiles[0].height,
														
									handlers: {
										play: function()
										{
											console.log("--->> video play");
											context.session.notifyStart(); // TODO (venkat) this could be a infinit loop. check.
										},

										ended: function(evt, player, video)
										{
											console.log("--->> video ended");
											context.session.notifyComplete(); // TODO (venkat) this may not always be video complete.
																							
											if (t._audVideoPlayer && !t._audVideoPlayer._video) // if no video, break was forced to end
											{
												t._audVideoPlayer.destroy();
											}
											else if (t._audVideoPlayer)
											{
												t._showNextPar();
											}
										},
										
										timeupdate: function()
										{
											console.log("--->> video timeupdate");
											context.session.notifyPlayheadUpdate(this.currentTime, this.duration);
										},
										
										pause: function()
										{
											console.log("--->> video paused");
										},
										
										error: function()
										{
											// TODO (venkat): handle error in playback
											console.log("--->> video error");
										}
									},
									
									customHandlers: this._opts.handlers || [],
									controls: this._opts.controls,
									style: this._opts.style || false
								};

								this._audVideoPlayer = AUD_Html5VideoPlayer.create(this._name, current.mediaFiles[0].src, opts);
								this._elem = this._audVideoPlayer._elem;
							break;
						default:
							break;
					}					
				}   
				else
				{
					this._showNextPar();
					return;
				}
			}
			else
			{
				this._showNextSequence();
				return;
			} 		
		},				
		
		_startChapter : function()
		{
			var chapter = this._chapters[this._chapterIdx], t = this;
			if (!chapter || !chapter.seqs || !chapter.seqs.length) return;
			
			var seqs = chapter.seqs;
			var i;
			for (i = 0; i < seqs.length; i++)
			{
				this._currentChapterSequence = seqs[i];				
				this._pingSequence(this._currentChapterSequence, true, true);
				
				if (this._currentChapterSequence.pars.length > 0)
				{
					var j;
					for (j = 0; j < this._currentChapterSequence.pars.length; j++)
					{
						var par = this._currentChapterSequence.pars[j];
						if (!par.assets) { return; }
						
						var current = null;
						var banners = [];
						var id;
						for (id in par.assets)
						{
							var asset = par.assets[id];
							switch (asset.contentType)
							{
								case 'nonlinear':
									current = asset;
									break;
								case 'companion':
									switch (asset.behaviour.format)
									{
										case 'pause':
											break;
										case 'onpage':
											banners.push(asset);
											break;
										default:
											break;
									}
									break;
								default:
									break;
							}
							
							var context = {
								banners: banners,
							};
							context.session = this._createSession(this, context, current, this._currentSequence, this._currentPar);
							// this._initOverlay(current, context);
						}						
					}
				}
			}
			
			this._chapterIdx++;
		},
		
		_endChapter : function()
		{
			if (this._overlay)
			{
				this._elem.removeChild(this._overlay);
				this._overlay = null;
			}
			
			if (this._currentChapterSequence)
			{
				this._pingSequence(this._currentChapterSequence, false, false);
			}
			
			this._currentChapterSequence = null;
		},
		
		_handleGenericEvent : function(context)
		{
			if (context)
			{
				switch (context.notificationType)
				{
					case 'sequenceBegin':
						this._pingSequence(context.sequence, context.begin, context.advancePattern);
						break;
					case 'sequenceEnd':
						this._pingSequence(context.sequence, context.begin, context.advancePattern);
						break;
					default:
						break;
				}
			}
		},

		_createSession : function(context, sessionContext, asset, sequence, par) {
			var t = this;
			var progressSent = [];
			var adStarted = false;
						
			session = {
				notifyStart : function()
				{
					if (!adStarted)
					{
						adStarted = true;
						context.publish(aud.events.linear_ad_begin, t, sessionContext);
						if (!progressSent[0])
						{
							progressSent[0] = true;
							context._pingAdTracking(asset.trackings['creativeView']);
							context._pingAdTracking(asset.trackings['0%']);
							context._pingAdSubmission(asset.submissions['creativeView'], sequence, par);
							context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '0');
						}
					}					
					return this;
				},
				notifyStop : function()
				{
					if (context._audVideoPlayer)
					{
						context._audVideoPlayer.trigger('stop');
					}
					return this;
				},
				notifyComplete : function()
				{
					context.publish(aud.events.linear_ad_end, t, sessionContext);
					if (adStarted && !progressSent[100])
					{
						progressSent[100] = true;
						context._pingAdTracking(asset.trackings['100%']);
						context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '100');
					}					
					return this;
				},				
				notifyPlayheadUpdate : function(currentTime, duration)
				{
					var progress = Math.round(currentTime.toFixed(1) / duration * 100);
					if (progress == 100 && !progressSent[100])
					{
						progressSent[progress] = true;
						context._pingAdTracking(asset.trackings['100%']);
						context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '100');
					}
					else
					{
						if (progress > 25 && !progressSent[25])
						{
							progressSent[25] = true;
							context._pingAdTracking(asset.trackings['25%']);
							context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '25');							
						}
						else if (progress > 50 && !progressSent[50])
						{
							progressSent[50] = true;
							context._pingAdTracking(asset.trackings['50%']);
							context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '50');							
						}
						else if (progress > 75 && !progressSent[75])
						{
							progressSent[75] = true;
							context._pingAdTracking(asset.trackings['75%']);
							context._pingAdSubmission(asset.submissions['creativeProgress'], sequence, par, '75');							
						}
					}					
				},
				notifyPause : function()
				{
					if (context._audVideoPlayer)
					{
						context._audVideoPlayer.trigger('pause');
					}
					return this;
				},
				notifyResume : function()
				{
					if (context._audVideoPlayer)
					{
						context._audVideoPlayer.trigger('play');
					}
					return this;
				}								
			};
			return session;
		},		
		
		getAdEventsInBreak : function(breakIndex)
		{
			var ads = [];
			var index = (typeof breakIndex != 'undefined') ? breakIndex : -1;
			var currentGroup = (index >= 0) ? this._breaks[index] : this._breaks[this._breakIdx];
			
			if (currentGroup && currentGroup.seqs)
			{
				var sequenceIndex = 0;
				var parIndex = 0;
				var currentSequence;
				var seqs = currentGroup.seqs;
										
				if (sequenceIndex < seqs.length)
				{
					currentSequence = seqs[sequenceIndex];
					while (currentSequence)
					{
						sequenceIndex++;
						
						// add the sequence
						ads.push({
							type: "notify",
							notificationType: "sequenceBegin",
							sequence: currentSequence,
							begin: true,
							advancePattern: false
						});
						
						if(currentSequence.pars.length > 0)
						{                     
							parIndex = 0;
							var currentPar;
							var pars = currentSequence.pars;  
							var t = this;

							if (parIndex < pars.length)
							{
								currentPar = pars[parIndex];
								while (currentPar)
								{
									parIndex++;
									if (currentPar.assets)
									{
										var current = null;
										var banners = [];
										var id;
										for (id in currentPar.assets)
										{
											var asset = currentPar.assets[id];
											switch(asset.contentType)
											{
												case 'linear':
													current = asset;
													break;
												case 'companion':
													switch(asset.behaviour.format)
													{
														case 'onpage':
															banners.push(asset);
															break;
														default:
															break;
													}
													break;
												default:
													break;
											}
										}
										
										if (current && current.behaviour.format == 'video')
										{
											var context = {
												type: "ad",
												adType: "linear",
												format: "video",
												asset: current,
												banners: banners,
												sequence: currentSequence,
												par: currentPar,
											};
											
											context.session = this._createSession(this, context, current, currentSequence, currentPar);
											
											ads.push(context);
										}
										
										currentPar = pars[parIndex];
									}
									else
									{
										currentPar = pars[parIndex];
									}
								}

								// add the sequence end notification
								ads.push({
									type: "notify",
									notificationType: "sequenceEnd",
									sequence: currentSequence,
									begin: false,
									advancePattern: true
								});
								currentSequence = seqs[sequenceIndex];
								continue;
							}
							else
							{
								// add the sequence end notification
								ads.push({
									type: "notify",
									notificationType: "sequenceEnd",
									sequence: currentSequence,
									begin: false,
									advancePattern: true
								});
								
								currentSequence = seqs[sequenceIndex];
								continue;
							}
						}
						else
						{
							// add the sequence end notification
							ads.push({
								type: "notify",
								notificationType: "sequenceEnd",
								sequence: currentSequence,
								begin: false,
								advancePattern: true
							});

							currentSequence = seqs[sequenceIndex];
							continue;
						}
					}
				}
			}

			return ads;
		},				
				
		_sendSubmission : function(type, data, method)
		{
			aud.util.pingUrl(this._submissions[type], data, method);
		},			

		_pingSequence : function(sequence, isBegin, advancePattern)
		{
			if (sequence)
			{
				var data = {};
				aud.util.extend(data, sequence.setvalues);
				data['advancepattern'] = (advancePattern ? '1' : '0');
				data['event'] = (isBegin ? 'start' : 'complete');
				this._sendSubmission('podprogress', data, 'get');				
			}
		},
		
		_pingAdSubmission : function(submissions, sequence, par, progress)
		{
			if (submissions)
			{
				var i;
				for (i = 0; i < submissions.length; i++)
				{
					var data = {};
					aud.util.extend(data, this._globalSubmissionData);
					aud.util.extend(data, sequence.setvalues);
					aud.util.extend(data, par.setvalues);
					
					if (progress)
					{
						var state = {};
						state['progress'] = progress;
						state['unit'] = 'percent';
						aud.util.extend(data, state);
					}
					aud.util.pingUrl(submissions[i]['action'], data, submissions[i]['method']);
				}
			}
		},
		
		_pingAdTracking : function(trackings)
		{
			if (trackings)
			{
				var i;
				for (i = 0; i < trackings.length; i++)
				{
					aud.util.pingUrl(trackings[i]['action']);
				}
			}
		},		

		_addListeners : function()
		{
			var t = this;
			
			this.subscribe(aud.notifications.break_begin, function() {
				t.publish(aud.events.pause_playback, t);
				t._startBreak();
			});
			this.subscribe(aud.notifications.break_end, function() {
				t._endBreak(true);
				t.publish(aud.events.resume_playback, t);	
			});
			this.subscribe(aud.notifications.video_playback_started, function() {
				t._startChapter();
			});
			this.subscribe(aud.notifications.video_playback_complete, function() {
				t._endChapter();
			});
			
			this.subscribe(aud.notifications.video_playback_paused, function() {
				
			});
			this.subscribe(aud.notifications.video_playback_resumed, function() {
				
			});
			this.subscribe(aud.notifications.video_playhead_update, function(name, currentTime, duration) {
			});
			this.subscribe(aud.notifications.notify_event, function(name, context) {
				t._handleGenericEvent(context);
			});			
		},
		
		/****************************************************/
		/****************** XML Parsing *********************/
		/****************************************************/
		
		_loadXml : function(xmlDoc) {
			if(this._initFailed) return;
			this._xmlDoc = xmlDoc;
			if (this._xmlDoc) {
				this._parseXml(this._xmlDoc);
				this._initCompleted = true;
				this.publish(aud.events.init_complete, this);
			}
			else {
				this._failInit(); 
			}
		},
		
		_parseXml : function(xml)
		{
			var head = xml.getElementsByTagName('head'),
			body = xml.getElementsByTagName('body'),
			ads = xml.getElementsByTagName('ad');

			this._parseSubmissions(head);
			this._parseAds(ads);
			this._parseSmil(body[0].childNodes);
		},
		
		_parseSubmissions : function(xml)
		{
			if (!xml) return;
			xml = xml[0];
			var data = xml.getElementsByTagName('data'),
			submissions = xml.getElementsByTagName('submission'),
			parameters = data[0].childNodes;
			this._globalSubmissionData = {};
			
			var i;
			for (i = 0; i < parameters.length; i++)
			{
				var p = parameters[i];
				this._globalSubmissionData[p.tagName] = p.firstChild.data;
			}
			
			for (i = 0; i < submissions.length; i++)
			{
				var submission = submissions[i],
				id = submission.getAttribute('id'),
				url = submission.getAttribute('action');
				if (url.indexOf('?') < 0) url += '?';
				this._submissions[id] = url;
				var k;
				for (k in this._globalSubmissionData) this._submissions[id] += '&' + k + '=' + this._globalSubmissionData[k];
			}
		},
		
		_parseAds : function(ads)
		{
			var i;			
			for(i = 0; i < ads.length; i++)
			{
				var adId = ads[i].getAttribute('id'),
					submissions = aud.util.getChildrenByTagName(ads[i], 'submission'),
					pars = ads[i].getElementsByTagName('par'),
					assets = ads[i].getElementsByTagName('asset'),
					behaviors = ads[i].getElementsByTagName('Behavior'),
					ad = {
						id : adId,
						submissions : {},
						pars : {},						
						assets : {},
						extensions: {
							behaviors : {}							
						}
					};
					
				var j;	
				for (j = 0; j < submissions.length; j++)
				{
					ad.submissions[submissions[j].getAttribute('id')] = {
						id : submissions[j].getAttribute('id'),
						action : submissions[j].getAttribute('action'),
						method : submissions[j].getAttribute('method')
					};
				}
				
				for (j = 0; j < assets.length; j++)
				{
					var assetId = assets[j].getAttribute('id');
					var mediaFiles = assets[j].getElementsByTagName('mediaFile');
					var clicks = assets[j].getElementsByTagName('click');
					var trackings = assets[j].getElementsByTagName('tracking');
					submissions = aud.util.getChildrenByTagName(assets[j], 'submission');
					
					ad.assets[assetId] = {
						id : assetId,
						contentType : assets[j].getAttribute('contentType'),
						version : assets[j].getAttribute('version'),
						parameters : assets[j].getAttribute('parameters'),
						timeOffset : assets[j].getAttribute('timeOffset'),
						runtime : assets[j].getAttribute('runtime'),
						mediaFiles : [],
						submissions: {},
						trackings: {},
						clicks : {}
					};
					
					var m;
					for (m = 0; m < mediaFiles.length; m++)
					{
						ad.assets[assetId].mediaFiles.push({
							src : mediaFiles[m].getAttribute('src'),
							type : mediaFiles[m].getAttribute('type'),
							height : mediaFiles[m].getAttribute('height'),
							width : mediaFiles[m].getAttribute('width')
						});
					}
					
					for (m = 0; m < submissions.length; m++)
					{
						if (!ad.assets[assetId].submissions[submissions[m].getAttribute('id')])
						{
							ad.assets[assetId].submissions[submissions[m].getAttribute('id')] = [];
						}
						ad.assets[assetId].submissions[submissions[m].getAttribute('id')].push({
							action : submissions[m].getAttribute('action'),
							method : submissions[m].getAttribute('method')
						});
					}
					
					for (m = 0; m < trackings.length; m++)
					{
						var trackingId = trackings[m].getAttribute('actuate') || 'creativeView';
						if (!ad.assets[assetId].trackings[trackingId])
						{
							ad.assets[assetId].trackings[trackingId] = [];
						}						
						ad.assets[assetId].trackings[trackingId].push({
							action : trackings[m].getAttribute('action')
						});
					}					
					
					for (m = 0; m < clicks.length; m++)
					{
						ad.assets[assetId].clicks[clicks[m].getAttribute('id')] = {
							href : clicks[m].getAttribute('href'),
							title : clicks[m].getAttribute('title'),
							submissions : (function(submissions) {
								var data = {};
								var n;
								for(n = 0; n < submissions.length; n++) {
									data[submissions[n].getAttribute('id')] = {
										id : submissions[n].getAttribute('id'),
										action : submissions[n].getAttribute('action'),
										method : submissions[n].getAttribute('method')
									};
								}
								return data;
							}(aud.util.getChildrenByTagName(clicks[m], 'submission')))
						};
					}
				}
				
				for (j = 0; j < behaviors.length; j++)
				{					
					var behavior = behaviors[j];
					ad.extensions.behaviors[behavior.getAttribute('type')] = {};					
					var params = behavior.firstChild.nodeValue.split('&');
					for(m = 0; m < params.length; m++) {
						var param = params[m].split('=');
						ad.extensions.behaviors[behavior.getAttribute('type')][param[0]] = param[1]; 
					}
				}	
						
				for (j = 0; j < pars.length; j++)
				{
					var refs = pars[j].getElementsByTagName('ref');
					assets = {};
					for(m = 0; m < refs.length; m++)
					{
						assetId = refs[m].getAttribute('asset').split('.')[1];
						assets[assetId] = ad.assets[assetId];
						if(ad.extensions.behaviors[assetId])
						{
							assets[assetId]['behaviour'] = ad.extensions.behaviors[assetId];
						}						
					}
					ad.pars[pars[j].getAttribute('id')] = assets;
				}			
				
				this._ads[adId] = ad;
			}			
		},
		
		_parseSmil : function(seqs)
		{
			var last = null;
			var i;
			for (i = 0; i < seqs.length; i++)
			{
				var seq = this._createSeq(seqs[i]);
				
				if (last != seq.ctype)
				{
					var group = this._createGroup(seq.ctype);
					group.dur += parseInt(seq.dur);
					group.count += parseInt(seq.count);
					group.seqs.push(seq);
					switch (seq.ctype)
					{
						case 'linear':
							this._breaks.push(group);
							break;
						case 'nonlinear':
							this._chapters.push(group);
							break;
						default:
							break;
					}
				} 
				else
				{
					switch (seq.ctype)
					{
						case 'linear':
							this._breaks[this._breaks.length - 1].dur += parseInt(seq.dur);
							this._breaks[this._breaks.length - 1].count += parseInt(seq.count);						
							this._breaks[this._breaks.length - 1].seqs.push(seq);					
							break;
						case 'nonlinear':
							this._chapters[this._breaks._chapters - 1].dur += parseInt(seq.dur);
							this._chapters[this._breaks._chapters - 1].count += parseInt(seq.count);						
							this._chapters[this._chapters.length - 1].seqs.push(seq);	
							break;
						default:
							break;
					}
				}

				last = seq.ctype;
			}
		},		
		
		_createGroup : function(type)
		{
			return {
				type : type,
				dur : 0,
				count : 0,
				seqs : []				
			};
		},		
		
		_createSeq : function(xml)
		{
			var nodes = xml.childNodes;
			var metas = {};
			var setvalues = {};
			var sends = [];
			var pars = [];
			
			var j;
			for(j = 0; j < nodes.length; j++)
			{
				var node = nodes[j];
				switch(node.tagName) {
					case 'meta':
						metas[node.getAttribute('name')] = node.getAttribute('content');
						break;
					case 'setvalue':
						setvalues[node.getAttribute('ref')] = node.getAttribute('value');
						break;
					case 'send':
						sends.push(node.getAttribute('submission'));
						break;
					case 'par':
						pars.push(this._createPar(node));
						break;
					default:
						break;
				}
			}
			
			var seq = {
				ctype : metas.ctype,
				ptype : metas.ptype,
				dur : metas['max-dur'] || metas['dur'],
				count : metas['max-count'] || metas['count'],
				setvalues : setvalues,
				sends : sends,
				pars : pars
			};
			
			return seq;
		},
		
		_createPar : function(xml)
		{			
			var nodes = xml.childNodes;
			var setvalues = {};
			var metas = {};
			var assets = {};
			
			var j;
			for (j = 0; j < nodes.length; j++)
			{
				var node = nodes[j];
				switch (node.tagName)
				{
					case 'meta':
						metas[node.getAttribute('name')] = node.getAttribute('content');
						break;
					case 'setvalue':
						setvalues[node.getAttribute('ref')] = node.getAttribute('value');
						break;
					case 'ref':
						var par = null;
						var id = node.getAttribute('src').split(':').pop();
						
						if (id.lastIndexOf('#') > 0)
						{
							var parts = id.split('#');
							id = parts[0];
							par = parts[1];
							aud.util.extend(assets, this._ads[id].pars[par]);							
						}
						/* else // no external ads for now...
						{
							var ad = this._ads[id];
							if (ad)
							{
								var par;
								for (par in ad.pars)
								{
									aud.util.extend(assets, ad.pars[par]);
								}
							}
						} */
						break;
					default:
						break;
				}
			}
			
			par = {
				setvalues : setvalues,
				metas : metas,
				assets : assets
			};
			
			return par;
		}
	});
	
	
	/****************************************************/
	/****************** HTML5 Video *********************/
	/****************************************************/		
	
	function AUD_Html5VideoPlayer(name, src, opts) {
		console.log(src);
		console.log("name: " + name);
		this._playerContainer = null;
		this._opts = opts || {};
		this._src = [src];
		this._handlers = this._opts.handlers || {};
		this._customHandlers = {};

		this._elem = typeof (name) == 'object' ? name : document.getElementById(name);
		this._video = (this._elem.tagName.toLowerCase() == 'video') ? this._elem : null;
		this._reusingExternalVideoObject = this._video ? true : false;
		console.log("reusing: " + this._reusingExternalVideoObject);
			
		if (src)
		{
			// create the video player if it doesn't exist already.
			this._createVideoPlayer(this._opts);
			
			this._addHandlers();
			this._setSrc();
		}
	}
	
	AUD_Html5VideoPlayer.create = function(name, src, opts) {
		var player = new AUD_Html5VideoPlayer(name, src, opts);
		console.log("calling load and play");
		player.load();
		player.play();
		
		return player;
	}	       
	
	aud.util.extend(AUD_Html5VideoPlayer.prototype, {
		opts : function(opts) {
			var k;
			for (k in opts) { this._opts[k] = opts[k]; }
			return this;
		},
		src : function(src) {
			this._src = [src];
			return this;
		},
		play : function() {
			this.trigger('play');
			return this;
		},
		load : function() {
			this.trigger('load');
			return this;
		},		
		trigger : function(method) {
			aud.util.trigger(this._video, method);
			return this;
		},
		_createVideoPlayer : function(opts) {
			if (!this._video)
			{
				var players = this._elem.getElementsByTagName('video');
				if (players && players.length)
				{
					this._video = players[0];
					this._reusingExternalVideoObject = true;
				}
				else
				{
					var playerDiv = document.createElement('div');
					var player = document.createElement('video');

					// set dimensions on the video object
					if (opts.style.width && opts.style.height)
					{
						aud.util.extend(player, {
							width : opts.style.width,
							height : opts.style.height
						});
					}
					else
					{
						aud.util.extend(player, {
							width : '100%',
							height : '100%'
						});					
					}
					
					var style = playerDiv.style;
					style.width = '100%';
					style.height = '100%';
					
					playerDiv.appendChild(player);
					this._elem.appendChild(playerDiv);
					
					this._video = player;
					this._playerContainer = playerDiv;
					
					// show the parent element.
					this._elem.style.display = 'block';
				}
			}
		},
		_setSrc : function() {
			var vid = this._video;
			vid.controls = this._opts.controls;
			
			// remove existing 'src' attribute and 'source' child nodes
			vid.removeAttribute('src');
			var sources = vid.getElementsByTagName('source');
			if (sources)
			{
				var i;
				for (i = 0; i < sources.length; i++)
				{
					vid.removeChild(sources[i]);
				}
			}
			
			console.log("setting source on the video: " + this._src[0]);	
			vid.src = this._src[0];

		},
		_addHandlers : function() {
			var handlers = this._handlers,
				vid = this._video;
			
			if (handlers)
			{
				var k;
				for (k in handlers)
				{
					this._handlers[k] = (function(context, fn) {
						return function(e) { fn.apply(context, [e]); return false; }
					})(vid, handlers[k]);
				}
			}
			
			handlers = this._handlers;	
			if (handlers)
			{
				for (k in handlers)
				{
					aud.util.addEvent(vid, k, handlers[k]);
				}
			}
			
			//add custom handlers
			handlers = this._opts.customHandlers;
			if (handlers)
			{
				for (k in handlers)
				{
					this._customHandlers[k] = (function(context, v, fn, type) {
						return function(){ fn(type, context, v); return false; }
					})(this, vid, handlers[k], k);
				}
			}

			handlers = this._customHandlers;
			if (handlers)
			{
				for (k in handlers)
				{
					aud.util.addEvent(vid, k, handlers[k]);
				}
			}
		},
		destroy : function() {
			var vid = this._video;
			
			// show the video element. 
			// TODO (venkat): Do this only when we created the video object.
			if (!this._reusingExternalVideoObject)
			{
				vid.style.display = 'none';
			}
			
			//remove handlers
			var handlers = this._handlers;
			var k;
			if (handlers)
			{
				for (k in handlers)
				{
					aud.util.removeEvent(vid, k, handlers[k]);
				}
			}
			
			//remove custom handlers
			handlers = this._customHandlers;
			if (handlers)
			{
				for (k in handlers)
				{
					aud.util.removeEvent(vid, k, handlers[k]);
				}
			}

			if (this._playerContainer)
			{
				this._elem.removeChild(this._playerContainer);
				this._video = null;

				// hide the parent element.
				this._elem.style.display = 'none';
			}
		}
	});
	

	/****************************************************/
	/*************** UTILITY FUNCTIONS ******************/
	/****************************************************/	
	
	if (typeof(DOMParser) == 'undefined')
	{ //IE compat
		DOMParser = function() {}
		DOMParser.prototype.parseFromString = function(str, contentType) {
			if (typeof(ActiveXObject) != 'undefined')
			{
				var xmldata = new ActiveXObject('MSXML.DomDocument');
				xmldata.async = false;
				xmldata.loadXML(str);
				return xmldata;
			}
			else if (typeof(XMLHttpRequest) != 'undefined')
			{
				xmldata = new XMLHttpRequest;
				if (!contentType)
				{
					contentType = 'application/xml';
				}
				xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
				if (xmldata.overrideMimeType)
				{
					xmldata.overrideMimeType(contentType);
				}
				xmldata.send(null);
				return xmldata.responseXML;
			}
		};
	}

	/**
	*  MD5 (Message-Digest Algorithm)
	*  http://www.webtoolkit.info/
	**/
	aud.util.MD5 = function(string) {
		function RotateLeft(lValue, iShiftBits)
		{
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		}

		function AddUnsigned(lX,lY)
		{
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
	 	}

	 	function F(x,y,z) { return (x & y) | ((~x) & z); }
	 	function G(x,y,z) { return (x & z) | (y & (~z)); }
	 	function H(x,y,z) { return (x ^ y ^ z); }
		function I(x,y,z) { return (y ^ (x | (~z))); }

		function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		}

		function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		}

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			
			var n;	
			for (n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		}

		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;

		string = Utf8Encode(string);

		x = ConvertToWordArray(string);

		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}

		var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
		return temp.toLowerCase();
	};	
})();