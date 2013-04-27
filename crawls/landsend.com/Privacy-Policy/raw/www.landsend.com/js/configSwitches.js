var metric = {};
var chatObj = {};
var ratings = {};

metric.alvendaActive = false;  // set to true if you want to send alvenda tags
metric.acernoActive = true;   // set to true if you want to send aCerno tags
metric.doubleclickActive = true;   // set to true if you want to send doubleclick tags
metric.certonaActive = true;   // set to true if you want certona activated
metric.certonaISBActive = true; // set to true if you want certona activated on the inline shopping bag

metric.eGainActive = true;     // set to true if you want eGain activated for lestore
metric.eGainActiveCanvas = true; //set to true if you want eGain activated for canvas 
metric.criteoActive = false;    // set to true if you want Criteo activated for lestore
metric.criteoActiveCanvas = false;    // set to true if you want Criteo activated for canvas
metric.rocketFuelActive = false;    // set to true if you want RocketFuel activated
metric.monetateActive = true;  // set to true if you want Monetate activated
metric.mercentActive = true; // set to true if you want Mercent activated
metric.commissionJunctionActive = true; // set to true if you want Comission Junction activated
metric.googleAnalyticsActive = true; // set to true if you want Google Analytics activated
metric.dartFloodlightActive = false; // set to true if you want Dart Floodlight activated

ratings.leActive = true;  //set to true if you want ratings and reviews active for lestore
ratings.canvasActive = true;   //set to true if you want ratings and reviews active for canvas
metric.omnitureActive = true; // set to true if you want omniture activated
chatObj.chatActive = false;    // set to true if you want astara reactive/proactive chat enabled.


metric.ABTest = function (testName, alloc, eVar, testFunction) {
	this.getGroup = function(id) {
		for(var i=0,base=0; i< alloc.length; i++) {
			base +=alloc[i];
			if (id < base) break;
		}
		return String.fromCharCode(65+i);
	}
	var forcedGroup = getQueryVariable(testName);
	if (getCookie("kiosk") != "") forcedGroup = "A";
	if (forcedGroup.match(/^[A-Z]$/) != null) {
		setCookie(testName,forcedGroup,30);
	}
	try {
		var group = getCookie(testName);
		if((group == null || group.match(/^[A-Z]$/) == null)){
			group = this.getGroup(new Date().getMilliseconds()%100);
			setCookie(testName,group,30);
		}
		s_omtr[eVar]=s_omtr.getValOnce(testName + "-_-" + group ,testName+'-setOnce',0);
		
		testFunction(group, testName);
	}catch(e){/*console.log("error:"+e);*/}  
	return group;
};

metric.writeTags = function() {
	var isCore = location.host.match("canvas") == null;
	var isCanvas = location.host.match("canvas") != null;
	
	// code for Criteo vs. RocketFuel A/B Test
	if ($.cookie("CVR032713") == "B") {
		metric.criteoActive = true;
	} else if ($.cookie("CVR032713") == "C") {
		metric.rocketFuelActive = true;
	}
	
	if ((isCore && metric.criteoActive) || (isCanvas && metric.criteoActiveCanvas)) {
		metric.sendCriteo();
	}	

	if (metric.rocketFuelActive) {
		metric.sendRocketFuel();
	}	
	
	if ((isCore && metric.eGainActive) || (isCanvas && metric.eGainActiveCanvas)) {
		metric.sendEgain();
	}

	if (metric.monetateActive) {
		metric.sendMonetate();
	}
	
	if (metric.mercentActive && window.location.pathname.indexOf("OrderConfirm") == -1 ) {
		metric.sendMercent();
	}
	
	if (metric.commissionJunctionActive) {
		metric.sendCommissionJunction();
	}
	
	if (metric.googleAnalyticsActive) {
		metric.sendGoogleAnalytics();
	}
	
	if (metric.dartFloodlightActive) {
		metric.sendDartFloodlight();
	}
};

metric.sendEgain = function() {
    document.write('<scr' + 'ipt type=\"text\/javascript\" id=\"eGainOffers\" src=\"\/\/support.landsend.com\/system\/Offers.egain?command=GetRulesJS&egofferpageurl='+encodeURIComponent(document.URL)+'\"><\/sc' + 'ript>');
};

