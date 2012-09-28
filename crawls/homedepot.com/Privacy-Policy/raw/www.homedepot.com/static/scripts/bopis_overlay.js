var persistanValue="";
//Added this function to set variables for Omniture tracking
function callOmniture(productId){
	var locStoreZip = readCookie("THD_STRFINDERZIP");
	sendCheckInventory(productId,locStoreZip);
   	sendPageView('Check Inventory>Product Availability','Check Inventory','Check Inventory>Availability');
}
//Validate zip code
function zipCodeValidator(zip) {
	var re5digit = /^\d{5}$/;
	if ( (zip.length == 5) && (re5digit.test(zip)) ) {
			return true;
	}
	return false;
}

function validate(invQty,reqQty,chkBox, i) {
	var ele1 = document.getElementById("bopis_error1");
	var ele3 = document.getElementById("bopis_error3");
	var ele4 = document.getElementById("bopis_error4");

	if(chkBox.checked!=null && chkBox.checked==true){
		if(reqQty.value=="" || reqQty.value==null || reqQty==null){
			chkBox.checked = false;
			ele4.style.display = "block";
			ele1.style.display = "none";
			ele3.style.display = "none";
			document.getElementById('quant_'+i).value=""
			//send error message to omniture
			var errorMsg = document.getElementById("bopis_error4").innerHTML;
			sendError(errorMsg);
		}else {
			if(isNaN(reqQty.value) || reqQty.value<=0){
				chkBox.checked = false;
				ele3.style.display = "block";
				ele1.style.display = "none";
				ele4.style.display = "none";
				document.getElementById('quant_'+i).value = "";
				//send error message to omniture
			var errorMsg = document.getElementById("bopis_error3").innerHTML;
			sendError(errorMsg);
			}else{
				if(reqQty.value > invQty){
					chkBox.checked = false;
					ele4.style.display = "none";
					ele3.style.display = "none";
					ele1.style.display = "block";
					document.getElementById('quant_'+i).value = "";
					//send error message to omniture
					var errorMsg = document.getElementById("bopis_error1").innerHTML;
					sendError(errorMsg);
				}else {
					ele1.style.display = "none";
					ele3.style.display = "none";
					ele4.style.display = "none";
				}
			}
		}
	}
	if(chkBox.checked!=null && !chkBox.checked){
		if($('#bopis_multi_store').is(':visible')){
			var cookieVal=persistanValue;
				if(cookieVal!= null&& cookieVal!=''&&cookieVal!='null'){	
					var	cookieValArr=cookieVal.split('&quanity_'+chkBox.name.split("_")[1]+"=");
					cookieValArr=cookieValArr[1].split("&");
					var deleteString = '&quanity_'+chkBox.name.split("_")[1]+"="+cookieValArr[0];
					cookieVal= cookieVal.replace(deleteString,"");
					persistanValue=cookieVal;
				}		
		}
	}	
}


function addToCart(availQty, reqQty, strId, type) {
	var formId = "singleStore_";
	formId = formId.concat(strId);
	var ele1 = document.getElementById("bopis_error5");
	var singleForm = document.getElementById(formId);
	var errorMsg = document.getElementById("bopis_error5").innerHTML;
	if(reqQty > availQty ){
		ele1.style.display = "block";
		//send error message to omniture
		sendError(errorMsg);		
		return false;
	} else {
		var url = "URL_";
		
		url = url.concat(strId);
		
		ele1.style.display = "none";
		if(type=="add_to_cart"){
			singleForm.action ="/webapp/wcs/stores/servlet/OrderItemAdd";
		} else{
			if(type=="pick_up_from_store_popage"){
				document.getElementById(url).value = "PickUpOptions";
			}
			singleForm.action="/webapp/wcs/stores/servlet/OrderItemUpdate";
		}
        singleForm.submit();       
	}
	return false;
}

