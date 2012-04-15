/*************************************************************************************
*                                Error Validation Script                             *
*   Page Title:   Error Validation Script                                            *
*   Page Version: 1.0                                                                *
*   Author:       Tyler Klein                                                        *
*   Date:         03/11/2009                                                         *
*************************************************************************************/
// Written for jQuery 1.3.1

var INC_ERRORS = true;      //An indicator that this page has been included

var minErrY = 0;            //The minimum top position that an error can be. Keeps errors from going above the fold
var minErrX = 455;          //The minimum left position that an error can be. Keeps errors from overlapping fields inadvertantly. If 0, the error appears immediately to the left of the field

var showFirstError = false; //true - pop-up appears on the first error in the list
var divErrMsg = null;       //Internal variable reference to the message overlay's div

var errFields = [];         //A list of fields that are associated with error messages
var errMap = [];            //The list of different error types


/*******************************************************
* Validation Functions                                 *
*******************************************************/
function alwaysTrue(v){return(true);}
function alwaysFalse(v){ return(false); }
function isEmpty(v){ return( v.replace(/^\s+|\s+$/g,"").length == 0 ); }
function isLen1(v){ return( v.replace(/^\s+|\s+$/g,"").length == 1 ); }
function isLen2(v){ return( v.length != 2 ); }
function isLen3(v){ return( v.length != 3 ); }
function isLen4(v){ return( v.length != 4 ); }
function isLen5(v){ return( v.length != 5 ); }
function isPhoneLen(v){ return( v.length <= 9 ); }
function isPassLen(v){ return( v.length < 6 ); }
function isPassChar(v){ return( (validateRegExp(v,"(.)\\1\{3\}"))); }
function isSelected(v){ return(  v == 0 ); }
function isEmail(v){ return( !(validateRegExp(v, "^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$") || (v.length == 0) ) ); } //blank email returns valid
function isAddress(v){ return( !(validateRegExp(v, "^(([P|p]\s*\.?\s*)(\.?\s*)([O|o]\s*\.?\s*)(\.?\s*)([B|b]\s*[O|o]\s*[X|x]\s*\s*.?\s*)([0-9]+))|(([0-9]+)\.*)$")|| (v.length == 0)));}
function isLastName(v){ return( !(validateRegExp(v,"^[\\s]*[A-Za-z0-9\\s*/./,/'/-]+[\\s]*$")));}
function isFirstName(v){ return( !(validateRegExp(v,"^[\\s]*[A-Za-z0-9\\s*/./,/'/-]+[\\s]*$")));}
function isARadioSelected(gname){return $('input[name="' + gname + '"]:checked').length>0 ? true:false;}
function isLocalEmailVerify(v){ return !localEmailVerify(); }
function isBMLFirstName(v){ return( !(validateRegExp(v.toLowerCase(),"[aeiouy]+") && !validateRegExp(v.toLowerCase(),"\\band\\b"))); }
function isBMLLastName(v){ return( validateRegExp(v.toLowerCase(),"\\bphd\\b|\\bllc\\b|\\bcorp\\b|\\bcorporation\\b|\\binc\\b")); }
function isBMLAddress1(v){ return( isUnitedStates() && (validateRegExp(v,"\\D") && !validateRegExp(v,"\\d"))); }
function isBMLAddress2(v){ return( isUnitedStates() && (!validateRegExp(v,"\\D") && validateRegExp(v,"\\d"))); }
function isBMLPhone1(v){ if(v.length==0){return false;} else{return( !(validateRegExp(v.replace(new RegExp('\\D','g'),''),'^[0-9]{10,14}$'))); }}
function isBMLPhone2(v){ return( validateRegExp(v.replace(new RegExp('\\D','g'),''),'^1')); }
function isBMLPhone3(v){ return( validateRegExp(v.replace(new RegExp('\\D','g'),''),'^[0-9]{3}555')); }
function isBMLPhone4(v){ for(i=0;i<=9;i++){ if(v.match(eval('/'+i+'/g')) != null && v.match(eval('/'+i+'/g')).length > 6) return true;}return false; }
function isBMLPhone5(v){ if(v.length==0){return false;} else{return( v.replace(new RegExp('\\D','g'),'').substring(0,3).substring(0,3) < 201 || v.replace(new RegExp('\\D','g'),'').substring(0,3).substring(0,3) > 990); }}
function isPOBoxAddress(v){ return( validateRegExp(v, "^(([P|p]\s*\.?\s*)(\.?\s*)([O|o]\s*\.?\s*)(\.?\s*)([B|b]\s*[O|o]\s*[X|x]\s*\s*.?\s*)([0-9]+))$"));}
function isNewPayOptCCValid(v){if(newPayOptCCValid === 'server validation failed'){newPayOptCCValid = 'waiting to validate on server';return true;}if(newPayOptCCValid === 'waiting to validate on server'){return false;}if(newPayOptCCValid === true){return false;}}
function isNewPayOptExpValid(v){if(newPayOptExpValid === 'server validation failed'){newPayOptExpValid = 'waiting to validate on server';return true;}if(newPayOptExpValid === 'waiting to validate on server'){return false;}if(newPayOptExpValid === true){return false;}}
function isNewPayOptAddrValid(v){if(newPayOptAddrValid === 'server validation failed'){newPayOptAddrValid = 'waiting to validate on server';return true;}if(newPayOptAddrValid === 'waiting to validate on server'){return false;}if(newPayOptAddrValid === true){return false;}}
function isNewPayOptEmailVerify(v){if(document.getElementById('edit_email').value == document.getElementById('edit_confirmemail').value){return false;}return true;}
function isNewNicknameValid(v){if(newNicknameValid === 'server validation failed'){newNicknameValid = 'waiting to validate on server';return true;}if(newNicknameValid === 'waiting to validate on server'){return false;}if(newNicknameValid === true){return false;}}
function isBMEmailVerify(v){if(document.getElementById('bmemail').value == document.getElementById('bmverifyEmail').value){return false;}return true;}
function isBMPwVerify(v){if(document.getElementById('bmlogonPassword').value == document.getElementById('bmlogonPasswordVerify').value){return false;}return true;}
function isSalesAssociate(v){ return( !(validateRegExp(v,"^[0-9]{4,5}$")));}

