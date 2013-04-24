                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


vp.define("vp.widget");

(function $vpfn_reFxni9nrKFvdsaU8NUA$w6$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}








vp.widget.DropDownButton=function $vpfn_o7nDz7OeRl$yt59J9EtmGQ16$31(container,button,menu)
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

var startShow=function $vpfn_ZwgHnd1E3VjOYbM_Gx4LeA75$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeopen.fire(e);

if(e.cancel)
{
return;
}

me.show();
};

var startHide=function $vpfn_Zyxu0HbZVM9Cbc3WaShcDQ87$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeclose.fire(e);

if(e.cancel)
{
return;
}

me.hide();
};

var openComplete=function $vpfn_XnCV82TEQW9sjsduAMTgzw99$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=true;
me.onopen.fire();
};

var closeComplete=function $vpfn_bUpyLbJXfw2tq4QXyOKRSA106$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=false;
me.isOpen=false;
me.onclose.fire();
};

this.show=function $vpfn_HHgZ7k6G8ar4ZzbLUWsu2A113$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.positioningStrategy)
{
me.positioningStrategy(me);
}

_transitioning=true;
$menu.slideDown('fast',openComplete);
};

this.hide=function $vpfn_8TifW7gZVOPWFij7HvTUsw124$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_transitioning=true;
$menu.slideUp('fast',closeComplete);
};

var preventMenuBubbling=function $vpfn_Af2jVnWjr5QKJPmNWLweTA130$34(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.stopPropagation();
};

var showClick=function $vpfn_B1KBcDdeFEj46DQtHTo_sg135$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.showOnClick)
{
return;
}

_clickMode=true;
startShow(e);




setTimeout(function $vpfn_reFxni9nrKFvdsaU8NUA$w148$23(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(document).bind("click",hideClick);
$menu.bind("click",preventMenuBubbling);
},0);
};

var hideClick=function $vpfn_ljXIgWnw9tOXZMrdONKlzA154$24(e)
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

var toggleClick=function $vpfn_rCWHi320kX6kxfAEkiszNg168$26(e)
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

var mouseOver=function $vpfn_E$Xk_IajH$2a$T6TG7vqMA204$24(e)
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

var mouseOut=function $vpfn_iTH9B19ms6_ZDzW0PecLiA219$23(e)
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