/**
* FILENAME: common.js
* DESCRIPTION :Common Javascript code for Cross Browser Compatability
* AUTHOR: Louis Baliotis
**/

/*
 *  General Cross Browser Java Script Function 
 */
 
//++
// cross browser get object by id or name.  if the name is
// not a string, it is passed by unchanged since it can't be an id.
// if it is a string, it tries DOM first, then IE 4/5 then Netscape 4
// if forceIEBehavior is true and the getElementById
// fails, routine will try to find a name instead of IE
//--
function getObj( name, forceIEBehavior )
{
    var newObj;
    if ( typeof name == "string" ) {
        if (document.getElementById) {
            newObj = document.getElementById(name);
            if ( newObj == null && forceIEBehavior != null & forceIEBehavior ) {
                var newObjArray = document.getElementsByName( name );
                if ( newObjArray != null && newObjArray.length > 0 ) 
                    newObj = newObjArray[ 0 ];
            }else{
                var newObjArray = document.getElementsByName( name );
                if ( newObjArray != null && newObjArray.length > 0 ) 
                    newObj = newObjArray[ 0 ];
            }
        }
        else if (document.all) {
            newObj = document.all[name];
        }
        else if (document.layers) {
            newObj = document.layers[name];
        }
    }
    else
        newObj = name;
    return newObj;
}

function getHTTPRequest() {
	var xmlhttp = false;
	try {
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	try {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (E) {
	xmlhttp = false;
	}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}


//++
// cross browser get all objects with the same name in an array.
// tries DOM first, then IE 4/5 then Netscape 4
//--
function getObjArray( name )
{
    var newObjArray;
    if ( typeof name == "string" ) {
        if (document.getElementById) {
			 newObjArray = document.getElementsByName(name);
        }
        else if(document.getElementsByName)
            newObjArray = document.getElementsByName(name);
        else if (document.all)
            newObjArray = document.all[name];
        else if (document.layers)
            newObjArray = document.layers[name];
    }
    else
        newObjArray = name;
    return newObjArray;
}
//++
// cross browser update inner HTML object
// --
function doUpdateHtml(obj,text) {
	if(obj.innerHTML != null)
		obj.innerHTML = text;
	else if(obj.insertAdjacentHTML != null) {
		obj.insertAdjacentHTML("beforeEnd",text);
	}
	else if(document.createElement != null) {
	
	}
}
function doUpdateText(obj,text) {
	if(obj.innerText != null)
		obj.innerText = text;
	else if(obj.innerHTML != null)
		obj.innerHTML = text;
	else if(obj.insertAdjacentHTML != null) {
		obj.insertAdjacentHTML("beforeEnd",text);
	}
	else if(document.createElement != null) {
	}
}
function doGetText(obj) {
	if(obj.innerText != null)
		return obj.innerText;
	else if(obj.innerHTML != null)
		return obj.innerHTML;
}

function documentWidth() {
	var myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		myWidth = window.innerWidth;
	} else if( document.documentElement && (document.documentElement.clientWidth ) ) {
		myWidth = document.documentElement.clientWidth;
	} else if( document.body && ( document.body.clientWidth ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
	}
	return myWidth;
}
	
function documentHeight() {
	var myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		myHeight = window.innerHeight;
	} else if( document.documentElement && (document.documentElement.clientHeight ) ) {
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientHeight ) ) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}
function documentScrollY() {
	  var scrOfY = 0;
	  if( typeof( window.pageYOffset ) == 'number' ) {
	    //Netscape compliant
	    scrOfY = window.pageYOffset;
	  } else if( document.documentElement && ( document.documentElement.scrollTop ) ) {
	    //IE6 standards compliant mode
	    scrOfY = document.documentElement.scrollTop;
	  } else if( document.body && ( document.body.scrollTop ) ) {
	    //DOM compliant
	    scrOfY = document.body.scrollTop;
	  }
	  return scrOfY;
}
	
