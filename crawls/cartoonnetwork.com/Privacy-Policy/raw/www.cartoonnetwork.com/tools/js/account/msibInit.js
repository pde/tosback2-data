
/////////////////////////////////////////////////////////////////
//   MSIB Init Function
/////////////////////////////////////////////////////////////////
//uncomment vars to call a remote server

MSIB.serverArray							= new Array();// server url, key
MSIB.serverArray['dev']						= new Array("http://payp1dev1.cartoonnetwork.com", "", "");
MSIB.serverArray['staging']				= new Array("https://aud-qai.cartoonnetwork.com","9057b825ebf0c0499dd5cabc453bf3a3","386b10d8053");
//MSIB.serverArray['staging']					= new Array("http://staging.cartoonnetwork.com","9057b825ebf0c0499dd5cabc453bf3a3","386b10d8053");
MSIB.serverArray['www']						= new Array("https://audience.cartoonnetwork.com","9057b825ebf0c0499dd5cabc453bf3a3","386b10d8053");

MSIB.getServerEnvironment	= function(){
 // JavaScript Document
	var	s = "www";
	var dmArr = new Array();
	dmArr[0] = "staging.cartoonnetwork.com";
	dmArr[1] = "gcstage.cartoonnetwork.com";
	dmArr[2] = "bgcstage.cartoonnetwork.com";
	dmArr[3] = "swgcstage.cartoonnetwork.com";
	dmArr[4] = "mixitstaging.cartoonnetwork.com";
	dmArr[5] = "fusionfallstaging.cartoonnetwork.com";
	
	for(var i=0; i <= dmArr.length-1; i++){
		if(document.URL.indexOf(dmArr[i]) > -1){
			s = "staging"; 
		}
	}
	return s;			
}

MSIB.currentServerEnvironment		= MSIB.getServerEnvironment();


MSIB.init({
  appid: 'cn',
  serverBaseUrl: MSIB.serverArray[MSIB.currentServerEnvironment][0],
  proxyBaseUrl: '', // relative url for proxy
  encryption: { // development encryption settings
    modulus: MSIB.serverArray[MSIB.currentServerEnvironment][1],
    exponent: MSIB.serverArray[MSIB.currentServerEnvironment][2]
  }
});