/*
 */
var weekday=new Array("SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY");

function fireMetrics(id, options){
	//alert('fireMetrics: ' + id);
	if (id == '') return;
	
	var pageEvent = ( /page/.test( id ));

	if(( id == 'signUp' || id == 'signIn' ) && window.location.href.indexOf( "/gmownercenter/" ) != -1 ) pageEvent = true;

	if (typeof options == 'string') {
		var optionsArr = options.split("::",2); // add support for multiple items
		if (optionsArr.length > 0) {
			var k = optionsArr[0];
			var v = optionsArr[1];
			options = {};
			options[k] = v;
		}
	}
	
    if (typeof pageTrackJSON != 'undefined') 
	{
		var sdata = {};
		var fail = true;
    	for (var i=0; i<pageTrackJSON.length; i++) 
		{
			var tmp = pageTrackJSON[i]
			if(tmp.id.toLowerCase() == id.toLowerCase())
			{
				/// clone the object so the original is not changed
				sdata = $.extend(true, {}, tmp);
				fail = false;
				break;
			}
		}
		
		sdata.vars = parseOptions(sdata.vars, options);
		if (isNotEmpty(sdata) && !fail) {
			clickTrack(sdata.vars, pageEvent);
		}
   }
   
   if (typeof dartTrackJSON != 'undefined') 
	{
		var sdata = {};
    	for (var i=0; i<dartTrackJSON.length; i++) 
		{
			var trackTmp = dartTrackJSON[i];
			for (var key in trackTmp) 
			{
				if (key === "undefined") 
				{
					continue;
				}
				var dartTrkArr = trackTmp[key];
				for (var x=0; x<dartTrkArr.length; x++)
				{
					if(typeof dartTrkArr[x] !== 'undefined' && dartTrkArr[x].id !== 'undefined' && dartTrkArr[x].id.toLowerCase() === id.toLowerCase())
					{
						/// clone the object so the original is not changed
						$.extend(true, sdata, dartTrkArr[x]);
						if (isNotEmpty(sdata)) {
							trackDart(sdata.vars, key);
						}
					}
				}
			}	
		}
		
   }

}

function parseOptions(sdata, options){
	//parse out values into an Associative array.
	var optionArray = {};
	
	// add hour and day info
	optionArray['HOUR'] = new Date().getHours()
	optionArray['DAY'] = weekday[(new Date()).getDay()]
		
	if (typeof options != 'undefined') {
		$.each(options, function(key, value) {
			optionArray[key] = value;
		})
	}

	var reg = /<<(\w*)>>/;
	// loop through prop value to replace tokens.
	for(var i in sdata){
		if (reg.test(sdata[i])) {
			for (var x in optionArray) {
				sdata[i] = sdata[i].replace(new RegExp('<<' + x + '>>','gi'), optionArray[x])
			}
		}
	}
	return sdata;
}

function clickTrack(obj, pageEvent) {
	var _linkTrackVars = new Array();
	var _pev2 = 'gmds';
	$.each(obj, function(key, value) {
		if (key.indexOf("prop") != -1 || key.indexOf("eVar") != -1 || key.indexOf("event") != -1 ) {
			_linkTrackVars.push(key);
		} else if (key.indexOf("pev2") != -1) {
			_pev2 = value;
		}
	});
	if (typeof Omniture_s != 'undefined') {
		Omniture_s.linkTrackVars = _linkTrackVars.toString();
    	$.extend(Omniture_s, obj);
		if (pageEvent) {
			Omniture_s.t();
		} else {
			Omniture_s.tl(true, 'o', _pev2);
		}
    	
  		// Clear out tracking vars
		Omniture_s.pageName="";
		for (i=1; i <=100; i++) {
			eval('Omniture_s.prop'+i+'="";');
			eval('Omniture_s.eVar'+i+'="";');
		}
		for (i=1; i <=75; i++) {
			eval('Omniture_s.events'+i+'="";');
		}
		
	} else if (typeof s != 'undefined') {
		s.linkTrackVars = _linkTrackVars.toString();
		$.extend(s, obj);
		if (pageEvent) {
			s.t();
		} else {
			s.tl(true, 'o', _pev2);
		}
		
  		// Clear out tracking vars
		s.pageName="";
		for (i=1; i <=100; i++) {
			eval('s.prop'+i+'="";');
			eval('s.eVar'+i+'="";');
		}
		for (i=1; i <=75; i++) {
			eval('s.events'+i+'="";');
		}
		//console.dir(s);
	}
}

function trackDart(obj, type){
	
	var url = "undefined";
	if (type === "flood") {
		url = "http://fls.doubleclick.net/activityi";
	} else if (type === "spot") {
		url = "http://ad.doubleclick.net/activity";
	} else {
		return; // Unknown tag returned.
	}
	
	var rand = Math.random() + "";
	var a = rand * 10000000000000;
	var iDart = document.createElement("IFRAME");
	iDart.setAttribute("width", "1");
	iDart.setAttribute("height", "1");
	
	var mysrc=(typeof(obj.src)!="undefined")?obj.src:'';
	var mytype=(typeof(obj.tmp)!="undefined")?obj.tmp:'';
	var mycat=(typeof(obj.cat)!="undefined")?obj.cat:'';
	var myu1=(typeof(obj.u1)!="undefined")?obj.u1:'';
	var myu2=(typeof(obj.u2)!="undefined")?obj.u2:'';
	if (mysrc!=''&&mytype!=''&&mycat!='') {
		var sDartSrc=url + ';src='+mysrc+';type='+mytype+';cat='+mycat+';u1='+myu1+';u2='+myu2+';ord='+a+'?';
		iDart.setAttribute("src", sDartSrc);
		document.body.appendChild(iDart);
	}
}

function isNotEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }

    return false;
}

