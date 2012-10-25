                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}












(function $vpfn_67l981hdG1qwQRrO8pcUQg14$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _skins={};


$.registerDropDownMenuSkin=function $vpfn_$kRU2MD12S9ALPPazCau9Q19$33(name,skin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_skins[name]=skin;
};


$.fn.swapClasses=function $vpfn_RIWuK5p3QMsx_3iKc5_SCw25$23(class1,class2,enabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var classToAdd=enabled?class1:class2;
var classToRemove=enabled?class2:class1;

if(!this.hasClass(classToAdd))
{
this.addClass(classToAdd).removeClass(classToRemove);
}

return this;
};




var _isTouchScreen=('ontouchstart'in window)||
(window.DocumentTouch&&document instanceof DocumentTouch);


var highlightMenuItem=function $vpfn_M7OmdIZ8XErfAEf$w2AF1A45$28($item,enabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$item.swapClasses("hover","nohover",enabled);
};




var findUntilInternal=function $vpfn_pu0tRwJjoalgHj1$Fr0IXA53$28(elem,fnIsMatch,results)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(elem.nodeType!==1)
{
return;
}

if(fnIsMatch.call(elem,elem,results)===false)
{
return;
}

for(var i=0,len=elem.childNodes.length;i<len;i++)
{
findUntilInternal(elem.childNodes[i],fnIsMatch,results);
}
};


var findUntil=function $vpfn_lTEHaeSOj7EkdZwfHBVGYg72$20($elem,fnIsMatch)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var results=[];

$elem.each(function $vpfn_67l981hdG1qwQRrO8pcUQg76$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
findUntilInternal(this,fnIsMatch,results);
});

return $(results);
};




var mergeOptions=function $vpfn_Ko6$wiD8EZBpWezY8P3Q2Q87$23(defaults)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var merged=$.extend.apply({},arguments);


for(var option in merged)
{
if(typeof defaults[option]=="function"&&
typeof merged[option]!="function")
{
merged[option]=$.noop;
}
}

return merged;
};

var _defaults=
{

showOnHover:true,



linksWithSubmenusEnabled:false,


selected:$.noop,


beforeShowPanel:$.noop,


beforeHidePanel:$.noop,


showPanelComplete:$.noop,


hidePanelComplete:$.noop,



position:$.noop,


skin:"basic"
};




$.fn.dropDownMenu=function $vpfn_NWliVlZ2ch_z3LndF85NrA139$24(options)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(this.length===0)
{
return this;
}


var _skin=_skins[options.skin];
if(!_skin)
{
throw new Error("Invalid dropDownMenu skin: "+_options.skin);
}


var _options=mergeOptions({},_defaults,_skin||{},options);


if(!_options.showOnHover)
{
_options.linksWithSubmenusEnabled=false;
}


var FADE_MS=150;




var createMenuFromTopMenuItems=function $vpfn_OWBsXD7HIAodzu0t$PzbAQ168$41($topLevelItems)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


$topLevelItems.addClass("menu-item-top");

var _panels=[];


var _rootMenu={
parent:null,
children:[]
};



var _clickHoverActivated=false;



var _ignoreDocumentClick=false;

var Panel=function $vpfn_cdhgg_TRtcgLMCgWJh$JnA190$24($panel,$item)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.$panel=$panel;
this.$item=$item||$panel.closest(".menu-item");
this.$parentPanel=this.$item.closest(".menu-panel");
this.isTopLevel=this.$parentPanel.length===0;

this.parent=null;
this.children=[];


this.isOpen=false;


this.transitioning=false;


if(this.$panel)
{
this.$panel.data("PanelInstance",this);
}


var init=function $vpfn_h3Rs3HFsvJrbqH5taC8kgw215$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


me.$item.addClass("menu-item-with-submenu");



if(shouldShowSubmenuOnHover())
{
me.$item.bind("click",function $vpfn_67l981hdG1qwQRrO8pcUQg225$47(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}_ignoreDocumentClick=true;});
}
else
{
me.$item.bind("click",toggleClick);
}

if(!_isTouchScreen)
{

me.$item.hoverDelay({
over:mouseOver,
out:mouseOut,
delayOver:me.isTopLevel&&!_options.showOnHover?0:200,
delayOut:500
});
}


