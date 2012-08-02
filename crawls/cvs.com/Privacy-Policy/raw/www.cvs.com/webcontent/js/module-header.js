	// Define an object in the global scope (i.e. the window object)
	window.$my =
	{
		// Initialize all the queries you want to use more than once
		shoppingCart : $("#shoppingCartContainer"),
		body : $("body"),
		globalNavTabs: $("#top-nav-tabs")
	};
	
	
	var alreadyLoadedPages = new Array();
	
	//Show fly down when hovering over top tabs OR tabbing
	var $flyouts = $('#pharmacy-flyout-tab,#shop-flyout-tab,#deals-flyout-tab,#extracare-flyout-tab');
	$flyouts.hover(showSubLevel,resetNavContent).focus(showSubLevel).blur(resetNavContent);
	
	var $flyoutTabs = $('#pharmacy-top-nav-tab,#shop-top-nav-tab,#deals-top-nav-tab,#extracare-top-nav-tab');
	//Hide the menu when leaving the flydown div but clear the timeout if entering back in
	$flyoutTabs.mouseleave(hideSubLevel).mouseenter(function(){clearTimeout($($my.globalNavTabs).data('timeoutId'));});
	
	//shopping cart hover logic
	var $navWrapper = $("#navWrapper");
	$navWrapper.delegate("#shoppingCartContainer:has(.full)",{hover: shoppingCart,focus: shoppingCart, blur: resetNavContent});
	
	//Hide the menu when leaving the flydown div
	$navWrapper.delegate("#shoppingCartContainer","mouseleave",closeCart);
	$navWrapper.delegate(".closeBtn","click",closeCart);
	//END shopping cart hover logic
	
	//Load web content when hovering or tabbing to department link. Close when blur our mouseout
	$('ul.sublevel-nav li a').hover(loadNavContent,resetNavContent).focus(loadNavContent).blur(resetNavContent);
	
	//Hide flydown on search focus 
	$('#searchbox').focus(hideSubLevel);
	//Hide type ahead on blur
	
	//start watermark text handle logic
	$("body").delegate("#GlobalSearchForm","submit",function(e){compareSearchText(e,'searchbox');});
	$("body").delegate("#noResultsSearchForm","submit",function(e){compareSearchText(e,'noTextSuggestions');});
	$("body").delegate("#pharmacySearchForm","submit",function(e){compareSearchText(e,'pharmacyNoTextSuggestions');});
	$("body").delegate("#drugInfoForm","submit",function(e){compareSearchText(e,'drugNoTextSuggestions');});
	
	function compareSearchText(e,searchBoxId)
	{ 
		    var searchText=$("#"+searchBoxId).val();
		   if(searchBoxId=='searchbox' || searchBoxId=='noTextSuggestions')
		   {
			 if(searchText=="" || searchText=='Search')
			 {
	    		 e.preventDefault();
			 }
		   }
		   else if(searchBoxId=='pharmacyNoTextSuggestions')
		   {
		     if(searchText=="" || searchText=='Enter Drug Name')
			 {
	    		 e.preventDefault();
			 }
		   }
	}
	//end watermark text handle logic

	
	//Add to basket code
	$("body").delegate("a.addToBasket","click",addItemToCartHandler);
 	$("body").delegate("a.overlay","click",showOverlayHandler);
 	
 	
	// added for add to list enhancement
 	$("body").delegate("#addToListOverlay","click",addItemToListHandler);
 	
	$('#signout').click(function(){	
        var myButton=$('#newButton').val();
		if (myButton !== null) {		
			var Backlen = history.length;
			history.go(-Backlen);
			top.window.location.href = "/";
			$('#newButton').click();
		}
      });
	   
	 $('#notyou').click(function(){	
	        var myButton=$('#cookieButton').val();
			if (myButton !== null) {		
				var Backlen = history.length;
				history.go(-Backlen);
				top.window.location.href = "/";
				$('#cookieButton').click();
			}
	 });
	 
	
	 
	function loadNavContent () {
		$('ul.sublevel-nav li a').removeClass("hover");
		var curElement = this;
	    var timeoutId = setTimeout(function() {
			  var divToLoad = $(curElement).next("div");
			  var divToLoadGenericClass = divToLoad.attr('class');
			  var url = $(curElement).attr("data-url");
			  
	    	  $('ul.sublevel-nav li a').removeClass("hover");
	    	  $('.'+divToLoadGenericClass).hide();
	    	  $(curElement).addClass("hover");
			  
	    	  //only load url once on a page
	    	  if (alreadyLoadedPages[url] != 1)
	    	  {
	    		  var urltoload = url + "?src=slot";
	    		  $(divToLoad).load(urltoload);
	    		  alreadyLoadedPages[url] = 1;
	    	  } 
	    	  
	    	  $(divToLoad).show();
	    }, 200);	    
	    // Use data so trigger can be cleared.
	    $(curElement).data('timeoutId', timeoutId);
	}

	function resetNavContent () {
		var curElement = this;
		clearTimeout($(this).data('timeoutId'));
	}
	
	function showSubLevel () {
		var curElement = this;
		
	    var timeoutId = setTimeout(function() {
	    	$(curElement).addClass("hover");
	    	
	    	//show shim
	    	document.getElementById('ie_flash_shim_iframe').style.display='block';
	    	
	    	var sublevel = $(curElement).next('.sublevel');
			$('.sublevel-nav a:first',sublevel).focus();
			
			//Remove other tab hover classes & hide all other sublevel divs
			$flyouts.removeClass("hover");
			$('.sublevel').hide();
			
			//Show active sublevel div & add hover class to current tab
			$(sublevel).show();
			$(curElement).addClass("hover");
	    }, 400);
	    
	    // Use data so trigger can be cleared.
	    $(curElement).data('timeoutId', timeoutId);
	}
	
	function hideSubLevel () {
		var globalTabs = $my.globalNavTabs;
		
		var timeoutId = setTimeout(function() {
			$('.sublevel').hide();
			$flyouts.removeClass("hover");
			document.getElementById('ie_flash_shim_iframe').style.display='none';
		}, 400);
		
		$(globalTabs).data('timeoutId', timeoutId);
	}
	
	function shoppingCart(event) {
		//alert(event.type);
		var curElement = this;
		
		if( event.type === 'mouseenter' || event.type === 'focus' )
		{
			//hover intent
			var timeoutId = setTimeout(function() {
				$(curElement).find(".sublevel").show();
				//show shim
				var shimHeight = $(curElement).find(".sublevel").height()-70;

				$("#ie_flash_shim_iframe2").height(shimHeight);
				document.getElementById('ie_flash_shim_iframe2').style.display='block';
				
				$(curElement).find("#miniCartButton").addClass("fullHover");
				
		    }, 200);
		    
		    // Use data so trigger can be cleared.
		    $(curElement).data('timeoutId', timeoutId);
		    $("#suggestionListBoxHeader").hide();
		}
	    else
	    {
	    	clearTimeout($(curElement).data('timeoutId'));
	    }
	}

	function closeCart() {
		document.getElementById('ie_flash_shim_iframe2').style.display='none';
		var curElement = $my.shoppingCart;
		$(curElement).find(".sublevel").hide();
		$(curElement).find("#miniCartButton").removeClass("fullHover");

	}
	function addItemToCartHandler (e) {
		var curElement = this;
		dcsMultiTrack('WT.si_n','ShoppingCart','WT.si_x','2','DCSext.Add2CartRefer',document.location.href);
		showOverlay(curElement,addItemToCart);
		e.preventDefault();
	}

	
	function addItemToCart(curElement){

		var skuid = $(curElement).attr("data-skuid");
		var prodid = $(curElement).attr("data-prodid");
		var tk = $(curElement).attr("data-tk");
		var qty = $(curElement).attr("data-qty");
		var itemstock = $(curElement).attr("data-itemStocklevel");
		var oid = $(curElement).attr("data-oid");
		var resturl = $(curElement).attr("data-resturl");
		var quantity = $("#"+qty).val();
		if(qty==1 || qty=="")
		{
			quantity=1;
		}
		else
		{
			quantity = $("#"+qty).val();
		}
		var jsonResponse = "";
		 $.ajax({
			type: 'POST', 
			url: resturl, 
			data: {"quantity":quantity,"productId":prodid,"skuId":skuid,"sessionId":tk,"itemStockLevel":itemstock,"orderId":oid},
			dataType: "JSON",
			success: function (json) {  
				try
				{					  
				 	var jsonResponse = json;
				 	var upcNumber = $(curElement).attr("data-upcNumber");
				 	
				 	if(json.atgResponse.statusCode==0){
					var shoppingCartContainer = $my.shoppingCart;
					var miniCart = $('<a href="/checkout/fs/shoppingcart_items.jsp" id="miniCartButton" class="full" title="My Basket"><span class="countHolder"><span class="start"></span><span	class="wrap">'+json.atgResponse.ItemCount+'</span><span class="end"></span></span></a>');
					var sublevel = $('<div class="sublevel"></div>');
					var tabReplacement = $('<div class="tabReplacement"></div>');
					var introHeader = $('<div class="introHeader"><strong>Your Cart: <span>'+json.atgResponse.ItemCount+' items</span></strong><a href="#" class="closeBtn" title="Close">Close</a></div>');
					var innerContent = $('<div class="innerContent"></div>');
					var scrollableContent = $('<div class="scrollableContent"></div>');
					var pad = $('<div class="padd"></div>');
					var btm = $('<div class="btm"></div>');
					
					
					sublevel.append(tabReplacement);
					sublevel.append(introHeader);				
					
					for(var i=0;i<json.atgResponse.ItemsInCartCount;i++)
				 		{
							var alttext=json.atgResponse.Items[i].displayname;
							var noImage = $('<div class="cartImageCont"><a class="cartItemImg" href="/shop/product-detail/?skuId='+json.atgResponse.Items[i].skuId+'"><img src="/bizcontent/merchandising/productimages/small/'+json.atgResponse.Items[i].upcNumber+'.jpg" alt="'+alttext+'"></a></div>');
							var cartItemDesc = $('<div class="cartItemDesc"><strong class="title">'+json.atgResponse.Items[i].displayname+'</strong><br/>Size: '+json.atgResponse.Items[i].size+'<br />Qty: '+json.atgResponse.Items[i].qty+'</div>');
							var itemOffer=json.atgResponse.Items[i].offer;
							if(itemOffer==null || itemOffer=="null")
							{
								if(json.atgResponse.Items[i].price < 0)
								{	
									var cartItemPrice = $('<div class="cartItemPrice"><strong>($'+json.atgResponse.Items[i].price.replace(/[^a-zA-Z 0-9.]+/g,'')+')</strong></div>');
								}
								else
								{
									var cartItemPrice = $('<div class="cartItemPrice"><strong>$'+json.atgResponse.Items[i].price+'</strong></div>');
								}
							}
							else if((itemOffer!=null )&&(json.atgResponse.Items[i].salePrice == json.atgResponse.Items[i].price) )
							{
								var cartItemPrice = $('<div class="cartItemPrice"><strong>$'+json.atgResponse.Items[i].price+'</strong></div>');
								
							}
							else
							{
								if(json.atgResponse.Items[i].salePrice<0)
								{
									var cartItemPrice = $('<div class="cartItemPrice"><strong>($'+json.atgResponse.Items[i].salePrice.replace(/[^a-zA-Z 0-9.]+/g,'')+')</strong><small class="strikethrough">$'+json.atgResponse.Items[i].price+'</small><br /><span class="greentxt">'+json.atgResponse.Items[i].offer+'</span></div>');
								}
								else
								{
									var cartItemPrice = $('<div class="cartItemPrice"><strong>$'+json.atgResponse.Items[i].salePrice+'</strong><small class="strikethrough">$'+json.atgResponse.Items[i].price+'</small><br /><span class="greentxt">'+json.atgResponse.Items[i].offer+'</span></div>');
								}
								
							}
							var cartitem = $('<div class="cartItem"></div>');
							
							cartitem.append(noImage);	
							cartitem.append(cartItemDesc);	
							cartitem.append(cartItemPrice);	
							scrollableContent.append(cartitem);
				 		}
				 		
					var subTotal =json.atgResponse.OrderSubTotal.toFixed(2);
					var subTotal1 = subTotal.replace(/[^a-zA-Z 0-9.]+/g,'');
					
					if(subTotal<0)
					{	
						
						var floatContainer1 = $('<div class="floatContainer"><div class="floatLeft"><a href="/checkout/fs/shoppingcart_items.jsp" title="Edit My Cart">Edit	My Cart</a></div><div class="floatRight"><span class="cartItemSubTotal">Subtotal:</span><span class="cartItemTotal">($'+subTotal1+')</span></div></div>');
					}
					else
					{
						
						var floatContainer1 = $('<div class="floatContainer"><div class="floatLeft"><a href="/checkout/fs/shoppingcart_items.jsp" title="Edit My Cart">Edit	My Cart</a></div><div class="floatRight"><span class="cartItemSubTotal">Subtotal:</span><span class="cartItemTotal">$'+subTotal+'</span></div></div>');
					}
					var floatContainer2 = $('<div class="floatContainer"><div class="floatLeft contineShopping"><a href="#"	class="closeBtn" title="Continue Shopping">Continue Shopping</a></div><div class="floatRight"><a class="cvsbtn btn-red-lrg"	href="/checkout/fs/shoppingcart_items.jsp" title="Checkout Now"><span class="left"></span> <span class="center">Checkout Now</span> <span class="right-with-arrow"></span> </a></div></div>');
					
					pad.append(floatContainer1);
					pad.append(floatContainer2);
					
					innerContent.append(scrollableContent);
					innerContent.append(pad);
					
					sublevel.append(innerContent);
					sublevel.append(btm);
	
					shoppingCartContainer.html('');
					shoppingCartContainer.append(miniCart);
					shoppingCartContainer.append(sublevel);
					
					var listPrice = $(curElement).attr("data-listPrice");
					
					var salePrice = $(curElement).attr("data-salePrice");
					var offer = $(curElement).attr("data-offer");
					var overlay = $('<div id="modalDialogBoxBor"></div>');
					if(quantity==1)
					{
					var headerDiv=$('<div class="mdboxHeader"><p>1 item added to your basket.</p></div>');
					}
					else
					{
						var headerDiv=$('<div class="mdboxHeader"><p>'+quantity+' items added to your basket.</p></div>');
					}
					overlay.append(headerDiv);
					var closemdboxProdDiv=$('<div class="closemdboxProd"><img src="/bizcontent/merchandising/productimages/small/'+upcNumber+'.jpg" alt="'+upcNumber+'"></div>');
					
					var newItemOffer = json.atgResponse.newItem.offer;
				
				    if(newItemOffer=="null" || newItemOffer==null)
					{
						var descriptionDiv=$('<div class="closemdboxDesc"><p class="title"><strong>'+json.atgResponse.newItem.displayname+'</strong></p><p class="size">Size: '+json.atgResponse.newItem.size+' oz<br /><span class="qty">Qty: '+json.atgResponse.newItem.qty+'</span></p><b class="red">'+salePrice+'</b><br /><br /></div>');
					}
					else
					{
						var descriptionDiv=$('<div class="closemdboxDesc"><p class="title"><strong>'+json.atgResponse.newItem.displayname+'</strong></p><p class="size">Size: '+json.atgResponse.newItem.size+' oz<br /><span class="qty">Qty: '+json.atgResponse.newItem.qty+'</span></p><b class="red">'+salePrice+'</b><br /><small class="strikethrough">'+listPrice+'</small><br /><strong class="greentxt">'+newItemOffer+'</strong></div>');
					}		    
					var brLine=$('<br class="clear"/>');
					var hrLine=$('<hr class="closeMdboxHr"/>');
					if(subTotal<0)
					{	
						
						var cartDetailsDiv=$('<div class="cartDtls"><strong class="totalitems">'+json.atgResponse.ItemCount+' total items</strong><span class="editLink"><a href="/checkout/fs/shoppingcart_items.jsp">Edit</a></span><span class="subtotal">Subtotal:<strong>($'+subTotal1+')</strong></span></div>');
					}
					else
					{
						
						var cartDetailsDiv=$('<div class="cartDtls"><strong class="totalitems">'+json.atgResponse.ItemCount+' total items</strong><span class="editLink"><a href="/checkout/fs/shoppingcart_items.jsp">Edit</a></span><span class="subtotal">Subtotal:<strong>$'+subTotal+'</strong></span></div>');
					}
					
					
					
					var buttonDiv=$('<div class="shoppingBtns">	<span><a href="#" class="closeOverlay secondaryR">Continue Shopping</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/checkout/fs/shoppingcart_items.jsp" class="cvsbtn btn-red-lrg" id="continue2" name="continue" title="continue" ><span class="left"></span><span class="center">Checkout Now</span><span class="right-with-arrow"></span></a></div>');
					
					var detailsDiv=$('<div class="closemdboxCont"></div>');
					
					detailsDiv.append(closemdboxProdDiv);
					detailsDiv.append(descriptionDiv);
					detailsDiv.append(brLine);
					detailsDiv.append(hrLine);
					detailsDiv.append(cartDetailsDiv);
					detailsDiv.append(buttonDiv);
					
					overlay.append(detailsDiv);
				 	}else{				 		
				 		var overlay = $('<div id="modalDialogBoxBor"></div>');
				 		var headerDiv=$('<div class="mdboxHeader"><p>Basket error</p></div>');
						overlay.append(headerDiv);						
						var descriptionDiv=$('<div id="formerrorswrapper"  style="display: block; margin-bottom:0px"><div class="flxmsg_wrpper"><div class="topLeft_corner"></div><div class="topRight_corner"></div><div id="formerrors"><div><h2>'+json.atgResponse.error+'</h2><br /></div></div><div class="bottomLeft_corner"></div><div class="bottomRight_corner"></div></div></div>');
						var detailsDiv=$('<div class="closemdboxCont" ></div>');
						detailsDiv.append(descriptionDiv);
						overlay.append(detailsDiv);
				 	}					
					$('#addToCart-overlay .details').html(overlay); 
					
				} catch (err)
				{
					$('#addToCart-overlay .details').html("<div class='error'>I'm sorry there was an error processing your request.</div>");
				}
         
			}, 
			error: function(jqxhr){ 

			},
			complete: function(jqxhr, textstatus){ 	
				if (jqxhr.status == "200")
				{
				}
			}
		});
	}
 	
 	function showOverlayHandler (e) {
 		var curElement = this;
 		showOverlay(curElement,null);
 		e.preventDefault();
 	}
 	
	function showOverlay (curElement,callbackMethod) {
		
	 	$(curElement).overlay({
	 		mask: {color: '#000',opacity: 0.5},
			load: true,
			top: "25%",
			closeOnClick: false,
			fixed: false,//set to false to scroll with the browser
			onBeforeLoad: function() {
				//Add noscroll class to body
				var pageBody = $my.body;
				//$(pageBody).addClass("noscroll"); //this is used to shut off scrolling behind the overlay
				
	 			//append overlay to bottom of document
	 			$(document.body).append(this.getOverlay());
	 			
				// grab wrapper element inside content
	 			var wrap = this.getOverlay().find(".details");
	 			$(wrap).html('<div id="overlayLoadingImg"><img id="overlayAnimatedGif" src="/webcontent/images/common/loading_lg.gif" alt="Loading" /></div>');

				setTimeout('$("#overlayAnimatedGif").attr("src","/webcontent/images/common/loading_lg.gif")', 200);
				
			},
	 		onLoad: function() {
	 			//IE7 fix for z-index
	 			//this.getOverlay().insertAfter('#exposeMask');
	 			
	 			//execute callback function if there is a callback
				if (callbackMethod!=null)
				{
					if (typeof callbackMethod == 'function') { // make sure the callback is a function
						callbackMethod(this.getTrigger()); // brings the scope to the callback
				    }
				}
				
	 			// grab wrapper element inside content
	 			var wrap = this.getOverlay().find(".details");
	 			
	 			//check the datatype first. If iframe then load an iframe. If ajax then call the url via ajax call.
	 			var dataurl = this.getTrigger().attr("data-url");
	 			var otype = this.getTrigger().attr("data-otype");
	 			var oid = this.getTrigger().attr("data-oid");
	 			
	 			if (oid == null || oid == '')
	 			{
	 				oid=this.getTrigger().attr("id");
	 			}
	 			var overlayclass = "overlayIframe-" + oid;
	 			
	 			if (otype!=null && otype == 'iframe')
	 			{//iFrame overlay
	 			
	 				var theframe = $('<iframe frameborder="0" scrolling="auto" id="overlayFrame" style="display:none"></iframe>');
	 				//var protocol = window.location.protocol;
	 				//var host = window.location.host;
	 				//var iurl = protocol + "//"+host+dataurl;
	 				$(theframe).attr({ src: dataurl});
	 				$(theframe).attr("class",overlayclass);
	 				$(wrap).html(theframe);	

	 /*				var screenWidth = screen.width;
				    var overlayWidth = $(theframe).width()+40;
				    
				    var left = (screenWidth / 2 - overlayWidth / 2);
				    $(wrap).parent().css({width : overlayWidth})
				    $(wrap).parent().css({left : left})*/
				    
	 				$(theframe).show();		
	 				
	 				
	 			} else if (otype!=null && otype == 'div') 
	 			{//This is used by addtocart and shoppinglist where a call back method is used to write content back into the overlay div to load
	 				var pageBody = $my.body;
                    $(pageBody).delegate(".closeOverlay","click",function(){
                          $("#overlayCloseAdd").click();
                    });
	 				
	 			} else if (otype!=null && otype == 'pagecontent') 
	 			{//used for existing div on page which the contents will be retrieved and then loaded in
	 				var divtoload = this.getTrigger().attr("data-odiv");
	 				var selector = "#"+divtoload;
	 				if (divtoload !=null)
	 				{
	 					$(wrap).html("");
						$(wrap).append($(selector).html());
	 				}
	 				
					$(".closeOverlay").click(function(){
						$("#overlayCloseAdd").click();
				 	});
					
					//reposition overlay
					//repositionOverlay();
	 			} else 
	 			{//ajax overlay
	 				
		 			// load the page specified in the trigger	
		 			$.ajax({
		 				  url: dataurl,
		 				  async: false,
		 				  success: function(data){
		 					$(wrap).html("");
							$(wrap).append(data);
							
							$(".closeOverlay").click(function(){
								$("#overlayClose").click();
						 	});
							
							//center overlay
							//var screenWidth = screen.width;
						   // var overlayWidth = $(wrap).width();
						    //var left = (screenWidth / 2 - overlayWidth / 2);
						   // $(wrap).parent().css({left : left})
							
		 				  },
		 				  error: function (jqXHR, textStatus, errorThrown) {
		 					 //alert('error');
		 				  }, 
		 				  complete: function(data){
		 					 //reposition overlay after all content has been loaded
		 					 //repositionOverlay();
		 				  }
		 				});
			 	}
	 			
	 			
			},
			onClose: function () {
				//Remove scroll
				var pageBody = $my.body;
				//$(pageBody).removeClass("noscroll");//this removes the class that hides the scroll behind overlay
				
	 			var rtype = this.getTrigger().attr("data-refresh");
	 			if (rtype!=null && rtype == 'needed')
	 			{
	 				window.parent.location.reload(true);
	 			}
			}

	 	});
	 

 }
	// added for add to list enhancement
	function addItemToListHandler (e) {
		var curElement = this;
		showOverlay(curElement,addItemToList);
		e.preventDefault();
	}
	// added for add to list enhancement
	function addItemToList(curElement){
		var skuid = $(curElement).attr("data-skuid");
		var prodid = $(curElement).attr("data-prodid");
		var qty = $(curElement).attr("data-qty");
		var resturl = $(curElement).attr("data-resturl");
		var quantity = $("#"+qty).val();
		if(qty==1)
		{
			quantity=1;
		}
		var jsonResponse = "";
		 $.ajax({
			type: 'POST', 
			url: resturl, 
			data: {"quantity":quantity,"productId":prodid,"skuId":skuid},
			dataType: "JSON",
			success: function (json) {  
				try
				{					  					
					var listPrice = $(curElement).attr("data-listPrice");						
					var salePrice = $(curElement).attr("data-salePrice");						
					var offer = $(curElement).attr("data-offer");					
					var upcNumber = $(curElement).attr("data-upcNumber");
					var overlay = $('<div id="modalDialogBoxBor"></div>');
					if(json.atgResponse.statusCode==0){
					
					if(quantity==1)
					{
					var headerDiv=$('<div class="mdboxHeader"><p>1 item added to your shopping list</p></div>');
					}					
					overlay.append(headerDiv);
					var closemdboxProdDiv=$('<div class="closemdboxProd"><img src="/bizcontent/merchandising/productimages/small/'+upcNumber+'.jpg" alt="'+upcNumber+'"></div>');

				    if(offer=="null" || offer==null)
					{
						var descriptionDiv=$('<div class="closemdboxDesc"><p class="title">'+json.atgResponse.Items.displayname+'</p><p class="size">Size: '+json.atgResponse.Items.size+' oz<br /><span class="qty">Qty: '+json.atgResponse.Items.qty+'</span></p><br /><b class="red">'+salePrice+'</b><br /><br /></div>');
					}
					else
					{
						var descriptionDiv=$('<div class="closemdboxDesc"><p class="title">'+json.atgResponse.Items.displayname+'</p><p class="size">Size: '+json.atgResponse.Items.size+' oz<br /><span class="qty">Qty: '+json.atgResponse.Items.qty+'</span></p><br /><b class="red">'+salePrice+'</b><br /><small class="strikethrough">'+listPrice+'</small><br /><strong class="greentxt">'+offer+'</strong></div>');
					}
					var brLine=$('<br class="clear"/>');
					var hrLine=$('<hr class="closeMdboxHr"/>');
					if(json.atgResponse.ItemsInListCount==1)
					{
						var cartDetailsDiv=$('<div class="cartDtls_ovrl" >'+json.atgResponse.ItemsInListCount+' total item</div>');
					}else{
						var cartDetailsDiv=$('<div class="cartDtls_ovrl">'+json.atgResponse.ItemsInListCount+' total items</div>');
					}
					
					var buttonDiv=$('<div class="shoppingBtns"><div class="floatRight"><div class="floatLeft mt10"><span><a href="#" class="closeOverlay secondaryR">Continue Shopping</a></span></div> <div class="floatLeft"><span class="ml20"><a href="/account/shopping_list.jsp" class="cvsbtn btn-red-lrg" id="list" name="list" title="shoppinglist" ><span class="left"></span><span class="center">Shopping List</span><span class="right-with-arrow"></span></a></span></div></div></div>');
					
					var detailsDiv=$('<div class="closemdboxCont"></div>');
					
					detailsDiv.append(closemdboxProdDiv);
					detailsDiv.append(descriptionDiv);
					detailsDiv.append(brLine);
					detailsDiv.append(hrLine);
					detailsDiv.append(cartDetailsDiv);
					detailsDiv.append(buttonDiv);
					
					overlay.append(detailsDiv);
					}else{
						var headerDiv=$('<div class="mdboxHeader"><p></p></div>');
						overlay.append(headerDiv);
						var descriptionDiv=$('<div><b class="red">'+json.atgResponse.error+'</b><br /></div>');
						var detailsDiv=$('<div class="closemdboxCont" ></div>');
						detailsDiv.append(descriptionDiv);
						overlay.append(detailsDiv);
					}
					
					$('#addToCart-overlay .details').html(overlay); 
					
				} catch (err)
				{
					$('#addToCart-overlay .details').html("<div class='error'>Sorry, there was an error processing your request.</div>");
				}
         
			}, 
			error: function(jqxhr){
			
			},
			complete: function(jqxhr, textstatus){ 	
				if (jqxhr.status == "200")
				{
				}
			}
		});
	}
	function saveToShopList(skuid)
	{							
			$('.'+skuid+'').click();			
			
	}


