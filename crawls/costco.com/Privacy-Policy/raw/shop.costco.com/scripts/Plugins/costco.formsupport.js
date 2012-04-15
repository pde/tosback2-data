function DisallowEnter(e) 
{
	var key;
	if(window.event || !e.which) // IE
	{
		key = e.keyCode; // for IE, same as window.event.keyCode
	}
	else if(e) // netscape
	{
		key = e.which;
	}
	
	if (key == 13) //Enter key
		return false;
}
//For FSA
var objID;
 function showPopup(w,h,ctrlID)
	{
		var popUp = document.getElementById("popupcontent");
		var iframe = document.getElementById("iframetop");
		var baseText = null;
		objID = ctrlID.getAttribute("id");
		popUp.style.display =  "block";
		popUp.style.visibility = "visible";
		iframe.style.display = "inline";
		
		popUp.style.top = "150px";
		popUp.style.left= "50px";
		popUp.style.width = w + "px";
		popUp.style.height = h+ "px";

		iframe.style.width = w + "px";
		iframe.style.height = h+ "px";
		iframe.style.left = "50px";
		iframe.style.top = "150px";
		
		
		baseText = popUp.innerHTML;
		
		popUp.innerHTML = baseText;
		popUp.style.left = "50px";
		
		var focusOnDiv=document.getElementById('FocusOnDiv');
		if (focusOnDiv!=null)
		  focusOnDiv.value ='true';
		  
		 document.all('CloseWindow').focus(); 
	}
	
	function hidePopup()
	{    
		var popUp = document.getElementById("popupcontent");
		var iframe = document.getElementById("iframetop");
		
		popUp.style.display =  "none";
		popUp.style.visibility = "hidden";
		iframe.style.display = "none";
		var focusOnDiv=document.getElementById('FocusOnDiv');
			
		if (focusOnDiv!=null)
			  focusOnDiv.value ='false';
		 
		 if (document.getElementById(objID)!=null)
		 document.getElementById(objID).focus();
	}
	
	function ValidateDate()
	{	
		var FromMonth = document.getElementById("ddlFromMonth").value;
		var FromDay = document.getElementById("ddlFromDay").value;
		var FromYear = document.getElementById("ddlFromYear").value;
		
		var ToMonth = document.getElementById("ddlToMonth").value;
		var ToDay = document.getElementById("ddlToDay").value;
		var ToYear = document.getElementById("ddlToYear").value;
		
		var FromDate = new Date(FromMonth + "/" + FromDay  + "/" + FromYear);
		var ToDate = new Date(ToMonth + "/" + ToDay  + "/" + ToYear);
		
		
		if(CheckDate(FromMonth,FromDay,FromYear, 'start'))
			{	
				if(CheckDate(ToMonth,ToDay,ToYear,'end'))
				{   
					if(CompareDates(FromDate, ToDate))
						{
							return (CheckFromDateMorethan15Months(FromDate));
						}
				}
			}
		return false;
	}
	
	function CheckDate(Month, Day, Year, date )
	{  
		var dt = new Date(Month + "/" + Day  + "/" + Year);
		var msg = 'The ' + date + ' date you have selected is invalid.  Please check the date and try again..';
		
		if(dt.getDate()!= Day){
					alert(msg);
					return(false);
			}
			else if(dt.getMonth()!= Month - 1){
					//this is for the purpose JavaScript starts the month from 0
				alert(msg);
				return(false);
			}
			else if(dt.getFullYear()!= Year){
				alert(msg);
				return(false);
			} 
		return(true);
	}
	
	function CompareDates(FromDate, ToDate)
	{
		var FromDateValue = FromDate.getTime();
		var ToDateValue = ToDate.getTime();
		
		if(FromDateValue > ToDateValue)
			{
			alert('The start date you have selected is invalid.  Please check the date and try again..');
			return false;
			}
		return true;
	}
	
	function CheckFromDateMorethan15Months(FromDt)
	{	
		var today = new Date();
		var monthsfromNowday = new Date();
		
		monthsfromNowday.setMonth(today.getMonth() - 15);
		if(monthsfromNowday.getDate() < today)
		{
			monthsfromNowday.setDate(1);
			monthsfromNowday.setDate(today.getDate() - 1);
		}
		if(FromDt.getTime() < monthsfromNowday.getTime())
		{
			alert ('The dates you have selected exceed the 15 month limit.  Please check the dates and try again.');
			return false;
		} 
		return true;
	}

// This function toggles the radio button when clicking on the calendar icon
function ToggleDateRadioButton(radioButtonId)
{
	var radioElement = document.getElementById(radioButtonId);
	if (radioElement != undefined)
	{
		radioElement.checked = true;
	}
}
  
	
