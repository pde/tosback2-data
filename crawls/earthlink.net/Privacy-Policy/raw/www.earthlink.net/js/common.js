// JavaScript Document
var d = document;

// Detect Mouse X/Y
if( document.captureEvents && Event.MOUSEMOVE ) {
  //remove this part if you do not need Netscape 4 to work
  document.captureEvents( Event.MOUSEMOVE );
}
//document.onmousemove = alertCoord;

function alertCoord(e) {
  if( !e ) {
    if( window.event ) {
      //Internet Explorer
      e = window.event;
    } else {
      //total failure, we have no way of referencing the event
      return;
    }
  }
  if( typeof( e.pageX ) == 'number' ) {
    //most browsers
    xcoord = e.pageX;
    ycoord = e.pageY;
  } else if( typeof( e.clientX ) == 'number' ) {
    //Internet Explorer and older browsers
    //other browsers provide this, but follow the pageX/Y branch
    xcoord = e.clientX;
    ycoord = e.clientY;
    var badOldBrowser = ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||
     ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||
     ( navigator.vendor == 'KDE' )
    if( !badOldBrowser ) {
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //IE 4, 5 & 6 (in non-standards compliant mode)
        xcoord += document.body.scrollLeft;
        ycoord += document.body.scrollTop;
      } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE 6 (in standards compliant mode)
        xcoord += document.documentElement.scrollLeft;
        ycoord += document.documentElement.scrollTop;
      }
    }
  } else {
    //total failure, we have no way of obtaining the mouse coordinates
    return;
  }
  //window.alert('Mouse coordinates are ('+xcoord+','+ycoord+')');
}

function showHide(lyrId, prop, xoff, yoff) {
	var lyrObj = (d.layers)?d[lyrId]:d.all?d.all[lyrId].style:d.getElementById(lyrId).style;
	lyrObj.left = xcoord-xoff+"px";
	lyrObj.top = ycoord+yoff+"px";
	lyrObj.display = prop;
}

function showDiv(id) {
	var Obj = document.getElementById(id);
	if(Obj && Obj.style.display != "block" ) Obj.style.display = "block";
}
function hideDiv(id) {
	var Obj = document.getElementById(id);
	if(Obj && Obj.style.display != "none") Obj.style.display = "none";		
}
function hideShowDiv(id) {
	var Obj = document.getElementById(id);
	if(Obj && Obj.style.display == "none") Obj.style.display = "block";
	else if(Obj) Obj.style.display = "none";		
}
function showSub(obj,cname) { obj.parentNode.className = cname+"-show"; }
function hideSub(obj,cname) { obj.parentNode.className = cname; }
// Auto Tab
var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e) {
  var keyCode = (isNN) ? e.which : e.keyCode; 
  var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
  if(input.value.length >= len && !containsElement(filter,keyCode)) {
    input.value = input.value.slice(0, len);
    input.form[(getIndex(input)+1) % input.form.length].focus();
  }

  function containsElement(arr, ele) {
    var found = false, index = 0;
    while(!found && index < arr.length)
    if(arr[index] == ele) found = true;
    else index++;
    return found;
  }

  function getIndex(input) {
    var index = -1, i = 0, found = false;
    while (i < input.form.length && index == -1)
    if (input.form[i] == input)index = i;
    else i++;
    return index;
  }
  return true;
}

// Store
function comp_ah(e,id) {
	if (!e.checked) { showDiv(id); } else { hideDiv(id); }
}
function comp_ag(e) {
	var comp_ag_array = new Array("mon","tue","wed","thu","fri","sat","sun");	
	for (var i = 0; i < comp_ag_array.length; i++) {
		var temp = comp_ag_array[i];	
			if (e.checked) {
				d.getElementById(temp).disabled = true;
			} else {
				d.getElementById(temp).disabled = false;
			}
	}
}
function focus_comp_ab_wizard(id,id_uncheck) {
	d.getElementById(id_uncheck).checked = false;
	d.getElementById(id).checked = true;
}
function applyTextFieldStyle(id, myStyle) {
		d.getElementById(id).style.className = myStyle;
}

