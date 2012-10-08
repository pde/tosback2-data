// iframe_safeway_hosted.js

function getViewName() {
	var href = window.location.href;
	if(href.indexOf('?') > -1) {
		href = href.substring(0, href.indexOf('?'));
	}
	
	if(href.indexOf('#') > -1) {
		href = href.substring(0, href.indexOf('#'));
	}
	var results = href.split('/');
	//alert(results[results.length - 1]);
	
	var pageName = results[results.length - 1];
	if(pageName.indexOf('.page') > -1) {
		pageName = pageName.substring(0, pageName.indexOf('.page'));
		//alert("pageName :" + pageName);
	}
	return pageName;
}

//This function parses the href for a specific parameters (name) and uses that to set the src for the specified iframe (id)

	function gup( name, id )
	{
		loadintoIframe(id, getURLParam(name));
	}

	function gup(ctURL,id,viewName,hostname) 
	{
		ctURL = unescape(ctURL);
	  	if(ctURL.indexOf("//") == -1)
	  	{
		  	ctURL = "http://"+ctURL;
	  	}
	  	
	  	if((ctURL.indexOf("/",ctURL.indexOf("//")+2)) == -1)
	  	{
		  	ctURL = ctURL+"/";
	  	}
	  	
	  	if(viewName == '' || viewName == null)
	  	{
	  		viewName = getViewName();
	  	}
	  	
	  	if(hostname == '' || hostname == null)
	  	{
	  		hostname = window.location.hostname;
	  	}
  		if(window.location.port.length > 0 && (hostname.indexOf(':') == -1) ) {
  			hostname = hostname + ':' + window.location.port;
  		}
	  	//alert('URL = ' + ctURL);
	    loadintoIframe(id, ctURL, viewName, hostname);
	}

//This function is the one that actually sets the iframe src, in this case we are always setting to the hosted middleIframe.html 
//from the 3rd party site, plus we add the contentURL parameter so the middleIframe can load that content into the real iFrame.
	function loadintoIframe(iframeid, url, viewName, hostname) {
  // Reverting back to R0 solution for where2getit and cellfire.com and emarketinginc.com.  
  // It's not easy to get the correct height on this site with middle iframe solution.
  if(url.indexOf('where2getit.com') > -1 || url.indexOf('shop.safeway.com') > -1 || url.indexOf('corporate.safeway.com') > -1 || url.indexOf('locator.safeway.com') > -1 || url.indexOf('locator.vons.com') > -1 || url.indexOf('locator.pavilions.com') > -1 || url.indexOf('locator.genuardis.com') > -1 || url.indexOf('locator.dominicks.com') > -1 || url.indexOf('locator.randalls.com') > -1 || url.indexOf('locator.tomthumb.com') > -1 || url.indexOf('locator.carrsqc.com') > -1 || url.indexOf('cellfire.com') > -1 || url.indexOf('e-centives.com') > -1 || url.indexOf('foursquare.com') > -1 || url.indexOf('emarketinginc.com') > -1 || url.indexOf('chtah.com') > -1 || url.indexOf('redreview.net') > -1 || url.indexOf('safeway1.inserts2online.com') > -1) {
   var ifrm = document.getElementById(iframeid);
   url = URLDecode(url);
   if(url.indexOf('hostname') < 0) {
    	if( url.indexOf('shop.safeway.com') > -1 || url.indexOf('corporate.safeway.com') > -1 ) {
			url = url + '?hostname=' + hostname + '&banner=' + banner + '&env=' + environ;
		} else if (url.indexOf('safeway1.inserts2online.com') > -1) {
			url = url + '&hostname=' + hostname + '&banner=' + banner + '&env=' + environ;
		} else {
			url = url + 'hostname=' + hostname + '&banner=' + banner + '&env=' + environ;
		}
   }
   ifrm.src = url;
   if(url.indexOf('where2getit.com') > -1) {
    // weekly specials result does not have the map. So we use less height here.
    if(url.indexOf('weekly720') > -1) {
     	ifrm.height = '1300';
		ifrm.width = '720';
    } else if (url.indexOf('powerpump720') > -1) { // Power pump locator results
     	 ifrm.height = '900';
		 ifrm.width = '720';
	} else if (url.indexOf('index720') > -1) { 
     	 ifrm.height = '900';
		 ifrm.width = '970';
    } else { // for store locator results
     	 ifrm.height = '1300';
		 ifrm.width = '720';
    }
    
   } else if (url.indexOf('cellfire.com') > -1) {
     	ifrm.height = '1400';
     	ifrm.width = '970';
   } else if (url.indexOf('shop.safeway.com') > -1) {
     	ifrm.height = '1198';
     	ifrm.width = '745';
   } else if (url.indexOf('corporate.safeway.com') > -1) {
     	ifrm.height = '1198';
     	ifrm.width = '745';
   } else if (url.indexOf('emarketinginc.com') > -1) {
     	ifrm.height = '750';
     	ifrm.width = '970';
   } else if (url.indexOf('foursquare.com') > -1) {
     	ifrm.height = '780';
     	ifrm.width = '970';
   } else if (url.indexOf('e-centives.com') > -1) {
     	ifrm.height = '1400';
     	ifrm.width = '970';
   } else if (url.indexOf('chtah.com') > -1) {
     	ifrm.height = '3200';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.carrsqc.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.safeway.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.vons.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.pavilions.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.genuardis.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.dominicks.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.randalls.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('locator.tomthumb.com') > -1) {
     	ifrm.height = '1225';
     	ifrm.width = '970';
   } else if (url.indexOf('safeway1.inserts2online.com') > -1) {
     	ifrm.height = '850';
     	ifrm.width = '970';
   } else if (url.indexOf('redreview.net') > -1) {
     	ifrm.width = '985';
	if (url.indexOf('joyoffootball') > -1) {
		ifrm.height = '1250';
	} else { ifrm.height = '1305'; }
   }
   hidePleaseWaitIcon();
  } else {  
   var middleIframeLoc = get3rdPartyLocation(url, viewName, hostname);
   if (document.getElementById) {
     document.getElementById(iframeid).src=middleIframeLoc;
   }
  }
 }

