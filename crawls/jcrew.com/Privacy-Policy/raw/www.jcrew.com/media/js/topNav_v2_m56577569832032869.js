// JavaScript Document

//browser detection
var userBrowser,userPlat;
if (navigator.userAgent.indexOf("MSIE") >= 0) userBrowser = "ie";
if (navigator.userAgent.indexOf("Firefox") >= 0 ) userBrowser = "ff";
if (navigator.userAgent.indexOf("Safari") >= 0) userBrowser = "sf";
userPlat = (navigator.userAgent.indexOf("Mac") >= 0) ? "mac" : "pc";

function validQnty(qntTxtField)
{
 	if(/[0-9]/.test(qntTxtField.value)) qntTxtField.value=qntTxtField.value.replace(/[a-z]/gi, "");
 	var val = qntTxtField.value;
 
 	if (val != null) {
	 	val = qntTxtField.value.replace(/^\s+|\s+$/g,"");
	 	if (isNaN(val)){
	 		val = '1';
	 	}else{
	 		if (val < 1){
	 			val = '1';
	 		}
	 	}
	} 
	if ( val == null || val == ''){
 		val = '1';
	}
 	qntTxtField.value = val;
}

//to find x,y of elements (object needs to be passed as variable)
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} 
		while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

function jsPaus(ms){
	var date = new Date();
	var curDate = null;
	do{ 
		curDate = new Date(); 
	} 
	while(curDate - date < ms);
}

//show the persistent cart
function showPersistCart(){
	var gotoPage = "/include/ajax/top_nav_persist.jsp";
	divTagId="topNavDiv";
	var callBack = "function callBackFunc(t) {if (t != null) {showBag(); } }";
	sendAjaxRequest(false, gotoPage, document.forms['add_to_cart','dont_add_to_cart'], divTagId, false, null, true, callBack);
}

function showError(t){
	var size = t.length;
	for(var i=0;i<size;i++){
		if (t[i]!=null && t[i]=='showError'){
			return true;
		}
	}
	return false;
}
function modifySpan(name){
	var span= document.getElementById(name);
	span.style.padding=0;
}
//add item to persistent cart
function addToCart(colorFieldName) 
{
	document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
	//set prevTemplates
	document.forms["add_to_cart"]["bmPrevTemplate"].value=document.forms["add_to_cart"]["ErrorRedirect"].value;
	//set color_name
	if(colorFieldName!=null && document.forms["add_to_cart"][colorFieldName]!=null){
		document.forms["add_to_cart"][colorFieldName].value="";
	}
    var gotoPage = "/include/ajax/top_nav_add_to_cart.jsp";
    divTagIds=new Array(4);
    divTagIds[0]="searchbox";
    divTagIds[1]="topNavDiv";
    divTagIds[2]="product_details_form";
    divTagIds[3]="inventory_error_0";
    divTagIds[4]="showError";
	var callBack = "function callBackFunc(t) {if (t[1] != null) { shoppingTongue.showBag();parent.scrollTo(0,0); getProductDetail();}else if (showError(t)){modifySpan('errorSpan');/*do nothing so error msg will appear*/;}else{location.reload(true);} }";
	sendAjaxRequest(false, gotoPage, document.forms['add_to_cart'], divTagIds, true, "add_to_cart", true, callBack);
}

//remove an item from the persistent cart
function removeFromCart(url, noItems, prod, sku, price, qty, pcFlag)
{
 	var gotoPage = url;
 	var items = noItems;
 	divTagIds=new Array(2);
    divTagIds[0]="searchbox";
    divTagIds[1]="topNavDiv";
	if (items > 1) 
	{
		var callBack = "function callBackFunc(t) {if (t[1] != null) {shoppingTongue.showBag(); } }";
	} 
	else 
	{
		var callBack = "function callBackFunc(t) {if (t[1] != null) { } }";
	}
	//omniture
	var s = s_gi(s_account);
    s.linkTrackVars = 'channel,prop11,products,events,prop22,prop41,eVar41,eVar42';
    s.linkTrackEvents = 'scRemove';
    s.channel = 'Checkout';
    s.events = 'scRemove';
    s.prop11 = 'Checkout';
    s.products = ";"+prod;
    s.tl(this,'o','Mini Cart - Remove');
	
 	sendAjaxRequest(false, gotoPage, document.forms['persistent_shopping_cart'], divTagIds, true, "remove_from_cart", true, callBack);
}

