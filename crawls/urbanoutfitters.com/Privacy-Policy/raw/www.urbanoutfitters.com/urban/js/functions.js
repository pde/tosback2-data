/* ---------- GLOBAL JAVASCRIPT FUNCTIONS ---------- */

var ie = (navigator.userAgent.indexOf("MSIE") > 0) ? true:false;
var ie6 = (navigator.userAgent.indexOf("MSIE 6.") > 0) ? true:false;

/* 
	purpose: returns first part of user's login name; 
	location: displayed in utility nav next to 's Account 
*/
function loginName(name){
	var index=name.indexOf('@');
	var newName=name.substring(0,index);
	return newName;
}

/* logout function */
function logOut(){
	document.logout.action = '/urban/user/checkout_login.jsp';
	document.logout.submit();			
}

/*
	functions to dynamically center divs 
*/

// return browser width
function getBrowserWidth() {
	var val = 0;
	if (window.innerWidth) {
		val = window.innerWidth;
	} else if ((document.documentElement) && (document.documentElement.clientWidth != 0)) {
		val = document.documentElement.clientWidth;
	} else if (document.body) {
		val = document.body.clientWidth;
	}	
	return val;
};

// return browser height
function getBrowserHeight() {
	var val = 0;
	if (window.innerHeight) {
		val = window.innerHeight;
	} else if ((document.documentElement) && (document.documentElement.clientWidth != 0)) {
		val = document.documentElement.clientHeight;
	} else if (document.body) {
		val = document.body.clientHeight;
	}	
	return val;
};

// get vertical scolling offset
function getOffsetY() {
	var offset = 0;
	if ((document.documentElement) && (document.documentElement.scrollTop)) {
		offset = document.documentElement.scrollTop;
	} else if ((document.body) && (document.body.scrollTop)) {
		offset = document.body.scrollTop;
	} else if (window.pageYOffset) {
		offset = window.pageYOffset;
	}
	return offset;
}

/* toggle display property of an object) */
function toggle(obj) {
	if (obj.indexOf("sizechart") < 0) {	
		if ( document.getElementById(obj).style.display == '' || document.getElementById(obj).style.display == 'none' ) {
			document.getElementById(obj).style.display = 'block';
		} else {	
			document.getElementById(obj).style.display = 'none';
		}
	} else {
		launchSizeChart();	
	}
}

/* onblur events for search field */
function searchFieldBlur(obj) {
	if (obj) {
		if (obj.value.length == 0) {
			obj.value = 'search by keyword or catalog #';
		}
	}	
}

/* onblur events for newsletter field */
function newsletterFieldBlur(obj) {
	if (obj) {
		if (obj.value.length == 0) {
			obj.value = 'enter your email address';
		}
	}	
}

/* left nav toggle */
function toggleNav(obj) {
	obj.blur();
	// if on the sitemap page, do not toggle
	if (location.href.indexOf("sitemap.jsp") < 0) {
		// get id of parent div
		var temp = obj.href.substring(obj.href.indexOf("_")+1, obj.href.indexOf("("));
		var id = "secondarynav_" + temp;
		id = id.toLowerCase();
		// remove showing class
		$$('ul').each(function(u) {
			if ((u.hasClassName('showing')) && (curID != id))  {
				// hide nav
				hideNav(u);
			}
		});
		// remove highlighting from current category
		//var cats = $('secondarynav').childElements();
		var cats = $('secondarynav').descendants();
		cats.each(function(cc) {
			if (cc.id.indexOf('secondarynav_') >= 0) {
				if (cc.className == 'active') {
					cc.className = '';
					if (curID == null) {
						curID = cc.id;
					}
				}
			}
		});	
		// check id
		if (id != curID) { 
			// add highlighting to selected category
			$(id).className = 'active';
			// find child element of selected category and assign showing class
			var children = $(id).descendants();
			children.each(function(c) {
				//var curElem = c.inspect();
				var curElem = c.tagName.toLowerCase();
				if (curElem.indexOf('ul') >= 0) {
					c.className = "showing";
				}
			});
		}
		curID = id;
	}
}

var curID = null;
var target = 0;
var fadeInObj = null;
var fadeInTimer = null;
var ie6 = (navigator.userAgent.indexOf("MSIE 6.0") >= 0) ? true:false;

function showNav(obj) {
	/*
	// set overflow
	obj.style.overflow = 'hidden';
	// get height of ul
	target = obj.getHeight();
	// reset height to 5
	obj.style.height = '10px';
	obj.removeClassName('hidden');
	obj.addClassName('showing');
	// fadeIn
	fadeIn();
	*/
}
function fadeIn() {
	if (!ie6) {
		var h = fadeInObj.getHeight();
		if (h <= target) {
			h += 10;
			fadeInObj.style.height = h + "px";
			fadeInTimer = setTimeout("fadeIn()",1);
		} else {
			fadeInObj.style.height = target + "px";
			fadeInObj.style.overflow = 'visible';
			clearTimeout(fadeInTimer);
			fadeInObj = null;
			fadeInTimer = null;
			target = 0;
		}
	} else {
		fadeInObj.style.height = target + "px";
	}
}
function hideNav(obj) {
	// hide previously opened nav
	obj.removeClassName('showing');
	obj.addClassName('hidden');
}

