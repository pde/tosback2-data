function getHTTPRequest() {
	var xmlhttp = false;
	try {
	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	try {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (E) {
	xmlhttp = false;
	}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function iecompattest(){
	return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function showLoading(){
	var ns6 = document.getElementById&&!document.all;
	var loadingDiv = document.getElementById("loadingDiv");
	loadingDiv.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px";
	loadingDiv.style.visibility = "visible";
}

function showLoadingCentered(){
	obj = getObj("loadingDiv");		

	//Calculate the position given the above calculation above the center of the screen.
	var top = (documentHeight() / 2) - (obj.offsetHeight / 2);
	var left = (documentWidth() / 2) - (obj.offsetWidth / 2);

	//Calculate if the top would be off the top of the screen then move it down till it is visible
	top = (top + obj.offsetHeight > documentHeight()) ? top + (top + obj.offsetHeight - documentHeight()) : top;
	top = (top >= 0) ? top : 0;
	top += documentScrollY();
	
	left = left < 0 ? 0 : left;
	obj.style.position = "absolute";
	obj.style.top = top + "px";
	obj.style.left = left + "px";
	obj.style.visibility = "visible";
}

function phonePreview(sku)	{
	var ns6=document.getElementById&&!document.all
	var xmlhttp = getHTTPRequest();
	var loadingDiv = document.getElementById("loadingDiv");
	xmlhttp.open("GET","/cell-phone-service/cell-phones/phonePreviewAJAX.jsp?q_sku=" + sku);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var phonePreview = document.getElementById("phonePreviewDiv");
		phonePreview.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			loadingDiv.style.visibility = "hidden";
			phonePreview.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px"
			phonePreview.style.visibility = "visible";
			}
		}
	}
	xmlhttp.send(null);
}

function phonePreviewDBF(sku)	{ 
	var ns6=document.getElementById&&!document.all
	var xmlhttp = getHTTPRequest();
	var loadingDiv = document.getElementById("loadingDiv");
	xmlhttp.open("GET","/cell-phone-service/cell-phones/phonePreviewAJAXDBF.jsp?q_sku=" + sku);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var phonePreview = document.getElementById("phonePreviewDiv");
		phonePreview.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			loadingDiv.style.visibility = "hidden";
			phonePreview.style.top=ns6? window.pageYOffset*1+150+"px" : iecompattest().scrollTop*1+150+"px"
			phonePreview.style.visibility = "visible";
			}
		}
	}
	xmlhttp.send(null);
}

function valid() {
	return true;
}
function validateShowAll(form, typeName,showAllName){
	var l = form.elements.length;
	
	var enableShowAll = true;
	for(var i=0; i<l; i++){
		var element = form.elements[i];
		if(element.name.indexOf(typeName) != -1 && element.checked){
			enableShowAll = false;
			
		}
	}
	
	form.elements[showAllName].checked = enableShowAll;
	
	enableAll(form, typeName,showAllName);
	return true;
}

function enableAll(form, typeName,showAllName){
	var l = form.elements.length;
	
	if (form.elements[showAllName].checked) {
	for(var i=0; i<l; i++){
		var element = form.elements[i];
		if(element.name.indexOf(typeName) != -1 && element.checked){
			element.checked = false;	
		}
	}
	}
}

function compareCounter_en(obj, testMin) {
	var cb = obj.id.substr(0,obj.id.lastIndexOf('_')+1);
	var ctr=0,i=1;
	var max=5;
	var min=2;
	
	//while(obj.form[cb+i]) {
	//	ctr += obj.form[cb+i].checked; i++;
	//}
	
	array_obj = document.getElementsByTagName("input"); 
	for (i=0; i<array_obj.length; i++) {		
		if (array_obj[i].type == 'checkbox') {
			if (array_obj[i].id.substr(0,2) == 'cb') {
				if (array_obj[i].checked) {
					ctr++;
				}
			}
		}
	}
	
	if (ctr > max) {
		obj.checked = false;
		alert('Only choose ' + max + ' checkboxes.\nTo pick this option unselect one of the others.');
	}
	if (testMin == 'minCheck') {
		if (ctr < min) {
			alert('Please choose between ' + min + ' and ' + max + ' checkboxes.');
			return false;
		}
	}
}

function compareCounter_es(obj, testMin) {
	var cb = obj.id.substr(0,obj.id.lastIndexOf('_')+1);
	var ctr=0,i=1;
	var max=5;
	var min=2;
	
	//while(obj.form[cb+i]) {
	//	ctr += obj.form[cb+i].checked;i++;
	//}
	
	array_obj = document.getElementsByTagName("input"); 
	for (i=0; i<array_obj.length; i++) {		
		if (array_obj[i].type == 'checkbox') {
			if (array_obj[i].id.substr(0,2) == 'cb') {
				if (array_obj[i].checked) {
					ctr++;
				}
			}
		}
	}
	
	if (ctr > max) {
		obj.checked = false;
		alert('Selecciona s\363lo ' + max + ' casillas.\nPara escoger esta opci\363n elimina alguna de las otras.');
	}
	if (testMin == 'minCheck') {
		if (ctr < min) {
			alert('Selecciona entre ' + min + ' y ' + max + ' casillas.');
			return false;
		}
	}
}

function populatePayType(x)
{
	if (document.dc.feapaytype) {
		document.dc.feapaytype.value = x;
	}
	document.dc.submit();
}
