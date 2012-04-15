function seeker_pin(domain,scid)
{		
	var siteDomain = '';
	if( scid == '1' ) {siteDomain = 'monsterindia.com'; }
	if( scid == '2' ) {siteDomain = 'monstergulf.com'; }
	if( scid == '5' ) {siteDomain = 'monster.com.hk'; }
	if( scid == '6' ) {siteDomain = 'monster.com.sg'; }
	if( scid == '7' ) {siteDomain = 'monster.com.ph'; }		
	if( scid == '8' ) {siteDomain = 'monster.co.th'; }
	if( scid == '9' ) {siteDomain = 'monster.com.vn'; }
	if( scid == '10' ) {siteDomain = 'monster.co.id'; }
	if( scid == '11' ) {siteDomain = 'monster.com.my'; }	
	
	var match = domain.search(/noida/i);
	if(match != -1)
	{
		domain = 'monsterindia.noida';

		if( scid == '1' ) {siteDomain = 'monsterindia.noida'; }
		if( scid == '2' ) {siteDomain = 'monstergulf.noida'; }
		if( scid == '5' ) {siteDomain = 'monster.hk.noida'; }
		if( scid == '6' ) {siteDomain = 'monster.sg.noida'; }
		if( scid == '7' ) {siteDomain = 'monster.ph.noida'; }		
		if( scid == '8' ) {siteDomain = 'monster.th.noida'; }
		if( scid == '9' ) {siteDomain = 'monster.vn.noida'; }
		if( scid == '10' ) {siteDomain = 'monster.id.noida'; }
		if( scid == '11' ) {siteDomain = 'monster.my.noida'; }
	}
	
	if ( navigator.userAgent.toLowerCase().match(/msie (9|10)(\.?[0-9]*)*/) ) 
	{	
		var lib = {
			dom: {
				meta: function(name, content) {
					var meta = document.createElement('meta');
					meta.setAttribute('name', name);
					meta.setAttribute('content', content);         
					return meta;
				},
				link: function(rel, href) {
					var link = document.createElement('link');
					link.setAttribute('rel', rel);
					link.setAttribute('href', href);
					return link;
				},
				div: function() {
					return document.createElement('div');
				}
			},
			net: {
				getJSONP: function( URL ) {
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = URL + ( URL.indexOf('?') != -1 ? '&' : '?' ) + Date.now();
					var head = document.getElementsByTagName('head')[0];
					head.insertBefore(script, head.firstChild);
				}
			}
		};

		var options = {

			// Basic site information      
			siteName: siteDomain, // Site Name
			applicationName: siteDomain, // Site Name
			startURL: 'http://www.'+ siteDomain +'/', // Homepage URL
			shortcutIcon: 'http://media.monsterindia.com/32x32.ico', // Main Site Icon
			tooltip: 'Start the Monster app',
			appWindowSize: 'width=1024;height=768',

			// Dynamic jumplist tasks & notifications
			categoryTitle: 'Monster Jump List', // Task group name
			defaultTaskIcon: 'http://media.monsterindia.com/24x24.ico', // Generic task icon
			   
			navButtonColor: '#673694',
			   
			// Jumplist tasks { name: Task Label, action: Task URL, icon: Task Icon }
			staticTasks: [{ name: 'Monster Home',  action: 'http://www.'+ siteDomain +'/', icon: 'http://media.monsterindia.com/24x24.ico', target: 'tab' },{ name: 'Register',  action: 'http://my.'+ siteDomain +'/create_account.html', icon: 'http://media.monsterindia.com/24x24.ico', target: 'tab' }],
			   
			// Drag and drop site pinning bar              
			prompt: true, // Add a site pinning bar on top of my site pages
			barSiteName: 'MI_SITE' // Site name as it should appear on the pinning bar
		};

		var head = document.getElementsByTagName('head');
		if ( head ) 
		{
			head = head[0];
			if ( options.shortcutIcon ) 
			{
							head.appendChild( lib.dom.link('shortcut icon', options.shortcutIcon) );
					}
			head.appendChild( lib.dom.meta('application-name', options.applicationName) );
			head.appendChild( lib.dom.meta('msapplication-tooltip', options.tooltip) );

			if ( options.navButtonColor ) {
				head.appendChild( lib.dom.meta('msapplication-navbutton-color', options.navButtonColor) );
			}

			if ( options.startURL ) {
				head.appendChild( lib.dom.meta('msapplication-starturl', options.startURL) );
			}

			if ( options.appWindowSize ) {
				head.appendChild( lib.dom.meta('msapplication-window', options.appWindowSize) );
			}

			//Static task goes here.
			for ( var i = 0, task; i < options.staticTasks.length; i++ ) 
			{
				task = options.staticTasks[i];
				head.appendChild( lib.dom.meta('msapplication-task', 'name=' + task.name + ';action-uri=' + task.action + ';icon-uri=' + task.icon + ';window-type=' + task.target ) );
			}
		}

		try 
		{
			window.external.msIsSiteMode();
			if (window.external.msIsSiteMode()) 
			{			
				window.external.msSiteModeCreateJumpList("Monster Favorites");
				window.external.msSiteModeAddJumpListItem("RSS Feed","http://jobsearch."+ siteDomain +"/category/rss_index.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("International Jobs","http://jobsearch."+ siteDomain +"/international_jobs.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("Career Services","http://content."+ siteDomain +"/index.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("My Applications","http://my."+ siteDomain +"/applications.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("My Monster","http://my."+ siteDomain +"/my_monster.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("Search Jobs","http://jobsearch."+ siteDomain +"/search.html",options.defaultTaskIcon);
			}
		}
		catch (ex) 
		{
			// Fail silently.
		}
	}
}

function recruiter_pin(domain,scid)
{
	try{
	var siteDomain = '';
	if( scid == '1' ) {siteDomain = 'monsterindia.com'; }
	if( scid == '2' ) {siteDomain = 'monstergulf.com'; }
	if( scid == '5' ) {siteDomain = 'monster.com.hk'; }
	if( scid == '6' ) {siteDomain = 'monster.com.sg'; }
	if( scid == '7' ) {siteDomain = 'monster.com.ph'; }		
	if( scid == '8' ) {siteDomain = 'monster.co.th'; }
	if( scid == '9' ) {siteDomain = 'monster.com.vn'; }
	if( scid == '10' ) {siteDomain = 'monster.co.id'; }
	if( scid == '11' ) {siteDomain = 'monster.com.my'; }	
	
	var match = domain.search(/noida/i);
	if(match != -1)
	{
		domain = 'monsterindia.noida';

		if( scid == '1' ) {siteDomain = 'monsterindia.noida'; }
		if( scid == '2' ) {siteDomain = 'monstergulf.noida'; }
		if( scid == '5' ) {siteDomain = 'monster.hk.noida'; }
		if( scid == '6' ) {siteDomain = 'monster.sg.noida'; }
		if( scid == '7' ) {siteDomain = 'monster.ph.noida'; }		
		if( scid == '8' ) {siteDomain = 'monster.th.noida'; }
		if( scid == '9' ) {siteDomain = 'monster.vn.noida'; }
		if( scid == '10' ) {siteDomain = 'monster.id.noida'; }
		if( scid == '11' ) {siteDomain = 'monster.my.noida'; }
	}
	
	if ( navigator.userAgent.toLowerCase().match(/msie (9|10)(\.?[0-9]*)*/) ) 
	{	
		var lib = {
			dom: {
				meta: function(name, content) {
					var meta = document.createElement('meta');
					meta.setAttribute('name', name);
					meta.setAttribute('content', content);         
					return meta;
				},
				link: function(rel, href) {
					var link = document.createElement('link');
					link.setAttribute('rel', rel);
					link.setAttribute('href', href);
					return link;
				},
				div: function() {
					return document.createElement('div');
				}
			},
			net: {
				getJSONP: function( URL ) {
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = URL + ( URL.indexOf('?') != -1 ? '&' : '?' ) + Date.now();
					var head = document.getElementsByTagName('head')[0];
					head.insertBefore(script, head.firstChild);
				}
			}
		};

		var options = {

			// Basic site information      
			siteName: siteDomain, // Site Name
			applicationName: 'recruiter.'+ siteDomain, // Site Name
			startURL: 'http://recruiter.'+ siteDomain, // Homepage URL						
			shortcutIcon: 'http://media.monsterindia.com/32x32.ico', // Main Site Icon
			tooltip: 'Start the Monster application',
			appWindowSize: 'width=1024;height=768',

			// Dynamic jumplist tasks & notifications	
			categoryTitle: 'Monster Jump List', // Task group name
			defaultTaskIcon: 'http://media.monsterindia.com/24x24.ico', // Generic task icon
			   
			navButtonColor: '#673694',
			   
			// Jumplist tasks { name: Task Label, action: Task URL, icon: Task Icon }
			staticTasks: [{ name: 'Talent Management Suit',  action: 'http://tms.'+ domain +'/', icon: 'http://media.monsterindia.com/24x24.ico', target: 'tab' },{ name: 'Monster Home',  action: 'http://recruiter.'+ siteDomain +'/', icon: 'http://media.monsterindia.com/24x24.ico', target: 'tab' }],

			// Drag and drop site pinning bar              
			prompt: true, // Add a site pinning bar on top of my site pages
			barSiteName: 'MI_SITE' // Site name as it should appear on the pinning bar
		};

		var head = document.getElementsByTagName('head');
		if ( head ) 
		{
			head = head[0];
			if ( options.shortcutIcon ) 
			{
							head.appendChild( lib.dom.link('shortcut icon', options.shortcutIcon) );
					}
			head.appendChild( lib.dom.meta('application-name', options.applicationName) );
			head.appendChild( lib.dom.meta('msapplication-tooltip', options.tooltip) );

			if ( options.navButtonColor ) {
				head.appendChild( lib.dom.meta('msapplication-navbutton-color', options.navButtonColor) );
			}

			if ( options.startURL ) {
				head.appendChild( lib.dom.meta('msapplication-starturl', options.startURL) );
			}

			if ( options.appWindowSize ) {
				head.appendChild( lib.dom.meta('msapplication-window', options.appWindowSize) );
			}

			//Static task goes here.
			for ( var i = 0, task; i < options.staticTasks.length; i++ ) 
			{
				task = options.staticTasks[i];
				head.appendChild( lib.dom.meta('msapplication-task', 'name=' + task.name + ';action-uri=' + task.action + ';icon-uri=' + task.icon + ';window-type=' + task.target ) );
			}
		}

		try 
		{
			window.external.msIsSiteMode();
			if (window.external.msIsSiteMode()) 
			{
				window.external.msSiteModeCreateJumpList("Monster Favorites");																			
				window.external.msSiteModeAddJumpListItem("Mobile Solutions","http://recruiter."+ siteDomain +"/v2/mobile/index.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("Buy Online","http://www."+ siteDomain +"/intermediate.html",options.defaultTaskIcon);	
				window.external.msSiteModeAddJumpListItem("Advertise your Job","http://recruiter."+ siteDomain +"/ecom/jp_learnmore.html",options.defaultTaskIcon);
				window.external.msSiteModeAddJumpListItem("Search Resumes","http://recruiter."+ siteDomain +"/v2/ecom/sr_learnmore.html",options.defaultTaskIcon);
			}
		}
		catch (ex) 
		{
			// Fail silently.
		}
	}
	}
	catch (ex) 
	{
		// Fail silently.
	}
}