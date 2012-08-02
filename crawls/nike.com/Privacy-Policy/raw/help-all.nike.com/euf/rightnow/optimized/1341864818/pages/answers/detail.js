
RightNow.Widget.EmailAnswerLink=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._dialogElement=document.getElementById('rn_'+this.instanceID+'_EmailAnswerLinkForm');this._recipientEmailElement=document.getElementById("rn_"+this.instanceID+"_InputRecipientEmail");this._senderEmailElement=document.getElementById("rn_"+this.instanceID+"_InputSenderEmail");this._senderNameElement=document.getElementById("rn_"+this.instanceID+"_InputSenderName");this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");if(this._dialogElement)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Link","click",this._onEmailLinkClick,null,this);}
RightNow.Event.subscribe("evt_emailLinkSubmitResponse",this._onResponseReceived,this);};RightNow.Widget.EmailAnswerLink.prototype={_onEmailLinkClick:function(type,arg)
{if(!(this._dialog))
{var buttons=[{text:this.data.attrs.label_send_button,handler:{fn:this._submitClicked,scope:this},isDefault:true},{text:this.data.attrs.label_cancel_button,handler:{fn:this._closeDialog,scope:this},isDefault:false}];this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,this._dialogElement,{"buttons":buttons,"width":'300px'});YAHOO.util.Dom.removeClass(this._dialogElement,"rn_Hidden");YAHOO.util.Dom.addClass(this._dialog.id,'rn_EmailLinkDialog');}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._dialog.show();if(this._recipientEmailElement)
this._recipientEmailElement.focus();this._dialog.enableButtons();},_closeDialog:function(type,arg)
{if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._dialog.enableSecondButton();this._dialog.hide();},_submitClicked:function()
{this._dialog.disableButtons();if(this._validateFormData())
{this._submitRequest();}
else
{this._dialog.enableButtons();}},_validateFormData:function()
{var returnValue=true;if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
if(!this._validateEmailAddress(this._recipientEmailElement,this.data.attrs.label_to))
{returnValue=false;}
if(this._senderEmailElement&&!this._validateEmailAddress(this._senderEmailElement,this.data.attrs.label_sender_email))
{returnValue=false;}
if(this._senderNameElement)
{var nameValue=YAHOO.lang.trim(this._senderNameElement.value);if(nameValue!=="")
{if(nameValue.indexOf("<")>-1||nameValue.indexOf(">")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_CONTAIN_THAN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(nameValue.indexOf("'")>-1||nameValue.indexOf('"')>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_QUOTES_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(nameValue.indexOf("&")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
else
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
return returnValue;},_validateEmailAddress:function(emailField,label)
{if(emailField)
{var emailFieldValue=YAHOO.lang.trim(emailField.value);if(emailFieldValue==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),label),emailField.id);return false;}
if(emailFieldValue.indexOf(";")>=0||emailFieldValue.indexOf(",")>=0||emailFieldValue.indexOf(" ")>=0)
{this._addErrorMessage(RightNow.Interface.getMessage("PLEASE_ENTER_SINGLE_EMAIL_ADDRESS_MSG"),emailField.id);return false;}
if(!RightNow.Text.isValidEmailAddress(emailFieldValue))
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_INVALID_MSG"),label),emailField.id);return false;}
if(emailFieldValue.length>80)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_TOO_LONG_MSG"),label),emailField.id);return false;}
return true;}
return false;},_submitRequest:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"emailAnswerToken":this.data.js.emailAnswerToken,"to":this._recipientEmailElement.value,"a_id":this.data.js.answerID};if(this.data.js.isProfile)
{eventObject.data.from=this.data.js.senderEmail;eventObject.data.name=this.data.js.senderName;}
else
{if(this._senderEmailElement)
{eventObject.data.from=this._senderEmailElement.value;}
if(this._senderNameElement)
{eventObject.data.name=this._senderNameElement.value;}}
RightNow.Event.fire("evt_emailLinkRequest",eventObject);},_onResponseReceived:function(type,arg)
{if(arg[1][0].w_id===this.instanceID)
{RightNow.UI.Dialog.messageDialog(((arg[0]&&arg[0]!==true)?arg[0]:this.data.attrs.label_email_sent),{exitCallback:{fn:this._closeDialog,scope:this}});}},_addErrorMessage:function(message,focusElement){if(this._errorDisplay){YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
this._errorDisplay.innerHTML=newMessage;else
this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;this._errorDisplay.firstChild.focus();}}};