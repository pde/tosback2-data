
		SpOnENV_SERVER 		= window.location.protocol + '/' + '/www.spiegel.de';
		SpOnENV_SERVER_SSL 	= 'https:/' + '/www.spiegel.de';
	

SpOnENV_ForumSponDeServer='http:/'+'/forum.spiegel.de';

var _sf_startpt=(new Date()).getTime();//********************************************************************
//
//							Copyright (c) 2008 MindLab GmbH
//										 All rights reserved.
//
//====================================================================
//
// Project		: Spiegel Online
// Filename	 : nm_tr_remote.js
//
//====================================================================
//
/**
 * @file
 * This script can be used to implement a pixeltracking on your website
 *
 * @author	 $Felix Engemann$
 * @version	$0.0.1$
 * @date		 $31.08.2006$

 *@listofchanges cha adaption for postbank help-div 2007/09/07
 *@listofchanges cha adaption for postbank clientStat tracking Pixelhelp-div 2007/11/13
 *@listofchanges cha adaption for postbank clientStat tracking Pixelhelp-div 2007/11/16
 *@listofchanges asc generalisation for netmind 4.0 release 2007/12/10
 *@listofchanges uha Anpassung Spon, kein Tracking JS, da Tracker Cookie genutzt wird
 
 */
//
//********************************************************************

//********************************************************************
//config Object
//********************************************************************

function cConfigPixel()
{
	//-----------------------------------------------------
	// members
	//-----------------------------------------------------

	//set to true, if you want to get the params automatically
	this.m_bAutoparams = true;
	
	//set to true, if you want to send the pixel automatically
	this.m_bAutosend = true;

	//The protocol to use for getting the pixel, could be either http
	//or https
	this.m_strPixelProtocol         = location.href.substr(0, location.href.indexOf(":"));
	
	//the servername to get the pixel from (no protocol here, and
	//no path here), you can append a port or prepend an authendication
	//like: user:passwort@myserver.mydomain.com:12345
	//where "user:password@" is the authentication
	//      "myserver.mydomain.com" is the fully qualified servername
	//      ":12345" is a port-Number
	this.m_strPixelServer           = (this.m_strPixelProtocol == "https" ? "count.spiegel.de" : "c.spiegel.de");
	
	//the path to request from the given server, this path could of
	//course include CGI-Parameters
	//example: "/mywebbug?thisismyparameter=value"
	this.m_strPixelPath             = "/nm_trck.gif";
	
	//Send Url by default
	this.m_bSendUrl              = true;
	
	//Send Referrer by default
	this.m_bSendReferrer         = true;
	
	//Send MetaTags by default
	this.m_bSendMetaTags         = true;
	
	//Send Browser Setting, Screen Infos etc.
	this.m_bSendTech             = false;
	
	//Send Browser Setting, Screen Infos etc.
	this.m_bSendUrlHash              = true;
	
	//--------------------------------------------------------
	// metatags to be parsed
	//--------------------------------------------------------
	this.m_aMetatag = new Array(
						"sp.*"
					);
	//--------------------------------------------------------
	// Hasht parameter  to be parsed
	//--------------------------------------------------------
	this.m_aHashParameter = new Array(
					"ref",
					"from"
					);

} // end class cConfigPixel

//==========================================================
// getAutoParams
//==========================================================
function config_getSendUrlHash () {
	return this.m_bSendUrlHash;
}

//==========================================================
// getAutoParams
//==========================================================
function config_getAutoParams () {
	return this.m_bAutoparams;
}

//==========================================================
// getAutoSend
//==========================================================
function config_getAutoSend () {
	return this.m_bAutosend;
}

//==========================================================
// getPixelUrl
//==========================================================
function config_getPixelUrl () {
	return this.m_strPixelProtocol+"://"+this.m_strPixelServer + this.m_strPixelPath;
}

//==========================================================
// getSendUrl
//==========================================================
function config_getSendUrl () {
	return this.m_bSendUrl;
}

//==========================================================
// getSendReferrer
//==========================================================
function config_getSendReferrer () {
	return this.m_bSendReferrer;
}

//==========================================================
// getSendMetatags
//==========================================================
function config_getSendMetatags () {
	return this.m_bSendMetaTags;
}

//==========================================================
// getSendTech
//==========================================================
function config_getSendTech () {
	return this.m_bSendTech;
}

