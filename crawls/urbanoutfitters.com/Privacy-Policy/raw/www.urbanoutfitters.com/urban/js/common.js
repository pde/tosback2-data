// <!-- REMOVE 5/1/2013 
(function($) {
    $(document).ready(function() {
        $("form[name='trackOrderForm']").submit(function() {
            var orderNumber = $("#orderNumber").val();
            if (orderNumber && orderNumber.length > 0) {
                return;
            }
            $("#content_account").prepend("<h6 class=\"notice\">Order number is a required field.</h6>");
            $("#orderNumber").css("background-color", "yellow");
            return false;
        });
    });
})(jQuery);
// -->

/* 
 * 
 * Common: Shared Page Functionality
 * 
 */
 
(function($) {
    $(document).ready(function() {

    	/* brands page temp fix */
    	$('#category-content-brands-directory a').attr('href', '/urban/catalog/category.jsp?id=BRANDS');
    	/* end brands temp fix */
    	
    	//order history table view
	    $('#content_orderhistory table tr').click(function() {
	    		
	        var id = $(this).find("a").attr("data-order");
	        if(id) {
	            $('#' + id).submit();
	        }
	        return false;
	    });
	    
    	// enable datepickers on egiftcard and shopping cart pages
	    $(".giftCardDatepicker").datepicker({ 
	    	minDate: 0, 
	    	maxDate: 90,
	    	onSelect: function( selectedDate ) {
	    		
	    		// create variable to check selection against;  if it is today's date, convert it to 'Now'
	    		var currentTime = new Date();
	    		var currentDate = currentTime.getMonth() + 1;
	    		currentDate += "/";
	    		currentDate += currentTime.getDate();
				currentDate += "/";
				currentDate += currentTime.getFullYear();
				
				if ( currentDate == selectedDate ) {
					 $(".giftCardDatepicker").val("Now");
				}
	    	}
    	});

    	// end datepicker 
    	// begin email address checker for egift card page
    	$('#giftRecipientEmail').on('blur', function() {
			  $(this).mailcheck({
			    // domains: domains,                       // optional
			    // topLevelDomains: topLevelDomains,       // optional
			    // distanceFunction: superStringDistance,  // optional
			    suggested: function(element, suggestion) {
			    	
			    	$("#email-suggestion").append("<p style='color: blue;'><img src='/urban/images/2007_holiday/error_alert.png'> Email suggestion - Did you mean " + suggestion.full + "?</p>");
			    	$("#email-suggestion").slideDown();
			      // callback code
			    },
			    empty: function(element) {
			    	$("#email-suggestion").slideUp().empty();
			    }
			  });
			});
    	// end email address checker

    	// limit chars in egiftcard textarea
    	$('#egiftCardMessage').keypress(function(e) {
		    var tval = $('#egiftCardMessage').val(),
		        tlength = tval.length,
		        set = 100,
		        remain = parseInt(set - tlength);
		   
		    if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
		        $('#egiftCardMessage').val((tval).substring(0, tlength - 1))
		    }
		});
		// end limit chars in egiftcard textarea
		
        $.fn.placeholders();
    });
    
    $.support.placeholder = (function() {
        var input = document.createElement("input");
        return "placeholder" in input;
    })();
    
    $.fn.placeholders = function() {
        if (! $.support.placeholder) {
            
            // Browser doesn't support placeholder attribute; simulate placeholders. 
            var placeholderElements = $("input, textarea");
            placeholderElements.focus(function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).blur(function() {
                if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                    $(this).val($(this).attr("placeholder"));
                }
            }).blur();
            
            // Remove simulated placeholders before submitting forms.
            $("form").submit(function() {
                placeholderElements.focus();
            });
        }
    };

    // utility nav dropdown 
   
     $(function(){

        // hide class and visibility for crappy IE bug
        // $("#dd").removeClass("active");
        // $('#dd li').css('visibility', 'hidden');

         $("#dd").hover(function(){

              $('#dd li').css('display', 'inline');

              $(this).addClass("active");
             
         
         }, function(){

              $('#dd li').css('display', 'none');

             $(this).removeClass("active");
             
         
         });
         
     });

    // end utility nav dropdown

    $(document).keydown( function (e) {

      // use charcode if available;  if not, use keyCode
      if (e.charCode) {
         var charCode = e.charCode;
      }
      else {
         var charCode = e.keyCode;
      }

      // verify enter is being pressed && that footer-findAStore-query has a value && it's not equal to its placeholder (IE bug)
      if ( charCode == 13 && jQuery("#footer-findAStore-query").val().length > 0 && jQuery("#footer-findAStore-query").val() != jQuery("#footer-findAStore-query").attr("placeholder") ) {

        e.preventDefault();
        e.stopPropagation();
        
        footerStoreLocatorFormSubmit();
      }

    });

    $(function(){

      // catch clicks on the footer submit button
      $('#footer-findAStore-submit').on('click', function () {
        footerStoreLocatorFormSubmit();
        return false;
      });

    });
    
})(jQuery);

