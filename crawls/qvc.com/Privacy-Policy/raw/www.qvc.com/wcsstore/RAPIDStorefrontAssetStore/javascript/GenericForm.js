// GenericForm.js

// newFunction
var FIRST_NAME_REQUIRED_ERROR =  'First Name is a required field.';
var LAST_NAME_REQUIRED_ERROR =  'Last Name is a required field.';
var ADDRESS1_REQUIRED_ERROR =  'Address is a required field.';
var ADDRESS2_REQUIRED_ERROR =  'Address is a required field.';
var CITY_REQUIRED_ERROR =  'City is a required field.';
var STATE_REQUIRED_ERROR =  'State is a required field.';
var ZIP_CODE_REQUIRED_ERROR =  'Zip Code is a required field.';
var HOME_PHONE_REQUIRED_ERROR =  'Phone Number is a required field and should contain 10 digits.';
var EMAIL_ADDRESS_REQUIRED_ERROR =  'E-mail Address is a required field.';
var CONFIRM_EMAIL_ADDRESS_REQUIRED_ERROR =  'Confirm Email Address is a required field.';
var EMAIL_ADDRESS_1_REQUIRED_ERROR =  'The E-mail Address specified is invalid.';
var MEMBER_NBR_REQUIRED_ERROR =  'Member Number is a required field.';
var EMAIL_MEMBER_REQUIRED_ERROR =  'E-mail Address or Member Number is a required field.';
var BIRTH_MONTH_REQUIRED_ERROR =  'Birth Month is a required field.';
var BIRTH_DAY_REQUIRED_ERROR =  'Birth Day is a required field.';
var BIRTH_YEAR_REQUIRED_ERROR =  'Birth Year is a required field.';
var ZIP_CODE_NUMERIC_ERROR =  'Zip Code must be numeric.';
var HOME_PHONE_NUMERIC_ERROR =  'Phone Number must be numeric.';
var MEMBER_NBR_NUMERIC_ERROR =  'Member Number must be numeric.';
var BIRTH_DAY_NUMERIC_ERROR =  'Birth Day must be numeric.';
var BIRTH_MONTH_NUMERIC_ERROR =  'Birth Month must be numeric.';
var BIRTH_YEAR_NUMERIC_ERROR =  'Birth Year must be numeric.';
var ZIP_CODE_MINDIGITS_ERROR =  'Zip Code must be at least 5 digits.';
var HOME_PHONE_EXACTDIGITS_ERROR =  'Phone Number must be 10 digits.';
var MEMBER_NBR_EXACTDIGITS_ERROR =  'Member Number must be 10 digits.';
var BIRTH_DAY_EXACTDIGITS_ERROR =  'Birth Day must be 2 digits.';
var BIRTH_MONTH_EXACTDIGITS_ERROR =  'Birth Month must be 2 digits.';
var BIRTH_YEAR_EXACTDIGITS_ERROR =  'Birth Year must be 4 digits.';
var EMAIL_ADDRESS_INVALID_ERROR  =  ' Please enter a valid email address.';
var EMAIL_ADDRESS_1_INVALID_ERROR  =  ' Please enter a valid email address.';
var EMAIL_ADDRESS_MATCH_ERROR =  'Email addresses should be matched.';
var FIRST_NAME_MAXDIGITS_ERROR =  'First Name should not exceed 20 characters.';
var LAST_NAME_MAXDIGITS_ERROR =  'Last Name should not exceed 25 characters.';
var ADDRESS1_MAXDIGITS_ERROR =  'Address should not exceed 25 characters.';
var ADDRESS2_MAXDIGITS_ERROR =  'Address should not exceed 25 characters.';
var CITY_MAXDIGITS_ERROR =  'City should not exceed 20 characters.';
var STATE_MAXDIGITS_ERROR =  'State should not exceed 2 characters.';
var ZIP_CODE_MAXDIGITS_ERROR =  'Zip Code should not exceed 6 characters.'; 
var HOME_PHONE_MAXDIGITS_ERROR =  'Phone Number should not exceed 10 characters.';
var EMAIL_ADDRESS_MAXDIGITS_ERROR =  'E-mail Address should not exceed 50 characters.';
var EMAIL_ADDRESS_1_MAXDIGITS_ERROR =  'E-mail Address should not exceed 50 characters.';
var MEMBER_NBR_MAXDIGITS_ERROR =  'Member Number should not exceed 10 characters.';
var EMAIL_MEMBER_MAXDIGITS_ERROR =  'E-mail Address or Member Number should not exceed 50 characters.';
var EMAIL_MEMBER_NUMBER_MAXDIGITS_ERROR = 'Member Number should not exceed 10 characters.';
var BIRTH_MONTH_MAXDIGITS_ERROR =  'Birth Day should not exceed 2 characters.';
var BIRTH_DAY_MAXDIGITS_ERROR =  'Birth Day should not exceed 2 characters.';
var BIRTH_YEAR_MAXDIGITS_ERROR =  'Birth Day should not exceed 4 characters.';
var GENERICFORM_BES_ERROR =  "We're sorry, the system could not process your request as the service is unavailable. Please try again later, or contact Customer Service at 1-888-345-5788 for more information.";
var GENERIC_IS_REQUIREDFIELD =  'is a required field.';
var BIRTHDAY_LESS_THAN_ZERO_ERROR = "Birth Day must be greater than 0.";
var BIRTHDAY_LESS_EQUAL_TO_ERROR = "Birth Day must be less than or equal to ";
var BIRTHDAY_LESS_THAN_CURRENT_DATE = "Birth Date must be less than current date.";
var EMAIL_MEMBER_INVALID =  'E-mail Address or Member Number is invalid.';
var EMAIL_DUP_ACCOUNT_ERROR = 'The e-mail address specified is associated with multiple accounts.  Please use your member number for this field.';
var INVALID_MEMEBER_NUMBER_ERROR = 'Incorrect information has been entered in the Member Number field.';
var INVALID_MEMBERNBR_EMAILADDR_ERROR = 'Incorrect information has been entered in the Member Number or E-mail address field.'; 
var STATE_CHARACTERS_ONLY_ERROR = 'State can contain only characters.';
var CITY_CHARACTERS_ONLY_ERROR = 'City can contain only characters.'; 
var errorCount;	
 
