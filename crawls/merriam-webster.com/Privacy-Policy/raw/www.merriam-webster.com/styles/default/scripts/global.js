// Summary: This function outputs DFP style creatives.
// Updates: 9-20-2012 -- Created.
function output_creative (id)
	{	document.write
			("<div id='" + id + "'>" + 
				"<scr" + "ipt type='text/javascript'>\r\n" + 
				"googletag.cmd.push(function() { googletag.display('" + id + "'); });\r\n" +
				"</sc" + "ript>" +
				"</div>");
	};

// Summary: This function returns the qsegs parameter for creatives.
// Updates: 9-20-2012 -- Created.
function get_qsegs ()
	{	var quantSegs = "";
		var _qsegs = _quantgc('__qseg').split('|');
		for (var i=0;i < _qsegs.length;i++) {
		var qArr=_qsegs[i].split("_")
		if (qArr.length>1) 
			{ if (quantSegs.length >= 1){ quantSegs += ",";} quantSegs += qArr[1]; }
			};
		//quantSegs = quantSegs.replace(/[_,]/g, ':');		
		quantSegs = quantSegs.replace(/[_]/g, ',');		
		return quantSegs;
	};

// Summary: This function reloads the creatives on a page.
function reloadCreatives (url)
	{ if ( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 )
                        {       for ( var index = 1; index < 6; index++ )
                                        {       var div = document.getElementById('div-gpt-ad-219827234313134000-' + index);
                                                div.innerHTML = '';
                                                var content =
                                                        'googletag.cmd.push(function() { googletag.display("div-gpt-ad-219827234313134000-' + index + '"); });';
                                                var g = document.createElement('script');
                                                g.type = 'text/javascript';
                                                g.text = content;
                                                div.parentNode.insertBefore(g, div.childNodes[0]);
                                        };
                        }

                // Do it the normal way.
                else
                        {        for ( var index = 1; index < 6; index++ )
                                        {       googletag.cmd.push(function() { googletag.display('div-gpt-ad-219827234313134000-' + index); });
                                        };
                        };

                // Track the virtual page.
                if ( url != null )
                        {       url = typeof(url) != 'undefined' ? url : '' + document.location;
                                _gaq.push(['_trackPageview', url]);
                        };

        };

