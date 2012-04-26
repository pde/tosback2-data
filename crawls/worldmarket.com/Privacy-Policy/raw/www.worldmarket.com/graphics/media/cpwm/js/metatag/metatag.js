/// use URL 	<script type="text/javascript" src="/graphics/media/cpwm/js/metatag/metatag.js"></script>
 
/* GWO tag - page tracking */
/////////// DONT CHANGE BELOW //////////////

/* START add login messaging for WME */ 
if (location.href.indexOf('/checkout/index.jsp?process=login')>-1) {
	document.observe("dom:loaded", function () {
		$$('#processlogin table')[1].insert({after: '<div style="color: #ffffff; padding: 10px; width: 540px; margin-bottom: 20px;background:#312A52; font-size: 16px; font-family:sans-serif;">If you are trying to sign into your World Market Explorer profile, <a style="color: #D6DB01;" href="http://www.worldmarketexplorer.com">click here</a>.</div>' });
	/* END add login messaging for WME */ 
	});
}

//// Go through experiments and for the first URL match
//// fire the page track tag

if ( typeof(cpwm_gwo)=='object' && cpwm_gwo.experiments && cpwm_gwo.experiments.length>0 ) { 

for (var i=0; i<cpwm_gwo.experiments.length; i++) {
// use first match
	if (location.pathname.indexOf(cpwm_gwo.experiments[i].url)==0 && cpwm_gwo.experiments[i].expid) {
		//////    ONE experiment per page!!
		var _gaq = _gaq || [];
/*
		if (location.search.indexOf('camp=')>-1) {
			_gaq.push(['gwo._setCampMediumKey', 'camp']);
		} else if (location.search.indexOf('cid=')>-1) {
			_gaq.push(['gwo._setCampMediumKey', 'cid']);
		} else if (location.search.indexOf('slcid=')>-1) {
			_gaq.push(['gwo._setCampMediumKey', 'slcid']);
		}
*/
		_gaq.push(['gwo._setAccount', cpwm_gwo.experiments[i].acct]);
		_gaq.push(['gwo._setDomainName', cpwm_gwo.experiments[i].dmn]); 
		_gaq.push(['gwo._trackPageview', '/'+cpwm_gwo.experiments[i].expid+'/test']);

		(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
		break;
	}
}

}
/* end GWO tag */


/* Omniture click tracking (custom link tracking) */
function _cpwm_track_custom_clicks(action, type) {
	var passCampCode = passCampCode||false;
	if (window.s && typeof(window.s)=="object") {
		var camp="";
		if (passCampCode) {
			var qargs = document.location.search.replace('?','').split('&');
		 	while (q = qargs.shift()) {
  				var q2 = q.split('=');
  				if (q2[0]=="camp")
	  				camp = q2[1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			}
		}
		window.s.linkTrackVars="prop1,prop2,prop3,prop4";
		window.s.linkTrackEvents="events1";
		window.s.events="events1";
		window.s.tl(true, ((type)?type:'o'), ((window.s.pageName)?window.s.pageName+":":"") + action+( (camp)?":"+camp:"" ));
	}
}
/* END Omniture click tracking (custom link tracking) */





var _trackPageAction = function() { return true; }

if(typeof com == "undefined") var com = new Object();
if(typeof com.cpwm == "undefined") com.cpwm = new Object();
	com.cpwm.errors = [];
if (typeof(com.cpwm.tags)=="undefined") {


com.cpwm.tags = function () {
	this.currPage = {
		host: document.location.hostname,
		pathname:  document.location.pathname,
		query: document.location.search.replace(/\?/, ""),
		anchor: document.location.hash,
		protocol: document.location.protocol
	}
	this.pages = [];
	this.viewtags = [];
	this.actiontags = [];
	this.debug = false;
}

com.cpwm.tags.prototype = {
// define object methods

	haveData: function () {
		if (this.pages && this.pages.length>0) {
			for (var i=0; i<this.pages.length; i++) {
				var p = this.pages[i];
				if ( p.url+p.tagtype == "" ) continue;

				var path = (p.url.indexOf('?')>-1) ? p.url.substr(0, p.url.indexOf('?')) : p.url;
				var query = (p.url.indexOf('?')>-1) ? p.url.substr(p.url.indexOf('?')+1) : "";

				var collection = ( typeof(p.actionname)=="undefined" || p.actionname=="" ) ? this.viewtags : this.actiontags;
				var querymatch = false;
				var pathmatch = false;
				if (p.pathexact) {
					if (path === this.currPage.pathname) pathmatch = true;
//					alert("path exact?"+path+" === "+this.currPage.pathname);
				} else {
					if (this.currPage.pathname.indexOf(path)>-1) pathmatch = true;
//					alert("path contained?"+path+" === "+this.currPage.pathname);
				}			   
				
				
				/// split query and page.query into arrays
				if (query!="") {
					var queryargs = query.split('&');
					var pqueryargs = this.currPage.query.split('&');
					// for each arg search > -1
					for (var j=0; j<queryargs.length; j++) {
//						alert("query? "+query+" === "+this.currPage.query);
						if (this.currPage.query.search('(^|&)'+queryargs[j]+'(&|$)')>-1) {
							querymatch = true;
						} else {
							querymatch = false;
						}
					}
				} else {
					querymatch = true;
				}				
				
				if (querymatch && p.queryexact && queryargs.length != pqueryargs.length)
					querymatch = false;
				
				if (querymatch && pathmatch) {
					if (p.prerunfunction) {
						try {
							p.prerunfunction();
						} catch (e) {
							com.cpwm.errors.push("Running prerunfunction \nfor "+p.name+":\n"+e);
						}
					}
					collection.push(p);
				}

		   }

			this.trackPageView();
			
		} else {
//		   alert('no pages')
		}
	},
	   trackPageAction: function (actionname) {
               if (this.actiontags.length>0) {
                       for (var i=0; i<this.actiontags.length; i++) {
                               if (actionname === this.actiontags[i].actionname)
					this.writeTag(this.actiontags[i]);
                       }
               }
		 	  
	   },
	   trackPageView: function () {
               if (this.viewtags.length>0) {
                       for (var i=0; i<this.viewtags.length; i++) {
                               this.writeTag(this.viewtags[i]);
                       }
               }
		 	  
	   },
	showAllTags: function () {
		var t=""; 
		for (i=0; i<this.pages.length; i++) {
			if(!this.pages[i].name) continue; 
			t+=this.pages[i].name+": "+this.pages[i].url+"\nsrc|type|cat: "+
				this.pages[i].src+"|"+this.pages[i].type+"|"+this.pages[i].cat+"\n\n";
		} 
		document.body.insert(
			new Element('div',{
					'id':'cpwmtagslist',
					'style':'position:absolute; top:100px; left: 100px;;padding: 10px;background: #eeeeee;text-align:left;z-Index: 10000'
					}).update(
						'<a style="display:block; float: right; font-weight: bold; font-family: verdana" href="javascript:$(\'cpwmtagslist\').remove()">Close</a><br/><textarea cols="90" rows="20">'+t+'</textarea>'
						)
		);
 	},
       writeTag: function (tag) {
			if (!tag || typeof(tag)!="object" ) {
				return;
			}
			/// emit tags
			//create the tag
			if (tag.customfunction) {
				try {
					tag.customfunction();
				} catch (e) {
					com.cpwm.errors.push("Running customfunction \nfor "+tag.name+":\n"+e);
				}
			}

			switch (tag.tagtype) {
				case "floodlight":
					var axel=Math.random()+"";
					var a=axel*10000000000000;
					var newIFrame=document.createElement('iframe');
					var src=this.currPage.protocol+"//fls.doubleclick.net/activityi;src="+tag.src+";type="+tag.type+";cat="+tag.cat+";"+
						((""+tag.customparams!="")?tag.customparams+";":"")+
						"ord="+a+"?";
					newIFrame.src=src;
					newIFrame.setStyle({visibility:'hidden'});
					newIFrame.width=1;
					newIFrame.height=1;
					newIFrame.frameborder=0;
					document.getElementsByTagName('body')[0].appendChild(newIFrame);
					break;
				case "spotlight":
					var axel=Math.random()+"";
					var a=axel*10000000000000;
					var newImg=document.createElement('img');
					var src=this.currPage.protocol+"//ad.doubleclick.net/activity;src="+tag.src+";type="+tag.type+";cat="+tag.cat+";"+
						((""+tag.customparams!="")?tag.customparams+";":"")+
						"ord="+a+"?";
					newImg.width=1;
					newImg.setStyle({visibility:'hidden'});
					newImg.height=1;
					newImg.src=src;
					break;
				case "iframe":
					var axel=Math.random()+"";
					var a=axel*10000000000000;
					var newIFrame=document.createElement('iframe');
					var src=this.currPage.protocol+tag.tagUrl;
					newIFrame.src=src;
					newIFrame.width=1;
					newIFrame.setStyle({visibility:'hidden'});
					newIFrame.height=1;
					newIFrame.frameborder=0;
					document.getElementsByTagName('body')[0].appendChild(newIFrame);
					break;
				case "pixel":
					var axel=Math.random()+"";
					var a=axel*10000000000000;
					var newImg=document.createElement('img');
					var src=this.currPage.protocol+tag.tagUrl;
					newImg.width=1;
					newImg.setStyle({visibility:'hidden'});
					newImg.height=1;
					newImg.src=src;
					break;
				case "html":
					var newDiv=document.createElement('div');
					newDiv.style.height = "0px";
					newDiv.style.width = "0px";
					newDiv.setStyle({visibility:'hidden'});
					newDiv.style.overflow = "hidden";
					document.getElementsByTagName('body')[0].appendChild(newDiv);					
					newDiv.innerHTML = tag.content;
					break;
				case "script":
					try{
						if (typeof(tag.content)=="function") tag.content();
					} catch (e) {
					}
					break;
			}

       }
}

//######## DEPENDS ON PROTOTYPE

document.observe("dom:loaded", function () {
	if (location.href.indexOf("catman1.remotetools.gsipartners.com")>-1 )
		return;

var datafile = '/graphics/media/cpwm/js/metatag/pagetags.json';
//var datafile = '/other/sven/meta-tag-test/pagetags.json';


if (typeof(Ajax)!=="undefined" && document.createElement && document.getElementById) {
	new Ajax.Request(datafile, {
	  asyncronous: false,
	  onFailure: function (reponse) {
		com.cpwm.errors.push( "Retrieveing \n"+datafile+"\n"+ response.status);
	        },
	  onSuccess: function(response) {
		_cpwm_tags = new com.cpwm.tags();
		try {
			_cpwm_tags.pages = eval(response.responseText);
		} catch (e) {
			com.cpwm.errors.push("Parsing JSON data\n"+e);
		}
		_cpwm_tags.haveData();
		_trackPageAction = function(n) {_cpwm_tags.trackPageAction(n);}
		_showAllTags = function(n) {_cpwm_tags.showAllTags();}
	        }
	});
} else {
	com.cpwm.errors.push("Ajax not defined? No prototype?");
}

});

}// run only if undef