

//<![CDATA[
	
	
	// form validation
function validEmail(email) {
	invalidChars = ' |/:,;'
	if (email == '') { // cannot be empty
		return false
	}
	for (var i=0; i < invalidChars.length; i++) { // does it contain any invalid characters?
		badChar = invalidChars.charAt(i)
		if (email.indexOf(badChar,0) > -1) {
			return false
		}
	}
	atPos = email.indexOf('@',1) // there must be one '@' symbol
	if (atPos == -1) {
		return false
	}
	if (email.indexOf('@',atPos+1) != -1) {	// and only one '@' symbol
		return false
	}
	periodPos = email.indexOf('.',atPos)
	if (periodPos == -1) { // and at least one '.' after the '@'
		return false
	}
	if (periodPos+3 > email.length)	{ // must be at least 2 characters after the '.'
		return false
	}
	return true
}

function isNum(passedVal) { // Is this a number?
	if (passedVal == '') {
		return false
	}
	for (var i=0; i<passedVal.length; i++) {
		if (passedVal.charAt(i) < '0') {
			return false
		}
		if (passedVal.charAt(i) > '9') {
			return false
		}
	}
	return true
}

function validZip(inZip) { // Is this a valid Zip code?
	if (inZip == '') {
		return true
	}
	if (isNum(inZip)) { // Check if Zip is numeric
		return true
	}
	return false
}

function isDate(mm,dd,yyyy)	{	
	var d = new Date(mm + '/' + dd + '/' + yyyy);
	return d.getMonth() + 1 == mm &&
	d.getDate() == dd && d.getFullYear() == yyyy;
}

/** function isOfLegalAge(mm,dd,yyyy,legalAge) {
	var d = new Date(mm + '/' + dd + '/' + yyyy);
	var t = new Date();
	var diffYears = t.getFullYear() - d.getFullYear();
	var diffMonths = t.getMonth() - d.getMonth();
	var diffDays = t.getDate() - d.getDate();
	return diffYears > legalAge ? true : diffYears > (legalAge - 1) && diffMonths > -1 && diffDays > -1;
} **/
		
	function validatesubmit(f) {
		if (f.contributor_first_name.value==''){
	        alert('Please enter your first name.');
	        f.contributor_first_name.select();
	        f.contributor_first_name.focus();
	        return false;
		}
		if (f.contributor_last_name.value==''){
	        alert('Please enter your last name.');
	        f.contributor_last_name.select();
	        f.contributor_last_name.focus();
	        return false;
		}
if (f.boyfriend_first_name){
		if (f.boyfriend_first_name.value==''){
	        alert('Please enter a first name for your boyfriend.');
	        f.contributor_first_name.select();
	        f.contributor_first_name.focus();
	        return false;
		}
}
if (f.boyfriend_last_name) {
		if (f.boyfriend_last_name.value==''){
	        alert('Please enter a last name for your boyfriend.');
	        f.contributor_first_name.select();
	        f.contributor_first_name.focus();
	        return false;
		}
}
		/*if (f.contributor_email.value==''){
	        alert('Please enter your email.');
	        f.contributor_email.select();
	        f.contributor_email.focus();
	        return false;
		}*/
		
		if (!validEmail(f.contributor_email.value)) {
			alert('That is an invalid email address.  Please try again.')
			f.contributor_email.focus()
			f.contributor_email.select()
			return false;
		}
if (f.boyfriend_email) {
		if (!validEmail(f.boyfriend_email.value)) {
			alert('That is an invalid email address for your boyfriend.  Please try again.')
			f.contributor_email.focus()
			f.contributor_email.select()
			return false;
		}
}
if (f.contributor_cell_number) {
if (f.contributor_cell_number.value==''){
	        alert('Please enter your cell phone number');
	        f.contributor_cell_number.select();
	        f.contributor_cell_number.focus();
	        return false;
		}
}
		if (f.contributor_city.value==''){
	        alert('Please enter a city.');
	        f.contributor_city.select();
	        f.contributor_city.focus();
	        return false;
		}
		stateChoice = f.contributor_state.selectedIndex
		if (f.contributor_state.options[stateChoice].value == '') {
			alert('Please select a state.')
			return false;
		}
		/*countryChoice = f.country_code.selectedIndex
		if (f.country_code.options[countryChoice].value == '') {
			alert('Please select your country.')
			return false;
		}*/
		
		if (!isDate(f.dob_month.options[f.dob_month.selectedIndex].value,
			f.dob_day.options[f.dob_day.selectedIndex].value,
			f.dob_year.options[f.dob_year.selectedIndex].value)) {
			alert('Invalid date of birth');
			f.dob_day.focus();
			return false;
		} 
		/**if (!isOfLegalAge(f.dob_month.options[f.dob_month.selectedIndex].value,
			f.dob_day.options[f.dob_day.selectedIndex].value,
			f.dob_year.options[f.dob_year.selectedIndex].value, 13)) {
			location.href = '/connect/sorry';
			return false;
		}
		if (!isOfLegalAge(f.dob_month.options[f.dob_month.selectedIndex].value,
			f.dob_day.options[f.dob_day.selectedIndex].value,
			f.dob_year.options[f.dob_year.selectedIndex].value, 13)) {
			location.href = '/connect/sorry';
			return false;
		} **/
if (f.contributor_bikini_size) {
		if (f.contributor_bikini_size.value==''){
	        alert('Please enter your bikini size');
	        f.contributor_bikini_size.select();
	        f.contributor_bikini_size.focus();
	        return false;
		}
}
		if (f.body.value==''){
	        alert('Please enter your message.');
	        f.body.select();
	        f.body.focus();
	        return false;
		}

if ( $("#user_capture_code").length > 0) {
	if (f.file_upload.value != '' && f.user_code.value=='' ){
				alert('Please enter the security code.');
				f.user_code.select();
				f.user_code.focus();
				return false;
			}
}
nameOption = -1
if (f.print_name) {
			for (i=0; i<f.print_name.length; i++) {
			    if (f.print_name[i].checked) {
		    		nameOption = i;
			    }
		    }

		    if (nameOption == -1) {
				alert('Please answer all the questions.');
				return false;
			}
}
if (f.file_upload) {
	    if (f.file_upload.value.indexOf('.jpg') == -1 &&
		    f.file_upload.value.indexOf('.gif') == -1 &&
			f.file_upload.value.indexOf('.jpeg') == -1 &&
			f.file_upload.value.indexOf('.JPG') == -1 &&
			f.file_upload.value.indexOf('.GIF') == -1 &&
			f.file_upload.value.indexOf('.JPEG') == -1) {
	        alert('Please upload a gif or jpg image.');
	        f.file_upload.select();
	        f.file_upload.focus();
	        return false;
		}
	    if (navigator.appVersion.indexOf('PC') != -1) {
			var filename_info = f.file_upload.value.split('/');
		} else {
			var filename_info = f.file_upload.value.split('');
		}
		if (filename_info[filename_info.length - 1].indexOf(' ',0) > -1 ||
		    filename_info[filename_info.length - 1].indexOf('&',0) > -1 ||
			filename_info[filename_info.length - 1].indexOf('@',0) > -1) {
			alert('Invaild filename!  Please rename your file.');
			return false;
		}
}
		return true;
	}
	

