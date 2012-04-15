 var isIE = navigator.appName.indexOf("Microsoft") != -1;

/* ============================================ */

/* ============================================= */


 //BVDomain switcher
 if (/virid.com$/.test(document.domain)){document.domain="virid.com"}
 if (/journeys.com$/.test(document.domain)){document.domain="journeys.com"}
 var BVisLoaded = false;
 
 //ATG Tag for click to chat
 if (typeof ATGSvcs != "undefined") {
    ATGSvcs.setUOID(200106296993);
 }

 function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

eventCancel = function (e) {
    if (!e)         
        if (window.event) e = window.event;else return;       
    if (e.cancelBubble != null) e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    if (window.event) e.returnValue = false;
    if (e.cancel != null) e.cancel = true;
    //alert(e.returnValue);
}

var newinHeight,newinWidth;
function popWin(newin, width, height){
	subwin = window.open(newin,"subwin","resizable=yes,scrollbars=yes,toolbar=no,width=" + width + ",height=" + height);
	subwin.focus();
}
function popModal(newin, width, height){
	subwin = window.open(newin,"subwin","resizable=no,scrollbars=no,toolbar=no,width=" + width + ",height=" + height);
	subwin.focus();
}
function openWin(newin, width, height){

	
	//iframe model
	var dvPopup = document.getElementById("dvPopup");
    if (!dvPopup) { dvPopup = createDiv("dvPopup","",null,null,"50%","100px"); }
	dvPopup.style.border = "10px solid #999999";
	dvPopup.style.background = "#FFFFFF";
    dvPopup.style.zIndex = "99";
    dvPopup.style.visibility = "visible"; //needed for the toggleDiv closer
	dvPopup.style.marginLeft = "-"+(width/2)+"px";
	dvPopup.innerHTML = "<table bgcolor=\"#FFFFFF\" border=\"0\" cellpadding=\"6\" cellspacing=\"0\" width=\""+width+"\">"+
     "<tr><td align=\"right\"><a href=\"javascript:toggleDiv('dvPopup');\"><img alt=\"close\" border=\"0\" height=\"8\" src=\"/images/jy_btn_quickclose.gif\" width=\"33\"></a></td></tr>"+
     "</table>";
	
	var fraPopup = document.createElement('iframe'); 
	fraPopup.setAttribute('id', fraPopup);
    fraPopup.name = "fraPopup";
    fraPopup.frameBorder = "0";
    fraPopup.width = width;
    fraPopup.height = height;
    fraPopup.src = newin;
    
    dvPopup.appendChild(fraPopup);
    document.body.appendChild(dvPopup);
}
//function openWinAjx(newin, width, height){
//	//Ajax Model
//    newinHeight = height;
//    newinWidth = width;
//    xmlGetPage(newin, AjxDrawWin);
//}
//function AjxDrawWin(){
//    alert("AjxDrawWin");
//    dvPopup = createDiv("dvPopup",objHTMLresult,newinHeight,newinWidth,"50%","200px"); 
//}


function checkFieldsSearch() {
	var textcheck="";
	if (document.frmSearch.search) textcheck = document.frmSearch.search.value;  
	if (textcheck.length <= 2) {  
		alert("\nPlease enter a value longer than two characters.");
		return false;
	} else {
		var validChar = 0;
		for(var i=0; i<textcheck.length; i++){
			if(textcheck.charAt(i) != " "){
				validChar = 1;
			}
		}
		if(validChar == 0){
			alert("\nPlease enter a valid value to search!");
			return false;
		} else {
			return true;
		}
    }
}

function hideCart() {
    var dvDropCart = document.getElementById("dropCart");
    if (dvDropCart) {
       dvDropCart.style.visibility = "hidden";
    }
}

function toggleCart(){
    var dvDropCart = document.getElementById("dropCart");
    if (dvDropCart) {
	    if(dvDropCart.style.visibility == "visible"){
    		dvDropCart.style.visibility = "hidden";	
    	}else{
            xmlGetData("/ajx/getminicart.aspx",fcnDrawMiniCart);
	    }
	}
}

