/** JAVASCRIPT FOR EXPLORE NOAA SUBJECT AREA PORTALS **/
function assignExploreEvents () {
	var nodeImage;

	if (document.getElementById("exploreNOAAItems")) {
		var exploreNodes = document.getElementById("exploreNOAAItems").childNodes;
		for (var i = 0; i < exploreNodes.length; i++) {
			if (exploreNodes[i].nodeName == "LI") {
				nodeImage = exploreNodes[i].getElementsByTagName("img")[0];
				nodeImage.name = nodeImage.alt.replace(" ","_")
				nodeImage.name = nodeImage.name.toLowerCase();
				if (nodeImage.addEventListener) {
					nodeImage.addEventListener("mouseover", exploreOver, false);
					nodeImage.addEventListener("focus", exploreOver, false);
					nodeImage.addEventListener("mouseout", exploreOut, false);
					nodeImage.addEventListener("blur", exploreOut, false);
				} else {
					nodeImage.attachEvent("onmouseover", exploreOver);
					nodeImage.attachEvent("onfocus", exploreOver);
					nodeImage.attachEvent("onmouseout", exploreOut);						
					nodeImage.attachEvent("onblur", exploreOut);						
				}
			}
		}
	}
}

function exploreOver (e) {
	var target = setTarget(e);	
 	var src_orig = target.src;
	var src_swap = target.name + "-over";
	src_swap = src_orig.substring(0,src_orig.lastIndexOf("/") +1) + src_swap + src_orig.substring(src_orig.lastIndexOf("."));
	target.src = src_swap;
}
function exploreOut (e) {
	var target = setTarget(e);
	var src_orig = target.src;
	var src_swap = target.name;
	src_swap = src_orig.substring(0,src_orig.lastIndexOf("/") +1) + src_swap + src_orig.substring(src_orig.lastIndexOf("."));
	target.src = src_swap;
}
 
function setTarget(event) {
	if (!event) var event = window.event;
	if (event.target) {
		targ = event.target;
	} else if (event.srcElement) {
		targ = event.srcElement;
	}
	if (targ.nodeType == 3) targ = targ.parentNode;
	return targ;
}
