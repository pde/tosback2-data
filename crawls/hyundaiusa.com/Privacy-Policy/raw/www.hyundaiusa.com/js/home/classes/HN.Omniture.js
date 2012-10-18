HN.Omniture = new function () { 
    var self = this;
    var omnitureData = {};
    var functionQueue = [];
    var timeOut = 500;
    var funcQueueInterval = null;
    var variablePattern = /\{([^\}]*)\}/g;
    
    
    this.wrapFunction = function(fn, context, params) {
        return function() {
            fn.apply(context, params);
        };
    }
    
    this.setOmnitureData = function(id, props) {
        omnitureData[id] = props;
    }
    
    this.stripDelimiters = function (matchedTemplateVariable) {
        return matchedTemplateVariable.substring(1, matchedTemplateVariable.length - 1);
    }
    
    this.parseStringTemplate = function (template, data) {
        
        var matches = template.match(variablePattern);
        var key;
        
        if (matches) for (var i = 0; i < matches.length; i++) {
          key = HN.Omniture.stripDelimiters(matches[i]);
          template = template.replace(matches[i], data[key] || '');
        }
        
        //console.log(template);
        return template;
    }
    
    this.setQueueInterval = function() {
        funcQueueInterval  = window.setInterval(function() { 
            window.clearInterval(funcQueueInterval);
            funcQueueInterval = null;
                        
            if(functionQueue.length > 0)
                (functionQueue.shift())();
            
            
            if(functionQueue.length > 0) {
                HN.Omniture.setQueueInterval();
            }
            
        }, timeOut);
    }
    
    this.track = function(id, replace, url, target) {
        
        
        
        var func = HN.Omniture.wrapFunction(HN.Omniture.go, self, [id, replace, 'track']);
        functionQueue.push(func);
        
        if(url != undefined) {
            var redirectFunc = HN.Omniture.wrapFunction(HN.Omniture.redirect, self, [url, target]);
            functionQueue.push(redirectFunc);
        }
        
        if(!funcQueueInterval) {
            HN.Omniture.setQueueInterval();
        }
    }

    
    this.trackLink = function(id, replace, url, target) {
    
        
        
        var func = HN.Omniture.wrapFunction(HN.Omniture.go, self, [id, replace, 'trackLink']);
        functionQueue.push(func);
        
        if(url != undefined) {
            var redirectFunc = HN.Omniture.wrapFunction(HN.Omniture.redirect, self, [url, target]);
            functionQueue.push(redirectFunc);
        }
        

        if(!funcQueueInterval) {
            HN.Omniture.setQueueInterval();
        }
        
    }
    
        
    this.redirect = function(url, target) {
        window.setTimeout(function() {
            if(target != '') {
                window.open(url, target);
            } else {
                window.location.href = url;
            }
        }, timeOut);
        
    }
    
    this.go = function(id, replace, type) {
        
        
        
        var o = HN.Omniture.createProps(id, replace);
        
        for (var key in o) {
            var val = o[key];
            if(val != "") {
                s[key] = val;
            } else {
                s[key] = null;
            }
        }
        
        if(o['events'] == null || o['events'] == undefined) {
            s['events'] = null;
        }
        if(o['linkTrackEvents'] == null || o['linkTrackEvents'] == undefined) {
            s['linkTrackEvents'] = null;
        }
        if(o['products'] == null || o['products'] == undefined) {
            s['products'] = null;
        }
        if(o['linkTrackVars'] == null || o['linkTrackVars'] == undefined) {
            s['linkTrackVars'] = null;
        }
        if(o['pageName'] == null || o['pageName'] == undefined) {
            s['pageName'] = null;
        }
        if(o['channel'] == null || o['channel'] == undefined) {
            s['channel'] = null;
        }
        
        
        if(type == 'track') {
            if(typeof(s.t) == 'function') {
                s.t();
            }
                
        }
        else {
            if(typeof(s.tl) == 'function')
               s.tl(this,'o',s.pageName);	
        }
                
        
        
            
        
        
    }
    
    this.createProps = function(id, replace) {
        var c = omnitureData[id];
        var o = {};
        
        o.pageName = c.pageName?c.pageName:"";
        o.channel = c.channel?c.channel:"";
        o.pageURL = c.pageURL?c.pageURL:"";
	    o.events = c.events?c.events:"";
        o.products = c.products?c.products:"";
        
        for(var i = 1; i<=50; i++){
			o['prop'+i]=null;
			o['eVar'+i]=null;			
		}
	   
	    if(c.props) {
	        for(var p in c.props) {
	            o[p] = c.props[p];
	        }
	    }
	    
	    if(c.eVars) {
	        for(var e in c.eVars) {
	            o[e] = c.eVars[e];
	        }
	    }
	    
		o.linkTrackVars = c.linkTrackVars?c.linkTrackVars:"";
		o.linkTrackEvents = c.linkTrackEvents?c.linkTrackEvents:"";
		
		if(replace) {
		    
		    for(var a in o) {
	            if(o[a] != null)
	                o[a] = HN.Omniture.parseStringTemplate(o[a], replace);
            }
		        
		        
		}
		
		return o;
		
		
        
    }
    
}