/**
 * @author Robert Martone -- robertm[at]criticalmass.com
 */
/*global $, $$, $defined, $extend, $time, location, window, Browser, Class, Element, Fx, QVC, Swiff */
QVC = {
	'Modules': {
		'VideoPlayer': {
			'Player': new Class({
				'initialize': function (options) {
					this.container = options.container;
					this.container.store('control', this);
					this.controls = [];
					this.streams = [];
					this.configuration = {};
					this.initEvents = [];
					
					$extend(this, QVC.Modules.VideoPlayer.ConfigurationModel);
					$extend(this, QVC.Modules.VideoPlayer.EventModel);
				},
				'write': function (path, options) {
					var pathToSwf = path + '?' + $time();
					var container = this.container;
					var id = options.id || container.getProperty('id') + '_player';
					var params = {
						'allowFullScreen': true,
						'scale': 'noscale'
					};
					$extend(params, options.params);
					var vars = {
						instance: container.getProperty('id')
					};
					$extend(vars, options.vars);
					var properties = {};
					$extend(properties, options.properties);
					
					var FlashInfo = QVC.Utils.FlashInfo();
					
					if (FlashInfo.hasFlash && FlashInfo.majorVersion >= 9) {
						var player = new Swiff(pathToSwf, {
							id: id,
							container: container,
							width: options.width,
							height: options.height,
							params: params,
							properties: properties,
							vars: vars,
							events: options.events
						});
						this.dispatchEventToPlayer = function (event, parameters) {
							var swf = $(player.id);
							var e = '__' + event;
							return Swiff.remote(swf, e, [parameters]);
							
						};
						
						this.remove = function () {
							this.container.empty();
							this.dispatchEventToPlayer = function () {
								//nothing
							};
						};
					}
					else {
						this.dispatchEventToPlayer = function () {
							//nothing
						};
						this.remove = function () {
							$('noFlashMessage').destroy();
						};
						
						if (FlashInfo.hasFlash && FlashInfo.majorVersion < 9) {
							container.set('html', QVC.Modules.VideoPlayer.Degrade.inccorectFlashVersionHTMLMessage);
						}
						if (!FlashInfo.hasFlash) {
							container.set('html', QVC.Modules.VideoPlayer.Degrade.noFlashHTMLMessage);
						}
					}
				}
			}),
			'Controls': {
				'Control': new Class({
					initialize: function (options) {
						$extend(this, options);
					}
				}),
				'SimpleButton': new Class({
					initialize: function (upState, overState, downState, disabledState) {
						this.upState = upState;
						this.overState = overState;
						this.downState = downState;
						this.disabledState = disabledState;
					}
				})
			},
			'Stream': new Class({
				'initialize': function (params) {
					var previewTime = function () {
						if (params.previewImage === '') {
							return -1;
						}
						else {
							return params.previewTime;
						}
					};
					
					previewTime = previewTime();
					$extend(this, params);
				}
			}),
			'Configuration': new Class({
				'initialize': function (params) {
					$extend(this, params);
				}
			}),
			/**
			 * $DESCRIPTION
			 */
			'ConfigurationModel': {
				'init': function () {
					this.setConfiguration();
					this.setControls();
					this.setStream();
					this.initEvents.each(function (item, index) {
						item.event(item.params);
					});
					this.initEvents = [];
				},
				'addInitEvent': function (fn, params) {
					this.initEvents.push({
						'event': fn,
						'params': params
					});
				},
				'setStream': function (positionInArray) {
					var position = positionInArray || 0;
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('setStream', this.getData().streams[position], this.dispatchEventToPlayer);
				},
				'setPoint': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('setPoint', this.getData().point, this.dispatchEventToPlayer);
				},
				'setConfiguration': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('setConfiguration', this.getData().configuration, this.dispatchEventToPlayer);
				},
				'setControls': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('setControls', this.getData().controls, this.dispatchEventToPlayer);
				},
				'setVolume': function (volume) {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('setVolume', volume, this.dispatchEventToPlayer);
				},
				'addConfiguration': function (options) {
					this.configuration = JSON.encode(new QVC.Modules.VideoPlayer.Configuration(options));
				},
				'addStream': function (options) {
					this.streams.push(JSON.encode(new QVC.Modules.VideoPlayer.Stream(options)));
					this.streamIterator = new QVC.Utils.Iterator(this.streams);
				},
				'removeStream': function (position) {
					this.streams.splice(position, 1);
				},
				'removeStreams': function (position) {
					this.streams = [];
				},
				'addControl': function (options) {
					this.controls.push(JSON.encode(new QVC.Modules.VideoPlayer.Controls.Control(options)));
				},
				'removeControl': function (position) {
					this.controls.splice(position, 1);
				},
				'removeControls': function () {
					this.controls = [];
				},
				'setData': function () {
					this.Data = {
						streams: this.streams,
						configuration: this.configuration,
						controls: this.controls
					};
				},
				'getData': function () {
					this.setData();
					return this.Data;
				},
				'loadData': function (data) {
					var video = this;
					switch (data.type) {
					case 'controls':
						video.removeControls();
						data.controls.each(function (item, index) {
							video.addControl(item);
						});
						break;
					case 'configuration':
						video.addConfiguration(data.configuration);
						break;
					default:
					}
				}
			},
			'EventModel': {
				'animationChanged': function () {
					//nothing
				},
				'mute': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('mute', {}, this.dispatchEventToPlayer);
				},
				'unmute': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('unmute', {}, this.dispatchEventToPlayer);
				},
				'play': function () {
					//tagVideoCoremetrics('');
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('play', {}, this.dispatchEventToPlayer);
					this.unmute();
				},
				'pause': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('pause', {}, this.dispatchEventToPlayer);
				},
				'seek': function (time) {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('seek', time, this.dispatchEventToPlayer);
				},
				'fastForward': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('fastForward', {}, this.dispatchEventToPlayer);
				},
				'rewind': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('rewind', {}, this.dispatchEventToPlayer);
				},
				'expand': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('expand', {}, this.dispatchEventToPlayer);
				},
				'fullScreen': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('fullScreen', {}, this.dispatchEventToPlayer);
				},
				'contract': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('contract', {}, this.dispatchEventToPlayer);
				},
				'fullScreenClosed': function () {
					QVC.Managers.EventDispatchers.dispatchSimpleEvent('fullScreenClosed', {}, this.dispatchEventToPlayer);
				},
				'endOfStream': function () {
					if (this.streamIterator.hasNext()) {
						this.pause();
						this.setStream(this.streamIterator.next());
						this.play();
					} else {
						this.pause();
						this.setStream(this.streamIterator.first());
					/* Begin Defect 8200	*/	
						//this.seek(0);
						this.play();
				    /* End Defect 8200	 */	
					}
				}
			},
			'Gateway': function (event, target, parameters) {
				var control = $(target).retrieve('control');
				var seekTime = control.dispatchEventToPlayer('getValueFromModel', 'SEEK');
				if (event == 'play')
				{
					control['seek'](seekTime);
					control['play'](parameters);
					control['seek'](seekTime);
				}
				else
				{
					control[event](parameters);
				}
			},
			/**
			 * Provides messages to be displayed if the user does not have the Flash Player or the correct version of the Flash Player.
			 */
			'Degrade': {
				'noFlashHTMLMessage': '<span id="noFlashMessage" class="noFlashHTMLMessage"><p>This component requires Flash Player 9 or later.</p> <p>Please download the Flash Player from <a href="http://www.macromedia.com/go/getflashplayer">Adobe</a>.</p></span>',
				'inccorectFlashVersionHTMLMessage': '<span id="noFlashMessage" class="inccorectFlashVersionHTMLMessage"><p>This component requires Flash Player 9 or later.</p><p>Please download an upgrade from <a href="http://www.macromedia.com/go/getflashplayer">Adobe</a>.</p></span>'
			},
			'ModelEvents': {
				'ON_START': function (video) {
					return video.dispatchEventToPlayer('getValueFromModel', 'ON_START');
				},
				'FULL_SCREEN_CHANGED': function (video) {
					return video.dispatchEventToPlayer('getValueFromModel', 'FULL_SCREEN_CHANGED');
				},
				'EXPAND_STATE_CHANGED': function (video) {
					return this.dispatchEventToPlayer('getValueFromModel', 'EXPAND_STATE_CHANGED');
				},
				'MUTE_STATE_CHANGED': function (video) {
					return this.dispatchEventToPlayer('getValueFromModel', 'MUTE_STATE_CHANGED');
				},
				'PLAY_STATE_CHANGED': function (video) {
					return video.dispatchEventToPlayer('getValueFromModel', 'PLAY_STATE_CHANGED');
				},
				'SEEK': function (video) {
					return video.dispatchEventToPlayer('getValueFromModel', 'SEEK');
				},
				'VOLUME_CHANGED': function (video) {
					return video.dispatchEventToPlayer('getValueFromModel', 'VOLUME_CHANGED');
				}
			}
		},
		'ModalWindow': new Class({
			'initialize': function (content, options) {
				var maskColor = options.maskColor || '#ffffff';
				var maskAlpha = options.maskAlpha || 0.6;
				this.content = content;
				this.parent = this.content.getParent();
				this.height = options.height || '571px';
				this.width = options.width || '660px';
				this.degradedBackground = options.degradedBackground || '../assets/images/css-background/modal_mask_ie6.gif';
				this.initEvents = [];
				this.mask = new Element('div', {
					'id': 'modalWindow_Mask'
				});
				this.mask.setStyles({
					'position': 'absolute',
					'z-index': 1000,
					'top': '0px',
					'left': '0px',
					'height': '0px',
					'width': '0px'
				});
				if (Browser.Engine.gecko && Browser.Platform.mac || Browser.Engine.trident4) {
					this.mask.setStyle('background-image', 'url(' + this.degradedBackground + ')');
				} else {
					this.mask.setStyles({
						'background-color': maskColor,
						'opacity': maskAlpha
					});
				}
				this.window = new Element('div', {
					'id': 'modalWindow_Window'
				});
				this.window.setStyles({
					'position': 'absolute',
					'left': '1px',
					'top': '1px',
					'z-index': 1001,
					'height': '0px',
					'width': '0px',
					'background-color': maskColor,
					'border': '3px solid #ccc'
				});
			},
			'show': function () {
				var windowScrollSize = window.getScrollSize();
				var windowSize = window.getSize();
				var windowScroll = window.getScroll();
				var modal = this;
				this.mask.setStyles({
					'height': windowScrollSize.y,
					'width': windowScrollSize.x
				});
				
				this.mask.addEvent('click', function (e) {
					e.stop();
					modal.hide();
				});
				
				this.window.setStyles({
					'left': windowScroll.x + (windowSize.x / 2),
					'top': windowScroll.y + (windowSize.y / 2),
					'height': '0px',
					'width': '0px'
				});
				
				$$('body')[0].grab(this.mask);
				$$('body')[0].grab(this.window);
				
				var morphFX = new Fx.Morph(this.window, {'duration': 350, 'transition': Fx.Transitions.Sine.easeOut});
				
				morphFX.addEvent('complete', function () {
					modal.content.setStyle('display', 'block');
					modal.window.grab(modal.content);
					modal.initEvents.each(function (item, index) {
						item.event(item.params);
						modal.initEvents.splice(1, index);
					});
					modal.initEvents = [];
				});
				morphFX.start({
					'height': [0, this.height],
					'width': [0, this.width],
					'left': windowScroll.x + (windowSize.x - modal.width.toInt()) / 2,
					'top': windowScroll.y + (windowSize.y - modal.height.toInt()) / 2
				});
				var morph = function () {
					var windowScrollSize = window.getScrollSize();
					var windowSize = window.getSize();
					var windowScroll = window.getScroll();
					modal.window.setStyles({
						'left': windowScroll.x + (windowSize.x - modal.width.toInt()) / 2,
						'top': windowScroll.y + (windowSize.y - modal.height.toInt()) / 2
					});
				};
				window.addEvents({
					'scroll': function () {
						morph();
					},
					'resize': function () {
						morph();
					}
				});
			},
			'hide': function () {
				this.content.setStyle('display', 'none');
				this.parent.grab(this.content);
				this.window.destroy();
				this.mask.dispose();
			},
			'addInitEvent': function (fn, params) {
				this.initEvents.push({
					'event': fn,
					'params': params
				});	
			}
		})
	},
	'Utils': {
		'getObjectFromQueryString': function (url) {
			var o = {};
			if (url) {
				urlSplits = url.split('?');
				o.path = urlSplits[0];
				if (urlSplits.length > 1) {
					var queryString = urlSplits[1];
					if (trimAll(queryString) != "") {
						queryString = queryString.split('&');
						queryString.each(function (item, index) {
							var key_value = item.split('=');
							if (parseInt(key_value[1], 10) >= 0) {
								key_value[1] = parseInt(key_value[1], 10);
							}
							else if (key_value[1] === 'true') {
								key_value[1] = true;
							}
							else if (key_value[1] === 'false') {
								key_value[1] = false;
							}
							o[key_value[0]] = key_value[1];
						});
					}
				}
			}
			return o;
		},
		'getVarFromQueryString': function (key, url) {
			var regex;
			var results;
			if (arguments.length < 2) {
				url = location.href;
			}
			if (arguments.length > 0 && key !== '') {
				if (key === '#') {
					regex = new RegExp('[#]([^$]*)');
				}
				else if (key === '?') {
					regex = new RegExp('[?]([^#$]*)');
				}
				else {
					regex = new RegExp('[?&]' + key + '=([^&#]*)');
				}
				results = regex.exec(url);
				return (results === null) ? '' : results[1];
			}
			else {
				url = url.split('?');
				results = {};
				if (url.length > 1) {
					url = url[1].split('#');
					if (url.length > 1) {
						results.hash = url[1];
					}
					url[0].split('&').each(function (item, index) {
						item = item.split('=');
						results[item[0]] = item[1];
					});
				}
				return results;
			}
		},
		'FlashInfo': function () {
			var hasFlash;
			var version = Browser.Plugins.Flash.version;
			if (!$defined(version)) {
				return {
					'hasFlash': false,
					'version': 0,
					'majorVersion': 0,
					'minorVersion': 0
				};
			}
			else {
				return {
					'hasFlash': true,
					'version': version,
					'majorVersion': Browser.Plugins.Flash.version,
					'minorVersion': Browser.Plugins.Flash.build
				};
			}
		},
		'Iterator': new Class({
			'initialize': function (array) {
				this.array = array;
				this.index = 0;
			},
			'hasNext': function () {
				return (this.index < this.array.length - 1);
			},
			'next': function () {
				this.index++;
				return this.index;
			},
			'first': function () {
				this.index = -1;
				return this.next();
			},
			'last': function () {
				this.index = this.array.length - 1;
				return this.next();
			}
			
		})
	},
	'Managers': {
		'EventDispatchers': {
			'dispatchSimpleEvent': function (event, params, callback) {
				callback(event, params);
			},
			'dispatchExtendedEvent': function (dom, event, params, callback) {
				dom.fireEvent(event);
				callback(event, params);
			}
		}
	},
	'Helpers': {
		'Point': new Class({
			'initialize': function (x, y) {
				this.x = x || 0;
				this.y = y || 0;
			}
		}),
		'Location': new Class({
			'initialize': function (options) {
				var top = function () {
					if ($defined(options.top)) {
						return options.top;
					}
					else {
						return -1;
					}
				};
				this.top = top();
				
				var left = function () {
					if ($defined(options.left)) {
						return options.left;
					}
					else {
						return -1;
					}
				};
				this.left = left();
				
				var right = function () {
					if ($defined(options.right)) {
						return options.right;
					}
					else {
						return -1;
					}
				};
				this.right = right();
				
				var bottom = function () {
					if ($defined(options.bottom)) {
						return options.bottom;
					}
					else {
						return -1;
					}
				};
				this.bottom = bottom();
				
				var center = function () {
					if ($defined(options.center)) {
						return options.center;
					}
					else {
						return false;
					}
				};
				this.center = center();
			}
		}),
		'Border': new Class({
			'initialize': function (top, left, right, bottom, color) {
				this.top = top || 7;
				this.left = left || 7;
				this.right = right || 7;
				this.bottom = bottom || 7;
				this.color = color || '#ffffff';
			}
		})
	}
};