// unique functions to allow for coremetrics click tracking
function womens_collections() { void(0); }
function womens_whatsnew() { void(0); }
function womens_apparel() { void(0); }
function womens_shoes() { void(0); }
function womens_accessories() { void(0); }
function womens_shopbybrand() { void(0); }
function womens_sale() { void(0); }
// mens
function mens_collections() { void(0); }
function mens_whatsnew() { void(0); }
function mens_apparel() { void(0); }
function mens_shoes() { void(0); }
function mens_accessories() { void(0); }
function mens_shopbybrand() { void(0); }
function mens_sale() { void(0); }
// apt
function apartment_whatsnew() { void(0); }
function apartment_collections() { void(0); }
function apartment_furnish() { void(0); }
function apartment_shopbybrand() { void(0); }
function apartment_sale() { void(0); }
function apartment_media() { void(0); }
// sale
function sale_yardsale() { void(0); }
function sale_m() { void(0); }
function sale_w() { void(0); }
function sale_apt() { void(0); }

/* old product detail image zoom */
function zoom(imgID) {
	if ($("zoomInBtn")) {		
		$("zoomInBtn").blur();
	}
	if (($("blurWrapper")) && ($("zoomedImage").innerHTML.indexOf("img src") > 0)) {
		hideZoom();
	} else if ($("blurWrapper")) {
		var obj = $("zoomedImage");
		// set blur wrapper
		var wrapper = $("blurWrapper");
		var w = 375;
		var h = 563;
		var scrollH = parseInt(document.body.scrollHeight);	
		var scrollW = parseInt(document.body.scrollWidth);
		wrapper.style.height = scrollH + "px";
		wrapper.style.width = scrollW + "px";
		var imgTag = document.createElement("img");
		var newSrc = imgID.substring(imgID.lastIndexOf("/")+1, imgID.indexOf("?"));
		imgTag.src = "http://images.urbanoutfitters.com/is/image/UrbanOutfitters/" + newSrc + "?$magnify$";
		imgTag.width = w;
		imgTag.height = h;
		obj.appendChild(imgTag);
		// offset for vertical scrolling
		var vertOffset = 0;
		var horOffset = (scrollW/2) - w - 100;
		if (window.pageYOffset) {
			vertOffset = window.pageYOffset;
		} else  if (document.body.scrollTop) {
			vertOffset = document.body.scrollTop;
		} else if (document.documentElement.scrollTop) {
			vertOffset = document.documentElement.scrollTop;
		}
		obj.style.top = 40 + parseInt(vertOffset) + "px";
		obj.style.left = horOffset + "px";
		wrapper.style.display = '';
	}
}	
function hideZoom() {
	var obj = $("blurWrapper");
	obj.style.display = 'none';
	obj.innerHTML = '<div id="zoomedImage"><div id="hideZoomedImage"><a href="javascript:hideZoom();" title="zoom out">&ndash;</a></div></div>';
}
function smallImage(id,img,color) {
	var collection = $("frml"+id).elements["l"+id+"color"].options;
	for (var i=0;i<collection.length;i++) {
    	if (collection[i].value == color) {
        	collection[i].selected = true;
		}
	}
	if ($("multi"+id)) {
		$("multi"+id).src = img;
	}
}

/* toggle product details, reviews, videos, and photos */
function toggleLeftTabContent(curLeftID) {
	// remove active class from previously selected tab
	removeActiveState("left");
	// add active class to currently selected tab
	var curLeftObj = $(curLeftID);
	if (curLeftObj != null) {
		curLeftObj.addClassName('active');
		$(curLeftID+'Content').addClassName('active');
		// blur currently selected tab
		$(curLeftID+'Link').blur();
	}
}
function toggleRightTabContent(curRightID) {
	// remove active class from previously selected tab
	removeActiveState("right");
	// add active class to currently selected tab
	var curRightObj = $(curRightID);
	if (curRightObj != null) {
		curRightObj.addClassName('active');
		$(curRightID+'Content').addClassName('active');
		// blur currently selected tab
		$(curRightID+'Link').blur();
	}
}
function goReviewsTab() {
	// toggle Reviews tab
	toggleDetailTabContent("reviewsTab");
	// scroll down to show opened Reviews tab
	if ($("BVSummaryReadReviewsLink")) {
		$("BVSummaryReadReviewsLink").href = "javascript:void(0)";
		window.scrollTo(0,400);
	}
}
function removeActiveState(side) {
	var allTabs = null;
	if (side == "left") {
		allTabs = new Array("photoTab","videoTab");
	} else {
		allTabs = new Array("detailsTab","reviewsTab","askAndAnswerTab");
	}
	for (var i=0; i<allTabs.length; i++) {
		var curObj = $(allTabs[i]);
		if (curObj != null) {
			$(allTabs[i]+'Content').removeClassName('active');
			curObj.removeClassName('active');
		}
	}
}