function editFromCart(prod) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'channel,prop11,products,events,prop22,prop41,eVar41,eVar42';
    s.linkTrackEvents = 'event39';
    s.channel = 'Checkout';
    s.events = 'event39';
    s.prop11 = 'Checkout';
    s.products = ';'+prod;
    s.tl(this,'o','Mini Cart - Edit');
}
 
//check is persistent cart is open/close & do appropriate actions
function isBagOpen()
{
 	var shoppingBag = document.getElementById("persistShoppingBag");
 	if(shoppingBag && shoppingBag.style.display == 'block')
 	{
 		shoppingBag.style.display = 'none';
		document.getElementById("shoppingBagBttn").src = imgShoppingBagClosePath;
		var iframe = document.getElementById("if_persistShoppingBag"); 
		if(iframe != null)
		{
        	iframe.style.display = 'none';
            iframe.style.width = 0;
          	iframe.style.height = 0;
            iframe.style.left = 0;
            iframe.style.top = 0;
        } 
 	}
 	else
 	{
 		showPersistCart();
 		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
 	}
}

//close the bag if it is open
function closeBag()
{
	var shoppingBag = document.getElementById("persistShoppingBag");
 	if(shoppingBag && shoppingBag.style.display == 'block')
 	{
		shoppingBag.style.display = 'none';
		document.getElementById("shoppingBagBttn").src = imgShoppingBagClosePath;
		var iframe = document.getElementById("if_persistShoppingBag"); 
		if(iframe != null)
		{
			iframe.style.display = 'none';
            iframe.style.width = 0;
            iframe.style.height = 0;
            iframe.style.left = 0;
            iframe.style.top = 0;
        } 
 	}
}

//open & adjust persistent cart position
function showBag()
{	
	var shoppingBag = document.getElementById("persistShoppingBag");
	if(shoppingBag && shoppingBag.style.display == 'none')
	{
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var shpnBagX = findPos(document.getElementById("shoppingBagBttn"));
		ajustX = (userBrowser == "ie" ? 1 : 1);
		
		if (userPlat == "mac" && userBrowser == "sf") {
			ajustY = 14;
		} else {
			ajustY = (userBrowser == "ie" ? 16 : 16);
		}
		
		shoppingBag.style.display = 'block';
		shoppingBag.style.left = shpnBagX[0] - 86 + "px";
        shoppingBag.style.top = shpnBagX[1] - 1 + "px";
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var iframe = document.getElementById("if_persistShoppingBag"); 
		if(iframe != null)
		{
			var layer = document.getElementById("persistShoppingBag");
			layer.style.zIndex = 900;
			iframe.style.zIndex = layer.style.zIndex - 1;
            iframe.style.display = 'block';
            iframe.style.width = layer.offsetWidth;
            iframe.style.height = layer.offsetHeight;
            iframe.style.left = shoppingBag.style.left;
            iframe.style.top = shoppingBag.style.top;
        } 
	}
}

// update shopping bag coordinations.
window.onresize = function () {
	
	var shoppingBag = document.getElementById("persistShoppingBag");
	if(shoppingBag)
	{
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var shpnBagX = findPos(document.getElementById("shoppingBagBttn"));
		ajustX = (userBrowser == "ie" ? 1 : 1);
		
		if (userPlat == "mac" && userBrowser == "sf") {
			ajustY = 14;
		} else {
			ajustY = (userBrowser == "ie" ? 16 : 16);
		}
		
		shoppingBag.style.left = shpnBagX[0] - 86 + "px";
		shoppingBag.style.top = shpnBagX[1] - 1 + "px";
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var iframe = document.getElementById("if_persistShoppingBag"); 
		if(iframe != null)
		{
			var layer = document.getElementById("persistShoppingBag");
			layer.style.zIndex = 900;
			iframe.style.zIndex = layer.style.zIndex - 1;
            iframe.style.display = 'block';
            iframe.style.width = layer.offsetWidth;
            iframe.style.height = layer.offsetHeight;
            iframe.style.left = shoppingBag.style.left;
            iframe.style.top = shoppingBag.style.top;
        } 
	}
}


function openPopupGeneral(p_url,p_width,p_height,p_scroll,p_resize){
	var p_arguments="";
	if(p_width!=null)p_arguments+="width="+p_width+",";
	if(p_height!=null)p_arguments+="height="+p_height+",";
	if(p_scroll!=null)p_arguments+="scrollbars="+p_scroll+",";
	if(p_resize!=null)p_arguments+="resizable="+p_resize;
	window.open(p_url,'JCpopUp',p_arguments);
}

