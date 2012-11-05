/***************************************************************************************************************************************************
	Author                  : PA
	Version                 : 1.0
	Date Created
	  
	Change history 
		
	Task/Bug            Date(MM-DD-YYYY)        Author             Change Description
	
	Trac 1112           12-08-2008              HAlagesan          InitializeValues mothed is modified to add popId,pushId & prePushId.
	
	Color swatches does not  
	work when the same product 
	is assigned in more than 
	one subcategory     05-13-2009              HAlagesan          Since count parameter is appended with ProductId to form a unique Id ,
	                                                               Product id(pId) is send explicitly to setSelectedColorForCategorySwatches() function and used in href.
	
	Trac 1997           01-04-2010              SGopidinne         'selectedProductSize' param passed to productDetail page.  																   
	
	Trac 2075           02-10-2010              HGolla              Passing 'isProduct' parameter to product detail page.
	
	Trac 2075           03-02-2010              HGolla              Renamed parameter isProduct to isSoldOut.

	AJAX code			04-07-2011				CLohr				Added AJAX JS code to create swatches on category page
****************************************************************************************************************************************************/

var overSwatches = false;
var hoverTimer = null;
var prodID = "";
function onSwatchGrid() {
	overSwatches = true;
}
function offSwatchGrid() {
	overSwatches = false;
}
function checkHoverState() {
	var moreColorsLink = $("swatches"+prodID);
	var swatchContainer = $("swatchContainer"+prodID);
	if ((moreColorsLink) && (swatchContainer)) {
		if (overSwatches == false) {
			moreColorsLink.style.display = "block";
			swatchContainer.style.display = "none";
			clearTimeout(hoverTimer);
			hoverTimer = null;
			overSwatches = false;
		} else {
			hoverTimer = setTimeout("checkHoverState()",250);
			overSwatches = true;
		}
	} else {
		hoverTimer = setTimeout("checkHoverState()",250);
		overSwatches = true;
	}
}

var productSelectorArray = new Array();

 function ProductSelector(pProductId, isLeaderProduct){

this.productId = pProductId;

this.colorList = new Array();

	this.addColorList=function(pColorList){
	
	for(var i=0;i<pColorList.length;i++){
	
	this.colorList.push(pColorList[i]);
	
		}

	}

		this.populateColorSwatches=function(pProductId,pId){
		// clear previous swatch
		var prevSwatchContainer = $("swatchContainer"+prodID);
		if (prevSwatchContainer) {
			prevSwatchContainer.innerHTML = "";
			prevSwatchContainer.style.background = "";
		}
		onSwatchGrid();
		var swatchContainer = getElement("swatchContainer"+this.productId);
		if (swatchContainer!=null) {
			var htmlStr="<p class=\"swatches\">";
				
			for(var i=0;i<this.colorList.length;i++){ 
				htmlStr+="<a href=\"javascript:setSelectedColorForCategorySwatches('"+this.productId+"','"+this.colorList[i].prodImage+"','"+this.colorList[i].colorCode+"','"+this.colorList[i].colorName+"','"+pId+"','"+this.colorList[i].isSoldOut+"');\" id=\"swatchLinkID"+this.productId+this.colorList[i].colorCode+"\" onmouseover=\"onSwatchGrid()\" onmouseout=\"onSwatchGrid()\">";
				htmlStr+="<img border=\"1\" id=\"swatches"+this.productId+"\" src=\""+this.colorList[i].imagePath+"\"  alt=\""+this.colorList[i].colorName+"\" /></a>";
			}
			
			htmlStr+="</p>";
			// set background
			swatchContainer.style.background = "#ffffff";
			// set innerHTML
			swatchContainer.innerHTML = htmlStr;
			// check hover state
			prodID = pProductId;
			checkHoverState();
		}		
	}
		
} 

function getProductSelector(pProductId, createNew){

/*

* Loops through and returns the productselector object

* from the product selector array for the given product id

*/

for(var i=0;i<productSelectorArray.length;i++){ 

if(productSelectorArray[i].productId == pProductId){ 

return productSelectorArray[i];

}

}


if(createNew){

/* 

* If the createNew boolean flag is set to true and 

* product selector is not available for the given product id,

* then creates a new productselector object for the given product id and

* returns the newly created productselector object.

*/


productSelectorArray.push(new ProductSelector(pProductId)); 

return productSelectorArray[productSelectorArray.length - 1];

} else {

/*If the createNew boolean flag is not set to true and 

* product selector is not available for the given product id

* then return null

*/

return null;

} 


}

function initializeSwatches(pProductId, pId){
var productSelector = getProductSelector(pProductId, false);
productSelector.populateColorSwatches(pProductId, pId);
}

function addColorList(pProductId,pColorList){ 
var productSelector = getProductSelector(pProductId, true);
productSelector.addColorList(pColorList);
}