//This isthe function which the hiddenIframe calls to update the middleIframe height and width.

	function resize(frame, height, width) {
		//alert('resizing ' + frame + ' width = ' + width + ' height = ' + height);
		var oframe = document.getElementById(frame);
		oframe.height = height;
		if(!isNaN(width) && width != '') {
			//alert("changing the width to:" + width);
			oframe.width = width;
		} 
	}
	
//This function encodes a URL
function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}
	
//This function decodes a URL
function URLDecode (encodedString) {
  var output = encodedString;
  var binVal, thisString;
  var myregexp = /(%[^%]{2})/;
  while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
    binVal = parseInt(match[1].substr(1),16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }
  return output;
}

//This function parses the href for a specific parameters (name) and uses that parameter to pass to the hidden iFrame

	function gup_hidden( name )
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	}

function hidePleaseWaitIcon(){ 
    document.getElementById('iFrameWaitState').style.visibility="hidden"; 
    document.getElementById("iFrameWaitState").style.display="none"; 
} 

function showPleaseWaitIcon(){ 
    document.getElementById('iFrameWaitState').style.visibility="visible"; 
    document.getElementById("iFrameWaitState").style.display="block"; 
} 

//Will need to develop a function to match the content url domain
// to the 3rd party locataion definition

function get3rdPartyLocation(contentUrl, viewName, hostname)
{
	var path = '/'
	var width = '730';
	var iframe = document.getElementById('ifrm');
	var domain = ''; //setURL(contentUrl);
	width = getWidth(viewName);
	var iFrmPath = ''; // domain;
	//if(SubDomain.length > 0) {
	//	iFrmPath = SubDomain + '.' + domain;
	//}

	var contentUrlProtocal = contentUrl.substring(0,5);
	
	if(contentUrlProtocal.indexOf('https') > -1) {
		contentUrlProtocal = 'https://';
	}
	else{
		contentUrlProtocal = 'http://';
	}
	
	var protocal = window.location.protocol + "//";
	
	var url = unescape(contentUrl);
	domain = url.substring(url.indexOf('//') + 2, url.length);
	domain = domain.substring(0, domain.indexOf('/'));
	iFrmPath = contentUrlProtocal + domain;
	path = getFilePath(iFrmPath);
	if(path.length == 0) {
		window.location.href = '/IFL/Grocery/GenericApplicationError';
		return; 
	}
	iframe.width = width;
	
	var fullPath = path + "protocol="+protocal+"&width="+width+"&hostname="+hostname+"&contentURL=" + escape(contentUrl);
	//alert('fullPath=' + fullPath);
	return fullPath; 
}


