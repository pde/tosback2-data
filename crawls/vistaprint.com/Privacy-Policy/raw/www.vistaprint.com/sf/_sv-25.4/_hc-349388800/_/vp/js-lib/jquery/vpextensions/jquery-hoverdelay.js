                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}

(function $vpfn_9vMtRzIurpeB4FaDV9YN7w3$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


$.fn.hoverDelay=function $vpfn_mSUJWzeN2L7voArl9Vi$6Q7$22(options)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _defaults={
over:function(){},
out:function(){},
delayOver:0,
delayOut:0
};

var _options=$.extend({},_defaults,options);




this.each(function $vpfn_9vMtRzIurpeB4FaDV9YN7w21$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var overTimer=null;
var outTimer=null;

var clearTimers=function $vpfn_yjYnXfd_FHH6o1OlaImTZA26$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(overTimer)
{
clearTimeout(overTimer);
}

if(outTimer)
{
clearTimeout(outTimer);
}
};

var mouseOver=function $vpfn_0Sbu8Bb_YjOxVPjssIGxAw39$28(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
clearTimers();

if(_options.delayOver===0)
{
_options.over.call(this,e);
}
else
{
overTimer=setTimeout(function $vpfn_9vMtRzIurpeB4FaDV9YN7w50$43(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}_options.over.call(me,e);},_options.delayOver);
}
};

var mouseOut=function $vpfn_Qq6kzAD$UPDLJpH$Zc_NNg54$27(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
clearTimers();

if(_options.delayOut===0)
{
_options.out.call(this,e);
}
else
{
outTimer=setTimeout(function $vpfn_9vMtRzIurpeB4FaDV9YN7w65$42(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}_options.out.call(me,e);},_options.delayOut);
}
};

$(this).hover(mouseOver,mouseOut);
});

return this;
};


})(jQuery);