/* toggle reviews, product details, ask & answer, and social tabs */
var curTabID = "reviewsTab";
function toggleDetailTabContent(tabID) {
	// remove class from previously selected tab and content
	var prevTab = $(curTabID+"Link");
	var prevTabContent = $(curTabID+"Content");
	if (prevTab && prevTabContent) {
		prevTab.removeClassName("active");
		prevTabContent.removeClassName("active");
	}
	// add active class to currently selected tab
	var curTab = $(tabID+"Link");
	var curTabContent = $(tabID+"Content");
	if (curTab && curTabContent) {
		curTab.addClassName("active");
		curTabContent.addClassName("active");
	}
	// update curTabID
	curTabID = tabID;
}

/*  START TRAC 4220 */
/* It is used to remove the All active toggles except the selected toggle */
function toggleDetailTabEmpty(giftCardConst,productId) {
	var recipientName = $("egiftCardRecipientName"); 
	var recipientEmail = $("egiftCardRecipientEmail"); 
	var giftCardMessage = $("pGiftCardMessage"); 
	var egiftCardMessage =$("egiftCardMessage");
	var amountSelected = $("sizeMenu"+productId);
	if(productId == "21245832"){
		recipientName.removeClassName("err");
		recipientEmail.removeClassName("err");
		amountSelected.removeClassName("err");
		recipientName.value="";
		recipientEmail.value="";
		giftCardMessage.value="";
		egiftCardMessage.value="";
		if(amountSelected.options[amountSelected.selectedIndex].value ){
			amountSelected.selectedIndex ="0";
			amountSelected.options[amountSelected.selectedIndex]="";
		}		
	}
	else{
		amountSelected.removeClassName("err");
		giftCardMessage.value="";
		egiftCardMessage.value="";
		if(amountSelected.options[amountSelected.selectedIndex].value ){
			amountSelected.selectedIndex ="0";
			amountSelected.options[amountSelected.selectedIndex]="";
		}
	}

	var allTabIds = new Array("detailsTab","reviewsTab","askAndAnswerTab","socialTab");
	var len = allTabIds.length;
	for(var i=0; i<len; i++) {
		$(allTabIds[i]+'Content'+'_'+giftCardConst).removeClassName('active');
		$(allTabIds[i]+'Link'+'_'+giftCardConst).removeClassName('active');
	}
	toggleDetailTabContentCard("reviewsTab", giftCardConst);
}
/* toggle reviews, product details, ask & answer, and social tabs for GiftCard and E-Gift Card Products*/
function toggleDetailTabContentCard(tabID, cardConst) {
	var giftCardId = cardConst;
	if(cardConst == "EGIFTCARD"){
		giftCardId = "21245832";
	}
	//declare variables to store Previous Tab and its content to remove
	var prevTab = $(curTabID+"Link_"+cardConst);
	var prevTabContent = $(curTabID+"Content_"+cardConst);
	// remove class from previously selected tab and content	
	if (prevTab && prevTabContent) {
		prevTab.removeClassName("active");
		prevTabContent.removeClassName("active");
	}	
	// add active class to currently selected tab
	var curTab = $(tabID+"Link_"+cardConst);
	var curTabContent = $(tabID+"Content_"+cardConst);
	if (curTab && curTabContent) {
		curTab.addClassName("active");
		curTabContent.addClassName("active");
	}
	// update curTabID
	curTabID = tabID;
	bvLoadRR(giftCardId);
}
/*  END TRAC 4220 */



/* add product to wishlist */
function addProductToWishlist(prodID) {
	// declare variables
	var formName = 'frml'+prodID;
	var spanIdName = "l"+prodID+"colorsizenotavailable";
	// check size menu value
	if (document.forms[formName].elements["size"]) {
	    if (document.forms[formName].elements["size"].value == "") {
			// no, display error message
			displayColorSizeNotAvailableMessage(spanIdName,prodID);
		} else {
			// yes, add product to wishlist
			addItemToWishlist(formName);
		}
	}  else {
		// yes, add product with one size
		addItemToWishlist(formName);
	}
}

/* share this product */
var curBool = true;
function openSocial(divID) {
	// clear messages
	var obj = $("tellafriendMsg");
	if (obj) {
		obj.innerHTML = "";
	}
	// get the user's screen dimensions and calculate center point
	var screenWidth = getBrowserWidth();
	var screenHeight = getBrowserHeight();
	// scrolling offset
	var scrollY = getOffsetY();
	// dimensions
	var divWidth = 450;
	var divHeight = 210;
	// update dimensions if email a friend
	if (divID == "emailProductDiv") {
		divWidth = 372;
		divHeight = 445;
	}
	// set coordinates
	var x = Math.floor(screenWidth/2) - Math.floor(divWidth/2);
	var y = 250;
	if (divID == "emailProductDiv") {
		y = 50;
	}
	// set objects
	var socialObj = $(divID);
	var wrapperObj = $("socialWrapper");
	if ((socialObj) && (wrapperObj)) {
		// make snapshot visible
		socialObj.style.top = y + "px";
		socialObj.style.left = x + "px";
		// set snapshotWrapper height
		var docHeight = screenHeight + scrollY;
		wrapperObj.style.height = docHeight + "px";	
		if (ie) {
			wrapperObj.style.width = screenWidth + "px";	
		}
		// display objects
		socialObj.style.display = "block";
		wrapperObj.style.display = "block";
	}
}
function hideSocial(divID, bool) {
	var wrapper = $("socialWrapper");
	var social = $(divID);
	// check if objects exist
	if ((wrapper) && (social)) {
		if (bool) {
			// set display property to none
			social.style.display = "none";
			wrapper.style.display = "none";
		}
	}
}
function hideAllSocial(bool) {
	var wrapper = $("socialWrapper");
	var share = $("shareProductDiv");
	var email = $("emailProductDiv");
	// check if objects exist
	if ((wrapper) && (share) && (email)) {		
		// wishlist page
		if (bool) {
			// set display property to none
			share.style.display = "none";
			email.style.display = "none";
			wrapper.style.display = "none";
		}
	}
}
// check if tellaFrnd=true
function socialQueryCheck() {
	if (location.search.indexOf("&tellaFrnd=true") > 0) {
		openSocial("emailProductDiv");
	}
}
	
