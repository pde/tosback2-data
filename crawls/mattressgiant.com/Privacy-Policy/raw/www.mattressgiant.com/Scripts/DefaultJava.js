var is_gecko = /gecko/i.test(navigator.userAgent);
var is_ie    = /MSIE/.test(navigator.userAgent);

function currencyFormat(fld, milSep, decSep, e)
{
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;

	// Check codes to see if a special key has been pressed
	if(checkCodes(e))
	{
		return true;
	}
	
	var position = doGetCaretPosition(fld);
	
	// Get rid of any selected text
	fld = removeSelection(fld);

	// Get key value from key code
	key = String.fromCharCode(whichCode);  

	// IF VALUE IS NOT A NUMARIC, THEN RETURN FALSE
	if (strCheck.indexOf(key) == -1)
		return false;

	//ALLOCATE LENTH OF FIELD TO LEN
	len = fld.value.length;

	//FOR EACH CHARACTER IN LEN DO THE FOLLOWING
	for(i = 0; i < len; i++)
	{
		//IF CURRENT CARACTER IS NOT 0, THEN BREAK.
		if (fld.value.charAt(i) != '0' && fld.value.charAt(i) != '$')
			break;
	}
		
	//MAKE AUX NULL
	aux = '';
	
	//LENGTH VARIABLE CONTRINUES FROM PREVIOUS
	for(; i < len; i++)
	{
		if(i == position)
		{
			aux += key;
		}
		
		//ONLY IF ITS A VALID CHARACTER THEN, ADD TO AUX
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) 
		{	
			aux += fld.value.charAt(i);
		}
	}
	
	if(position >= len)
	{
		//ADD THE KEY JUST PRESSED TO THE VALID STRING
		aux += key;
	}
	
	//LEN IS THE LENTH OF THE VALID STRING
	len = aux.length;
	
	//IF LENTH = 0 THEN FIELD VALUS IS NOTIHNG
	if (len == 0) fld.value = '';

	//IF LENTH IS GREATER THEN 0, DO THE FOLLOWING
	if (len > 0) 
	{
		//INITIIZE AUX 2 - WILL BE USED AS A STRING BUILDER
		aux2 = '';
	
		//
		for (j = 0, i = len - 1; i >= 0;   i--) 
		{
			if (j == 3) 
			{
				aux2 += milSep;
				j = 0;
			}
		
			aux2 += aux.charAt(i);
			j++;
		}
	
		//INITIZE THE TEXT BOX
		fld.value = '$';
	
		//PLACE THE LENTH OF THE NEW STRING INTO LEN2
		len2 = aux2.length;
	
	
		for (i = len2 - 1; i >= 0; i--)
		{
			fld.value += aux2.charAt(i);
		}
	}
	
	doSetCaretPosition(fld, fld.value.length);
	
	return false;
}

function currencyDoubleFormat(fld, milSep, decSep, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;

	//Check codes to see if a special key has been pressed	
	if(checkCodes(e))
		return true;
		
	var position = doGetCaretPosition(fld);
	
	// Get rid of any selected text
	fld = removeSelection(fld);

	// Get key value from key code
	key = String.fromCharCode(whichCode);  

	// IF VALUE IS NOT A NUMARIC, THEN RETURN FALSE
	if (strCheck.indexOf(key) == -1) return false;  

	//ALLOCATE LENTH OF FIELD TO LEN
	len = fld.value.length;

	//FOR EACH CHARACTER IN LEN DO THE FOLLOWING
	for(i = 0; i < len; i++)
		//IF CURRENT CARACTER IS NOT 0, THEN BREAK.
		if (fld.value.charAt(i) != '0' && fld.value.charAt(i) != '$') break; 
			//MAKE AUX NULL
			aux = '';	
			
			
	//LENGTH VARIABLE CONTRINUES FROM PREVIOUS
	for(; i < len; i++)
	{
		if(i == position)
		{
			aux += key;
		}
		
		//ONLY IF ITS A VALID CHARACTER THEN, ADD TO AUX
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) 
			aux += fld.value.charAt(i);
	}
	
	if(position >= len)
	{
		//ADD THE KEY JUST PRESSED TO THE VALID STRING
		aux += key;
	}
	
	//LEN IS THE LENTH OF THE VALID STRING
	len = aux.length;
	
	//IF LENTH = 0 THEN FIELD VALUS IS NOTIHNG
	if (len == 0) fld.value = '';
	
	if (len == 1) fld.value = '$' + '0'+ decSep + '0' + aux;
	if (len == 2) fld.value = '$' + '0'+ decSep + aux;

	//IF LENTH IS GREATER THEN 0, DO THE FOLLOWING
	if (len > 2) 
	{
		//INITIIZE AUX 2 - WILL BE USED AS A STRING BUILDER
		aux2 = '';
	
		//
		for (j = 0, i = len - 3; i >= 0;   i--) 
		{
			aux2 += aux.charAt(i);
		}
	
		//INITIZE THE TEXT BOX
		fld.value = '$';
	
		//PLACE THE LENTH OF THE NEW STRING INTO LEN2
		len2 = aux2.length;
	
	
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
			
		fld.value += decSep + aux.substr(len - 2, len);
	}
	
	doSetCaretPosition(fld, fld.value.length);
	
	return false;
}


