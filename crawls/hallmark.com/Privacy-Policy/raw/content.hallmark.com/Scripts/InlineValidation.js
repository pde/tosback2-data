
var errorFieldsArray=[];var additionalFieldsArray=[];var fieldLengthsList=[];var errorMessagesListToAppend='';var fieldLengthsListToAppend='';var additionalFieldsArrayToAppend='';var baseContainerId='';var oldBaseContainerId='';var baseErrorPage='';var errorPage='';var oldErorMessagesList=[];$(document).ready(function(){baseErrorPage=errorPage;initializeInlineValidation();});function mergeList(to,from){if(typeof from!="undefined"&&from!=null&&from!=""){for(var attrname in from){to[attrname]=from[attrname];}}}
function SetBaseContainer(newBaseContainerId){oldBaseContainerId=baseContainerId;baseContainerId=newBaseContainerId;oldErorMessagesList=errorMessagesList;initializeErrorHandling();$('.overlay .close').unbind('click.InlineValidation').bind('click.InlineValidation',function(){baseContainerId=oldBaseContainerId;errorMessagesList=oldErorMessagesList;errorPage=baseErrorPage;initializeInlineValidation();$('.overlay .close').unbind('click.InlineValidation');});}
function initializeInlineValidation(){if(errorFieldsArray["ErrorCount"]!=0){initializeErrorHandling();}
if(typeof(errorPage)!="undefined"){msgDiv=$(getJQSelectorForID('msgDiv.'+errorPage));}
$('.JQValidateInputBoxInLine').blur(function(event){hideErrorDiv(msgDiv,$(this));if($(this).hasClass('JQValidateGWCNumber')){invalidNumberValidation(msgDiv,$(this));}
if($(this).hasClass('JQValidateGWCPin')){invalidPinValidation(msgDiv,$(this));}
if($(this).hasClass('JQValidateMaxLength')){maxLengthValidation(msgDiv,$(this));}
if($(this).hasClass('JQValidateMinLength')){minLengthValidation(msgDiv,$(this));}
if($(this).hasClass('JQValidateFullName')){validateFullName(msgDiv,$(this));}
if($(this).hasClass('JQValidateFullNameWithMiddleName')){validateFullNameWithMiddleName(msgDiv,$(this));}
if($(this).hasClass('JQValidateCardType')){validateCardType(msgDiv,$(this));}
if($(this).hasClass('JQDoLuhnCheck')){performLuhnsCheck(msgDiv,$(this));}
if($(this).hasClass('JQRequiredField')){requiredInputFieldValidation(msgDiv,$(this));}});$('.JQValidateDropDownInLine').blur(function(){hideErrorDiv(msgDiv,$(this));if($(this).hasClass('JQValidateCardType')){validateCardType(msgDiv,$(this));}
if($(this).hasClass('JQValidateExpiryDate')){validateCardExpiryDate(msgDiv,$(this));}
if($(this).hasClass('JQValidateSecurityQuestion')){validateSecurityQuestion(msgDiv,$(this));}
if($(this).hasClass('JQValidateBirthDate')){validateBirthDate(msgDiv,$(this));}
if($(this).hasClass('JQRequiredField')){requiredDropDownValidation(msgDiv,$(this));}});$('.JQValidateDayPhone').blur(function(){validateDayPhone(msgDiv,$(this));});$('.JQValidateAdditionalDayPhone').blur(function(){validateNonMadatoryPhone(msgDiv,$(this),'JQDayPhone');});$('.JQValidateAdditionalMobilePhone').blur(function(){validateNonMadatoryPhone(msgDiv,$(this),'JQMobilePhone');});$('.JQValidateNonMandatoryBirthDate').blur(function(){validateNonMadatoryDate(msgDiv,$(this),'JQBirthDay','Optional');});$('.JQValidateNonMandatoryAnniversaryDate').blur(function(){validateNonMadatoryDate(msgDiv,$(this),'JQAnniversary','Required');});$('.JQValidateCheckboxInLine').blur(function(){requiredCheckBoxValidation(msgDiv,$(this));});}
function initializeErrorHandling(){errorFieldsArray=[];errorFieldsArray["ErrorCount"]=0;}
function clearAllPopupErrorDivs(errorDivName){msgDivId='msgDiv.'+errorDivName;msgDiv=$(getJQSelectorForID(msgDivId));if(msgDiv.length>0){msgDiv.find("#errMsgs").children("li").remove();msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}
if(typeof(errorFieldsArray)!="undefined"){delete errorFieldsArray["ErrorCount"];for(errorId in errorFieldsArray){if(errorId.substr(0,errorId.indexOf('.'))!=''&&errorId.substr(0,errorId.indexOf('.'))!='CommonError'){elementObject=getJQCurrentObject(errorId.substr(0,errorId.indexOf('.ErrorDiv')));if(elementObject.length>0)
hideErrorDiv(msgDiv,elementObject);}}}
initializeErrorHandling();}
function clearAllErrorMessages(){msgDivId='msgDiv.'+errorPage;msgDiv=$(getJQSelectorForID(msgDivId));if(msgDiv.length>0){msgDiv.find("#errMsgs").children("li").remove();msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}
if(typeof(errorFieldsArray)!="undefined"){delete errorFieldsArray["ErrorCount"];for(errorId in errorFieldsArray){if(errorId.substr(0,errorId.indexOf('.'))!=''&&errorId.substr(0,errorId.indexOf('.'))!='CommonError'){elementObject=getJQCurrentObject(errorId.substr(0,errorId.indexOf('.ErrorDiv')));if(elementObject.length>0)
hideErrorDiv(msgDiv,elementObject);}}}
initializeErrorHandling();}
function validateSecurityQuestion(msgDiv,elementObject){if(elementObject.get(0).selectedIndex!=0&&elementObject.get(0).selectedIndex!=elementObject.get(0).children.length-1){SecurityQues1=elementObject.closest('form').find('.JQSecQues1');SecurityQues2=elementObject.closest('form').find('.JQSecQues2');if(SecurityQues1.get(0).selectedIndex==SecurityQues2.get(0).selectedIndex){displayInlineErrorDiv(msgDiv,SecurityQues2,getErrorMessageFromList(SecurityQues2,'.SameQuestionSelected'));}}}
function performLuhnsCheck(msgDiv,elementObject){if(!luhn_check($.trim(elementObject.val()))){displayInlineErrorDiv(msgDiv,elementObject,getErrorMessageFromList(elementObject,'.Invalid'));}}
function requiredDropDownValidation(msgDiv,elementObject){if(elementObject.get(0).selectedIndex==0)
displayInlineErrorDiv(msgDiv,elementObject,getErrorMessageFromList(elementObject,'.Required'));}
function requiredInputFieldValidation(msgDiv,elementObject){if(!($.trim(elementObject.val()).length>0)){displayInlineErrorDiv(msgDiv,elementObject,getErrorMessageFromList(elementObject,'.Required'));}}
function maxLengthValidation(msgDiv,elementObject){if($.trim(elementObject.val()).length>fieldLengthsList[elementObject.attr('id')+'.MaxLength']){displayInlineErrorDiv(msgDiv,elementObject,getErrorMessageFromList(elementObject,'.MaxLength'));}}
function minLengthValidation(msgDiv,elementObject){if($.trim(elementObject.val()).length<fieldLengthsList[elementObject.attr('id')+'.MinLength']&&$.trim(elementObject.val()).length>0){displayInlineErrorDiv(msgDiv,elementObject,getErrorMessageFromList(elementObject,'.MinLength'));}}
function validateDayPhone(msgDiv,elementObject){dayPhone1Object=elementObject.closest('div').find('.JQDayPhone1');dayPhone2Object=elementObject.closest('div').find('.JQDayPhone2');dayPhone3Object=elementObject.closest('div').find('.JQDayPhone3');phone1Length=$.trim(dayPhone1Object.val()).length;phone2Length=$.trim(dayPhone2Object.val()).length;phone3Length=$.trim(dayPhone3Object.val()).length;errorMessage=getErrorMessageFromList(dayPhone1Object,'.Invalid');if(($.trim(elementObject.val()).length==0||$.trim(elementObject.val()).length<fieldLengthsList[elementObject.attr('id')+'.MinLength'])){displayInlineErrorDiv(msgDiv,dayPhone1Object,errorMessage);}
if(phone1Length==fieldLengthsList[dayPhone1Object.attr('id')+'.MinLength']&&phone2Length==fieldLengthsList[dayPhone2Object.attr('id')+'.MinLength']&&phone3Length==fieldLengthsList[dayPhone3Object.attr('id')+'.MinLength']){hideErrorDiv(msgDiv,dayPhone1Object);}}
function validateNonMadatoryPhone(msgDiv,elementObject,PhoneType){dayPhone1Object=elementObject.closest('form').find('.'+PhoneType+'1');dayPhone2Object=elementObject.closest('form').find('.'+PhoneType+'2');dayPhone3Object=elementObject.closest('form').find('.'+PhoneType+'3');phone1Length=$.trim(dayPhone1Object.val()).length;phone2Length=$.trim(dayPhone2Object.val()).length;phone3Length=$.trim(dayPhone3Object.val()).length;errorMessage=getErrorMessageFromList(dayPhone1Object,'.Invalid');if((phone1Length==0&&phone2Length==0&&phone3Length==0)||(phone1Length==fieldLengthsList[dayPhone1Object.attr('id')+'.MinLength']&&phone2Length==fieldLengthsList[dayPhone2Object.attr('id')+'.MinLength']&&phone3Length==fieldLengthsList[dayPhone3Object.attr('id')+'.MinLength'])){hideErrorDiv(msgDiv,dayPhone1Object);}
else if(($.trim(elementObject.val()).length==0||$.trim(elementObject.val()).length<fieldLengthsList[elementObject.attr('id')+'.MinLength'])){displayInlineErrorDiv(msgDiv,dayPhone1Object,errorMessage);}}
function getErrorMessageFromList(elementObject,errorType){if(typeof(errorMessagesList[elementObject.attr('id')+errorType])=="undefined"){if(typeof(errorMessagesList[elementObject.attr('name')+errorType])!="undefined"){return errorMessagesList[elementObject.attr('name')+errorType];}
else{return null;}}
else{return errorMessagesList[elementObject.attr('id')+errorType];}}
function getAdditionalObjetcsFromList(elementObject){if(typeof(additionalFieldsArray[elementObject.attr('id')])=="undefined"){if(typeof(additionalFieldsArray[elementObject.attr('name')])!="undefined"){return additionalFieldsArray[elementObject.attr('name')];}
else{return null;}}
else{return additionalFieldsArray[elementObject.attr('id')];}}
function requiredCheckBoxValidation(msgDiv,elementObject){var selected=false;var arrCheckBox=elementObject.closest('form').find('.JQCheckboxList');hideErrorDiv(msgDiv,arrCheckBox.eq(arrCheckBox.length-1));for(i=0;i<arrCheckBox.length;i++){var curr=arrCheckBox.eq(i);if(curr.is(':checked')){selected=true;break;}}
if(!selected)
displayInlineErrorDiv(msgDiv,arrCheckBox.eq(arrCheckBox.length-1),getErrorMessageFromList(arrCheckBox.eq(arrCheckBox.length-1),'.Required'));}
function validateCardExpiryDate(msgDiv,elementObject){expiryMonthObject=elementObject.closest('form').find('.JQExpiryMonth');expiryYearObject=elementObject.closest('form').find('.JQExpiryYear');hideErrorDiv(msgDiv,expiryMonthObject);if(elementObject.get(0).selectedIndex==0){displayInlineErrorDiv(msgDiv,expiryMonthObject,getErrorMessageFromList(elementObject,'.Required'));}
if(expiryMonthObject.get(0).selectedIndex==0&&expiryYearObject.get(0).selectedIndex>0){displayInlineErrorDiv(msgDiv,expiryMonthObject,getErrorMessageFromList(elementObject,'.Required'));}
else if(expiryMonthObject.get(0).selectedIndex>0&&expiryYearObject.get(0).selectedIndex==0&&expiryYearObject==elementObject){displayInlineErrorDiv(msgDiv,expiryMonthObject,getErrorMessageFromList(elementObject,'.Required'));}
else if(expiryMonthObject.get(0).selectedIndex>0&&expiryYearObject.get(0).selectedIndex>0){Date.format='yyyy/MM/dd';selectedDate=new Date($.trim(expiryYearObject.val()),$.trim(expiryMonthObject.val()),1);if(selectedDate<new Date()){displayInlineErrorDiv(msgDiv,expiryMonthObject,getErrorMessageFromList(elementObject,'.Invalid'));}}}
function validateBirthDate(msgDiv,elementObject){birthDayObject=elementObject.closest('form').find('.JQBirthDay');birthMonthObject=elementObject.closest('form').find('.JQBirthMonth');hideErrorDiv(msgDiv,birthMonthObject);if(elementObject.get(0).selectedIndex==0){displayInlineErrorDiv(msgDiv,birthMonthObject,getErrorMessageFromList(elementObject,'.Required'));}
if(birthMonthObject.get(0).selectedIndex==0&&birthDayObject.get(0).selectedIndex>0){displayInlineErrorDiv(msgDiv,birthMonthObject,getErrorMessageFromList(elementObject,'.Required'));}}
function validateNonMadatoryDate(msgDiv,elementObject,dateType,yearValue){birthMonthObject=elementObject.closest('form').find('.'+dateType+'1');birthDayObject=elementObject.closest('form').find('.'+dateType+'2');birthYearObject=birthDayObject;if(yearValue=='Required'){birthYearObject=elementObject.closest('form').find('.'+dateType+'3');}
if(elementObject.get(0).selectedIndex==0){displayInlineErrorDiv(msgDiv,birthMonthObject,getErrorMessageFromList(birthMonthObject,'.Invalid'));}
else if(birthMonthObject.get(0).selectedIndex==0&&birthDayObject.get(0).selectedIndex>0&&birthMonthObject.attr('id')!=elementObject.attr('id')){displayInlineErrorDiv(msgDiv,birthMonthObject,getErrorMessageFromList(birthMonthObject,'.Invalid'));}
if((birthMonthObject.get(0).selectedIndex==0&&birthDayObject.get(0).selectedIndex==0&&birthYearObject.get(0).selectedIndex==0)||(birthMonthObject.get(0).selectedIndex>0&&birthDayObject.get(0).selectedIndex>0&&birthYearObject.get(0).selectedIndex>0)){hideErrorDiv(msgDiv,birthMonthObject);}}
function validateFullName(msgDiv,elementObject){firstNameObject=elementObject.closest('form').find('.JQAddressFirstName');lastNameObject=elementObject.closest('form').find('.JQAddressLastName');if(typeof(errorPage)!="undefined"){errorId='CommonError.FullNameLengthExceeded';filedLength=fieldLengthsList[errorId+'.MaxLength'];removeErrorFromCommonErrorDiv(msgDiv,errorId);if(($.trim(firstNameObject.val()).length+$.trim(lastNameObject.val()).length)>filedLength){addErrorToCommonErrorDiv(msgDiv,errorId,errorMessagesList[errorId]);}}}
function validateFullNameWithMiddleName(msgDiv,elementObject){firstNameObject=elementObject.closest('form').find('.JQFirstName');lastNameObject=elementObject.closest('form').find('.JQLastName');middleNameObject=elementObject.closest('form').find('.JQMiddleName');if(typeof(errorPage)!="undefined"){errorId='CommonError.FullNameLengthExceeded';filedLength=fieldLengthsList[errorId+'.MaxLength'];removeErrorFromCommonErrorDiv(msgDiv,errorId);if(($.trim(firstNameObject.val()).length+$.trim(lastNameObject.val()).length+$.trim(middleNameObject.val()).length)>filedLength){addErrorToCommonErrorDiv(msgDiv,errorId,errorMessagesList[errorId]);}}}
function validateCardType(msgDiv,elementObject){CardTypeObject=elementObject.closest('form').find('.JQCreditCardType');CardNumberObject=elementObject.closest('form').find('.JQCreditCardNumber');errorId='card_accountNumber.Invalid';hideErrorDiv(msgDiv,CardNumberObject);if($.trim(CardNumberObject.val()).length>0&&CardTypeObject.get(0).selectedIndex>0){var cardStartIndArr=new Array();CardTypeObject.children().each(function(){switch($(this).text()){case'Visa':cardStartIndArr[$.trim($(this).val())]=["4"];break;case'Master Card':cardStartIndArr[$.trim($(this).val())]=["51","52","53","54","55"];break;case'American Express':cardStartIndArr[$.trim($(this).val())]=["34","37"];break;case'Discover':cardStartIndArr[$.trim($(this).val())]=["6011"];break;case'Diners Club':cardStartIndArr[$.trim($(this).val())]=["300","301","302","303","304","305"];break;case'JCB':cardStartIndArr[$.trim($(this).val())]=["3","2131","1800"];break;default:break;}});for(var i=0;i<cardStartIndArr[$.trim(CardTypeObject.val())].length;i++){if($.trim(CardNumberObject.val()).startsWith((cardStartIndArr[$.trim(CardTypeObject.val())])[i])){return;}}
displayInlineErrorDiv(msgDiv,CardNumberObject,errorMessagesList[errorId]);}}
function invalidPinValidation(msgDiv,elementObject){if(!validateGiftCard()==''){$('#tblBal').hide();if(($('#Pin').val()!=null)&&($('#Pin').val()!="")){removeErrorFromCommonErrorDiv(msgDiv,errorMessagesList["Pin.Invalid"]);if($(elementObject).val().length<8){displayInlineErrorDiv(msgDiv,$('#Pin'),errorMessagesList["Pin.Invalid"]);}}}}
function invalidNumberValidation(msgDiv,elementObject){if(!validateGiftCard()==''){$('#tblBal').hide();removeErrorFromCommonErrorDiv(msgDiv,errorMessagesList["Number.Invalid"]);if($(elementObject).val().length<16){displayInlineErrorDiv(msgDiv,$('#Number'),errorMessagesList["Number.Invalid"])}}}
function getJQCurrentObject(elementId){if($(getJQSelectorForID(elementId)).length==0){if($(getJQSelectorIDFromName(elementId)).length!=0){if($(getJQSelectorIDFromName(elementId)).attr('name')==elementId||getJQSelectorIDFromName($(getJQSelectorIDFromName(elementId)).attr('name'))==elementId){return $(getJQSelectorIDFromName(elementId));}
else{return null;}}
else{return null;}}
else{return $(getJQSelectorForID(elementId));}}
String.prototype.startsWith=function(prefix){return(this.substr(0,prefix.length)===prefix);}
function getJQSelectorForID(elementId){if(baseContainerId!=null&&typeof baseContainerId!="undefined"&&baseContainerId!="")
return("#"+baseContainerId+" #"+elementId.replace(/\./g,"\\."));else
return("#"+elementId.replace(/\./g,"\\."));}
function getJQSelectorIDFromName(elementId){if(baseContainerId!=null&&typeof baseContainerId!="undefined"&&baseContainerId!="")
return("#"+baseContainerId+" #"+elementId.replace(/\./g,"_"));else
return("#"+elementId.replace(/\./g,"_"));}
function addErrorToCommonErrorDiv(msgDiv,errorId,errorMessage){if(typeof(errorPage)!="undefined"){msgDiv.find("#errMsgHdr").removeClass('hide');msgDiv.find("#errMsgHdr").show();$(getJQSelectorForID(errorId)).remove();msgDiv.find("#errMsgs").append('<li id="'+errorId+'">'+errorMessage+'</li>');if(typeof(errorFieldsArray[errorId])=="undefined"){errorFieldsArray["ErrorCount"]=errorFieldsArray["ErrorCount"]+1;}
errorFieldsArray[errorId]=errorMessage;}
msgDiv.show();}
function removeErrorFromCommonErrorDiv(msgDiv,errorId){$(getJQSelectorForID(errorId)).remove();if(typeof(errorFieldsArray[errorId])!="undefined"){delete errorFieldsArray[errorId];errorFieldsArray["ErrorCount"]=errorFieldsArray["ErrorCount"]-1;}
if(errorFieldsArray["ErrorCount"]==0){msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}}
function displayInlineErrorDiv(msgDiv,elementObject,errorMessage){if(errorMessage!=null){msgDiv.find("#errMsgHdr").removeClass('hide');msgDiv.find("#errMsgHdr").show();errorElementId=elementObject.attr('id')+'.ErrorDiv';JQSelectorForErrorElementId=getJQSelectorForID(errorElementId);additionalObjectsList=getAdditionalObjetcsFromList(elementObject);errorDivType="Single";if(null!=(additionalObjectsList)){errorDivType="Combined";}
if(elementObject.hasClass('JQLongField')){errorDivType="Long";}
if($(JQSelectorForErrorElementId).length==0){constructTopErrorDiv(elementObject,errorElementId,errorDivType);}
elementObject.addClass('msgError');if(null!=(additionalObjectsList)){$(JQSelectorForErrorElementId).addClass('CombinedError');for(objectCount=0;objectCount<additionalObjectsList.length;objectCount++){getJQCurrentObject(additionalObjectsList[objectCount]).addClass('msgError');}
additionalObjectsList=new Array();}
$(JQSelectorForErrorElementId).addClass('errorColor');$(JQSelectorForErrorElementId).show();$(JQSelectorForErrorElementId).html(getHTMLforErrorDiv(errorMessage,errorDivType));if(typeof(errorFieldsArray[errorElementId])=="undefined"){errorFieldsArray["ErrorCount"]=errorFieldsArray["ErrorCount"]+1;}
errorFieldsArray[errorElementId]=errorMessage;msgDiv.show();}}
function constructTopErrorDiv(elementObject,errorElementId,errorDivType){var pos=elementObject.position();var height=elementObject.outerHeight();var newDiv='';if(elementObject.closest('li').hasClass('JQErrorLl')){newDiv=$('<div class="width-5col prepend-halfcol-b errorColor JQErrorDiv"  id='+errorElementId+'></div>');elementObject.closest('li').parent('div').append(newDiv);return;}
else if(elementObject.closest('div').hasClass('JQTextArea')){newDiv=$('<div class="width-7col errorColor JQErrorDiv"  id='+errorElementId+'></div>');elementObject.closest('div').append(newDiv);if(elementObject.hasClass('JQPrependHalfCol')){newDiv.addClass('prepend-halfcol');}
return;}
else if(elementObject.closest('div').hasClass('JQErrorDivType2')){newDiv=$('<div class="width-5col errorColor JQErrorDiv"  id='+errorElementId+'></div>');elementObject.closest('div').parent('div').append(newDiv);}
else if(elementObject.closest('div').hasClass('JQErrorDivType3')){newDiv=$('<div class="width-5col errorColor JQErrorDiv"  id='+errorElementId+'></div>');newDiv.insertAfter(elementObject.closest('div').parent('div'));}
else if(elementObject.prev('label').length>0&&errorDivType=="Combined"){newDiv=$('<div class="width-5col errorColor JQErrorDiv"  id='+errorElementId+'></div>');elementObject.closest('div').append(newDiv);}
else if(elementObject.prev('label').length>0){newDiv=$('<div class="errorColor JQErrorDiv"  id='+errorElementId+'></div>');if(elementObject.hasClass('JQFieldWithFootNote')){elementObject.addClass('mb-halfRow');newDiv.addClass('width-14col');elementObject.next('p').removeClass('mb-qtRow');}
newDiv.insertAfter(elementObject);}
else{newDiv=$('<div class="width-5col errorColor JQErrorDiv clear"  id='+errorElementId+'></div>');newDiv.insertAfter(elementObject.closest('div'));}
if(!elementObject.closest('form').hasClass('JQErrorDivType1')){if(elementObject.attr('id')=='password'){newDiv.addClass('prepend-3col');}
else{newDiv.addClass('prepend-4col');}}
else if(elementObject.hasClass('JQWidth4')){newDiv.addClass('width-4col');}
else if(elementObject.hasClass('JQPrepend4Col')){newDiv.addClass('prepend-4col');}
else if(elementObject.hasClass('JQPrepend5Col')){newDiv.addClass('prepend-5col');}
else if(elementObject.hasClass('JQPrepend2Col')){newDiv.addClass('prepend-2col');}
if(elementObject.hasClass('JQRemove4Col')){newDiv.removeClass('prepend-4col');}
if(elementObject.hasClass('JQPrepend3Col')){newDiv.addClass('prepend-3col');}
if(elementObject.hasClass('JQPrepend8Col')){newDiv.addClass('prepend-8col');}
if(elementObject.hasClass('JQPrepend6Col')){newDiv.addClass('prepend-6col');}
if(elementObject.hasClass('JQAddWidth7col')){newDiv.removeClass('width-5col').addClass('width-7col');}}
function getHTMLforErrorDiv(errorMessage,errorDivType){if(errorDivType=="Single"){return'<div class="arrowErrorForm fltLeft"></div><p class="errorColor fltLeft">'+errorMessage+'</p>';}
else if(errorDivType=="Long"){return'<div class="arrowErrorForm fltLeft"></div><div class="fltLeft width-6col"><p class="errorColor">'+errorMessage+'</p></div>';}
else{return'<p class="errorColor fltLeft algnLeft width-4col mrt-1 mt-qtRow">'+errorMessage+'</p>';}}
function hideErrorDiv(msgDiv,elementObject){errorElementId=elementObject.attr('id')+'.ErrorDiv';elementObject.removeClass('msgError');JQSelectorForErrorElementId=getJQSelectorForID(errorElementId);additionalObjectsList=null;if($(JQSelectorForErrorElementId).hasClass('CombinedError')){additionalObjectsList=getAdditionalObjetcsFromList(elementObject);}
if(null!=additionalObjectsList){$(JQSelectorForErrorElementId).removeClass('CombinedError');for(objectCount=0;objectCount<additionalObjectsList.length;objectCount++){getJQCurrentObject(additionalObjectsList[objectCount]).removeClass('msgError');}
additionalObjectsList=new Array();delete additionalFieldsArray[errorElementId];}
$(JQSelectorForErrorElementId).hide();$(JQSelectorForErrorElementId).html("");if(typeof(errorFieldsArray[errorElementId])!="undefined"){delete errorFieldsArray[errorElementId];errorFieldsArray["ErrorCount"]=errorFieldsArray["ErrorCount"]-1;}
if(errorFieldsArray["ErrorCount"]==0){msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}}
function removeErrorDiv(msgDiv,elementObject){errorElementId=elementObject.attr('id')+'.ErrorDiv';JQSelectorForErrorElementId=getJQSelectorForID(errorElementId);additionalObjectsList=null;if($(JQSelectorForErrorElementId).hasClass('CombinedError')){additionalObjectsList=getAdditionalObjetcsFromList(elementObject);}
if(null!=additionalObjectsList){$(JQSelectorForErrorElementId).removeClass('CombinedError');for(objectCount=0;objectCount<additionalObjectsList.length;objectCount++){getJQCurrentObject(additionalObjectsList[objectCount]).removeClass('msgError');}
additionalObjectsList=new Array();delete additionalFieldsArray[errorElementId];}
$(JQSelectorForErrorElementId).remove();if(typeof(errorFieldsArray[errorElementId])!="undefined"){delete errorFieldsArray[errorElementId];errorFieldsArray["ErrorCount"]=errorFieldsArray["ErrorCount"]-1;}
if(errorFieldsArray["ErrorCount"]==0){msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}}
function displayErrorMessagesOnReLoad(data,errorPage){msgDiv=$(getJQSelectorForID('msgDiv.'+errorPage));for(i=0;i<data.length;i++){if(data[i].Key.substr(0,data[i].Key.indexOf('.'))!='undefined'&&data[i].Key.substr(0,data[i].Key.indexOf('.'))=='CommonError'){addErrorToCommonErrorDiv(msgDiv,data[i].Key,data[i].Message)}
else{elementObject=getJQCurrentObject(data[i].Key)
if(elementObject!=null){displayInlineErrorDiv(msgDiv,elementObject,data[i].Message);}}}
if((msgDiv.css('display')=='block')){if($('.mediumOverlay').css('display')=='block'){setTimeout(function(){window.scrollTo(getPosLeft(document.getElementById($('.mediumOverlay').attr('id'))),getPosTop(document.getElementById($('.mediumOverlay').attr('id'))));},200);}
else{setTimeout(function(){window.scrollTo(msgDiv.offset().left,msgDiv.offset().top);},200);}}}
function getPosLeft(obj){var leftValue=0;while(obj){leftValue+=obj.offsetLeft;obj=obj.offsetParent;}
return leftValue;}
function getPosTop(obj){var topValue=0;while(obj){topValue+=obj.offsetTop;obj=obj.offsetParent;}
return topValue;}
function setStyleForDisclaimerErrorDiv(){$('#Disclaimer\\.ErrorDiv').removeClass('width-5col');$('#Disclaimer\\.ErrorDiv').find('p.errorColor').css('width','550px');}
function clearAllErrorDivs(){msgDivId='msgDiv.'+errorPage;msgDiv=$(getJQSelectorForID(msgDivId));if(msgDiv.length>0){msgDiv.find("#errMsgs").children("li").remove();msgDiv.find("#errMsgHdr").hide();msgDiv.hide();}
var errorCountTemp=errorFieldsArray["ErrorCount"];if(typeof(errorFieldsArray)!="undefined"){delete errorFieldsArray["ErrorCount"];for(errorId in errorFieldsArray){if(errorId.substr(0,errorId.indexOf('.'))!=''&&errorId.substr(0,errorId.indexOf('.'))!='CommonError'){elementObject=getJQCurrentObject(errorId.substr(0,errorId.indexOf('.ErrorDiv')));if(elementObject.length>0)
removeErrorDiv(msgDiv,elementObject);}}}}