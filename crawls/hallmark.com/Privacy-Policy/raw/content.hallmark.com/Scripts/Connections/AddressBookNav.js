
var baseErrorPage="";var action="";var IsAddOrEditGroups="";var IsSavedFromPopUp="";var selectedTabName="";function AddIndividualsHouseholdsGroupsPopup(){var selectionCriteria="";var addressBookType="";$("#AddNewInfo").html('Add new information to your address book.');if($("#AddressBookType").val()=="POD"){if($("#SelectRecipientsView").val()=="Contacts"){selectedTabName="IndividualTab";}
else if($("#SelectRecipientsView").val()=="Households"){selectedTabName="HouseholdTab";}
else{selectedTabName="IndividualTab";}}
else if($('div .secondLevel .selected').attr('id')){selectedTabName=$('div .secondLevel .selected').attr('id');}
if(typeof $("#SelectionCriteria")!='undefined'&&$('#SelectionCriteria').length>0)
selectionCriteria=$('#SelectionCriteria').val().toUpperCase();else{selectionCriteria="NOE";selectedTabName="IndividualTab";}
if(typeof $("#AddressBookType")!='undefined'&&$("#AddressBookType").length>0)
addressBookType=$("#AddressBookType").val();else
addressBookType="GAB";var params='selectedTabName='+selectedTabName+'&SelectionCriteria='+selectionCriteria+"&AddressBookType="+addressBookType;clearAllErrorMessages();$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/ConnectionsAddressBook/RenderAddNewPopUp",data:params,dataType:"html",error:function(e){},success:function(data){if(data!=""){$('#EditGroupsSection').html('');$('#AddEditContact').hide();$('#AddEditContact').html(data);SetCloseAddOverlay('ShowAddEditContact','AddEditContact');InitAddPopup();$("#notesDiv").addClass('hide');$('#showOnCalendar1Div').removeClass('hide');$('#showOnCalendar2Div').removeClass('hide');$('#AddEditContact').show();InitAddPopupRadioTabs();if($("#AddressBookType").val().toUpperCase()=="POD"||$("#AddressBookType").val().toUpperCase()=="MAB"){$("#groupsDiv").hide();}
if($("#AddressBookType").val().toUpperCase()=="MAB"&&$("#SelectionCriteria").val().toUpperCase()=="NAE"){$("#radioDiv").hide();}}}});}
function CloseAddOverlay(){clearAllErrorMessages();errorPage=baseErrorPage;initializeErrorHandling();$('#AddEditContact').html('');IsSavedFromPopUp="";$(".EditContactHeader").show();$(".JQInPage").show();}
function InitAddPopupRadioTabs(){$('#individualFormRadio').click(function(){$(this).closest('form').closest('div').find('#individualContactForm').css('display','block');$(this).closest('form').closest('div').find('#householdContactForm').css('display','none');$(this).closest('form').closest('div').find('#groupContactForm').css('display','none').find('#frmAddEditGroups').hide();});$('#householdFormRadio').click(function(){$(this).closest('form').closest('div').find('#individualContactForm').css('display','none');$(this).closest('form').closest('div').find('#householdContactForm').css('display','block');$(this).closest('form').closest('div').find('#groupContactForm').css('display','none').find('#frmAddEditGroups').hide();});$('#groupFormRadio').click(function(){$(this).closest('form').closest('div').find('#householdContactForm').css('display','none');$(this).closest('form').closest('div').find('#individualContactForm').css('display','none');$(this).closest('form').closest('div').find('#groupContactForm').css('display','block').find('#frmAddEditGroups').show();});}
function InitHouseholdSection(){$('#individualContactForm').css('display','none');$('#frmAddEditGroups').css('display','none');$('#householdContactForm').css('display','block');$('#groupContactForm').css('display','none');$('#householdFormRadio').attr('checked',true);ResetAddEditForm('householdFormRadio');}
function InitIndividualsSection(){$('#individualFormRadio').attr('checked',true);$('#individualContactForm').css('display','block');$('#householdContactForm').css('display','none');$('#frmAddEditGroups').css('display','none');ResetAddEditForm('individualFormRadio');}
function InitGroupsSection(){$('#individualContactForm').css('display','none');$('#householdContactForm').css('display','none');$('#frmAddEditGroups').css('display','block');$('#groupFormRadio').attr('checked',true);ResetAddEditForm('groupFormRadio');IsAddOrEditGroups="AddGroups";}
function InitAddPopup(){if($('div.secondLevel').find('.selected').hasClass('secHead_Households')||$("#SelectRecipientsView").val()=="Households"||selectedTabName=="HouseholdTab"){InitHouseholdSection();}
else if($('div.secondLevel').find('.selected').hasClass('secHead_Individuals')||$('div.secondLevel').find('.selected').hasClass('secHead_AtAGlance')||$("#SelectRecipientsView").val()=="Contacts"||$("#SelectRecipientsView").val()=="Groups"||selectedTabName=="IndividualTab"){InitIndividualsSection();}
else if($('div.secondLevel').find('.selected').hasClass('secHead_Groups')){InitGroupsSection();}
else{InitIndividualsSection();}
hallmarkBehaviors.hmkCustomFormFields();hmkZipFieldBehavior();hallmarkBehaviors.hmkTooltip();extendedBehaviors.hmkFormFocus();extendedBehaviors.hmkEnterKeyFormSubmit();extendedBehaviors.PhoneTabOut();if($('#SelectionCriteria').val().toUpperCase()=='NAA'){$(".AddressSpan").show();$(".JQAddressRequired").addClass('JQRequiredField');}
else if($('#SelectionCriteria').val().toUpperCase()=='NAE'){$(".EmailSpan").show();$(".JQEmailRequired").addClass('JQRequiredField');}
else if($('#SelectionCriteria').val().toUpperCase()=='NOE'){$(".GenderSpan").show();$(".RelationSpan").show();}
$(".JQSaveAndAdd").show();$(".AddContactHeader").show();$(".EditContactHeader").hide();$(".JQInPage").hide();$(".EditGroupHeader").hide();GetTextBoxPhone();GetTextBoxMobile();extendedBehaviors.PhoneTabOut();}
function ResetAddEditForm(formID){var selectedBasePage='';if(selectedTabName=="IndividualTab")
selectedBasePage='individuals';else if(selectedTabName=="AtAGlanceTab")
selectedBasePage='AtAGlance';else if(selectedTabName=="HouseholdTab")
selectedBasePage='household';else if(selectedTabName=="GroupTab")
selectedBasePage='group';extendedBehaviors.hmkFormFocus();extendedBehaviors.hmkEnterKeyFormSubmit();if(formID=="individualFormRadio"){errorPage="AddContacts";$(':input','#frmAddEditHousehold').not(':button, :submit, :hidden').val('');$(':input','#frmAddEditGroups').not(':button, :submit, :hidden').val('');SetOmnitureDataForPopUp(selectedBasePage,'add new-contact');}
else if(formID=="groupFormRadio"){errorPage="AddEditGroups";$(':input','#frmAddEditHousehold').not(':button, :submit, :hidden').val('');$(':input','#frmAddEditContact').not(':button, :submit, :hidden').val('');SetOmnitureDataForPopUp(selectedBasePage,'add new-group');}
else{errorPage="AddHouseholds";$(':input','#frmAddEditContact').not(':button, :submit, :hidden').val('');$(':input','#frmAddEditGroups').not(':button, :submit, :hidden').val('');$('#frmAddEditContact').find('#Anniv').val('');$('#frmAddEditContact').find('input[name=AnnivMonth]').val('');$('#frmAddEditContact').find('input[name=AnnivDay]').val('');$('#frmAddEditContact').find('input[name=AnnivMonth]').val('');$('#frmAddEditContact').find('input[name=AnnivYear]').val('');$('#frmAddEditContact').find('#Birth').val('');$('#frmAddEditContact').find('input[name=BirthMonth]').val('');$('#frmAddEditContact').find('input[name=BirthDay]').val('');$('#frmAddEditContact').find('input[name=BirthYear]').val('');viewName='household';SetOmnitureDataForPopUp(selectedBasePage,'add new-household');}
clearAllErrorMessages();}
function SetCloseAddOverlay(relDiv,contentDiv){$('#'+contentDiv).find('.close').click(function(){$('#'+relDiv).find('div.close').trigger('click');});$(".EditContactHeader").show();$(".JQInPage").show();}
function GetTextBoxPhone(){var phonecountrycode='';if(!($('.DayPhoneCountryCode').val()=="undefined")){phonecountrycode=$('.DayPhoneCountryCode').val();}
else{phonecountrycode=$('#DayPhoneCountryCode').val();}
var dayphone=($("#DayPhone").val());if(phonecountrycode=='USA'){$('#USABOX').show();if(dayphone!=""){$("#DayPhone1").val(dayphone.substr(0,3));$("#DayPhone2").val(dayphone.substr(3,3));$("#DayPhone3").val(dayphone.substr(6,4));}
$('#OTHERBOX').hide();$("#DayPhone").val('');}
else{$('#OTHERBOX').show();if(dayphone==""){dayphone=$("#DayPhone1").val()+$("#DayPhone2").val()+$("#DayPhone3").val();$("#DayPhone").val(dayphone);}
$('#USABOX').hide();$("#DayPhone1").val('');$("#DayPhone2").val('');$("#DayPhone3").val('');}}
function GetTextBoxMobile(){var mobilecountrycode='';if(!($('.MobilePhoneCountryCode').val()=="undefined")){mobilecountrycode=$('.MobilePhoneCountryCode').val();}
else{mobilecountrycode=$('#MobilePhoneCountryCode').val();}
var mobilephone=$('#MobilePhone').val();if(mobilecountrycode=='USA'){$('#USATEXTBOX').show();if(mobilephone!=""){$("#MobilePhone1").val(mobilephone.substr(0,3));$("#MobilePhone2").val(mobilephone.substr(3,3));$("#MobilePhone3").val(mobilephone.substr(6,4));}
$('#OTHERTEXTBOX').hide();$('#MobilePhone').val('');}
else{$('#OTHERTEXTBOX').show();if(mobilephone==""){mobilephone=$("#MobilePhone1").val()+$("#MobilePhone2").val()+$("#MobilePhone3").val();$("#MobilePhone").val(mobilephone);}
$('#USATEXTBOX').hide();$("#MobilePhone1").val('');$("#MobilePhone2").val('');$("#MobilePhone3").val('');}}
function Save(obj){if($('#householdFormRadio').attr('checked')){AddHouseHold();}
else if($('#groupFormRadio').attr('checked')){AddEditGroups(obj);}
else if($('#individualFormRadio').attr('checked')||action=="EditContact"){SaveContact($(obj).closest('form').attr('id'));}}
function SetOmnitureDataForPopUp(pageName,popUpName){s.pageName="My Hallmark > Contacts>"+pageName+"> "+popUpName;s.prop1="My Hallmark";s.prop2="My Hallmark >Contacts";s.prop3="My Hallmark > Contacts>"+pageName+"> "+popUpName;s.prop30="My Hallmark > Contacts>"+pageName;s.prop32="My Hallmark > Contacts>"+pageName+"> "+popUpName;s.eVar32=s.prop3;if(popUpName=='update address request'||popUpName=='new address request'){s.events="event 47,event 48";}
else{s.events="";}
s.products='';evalOmniture();}
function SetOmnitureDateForSelectRecipients(){s.pageName="My Hallmark > Contacts>select recipients";s.prop1="My Hallmark";s.prop2="My Hallmark >Contacts";s.prop3="My Hallmark > Contacts>select recipients";s.prop30="My Hallmark > Contacts>select recipients";s.prop32="My Hallmark > Contacts>select recipients";s.eVar32=s.prop3;evalOmniture();}