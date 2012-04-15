var cururl	= location.href;
var frag	= cururl.split("thomasnet.com");
var curpage	= frag[1];

var whatDefault	= new Array();
whatDefault['supp']	= 'Search for suppliers';
whatDefault['products']	= 'Search for products';
whatDefault['cad']	= 'Find product categories with CAD drawings';
whatDefault['news']	= 'Search product news';
whatDefault['whitepapers']	= 'Search white papers';

var srchTypes	= new Array();
srchTypes['prod']	= 'supp';
srchTypes['comp']	= 'supp';
srchTypes['brand']	= 'supp';
srchTypes['products']	= 'products';
srchTypes['cad']	= 'cad';
srchTypes['news']	= 'news';
srchTypes['whitepapers']	= 'whitepapers';

var srchTypeUrl	= new Array();
srchTypeUrl['supp']	= '/';
srchTypeUrl['products']	= '/productsearch/';
srchTypeUrl['cad']	= '/cadmodels.html';
srchTypeUrl['news']	= 'http://news.thomasnet.com/';
srchTypeUrl['whitepapers']	= '/white-papers/';

var srchForm	= document.searchform;
var srchWhich	= srchForm.which.value;
if(!srchWhich){ srchWhich = 'prod'; }
var srchType	= srchTypes[srchWhich];
var srchStr	= trim(srchForm.what.value);

if(srchStr.length==0){
	srchForm.what.value	= whatDefault[srchType];
	txtColor= "#999";
	document.getElementById('what').style.color = txtColor;
}

function setWhat(form){
	curSrch	= trim(form.what.value);
	curType	= form.which.value;
	//alert(whatDefault[srchTypes[curType]]);
	txtColor= "#000";
	if(curSrch==whatDefault[srchTypes[curType]]){ form.what.value = ""; }
	document.getElementById('what').style.color = txtColor;
}

function validTnetSearch(search){
	search.what.value	= trim(search.what.value);
	curType	= srchTypes[search.which.value];
	if(search.what.value == whatDefault[curType] || search.what.value.length < 1){
		alert("Please enter a search term\n(Example: Valves)");
		return false;
	}
	if(curType=='supp'){
		for (Count = 0; Count < search.supptype.length; Count++){
			if(search.supptype[Count].checked){
				search.which.value = search.supptype[Count].value;
				break;
			}
		}
	}
}

function changeSearch(srchType, tnhead){
	var curtype	= srchTypes[srchForm.which.value];
	var q	= trim(srchForm.what.value);
	var defaultStr	= 0;
	if(q > ''){
		if(q == whatDefault['supp'])	{ defaultStr++; }
		else if(q == whatDefault['products'])	{ defaultStr++; }
		else if(q == whatDefault['cad'])	{ defaultStr++; }
		else if(q == whatDefault['news'])	{ defaultStr++; }
		else if(q == whatDefault['whitepapers'])	{ defaultStr++; }
	}
	// If no query string redirect to section "home" page
	if(q=='' || defaultStr > 0){
		if(curpage == srchTypeUrl[srchType]){
			return;
		} else if(srchTypeUrl[srchType].substring(0, 4)=="http"){
			window.open(srchTypeUrl[srchType], 'new', '');
		} else {
			location.href	= srchTypeUrl[srchType];
		}
	} else {
		if(curtype!=srchType){ srchForm.action="/results.html"; }
		if(srchType=='supp'){
			for (Count = 0; Count < srchForm.supptype.length; Count++){
				if(srchForm.supptype[Count].checked){
					srchForm.which.value = srchForm.supptype[Count].value;
					break;
				}
			}
		} else {
			srchForm.which.value = srchType;
		}
		srchForm.submit();
		return;
	}
}
