// csct.att.com/scripts/csct.js     Version 3.0     09/10/2008
 
// This is the Visual Sciences tagging script ... it also is used to call
// the WebTrends tagging script dcs_tag.js as its final step.

// Ownership transferred to fh5430 ... questions to him

// 01/22/2007 sd3452 added all applications and also cache control
// 02/07/2007 sd3452 removed Atlas code related to all applications except SWOT
// 02/17/2007 VS new script sent by VS
// 03/06/2007 sd3452 document.URL added as dl
// 03/06/2007 sd3452 New atlas tag applied
// 06/06/2007 sd3452 New function handleAddRemoveProduct -added
// 07/31/2007 sd3452 New function to combine atlas product -  combineAtlasProducts
// 07/31/2007 sd3452 New function to handle atlas tag with orderids -handleAtlasWithOrder
// 07/31/2007 sd3452 New condition for firing different Atlas tags 
// 07/31/2007 sd3452 based on presence of orderid. Certain events (DSL Loop) have single hard coded pid_s value
// 07/31/2007 sd3452 removed function "checkMultiple"  for non-orders, the pid_s field contains just one hardcoded value.
// 11/27/2007 sd3452 added functions for Sirius/DE
// 11/27/2007 sd3452 updated add/remove to include upsell/crosssell
// 08/15/2008 fh5430 Added call to WebTrends dcs_tag.js as final step of proggie
// 09/10/2008 fh5430 Ownership transferred to fh5430 ... questions to him
// 09/10/2008 fh5430 handleProducts has defensive code to prevent split of non-existent variables
// 09/19/2008 fh5430 Added code to set DCSext variables for WebTends
// 10/17/2008 fh5430 added conditional setting of DCSext


var SrcAddRemoveProd=/(AddToCart|RemoveFromCart|UpSell|CrossSell)/i;

var vs_ct = "<img src=";
var vs_cd = "//csct.att.com";
var vs_cu = "/csct.gif?Log=1";
var vs_ce = ">";

var vs_vo = "";
var vs_d = {};

vs_d["dt"] = document.title;
vs_d["dr"] = document.referrer;
vs_d["dl"] = document.URL;
vs_d["cb"] = new Date().getTime();

for ( dKey in vs_d ) {
                  vs_vo = vs_vo+"&"+dKey+"="+escape2(vs_d[dKey]);
}
if (typeof v != "undefined") {
            for ( vKey in v ) {
                        vs_vo = vs_vo+"&"+vKey+"="+escape1(v[vKey]);
            }
}
if (typeof v_001 != "undefined") {
            for ( v_001Key in v_001 ) {
                        vs_vo = vs_vo+"&"+v_001Key+"="+escape1(v_001[v_001Key]);
            }
}
if (typeof v_002 != "undefined") {
            for ( v_002Key in v_002 ) {
                        vs_vo = vs_vo+"&"+v_002Key+"="+escape1(v_002[v_002Key]);
            }
}
if (typeof v_003 != "undefined") {
            for ( v_003Key in v_003 ) {
                        vs_vo = vs_vo+"&"+v_003Key+"="+escape1(v_003[v_003Key]);
            }
}
if (typeof v_004 != "undefined") {
            for ( v_004Key in v_004 ) {
                        vs_vo = vs_vo+"&"+v_004Key+"="+escape1(v_004[v_004Key]);
            }
}
if (typeof v_005 != "undefined") {
            for ( v_005Key in v_005 ) {
                        vs_vo = vs_vo+"&"+v_005Key+"="+escape1(v_005[v_005Key]);
            }
}
if (typeof v_006 != "undefined") {
            for ( v_006Key in v_006 ) {
                        vs_vo = vs_vo+"&"+v_006Key+"="+escape1(v_006[v_006Key]);
            }
}
if (typeof v_007 != "undefined") {
            for ( v_007Key in v_007 ) {
                        vs_vo = vs_vo+"&"+v_007Key+"="+escape1(v_007[v_007Key]);
            }
}
if (typeof v_008 != "undefined") {
            for ( v_008Key in v_008 ) {
                        vs_vo = vs_vo+"&"+v_008Key+"="+escape1(v_008[v_008Key]);
            }
}
if (typeof v_009 != "undefined") {
            for ( v_009Key in v_009 ) {
                        vs_vo = vs_vo+"&"+v_009Key+"="+escape1(v_009[v_009Key]);
            }
}
if (typeof v_010 != "undefined") {
            for ( v_010Key in v_010 ) {
                        vs_vo = vs_vo+"&"+v_010Key+"="+escape1(v_010[v_010Key]);
            }
}
if (typeof v_011 != "undefined") {
            for ( v_011Key in v_011 ) {
                        vs_vo = vs_vo+"&"+v_011Key+"="+escape1(v_011[v_011Key]);
            }
}
if (typeof v_012 != "undefined") {
            for ( v_012Key in v_012 ) {
                        vs_vo = vs_vo+"&"+v_012Key+"="+escape1(v_012[v_012Key]);
            }
}
if (typeof v_013 != "undefined") {
            for ( v_013Key in v_013 ) {
                        vs_vo = vs_vo+"&"+v_013Key+"="+escape1(v_013[v_013Key]);
            }
}
if (typeof v_014 != "undefined") {
            for ( v_014Key in v_014 ) {
                        vs_vo = vs_vo+"&"+v_014Key+"="+escape1(v_014[v_014Key]);
            }
}

