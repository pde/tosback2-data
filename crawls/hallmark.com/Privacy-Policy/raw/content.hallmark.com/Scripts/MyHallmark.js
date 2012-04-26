
var pathUrl=document.location.pathname;var queryParams=document.location.search;var authenticationControlURL='';var PageName='';function InitSignInSignUpLinks(){if(pathUrl.indexOf("/UserLogon/")==-1)
$(".SignInSignUpLink").attr('href',$("#SecureServerURL").val()+"/UserLogon/SignInSignUp?URL="+pathUrl+encodeURIComponent(queryParams));else
$(".SignInSignUpLink").attr('href',$("#SecureServerURL").val()+"/UserLogon/SignInSignUp"+queryParams);}
$(document).click(function(){$('#hmkSignInSection').removeClass('mainNavSelected');$('#hmkSignInWidget').fadeOut('fast');});function InitSecondaryHeaderLinks(){$(".SignInSignUpLink").attr('href',$("#SecureServerURL").val()+"/UserLogon/SignInSignUp?URL="+encodeURIComponent(window.location));}
function LoadSecondaryHeaderControl(){isFBUser();$.ajax
({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/Home/LoadMyHallmarkStatus",data:null,dataType:"html",error:function(e){},success:function(data){if(data!=""){$('#extendedHeaderControl').html(data);InitSignInSignUpLinks();$('.myHallmarkHeader > li#hmkEventsSection').hoverIntent(CalendarConfig);$('.myHallmarkHeader > li#hmkSavedItemsSection').hoverIntent(SavedItemsConfig);$('.myHallmarkHeader > li#hmkSignInSection').hoverIntent(SignInConfig);$('.myHallmarkHeader > li#hmkAccountSection').hoverIntent(AccountConfig);$('.myHallmarkHeader > li#hmkAddressBookSection').hoverIntent(AddressBookConfig);PopulateShoppingBagCount();hallmarkBehaviors.hmkOverlay();$("#SignInOverlay").attr('src',$("#SecureServerURL").val()+"/UserLogon/SignIn"+((pathUrl.indexOf("/UserLogon/")==-1)?"?URL="+pathUrl+encodeURIComponent(queryParams):queryParams));$(".JQSettingsLnk").attr('href',(queryParams.indexOf("?URL=")==-1)?pathUrl+queryParams:queryParams.substr(queryParams.indexOf("?URL=")+5,queryParams.length));SetSelectedNavigation();if(isFacebookUser)
$('.JQFBUser').show();else
$('.JQNonFBUser').show();if($("#IsAdminUser").length>0&&$("#IsAdminUser").val().toLowerCase()=='true')
$('#hmkAdjustEcards').show();if($("#IsCRCAdminUser").length>0&&$("#IsCRCAdminUser").val().toLowerCase()=='true')
$('#hmkDeleteCrownRewards').show();$('#fbLoginAnchor').popupWindow({centerScreen:1,height:800,width:1100,location:1});}}});}
function PopulateShoppingBagCount(){if($("#DisplayShoppingBagCount").val().toLowerCase()=="true"&&$('#shopBagCount').length>0){$('#shopBagCount').html("("+document.getElementById("ShoppingBagCount").value+")");$('#shopBagCount').show();}}
function SetSelectedNavigation(){if($("#SelectedNavigation").length>0){switch($("#SelectedNavigation").val().toLowerCase()){case"events":$("#hmkEventsSection").addClass("mainNavSet");break;case"addressbook":$("#hmkAddressBookSection").addClass("mainNavSet");break;case"account":$("#hmkAccountSection").addClass("mainNavSet");break;case"saveditems":$("#hmkSavedItemsSection").addClass("mainNavSet");break;}}}
var CalendarConfig={sensitivity:1,interval:100,over:CalendarMouseOver,timeout:300,out:CalendarMouseOut};function CalendarMouseOver(){$('#hmkEventsSection').addClass('mainNavSelected');$('#hmkEventsWidget').fadeIn('fast');if(isRegisteredUser){InitAuthenticatedPages();if($('#hmkEventsWidgetActive').length>0){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/MyHallmark/LoadUpcomingEventDetails",data:'',dataType:"html",success:function(data){if(data!=""){$('#hmkEventsWidgetActive').html(data);hallmarkBehaviors.hmkDisableButton('.Source_F');hallmarkBehaviors.hmkDisableButton('.Category_H');}}});}}}
function CalendarMouseOut(){$('#hmkEventsSection').removeClass('mainNavSelected');$('#hmkEventsWidget').fadeOut('fast');}
var SavedItemsConfig={sensitivity:1,interval:100,over:SavedItemsMouseOver,timeout:300,out:SavedItemsMouseOut};function SavedItemsMouseOver(){$('#hmkSavedItemsSection').addClass('mainNavSelected');$('#hmkSavedItemsWidget').fadeIn('fast');if(isRegisteredUser){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/MyHallmark/LoadSavedItems",data:'',dataType:"html",success:function(data){if(data!=""){$('#hmkSavedItemsWidgetActive').html(data);if(parseInt($("#SavedItemsCount").val(),10)>0){$('.JQSavedItems').show();$('.JQNoSavedItems').hide();$('#hmkSavedItemsContainer').attr('class','myHallmarkNavLight2');}
else{$('.JQSavedItems').hide();$('.JQNoSavedItems').show();$('#hmkSavedItemsContainer').attr('class','myHallmarkNavLight');}}}});}}
function SavedItemsMouseOut(){$('#hmkSavedItemsSection').removeClass('mainNavSelected');$('#hmkSavedItemsWidget').fadeOut('fast');}
var SignInConfig={sensitivity:1,interval:100,over:SignInMouseOver,timeout:300,out:SignInMouseOut};function SignInMouseOver(){PostOmnitureData('My Hallmark - Sign in Hover');$('#hmkSignInSection').addClass('mainNavSelected');$('#hmkSignInWidget').fadeIn('fast');}
function SignInMouseOut(e){var iframe=document.getElementById('SignInOverlay');if(iframe.contentWindow.postMessage){iframe.contentWindow.postMessage("Post Message To Listener","*");}
if(checkMouseLeave(e,$('#hmkSignInWidget'))){$('#hmkSignInSection').removeClass('mainNavSelected');$('#hmkSignInWidget').fadeOut('fast');}}
var checkMouseLeave=function(e,jqObj){var mX=e.pageX;var mY=e.pageY;var containerX=jqObj.offset().left;var containerY=jqObj.offset().top;var containerW=jqObj.width();var containerH=jqObj.height();if((mX<containerX||mX>containerX+containerW)||(mY<containerY||mY>containerY+containerH)){return true;}
else{return false;}}
var AccountConfig={sensitivity:1,interval:100,over:AccountMouseOver,timeout:300,out:AccountMouseOut};function AccountMouseOver(){$('#hmkAccountSection').addClass('mainNavSelected');$('#hmkAccountWidget').fadeIn('fast');if(isRegisteredUser){InitAuthenticatedPages();if($('#hmkAccountWidgetActive').length>0){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/MyHallmark/LoadCRCInformation",data:'',dataType:"html",success:function(data){if(data!=""){$('#hmkAccountWidgetActive').html(data);}}});}}}
function AccountMouseOut(){$('#hmkAccountSection').removeClass('mainNavSelected');$('#hmkAccountWidget').fadeOut('fast');}
var AddressBookConfig={sensitivity:1,interval:100,over:AddressBookMouseOver,timeout:300,out:AddressBookMouseOut};function AddressBookMouseOver(){$('#hmkAddressBookSection').addClass('mainNavSelected');$('#hmkAddrBookWidget').fadeIn('fast');if(isRegisteredUser){InitAuthenticatedPages();if($('#hmkAddrBookWidgetActive').length>0){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/MyHallmark/LoadConnectionRequestDetails",data:'',dataType:"html",success:function(data){if(data!=""){$('#hmkAddrBookWidgetActive').html(data);hallmarkBehaviors.hmkOverlay();}}});}}}
function AddressBookMouseOut(){$('#hmkAddressBookSection').removeClass('mainNavSelected');$('#hmkAddrBookWidget').fadeOut('fast');}
function thirdPartyMyHMKover(){LoadThirdPartyMyHMKWidget();}
function closewindow(){$('#ThirdPartyLoginError').find('div.close').trigger('click');}
function InitThirdPartySecondaryHeaderControl(){InitSignInSignUpLinks();}
function InitThirdPartySecondaryHeader(){InitSecondaryHeaderLinks();$('.myHallmarkHeader > li#hmkEventsSection').hoverIntent(thirdPartyCalendarConfig);$('.myHallmarkHeader > li#hmkSavedItemsSection').hoverIntent(thirdPartySavedItemsConfig);$('.myHallmarkHeader > li#hmkAccountSection').hoverIntent(thirdPartyAccountConfig);$('.myHallmarkHeader > li#hmkAddressBookSection').hoverIntent(thirdPartyAddressBookConfig);$(".JQSettingsLnk").hide();}
var thirdPartyCalendarConfig={sensitivity:1,interval:100,over:thirdPartyCalendarMouseOver,timeout:300,out:CalendarMouseOut};function thirdPartyCalendarMouseOver(){$('#hmkEventsSection').addClass('mainNavSelected');$('#hmkEventsWidget').fadeIn('fast');if($('#hmkEventsWidgetActive').length>0){LoadThirdPartyEventsWidget();}}
var thirdPartySavedItemsConfig={sensitivity:1,interval:100,over:thirdPartySavedItemsMouseOver,timeout:300,out:SavedItemsMouseOut};function thirdPartySavedItemsMouseOver(){$('#hmkSavedItemsSection').addClass('mainNavSelected');$('#hmkSavedItemsWidget').fadeIn('fast');if($('#hmkSavedItemsWidgetActive').length>0){LoadThirdPartySavedItemsWidget();}}
var thirdPartyAccountConfig={sensitivity:1,interval:100,over:thirdPartyAccountMouseOver,timeout:300,out:AccountMouseOut};function thirdPartyAccountMouseOver(){$('#hmkAccountSection').addClass('mainNavSelected');$('#hmkAccountWidget').fadeIn('fast');if($('#hmkAccountWidgetActive').length>0){LoadThirdPartyAccountWidget();}}
var thirdPartyAddressBookConfig={sensitivity:1,interval:100,over:thirdPartyAddressBookMouseOver,timeout:300,out:AddressBookMouseOut};function thirdPartyAddressBookMouseOver(){$('#hmkAddressBookSection').addClass('mainNavSelected');$('#hmkAddrBookWidget').fadeIn('fast');if($('#hmkAddrBookWidgetActive').length>0){LoadThirdPartyAddrBookWidget();}}
function DisplaySettingsOverlay(){$("#ShowSettings").overlay({api:true,speed:200,expose:{maskId:'overlyMask',loadSpeed:800,opacity:0.9},onBeforeLoad:function(){var wrap=this.getContent().find("div.wrap");if(wrap.is(":empty")){wrap.load(this.getTrigger().attr("href"));}},onClose:function(){$("#ShowSettings.wrap").empty();window.location.reload();},closeOnClick:false}).load();$(".close").click(function(){document.getElementById("Settings").style.display="none";$("#ShowSettings").overlay().close();window.location.reload();});}
function LoadSettings(settingsType){setTimeout(function(){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/Profile/LoadSettings",data:"",dataType:"html",error:function(e){},success:function(data){if(data!=""){$('#Settings').html(data);document.getElementById("Settings").style.display='block';DisplaySettingsOverlay();settingsNav.initSettingsOverlay(settingsType);}}});},500);}
function InitRegisteredUserDashboard(){if($("#IsSubscribedUser").val().toLowerCase()=='true')
$('.JQSubscribedOnly').show();else
$('.JQNoSubscribed').show();if($("#IsCRMember").val().toLowerCase()=='true')
$(".JQCRMember").show();else{$(".JQNoCRMember").show();hallmarkBehaviors.hmkDisableButton('#lnkCheckMyPoints');}
if($("#IsPendingConnectionRequest").val().toLowerCase()=='true')
$(".JQPendingConnRequest").show();else
$(".JQNoPendingConnRequest").show();$('.ecard').each(function(){hallmarkBehaviors.hmkDisableButton($(this));});adSpot.GetAdHTML($('#MyHallmarkPromoSpot'),'MyHallmarkHome','MyHallmark','ecardSubscriptionPromoSpot');}
function InitGuestUserDashboard(){if(isFacebookUser){$('.JQFBUser').show();if(parseInt($("#EventDates\\.RecordCount").val())>0)
$('.JQEvents').show();else
$('.JQNoEvents').show();}
else
$('.JQNonFBUser').show();}
function InitNavigation(){if($("#IsAdminUser").val().toLowerCase()=='true')
$('#hmkAdjustEcards').show();if($("#IsCRCAdminUser").val().toLowerCase()=='true')
$('#hmkDeleteCrownRewards').show();if($("#IsCRCMember").val().toLowerCase()=='true')
$('.JQCRCMemberOnly').show();else{hallmarkBehaviors.hmkDisableButton('#linkhmkCheckMyPoints');$('.JQNoCRCMember').show();}
if(PageName!='')
$('#'+PageName).addClass('currentMyHmkNav');if(isRegisteredUser){$('.JQAuthentication').addClass('authenticationRequired');InitAuthenticatedPages();hallmarkBehaviors.hmkOverlay();}}
function LoadUpcomingEvents(){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/MyHallmark/LoadUpcomingEvents",dataType:"html",error:function(e){},success:function(data){if(data!=""){$("#HallmarkReminders").html(data);hallmarkBehaviors.hmkDisableButton('.Source_F');hallmarkBehaviors.hmkDisableButton('.Category_H');InitSignInSignUpLinks();if(!isFacebookUser)
$(".JQFBLogin").show();if(!isRegisteredUser)
$(".JQHmkSignIn").show();}
else{$("#HallmarkReminders").hide();$("#eventsComingUp").show();}}});}
function LoadRecommendations(selector){if(isRegisteredUser){$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/Recommendations/LoadUpcomingEvents",dataType:"html",error:function(e){},success:function(data){if(data!=""){$("#"+selector).html(data);for(var i=1;i<=4;i++){$(".JQRecommendation_"+i).show();}
$("ul.tabType").tabs("div.panes > div");$(".JQEvent_1").trigger('click');}
else
adSpot.GetAdHTML($("#"+selector),'ProductRecommendations','PRODUCTRECOMMENDATIONS','staticRecommendations');}});}
else
adSpot.GetAdHTML($("#"+selector),'ProductRecommendations','PRODUCTRECOMMENDATIONS','staticRecommendations');}
function GetStaticRecommendations(objID,componentName){if($("#"+objID).html()=="")
adSpot.GetAdHTML($("#"+objID),'ProductRecommendations','PRODUCTRECOMMENDATIONS',componentName);}