function toggleDiv(divName){
    var dvTarget = document.getElementById(divName);
    if (dvTarget) {
	    if(dvTarget.style.visibility == "visible"){
    		dvTarget.style.visibility = "hidden";	
    	}else{
            dvTarget.style.visibility = "visible";
	    }
	}
}

function ShowHideDiv(divName,status){
if (divName=="quickShop") alert("gs");
    var dvTarget = document.getElementById(divName);
    if (dvTarget) {
	    if(status=='off'){
    		dvTarget.style.visibility = "hidden";	
    	}else{
            dvTarget.style.visibility = "visible";
	    }
	}
}

function toggleDisplayDiv(divName) {
    var dvTarget = document.getElementById(divName);
    if (dvTarget) {
	    if(dvTarget.style.display == "block"){
    		dvTarget.style.display = "none";	
    	}else{
            dvTarget.style.display = "block";
	    }
	}
}

//Convenience function used by product-detail pages.  If the passed param is TRUE
// than zero, it hides ("display:none") the out-of-stock message, and shows the
// in-stock elements.  Or vice-versa, if the passed param is FALSE.
function showHideInStockElements(blnInStock,blnDropShip,site) {
    if (!site) site="";
    var message = MM_findObj('outOfStockMessage');
    var actions = MM_findObj('inStockActions');
    var moreActions = MM_findObj('moreInStockActions');
    var btnCartAdd = MM_findObj('btnCart');
    var btnWishAdd = MM_findObj('lnkWishlist');
    var btnCheckStore = MM_findObj('btnCheckStore');
    if (message) {
        if (blnDropShip) {
            message.innerHTML = blnInStock?'':'<br>This item is not currently available online.<br><br>';
         } else {
            message.innerHTML = blnInStock?'':'<br>This item is not currently available online.<br><a style="color:#C00" href="/pagetrack.aspx?campaignid=89&link='+site+'/stores.aspx" target="_top">Contact your local store for availability</a><br><br>';     
         }
    }
    if (message && blnDropShip && blnInStock) message.innerHTML = '<br>This item will ship from the manufacturer.<br><br>';
    if (actions) actions.style.visibility = blnInStock?"visible":"hidden";
    if (moreActions) moreActions.style.visibility = blnInStock?"visible":"hidden";
    if (btnCartAdd) btnCartAdd.style.display = blnInStock?"block":"none";
    if (btnWishAdd) btnWishAdd.style.visibility = blnInStock?"visible":"hidden";
    if (btnCheckStore) btnCheckStore.style.visibility = blnInStock?"visible":"hidden";
}