function addMultiStore(size, catEntId, type, orderItemId, prevStoreNbr) {
	var flag = false;
	var ele4 = document.getElementById("bopis_error4");
	var multiForm = document.getElementById('multiStore');
	var errorMsg = document.getElementById("bopis_error4").innerHTML;
	//Orig storenbr has suffix of 1 to set its quantity to 0 in OrderItemUpdate
	var k = 2;
	setUrl();
	var cookieVal=persistanValue;	
	var storeArray=cookieVal.split('&quanity_');
	
	for(var i=1;i<=storeArray.length-1;i++){
		// WCS7Up CodeMerge 4.5.2 STARTS
		var storeNQty = storeArray[i].split('=');
		// WCS7Up CodeMerge 4.5.2 ENDS
		flag=true;
			
		var qtyField = document.createElement("input");
		qtyField.setAttribute("type","hidden");
		qtyField.setAttribute("value",storeNQty[1]);
		qtyField.setAttribute("id","quantity_"+k);
		qtyField.setAttribute("name","quantity_"+k);
		document.getElementById('multiStore').appendChild(qtyField);
			
		var strField = document.createElement("input");
		strField.setAttribute("type","hidden");
		strField.setAttribute("value",storeNQty[0]);
		strField.setAttribute("id","str_nbr_"+k);
		strField.setAttribute("name","str_nbr_"+k);
		document.getElementById('multiStore').appendChild(strField);
						
		var catEntField = document.createElement("input");
		catEntField.setAttribute("type","hidden");
		catEntField.setAttribute("value",catEntId);
		catEntField.setAttribute("id","catEntryId_"+k);
		catEntField.setAttribute("name","catEntryId_"+k);
		document.getElementById('multiStore').appendChild(catEntField);
		
		k = k + 1;
	}

	var qtyBoxWithZero = $('input.quantity_box').filter(function() { return this.value == "0"; });
	
	qtyBoxWithZero.each(function() {
		$(this).parents('div').parents('div').find('p').children('span:nth-child(7n)').css('display','block');
		flag = false;
	});
	
	if(flag==true) {
		var urlField = document.createElement("input");
		urlField.setAttribute("type","hidden");
		if(type != 'pick_up_from_store_popage'){
			urlField.setAttribute("value","OrderItemDisplay");
		}else{
			urlField.setAttribute("value","PickUpOptions");
		}
		urlField.setAttribute("id","URL");
		urlField.setAttribute("name","URL");
		document.getElementById('multiStore').appendChild(urlField);
		
		ele4.style.display = "none";
		if(type=="add_to_cart"){
			multiForm.action="/webapp/wcs/stores/servlet/OrderItemAdd";
		}else {
			multiForm.action="/webapp/wcs/stores/servlet/OrderItemUpdate";
		}
		persistanValue="";
		multiForm.submit();
	}else{
		//ele4.style.display = "block";
		//send error message to omniture
		sendError(errorMsg);		
		return false;
	}
}

function closeBopis2Overlay() {
	$('#bopis2').css({'display':'none'});
	persistanValue="";
	parent.jQuery.fancybox.close();
}



function onlyNumbers(e){
		
	if (window.event){
	   key = window.event.keyCode;
	 }else{
	   key = e.which
	  }
	if (key == 13){
	   $('#zipCodeFind').click();
   		return false;	
   	}
	if (key > 31 && (key < 48 || key > 57)){
		return false;
	}
	return true;
}

function setUrl() {
	var add2CUrl=persistanValue;
	if(add2CUrl== null ||add2CUrl=='' || add2CUrl=='null' || add2CUrl=='&'){
		add2CUrl='';
	}
	
	for(i=0;i<$("#bopis_multi_store #multiStorePrimer input[type='checkbox']").size();i++){
			
		if($("#bopis_multi_store #multiStorePrimer input[type='checkbox']")[i].checked){
		    var id=$("#bopis_multi_store #multiStorePrimer input[type='text']")[i].id;
		    id=id.split("_");
		    var x= id[1];
		    var quanity=$("#bopis_multi_store #multiStorePrimer input[type='text']")[i].value;
		    var storeNumber=$('#str_'+x).val();
		    if(add2CUrl.indexOf(storeNumber)!=-1){		    
		    	var deleteString = '&quanity_'+storeNumber+"=";
		    	var qtArray=add2CUrl.split(deleteString);
		    	deleteString= deleteString + qtArray[1].split('&')[0];
		    	add2CUrl= add2CUrl.replace(deleteString,"");			    
			}    
			  	add2CUrl=add2CUrl+"&quanity_"+storeNumber+"="+quanity;//+"&contractId_"+storeNumber+"="+contractId;
		}
	}
		if(add2CUrl!= null&& add2CUrl!=''&&add2CUrl!='null'){
			persistanValue=add2CUrl;
		}
}
	
	
function deleteCookie(name,path,domain){
	if (readCookieByName(name)){ 
		document.cookie = name + "=" +( ( path ) ? ";path=" + path : "") +( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}
function readCookieByName(name) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0,name.length))){
		return '';
	}
	if(start == -1){
	 return '';
	}
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ){
		end = document.cookie.length;
	}
	return unescape( document.cookie.substring( len, end ) );
}

function populatePageState(){

	$('#bopis_multi_store .quantity_box').val('');
	var cookieVal=persistanValue;	
	var idQty="";
	for(i=0;i<$("#bopis_multi_store #multiStorePrimer input[type='checkbox']").size();i++){
			
		var name= $("#bopis_multi_store #multiStorePrimer input[type='checkbox']")[i].name;
		name=name.split("_");
		var x=name[1];
		if(cookieVal.indexOf(x)!=-1){
			var qtyVal=cookieVal.split("quanity_"+x+"=");
				if(qtyVal.length>1){
					qtyVal=qtyVal[1].split("&");
					idQty="quant_"+$("#bopis_multi_store #multiStorePrimer input[type='checkbox']")[i].id.split("ID_")[1];
					$("#bopis_multi_store #"+idQty).val(qtyVal[0]);
					$("#bopis_multi_store #multiStorePrimer input[type='checkbox']")[i].checked=true;
				}
			}			
		}
}	

