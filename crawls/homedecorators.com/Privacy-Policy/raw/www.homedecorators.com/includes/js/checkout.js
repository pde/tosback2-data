$(document).ready(function(){
	$(".checkoutNow").overlay({ mask:{ color: '#cccccc' }, top:'center', fixed:false});
	
	$(".editBillTo, .editShipTo").overlay({ target:'#checkoutOverlay', mask:{ color: '#cccccc' }, fixed:false,
		onBeforeLoad: function(){
			 var wrap = this.getOverlay().find(".overlayContent");
       wrap.load(this.getTrigger().attr("href"));
			 
		}
		
	});
	
	$("#billToSubmit, #shipToSubmit").live("click", ajaxCustomerForm );
	
	$("#guestButton").click(function(){
		$("#nextPage").val("1");
		$("#cartForm").submit();
	});
	
	$("#loginButton").click( ajaxLoginForm );
	$("#loginForm").submit( ajaxLoginForm );
	
	$("#saveCustomer").click( function(){
		$("#nextPage").val("0");
		$("#customerInformationForm").submit();
	});
	
	$("#shipSame").click( function(){
		$("#SHprefixId").val($("#prefixId").val())
		$("#SHname").val( $("#name").val() );
		$("#SHcompanyName").val( $("#companyName").val() );
		$("#SHstreetAddress").val( $("#streetAddress").val() );
		$("#SHapt").val( $("#apt").val() );
		$("#SHzip").val( $("#zip").val() );
		$("#SHcity").val( $("#city").val() );
		$("#SHstate").val( $("#state").val() );
		$("#SHphoneNumber").val( $("#phoneNumber").val() );
	});

	$('#sameAddressTrigger').click(function() {
		var $theTable = $('#shippingAddressTable');
		if ($(this).is(':checked')) {
			$("#SHprefixId").val('NONE')
			$("#SHname").val('');
			$("#SHcompanyName").val('');
			$("#SHstreetAddress").val('');
			$("#SHapt").val('');
			$("#SHzip").val('');
			$("#SHcity").val('');
			$("#SHstate").val('');
			$("#SHphoneNumber").val('');
			
			var $theCon=$('#shippingTableContainer'),
			    theHeight = $theCon.outerHeight(true),
			    theWidth = $theCon.outerWidth(1);
			
			$('#shippingTableHider').width(theWidth).height(theHeight).show();
			//$('#shippingTableHiderText').show();
		} else {
			$('#shippingTableHider').hide();
			//$('#shippingTableHiderText').hide();
		}
	})
	
	$('#customerInformationForm').submit(function(){
		if ($('#sameAddressTrigger').is(':checked')) {
			$("#SHprefixId").val($("#prefixId").val())
			$("#SHname").val( $("#name").val() );
			$("#SHcompanyName").val( $("#companyName").val() );
			$("#SHstreetAddress").val( $("#streetAddress").val() );
			$("#SHapt").val( $("#apt").val() );
			$("#SHzip").val( $("#zip").val() );
			$("#SHcity").val( $("#city").val() );
			$("#SHstate").val( $("#state").val() );
			$("#SHphoneNumber").val( $("#phoneNumber").val() );
		}
	});
	
	$("#zip").live("change", function(){
		$.get('/zip2.php?zip='+$("#zip").val(), function(data){
  			dataArray = data.split("\n");
				$("#city").val( dataArray[0] );
				$("#state").val( dataArray[1] );
			});
	});
	$("#SHzip").change( function(){
		$.get('/zip2.php?zip='+$("#SHzip").val(), function(data){
  			dataArray = data.split("\n");
				$("#SHcity").val( dataArray[0] );
				$("#SHstate").val( dataArray[1] );
			});
	});
	
	// Add Fancy ShipTo Drop Downs
	var $fancyST = $('.shipToFancySelect');
	if ($fancyST.length>0) { // Only work if you find the shipTos
		$fancyST.find('option').each(function(){
			$this = $(this);
			$this.text($this.data('address'));
		});
		$fancyST.select2({
			formatResult: function(theOpt){
				var d=theOpt.text.split('|'),
				    output='';
				output = d[1]+'<br />'+d[2]+' '+d[3]+'<br />'+d[4]+', '+d[5]+' '+d[6];
				if (d[0]) {
					output = d[0]+' '+output;
				}
				return output;
			},
			formatSelection: function(theOpt) {
				var d=theOpt.text.split('|'),
				    output='';
				output = d[1];
				if (d[0]) {
					output = d[0]+' '+output;
				}
				return output;
			}
		});
	}

	

	// Only do this next part if the customerInformationForm exists.
	var $custForm = $('#customerInformationForm');
	
		var fvIcons={
			good:'/images/media2/icons/16x16_check.gif',
			bad:'/images/media2/icons/16x16_X.gif',
			clear:'/images/media2/clear.gif'
		};
		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"\/]+(\.[^<>()[\]\\.,;:\s@\"\/]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var $chEmails = $('.fvEmail',$custForm);
		$chEmails.blur(function (){
			var $this = $(this),
			theText = $this.val(),
			$reporter = $this.parent().find('img.fvRes'),
			$errorTextHolder = $this.parent().find('p.nowPrice'),
			showErr = false;
			
			if ($reporter.length==0) { $reporter = $('<img src="'+fvIcons.clear+'" class="fvRes" />').insertAfter($this); }
			if ($errorTextHolder.length==0) { $errorTextHolder = $('<p class="nowPrice"></p>').insertAfter($reporter); }
			
			if (theText) {
				if (!emailRegex.test($this.val())) {
					$reporter[0].src=fvIcons.bad;
					$errorTextHolder.text('The email address you entered is not valid. Please verify and re-enter your email address.');
				} else {
					
					// Trip the good
					$reporter[0].src=fvIcons.good;
					$this.parent().find('p.nowPrice').text('');
					
					// Now check the matches
					if ($this.attr('id')=='emailAddress2') {
						var $theOther = $('#emailAddress1'),
						$theErrorMsgHolder = $errorTextHolder,
						$theErrorImg = $reporter,
						$confirmE = $this;
					} else {
						var $theOther = $('#emailAddress2'),
						$theErrorMsgHolder = $theOther.parent().find('p.nowPrice'),
						$theErrorImg = $theOther.parent().find('img.fvRes');
						if ($theErrorImg.length==0) { $theErrorImg = $('<img src="'+fvIcons.clear+'" class="fvRes" />').insertAfter($theOther); }
						$confirmE = $theOther;
					}
					var theOtherText = $theOther.val();
					if (theOtherText && (theText != theOtherText)) {
						$theErrorMsgHolder.text('Does not match. Please try again.');
						$theErrorImg[0].src=fvIcons.bad;
					}
					
				}
			} else {
				$reporter[0].src=fvIcons.clear;
				$errorTextHolder.text('');
			}
		});
		
		$('.fvPhone').live('blur',function (){
			var $this = $(this),
			theText = $this.val(),
			$theErrorMsgHolder = $this.parent().find('p.nowPrice'),
			$theErrorImg = $this.parent().find('img.fvRes');
			if ($theErrorImg.length==0) { $theErrorImg = $('<img src="'+fvIcons.clear+'" class="fvRes" />').insertAfter($this); };
			if (theText) {
				// strip everything BUT the numbers
				theText = theText.replace(/[^0-9]/g, '');
				if (theText.length<10 || theText.match(/^0|^1/)) {
					$theErrorImg[0].src=fvIcons.bad;
					$theErrorMsgHolder.text('Please enter a 10 digit phone number.');
				} else {
					$theErrorImg[0].src=fvIcons.clear;
					$theErrorMsgHolder.text('');
				}
			}
		});
		
		$('#newPassword1').blur(function(){
			var $this = $(this), 
			$reporter = $(this).parent().find('img.fvRes'),
			theText = $this.val();
			if ($reporter.length==0) { $reporter = $('<img src="'+fvIcons.clear+'" class="fvRes" />').insertAfter($this); }			
			
			if (theText && theText.length<6) {
				$reporter[0].src=fvIcons.bad;
			} else {
				$reporter[0].src=fvIcons.clear;
				$otherPW = $('#newPassword2');
				if ($otherPW.val() != '') {
					$otherPW.focus();
					$otherPW.blur();
				}
			}
		});
		
		$('#newPassword2').blur(function(){
			var $this = $(this), 
			$reporter = $(this).parent().find('img.fvRes'),
			$theErrorMsgHolder = $this.parent().find('p.nowPrice'),
			theText = $this.val();
			if ($reporter.length==0) { $reporter = $('<img src="'+fvIcons.clear+'" class="fvRes" />').insertAfter($this); }			
			
			otherText = $('#newPassword1').val();
			if (theText) {
				if (theText != otherText) {
					$theErrorMsgHolder.text('Does not match. Please try again.');
					$this.val('');
					$reporter[0].src=fvIcons.bad;
				} else {
					$theErrorMsgHolder.text('');
					$reporter[0].src=fvIcons.good;
				}
			} else {
				$theErrorMsgHolder.text('');
				$reporter[0].src=fvIcons.clear;
			}
		});
		
	
	$('#cartBtnRemAll').click(function(e){
		if (!confirm('Are you sure you want to remove all items for your Shopping Cart?')) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		} else {
			return true;
		}
	});
	
	// Payment Cancel Buttons
	$('.gcCanceler, .ccCanceler').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this),
		    theSelId = '';
		if ($this.hasClass('ccCanceler')) {
			theSelId = 'CCpaymentTypeId';
		} else {
			theSelId = 'GCpaymentTypeId';
		}
		prepPaymentFormFor('stopPayment', document.getElementById('paymentForm'));
		prepPaymentFormFor('droptopayment', document.getElementById('paymentForm'));
		$('#'+theSelId).val('').change();
		return false;
	});
	
	$('.closeOverlay').live('click',function (){
		$(this).parents('.overlay').find('a.close').trigger('click');
		return false;
	})
	
	$('.continueShoppingTrigger').on('mouseenter',function(){
			$('#continueShoppingPayload').show();
		}).on('mouseleave',function(){
			$('#continueShoppingPayload').hide();
		});
	
	$('.toggleSecondCard').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		
		if (window.secCardCache == undefined) {
			secCardCache = {};
			secCardCache.mainTrigger = $('#showSecondCardTrigger');
			secCardCache.target = $('#secondCreditCard');
			secCardCache.amountsInput = $('.writeableAmount');
			secCardCache.amountsRO = $('.readOnlyAmount');
			secCardCache.cardSelects = $('.cardPicker');
			
		}

		if (secCardCache.target.is(':visible')) {
			// Hiding the second card.
			// Reset it's value to blanks, revert the 1st card's amount, display RO amount, show main trigger
			secCardCache.mainTrigger.removeClass('hideMe');
			secCardCache.amountsInput.eq(0).hide().val(MULTICARD_ORDER_TOTAL);
			secCardCache.amountsRO.show();
			secCardCache.cardSelects.eq(1).val("");
			newCCChange(secCardCache.cardSelects[1]);
			secCardCache.amountsInput.eq(1).val("0.00");
		} else {
			// Showing Second Card
			// Turn 1st card's amount into editable text, hide main trigger
			secCardCache.mainTrigger.addClass('hideMe');
			secCardCache.amountsRO.hide();
			secCardCache.amountsInput.eq(0).show();
		}
		secCardCache.target.toggle();
	});
	
	$('#shipToDeleteForm').submit(function(e){
		var areChecked = $('.shipToDeleteValues:checked').length;
		if (areChecked) {
			return confirm('Are you sure you want to delete the checked address(es)?');
		} else {
			return false;
		}
	});
	
	$('#shipToDeleteTrigger').click(function(e){
		e.preventDefault();
		$('#shipToDeleteForm').submit();
	});
	
	$('.shipToDeleteValues').click(function(){
		updateShipToIdCounter();
	});
	
	
});  // DOC READY

