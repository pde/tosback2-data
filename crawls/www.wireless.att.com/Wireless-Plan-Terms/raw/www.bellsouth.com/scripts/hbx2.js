var _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}
var hbx=_hbEvent("pv");hbx.vpc="HBX0100u";hbx.gn="a12.bellsouth.com";
//BEGIN EDITABLE SECTION
//CONFIGURATION VARIABLES
//wr 6470
hbx.acct="DM55121619AN;DM551012D0VA"; 
//e wr6470
//Strip function added 02-07-06 by Ernest Fretwell//
function stripHbx(tVal){
    var tAccStr="";
    var testStr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 @-?.";
    for (var x=0; x<tVal.length;x++)
    {
	var tChar=tVal.charAt(x);
	if (testStr.indexOf(tChar)!=-1)
	{
	    if (tChar==" ")
	    {
		tChar="+";
	    }
	    tAccStr+=tChar+"";
	}
    }
    return tAccStr;
}
var currURL = unescape(window.location.href);
hbx.pn = stripHbx(document.title);
//hbx.pn="PUT+PAGE+NAME+HERE";//PAGE NAME(S)
//Pick up action in controller.jsp Added 02/10/06 by Ernest Fretwell
var _url = document.URL;
if(_url.indexOf("controller.jsp") > 0){
var _search = location.search;
var _idx1 = _search.indexOf("?action=");
	if(_idx1 < 0){
	_idx1 = _search.indexOf("&action=");
	}
	var _idx2 = _search.indexOf("&", _idx1);
	if(_idx2 < 0){
	_idx2 = _search.length;
	}     
	if(_idx2 > _idx1){
	var _pagename = _search.substring(_idx1, _idx2);
		if(_pagename != ""){
		hbx.pn = _pagename;
		}
	}
}
// per wr8572 the following code is no longer used
//wr 7702
//    if((currURL.indexOf("/ebpp/home/resonetimeccsubmitpayment")!=-1) && (currURL.indexOf("cardType=")!=-1) )
//	{hbx.pn="Pay+from+CreditDebit+Card+Authorization";}
//    if(currURL.indexOf("/ebpp/home/resonetimeccterms")!=-1)
//	{hbx.pn="Pay+from+CreditDebit+Card+Authorization";}
//wr 6773   make ebill titles unique
//    if(currURL.indexOf("/reg/displayRegistrationPage?regFlowType=res")!=-1)
//	{hbx.pn="Residential+Registration+Entry";}
//    if(currURL.indexOf("/reg/displayRegThankYouPage")!=-1)
//	{hbx.pn="Residential+Registration+Thank+You";}
//    if((currURL.indexOf("/login/cprLogin")!=-1) && (currURL.indexOf("resonetimeecheckpayment")!=-1))
//	{hbx.pn="CPR+Login+for+EBPP";}

//    if(currURL.indexOf("/ebpp/home/resonetimeecheckpayment")!=-1)
//	{hbx.pn="eCheck+Enter+your+information";}
//    if((currURL.indexOf("/ebpp/home/resonetimeecheckterms")!=-1) && (currURL.indexOf("busUnit=CSR")!=-1))
//	{hbx.pn="eCheck+Payment+Confirmation";}
//    if((currURL.indexOf("login/cprLogin")!=-1) && (currURL.indexOf("enrollbillsuppression")!=-1))
//	{hbx.pn="eBill+enrollment+log+in";}
//    if((currURL.indexOf("enrollbillsuppression")!=-1) && (currURL.indexOf("busUnit=CSR")!=-1))
//	{hbx.pn="eBill+enrollment+entry";}
//    if((currURL.indexOf("executebillsuppression")!=-1) && (currURL.indexOf("busunit=CSR")!=-1))
//	{hbx.pn="eBill+erollment+confirmation";}
//    if((currURL.indexOf("login/cprLogin")!=-1) && (currURL.indexOf("recurringecheckenroll")!=-1) && (currURL.indexOf("busUnit=CSR")!=-1))
//	{hbx.pn="Autopay+enrollment+log+in";}
//    if(currURL.indexOf("/ebpp/home/recurringecheckenroll?busUnit=CSR")!=-1)
//	{hbx.pn="Autopay+enrollment+entry";}
//    if(currURL.indexOf("/ebpp/home/recurringechecktermssubmit?busUnit=CSR")!=-1)
//	{hbx.pn="Autopay+enrollment+confirmation";}
// e wr6773

