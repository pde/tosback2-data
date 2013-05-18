                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}








vp.define("vp.sales.minicart");

if(typeof vp.sales.minicart.delay=='undefined'){
vp.sales.minicart.delay=200;
}

if(typeof vp.sales.minicart.storeRedesign1=='undefined'){
vp.sales.minicart.storeRedesign1=false;
}

var LoadStatus={Unload:0,Loading:1,Success:2,Login:3,Error:-1};

vp.sales.minicart.sized=false;
vp.sales.minicart.aligned=false;

vp.sales.minicart.url='/sales/pipeline/mini-cart.aspx';

if(typeof vp.sales.minicart.loadStatus=='undefined'){
vp.sales.minicart.loadStatus=LoadStatus.Unload;
}

if(typeof vp.sales.minicart.totalItemNumber=='undefined'){
vp.sales.minicart.totalItemNumber=-1;
}

if(typeof vp.sales.minicart.emptyCartMessage=='undefined'){
vp.sales.minicart.emptyCartMessage="";
}

if(typeof vp.sales.minicart.loadErrorMessage=='undefined'){
vp.sales.minicart.loadErrorMessage="Error";
}

if(typeof vp.sales.minicart.showMiniCart=='undefined'){
vp.sales.minicart.showMiniCart=false;
}






$(document).ready(function $vpfn_pTapujhugqNALNuJBtNlZg54$18(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var timer;

var menu=new vp.widget.DropDownButton(".dropdown-menu-minicart",".minicart-header-section",".minicart-popup");
var onopen=function $vpfn_dGEMNMukpVNfOlrtYCy$Bw58$17(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.spot.trackWithQueryString('MiniCartOpen','totalitemcount='+vp.sales.minicart.totalItemNumber);
if(vp.sales.minicart.loadStatus==LoadStatus.Unload){
timer=setTimeout(vp.sales.minicart.show,vp.sales.minicart.delay);
}
};

menu.onopen.addHandler(onopen);
menu.onbeforeclose.addHandler(function $vpfn_pTapujhugqNALNuJBtNlZg66$34(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(timer){
clearTimeout(timer);
timer=null;
}
});

menu.positioningStrategy=function $vpfn_torOrJCqzCd07Kd8y2r3Dg73$31(menu){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var popup=$(menu.menu);
vp.sales.minicart.setPosition(popup);
};

});





vp.sales.minicart.isNumeric=function $vpfn_J1Hzp1gDmWcADaOxWaBrcg84$30(input){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var RE=/^-{0,1}\d*\.{0,1}\d+$/;
return(RE.test(input));
};





$(window).load(function $vpfn_pTapujhugqNALNuJBtNlZg93$15(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.sales.minicart.showMiniCart){
var webserviceResponseHandler=function $vpfn__sU6YnSfjObdJXYIO$BzVg96$40(itemCount){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!vp.sales.minicart.isNumeric(itemCount))
{
vp.sales.minicart.totalItemNumber=0;
}
else
{
vp.sales.minicart.totalItemNumber=itemCount;
}

$('.mini-cart-item-counter').html("&nbsp;&nbsp;&#40;"+vp.sales.minicart.totalItemNumber+"&#41;");

if(vp.sales.minicart.totalItemNumber===0){
vp.sales.minicart.showMessage($(".minicart-popup"),vp.sales.minicart.emptyCartMessage);
vp.sales.minicart.loadStatus=LoadStatus.Success;
}
};

$.ajaxAsmx({
url:'/sales/pipeline/minicart/MiniCartBasketItemCounter.asmx',
methodName:'ItemCount',
success:webserviceResponseHandler,
error:function(){}
});
};

});





vp.sales.minicart.show=function $vpfn_brZsOdL4h0RRPxyHPRPV7Q129$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var miniCartPopup=$('.minicart-popup');

if(vp.sales.minicart.loadStatus==LoadStatus.Unload&&vp.sales.minicart.totalItemNumber>0){
vp.sales.minicart.load(miniCartPopup);
}


if(vp.sales.minicart.loadStatus==LoadStatus.Loaded&&!vp.sales.minicart.aligned){
vp.sales.minicart.setPricesAlignment();
}
};






