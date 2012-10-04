/*
 * cmcustom.js for IBM Websphere Commerce
 * $Id: cmcustom_websphere_commerce.js,v 1.2 2011/10/26 18:40:14 mcgrind Exp $
 * $Revision: 1.2 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 */

var cm_exAttr=new Array();  
var cmCheckCMEMFlag = true;	
var cmSendOSLinkClickTag = true;
var cmAutoCopyAttributesToExtraFields = false;

function cmCreatePageviewTag(__pi,__cg,__se,__sr, store_id, attributes, extraFields) {	
	cmMakeTag(["tid","1","pi",__pi,"cg",__cg,"se",__se,"sr",__sr,"pc","Y","pv11",store_id,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateDefaultPageviewTag(__cg) {
	cmCreatePageviewTag(cmGetDefaultPageID(),__cg);
}

function cmCreateProductviewTag(__pi,__pr,__pm,__cg,store_id,pageCount,masterItemCategory,catIDoverride,attributes,cm_vc) {
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}
	if ((pageCount == null) || pageCount == "") {
		pageCount = 'Y';
	}
	if ((__pi == null) || (__pi == "") || (pageCount == "N")) {
		__pi = cG7.cM0[cm_ClientID];
	}
	cmMakeTag(["tid","5","pi",__pi,"pr",__pr,"pm",__pm,"cg",__cg,"pc",pageCount,"pv11",store_id,"cm_vc",cm_vc ? cm_vc : cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateShopAction5Tag(__pr,__pm,__qt,__bp,__cg,store_id,currency,masterItemCategory,catIDoverride,attributes,extraFields) {
    __bp = __bp.toString().replace(cmPricePattern, "");
	__pr = __pr.toString().replace(cmSpacePattern, "");
	if (catIDoverride)	{
		if (catIDoverride != "0") {		// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	} 
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"at","5","tid","4","pc","N","sx11",store_id,"cc",currency]);
}

function cmCreateShopAction9Tag(__pr,__pm,__qt,__bp,__cd,__on,__tr,__cg,store_id,currency,account_name,contract_name,masterItemCategory,catIDoverride,attributes,extraFields) {
    __bp = __bp.toString().replace(cmPricePattern, "");
	__tr = __tr.toString().replace(cmPricePattern, "");
	__pr = __pr.toString().replace(cmSpacePattern, "");
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}	  
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cd",__cd,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"on",__on,"tr",__tr,"at","9","tid","4","pc","N","sx11",store_id,"cc",currency,"sx13",account_name,"sx14",contract_name]);
	cmCalcSKUString();
}

function cmCreateOrderTag(__on,__tr,__sg,__cd,__ct,__sa,__zp, store_id, currency, promotion_name, promotion_discount, promotion_code,attributes,extraFields) {
	if (((promotion_code == null) || (promotion_code == "")) && promotion_name) { promotion_code = "No Code"; } 
    __sg = __sg.toString().replace(cmPricePattern, "");
	__tr = __tr.toString().replace(cmPricePattern, "");
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",__on,"tr",__tr,"sg",__sg,"cd",__cd,"ct",__ct,"sa",__sa,"zp",__zp,"or11",store_id,"cc",currency,"or13",promotion_name,"or14",promotion_discount,"or15",promotion_code,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateRegistrationTag(__cd,__em,__ct,__sa,__zp,__nl,__sd, store_id, customer_country, age, gender, marital_status, num_children, num_in_household, company_name, hobbies, income,attributes) {
	 if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",__cd,"em",__em,"ct",__ct,"sa",__sa,"zp",__zp,"nl",__nl,"sd",__sd,
	"cy",customer_country,"ag",age,"gd",gender,"ml",income,"cm_exAttr",cm_exAttr]);
}