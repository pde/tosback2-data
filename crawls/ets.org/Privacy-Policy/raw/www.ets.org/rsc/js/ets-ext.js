/**
 * File: ets-ext.js
 * Created by Jeffrey Tsui
 * This file must published.  Do not delete unless all function calls have been removed.
 **/
 
 function hideElementById (id) {
	var el = document.getElementById(id);
	
	if (el != null) {
		el.style.display = "none";
	}
 }
 
 // For Toolbox
 function addBookmark (url, title) {
	// Firefox
	if (window.sidebar) {
		window.sidebar.addPanel(title,url,"");
	}
	// Opera
	else if  (window.opera && window.print) {
		var elem = document.createElement('a');
		elem.setAttribute('href',url);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	}
	// IE
	else if (document.all) {
		window.external.AddFavorite(url,title);
	}
}
