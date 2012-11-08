//LIVE
(function($) { 
    $.ad = {
		_tile: 0,
		ord: Math.floor(999999999*Math.random()),
		_meta: {},
		_data: {},
		dc: {
	        _svr: "http://ad.doubleclick.net",
			_collSvr:"http://a.collective-media.net",
			_method: "adj",
			_url: "",
			_kw: "",
			_meta: "",
			_reg: "",
			_adv: "",
			_ref: "",
			_sid: "",
			_fmt: "",
			_u: [],
			_pageAdsObj: {},
			tile: function() {
				return ++$.ad._tile;
			},
		    tag: function(data, tile, id, divElm) {
		    	var ie  ='\v'=='v';var b1='',b2='';if(ie){b1=String.fromCharCode(60,98,111,100,121,62);b2=String.fromCharCode(60,47,98,111,100,121,62);}
				var hub = (data.dc.hub)?";hub="+data.dc.hub:"";
				var pageid = "";//";pageid=" + data.pageid
				var cus = "";//";" + data.site + "=ad"
			
				var idd = id.split('-');
				
				// size dimensions
				var szs = idd[1].split('_').reverse(), nw = 0, nh = 0, sz = '';
				for (var i=0;i<szs.length;i++) {
					sz = szs[i].split('x');
					nw = sz[0]/1>nw?sz[0]/1:nw;
					nh = sz[1]/1>nh?sz[1]/1:nh;
				}
				
				// IAB
				var self = this, tag, tagSvr, tagStr;
				var setAdObj = function(info) {
					info.id = id;
					info.data = data;
					info.dim = [nw,nh];
					self._pageAdsObj[id] = info;
				};
				
				var valJoin = function(arr) {
					// remove empty string items
					var ret = [];
					for (var x = 0; x < arr.length; x++) {
						var item = $.trim(arr[x]);
						if (item.length > 0) { ret.push(item); } 
					}
					
					return (ret.join(";"));
				};
				
				//chuck norris was here
				if($('meta[name="dc.identifier"]').attr("content") == "urn:uuid:1f5745b035869310VgnVCM100000d7c1a8c0RCRD"){
					data.dc.site = "fnc.entertainment/faithfamfreedom";		
				};				
				
				//Collective Calls
				if(szs.indexOf("728x90") > -1 || szs.indexOf("300x250") > -1 || szs.indexOf("300x100") > -1){
					tagSvr = this._collSvr + "/" + this._method + "/" + data.dc.site + ";";
					
						tagStr = valJoin([ 
							this.dcopt(tile), "cmn=fn", "comp=" + this.adv(window.location, true),
							"pos=" + idd[0], "ctype=" + $.ad.meta().ctype, "ptype=" + data.ptype + this.c() + this.fmt(true) + pageid,
							"url=" + this.url(window.location.pathname) + this.kw(window.location, true) + this.ref(true) + cus,
							this.sid(true) + this.reginfo(), "sz=" + idd[1].replace(/_/g,",").replace("300x100","300x251,300x100"), "tile=" + tile + this.u(data, id) + "|",
							"ord=" + $.ad.ord + "?"
						]);
						
					tag = tagSvr + tagStr;
					setAdObj({ server:tagSvr, tagStr:tagStr });
					
				//Doubleclick Calls	
				} else {
					tagSvr = this._svr + "/" + this._method + "/" + data.dc.site + ";";
					
					tagStr = valJoin([
						this.dcopt(tile), "comp=" + this.adv(window.location, true),
						"pos=" + idd[0], "ctype=" + $.ad.meta().ctype, "ptype=" + data.ptype + this.c() + this.fmt(true) + pageid, 
						"url=" + this.url(window.location.pathname) + this.kw(window.location, true) + this.ref(true) + cus,
						this.sid(true) + this.reginfo(), "sz=" + idd[1].replace(/_/g,","), "tile=" + tile + this.u(data, id) + "|",
						"ord=" + $.ad.ord + "?"
					]);
					
					tag = tagSvr + tagStr;
					setAdObj({ server:tagSvr, tagStr:tagStr });
				}
				
				if ($.ad.util.iframe.isFIF()) {
					return id; // just return the id
				} else {
					return (this._method=='adj')?b1+"<scr" + "ipt type=\"text/javascript\">window.onload = function(){parent.jQuery.ad.util.iframe.resize('ifr-"+id+"', document.body.scrollWidth, document.body.scrollHeight);};</scr" + "ipt>"+"<scr" + "ipt src=\"" + tag + "\" type=\"text/javascript\"></scr" + "ipt><style type=\"text/css\">body{margin:0;}img{border:none;}</style>"+b2:tag;
				}
			},
			inline: function(id) {
				var d = $.ad.meta();
				$.ad.pre();
				if (window.sid != undefined && $.ad.util.cookie('surround') != "") {
					$.ad.util.cookie('surround', window.sid, {path: '/'});
				}
	
				var ie='\v'=='v';
				$.ad.render = function(d) {
					$('#'+id).removeClass("dc");
					var tile = $.ad.dc.tile();
					var t = $.ad.dc.tag(d, tile, id);
					var s = (168+id.length);
					var l = t.length;
					if(ie){s=s+6;l=t.length-7;}
					document.write(t.substring(s,l));
				}
	
				var col = "";
				if (d.ptype==="column"||d.ctype==="column"){var col = "-" + d.channel.split('/').slice(-1)[0].replace("-","");}
					
				var url = "http://ads.foxnews.com/api/"+$.ad.util.enc(d.channel)+"-"+d.ptype.toLowerCase()+col+"-data_inline.js";
				if(window.isBeta){
					var url = "http://beta.ads.foxnews.com/api/"+$.ad.util.enc(d.channel)+"-"+d.ptype.toLowerCase()+col+"-data_inline.js";
				}			
			
				document.write("<scr"+"ipt src=\""+url+"\"></scr"+"ipt>");
			},
			url: function(u) {
		        if (this._url=="") {
					this._url = u.substr(1).split("/").join("_").split(".")[0].replace(/[^a-z0-9_-]/g,'');
				}
				return this._url;
			},
			dcopt: function(t) {
				return (t==1) ? 'dcopt=ist':'';
			},
		    fmt: function(l) {
		        var p = "format=";
				if (this._fmt==="" && this._fmt!=="-") {
		        	this._fmt = $.ad.meta().raw.originalPlatform||'-';
				}
				if (this._fmt==="-" || !this._fmt) {return "";}
				return (l) ? (p+this._fmt):this._fmt;
			},
		    kw: function(u, l) {
		        var p = "kw=";
				if (this._kw==="" && this._kw!=="-") {
		        	this._kw = $.ad.util.param(u, 'q')||$.ad.util.param(u, 'searchString')||'-';
				}
				if (this._kw==="-" || !this._kw) {return "";}
				return (l) ? (p+this._kw):this._kw;
			},
			meta: function(n,m) {
				if (this._meta==""&&this._meta!="-") {
					var keys = '';
			        var t = document.getElementsByTagName('meta');
			        for(var i=0;i<t.length;i++){
			            if(t[i].name == 'keywords'){
			                keys = t[i].content;
			                break;
			            }
			        }
			        //this._meta = keys==''?'-':keys.split(',').slice(0,n).join(',').replace(/ *, */g,",").replace(/ /g,"-").replace(/[^a-z,-]/g,"");
					if (keys=='') {
						this._meta = '-';
					} else {
			        	if (m=='full') {
							this._meta = keys.split(',').slice(0,n).join(',').replace(/ *, */g,",").replace(/ /g,"-").replace(/[^a-z,-]/g,"");
						}
			       		if (m=='tags') {
							var karr = keys.split(',').slice(0,n);
							var len = karr.length;
							var x = '', k = '';
							for (var t=0;t<len;t++) {
								x = karr[t].replace(/^ /g,"").toLowerCase().replace(/ /g,"-").replace(/[^a-z-]/g,"");
		        				k += ";m"+(t+1)+"="+x;
							}
							this._meta = k;
						}
					}
				}
				if (this._meta=="-") {return "";}
				return this._meta;
			},
			reginfo: function() {
		        //r8=c&r7=c&r6=m&r5=e&r4=c&r3=a&r2=11235&r1=&
				if (this._reg==="" && this._reg!=="-") {
					var pad = $.ad.util.cookie("p_AD");
					this._reg = (pad)?';'+pad.substring(0,pad.length-1)+"united_states".replace(/&/g,";"):'-';
				}
				if (this._reg==="-" || !this._reg) { return ""; }
				return this._reg;
			},
			sid: function(l) {
				var p = "sid=";
				if (this._sid==="" && this._sid!=="-") {
					this._sid = $.ad.util.cookie('surround') || '-';
				}
				if (this._sid==="-" || !this._sid) { return ""; }
				return l?p+this._sid:this._sid;
			},
		    adv: function(u, l) {
		        var p = ";adv=";
				if (this._adv==="" && this._adv!=="-") {
		        	this._adv = $.ad.util.param(u, 'test')||$.ad.util.param(u, 'intcmp')||$.ad.util.param(u, 'adv')||'-';
				}
				if (this._adv==="-" || !this._adv) {return "";}
				return l?p+this._adv:this._adv;
			},
			ref: function(l) {
		        var p = ";ref=";
				if (this._ref==""&&this._ref!="-") {
					var ref_map = {
						"google": "q",
						"bing":   "q",
						"yahoo":  "p",
						"ask":    "q",
						"aol":    "query"
					};
					var dr = document.referrer;
					if (dr) {
						var ref = dr.split('/')[2].split('.');
						ref = ref[ref.length-2];
						var q = ref_map[ref];
						if (q!=undefined) {
				        	this._ref = ref+':'+$.ad.util.param(dr, q)||'-';
						} else {
							this._ref = '-';
						}
					} else {
						this._ref = '-';
					}
				}
				if (this._ref=="-" || !this._ref) { return ""; }
				return l?p+this._ref:this._ref;
			},
			c: function(){
				var classification = $.ad.meta().classificationISA;
				if(classification == ""){return "";}
					var cArr = classification.split(", ");
				var c="";
				for(i=0; i < cArr.length ;i++){
					if(i == 0){c += ";";}
					c += "c=" + cArr[i];
					if(i != cArr.length-1){c+= ";"}
				}
				return c;
			},				
		    u: function(data, id) {
				var thisObj = this;
				//u=segs|sid|adv|topic/hub|col|ptype|pos|meta|cat|chan|pers|show|end|format|sec|test|stream|playlist|pname|r1|r2|r3|r4|r5|r6|r7|r8|bk|kw
				var s = ',';
				var idd = id.split('-')[0];
				var metainfo = thisObj.meta(5,'tags').replace(/;m[0-9]=/g,'|').substr(1).split('|');
				var i = 5;
				var meta = [];
				while (i--) {
					meta.push(metainfo[i]||"");
				}
				meta = meta.reverse().join('|');

				var reginfo = thisObj.reginfo(false);
				var reg = '';
				if (reginfo=='') {
					reg = "|||||||";
				} else {
					reg = "united_states"+reginfo.substring(0,reginfo.length-1).replace(/r[0-9]=/g,'').split("&").reverse().join("|");//+"||";
				}
				//undefined
				var cat  = "";
				var chan = "";
				var pers = "";
				var show = "";
				var end  = "";
				var fmat = "";
				var sec  = "";
				var test = "";
				var strm = "";
				var play = "";
				var pnam = "";
				
				
				
				
				if(typeof $.ad._meta["classification"] == "string"){
					var c = $.ad._meta["classificationISA"];
					c = c.replace(/[ ]/g,"");
					//u=ptype|adv|ctype|pos|url|classification 
					var a = [data.ptype,thisObj.adv(window.location, false),$.ad.meta().ctype,idd,$.ad.dc._url,escape(c)];
				}else{
					//u=ptype|adv|ctype|pos|url 
					var a = [data.ptype,thisObj.adv(window.location, false),$.ad.meta().ctype,idd,$.ad.dc._url];
				}	   
				   
			    var p = ";u=";
				
				thisObj._u[idd] = a.join('|');
		
				if(a.length == 5){thisObj._u[idd] += "|";}
						
				return p + this._u[idd];
			},
			quant: {
				get: function() {
					//FOX-10744
					if ($.ad.meta().ptype=="slideshow") {return "";}
		        	var p = "qc=";
					if ($.ad.dc._qc==""&&$.ad.dc._qc!="-") {
						if ($.ad.util.cookie('__qseg')) {
							var qcc = $.ad.util.cookie('__qseg').split('|');
							var len = qcc.length;
							var i = (len>=8)?8:len;
							if (len>0) {
								var qc_a = [];
								var qc_s = [];
								for (j=0;j<i;j++) {
									qc_a = qcc[j].split("_");
									if (qc_a.length>1) {
										qc_s.push(p + qc_a[1]);
									}
								}
								qc_s = qc_s.join(";");
								if (qc_s=="") { qc_s = "-"; }
								$.ad.dc._qc = qc_s;
							} else {
								$.ad.dc._qc = '-';
							}
						} else {
							$.ad.dc._qc = '-';
						}
					}
					if ($.ad.dc._qc=="-") {return "";}
					return $.ad.dc._qc;
				},
				pre: function() {
					//FOX-10744
					if ($.ad.meta().ptype=="slideshow") {return;}
					//listener pixel
					var _qoptions = window._qoptions={
						qacct:"p-ddEiIs2qFSY46"
					};
					$.ad.util.include("http://edge.quantserve.com/quant.js",1);
					
					$.ad.util.include("http://pixel.quantserve.com/seg/"+_qoptions.qacct+".js?ttl=86400",1);
				}
			},					
			init: function(data) {
				var meta = $.ad._meta, host = window.location.host;
				
				var isShow = function(elm) { // to accommodate more no-show conditions
					var show = true;
					// efix - FOX-17814
					if (meta.channel==="fnl/root" && meta.ctype==="root" && elm.attr("id")==="top-728x90") { show = false; }
					return show;
				};
				
				var friendlyIF = function(elm,id,ifr,tile) {
					if($.ad._meta.channel.indexOf("ureport") > -1){
						ifr.src = "http://" + location.hostname +"/foxstatic/all/html/ad-ifr.html?id="+id+"&ns=friendlyComm"; // UREPORT
					}else{	ifr.src = "/static/v/all/html/ad-ifr.html?id="+id+"&ns=friendlyComm"; } // PROD
					
					ifr.id = "ifr-" + id;
					elm.append(ifr);
					var adId = $.ad.dc.tag(data, tile, id, elm);
				};
				
				
				var adInject = function(elm,id){
			
					var showBetaAd = false;
					var mArr = location.search.match(/[\w]+=[\w]+/g);
					if(mArr){
						for(i=0;i < mArr.length;i++){
						    if(mArr[i].toLowerCase() == "adtest=true"){
				       			showBetaAd = true; 
								break;
						    }
						}
					}					
					
					if(!showBetaAd){
						if (typeof window.ISAManagementAds === "function") {
						    window.ISAManagementAds(elm,id);
						    return false;
						}					
					}
					
					if (isShow(elm)) {
						elm.empty();
						
						var ifr = $.ad.util.iframe.create(1, 1, id),
							tile = $.ad.dc.tile();
							
						if ($.ad.dc._method=="adi") { // inline
							elm.append(ifr);
							ifr.src=($.ad.dc.tag(data, tile, id, thisElm));
						} else if ($.ad.dc._method=="adj") { // js iframe insert
							if ($.ad.util.iframe.isFIF()) { // friendly
								friendlyIF(elm,id,ifr,tile);
							} else { // default
								elm.append(ifr);
								var doc;
								doc = $.ad.util.iframe.doc(ifr);
								doc.open();
								doc.write($.ad.dc.tag(data, tile, id, elm));
								$.ad.util.iframe.closeDoc(doc, 0);
							}
						}
					} 
				}
				
				$(".ad.dc:eq(0)").each(function(i){
					var elm = $(this), id = elm.attr("id");	
					adInject(elm,id);				
				})
				var t=setTimeout("afterInitialAd()",150)
				
				window.afterInitialAd = function (){ 
					$(".ad.dc").each(function(i){
						if(i != 0){
							var elm = $(this), id = elm.attr("id");
							adInject(elm,id);
						}
					});
				}
			},
			load: function() {
				$.ad.ord = Math.ceil(Math.random()*1000000000);					
				$.ad.dc.init($.ad._data);
			},
			pix: function(data) {
				if (typeof isie=="undefined" || !isie) {
					var id="pixel-1x1";
					var ifr = $.ad.util.iframe.create(1, 1, id);
					$('body').append(ifr);
					var tile = $.ad.dc.tile();
					var doc;
					doc = $.ad.util.iframe.doc(ifr);
					doc.open();
					doc.write($.ad.dc.tag(data, tile, id));
					$.ad.util.iframe.closeDoc(doc, 0);
				}
			}
	    },
	    qu: {
	        _svr: "ads.adsonar.com",
			_path: "http://js.adsonar.com/js/adsonar.js",
		    getSize: function(data, id) {
				data.qu = data.qu||[];
				var qu = data.qu[id]||{};			
				if (typeof qu.width=="undefined") { qu.width = 0; }
				if (typeof qu.height=="undefined") { qu.height = 0; }				
				return {width: qu.width, height: qu.height};
			},
		    tag: function(data, id) {
				data.qu = data.qu||[];
				var qu = data.qu[id]||{};
				if (qu.ps==undefined) { qu.ps = "-1"; }
		        var tag = "<style type=\"text/css\">html,body{border:0;margin:0;padding:0;}</style><scr" + "ipt type=\"text/javascript\">var adsonar_placementId="+qu.placeid+",adsonar_pid="+qu.pid+",adsonar_ps="+qu.ps+",adsonar_zw="+qu.width+" ,adsonar_rfu=\""+window.document.location+"\";adsonar_zh="+qu.height+",adsonar_jv=\""+$.ad.qu._svr+"\";</scr"+ "ipt>";//document.write(\"<iframe src='http://www.google.com'></iframe>\");
		        tag += "<scr" + "ipt src=\"" + $.ad.qu._path + "\" type=\"text/javascript\"></scr"+ "ipt>";
		        return tag;
			},
			init: function(data) {
				var root = this;
				$('.ad.qu').each(function(){
					var id=$(this).attr("id"); 
					
					if(	$.ad.adBlade.isAdBlade(id)){return;}

					if( id === "qu_channel_7"){return;}		
					
					if( $.ad._meta.channel.indexOf("fnc/politics") > -1){return;}
					
					var sz = $.ad.qu.getSize(data, id);
					var ifr = $.ad.util.iframe.create(sz.width, sz.height, id);
					$(this).append(ifr);
					var doc;
					doc = $.ad.util.iframe.doc(ifr);
					doc.open();
					doc.write($.ad.qu.tag(data, $(this).attr("id")));
					$.ad.util.iframe.closeDoc(doc, 0); 
						
				});
			}
	    },
		adBlade: {
			isAdBlade : function(qu_id) {
				return (qu_id == "qu_story_1" && $('meta[name="prism.section"]').attr("content") == "world") ? true : false;
			},
			init : function() {
				if( $('#qu_story_1').size() > 0 && $('meta[name="prism.section"]').attr("content") == "world" ){
					var ifr = $.ad.util.iframe.create(660, 250, "adBlader");
					ifr.src = "http://web.adblade.com/impsc.php?cid=1291-1494141695&output=html";
					$('#qu_story_1').append(ifr);
				}
			}
		},	    
		buzzFeed: {
			init: function(d){
				if(d.channel.indexOf("fnc/politics") > -1){
					
					$("body").append('<div id="BF_WIDGET_1"></div>');
					(function(){				
					    var script = document.createElement('script'); 
					    script.type = "text/javascript";
					    script.async = true;
					    script.id = "buzzFeed";
						script.src = "http://ct.buzzfeed.com/wd/UserWidget?u=foxnewspolitics&to=1&or=vb&wid=1&cb=" + (new Date()).getTime();
						setTimeout(function() { (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script) },1);
					}());
				}				
			}
		},		
		prsly: {
			pre: function(d){	
				
				if (d.channel.split("/")[0].toLowerCase()!=="fbn" && d.channel.indexOf("fnc/scitech") == -1) { return; }
				
				if($('#parsely-root').size() > 0 ){return;}
			
				var targetSections = "article|column|blog|video|slideshow";
				
				if (targetSections.indexOf(d.ctype.toLowerCase()) > -1 || targetSections.indexOf(d.ptype.toLowerCase()) > -1 ) {	this.insert(d);}
			},
			insert: function(d){

				var dps =  d.channel.indexOf("fnc/scitech") > -1 ? "foxnews.com" : "foxbusiness.com";
								
				$("body").append('<div id="parsely-root" style="display: none"><a id="parsely-cfg" data-parsely-site="'+ dps +'" href="http://parsely.com">Powered by the Parse.ly Publisher Platform (P3).</a></div>');

				(function(){				
				    var script = document.createElement('script'); 
				    script.type = "text/javascript";
				    script.async = true;
				    script.id = "parsely-script";

				    script.src = window.location.protocol +"//static.parsely.com/p.js";
				    $("#parsely-root").get(0).appendChild(script);
				}());				
			}
			
		},		
		niel: {
			pre: function(d) {
				var channel = typeof d != "undefined" ? d.raw.channel: $.ad._meta.raw.channel;
				var niel_map = {
					"fnc": "us-801796h",
					"fnl": "us-801796h",
					"fbn": "us-201978h",
					"fsb": "us-201978h"
				};
				var id = niel_map[channel];
				if (id!=undefined) {
					var im = new Image(1, 1);
					im.onerror = im.onload = function() {
						im.onerror = im.onload = null;
					};
					im.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=", id, "&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
				}
			}
		},
		goog: {
			adsense: {
				init: function(d){
					var root = this;
					return false; 
				},
				addGoogleObjFunc: function(){
					var w = window;
					w.google_num_ads = 0; window.google_last_ad_type = '';

					w.google_ad_request_done = function(google_ads) { 
						var s;

						if (google_ads.length == 0) return;

						google_num_ads += google_ads.length; 
						google_last_ad_type = google_ads[0].type;

						s = '<div class="gadsense"><div class="encap"><a class="ad_attribution" href="'+ google_info.feedback_url+'">Ads by Google</a><br>';

						if (google_ads[0].type == "image") { 
							s += '<a href="' + google_ads[0].url +
							'" target="_top" title="go to ' + google_ads[0].visible_url +
							'"><img border="0" src="' + google_ads[0].image_url +
							'"width="' + google_ads[0].image_width + '"height="' + google_ads[0].image_height +
							'"></a>'; 
						}
						else if (google_ads[0].type == "flash") { s += '<object	classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + 
							' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' + 
							' WIDTH="' + google_ad.image_width +
							'" HEIGHT="' + google_ad.image_height + '">'+
							'<PARAM NAME="movie" VALUE="' + google_ad.image_url + '">' +
							'<PARAM NAME="quality" VALUE="high">' +
							'<PARAM NAME="AllowScriptAccess" VALUE="never">' +
							'<EMBED src="' + google_ad.image_url + '" WIDTH="' + google_ad.image_width + '" HEIGHT="' + google_ad.image_height + '" TYPE="application/x-shockwave-flash"' + ' AllowScriptAccess="never" ' +
							' PLUGINSPAGE="http://www.macromedia.com/go/ getflashplayer"></EMBED></OBJECT>';
							}
						else if (google_ads[0].type == "html") { s += google_ads[0].snippet;}
						else if (google_ads[0].type == "text") {
							if (google_ads.length == 1) { ad_title_class = 'ad_title_large'; ad_text_class = 'ad_text_large'; ad_url_class = 'ad_url_large';
							} 
							else { ad_title_class = 'ad_title'; ad_text_class = 'ad_text'; ad_url_class = 'ad_url';}

							for(var i=0; i < google_ads.length; i++) {
								s += '<div><a class="'+ ad_title_class + '" href="'+ google_ads[i].url + '" >' +
								google_ads[i].line1 + '</a><span class="' + ad_text_class + '">' + google_ads[i].line2  + google_ads[i].line3 + '</span>' +
								'<a class="' + ad_url_class + '" href="' +
								google_ads[i].url + '" >' + google_ads[i].visible_url + '</a></div>';
							}
						}
						s += "</div></div>";
						document.write(s);
						return;
					}									
					
				},					
				config: function(qObj){
					d = $.ad.meta();
					var section = d.raw.section;	
					var atype = " article";
				
					var isSectionFront = (d.raw.genre === "homePage" && d.raw.type === "Collection") ? true:false;
					if(isSectionFront){
						atype = " front";
					}				

					var getClientId = function(){	
						var lookUp = {"fnc": "ca-fox-news", "fbn": "ca-fox-business", "sbc": "ca-fox-business", "fnl": "ca-fox-news-latino"};
						for(x in lookUp){
							if(d.raw.channel.indexOf(x) > -1){ return lookUp[x];}
						}
					}					
					
					var obj = {
						google_ad_client: getClientId(), // client id
						google_ad_channel: d.raw.section + atype + " " +qObj.qid,
						google_language: 'en', 					
						google_ad_width: '300', // width of iframe 
						google_ad_height: '250', // height of iframe 
						google_ad_format: '300x250_pas_abgc', // html template to fill iframe
						google_ad_type: 'text', // ad type
						google_alternate_ad_url : '', 
						google_alternate_color : '00FFFF', 
						google_color_bg : 'FFFFFF', // the ads' background color 
						google_color_border : 'CCCCCC', //ad border
						google_color_line : '00ff00', // the line surrounding 
						google_color_link : '183A52', // the ad link color
						google_color_text : '000000', // the ad text color
						google_color_url : "999999",
						google_encoding : 'utf8', 
						google_safe : 'high', 
						google_adtest : 'off',
						google_alternate_ad_url : 'http://s0.2mdn.net/1635909/1x1image.jpg', 						
						google_ad_section : 'default'
					}

					if(qObj.qid == "story_1" || qObj.qid == "story_3"){ 
						obj.google_ad_width = '660'; // width of iframe 
						obj.google_ad_height = '250'; // height of iframe 
						obj.google_ad_format = '660x250_pas_abgc'; // html template to fill iframe							
						obj.google_ad_output = 'js'; 
						obj.google_max_num_ads = '3';
					}
					
					for (var i in obj) {
						window[i] = obj[i];
					}
					window.A_INFO = obj; //just for troubleshooting
								
				},
				embed: function(obj) {
					var root = this;

					if($("meta[name='prism.section']").attr("content") != "politics" && obj.qid == "channel_7" ){
						root.addGoogleObjFunc();
						root.config(obj);				
					document.write('<scr'+'ipt type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></scr'+'ipt>');
						
				}			
				}				
			},
			pre: function(){}
		},
		omni: {
			pre: function(d) {
				var s_account = "foxnewsexception";
				var path = d.raw.channel+"/"+d.raw.section;
				
				var omniture_rsid_map = {
					"fnc/imag": "foxnewsimagprod",
					"fnc/nation": "foxnewsfoxnation",
					"fnc/radio": "foxnewsradio",
					"fnc/insider": "foxnewsinsiderprod",
					"fnc/junior-reporters": "foxnewsjuniorreporters",
					"fnc/magazine": "foxnewsmagazine",					
					"fnc/.+": "foxnews",
					"fnl/.+": "foxnewsfoxlatino",
					"fsb/.+": "foxnewssmallbusinesscenter",
					"fbn/.+": "foxnewsbusinessprod"
				};
				
				if(window.isBeta){
					var omniture_rsid_map = {
						"fnc/imag": "foxnewsimagstaging",
						"fnc/nation": "foxnewsfoxnationstaging",
						"fnc/radio": "foxnewsradiostaging",
						"fnc/insider": "foxnewsinsiderstaging",
						"fnc/junior-reporters": "foxnewsjuniorreportersstaging",	
						"fnc/magazine": "foxnewsmagazinestaging",
						"fnc/.+": "foxnewsstaging",
						"fnl/.+": "foxnewsfoxlatinostaging",
						"fsb/.+": "foxnewssmallbusinesscenterstaging",
						"fbn/.+": "foxnewsbusinessstaging"
					};
				}
	
				s_account = (function(o,p) {
					for (var i in o) {
						if (p.match(new RegExp(i))) {
							return omniture_rsid_map[i];
						}
					}
				})(omniture_rsid_map,path)||s_account;
				window.s_account = s_account;

				if(window.isBeta){
					$.ad.util.include("http://beta.ads.foxnews.com/js/omtr_code.js",1);				
				}else{
					$.ad.util.include("http://ads.foxnews.com/js/omtr_code.js",1);						
				}
							
			},
			init: function(d) {

				//fbn news exception		
				if(d.channel.indexOf("fbn/news/") > -1){
				    
				    var arr = d.channel.split("/");
				    arr.splice(1,1);
				    
				    d.channel = arr.join("/");
				    d.raw.section = arr[1];
				    
				    var x, sub = arr.slice(2) || [];
				    
				    for (x = 0; x < 4; x++) {
				        var v = (sub[x]) ? sub[x] : "";
				        d.raw["subsection"+(x+1)] = v;
				    }
				    
				    for (x = 0; x < sub.length; x++) {
				        d.raw["subsection"+(x+1)] = sub[x];
				    }
				}

				if(d.channel.indexOf("fnc/leisure/auto") > -1){
					d.channel = d.channel.replace("leisure/","")
					
					if(d.raw.subsection2.length > 0){
						d.raw.section = d.raw.subsection1;
						d.raw.subsection1 = d.raw.subsection2;
						d.raw.subsection2 = "";
					}else if(d.raw.subsection1.length > 0){
						d.raw.section = d.raw.subsection1;
						d.raw.subsection1 = "";
						d.raw.subsection2 = "";						
					}
				}
				
				var omtr = window.omtr;
				var hier = [d.raw.channel, d.raw.section, d.raw.subsection1, d.raw.subsection2, d.raw.subsection3, d.raw.subsection4];
				
				var channel = clean(0,6,':') || 'undefined';
				
				omtr.pageName = channel+':'+d.ctype+':'+d.ptype;
				omtr.channel = d.raw.section;
				omtr.server = ""; /////////////////////////////////////////////////////////////////////////////////////////////
				omtr.prop1 = d.raw.section;
				omtr.prop2 = clean(1,3,'/');
				omtr.prop3 = clean(1,4,'/');
				omtr.prop4 = clean(1,5,'/');
				
				//auto:
				omtr.prop5 = "";
				omtr.prop6 = "";
				omtr.prop7 = "";
				omtr.prop8 = "";

				if(typeof EZDATA != "undefined"){
					omtr.prop9 = EZDATA.core.query;
				}
				
				//////////////////////// add other detail ptypes //////////////////////////
				var omniture_c_map = {
					"article": "",
					"bio": "",
					"column": "",
					"post": "",
					"slideshow": "",
					"story": "",
					"transcript": ""
				};
				if (d.ptype in omniture_c_map) {
					var def = "N/A";
					
					omtr.prop11 = (function(){
						var ret = def;
						if (typeof d.pageid==="string") {
							ret = d.pageid.split(':');
							ret = (ret[2]) ? ret[2] : def;
						}
						return ret;
					}());
					
					omtr.prop13 = d.ptype||def;
					omtr.prop14 = d.raw.creator||def;
					omtr.prop15 = d.raw.source||def;
					omtr.prop16 = d.raw.subsection4||d.raw.subsection3||d.raw.subsection2||d.raw.subsection1||d.raw.section||def;
				} else {
					omtr.prop11 = "";
					omtr.prop13 = "";
					omtr.prop14 = "";
					omtr.prop15 = "";
					omtr.prop16 = "";
				}

				omtr.prop12 = "N/A";
				if(typeof d.raw.title != "undefined" ){
					omtr.prop12 = d.raw.title;
				}else if ($("meta[property='og\:title']").size() > 0){
					omtr.prop12 = $("meta[property='og\:title']").attr("content");
				}

				if(d.raw.genre == "interactiveContent"){
					omtr.prop13 = "interactive";
				}				
									
				
				if (typeof $.ad._meta.language != "undefined") {
					var lang = $.ad._meta.language;
					omtr.prop19 = lang;
					omtr.eVar19 = lang;
				}
				
				//auto:
				omtr.prop22 = "";
				omtr.prop23 = "";
				omtr.prop24 = "";
				omtr.prop25 = "";
				omtr.prop26 = "";
				omtr.prop27 = "";
				omtr.prop41 = "";
				omtr.prop42 = "";
				
				if (d.ptype=='slideshow') {
					omtr.prop49 = d.raw.title;
					omtr.eVar50 = $.ad.util.param(window.location.href, 'slide');
				}
				
				if(typeof $.ad._meta["classification"] != "undefined"){
					var classVal = $.ad._meta["classification"];
					var colVal = $.ad._meta["column"];
					if(colVal){
							omtr.prop53 = omtr.eVar53 = colVal;
					}else{
						omtr.prop53 = omtr.eVar53 = classVal;
					}
				}				

				if(d.mDate){ 
					omtr.prop54 = omtr.eVar54 = d.mDate; 
					window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar16,events";window.omtr.linkTrackEvents="event42";window.omtr.events="event42";
				}				
				
				//nation grid/list view tracking			
				if($.ad._meta.channel.indexOf('fnc/nation') > -1){
					if($('.view-util').size() > 0){
						if(typeof $.cookie == "function" && $.cookie('nation_view_prefs')){
							omtr.prop55 = omtr.eVar55 = $.cookie('nation_view_prefs'); 
						}
						else(omtr.prop55 = omtr.eVar55 = "grid");
					}
				}				
				
				omtr.hier1 = clean(0,6,',');
				
				//auto:
				omtr.hier2 = "";
				omtr.hier3 = "";
				
				//event1
				//event26
				
				function clean(a,b,d) {
					var r = new RegExp(d+"+", "g");
					var s = hier.slice(a,b).join(d).replace(r, d);
					if (s.substr(s.length-1,s.length-1)==d) {
						s = s.substr(0,s.length-1);
					}
					return s;
				}
				/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
				//window.s = omtr;
				//window.s.t();
				if($.ad._meta.ptype == "slideshow"){window.omtr.events="event26"};
				omtr.t();
			},
			load: function(d) {
				var omtr = window.omtr;
				if (d!=undefined) {
					for (key in d) {
						var f = $.ad.omni.map[key];
						if (d.hasOwnProperty(key)&&f!=undefined) {
							//omtr[f]=d[key];
							f(d[key]);
						}
					}
				}else{omtr.t();}
			},
			map: {
				//Janrain
				"network-share-success": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar29,eVar30,events";window.omtr.linkTrackEvents="event47";window.omtr.events="event47"; window.omtr.eVar29="D=c29";omtr.tl();},
				"email-share-success": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar29,eVar30,events";window.omtr.linkTrackEvents="event48";window.omtr.events="event48";window.omtr.eVar29="D=c29";omtr.tl();},
				"network-share-start": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar29,eVar30,events";window.omtr.linkTrackEvents="event6";window.omtr.events="event6";window.omtr.eVar29="D=c29";omtr.tl();},
				"email-share-start": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar29,eVar30,events";window.omtr.linkTrackEvents="event51";window.omtr.events="event51";window.omtr.eVar29="D=c29";omtr.tl();},
				"registration-complete": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar21";window.omtr.linkTrackEvents="event50";window.omtr.events="event50";window.omtr.tl('','o', "registration success");},
				"registration-start": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar21";window.omtr.linkTrackEvents="event7";window.omtr.events="event7";window.omtr.tl('','o', "registration start");},
				"logins": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar21";window.omtr.linkTrackEvents="event8";window.omtr.events="event8";window.omtr.tl('','o', "login");},
				"profile-updates": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar21";window.omtr.linkTrackEvents="event48";window.omtr.events="event48";window.omtr.tl('','o','profile update');},
				"comment-post": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar16,events";window.omtr.linkTrackEvents="event21";},
				"fb-share": function(obj){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,prop29,eVar29,events";window.omtr.linkTrackEvents="event6";window.omtr.events="event6";window.omtr.prop29 ='network share';window.omtr.eVar29="D=c29";omtr.tl();},
				"twttr-follow": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event42";window.omtr.events="event42";window.omtr.tl('','o','follow');},
				
				"slide": function(obj){
					window.omtr.events="event26";
					if (typeof obj == "object") {
						window.omtr.eVar50 = obj.s["slide-number"];
						window.omtr.eVar36 = window.omtr.eVar37 = window.omtr.eVar38 = "";
						if (obj.s["slide-event"] == "Slideshow Arrow Click") {window.omtr.eVar36 = "Slideshow Arrow Click";window.omtr.tl('','o','slideshow-arrow-click');window.omtr.events="event26";}
						if (obj.s["slide-event"] == "Slideshow Thumbnail Click") {window.omtr.eVar37 = "Slideshow Thumbnail Click";window.omtr.tl('','o','slideshow-thumbnail-click');window.omtr.events="event26";}
						if (obj.s["slide-event"] == "Slideshow Image Click") {window.omtr.eVar38 = "Slideshow Image Click";window.omtr.tl('','o','slideshow-image-click');window.omtr.events="event26";}
					}
					else{window.omtr.eVar50=obj;omtr.t();}					
				},
				"facebook": function(obj){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event41";window.omtr.events="event41";omtr.t();},				
				"comment": function(obj){
					if(obj.post){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar16,events";window.omtr.linkTrackEvents="event21";window.omtr.events="event21";omtr.t();}
					if(obj.open){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar16,events";window.omtr.linkTrackEvents="event25";window.omtr.events="event25";omtr.t();}
					if(obj.load){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,eVar16,events";window.omtr.linkTrackEvents="event39";window.omtr.events="event39";omtr.t();}					
				},	
				"externalLinks":function(obj){window.prop6 = "exit: extlink|" + obj.url; window.omtr.linkTrackVars = "prop5,prop6,prop7,prop8";window.omtr.events = ""; window.omtr.tl('http://foxnews.com','e',obj.url);},
				"registration": function(obj){window.omtr.prop21 = obj.userid; window.omtr.eVar21 = obj.userid; window.omtr.linkTrackEvents="event7";window.omtr.events="event7";window.omtr.tl('','o','registration');},				
				"login": function(obj){window.omtr.prop21 = obj.userid; window.omtr.eVar21 = obj.userid; window.omtr.linkTrackEvents="event8";window.omtr.events="event8";window.omtr.tl('','o','login');},	
				"link-track": function(obj){window.omtr.prop8 = obj["link-location"] + "_" + obj.section + "_" + obj.url; omtr.tl(obj.url,"o", obj["link-location"] + "_" + obj.section + "_" + obj.url); window.omtr.events="";},			
				"share": function(obj){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,prop29,eVar29,events";window.omtr.linkTrackEvents="event6";window.omtr.events="event6";window.omtr.prop29 ='network share';window.omtr.eVar29="D=c29";omtr.t();},																					
				"newsletter": function(obj){window.omtr.linkTrackVars="eVar1,eVar2,eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event28";window.omtr.events="event28";omtr.t();},				
				"twitter":function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event40";window.omtr.events="event40";window.omtr.tl('','o','tweet');},												
				"print": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event27";window.omtr.events="event27";window.omtr.tl('','o','print');},
				"print-open": function(){window.omtr.linkTrackVars="eVar11,eVar12,eVar13,eVar14,eVar15,events";window.omtr.linkTrackEvents="event32";window.omtr.events="event32";window.omtr.tl(window.location.href,'o','print-open');},
				"video-playlist": function(d){window.omtr.eVar39=d.title||"N/A";window.omtr.linkTrackVars="eVar39,events";window.omtr.linkTrackEvents="event20";window.omtr.events="event20";window.omtr.tl('','o','video-playlist');},
				"video-thumbnail": function(d){window.omtr.eVar31=d.guid||"N/A";window.omtr.eVar32=d.show||"N/A";window.omtr.eVar33=d.category||"N/A";window.omtr.eVar34=d.personality||"N/A";window.omtr.eVar39=d.playlistTitle||"N/A";window.omtr.eVar52=d.title||"N/A";window.omtr.linkTrackVars="eVar31,eVar32,eVar33,eVar34,eVar39,eVar52,events";window.omtr.linkTrackEvents="event35";window.omtr.events="event35";window.omtr.tl(d.url,'o','video-thumbnail');}
			}
		},
		chart: {
			load: function(url,title) {
				if (typeof pSUPERFLY=="object") {
					pSUPERFLY.virtualPage(url,title);
				}
			},
			start: function() {
				window._sf_startpt=(new Date()).getTime();
			},
			init: function(id, dom) {
				if(window.isBeta){dom = location.host;}
				window._sf_endpt=(new Date()).getTime();			
				window._sf_async_config = {uid:id, domain:dom, pingServer:"pfox.chartbeat.net" };					
				var authors = $.grep([$.ad.meta().raw.creator, $.ad.meta().raw.contributor], function(n,i){return(n);}).join(',');				
				var sections = $.ad.meta().raw.section;
				if (authors) { _sf_async_config.authors = authors; }
				if (sections) { _sf_async_config.sections = sections; }
				this.setConfig("path");
				this.setConfig("title");
				// delay to compensate for video pages
				setTimeout(function(){ $.ad.util.include(document.location.protocol+"//static.chartbeat.com/js/chartbeat.js",2); },500);
				this.isInitialized = true;
			},
			pre: function(d) {
				var channel = d.raw.channel;
				var id = 8971;
				if (id!=undefined) {
					var dom = document.domain.split('.').slice(-2).join('.');
					var path = d.raw.channel+"/"+d.raw.section;
					var domain_exceptions_map = {
						"fnl/.+": "latino.foxnews.com",
						"fnc/nation": "nation.foxnews.com",
						"fnc/radio": "radio.foxnews.com",
						"fnc/insider": "disabled", // force disable
						"fnc/magazine": "magazine.foxnews.com",						
						"fsb/.+": "smallbusiness.foxbusiness.com"
					};
					dom = (function(o,p) {
						for (var i in o) {
							if (p.match(new RegExp(i))) {
								return o[i];
							}
						}
					})(domain_exceptions_map,path)||dom;
					
					if (dom==="disabled") { return false; }
					var w_onload = window.onload;
					window.onload = (typeof window.onload!="function")?function(){$.ad.chart.init(id,dom);}:function(){w_onload();$.ad.chart.init(id,dom);};
				}
			},
			setConfig: function(type,info) {
				if (typeof _sf_async_config==="undefined") { return false; }
				
				switch(type) {
					case "path": 
						var og = $("meta[property='og\:url']").attr("content"),
					      can = $.ad._meta.canonical,
					      doc = window.location.pathname;

				      var valid = function(val) {
				    	  if (!val) { return false; }
					      var x, arr = [".foxnews.com",".foxbusiness.com",".foxsmallbusinesscenter.com",".foxnewsinsider.com"], len = arr.length;
					      for (x = 0; x < len; x++) { if (val.indexOf(arr[x])>-1) { return true; } }
					      return false;
					   };

					   var path = function(val) {
						  if (!val) { return false; }
						  var path = false;
						  if (val.charAt(0)==="/") {
							  path = val;
						  } else if (val.indexOf("http")===0) { // links that start with the protocol
							  path = val.split("/").slice(3);
							  path = "/" + ((path.length>0) ? path.join("/") : "");
					      }
					      if (path) { // strip out query & hash
					    	  path = (path.indexOf("?")>-1) ? path.substr(0,path.indexOf("?")) : path;
					    	  path = (path.indexOf("#")>-1) ? path.substr(0,path.indexOf("#")) : path;
					      } 
					      return path;
					   };

					   if (!info) {
						   og = path(og);
						   can = (valid(can)) ? path(can) : false;
						   info = (og) ? og : (can) ? can : doc;
					   }
					   window._sf_async_config.path = info;
						break;
						
					case "title":
						var og = $("meta[property='og\:title']").attr("content"),
							dc = $.ad.meta().raw.title,
							doc = $("title:first").text();
						
							info = (dc) ? dc : (og) ? og : doc;
						
						if (typeof info==="string" && info.length>0) {
							window._sf_async_config.title = info;
						}
						break;
				}			
			}			
		},
		coms: {
			data: {
				c1: 2,
				c2: "9013181",
				c3: "",
				c4: window.location.protocol + "//" + window.location.host + window.location.pathname,
				c5: "",
				c6: "",
				c15: ""
			},
			pre: function(d) {
				window._comscore = window._comscore || [];
				window._comscore.push($.ad.coms.data);
				var src = ("https:"==document.location.protocol?"https://sb":"http://b")+'.scorecardresearch.com/beacon.js';
				$.ad.util.include(src,2);
			},
			load: function(d) {
				if (window.COMSCORE) {
					window.COMSCORE.beacon($.ad.coms.data);
				}
			}
		},
		track: function(d) {
			var track_map = {
	
				//Janrain
				"network-share-success": function(obj){$.ad.omni.load({"network-share-success": obj});},
				"email-share-success": function(obj){$.ad.omni.load({"email-share-success": obj});},
				"network-share-start": function(obj){$.ad.omni.load({"network-share-start": obj});},
				"email-share-start": function(obj){$.ad.omni.load({"email-share-start": obj});},
				"registration-complete": function(obj){$.ad.omni.load({"registration-complete": obj});},
				"registration-start": function(obj){$.ad.omni.load({"registration-start": obj});},
				"logins": function(obj){$.ad.omni.load({"logins": obj});},
				"profile-updates": function(obj){$.ad.omni.load({"profile-updates": obj});},
				"comment-post": function(obj){$.ad.omni.load({"comment-post": obj});},
				"fb-share": function(obj){$.ad.omni.load({"fb-share": obj});},
				"twttr-follow": function(obj){$.ad.omni.load({"twttr-follow": obj});},		
					
				"view": function(d){$.ad.omni.init(d);$.ad.niel.pre(d);$.ad.coms.load(d);$.ad.chart.load();},
				//"slide": function(x){$.ad.omni.load({"slide": x});$.ad.niel.pre($.ad.meta());$.ad.coms.load($.ad.meta());/*$.ad.chart.load('/'+x);*/},
				"slide": function(obj){
					if (typeof obj == "object") {
						$.ad.omni.load({"slide": obj});
						$.ad.niel.pre($.ad.meta());
						$.ad.coms.load($.ad.meta());
					}
					else{$.ad.omni.load({"slide": obj});$.ad.niel.pre($.ad.meta());$.ad.coms.load($.ad.meta());/*$.ad.chart.load('/'+obj);*/}
				},				
				"email": function(d){$.ad.omni.load({"email": d});},	
				"link-track": function(obj){$.ad.omni.load({"link-track": obj});},
				"externalLinks": function(obj){$.ad.omni.load({"externalLinks": obj});},
				"registration": function(obj){$.ad.omni.load({"registration": obj});},					
				"login": function(obj){$.ad.omni.load({"login": obj});},					
				"newsletter" : function(obj){$.ad.omni.load({"newsletter": obj});},
				"facebook": function(obj){$.ad.omni.load({"facebook": obj});},
				"share": function(obj){$.ad.omni.load({"share": obj});},										
				"comment" : function(obj){$.ad.omni.load({"comment": obj});},
				"twitter": function(d){$.ad.omni.load({"twitter":d});},												
				"print": function(d){$.ad.omni.load({"print": d});},
				"print-open": function(d){$.ad.omni.load({"print-open": d});},
				"video-playlist": function(d){},
				"video-thumbnail": function(d){$.ad.omni.load({"video-thumbnail": d});$.ad.niel.pre($.ad.meta());$.ad.coms.load($.ad.meta());$.ad.chart.load(d.urlPath,d.title);},
				"article-commenting": function(d) { $.ad._data.ptype = d.ptype; $.ad.dc.load(); }
			};
			if (d!=undefined) {
				for (key in d) {
					var f = track_map[key];
					if (d.hasOwnProperty(key)&&f!=undefined) {
						f(d[key]);
					}
				}
			}
		},
		visrev:{
			init: function(){
				var root = this;	
				if($.ad._meta.channel.indexOf("fbn") > -1 || $.ad._meta.channel.indexOf("fsb") > -1){
					if($.ad._meta.raw.section == "root" && $.ad._meta.channel.indexOf("fbn") > -1 ){
						root.insertScript(67,true)
					}else{
						root.insertScript(67,false);
					}
					
				}
				if($.ad._meta.raw.channel.indexOf("fnc") > -1){
					if($.ad._meta.raw.section == "root"){
						root.insertScript(115,true); //currently only set for FN HP.
					}else{
						root.insertScript(115,false);
					}
				}
			},
			insertScript: function(id,automate){
				
				_vrq.push(['automate', automate]); 
				_vrq.push(['id', id]);
				_vrq.push(['track', function(){}]);
				(function(d, a) {
					var s = d.createElement(a),
					x = d.getElementsByTagName(a)[0];
					s.async = true;
					s.src = 'http://a.visualrevenue.com/vrs.js';
					x.parentNode.insertBefore(s, x);
				})(document, 'script');					
			}
		},			
		tynt: {
			init: function(d) {
				var ptype = d.ptype;
				var tynt_map = {
					"article":"",
					"bio":"",
					"column":"",
					"post":"",
					"slideshow":"",
					"transcript":""
				};
				if (ptype in tynt_map&&document.location.protocol=='http:') {
					var tynt_id = "";
					var path = d.raw.channel+"/"+d.raw.section;
					var tynt_id_map = {
						"fnc/.+": "bYSjoEJmOr3Qsfab7jrHcU",
						"fnl/.+": "aK7Hk8XCCr34e2adbi-bpO",
						"fsb/.+": "bQcl_G_lKr363qadbi-bnq",
						"fbn/.+": "aZzN--W0Gr3OhQab7jrHcU"
					};
					tynt_id = (function(o,p) {
						for (var i in o) {
							if (p.match(new RegExp(i))) {
								return o[i];
							}
						}
					})(tynt_id_map,path)||tynt_id;
					Tynt.push(tynt_id);
					Tynt.i={"c":false};
					$.ad.util.include("http://tcr.tynt.com/ti.js",2);
				}
			}
		},			
		util: {
			getLRC: function(s) {
		        if (s=="") { return 0; }
		        var len = s.length;
		        var lrc = 0;
		        for (var i = 0;i < len;i++) {
		            lrc += lrc ^ s.charCodeAt(i);
		        }
		        return lrc;
		    },
			enc: function(s) {
			    //return $.ad.util.base_convert_range($.ad.util.md5(s), 16, 10).substring(0, 16).replace(/\./, "");
			    return $.ad.util.md5(s);
			},
			iframe: {
				isFIF: function() { // is Friendly IFrame
					var x, channel = $.ad._meta.channel, ret = true;				
					ret =  (channel.indexOf("fnc/")===0 || channel.indexOf("fbn/")===0 || channel.indexOf("fsb/")===0 || channel.indexOf("fnl/")===0 ) ? true : false;
									// RESTRICT FIF on these channels
					var restrict =  ["fnc/insider","fnc/entertainment/blogs/entertainment","fnc/radio","fnc/junior-reporters"];
					
					for (x = 0; x < restrict.length; x++) {
						if (channel.indexOf(restrict[x]) > -1) { ret = false; break; }
					}
					
					return ret;	
					
				},
				friendlyComm: { // IAB
					getData: function(id) {

						var rightRails =  ["300x250","300x100"];
						var ret = false;	
						for (x = 0; x < rightRails.length; x++) {
							if (id.indexOf(rightRails[x]) > -1) { ret = true; break }
						}

						if($.loadAttempt && ret){
												
							$.loadAttempt(10,500,function(){ 
								return ($("#"+id).children(":first").is("div")) ? true : false;
							},function(){
							    $('#' + id).next('span,p').css('display','block');	
							});	
						}
					
						var data = ($.ad.dc._pageAdsObj[id]) ? $.ad.dc._pageAdsObj[id] : false;
						return data;
					},
					triggerResize: function(id,w,h) {
						if(w > 1 && h > 1){$('#' + id).next('span,p').css('display','block');}						
						$.ad.util.iframe.resize("ifr-"+id,w,h);
					}
				},
				create: function(w,h,id) {
					var ifr = document.createElement('iframe');
					ifr.setAttribute('id','ifr-'+id);
					ifr.setAttribute('border', 0);
					ifr.setAttribute('scrolling', 'no');
					ifr.setAttribute('frameBorder', 0);
					ifr.setAttribute('width', w);
					ifr.setAttribute('height', h);
					return ifr;
		    	},
				doc: function(ifr) {
					if (ifr.contentDocument) {
						// For NS6
						return ifr.contentDocument;
					} else if (ifr.contentWindow) {
						// For IE5.5 and IE6
						return ifr.contentWindow.document;
					} else if (ifr.document) {
						// For IE5
						return ifr.document;
					} else {
						return;
					}
				},
				closeDoc: function(doc, i) {
					if (i==10) {
						doc.close();
					} else {
						setTimeout(function(){$.ad.util.iframe.closeDoc(doc,i+1);},20);
					}
				},
				resize: function(id, w, h) {
					$('#'+id).css({width:w, height:h});
					//console.log('iframe ad: ' + id + ' w:' + w + ' h:' + h);
				}
			},
			param: function(u, name) {
				u = unescape(u);
				var match=(new RegExp("[\\?&#]"+name+"=([^&#]*)")).exec(u);
				if (!match) {
					return '';
				} else {
					return match[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
				}
			},
			cookie: $.cookie || function(name, value, options) {
				if (typeof value != 'undefined') {
					options = options || {};
					if (value === null) {
						value = '';
						options.expires = -1;
					}
					var expires = '';
					if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
						var date;
						if (typeof options.expires == 'number') {
							date = new Date();
							date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
						} else {
							date = options.expires;
						}
						expires = '; expires=' + date.toUTCString();
					}
					var path = options.path ? '; path=' + (options.path) : '';
					var domain = options.domain ? '; domain=' + (options.domain) : '';
					var secure = options.secure ? '; secure' : '';
					document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
				} else {
					var cookieValue = null;
					if (document.cookie && document.cookie != '') {
						var cookies = document.cookie.split(';');
						for (var i = 0; i < cookies.length; i++) {
							var cookie = $.ad.util.trim(cookies[i]);
							if (cookie.substring(0, name.length + 1) == (name + '=')) {
								cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
								break;
							}
						}
					}
					return cookieValue;
				}
				return "";
			},
			trim: $.trim || function(s) {
				return s.replace(/^\s+|\s+$/g,"");
			},
			md5: function(str) {
			    var xl;
			    var rotateLeft = function(lValue, iShiftBits) {
			        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
			    };
			    var addUnsigned = function(lX,lY) {
			        var lX4,lY4,lX8,lY8,lResult;
			        lX8 = (lX & 0x80000000);
			        lY8 = (lY & 0x80000000);
			        lX4 = (lX & 0x40000000);
			        lY4 = (lY & 0x40000000);
			        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			        if (lX4 & lY4) {
			            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			        }
			        if (lX4 | lY4) {
			            if (lResult & 0x40000000) {
			                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			            } else {
			                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			            }
			        } else {
			            return (lResult ^ lX8 ^ lY8);
			        }
			    };
			    var _F = function(x,y,z) { return (x & y) | ((~x) & z); };
			    var _G = function(x,y,z) { return (x & z) | (y & (~z)); };
			    var _H = function(x,y,z) { return (x ^ y ^ z); };
			    var _I = function(x,y,z) { return (y ^ (x | (~z))); };
			 
			    var _FF = function(a,b,c,d,x,s,ac) {
			        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
			        return addUnsigned(rotateLeft(a, s), b);
			    };
			    var _GG = function(a,b,c,d,x,s,ac) {
			        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
			        return addUnsigned(rotateLeft(a, s), b);
			    };
			    var _HH = function(a,b,c,d,x,s,ac) {
			        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
			        return addUnsigned(rotateLeft(a, s), b);
			    };
			    var _II = function(a,b,c,d,x,s,ac) {
			        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
			        return addUnsigned(rotateLeft(a, s), b);
			    };
			    var convertToWordArray = function(str) {
			        var lWordCount;
			        var lMessageLength = str.length;
			        var lNumberOfWords_temp1=lMessageLength + 8;
			        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			        var lWordArray=new Array(lNumberOfWords-1);
			        var lBytePosition = 0;
			        var lByteCount = 0;
			        while ( lByteCount < lMessageLength ) {
			            lWordCount = (lByteCount-(lByteCount % 4))/4;
			            lBytePosition = (lByteCount % 4)*8;
			            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
			            lByteCount++;
			        }
			        lWordCount = (lByteCount-(lByteCount % 4))/4;
			        lBytePosition = (lByteCount % 4)*8;
			        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			        return lWordArray;
			    };
			    var wordToHex = function(lValue) {
			        var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;
			        for (lCount = 0;lCount<=3;lCount++) {
			            lByte = (lValue>>>(lCount*8)) & 255;
			            wordToHexValue_temp = "0" + lByte.toString(16);
			            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
			        }
			        return wordToHexValue;
			    };
			    var x=[],
			        k,AA,BB,CC,DD,a,b,c,d,
			        S11=7, S12=12, S13=17, S14=22,
			        S21=5, S22=9 , S23=14, S24=20,
			        S31=4, S32=11, S33=16, S34=23,
			        S41=6, S42=10, S43=15, S44=21;
			 
			    str = $.ad.util.utf8_encode(str);
			    x = convertToWordArray(str);
			    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			    
			    xl = x.length;
			    for (k=0;k<xl;k+=16) {
			        AA=a; BB=b; CC=c; DD=d;
			        a=_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			        d=_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			        c=_FF(c,d,a,b,x[k+2], S13,0x242070DB);
			        b=_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			        a=_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			        d=_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			        c=_FF(c,d,a,b,x[k+6], S13,0xA8304613);
			        b=_FF(b,c,d,a,x[k+7], S14,0xFD469501);
			        a=_FF(a,b,c,d,x[k+8], S11,0x698098D8);
			        d=_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			        c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			        b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			        a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);
			        d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);
			        c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);
			        b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);
			        a=_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			        d=_GG(d,a,b,c,x[k+6], S22,0xC040B340);
			        c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			        b=_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			        a=_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			        d=_GG(d,a,b,c,x[k+10],S22,0x2441453);
			        c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			        b=_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			        a=_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			        d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			        c=_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			        b=_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			        a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			        d=_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			        c=_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			        b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			        a=_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			        d=_HH(d,a,b,c,x[k+8], S32,0x8771F681);
			        c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			        b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			        a=_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			        d=_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			        c=_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			        b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			        a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			        d=_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			        c=_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			        b=_HH(b,c,d,a,x[k+6], S34,0x4881D05);
			        a=_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			        d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			        c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			        b=_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			        a=_II(a,b,c,d,x[k+0], S41,0xF4292244);
			        d=_II(d,a,b,c,x[k+7], S42,0x432AFF97);
			        c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			        b=_II(b,c,d,a,x[k+5], S44,0xFC93A039);
			        a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);
			        d=_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			        c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			        b=_II(b,c,d,a,x[k+1], S44,0x85845DD1);
			        a=_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			        d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			        c=_II(c,d,a,b,x[k+6], S43,0xA3014314);
			        b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			        a=_II(a,b,c,d,x[k+4], S41,0xF7537E82);
			        d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			        c=_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			        b=_II(b,c,d,a,x[k+9], S44,0xEB86D391);
			        a=addUnsigned(a,AA);
			        b=addUnsigned(b,BB);
			        c=addUnsigned(c,CC);
			        d=addUnsigned(d,DD);
			    }
			    var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);
			    return temp.toLowerCase();
			},
			utf8_encode: function(argString) {
			    var string = (argString+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");
			    var utftext = "";
			    var start, end;
			    var stringl = 0;
			
			    start = end = 0;
			    stringl = string.length;
			    for (var n = 0; n < stringl; n++) {
			        var c1 = string.charCodeAt(n);
			        var enc = null;
			
			        if (c1 < 128) {
			            end++;
			        } else if((c1 > 127) && (c1 < 2048)) {
			            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
			        } else {
			            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
			        }
			        if (enc !== null) {
			            if (end > start) {
			                utftext += string.substring(start, end);
			            }
			            utftext += enc;
			            start = end = n+1;
			        }
			    }
			    if (end > start) {
			        utftext += string.substring(start, string.length);
			    }
			    return utftext;
			},
			base_convert: function(number, frombase, tobase) {
			    return parseInt(number+'', frombase+0).toString(tobase+0);
			},
			base_convert_range: function(number, frombase, tobase) {
			    return (parseInt(number+'', frombase+0)*10).toString(tobase+0);
			},
			include: function(url, m) {
				//var ifr = $.ad.util.iframe.create(0, 0, 'sc-'+$.ad.util.enc(url));
				//$('body').append(ifr);
				//var doc;
				//doc = $.ad.util.iframe.doc(ifr);
				//doc.open();
				//doc.write(unescape("%3Cscript src=\"" + url + "\" type=\"text/javascript\"%3E%3C/script%3E"));
				//$.ad.util.iframe.closeDoc(doc, 0);

				//if (m===1) {document.write(unescape("%3Cscript src=\"" + url + "\" type=\"text/javascript\"%3E%3C/script%3E"));}
				//if (m===2)   {$('head:first').append("%3Cscript src=\"" + url + "\" type=\"text/javascript\"%3E%3C/script%3E");}

				//var scr = unescape("%3Cscript src=\""+url+"\" type=\"text/javascript\"%3E%3C/script%3E");
				//var f = m===1?function(scr){document.write(scr);}:function(scr){$('head:first').append(scr);};
				//f(scr);

				var f = m===1?function(url){var scr = unescape("%3Cscript src=\""+url+"\" type=\"text/javascript\"%3E%3C/script%3E");document.write(scr);}:function(url){var s=document.createElement("script");s.src=url;document.getElementsByTagName("head")[0].appendChild(s);};
				f(url);
			},
			inject: function(url, vr, cb) {
				var scr = unescape("%3Cscript src=\""+url+"\" type=\"text/javascript\"%3E%3C/script%3E");
				document.write(scr);
				var i = 0;
				if (window[vr]==undefined) {
					var _timer = setInterval(check, 50);
				}
				function check() {
					if (window[vr]!=undefined) {
						clearInterval(_timer);
						_timer = null;
						cb();
						return 1;
					} else {
						i++;
							if (i>20) {
							clearInterval(_timer);
							_timer = null;
							//alert(i +' timed out');
							return 0;
						}
					}
				}
			},
			obj: {
				empty: function(obj) {
				    for (var p in obj) {
				        if (obj.hasOwnProperty(p)) {
				            return false;
				        }
				    }
				    return true;
				},
				clone: function(obj) {
				    //will work with arrays too:
				    var temp = (obj instanceof Array) ? [] : {};
				    for (myvar in obj) {
				        if (obj[i] && typeof obj[myvar] == "object") {
				            temp[myvar] = $.util.obj.clone(obj[myvar]);
				        } else {
				            temp[myvar] = obj[myvar];
				        }
				    }
				    return temp;
				}
			}
		},
		pre: function() {
			if (window._ad_pre_called==undefined) {
				var d = $.ad.meta();

				//parse.ly
				//$.ad.prsly.pre(d);

				//comscore
				$.ad.coms.pre(d);

				//quant pixel
				//$.ad.dc.quant.pre();

				//nielsen
				$.ad.niel.pre(d);
	 			//google
				$.ad.goog.pre(d);
				//chartbeat
				$.ad.chart.pre(d);
				//omniture				
				$.ad.omni.pre(d);
				window._ad_pre_called=true;

			}
		},
		init: function() {
			var d = $.ad.meta();
			var m = "server";

			$.ad.util.cookie('surround', window.sid, {path: '/'});

			$.ad.buzzFeed.init(d);

			//omniture
			$.ad.omni.init(d);

			//tynt
			$.ad.tynt.init(d);			

			$.ad.visrev.init();
												
			$.ad.adBlade.init();
			
			var col = "";
			if (d.ptype==="column"||d.ctype==="column") { var col = "-" + d.channel.split('/').slice(-1)[0]; }
			
			var url = "http://ads.foxnews.com/api/"+$.ad.util.enc(d.channel)+"-"+d.ptype.toLowerCase()+"-data.js?callback=jQuery.ad.callback&jsonp=?";
			if(window.isBeta){
				var url = "http://beta.ads.foxnews.com/api/"+$.ad.util.enc(d.channel)+"-"+d.ptype.toLowerCase()+col+"-data.js?callback=jQuery.ad.callback&jsonp=?";
			}
			
			if (m=="server") {
				$.getJSON(url);
			}
			if (m=="client") {
				var data = $.ad.lookup(d);
				$.ad.invoke([$.ad.dc.init, $.ad.qu.init], data);
			}
		},
		callback: function(data) {
						
			$.ad.invoke([$.ad.dc.init, $.ad.qu.init], data);
			$.ad._data = data;
		},
		invoke: function(fs, data) {
		    //for (f in fs) {
			for (f=0;f<fs.length;f++) {
			    fs[f](data);
			}
		},
		meta: function() {
			
			function isV5(){ 
				var uArr = location.pathname.split("/");
				var justNums = uArr[uArr.length-1].replace(".html","");
				return justNums.match(/^[0-9,\,]+$/g) != null;
			}			
			
			var canonical = ($('link[rel="canonical"]').attr('href'));	
			if ($.ad.util.obj.empty($.ad._meta)) {
				var channel = "", ptype = "", ctype = "", pageid = "", categories = [], d = {};
				var arr = ['dc', 'prism'];
				var t = {};
				var m = document.getElementsByTagName('meta');
				for (var i = 0;i<m.length;i++){
				  	var n = m[i].name;
				  	if(n&&arr.indexOf(n.split('.')[0])>-1){
				    	t[n.split('.')[1]] = m[i].content;						
				  	}
				}
				if (t.channel==undefined && window.pdata!=undefined) {
					d = window.pdata;
					channel    = d.breadcrumb;
					ptype      = d.page_type;
					ctype      = d.channel_type;
					pageid     = d.page_id;
					categories = d.categories;
				} else if (t.channel==undefined && window.pd!=undefined) {
					d = window.pd;
					channel    = d.breadcrumb;
					ptype      = d.page_type;
					ctype      = d.channel_type;
					pageid     = d.vcmid;
					categories = d.categories;
				} else {
					channel    = (t.channel+"/"+t.section+(t.subsection1?"/"+t.subsection1:"")+(t.subsection2?"/"+t.subsection2:"")+(t.subsection3?"/"+t.subsection3:"")+(t.subsection4?"/"+t.subsection4:"")).replace(/&/g,'').replace(/ +/g,' ').replace(/ /g,"-").toLowerCase();
					ptype      = type(t.type, t.genre, t.aggregationType);
					ctype      = t.aggregationType; 
					pageid     = t.identifier||0;
					categories = t.subject?t.subject.split(','):"";
				}
				
				function byCleaner(content){
					if(typeof content != "string"){return content;}
					var regExpr = new RegExp ("By ","g");
					return content.replace(regExpr,"");
				}
		
				categories[6] = byCleaner(categories[6]);
				t.contributor = byCleaner(t.contributor);
				t.creator = byCleaner(t.creator);					

				var language = ($('meta[name=language]').attr("content")) || false;	
				var column = ($('meta[name=column]').attr("content")) || false;					
				var classification = ($('meta[name=classification]').attr("content")) || false;
				var classificationISA = ($('meta[name=classification-isa]').attr("content")) || false;
				var mDate = ($("meta[name='dc.date']").attr("content")) || false;				
				$.ad._meta = {channel: channel, ptype: ptype, ctype: ctype, pageid: pageid, categories: categories, raw: t,canonical:canonical,classification:classification,classificationISA:classificationISA,column:column,language:language, mDate:mDate};
				//alert("channel: "+channel+", ptype: "+ptype+", ctype: "+ctype+", pageid: "+pageid);
			}
			return $.ad._meta;
			//return {channel: channel, ptype: ptype, ctype: ctype, pageid: pageid, categories: categories, raw: t};
			
			function type(t, g, a) {
				//t = dc.type, g = prism.genre, a = prism.aggregationType
				if (t=="Text.Archive"&&g=="chronology") { return "archive"; }
				if (t=="Text.Article"&&g=="")  { return a=="column"?"column":"article"; }
				if (t=="Text.Article"&&g=="column")  { return "column"; }
				if (t=="Text"&&g=="biography") { return "bio"; }
				if (t=="Collection"&&g=="homePage") { if (a=="topic") { return a; } return "channel"; }// return a;
				if (t=="InteractiveResource"&&g=="interactiveContent") { return "interactive"; }
				if (t=="Text.Article"&&g=="blogEntry") { return "post"; }
				if (t=="PhysicalObject"&&g=="productDescription") { return "product"; }
				if (t=="Data.Statistical"&&g=="stockQuote") { return "quote"; }
				if (t=="InteractiveResource"&&g=="photoEssay") { return "slideshow"; }
				if (t=="Text"&&g=="transcript") { return "transcript"; }
				if (t=="MovingImage"&&g=="") { return "video"; }// (possibly use prism.presentationtype as a scheme on the dc.type element - "video")
				return "other";
			}
		},
		lookup: function(d) {
			//use with /Home
			//var key = d.path.split('/').slice(1).join('_').toLowerCase();
			//new with fnc
			var key = d.path.split('/').join('_').toLowerCase();
			var data = d2009_client_data[key]||d2009_client_data.generic;
			if (!data.dc.site) {
				var p = d.path.split('/');
				data.dc.site=d.site+'/'+p.slice(2).join('/').toLowerCase();
			}
			if (d.ctype=='front') {
				data.dc.site = data.dc.site+'/index';
			}
			if (d.ctype=='person') {
				var p = d.path.replace(/\/columnists/, '').split('/');
				data.dc.site=d.site+'/'+p.slice(2).join('/').toLowerCase();
			}
			if (d.ptype=='slideshow') {
				data.dc.site = data.dc.site+'/slideshow';
			}
			data.site = d.site;
			data.ptype = d.ptype;
			data.pageid = d.pageid;
			return data;
		}
    };
})(jQuery);

if(!Array.indexOf){
	Array.prototype.indexOf = function(key){
		for(var i=0;i<this.length;i++){
			if(this[i]===key){
				return i;
			}
		}
		return -1;
	};
}

//chartbeat
//jQuery.ad.chart.init();
jQuery.ad.chart.start();

var _vrq = _vrq || [];
var Tynt = Tynt||[];