// This method handles all carosel load events.
function onCaroselLoaded (data)
	{	// Get the carosel.
		var carosel = document.getElementById(data.id);

		// Get the type.
		var type = typeof(data.type) != 'undefined' ? data.type : 'default';
	
		// The final content.
		var content = '<ol>';		

		// Should we show more links?
		var show_more = typeof(data.more) != 'undefined' && data.more == 'yes';

		//if ( type == 'tout' )
		//	{	alert('defined: ' + (typeof(data.status) != 'undefined' ? 'yes' : 'no'));
		//	};

		// Add the data.
		for ( var index = 0; index < data.items.length; index++ )
			{	// Get the status.
				var status = typeof(data.items[index].status) != 'undefined' ? data.items[index].status : 'default';

				if ( type != 'home' && type != 'tout' )
					{	// Add the content.
						content +=
							'<li class="' + ( index == data.items.length - 1 ? 'last' : ( index == 0 ? 'first' : 'inner' )) + '">' +
								'<table style="border-collapse: 0; border-spacing: 0; margin: 0; padding: 0;">' + 
									'<tr>' +
										'<td style="margin: 0; padding: 0; vertical-align: top;"><a class="image" href="' + data.items[index].url + '" style="float: left;" target="_top"><img src="' + data.items[index].thumbnail + '" alt="" target="_top" /></a></td>' +
										'<td style="margin: 0; padding: 0; vertical-align: top;">' + 							
											'<h2>' + ( status == 'new' ? '<span class="new">New</span> ' : '' ) + '<a href="' + data.items[index].url + '"target="_top" >' + data.items[index].title.replace(/\\n/g, '<br />') + '</a></h2>' +
											'<h3><a href="' + data.items[index].url + '"target="_top" >' + data.items[index].subtitle + ( show_more ? ' <span>more&nbsp;&raquo;</span>' : '' ) + '</a></h3>' +
										'</td>' +
									'</tr>' +
								'</table>' +
							'</li>';
					}

				/**
				else if ( type == 'tout' )
					{	content +=
							'<li class="' + ( index == data.items.length - 1 ? 'last' : ( index == 0 ? 'first' : 'inner' )) + '">' +
								'<div><a class="image" href="' + data.items[index].url + '"><img src="' + data.items[index].thumbnail + '" alt="" /></a></div>' +
								'<h2><a href="' + data.items[index].url + '">' + data.items[index].title.replace(/\\n/g, '<br />') + '</a></h2>' +
								'<h3><a href="' + data.items[index].url + '">' + data.items[index].subtitle + ( show_more ? ' <span>more&nbsp;&raquo;</span>' : '' ) + '</a></h3>' +
							'</li>';
					}
				**/

				else if ( type == 'tout' )
					{	content +=
							'<li class="' + ( index == data.items.length - 1 ? 'last' : ( index == 0 ? 'first' : 'inner' )) + '">' +
								'<div><a class="image" href="' + data.items[index].url + '" target="_top" ><img src="' + data.items[index].thumbnail + '" alt="" /></a></div>' +
								'<h2><a href="' + data.items[index].url + '" target="_top" >' + data.items[index].title.replace(/\\n/g, '<br />') + '<br />' + 
								data.items[index].subtitle + '</a></h2>' +
							'</li>';
					}

				else
					{	content +=
							'<li class="' + ( index == data.items.length - 1 ? 'last' : ( index == 0 ? 'first' : 'inner' )) + '" style="float: left;">' +
								'<a class="image" href="' + data.items[index].url + '" style="float: left;" target="_top"><img src="' + data.items[index].thumbnail + '" alt="" /></a>' +
								'<h2><a href="' + data.items[index].url + '" target="_top" >' + data.items[index].title.replace(/\\n/g, '<br />') + '</a></h2>' +
								'<h3><a href="' + data.items[index].url + '" target="_top" >' + data.items[index].subtitle + ( show_more ? ' <span>more&nbsp;&raquo;</span>' : '' ) + '</a></h3>' +
								'<div style="clear: left;"></div>' +
							'</li>';
					};
			};

		// Close the list.
		content += '</ol>';

		// Compute the start page.
		var num_pages	= data.pages;
		var incr		= data.incr;
		var curr_page	= Math.floor(1.0 * data.offset / incr);
		var start_page	= num_pages * Math.floor(curr_page / num_pages);
		var max_offset	= Math.min(data.total, incr * (start_page + 4));
		var next_offset	= incr * (start_page + num_pages);

		/**
		// Add the previous button.
		if ( start_page > 0 )
			{	content += '<a class="prev-button-active" href="#" onclick="document.getElementById(\'' + data.id + '\').load(' + (incr * (start_page - 1)) + '); return false;"><span>Prev</span></a>';
			}
		**/

		if ( typeof(data.pagination) == 'undefined' || data.pagination == 'on' )
			{	content += '<div class="pag-links">';

				// Add the previous button.
				if ( data.offset > 0 )
					{	content += '<a class="prev-button-active" href="#" onclick="document.getElementById(\'' + data.id + '\').load(' + Math.max(0, (incr * (curr_page - 1))) + '); return false;"><span>Prev</span></a>';
					}

				else
					{	content += '<span class="prev-button-inactive"><em>Prev</em></span>';
					};

				// Add the pagination.
				for ( var offset = incr * start_page; offset < max_offset; offset += data.incr )
					{	var page = Math.floor(1.0 * offset / incr);
						content += '<a class="page-link' + ( page == curr_page ? '-active' : '' ) + '" href="' + offset + '" onclick="document.getElementById(\'' + data.id + '\').load(' + offset + '); return false;"><span>' + (1 + Math.floor(offset / incr)) + '</span></a>';
					};

				/** 
				// Add the next button.
				if ( next_offset < data.total )
					{	content += '<a class="next-button-active" href="#" onclick="document.getElementById(\'' + data.id + '\').load(' + next_offset + '); return false;"><span>Next</span></a>';
					}
				**/

				// Add the next button.
				if ( (data.offset + data.incr) < data.total )
					{	content += '<a class="next-button-active" href="#" onclick="document.getElementById(\'' + data.id + '\').load(' + (data.offset + data.incr) + '); return false;"><span>Next</span></a>';
					}

				else
					{	content += '<span class="next-button-inactive"><em>Next</em></span>';
					};

				// Close the pagination.
				content += '</div>';
			};

		// Construct the H1 tag.
		var h1 = '';

		// Add a link to the archive.
		if ( ( type == 'default' || type == 'home' || type == 'side' ) && typeof(data.archive) != 'undefined' )
			{	h1 = '<h1 class="archive"><a href="' + data.archive + '" target="_top"><span>' + data.channel + '</span></a></h1>';
			}

		// Add a channel title.
		else
			{	h1 = '<h1 class="title"><span>' + data.channel + '</span>' + ( typeof(data.all) != 'undefined' ? data.all : '' ) + '</h1>';
			};

		// Add it.
		carosel.pages		= data.pages;
		carosel.max			= data.incr;
		carosel.selected	= data.selected;
		carosel.callback	= data.callback;
		carosel.type		= typeof(data.type) != 'undefined' ? data.type : 'default';
		carosel.curr		= typeof(data.curr) != 'undefined' ? data.curr : '';
		carosel.more		= show_more ? 'yes' : 'no';
		carosel.pagination	= typeof(data.pagination) != 'undefined' && data.pagination == 'on' ? 'on' : 'off';
		carosel.innerHTML	= h1 + content;

		// Set the load method.
		carosel.load = function (offset)
			{	$.getJSON(this.callback + '?offset=' + offset + '&max=' + this.max + '&pages=' + this.pages + '&type=' + this.type + '&curr=' + this.curr + '&more=' + this.more + '&pagination=' + this.pagination + '&id=' + this.id + '&selected=' + this.selected, onCaroselLoaded);
			};
	};


// The creatives to load.
CREATIVES_TO_LOAD = {};
MW_RELOADABLE_CREATIVES = {};