//++
// cross browser get style object by id or name.
// tries DOM first, then IE 4/5 then Netscape 4
// if forceIEBehavior is true and the getElementById
// fails, routine will try to find a name instead of IE
//--
function getStyle( name, forceIEBehavior )
{
    var myObj = getObj( name, forceIEBehavior );
    return myObj == null ? null : myObj.style;
}

//++
// cross browser routine to hide an element
//--
function hideElement( name )
{
	if ( document.getElementById )
		getStyle( name ).visibility="hidden";
	else if ( document.layers )
		getObj( name ).visibility = "hide";
}

//++
// cross browser routine to show an element
//--
function showElement( name )
{
	if ( document.getElementById )
		getStyle( name ).visibility="visible"
	else if ( document.layers )
		getObj( name ).visibility = "show";
}

function stopBubble(event) {
    event.cancelBubble=true;
    event.cancel = true;
    event.returnValue=false;
    if (!window.event) {
        event.preventDefault();
        event.stopPropagation();
    }
} 


//--------------------------------------------
// Desc: Function to test if the key pressed is numeric number.
// param: e = Pass in an event.
// return: true or false
// Example how to call it: onkeypress="return(isNumeric(event))"
function isNumeric (e) { 
	var key = (window.event) ? event.keyCode : e.which;                  
	// Was key that was pressed a numeric character (1-9) or backspace (8) or return (13) or tab(9)?
	
	if ( (key >= 48 && key <= 57) || (key == 8) || (key == 13) || (key == 9) || (key == 0))
		return true;
	else
		return false;
}

function isZero(param) {
	//alert(param.value);
	if (parseInt(param.value) == 0) {
		param.value = 1; 
	}
}

function centerDiv(param) {
	obj = getObj(param);		
	TLDropDownBox.showElement(param);
	var doc_height = document.documentElement.clientHeight / 2;
	var doc_width = document.documentElement.clientWidth / 2;
	var v_height = obj.offsetHeight;
	var v_width = obj.offsetWidth;
	
	var height_inc = parseInt(v_height / 10);
	var width_inc = parseInt(v_width / 10);
	var top = doc_height - (v_height / 2)
	var left = doc_width - (v_width / 2);
	var height = v_height;
	var width = v_width;
	obj.style.top = top + "px";
	obj.style.left = left + "px";
}

function submitGenericForm(fieldOne, fieldTwo, formOne) {
	if (fieldOne !=null && fieldOne.value != "") {			
		fieldTwo.value = fieldOne.value;
		if (fieldTwo!=null) {
			var t = "document." + formOne.id + "." + fieldTwo.id + ".click();";
			eval(t); 
		} else {
			eval("document.forms." + formOne + ".submit();"); 
		}			
	} else {
		//per Safari - alert("Please enter a value.");
		// CA- alert("<onl:resourceBundle key="cart.promoCodeMess"/>");
	}
	return false;
}

function isTheEnterKey(e, fieldOne, fieldTwo, formOne) {

	//NOTE: for IE, form submission should automatically continue for Enter key
	if (document.all) { return true; }

	var arg1 = document.getElementById(fieldOne);
	var arg2 = document.getElementById(fieldTwo);
	var arg3 = document.getElementById(formOne);

    var key = (window.event) ? event.keyCode : e.which;       
        // Was key that was pressed a return (13) or (3 = return key for safari)?			
    if ((key == 13) || (key == 3)) {
		submitGenericForm(arg1, arg2, arg3);
		return false;
	}
	return true;
}



// Checkout verification of Service Agreement acceptance 
function svcAgrBoxReset(boxId){
	document.getElementById(boxId).checked = false;
}

function svcAgrBox(boxId){
	if(document.getElementById(boxId).checked == true){
		showDiv('termsChecked'); 
		hideDiv('termsNotChecked');
	}else{ 
		showDiv('termsNotChecked');
		hideDiv('termsChecked');
	}
}

function showDiv(divid){
	document.getElementById(divid).style.display = 'block';
}

function hideDiv(divid){
	document.getElementById(divid).style.display = 'none';
}
