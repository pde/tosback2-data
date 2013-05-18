                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}

if(typeof vp=="undefined")
{
var vp={};
}

vp.bootstrap={};

vp.bootstrap._handlers=[];
vp.bootstrap._savedExceptions=[];






vp.bootstrap.onReady=function $vpfn_owT$8TlTfl7VQmaNL0r_Tw18$23(fn)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.bootstrap.isReady)
{
fn();
}
else
{
vp.bootstrap._handlers.push(fn);
}
};




vp.bootstrap.finish=function $vpfn_ms$9UrTG6H0i9M$45PAOaw33$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.bootstrap.isReady=true;

for(var i=0;i<vp.bootstrap._handlers.length;i++)
{
vp.bootstrap._handlers[i]();
}
};







vp.bootstrap.logException=function $vpfn_YNStV07y6uH_5eY0oV9rjA49$28(ex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(vp.bootstrap._exceptionLogger)=="function")
{
vp.bootstrap._exceptionLogger(ex);
}
else
{
vp.bootstrap._savedExceptions.push(ex);
}
};





vp.bootstrap.setExceptionLogger=function $vpfn_ipCNgDG_oqN7qoWu$9fpyA65$34(fn)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(fn)=="function")
{
vp.bootstrap._exceptionLogger=fn;

for(var i=0;i<vp.bootstrap._savedExceptions.length;i++)
{
vp.bootstrap._exceptionLogger(vp.bootstrap._savedExceptions[i]);
}


vp.bootstrap._savedExceptions=[];
}
};




var predictad_ac_off=1;