
var nm=window.nm||{};nm.faq=(function($){function init(){$('h2.q, div.close a').bind('click',function(ev){ev.preventDefault();var parent=$(this).closest('li');var parentIsActive=parent.hasClass('active');if(parentIsActive){parent.toggleClass('active');}else{var $active=$('ul.faq li.active').toggleClass('active');parent.toggleClass('active');}
adjustNavHeight();});$('a.hashLink').bind('click',function(ev){var hashIndex=$(this).attr('href').indexOf('#');var hashValue=$(this).attr('href').substring(hashIndex+1);if(hashValue.indexOf('&')>-1){hashValue=hashValue.substr(0,hashValue.indexOf('&'));}
processHashAnchor(hashValue);});$('#assistance-nav li.subMenuToggle').live('click',function(ev){$(this).find('ul').toggleClass('display');});$('a.jumpAnchor').live('click',function(ev){ev.preventDefault();$(this).closest('li').toggleClass('active');var $jumpName=$(this).attr('data-jumpName');var $jumpContent=$('#assistance-content h2.'+$jumpName);$jumpContent.closest('li').toggleClass('active');adjustNavHeight();});captureUrlHash();}
function captureUrlHash(ev){if(window.location.hash){var hashValue=window.location.hash.replace("#","");if(hashValue.indexOf('&')>-1){hashValue=hashValue.substr(0,hashValue.indexOf('&'));}
processHashAnchor(hashValue);}}
function processHashAnchor(hashValue){var $hashAnchor=$('a[name='+hashValue+']');var $parent=$hashAnchor.closest('li');var parentIsActive=$parent.hasClass('active');if(!parentIsActive){var $active=$('ul.faq li.active').toggleClass('active');$parent.toggleClass('active');}
adjustNavHeight();}
function adjustNavHeight(){var $content=$('#assistance-content'),$nav=$('#assistance-nav');if($nav.height()!=$content.outerHeight()){$nav.css('height',$content.outerHeight());}}
return{init:init};})(jQuery.noConflict());jQuery(nm.faq.init);function PaymentEditGiftCardValueReq(){}
PaymentEditGiftCardValueReq.prototype.objectType=function(){return("PaymentEditGiftCardValueReq");}
var PaymentEditGiftCardValueReq_giftCards="giftCards";function PaymentEditGiftCardValueResp(){}
PaymentEditGiftCardValueResp.prototype.objectType=function(){return("PaymentEditGiftCardValueResp");}
var PaymentEditGiftCardValueResp_giftCards="giftCards";var PaymentEditGiftCardValueResp_error="error";var PaymentEditGiftCardValueResp_messages="messages";function GiftCard(){}
GiftCard.prototype.objectType=function(){return("GiftCard");}
var GiftCard_cardNumber="cardNumber";var GiftCard_cardCIN="cardCIN";var GiftCard_cardValue="cardValue";var nm=window.nm||{};nm.giftcard=(function($){function checkValue(){nm.message.removeAll();var req=new PaymentEditGiftCardValueReq();giftCardFill(req,PaymentEditGiftCardValueReq_giftCards);nm.defaultGateway.ajaxService(req,nm.giftcard.giftCardsValueResp,nm.giftcard.continueErr);return(false);}
function giftCardFill(obj,prop){var gcArray=new Array();for(var i=0;i<5;++i){var gc=new GiftCard();var element=document.getElementById("billingGiftCardNumber"+i);if(null==element)
break;gc[GiftCard_cardNumber]=element.value;gc[GiftCard_cardCIN]=document.getElementById("billingGiftCardCinNumber"+i).value;gcArray.push(gc);}
obj[prop]=gcArray;}
function giftCardsValueResp(obj){var giftCards=obj[PaymentEditGiftCardValueResp_giftCards];var id;for(var i=0;i<giftCards.length;++i){var gc=giftCards[i];id="billingGiftCardNumber"+i;document.getElementById(id).value=gc[GiftCard_cardNumber];id="billingGiftCardCinNumber"+i;document.getElementById(id).value=gc[GiftCard_cardCIN];id="billingGiftCardValue"+i;document.getElementById(id).innerHTML=gc[GiftCard_cardValue];}
return(obj[PaymentEditGiftCardValueResp_error]);}
function continueErr(err){var nmErr=new NMError(err,"PAY_EDIT","An error was encountered while checking gift card balance.<br /><br />"+err.status+": "
+err.statusText);nmErr.responsefailure();}
return{checkValue:checkValue,giftCardsValueResp:giftCardsValueResp,continueErr:continueErr};})(jQuery.noConflict());function ContactUsReq(){}
ContactUsReq.prototype.objectType=function(){return"ContactUsReq";}
function ContactUsResp(){}
ContactUsResp.prototype.objectType=function(){return"ContactUsResp";}
nm.emailforwarding=(function($){$emType="custemailforwarding";function init(){$urlparams=getUrlVars();if($urlparams['emailType']!=null){$emType=$urlparams['emailType'];}
$('.init-emailforward').bind('click',function(e){e.preventDefault();var theUrl="/assistance/contactUs.jsp";var params="";$emType=$(this).attr('emailType');$subject=encodeURIComponent($(this).attr('subject'));if($emType!=null&&$emType!=""){params+="?emailType="+$emType;}
if($subject!=null&&$subject!=""){if(params.indexOf('?')==-1){params+="?subject="+$subject;}else{params+="&subject="+$subject;}}
theUrl+=params;window.location.href=theUrl;});if($urlparams['contactus']!=null){var obj=new ContactUsReq();$emType=$urlparams['contactus'];var theUrl="/assistance/contactUs.jsp";if($emType!=null&&$emType!=""){theUrl+="?emailType="+$emType;}
window.location.href=theUrl;}
$('.refresh-email-init').each(function(idx,elem){elem.emailType=$(this).attr("emailType");elem.replaceMe=function(obj){refObj=$(this).replaceWith(obj.emailSrc);delete(obj);$('#'+$(this).attr("subjectId")).each(function(){$(this).find('select').change(function(e){if($(this).val()!=""){var rObj=new ContactUsReq();rObj.emailType=elem.emailType;rObj.subject=$(this).val();var theUrl="/assistance/contactUs.jsp";var params="";$emType=elem.emailType;;$subject=encodeURIComponent($(this).val());if($emType!=null&&$emType!=""){params+="?emailType="+$emType;}
if($subject!=null&&$subject!=""){if(params.indexOf('?')==-1){params+="?subject="+$subject;}else{params+="&subject="+$subject;}}
theUrl+=params;window.location.href=theUrl;}});});delete refObj;}
var obj=new ContactUsReq();obj.emailType=$(this).attr("emailType");obj.subjectElementId=$(this).attr("subjectId");nm.defaultGateway.ajaxService(obj,elem.replaceMe,nm.emailforwarding.error,"getEmailSubject",elem);});initform();}
function error(obj){alert('error'+obj);}
function replaceform(obj){if(obj.messages==null||obj.message=="undefined"){var $emailUsWrapper=$('#emailUsWrapper');var $emailUs=$('#emailUs');$emailUs.empty().remove();$content=$(obj.emailSrc);$content.appendTo($emailUsWrapper);initform();}}
function initform(){var $emailUs=$('#emailUs');var $obj=new ContactUsReq();$obj.emailType=$emType;$('#email-us-subject').find('select').each(function(i){$obj[$(this).attr('name')]=$(this).val();$(this).change(function(e){$obj[$(this).attr('name')]=$(this).val();$obj.emailType=$emType;nm.defaultGateway.ajaxService($obj,replaceform,error,"openEmailForward",$(this));});});$("#emailUs input[class='btn'][type='button']").click(function(e){var $emailUs=$('#emailUs');$emailUs.find("select,textarea,input.text,:checkbox:checked").each(function(i){$obj[$(this).attr('name')]=$(this).val();});nm.defaultGateway.ajaxService($obj,replaceform,error,"sendEmailUs",$(this));});}
return{init:init,error:error};})(jQuery.noConflict());jQuery(nm.emailforwarding.init);var nm=window.nm||{};nm.message=(function($){function processInline(obj,$errObj){var msgText=obj.msgText.replace(/&gt;/gi,">").replace(/&lt;/gi,"<");var msgId="";if(obj.msgId!=undefined){msgId=obj.msgId;}
$err=$('#err_'+obj.fieldId);if($errObj!=undefined){$err=$errObj;}
if($err.size()>0){$err.append('<br />'+msgText);}else{$field=$('#'+obj.fieldId);if($errObj!=undefined){$field=$errObj;}
$field.after('<h6 class="errorMsg '+msgId+'" id="err_'+obj.fieldId+'">'+msgText+'</h6>');$field.addClass('error');}}
function display(msgtext,elemId,appendToId,$errElem){$msg=new Message();$msg.msgText=msgtext;$msg.fieldId=elemId;processInline($msg,$errElem);}
function remove(elemId){$('#err_'+elemId).empty().remove();$('#'+elemId).removeClass('error');}
function removeAll(){$('h6.errorMsg').each(function(){$(this).empty().remove()});$('.error').each(function(){$(this).removeClass('error');});}
function hasMessages(){if($('h6.errorMsg').length>0){return true;}
if($('.error').length>0){return true;}
return false;}
function applyMessages(eventObj,lifecycleEvent){if(eventObj.hasOwnProperty("messages")){removeAll();eventObj=eventObj.messages;for(var pos=0;pos<eventObj.length;pos++){processInline(eventObj[pos]);}}}
return{display:display,remove:remove,removeAll:removeAll,applyMessages:applyMessages,hasMessages:hasMessages};})(jQuery.noConflict());jQuery(nm.message);NMEventManager.addLifecycleListener(NMEventManager.Lifecycle_Response_Event,nm.message.applyMessages);function Message(){}
Message.prototype.objectType=function(){return("Message");};var Message_msgId="msgId";var Message_msgType="msgType";var Message_fieldId="fieldId";var Message_error="error";var Message_frgName="frgName";var Message_msgText="msgText";var Message_sendToClient="sendToClient";var Message_direction="direction";