function submit_search(){ document.SiteSearchForm.submit(); }

function bt_rollover(ref, classRef) { eval(ref).className = classRef; } 

function create_button(text, href, css_class, onclick_evt, onmouseover_evt, onmouseout_evt, tabindex) {
	var t = "";
	if (( document.getElementById )||( document.all )) {
		// browser implements part of W3C DOM HTML
		// Gecko, Internet Explorer 5+, Opera 5+
		// Internet Explorer 4 or Opera with IE user agent
		t = "<div class=" + css_class + "><a href=\"" + href + "\" class=" + css_class 
		  + " onFocus='bt_rollover(this, \"" + css_class + "-over\")'"
		  + " onBlur='bt_rollover(this, \"" + css_class + "\")'";
		  
		if (onclick_evt) { t = t + " onClick=\"" + onclick_evt + "\""; }
		if (onmouseover_evt) { t = t + " onMouseOver=\"" + onmouseover_evt + "\""; }
		if (onmouseout_evt) { t = t + " onMouseOut=\"" + onmouseout_evt + "\""; }
		if (tabindex) { t = t + " tabindex=\"" + tabindex + "\""; }
		t = t + ">" + text + "<\/a><\/div>"; 

	} else if ( document.layers ) {
		// Netscape 4
		t = "<input type=submit  name=" + text + " value=" + text + " alt=" + text + " class=" + css_class + ">"; 
	}
	document.write(t);
}

function jsInclude(jsFile) {

      document.write('<scr' + 'ipt type="text/javascript" src="' + jsFile + '"></scr' + 'ipt>'); 

}

function submit_search(){ 
	document.SiteSearchForm.submit(); 
}

jsInclude( "/www/en_US/js/search/jquery-1.2.6.js" );
jsInclude( "/www/en_US/js/search/jquery.autocomplete.js" );
jsInclude( "/www/en_US/js/search/search-lite.js" );
