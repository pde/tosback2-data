if (typeof(tagVars)=="undefined")
	tagVars = "";
	
if (typeof(lpUASorderTotal)!="undefined" && lpUASorderTotal!=""){
	tagVars = tagVars + '&PAGEVAR!OrderTotal=' + escape(lpUASorderTotal);
	tagVars = tagVars + '&PAGEVAR!' + lpUASunit + '_OrderTotal=' + escape(lpUASorderTotal);
	tagVars = tagVars + '&SESSIONVAR!Conversion=1';
}

if (typeof(lpUASorderTotalGoPhone)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderTotalGoPhone=' + escape(lpUASorderTotalGoPhone);
	
if (typeof(lpUASorderTotalPlanCount)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderTotalPlanCount=' + escape(lpUASorderTotalPlanCount);

if (typeof(lpUASorderTotalAddLineCount)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderTotalAddLineCount=' + escape(lpUASorderTotalAddLineCount);

if (typeof(lpUASphoneQuantity)!="undefined")
	tagVars = tagVars + '&PAGEVAR!PhoneQuantity=' + escape(lpUASphoneQuantity);

if (typeof(lpUASphoneQuantity0)!="undefined")
	tagVars = tagVars + '&PAGEVAR!PhoneQuantity0=' + escape(lpUASphoneQuantity0);

if (typeof(lpUASorderNumber)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderNumber=' + escape(lpUASorderNumber);

if (typeof(lpUASphoneValue)!="undefined")
	tagVars = tagVars + '&PAGEVAR!PhoneValue=' + escape(lpUASphoneValue);

if (typeof(lpUASphoneValue0)!="undefined")
	tagVars = tagVars + '&PAGEVAR!PhoneValue0=' + escape(lpUASphoneValue0);

if (typeof(lpUASfeatureQuantity)!="undefined")
	tagVars = tagVars + '&PAGEVAR!FeatureQuantity=' + escape(lpUASfeatureQuantity);

if (typeof(lpUASfeatureValue)!="undefined")
	tagVars = tagVars + '&PAGEVAR!FeatureValue=' + escape(lpUASfeatureValue);

if (typeof(lpUASaccessoriesQuantity)!="undefined")
	tagVars = tagVars + '&PAGEVAR!AccessoriesQuantity=' + escape(lpUASaccessoriesQuantity);

if (typeof(lpUASaccessoriesValue)!="undefined")
	tagVars = tagVars + '&PAGEVAR!AccessoriesValue=' + escape(lpUASaccessoriesValue);

if (typeof(lpUASsection)!="undefined")
	tagVars = tagVars + '&PAGEVAR!Section=' + escape(lpUASsection);

if (typeof(lpUASerrorCount)!="undefined")
	tagVars = tagVars + '&PAGEVAR!ErrorCount=' + escape(lpUASerrorCount);

if (typeof(lpUASvisitorType)!="undefined")
	tagVars = tagVars + '&SESSIONVAR!visitorType=' + escape(lpUASvisitorType);

if (typeof(lpUASconversionStage)!="undefined")
	tagVars = tagVars + '&PAGEVAR!ConversionStage=' + escape(lpUASconversionStage);

if (typeof(lpUASconversionAction)!="undefined")
	tagVars = tagVars + '&PAGEVAR!ConversionAction=' + escape(lpUASconversionAction);

if (typeof(lpUASorderDetails)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderDetails=' + escape(lpUASorderDetails);

if (typeof(lpUASorderDetails2)!="undefined")
	tagVars = tagVars + '&PAGEVAR!OrderDetails2=' + escape(lpUASorderDetails2);

if (typeof(lpUASconversionDetails)!="undefined")
	tagVars = tagVars + '&PAGEVAR!ConversionDetails=' + escape(lpUASconversionDetails);

if (typeof(lpUASvisitorID)!="undefined")
	tagVars = tagVars + '&VISITORVAR!VisitorID=' + escape(lpUASvisitorID);

var INITIAL_MAX_SIZE = 300;
var MAX_TAGVARSURL_SIZE = 1600;
var INITIAL_STRING = document.location.toString() + document.title;
var STRING_MAX_SIZE = INITIAL_STRING.length + INITIAL_MAX_SIZE;

if ((typeof(tagVars) == "undefined") || (tagVars == null))
	tagVars = "";
while ((tagVars.length + STRING_MAX_SIZE > MAX_TAGVARSURL_SIZE) && (tagVars.length > 0)) {
	var idx = tagVars.lastIndexOf("&");
	if (idx > 0)
		tagVars = tagVars.substring(0, idx);
	else
		tagVars = "";
}