//Sized Popup window
function wOpener(url, name, h, w, pram) {    		
  if(pram == '') {
    var args = 'width='+h+',height='+w+',toolbar=no,location=no,resizable=no,directories=no,status=no,menubar=no,scrollbars=no,x=200,y=300';
  } else {
    var args = 'width='+h+',height='+w+','+pram;
  }
  if (typeof(popupWin) != "object"){
    popupWin = window.open(url,name,args);
  } else {
    if (popupWin.closed){ 
      popupWin = window.open(url,name,args);
    }
  }
  popupWin.focus();
  return false;
}
// Print Functions
function printThis() { this.focus(); window.print(); }
function printSelf() { self.focus(); self.print(); }	
function printIframe(iframe) { iframe.focus(); iframe.print(); }
function printDiv(id) {
	var prtContent = document.getElementById(id);
	var WinPrint = window.open('','','left=0,top=0,width=1,height=1,t oolbar=0,scrollbars=0,status=0');
	WinPrint.document.write(prtContent.innerHTML);
	WinPrint.document.close(); WinPrint.focus(); WinPrint.print(); WinPrint.close();
}

// Jump Menu
function jumpto(url){	
	if (url != "null") { 
		var b = document.getElementsByTagName('base');
	 	if (b && b[0] && b[0].href) {
	  		 if (b[0].href.substr(b[0].href.length-1) == '/' && url.charAt(0) == '/') url = url.substr(1);
	   		 url = b[0].href + url;		
	   	}
		location.href = url;
		}
}

// Redirect stand alone tab access
function tabRedirect(chkVar, url) {	
	if(isDefined(chkVar) || isNull(url)) return;	
	window.location = setURL(url);	
}
function isDefined(variable) { return eval('(typeof('+variable+') != "undefined");'); }
//  n  is  null  (or undefined)
function isNull(n) { return ( n == undefined || n == null ) };

function setURL(url) {
	var b = document.getElementsByTagName('base');
	if (url != "null" && b && b[0] && b[0].href) {
	  		if (b[0].href.substr(b[0].href.length-1) == '/' && url.charAt(0) == '/')
	     		url = url.substr(1);
	   		url = b[0].href + url;
		}
	return url;
}

// Function URL parameter 
function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}

// Read email url parameter and add to links
function addImsEmail(l) {
	var email = getURLParam("e12");
 	if(email!="") l.href += "&e12=" + email;
}
	
//Global Google Search Link ID
function setLinkId(){
    var linkid = -1;
    if(document.global_search.area.value == "earthlink-ss"){ linkid = "1010729"; }
    else { linkid = "1010730"; }
}

// Popup div with iframe cover
function hideIPop(div, iframe) {
	hideDiv(iframe); hideDiv(div); showSelectBox();
}

function iPop(div, iframe, objpos, xoff, yoff) {
	var t=0,l=0;
	var state=false; 
	var DivRef = document.getElementById(div);
	var IfrRef = document.getElementById(iframe);
 	var ObjPos = document.getElementById(objpos); 	
	if (DivRef.style.display=="none"||DivRef.style.display=="") { state=true; } else { state=false; }	 
   	if(state) {    		
    	IfrRef.style.width = xoff+"px";
    	IfrRef.style.height = DivRef.offsetHeight+"px";
			
		t=findPosY(ObjPos)+yoff
		l=findPosX(ObjPos)-xoff+ObjPos.offsetWidth/2;
		DivRef.style.top = t+"px";
    	DivRef.style.left = l+"px";
    	IfrRef.style.top = t+"px";
    	IfrRef.style.left = l+"px";
    		
    	DivRef.style.display = "block";
    	DivRef.style.zIndex = 999;
        IfrRef.style.zIndex = DivRef.style.zIndex - 1;
    	IfrRef.style.display = "block";  
    	
    	// hides dropdown for the MC/ST drop down menu
    	if (document.location.href.indexOf('www.earthlink.net') > 0 || (document.location.href.indexOf('wwwi-likeable') > 0)) {
    		hideSelectBox(); 
    	}
    	
   	} else {
    	DivRef.style.display = "none";
    	IfrRef.style.display = "none";
   	}
}

