//**************************************************
// commonFunc.js
// Author: Tong Lim
// Version: 1.6
// Date: 9/27/2006
// Update: 9/10/2010 (Tong Lim)
//***************************************************

/*
Example how to call it:
	commonFunc.mainInit("");
	commonFunc.addOnload("test();");
	commonFunc.setBrowBackButStatus();
	commonFunc.isBrowBackBut();
	commonFunc.browBackRefreshPage();
	commonFunc.getElementObj("test");
	commonFunc.getStyleObj("test");
	commonFunc.displayElement("test", true);
	commonFunc.toggleDisplayElement("test");
	commonFunc.visibleElement("test", true);
	commonFunc.toggleVisibleElement("test");
	commonFunc.readonlyTextInput("test", true);
	commonFunc.disableTextInput("test", true);
	printPage();
	onkeypress="return commonFunc.isNumeric(event)";
	onkeypress="return commonFunc.isChar(event)";
	onkeypress="commonFunc.numericOnly(event)";
	onkeypress="commonFunc.noZero(event)";
	onkeypress="commonFunc.charOnly(event)";
	commonFunc.Trim(str);
	commonFunc.centerDiv("test");
	commonFunc.isCheckboxCheck("test");
	onkeyup="commonFunc.autoTab(this,'contactPhoneNumber_b',event)";
	commonFunc.overLayDiv(true) or commonFunc.overLayDiv(false);
	commonFunc.divPopUP("testDiv",true) or commonFunc.divPopUP("testDiv",false);
	commonFunc.toggleTextBold("test");
	commonFunc.textBold("test", true);
	commonFunc.getCookie("test");
	commonFunc.setCookie("test","this is test");
	commonFunc.deleteCookie("test");
	onkeyup="return commonFunc.isMaxLength(event, this, 255)";
	commonFunc.setOpacity(0,"test");
	commonFunc.fadeInOutPopup(0,"test");
	// below added by Brodie
	tgt = commonFunc.getTarget(e);
	klassyElements = commonFunc.getElementsByClassName("klassy"); 
	commonFunc.eventObserve(someElement,"click", someFunc, false);
	commonFunc.eventStopObserving(someElement,"click", someFunc, false);
	myElement = commonFunc.addClass("klassy",myElement);
	myElementNoKlass = commonFunc.removeClass("klassy",myElement);
	myElement = commonFunc.toggleClass("klassy",myElement);
	myElement = commonFunc.toggleClasses("klassy","noKlass",true);
*/