// This function outputs a creative.
function outputCreative (creative_id, keyword, subjcode)	
	{	var params		= creative_id.split('/');
		var pageid		= encodeURIComponent(params.length > 0 ? params[0] : 'default');
		var placement	= encodeURIComponent(params.length > 1 ? params[1] : 'default');
		var id			= pageid + '-' + placement;
		var css			= 'creative-' + placement.replace(/^[^0-9]+/, '');		
		var	extra		= typeof(keyword) != 'undefined' ? ('&keyword=' + escape(keyword)) : ''; 		
		extra			+= ( typeof(subjcode) != 'undefined' ? ('&subjcode=' + escape(subjcode)) : '' );

		if ( typeof(ad_groupid) == 'undefined' )
			{	ad_groupid = Math.round(Math.random() * 10000000000);
			};		

		quantSegs = "";
		var _qsegs = _quantgc('__qseg').split('|');
		for (var i=0;i < _qsegs.length;i++) {
		var qArr=_qsegs[i].split("_")
		if (qArr.length>1) 
			{ if (quantSegs.length >= 1){ quantSegs += ",";} quantSegs += qArr[1]; }
			};
		quantSegs = quantSegs.replace(/[_,]/g, ':');

		var domain = (document.location + '').indexOf('/opendictionary/') >= 0 || (document.location + '').indexOf('wodsignup') >= 0 ? 'http://www.merriam-webster.com' : '';	

		// CREATIVES_TO_LOAD[creative_id] = { id: id, pageid: pageid, placement: placement, css: css, extra: extra, keyword: keyword, subjcode: subjcode };
		var ad_call = '<iframe id="' + id + '-frame" class="' + css + '" src="' + domain + '/ads.php?pageid=' + pageid + '&placement=' + placement + '&groupid=' + ad_groupid + '&quantseg=' + quantSegs + extra + '" frameborder="no" scrolling="no"></iframe>';
		MW_RELOADABLE_CREATIVES[id] = ad_call;
		document.write("<div id=\"" + id + "\" class=\"" + css + "-container\">" + ad_call + "</div>");
	};

// This function outputs a creative.
function outputCreative_08_23_2010 (creative_id, keyword, subjcode)	
	{	var params		= creative_id.split('/');
		var pageid		= encodeURIComponent(params.length > 0 ? params[0] : 'default');
		var placement	= encodeURIComponent(params.length > 1 ? params[1] : 'default');
		var id			= pageid + '-' + placement;
		var css			= 'creative-' + placement.replace(/^[^0-9]+/, '');
		/**
		var extra		= typeof(keyword) != 'undefined' ? keyword  : ''; 
		extra			+= ( typeof(subjcode) != 'undefined' && subjcode != '' ? (( extra !== '' ? '/' : '' ) + subjcode) : '' );
		extra			+= ( extra != '' ? '/' : '' );
		extra			= escape(extra);
		**/
		var	extra		= typeof(keyword) != 'undefined' ? ('&keyword=' + escape(keyword)) : ''; 		
		extra			+= ( typeof(subjcode) != 'undefined' ? ('&subjcode=' + escape(subjcode)) : '' );

		CREATIVES_TO_LOAD[creative_id] = { id: id, pageid: pageid, placement: placement, css: css, extra: extra, keyword: keyword, subjcode: subjcode };
		document.write("<div id=\"" + id + "\" class=\"" + css + "-container\"></div>");
	};


// This function loads all the creatives.
function getCreativeIFrame (creative_id, keyword, subjcode, inc_dims)	
	{	var params		= creative_id.split('/');
		var pageid		= encodeURIComponent(params.length > 0 ? params[0] : 'default');
		var placement	= encodeURIComponent(params.length > 1 ? params[1] : 'default');
		var id			= pageid + '-' + placement;
		var css			= 'creative-' + placement.replace(/^[^0-9]+/, '');
		var	extra		= typeof(keyword) != 'undefined' ? ('&keyword=' + escape(keyword)) : ''; 		
		extra			+= ( typeof(subjcode) != 'undefined' ? ('&subjcode=' + escape(subjcode)) : '' );
		var dims		= typeof(inc_dims) == 'undefined' || inc_dims == true ? ' width="300" height="250"' : '';
		
		if ( typeof(ad_groupid) == 'undefined' )
			{	ad_groupid = Math.round(Math.random() * 10000000000);
			};		

		quantSegs = "";
		var _qsegs = _quantgc('__qseg').split('|');
		for (var i=0;i < _qsegs.length;i++) {
		var qArr=_qsegs[i].split("_")
		if (qArr.length>1) 
			{ if (quantSegs.length >= 1){ quantSegs += ",";} quantSegs += qArr[1]; }
			};
		quantSegs = quantSegs.replace(/[_,]/g, ':');
	
		var domain = (document.location + '').indexOf('/opendictionary/') >= 0 || (document.location + '').indexOf('wodsignup') >= 0 ? 'http://www.merriam-webster.com' : '';	
		var the_iframe = '<iframe id="' + id + '" class="' + css + '" src="' + domain + '/ads.php?pageid=' + pageid + '&placement=' + placement + '&groupid=' + ad_groupid + '&quantseg=' + quantSegs + extra + '" frameborder="no" scrolling="no"' + dims + '></iframe>';

		return the_iframe;
	};

// This function loads all the creatives.
function loadCreatives (creative_id, keyword, subjcode)	
	{	
	};

// This function loads all the creatives.
function loadCreatives_08_23_2010 (creative_id, keyword, subjcode)	
	{	if ( typeof(ad_groupid) == 'undefined' )
			{	ad_groupid = Math.round(Math.random() * 10000000000);
			};		

		quantSegs = "";
		var _qsegs = _quantgc('__qseg').split('|');
		for (var i=0;i < _qsegs.length;i++) {
		var qArr=_qsegs[i].split("_")
		if (qArr.length>1) 
			{ if (quantSegs.length >= 1){ quantSegs += ",";} quantSegs += qArr[1]; }
			};
		quantSegs = quantSegs.replace(/[_,]/g, ':');
		
		for ( var id in CREATIVES_TO_LOAD )
			{	var creative = CREATIVES_TO_LOAD[id];
				var domain = (document.location + '').indexOf('/opendictionary/') >= 0 || (document.location + '').indexOf('wodsignup') >= 0 ? 'http://www.merriam-webster.com' : '';
				var ad_call = '<iframe id="' + creative.id + '-frame" class="' + creative.css + '" src="' + domain + '/BACKUP.php?pageid=' + creative.pageid + '&placement=' + creative.placement + '&groupid=' + ad_groupid + '&quantseg=' + quantSegs + creative.extra + '" frameborder="no" scrolling="no"></iframe>';
				var the_div = document.getElementById(creative.id);
				if ( the_div )
					{	the_div.innerHTML = ad_call;
					}
				else
					{	alert(creative.id + ' not defined.');
					};				
			};
	};

