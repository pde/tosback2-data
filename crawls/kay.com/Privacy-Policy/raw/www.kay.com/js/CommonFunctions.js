var bOldBrowser=false;
var strAdditionalMessage="";
var firstNameWhitelist = " '";
var lastNameWhitelist = " '";
var addressWhitelist = "#.,'-/ ";
var cityWhitelist = " '";

var sb;
sb=0;
if ( ! document.layers && ! document.all ) 
{
  sb=1;
}
//determines which stylesheet to write based on 
//browser/platform combination.  Also sets global
//variable bp for browser/platform testing elsewhere.
if (!sb) {
	if (navigator.platform.indexOf('Mac') > -1) {
		//mac
		if (navigator.appName.indexOf('Microsoft') > -1) {
		  //explorer
		  bp="iemac"
		  
		} 
		else 
		{
		  //netscape
		  bp="nsmac"
		  if (is_major<=4){
		 	bOldBrowser=true;
		  }
		}
	} 
	else 
	{
		//windows or unix
		if (navigator.appName.indexOf('Microsoft') > -1) {
		  //explorer
		  bp="iewin"
		  
		} 
		else 
		{
		  //netscape
		  bp="nswin";  
   		  var is_major = parseInt(navigator.appVersion);
    		  if (is_major<=4){
		 	bOldBrowser=true;
		  }
		}
	}  
}

/*******************************************************
 * Author:  		Jason Garrett
 * Description:		This file contains helper javascript methods that
 *			can be used by the entire store.
 * Date:		9-24-01
 *******************************************************/

/******************************************************
 * Selects an option in a drop down box with the
 * given key
 ******************************************************/
function SetSelectedOption(oFormObj, szKey)
{
   var iLoopCount;
   var szValue;

   for (iLoopCount = 0; iLoopCount <= oFormObj.length; iLoopCount++)
   {
	szValue = oFormObj[iLoopCount].value;
	if (szValue == szKey)
	{
	   oFormObj.selectedIndex = iLoopCount;
	   break;
	}
   }
}

/******************************************************
 * Checks to make sure address line 1 is valid
 ******************************************************/
function IsValidAddressLine1(oFieldValue, szInputFieldName, szErrorColor)
{
	var bValidAddress = true;
	
	if(oFieldValue.length < 3){
		bValidAddress = false;
	}else{
		if(!isAlphaNumeric(oFieldValue, "#.,' "))
			bValidAddress = false;
			
		var re = new RegExp("[a-zA-Z]");
  		if (!oFieldValue.match(re))
  			bValidAddress = false;	
	}
	
	if(!bValidAddress)
		changeFieldColor(szInputFieldName, szErrorColor);
	
	return bValidAddress;
}

/******************************************************
 * Checks to make sure city is valid
 ******************************************************/
function IsValidCity(oFieldValue, szInputFieldName, szErrorColor)
{
	var bValidAddress = true;
	
	if(oFieldValue.length < 2 || !isAlpha(oFieldValue, " '")){
		bValidAddress = false;
		changeFieldColor(szInputFieldName, szErrorColor);
	}
	
	return bValidAddress;

}

/******************************************************
 * Checks to make sure the email address is valid
 ******************************************************/
function IsValidEmail(oFieldValue, szInputFieldName, errorMessage)
{
	var iAtFound = 0;
	var iDotFound = 0;
	var bValidEmail = true;

	oFieldValue = trim(oFieldValue);
	
		//modified email validation : start - 06/22/2009
	var at="@"
	var dot="."
		
	var lat=oFieldValue.indexOf(at);
		var lstr=oFieldValue.length;
		var ldot=oFieldValue.indexOf(dot);
			if (oFieldValue.indexOf(at)==-1){
				bValidEmail = false;
			}
		if (oFieldValue.indexOf(at)==-1 || oFieldValue.indexOf(at)==0 || oFieldValue.indexOf(at)==lstr){
		   bValidEmail = false;
		  
		}
		if (oFieldValue.indexOf(dot)==-1 || oFieldValue.indexOf(dot)==0 || oFieldValue.indexOf(dot)==lstr){
		   bValidEmail = false;
		}
		 if (oFieldValue.indexOf(at,(lat+1))!=-1){
		   bValidEmail = false;
		 }
		  if (oFieldValue.substring(lat-1,lat)==dot || oFieldValue.substring(lat+1,lat+2)==dot){
		     bValidEmail = false;
		 }
		  if (oFieldValue.indexOf(dot,(lat+2))==-1){
		     bValidEmail = false;
		 }
		  if (oFieldValue.indexOf(" ")!=-1){
		   bValidEmail = false;
		 }
		
		//modified email validation :  end 
	
	if (oFieldValue.length > 0)
	{
		for (m=0; m <= oFieldValue.length - 1 ; m++)
		{
        	if (oFieldValue.charAt(m) == ' ')
			{
				bValidEmail = false;
			}
        	
        	if (oFieldValue.charAt(m) == '@')
			{
				iAtFound += 1;
				if(m == 0){
					bValidEmail = false;
				}
			}

			if (oFieldValue.charAt(m) == '.')
			{
				iDotFound += 1;
			}
		}

		if (iAtFound != 1 || iDotFound < 1)
		{
			bValidEmail = false;
		}
		
		if(!bValidEmail && szInputFieldName != null && errorMessage != null){
			//	changeFieldColor(szInputFieldName, szErrorColor);
			document.getElementById(szInputFieldName).className="error-color-input";
			document.getElementById("errorMessagesJavaScript").innerHTML = "<p class='register-error-alert pull_1'>ATTENTION! : "+errorMessage+"</p>";
			document.getElementById("errorMessagesJavaScript").display="block";
		}
	}

	return (bValidEmail);
}

