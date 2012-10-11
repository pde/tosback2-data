
$(document).ready(function(){var page_url=window.location.toString();function showMainSubNav(showHide)
{if(showHide===undefined)
{var showHide=true;}
if(page_url.indexOf('/television/')>=0)
{(showHide)?$('#nav_television').find("span").show():$('#nav_television').find("span").hide();}
if(page_url.indexOf('/internet/')>=0)
{(showHide)?$('#nav_internet').find("span").show():$('#nav_internet').find("span").hide();}
if(page_url.indexOf('/telephone/')>=0)
{(showHide)?$('#nav_telephone').find("span").show():$('#nav_telephone').find("span").hide();}
if(page_url.indexOf('/security/')>=0)
{(showHide)?$('#nav_security').find("span").show():$('#nav_security').find("span").hide();}}
showMainSubNav();$("ul#topnav li").hover(function(){showMainSubNav(false);$(this).css({'background':'none'});$(this).find("span").show();},function(){$(this).css({'background':'none'});$(this).find("span").hide();showMainSubNav();});});