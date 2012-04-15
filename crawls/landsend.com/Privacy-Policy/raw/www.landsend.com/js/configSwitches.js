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
metric.criteoActive = true;    // set to true if you want Criteo activated for lestore
metric.criteoActiveCanvas = false;    // set to true if you want Criteo activated for canvas
metric.monetateActive = true;  // set to true if you want Monetate activated
metric.mercentActive = true; // set to true if you want Mercent activated

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
	
	if ((isCore && metric.criteoActive) || (isCanvas && metric.criteoActiveCanvas)) {
		metric.sendCriteo();
	}	
	
	if ((isCore && metric.eGainActive) || (isCanvas && metric.eGainActiveCanvas)) {
		metric.sendEgain();
	}

	if (metric.monetateActive) {
		metric.sendMonetate();
	}
	
	if (metric.mercentActive && window.location.pathname.indexOf("OrderConfirm.cgi") == -1 ) {
		metric.sendMercent();
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
	} else if (window.location.pathname.indexOf("OrderConfirm.cgi") != -1 && resx.itemid != null) {
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

if (metric.criteoActive) {
	// this needs to be written to the page before we get to the footer
	document.write("<scr" + "ipt type=\"text/javascript\" src=\"/js/criteo_ld.js\"><\/scr" + "ipt>");
}

if ( ((ratings.leActive && !location.host.match("canvas")) || (ratings.canvasActive && location.host.match("canvas"))) && 
	     (location.pathname.indexOf("/cgi-bin/") == -1 &&  location.pathname.indexOf("/co/") == -1 && location.pathname.indexOf("popupAllSites") == -1 
	                  && location.pathname.indexOf("/GiftCards.html") == -1)) {
	ratings.path = location.host.match("www.landsend.com|canvas.landsend.com|loadtest01.landsend.com")?"//reviews.landsend.com":"//reviews.landsend.com/bvstaging";
	ratings.bvSitePath = location.host.match("canvas")?"2019":"2008";
	document.write("<li" + "nk type=\"text/css\" rel=\"stylesheet\" href=\""+ratings.path+"/static/"+ratings.bvSitePath+"/bazaarvoice.css\"><\/li" + "nk>");
	document.write("<scr" + "ipt type=\"text/javascript\" src=\""+ratings.path+"/static/"+ratings.bvSitePath+"/bazaarvoice.js\"><\/scr" + "ipt>");
}

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