// regular expression helper function
function validateRegExp(value, exp){ 
	 var regex = new RegExp(exp);
	 return regex.test(value);
}

/*******************************************************
* Global Error Registration Functions                  *
*******************************************************/
function registerErrMsg( fn, msg, isError ){
	errMap[errMap.length] = {fn:fn, msg:msg, error:isError};
	return(errMap.length - 1);
}
function addMsgToControl( obj, errId ){
	var errStr = $(obj).attr('errors');
	$(obj).attr( 'errors', errId + (errStr ? "," + errStr : null) );
	var eArr = $(obj).data( 'errArr' );
	eArr.push( errId );
	$(obj).data( 'errArr', eArr );
}

function isUnitedStates()
{
	return ((document.getElementById('edit_country') == null && document.getElementById('billing_country') != null && document.getElementById('billing_country').value == 'US') || 
		(document.getElementById('edit_country') != null && document.getElementById('edit_country').value == 'US'))
}

/*******************************************************
* Some common error message types                      *
*******************************************************/
errMap[0] = {fn:isEmpty, msg:'This field is required', error:true};
errMap[1] = {fn:isEmail, msg:"Please enter a valid email address.", error:true};
errMap[2] = {fn:isSelected, msg:"This field is required", error:true};
errMap[3] = {fn:isAddress, msg:"Please Enter valid address", error:true};
errMap[9] = {fn:isLen1, msg:"Please Enter Name Greater Than One Character.", error:true};
errMap[10] = {fn:isLastName, msg:"Please Enter Last Name with A-z, ', -, , or . only.", error:true};
errMap[11] = {fn:isFirstName, msg:"Please Enter First Name with A-z, . , ', , or - only.", error:true};
errMap[12] = {fn:isPhoneLen, msg:"Please enter a 10-digit Phone Number.", error:true};
errMap[13] = {fn:isPassLen, msg:"Password must be 6 Characters long.", error:true};
errMap[14] = {fn:isEmpty, msg:"Please enter a valid gift card number.", error:true};
errMap[15] = {fn:isEmpty, msg:"E-mail is required.", error:true};
errMap[16] = {fn:isEmpty, msg:"Please enter a valid 5-digit zip code.", error:true};
errMap[17] = {fn:isEmpty, msg:"State is required.", error:true};
errMap[18] = {fn:isEmpty, msg:"Last name is required.", error:true};
errMap[19] = {fn:isEmpty, msg:"First name is required.", error:true};
errMap[20] = {fn:isEmpty, msg:"To is required.", error:true};
errMap[21] = {fn:isEmpty, msg:"From is required.", error:true};
errMap[22] = {fn:isEmpty, msg:"Recipient E-mail is required.", error:true};
errMap[23] = {fn:isEmail, msg:"The e-mail address you entered does not match the one above.  Please enter the e-mail address again.", error:true};
errMap[24] = {fn:isLocalEmailVerify, msg:"The e-mail address you entered does not match the one above.  Please enter the e-mail address again.", error:true};
errMap[25] = {fn:isEmpty, msg:"Address Book Name is required.", error:true};
errMap[26] = {fn:isEmpty, msg:"City is required.", error:true};
errMap[27] = {fn:isEmpty, msg:"Street Address is required.", error:true};
errMap[28] = {fn:isBMLFirstName, msg:"First name appears to be invalid.", error:true};
errMap[29] = {fn:isBMLLastName, msg:"Last name appears to be invalid.", error:true};
errMap[30] = {fn:isBMLAddress1, msg:"Address line 1 contains only a street name and no number.", error:true};
errMap[31] = {fn:isBMLAddress2, msg:"Address line 1 contains only a numeric value and no street name.", error:true};
errMap[32] = {fn:isBMLPhone1, msg:"Please enter a 10-digit Phone Number.", error:true};
errMap[33] = {fn:isBMLPhone2, msg:"Phone number starts with 1.", error:true};
errMap[34] = {fn:isBMLPhone3, msg:"Phone number has an exchange of 555.", error:true};
errMap[35] = {fn:isBMLPhone4, msg:"Phone number has at least seven identical numbers.", error:true};
errMap[36] = {fn:isBMLPhone5, msg:"Phone number contains an invalid area code (before 201 or above 990).", error:true};
errMap[37] = {fn:isEmpty, msg:"Phone is required.", error:true};
errMap[38] = {fn:isNewPayOptCCValid, msg:"The credit card number is invalid", error: true};
errMap[39] = {fn:isNewPayOptExpValid, msg:"The card expiration date is invalid", error: true};
errMap[40] = {fn:isNewPayOptAddrValid, msg:"Your entered zip code does not match the selected state. Please enter a valid zip code or state abbreviation.", error: true};
errMap[41] = {fn:isNewPayOptEmailVerify, msg: "The e-mail address you entered does not match the one above.  Please enter the e-mail address again.", error: true};
errMap[42] = {fn:isNewNicknameValid, msg:"The address book name you entered already exists. Type another name in the Address book name field and try again.", error: true};
errMap[43] = {fn:isEmpty, msg:"Zip code is required.", error:true};
errMap[44] = {fn:isEmpty, msg:"Ship to Name is required.", error:true};
errMap[45] = {fn:isBMEmailVerify, msg: "The e-mail address you entered does not match the one above.  Please enter the e-mail address again.", error: true};
errMap[46] = {fn:isBMPwVerify, msg: "Please make sure the two passwords are the same.", error: true};
errMap[47] = {fn:isPassChar, msg: "Consecutive character allowed limit is of only 3. Please re-enter your password.", error: true};
errMap[48] = {fn:isSalesAssociate, msg: "Please enter valid sales associate number.", error: true};