if(me.isTopLevel)
{
me.$item.bind("mouseout",function $vpfn_67l981hdG1qwQRrO8pcUQg246$50(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.isOpen)
{

if(e.relatedTarget)
{
if($(this).has(e.relatedTarget).length>0&&!$(this).is(e.relatedTarget))
{
return;
}
}

highlight(false);
}
});
}


if(me.$panel)
{


me.$panel.click(function $vpfn_67l981hdG1qwQRrO8pcUQg269$40(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var $clickedMenuItem=$(e.target).closest(".menu-item",me.$panel);

if($clickedMenuItem)
{


if(!$clickedMenuItem.hasClass("menu-item-with-submenu"))
{
var ev=getEvent(e);
ev.$selectedItem=$clickedMenuItem;
ev.selectedItem=$clickedMenuItem[0];

_options.selected.call(this,ev);


if(ev.cancel)
{
e.stopPropagation();
return;
}


hideAllClick(e);
}
}

e.stopPropagation();
});

if(!_options.linksWithSubmenusEnabled)
{

var $links=findUntil(me.$item,function $vpfn_67l981hdG1qwQRrO8pcUQg304$61(elem,results)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



if($(elem).hasClass("menu-panel"))
{
return false;
}


if(elem.tagName=="A")
{
results.push(elem);
}

return true;
});

$links.click(function $vpfn_67l981hdG1qwQRrO8pcUQg323$41(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.preventDefault();
});
}
}
};



this.resolveParent=function $vpfn_yuTuInIK0cHjToFWjz7edA333$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.parent=me.$parentPanel.data("PanelInstance")||_rootMenu;
me.parent.children.push(me);
};

var _level=null;


this.getLevel=function $vpfn_tbDFLXbXwd88rWVnNSG7uw342$32()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_level===null)
{
_level=-1;
var current=me.parent;
while(current)
{
current=current.parent;
_level++;
}
}

return _level;
};

var _siblings;


this.getSiblings=function $vpfn_2ebxAe62QwfD1xNiDe_q$w361$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_siblings)
{
_siblings=[];
if(me.parent)
{
$.each(me.parent.children,function $vpfn_67l981hdG1qwQRrO8pcUQg368$55()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(this!==me)
{
_siblings.push(this);
}
});
}
}

return _siblings;
};


var getEvent=function $vpfn_JFnJNs7XIzBLn6mfpj75Gg382$31(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return{
$panel:me.$panel,
panel:me,
$parentPanel:me.$parentPanel,
parentPanel:me.$parentPanel[0],
$item:me.$item,
item:me.$item[0],
level:me.getLevel(),
innerEvent:e,
preventDefault:function $vpfn_67l981hdG1qwQRrO8pcUQg393$40()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.cancel=true;
}
};
};





var highlight=function $vpfn_qScYZT9DEzKBcjMuRA66uQ404$32(enabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
highlightMenuItem(me.$item,enabled);
};


var shouldShowSubmenuOnHover=function $vpfn_2CmunUBGlPfvlN1aPFzRsw410$47()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_isTouchScreen)
{
return false;
}

if(!me.isTopLevel)
{
return true;
}




return _clickHoverActivated||_options.showOnHover;
};

var mouseOver=function $vpfn__$c0RY1f3pxNEsAmW3HhXw428$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(me.isTopLevel)
{
highlight(true);
}

if(!shouldShowSubmenuOnHover())
{
return;
}

me.show(e);
};

var mouseOut=function $vpfn_YDUvf96Kbm5c_Kph49Nnpw444$31(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isTopLevel&&!_options.showOnHover)
{
return;
}

if(!shouldShowSubmenuOnHover())
{
return;
}

me.hide(e);
};


this.show=function $vpfn_xznMNTktcmTCRj69enYF7g460$28(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.transitioning||me.isOpen)
{
return;
}

if(me.$panel)
{
var ev=getEvent(e);

_options.beforeShowPanel.call(me,ev);


if(ev.cancel)
{
return;
}
}


$.each(me.getSiblings(),function $vpfn_67l981hdG1qwQRrO8pcUQg481$45()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.hide(e);
});

hideOtherMenus(e);


highlight(true);

if(!me.$panel)
{
return;
}

me.transitioning=true;


ev=getEvent(e);
_options.position(ev);

if(_options.animationShow)
{
_options.animationShow.call(me,ev,showComplete);
}
else if(me.isTopLevel)
{
$panel.show();
showComplete();
}
else
{
$panel.fadeIn(FADE_MS,showComplete);
}
};

