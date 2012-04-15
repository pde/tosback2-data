var UPX_socialLinks=function(){var a={subject:"Interesting item on University of Phoenix website",body:"I thought you'd be interested in this item from University of Phoenix:\r\n\r\n"};
return{init:function(){a.pageURL=window.location.href;
UPX_socialLinks.bindMouseEvents()
},bindMouseEvents:function(){$(document).on("mouseenter.UPX_socialLinks","ul.socialLinks li.share",function(){$(this).find("ul").removeClass(COMMON_globalConstants.hide)
});
$(document).on("mouseleave.UPX_socialLinks","ul.socialLinks li.share",function(){$(this).find("ul").addClass(COMMON_globalConstants.hide)
});
$(document).on("click.UPX_socialLinks","ul.socialLinks li.share a",function(b){var b=b||window.event;
b.preventDefault()
});
$(document).on("click.UPX_socialLinks","ul.socialLinks li.share ul li a",function(b){var b=b||window.event;
b.preventDefault();
window.open($(this).attr("href"),"socialLink")
});
$(document).on("click.UPX_socialLinks","ul.socialLinks li.print a",function(b){var b=b||window.event;
b.preventDefault();
window.print()
});
$(document).on("click.UPX_socialLinks","ul.socialLinks li.email a",function(b){var b=b||window.event;
b.preventDefault();
UPX_socialLinks.emailPage()
})
},emailPage:function(){window.location="mailto:?subject="+escape(a.subject)+"&body="+escape(a.body+a.pageURL)
}}
}();