( function() {
    var trueName = '';
    for (var i = 0; i < 16; i++) {
	trueName += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    
    window[trueName] = {};
    var $ = window[trueName];
    $.f = function() {
	return {
	    init : function(target) {

		var theScripts = document.getElementsByTagName('SCRIPT');
		for (var i = 0; i < theScripts.length; i++) {
		    if (theScripts[i].src.match(target)) {

			$.params = {};
			if (theScripts[i].innerHTML) {
			    $.params = $.f.parseJson(theScripts[i].innerHTML);
			}
			if ($.params.err) {
			    return;
			}

			if (!$.f.rf)
			    {
				$.f.rf = [];
			    }
			var n = $.f.rf.length;
			var id = trueName + '.f.rf[' + n + ']';

			try
			    {
				var personality = $.params.mode || 'linkedin';
				var mothership = 'http://s3.amazonaws.com/infographics.fastcompany.com/share/';

					// default, iframe
					var iframe = document.createElement('IFRAME');
					iframe.style.width = '640px';
					iframe.style.height = '20px';
					iframe.style.border = '0';
					iframe.style.margin = '0';
					iframe.scrolling = 'no';
					//iframe.style.backgroundColor = '#f00';
					//    var s = ms+'r?u='+escape($.a.user);
					var shareParams = '?url='+encodeURIComponent(window.location)+'&title='+encodeURIComponent(document.title);
					if ($.params.via) {
					    shareParams = shareParams + '&via='+encodeURIComponent($.params.via);
					}

					iframe.src = mothership+personality+'.html'+shareParams;
					theScripts[i].parentNode.insertBefore(iframe, theScripts[i]);					
			    } 
			catch (e) {}
			
			theScripts[i].parentNode.removeChild(theScripts[i]);

			if (typeof $.params.run !== 'undefined') {
			    eval($.params.run);
			}

			break;
		    }
		}
	    },
	    removeScript : function(id) {
		var s = '';
		if (s = document.getElementById(id)) {
		    s.parentNode.removeChild(s);
		}
	    },
	    parseJson : function(json) {
		this.parseJson.data = json;
		if ( typeof json !== 'string') {
		    return {"err":"trying to parse a non-string JSON object"};
		}
		try {
		    var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
				      'Array,String,Math,RegExp,Image,ActiveXObject;',
				      'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function') , ');'].join(''));
       return f();
    } catch (e) {
     return {"err":"trouble parsing JSON object"};
    }
   }
  };
 }();
 var thisScript = /fcshares.js/;
 if (typeof window.addEventListener !== 'undefined') {
  window.addEventListener('load', function() { $.f.init(thisScript); }, false);
 } else if (typeof window.attachEvent !== 'undefined') {
  window.attachEvent('onload', function() { $.f.init(thisScript); });
 }
})();