ajaxLoginForm = function(){
		formElement = $("#loginForm");
		url = formElement.attr('action');
		$.post( url, formElement.serialize(), function(data){
			var results = jQuery.parseJSON( data );
			if( results.status == "error" ){
				$("#loginErrors").html(results.message);
			}
			else{
				$("#nextPage").val("2");
				$("#cartForm").submit();
			}
		});
		
		return false;
	};
	
ajaxCustomerForm = function(){
		formElement = $("#customerInformationForm");
		url = formElement.attr('action');
		$.post( url, formElement.serialize(), function(data){
			formElement.find('p.nowPrice').text('');
			var results = jQuery.parseJSON( data );
			if( results.status == "error" ){
				$.each(results.errors, function(key, value) {
					if (key=='csrf') {
						formElement.html('<p class="nowPrice">'+value+'</p>');
						return false; // breaks out of the $.each();
					}
					var $theEle = $("#"+key),
					errorHolder = $theEle.parent().find('p.nowPrice');
					if (errorHolder.length==0) {
						errorHolder = $('<p class="nowPrice"></p>').insertAfter($theEle);
					}
					errorHolder.text(value);
				});
			}
			else{
				window.location.reload();
			}
		});
		
		return false;
	};

//checks to make sure customer wanted to put 0 for an item quantity
//submits form or focuses on the item quantity
	function updateCart(field, forceUpdate){
		focusedForm=field.form;
		
		// Only execute this if the paymentpage is present
		if ($("#paymentForm").length>0) {
			prepPaymentFormFor('stopPayment', focusedForm);
		}
		
		if (forceUpdate == true) {
			focusedForm.submit();
			return;
		}
		if(field.value == "0"){
			if(confirmItemRemoval()){
				focusedForm.submit();
			}
			else{
				field.focus();
			}
		}
		else{
			focusedForm.submit();
		}
	}//end updateCart()