// This function outputs a creative.
function outputCreative_08_11_2010 (creative_id, keyword, subjcode)
	{	var params		= creative_id.split('/');
		var pageid		= encodeURIComponent(params.length > 0 ? params[0] : 'default');
		var placement	= encodeURIComponent(params.length > 1 ? params[1] : 'default');
		var id			= pageid + '-' + placement;
		var css			= 'creative-' + placement.replace(/^[^0-9]+/, '');
		var extra		= typeof(keyword) != 'undefined' ? keyword  : ''; 
		extra			+= ( typeof(subjcode) != 'undefined' && subjcode != '' ? (( extra !== '' ? '/' : '' ) + subjcode) : '' );
		extra			+= ( extra != '' ? '/' : '' );
		extra			= escape(extra);

		if ( typeof(ad_groupid) == 'undefined' )
			{	ad_groupid = Math.round(Math.random() * 10000000000);
			};
		

		quantSegs = "";
		var _qsegs = _quantgc('__qseg').split('|');
		for (var i=0;i < _qsegs.length;i++) {
		var qArr=_qsegs[i].split("_")
		if (qArr.length>1) 
			{ if (quantSegs.length >= 1){ quantSegs += ",";} quantSegs += qArr[1]; }
			};

		quantSegs = quantSegs.replace(/_/g, ':');

		document.write('<iframe id="' + id + '" class="' + css + '" src="http://www.merriam-webster.com/creative/' + pageid + '/' + placement + '/' + ad_groupid + '/' + quantSegs + '/' + extra + '" frameborder="no" scrolling="no"></iframe>');
	};

function _quantgc(n) 
	{	var c=document.cookie;if(!c)return '';
		var i=c.indexOf(n+"=");if(-1==i)return '';
		var len=i+n.length+1;
		var end=c.indexOf(";", len);
		return c.substring(len,end<0?c.length:end);
	};

/** Video functions **/
function getCookie (c_name, def_value)
        {       if ( document.cookie.length > 0 )
                        {       var c_start = document.cookie.indexOf(c_name + "=");
                                if ( c_start != -1 )
                                        {       c_start = c_start + c_name.length + 1; 
                                        c_end = document.cookie.indexOf(";", c_start);
                                        if ( c_end == -1) c_end=document.cookie.length;
                                                return unescape(document.cookie.substring(c_start,c_end));
                                }; 
                        }; 
                return def_value;
        };

function setCookie10Min (c_name, value, expiredays)
        {       var exdate = new Date();
                exdate.setTime(exdate.getTime() + (10 * 60 * 1000));
                var domain = document.location.href;
                domain = domain.replace(/http:\/\/([^$|\/]+)[^$]*/, "$1");
                domain = domain.replace(/(.*?)\.([^\.]+\.[^$]+)/, ".$2");
                document.cookie=c_name+ "=" +escape(value)+ ";expires="+exdate.toGMTString() + ";path=/;domain=" + domain;
        };

function setCookieValue (c_name, value, expiredays)
        {       var exdate = new Date();
                exdate.setTime(exdate.getTime() + (10 * 24 * 60 * 1000));
                var domain = document.location.href;
                domain = domain.replace(/http:\/\/([^$|\/]+)[^$]*/, "$1");
                domain = domain.replace(/(.*?)\.([^\.]+\.[^$]+)/, ".$2");
                document.cookie=c_name+ "=" +escape(value)+ ";expires="+exdate.toGMTString() + ";path=/;domain=" + domain;
        };


/** Google Ad Code **/
// Create the mw.ads.google package (if needed).
mw				= typeof(mw) != "undefined" ? mw : {};
mw.ads			= typeof(mw.ads) != "undefined" ? mw.ads : {};
mw.ads.google	= typeof(mw.ads.google) != "undefined" ? mw.ads.google : {};

