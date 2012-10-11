// Browser Sniffer
// sniffer_version = "1.1"
var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();

// *** BROWSER VERSION ************************************************************
var is_minor = parseFloat(appVer);
var is_major = parseInt(is_minor);

var iePos  = appVer.indexOf('msie');
if (iePos !=-1) {
   is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
   is_major = parseInt(is_minor);
}              

var is_getElementById   = (document.getElementById) ? "true" : "false";
var is_getElementsByTagName = (document.getElementsByTagName) ? "true" : "false";
var is_documentElement = (document.documentElement) ? "true" : "false";

var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));

if ((navigator.vendor) && ((navigator.vendor=="Netscape6") || (navigator.vendor=="Netscape")) && (is_nav)) {
   is_major = parseInt(navigator.vendorSub);
   is_minor = parseFloat(navigator.vendorSub);
}

var is_nav4 = (is_nav && (is_major == 4));
var is_nav4up 	= (is_nav && is_minor >= 4); 
var is_navonly	= (is_nav && ((agt.indexOf(";nav") != -1) || (agt.indexOf("; nav") != -1)) );
var is_nav6up 	= (is_nav && is_minor >= 6);
var is_nav5up 	= (is_nav && is_minor >= 5);
var is_nav7up 	= (is_nav && is_minor >= 7);
var is_ie   	= ((iePos!=-1));
var is_ie4   	= (is_ie && is_major == 4);
var is_ie4up 	= (is_ie && is_minor >= 4);
var is_ie5up 	= (is_ie && is_minor >= 5);
var is_ie5_5  	= (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
var is_ie6up 	= (is_ie && is_minor >= 6);

// *** PLATFORM *******************************************************************	
var is_win   		= ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
var is_win95 		= ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));
var is_winme 		= ((agt.indexOf("win 9x 4.90")!=-1));  
var is_win2k 		= ((agt.indexOf("windows nt 5.0")!=-1) || (agt.indexOf("windows 2000")!=-1));
var is_winxp 		= ((agt.indexOf("windows nt 5.1")!=-1) || (agt.indexOf("windows xp")!=-1));
var is_winxp_sp2 	= ((is_winxp) && (agt.indexOf("sv1")!=-1));	//Currently only works in IE
var is_win98 		= ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
var is_winnt 		= ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
var is_win32 		= (is_win95 || is_winnt || is_win98 || ((is_major >= 4) && (navigator.platform == "Win32")) || (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));
var is_mac   		= (agt.indexOf("mac")!=-1);
var is_vista			= ((agt.indexOf("vista")!=-1) ||
						(agt.indexOf("windows nt 6.0")!=-1));

//Writes correct style sheet into page
//NOTE: style_legacy.css is for ie4 and ns4 on a mac....all other browsers use style.css
var stylesheet="style.asp";

if (is_mac)
{
	if (is_nav4)
	{
		stylesheet="style.asp?legacy=1";
	}
	else if (is_ie4)
	{
		stylesheet="style.asp?legacy=1";
	}
}

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/templates/com/includes/"+stylesheet+"\">");


//Image Rollover Function
function rollOver(img_name, img_src)
{
	if (document.images)
	{
		document [img_name].src = img_src;
	}
}

//General Purpose popUp Script
//usage: (#, #, 'name', 'url', 1/0, 1/0) where the last 2 parameters must be a 1 or 0.
function popUpWindow (window_width, window_height, window_name, window_url, _resizeable, _scrollbars )
{
	var options="resizable="+_resizeable+",scrollbars="+_scrollbars+",width="+window_width+",height="+window_height+"";
	popupWin=window.open(window_url, window_name, options);
	return false;
}

//directs the browser that opened the popup to the specified link
//usage: openerLink('URL STRING');
function openerLink(link_location)
{
	opener.location.href=link_location;
	return false;
}

//Pops Up Glossary page for supplied term
//usage:  showGlossary('ANCHOR STRING');
function showGlossary(term)
{
	var page_2_load="/learn/glossary/";
	var first_char;

	first_char=term.charAt(0)
	first_char=first_char.toLowerCase();
	
	if(isNaN(first_char)==false)
	{
		page_2_load=page_2_load + "a_l_popup.asp#" + term;
	}
	else if(first_char < "m")
	{
		page_2_load=page_2_load + "a_l_popup.asp#" + term;
	}
	else
	{
		page_2_load=page_2_load + "m_z_popup.asp#" + term;
	}
	
	popUpWindow(400, 300, 'glossary', page_2_load, 1, 1);
	return false;
}