//==========================================================
//Definition of Prototypes
//==========================================================

//methoden zur Klasse hinzufuegen
cConfigPixel.prototype.getAutoParams 	= config_getAutoParams;
cConfigPixel.prototype.getAutoSend 		= config_getAutoSend;
cConfigPixel.prototype.getPixelUrl 		= config_getPixelUrl;
cConfigPixel.prototype.getSendUrl 		= config_getSendUrl;
cConfigPixel.prototype.getSendUrlHash 	= config_getSendUrlHash;
cConfigPixel.prototype.getSendReferrer 	= config_getSendReferrer;
cConfigPixel.prototype.getSendMetatags 	= config_getSendMetatags;
cConfigPixel.prototype.getSendTech 		= config_getSendTech;






//********************************************************************
//Pixel-Object
//********************************************************************
//Contstructor for Pixel-Object
function cRemotePixel(oConfig)
{
	//-----------------------------------------------------
	// members
	//-----------------------------------------------------
	//pixel object constructor
	//this.m_oImage = new Image();
	this.m_arParameterList = new Array();
	this.m_nParameterCount = 0;
	this.m_strPixelURL     = oConfig.getPixelUrl();

	//Configuration
	this.m_oConfig = oConfig;
	this.hasMetatagParams = false;
}//end function cRemotePixel()

//==========================================================
//methode fuer Objekt Pixel: Fuegt einen Parameter hinzu
//==========================================================
function remotepixel_addParameter(key, value)
{
	arPair = new Array(key, value);
	this.m_arParameterList[this.m_nParameterCount] = arPair;
	this.m_nParameterCount++;
}//end function pixel_add_parameter()

//==========================================================
//method for object Pixel: add affiliate
//==========================================================
function remotepixel_addAffiliate(name)
{
	this.addParameter("affiliate", name)	
}//end function remotepixel_addAffiliate(name)

//==========================================================
//method for object Pixel: add url
//==========================================================
function remotepixel_addUrl()
{
	this.addParameter("url", document.URL);
}//end function remotepixel_addAffiliate(name)

//==========================================================
//method for object Pixel: add referrer
//==========================================================
function remotepixel_addReferrer()
{
	this.addParameter("referrer", document.referrer);
}//end function remotepixel_addAffiliate(name)

//==========================================================
//methode fuer Objekt Pixel: senden des Pixels
//==========================================================
function remotepixel_sendData()
{

	strURL = this.m_strPixelURL+"?";
 
	for(i=0; i<this.m_arParameterList.length; i++)
	{
		if (i>0) strURL += "&";
		strURL += escape(this.m_arParameterList[i][0])+"="+escape(this.m_arParameterList[i][1]);
	}//end for(i=0; i<this.m_arParameterList.length; i++) 
	//now set URL on Pixel

	if (this.hasMetatagParams) {
		var oTrackingImg = new Image();
		oTrackingImg.src = strURL;
	}
}//end function remotepixel_sendData()


