(function() {
    var rp=parseFloat("100"),r=Math.random()*10000,s_id="DL_987902_182_991532",w=window,d=document;
    
    var swid = "";
    if ('' != "") {
    	var tags = document.getElementsByTagName('script');
		for (var i = 0; i < tags.length; i++) {
		    if (tags[i].src && tags[i].src.indexOf("http://amch.questionmarket.com/adsc/d987902/182/991532/randm.js") == 0) {
				var pattern = /=([^& ]*)(&|$)/;
				var match = pattern.exec(tags[i].src);
				if (match) {
				    swid = match[1];
				} else {
					swid = 'None';
				}
				break;
		    }
		}
		swid = "&=" + swid;
    }

    function z() {
        var s, i=(w==top),u;
        if (!d.body) {
            setTimeout(z, 100);
            return;
        }
        if (!i) {
            try {
                s=top.document.body;
                i=true;
            } catch(x) {}
			
			try {
				if (window['$WLXRmAd'] || (window.parent && window.parent['$WLXRmAd'])) {
					i=true;
				}
			} catch(x) {}
        }
        s=d.getElementById(s_id);
        if (!s) {
            s=d.createElement('script');
            u="http://amch.questionmarket.com/adsc/d987902/182/991532/decide.php?1";
            if (i) u += "&noiframe=1";
            if (swid) u += swid;
            s.src=u;
            s.id=s_id;
            d.body.insertBefore(s, d.body.firstChild);
        }
    }
    function t() {
    	if (0 == 1 && (1 == 0 || 1 == 2)) {
			z();	        
    	} else {
    		setTimeout(z, (4==4) ? 8000: Math.ceil(Math.random()*4)*500);
    	}
    }
    if (!isNaN(rp) && (r >= rp*100)) return;
    if (false || d.readyState=="complete" || w.inDapIF) {
        t();
    } else if (w.addEventListener) { // DOM
        w.addEventListener("load", t, false);
    } else if (w.attachEvent) { // IE 5+
        w.attachEvent("onload", t);
    }
})();