function getFilePath(domain)
{
	//alert("domain in getFilePath:" + domain);
	
	var pathArray = [];
	var path = '';
	// Please add all 3rd party domain paths below in the format as follows:
	// pathArray[x] = domain.com/pathlocation
	// where 'x' is the next incremental number higher than the last entry
	//ex. pathArray[0] = http://www.safeway.com/test/middleIframelocation.html
	/// Add entries below - DO NOT EDIT ABOVE
	
	pathArray[0] = 'http://hosted.where2getit.com/safeway/middleIframe2.html?extraHeight=1220&';
	pathArray[1] = 'http://summer09.skyworld.com/middleIframeNEW.html?extraHeight=210&';
	pathArray[2] = 'http://shop.safeway.com/superstore/middleiframeNEW.html?extraHeight=20&';
	pathArray[3] = 'http://safeway.staywellsolutions.com/staywellmiddleiframeNEW.pg?extraHeight=0&';
	pathArray[4] = 'http://safeway.staging.staywellsolutions.com/staywellmiddleiframe.pg?extraHeight=0&';
	pathArray[5] = 'http://safeway.dev.staywellsolutionsonline.com/staywellmiddleiframeNEW.pg?extraHeight=0&';
	pathArray[6] = 'http://recipes.safeway.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[7] = 'http://recipes.safeway.ca/middleiframeNEW.html?extraHeight=0&';
	pathArray[8] = 'https://shoppreview.safeway.com/superstore/middleiframeNEW.html?extraHeight=20&';
	pathArray[9] = 'http://randalls.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[10] = 'http://safeway.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[11] = 'http://pavilions.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[12] = 'http://carrs.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[13] = 'http://genuardis.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[14] = 'http://tomthumb.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[15] = 'http://www.dominicks.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[16] = 'http://www.vons.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[17] = 'http://www.randalls.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[18] = 'http://www.safeway.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[19] = 'http://www.pavilions.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[20] = 'http://www.carrsqc.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[21] = 'http://www.genuardis.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[22] = 'http://www.tomthumb.com/CMS/includes/html/iframe/middleIframeNEW.html?extraHeight=0&';
	pathArray[23] = 'http://safeway.baking.net/middleIframeNEW.html?extraHeight=250&';
	pathArray[24] = 'http://www.coupons.com/Couponweb/partners/safeway/middleIframeNEW.html?extraHeight=0&';
	pathArray[25] = 'http://phx.corporate-ir.net/client/64/64607/html/middleframeNEW.htm?extraHeight=0&';
	pathArray[26] = 'http://www.scoutpack63.org/middleIframe.html?extraHeight=0&'; // test website from Ezio.	
	pathArray[27] = 'http://localhost/CMS/includes/html/iframe/middleIframe.html?extraHeight=380&';
	pathArray[28] = 'http://stage.inserts2online.com/dominicks/middleiframe.html?extraHeight=0&';
	pathArray[29] = 'https://ebm.cheetahmail.com/r/regf2?aid=1907583763&n=4&a=0&extraHeight=20&';
	pathArray[30] = 'https://shop.safeway.com/superstore/middleiframeNEW.html?extraHeight=20&';
	pathArray[31] = 'http://www.cellfire.com/affiliate/i/middleIframe.html?extraHeight=0&';
	pathArray[32] = 'http://junedairy.emarketinginc.com/middleiframe.html?extraHeight=0&';
	pathArray[33] = 'http://summer09.safeway.rival-marketing.com/middleIframe.html?extraHeight=0&';
	pathArray[34] = 'http://locator.safeway.com/weekly720.savelocation.html?extraHeight=0&';
	pathArray[35] = 'http://ebm.cheetahmail.com/r/regf2?aid=1907583763&n=4&a=0&extraHeight=20';
	pathArray[36] = 'http://holiday2009.skyworld.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[37] = 'http://offers.e-centives.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[38] = 'http://earthday2010.dja.com/middleIframeNew.html?extraHeight=0&';
	pathArray[39] = 'http://earthday.skyworld.com/middleiframenew.html?extraHeight=0&';
	pathArray[40] = 'http://staging.prizelogic.com/safeway_june2010/middleiframenew.html?extraHeight=0&';
	pathArray[41] = 'http://www.packyourpicnic.com/middleIframeNEW.htm?extraHeight=0&';
	pathArray[42] = 'http://safeway.rival-marketing.com/locally-grown/middleIframeNEW.html?extraHeight=0&';
	pathArray[43] = 'http://safeway.rival-marketing.com/recipes/middleIframeNEW.html?extraHeight=0&';
	pathArray[44] = 'http://safeway.rival-marketing.com/ranchers-reserve/middleIframeNEW.html?extraHeight=0&';
	pathArray[45] = 'http://safeway.rival-marketing.com/refreshe/middleIframeNEW.html?extraHeight=0&';
	pathArray[46] = 'http://safeway.rival-marketing.com/refreshe/offer/middleIframeNEW.html?extraHeight=0&';
	pathArray[47] = 'http://safeway.rival-marketing.com/refreshe/backtoschool/middleIframeNEW.html?extraHeight=0&';
	pathArray[48] = 'http://safeway.rival-marketing.com/sustainability/middleIframeNEW.html?extraHeight=0&';
	pathArray[49] = 'http://thanksgiving.safeway.rival-marketing.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[50] = 'http://thanksgiving.safeway.rival-marketing.com/recipes/main-course/2-hour-turkey-recipe/middleIframeNEW.html?extraHeight=0&';
	pathArray[51] = 'http://holiday.safeway.rival-marketing.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[52] = 'http://holiday.safeway.rival-marketing.com/cookie-swap/middleIframeNEW.html?extraHeight=0&';
	pathArray[53] = 'http://holiday.safeway.rival-marketing.com/projects/middleIframeNEW.html?extraHeight=0&';
	pathArray[54] = 'http://holiday.safeway.rival-marketing.com/recipes/middleIframeNEW.html?extraHeight=0&';
	pathArray[55] = 'http://holiday.safeway.rival-marketing.com/leftovers-lounge/middleIframeNEW.html?extraHeight=0&';
	pathArray[56] = 'http://safeway.rival-marketing.com/backtoschool/middleIframeNEW.html?extraHeight=0&';
	pathArray[57] = 'http://safeway.rival-marketing.com/backtoschool/program/middleIframeNEW.html?extraHeight=0&';
	pathArray[58] = 'http://safeway.rival-marketing.com/backtoschool/products/middleIframeNEW.html?extraHeight=0&';
	pathArray[59] = 'http://safeway.rival-marketing.com/backtoschool/faqs/middleIframeNEW.html?extraHeight=0&';
	pathArray[60] = 'http://safeway.rival-marketing.com/open-nature/middleIframeNEW.html?extraHeight=0&';
	pathArray[61] = 'http://football.safeway.rival-marketing.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[62] = 'http://safeway.rival-marketing.com/debi-lilly/middleIframeNEW.html?extraHeight=0&';
	pathArray[63] = 'http://safeway1.inserts2online.com/middleiframe.html?extraHeight=0&';
	pathArray[64] = 'http://safeway.rival-marketing.com/well-and-good/middleIframeNEW.html?extraHeight=0&';
	pathArray[65] = 'http://grilling.safeway.rival-marketing.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[66] = 'http://locator.vons.com/middleIframeNEW.html?extraHeight=0&';
	pathArray[67] = 'http://locator.pavilions.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[68] = 'http://locator.genuardis.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[69] = 'http://locator.randalls.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[70] = 'http://locator.tomthumb.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[71] = 'http://locator.dominicks.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[72] = 'http://locator.carrsqc.com/weekly720savelocation.html?extraHeight=0&';
	pathArray[73] = 'http://rev.redreview.net/Safeway/DebiLilly_Holiday/index.html?extraHeight=0&';
	pathArray[74] = 'http://stage.inserts2online.com/middleiframeNEW.html?extraHeight=0&';
	pathArray[74] = 'http://stage.inserts2online.com/safewaycatalog/middleiframeNEW.html?extraHeight=0&';
	pathArray[75] = 'http://corporate.safeway.com/safeway/middleiframeNEW.html?extraHeight=20&';
	pathArray[76] = 'http://corporate.safeway.com/middleiframeNEW.html?extraHeight=20&';
	pathArray[77] = 'http://shop.safeway.com/corporate/safeway/middleiframeNEW.html?extraHeight=20&';
	pathArray[78] = 'http://shop.safeway.com/corporate/middleiframeNEW.html?extraHeight=20&';
	pathArray[79] = 'https://corporate.safeway.com/safeway/rxrefill/middleiframeNEW.html?extraHeight=20&';
	pathArray[80] = 'https://corporate.safeway.com/safeway/middleiframeNEW.html?extraHeight=20&';
	pathArray[81] = 'https://corporate.safeway.com/middleiframeNEW.html?extraHeight=20&';
	pathArray[82] = 'http://safeway1.inserts2online.com/middleiframeNEW.html?extraHeight=20&';

	/// DO NOT EDIT BELOW
	for (var i=0; i<pathArray.length; i++) {
		var thirdPartyPath = pathArray[i];
		//alert("third party domain in getFilePath: " + thirdPartyPath  + ' domain ' + domain);
		if(thirdPartyPath.indexOf(domain) > -1){
			 path = thirdPartyPath;
			 break;
		}
	
	}

	return path;
}