//var ERR_REQUIRED = registerErrMsg(isEmpty, 'This field is required.', true); //error:false - message, error:true - error
//var ERR_EMAIL    = registerErrMsg(isEmail, "Email addresses must contain an '@' and end in '.com', '.net', '.org', etc.", true);

/*******************************************************
* Error Message Functions                              *
*******************************************************/
//Sets up all error message fields currently in the DOM

function setupErrors( context ){
	$((context==undefined ? '' : context + ' ' ) + '[errors]').each( function(Index){
		$(this).data('seenFocus', false);
		var errPage = $(this).attr("errPage"); $(this).data('errPage', errPage);
		var errors = $(this).attr("errors"); $(this).data('errors', errors);
		var errArr = errors.split(','); $(this).data('errArr', errArr);

		errFields[errFields.length] = $(this);
		
		$(this).blur( function(){
			for( var i = 0; i<errArr.length; i++){
				var eMap = errMap[errArr[i]];
				if( eMap.fn(this.nodeType == 'select' ? this.selectedIndex : $(this).val()) ){
					if( eMap.error ){
						$(this).addClass('frm_error');
						$(this).data('error', eMap.msg);
						updateError(context);
						return;
					}
				}
			}
			$(this).removeClass('frm_error');
			$(this).data('error', null);
			updateError(context);
		})
		.focus( function(){
			if( !$(this).data('seenFocus') ){ $(this).data('seenFocus', true); return;	}
			for( var i = 0; i<errArr.length; i++){
				var eMap = errMap[errArr[i]];
				if( eMap.fn($(this).val()) ){
					$(this).addClass('frm_error');
					showError( $(this), eMap.msg, eMap.error ? "error" : "info", context );
					$(this).data('error',eMap.msg); //only flag this object as errored if it is an error and not a message.
					return;
				}
			}
			$(this).removeClass('frm_error');
			$(this).error = null;		
		});
	})
}
$().ready(function(){setupErrors()});

//Checks the errors list and repositions the error message window accordingly
function updateError(context){
	clearError();
	if( showFirstError ){
		for( var i=0; i<errFields.length; i++ ){
			if( errFields[i].data('error') && !errFields[i].data('suspendError') ){ 
				showError( errFields[i], errFields[i].data('error'), "error" , context); 
				return; 
			}
		}
	}else {
		for( var i=errFields.length - 1; i>=0; i-- ){
			if( errFields[i].data('error') && !errFields[i].data('suspendError') ){ 
				showError( errFields[i], errFields[i].data('error'), "error" ,context); 
				return;
			}
		}
	}
}

