

function trimExtraSpaces(s){
	return s.mtrim().trim();
}


/**
 * Truncate a string to a specified length, optionally adding suffix (for ex '...').
 * @param {String} val the string to operate on
 * @param {Object} [{length: 30, suffix: '', delim: ''}]
 * @returns the truncated string with delimiter if truncated else the string itself
*/
function aftruncate (val, ln) {
	if(val.length < ln){
		return val;
	}
	return FED.Util.truncate(trimExtraSpaces(val), {length:ln, delim:'', suffix:'...'});
}

if (!String.prototype.contains) {
	String.prototype.contains = function(s) {
		return this.indexOf(s) != -1; 
	};
}



function doSearch(){
	$.addToHistory();
	var vertical, part, url, keyword, produrl="/shc/s/", action = $("#srchFrm").attr("action");
	vertical = escape($('#vName').val());
	part = escape($('#part').val());
	url = escape($('#url').val());
	keyword = escape($('#keyword').val());
	

	s.eVar56 = s.prop56 = "New Autofill > Selected";
	s.linkTrackVars = "prop56,eVar56,prop12,prop10,channel,prop1,prop2,prop3,prop23,prop27,prop28,prop44";
	s.prop12 = "Search Click";
	s.prop44 = keyword.trim();
	s.prop23 = 'Autofill:Yes';
	s.tl(true, "o", "Search Click");

	$('#vName, #part, #url').val("");

	if (trimExtraSpaces(part) !== "") {
		document.location = produrl + part;
	} else if (trimExtraSpaces(keyword) !== "") {
		if (trimExtraSpaces(vertical) !== "") {
			document.location = action + "?keyword=" + keyword + "&vName=" + vertical+ "&catPrediction=false";
		} else {
			document.location = action + "?keyword=" + keyword;
		}
	} else if (trimExtraSpaces(url) !== "") {
		document.location = produrl + url;
	}
}

/**
 * 
 * @param site valid values( sears, kmart, msears, mkmart, mygofer)
 * @param environment valid values( prod, beta, qa, dev, local, searsqa)
 * @param path (optional) for non standard path eg: testing in searsqa, specify full path
 *         "http://autofill301p.qa.ch3.s.com:8180/AutoFill/sears"
 */

function loadAutofill(website, environment, path) {
	var afpath, storeid, scriptname, cssname, otcookie, envpath, afversion = $.cookie("autofill-version");
	if(FED.Util.isEmpty(afversion)){
		afversion = Math.floor((Math.random()*100)+1);
		/**
		 * 
		 * 32% to v3-1
		 * 32% to v3-2
		 * 32% to v3-3
		 * 4% to autofill disabled
		 */
		if(afversion <= 32 ){
			afversion ="1";
		}else if(afversion > 32 && afversion <= 64){
			afversion ="2";
		}else if(afversion > 64 && afversion <= 96){
			afversion ="3";
		}else {
			afversion ="0";
		}
		
		$.cookie('autofill-version', afversion);
		$.cookie('autofill-version', afversion, { path: "/", expires: 30});
	
	}else{
		$.cookie('autofill-version', afversion);
		$.cookie('autofill-version', afversion, { path: "/", expires: 30});
	}


	
	otcookie = $.cookie("ot");
	//if(!FED.Util.isEmpty(otcookie) && otcookie.startsWith("prod")){
	//	afversion ="1";	
	//}
	if(!FED.Util.isEmpty(otcookie) && otcookie.startsWith("beta")){
		environment="beta";	
	}
	
	//jspStoreImgDir is global variable in all environments
	// define the prefix to the deployment path

	if(afversion =="0"){
		$("#keyword").keydown(function(e) {		
			if(e.keyCode == 13) {
				e.preventDefault();
				var keyword = escape($('#keyword').val()),
				action = $("#srchFrm").attr("action");
				$('#vName').val("");
				if(environment=='qa' || environment=='dev'){
					action="http://www.sears.com"+ action;	
				}
				if (trimExtraSpaces(keyword) !== "") {
					document.location = action + "?keyword=" + keyword;
				}	
			}
		});
		return;	
	}
	
	
	switch(environment){
		case 'qa':
		case 'dev':
			envpath="javascript/";
			break;
		default: {//prod, beta and other
			if(!FED.Util.isEmpty(jspStoreImgDir)){
				envpath=jspStoreImgDir + 'ue/home/';
			}else{
				envpath="../ue/home/";
			}
			break;
		}
	}
	
	switch(afversion){
		case "1":
			scriptname=envpath + "af-prod.v-3-1.js";
			cssname=envpath+ "af-prod.v-3-1.css";
			break;
		
		case "2":
			scriptname=envpath + "af-prod.v-3-2.js";
			cssname=envpath+ "af-prod.v-3-2.css";
			break;
		
		case "3":
			scriptname=envpath + "af-prod.v-3-3.js";
			cssname=envpath+ "af-prod.v-3-3.css";
			break;
		
		default:
			scriptname=envpath + "af-prod.v-3-1.js";
			cssname=envpath+ "af-prod.v-3-1.css";
		break;
		
	}
	
	switch(website){
		case "sears":
			afpath="/AutoFill/sears";
			storeid=(location.hostname === "www.sears.com") ? "10153_12605" : "10165_26151";
			//storeid="10153_12605";
			break;
		
		case "kmart":
			afpath="/AutoFill/kmart";
			storeid="10151_10104";
			break;
		
		case "msears":
			afpath="/AutoFill/msears";
			storeid="10153_12605";
			break;
		
		case "mkmart":
			afpath="/AutoFill/mkmart";
			storeid="10151_10104";
			break;
		
		case "mygofer":
			afpath="/AutoFill/mygofer";
			storeid="10175_27151";
			break;
		
		default:
			afpath="/AutoFill/sears";
			storeid="10153_12605";
			website="sears";
			break;
		
	}

	if(window.location.hostname.contains('staging')
		|| window.location.hostname.contains('pulse.ecom')){
		path=location.protocol + "//autofill301p.qa.ch3.s.com:8180/AutoFill/sears";
	}
	if(!FED.Util.isEmpty(path)){
		afpath=path;
	}
	
	//do not show autofill for 4% of the traffic
	
	/**
	 * Add the css
	 */
	FED.Util.addCssFile(cssname);

    /**
	 * Add the js
	 */
	$.ajax({
		 url: scriptname,
		 dataType: 'script',
		 cache:true,
		 success: function(){
			$.loadHistory();
			//Disable autofill for pages with this in URL
			//TODO: getLocalAdSearchResults is the new fn to do Search for WeeklyAd pages.  Once that fn is deployed, 2nd half of the check can be removed
			if (location.href.match(/WeeklyAdHome|WeeklyAdDept/gi) && typeof getLocalAdSearchResults === 'function') {
				//no autofill for WeeklyAd
			}
			else {	
			 $("#keyword").autocomplete( afpath, {
					delay: 5,
					hideAutocompleteOnIddle: 10000,
					serverResponseTimeout: 1000,
					storeId: storeid,
					env: environment,
					site: website,
					action: doSearch
				});
			}
		 }
	});
}
function callmbox(afversion, environment){	
	try{	
		if(environment=='beta' || environment=='prod'){
			mboxDefine("autocomplete-div", "mbox_autofill", "autofill="+ (afversion || "none"));	
			mboxUpdate("mbox_autofill");

		}
	}catch(e){}
}