// footer store locator form submits
function footerStoreLocatorFormSubmit() {

  var newLocation = "http://www.urbanoutfitters.com/urban/help/store_locator.jsp#!/search/" + jQuery("#footer-findAStore-query").val();

  window.location = newLocation;

  return false;

}

// RKG Conversion Pixel
(function($) {
    $(document).ready(function() {

        // check if on a thank you page;  if so, generate RKG analytics images
        if ( window.location.href.search("co_thankyou.jsp") > -1 ) {
            
            // pull sessionStorage info on order
            var counter = sessionStorage.getItem( 'totalNumberofItems' );
            var html = "";
            var prodName = "";
            var orderNo = "";
            var lid = 0;

            while ( counter > -1 ) {
                // console.log (JSON.parse( sessionStorage.getItem( 'arr_' + counter ) ) );

                obj = JSON.parse( sessionStorage.getItem( 'arr_' + counter ) );
                
                // remove HTML from prodName
                prodName = obj.name;
                
                if (prodName != null && prodName.indexOf("<") > 0) {
                    prodName = prodName.substring(0, prodName.indexOf("<"));
                }


                //grab order number out of HTML, chop off first 7 characters
                orderNo = $("div.orderNum strong").html();
                orderNo = orderNo.substring(7);
                
                // convert price to # of pennies for RKG
                obj.price = Math.round( obj.price * 100 );
                
                // remove spaces from the name so it doesn't break the query string
                obj.name = obj.name.replace(/ /g, "%20");

                // increment lid so there's no 0 value
                lid = obj.index + 1;

                html += "<img src=\"https://www.rkdms.com/order.gif?mid=urbanoutfitters&oid=";
                html += orderNo;
                html += "&lid="
                html += lid;
                html += "&iid=" + obj.sku;
                html += "&icent=";
                html += obj.price;
                html += "&iqty=" + obj.quantity;
                html += "&iname=" + prodName;

                html += "\" height=\"1\" width=\"1\" />";

                counter --;
            }

            // console.log ("html is " + html )
            $("#footer").append(html);

        }  // end RKG image generation
    });
})(jQuery);

function imgClicked(imgId, imgElem){ 
 unselectAll(imgId);
 imgElem.name="selected";
 imgElem.className = "selected";
}

 function changeColorandLink(id, pColorCode, prodImg,skuId, pColorName, isLeaderProduct,itemdescription,itemCount,sortProperties,navAction,parentid,navCount ){
 
  var uniqueId = id;
 
 
  if(isLeaderProduct!=null & isLeaderProduct=="true"){
  uniqueId = "l"+uniqueId;
 }
 if(skuId!=null && skuId!="")
 {
  getElement(uniqueId+"catalogRefIds").value = skuId;
     getElement(uniqueId+"qty").name = skuId;
 }
 
 if(document["frm"+uniqueId]!=null && isLeaderProduct=="true")
 {  
 document["frm"+uniqueId].color.value=pColorCode;
 document["frm"+uniqueId].colorName.value=pColorName;
 }
 
 if(getElement(uniqueId+"altviews")!=null && pColorCode!=null && id!=null){
 
getElement(uniqueId+"altviews").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
 }
if(getElement(uniqueId+"selectedColor")!=null && pColorName!=null)
 {
 getElement(uniqueId+"selectedColor").innerHTML=pColorName.toUpperCase();
 }
 
 if(getElement(uniqueId+"popup_avail")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"popup_avail").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_avail.jsp?productid="+id+"&color="+pColorCode+"');";
 }
 
 if(getElement(uniqueId+"popup_sizechart")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"popup_sizechart").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_sizechart.jsp?productid="+id+"&color="+pColorCode+"');";
 } 
 
 if(getElement(uniqueId+"requestswatches")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"requestswatches").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_requestswatches.jsp?productid="+id+"&color="+pColorCode+"');";
 } 
 
 if(getElement(uniqueId+"viewmorephotos")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"viewmorephotos").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
 }
 
  
 
 if(isLeaderProduct!=null & isLeaderProduct=="true"){
  if(getElement("tellafriend")!=null && pColorCode!=null && uniqueId!=null)
  {
   getElement("tellafriend").href=encodeURI(contextPath+'/user/login_check.jsp?productId='+id+'&cCode='+pColorCode);
  }
 } 
 changeImageandLink(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id ); 
 
}
 
