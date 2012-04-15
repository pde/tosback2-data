(function(){var k=CQ_Analytics.UpxDataMgr,g=CQ_Analytics.ClickstreamcloudMgr,l=utils.parseStringToObj,c=String.prototype.trim,j="#StudentAccessNav a.unContainer",d=/^\s+/,h=/\s+$/;
function f(){var m,n="UserSessionInfo";
$("body").bind("refresh",function(){m=utils.getCookie(n);
a(j,m)
});
$(j).bind("click.header",function(o){o.preventDefault();
$("#StudentAccessNav span.userProfileNav").parent().toggleClass("menu-open");
$("#StudentAccessNav ul.userProfileNavOverlay").toggleClass("hide")
})
}function a(m,o){var n='<span id="menu-arrow"></span>';
$(m).html(o+n)
}function e(m){a(j,m);
$("#StudentAccessNav span.userProfileNav").removeClass("hide");
$("#StudentAccessNav a.sign-out").click(function(n){n.preventDefault();
k.clear();
utils.deleteCookie("profile");
utils.deleteCookie("UserSessionInfo");
k.removeProperty("loggedIn");
$("#StudentAccessNav form.logout-form input").val("http://"+location.host+"/?responseStatus=");
$("#StudentAccessNav form.logout-form").submit()
});
$("#StudentAccessNav a.headerVisitingStudent").text("Prep Center").attr("href","/experience/prep-center.html")
}function b(){var m=utils.getCookie("loggedIn"),n,p=[0,5,3,1],o;
if(m!=="true"){utils.createCookie("loggedIn","true");
utils.checkProfileService(function(){o=ProfileService.profile;
n=parseInt(o.experienceLoginCounter,10);
if(!isNaN(n)&&isFinite(n)){n=n+1
}else{n=1;
if($("#lbContentFirstWelcome").length){ctaLightbox.launchLightbox()
}if(typeof cmCreateConversionEventTag==="function"){cmCreateConversionEventTag("First Login",2,"EXP: Phoenix Prep",10,o.id)
}}if(typeof cmCreateConversionEventTag==="function"){cmCreateConversionEventTag("Login",2,"EXP: Phoenix Prep",n-1<4?p[n-1]:p[3],o.id)
}o.experienceLoginCounter=n;
ProfileService.update()
})
}}(function i(){var p="UserSessionInfo",q="visiting student",n=utils.getCookie(p)||q,r,m,o;
utils.isAuthenticated(function(s){if(s){if(n===q){if(location.protocol==="https:"){utils.checkProfileService(function(){o=ProfileService.profile;
r=o.firstName;
m=o.lastName;
if(!!r&&r.replace(d,"").replace(h,"")&&!!m&&m.replace(d,"").replace(h,"")){n=r+" "+m;
n=decodeURIComponent(n).replace(/\++/g,"");
utils.createCookie(p,n,"")
}e(n)
})
}else{e(n)
}}else{e(n)
}g.areStoresLoaded===true?b():g.addListener("storesloaded",b,false)
}});
f()
}())
}());