metric.sendMercent = function() {
	var m = document.createElement("script");
	m.setAttribute("src","//cdn.mercent.com/js/tracker.js");
	m.type = "text/javascript";
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
	
	m.onload = function(){
		mr_merchantID = "LandsEnd";
		mr_Track();
	};
};

metric.sendMonetate = function() {
	var monetateT = new Date().getTime();
	(function() {
	var p = document.location.protocol;
	if (p == "http:" || p == "https:") {
	var m = document.createElement('script'); m.type = 'text/javascript'; m.src = (p == "https:" ? "https://s" : "http://") + "b.monetate.net/js/1/a-18d54cf8/p/landsend.com/" + Math.floor(monetateT / 3600000) + "/g";
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
	}
	})(); 
};

metric.sendCriteo = function() {
	if (window.location.pathname.indexOf("/pp/") != -1 && resx.itemid != null) {
		// Product Tag
		var itemid = resx.itemid.split(":", 1);
		CRITEO.Load([{
			pageType: 'product',
			'Product ID':itemid
			}],[3396,7714506,7714507,{'Product ID':['i',0]}]);
	} else if (window.location.pathname.indexOf("/ix/") != -1 && resx.links != null) {
		// Search and Index Tag
		var items = resx.links.split(";");
		var productIDs = new Array();

		// only send the first three items
		for(var i=0; i < items.length && i < 3; i++) {
			productIDs.push(items[i].split(":")[0]);
		}
		
		// keyword search
		if (s_omtr.prop1 != null) {
			CRITEO.Load([{
				pageType: 'list',
				'Product IDs':productIDs,
				'Keywords': s_omtr.prop1
				}],[3396,7714506,7714507,{'Product IDs':['i',1,5],'Keywords':['kw',2]}]);
		} else {
			CRITEO.Load([{
				pageType: 'list',
				'Product IDs':productIDs
				}],[3396,7714506,7714507,{'Product IDs':['i',1,5],'Keywords':['kw',2]}]);
		}
	} else if (window.location.pathname.indexOf("ShoppingBag.html") != -1 && com.landsend.shoppingBag.shoppingBagModel != null) {
		// Basket Tag
		var model = com.landsend.shoppingBag.shoppingBagModel;
		var basket = model.getBasket();
		var skuItem;
		
		var productIDs = new Array();
		var prices = new Array();
		var quantities = new Array();

		for(var i = 0; basket.shipToArray != null && i < basket.shipToArray.length; i++) {
			for(var j = 0; basket.shipToArray[i].skuItemArray != null && j < basket.shipToArray[i].skuItemArray.length; j++) {
				skuItem = basket.shipToArray[i].skuItemArray[j];
				
				productIDs.push(skuItem.styleNum);
				prices.push((skuItem.unitPrice/100).toFixed(2));
				quantities.push(skuItem.quantity);
			}
		}
		
		CRITEO.Load([{
			pageType: 'basket',
			'Product IDs':productIDs,
			'Prices':prices,
			'Quantities':quantities
			}],[3396,7714506,7714507,{'Product IDs':['i',1],'Prices':['p',1],'Quantities':['q',1]}]);
	} else if (window.location.pathname.indexOf("OrderConfirm") != -1 && resx.itemid != null) {
		// Purchase Confirmation Tag
		var resxItems = resx.itemid.split(",");
		var resxPrices = resx.price.split(",");
		var resxQuantities = resx.qty.split(",");
		
		var productIDs = new Array();
		var prices = new Array();
		var quantities = new Array();

		for(var i=0; i < resxItems.length; i++) {
			productIDs.push(resxItems[i].split(":")[0]);
			prices.push(parseFloat(resxPrices[i]).toFixed(2));
			quantities.push(resxQuantities[i]);
		}
		
		CRITEO.Load([{
			pageType: 'confirmation',
			'Order ID':resx.transactionid,
			'Product IDs':productIDs,
			'Prices':prices,
			'Quantities':quantities
			}],[3396,7714506,7714507,{'Order ID':['t',0],'Product IDs':['i',1],'Prices':['p',1],'Quantities':['q',1]}]);
	} else if (window.location.pathname == "/") {
		// Home Page Tag
		CRITEO.Load([{
			pageType:'home'
			}],[3396,7714506,7714507]);
	}
};