//findPosX and findPosY are included only to put the div over the dropdownbox.
//They are not necessary in order to position the iFrame under the div
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} else if (obj.x) curleft += obj.x;
	return curleft;
}
function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} else if (obj.y) curtop += obj.y;
	return curtop;
}

function getWindowSize() {
	var w = {};
	if (self.innerHeight) { // all except Explorer
		w.w = self.innerWidth;
		w.h = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		w.w = document.documentElement.clientWidth;
		w.h = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		w.w = document.body.clientWidth;
		w.h = document.body.clientHeight;
	}
	if (self.pageYOffset) { // all except Explorer
		w.l = self.pageXOffset;
		w.t = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
		w.l = document.documentElement.scrollLeft;
		w.t = document.documentElement.scrollTop;
	} else if (document.body) { // all other Explorers
		w.l = document.body.scrollLeft;
		w.t = document.body.scrollTop;
	}
	var test1 = document.body.scrollHeight, test2 = document.body.offsetHeight;
	if (test1 > test2) { // all but Explorer Mac
		w.pw = document.body.scrollWidth;
		w.ph = document.body.scrollHeight;
	} else { // Explorer Mac; would also work in Explorer 6 Strict, Mozilla and Safari
		w.pw = document.body.offsetWidth;
		w.ph = document.body.offsetHeight;
	}
	return w;
}

function hideSelectBox() {
	var olIe4 = (document.all) ? true : false;	//if(!olIe4) return;
	var selEl = (olIe4) ? this.document.all.tags("SELECT") : this.document.getElementsByTagName("SELECT");
	for (var i=0; i<selEl.length; i++) {
		if(!olIe4 && selEl[i].size < 2) continue;  // Not IE and SELECT size is 1 or not specified			
			selEl[i].isHidden = 1;
			selEl[i].style.visibility = 'hidden';
		}
}
function showSelectBox() {
	var olIe4 = (document.all) ? true : false;	//if(!olIe4) return;
	var selEl = (olIe4) ? this.document.all.tags("SELECT") : this.document.getElementsByTagName("SELECT");
	for (var i=0; i<selEl.length; i++) {
		if(typeof selEl[i].isHidden !=  'undefined' && selEl[i].isHidden) {
			selEl[i].isHidden = 0;
			selEl[i].style.visibility = 'visible';
		}
	}
}
	
//***********************************
// addEvent and removeEvent, designed by Aaron Moore
function addEvent(element, listener, handler) {
	//if the system is not set up, set it up, and
	// store any outside script's event registration in the first handler slot
	if(typeof element[listener] != 'function' || 
	typeof element[listener + '_num'] == 'undefined'){
		element[listener + '_num'] = 0;
		if(typeof element[listener] == 'function'){
			element[listener + 0] = element[listener];
			element[listener + '_num']++;
		}
		element[listener] = function(e){
			var r = true; e = (e) ? e : window.event;
			for(var i = 0; i < element[listener + '_num']; i++)
				if(element[listener + i](e) === false) r = false;
			return r;
		}
	}
	//if handler is not already stored, assign it
	for(var i = 0; i < element[listener + '_num']; i++)
		if(element[listener + i] == handler) return;
	element[listener + element[listener + '_num']] = handler;
	element[listener + '_num']++;
}
function removeEvent(element, listener, handler) {
	//if the system is not set up, or there are no handlers to remove, exit
	if(typeof element[listener] != 'function' || 
	typeof element[listener + '_num'] == 'undefined' ||
	element[listener + '_num'] == 0) return;
	// loop through handlers, if target handler is reached, begin overwriting
	// each handler with the handler in front of it until one before the last
	var found = false;
	for(var i = 0; i < element[listener + '_num']; i++){
		if(!found)
			found = element[listener + i] == handler;
		if(found && (i+1) < element[listener + '_num'])
			element[listener + i] = element[listener + (i+1)];
	} //if handler was found, decrement the handler count
	if(found) element[listener + '_num']--;
}	
	
