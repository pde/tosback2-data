                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




$.registerDropDownMenuSkin(
"taxonomy",
{
position:function $vpfn_c3CqjMEe8_knnw4Ce4g$oQ9$18(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
topNavTaxonomyPositioningStrategy(e);
}
});




var topNavTaxonomyPositioningStrategy=function $vpfn_hS3uxXnty7uM0dIQV8XUtQ18$40(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.level===0)
{
e.$panel.css({
top:e.$item.innerHeight(),
left:"-"+e.$item.css("borderLeftWidth")
});


var maxChildPanelHeight=e.$panel.height();
e.$panel.find(".menu-panel").each(function $vpfn_c3CqjMEe8_knnw4Ce4g$oQ29$43(i){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

$(this).css("visibility","hidden");
$(this).show();
});
e.$panel.css("visibility","hidden").show();
e.$panel.find(".menu-panel").each(function $vpfn_c3CqjMEe8_knnw4Ce4g$oQ35$43(i){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
maxChildPanelHeight=Math.max($(this).height(),maxChildPanelHeight);
$(this).hide();
$(this).css("visibility","visible");
});
e.$panel.css("visibility","visible").height(maxChildPanelHeight);

return;
}

NonRootTaxonomyPositioningStrategy(e);
};




var leftNavTaxonomyPositioningStrategy=function $vpfn_6X_1lmFvZQ1CSe$otmtKxQ51$41(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.level===0)
{
e.$panel.css({
top:0,
left:parseInt(e.$item.css("width"))
});
return;
}

NonRootTaxonomyPositioningStrategy(e);
};




var NonRootTaxonomyPositioningStrategy=function $vpfn_3_o8ylAiJkcFpwV0f4Eysw68$41(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var pos=e.$item.position();


e.$panel.css({
left:pos.left+e.$item.innerWidth(),
top:-pos.top-3
});


currentPanel=e.panel;
while(currentPanel&&currentPanel.$panel)
{
currentPanel.$panel.css({
height:""
});

currentPanel=currentPanel.parent;
}


var maxHeight=-1;
var currentPanel=e.panel;
while(currentPanel&&currentPanel.$panel)
{
maxHeight=Math.max(currentPanel.$panel.height(),maxHeight);
currentPanel=currentPanel.parent;
}


currentPanel=e.panel;
while(currentPanel&&currentPanel.$panel)
{

var maxSiblingHeight=maxHeight;
currentPanel.$panel.parentsUntil(".menu-container").find(".menu-panel > .menu-item > .menu-panel").each(function $vpfn_c3CqjMEe8_knnw4Ce4g$oQ104$110(i){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
maxSiblingHeight=Math.max($(this).height(),maxSiblingHeight);
});

currentPanel.$panel.height(maxSiblingHeight).parent().find(".menu-panel > .menu-item > .menu-panel").height(maxSiblingHeight);


if(e.level==1)
{
var maxSiblingWidth=0;
currentPanel.$panel.parentsUntil(".menu-container").find(".menu-panel > .menu-item > .menu-panel").each(function $vpfn_c3CqjMEe8_knnw4Ce4g$oQ114$114(i){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
maxSiblingWidth=Math.max($(this).width(),maxSiblingWidth);
});

currentPanel.$panel.parent().find(".menu-panel > .menu-item > .menu-panel").width(maxSiblingWidth);
}

currentPanel=currentPanel.parent;
}

};