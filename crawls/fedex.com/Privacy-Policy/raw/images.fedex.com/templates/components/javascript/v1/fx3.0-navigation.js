leftNav();

function leftNav()
{
	processLeftnav();
	
}
function processLeftnav() {
	var testLink = document.location.href;
	testLink=testLink.replace(/\?INTCMP=.*/,'');
	testLink=testLink.replace(/\&INTCMP=.*/,'');
	testLink = processLink(testLink);
	var navLocal = document.getElementById("nav-local");
	if (navLocal) {
		var navLinks = navLocal.getElementsByTagName("a");
		//alert ("NavLink1"+ navLinks);
		//alert ("NavLength" + navLinks.length);
		var linkLoop=0; 
		for(linkLoop=0;linkLoop<=navLinks.length;linkLoop++) 
		    {
			//alert ("LinkLoop" + linkLoop);
			var currentLink = navLinks[linkLoop];			
		     if (typeof(currentLink) != 'undefined')
			{
			//alert ("Current" + currentLink);
			var urlLoop = processLink(currentLink.href);
			if (urlLoop == testLink) {
				//var currentLink1 = currentLink.parentNode.parentNode.parentNode;
				//alert ("URL" + urlLoop);
				//alert ("testLink" + testLink);	
			        //alert ("Current2" + currentLink);			        
				//expandNav(currentLink,currentLink1);
				expandNav(currentLink);
				break;
		   	}
		    }
		    else {break;}
		}
	}
}
	
function processLink (locationStr){
  // Remove the hostname and protocol
  //var re = new RegExp(".*" + document.location.hostname +"/", "g");
  var re = new RegExp(".*?//.*?/", "");
  locationStr =locationStr.replace(re,"/");
  re = new RegExp("index.html", "");     
  locationStr =locationStr.replace(re,"");
  var q_start = locationStr.indexOf("?");
  if (q_start>0) {
     var remove_query = locationStr.indexOf("query=0"); 
     if (remove_query>0) {
       locationStr = locationStr.substring(0,q_start);
     }
  }
  locationStr = locationStr.replace(re,"");
  if (locationStr.indexOf("WORKAREA")) {
    var r1 = new RegExp(".*WORKAREA/.*?/unsecure","g");
    locationStr = locationStr.replace(r1,"");
    r1 = new RegExp(".*WORKAREA/.*?/secure","g");
    locationStr = locationStr.replace(r1,"");
    if (locationStr.indexOf("WORKAREA")) {
      r1 = new RegExp(".*WORKAREA/.*?/","g");
      locationStr = locationStr.replace(r1,"/");
    }
  }
return locationStr;
}

//function expandNav(NavLink,NavLink1) {
function handleLink (id) {
		var link = document.getElementById(id);
		link.className="on";
		var ulTag = link.parentNode.getElementsByTagName("ul")[0];
		if (ulTag && ulTag.style.display=="none") {
			ulTag.style.display="block";
		}

}
function expandNav(NavLink) {
	NavLink.className="on";
	var id = NavLink.getAttribute("id");
	handleLink(id);
	if (id.indexOf>0) {
		var spanTag = document.createElement("span");
		spanTag.className="on";
		spanTag.innerHTML = NavLink.text;
		NavLink.parentNode.insertBefore(spanTag,NavLink);
		NavLink.parentNode.removeChild(NavLink);
	}
	while( id.indexOf("-")>0 ){
		var index = id.lastIndexOf("-");
		id=id.substring(0,index);
		handleLink(id);
	}
}
