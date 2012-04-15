
function searchCount(formObj){
	narrowUrl='';
	catUrl='';
	count=0;
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].value!=""){
			if(formObj.elements[x].name=="category"){
				catUrl='&category='+formObj.elements[x].value;
			}
			else{
				narrowUrl+='&narrow[]='+formObj.elements[x].value;
			}
			count++;
		}
	}
	if (catUrl==''){
		catUrl='&category=0';
	}
	sendUrl="ajax=true"+catUrl+narrowUrl+'&selectionCount=true';
	$.get('window.php', sendUrl, function(data){
			$('#searchResultCount').html(data+' blinds match your selections.');
		});
}
function searchBlinds(formObj){
	narrowUrl='';
	catUrl='';
	count=0;
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].value!=""){
			if(formObj.elements[x].name=="category"){
				catUrl='&category='+formObj.elements[x].value;
			}
			else{
				narrowUrl+='&narrow[]='+formObj.elements[x].value;
			}
			count++;
		}
	}
	if (catUrl==''){
		catUrl='&category=0';
	}
	if(count > 0){
		sendUrl="ajax=true"+catUrl+narrowUrl+'&selectionCount=true';
		$.get('window.php', sendUrl, function(data){
			if(data>0){
				document.location="window.php?fromSearch=true"+catUrl+narrowUrl;
			}
			else{
				$('#searchErrors').html('Currently, this particular selection is not available. Please try another combination.');
			}
		});
	}
}
function hideOptions(categoryElement){
	//alert(categoryElement.value);
	formObj = categoryElement.form;
	if (categoryElement.value=="500" || categoryElement.value=="501"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" || formObj.elements[x].id=="Tilt Control"
				 || formObj.elements[x].id=="Slat Features" || formObj.elements[x].id=="Slat Size" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="502"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" || formObj.elements[x].id=="Cell Construction"
				 || formObj.elements[x].id=="Cell Size" || formObj.elements[x].id=="Privacy" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="503"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" ||
				 formObj.elements[x].id=="Draw and Tilt Control" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="504"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" || formObj.elements[x].id=="Tilt Control"
				 || formObj.elements[x].id=="Privacy" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="505"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control"
				 || formObj.elements[x].id=="Privacy" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="506" || categoryElement.value=="507"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control"
				 || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="508"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" || formObj.elements[x].id=="Slat Features"
				 || formObj.elements[x].id=="Slat Size" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="509"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Draw and Tilt Control" 
				 || formObj.elements[x].id=="Vane Material" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else if (categoryElement.value=="513"){
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id=="Brand" || formObj.elements[x].id=="Lift Control" || formObj.elements[x].id=="Room Darkening" 
				 || formObj.elements[x].id=="Privacy" || formObj.elements[x].name=="category"){
				formObj.elements[x].style.visibility='visible';
			}
			else{
				formObj.elements[x].style.visibility='hidden';
				formObj.elements[x].value='';
			}
			
		}
	}
	else{
		for(x=0;x<formObj.elements.length;x++){
			if(formObj.elements[x].id!="category"){
				formObj.elements[x].style.visibility='visible';
				formObj.elements[x].value='';
			}
		}
	}
}
function swatchCount(swatchSpace,swatchLimit,formElement){
	var selectedCount=0;
	var formObj = formElement.form;
	for(x=0;x<formObj.elements.length;x++){
		if(formObj.elements[x].checked==true){
			selectedCount++;
		}
	}
	if (swatchSpace - selectedCount < 0){
		alert ("You can only have "+swatchLimit+" items in your swatch cart, please checkout and if you would like more swatches continue ordering after you checkout.");
		formElement.checked=false;
	}
	//else if(swatchSpace - selectedCount == 1){
	//	alert ("You have space to add one more swatch.");
	//}
}