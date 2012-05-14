/* Copyright (c) 2006-2007, Marketo, Inc. All rights reserved. */
var Mkto = {
  kv : [],
  kvUrl : null,
  kvReferrer : null,
  pageSubmitted: false
};

Mkto.parseUrlParams = function(url) {
  var query;
  var q = url.indexOf('?');
  if (q > -1) {
    query = url.substr(q+1);
    var pairs = query.split("&");
    for (var i =0; i < pairs.length; i++) {
      var kvArray = pairs[i].split("=");
      Mkto.kv[kvArray[0]] = kvArray[1];
    }
  }
  return Mkto.kv;
}
  
Mkto.getValue =  function(key, kv) {
  if (typeof Mkto.kv[key] == 'string') {
    return decodeURIComponent(Mkto.kv[key].replace(/\+/g, ' '));
  } else {
    return "not found";
  }
}
 
Mkto.getReferrerParam = function(key) {
  return Mkto.getValue(key, Mkto.kvReferrer);
}
 
Mkto.getUrlParam = function(key) {
  return Mkto.getValue(key, Mkto.kvUrl);
}

 
Mkto.formSubmit = function(elt) {
  for (var i=0; i < elt.elements.length; i++) {
    Mkto.clearError(elt.elements[i]);
  } 
  var submitButton = null;
  var allowSubmit = true;
  for (var i=0; i < elt.elements.length; i++) {
    var fld = elt.elements[i];
    if (!Mkto.validateField(fld)) {
      allowSubmit = false;
    }
    if (fld.name == "cr") {
      fld.value = Mkto.getUrlParam("cr");
    }
    if (fld.name == "kw") {
      fld.value = Mkto.getUrlParam("kw");
    }
    if (fld.name == "searchstr") {
      fld.value = Mkto.getReferrerParam("q");
    }
    if (fld.name == "submitButton") {
      submitButton = fld;
    }
    if (fld.name == '_marketo_comments') {
      Mkto.addField(elt, 'hidden', '_comments_marketo', fld.value);
    }
    if (fld.type == 'checkbox') {
      var hidden = null;

      // Try and find existing hidden input field that we might have created
      // on an earlier trip through formSubmit.
      var related = document.getElementsByName(fld.name);
      for (var j=0; j < related.length; j++) {
        if (related[j].type == 'hidden') {
          hidden = related[j];
          break;
        } 
      }

      if (fld.checked) {
        // If the field is checked, remove any lingering hidden field that 
        // may have been created on a past form post which was aborted (perhaps
        // due to validation failure, etc).
        if (hidden) {
          hidden.parentNode.removeChild(hidden);
        }            
      }
      // Else, create hidden input field with value 0 for the unchecked checkbox as
      // unchecked checkboxes are not sent in form POST.
      else if (!hidden) {
        try {
          // This form of createElement only works on IE and is needed to get the
          // NAME attribute to stick as IE can't set name attr with setAttribute.
          hidden = document.createElement("<input type='hidden' name='" + fld.name + "' value='0'>");
        }
        catch (e) {
          // This createElement is for regular DOM implementations.
          hidden = document.createElement("input");
          hidden.setAttribute('type', 'hidden');
          hidden.setAttribute('name', fld.name);
          hidden.setAttribute('value', 0);
        }
        elt.appendChild(hidden);
      }
    }
  } 
  Mkto.addField(elt, 'hidden', '_mkto_version', '2.4.7');
  if (allowSubmit) {
    if (!Mkto.pageSubmitted) {
      Mkto.pageSubmitted = true;

      // The tracking cookie is normally created by munchkin at initialization
      // except if you have the "cookieAnon" setting set to false.  In that
      // case we want to get the cookie created before submitting the form.  We
      // call createTrackingCookie and even if it was already called, it is safe
      // to call it again.
      try {
        if ((typeof Munchkin != 'undefined') && (typeof Munchkin.createTrackingCookie == 'function')) {
          Munchkin.createTrackingCookie(true);
        }
      }
      catch(e) {
        // Ignore munchkin not found
      }

      elt.submit();
      if (submitButton != null) {
        submitButton.disabled = true;
        if (submitButton.value != 'Descargar') {
          submitButton.value = "Please Wait";
        }
      }
    } else {
      allowSubmit = false;
    }
  }
  if(allowSubmit){
    //remove PURL Cookie on submit.
    var domain=Mkto.getLPDomain(document.location.hostname);
    Mkto.clearLPCookie('_mkto_purl','/',domain);
    
  }
  return allowSubmit;
}

