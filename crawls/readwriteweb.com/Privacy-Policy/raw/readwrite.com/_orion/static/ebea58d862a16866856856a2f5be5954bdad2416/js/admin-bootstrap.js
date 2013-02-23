/**
 * This is the basic admin bootstrap file that is loaded by Orion admin and content sites. Whenever
 * loaded on a content site it also loading `admin-dev.js`.
 *
 * The admin GIT SHA value is expected to be present on the script node which loads this file, like so:
 *
 *     <script type="text/javascript"
 *         
 *         ... required
 *
 *         id="admin-bootstrap"
 *         src="{{ url('/static/js/admin-bootstrap.js') }}"
 *         data-sha="{{ sha() }}" 
 *
 *         ... optional
 *
 *         data-jquery="x.x.x"
 *         data-gitbar="yes"
 *     ></script>
 *
 * It's possible to pass options via the say.options object before loading admin-bootstrap.js
 *
 *     <script>
 *     var say = {
 *         options : {
 *             sha    : '...',      // same as setting `data-sha`, must contain SHA value of the current GIT commit
 *             gitbar : 'yes',      // same as setting `data-gitbar`, if value is `yes` git bar will be shown
 *             jquery : 'version',  // if set, admin-dev.js will not try to load its own jQuery
 *         }
 *     };
 *     </script>
 *
 * @author agorbatchev
 * @date 2011/10/27
 */
