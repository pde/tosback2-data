var strUserAgent = new String(navigator.userAgent);
var arrUA = strUserAgent.split("MSIE ");
var browserValue = parseFloat(arrUA[1]);

var cssProperty = "<style type='text/css'>";
cssProperty += "#section-nav li.navItem ul {display:none}";
if (navigator.userAgent.indexOf('MSIE') != -1 && browserValue >= 7){
cssProperty += "#section-nav li.sfhover ul {display:block;left: auto;}";
}
else {
	cssProperty += "#section-nav li:hover ul, #section-nav li.sfhover ul {display:block;left: auto;}";
}
cssProperty += "</style>";		
document.write(cssProperty);

/* DEAL WITH FLASHING BACKGROUND IMAGES IN IE6 */

fixFlashingBackground= function() {
    try {
        if(document.execCommand && navigator.userAgent.indexOf('MSIE') > 0) { 
            document.execCommand("BackgroundImageCache", false, true);
        }
    } catch(err) {}
}

usat.page.addLoadEvent(fixFlashingBackground);

sfHover = function() {
	try {
		var sfEls = document.getElementById("section-nav").getElementsByTagName("li");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}
	}
	catch(err) {}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

navhideflash = function(showhide) {
	if (navigator.userAgent.indexOf('Safari') != -1){	
		if (showhide == "hide") {		
			if (document.getElementById('njMainLeft').innerHTML.toUpperCase().indexOf('OBJECT')!= -1) {	
				document.getElementById('njMainLeft').style.visibility='hidden';
			}
			if (document.getElementById('njLeftMiddle1').innerHTML.toUpperCase().indexOf('OBJECT')!= -1) {	
				document.getElementById('njLeftMiddle1').style.visibility='hidden';		
			}
			if (document.getElementById('Adv6').innerHTML.toUpperCase().indexOf('OBJECT')!= -1) {	
				document.getElementById('Adv6').style.visibility='hidden';		
			}
		}
		if (showhide == "show") {
			if (document.getElementById('njMainLeft').style.visibility='hidden') {
				document.getElementById('njMainLeft').style.visibility='visible';
			}
			if (document.getElementById('njLeftMiddle1').style.visibility='hidden') {
				document.getElementById('njLeftMiddle1').style.visibility='visible';
			}
			if (document.getElementById('Adv6').style.visibility='hidden') {
				document.getElementById('Adv6').style.visibility='visible';
			}
		}
	}
}//fx