function removeLineItem(field) {
	if (confirmItemRemoval()) {
		field.value = 0;
		updateCart(field,true);
	}
}

function confirmItemRemoval() {
	$retVal = confirm("Are you sure you want to remove this item from your cart?");
	if ($retVal) {
		lpSendData("session","conversionAction","removed");
	}
	return $retVal;
}

//checks shipTo drop down on change
//submits cart or redirects to shipping.php
	function updateShipTo(field, site){
		if(field.value == "new"){
			regularExpression = /([0-9]*)([a-zA-Z]*)/;
			cartId = regularExpression.exec(field.name);
			from = window.location.pathname;
			slashIndex = from.lastIndexOf("/");
			from = from.substring(slashIndex+1, from.length);
			window.location.replace(site+"checkout/shipTo.php?from="+from+"&cartId="+cartId[1]);
		}
		else{
			prepPaymentFormFor('stopPayment', field.form);
			field.form.submit();
		}
	}//end updateShipTo()

//checks shipToName drop down on change
//reloads shipto.php with newly selected name
	function loadShipTo(field){
		thisValue=field.value;
		for (x=0;x<field.form.length;x++){
			field.form.elements[x].value="";
		}
		field.value=thisValue;
		field.form.elements['nextPage'].value="-1";
		field.form.elements['noValidate'].value="1";
		field.form.submit();
	}//end updateShipTo()