//Suspends error messages on an object and its children
function suspendErrors( obj ){
	$('[errors]', $(obj)).each( function(index){ $(this).data('suspendError', true); });
}
//Enables error messages on an object and its children
function enableErrors( obj ){
	$('[errors]', $(obj)).each( function(index){ $(this).data('suspendError', false); });
}
//Removes the error message overlay
function clearError(){
	if( divErrMsg == null ) return;
	//killIFrameShim(message);
	divErrMsg.remove();
	divErrMsg = null;	
}

//Checks for errors within the set of fields with pageId = to the page number passed. By default this page number is 0. Returns true if no errors found.
function checkAllErrors(page, context){
	var page = (arguments.length > 0) ? arguments[0] : 0;
	showFirstError = true;
	var isClean = true;
	for( j=0; j<errFields.length; j++ ){
		var obj = errFields[j];
		if( (obj.data('errPage') == page) && (!obj.data('suspendError')) ){
			for( i = 0; i<obj.data('errArr').length; i++){
				var eMap = errMap[obj.data('errArr')[i]];
				if( eMap.fn(obj.val()) ){
					obj.addClass('frm_error');
					obj.data('error', eMap.msg);
					isClean = false;
					break;
				}
			}
		} else {
			obj.removeClass('frm_error');
			obj.data('error', null);
		}
	}
	updateError(context);
			
	return( isClean );
}

//Draws the error message on the screen
function showError( field, msg, classPrefix, context ){
	clearError();
	var iHTML = '<div class="tool_tip tool_error" '+(context==undefined?'':'style="z-index:10100"')+'><div class="tool_wrapper"><div class="tool_top"><div class="tool_tl"> </div><div class="tool_tr"> </div></div><div class="tool_mid">';
	iHTML += msg;
	iHTML += '</div><div class="tool_bottom"><div class="tool_bl"> </div><div class="tool_br"> </div></div><div class="arrow"> </div></div></div>';
	/*var iHTML = "<div class='" + classPrefix + "Message'>";
	iHTML +=	"<div class='" + classPrefix + "InnerWrapper'>";
	iHTML += 		"<div class='" + classPrefix + "ContentWrapper'>";
	iHTML += 			"<div>" + msg + "</div>";
	iHTML += 		"</div>";
	iHTML += 		"<div class='" + classPrefix + "Bottom'></div>";
	iHTML += 		"<div class='" + classPrefix + "Arrow'></div>";
	iHTML += 	"</div>";
	iHTML += "</div>";*/
	divErrMsg = $(iHTML);
	$('body').append(divErrMsg);
	
	
	/*var fx = $(field).offset().left;
	var fy = $(field).offset().top;
	var px = $(field).parent().offset().left;
	
	var x = fx + $(field).width();
	x = ( x < minErrX + px ) ? minErrX + px : x;
	var y = fy + $(field).height() / 2 - $(divErrMsg).height() / 2;
	if( y + divErrMsg.height() > $().height() + $().scrollTop() ) 
		y = fy + $(field).height() / 2 - divErrMsg.height() + 15;
	if( y < minErrY ) y = minErrY;
	divErrMsg.css({left:x, top:y});

	var arrow = $('.'+classPrefix+"Arrow", divErrMsg)
	arrow.css({
		'margin-top':((fy + $(field).height() / 2 - arrow.height() / 2 - y) + "px")
	});*/
	
	var $target = $(field);
	var $tt = divErrMsg;
	var $arrow = $tt.find('.arrow').eq(0);
	var wrapper = $('body').offset();
	var targPos = $target.offset();
	var targHeight = $target.height();
	var targWidth = $target.outerWidth();
	var arrowWidth = $arrow.width();
	var arrowHeight = $arrow.height();
	var tipWidth = $tt.width();
	var tipHeight = $tt.height();
	
	var arrTop;
	var Top =  targPos.top;
	var Left = targPos.left - wrapper.left;
	Left += targWidth + arrowWidth;
	Left = (Left < minErrX) ? minErrX : Left;
	
	var posHalf = $target.offset().top + (targHeight/2) + (tipHeight/2);
	var winBot = $(window).height() + $(document).scrollTop();
	
	//determine if tip will go below fold if centered vertically with target
	if(posHalf > winBot){// goes below fold - bottom align
		Top += -tipHeight + targHeight + arrowHeight;
		arrTop = tipHeight - targHeight - (arrowHeight/2);
	}
	else{//shouldn't go below fold if centered vertically
		Top += -(tipHeight/2) + (targHeight/2);
		arrTop = (tipHeight/2) - (arrowHeight/2);
	}
	
	$arrow.css('top', arrTop);
	$tt.css({left:Left, top:Top});

	//addIFrameShim(message);
}
