var SWA=typeof(SWA)==="undefined"?{}:SWA;
SWA.sitemap=SWA.sitemap||{};
SWA.sitemap.model={get:function(c,f){var d=Array.prototype.slice.call(arguments,2),e="_get"+c,b=this,a;
if(this[e]&&typeof this[e]==="function"){if(this.state==="success"){f(b[e].apply(b,d))
}else{$(this).bind("dataReady",function(){f(b[e].apply(b,d))
});
this._loadXML()
}}},_getRawResponse:function(){return this.response
},_getChildrenForURL:function(a){return this._getChildrenForNode(this._getNodeForURL(a))
},_getChildrenForNode:function(b){var a=[],c=this;
return $.map($(b).children("section"),function(e,d){return c._parseNode(e)
})
},_getNodeForURL:function(a){return $(this.response).find("[url="+a+"]")
},_parseNode:function(a){return{url:$(a).attr("url"),text:$(a).attr("name"),active:($(a).attr("active")=="active"),current:($(a).attr("current")=="current"),alternateUrls:this._parseAlternateUrls($(a)),children:this._getChildrenForNode(a)}
},_parseAlternateUrls:function(a){var b=a.children("alternateUrl");
return $.map(b,function(d,c){return $(d).attr("url")
})
},_loadXML:function(){if(this.state==="loading"||this.state==="success"){return
}this.state="loading";
var a=this;
$.ajax({type:"GET",url:SWA.sitemap.dataURL?SWA.sitemap.dataURL:"/assets/data/site_map/site_map.xml",dataType:"xml",success:function(b){a.response=b;
a._setActiveNodes();
a.state="success";
$(a).trigger("dataReady")
}})
},_setActiveNodes:function(){var a=this._getNodeForURL($.url.url());
a.attr("active","active").attr("current","current");
a.parents("section").attr("active","active");
if(a.is("alternateUrl")){a.parent().attr("current","current")
}}};
var siteMap;
var root="root";
var stack=[];
function addDropDownMenu(a){if(a.attr("url")==null){topURL="#"
}else{if(a.attr("linkto")){topURL=a.attr("linkto")
}else{topURL=a.attr("url")
}}var b='<li class="swa_nav_globalNav_dropdown"><span class="swa_nav_globalNav_vertical_span"><a id="'+a.attr("name")+'"  class="swa_nav_globalNav_dropdown_parent" href="'+topURL+'">'+a.attr("name")+'</a></span><div class="clean_line"></div><div class="swa_nav_globalNav_dropdown_inner"><ul class="swa_dropdown_sublist"></ul></div></li>';
return b
}function addMenuItem(e){var d="";
if(currentURL==e.attr("name")){d='<li class="swa_nav_globalNav_dropdown_item" id="'+e.attr("name")+'">'+e.attr("name")+"</li>"
}else{var a;
if(e.attr("class")==null){a=""
}else{a=' class="'+e.attr("class")+'" '
}var c=e.attr("linkto")?e.attr("linkto"):e.attr("url");
var b=sitemap_attributes(e);
d='<li class="swa_nav_globalNav_dropdown_item" id="'+e.attr("name")+'"><a '+a+'href="'+c+'" title="'+e.attr("name")+'"'+b+">"+e.attr("name")+"</a></li>"
}return d
}function addBreadCrumbItem(d){var a=sitemap_attributes(d);
var c=d.attr("linkto")?d.attr("linkto"):d.attr("url"),b='<li id="'+d.attr("name")+'"><a id="'+d.attr("name")+'" href="'+c+'" title="'+d.attr("name")+'"'+a+">"+d.attr("name")+"</a></li>";
return b
}function buildMenu(b){$("#breadcrumbs").empty();
stack=new Array();
currentURL=b.attr("name");
if(b.parent().attr("name")!=root){goUp(b)
}var c=$('<ul class="swa_nav_globalNav"></ul>');
for(var a=stack.length-1;
a>=0;
a--){c.append(stack[a])
}c.append(buildBreadCrumb(b));
$("#breadcrumbs").append(c)
}function buildBreadCrumb(a){var b=$('<li class="swa_nav_globalNav_horizontal"><span class="swa_nav_globalNav_horizontal_span">'+a.attr("name")+"</span></li>");
if(a.children("section").size()>0){b.find(".swa_nav_globalNav_horizontal_span").text(b.find(".swa_nav_globalNav_horizontal_span").text()+": ");
b.append('<ul class="swa_breadcrumbs_sublist"></ul>')
}a.children("section").each(function(){var d=$(this);
var c=$(addBreadCrumbItem(d));
if($(this).attr("url")==null){c.find("a").click(function(){sectionSelection($(this));
initMenu();
return false
})
}b.find(".swa_breadcrumbs_sublist").append(c)
});
b.find(".swa_breadcrumbs_sublist li:first").addClass("first");
b.find(".swa_breadcrumbs_sublist li:last").addClass("last");
return b
}function sectionSelection(a){$(siteMap).find("section").each(function(){if($(this).attr("name")==a.attr("id")){buildMenu($(this));
return
}})
}function goUp(c){var b=c.parent();
if(b.attr("name")!=root){var a=$(addDropDownMenu(b));
if(b.attr("url")==null||b.attr("url").length==0){a.find(".swa_nav_globalNav_dropdown_parent").click(function(){sectionSelection($(this));
initMenu();
return false
})
}b.children("section").each(function(){currentURL=c.attr("name");
var d=$(addMenuItem($(this)));
if($(this).attr("url")==null){d.click(function(e){sectionSelection($(this));
initMenu();
return false
})
}a.find(".swa_dropdown_sublist").append(d)
});
stack.push(a);
goUp(b)
}}$(document).ready(function(){if($("#breadcrumbs").size()){$("#breadcrumbs").css({visibility:"hidden"});
SWA.sitemap.model.get("RawResponse",function(b){$("#breadcrumbs").css({visibility:"visible"});
siteMap=b;
var a=$.url.url();
$(siteMap).find("section").each(function(){var d=$(this);
var c=false;
if(d.attr("url")==a&&d.attr("shortcut")!="yes"){buildMenu(d);
initMenu();
c=true
}else{d.find("alternateUrl").each(function(){if($(this).attr("url")==a){setupMenu(d);
c=true
}else{if($(this).attr("regexUrl")!=null){if(a.match($(this).attr("regexUrl"))){setupMenu(d);
c=true
}}}})
}if(c){return
}})
})
}});
function setupMenu(a){buildMenu(a);
initMenu()
}function initMenu(){$(".swa_nav_globalNav li:first").addClass("first");
swa_nav_globalNav_position();
var a="";
if(typeof globalHeaderFooterSessionInformation=="string"){a=globalHeaderFooterSessionInformation.replace(/&amp;/g,"&")
}$(".secondaryNavPopulateSession").each(function(){var b=$(this).attr("href");
if(b.indexOf("?")>-1){$(this).attr("href",b+"&"+a)
}else{$(this).attr("href",b+"?"+a)
}});
$(".swa_nav_globalNav_dropdown").hover(function(){$(this).find("div").show();
$(this).addClass("swa_nav_globalNav_dropdown_active")
},function(){$(this).find("div").hide();
$(this).removeClass("swa_nav_globalNav_dropdown_active")
});
$(".swa_nav_globalNav_dropdown_max").hover(function(){$(this).addClass("swa_nav_globalNav_dropdown_max_active")
},function(){$(this).removeClass("swa_nav_globalNav_dropdown_max_active")
})
}function swa_nav_globalNav_position(){if($.browser.msie){max=1;
min=0
}else{max=0;
min=1
}position=0;
z_index=20;
n=0;
$(".swa_nav_globalNav_dropdown").each(function(){n++
});
for(i=0;
i<n;
i++){if($(".swa_nav_globalNav_dropdown").eq(i).width()>$(".swa_nav_globalNav_dropdown").eq(i).find(".swa_nav_globalNav_dropdown_inner").width()){erase_curves(i)
}else{if($(".swa_nav_globalNav_dropdown").eq(i).width()>$(".swa_nav_globalNav_dropdown").eq(i).find(".swa_nav_globalNav_dropdown_inner").width()-(14)){$(".swa_nav_globalNav_dropdown").eq(i).css({width:($(".swa_nav_globalNav_dropdown").eq(i).find(".swa_nav_globalNav_dropdown_inner").width()+max)+"px"});
erase_curves(i)
}}if(i>=1){$(".swa_nav_globalNav_dropdown").eq(i).css({left:(position-=10)+"px"})
}position+=$(".swa_nav_globalNav_dropdown").eq(i).width();
$(".swa_nav_globalNav_dropdown").eq(i).css({zIndex:z_index-=1});
$(".swa_nav_globalNav_dropdown").eq(i).find(".clean_line").css({width:($(".swa_nav_globalNav_dropdown").eq(i).width()+6)+"px"})
}$(".swa_nav_globalNav_horizontal").css({left:position})
}function erase_curves(a){$(".swa_nav_globalNav_dropdown").eq(a).find(".swa_nav_globalNav_dropdown_inner").css({width:($(".swa_nav_globalNav_dropdown").eq(a).width()-min)+"px"});
$(".swa_nav_globalNav_dropdown").eq(a).find(".clean_line").css({opacity:0});
$(".swa_nav_globalNav_dropdown").eq(a).find(".swa_dropdown_sublist").css({background:"none"});
$(".swa_nav_globalNav_dropdown").eq(a).addClass("swa_nav_globalNav_dropdown_max")
}function sitemap_attributes(g){var f="";
var b="";
var e="";
for(var a=0;
a<g.length;
a++){for(var d=0;
d<g[a].attributes.length;
d++){var c=g[a].attributes[d];
if(c.name.toString().startsWith("attr")){f=c.name.toString().substring(5,c.name.length);
b=c.value;
e+=" "+f+'="'+b+'"'
}}}return e
};