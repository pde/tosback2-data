<!--

if(!llJSP)var llJSP="";
if(!llOID)var llOID="";
if(!llEvent)var llEvent="";
if(!llProducts)var llProducts="";
if(!metricPath)var metricPath="";
if(!llCgyId)var llCgyId="";
if(!llAlpha)var llAlpha="";
if(!llDisplay)var llDisplay="";
if(!llKeyword)var llKeyword="";
if(!llQSTerm)var llQSTerm="";
if(!llFinderTerm)var llFinderTerm="";
if(!llCatId)var llCatId="";
if(!llCatDesc)var llCatDesc="";
if(!llFlashPath)var llFlashPath="";
if(!llPYOrecipts)var llPYOrecipts="";
if(!llprodName)var llprodName="";
if(!lledds)var lledds="";

 if (llProducts.length>1&&llProducts.charAt(llProducts.length-1)==","){
    llProducts=llProducts.substring(0,llProducts.length-1); //trim comma
 }
if(!llSearchEvent)var llSearchEvent="";
if(!searchNoResult)var searchNoResult="";

if(ll_o.url.indexOf("/customerService/aboutLLBean/newsroom")>-1) {
       bT="Newsroom: "+bT;
}else if(ll_o.url.indexOf("/shop/shopByCatalog")>-1) {
       bT="SBC: "+bT;
}else if(ll_o.url.indexOf("www2.llbean.com")>-1) {
   if (llCgyId.length>1) {
       bT+=" ("+llCgyId+")";
   }
 }

 if (llEvent=="scAdd"){
    if (document.cookie.indexOf("llct")>-1){
     }else{
     document.cookie="llct=1;path=/;domain=.llbean.com;";
     llEvent+=",scOpen";
    }
 }
 if (llEvent=="purchase"){
    if (document.cookie.indexOf("llct")>-1){
     document.cookie="llct=1;path=/;domain=.llbean.com;expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  s_o_sc.prop4="OrderTY";
}
if((! "prop4" in s_o_sc) ){}
else if(llEvent.indexOf('event1')>-1&&llEvent.indexOf('event10')<0){s_o_sc.prop4='IOS';}
else if(llEvent.indexOf('scAdd')>-1){s_o_sc.prop4='ATB';}
else if(llEvent.indexOf('scView')>-1){s_o_sc.prop4='ShoppingBag';}
else if(llJSP.substring(0,7)=='product'){s_o_sc.prop4="ProductPg";}
else if(llJSP=="bgindex"){s_o_sc.prop4="DeptPg";}
else if(llJSP=="pgindex"){s_o_sc.prop4="ThumbnailPg";}
else if(llJSP.substring(0,4)=="sub1"){s_o_sc.prop4="SubDeptPg";}
else if(llJSP.substring(0,4)=="sub2"){s_o_sc.prop4="Sub2DeptPg";}
else if(bT.indexOf('Begin Checkout')>-1){s_o_sc.prop4='BeginCheckout';}
else if(bT.substring(0,6)=="Log In"){s_o_sc.prop4="LogInRegister";}
else if(bT.substring(0,16)=="Express Register"){s_o_sc.prop4="ExpressRegister";}
else if(llJSP=="ordercomponent"){s_o_sc.prop4="ComponentPg";}
else if(bT.substring(0,19)=='Billing Information'){s_o_sc.prop4='BillingInfo';}
else if(bT.substring(0,16)=="Shipping Address"){s_o_sc.prop4="ShipAddress";}
else if(bT.substring(0,16)=="Shipping Options"){s_o_sc.prop4="ShipOptions";}
else if(bT.indexOf('Guide')>-1&&llEvent!='prodView'&&bT.indexOf('LargerView')<0){s_o_sc.prop4='Guide';}
else if(bT.substring(0,14)=="Order Tracking"){s_o_sc.prop4="WISMO";}
else if(bT.substring(0,10)=="Track Your"){s_o_sc.prop4="OrdTrack";}
else if(bT.substring(0,13)=="Order History"){s_o_sc.prop4="OrdHist";}
else if(bT.substring(0,13)=="Order Details"){s_o_sc.prop4="OrdDetail";}
else if(llJSP=="mainCustomization"){s_o_sc.prop4="CProdPg";}
else if(llJSP=="certsinput"){s_o_sc.prop4="GC-Coupon Redeem";}
else if((ll_o.url.indexOf("/epromo")<1)&&(ll_o.url.indexOf("/gudePages/sizeCharts")>-1||(ll_o.url.indexOf("siz")>-1&&ll_o.url.indexOf("pop")>-1)||ll_o.url.indexOf("fit_guide")>-1)) {s_o_sc.prop4="Sizing Charts";}
else {s_o_sc.prop4 = "Other"}

// Add for user Login Tracking
llLoginStatus = hasLoginCookie();


//  Add this for static pages
if(s_o_sc.prop4==''&&ll_o.url.indexOf("guidePages")>-1)s_o_sc.prop4="Guide";
if(ll_o.url.indexOf("customerService")>-1)s_o_sc.prop4="CustService";
if(s_o_sc.prop4==''&&ll_o.url.indexOf("outdoorsOnline")>-1)s_o_sc.prop4="OutdoorsOnline";
if(s_o_sc.prop4==''&&ll_o.url.indexOf("corporateSales")>-1)s_o_sc.prop4="CorpSales";
if(ll_o.url.indexOf('/chatredir/')>-1)s_o_sc.prop4="Chat";
if(s_o_sc.prop4==''&&ll_o.url.indexOf("shopByCatalog")>-1){
    if(ll_o.url.indexOf('index.html')>-1)s_o_sc.prop4="ShopByCatLander";
    if(ll_o.url.indexOf('catalog.html')>-1)s_o_sc.prop4="ShopByCatBook";
}
if(ll_o.url.indexOf("/customerService/aboutLLBean/newsroom")>-1)s_o_sc.prop4="Newsroom";

// Add this for source code pathing
var llscpath="";
if (ll_o.url.indexOf("qs=")>-1) {
   llscpath = ll_o.srcCd + " : " + bT;
} else {
   llscpath = bT;
}

// Add this for guide page tracking
// Make sure that the breadcrumbs varible are set
if(!metricDeptName)var metricDeptName="";
if(!metricSub2Name)var metricSub2Name="";
if(!metricSub3Name)var metricSub3Name="";
if(!llguide)var llguide="";

if (llJSP == "guideLanding"){
   llguide = metricSub2Name;
} else if (llJSP == "guideModule"){
   llguide = metricSub3Name;
}


// Add this for survey tracking
if(!ll_metrics_survey)var ll_metrics_survey="";

// Email Click
if (pval("qei")){
   if (llEvent == ''){
      llEvent+="event16";
   } else {
      llEvent+=",event16";
   }
   // also, edds parm? when email link ..
   if (pval("edds")) {
       lledds=pval("edds")
   }
}


//OAP apply, when from TYP
if (ll_o.url.indexOf("oap/indexSource.cgi")>-1&&(ll_o.ref.indexOf("ShowOrderThanks")>-1)){
  flexMssgType='OAPapply';
}

if (ll_o.url.indexOf("/shop/oap/popup.html")>-1&&(ll_o.ref.indexOf("ShowOrderThanks")>-1)){
  flexMssgType='OAPmore';
}

 //-->

// Omniture Varibles
s_o_sc.pageName=bT;
s_server=llsrvr;
s_channel=metricPath;
s_o_sc.pageType="";
s_o_sc.prop1=llcdata;
s_o_sc.prop2=llCgyId;
s_o_sc.prop12 = flexMssgType;
s_o_sc.prop13 = llPYOrecipts;
s_o_sc.prop30 = llp30;
s_o_sc.prop33 = (ll_o.url.indexOf("nav=")>-1?(pval("nav").indexOf("-")>-1?pval("nav").split("-")[1]:pval("nav")):"");
s_o_sc.prop34 = (ll_o.url.indexOf("nav=")>-1?pval("nav"):"");

/* E-commerce Variables */
s_campaign=ll_o.srcCd;
s_state="";
s_o_sc.zip="";
s_o_sc.events=llEvent;
s_o_sc.products=llProducts;
s_o_sc.purchaseID=llOID;
s_o_sc.eVar6=llAlpha;
s_o_sc.eVar7=llQSTerm;
s_o_sc.eVar10=llKeyword;
s_o_sc.eVar12=llCkSC;
s_o_sc.eVar14=llLoginStatus;
s_o_sc.eVar17=lledds;

s_o_sc.prop7=s_o_sc.prop4;

/* Hierarchy Variables */
s_o_sc.hier1=metricPath;
s_o_sc.hier2="";

if (llEvent=="prodView"){
        s_o_sc.hier2=llCgyId;
        s_o_sc.hier1+=":"+ llprodName;
        s_o_sc.pageName=llprodName + " (" + llCgyId + ")";
}

if (ll_o.url.indexOf("pcd=")>-1){
	ll_o.prop23 = s_o_sc.prop4+":"+pval('pcd');
}

if (typeof ll_o=="object"){
    for (var key in ll_o ) {
        s_o_sc[key] = ll_o[key];
    }
}

