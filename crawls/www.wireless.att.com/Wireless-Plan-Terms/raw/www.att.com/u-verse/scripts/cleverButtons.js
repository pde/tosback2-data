/*

Example how to use:

Use with most defaults:
var smartButton = new CleverButton;
smartButton.init(disabledButton("../images/gray_btn.gif","Fill out required fields to continue"));

Add a test:
var smartButtonToo = new CleverButton;
var loginIdTest = function() {if (commonFunc.getElementObj("loginId").value != "Ryan") {return true;} else {return false;}}
smartButtonToo.addTest(loginIdTest);
var grayImg = disabledButton("../images/gray_btn.gif","fill out required fields");
smartButtonToo.init(grayImg,"smart-button-too","required-field-too");


If the smart button is already inited you can call the validate separately to reset the state (e.g. after  
showing/hiding a popup with dynamic content you don’t want to inject the disabled button again):

smartButton.validate();

*/

// you use this to create the disabled image element to pass to the init().
function disabledButton(srcUrl,title) {
	var disabledButton = document.createElement("img");
	disabledButton.src = srcUrl;
	disabledButton.title = title;
	disabledButton.style.display = "none";
	return disabledButton;
}

function CleverButton() {
	var disabledButton, smartButtonClassName, buttons, requiredClass, requiredFields, disabledButtons;
	var testArr = [];
	var eventsToHandle = ['blur','click','keyup'];
	var thisCleverButton = this;
	
	// after creating a variable with the new CleverButton, you'll need to call init to set the disabled button img
	// the class name of the "smart" button and class name used to identify required fields.
	this.init = function (disabledButtonParam, smartButtonClassNameParam, requiredFieldClassNameParam) {
		disabledButton = disabledButtonParam;
		smartButtonClassName = (smartButtonClassNameParam) ? smartButtonClassNameParam : "clever-button";
		buttons = function() {return commonFunc.getElementsByClassName(smartButtonClassName);}
		requiredClass = (requiredFieldClassNameParam) ? requiredFieldClassNameParam : "required-field";
		requiredFields = function() {return commonFunc.getElementsByClassName(requiredClass,"*",document);}
		disabledButtons = function() {return commonFunc.getElementsByClassName(smartButtonClassName + "-disabled");}
		var btns = buttons();
		for (var i=0; i < btns.length; i++) {
			disabledButton.className = smartButtonClassName + "-disabled";
			var myStyleNode = btns[i].getAttributeNode("style");
			if(!!myStyleNode){
				disabledButton.setAttributeNode(myStyleNode.cloneNode(false))
			}
			btns[i].parentNode.insertBefore(disabledButton, btns[i]);
		}

		this.handleEvents();
		this.validate();
	}
	
	// by default this is called from init().  It attaches the event handlers to document by default. 
	// You may want to overwrite to attach event handlers to a different element.
	this.handleEvents = function() {
		for (var i=0; i < eventsToHandle.length; i++) {
			commonFunc.eventObserve(document,eventsToHandle[i],this.defaultEventFunc,false) ;
		}
	}
	
	// you can overwrite this if you want.  it checks if the eventsToHandle's target has the required 
	// class name to check validate function
	this.defaultEventFunc = function(e) {
		var tgt = commonFunc.getTarget(e);
		if (tgt.className && tgt.className.match(requiredClass))
			thisCleverButton.validate();
		return true;
	}
	
	// if you need to check validate for another event type, like mouseout for instance.  
	// need to init() or handleEvents() to activate new event type
	this.addEventToHandle = function(evType) {
		if (evType) eventsToHandle.push(evType); // tests need to return a boolean
	}
	
	// this works only prior to init.
	this.removeEventToHandle = function(evType) {
		var i =0;
		while(i < eventsToHandle.length) {
			if (eventsToHandle[i] == evType) {
				eventsToHandle.splice(i);
			} else {
				i++;
			}
		}
	}
	
	this.clearEventsToHandle = function() {
		eventsToHandle = [];
	}
	
	// validate is the brains of the clever button
	this.validate = function() {
		this.preValidate();
		var rFs = requiredFields();
		var isValid = true;
		for(var i = 0; i < rFs.length; i++) {
			switch(rFs[i].type.toLowerCase()){
				case "checkbox": {
					if (isValid) isValid = rFs[i].checked;
					if (rFs[i].checked) {
						this.validField(rFs[i]);
					} else {
						this.invalidField(rFs[i]);
					}
					break;
				}
				case "radio": {
					if( ! rFs[i].name) break;
					var relatedRadios = document.getElementsByName(rFs[i].name);
					var hasCheck = false;
					for(var j = 0; j < relatedRadios.length; j++) {
						if (relatedRadios[j].checked) 
							hasCheck = true;
					}
					if (isValid) isValid = hasCheck;
					if (hasCheck) {
						this.validField(rFs[i]);
					} else {
						this.invalidField(rFs[i]);
					}
					break;
				}
				default: {
					if (isValid) isValid = (rFs[i].value != "");
					if (rFs[i].value != "") {
						this.validField(rFs[i]);
					} else {
						this.invalidField(rFs[i]);
					}
					break;
				}
			}
		}
		var testState = true;
		if (testArr.length > 0) {
			for(var i=0; i < testArr.length; i++) {
				var test = testArr[i];
				if (test != "" && testState != test()) {
					testState = false;
					break;
				}
			}
		}
		isValid = (isValid && testState);
		var goButtons = buttons();
		var noButtons = disabledButtons();
		if (isValid){
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == true) goButtons[i].disabled = false;
				noButtons[i].style.display = "none";
			}
		} else {
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "none";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == false) goButtons[i].disabled = true;
				noButtons[i].style.display = "";
			}
		}
		this.postValidate();
	}
	
	// tests are additional functions that need to return true for the clever buttons to enable.
	this.addTest = function (testFunc) { //best to add tests as variables (eg var someTest = function() { .. 
		if (typeof testFunc == "function") testArr.push(testFunc); // tests need to return a boolean
	}
	
	// you can use this to remove a test
	this.removeTest = function(testFunc) { //only works if the test was added as a variable.
		var i =0;
		while(i < testArr.length) {
			if (testArr[i] == testFunc) {
				testArr.splice(i);
			} else {
				i++;
			}
		}
	}
	
	// removes all tests, good for clearing anonymous function tests
	this.clearTests = function() {
		testArr = [];
	}
	
	// validField() is called when a field is found to be valid in validate().  
	this.validField = function(fieldElm) {} 
	
	// invalidField() is called when a field is found to be not valid in validate().  
	this.invalidField = function(fieldElm) {}
	
	//this function is called at the beginning of validate()
	this.preValidate = function() {}
	
	//this function is called at the end of validate()
	this.postValidate = function() {}
	
	//Methods to disable and enable Continue button for Wireless CTN
	this.validateAnchorCTN = function() {
		var isValid = true;
		var goButtons = buttons();
		var noButtons = disabledButtons();
		if (isValid){
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == true)goButtons[i].disabled = false;
				noButtons[i].style.display = "none";
			}
		} else {
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "none";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == false) goButtons[i].disabled = true;
				noButtons[i].style.display = "";
			}
		}
	}
	this.validateTargetCTN = function() {
		var isValid = false;
		var goButtons = buttons();
		var noButtons = disabledButtons();
		if (isValid){
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == true)goButtons[i].disabled = false;
				noButtons[i].style.display = "none";
			}
		} else {
			for (var i=0; i < goButtons.length; i++) {
				goButtons[i].style.display = "none";
				if (goButtons[i].tagName == "INPUT" && goButtons[i].disabled == false) goButtons[i].disabled = true;
				noButtons[i].style.display = "";
			}
		}
	}
}