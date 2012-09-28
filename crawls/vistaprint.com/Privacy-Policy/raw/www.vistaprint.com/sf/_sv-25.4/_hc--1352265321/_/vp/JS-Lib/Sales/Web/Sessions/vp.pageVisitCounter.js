                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}

if(typeof vp=="undefined")
{
var vp={};
}





if(typeof vp.pageVisitCounter=="undefined")
{
vp.pageVisitCounter=function(){};
}


vp.pageVisitCounter.MAX_PAGE_VISITS;
vp.pageVisitCounter.SESSION_COOKIE_NAME="SESH";
vp.pageVisitCounter.SESSION_COOKIE_COUNTER_NAME="PV";
vp.pageVisitCounter.PAGE_VISIT_RECORDED=false;




vp.pageVisitCounter.recordVisit=function $vpfn_T7VJPmrUxd7$XERFtp9reg26$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.pageVisitCounter.PAGE_VISIT_RECORDED)
{
return;
}


vp.pageVisitCounter.PAGE_VISIT_RECORDED=true;

var currentNumberOfPageVisits=vp.cookies.getSubValue(vp.pageVisitCounter.SESSION_COOKIE_NAME,vp.pageVisitCounter.SESSION_COOKIE_COUNTER_NAME);


if(!currentNumberOfPageVisits)
{
vp.pageVisitCounter.markVisitsInCookie("1");
}
else
{

currentNumberOfPageVisits++;

if(currentNumberOfPageVisits<=vp.pageVisitCounter.MAX_PAGE_VISITS)
{
vp.pageVisitCounter.markVisitsInCookie(currentNumberOfPageVisits);
}
}
};




vp.pageVisitCounter.markVisitsInCookie=function $vpfn_gYKkixoiNjua$7Psod8_sg59$41(sNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.cookies.setSubValue(vp.pageVisitCounter.SESSION_COOKIE_NAME,vp.pageVisitCounter.SESSION_COOKIE_COUNTER_NAME,sNumber);
};
