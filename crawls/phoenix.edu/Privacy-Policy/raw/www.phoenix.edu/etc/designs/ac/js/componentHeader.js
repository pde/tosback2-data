(function(){var g=UPX.dataMgr,k=utils.parseStringToObj,c=String.prototype.trim,j="div.StudentAccessNav a.unContainer",d=/^\s+/,h=/\s+$/;
function f(){var l,m="UserSessionInfo";
$(j).each(function(){$(this).bind("click.header",function(o){var n;
o.preventDefault();
n=$(o.currentTarget).closest("div.StudentAccessNav");
if(g.authenticated){n.find("span.userProfileNav").parent().toggleClass("menu-open");
n.find("ul.userProfileNavOverlay").toggleClass("hide")
}})
})
}function a(l,m){if(g.authenticated){$(l).html(m+'<span id="menu-arrow"></span>')
}else{$(l).html(m)
}}function e(m){var l=$("div.StudentAccessNav");
a(j,m);
l.each(function(){var n=$(this);
n.find("span.userProfileNav").removeClass("hide");
n.find("a.sign-out").click(function(p){var o=n.find("form.logout-form");
p.preventDefault();
g.set("essentials",{loggedIn:"false",user:""});
utils.deleteCookie("profile");
o.find("input").val("http://"+location.host+"/?responseStatus=");
o.submit()
});
n.find("a.headerVisitingStudent").text("Prep Center").prop("href","/experience/prep-center.html")
})
}function b(){var l=g.get("essentials","loggedIn"),m,n=[0,5,3,1];
if(l!=="true"){g.set("essentials","loggedIn","true");
m=parseInt(g.get("profile","experienceLoginCounter"),10);
if(!isNaN(m)&&isFinite(m)){m=m+1
}else{m=1;
if($("#lbContentFirstWelcome").length){ctaLightbox.launchLightbox()
}if(typeof cmCreateConversionEventTag==="function"){cmCreateConversionEventTag("First Login",2,"EXP: Phoenix Prep",10,g.get("profile","id"))
}}if(typeof cmCreateConversionEventTag==="function"){cmCreateConversionEventTag("Login",2,"EXP: Phoenix Prep",m-1<4?n[m-1]:n[3],g.get("profile","id"))
}g.set("profile","experienceLoginCounter",m)
}}(function i(){var m,p,l,n,o="visiting student";
g.ready(function(){var r,s,q;
if(g.authenticated){r=g.get("profile",["firstName","lastName"]);
s=r.firstName;
q=r.lastName;
if(!!s&&s.replace(d,"").replace(h,"")&&!!q&&q.replace(d,"").replace(h,"")){m=s+" "+q;
m=decodeURIComponent(m).replace(/\++/g,"");
g.set("essentials","user",m)
}else{m=g.get("user")||o
}e(m);
b()
}else{m=g.get("user");
if(m&&m!==o){e(m)
}}f()
})
}())
}());