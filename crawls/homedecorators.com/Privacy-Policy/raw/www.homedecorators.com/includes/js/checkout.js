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
		if (!confirm('Are you sure you want to remove all items from your cart?')) {
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
		$("#"+otherField).val("");
		$("#nextPage").val("-1");
		prepPaymentFormFor('removePrevPaymentType',theForm[0]);
		prepPaymentFormFor('droptopayment',theForm[0]);
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
			// everything is ok check the fields, ie using if (document.... .lenght == 0) alert...
			submitted = true ;
		}
		skippedFields = new RegExp("(prefixId|nextPage|shipToId|businessFlag)");
		for(x=0; x<formObject.length;x++){//loop through each form object
			if(!(skippedFields.test(formObject.elements[x].name))){
				if(formObject.elements[x].value.length > 0 && formObject.elements[x].value!="Keyword, Item #"){
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
		$('#payRecord').val('');
		prepPaymentFormFor('droptopayment',$theForm[0]);
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
		prepPaymentFormFor('droptopayment',theForm);
		$("#paymentForm").submit();
}

function applyPromoCode(theForm){
	if (theForm.promoCodeTemp.value !="" && checkPromoCode(theForm)) {
		prepPaymentFormFor('stopPayment',theForm);
		prepPaymentFormFor('droptopayment',theForm);
		$("#paymentForm").submit();
	}
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
	switch (action) {
		case 'stopPayment':
			clearExtra = true;
			fields = ['savedAmount','IdNumberpayment','Amountpayment','PINpayment','paymentTypeId'];
			selects = ['monthExpDatepayment','yearExpDatepayment','CCpaymentTypeId','GCpaymentTypeId'];
			cbs = ['saveCC','tcAccept','ignore'];
			break;
		
		case 'droptopayment':
			var frmAction = theForm.action;
			if (!frmAction.match(/#payment/)) {
				theForm.action = theForm.action+'#payment';
			}
			proceed = false;
			break;

		case 'removePrevPaymentType':
			clearExtra = false;
			fields = ['paymentTypeId','Amountpayment'];
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