/******************************************************
 * Checks to make sure the email address is valid - function overload. creating this to just rturn true or false.
 ******************************************************/
function IsValidEmail(oFieldValue)
{
	var iAtFound = 0;
	var iDotFound = 0;
	var bValidEmail = true;

	oFieldValue = trim(oFieldValue);
	
		//modified email validation : start - 06/22/2009
	var at="@"
	var dot="."
		
	var lat=oFieldValue.indexOf(at);
		var lstr=oFieldValue.length;
		var ldot=oFieldValue.indexOf(dot);
			if (oFieldValue.indexOf(at)==-1){
				bValidEmail = false;
			}
		if (oFieldValue.indexOf(at)==-1 || oFieldValue.indexOf(at)==0 || oFieldValue.indexOf(at)==lstr){
		   bValidEmail = false;
		  
		}
		if (oFieldValue.indexOf(dot)==-1 || oFieldValue.indexOf(dot)==0 || oFieldValue.indexOf(dot)==lstr){
		   bValidEmail = false;
		}
		 if (oFieldValue.indexOf(at,(lat+1))!=-1){
		   bValidEmail = false;
		 }
		  if (oFieldValue.substring(lat-1,lat)==dot || oFieldValue.substring(lat+1,lat+2)==dot){
		     bValidEmail = false;
		 }
		  if (oFieldValue.indexOf(dot,(lat+2))==-1){
		     bValidEmail = false;
		 }
		  if (oFieldValue.indexOf(" ")!=-1){
		   bValidEmail = false;
		 }
		
		//modified email validation :  end 
	
	if (oFieldValue.length > 0)
	{
		for (m=0; m <= oFieldValue.length - 1 ; m++)
		{
        	if (oFieldValue.charAt(m) == ' ')
			{
				bValidEmail = false;
			}
        	
        	if (oFieldValue.charAt(m) == '@')
			{
				iAtFound += 1;
				if(m == 0){
					bValidEmail = false;
				}
			}

			if (oFieldValue.charAt(m) == '.')
			{
				iDotFound += 1;
			}
		}

		if (iAtFound != 1 || iDotFound < 1)
		{
			bValidEmail = false;
		}
		
	
	}

	return (bValidEmail);
}

/******************************************************
 * Checks to make sure the phone number is valid
 ******************************************************/
function IsValidPhone(szPhoneNumber, szInputFieldName, szErrorColor)
{	
	var bValidPhone = true;

	if (szPhoneNumber != null && szPhoneNumber != "")
	{
		if (validateDigit(szPhoneNumber) == false)
			bValidPhone = false;
		else if (szPhoneNumber.length < 10)
			bValidPhone = false;
		else if(szPhoneNumber.substring(0,3) == "900")
			bValidPhone = false;
		//else if(szPhoneNumber.substring(3,6) == "555")
		//	bValidPhone = false;
		else if(parseInt(szPhoneNumber.substring(0,1)) < 2)
			bValidPhone = false;
		else if(parseInt(szPhoneNumber.substring(3,4)) < 2)
			bValidPhone = false;
			
		if (!bValidPhone)
		{
			changeFieldColor(szInputFieldName, szErrorColor);
		}
	}

	return (bValidPhone);
}


/******************************************************
 * Checks to make sure the phone number is valid
 ******************************************************/
