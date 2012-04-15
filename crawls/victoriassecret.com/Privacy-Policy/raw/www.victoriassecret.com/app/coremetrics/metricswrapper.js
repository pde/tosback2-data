//Troymetrics Function taking all the parameters from coremetrics function and tracking the data to document.write.
function fTroyDelegate(sTroyParameter)
{
	var ref = document.referrer;
	if (ref != undefined && ref != "") {
		sTroyParameter= sTroyParameter+ "&from=" + ref;
	}
	var time = new Date();
	var http = false;
	$.get("/m/a.gif?"+sTroyParameter+"&time="+time.valueOf(),function(data) { },"html");
}

//Function to call Coremetrics Tag - cmCreatePageviewTag and Troymetrics function
function metricsPageViewDelegate(sPageId,sSearchString,sCategoryId)
{
	alert("metricsWrapper1");
	sTroySearchString= sSearchString.replace(/\s+/g,"_");
	sTroyPageId= sPageId.replace(/\s+/g,"_");
	var sTroyCategoryId ='';
	if(sCategoryId!=null){sTroyCategoryId= sCategoryId.replace(/\s+/g,"_");}
	var sTroyParameter='PAGE_VIEW:cmPageID:' + sTroyPageId+ ',cmSearchString:' + sTroySearchString+',cmCatID:' + sTroyCategoryId+ ',curURL:' + document.location.href ; 
	fTroyDelegate(sTroyParameter);
	cmCreatePageviewTag(sPageId,sSearchString,sCategoryId);	
}

//Function to call Coremetrics Tag - cmCreatePageviewTag and Troymetrics function
function metricsPageViewDelegate(sPageId,sSearchString,sCategoryId,iIndex)
{
	var sTroySearchString = '';
	if(sSearchString!=null){	
		sTroySearchString = sSearchString.replace(/\s+/g,"_");
		sTroySearchString = ',cmSearchString:'+sTroySearchString;
	}
	sTroyPageId= sPageId.replace(/\s+/g,"_");
	var sTroyCategoryId = '';
	if(sCategoryId!=null){
		sTroyCategoryId= sCategoryId.replace(/\s+/g,"_");
	}     
	var sTroyParameter= 'cmPageID:' + sTroyPageId+ ',PAGE_VIEW,cmCatID:' + sTroyCategoryId +sTroySearchString +',curURL:' + document.location.href;
	fTroyDelegate(sTroyParameter);
	cmCreatePageviewTag(sPageId,sSearchString,sCategoryId);
}

//Function to call Coremetrics Tag - cmCreateProductviewTag and Troymetrics function
function metricsProductViewDelegate(sProductId,sProductName,sCategoryId,iIndex)
{	
	sTroyProductName= sProductName.replace(/\s+/g,"_");
	sTroyProductId= sProductId.replace(/\s+/g,"_");
	var sTroyCategoryId = '';
	if(sCategoryId!=null){sTroyCategoryId= sCategoryId.replace(/\s+/g,"_");}
	var sTroyParameter='cmProductID:' + sTroyProductId+ ',PRODUCT_VIEW,cmCatID:' + sTroyCategoryId+', curURL:' + document.location.href ; 
	//fTroyDelegate(sTroyParameter);
	cmCreateProductviewTag(sProductId,sProductName,sCategoryId,iIndex);
}

//Function to call Coremetrics Tag - cmCreateTechPropsTag and Troymetrics function HOMEPAGE
function metricsTechPropsDelegate(sPageId,sCategoryId)
{
	sTroyPageId= sPageId.replace(/\s+/g,"_");
	var sTroyCategoryId = '';
	if(sCategoryId!=null){sTroyCategoryId= sCategoryId.replace(/\s+/g,"_");}
	var sTroyParameter= 'cmPageID:' + sTroyPageId+ ',TECHPROPS,cmCatID:' + sTroyCategoryId+',curURL:' + document.location.href;
	if(sPageId.indexOf('Home Page')<0){fTroyDelegate(sTroyParameter);}
	cmCreatePageviewTag(sPageId,'',sCategoryId);
}

//Function to call Coremetrics Tag - cmCreateErrorTag and Troymetrics function
function metricsErrorTagDelegate(sPageId,sCategoryId)
{
	sTroyPageId= sPageId.replace(/\s+/g,"_");
	var sTroyCategoryId = '';
	if(sCategoryId!=null){sTroyCategoryId= sCategoryId.replace(/\s+/g,"_");}
	var messageText ='cmPageID:' + sTroyPageId+ ',ERROR,cmCatID:' + sTroyCategoryId+',curURL:' + document.location.href;      
    	fTroyDelegate(messageText);       
	cmCreateErrorTag(sPageId,sCategoryId);
}
