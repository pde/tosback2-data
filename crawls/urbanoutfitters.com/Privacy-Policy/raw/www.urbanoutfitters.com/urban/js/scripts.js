var W3CDOM = (document.createElement && document.getElementsByTagName);
var dirty = false;
function topnav()
{
        if (dirty) return;
	var moo = document.getElementsByClassName('over');
	var mouseOvers = new Array();
	var mouseOuts = new Array();

	for (var i=0; i < moo.length; i++) {
		moo[i].onmouseover = mouseGoesOver;
		moo[i].onmouseout = mouseGoesOut;
		var suffix = moo[i].src.substring(moo[i].src.lastIndexOf('.'));
		mouseOuts[i] = new Image();
		mouseOuts[i].src = moo[i].src;
		mouseOvers[i] = new Image();
		mouseOvers[i].src = moo[i].src.substring(0,moo[i].src.lastIndexOf('.')) + "_over" + suffix;
		moo[i].number = i;
	}
        dirty = true;
	function mouseGoesOver()
	{
		this.src = mouseOvers[this.number].src;
	}
	function mouseGoesOut()
	{
		this.src = mouseOuts[this.number].src;
	}
}

function popUp(url, height, width) {
	window.open(url, '', "width="+width+", height="+height+", resizable=yes, toolbar=no, menubar=no, location=no");
}