var requiredFields;
var currentDate = new Date();
var busy = false;
var errCursorPos=''; 


function validateGenericForm(){
 		errorCount=0;	
 		requiredFields=""; 
		errCursorPos=0;
		var txtFirstName = null;
		var txtLastName = null;
		var txtEmailAddress = null;
		var txtConfirmEmailAddress = null;
		var txtphone1 = null;
		var txtAddress1 = null;
		var txtAddress2 = null;
		var txtCity = null;
		var selStateProvince = null;
		var txtZipPostalCode = null;
		var cbTerms = null;
		var txtMemberNbr = null;
		var txtEmailMember = null;
		var txtBirthDay = null;
 		var selBirthdayMonth = null;
		var txtBirthYear = null; 	
		var monthMaxDays = new Array('31','28','31','30','31','30','31','31','30','31','30','31');
		
		
	
				if(document.getElementsByName("FIRST_NAME")!=null && document.getElementsByName("FIRST_NAME")[0]!=null){
					txtFirstName=document.getElementsByName("FIRST_NAME")[0];
				}
				if(document.getElementsByName("LAST_NAME")!=null && document.getElementsByName("LAST_NAME")[0]!=null){
					txtLastName=document.getElementsByName("LAST_NAME")[0];
				}
				if(document.getElementsByName("ADDRESS1")!=null && document.getElementsByName("ADDRESS1")[0]!=null){
					txtAddress1=document.getElementsByName("ADDRESS1")[0];
				}
				if(document.getElementsByName("ADDRESS2")!=null && document.getElementsByName("ADDRESS2")[0]!=null){
					txtAddress2=document.getElementsByName("ADDRESS2")[0];
				}
				if(document.getElementsByName("CITY")!=null && document.getElementsByName("CITY")[0]!=null){
					txtCity=document.getElementsByName("CITY")[0];
				}
				if(document.getElementsByName("STATE")!=null && document.getElementsByName("STATE")[0]!=null){
					selStateProvince=document.getElementsByName("STATE")[0];
				}
				if(document.getElementsByName("ZIP_CODE")!=null && document.getElementsByName("ZIP_CODE")[0]!=null){
					txtZipPostalCode=document.getElementsByName("ZIP_CODE")[0];
				}
				if(document.getElementsByName("HOME_PHONE")!=null && document.getElementsByName("HOME_PHONE")[0]!=null){
					txtphone1=document.getElementsByName("HOME_PHONE")[0];
				}
				if(document.getElementsByName("EMAIL_ADDRESS")!=null && document.getElementsByName("EMAIL_ADDRESS")[0]!=null){
					txtEmailAddress=document.getElementsByName("EMAIL_ADDRESS")[0];
				}
				if(document.getElementsByName("EMAIL_ADDRESS_1")!=null && document.getElementsByName("EMAIL_ADDRESS_1")[0]!=null){
					txtConfirmEmailAddress=document.getElementsByName("EMAIL_ADDRESS_1")[0];
				}
				if(document.getElementsByName("MEMBER_NBR")!=null && document.getElementsByName("MEMBER_NBR")[0]!=null){
					txtMemberNbr=document.getElementsByName("MEMBER_NBR")[0];
				}
				if(document.getElementsByName("EMAIL_MEMBER")!=null && document.getElementsByName("EMAIL_MEMBER")[0]!=null){
					txtEmailMember=document.getElementsByName("EMAIL_MEMBER")[0];
				} 
				if(document.getElementsByName("BIRTH_MONTH")!=null && document.getElementsByName("BIRTH_MONTH")[0]!=null){
					selBirthdayMonth=document.getElementsByName("BIRTH_MONTH")[0];
				}
				if(document.getElementsByName("BIRTH_DAY")!=null && document.getElementsByName("BIRTH_DAY")[0]!=null){
					txtBirthDay=document.getElementsByName("BIRTH_DAY")[0];
				}
				if(document.getElementsByName("BIRTH_YEAR")!=null && document.getElementsByName("BIRTH_YEAR")[0]!=null){
					txtBirthYear=document.getElementsByName("BIRTH_YEAR")[0];
				}
		
	
		var errorFlag;

		var errorField;  
		
		var storeIdentifier = '10251';
		
		var pageIdentifier = '';
		
		if($("CURRENTPAGEURL")!=null && $("CURRENTPAGEURL").value != ""){			  
			 pageIdentifier = $("CURRENTPAGEURL").value;  
		}else if(typeof isProductListShowing == 'undefined'){ 				 
			 pageIdentifier = document.location.href; 
		}	
		if($("errConsole")){
			$("errConsole").style.display = 'none';
		}
		var parElements = document.getElementsByTagName("p"); 
		if(parElements!=null){
			for (i=0;i<parElements.length;i++){
				if(parElements[i]!=null && parElements[i].id.indexOf("err")>-1){					
					parElements[i].style.display = "none"; 
				}	
			}
		} 
				  
 		if(txtFirstName!=null){  			 
			errorField = $("errfirstName");
			txtFirstName.value = trimAllSpaces(txtFirstName.value); 
			errorFlag=requiredValidate(txtFirstName,errorField,FIRST_NAME_REQUIRED_ERROR);
			if(!errorFlag && txtFirstName.value.length > 0){
				errorFlag=checkMaxChars(txtFirstName,20,errorField,FIRST_NAME_MAXDIGITS_ERROR);
			}			
		} 
		if(txtLastName!=null){
			errorField = $("errlastName");
			txtLastName.value = trimAllSpaces(txtLastName.value); 
			errorFlag=requiredValidate(txtLastName,errorField,LAST_NAME_REQUIRED_ERROR);
			if(!errorFlag && txtLastName.value.length > 0){
				errorFlag=checkMaxChars(txtLastName,25,errorField,LAST_NAME_MAXDIGITS_ERROR);
			}					
		}
		if(txtMemberNbr!=null){
			errorField = $("errMEMBER_NBR");	
			txtMemberNbr.value = trimAllSpaces(txtMemberNbr.value); 						
			txtMemberNbr.value = txtMemberNbr.value.replace(/\s/g,'');  					 
			txtMemberNbr.value = txtMemberNbr.value.replace(/-/g,'');
			txtMemberNbr.value = txtMemberNbr.value.replace(/^0+/,'');	
								
			errorFlag=requiredValidate(txtMemberNbr,errorField,MEMBER_NBR_REQUIRED_ERROR);  		
			if(!errorFlag && txtMemberNbr.value.length > 0){
				errorFlag = isNumeric(txtMemberNbr,errorField,MEMBER_NBR_NUMERIC_ERROR);										 
				if(!errorFlag){
					errorFlag=checkMaxChars(txtMemberNbr,10,errorField,MEMBER_NBR_MAXDIGITS_ERROR); 	
				}
			}				
		} 
		if(txtEmailMember!=null){
			errorField = $("errEmailMember");
			txtEmailMember.value = trimAllSpaces(txtEmailMember.value); 			
			txtEmailMember.value = txtEmailMember.value.replace(/\s/g,'');  					 
			txtEmailMember.value = txtEmailMember.value.replace(/-/g,'');			
			
			errorFlag=requiredValidate(txtEmailMember,errorField,EMAIL_MEMBER_REQUIRED_ERROR);  		
			
			if(!errorFlag && txtEmailMember.value.length > 0){
				if(isNaN(txtEmailMember.value)){
					errorFlag=checkMaxChars(txtEmailMember,50,errorField,EMAIL_MEMBER_MAXDIGITS_ERROR); 				
					if(!errorFlag){
						//errorFlag=validateEmailAddress(txtEmailMember,errorField,EMAIL_ADDRESS_1_REQUIRED_ERROR);
						errorFlag=validateEmailAddress(txtEmailMember,errorField,EMAIL_MEMBER_INVALID); 
					}						 
				}else{					
					errorFlag = isNumeric(txtEmailMember,errorField,EMAIL_MEMBER_INVALID);
					if(!errorFlag){
						errorFlag=checkMaxChars(txtEmailMember,10,errorField,EMAIL_MEMBER_NUMBER_MAXDIGITS_ERROR); 			
					}									
				}
			}			
		} 
		if(txtEmailAddress!=null){
			errorField = $("errEmailAddress");
			txtEmailAddress.value = trimAllSpaces(txtEmailAddress.value); 
			errorFlag=requiredValidate(txtEmailAddress,errorField,EMAIL_ADDRESS_REQUIRED_ERROR);
			if(!errorFlag && txtEmailAddress.value.length > 0){
				errorFlag=checkMaxChars(txtEmailAddress,50,errorField,EMAIL_ADDRESS_MAXDIGITS_ERROR); 				
				if(!errorFlag){
					errorFlag=validateEmailAddress(txtEmailAddress,errorField,EMAIL_ADDRESS_1_REQUIRED_ERROR);
				}	
				
			}			
		}
		if(txtConfirmEmailAddress!=null){			
			errorField = $("errConfirmEmailAddress");
			txtConfirmEmailAddress.value = trimAllSpaces(txtConfirmEmailAddress.value); 
			errorFlag=requiredValidate(txtConfirmEmailAddress,errorField,CONFIRM_EMAIL_ADDRESS_REQUIRED_ERROR);	 		 
			if(!errorFlag && txtConfirmEmailAddress.value.length > 0){
				 if(txtEmailAddress.value != trimAllSpaces(txtConfirmEmailAddress.value)){					 
					displayGenericErrorMessage(errorField,EMAIL_ADDRESS_MATCH_ERROR,txtConfirmEmailAddress);
				 }
			}			
		}  		
		if(txtAddress1!=null){
			errorField = $("erraddress1");
			txtAddress1.value = trimAllSpaces(txtAddress1.value); 	
			errorFlag=requiredValidate(txtAddress1,errorField,ADDRESS1_REQUIRED_ERROR);  
			if(!errorFlag && txtAddress1.value.length > 0){
				errorFlag=checkMaxChars(txtAddress1,25,errorField,ADDRESS1_MAXDIGITS_ERROR);
			}				
		}
		if(txtAddress2!=null){
			errorField = $("erraddress2");
			txtAddress2.value = trimAllSpaces(txtAddress2.value); 	
			errorFlag=requiredValidate(txtAddress2,errorField,ADDRESS2_REQUIRED_ERROR);  
			if(!errorFlag && txtAddress2.value.length > 0){
				errorFlag=checkMaxChars(txtAddress2,25,errorField,ADDRESS2_MAXDIGITS_ERROR);
			}			
		}
		if(txtCity!=null){
			errorField = $("errcity");
			txtCity.value = trimAllSpaces(txtCity.value); 	
			errorFlag=requiredValidate(txtCity,errorField,CITY_REQUIRED_ERROR);  
			if(!errorFlag && txtCity.value.length > 0){																							
				errorFlag=checkMaxChars(txtCity,20,errorField,CITY_MAXDIGITS_ERROR); 				 
			}			
		} 
		if(selStateProvince!=null){
			errorField = $("errstate");
			selStateProvince.value = trimAllSpaces(selStateProvince.value); 
			errorFlag=requiredValidate(selStateProvince,errorField,STATE_REQUIRED_ERROR);
			if(!errorFlag && selStateProvince.value.length > 0){	    																 
				errorFlag=checkMaxChars(selStateProvince,2,errorField,STATE_MAXDIGITS_ERROR); 					 
			}											
		} 
		if(txtZipPostalCode!=null){			
			errorField = $("errzipcode");
				var valZip = trimAllSpaces(txtZipPostalCode.value);
				txtZipPostalCode.value=valZip; 				
				errorFlag=requiredValidate(txtZipPostalCode,errorField,ZIP_CODE_REQUIRED_ERROR);					 
				if(!errorFlag && txtZipPostalCode.value.length > 0){
					if(valZip.length==0){
						displayGenericErrorMessage(errorField,ZIP_CODE_NUMERIC_ERROR,txtZipPostalCode);	 
					}else if(isNaN(txtZipPostalCode.value)){
								if(!validateZipPostalCodeInput(valZip)){
									errorFlag=true;	
									displayGenericErrorMessage(errorField,ZIP_CODE_NUMERIC_ERROR,txtZipPostalCode);
								}							 	 
					}else{
							if(!validateZipPostalCodeInput(valZip)){
								errorFlag=true;
								displayGenericErrorMessage(errorField,ZIP_CODE_NUMERIC_ERROR,txtZipPostalCode);	
								if(valZip.length<5){   
									displayGenericErrorMessage(errorField,ZIP_CODE_MINDIGITS_ERROR,txtZipPostalCode);
								}else if(valZip.length>6){
									displayGenericErrorMessage(errorField,ZIP_CODE_MAXDIGITS_ERROR,txtZipPostalCode);
								}								
							}
							 
					}	
				}
				
		} 
		if(txtphone1!=null){
			errorField = $("errphone1");
			var valPhone = trimAllSpaces(txtphone1.value);
			txtphone1.value = valPhone; 
			errorFlag=requiredValidate(txtphone1,errorField,HOME_PHONE_REQUIRED_ERROR);				
			if(!errorFlag && txtphone1.value.length > 0){
				if(isNaN(txtphone1.value)){
					 	errorFlag=validatePhoneNumber(txtphone1.value); 
					 	if(!errorFlag){
					 		displayGenericErrorMessage(errorField,HOME_PHONE_EXACTDIGITS_ERROR,txtphone1);	 
					 	}	
				}else{
					errorFlag=validatePhoneNumber(txtphone1.value); 
					if(!errorFlag){
						displayGenericErrorMessage(errorField,HOME_PHONE_EXACTDIGITS_ERROR,txtphone1);	
					}
				}				
			}														 				
		}
		
		if(cbTerms!=null){
				 
		} 				
		
		if(selBirthdayMonth!=null){
			errorField = $("errbirthDay");			 					
				errorFlag=requiredValidate(selBirthdayMonth,errorField,BIRTH_DAY_REQUIRED_ERROR);				 				
		}   
		if(txtBirthDay!=null){
			errorField = $("errbirthDay");		
			txtBirthDay.value = trimAllSpaces(txtBirthDay.value); 		 
				errorFlag=requiredValidate(txtBirthDay,errorField,BIRTH_DAY_REQUIRED_ERROR);
				if(!errorFlag && txtBirthDay.value.indexOf(' ') > -1)
					displayGenericErrorMessage(errorField,BIRTH_DAY_REQUIRED_ERROR,txtBirthDay); 
				else if(!errorFlag && txtBirthDay.value.length>0){ 
					errorFlag = isNumeric(txtBirthDay,errorField,BIRTH_DAY_NUMERIC_ERROR);
					if(!errorFlag){
						if(trimAllSpaces(txtBirthDay.value) < 10 && trimAllSpaces(txtBirthDay.value).length == 1){
							txtBirthDay.value = "0"+trimAllSpaces(txtBirthDay.value);
						} 				 												
						errorFlag = validateEqulaNumChars(txtBirthDay,2,errorField,BIRTH_DAY_EXACTDIGITS_ERROR);						 
					}
				}											 									 	
		}
		if(txtBirthYear!=null){
			 errorField = $("errbirthDay"); 	
			 txtBirthYear.value = trimAllSpaces(txtBirthYear.value); 			 							
				errorFlag=requiredValidate(txtBirthYear,errorField,BIRTH_DAY_REQUIRED_ERROR);  
				if(!errorFlag && txtBirthYear.value.indexOf(' ') > -1)					
					displayGenericErrorMessage(errorField,BIRTH_DAY_REQUIRED_ERROR,txtBirthYear);
				else if(!errorFlag && txtBirthYear.value.length>0){ 	
					errorFlag = isNumeric(txtBirthYear,errorField,BIRTH_YEAR_NUMERIC_ERROR);
					if(!errorFlag){						 											 						 
						 validateEqulaNumChars(txtBirthYear,4,errorField,BIRTH_YEAR_EXACTDIGITS_ERROR);													 						
					}
				}					
		} 			
		if(txtBirthDay!=null && selBirthdayMonth!=null && txtBirthYear!=null){ 
			// validating B'day against zero value
			if($("errbirthDay")!= null && $("errbirthDay").getStyle('display') != 'block'){
				if(txtBirthDay.value == '' && selBirthdayMonth.value == '' && txtBirthYear.value == ''){
					
				}else{ 
					if(selBirthdayMonth.value <= 0)
						displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_THAN_ZERO_ERROR,selBirthdayMonth);
					if(txtBirthDay.value <= 0)
						displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_THAN_ZERO_ERROR,txtBirthDay);
					if(txtBirthYear.value <= 0)
						displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_THAN_ZERO_ERROR,txtBirthYear);					
				}							
			}						
			// validating B'day against current date
			if($("errbirthDay")!= null && $("errbirthDay").getStyle('display') != 'block'){
				var birthDate = new Date(txtBirthYear.value,selBirthdayMonth.value-1,txtBirthDay.value);
				if(txtBirthDay.value == '' && selBirthdayMonth.value == '' && txtBirthYear.value == ''){
					
				}else if(txtBirthYear.value%4 == 0 && selBirthdayMonth.value == '02'){
					if(birthDate > currentDate){
						displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_THAN_CURRENT_DATE,txtBirthDay); 
					}else if(txtBirthDay.value > 29){
						displayGenericErrorMessage($("errbirthDay"), BIRTHDAY_LESS_EQUAL_TO_ERROR + "29.",txtBirthDay);   
					}					 
				}
				else if(txtBirthDay.value > monthMaxDays[new Number(selBirthdayMonth.value)-1]){
					displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_EQUAL_TO_ERROR + monthMaxDays[new Number(selBirthdayMonth.value)-1],txtBirthDay);
				}else if(birthDate > currentDate){
					displayGenericErrorMessage($("errbirthDay"),BIRTHDAY_LESS_THAN_CURRENT_DATE,txtBirthDay); 
				}	
			}			  	
		}
		
		// validate the Generic fields (i.e) TEXT1 - TEXT20		
		validateGenericFields();
			
		if(errorCount>0){			  	 
			if(typeof isProductListShowing != 'undefined'){ 
				callCreatePageviewTag(); // page view tag when validation errors occurred			
			} 
			return false; 
		}else{
			var form = document.getElementById('frmGeneric');
			if(!busy && form!=null){
				 busy = true;
				 if($("CURRENTPAGEURL")!=null && $("CURRENTPAGEURL").value != ""){			  			 		
			 		form.action = "EnlsignUp"; // For content pages
				 }else{ 				 
					form.action = "/EnlsignUp"; // For static html pages
		  		 }					 
				 var hiddenParam = document.createElement("input");
				 hiddenParam.setAttribute("type", "text");
				 hiddenParam.setAttribute("name", "storeId");
				 hiddenParam.setAttribute("id", "storeIdentifier");
				 hiddenParam.setAttribute("value", storeIdentifier);
				 form.appendChild(hiddenParam); 
 				 document.getElementById('storeIdentifier').style.display = "none"; 	
 				 
 				 var hiddenPageIdentifierParam = document.createElement("input");
				 hiddenPageIdentifierParam.setAttribute("type", "text");
				 hiddenPageIdentifierParam.setAttribute("name", "pageId"); 
				 hiddenPageIdentifierParam.setAttribute("id", "hiddenPageIdentifierParam");  
				 hiddenPageIdentifierParam.setAttribute("value", pageIdentifier); 
				 form.appendChild(hiddenPageIdentifierParam);  
 				 document.getElementById('hiddenPageIdentifierParam').style.display = "none"; 	 				  				 
				 form.submit();
				// return true; 
			}
			return false; 
		}
	 	
}