// Defining the mw.ads.google.afc package for the first time.
if ( typeof(mw.ads.google.afc) == "undefined" )
	{	// Fill in the details.
		mw.ads.google.afc =
			{	// An array of listeners.
				afc_listeners: new Array(),
			
				// Constructor for the default AFCAdRenderer object class.
				AFCAdRenderer: function ()
					{	// This method renders an ad.
						this.renderAd = function (afc_ad, index, total)
							{	// Create a leaderboard.
								if ( afc_ad.google_ad_unit == "leaderboard" )
									{
									} 

								// Return an image ad.
								else if ( afc_ad.type == "image" ) 
									{	// Get the ad values.
										var visible_url		= afc_ad.visible_url;
										var ad_url			= afc_ad.url;
										var image_url		= afc_ad.image_url;
										var image_width		= Math.max(0, afc_ad.image_width);
										var feedback_url	= google_info.feedback_url;

										// Create the ad content.
										var content = 
											'<div class="creative image google">' + 
												'<div>' + 
													'<a href="' + ad_url + '" target="_top" title="go to ' + visible_url + '" onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">' + 
														'<img border="0" src="' + image_url + '"  />' +
													'</a>' + 
												'</div>' + 
												'<table class="ads_by_google" border="0" cellpadding="2" cellspacing="0" style="width: ' + image_width + 'px;">' +
													'<tr>' +
														'<td style="text-align: left;"><a href="' + ad_url + '" onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">Go to ' + visible_url + '</a></td>' +
														'<td style="text-align: right;"><a href="' + feedback_url + '">Feedback - Ads by Google</a></td>' + 
													'</tr>' +
												'</table>' 
											'</div>';

										return content;
									} 

								// Return a Flash video ad.
								else if ( afc_ad.type == "flash" ) 
									{	// Construct the ad content.
										var content =
											'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + google_ads[0].image_width + ' height="' + google_ads[0].image_height + '">' + 
												'<param name="movie" value="' + afc_ad.image_url + '" />' + 
												'<param name="quality" value="high" />' + 
												'<param name="AllowScriptAccess" value="never" />' + 
												'<param name="google_hints" value="' + escape(token) + '" />' + 
												'<embed ' +
													'src="' + afc_ad.image_url + '" ' + 
													'width="' + afc_ad.image_width + '" ' +
													'height="' + afc_ad.image_height + '" ' + 
													'type="application/x-shockwave-flash" ' + 
													'AllowScriptAccess="never" ' + 
													'pluginspace="http://www.macromedia.com/go/getflashplayer">' + 
												'</embed>' + 
											'</object>';

										// Add the feedback link since this ad isn't using the google player.
										try 
											{	if ( afc_ad.image_url.indexOf('googleadplayer.swf') == -1 )
													{	// Get the ad values.
														var visible_url		= afc_ad.visible_url;
														var ad_url			= afc_ad.url;
														var image_url		= afc_ad.image_url;
														var image_width		= Math.max(0, afc_ad.image_width);
														var feedback_url	= google_info.feedback_url;

														// Construct the ad content.
														content += 
															'<table class="ads_by_google" border="0" cellpadding="2" cellspacing="0" style="width: ' + image_width + 'px;">' +
																'<tr>' +
																	'<td style="text-align: left;">' +
																		'<a ' + 
																			'href="' + ad_url + '" ' + 
																			'onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" ' + 
																			'onmouseout="javascript:window.status=\'\'; return true;">' +
																			'Go to ' + visible_url + 
																		'</a>' + 
																	'</td>' +
																	'<td style="text-align: right;"><a href="' + feedback_url + '">Feedback - Ads by Google</a></td>' + 
																'</tr>' +
															'</table>';
													}; // if ( afc_ad.image_url.indexOf('googleadplayer.swf') == -1 )
											} 

										catch (e)
											{
											}; 

										return content;
									} 

								else
									{	// The ad content.
										var content = index > 0 ? '' :  '<div class="googleAFCborder"><div class="header" style="background: #FFFFFF; padding: 3px 5px 0 0;"><a href="' + google_info.feedback_url + '" target="_blank" style="color: #a9a8a8; font-size: 11px; font-weight: bold; font-style: italic; font-family: Arial, Helvetica, Sans-Serif;">Ads by Google</a></div>';

										// Append the text link.
										content += 
											'<div class=\"googleAFCTextAd' + ( index == (total - 1) ? " googleAFCTextAdLast" : "" ) + '\">' + 
												'<div class="line1">' +
												'<a href="' + afc_ad.url + '" ' + 
													'onmouseout="javascript:window.status=\'\';return true;" ' +
													'onmouseover="javascript:window.status=\'' + afc_ad.visible_url + '\';return true;" target="_blank" ' +
													'><strong>' +
													afc_ad.line1 + '</strong></a></div>' +
												'<div class="line2">' + afc_ad.line2 + ' ' + afc_ad.line3 + '</div>' +
												'<div class="visible_url">' +
												'<a href="' + afc_ad.url + '" ' + 
													'onmouseout="javascript:window.status=\'\';return true;" ' +
													'onmouseover="javascript:window.status=\'' + afc_ad.visible_url + '\';return true;" target="_blank"' +
													'>' +
													afc_ad.visible_url + '</a></div>' +
											'</div></div>';
											
										return content;
									}; 
							}; 

						return this;
					}, 

				// This method adds an AFC listener.
				addListener: function (listener)
					{	this.afc_listeners[this.afc_listeners.length] = listener;
					}, 

				// This method handles all AFC load events.
				onAFCAdsLoaded: function (afc_ads, afc_ad_id)
					{	// Add the ad units parameter.
						for ( var index = 0; index < afc_ads.length; index++ )
							{	afc_ads[index].google_ad_unit = google_ad_unit;
							}; 

						// Notify all the listeners.
						for ( var index = 0; index < this.afc_listeners.length; index++ ) 
							{	this.afc_listeners[index].onAFCAdsLoaded(afc_ads, afc_ad_id);
							}; 
					} 
			}; 
	}; 

