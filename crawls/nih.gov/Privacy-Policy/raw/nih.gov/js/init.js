// GENERAL-PURPOSE FUNCTION TO LOAD MULTIPLE FUNCTIONS
function addLoadEvent(func) { 
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

// CREATE TITLE TAGS ON THE FLY - WRITTEN BY RJB 8/3/06
function createTitleTags() { 
	if (!document.getElementsByTagName) return false;
	var images = document.getElementsByTagName("IMG");
	for (var i=0; i < images.length; i++) {
		var image = images[i]
		if (!image.getAttribute("TITLE")) { // Check to see whether title tag already exists.
			if (image.getAttribute("ALT")) { // Check to see whether alt tag exists and it's not empty.
				var alttext = image.getAttribute("ALT");
				if (alttext !== " ") image.setAttribute("title",alttext);
			}
		}
	}
}

// ZEBRA-STRIPE TABLE (Modified by RJB 8/3/06 to allow multiple zebra tables on a page)
function zebraStripeTable() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByTagName("table")) return false;
	var tables = document.getElementsByTagName("table");
	if (tables.length < 1) return false;
	for (var i=0; i < tables.length; i++) {
		if (tables[i].getAttribute("class") == "datatable" || tables[i].getAttribute("className") == "datatable" || tables[i].getAttribute("class") == "datatable tight" || tables[i].getAttribute("className") == "datatable tight") {  // Apparently getAttribute('class') doesn't work in IE (must use getAttribute('className')) because "class" is an ECMAScript reserved name. 
			var rows = tables[i].getElementsByTagName("tr");
			for (j=0; j < rows.length; j++) {
				//manipulate rows
				if (j % 2 == 0) {
					rows[j].className = "even";
				} else {
					rows[j].className = "odd";
				}
			}
		}
	}
}

// HIGHLIGHT LINK TO CURRENT PAGE (REPLACES <A> WITH <STRONG> SO THAT PAGE DOESN'T LINK TO ITSELF)
/*
CLCP v2.1 Clear Links to Current Page
Jonathan Snook
This code is offered unto the public domain
http://www.snook.ca/jonathan/
*/

function clearCurrentLink(){
	if (!document.getElementsByTagName) return false;
    var a = document.getElementById("content").getElementsByTagName("A");
    for(var i=0; i< a.length; i++) {
    	if (!a[i].getAttribute("class")) { // Modified by RJB to look for elements without class attribute - we don't want to modify links that display an icon with the class attribute. 
        	if(a[i].href == window.location.href.split("#")[0])
				removeNode(a[i]);
        }
    }
}

function removeNode(n){
	if (!document.getElementsByTagName) return false;
    if(n.hasChildNodes())
	// gets the text from the link and moves it to the previous node.
        for(var i=0; i<n.childNodes.length; i++) {
            	var strong = document.createElement('strong');
		var label = n.childNodes[i].cloneNode(true);
		strong.appendChild(label);
		n.parentNode.appendChild(strong);
	}
		n.parentNode.removeChild(n);

}

// LOAD THE FUNCTIONS
addLoadEvent(createTitleTags);
addLoadEvent(zebraStripeTable);
addLoadEvent(clearCurrentLink);