function fcnDrawStoreAvail(objJSONresult) { 
    // get the div.  If we can't get it, no point in doing the work: short-circuit out.
    var dvStoreAvail = document.getElementById("storeAvail");
    if (!dvStoreAvail) {
        return;
    }
    
    //Check for nulls and empty arrays.
    var blnHaveResults = false;
    if (objJSONresult) {
        if (objJSONresult.results) {
            if (objJSONresult.results.length > 0) {
                blnHaveResults = true;
            }
        }
    }

    //Build the response.
    var strHTML = "<form name=\"frmStoreAvail\" onsubmit=\"checkStoreAvail();return false;\"><table bgcolor=\"#FFFFFF\" border=\"0\" cellpadding=\"8\" cellspacing=\"0\" width=\"100%\">"+
        "<tr><td align=\"right\" colspan=\"4\"><a href=\"javascript:toggleDiv('storeAvail');\"><img alt=\"close\" border=\"0\" height=\"8\" src=\"/images/jy_btn_quickclose.gif\" width=\"33\"></a></td></tr>"+
        "<tr><td bgcolor=\"#eeeeee\" colspan=\"4\"><h3>Check Store Availability</h3></td></tr>" +
        "<tr><td colspan=\"4\"><strong>The following stores are within your search. An icon next to the store's name will indicate your item is in stock. Please contact the store to confirm product is available.<br><br>To search again, enter new options below and click search stores.</strong></td></tr>" +
        "<tr><td>Zip Code to Search Around:</td>" +
        "<td><input class=\"f0rmRegularTextFields\" name=\"zip\" size=\"10\" type=\"text\" value=\"" + objJSONresult.zip + "\"></td>" +
        "<td align=\"right\">Search for stores within:</td>" +
        "<td><select class=\"f0rmRegularTextFields\" name=\"radius\">" +
        "<option value=\"5\"" + (objJSONresult.radius=="5"?" selected":"") + ">5 Miles</option>" +
        "<option value=\"10\"" + (objJSONresult.radius=="10"?" selected":"") + ">10 Miles</option>" +
        "<option value=\"25\"" + (objJSONresult.radius=="25"?" selected":"") + ">25 Miles</option>" +
        "<option value=\"50\"" + (objJSONresult.radius=="50"?" selected":"") + ">50 Miles</option>" +
        "<option value=\"100\"" + (objJSONresult.radius=="100"?" selected":"") + ">100 Miles</option>" +
        "</select></td>" +
        "</tr>" +
        "<tr><td align=\"center\" bgcolor=\"#eeeeee\" colspan=\"4\">" +
        "<input type=\"image\" alt=\"search stores\" height=\"17\" src=\"/images/jy_btn_searchstores.gif\" vspace=\"3\" border=\"0\" width=\"87\"></td>" +
        "</tr>"
        
    if (!objJSONresult) {
        //If we have no json object, or both its items are empty, show the empty-cart message.
        divColor = "#C00";
        strHTML += "<tr>" + 
            "<td align=\"center\"><img alt=\"checkmark\" height=\"64\" src=\"/images/alert_warn.gif\" width=\"47\"></td>" + 
            "<td class=\"wishlistPopText\" valign=\"top\">There was a problem adding this item to your wishlist.</td>" + 
            "</tr>";
   } else {
    if (blnHaveResults) {
       strHTML += "<tr><td align=\"center\" colspan=\"4\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:0;\"><div class=\"storeHolder\">"
            
            //walk our results, and add each to the html.
            for (i=0;i<objJSONresult.results.length;i++) {
              strHTML += "<div id=\"stor2\" class=\"storeListing\">" + 
                "<table border=\"0\" cellpadding=\"6\" cellspacing=\"0\">" + 
                "<tr><td valign=\"top\"><img alt=\"stock icon\" height=\"42\" src=\"" + objJSONresult.results[i].STOCK_ICON + "\" width=\"34\"></td>" + 
                "<td valign=\"top\"><img src=\"" + objJSONresult.results[i].LOGO + "\" alt=\"logo\"><br>" + 
                    "<span class=\"storeLocStoreHd\">" + objJSONresult.results[i].ADDR1 + "</span><br>" + 
                    (objJSONresult.results[i].ADDR2!=''?objJSONresult.results[i].ADDR2+"<br>":"") +
                    objJSONresult.results[i].CITY + ", " + objJSONresult.results[i].STATE + " " + objJSONresult.results[i].ZIP + "<br>" + 
                    objJSONresult.results[i].PHONE + "</td>" + 
                "</tr></table>" + 
                "</div>"
            }
         strHTML += "</div></td></tr>"
        }
    }

    //close the cart table/html
    strHTML += "<tr>" + 
        "<td align=\"center\" colspan=\"4\"><img alt=\"key for instock icons\" height=\"56\" src=\"/images/key_instock.gif\" width=\"438\"></td>" + 
        "</tr></table></form>";
    
    //set it, show it. we're done.
    dvStoreAvail.innerHTML = strHTML;
    dvStoreAvail.style.visibility = "visible";
}
       


