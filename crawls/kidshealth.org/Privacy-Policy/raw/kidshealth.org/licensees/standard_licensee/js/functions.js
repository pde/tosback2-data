//Initialize the values for the below variables in the custom_functions.js(in the licensee specific folder) at the top of the file, if a licensee needs to call some methods in the onload method.
//On every page onload the function KH_loadFunctions() is called that calls intializemarquee() and initializeSplat() method for all the licensees.
//An eg. of how to define these variables and the funciton in the custom_functions.js file
//funcNm1 = "customFunctionName";
//funciton customFunctionName() { //do stuff here..... }

/* Start Mobile Additions */
/* Moved to common_header_elements.xsl for faster execution
function addElementBefore(node,tag,id,htm)
      {
        var ne = document.createElement(tag);
        if(id) ne.id = id;
        if(htm) ne.innerHTML = htm;
        node.parentNode.insertBefore(ne,node);
      }

      function addElementAfter(node,tag,id,htm)
      {
        var ne = document.createElement(tag);
        if(id) ne.id = id;
        if(htm) ne.innerHTML = htm;
        node.parentNode.insertBefore(ne,node.nextSibling);
      }

	function mobileDesktop() {
		thisScreen=screen.width;
		thisUA=navigator.userAgent;
		thisUA=thisUA.toLowerCase();
		if(thisUA.indexOf("iphone")!=-1||thisUA.indexOf("android")!=-1||thisUA.indexOf("iemobile")!=-1||thisUA.indexOf("blackberry")!=-1||thisUA.indexOf("opera m")!=-1||thisUA.indexOf("symbian")!=-1) {
			window.device="mobile";	
		}
		else if(thisScreen<=599) {
			window.device="mobile";
		}
		else{ window.device="desktop"};
		//document.write(device);
		if(device=="mobile") {
		//document.write("It appears that you are viewing KidsHealth from a mobile device.");
		whereWrite=document.getElementsByTagName('body');
		urlify();
		//document.location="http://kidshealth.org";
		writeThis="\<a href=\""+mobileURL+"\"\>click here to visit the mobile version of this page\<\/a\>";
		
		addElementAfter(document.body.firstChild,'div','mobileLink',writeThis);
		//document.getElementsByTagName('body').appendChild(writeThis);
			}
	}
	
	function urlify() {
		arrivingURL=window.location.href;
		insert2URL="m.";
		//mobileURL=arrivingURL.substr(0,7)+insert2URL+arrivingURL.substr(7);
		
		lowercaseURL=arrivingURL.toLowerCase();
		hashLocation=lowercaseURL.indexOf("#");
		//alert("the lcurl is"+lowercaseURL+"and the hash location is"+hashLocation);
		if(lowercaseURL.indexOf("pagemanager")!=-1 && lowercaseURL.indexOf("#")!=-1) {
				mobileURL=arrivingURL.substr(0,hashLocation)+"\&amp;m=y"+arrivingURL.substr(hashLocation);
		}
		
		else if(lowercaseURL.indexOf("pagemanager")!=-1) {
				mobileURL=arrivingURL+"\&amp;m=y";
		}
		
		else {
			mobileURL=arrivingURL.substr(0,7)+insert2URL+arrivingURL.substr(7);
		}
		//document.write(mobileURL);
	}
	
	function hasHash() {
			
	}
/* End Mobile Additions */

var funcNm1 = "";
var funcNm2 = "";
var funcNm3 = "";
var funcNm4 = "";
var funcNm5 = "";

