  var daysLong =    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function SelectDate(date,element) {

	var selectedDates = getElementsByClassName(document.getElementById('calendar-area'),'a','selected-available');
	for(var i=0, dateLink; i<selectedDates.length; i++){
		dateLink=selectedDates[i];
		dateLink.className='isavailable';
	}

	var datesToSelect = document.getElementsByName(element.name);
	for(var i = 0; i < datesToSelect.length; i++) {
		datesToSelect[i].className = 'selected-available';
	}

	dateParts = date.split(",");
	aDate = new Date(dateParts[3], dateParts[0], dateParts[2]);
	monthNum = aDate.getMonth();

	dayName = daysLong[aDate.getDay()];

	document.getElementById('dateSelected').innerHTML = dayName+", "+dateParts[1]+" "+dateParts[2]+" "+dateParts[3];
	document.getElementById('selectedDate').value = monthNum+" "+dateParts[2]+" "+dateParts[3];
};

function NextMonth(currentCounter,nextCounter) {
	hideCalendar=document.getElementById('calendarPanel'+currentCounter);
	hideCalendar.style.display = "none";
	showCalendar=document.getElementById('calendarPanel'+nextCounter);
	showCalendar.style.display = 'block';
	return false;
};
function PreviousMonth(currentCounter,previousCounter) {
	hideCalendar=document.getElementById('calendarPanel'+currentCounter);
	hideCalendar.style.display = "none";
	showCalendar=document.getElementById('calendarPanel'+previousCounter);
	showCalendar.style.display = 'block';
	return false;
};