function fcnDrawWishlistAdd(objJSONresult) { 
    // get the div.  If we can't get it, no point in doing the work: short-circuit out.
    var divColor = "#999";
    var dvWish = document.getElementById("addWish");
    if (!dvWish) {
        return;
    }
    
    //Check for nulls and empty arrays.
    var blnSuccess = false;
    if (objJSONresult) {
        if (objJSONresult.addSucceeded) {
            blnSuccess = objJSONresult.addSucceeded;
        }
    }

    //Build the wishlist.
    var strHTML = "<table bgcolor=\"#FFFFFF\" border=\"0\" cellpadding=\"8\" cellspacing=\"0\" width=\"100%\">"+
        "<tr><td align=\"right\" colspan=\"2\"><a href=\"javascript:toggleDiv('addWish');\"><img alt=\"close\" border=\"0\" height=\"8\" src=\"/images/jy_btn_quickclose.gif\" width=\"33\"></a></td></tr>"+
        "<tr><td bgcolor=\"#eeeeee\" colspan=\"2\"><h3>Add to Wishlist</h3></td></tr>"
    
    if (!objJSONresult) {
        //If we have no json object, or both its items are empty, show the empty-cart message.
        divColor = "#C00";
        strHTML += "<tr>" + 
            "<td align=\"center\"><img alt=\"checkmark\" height=\"64\" src=\"/images/alert_warn.gif\" width=\"47\"></td>" + 
            "<td class=\"wishlistPopText\" valign=\"top\">There was a problem adding this item to your wishlist.</td>" + 
            "</tr>";
   } else if (!blnSuccess) {
        //If we have no json object, or both its items are empty, show the empty-cart message.
        divColor = "#C00";
        strHTML += "<tr>" + 
            "<td align=\"center\"><img alt=\"checkmark\" height=\"64\" src=\"/images/alert_warn.gif\" width=\"47\"></td>" + 
            "<td class=\"wishlistPopText\" valign=\"top\">" + objJSONresult.message + "</td>" + 
            "</tr>";
    } else {
        //OK, we have something.  Build the item table
       strHTML += "<tr>" + 
            "<td align=\"center\"><img alt=\"checkmark\" height=\"64\" src=\"/images/alert_pass.gif\" width=\"47\"></td>" + 
            "<td class=\"wishlistPopText\" valign=\"top\">" + objJSONresult.message + "</td>" + 
            "</tr>";

    }

    //close the cart table/html
    strHTML += "<tr><td align=\"center\" colspan=\"2\">" + 
        "<a href=\"javascript:top.document.location = '/account_wishlist.aspx'\"><img alt=\"view wishlist\" border=\"0\" height=\"17\" hspace=\"4\" src=\"/images/jy_btn_viewwish.gif\" width=\"82\"></a>" + 
        "<a href=\"javascript:toggleDiv('addWish');\"><img alt=\"continue shopping\" border=\"0\" height=\"17\" hspace=\"4\" src=\"/images/jy_btn_contshop.gif\" width=\"115\"></a></td>" + 
        "</tr></table>";
    
    //set it, show it. we're done.
    dvWish.innerHTML = strHTML;
    dvWish.style.visibility = "visible";
    dvWish.style.backgroundColor = divColor;
}