//return index of current form element
	function getElementIndex(field){
		for(x=0;x<field.form.length;x++){
			if(field.form.elements[x].name==field.name){
				return x;
			}
		}
		return -1;//should never happen
	}//end getElementIndex()

//empies the payment fields and submits the form
//called when changing the type of payment method
	function changePaymentMethod(otherField){
		var theForm = $("#paymentForm");
		//$("#paymentChoices input").val("");
		//$("#"+otherField).val("");
		$("#nextPage").val("0");
		
		prepPaymentFormFor('clearSavedCard',theForm[0]);
		prepPaymentFormFor('removePrevPaymentType',theForm[0]);
		prepPaymentFormFor('clearcc',theForm[0]);
		prepPaymentFormFor('droptocode',theForm[0]);
		theForm.submit();
		
		//if(field.form.elements['nextPage']){field.form.elements['nextPage'].value="-1";}
		//field.form.submit();
	}//end changePaymentMethod()

//changes the form action, submits the form
//returns nothing
	function addGiftWrap(field){
		sourcePage = location.pathname;
		from = window.location.pathname;
		slashIndex = from.lastIndexOf("/");
		from = from.substring(slashIndex+1, from.length);
		field.form.action = "addGiftWrap.php?from="+from;
		field.form.submit();
	}//end addGiftWrap()

//makes sure at least one value in the form is filled out
//returns bool
	function blankFormCheck(formObject){
		if (submitted == true) {//keep the forms from being submitted more than once
			return false;
		}
		else {
			// everything is ok check the fields, ie using if (document.... .length == 0) alert...
			submitted = true ;
		}
		skippedFields = new RegExp("(prefixId|nextPage|shipToId|businessFlag)");
		for(x = 0; x < formObject.length; x++)//loop through each form object
		{
			var next_element = formObject.elements[x];
			if(!(skippedFields.test(next_element.name)) && (next_element.type != "hidden")){
				if(next_element.value.length > 0 && next_element.value!="Keyword, Item #"){
					return true;
				}
			}
		}
		//went through entire form and found no values entered
		submitted = false ;
		return false;
	}//end blankFormCheck()

