function postsizesearch(frm, prod_tp){
	ajax = getHTTPObject();
	var actionURL = sizeSearchActionURL;
	var frmValues = getFormValues(frm);
   	postAjaxForm(frmValues, actionURL, function(){update_size_search(document.getElementById(prod_tp + '_size_search'))});
}
function getsizesearch(actionURL, prod_tp){
	ajax = getHTTPObject();
   	loadXMLDoc(actionURL, function(){update_size_search(document.getElementById(prod_tp + '_size_search'))});
}
function update_size_search(cont) {
	var container = new Object();
	container = cont;
	switch (ajax.readyState) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;				
		case 4:
   			if (ajax.status != 200) return;
			insertFragment(container,getFieldFromContent("content",ajax.responseText));
	}
}