var showComplete=function $vpfn_WSMT_FrxFO4_bJgNxO41Sg517$35(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.isOpen=true;
me.transitioning=false;

_options.showPanelComplete.call(me,getEvent(e));
};

this.hide=function $vpfn_A1hsD6jtouIDd64rEMb_gQ525$28(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.isOpen||me.transitioning)
{
return;
}

if(me.$panel)
{
var ev=getEvent(e);

_options.beforeHidePanel.call(me,ev);


if(ev.cancel)
{
return;
}
}

highlight(false);

if(!me.$panel)
{
return;
}

me.transitioning=true;

$.each(me.children,function $vpfn_67l981hdG1qwQRrO8pcUQg554$40()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.hide(e);
});

if(_options.animationHide)
{
_options.animationHide.call(me,getEvent(e),hideComplete);
}
else if(me.isTopLevel)
{
$panel.hide();
hideComplete();
}
else
{
$panel.fadeOut(FADE_MS,hideComplete);
}
};

var hideComplete=function $vpfn_c665PGEreQyM612UWHLQvw574$35(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.isOpen=false;
me.transitioning=false;

_options.hidePanelComplete.call(me,getEvent(e));
};

var toggleClick=function $vpfn_DSgPA0sQ0EUS$izJ$urIdQ582$34(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.transitioning)
{
return;
}

me.isOpen?me.hideClick(e):showClick(e);

if(!me.isTopLevel)
{
e.stopPropagation();
}
else
{
_ignoreDocumentClick=true;
}
};

var showClick=function $vpfn_hlfO4WiM5EyV3uDj4E1g2g601$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isTopLevel)
{
_clickHoverActivated=true;
}

me.show(e);
};

this.hideClick=function $vpfn_Jr73OWzQwrM24v17x4VoUA611$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isTopLevel)
{
_clickHoverActivated=false;
}

me.hide(e);
};

this.hideForce=function $vpfn_u0JPRaVJOz28AS_bKGg3OQ621$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_clickHoverActivated=false;
me.hide(e);
};

init.apply(this);
};


var hideAllClick=function $vpfn_FeF9Stk8iUUu4RzZOw9i7w631$31(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_ignoreDocumentClick=true;

$.each(_rootMenu.children,function $vpfn_67l981hdG1qwQRrO8pcUQg635$43()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.hideForce(e);
});
};


var documentClickHandler=function $vpfn_rIwbCRW76yvVRDqZiPSdOg642$39(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(_ignoreDocumentClick)
{
_ignoreDocumentClick=false;
return;
}

hideAllClick(e);
};

_allCloseHandlers.push(hideAllClick);

var hideOtherMenus=function $vpfn_U_D3NsDyUvC19NzYFisIYA656$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<_allCloseHandlers.length;i++)
{
if(_allCloseHandlers[i]!==hideAllClick)
{
_allCloseHandlers[i](e);
}
}
};


$topLevelItems.find(".menu-panel").each(function $vpfn_67l981hdG1qwQRrO8pcUQg668$52()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_panels.push(new Panel($(this)));
});


$topLevelItems.not(".menu-item-with-submenu").each(function $vpfn_67l981hdG1qwQRrO8pcUQg674$63()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_panels.push(new Panel(null,$(this)));
});


$.each(_panels,function $vpfn_67l981hdG1qwQRrO8pcUQg680$28(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}this.resolveParent();});





$topLevelItems.find(".menu-item").hover(
function $vpfn_67l981hdG1qwQRrO8pcUQg687$16(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}highlightMenuItem($(this),true);},
function $vpfn_67l981hdG1qwQRrO8pcUQg688$16(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}highlightMenuItem($(this),false);})
.each(function $vpfn_67l981hdG1qwQRrO8pcUQg689$22(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}highlightMenuItem($(this),false);});


$(document).bind("click",documentClickHandler);
};


this.each(function $vpfn_67l981hdG1qwQRrO8pcUQg696$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var $topLevelItems=findUntil($(this),function $vpfn_67l981hdG1qwQRrO8pcUQg699$52(elem,results)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if($(elem).hasClass("menu-item"))
{
results.push(elem);
return false;
}

return true;
});



createMenuFromTopMenuItems($topLevelItems);
});


return this;
};

var _allCloseHandlers=[];

})(jQuery);