//makes sure at least the address is not a po box
//returns bool
	function isPOBox(field){
		POBoxExp = /^((P)(.){0,2}(O)(.)*)?BOX.?\d*/i;
		address = field.form.elements['streetAddress'].value
		if(POBoxExp.exec(address)){
			alert("We cannot ship to P.O. Boxes");
			return false;
		}
		else{
			return true;
		}
	}//end isPOBox()

	function decimalToString(floatToConvert, decimalPlaces){
		floatToConvert= floatToConvert+"";
		errorFlag = false;
		convertedString = "";

		if(floatToConvert.search(/^(-)?[0-9]*\.?[0-9]*$/) > -1){//make sure it is a decimal number
			decimalIndex = floatToConvert.lastIndexOf(".");
			intValue = floatToConvert.substr(0,decimalIndex);
			if(decimalIndex < 0){intValue=floatToConvert;}
			convertedString = intValue+".";
			decimalValue = floatToConvert.substr(decimalIndex+1, decimalPlaces);
			if(decimalIndex < 0){
				decimalValue = "";
				for(x=1;x<=decimalPlaces;x++){decimalValue+="0";}
			}
			startingLength = decimalValue.length
			if(startingLength<decimalPlaces){
				for(counter=0; counter<(decimalPlaces-startingLength);counter++){
					decimalValue+="0";
				}
			}
			convertedString+=decimalValue;
		}else errorFlag = true;
		return convertedString;
	}

	function translateZip(xmlFile,field){
		// code for Mozilla, etc.
		if (window.XMLHttpRequest){
  		xmlhttp=new XMLHttpRequest();
  		xmlhttp.onreadystatechange=displayLocation;
  		xmlhttp.open("GET",xmlFile,true);
  		xmlhttp.send(null);
  	}
		// code for IE
		else if (window.ActiveXObject){
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  if (xmlhttp){
		  	xmlhttp.onreadystatechange=displayLocation;
		  	xmlhttp.open("GET",xmlFile,true);
		  	xmlhttp.send();
    	}
  	}
  	//else{alert("this browser doesn't support this feature");}
  	return true;
	}

	function displayLocation(){
		// if xmlhttp shows "loaded"
		if (xmlhttp.readyState==4){
  		// if "OK"
  		if (xmlhttp.status==200){
  			response=xmlhttp.responseText;
  			responseArray = response.split("\n");
  			if(responseArray[0]==""){startIndex = 1;}
  			else{startIndex = 0;}
  			if(responseArray[startIndex]!=""){
					checkoutForm = document.forms[(document.forms.length-2)];
  				checkoutForm.elements['city'].value=responseArray[startIndex];
  				checkoutForm.elements['state'].value=responseArray[(startIndex+1)];
					checkoutForm.elements['phoneNumber'].focus();
  			}
  			
  		}
  	}
	}

	function dropMenu(field,drop){
		if(drop){ field.className+=' over';}
		else{field.className=field.className.replace(' over', '');}
	}

	function changePadSize(field,priceArray){
		newPrice = "$"+decimalToString(priceArray[field.value],2);
		document.getElementById(field.name+"Price").innerHTML = newPrice;
		padForm = document.forms['rugPadForm'];
		if(field.value.length ==10){
			addedItem = field.value.substring(0,5);
			specOne = field.value.substring(5,7);
			specTwo = field.value.substring(7,10);
			padForm.elements['parentid'].value=addedItem;
			padForm.elements['addeditem'].value=addedItem;
			padForm.elements['spec_one'].value=specOne;
			padForm.elements['spec_two'].value=specTwo;
		}
	}

	function addPadToCart(fieldName){
		padForm = document.forms['rugPadForm'];
		field = document.getElementById(fieldName);
		padForm.action+="?parentid="+field.value.substring(0,5);
		if(field.value.substring(0,5)!=padForm.elements['parentid'].value){
			addedItem = field.value.substring(0,5);
			specOne = field.value.substring(5,7);
			specTwo = field.value.substring(7,10);
			padForm.elements['parentid'].value=addedItem;
			padForm.elements['addeditem'].value=addedItem;
			padForm.elements['spec_one'].value=specOne;
			padForm.elements['spec_two'].value=specTwo;
		}
		
		
		
		var popUpElem = $('#addPopUp');
		popUpElem.html(" ").activity( { color: "#fff"}) ;
		if ( popUpElem.data("overlay") ){
			popUpElem.data("overlay").load();
		}
		else{
			popUpElem.overlay({
				mask:{ color: '#cccccc' },
				top: 'center',
				load: true
			});
		}
		
		$.post("detail.php", $("#rugPadForm").serialize(), function(data){
			//alert(data);
				popUpElem.activity(false);
				responseAction = $(data).find('action').text();
				if( responseAction == 'redirect'){
					window.location = $(data).find('content').text();
				}
				else{
					popUpElem.html($(data).find('content').text());
					$('#cartCountSpan').load(baseUrl+'cartCount.php');
				}
			});
		
	}

  function selectPayment(desc, id, otherId){
    selectObj = document.getElementById(id);
    for(x=0;x<selectObj.options.length;x++){
        if(desc==selectObj.options[x].text){
          selectObj.selectedIndex = x;
          changePaymentMethod(otherId);
          break;
        }
    }
  }

  function displaySubSwatces(divName){
    document.getElementById(divName).style.display="block";
  }
  function hideSubSwatches(divName){
    document.getElementById(divName).style.display="none";
  }

	function removeAPayment(inId) {
		var payField =  document.getElementById(inId),
		$theForm = $('#paymentForm'),
		$paymentTypeId = $('#paymentTypeId');
		if (payField) { payField.value=0; }
		if ($paymentTypeId.length>0) {
			$paymentTypeId.val('');
		}
		prepPaymentFormFor('stopPayment',$theForm[0]);
		prepPaymentFormFor('clearSavedCard',$theForm[0]);
		prepPaymentFormFor('droptocode',$theForm[0]);
		$theForm.submit();
	}
	
	function updatePayments() {
		var $theForm = $('#paymentForm'),
		$paymentTypeId = $('#paymentTypeId');
		if ($paymentTypeId.length>0) {
			$paymentTypeId.val('');
		}
		$('#payRecord').val('');
		prepPaymentFormFor('droptopayment',$theForm[0]);
		$theForm.submit();
	}
	
	//empies the payment fields and submits the form
