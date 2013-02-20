/*******************************************************************************************
     * Pricing logic to update mini cart on config pages.
     *******************************************************************************************/     
    function updateMiniShoppingCart()
    {   
    	if( ($('.anchorPricing',$('#pricingSummary')).length) > 0){
    		$("#miniCartSummary").find("tr:gt(1)").remove();
    	}else{
    		$("#miniCartSummary").find("tr:gt(0)").remove();
    	};
        $('span#[id^=priceMultiLine]').html('-');
        $('p#[id^=priceMultiLine]').html('-');
        var nrcTotalPrice = 0.00;
        var mrcTotalPrice = 0.00;
        var nrcTotalPriceOriginal = "";
        var mrcTotalPriceOriginal = "";
        var MRCpromotionApplied = false;
        var NRCpromotionApplied = false;
        var nrcAnchorPrice = $('#alreadyPriced_Nrc').html();
        var mrcAnchorPrice = $('#alreadyPriced_Mrc').html();
        var nrcPriceTxt ="";
        if( !isNaN( parseFloat(  nrcAnchorPrice ) ) ) {
            nrcTotalPrice = parseFloat(nrcAnchorPrice);
        };
        if( !isNaN( parseFloat( mrcAnchorPrice  ) ) ) {
            mrcTotalPrice = parseFloat(mrcAnchorPrice) ;
        } ;
        
        var checkedBoxesLinecount = {}
        var selectBoxesLineCount ={}
        /* calculate the price corresponding to each line type */
        
        $('select[class="toBePriced"]',$('#localConfigContainer')).each(function(){
            var selectedSku=$.trim($('option:selected',$(this)).val());
            if(typeof selectBoxesLineCount[this.value] == 'undefined'){
            	selectBoxesLineCount[this.value] = '1';
            }else{
            	selectBoxesLineCount[this.value]= Number(selectBoxesLineCount[this.value]) + 1;
            }
        });
        
        for(var selectedSku in selectBoxesLineCount){  
        	var mrcOrgPrice = "";
            var nrcOrgPrice = "";
            var yrcOrgPrice = "";
            var mrcPrice="";
            var nrcPrice="";
        	var displayName = $('#name_'+ selectedSku).html();
            if( ($('#MRC_'+selectedSku).html()) != null){
            	mrcPrice = $('#MRC_'+selectedSku).html();
                mrcPrice = Number(mrcPrice) * Number(selectBoxesLineCount[selectedSku]);
                mrcTotalPrice = Number(mrcTotalPrice) + Number(mrcPrice);
                if($('#MRCpromotionsApplied_'+selectedSku).html() == 'true'){
          		   MRCpromotionApplied = true;
          		   mrcOrgPrice = $('#MRCOriginalPrice_'+selectedSku).html();
          		   mrcOrgPrice = Number(mrcOrgPrice) * Number(selectBoxesLineCount[selectedSku]);
          		   mrcTotalPriceOriginal = Number(mrcTotalPriceOriginal) + Number(mrcOrgPrice);
          	   }
               
            }
            if( ($('#NRC_'+selectedSku).html()) != null){
            	nrcPrice = $('#NRC_'+selectedSku).html();
            	nrcPrice = Number(nrcPrice) * Number(selectBoxesLineCount[selectedSku]);
            	nrcTotalPrice = Number(nrcTotalPrice) + Number(nrcPrice);
            	if($('#NRCpromotionsApplied_'+selectedSku).html() == 'true'){
        		   NRCpromotionApplied = true;
        		   nrcOrgPrice = $('#NRCOriginalPrice_'+selectedSku).html();
        		   nrcOrgPrice = Number(nrcOrgPrice) * Number(checkedBoxesLinecount[selectedSku]);
        		   nrcTotalPriceOriginal = Number(nrcTotalPriceOriginal) + Number(nrcOrgPrice);
        	   }
            }
            var mrcOrgPriceHolder="";
            var nrcOrgPriceHolder="";
            var nrcDiscount="";
        	var mrcDiscount="";
        	if(mrcOrgPrice != ""){
        		mrcOrgPriceHolder = '<span>$'+Number(mrcOrgPrice).toFixed(2)+'</span><br/>'
        		mrcDiscount = Number(mrcOrgPrice).toFixed(2) - Number(mrcPrice).toFixed(2);
        	    mrcDiscount = Number(mrcDiscount).toFixed(2);
        	}
        	else
        		mrcOrgPriceHolder = '<span>$'+Number(mrcPrice).toFixed(2)+'</span><br/>'
        	if(nrcOrgPrice != ""){
        		nrcOrgPriceHolder = '<span>$'+Number(nrcOrgPrice).toFixed(2)+'</span><br/>'
        		nrcDiscount = Number(nrcOrgPrice).toFixed(2) - Number(nrcPrice).toFixed(2);
        		nrcDiscount = Number(nrcDiscount).toFixed(2);
        	}
        	else
        		nrcOrgPriceHolder = '<span>$'+Number(nrcPrice).toFixed(2)+'</span><br/>'
        		
           
        	
        	if ((nrcDiscount!=0.00 || mrcDiscount !=0.00)){
        		 $('<tr style="border-bottom:none"><td>'+displayName+'</td><td class="priceColumn">'+nrcOrgPriceHolder+ '</td><td class="priceColumn">'+mrcOrgPriceHolder+ '</td></tr>').appendTo('#miniCartSummary');
        	if(nrcDiscount == 0.00)
        		$('<tr ><td>Promotional Discount</td><td class="priceColumn"></td><td class="priceColumn">-$'+mrcDiscount+'</td></tr>').appendTo('#miniCartSummary');
        	else if(mrcDiscount == 0.00)
        		$('<tr ><td>Promotional Discount</td><td class="priceColumn">-$'+nrcDiscount+'</td><td class="priceColumn"></td></tr>').appendTo('#miniCartSummary');
        	else 
        		$('<tr ><td>Promotional Discount</td><td class="priceColumn">-$'+nrcDiscount+'</td><td class="priceColumn">-$'+mrcDiscount+'</td></tr>').appendTo('#miniCartSummary');
        	}
        	else
        		{ $('<tr><td>'+displayName+'</td><td class="priceColumn">'+nrcOrgPriceHolder+ '</td><td class="priceColumn">'+mrcOrgPriceHolder+ '</td></tr>').appendTo('#miniCartSummary');}
        	}
        var $LCLineTypePriceSpan = $('#selectedPlanPrice');
        if($LCLineTypePriceSpan.length >0){
        	$LCLineTypePriceSpan.html('$'+Number(mrcTotalPrice).toFixed(2));
        }
        $('input:checked',$('#localConfigContainer')).each(function(){
            if(typeof checkedBoxesLinecount[this.value] == 'undefined'){
                checkedBoxesLinecount[this.value] = '1';
            }else{
                checkedBoxesLinecount[this.value]= Number(checkedBoxesLinecount[this.value]) + 1;
            }
        });                    
        
        for(var productId in  checkedBoxesLinecount){
        	var mrcOrgPrice = "";
            var nrcOrgPrice = "";
            var yrcOrgPrice = "";
            if($('#input_'+productId).hasClass('requiredAddOn')){
            	if( ($('#MRC_'+productId).html()) == '0.0')
				{ 
            		$('#priceMultiLine_'+productId).html('Included in Price');
				}
			else
				{
					$('#priceMultiLine_'+productId).html('$'+Number($('#MRC_'+productId).html()).toFixed(2));
				}
            }else{
            	var displayName = $('#name_'+ productId).html();
                /*if( ($('#MRC_'+productId).html()) != null){*/
                	mrcOrgPrice ="";
                    mrcPrice = $('#MRC_'+productId).html();
                    nrcPrice = $('#NRC_'+productId).html();
                    
                    mrcPrice = Number(mrcPrice) * Number(checkedBoxesLinecount[productId]);
                    nrcPrice = Number(nrcPrice) * Number(checkedBoxesLinecount[productId]);
                    
                    if( isNaN(nrcPrice)) { nrcPrice = '';}else{
                    	nrcPriceTxt = '$'+Number(nrcPrice).toFixed(2);
                    	//alert("nrcPriceTxt"+nrcPriceTxt);
                    	nrcTotalPrice = Number(nrcTotalPrice) + Number(nrcPrice);
                    }
                    if($('#MRCpromotionsApplied_'+productId).html() == 'true'){
              		   MRCpromotionApplied = true;
              		   mrcOrgPrice = $('#MRCOriginalPrice_'+productId).html();
              		   mrcOrgPrice = Number(mrcOrgPrice) * Number(checkedBoxesLinecount[productId]);
              		   mrcTotalPriceOriginal = Number(mrcTotalPriceOriginal) + Number(mrcOrgPrice);
              	   }
                    if($('#NRCpromotionsApplied_'+productId).html() == 'true'){
               		   NRCpromotionApplied = true;
               		   nrcOrgPrice = $('#NRCOriginalPrice_'+productId).html();
               		   nrcOrgPrice = Number(nrcOrgPrice) * Number(checkedBoxesLinecount[productId]);
               		   nrcTotalPriceOriginal = Number(nrcTotalPriceOriginal) + Number(nrcOrgPrice);
               	   }
                    mrcTotalPrice = Number(mrcTotalPrice) + Number(mrcPrice);
                    var mrcOrgPriceHolder="";
                    var mrcDiscount = "";
                	if(mrcOrgPrice != ""){
                		mrcOrgPriceHolder = '<span>$'+Number(mrcOrgPrice).toFixed(2)+'</span><br/>'
                		mrcDiscount = Number(mrcOrgPrice).toFixed(2) - Number(mrcPrice).toFixed(2);
                		mrcDiscount = Number(mrcDiscount).toFixed(2);
                	}
                	else
                		mrcOrgPriceHolder = '<span>$'+Number(mrcPrice).toFixed(2)+'</span><br/>'
                	
                   if(!(mrcDiscount == 0.00)){
                    	$('<tr style="border-bottom:none"><td>'+displayName+'</td><td class="priceColumn">'+ nrcPriceTxt +'</td><td class="priceColumn">'+mrcOrgPriceHolder+ '</td></tr>').appendTo('#miniCartSummary');
                    	$('<tr ><td>Promotional Discount</td><td class="priceColumn"></td><td class="priceColumn">-$'+mrcDiscount+'</td></tr>').appendTo('#miniCartSummary');
                    }
                    else
                    	{ $('<tr><td>'+displayName+'</td><td class="priceColumn">'+ nrcPriceTxt +'</td><td class="priceColumn">'+mrcOrgPriceHolder+ '</td></tr>').appendTo('#miniCartSummary');}
                //}
            	$('#priceMultiLine_'+productId).html('$'+Number(mrcPrice).toFixed(2));
           }
            
        }
        
        $configContainers = $('div.configContainer');
            $selectedInput = $("input:checked",$configContainers);
            $selectedInputText = $("input.tobePrice[type=text]",$configContainers);
            $selectedInput = $.merge($selectedInput,$selectedInputText);
            $($selectedInput).each(function(index) {
                if(!($(this).hasClass('notToBePriced'))){
                    selectedInputId = $(this).attr('id');
                    var inputType = $(this).attr('type');
                    var selectedInputName = $(this).attr('name');
                    var quantity = 1;
                    if(inputType == 'text'){
                        quantity = $(this).val();
                    }
                    if(selectedInputName == 'tsconfig' && $(this).val()==''){
                        quantity=1;
                        if($(this).hasClass('zeroDefaultQuantity')){
                        	quantity =0;
                        }
                    }
                    selectedproductId = selectedInputId.replace("input_","name_");
                    productId = selectedInputId.replace("input_","");
                    $selectedNameObj = $('#'+selectedproductId);
                    selectedMrcId=selectedInputId.replace("input_","MRC_");
                    $selectedMrcObj =$('#'+selectedMrcId);     
                    $selectedMrcOrgObj  = $('#MRCOriginalPrice_'+productId); 
                    selectedNrcId=selectedInputId.replace("input_","NRC_");
                    $selectedNrcObj =$('#'+selectedNrcId);
                    $selectedNrcOrgObj  = $('#NRCOriginalPrice_'+productId); 
                    selectedYrcId=selectedInputId.replace("input_","YRC_");
                    $selectedYrcObj =$('#'+selectedYrcId);
                    $selectedYrcOrgObj  = $('#YRCOriginalPrice_'+productId); 
                    var mrcPrice = "";
                    var nrcPrice = "";
                    var yrcPrice = "";
                    var mrcOrgPrice = "";
                    var nrcOrgPrice = "";
                    var yrcOrgPrice = "";
                    var mrcpromotionApplied= $('#MRCpromotionsApplied_'+productId).html();
                    var nrcpromotionApplied= $('#NRCpromotionsApplied_'+productId).html();
                    var yrcpromotionApplied= $('#YRCpromotionsApplied_'+productId).html();
                    if($selectedMrcObj.html()!= null ){
                       mrcPrice = $selectedMrcObj.html();
                       mrcPrice = Number(mrcPrice)*Number(quantity);
                       mrcTotalPrice = Number(mrcTotalPrice) + Number(mrcPrice);
                       if(mrcpromotionApplied == 'true'){
                    	   if($selectedMrcOrgObj.html() != null){
                    		   MRCpromotionApplied = true;
                    		   mrcOrgPrice = $selectedMrcOrgObj.html();
                    		   mrcOrgPrice = Number(mrcOrgPrice)*Number(quantity);
                    		   mrcTotalPriceOriginal = Number(mrcTotalPriceOriginal) + Number(mrcOrgPrice);
                    	   }
                       }
                    }
                    
                    if($selectedNrcObj.html()!= null  ){
                       nrcPrice = $selectedNrcObj.html();
                       nrcPrice = Number(nrcPrice)*Number(quantity);
                       nrcTotalPrice = Number(nrcTotalPrice) + Number(nrcPrice);
                       if(nrcpromotionApplied == 'true'){
                    	   if($selectedNrcOrgObj.html() != null){
                    		   NRCpromotionApplied = true;
                    		   nrcOrgPrice = $selectedNrcOrgObj.html();
                    		   nrcOrgPrice = Number(nrcOrgPrice)*Number(quantity);
                    		   nrcTotalPriceOriginal = Number(nrcTotalPriceOriginal) + Number(nrcOrgPrice);
                    	   }
                       }
                    }
                    if($selectedYrcObj.html()!= null  ){
                        yrcPrice = $selectedYrcObj.html();
                        /* Display the yrc price under one time column */
                        nrcPrice = Number(yrcPrice)*Number(quantity);
                        nrcTotalPrice = Number(nrcTotalPrice) + Number(nrcPrice);
                        
                        if(yrcpromotionApplied == 'true'){
                     	   if($selectedYrcOrgObj.html() != null){
                     		   NRCpromotionApplied = true;
                     		   yrcOrgPrice = $selectedYrcOrgObj.html();
                     		   nrcOrgPrice = Number(yrcOrgPrice)*Number(quantity);
                     		   nrcTotalPriceOriginal = Number(nrcTotalPriceOriginal) + Number(nrcOrgPrice);
                     	   }
                        }
                     }
                    if((yrcpromotionApplied == 'true') || (nrcpromotionApplied == 'true') || (mrcpromotionApplied == 'true')){
                    	var mrcOrgPriceHolder="";
                    	var nrcOrgPriceHolder="";
                    	var nrcDiscount="";
                    	var mrcDiscount="";
                    	if(mrcOrgPrice != ""){
                    		mrcOrgPriceHolder = '<span>$'+Number(mrcOrgPrice).toFixed(2)+'</span><br/>'
                    		mrcDiscount = Number(mrcOrgPrice).toFixed(2) - Number(mrcPrice).toFixed(2);
                    		mrcDiscount = Number(mrcDiscount).toFixed(2);
                    	}
                    	else
                    		{
                    		mrcOrgPriceHolder = '<span>$'+Number(mrcPrice).toFixed(2)+'</span><br/>'
                    		}
                    	if(nrcOrgPrice != ""){
                    		nrcOrgPriceHolder = '<span>$'+Number(nrcOrgPrice).toFixed(2)+'</span><br/>'
                    		nrcDiscount = Number(nrcOrgPrice).toFixed(2) - Number(nrcPrice).toFixed(2);
                    		nrcDiscount = Number(nrcDiscount).toFixed(2);
                    		                    	}
                    	else
                    		{
                    		nrcOrgPriceHolder = '<span>$'+Number(nrcPrice).toFixed(2)+'</span><br/>'
                    		}
                    	$('<tr style="border-bottom:none"><td>'+$selectedNameObj.html()+'</td><td class="priceColumn">'+nrcOrgPriceHolder+ '</td><td class="priceColumn">'+mrcOrgPriceHolder+'</td></tr>').appendTo('#miniCartSummary');
                    	if ((nrcDiscount!=0.00 || mrcDiscount !=0.00)){
                    	if(nrcDiscount == 0.00)
                    		$('<tr ><td>Promotional Discount</td><td class="priceColumn"></td><td class="priceColumn">-$'+mrcDiscount+'</td></tr>').appendTo('#miniCartSummary');
                    	else if(mrcDiscount == 0.00)
                    		$('<tr ><td>Promotional Discount</td><td class="priceColumn">-$'+nrcDiscount+'</td><td class="priceColumn"></td></tr>').appendTo('#miniCartSummary');
                    	else
                    		$('<tr ><td>Promotional Discount</td><td class="priceColumn">-$'+nrcDiscount+'</td><td class="priceColumn">-$'+mrcDiscount+'</td></tr>').appendTo('#miniCartSummary');
                    	}
                    }else{
                    	$('<tr><td>'+$selectedNameObj.html()+'</td><td class="priceColumn">$'+Number(nrcPrice).toFixed(2)+'</td><td class="priceColumn">$'+Number(mrcPrice).toFixed(2)+'</td></tr>').appendTo('#miniCartSummary');
                    }
                    
                }
            });
            
            var totalMRCOrgHolder ="";
            var totalNRCOrgHolder ="";
            /*if(MRCpromotionApplied == true){
            	totalMRCOrgHolder = '<span style="text-decoration: line-through;">$'+Number(mrcTotalPriceOriginal).toFixed(2)+'</span><br/>'
            }
            if(NRCpromotionApplied == true){
            	alert("NRC total original" +NrcTotalPriceOriginal);
            	totalNRCOrgHolder = '<span style="text-decoration: line-through;">$'+Number(NrcTotalPriceOriginal).toFixed(2)+'</span><br/>'
            }*/
            /*$('<tr><td><strong>Total<strong></td><td class="priceColumn"><strong>'+ totalNRCOrgHolder + '$'+nrcTotalPrice.toFixed(2)+'</strong></td><td class="priceColumn"><strong>' + totalMRCOrgHolder + '$'+mrcTotalPrice.toFixed(2)+'</strong></td></tr>').appendTo('#miniCartSummary');*/
            $('<tr><td><strong>Total<strong></td><td class="priceColumn"><strong>$'+nrcTotalPrice.toFixed(2)+'</strong></td><td class="priceColumn"><strong>$'+mrcTotalPrice.toFixed(2)+'</strong></td></tr>').appendTo('#miniCartSummary');
    }
    


