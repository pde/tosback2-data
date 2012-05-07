var errorspanid=-1;var labspanid='';var evt_ff_custom_validate_request=new YAHOO.util.CustomEvent("evt_ff_custom_validate_request");evt_ff_custom_validate_request.subscribe(ff_custom_validate_request);var ps_evt_search_request=RightNow.Event.create("ps_evt_search_request");function ff_custom_validate_request(type,event_obj)
{var tmp=0;tmp=RNT.Widgets.toGo;--RNT.Widgets.toValidate;if(document.getElementById('rdaccount').checked)
{if(tmp!=7&&tmp!=5&&tmp!=3&&tmp!=10&&tmp!=9&&tmp!=8&&tmp!=4)
{if(event_obj[0].form==RNT.Widgets.form)
{RNT.Widgets.FormFields.push(event_obj[0].data);if(RNT.Widgets.FormFields.length==10)
{RNT.Widgets.toValidate=0;}}
if(RNT.Widgets.toValidate==0)
{evt_form_validated.fire();if(!RNT.Widgets.chatSubmit)
onSendFormcustom();}}}
if(document.getElementById('ship').checked)
{if(tmp!=3&&tmp!=6&&tmp!=5&&tmp!=2&&tmp!=4&&tmp!=8&&tmp!=9)
{if(event_obj[0].form==RNT.Widgets.form)
{RNT.Widgets.FormFields.push(event_obj[0].data);if(RNT.Widgets.FormFields.length==10)
{RNT.Widgets.toValidate=0;}}
if(RNT.Widgets.toValidate==0)
{evt_form_validated.fire();if(!RNT.Widgets.chatSubmit)
onSendFormcustom();}}}
if(document.getElementById('prod').checked)
{if(tmp!=2&&tmp!=4&&tmp!=3&&tmp!=5&&tmp!=6&&tmp!=7&&tmp!=12)
{if(event_obj[0].form==RNT.Widgets.form)
{RNT.Widgets.FormFields.push(event_obj[0].data);if(RNT.Widgets.FormFields.length==10)
{RNT.Widgets.toValidate=0;}}
if(RNT.Widgets.toValidate==0)
{evt_form_validated.fire();if(!RNT.Widgets.chatSubmit)
onSendFormcustom();}}}
if(document.getElementById('retu').checked)
{if(tmp!=2&&tmp!=6&&tmp!=4&&tmp!=7&&tmp!=8&&tmp!=9)
{if(event_obj[0].form==RNT.Widgets.form)
{RNT.Widgets.FormFields.push(event_obj[0].data);if(RNT.Widgets.FormFields.length==11)
{RNT.Widgets.toValidate=0;}}
if(RNT.Widgets.toValidate==0)
{evt_form_validated.fire();if(!RNT.Widgets.chatSubmit)
onSendFormcustom();}}}
if(document.getElementById('othe').checked)
{if(tmp!=2&&tmp!=6&&tmp!=5&&tmp!=3&&tmp!=7&&tmp!=8&&tmp!=9)
{if(event_obj[0].form==RNT.Widgets.form)
{RNT.Widgets.FormFields.push(event_obj[0].data);if(RNT.Widgets.FormFields.length==10)
{RNT.Widgets.toValidate=0;}}
if(RNT.Widgets.toValidate==0)
{evt_form_validated.fire();if(!RNT.Widgets.chatSubmit)
onSendFormcustom();}}}}
function onSendFormcustom()
{var formFields=RNT.Widgets.FormFields.toJSONString();formFields=encodeURIComponent(formFields);var postData="a_id="+RNT.Widgets.a_id+"&i_id="+RNT.Widgets.i_id+"&smrt_asst="+RNT.Widgets.smrt_asst+"&f_tok="+RNT.Widgets.f_tok+"&form="+formFields;RNT.Events.ajaxRequest(postData,"/ci/ajaxCustom/sendForm","formFieldSendSuccesss","genericAjaxFailures");RNT.Widgets.smrt_asst=false;}
function formFieldSendSuccesss(o)
{if(o.responseText!==undefined)
{evt_form_button_submit_update.fire(o.responseText);}}
function genericAjaxFailures(o)
{if(o.responseText!==undefined)
if(o.responseText==(new String("CleanseError")))
{RNT.goToUrl("/app/error/error_id/6");}
else
{alert("Ajax request failure:"+o.responseText);}}