vp.sales.minicart.setPosition=function $vpfn_f8wFCwV5UHCvvadWC_B2Tw147$32(element){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var menuTop=0;

if(!vp.sales.minicart.storeRedesign1){
var parentElement=element.parent();
var headerHeight=$('.headmenu-container');
var pageInnerOffset=parseInt($('.vpheader').css('margin-right'),10);
var menuRight=-pageInnerOffset;
menuTop=headerHeight.outerHeight()-1;
if($.browser.msie&&parseInt($.browser.version,10)<=7){
menuTop=headerHeight.offset().top+headerHeight.outerHeight()-(parentElement.offset().top)-1;
}
element.css("right",menuRight+"px");
}
else{
menuTop=$('.nav-utility-bar-bottom').height();
}
element.css("top",menuTop+"px");
element.css("left","");

if(vp.sales.minicart.totalItemNumber===0){
element.css("width","auto");
}

vp.sales.minicart.sized=true;
};






vp.sales.minicart.load=function $vpfn_WcrFjHFm1JlFmtJXH5OSvw180$25(element){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var navigateUrl=vp.sales.minicart.url+' #miniCart';
vp.sales.minicart.loadStatus=LoadStatus.Loading;

$('.minicart-popup').load(navigateUrl,function $vpfn_pTapujhugqNALNuJBtNlZg185$43(response,status,xhr){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var minicart=$('#miniCart');
if(status=="error"||response.length===0||!minicart||minicart.children().length===0){
vp.sales.minicart.showError(element);
}else{
vp.sales.minicart.loadStatus=LoadStatus.Loaded;
vp.sales.minicart.setPricesAlignment();
}
element.css("width","auto");
});
};






vp.sales.minicart.showError=function $vpfn_AmRrGMv7Fk_DrvekubejqQ202$30(element){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.sales.minicart.showMessage(element,vp.sales.minicart.loadErrorMessage);
vp.sales.minicart.loadStatus=LoadStatus.Error;
};







vp.sales.minicart.showMessage=function $vpfn_dA3fqB6DUqP4PTSkDSsOqg213$32(element,message){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var messageElement=$('<div>').addClass('mini-cart-text-message').append($('<span>').html(message));
element.children().remove();
element.append(messageElement);
};






vp.sales.minicart.setPricesAlignment=function $vpfn_8fzC_S7yojgMmkH5zz29Hg224$39(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(!vp.sales.minicart.aligned&&$('#miniCart').is(':visible')&&vp.sales.minicart.loadStatus!=LoadStatus.Error){
$('.mini-cart-cell:last').parent().children().css('border-bottom','0px');


if($.browser.msie&&parseInt($.browser.version,10)<=7){

if($('.mini-cart-item-list-container').height()<$(".mini-cart-item-control").height()){
var currentPadding=parseInt($(".mini-cart-item-control").css("padding-right"));
var scrollWidth=vp.sales.minicart.getScrollbarWidth()+currentPadding;
$(".mini-cart-item-control").css("padding-right",scrollWidth+"px");
}
}

var itemPriceElement=$('.mini-cart-final-price:first').find('span:last');
var containerElement=$('.mini-cart-item-list-container');
var containerRight=containerElement.offset().left+containerElement.width();
var itemPriceRight=itemPriceElement.offset().left+itemPriceElement.width();
var paddingPrice=containerRight-itemPriceRight;
if(paddingPrice>100){paddingPrice=35;}
$('.mini-cart-price').css('padding-right',paddingPrice);
$('.mini-cart-total-price').css('padding-right',paddingPrice);
vp.sales.minicart.aligned=true;
}
};





vp.sales.minicart.getScrollbarWidth=function $vpfn_JGGqx58_hzTi5MxBZRs6HQ256$38(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var div=$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-2000px;left:-2000px;"><div style="height:100px;"></div>');
$('body').append(div);
var w1=$('div',div).innerWidth();
div.css('overflow-y','scroll');
var w2=$('div',div).innerWidth();
$(div).remove();
return(w1-w2);
};

