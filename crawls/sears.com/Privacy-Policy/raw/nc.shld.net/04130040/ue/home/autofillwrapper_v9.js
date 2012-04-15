/**
 * (16*16*16)/1365= nbr 1-2-3
 */
function generateAutofillID() {     
 
      var md5session = Math.floor(Math.random()*3+1);
      if(md5session > 3){
            md5session = 3;
      }
      if(md5session <1 ){
            md5session = 1;
      }
      return md5session;
}

var afpath, site, storeid;

function doSearch(){
	$.addToHistory();
	var vertical, part, url, keyword;
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

	var action = $("#srchFrm").attr("action");
	$('#vName, #part, #url').val("");

	if (trim(part) !== "") {
		document.location = "/shc/s/" + part;
	} else if (trim(keyword) !== "") {
		if (trim(vertical) !== "") {
			document.location = action + "?keyword=" + keyword + "&vName=" + vertical+ "&catPrediction=false";
		} else {
			document.location = action + "?keyword=" + keyword;
		}
	} else if (trim(url) !== "") {
		document.location = "/shc/s/" + url;
	}
}

/**
 * 
 * @param site valid values( sears, kmart, msears, mkmart, mygofer)
 * @param env valid values( prod, beta, qa, dev, local)
 * @param path (optional) for non standard path eg: testing in beta or qa, specify full path
 *         "http://autofill301p.qa.ch3.s.com:8180/AutoFill/sears"
 */

function loadAutofill(website, env, path) {
	var md5session, scriptname, cssname;
	md5session = $.cookie("autofill-version");
	if(md5session===null){
		md5session = generateAutofillID();
		$.cookie('autofill-version', md5session);
		$.cookie('autofill-version', md5session, { expires: 30});
	}else{
		$.cookie('autofill-version', md5session);
		$.cookie('autofill-version', md5session, { expires: 30});
	}
	
	md5session ="1";
	
	switch(md5session){
		case "1":
			scriptname=window.location.protocol +"//www.sears.com/0000/ue/home/autofillprod_v3.js";
			cssname=window.location.protocol +"//www.sears.com/0000/ue/home/CMBDZ_global_15441.css";
			break;
		
		case "2":
			scriptname="javascript/jquery.autocomplete.sears.ml.v-3.js";
			cssname="style/jquery.autocomplete.sears.ml.v-3.css";
			break;
		
		case "3":
			scriptname="javascript/jquery.autocomplete.sears.ml.v-3-2.js";
			cssname="style/jquery.autocomplete.sears.ml.v-3-2.css";
			break;
		
		default:
			scriptname="javascript/jquery.autocomplete.sears.ml.js";
			cssname="style/jquery.autocomplete.sears.ml.css";
			break;
		
	}
	
	switch(website){
		case "sears":
			afpath="/AutoFill/sears";
			storeid="10153_12605";
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
	if(path){
		afpath=path;
	}
	site = website;
	/**
	 * Add the css
	 */
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: cssname
    });
    /**
	 * Add the js
	 */
	$.getScript(scriptname, function() {
		$.loadHistory();

	//Disable autofill for pages with this in URL
	//TODO: getLocalAdSearchResults is the new fn to do Search for WeeklyAd pages.  Once that fn is deployed, 2nd half of the check can be removed
	if (location.href.match(/WeeklyAdHome|WeeklyAdDept/gi) && typeof getLocalAdSearchResults === 'function') {
		//no autofill for WeeklyAd
	}
	else {
		$("#keyword").autocomplete(window.location.protocol + "//" + window.location.hostname + "/AutoFill/sears", {
			delay: 5,
			hideAutocompleteOnIddle: 10000,
			serverResponseTimeout: 1000,
			storeId: window.location.hostname === "www.sears.com" ? "10153_12605" : "10165_26151",
			env: "prod",
			site: site,
			action: doSearch
		});
	}

	});
}