// social bookmarks
function socialBookmark(socialSite,url,w,h) {
	// pop-up window
	window.open(url,'','toolbar=0,resizable=yes,scrollbars=yes,status=0,width=' + w + ',height='+h);
}

/* add product to wishlist */
function addProductToWishlistUrban( prodID,guest,url ) {
	// declare variables
	var formName = 'frml'+prodID;
	var spanIdName = "l"+prodID+"colorsizenotavailable";
	var sizeMenu = $("sizeMenu" + prodID);
	// check size menu value
	if (sizeMenu) {
	    if (sizeMenu.value == "") {
			// no, display error message
			displayColorSizeNotAvailableMessage(spanIdName,prodID);
		} else {
			// If the guest user,redirect to wishlistsearch.jsp
			if( guest == 'true' ){
				document.location.href = url;
			}else{
			// yes, add product to wishlist
			addItemToWishlist(formName);
			}
			
		}
	}  else {
		// If the guest user,redirect to wishlistsearch.jsp
		if( guest == 'true' ){
				document.location.href=url;
			}else{
			// yes, add product to wishlist
			addItemToWishlist(formName);
			}
	}	
}

function moveItemFromCartToSaveForLaterUrban(itemId,quantity,errorUrl,catalogRefId,guest,url){
	if( guest == 'true' ) {
		document.location.href = url;
	}
	else{
		document.saveforlater["/atg/commerce/gifts/GiftlistFormHandler.itemIds"].value=itemId;
    	document.saveforlater["/atg/commerce/gifts/GiftlistFormHandler.moveItemsFromCartErrorURL"].value=errorUrl;
    	document.saveforlater.commerceItemId.value=quantity;
    	document.saveforlater.commerceItemId.name=itemId;
    	document.saveforlater.catalogRefId.value=catalogRefId;
    	document.saveforlater.submit();
	}
     	
}

function moveItemFromCartToWishListUrban(itemId,quantity,errorUrl,catalogRefId,guest,url){
	if( guest == 'true' ) {
		document.location.href = url;
	}
	else{
		document.moveToWishList["/atg/commerce/gifts/GiftlistFormHandler.itemIds"].value=itemId;
    	document.moveToWishList["/atg/commerce/gifts/GiftlistFormHandler.moveItemsFromCartErrorURL"].value=errorUrl;
    	document.moveToWishList.catalogRefId.value=catalogRefId;
		document.moveToWishList.commerceItemId.value=quantity;
		document.moveToWishList.commerceItemId.name=itemId;
		document.moveToWishList.submit();
	}
}

/* 
	Functions to display brands page sub nav menus
*/	

// global variables
var prevLetter = "";
var firstTime = true;
var brandsDistance = 140;


// brand nav redesign functionality
function showBrand(l) {
	// hide previous letter
	var prevLetterObj = $("letter"+prevLetter);
	if (prevLetterObj) {
		// update styles for brands beginning with letter
		prevLetterObj.removeClassName("selected");
		prevLetterObj.addClassName("hidden");
	}
	// show currently selected letter
	var curLetterObj = $("letter"+l);
	if (curLetterObj) {
		// update styles for brands beginning with letter
		curLetterObj.removeClassName("hidden");
		curLetterObj.addClassName("selected");
	}
	// update link styles for current + previously selected letters
	highlightBrandNav(l);
}

//brand nav redesign functionality
function highlightBrandNav(l) {
	// hide previous letter
	var prevLetterLinkObj = $("letterLink"+prevLetter);
	if (prevLetterLinkObj) {
		// update link styles for previously selected letter
		prevLetterLinkObj.removeClassName("selected");
	}
	// show currently selected letter
	var curLetterLinkObj = $("letterLink"+l);
	if (curLetterLinkObj) {
		// update link styles for currently selected letter
		curLetterLinkObj.addClassName("selected");
	}
	// track currently selected letter
	prevLetter = l;
}

//brands fixed top nav
function lockBrandsNav() {
	var obj = $("brandsNav");
	if (obj) {
		var scrolled = (window.pageYOffset) ?  window.pageYOffset : document.documentElement.scrollTop;
		if (scrolled > brandsDistance) {
			// make fixed positioned
			obj.style.position = "fixed";
			obj.style.padding = "10px 0px 10px 0px";
		} else {
			// make relatively positioned
			obj.style.position = "relative";
			obj.style.padding = "32px 0px 10px 0px";
		}
	}
	// must constantly run to determine proper positioning state
	setTimeout("lockBrandsNav()", 10);
}