function requiredValidate(elementId, errorField, errorMessage){	
	if($("frmREQUIRED")){
		requiredFields = $("frmREQUIRED").value.toString(); 
	}else if(document.getElementsByName("REQUIRED")[0]!=null){	
		requiredFields = document.getElementsByName("REQUIRED")[0].value.toString();
	}	 	
	var errorFlag=false;		
	if(requiredFields.indexOf(elementId.name)>-1){						
		if(errorField!=null && trimAllSpaces(elementId.value).length == 0){							 											 			 			 
				displayGenericErrorMessage(errorField,errorMessage,elementId); 
				errorFlag=true;				 	
		}  
	}
	return errorFlag;
}

function checkMaxChars(ElementId, maxRange, errorField, errorMessage){ 
	var errorFlag=false;
	if(ElementId!=null && maxRange!=null){		 		 
			if(trimAllSpaces(ElementId.value).length > maxRange){				
				displayGenericErrorMessage(errorField,errorMessage,ElementId);
				errorFlag=true;
			}			 
	}	
	return errorFlag;
}

function checkMinChars(ElementId, minRange, errorField, errorMessage){ 
	var errorFlag=false;
	if(ElementId!=null && minRange!=null){		 		 
			if(trimAllSpaces(ElementId.value).length < minRange){				
				displayGenericErrorMessage(errorField,errorMessage,ElementId);
				errorFlag=true;
			}			 
	}	
	return errorFlag;
}
function displayGenericErrorMessage(errorField, errorMessage, fieldId){
	if(errorField!=null){
				errorField.style.display='block';
				errorField.style.color='red';
				if(errorMessage!=null && errorMessage.length > 0){ 
					errorField.innerHTML=errorMessage; 		
					if(errCursorPos==0){
						if(fieldId!=null){
							fieldId.focus();
							errCursorPos=1;	
						}							
					}							 
				}				 
				errorCount ++;
	}			
}
function displayGenericErrorMessageNew(errorField, errorMessage, fieldId){
	if(errorField!=null){
				errorField.style.display='block';
				errorField.style.color='red';
				if(errorMessage!=null && errorMessage.length > 0){ 
					errorField.innerHTML=errorMessage; 
					if(fieldId!=null){						 
						fieldId.focus();	
					}								 
				}				 
				errorCount ++;
	}			
}
function isNumeric(elementId, errorField, errorMessage){
	var errorFlag=false;	 	 		 
	var regTemp = /^\d+$/;
	var tempReg = regTemp.test(elementId.value);  	
	
	if(!tempReg){
		displayGenericErrorMessage(errorField,errorMessage,elementId);
		errorFlag=true;
	}	
	return errorFlag;
}
function validateEmailAddress(elementId, errorField, errorMessage){
	var errorFlag=false;	 
	 errorFlag=validateEmailFormat(elementId.value);
	 if(!errorFlag){
	 		displayGenericErrorMessage(errorField,errorMessage,elementId);
			errorFlag=true;	
	 }
	 return errorFlag;
}
function validateEqulaNumChars(ElementId, numChars, errorField, errorMessage){
	var errorFlag=false;
	if(ElementId.value.length != numChars){				
			displayGenericErrorMessage(errorField,errorMessage,ElementId);
			errorFlag=true;
	}
	return errorFlag;
}
function validateEmailFormat(inputEmailValue){
	
	if (inputEmailValue == null || trimAllSpaces(inputEmailValue) == "" ){
		return false;
	}
	
	 var emailPat=/^(.+)@(.+)$/;
	 var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	 var validChars="\[^\\s" + specialChars + "\]";
	 var quotedUser="(\"[^\"]*\")";
	 var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	 var atom=validChars + '+';
	 var word="(" + atom + "|" + quotedUser + ")";
	 var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	 var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
	 var matchArray=inputEmailValue.match(emailPat);
	 if (matchArray == null) {
		 return false;
	 }
	 var user=matchArray[1];
	 var domain=matchArray[2];
	 if (user.match(userPat) == null) {
		 return false;
	 }
	 var IPArray = domain.match(ipDomainPat);
	 if (IPArray != null) {
		 for (var i = 1; i <= 4; i++) {
			if (IPArray[i] > 255) {
			   return false;
			}
		 }
		 return true;
	 }
	 var domainArray=domain.match(domainPat);
	 if (domainArray == null) {
		 return false;
	 }
	 var atomPat=new RegExp(atom,"g");
	 var domArr=domain.match(atomPat);
	 var len=domArr.length;
	 if ((domArr[domArr.length-1].length < 2) ||
		 (domArr[domArr.length-1].length > 3)) {
		 return false;
	 }
	 if (len < 2) {
		 return false;
	 }
	 return true; 	 
}