function ConvertIntToNumberField(fld, milSep, decSep, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;

	//Check codes to see if a special key has been pressed	
	if(checkCodes(e))
		return true;
		
	var position = doGetCaretPosition(fld);
	
	// Get rid of any selected text
	fld = removeSelection(fld);

	// Get key value from key code
	key = String.fromCharCode(whichCode);  

	// IF VALUE IS NOT A NUMARIC, THEN RETURN FALSE
	if (strCheck.indexOf(key) == -1) return false;  

	//ALLOCATE LENTH OF FIELD TO LEN
	len = fld.value.length;

	//FOR EACH CHARACTER IN LEN DO THE FOLLOWING
	for(i = 0; i < len; i++)
		//IF CURRENT CARACTER IS NOT 0, THEN BREAK.
		if (fld.value.charAt(i) != '0' && fld.value.charAt(i) != '$') break; 
			//MAKE AUX NULL
			aux = '';	
			
			
	//LENGTH VARIABLE CONTRINUES FROM PREVIOUS
	for(; i < len; i++)
	{
		if(i == position)
		{
			aux += key;
		}
		
		//ONLY IF ITS A VALID CHARACTER THEN, ADD TO AUX
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) 
			aux += fld.value.charAt(i);
	}
	
	if(position >= len)
	{
		//ADD THE KEY JUST PRESSED TO THE VALID STRING
		aux += key;
	}
	
	//LEN IS THE LENTH OF THE VALID STRING
	len = aux.length;
	
	//IF LENTH = 0 THEN FIELD VALUS IS NOTIHNG
	if (len == 0) fld.value = '';
	
	//IF LENTH IS GREATER THEN 0, DO THE FOLLOWING
	if (len > 0) 
	{
		//INITIIZE AUX 2 - WILL BE USED AS A STRING BUILDER
		aux2 = '';
	
		//
		for (j = 0, i = len - 1; i >= 0;   i--) 
		{
			if (j == 3) 
			{
				aux2 += milSep;
				j = 0;
			}
		
			aux2 += aux.charAt(i);
			j++;
		}
	
		//INITIZE THE TEXT BOX
		fld.value = '';
	
		//PLACE THE LENTH OF THE NEW STRING INTO LEN2
		len2 = aux2.length;
		
		var new_position = 0;
		var count = 0;
		
		for (i = len2 - 1; i >= 0; i--)
		{
			fld.value += aux2.charAt(i);
		}
	}
	
	doSetCaretPosition(fld, fld.value.length);
	
	return false;
}




function checkCodes(e)
{
	// RETURN TRUE IF CTRL + A PRESSED, CTRL + C, CTRL + V, CTRL + X, OR CTRL + Z IS PRESSED
	// 97 is a, 99 is c, 118 is v, 120 is x
	
	if(e.ctrlKey)
	{
		if(e.which == 97 || e.which == 99 || e.which == 118 || e.which == 120 || e.which == 122)
			return true;
	}

	// RETURN TRUE IF THE USER PRESSED BACKSPACE, DELETE, TAB, OR ENTER, LEFT ARROW, OR RIGHT ARROW
	// 8 is backspace, 46 is delete, 9 is tab, 13 is enter, 37 is left arrow, 39 is right arrow
	if(e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 37 || 
		e.keyCode == 39)
	{
		return true;
	}
}