//==========================================================
//methode fuer Objekt Pixel: auslesen der techdaten
//==========================================================
function remotepixel_getTechData () {
	
	//--------------------------------------------------------
	// variables for general settings
	//--------------------------------------------------------
	var javaOK		= "unknown";
	var cookiesOK = "unknown";
	var browsLang = "unknown";
	var availheight = screen.availHeight;
	var availwidth	= screen.availWidth;
	var colordepth	= screen.colorDepth + " bit";
	var height			= screen.height;
	var width			 = screen.width;
	var title			 = document.title;
	
	//--------------------------------------------------------
	// variables for plugins
	//--------------------------------------------------------
	var flashPlugin		 = "-";
	var flashVersion		= "0";
	var directorPlugin	= "-";
	var wmplayerPlugin	= "-";
	var realplayerPlugin= "-";
	var quicktimePlugin = "-";
	var adobe_svgPlugin = "-";
	var adobe_pdfPlugin = "-";
	
	var agt = navigator.userAgent.toLowerCase();
	var ie	= (agt.indexOf("msie") != -1);
	//accept only higher than MSIE 4
	//otherwise the detectIE() function would not work
	if(ie) {
		ie	= (agt.indexOf("msie 4") == -1) && (agt.indexOf("msie 3") == -1);
	}//end if(ie)
	
	var win = ((agt.indexOf("win")!=-1) || (agt.indexOf("32bit")!=-1));
		
	//--------------------------------------------------------
	// Java and Cookies
	//--------------------------------------------------------
	if (navigator.javaEnabled()==true){javaOK="yes"}else{javaOK="no"}
	
	//--------------------------------------------------------
	//-- cookieEnabled only works in MSIE.
	//--------------------------------------------------------
	if ((navigator.cookieEnabled) && (navigator.cookieEnabled==true)) {cookiesOK="yes"} else {cookiesOK="no"}
	
	//--------------------------------------------------------
	// language
	//--------------------------------------------------------
	if (navigator.language)
		browsLang = navigator.language;
	
	//--------------------------------------------------------
	// Plugins
	// 
	// SVG and Quicktime are not certified Plugins and cause a warning
	// in MSIE 7. Because of this fact those two plugins are not detected.
	// - removed WM Player for same reason
	//--------------------------------------------------------
	if (ie && win) {	 
		directorPlugin = detectIE("SWCtl.SWCtl.1");
		flashPlugin = detectIE("ShockwaveFlash.ShockwaveFlash.1");
		realplayerPlugin = detectIE("rmocx.RealPlayer G2 Control.1");
		//wmplayerPlugin = detectIE("MediaPlayer.MediaPlayer.1"); 
		adobe_pdfPlugin = detectIEAcrobat("Acrobat Reader");
	}//end if (ie && win) 

	else {
		nse = ""; 
		for (var i=0;i<navigator.mimeTypes.length;i++) 
		nse += navigator.mimeTypes[i].type.toLowerCase();
		directorPlugin = detectNS(nse, "application/x-director");
		flashPlugin = detectNS(nse, "application/x-shockwave-flash");
		realplayerPlugin = detectNS(nse, "audio/x-pn-realaudio-plugin");
		//wmplayerPlugin = detectNS(nse, "application/x-mplayer2"); 
		adobe_pdfPlugin = detectNS(nse, "application/pdf");
	}

	
	//save paramters into pixel
	this.addParameter("nm_java", javaOK);
	this.addParameter("nm_cookies", cookiesOK);
	this.addParameter("nm_screen", width + "x" + height);
	this.addParameter("nm_colordepth", colordepth);
	this.addParameter("nm_plugin_flash", flashPlugin);
	this.addParameter("nm_plugin_director", directorPlugin);
	//this.addParameter("nm_plugin_wmplayer", wmplayerPlugin);
	this.addParameter("nm_plugin_realplayer", realplayerPlugin);
	this.addParameter("nm_plugin_acroread", adobe_pdfPlugin);
	this.addParameter("nm_title", title);
	

}//end function pixel_getTechData ()

//==========================================================
//methode zum Auslesen der metatags
//==========================================================
function remotepixel_getMetTags () {
	

	var aMetatag = this.m_oConfig.m_aMetatag;
	
	//Save metatags to track into pixel-parameter-list. validation with regexp match
	var strMetaTags = "";
	for (var i = 0; i < document.getElementsByTagName('meta').length; i++) {
		for (var j = 0; j < aMetatag.length; j++) {
			var re = new RegExp(WildToReg(aMetatag[j]));
			if (document.getElementsByTagName('meta')[i].getAttribute('name')) {
				if ( document.getElementsByTagName('meta')[i].getAttribute('name').match(re) ) { 
					this.hasMetatagParams=true;
					if (document.getElementsByTagName('meta')[i].getAttribute('content')) 
						this.addParameter(document.getElementsByTagName('meta')[i].getAttribute('name'), document.getElementsByTagName('meta')[i].getAttribute('content')); 
					else 
						this.addParameter(document.getElementsByTagName('meta')[i].getAttribute('name'), "-");                                                         
				} // end if document.getElementsByTagName('meta')[i].getAttribute('name').match(re
			} // end if (document.getElementsByTagName('meta')[i].getAttribute('name'))
		}//end for (var j = 0; j < aMetatag.length; j++)
	}//end for (var i = 0; i < document.getElementsByTagName('meta').length; i++)
}// end method remotepixel_getMetTag


