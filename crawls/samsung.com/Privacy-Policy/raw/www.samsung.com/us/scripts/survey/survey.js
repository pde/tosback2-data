////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// To prevent both surveys running at the same time visiting
// 2009-10-22 created by Sean Chang
// 2010-10-12 modified for samsung.com/us by Sean Chang
////////////////////////////////////////////////////////////////////////////////////



//try{
//	document.domain="samsung.com";
//}
//catch(e){
//}

if(checkForeSeeAcceptance("fsr.s") == "1"){
	setCookieForSurvey("foresee", "accepted");
}

var siteUrl = document.URL;
var splitUrl = siteUrl.split("/");

//Read the survey cookies if they exists
//var ipe = readCookie("PNcookie355");
var ipe = readCookie("IPERCEPTIONS_702"); 
var fs = readCookie("fsr.r");

var iFlag = false;
var fFlag = false;

var surveyParam = getParam('iperception');

if((surveyParam.length > 0 && surveyParam == 'took') || (checkForeSeeValue("foresee") == "na")){
	setCookieForSurvey("foresee", "na");
}
else{
	//If no survey as been served, do a random call to generate either one
	if(checkForeSeeValue("surveyCase") == "foreseecase"){
		fFlag = true;
	}
	else if(checkForeSeeValue("surveyCase") == "iperception"){
		iFlag = true;
	}
	else{
		if(splitUrl.length < 6){
			if (!ipe && !fs){
				doRandom();
			}
			else if(ipe && !fs){
				fFlag = true;
			}
			else if(!ipe && fs){
				iFlag = true;
			}
		}
		else{
			if(checkForeSeeValue("surveyCase") == "foreseecase"){
				fFlag = true;
			}
		}
	}
}

////////////debug
//iFlag=false;
//fFlag=true;
//////////////////
if(iFlag == true){
	setCookieForSurvey("foresee", "na");
	setCookieForSurvey("surveyCase", "iperception");
}

if((!fs && typeof(fFlag) != 'undefined' && fFlag == true && checkForeSeeValue("foresee") != "na") && 
		((checkForeSeeValue("foresee") != '' && checkForeSeeValue("foresee") == "accepted") || 
		(checkForeSeeValue("surveyCase") == "foreseecase") ||
		(checkForeSeeValue("foresee") == '' && checkForeSeeValue("surveyCase") == ''))){
	var foreSeeAliveSrc = '\<script type="text/javascript" src="/us/foresee/foresee-alive.js"\>\</script\>';
	document.write(foreSeeAliveSrc);
	setCookieForSurvey("surveyCase", "foreseecase");
	//alert("foresee case");//debug
}
else{
	//alert("NOT foresee case");//debug
	var iPerceptionRegulator = '\<script type="text/javascript" src="/us/scripts/survey/doIPerceptionsRegulator.js"\>\</script\>';
	//document.write(iPerceptionRegulator);
}


// Split to serve one of the surveys
function doRandom(){
	var rnd = Math.random();
	if (rnd<0.5){
		iFlag = true;
	} 
	else{
		fFlag = true;
	}
}

function readCookie(NameOfCookie) 
{
    //First check if there is a cookie by checking its length
    if (document.cookie.length > 0)
    {
        // Second we check to see if the cookie's name is stored in the
        // "document.cookie" object for the page.
        // If our cookie name is not present the value -1 is stored
        // in the variable called "begin".
        begin = document.cookie.indexOf(NameOfCookie+"=");
        if (begin != -1) 
        {
			return true;
        }
    }
    
    //else return null as the cookie was not set
    return false;
}

function getParam( name )
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

function checkForeSeeAcceptance(n) {
	var cookiecontent = new String();
	var cookiecontent2 = new String();
	var returnStr = new String();
	if(document.cookie.length > 0) {
		var cookiename = n+ '=';
		var cookiebegin = document.cookie.indexOf(cookiename);
		var cookieend = 0;
		if(cookiebegin > -1) {
			cookiebegin += cookiename.length;
			cookieend = document.cookie.indexOf(";",cookiebegin);
			if(cookieend < cookiebegin) { cookieend = document.cookie.length; }
				cookiecontent = document.cookie.substring(cookiebegin,cookieend);
		}
	}
	//alert("cookieeontent: "+cookiecontent);//debug
	if(cookiecontent.length > 0){
		cookiecontent2 = cookiecontent.split(',');
		for(var i=0;i < cookiecontent2.length;i++){
			var cc = cookiecontent2[i];
			if(cc.substring(0,4) == "\"i\":" && cc.substring(4,5)=="1"){
				returnStr = cc.substring(4,5);
			}
		}
	}
	//return unescape(cookiecontent);
	return unescape(returnStr);
}

function checkForeSeeValue(name){
	var cookiecontent = new String();
	if(document.cookie.length > 0) {
		var cookiename = name+ '=';
		var cookiebegin = document.cookie.indexOf(name);
		var cookieend = 0;
		if(cookiebegin > -1) {
			cookiebegin += cookiename.length;
			cookieend = document.cookie.indexOf(";",cookiebegin);
			if(cookieend < cookiebegin) { cookieend = document.cookie.length; }
				cookiecontent = document.cookie.substring(cookiebegin,cookieend);
		}
	}
	//alert("in checkForeSeeValue, cookiecontent: "+cookiecontent);//debug
	return cookiecontent;
}


function setCookieForSurvey(name, value){
	if(name != null && value != null){
		document.cookie = name + "=" + escape(value) + "; path=/; domain = samsung.com"; 
	}
}

