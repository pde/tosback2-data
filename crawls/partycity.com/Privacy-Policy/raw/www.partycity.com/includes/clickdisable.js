function hPP(){
	if(jQuery('#searchBTN').length) {
		document.getElementById("searchBTN").disabled=true;
	}
	if(jQuery('#navsearchbox').length){
		document.getElementById("navsearchbox").readOnly=true;
	}
	jQuery("#sBlock").show();
	//document.focus();
}

function disableSearchBtn(){
	if(jQuery('#noSearchBTN').length){
		document.getElementById("noSearchBTN").disabled=true;
	} else {
		document.getElementById("searchBTN").disabled=true;
	}
	if(jQuery('#navsearchbox').length){
		document.getElementById("navsearchbox").readOnly=true;
	}
	if(jQuery('#navsearchboxSrch').length){
		document.getElementById("navsearchboxSrch").readOnly=true;
	}
	jQuery("#noResultBlock").show();
	//document.focus();
}