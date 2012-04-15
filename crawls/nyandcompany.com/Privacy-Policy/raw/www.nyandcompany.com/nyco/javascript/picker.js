/**
 * Color/Size picker implementation.
 */

dojo.provide("atg.b2cblueprint.picker");

atg.b2cblueprint.picker={				
		changeimg:function (productid,isGiftCard,imgName,fromQBLayer,qbLayer,clrUrl,clss,style){
    // This changes added for R4.1.2 
	var selectColor,form,colorBox;
    if(fromQBLayer){
		colorBox = document.getElementById("colorBoxQB");
		selectColor = colorBox.options[document.getElementById("colorBoxQB").selectedIndex].value;
		form = document.getElementById('quickbuyclrszform');
	}else{
		colorBox = document.getElementById("colorBox");
		selectColor = colorBox.options[document.getElementById("colorBox").selectedIndex].value;
		form = document.getElementById('colorsizerefreshform');
	}
    if(!(colorBox == null) && colorBox.options[colorBox.selectedIndex].disabled == true){                       
	    var myselect=colorBox;
	    for (var i=0; i<myselect.options.length; i++){
			var colorValue = form.elements['selectedColor'].value;                                           
			if (myselect.options[i].value== colorValue){
				myselect.options[i].selected = true;
			}
	    }
		return;
    }              
    var picker=atg.b2cblueprint.picker;
    if(clrUrl==''){
                    clrUrl="http://s7ondemand7.scene7.com/is/image/NewYorkCompany/"+clss+style+"_"+selectColor+"?$prod$";
    }    
    picker.clickColor(selectColor,selectColor+productid,isGiftCard,imgName,fromQBLayer,qbLayer,clrUrl);
    if(fromQBLayer==false){
		setImage('NewYorkCompany/'+clss+style+'_'+selectColor);
	}
},
	changeSize:function (size_list,fromQBLayer,qbLayer){
	var size = document.getElementById(size_list).options [document.getElementById(size_list).selectedIndex].value;
		
	var picker=atg.b2cblueprint.picker;
	picker.clickSize(size,fromQBLayer,qbLayer);
  },  
  clickColor: function(color, nColor,isGiftCard,imgName,fromQBLayer,qbLayer,clrUrl){
	  //called when a user clicks on a color
    var form,form2;
	if(fromQBLayer){
		form = dojo.byId("quickbuyclrszform");
		form2 = dojo.byId("quickbuypriceform");// Added to implement display of price in product desc area
	}else{
		form = dojo.byId("colorsizerefreshform");
		form2 = dojo.byId("nycoPriceForm");// Added to implement display of price in product desc area		
	}
    var currentColor = form.elements.selectedColor.value;
    //if the color is not changing, dont do anything
    setTimeout("setSwatch('" + nColor + "','"+imgName+"','"+clrUrl+"');", 1);
    if(currentColor === color){
      return;
    }
    //set the new selected color in the refresh form and submit it
    form.elements.selectedColor.value = color;
    form2.elements.nycoPriceSelectedColor.value = color;// Added to implement display of price in product desc area
	
    var picker=atg.b2cblueprint.picker;	
    //picker.setGiftlistId();
	if(fromQBLayer){
		if(isGiftCard=="1")
		  {
		   picker.setDenomQB();
		  }
		picker.setQuantityQuickBuy(false);
		picker.clickColorQuickBuy(color,qbLayer);
    }else{
    	if(isGiftCard=="1")
  	  {
  	   picker.setDenomination();
  	  }
    	picker.setQuantity();
		picker.submitRefreshForm(); 
	}	
  },  

  //called when a user clicks on a size
  clickSize: function(size,fromQBLayer,qbLayer){	
	var form,form2;
	if(fromQBLayer){
		form = dojo.byId("quickbuyclrszform");
		form2 = dojo.byId("quickbuypriceform");// Added to implement display of price in product desc area
	}else{
		form = dojo.byId("colorsizerefreshform");
		form2 = dojo.byId("nycoPriceForm");// Added to implement display of price in product desc area
	}
    //if the user clicks the size that's already selected, don't do anything
    var currentSize = form.elements.selectedSize.value;
    if(currentSize === size){
      return;
    }

    //set the new selected size in the refresh form and submit it
    form.elements.selectedSize.value = size;
    form2.elements.nycoPriceSelectedSize.value = size;// Added to implement display of price in product desc area
    var picker=atg.b2cblueprint.picker;
    
    //picker.setGiftlistId();
	if(fromQBLayer){
		picker.setQuantityQuickBuy(false,qbLayer);
		picker.clickSizeQuickBuy(size,qbLayer);
    }else{
		picker.setQuantity();
		picker.submitRefreshForm(); 
	}
  },

  //gets the quantity from the addtocart form and sets the refreshform quantity 
  //we do this so we can preserve the quantity between refreshes
  setQuantity: function()
  {
    var addtocartform = dojo.byId("addToCart"); 
    var currentQuantity = addtocartform.elements.atg_b2cblueprint_quantityField.value;
    var refreshform = dojo.byId("colorsizerefreshform");
    refreshform.elements.savedquantity.value = currentQuantity;
  },
  
  //gets the quantity from the addToGiftList form and sets the refreshform savedgiftlist 
  //we do this so we can preserve the giftlist selection between refreshes
  setGiftlistId: function()
  {
    var addToGiftListForm = dojo.byId("addToGiftList");
    if(!addToGiftListForm){
      return;  
    }
    
    var currentGiftList = addToGiftListForm.elements.atg_b2cblueprint_GiftListChoice.value;
    var refreshform = dojo.byId("colorsizerefreshform");
    refreshform.elements.savedgiftlist.value = currentGiftList;
  },
  
  //resets the color and size selected and submits the refresh form
  resetPicker: function(){
    var form = dojo.byId("colorsizerefreshform");
    //reset the new selected size and color in the refresh form and submit it
    form.elements.selectedSize.value = "";
    form.elements.selectedColor.value = "";

    var picker=atg.b2cblueprint.picker;
    picker.setQuantity();
    picker.setGiftlistId();
    picker.submitRefreshForm(); 
  },

  submitRefreshForm: function()
  {
	var msg = dojo.byId("messageLine");
	msg.innerHTML=""; 
	dojo.io.bind({
    load: function(type, data,evt){
      var divColorPicker = dojo.byId("atg_b2cblueprint_picker");
      divColorPicker.innerHTML = data;
      dojo.widget.byId('minicart').hijackAllAddToCartNodes();
      $('a.thickbox').click(function(){
        tb_show(null,this.href,false);
        this.blur();
        return false;
       });   
      },
    formNode: dojo.byId("colorsizerefreshform")
    });  
// Added to implement display of price in product desc area Start
	  dojo.io.bind({
    load: function(type, data,evt){
      var divColorPicker2 = dojo.byId("nycoPrice");
      divColorPicker2.innerHTML = data;
      
      },
    formNode: dojo.byId("nycoPriceForm")
    });  
// Added to implement display of price in product desc area End
  },
  
  setQuantityOnGiftlistForm: function()
  {
    var addtocartform = dojo.byId("addToCart"); 
    var currentQuantity = addtocartform.elements.atg_b2cblueprint_quantityField.value;
    var addtogiftlistform = dojo.byId("addToGiftList");
    //set the quantity in the add to gift lsit form and submit it
    addtogiftlistform.elements.giftListAddQuantity.value = currentQuantity;
  },
  setDenomination: function()
  {
    var addtocartform = dojo.byId("addToCart"); 
    var currentDenomination = dojo.byId("nyco_denominationField").value;
    var refreshform = dojo.byId("colorsizerefreshform");
    refreshform.elements.saveddenomination.value = currentDenomination;
    var nycopriceform = dojo.byId("nycoPriceForm");
    nycopriceform.elements.pricesaveddenomination.value = currentDenomination;
  },
  changeDenomination: function()
  {
    var picker=atg.b2cblueprint.picker;
    picker.setDenomination();
    //picker.setGiftlistId();
    picker.submitRefreshForm();       
  },
  changeQuantity: function()
  {
    var picker=atg.b2cblueprint.picker;
    picker.setQuantity();
    //picker.setGiftlistId();
    picker.submitRefreshForm();       
  },
clickColorQuickBuy: function(color,qbLayer){
	   var form = dojo.byId("quickbuyclrszform");
	var prodId = form.elements.productId.value;
	var catId = form.elements.categoryId.value;
	var size = form.elements.selectedSize.value;
	var savedQty = form.elements.savedquantity.value;
	var isgiftcard = form.elements.isGiftCard.value;
	var saveddenom = form.elements.saveddenomination.value;
	var editSkuId =  form.elements.editedSkuid.value;
	var untQty = form.elements.unitQty.value;
	var edtLink = form.elements.editLink.value;
	var giftlistId = form.elements.giftlistId.value;
	var giftItemId = form.elements.giftItemId.value;
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/picker_contents.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/picker_contents.jsp.quickbuyclrszform",{ productId: prodId, categoryId: catId,selectedColor:color,selectedSize:size,savedquantity:savedQty,isGiftCard:isgiftcard,saveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId}, function(data){
	  document.getElementById("qb_picker").innerHTML="<div id='msgLine'></div>"+data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/nycoPrice.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/nycoPrice.jsp.quickbuypriceform",{ productId: prodId, nycoPriceSelectedColor:color,nycoPriceSelectedSize:size,nycoIsGiftCard:isgiftcard,pricesaveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
		  document.getElementById("quickBuyprice").innerHTML=data;
		  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});	

  },
	clickSizeQuickBuy: function(size,qbLayer){
	   var form = dojo.byId("quickbuyclrszform");
	var savedQty = form.elements.savedquantity.value;
	var isgiftcard = form.elements.isGiftCard.value;
	var saveddenom = form.elements.saveddenomination.value;
	var prodId = form.elements.productId.value;
	var catId = form.elements.categoryId.value;
	var currColor = form.elements.selectedColor.value;
	var editSkuId =  form.elements.editedSkuid.value;
	var untQty = form.elements.unitQty.value;
	var edtLink = form.elements.editLink.value;
	var giftlistId = form.elements.giftlistId.value;
	var giftItemId = form.elements.giftItemId.value;
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/picker_contents.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/picker_contents.jsp.quickbuyclrszform",{ productId: prodId, categoryId: catId,selectedColor:currColor,selectedSize:size,savedquantity:savedQty,isGiftCard:isgiftcard,saveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
	  document.getElementById("qb_picker").innerHTML="<div id='msgLine'></div>"+data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/nycoPrice.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/nycoPrice.jsp.quickbuypriceform",{ productId: prodId, nycoPriceSelectedColor:currColor,nycoPriceSelectedSize:size,nycoIsGiftCard:isgiftcard,pricesaveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
	  document.getElementById("quickBuyprice").innerHTML=data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});
  },