function invokeZipCodeSearch(overlayURL, searchSessionId, searchOriginId){
	$('#zipCodeFind').show();
	$('#label_zip_range').show();
	var url = overlayURL+'&locStoreNum='+$('#tb_zipcode').val()+'&searchSessionId='+searchSessionId+'&searchOriginId='+searchOriginId;
	if($('#tb_zipcode').val()=="" || $('#tb_zipcode').val()==null){
		$('#zipCodeFind').hide();
		$('#label_zip_range').hide();
	}else{
		$('#zipCodeFind').attr('href',url);	
	}
}
//Start - WCS7UP - Code Merge_Apr20
/*function evaluateInventory(val,inventoryQty,object){
    
     var ele1 = document.getElementById("bopis_error1");
     var ele3 = document.getElementById("bopis_error3");
     var ele4 = document.getElementById("bopis_error4");
     ele4.style.display = "none";
     ele3.style.display = "none";
     ele1.style.display = "none";
     if(eval(inventoryQty)< eval(val)){            
          ele1.style.display = "block";
          var errorMsg = document.getElementById("bopis_error1").innerHTML;
          sendError(errorMsg);
          object.value=eval(inventoryQty);        
      }
        
	 var idx= object.id.split("_");
	 var chkboxObj=$('#str_chk_box_ID_'+idx[1]);
	  
	  if(val == null || val == 'undefined'|| val==''){	
			chkboxObj.attr('checked',false);
		}else if(!chkboxObj.attr('checked')){
			chkboxObj.attr('checked',true);
	  }
}*/

function evaluateInventory(val,inventoryQty,object){
    
     var ele1 = document.getElementById("bopis_error1");
     var ele3 = document.getElementById("bopis_error3");
     var ele4 = document.getElementById("bopis_error4");
     ele4.style.display = "none";
     ele3.style.display = "none";

     if(eval(inventoryQty)< eval(val)){            
          ele1.style.display = "block";
          var errorMsg = document.getElementById("bopis_error1").innerHTML;
          sendError(errorMsg);
          setTimeout(function(){assignValue(inventoryQty,object)}, 100);     
      }else{
		ele1.style.display = "none";
		}
        
    var idx= object.id.split("_");
    var chkboxObj=$('#str_chk_box_ID_'+idx[1]);
	
	/*Modified on:8/9/2012, Modified by:Prabha, Description:added an extra condition to Uncheck the check box when the quantity is <1*/
    
	//var qtyBoxId = quant_5
	
	if(val == null || val == 'undefined'|| val=='' || val<1){    
    	chkboxObj.attr('checked',false);
		//$(this).closest('p').children('span.invalid_qty').css('display','inline-block');
		//ele1.style.display = "block";
   }else if(!chkboxObj.attr('checked')){
   		chkboxObj.attr('checked',true);
   }
}
//End - WCS7UP - Code Merge_Apr20
	
function showMultiStore(){
	$('#bopis2 .bopis_store.double').addClass('single').removeClass('double');
	$('#bopis_one_store').hide();
	$('#bopis_multi_store').show();
	$('.multistore_toggle_bop').text("Don't Split the Order");
	var urlPrev = document.getElementById('prev-link').value+"&multiStoreSel=true";
	var urlNext = document.getElementById('next-link').value+"&multiStoreSel=true";
	$('#nextLink').attr('href',urlNext);
	if($('#prevLink').length>0){
		$('#prevLink').attr('href',urlPrev);
	}
	if(jQuery.fancybox){
		 jQuery.fancybox.resize();
	}
}

function showSingleStore(){
	$('#bopis2 .bopis_store.double').addClass('single').removeClass('double');
	$('#bopis_multi_store').hide();
	$('#bopis_one_store').show();
	$('.multistore_toggle_bop').text("Split this order among multiple stores");
	var urlPrev = document.getElementById('prev-link').value+"&multiStoreSel=false";
	var urlNext = document.getElementById('next-link').value+"&multiStoreSel=false";
	$('#nextLink').attr('href',urlNext);
	if($('#prevLink').length>0){
		$('#prevLink').attr('href',urlPrev);
	}
	if(jQuery.fancybox){
		 jQuery.fancybox.resize();
	}
}

//Start - WCS7UP - Code Merge_Apr20
function assignValue(inventoryQty,object){
	object.value=eval(inventoryQty); 
}
//End - WCS7UP - Code Merge_Apr20