function IsValidPhone(szPhoneNumber)
{	
	var bValidPhone = true;

	if (szPhoneNumber != null && szPhoneNumber != "")
	{
		if (validateDigit(szPhoneNumber) == false)
			bValidPhone = false;
		else if (szPhoneNumber.length < 10)
			bValidPhone = false;
		else if(szPhoneNumber.substring(0,3) == "900")
			bValidPhone = false;
		//else if(szPhoneNumber.substring(3,6) == "555")
		//	bValidPhone = false;
		else if(parseInt(szPhoneNumber.substring(0,1)) < 2)
			bValidPhone = false;
		else if(parseInt(szPhoneNumber.substring(3,4)) < 2)
			bValidPhone = false;
			
		
	}

	return (bValidPhone);
}


/******************************************************
 * Checks to make sure the zip code is valid
 ******************************************************/
function IsValidZipCode(szZipCode, szInputFieldName, className, errorMessage)
{	
	var bValidZipCode = true;

	if (szZipCode != null && szZipCode != "")
	{
		if (validateDigit(szZipCode) == false)
			bValidZipCode = false;
		
		if (szZipCode.length != 5 && szZipCode.length != 9)
			bValidZipCode = false;

		if (!bValidZipCode)
		{
			//changeFieldColor(szInputFieldName, szErrorColor);
			document.getElementById(szInputFieldName).className=className;
			document.getElementById("errorMessagesJavaScript").innerHTML = "<p class='register-error-alert pull_1'>ATTENTION! : "+errorMessage+"</p>";
			document.getElementById("errorMessagesJavaScript").style.display="block";
		}
	}

	return (bValidZipCode);
}


/******************************************************
 * Checks to make sure the zip code is valid
 ******************************************************/
function IsValidZipCode(szZipCode, szInputFieldName, szErrorColor)
{	
	var bValidZipCode = true;

	if (szZipCode != null && szZipCode != "")
	{
		if (validateDigit(szZipCode) == false)
			bValidZipCode = false;
		
		if (szZipCode.length != 5 && szZipCode.length != 9)
			bValidZipCode = false;

		if (!bValidZipCode)
		{
			changeFieldColor(szInputFieldName, szErrorColor);
		}
	}

	return (bValidZipCode);
}

/******************************************************
 * Checks to make sure the zip code is valid
 ******************************************************/
function IsValidZipCode(szZipCode)
{	
	var bValidZipCode = true;

	if (szZipCode != null && szZipCode != "")
	{
		if (validateDigit(szZipCode) == false)
			bValidZipCode = false;
		
		if (szZipCode.length != 5 && szZipCode.length != 9)
			bValidZipCode = false;

		
	}

	return (bValidZipCode);
}


