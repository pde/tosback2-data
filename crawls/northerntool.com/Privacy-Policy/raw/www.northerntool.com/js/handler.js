var prefix = window.parent.document.location.protocol + "//";
var site = "www.northerntool.com";
var fullUrl = prefix + site;

function include(filename){
	document.write('<script type="text/javascript" src="'
	+ fullUrl + filename + '"></scr' + 'ipt>'); 
}

function includeExternal(filename){
	document.write('<script type="text/javascript" src="'
	+ filename + '"></scr' + 'ipt>'); 
}

include("/storestatic/en_US/html/mbox/mbox.js");
include("/storestatic/en_US/html/foresee/foresee-trigger11_3.js");
includeExternal("http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
include("/storestatic/en_US/html/js/setup.js");