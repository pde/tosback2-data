function displayCountryCode(val, id) {
	if(typeof(val)=="undefined"){ 
		code="";
	}
	setText(val, id);
}

function setText(txt, id) {
	var elem;
	var holder = "";
	if(txt!=null && txt!="") {
		holder = "+"+txt;
	}
	if( document.getElementById  && (elem=document.getElementById(id)) ) {
		if( !elem.firstChild ) {
			elem.appendChild( document.createTextNode( holder ) );
		}	
		else {
			elem.firstChild.data = holder;					
		}	
	}		
	return false;
}
function showContextChooser()
{
var iframe = document.getElementById('context_all_IF');
var contextall = document.getElementById('context_all');
	//set value of current country and currency
	var selectCountry = document.forms['context_chooser'].elements['countrySelect']; 
	var countryOptions = countyOptions;
	//selectCountry.options.length =0
	for(var i=0;countryOptions[i]!=null;i++) {
		selectCountry.options[i] = new Option();
		selectCountry.options[i].text=countryOptions[i].text;
		selectCountry.options[i].value=countryOptions[i].value;
		selectCountry.options[i].selected=countryOptions[i].selected;
		selectCountry.options[i].title=countryOptions[i].title;
	}
	if(selectCountry.refresh!=undefined)
		selectCountry.refresh();

	setCurrency(selectCountry);
	var selectCurrency = document.forms['context_chooser'].elements['currency']; 
	if (selectCurrency.options!=null){
		selectCurrency.value=current_currency;
	}
	
	document.getElementById('error_div').style.display='none';
	
	var fiftyOne = document.getElementById("51");
    var el = document.getElementById("displayContextChoser");
    
	if (el.style.display == 'none' || el.style.display == '') 
	{
		fiftyOne.style.display = 'none';
		el.style.display = 'block';
		iframe.style.display = 'block';
		iframe.style.width = contextall.offsetWidth;//"464px";
		iframe.style.height = contextall.offsetHeight;
		iframe.style.left = contextall.offsetLeft;
		iframe.style.right = "0px";
		iframe.style.top = "35px";
		showWraper();
	}
	else 
	{
		el.style.display = 'none';
		iframe.style.display = 'none';
		hideWraper();
	}
	
	if (document.forms['context_chooser'].elements['countrySelect'].refresh!=undefined){
	document.forms['context_chooser'].elements['countrySelect'].refresh();
	}
	if (document.forms['context_chooser'].elements['currency'].refresh!=undefined){
	document.forms['context_chooser'].elements['currency'].refresh();
	//showWraper();
}
}