//header 
$(document).ready(function() {
     
	// Cache the selectors results
    $globalNav = $('#globalNav');
    $primaryMenuLi = $('li[id^="primary_"]',$globalNav);
    $secondaryMenuUL = $('ul[id^="secondaryMenu_"]',$globalNav);
    $trayContent = $('#trayContent',$globalNav);
    $hoverContent = $('#hoverContent');
    $segMenuItemBusiness = $('#segMenuItemBusiness',$globalNav);
    
    $existingCustomerFlyDown = $('#existingCustomerLink', $globalNav);

    
    /*function to initiate working of primary navigation menu*/
    GlobalShadow = {
    	offsets: {
    		msie: {zIndex: "-1", top:-5,left:-5,height:-2,width:-3}, 
			other: {zIndex: "0", top:1,left:2,height:-1,width:-4}
    	},
    	
    	show: function(){
    		var pEl = document.getElementById('tieredNav');
    		if(pEl!= undefined){
	    		var mEl = this.jMerge(pEl);
	    		var offsets = ($.browser.msie)? this.offsets.msie:this.offsets.other;
	    		var shadow = this;
	    		$('.globalNavHasShadow').css({
	    			"display": "none",
	    			"background": "black",
	    			"position": "absolute",
	    			"z-index": offsets.zIndex
	    		});
	    		var tieTop = shadow.offset(pEl).top;
	    		var tieLeft = shadow.offset(mEl).left;
	    		$('.globalNavHasShadow').css({
	    			"width": Math.max(mEl.outerWidth() + offsets.width,0),
					"height": Math.max(mEl.outerHeight() + offsets.height,0),
					"top": Math.max(shadow.offset(mEl).top + offsets.top,0),
					"left": Math.max(shadow.offset(mEl).left + offsets.left,0),
					"display": "block"
	    		});
    		}
    		
    	},
    	
    	offset: function(element){
			var curLeft = 0; 
			var curTop = 0;
			if(element.offsetParent) {
				do {
					curLeft += element.offsetLeft;
					curTop += element.offsetTop;
				} while(element = element.offsetParent)
			}
			return {top:curTop,left:curLeft}
		},
		
		jMerge: function(El){
			var jEl;
			jEl = jQuery(El);
			El = jEl.get()[0];
			
			for(jMember in jEl){
				if(typeof El[jMember] == "undefined"){
					El[jMember] = jEl[jMember];
				}
			}
			return El;
		}
    };
    
    function inti_loadPrimaryMenu(){
        $primaryMenuLi.each(function(){
            $(this).mouseenter(function() {
            	if($(this).attr('id').indexOf("Search") > -1 || $(this).attr('id').indexOf("ATTLogo") > -1){}else{
	                $primaryMenuLi.each(function(){$(this).removeClass();});
	                $secondaryMenuUL.css('display','none');
            	}
                $trayContent.css('height', '0px');
                var navName = $(this).attr("id");
                var cutShort = navName.split('_')[1];
                $('#secondaryMenu_'+cutShort, $globalNav).css('display','block');
                $(this).addClass(cutShort.toLowerCase()+'ShowAlways');
                var adjustShadowHeight = false;
                GlobalShadow.show();
            });
            
            
        });
        var activeTab = $('#clicked').val();
        if(activeTab == 'shop'){
            $('#secondaryMenu_Shop', $globalNav).css('display', 'block');
            $('li#primary_Shop', $globalNav).addClass('shopShowAlways');
        }else if(activeTab == 'solutions'){
            $('#secondaryMenu_Solutions', $globalNav).css('display', 'block');
            $('li#primary_Solutions', $globalNav).addClass('solutionsShowAlways');
        }else if(activeTab == 'support'){
            $('#secondaryMenu_Support', $globalNav).css('display', 'block');
            $('li#primary_Support', $globalNav).addClass('supportShowAlways');
        }
        GlobalShadow.show();
    }
    //calling function 
    inti_loadPrimaryMenu();
    
        
    /*function to initiate secondary menu*/
    function init_loadSecMenu(){
        
        $($secondaryMenuUL[0]).find("li").bind('hover', function(){ 
            var mId = $(this).attr('id');
            $('div[id^="tray_"]', $trayContent).hide(); 
            if(mId == 'SpecialOffers' || mId =='EmptySpace' ){
                $('#SpecialOffers a', $globalNav).css('background','none');
                $trayContent.hide();
            }else{
                $trayContent.show();
                $('.tray'+mId, $trayContent).css('display', 'block'); 
            }
            GlobalShadow.show();
          });
        
    	$($secondaryMenuUL[1]).find("li").bind('hover', function(){ 
            var mId = $(this).attr('id');
            $('div[id^="tray_"]', $trayContent).hide(); 
            if(mId =='EmptySpace' ){
                $('#SpecialOffers a', $globalNav).css('background','none');
                $trayContent.hide();
            }else{
                $('.tray'+mId, $trayContent).css('display', 'block');
                $trayContent.show();
            }
            GlobalShadow.show();
          });
            
            $($secondaryMenuUL[2]).hover(function(){
                $($secondaryMenuUL[2]).find("a").css('background','none');                 
              $trayContent.hide();
              GlobalShadow.show();
          });
          
            $($secondaryMenuUL[0]).mouseenter(function() {
                $trayContent.css('height', 'auto');
                $($primaryMenuLi[1]).addClass('shopShowAlways');
                GlobalShadow.show();
           });
            $($secondaryMenuUL[1]).mouseenter(function() {
                $trayContent.css('height', 'auto');
                $($primaryMenuLi[2]).addClass('solutionsShowAlways');
                GlobalShadow.show();
           });
            
            /*defect #9911*/
            
            activeMenu = $('#clicked_sec_menu').val();
            if(activeMenu != undefined){
	            if(activeMenu == 'Bundles')
	            	$('#Bundles a').css('color', '#067AB4');	
	            else if(activeMenu == 'Wireless')
	            	$('#Wireless a').css('color', '#067AB4');
	            else if(activeMenu == 'BusinessPhone')
	                $('#BusinessPhone a').css('color', '#067AB4');
	           else if(activeMenu == 'Internet')
	                $('#Internet a').css('color', '#067AB4');
	            else if(activeMenu == 'BusinessTv')
	                $('#BusinessTv a').css('color', '#067AB4');
	            else if(activeMenu == 'BusinessServices')
	                $('#BusinessServices a').css('color', '#067AB4');
	            else if(activeMenu == 'SpecialOffers')
	                $('#SpecialOffers a').css('color', '#067AB4');
            }
            GlobalShadow.show();       
    }
    init_loadSecMenu();
    
    
   
    
    /*function to initiate tertiary menu*/
    function init_loadTertiaryMenu(){
        var activeTab = $('#clicked').val();
        $('#tieredNav').mouseleave(function() {            
            $trayContent.css('height', '0px');
            if(activeTab == 'shop'){
                $('#secondaryMenu_Solutions',$globalNav).css('display', 'none');
                $('#secondaryMenu_Support',$globalNav).css('display', 'none');
                $('#secondaryMenu_Shop', $globalNav).css('display', 'block');
                $('li#primary_Shop', $globalNav).addClass('shopShowAlways');
                $('li#primary_Solutions', $globalNav).removeClass('solutionsShowAlways');
                $('li#primary_Support', $globalNav).removeClass('supportShowAlways');
            }else if(activeTab == 'solutions'){
                $('#secondaryMenu_Solutions',$globalNav).css('display', 'block');
                $('#secondaryMenu_Support',$globalNav).css('display', 'none');
                $('#secondaryMenu_Shop', $globalNav).css('display', 'none');
                $('li#primary_Shop', $globalNav).removeClass('shopShowAlways');
                $('li#primary_Solutions', $globalNav).addClass('solutionsShowAlways');
                $('li#primary_Support', $globalNav).removeClass('supportShowAlways');
            }else if(activeTab == 'support'){
                $('#secondaryMenu_Solutions',$globalNav).css('display', 'none');
                $('#secondaryMenu_Support',$globalNav).css('display', 'block');
                $('#secondaryMenu_Shop', $globalNav).css('display', 'none');
                $('li#primary_Shop', $globalNav).removeClass('shopShowAlways');
                $('li#primary_Solutions', $globalNav).removeClass('solutionsShowAlways');
                $('li#primary_Support', $globalNav).addClass('supportShowAlways');
            }else{        
                $primaryMenuLi.each(function(){$(this).removeClass();});
                $secondaryMenuUL.css('display', 'none');
            }
            
            GlobalShadow.show();
        });
        $trayContent.mouseenter(function() {
            $trayContent.addClass('columnContent');
            $(this).addClass('activeHover');
            if($(this).hasClass('Shop')){
            	$($primaryMenuLi[1]).addClass('shopShowAlways');
            }
            else if($(this).hasClass('Solutions')){
            	$($primaryMenuLi[2]).addClass('solutionsShowAlways');
            }
            if($trayContent.find("div[class^=tray]:visible").length >0){
                var mId = $trayContent.find("div[class^=tray]:visible").attr("class").split(" ")[1].replace("tray","");
                $("li#"+mId).addClass('secondaryMenuHover');
                $('a',$("li#"+mId)).css('color', '#005895');
            }
        });
        
        $trayContent.mouseleave(function() {
        	$('.activeHover').removeClass('activeHover');
            $trayContent.css('height', '0px');
            $trayContent.removeClass('columnContent');
            if($trayContent.find("div[class^=tray]:visible").length >0){
                var mId = $trayContent.find("div[class^=tray]:visible").attr("class").split(" ")[1].replace("tray","");
                $("li#"+mId).removeClass('secondaryMenuHover');
                $('a',$("li#"+mId)).css('color', '');
            }
            
            // HIding the 2SMB login link for wireless
            $('.2SMBLoginSection').hide();
            GlobalShadow.show();
        });    
    }init_loadTertiaryMenu();
     
        $segMenuItemBusiness.mouseenter(function() {
            $(this).addClass("over");
            var left = $segMenuItemBusiness.offset().left + 4;
            $(".segSubMenu",$globalNav).css({left:left, "display": "block", "height": "113px"});
            $(".segSubMenu ul",$globalNav).css({"display": "block"}); 
        });
        $('.hasNoSubMenu').mouseenter(function() {
            $(".segSubMenu",$globalNav).css({"display": "none", "height": "0px"});
            $(".segSubMenu ul",$globalNav).css({"display": "none"}); 
        });
        $('.segSubMenu').mouseenter(function() {
            $(this).addClass("over");
            var left = $segMenuItemBusiness.offset().left + 4;
            $(".segSubMenu",$globalNav).css({left:left, "display": "block", "height": "113px"});
            $(".segSubMenu ul",$globalNav).css({"display": "block"}); 
        });
        $('.segSubMenu').mouseleave(function() {
            $(".segSubMenu",$globalNav).css({"display": "none", "height": "0px"});
            $(".segSubMenu ul",$globalNav).css({"display": "none"}); 
        });
        $('#leftSegMenu').mouseleave(function() {
            $(".segSubMenu",$globalNav).css({"display": "none", "height": "0px"});
            $(".segSubMenu ul",$globalNav).css({"display": "none"}); 
        });
        
        
        
        /* function to show existing customer box*/
        
        $('html').click(function() {
            $("#existing_customer").hide(); 
        });
        $existingCustomerFlyDown.click(function(event) {
            var position = $('#existingCustomerLink').offset();
            var divWidth = $('#existingCustomerLink').width();
            var divW = $("#existing_customer").width() - 11;
            var offl = position.left - (divW - divWidth);
            var offx = position.top ;
            $("#existing_customer").css("top",offx - 15);
            $("#existing_customer").css("left",offl);
            $("#existing_customer").toggle();
            event.stopPropagation();   
        	
        });    
        
        
    /*function to make search input box empty while click*/
   if($('#question')!=undefined) {
	   $('#question').click(function() {
	    	var defaultSearchText = "Search this site";
	    	var searchTextVal = $('#question').val();
	    	if(searchTextVal.indexOf(defaultSearchText) != -1){
	    		 this.value = "";
	    	}
	    });
   }
    
    /*function for stayConnected */
    $('.clear-input').click(function() {
        this.value = "";
    });
    
    
    
    /*function for familyHover*/
    function init_loadFamilyHoverMenu(){
        $hoverContent.parent().hide();
        $('#serviceItemsContainer a').mouseover( function(){
        	var mId = $(this).parents("div[id]").attr("id");
        	var arrowPosition = {
        			hover_Bundles : "7%",
        			hover_Wireless : "22%",
        			hover_BusinessPhone : "37%",
        			hover_Internet : "52%",
        			hover_BusinessTv : "67%",
        			hover_BusinessServices : "82%"
        	}
        	$hoverContent.find('> div').each(function(){$(this).css('display', 'none')});
        	$("#hoverArrow").css('left',arrowPosition[mId]);
        	$("#"+mId).css('display', 'block');           
        	$hoverContent.parent().show(); 
        	var hoverHeight=$hoverContent.outerHeight()+3;
        	$hoverContent.parent().css("top","-"+hoverHeight+"px");
         });
        
    }init_loadFamilyHoverMenu();
    $('#promotionalProd').mouseleave( function(){
        $hoverContent.parent().hide();
    }); 
    /*function to attach loaction overlay for enabling and dsiabling the Go Button*/
    function enableGoButton(){
    	$form = $('#changeAdreesEligibility',$('#SeviceEligibiltyLightBox'));
    	var disable = false;
        $form.find(':input[class=toBeValidated]').each(function(i, el) { // test all inputs for values
            if ($.trim(el.value) === '') {
                disable = true; // disable submit if any of them are still blank
            }
        });
        $form.find('select[class=toBeValidated]').each(function(i, el) { // test all inputs for values
            if ($.trim(el.value) === '') {
                disable = true; // disable submit if any of them are still blank
            }
        });
       if(disable === false){
        	$('#enableGo',$('#changeAdreesEligibility')).show();
        	$('#disabledGo',$('#changeAdreesEligibility')).hide();
        }else{
        	$('#disabledGo',$('#changeAdreesEligibility')).show();
        	$('#enableGo',$('#changeAdreesEligibility')).hide();
        }
    }enableGoButton();
    function init_enableGoButton() {
    	$form = $('#changeAdreesEligibility',$('#SeviceEligibiltyLightBox')); // cache
	    $form.find(':input[type="submit"]').prop('disabled', true); // disable submit btn
	    $form.find(':input').bind('change keyup',function() { // monitor all inputs for changes
	    	enableGoButton();
	    });
    }init_enableGoButton();
    
    /*function to attach loaction overlay to "set loaction" */
    function init_attactLoactionOverlay() {
        var locationOverlayHandlers = {
                beforeOpen : function(e){
                	if($("#wtZipCode").val() == ""){
                		/*WebMetrics.overlayLoadPage(WebMetrics.getPageName() + " Overlay Address Modal Information Address Unknown Pg", 
                									WebMetrics.getMetaTagValue('DCSext.wtPN') + "_OverlayAddressModalAddressNotFound_ChangeAddress",
                									WebMetrics.getMetaTagValue('DCSext.wtPN') + "_OverlayAddressModalAddressNotFound_Body");*/
                		
                		WebMetrics.overlayLoadPage(WebMetrics.getPageName() + " Overlay Address Modal Information Address Unknown Pg");
                	}else{
                		/*WebMetrics.overlayLoadPage(WebMetrics.getPageName() + " Overlay Address Modal Information Address Known Pg", 
								WebMetrics.getMetaTagValue('DCSext.wtPN') + "_OverlayAddressModalInformationKnownPg_Go",
								WebMetrics.getMetaTagValue('DCSext.wtPN') + "_OverlayAddressModalInformationKnownPg_Body");*/
                		WebMetrics.overlayLoadPage(WebMetrics.getPageName() + " Overlay Address Modal Information Address Known Pg");
                	}
                    if($('#isCartEmpty').val() == 'false'){
                        $('#addressOptions').hide();
                        $('#errorContainer').hide();
                        $('#attemptFailure').hide();
                        $('#serviceAddress').show();
                        $('#initSavedCartMsg').show();
                        $('#savedCartMsg').hide();
                        $('#serverReponse').html("");
                        $('#changeAdreesEligibility').hide();
                        $('#saveCartOverlay').hide();
                        $('#warningSaveCart').show();
                        $('#flowType').val("changeLocation");
                        $('#macMsg').hide();
                        $('#showphoneNumber').hide();
                        $('#evaluateForBTNNumber').val("true");
                    }else{
                        $('#addressOptions').hide();
                        $('#errorContainer').hide();
                        $('#attemptFailure').hide();
                        $('#serviceAddress').show();
                        $('#initSavedCartMsg').show();
                        $('#savedCartMsg').hide();
                        $('#serverReponse').html("");
                        $('#changeAdreesEligibility').show();
                        $('#saveCartOverlay').hide();
                        $('#warningSaveCart').hide();
                        $('#flowType').val("changeLocation");
                        $('#macMsg').hide();
                        $('#showphoneNumber').hide();
                        $('#evaluateForBTNNumber').val("true");
                    }
                }
        }
        $('.locationOverlay').myplugin({
            'backDropId' : 'SeviceEligibiltyBackDrop',
            'lightBoxId' : 'SeviceEligibiltyLightBox'
        },locationOverlayHandlers);
        if($('.showLocationOverlay').length > 0 ){
            
            $('.showLocationOverlay').myplugin({
                'backDropId' : 'SeviceEligibiltyBackDrop',
                'lightBoxId' : 'SeviceEligibiltyLightBox'
            },locationOverlayHandlers);
            
        }
        
        $('.showLocationOverlay-strict').myplugin({
            'backDropId' : 'SeviceEligibiltyStrictBackDrop',
            'lightBoxId' : 'SeviceEligibiltyLightBox',
            'close'		 : 'no'
        },locationOverlayHandlers);
        
    }init_attactLoactionOverlay();
    $('.productFilterOverlay').each(function(){
    	var thisURL = $(this).attr('href');
    	$(this).click(function(e){
    		e.preventDefault();
    		$('#processProducts').click();
    		var src = "/smallbusiness/common/processing.jsp?successURL="+thisURL;
    		$('#processingPage').attr("src",src);
    		
    	});
    });
    /*function to attach save cart overlay for mac flow */
    function init_macSaveCartOverlay(){
    	 var macSaveCartHandlers = {
                 beforeOpen : function(srcElement){
                	 if($('#isCartEmpty').val() == 'false'){
                         $('#addressOptions').hide();
                         $('#errorContainer').hide();
                         $('#attemptFailure').hide();
                         $('#serviceAddress').show();
                         $('#initSavedCartMsg').show();
                         $('#savedCartMsg').hide();
                         $('#serverReponse').html("");
                         $('#changeAdreesEligibility').hide();
                         $('#saveCartOverlay').hide();
                         $('#warningSaveCart').show();
                         $('#flowType').val("macFlow");
                         $('#showphoneNumber').hide();
                         $('#warningEmptyCartMsg').hide();
                         var macOps = srcElement.attr('id');
                         $('#macOrderType').val(macOps);
                         $('#macMsg').show();
                         $('#evaluateForBTNNumber').val("true");
                     }else{
                         $('#addressOptions').hide();
                         $('#errorContainer').hide();
                         $('#attemptFailure').hide();
                         $('#serviceAddress').show();
                         $('#initSavedCartMsg').show();
                         $('#savedCartMsg').hide();
                         $('#serverReponse').html("");
                         $('#changeAdreesEligibility').show();
                         $('#saveCartOverlay').hide();
                         $('#warningSaveCart').hide();
                         $('#flowType').val("macFlow");
                         $('#warningEmptyCartMsg').hide();
                         $('#showphoneNumber').hide();
                         $('#macMsg').show();
                         $('#evaluateForBTNNumber').val("true");
                     }
                 }
         }
    	$('.macSaveCart').myplugin({
            'backDropId' : 'SeviceEligibiltyBackDrop',
            'lightBoxId' : 'SeviceEligibiltyLightBox'
        },macSaveCartHandlers);
    }init_macSaveCartOverlay();
    
    /* MIniCart Hover Function */
    miniCartHoverConfig = {
        sensitivity: 1, 
        interval: 30, 
        timeout:100, 
        over: function() {
        	showMiniCart();
        }, 
        out: function() { 
        	} 
    };

    $('a.mini_Cart').hoverIntent(miniCartHoverConfig);
    
    $('#miniCart').mouseleave(function(){
    	 $('#miniCart').hide();
    });
    
    function showMiniCart(){
    	var mEl = GlobalShadow.jMerge(document.getElementById('mini_Cart'));
    	var mElSummary = GlobalShadow.jMerge(document.getElementById('miniCart'));
    	var obj = GlobalShadow.offset(mEl);
    	var left = obj.left - mElSummary.outerWidth() + mEl.outerWidth();
    	$('#miniCart').css('left',left);
    	$('#miniCart').css('top',obj.top);
    	 $('#miniCart').show();
    	
    }
    /*function to attach SaveCart overlay */
    function init_savecartOverlay(){
        var saveCartHandlers = {
                beforeOpen : function(e){
                    $('.close',$('#miniCartLightBox')).trigger("click");
                    $('#addressOptions').hide();
                    $('#errorContainer').hide();
                    $('#serviceAddress').show();
                    $('#initSavedCartMsg').show();
                    $('#savedCartMsg').hide();
                    $('#serverReponse').html("");
                    $('#changeAdreesEligibility').hide();
                    $('#saveCartOverlay').show();
                    $('#warningSaveCart').hide();
                    $('#macMsg').hide();
                    $('#flowType').val("");
                }
            };
            $('.SaveCartButton',$('#miniCart')).myplugin({
                'backDropId'    : 'SeviceEligibiltyBackDrop',
                'lightBoxId'    : 'SeviceEligibiltyLightBox'
            },saveCartHandlers);
    }init_savecartOverlay();

    /*ajax call for marquee*/
    
    function init_loadMarquee(){
    	 currFamily = $('#clicked_sec_Family').val();
         if(currFamily != undefined){
        	 	
        	 	url='/smallbusiness/fragments/marketing_Banner.jsp?currFamily=' + currFamily;
                
                $.ajax({
                    url : url,
                    success : function(data) {
                    	if($(data).find('span.noBanner').length != 0)
                    	{
                    		$('#marqueeSection').removeClass('marqueePromo')
                    		$('#marqueeSection').empty();
                    	}else{
                    		 $('#marqueeSection').html(data);
        	                 $.getScript("/smallbusiness/javascript/marquee.js").done(function(script, textStatus) {
        	                     autoRotate('hero1');
        	                 })
        	                 .fail(function(jqxhr, settings, exception) {
        	                     //handle Error if script load fails
        	                 });  
                    	}
                    }
                });
         }
        
        
    }init_loadMarquee();
    
    
    if ($('#miniCartSummary').length > 0){
        
        //submit the form when apply config button is clicked in minicart 
        $('#miniCartApplyConfig').click(function() {
            $('#submitConfig').trigger("click");
        });
        
        $('input[type=radio]','div.configContainer').bind('click',updateMiniShoppingCart);
        $('input[type=checkbox]','div.configContainer').bind('click',updateMiniShoppingCart);
        $('input[type=text]','div.configContainer').bind('blur',updateMiniShoppingCart);
        updateMiniShoppingCart();
    }
    
    if ($('#miniCartSummary').length > 0){
        $('input[type=checkbox]',$('#localConfigContainer')).bind('click',updateMiniShoppingCart);
        updateMiniShoppingCart();
    }
    
    /*******************************************************************************************
     * Script to show zebra Table
     *******************************************************************************************/
    (function() {
        $("table tr:nth-child(even)").addClass("striped");
        if(typeof(restrictZebratbl) != "undefined"){
        	if(restrictZebratbl != true){
        		$("table[class=zebraTbl] td:odd").css('text-align','center');
        	}
        }
    })();
    
    var overlayHandlers = {
        handlesaveCartButton : function(e){
            var context = $('.ExistingSaveCartButton').data('myplugin').getContext();
            $('#existingSaveCartContainer',context).hide();
            $('#saveCartContainer',context).show();                    
        },
        beforeOpen : function(e){
             var context = $('.ExistingSaveCartButton').data('myplugin').getContext();
             $('#existingSaveCartContainer',context).show();
             $('#saveCartContainer',context).hide(); 
        }
    }
    
    $('.ExistingSaveCartButton').myplugin({
        'backDropId' : 'saveCartBackDrop',
        'lightBoxId' : 'saveCartLightBox'
    },overlayHandlers);
    
    
    //***************** Wireless 2SMB Login Link only for wireless ****************//
    $('.2SMBLoginlink').hover(
        function(){
            $('.2SMBLoginSection').show();
        },
        function(){

        }
    );
    $('.2SMBLoginSection').hover(
        function(){
            $(this).show();
        },
        function(){
            $(this).hide();
        }
    );
    
    
    if ($('.tooltip').length > 0) {
        init_tooltip();
    }
    
    if(typeof($("#compSize")) != undefined){
        var count = $("#compSize").val();
        if(count>=6){
            $("#toggleList").css('overflow','scroll');
        }
    }
    
    /**For smallbusiness search**/
    $("#searchGlassButton").click(function(){
    	 submitForm($("#question").val());
    	//$("#searchButton").trigger("click");
    });
    $("#question").autocomplete("/smallbusiness/Search/autocomplete.jsp");
    
    if ($("#question_")!= undefined)
        $("#question_").autocomplete("autocomplete.jsp");
        
        /*function to make search input box empty while click*/
    if($('#question_')!=undefined) {
        $('#question_').click(function() {
        	var defaultSearchText = "Search this site";
        	var searchTextVal = $('#question').val();
        	if(searchTextVal.indexOf(defaultSearchText) != -1){
        		 this.value = "";
        	}
        });
	}   
    
    /*******************************************************************************************
     * Telephone Number overlay
     *******************************************************************************************/ 
    function telePhoneNumber(event) 
	{ 
	// Allow: backspace, delete, tab and escape         
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||              
			(event.keyCode == 65 && event.ctrlKey === true) ||  (event.keyCode == 67 && event.ctrlKey === true)             
			 || (event.keyCode == 86 && event.ctrlKey === true) || (event.keyCode == 48 && event.shiftKey === true)
			 || (event.keyCode == 57 && event.shiftKey === true) || (event.keyCode == 109 )
			 || (event.keyCode == 32) || (event.keyCode == 110) || (event.keyCode == 189) ||(event.keyCode == 173)|| (event.keyCode == 190)
			 || (event.keyCode >= 35 && event.keyCode <= 39)) 
		{                  
		return true;         
		}         
	else 
		{             
		// Ensure that it is a number and stop the keypress             
		if (event.shiftKey ||(event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) 
			{           
			event.preventDefault();              
			} 
		}   
	}
    
    $('.telePhoneNumber').bind('keydown',telePhoneNumber);
    /*******************************************************************************************
     * Mutually Exclusive overlay
     *******************************************************************************************/ 
    if(typeof relatedProductsJson !== 'undefined' && relatedProductsJson !== null){
		var mutuallyExclusiveHandlers = {
                beforeOpen : function(srcElement){
                	var sourceElementId = srcElement.attr('id').replace("link_","");
					$('#currentProductId').val(sourceElementId);
					$('#flowTypeforCEProducts').val('');
					var pipelinedString = [];
					var cartMEProducts = relatedProductsJson[sourceElementId]['cartMEProducts'];
					var cartMEProductNames = "<ul class='linklist'>";
					for(var i=0;i<cartMEProducts.length;i++){
					cartMEProductNames= cartMEProductNames + "<li>" + cartMEProducts[i]['productDisplayName']+"</li>";
					pipelinedString.push(cartMEProducts[i]['productDisplayName']);
					}
					cartMEProductNames= cartMEProductNames + "</ul>"
					$('#cartMEProducts').html(cartMEProductNames);
					var pipString = pipelinedString.join().replace(/,/g, "|");
					
					pipString = pipString.replace('<span class=\"mark\">SM</span>',"(SM)");
					pipString = pipString.replace(new RegExp('&reg;', 'g'),"(R)");
					pipString = pipString.replace(new RegExp('&amp;', 'g'),"&");
					pipString = pipString.replace(new RegExp('&trade;', 'g'),"(TM)");

					//code Added for reporting
					var wtPN = WebMetrics.getPageName();
					dcsMultiTrack('DCSext.wtPN', wtPN + ' Overlay Mutual Exclusivity Pg',
							      'DCSext.wtB2BMultiRecConflictingSku',pipString,
							      'DCSext.wtNoHit' ,'1',
							      'DCSext.wtSuccessFlag' ,'1'
							      );
					
	                }
        } 
		$('.mutuallyExclusive').myplugin({
            'backDropId' : 'mutuallyExclusiveDropBox',
            'lightBoxId' : 'mutuallyExclusiveLightBox'
        },mutuallyExclusiveHandlers);
		for(var relatedProductInfo in relatedProductsJson){
			if(typeof relatedProductsJson[relatedProductInfo]['cartMEProducts'] !== 'undefined' && relatedProductsJson[relatedProductInfo]['cartMEProducts'] !== null){
				if(!($('#callToOrder_'+relatedProductInfo).val()=='true')){
				$('#mutuallyExclusive_'+relatedProductInfo).show(); 
				$('#AddtoCart_'+relatedProductInfo).hide();}
			}
		}
	}
    
    $('#question').bind('keypress',function (event){
		if (event.keyCode === 13){
			 submitForm($("#question").val());
			//$("#searchButton").trigger("click");	
		}
	});
    
    //Added for Reporting
    
	$('.reportingBtn').click( function(e){
		if($(this).hasClass('actionBtnCart')){
		 btnText= '_AddToCart';
		 }
		else if($(this).hasClass('actionBtnMac')){
		 btnText= '_AddToMyAccount';
		 }
		var productLink  = $(this).closest('td').find('.productDetailsLink');
			if(productLink.length > '0' ){
				var productName = productLink.html();
				productName = productName.replace('<span class=\"mark\">SM</span>',"(SM)");
				productName = productName.replace(new RegExp('&reg;', 'g'),"(R)");
				productName = productName.replace(new RegExp('&amp;', 'g'),"&");
				productName = productName.replace(new RegExp('&trade;', 'g'),"(TM)");
				productName = productName.replace(new RegExp(' ', 'g'),"");
				if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_" + productName + btnText);
				}
			}	
	});
	$('.mini_Cart').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_MiniCart_View");
				}
				
	});
	$('.SaveCartButtonReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_OverlayMiniCart_SaveCart");
				}
				
	});
	$('.ViewCartButtonReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_OverlayMiniCart_ViewCart");
				}
				
	});
	$('.shopNowReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_OverlayMiniCart_ShopNow");
				}
				
	});
	$('.locationOverlayReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.DCSext.wtLinkLoc = wtPN+"_OverlayMiniCart_Body";
					WebMetrics.dispatchReport( wtPN + "_OverlayMiniCart_ChangeLocation");
				}
				
	});
	
	$('.viewCartButton').click(function(){
		var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
		if(wtPN != undefined && wtPN!="")
			WebMetrics.dispatchReport( wtPN + "_ViewCart");
	});
	/*$('.RemoveProductCancelReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_OverlayRemoveProductFromCart_Cancel");
				}
				
	});
	$('.RemoveProductContinueReporting').click( function(e){
		if(window.WebMetrics)
				{
					var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
					WebMetrics.dispatchReport( wtPN + "_OverlayRemoveProductFromCart_Continue");
				}
				
	});*/
	
	
	$('#nestedBundleBack').click(function(e){
		e.preventDefault();
		$('#nestedBundleBackSubmit').trigger('click');
	});
	
	$('#NestedBundleCancelButton').click(function(){
		window.parent.location="/smallbusiness/bundles/config.jsp"; 
	});
	
	if($('#support_TF')!=undefined){
		if($('#isAFLBundle')!= undefined){
	    if($('#isAFLBundle').val() == 'true')
	  	  {
	    	$('#tollFreeNumber').html('1-888-533-8234');
	  	  	$('#chatHours').html('M-F, 8am-6pm Eastern');
	  	  }
	    
	}
			$('#support_TF').css('display','block');
			

	}
});