function fcnDrawMiniCart(objJSONresult) { 
    // get the div.  If we can't get it, no point in doing the work: short-circuit out.
    var dvDropCart = top.document.getElementById("dropCart");
    if (!dvDropCart) {
        return;
    }
    
    //Handle SSL
    var maJsHost = "http://" + document.location.host + "/";
    
    //Check for nulls and empty arrays.
    var blnHaveResults = false;
    var blnHaveJustAdded = false;
    if (objJSONresult) {
        if (objJSONresult.results) {
            if (objJSONresult.results.length > 0) {
                blnHaveResults = true;
            }
        }
        if (objJSONresult.justAdded) {
            if (objJSONresult.justAdded.length > 0) {
                blnHaveJustAdded = true;
            }
        }
    }

    //Build the cart.
    var strHTML = "<table border=\"0\" cellpadding=\"5\" cellspacing=\"0\" width=\"100%\">"; 
    
    if (!objJSONresult || (!blnHaveResults && !blnHaveJustAdded)) {
        //If we have no json object, or both its items are empty, show the empty-cart message.
        strHTML += "<tr><td align=\"right\"><a onclick=\"hideCart()\" href=\"#\" title=\"close\" style=\"color:#fff\">CLOSE <img alt=\"close\" height=\"9\" src=\"/images/icn_remove.gif\" width=\"9\" border=\"0\"></a></tr>"+
        "<tr><td align=\"center\"><br>Your cart is empty<br><br></td></tr>" ;
    } else {
        //OK, we have something.  Build the item table
        strHTML += "<tr><td colspan=\"2\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr>" + 
            "<td><img alt=\"\" height=\"1\" src=\"/images/pix.gif\" width=\"45\"></td>" +
            "<td><img alt=\"\" height=\"1\" src=\"/images/pix.gif\" width=\"183\"></td>" +
            "<td><img alt=\"\" height=\"1\" src=\"/images/pix.gif\" width=\"58\"></td>" +
            "</tr><tr><td colspan=\"4\" align=\"right\"><a onclick=\"hideCart()\" href=\"#\" title=\"close\" style=\"color:#fff\">CLOSE <img alt=\"close\" height=\"9\" src=\"/images/icn_remove.gif\" width=\"9\" border=\"0\"></a></tr>" ;
            
        var i;
        if (blnHaveJustAdded) {
            //walk our justAdded items (usually there's only 1), and add each to the html.
            for (i=0;i<objJSONresult.justAdded.length;i++) {
                //Use the just-added graphic
                strHTML += getMiniCartItemRow(objJSONresult.justAdded[i], "/images/u_logo_mini_added.gif")
            }
        }
        if (blnHaveResults) {
            //walk our results, and add each to the html.
            for (i=0;i<objJSONresult.results.length;i++) {
                //Use the defined graphic
                strHTML += getMiniCartItemRow(objJSONresult.results[i], objJSONresult.results[i].BRAND_ICON);
            }
        }
        
        //Get and format the order total.
        var strOrderTotal = objJSONresult.orderTotal;
        
        strHTML +="</table></td></tr><tr>" + 
            "<td bgcolor=\"#939393\" colspan=\"2\"><table class=\"cart-magic-table\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td><a href=\"" + maJsHost + "basket.aspx\" class=\"btn-dom-check\">Domestic Checkout</a></td><td><a href=\"" + maJsHost + "checkout_international.aspx\" class=\"btn-int-check\">International Checkout</a></td><td class=\"cartTotalDrop\">"  + strOrderTotal + "</td></tr></table></td>"
            //"<td align=\"right\" bgcolor=\"#939393\" class=\"cartTotalDrop\">" + strOrderTotal +"</td></tr>"
    }
    
    //close the cart table/html
    strHTML += "</table>";
    console.log(objJSONresult);
    //We have the latest-n-greatest cart info, so let's update the topnav.
    var tdCartTotal = document.getElementById("topNavCartTotal");
    var pCartPrice = document.getElementById('topCartPriceTotal');
    if (tdCartTotal) {
        if (objJSONresult.itemCount == 1){
            tdCartTotal.innerHTML = objJSONresult.itemCount + " Item ";
        }else{
            tdCartTotal.innerHTML = objJSONresult.itemCount + " Items ";
        }
    }
    if (pCartPrice) {
        pCartPrice.innerHTML = objJSONresult.orderTotal + ' USD';
    }
    //set it, show it. we're done.
    dvDropCart.innerHTML = strHTML;
    dvDropCart.style.visibility = "visible";
}

//Constructs the HTML for a given item to be included in the mini-cart.
function getMiniCartItemRow(cartItem, imageSrc) {
    var strRow = "<tr>" + 
                "<td class=\"cartDropThmb\" rowspan=\"3\" valign=\"top\"><a href=\"" + cartItem.URL + "\"><img alt=\"\" height=\"45\" src=\"" + cartItem.IMAGE + "\" width=\"45\" border=\"0\"></a></td>" +
                "<td align=\"left\"><img alt=\"" + cartItem.BRAND_NAME + "\" src=\"" + imageSrc + "\"></td>" +
                "<td align=\"right\" valign=\"bottom\"><a onclick=\"fcnDeleteCart(" + cartItem.PRODUCT_ID + ")\" href=\"#\" title=\"remove\" style=\"color:#fff\" class=\"lnk-remove-cart\">remove</a></td>" +
           "</tr>" + 
           "<tr><td class=\"cartProdName\" align=\"left\"><a href=\"" + cartItem.URL + "\" style=\"color:black;\">" + cartItem.NAME + "</a></td>" +
           "<td align=\"right\" class=\"cartSubTotal\" rowspan=\"2\" valign=\"top\">" + cartItem.PRICE + "</td></tr>";
    if (cartItem.INSTOCK_HTML != "") {
        strRow += "<tr><td class=\"cartQuantEtc\" align=\"left\">qty: " + cartItem.QTY + " &nbsp; color: " + cartItem.COLOR + 
            "<br>" + cartItem.INSTOCK_HTML + "</td></tr>";
    } else {
        strRow += "<tr><td class=\"cartQuantEtc\" align=\"left\">qty: " + cartItem.QTY + " &nbsp; color: " + cartItem.COLOR + "</td></tr>";
    }
    strRow += "<tr><td align=\"center\" class=\"hrDropCart\" colspan=\"3\"><img alt=\"\" height=\"1\" src=\"/images/pix_ltgray.gif\" width=\"100%\"></td></tr>"
    
    return strRow;
}
function fcnDeleteCart(itemOid) {
    var strUrl = "/ajx/getminicart.aspx?did=" + itemOid;
     xmlGetData(strUrl, fcnDrawMiniCart);
}     
/* Quick Shop Functions */

