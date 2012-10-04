                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


vp.define("vp.widget");

(function $vpfn_4pELSmkaYBxh9Y2cXdhQCw6$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}








vp.widget.DropDownButton=function $vpfn_BD$s_ceXgc1MpPqZXzC64A16$31(container,button,menu)
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

var startShow=function $vpfn_ULOawkxrfOGRijeUyhfMmA75$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeopen.fire(e);

if(e.cancel)
{
return;
}

me.show();
};

var startHide=function $vpfn_1P_0X8MeOYOdMbuNFxRddQ87$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeclose.fire(e);

if(e.cancel)
{
return;
}

me.hide();
};

var openComplete=function $vpfn_Q6TBILH$krZKyMAcKtoSaw99$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=true;
me.onopen.fire();
};

var closeComplete=function $vpfn_$bdnpTiEtduU2k2GNFjmbA106$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=false;
me.onclose.fire();
};

this.show=function $vpfn_TfN$ktrldr8_asujPqTekg113$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.positioningStrategy)
{
me.positioningStrategy(me);
}

_transitioning=true;
$menu.slideDown('fast',openComplete);
};

this.hide=function $vpfn_86wCJe_1HOAFmQWWFbEFaA124$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=true;
$menu.slideUp('fast',closeComplete);
};

var preventMenuBubbling=function $vpfn_L65S6K_Xriyc4WtDeovYNg130$34(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.stopPropagation();
};

var showClick=function $vpfn_sZkvHKaM20iKdnl8da3QdA135$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnClick)
{
return;
}

_clickMode=true;
startShow(e);




setTimeout(function $vpfn_4pELSmkaYBxh9Y2cXdhQCw148$23(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(document).bind("click",hideClick);
$menu.bind("click",preventMenuBubbling);
},0);
};

var hideClick=function $vpfn_IhFzHNaY4quRDuxNB4g2hA154$24(e)
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

var toggleClick=function $vpfn_ThG3ZVWkp5DS2GEBBdLJiQ168$26(e)
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

var mouseOver=function $vpfn_4KKjEwwhc0BOJnMP_c6u5g204$24(e)
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

var mouseOut=function $vpfn_f9e3WLVRTAzGXRvrdCoHYA219$23(e)
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