function changeImageandLink(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id){
 var imageHandle = "img"+uniqueId;
 var linkHandle = "link"+uniqueId;
 var deslinkHandle = "deslink"+uniqueId;
 var dislinkHandle = "dislink"+uniqueId;
    var viewAllinkHandle = "viewAllink"+uniqueId; 
 if(prodImg != null && document[imageHandle]!=null){
  document[imageHandle].src = prodImg;
  
 } 
  
 var jsessionid = getElement("jsessionid").value;
  if(getElement(linkHandle) != null){
   
  getElement(linkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
  }
 
 
 if(getElement(deslinkHandle) != null){
  
 getElement(deslinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }
 
 if(getElement(dislinkHandle) != null){
  
 getElement(dislinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }
 
 if(getElement(viewAllinkHandle) != null){
  
 getElement(viewAllinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }
}



function changeColor(id, pColorCode, prodImg,skuId, pColorName, isLeaderProduct, pSizeName,itemdescription,itemCount,sortProperties,navAction,parentid,navCount){
	var uniqueId = id;
	if(pSizeName!=null){
		uniqueId = pSizeName;
	}
	
	if(isLeaderProduct!=null & isLeaderProduct=="true"){
		uniqueId = "l"+uniqueId;
	}
	if(skuId!=null && skuId!="")
	{
		getElement(uniqueId+"catalogRefIds").value = skuId;
	    getElement(uniqueId+"qty").name = skuId;
	}
	
	if(document["frm"+uniqueId]!=null && isLeaderProduct=="true")
	{		
	document["frm"+uniqueId].color.value=pColorCode;
	}

	if(getElement(uniqueId+"altviews")!=null && pColorCode!=null && id!=null){

getElement(uniqueId+"altviews").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
	}
if(getElement(uniqueId+"selectedColor")!=null && pColorName!=null)
	{
	getElement(uniqueId+"selectedColor").innerHTML=pColorName.toUpperCase();
	}
	
	if(getElement(uniqueId+"popup_avail")!=null && pColorCode!=null && id!=null)
	{
		getElement(uniqueId+"popup_avail").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_avail.jsp?productid="+id+"&color="+pColorCode+"');";
	}
	
	if(getElement(uniqueId+"popup_sizechart")!=null && pColorCode!=null && id!=null)
	{
		getElement(uniqueId+"popup_sizechart").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_sizechart.jsp?productid="+id+"&color="+pColorCode+"');";
	}	
	
	if(getElement(uniqueId+"requestswatches")!=null && pColorCode!=null && id!=null)
	{
		getElement(uniqueId+"requestswatches").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_requestswatches.jsp?productid="+id+"&color="+pColorCode+"');";
	}	
	
	if(getElement(uniqueId+"viewmorephotos")!=null && pColorCode!=null && id!=null)
	{
		getElement(uniqueId+"viewmorephotos").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
	}
	
		
	
	if(isLeaderProduct!=null & isLeaderProduct=="true"){
		var formObj = document.sendMessage;
		if (formObj) {
	    	var productIdsElement = formObj["/uo/commerce/SendEmailFriendFormHandler.colorCode"];
		    if(productIdsElement!=null && pColorCode!=null && uniqueId!=null){
		    	productIdsElement.value = pColorCode;
			}
	       	if(getElement("emailColorCode")!=null && pColorCode!=null && uniqueId!=null){
	       		getElement("emailColorCode").value = pColorCode;
		   	}
		}
	} 
	 changeImage(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id); 
    }
 
    function changeImage(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id){
     var imageHandle = "img"+uniqueId;
     var linkHandle = "link"+uniqueId;
 
     if(prodImg != null && document[imageHandle]!=null){
      document[imageHandle].src = prodImg;
  
     } 
   	 if(getElement(linkHandle) != null){
     	getElement(linkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
	}
}

function imgMouseOver(imgElem, color){
	imgElem.className = "mouseOver";
}

function imgMouseOut(imgElem, color){
 if(imgElem.name == "selected"){
  imgElem.className="selected";
 } else {
  imgElem.className="unselected";
 }
}
 
function unselectAll(elementId){
 if(document.all){
  var length = document.all(elementId).length;
  for(var i=0;i<length;i++){
   var elem = document.all(elementId, i);
   if(elem.name == "selected"){
    elem.name = "";
    elem.className="unselected";
   }
  }
 } else {
  var length = document.getElementById(elementId).length;
  for(var i=0;i<length;i++){
   var elem = document.getElementById(elementId, i);
   if(elem.name = "selected"){
	   elem.name = "";
        elem.className="unselected";
   }
  }
 }
}

var scriptfunctionsarray = new Array();

function addScriptFunction(pProductId, pSizeName, pProductColor, pProdImg,pSkuId, pColorName){
	scriptfunctionsarray.push(new scriptfunction(pProductId, pSizeName, pProductColor, pProdImg,pSkuId, pColorName));
}

function callscriptfunctions(){
	for(var i=0;i<scriptfunctionsarray.length;i++){		
		changeColor(scriptfunctionsarray[i].productId,scriptfunctionsarray[i].productColor,scriptfunctionsarray[i].prodImg,scriptfunctionsarray[i].skuId, scriptfunctionsarray[i].colorName, '', scriptfunctionsarray[i].sizeName);
	}
}

function scriptfunction(productId, pSizeName, pProductColor, pProdImg, pSkuId, pColorName){
	this.productId = productId;
	this.sizeName = pSizeName;
	this.productColor = pProductColor;
	this.prodImg = pProdImg;
	this.skuId = pSkuId;
	this.colorName = pColorName;	
}

function getProductDetailAddToBagValues(frmName) {
	// get values to store as JSON
	
	// if is main product
	var prodTitle = "";
	var titleTags = $$('form[name="' + frmName + '"] h2.prodTitle');
	if (titleTags) {
		titleTags.each(function(t) {
			prodTitle = t.innerHTML;	
		});
	}
	
	var prodPrice = "";
	var pPriceTags = $$('form[name="' + frmName + '"] p.price');
	if (pPriceTags) {
		pPriceTags.each(function(pTag) {
			if (prodPrice == "") {
				prodPrice = pTag.innerHTML;
			}
		});
	}
	
	var salePrices = $$('form[name="' + frmName + '"] p.salePrice');
	var isSalePrice = false;
	if (salePrices) {
		salePrices.each(function(spTag) {
			if (!isSalePrice) {
				prodPrice = spTag.innerHTML;
				isSalePrice = true;
			}
		});
	}
	
	var prodColor = "";
	var swatches = $$('form[name="' + frmName + '"] #detailSwatches a');
	if (swatches) {
		swatches.each(function(s) {
			if (s.hasClassName("selected")) {
				if (prodColor == "") {
					var tmp = s.id.replace("swatchLink_","");
					tmp = tmp.substr(0, tmp.indexOf("_"));
					prodColor = tmp;
				}
			}
		});		
	}
	
	var prodQty = "";
	var qtyMenu = $$('form[name="' + frmName + '"] #qtyOption select');
	if (qtyMenu) {
		qtyMenu.each(function(qMenu){
			if (prodQty == "") {
				prodQty = qMenu.value;
			}
		});
	}
	
	// if family product
	if(prodTitle.length == 0) {
		titleTags = $$('form[name="' + frmName + '"] h5 p');
		if(titleTags) {
			prodTitle = titleTags[0].innerHTML;
		}
	}
	
	if(prodPrice.length == 0) {
		pPriceTags = $$('form[name="' + frmName + '"] span.price');
		if (pPriceTags) {
			pPriceTags.each(function(pTag) {
				prodPrice = pTag.innerHTML;
			});
		}
	}
	
	if(salePrices.length == 0) {
		salePrices = $$('form[name="' + frmName + '"] span.salePrice');
		isSalePrice = false;
		if (salePrices) {
			salePrices.each(function(spTag) {
				if (!isSalePrice) {
					prodPrice = spTag.innerHTML;
					isSalePrice = true;
				}
			});
		}
	}
	
	if(prodColor.length == 0) {
		swatches = $$('form[name="' + frmName + '"] .swatches a');
		if (swatches) {
			swatches.each(function(s) {
				if (s.hasClassName("selected")) {
					if (prodColor == "") {
						var tmp = s.id.replace("swatchLink_","");
						tmp = tmp.substr(0, tmp.indexOf("_"));
						prodColor = tmp;
					}
				}
			});		
		}
	}
	
	
	if(prodQty.length == 0) {
		var qtyMenu = $$('form[name="' + frmName + '"] .multi_swatches select');
		if (qtyMenu) {
			qtyMenu.each(function(qMenu){
				prodQty = qMenu.value;
			});
		}
	}
	
	var prodSku = "";
	var pSkuTags = $$('form[name="' + frmName + '"] .sku');
	if (pSkuTags.length != 0) {
		pSkuTags.each(function(pTag) {
			if (prodSku == "") {
				prodSku = pTag.innerHTML.replace("SKU #","");
			}
		});
	} else {
		prodSku = $$('form[name="' + frmName + '"] input[name="id"]')[0].getValue();
	}
	
	
	var jsonStr = '{"title":"' + prodTitle.trim() + '","price":"' + prodPrice.trim() + '","isSalePrice":"' + isSalePrice + '","sku":"' + prodSku.trim() + '","color":"' + prodColor.trim() + '","quantity":"' + prodQty + '"}';
	return jsonStr;
}

function centerModalWindow(modalWinId, modalWinWrapperId) {
	var modalWinObj = $(modalWinId);
	var modalWinObjWrapper = $(modalWinWrapperId);		
	//get the user's screen dimensions and calculate center point
	var screenWidth = getBrowserWidth();
	var screenHeight = getBrowserHeight();
	// get dimensions
	var w = parseInt(modalWinObj.style.width);
	var h = parseInt(modalWinObj.style.height);
	// scrolling offset
	var scrollY = getOffsetY();
	// set coordinates
	var x = Math.floor(screenWidth/2) - Math.floor(w/2) + "px";
	var y = Math.floor(screenHeight/2) - Math.floor(h/2) + scrollY + "px";
	if ((modalWinObj) && (modalWinObjWrapper)) {
		// make visible
		modalWinObj.style.top = y;
		modalWinObj.style.left = x;
		if (modalWinObjWrapper) {
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
				console.log("error's about to happen");
				pageWidth = document.body.offsetWidth + document.body.offsetLeft;
				
				console.log("error's about to happen 2");
				pageHeight = document.body.offsetHeight + document.body.offsetTop;
				
				console.log("error's happened 3");
				
			}
			modalWinObjWrapper.style.height = pageHeight + "px";	
			if (ie) {
				modalWinObjWrapper.style.width = screenWidth + "px";	
			}
		}
		// display
		modalWinObjWrapper.style.display = "block";
		modalWinObj.style.display = "block";
	}
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function addItemToBag(frmName){
	
	var jsonStr = getProductDetailAddToBagValues(frmName);
	
	//code to test if user is private safari user
	
	try { // Try and catch quota exceeded errors 
		if (typeof(sessionStorage) != "undefined" && !sessionStorage.itemsAdded) {
		// use HTML session storage to display added to bag modal window
		sessionStorage.itemsAdded = jsonStr;
		}
	} catch (error) { 
		if (error.code === DOMException.QUOTA_EXCEEDED_ERR && sessionStorage.length === 0) {	
			//alert('Hello, private browser.'); 
		} else {throw error; }
	}
	
	// end code to test if user is private safari user
	
	// submit form
	document[frmName].action.value = "addToBag";		
	document[frmName].submit();
}	

/* Trac 3247 */  

	function addItemToWishlist(frmName){
		document[frmName].itemsadded.value='';
		document[frmName].action.value = "addToWishlist";
		document[frmName].submit();
	}	
function getElement(elementId){
	return document.all ? document.all[elementId] : document.getElementById(elementId);
}	

function View(pViewName, pViewURL){
	this.viewName = pViewName;
	this.viewURL = pViewURL;
}

function Color(pColorCode, pColorName, pProductImageURL){
	this.colorCode = pColorCode;
	this.colorName = pColorName;
	this.productImageURL = pProductImageURL;
	this.viewList = new Array();
	
	this.addView = function(pViewName, pViewURL){
		this.viewList.push(new View(pViewName, pViewURL));
	}
}

function openWindow(pURL, pName, pWidth, pHeight){
    var features = ["width=", pWidth, ",height=", pHeight, ",status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,titlebar=no,resizable=yes"];
    window.open(encodeURI(pURL), pName, features.join(''));
}

function openProductPopupWindow(pURL){
	openWindow(pURL, 'productpopup', 452, 599);
}

function openInformationalPopupWindow(pURL)
{
    openWindow(encodeURI(pURL), "dayphoneinfopopup", 635, 200);
}
//Functions for AddresBook 
function getElement(elementId){
		return document.all ? document.all[elementId] : document.getElementById(elementId);
	}
	function deleteAddress(){
		var formObj = document.savedAddressFrm;
		formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].value = getSelectedAddress(formObj);
		 
		formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].name='';
		formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].value='';
		formObj.newAddress.value="true";
		formObj.submit();
	}
	function editAddress(){		
		var formObj = document.savedAddressFrm;		
		formObj.newAddress.value="";
		 formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].value = getSelectedAddress(formObj); 
		
		formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].name='';
		formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].value='';		
		
		formObj.submit();
	}
	
	function getSelectedAddress(formObj){
		var radioObj= formObj.edit;
		
		if(!radioObj)
		   	return "";
		  var radioLength = radioObj.length;
		  if(radioLength == undefined)
		   if(radioObj.checked)
		    return radioObj.value;
		   else
		    return null;
		  for(var i = 0; i < radioLength; i++) {
		   if(radioObj[i].checked) {			   
		    return radioObj[i].value;
		   }
		  }
		  return null;		
		}
	 
	function disableDelete(){	
		getElement("deletebutton").style.display = 'none';
		getElement("key1").value="billing";		
	}
	function enableDelete(){		
		getElement("deletebutton").style.display = 'inline';
		getElement("key1").value="true";		
	}