//Simple convenience function which draws the cart and closes the quickshop panel.  Generally, this is called only 
// from the quickshop panel itself.
function fcnDrawMiniCartAndCloseQuickShop() {
    fcnDrawMiniCart();
    closeQuickShop();
}

function getScrollXY() {
    var x = 0, y = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        // Netscape
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        // DOM
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        // IE6 standards compliant mode
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    }
    //return y;
    return [x, y];
}

 function launchQuickShop(oid,brand) {
    var e=window.event;
    
    var frmQS = document.getElementById("fraQuickShop");
    if (frmQS) frmQS.src=(brand!=""?"/"+brand:"")+"/product_qs.aspx?id=" + oid;

    var divQS = document.getElementById("quickShop");
    var dh = getScrollXY();
    divQS.style.top=(dh[1] + 75) + 'px';
    divQS.style.display = 'block';
}
 
 function closeQuickShop() {
    var frmQS = top.document.getElementById("fraQuickShop");
    if (frmQS) frmQS.src="about:blank";
    var divQS = top.document.getElementById("quickShop");
    divQS.style.display = 'none';
}
function Resize_iFrame(strFrameName,strFrameBody) { 

    fn = strFrameName?strFrameName:"fraContent";
    fb = strFrameBody?strFrameBody:"FrameBody";
    x = top.document.getElementById(fn); 
    y = x.contentWindow.document.getElementById(fb); 
    if (y) {
        //if (document.all) // IE problem; wont show clientHeight if style height hasn't been set 
        //    y.style.height = "1px"; 
        //margin = (strFrameName=='cartDrop'?2:35); 
        //x.style.height = parseInt(y.scrollHeight + margin) + "px"; 
        x.style.height = y.scrollHeight + "px"; 
        x.height = x.style.height;
    }
}

function fcnDisplayFAQ(faqID) {

    //check the faqID
    if (faqID == "") { 
        alert("Please select a question."); return;
    } else {
        //We have a zip and product.  Use ajax to do the lookup and show the result panel.
        xmlGetData("/ajx/getFAQ.aspx?OID=" + faqID, fcnDrawFAQ);
    }
} 

function createDiv(id, html, width, height, left, top) { 

   //make a div and make it absolute positioned
   var newdiv = document.createElement('div');
   newdiv.setAttribute('id', id);
   newdiv.style.position = "absolute";      

   if (width) {newdiv.style.width = width;}
   if (height) {newdiv.style.height = height;}
   
   var dh = getScrollXY();   
   if ((left || top) || (left && top)) {
       if (left) {newdiv.style.left = left;} else {newdiv.style.left="50%";}
       if (top) {newdiv.style.top = top;} else {newdiv.style.top=dh[1]+"100px";}
   }
   
   if (html) {
       newdiv.innerHTML = html;
   } else {
       newdiv.innerHTML = "&nbsp;";
   }
   
   //add it to the doc, and return a handle for the caller
   document.body.appendChild(newdiv);
   return newdiv;
}
    
