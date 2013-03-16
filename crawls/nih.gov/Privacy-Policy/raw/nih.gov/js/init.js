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

// REMOVE HREF ATTRIBUTE FROM <A> AND ADD "DISABLEDLINK" CLASS FOR LINKS TO CURRENT PAGE
function removeCurrentPageLinks(){
	if (!document.getElementsByTagName) return false;
    var a = document.getElementById("content").getElementsByTagName("A");
    for(var i=0; i< a.length; i++) {
		if(a[i].href == window.location.href.split("#")[0]) {
			a[i].removeAttribute("href");
			$(a[i]).addClass("disabledlink"); // jQuery method
        }
    }
}

// LOAD THE FUNCTIONS
addLoadEvent(createTitleTags);
addLoadEvent(zebraStripeTable);
addLoadEvent(removeCurrentPageLinks);