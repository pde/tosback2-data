var cururl	= location.href;
var frag	= cururl.split("thomasnet.com");
var curpage	= frag[1];

var whatDefault	= new Array();
whatDefault['supp']	= 'Search for suppliers';
whatDefault['products']	= 'Search for products';
whatDefault['cad']	= 'Find product categories with CAD drawings';
whatDefault['news']	= 'Search product news';
whatDefault['whitepapers']	= 'Search white papers';

var searchTypes	= new Array();
searchTypes['prod']	= 'supp';
searchTypes['comp']	= 'supp';
searchTypes['brand']	= 'supp';
searchTypes['unspsc']	= 'supp';
searchTypes['products']	= 'products';
searchTypes['cad']	= 'cad';
searchTypes['news']	= 'news';
searchTypes['whitepapers']	= 'whitepapers';

var searchTypeUrl	= new Array();
searchTypeUrl['supp']	= location.host=='ps.thomasnet.com' ? 'http://www.thomasnet.com/' : '/';
searchTypeUrl['products']	= '/productsearch/';
searchTypeUrl['cad']	= '/cadmodels.html';
searchTypeUrl['news']	= 'http://news.thomasnet.com/';
searchTypeUrl['whitepapers']	= '/white-papers/';


var searchForm	= document.getElementById('unspscsearchform');
var searchWhich	= searchForm.which.value;
if(!searchWhich){ searchWhich = 'prod'; }
var searchType	= searchTypes[searchWhich];
var searchStr	= trim(searchForm.what.value);

if(searchStr.length==0){
	searchForm.what.value	= whatDefault[searchType];
	var txtColor= "#999999";
	document.getElementById('what').style.color = txtColor;
}

function setWhat(){
	var what	= trim(searchForm.what.value);
	var curType	= searchForm.which.value;
	var txtColor	= "#363636";
	if(what==whatDefault[searchTypes[curType]]){ searchForm.what.value = ""; }
	document.getElementById('what').style.color = txtColor;
}


function tnetSearch(submitType, searchType){
	searchForm.what.value	= trim(searchForm.what.value);
	var cov	= document.getElementById('selcov');
	var what	= searchForm.what.value;
	var which	= searchForm.which.value;

	var Count	= 0;
	var subsearch	= "";
	var curType	= searchTypes[which];
	if(!searchType)	{ searchType = curType; }

	// see if text in search box is 'default' text
	var isdefault	= 0;
	for(var i in whatDefault) {
		var value = whatDefault[i];
		if(value==what){ isdefault=1; break; }
	}

	// no search term was provided
	if(what=='' || isdefault){
		if(submitType=='submit'){
			alert("Please enter a search term\n(Example: Valves)");
			searchForm.what.focus();
		} else if(curpage == searchTypeUrl[searchType]){
			return;
		} else {
			location.href	= searchTypeUrl[searchType];
		}
		return false;
	}

	// search term was provided
	searchForm.which.value = searchType;
	if(curType!=searchType){
		searchForm.action	= "/results.html";
		if(searchType=='supp')	{ searchForm.which.value  = 'prod'; }
		else { searchForm.which.value  = searchType; }
	} else if(searchType=='supp'){
		var opts	= searchForm.supptype;
		for(var i = 0; i < opts.length; i++){
			if(opts[i].checked){ subsearch=opts[i].value; break; }
		}
		searchForm.which.value = subsearch;
	} else if(searchType=='products'){
		var opts	= searchForm.pstype;
		for(var i = 0; i < opts.length; i++){
			if(opts[i].checked){ subsearch=opts[i].value; break; }
		}
	}
	covarea	= searchType=='products' || curType=='products' ? 'NA' : cov.value;
	if(subsearch=='unspsc'){
		var commodWhich	= searchType=='products' ? 'products' : 'unspsc'; 
		getUNSPSCresults(what, commodWhich, covarea);
		return false;
	} else if(searchType=='products'){
		searchForm.action	= '/productsearch/results.html';
	}
	searchForm.submit();
	return;
}
