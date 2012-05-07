var dmName = location.hostname;

switch(dmName){

case "www.autodesk.co.uk":
	var priAcct = "UA-7428988-1"
	var priDmn = ".autodesk.co.uk";
	break
case "www.autodesk.co.jp":
	var priAcct = "UA-2967772-6"
	var priDmn = ".autodesk.co.jp";
	break
case "www.autodesk.co.za":
	var priAcct = "UA-2967772-7"
	var priDmn = ".autodesk.co.za";
	break
case "www.autodesk.com.au":
	var priAcct = "UA-2967772-8"
	var priDmn = ".autodesk.com.au";
	var secAcct = "UA-2967772-2"
	var secDom = "none"
	break
case "www.autodesk.de":
	var priAcct = "UA-2967772-9"
	var priDmn = ".autodesk.de";
	break
case "www.autodesk.nl":
	var priAcct = "UA-7428988-6"
	var priDmn = ".autodesk.nl";
	break
case "latinoamerica.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "www.autodesk.com.br":
	var priAcct = "UA-2967772-12"
	var priDmn = ".autodesk.com.br";
	break
case "en.autodesk.ca":
	var priAcct = "UA-2967772-15"
	var priDmn = ".autodesk.ca";
	break
case "fr.autodesk.ca":
	var priAcct = "UA-2967772-15"
	var priDmn = ".autodesk.ca";
	break
case "www.autodesk.ca":
	var priAcct = "UA-2967772-15"
	var priDmn = ".autodesk.ca";
	break
case "www.autodesk.com.cn":
	var priAcct = "UA-2967772-16"
	var priDmn = ".autodesk.com.cn";
	break
case "international.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "www.autodesk.cz":
	var priAcct = "UA-2967772-18"
	var priDmn = ".autodesk.cz";
	break
case "www.autodesk.dk":
	var priAcct = "UA-7428988-3"
	var priDmn = ".autodesk.dk";
	break
case "www.autodesk.fi":
	var priAcct = "UA-7428988-5"
	var priDmn = ".autodesk.fi";
	break
case "www.autodesk.fr":
	var priAcct = "UA-2967772-21"
	var priDmn = ".autodesk.fr";
	break
case "www.autodesk.com.hk":
	var priAcct = "UA-2967772-22"
	var priDmn = ".autodesk.com.hk";
	break
case "www.autodesk.hu":
	var priAcct = "UA-2967772-23"
	var priDmn = ".autodesk.hu";
	break
case "www.autodesk.in":
	var priAcct = "UA-2967772-24"
	var priDmn = ".autodesk.in";
	var secAcct = "UA-2967772-2"
	var secDom = "none"
	break
case "asean.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "south-apac.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "www.autodesk.it":
	var priAcct = "UA-2967772-27"
	var priDmn = ".autodesk.it";
	break
case "www.autodesk.co.kr":
	var priAcct = "UA-2967772-28"
	var priDmn = ".autodesk.co.kr";
	break
case "www.autodesk.com.my":
	var priAcct = "UA-2967772-29"
	var priDmn = ".autodesk.com.my";
	var secAcct = "UA-2967772-2"
	var secDom = "none"
	break
case "mexico.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "www.autodesk.co.nz":
	var priAcct = "UA-2967772-31"
	var priDmn = ".autodesk.co.nz";
	var secAcct = "UA-2967772-2"
	var secDom = "none"
	break
case "www.autodesk.no":
	var priAcct = "UA-7428988-4"
	var priDmn = ".autodesk.no";
	break
case "www.autodesk.pl":
	var priAcct = "UA-2967772-33"
	var priDmn = ".autodesk.pl";
	break
case "www.autodesk.pt":
	var priAcct = "UA-2967772-34"
	var priDmn = ".autodesk.pt";
	break
case "www.autodesk.ru":
	var priAcct = "UA-2967772-35"
	var priDmn = ".autodesk.ru";
	break
case "www.autodesk.com.sg":
	var priAcct = "UA-2967772-36"
	var priDmn = ".autodesk.com.sg";
	var secAcct = "UA-2967772-2"
	var secDom = "none"
	break
case "www.autodesk.es":
	var priAcct = "UA-2967772-37"
	var priDmn = ".autodesk.es";
	break
case "saarc.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
case "www.autodesk.se":
	var priAcct = "UA-7428988-2"
	var priDmn = ".autodesk.se";
	break
case "www.autodesk.com.tw":
	var priAcct = "UA-2967772-40"
	var priDmn = ".autodesk.com.tw";
	break
case "adn.autodesk.com":
	var priAcct = "UA-2967772-60"
	var priDmn = "adn.autodesk.com";
	break
case "adnsparks.autodesk.com":
	var priAcct = "UA-2967772-83"
	var priDmn = "adnsparks.autodesk.com";
	break
case "usa.autodesk.com":
	var priAcct = "UA-2967772-2"
	var priDmn = ".autodesk.com";
	break
}


if(priAcct){
	var trackerB = _gat._getTracker(priAcct);
	trackerB._setDomainName(priDmn);
	trackerB._initData();
	trackerB._trackPageview();
}

if(secAcct){
	var trackerA = _gat._getTracker(secAcct);
	trackerA._setDomainName("none");
	trackerA._initData();
	trackerA._trackPageview();
}

	var trackerCom = _gat._getTracker("UA-2967772-42");
	trackerCom._setDomainName("none");
	trackerCom._initData();
	trackerCom._trackPageview();
	
/* Comment out by Sean Shoffstall
	var trackerComAll = _gat._getTracker("UA-2967772-42");
	trackerComAll._setDomainName("none");
	trackerComAll._initData();
	trackerComAll._trackPageview(); */