function getWidth(viewName)
{
	// Please add an else if condition for the new view added
	if(viewName == "Careers")
	{
		return 750;
	}else if(viewName == "Investors" || viewName == 'INVESTORS')
	{
		return 750;
	}else if(viewName == "FoodFlex")
	{
		return 980;
	}else if(viewName == "Recipe-Search")
	{
		return 740;
	}else if(viewName == "Ingredient-Search")
	{
		return 740;
	}else if(viewName == "Wellness-Center")
	{
		return 750;
	}else if(viewName == "WS-Store-Results")
	{
		return 720;
	}else if(viewName == "Store-Locator-Results")
	{
		return 720;
	}else if(viewName == "Coupons")
	{
		return 730;
	}else if(viewName == "PP-Locator-Results")
	{
		return 720;
	}else if(viewName == "Comments")
	{
		return 720;
	}else if(viewName == "ViewSpecials")
	{
		return 970;
	}else if(viewName == "Summer-Ideas")
	{
		return 970;
	}else if(viewName == "Summer-Stretch-Your-Budget")
	{
		return 970;
	}else if(viewName == "Summer-Ranchers-Reserve")
	{
		return 970;
	}else if(viewName == "Summer-Locally-Grown")
	{
		return 970;
	}else if(viewName == "Summer-Grilling")
	{
		return 970;
	}else if(viewName == "Summer-Menus")
	{
		return 970;
	}else if(viewName == "Summer-FAQ")
	{
		return 970;
	}else if(viewName == "Summer-Whats-Inyourkitchen")
	{
		//return 970;
		return 800;
	}else if(viewName == "Thanksgiving")
	{
		return 970;
	}else if(viewName == "Thanksgiving-Decorating-Ideas")
	{
		return 970;
	}else if(viewName == "Thanksgiving-FAQ")
	{
		return 970;
	}else if(viewName == "Thanksgiving-Leftoverslounge")
	{
		return 970;
	}else if(viewName == "Thanksgiving-Planning-Guide")
	{
		return 970;
	}else if(viewName == "Thanksgiving-Recipes")
	{
		return 970;	
	}else if(viewName == "2Hr-Turkey")
	{
		return 970;
	}else if(viewName == "Holiday")
	{
		return 970;
	}else if(viewName == "Holiday-Recipes")
	{
		return 970;
	}else if(viewName == "Holiday-Wine")
	{
		return 970;
	}else if(viewName == "Holiday-Leftoverslounge")
	{
		return 970;
	}else if(viewName == "Holiday-Festive")
	{
		return 970;
	}else if(viewName == "Holiday-Tips")
	{
		return 970;
	}else if(viewName == "Holiday-Game")
	{
		return 970;
	}else if(viewName == "Holiday-Projects")
	{
		return 970;
	}else if(viewName == "Holiday-Swap")
	{
		return 970;
	}else if(viewName == "Dairy-Sweeps")
	{
		return 970;
	}else if(viewName == "EarthDay")
	{
		return 970;
	}else if(viewName == "Locally-Grown")
	{
		return 970;
	}else if(viewName == "Locally-Grown-Maps")
	{
		return 970;
	}else if(viewName == "Summer-Ranchers")
	{
		return 970
	}else if(viewName == "Refreshe")
	{
		return 970
	}else if(viewName == "Refreshe-Offer")
	{
		return 970
	}else if(viewName == "Back-To-School")
	{
		return 970
	}else if(viewName == "BTS-2011")
	{
		return 970
	}else if(viewName == "Sustain-Seafood")
	{
		return 970
	}else if(viewName == "Foursquare")
	{
		return 970
	}else if(viewName == "Open-Nature")
	{
		return 970
	}else if(viewName == "Super-Bowl")
	{
		return 970
	}else if(viewName == "Entertaining-Brochure")
	{
		return 970
	}else if(viewName == "Debi-Lilly")
	{
		return 970
	}else if(viewName == "debililly")
	{
		return 970
	}else if(viewName == "Well-Good")
	{
		return 970
	}else if(viewName == "Bakery-Catalog")
	{
		return 970
	}else
	{

		return 730;
	}
}


