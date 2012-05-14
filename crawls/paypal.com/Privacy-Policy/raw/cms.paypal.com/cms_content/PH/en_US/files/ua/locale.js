
var link = window.location.href;
var lindex = link.lastIndexOf('&locale.x');


var language = null;
if(lindex != -1) {
	var language = link.substr(lindex + 10,5);
}

var flindex = link.lastIndexOf('&fli');
if(flindex != -1) {
var fli = link.substr(flindex+5,4);
}


function addlang() {
	var divs = document.getElementsByTagName("div");
	for(var k = 0;k < divs.length; k++) {
	    if(divs[k].id == 'page') {
		var el = divs[k].getElementsByTagName("a");
		for (var i=0;i<el.length;i++) {
		  if(language != null) {			
			
			if( el[i].href.lastIndexOf('cmd=_render-content&content_ID=ua/') != -1){
			
			  if( el[i].href.lastIndexOf('?') != -1){
			    if( el[i].href.lastIndexOf('&locale.x=') == -1){
			    	el[i].href = el[i].href + "&locale.x="  + language;
			    }
			  } else {
			    if( el[i].href.lastIndexOf('&locale.x=') == -1){
			    	el[i].href = el[i].href + "?locale.x="  + language;
			    }
			  }				
			
			
			  if(fli == 'true') {			
			    if(el[i].href.lastIndexOf('?') != -1){
			      if( el[i].href.lastIndexOf('&fli=') == -1){
			    	el[i].href = el[i].href + "&fli=true";
			      }
			    } else {
			      if( el[i].href.lastIndexOf('&fli=') == -1){
			    	el[i].href = el[i].href + "?fli=true";
			      }
			    }				
			  }			
		       }
			
			
		  }			
		}
	    }
	}
	if(language != null) {
		makeBold();
	}
}


var cindex = link.lastIndexOf('cgi-bin');
var country_code = link.substr(cindex-3,2);
function makeBold() {
	var select = document.getElementById('countryLocaleSelect');
	if(select!= null){
	  for(i=0; i< select.options.length;i++)	{
		var country_option = select.options[i].value.match("/"+ country_code + "/") ;
		var lang_option = select.options[i].value.match(language);
		
		if(fli == 'true') {				
			select.options[i].value = select.options[i].value + "&fli=true";
		}	
		
		if(country_option == "/"+ country_code + "/" && lang_option ==language) {
			select.options[i].selected = true;
		}
	  }
	}
}




function selectLocale() 
{

	var select = document.getElementById('countryLocaleSelect');	
	if(select!= null){
	select.onchange = function()
		{
			
			document.location.href = select.options[select.selectedIndex].value;	
		
		}		
	}
}


if (window.attachEvent)
{
	window.attachEvent('onload', addlang);
	window.attachEvent('onload', selectLocale);
}
else if (window.addEventListener) 
{
	window.addEventListener('load', addlang, false);
	window.addEventListener('load', selectLocale, false);	
}
else 
{
	document.addEventListener('load', addlang, false);
	document.addEventListener('load', selectLocale, false);	
} 