Mkto.addField = function(mform, type, name, value) {
  try {
    // This form of createElement only works on IE and is needed to get the
    // NAME attribute to stick as IE can't set name attr with setAttribute.
    fld = document.createElement("<input type='" + type + "' name='" + name + "' value='" + value + "'>");
  }
  catch (e) {
    // This createElement is for regular DOM implementations.
    fld = document.createElement("input");
    fld.setAttribute('type', type);
    fld.setAttribute('name', name);
    fld.setAttribute('value', value);
  }
  mform.appendChild(fld);
}

Mkto.validateField = function(fld) {
  var valid = true;
  var msg = null;
  var required = (fld.className.indexOf('mktFReq') != -1);
  if (typeof fieldValidate == 'function') {
     valid = fieldValidate(fld);
  }
  if (valid == 'skip') {
    valid = true;
  } else {
    var label = null;
    try {
      label = fld.parentNode.parentNode.getElementsByTagName('label')[0].innerHTML;
    } catch (e) {}
    if (valid === true) {
      if (required) {
        if ((fld.tagName.toUpperCase() == 'INPUT') || (fld.tagName.toUpperCase() == 'TEXTAREA'))  {
          // #1222 Remove white spaces before checking for length.
          if (fld.value.replace(/^\s+/g, "").length == 0) {
            msg = "This field is required";
            try {
              msg = getRequiredFieldMessage(fld, label);
            } catch (e) {}
            Mkto.setError(fld, msg);
            valid = false;
          }
        } else if (fld.tagName.toUpperCase() == 'SELECT') {
          if (fld.selectedIndex <= 0) {
            msg = "Please select a value for this field";
            try {
              msg = getRequiredFieldMessage(fld, label);
            } catch (e) {}
            Mkto.setError(fld, msg);
            valid = false;
          }
        }
      }
    }
    if (valid && required && (fld.className.indexOf('mktFormEmail') != -1)) {
      var emailValid = /^[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+(\.[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+)*@[a-zA-Z0-9]([a-zA-Z0-9_-])*(\.[a-zA-Z0-9][a-zA-Z0-9_-]*)+$/; 
      if (!emailValid.test(fld.value)) {
        msg = "Please enter a valid email address";
        try {
          msg = getEmailInvalidMessage(fld, label);
        } catch (e) {}
        Mkto.setError(fld, msg);
        valid = false;
      }
    }
    if (valid && required && (fld.className.indexOf('mktFormPhone') != -1)) {
      var phoneValidChars = /^[0-9()+. \t-]+$/;
      
      var digCount = 0;
      var digits = "0123456789";
      for (var ix = 0; ix < fld.value.length; ix++) {
        if (digits.indexOf(fld.value.charAt(ix)) != -1) {
          digCount++;
        }
      }
      
      if (!phoneValidChars.test(fld.value) || (digCount < 8) || (digCount > 15)) {
        msg = "Please enter a valid telephone number";
        try {
          msg = getTelephoneInvalidMessage(fld, label);
        } catch (e) {}
        Mkto.setError(fld, msg);
        valid = false;
      }
    }
  }
  return valid;
}

Mkto.getMessage = function(fld) {
  var msgContainer = fld.nextSibling;
  while (msgContainer && msgContainer.nodeType != 1) {
    msgContainer = msgContainer.nextSibling;
  }
  return msgContainer;
}

Mkto.addListener = function(elt, eventName, handler) {
  if (window.addEventListener) {
    elt.addEventListener(eventName, handler, false);
  } else if (window.attachEvent) {
    elt.attachEvent("on" + eventName, handler);
  }
}

Mkto.clearError = function(fld) {
  var loc = fld.parentNode.className.indexOf(" mktError");
  if (loc != -1) {
    fld.parentNode.className = fld.parentNode.className.substr(0, loc);
    fld.parentNode.parentNode.title = "";
    var msgContainer = Mkto.getMessage(fld);
    msgContainer.innerHTML = "";
  }
}

Mkto.clearOnClick = function(e) {
  var fld = this;
  if (fld == window) {
    fld = e.srcElement;
  }
  Mkto.clearError(fld);
}
//Function used to remove the _mkto_purl cookie while submitting the form.
Mkto.clearLPCookie=function(name,path,domain){
  //document.location.hostname
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ( ( !start ) &&( name != document.cookie.substring( 0, name.length ) ) ){
    return;
  }
  if ( start == -1 ) {
    return;
  }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) {
    end = document.cookie.length;
  }
  var cookieval=unescape( document.cookie.substring( len, end ) );
  if(cookieval){
    document.cookie = name + "=" +( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) +";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
  return;
}

Mkto.getLPDomain=function(hostname){
//If top-level domain is 3 or more characters (ie. 'com', 'edu', 'net', 'info')
  // then we extract the final 2 segments of the hostname.
  var hostRegex = /([^.]+\.[^.]{3,})$/i;
  var foundDomain = hostRegex.exec(hostname);

  if (foundDomain != null) {
    return foundDomain[1];
  }
  // Else, if ends in .xx.<2 character country-code>, get last 3 segments of host name
  else {
    var countryHostRegex = /([^.]+\.[^.]+\.[^.]{2})$/i;
    foundDomain = countryHostRegex.exec(hostname);

    if (foundDomain != null) {
      return foundDomain[1];
    }
    // Else, just return entire hostname for the domain.
    else {
      return hostname;
    }
  }
}

Mkto.setError = function(fld, message) {
  fld.parentNode.className += " mktError";
  fld.parentNode.parentNode.title = message;
  var msgContainer = Mkto.getMessage(fld);
  msgContainer.innerHTML = message;
  msgContainer.style.left = (fld.parentNode.offsetWidth + 10) + "px";
  Mkto.addListener(fld, 'focus', Mkto.clearOnClick);
}

Mkto.formReset = function(elt) {
  for (var i=0; i < elt.elements.length; i++) {
    Mkto.clearError(elt.elements[i]);
  }  
  elt.reset();
  return true;
}

Mkto.doesOptionMatchValue = function(optionValue, leadValue) {
  var match = false;
  if (leadValue === false) {
    if ((optionValue.toLowerCase() == "no") || (optionValue == "0") || (optionValue.toLowerCase() == "false")) {
      match = true;
    }
  } else if (leadValue === true) {
    if ((optionValue.toLowerCase() == "yes") || (optionValue == "1") || (optionValue.toLowerCase() == "true")) {
      match = true;
    }
  } else if (optionValue == leadValue) {
    match = true;
  }
  return match;
}
 
Mkto.preFillForm = function() {
  var theForm = mktoGetForm();
  if ((theForm) && (typeof mktoPreFillFields != 'undefined') && (mktoPreFillFields)) {
    for (var fld in mktoPreFillFields) {
      if ((mktoPreFillFields[fld] !== null) && theForm[fld] && typeof theForm[fld] == 'object') {
        var ff = theForm[fld];
        if (ff.mktoX) {
          ff.mktoX.prefilled = true;
        }
        if ((ff.type == 'text') || (ff.type == 'textarea')) {
          if (!ff.value) {
            ff.value = mktoPreFillFields[fld];
          }
        } else if (ff.type == 'select-one') {
          ff.mktoX.prefilled = false;  // it's only prefilled if we find a matching value
          var required = (ff.className.indexOf('mktFReq') != -1);
          if ((ff.selectedIndex == 0) && (!ff.multiple)) {
            for (var ix = 0; ix < ff.options.length; ix++) {
              if (Mkto.doesOptionMatchValue(ff.options[ix].value,mktoPreFillFields[fld])) {
                ff.selectedIndex = ix;
                if (ff.mktoX) {
                  if ((ix != 0) || (!required)) {
                    ff.mktoX.prefilled = true;
                  }
                }
                break;
              }
            }

            if (ff.mktoX.prefilled == false) { // have lead data but it does not match the select values
              var option = document.createElement("option");
              option.value = option.text = mktoPreFillFields[fld];
              ff.options.add(option);
              ff.selectedIndex = ff.options.length * 1 - 1;
              if (ff.mktoX) {
                ff.mktoX.prefilled = true;
              }
            }

          }
        } else if (ff.type == 'checkbox') {
          if (mktoPreFillFields[fld]) {
            ff.setAttribute("checked", "checked");
          } else {
            ff.removeAttribute("checked");
          }
        } else if (!ff.type && ff.length) {
          // radio buttons
          var ff = theForm[fld];
          // all entries are either filled or unfilled
          var radioFilled = false;
          for ( var ix = 0; ix < ff.length; ix++) {
            ff[ix].mktoX.prefilled = false;  // it's only prefilled if we find a matching value
          }
          for ( var ix = 0; ix < ff.length; ix++) {
            var preValue = mktoPreFillFields[fld];
            if (preValue === true) {
              preValue = 'Yes';
            } else if (preValue === false) {
              preValue = "No";
            }
            if (ff[ix].value == preValue) {
              ff[ix].setAttribute("checked", "checked");
              radioFilled = true;
              break;
            }
          }
          if (radioFilled) {
            for ( var ix = 0; ix < ff.length; ix++) {
              ff[ix].mktoX.prefilled = true;
            }
          }
        }
      }
    }
  }
}

Mkto.initForm = function() {
  var theForm = mktoGetForm();
  for (var ix = 0; ix < theForm.length; ix++) {
    if (theForm[ix].name == "submitButton") {
      break;
    }
    theForm[ix].mktoX = {prefilled: false};
  }
}
Mkto.processProfiling = function() {
  var theForm = mktoGetForm();
  if (profiling.isEnabled) {
    var maxShownFields = profiling.numberOfProfilingFields;
    var shownFields = 0;
    var fieldsToRemove = [];
    var lastFieldName = "";
    for (var ix = 0; ix < theForm.length; ix++) {
      var ff = theForm[ix];
      if (ff.type == "hidden") {
        continue;
      }
      if (ff.type == "radio" && ff.name == lastFieldName) {
        continue; // count whole set of radio buttons as one control
      }
      if (ff.name == "submitButton") {
        break;
      }
      if (ff.name == "resetButton") {
        break;
      }
      var required = (ff.className.indexOf('mktFReq') != -1);
      // bork 9112 MktLPFormTmplWidget->getHtml() appends '[]' to field name
      // for field type of "select-multiple". That makes inconsistency with original
      // field name when checking for alwaysShowFields.
      var fieldNameWithoutDeco = Mkto.getFieldNameWithoutDeco(ff);
      if (profiling.alwaysShowFields.indexOf(fieldNameWithoutDeco) == -1) {
        if (ff.mktoX && ff.mktoX.prefilled) {
          Mkto.hideField(ff);
          fieldsToRemove.push(ff);
        } else if (shownFields < maxShownFields) {
           shownFields++;
        } else {
           Mkto.hideField(ff);
           fieldsToRemove.push(ff);
        }
      }
      lastFieldName = ff.name;
    }
    for (var ix = fieldsToRemove.length; ix > 0; ix--) {
      var field = fieldsToRemove[ix-1];
      field.parentNode.removeChild(field); 
    }
  }  
}
/**
* remove field name deco for multiple select field. mulit-select fieldName is appended
* '[]' to its original field name. 
* @param {Object} from field object
* @return {String} original field name 
*/
Mkto.getFieldNameWithoutDeco = function (ff) {
  var retVal = ff.name;
  if (ff.type && (ff.type == 'select-multiple')) {
    if( ff.name.indexOf('[]') != -1) {
      retVal = ff.name.slice(0, ff.name.indexOf('[]'));
    }
  }
  return  retVal;
};

Mkto.hideField = function(field) {
  var elt = field;
  while (elt.parentNode && elt.tagName.toLowerCase() != "li") {
    elt = elt.parentNode;
  }
  if (elt.tagName.toLowerCase() == "li") {
    elt.style.display = "none"; // hide the whole li
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, startIndex) {
    var len = this.length;
    if (startIndex == null)
      startIndex = 0;
    else if (startIndex < 0) {
      startIndex += len;
      if (startIndex < 0)
        startIndex = 0;
    }
    for (var i = startIndex; i < len; i++) {
      var val = this[i];
      if (val == item)
        return i;
    }
    return -1;
  };
}

// Add css class to selected browsers
Mkto.initBrowserCss = function() {

  var ua = navigator.userAgent.toLowerCase();
  var css = '';
  
  // Browser key user agent string token -> css class map
  // This is just a primitive device specific browser detection to css class.
  // A generalized utility library can be found at http://rafael.adm.br/css_browser_selector/
  var browserTokens = {
    'ipad'  : 'mktIpad',
    'iphone': 'mktIphone',
    'ipod'  : 'mktIpod'
  };
  
  for (key in browserTokens) {
    if (ua.indexOf(key.toLowerCase()) > -1) {
      css = css + ' ' + browserTokens[key];
    }
  }
  
  if (css && document.documentElement) {
    document.documentElement.className += css;
  }
};

Mkto.init = function() {
  try {
    Mkto.initForm();
    Mkto.preFillForm();
    Mkto.processProfiling();
  } catch (e) { }
  Mkto.kvUrl = Mkto.parseUrlParams(window.location.search);
  Mkto.kvReferrer = Mkto.parseUrlParams(document.referrer);
  Mkto.initBrowserCss();
}

Mkto.init();