// Defining the mw.ads.google.afs package for the first time.
if ( typeof(mw.ads.google.afs) == "undefined" )
	{	// Fill in the details.
		mw.ads.google.afs =
			{	// An array of listeners.
				afs_listeners: new Array(),
			
				// Constructor for the default AFSAdRenderer object class.
				AFSAdRenderer: function ()
					{	// This method renders an ad.
						this.renderAd = function (afs_ad, index, total)
							{	// Create a text ad.
								if ( afs_ad.type && (afs_ad.type == "text/wide" || afs_ad.type == "text/narrow") )
									{	return this.renderTextAd(afs_ad, index, total);
									} 

								// Invalid ad type.
								else
									{	return "";
									}; 
							}; 

						// This method returns a text ad.
						this.renderTextAd = function (afs_ad, index, total)
							{	// Render the content.
								var content =
									'<div class="googleAFSTextAd">' +
										'<div class="afs_' + ( afs_ad.type == "text/wide" ? "wide" : "narrow" ) + '">' + 
											'<div class="afs_headline">' +
												'<a onmouseover="javascript:window.status=\'' + 
													afs_ad.visible_url + '\';return true;" ' + 
													'onmouseout="javascript:window.status=\'\';return true;" ' +
													'href="' + afs_ad.url + '" target="_blank">' + afs_ad.line1 + 
												'</a>' +
											'</div>' + 
											'<div class="afs_text">' + 
													afs_ad.line2 + 
												'</a>' + 
											'</div>' + 
											'<div class="afs_url">' + 
												'<a onmouseover="javascript:window.status=\'' + 
													afs_ad.visible_url + '\';return true;" ' +
													'onmouseout="javascript:window.status=\'\';return true;" ' +
													'href="' + afs_ad.url + '" target="_blank">' +
													afs_ad.visible_url + 
												'</a>' + 
											'</div>' +
										'</div>' +
									'</div>';
									
								return content;								
							}; 

						return this;
					}, 

				// This method adds an AFS listener.
				addListener: function (listener)
					{	this.afs_listeners[this.afs_listeners.length] = listener;
					}, 

				// This method handles all AFS load events.
				onAFSAdsLoaded: function (afs_ads, afs_ad_id)
					{	// Notify all the listeners.
						for ( var index = 0; index < this.afs_listeners.length; index++ ) 
							{	this.afs_listeners[index].onAFSAdsLoaded(afs_ads, afs_ad_id);
							}; // for ( var index = 0; index < this.afs_listeners.length; index++ ) 

					} 

			}; 
	}; 

// Register an AFC listener.
mw.ads.google.afc.addListener
	(	{	onAFCAdsLoaded: function (ads, ad_id) 
				{	// Instantiate the renderer.
					var renderer = new mw.ads.google.afc.AFCAdRenderer();

					// The rendered ad content.
					var ad_content = new Array();

					// Render the ads.
					for ( var index = 0; index < ads.length; index++ )
						{	ad_content[index]	= renderer.renderAd(ads[index], index, ads.length);
						}; 

					// Get the ad container.
					var ad_container = document.getElementById(ad_id);

					// Place the ads.
					if ( ad_container )
						{	for ( var index = 0; index < ad_content.length; index++ )
								{	ad_container.innerHTML += ad_content[index];
								}; 
						}; 
				} 
		}
	);

// Register an AFS listener.
mw.ads.google.afs.addListener
	(	{	onAFSAdsLoaded: function (ads, ad_id) 
				{	// Load the AFC text ads.
					if ( ads.length < 1 )
						{	// Set up the AFC text ads to display.
							google_ads				= new Array();
							google_ad				= new Object();
							google_info				= new Object();			
							google_ad_client		= 'pub-6997024981641612';
							google_ad_channel 		= '7851152031';
							google_safe				= 'high';
							google_feedback			= "on";
							google_image_size		= '300x250';
							google_max_num_ads		= '5';
							google_ad_unit			= 'rect';
							google_ad_output		= 'js';
							google_ad_type			= 'text_html';
							google_ads[0]			= google_ad;   
							google_ad_id			= 'marketing_links';
							google_hints			= token;
							//google_targeting		= 'site';

							// Add it to the document.
							document.write('<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>');
						} 
						
					// Display the predefined marketing ads.
					else if ( ads.length >= 1 )
						{	// Get the element to place the links in.
							var marketing_links = document.getElementById("marketing_links");

							// Initialize it.
							marketing_links.innerHTML = 
							
							'<div id="mrkting_rt" onclick="document.location=\'/word/subscribe.htm\'; return false;" style="cursor: pointer;">' +
							'<h1>Feed Your Head</h1>' +
							'<p>Sign up for <strong>Word of the Day</strong> and receive nourishing words and tasty language facts delivered free directly to your e-mail.</p>' +
							'<div align="right"><a href="/word/subscribe.htm">Subscribe today</a></div>' +
							'</div>'+
							'<div id="mrkting_rt" onclick="document.location=\'http://visual.merriam-webster.com\'; return false;" style="cursor: pointer;">' +
							'<h1>See the Difference</h1>' +
							'<p>Explore your world in exciting new ways with Merriam-Webster\'s <strong>Visual Dictionary Online</strong>.</p>' +
							'</div>';							
						}; 

					// Nothing to do.
					if ( ads.length <= 0 ) 
						{	return;
						}; 

					// Instantiate the renderer.
					var renderer = new mw.ads.google.afs.AFSAdRenderer();

					// The ad content.
					var ad_content = new Array();

					// Generate all the ad content.
					for ( var index = 0; index < ads.length; index++ )
						{	// Render the ad content.
							ad_content[index]	= renderer.renderAd(ads[index], index, ads.length);
						}; 

					// Get the results ad div.
					var results_box_ad = ad_id == "google_creative_4" ? document.getElementById("results_ad") : false;

					// Create the results ad.
					if ( results_box_ad )
						{	results_box_ad.innerHTML = 
								'<div class="googleAFSAds" style="margin-top: 3px;">' + 
									'<div class="ad_header"><a href="https://www.google.com/adsense/support/bin/request.py?contact=afs_violation&url=http%3A//www.google.com/custom%3Fclient%3Dpub-0788979891456011%26q%3Dcar%26sa%3DSearch%26safe%3Don%26channel%3D%26alternate_ad_url%3D%26cof%3DDIV%3AFFFFFF%253BBGC%3AFFFFFF%253BLC%3A0000CC%253BVLC%3A0000CC%253BALC%3A0000CC%253BT%3A000000%253BGALT%3A008000%253BFORID%3A5%26adskip%3D0&client=pub-0788979891456011&hl=en)" target="_blank" style="text-decoration: none;">Ads by Google</a></div>' + 
									ad_content[0] + 
								'</div>' + 
								results_box_ad.innerHTML;
						}; 

					// Get the place holder for the entry ads.
					var ad_container = document.getElementById(ad_id);

					if ( ad_container )
						{	// The remaining ad content.
							var content = "";

							// Create the remaining ad content.
							for ( var index = ad_id == "google_creative_4" ? 1 : 0; index < ad_content.length; index++ )
								{	content += ad_content[index];
								}; 

							// Set the ad content.
							ad_container.innerHTML	= 
									( content != "" ?
										'<div class="googleAFSAds">' + 
											'<div class="ad_header"><a href="https://www.google.com/adsense/support/bin/request.py?contact=afs_violation&url=http%3A//www.google.com/custom%3Fclient%3Dpub-0788979891456011%26q%3Dcar%26sa%3DSearch%26safe%3Don%26channel%3D%26alternate_ad_url%3D%26cof%3DDIV%3AFFFFFF%253BBGC%3AFFFFFF%253BLC%3A0000CC%253BVLC%3A0000CC%253BALC%3A0000CC%253BT%3A000000%253BGALT%3A008000%253BFORID%3A5%26adskip%3D0&client=pub-0788979891456011&hl=en)" target="_blank" style="text-decoration: none;">Ads by Google</a></div>' + 
											content +
										'</div>'
										:
										'' 
									) + 
									ad_container.innerHTML;
						}; 
				} 
		}
	);

