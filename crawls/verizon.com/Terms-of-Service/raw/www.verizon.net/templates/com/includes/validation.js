//Error Messages
domain_error="Please enter a valid Domain Name";
email_error="Please enter a valid E-Mail address";
phone_error="Please enter a valid 10 digit phone number";
first6_error="Please enter a valid area code and the first 3 digits of your phone number";
zip_error="Please enter a valid 5 or 9 digit zip code";
rep_id_error="The Rep I.D. is not in the correct format, please check your I.D. and re-enter."


//Makes sure that the field is a valid domain name: letters, numbers and "-" are valid characters
//field must also be at least 2 characters in lenght -- (a max length of 68 should be set on the field in the page)
function isDomain(domain_name)
{
	var valid=1
	var symbol_exceptions = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "[", "]", "{", "}", "|", "\\", "<", ">", ",", "/", "?"];
	
	if(domain_name.length < 2 )
	{
		valid=0;
	}
	else
	{
		for (var n=0; n<symbol_exceptions.length; n++)
		{
			if (domain_name.indexOf(symbol_exceptions[n])!=-1)
			{
				valid=0;
			}
		}
	}
	return valid;
}



//Validated Phone Number
function validatePhoneNumber(area_code, exchange, last4)
{
	var area_code_string=area_code+"";
	var exchange_string=exchange+"";
	var last4_string=last4+"";
	
	var valid=1;
	
	if(area_code=="" || exchange=="" || last4=="")
	{
		valid=0;
	}
	else if(isNaN(area_code) || isNaN(exchange) || isNaN(last4))
	{
		valid=0;
	}
	else if(area_code_string.length!=3 || exchange_string.length!=3 || last4_string.length!=4)
	{
		valid=0;
	}
	
	return valid;
}

//Validate area-code and local exchange (first 6 digits of a phone #)
function validateFirstSix(area_code, exchange)
{
	var area_code_string=area_code+"";
	var exchange_string=exchange+"";
	
	var valid=1;
	
	if(area_code=="" || exchange=="")
	{
		valid=0;
	}
	else if(isNaN(area_code) || isNaN(exchange))
	{
		valid=0;
	}
	else if(area_code_string.length!=3 || exchange_string.length!=3)
	{
		valid=0;
	}
	
	return valid;
}


// Validation: must be at least two characters followed by an "@" symbol followed by two more characters,
//then a period "." then two more characters. (e.g. xx@xx.xx would validate true)
function validateEmail(email_address)
{
	var valid=1
	
	if(email_address.indexOf('@') == -1 || email_address.indexOf('.') == -1)
	{
		valid=0;
	}
	
	if(valid==1)
	{
		var splitAt = email_address.split("@")
		var splitDot = splitAt[1].split(".")
		
		if(splitAt[0].length < 2 || splitDot[0].length < 2 || splitDot[1].length < 2)
		{
			valid=0;
		}
	}
	return valid;
}


//Validates zip code for either a 5 digit or 9 digit zip (numbers only)
function validateZip(zip)
{
	var valid=0;
		
	var zip_string = zip + "";
	var zip_numbers="";
	
	//this loop goes through the zip and removes any non-digit characters
	for(var n=0; n<zip_string.length; n++)
	{
		if(!isNaN(zip_string.charAt(n)) && zip_string.charAt(n) != " ")
		{
			zip_numbers=zip_numbers +zip_string.charAt(n);
		}
	}
	
	if(zip_numbers.length==5 || zip_numbers.length==9)
	{
		valid=1;
	}
	
	return valid;
}

function isNotEmpty ( textfield )
{
	var valid = 0;
	if ( textfield.length != 0 )
	{
		valid = 1;
	}
	return valid;
}



function validateRepIDFormat( rep_id ){
	var valid = 1;

	first_character=rep_id.charAt(0); 
	second_character=rep_id.charAt(1); 
	third_character=rep_id.charAt(2); 
	fourth_character=rep_id.charAt(3); 
	fifth_character=rep_id.charAt(4); 
	sixth_character=rep_id.charAt(5);
	
	numeric=third_character+fourth_character+fifth_character+sixth_character;

	if(!isNaN(first_character) || !isNaN(second_character) || isNaN(numeric)){
		valid = 0;
	}
	
	return valid;
			
}	
	