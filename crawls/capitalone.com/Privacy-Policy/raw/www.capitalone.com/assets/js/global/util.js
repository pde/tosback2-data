function validateCustomerAge() {
	var dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", "");
	while (!isValidDob(dob)) {
	    alert("You must enter the date of birth in the following format: MM-DD-YYYY");
		dob = prompt("Enter the applicant's date of birth: (MM-DD-YYYY)", dob);
	}
	if (dob != null) {
		dob = dob.replace('-', '\/').replace('-', '\/');
		//check to see if the user is 21 years or older
		var enteredDob = new Date(dob);
		var today = new Date();
		if (enteredDob > today) {
			alert("You have entered an invalid date of birth");
			return false;
		} else if ((today - enteredDob)/(1000*60*60*24*365) < 21) {
			alert("Consumers under the age of 21 cannot apply in the Bank branches due to Card Act requirements. If an under 21 applicant comes into your branch to apply for a credit card, please advise them to return any direct mail offer they received from Capital One by mail or have them visit Capital One's website (www.capitalone.com) to apply. You should not apply on Capital One's website on behalf of the applicant.");
			return false;
		} else if (enteredDob != 'Invalid Date') {
			return true;
		}
	}
	return false;
}
 
function isValidDob(dob) {
	if (dob == null) {
		return true;
	}
	if (!(/^(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-(\d{4})$/.test(dob))) {
		return false;
	}

	var values = dob.split("/");
	var month = values[0];
	var day = values[1];
	var year = values[2];
	//validate february date (if the month is 02)
	if (month == 2) {
		if (day == 29) {
			if (year % 4 != 0 || year % 100 == 0 && year % 400 != 0) {
				return false;
			}
		} else if (day > 28) {
			return false;
		}
	} else if (month == 4 || month == 6 || month  == 9 || month == 11) {
		if (day > 30) {
			return false;
		}
	}
	else {
		if (day > 31) {
			return false;
		}
	}
	return true;
}