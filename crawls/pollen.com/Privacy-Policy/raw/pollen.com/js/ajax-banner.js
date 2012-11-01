var to;
var to2;

function makeHttpRequest(url, callback_function, return_xml)
{
   var http_request = false;

   if (window.XMLHttpRequest) { // Mozilla, Safari,...
       http_request = new XMLHttpRequest();
       if (http_request.overrideMimeType) {
           http_request.overrideMimeType('text/xml');
       }

   } else if (window.ActiveXObject) { // IE
       try {
           http_request = new ActiveXObject("Msxml2.XMLHTTP");
       } catch (e) {
           try {
               http_request = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (e) {}
       }
   }

   if (!http_request) {
       alert('Unfortunatelly you browser doesn\'t support this feature.');
       return false;
   }
   http_request.onreadystatechange = function() {
       if (http_request.readyState == 4) {
           if (http_request.status == 200) {
               if (return_xml) {
                   eval(callback_function + '(http_request.responseXML)');
               } else {
                   eval(callback_function + '(http_request.responseText)');
               }
           } else {
               //alert('There was a problem with the request.(Code: ' + http_request.status + ')');
			   return false;
           }
       }
   }
   http_request.open('GET', url, true);
   http_request.send(null);
}

function loadBanner(xml)
{
	var now = new Date();
    var html_content = xml.getElementsByTagName('content').item(0).firstChild.nodeValue;
    var reload_after = xml.getElementsByTagName('reload').item(0).firstChild.nodeValue;
	var rand = Math.floor(Math.random()*10000);

	// cache-busting
	html_content = html_content.replace(/\[timestamp\]/g,now.getTime()+''+rand);
	
	$(document).ready(function(){
		$("#ajax-banner").fadeOut(750, function () {
		  document.getElementById("ajax-banner").innerHTML = html_content;
		  $(this).fadeIn("normal");
		});
	});
	
	try {
		clearTimeout(to);
	} catch (e) {}

	to = setTimeout("nextAd()", parseInt(reload_after));
}

function loadBanner2(xml)
{
	var now = new Date();
    var html_content = xml.getElementsByTagName('content').item(0).firstChild.nodeValue;
    var reload_after = xml.getElementsByTagName('reload').item(0).firstChild.nodeValue;
	var rand = Math.floor(Math.random()*10000);

	// cache-busting
	html_content = html_content.replace(/\[timestamp\]/g,now.getTime()+''+rand);
	
	$(document).ready(function(){
		$("#ajax-banner2").fadeOut(750, function () {
		  document.getElementById("ajax-banner2").innerHTML = html_content;
		  //$(this).html(html_content);
		  $(this).fadeIn("normal");
		});
	});
	
	try {
		clearTimeout(to2);
	} catch (e) {}

	to2 = setTimeout("nextAd2()", parseInt(reload_after));
}

// pause ads on mouse over
function pauseAds() {
	clearTimeout(to);
	clearTimeout(to2);
}
// resume ads on mouse out
function resumeAds() {
	to=setTimeout("nextAd()", 2000);
	to2=setTimeout("nextAd2()", 2000);
}

