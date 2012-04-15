//**************************************************
// TLUtils.js
// Author: Tong Lim 
// Version: 1.2
// Date: 1/8/2006
// Update: 3/30/2006
//***************************************************


function TLUtils() {
	

	var wc3 = (!document.all && document.getElementById);
	var ie4 = (document.all);	
	var ns4 = (document.layers);		
	

	this.debug = function () {
		if (wc3) 
			alert("WC3: " + wc3);
		if (ie4) 
			alert("IE: " + ie4);
		if (ns4) 
			alert("NS4: " + ns4);
	}
	
	var v_imgSwap=0; 

	

	//--------------------------------------------
	// Desc: swap image
	// param: p1 = object
	// param: p2 = image one
	// param: p3 = image two
	// return: nothing

	this.imgSwap = function (p1, p2, p3) {
		if (v_imgSwap == p3 || v_imgSwap == 0) {
			p1.src = p2;
			v_imgSwap = p2;
			return 1;
		} else {
			p1.src = p3;
			v_imgSwap = p3;
			return 2;
		}	
	}
	

	

	//--------------------------------------------
	// Desc: hide layer
	// param: v_array = array of string name
	// return: nothing
	this.doHideLayers = function (v_array) {
		for (i=0; i<v_array.length; i++) { 
			if (v_array[i] != null) { 										
				this.hideElement(v_array[i]);
			}
		}
	}
	

	

	//--------------------------------------------
	// Desc: show layer
	// param: v_array = array of string name
	// return: nothing
	this.doShowLayers = function (v_array) {
		for (i=0; i<v_array.length; i++) {
			if (v_array[i] != null) {				
				this.showElement(v_array[i]);
			}
		}
	}
	

	

	//--------------------------------------------
	// Desc: Function to get an obj of element. pass in an id and it return the obj
	// param: id = string of id 
	// return: an object
	this.getBrowserObj = function(id) {				
		if (ns4) {
			return document.layers[id];
		}	
		else if (ie4) { // Explorer 4			
			return document.all[id]; 			
		}	
		else if (wc3) { // W3C - Explorer 5+ and Netscape 6+
			return  document.getElementById(id);
		} 

	}			
	



	//------------------------------------------
	// Desc: Function to hide an element. Pass in an id or object and it will hide the element.
	// param: id = id string or an object
	// return: nothing
	this.hideElement = function (p1) {		
		var obj = this.determineElement(p1); 		
		if (obj != undefined) {
			if (ns4){ // Netscape 4	
				obj.visibility = "hide";
			}		
			else { // W3C - Explorer 5+ and Netscape 6+		
				obj.style.visibility = "hidden";
			}	
		}
	}			
	



	//--------------------------------------
	// Desc: Function to show an element. Pass in an id or object and it will show the element.
	// param: id = id string or an object
	// return: nothing
	this.showElement = function (p1) {
		var obj = this.determineElement(p1);		
		if (obj != undefined) {
			if(ns4) { // Netscape 4		
				obj.visibility = "show";
			}	
			else { // W3C - Explorer 5+ and Netscape 6+		
				obj.style.visibility = "visible";
			}
		}
	}




	//--------------------------------------------------
	// Desc: Function enable or disable readonly attribute for input text field.
	// param: p1 = pass in an object or string id
	// param: status = true or false
	// return: nothing
	this.readonlyTextInput = function (p1, status) {
		var obj = this.determineElement(p1);
		if (status) {
			//obj.setAttribute("readonly", "readonly");
			obj.readOnly = true;
			//obj.style.backgroundColor = "#CCCCCC";
			obj.style.color = "#999999";
		}
		else {
			obj.readOnly = false;
			//obj.removeAttribute('readonly');		
			//obj.style.backgroundColor = "";
			obj.style.color = "";
		}
	}
	

	

	//--------------------------------------------
	// Desc: Function disable or enable the input text field.
	// param: p1 = pass in an object or string id
	// param: status = true or false
	// return: nothing
	this.disableTextInput = function (p1, status) {
		var obj = this.determineElement(p1);
		obj.disabled = status;
	}

	

	

	//--------------------------------------------
	// Desc: Print current page.
	// param: nothing
	// return: nothing
	this.printPage = function(){
		if (window.print) {
			agree = confirm('Press OK to print this page.');
			if (agree) window.print();
		}	
	}	
	



    //--------------------------------------------
	// Desc: Function determine the param is a string or an object
	// param: p1 = pass in an id or object and it return an object
	// return: an object
	this.determineElement = function (p1) {
		if (typeof p1 == 'object') { 
			return p1; 
		}
		else {
			return this.getBrowserObj(p1);
		}
	}




	//--------------------------------------------
	// Desc: Function to test if the key pressed is numeric number.
	// param: e = Pass in an event.
	// return: true or false
	// Example how to call it: onkeypress="return(TLUtils.isNumeric(event))"
	this.isNumeric = function (e) { 
        var key = (window.event) ? event.keyCode : e.which;                 
        // Was key that was pressed a numeric character (0-9) or backspace (8) or return (13) or tab(9) or delete(46)?               
		if ( (key >= 48 && key <= 57) || (key == 8) || (key == 13) || (key == 9) || (key == 0)) {
            if ((key >= 48 && key <= 57) && (e.shiftKey == true)) {
				return false;
			} else {
				return true; 
			}
		}
        else {
            return false;
		}
	}




    //--------------------------------------------
	// Desc: Function to test if the key pressed is character.
	// param: e = Pass in an event.
	// return: true or false
	// Example how to call it: onkeypress="return(TLUtils.isChar(event))"
	this.isChar = function (e) {
        var key = (window.event) ? event.keyCode : e.which;       
        // Was key that was pressed a numeric character (a-z, A-Z) or backspace (8) or return (13) or tab(9)?
        if ( (key >= 65 && key <= 90) || (key == 8) || (key == 13) || (key == 9) || (key == 0) || (key >= 97 && key <= 122))
            return true;
        else
            return false;   
	}




	//--------------------------------------------
	// Desc: Function that allow only numeric character to be enter.
	// param: e = Pass in an event.
	// return: nothing
    // Example how to call it: onkeypress="TLUtils.numericOnly(event)"
	this.numericOnly = function (e) { 
        if (! this.isNumeric(e)) {
            if (window.event) // IE
                window.event.returnValue = null;
            else // Firefox
                e.preventDefault();
        }
	}




	//--------------------------------------------
	// Desc: Function that allow only character to be enter.
	// param: e = Pass in an event.
	// return: nothing
    // Example how to call it: onkeypress="TLUtils.charOnly(event)"
	this.charOnly = function (e) {
        if (! this.isChar(e)) {
            if (window.event) // IE
                window.event.returnValue = null;
            else // Firefox
                e.preventDefault();
        }
	}


}



var TLUtils = new TLUtils();