function togglePromoDetails(obj, toggle){
	var newY = findPos(obj);
	var descDiv = document.getElementById('globalpromo_detailsDiv');
	var detailsDiv = document.getElementById('globalpromo_details');
	var iframe = document.getElementById("if_globalpromo");
	var promoContainer = document.getElementById("promo_container");
	
	if (toggle == 'open') { 
		descDiv.style.display='block';
		descDiv.style.position = 'absolute';
		var divHeight = descDiv.offsetHeight;
		ajustY = (userBrowser == "ie" ? -5 : 10);
		descDiv.style.left = detailsDiv.offsetLeft + 5 + "px";
		descDiv.style.top = detailsDiv.offsetTop + 25 + "px";
		descDiv.style.zIndex = 800;
		
		if (userBrowser == "ie") {
			promoContainer.style.zIndex = 15;
		}		
		
		if(iframe != null)
		{
            iframe.style.display = 'block';
			iframe.style.position = 'absolute';
            iframe.style.width = descDiv.offsetWidth ;
            iframe.style.height = descDiv.offsetHeight;
            iframe.style.left = descDiv.offsetLeft;
            iframe.style.top = descDiv.offsetTop + 2;
			iframe.style.zIndex = (userBrowser == "ie" ? 0 : descDiv.style.zIndex - 1);
			
        }
	} 
		
	if (toggle == 'close') { 
		descDiv.style.display='none'; 
		iframe.style.display = 'none';
	}
} 

