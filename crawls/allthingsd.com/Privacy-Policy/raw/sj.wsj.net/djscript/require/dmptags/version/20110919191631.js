if (typeof dojo !== "undefined") {
  dojo.provide("blueKai.blueKai");
}

/* global blueKai document unescape */
if (typeof blueKai === "undefined") {
	blueKai = {};
}
var KRUXSetup = {
	pubid:"1c6ac852-8938-481a-84b8-4806affc8c13"
};
blueKai.blueKai = {
	dataJson :{},
	timercounter:0,	
	adDivs:[],
	bk_track:function(check, data){
		if(check && document.location.protocol.indexOf('https')==-1){
			if(data){
				this.dataJson = data;
				this.sendBlueKai();
			}else{
				this.adDivs = this.getbyclass();	
				if(!this.getData()){
					return;
				}
			}
		}
	},
	sendBlueKai: function(){
		/* 2.4.0-31349 */ 
		if(typeof BKTAG=="undefined"||!BKTAG){var BKTAG=(function(){var params=[];var doTagged=false;var _={getKwds:function(){var meta=document.getElementsByTagName('meta');var kwds=[];var ii=meta.length;for(var i=0;i<ii;i++){if(meta[i].name&&meta[i].name.toLowerCase()=='keywords'){kwds.push(meta[i].content)}}return kwds.join(',')},addBkParam:function(k,v){self.addParam('phint','__bk_'+k,v)}};var self={_dest:null,createHidden:function(k,v){var myInput=document.createElement("input");myInput.setAttribute('type','hidden');myInput.setAttribute("name",k);myInput.setAttribute("value",v);return myInput},doTag:function(site,limit,excludeBkParams,allowMultipleCalls){var bkFrame=null;if(doTagged&&!(allowMultipleCalls===true)){return}doTagged=true;params.unshift('r='+parseInt(Math.random()*99999));params.unshift('limit='+limit);params.unshift('ret=html');if(!excludeBkParams){self.addParam('phint','__bk_k',document.title);self.addParam('phint','__bk_k',_.getKwds())}self._dest=('https:'==document.location.protocol?'https://stags':'http://tags')+'.bluekai.com/site/'+site+'?'+params.join('&');self._dest=self._dest.substr(0,2000);var isOpera=false,isIE=false;if(typeof(window.opera)!='undefined'){isOpera=true}var ieIndex=navigator.userAgent.indexOf('Internet Explorer');if(!isOpera&&ieIndex>-1){isIE=true};if(!isIE){bkFrame=document.createElement("iframe");bkFrame.setAttribute('height','1');bkFrame.setAttribute('width','1');bkFrame.setAttribute("name","__bkframe");bkFrame.setAttribute("frameborder","0");bkFrame.setAttribute("src",self._dest);document.body.appendChild(bkFrame)}else{bkFrame=document.createElement("div");bkFrame.innerHTML='<iframe name="__bkframe" height="1" width="1" frameborder="0" src="'+self._dest+'" />';document.body.appendChild(bkFrame)}params=[]},addParam:function(type,k,v){if(v){var val=k+'='+v;val=encodeURIComponent(val);params.push(type+'='+val)}},addValue:function(k,v){if(v){var val=encodeURIComponent(v);params.push(k+'='+val)}}};return self})();function bk_addPageCtx(k,v){BKTAG.addParam('phint',k,v)}function bk_addVar(k,v){BKTAG.addValue(k,v)}function bk_doJSTag(site,limit,allowMultipleCalls){BKTAG.doTag(site,limit,false,allowMultipleCalls)}function bk_doSendData(site,limit,excludeBkParams,allowMultipleCalls){BKTAG.doTag(site,limit,excludeBkParams,allowMultipleCalls)}}		
		
		for(var key in this.dataJson ) {
			if(key && this.dataJson[key] != "" ) {
				bk_addPageCtx(key, this.dataJson[key]);
			}
		}
		
		var siteIds = { 
				"wsj.com" : "4454", 
				"barrons.com" : "4457", 
				"marketwatch.com":"4455", 
				"smartmoney.com":"4458", 
				"allthingsd.com":"4459", 
				"fins.com":"4456", 
				"wsjwine.com":"4461",	
				"efinancialnews.com":"4460"
					};
		var limit = 10;  //( we can tune it later )
		var site = document.location.href;
		var siteId = this.getSiteId(siteIds);
		this.makeFrame();
		bk_doSendData(siteId, limit, false);
		this.sendKrux();
		var url = document.URL.toLowerCase();
		if(url.indexOf('bluekaidebug=yes')>0) this.showData();
	},
	sendKrux: function(){

		KRUXSetup['site'] = this.dataJson['primaryProduct'];
		KRUXSetup['section'] = this.dataJson['section'];
		KRUXSetup['subSection'] = this.dataJson['articleType'];

		this.include("http://cdn.krxd.net/krux.js");
		
	},
	getSiteId:function(siteIds){
		var site = document.location.href;
		var defaultKey ="";
		for( key in siteIds ) {
			if(site.indexOf(key)>-1){
				return siteIds[key];
			}else if(".wsj.com".indexOf(key)>-1){
				defaultKey = siteIds[key];
			} 
		}		
		return defaultKey;
	},
	getData:function(){

		 this.dataJson = { 
			"serverDomain" : s?s.server:"",
			"primaryProduct" : s?s.channel:"",
			"pageName" : s?s.pageName:"",
			"section" : s?s.prop2:"",
			"articleType" : s?s.prop3:"",
			"subSection" : s?s.prop26:"",
			"contentType" : s?s.prop19:"",
			"encryptedUUID" : s?s.prop25:"",
			"contentChannel" : s?s.prop1:"",
			"isSub" : s?s.prop27:"",
			"edition" : s?s.prop24:"",
			"referrer" : document.referrer!=""?document.referrer.split('/')[2]:""
				};
			return this.getAdsData();
	},
	getAdsData:function(){
		if(this.adDivs.length>0){		
			var countSize=1;
			var countZone=1;
			var countSection=1;						
			var strSection = ",";
			var strZone = ",";
			var strSize = ",";
			for(i=0;i<this.adDivs.length;i++){
				if((this.adDivs[i].innerHTML.replace(/^\s+|\s+$/g,"")!='' && this.adDivs[i].getElementsByTagName('iframe')[0]!=undefined)|| this.timercounter>5){
					var ad=this.adDivs[i].getElementsByTagName('iframe')[0];
					if(ad){
						var ind=ad.src.indexOf('doubleclick.net');
						var height=ad.height;
						var width=ad.width;	
						if(ind>1 && height >2 && width >2){
							var str=ad.src.substring(ind);
							if(strSize.indexOf(","+str+",")==-1){
								strSize = strSize+width+"x"+height + ",";
								this.dataJson['adSize'+(countSize++)] = width+"x"+height;
								if(countSize>10)break;
							}
							if(str.split('/')[3]){
								var zone = str.split('/')[3].split(';')[0];
								if(strZone.indexOf(","+zone+",")==-1){
									strZone = strZone + zone+",";
									this.dataJson['adZone'+(countZone++)] = zone;
								}
								var section = str.split('/')[2];
								if(strSection.indexOf(","+section+",")==-1){
									strSection = strSection + section+",";
									this.dataJson['adSection'+(countSection++)] = section;
								}
	
							}
						}
					}
				}else{
					console.info('Calling getAdDetails in 1 sec...'+this.timercounter);
					this.timercounter++;
					window.setTimeout('blueKai.blueKai.getAdsData()',1000);
					return false;
				}
				
				
			}
			
		}
		this.sendBlueKai();
	},
	makeFrame:function () {
	   var ifrm = document.createElement("IFRAME");
	   ifrm.setAttribute("src", "javascript:void(0)");
	   ifrm.setAttribute("name", "__bkframe");
	   ifrm.setAttribute("frameborder", 0);
	   ifrm.style.width = 0+"px";
	   ifrm.style.height = 0+"px";
	   document.body.appendChild(ifrm);
	},
	include: function(file){
		var script  = document.createElement('script');
		script.src  = file;
		script.type = 'text/javascript';
		script.defer = true;
		document.getElementsByTagName('head').item(0).appendChild(script);
	},
	showData:function(){
		var out = '';
		for (var data in blueKai.blueKai.dataJson) {
			if(blueKai.blueKai.dataJson[data]!=null && blueKai.blueKai.dataJson[data].replace(/^\s+|\s+$/g,"")!=""){
				out += data + ': ' + blueKai.blueKai.dataJson[data] + '\n';
			}
		}
		alert(out);		
	},
	getbyclass: function(){
	  var elements = document.getElementsByTagName("div");
	  var result = [];
	  var attName= "class";
	  if(elements[0].getAttribute("className")!=null){
		  attName= "className";
	  }
	  for(z=0;z<elements.length;z++){
		  if(elements[z].getAttribute(attName) && elements[z].getAttribute(attName).match(/adSummary/)){
	      result.push(elements[z]);
	    }
	  }
	  return result;
	}

};

