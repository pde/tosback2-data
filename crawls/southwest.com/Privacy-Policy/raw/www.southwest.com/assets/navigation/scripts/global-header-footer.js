var defaultTextGlobalNav={globalnav_header_utility_search_input:"Search Southwest"};
$(document).ready(function(){var a=$("#globalnav_footer_site_links_morelinks_toggle");
a.css({display:"inline-block"});
var g=$("#globalnav_footer_site_links_container").height();
$(".globalnav_footer_site_links").css({height:g});
var b=$("#globalnav_footer_container");
b.css({height:b.height()});
if(typeof globalNavLoadFooterExpanded=="undefined"){$("#globalnav_footer_site_links_container").css({height:40});
a.removeClass("globalnav_footer_site_links_morelinks_toggle_open").addClass("globalnav_footer_site_links_morelinks_toggle globalnav_footer_site_links_morelinks_toggle_closed")
}for(var f in defaultTextGlobalNav){var d=$("#"+f);
d.focus(function(){if($(this).hasClass("show_defaulttext")){$(this).val("");
$(this).removeClass("show_defaulttext")
}});
d.blur(function(){if($(this).val()==""){$(this).addClass("show_defaulttext");
$(this).val(defaultTextGlobalNav[$(this).attr("id")])
}});
if($(d).val()==""||$(d).val()==defaultTextGlobalNav[f]){d.addClass("show_defaulttext");
d.val(defaultTextGlobalNav[f])
}}$("#globalnav_footer_site_links_morelinks_toggle").click(function(){var h=$(this);
if(h.hasClass("globalnav_footer_site_links_morelinks_toggle_open")&&!h.hasClass("globalnav_footer_site_links_morelinks_toggle_inprogress")){h.removeClass("globalnav_footer_site_links_morelinks_toggle_open").addClass("globalnav_footer_site_links_morelinks_toggle_closed globalnav_footer_site_links_morelinks_toggle_inprogress");
e(40)
}else{if(h.hasClass("globalnav_footer_site_links_morelinks_toggle_closed")){h.removeClass("globalnav_footer_site_links_morelinks_toggle_closed").addClass("globalnav_footer_site_links_morelinks_toggle_open globalnav_footer_site_links_morelinks_toggle_inprogress");
e(g)
}}return false
});
function e(h){$("#globalnav_footer_site_links_container").animate({height:h},function(){$("#globalnav_footer_site_links_morelinks_toggle").removeClass("globalnav_footer_site_links_morelinks_toggle_inprogress")
})
}$("#globalnav_header_primary .globalnav_header_primary_link").hover(function(){var h=this;
$(this).addClass("globalnav_header_subnav_ishovered");
setTimeout(function(){if($(h).hasClass("globalnav_header_subnav_ishovered")){showSubNav(h)
}},500)
},function(){$(this).removeClass("globalnav_header_subnav_ishovered");
hideSubNav(this)
});
$("#globalnav_header_utility_travel_tools").click(function(){toggleTravelTools(this);
return false
});
$(document).click(function(){$("#globalnav_header_utility_travel_tools_hover_container").remove();
repositionHoverBackdropIframe("hidden",0,0,0,0)
});
if($.browser.msie&&parseInt($.browser.version,10)==6){$(document.body).append('<iframe src="/assets/navigation/blank.html" scrolling="no" width="0" height="0" frameborder="0" id="globalnav_header_hover_backdrop_iframe"></iframe>')
}$(document.body).append("<div id='globalnav_preload_container'></div>");
var c=$("#globalnav_preload_container");
c.addClass("globalnav_preload_container_primary_nav_hover");
c.hide()
});
function toggleTravelTools(g){var e=$(g);
var f=e.parent();
var c=f.find(".globalnav_header_utility_travel_tools_container");
var b=$("#globalnav_header_utility_travel_tools_hover_container");
if(b.size()==0){var a="<div id='globalnav_header_utility_travel_tools_hover_container'>";
a+="<div id='globalnav_header_utility_travel_tools_hover_top_background_container'>&nbsp;</div>";
a+="<div id='globalnav_header_utility_travel_tools_hover_inner_container'>";
a+=c.html();
a+="</div>";
a+="<div id='globalnav_header_utility_travel_tools_hover_close_container'>";
a+="<span id='globalnav_header_utility_travel_tools_hover_close_button'><a href='#'><span class='closeImg'></span><span>Close</span></a></span>";
a+="</div>";
a+="</div>";
$(document.body).append(a);
b=$("#globalnav_header_utility_travel_tools_hover_container");
var d=e.offset();
b.click(function(j){j.stopPropagation()
});
var i=d.top+e.height();
var h=d.left+e.width()-b.width();
b.css({top:i,left:h});
repositionHoverBackdropIframe("visible",i,h,b.width(),b.height());
$("#globalnav_header_utility_travel_tools_hover_close_button").click(function(){closeTravelTools();
return false
})
}else{closeTravelTools()
}return false
}function closeTravelTools(){$("#globalnav_header_utility_travel_tools_hover_container").remove();
repositionHoverBackdropIframe("hidden",0,0,0,0)
}function showSubNav(k){var e=$(k);
var i=e;
var n=e.attr("id");
var h=e.parent();
var b=h.find(".globalnav_header_subnav_container");
var l="black";
if(h.hasClass("globalnav_header_primary_product")){l="blue";
i=$("#globalnav_header_primary_link_air")
}var c="globalnav_header_subnav_hover_container_"+l;
var j=$("#"+n+"_hover_container");
if(j.size()==0&&b.size()>0){var m="<div id='"+n+"_hover_container' class='globalnav_header_subnav_hover_container "+c+"'>";
m+="<table border=0 cellspacing=0 cellpadding=0 class='globalnav_header_subnav_hover_container_layout_table'>";
m+="<tr>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_tl globalnav_header_subnav_hover_container_layout_table_corner'>&nbsp;</td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_top'><span class='globalnav_header_subnav_hover_container_layout_table_arrow'></span></td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_tr globalnav_header_subnav_hover_container_layout_table_corner'>&nbsp;</td>";
m+="</tr>";
m+="<tr>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_left'>&nbsp;</td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_center'>"+b.html()+"</td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_right'>&nbsp;</td>";
m+="</tr>";
m+="<tr>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_bl globalnav_header_subnav_hover_container_layout_table_corner'>&nbsp;</td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_bottom'>&nbsp;</td>";
m+="<td class='globalnav_header_subnav_hover_container_layout_table_br globalnav_header_subnav_hover_container_layout_table_corner'>&nbsp;</td>";
m+="</tr>";
m+="</table>";
m+="</div>";
$(document.body).append(m);
var f="#"+n+"_hover_container";
j=$(f);
hyperLinkFilterHookTrigger(f);
if($.browser.msie&&$.browser.version<7){j.find(".globalnav_header_subnav_hover_container_layout_table_corner").addClass("globalnav_header_subnav_hover_container_layout_table_corner_ie6");
j.find(".globalnav_header_subnav_hover_container_layout_table_arrow").addClass("globalnav_header_subnav_hover_container_layout_table_arrow_ie6")
}var d=i.offset();
var g=d.top+i.height()-10;
var a=d.left+5;
if(h.hasClass("globalnav_header_primary_product")){g=d.top+i.height()-5;
a=d.left
}j.css({top:g,left:a});
repositionHoverBackdropIframe("visible",g+10,a,j.width(),j.height()-20);
j.hover(function(){var o=e;
$(this).addClass("globalnav_header_subnav_ishovered")
},function(){var o=e;
$(this).removeClass("globalnav_header_subnav_ishovered");
setTimeout(function(){checkRemoveSubNav(k)
},10)
})
}}function hideSubNav(a){setTimeout(function(){checkRemoveSubNav(a)
},10)
}function checkRemoveSubNav(a){var b=$(a);
var c=$("#"+b.attr("id")+"_hover_container");
if(!b.hasClass("globalnav_header_subnav_ishovered")&&!c.hasClass("globalnav_header_subnav_ishovered")){c.remove();
repositionHoverBackdropIframe("hidden",0,0,0,0)
}}function repositionHoverBackdropIframe(b,f,e,c,a){var d=$("#globalnav_header_hover_backdrop_iframe");
if(d.size()>0){d.css({visibility:b,top:f,left:e,width:c,height:a})
}}function globalNavAppendAndGo(b){var c=$(b);
if(typeof globalHeaderFooterSessionInformation!=="undefined"&&!c.hasClass("globalHeaderFooterSessionInformationAppended")){c.addClass("globalHeaderFooterSessionInformationAppended");
var e=globalHeaderFooterSessionInformation;
var d="";
if(typeof globalHeaderFooterSessionInformationCarProtocol!="undefined"&&c.attr("id")=="globalnav_header_primary_link_car"){d=globalHeaderFooterSessionInformationCarProtocol
}if(typeof globalHeaderFooterSessionInformationHotelProtocol!="undefined"&&c.attr("id")=="globalnav_header_primary_link_hotel"){d=globalHeaderFooterSessionInformationHotelProtocol
}while(e.indexOf("?")>-1){e=e.substring(e.indexOf("?")+1)
}while(e.indexOf("&amp;")>-1){e=e.replace("&amp;","&")
}var a=c.attr("href");
if(a.indexOf("?")==-1){c.attr("href",d+a+"?"+e)
}else{if(a.indexOf("?")+1==a.length){c.attr("href",d+a+e)
}else{c.attr("href",d+a+"&"+e)
}}}return true
}var hyperLinkFilterHookTrigger=function(a){if(typeof setHyperLinkFilter=="function"){setHyperLinkFilter(a)
}};