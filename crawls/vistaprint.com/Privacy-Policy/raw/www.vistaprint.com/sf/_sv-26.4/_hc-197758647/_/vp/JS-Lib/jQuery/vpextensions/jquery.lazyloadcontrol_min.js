                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof vp=="undefined"){
var vp={};
}

(function $vpfn_JkqY3YuTqeLk1eqPqfF7Xw8$1($){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}





vp.LazyLoadControl=function $vpfn_y0kZTRcUrTnHBcrQK2waYQ14$25(oElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
this.baseElement=oElement;
this.parent=$(this.baseElement).parent().get(0);




var init=function $vpfn_iibust$6MbRhpbvylc6XqA22$19(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(window).bind("scroll",me.checkWrap);
me.checkWrap();
};






var checkIfVisible=function $vpfn_UINO86F8hwO73UEMgiP40w32$29(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var viewportHeight=$(window).height()+$(window).scrollTop();

if($(me.parent).offset().top<=viewportHeight
&&$(me.parent).offset().left>=0
){
return true;
}
else{
return false;
}
};




this.checkWrap=function $vpfn_icuDbCi4SEpBGQr2iPt6Mg48$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(checkIfVisible()){
$(me.baseElement).uncomment();
$(window).unbind("scroll",me.checkWrap);
}
};

init();
};







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
};init._vpfn='$vpfn_iibust$6MbRhpbvylc6XqA65$4';





$.fn.lazyloadcontrol=function $vpfn_PEye6QM_CEWpjdWTGWUAgA84$27(fnCallback){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.each(function $vpfn_JkqY3YuTqeLk1eqPqfF7Xw85$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
init(this,fnCallback);
});

};
})(jQuery);