// This function handles all AFC load events.
function google_ad_request_done (afc_ads) 
	{	// Forward off to our ASF package.
		mw.ads.google.afc.onAFCAdsLoaded(afc_ads, google_ad_id);
	}; 

// This function handles all AFS load events.
function google_afs_request_done (afs_ads) 
	{	// Forward off to our ASF package.
		mw.ads.google.afs.onAFSAdsLoaded(afs_ads, google_ad_id);
	}; 

var google_ad_unit		= ""; //Note: The name of an ad unit ("rect" or "leaderboard")
var sRect				= ""; //Content of rect unit 
var sLead				= ""; //Content of leaderboard unit 
var creative_1_loaded	= false;
var creative_2_loaded	= false;
var creative_3_loaded	= false;
var creative_4_loaded	= false;

function google_write_ad (google_ads)
	{	// Get the number of ads returned.
		var google_num_ads = google_ads.length;

		// No ads returned.
	    if ( google_num_ads <= 0 ) 
			return "";

		// Return an image advertisement.
		if ( google_ads[0].type == "image" ) 
			{	// Get the ad values.
				var visible_url		= google_ads[0].visible_url;
				var ad_url			= google_ads[0].url;
				var image_url		= google_ads[0].image_url;
				var image_width		= Math.max(0, google_ads[0].image_width);
				var feedback_url	= google_info.feedback_url;

				// Construct the ad.
				var xhtml = 
					'<div class="creative image google">' + 
						'<div>' + 
							'<a href="' + ad_url + '" target="_top" title="go to ' + visible_url + '" onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">' + 
								'<img border="0" src="' + image_url + '"  />' +
							'</a>' + 
						'</div>' + 
						'<table class="ads_by_google" border="0" cellpadding="2" cellspacing="0" style="width: ' + image_width + 'px;">' +
							'<tr>' +
								'<td style="text-align: left;"><a href="' + ad_url + '" onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">Go to ' + visible_url + '</a></td>' +
								'<td style="text-align: right;"><a href="' + feedback_url + '">Feedback - Ads by Google</a></td>' + 
							'</tr>' +
						'</table>' 
					'</div>';

				return xhtml;
			} 

		// Return a Flash video advertisement.
		else if ( google_ads[0].type == "flash" ) 
			{  var xhtml =
					'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + google_ads[0].image_width + ' height="' + google_ads[0].image_height + '">' + 
						'<param name="movie" value="' + google_ads[0].image_url + '" />' + 
						'<param name="quality" value="high" />' + 
						'<param name="AllowScriptAccess" value="never" />' + 
						'<param name="google_hints" value="' + escape(token) + '" />' + 
						'<embed src="' + google_ads[0].image_url + '" width="' + google_ads[0].image_width + '" height="' + google_ads[0].image_height + '" type="application/x-shockwave-flash" AllowScriptAccess="never" pluginspace="http://www.macromedia.com/go/getflashplayer"></embed>' + 
					'</object>';

				try 
					{	if ( google_ad.image_url.indexOf('googleadplayer.swf') == -1 )
							{	var visible_url		= google_ads[0].visible_url;
								var ad_url			= google_ads[0].url;
								var image_url		= google_ads[0].image_url;
								var image_width		= Math.max(0, google_ads[0].image_width);
								var feedback_url	= google_info.feedback_url;
								xhtml += 
									'<table class="ads_by_google" border="0" cellpadding="2" cellspacing="0" style="width: ' + image_width + 'px;">' +
										'<tr>' +
											'<td style="text-align: left;"><a href="' + ad_url + '" onmouseover="javascript:window.status=\'Go to ' + visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">Go to ' + visible_url + '</a></td>' +
											'<td style="text-align: right;"><a href="' + feedback_url + '">Feedback - Ads by Google</a></td>' + 
										'</tr>' +
									'</table>';
									/**
									'<table class="ads_by_google" border="0" cellpadding="2" cellspacing="0" style="width: ' + google_ads[0].image_width + 'px;">' + 
										'<tr>' +
											'<td style="text-align: left;"><a href="' + google_ads[0].url + '" onmouseover="javascript: window.status=\'Go to ' + google_ads[0].visible_url + '\'; return true;" onmouseout="javascript:window.status=\'\'; return true;">Go to ' + google_ads[0].visible_url + '</a></td>' + 
											'<td style="text-align: right;">Ads by Google</td>' + 
										'</tr>' +
									'</table>'; 
									**/
							}; 
					} 

				catch (e)
					{
					}; // catch (e)

				return xhtml;
			} 

		// Return a leaderboard advertisement.
		else if ( google_ad_unit == "leaderboard" ) 
			{	var xhtml = 
					'<table width="728" height="90" cellpadding="0" cellspacing="0" border="0"><tr><td valign="middle" align="center">' +
					 '<a href="' + google_ads[0].url + '" ' +
                     'onmouseout="window.status=\'\'" ' +
                     'onmouseover="window.status=\'go to ' +
                     google_ads[0].visible_url + '\'" ' +
                     'style="text-decoration:none">' +
                     '<span style="text-decoration:underline;font-size:14pt">' +
                     '<b>' + google_ads[0].line1 + '</b><br></span>' +
                     '<span style="color:#000000;font-size:11pt">' +
                     google_ads[0].line2 + '&nbsp;' +
                     google_ads[0].line3 + '<br></span>' +
                     '<span style="text-decoration:underline;color:#000099;font-size:12pt">' +
                     google_ads[0].visible_url + '</span></a><br>' +
					 '</td></tr><tr><td bgcolor="336699" align="right">' +
	  				'<span style="font-size:10px;color:FFFFFF;font-family: verdana, tahoma, helvetica, sans-serif;">Ads by Google&nbsp;</span>'	+
					'</td></tr></table>';

				return xhtml;
			} 

		// Return text link advertisements.
		else 
			{	var xhtml = '<div class="header">Ads by Google</div>';

				// Append each text ad.
				for ( var i=0; i < google_ads.length; ++i ) 
					{	xhtml += 
							'<br />' + 
							'<a href="' + google_ads[i].url + '" ' + 
								'onmouseout="window.status=\'\'" ' +
								'onmouseover="window.status=\'go to ' + google_ads[i].visible_url + '\'" ' +
								'style="text-decoration:none">' +
								'<span style="text-decoration:underline;"><strong>' + google_ads[i].line1 + '</strong><br /></span>' +
								'<span style="color: #000000;" class="descr">' + google_ads[i].line2 + '&nbsp;' + google_ads[i].line3 + '<br /></span>' + 
								'<span style="text-decoration:underline;">' + google_ads[i].visible_url + '</span>' +
							'</a><br />';
					}; 

				return xhtml;
			}; 
	}; 

