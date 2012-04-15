//v16
baynote_getMetaInfo();
function baynote_getUrlParam(B){
	var A="[\\?&]"+B+"=([^&#]*)";
	var D=new RegExp(A);
	var E=baynote_getPageUrl();
	var C=D.exec(E);
	if(C==null)
		return"";
	else
		return C[1];
}

function baynote_getPageUrl(){
	var A=baynote_tag.url;
	if((typeof (A)=="undefined")||(A==null)||(A==""))
		A=window.location.href;
	return A;
}

if(window.location.href.search(/advancedsearch.motorola.com/i)!=-1){
	code=baynote_getUrlParam("cc");
	if(code=="")
		code=baynote_getUrlParam("code");
}
else
	var code=get_cc();

if(typeof (code)&&code!="")
{
	var bn_locHref = window.location.href;
	if (bn_locHref.indexOf("https://") == 0) {
		baynote_tag.server = "https://motorola" + "-" + code + ".baynote.net";
	} else {
		baynote_tag.server = "http://motorola" + "-" + code + ".baynote.net";
	}
	baynote_tag.code=code;
	baynote_tag.customerId="motorola";
	baynote_tag.type="baynoteObserver";
	if(window.location.href.search(/custhelp.com/i) != -1){
		baynote_globals.cookieDomain="custhelp.com";
	}
	else{
		baynote_globals.cookieDomain="motorola.com";
	}
	baynote_globals.cookieSubDomain= code;
	
	if(typeof (language)&&language!="")
		baynote_tag.docAttrs.language=language;
	if(typeof (country)&&country!="")
		baynote_tag.docAttrs.country=country;

	//MD Meta Data
	if(typeof (srchCategory)&&srchCategory!="")
		baynote_tag.docAttrs.srchCategory=srchCategory;
	if(typeof (srchCategoryTranslation)&&srchCategoryTranslation!="")
		baynote_tag.docAttrs.srchCategoryTranslation=srchCategoryTranslation;
	if(typeof (srchDescription)&&srchDescription!="")
		baynote_tag.docAttrs.srchDescription=srchDescription;
	if(typeof (srchName)&&srchName!="")
		baynote_tag.docAttrs.srchName=srchName;
	if(typeof (srchPageType)&&srchPageType!="")
		baynote_tag.docAttrs.srchPageType=srchPageType;
	if(typeof (srchTemplateName)&&srchTemplateName!="")
		baynote_tag.docAttrs.srchTemplateName=srchTemplateName;
	if(typeof (srchThumbnailUrl)&&srchThumbnailUrl!="")
		baynote_tag.docAttrs.srchThumbnailUrl=srchThumbnailUrl;
	
	//BMS Meta Data
	if(typeof (productLine)&&productLine!="")
		baynote_tag.docAttrs.ProductLine=productLine;
	if(typeof (productCategory)&&productCategory!="")
		baynote_tag.docAttrs.ProductCategory=productCategory;
	if(typeof (industries)&&industries!="")
		baynote_tag.docAttrs.Industries=industries;
	if(typeof (pageType)&&pageType!="")
		baynote_tag.docAttrs.PageType=pageType;
	if(typeof (businessUnit)&&businessUnit!="")
		baynote_tag.docAttrs.BusinessUnit=businessUnit;
	if(typeof (documentType)&&documentType!="")
		baynote_tag.docAttrs.DocumentType=documentType;
	if(typeof (solutionCategory)&&solutionCategory!="")
		baynote_tag.docAttrs.SolutionCategory=solutionCategory;
	if(typeof (accessory)&&accessory!="")
		baynote_tag.docAttrs.Accessory=accessory;
	
	//Event Attribute Info
	if (window.location.href.search(/business/i) != -1)
		baynote_tag.attrs.motoLocale = locale + "-b2b";
	else if (window.location.href.search(/consumer/i) != -1)
		baynote_tag.attrs.motoLocale = locale + "-b2c";
	else if ((window.location.href.search(/support/i) != -1) || (window.location.href.search(/custhelp/i) != -1))
		baynote_tag.attrs.motoLocale = locale + "-Support";
	else
		baynote_tag.attrs.motoLocale = locale + "-corp";
	
	if(locale != ""){
		baynote_tag.attrs.siteLocale = locale;
	}
	
	if(locale != "" && (typeof (dcsextresourcelibrary) && (dcsextresourcelibrary!=""))){
		baynote_tag.attrs.rlLocale = locale;
	}
	
	//Summary and Showing Baynote Tag - Keep as last.
	if(typeof (description)&&description!="")
		baynote_tag.summary=description;
	baynote_tag.show();
};