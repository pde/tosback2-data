function trim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

function gup(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var results = new RegExp("[\\?&]"+name+"=([^&#]*)").exec(url);
	if( results == null ) return null;
	else return decodeURIComponent(results[1].replace(/\+/g," ")); 
}

function anMain() {
	try {

		var site = 131334;
		var cat = "";
		var kw = "";
		var url = window.location.href;
		var title = document.title;

		if (url != undefined && url != "") {
			cat = url.replace(/(http:\/\/)(www[.])([^.]*)[.](.*)/i,'$3');
			if(cat == url) {
				cat = url.replace(/(http:\/\/)([^.]*)[.](.*)/i,'$2');
				if((cat == url)||(cat == ".")) {
					cat = "";
				}				
			}	
			kw = gup("s", url);
			if (kw == null) {		
				if (title != undefined && title != "") {	
					var catRegex = new RegExp(cat,"ig");
					kw = title.replace(catRegex,"");
					kw = kw.replace(/[ ]?[|]?[ ]?bike exif/ig,"");
					kw = kw.replace(/[ ]?[|]?[ ]?cycle exif/ig,""); 
					kw = trim(kw);
						if(kw == "") {
							kw = "bike lovers";
						}
				}		
			}			
		}	
		
		var encRegExp = new RegExp("%[0-9A-Fa-f][0-9A-Fa-f]");
		if (!encRegExp.test(cat)) {
			cat = escape(cat);
		}
		if (!encRegExp.test(kw)) {
			kw = escape(kw);	
		}

		var siteref = "";
		if (document.referrer != "" && document.referrer.indexOf(window.location.hostname) == -1) {
		      siteref = ";siteref=" + escape(document.referrer);
		}
		
        document.write("<IFRAME WIDTH='1' HEIGHT='1' MARGINWIDTH='0' MARGINHEIGHT='0' HSPACE='0' VSPACE='0' FRAMEBORDER='0' SCROLLING='no' SRC='http://pbid.pro-market.net/engine?site="+ site +";size=1x1;category="+ cat +";kw="+ kw + siteref +";rnd=(" + new Date().getTime() + " )'></IFRAME>");
	}
	catch (e){
	}
}
anMain();