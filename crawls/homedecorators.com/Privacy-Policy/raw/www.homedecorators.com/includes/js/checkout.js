//checks to make sure customer wanted to put 0 for an item quantity
//submits form or focuses on the item quantity
	function updateCart(field){
		focusedForm=field.form;
		if(field.value == "0"){
			if(confirm("Are you sure you want to remove this item from your cart?")){
				lpSendData("session","conversionAction","removed");
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
	function changePaymentMethod(field){
		thisIndex = getElementIndex(field);
		for(x=thisIndex+1;x<field.form.length;x++){
			field.form.elements[x].value="";
		}
		if(field.form.elements['nextPage']){field.form.elements['nextPage'].value="-1";}
		field.form.submit();
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

//tests payment entered and updates next page value
//returns bool
	function applyPayment(field, amountDue){
		formObject = field.form;
		field.disbled = true;
		regularExpression = /(^payment[0-9]{1,4})/;
		oldPayments = 0.0;
		newPayment = 0.0
		for(x=0; x<formObject.length; x++){//build payment data
			if(regularExpression.test(formObject.elements[x].name)){
				oldPayments+=formObject.elements[x].value - 0.0;
			}
			else if(formObject.elements[x].name=="payment"){
				oldPayments+=formObject.elements[x].value - 0.0;
			}
			else if(formObject.elements[x].name == "Amountpayment"){
				newPayment = formObject.elements[x].value-0.0;
			}
		}
		if(field.type == "image"){//adding a payment
			amountPaid = oldPayments + newPayment;
		}
		else{//updating payment
			if(formObject.elements['Amountpayment']){formObject.elements['Amountpayment'].value="";}
			if(formObject.elements['IdNumberpayment']){formObject.elements['IdNumberpayment'].value="";}
			amountPaid = oldPayments;
			oldPayments = oldPayments - field.value - 0.0;
			updatedPayment = field.value - 0.0;
			if((updatedPayment*100)<1){//if the customer entered less than a penny
				if(!confirm("Do you want to remove this payment?")){//if the customer says no undo what they did
					formObject.reset();
					field.focus();
					return false;
				}
			}
		}//end else
		difference = decimalToString(amountDue,2) - decimalToString(amountPaid,2) -0;
		if((difference*100)>=1){//if the customer isn't paying the full amount with this payment just continue
			return true;
		}
		//the customer is paying the total or more
		if(field.type == "image"){//adding a payment
			//check if difference is negative
			if(difference < 0){
				confirmString = "You entered $"+decimalToString(newPayment, 2)+".\n";
				confirmString+= "You only owe $"+decimalToString((amountDue - oldPayments), 2)+".\n";
				confirmString+= "Do you want to apply $";
				confirmString+= decimalToString((amountDue - oldPayments), 2);
				confirmString+= " to this payment method?";
				if(formObject.elements['paymentTypeId'][formObject.elements['paymentTypeId'].selectedIndex].innerHTML=="Cash"){
					confirmString= "Please give the customer $"+decimalToString(Math.abs(difference),2)+" change.";
				}
				if(confirm(confirmString)){
					formObject.elements['Amountpayment'].value =  decimalToString((amountDue - oldPayments), 2);
					formObject.elements['nextPage'].value=0;
					return true;
				}
				else{
					formObject.elements['Amountpayment'].focus();
					return false;
				}
			}
			//if difference matches amount due continue
			if((difference*100)<1){
				formObject.elements['nextPage'].value=0;
				return true;
			}
		}//if(field.type == "image")
		else{//this is an old payment getting altered
			if(difference < 0){
				confirmString = "You entered $"+decimalToString(updatedPayment, 2)+".\n";
				confirmString+= "You only owe $"+decimalToString((amountDue - oldPayments), 2)+".\n";
				confirmString+= "Do you want to apply $";
				confirmString+= decimalToString((amountDue - oldPayments), 2);
				confirmString+= " to this payment method?";
			}
			else{
				confirmString = "Do you want to put the remaining $";
				confirmString+= decimalToString((amountDue - oldPayments), 2);
				confirmString+= " on this payment?";
			}
			if(confirm(confirmString)){
				field.value =  decimalToString((amountDue - oldPayments), 2);
				formObject.elements['nextPage'].value=0;
				return true;
			}
			else{
				field.focus();
				return false;
			}
		}
		return false;
	}

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

  function selectPayment(desc){
    selectObj = document.getElementById('paymentTypeId');
    for(x=0;x<selectObj.options.length;x++){
        if(desc==selectObj.options[x].text){
          selectObj.selectedIndex = x;
          changePaymentMethod(selectObj);
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
