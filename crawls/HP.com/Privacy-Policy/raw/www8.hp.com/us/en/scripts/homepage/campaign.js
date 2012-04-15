	/***CAMPAIGN CHECK***/	
	/* This needs to be done early during page load to extract the campaign id from the URL before the page processes it to obtain the current tab */
	var cXML = new Array();
	
	// EDIT AVAILABLE CAMPAIGNS
	cXML = ['smb01','camp02','camp03','camp04',''];
	// END EDIT AVAILABLE CAMPAIGNS
	
	var isURLcamp = false;
	var src_campaign = new Array('','');
	var campCk = true;
	
	function validURL(u) {
		return !(/[^a-zA-Z0-9_#]+/.test(u));
	}
	
	function getURLparm() {
		var strHref = window.location.href;
		if(strHref.indexOf("_cic_") > -1 ){
			var campName = /(\?|&)_cic_=(\w+)(&*)/i.exec(strHref);
			var strGlobalCampName = validURL(campName[2]);
			if(campName[2] && strGlobalCampName){
				var cleanURL = '';
				if(campName[1]=='?'){ cleanURL = '?';}
				if(campName[1]=='&' && campName[3]=='&'){ cleanURL = '&';}
			window.location = strHref.replace(campName[0],cleanURL);
				for(i=0;i<=cXML.length;i++){
				if(cXML[i] == campName[2]) { isURLcamp=true; return cXML[i]; }
				}
				return 0;
			} else {
				var cleanURL = '';
				if(campName[1]=='?') cleanURL = '?';
				if(campName[1]=='&' && campName[3]=='&') cleanURL = '&';
				window.location = strHref.replace(campName[0],cleanURL);
				return 0;
			}
		} else return 0;		
	}	
	var xmlFile = getURLparm();
	if(Browser.Engine.trident){
    var doc_title=document.title; //Save the title of the page before it gets overwritten by IE bug
	}

/* UnCompressed - Reason: DISABLED_TARGET-LIVECWADEPLOYER# */

/*
Date: 10/19/2011 12:51:50 PM
All images published
*/