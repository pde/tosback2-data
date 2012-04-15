<!--
/*
This is the include file used for dblclick check.
Please include this file and add a form similar to the one shown below in the page.
The form MUST have the name of dblclick.
  <form name="dblclick">
      <input type="hidden" name="submitTS" value="">
      <input type="hidden" name="submitClk" value="N">
      <input type="hidden" name="continueTS" value="">
      <input type="hidden" name="continueClk" value="N">
      <input type="hidden" name="cancelTS" value="">
      <input type="hidden" name="cancelClk" value="N">
  </form>
  
Place the following code on the A HREF or form onSubmit to check for double click.
The parameter passed for dblclickCheck and updateTimeStamp should match the field name in the
hidden field in form dblclick.

Example:

For A HREF:cat 
 	onClick="return dblclickCheck(this)" onDblClick="updateTimeStamp(document.dblclick.submitTS)"
For form submit
	On Action place
		onSubmit="return dblclickCheck(document.dblclick.submitTS,document.dblclick.submitClk)"
	On submit button place
		onDblClick="updateTimeStamp(document.dblclick.submitTS)
*/


// To Disbale Links 
var clickToggle = false;
var clickTime1 = 0;
var clickTime2 = 0;
var timeOut = 30000;
var t1;

function preventDef(  )  {

	for(f = 0; f < document.forms.length ; f++) {
		frm = document.forms[f];
			for(e = 0; e < frm.elements.length; e++) {
				elm = frm.elements[e];
				if (elm.type == 'submit' ){
					elm.disabled= false ;
				 	document.forms[f].elements[e].disabled = false ;
				 	//document.getElementById(elm.id).disabled = false ;
				 }
			}
	}
	//clearTimeOut(t1);
}
    
function dblclickCheck(obj)
{
	 obj.disabled= true ;
	 
 	 document.getElementById(obj.id).disabled = true ;
	 t1=setTimeout("preventDef()",timeOut);
	 document.getElementById(obj.id).form.submit();
 }

function doubleClickUrl(url) {

	var urlIdx = url.indexOf("URL=",0);
		if ( urlIdx != -1 ) {

			var urlPart1 = url.substr(0,urlIdx+4);
			var urlPart2 = escape(url.substr(urlIdx+4,url.length));
			url = "" ;
			url = urlPart1 ;
			url = url.concat(urlPart2);
		}
		
		
	if ( clickToggle == false )
	{
		var date = new Date();
		clickTime1 = date.getTime();
		clickToggle = true;
	}
	else
	{
		var date = new Date();
		clickTime2 = date.getTime();
		clickToggle = false;	
	}

	if ( Math.abs( clickTime1 - clickTime2 ) > timeOut )
	{
		window.location= url;
	}
	else
	{
		clickToggle = !clickToggle;
	}
}


//-->