//==========================================================
//methode zum Auslesen der per Hash angehängten Parameter
//==========================================================
function remotepixel_getHashParameter () {

	var aParamList = this.m_oConfig.m_aHashParameter;

	var strLoc=(document.location+""); 
	var nPos=strLoc.indexOf("#");
	if (nPos != -1) {
		var strHashQs=strLoc.substring(nPos+1, strLoc.length);
		aParams =  remotepixel_SplitParams(strHashQs); 
		//Save metatags to track into pixel-parameter-list. validation with regexp match
		var strHashParam = "";
		for (var j = 0; j < aParamList.length; j++) {
			if ( aParams[aParamList[j]] ) {
				this.addParameter(aParamList[j],aParams[aParamList[j]]);
			} // end if( aParams[aParamList[j]] )
		}//end for (var j = 0; j < aMetatag.length; j++)
	} // end if nPos != -1)
}// end method remotepixel_getMetTag

//========================================================== 
//remotepixel_SplitParams 
//========================================================== 
function remotepixel_SplitParams(params) { 
        var result=[]; 
        var pairs=params.split("&"); 
        for (var i=0; i < pairs.length; i++) { 
                var kv=pairs[i].split("="); 
                if (kv[1] && kv[1] != "") 
                        result[kv[0]]=kv[1]; 
                else 
                        result[kv[0]]="-";                         
        } 
        return result; 
} 

//==========================================================
//Definition of Prototypes
//==========================================================

//methoden zur Klasse hinzufuegen
cRemotePixel.prototype.addParameter 	= remotepixel_addParameter;
cRemotePixel.prototype.addAffiliate 	= remotepixel_addAffiliate;
cRemotePixel.prototype.addUrl			= remotepixel_addUrl;
cRemotePixel.prototype.addReferrer		= remotepixel_addReferrer;
cRemotePixel.prototype.sendData		 	= remotepixel_sendData;
cRemotePixel.prototype.getTechData		= remotepixel_getTechData;
cRemotePixel.prototype.getMetTags	 	= remotepixel_getMetTags;
cRemotePixel.prototype.getHashParameter	= remotepixel_getHashParameter;






//==========================================================
// Acrobat
//==========================================================
function detectIEAcrobat(name) {

	var acrobat=new Object();
	if (window.ActiveXObject) {
		for (x=2; x<10; x++) {
			try {
				oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");
				if (oAcro) {
					return 'yes';
				}
			}
			catch(e) {}
		} 

		try {
			oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
			if (oAcro4) {
				return 'yes';
			}
		}
		catch(e) {}

		try {
			oAcro7=new ActiveXObject('AcroPDF.PDF.1');
			if (oAcro7) {
				return 'yes';
			}
		}
		catch(e) {}
	}
	return 'no';		
}//end function detectIEAcrobat(name)

//==========================================================
// IE Plugins
//==========================================================

function detectIE(ClassID) { 

	try {
		new ActiveXObject(ClassID);
		return 'yes'; 
	}
	
	catch(e) {
		return 'no';
	}	 
}//end function detectIE(ClassID)

//==========================================================
// Netscape and Firefox Plugins
//==========================================================
function detectNS(strMimetypes, ClassID) { 
	if (strMimetypes.indexOf(ClassID) != -1) 
		if (navigator.mimeTypes[ClassID].enabledPlugin != null) 
			return 'yes'; 
	return 'no';

}//end function detectNS(strMimetypes, ClassID)


//==========================================================
// Convert Wildcard to RegEx
//==========================================================
function WildToReg(str) {

	s = "";
	for (i = 0; i < str.length; i++) {
		c = str.charAt(i);
		switch(c) {
			case '*':
				s = s + ".*";
				break;
			case '?':
				s = s + ".";
				break;

				case '(': case ')': case '[': case ']': case '$':
				case '^': case '.': case '{': case '}': case '|':
				case '\\':
					s = s + "\\";
					s = s + c;
					break;
				
				default:
					s = s + c;
					break;
			}//end switch(c)
		}//end for (i = 0; i < str.length; i++)
		s =	"^" + s + "$";
	 return s;
}//end function WildToReg(str)	