/*******************************************************************************************
 * Session time out overlay
 *******************************************************************************************/

function sessionTimeOut(){
    var idleTime = 1500000;    
    $.idleTimer(idleTime);
    var running=false;
    var timer;
    // bind to idleTimer's idle.idleTimer event
    $(document).bind("idle.idleTimer", function(){
        // if the user is idle and a countdown isn't already running
        if($.data(document,'idleTimer') === 'idle' && !running){
            var counter = "5";
            running = true;
            var $newanchor = $('<a id="sessionTimeOutLink"/>');
            $('body').append($newanchor);
            var sessionTimeOuthandlers={
                handlesessionSaveCart : function() {
                    $('#sessionTimeOutLink').hideOverlay();
                    clearInterval(timer);
                    running = false;
                    $('.SaveCartButton',$('#miniCartLightBox')).trigger("click");
                },
                handleSaveContinue : function(){
                    clearInterval(timer);
                    running = false;
                    $.ajax({
                        url : '/smallbusiness/common/fragments/keepAlive.jsp',
                        success : function(data) {
                            $('#sessionTimeOutLink').hideOverlay();  
                        }
                    });
                }
            };
            $('#sessionTimeOutLink').myplugin({
                'backDropId' : 'sessionAliveBackDrop',
                'lightBoxId' : 'sessionAliveLightBox'
            },sessionTimeOuthandlers);
            $('#sessionTimeOutLink').trigger("click");
            // intialisze timer
            $('#sessionTimeoutCountdownId').html("5");
            
            // create a timer that runs every second
            timer = setInterval(function(){
                counter -= 1;
                // if the counter is 0, reload the page
                if(counter === 0) {
                	clearInterval(timer);
                    running = false;
                    var wtPN = WebMetrics.getPageName();
                    if(wtPN != null && wtPN != '') {
	                    dcsMultiTrack(
								'DCSext.wtPN',wtPN + " CartExpired"
						);
                    }
                    $('#logoutButton').trigger("click");
                } else {
                    $('#sessionTimeoutCountdownId').html(counter);
                };
            }, 60000);
        };
    });
}sessionTimeOut();


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


