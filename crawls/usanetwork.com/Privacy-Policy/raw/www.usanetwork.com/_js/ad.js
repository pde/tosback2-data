function usa_outputAd(options)
{
	// setup main defaults
	var debug = false;
	
	try {
		var p_ad_section = (typeof parent.ad_section != 'undefined') ? parent.ad_section : ad_section;
		var p_ad_subcategory = (typeof parent.ad_subcategory != 'undefined') ? parent.ad_subcategory : ad_subcategory;
		var p_ad_genre = (typeof parent.ad_genre != 'undefined') ? parent.ad_genre : ad_genre;
		var p_ad_uri = (typeof parent.ad_uri != 'undefined') ? parent.ad_uri : ad_uri;
		var p_ad_override_category = (typeof parent.ad_override_category != '') ? parent.ad_override_category : ad_override_category;
		var p_randDARTNumber = (typeof parent.randDARTNumber != 'undefined') ? parent.randDARTNumber : randDARTNumber;
		var p_adops_params = (typeof parent.top.__nbcudigitaladops_dtparams != 'undefined') ? parent.top.__nbcudigitaladops_dtparams : null;
		
		if (typeof parent.iOS != 'undefined')
		{
			var p_iOS = parent.iOS;
		}
		if (typeof parent.android != 'undefined')
		{
			var p_android = parent.android;
		}
	}
	catch (err) {
		// not able to access parent, cross domain, probably on FB
	}
	var default_args = {
		'ad_section'		:	(typeof p_ad_section != 'undefined') ? p_ad_section : ad_section,
		'ad_subcategory'	:	(typeof p_ad_subcategory != 'undefined') ? p_ad_subcategory : ad_subcategory,
		'ad_genre'			:	(typeof p_ad_genre != 'undefined') ? p_ad_genre : ad_genre,
		'ad_uri'			:	(typeof p_ad_uri != 'undefined') ? p_ad_uri : ad_uri,
		'ad_override_category':	(typeof p_ad_override_category != '') ? p_ad_override_category : ad_override_category,
		'randDARTNumber'	:	(typeof p_randDARTNumber != 'undefined') ? p_randDARTNumber : randDARTNumber,
		'adops_params'		:	(typeof p_adops_params != 'undefined') ? p_adops_params : __nbcudigitaladops_dtparams,
		'pos'				:	'1',
		'tile'				:	'1',
		'ad_root'			:	'usa',
		'create_iframe'		:	false,
		'refresh_iframe'	:	true,
		'device'			:	'desktop',
		'rails'				:	true,
		'return_url_only'	:	false,
		'return_iframe_tag_only'	:	false
	}
	
	// mobile devices
	if (typeof p_iOS != 'undefined')
	{
		if (p_iOS == true)
		{
			if (typeof console != 'undefined')
			{
				console.log('Tablet: iOS');
			}
			default_args['device'] = 'ipad';
		}
	}
	if (typeof p_android != 'undefined')
	{
		if (p_android == true)
		{
			if (typeof console != 'undefined')
			{
				console.log('Tablet: Android');
			}
			default_args['device'] = 'androidtab';
		}
	}
	
	// setup defaults based on size
	if (options['size'] == '160x600')
	{
		default_args['pos'] = '12';
		default_args['tile'] = '12';
		default_args['ad_size'] = '160x600';
		default_args['width'] = '160';
		default_args['height'] = '600';
	}
	else if (options['size'] == '728x90')
	{
		default_args['pos'] = '1';
		default_args['tile'] = '1';
		default_args['ad_size'] = '728x90';
		default_args['width'] = '728';
		default_args['height'] = '90';
	}
	else if (options['size'] == '728x90b')
	{
		default_args['pos'] = '1';
		default_args['tile'] = '1';
		default_args['ad_size'] = '728x90';
		default_args['ad_root'] = 'usa.b';
		default_args['width'] = '728';
		default_args['height'] = '90';
	}
	else if (options['size'] == '728x90,970x66')
	{
		default_args['pos'] = '1';
		default_args['tile'] = '1';
		default_args['ad_size'] = '728x90,970x66';
		default_args['width'] = '970';
		default_args['height'] = '90';
	}
	else if (options['size'] == '300x250')
	{
		default_args['pos'] = '7';
		default_args['tile'] = '7';
		default_args['ad_size'] = '300x250';
		default_args['width'] = '300';
		default_args['height'] = '250';
	}
	
	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}
	
	if (debug && typeof console != "undefined")
	{
		console.log('on test.usanetwork.com/_js/ad.js');
		console.log(options);
	}

	// rails
	var railsTag = '';
	if ((options['rails'] == true || options['rails'] == 'true') && options['device'] == 'desktop')
	{
		railsTag = 'dcopt=ist;';
	}
	
	// iframe or standalone?
	if (!options['create_iframe'])
	{
		// standalone
		//document.write('<sc'+'ript language=\'JavaScript1.1\' src="http://ad.doubleclick.net/adj/nbcu.'+options['ad_root']+'/'+options['ad_section']+'_'+options['ad_subcategory']+';site=usa;sect='+options['ad_section']+';sub='+options['ad_subcategory']+';genre='+options['ad_genre']+';daypart=;!category='+options['ad_override_category']+';!category='+options['ad_section']+';!category=js;!category=usa;network=tvn;'+railsTag+'sz='+options['ad_size']+';uri='+options['ad_uri']+';pos='+options['pos']+';tile='+options['tile']+';'+(options['adops_params']||'')+'ord=' + options['randDARTNumber'] + '?"></s'+'cript>');
		
		if (options['device'] == 'desktop')
		{
			// desktop
			var dblClkUrl = 'http://ad.doubleclick.net/adj/nbcu.'+options['ad_root']+'/'+options['ad_section']+'_'+options['ad_subcategory']+';site=usa;sect='+options['ad_section']+';sub='+options['ad_subcategory']+';genre='+options['ad_genre']+';daypart=;!category='+options['ad_override_category']+';!category='+options['ad_section']+';!category=js;!category=usa;network=tvn;'+railsTag+'sz='+options['ad_size']+';uri='+options['ad_uri']+';pos='+options['pos']+';tile='+options['tile']+';'+(options['adops_params']||'')+'ord=' + options['randDARTNumber'] + '?'; 
			
			if (!options['return_url_only'])
			{
				document.write('<sc'+'ript language=\'JavaScript1.1\' src="'+dblClkUrl+'"></s'+'cript>');
			}
			else
			{
				return dblClkUrl;
			}
		}
		else
		{
			if (typeof console != 'undefined')
			{
				console.log('Tablet Detected, outputting tablet tags');
			}
			
			// mobile tablet ios/android
			var ua = encodeURIComponent(navigator.userAgent);
			
			if (options['ad_size'] == '728x90,970x66' || options['ad_size'] == '970x66,728x90')
			{
				options['ad_size'] = '728x90';
			}
			if (options['ad_size'] == '728x90')
			{
				options['pos'] = '2';
				options['tile'] = '2';
			}
			else if (options['ad_size'] == '300x250' || options['ad_size'] == '160x600')
			{
				options['pos'] = '1';
				options['tile'] = '1';
			}
			
			var ip = ''; // '64.210.199.231'; // ;&ip='+ip+'&r=h&c=it&ua='+ua+'			
			var dblClkUrl = 'http://ad.doubleclick.net/adj/nbcu.'+options['ad_root']+'/'+options['ad_section'];
			dblClkUrl += (options['ad_subcategory'].length > 0) ? '_'+options['ad_subcategory'] : '';
			dblClkUrl += '_tablet;site=usa;sect='+options['ad_section']+';sub='+options['ad_subcategory']+';type=tablet;genre='+options['ad_genre']+';dev='+options['device']+';daypart=;!c='+options['ad_section']+';!c=usa;!c=tablet;sz='+options['ad_size']+';pos='+options['pos']+';tile='+options['tile']+';ord=' + options['randDARTNumber'] + '?';
			var adURL = '<sc'+'ript language=\'JavaScript1.1\' src="'+dblClkUrl+'"></s'+'cript>';
			if (typeof console != 'undefined')
			{
				console.log(adURL);
			}
			if (!options['return_url_only'])
			{
				document.write(adURL);
			}
			else
			{
				return dblClkUrl;
			}
		}
		
	}
	else
	{
		// iframe
		
		// do we want this iframe to refresh?
		var iframeRefreshClass = '';
		if (options['refresh_iframe'])
		{
			iframeRefreshClass = ' refresh';
		}
		
		var iframeTag = '<iframe src="/_inc/ad.html?size='+options['size']+'&rails='+options['rails']+'" id="'+options['iframe_id']+'" width="'+options['width']+'" height="'+options['height']+'" scrolling="no" class="usa_adIframe'+iframeRefreshClass+'" frameborder="0"></iframe>';
		
		if (options['return_iframe_tag_only'])
		{
			return iframeTag;
		}
		else
		{
			document.write(iframeTag);
		}
	}
}