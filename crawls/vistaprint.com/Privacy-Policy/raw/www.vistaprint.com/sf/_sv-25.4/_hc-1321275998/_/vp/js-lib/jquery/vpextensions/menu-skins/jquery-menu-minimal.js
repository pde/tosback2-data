                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}

(function $vpfn_r9nOvKSDJMnBqKdX06AIEg3$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var TRANSITION_TIME=300;

$.registerDropDownMenuSkin(
"minimal",
{
position:function $vpfn_r9nOvKSDJMnBqKdX06AIEg10$22(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.level===0)
{
var left=parseInt("-"+e.$item.css("borderLeftWidth"))||0;
var top=e.$item.outerHeight()+4;


e.$panel.css(
{
visibility:"hidden",
display:"block",
top:top,
left:left
});

var offset=e.$panel.offset();
var right=offset.left+e.$panel.outerWidth();
var diff=right-$(window).width();


if(diff>0)
{
left-=diff;
}

e.$panel.css({
top:top,
left:left,
visibility:"",
display:"none"
});

return;
}

var pos=e.$item.position();

e.$panel.css({
left:pos.left+e.$item.innerWidth(),
top:0
});
},

animationShow:function $vpfn_r9nOvKSDJMnBqKdX06AIEg54$27(e,callback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.$panel.fadeIn(TRANSITION_TIME,callback);
},

animationHide:function $vpfn_r9nOvKSDJMnBqKdX06AIEg59$27(e,callback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.$panel.fadeOut(TRANSITION_TIME,callback);
}
});

})(jQuery);