function numbersonly(myfield, e) {	 
	var key, keychar;
	if (window.event) key = window.event.keyCode;
	else if (e)	key = e.which;
	else return true;
	keychar = String.fromCharCode(key);
	// control keys
	if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )	return true;
	// numbers
	else if ((("0123456789").indexOf(keychar) > -1)) return true;
	return false;
}
function chkObject(id) { return (document.getElementById(id) != null)?true:false; }  
function find_field(f,name) {		
	var found = -1;
	for(i=0; i<f.elements.length; i++) {
		found = f.elements[i].name.indexOf(name);
		if(found != -1) return f.elements[i]; 
	}
	return false;
} 

function prequal_load(f) {
    // validate form fields	
	var tmp;
	tmp = find_field(f,'Address'); if(!tmp || tmp.value == '') return;
	tmp = find_field(f,'Zip'); if(!tmp || tmp.value=='' || tmp.value.length<5) return;
	tmp = find_field(f,'FormCheckbox');
	if(tmp && tmp.checked == false) {
		tmp = find_field(f,'area');	if(!tmp || tmp.value=='' || tmp.value.length<3) return;
		tmp = find_field(f,'exchange');	if(!tmp || tmp.value=='' || tmp.value.length<3) return;
		tmp = find_field(f,'phone'); if(!tmp || tmp.value=='' || tmp.value.length<4) return;
	}	
	// Stop home page marquee (hToggleOk)	
	if(typeof hToggleOk != "undefined") hToggleOk = false;		
	var w = getWindowSize();			
	var poverlay = document.getElementById('load-overlay');
	var pdiv = document.getElementById('loading-div');
	poverlay.style.left = 0; poverlay.style.top = 0; 
	poverlay.style.width = w.pw+"px"; poverlay.style.height = w.ph+"px";
	pdiv.style.width = "590px"; pdiv.style.height = "200px";										
	pdiv.style.left = (1*w.l+(w.w-590)/2)+"px";
	pdiv.style.top = (1*w.t+(w.h-200)/2)+"px";
	pdiv.style.display = "";		 		
	poverlay.style.visibility = "visible";
}	

function CreateBookmarkLink(title, url) {
 if (window.sidebar) { // Mozilla Firefox Bookmark
	window.sidebar.addPanel(title, url,"");
 } else if( window.external ) { // IE Favorite
	window.external.AddFavorite( url, title); }
 else if(window.opera && window.print) { // Opera Hotlist
	return true; }
}		 

// No Phone CheckBox for Store 
function no_phone_number(e) {

	var checkbox = d.getElementById('numberless');
	var phone_number_fields_array = new Array("npa","nxx","last_four");
	var temp;

	for (var i = 0; i < phone_number_fields_array.length; i++) {
		temp = phone_number_fields_array[i];
			if (checkbox.checked) {
				d.getElementById(temp).disabled = true;
				d.getElementById(temp).className = "components_box_input_disabled";
			} else {
				d.getElementById(temp).disabled = false;
				d.getElementById(temp).className = "components_box_input";	
			}
	}
}

// PNL
function numbersonly(myfield, e) {	 
	var key, keychar;
	if (window.event) key = window.event.keyCode;
	else if (e)	key = e.which;
	else return true;
	keychar = String.fromCharCode(key); 
	
	// control keys
	if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )	return true;
	// numbers
	else if ((("0123456789").indexOf(keychar) > -1)) return true;	 
	return false;
}
function checkNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        status = "This field accepts numbers only.";
        return false;
    }
    status = "";
    return true;
}


function numberCheck(txt)
     {   
          var check = true;        
          //check that all characters are digits, ., -, or ""
          for(var i=0;i < txt.length; ++i)
          {    
               var new_key = txt.charAt(i); //cycle through characters
               if(((new_key < "0") || (new_key > "9")) && !(new_key == ""))
               {
                    check = false;
                    break;
               }
          } 
          if(!check) return false;                 
          else return true;
     }

function isEmail(strEmail) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // search email text for regular exp matches
    if(reg.test(strEmail) == false) {   
      return false;
    }
    return true; 
}

function toggleDisplay(id) {
 var obj = document.getElementById(id);
 if(obj.style.display && obj.style.display=="block")
 	obj.style.display="none";
 else obj.style.display="block";
}


function clearFormField(id) {
	document.getElementById(id).value = "";
}