//From http://www.webmasterworld.com/forum91/5005.htm
function removeSelection(fld)
{
	var begin, end, part1, part2;
	var end;
	
	begin = getSelectionStart(fld);
	end = getSelectionEnd(fld);
	
	if(end != 0)
	{
		part1 = fld.value.substr(0, begin);
		part2 = fld.value.substr(end);
	
		fld.value = part1 + '' + part2;
	}
	
	return fld;
}

function getSelectionStart(input)
{
	var selection;
	
	if (is_gecko)
		return input.selectionStart;
	else
	{
		if (window.getSelection)
		{ 
			selection = window.getSelection(); 
		}
		else if (document.getSelection)
		{ 
			selection = document.getSelection(); 
		}
		else if (document.selection)
		{ 
			selection = document.selection.createRange().text; 
		} 
		
		return startPos = input.value.indexOf(selection);
	}
}

function getSelectionEnd(input)
{
	var selectin;
	
	if (is_gecko)
		return input.selectionEnd;
	else
	{
		if (window.getSelection)
		{ 
			selection = window.getSelection(); 
		}
		else if (document.getSelection)
		{ 
			selection = document.getSelection(); 
		}
		else if (document.selection)
		{ 
			selection = document.selection.createRange().text; 
		} 
		
		var startPos = input.value.indexOf(selection); 
		
		return endPos = input.value.indexOf(selection) + selection.length;
	}
}

function doGetCaretPosition (oField)
{
	// Initialize
	var iCaretPos = 0;

	// IE Support
	if (document.selection)
	{
		// Set focus on the element
		oField.focus ();
  
		// To get cursor position, get empty selection range
		var oSel = document.selection.createRange ();
  
		// Move selection start to 0 position
		oSel.moveStart ('character', -oField.value.length);
  
		// The caret position is selection length
		iCaretPos = oSel.text.length;
	}

	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
		iCaretPos = oField.selectionStart;

	// Return results
	return (iCaretPos);
}
   
function doSetCaretPosition (oField, iCaretPos)
{
	// IE Support
	if (document.selection)
	{

		// Set focus on the element
		oField.focus ();
  
		// Create empty selection range
		var oSel = document.selection.createRange ();
  
		// Move selection start and end to 0 position
		oSel.moveStart ('character', -oField.value.length);
  
		// Move selection start and end to desired position
		oSel.moveStart ('character', iCaretPos);
		oSel.moveEnd ('character', 0);
		oSel.select ();
	}

	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
	{
		oField.selectionStart = iCaretPos;
		oField.selectionEnd = iCaretPos;
		oField.focus ();
	}
}

function ClrField(field)
{
	if(field.value == "Enter email address")
	{
		field.value='';
	}
	
	if(field.value == "Enter zip code")
	{
		field.value='';
	}
}

//DEFAULT PHONE LENGTH FIELD
var phone_field_length=0;

function TabNext(obj,event,len,next_field) 
{
	//IF THE EVENT WAS DOWN
	if (event == "down") 
	{
		//phone_field_length=obj.value.length;
	}
	else if (event == "up") 
	{
		//IF THE EVEN IS UP
		if (obj.value.length != phone_field_length) 
		{
			//PUT LENGTH OF OBJECT INTO PHONE LENGTH FIELD
			phone_field_length=obj.value.length;
			
			//USE LENGTH PASSED BY USER TO DETERMINE IF MATCHES.
			if (phone_field_length == len) 
			{
				//alert('tet this');
				//IF YES, THEN PASS THE FIELD TO THE NEXT TEXT BOX
				next_field.focus();
			}
		}
	}
}



function fnTrapKD3(target, event) {
 // srcElement is for IE
    var element = event.target || event.srcElement;
    if (13 == event.keyCode && element != undefined && element.tagName.toLowerCase() != "textarea") 
    {
    alert('fnTrapKD3');

        var defaultButton = document.getElementById(target.id);

        if (defaultButton != undefined && defaultButton.click != undefined) 
        {
  alert(defaultButton.id);
           defaultButton.click();
            event.cancelBubble = true;

            if (event.stopPropagation) event.stopPropagation();

            return false;
        }
    }
    return true;
}


