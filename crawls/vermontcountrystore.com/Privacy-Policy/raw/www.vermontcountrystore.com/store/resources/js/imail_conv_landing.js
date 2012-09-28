// I-Mail : Conversion Platform Integration - Copyright SolutionSet
// ---LANDING TIME--- //
// imail_conv_landing.js
// Retrieve Specific I-Mail Variable
function imail_getEVar(variable) {var query = window.location.search.substring(1);var vars = query.split("&");for (var i=0;i<vars.length;i++){var pair = vars[i].split("="); if (pair[0] == variable) { return pair[1]; } } return null ;};
// Retrieve Specific I-Mail Variable From Session Cookie
function imail_getSVar( var_name ) {var all_ck = document.cookie.split( ';' );var a_ck = '';var ck_name = '';var ck_value = '';var ck_found = false;for ( i = 0; i < all_ck.length; i++ ){a_ck = all_ck[i].split( '=' );ck_name = a_ck[0].replace(/^\s+|\s+$/g, '');if ( ck_name == var_name ){	ck_found = true;if ( a_ck.length > 1 ){ck_value = unescape( a_ck[1].replace(/^\s+|\s+$/g, '') );}return ck_value;break;}a_ck = null;ck_name = '';}if ( !ck_found ){return "";}};
// Set I-Mail Variable In a Cookie
function imail_setSVar( nm, value, expires, path, domain, secure ){if(imail_getSVar(nm) == "" || imail_getSVar(nm) == null){var today = new Date();	today.setTime( today.getTime() );if(expires){expires = expires*1000*60*60*24;}var expires_date = new Date( today.getTime() + (expires) );document.cookie = nm + "=" +escape( value ) + ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + ( ( path ) ? ";path=" + path : "" ) + ( ( domain ) ? ";domain=" + domain : "" ) + ( ( secure ) ? ";secure" : "" );	return true ;}};
// Prepare Email Landing Session
imail_setSVar('imail_e',imail_getEVar('e'),0,"/");imail_setSVar('imail_j',imail_getEVar('j'),0,"/");imail_setSVar('imail_l',imail_getEVar('l'),0,"/");imail_setSVar('imail_u',imail_getEVar('u'),0,"/");imail_setSVar('imail_jb',imail_getEVar('jb'),0,"/");imail_setSVar('imail_mid',imail_getEVar('mid'),0,"/");

/* EXAMPLE USAGE

Include this JS on all pages that may be landing pages from I-mail

*/