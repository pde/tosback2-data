// ----------------------------------------------------------------------
// Javascript form validation routines.
// Author: Stephen Poley
//
// Simple routines to quickly pick up obvious typos.
// All validation routines return true if executed by an older browser:
// in this case validation must be left to the server.
//
// Update Aug 2004: have tested that IE 5.0 and IE 5.5 both support DOM model
// sufficiently well, so innerHTML option removed (redundant).
//
// Update Jun 2005: discovered that reason IE wasn't setting focus was
// due to an IE timing bug. Added 0.1 sec delay to fix.
//
// Update Oct 2005: minor tidy-up: unused parameter removed
// ----------------------------------------------------------------------

var nbsp = 160;    // non-breaking space char
var node_text = 3; // DOM text node-type
var emptyString = /^\s*$/
var glb_vfld;      // retain vfld for timer thread

// -----------------------------------------
//                  trim
// Trim leading/trailing whitespace off string
// -----------------------------------------

function trim(str)
{
  return str.replace(/^\s+|\s+$/g, '')
};


// -----------------------------------------
//                  setfocus
// Delayed focus setting to get around IE bug
// -----------------------------------------

function setFocusDelayed()
{
  glb_vfld.focus()
}

function setfocus(vfld)
{
  // save vfld in global variable so value retained when routine exits
  glb_vfld = vfld;
  setTimeout( 'setFocusDelayed()', 100 );
}


// -----------------------------------------
//                  msg
// Display warn/error message in HTML element
// commonCheck routine must have previously been called
// -----------------------------------------

function msg(fld,     // id of element to display message in
             msgtype, // class to give element ("warn" or "error")
             message) // string to display
{
  // setting an empty string can give problems if later set to a 
  // non-empty string, so ensure a space present. (For Mozilla and Opera one could 
  // simply use a space, but IE demands something more, like a non-breaking space.)
  var dispmessage;
  if (emptyString.test(message)) 
    dispmessage = String.fromCharCode(nbsp);    
  else  
    dispmessage = message;

  var elem = document.getElementById(fld);
  elem.firstChild.nodeValue = dispmessage;  
  
  elem.className = msgtype;   // set the CSS class to adjust appearance of message
};

// -----------------------------------------
//            commonCheck
// Common code for all validation routines to:
// (a) check for older / less-equipped browsers
// (b) check if empty fields are required
// Returns true (validation passed), 
//         false (validation failed) or 
//         proceed (don't know yet)
// -----------------------------------------

var proceed = 2;  

function commonCheck    (vfld,   // element to be validated
                         ifld,   // id of element to receive info/error msg
                         reqd)   // true if required
{
  if (!document.getElementById) 
    return true;  // not available on this browser - leave validation to the server
  var elem = document.getElementById(ifld);
  if (!elem.firstChild)
    return true;  // not available on this browser 
  if (elem.firstChild.nodeType != node_text)
    return true;  // ifld is wrong type of node  

  if (emptyString.test(vfld.value)) {
    if (reqd) {
      msg (ifld, "error", "Required information");  
      setfocus(vfld);
      return false;
    }
    else {
      msg (ifld, "warn", "");   // OK
      return true;  
    }
  }
  return proceed;
}

// -----------------------------------------
//            validatePresent
// Validate if something has been entered
// Returns true if so 
// -----------------------------------------

function validatePresent(vfld,   // element to be validated
                         ifld )  // id of element to receive info/error msg
{
  var stat = commonCheck (vfld, ifld, true);
  if (stat != proceed) return stat;

  msg (ifld, "warn", "");  
  return true;
};

// -----------------------------------------
//               validateEmail
// Validate if e-mail address
// Returns true if so (and also if could not be executed because of old browser)
// -----------------------------------------

function validateEmail  (vfld,   // element to be validated
                         ifld,   // id of element to receive info/error msg
                         reqd)   // true if required
{
  var stat = commonCheck (vfld, ifld, reqd);
  if (stat != proceed) return stat;

  var tfld = trim(vfld.value);  // value of field with whitespace trimmed off
  var email = /^[^@]+@[^@.]+\.[^@]*\w\w$/
  if (!email.test(tfld)) {
    msg (ifld, "error", "ERROR: not a valid e-mail address");
    setfocus(vfld);
    return false;
  }

  var email2 = /^[A-Za-z][\w.-]+@\w[\w.-]+\.[\w.-]*[A-Za-z][A-Za-z]$/
  if (!email2.test(tfld)) 
    msg (ifld, "warn", "Unusual e-mail address - check if correct");
  else
    msg (ifld, "warn", "");
  return true;
};


// -----------------------------------------
//            validateTelnr
// Validate telephone number
// Returns true if so (and also if could not be executed because of old browser)
// Permits spaces, hyphens, brackets and leading +
// -----------------------------------------

function validateTelnr  (vfld,   // element to be validated
                         ifld,   // id of element to receive info/error msg
                         reqd)   // true if required
{
  var stat = commonCheck (vfld, ifld, reqd);
  if (stat != proceed) return stat;

  var tfld = trim(vfld.value);  // value of field with whitespace trimmed off
  var telnr = /^\+?[0-9 ()-]+[0-9]$/
  if (!telnr.test(tfld)) {
    msg (ifld, "error", "ERROR: not a valid telephone number. Characters permitted are digits, space ()- and leading +");
    setfocus(vfld);
    return false;
  }

  var numdigits = 0;
  for (var j=0; j<tfld.length; j++)
    if (tfld.charAt(j)>='0' && tfld.charAt(j)<='9') numdigits++;

  if (numdigits<6) {
    msg (ifld, "error", "ERROR: " + numdigits + " digits - too short");
    setfocus(vfld);
    return false;
  }

  if (numdigits>14)
    msg (ifld, "warn", numdigits + " digits - check if correct");
  else { 
    if (numdigits<10)
      msg (ifld, "warn", "Only " + numdigits + " digits - check if correct");
    else
      msg (ifld, "warn", "");
  }
  return true;
};

// -----------------------------------------
//             validateAge
// Validate person's age
// Returns true if OK 
// -----------------------------------------

function validateAge    (vfld,   // element to be validated
                         ifld,   // id of element to receive info/error msg
                         reqd)   // true if required
{
  var stat = commonCheck (vfld, ifld, reqd);
  if (stat != proceed) return stat;

  var tfld = trim(vfld.value);
  var ageRE = /^[0-9]{1,3}$/
  if (!ageRE.test(tfld)) {
    msg (ifld, "error", "ERROR: not a valid age");
    setfocus(vfld);
    return false;
  }

  if (tfld>=200) {
    msg (ifld, "error", "ERROR: not a valid age");
    setfocus(vfld);
    return false;
  }

  if (tfld>110) msg (ifld, "warn", "Older than 110: check correct");
  else {
    if (tfld<7) msg (ifld, "warn", "Bit young for this, aren't you?");
    else        msg (ifld, "warn", "");
  }
  return true;
};


function toggleMe(a){
var e=document.getElementById(a);
if(!e)return true;
if(e.style.display=="none"){
e.style.display="block"
} else {
e.style.display="none"
}
}