setQuantityQuickBuy: function(setQty,qbLayer){
	var addtocartform = dojo.byId("addToCartQB"); 
    var currentQuantity = addtocartform.elements.qb_quantityField.value;
    var refreshform = dojo.byId("quickbuyclrszform");
	var picker=atg.b2cblueprint.picker;
    refreshform.elements.savedquantity.value = currentQuantity;
	if(setQty){
		picker.submitRefreshFormQB(currentQuantity,qbLayer);
	}
  },
submitRefreshFormQB: function(qty,qbLayer)
  {	
	   var form = dojo.byId("quickbuyclrszform");
	var size = form.elements.selectedSize.value;
	var savedQty = qty;
	var isgiftcard = form.elements.isGiftCard.value;
	var saveddenom = form.elements.saveddenomination.value;
	var prodId = form.elements.productId.value;
	var catId = form.elements.categoryId.value;
	var currColor = form.elements.selectedColor.value;
	var editSkuId =  form.elements.editedSkuid.value;
	var untQty = form.elements.unitQty.value;
	var edtLink = form.elements.editLink.value;
	var giftlistId = form.elements.giftlistId.value;
	var giftItemId = form.elements.giftItemId.value;
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/picker_contents.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/picker_contents.jsp",{ productId: prodId, categoryId: catId,selectedColor:currColor,selectedSize:size,savedquantity:savedQty,isGiftCard:isgiftcard,saveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
	  document.getElementById("qb_picker").innerHTML="<div id='msgLine'></div>"+data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});	
  },
  changeQBProportion: function (style,formId,qbLayer) {
  	var form = dojo.byId("quickbuyclrszform");
	var savedQty = form.elements.savedquantity.value;
	var isgiftcard = form.elements.isGiftCard.value;
	var saveddenom = form.elements.saveddenomination.value;
	var prodId = form.elements.productId.value;
	var catId = form.elements.categoryId.value;
	var currColor = form.elements.selectedColor.value;
	var size = form.elements.selectedSize.value;
	var editColor = form.elements.editColor.value;
	var editSize = form.elements.editSize.value;
	var editSkuId =  form.elements.editedSkuid.value;
	var editProdId =  form.elements.editedProdid.value;
	var untQty = form.elements.unitQty.value;
	var edtLink = form.elements.editLink.value;
	var giftlistId = form.elements.giftlistId.value;
	var giftItemId = form.elements.giftItemId.value;
	if(editProdId != style){
		//currColor="";
		size="";
	}else{
		currColor=editColor;
		size=editSize;
	}
	var qbMrdet = document.getElementById("qbMoreDetails");
	$.get(proto+"//"+serverName+"/nyco/browse/quickBuyProductInfo.jsp?quickbuylayer="+qbLayer,{ productId: style,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId,selectedColor:currColor,selectedSize:size,savedquantity:savedQty,editedProdid:editProdId,editColor:editColor,editSize:editSize}, function(data){
	  document.getElementById("productinfo").innerHTML=data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});	
	if(qbMrdet){
	$.get(proto+"//"+serverName+"/nyco/browse/quickBuyMoreDetails.jsp?quickbuylayer="+qbLayer,{ productId: style,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId}, function(data){	  
	  qbMrdet.innerHTML=data;
	
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});	
	}
	 dojo.widget.byId('minicart').hijackAllAddToCartNodes();
		},