// open menu
function openBrandMenu(l, brandID) {
	// check cookie values
	var curLetter = readCookie('curLetterCookie');
	var curBrand = readCookie('curBrandCookie');
	if ((curLetter != null) && (firstTime)) {
		// close previous menu
		closeBrandsMenu(prevLetter);
		// set drop down menu select
		var dropDownObj = $("brandLetters");
		if (dropDownObj) {
			for (var i=0; i< dropDownObj.options.length; i++) {
				var cur = dropDownObj.options[i];
				if ((cur.value == curLetter) || (cur.text == curLetter)) {
					cur.selected = true;
					break;
				}
			}
		}
		// set menu to display
		l = curLetter;
		// add class name to link
		var linkObj = $(curBrand);
		if (linkObj) {
			linkObj.addClassName("selected");
		}
		firstTime = false;
	}
	// check that prevLetter has a value and it does not equal curLetter
	if (prevLetter != l) {
		// close previous menu
		closeBrandsMenu(prevLetter);
	}
	// check if objects exist
	if (l.length <= 0) {
		var formObj = document.getElementById("brandLetters");
		var selectedIndex = formObj.selectedIndex;
		l = formObj.options[selectedIndex].text;
	}
	var divObj = $("letter"+l);
	if (divObj) {
		// display brands matching first letter l
		divObj.addClassName("selected");
	}
	// reset prevLetter
	prevLetter = l;
	// show subnav
	var brandsNav = $("brandsNav");
	if (brandsNav) {
		brandsNav.style.visibility = "visible";
	}
}

// close menu
function closeBrandsMenu(l) {
	// check if objects exist
	var divObj = $("letter"+l);
	if (divObj) {
		// display brands matching previous first letter l
		divObj.removeClassName("selected");
	}
}


/*
	cookie functions
*/

/*
	set cookie to remember current brand and letter selection
	if page is reloaded or posted
*/
function rememberCurSelection(letter, brand) {
	var linkObj = $(brand);
	if (linkObj) {
		eraseCookie('curLetterCookie');
		createCookie('curLetterCookie',letter.toUpperCase(),1);
		linkObj.addClassName("selected");
		eraseCookie('curBrandCookie');
		createCookie('curBrandCookie',brand,1);
	}
}

// reset letter and brand
function resetLetterAndBrand(letter,brand) {
	eraseCookie('curLetterCookie');
	if (letter.length > 0) {
		createCookie('curLetterCookie',letter.toUpperCase(),1);
	}
	eraseCookie('curBrandCookie');
	if (brand.length > 0) {
		createCookie('curBrandCookie',brand,1);
	}
}

// create cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

// read cookie value
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

// erase cookie
function eraseCookie(name) {
	createCookie(name,"",-1);
}

//clear search data
function clearData(){
	if($('searchPhrase').value == ""){
		return false;
	} else {
		try {
			$('priceLow').value = "";
			$('priceHigh').value = "";
			$('categories').value = "";
			$('categories2').value = "";
			$('categories3').value = "";
			$('categories4').value = "";
			$('skusize_normalized').value = "";
			$('skucolor_normalized').value = "";
			$('brand').value = "";
			$('viewPage').value = 0;
			$('sortingBy').value = "";
			$('sortingOrder').value = "";
			$('minPrice').value = "";
			$('maxPrice').value = "";
			if ($('searchTerm')) {
				$('searchTerm').value = "";
			}
		} catch (e) {
			// debug
			// alert("clearData: " + e);
		}
		return true;
	}
}


/* size chart */
var curSizeChartTab = "dresses_w";