function fcnDrawFAQ(objJSONresult) { 

    // get the div.  If we can't get it, no point in doing the work: short-circuit out.
    var dvAnswer = document.getElementById("dvAnswer");
    if (!dvAnswer) { dvAnswer = createDiv("dvAnswer","",null,null,"50%","200px"); }
   
    //Check for nulls and empty arrays.
    var blnSuccess = false;
    if (objJSONresult) {
        var strHTML = "<table bgcolor=\"#FFFFFF\" border=\"0\" cellpadding=\"6\" cellspacing=\"0\" width=\"100%\">"+
            "<tr><td align=\"right\"><a href=\"javascript:toggleDiv('dvAnswer');\"><img alt=\"close\" border=\"0\" height=\"8\" src=\"/images/jy_btn_quickclose.gif\" width=\"33\"></a></td></tr>"+
            "<tr><td bgcolor=\"#CCCCCC\"><h1>help : faqs</h1></td></tr>"+
            "<tr>"+
            "   <td>"+
            "       <table border=\"1\" bordercolor=\"#eeeeee\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">"+
            "       <tr>"+
            "           <td align=\"center\" bgcolor=\"#eeeeee\" class=\"tellAFriendNumbs\">Q:</td>"+
            "           <td align=\"left\" bgcolor=\"#eeeeee\" valign=\"middle\"><h3>" +  objJSONresult.question + "</h3></td>"+
            "       </tr>"+
            "       <tr>"+
            "           <td align=\"center\" class=\"prodDetPrice\" valign=\"top\"><p class=\"tellAFriendNumbs\">A:</p></td>"+
            "           <td align=\"left\" valign=\"top\">" +  objJSONresult.answer + "</td>"+
            "       </tr>"+
            "       </table>"+
            "   </td>"+
            "</tr>"+
            "<tr><td align=\"center\"><a href=\"javascript:toggleDiv('dvAnswer');\"><img alt=\"close\" height=\"17\" src=\"/images/jy_btn_close.gif\" border=\"0\" width=\"41\"></a></td></tr>"+
            "</table>"
            
        //set it, show it. we're done.
        dvAnswer.innerHTML = strHTML;
        dvAnswer.style.visibility = "visible";
    }
}

//Top Nav MsgScroller
var mp=0;
function ScrollMsg() {
    
    // since the page loads the first one we need to act like 
    // we've run this already, so minus one item.
    var numitems = $("#navMsgCont").children().length - 1;
    var maxheight = - numitems * 80;    
    
    if (mp <= maxheight) { mp = 0; } 
    else { mp = mp - 80; }
        
    $("div#navMsgCont").filter(':not(:animated)').animate({top:mp}, "slow");
    setTimeout("ScrollMsg()", 4000); 
}




// =========================

(function() {
	
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone/iPod"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]
	
	};
	
	BrowserDetect.init();
	
	window.$.client = { os : BrowserDetect.OS, browser : BrowserDetect.browser, version : BrowserDetect.version };
	
})();



function get_twitter_feed() {
	$("div.twitter_feed").html("<p>Loading Tweets...</p>");
	$.getScript("//twitter.com/statuses/user_timeline/"+config.twitter.username+".json?callback=parseTweets&count="+config.twitter.numtweets);
	//setTimeout("get_twitter_feed()", config.twitter.reloadtimeout);  //reload feed every x time (5 mins)
}

function parseTweets(feed) {
	if (feed != undefined) {
		if (feed.length > 0) {
			config.twitter.data = feed;
			
			
			$("div.twitter_feed").html('<div class="container"></div>');
			$("div.twitter_feed div.container").css('position','absolute');
			
			$.each(config.twitter.data, function(k,v) {
				var tweet = v.text;
				if (v.text.length > 100) { tweet = v.text.substr(0,100) + " ..."; } 
				$("div.twitter_feed div.container").append('<div class="twitter_item"><a href="http://twitter.com/'+config.twitter.username+'" target="_blank">'+tweet+'</a></div>');
			});
			load_twitter_item();		
		}
	}
}


function load_twitter_item() {
	var numitems = config.twitter.data.length;
	var curitem = config.twitter.curitem;
	var itemheight = 36;
	var maxheight = - numitems * itemheight;
	var mp = -curitem * itemheight;
	
	if (curitem > 0) {
		$("div.twitter_feed div.container").filter(':not(:animated)').animate({top:mp}, 300);
		
		if (curitem == (numitems - 1)) 	{ config.twitter.curitem = 0; 	}
		else 							{ config.twitter.curitem++; 	}
		
	} else { 
		$("div.twitter_feed div.container").filter(':not(:animated)').animate({top:0}, 500); 
		config.twitter.curitem++; 
	}
	
	setTimeout("load_twitter_item()", config.twitter.speed);
}








function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}