function validateGenericFields(){
		if($("frmREQUIRED")){
			requiredFields = $("frmREQUIRED").value.split(","); 
		}else if(document.getElementsByName("REQUIRED")[0]!=null){			
			requiredFields = document.getElementsByName("REQUIRED")[0].value.split(","); 
		}			 
		
		var patt1="TEXT(\\d*)([a-zA-Z])*"; 
		var fieldRank=0; 	
		var requiredField='';
		var errorFlag1=false; 			
		for (i=0;i<requiredFields.length;i++)
			{  		
				requiredField=trimAllSpaces(requiredFields[i]);			 
				if(requiredField.match(patt1)!=null){
					var arr = requiredField.match(patt1);								 	
					fieldRank = new Number(arr[1]);				
					if(fieldRank > 0){		 
					var requiredError = true;				 					
					var hiddenField = null;	
							if(document.getElementsByName("TEXT"+fieldRank+"NAME")!=null && document.getElementsByName("TEXT"+fieldRank+"NAME")[0]!=null){
								hiddenField=document.getElementsByName("TEXT"+fieldRank+"NAME")[0];
							}						
													 											 	 			 
	 					var field1 = document.getElementsByName(""+requiredField);
	 					if(field1!=null){
	 						for(j=0;j<field1.length;j++){		 					   				 
			 					if(field1[j]!=null){	 					
				 					if(field1[j].type=='radio' && (field1[j].checked)){
				 						requiredError=false;	
				 						break;		 						
				 					}else if(field1[j].type=='select-one' && (field1[j].selected)){
				 						requiredError=false;
				 						break;
				 					}else if(field1[j].type=='checkbox' && (field1[j].checked)){
				 						requiredError=false;
				 						break;
				 					}else if((field1[j].type=='text'||field1[j].type=='textarea')&& trimAllSpaces(field1[j].value).length > 0){ 
				 						requiredError=false;
				 						break;
				 					}  
			 					}	 						 				
		 					}	
	 					}		 					
		 				  				  					 						 			 
	 					if(requiredError){
		 					if(hiddenField!=null && hiddenField.value.length > 0){		 						
		 						if($('errTEXT'+fieldRank)!=null){
			 						errorFlag1=true;
			 						displayGenericErrorMessage($('errTEXT'+fieldRank),hiddenField.value+" "+GENERIC_IS_REQUIREDFIELD,field1[0]);	 		 						
		 						}
		 					}else{
			 					if($('errTEXT'+fieldRank)!=null){
				 					errorFlag1=true;				 						
			 						displayGenericErrorMessage($('errTEXT'+fieldRank),"",field1[0]); 
			 					}		 								 							
		 					}	 						
	 					}		 					
					}				
				} 							  				 		 
		}
	return errorFlag1;  
}

