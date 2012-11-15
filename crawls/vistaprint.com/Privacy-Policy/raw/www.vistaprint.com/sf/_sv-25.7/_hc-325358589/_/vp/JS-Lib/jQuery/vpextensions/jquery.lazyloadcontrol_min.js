                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof vp=="undefined"){
var vp={};
}





vp.LazyLoadControl=function $vpfn_jvhM5HS1FyBL57haWOXL9g12$21(oElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
this.baseElement=oElement;
this.parent=$(this.baseElement).parent().get(0);




var init=function $vpfn_S62gvp1MQZMjhzbBpUXdCw20$15(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(window,"scroll",me.checkWrap);
me.checkWrap();
};






var checkIfVisible=function $vpfn_VH8gmTfpjXzZGn0vJORTdw30$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var rect=vp.ui.getRect(me.parent);
var viewportwidth=$(window).width();
var viewportheight=$(window).height()+$(window).scrollTop();

if(rect.top>=0
&&rect.left>=0
&&rect.bottom<=viewportheight
&&rect.right<=viewportwidth
){
return true;
}
else{
return false;
}
};




this.checkWrap=function $vpfn_aVN1J3ZtKHA3jF6gtQcsaQ50$21(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(checkIfVisible()){
$(me.baseElement).uncomment();
vp.events.remove(window,"scroll",me.checkWrap);
}
};

init();
};

(function $vpfn_MyCXXMRCKDtEWiRyf7XDQA61$1($){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}







function init(oElement,fnCbk){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var lazyobj;
if($.hasData(oElement)){
lazyobj=$.data(oElement,'lazyload');
if(!lazyobj){
lazyobj=new vp.LazyLoadControl(oElement);
}
}
else{
lazyobj=new vp.LazyLoadControl(oElement);
}

$.data(oElement,'lazyload',lazyobj);
};init._vpfn='$vpfn_S62gvp1MQZMjhzbBpUXdCw69$4';





$.fn.lazyloadcontrol=function $vpfn_WQ8PEtEfBFMmKKH674mHlA88$27(fnCallback){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.each(function $vpfn_MyCXXMRCKDtEWiRyf7XDQA89$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
init(this,fnCallback);
});

};
})(jQuery);


