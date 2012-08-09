
RightNow.Widget.SearchBox=function(data,instanceID){this.data=data;this.instanceID=(this.data.info.w_id+1);this.form=YAHOO.util.Dom.get('searchBox');this.input=YAHOO.util.Dom.get('rn_KeywordText2_'+this.instanceID+'_Text');YAHOO.util.Event.addListener(this.form,'submit',this._formSubmit,null,this);YAHOO.util.Event.addListener(this.input,'click',this._inputClick,null,this);YAHOO.util.Event.addListener(this.input,'blur',this._inputBlur,null,this);this.input.value=this.input.title;if(this.input.value==this.input.title)
YAHOO.util.Dom.addClass(this.input,'blankInput');else
YAHOO.util.Dom.removeClass(this.input,'blankInput');};RightNow.Widget.SearchBox.prototype={_formSubmit:function()
{this.form.action="/app/answers/list/kw/"+this.input.value+"/search/1";},_inputClick:function()
{if(this.input.value==this.input.title)
{this.input.value='';YAHOO.util.Dom.removeClass(this.input,'blankInput');}},_inputBlur:function()
{if(this.input.value=='')
{this.input.value=this.input.title;YAHOO.util.Dom.addClass(this.input,'blankInput');}}}
RightNow.Widget.KeywordText2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._textElement=document.getElementById("rn_"+this.instanceID+"_Text");if(this._textElement)
{this._searchedOn=this._textElement.value;this.data.initialValue=this._textElement.value;this._setFilter();YAHOO.util.Event.addListener(this._textElement,"change",this._onChange,null,this);RightNow.Event.subscribe("evt_keywordChangedResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_getFiltersRequest",this._onGetFiltersRequest,this);RightNow.Event.subscribe("evt_resetFilterRequest",this._onResetRequest,this);if(this.data.attrs.initial_focus)
this._textElement.focus();}};RightNow.Widget.KeywordText2.prototype={_onChange:function(evt)
{this._eo.data=this._textElement.value;this._eo.filters.data=this._textElement.value;RightNow.Event.fire("evt_keywordChangedRequest",this._eo);},_onGetFiltersRequest:function(type,args)
{this._eo.filters.data=YAHOO.lang.trim(this._textElement.value);this._searchedOn=this._eo.filters.data;RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"searchName":this.data.js.searchName,"data":this.data.initialValue,"rnSearchType":this.data.js.rnSearchType,"report_id":this.data.attrs.report_id};},_onChangedResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id))
{var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id),newValue=(data===null)?this.data.initialValue:data;if(this._textElement.value!==newValue)
this._textElement.value=newValue;}},_onResetRequest:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id)&&(args[0].data.name===this.data.js.searchName||args[0].data.name==="all"))
{this._textElement.value=this._searchedOn;}}};
RightNow.Widget.SearchButton2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._requestInProgress=false;this._searchButton=document.getElementById("rn_"+this.instanceID+"_SubmitButton");this._enableClickListener();RightNow.Event.subscribe("evt_reportResponse",this._onSearchResponse,this);};RightNow.Widget.SearchButton2.prototype={_startSearch:function(evt)
{if(this._requestInProgress)return false;if(!this.data.attrs.popup_window)
this._disableClickListener();if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=YAHOO.util.Dom.getAncestorByTagName("rn_"+this.instanceID,"FORM");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.filters={report_id:this.data.attrs.report_id,reportPage:this.data.attrs.report_page_url,target:this.data.attrs.target,popupWindow:this.data.attrs.popup_window,width:this.data.attrs.popup_window_width_percent,height:this.data.attrs.popup_window_height_percent};RightNow.Event.fire("evt_searchRequest",eo);},_onSearchResponse:function(type,args)
{if(args[0].filters.report_id==this.data.attrs.report_id)
this._enableClickListener();},_enableClickListener:function()
{this._searchButton.disabled=this._requestInProgress=false;},_disableClickListener:function()
{this._searchButton.disabled=this._requestInProgress=true;YAHOO.util.Event.removeListener(this._searchButton,"click",this._startSearch);}};
RightNow.Widget.EmailAnswerLink=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._dialogElement=document.getElementById('rn_'+this.instanceID+'_EmailAnswerLinkForm');this._recipientEmailElement=document.getElementById("rn_"+this.instanceID+"_InputRecipientEmail");this._senderEmailElement=document.getElementById("rn_"+this.instanceID+"_InputSenderEmail");this._senderNameElement=document.getElementById("rn_"+this.instanceID+"_InputSenderName");this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");this._instructionsAdded=false;if(this._dialogElement)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Link","click",this._onEmailLinkClick,null,this);}
RightNow.Event.subscribe("evt_emailLinkSubmitResponse",this._onResponseReceived,this);};RightNow.Widget.EmailAnswerLink.prototype={_onEmailLinkClick:function(type,arg)
{if(!(this._dialog))
{var buttons=[{text:this.data.attrs.label_send_button,handler:{fn:this._submitClicked,scope:this},isDefault:true},{text:this.data.attrs.label_cancel_button,handler:{fn:this._closeDialog,scope:this},isDefault:false}];this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,this._dialogElement,{"buttons":buttons,"width":'500px'});YAHOO.util.Dom.removeClass(this._dialogElement,'rn_Hidden');YAHOO.util.Dom.addClass(this._dialog.id,'rn_EmailLinkDialog');YAHOO.util.Dom.removeClass(this._dialog.defaultHtmlButton,'default');YAHOO.util.Dom.addClass(this._dialog.defaultHtmlButton,'send');}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._addDialogInstructions();this._adjustCloseDialogStyle();this._dialog.show();if(this._recipientEmailElement)
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
{this._senderNameElement.value=YAHOO.lang.trim(this._senderNameElement.value);if(this._senderNameElement.value!=="")
{if(this._senderNameElement.value.indexOf("<")>-1||this._senderNameElement.value.indexOf(">")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_CONTAIN_THAN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(this._senderNameElement.value.indexOf("'")>-1||this._senderNameElement.value.indexOf('"')>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_QUOTES_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(this._senderNameElement.value.indexOf("&")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
else
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
return returnValue;},_validateEmailAddress:function(emailField,label)
{if(emailField)
{emailField.value=YAHOO.lang.trim(emailField.value);var emailFieldValue=emailField.value;if(emailFieldValue==="")
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
{if(arg[1][0].w_id!==this.instanceID)
{return false;}
var messageString=(arg[0]&&arg[0]!==true)?arg[0]:this.data.attrs.label_email_sent;var message_dialog=RightNow.UI.Dialog.messageDialog(messageString,{title:"Thank you",width:"450px",exitCallback:{fn:this._closeDialog,scope:this}});this._addDialogInstructions(message_dialog);this._adjustCloseDialogStyle();this._removeDialogFooter(message_dialog);return false;},_addErrorMessage:function(message,focusElement){if(this._errorDisplay){YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
this._errorDisplay.innerHTML=newMessage;else
this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;this._errorDisplay.firstChild.focus();}},_removeDialogFooter:function(container)
{if(!container)
container=this._dialog;YAHOO.util.Dom.addClass(container.footer,'rn_Hidden');},_setDefaultButtonClose:function(container)
{if(!container)
container=this._dialog;YAHOO.util.Dom.removeClass(container.defaultHtmlButton,'default');YAHOO.util.Dom.addClass(container.defaultHtmlButton,'close');},_addDialogInstructions:function(container)
{if(!container)
container=this._dialog;var instruct_div=document.createElement('div');instruct_div.id='dialog-additional-instructions';if(this.data.js.additional_instructions)
instruct_div.innerHTML=this.data.js.additional_instructions;YAHOO.util.Dom.insertBefore(instruct_div,container.buttonSpan);var clear_div=document.createElement('div');clear_div.id='yui-footer-clear';YAHOO.util.Dom.insertAfter(clear_div,container.buttonSpan);},_adjustCloseDialogStyle:function()
{var close_links=YAHOO.util.Dom.getElementsByClassName('container-close','a');for(var link_counter=0;link_counter<close_links.length;link_counter++)
{YAHOO.util.Dom.setStyle(close_links[link_counter],'text-indent','0');}}};
RightNow.Widget.CustomAnswerFeedback=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._rate=0;this._emailField=document.getElementById("rn_"+this.instanceID+"_EmailInput");this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");this._feedbackField=document.getElementById("rn_"+this.instanceID+"_FeedbackTextarea");if(!this._feedbackField)
{RightNow.UI.DevelopmentHeader.addJavascriptError(RightNow.Text.sprintf(RightNow.Interface.getMessage("ANSWERFEEDBACK2_DIALOG_MISSING_REQD_MSG"),"rn_"+this.instanceID+"_FeedbackTextarea"));return;}
RightNow.Event.subscribe("evt_answerFeedbackSubmitResponse",this._onResponseReceived,this);if(this.data.js.buttonView)
{var noButton=document.getElementById("rn_"+this.instanceID+"_RatingNoButton"),yesButton=document.getElementById("rn_"+this.instanceID+"_RatingYesButton");YAHOO.util.Event.addListener(noButton,"click",this._onClick,1,this);YAHOO.util.Event.addListener(yesButton,"click",this._onClick,2,this);YAHOO.util.Event.addListener([noButton,yesButton],"mouseover",function(){this._wasMouse=true;},null,this);YAHOO.util.Event.addListener([noButton,yesButton],"mouseout",function(){this._wasMouse=false;},null,this);}
else
{for(var i=0;i<=this.data.attrs.options_count;++i)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_RatingCell_"+i,"mouseover",this._onCellOver,i,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_RatingCell_"+i,"focus",this._onCellOver,i,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_RatingCell_"+i,"mouseout",this._onCellOut,i,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_RatingCell_"+i,"blur",this._onCellOut,i,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_RatingCell_"+i,"click",this._onClick,i,this);}}};RightNow.Widget.CustomAnswerFeedback.prototype={_onClick:function(type,args)
{if(this.data.js.buttonView)
{var ratingButtons=document.getElementById("rn_"+this.instanceID+"_RatingButtons");if(ratingButtons)
YAHOO.util.Event.purgeElement(ratingButtons,true);}
else
{this._onCellOver(0,args);YAHOO.util.Event.preventDefault(type);var rateMeter=document.getElementById("rn_"+this.instanceID+"_RatingMeter");if(rateMeter)
YAHOO.util.Event.purgeElement(rateMeter,true);for(var cell,i=0;i<=this.data.attrs.options_count;++i)
{cell=document.getElementById("rn_"+this.instanceID+"_RatingCell_"+i);if(cell)
{for(var j=0;j<cell.childNodes.length;j++)
{if(cell.childNodes[j].tagName&&cell.childNodes[j].tagName.toLowerCase()==="span"&&YAHOO.util.Dom.hasClass(cell.childNodes[j],"rn_ScreenReaderOnly"))
cell.childNodes[j].innerHTML=RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_D_OF_PCT_D_SELECTED_LBL"),args,this.data.attrs.options_count);}}}}
this._rate=args;this._submitAnswerRating();if(this._rate<=this.data.attrs.dialog_threshold)
{if(this.data.attrs.feedback_page_url)
{var pageString=this.data.attrs.feedback_page_url;pageString=RightNow.Url.addParameter(pageString,"a_id",this.data.js.answerID);pageString=RightNow.Url.addParameter(pageString,"session",RightNow.Url.getSession());window.open(pageString,'',"resizable, scrollbars, width=630, height=400");}
else
{this._showDialog();}}},_showDialog:function()
{if(!this._dialog)
{var buttons=[{text:this.data.attrs.label_cancel_button,handler:{fn:this._onCancel,scope:this},isDefault:false},{text:this.data.attrs.label_send_button,handler:{fn:this._onSubmit,scope:this},isDefault:true}],dialogForm=document.getElementById("rn_"+this.instanceID+"_AnswerFeedback2Form");this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,dialogForm,{"buttons":buttons,"width":'500px'});this._addDialogInstructions();YAHOO.util.Dom.removeClass(dialogForm,"rn_Hidden");YAHOO.util.Dom.addClass(this._dialog.id,'rn_AnswerFeedback2Dialog');}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._adjustCloseDialogStyle();this._dialog.show();var focusElement;if(this._emailField&&this._emailField.value==='')
focusElement=this._emailField;else
focusElement=this._feedbackField;focusElement.focus();this._dialog.enableButtons();},_onSubmit:function()
{this._dialog.disableButtons();if(!this._validateDialogData())
{this._dialog.enableButtons();return;}
this._incidentCreateFlag=true;this._submitFeedback();},_onCancel:function()
{this._dialog.disableButtons();this._closeDialog(true);},_validateDialogData:function()
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
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"summary":this.data.js.summary,"a_id":this.data.js.answerID,"rate":this._rate,"dialog_threshold":this.data.attrs.dialog_threshold,"options_count":this.data.attrs.options_count,"message":this._feedbackField.value};if(this.data.js.isProfile)
eventObject.data.email=this.data.js.email;else if(this._emailField)
eventObject.data.email=this._emailField.value;RightNow.Event.fire("evt_answerFeedbackRequest",eventObject);return false;},_onResponseReceived:function(type,arg)
{if(this._incidentCreateFlag&&arg[1][0].w_id===this.instanceID)
{var message_dialog=null;this._incidentCreateFlag=false;if(typeof(arg[0])==="string")
{message_dialog=RightNow.UI.Dialog.messageDialog(arg[0],{icon:"WARN",exitCallback:{fn:this._enableDialog,scope:this}});}
else
{message_dialog=RightNow.UI.Dialog.messageDialog("Our goal is to assist you more effectively. Your feedback is appreciated.",{title:"Thank you",width:"450px",exitCallback:{fn:this._closeDialog,scope:this}});}
this._addDialogInstructions(message_dialog);this._setDefaultButtonClose(message_dialog);this._adjustCloseDialogStyle();}
else
{this._closeDialog();}},_submitAnswerRating:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"a_id":this.data.js.answerID,"rate":this._rate,"options_count":this.data.attrs.options_count,"dialog_threshold":this.data.attrs.dialog_threshold};RightNow.Event.fire("evt_answerRatingRequest",eventObject);var thanksLabel=document.getElementById("rn_"+this.instanceID+"_ThanksLabel");if(thanksLabel)
{if(this._wasMouse)
{thanksLabel.innerHTML=this.data.attrs.label_feedback_submit;var rating_buttons=YAHOO.util.Dom.setStyle('rn_'+this.instanceID+'_RatingButtons','display','none');}
else if(this._rate>this.data.attrs.dialog_threshold)
{RightNow.UI.Dialog.messageDialog(this.data.attrs.label_feedback_submit);}}},_addErrorMessage:function(message,focusElement)
{if(this._errorDisplay)
{YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
{this._errorDisplay.innerHTML=newMessage;}
else
{this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;}
this._errorDisplay.firstChild.focus();}},_onCellOver:function(type,chosenRating)
{if(type.type==="mouseover")
this._wasMouse=true;this._updateCellClass(1,chosenRating+1,"rn_RatingCellOver","add");this._updateCellClass(chosenRating+1,this.data.attrs.options_count+1,"rn_RatingCellOver","remove");},_updateCellClass:function(minBound,maxBound,cssClass,removeOrAddClass)
{var cssFunc=(removeOrAddClass==="add")?YAHOO.util.Dom.addClass:YAHOO.util.Dom.removeClass;for(var i=minBound;i<maxBound;i++)
cssFunc("rn_"+this.instanceID+"_RatingCell_"+i,cssClass);},_onCellOut:function(type,args)
{if(type.type==="mouseout")
this._wasMouse=false;this._updateCellClass(1,this.data.attrs.options_count+1,"rn_RatingCellOver","remove");},_setDefaultButtonClose:function(container)
{if(!container)
container=this._dialog;YAHOO.util.Dom.removeClass(container.defaultHtmlButton,'default');YAHOO.util.Dom.addClass(container.defaultHtmlButton,'close');},_addDialogInstructions:function(container)
{var autoWidth=false;if(!container)
container=this._dialog;else
autoWidth=true;var instruct_div=document.createElement('div');instruct_div.id='dialog-additional-instructions';if(autoWidth)
instruct_div.className='alternate';if(this.data.js.additional_instructions)
instruct_div.innerHTML=this.data.js.additional_instructions;YAHOO.util.Dom.insertBefore(instruct_div,container.buttonSpan);var clear_div=document.createElement('div');clear_div.id='yui-footer-clear';YAHOO.util.Dom.insertAfter(clear_div,container.buttonSpan);},_adjustCloseDialogStyle:function()
{var close_links=YAHOO.util.Dom.getElementsByClassName('container-close','a');for(var link_counter=0;link_counter<close_links.length;link_counter++)
{YAHOO.util.Dom.setStyle(close_links[link_counter],'text-indent','0');}}};
RightNow.Widget.GuidedAssistant=function(data,instanceID){this.data=data;this.instanceID=instanceID;if(this.data.attrs.popup_window_url)return;this._currentLevel=1;this._changeFired=false;this._mouseTriggered=false;this._hasRecordedInitialInteraction=false;this._guide=[];this._map=RightNow.Url.convertToArray(RightNow.Url.getParameterSegment());this._currentGuideID=this.data.js.guidedAssistant.guideID;this._originalGuideID=this._currentGuideID;this._guide[this._currentGuideID]=this.data.js.guidedAssistant;this._currentQuestion=this._guide[this._currentGuideID].questions[0].questionID;this._previousQuestions=[];this._eo=new RightNow.Event.EventObject();this._eo.w_id=this.instanceID;delete this.data.js.guidedAssistant;this._isConsoleMode=(typeof this.data.js.agentMode!=="undefined");this._isAgentRuntime=(this.data.js.agentMode==="agent");this._isAPreviewMode=(this.data.js.agentMode&&this.data.js.agentMode.toLowerCase().indexOf("preview")>-1);this._isEnduserPreviewMode=(this.data.js.agentMode&&this.data.js.agentMode==="enduserPreview");var RightNowEvent=RightNow.Event;RightNowEvent.subscribe("evt_GuidedAssistanceResponse",this._getGuideResponse,this);RightNowEvent.subscribe("evt_GuidedAssistanceGoToResponse",this._goToResponse,this);RightNowEvent.subscribe("evt_GuidedAssistanceGoToQuestion",this._goToQuestion,this);RightNowEvent.subscribe("evt_GuidedAssistanceAnswerViewed",this._answerViewed,this);var ariaDiv=document.createElement("div");ariaDiv.className="rn_ScreenReaderOnly";ariaDiv.setAttribute("role","alert");this._liveNotificationArea=document.body.appendChild(ariaDiv);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_BackButton","click",this._goBackHelper,null,this);var recordGuideSessionStart=function(){this._submitStats(RightNow.Ajax.CT.GA_SESSIONS,{"ga_sid":this._guide[this._currentGuideID].guideSessionID,"ga_id":this._currentGuideID,"sid":this.data.js.session,"acct_id":parseInt(this.data.js.accountID,10),"channel":this.data.js.channel},true);this._submitStats(RightNow.Ajax.CT.GA_SESSION_DETAILS,{"ga_sid":this._guide[this._currentGuideID].guideSessionID,"ga_id":this._currentGuideID,"q_id":this._currentQuestion});RightNow.ActionCapture.record('guidedAssistance','load',this._currentGuideID);};if(top===self&&!this._isConsoleMode&&!RightNowEvent.isHistoryManagerFragment()){var History=YAHOO.util.History;this._stateKey="gs";History.register(this._stateKey,History.getBookmarkedState(this._stateKey)||"",function(state){this._restoreState(state);},this,true);History.onReady(function(){var currentState=History.getCurrentState(this._stateKey);if(currentState){if(this._restoreState(currentState)){return;}
else{History.navigate(this._stateKey,"");}}
recordGuideSessionStart.call(this);},this,true);try{History.initialize("rn_History_Field","rn_History_Iframe");}
catch(e){this._stateKey=null;recordGuideSessionStart.call(this);}}
else{recordGuideSessionStart.call(this);}
this._eo.data={"guideID":this._currentGuideID};RightNowEvent.fire("evt_GuideLoaded",this._eo);};RightNow.Widget.GuidedAssistant.prototype={answerQuestion:function(element,guideID,questionID,responseID,level,skipped){if(guideID!==this._currentGuideID){if(!this._guide[guideID])
throw new Error("Missing guide");else
this._currentGuideID=guideID;}
if(!this._hasRecordedInitialInteraction){RightNow.ActionCapture.record('guidedAssistance','interact',this._currentGuideID);this._hasRecordedInitialInteraction=true;}
this._setAriaLoading(true);var question=this._getQuestionByID(questionID),response=this._getResponseByID(question,responseID);if(question){this._currentLevel=level+1;this._previousQuestions[level]=questionID;this._removeElements(questionID);this._removePairs(questionID);if(question.type===this.data.js.types.MENU_QUESTION||question.type===this.data.js.types.LIST_QUESTION){if(element.options[element.selectedIndex].value){responseID=parseInt(element.options[element.selectedIndex].value,10);response=this._getResponseByID(question,responseID);}
else{this._previousQuestions.pop();this._currentLevel--;this._setAriaLoading(false);return;}}
else if(question.type===this.data.js.types.TEXT_QUESTION){var input=document.getElementById("rn_"+this.instanceID+"_Response"+guideID+"_"+questionID+"_"+responseID);if(input){input.value=YAHOO.lang.trim(input.value);if(input.value===""){input.focus();this._setAriaLoading(false);this._currentLevel--;this._previousQuestions.pop();return;}
response.value=input.value;}
else{this._setAriaLoading(false);return;}}
this._addPairs(question,response.value,level);this._submitStats(RightNow.Ajax.CT.GA_SESSION_DETAILS,{"ga_sid":this._guide[guideID].guideSessionID,"ga_id":guideID,"q_id":questionID,"r_id":responseID,"skipped":skipped},true);this._eo.data={"guideID":guideID,"questionID":questionID,"responseID":responseID,"responseValue":response.value};RightNow.Event.fire("evt_GuideResponseSelected",this._eo);if(this.data.attrs.single_question_display){if(question.type===this.data.js.types.RADIO_QUESTION||question.type===this.data.js.types.IMAGE_QUESTION)
element.checked=false;else if(question.type===this.data.js.types.MENU_QUESTION||question.type===this.data.js.types.LIST_QUESTION)
element.selectedIndex=0;else if(question.type===this.data.js.types.TEXT_QUESTION)
input.value="";if(this._guideAppended){this._hideFirstGuideQuestion(questionID);this._guideAppended=false;}
else{this._toggleQuestion(question);}
this._toggleBackButton(true);}
else{if(question.type===this.data.js.types.LINK_QUESTION||question.type===this.data.js.types.BUTTON_QUESTION){this._highlightResponse(element,question.type);}
else if(element&&element.checked!==undefined&&element.checked===false){element.checked=true;}}
this._buildNextResult(response);this._changeFired=false;this._setAriaLoading(false);}},_samePage:function(){if(this._samePageCachedResult)
return this._samePageCachedResult;try{this._samePageCachedResult=!window.opener||window.opener===window.self||window.opener.RightNow.Chat;}
catch(err){}
return this._samePageCachedResult;},_goBackHelper:function(){this._setAriaLoading(true);this._goBack();this._focusTopOfGuide();this._setAriaLoading(false);},_goBack:function(){this._currentLevel--;var prevQuestionID=this._previousQuestions[this._currentLevel],prevSibling;if(this._toggleQuestion(prevQuestionID,true)){this._removeElements(prevQuestionID);if(prevQuestionID===1&&this._guide[this._currentGuideID].parentGuide){prevSibling=YAHOO.util.Dom.getPreviousSibling(this._buildID("Guide",""));if(prevSibling&&prevSibling.id.indexOf("Result")>-1){YAHOO.util.Dom.removeClass(prevSibling,"rn_Hidden");}}}
else{this._currentGuideID=this._guide[this._currentGuideID].parentGuide;this._toggleQuestion(prevQuestionID,true);this._removeElements(prevQuestionID);}
YAHOO.util.Dom.addClass(this._restartButton,"rn_Hidden");if(this._currentLevel===1)
this._toggleBackButton();},_goToResponse:function(evt,args){var levelOfQuestion=this._goToQuestion(evt,args),data=args[0].data,guideID=data.guideID,questionID=data.questionID,responseID=data.responseID,goToResponse=function(level){var question=this._getQuestionByID(questionID);if(question&&question.responses){for(var i=0,response;i<question.responses.length;i++){response=question.responses[i];if(response.responseID===responseID&&!(this._restoringState&&response.url)){this._answerQuestion(guideID,question,response,level);}}}};if(levelOfQuestion.guideID){var levelUpToSubGuide=this._goToResponse(this.instanceID,[{data:levelOfQuestion}]),restoringState=this._restoringState;this._guideLoadedCallback=function(idOfLoadedGuide){if(guideID===idOfLoadedGuide){this._guideLoadedCallback=null;this._currentGuideID=guideID;this._restoringState=restoringState;levelOfQuestion=this._goToQuestion(this.instanceID,[{data:{guideID:guideID,questionID:questionID,level:levelUpToSubGuide}}]);goToResponse.call(this,levelOfQuestion+levelUpToSubGuide);this._restoringState=false;}};}
else{goToResponse.call(this,levelOfQuestion);return levelOfQuestion;}},_goToQuestion:function(evt,args){var data=args[0].data,guideID=data.guideID,questionID=data.questionID,startingLevel=(data.level||0)+1;if(this._guide[guideID]&&this._guide[guideID].questions[0]&&(guideID===this._currentGuideID||!this._guide[guideID].parentGuide)){this._currentGuideID=guideID;var nodeList=this._getPathToQuestion([this._guide[guideID].questions[0]],questionID);if(nodeList&&nodeList.length){if(nodeList.length===1){this._removeElements(nodeList[0].questionID);if(this.data.attrs.single_question_display){this._toggleQuestion(nodeList[0],true);this._toggleBackButton(false);}}
else{for(var i=0,response,j;i<=nodeList.length-2;i++){for(j in nodeList[i].responses){if(nodeList[i].responses.hasOwnProperty(j)){response=nodeList[i].responses[j];if(response.childQuestionID===nodeList[i+1].questionID){this._answerQuestion(guideID,nodeList[i],response,i+startingLevel);}}}}}
return nodeList.length;}}
else{var parentGuide;for(i in this._guide){if(this._guide.hasOwnProperty(i)){response=this._getGuideParentResponse(this._guide[i].questions,guideID);if(response){return{guideID:this._guide[i].guideID,questionID:response.questionID,responseID:response.responseID};}}}}},_answerQuestion:function(guideID,question,response,level){var element;if(question.type===this.data.js.types.MENU_QUESTION||question.type===this.data.js.types.LIST_QUESTION){var parent=document.getElementById("rn_"+this.instanceID+"_Response"+guideID+"_"+question.questionID),child,i=0;if(parent){child=parent.children[i++];while(child){if(child.tagName==="SELECT"){element=child;break;}
child=parent.children[i++];}
if(element){for(i=0;i<element.options.length;i++){if(element.options[i].value==response.responseID){element.selectedIndex=i;break;}}}}}
else{element=document.getElementById("rn_"+this.instanceID+"_Response"+guideID+"_"+response.parentQuestionID+"_"+response.responseID);if(question.type===this.data.js.types.TEXT_QUESTION&&element){element.value=RightNow.Interface.getMessage("RESPONSE_PLACEHOLDER_LBL");}}
this.answerQuestion(element,guideID,response.parentQuestionID,response.responseID,level,true);},_answerViewed:function(evt,args){var questionID=args[0].data.questionID,responseID=args[0].data.responseID,guideID=args[0].data.guideID,answerID=args[0].data.answerID;this.recordAnswerViewed(guideID,questionID,responseID,answerID);},addQuestionToChat:function(guideID,questionID){this._eo.data={"guideID":guideID,"questionID":questionID};RightNow.Event.fire("evt_GuideAddQuestionToChat",this._eo);},addResolutionToChat:function(guideID,questionID,responseID){this._eo.data={"guideID":guideID,"questionID":questionID,"responseID":responseID};RightNow.Event.fire("evt_GuideAddResolutionToChat",this._eo);},_buildNextResult:function(response){var result=document.createElement('div'),deadEnd=true;YAHOO.util.Dom.addClass(result,"rn_Result rn_Node");if(!response||!response.type){result.innerHTML="<div class='rn_ResultText'>"+RightNow.Interface.getMessage("NO_ANSWERS_FOUND_MSG")+"</div>";}
else{this._currentResponse=response.responseID;this._saveState(this._currentGuideID,response.parentQuestionID,response.responseID,this._guide[this._currentGuideID].guideSessionID,this.data.js.session);if(response.url){RightNow.ActionCapture.record('guidedAssistance','finish',this._currentGuideID);RightNow.ActionCapture.flush();if(response.urlType===this.data.js.types.URL_GET&&this._samePage()&&this.data.attrs.call_url_new_window){RightNow.Ajax.CT.commitActions();this._callUrl(response);}
else{RightNow.Ajax.CT.commitActions(function(){this._callUrl(response);},this);}
if(this._isAPreviewMode)
this._callUrl(response);if(!this._isConsoleMode||this._isEnduserPreviewMode){return;}}
if(response.type&this.data.js.types.TEXT_RESPONSE){RightNow.ActionCapture.record('guidedAssistance','finish',this._currentGuideID);result.innerHTML+=this._createTextResultHTML(response)+
this._createResolutionChatLink(this._currentGuideID,response.parentQuestionID,response.responseID);YAHOO.util.Dom.addClass(result,"rn_Text");result.id=this._buildID("Result",response.responseID);}
if(response.type&this.data.js.types.ANSWER_RESPONSE){RightNow.ActionCapture.record('guidedAssistance','finish',this._currentGuideID);if(!this._isConsoleMode||this._isEnduserPreviewMode){result.innerHTML+=this._createAnswersHTML(response);YAHOO.util.Dom.addClass(result,"rn_Answers");result.id=this._buildID("Result",response.responseID);}}
if(response.type&this.data.js.types.QUESTION_RESPONSE){result.innerHTML+=this._buildQuestionHTML(this._getQuestionByID(response.childQuestionID))+
this._createQuestionChatLink(this._currentGuideID,response.childQuestionID);YAHOO.util.Dom.addClass(result,"rn_Question");result.id=this._buildID("Question",response.childQuestionID);this._currentQuestion=response.childQuestionID;this._submitStats(RightNow.Ajax.CT.GA_SESSION_DETAILS,{"ga_sid":this._guide[this._currentGuideID].guideSessionID,"ga_id":this._currentGuideID,"q_id":this._currentQuestion},true);deadEnd=false;}
if(response.type&this.data.js.types.GUIDE_RESPONSE&&response.childGuideID){if(result.innerHTML){YAHOO.util.Dom.removeClass(result,"rn_Node");this._appendElement(result);}
RightNow.Ajax.CT.commitActions();this._getGuideByID(response.childGuideID,response.responseID,this._currentQuestion);return;}}
RightNow.Ajax.CT.commitActions();this._appendElement(result);if(this.data.attrs.single_question_display&&deadEnd&&this._currentLevel>2){this._displayRestartButton();}
if(this.data.attrs.single_question_display)
this._focusTopOfGuide();else
this._liveNotificationArea.innerHTML=RightNow.Interface.getMessage("NEW_CONTENT_ADDED_BELOW_MSG");},_focusTopOfGuide:function(){var anchor=document.getElementById("rn_"+this.instanceID+"_SamePageAnchor");if(anchor){anchor.setAttribute("tabindex",-1);try{anchor.focus();}
catch(ex){}}
RightNow.UI.updateVirtualBuffer();this._liveNotificationArea.innerHTML=RightNow.Interface.getMessage("TOP_CONTENT_CONTENT_ADDED_MSG");this._setAriaLoading(false);},_buildQuestionHTML:function(question){var newQuestion="<div class='rn_QuestionText'>"+question.text+"</div>",result,resultClass;switch(question.type){case this.data.js.types.BUTTON_QUESTION:result=this._createButtonHTML(question);resultClass="rn_ButtonQuestion";break;case this.data.js.types.MENU_QUESTION:case this.data.js.types.LIST_QUESTION:result=this._createMenuHTML(question);resultClass=(question.type===this.data.js.types.LIST_QUESTION)?"rn_ListQuestion":"rn_MenuQuestion";break;case this.data.js.types.LINK_QUESTION:result=this._createLinkHTML(question);resultClass="rn_LinkQuestion";break;case this.data.js.types.RADIO_QUESTION:result=this._createRadioHTML(question);resultClass="rn_RadioQuestion";break;case this.data.js.types.IMAGE_QUESTION:result=this._createImageHTML(question);resultClass="rn_ImageQuestion";break;case this.data.js.types.TEXT_QUESTION:result=this._createTextInputHTML(question);resultClass="rn_TextQuestion";break;}
newQuestion+=("<div id='"+this._buildID("Response",question.questionID)+"' class='rn_Response "+resultClass+"'>"+result+"</div>")+
((this._isConsoleMode&&!this._isEnduserPreviewMode&&question.agentText)?"<pre class='rn_AgentText'><em>"+RightNow.Interface.getMessage("AGT_TEXT_LBL")+"</em>"+question.agentText+"</pre>":"");return newQuestion;},_createButtonHTML:function(question){var buttons="",i;for(i=0;i<question.responses.length;i++)
buttons+="<button id='"+this._buildID("Response",question.questionID+"_"+question.responses[i].responseID)+"'"+"' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", "+question.responses[i].responseID+", "+this._currentLevel+", false);"+"'>"+question.responses[i].text+"</button>";return buttons;},_createMenuHTML:function(question){var i,select,onkeydownHandler="",onmousedownHandler="",onchangeHandler="RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", 0, "+this._currentLevel+", false);";if(!this.data.js.mobile){onkeydownHandler="var widgetInstance = RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\");"+"if((event.keyCode === YAHOO.util.KeyListener.KEY.TAB && widgetInstance._changeFired)"+"|| event.keyCode === YAHOO.util.KeyListener.KEY.ENTER){"+"widgetInstance.answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", 0, "+this._currentLevel+", false);"+"}";onmousedownHandler="RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\")._mouseTriggered=true;";onchangeHandler="var widgetInstance = RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\");"+"widgetInstance._changeFired=true;"+"if(widgetInstance._mouseTriggered || (!YAHOO.env.ua.ie && this.size === 0)){"+"widgetInstance._mouseTriggered=false;"+onchangeHandler+"}";}
select="<select title='"+question.taglessText+"' onkeydown='"+onkeydownHandler+"' onmousedown='"+onmousedownHandler+"' onchange='"+onchangeHandler+"'";if(question.type===this.data.js.types.LIST_QUESTION)
select+="size='"+(question.responses.length+1)+"'";select+="><option value=''>--</option>";for(i=0;i<question.responses.length;i++)
select+="<option value='"+question.responses[i].responseID+"'>"+question.responses[i].text+"</option>";select+="</select>";return select;},_createLinkHTML:function(question){var links="<fieldset><legend><span class='rn_ScreenReaderOnly'>"+question.taglessText+"</span></legend>",i,id,name="rn_"+this.instanceID+"_LinkResponse"+question.questionID,inputClass=this.data.js.mobile?"rn_TransparentScreenReaderOnly":"rn_ScreenReaderOnly";for(i=0;i<question.responses.length;i++){id=this._buildID("Response",question.questionID+"_"+question.responses[i].responseID);links+="<div><input tabindex='-1' type='radio' name='"+name+"' id='"+id+"' href='javascript:void(0);' class='"+inputClass+"' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", "+question.responses[i].responseID+", "+this._currentLevel+", false);"+"'/><label for='"+id+"'>"+"<a href='javascript:void(0);' onclick='document.getElementById(\""+id+"\").click(); return false;'>"+question.responses[i].text+"</a></label></div>";}
links+="</fieldset>";return links;},_createRadioHTML:function(question){var radio="<fieldset><legend><span class='rn_ScreenReaderOnly'>"+question.taglessText+"</span></legend>",name="rn_"+this.instanceID+"_RadioResponse"+question.questionID,i,id;for(i=0;i<question.responses.length;i++){id=this._buildID("Response",question.questionID+"_"+question.responses[i].responseID);radio+="<div><input type='radio' name='"+name+"' value='"+question.responses[i].responseID+"' id='"+id+"' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", "+question.responses[i].responseID+", "+this._currentLevel+", false);"+"'/><label for='"+id+"'>"+question.responses[i].text+"</label></div>";}
radio+="</fieldset>";return radio;},_createImageHTML:function(question){var links="<fieldset><legend><span class='rn_ScreenReaderOnly'>"+question.taglessText+"</span></legend>",name="rn_"+this.instanceID+"_ImageResponse"+question.questionID,i,id,altText,spanText;for(i=0;i<question.responses.length;i++){if(question.responses[i].showCaption){altText="";spanText=question.responses[i].text;}
else{altText=question.responses[i].text;spanText="";}
id=this._buildID("Response",question.questionID+"_"+question.responses[i].responseID);links+="<div><label for='"+id+"'><img src='/ci/fattach/get/"+question.responses[i].imageID+"' alt='"+altText+"'/><span class='rn_ImageCaption'>"+"<input type='radio' id='"+id+"' name='"+name+"' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", "+question.responses[i].responseID+", "+this._currentLevel+", false);'/>"+
spanText+"</span></label></div>";}
links+="</fieldset>";return links;},_createTextInputHTML:function(question){var id=this._buildID("Response",question.questionID+"_"+question.responses[0].responseID),input="<label class='rn_Label' for='"+id+"'>"+question.responses[0].text+" <span class='rn_Required' aria-hidden='true'> "+RightNow.Interface.getMessage("FIELD_REQUIRED_MARK_LBL")+" </span><span class='rn_ScreenReaderOnly' aria-hidden='true'>"+RightNow.Interface.getMessage("REQUIRED_LBL")+"</span></label>"+"<input type='text' maxlength='255' aria-required='true' id='"+id+"'/>"+"<button onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").answerQuestion(this, "+this._currentGuideID+", "+question.questionID+", "+question.responses[0].responseID+", "+this._currentLevel+", false);'>"+
this.data.attrs.label_text_response_button+"</button>";return input;},_callUrl:function(response){this._map["session"]=this.data.js.session;var thisWindowClosed=false;if(response.urlType===this.data.js.types.URL_GET){var params="",i,separator=(response.url.indexOf("?")>-1)?"&":"?";for(i in this._map){if(this._map.hasOwnProperty(i)){params+=(separator+encodeURIComponent(i)+"="+encodeURIComponent(this._map[i].value||this._map[i]));if(separator==="?")
separator="&";}}
params=response.url+params;if(!this._samePage()){thisWindowClosed=true;self.opener.location=params;window.close();}
else if((this._isConsoleMode&&!this._isEnduserPreviewMode)||(this.data.attrs.call_url_new_window)){window.open(params);}
else{window.location=params;}}
else if(response.urlType===this.data.js.types.URL_POST){var formToPost=document.createElement("form"),tempNode;formToPost.method="post";formToPost.action=response.url;if(this._isConsoleMode&&!this._isEnduserPreviewMode){formToPost.target="_blank";}
for(i in this._map){if(this._map.hasOwnProperty(i)){tempNode=document.createElement("input");tempNode.type="text";tempNode.name=i;tempNode.value=this._map[i].value||this._map[i];formToPost.appendChild(tempNode);}}
YAHOO.util.Dom.addClass(formToPost,"rn_Hidden");if(!this._samePage()&&!YAHOO.env.ua.ie){thisWindowClosed=true;self.opener.document.body.appendChild(formToPost);window.close();}
else{this._appendElement(formToPost,this._currentGuideID);}
formToPost.submit();}
if(thisWindowClosed){YAHOO.lang.later(1000,this,function(){var sorryUsers=document.createElement("div");sorryUsers.className="rn_Node";sorryUsers.innerHTML=RightNow.Interface.getMessage("PLS_CLOSE_WINDOW_RES_LOADED_ORIG_MSG");this._appendElement(sorryUsers);});}},_createTextResultHTML:function(response){var explanation="<div class='rn_Result rn_ResultText'>";if(this.data.attrs.label_text_result)
explanation+="<div class='rn_ResultHeading'>"+this.data.attrs.label_text_result+"</div>";explanation+=((response.responseText)?response.responseText:"")+"</div>";return explanation;},_createAnswersHTML:function(response){if(response.childAnswers){var i,length,childAnswer,onClick,clickHandlerString,target=this.data.attrs.target,answers="<div class='rn_Result rn_ResultLink'>";if(this.data.attrs.label_answer_result)
answers+="<div class='rn_ResultHeading'>"+this.data.attrs.label_answer_result+"</div>";if(!target&&(this._samePage()||this.data.js.mobile)){target="_blank";}
onClick="RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").recordAnswerViewed("+this._currentGuideID+","+this._currentQuestion+","+response.responseID+", %d, event, this);";for(i=0,length=response.childAnswers.length;i<length;i++){childAnswer=response.childAnswers[i];clickHandlerString=RightNow.Text.sprintf(onClick,childAnswer.id);answers+=((target)?"<a href='"+childAnswer.link+"' onclick='"+clickHandlerString+"' target='"+target+"'>"+childAnswer.summary+"</a>":"<a href='"+childAnswer.link+"' target='_blank' onclick='"+clickHandlerString+" try{ self.opener.location = \""+childAnswer.link+"\"; self.opener.focus(); return false;} catch(err){ }'>"+childAnswer.summary+"</a>");}
answers+="</div>";}
return answers||"";},_createNewGuide:function(guide,parentGuideID){var result=document.createElement("div");result.id=this._buildID("Guide","");YAHOO.util.Dom.addClass(result,"rn_Guide rn_Result");result.innerHTML="<div id='"+this._buildID("Question",guide.questions[0].questionID)+"' class='rn_Question rn_Node'>"+this._buildQuestionHTML(guide.questions[0])+
this._createQuestionChatLink(this._currentGuideID,guide.questions[0].questionID)+"</div>";this._currentQuestion=guide.questions[0].questionID;this._appendElement(result,parentGuideID);if(this.data.attrs.single_question_display)
this._guideAppended=true;},_createQuestionChatLink:function(guideID,questionID){return(this.data.js.isChatAgent)?"<a class='rn_ChatLink' href='javascript:void(0);' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").addQuestionToChat("+guideID+", "+questionID+");'>"+
RightNow.Interface.getMessage("ADD_TO_CHAT_CMD")+"</a>":"";},_createResolutionChatLink:function(guideID,questionID,responseID){return(this.data.js.isChatAgent)?"<a class='rn_ChatLink' href='javascript:void(0);' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").addResolutionToChat("+guideID+", "+questionID+", "+responseID+");'>"+
RightNow.Interface.getMessage("ADD_TO_CHAT_CMD")+"</a>":"";},_displayRestartButton:function(){if(this._restartButton){YAHOO.util.Dom.removeClass(this._restartButton,"rn_Hidden");}
else{var button=document.createElement("button");button.id="rn_"+this.instanceID+"_RestartButton";button.innerHTML=this.data.attrs.label_start_over;button.className="rn_RestartButton";YAHOO.util.Dom.insertAfter(button,"rn_"+this.instanceID+"_BackButton");YAHOO.util.Event.addListener(button,"click",function(){this._setAriaLoading(true);while(this._currentLevel!==1){this._goBack();}
this._setAriaLoading(false);this._focusTopOfGuide();},null,this);this._restartButton=button;}},_removeElements:function(questionID){var currentQuestionID=this._buildID("Question",questionID),questions=YAHOO.util.Dom.getNextSibling(currentQuestionID),guide=document.getElementById('rn_'+this.instanceID+"_Guide"+this._currentGuideID);while(questions){guide.removeChild(questions);questions=YAHOO.util.Dom.getNextSibling(currentQuestionID);}},_appendElement:function(element,parentGuideID){var guideID=(parentGuideID)?parentGuideID:this._currentGuideID,guide=document.getElementById('rn_'+this.instanceID+"_Guide"+guideID),viewRegion=YAHOO.util.Dom.getClientRegion(),newCoords;if(guide){guide.appendChild(element);newCoords=YAHOO.util.Region.getRegion(element);if(!viewRegion.contains(newCoords))
window.scrollTo(newCoords[0]-20,newCoords[1]-100);}},_addPairs:function(question,responseValue,level){for(var name in question.nameValuePairs){if(question.nameValuePairs.hasOwnProperty(name)){this._map[name]={"value":question.nameValuePairs[name],"level":level};}}
if(question.name){if(typeof responseValue!=="undefined"){this._map[question.name]={"value":responseValue,"level":level};}
else if(this._map[question.name]&&this._map[question.name].level===level){delete this._map[question.name];}}},_removePairs:function(){for(var i in this._map){if(this._map.hasOwnProperty(i)&&this._map[i].level>=this._currentLevel){delete this._map[i];}}},_getQuestionByID:function(domNodeID){if(this._guide&&this._guide[this._currentGuideID]&&this._guide[this._currentGuideID].questions){var questions=this._guide[this._currentGuideID].questions;for(var question in questions){if(questions[question].questionID===domNodeID)
return questions[question];}}},_getResponseByID:function(question,responseID){if(question&&question.responses){for(var response in question.responses){if(question.responses[response].responseID===responseID)
return question.responses[response];}}},_getPathToQuestion:function(nodes,questionID){var node,i,found,child;if(nodes.length){node=nodes.shift();if(node.questionID===questionID)return[node];for(i in node.responses){if(node.responses.hasOwnProperty(i)&&node.responses[i].childQuestionID){child=this._getQuestionByID(node.responses[i].childQuestionID);child.parent=node.questionID;nodes.push(child);}}
found=this._getPathToQuestion(nodes,questionID);if(found){return(found[0].parent===node.questionID)?[node].concat(found):found;}}},_getGuideParentResponse:function(questions,guideID){var i,quesLen,j,respLen;for(i=0,quesLen=questions.length;i<quesLen;i++){for(j=0,respLen=questions[i].responses.length;j<respLen;j++){if(questions[i].responses[j].childGuideID===guideID)
return{responseID:questions[i].responses[j].responseID,questionID:questions[i].questionID};}}},_buildID:function(type,id){var suffix=id?("_"+id):"";return"rn_"+this.instanceID+"_"+type+this._currentGuideID+suffix;},_submitStats:function(action,details,queue,callback,scope){if(!this._isAPreviewMode&&!this._restoringState){if(queue){RightNow.Ajax.CT.addAction(action,details);}
else{RightNow.Ajax.CT.submitAction(action,details,callback,scope);}}},recordAnswerViewed:function(guideID,questionID,responseID,answerID,clickEvent,clickedElement){RightNow.ActionCapture.record('guidedAssistanceAnswer','view',guideID);if(clickEvent&&clickedElement&&(!clickedElement.target||clickedElement.target==="_self")){YAHOO.util.Event.stopEvent(clickEvent);var callback=function(){RightNow.Url.navigate(clickedElement.href);};RightNow.ActionCapture.flush();}
this._submitStats(RightNow.Ajax.CT.GA_SESSION_DETAILS,{"ga_sid":this._guide[guideID].guideSessionID,"ga_id":guideID,"q_id":questionID,"r_id":responseID,"a_id":answerID},false,callback);},_highlightResponse:function(chosenResponse,questionType){var cssClass="rn_HighlightResponse";if(questionType===this.data.js.types.LINK_QUESTION){YAHOO.util.Dom.getElementsBy(function(){return true;},"label",chosenResponse.parentNode.parentNode,function(e){YAHOO.util.Dom.removeClass(e,cssClass);});YAHOO.util.Dom.addClass(chosenResponse.parentNode.getElementsByTagName("LABEL"),cssClass);}
else{cssClass+=(this._isConsoleMode)?"":" rn_SelectedButton";YAHOO.util.Dom.getElementsBy(function(){return true;},"button",chosenResponse.parentNode,function(e){YAHOO.util.Dom.removeClass(e,cssClass);});YAHOO.util.Dom.addClass(chosenResponse,cssClass);}},_toggleBackButton:function(show){if(show)
return YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_BackButton","rn_Hidden");else
return YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_BackButton","rn_Hidden");},_toggleQuestion:function(question,show){var questionDomID=this._buildID("Question",((typeof question==="number")?question:question.questionID)),functionToApply=(show)?YAHOO.util.Dom.removeClass:YAHOO.util.Dom.addClass,classToApply="rn_Hidden";if(this.data.js.mobile==="webos"){if(typeof question==="number"){question=this._getQuestionByID(question);}
if(question.type===this.data.js.types.MENU_QUESTION){classToApply="rn_ScreenReaderOnly";}}
return functionToApply(questionDomID,classToApply);},_hideFirstGuideQuestion:function(questionID){YAHOO.util.Dom.addClass(this._buildID("Question",questionID),"rn_Hidden");var sibling=YAHOO.util.Dom.getPreviousSibling(this._buildID("Guide",""));while(sibling){YAHOO.util.Dom.addClass(sibling,"rn_Hidden");sibling=YAHOO.util.Dom.getPreviousSibling(sibling);}},_setAriaLoading:function(loadingOrNot){this._outerGuideDiv=this._outerGuideDiv||document.getElementById("rn_"+this.instanceID);this._outerGuideDiv.setAttribute("aria-busy",((loadingOrNot)?"true":"false"));},_getGuideByID:function(guideID,responseID,questionID){if(this._guide[guideID]){var parentGuideID=this._currentGuideID;this._currentGuideID=guideID;this._createNewGuide(this._guide[guideID],parentGuideID);}
else if(!this._retrievingNewGuide){this._retrievingNewGuide=true;if(this._restoringState){this._restoringNewGuideState=true;}
var eo=new RightNow.Event.EventObject();eo.data={"guideID":guideID,"responseID":responseID,"questionID":questionID,"langID":this.data.js.langID};eo.w_id=this.instanceID;RightNow.Event.fire("evt_GuidedAssistanceRequest",eo);}},_getGuideResponse:function(evt,args){var newGuide=args[0],origEvtObj=args[1],prevGuideID=this._currentGuideID;if(origEvtObj&&origEvtObj.w_id===this.instanceID){newGuide.parentGuide=prevGuideID;this._currentGuideID=newGuide.guideID;this._guide[this._currentGuideID]=newGuide;if(!this._restoringNewGuideState){this._submitStats(RightNow.Ajax.CT.GA_SESSIONS,{"ga_sid":this._guide[this._currentGuideID].guideSessionID,"ga_id":this._currentGuideID,"sid":this.data.js.session,"acct_id":parseInt(this.data.js.accountID,10),"channel":this.data.js.channel},true);}
this._createNewGuide(newGuide,prevGuideID);if(!this._restoringNewGuideState){this._submitStats(RightNow.Ajax.CT.GA_SESSION_DETAILS,{"ga_sid":this._guide[this._currentGuideID].guideSessionID,"ga_id":this._currentGuideID,"q_id":this._currentQuestion});}
else{this._restoringNewGuideState=false;}
this._retrievingNewGuide=false;if(this._guideLoadedCallback){this._guideLoadedCallback.call(this,this._currentGuideID);}
if(this.data.attrs.single_question_display)
this._focusTopOfGuide();else
this._liveNotificationArea.innerHTML=RightNow.Interface.getMessage("NEW_CONTENT_ADDED_BELOW_MSG");}},_restoreState:function(state){if(state&&this._stateKey&&!this._savingState){try{state=RightNow.JSON.parse(RightNow.Text.Encoding.base64Decode(state));if(state.sessionID!==this.data.js.session){return false;}
if((this._currentGuideID!==state.guideID||this._currentResponse!==state.responseID||this._previousQuestions[this._currentLevel-1]!==state.questionID)){this._restoringState=true;this._guide[this._currentGuideID].guideSessionID=state.guideSession;this._goToResponse(this.instanceID,[{data:{guideID:state.guideID,questionID:state.questionID,responseID:state.responseID}}]);this._restoringState=false;}}
catch(e){}}
else if(state===""&&this._currentLevel>1){this._currentResponse=null;this._goToQuestion(this.instanceID,[{data:{guideID:this._originalGuideID,questionID:this._guide[this._originalGuideID].questions[0].questionID}}]);}
return true;},_saveState:function(guideID,questionID,responseID,guideSession,sessionID){if(this._stateKey&&!this._restoringState){this._statesCache=this._statesCache||{};var cacheKey=guideID+":"+questionID+":"+responseID,savedOffState;if(typeof this._statesCache[cacheKey]==="undefined"){savedOffState=RightNow.Text.Encoding.base64Encode(RightNow.JSON.stringify({guideID:guideID,questionID:questionID,responseID:responseID,guideSession:guideSession,sessionID:sessionID}));this._statesCache[cacheKey]=savedOffState;this._savingState=true;YAHOO.util.History.navigate(this._stateKey,savedOffState);this._savingState=false;}}}};