if(null==$.cookie("JSESSIONID")){$.cookie("JSESSIONID","aaaaaaaaaaaaa",{expires:null,path:"/",domain:window.location.host,secure:true})
}$(document).ready(function(){SWA.loggedIn=false;
SWA.RightNavigation.addHeaderClickHandlers();
SWA.RightNavigation.addSubsectionToggleHandlers();
var a=(navigator.cookieEnabled)?true:false;
if(typeof navigator.cookieEnabled=="undefined"&&!a){document.cookie="testcookie";
a=(document.cookie.indexOf("testcookie")!=-1)?true:false
}SWA.RightNavigation.getAccountBarCookieData();
SWA.RightNavigation.getDiscCookieData();
SWA.RightNavigation.populateAccountBarData();
$("#accountPassword").bind("keypress",function(b){if(b.which==13){$("#loginForm").submit()
}});
if(a==false){$("#loginFormContainer").hide()
}else{$("#loginFormContainer").show()
}$("#right_column_account_login_form_field_rr_help_link").click(function(b){showHelpUserdPopup($(this));
b.stopPropagation();
return false
});
$("#accountPassword").watermark("Password (Case Sensitive)",{className:"form_optional"});
$("#accountNumber").watermark("Account Number or Username",{className:"form_optional"});
$(document).click(function(b){if(!pointerWithinObject(b,"popup_help_box")){closeHelpPopup()
}})
});
function showLoggedInSection(){if(!SWA.userData){return
}if(SWA.userData.accountName.length>10){$(".global_account_bar_login_form_name").addClass("small")
}$(".global_account_bar_login_form_name").text(SWA.userData.accountName+"!");
if(SWA.userData.loyalty){showLoyaltyLoggedInSection()
}else{showCoreLoggedInSection()
}$(".loggedInOnly").show();
$(".notLoggedInOnly").hide()
}function showLoyaltyLoggedInSection(){$(".global_account_bar_login_rr_number").text("R.R. # "+SWA.userData.rrAccountNumber);
var a=$(".account-bar-last-activity");
if(SWA.userData.lastActivity==""||SWA.userData.lastActivity==null){a.hide()
}else{a.find(".global-account-bar-login-last-activity").text("Last Activity: "+SWA.userData.lastActivity+" ");
a.show()
}modifyLoggedInDom("logout",'<a href="/account/snapshot" title="My Account">My Account</a>',"Hello,");
$("body").addClass("loggedInToRR")
}function showCoreLoggedInSection(){$(".account-bar-last-activity").hide();
modifyLoggedInDom("logout",'<a href="/account/snapshot" title="My Account">My Account</a>',"Hi,")
}function modifyLoggedInDom(a,c,b){$("#static_account_bar_logout_form").replaceWith($("#static_account_bar_logout_form").html().replace("logout_var_to_replace",a));
$("#static_account_bar_account_link").html(c);
$(".global_account_bar_login_form_salutation").text(b)
}function showNotLoggedInSection(){$(".loggedInOnly").hide();
$(".notLoggedInOnly").show();
if(SWA.userData!=null&&SWA.userData.loyalty){showLoyaltyNotLoggedInSection()
}else{showCoreNotLoggedInSection()
}}function showLoyaltyNotLoggedInSection(){modifyNotLoggedInDom("login?loginEntryPoint=RIGHT_NAV","account/recovery");
$("#loyaltyEnrollNow").show();
$("#global_account_bar_login_form_form").hide()
}function showCoreNotLoggedInSection(){modifyNotLoggedInDom("login.html","account/recovery");
$("#loyaltyEnrollNow").hide();
$("#global_account_bar_login_form_form").show()
}function modifyNotLoggedInDom(b,a){$("#static_account_bar_login_form").replaceWith($("#static_account_bar_login_form").html().replace("login_var_to_replace",b));
$("#static_account_bar_forgot_link").replaceWith($("#static_account_bar_forgot_link").html().replace("forgot_var_to_replace",a))
}SWA.RightNavigation={handleNoWCMMessage:function(){},populateAccountBarData:function(){if(SWA.SessionData!=null){$(".discInput").val(SWA.SessionData.disc);
var a="?forceNewSession=yes&ss=0&disc="+SWA.SessionData.disc;
$(".swa_util_sessionDataLink").each(function(){if($(this).hasClass("swa_util_sessionDataLink_dataAdded")==false){$(this).attr("href",$(this).attr("href")+a);
$(this).addClass("swa_util_sessionDataLink_dataAdded")
}})
}if(SWA.loggedIn){showLoggedInSection()
}else{showNotLoggedInSection()
}},getAccountBarCookieData:function(){SWA.AccountBarCookie={};
var a=$.cookie("AccountBarCookie");
if(a==null||a.length<3){return false
}SWA.AccountBarCookie.value=SWA.cookieEncoding.decode(a);
if(SWA.AccountBarCookie.value!=null&&SWA.AccountBarCookie.value!=""){SWA.userData=JSON.parse(SWA.AccountBarCookie.value);
if(SWA.userData!=null&&SWA.userData.accountName!=null&&SWA.userData.accountName!=""){SWA.loggedIn=true
}else{if(SWA.userData!=null&&SWA.userData.loginError!=null&&SWA.userData.loginError!=""){SWA.RightNavigation.showLoginError(SWA.userData.loginError);
$.cookie("AccountBarCookie",null,{path:"/",domain:window.location.host,secure:false});
return false
}else{return false
}}}},getDiscCookieData:function(){SWA.DiscCookie={};
SWA.DiscCookie.value=$.cookie("DiscCookie");
SWA.SessionData={};
if(SWA.DiscCookie.value!=null){SWA.SessionData.disc=SWA.DiscCookie.value.replace("disc=","")
}else{return false
}return true
},addSubsectionToggleHandlers:function(){$("#global_account_bar .my_cart_section_header").click(function(){var a=$(this).find(".my_cart_section_header_toggle");
if(a.hasClass("my_cart_section_header_toggle_closed")){a.removeClass("my_cart_section_header_toggle_closed").addClass("my_cart_section_header_toggle_open");
$(this).parents(".my_cart_product_container").find(".my_cart_section_content_collapsed_view").hide();
$(this).parents(".my_cart_product_container").find(".my_cart_section_content_expanded_view").show()
}else{a.removeClass("my_cart_section_header_toggle_open").addClass("my_cart_section_header_toggle_closed");
$(this).parents(".my_cart_product_container").find(".my_cart_section_content_collapsed_view").show();
$(this).parents(".my_cart_product_container").find(".my_cart_section_content_expanded_view").hide()
}}).find(".my_cart_section_header_buttons").bind("click",function(b){var a=jQuery.browser;
if(a.msie){window.event.cancelBubble=true
}else{b.stopPropagation()
}})
},addHeaderClickHandlers:function(){$("#global_account_bar .global_account_bar_header").click(function(){var a=$(this).find(".global_account_bar_header_toggle");
if(a.hasClass("global_account_bar_header_toggle_closed")){a.removeClass("global_account_bar_header_toggle_closed").addClass("global_account_bar_header_toggle_open");
$(this).removeClass("global_account_bar_header_inactive").addClass("global_account_bar_header_active").next(".global_account_bar_outer_container").children(".global_account_bar_content").show()
}else{a.removeClass("global_account_bar_header_toggle_open").addClass("global_account_bar_header_toggle_closed");
$(this).removeClass("global_account_bar_header_active").addClass("global_account_bar_header_inactive").next(".global_account_bar_outer_container").children(".global_account_bar_content").hide()
}})
},showLoginError:function(a){$("#loginForm").prepend('<div class="global_account_bar_login_form_full">	<p class="loginError">'+a+"</p></div>");
$("#accountNumber, #global_account_bar_login_form_password_fake input").addClass("fieldError")
}};
SWA.cookieEncoding={decode:function(a){var c="";
var b=0;
if(a.charAt(b)=='"'){b++
}for(;
b+2<a.length;
b++){var d=a.substring(b,b+3);
c+=String.fromCharCode(d-13);
b+=2
}return c
}};
function showHelpUserdPopup(a){showHelpPopup(a,"Need help logging in?",'<strong>Forgot your Rapid Rewards Number?</strong><br />If you already have a Rapid Rewards or Account number, you may use the following link to look it up.<br/><br/><a href="/rapidrewards/rr-lookup.html">Lookup Rapid Rewards Account #</a><br/><br/><strong>Looking for your AirTran A+ Account?</strong><br/>AirTran A+ Accounts cannot be used on southwest.com.',"down","popup_help_box_forgot_rr",0.5)
}function showHelpPopup(c,f,d,g,i,h){var e=$("#popup_help_box");
var b=$("#popup_help_box_pointer");
e.removeClass();
e.addClass(i+" popup_help_box");
e.find(".popup_help_box_header_left").html(f);
e.find(".popup_help_box_content_container").html(d);
e.find(".popup_help_box_header_right DIV").click(function(){closeHelpPopup();
return false
});
b.removeClass();
b.addClass("popup_help_box_pointer_"+g+" popup_help_box_pointer");
var a=$(c).offset();
if(g=="down"){e.css({top:a.top-e.outerHeight()-b.outerHeight()+3,left:a.left-e.outerWidth()*h,display:"block"});
b.css({top:a.top-b.outerHeight(),left:a.left+$(c).outerWidth()/2-b.outerWidth()/2,display:"block"})
}else{if(g=="up"){e.css({top:a.top+$(c).outerHeight()+b.outerHeight()-3,left:a.left-e.outerWidth()*h,display:"block"});
b.css({top:a.top+$(c).outerHeight(),left:a.left+$(c).outerWidth()/2-b.outerWidth()/2,display:"block"})
}}}function closeHelpPopup(){var b=$("#popup_help_box");
var a=$("#popup_help_box_pointer");
b.css({display:"none"});
a.css({display:"none"});
a.removeClass();
a.addClass("popup_help_box_pointer")
}function pointerWithinObject(a,b){var d=$("#"+b);
var c=a.pageX;
var e=a.pageY;
var f=parseInt(d.css("left"));
var g=parseInt(d.css("top"));
var i=d.outerHeight();
var h=d.outerWidth();
return(between(c,f,f+h)&&between(e,g,g+i))
};