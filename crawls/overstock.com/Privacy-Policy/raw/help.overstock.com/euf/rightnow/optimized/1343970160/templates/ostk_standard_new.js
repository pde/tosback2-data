
RightNow.Widget.SearchButton2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;YAHOO.util.Event.addListener("rn_"+this.instanceID,"click",this._startSearch,null,this);};RightNow.Widget.SearchButton2.prototype={_startSearch:function(evt)
{if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=YAHOO.util.Dom.getAncestorByTagName("rn_"+this.instanceID,"FORM");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.filters={report_id:this.data.attrs.report_id,reportPage:this.data.attrs.report_page_url,target:this.data.attrs.target};RightNow.Event.fire("evt_searchRequest",eo);}};
function LeftNav(dat)
{var data=dat;this.init=function()
{}}
function LeftNavMenu(dat)
{var data=dat;var w_id=data.info.w_id
var data_attrs=data.attrs;LeftNavMenuAttrs=data_attrs;this.init=function()
{}}
RightNow.Widget.ProactiveChat2=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._confirmDialog=null;this._eo=new RightNow.Event.EventObject();this._searchDone;this._secondsDone;this._profileDone;this._waiting;this._answerDone;if(!this._cookiesEnabled())
return;this._eo.w_id=this.instanceID;this._eo.data.wait_threshold=this.data.attrs.wait_threshold;this._eo.data.min_agents_avail=this.data.attrs.min_agents_avail;this._eo.data.interface_id=this.data.js.interface_id;this._eo.data.contact_email=this.data.js.contact_email;this._eo.data.contact_fname=this.data.js.contact_fname;this._eo.data.contact_lname=this.data.js.contact_lname;this._eo.data.prod=this.data.js.prod;this._eo.data.cat=this.data.js.cat;this._eo.data.c_id=this.data.js.c_id;this._eo.data.org_id=this.data.js.org_id;this._eo.data.test=this.data.attrs.test;if(document.getElementById('rn_'+this.instanceID+'_ProactiveChatBox')){var cookie=YAHOO.util.Cookie.get("noChat");if(this.data.attrs.test=='true')
cookie=false;if((!cookie&&(this.data.js.searches_to_do||this.data.js.profile_to_do||this.data.js.seconds_to_do))||this.data.attrs.test){RightNow.Event.subscribe("evt_chatQueueResponse",this._onQueueReceived,this);RightNow.Event.subscribe("evt_menuFilterGetResponse",this._onProdCatChanged,this);if(this.data.js.searches_to_do){if(this.data.js.searches>=this.data.attrs.searches){this._searchDone=true;}
else{this._searchDone=false;RightNow.Event.subscribe("evt_searchInProgressRequest",this._onSearchCountChanged,this);}}
else{this._searchDone=true;}
if(this.data.js.profile_to_do){if(this.data.js.profile){this._profileDone=true;}
else{this._profileDone=false;}}
else{this._profileDone=true;}
if(this.data.js.seconds_to_do){this._secondsDone=false;setTimeout("RightNow.Widget.getWidgetInstance('"+this.instanceID+"').onSeconds()",this.data.attrs.seconds*1000);}
else{this._secondsDone=true;}
if(this.data.js.answer_list){this._answerDone=false;answerList=new String(this.data.js.answer_list);answerArray=answerList.split(",");for(i=0;i<answerArray.length;i++){if(answerArray[i]==this.data.js.a_id){this._answerDone=true;}}}
else{this._answerDone=false;}
this._checkDoneStatus();}}};RightNow.Widget.ProactiveChat2.prototype={_publishStats:function(statAction){RightNow.Ajax.CT.submitAction(RightNow.Ajax.CT.WIDGET_STATS,statAction);},_checkDoneStatus:function()
{if(this._searchDone||this._secondsDone||this._answerDone)
{this._waiting=true;if(this.data.attrs.test=='true')
{this._onQueueReceived(null,new Array(""));}
else
{RightNow.Event.fire("evt_chatQueueRequest",this._eo);}}},_onSearchCountChanged:function(type,args)
{this.data.js.searches++;if(this.data.js.searches>=this.data.attrs.searches)
{RightNow.Event.unsubscribe("evt_searchInProgressRequest",this._onSearchCountChanged);this._searchDone=true;this._checkDoneStatus();}},onSeconds:function()
{this._secondsDone=true;this._checkDoneStatus();},_onQueueReceived:function(type,args)
{if(this._waiting)
{var result=args[0];if(!result)
{result={q_id:1,stats:{availableSessionCount:this.data.attrs.min_agents_avail,expectedWaitSeconds:this.data.attrs.wait_threshold}};}
this._waiting=false;if((result.q_id>0&&result.stats.availableSessionCount>=this.data.attrs.min_agents_avail&&result.stats.expectedWaitSeconds<=this.data.attrs.wait_threshold))
{this._publishStats({w:this.data.js.dqaWidgetType.toString(),offers:1});var handleYes=function()
{var pageUrl=this.data.attrs.chat_login_page;pageUrl=RightNow.Url.addParameter(pageUrl,'pac',this.data.js.pac);if(result.survey_data)
{if(result.survey_data.send_id)
{pageUrl=RightNow.Url.addParameter(pageUrl,'survey_send_id',result.survey_data.send_id);pageUrl=RightNow.Url.addParameter(pageUrl,'survey_send_delay',result.survey_data.send_delay);}
if(result.survey_data.comp_id&&result.survey_data.comp_id!=0)
pageUrl=RightNow.Url.addParameter(pageUrl,'survey_comp_id',result.survey_data.comp_id);if(result.survey_data.term_id&&result.survey_data.term_id!=0)
pageUrl=RightNow.Url.addParameter(pageUrl,'survey_term_id',result.survey_data.term_id);}
this._confirmDialog.hide();this._publishStats({w:this.data.js.dqaWidgetType.toString(),accepts:1});var chatWindowName=this.data.js.chatWindowName||'chatnew';window.open(pageUrl,chatWindowName,'width=496,height=460,scrollbars=0');};var handleNo=function()
{this._confirmDialog.hide();this._publishStats({w:this.data.js.dqaWidgetType.toString(),rejects:1});};var buttons=[{text:RightNow.Interface.getMessage("YES_LBL"),handler:{fn:handleYes,scope:this}},{text:RightNow.Interface.getMessage("NO_LBL"),handler:{fn:handleNo,scope:this},isDefault:true}];if(!this._confirmDialog){this._confirmDialog=RightNow.UI.Dialog.actionDialog(RightNow.Interface.getMessage("INFORMATION_LBL"),document.createTextNode(this.data.attrs.label_chat_question),{"buttons":buttons,"width":'250px'});YAHOO.util.Dom.addClass(this._confirmDialog.id,'rn_dialog');RightNow.UI.Dialog.addDialogEnterKeyListener(this._confirmDialog,handleYes,this);}
YAHOO.util.Cookie.set("noChat","RNTLIVE",{path:"/"});this._confirmDialog.show();}}},_cookiesEnabled:function()
{YAHOO.util.Cookie.set("COOKIE_TEST","RNT",{path:"/"});var cookieExists=(YAHOO.util.Cookie.get("COOKIE_TEST")!==null)?true:false;YAHOO.util.Cookie.remove("COOKIE_TEST",{path:"/"});return cookieExists;},_onProdCatChanged:function(type,args)
{var prodCatType=args[0].data.data_type;var value=args[0].data.value;if(prodCatType.indexOf("categories")>-1)
this._eo.data.cat=value;else
this._eo.data.prod=value;}};
RightNow.Widget.KeywordText2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._textElement=document.getElementById("rn_"+this.instanceID+"_Text");if(this.data.js.initialValue)
this.data.js.initialValue=this.data.js.initialValue.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&#039;/g,"'").replace(/&quot;/g,'"');if(this._textElement)
{this._searchedOn=this._textElement.value;if(this._textElement.value!==this.data.js.initialValue)
this._textElement.value=this.data.js.initialValue;this._setFilter();YAHOO.util.Event.addListener(this._textElement,"change",this._onChange,null,this);RightNow.Event.subscribe("evt_keywordChangedResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_getFiltersRequest",this._onGetFiltersRequest,this);RightNow.Event.subscribe("evt_resetFilterRequest",this._onResetRequest,this);if(this.data.attrs.initial_focus)
this._textElement.focus();}};RightNow.Widget.KeywordText2.prototype={_onChange:function(evt)
{this._eo.data=this._textElement.value;this._eo.filters.data=this._textElement.value;RightNow.Event.fire("evt_keywordChangedRequest",this._eo);},_onGetFiltersRequest:function(type,args)
{this._eo.filters.data=YAHOO.lang.trim(this._textElement.value);this._searchedOn=this._eo.filters.data;RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"searchName":this.data.js.searchName,"data":this.data.js.initialValue,"rnSearchType":this.data.js.rnSearchType,"report_id":this.data.attrs.report_id};},_onChangedResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id))
{var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id),newValue=(data===null)?this.data.js.initialValue:data;if(this._textElement.value!==newValue)
this._textElement.value=newValue;}},_onResetRequest:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id)&&(args[0].data.name===this.data.js.searchName||args[0].data.name==="all"))
{this._textElement.value=this._searchedOn;}}};