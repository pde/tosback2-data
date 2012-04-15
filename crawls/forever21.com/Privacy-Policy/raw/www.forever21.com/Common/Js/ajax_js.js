var xmlHttp = false;
var xmlHttp2 = false;

if (window.XMLHttpRequest) { // Mozilla, Safari,...
	xmlHttp = new XMLHttpRequest();
	xmlHttp2 = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		xmlHttp2 = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			xmlHttp2 = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) { xmlHttp = false; xmlHttp2 = false;}
	}
}

if(!xmlHttp && typeof XMLHttpRequest != 'undefined'){
	xmlHttp = new XMLHttpRequest();
	xmlHttp2 = new XMLHttpRequest();
}