hbx.mlc="CONTENT+CATEGORY";//MULTI-LEVEL CONTENT CATEGORY
hbx.pndef="title";//DEFAULT PAGE NAME
hbx.ctdef="full";//DEFAULT CONTENT CATEGORY

//OPTIONAL PAGE VARIABLES
//ACTION SETTINGS
hbx.fv="";//FORM VALIDATION MINIMUM ELEMENTS OR SUBMIT FUNCTION NAME
hbx.lt="auto";//LINK TRACKING
hbx.lvm = 650;
hbx.dlf="n";//DOWNLOAD FILTER
hbx.dft="n";//DOWNLOAD FILE NAMING
hbx.elf="n";//EXIT LINK FILTER

//SEGMENTS AND FUNNELS
hbx.seg="";//VISITOR SEGMENTATION
hbx.fnl="";//FUNNELS

//CAMPAIGNS
hbx.cmp="";//CAMPAIGN ID
hbx.cmpn="";//CAMPAIGN ID IN QUERY
hbx.dcmp="";//DYNAMIC CAMPAIGN ID
hbx.dcmpn="";//DYNAMIC CAMPAIGN ID IN QUERY
hbx.dcmpe="";//DYNAMIC CAMPAIGN EXPIRATION
hbx.dcmpre="";//DYNAMIC CAMPAIGN RESPONSE EXPIRATION
hbx.hra="";//RESPONSE ATTRIBUTE
hbx.hqsr="";//RESPONSE ATTRIBUTE IN REFERRAL QUERY
hbx.hqsp="";//RESPONSE ATTRIBUTE IN QUERY
hbx.hlt="";//LEAD TRACKING
hbx.hla="";//LEAD ATTRIBUTE
hbx.gp="";//CAMPAIGN GOAL
hbx.gpn="";//CAMPAIGN GOAL IN QUERY
hbx.hcn="";//CONVERSION ATTRIBUTE
hbx.hcv="";//CONVERSION VALUE
hbx.cp="null";//LEGACY CAMPAIGN
hbx.cpd="";//CAMPAIGN DOMAIN

//CUSTOM VARIABLES
hbx.ci="";//CUSTOMER ID
var _cv = _hbEvent("cv");
hbx.hc1="";// Login: View | Target
hbx.hc2="";// New Service State
hbx.hc3="";// Bill View: Account | Month
hbx.hc4="";// Bill Section: Section | Page
hbx.hc5="";// Targeting: Product | Message
hbx.hrf="";//CUSTOM REFERRER
hbx.pec="";//ERROR CODES

//INSERT CUSTOM EVENTS
//Search string capture added 03-10-06 by Ernest Fretwell
var ev1 = new _hbEvent("search");
ev1.keywords = "";  // POPULATE THIS VARIABLE WITH THE VALUE OF "question_box"
ev1.results = "0"; // POPULATE THIS VARIABLE WITH EITHER A "1" OR A "0" (SEE COMMENTS)
ev1.attr1 = ""; // THESE ARE RESERVED FOR FUTURE USE - THE BELLSOUTH 
ev1.attr2 = ""; // SEARCH DOES NOT REQUIRE ANYTHING AT THIS TIME
ev1.attr3 = ""; //
ev1.attr4 = ""; //
//END EDITABLE SECTION
//wr 6808
function _hbOnPrePVR(){
   for(var i=0; i<document.links.length;i++){
       document.links[i].name = document.links[i].id;
   }
}
//e wr 6808
//Added for InQ reports.
function hbxPageView(pagename) {
_hbPageView(pagename, _mlc);
} 
