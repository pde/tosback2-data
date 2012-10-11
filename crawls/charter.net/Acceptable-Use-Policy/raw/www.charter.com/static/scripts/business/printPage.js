PrintPage = function() {

};

PrintPage.prototype = {

    printOrderComplete : function(){
    	
		var url=ctx + 'checkout/orderNormalComplete.jsp?isPrint=true';
		this.popPrintWindow(url);
    },
    printOrderAlternateComplete :function(){

    	var url = ctx + 'checkout/orderAlternateComplete.jsp?isPrint=true';
    	this.popPrintWindow(url);
    
    },
    initOrderComplete : function(){
    	
    	if($("#is_print").val()=="true"){
    		$("a[class='site-logo']").removeAttr("href");
    		$("div.save-order").css("display","none");
    		$("div.right-col").css("display","none");
    		$("div.site-header-links").css("display","none");
    		$("div.footer").css("display","none");
    		$(".help-tooltip-trigger").css("display","none");
    		$("div.buyflow-body-full").css("margin-top","10px");
			$('a[href$="javascript:window.close();"]:first').parent().css({'position': 'absolute', 'right': 5, 'top': 85, 'margin-right': 0, 'width': 75});
			$('a[href$="javascript:window.close();"]:first').append("<span id='print-close'></span>");
    		window.print();
    	}
    },
    initOrderAlternateComplete : function(){
    	
    	if($("#is_print").val()=="true"){
        	
    		$("a[class='site-logo']").removeAttr("href");
    		$("div.save-order").css("display","none");
    		$("div.right-col").css("display","none");
    		$("div.site-header-links").css("display","none");
    		$("div.footer").css("display","none");
    		$(".help-tooltip-trigger").css("display","none");
    		$("div.buyflow-body-full").css("margin-top","10px");
    		$("div.complete-options").css("display","none");
    		$("div.customer-data-alt").css("top","70px");
			$('a[href$="javascript:window.close();"]:first').parent().css({'position': 'absolute', 'right': 5, 'top': 85, 'margin-right': 0, 'width': 75});
			$('a[href$="javascript:window.close();"]:first').append("<span id='print-close'></span>");
    		window.print();
    	}
    },
    openPrintOrderReview : function(){
    	var url = ctx + 'checkout/orderReview.jsp?isPrint=true';
   		 this.popPrintWindow(url);
    }
    ,
    printOrderReview : function(){
    		$("a[class='site-logo']").removeAttr("href");
    		$("div[class='buyflow-customer-module']").hide();
    		$("div[class='save-order']").hide();
    		$("div[class='site-header-links']").hide();
    		$("div[class='review-submit']").hide();
    		$("div[class='footer']").hide();
    		$("a[class='help-tooltip-trigger support-bullet-2']").hide();
    		$("div[class='buyflow-body-full review-body rounded-10']").css("margin-top","10px");
    		$("div[class='next-prompt']").hide();
			$('a[href$="javascript:window.close();"]:first').parent().css({'position': 'absolute', 'right': 5, 'top': 85, 'margin-right': 0, 'width': 75});
			$('a[href$="javascript:window.close();"]:first').append("<span id='print-close'></span>");
    		window.print();
    }
    ,
    openPrintAgreements : function(serviceLine){
    	var url = ctx + 'checkout/agreement_print.jsp?isPrint=true&serviceLine='+serviceLine;
         this.popPrintWindow(url);
    }
    ,
    printAgreements : function(){
    	if($("#is_print").val()=="true"){
    		$("a[class='site-logo']").removeAttr("href");
    		$("div.buyflow-customer-module").css({"display":"none"});
    		$("div.site-header-links").css({"display":"none"});
    		$("div.footer").css({"display":"none"});
			$("div.agreement-box").css({"overflow-y": "visible", "height": "auto", "overflow": "visible", "background": "none"});
    		$("div[class='buyflow-body-full review-body agreement-body rounded-10']").css("margin-top","10px");
			$('a[href$="javascript:window.close();"]:first').parent().css({'position': 'absolute', 'right': 5, 'top': 85, 'margin-right': 0, 'width': 75});
			$('a[href$="javascript:window.close();"]:first').append("<span id='print-close'></span>");
    		
//    		if (BrowserDetect.browser == "Explorer")
//    			$("div").css("overflow","visible");
//    		else
//    			$("div.agreement-box").css("overflow","visible");
//    			
//    		for(var i = 0;i<($("div.agreement-box").length);i++){
//    			$("div.agreement-box").eq(i).css({"overflow-y": "visible", "height": "auto", "overflow": "visible"});
//    		}
//    		
//    		$("div.agreement-box").css("background","none");
//    		$("div[class='buyflow-body-full review-body agreement-body rounded-10']")
//    		.css("margin-top","10px");
    		
    		if (BrowserDetect.browser == "Explorer"){
    			
    			$("div[class='buyflow-body-full review-body agreement-body rounded-10']").children().eq(0).attr("style","background-image: url(http://localhost:8080/static/site/common/buyflow_fullbody_bg.gif); POSITION: absolute; border-left: #cccccc 1px solid; padding-bottom: 0px; background-color: transparent; padding-left: 0px; width: 969px; padding-right: 0px; background-repeat: repeat-x; direction: ltr; background-position: 50px "+($("div.autoPadDiv").height()-100)+"px; height: 740px; top: 10px; border-right: #cccccc 1px solid; padding-top: 0px; left: 0px;");
    			$("div[class='buyflow-body-full review-body agreement-body rounded-10']").children().eq(0).css("height",$("div.autoPadDiv").height()); 
    		}
    		window.print();
    	}
    },


   printLocations : function(){
//		//	alert("locations");
//		$('.customer-module').hide();
//		//	$('.main-nav').hide();
//		$("a[class='site-logo']").removeAttr("href");
//		$("div[class='site-header-links']").hide();
//		$("div[class='footer']").hide();
//		// THE DIRECTIONS BOXES.... NOT SURE IF WE SHOULD HIDE IT...
//		//	$('#jqm-4').hide();
//		$('a.[href$="javascript:printPage.openPrintLocations();"]').html('close').attr("href", "javascript:window.close();");
//		$('a[href$="javascript:window.close();"]:first').parent().css({'position': 'absolute', 'left': 900, 'top': -40, 'margin': 0, 'width': 65});
//		$('a[href$="javascript:window.close();"]:first').append("<span id='print-close'></span>");
//    		
//		window.print();
    },

	// LOCATIONS PRINT PAGE
    openPrintLocations : function(){

		if ( p == false ) {
			$('#print-locations a').html('Return to locations search');
			$("#jqm-9").css({'display': 'none'});
			$('#jqm-18').removeClass('bordered-t');					
			//	$(".map").css({'display': 'none'});
			$(".site-header-links").css({'display': 'none'});
			$(".main-nav").css({'display': 'none'});
			$(".site-logo").attr('href', '');
			$(".customer-module").css({'display': 'none'});	
			$(".footer").css({'display': 'none'});	
			p = true;
			window.print();
		} else {
			$('#print-locations a').html('Print');
			//	$("#jqm-4").css({'display': ''});
			$("#jqm-9").removeClass('hidden').css({'display': ''});
			$('#jqm-18').addClass('bordered-t');					
			//	$(".map").css({'display': ''});
			$(".site-header-links").css({'display': ''});
			$(".main-nav").css({'display': ''});
			$(".site-logo").attr('href', '/store/');
			$(".customer-module").css({'display': ''});						
			$(".footer").css({'display': ''});	
			p = false;
		}
    },
	
    
   popPrintWindow : function(url) {
		newwindow=window.open(url,'Charter','resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,height=600,width=1000,fullscreen=yes');
		if (window.focus){
	   		newwindow.focus()
	  	 }
		return false;
	}
}

var p = false;


var printPage = new PrintPage();