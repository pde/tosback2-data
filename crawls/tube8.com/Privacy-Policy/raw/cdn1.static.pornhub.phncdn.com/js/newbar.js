/**
* 
* Pornhub Network Bar jQuery Plugin.
* This plug-in will add a network bar to the element it is called in (usually "body").
* 
*/

// Check if jQuery is present:
if (typeof jQuery != 'undefined') {
	var ph_menu_timer;
	( function( $ ) {
		// Default settings:
		var settings = {
			site		: 'gtub',
			isGay		: false,
			isFixed		: false,
			styleCSS	: true,
			namespace	: "phub_bar",
			css			: {
				'#ph_net_bar'		: {
					'position'			: 'relative',
					'margin'			: '0',
					'top'				: '0',
					'left'				: '0',
					'width'				: '100%',
					'height'			: '27px',
					'background'		: 'transparent url(http://cdn1.static.pornhub.phncdn.com/images/bar/ph_net_bar.png) repeat-x 0 0',
					'font-family'		: 'Arial,Helvetica,sans-serif',
					'overflow'			: 'hidden',
					'z-index'			: '999999'
				},
				'#ph_net_container'	: {
					'position'			: 'relative',
					'margin'			: '0 auto',
					'text-align'		: 'center'
				},
				'#ph_net_logo'		: {
					'float'				: 'left',
					'margin-right'		: '5px',
					'width'				: '153px',
					'height'			: '27px',
					'background'		: 'transparent url(http://cdn1.static.pornhub.phncdn.com/images/bar/ph_net_bar.png) no-repeat 0 -27px'
				},
				'.ph_net_split'		: {
					'float'				: 'left',
					'width'				: '1px',
					'height'			: '27px',
					'background'		: 'transparent url(http://cdn1.static.pornhub.phncdn.com/images/bar/ph_net_bar.png) no-repeat -157px -27px'
				},
				'.ph_net_links'		: {
					'color'				: '#ddd',
					'height'			: '26px',
					'line-height'		: '25px',
					'margin'			: '0',
					'padding'			: '0 12px',
					'border'			: 'none',
					'outline'			: 'none',
					'float'				: 'left',
					'font-size'			: '11px',
					'text-decoration'	: 'none'
				},
				'#ph_net_menu'		: {
					'position'			: 'absolute',
					'margin'			: '0px',
					'padding'			: '1px 15px 15px 15px',
					'top'				: '26px',
					'background-color'	: 'transparent'
				},
				'#ph_net_menu_in'	: {
					'position'			: 'relative',
					'margin'			: '0px',
					'padding'			: '6px 4px',
					'width'				: '112px',
					'background-color'	: '#2D2D2D',
					'font-family'		: 'Arial,Helvetica,sans-serif',
					'text-align'		: 'left'
				},
				'.ph_alt_links'		: {
					'display'			: 'block',
					'padding'			: '2px 0',
					'font-size'			: '12px',
					'text-align'		: 'left',
					'text-decoration'	: 'none',
					'color'				: '#ddd'
				},
				'#ph_net_bar_spacer': {
					'position'			: 'relative',
					'width'				: '100%',
					'height'			: '27px',
					'overflow'			: 'hidden'
				},
				'links_active'		: {
					'background-color'	: '#333',
					'cursor'			: 'default'
				},
				'links_hover'		: {
					'background-color'	: '#333',
					'color'				: '#ddd'
				},
				'links_blur'		: {
					'background-color'	: 'transparent',
					'color'				: '#ddd'
				}
			},
			sites		: {
				'phub'	: {	'inBar': true,	'name': "PornHub",	'code': "phub",	'utm': "pornhub",		'utmSafe': "ph",	'url': "http://www.pornhub.com/?",	'css': {
						'body'				: ['background-position','0 27px']
					}
				},
				'youp'	: {	'inBar': true,	'name': "Youporn",	'code': "youp",	'utm': "youporn",		'utmSafe': "yp",	'url': "http://www.youporn.com/?",	'css': {
						'#ph_net_container'	: ['width','984px'],
						'body'				: ['width','auto']
					}
				},
				'tub8'	: {	'inBar': true,	'name': "Tube8",		'code': "tub8",	'utm': "tube8",		'utmSafe': "t8",	'url': "http://www.tube8.com/#",		'css': {
						'#ph_net_container'	: ['width','990px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'prmd'	: {	'inBar': true,	'name': "PornMD",	'code': "prmd",	'utm': "pornmd",			'utmSafe': "md",	'url': "http://www.pornmd.com/?",		'css': {
						'#ph_net_container'	: ['width','962px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'wire'	: {	'inBar': true,	'name': "SpankWire",	'code': "wire",	'utm': "spankwire",	'utmSafe': "sw",	'url': "http://www.spankwire.com/?",	'css': {
						'#ph_net_container'	: ['width','980px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'keez'	: {	'inBar': true,	'name': "KeezMovies",	'code': "keez",	'utm': "keezmovies",	'utmSafe': "km",	'url': "http://www.keezmovies.com/?",'css': {
						'#ph_net_container'	: ['width','962px'],
						'#ph_net_container'	: ['max-width','1280px'],
						'#ph_net_logo'		: ['margin-left','7px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'xtub'	: {	'inBar': true,	'name': "XTube",		'code': "xtub",	'utm': "xtube",		'utmSafe': "xt",	'url': "http://www.xtube.com/?splash=false&iAm=M&ilike=F&",'css': {
						'#ph_net_container'	: ['width','1000px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'extt'	: {	'inBar': true,	'name': "ExtremeTube",'code': "extt",	'utm': "extremetube",		'utmSafe': "ex",	'url': "http://www.extremetube.com/?",'css': {
						'#ph_net_container'	: ['width','92%'],
						'#ph_net_container'	: ['max-width','90em'],
						'body'				: ['background-position','0 27px']
					}
				},
				'alts'	: {	'inBar': true,	'name': "",			'code': "alts",	'utm': "",			'utmSafe': "",	'url': "#",	'css': {}
				},/*
				'bash'	: {	'inBar': true,	'name': "Viral Videos",'code': "bash",	'utm': "videobash",	'utmSafe': "vb",	'url': "http://www.prankvidz.com/?",'css': {}
				},*/
				'peep'	: {	'inBar': true,	'name': "Peeperz",	'code': "peep",	'utm': "peeperz",		'utmSafe': "pz",	'url': "http://www.peeperz.com/?",'css': {
						'#ph_net_container'		: ['width','102.8em']
					}
				},
				'mofo'	: {	'inBar': false,	'name': "Mofosex",	'code': "mofo",	'utm': "mofosex",			'utmSafe': "mfs",	'url': "http://www.mofosex.com/?",'css': {
						'#ph_net_container'		: ['width','980px'],
						'body'					: ['background-position','0 27px'],
						'div#starbust-header'	: ['background-position','center -4px']
					}
				},
				'sext'	: {	'inBar': false,	'name': "SexTube",	'code': "sext",	'utm': "sextube",			'utmSafe': "sxt",	'url': "http://www.sextube.com/?",'css': {
						'#ph_net_container'		: ['width','1005px']
					}
				}
			},
			gaySites	: {
				'gtub'	: {	'inBar': true,	'name': "GayTube",	'code': "gtub",	'utm': "gaytube",		'utmSafe': "gt",	'url': "http://www.gaytube.com/?",	'css': {
						'#ph_net_container'	: ['width','962px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'xtub'	: {	'inBar': true,	'name': "XTube",		'code': "xtub",	'utm': "xtube",		'utmSafe': "xt",	'url': "http://www.xtube.com/?splash=false&iAm=M&ilike=M&",'css': {
						'#ph_net_container'	: ['width','1000px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'tub8'	: {	'inBar': true,	'name': "Tube8",		'code': "tub8",	'utm': "tube8",		'utmSafe': "t8",	'url': "http://www.tube8.com/gay/#",		'css': {
						'#ph_net_container'	: ['width','990px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'prmd'	: {	'inBar': true,	'name': "PornMD",	'code': "prmd",	'utm': "pornmd",			'utmSafe': "md",	'url': "http://www.pornmd.com/?",		'css': {
						'#ph_net_container'	: ['width','962px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'phub'	: {	'inBar': true,	'name': "PornHub",	'code': "phub",	'utm': "pornhub",		'utmSafe': "ph",	'url': "http://www.pornhub.com/gay?",	'css': {
						'#ph_net_container'	: ['width','962px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'youp'	: {	'inBar': true,	'name': "Youporn",	'code': "youp",	'utm': "youporn",		'utmSafe': "yp",	'url': "http://www.youporngay.com/?",	'css': {
						'#ph_net_container'	: ['width','984px'],
						'body'				: ['width','auto']
					}
				},
				'extt'	: {	'inBar': true,	'name': "ExtremeTube",'code': "extt",	'utm': "extremetube",		'utmSafe': "ex",	'url': "http://www.extremetube.com/gay?",'css': {
						'#ph_net_container'	: ['width','92%'],
						'#ph_net_container'	: ['max-width','90em'],
						'body'				: ['background-position','0 27px']
					}
				},
				'wire'	: {	'inBar': true,	'name': "SpankWire",	'code': "wire",	'utm': "spankwire",	'utmSafe': "sw",	'url': "http://www.spankwire.com/home/Gay?",	'css': {
						'#ph_net_container'	: ['width','980px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'alts'	: {	'inBar': true,	'name': "",			'code': "alts",	'utm': "",			'utmSafe': "",	'url': "#",	'css': {}
				},/*
				'bash'	: {	'inBar': true,	'name': "Viral Videos",'code': "bash",	'utm': "videobash",	'utmSafe': "vb",	'url': "http://www.prankvidz.com/?",'css': {}
				},*/
				'peep'	: {	'inBar': true,	'name': "Peeperz",	'code': "peep",	'utm': "peeperz",		'utmSafe': "pz",	'url': "http://www.peeperz.com/?",'css': {
						'#ph_net_container'		: ['width','102.8em']
					}
				},
				'keez'	: {	'inBar': false,	'name': "KeezMovies",	'code': "keez",	'utm': "keezmovies",	'utmSafe': "km",	'url': "http://www.keezmovies.com/?",'css': {
						'#ph_net_container'	: ['width','962px'],
						'#ph_net_container'	: ['max-width','1280px'],
						'#ph_net_logo'		: ['margin-left','7px'],
						'body'				: ['background-position','0 27px']
					}
				},
				'mofo'	: {	'inBar': false,	'name': "Mofosex",	'code': "mofo",	'utm': "mofosex",			'utmSafe': "mfs",	'url': "http://www.mofosex.com/?",'css': {
						'#ph_net_container'		: ['width','980px'],
						'body'					: ['background-position','0 27px'],
						'div#starbust-header'	: ['background-position','center -4px']
					}
				}

			}
		};
		
		// Folder callbacks:
		var callbacks = {
			// Initializes plugin & all jQuery object elements:
			init			: function( options ) {
				// If the bar already exists, skip:
				if( $('#ph_net_bar').length ) {
					return this;
				}
				// Plugin init:
				if( options ) {
					$.extend(settings, options);
				}
				// jQuery object loop init:
				return this.each( function() {
					var $this = $(this);
					var sites = settings.isGay? settings.gaySites : settings.sites ;
					
					// Build the bar:
					$this.prepend('<div id="ph_net_bar"><div id="ph_net_container"><div id="ph_net_logo"></div><div class="ph_net_split"></div></div></div><div id="ph_net_menu" style="display:none;"><div id="ph_net_menu_in"></div></div>');

					// Add sites:
					for( key in sites ) {
						site =sites[key]
						if( site.inBar ) {
							var tag = settings.site == site.code ? 'p' : ('a href="'+site.url+'"');
							$('#ph_net_container').append('<'+tag+' class="ph_net_links" id="ph_net_' + site.code + '" target="_parent">' + site.name + '</' + tag.charAt(0) + '><div class="ph_net_split"></div>');
						}
					}
					// Add opposite menu (hardcoded for now):
					if( settings.isGay ) {
						$("#ph_net_alts").text("Straight Porn");
						$('#ph_net_menu_in').html('<a class="ph_alt_links" id="ph_alt_phub" target="_parent" href="http://www.pornhub.com/?">Pornhub</a>'+
							'<a class="ph_alt_links" id="ph_alt_youp" target="_parent" href="http://www.youporn.com/?">Youporn</a>'+
							'<a class="ph_alt_links" id="ph_alt_tub8" target="_parent" href="http://www.tube8.com/#">Tube8</a>'+
							'<a class="ph_alt_links" id="ph_alt_wire" target="_parent" href="http://www.spankwire.com/?">SpankWire</a>'+
							'<a class="ph_alt_links" id="ph_alt_keez" target="_parent" href="http://www.keezmovies.com/?">Keezmovies</a>'+
							'<a class="ph_alt_links" id="ph_alt_xtub" target="_parent" href="http://www.xtube.com/?splash=false&iam=M&ilike=F&">XTube</a>'+
							'<a class="ph_alt_links" id="ph_alt_extt" target="_parent" href="http://www.extremetube.com/?">Extremetube</a>');
					} else {
						$("#ph_net_alts").text("Gay Porn");
						$('#ph_net_menu_in').html('<a class="ph_alt_links" id="ph_alt_gtub" target="_parent" href="http://www.gaytube.com/?">GayTube</a>'+
							'<a class="ph_alt_links" id="ph_alt_xtub" target="_parent" href="http://www.xtube.com/videos.php?splash=false&iam=M&ilike=M&">XTube Gay</a>'+
							'<a class="ph_alt_links" id="ph_alt_tub8" target="_parent" href="http://www.tube8.com/gay/#">Tube8 Gay</a>'+
							'<a class="ph_alt_links" id="ph_alt_phub" target="_parent" href="http://www.pornhub.com/gay?">PornHub Gay</a>'+
							'<a class="ph_alt_links" id="ph_alt_youp" target="_parent" href="http://www.youporngay.com/?">YouPorn Gay</a>'+
							'<a class="ph_alt_links" id="ph_alt_extt" target="_parent" href="http://www.extremetube.com/category/gay?">ExtremeTube Gay</a>'+
							'<a class="ph_alt_links" id="ph_alt_wire" target="_parent" href="http://www.spankwire.com/home/Gay?">SpankWire Gay</a>');
					}					
					
					// Theme to current site:
					if( settings.styleCSS ) {
						for( style in settings.css ) {
							if( style.match(/^(#|\.)/) ) {
								$(style).css(settings.css[style]);
							}
						}					
					}

					if( settings.isGay ) {
						$('#ph_net_logo').css('width','163px');
						$('#ph_net_logo').css('background-position','0 -54px');
					}

					$('#ph_net_'+settings.site).css(settings.css.links_active);
					$('a.ph_net_links').each( function() { jQuery(this).hover(callbacks.net_links_hover,callbacks.net_links_blur) } );
					$('a.ph_net_links:not(#ph_net_bash):not(#ph_net_'+settings.site+'):not(#ph_net_alts),a.ph_alt_links').each( callbacks.click );
					//$('a#ph_net_bash').attr('href', $('a#ph_net_bash').attr('href')+'utm_source='+sites[settings.site].utmSafe+'&utm_medium=network-bar&utm_campaign='+sites[settings.site].utmSafe+'-networkbar'+(settings.isGay?'-gay':'') );

					for( style in sites[settings.site].css ) {
						$(style).css(sites[settings.site].css[style][0],sites[settings.site].css[style][1]);
					}
					
					// Alternate menu:
					$('a#ph_net_alts').mouseenter( function(e) {
						window.clearTimeout(ph_menu_timer);
						$('div#ph_net_menu').css({'left': ($("a#ph_net_alts").offset().left-15) + 'px'});
						$('div#ph_net_menu').show();
					});
					$('a#ph_net_alts,div#ph_net_menu').mouseleave( function(e) {
						if( $(e.relatedTarget).attr("id") == undefined || !$(e.relatedTarget).attr("id").match(/^(ph_net_alts|ph_net_menu)/) )
							ph_menu_timer = window.setTimeout( "jQuery('div#ph_net_menu').hide();", 250);
					});
					$('a#ph_net_alts').click( function(e) { return false; });
					$('div#ph_net_menu').css('z-index','999999');
					$('a.ph_alt_links').hover(function(e) { $(this).css({'color':'#FF9900'}) }, function(e) { $(this).css({'color':'#DDD'}) });
					
					// For fixed layout:
					if( settings.isFixed ) {
						$('#ph_net_bar').css("position","fixed");
						$('div#ph_net_menu').css("position","fixed");
						$this.prepend('<div id="ph_net_bar_spacer"></div>');
						$('#ph_net_bar_spacer').css(settings.css['#ph_net_bar_spacer']);
					}
					
					// Clean up & show:
					$('a.ph_net_links,a.ph_alt_links').each( function(e) {
						if( $(this).attr('href').match(/[?&#]$/) ) {
						  $(this).attr('href', $(this).attr('href').slice(0,-1) );
						}
					});
					$('#ph_net_bar').show();
					return false;	// This breaks after 1 loop. Remove to loop trough entire jQuery object.
				});
				return this;
			},
			
			 // Unbinds all events from jQuery object elements:
			destroy			: function() {
				this.each( function() {
					var $this = $(this);
					$this.unbind("."+settings.namespace);
				});
				if( $('#ph_net_bar').length ) {
					$('#ph_net_bar').remove();
				}
				return this;
			},
			
			net_links_hover	: function() {
				$(this).css(settings.css.links_hover);
			},

			net_links_blur	: function() {
				$(this).css(settings.css.links_blur);
			},

			click			: function() {
				var $this	= $(this);
				var sites = settings.isGay? settings.gaySites : settings.sites ;
				var utm 	= $this.attr("id") == "ph_net_bash" ? sites[settings.site].utmSafe : sites[settings.site].utm ;
				$this.attr('href', $this.attr('href')+'utm_source='+utm+'&utm_medium=network-bar&utm_campaign='+utm+'-networkbar'+(settings.isGay?'-gay':'') );
				return true;
			}
			
		};
		
	$.fn.ph_bar = function( arg ) {
		if( callbacks[arg] ) {
			return callbacks[arg].apply(this);
		} else if( typeof arg === 'object' || !arg ) {
			return callbacks.init.apply(this, arguments);
		} else {
			return this;
		}
	};
	} )( jQuery );
}