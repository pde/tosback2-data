(function(){

	function frm(g,d,w,h) {
		if (g == top) return false;
		var el = d.documentElement;
   	var x = 1, y = 1;
	  if (g.innerHeight) {
			x = g.innerWidth;
			y = g.innerHeight;
	  } 
		else if (el && el.clientHeight) {
			x = el.clientWidth;
			y = el.clientHeight;
	  } 
		else if (d.body) {
			x = d.body.clientWidth;
			y = d.body.clientHeight;
	  }
		return (w == x && h == y);
	}

	function enc(s) {
  	if(typeof encodeURIComponent == 'function')
    	return encodeURIComponent(s);
    else
    	return escape(s);
	}	

	var g = window;
	var d = document;
	var m = 0;
	var pb = g.admeld_publisher != null ? g.admeld_publisher : 0;
	var st = g.admeld_site != null ? g.admeld_site : 0;
	var sz = g.admeld_size != null ? g.admeld_size : 0x0;
	var ps = g.admeld_placement != null ? g.admeld_placement: 'ros';
	var dt = new Date();
	var t = dt.getTime();
	var tz = dt.getTimezoneOffset();
	var w=0, h=0;
	var hu = g.admeld_house_url != null ? enc(g.admeld_house_url) : '';
	var ht = g.admeld_house_type != null ? g.admeld_house_type : 'js';
	var hp = g.admeld_house_price != null ? g.admeld_house_price : 0;
	
	try {
		var i = sz.indexOf('x');
		w = sz.substring(0,i);
		h = sz.substring(i+1);
	}
	catch(e) {
		w = h = 0;
	}

	try {
		m = frm(g,d,w,h) ? 1 : 0;
	}
	catch(e) {
		m = 0;	
	}
	
	try {
		var ni = g.admeld_no_iframe != null ? g.admeld_no_iframe : false;
		if (ni && m == 0) m = 2;
	}
	catch(e) {
		m = 0;
	}

	var cf = "";

	try {
		if (g.admeld_custom1 != null) cf += '&cf1='+enc(g.admeld_custom1);
		if (g.admeld_custom2 != null) cf += '&cf2='+enc(g.admeld_custom2);
		if (g.admeld_custom3 != null) cf += '&cf3='+enc(g.admeld_custom3);
		if (g.admeld_custom4 != null) cf += '&cf4='+enc(g.admeld_custom4);
	}
	catch(e) {
		cf = "";
	}

	switch(m) {
		case 1: {
			var ur = g.admeld_url != null ? g.admeld_url : document.referrer;
			var u = 'http://tag.admeld.com/ad/js/'+pb+'/'+st+'/'+sz+'/'+ps+'?t='+t+cf+'&tz='+tz+'&hu='+hu+'&ht='+ht+'&hp='+hp+'&url='+enc(ur);
	  	document.writeln(String.fromCharCode(60,83,67,82,73,80,84)+' type="text/javascript" src="'+u+'">'+String.fromCharCode(60,47,83,67,82,73,80,84,62));
			break;
		}
		case 2: {
			var ur = g.admeld_url != null ? g.admeld_url : document.location.href;
			var u = 'http://tag.admeld.com/ad/js/'+pb+'/'+st+'/'+sz+'/'+ps+'?t='+t+cf+'&tz='+tz+'&hu='+hu+'&ht='+ht+'&hp='+hp+'&url='+enc(ur)+'&refer='+enc(document.referrer);
	  	document.writeln(String.fromCharCode(60,83,67,82,73,80,84)+' type="text/javascript" src="'+u+'">'+String.fromCharCode(60,47,83,67,82,73,80,84,62));
			break;
		}
		default: {
			var ur = g.admeld_url != null ? g.admeld_url : document.location.href;
			var u = 'http://tag.admeld.com/ad/iframe/'+pb+'/'+st+'/'+sz+'/'+ps+'?t='+t+cf+'&tz='+tz+'&hu='+hu+'&ht='+ht+'&hp='+hp+'&url='+enc(ur)+'&refer='+enc(document.referrer);
			document.writeln('<iframe width='+w+' height='+h+' marginwidth=0 marginheight=0 frameborder=0 border=0 scrolling=no src="'+u+'"></iframe>');
			break;
		}
	}
	g.admeld_publisher = g.admeld_site = g.admeld_size = g.admeld_url = g.admeld_placement = g.admeld_custom1 = g.admeld_custom2 = g.admeld_custom3 = g.admeld_custom4 = g.admeld_house_url = g.admeld_house_type = g.admeld_house_price = g.admeld_no_iframe = null;
})();

