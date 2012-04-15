/*requires email-editor.js*/
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

For A HREF:
 	onClick="return dblclickCheck(document.dblclick.submitTS,document.dblclick.submitClk)" onDblClick="updateTimeStamp(document.dblclick.submitTS)"
For form submit
	On Action place
		onSubmit="return dblclickCheck(document.dblclick.submitTS,document.dblclick.submitClk)"
	On submit button place
		onDblClick="updateTimeStamp(document.dblclick.submitTS)
*/

function updateTimeStamp(timestampField)
{
	var today = new Date();
	if (timestampField == null) {
    timestampField = new Date(today.toGMTString());
  }
  else {
    timestampField.value=today.toGMTString();
  }
}
function dblclickCheck(timestampField,clickedField)
{
    var today = new Date();
		if (timestampField != null) {
    	var timestamp = new Date(timestampField.value);
    }
    
    if (timestampField != null && clickedField.value == "Y" && (today.getTime() - timestamp.getTime() < 30000)) {
    	return false;
    }
    else {
    	updateTimeStamp(timestampField);
    	if (clickedField != null) {
    	  clickedField.value = "Y"
    	}
    	return true;
    }
}
function resetFlag()
{
    if(document.dblclick && document.dblclick != null) {
        var totalElement = document.dblclick.length;
        for (var i = 1; i < totalElement; i+=2)
        {
	    document.dblclick.elements[i].value="N";	
        }
    }
}
//-->