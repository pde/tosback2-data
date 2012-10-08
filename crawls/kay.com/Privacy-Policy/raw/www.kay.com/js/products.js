
var activeProdView = 0;
var altProdViews = new Array();
var altZoomViews = new Array();
var altZoomViewsC = new Array();
var browserType = 'notEpiphany';

function setBrowserType() {
	if (window.navigator.userAgent.toLowerCase().match("epiphany")) {
		browserType= "epiphany";
		if (window.navigator.userAgent.toLowerCase().match("1.0.8") || window.navigator.userAgent.toLowerCase().match("1.0.7")) {
			browserType= "storeBrowser";
		} 
	} 
}

/*
* Basic class to serve as holder for product view information
*/
function productView(strPriImgName, strLrgImgName) {
	this.medium = strPriImgName;
	this.large = strLrgImgName;
}

/*
* Function to replace the main product image in the product detail page.
* This function is intended to be called from the onclick event of the
* preview (thumbnail) images.
*/
function setProductMediumImageSrc(id) {
	// Change source of the medium size product image with one of the cached images
	document["productImage"].src = eval(altProdViews[id].medium.toString() + ".src");
	// Set which product view is current
	activeProdView = id;
	// Set the indicator of the product preview image
	for (var i=0; i<altProdViews.length; i++) {
		if (i!=activeProdView) {
			getElmtRef('alt' + i).style.backgroundColor = '#FFFFFF';
		} else {
			getElmtRef('alt' + i).style.backgroundColor = '#F0AD00';
		}
	}
}


/*
* Function to replace the main product image in the product detail page.
* This function is intended to be called from the onclick event of the
* preview (thumbnail) images.
*/
function setProductLargeImageSrc(id) {
	// Check parameter value

	if (id < 0 || id > 10) {
		id = 0
	}
	// Change source of the large size product image with one of the cached images
	document["productImage"].src = eval(altProdViews[id].large + ".src");
	// Set which product view is current
	activeProdView = id;
	// Set the indicator of the product preview image
	for (var i=0; i<altProdViews.length; i++) {
		if (i!=activeProdView) {
			getElmtRef('alt' + i).style.backgroundColor = '#FFFFFF';
		} else {
			getElmtRef('alt' + i).style.backgroundColor = '#F0AD00';
		}
	}
}
function setProductZoomImageSrc(id) {
	// Check parameter value
	if (id < 0 || id > 10) {
		id = 0
	}
	// Change source of the large size product image with one of the cached images
	var imgsrc = eval(altProdViews[id].large + ".src");
	imgsrc = "imageLocation=" + imgsrc + "&zoom=100";
//	alert('id:[' + id + '],imgsrc:[' + imgsrc + ']');
	var flash_ff = document.getElementById("zoomer_embed");
	var flash_ie = document.getElementById("zoomer");
	var flash_var_ie = document.getElementById("ie_flashvars");
//	alert('FlashVars:[' + flash_ff.getAttribute("FlashVars") + ']');
//	alert('FlashVars:[' + flash_var_ie.value + ']');
	flash_ff.setAttribute("FlashVars",imgsrc);
	flash_var_ie.value=imgsrc;
}
/*
* Function to initialize the medium size product images by caching them.
* This function is intended to be called in the header of the product
* detail page.
*/
function initMediumViews(prodImgDir) {
	for (var i=0; i<altProdViews.length; i++) {
		cacheImages("/images/products/" + prodImgDir + "/", "jpg", altProdViews[i].medium);
	}
}

/*
* Function to initialize the large size product images by caching them.
* This function is intended to be called in the header of the product
* detail popup page.
*/
function initLargeViews(prodImgDir) {
	for (var i=0; i<altProdViews.length; i++) {
		cacheImages("/images/products/" + prodImgDir + "/", "jpg", altProdViews[i].large);
	}
}
function initZoomViews(prodImgDir) {
	for (var i=0; i<altZoomViewsC.length; i++) {
		cacheImages("/images/products/" + prodImgDir + "/", "jpg", altZoomViewsC[i]);
	}
}

/*
* Function to open popup window to display large product images.
*/
function openProductPopup(url) {
	openWindow(url, "product_large", 420, 510, "scrollbars=no,menubar=no,toolbar=no,location=no,status=no,resizable=no");
}

/*
* Function to open popup window to display 360 degree product view.
*/
function open360Popup(url) {
	var strURL = url + '&svrProto=' + window.location.protocol + '&svrHst=' + window.location.host;
	openWindow(strURL, "product_360", 420, 450, "scrollbars=no,menubar=no,toolbar=no,location=no,status=no,resizable=no");
}
/*
* Function to open popup window to display 360 degree product view.
*/
function openZoomPopup(url,imgloc) {
	var imgsrc = altZoomViews[window.activeProdView];
	var strURL = url + '&svrProto=' + window.location.protocol + '&svrHst=' + window.location.host + '&imgId=' + window.activeProdView + '&defaultImg=' + imgsrc + '&zoom=100';
	openWindow(strURL, "product_Zoom", 420, 450, "scrollbars=no,menubar=no,toolbar=no,location=no,status=no,resizable=no");
}