//Functions end here for AddressBook
var blanks = []
function blank(input) {
    var id = input.form.name + '.' + input.name
    for (var i = 0, l = blanks.length; i < l; i++) {
        if (blanks[i] === id)
            return;
    }
    blanks.push(id)
    input.value = "";
}

//Functions added for Phone numbers in Account menu page are not displaying properly .
function formatPhoneNumber(phone){
	// Code modified for Trac 1598.
	var phoneNumberLength = phone.length;
	if(!phoneNumberLength < 11){
		phone = ReplaceAll (phone, " " ,"");
		phone = ReplaceAll (phone, "-" ,"");
		phoneNumberLength = phone.length;
		if(phoneNumberLength == 11){
			var isOne = phone.substring(0,1);
			if(isOne == 1){
				phone= phone.replace("1","");
			}
		}
	}
	// End of code modified for Trac 1598.
	var sAreaCode = phone.substring(0,3);
	var s3dig = phone.substring(3,6);
	var s4dig = phone.substring(6,10);
	var newPhone = "("+sAreaCode+")"+s3dig+"-"+s4dig;
	return newPhone;
}
//End of Functions added for Phone numbers in Account menu page are not displaying properly .

//Function added for Trac 1535.
function displayOrderNumber(pSubject){

      if(getElement("subject").value == ""){
        document.getElementById( "orderNumber" ).style.display = "none";
        document.getElementById( "orderLabel" ).style.display = "none";
        document.getElementById( "orderNumber" ).value = "";
      }
      else{
        if(pSubject.options[pSubject.selectedIndex].text == "Orders" || pSubject.options[pSubject.selectedIndex].text == "Customer Service"){ 
          document.getElementById( "orderNumber" ).style.display = "";
          document.getElementById( "orderNumber" ).style.width = "250px";
          document.getElementById( "orderLabel" ).style.display = "";
        }
        else{       
          document.getElementById( "orderNumber" ).style.display = "none";
          document.getElementById( "orderLabel" ).style.display = "none";
          document.getElementById( "orderNumber" ).value = "";
        }
      }
}
//End of Functions added for 1535.
//Function added for Trac 1598.
function ReplaceAll(Source,stringToFind,stringToReplace){
	  var temp = Source;
	  var index = temp.indexOf(stringToFind);
	  while(index != -1){
	  	temp = temp.replace(stringToFind,stringToReplace);
	    index = temp.indexOf(stringToFind);
	  }
	  return temp;
}
//End of Function added for 1598.

