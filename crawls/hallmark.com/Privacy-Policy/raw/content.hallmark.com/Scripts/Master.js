
var isRegisteredUser=false;var isFacebookUser=false;var callBackFbLoginFn="";var callBackFbLogoutFn="";isRegistered();isFBUser();$(document).ready(function(){if(isRegisteredUser){$('.JQmembersOnly').removeClass('hide');}
LoadSecondaryHeaderControl();});function isRegistered(){var cookieValue=hallmarkBehaviors.hmkReadCookie("UserInformation");if(cookieValue==null){isRegisteredUser=false;}
else{isRegisteredUser=(cookieValue.indexOf('UserType=R')!=-1)?true:false;}
if(isRegisteredUser){$('.JQmembersOnly').removeClass('hide');}}
function isFBUser(){var cookieValue=hallmarkBehaviors.hmkReadCookie("ThirdPartyAccessTokens");if(cookieValue==null){isFacebookUser=false;}
else{isFacebookUser=cookieValue.indexOf('FACEBOOK')!=-1?true:false;}}
$(document).ready(function(){hmkZipFieldBehavior();});function hmkZipFieldBehavior(){$('.country').change(function(){if($(this).val()!='USA'){$(this).closest('form').find('.zip').attr('maxlength',7).removeClass('numeric').unbind('paste').unbind('keypress');}
else{$(this).closest('form').find('.zip').val('').attr('maxlength',5).addClass('numeric');hallmarkBehaviors.hmkNumericValidator();}});$('.country').each(function(){if($(this).val()!='USA')
$(this).closest('form').find('.zip').attr('maxlength',7).removeClass('numeric').unbind('paste').unbind('keypress');else{$(this).closest('form').find('.zip').attr('maxlength',5).addClass('numeric');hallmarkBehaviors.hmkNumericValidator();}});}
function scrollToElement(id){$('html, body').animate({scrollTop:$('#'+id).offset().top},100);}
function FBLogin(redirectUrl,scope,isCallBackFnRequired){var isSuccess=false;var fbUrl='';var error='';if(redirectUrl=="")
redirectUrl=document.location.pathname+document.location.search;s.eVar8="FacebookConnect";s.prop4="FacebookConnect";evalOmniture();$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/ThirdPartyAuthorization/FacebookLogin",async:false,dataType:"json",data:{redirectURL:"",scope:scope},error:function(e){},success:function(data){isSuccess=true;fbUrl=data.AuthorizationURL;error=data.ErrorMessage;}});if(isSuccess){if(null==error||""==error){if(fbUrl!=""){$('#fbLoginAnchor').attr('href',fbUrl);$('#fbLoginAnchor').trigger('click');if((typeof isCallBackFnRequired=="undefined"||isCallBackFnRequired==false)){callBackFbLoginFn='';}}
else if(!(typeof isCallBackFnRequired=="undefined"||isCallBackFnRequired==false)){GetOwners('facebook','','ALBUM');}
else{window.location=document.location.protocol+"//"+document.location.hostname+(document.location.port!=""?":"+document.location.port:"")+redirectUrl;}}
else{validateThirdPartyLogin(error);}}}
function YahooLogin(isFBUser,redirectUrl,scope,isCallBackFnRequired){var isSuccess=false;var fbUrl='';var error='';if(redirectUrl=="")
redirectUrl=document.location.pathname+document.location.search;$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/ThirdPartyAuthorization/YahooLogin",async:false,dataType:"json",data:{redirectURL:redirectUrl,scope:scope},error:function(e){},success:function(data){isSuccess=true;fbUrl=data.AuthorizationURL;error=data.ErrorMessage;}});if(isSuccess){if(null==error||""==error){if(fbUrl!=""){$('#fbLoginAnchor').attr('href',fbUrl);$('#fbLoginAnchor').trigger('click');}
else{window.location=document.location.protocol+"//"+document.location.hostname+(document.location.port!=""?":"+document.location.port:"")+redirectUrl;}}
else{validateThirdPartyLogin(error);}}}
function GoogleLogin(isFBUser,redirectUrl,scope,isCallBackFnRequired){var isSuccess=false;var fbUrl='';var error='';if(redirectUrl=="")
redirectUrl=document.location.pathname+document.location.search;$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/ThirdPartyAuthorization/GoogleLogin",async:false,dataType:"json",data:{redirectURL:redirectUrl,scope:scope},error:function(e){},success:function(data){isSuccess=true;fbUrl=data.AuthorizationURL;error=data.ErrorMessage;}});if(isSuccess){if(null==error||""==error){if(fbUrl!=""){$('#fbLoginAnchor').attr('href',fbUrl);$('#fbLoginAnchor').trigger('click');}
else{window.location=document.location.protocol+"//"+document.location.hostname+(document.location.port!=""?":"+document.location.port:"")+redirectUrl;}}
else{validateThirdPartyLogin(error);}}}
function validateThirdPartyLogin(error){$('#thirdPartyLoginErrorContent').html(error);hallmarkBehaviors.hmkOverlay();$('#triggerErrorDiv').trigger('click');}
function fnFBLogout(){$.post("/ThirdPartyAuthorization/Logout",{ServiceProvider:"facebook",RedirectURL:"",Code:""},function(data){if(null!=data&&''!=data){validateThirdPartyLogin(data);}
else{if(null!=window.location.search&&window.location.search.length>0){var queryString=window.location.search;var stringparam='ContinueWithoutMerge=Y';var index=queryString.indexOf('ContinueWithoutMerge')
if(index!=-1){if(index==1){queryString='?'+queryString.substring(stringparam.length+2,queryString.length);}
else if(index>1){queryString=queryString.substring(0,index)+queryString.substring(stringparam.length+1,queryString.length);}}
window.location.href=document.location.protocol+"//"+document.location.hostname+(document.location.port!=""?":"+document.location.port:"")+document.location.pathname+queryString;}
else if(''!=callBackFbLogoutFn&&!(typeof callBackFbLogoutFn=="undefined")){callBackFbLogoutFn();}
else{window.location.reload();}}});}