//called when changing the type of payment method
	function changeMyAccountPaymentMethod(field){
		thisIndex = getElementIndex(field);
		for(x=thisIndex+1;x<field.form.length;x++){
			field.form.elements[x].value="";
		}
		if(field.form.elements['nextPage']){field.form.elements['nextPage'].value="-1";}
		field.form.submit();
	}//end changeMyAccountPaymentMethod()
	
	function checkPromoCode(theForm) {
	var $cMsg = 'Are you sure you want to replace this discount?\nOnly one discount per order is allowed.',
	newEle = theForm.promoCodeTemp,
	oldEle = theForm.promoCode,	
	nVal = theForm.promoCodeTemp.value;
	oVal = theForm.promoCode.value,
	retVal = true;
	
	// Only work if we have a something in the temp promo code
	if (nVal != '' && oVal !='') {
		// Now check to see if promo codes match.
		if (nVal != oVal) {
			// So they are different, now confirm that the user wants to change them.
			if (!confirm($cMsg)) {
				retVal = false;
			}
		} // They do, stop processing
	}
	if (retVal) {
		oldEle.value = nVal;
	} else {
		newEle.value = oVal;
	}
	return retVal;
}

function applyCatalogKeyCode(theForm){
		prepPaymentFormFor('stopPayment',theForm);
		prepPaymentFormFor('droptocode',theForm);
		$("#paymentForm").submit();
}

function applyPromoCode(theForm){
	if (theForm.promoCodeTemp.value !="" && checkPromoCode(theForm)) {
		prepPaymentFormFor('stopPayment',theForm);
		prepPaymentFormFor('droptocode',theForm);
		$("#paymentForm").submit();
	}
}

function applyNonCreditCardPayment(theForm){
	
}

/**
 * used to clear the payment form of fields that will produce
 * results unrelated to the user's action (applying a payment on qty change etc)
 *
 * @param str action The user's desired action. Used to determine which fields to clear.
 * @param HTMLElement theForm The HTML element form (NOT jQuery Object)
 * @returns null
 */
function prepPaymentFormFor(action, theForm) {
	var fields=[],selects=[],cbs=[],proceed=true,clearExtra=false;
	var removeFromReg = /#(payment|codes)/;
	var gcFields = {
		'fields':['IdNumberpayment','PINpayment','Amountpayment'],
		'selects':['GCpaymentTypeId'],
		'cbs':['ignore']
	};
	var ccFields = {
		'fields':['card1_IdNumberpayment','card1_Amountpayment','card2_IdNumberpayment','card2_Amountpayment'],
		'selects':['card1_cc_type','card1_monthExpDatepayment','card1_yearExpDatepayment','card2_cc_type','card2_monthExpDatepayment','card2_yearExpDatepayment'],
		'cbs':['card1_saveCC','card2_saveCC']
	};
	var savedCardFields = {
		'fields':['payRecord','card1_Amountpayment'],
		'selects':[],
		'cbs':[]
	}
	
	switch (action) {
		case 'stopPayment':
			clearExtra = true;
			fields = [].concat(gcFields.fields, ccFields.fields, savedCardFields.fields);
			selects = [].concat(gcFields.selects, ccFields.selects, savedCardFields.selects);
			cbs = [].concat(gcFields.cbs, ccFields.cbs, savedCardFields.cbs);
			break;
		
		case 'droptopayment':
			clearExtra = false;
			theForm.action.replace(removeFromReg,'');
			theForm.action=theForm.action+'#payment'
			proceed = false;
			break;
		
		case 'droptocode':
			clearExtra = false;
			theForm.action.replace(removeFromReg,'');
			theForm.action=theForm.action+'#codes'
			proceed = false;
			break;
		
		case 'clearcc':
			clearExtra = false;
			fields = ccFields.fields;
			selects =  ccFields.selects;
			cbs =  ccFields.cbs;
			break;

		case 'removePrevPaymentType':
			clearExtra = false;
			fields = ['paymentTypeId','Amountpayment'];
			proceed = true;
			break;
		
		case 'clearSavedCard':
			clearExtra = false;
			fields = savedCardFields.fields;
			proceed = true;
			break;
		
		default:
			// Prevent this code from doing anything
			proceed = false;
			break;
	}
	
	if (proceed == true) {
		
		if (clearExtra == true) {
			$("#payRecord").val("");
			$("#GCpaymentTypeId").val("");
			$("#CCpaymentTypeId").val("");
			$("#nextPage").val("-1");
		}

		// handle fields
		for (var i=fields.length; i>-1 ; --i) {
			var ele = theForm[fields[i]];
			if (ele) { ele.value=""; }
		}
		
		for (var i=selects.length; i>-1 ; --i) {
			var ele = theForm[selects[i]];
			if (ele) { ele.selectedIndex=0; }
		}
		
		for (var i=cbs.length; i>-1 ; --i) {
			var ele = theForm[cbs[i]];
			if (ele) { ele.checked=false; }
		}

	}
}