function KH_loadFunctions() {
	intializemarquee();
	initializeSplat();
	pageBreakerGD();
	newPageStyles();
	//hideMeds();
	hideMeds2();
	hideCats();
	anchorsAway();
	checkCookieTextSize();
	initializeFirstPageNumberBold();
	runOnLoad();
	
	//mobileDesktop();
	//thisCatGotCooked('relatedPrinterButton');

	// following function added for testing only
	// needs rules set within xslt and new function
	//  setVars();
        //  PT();
	//_sectionChooser();
	//alert(_sectionChooser);
	
	if(funcNm1 != null && funcNm1.length > 0){
		eval(funcNm1 + "();");
	}
	if(funcNm2 != null && funcNm2.length > 0){
		eval(funcNm2 + "();");
	}
	if(funcNm3 != null && funcNm3.length > 0){
		eval(funcNm3 + "();");
	}
	if(funcNm4 != null && funcNm4.length > 0){
		eval(funcNm4 + "();");
	}
	if(funcNm5 != null && funcNm5.length > 0){
		eval(funcNm5 + "();");
	}
}

function initializeFirstPageNumberBold(){
	var pageNaviFinder = document.getElementById('navi_pagenumber_1');
	if(pageNaviFinder != null) {
   pageNaviFinder.style.fontWeight = 'bold';
				pageNaviFinder.style.textDecoration = 'none';
				pageNaviFinder.style.fontSize = '14px';
				pageNaviFinder.style.color = '#cccccc';		
	}
}

function initializeSplat(){
	if (typeof Tooltip != 'undefined')
		Tooltip.init();
}



function newPageStyles() {
	sCL = document.getElementById('subCatLinks');
	if(sCL != null) {
			sCL.style.display = 'none';
	//document.getElementById('subCatLinks').style.display = 'none';
	
	}
	//pCN = document.getElementById('navi_pagenumber_1');
	//toggleLayer('navi_pagenumber_1','pageNaviNormal','pageNaviActive');
}



function anchorsAway(){
	//selectedAnchor = 999;
	URL_str = window.location.href;
		if(URL_str.indexOf("#") != -1)
		{
			selectedAnchor= URL_str.substring(URL_str.indexOf("#")+1, URL_str.length);
		//	var x="1,225.41";
		//	var y=x.replace(/,/g,'');
		
		//alert(selectedAnchor);
		anotherNullCat = "catnull";
		if(document.getElementById(selectedAnchor) != null) {	
			if(selectedAnchor != anotherNullCat) {
				isCatCheck = document.getElementById(selectedAnchor).className;
				if(selectedAnchor != null && isCatCheck != null) {
				toggleLayer(''+selectedAnchor+'List');
				//alert("anchorsAway");
				//toggleClass(selectedAnchor,'medicationsExpand','medicationsExpanded');
				document.getElementById(selectedAnchor).className = 'medicationsExpanded';
				//alert("1");
				location.hash = selectedAnchor;
				//alert("2");
			}
			}
		
		}
		
		
	}
}

function thisCatGotCooked(theCat) {
	//alert("1");
	//theCurrentCat = document.getElementById('thisCategory').firstChild.nodeValue;	
	if(document.getElementById(theCat) != null) {
		printURL = document.getElementById(theCat).firstChild.href;
		//theCurrentCatDisplay = theCurrentCat[0].firstChild.nodeValue;
		catStr = printURL;
			if(catStr.indexOf("cat_id") != -1)
			{
				startNumber = catStr.indexOf("cat_id")+1;
				endNumber = catStr.indexOf("article_set")+1;
				//catString = catStr.substring(catStr.indexOf("cat_id,etc"), catStr.length);
				yesTheCat = catStr.substr((startNumber+6),((endNumber-1)-(startNumber+7)));
			}
		//alert(catString);
		//alert("start:"+startNumber+" end:"+endNumber);
		//alert(yesTheCat);
		createCookie('khStickyCatCompare',yesTheCat);
	}
	//else createCookie('khStickyCatCompare',0);
	//else alert("nope");
}



