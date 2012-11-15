                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


vp.define("vp.widget");

(function $vpfn_sPhecyhqj5kp42skqCNP8g6$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}








vp.widget.DropDownButton=function $vpfn_cdDhKuamwUxLlZ5_mxYhTA16$31(container,button,menu)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

var $container=$.getElement(container,"vp.widget.DropDownButton",1);
var $button=$.getElement(button,"vp.widget.DropDownButton",1);
var $menu=$.getElement(menu,"vp.widget.DropDownButton",1);





this.container=$container[0];





this.button=$button[0];





this.menu=$menu[0];






this.positioningStrategy=null;






this.showOnHover=true;





this.showOnClick=true;





this.isOpen=false;



var _clickMode=false;


var _transitioning=false;

var startShow=function $vpfn_V$OELZMszl3FTmN54pOcVQ75$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeopen.fire(e);

if(e.cancel)
{
return;
}

me.show();
};

var startHide=function $vpfn_dzc5xdYRKutvMTkdcSBKwA87$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeclose.fire(e);

if(e.cancel)
{
return;
}

me.hide();
};

var openComplete=function $vpfn_3jEF$ttNlXJ7ungwE__GYA99$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=true;
me.onopen.fire();
};

var closeComplete=function $vpfn_3hqJzciDdjs7ZSyJ469WoQ106$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=false;
me.onclose.fire();
};

this.show=function $vpfn_6w2m8juGwRbfeYbAK9mdZA113$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.positioningStrategy)
{
me.positioningStrategy(me);
}

_transitioning=true;
$menu.slideDown('fast',openComplete);
};

this.hide=function $vpfn_b4Fd1O4ZrA$3PYovjzlNgg124$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=true;
$menu.slideUp('fast',closeComplete);
};

var preventMenuBubbling=function $vpfn_Yu8rzmGTkoxX5ragdJsWRA130$34(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.stopPropagation();
};

var showClick=function $vpfn_WF8fp2CVUcoKT0B783rHqQ135$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnClick)
{
return;
}

_clickMode=true;
startShow(e);




setTimeout(function $vpfn_sPhecyhqj5kp42skqCNP8g148$23(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(document).bind("click",hideClick);
$menu.bind("click",preventMenuBubbling);
},0);
};

var hideClick=function $vpfn_x9KM$7W7iV5XyDua$YWtIA154$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnClick)
{
return;
}

_clickMode=false;
startHide(e);

$(document).unbind("click",hideClick);
$menu.unbind("click",preventMenuBubbling);
};

var toggleClick=function $vpfn_3eNVU6g$F7nQp_oM3xHCBw168$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_transitioning)
{
return;
}

me.isOpen?hideClick(e):showClick(e);
};





this.onopen=new vp.events.CustomEvent(this,"onopen");





this.onclose=new vp.events.CustomEvent(this,"onclose");






this.onbeforeopen=new vp.events.CustomEvent(this,"onbeforeopen");






this.onbeforeclose=new vp.events.CustomEvent(this,"onbeforeclose");

var mouseOver=function $vpfn_EHjZaazA0HrJTh7c4fLx5w204$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnHover)
{
return;
}

if(_clickMode)
{
return;
}

startShow(e);
};

var mouseOut=function $vpfn_LdhxOFVzCKzAZJaFqxQHDQ219$23(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnHover)
{
return;
}

if(_clickMode)
{
return;
}

startHide(e);
};


$container.hoverIntent({over:mouseOver,out:mouseOut,timeout:200});


$container.bind("click",toggleClick);
};

})(jQuery);