metric.sendRocketFuel = function() {
	if (window.location.pathname.indexOf("/pp/") != -1 && resx.itemid != null) {
		// Product Tag
		var itemid = resx.itemid.split(":", 1);
		// Begin Rocket Fuel Universal Pixel
		  (function () {
		    var cachebust = (Math.random() + "").substr(2);
		    var protocol = "https:" == document.location.protocol ? 'https:' : 'http:';
			var prodIDs = itemid;
		    new Image().src = protocol+"//20504997p.rfihub.com/ca.gif?rb=2239&ca=20504997&ra="+cachebust+"&pid="+prodIDs;
		})();
		// End Rocket Fuel Universal Pixel
	} else if (window.location.pathname.indexOf("/ix/") != -1 && resx.links != null) {
		// Search and Index Tag
		var items = resx.links.split(";");
		var productIDs = new Array();

		// only send the first three items
		for(var i=0; i < items.length && i < 3; i++) {
			productIDs.push(items[i].split(":")[0]);
		}
		// Begin Rocket Fuel Universal Pixel
		  (function () {
		    var cachebust = (Math.random() + "").substr(2);
		    var protocol = "https:" == document.location.protocol ? 'https:' : 'http:';
			var prodIDs = productIDs.join();
		    new Image().src = protocol+"//20504997p.rfihub.com/ca.gif?rb=2239&ca=20504997&ra="+cachebust+"&pid="+prodIDs;
		})();
		// End Rocket Fuel Universal Pixel
		
	} else if (window.location.pathname.indexOf("ShoppingBag.html") != -1 && com.landsend.shoppingBag.shoppingBagModel != null) {
		// Basket Tag
		var model = com.landsend.shoppingBag.shoppingBagModel;
		var basket = model.getBasket();
		var skuItem;
		
		var productIDs = new Array();

		for(var i = 0; basket.shipToArray != null && i < basket.shipToArray.length; i++) {
			for(var j = 0; basket.shipToArray[i].skuItemArray != null && j < basket.shipToArray[i].skuItemArray.length; j++) {
				skuItem = basket.shipToArray[i].skuItemArray[j];
				
				productIDs.push(skuItem.styleNum);
			}
		}
		
		// Begin Rocket Fuel Shopping Cart Pixel
		  (function () {
		    var cachebust = (Math.random() + "").substr(2);
		    var protocol = "https:" == document.location.protocol ? 'https:' : 'http:';
			var prodIDs = productIDs.join();
		    new Image().src = protocol+"//20505545p.rfihub.com/ca.gif?rb=2239&ca=20505545&ra="+cachebust+"&pid="+prodIDs;
		})();
		// End Rocket Fuel Shopping Cart Pixel
	} else if (window.location.pathname.indexOf("OrderConfirm") != -1 && resx.itemid != null) {
		// Purchase Confirmation Tag
		var resxItems = resx.itemid.split(",");
		var resxQuantities = resx.qty.split(",");
		
		var productIDs = new Array();
		var quantities = new Array();
		var customerType = 2; // default to existing customer
		
		// if it's the first visit, then it's probably a new customer
		if (s_omtr.getVisitNum() == 1) {
			customerType = 1;
		}

		for(var i=0; i < resxItems.length; i++) {
			productIDs.push(resxItems[i].split(":")[0]);
			quantities.push(resxQuantities[i]);
		}
		
		// Begin Rocket Fuel Conversion Pixel
		  (function () {
		    var cachebust = (Math.random() + "").substr(2);
		    var protocol = "https:" == document.location.protocol ? 'https:' : 'http:';
			var prodIDs = productIDs.join(); 	//PRODUCT IDs
			var prodQuan = quantities.join(); 	//PRODUCT QUANTITY
			var ordrev = resx.total;	//ORDER REVENUES
			var trid = resx.transactionid; 	//TRANSACTION IDs 
			var ctype = customerType; 	//1 FOR NEW, 2 FOR EXISTING
		    new Image().src = protocol+"//20505543p.rfihub.com/ca.gif?rb=2239&ca=20505543&ra="+cachebust+"&pid="+prodIDs+"&pquant="+prodQuan+"&revenue="+ordrev+"&transid="+trid+"&custtype="+ctype;
		})();
		// End Rocket Fuel Conversion Pixel
	} 
};

