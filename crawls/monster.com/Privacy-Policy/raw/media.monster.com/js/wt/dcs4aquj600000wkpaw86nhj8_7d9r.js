
var gDomain = "cookie.monster.com";
var gDcsId = "dcs4aquj600000wkpaw86nhj8_7d9r";
var gFpc = "WT_FPC";
var gFpcDom = ".monster.com.ph";
// UPDATE CLICK TRACKING DCS ID BELOW if necessary
var gClickDcsId = "DCS000007_2Q9M";
var gClickTracking = false; 

var gConvert = true;


if ((window.location.hostname == "www.monster.com") || (window.location.hostname == "my.monster.com")) {
	if ((window.location.pathname == "/" ) || (window.location.pathname == "/home.aspx") || (window.location.pathname == "/indextest.asp")) {
			gClickTracking = true;
		}
	}

if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)){
	document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'><\/scr"+"ipt>");
}
var gService = false;


var gTimeZone = 8; 

document.write("<scr"+"ipt type='text/javascript' src='"+(window.location.protocol.indexOf('https:')==0?'https://securemedia.newjobs.com':'http://media.monster.com')+"/js/wt/DCSgeneric_main.js'><\/scr"+"ipt>");

