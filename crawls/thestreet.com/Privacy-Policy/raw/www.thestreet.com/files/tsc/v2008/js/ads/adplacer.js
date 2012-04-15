//Attempting to address issue with missing registerNS(..) function.
function registerNS(ns){ var nsp = ns.split("."); var rt = window; for(var i=0; i<nsp.length; i++){ if(typeof rt[nsp[i]] == "undefined"){ rt[nsp[i]] = new Object(); } rt = rt[nsp[i]]; } }

registerNS("TSCM.ads");
registerNS("TSCM.util");
TSCM.util.isDefined = function(v){ if(typeof v=='undefined'||v==null||v==''||v=='undefined'){return false}else{return true};}
TSCM.ads.AdPlacerx = new function(){

   function isDefined(v){if(typeof v=='undefined'||v==null||v==''||v=='undefined'){return false}else{return true};}
   function getCookie(cn){ if (document.cookie.length>0) { var cs=document.cookie.indexOf(cn + "="); if (cs!=-1) { cs=cs + cn.length+1; var ce=document.cookie.indexOf(";",cs); if (ce==-1) ce=document.cookie.length; return unescape(document.cookie.substring(cs,ce)); } } return ""; }

   function clean(str){
    //   s = s.toLowerCase();
	var s = str.toString();
	  s = s.toLowerCase();
      s = s.replace(/ /g,"-");
      s = s.replace(/\|\.|\[|\]|\*|\!|\@|\#|\$|\%|\^|\&|\(|\)|\:|\'|\"|\<|\>|\?|\\|\/|\~|\`/g,"");
      return s;
   }

	var mainbuckets =  [
	"tsc-headlines-and-perspectives",
	"tsc-thestreet-picks",
	"tsc-investing-a-z",
	"tsc-life-and-money",
   "tsc-business-news",
   "tsc-portfolio",
	"tsc-quote",
	"tsc-peps",
	"tsc-audio",
	"tsc-tools-quotes",
//	"tsc-search",
	"mainstreet.thestreet.com",
	"tsc-business-news",
	"remnant.thestreet.com"
	];


    var stagemainbuckets =  [
    "tscstage.tsc-headlines",
    "tscstage.tsc-thestreet-picks",
    "tscstage.tsc-investing-a-z",
    "tscstage.tsc-life-and-money",
    "tscstage.tsc-business-news",
    "tscstage.tsc-portfolio",
    "tscstage.tsc-quote",
    "tscstage.tsc-peps",
    "tscstage.tsc-audio",
    "tscstage.tsc-tools-quotes",
//    "tscstage.tsc-search",
    "mainstreet.thestreet.com",
    "tscstage.tsc-business-news",
    "tscstage.remnant.thestreet.com"
    ];



   var uvals= new Array();
   //var targets=new Array();
   var targets = {}; // ['foo'];
   var DS = "/";
   var SC = ";";
   var EQ = "=";
   var AMP = "&";
   var AD_COOKIE_NAME = "ad_cookie";
   var TILE_PARAM = "tile";
   var PTILE_PARAM = "ptile";
   var KVAL_KEY = "kval";
   var ORD_PARAM = "ord";
   var SZ_PARAM = "sz";
   var UVALUE_PARAM = "u";
   var UVALUE_EQ = "-";
   var UVALUE_SEP = "|";
   var siteoverride=false;
   var AD_TYPE = "adtype";

   /**
   * Premium products by id/short name
   */
   var productMap = {
        '1' : 'rm',
        '546' : 'dst',
        '763' : 'ts',
        '765' : 'aap',
        '963' : 'vi',
        '1283' : 'rms',
        '2000' : 'dsa',
        '2100' : 'su10',
        '2150' : 'oa',
        '2162' : 'bo',
        '3014' : 'etf',
        '3017' : 'ditm'
   };

   return {

   autotarget:true,
   protocol:"http://",
   server:"a.collective-media.net",
   calltype:"adj",
   default_calltype:"adj",
   cmn:"ts",
   site:"thestreet.com",
   defaultsite:"tsc-thestreet.com",
   zone:"index",
   sz:"",
   adtype:"",
   type:"adj",
   ord:Math.floor(Math.random() * 1000000000000000),
   includeUvalues:false,
   autotile:true,
   tile:1,
   includeDcopt:false,
   usePtile:false,
   includeOrd:true,
   activeProducts: [], //getActiveProducts populates this to tell us what active products a user has

   /**
   * Reads the status cookie to tell us what products a user owns
   * populates the public property this.activeProducts for later use by Openx and DART
   */
   getActiveProducts: function() {
        if (YAHOO.util.Cookie.get('STATUS')) {
            var cookie = new String(YAHOO.util.Cookie.get('STATUS'));
            var products = cookie.split('|');
            products.shift(); //take out cookie version part

            for (var i=0; i<products.length; i++) {
                var fragments = products[i].split(':');
                var productName = productMap[fragments[0]] || null;
                var productStatus = fragments[1];

                //consider users with paid or free trails 'active' in the given product
                if (productName !== null && productStatus === 'P' || productStatus === 'F') {
                    this.activeProducts.push(productName);
                }
            }
        };
   },

   /* funky cool reading from metadata tags. */
  setSite:function(site){
  	 if(typeof site != "undefined"){
	 	this.site = site;
		siteoverride=true;
		}
  },
   parseMeta:function(){
            var meta = TSCM.metadata;
            var metastr = "";
            metastr = SC + "";

        var host = new String(document.location);
        var stageIndex= host.indexOf("tscstage",0);
        if(stageIndex != -1 || TSCM.cfg.useStageDART == "true") {
            this.defaultsite = "tscstage.tsc-headlines";
        }

			// this stuff should always be here.

			try {
           var sitezone = TSCM.metadata.Ads.site;
			  if(isDefined(sitezone)){
			  	if(sitezone.indexOf('/')!=-1){
					var parts = sitezone.split('/');
					if(!siteoverride){
						this.site = parts[0];
					}
					this.zone = parts[1];
					//this.site = this.site.replace(/tsc-/,"");
					this.zone = this.zone.replace(/tsc-/,"");
				} else {
					if(!siteoverride){
						this.site = this.defaultsite;
					}
                    this.zone = this.defaultsite;
				}
			  }else{
			  	if(!siteoverride){
			   	 this.site = this.defaultsite;
				}
                this.zone = this.defaultsite;
			  }


            }catch(e){

			   this.site = this.defaultsite;
               this.zone = this.defaultsite;
				// no story type for zone
			}


			try {

               // do the story metadata if it exists.
				   var storymeta = TSCM.metadata.Story;
	            for(var i in storymeta){

                        var cs,word;
                        var o = storymeta[i];
                        if(o instanceof Array){

                          if(i == "keywords"){
                             try {
                                 for(var j=0;j<o.length;j++){
                                    word = o[j];
                                    if(word != null){
                                       this.setTarget("kword",word);
                                    }
                                 }
                             }catch(e){
                                // log(e.message);
                             }
                          }

                          if(i == "authors"){
                             try {
                                 for(var j=0;j<o.length;j++){
                                    word = o[j];
                                    if(word != null){
                                       this.setTarget("authors",word);
                                    }
                                 }
                             }catch(e){
                               //  log(e.message);
                             }
                          }



                        } else if (typeof o == "object"){
							try {
								var storytype = o.dirname;
                                this.setTarget("storytype",storytype);
							}catch(e){


							}

						}else { // not an array

                              if((i == "primaryTickers")||(i=="updateTickers")||(i=="bearishTickers")||(i=="bullishTickers")){
                                 var tickarray = o.split(' ');
                                 for(var j =0;j<tickarray.length;j++){
                                    var val = tickarray[j];
                                    if(isDefined(val)){
                                    this.setTarget('tkr',val);
                                    }
                                 }

                              }

                              // things to skip
                              if(i == "hasReporting"){
                                 //
                              }else if(i == "isPrint"){

                              }else if(i == "headline"){

                              }else if(i == "tickers"){

                              }else if(i == "stockPositions"){

                              }else if(i == "pubDate"){

                              }else if(i == "callout"){

                              }else if(i == "authorName"){
                                 this.setTarget("author",o);
                              }else{
                                 if(isDefined(o)){
                                    this.setTarget(i,o);
                                 }
                              }
                        }
	            }
			} catch(e){
				//log(e.message);
			}


		 // here is a fun one!
	     try {
	        this.setTarget("contenttype",TSCM.metadata.Page.contentType );
	     }catch(e){

	     }

		 // quote page - get ticker / sector
	     try {
           if(isDefined( TSCM.pages.PageInfo.TickerSymbol)){
              this.setTarget("ticker",TSCM.pages.PageInfo.TickerSymbol);
           }
           if(isDefined( TSCM.pages.PageInfo.Sector)){
              this.setTarget("sector",TSCM.pages.PageInfo.Sector);
           }
	     }catch(e){

	     }

			// this could be in a better place than this file.
		this.handleOverrides();



		///* this probably can't work like this anymore
        var buckets = mainbuckets;

       var found_mah_bucket = false;
       var bucketIndex = -1;
       for(var i=0;i<buckets.length;i++){
            var i_has_a_bucket=buckets[i];
            if(this.site == i_has_a_bucket){
                found_mah_bucket = true;
                bucketIndex = i;
            }
       }
       if(! found_mah_bucket){
            this.site =this.defaultsite;
       }
        var host = new String(document.location);
        var stageIndex= host.indexOf("tscstage",0);

        if(stageIndex != -1 || TSCM.cfg.useStageDART == "true") {
            buckets = stagemainbuckets;
            if(found_mah_bucket){
                this.site = buckets[bucketIndex];
            }
        }
   },

   // special cases, which we wish were not in this file.
   handleOverrides:function(){

   			// portfolio page doesn't know who it is.
		try {
			if(TSCM.metadata.Page.template == "portfolio"){
				this.site = "tsc-portfolio";
                var host = new String(document.location);
                var stageIndex= host.indexOf("tscstage",0);
                if(stageIndex != -1 || TSCM.cfg.useStageDART == "true") {
                    this.site = "tscstage.tsc-portfolio";
                }

			}
		}catch(e){
			// defautls

		}

   },
   // reset all targeting values back to none.
   resetTargets:function(stompOrd){
   	 targets = {};
     this.adtype ="";
     this.includeDcopt = false;
   },
   // set a targeting value
   setTarget:function(key,value){
		if(key == 'remove')return;

      if(typeof value == "string"){
         value = value.toLowerCase();
         value = clean(value);
      }

      try {
         //value = value.toLowerCase().replace(/ /g,"_");
      }catch(e){
         //log(e.message);
         }
      try{
         // if we already have one
         if(typeof targets[key]!="undefined"){
            // if its an array push it on to the stack
            if(targets[key] instanceof Array){ // it is  alreayd an array
               targets[key].push(value);
            }else{ // not an array but a duplicate value
               var tempval = targets[key];
               targets[key]=[tempval,value];
            }
         }else{
            targets[key]=value;
         }
      }catch(e){
        // log(e.message);
      }
   },
   getTargets:function(){
      return targets;
   },
   removeTarget:function(key,value){
      targets[key]=null;
   },

   reset:function(key,value){
      targets=new Array();
      uvals=new Array();
      this.tile=1;
   },

   getTargetingString:function(){
      var targetingstring= "";

      for (var i in targets) {
         var o = targets[i];
         if(o instanceof Array){
            for(var j=0;j<o.length;j++){
               targetingstring += SC + this.makeParam(i,o[j]);
            }
         }else if (typeof o == "object"){
            // skip objects
         }else {
               targetingstring += SC + this.makeParam(i,o);
         }
      }
	  if(isDefined(this.additionalTargeting )){
	  	   targetingstring += this.additionalTargeting;
	  }

      return targetingstring;
   },

   getTile:function(){
      var tileparam = TILE_PARAM;
      if(this.usePtile == true){
         tileparam = PTILE_PARAM;
      }
      return this.autotile ? this.makeParam(tileparam,this.tile++):this.makeParam(tileparam,this.tile);
   },

   getRSIvals:function(){
      var rsistring = ";";
      var segCookie;
      var cn = "rsi_segs";
      var cv = "";
      if((cv =getCookie(cn)) != null) {
         var segs = cv.split("|");
            for(i=0; i<segs.length; i++) {
                var seg = segs[i];
                seg = seg.substring(seg.indexOf("_")+1);
               rsistring += ("rsi=" + seg + ";");  // rsistring var used in ad tags
            }
      }
      return rsistring;
   },

   geturl:function(){

      if( this.autotarget){
         if(typeof(TSCM.metadata)!='undefined'){
            this.autotarget = true;
            this.parseMeta();
         }else{

         }
      }



	 var targetstr = "";

	 try {
	 	var qskval = this.getParameter("kval");
		if(isDefined(qskval)){
			this.setTarget("kval",qskval);
		}
	  }catch(e){

	  }

	if(this.includeDcopt == true ) {
		this.setTarget("dcopt","ist");
	}

	if(this.cmn == "ts") {
		this.setTarget("cmn","ts");
		}


	var targetstr=this.getTargetingString();
      // add teh RSI values
    targetstr += this.getRSIvals();


    // add teh cookie vals
    if (document.cookie.indexOf(AD_COOKIE_NAME) != -1){
       //var val = readCookies('ad_cookie');
        var val = YAHOO.util.Cookie.get('ad_cookie');
       targetstr += SC + this.makeParam(KVAL_KEY,val);
    }


	  // add any additional targeting.
	   try {
           if(typeof TSCM.metadata.Ads.targeting != "undefined"){
            targetstr += TSCM.metadata.Ads.targeting;
           }
      }  catch(e){

      }

      var size = this.makeParam(SZ_PARAM,this.sz);
		if(!isDefined(this.calltype)){
			this.calltype = this.default_calltype;
		}

     if(this.adtype == "cau"){
       var cau = this.makeParam(AD_TYPE, this.adtype);

         var urlstring= this.protocol + this.server + DS + this.calltype + DS + this.site + DS + this.zone + targetstr + SC + size + ";" + cau;

       }
     else{

        var urlstring= this.protocol + this.server + DS + this.calltype + DS + this.site + DS + this.zone + targetstr + SC + size;


     }

     //var urlstring= this.protocol + this.server + DS + this.calltype + DS + this.site + DS + this.zone + targetstr + SC + size;


      if(this.autotile == true ) {
         var tilestr= "";
         tilestr +=  SC +  this.getTile();
         urlstring +=  SC +  tilestr;
      }

      	urlstring += this.getOrd();

		  try { // cleaning out duplicate ;;
	      	urlstring = urlstring.replace(/\;\;/g,";");
	      }catch(e){}



	  return urlstring;
   },

	getZoneFromURL:function(){

		try {
			var loc = document.location.pathname;
			var loca = loc.split("/");
			if(loca.length > 1){
				this.site = loca[2];
			}
		} catch(e){
			//log(e.message);
		}

	},
   getOrd:function(){
      return SC + this.makeParam (ORD_PARAM,this.getOrdNum());
   },


   getOrdNum:function(){
      if(this.includeOrd==true){
         if(this.autotile == true){
            return this.ord;
         }else{
            return Math.floor(Math.random()*100000000000);
         }
      }else{
         return this.ord;
      }
   },

   makeParam:function(key,value){
   	  if(key == 'remove'){return;}
      return 	key + EQ + value;
   },

   getUVals:function(){
      var u= this.getTargetingString();
      var n= u.length;

      if(u.charAt(n-1) == SC)
         u = u.slice(0,n-1);

      u = u.split(EQ).join(UVALUE_EQ).split(SC).join(UVALUE_SEP);
      u = u + SC;

      return u;
   },

   getParameter:function(name){
      var qs = window.location.search;
      var param = name + EQ;

      try {
      var loc = qs.indexOf(param);
         if(loc !=-1){
            var start = loc + param.length;
            var ss = qs.substring(start);
            var end = ss.indexOf(AMP);
            if(end != -1){
               return ss.substring(0,end);
            }else{
               return ss.substring(0);
            }
         }
         }catch(e){
            return "";
         }
   },

   addScript:function(parent){

      while(parent.hasChildNodes() == true) {
        parent.removeChild(parent.childNodes[0]);
      }

      var s=document.createElement('script');
      s.setAttribute("type","text/javascript");
      s.setAttribute("src",this.geturl());
      parent.appendChild(s);
   },
   writeTag:function(id){
      var tag = this.getScriptTag();
      document.write(tag);
   },
	getIframeName:function(){
		var name = "iframe_ad" + this.sz + "t" + this.tile;
		return name;
	},
   getScriptTag:function(){

	if(!isDefined(this.calltype)){
		this.calltype = this.default_calltype;
	}


     if(this.calltype == "adj"){
         var url = this.geturl();
         var it = '<SCR' + 'IPT type=\"text/javascript\" src=\"' + url + '\"><\/SCR' + 'IPT>';
	}

	 if(this.calltype == "adi"){

         var dims = this.sz.split('x');
         var w = dims[0];
         var h = dims[1];
		 var it;
		 var url =  this.geturl();
		 if(this.override == "blank"){
		 	url = "http://i.thestreet.com/files/tsc/blank.html";
		 }

         it = "<iframe name='" + this.getIframeName() + "' id='" + this.getIframeName() + "' frameborder='no' scrolling='no' width='" + w + "' height='" + h + "' src='" + url + "'><\/ifr"+"ame>";

	  }
      return it;
   }

 }

};
TSCM.ads.AdPlacerx.getActiveProducts();




/**
* absolutley positions an ad using an existing container as an 'anchor'
* can optionally update the height of the placeholder (cfg.flexibleHeight)
*/
TSCM.ads.positionToPlaceholder = function(cfg) {
	var Yud = YAHOO.util.Dom;
	var ad = Yud.get(cfg.ad);
	var placeholder = Yud.get(cfg.placeholder);

	if(!ad || !placeholder) {return};

	if(cfg.flexibleHeight === true) { //option to update height of placeholder based on ad
		var height = ad.offsetHeight;

		//set default height for caus if height detect fails
		if (height < 220 && placeholder.id === 'cauContainer') {
			height = 220;
		}
		if (height < 280 && placeholder.id === 'boxAdContainer') {
			height = 280;
		}

		Yud.setStyle(placeholder, 'height', [height, 'px'].join(""));
	}

	Yud.setXY(ad, Yud.getXY(placeholder)); //position the ad over the placeholder
};