metric.sendCommissionJunction = function() {
	var cm_mmc = $.query.get("cm_mmc");
	
	var Events = {
		//Load the application
		"app_start": {appid: "OrderConfirm", id: "123", name: "Application start", event: Instrumentation.START_EVENT},
		"set_cookie": {appid: "OrderConfirm", id: "123", name: "Set CJ Cookie for cm_mmc rules", event: Instrumentation.MILESTONE_EVENT},		
		"delete_cookie_cm_mmc": {appid: "OrderConfirm", id: "123", name: "Delete CJ Cookie for cm_mmc rules", event: Instrumentation.MILESTONE_EVENT},
		"delete_cookie_referrer": {appid: "OrderConfirm", id: "123", name: "Delete CJ Cookie for referrer rules", event: Instrumentation.MILESTONE_EVENT},
		"app_end": {appid: "OrderConfirm", id: "123", name: "Page is ready to be used by the user", event: Instrumentation.END_EVENT}
	};
	
	// convert to a string so we can do string comparisons correctly
	if (cm_mmc != null) {
		cm_mmc = cm_mmc.toString();
	}	
	
	// if the cm_mmc parameter is set and it isn't CJ clear the cookie
	if (cm_mmc != null && cm_mmc.length > 2 && cm_mmc.substring(0,2).toLowerCase() != "cj") {
		$.cookie("aff_trck", 
				null, {
				expires : -1, 
				path : '/', 
				domain : '.landsend.com'});	
		Instrumentation.sendBeacon(Events.delete_cookie_cm_mmc);
	} else if (document.referrer) {
		// just get the base part of the referrer before any query string parameters which might include .landsend.com
		var referrerSplit = document.referrer.split("?");
		
		// if cm_mmc isn't set and the referrer is from outside then delete the cookie
		if (location.search.indexOf("cm_mmc") == -1 && referrerSplit[0].match("landsend.com|cardinalcommerce.com") == null) {
			/*
			$.cookie("aff_trck",
					null, {
					expires : -1, 
					path : '/', 
					domain : '.landsend.com'});
					*/
			Instrumentation.sendBeacon(id, Events.delete_cookie_referrer);
		}
	} 
	
	// set the cust_trck cookie if the cm_mmc query string is set to something starting with cj
	if (cm_mmc != null && cm_mmc.length > 2 && cm_mmc.substring(0,2).toLowerCase() == "cj") {
		$.cookie("aff_trck",
				cm_mmc, {
				expires : 1, 
				path : '/', 
				domain : '.landsend.com'});
		$.cookie("aff_trck_cjsid",
				$.query.get("CJSID"), {
				expires : 1, 
				path : '/', 
				domain : '.landsend.com'});
		Instrumentation.sendBeacon(Events.set_cookie);		
	}
	
	if (window.location.pathname.indexOf("OrderConfirm") != -1 && cj.itemids != null && $.cookie("aff_trck")) {
		var actionID = 353241; // core default
		if (location.host.match("m.landsend.com")) //mobile
		{
		  actionID = 353243; // core mobile
		  if (location.pathname.match("canvas.landsend.com")) 
		  {
			actionID = 353244; // canvas mobile
		  }
		} else if (location.host.match("canvas.landsend.com")) {
			actionID = 353242; // canvas
		}
	

		var tag = '<!-- BEGIN COMMISSION JUNCTION TRACKING CODE --><iframe height="1" width="1" frameborder="0" scrolling="no" src="https://www.emjcd.com/tags/c?containerTagId=772&';

		// Purchase Confirmation Tag
		var items = cj.itemids.split(",");
		var prices = cj.prices.split(",");
		var quantities = cj.qtys.split(",");
		var itemDiscounts = cj.itemDiscounts.split(",");
		
		for(var i=0; i < items.length; i++) {
			var curItem = items[i];
			var itemSpaceTox = curItem.replace(/ /g,"x");
			tag += "&ITEM" + (i+1) + "=" + itemSpaceTox;
			tag += "&AMT" + (i+1) + "=" + parseFloat(prices[i]).toFixed(2);
			tag += "&QTY" + (i+1) + "=" + quantities[i];
			tag += "&DCNT"+ (i+1) + "=" + itemDiscounts[i];
		}
		
		tag += '&CID=1523480&OID=' + resx.transactionid + '&TYPE=' + actionID + '&DISCOUNT=' + cj.orderDiscount + '&CURRENCY=USD" name="cj_conversion" ></iframe><!-- END COMMISSION JUNCTION TRACKING CODE -->';

		Instrumentation.sendBeacon(Events.app_start);
		document.write(tag);
		
		var beaconTag = '<iframe height="1" width="1" frameborder="0" scrolling="no" src="/coradiant/beacon-event.!cm?appid=OrderConfirm&evid=123&name=iFrameLoaded&random=' + Math.floor(Math.random() * 1000000) +'"></iframe>';

		document.write(beaconTag);
		
		setTimeout(function(){
			Instrumentation.sendBeacon(Events.app_end);
		}, 	1000);
	}	
};

