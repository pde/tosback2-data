
RightNow.Widget.LogoutLink2=function(data,instanceID){this.data=data;this.instanceID=instanceID;if(document.getElementById("rn_"+this.instanceID))
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_LogoutLink","click",this._onLogoutClick,null,this);RightNow.Event.subscribe("evt_logoutResponse",this._onLogoutCompleted,this);}};RightNow.Widget.LogoutLink2.prototype={_onLogoutCompleted:function(type,arg)
{var result=arg[0],Url=RightNow.Url,eventData=arg[1];if(result.success===1&&!RightNow.UI.Form.logoutInProgress&&eventData.w_id===this.instanceID)
{RightNow.UI.Form.logoutInProgress=true;if(this.data.js&&this.data.js.redirectLocation)
{if(result.session)
this.data.js.redirectLocation=RightNow.Url.addParameter(this.data.js.redirectLocation,'session',RightNow.Text.getSubstringAfter(result.session,'session/'));Url.navigate(this.data.js.redirectLocation,true);}
else
{if(result.socialLogout)
Url.navigate(result.socialLogout,true);else if(this.data.attrs.redirect_url==='')
Url.navigate(result.url,true);else
Url.navigate(this.data.attrs.redirect_url+result.session,true);}}},_onLogoutClick:function()
{var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.data.currentUrl=window.location.pathname;eo.data.redirectUrl=this.data.attrs.redirect_url;RightNow.Event.fire("evt_logoutRequest",eo);}};
RightNow.Widget.LoginDialog2=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._dialog=this._keyListener=null;this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");this._container=document.getElementById("rn_"+this.instanceID);if(this._container)
{if(document.getElementById(this.data.attrs.trigger_element))
YAHOO.util.Event.addListener(this.data.attrs.trigger_element,"click",this._onLoginTriggerClick,null,this);else
RightNow.UI.addDevelopmentHeaderError("Error with LoginDialog2 widget, trigger_element attribute value was set to '"+this.data.attrs.trigger_element+"', but an element with that ID doesn't exist on the page.");RightNow.Event.subscribe("evt_loginFormSubmitResponse",this._onResponseReceived,this);}};RightNow.Widget.LoginDialog2.prototype={_onLoginTriggerClick:function(type,arg){if(!this._dialog){this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,document.getElementById("rn_"+this.instanceID),{buttons:[{text:this.data.attrs.label_login_button,handler:{fn:this._onSubmit,scope:this}},{text:this.data.attrs.label_cancel_button,handler:{fn:this._onCancel,scope:this}}]});this._keyListener=RightNow.UI.Dialog.addDialogEnterKeyListener(this._dialog,this._onSubmit,this);this._dialog.validate=function(){return false;};YAHOO.util.Dom.removeClass("rn_"+this.instanceID,'rn_Hidden');this._dialog.cancelEvent.subscribe(this._onCancel,null,this);}
else if(this._errorDisplay)
{this._errorDisplay.innerHTML="";}
this._dialog.show();this._usernameField=this._usernameField||document.getElementById("rn_"+this.instanceID+"_Username");this._passwordField=this._passwordField||document.getElementById("rn_"+this.instanceID+"_Password");var openLoginLink=document.getElementById("rn_"+this.instanceID+"_OpenLoginLink"),focusElement=openLoginLink||((this._usernameField&&this._usernameField.value==='')?this._usernameField:this._passwordField);if(focusElement)
{RightNow.UI.Dialog.enableDialogControls(this._dialog,this._keyListener,focusElement);focusElement.focus();}},_onCancel:function(type,arg){if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
if(this._dialog)
{RightNow.UI.Dialog.disableDialogControls(this._dialog,this._keyListener);this._dialog.hide();}},_onSubmit:function(type,args){if(type==="keyPressed"&&(YAHOO.util.Event.getTarget(args[1]).tagName==='A'||YAHOO.util.Event.getTarget(args[1]).innerHTML===this.data.attrs.label_login_button||YAHOO.util.Event.getTarget(args[1]).innerHTML===this.data.attrs.label_cancel_button))
return;var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.data.username=(this._usernameField)?YAHOO.lang.trim(this._usernameField.value):"";var errorMessage="";if(eo.data.username.indexOf(' ')>-1)
errorMessage=RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_SPACES_MSG"),RightNow.Interface.getMessage("USERNAME_LBL"));else if(eo.data.username.indexOf('"')>-1)
errorMessage=RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_CONTAIN_DOUBLE_QUOTES_MSG"),RightNow.Interface.getMessage("USERNAME_LBL"));else if(eo.data.username.indexOf("<")>-1||eo.data.username.indexOf(">")>-1)
errorMessage=RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_CNT_THAN_MSG"),RightNow.Interface.getMessage("USERNAME_LBL"));if(errorMessage!=="")
{this._addErrorMessage(errorMessage,'rn_'+this.instanceID+'_Username');return false;}
if(!this.data.attrs.disable_password&&this._passwordField)
eo.data.password=this._passwordField.value;else
eo.data.password="";eo.data.url=window.location.pathname;RightNow.Event.fire("evt_loginFormSubmitRequest",eo);new YAHOO.util.Anim("rn_"+this.instanceID+"_Content",{opacity:{to:0}},0.5,YAHOO.util.Easing.easeOut).animate();YAHOO.util.Dom.addClass("rn_"+this.instanceID,'rn_ContentLoading');if(YAHOO.env.ua.ie>0)
{if(window.external&&"AutoCompleteSaveForm"in window.external)
{var form=document.getElementById("rn_"+this.instanceID+"_Form");if(form)
window.external.AutoCompleteSaveForm(form);}}
RightNow.UI.Dialog.disableDialogControls(this._dialog,this._keyListener);return false;},_onResponseReceived:function(type,result){result=result[0];new YAHOO.util.Anim("rn_"+this.instanceID+"_Content",{opacity:{to:1}},0.5,YAHOO.util.Easing.easeIn).animate();YAHOO.util.Dom.removeClass("rn_"+this.instanceID,'rn_ContentLoading');if(this.instanceID==result.w_id)
{if(result.success==1)
{this._dialog.setFooter("");if(this._container)
document.getElementById("rn_"+this.instanceID).innerHTML=result.message;RightNow.Url.navigate(this._getRedirectUrl(result));}
else
{this._addErrorMessage(result.message,'rn_'+this.instanceID+'_Username',result.showLink);}
RightNow.UI.Dialog.enableDialogControls(this._dialog,this._keyListener);}},_getRedirectUrl:function(result){var redirectUrl;result.sessionParm=RightNow.Text.getSubstringAfter(result.sessionParm,'session/');if(this.data.js&&this.data.js.redirectOverride){redirectUrl=RightNow.Url.addParameter(this.data.js.redirectOverride,'session',result.sessionParm);}
else{redirectUrl=this.data.attrs.redirect_url||result.url;if(result.addSession)
redirectUrl=RightNow.Url.addParameter(redirectUrl,'session',result.sessionParm);}
return redirectUrl+this.data.attrs.append_to_url;},_addErrorMessage:function(message,focusElement,showLink){if(this._errorDisplay)
{YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');if(showLink===false)
{this._errorDisplay.innerHTML=message;}
else
{this._errorDisplay.innerHTML='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';this._errorDisplay.firstChild.focus();}}}};
RightNow.Widget.NavigationTab2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;if(this.data.attrs.subpages)
{this._toggleElement=document.getElementById("rn_"+this.instanceID+"_DropdownButton");if(!this._toggleElement)return;YAHOO.util.Event.addListener(this._toggleElement,'click',this._toggleDropdown,null,this);this._tabElement=document.getElementById("rn_"+this.instanceID);this._dropdownElement=document.getElementById("rn_"+this.instanceID+"_SubNavigation");this._linkElements=YAHOO.util.Dom.getChildren(this._dropdownElement);YAHOO.util.Event.addListener(this._linkElements[this._linkElements.length-1],'focus',this._toggleDropdown,null,this);YAHOO.util.Event.addListener(this._linkElements[0],'focus',this._toggleDropdown,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Link","keydown",function(evt){if(evt.keyCode&&evt.shiftKey&&evt.keyCode===YAHOO.util.KeyListener.KEY.TAB)
this._closeDropdown({type:"click"},null);},null,this);}
if(this.data.attrs.searches_done>0&&this.data.js.searches<this.data.attrs.searches_done)
RightNow.Event.subscribe("evt_searchInProgressRequest",this._onSearchCountChanged,this);};RightNow.Widget.NavigationTab2.prototype={_toggleDropdown:function(evt,args)
{YAHOO.util.Event.stopEvent(evt);if(this._dropdownOpen&&YAHOO.util.Event.getTarget(evt)===this._toggleElement)
this._closeDropdown({type:"click"},null);else
this._openDropdown();return false;},_openDropdown:function()
{if(!this._dropdownOpen)
{this._tabRegion=YAHOO.util.Dom.getRegion(this._tabElement);YAHOO.util.Dom.setStyle(this._dropdownElement,"top",(this._tabRegion.bottom-4)+"px");var left=YAHOO.util.Dom.hasClass(this._tabElement,this.data.attrs.css_class)?4:0;YAHOO.util.Dom.setStyle(this._dropdownElement,"left",(this._tabRegion.left-left)+"px");YAHOO.util.Dom.removeClass(this._dropdownElement,"rn_ScreenReaderOnly");YAHOO.util.Event.addListener([this._tabElement,this._dropdownElement],'mouseout',this._closeDropdown,null,this);YAHOO.util.Event.addListener([this._dropdownElement,document],'click',this._closeDropdown,null,this);var lastDropdownElement=this._linkElements[this._linkElements.length-1];YAHOO.util.Event.addListener(lastDropdownElement,"keydown",function(evt){if(evt.keyCode&&!evt.shiftKey&&evt.keyCode===YAHOO.util.KeyListener.KEY.TAB)
this._closeDropdown(evt);},null,this);this._dropdownOpen=true;}},_closeDropdown:function(evt,args)
{if(this._dropdownOpen)
{if(evt.type!=="keydown"&&evt.type!=="click")
{var coordinates=YAHOO.util.Event.getXY(evt);coordinates=new YAHOO.util.Point(coordinates[0],coordinates[1]);this._dropdownRegion=this._dropdownRegion||YAHOO.util.Dom.getRegion(this._dropdownElement);if((this._tabRegion&&this._tabRegion.contains(coordinates))||(this._dropdownRegion&&this._dropdownRegion.contains(coordinates)))
return;}
YAHOO.util.Event.purgeElement(document,false);YAHOO.util.Dom.setStyle(this._dropdownElement,"top","auto");YAHOO.util.Dom.setStyle(this._dropdownElement,"left","-10000px");YAHOO.util.Dom.addClass(this._dropdownElement,"rn_ScreenReaderOnly");this._dropdownOpen=false;}},_onSearchCountChanged:function()
{this.data.js.searches++;if(this.data.js.searches>=this.data.attrs.searches_done)
{RightNow.Event.unsubscribe("evt_searchInProgressRequest",this._onSearchCountChanged);var tabElement=document.getElementById('rn_'+this.instanceID);if(tabElement)
YAHOO.util.Dom.removeClass(tabElement,'rn_Hidden');}}};
RightNow.Widget.SimpleSearch=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._searchField=document.getElementById("rn_"+this.instanceID+"_SearchField");if(!this._searchField)return;if(this.data.attrs.initial_focus&&this._searchField.focus)
this._searchField.focus();if(this.data.attrs.label_hint)
{YAHOO.util.Event.addListener(this._searchField,"focus",this._onFocus,null,this);YAHOO.util.Event.addListener(this._searchField,"blur",this._onBlur,null,this);}
YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Submit","click",this._onSearch,null,this);};RightNow.Widget.SimpleSearch.prototype={_onSearch:function(){if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=document.getElementById("rn_"+this.instanceID+"_SearchForm");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
var searchString=(this._searchField.value===this.data.attrs.label_hint)?"":this._searchField.value;searchString=RightNow.Url.addParameter(this.data.attrs.report_page_url,"kw",searchString);searchString=RightNow.Url.addParameter(searchString,"search",1);searchString=RightNow.Url.addParameter(searchString,"session",RightNow.Url.getSession());RightNow.Url.navigate(searchString);},_onFocus:function(){if(this._searchField.value===this.data.attrs.label_hint)
this._searchField.value="";},_onBlur:function(){if(this._searchField.value==="")
this._searchField.value=this.data.attrs.label_hint;}};
RightNow.Widget.SiteFeedback2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._dialog=this._keyListener=null;if(!document.getElementById("rn_"+this.instanceID+"_FeedbackTextarea"))
{RightNow.UI.DevelopmentHeader.addJavascriptError(RightNow.Text.sprintf(RightNow.Interface.getMessage("SITEFEEDBACK2_DIALOG_MISSING_REQD_MSG"),"rn_"+this.instanceID+"_FeedbackTextarea"));return;}
YAHOO.util.Event.addListener("rn_"+this.instanceID+"_FeedbackLink","click",this._onGiveFeedbackClick,null,this);RightNow.Event.subscribe("evt_siteFeedbackSubmitResponse",this._onResponseReceived,this);};RightNow.Widget.SiteFeedback2.prototype={_onGiveFeedbackClick:function()
{if(this.data.attrs.feedback_page_url)
{window.open(RightNow.Url.addParameter(this.data.attrs.feedback_page_url,"session",RightNow.Url.getSession()),"","resizable, scrollbars, width=630, height=400");}
else
{this._showDialog();}},_showDialog:function()
{var baseID="rn_"+this.instanceID+"_";if(!this._dialog)
{var buttons=[{text:this.data.attrs.label_send_button,handler:{fn:this._onSubmit,scope:this},isDefault:true},{text:this.data.attrs.label_cancel_button,handler:{fn:this._onCancel,scope:this},isDefault:false}];this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,document.getElementById(baseID+"SiteFeedback2Form"),{"buttons":buttons});this._keyListener=RightNow.UI.Dialog.addDialogEnterKeyListener(this._dialog,this._onSubmit,this);YAHOO.util.Dom.addClass(this._dialog.id,'rn_SiteFeedback2Dialog');}
this._errorDisplay=this._errorDisplay||document.getElementById(baseID+"ErrorMessage");this._emailField=this._emailField||document.getElementById(baseID+"EmailInput");this._feedbackField=this._feedbackField||document.getElementById(baseID+"FeedbackTextarea");if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
RightNow.ActionCapture.record('siteFeedback','click');this._dialog.show();var focusElement;if(this._emailField&&this._emailField.value==='')
focusElement=this._emailField;else
focusElement=this._feedbackField;focusElement.focus();RightNow.UI.Dialog.enableDialogControls(this._dialog,this._keyListener);},_onSubmit:function(type,args)
{var target=(args&&args[1])?YAHOO.util.Event.getTarget(args[1]):null;if(type==="keyPressed"&&target&&(target.tagName==='A'||target.tagName==='TEXTAREA'||target.innerHTML===this.data.attrs.label_send_button||target.innerHTML===this.data.attrs.label_cancel_button)){return;}
if(!this._validateDialogData()){return false;}
RightNow.UI.Dialog.disableDialogControls(this._dialog,this._keyListener);this._submitFeedback();},_onCancel:function()
{RightNow.UI.Dialog.disableDialogControls(this._dialog,this._keyListener);this._closeDialog(true);},_validateDialogData:function()
{YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');this._errorDisplay.innerHTML="";var returnValue=true;if(this._emailField)
{this._emailField.value=YAHOO.lang.trim(this._emailField.value);if(this._emailField.value==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_email_address),this._emailField.id);returnValue=false;}
else if(!RightNow.Text.isValidEmailAddress(this._emailField.value))
{this._addErrorMessage(this.data.attrs.label_email_address+' '+RightNow.Interface.getMessage("FIELD_IS_NOT_A_VALID_EMAIL_ADDRESS_MSG"),this._emailField.id);returnValue=false;}}
this._feedbackField.value=YAHOO.lang.trim(this._feedbackField.value);if(this._feedbackField.value==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_comment_box),this._feedbackField.id);returnValue=false;}
return returnValue;},_closeDialog:function(cancelled)
{if(!cancelled)
{this._feedbackField.value="";}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
if(this._dialog)
this._dialog.hide();},_submitFeedback:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"a_id":null,"rate":0,"message":this._feedbackField.value};if(this.data.js.isProfile)
eventObject.data.email=this.data.js.email;else if(this._emailField)
eventObject.data.email=this._emailField.value;RightNow.Event.fire("evt_siteFeedbackRequest",eventObject);return false;},_onResponseReceived:function(type,arg)
{if(arg[1][0].w_id===this.instanceID)
{if(typeof(arg[0])==="string")
{RightNow.UI.Dialog.messageDialog(arg[0],{icon:"WARN",exitCallback:{fn:this._enableDialog,scope:this}});}
else
{RightNow.UI.Dialog.messageDialog(this.data.attrs.label_feedback_confirmation,{exitCallback:{fn:this._closeDialog,scope:this}});}}},_addErrorMessage:function(message,focusElement)
{if(this._errorDisplay)
{YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
{this._errorDisplay.innerHTML=newMessage;}
else
{this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;}
this._errorDisplay.firstChild.focus();}}};