// THis is where the csct.gif execution for VS tagging occurs

document.write(vs_ct,vs_cd,vs_cu,vs_vo,vs_ce);

function escape1(s){return escape(s).replace(/\+/g,"%20") }
function escape2(s){return escape(s).replace(/\+/g, "%2B") }

if ( typeof v_001 != "undefined" && typeof v_001["pid_s"] != "undefined" ) {
        var products = new Array();
        products = handleProducts(v_001["pid_s"], v_001["rr"], v_001["nrr"], v_001["ot"]);

        for ( var x = 0; x < products.length; x++ ) {
                var pdt = "&cb=" + new Date().getTime();
                pdt = pdt + x;
                document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
        }
}

if ( typeof v_002 != "undefined" && typeof v_002["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_002["pid_s"], v_002["rr"], v_002["nrr"], v_002["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_003 != "undefined" && typeof v_003["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_003["pid_s"], v_003["rr"], v_003["nrr"], v_003["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}



if ( typeof v_004 != "undefined" && typeof v_004["pid_s"] != "undefined" 
   && !( SrcAddRemoveProd.test(v_004["ac"])) ) {

	var products = new Array();
	products = handleProducts(v_004["pid_s"], v_004["rr"], v_004["nrr"], v_004["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
		
	}
}



if ( typeof v_004 != "undefined" && typeof v_004["pid_s"] != "undefined" && ( SrcAddRemoveProd.test(v_004["ac"]) ) ) {	
	var productAddRemove = new Array();
	productAddRemove = handleAddRemoveProd(v_004["pid_s"],v_004["ac"]);

	for ( var x = 0; x < productAddRemove.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,productAddRemove[x],pdt,vs_ce);
		}
} 

if ( typeof v_004 != "undefined" && typeof v_004["atlas"] != "undefined" && v_004["atlas"].toUpperCase() == "Y" ) {
	
	// if order is populated do
	if (typeof v_004["oid"] != "undefined"){	
	  var atlas_source = handleAtlasWithOrder(v_004["mkt"], v_004["pid_s"], v_004["ac"], v_004["rc"],v_004["oid"]);
	}	
	// if no order id
	 else {
	  var atlas_source = handleAtlas(v_004["mkt"], v_004["pid_s"], v_004["ac"], v_004["rc"]);
	 }
	
	document.write(atlas_source);
	
}




if ( typeof v_004 != "undefined" && typeof v_004["atlas"] != "undefined" && typeof v_004["ac"] != "undefined" && v_004["atlas"].toUpperCase() == "Y" && v_004["ac"].toUpperCase() == "SUBMITORDER" ) {
	// do atlas static tag
	handleAtlasStatic();
}

if ( typeof v_005 != "undefined" && typeof v_005["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_005["pid_s"], v_005["rr"], v_005["nrr"], v_005["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_006 != "undefined" && typeof v_006["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_006["pid_s"], v_006["rr"], v_006["nrr"], v_006["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

// v_007 is used for testing

if ( typeof v_008 != "undefined" && typeof v_008["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_008["pid_s"], v_008["rr"], v_008["nrr"], v_008["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_009 != "undefined" && typeof v_009["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_009["pid_s"], v_009["rr"], v_009["nrr"], v_009["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_010 != "undefined" && typeof v_010["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_010["pid_s"], v_010["rr"], v_010["nrr"], v_010["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_011 != "undefined" && typeof v_011["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_011["pid_s"], v_011["rr"], v_011["nrr"], v_011["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_012 != "undefined" && typeof v_012["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_012["pid_s"], v_012["rr"], v_012["nrr"], v_012["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_013 != "undefined" && typeof v_013["pid_s"] != "undefined" ) {
	var products = new Array();
	products = handleProducts(v_013["pid_s"], v_013["rr"], v_013["nrr"], v_013["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
	}
}

if ( typeof v_014 != "undefined" && typeof v_014["pid_s"] != "undefined" 
   && !( SrcAddRemoveProd.test(v_014["ac"])) ) {

	var products = new Array();
	products = handleProducts(v_014["pid_s"], v_014["rr"], v_014["nrr"], v_014["ot"]);

	for ( var x = 0; x < products.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,products[x],pdt,vs_ce);
		
	}
}

if ( typeof v_014 != "undefined" && typeof v_014["pid_s"] != "undefined" && ( SrcAddRemoveProd.test(v_014["ac"]) ) ) {	
	var productAddRemove = new Array();
	productAddRemove = handleAddRemoveProd(v_014["pid_s"],v_014["ac"]);

	for ( var x = 0; x < productAddRemove.length; x++ ) {
		var pdt = "&cb=" + new Date().getTime();
		pdt = pdt + x;
		document.write(vs_ct,vs_cd,vs_cu,productAddRemove[x],pdt,vs_ce);
		}
} 


//  At this point in csct.js, a variable vs_vo will contain the string of
//  all query name-value pairs to be sent to Visual Sciences.  These 
//  include some of the standard names like "di", "dt", etc. but may also 
//  contain "_pn" for Page name and  possible values for all other 
//  "extended variables".  As we decide to take these VS variables into WT, 
//  a new line below must be added for each to convert them into the
//  standard DCSext variable form for interpretation within dcs_tag.js.

//  vs_vo  contains an ampersand delimited string as follows:  &a=1&b=2&c=3
//  There is always a leading ampersand followed by several name-value pairs.

if ( typeof(vs_vo) != "undefined" )
{

if (typeof(DCSext)=="undefined") { var DCSext=new Object(); } 
var qsvars = vs_vo.split("&") ;   // form an array of the name-value pairs

for (var i=1 ; i<qsvars.length ; i++)   // start with 1 because vs_vo starts with &
{
var pair = qsvars[i].split("=") ; 

if ( pair[0] == "_pn" )   { DCSext.wtPN  = pair[1] ; }         // Set Page Name
if ( pair[0] == "ec" )    { DCSext.wtVSUverseErr = pair[1] ; } // UVerse error Code 
if ( pair[0] == "btn" )   { DCSext.wtVSBTN = pair[1] ; }       // Telephone Number 
if ( pair[0] == "aid" )   { DCSext.wtVSAuthID = pair[1] ; }    // Authentication Identifier 
if ( pair[0] == "ui" )    { DCSext.wtVSuserinfo = pair[1] ; }  // User Supplied Information 
if ( pair[0] == "rc" )    { DCSext.wtVSRegion = pair[1] ; }    // Region Code 
if ( pair[0] == "ac" )    { DCSext.wtVSAction = pair[1] ; }    // Action Code 
if ( pair[0] == "mkt" )   { DCSext.wtCustType = pair[1] ; }    // Market 
if ( pair[0] == "sc" )    { DCSext.wtState = pair[1] ; }       // State Code 
if ( pair[0] == "zc" )    { DCSext.wtZipCode = pair[1] ; }     // Zip Code 
if ( pair[0] == "paper" ) { DCSext.wtVSPaperSupp = pair[1] ; } // Paper Suppress 

if ( pair[0] == "oid" )   { DCSext.wtVSOrderID = pair[1] ; }   // Order ID 
if ( pair[0] == "pid_s" ) { DCSext.wtVSOrderProducts = pair[1] ; } // Product String 
if ( pair[0] == "rr" )    { DCSext.wtVSOrderRR = pair[1] ; }   // Recurring Revenue String 
if ( pair[0] == "nrr" )   { DCSext.wtVSOrderNRR = pair[1] ; }  // Non-recurring Revenue String 
if ( pair[0] == "ot" )    { DCSext.wtVSOrderType = pair[1] ; } // Order Type String 

}
}

//The line below are added to call the WebTrends tag call as the final step of csct.js

document.write('<s'+'cript language="JavaScript" src="//www.wireless.att.com/webtrends/scripts/dcs_tag.js"></s'+'cript>')

//*********************************
//Global internal variable
var internal = false;

//*****************************************************
//SET GLOBAL internal to true
function setInternal()
{
	internal = true;
}

//*****************************************************
//FORM FIELD COLLECTION
// add to <form> element: onsubmit='AppendFormValues(this)' or to the funciton used in onsubmit as AppendFormValues(document.formname)
function AppendFormValues(v_form)
{
	setInternal();
	var formImg = new Image;
	var formvalues = 'FormName=' + v_form.name + '&';
	for (var i=0; i<v_form.length; i++)
	{
		var item = v_form.elements[i];
		var formitem = item.name;
		var formvalue = item.value;
		if (item.type.toLowerCase() != 'password' && item.type.toLowerCase() != 'checkbox') {
			formvalues += escape1(formitem) + '=' + escape1(formvalue) + '&';
		}
		if (item.type.toLowerCase() == 'checkbox') {
			formvalues += escape1(formitem) + '=' + escape1(item.checked) + '&';
		}
	}
formImg.src = vs_cd + vs_cu + "&" + formvalues + "cd=" + new Date().getTime();
}

//*****************************************************
//ABANDONED FORM FIELD COLLECTION
// requires onunload="sendFormValues()" in body element
function sendFormValues()
{
	if (typeof v != "undefined") {
		if (internal == false && vif == "1") {
		var formImg = new Image;
			if (document.forms[0]){
				if (document.forms){
					var forms = document.forms, v_form, j=0;
					while (v_form = forms[j++])
					{
						var itemcount = 0;
						var formvalues;
						if (v_form.name != "") {
							formvalues = 'FormName=' + v_form.name + '&';
						}
						else {
							formvalues = 'FormName=' + v_form.id + '&';
						}
						for (var i=0; i<v_form.length; i++)
						{
							var item = v_form.elements[i];
							var formitem = v_form.name + "_" + item.name;
							var formvalue = item.value;
							if (item.type.toLowerCase() != 'password' && item.type.toLowerCase() != 'checkbox' && formvalue != '') {
								formvalues += escape1(formitem) + '=' + escape1(formvalue) + '&';
								itemcount++;
							}
							if (item.type.toLowerCase() == 'checkbox') {
								formvalues += escape1(formitem) + '=' + escape1(item.checked) + '&';
								itemcount++;
							}
						}
						if (itemcount != 0)
							formImg.src = vs_cd + vs_cu + "&AbandonedForm=true&" + formvalues + "cd=" + new Date().getTime();
					}
				}
			}
		}
	}
}

function addToWindowOnUnLoad(funct) {
	if (typeof vif != "undefined") {
		if (vif == "1") {
			var oldUnload = window.onunload;
			if (typeof window.onunload != 'function') {
				window.onunload = funct;
			} 
			else {
				window.onunload = function() {
					oldUnload();
					funct();
				}
			}
		}
	}
}


//*****************************************************
//URL TRACKING
function TrackURL(v_url) {
	var urlImg = new Image;
	urlImg.src = vs_cd + vs_cu + "&trackurl=" + v_url + "&cd=" + new Date().getTime();
}


//*****************************************************
//LINK CLICK TRACKING

//REFERENCE LINK PAGE TAG

function startCapture(){
	//TO CAPTURE LINK CLICKS
	if (typeof vlc != "undefined") {
		if (vlc == "1"){captureLink();}
	}
}

//BEGIN LINK CAPTURE PAGE TAG
function captureLink(){
	if (document.links[0]){
		
		if (document.links){
			var links = document.links, link, k=0;
			var oldOnclick = new Array;
			while(link=links[k++]) {
				oldOnclick[k] = link.onclick;
				if (typeof link.onclick != 'function') {
					link.onclick = captureLinkName;
				}
				else if (typeof link.onmouseup != 'function') {
					link.onmouseup = captureLinkName;
				}
				else {
					link.onmousedown = captureLinkName;
				}
			}
		}
		
	}
}
function captureLinkName() {
	var lc=new Image();
	//setInternal();
	this.parent = this.parentNode;
	lc.src= vs_cd + vs_cu + '&linkid=' + escape1(this.id) + "&linkurl=" + escape2(this.href) + "&cd=" + new Date().getTime();
}

function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
}

function handleProducts(pid_s, rr, nrr, ot) {
	var aryPid = new Array();
	var aryrr = new Array();
	var arynrr = new Array();
	var aryot = new Array();

	var aryProducts = new Array();

	if ( typeof rr != "undefined" && typeof nrr != "undefined" && typeof ot != "undefined" )
	{
	aryPid = pid_s.split('|');
	aryrr = rr.split('|');
	arynrr = nrr.split('|');
	aryot = ot.split('|');

	if ( aryPid.length == aryrr.length && aryrr.length == arynrr.length ) { 

		for (var x = 0; x < aryPid.length; x++) {
			aryProducts[x] = "&pid_s=" + aryPid[x] + "&rr=" + aryrr[x] + "&nrr=" + arynrr[x] + "&ot=" + aryot[x] + "&ac=vs_product_countable";
		}
	}

	}
	return aryProducts;
}

function handleAddRemoveProd(pid_s,ac) {
	var aryProductAddRemove = new Array();
	
	aryProductAddRemove = pid_s.split('|');	

	 for (var x = 0; x < aryProductAddRemove.length; x++) {
			aryProductAddRemove[x] = "&pid_s=" + aryProductAddRemove[x] + "&ac=" + ac;
		}
	return aryProductAddRemove;
}




function handleAtlas(market, product, action, region) {

	var atlas_ct = "<img src=";
	var atlas_cd = "http://switch.atdmt.com/";
//	var atlas_cu = "action/adotst_EDTestActionTag_7/v3/ato."+readCookie("v1st");
	var atlas_cu = "action/atab2c_SWOTConfirm_7/v3/ato."+readCookie("v1st");
	var atlas_1 = "/[atc1." + market;
	var atlas_2 = "/atc2." + product;
	var atlas_3 = "/atc3." + action;
	var atlas_4 = "/atc4." + region;
	var atlas_ce = "]>";

	var combinedVars = atlas_ct + atlas_cd + atlas_cu;
	var combinedVars = combinedVars + atlas_1 + atlas_2 + atlas_3 + atlas_4;
	var combinedVars = combinedVars + atlas_ce;
	
	return combinedVars;
}

function combineAtlasProducts(pid_s) {

   var combinedProducts="";
   var aryPid = new Array();

   aryPid =   pid_s.split('|') ;

   for (var x = 0; x < aryPid.length; x++) {     
      if (aryPid.length ==1)  {    
       combinedProducts="/atc2." + aryPid[x] ;  
      }
      else {
       combinedProducts = combinedProducts + "/[atc2." + aryPid[x] + "]";
        }
    }// for   
     return combinedProducts; 
} //end-combineProducts 

function handleAtlasWithOrder(market, product, action, region,orderid) {
  var combinedWithOrderVars;
	var atlas_ct = "<img src=";
	var atlas_cd = "http://switch.atdmt.com/";
	var atlas_cu = "action/atab2c_SWOTConfirm_7/v3/ato."+ readCookie("v1st") + "/ord." + orderid;
	var atlas_1 = "/atc1." + market ;	
	var atlas_2 = combineAtlasProducts(product);
	var atlas_3 = "/atc3." + action;
	var atlas_4 = "/atc4." + region;	var atlas_ce = ">";
     
	 combinedWithOrderVars = atlas_ct + atlas_cd + atlas_cu;
	 combinedWithOrderVars =  combinedWithOrderVars+ atlas_1 + atlas_2 + atlas_3 + atlas_4 ;
	 combinedWithOrderVars =  combinedWithOrderVars + atlas_ce;
	
	return combinedWithOrderVars;
}//-handleAtlasWithOrder


function handleAtlasStatic() {
	document.write('<s'+'cript language="JavaScript" src="https://switch.atdmt.com/jaction/atab2c_ATTSWOTOrderConfirmUniversalActionTag_7"></s'+'cript>')

}

//INITIATE FUNCTIONS ONLOAD
function addEvent(obj, evType, fn){
	if (obj.addEventListener){
	    obj.addEventListener(evType, fn, false);
	    return true;
	} else if (obj.attachEvent){
	    var r = obj.attachEvent("on"+evType, fn);
	    return r;
	} else {
	    return false;
	}
}

//INITIATE FUNCTIONS ONLOAD AND ONUNLOAD
addEvent(window, 'load', startCapture);
addToWindowOnUnLoad(sendFormValues);
