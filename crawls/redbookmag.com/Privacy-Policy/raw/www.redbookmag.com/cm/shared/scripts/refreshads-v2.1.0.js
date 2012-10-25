var ord = Math.random()*10000000000000000;

/***************************************
 * usage for options:
 *	refreshAds({option: 'ignorecount'});
 *	refreshAds({option: 'norefresh'});
 *	refreshAds({option: 'resetcount'});
 *	refreshAds({option: 'alwaysrefresh'});
 *	refreshAds({notracking: true});
 *  refreshAds({option: "debug"}); // toggle debug mode
 *  refreshAds({positions: "ams_sitename_position"}) // simple refresh on individual position
 *  refreshAds({option:"alwaysrefresh",positions: adpositionName}) // individual position, without adding a counter
 *  refreshAds({option:"alwaysrefresh", positions: adpositionName, notracking: true}) // individual position, without adding a counter and without omniture tracking
 */

var refreshAds = function (){
	ord = Math.floor(Math.random()*10e12);
	if ( !!arguments[0] && arguments[0].notracking )
	{
		$h.console.warn("adrefresh tracking ignored");
	}
	else
	{
		if (typeof pageviewTracking == "function"){
			try {
				pageviewTracking(); // omniture function
			} catch(e) {
				$h.console.error("[OMNITURE pageviewTracking] ERROR "+e);
			}
		} else {
			$h.console.error("[refreshAds.js] pageviewTracking not found");
		}
	}
	
	if ((!!!_ad_refresh_interval) || (_ad_refresh_interval == 0)) {
		//$h.console.warn("ad refresh bypassed");
		return false;
	}
	this.debug;
	this.counter;
	this.forceRefresh = false;
	
	var individualPosition = null;
	
	if (this.debug == null) this.debug = false;
	var refreshdebug = this.debug;
	if (!!!this.counter) this.counter = 0;
	if (!!arguments[0]){
		switch (arguments[0].option){
			case "ignorecount":
			this.counter--;
			$h.console.warn("adrefresh count ignored[forceRefresh:"+this.forceRefresh+"]");
			break;
			case "norefresh":
			$h.console.warn("adrefresh bypassed[forceRefresh:"+this.forceRefresh+"]");
			return false;
			break;
			case "alwaysrefresh":
			this.forceRefresh = true;
			$h.console.warn("adrefresh always on[forceRefresh:"+this.forceRefresh+"]");
			// we need to have this force invoke a refresh without necessarily adding a counter..
			// this.counter += _ad_refresh_interval;
			break;
			case "resetcount":
			$h.console.warn("adrefresh count reset[forceRefresh:"+this.forceRefresh+"]");
			this.counter = 0;
			break;
			case "debug":
			$h.console.warn("debug mode toggle set["+!this.debug+"]");
			this.debug = !this.debug;
			break;
			default:
			$h.console.warn("adrefresh default[forceRefresh:"+this.forceRefresh+"]");
			break;
		}
		individualPosition = (!!arguments[0].positions) ? arguments[0].positions : false;
	}
//	$h.console.log("[forceRefresh:"+this.forceRefresh+"][counter:"+this.counter+"][debug:"+this.debug+"]")
	
	if ((++this.counter >= _ad_refresh_interval) || (this.forceRefresh)) {
		var allpositions = $h.util.getParameter("position_list",_ghearst_vars["ams_ads_script_src"]).split("%2C");
		var mypositions = "";
		for (i in allpositions){ // trimming down the number of positions because it's just too much..
			var flipbookreg = /flipbook$/g; // doing a silly hack to remove ams positions that end in _flipbook
			var epicreg = /epic$/g;
			if (flipbookreg.test(allpositions[i]) || epicreg.test(allpositions[i])){
//				console.warn("position found "+allpositions[i]);
			} else 	if (document.getElementById(allpositions[i])){
				if (mypositions == ""){
					mypositions += allpositions[i];
				} else {
					mypositions += ","+allpositions[i];
				}
			}
		}
		if (!!individualPosition){
			mypositions = individualPosition;// override mypositions array when there is a single ad to call..
		}
		if (this.forceRefresh){
			--this.counter;
		} else {
			this.counter = 0;
		}
		pageAdsParams["position_list"] = mypositions;
		$.ajax({
			transport : "xhr",
			type: "GET",
			url: "/ams/page-ads.js",
			dataType : "json",
			data: pageAdsParams,
			error: function(){
				$h.console.error("refreshAds[ajax Error]");
				// alert if there are no comments while debugging
				// alert("there are no comments for this article.");.
			},
			success: function(ads){
				ord=Math.random()*10000000000000000;
				loopAds: for (adposition in ads){ // using labels for for loops (cool!!)
					var passArray = ["google","Sponsored Links","ntwrkURL","hpto","subscribe.hearstmags.com","app.hearstmags.com","1x5 ad","adsyndication.msn.com","No creatives found for pos_name", "IGNOREREFRESH"];
					for (items in passArray){
						var theReggie = new RegExp(passArray[items],"i");
						if (theReggie.test(ads[adposition])){
							/*
							 * the msn refresh gambit!
							 */
/*							if (passArray[items] == "adsyndication.msn.com"){
								$h.console.warn("msn ad found! lets do the iframe refresh.."+"#"+adposition+" iframe");
//								$("#"+adposition+" iframe")
								var mysrc = $("#"+adposition+" iframe").attr("src");
								$("#"+adposition+" iframe").attr("src",mysrc);
							 }*/
							continue loopAds;
						}
					}
					var adDom = document.getElementById(adposition);
					var initialadWidth = parseInt(adDom.offsetWidth); // grabbing the initial ad width value..
					var adWidth = adDom.getAttribute("adWidth");
					var adHeight = adDom.getAttribute("adHeight");
					if (!(!!adWidth && !!adHeight)){ // adWidth and adHeight are not correct, lets fix those..
						// forcing styles on this span tag, giving it div-like behavior, and fixing it's size. 
						adDom.style.display = "block";// moved this up in order to achieve proper tHeight/tWidth values
						
						var tHeight;
						var tWidth;
						if (initialadWidth != 0){
							adDom.style.width = initialadWidth;
							tWidth = initialadWidth;
						} else {
							adDom.style.width = "auto";
							tWidth = adDom.offsetWidth;
						}
							adDom.style.height = "auto";
							tHeight = adDom.offsetHeight;
						if ((tHeight+tWidth) == 0){// this is an indication that the element is hidden
							// build out a temporary tag somewhere, and plop stuff inside
							var telement = document.createElement("div");
							telement.setAttribute("id","temporaryAdElement");
							telement.setAttribute("style","float: left;visibility: hidden;position: absolute; bottom: 0px; left: 0px;");
							document.body.appendChild(telement);
							telement.innerHTML = adDom.innerHTML;
							tHeight = telement.offsetHeight;
							tWidth = telement.offsetWidth;
							telement.style.display = "none";
							document.body.removeChild(document.getElementById("temporaryAdElement"))
						}
						adDom.setAttribute("adWidth",tWidth);
						adDom.setAttribute("adHeight",tHeight);
						adDom.style.width = tWidth;
						adDom.style.height = tHeight;
						adDom.style.overflow = "hidden";
						adWidth = tWidth;
						adHeight = tHeight;
					}
					var regtest = /<script/i.test(ads[adposition]);
					
					/*
					TEST TO LET WEYLAND INCLUDE EXECUTABLE SCRIPTS IN ADS
					
					var newad = (function(ad,position){
						var newreg = /<!--l2@/i.test(ad);
						if (newreg){
							var stripscript = "";
							try{
								//	alert(/<!--l2@[^>]*?>[\s\S]*?<!--\/l2@[A-Z]*-->/gi.exec(ad));
								var opentagreg = /<!--l2@[A-Z]*-->/.exec(ad);
								var keyword = opentagreg.toString().split("<!--l2@")[1].split("-->")[0]
								var trimmedad = ad.split("<!--l2@"+keyword+"-->")[1].split("<!--/l2@"+keyword+"-->")[0];
								myfunctionasastring = trimmedad.replace(/<\/?script[^>]*?>/gi,"");
								$h.console.warn("[refreshAds:"+position+"] external script found\n\n"+myfunctionasastring);
//								alert("myfunctionasastring "+myfunctionasastring)
								eval(myfunctionasastring);
								stripscript = /<!--l2@[^>]*?>[\s\S]*?<!--\/l2@[A-Z]*-->/gi.exec(ad);
							} catch(e){
								$h.console.error("[refreshAds:"+position+"] ERROR: external script failure \n\n"+ad)
							}
							return stripscript;
						}
							  
					})(ads[adposition],adposition)
					ads[adposition].replace(newad,"");
					*/
					
					
					
					
					if (/<script/i.test(ads[adposition])){// script tag found!!!
						// lets look for non-preview code..
						if (refreshdebug){
							if (ads[adposition].match(/\<\!\-\- begin (.*) ad tag \-\-\>/i)){
								// live ad found!
								$h.console.error("[ROGUE AD CONTENT:"+adposition+"] "+ads[adposition]);
							} else {
								$h.console.error("[BAD AD CONTENT:"+adposition+"] "+ads[adposition]);
							}
						}
						var ad = ads[adposition];
						ad = ad.replace(/[\n\r\t]/g,"");// strip carriage returns and stuffs
						var reg = /\'\s\+\s\w*\s\+\s\'/g; // we're going to be looking for patters like this:     ' + ord + '
						var mylist = ad.match(reg);
						if (!!mylist){
							for (var i=0;i<mylist.length;i++){
								var simplestring = mylist[i];
								var simplereg = /\w*/g;
								var thevar = mylist[i].match(simplereg)[4]; // should get instanced such as    ord
								ad = ad.replace(mylist[i],window[thevar]);  // where we can reference via window["ord"]
							}
						}
						
						var cssLink = document.createElement("link");
						cssLink.href = "/cm/shared/styles/iframe_proxy.css"; 
						cssLink.rel = "stylesheet"; 
						cssLink.type = "text/css"; 
						// Credit: Thomas Bindzu - thank you Thomas!!
						// http://bindzus.wordpress.com/2007/12/24/adding-dynamic-contents-to-iframes/
						var adPositionDOM = document.getElementById(adposition);
						adPositionDOM.innerHTML = "";
						var myframe = document.createElement("iframe");
						myframe.setAttribute("width",adWidth);
						myframe.setAttribute("height",adHeight);
						myframe.setAttribute("frameborder",0);
						myframe.setAttribute("scrolling","no");
						myframe.setAttribute("name",adposition+"-frame");
						myframe.setAttribute("id",adposition+"-frame");
						myframe.setAttribute("mytype","directfile");
						myframe.setAttribute("allowtransparency","true");
						myframe.setAttribute("style","border: 0; overflow: hidden: margin: 0px; padding: 0px;");
						adPositionDOM.appendChild(myframe);
						
						
// major changes being made here, due to a wierd behavior in ie7 regarding iframes and adding attributes to them. (BOOO)						
// ok, so first thing's first, if we don't need to do any doc write stuff, lets just get the doubleclick stuff out of the way						
						// from here, we are going to check if the url has a ad.doubleclick.net/adj pattern in it somewhere.. if it does, change it to adi
						// Alex - TBH, we probably don't even need to do this anymore, and instead just doc.write directly,buuut for posterity's sake..
						//var treg = /http\:\/\/ad.doubleclick.net\/adj/gi;
						var treg = /.doubleclick.net/i;
						if(treg.test(ad)){ // test to see if it's a doubleclick ad so we can use adi instead of adj
							//console.warn("regbool true:"+myframe.id+"  "+regbool+"\n\n"+ad)
							myframe.src = ad.match(/src\=\"\S*\"/i)[0].replace(/src\=\"/i,"").replace("\"","").replace(/adj/gi, "adi");
						} else {
							// ok, so it's not a doubleclick ad, so we gotta doc write into the iframe
							function iDocWrite(destinationDoc,contents){
								destinationDoc.open();
//								$h.console.warn("[adPosition:"+adposition+"]: non doubleclick ad found")
								destinationDoc.write(contents);
								destinationDoc.close();
								if (!!destinationDoc.body){ // sometimes hidden frames are parsed as null QQ
									destinationDoc.body.style.margin = 0;
									destinationDoc.body.style.border = 0;
								}
								destinationDoc.getElementsByTagName("head")[0].appendChild(cssLink);
							}
							if(myframe.contentDocument) {
								iDocWrite(myframe.contentDocument,ad)
							} else if(myframe.contentWindow){
								iDocWrite(myframe.contentWindow.document,ad)
							} else if(myframe.document) {
								iDocWrite(myframe.document,ad)
							} else {
								throw "Document not found, append the parent element to the DOM before creating the IFrame";
							}
						}
						
						
						
						
/*						myframe.doc = null;
						if(myframe.contentDocument) {
							myframe.doc = myframe.contentDocument;
						} else if(myframe.contentWindow){
							myframe.doc = myframe.contentWindow.document;
						} else if(myframe.document) {
							myframe.doc = myframe.document;
						}
						if(myframe.doc == null) throw "Document not found, append the parent element to the DOM before creating the IFrame";
						
						
///////////////////						
						
						// from here, we are going to check if the url has a ad.doubleclick.net/adj pattern in it somewhere.. if it does, change it to adi
						// Alex - TBH, we probably don't even need to do this anymore, and instead just doc.write directly,buuut for posterity's sake..
						//var treg = /http\:\/\/ad.doubleclick.net\/adj/gi;
						var treg = /ad.doubleclick.net/i;
						var regbool = treg.test(ad);
						
						if(regbool){
							//console.warn("regbool true:"+myframe.id+"  "+regbool+"\n\n"+ad)
							// use this opportunity to write a doubleclick file to adi
							myframe.src = ad.match(/src\=\"\S*\"/i)[0].replace(/src\=\"/i,"").replace("\"","").replace(/adj/gi, "adi");
						} else {
							//console.warn("regbool false:"+regbool)
							//						console.log(ad);
							
							// it's not a doubleclick ad, and it's got some script stuff in here, so let's just document.write inside the iframe..
							myframe.doc.open();
							$h.console.warn("[adPosition:"+adposition+"]: non doubleclick ad found")
							myframe.doc.write(ad);
							myframe.doc.close();
							if (!!myframe.doc.body){ // sometimes hidden frames are parsed as null QQ
								myframe.doc.body.style.margin = 0;
								myframe.doc.body.style.border = 0;
							}
							myframe.doc.getElementsByTagName("head")[0].appendChild(cssLink);
						}*/
						
						
//////////////////////////						
					} else {
						// valid ad position with not dyanmic content
						if(document.getElementById(adposition)) {
							document.getElementById(adposition).innerHTML = ads[adposition];
						}
					}
				}// end for
			}
		});
	}
}




/*






function checkforscript(ad,adposition){
	var newreg = /<!--l2@/i.test(ad);
	if (newreg){
		//	alert(/<!--l2@[^>]*?>[\s\S]*?<!--\/l2@[A-Z]*-->/gi.exec(ad));
		var opentagreg = /<!--l2@[A-Z]*-->/.exec(ad);
		var keyword = opentagreg.toString().split("<!--l2@")[1].split("-->")[0]
		var trimmedad = ad.split("<!--l2@"+keyword+"-->")[1].split("<!--/l2@"+keyword+"-->")[0];
		myfunctionasastring = trimmedad.replace(/<\/?script[^>]*?>/gi,"");
		alert("myfunctionasastring "+myfunctionasastring)
		eval(myfunctionasastring);
	}
}







*/









