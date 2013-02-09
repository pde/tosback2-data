added = 'Added!';
add2cart = 'Add To Cart';


function toggleDisplay(divObj) {

	//alert("div name = "+divObj);
	var el = document.getElementById(divObj);
	if ( el.style.display != 'none' ) {
		el.style.display = 'none';
	}
	else {
		el.style.display = '';
	} 	
	
	if (divObj == 'warranty')  {
		initializeESPCost();
	} else if (divObj == 'optional') {
		initializeOptionalCost();
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toggleProgress(divObj) {

	var el = document.getElementById(divObj);
	if ( el.style.display != 'none' ) {
		el.style.display = 'none';
	}
	else {
		el.style.display = '';
	} 	
	
	if (divObj == 'warranty')  {
		initializeESPCost();
	} else if (divObj == 'optional') {
		initializeOptionalCost();
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeRequiredLabel (which) {

//	alert("in changeRequiredLabel");

	cost = document.getElementById('required_cost_'+which.value).value;
	 	
	if (which.checked) {
		 document.getElementById('label_'+which.value).innerHTML = added; 
	} else {
		 document.getElementById('label_'+which.value).innerHTML = add2cart;	
		 cost *= -1;	
	}	
	
	updateRequiredCost(cost);
	calculateRunningTotal();

}


function updateRequiredCost(fCost) {
	
	 //alert ('cost = '+ fCost);
	 //alert ('req cost total = '+ parseFloat(document.getElementById('requiredCostTotal').value));
	 final_cost =  parseFloat(document.getElementById('requiredCostTotal').value)  + parseFloat(fCost);
	 //alert('final cost = '+ final_cost);
	
	document.getElementById('requiredCostTotal').value = round(final_cost);
	document.getElementById('requiredCost').innerHTML = moneyFormat(round(final_cost));

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initializeESPCost() {

	//alert("espCost string = "+document.getElementById('espCost').innerHTML);
	if(document.getElementById('espCost')!=null){
	text = document.getElementById('espCost').innerHTML;
	if (text.indexOf("-") != -1) {
		document.getElementById('espCost').innerHTML = "<strong>$0.00</strong>";
	}
	}
		
}

function changeESPLabel (form, which) {

	//alert("which = "+which.value);
	cost = document.getElementById('esp_cost_'+which.value).value;
	 	
	if (which.checked) {
		 document.getElementById('label_'+which.value).innerHTML = added; 
	} else {
		 document.getElementById('label_'+which.value).innerHTML = add2cart;	
		 cost *= -1;	
	}	
	
	for(i=0; i<form.elements.length; i++) {
		if (form.elements[i].type=="checkbox" && (form.elements[i].name.search("esp_checkbox_") != -1) ) {
			if (form.elements[i].name.search("esp_checkbox_"+which.value) == -1)  {
				if (form.elements[i].checked) {
					document.getElementById('label_'+form.elements[i].value).innerHTML = add2cart;	
				    oldESPCost = document.getElementById('esp_cost_'+form.elements[i].value).value *-1;	    
					updateESPCost(oldESPCost);
				}
				form.elements[i].checked = false;
			}
		}	
	}


	updateESPCost(cost);
	calculateRunningTotal();

}


function updateESPCost(fCost) {
	
	 //alert ('cost = '+ fCost);
	 //alert ('esp cost total = '+ parseFloat(document.getElementById('espCostTotal').value));
	 final_cost =  parseFloat(document.getElementById('espCostTotal').value)  + parseFloat(fCost);
	 //alert('final cost = '+ final_cost);
	
	document.getElementById('espCostTotal').value = round(final_cost);
	document.getElementById('espCost').innerHTML = moneyFormat(round(final_cost));

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initializeOptionalCost() {

	//alert("optionalCost string = "+document.getElementById('optionalCost').innerHTML);
	if(document.getElementById('optionalCost') !=null){
	text = document.getElementById('optionalCost').innerHTML;
	if (text.indexOf("-") != -1) {
		document.getElementById('optionalCost').innerHTML = "<strong>$0.00</strong>";
	}
	}
		
}


function changeOptionalLabel (which) {

	//alert("which.value = "+ which.value);
	cost = document.getElementById('optional_cost_'+which.value).value;
	//alert("optional cost = "+ cost);
	 	
	if (which.checked) {
		 document.getElementById('label_'+which.value).innerHTML = added; 
	} else {
		 document.getElementById('label_'+which.value).innerHTML = add2cart;	
		 cost *= -1;	
	}	
	
	updateOptionalCost(cost);
	calculateRunningTotal();

}


function updateOptionalCost(fCost) {
	
	 //alert ('cost = '+ fCost);
	 //alert ('optional cost total = '+ parseFloat(document.getElementById('optionalCostTotal').value));
	 final_cost =  parseFloat(document.getElementById('optionalCostTotal').value)  + parseFloat(fCost);
	 //alert('final cost = '+ final_cost);
	if(final_cost >=0){
		document.getElementById('optionalCostTotal').value = round(final_cost);
		document.getElementById('optionalCost').innerHTML = moneyFormat(round(final_cost));
	}

}
// WCS_001 - Starts - Saravanan V
function checkDepotDirectProduct(ddSelectionKey,which){
 if(ddSelectionKey != null && ddSelectionKey !='' && ddSelectionKey.indexOf(which.value)>=0){
 	//alert(ddSelectionKey);
 	//#  *  #  *  123#456   -- ice*stack*ped
	var ddTypes=ddSelectionKey.split('*');
	var iceKeys=null;
	var stackKeys=null;
	var pedKeys=null;
	
	if(ddTypes !=null && ddTypes.length>2){

		iceKeys=ddTypes[0].split('#');
		stackKeys=ddTypes[1].split('#');
		pedKeys=ddTypes[2].split('#');
	}
		
		if(iceKeys !=null && iceKeys.length >=1 && iceKeys[0]!='' && iceKeys.indexOf(which.value)>=0){  // selected is ice
		//alert(1 +' ice '+ iceKeys );
			updateTarget(which,iceKeys,true,ddSelectionKey);
		}else if(stackKeys !=null && stackKeys.length >=1 && stackKeys[0]!='' && stackKeys.indexOf(which.value)>=0){
		//alert(2 +' st '+  stackKeys);
			doDeselectLogic(which,stackKeys,pedKeys);
			updateTarget(which,stackKeys,false,ddSelectionKey);
		}else if(pedKeys !=null && pedKeys.length >=1 && pedKeys.indexOf(which.value)>=0){
		//alert(3 +' pd '+ pedKeys );
			doDeselectLogic(which,stackKeys,pedKeys);
			updateTarget(which,pedKeys,false,ddSelectionKey);
	}
		
	}
}

function callChangeOptionalLabelForAllKeys(keys,which){
	if(keys!=null && keys.length > 0 && keys[0]!=''){
	for(var i = 0; i < keys.length; i++) {
		var obj=document.getElementById('optional_checkbox_'+keys[i]);
		if(obj.checked && which.value!=obj.value){
		obj.checked=false;
		//document.getElementById('label_'+obj.value).innerHTML = add2cart;
		changeOptionalLabel(obj);
		}
	}
	}
}
function reCalcOptional(which,ddSelectionKey){
	var form=document.getElementById('partsServicesForm');
	for(var i = 0; i < form.elements.length; i++) {
		if(form.elements[i].type == "checkbox") {
			if(form.elements[i].name.indexOf('optional_checkbox_')>=0 && form.elements[i].checked && which.name!=form.elements[i].name
				&& ddSelectionKey.indexOf(form.elements[i].value)>=0){
				//alert(form.elements[i].name);
				changeOptionalLabel(form.elements[i]);
			}
		}
	}			



}

function doDeselectLogic(which,stackKeys,pedKeys) {
	//check is both ped and stack are present.
	if(stackKeys!=null && pedKeys!=null && stackKeys.length >=2 && pedKeys.length >=2){
	callChangeOptionalLabelForAllKeys(pedKeys,which);
	callChangeOptionalLabelForAllKeys(stackKeys,which);
	}
}

function updateTarget(which,keys,isIce,ddSelectionKey){
	 	var target=null;
	 	var install=keys[0];
		var product=keys[1];// there might be other product but we will select only one...
		//alert(install+"--" +product +"  which "+ which.value);
		if(isIce) {// its ice maker
			if(which.value == install){ // user selected icemaker INSTALL!!!
				target=document.getElementById('optional_checkbox_'+install);
				if(target.checked){return;} // nothing to update target is already checked.
				else{target.checked=which.checked;}
				
			}else if(which.value == product){ // user selected icemaker
				target=document.getElementById('optional_checkbox_'+product);
				if(! which.checked && target.checked){
					target.checked=false;
				}else {return;} // no need to update cost; 
			}
		}else{ // pedestal /staking kit/
			if(which.value == install){ // user selected INSTALL!!!
				target=document.getElementById('optional_checkbox_'+install);
			}else{ // user selected product
				target=document.getElementById('optional_checkbox_'+product);
			}
			target.checked=which.checked;
		}
		
		if(isIce){
		changeOptionalLabel(target);
		}else{
		reCalcOptional(which,ddSelectionKey);
		}

}

// WCS_001 - Ends 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateRunningTotal() {
	//alert("calculateRunningTotal");

	applCost 	= document.getElementById('applianceCostTotal').value;
	reqCost 	= document.getElementById('requiredCostTotal').value;
	wrntyCost	= document.getElementById('espCostTotal').value;
	optCost	= document.getElementById('optionalCostTotal').value;
	shipCost	= document.getElementById('shippingCostTotal').value;
	
	subTotal = parseFloat(applCost) + parseFloat(reqCost) + parseFloat(wrntyCost) + parseFloat(optCost) + parseFloat(shipCost);
	
	//alert('total = '+ subTotal);
	
	document.getElementById('subtotal').value = round(subTotal);
	document.getElementById('appliance-subtotalvalue').innerHTML = moneyFormat(round(subTotal));

}

function moneyFormat(y) {
    
    var x=y+'';
    //alert("x = "+ x);
	if (x.indexOf(".") == -1) {
		temp =  "<strong>$"+x+".00</strong>";
	} else {
	
	//	alert("x length = "+x.length);
	//	alert(". index = "+x.indexOf("."));
		charsLeft = x.length - (x.indexOf(".")+1);
	//	alert("charsLeft = "+charsLeft);
		
		if (charsLeft != 2) {
			temp =  "<strong>$"+x+"0</strong>";
		} else {
			temp = "<strong>$"+x+"</strong>";
		}
	}
	//alert ("temp = "+temp);
	return temp;
}

function round(x) {
	return Math.round(x*100)/100;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updatePartsServicesSelectedItems() {
	processRequiredPartsSelections('required_checkbox_',1);
	var form = document.partsServicesForm;

	if(document.getElementById("editCnt")) {
		var requiredKey = "required_checkbox_";
		var espKey = "esp_checkbox_";
		var optionalKey = "optional_checkbox_";
		for(var i = 0; i < form.elements.length; i++) {
			if(form.elements[i].type == "checkbox") {
				if(form.elements[i].name.search(requiredKey) == 0) {
					if(handlePartsServicesEditCheckbox(form.elements[i])) {
						changeRequiredLabel(form.elements[i]);
					}
				}
				else {
					if(form.elements[i].name.search(espKey) == 0) {
						if(handlePartsServicesEditCheckbox(form.elements[i])) {
							changeESPLabel(form, form.elements[i]);
						}
					}
					else {
						if(form.elements[i].name.search(optionalKey) == 0) {
							if(handlePartsServicesEditCheckbox(form.elements[i])) {
								changeOptionalLabel(form.elements[i]);
							}
						}
					}
				}
			}
		}
	}
}

function handlePartsServicesEditCheckbox(checkbox) {
	var retval = false;

	var storeSkuElement = document.getElementById(checkbox.value);
	if(storeSkuElement) {
		if(!checkbox.checked) {
			checkbox.checked = true;
			retval = true;
		}
	}
	else {
		if(checkbox.checked) {
			checkbox.checked = false;
			retval = true;
		}
	}
	
	return retval;
}

