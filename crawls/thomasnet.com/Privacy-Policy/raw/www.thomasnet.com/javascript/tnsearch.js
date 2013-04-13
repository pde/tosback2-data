var cururl	= location.href;
var frag	= cururl.split("thomasnet.com");
var curpage	= frag[1];

var whatDefault	= new Array();
whatDefault['supp'] = whatDefault['prod']	= 'Enter a product/service category (example: Gears)';
whatDefault['cert']	= 'Enter a product/service category (example: Gears)';
whatDefault['products']	= whatDefault['spec'] = 'Enter a product specification or keyword (example: 12 v dc motor)';
whatDefault['cad']	= 'Enter a product to find catalogs with downloadable CAD Drawings (example: Gears)';
whatDefault['news']	= 'Enter keywords to search product news';
whatDefault['whitepapers']	= 'Enter keywords to search our white papers and case studies library';
whatDefault['comp']	= 'Enter a company name (example: ABC Supply Co.)';
whatDefault['brand']	= 'Enter a brand name (example: Reliance)';
whatDefault['unspsc']	= 'Enter a code or name (example: 27131508)';
whatDefault['partno']	= 'Enter a Part Name or Number (example: VRBM3558T)';

var searchTypes	= new Array();
searchTypes['prod']	= 'supp';
searchTypes['comp']	= 'supp';
searchTypes['brand']	= 'supp';
searchTypes['unspsc']	= 'supp';
searchTypes['products']	= 'products';
searchTypes['cad']	= 'cad';
searchTypes['news']	= 'news';
searchTypes['whitepapers']	= 'whitepapers';
searchTypes['cert']	= 'cert';

var searchTypeUrl	= new Array();
searchTypeUrl['supp']	= '/suppliers/';
searchTypeUrl['products']	= '/productsearch/';
searchTypeUrl['cad']	= '/cadmodels.html';
searchTypeUrl['news']	= 'http://news.thomasnet.com/';
searchTypeUrl['whitepapers']	= '/white-papers/';
searchTypeUrl['cert']	= '/certifications/';


var searchForm	= document.getElementById('unspscsearchform');
var searchWhich	= searchForm.which.value;
if(!searchWhich){ searchWhich = 'prod'; }
var searchType	= searchTypes[searchWhich];
var searchStr	= trim(searchForm.what.value);

if(searchStr.length==0){
	searchForm.what.value	= whatDefault[searchType];
	var txtColor= "#999999";
	document.getElementById('tnwhat').style.color = txtColor;
}

var radioOn	= new Image();
var radioOff	= new Image();

function isDefaultSearch(what){
	// see if text in search box is 'default' text
	for(var i in whatDefault) {
		var value = whatDefault[i];
		if(value==what){ return true; }
	}
	return false;
}

function chkRadio(id,name) {
	var which	= searchForm.which.value;
	var what	= searchForm.what.value;
	radioOn.src	= "/images/header/"+searchTypes[which]+"_radio_on.png";
	radioOff.src	= "/images/header/"+searchTypes[which]+"_radio_off.png";

	var isdefault	= isDefaultSearch(what);

	for(var i = 0; i < searchForm.length; i++ ) {
		if(searchForm[i].name == name) {
			document.getElementById(searchForm[i].id).checked = false;
			document.getElementById("i"+searchForm[i].id).src = radioOff.src;
		}
	}
	if(isdefault)	{ searchForm.what.value = whatDefault[document.getElementById(id).value]; }
	document.getElementById(id).checked = true;
	document.getElementById("i"+id).src = radioOn.src;
	return false;
}

function setWhat(){
	var what	= trim(searchForm.what.value);
	var curType	= searchForm.which.value;
	var txtColor	= "#363636";
	var isdefault	= isDefaultSearch(what);
	if(isdefault){ searchForm.what.value = ""; }
	document.getElementById('tnwhat').style.color = txtColor;
}

function tnetSearch(submitType, searchType){
	searchForm.what.value	= trim(searchForm.what.value);
	var cov	= document.getElementById('tncov');
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
	} else if(searchType=='cert'){
		searchForm.action = '/certifications/search.html';
	}

	searchForm.submit();
	return;
}
