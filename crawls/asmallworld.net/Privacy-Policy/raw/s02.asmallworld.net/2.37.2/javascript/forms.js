
function delayedFormSubmit(f) {
  window.setTimeout(function() { f.submit(); }, 100 );
  return true;
}

function toggleSearch(state) {
  if (state) {
    jQuery("#ShowSearchBtn").addClass("search-down");
    jQuery("#search-form").show();      
  } else {
    jQuery("#ShowSearchBtn").removeClass("search-down");
    jQuery("#search-form").hide();      
  }
}

function toggleVisibilityByClass(elPath, state){
  var targetEl = jQuery(elPath)[0];
  if (state) 
    jQuery(targetEl).removeClass("hidden");
  else
    jQuery(targetEl).addClass("hidden");
}


// displays the "Other" input field in Employment and Education components when selected, othewise hidden
function toggleOther (sel) { 
  var other = sel.id+"_other" ;
  var otherel = document.getElementById (other);
  if (sel.value === "" || sel.value === "Other") {
    otherel.style.display = "block"
  }
  else {
    otherel.style.display = "none"
  }
}


function selectedOptionMatch(elPath, match) {
  return (getSelectedValue(elPath) == match);
}

function getSelectedValue(elPath){
  
  if ($type(elPath) == "string" && elPath.contains("#")) {    
    selectEl = document.getElementById(elPath.substr(1));
  } else if (elPath.tagName.toLowerCase() == "select"){
    selectEl = elPath;
  } else {
    return false;
  }
  
  if(selectEl){
    return selectEl.options[selectEl.options.selectedIndex].value;
  }else{
    return false;
  }
}

function assignDefaultTabIndex(f) {
  var tabIndex = 1;
  for (i=0; i < f.length; i++) {
    var tagName = f[i].tagName.toLowerCase();
    var tagType = f[i].type;
    if ((tagName == "input" || tagName == "textarea" || tagName == "select") && tagType != 'hidden') {
      f[i].tabIndex = tabIndex++;
    }
  }
}

function replaceCountryCode(code, source){
  var find = "&country=[A-Z][A-Z]";
  var re = new RegExp(find, "g");
  source.scriptQueryAppend = source.scriptQueryAppend.replace(re, "");          
  source.scriptQueryAppend += "&country=" + code;
}

function ensureSourceType(source) {
  var find = "&type=json";
  var re = new RegExp(find, "g");
  source.scriptQueryAppend = source.scriptQueryAppend.replace(re, "");
  source.scriptQueryAppend += find;
}

function ensureSourceMax(source) {
  var find = "&max=50";
  var re = new RegExp(find, "g");
  source.scriptQueryAppend = source.scriptQueryAppend.replace(re, "");
  source.scriptQueryAppend += find;
}

function configureInputFocus() {
  jQuery('.input-text').focus(function() { jQuery(this).addClass("input-focus"); });
  jQuery('.input-text').blur(function() { jQuery(this).removeClass("input-focus"); });
  jQuery('textarea').focus(function() { jQuery(this).addClass("input-focus"); });
  jQuery('textarea').blur(function() { jQuery(this).removeClass("input-focus"); });
}

function isElementDefined(formName, elementName) {
  return (typeof(document.forms[formName][elementName]) != "undefined");
}

function isCheckableInput(el) {
  return ($defined(el.tagName) && el.tagName.toLowerCase() == "input" && (el.type == "checkbox" || el.type == "radio"));
}

function getRadioValue(formName, radioName) {
  var f = document.forms[formName];
  var radioOpts = f[radioName];
  var radioVal = null;
  if (typeof(radioOpts[0]) == "undefined") {
    if (radioOpts.checked) radioVal = radioOpts.value;
  } else {
    for (var radioIndex = 0; radioIndex < radioOpts.length; radioIndex++) {
      if (radioOpts[radioIndex].checked) 
        radioVal = radioOpts[radioIndex].value;
    }
  }
  return radioVal;
}

function isEnteredText(el){
  var whitespaceRegEx = /^[\s]*$/
  return (!whitespaceRegEx.test(el.value));
}

function isDigits(el){
  var digitsRegEx = /^[\d]*$/
  return (digitsRegEx.test(el.value));
}

function isValidDateString(el){
  var dateRegEx = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/
  return (dateRegEx.test(el.value));
}

function isSelectedDropdown(el){
  return (el.options.selectedIndex > 0);
}

function executeDeleteMethod() {
  return postLinkAsForm.call(this, true, [{
    name: "_method",
    value: "delete"
  }]);
}