function fnTrapKD2(btn, event)
{

alert('000');
   if (navigator.appName.indexOf ("Microsoft") !=-1) 
   { 
	    if (document.all)
	    {
alert('1');	        
			    btn.click();
	    }
	    else if (document.getElementById)
	    {
alert('2');	 
			    btn.click();
	    }
	    else if(document.layers)
	    {
alert('3');		   
			    btn.click();
	    }
   }
    else 
    { 
alert('4');	   

if (navigator.userAgent.indexOf("Firefox")!=-1)
      {
      alert('Firefox');	   

         __defaultFired = true;
         			    __doPostBack(btn,'');

      }
      else
      {
      alert('not Firefox');	   

         __defaultFired = false;
      }  
          var newEvent = document.createEvent("KeyEvents"); 
           alert('newEvent ' + newEvent);
          newEvent.initKeyEvent("keypress", true, true,document.defaultView, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, btn.click()); 
            alert('initKeyEvent ');

          event.preventDefault(); 
          event.target.dispatchEvent(newEvent); 
          alert('5');
          
          		event.returnValue=false;
			    event.cancel = true;
			    btn.click();
			    

			    
			              alert('6');


   } 
}

function fnTrapKD(btn, event)
{
   if (navigator.appName.indexOf ("Microsoft") !=-1) 
   { 
	    if (document.all)
	    {
		    if (event.keyCode == 13)
		    {
			    event.returnValue=false;
			    event.cancel = true;
			    btn.click();
		    }
	    }
	    else if (document.getElementById)
	    {
		    if (event.which == 13)
		    {
			    event.returnValue=false;
			    event.cancel = true;
			    btn.click();
		    }
	    }
	    else if(document.layers)
	    {
		    if(event.which == 13)
		    {
			    event.returnValue=false;
			    event.cancel = true;
			    btn.click();
		    }
	    }
   }
   else if (navigator.appName.indexOf("Netscape")!=-1)
      {
 		    if(event.which == 13 || event.keyCode == 13)
		    {
			    event.returnValue=false;
			    event.cancel = true;
                document.getElementById(btn.id).click();
		    }
   }
    else 
    { 
      if (event.keyCode == 13) 
      { 
          var newEvent = document.createEvent("KeyEvents"); 
          newEvent.initKeyEvent("keypress", true, true,document.defaultView, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, btn.click()); 
          event.preventDefault(); 
          event.target.dispatchEvent(newEvent); 
      } 
   } 
}


menu_status = new Array(); 



function SessionTimeoutWarning(blRgstrd)
{
//	var intInrvl = ((1000*60)*20);
	var intInrvl = ((1000*60)*30);
	
	//setTimeOut(displayTimeoutAlert(blRgstrd), 20000);
	window.setTimeout('displayTimeoutAlert('+blRgstrd+')', intInrvl);
}

function displayTimeoutAlert(rgstrd)
{
	//OBJECT WHICH HOLDS THE MESSAGE BASED ON PARAMETER 
	var strMsg = '';
	
	//PUT MESSAGE IN OBJECT BASED ON IF USER IS REGISED OR NOT REGISTERED BY HAS ITEM IN SESSION
	if(rgstrd)
		strMsg = 'For the safety of your account, your session will expire in 10 minutes due to inactivity.  Unless you reset the session time, you will be logged out of the system.  Would you like to reset your session?';
	else
		strMsg = 'Your session will expire in 10 minutes due to inactivity.  Unless you reset the session time, all items in your shopping cart and wish list will be disposed.  Would you like to reset your session?';
	
	//IF USERS DECIDES TO REFRESH SESSION, THEN PAGE IS POSTED BACK
	if(confirm(strMsg)==true)
		__doPostBack('','');		
}


function ClrField(field)
{
	if(field.value == "Enter email address")
	{
		field.value='';
	}
	
	if(field.value == "Enter zip code")
	{
		field.value='';
	}
}