;var say = (function(say, document, window)
{
	say = say || { options : {} };

	var slice = Array.prototype.slice;

	// translate `postMessage` events into jQuery events
	window.onmessage = function(e)
	{
		e = e || {};

		var args  = (e.data || '').split('\t'),
			event = args.shift()
			;

		if(event && event.indexOf(messagePrefix) === 0)
		{
			event = event.substr(messagePrefix.length);

			log('> onmessage', event, args);

			//
			// What's all this you might be asking yourself? 
			//
			// Well, this is a simple way to determine if a site that currently loaded
			// `admin-bootstrap.js` is inside the orion admin. From the site we send
			// `HELO` message to the parent window. If it responds with `EHLO`, we know
			// that we are inside orion admin.
			//

			// we are in admin, receiving message from iframe
			if(event === 'HELO')
			{
				log('- admin, responding to HELO, sending EHLO');
				say.postMessage(document.getElementById('sitePreview').contentWindow, 'EHLO');
			}
			// we are in the iframe, just received response from admin
			else if(event === 'EHLO')
			{
				options.isIframe = true;
				log('- site, responding to EHLO');
				initIframe();
			}
			else
			{
				$(say).trigger(event, args);
			}
		}
	};

	/**
	 * Functionality to manage cookies.
	 */
	say.cookies = {
		set : function(name, value, hours)
		{
			var expires = '';

			if(!isNaN(hours))
			{
				var date = new Date();
				date.setTime(date.getTime() + hours *  60 * 60 * 1000);
				expires = '; expires=' + date.toGMTString();
			}

			document.cookie = name + '=' + escape(value) + expires + '; path=/';
		},

		get : function(name, defaultValue)
		{
			var match = document.cookie.toString().match(new RegExp(name + 's*=s*(.*?)(;|$)'));
			return match ? unescape(match[1]) : defaultValue;
		},

		erase : function(name)
		{
			this.set(name, '', -1);
		}
	};

	/**
	 * Processes option value with specified name. If `say.option` object already has specified value,
	 * nothing happens. Otherwise tries to get new value from `data-[name]` attribute on the `script`
	 * tag.
	 *
	 * @author agorbatchev
	 * @date 2012/01/25
	 */
	function option(name)
	{
		if(typeof(options[name]) === 'undefined')
			options[name] = document.getElementById('admin-bootstrap').getAttribute('data-' + name);
	}

	say.log = function(namespace)
	{
		namespace = namespace ? namespace + ':' : '';

		function log()
		{
			var c    = function() {},//window.console,
				args = arguments,
				self = args.callee
				;

			if(c && c.log && c.log.apply)
			{
				args = slice.apply(args);
				args.unshift(namespace);
				args.unshift(messagePrefix);
				c.log.apply(window.console, args);
			}

			return self;
		}

		log.sub = function(subNamespace)
		{
			return say.log((namespace ? namespace + ' ' : '') + subNamespace);
		};

		log.log = log;

		return log;
	};

	say.loaded = function(file)
	{
		return say.log(file)('loaded by ' + say.pageUrl());
	};

	say.pageUrl = function()
	{
		return window.location.toString();
	};

	say.pageUrl = function()
	{
		return window.location.toString();
	};

	say.staticUrl = function(url)
	{
		return '/_orion/static/' + options.sha + url;
	};

	say.addScript = function(src)
	{
		log('addScript', src);

		var script = document.createElement('script');
		script.src = src;
		document.lastChild.appendChild(script);
	};

	say.postMessage = function()
	{
		var args   = Array.prototype.slice.apply(arguments),
			window = args.shift()
			;

		log('< postMessage', args);

		args[0] = messagePrefix + args[0];

		return window.postMessage(args.join('\t'), '*');
	};

	say.setPage = function(page, url)
	{
		// Notify the admin site every time we load a new page so we can load the settings.
		log('setPage', page);
		say.postMessage(parent, 'pageChange', page, url);
	};

	function addGitBar()
	{
		if(say.options.gitbar === 'yes') {
			say.addScript(say.staticUrl('/js/gitbar.js'));
			say.addScript(say.staticUrl('/js/vendor/spin.min.js'));
		}
	}

	/**
	 * Executed callback after jQuery becomes available. If `say.option.jquery` is not set and page currently
	 * doesn't have jQuery loaded, it will load its own version of jQuery. If option is specified or just loaded
	 * own version, it will then wait for jQuery object to become available and only then execute the callback.
	 *
	 * @author agorbatchev
	 * @date 2012/01/25
	 */
	function discoverJQuery(callback, waiting)
	{
		var result = true;

		if(!waiting)
			log('checking jQuery');

		function waitForJQuery()
		{
			if(!discoverJQuery(callback, true))
				setTimeout(waitForJQuery, 100);
		}
		
		// hook up jQuery autoload if it's not present
		if(typeof(jQuery) === 'undefined')
		{
			result = false;

			if(!waiting)
			{
				if(!say.options.jquery)
				{
					log('no jQuery found, loading');
					say.addScript(say.staticUrl('/js/vendor/jquery-1.7.1.js'));
				}
				else
				{
					log('waiting for jQuery to become available');
				}

				waitForJQuery();
			}
		}
		else
		{
			log('found jQuery', jQuery.fn.jquery, 'on', say.pageUrl());
			callback();
		}

		return result;
	}

	function initIframe()
	{
		log('initIframe');

		function getBlock(region, index)
		{
			var pid   = region + '-' + index,
				block = $('#' + pid)
				;
			
			if(!block.length)
				throw new Error('Block not found: ' + pid);

			return block;
		}

		function reloadingInProgress(target)
		{
			target.css('opacity', 0.5);
		}

		// a very lightweight loop to monitor body height and report it to orion when
		// it changes so that the iframe height would be adjusted.
		function iframeResizeLoop()
		{
			// a very lightweight loop to monitor body height and report it to orion when
			// it changes so that the iframe height would be adjusted.
			var bodyHeight = 0;

			setInterval(function()
			{
				// 60 for cross-browser safety
				var padding = 60,
					height  = document.body.scrollHeight
					;

				if(height - padding != bodyHeight)
				{
					say.postMessage(parent, 'autoResize', height + padding);
					bodyHeight = height;
				}
			}, 1000);
		}

		function ready()
		{
			addGitBar();

			// this is the hook that the page should set
			if(say.onAdminReady)
				say.onAdminReady();

			$(say).bind('beforeRefreshTemplate', function(e)
			{
				reloadingInProgress($(document.body));
			});

			/**
			 * Called by the admin site when the template settings have changed.
			 */
			$(say).bind('refreshTemplate', function(e)
			{
				log('> refreshTemplate');
				window.location.reload();
			});

			$(say).bind('beforeRefreshBlock', function(e, region, index)
			{
				reloadingInProgress(getBlock(region, index));
			});

			/**
			 * Called by the admin site a block settings have changed.
			 */
			$(say).bind('refreshBlock', function(e, region, index)
			{
				log('> refreshBlock', region, index);

				var pid = region + '-' + index;

				$.ajax({
					type    : 'GET',
					url     : document.location
							  + (document.location.toString().match(/\?/) ? '&' : '?')
							  + 'pid=' + pid,
					success : function(html)
					{
						getBlock(region, index).replaceWith(html);
					}
				});
			});

			$(say).bind('changeViewType', function(e, type)
			{
				log('> changeViewType', type);
				say.cookies.set('editorial_view_type', type, 24);
				window.location.reload();
			});

			if(say.options.isIframe)
			{
				iframeResizeLoop();

				// let parent orion know what is the current view type
				var type = say.cookies.get('editorial_view_type');
				if (!type) {
					type = 'all';
					say.cookies.set('editorial_view_type', type, 24);
				}
				say.postMessage(parent, 'updateViewType', type);
			}
		}

		if(parent)
			discoverJQuery(ready);
	}

	var meta          = document.getElementsByName('orion')[0],
		parent        = window.parent,
		options       = say.options = say.options || {},
		messagePrefix = 'orion:',
		log           = say.loaded('admin-bootstrap.js')
		;
	
	option('jquery');
	option('sha');
	option('gitbar');
	options.isIframe = false;
	options.isOrion  = meta && meta.getAttribute('content') === 'yes';

	log('bootstrap options', options);

	// Try to discover if the parent frame is orion CMS, if succesfull, it will
	// kick off `initIframe()`
	if(!options.isOrion)
	{
		if(parent !== window)
		{
			log('sending HELO');
			say.postMessage(parent, 'HELO');
		}
		else
		{
			discoverJQuery(addGitBar);
		}
	}

	return say;
})(say, document, window);