//Code Below is for parsing the url
var parseObj
var Countx
var Protocol
var SubDomain
var Domain


function setURL(x) {
	parseObj = x;
	parseProtocol();
	parseSubDomain();
	Domain = parseDomain();
	//alert("Protocol:"+Protocol);
	//alert("SubDomain:"+SubDomain);	
	//alert("Domain:"+Domain);		
	if(x.indexOf('://localhost/') > -1) {
		Domain = 'localhost';
		SubDomain = '';
	}
	return Domain;
}

function parseProtocol() {
	var Count = 0;
	while (Count < 1 + parseInt(parseObj.length) ) {
		Countb = 1 + parseInt(Count);
		Countc = 2 + parseInt(Count);
		Char1 = parseObj.slice(Count,Countb);
		Char2 = parseObj.slice(Countb,Countc);
		if (Char1 == '/' && Char2 == '/') {
			Protocol = parseObj.slice(0,Countc);
			Countx = Countc;
			break;
		}
		Count = 1 + parseInt(Count);
	}
	var Protos = new Array('http://','ftp://','https://');
	for (counter in Protos) {
		if (Protocol == Protos[counter]) {
			Protocol = Protocol;
			break;
		}
		else {
			Protocol = '';
		}
	}
	return Protocol;
}

function parseSubDomain() {
	//Count = 0;
	tempProtocal = Protocol; //URLEncode(Protocol); //'http%3A%2F%2F';
	Count = tempProtocal.length;
	//alert("Count:" + Count);
	//alert("parseObj.length:" + parseObj.length);
	while (Count < (1 + parseInt(parseObj.length)) ) 
	{
		Countb = 1 + parseInt(Count);
		Char1 = parseObj.slice(Count,Countb);
		//alert("Char1:" + Char1);
		if (Char1 == '.') 
		{
			SubDomain = parseObj.slice(Countx,Count);
			Countx = 1 + parseInt(Count);
			break;
		}
		Count = 1 + parseInt(Count);
	}
	
	if (isNaN(SubDomain)) {
		SubDomain = SubDomain;
	}
	else {
		SubDomain = '';
	}
	
	//alert('in parseSub = ' + SubDomain);
	return SubDomain;
}

function parseDomain() {
	Count = 0;
	domainvar = '';
	//alert("parseObj in parseDomain"+parseObj);	
	while (Count < 1 + parseInt(parseObj.length) ) {
		Countb = 1 + parseInt(Count);
		Char1 = parseObj.slice(Count,Countb);
		if (Char1 == '/' && Count > 6) {
			if(SubDomain == '')
			{
				domainvar = parseObj.slice(Countx-4,Count);
			}else
			{
				domainvar = parseObj.slice(Countx,Count);
			}
			Countx = 1 + parseInt(Count);
			break;
		}
		Count = 1 + parseInt(Count);
	}
	//alert(' domain = ' + domainvar);
	return domainvar;
}