//DEFAULT PHONE LENGTH FIELD
var phone_field_length=0;

function TabNext(obj,event,len,next_field) 
{
	//IF THE EVENT WAS DOWN
	if (event == "down") 
	{
		//phone_field_length=obj.value.length;
	}
	else if (event == "up") 
	{
		//IF THE EVEN IS UP
		if (obj.value.length != phone_field_length) 
		{
			//PUT LENGTH OF OBJECT INTO PHONE LENGTH FIELD
			phone_field_length=obj.value.length;
			
			//USE LENGTH PASSED BY USER TO DETERMINE IF MATCHES.
			if (phone_field_length == len) 
			{
				//alert('tet this');
				//IF YES, THEN PASS THE FIELD TO THE NEXT TEXT BOX
				next_field.focus();
			}
		}
	}
}

//function fnTrapKD(btn, event)
//{
//	if (document.all)
//	{
//		if (event.keyCode == 13)
//		{
//			event.returnValue=false;
//			event.cancel = true;
//			btn.click();
//		}
//	}
//	else if (document.getElementById)
//	{
//		if (event.which == 13)
//		{
//			event.returnValue=false;
//			event.cancel = true;
//			btn.click();
//		}
//	}
//	else if(document.layers)
//	{
//		if(event.which == 13)
//		{
//			event.returnValue=false;
//			event.cancel = true;
//			btn.click();
//		}
//	}
//}

//menu_status = new Array(); 

function autotab(original,destination)
{
  if (document.getElementById(original).getAttribute && document.getElementById(original).value.length == document.getElementById(original).getAttribute("maxlength"))
  {
      document.getElementById(destination).focus()
  }
}

function showHide(theid,image)
{
	if (document.getElementById) 
	{
	    if(menu_status[theid] != 'show') 
		{
			document.getElementById(theid).className = 'show';
			menu_status[theid] = 'show';
			image.src = 'images/misc/minus.gif';
		}
		else
		{
			document.getElementById(theid).className = 'hide';
			menu_status[theid] = 'hide';
			image.src = 'images/misc/plus.gif';
		}
	}
}


function ShowEmail(theID)
{
  document.getElementById(theID).style.display = '';
  return false;
}


function HideEmail(theID,lbl,tr1,tr2,tr3,tr4,count,confirmation)
{
  document.getElementById(theID).style.display = 'none';
  document.getElementById(lbl).innerHTML = '* Required Fields';
  document.getElementById(tr1).value = '';
  document.getElementById(tr2).value = '';
  document.getElementById(tr3).value = '';
  document.getElementById(tr4).value = '';
  document.getElementById(count).value = '1000';
  document.getElementById(confirmation).innerHTML = '';
  return false;
}



// Browser Detection Javascript
// copyright 1 February 2003, by Stephen Chapman, Felgall Pty Ltd

// You have permission to copy and use this javascript provided that
// the content of the script is not changed in any way.

function whichBrs() {
var agt=navigator.userAgent.toLowerCase();
if (agt.indexOf("opera") != -1) return 'Opera';
if (agt.indexOf("staroffice") != -1) return 'Star Office';
if (agt.indexOf("webtv") != -1) return 'WebTV';
if (agt.indexOf("beonex") != -1) return 'Beonex';
if (agt.indexOf("chimera") != -1) return 'Chimera';
if (agt.indexOf("netpositive") != -1) return 'NetPositive';
if (agt.indexOf("phoenix") != -1) return 'Phoenix';
if (agt.indexOf("firefox") != -1) return 'Firefox';
if (agt.indexOf("safari") != -1) return 'Safari';
if (agt.indexOf("skipstone") != -1) return 'SkipStone';
if (agt.indexOf("msie") != -1) return 'Internet Explorer';
if (agt.indexOf("netscape") != -1) return 'Netscape';
if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
if (agt.indexOf('\/') != -1) 
{
    if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') 
    {
        return navigator.userAgent.substr(0,agt.indexOf('\/'));
    }
    else 
        return 'Netscape';
} 
else if (agt.indexOf(' ') != -1)
    return navigator.userAgent.substr(0,agt.indexOf(' '));
else 
    return navigator.userAgent;
}


