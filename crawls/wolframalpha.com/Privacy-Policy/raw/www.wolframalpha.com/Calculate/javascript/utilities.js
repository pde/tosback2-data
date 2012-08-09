/**
* This file includes generic utilities and methods 
* Functions in this file should not  reference particular IDs or classes.  
* A function that requires references to particular IDs and such should either be made generic and passed the ID when called
* or it ought to be placed in a separite file relevant to the ID(s) in question. 
*/


function encodeURIComp(s){
  return encodeURIComponent(s).replace(/\+/g,"%2b");
}
function decodeURIComp(s){
  return decodeURIComponent(s.replace(/\+/g," "));
}

/**
* redraw() --  a cross-browser method to re-paint or redraw the particular element it is called on
*/
jQuery.fn.redraw = function(){
  return this.each(function(){
    var tmp = this.style.display;
    this.style.display="none";
    var redrawFix = this.offsetHeight;
    this.style.display=tmp;
    if (this.fireEvent)
      this.fireEvent('onmove'); 
    else $(this).trigger("mousemove");
  }); 
};


/* martyk: functions used to generate and download pdfs and notebooks */
function downloadPDF(id, input, search) {
	var pdf_pos = $("#downloadpdf").offset();
	$("#downloadpdf, #downloadnb").attr("disabled", "disabled");
		$.ajax({
		//not using data: because we don't want to double url encode the data
		url:
			"/input/pdf.jsp?id=" + id + "&" + search.substring(1), //i=" + input,
		complete:
			function(X, txt){
				if ( X.status == 200 ){ //OK
					$("#download-popup").fadeOut(200);
					var url = "pdfGet.jsp?id=" + $.trim(X.responseText) + "&i=" + input;
					window.location = url;
				} else {
					$('#download-popup').fadeOut(200); //TODO: error message?
				}
				$("#download-popup").attr("disabled", "");
			}
	});
	return false;
}

function downloadNotebook(id, input, search) {
  $("#downloadingnb").show();	

  $("#downloadpdf, #downloadnb").attr("disabled", "disabled");

  //TODO: disable pdf link

  $.ajax({
    //not using data: because we don't want to double url encode the data
    url:
      "/input/nb.jsp?id=" + id + "&" + search.substring(1), //i=" + input,
    complete:
      function(X, txt) {
      if (X.status == 200) { //OK
        $("#download-popup").fadeOut(200);

        window.location = "nbGet.jsp?id=" + $.trim(X.responseText) + "&i=" + input;
      }
      else {
        $("#download-popup").fadeOut(200); //TODO: error message?
      }
      $("#download-popup").attr("disabled", "");
    }
  });

  return false;
}


String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
String.prototype.endsWith = function(str) {
	return (this.match(str+"$")==str)
}


/*
 * Gets the parameter value by name from the url passed to it. If no url is passed it will default
 * the url to the window location.
 */
function getURLParam(name, url){  
  if (url == null || url == "") {
	  url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if (results == null)
    return "";
  else
    return results[1];
}

function getScrollPosition(){
  var scrollpos = {};
  scrollpos.y = (typeof document.scrollTop != "undefined" ? document.scrollTop : (typeof window.pageYOffset != "undefined" ? window.pageYOffset : (typeof document.body.parentElement.scrollTop != "undefined" ? document.body.parentElement.scrollTop : 0)));
  scrollpos.x = (typeof document.scrollLeft != "undefined" ? document.scrollLeft : (typeof window.pageXOffset != "undefined" ? window.pageXOffset : (typeof document.body.parentElement.scrollTop != "undefined" ? document.body.parentElement.scrollTop : 0)));
  return scrollpos;
}

/* start pro stuff */


function generateHiddenInputField(name, value){ 
  var el = $("<input />").attr({
    "type" : "hidden",
    "name" : name,
    "value" : value
  });
  return el;
}

function addEllipsis(element, maxheight, initlen) {
  var height = new Number(element.height());
  var maxHeight = maxheight;
  //console.log("Test by Eric:<br />height=" + height + "; maxheight=" + maxHeight + ";<br />");

  var origHtml = element.html();
  var html = element.html();
  if (html.length > initlen) {
    html = html.substring(0, initlen);
  }

  if (height > maxHeight) {
    //var testmessage = "";
    var count = 0;
    while (height > maxHeight) {
      count++;
      //testmessage += "height &gt; maxHeight<br />";
      html = html.substring(0, html.length - 5);
      element.html(html);
      height = new Number(element.height());
      //testmessage += "height=" + height + "<br />";
    }
    //console.log(testmessage);
	//console.log("count=" + count);

	html = html.substring(0, html.length - 5);
	html = html.substring(0, html.lastIndexOf(' '));
	html += "&nbsp;...";
  } else {
  }
  
  element.html(html);
}




// no arg most of the time
function getColoParam(s){
  if (typeof s == "undefined" && typeof server != "undefined") s = server;
  if (typeof s == "undefined") return "";
  var tokens = s.replace("http://","").split(".");
  var colo = tokens[0];
  if (colo.length > 3)
    return colo.substring(3);
  else return "";
}
// no arg most of the time
function getColoHost(s){
  if (typeof s == "undefined" && typeof server != "undefined") s = server;
  if ($.browser.msie || $.browser.opera) return "";
  else if (typeof s != "undefined") return s;
  else return "";
}
function getAuthCookiesParams(){
  var ins = getAuthIns();
  var auths = $.cookie("wa_pro_s"+ins);
  var authu = $.cookie("wa_pro_u"+ins);
  var autht = $.cookie("wa_pro_t"+ins);
  return mapToURLParams({
    "as" : auths,
    "au" : authu,
    "at" : autht
  });
}
// no last arg most of the time
function getColoProofURL(u, s){
  if ($.browser.msie || $.browser.opera) {
    return "/input/subpodaction/?c=" + getColoParam(s) + "&u=" + encodeURIComponent(u);
  } else {
    var sep = "&";
    //if (u.indexOf("?") < 0) sep = "?";
    return getColoHost(s) + u + sep + getAuthCookiesParams();
  }
}

function mapToURLParams(map){
  var buf = "";
  for (var i in map) {
    buf += i + "=" + encodeURIComp(map[i]) + "&";
  }
  return buf;
}
function arrayToURLParams(arr, name){
  var buf = "";
  for (var i in arr) {
    buf += name + "=" + encodeURIComp(arr[i]) + "&";
  }
  return buf;
}

function removeLastAmp(s){
  return removeLastChars(s, '&');
}
function removeLastChars(s, c){
  var cnt = 0;
  var len = s.length;
  for (var idx = 0; idx < len; idx++){
    if (s[len - 1 - idx] == c) cnt++;
    else break;
  }
  s = s.substring(0, len - cnt);
  return s;
}

function xssEscape(s){
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}
function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}


// asdasd#asd -> asdasd
function removeURLAnchor(str){
  if (str.lastIndexOf("#") == -1) return str;
  return str.substring(0, str.lastIndexOf("#"));
}

function getAuthCookiesParamsObj(){
	  var ins = getAuthIns();
	  var auths = $.cookie("wa_pro_s"+ins);
	  var authu = $.cookie("wa_pro_u"+ins);
	  var autht = $.cookie("wa_pro_t"+ins);
	  return {
	    "as" : auths,
	    "au" : authu,
	    "at" : autht
	  };
}