function trimAllSpaces(sString) {	
	var trimmedStr = '';
	if (sString != null ){
		trimmedStr = sString.replace(/^\s+|\s+$/g, '') ;
	}
	return trimmedStr;
} 
function initGenericFunctions(){	   
	if(besError=='true'){
		if($('errConsole')){ 
			//displayGenericErrorMessage($('errConsole'),GENERICFORM_BES_ERROR);
		}
	}
}
function validatePhoneNumber(phoneNumber){
	
	var inputPhoneNumber;
	
	if (phoneNumber == null){
		return false;
	}else {
		inputPhoneNumber = phoneNumber.replace(/\s+/g, '');
	}
	
	if ( (new RegExp(/^[1-9]\d{9}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^\([1-9]\d{2}\)\d{3}\-{0,1}\d{4}$/)).test(inputPhoneNumber) ||
			(new RegExp(/^[1-9]\d{2}\-{0,1}\d{3}\-{0,1}\d{4}$/)).test(inputPhoneNumber) || 
			(new RegExp(/^[1-9]\d{2}\.{0,1}\d{3}\.{0,1}\d{4}$/)).test(inputPhoneNumber) || 
			(new RegExp(/^[1-9]\d{2}\,{0,1}\d{3}\,{0,1}\d{4}$/)).test(inputPhoneNumber) ){
		
		return true;
		
	}
	
	return false;
	
}
function validateZipPostalCodeInput(zipPostalCode){
      
      if (zipPostalCode == null){
            return false;
      } 
      var reZipPostalCode = '';       
        if(zipPostalCode.length==6)
        {         
		 	reZipPostalCode = /^\d{6}$/;          	   
        }else{                    
            reZipPostalCode = /^\d{5}$/;                 
        }                
       
      return reZipPostalCode.test(zipPostalCode);     
}
function isRequiredField(elementId){ 
	if($("frmREQUIRED")){
		requiredFields = $("frmREQUIRED").value.toString(); 
	}else if(document.getElementsByName("REQUIRED")[0]!=null){ 	
		requiredFields = document.getElementsByName("REQUIRED")[0].value.toString();
	}	 
	var isRequired=false;		
	if(elementId != null && requiredFields.indexOf(elementId.name)>-1){				
		 isRequired=true;
	}
	return isRequired; 
}
/*
function isAlphabetic(elementId, errorField, errorMessage){		
	 if(elementId!=null){
		errorFlag=false;
		var testAlphabet =  /^[a-zA-Z]+$/.test(elementId.value);	   
		if(!testAlphabet){
			displayGenericErrorMessage(errorField,errorMessage,elementId);
			errorFlag=true; 
		}
	}		
	return errorFlag; 
}
*/