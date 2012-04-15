var whatDefault	= new Array();

whatDefault['prod']	= '';
whatDefault['comp']	= 'Search for suppliers by name';
whatDefault['brand']	= 'Search for brand names like "Baldor"';
whatDefault['cad']	= 'Find product categories with CAD drawings';
whatDefault['web']	= "Search suppliers' websites";
whatDefault['whitepapers']	= "Search white papers";
whatDefault['news']	= "Search product news";


var srchForm	= document.searchform;
var srchType	= srchForm.which.value;
var srchStr	= trim(srchForm.what.value);

if(srchType == 'prod' && srchStr =='')	{ 
	srchForm.what.focus();
}

if(srchStr.length==0 && srchType!='prod'){
	srchForm.what.value	= whatDefault[srchType];
	txtColor= "#999";
	document.getElementById('what').style.color = txtColor;
}

function setWhat(form){
	curSrch	= trim(form.what.value);
	curType	= form.which.value;
	txtColor= "#000";
	if(curSrch==whatDefault[curType]){ form.what.value = ""; }
	document.getElementById('what').style.color = txtColor;
}

function validTnetSearch(search){
	search.what.value	= trim(search.what.value);
	curType	= search.which.value;
	if(search.what.value == whatDefault[curType] || search.what.value.length < 1){
		alert("Please enter a search term\n(Example: Valves)");
		return false;
	}
}

function subSearch(which){
	srchForm.what.value     = trim(srchForm.what.value);
	var defaultStr  = 0;

	var srchURL = new Array();
	var newURL      = "http://"+which+".thomasnet.com/";
	srchURL['news'] = "bigsearch.html?stype=news&query=";
	srchURL['whitepapers']  = "searchresults.html?what=";
	srchURL['forums']       = "search.php?mode=results&search_terms=any&search_forum=-1&search_time=0&search_fields=all&search_cat=-1&sort_by=0&sort_dir=DESC&show_results=topics&return_chars=200&search_keywords=";


	if(srchForm.what.value == whatDefault['prod'])  { defaultStr++; }
	if(srchForm.what.value == whatDefault['comp'])  { defaultStr++; }
	if(srchForm.what.value == whatDefault['brand']) { defaultStr++; }
	if(srchForm.what.value == whatDefault['cad'])   { defaultStr++; }
	if(srchForm.what.value == whatDefault['web'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['news'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['whitepapers'])   { defaultStr++; }
	if(defaultStr < 1 && srchForm.what.value.length > 0){
		newURL  = newURL+srchURL[which]+escape(srchForm.what.value);
	}
	location.href   = newURL;
}

function changeSearch(which, tnhead, imgfrag){
	srchForm.what.value	= trim(srchForm.what.value);
	var defaultStr	= 0;
	var newtab = "srchtab-"+which;
	var oldtab = "srchtab-"+srchForm.which.value;

	if(srchForm.what.value == whatDefault['prod'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['comp'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['brand'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['cad'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['web'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['news'])	{ defaultStr++; }
	if(srchForm.what.value == whatDefault['whitepapers'])	{ defaultStr++; }

	srchForm.which.value = which;

	if(defaultStr < 1 && srchForm.what.value.length > 0){
		srchForm.submit();
		return;
	} else {
		if(newtab!=oldtab){
			if(which!="prod"){
				document.getElementById('selcov').style.display = 'none';
				document.getElementById('what').style.width = '570px';
				document.getElementById('selcov').value='NA';
			} else {
				document.getElementById('what').style.width = '340px';
				document.getElementById('selcov').style.display = 'inline';
			}
			document.getElementById(oldtab).className = "";
			document.getElementById(newtab).className = "active";
			var bgimg	= "/images/bg/";
			if(tnhead > ''){ bgimg += tnhead+"_"; }
			bgimg += "nav_"+which+".png";
			bgimg	= "url("+bgimg+")";
			document.getElementById('searchcontainer').style.backgroundImage = bgimg;
		}
		srchForm.what.value	= whatDefault[which];
		if(which!="prod"){ txtColor= "#999"; }
		else { srchForm.what.focus(); }
		document.getElementById('what').style.color = txtColor;
	}
}