// This object loads text links.
var textlinkLoader = 
	{	// An array of ads to load.
		ads: new Array(),

		// Always display this section?
		always: false,

		// This method adds an ad to be loaded.
		addTextAd: function (id, always, callback, params)
			{	this.always = this.always || always;
				this.ads[this.ads.length] = { id : id, callback : callback, always : always, params: params };
			},

		// This method attempts to load all the ads.
		load: function ()
			{	var always = this.always;

				// Process each ad.
				for ( var index = 0; index < this.ads.length; index++ )
					{	this.ads[index].tag = this.ads[index].callback(this.ads[index].params);
						always = always || this.ads[index].tag != '';
					};

				if ( always )
					{	document.write('<div class="textads">');
						document.write('<h2><span>Sponsored Links</span></h2>');
						document.write('<div class="content">');

						for ( var index = 0; index < this.ads.length; index++ )
							{	document.write('<div class="text-ad-' + this.ads[index].id + '">' + this.ads[index].tag + '</div>');
							};

						document.write('</div>')
						document.write('</div>');
					};
			}
	};

// This function generates an Amex text link ad.
function AmexTextAdGenerator (params)
	{	if ( /(^|\+)(EC|BZ)($|\+)/.test(params.subjcode) )
			{	var die_roll = Math.random();

				var rand_value = Math.round(Math.random() * 10000000000);

				if ( die_roll <= .3 )
					{	return '<a href="http://ad.doubleclick.net/clk;227739530;51266766;q" target="_blank">AcceptPay</a> - the online payment solution built for business from American Express OPEN.<a href="http://ad.doubleclick.net/jump/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" target="_blank" style="text-decoration: none"><img src="http://ad.doubleclick.net/ad/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" border=0 width=1 height=1 alt="Click Here"></a>';
					}

				else if ( die_roll <= .6 )
					{	return '<a href="http://ad.doubleclick.net/clk;227739530;51266766;q" target="_blank">AcceptPay</a> - The simple, flexible, professional payment solution built for business.<a href="http://ad.doubleclick.net/jump/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" target="_blank" style="text-decoration: none"><img src="http://ad.doubleclick.net/ad/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" border=0 width=1 height=1 alt="Click Here"></a>';
					}

				else
					{	return '<a href="http://ad.doubleclick.net/clk;227739530;51266766;q" target="_blank">AcceptPay</a>, get paid faster online and give your customers more payment options.<a href="http://ad.doubleclick.net/jump/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" target="_blank" style="text-decoration: none"><img src="http://ad.doubleclick.net/ad/N553.britannica1/B4597239.5;sz=1x1;ord=' + rand_value + '?" border=0 width=1 height=1 alt="Click Here"></a>';
					};
			};

		return '';
	};