CompareTable = {
		
		build: function(slotId, map) {
	 
	    	var rowDetails = {};
			
			var mapSize = Object.size(map);
			var counter = 0
			for(var productInfo in map){
				counter = counter + 1;
				for (var k in map[productInfo]['compareTable']) {
					if (map[productInfo]['compareTable'].hasOwnProperty(k)) {

						if(!rowDetails.hasOwnProperty(k)){
							rowDetails[k]="<tr><td class='td-left'>"+k+"</td>";
						}
						
						if(counter == mapSize){
							if(map[productInfo]['compareTable'][k]==null)
								rowDetails[k]=rowDetails[k]+"<td class='td-right'>&nbsp;</td>"; 
							else
							rowDetails[k]=rowDetails[k]+"<td class='td-right'>"+map[productInfo]['compareTable'][k]+"</td>";
						}else{
							if(map[productInfo]['compareTable'][k]==null)
								rowDetails[k]=rowDetails[k]+"<td class='td-center'>&nbsp;</td>"; 
							else
							rowDetails[k]=rowDetails[k]+"<td class='td-center'>"+map[productInfo]['compareTable'][k]+"</td>";
						}
						 
					}
				}
			}

			for(var m in  rowDetails){
				$('#CTABLE-' + slotId).append(rowDetails[m]+"</tr>");
			}
			/*appending view details link in */
			var viewLinkObj = $("a.DETAILS-URL-" + slotId).clone();
			var viewLinkRow = "<tr><td class='td-left'>&nbsp;</td>";
			for(tags=0;tags<viewLinkObj.length;tags++ ){
				if(tags == (viewLinkObj.length -1)){
					viewLinkRow += "<td class='td-right'><a class='view-details' href="+$(viewLinkObj[tags]).attr('href')+">View details</a></td>";
				}else{
					viewLinkRow += "<td class='td-center'><a class='view-details' href="+$(viewLinkObj[tags]).attr('href')+">View details</a></td>";
				}
			}
			$('#CTABLE-' + slotId).append(viewLinkRow+"</tr>");
			
			$('#CTABLE-' + slotId + ' tr:odd').css('background-color','#F5F5F5')
			
			$(".view-details").click(function(){
			    var productName = $("a.DETAILS-URL-" + slotId).html();
			    productName = productName.replace('<span class=\"mark\">SM</span>',"(SM)");
			    productName = productName.replace(new RegExp('&reg;', 'g'),"(R)");
			    productName = productName.replace(new RegExp('&amp;', 'g'),"&");
			    productName = productName.replace(new RegExp('&trade;', 'g'),"(TM)");
			    productName = productName.replace(/ /g, '');
			    var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
				dcsMultiTrack('DCSext.wtLinkName', wtPN + '_'+ productName + '_ViewDetails',
				'DCSext.wtLinkLoc', wtPN +'_Body',
				'DCSext.svl','4'
				);
			})
	    }
	    
	}
			
			
function getRates(){
	var selectedVal = $('#select_country').val();
	if(selectedVal != 'default')
	{
		$("#country-table tr").hide();
		/* $("#country-table tr").each(function() {
			$(this).hide();
		}); */
		$("#country-table tr:first").show();
		$("#country-table tr:nth-child(2)").show().find("th:first").html("");
		$("#country-table tr:last").show();
		var selectedCntry = $("#select_country option:selected").text();
		var rates = selectedVal.split('_');
		$("#country-table tr:last td:nth-child(1)").html(selectedCntry);
		for(rateIndex=0; rateIndex < rates.length; rateIndex++){
			$("#country-table tr:last td:nth-child("+ (rateIndex+2) +")").html("$" + rates[rateIndex]);
		}
	}else{
		$("#country-table tr").show();
		$("#country-table tr:last").hide();
	}
}