//Function to set homepage (or to popup a howto)
function makeThisMyHomePage()
{
	if (is_ie5up && is_win)
	{
		//The users browser is msie 5.0 or above on a windows box
		document.location.href = "/misc/set_homepage.asp?homepage_url=" + document.location.href;
	}
	else
	{
		popUpWindow(500, 350, "homepage_instructions", "http://www.verizon.net/templates/infospace/dsl/homepage_instructions.asp?homepage="+document.location.href, 1, 1);
	}
}


//LQ Auto tabbing Functions
function isNumericLQ()
{
	if (is_nav)
	{
		return;
	}
	else
	{
		get=event.keyCode;
		if((get>47&&get<58)||(get==8)||(get==9)) 
		{
			return true;
		}
		else
		{
			event.returnValue=false;
		}
	}
}

function AutoTabLQ(hItem, maxLength, linkItem )
{	
	isNumericLQ();
	if (is_mac)
	{
		return;
	}
	else
	{
		var vKeyCode,oItem;
		oItem = eval(linkItem);	
		vKeyCode = window.event.keyCode
		if(vKeyCode==9 && window.event.shiftKey){ return; }
		switch(window.event.keyCode)
		{
			case 37 : return;
			case 39 : return;
			case 16 : return;
			case 46 : return;
		}
		if (window.event.keyCode != 9 )
		{
			if( typeof(oItem) == "object" )
			{					
				if(bAutotab && (String(oItem.value).length ==0) && (String(hItem.value).length == maxLength) && (window.event.keyCode != 8))
				{
					oItem.focus();
				}
			}
		}
	}
	bAutotab = true;
}

bAutotab = true;
function stopAutoTabLQ()
{
	bAutotab = false;
}


// Flash Player version sniffer
var flashTargetMajor
if (flashTargetMajor == "")
{
	flashTargetMajor = 5;
}
var flashTargetMinor = 0;	// The release number (example where 79 is the minor version: 6,0,79,0) - leave as 0 if uncertain

var hasFlash = false,
    hasActiveX = false,
    navPlugins = (navigator.plugins.length > 0),
    ieVer = parseFloat(navigator.appVersion.split("MSIE")[1]);

var fullVersion, majorVersion, minorVersion;

if(navPlugins || (is_ie && is_mac && ieVer >= 5)) {
	var plugin = navigator.plugins["Shockwave Flash"];
	var pluginDescription = plugin.description.split(" ");
	for(var i=0; i<pluginDescription.length; i++) {
		if(!isNaN(parseInt(pluginDescription[i]))) {
			majorVersion = parseInt(pluginDescription[i]);
			minorVersion = parseInt(plugin.description.split("r")[1]);
			break;
		}
	}
	if(majorVersion >= flashTargetMajor && minorVersion >= flashTargetMinor) hasFlash = true;
}
else if(is_win && is_ie) {
	document.write('<script language="VBScript"\>\n');
	document.write('function isHere(chk)\n');
	document.write('  isHere = false\n');
	document.write('  on error resume next\n');
	document.write('  if ScriptEngineMajorVersion > 1 then\n');
	document.write('    isHere = IsObject(CreateObject(chk))\n');
	document.write('  end if\n');
	document.write('end function\n');
	document.write('</script\>');

	//try {
		hasActiveX = isHere("msxml");
		if (!hasActiveX) {
			hasActiveX = isHere("Microsoft.ActiveXPlugin.1");
		}
	//} catch(e) {
	//	hasActiveX = false;
	//}
	
	if(hasActiveX) {
		for(var i=2; i<=flashTargetMajor; i++) {
			if(isHere("ShockwaveFlash.ShockwaveFlash."+i)) majorVersion = i;
		}
	}
	minorVersion = 0;
	if(majorVersion >= flashTargetMajor) hasFlash = true;
}
fullVersion = majorVersion+",0,"+minorVersion+",0";


//Misc Functions from E-Biz
function Trim(str)
{
	var temp = "";
	temp = str;
	temp = temp.replace (/^\s*/, "");
	temp = temp.replace (/\s*$/, "");
	return temp;
}