function postLinkAsForm(do_confirm, fields) {
  if (!do_confirm || confirm('Are you sure?')) { 
    var f = document.createElement('form');
    f.style.display = 'none'; 
    this.parentNode.appendChild(f); 
    f.method = 'POST'; 
    f.action = this.href;
    if (fields) {
      for (var postFieldIndex = 0; postFieldIndex < fields.length; postFieldIndex++) {
        el = fields[postFieldIndex];
        formField = document.createElement('input');
        formField.setAttribute('type', 'hidden');
        formField.setAttribute('name', el.name);
        formField.setAttribute('value', el.value);
        f.appendChild(formField);
      }
    }
    f.submit(); 
  }
  return false;
}

function getDefaultErrorMessages() {
  return {
    missingTextField : function(label) { return "You must provide " + label + "."; },
    missingSelection : function(label) { return "You must select " + label + "."; },
    missingAgreement : function(label) { return "You must agree to " + label + "."; },
    missingSpecification : function(label) { return "You must specify " + label + "."; },
    wrongDataType : function(label, type) { return label + " must be a " + type; },
    lessThanCompared : function(label, compared) { return label + " must be greater than or equal to " + compared; },
    moreThanCompared : function(label, compared) { return label + " must be less than or equal to " + compared; },
    invalidDatePeriod : function() { return "The End Date provided is before the Start Date."; },
    invalidDate : function () { return "You must provide valid dates."; }
  };
}

function generateErrorReport(formObj) {
  var f = document.forms[formObj.name];
  var errorReport = new Array();
  for (var fieldIndex = 0; fieldIndex < formObj.fields.length; fieldIndex++) {
    currFieldObj = formObj.fields[fieldIndex];
    if ($type(currFieldObj.name) == "string") {
      currField = f[currFieldObj.name];
      if (currField.length > 0 && (!$defined(currField.tagName) || isCheckableInput(currField))) 
        currField = f[currFieldObj.name][0];
      var errorState = currFieldObj.validatorFunc(currField, currFieldObj);
    } else if ($type(currFieldObj.name) == "object") {
      var errorState = currFieldObj.validatorFunc(f, currFieldObj);
    }
    if (!errorState.valid) {
      errorReport.push( { displayFunc : errorState.displayFunc, msg : errorState.msg } );
    } else if (errorState.displayFunc) {
      var func = errorState.displayFunc.toString();
      if (func.contains("highlightError")) highlightError(currField, true);
    }
  }
  return errorReport;
}

function displayErrorReport(errorReport, targetEl, header) {
  var errorHTML = '<div id="error-wrp"><div id="error-message-dialog"><div id="error-explanation">';
  errorHTML += '<h3>' + header + '</h3>';
  errorHTML += '<p>Please correct the following errors</p><ul>';
  for (var errIndex = 0; errIndex < errorReport.length; errIndex++) 
    if ( errorReport[errIndex].msg != "" ) errorHTML += '<li>' + errorReport[errIndex].msg + '</li>';
  errorHTML += '</ul></div></div></div>';
  var errorWrp = jQuery("#error-wrp")[0];
  if (!errorWrp) {
    jQuery('#' + targetEl).before(errorHTML);
  } else {
    jQuery(errorWrp).replaceWith(errorHTML);
  }
  
  var errorDiv = jQuery('#error-message-dialog')[0];
  dialog.modify(errorDiv, 'error-balloon');   
  jQuery(errorDiv).toggle();
  
  // Remove existing instances of balloon dialogs
  jQuery('div').remove('.balloon-dialog');
  jQuery('.balloon-dialog-wrp').each(function() { this.id = ''; });

  // Render display for various errors
  for (var reportIndex = 0; reportIndex < errorReport.length; reportIndex++) {
    if (errorReport[reportIndex].displayFunc) {
      errorReport[reportIndex].displayFunc();
    }
  }

  myScroller.stepDelay = 5;
  myScroller.anchorScroll(YAHOO.util.Dom.getDocumentScrollTop(), errorDiv, {
    checkBottom: false,
    includeHeight: false,
    offset: 25
  });
}

function highlightError(el, hide) {
  var parentEl = el.parentNode;
  var errorClass = 'form-element-error';
  while (!jQuery(parentEl).hasClass('form-element-wpr')) {
    parentEl = parentEl.parentNode;
  }
  if (!hide && !jQuery(parentEl).hasClass(errorClass)) {
    jQuery(parentEl).addClass(errorClass);
  } else {
    if (hide && jQuery(parentEl).hasClass(errorClass))
      jQuery(parentEl).removeClass(errorClass);
  }
}
  
jQuery(document).ready(function(){

  //expand collapse  search
  jQuery("#ShowSearchBtn").toggle(function(){
    toggleSearch(true);
  }, function(){
    toggleSearch(false);
  });

  configureInputFocus();
});