function init_map_2(map_canvas_id, lat, lng, zoom, markers) {
    var myLatLng = new google.maps.LatLng(lat, lng);
    
    var options = {
        zoom: zoom,
        center: myLatLng,
        mapTypeId: 'ROADMAP'
    };
    
    var map_canvas = document.getElementById(map_canvas_id);

    var map = new google.maps.Map(map_canvas, options);

    if (markers && markers.length > 0) {
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < markers.length; i++) {
            var marker = new google.maps.Marker(markers[i]);
            marker.setMap(map);

            bounds.extend(marker.getPosition());
        }

        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    }
}


function init_map_3(map_canvas_id, lat, lng, zoom, markers) 
{
    var myLatLng = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: zoom,
        center: myLatLng,
        mapTypeId: 'ROADMAP'
    };
    
    var map_canvas = document.getElementById(map_canvas_id);
    var map = new google.maps.Map(map_canvas, options);
    map.setCenter(new GLatLng(lat, lng), zoom);

        if (markers && markers.length > 0) 
        {
            var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < markers.length; i++) 
            {
                var marker = new GMarker(markers[i]);
                var point2 =  markers[i]["position"];
              map.addOverlay(new GMarker(point2));
              bounds.extend(point2);
            }

            map.fitBounds(bounds);
            map.setCenter(bounds.getCenter());
        }
   
}

//use the 
//mapUtil.calculateBorders(lat, lng); for each marker
//then call the mapUtil.zoomToViewAll()