function launchSizeChart() {
	try {
		// get size chart type to open
		var wrapperObj = $("options_sizechart_wrapper");
		// get the user's screen dimensions and calculate center point
		var screenWidth = getBrowserWidth();
		var screenHeight = getBrowserHeight();
		// scrolling offset
		var scrollY = getOffsetY();
		// set wrapper height
		if( window.innerHeight && window.scrollMaxY ) // Firefox
		{
			pageWidth = window.innerWidth + window.scrollMaxX;
			pageHeight = window.innerHeight + window.scrollMaxY;
		}
		else if( document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
		{
			pageWidth = document.body.scrollWidth;
			pageHeight = document.body.scrollHeight;
		}
		else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
		{
			pageWidth = document.body.offsetWidth + document.body.offsetLeft;
			pageHeight = document.body.offsetHeight + document.body.offsetTop;
		}
		var styleNum = $("prodID").value;
		// check if form exists
		if (document.forms["frml"+styleNum]) {
			var curRoot = document.forms["frml"+styleNum].elements["rootCategory"].value.toLowerCase();
			var curParent = document.forms["frml"+styleNum].elements["defaultParent"].value.toLowerCase();
			var sizechart = $("sizechart_" + curRoot);
			if (sizechart && wrapperObj) {
				if (curParent == "w_intimates") {
					curParent = "w_app_swimwear";
				}
				// snapshot dimensions
				var snapshotWidth = parseInt(sizechart.style.width);
				var snapshotHeight = parseInt(sizechart.style.height);
				// set snapshot coordinates
				var x = Math.floor(screenWidth/2) - Math.floor(snapshotWidth/2) + "px";
				var y = Math.floor(screenHeight/2) - Math.floor(snapshotHeight/2) + scrollY + "px";
				// make size chart visible
				sizechart.style.top = y;
				sizechart.style.left = x;
				// set wrapper height
				wrapperObj.style.height = pageHeight + "px";
				// check which tab should be highlighted
				var arrTabs = new Array("dresses","tops","bottoms","swim","shoes","accessories");
				var suffix = "_w";				
				for (var i=0; i<arrTabs.length; i++) {
					if ((curRoot == "mens") && (i == 0)) {
						suffix = "_m";	
						// set default selected tab for mens
						curSizeChartTab = "tops_m";
						//alert(curSizeChartTab);
					}
					if (curParent.indexOf(arrTabs[i]) >= 0) {
						// highlight tab
						var tab = arrTabs[i] + suffix;
						showSizeChartTab(tab);
					}	
				}
				// display wrapper and size chart
				wrapperObj.style.display = "block";
				sizechart.style.display = "block";
			}
		} else {
			// highlight tab
			var sizechart = $("sizechart_womens");
			// display wrapper and size chart
			var snapshotWidth = parseInt(sizechart.style.width);
			var snapshotHeight = parseInt(sizechart.style.height);
			// set snapshot coordinates
			var x = Math.floor(screenWidth/2) - Math.floor(snapshotWidth/2) + "px";
			var y = Math.floor(screenHeight/2) - Math.floor(snapshotHeight/2) + scrollY + "px";
			// make size chart visible
			sizechart.style.top = y;
			sizechart.style.left = x;
			// set wrapper height
			wrapperObj.style.height = pageHeight + "px";
			var tab = 'swim_w';
			showSizeChartTab(tab);	
			if ($("sizechart"+styleNum)) {
				$("sizechart"+styleNum).style.display = "inline";
			}
			wrapperObj.style.display = "block";
			sizechart.style.display = "block";
		}
	} catch (ex) {
		alert("launchSizeChart: " + ex);	
	}
}

function closeSizeChart() {
	try {
		var styleNum = $("prodID").value;
		var wrapperObj = $("options_sizechart_wrapper");
		if (document.forms["frml"+styleNum]) {
			var curSizeChart = document.forms["frml"+styleNum].elements["rootCategory"].value.toLowerCase();
			var obj = $("sizechart_"+curSizeChart);
			obj.style.display = "none";
			wrapperObj.style.display = "none";
			// set default selected tab for mens
			var tab = "dresses_w";
			var curRoot = document.forms["frml"+styleNum].elements["rootCategory"].value.toLowerCase();
			if (curRoot == "mens") {
				tab = "tops_m";
			}
			showSizeChartTab(tab);
		} else {
			// display wrapper and size chart
			wrapperObj.style.display = "none";
			$("sizechart_womens").style.display = "none";
			if ($("sizechart"+styleNum)) {
				$("sizechart"+styleNum).style.display = "none";
			}
			// highlight tab
			var tab = "dresses_w";
			showSizeChartTab(tab);			
		}
	} catch (ex) {
		alert("closeSizeChart: " + ex);	
	}
}

function showSizeChartTab(tab) {
	try {
		// hide previous tab content and remove class
		var prevTabObj = $("sizechart_"+curSizeChartTab);
		var prevTabObjLink = $("tab_"+curSizeChartTab);
		if (prevTabObj && prevTabObjLink) {
			prevTabObj.addClassName("hidden");
			prevTabObjLink.removeClassName("selected");
		}
		// add class to current tab
		var tabObj = $("sizechart_"+tab);
		var tabObjLink = $("tab_"+tab);
		if (tabObj && tabObjLink) {
			tabObj.removeClassName("hidden");
			tabObjLink.addClassName("selected");
			tabObjLink.blur();
		}
		curSizeChartTab = tab;
	} catch (ex) {
		alert("showSizeChartTab: " + ex);
	}
}

var arrowTimer = null;
var arrowSpeed = 10;
var hArrowTarget = 0;
var hAarrowsID = null;
var hArrowWrapperID = null;
var vArrowTarget = 0;
var vArrowsID = null;
var vArrowWrapperID = null;
var incrDecr = 10;
var curW = 0;
var curX = 0;
var origX = 0;
var origY = 0;
var animated = false;

function animateHorizontal(outerDivID, arrowDivID, targetW) {
	try {
		hideArrowsH();
		var obj1 = $(arrowDivID);
		var obj2 = $(outerDivID);
		if (obj1 && obj2) {
			animated = true;
			hArrowWrapperID = outerDivID;
			hArrowsID = arrowDivID;
			hArrowTarget = targetW;
			curW = parseInt($(hArrowsID).style.width);
			curX = parseInt($(hArrowWrapperID).style.left);
			origX = curX;
			arrowTimer = setTimeout("increaseArrowWidth()",arrowSpeed);	
		}
	} catch (ex) {
		// DEBUG
		alert("animateHorizontal: " + ex);
	}
}

function increaseArrowWidth() {
	try {
		var obj = $(hArrowsID);
		var wrapper = $(hArrowWrapperID);
		if (obj && wrapper) {
			wrapper.removeClassName("hidden");	
			if (curW < hArrowTarget) {
				// increase width of arrows
				curW += incrDecr;
				obj.style.width = curW + "px";
				// decrease left coordinate of arrows position
				curX -= Math.floor(incrDecr/2);
				wrapper.style.left = curX + "px";
				arrowTimer = setTimeout("increaseArrowWidth()",arrowSpeed);	
			} else {
				// clear timeout
				clearTimeout(arrowTimer);
				arrowTimer = null;
				if (animated) {
					animated = false;
				} else {
					hideArrowsH();
				}
			}			
		} else {
			// clear timeout
			clearTimeout(arrowTimer);
			arrowTimer = null;
			animated = false;
		}		
	} catch (ex) {
		// DEBUG
		alert("increaseArrowWidth: " + ex);	
	}
}

function hideArrowsH() {
	if ((hArrowWrapperID != null) && (hArrowsID != null)) {
		// add class name to hide 
		$(hArrowWrapperID).addClassName("hidden");
		// reset to original x position
		$(hArrowWrapperID).style.left = origX + "px";
		// reset default width
		$(hArrowsID).style.width = "5px";
		// reset variables
		var hArrowTarget = 0;
		var curW = 0;
		var curX = 0;
		// clear timeout
		clearTimeout(arrowTimer);
		arrowTimer = null;
		animated = false;
	}
}

function animateVertical(outerDivID, arrowDivID, targetH) {
	try {
		hideArrowsV();
		var obj1 = $(arrowDivID);
		var obj2 = $(outerDivID);
		if (obj1 && obj2) {
			animated = true;
			vArrowWrapperID = outerDivID;
			vArrowsID = arrowDivID;
			vArrowTarget = targetH;
			curH = parseInt($(vArrowsID).style.height);
			curY = parseInt($(vArrowWrapperID).style.top);
			origY = curY;
			arrowTimer = setTimeout("increaseArrowHeight()",arrowSpeed);	
		}
	} catch (ex) {
		// DEBUG
		alert("animateVertical: " + ex);
	}
}

function increaseArrowHeight() {
	try {
		var obj = $(vArrowsID);
		var wrapper = $(vArrowWrapperID);
		if (obj && wrapper) {
			wrapper.removeClassName("hidden");	
			if (curH < vArrowTarget) {
				// increase width of arrows
				curH += incrDecr;
				obj.style.height = curH + "px";
				// decrease left coordinate of arrows position
				curY -= Math.floor(incrDecr/2);
				wrapper.style.top = curY + "px";
				arrowTimer = setTimeout("increaseArrowHeight()",arrowSpeed);	
			} else {
				// clear timeout
				clearTimeout(arrowTimer);
				arrowTimer = null;
				if (animated) {
					animated = false;
				} else {
					hideArrowsV();
				}
			}			
		} else {
			// clear timeout
			clearTimeout(arrowTimer);
			arrowTimer = null;
			animated = false;
		}		
	} catch (ex) {
		// DEBUG
		alert("increaseArrowHeight: " + ex);	
	}
}

function hideArrowsV() {
	if ((vArrowWrapperID != null) && (vArrowsID != null)) {
		// add class name to hide 
		$(vArrowWrapperID).addClassName("hidden");
		// reset to original y position
		$(vArrowWrapperID).style.top = origY + "px";
		// reset default height
		$(vArrowsID).style.height = "5px";
		// reset variables
		var vArrowTarget = 0;
		var curH = 0;
		var curY = 0;
		// clear timeout
		clearTimeout(arrowTimer);
		arrowTimer = null;
		animated = false;
	}
}

function launchAvailabilityOptions(id) {
	try {
		// set object references
		var wrapperObj = $("options_availability_wrapper" + id);
		var availObj = $("options_availability" + id);
		// get the user's screen dimensions and calculate center point
		var screenWidth = getBrowserWidth();
		var screenHeight = getBrowserHeight();
		// scrolling offset
		var scrollY = getOffsetY();
		// set wrapper height
		if( window.innerHeight && window.scrollMaxY ) // Firefox
		{
			pageWidth = window.innerWidth + window.scrollMaxX;
			pageHeight = window.innerHeight + window.scrollMaxY;
		}
		else if( document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
		{
			pageWidth = document.body.scrollWidth;
			pageHeight = document.body.scrollHeight;
		}
		else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
		{
			pageWidth = document.body.offsetWidth + document.body.offsetLeft;
			pageHeight = document.body.offsetHeight + document.body.offsetTop;
		}
		if (availObj && wrapperObj) {
			// snapshot dimensions
			var availObjWidth = parseInt(availObj.style.width);
			var availObjHeight = parseInt(availObj.style.height);
			// set snapshot coordinates
			var x = Math.floor(screenWidth/2) - Math.floor(availObjWidth/2) + "px";
			var y = Math.floor(screenHeight/2) - Math.floor(availObjHeight/2) + scrollY + "px";
			// make visible
			availObj.style.top = y;
			availObj.style.left = x;
			// set wrapper height
			wrapperObj.style.height = pageHeight + "px";
			// display wrapper and availability options
			wrapperObj.style.display = "block";
			availObj.style.display = "block";
		}
	} catch (ex) {
		// debug
		alert("launchAvailabilityOptions(): " + ex);
	}
}

function closeAvailabilityOptions(id) {
	// set object references
	var wrapperObj = $("options_availability_wrapper" + id);
	var availObj = $("options_availability" + id);
	if (availObj && wrapperObj) {
		wrapperObj.style.display = "none";
		availObj.style.display = "none";	
	}
}

// fade product detail messages
var detailsFaderDelay = null;
var detailsFader = null;
var detailsOpac = 100;
var detailsProdId = "";
var detailsErrMsgId = "";
var detailsOpacDecr = 5;
var detailsDelay = 4000;
function fadeDetailsMsg(id) {
	// set global variable to track divs
	detailsProdId = id;
	// set detail err msg div id
	detailsErrMsgId = "l" + id + "colorsizenotavailable";
	// set object
	var obj = $(detailsErrMsgId);
	if (obj) {
		// make sure element is visible
		obj.style.display = "block";
	}
	// start delay timer to fade message
	detailsFaderDelay = setTimeout("delayFadeDetailsMsg()", detailsDelay);	
}
function delayFadeDetailsMsg() {
	// clear delay timer
	if (detailsFaderDelay != null) {
		// clear timeout
		clearTimeout(detailsFaderDelay);
		detailsFaderDelay = null;
		// fade away
		quickFadeDetailsMsg();
	}	
}
function quickFadeDetailsMsg() {
	// set object
	var obj = $(detailsErrMsgId);
	// check if object exists
	if (obj) {
		// if opacity is greater than 0, decrement
		if (detailsOpac > 0) {
			// decrement opacity
			detailsOpac -= detailsOpacDecr;
			// update opacity
			setDetailsOpac(detailsOpac);
			detailsFader = setTimeout("quickFadeDetailsMsg()", 10);
		} else {
			// clear timeout
			clearTimeout(detailsFader);
			detailsFader = null;
			// hide element
			obj.style.display = "none";
			// reset opacity
			detailsOpac = 100;
			setDetailsOpac(detailsOpac);
			// change add to bag message back
			resetAddToBag(detailsProdId);
			// change wishlist message back
			resetAddToWishlist();
		}
	} else {
		// change add to bag message back
		resetAddToBag(detailsProdId);
		// change wishlist message back
		resetAddToWishlist();		
	}
}
function setDetailsOpac(opac) {
	var obj = $(detailsErrMsgId);
	if (obj) {
		if (obj.style.opacity) {
			obj.style.opacity = opac/100;
		} else if (obj.filters) {
			obj.style.filter = "alpha(opacity=" + opac + ")";
		} else {
			obj.style.MozOpacity = opac/100;
		}
	}
}
//reset styles and text for add to bag button
function resetAddToBag(id) {
		
	var obj1 = $("l"+id+"addToBagBtn");
	var obj2 = $("addtobag"+id);

	if (obj1 && obj2 && obj1.hasClassName("itemsAdded")) {
		if(id == "GIFTCARD" || id == "21245832"){
			$("l"+"21245832"+"addToBagBtn").removeClassName("itemsAdded");
			$("l"+"GIFTCARD"+"addToBagBtn").removeClassName("itemsAdded");
			// swap innerHTML
			$("addtobag"+"21245832").innerHTML = "Add to Bag";
			$("addtobag"+"GIFTCARD").innerHTML = "Add to Bag";
		}		
		else{
		// remove itemsAdded class
		obj1.removeClassName("itemsAdded");
		// swap innerHTML
		obj2.innerHTML = "Add to Bag";
		}
	}
}

// reset styles and text for add to wishlist button
function resetAddToWishlist() {
	var obj = $("addToWishlist");
	if (obj && obj.hasClassName("added")) {
		// remove itemsAdded class
		obj.removeClassName("added");
		// swap innerHTML
		obj.innerHTML = "Add to Wishlist";
	}
}

//code added for trac 2974
function changeUrl(cardType)  {
	var queryString = document.URL;
	var item = getQueryVariable("id");
	// NOTE: eGiftCardId and giftCardId are global JS variables set on /catalog/egift_product_details.jsp
	if(cardType == true &&  typeof(eGiftCardId) != "undefined" && item != eGiftCardId)  {
	var myNewqueryString = queryString.replace(giftCardId, eGiftCardId);
	document.location.href =  myNewqueryString;
	}
	if(cardType == false && typeof(giftCardId) != "undefined" && item != giftCardId) { 
	var myNewqueryString = queryString.replace(eGiftCardId, giftCardId);
	document.location.href =  myNewqueryString;
	}
}

//function added to get the value of Id property from url.
function getQueryVariable(variable) {
	var mainquery = document.URL;
	var query = mainquery.split("?");
	var vars = query[1].split("&");
	for ( var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
} 
// Changes End for Trac-2974.

//Start : code added for trac 4220/4214
function callBVLoadRR(fisrProd,secondProd) {
	if(fisrProd != secondProd){
	bvLoadRR(fisrProd);
	}
}
//End : code added for trac 4220/4214

// TRAC 4747  Cleans size name and convert INCH to shorthand "
function cleanSize(str) {
    str = str.replace(/\sINCH/gi, "INCH");
    str = str.replace(/INCH/gi, "\"");
    
    return str;
}