function stickyCatCookie() {
	
	theSubCat = readCookie('khStickyCat');
	//theSubCatCompare = readCookie('khStickyCatCompare');
	//toBeChanged = document.getElementById('theSubCat');
	//if(toBeChanged != null) {
		toBeChanged = "cat" + theSubCat + "List";
		//alert(toBeChanged);
		
		toBeChangedClass = "cat" + theSubCat;
	//}
	
	myNameIsURL = window.location.href;
	myHashLocation = myNameIsURL.indexOf("#")+1;
	
	myHash = myNameIsURL.substr(myHashLocation);
	
	
		if(myHash == "khsc" || myHashLocation == 0) {	
		
			if(theSubCat != null) {
				
					location.hash=toBeChangedClass;
			
			 }
		}
	
	//toggleLayer(toBeChanged);	
	//toggleClass(toBeChangedClass,'medicationsExpand','medicationsExpanded');
				
				
}


function hideCats() {
				var ps = document.getElementsByTagName('ul');
				for(var i = 0; i < ps.length; i++ ) {
					
					if(ps[i].className == 'medicationsBrandsList')
						ps[i].style.display = "none";
				}
				var plusMinus = document.getElementsByTagName('a');
				for(var i = 0; i < plusMinus.length; i++ ) {
					
					if(plusMinus[i].className == 'medicationsExpanded')
						plusMinus[i].className = 'medicationsExpand';
				}
				
				stickyCatCookie();
			}
			
function pageBreakerGD() {
	var pb = document.getElementsByTagName('div');
				for(var i = 0; i < pb.length; i++ ) {
					
					if(pb[i].className == 'pageNavi')
						pb[i].style.display = "block";
				}
				
	var pageCountBox = document.getElementById('pageCountNumberBox');
		if(pageCountBox != null) {
				pageCountBox.style.display = 'block';
		}
}
			
function hideMeds() {
	//isMeds = 999;
	isMeds = document.getElementById('usBrandNamesList');
	if(isMeds != null) {
		document.getElementById('usBrandNamesList').style.display = 'none';
		document.getElementById('canadianBrandNamesList').style.display = 'none';
		document.getElementById('mexicanBrandNamesList').style.display = 'none';
	}
	/*
	//Hidden because exists in function hideCats which will also be applied to page,
	//Kept in case I separate which page gets which functions.
	var plusMinusMeds = document.getElementsByTagName('a');
				for(var i = 0; i < plusMinusMeds.length; i++ ) {
					
					if(plusMinusMeds[i].className == 'medicationsExpanded')
						plusMinusMeds[i].className = 'medicationsExpand';
				}*/
}
	
function hideMeds2() {
	isMedsUS = document.getElementById('usBrandNamesList');
	isMedsCan = document.getElementById('canadianBrandNamesList');
	isMedsMex = document.getElementById('mexicanBrandNamesList');
	if(isMedsUS != null) {
		isMedsUS.style.display = 'none';
	}
	if(isMedsCan != null) {
		isMedsCan.style.display = 'none';
	}
	if(isMedsMex != null) {
		isMedsMex.style.display = 'none';
	}
}


// The following functions relate to the breadcrumb extras and should eventually be linked to lic 1 only, included the associated onload which will be added...
function textSizer(theSize) {
	theContent = document.getElementById('khcontent_article');
	if(theContent != null){
	if(theSize == 1) {
			theContent.style.fontSize = '1em';
			createCookie('textSize','1','365');
		}
	if(theSize == 2) {
			theContent.style.fontSize = '1.25em';
			createCookie('textSize','2','365');
		}
	if(theSize == 3) {
			theContent.style.fontSize = '1.5em';
			createCookie('textSize','3','365');
		}
	}
	}
	
	function checkCookieTextSize()
	{
		
		var cookieText = readCookie('textSize');
		if (cookieText == '2')
			{
				//createCookie('textSize','2','365');
				textSizer('2');
			}
		else if (cookieText == '3')
			{
				//createCookie('textSize','3','365');
				textSizer('3');
			}
		
		else 
			{
				createCookie('textSize','1','365');
				textSizer('1');
			}
	}
			
	
function createCookie(name,value,days) 
	{
		if(name=="khStickyCat"){ location.hash = "khsc";}
		if (days) 
		{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	
function readCookie(name) 
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) 
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