function init_map(map_canvas_id, lat, lng, zoom, markers, infoWindowContents) 
{
var mapUtil = 
{

    minLat: null,
    maxLat: null,
    minLng: null,
    maxLng: null,

    calculateBorders: function(latitude, longitude) 
    {
        latitude = Number(latitude);
        longitude = Number(longitude); 
        
        if(typeof(latitude) == 'number' && typeof(longitude) == 'number') 
        {
            if(mapUtil.minLat == null || mapUtil.minLat > latitude) 
            {
                mapUtil.minLat = latitude;
            }

            if(mapUtil.maxLat == null || mapUtil.maxLat < latitude) 
            {
                mapUtil.maxLat = latitude;
            }

            if(mapUtil.minLng == null || mapUtil.minLng > longitude) 
            {
                mapUtil.minLng = longitude;
            }

            if(mapUtil.maxLng == null || mapUtil.maxLng < longitude) 
            {
                mapUtil.maxLng = longitude;
            }
        }
        
//           alert (' minLat: ' + mapUtil.minLat);
//    alert ('maxLat:  ' + mapUtil.maxLat);
//    alert ('minLng:  ' + mapUtil.minLng);
//    alert ('maxLng:  ' + mapUtil.maxLng);

    },

    zoomToViewAll: function(mainMap) 
    {
        var visibleBounds = mapUtil.getVisibleBounds();
        if(visibleBounds) 
        {
            var boundsCentre = visibleBounds.getCenter(); 
            var zoomLevel = mainMap.getBoundsZoomLevel(visibleBounds);
            
//            alert ('visibleBounds: ' + visibleBounds);
//            alert (zoomLevel);
//            alert ('boundsCentre: ' + boundsCentre);
   //          alert ('minBoundsCentre: ' + minBoundsCentre);
           
            if(zoomLevel < 15 ) 
            {
                mainMap.setCenter(boundsCentre, zoomLevel);
            }
            else 
            { 
                mainMap.setCenter(boundsCentre, 15);
            }
        }
    },

    getVisibleBounds: function() 
    {
        if(mapUtil.maxLng) 
        {
            var swLatLng = new GLatLng(mapUtil.minLat, mapUtil.minLng);
            var neLatLng = new GLatLng(mapUtil.maxLat, mapUtil.maxLng);
            var minBounds = new GLatLngBounds(swLatLng, neLatLng);
            return minBounds;
        } 
        return null; 
    }
}

    if (GBrowserIsCompatible()) 
    {
            var feed;
            var bounds = new GLatLngBounds();
            var marker = [];
            var markerImage = [
            G_DEFAULT_ICON.image,
            "http://maps.google.com/mapfiles/dd-start.png",
            "http://maps.google.com/mapfiles/dd-end.png",
            "http://esa.ilmari.googlepages.com/markeryellow.png",//3 yellow
            "http://www.google.com/uds/samples/places/temp_marker.png"//4 turquoise
            ];


            var map = new GMap2(document.getElementById(map_canvas_id));
     //       map.addControl(new GSmallMapControl());
            map.addControl(new GMapTypeControl(1));
            map.addControl(new GLargeMapControl());
            map.addControl(new GScaleControl(256));
            map.setCenter(new GLatLng(lat, lng), zoom);
            
//            var entries = feed.entry || [];
//            for (var i = 0; i < feed.entry.length; ++i) 
//            {
//                var entry = feed.entry[i];
//                var lat = entry.gsx$lat.$t;
//                var lng = entry.gsx$lng.$t;
//                var label = entry.title.$t;
//                sideBar(label,i);
//                var point = new GLatLng(lat,lng);
//                ZMarker(point,label,1,0,i,null);
//                bounds.extend(point);
//            }

            
            var n=1;
            function count()
            {
                n++;
                return n;
            }
            function ZMarker(point,label,n,imInd,i,visited) 
            {
                function sendBack(marker,b) 
                {
                    return GOverlay.getZIndex(marker.getPoint().lat())-n*10000;
                }
                marker[i] = new GMarker(point,{title:label, zIndexProcess:sendBack});
                map.addOverlay(marker[i]);
                marker[i].setImage(markerImage[imInd]);
                marker[i].visited = visited;
                 
                GEvent.addListener(marker[i], "click", function() 
                {
                    marker[i].openInfoWindowHtml(label);
                    marker[i].visited = true;
                    GEvent.trigger(marker[i],"mouseout");
                });
                GEvent.addListener(marker[i],'mouseover',function()
                {
                    marker[i].setImage(markerImage[3]);
                    document.getElementById("sidebar").getElementsByTagName("span")[i].style.background ="yellow";
                });
                GEvent.addListener(marker[i],'mouseout',function()
                {
                    if(marker[i].visited)
                    {
                        marker[i].setImage(markerImage[4]);
                        document.getElementById("sidebar").getElementsByTagName("span")[i].style.color ="gray";
                    }
                    else
                    {
                        marker[i].setImage(markerImage[0]);
                        document.getElementById("sidebar").getElementsByTagName("span")[i].style.color ="black";
                    }
                    document.getElementById("sidebar").getElementsByTagName("span")[i].style.background ="white";
                });
                GEvent.addListener(marker[i], "infowindowclose", function() 
                {
                    map.removeOverlay(marker[i]);
                    ZMarker(point,label,count(), 4,i,marker[i].visited);
                });
             }
 

            
            
            
            var MG_Icon = new GIcon();
            MG_Icon.image = "../Images/misc/MG_PP.png";
            MG_Icon.iconSize = new GSize(77, 77);
            MG_Icon.iconAnchor = new GPoint(30,60);
             
            var OA_Icon = new GIcon();
            OA_Icon.image = "../Images/misc/OA_PP.png";
            OA_Icon.iconSize = new GSize(77, 77);
            OA_Icon.iconAnchor = new GPoint(30,60);

            var MG_HighlightShadow = new GIcon();
            MG_HighlightShadow.image = "../Images/misc/MG_HighlightShadow.png";
            MG_HighlightShadow.iconSize = new GSize(77, 77);
            MG_HighlightShadow.iconAnchor = new GPoint(30,60);
             
            var OA_HighlightShadow = new GIcon();
            OA_HighlightShadow.image = "../Images/misc/OA_HighlightShadow.png";
            OA_HighlightShadow.iconSize = new GSize(77, 77);
            OA_HighlightShadow.iconAnchor = new GPoint(30,60);


        if (markers && markers.length > 0) 
        {
   //         var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < markers.length; i++) 
            {
            
                var point2 =  markers[i]["position"];

//                var entry = feed.entry[i];
//                var lat = entry.gsx$lat.$t;
//                var lng = entry.gsx$lng.$t;
//                var label = entry.title.$t;
                var label = markers[i]["title"];
                sideBar(label,i);
      //          var point = new GLatLng(lat,lng);
                ZMarker(point2,label,1,0,i,null);
                bounds.extend(point2);

                
//                alert(point2);
      //          var marker = new GMarker(point2);
      //          map.addOverlay(marker);
              
                var lat2 = point2.lat();
                var lng2 = point2.lng(); 
                mapUtil.calculateBorders(lat2, lng2);
              
              var html = "Wow!";
              
              if (infoWindowContents && infoWindowContents.length > i)
              {
                html = infoWindowContents[i]["content"];
                 //   createInfoWindow(map, marker,marker1,marker2, infoWindowContents[i]["content"]);
              }
                
  //            createColorSwitchMarker(map, point2,html,MG_Icon,OA_Icon, MG_HighlightShadow, OA_HighlightShadow);
            }
            
            mapUtil.zoomToViewAll(map);
            

            var center = map.getCenter()

            GEvent.addListener(map,'infowindowclose',function(){
            map.panTo(center);
            });

        }
    }
}

