var reporting = {
	init: function(){jQuery(document).bind("mousedown",reporting.beginCapture)},
	eventTarget: null,
	selectors: [],
	registerClass: function(className, defaultOptions, gatherMethod){reporting.selectors.push({selector:"."+className,"defaultOptions":defaultOptions,"gatherMethod":gatherMethod})},
	registerSelector: function(selector, defaultOptions, gatherMethod){reporting.selectors.push({selector:selector,"defaultOptions":defaultOptions,"gatherMethod":gatherMethod})},
	mergeMap: function(map1, map2){var map3 = {};for(x in map1){map3[x] = map1[x]};for(x in map2){map3[x] = map2[x]};return map3},
	beginCapture: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		reporting.eventTarget = target;
		jQuery(document).bind("mouseup",reporting.endCapture)
	},
	endCapture: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		if(target == reporting.eventTarget){reporting.captureClick(event)}
		jQuery(document).unbind("mouseup",reporting.endCapture);
	},
	captureClick: function(event){
		event = event ? event : window.event;
		var target = event.target ? event.target : event.srcElement;
		var body = document.getElementsByTagName("body")[0];
		var ancestry = [target];
		
		while(target != body){target = target.parentNode;ancestry.push(target)}
		
		for(var i = 0; i < reporting.selectors.length; i++){
			for(var k = 0; k < ancestry.length; k++){
				target = ancestry[k];
				if(jQuery(target).is(reporting.selectors[i].selector)){
					var defaultOptions = reporting.selectors[i].defaultOptions;
					var gatheredOptions = reporting.selectors[i].gatherMethod.apply(target);
					reporting.dispatchEvent.apply(target,[reporting.mergeMap(defaultOptions,gatheredOptions)]);
					break;
				}
			}
		}
		
		return true;
	},
	dispatchEvent: function(options){
		var wtArgs = [];
		var hasHref = typeof this != "undefined" && typeof this.href != "undefined";
		
		options["DCS.dcsref"] = window.location.href;
		options["DCSext.wtNoHit"] = 1;
		
		if(hasHref){
			options["DCS.dcssip"] = this.hostname;
			options["DCS.dcsuri"] = this.pathname.replace(/^([^\/])/,'/$1');
		}
		
		for(option in options){wtArgs.push(option); wtArgs.push((options[option] + "").replace(/^\s+|\s+$/, ''))}
		try{dcsMultiTrackTop.apply(this, wtArgs)}catch(err){}
	}
}

jQuery(reporting.init());