metric.sendGoogleAnalytics = function() {
	 var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-37627257-1']);
	  _gaq.push(['_trackPageview']);
	 
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();	
};

metric.sendDartFloodlight = function() {
	var cm_re = $.query.get("cm_re");
	var path = window.location.pathname;
	var catStr = "";
	
	if (path == "/kids/" || cm_re == "Kids") {
		catStr = "type=lands280;cat=kidsu588;ord=";
	} else if (path == "/ix/girls-clothing/index.html" || cm_re == "Girls-_-D-5") {
		catStr = "type=lands280;cat=kids-284;ord=";
	} else if (path == "/ix/boys-clothing/index.html" || cm_re == "Boys-_-D-6") {
		catStr = "type=lands280;cat=kids-368;ord=";
	} else if (path == "/ix/womens-clothing/index.html" || cm_re == "Women-_-D-3") {
		catStr = "type=lands280;cat=woman190;ord=";
	} else if (path == "/ix/mens-clothing/index.html" || cm_re == "Men-_-D-4") {
		catStr = "type=lands280;cat=mencv866;ord=";
	} else if (path == "/ix/swimwear-swimsuits/index.html" || cm_re == "SWIM_-D-1") {
		catStr = "type=lands280;cat=swimv900;ord=";
	} else if (path == "/ix/outerwear/index.html" || cm_re == "Outerwear-_-D-2") {
		catStr = "type=lands280;cat=outer958;ord=";
	} else if (path == "/ix/shoes/index.html" || cm_re == "Shoes-_-D-7") {
		catStr = "type=lands280;cat=shoes040;ord=";
	} else if (path == "/ix/school-uniforms/index.html" || cm_re == "SchoolUniform-_-D-8") {
		catStr = "type=lands280;cat=schoo069;ord=";
	} else if (path == "/ix/home-travel-luggage/index.html") {
		catStr = "type=lands280;cat=forth474;ord=";
	} else if (path == "/ix/luggage/index.html" || cm_re == "D-11") {
		catStr = "type=lands280;cat=lugga549;ord=";
	} else if (path == "/ix/overstock-liquidations/index.html" || cm_re == "Overstocks_D-10") {
		catStr = "type=lands280;cat=saler674;ord=";
	} else if (path == "/canvas/" || path == "/canvas/index.html" || cm_re == "core-canv") {
		catStr = "type=lands280;cat=canva346;ord=";
	} else if (path == "/pp/GiftCards.html") {
		catStr = "type=lands280;cat=giftc933;ord=1;num=";
	} else if (path == "/co/Newsletter") {
		catStr = "type=lands280;cat=signu027;ord=1;num=";
	} else if (path == "/co/ShoppingBag.html") {
		catStr = "type=lands280;cat=shopp384;ord=1;num=";
	} else if (path == "/ix/canvas/Canvas/Women/Swim/index.html" || cm_re == "Canvas-Women-_-D-1-12") {
		catStr = "type=lecan479;cat=canva194;ord=";
	}
	
	if (catStr != "") {
		var axel = Math.random() + "";
		var a = axel * 10000000000000;
		document.write('<iframe src="http://2267851.fls.doubleclick.net/activityi;src=2267851;' + catStr + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
	}
};

if (typeof getCookie == 'undefined') {
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return "";
    }
}
//set kiosk-specific configSwitches
if (getCookie("kiosk") != "") {
	metric.alvendaActive = false;
	metric.acernoActive = false;
	metric.doubleclickActive = false;
	metric.criteoActive = false;
	metric.criteoActiveCanvas = false;		
}