setDenomQB: function()
  {
    var addtocartform = dojo.byId("addToCartQB"); 
    var currentDenomination = dojo.byId("qb_denomField").value;
    var refreshform = dojo.byId("quickbuyclrszform");
    refreshform.elements.saveddenomination.value = currentDenomination;
    var nycopriceform = dojo.byId("quickbuypriceform");
    nycopriceform.elements.pricesaveddenomination.value = currentDenomination;
    dojo.widget.byId('minicart').hijackAllAddToCartNodes();
  },
  changeDenominationQB: function(qbLayer)
  {
    var picker=atg.b2cblueprint.picker;
    picker.setDenomQB();
    //picker.setGiftlistId();
    var form = dojo.byId("quickbuyclrszform");
	var savedQty = form.elements.savedquantity.value;
	var size = form.elements.selectedSize.value;
	var isgiftcard = form.elements.isGiftCard.value;
	var saveddenom = form.elements.saveddenomination.value;
	var prodId = form.elements.productId.value;
	var catId = form.elements.categoryId.value;
	var currColor = form.elements.selectedColor.value;
	var editSkuId =  form.elements.editedSkuid.value;
	var untQty = form.elements.unitQty.value;
	var edtLink = form.elements.editLink.value;
	var giftlistId = form.elements.giftlistId.value;
	var giftItemId = form.elements.giftItemId.value;
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/picker_contents.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/picker_contents.jsp.quickbuyclrszform",{ productId: prodId, categoryId: catId,selectedColor:currColor,selectedSize:size,savedquantity:savedQty,isGiftCard:isgiftcard,saveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
	  document.getElementById("qb_picker").innerHTML="<div id='msgLine'></div>"+data;
	});
	$.get(proto+"//"+serverName+"/nyco/browse/gadgets/nycoPrice.jsp?quickbuylayer="+qbLayer+"&_DARGS=/nyco/browse/gadgets/nycoPrice.jsp.quickbuypriceform",{ productId: prodId, nycoPriceSelectedColor:currColor,nycoPriceSelectedSize:size,nycoIsGiftCard:isgiftcard,pricesaveddenomination:saveddenom,editedSkuid:editSkuId,unitQty:untQty,editLink:edtLink,giftlistId:giftlistId,giftItemId:giftItemId }, function(data){
	  document.getElementById("quickBuyprice").innerHTML=data;
	  dojo.widget.byId('minicart').hijackAllAddToCartNodes();
	});       
  }
};