// url encode method
function URLEncode(clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

/* url decode */
function URLDecode(url) {
	// Replace + with ' '
	// Replace %xx with equivalent character
	// Put [ERROR] in output if %xx is invalid.
	var HEXCHARS = "0123456789ABCDEFabcdef";
	var encoded = url;
	var plaintext = "";
	var i = 0;
	while (i < encoded.length) {
		var ch = encoded.charAt(i);
		if (ch == "+") {
			plaintext += " ";
			i++;
		} else if (ch == "%") {
			if (i < (encoded.length-2)
				&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1
				&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				//alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		}
	}
}

/* search */
function handleSearchPhraseFocus(inputObj) {
    if (inputObj.value == inputObj.title) {
        inputObj.value = "";
    }
    document.getElementById("searchForm").className = "search-active";
}
function handleSearchPhraseBlur(inputObj) {
    if ((inputObj.value.length < 1 || inputObj.value == inputObj.title) && inputObj.title.length > 0) {
        inputObj.value = inputObj.title;
        document.getElementById("searchForm").className = "";
    }
}
function setSearchField() {
	var defaultSearchTxt = "search";
	// check if value is present in search field
	if ($("search_field")) {
		if ($("search_field").value.length > 0) {
			// if yes, ignore
		} else {
			// if no, use default text
			$("search_field").value	= defaultSearchTxt;
		}
		// attach onblur + onfocus events
		Event.observe($("search_field"),"blur",newSearchFieldBlur);
		Event.observe($("search_field"),"focus",newSearchFieldFocus);
	}
}

function createDiv(txt, x, y) {
	dv = document.createElement('div');
	document.body.appendChild(dv);
	//set the inner styling of the div tag 
	dv.style.position = "absolute";       
	dv.style.left = x + "px";
	dv.style.top = y + "px";
	dv.style.zIndex = 9999;
	dv.style.overflow = "hidden";
	dv.style.padding = "4px";
	dv.style.margin = "8px";
	dv.style.background = "#ffffff";
	dv.style.border = "solid 1px #999999";
	dv.style.color = "#999999";
	//set the html content inside the div tag
	dv.innerHTML = txt;
}
function removeToolTip() {
	if (dv != null) {
		document.body.removeChild(dv);
		dv = null;
	}
}

var curSubNavId = "";
var subNavTimer = null;
var overSubNav = false;
function showTopNavSubNav(event) {
	var elem = Event.element(event);
	var id = elem.parentNode.parentNode.id.substring(elem.parentNode.parentNode.id.indexOf("_")+1);
	var obj = $("primarysubnav_"+id);
	var objWrapper = $("topnav_subnavigation");
	var targetArr = new Array("womens","mens","apartment","sale","gift","community");
	targetArr["womens"] = 240;
	targetArr["mens"] = 215;
	targetArr["apartment"] = 245;
	targetArr["sale"] = 155;
	targetArr["general_category"] = 135;
	targetArr["community"] = 155;
	var targetH = targetArr[id];
	if (curSubNavId != "") {
		var curObj = $("primarysubnav_"+curSubNavId);
		// hide subnav if mouse is not over
		curObj.style.display = "none";
		// remove rollover from subnav
		var topNavItem = $("primarynavlink_"+curSubNavId);		
		if (topNavItem) {
			topNavItem.removeClassName("over");
		}
		if (id != "community") {
			// clear timeout
			clearTimeout(subNavTimer);
			subNavTimer = null;
		}
	}
	if (obj && objWrapper && id != "community") {
		overSubNav = true;
		// hide select menus on cat page for ie6
		var ie6 = (navigator.userAgent.indexOf("MSIE 6.") >=0) ? true : false;
		var sortBy = $("sortby");
		var shopBySize = $("shopBySize");
		if ((ie6) && (sortBy) && (shopBySize)) {
			sortBy.style.display = "none";
			shopBySize.style.display = "none";
		}
		// rollover class for current top nav selection
		var topNavItem = $("primarynavlink_"+id);
		if (topNavItem) {
			topNavItem.addClassName("over");
		}
		// check if topnav_subnavigation is already at max height
		if (objWrapper.style.borderBottom != "dotted 1px #0000FF") {
			objWrapper.style.borderBottom = "dotted 1px #0000FF";
			objWrapper.style.position = "absolute";
			if (location.href.indexOf("/urban/index.jsp") > 0) {
				//objWrapper.style.position = "absolute";
				objWrapper.style.borderTop = "dotted 1px #0000FF";
			}
			new Effect.Morph("topnav_subnavigation", {
				style: 'height: ' + targetH + 'px', 
				duration: 0.3, 
				delay: 0.1,
				transition: Effect.Transitions.sinoidal
			});
			// create subnav from array
			if (obj.innerHTML.length > 0) {
				// show subnav
				obj.style.display = "block";
			}
		}		
		curSubNavId = id;
	} else if (id == "community") {
		hideTopNavSubNav();
	}
}
function setSubNavState(bool) {
	overSubNav = bool;
}
function hideTopNavSubNav() {
	var obj = $("primarysubnav_"+curSubNavId);
	var objWrapper = $("topnav_subnavigation");
	if ((obj) && (obj.innerHTML.length > 0) && (objWrapper)) {
		if ((!overSubNav) && (subNavTimer != null)) {
			// clear timeout
			clearTimeout(subNavTimer);
			subNavTimer = null;
			// show select menus on cat page for ie6
			var ie6 = (navigator.userAgent.indexOf("MSIE 6.") >=0) ? true : false;
			var sortBy = $("sortby");
			var shopBySize = $("shopBySize");
			if ((ie6) && (sortBy) && (shopBySize)) {
				sortBy.style.display = "block";
				shopBySize.style.display = "block";
			}
			// active class for current top nav selection
			var topNavItem = $("primarynavlink_"+curSubNavId);		
			if (topNavItem) {
				topNavItem.removeClassName("over");
			}
			if (objWrapper) {
				new Effect.Morph("topnav_subnavigation", {
					style: 'height: 0px', 
					duration: 0.3, 
					delay: 0.1,
					transition: Effect.Transitions.sinoidal
				});
				objWrapper.style.borderBottom = "none";
				if (location.href.indexOf("/urban/index.jsp") > 0) {
					objWrapper.style.borderTop = "none";
				}
			}
		} else {
			clearTimeout(subNavTimer);
			subNavTimer = null;
			// set timeout
			subNavTimer = setTimeout("hideTopNavSubNav()",500);
		}
	}
}

/* account menu drop down animation */
var acctMenuTimer = null;
var acctMenuCurHeight = 0;
var acctMenuEndHeight = 48;
var acctMenuIncr = 5;
var acctMenuSpeed = 10;
var overAcctMenu = false;
var acctMenuMoving = false;
function showAcctMenu(e) {
	try {
		// update hover state
		overAcctMenu = true;
		acctMenuLinkWidth = Event.element(e).offsetWidth;
		var acctMenu = $("acctMenu");
		if ((acctMenu) && (!acctMenuMoving)) {
			acctMenuMoving = true;
			// center menu under acctMenuLink
			var diff = parseInt(acctMenuLinkWidth) - parseInt(acctMenu.style.width);
			var half = Math.floor(diff/2);
			// subtract half of the right padding offset
			half -= Math.floor(9/2);
			if (half > 0) {
				// move x number of pixels left
				//acctMenu.style.left = half + "px";
			}
			// reset arrow style
			$("acctMenuLink").addClassName("active");
			// set the display of the account menu to block
			acctMenu.style.display = "block";
			// set timeout to increase the height of the account menu
			increaseAcctMenuHeight();
		}
	} catch(ex) {
		// debug
		alert("showAcctMenu: " + ex);	
	}
}
function increaseAcctMenuHeight() {
	if (acctMenuCurHeight < acctMenuEndHeight) {
		// increment height
		acctMenuCurHeight += acctMenuIncr;
		// update menu height
		$("acctMenu").style.height = acctMenuCurHeight + "px";
		// set timer
		acctMenuTimer = setTimeout("increaseAcctMenuHeight()", acctMenuSpeed);
	} else {
		// clear timeout
		clearTimeout(acctMenuTimer);
		acctMenuTimer = null;
		acctMenuMoving = false;
	}
}
function decreaseAcctMenuHeight() {
	if (acctMenuCurHeight > 0) {
		// increment height
		acctMenuCurHeight -= acctMenuIncr;
		// update menu height
		$("acctMenu").style.height = acctMenuCurHeight + "px";
		// set timer
		acctMenuTimer = setTimeout("decreaseAcctMenuHeight()", acctMenuSpeed);
	} else {
		// clear timeout
		clearTimeout(acctMenuTimer);
		acctMenuTimer = null;
		// hide menu
		$("acctMenu").style.display = "none";
		acctMenuMoving = false;
	}
}
function setAcctMenuState(bool) {
	// move x number of pixels left
	overAcctMenu = bool;
}
function hideAcctMenu() {
	if ((!overAcctMenu) && (acctMenuTimer != null) && (!acctMenuMoving)) {	
		// reset arrow style
		$("acctMenuLink").removeClassName("active");
		// clear timeout
		clearTimeout(acctMenuTimer);
		acctMenuTimer = null;
		acctMenuMoving = true;
		// decrease menu height
		decreaseAcctMenuHeight();
	} else {
		overAcctMenu = false;
		if (acctMenuCurHeight >= acctMenuEndHeight) {
			acctMenuMoving = false;
		}	
		acctMenuTimer = setTimeout("hideAcctMenu()",250);
	}
}

// calendar slider
if(location.href.indexOf('TRENDS_DEC2010GATEWAY') > 0){
	Event.observe(window,'load', function() {	
			new Slider('slider',.7,7,false,true,0);
	});
}

Event.observe(window, "load", function() {
	attachTopNavSubNav();
	showCidToolTip();
	showSavedCidToolTip();
	showMobileTermsToolTip();
	addPageElementTags();
	checkoutPageElementTags();
	addFbLikeBox();
	displayCartClosenessQualifier();
	//displayInlineCart();
	captureGoogleClickId();
	//rotateLogo();
	reviewChecker();
	// for gift center
	var gcNavObj = $("primarynav_general_category");
	if (gcNavObj && gcNavObj.hasClassName("active")) {
		// check if objects exist otherwise create them and append them to the body tag
		var backstretch = $("backstretch");
		var videoStr = "";
		var allMyVideos = new Array("BlueGreen_Final","Dog_Final","Pink_Final","Sparkles","Turntable_Final","Water2_Final","Water_Final");
		// get random number 0-4 
		var randNum = Math.floor(Math.random()*allMyVideos.length);
		// get random video and update video tag src
		videoStr = '<video id="video" autoplay loop><source src="/urban/emails/gift_center11/videos/' + allMyVideos[randNum] + '.mov" type="video/mp4" />';
		videoStr += '<source src="/urban/emails/gift_center11/videos/' + allMyVideos[randNum] + '.ogv" type="video/ogg" /></video>';
		// check if divs exist
		if (!backstretch) {
			bDiv = document.createElement("div");
			bDiv.id = "backstretch";
			bDiv.innerHTML = videoStr;
			// append to body
			document.body.insertBefore(bDiv, document.body.firstChild);
		} else {
			backstretch.innerHTML = videoStr;
		}
		
	}
	adjustBg();
	// added to bag modal window
	showAddedToBagWindow();
});
Event.observe(document, "unload", Event.unloadCache);

//background video adjustment
function adjustBg() {
	// check if objects exist otherwise create them and append them to the body tag
	var backstretch = $("backstretch");
	var vid = $("video");
	if (backstretch && vid) {
		// window
		var winHeight = getBrowserHeight();
		var winWidth = getBrowserWidth();
		// video
		var vidWidth = 468;
		var vidHeight = 253;
		var vidRatio = vidWidth / vidHeight;
		// background container 
		var bgWidth = winWidth;
		var bgHeight = bgWidth / vidRatio;
		var bgOffset;
		// check dimensions
		if (bgHeight >= winHeight) {
			bgOffset = (bgHeight - winHeight) / 2;
			backstretch.style.top = "-" + bgOffset + "px";
		} else {
			bgHeight = winHeight;
			bgWidth = bgHeight * vidRatio;
			bgOffset = (bgWidth - winWidth) / 2;
			backstretch.style.left = "-" + bgOffset + "px";
		}	
		// set properties
		backstretch.style.width = bgWidth + "px"
		backstretch.style.height = bgHeight + "px";
		vid.style.width = bgWidth + "px";
		vid.style.height = bgHeight + "px";
		vid.style.display = "block";
		backstretch.style.display = "block";
	}
}
window.onresize = function() {
	adjustBg();	
}

function showAddedToBagWindow() {
	// show on product detail page only with no error messages visible
	var addedtomess = $("addedtomess");
	if ((window.location.href.indexOf("productdetail.jsp") > 0) && (!addedtomess)) {
		if (sessionStorage && sessionStorage.itemsAdded) {
			// convert session storage to json object
			var jsonObj = sessionStorage.itemsAdded.evalJSON();

			if (jsonObj) {
				var numItemsObj = $("addedToBagNumItems");
				var numItemsVal = jsonObj["quantity"];
				var titleObj = $("addedToBagTitle");
				var titleVal = jsonObj["title"];
				var thumbImgObj = $("addToBagThumbImg");
				var thumbImgVal = "http://images.urbanoutfitters.com/is/image/UrbanOutfitters/" + jsonObj["sku"]+ "_" + jsonObj["color"] + "_b?$detailthumb$";
				var swatchImgObj = $("addToBagSwatchImg");
				var swatchImgVal = "/urban/images/swatches/" + jsonObj["sku"]+ "_" + jsonObj["color"] + "_s.png";
				var priceObj = $("addedToBagPrice");
				var priceVal = jsonObj["price"];
				var isSalePrice = jsonObj["isSalePrice"];
				// populate modal window with json values
				if (numItemsObj && numItemsVal) {
					numItemsObj.innerHTML = numItemsVal;
				}
				if (titleObj && titleVal) {
					titleObj.innerHTML = titleVal;
				}
				if (thumbImgObj) {
					thumbImgObj.src = thumbImgVal;
				}
				if (swatchImgObj) {
					swatchImgObj.src = swatchImgVal;
				}
				if (priceObj && priceVal) {
					if (isSalePrice != null && isSalePrice) {
						priceObj.innerHTML = '<span class="salePrice">' + priceVal + '</span>';
					} else {
						priceObj.innerHTML = priceVal;
					}
				}
				// center modal window and display
				centerModalWindow('productDetailModalWin','productDetailModalWinWrapper');
			}
			// remove session data
			sessionStorage.removeItem("itemsAdded");
		}
	}
}
function closeAddedToBagModalWin() {
	var modalWinObj = $("productDetailModalWin");
	var modalWinObjWrapper = $("productDetailModalWinWrapper");	
	if (modalWinObj && modalWinObjWrapper) {
		// hide
		modalWinObjWrapper.style.display = "none";
		modalWinObj.style.display = "none";
	}
}
function continueShoppingCategory() {
	//direct either to last category page or homepage
	if (readCookie('lastCatURL') != null) {
		window.location.href = readCookie('lastCatURL');
	} else {
		window.location.href = "http://" + window.location.host + "/urban/index.jsp";
	}
}

var reviewIsChecked = false;
var reviewCheckerTimer = null;
function reviewChecker(){
	// check for bv ratings id
	if($("BVRRRatingSummaryLinkWriteFirstID")) {
		try {	
			// remove class from reviews tab
			$("reviewsTabLink").removeClassName("active");
			// add class to details tab
			$("detailsTabLink").addClassName("active");
			// switch viewable tab content
			toggleDetailTabContent('detailsTab');
		} catch (ex) {
			// debug
			//alert('reviewChecker: ' + ex);
		}
	} else { 
		// did not find bv ratings id, check boolean after 1.5 sec
		if(reviewIsChecked == false) {	
			// only check 1 time if intially fails to find id; otherwise we could be looping indefinitely
			reviewIsChecked = true;
			// recursively call function again
			reviewCheckerTimer = setTimeout("reviewChecker()", 1500);
		} else {  
			// clear timeout
			clearTimeout(reviewCheckerTimer);
			// reset timer global variable
			reviewCheckerTimer = null;			
		}
	}
}	

function rotateLogo() {
	var logoType = "png";
	var gcNavObj = $("primarynav_general_category");
	if (window.location.pathname != "/urban/index.jsp" && gcNavObj && !gcNavObj.hasClassName("active")) {
	   logoType = "gif";
	}
	$$("#header_logo h3 a").each(function(obj) {
	   obj.style.background = "url('/urban/images/2007_holiday/uo_logo_holiday11." + logoType + "') no-repeat";
    });
	/*
	// pick a random number between 1 and 5
	var num = Math.floor(Math.random()*5)+1;
	// set logo style
	var obj = $$("#header_logo h3");
	var counter = 0;
	obj.each(function(h) {
		if (counter == 0) {
			h.style.background = "url('/urban/images/2007_holiday/uo_logo_summer11_"+num+".png') no-repeat 0px 0px";
		}
		counter++;
	});
	*/
}

function attachTopNavSubNav() {
	$w("primarynav_womens primarynav_mens primarynav_apartment primarynav_sale primarynav_community primarynav_general_category").each(function(ea) {
		if ($(ea)) {
			var children = $(ea).descendants();
			children.each(function(c) {
				var curTag = c.tagName.toLowerCase();
				if (curTag.indexOf('a') >= 0) {
					// attach mouseover + mouseout events
					Event.observe(c, 'mouseover', showTopNavSubNav);
					Event.observe(c, 'mouseout', function(e) {
						setSubNavState(false);
						hideTopNavSubNav(e);
					});
					c.removeAttribute("title");
				}
			});
		}
		ea = null;
	});
	$w("primarysubnav_womens primarysubnav_mens primarysubnav_apartment primarysubnav_community primarysubnav_sale primarysubnav_general_category").each(function(x) {
		if ($(x)) {
			Event.observe(x, 'mouseover', function(e){setSubNavState(true);});
			Event.observe(x, 'mouseout', function(e){setSubNavState(false);});
		}
		x = null;
	});
	// account menu drop down
	var acctMenu = $("acctMenu");
	if (acctMenu) {
		Event.observe(acctMenu, 'mouseover', function(e){setAcctMenuState(true);});
		Event.observe(acctMenu, 'mouseout', function(e){setAcctMenuState(false);});
		var children = acctMenu.descendants();
		children.each(function(c) {
			var curTag = c.tagName.toLowerCase();
			if (curTag.indexOf('a') >= 0) {
				// attach mouseover + mouseout events
				Event.observe(c, 'mouseover', showAcctMenu);
				Event.observe(c, 'mouseout', function(e) {
					setAcctMenuState(false);
					hideAcctMenu(e);
				});
			}
		});	
	}
}

/* tooltip for CID message */
var cidDiv = null;
function showCidToolTip(e) {
	// check if objects exist
	if (($("cidToolTip")) && (location.href.indexOf("eco_confirm.jsp") < 0)) {
		Event.observe($("cidToolTip"), 'mouseover', cidToolTip);
		Event.observe($("cidToolTip"), 'mouseout', removeCidToolTip);
	}
}
function showSavedCidToolTip(e) {
	if (($("savedCidToolTip")) && (location.href.indexOf("eco_confirm.jsp") < 0)) {
		Event.observe($("savedCidToolTip"), 'mouseover', cidToolTip);
		Event.observe($("savedCidToolTip"), 'mouseout', removeCidToolTip);
	}
}
function createCidDiv(txt, x, y) {
	cidDiv = document.createElement('div');
	document.body.appendChild(cidDiv);
	//set the inner styling of the div tag 
	cidDiv.style.position = "absolute";       
	cidDiv.style.left = x + "px";
	cidDiv.style.top = y + "px";
	cidDiv.style.zIndex = 9999;
	cidDiv.style.width = "260px";
	cidDiv.style.height = "80px"
	cidDiv.style.overflow = "hidden";
	cidDiv.style.padding = "4px";
	cidDiv.style.margin = "8px";
	cidDiv.style.background = "#ffffff";
	cidDiv.style.border = "solid 1px #999999";
	cidDiv.style.color = "#000000";
	cidDiv.style.fontSize = "11px";
	cidDiv.style.lineHeight = "14px";
	//set the html content inside the div tag
	cidDiv.innerHTML = txt;
}
function cidToolTip(e) {
	var content = '<div id="cidContent" style="position:relative;">';
	content += '<iframe src="" border="0" frameborder="0" height="80" width="260" class="selectBlocker"></iframe>';
	content += '<div style="position:absolute; top:0px; left:0px; z-index:2">This is the 3 or 4 digit code found on the back of your credit card or front of an American Express card. It helps protect your card from unauthorized use.';
	content += '<br/><img src="/urban/images/2007_holiday/cid.jpg" style="padding-top:3px;" /></div></div>';
	createCidDiv(content, Event.pointerX(e), Event.pointerY(e));
}
function removeCidToolTip() {
	if (cidDiv != null) {
		document.body.removeChild(cidDiv);
		cidDiv = null;
	}
}

/* tool tip for mobile terms and conditions */
function showMobileTermsToolTip(e) {
	var aTags = document.getElementsByTagName("a");
	if ((aTags.length > 0) && ((location.href.indexOf("myaccount.") > 0) || (location.href.indexOf("account_menu.") > 0) || (location.href.indexOf("emailsignup.") > 0))) {
		for (var i=0; i<aTags.length; i++) {
			var c = aTags[i];
			if (c.href == "http://form.acumob.com/resources/uo/uohelp.php") {
				c.href = "javascript:void(0)";
				c.target = "_self";
				Event.observe(c, 'mouseover', mobileTermsTip);
				Event.observe(c, 'mouseout', removeToolTip);
				break;
			} else {
				continue;
			}
		}
	}
}
function createMobileTermsDiv(txt, x, y) {
	dv = document.createElement('div');
	document.body.appendChild(dv);
	//set the inner styling of the div tag 
	dv.style.position = "absolute";       
	dv.style.left = x + "px";
	dv.style.top = y + "px";
	dv.style.zIndex = 9999;
	dv.style.width = "260px";
	dv.style.overflow = "hidden";
	dv.style.padding = "4px";
	dv.style.margin = "-80px 0px 0px -55px";
	dv.style.background = "#ffffff";
	dv.style.border = "solid 1px #999999";
	dv.style.color = "#000000";
	dv.style.fontSize = "11px";
	dv.style.lineHeight = "14px";
	//set the html content inside the div tag
	dv.innerHTML = txt;
}
function mobileTermsTip(e) {
	var content = "To receive monthly text promotions and updates, enter your mobile number. 2 msgs per month. Msg &amp; Data Rates May Apply. To discontinue service reply STOP to 868686. All major carriers supported.";
	createMobileTermsDiv(content, Event.pointerX(e), Event.pointerY(e));
}

/* add coremetrics element tags */
function addPageElementTags() {
	if (location.href.indexOf("productdetail.jsp") > 0) {
		// pass an array of ids to function to add cm pageElementTags
		$w("addToWishlist sendToFriend sizeChartLink videoTabLink detailsTabLink reviewsTabLink askAndAnswerTabLink socialTabLink").each(function(x) {
			if ($(x)) {
				Event.observe(x, 'mouseup', function(e) {
					cmCreatePageElementTag(x,"Product Detail");
				});
			}
		});
		// check for multi product template and add tags to each "Add to Cart" button
		var coll = $$(".multiproduct_details span.addtobag input.add_tocart");
		if (coll) {
			coll.each(function(c) {
				Event.observe(c, 'mouseup', function(e) {
					cmCreatePageElementTag("AddCart","MultiProdTemp");
				});
			});
		}
		// add to play video link
		var videoLinks = $$(".playVideo");
		if (videoLinks) {
			videoLinks.each(function(v){
				Event.observe(v, 'mouseup', function(e) {
					cmCreatePageElementTag("videoTabLinkn","Product Detail");
				});
			});
		}
	}
	if (location.href.indexOf("gift_card_balance_check.jsp") > 0) {
		var inputObj = $$("input[type='submit']");
		if (inputObj) {
			inputObj.each(function(e) {
				if (e.hasClassName("submitBtn")) {
					Event.observe(e, 'mouseup', function(e) {
						cmCreatePageElementTag("CheckBalance","GCChecker");
					});
				}
			});	
		}
	}
	// add to more uo links
	if ($("facebookMoreUO")) {
		$w("facebookMoreUO twitterMoreUO textMoreUO rssMoreUO").each(function(m) {
			if ($(m)) {
				Event.observe(m, 'mouseup', function(e) {
					cmCreatePageElementTag(m,"More UO");
				});				
			}
		});
	}
	// category pages
	if (location.href.indexOf("category.jsp")>=0) {
		// add to play video link
		var videoIcons = $$(".videoIcon");
		if (videoIcons) {
			videoIcons.each(function(v){
				Event.observe(v, 'mouseup', function(e) {
					cmCreatePageElementTag("videoIcon","Category Results Page");
				});
			});
		}
	}
	// cart page
	if (location.href.indexOf("single/index.jsp")>=0) {
		var payPalBtn = $$("#alternatePayExpress form img");
		if (payPalBtn) {
			payPalBtn.each(function(p){
				Event.observe(p, 'mouseup', function(e) {
					cmCreatePageElementTag("PAYPAL1","PAYPAL");
				});
			});
		}
	}
	// order review page
	if (location.href.indexOf("checkout/eco_confirm.jsp")>=0) {
		var payPalBtn = $("continueToPayPalLink");
		if (payPalBtn) {
			payPalBtn.onmouseup = function() {
				cmCreatePageElementTag("PAYPAL2","PAYPAL");
			}
		}
	}
}

/* add utility function for form focus issues with IE */
function check4Return(e, frmName, btnName) {
	if (e.keyCode == 13) {
		if ((document.forms[frmName]) && (document.forms[frmName].elements[btnName])) {
			document.forms[frmName].elements[btnName].focus();
		}
	}
}

/* add pageElement tags to checkout buttons */
function checkoutPageElementTags() {
	// add to login page
	if (location.href.indexOf("checkout_login.jsp") >= 0) {
		// sign-in button
		if ($("fLogin")) {
			Event.observe($("fLogin"), 'mouseup', function(e) {
				cmCreatePageElementTag("Sign-In","Checkout Login");
			});
		}
		// name for sign-up button: Continue
		if (document.forms['regForm']) {
			var signup = document.forms['regForm'].elements['Continue'];
			if (signup) {
				Event.observe(signup, 'mouseup', function(e) {
					cmCreatePageElementTag("Sign-Up","Checkout Login");
				});
			}
		}
		// name for guest checkout button: Continue
		if (document.forms['guestCheckoutForm']) {
			var guest = document.forms['guestCheckoutForm'].elements['Continue'];
			if (guest) {
				Event.observe(guest, 'mouseup', function(e) {
					cmCreatePageElementTag("Guest","Checkout Login");
				});
			}
		}
	} else if (location.href.indexOf("checkout_autologged.jsp") >= 0) {
		// we've got your back
		if ($("fLogin")) {
			Event.observe($("fLogin"), 'click', function(e) {
				cmCreatePageElementTag("Sign-In", "Checkout AutoLogged");		
			});
		}
	} else if (location.href.indexOf("full/shipping.jsp") >= 0) {
		// shipping page
		if (document.forms['shippingForm']) {
			var signup = $$("div.shoppingcart_checkout h5.button_checkout a");
			signup.each(function(s) {
				Event.observe(s, 'mouseup', function(e) {
					// check if guest checkout or not
					if (document.forms['guestAccountForm']) {
						cmCreatePageElementTag("Shipping Page","Guest Checkout");
					} else {
						cmCreatePageElementTag("Shipping Page","Regular Checkout");
					}	
				});
			});
		}
		if ($("guestAccountForm")) {
			var guest = $("continueBtn");
			Event.observe(guest, 'mouseup', function(e) {
				cmCreatePageElementTag("Shipping Page Create Account","Guest Checkout");
			});
		}
	} else if (location.href.indexOf("checkout/billing.jsp") >= 0) {
		if (document.forms['billingform']) {
			var continueBtn = $$('div.shoppingcart_checkout h5.button_checkout input[value="Continue Checkout"]');
			continueBtn.each(function(c) {
				Event.observe(c, 'click', function(e) {
					// check for saved credit cards
					if ($("saveCard")) {
						// regular checkout
						cmCreatePageElementTag("Billing Page","Regular Checkout");
					} else {
						// guest checkout cannot save credit cards
						cmCreatePageElementTag("Billing Page","Guest Checkout");
					}
				});
			});
		}
	} else if (location.href.indexOf("guest_co_thankyou.jsp") >= 0) {
		// thank you
		if ($("guestAccountForm")) {
			var guest = $("continueBtn");
			Event.observe(guest, 'mouseup', function(e) {
				cmCreatePageElementTag("Thank You Page Create Account","Guest Checkout");
			});
		}
	}
}

/* SHARE WIDGET */
// array of social networking sites
var shareSites = new Array("facebook","twitter","stumbleupon","tumblr","buzz","polyvore");
// facebook
shareSites["facebook"] = new Array("icon","name","url");
shareSites["facebook"]["name"] = "Facebook";
shareSites["facebook"]["icon"] = "/urban/images/2007_holiday/facebook-icon.gif";
shareSites["facebook"]["url"] = "http://www.facebook.com/sharer.php?u=URL&t=TITLE";
// twitter
shareSites["twitter"] = new Array("icon","name","url");
shareSites["twitter"]["name"] = "Twitter";
shareSites["twitter"]["icon"] = "/urban/images/2007_holiday/twitter_icon.png";
shareSites["twitter"]["url"] = "http://twitter.com/home/?status=URL";
// stumbleupon
shareSites["stumbleupon"] = new Array("icon","name","url");
shareSites["stumbleupon"]["name"] = "StumbleUpon";
shareSites["stumbleupon"]["icon"] = "/urban/images/2007_holiday/stumbleupon-icon.jpg";
shareSites["stumbleupon"]["url"] = "http://www.stumbleupon.com/submit?&url=URL&title=TITLE";
// tumblr
shareSites["tumblr"] = new Array("icon","name","url");
shareSites["tumblr"]["name"] = "Tumblr";
shareSites["tumblr"]["icon"] = "/urban/images/2007_holiday/tumblr-icon.gif";
shareSites["tumblr"]["url"] = "http://tumblr.com/share?v=2&u=URL&t=TITLE";
// google buzz
shareSites["buzz"] = new Array("icon","name","url");
shareSites["buzz"]["name"] = "Google Buzz";
shareSites["buzz"]["icon"] = "/urban/images/2007_holiday/buzz-icon.png";
shareSites["buzz"]["url"] = "http://www.google.com/buzz/post?url=URL&message=TITLE";
// polyvore
shareSites["polyvore"] = new Array("icon","name","url");
shareSites["polyvore"]["name"] = "Polyvore";
shareSites["polyvore"]["icon"] = "/urban/images/2007_holiday/polyvore_icon.png";
shareSites["polyvore"]["url"] = "http://www.polyvore.com/cgi/add?url=URL&title=TITLE&imgurl=IMGURL";
// display share widget on page
function displayShareWidget() {
	var shareObj = $("shareUO");
	var output = "";
	if (shareObj) {
		for (i in shareSites) {
			if (shareSites[i]["icon"] && shareSites[i]["name"]) {
				output += '<a href="javascript:shareIt(\'' + i + '\')" title="' + shareSites[i]["name"] + '">';
				output += '<img src="' + shareSites[i]["icon"] + '" height="16" width="16" alt="' + shareSites[i]["name"] + '" border="0" /></a>';
			}
		}
		shareObj.innerHTML = output;
	}
}
// create share url and launch pop-up to post to social site
function shareIt(site) {
	// add page element tag
	cmCreatePageElementTag(site,"Product Detail");
	var textareaObj = $$("textarea");
	var url = "";
	var imgurl = "";
	if (textareaObj) {
		textareaObj.each(function(e){
			if (e.value.length > 0) {
				url = URLEncode(e.value);
			}
		});
	} else {
		url = URLEncode(window.location.href);	
	}
	var title = URLEncode(document.title);
	var targetURL = "";
	if (shareSites[site]) {
		targetURL = shareSites[site]["url"];
		targetURL = targetURL.replace("URL", url);
		targetURL = targetURL.replace("TITLE", title);
		if (site == "polyvore") {
			var prodID = document.forms['socialTaggingForm'].elements['prodID'].value;
			imgurl = document.images['imgl'+prodID].src;
			if (imgurl.length > 0) {
				targetURL = targetURL.replace("IMGURL", imgurl);
			}
		}
		window.open(targetURL,"","resizable=yes,scrollbars=yes,width=600,height=400");
	}
}

// add jsp info to contact us form
function injectContactFooter() {
	// check for values
	var errors = false;
	var errMsg = "Please fill out all fields before submitting the form.";
	var firstName = $("firstName");
	if (firstName) {
		if (firstName.value.length == 0) {
			alert(errMsg);
			firstName.focus();
			return false;
		}
	}
	var lastName = $("lastName");
	if (lastName) {
		if (lastName.value.length == 0) {
			alert(errMsg);
			lastName.focus();
			return false;
		}
	}
	var emailAddress = $("emailAddress");
	if (emailAddress) {
		if (emailAddress.value.length == 0) {
			alert(errMsg);
			emailAddress.focus();
			return false;
		}
	}
	var subject = $("subject");
	if (subject) {
		if (subject.options[subject.options.selectedIndex].value.length == 0) {
			alert(errMsg);
			subject.focus();
			return false;
		}
	}
	var message = $("message");
	if (message) {
		if (message.value.length == 0) {
			alert(errMsg);
			message.focus();
			return false;
		}
	}
	// get fields
	var messageObj = $("message");
	var numItemsInCartObj = $("numItemsInCart");
	var originOfOrderObj = $("originOfOrder");
	var currentOrderObj = $("currentOrder");
	var serverInstanceObj = $("serverInstance");
	var userAgent = navigator.userAgent;
	try {
		messageObj.style.display = "none";
		str = "Number of Items in Cart: " + numItemsInCartObj.value + "<br>\r\n";
		str += "Origin of Order: " + originOfOrderObj.value + "<br>\r\n";
		str += "ATG Order ID: " + currentOrderObj.value + "<br>\r\n";
		str += "Server Info: " + serverInstanceObj.value + "<br>\r\n";
		str += "User Agent: " + userAgent + "<br>\r\n";
		messageObj.value += "<br>\r\n<br>\r\n" + str;
	} catch (err) {
		errors = true;
		//alert(err);
	}
	if (errors) {
		return false;
	} else {
		return true;
	}
}

// facebook like box, removed 10/18/10
function addFbLikeBox() {
	var obj = $("connect_facebook");
	if (obj) {
		var fbDomain = "http://www.facebook.com";
		if (location.href.indexOf("https:") >= 0) {
			fbDomain = fbDomain.replace("http:","https:");
		}
		var fbLikeBox = '<span id="fbLikeBox"><span id="connect_facebook_title">Like us on Facebook!</span><iframe src="'+fbDomain+'/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Furbanoutfitters&amp;layout=button_count&amp;show_faces=false&amp;width=100&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=50" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:50px;" allowTransparency="true"></iframe></span>';
		obj.innerHTML = fbLikeBox;
	}
}

// closeness qualifiers
function displayCartClosenessQualifier() {
	if (location.href.indexOf("cart.jsp") > 0) {
		// check if container has content
		var obj = $("cartClosenessMsg");
		var qualifier = $("qualifierCopy");
		// grab content from qualifier div
		//if ((obj) && (obj.innerHTML.length > 0)) {
		if ((obj) && (qualifier) && (qualifier.innerHTML.length > 0)) {
			// replace br tags
			obj.innerHTML = qualifier.innerHTML.replace(/<\/?[^>]+(>|$)/g, " ");
			obj.style.display = "block";
		}
	}
}

// closeness qualifiers
function showClosenessQualifier() {
	// check if inline cart is populated; only display on non-cart pages
	if (($("inlineCartItems")) && ($("inlineCartItems").innerHTML.length > 0)) {
		showInlineCart();
	}
	/*
	if (($("qualifierBg")) && ($("qualifierCopy")) && ($("qualifierCopy").innerHTML.indexOf("Free") > 0)) {
		// do not show on cart or checkout pages
		if (location.href.indexOf("/checkout/") < 0) {
			$("qualifierBg").style.display = "block";
		}
	}
	*/
}

function hideClosenessQualifier() {
	// check if inline cart is populated
	if (($("inlineCartItems")) && ($("inlineCartItems").innerHTML.length > 0)) {
		hideInlineCart();
		overInlineCart = false;
	}
	/*
	if ($("qualifierBg")) {
		$("qualifierBg").style.display = "none";
	}
	*/
}

// inline cart
function displayInlineCart() {
	/*
	try {
		// only get data if user is not on checkout pages
		if (location.href.indexOf("checkout") < 0) {
			// make sure inlinecartlink has correct mouseover events
			var obj = $("inlineCartLink");
			if (obj) {
				obj.onmouseover = function() {
					showClosenessQualifier();
				}
				obj.onmouseout = function() {
					hideClosenessQualifier();
				}
			}
			// prevent ajax request from being cached
			var timestamp = "&timestamp=" + new Date().getTime();
			// getCartView API
			var url = "/rest/bean/uo/commerce/integrations/CartIntegrationService/getCartView?atg-rest-depth=7" + timestamp;
			var params = "arg1=inlineCartView";
			// AJAX call
			new Ajax.Request(url, {
				method: 'post',
				parameters: params,
				onSuccess: function(transport) {
					// get JSON response object and store in global variable
					var response = transport.responseText.evalJSON();
			    	// check for commerce items
			    	if (response["data"]["commerceItems"]) {
			    		// display inline cart content
						populateInlineCart(response);
						// reload cart qualifier message
						reloadInlineCartQualifier();
					}
			    },
			    onFailure: function(transport) {
			    	alert("displayInlineCart: " + transport.responseText);
				}
			});
		}
	} catch (e) {
		// debug
		alert("displayInlineCart: " + e);
	}
	*/
}

function populateInlineCart(obj) {
	try {
		if (($("inlineCart")) && (obj)) {
			var str = "";
			// get last 10 line items
			var max = 10;
			var start = 0;
			var numLineItems = obj["data"]["commerceItems"].length;
			if (numLineItems > max) {
				start = numLineItems - max;
			}
			// adjust styles for more than 3 items
			if (numLineItems > 3) {
				$("inlineCartContent").style.height = "466px";
				$("inlineCartItems").style.height = "386px";
			} else {
				$("inlineCartContent").style.height = "auto";
				$("inlineCartItems").style.height = "auto";
			}
			var pro = "http:";
			if (location.protocol.indexOf("https:") >= 0) {
				pro = "https:";
			}
			$("inlineCartItems").innerHTML = "";
			for (var i=numLineItems; i>start; i--) {
				var cur = obj["data"]["commerceItems"][i-1];
				var img = pro + '//images.urbanoutfitters.com/is/image/UrbanOutfitters/' + cur["productId"] + '_' + cur["skuInformationCustomProperty"]["value"]["color"]["code"] + '_b?$cross$';
				str += '<div class="inlineCartItem">';
	            str += '<div class="inlineCartItemImg">';
	            str += '<a href="/urban/catalog/productdetail.jsp?id=' + cur["productId"] + '&color=' + cur["skuInformationCustomProperty"]["value"]["color"]["code"] + '&itemdescription=true&navAction=jump"><img src="' + img + '" /></a>';
	            str += '</div>';
	            str += '<div class="inlineCartItemCopy">';
	            str += '<a href="/urban/catalog/productdetail.jsp?id=' + cur["productId"] + '&color=' + cur["skuInformationCustomProperty"]["value"]["color"]["code"] + '&itemdescription=true&navAction=jump">' + cur["productCatalogInformationCustomProperty"]["value"]["description"] + '</a>';
	            str += cur["skuInformationCustomProperty"]["value"]["size"]["name"] + '<br/>';
	            str += cur["skuInformationCustomProperty"]["value"]["color"]["name"] + '<br/>';
	            str += 'Qty: ' + cur["quantity"] + '<br/>';
	            if ((cur["priceInfo"]["value"]["priceAdjustments"][1] != null) && (cur["priceInfo"]["value"]["priceAdjustments"][1]["totalAdjustment"].toString().indexOf("-") == 0)) {
		   			// list was/is sale price
					str += '<span class="price">' + toCurrency(cur["priceInfo"]["value"]["discountedAmount"]) + '</span> <span class="salePrice">was ' + toCurrency(cur["priceInfo"]["value"]["rawTotalPrice"]) + '</span>';
				} else if ((cur["priceInfo"]["value"]["priceAdjustments"][3] != null) && (cur["priceInfo"]["value"]["priceAdjustments"][3]["totalAdjustment"].toString().indexOf("-") == 0)) {
					// list was/is discount price
					str += '<span class="price">' + toCurrency(cur["priceInfo"]["value"]["discountedAmount"]) + '</span> <span class="salePrice">was ' + toCurrency(cur["priceInfo"]["value"]["priceAdjustments"][0]["totalAdjustment"]) + '</span>';
				} else {
					str += '<span class="price">' + toCurrency(cur["priceInfo"]["value"]["amount"]) + '</span>';
				}
	            str += '</div>';
	            str += '</div>';
			}
			$("inlineCartItems").innerHTML = str;
			// get subtotal 
			var subtotalAmt = obj["data"]["priceInfo"]["value"]["rawSubtotal"];
			$("inlineCartSubTotalAmt").innerHTML = toCurrency(subtotalAmt);
			// populate cart qualifier
			if ($("qualifierCopy").innerHTML.length > 7) {
				$("inlineCartQualifier").innerHTML = $("qualifierCopy").innerHTML;
			} else {
				$("inlineCartQualifier").style.display = "none";
			}
			// set x coordinate
			var x = Math.floor(getBrowserWidth()/2);
			var offsetX = 230;
			$("inlineCart").style.left = x + offsetX + "px";
			// check if product detail page
			if (location.href.indexOf("productdetail.jsp") > 0 && location.href.indexOf("&itemsadded=") > 0) {
				showInlineCartAddToCart();
			}	
		}
	} catch (e) {
		// debug
		//alert("populateInlineCart: " + e);
	}
}

var fadeInTimer = null;

var opac = 0;
var overInlineCartTimer = null;
var overInlineCart = false;
var inlineCartFadeTimer = 250;
function fadeInlineCart() {
	if (opac < 100) {
		// decrement
		opac += 8;
		// update css
		updateInlineCartCSS();
		// set timer
		fadeInlineTimer = setTimeout("fadeInlineCart()", 10);
	} else {
		// clear timeout		
		clearTimeout(fadeInlineTimer);
		fadeInlineTimer = null;
		// reset global opacity value
		opac = 100;
	}	
}

function updateInlineCartCSS() {
	var obj = document.getElementById("inlineCart");
	if (obj.filters) {
		obj.style.filter = "alpha(opacity=" + opac + ")";
	} else {
		obj.style.opacity = opac/100;
	}	
}

function showInlineCart() {
	inlineCartFadeTimer = 250;
	overInlineCart = true;
	// reset global opacity value
	opac = 0;
	// update css
	updateInlineCartCSS();
	$("inlineCart").style.display = "block";
	// fade inline cart into view
	fadeInlineCart();
}

function hideInlineCart() {
	if ((!overInlineCart) && (overInlineCartTimer != null)) {
		// clear timeout
		clearTimeout(overInlineCartTimer);
		overInlineCartTimer = null;
		overInlineCart = false;
		// hide subnav if mouse is not over
		$("inlineCart").style.display = "none";
	} else {
		// set timeout
		overInlineCartTimer = setTimeout("hideInlineCart()",inlineCartFadeTimer);
	}
}

function showInlineCartAddToCart() {
	inlineCartFadeTimer = 2000;
	overInlineCart = false;
	// reset global opacity value
	opac = 0;
	// update css
	updateInlineCartCSS();
	$("inlineCart").style.display = "block";
	// fade inline cart into view
	fadeInlineCart();
	hideInlineCart();
}

function reloadInlineCartQualifier() {
	try {
		// prevent ajax request from being cached
		var timestamp = "?timestamp=" + new Date().getTime();
		// AJAX call
		var url = "/urban/common/displayClosenessQualifiers.jsp" + timestamp;
		new Ajax.Request(url, {
			method: 'get',
			onSuccess: function(transport) {
				var data = transport.responseText;
				// redisplay closeness qualifier message
		    	var closenessObj = $("inlineCartQualifier");
		    	if (closenessObj) {
		    		closenessObj.innerHTML = data;    
		    		if ((data.length > 0) && (data.indexOf("<h4>") >= 0)) {
						closenessObj.style.display = "block";
					}
		    	}
		    },
		    onFailure: function(transport) {
		    	// debug
		    	alert(transport.responseText);
			}
		});
	} catch(e) {
		// DEBUG
		alert("reloadInlineCartQualifier: " + e);
	}
}

/* 
 * return value from query string using key name
*/
function getQstringValue(str) {
	var val = "";
	var pairs = new Array();
	var qString = location.search;
	// update key name
	str += "=";
	// check if clickid exists
	if (qString.indexOf(str) >=0 ) {
		// if yes, get value (question: will value always be at the end?)
		if (qString.indexOf("&") >= 0) {
			pairs = qString.split("&");
			for (var i=0; i<pairs.length; i++) {
				if (pairs[i].indexOf(str) >= 0) {
					val = pairs[i].substring(pairs[i].indexOf(str)+str.length);
				}				
			}
		} else {
			val = qString.substring(qString.indexOf(str)+str.length);
		}
	} 
	return val;	
}

/* capture google clickid */
function captureGoogleClickId() {
	var val = getQstringValue("clickid");
	var affiliate = getQstringValue("cm_mmc");
	if ((val != "") && (affiliate != "") && (affiliate.indexOf("Performics") >= 0)) {
		// date for cookie expiration
		var exdate = new Date();
		// contract to set cookie for 15 days or at time of checkout
		var days = 1;
		// expires N days from now
		exdate.setDate(exdate.getDate() + days);
		// expiration date format: Fri, 3 Aug 2001 20:47:11 UTC
		var expiration = exdate.toUTCString();
		// set cookie
		document.cookie = "googleClickId=" + val + "; expires=" + expiration + "; path=/";
	} else if ((affiliate != "") && (affiliate.indexOf("Performics") < 0)) {
		// clear cookie because another affiliate link was thrown
		try {
		  clearCookie("googleClickId");
        } catch(e) {}
	}
}