function mkRandomString(stringLength) { 

	var chars = new Array ('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
	var charCount = chars.length;
 	
	var randomString = "";

   	i = 0;
   	do {
      		randomString += chars[Math.floor(Math.random()*charCount)];
      		i++;
   	}
   	while (i < stringLength); 
   
   	return randomString;
}

function popSizeChart(chartName){
        var a = window.open('/sizecharts/main.jsp?sizeChart='+chartName, 'sizeChart', 'scrollbars=yes,resizable=yes,width=760,height=600');
        if (a) {
                       if (a.closed){
                               alert('Popup window opened to fail, if you have popup blocker enabled, please disable it.');
                       }else{
                               if (window.focus){
                                      a.focus()
                               }
                       }
               }else{
                       alert('Popup window opened to fail, if you have popup blocker enabled, please disable it.');
               }
}

var showTongue = function() { 
	$("#persistShoppingBag").clearQueue().fadeIn(200);
};
var hideTongue = function() {
	$("#persistShoppingBag").clearQueue().fadeOut(200, function() {
		$("#if_persistShoppingBag").hide();
	});
};
var delayHideTongue = function(){
	setTimeout(function() {
		$("#persistShoppingBag").hide();
    }, 500);
};
function topNavShoppingBagSize(){
	var gotoPage= "/include/ajax/top_nav_cart_size.jsp";
	var divTagId = "shoppingbagDiv";
	sendAjaxRequest(true, gotoPage, null, divTagId);
}
var shoppingTongue = (function() { 
	var hasDivEntered, hasLinkEntered = false;
	var currentX, currentY, previousX, previousY, tongue_t, giftTongue_t;   
	var linkHoverCounter = 0;
	var linkTouchCounter = 0;
    var config = {
		sensitivity: 3,
		interval: 10,
		timeout: 300,
		over : showTongue,
		out : hideTongue
	};
    var isiPad = function(){ 
    	var isIpad = false;
    	var uagent = navigator.userAgent;
    	if(uagent.match(/AppleWebKit/i) && uagent.match(/ipad/i)) isIpad = true;
    	return isIpad;
    };
    var isTouchDevice = function(){
    	 return !!('ontouchstart' in window);
    }
	var track = function(event) {
		currentX = event.pageX;
		currentY = event.pageY;
	};		
	var compare = function(event,object) {
		object.shoppingTongueHover_t = clearTimeout(object.shoppingTongueHover_t);
		// compare mouse positions to see if they've crossed the threshold
		if ( ( Math.abs(previousX-currentX) + Math.abs(previousY-currentY) ) < config.sensitivity ) {
			$(object).unbind("mousemove",track);
			// set shoppingTongueHover state to true (so mouseOut can be called)
			object.shoppingTongueHover_s = 1;
			return config.over.apply(object,[event]);
		} else {
			// set previous coordinates for next time
			previousX = currentX; previousY = currentY;
			object.shoppingTongueHover_t = setTimeout( function(){compare(event, object);} , config.interval );
		}
	};
	// A private function for delaying the mouseOut function
	var delay = function(event,object) { 
		object.shoppingTongueHover_t = clearTimeout(object.shoppingTongueHover_t);
		object.shoppingTongueHover_s = 0;
		return config.out.apply(object,[event]);
	};
	var desktopAttachEvents = function(link){ 
		linkEvents(link);
	};
	var linkEvents = function(link){ 
		var div;
		if($(link).text().toLowerCase() != 'shopping bag'){//Due to limitation not able to change html markup need to rely on text if there's item in bag
			$(link).mouseover(function(e){
				if(!isCheckoutSection() && linkHoverCounter < 1)
	        		getShoppingBagContent();
				div = $("#persistShoppingBag");
				divEvents(div);
		        positionBag(div);	
		        if (div.is(':hidden'))
		        	showTongue();
		  	    hasLinkEntered = true;
		  	    linkHoverCounter++;
		  	});
		  	$(link).mouseout(function(e){
		  	    hasLinkEntered = false; 
			 });
		}
	};
	var divEvents = function(div){
		var object = div;
		$(div).mouseover(function(e){
			if(typeof tongue_t != 'undefined')
				clearTimeout(tongue_t);
    		hasDivEntered = true;	
    		var event = jQuery.extend({},e);			
    		if (object.shoppingTongueHover_t) { object.shoppingTongueHover_t = clearTimeout(object.shoppingTongueHover_t); }
    		previousX = event.pageX; previousY = event.pageY;
			$(object).bind("mousemove",track);
			// start polling interval (self-calling timeout) to compare mouse coordinates over time
			if (object.shoppingTongueHover_s != 1) { object.shoppingTongueHover_t = setTimeout( function(){compare(event,object);} , config.interval );}    		
    		$(div).fadeIn(200);	      	    
      	 });
    	$(div).mouseout(function(e){
    		hasDivEntered = false;	
    		var event = jQuery.extend({},e);
    		$(object).unbind("mousemove",track);
    		if (object.shoppingTongueHover_s == 1) {object.shoppingTongueHover_t = setTimeout( function(){if(!hasLinkEntered)delay(event,object);} , config.timeout );}   	    
      	 });  
      	 $("body").mouseup(function(){ 
            if(!hasDivEntered) hideTongue();
        }); 	
	};
	var iTouchAttachEvents = function(link){
		var div, iframe;
		var secondLink = $("#shoppingBagBttn2");
		$(secondLink).click(function(e){ 
			e.preventDefault();
			e.stopPropagation();  
      	 });
		if($(link).text().toLowerCase() != 'shopping bag'){ //Due to limitation not able to change html markup need to rely on text if there's item in bag
			$(link).click(function(e){ 
				e.preventDefault();
				e.stopPropagation();  
				if(!isCheckoutSection() && linkTouchCounter < 1)
	        		getShoppingBagContent();
				div = $("#persistShoppingBag");
				iframe = $("#if_persistShoppingBag");
		        positionBag(div);		        				
				linkTouchCounter++;
				if($(div).is(':visible')) {
					$(div).hide();
					$(iframe).hide();
				} else {
					$(div).show();
					$(iframe).show();
                }
	      	 });
		}
		document.addEventListener('touchstart', function(e) { 
			var elem = e.target;				
			var isInParent = ($(elem).parents().is("#persistShoppingBag"));		
		    var allowClick = !isInParent && e.target.id != 'shoppingBagBttn2';
		    var itShouldNotClose = isInParent && $(div).is(':visible'); 
		    if(allowClick && !itShouldNotClose){
		    	$(div).hide();
		    } else if (event.target.id == 'shoppingBagBttn2') {
		    	$(div).hide();
		    	e.preventDefault();
		    	e.stopPropagation();
		    }
		}, false);
	};
	var isCheckoutSection = function(){
		var inCheckOut = false;
		var pathURL = window.location.pathname
    	if(pathURL.match(/checkout/i)) inCheckOut = true;
		return inCheckOut;
	};
	var isGiftCardPage = function(){
		var inGiftCard = false;
		var pathURL = window.location.pathname
    	if(pathURL.match(/gift_card.jsp/i)) inGiftCard = true;
		return inGiftCard;
	};
	var getShoppingBagLink = function(isCallBackTouch){
		var gotoPage= "/include/ajax/top_nav_cart_size.jsp";
		var divTagId = "shoppingbagDiv";
		var callBack = (!isCallBackTouch) ? "shoppingTongue.attachEvents();" : "";
		if(isCheckoutSection())
			sendAjaxRequest(true, gotoPage, document.forms['add_to_cart','dont_add_to_cart'], divTagId, false, null, false, callBack);
		else
			sendAjaxRequest(true, gotoPage, document.forms['add_to_cart','dont_add_to_cart'], divTagId, false, null, true, callBack);
	};
	var getShoppingBagContent = function(){
		var gotoPage = "/include/ajax/top_nav_persist.jsp";
		divTagId="topNavDiv";
		var callBack = (!isTouchDevice()) ? "shoppingTongue.attachEvents();" : "";
		sendAjaxRequest(false, gotoPage, document.forms['add_to_cart','dont_add_to_cart'], divTagId, false, null, true, callBack);
	};
	
	var positionBag = function(div){	
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var shpnBagX = findPos(document.getElementById("shoppingBagBttn"));
		ajustX = (userBrowser == "ie" ? 1 : 1);
		
		if (userPlat == "mac" && userBrowser == "sf") {
			ajustY = 14;
		} else {
			ajustY = (userBrowser == "ie" ? 16 : 16);
		}
		$(div).css("left", shpnBagX[0] - 86);
		$(div).css("top", shpnBagX[1] - 1);
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var iframe = document.getElementById("if_persistShoppingBag"); 
		if(iframe != null)
		{
			var layer = document.getElementById("persistShoppingBag");
			layer.style.zIndex = 900;
			iframe.style.zIndex = layer.style.zIndex - 1;
            iframe.style.display = 'block';
            iframe.style.width = layer.offsetWidth;
            iframe.style.height = layer.offsetHeight;
            iframe.style.left = $(div).css("left");
            iframe.style.top = $(div).css("top");
        } 
		
	};
	var positionGiftBag = function(div){
		var shoppingBag = document.getElementById("lastPersistShoppingBag");		
		var shpnBagX = findPos(document.getElementById("shoppingBagBttn"));
		ajustX = (userBrowser == "ie" ? 1 : 1);
		ajustY = (userBrowser == "ie" ? 15 : 16);
		$(div).css("left", shpnBagX[0] - 86);
		$(div).css("top", shpnBagX[1] + ajustY + 12);
		document.getElementById("shoppingBagBttn").src = imgShoppingBagOpenPath;
		var iframe = $("#if_lastPersistShoppingBag");
		if(iframe.length)
		{	
			var layer = document.getElementById("lastPersistShoppingBag");
           	iframe.css('display', 'block');
            iframe.css('width', layer.offsetWidth - 9);
            iframe.css('height', layer.offsetHeight);
            iframe.css('left', layer.offsetLeft + 9);
            iframe.css('top', layer.offsetTop);
        } 		
	};
	var showTongueBag = function(){ 
		var div = $("#persistShoppingBag");
		var hasTouchCallBack = (isTouchDevice())? true : false;
		positionBag(div);
		showTongue();
		if(!isTouchDevice())
			divEvents(div);
		linkHoverCounter = 0;
		tongue_t = setTimeout(function() {hideTongue();getShoppingBagLink(hasTouchCallBack);if(isTouchDevice())getShoppingBagContent()}, 3000);
	};
	var showLastItemAddedToGiftBag = function(div){ 
		$(div).show();
		giftTongue_t = setTimeout(function() {hideLastItemAddedToGiftBag(div);}, 3000);			
		$(div).bind("mouseenter",function(){
			clearTimeout(giftTongue_t);
	    }).bind("mouseleave",function(){
	    	setTimeout(function() {hideLastItemAddedToGiftBag(div);}, 500);
	    });		
      	 $("body").mouseup(function(){ 
      		hideLastItemAddedToGiftBag(div);
        });
	};
	var hideLastItemAddedToGiftBag = function(div){ 
		$(div).hide();
	};
	return{				
        init : function(){ 
        	getShoppingBagLink(false);	            	
		},
		attachEvents : function(){ 
			var link = $("#shoppingBagBttn");
			if(isiPad() || isTouchDevice())
				iTouchAttachEvents(link);    
	        else
	        	desktopAttachEvents(link);
		},
		attachGiftEvents : function(){
			var div = $("#lastPersistShoppingBag");
			positionGiftBag(div);
			showLastItemAddedToGiftBag(div);
		},
		showGiftBag : function(){ 
			var self = this;
			self.attachGiftEvents();
		},
		showBag : function(){  
			var self = this;
			self.attachEvents();
			showTongueBag();
		},
		isITouch : function(){
			return isTouchDevice();
		}
	};
})();
$(document).ready(function() { 
	shoppingTongue.init();    
});