function setSelectedColorForCategorySwatches(pProductId,prodImg,pColorCode,pColorName, pId, pIsProduct){
   changeColorForSwatches(pProductId,prodImg,pColorCode,pColorName, pId, pIsProduct);
    if (getElement("swatchLinkID"+pProductId+pColorCode)) {
    	getElement("swatchLinkID"+pProductId+pColorCode).blur();
   	}
}

function changeColorForSwatches(pProductId, prodImg,pColorCode,pColorName, pId, pIsSoldOut){
	var uniqueId = "l"+pProductId;
	var viewAllinkHandle = "viewAllink"+uniqueId;
	var viewAldeslinkHandle = "viewAldeslink"+uniqueId;
	var viewAldislinkHandle = "viewAldislink"+uniqueId;
	var deslinkHandle = "deslink"+uniqueId;
	var imglinkHandle = "imglink" + uniqueId;
	if(prodImg != null && pProductId!=null){
		document["frml"+pProductId].color.value=pColorCode;
		// check for templates
		if (document["imgl"+pProductId].offsetHeight == "488") {
			// use alt7 cat7Lg
			prodImg = prodImg.replace("$cat$","$cat7Lg$");
		} else if (document["imgl"+pProductId].offsetHeight == "173") {
			// use alt7 cat7Sm
			prodImg = prodImg.replace("$cat$","$cat7Sm$");
		} else if (document["imgl"+pProductId].offsetHeight == "356") {
			// use beauty size
			prodImg = prodImg.replace("$cat$","$beauty$");
		} else if (document["imgl"+pProductId].offsetHeight == " 431") {
			// use brands + product detail size
			prodImg = prodImg.replace("$cat$","$detailmain$");
		}
		document["imgl"+pProductId].src = prodImg;
		document["frml"+pProductId].colorName.value=pColorName;
	}
	// Change link on image
	// Code modified for Trac 1997
	
	//Code modified for Trac 2075.
	var soldOutBanner = "soldout" + uniqueId;
	var isSoldOut="";
	if(pIsSoldOut == 'outOfStock'){
        isSoldOut = '&isSoldOut=true';
	}

	if(getElement(imglinkHandle) != null){
	    //Code modified for Trac 2075.
	    if(isSoldOut != ""){
			getElement(imglinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize+isSoldOut);
		}else{
		    getElement(imglinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize);
		}
	}
	
	if(getElement(soldOutBanner) != null){
		getElement(soldOutBanner).href = getElement(imglinkHandle).href;
	}
    
	// Change link on text
	if(getElement(deslinkHandle) != null){
		    getElement(deslinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize);
	}
	
	if(getElement(viewAllinkHandle) != null){
		getElement(viewAllinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize);
	}
		
	if(getElement(viewAldeslinkHandle) != null){
	   //Code modified for Trac 2075.
       if(isSoldOut != ""){
		   getElement(viewAldeslinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize+isSoldOut); 
	   }else{
		   getElement(viewAldeslinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize);
       }
        
    }
      
    if(getElement(viewAldislinkHandle) != null){
         //Code modified for Trac 2075.
		 if(isSoldOut != ""){
			  getElement(viewAldislinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize+isSoldOut);
		 }else{
		      getElement(viewAldislinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+prItemCount+'&id='+pId+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode+'&popId='+popId+'&pushId='+pushId+'&prepushId='+prepushId+'&selectedProductSize='+selectedProductSize);
		 }
      }
    // End of Code modified for Trac 1997  
    // added for snapshot; set selected swatch color
	curColor = pColorCode;
	/*
	if (eval("uo"+pProductId)) {
		var prodArr = eval("uo"+pProductId);
		prodArr["selectedColor"] = pColorCode;
	}
	*/
}

function ColorForSwatches(pColorCode, pColorName, pImagePath, pProdImage, pIsSoldOut){
     this.colorCode = pColorCode;
     this.colorName = pColorName;
     this.imagePath = pImagePath;
     this.prodImage = pProdImage;
     //Code modified for Trac 2075: pIsProduct is added.
	 this.isSoldOut = pIsSoldOut;
}
 
function getElement(pElementId){
	return document.all? document.all[pElementId] : document.getElementById(pElementId);
}
// code modified for the Trac 1112.
function InitializeValues(pItemdescription,pItemCount,pParentid,pSortProperties,pNavCount,pNavAction,pPopId,pPushId,pPrepushId,pSelectedProductSize){
     this.itemdescription = pItemdescription;
     this.prItemCount = pItemCount;
     this.sortProperties = pSortProperties;
     this.navAction = pNavAction;
     this.parentid = pParentid;
     this.navCount = pNavCount;
     this.popId = pPopId;
     this.pushId = pPushId;
     this.prepushId = pPrepushId;
     this.selectedProductSize = pSelectedProductSize;
}
// End of code modified for the Trac 1112.
