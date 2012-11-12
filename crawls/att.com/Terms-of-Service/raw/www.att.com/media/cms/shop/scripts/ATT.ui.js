ATT.namespace("ui");
/**
 * Object will display hint text to text inputs.  The text input's title attribute's value will display when input's value is empty.
 * include inputs on the page with class="hint".  
 * @example <input type="text" class="hint" value="" title="This hint will display when value is empty" />
 **/
ATT.ui.hints = {
	inited : false,
	init : function (options) {
		options = options || {hintClass:'hint'};
		var hintClass = options.hintClass;
		var hintSelector = 'input.'+hintClass;
		jQuery(hintSelector).each(function(idx, input) {
			if (input.value === '' && !!!input.atthinted) {
				input.value = input.title;
				input.atthinted = true;
				jQuery(input).addClass(hintClass+'ing');
			} else {
				jQuery(input).removeClass(hintClass+'ing');
				input.atthinted = true;
			}
		});
		if ( ! ATT.ui.hints.inited) { // only delegate once on document
			jQuery(document).delegate(hintSelector,'focus',function(e){
				tgt = e.currentTarget;
				if (tgt.value === tgt.title && !!tgt.atthinted) {
					tgt.value = '';
					jQuery(tgt).removeClass(hintClass+'ing');
				}
			});
			jQuery(document).delegate(hintSelector,'blur',function(e){
				tgt = e.currentTarget;
				if (tgt.value === '' && !!tgt.atthinted) {
					tgt.value = tgt.title;
					jQuery(tgt).addClass(hintClass+'ing');
				}
			});
			jQuery(document).delegate('form','submit', function(e){
				form = e.currentTarget;
				jQuery(form).find(hintSelector+'ing').each(function(idx, input) {
					input.value = '';
				});
				return true;
			});
			ATT.ui.hints.inited = true;
		}
	}
}
jQuery(document).ready(function(){
	if (jQuery('input.hint').length > 0) ATT.ui.hints.init();
	jQuery(document).bind('cbox_complete cbox_closed',function() {
		if (jQuery('input.hint').length > 0) ATT.ui.hints.init();
	});
});