//==========================================================
//function Pixel-Instanz anlegen
//==========================================================
function doPixelInstance(oEvent) {

	oNMConfig      = new cConfigPixel();
	oNMRemotePixel = new cRemotePixel(oNMConfig);
	//Send PartnerName as parameter?
	
	if(oNMConfig.getAutoParams()) {

		//Send Url as parameter?
		if (oNMConfig.getSendUrl())
		{
			oNMRemotePixel.addUrl();
		}//end if (SendUrl)
	
		//Send Hash Parameter as parameter?
		if (oNMConfig.getSendUrlHash())
		{
			oNMRemotePixel.getHashParameter();
		}//end if (SendUrlHash)
			
		//Send referrer as parameter?
		if (oNMConfig.getSendReferrer())
		{
			oNMRemotePixel.addReferrer();
		}//end if (SendReferrer)
	
		if(oNMConfig.getSendMetatags()) {
			oNMRemotePixel.getMetTags();
		}
	
		if(oNMConfig.getSendTech()) {
			oNMRemotePixel.getTechData();
		}
	} // end autoparams
	
	if(oNMConfig.getAutoSend()) {
		oNMRemotePixel.sendData();
	}
} // end function doPixelInstance


//======================================================================================
// Load Time Execution
//======================================================================================
//
// Delivered by SpOn

if( window.addEventListener ) {
	//alert ("window.addEventListener");
	window.addEventListener('load',doPixelInstance,false);
} else if( document.addEventListener ) {
	//alert ("document.addEventListener");
	document.addEventListener('load',doPixelInstance,false);
} else if (window.attachEvent) {
	//alert ("window.attachEvent");
	window.attachEvent('onload', doPixelInstance);
}	else if (document.attachEvent) {
	//alert ("document.attachEvent");
	document.attachEvent('onload', doPixelInstance);
} else {
	doPixelInstance("");
}

function spNm(params) {

	if (typeof params == "object" ) {
		oNMConfig      = new cConfigPixel();
		oNMRemotePixel = new cRemotePixel(oNMConfig);
		if(oNMConfig.getAutoParams()) {

			//Send Url as parameter?
			if (oNMConfig.getSendUrl())
			{
				oNMRemotePixel.addUrl();
			}//end if (SendUrl)
		
			//Send Hash Parameter as parameter?
			if (oNMConfig.getSendUrlHash())
			{
				oNMRemotePixel.getHashParameter();
			}//end if (SendUrlHash)
				
			//Send referrer as parameter?
			if (oNMConfig.getSendReferrer())
			{
				oNMRemotePixel.addReferrer();
			}//end if (SendReferrer)
		
	
			for (param in params) {
				if (params[param])
				{
					oNMRemotePixel.addParameter(param, params[param]);
				}
			}
		
			if(oNMConfig.getSendTech()) {
				oNMRemotePixel.getTechData();
			}
		} // end autoparams
		
	
		strURL = oNMRemotePixel.m_strPixelURL+"?";
		 
		for(i=0; i<oNMRemotePixel.m_arParameterList.length; i++)
		{
			if (i>0) strURL += "&";
			strURL += escape(oNMRemotePixel.m_arParameterList[i][0])+"="+escape(oNMRemotePixel.m_arParameterList[i][1]);
		}
		document.write("<img src='"+strURL+"' width='1' height='1' border='0'/>")
	}
}

function spNmAjax(params) {

	if (typeof params == "object" ) {
		oNMConfig      = new cConfigPixel();
		oNMRemotePixel = new cRemotePixel(oNMConfig);
		if(oNMConfig.getAutoParams()) {

			//Send Url as parameter?
			if (oNMConfig.getSendUrl())
			{
				oNMRemotePixel.addUrl();
			}//end if (SendUrl)
		
			//Send Hash Parameter as parameter?
			if (oNMConfig.getSendUrlHash())
			{
				oNMRemotePixel.getHashParameter();
			}//end if (SendUrlHash)
				
			//Send referrer as parameter?
			if (oNMConfig.getSendReferrer())
			{
				oNMRemotePixel.addReferrer();
			}//end if (SendReferrer)
		
	
			for (param in params) {
				if (params[param])
				{
					oNMRemotePixel.addParameter(param, params[param]);
				}
			}
		
			if(oNMConfig.getSendTech()) {
				oNMRemotePixel.getTechData();
			}
		} // end autoparams
		
	
		strURL = oNMRemotePixel.m_strPixelURL+"?";
		 
		for(i=0; i<oNMRemotePixel.m_arParameterList.length; i++)
		{
			if (i>0) strURL += "&";
			strURL += escape(oNMRemotePixel.m_arParameterList[i][0])+"="+escape(oNMRemotePixel.m_arParameterList[i][1]);
		}
		strURL += '&d=' + (Math.random()*100000);
		//alert(strURL);
		$("#netmindAjaxCountPixel").attr("src", strURL);
	}
}