document.write("<scr" + "ipt type=\"text/javascript\" src=\"/js/criteo_ld.js\"><\/scr" + "ipt>");
var resx = {
	"appid":"landsend01",
	"top1":100000, 
	"top2":100000, 
	"host":location.host.match("www.landsend.com|canvas.landsend.com|loadtest01.landsend.com")?"resx.landsend.com":"qaresx.landsend.com",
	"rrec":true,
	"send": function (){
		if (metric.certonaActive) {  		 
			document.write("<scr" + "ipt type=\"text/javascript\" src=\"/js/resxclsa.js\"><\/scr" + "ipt>");
		 } else {
			$("#cart_rr,#product_rr").css('visibility','visible');
		 }
	}
};

chatObj.writeReactiveLink = function() {
    var chatHTML="";
    if(this.chatActive){
        chatHTML+="<div id=\"chatContainer\" style=\"width:145px; font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#444444;\">"
        chatHTML+="<div id=\"chatAvailable\">";
        chatHTML+="<div><img style=\"float:left; padding:0px; margin:0px;\" ";
        chatHTML+="src=\"/images/chat/reactiveChat_header.gif\" alt=\"Get Live Help\" /></div>";
        chatHTML+="<div style=\"clear:both; padding:0px 3px 4px 3px;\">By text chat or phone - free!</div>";
        chatHTML+="<div>";
        chatHTML+="<a id=\"text-chat\" href=\"#\" style=\"padding:0px 5px 0px 0px;\"><img style=\"border:0px;\" src=\"/customerservice/contact_us/images/chat_online.gif\" alt=\"Chat Online\"></a>";
        chatHTML+="</div>";
        chatHTML+="</div>";
        chatHTML+="</div>";
    } else{
        chatHTML+="<div id=\"chatContainer\" style=\"width:145px; font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#444444;\">"
        chatHTML+="<div id=\"chatNotAvailable\">";
        chatHTML+="<div><img style=\"float:left; padding:0px; margin:0px;\" ";
        chatHTML+="src=\"/images/chat/reactiveChat_header.gif\" alt=\"Get Live Help\" /></div>";
        chatHTML+="<div style=\"clear:both; padding:0px 3px 4px 3px;\">Speak with a live person!</div>";
        chatHTML+="<div style=\"clear:both; padding:0px 3px 4px 3px; font-size:13px; font-weight:bold;\">800.963.4816</div>";
        chatHTML+="</div>";
        chatHTML+="</div>";
    }
    document.write(chatHTML);

	var isCanvas = location.host.match("canvas") != null;
	if (isCanvas) {
		$('#text-chat').click( function(event) {
			javascript:
			openHelp(1005,'landsend_canvas');
			event.preventDefault();
		});		
	} else {
		$('#text-chat').click( function(event) {
			javascript:
			openHelp(1004,'landsend_core');
			event.preventDefault();
		});
	}
}

chatObj.sendOmnitureControlGroupTag = function() {
    s_omtr.eVar36="Control_Group";
    s_omtr.events="event36";
    
    var s_code=s_omtr.tl();
    if(s_code)document.write(s_code);
}

