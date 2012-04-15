var extIdentifier  = '/outbound/';
var docIdentifier  = '/download';
var mailIdentifier = '/mailto/';

function listenToClicks() { 
	var domains    = ['lehigh.edu','urisldev.net']; 
	var fileTypes  = [".doc",".xls",".exe",".zip",".pdf"];
  var incPaths   = ["/education","/2009plan","/~inis","/commlu","/~www","/~inentin"]
  
	
	if (document.getElementsByTagName) {
    var aTags = document.getElementsByTagName('a'); 

    ANCHOR:
    for (var i = 0; i < aTags.length; i++) { 
      if (aTags[i].hostname.indexOf("usablenet") != -1)         {continue ANCHOR; }
      if (aTags[i]=="")                                         {continue ANCHOR; }
      if (typeof aTags[i].hostname == "undefined")              {continue ANCHOR; }
      if (aTags[i].protocol.indexOf("javascript") != -1)        {continue ANCHOR; }
      if (aTags[i].protocol.indexOf("mailto") != -1)        {startListening(aTags[i],"click",trackMailto); continue ANCHOR; }
      
      DOMAIN:
      for (var j = 0; j < domains.length; j++) {
        
        if (aTags[i].href.indexOf(domains[j]) != -1) {
        
        // Leghigh Code --- Begin ---
        // If the path does not contain incPaths[i]  Then it is "external" for our purposes and we should call     startListening(aTags[i],"click",trackExternalLinks);  And {continue ANCHOR;}
        if (aTags[i].hostname == "www.lehigh.edu") {
          var matchFound = 0;
          for (var k = 0; k < incPaths.length; k++) {
            if (aTags[i].pathname.indexOf(incPaths[k]) != -1)  { matchFound = 1;}
          }
          if (matchFound == 0) {startListening(aTags[i],"click",trackExternalLinks);  continue ANCHOR;}
        }
        // Lehigh Code --- End ---
        
        FILE:
          for (k = 0; k < fileTypes.length; k++){ // then check for file extensions
            if (aTags[i].pathname.indexOf(fileTypes[k]) != -1) {
              startListening(aTags[i],"click",trackDocuments);  continue ANCHOR; }
          }
          if (window.location.href.indexOf(domains[j]) == -1) { // if we are here, we didnt find a file extension.  check to see if we are on the domain of the anchor tag, if not use linker
            // startListening(aTags[i],"click",useLinker);         continue ANCHOR; 
          } else                                               {continue ANCHOR; } // this anchor must be for the same domain, don't do anything special for this.
        }
      }
    startListening(aTags[i],"click",trackExternalLinks);        continue ANCHOR; // this anchor tag didn't match a domain from our array, it must be an external link
    }
    
	}
}


// creates an event handler using browser specific method (addEventListener or AttachEvent) for our 3 functions below.
function startListening (obj,evnt,func) { 
  if (obj.addEventListener) { //debug += obj + "  " + func + "<br /><br />";
    obj.addEventListener(evnt,func,false);
  } else if (obj.attachEvent) { 
    obj.attachEvent("on" + evnt,func);
  }
}

// useLinker:  calls _link(); on the href in the <a> tag in question
function useLinker (evnt) {  //debug += "inside useLinker<br /><br />";
  var lnk; 
  if (evnt.srcElement) { 
    var elmnt = evnt.srcElement;
    while (elmnt.tagName != "A") {
      var newelmnt = elmnt.parentNode;
      elmnt = newelmnt;
    }
    lnk = "http://" + elmnt.hostname + "/" + elmnt.pathname + elmnt.search;
  } else {
    lnk = "http://" + this.hostname + this.pathname + this.search;
  }

  if (typeof(pageTracker) == "object") { // make sure pageTracker is defined
	  pageTracker._link(lnk);
    if (evnt.preventDefault){ evnt.preventDefault();}
  evnt.returnValue = false
	}
}

// trackDocuments:  calls _trackPageview before downloading a file
function trackDocuments (evnt) { //debug += "inside trackDocuments<br /><br />";
  var url = (evnt.srcElement) ? "/" + evnt.srcElement.pathname : this.pathname; 
  url = docIdentifier + url;
  if (typeof(pageTracker) == "object") {//debug += "if pageTracker == object<br /><br />";
	  pageTracker._trackPageview(url);//ew.document.write(debug); 
    overallTracker._trackPageview(url); //ew.document.write(debug); 
  }
}

// trackExternalLinks:  calls _trackPageview before following an external link
function trackExternalLinks (evnt) {  //debug += "inside trackExternalLinks<br /><br />";
  var lnk; 
  if (evnt.srcElement) { 
    var elmnt = evnt.srcElement; 
    while (elmnt.tagName != "A") { 
      var newelmnt = elmnt.parentNode; 
      elmnt = newelmnt; 
    } 
    lnk = extIdentifier +elmnt.hostname + "/" + elmnt.pathname + elmnt.search; 
  } else { 
    lnk = extIdentifier + this.hostname + this.pathname + this.search;
  } 
  if (typeof(pageTracker) == "object") {//debug += "if pageTracker == object<br /><br />";
	 pageTracker._trackPageview(lnk); //ew.document.write(debug); 
   overallTracker._trackPageview(lnk); //ew.document.write(debug); 
	}
  if (typeof(elmnt) != "undefined") {
    window.setTimeout(function(){ location.href=elmnt.href; },200);
  } else { 
    th = this;
    window.setTimeout(function(){ location.href=th.href; },200);
  }
  if (evnt.preventDefault){ evnt.preventDefault();}
  evnt.returnValue = false
}

function trackMailto (evnt) {
  var lnk;
    if (evnt.srcElement) { 
    var elmnt = evnt.srcElement; 
    while (elmnt.tagName != "A") { 
      var newelmnt = elmnt.parentNode; 
      elmnt = newelmnt; 
    } 
    lnk = mailIdentifier + elmnt.href; 
  } else { 
    lnk = mailIdentifier + this.href; 
  } 
  if (typeof(pageTracker) == "object") {//debug += "if pageTracker == object<br /><br />";
	 pageTracker._trackPageview(lnk); //ew.document.write(debug); 
   overallTracker._trackPageview(lnk); //ew.document.write(debug); 
	}

}

startListening(window, 'load', listenToClicks); // register an event listener to run the script when the load event fires.