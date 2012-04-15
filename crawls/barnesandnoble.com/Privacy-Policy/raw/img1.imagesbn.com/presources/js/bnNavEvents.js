$(document).ready(function(){
 	
		var doJsonRequest = (function(){
		    var uniqueifier = 0;
		    return  function(url,params,callbackFN){
		        var myFNId = 'jsonp'+(new Date().getTime())+uniqueifier++;
		        // console.log(myFNId);
		        window[myFNId]=function(response){
		            callbackFN(response);
		        //    delete window[myFNId];  // failing in IE
		        };
		        params.callbackfunc = myFNId;
		        $.get(url,params,function(){},'jsonp'); 
		    };
		})(); 
		
 	
/****  Visual cart update for persistent cart ***  Temporarily disabled
		if($('#vcResponse').length ) {	
			$.get('http://cart4.barnesandnoble.com/services/service.aspx',{stage:'vcart',outformat:1},function(){
				$('#vcResponse').html(result.html);},'jsonp'); 
		};
*/		

	/****  quicksearch styling for 2011 redesign ****/
		if($('.bn-search-input-div-effect').length ) {		
			$('#search-input').focus(function() {
			    $('.bn-search-input-div-effect').addClass("show");
			});
			$('#search-input').blur(function() {
			    $('.bn-search-input-div-effect').removeClass("show");
			});			
			/*** input focus on all except account signin***/
			if($('#accountPage-signIn').length < 1 ) {	
				$('#search-input').focus();
			}; 			
		} 
	/****  header promo message rotator ***
		if($('.bn-global-header-ext-promo-text').length ) {
			var obj = $('.bn-global-header-ext-promo-text');
	      	var list = obj.children();
		//	list.not(':first').hide();		
	        list.not(':first').css('display', 'none'); 
		  
	    	setInterval(function(){	        
	        	list = obj.children();			
		        list.removeClass('hide');
							
	    	    var first_li = list.eq(0)
	        	var second_li = list.eq(1) 

				first_li.css('display', 'none'); 
				second_li.css('display', 'block');
				first_li.remove().appendTo(obj);

		      }, 9000);			  
		};
	*/	
	if($('.bn-global-header-ext-promo-text').length) {
		var obj = $('.bn-global-header-ext-promo-text').hover(function () {	        
				mouseEnter = true;
		    }, function () {
		        mouseEnter = false;
		    }),   
			list = obj.children(),   
			interval,
			mouseEnter = false, 		
	        interval_function = function () {
				if(mouseEnter === true){
					return false;
				}
				list = obj.children();			
		        list.removeClass('hide');
							
	    	    var first_li = list.eq(0);
	        	var second_li = list.eq(1);

				first_li.css('display', 'none'); 
				second_li.css('display', 'block');
				first_li.remove().appendTo(obj);
								
	        };
			
	    list.not(':first').css('display', 'none'); 	
	
	    interval = setInterval(interval_function, 8000); 			
	};		

	

 /*** revised hdrpromo, allow random display of starting message - gs 7-13-2011 ***/
	if($('#bn-global-header-cds-promo-text .cdsHdrPromo').length > 1) {      
		var promoStartPosition;
		// TEST if ul contains class (CDS podhint value) of "random" to determine starting message to display
		if ($('#bn-global-header-cds-promo-text.random').length > 0) {
			promoStartPosition=Math.floor(Math.random() * $('.cdsHdrPromo').length);
		} else {
			promoStartPosition=0;
		};
	// console.log (promoStartPosition + "start pos");
	// console.log ($('#bn-global-header-cds-promo-text.random').length);
		$('.cdsHdrPromo:eq('+promoStartPosition+')').addClass('current').css('display', 'block'); //.fadeIn(1000);	
		var promoObj = $('.cdsHdrPromo').hover(function () {	        
				mouseEnter = true;
		    }, function () {
		        mouseEnter = false;
		    }),     		    
			ulList = promoObj.children(),  
			cdsHdrPromoIntrvl,
			mouseEnter = false, 		
	        cdsHdrPromoInterval_function = function () {
				if(mouseEnter === true){
					return false;
				}					
				var current = $('#bn-global-header-cds-promo-text > .current');
				if(current.next().length == 0)
				{
					current.removeClass('current').css('display', 'none'); //fadeOut(1000);
					$('.cdsHdrPromo:first').addClass('current').css('display', 'block'); //.fadeIn(1000);
				}
				else
				{
					current.removeClass('current').css('display', 'none'); //fadeOut(1000);
					current.next().addClass('current').css('display', 'block'); //.fadeIn(1000);
				}								
	        };    
			
		cdsHdrPromoIntrvl = setInterval(cdsHdrPromoInterval_function, 8000); 			    					
	}
	else if($('#bn-global-header-cds-promo-text .cdsHdrPromo').length === 1) { 
		$('.cdsHdrPromo').addClass('current').css('display', 'block');
	};
	

	// adjust quicksearch to use Flite, 
	if($('#quick-search-button').length && $('input[name=keyword]').length) {		
		$('form#qs').submit(function(){quickSearchToFlite();});		
	} else {
		$('form#secureqs').submit(function(){quickSearchInputValue();});
	};	
	quickSearchToFlite = function () {		
		quickSearchInputValue();		
		var submitval = encodeURIComponent($.trim($('#search-input').val()).replace(/[\W]/g,"-"));					
		var actionval = location.protocol + "//www.barnesandnoble.com/s/"+submitval;
		var qsF = $('form#qs');			
			$('select.search-select').attr('name', 'store');	
			qsF.attr('action', actionval);		
			qsF.attr('method', 'get');				
			qsF.find("input[name=pos]").remove();
			qsF.find("input[name=box]").remove();  	
			qsF.find("input[name=page]").remove();
			qsF.find("input[name=prod]").remove();	
       };	   
	   	quickSearchInputValue = function () {		
			var qsTermVal;
			var qsPlaceholder = $('#search-input').attr('placeholder');
			var qsTerm = $.trim($('#search-input').val());
			qsTerm !== qsPlaceholder ? qsTermVal = qsTerm : qsTermVal = '';		
			$('#search-input').val(qsTermVal);
		};
			
 		//new quicksearch icon (magnifier) needs to submit form
		if($('.bn-globalnav-search-icon').length) {		
			if($('input[name=keyword]').length) {		
				$('.bn-globalnav-search-icon').click(function() {	
					quickSearchToFlite();
					$('form#qs').submit();		
				});
			}else{
				$('.bn-globalnav-search-icon').click(function() {	
					$('form#secureqs').submit();		
				});				  
			};  
		};  
 
		// page doctype detection 
		function bndetectDoctype()
		{
			var re = /DTD\s+(X?HTML)\s*([\d\.]+)\s*([^\/]+)*\/.*[html4|DTD]*\/(.*\.dtd)/gi; 
			var re5 = /DOCTYPE\s+(HTML)/gi;
			var re6 = /CTYPE/gi;
			var res = false;
			var res5 = false;
			var res6 = false;
			/*********************************************
			Just check for internet explorer.
			**********************************************/
			if ( typeof document.namespaces != "undefined" )
			{
				res = document.all[0].nodeType==8 ? re.test(document.all[0].nodeValue) : false;
				if ( !res ) { res5 = document.all[0].nodeType==8 ? re5.test(document.all[0].nodeValue) : false; 
				res6 = document.all[0].nodeType==8 ? re6.test(document.all[0].nodeValue) : false; }
			}
			else
			{
				res = document.doctype != null ? re.test(document.doctype.publicId) : false;
				if ( !res ) { res5 = document.doctype != null ? re5.test(document.doctype.publicId) : false; 
				res6 = document.all[0].nodeType==8 ? re6.test(document.all[0].nodeValue) : false; }
			}
			if( res )
			{
				res=new Object();
				res['html']=RegExp.$1;	
				res['version']=RegExp.$2;
				res['importance']=RegExp.$3;
				res['file']=RegExp.$4;
				return res;
			}
			else if ( res5 )
			{
				res=new Object();
				res['html']=RegExp.$1;
				return res;
			}
			else if ( res6 )
			{
				res=new Object();
				res['html']=RegExp.$1;
				return res;
			}
	        // IE9 failed above *** 
	        else if (document.compatMode == "CSS1Compat") {
	            return true;
	        }
			else { return null; }
			
		}
		
		/*
		var myversionInfo=bndetectDoctype();
		if(myversionInfo != null){
			alert(myversionInfo.xhtml);
			alert(myversionInfo.version);
			alert(myversionInfo.importance);
		} else {
			alert("There is no DOCTYPE in the code!");
		} 
		*/

   		// to prevent horrible experience in case there are still pages missing doctype
		if (navigator.userAgent.indexOf('MSIE') != -1) {    
		   var doesDoctypeExist=bndetectDoctype();
			if(doesDoctypeExist == null){	
				$('body').addClass("nodoctype");			
			} 
		}    
		
 
	
  
		
		
});	
 
  