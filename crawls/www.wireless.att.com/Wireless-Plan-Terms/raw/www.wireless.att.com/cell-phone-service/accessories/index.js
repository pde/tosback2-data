function updateSel() {
	  showElement ("modelSelectControl");
	  var manufacturer = getObj("manufacturerSel");	  
	  FilterService.getModels(manufacturer.value,createList);
	}
	function createList(data) {
	  DWRUtil.removeAllOptions("modelSel");
	  DWRUtil.addOptions("modelSel", data);
	  var selectedValue=getUrlParam("modelSel");
	  DWRUtil.setValue("modelSel", selectedValue, data);
	}
	function submitFilter() {
	  var manufacturer = getObj("manufacturerSel");
	  var model = getObj("modelSel");
	  FilterService.setProductId (model.value,idSetDone);
	}
	function sortByPrice() {
		document.accessory.submit();
	}	
	function idSetDone(data)
	{
		//DRW request is over
	    getObj("accessory").submit();
	}
	function chooseSelectedModel()
	{
		FilterService.getProductId(idSet);
	}
	function idSet(data)
	{
		//getObj("modelName").innerHTML = "Now showing: "+ data;
	}
	function getUrlParam( name )
	{
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var tmpURL = window.location.href;
	  var results = regex.exec( tmpURL );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	}

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

function showDisplayDeviceControl()	{
	var manufacturer = getObj("manufacturerSel");
	var xmlhttp = getHTTPRequest();
	xmlhttp.open("GET","/cell-phone-service/accessories/listPhoneImagesAJAX.jsp?manufacturerSel="+manufacturer.value);
	xmlhttp.onreadystatechange = function()
	{
	if (xmlhttp.readyState == 4) {
		var deviceDisplayDiv = document.getElementById("deviceDisplayDiv");
		deviceDisplayDiv.innerHTML = xmlhttp.responseText;
		// if the session expired, the AJAX div will try to load the expired session page. Test and redirect if so
		if (document.getElementById("expiredSession")) {
			window.location.href = "/cell-phone-service/get-started/expired-session.jsp";
			}
		else {
			deviceDisplayDiv.style.display = "inline";
			}
		}
	}
	xmlhttp.send(null);
}