ATT.ui.rtiListOOS = {
        oosVar: {},
		delay: function(millis) {      
		    var dfd = jQuery.Deferred();      
		    setTimeout(function() {          
		        dfd.resolve();
		    }, millis || 2000);
		    return dfd.promise();
		},
        getPageSkus: function(){
            var pageSkus=[];
            var skuLen = jQuery('img[id*="image-sku"]').length, skuIdLen = jQuery('div[id*="item_sku"]').length;
            if(skuLen!=0){
            jQuery('img[id*="image-sku"]').each(function(index) {
                var skuID = this.id.split("-");
                pageSkus.push(skuID[1]);
               
            });
            }else if(skuIdLen!=0){
                jQuery('div[id*="item_sku"]').each(function(index) {
                    var skuID = this.id.split("_");
                    pageSkus.push(skuID[1]);
                });
            }
            return pageSkus;
        },
        init: function() {
        var pageSkus = this.getPageSkus();
        var oosMsg = this.oosVar.outofstock;
        var list = this.oosVar.list;// = 'accessories';
        
        jQuery.ajax({
          url: this.oosVar.url,
          success: function(data) {  
           var oosSkus = data.split(",");
           for (j=0;j<oosSkus.length;j++){
               oosSkus[j] = jQuery.trim(oosSkus[j]);
           }
           if(list=="accessory"){
        	   for(i=0;i<pageSkus.length;i++){
                   var skuIndex = jQuery.inArray(pageSkus[i], oosSkus);
                   
                   
                   var itemSkuImg = jQuery("#item_"+pageSkus[i]+" > div[class=listGridAcc-titleImgPrice] > div[class*=listGridAcc-image] > a[class=clickStreamSingleItem] > img");
                   //List View
                   if(itemSkuImg.length==0){

                       itemSkuImg = jQuery("#image-"+pageSkus[i]);
                       
                      
						if(skuIndex!=-1){
							var itemSku = jQuery("#accessory_"+itemSkuImg.parent().attr('data-pid')+" > div[class=listLineAcc-priceInfo] > div[class*=level2Seperator] > div[class=listItemPriceRt] > span[class=dueToday]");
							if(!itemSkuImg.hasClass('outOfStockOpacity')){
	                             itemSkuImg.removeClass('inStockOpacity').addClass('outOfStockOpacity');
	                             itemSku.after('<div class="clear listLineAcc-title-outOfStock">'+oosMsg+'</div>');
	                             itemSku.addClass('dueToday-outOfStock').removeClass('dueToday');
	                           }
                           }else{
                              if(itemSkuImg.hasClass('outOfStockOpacity')){
                            	  var itemSkuOOS = jQuery("#accessory_"+itemSkuImg.parent().attr('data-pid')+" > div[class=listLineAcc-priceInfo] > div[class=listLineAcc-price] > div[class=dueToday-outOfStock]");
                                  itemSkuImg.removeClass('outOfStockOpacity').addClass('inStockOpacity');
                                  itemSkuOOS.addClass('dueToday').removeClass('dueToday-outOfStock');
                                  jQuery("#accessory_"+itemSkuImg.parent().attr('data-pid')+" > div[class=listLineAcc-priceInfo] > div[class=listLineAcc-price] > div[class*=listLineAcc-title-outOfStock]").remove();
                                 }
                          }

                   }else{            
                	   //Grid View
                     if(skuIndex!=-1){
                         var itemSku = jQuery("#item_"+pageSkus[i]+" > div[class=listGridAcc-titleImgPrice] > div[class=listGridAcc-priceInfo] > div[class=listGridAcc-price]");
                         if(!itemSkuImg.hasClass('outOfStockOpacity')){
                           itemSkuImg.removeClass('inStockOpacity').addClass('outOfStockOpacity');
                           itemSku.after('<div class="listGridAcc-title-outOfStock">'+oosMsg+'</div>');
                           itemSku.addClass('listGridAcc-price-outOfStock').removeClass('listGridAcc-price');
                         }
                         }else{
                               if(itemSkuImg.hasClass('outOfStockOpacity')){
                                var itemSkuOOS = jQuery("#item_"+pageSkus[i]+" > div[class=listGridAcc-titleImgPrice] > div[class=listGridAcc-priceInfo] > div[class=listGridAcc-price-outOfStock]");
                                itemSkuImg.removeClass('outOfStockOpacity').addClass('inStockOpacity');
                                itemSkuOOS.addClass('listGridAcc-price').removeClass('listGridAcc-price-outOfStock');
                                jQuery("#item_"+pageSkus[i]+" > div[class=listGridAcc-titleImgPrice] > div[class=listGridAcc-priceInfo] > div[class=listGridAcc-title-outOfStock]").remove();
                               }
                        }
                     
                   }

                 }// accessory skus loop
        	   
           }else{

           for(i=0;i<pageSkus.length;i++){
              var skuIndex = jQuery.inArray(pageSkus[i], oosSkus);
              
              
              var itemSkuImg = jQuery("#item_"+pageSkus[i]+" > div[class=listGrid-imagePrice] > div[class=listGrid-image] > a[class=clickStreamSingleItem] > img");
            //List View
              if(itemSkuImg.length==0){

                  itemSkuImg = jQuery("#item_"+pageSkus[i]+" > div[class=listLine-image] > div[class=image] > a > img");

                  if(skuIndex!=-1){
                      var itemSku = jQuery("#item_"+pageSkus[i]+" > div[class=listLine-priceInfo] > div[class=listLine-price]");
                	  if(!itemSkuImg.hasClass('outOfStockOpacity')){
                        itemSkuImg.removeClass('inStockOpacity').addClass('outOfStockOpacity');
                        jQuery("#item_"+pageSkus[i]+" > div[class=listLine-button] > div[class=listLine-finePrint]").append('<div class="listLine-outOfStock">'+oosMsg+'</div>');
                        itemSku.addClass('listLine-price-outOfStock').removeClass('listLine-price');
                      }

                      }else{
                         if(itemSkuImg.hasClass('outOfStockOpacity')){
                        	 var itemSkuOOS = jQuery("#item_"+pageSkus[i]+" > div[class=listLine-priceInfo] > div[class=listLine-price-outOfStock]");
                             itemSkuImg.removeClass('outOfStockOpacity').addClass('inStockOpacity');
                             itemSkuOOS.addClass('listLine-price').removeClass('listLine-price-outOfStock');
                             jQuery("#item_"+pageSkus[i]+" > div[class=listLine-button] > div[class=listLine-finePrint] div[class=listLine-outOfStock]").remove();
                            }
                     }

              }else{            
            	//Grid View
                if(skuIndex!=-1){
                    var itemSku = jQuery("#item_"+pageSkus[i]+" > div[class=listGrid-imagePrice] > div[class=listGrid-priceInfo] > div[class=listGrid-price]");
                    if(!itemSkuImg.hasClass('outOfStockOpacity')){
                      itemSkuImg.removeClass('inStockOpacity').addClass('outOfStockOpacity');
                      itemSku.after('<div class="listGrid-outOfStock">'+oosMsg+'</div>');
                      itemSku.addClass('listGrid-price-outOfStock').removeClass('listGrid-price');
                    }
                    }else{
                          if(itemSkuImg.hasClass('outOfStockOpacity')){
                           var itemSkuOOS = jQuery("#item_"+pageSkus[i]+" > div[class=listGrid-imagePrice] > div[class=listGrid-priceInfo] > div[class=listGrid-price-outOfStock]");
                           itemSkuImg.removeClass('outOfStockOpacity').addClass('inStockOpacity');
                           itemSkuOOS.addClass('listGrid-price').removeClass('listGrid-price-outOfStock');
                           jQuery("#item_"+pageSkus[i]+" > div[class=listGrid-imagePrice] > div[class=listGrid-priceInfo] > div[class=listGrid-outOfStock]").remove();
                          }
                   }
              }

            }// pageSkus loop
           }//list end
           
        }
        });//End ajax
        }// End init
    }