if(chatObj.chatActive){
    window.cartTotalAmt = getCookie("cTotal");
    function eStara_quick_append(u) {
        var s=document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',u);
        s.setAttribute('charset','UTF-8');
        if(typeof(window.attachEvent)!='undefined') {
            document.body.appendChild(s);
        } else {
            document.getElementsByTagName('head').item(0).appendChild(s);
        }
    }            
    function eStara_loadlr(){
        try{
            eStara_quick_append('//as00.estara.com/fs/lr.php?onload=1&accountid=200106289523',0);
        } catch(e) {}
    }
    if (typeof(window.addEventListener)!='undefined') {
        window.addEventListener('load',eStara_loadlr,false);
    } else if(typeof(document.addEventListener)!='undefined') {
        document.addEventListener('load',eStara_loadlr,false);
    } else if(typeof(window.attachEvent)!='undefined') {
        window.attachEvent('onload',eStara_loadlr);
    }
    var script = "<script language='JavaScript' type='text/javascript' src='/js/InitiateCall2.js'></script>";
	document.writeln("");
	document.writeln(script);
	document.writeln("");
}

// this is just a dummy object that we create ONLY when omniture
// is turned off so we have function stubs that other parts of the
// page might try to call.
function dummyOmnitureObj() {
  this.getQueryParam         = function(str) {};
  this.getValOnce            = function(str1, str2, str3) {};
  this.apl                   = function(str1, str2, str3) {};
  this.getDaysSinceLastVisit = function() {};
  this.s_doPlugins           = function(str) {};
  this.t                     = function() {};
  this.tl                    = function() {};
}
// omniture script tag to output if omniture is active.
var omnitureScript = "<script language='JavaScript' type='text/javascript' src='/js/s_code.js' ></script>";
if(metric.omnitureActive){
	document.writeln("");
	document.writeln(omnitureScript);
	document.writeln("");
}else{
	// create dummy object for omniture variables to latch onto
	s_omtr = new dummyOmnitureObj();
}

// modernizer script include (this UX js framework is temporarily tagging along with config swiches as it must go in the head of the html page)
var modernizerScript = '<script type="text/javascript" src="/static/global/js/lib/modernizr.js" ></script>';
document.writeln("");
document.writeln(modernizerScript);
document.writeln("");

// Coremetrics is dead. Here lie the stubs for coremetrics
function dummyCMObj() {
  this.addTP                 = function() {};
}
cm = new dummyCMObj();
function cmCreatePageviewTag() {}
function cmCreateTechPropsTag(str1, str2) {}
function cmCreateTechPropsTag(str1, str2, str3) {}
function cmCreateDefaultPageviewTag() {}
function cmDisplayShop5s() {}
function cmCreateProductviewTag(str1, str2, str3) {}
function cmCreateShopAction5Tag(str1, str2, str3, str4, str5) {}
function cmCreateRegistrationTag(str1, str2, str3, str4, str5) {}
function cmSetLinkedProductCategories(str1) {}
function cmMVMUsageTag(str1,str2,str3,str4,str5,str6,str7) {}
function cmMVMProductTag(str1,str2,str3,str4) {}
function cmSetProductCategories(str1) {}
function cmSetProduction() {}
function cmPageviewOnClick(str1, str2) {}
function cmGetProductIndex(str1) {}
function cmCreateShopAction9Tag(str1,str2,str3,str4,str5,str6,str7,str8) {}
function cmDisplayShop9s() {}
function cmCreateOrderTag(str1,str2,str3,str4,str5,str6,str7) {}
function cmCreateErrorTag(str1) {}
function cmGetPageViewTagSrc(str1, str2) {}
function getOSK() {}
function cmApp() {}
function cmTP(str) {}

// Truesight monitoring utils
var Utils={ajax:function(a,b,c,d){if(d){a+="?";for(var e in d){a+=e+"="+d[e]+"&"}a=a.replace(/&$/,"")}var f=new XMLHttpRequest;f.open("GET",a,true);f.onreadystatechange=function(){if(f.readyState==4){if(f.status==200)if(b)b.call();else if(c)c.call()}};f.send(a)}};var Instrumentation={START_EVENT:"start-event",MILESTONE_EVENT:"event-milestone",END_EVENT:"end-event",sendBeacon:function(a){var b="/coradiant/"+a.event+".!cm";var c=function(a){};var d=function(a){};var e={appid:a.appid,evid:a.id,name:a.name,random:Math.floor(Math.random()*1e6)};Utils.ajax(b,d,c,e)}}
