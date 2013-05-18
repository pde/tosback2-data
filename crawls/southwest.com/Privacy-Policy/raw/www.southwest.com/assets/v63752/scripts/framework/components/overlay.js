swa.Overlay={};
swa.Overlay.POINTER_HEIGHT=17;
swa.Overlay.POINTER_WIDTH=31;
$(".overlay-trigger").bind("click",function(t){t.stopPropagation();
t.preventDefault();
closeHelpPopup();
$(".swa-component-overlay:visible, .overlay-pointer:visible").hide();
var g=$(this);
var f=g.height();
var q=g.width();
var o=g.offset();
var a=o.top;
var l=o.left;
var p=g.attr("href");
var k=g.attr("data-direction");
k=k||"BEST";
k=k.toUpperCase();
var s=swa.getNameValuePairValue(p,"page");
var r=$("."+s);
var n,b,m,d,i,u,j;
r.css({display:"block",top:-1000,left:-1000});
m=r[0].offsetHeight;
d=r[0].offsetWidth;
if(k=="BEST"){k="ABOVE";
if(a-$(window).scrollTop()<m+swa.Overlay.POINTER_HEIGHT){k="BELOW"
}}if((k=="LEFT")||(k=="RIGHT")){swa.Overlay.POINTER_HEIGHT=27;
swa.Overlay.POINTER_WIDTH=16
}switch(k){case"ABOVE":n=a-m-swa.Overlay.POINTER_HEIGHT+2;
b=l+(q/2)-(d/2);
i=a-swa.Overlay.POINTER_HEIGHT;
u=l+(q/2)-(swa.Overlay.POINTER_WIDTH/2);
j="icon-pointer-down";
break;
case"BELOW":n=a+f+swa.Overlay.POINTER_HEIGHT-2;
b=l+(q/2)-(d/2);
i=a+f;
u=l+(q/2)-(swa.Overlay.POINTER_WIDTH/2);
j="icon-pointer-up";
break;
case"LEFT":n=a+(f/2)-(m/2);
b=l-d-swa.Overlay.POINTER_WIDTH+2;
i=a+(f/2)-(swa.Overlay.POINTER_HEIGHT/2);
u=l-swa.Overlay.POINTER_WIDTH;
j="icon-pointer-right";
break;
case"RIGHT":n=a+(f/2)-(m/2);
b=l+q+swa.Overlay.POINTER_WIDTH-2;
i=a+(f/2)-(swa.Overlay.POINTER_HEIGHT/2);
u=l+q;
j="icon-pointer-left";
break
}var h=$(".overlay-pointer");
if(h.length==0){h=$('<div class="overlay-pointer '+j+'" style="left:'+u+"px; top:"+i+'px"></div>');
h.insertAfter(r)
}else{h[0].className="";
h.addClass("overlay-pointer "+j).css({left:u,top:i})
}var c=r.find(".heading");
if(c.find(".overlay-close").length==0){c.append('<span class="overlay-close"><span class="overlay-close-text">Close</span><span class="icon-close-overlay"></span></span>')
}r.css({top:n,left:b});
h.show();
$(document).click(function(x){var v=$(".swa-component-overlay:visible");
if(v.length){var w=$(x.target);
if(w.parents(".swa-component-overlay").length){if(w.parents(".overlay-close").length==0){return true
}}v.hide();
h.hide()
}});
return false
});