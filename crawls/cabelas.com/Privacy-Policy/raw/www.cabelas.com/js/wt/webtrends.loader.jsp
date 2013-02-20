
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcs6g4r3600000s9y2qnd8hqq_4p9q"   //This is customized per site
        ,site:"1"                                //This is customized per site
        ,domain:"statse.webtrendslive.com"
        ,timezone:"-7"                           //This is customized per site
        ,enabled:"true"                          //This is customized per site/environment
        ,i18n:false
        ,offsite:true
        ,download:true
        ,downloadtypes:"xls,doc,pdf,txt,csv,zip"
        ,anchor:true
        ,metanames:"vartest"
        ,javascript: true
        ,cookieexpires:0
        ,onsitedoms:""
        ,adclickparam:"WT.ac"
        ,fpcdom:""
        ,plugins:{
            CabelasWT:{src:"/js/wt/cabelas.js"}
        }
        }).track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="/js/wt/webtrends.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());