function  newCCChange(ele){
	var $ele = $(ele),
	eleId = $ele.attr('id'),
	selectedCard = $ele.val(),
	$mom = $ele.parents('.CreditCardEntryContainer'),
	$sccField = $mom.find('.savedCardInput'),
	$sccNum = $mom.find('.savedNumber'),
	$ccnumField = $mom.find('.ccNumber'),
	$expWrapper = $mom.find('.expDateCont'),
	$noExpWrapper = $mom.find('.expDate_notNeed'),
	$expDateFields = $mom.find('.expDateSel'),
	$roAmount = $mom.find('.readOnlyAmount'),
	$hasSCC = $sccField.length,
	$sccRow = $mom.find('.saveCardRow'),
	$sccCB = $sccRow.find('.saveCC'),
	$pdRows = $mom.find('.paymentDetailsRow'),
	$wAmount = $mom.find('.writeableAmount'),
	$visaToS = $('#tosBox'),
	hideClass = 'hideMe';
	
	var resetCC = function(){
		// Show & Reset
		$ccnumField.removeClass(hideClass).val('');
		$expWrapper.removeClass(hideClass);
		$sccRow.removeClass(hideClass);
		$pdRows.removeClass(hideClass);
		$expDateFields.val('');
		$sccCB.removeAttr('checked');
		$roAmount.removeClass(hideClass);
		
		// Hide & Reset
		$sccNum.addClass(hideClass).text('');
		$noExpWrapper.addClass(hideClass).text('');
		$wAmount.addClass(hideClass);
		$sccField.val('');
		
		
		if ($('#secondCreditCard').is(':visible')) {
			$wAmount.removeClass(hideClass);
			$roAmount.addClass(hideClass);
		} else {
			$wAmount.addClass(hideClass);
			$roAmount.removeClass(hideClass);
		}
		
	}
	
	if(selectedCard != "") {
		if (selectedCard.indexOf('saved_card_') != -1 && $hasSCC) {
			var sId = selectedCard.replace('saved_card_','');
			resetCC();

			// Show and Set
			$sccNum.removeClass(hideClass).text('****-****-****-'+HDC_SCI[sId].lastFour);
			$noExpWrapper.removeClass(hideClass).text(HDC_SCI[sId].expDate);
			$pdRows.removeClass(hideClass)
			$sccField.val(sId);
			
			// Hide & reset
			$ccnumField.addClass(hideClass).val('');
			$expWrapper.addClass(hideClass);
			$sccRow.addClass(hideClass);
			$expDateFields.val('');

		} else {
			resetCC();
			if (selectedCard == '19') {
				$expDateFields.val('');
				$expWrapper.addClass(hideClass);
				$noExpWrapper.removeClass(hideClass).text("N/A");
			}
		}
	} else {
		resetCC();
		$pdRows.addClass(hideClass);
		if (eleId == 'chosenCard1' && $('#secondCreditCard').is(':visible')) {
			$('.toggleSecondCard').eq(0).click();
		}
	}
	
	// Single place to show/hide the Visa ToS
	var $visaToS = $('#tosBox'),
	    $cards = $('.cardPicker'),
	    showToS = false;
	for (var i=0,l=$cards.length; i<l; i++) {
		var card = $cards[i].options[$cards[i].selectedIndex].text,
		isVisa = card.match(/visa/i);
		if (isVisa) {
			showToS = true;
			break;
		}
	}
	if (showToS) {
		$visaToS.removeClass(hideClass);
	} else {
		$visaToS.addClass(hideClass);
		$('#tcAccept').removeAttr('checked');
	}
	
}

