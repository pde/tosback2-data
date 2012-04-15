if ((document.URL.indexOf('wsj') > 0 || document.URL.indexOf('barrons') > 0 || document.URL.indexOf('smart') > 0)
        && (document.URL.indexOf('jp') == -1 && document.URL.indexOf('cn') == -1 && document.URL.indexOf('jobs.wsj.com') == -1 && document.URL.indexOf('customercenter') == -1)  ) {
        dojo.provide("dj.widget.networkHat.hat");
    }

hat = {  
         
   init: function() {
        var that = this;  
        this.currId = this.getSelectedProduct(); 
        this.partyHatMoreDropdown = document.getElementById("partyhat_more_dropdown"); 
        this.oHatFBButton = document.getElementById("hat_fb_button");
        this.oHatTwtButton = document.getElementById("hat_twt_button");
  
        if (window.addEventListener) {
          this.partyHatMoreDropdown.addEventListener("click", that.moredropdown, false);
          if (typeof this.oHatFBButton!=="undefined" && this.oHatFBButton)
          {   this.oHatFBButton.addEventListener("click", that.showFacebookOverlay, false); }     
          window.addEventListener("click", that.hideOverlays, false);
          if (typeof this.oHatTwtButton!=="undefined" && this.oHatTwtButton)
          {   this.oHatTwtButton.addEventListener("click", that.showTwitterOverlay, false);}    
        }
        else { 
          this.partyHatMoreDropdown.attachEvent("onclick", that.moredropdown);
          if (typeof this.oHatFBButton!=="undefined" && this.oHatFBButton)
          {   this.oHatFBButton.attachEvent("onclick", that.showFacebookOverlay); }           
          document.attachEvent("onclick", that.hideOverlays);
          if (typeof this.oHatTwtButton!=="undefined" && this.oHatTwtButton)
          {   this.oHatTwtButton.attachEvent("onclick", that.showTwitterOverlay); }            
        }   
   },

  moredropdown: function(ev) {
  hat.hideFacebookOverlay();
  hat.hideTwitterOverlay(); 
  var selElem = hat.partyHatMoreDropdown.parentNode;
    if (selElem.className.match(/hat_dd_selected/)){
      selElem.className = selElem.className.replace("hat_dd_selected","");
    }
    else { 
      selElem.className = selElem.className + " hat_dd_selected"; 
    }
    hat.StopEvent(ev);
  }, 
  
  hideMoreDropdown: function() {
      var selElem = hat.partyHatMoreDropdown.parentNode;
      if (selElem.className.match(/hat_dd_selected/)){
        selElem.className = selElem.className.replace("hat_dd_selected","");
      }      
      //selElem.className="hat_tab_dropdown";
  }, 
    
  showFacebookOverlay: function(ev) {
    hat.hideOverlays();
    this.oHatFBLikeOverlay = document.getElementById("fb_like_overlay");  
    this.oHatFBLikeOverlay.className = "hat_overlay hat_overlay_fb";
    if (!window.frames["facebook_iframe"]) { //create iframe only if it doesn't exist
      var fbItems = hat.facebookURL().split("|"); 
      fbULEle = document.createElement("ul");
      for(var i=0;i<fbItems.length;i++){
        var fbLIEle=hat.createLIElement(fbItems[i].split(",")[1]+" on Facebook","hat_fb_icon");
        var fblink =  "http://www.facebook.com/plugins/like.php?href='http://www.facebook.com/"+fbItems[i].split(",")[0]+"&layout=button_count&send=false&show_faces=false&width=90'";
        var ifrm = hat.createIFRAMEElement("facebook_iframe",fblink,200,21);
        fbLIEle.appendChild(ifrm);
        fbULEle.appendChild(fbLIEle);
      }
      this.oHatFBLikeOverlay.appendChild(fbULEle);
    }
    hat.StopEvent(ev);
  },  
  
  createLIElement: function(str,iconId){
    var LIEle = document.createElement("li");
    h4Ele = document.createElement("h4");
    LIEle.appendChild(h4Ele);
    SpanEle = document.createElement("span");
    SpanEle.className="icon";
    SpanEle.setAttribute("id",iconId);
    h4Ele.appendChild(SpanEle);   
    strNode=document.createTextNode(str);
    h4Ele.appendChild(strNode);
    return LIEle;
  },

  createIFRAMEElement: function(name,link,width,height){
    var ifrm = document.createElement("IFRAME"); 
    ifrm.setAttribute("name",name);
    ifrm.setAttribute("id",name);    
    ifrm.setAttribute("src",link);
    ifrm.setAttribute("frameBorder",0);
    ifrm.style.width = width+"px"; 
    ifrm.setAttribute("allowtransparency","true");
    ifrm.setAttribute("scrolling","no");    
    ifrm.style.height = height+"px"; 
    return ifrm;
},  

  hideFacebookOverlay: function() {    
    this.oHatFBLikeOverlay = document.getElementById("fb_like_overlay");
    if (typeof this.oHatFBLikeOverlay!=="undefined" && this.oHatFBLikeOverlay)
    {   this.oHatFBLikeOverlay.className = "hat_overlay hat_overlay_fb hidden";  }  
  },
  
  showTwitterOverlay: function(ev) {
    hat.hideOverlays();
    this.oHatTwtLikeOverlay = document.getElementById("twitter_overlay");  
    this.oHatTwtLikeOverlay.className = "hat_overlay hat_overlay_twitter";
    if (!window.frames["twitter_iframe"]) { //create iframe only if it doesn't exist
      var twtItems = hat.twitterURL().split("|");
      twULEle = document.createElement("ul");
      for(var i=0;i<twtItems.length;i++){
        var twtLIEle=hat.createLIElement(twtItems[i].split(",")[1]+" on Twitter","hat_twt_icon");
            var twtlink = "http://platform.twitter.com/widgets/follow_button.html?screen_name="+twtItems[i].split(",")[0]+"&amp;show_count=true&amp;show_screen_name=true";
        var ifrm = hat.createIFRAMEElement("twitter_iframe",twtlink,250,21);
        ifrm.setAttribute("src",twtlink);
        twtLIEle.appendChild(ifrm);
        twULEle.appendChild(twtLIEle);
      }
      this.oHatTwtLikeOverlay.appendChild(twULEle);
    }
    hat.StopEvent(ev);    
  },
  
  hideTwitterOverlay: function() {
    this.oHatTwtLikeOverlay = document.getElementById("twitter_overlay");  
    if (typeof this.oHatTwtLikeOverlay!=="undefined" && this.oHatTwtLikeOverlay)
    {  this.oHatTwtLikeOverlay.className = "hat_overlay hat_overlay_twitter hidden";  } 
  },
     
  facebookURL: function() {
   if (this.currId.match(/wsj_asia/)) { return "wsjasia, WSJAsia"; }
   else if (this.currId.match(/wsj_india/)) { return "wsjindia, WSJ India"; }
   else if (this.currId.match(/wsj_eu/)) { return "pages/The-Wall-Street-Journal-Europe/124739154250536, WSJEurope"; }
   else if (this.currId.match(/wsjpro_eu/)) { return "pages/The-Wall-Street-Journal-Europe/124739154250536, WSJEurope"; }
   else if (this.currId.match(/wsjpro_asia/)) { return "wsjasia, WSJAsia"; }
   else if (this.currId.match(/wsj/)) { return "wsj, WSJ"; }
   else if (this.currId.match(/bol/)) { return "barronsonline, Barron's"; }
   else if (this.currId.match(/mw/)) { return "marketwatch, Marketwatch"; }
   else if (this.currId.match(/sm/)) { return "SmartMoney, SmartMoney"; }
   else if (this.currId.match(/atd/)) { return "allthingsd, AllThingsD"; }
   else if (this.currId.match(/fins/)) { return "FINSfinancecareers,FINS Finance|FINStechcareers,FINS Technology|FINSsalesmarketingcareers,FINS Sales & Marketing"; }
   else { return "wsj, WSJ"; }
  },
  
  twitterURL: function() {
   if (this.currId.match(/wsj_eu/)) { return "wsjeurope, WSJEurope"; }
   else if (this.currId.match(/wsj_india/)) { return "wsjindia, WSJ India"; }
   else if (this.currId.match(/wsjpro_eu/)) { return "wsjeurope, WSJEurope"; }
   else if (this.currId.match(/wsjpro_asia/)) { return "wsjasia, WSJAsia"; }
   else if (this.currId.match(/wsj_pro/)) { return "wsj, WSJ"; }
   else if (this.currId.match(/wsj_jp/)) { return "WSJJapan, WSJJapan"; }
   else if (this.currId.match(/wsj_ch/)) { return "wsjchina, WSJChina"; }
   else if (this.currId.match(/wsj_asia/)) { return "wsjasia, WSJAsia"; }
   else if (this.currId.match(/wsj_sp/)) { return "WSJAmericas, WSJAmericas"; }      
   else if (this.currId.match(/wsj/)) { return "wsj, WSJ"; }
   else if (this.currId.match(/bol/)) { return "barronsonline, Barron's"; }
   else if (this.currId.match(/mw/)) { return "MarketWatch, MarketWatch"; }
   else if (this.currId.match(/sm/)) { return "SmartMoney, SmartMoney"; }
   else if (this.currId.match(/atd/)) { return "allthingsd, AllThingsD"; }
   else if (this.currId.match(/fins/)) { return "FINSider,FINS Finance Careers|techFINSider,FINS Technology Careers|salesFINSider,FINS Sales Careers|mktgFINSider,FINS Makerting Careers"; }
   else { return "wsj, WSJ"; }
  },
  
  getSelectedProduct: function(){
    var hatLIs= document.getElementById('hattabs').children;
    for(i=0;i<hatLIs.length;i++){
      if(hatLIs[i].className.match(/current/)) return hatLIs[i].id;
    }
    return "hat_tab_wsj";
  },
  
  StopEvent: function(pE){
     if (!pE)
       if (window.event)
         pE = window.event;
       else
         return;
    if (pE.cancelBubble != null)
       pE.cancelBubble = true;
    if (pE.stopPropagation)
       pE.stopPropagation();
    if (pE.preventDefault)
       pE.preventDefault();
    if (window.event)
       pE.returnValue = false;
    if (pE.cancel != null)
       pE.cancel = true;
  },
  
  hideOverlays: function(){
    hat.hideFacebookOverlay();
    hat.hideTwitterOverlay();
    hat.hideMoreDropdown();
  }
  
};
hat.init();
