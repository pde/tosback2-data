
//** COPYRIGHT 2005-2006 - WhosCalling, Inc. **

//!!Do not change variable names!!

var CPMACCOUNTID='200502';
var CPMClientDir='ConstantContact';
var CPMPhoneNumber='8668768464';

// use the following list to block specific IPs (no range or regex accepted)
// var CPBlockList = 'XXX.XX.XXX.XXX,XXX.XX.XXX.XXX';

var CPMUrl
if(location.protocol == 'https:'){
	CPMUrl='https://analyticssl.clickpathmedia.com';
} else {
	CPMUrl='http://analytics.clickpathmedia.com';
}

function RenderPhoneText(num, pat) {
  document.write(GetOfficePhoneText(num, pat));
};

function RenderPhoneImage(num, dir) {
  var CPMClientWebserver=document.domain; // Change this variable to your webserver address ex: 'www.example.com'
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Sep1.gif" alt="-">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(0,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(1,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(2,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Sep2.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(3,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(4,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(5,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Sep3.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(6,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(7,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(8,1) + '.gif">');
  document.write('<img src="http://' + CPMClientWebserver +  '/' + dir + '/Number' + num.substr(9,1) + '.gif">');
};

function GetOfficePhoneText(num, pat) {
  var strResult = "";
  var intDigit = 0;

  for(var i=0;i<pat.length;++i){
	if (pat.charAt(i) == "N") {
		strResult = strResult + num.charAt(intDigit);
		intDigit = intDigit + 1;
	}
	else {
		strResult = strResult + pat.charAt(i);
	}
  }

  if (intDigit < 10) {
	strResult = strResult + num.substr(intDigit);
  }

  return strResult;
};

function DisplayPhoneText(pat) {
	//For backward compatibility
	RenderPhoneText(CPMPhoneNumber,pat);
};

function DisplayPhoneImage(dir) {
	//For backward compatibility
	RenderPhoneImage(CPMPhoneNumber,dir);
};

function GetPhoneText(pat) {
	//For flash compatibility
	return GetOfficePhoneText(CPMPhoneNumber,pat);
};

function GetPhoneTextOffice(num, pat) {
	//For flash compatibility
	return GetOfficePhoneText(num,pat);
};

document.write('<script type="text/javascript" LANGUAGE="javascript" src="');
document.write(CPMUrl + '/JS/' + CPMClientDir + '/clickpathremote.js');
document.write('"><\/sc' + 'ript>');

document.write('<script type="text/javascript" language="javascript" src="');
document.write('https://clicktotalk.whoscalling.com/makeClickToTalk.js');
document.write('"><\/sc' + 'ript>');

function clickToTalk(PhoneNumber)
{
	makeClickToTalk('https://clicktotalk.whoscalling.com/', PhoneNumber, CPGetSessionValue());
	window.setTimeout('CPMLogTraffic(\'104\')', 2000);
}