/******************************************************
* Checks to make sure a string is alphanumeric.
* param strInput: string to be validated
* param strWhitelist: non-alphanumeric exceptions
******************************************************/
function isAlphaNumeric(strInput, strWhitelist){
	var re = /[^A-z*0-9*\s*\.*\-*\/*]/g;
	if (strInput.match(re)) return false;
	return true;
}

/******************************************************
* Checks to make sure a string is alpha.
* param strInput: string to be validated
* param strWhitelist: non-alpha exceptions
******************************************************/
function isAlpha(strInput, strWhitelist){
	var re = /[^A-z*\.*\s*\-*\/*]/g;
	if (strInput.match(re)) return false;
	return true;
}

/******************************************************
 * Checks to make sure the ssn is valid
 ******************************************************/
function IsValidSSN(szSSN, szInputFieldName, szErrorColor)
{	
	var bValidSSN = true;

	var invalid = new Array(
		"111111111", "222222222", "333333333",
		"444444444", "555555555", "666666666",
		"777777777", "888888888", "999999999",
		"012345678", "123456789", "010101010",
		"101010101", "040555555", "112233445", 
		"111223333", "121212121", "123123123",
		"145555555", "144444444", "145555555",
		"212121212", "302446639", "398888888",
		"399999999", "555121212", "555125555");
		
	if (szSSN != null && szSSN != "")
	{
		if (validateDigit(szSSN) == false)
			bValidSSN = false;
		else if (szSSN.length !=9)
			bValidSSN = false;
		else if(!szSSN == "0000000000"){
			if(szSSN.substring(0,3) == "000")
				bValidSSN = false;
			else if(szSSN.substring(3,5) == "00")
				bValidSSN = false;
			else if(szSSN.substring(5,9) == "0000")
				bValidSSN = false;
		}
		
		for(i in invalid){
			if(szSSN == invalid[i])
				bValidSSN = false;
		}
		
		if (!bValidSSN)
		{
			changeFieldColor(szInputFieldName, szErrorColor);
		}
	}

	return (bValidSSN);
}

/******************************************************
 * Checks to make sure the date is valid.  This function checks
 * dates that are split into month, day, and year.
 ******************************************************/
function IsDateValid(szMonth, szDay, szYear)
{
	var bValidDate = true;
	var iValuesProvided = 0;

	if (szMonth != null && szMonth != "" && szMonth!= 'MM')
	{
		iValuesProvided ++;
		if (validateDigit(szMonth) == false)
			bValidDate = false;
		else if (parseInt(szMonth,10) <= 0 || parseInt(szMonth,10) > 12)
			bValidDate = false;
		else if (szMonth.length < 2)
			bValidDate = false;
	}
	
	if (szDay != null && szDay != "" && szDay != 'DD')
	{
		iValuesProvided ++;
		if (validateDigit(szDay) == false)
			bValidDate = false;
		else if (parseInt(szDay,10) <= 0 || parseInt(szDay,10) > 31)
			bValidDate = false;
		else if (szDay.length < 2)
			bValidDate = false;
	}
	
	if (szYear != null && szYear != "" && szYear != 'YYYY')
	{
		iValuesProvided ++;
		if (validateDigit(szYear) == false)
			bValidDate = false;
		else if (szYear.length < 4)
			bValidDate = false;
	}

	if (iValuesProvided > 0 && iValuesProvided < 3)
		bValidDate = false;

	return (bValidDate);
}

/******************************************************
 * Checks to make sure the date is valid.  This function checks
 * dates that are split into month, day, and year.
 ******************************************************/
function IsValidDate(szMonth, szDay, szYear, szInputFieldName, szErrorColor)
{
	var bValidDate = true;
	var iValuesProvided = 0;

	if (szMonth != null && szMonth != "")
	{
		iValuesProvided ++;
		if (validateDigit(szMonth) == false)
			bValidDate = false;
		else if (parseInt(szMonth,10) <= 0 || parseInt(szMonth,10) > 12)
			bValidDate = false;
		else if (szMonth.length < 2)
			bValidDate = false;
	}
	
	if (szDay != null && szDay != "")
	{
		iValuesProvided ++;
		if (validateDigit(szDay) == false)
			bValidDate = false;
		else if (parseInt(szDay,10) <= 0 || parseInt(szDay,10) > 31)
			bValidDate = false;
		else if (szDay.length < 2)
			bValidDate = false;
	}
	
	if (szYear != null && szYear != "")
	{
		iValuesProvided ++;
		if (validateDigit(szYear) == false)
			bValidDate = false;
		else if (szYear.length < 4)
			bValidDate = false;
	}

	if (iValuesProvided > 0 && iValuesProvided < 3)
		bValidDate = false;

	if (!bValidDate)
	{
		changeFieldColor(szInputFieldName, szErrorColor);
	}

	return (bValidDate);
}

/******************************************************
 * Checks to make sure the date is valid.  This function checks
 * dates that are split into month, day, and year. This is an overload method created for Redesign 3. After enough testing, the old method can be deleted
 ******************************************************/
function IsValidDate(szMonth, szDay, szYear, errorClassName)
{
	var bValidDate = true;
	var iValuesProvided = 0;
	var szMonthId= szMonth.id;
	var szDayId= szDay.id;
	var szYearId= szYear.id;
	var szMonthValue= szMonth.value;
	var szDayValue= szDay.value;
	var szYearValue= szYear.value;

	if (szMonthValue != null && szMonthValue != "" && szMonthValue != "MM")
	{
		iValuesProvided ++;
		if (validateDigit(szMonthValue) == false)
			bValidDate = false;
		else if (parseInt(szMonthValue,10) <= 0 || parseInt(szMonthValue,10) > 12)
			bValidDate = false;
		else if (szMonthValue.length < 2)
			bValidDate = false;
	}
	
	if (szDayValue != null && szDayValue != "" && szDayValue != "DD")
	{
		iValuesProvided ++;
		if (validateDigit(szDayValue) == false)
			bValidDate = false;
		else if (parseInt(szDayValue,10) <= 0 || parseInt(szDayValue,10) > 31)
			bValidDate = false;
		else if (szDayValue.length < 2)
			bValidDate = false;
	}
	
	if (szYearValue != null && szYearValue != "" && szYearValue !="YYYY")
	{
		iValuesProvided ++;
		if (validateDigit(szYearValue) == false)
			bValidDate = false;
		else if (szYearValue.length < 4)
			bValidDate = false;
	}

	if (iValuesProvided > 0 && iValuesProvided < 3)
		bValidDate = false;

	if (!bValidDate)
	{
		//changeFieldClass(szInputFieldName, szErrorColor);
		document.getElementById(szMonthId).className=errorClassName;
		document.getElementById(szDayId).className=errorClassName;
		document.getElementById(szYearId).className=errorClassName;
		
	}

	return (bValidDate);
}


/******************************************************
 * Formats a string with a specified number of leading
 * characters
 ******************************************************/
function FormatLeadingChar(szValue, iMaxLength, szLeadChar)
{
	var iDiff = 0;
	var szFinalVal = "";

	if (szValue != null && szValue != "")
	{
		if (szValue.length < iMaxLength)
		{
			iDiff = iMaxLength - szValue.length;
			for (i = 0; i < iDiff; i++)
			{
				szFinalVal = szFinalVal + szLeadChar;	
			}
			szFinalVal = szFinalVal + szValue;
		}
		else
			szFinalVal = szValue;	
	}

	return (szFinalVal)
}

/******************************************************
 * Changes the color of the given HTML element
 ******************************************************/
function changeFieldColor(szFieldName, szColor)
{
	var weight = "normal";
	
	//if color is red there is an error
	if(szColor.toLowerCase()=="red"){
		weight = "bold";
	}
	
	//if old browser (ex. ns 4.7) - add the name of the span
	// which we were going to change colors of, to error message
	if (bOldBrowser) {
		//if color is red there is an error - add to error message
		if(szColor.toLowerCase()=="red"){
			var szAltFieldName;
			szAltFieldName=szFieldName;
			weight = "bold";
			
			//strip out rqd_ and rqd from field name
			if (szAltFieldName.substring(0,4) == "RQD_") 
			{
				szAltFieldName = szAltFieldName.substring(4, parseInt(szAltFieldName.length));
			}
			if (szAltFieldName.substring(0,3) == "RQD") 
			{
				szAltFieldName = szAltFieldName.substring(3, parseInt(szAltFieldName.length));
			}
			if(szAltFieldName.indexOf("Span")>-1){
				szAltFieldName = szAltFieldName.substring(0, szAltFieldName.indexOf("Span"));
			}

			//format name so it looks good - i.e. capitalize - remove "_", etc...
			var i;
			var strWords=szAltFieldName.split("_");
			var strCap;
			szAltFieldName="";
			for (i=0;i<=strWords.length-1;i++){
				if(i>0){
					szAltFieldName=szAltFieldName + " ";
				}
				strCap=strWords[i];
				strCap=strCap.substr(0,1).toUpperCase() + strCap.substr(1,strCap.length-1);
				szAltFieldName=szAltFieldName + strCap;
			}

			//see if field already in error message
			if(strAdditionalMessage.indexOf(szAltFieldName)==-1){

				//if not, add
				if (strAdditionalMessage.length>0){	
					//if there is already something in it, add a comma
		 			strAdditionalMessage=strAdditionalMessage + ", ";
				}
 				
				
				//add field name
				strAdditionalMessage=strAdditionalMessage + szAltFieldName;
			}
		}
		else{
			//otherwise - no error - clear out error msg
 			strAdditionalMessage="";
		}
		return;
	};

	if (document.getElementById) 
	{
		
		if(document.getElementById(szFieldName) != null){
			document.getElementById(szFieldName).style.color = szColor;
			document.getElementById(szFieldName).style.fontWeight = weight;
		}
	}
	else if (document.layers)
	{
		document[szFieldName].bgColor = szColor;
		document[szFieldName].style.fontWeight = weight;
	}
	else if (document.all)
	{
		document.all[szFieldName].style.color = szColor;
		document.all[szFieldName].style.fontWeight = weight;
	}
}

/******************************************************
 * Dynamically places text on the HTML page using the
 * given HTML element
 ******************************************************/
function changeFieldText(szFieldName, szText)
{
	if (bOldBrowser){
		alert(szText+ "\n\n" + strAdditionalMessage);
	}
		else{
		if (document.getElementById)
		{
			document.getElementById(szFieldName).innerHTML = szText;
		}
		else if (document.all)
		{
			document.all[szFieldName].innerHTML = szText;
		}
		else if (document.layers)
		{
			document.layers[szFieldName].document.open();
			document.layers[szFieldName].document.write(szText);
			document.layers[szFieldName].document.close();
		}
	}
}

/******************************************************
 * Checks to see if all characters in the given
 * field are digits
 ******************************************************/
function validateDigit(oFieldValue)
{
	var bIsDigit = true;

	for (i=0;i<=oFieldValue.length-1;i++)
	{
		if (oFieldValue.charAt(i) >= '0' && oFieldValue.charAt(i) <='9')
		{}
		else
		{
			bIsDigit = false;
			break;
		}
	}

	return (bIsDigit);
}

/******************************************************
 * Determines if an HTML text field is empty.
 ******************************************************/
function isTextEmpty(oTextField)
{
	var szFieldValue = oTextField.value;

	// Trim the string in a while loop
	while('' + szFieldValue.charAt(0) == ' ')
	{
		szFieldValue = szFieldValue.substring (1, szFieldValue.length);
	}

	if (szFieldValue == '')
	{
		return true; // the text field is empty
	}

	return false; // the text is not empty
}

/******************************************************
 * Determines if an HTML select field is empty.
 ******************************************************/
function isSelEmpty(oFormField)
{
	var iIndex = oFormField.selectedIndex;
	var szValue = oFormField[iIndex].value;
	
	// Either no option is selected or a default value is selected
	// For default values, this functions expects its value to be "000"
	if ( ( iIndex == 0 ) || (szValue == "") )
	{
		return true; // the select is empty
	}

	return false; // the select is not empty
}

/******************************************************
 * Checks for required fields that are missing.  It determines
 * which fields are required by examining the field's name
 * for a particular identifier.
 ******************************************************/
function RQDFieldCheck(theForm) 
{
	//alert("Inside RQDFieldCheck");
	var oFormObj;		// The current field of the form
	var iFailCount = 0;	// The number of fields that failed validation
	var oFieldArray = new Array();	// holds fields that failed validation

	if (document.images) 
	{
		for (i = 0; i < theForm.length; i++) 
		{
			oFormObj = theForm.elements[i];	
			if (oFormObj.getAttribute('id') && oFormObj.id.substring(0,3) == "RQD") 
			{
				// Dealing with a text field
				if (oFormObj.type == "text" || oFormObj.type == "textarea" || oFormObj.type == "password")
				{
					if (isTextEmpty (oFormObj))
					{
						oFieldArray[iFailCount] = oFormObj.name;
						iFailCount++;
					}
				} 						
				// Dealing with a Select field
				else if (oFormObj.type.toString().charAt(0) == "s")
				{
					if (isSelEmpty(oFormObj))
					{
						oFieldArray[iFailCount] = oFormObj.name;
						iFailCount++;
					}
				}				
			}
		}
	}
	
	return (oFieldArray);
}

function StripNum(Val)   {
   //  Remove decorations (commas, dollar signs) from number
   var RefString = "-.0123456789"; 
   var TempChar; 
   var  OutString = "";
   Val = "" + Val; // Make sure Val is character string
   // Only keep chars in Val that are valid numeric chars (i.e. in "RefString")
   if(Val.length == 0) return ("");
   for (var i=0; i<Val.length; i++){
      TempChar=Val.substring(i, i+1);
      if (RefString.indexOf (TempChar, 0) != -1) OutString=OutString+TempChar; // TempChar is valid number
   }
   return (OutString);
}


function isMoneyFmt (FormObj)  {
   // Return false if Field isn't in Money Format or empty"
   // Also reformat to $xxx.xx format
   var Val=FormObj.value;
   if (Val.length==0) return(true);
   Val=parseFloat(Val)
   if (isNaN(Val)) {
    return(false);
   }
   FormObj.value=roundto(.01,Val);
   return true;
}


function roundto(Factor,Num)   {
   // Round "Num" to nearest "Factor"
   /*    Ex: roundto (100, 2532)      --> 2500    (for nearest 100)
         roundto (1, 252.4284)    --> 252     (for nearest whole number)
         roundto (.01, 252.4284)  --> 252.43  (for dollars & cents)
         roundto (.125, 252.4284) --> 252.375 (for nearest 1/8th of a point)
   */
   if (Factor == 0) return (0); // No can do if factor is zero -- just return zero
   Num = Factor * (Math.floor(.5 + (Num/Factor)));
   return(Num);
}

/******************************************************
 * Useful for restricting the number of characters
 * entered into a form field (most notably for textarea).
 ******************************************************/
function LimitText(oField, iMaxChars)
{
	var iDiff = iMaxChars - oField.value.length;

	if (iDiff < 0)
	{
		oField.value = oField.value.substring(0, iMaxChars);
	}
}

function getHello()
{
	var text = parseInt("4700123");
	return(text);
}
/* 
 * These functions are used for form validation in multiple pages.
 *
*/
function removeErrorColor(form)
{
	changeFieldColor('RQD_fnameSpan', '#666666');
	changeFieldColor('miSpan', '#666666');
	changeFieldColor('RQD_lnameSpan', '#666666');
	/* changeFieldColor('RQD_ssnSpan', '#666666'); */
	changeFieldColor('add1Span', '#666666');
	changeFieldColor('add2Span', '#666666');
	changeFieldColor('citySpan', '#666666');
	changeFieldColor('stateSpan', '#666666');
	changeFieldColor('zipSpan', '#666666');
	if (form.day_areacode)
		changeFieldColor('day_phoneSpan', '#666666');
	if (form.eve_areacode)
		changeFieldColor('eve_phoneSpan', '#666666');
	changeFieldColor('emailSpan', '#666666');
	if (form.acct)
		changeFieldColor('acctSpan', '#666666');
	changeFieldColor('RQD_contactSpan', '#666666');
	changeFieldColor('commentsSpan', '#666666');

}

function removeErrorColorNew(form)
{
	for( var i=0; i<form.elements.length; i++)
	{
		szFieldName = form.elements[i].id;
		if(szFieldName!=""){
		document.getElementById(szFieldName).className="register-form input";
		}
	
	}

}

function RQD_Validations (oFieldArray,  errorClassName, correctClassName)
{
	
	var szFieldName = "";
	var iFieldLength = 0;
	var bSuccess = true;
	for (i = 0; i < oFieldArray.length; i++)
	{
		szFieldName = oFieldArray[i];
		document.getElementById(szFieldName).className=errorClassName;
		//changeFieldClass(szFieldName, errorClassName);
		bSuccess=false;
		
	}
	return bSuccess;
}

function changeFieldClass(element, errorClassName){
	document.getElementById(element).className=errorClassName;
}



/******************************************************
 * Takes an array of all fields that failed validation for
 * required fields and changes their matching form label
 * color to indicate an error.
 ******************************************************/
function RQDMarkErrors(oFieldArray, szErrorColor)
{
	var szFieldName = "";
	var iFieldLength = 0;
	var bSuccess = true;
	for (i = 0; i < oFieldArray.length; i++)
	{
		szFieldName = oFieldArray[i];
		//handle fields which are grouped under 1 header
		if (szFieldName.substring(0,7) == "RQD_ssn")
		{
			szFieldName = "RQD_ssn";
		}
		
		if (szFieldName.substring(0,14) == "RQD_confirmSSN")
		{
			szFieldName = "RQD_ssnConfirm";
		}		
		
		if (szFieldName.substring(0,3) == "eve")
		{
			szFieldName = "eve_phone";
		}

		if (szFieldName.substring(0,3) == "day")
		{
			szFieldName = "day_phone";
		}
		
		if (szFieldName.substring(0,7) == "RQD_dob")
		{
			szFieldName = "RQD_dob";
		}		
		
		if(szFieldName.substring(0,9) == "RQD_phone")
		{
			szFieldName = "RQD_phone"
		}
		
		if(szFieldName.substring(0,10) == "RQD_billed")
		{
			szFieldName = "RQD_phoneBilledName"
		}
		
		if(szFieldName.substring(0,12) == "RQD_refPhone")
		{
			szFieldName = "RQD_ref_phone"
		}
		
		szFieldName = szFieldName + "Span";
		//alert(szFieldName);
		changeFieldColor(szFieldName, szErrorColor);
		bSuccess = false;
	}

	return (bSuccess);
}
/******************************************************
 * If max length of the field is reached, jump to destination field
 ******************************************************/
	function skipToNextField(fieldName, destination)
	{
		if (fieldName.value.length>=fieldName.maxLength)
		{
			destination.focus();

		}
	}
	
	/******************************************************
 * If max length of the field is reached, jump to destination field, except if the button pressed was a tab
 ******************************************************/
	function skipToNextFieldTabs(fieldName, destination, keyCode)
	{
		if (keyCode != 9 && keyCode != 16){
			if (fieldName.value.length>=fieldName.maxLength)
			{
				destination.focus();

			}
		}
	}

	function trim(str) 
	{ 
	    str = '' + str;
	    var left=0; 
	    var right=str.length-1; 
	    while(left < str.length && str.charAt(left) == ' ') {
	    	left++; 
	    } 
	    while(right > left && str.charAt(right) == ' ') {
	    	right--;
	    }
	    return str.substring(left, right+1); 
	} 
	
/******************************************************
 * Strip a field's content of it's carriage returns
 ******************************************************/
	function escapeCarriageReturnsFromField(inputField,replaceWith){
		//inputField is reference to that object, replaceWith is string that will replace the encoded return
		inputField.value = escape(inputField.value) //encode inputField string's carriage returns
		
		for(i=0; i<inputField.value.length; i++){
		//loop through string, replacing carriage return encoding with HTML break tag
		
			if(inputField.value.indexOf("%0D%0A") > -1){
				//Windows encodes returns as \r\n hex
				inputField.value=inputField.value.replace("%0D%0A",replaceWith);
			}
			else if(inputField.value.indexOf("%0A") > -1){
				//Unix encodes returns as \n hex
				inputField.value=inputField.value.replace("%0A",replaceWith);
			}
			else if(inputField.value.indexOf("%0D") > -1){
				//Macintosh encodes returns as \r hex
				inputField.value=inputField.value.replace("%0D",replaceWith);
			}
		
		}
		
		inputField.value=unescape(inputField.value); //unescape all other encoded characters
	}
	
function multiEmail(email_field) {
	var email = email_field.split(',');
	for (var i = 0; i < email.length; i++) {
		if (!validateEmail(email[i])) {
			return false;
		}
	}
	return true;
}

function validateEmail(addr) {
	
	var comma=",";
	var dot=".";
	var laddr=addr.length;
	var lcomma=addr.indexOf(',',0);
	var multiemailresult = false;
		
	if (addr.indexOf(',',0) > 0) {
   		multiemailresult = multiEmail(addr);
   		return multiemailresult;
	}
	
	addr = trim(addr);
	
	var invalidChars = '\/\'\\";:?!()[]\{\}^|';

	for(var i=0; i<invalidChars.length; i++) 
	{
   		if (addr.indexOf(invalidChars.charAt(i),0) > -1) 
   		{
      		alert('Email address contains invalid characters');
	      	return false;
   		}
	}
	for (var i=0; i<addr.length; i++) {
   		if (addr.charCodeAt(i)>127) {
      		alert('Email address contains non ascii characters');
      		return false;
   		}
	}
	var atPos = addr.indexOf('@',0);
			
	if (atPos == -1) {
   		alert('Email address must contain an @');
   		return false;
	}
	if (atPos == 0) {
	   alert('Email address must not start with @');
	   return false;
	}
	if (addr.indexOf('@@', 0) != - 1) {
	   alert('two @ must not be adjacent');
	   return false;
	}
	if (addr.indexOf('.', atPos) == -1) {
	   alert('Email address must contain a period in the domain name');
	   return false;
	}
	if (addr.indexOf('@.',0) != -1) {
	   alert('Email address period must not immediately follow @');
	   return false;
	}
	if (addr.indexOf('.@',0) != -1){
	   alert('Email address period must not immediately precede @');
	   return false;
	}
	if (addr.indexOf('..',0) != -1) {
	   alert('In the email address two periods must not be adjacent');
	   return false;
	}
	return true;
}


function ValidateForm(){

	var emailTo=document.formEmail.to;
	var emailBcc=document.formEmail.bcc;
	var emailFrom=document.formEmail.from;

	if ((emailTo.value==null)||(emailTo.value=="")){
		alert("Please enter the Recipient Email Address");
		emailTo.focus();
		return false;
	}
		
	if (validateEmail(emailTo.value)==false){
		emailTo.focus();
		return false;
	}			       
		
	if ((emailFrom.value==null)||(emailFrom.value=="")){
		alert("Please enter the Sender's Email Address");
		emailFrom.focus();
		return false;
	}
		
	if (emailFrom.value.indexOf(',',0) >0){
		alert("Sender's Email can't contain multiple email addresses");
		emailFrom.focus();
		return false;
	}
	if (validateEmail(emailFrom.value)==false){
		emailFrom.focus();
		return false;
	}

    if ((emailBcc.value==null)||(emailBcc.value=="")){
		return true;
	}
       
    if (validateEmail(emailBcc.value)==false){
		emailBcc.focus();
		return false;
	}
	return true;
 }

/******************************************************
 * Checks to make sure the zip code is valid
 ******************************************************/
function IsValidZipCode(szZipCode)
{	
	var bValidZipCode = true;

	if (szZipCode != null && szZipCode != "")
	{
		if (validateDigit(szZipCode) == false)
			bValidZipCode = false;
		
		if (szZipCode.length != 5 && szZipCode.length != 9)
			bValidZipCode = false;		
	}

	return (bValidZipCode);
}

//-->