function Enter1(FormName)
{
	if (globalSearch(FormName) == true)
	{
		return true;
	}
	else
	{
		return false;
	}

}

function globalSearch(FormName) 
{
	var path = new String();
	var SearchString = new String();
	path = document.location.pathname;
	var qry;
	var SelectiveSearch ;

	for(s=0;s<document.formSearch.elements.length;s++)
	{
		if (document.formSearch.elements[s].name == "SearchText")
		{
			var indT = s;
		}

		if (document.formSearch.elements[s].name == "QueryText")                                                        
		{
			var indQ = s;
		}

		if (document.formSearch.elements[s].name == "Coll")                                                        
		{
			var C1 = s;
		}

		if (document.formSearch.elements[s].name == "Coll2")                                                        
		{
			var C2 = s;
		}

		if (document.formSearch.elements[s].name == "site")                                                        
		{
			var se = s;
		}

		if (document.formSearch.elements[s].name == "kb")                                                        
		{
			var kb = s;
		}

		if (document.formSearch.elements[s].name == "box")                                                        
		{
			var B = s;
		}

		if (document.formSearch.elements[s].name == "ps")                                                        
		{
			var ps = s;
		}

		if (document.formSearch.elements[s].name == "om")                                                        
		{
			var om = s;
		}

		if (document.formSearch.elements[s].name == "cs")                                                        
		{
			var cs = s;
		}
	} 
	document.formSearch.elements[C2].value = "home_products, home_support, business_products, business_support";
	document.formSearch.elements[C1].value = "Enterprise, Federal, Wholesale, Corporate Information, LearningCorner";
	SelectiveSearch = "0"
	document.formSearch.elements[B].value = "1";

	SearchString = Trim(document.formSearch.elements[indT].value);

	if(SearchString != "" && SearchString != "keyword")
	{
		document.formSearch.elements[indQ].value = document.formSearch.elements[indT].value;
		document.formSearch.action = FormName;
		return true;
	}
	else
	{
		alert("Please type in something to search for.");
		document.formSearch.elements[indT].focus();
	}
	
	return false;
}


//******************************
/*
** This function will delete offending characters
** Inmplemented to guard against cross-site scripting
*/
function cleanString(InStr){
    InStr = InStr.replace(/\</g,"");
    InStr = InStr.replace(/\>/g,"");
    InStr = InStr.replace(/\"/g,"");
    InStr = InStr.replace(/\'/g,"");
    InStr = InStr.replace(/\%/g,"");
    InStr = InStr.replace(/\;/g,"");
    InStr = InStr.replace(/\(/g,"");
    InStr = InStr.replace(/\)/g,"");
    InStr = InStr.replace(/\&/g,"");
    InStr = InStr.replace(/\+/g,"");
    InStr = InStr.replace(/\=/g,"");
    return InStr;
}


//******************************
/*
** Validates LoopQuals on Bridge Pages (standard and RepID versions)
** Required validation.js (included above in header.asp)
*/

function validateLoopQual(){
	var valid_form = 0;
	
	valid_form=validatePhoneNumber(document.form1.txtAreaCode.value, document.form1.txtPrefix.value, document.form1.txtPhoneNumber.value);
	
	if(valid_form){
		return true;
	}else{
		alert(phone_error);
		return false;
	}
}


//valid only if phone number AND Rep ID are properly formatted (or Rep ID is blank)
function validateRepLoopQual(){
	var valid_form = 0;
	var error_str = "";

	var rep_id=document.form1.repid;
	
	if (validatePhoneNumber(document.form1.txtAreaCode.value, document.form1.txtPrefix.value, document.form1.txtPhoneNumber.value)){
		valid_form = 1;
	}else{
		error_str = phone_error;
	}

	if (rep_id.value != ""){
		if (rep_id.value.length == 6){
			if(validateRepIDFormat(rep_id.value)){
				valid_form = 1;
			}else{
				valid_form = 0;
				error_str = rep_id_error;
			}
		}else{
			valid_form = 0;
			error_str = "The Rep I.D. should contain 6 characters, please try again.";
		}	
	}
		
	if(valid_form){
		return true;
	}else{
		alert(error_str);
		return false;					
	}
}