var teksti = " ";
function sideBar(line, j)
{
    teksti += "<br/><span class='sidebar'";
    teksti += "onclick='GEvent.trigger(marker["+j+"],\"click\")' ";
    teksti += "onmouseover='GEvent.trigger(marker["+j+"],\"mouseover\")' ";
    teksti += "onmouseout='GEvent.trigger(marker["+j+"],\"mouseout\")' ";
    teksti += ">";
    teksti += line;
    teksti += "</span>";
    document.getElementById("sidebar").innerHTML = teksti;
}

function createInfoWindow(map, marker, infoWindowProperties) 
{
    // Adding a click-event to the marker
    GEvent.addListener(marker, 'click', function() {
      // When clicked, open an Info Window
      marker.openInfoWindowHtml(infoWindowProperties);
    });

}

function createColorSwitchMarker(map, point,html, MG_Icon, OA_Icon, MG_HighlightShadow, OA_HighlightShadow)
{ 
    var marker1 = new GMarker(point); 
    map.addOverlay(marker1);
   // marker1.enableDragging();
     
    var marker2 = new GMarker(marker1.getPoint(),{clickable:false, icon:MG_HighlightShadow});
    map.addOverlay(marker2); // visited
 //   marker2.hide();
     
    var marker3 = new GMarker(marker1.getPoint(),{clickable:false, icon:OA_Icon});
    map.addOverlay(marker3); // hover
    marker3.hide();

    var marker4 = new GMarker(marker1.getPoint(),{clickable:false, icon:OA_HighlightShadow});
    map.addOverlay(marker4); // hover
    marker4.hide();
     
    GEvent.addListener(marker1,'mouseover',function(){
    marker3.show();
    marker4.show();
    });
    GEvent.addListener(marker1,'mouseout',function(){
    marker3.hide();
    marker4.hide();
    });
    GEvent.addListener(marker1,'click',function(){
    marker1.openInfoWindowHtml(html);
 //   marker2.show();
    });
}










//function SessionTimeoutWarning(blRgstrd)
//{
//	var intInrvl = ((1000*60)*20);
////	var intInrvl = ((1000*60));
//	
//	//setTimeOut(displayTimeoutAlert(blRgstrd), 20000);
//	window.setTimeout('displayTimeoutAlert('+blRgstrd+')', intInrvl);
//}

//function displayTimeoutAlert(rgstrd)
//{
//	//OBJECT WHICH HOLDS THE MESSAGE BASED ON PARAMETER 
//	var strMsg = '';
//	
//	//PUT MESSAGE IN OBJECT BASED ON IF USER IS REGISED OR NOT REGISTERED BY HAS ITEM IN SESSION
//	if(rgstrd)
//		strMsg = 'For the safety of your account, your session will expire in 10 minutes due to inactivity.  Unless you reset the session time, you will be logged out of the system.  Would you like to reset your session?';
//	else
//		strMsg = 'Your session will expire in 10 minutes due to inactivity.  Unless you reset the session time, all items in your shopping cart and wish list will be disposed.  Would you like to reset your session?';
//	
//	//IF USERS DECIDES TO REFRESH SESSION, THEN PAGE IS POSTED BACK
//	if(confirm(strMsg)==true)
//		__doPostBack('','');		
//}
