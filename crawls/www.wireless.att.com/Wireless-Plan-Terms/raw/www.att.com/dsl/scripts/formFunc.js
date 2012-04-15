//**************************************************
// formFunc.js
// Author: Tong Lim 
// Version: 1.3
// Date: 3/23/2008
// Update: 2/28/2009
//***************************************************

/*
Example how to call it:
	formFunc.setRadioLabel(obj,'fontStyle;fontWeight','italic;bold');
	formFunc.setRadioLabelByName('rad2','fontSize','24px');
	formFunc.setAllRadioLabel('fontWeight;fontStyle','bold;italic');
	formFunc.setRadioClick('test');
	formFunc.clickAllRadio();
	formFunc.disableElementsByName('test', true); or formFunc.disableElementsByName('test', false);
	value = formFunc.getSelectedRadio("rad2","value"); or value = formFunc.getSelectedRadio("rad2","id");
	formFunc.getAllCheckbox();
	formFunc.getAllInputText();
	formFunc.getAllInputHidden();
	formFunc.getSelectDropDownValue(str);	
*/


var formFunc = new function () {
	
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

	function displayError(str) {
		if (v_debug) alert("error occur in " + getFunctionName(str));
	}


	// ***** Begin the function for setting style to the radio label. *****
	var v_radioLabelArray = new Array();
	var v_debug = false;
		
	// Name: SetRadioLabelStyle
	// Desc: This is a private function
	function SetRadioLabelStyle(obj, styleName, styleValue) {
		try {
			str = "document.getElementById('" + obj.id + "').style." + styleName+ " = " + "'" + styleValue + "';";
			eval(str);
		} catch(e) { /* do nothing */ }
	} // end of setRadioLabelStyle


	// Name: setRadioLabelAllStyle
	// Desc: This is a private function
	function setRadioLabelAllStyle (obj, styleName, styleValue) {
		try {
			var split_str1 = styleName.split(";");
			var split_str2 = styleValue.split(";"); 
			for (k=0; k<split_str1.length; k++) {
				var v_value = (styleValue == "") ? styleValue : split_str2[k];
				SetRadioLabelStyle(obj, split_str1[k], v_value);
			}
		} catch(e) { /* do nothing */ }
	} // end of setRadioLabelAllStyle


	// Name: setDefaultRadioLabel
	// Desc: This is a private function
	function setDefaultRadioLabel (str, styleName, styleValue) { 
		try {
			var v_length = v_radioLabelArray.length;
			obj = document.getElementById(str + "lbl");
			v_radioLabelArray[v_length] = obj;
			setRadioLabelAllStyle(obj, styleName, styleValue); 
		} catch(e) { /* do nothing */ }
	} // end of setDefaultRadioLabel

		
	// Name: setRadioLabel
	// param: pass in the id, style name and style value
	// return: nothing
	// example: formFunc.setRadioLabel(obj,'fontStyle;fontWeight','italic;bold');
	this.setRadioLabel = function setRadioLabel(pObj, styleName, styleValue) {
		try {
			var objLbl = document.getElementById(pObj.id  + "lbl");
			setRadioLabelAllStyle(objLbl, styleName, styleValue); 
			
			var v_length = v_radioLabelArray.length, found = false;
			if (v_length > 0) {
				for (i=0; i<v_length; i++) {
					obj = v_radioLabelArray[i];
					if (obj != null) {
						if (obj.id.indexOf(pObj.name) != -1) {
							if (obj.id != objLbl.id) {
								setRadioLabelAllStyle(obj, styleName, "");
								v_radioLabelArray[i] = objLbl;
								found = true;
							}						
						}
					}
				}	
			}
			
			if (found == false)
				v_radioLabelArray[v_radioLabelArray.length] = objLbl;
		} catch(e) { 
			displayError(arguments.callee.toString());
		}
	} // end of setRadioLabel

	
	// Name: setRadioLabelByName
	// param: pass in the radio name, style name and style value
	// return: nothing
	// example: formFunc.setRadioLabelByName('rad2','fontSize','24px');
	this.setRadioLabelByName = function setRadioLabelByName(str, styleName, styleValue) {
		try {
			var id_str = this.getSelectedRadio(str,'id'); 
			setDefaultRadioLabel(id_str, styleName, styleValue);
		} catch(e) {  
			displayError(arguments.callee.toString());
		}
	} // end of setRadioLabelByName 

	
	// Name: setAllRadioLabel
	// param: pass in the style name and style value
	// return: nothing 
	// example: formFunc.setAllRadioLabel('fontWeight;fontStyle','bold;italic');
	this.setAllRadioLabel = function setAllRadioLabel(styleName, styleValue) {
		try {
			var array_obj = document.getElementsByTagName("input");
			for (i=0; i<array_obj.length; i++) {
				if ((array_obj[i].type == "radio") && (array_obj[i].checked)) {
					setDefaultRadioLabel(array_obj[i].id, styleName, styleValue);
				}
			}
		} catch (e) {
			displayError(arguments.callee.toString());
		}
	} // end of setAllRadioLabel
	
	// ***** End the function for setting style to the radio label. *****
	
	
	// Name: setRadioClick
	// Desc: perform a click on the obj.
	// param: pass in an id or obj
	// return: nothing 
	// example: formFunc.setRadioClick('test');
	this.setRadioClick = function setRadioClick(param) {
		try {
			var id = this.getSelectedRadio(param, 'id');
			var obj = commonFunc.getElementObj(id);
			if (obj != null) obj.click();
		} catch (e) {
			displayError(arguments.callee.toString());
		}
	} // end of setRadioClick

	
	// Name: clickAllRadio
	// param: nothing
	// return: nothing 
	// example: formFunc.clickAllRadio();
	this.clickAllRadio = function clickAllRadio() {
		try {
			var array_obj = document.getElementsByTagName("input");
			for (i=0; i<array_obj.length; i++) {
				if ((array_obj[i].type == "radio") && (array_obj[i].checked)) {
					array_obj[i].click();
				}
			}
		} catch (e) {
			displayError(arguments.callee.toString());
		}
	} // end of clickAllRadio


	// Name: disableElementsByName
	// Desc: disable or enable the elements by name
	// param: Name of the elements
	// return: nothing 
	// example: formFunc.disableElementsByName('test', true); or formFunc.disableElementsByName('test', false);
	this.disableElementsByName = function disableElementsByName(param, disable) {
		try {
			obj = document.getElementsByName(param);
			for(i=0; i<obj.length; i++) {					
				obj[i].disabled = disable;
			}
		} catch (e) {
			displayError(arguments.callee.toString());
		}
	} // end of disableElementsByName


	//--------------------------------------------
	// Name: disableElementById
	// Desc: Function disable or enable the input text field.
	// param: p1 = pass in an object or string id; status = true or false
	// return: nothing
	// Example how to call it: commonFunc.disableElementById("test", true)
	this.disableElementById = function disableElementById(p1, disable) {
		try {
			var obj = commonFunc.getElementObj(p1);
			if (obj != null)
				obj.disabled = disable;
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}  // end of disableElementById
 

	// Name: getSelectedRadio
	// Desc: get the selected radio value or id by passing in the radio name and "value" or "id"
	// param: radio name and "value" or "id"
	// return: An object or string value of the id or null
	// example: value = formFunc.getSelectedRadio("rad2","value"); or value = formFunc.getSelectedRadio("rad2","id");
	this.getSelectedRadio = function getSelectedRadio(param, type) {
		try {
			obj = document.getElementsByName(param);
			var v_radioValue = null;
			for(iGSR=0; iGSR<obj.length; iGSR++) {					
				if (obj[iGSR].checked) {
					if (type == 'id')
						v_radioValue = obj[iGSR].id;
					else if (type == 'value')
						v_radioValue = obj[iGSR].value;
					else 
						v_radioValue = obj[iGSR];			
				}
			}
			return v_radioValue;
		} catch (e) {
			displayError(arguments.callee.toString());
		}		
	} // end of getSelectedRadio
	
	
	// Name: getHiddenValue
	// Desc: get the selected hidden value or id by passing in the hidden name and "value" or "id"
	// param: hidden name and "value" or "id"
	// return: An object or string value of the id or null
	// example: value = formFunc.getHiddenValue("test","value"); or value = formFunc.getHiddenValue("test","id");
	this.getHiddenValue = function getHiddenValue(param, type) {
		try {
			obj = document.getElementsByName(param);
			var v_hiddenValue = null;
			for(iGSR=0; iGSR<obj.length; iGSR++) {					
				if (obj[iGSR]) {
					if (type == 'id')
						v_hiddenValue = obj[iGSR].id;
					else if (type == 'value')
						v_hiddenValue = obj[iGSR].value;
					else 
						v_hiddenValue = obj[iGSR];			
				}
			}
			return v_hiddenValue;
		} catch (e) {
			displayError(arguments.callee.toString());
		}		
	} // end of getHiddenValue

	// Name: getAllCheckbox
	// Desc: get all input checkbox
	// param: nothing
	// return: An array of input checkbox
	// example: value = formFunc.getAllCheckbox();
	this.getAllCheckbox = function getAllCheckbox() {
		try {
			var input_array = document.getElementsByTagName("input");
			var check_array = new Array();
			for (i=0; i<input_array.length; i++) {
				if (input_array[i].type == "checkbox")
					check_array.push(input_array[i]);
			}
			return check_array;
		} catch (e) {
			displayError(arguments.callee.toString());
		}			
	} // end of getAllCheckbox


	// Name: getAllInputText
	// Desc: get all input text
	// param: nothing
	// return: An array of input text
	// example: value = formFunc.getAllInputText();
	this.getAllInputText = function getAllInputText() {
		try {
			var input_array = document.getElementsByTagName("input");
			var text_array = new Array();
			for (i=0; i<input_array.length; i++) {
				if (input_array[i].type == "text")
					text_array.push(input_array[i]);
			}
			return text_array;
		} catch (e) {
			displayError(arguments.callee.toString());
		}			
	} // end of getAllInputText

	
	// Name: getAllInputHidden
	// Desc: get all input Hidden
	// param: nothing
	// return: An array of input Hidden
	// example: value = formFunc.getAllInputHidden();
	this.getAllInputHidden = function getAllInputHidden() {
		try {
			var input_array = document.getElementsByTagName("input");
			var text_array = new Array();
			for (i=0; i<input_array.length; i++) {
				if (input_array[i].type == "hidden")
					text_array.push(input_array[i]);
			}
			return text_array;
		} catch (e) {
			displayError(arguments.callee.toString());
		}			
	} // end of getAllInputHidden
	
	
	// Name: getSelectDropDownValue
	// Desc: get the selected option value
	// param: id or obj
	// return: str of the selected value
	// example: value = formFunc.getSelectDropDownValue(str);	
	this.getSelectDropDownValue = function getSelectDropDownValue(str) {
		var v_selectValue = "";
		try {
			var v_selectObj = commonFunc.getElementObj(str);
			if (v_selectObj != null) {
				v_selectValue = v_selectObj[v_selectObj.selectedIndex].value;
			}
		} catch (e) { 
			displayError(arguments.callee.toString());
		}
		return v_selectValue;
	} // end of getSelectDropDownValue
	
} // end of formFunc