var commonFunc = new function () {
	var W3C = (!document.all && document.getElementById);
	var IE = (document.all);
	var ns4 = (document.layers);
	var v_debug = false;
	var vMainInit = '';
	var vBrowBackButStatus = '#vucbbb';
	var vQueryStr = '';
	var vPathName = '';
	var vFuncLogName = '';

	// Name: mainInit
	// Desc: Execute all the function in the vMainInit after the page is loaded.
	// param: nothing
	// return: nothing
	// Example how to call it: onload="commonFunc.mainInit();"
	this.mainInit = function mainInit() {
		var vArrayObj = vMainInit.split(';');
		for (var i=0; i<vArrayObj.length; i++) {
			try {
				eval(vArrayObj[i]);
			}
			catch (e) {
				displayError(arguments.callee.toString(), vArrayObj[i]);
			}
		}
	}
	
	// Name: addOnload
	// Desc: add the name of the function to be run onload event
	// param: name of a function
	// return: nothing
	// Example how to call it: commonFunc.addOnLoad("test();");
	this.addOnload = function addOnload(param) {
		try {
			var str = '';
			if (param.indexOf(';') == -1)
				str = ';';
			vMainInit += param + str;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}

	this.browserType = function () {
		if (W3C)
			alert("WC3: " + W3C);
		if (IE)
			alert("IE: " + IE);
		if (ns4)
			alert("NS4: " + ns4);
	}
	
	// Name: getFunctionName
	// Desc: get the name of the current function
	// param: pass in the string of the function
	// return: name of the function
	function getFunctionName(str) {
			var ownName = str;
            ownName = ownName.substr('function '.length);        // trim off "function "
            ownName = ownName.substr(0, ownName.indexOf('('));   // trim off everything after the function name
			return ownName;
	}

	this.debug = function(p) {
		v_debug = p;
	}

	this.displayLog = function() {
		alert(vFuncLogName);
	}

	function displayError(str, param2) {
		//if (v_debug) alert("error occur in " + getFunctionName(str));
		var vStr = getFunctionName(str);
		vFuncLogName += vStr + '->' + param2 + '; ';
	}


	this.setBrowBackButStatus = function setBrowBackButStatus() {	
		try {
			document.location.hash = vBrowBackButStatus;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}


	this.isBrowBackBut = function isBrowBackBut() {
		try { 
			//vQueryStr = document.location.search;
			vPathName = document.location.pathname;
			return (document.location.hash == vBrowBackButStatus) ? true : false;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of isBrowBackBut
	
	
	this.browBackRefreshPage = function browBackRefreshPage() {
		try {
			if (this.isBrowBackBut()) {
				window.location.href = vPathName;
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}


	//--------------------------------------------
	// Name: imgSwap
	// Desc: swap image
	// param: p1 = object, p2 = image one, p3 = image two
	// return: nothing
	var v_imgSwap=0;
	this.imgSwap = function imgSwap(p1, p2, p3) {
		try {
			if (v_imgSwap == p3 || v_imgSwap == 0) {
				p1.src = p2;
				v_imgSwap = p2;
				return 1;
			} else {
				p1.src = p3;
				v_imgSwap = p3;
				return 2;
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of imgSwap


	//--------------------------------------------
	// Name: getElementObj
	// Desc: Function to get an obj of element. pass in an id and it return the obj
	// param: string of id
	// return: an object
	// Example how to call it: commonFunc.getElementObj("test", true)
	this.getElementObj = function getElementObj(param) {
		try {
			if (typeof param == 'object') {
				return param;
			}
			else {
				if (document.getElementById) { // W3C - Explorer 5+ and Netscape 6+
					return  document.getElementById(param);
				}
				else if (document.all) { // Explorer 4
					return document.all[param];
				}
				else if (document.layers) {  // NS4
					return document.layers[param];
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of getElementObj
	
	//--------------------------------------------
	// Name: getElementsByClassName
	// Desc: Function to return an array of elements that have a specified class in their className
	// className: className to find
	// tag: tag name to restrict search to, defaults "*"
	// elm: parent element to search in, defaults to document
	// return: an object
	// Example how to call it: testClassArray = commonFunc.getElementsByClassName("testClass");
	this.getElementsByClassName = function getElementsByClassName(className, tag, elm) {
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var returnElements = [];
		var current;
		var length = elements.length;
		for(var i=0; i<length; i++){
			current = elements[i];
			if(testClass.test(current.className)){
				returnElements.push(current);
			}
		}
		return returnElements;
	} // end of getElementsByClassName



	//------------------------------------------
	// Name: getStyleObj
	// Desc: Function to get the style object of the element. Pass in an id or object.
	// param: p1 = an object
	// return: style object of an element for readonly
	// Example how to call it: commonFunc.getStyleObj("test")
	this.getStyleObj = function getStyleObj(obj) {
		try {
			if (typeof(obj.currentStyle) != "undefined") 
				return obj.currentStyle;
			 else if (typeof(window.getComputedStyle) != "undefined") 
				return window.getComputedStyle(obj,"");
			 else 
				return obj.style;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of getStyleObj
	
	
	//------------------------------------------
	// Name: getClassNameObj
	// Desc: Function to get the className object of the element. Pass in an id or object.
	// param: p1 = an object
	// return: className object of an element for readonly
	// Example how to call it: commonFunc.getClassNameObj("test")
	this.getClassNameObj = function getClassNameObj(obj) {
		try {
			if (typeof(obj.currentClassName) != "undefined") 
				return obj.currentClassName;
			 else if (typeof(window.getComputedClassName) != "undefined") 
				return window.getComputedClassName(obj,"");
			 else 
				return obj.className;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of getClassNameObj



	//------------------------------------------
	// Name: displayElement
	// Desc: Function to hide or show an element with display property. Pass in an id or object and it will hide the element.
	// param: p1 = id string or an object; status = true or false
	// return: nothing
	// Example how to call it: commonFunc.displayElement("test", true)
	this.displayElement = function displayElement(p1, status) {
		try {
			var obj = this.getElementObj(p1);
			if (status == true) {
				obj.style.display = "";
			} else if (status == false) {
				obj.style.display = "none";
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of displayElement


	//------------------------------------------
	// Name: toggleDisplayElement
	// Desc: Function to toggle display property of an element. Pass in an id or object and it will hide the element.
	// param: p1 = id string or an object
	// return: nothing
	// Example how to call it: commonFunc.toggleDisplayElement("test")
	this.toggleDisplayElement = function toggoleDisplayElement(p1) {
		try {
			var obj = this.getElementObj(p1);
			var styleObj = this.getStyleObj(obj);
			if (obj != undefined) {
				if (styleObj.display == "none") {
					obj.style.display = "block";
				} else {
					obj.style.display = "none";
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of toggleDisplayElement


	//------------------------------------------
	// Name: visibleElement
	// Desc: Function to hide or show an element with visibility property. Pass in an id or object and it will hide the element.
	// param: p1 = id string or an object; status = true or false
	// return: nothing
	// Example how to call it: commonFunc.visibleElement("test", true)
	this.visibleElement = function visibleElement(p1, status) {
		try {
			var obj = this.getElementObj(p1);
			if (obj != undefined) {
				if (status == true) {
					obj.style.visibility = "";
				} else if (status == false) {
					obj.style.visibility = "hidden";
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of visibleElement


	//------------------------------------------
	// Name: toggleVisibleElement
	// Desc: Function to toggle visibility property an element. Pass in an id or object and it will hide the element.
	// param: p1 = id string or an object
	// return: nothing
	// Example how to call it: commonFunc.toggleVisibleElement("test")
	this.toggleVisibleElement = function toggleVisibleElement(p1) {
		try {
			var obj = this.getElementObj(p1);
			var styleObj = this.getStyleObj(obj);
			if (obj != undefined) {
				if (styleObj.visibility == "hidden") {
					obj.style.visibility = "";
				} else {
					obj.style.visibility = "hidden";
				}
			}
					
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of ToggleVisibleElement


	//--------------------------------------------------
	// Name: readonlyTextInput
	// Desc: Function enable or disable readonly attribute for input text field.
	// param: p1 = pass in an object or string id; status = true or false
	// return: nothing
	// Example how to call it: commonFunc.readonlyTextInput("test", true)
	this.readonlyTextInput = function readonlyTextInput(p1, status) {
		try {
			var obj = this.getElementObj(p1);
			if (status) {
				obj.readOnly = true;
				obj.style.color = "#999999";
			}
			else {
				obj.readOnly = false;
				obj.style.color = "";
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of readonlyTextInput


	//--------------------------------------------
	// Name: disableTextInput
	// Desc: Function disable or enable the input text field.
	// param: p1 = pass in an object or string id; status = true or false
	// return: nothing
	// Example how to call it: commonFunc.disableTextInput("test", true)
	this.disableTextInput = function disableTextInput(p1, status) {
		try {
			var obj = this.getElementObj(p1);
			obj.disabled = status;
			if (status)
			obj.style.color = "#999999";
			else obj.style.color = "";
		
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of disableTextInput


	//--------------------------------------------
	// Name: printPage
	// Desc: Print current page.
	// param: nothing
	// return: nothing
	this.printPage = function(){
		if (window.print) {
			agree = confirm('Press OK to print this page.');
			if (agree)
				window.print();
		}
	}  // end of printPage


	//--------------------------------------------
	// Name: isNumeric
	// Desc: Function to test if the key pressed is numeric number.
	// param: e = Pass in an event.
	// return: true or false
	// Example how to call it: onkeypress="return(commonFunc.isNumeric(event))"
	this.isNumeric = function isNumeric(e) {
		try {
			var key = (window.event) ? event.keyCode : e.which;
			// Was key that was pressed a numeric character (0-9) or backspace (8) or return (13) or tab(9)?
			if ( (key >= 48 && key <= 57) || (key == 8) || (key == 13) || (key == 9) || (key == 0)) { 
				return true;
			}
			else {
				return false;
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of isNumeric


    //--------------------------------------------
	// Name: isChar
	// Desc: Function to test if the key pressed is character.
	// param: e = Pass in an event.
	// return: true or false
	// Example how to call it: onkeypress="return(commonFunc.isChar(event))"
	this.isChar = function isChar(e) {
		try {
			var key = (window.event) ? event.keyCode : e.which;
			// Was key that was pressed a numeric character (a-z, A-Z) or backspace (8) or return (13) or tab(9) ?
			if ( (key >= 65 && key <= 90) || (key == 8) || (key == 13) || (key == 9) || (key == 0) || (key >= 97 && key <= 122))
				return true;
			else
				return false;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of isChar


	//--------------------------------------------
	// Name: numericOnly
	// Desc: Function that allow only numeric character to be enter.
	// param: e = Pass in an event.
	// return: true = number only or false = not number only
	// Example how to call it: onkeypress="commonFunc.numericOnly(event)"
	this.numericOnly = function numericOnly(e) {
        try {
			if (! this.isNumeric(e)) {
				if (window.event) // IE
					window.event.returnValue = null;
				else // Firefox
					e.preventDefault();
				return false;
			}
			return true;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of numericOnly


	//--------------------------------------------
	// Name: noZero
	// Desc: don't allow zero
	// param: e = event
	// return: true or false
	// Example how to call it: onkeypress="commonFunc.noZero(event);"
	var inputBoxValue = "";
	var inputBoxObj = null;
	this.noZero = function noZero(e) {
		try {
			var isNumber = this.numericOnly(e);
			if (isNumber) {
				var key = (window.event) ? event.keyCode : e.which;
				var curValue = "";

				if (e.srcElement) {
					curValue = e.srcElement.value;
					inputBoxObj = e.srcElement;
				}
				else if (e.target) {
					curValue =  e.target.value;
					inputBoxObj = e.target;
				}
				inputBoxValue = curValue;
				var num = curValue + String.fromCharCode(key);
				if (num == '0') {
					if (window.event) // IE
						window.event.returnValue = null;
					else // Firefox
						e.preventDefault();
				}
				setTimeout('commonFunc.checkZero()',1);
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}

	} // end of noZero


	//--------------------------------------------
	// Desc: This function is call by noZero(). If the user do a selected all and then type a zero. It reset the input text box to the previous value.
	this.checkZero = function checkZero() {
		try {
			if (inputBoxObj != null) {
				if (inputBoxObj.value.toString() == '0')
					inputBoxObj.value = inputBoxValue;
				inputBoxObj = null;
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of checkZero


	//--------------------------------------------
	// Name: charOnly
	// Desc: Function that allow only character to be enter.
	// param: e = Pass in an event.
	// return: nothing
    // Example how to call it: onkeypress="return(commonFunc.charOnly(event))"
	this.charOnly = function charOnly(e) {
		try {
			if (! this.isChar(e)) {
				if (window.event) // IE
					window.event.returnValue = null;
				else // Firefox
					e.preventDefault();
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of charOnly


	//--------------------------------------------
	// Name: Trim
	// Desc: Trim both trailing and leading spaces.
	// param: string
	// return: string
	// Example how to call it: commonFunc.Trim(str)
	this.Trim = function (StringToTrim) {
		 return StringToTrim.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	} // end of Trim()

	var iebody = (!document.compatMode || document.compatMode == "BackCompat") ? document.body : document.documentElement;

	//--------------------------------------------
	// Name: centerDiv
	// Desc: Move the div to the center of the browser.
	// param: id of div
	// return: nothing
	// Example how to call it: commonFunc.centerDiv()
	this.centerDiv = function centerDiv(div) {
		try {
			var obj = this.getElementObj(div);
			obj.style.position = 'absolute';
			obj.style.left = '50%';
			obj.style.marginLeft = -parseInt(obj.offsetWidth/2) + 'px';
			if (obj.offsetLeft < 25) obj.style.left = (IE ? iebody.scrollLeft: window.pageXOffset) + 25 + 'px', obj.style.marginLeft = '0px';
			obj.style.top = parseInt(IE ? iebody.scrollTop + (iebody.clientHeight/2) : window.pageYOffset + (window.innerHeight/2)) + 'px';
			obj.style.marginTop = -parseInt(obj.offsetHeight/2) + 'px';
			if (obj.offsetTop < 25) obj.style.top = (IE ? iebody.scrollTop: window.pageYOffset) + 25 + 'px', obj.style.marginTop = '0px';
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of centerDiv

	//--------------------------------------------
	// Name: isCheckboxCheck
	// Desc: Check to see if the checkbox is check or not
	// param: id name
	// return: true or false, multiple = if there are multiple of same input id, null = did not find any match
	// Example how to call it: commonFunc.isCheckboxCheck("test")
	this.isCheckboxCheck = function isCheckboxCheck(param) {
		try {
			var nodeList = document.getElementsByTagName("input");
			var count = 0;
			var obj = null;
			var return_value = null;

			for (i=0; i<nodeList.length; i++) {
				if (nodeList[i].id == param) {
					count++;
					obj = nodeList[i];
				}
			}
			if (count == 1) {
				return_value = obj.checked;
			} else if (count > 1) {
				return_value = "multiple checkbox with same id";
			}
			return return_value;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of isCheckboxCheck


	//--------------------------------------------
	// Name: autoTab
	// Desc: tab to the next input field
	// param: element = pass current input field; nextElement = id of the next input field; e = event
	// return: nothing
	// Example how to call it: onkeyup="autoTab(this,'contactPhoneNumber_b',event);"
	this.autoTab = function autoTab(element, nextElement, e) {
		try {
			var doAutoTab = true;
			// This code allow for the shift tab
			if (e != undefined) {
				var key = (window.event) ? event.keyCode : e.which;
				if (key == 0) {
					doAutoTab = false;
				} else if (key == 9) {
					doAutoTab = false;
				} else if (key == 16) {
					doAutoTab = false;
				}
			}

			if (doAutoTab) {
				if (element.value.length == element.maxLength && nextElement != null) {
					document.getElementById(nextElement).focus();
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of autoTab

	//--------------------------------------------
	// Name: clickOnEnter
	// Desc: captures enter keypress and clicks passed in element
	// param: element = pass in id or element obj to click; e = event
	// return: nothing
	// Example how to call it: onkeypress="clickOnEnter('someButton',e);"
	this.clickOnEnter = function clickOnEnter(element,e) {
		try {
			if (e != undefined) {
				var key = (window.event) ? event.keyCode : e.which;
				if (key == 13) {
					elObj = commonFunc.getElementObj(element);
					if (elObj.click) {
						elObj.click();
					} else if (elObj.onclick) {
						elObj.onclick();
					}
					return false;
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
		return true;
	} // end of autoTab

	//--------------------------------------------
	// Name: overLayDiv
	// Desc: Expand the div to cover the whole document and you can still can see it
	// param: show = true for expand or false for shrink
	// return: v_name
	// Example how to call it: commonFunc.overLayDiv(true); or commonFunc.overLayDiv(false);
	this.overLayDiv = function overLayDiv(show) {
		try {
			var v_name = 'overlayDiv';
			var obj = this.getElementObj(v_name);
			if (obj == null) {
				divElement = document.createElement('div');
				divElement.setAttribute('id', v_name);
				divElement.setAttribute('style', 'z-index:50;');
				document.getElementsByTagName('body')[0].appendChild(divElement);
				obj = this.getElementObj(v_name);
			}

			if (show) {
				obj.style.display = 'block';
				obj.style.position = 'fixed';
				obj.style.top = obj.style.left = '0px';
				obj.style.height = obj.style.width = '100%';
				obj.style.backgroundColor = 'black';
				obj.style.filter = IE ? 'alpha(opacity=50)' : 'alpha(opacity=.5)';
				obj.style.opacity = IE ? '50' : '.5';
			}
			else {
				obj.style.display = 'none';
			}

			return(v_name);
		} catch(e) {
			displayError(arguments.callee.toString());
		}

	} // end of overLayDiv

	//--------------------------------------------
	// Name: divPopUp
	// Desc: perform a div popup message
	// param: id = pass id of the div; visible = true for show div or false for hide div
	// return: nothing
	// Example how to call it: commonFunc.divPopUP("testDiv",true); or commonFunc.divPopUP("testDiv",false);
	this.divPopUp = function divPopUp(id, visible) {
		try {
			/*if (visible) {
				commonFunc.setOpacity(0,id);
				commonFunc.fadeInThePopup(id);
			}*/
			this.visibleElement(id, visible);
			if (visible)
				this.centerDiv(id);
			
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of divPopUp


	//------------------------------------------
	// Name: toggleTextBold
	// Desc: Function to toggle text bold or not. Pass in an id or object and it will bold the text or not.
	// param: p1 = id string or an object
	// return: nothing
	// Example how to call it: commonFunc.toggleTextBold("test")
	this.toggleTextBold = function toggleTextBold(p1) {
		try {
			var obj = this.getElementObj(p1);
			var styleObj = this.getStyleObj(obj);
			if (obj != undefined) {
				if ((styleObj.fontWeight == "700") || (styleObj.fontWeight == "bold")){
					obj.style.fontWeight = "";
				} else {
					obj.style.fontWeight = "bold";
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of toggleTextBold


	//------------------------------------------
	// Name: textBold
	// Desc: Function to toggle text bold or not. Pass in an id or object and it will bold the text or not.
	// param: p1 = id string or an object and true or false
	// return: nothing
	// Example how to call it: commonFunc.textBold("test", true)
	this.textBold = function textBold(p1, p2) {
		try {
			var obj = this.getElementObj(p1);
			var styleObj = this.getStyleObj(obj);
			if (obj != undefined) {
				if (p2)
					obj.style.fontWeight = "bold";
				else
					obj.style.fontWeight = "";					
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of textBold


	//------------------------------------------
	// Name: getCookie
	// Desc: Function to get a cookie
	// param: cookieName = cookie name
	// return: valueo of the cookie
	// Example how to call it: commonFunc.getCookie("test")
	this.getCookie = function getCookie(cookieName) {
		try {
			var return_value = null
			cookie_array = document.cookie.split ("; ");
			for (x=0; x < cookie_array.length; x++) {
				cookieParts_array = cookie_array[x].split("=");
				if (cookieParts_array[0] == cookieName) {
					return_value = cookieParts_array[1];
				}
			}
			return return_value;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of getCookie


	//------------------------------------------
	// Name: setCookie
	// Desc: Function to set a cookie
	// param: cookieName = cookie name; cookieValue = value of cookie; expireDate = expire date of cookie, leave blank to have it expire when browser close
	// return: nothing
	// Example how to call it: commonFunc.setCookie("test","this is test")
	this.setCookie = function setCookie(cookieName, cookieValue, expireDate, path) {
		try {
			var domain = document.domain;
			var secure = false;
			cookieStr = cookieName + "=" + cookieValue;
			cookieStr += (expireDate == undefined) ? "" : ("; expires=" + expireDate.toGMTString());  
			cookieStr += (path == undefined) ? "; path=/" : ("; path=" + path);
			cookieStr += (domain == undefined) ? "" : ("; domain=" + domain);
			cookieStr += (secure == true) ? "; secure" : "";
			document.cookie = cookieStr;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of setCookie


	//------------------------------------------
	// Name: deleteCookie
	// Desc: Function to delete a cookie
	// param: cookieName = cookie name; path; domain
	// return: nothing
	// Example how to call it: commonFunc.deleteCookie("test")
	this.deleteCookie = function deleteCookie(cookieName, path) {
		try {
			var domain = document.domain;
			var secure = false;
			cookieStr = cookieName + "=";
			cookieStr += "; expires=Thu, 01-Jan-1970 00:00:01 GMT";  
			cookieStr += (path == undefined) ? "; path=/" : ("; path=" + path);
			cookieStr += (domain == undefined) ? "" : ("; domain=" + domain);
			cookieStr += (secure == true) ? "; secure" : "";
			document.cookie = cookieStr;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of deleteCookie


	//------------------------------------------
	// Name: isMaxLength
	// Desc: Function to check for maxlength of the textarea
	// param: e=event, obj = object of the textarea, MaxLen = length to restrict
	// return: true or false
	// Example how to call it: onkeyup="return commonFunc.isMaxLength(event, this, 255)";
	var currentStr = '';
	this.isMaxLength = function isMaxLength(e, Obj, MaxLen) {
		var key = (window.event) ? event.keyCode : e.which;
		if ((key==8) || (key==35) || (key==33) || (key==34) || (key==35) || (key==36) || (key==37) || (key==38) || (key==39) || (key==40) || (key==45) || (key==46) || (key==13)) 
			return true;

		currentStr = Obj.value;
		if (Obj.value.length > MaxLen) {
			Obj.value = Obj.value.substring(0, MaxLen);
		}
		if (Obj.value.length < MaxLen) {
			return true;
		} else {
			return false;
		}
	} // end of isMaxLength
	

	//------------------------------------------
	// Name: setOpacity
	// Desc: Function to set the opacity
	// param: value=value of the opacity to set, idName = id name of the div
	// return: nothing
	// Example how to call it: commonFunc.setOpacity(0,"test");
	this.setOpacity = function setOpacity(value, idName) { 
		try {
			this.getElementObj(idName).style.opacity = value / 10;
			this.getElementObj(idName).style.filter = 'alpha(opacity=' + value * 10 + ')';
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of setOpacity

	
	//------------------------------------------
	// Name: fadeInThePopup
	// Desc: Function to fade in the popup
	// param: idName = id name of the div
	// return: nothing
	// Example how to call it: commonFunc.fadeInThePopup(0,"test");
	this.fadeInThePopup = function fadeInThePopup(idName) {
		try {
			for (var i = 0; i <= 100; i++) 
				setTimeout( 'commonFunc.setOpacity(' + (i / 10) + ',"' + idName +  '")' , 8 * i );
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of fadeInThePopup
	
	
	//------------------------------------------
	// Name: fadeOutThePopup
	// Desc: Function to fade out the popup
	// param: idName = id name of the div
	// return: nothing
	// Example how to call it: commonFunc.fadeOutThePopup(0,"test");
	this.fadeOutThePopup = function fadeOutThePopup(idName) {
		try {
			for(var i = 0; i <= 100; i++) {
				setTimeout( 'commonFunc.setOpacity(' + (10 - i / 10) + ',"' + idName + '")' , 8 * i );
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	} // end of fadeOutThePopup
	
	
	//------------------------------------------
	// Name: stripTextField
	// Desc: Function to strip non-passed values from a text field
	// param: paramID = id of the text field
	// param: paramSafeString = the string of allowed characters
	// param: paramOnCall = {'onblur', 'onkeypress', etc.}
	// return: the values that are safe from the field value are re-written back to the field value
	// note: if the paramSafeString is empty, it will allow all character strings
	// note: IE will loop if you try to focus on the blur event, hence the reason for the 3rd param.
	// Example how to call it for a typical phone number: commonFunc.stripTextField('myTextFieldId','0123456789().- ');
	this.stripTextField = function stripTextField(paramID, paramSafeString, paramOnCall) 
	{
		try {
			var fieldValue = document.getElementById(paramID).value;
			var onCall = paramOnCall.toLowerCase();
			var safeValue = new String();
			var safeString;
			if (paramSafeString.length > 0)
			{
				safeString = paramSafeString;
				var chars = fieldValue.split("");
				safeValue = "";
				for (i = 0; i < chars.length; i++) 
				{
					if (safeString.indexOf(chars[i]) != -1) 
					{
						safeValue += chars[i];
					}
				}
			}
			else
			{
				safeValue = fieldValue;
			}
			document.getElementById(paramID).value = safeValue;
			if (onCall != "onblur")
			{	
				document.getElementById(paramID).focus();
			}
		} catch(e) {
			alert('ERROR : ' + e.message);
			displayError(arguments.callee.toString());
		}
	}  // end of stripTextField
	
	//------------------------------------------
	// Name: getTarget
	// Desc: returns the target object for an event, IE browser or otherwise
	// param: x=event
	// return: event target or srcElement (IE)
	// Example how to call it: var t = commonFunc.getTarget(e);
	this.getTarget = function getTarget(x)
	{
		x = x || window.event;
		return x.target || x.srcElement;
	} //end of getTarget
	
	//------------------------------------------
	// Name: eventObserve
	// Desc: Cross-browser friendly means of registering event handlers based on the addEvent function by Scott Andrew with slight customization.
	// elm: the element to add the event listener to 
	// evType: click, blur, etc. (leave off the "on")
	// fn: is the function to bind to that event
	// useCapture: true / false.  For last argument of addEventListener (not attachEvent used by IE), it is meant to state whether the event handler should be executed in the capturing or in the bubbling phase. If you’re not certain whether you want capturing or bubbling, use false (bubbling)..
	// Example how to call it:  commonFunc.eventObserve(commonFunc.getElementObj("someButtonId"),"click", someFunc, false);
	this.eventObserve = function eventObserve(elm, evType, fn, useCapture) {
		elm = this.getElementObj(elm);
		if((typeof elm == 'undefined') || (elm == null)){return false}

		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, useCapture);
			return fn;
		}
		else if (elm.attachEvent) {
			try {
				elm['e'+evType+fn] = fn;
				elm[evType+fn] = function(){
										elm['e'+evType+fn](window.event);
									};
				elm.attachEvent( 'on'+evType, elm[evType+fn] );
			} catch (e) {}
				return fn;
			}
		else {
			elm['on' + evType] = fn;
		}
	} // end of eventObserve
	
	
	//------------------------------------------
	// Name: eventStopObserving
	// Desc: Cross-browser friendly means of unregistering event handlers
	// elm: the element to unregister the event handler from
	// evType: click, blur, etc. (leave off the "on")
	// fn: is the function to bind to that event
	// useCapture: true / false.  For last argument of addEventListener (not attachEvent used by IE), it is meant to state whether the event handler should be executed in the capturing or in the bubbling phase. If you’re not certain whether you want capturing or bubbling, use false (bubbling)..
	// Example how to call it:  commonFunc.eventStopObserving(someElm,"click", someFunc, false);
	this.eventStopObserving = function eventStopObserving(elm, evType, fn, useCapture) {
		elm = this.getElementObj(elm);
		if (elm.removeEventListener) {
			elm.removeEventListener(evType, fn, useCapture);
		} else if (elm.detachEvent) {
			try {
				elm.detachEvent( 'on'+evType, elm[evType+fn] );
				elm[evType+fn] = null;
				}
			catch (e) {}
		}
		return fn;
	}

	//------------------------------------------
	// Name: addClass
	// Desc: adds a CSS className to the passed in element
	// className: string of the css class name to add to element
	// elm: the element to add the className to 
	// Example how to call it:  commonFunc.addClass("highlight",commonFunc.getElementObj("someListItemId"));
	this.addClass = function addClass(className,elm) {
		var s = "";
		elm = this.getElementObj(elm);
		if (elm.className != "") {
			s = " ";
		}
		elm.className += s + className;
		return elm;
	} //end addClass
	
	//------------------------------------------
	// Name: removeClass
	// Desc: removes a CSS className from the passed in element
	// className: string of the css class name to remove from the element
	// elm: the element to remove the className from
	// Example how to call it:  commonFunc.addClass("highlight",commonFunc.getElementObj("someListItemId"));
	this.removeClass = function removeClass(className,elm) {
		var pattern = new RegExp("(^|\\s)"+className+"($|\\s)");
		elm = this.getElementObj(elm);
		elm.className = elm.className.replace(pattern,"");
		elm.className = elm.className.replace("  "," ");
		return elm;
	} //end removeClass
	
	//------------------------------------------
	// Name: toggleClass
	// Desc: adds or removes a CSS className to the passed in element depending whether the className is present already on the element
	// className: string of the css class name to toggle
	// elm: the element to toggle the className on 
	// addClass: (optional) if true it will add the class if not present to the element
	// Example how to call it:  commonFunc.toggleClass("highlight",commonFunc.getElementObj("someInput"));
	this.toggleClass = function toggleClass(className,elm) {
		var pattern = new RegExp("(^|\\s)"+className+"($|\\s)");
		elm = this.getElementObj(elm);
		if (elm.className.match(pattern)) {
			elm = this.removeClass(className,elm);
		} else {
			elm = this.addClass(className,elm);
		}
		return elm;
	} //end toggleClass
	
	//------------------------------------------
	// Name: flipClasses
	// Desc: flips between two CSS classes on an element
	// class1: string of the first css class name to toggle
	// class2: string of the first css class name to toggle
	// elm: the element to toggle the class names on
	// addFirst: boolean. if neither class1 or class2 is present on element add class1 to element. default is false;
	// Example how to call it:  commonFunc.toggleClasses("highlight","muted",commonFunc.getElementObj("someDiv"),true);
	this.flipClasses = function flipClasses(class1,class2,elm,addFirst) {
		var pattern1 = new RegExp("(^|\\s)"+class1+"($|\\s)");
		var pattern2 = new RegExp("(^|\\s)"+class2+"($|\\s)");
		elm = this.getElementObj(elm);
		if (elm.className.match(pattern1)) {
			elm = this.removeClass(class1,elm);
			elm = this.addClass(class2,elm);
		} else if (elm.className.match(pattern2)) {
			elm = this.removeClass(class2,elm);
			elm = this.addClass(class1,elm);
		}
		if (addFirst === true && ! elm.className.match(pattern1) && ! elm.className.match(pattern2))
			elm = this.addClass(class1,elm);
		return elm;
	} //end toggleClasses
	
	//------------------------------------------
	// Name: matchClass
	// Desc: checks for the existence of a class name on an element
	// className: string of the css class name to look for
	// elm: the element to look for the css className on
	// Example how to call it:  hasMatch = commonFunc.matchClass("highlight", "someDiv");
	this.matchClass = function matchClass(className,elm) {
		var pattern = new RegExp("(^|\\s)"+className+"($|\\s)");
		elm = this.getElementObj(elm);
		if (elm.className && elm.className.match(pattern)) {
			return true;
		} else {
			return false;
		}
	}
	//------------------------------------------
	// Name: isOverflowing
	// Desc: returns true if the passed in element is in overflow css state, false otherwise
	// Adapted slightly from http://stackoverflow.com/questions/143815/how-to-determine-from-javascript-if-an-html-element-has-overflowing-content
	// elm: the element object or id to check if it is overflowing
	// Example how to call it:  someDivOverflowX = commonFunc.isOverflowing("someDiv","x");
	this.isOverflowing = function isOverflowing(elm,direction) {
		var direction = direction || 'both';
		elm = this.getElementObj(elm);
		var curOverflow = elm.style.overflow;
		if ( !curOverflow || curOverflow === "visible" ) elm.style.overflow = "hidden";
		if (direction == 'both') {
			var isOverflowing = (elm.clientWidth < elm.scrollWidth || elm.clientHeight < elm.scrollHeight);
		} else if (direction == 'x') {
			var isOverflowing = (elm.clientWidth < elm.scrollWidth);
		}  else if (direction == 'y') {
			var isOverflowing = (elm.clientHeight < elm.scrollHeight);
		}
		elm.style.overflow = curOverflow;
		return isOverflowing;
	}
} // end of commonFunc