//Code added for Trac 1997.
function changeProductColor(item){
	document.selectForm.selectedProductColor.value=item.value;
	document.selectForm.submit();
}
function chooseSorting(item){
	document.selectSortbyForm.sortby.value=item.value;
	document.selectSortbyForm.submit();
}
function resetSelect(Obj, newvalue) {
	//To add space in the size name if user comes from 'Continue Shopping' link
  	if( newvalue.indexOf(" ") == -1){
	  	if(newvalue.indexOf("SIZE") == 0 ){
		   	newvalue=newvalue.replace("SIZE","SIZE ");
	   	}else if(newvalue.indexOf("ONE") == 0 ){
			newvalue=newvalue.replace("ONE","ONE ");
	   	}
   	}
   if(Obj != null){
		for(i=0;i< Obj.options.length;i++){ 
			if (Obj.options[i].value == newvalue) {
				Obj.selectedIndex = i;
				return;
			}
		}   
   }

}
//Used to assign 'selectedProductSize' param  with selected size.
function changeProductSize(item){
  	document.selectShopbySizeForm.selectedProductSize.value=item.value;
  	document.selectShopbySizeForm.submit();
}
//setSelectedSizeForShopBySize() used to select the size in the ProductDetail page.
function setSelectedSizeForShopBySize(pProductId,pSizeName,isLeaderProduct){
	var productSelector = getProductSelector(pProductId, false, isLeaderProduct);
	if(productSelector != null){
		//To get the size name for MixedTemplate, because
		//Selected size name will be in the following format:
		//sizeName@templateType(Ex: SMALL@WomenApparelTemplate)
	    if(pSizeName.indexOf("@")!= -1 ){
	      pSizeName = pSizeName.substr(0, pSizeName.indexOf("@"));
	    }
	    //To add space if user comes from 'Continue Shopping' link
	    if(pSizeName.indexOf("SIZE") == 0 && pSizeName.indexOf(" ") == -1){
	      pSizeName = pSizeName.replace("SIZE", "SIZE ");
	    }
	    
		var Obj = productSelector.skuSelector.mAvailableSizes;
		//To select XSMALL and XLARGE if product has these sizes.
		for(i=0;i< Obj.length;i++){ 
			if (Obj[i].indexOf("XSMALL") == 0 && pSizeName.indexOf("X-SMALL") == 0) {
				pSizeName = Obj[i];
				break;
			}else if(Obj[i].indexOf("XLARGE") == 0 && pSizeName.indexOf("X-LARGE") == 0) {
				pSizeName = Obj[i];
				break;
			}
		}
	  	
		var currentSku = productSelector.skuSelector.getSku(pSizeName);
		//Checks an availability status for the current SKU
		if(currentSku != null && currentSku.availabilityStatus != 1001){
			productSelector.setSelectedSizeName(pSizeName);
			initializeAllProducts(isLeaderProduct); 
		}
	}
}

//End of Code added for Trac 1997.

// get cookies, assign 
var getCookies = function(){
  var pairs = document.cookie.split(";");
  var pairsLength = pairs.length;
  var cookies = {};
  for (var i=0; i<pairsLength; i++){
    var pair = pairs[i].split("=");
    pair[0] = jQuery.trim( pair[0] );
    cookies[pair[0]] = unescape(pair[1]);
  }
  return cookies;
}

var getURLParameter = function(name, url) {
    if (url == null) {
        url = window.location.search;
    }
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    name = "[\\?&]" + name + "=([^&#]*)";
    var regexp = new RegExp(name);
    var value = regexp.exec(url);
    if (value == null) {
        return "";
    }
    return value[1];
}

function getMetaValue( meta_name ) {

	var my_arr=document.getElementsByTagName("META");

	for (var counter=0; counter<my_arr.length; counter++) {

		if (my_arr[counter].name.toLowerCase() == meta_name.toLowerCase()) {
			return my_arr[counter].content;
		}
	}
	
	return "N/A";

}