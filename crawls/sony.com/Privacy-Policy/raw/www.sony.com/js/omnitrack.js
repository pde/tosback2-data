var bLinked = false;

function trackNavLink(prop2,prop3,prop13){
	s.prop1='top nav';
	s.prop2= prop2;
	s.prop3= prop3;
	s.prop13 = prop13
	s.linkTrackVars='prop1,prop2,prop3,prop13';
	s.tl(this,'o',prop13);
}

function trackLink(sPropString, sHierString, sTLString){
	if(!bLinked){
		var s = s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host + window.location.pathname;
		s.linkTrackVars= 'prop1,hier1,eVar28';
		s.linkTrackEvents = 'None';
		s.prop1 = sPropString;
		s.hier1 = sHierString;     
		void(s.tl(this,'o',sTLString));
	}
}

function trackDD(oDropDown){
	var aValues = oDropDown.value.split("|");
	trackLink(aValues[1], aValues[2], aValues[3]);
	document.location = aValues[0];
}

function linkThrough(sPropString, sHierString, sTLString, sURL, sTarget, bVideo){
	sReferrer = document.location;

  if(bVideo == 'true') {
    var aValues = sPropString.split(":");
    var sTail = aValues.pop();
    aValues.push("interacted_video",sTail);
    var sPropStringVideo = aValues.join(":");     
    var sHierStringVideo = sHierString + ':Interacted Video';   
    var sTLStringVideo = sTLString + ':Interacted Video';
    trackLink(sPropStringVideo, sHierStringVideo, sTLStringVideo);
  } else {
    trackLink(sPropString, sHierString, sTLString);
    // SonyStyle search tagging
    if(sURL.indexOf('sonystyle') >= 0) {
      var s = s_gi('sonysonystyle2007prod');
      s.visitorNamespace='sony';
      s.trackingServer='metrics.sonystyle.com';
      s.linkTrackVars = 'eVar28';
      //s.linkTrackEvents = 'event20';
      s.eVar28 = s.c_r('s_kw');
      //s.events = 'event20';
      s.tl(this,'e', sTLString);
    }    
  }    
	bLinked = true;
	if(sTarget != "_blank"){
		if(sURL.indexOf("javascript:") >= 0){
			sCmd = sURL.substr(sURL.indexOf(":") + 1);
			eval(sCmd);
		}else{
			if(sURL.indexOf("?") >= 0){
				document.location = sURL + "&ref=" + encodeURIComponent(sReferrer);
			}else{
				document.location = sURL + "?ref=" + encodeURIComponent(sReferrer);
			}
		}
	}else{
		if(sURL.indexOf("pottermore") > 0){
			window.open(sURL);
    }else if(sURL.indexOf("?") >= 0){
			window.open(sURL + "&ref=" + encodeURIComponent(sReferrer));	
		}else{
			window.open(sURL + "?ref=" + encodeURIComponent(sReferrer));	
		}
	}
}

function heroToggle(sPropString){
	if(!bLinked){
		var s = s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host + window.location.pathname;
		s.linkTrackVars = 'prop5,eVar5,events';
		s.linkTrackEvents = 'event3';
		s.prop5 = 'hero_toggle';
		s.eVar5 = sPropString;
        s.events = 'event3';
		void(s.tl(this,'o','Hero Toggle'));
	}
}

function heroLoad(sPropString, sHierString, sTLString){
    if(!bLinked){
        var s = s_gi(s_account);
        s.dynamicAccountSelection = true;
        s.dynamicAccountList = "sonycorpdev=stage.sony.com";
        s.dynamicAccountMatch = window.location.host + window.location.pathname;
        s.linkTrackVars = 'prop6,hier4,eVar5';
        s.linkTrackEvents = 'None';
        s.prop6 = sPropString;
        s.hier4 = sHierString;
        s.eVar6 = sPropString;        
        void(s.tl(this,'o',sPropString));
    }
}

function videoTrack(sPropString, sHierString, sTLString, sEventString){
	if(!bLinked){
		var s = s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host + window.location.pathname;
		s.linkTrackVars = 'prop5,hier3,eVar5,events';
		s.linkTrackEvents = 'event1,event2';
		s.prop5 = sPropString; 
		s.hier3 = sHierString;
		s.eVar5 = sPropString;
        if(sEventString == 'start') {
            s.events = 'event1';
        } else {
            s.events = 'event2';
        }
		void(s.tl(this,'o',sTLString));
	}
}

function searchLink(sPropString, sHierString, sTLString, sPropString3, sPropString4){
	if(!bLinked){
		var s=s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host+window.location.pathname;
		s.linkTrackVars = 'prop1,hier1,prop3,prop4,eVar7';
		s.linkTrackEvents = 'None';
		s.prop1 = sPropString;
		s.hier1 = sHierString;
		//This s.prop will capture URL data enabling correlations both with eVars and other s.props
		s.prop3 = sPropString3;
		//This s.prop will capture search type (keyword or index) and destination abbreviation (e.g. ss for sonystyle.com); is there any way to pass this in conditionally for each destination site?
		s.prop4 = sPropString4;
		s.eVar4 = sPropString4;
		s.eVar7 = sPropString;
		void(s.tl(this,'o',sTLString));
	}
}

function categoryLink(sPropString, sHierString, sTLString){
	if(!bLinked){
		var s = s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host+window.location.pathname;
		s.linkTrackVars = 'prop5,hier3,eVar5';
		s.linkTrackEvents = 'None';
		s.prop5 = sPropString;
		s.hier3 = sHierString;
		s.eVar5 = sPropString;
		void(s.tl(this,'o',sTLString));
	}
}

function seoTab(sPropString, sHierString, sTLString){
	if(!bLinked){
		var s = s_gi(s_account);
		s.dynamicAccountSelection = true;
		s.dynamicAccountList = "sonycorpdev=stage.sony.com";
		s.dynamicAccountMatch = window.location.host+window.location.pathname;
		s.linkTrackVars = 'prop5,hier3,eVar5';
		s.linkTrackEvents = 'None';
		s.prop5 = sPropString;
		s.hier3 = sHierString;
		s.eVar5 = sPropString;
		void(s.tl(this,'o',sTLString));
	}
}

function trackSearchSubmit() {
	s.linkTrackVars = 'prop5,eVar5,events';
	s.linkTrackEvents = 'event16';
	s.eVar5  = 'search_query|submit';
	s.prop5  = 'search_query|submit';
	s.events = 'event16';
}