function submitCCards() {
	var $theFrm = $('#paymentForm'),
	$gcField = $('#GCpaymentTypeId');
	$amountFields = $theFrm.find('.writeableAmount'),
	$theCards = $theFrm.find('.cardPicker'),
	total = 0, overUnder=0, msg='', errorClass = 'errorInput', add=0,
	doTheMath=true, weHaveAnError=false, $addErrors = $(), cardCount=0,
	isToSChecked = $('#tcAccept').is(':checked');
	
	if ($gcField.val() != "") {
		option = $gcField[0].options[$gcField[0].selectedIndex].text;
		weHaveAnError = true;
		msg = "Please Apply or Cancel "+option+".";
	} else {
		$theFrm.find('.'+errorClass).each(function(){$(this).removeClass(errorClass);});
		
		for (var i=0,l=$theCards.length; i<l; i++) {
			var $theCard = $theCards.eq(i),
			$cardNum = $theCard.parents('.CreditCardEntryContainer').find('.ccNumber').eq(0),
			cardNumVal = $cardNum.val(),
			theCardVal = $theCard.val(),
			theCardName = $theCard[0].options[$theCard[0].selectedIndex].text;
			if ( theCardVal != '') {
				cardCount++;
				if (theCardVal.indexOf('saved_card')!=0 && cardNumVal == '') {
					$addErrors = $addErrors.add($cardNum);
					weHaveAnError = true;
					doTheMath = false;
					msg = "Missing credit card number.";
				}
				if (theCardName.match(/visa/i) && !isToSChecked) {
					$addErrors = $addErrors.add($('#visatc'));
					weHaveAnError = true;
					doTheMath = false;
					if (msg) {
						msg += '<br />';
					}
					msg += "Please click checkbox to accept policy.";
				}
			}
		}
		if (cardCount==0) {
			$addErrors = $addErrors.add($theCards);
			weHaveAnError = true;
			doTheMath = false;
			msg = "Please apply a payment to the order.";
		}
		
		if (!weHaveAnError) {
			for (var i=0,l=$amountFields.length; i<l; i++) {
				add = $amountFields.eq(i).val();
		
				if (!add || (add.replace(/[^0-9\.]/g) != add)) { add = '0.00'; }
		
				add = parseFloat(add).toFixed(2);
				var myCardVal = $amountFields.eq(i).parents('.CreditCardEntryContainer').find('.cardPicker').eq(0).val();
		
				if ((add=="" || add < 0.01) && myCardVal!="") {
					$addErrors = $addErrors.add($amountFields);
					weHaveAnError = true;
					doTheMath = false;
					msg = 'Please apply amount to both cards.<br />To pay with one card, remove second payment.';
					break;
				}
				total += (add*1); 
			}
		}
		
		if (doTheMath) { 
			overUnder = (((MULTICARD_ORDER_TOTAL*1).toFixed(2) - total)*1).toFixed(2); 
			
			if (overUnder == 0) {
				$('#nextPage').val('0');
				checkPromoCode(document.forms['paymentForm']);
				prepPaymentFormFor('droptopayment', $theFrm[0]);
				$theFrm.submit();
			} else {
				weHaveAnError = true;
				$addErrors = $addErrors.add($amountFields);
				if (overUnder>0) {
					msg = 'Payment is less than amount due.<br /> Please increase amount by $'+(overUnder*1).toFixed(2);
				} else if (overUnder<0) {
					msg = 'Payment exceeds amount due.<br /> Please decrease amount by $'+(overUnder*-1).toFixed(2);
				}
	
			}
		}
	}

	if (weHaveAnError) {
		$('#orderPaymentError').html(msg);
		$addErrors.addClass(errorClass);
	}

} // submitCCards

function prettyNumber(inNum) {
	inNum = inNum.toString().split('.');
	if (inNum[1]) {
		if (inNum[1] < 10) {
			inNum[1] = inNum[1]+'0'+'';
		} else if (inNum[1].length>2) {
			inNum[1] = inNum[1].substring(0,2);
		}
	} else {
		inNum[1] = '00';
	}
	return inNum.join('.');
}

function saveCCValidate(theEle) {
	var $saveCCs = $('.saveCC:checked');
	for (var i=0,l=$saveCCs.length; i<l; i++) {
		if ($saveCCs[i] != theEle) {
			$saveCCs.eq(i).removeAttr('checked');
		}
	}
}

function updateShipToIdCounter() {
	var numChecked = $('.shipToDeleteValues:checked').length,
	myCont = $('#shipToIdInfoContainer');
	if (numChecked>0) {
		myCont.show().find('span').text(numChecked);
	} else {
		myCont.hide().find('span').text('')
	}
}