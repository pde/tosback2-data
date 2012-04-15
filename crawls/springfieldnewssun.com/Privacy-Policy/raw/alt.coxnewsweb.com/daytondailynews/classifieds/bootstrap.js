function classifieds_box()
{
	// defaults
	this.links = [];
	this.numberOfItems = 4;
	this.site = "daytondailynews";
	
	this.addLink = function(link)
	{
		if(typeof(link)!='object')
			return false;
		link.link = link.link.replace(/\@\@publicationname\@\@/g, this.site);
		if(link.sites && typeof(link.sites)!='undefined' && link.sites.length > 0)
		{
			if(link.sites.toString().indexOf(this.site) < 0)
				return false;
		}
		if(link.thru && typeof(link.thru)=='string')
		{
			var threshold = Number(link.thru.replace(/\//g, ""));
			if(threshold < this.today())
				return false;
		}
		if(link.start && typeof(link.start)=='string')
		{
			var start = Number(link.start.replace(/\//g, ""));
			if(start > this.today())
				return false;
		}
		this.links.push(link);
	};
	this.setSite = function()
	{
		var sites = ['daytondailynews',
					 'springfieldnewssun',
					 'activedayton',
					 'journal-news',
					 'middletownjournal',
					 'pulsejournal',
					 'western-star',
					 'oxfordpress',
					 'fairfield-echo'
					 ];
		for(var i=0;i<sites.length;i++)
			if(location.hostname.match(sites[i]))
				this.site = sites[i];
	}
	this.setNumberOfItems = function(x)
	{
		this.numberOfItems = x;
	}
	this.randomizeLinks = function()
	{
		this.links.sort(function(){ return Math.round(Math.random())-0.5; });
	}
	this.today = function()
	{
		var now = new Date();
		var month = (now.getMonth() +1).toString();
		if(month.length == 1)
			month = 0 + month;
		var date = now.getDate().toString();
		if(date.length == 1)
			date = 0 + date;
		var year = now.getFullYear();
		return Number(year+""+month+""+date);
	}
	this.write = function(div_id, randomize)
	{
		if(typeof(div_id)!='string' || this.links.length < 1 || div_id=="")
			div_id = "classifiedsBox"+Math.floor(Math.random()*1111);
		if(!document.getElementById(div_id))
			document.write('<div id="'+div_id+'"></div>');
			
		// Randomize links
		if(typeof(randomize)!='undefined' && randomize)
			this.randomizeLinks();
		
		// List
		var numberOfItems = Math.min(this.links.length, this.numberOfItems);
		var list = document.createElement("ul");
		list.className = 'classifiedbox';
		for(var i=0;i<numberOfItems;i++)
		{		
			// Link
			var itemlink = document.createElement("a");
			itemlink.setAttribute("href", this.links[i].link);
			var itemlinktext = document.createTextNode(this.links[i].text);
			itemlink.appendChild(itemlinktext);
			
			// Item
			var item = document.createElement("li");
			item.appendChild(itemlink);
			
			// Add to list
			list.appendChild(item);
		}
		
		// Add to <div>
		var container = document.getElementById(div_id);
		container.className = "classifieds_box_container";
		container.appendChild(list);
	}
	this.setSite();

	// write stylesheet to <head>
	if(document.getElementById('classifiedbox_bootstrap_css'))
		return;
	var css = document.createElement('link');
	css.setAttribute("id", "classifiedbox_bootstrap_css");
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("media", "all");
	css.setAttribute("href", "http://alt.coxnewsweb.com/daytondailynews/classifieds/styles.css");
	document.getElementsByTagName("head")[0].appendChild(css);
}