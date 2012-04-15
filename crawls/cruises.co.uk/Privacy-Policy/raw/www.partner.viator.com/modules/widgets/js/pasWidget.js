// Miscellaneous PAS widget stuff:

// Called when someone selects a country in the PAS drop-down:
function onViatorPasCountryChange(widgetID, countrySel)
{
	var serverHost = document.getElementById("viatorWidgetDiv_"+widgetID+"_serverHost").innerHTML;
	document.getElementById("viatorWidgetDiv_"+widgetID+"_action").innerHTML = serverHost + "/widgets/pasCities.jspa";
	document.getElementById("viatorWidgetDiv_"+widgetID+"_destinationID").innerHTML = countrySel.value;
	initViatorWidgetDiv(widgetID, 'viatorWidgetDivParams_'+widgetID);
}


// Called when the Search button is pressed:
function onViatorPasFormSubmit(form)
{
	if (form.region.value != '') {
		form.destinationID.value = form.region.value;
	} else if (form.country.value != '') {
		form.destinationID.value = form.country.value;
	} else {
		alert("You must select a country to search.");
		return false;
	}

	form.activities.value = (form.activities_checkbox.checked)? 'from': 'all';
	var fromYMBits = form.from_yyyymm.value.split(' ');
	var toYMBits = form.to_yyyymm.value.split(' ');

	form.from_mm.value = fromYMBits[0];
	form.from_yyyy.value = fromYMBits[1];
	form.to_mm.value = toYMBits[0];
	form.to_yyyy.value = toYMBits[1];

	var fromDate = new Date(form.from_yyyy.value, form.from_mm.value-1, form.from_dd.value);
	var toDate = new Date(form.to_yyyy.value, form.to_mm.value-1, form.to_dd.value);
	var diff = toDate - fromDate;
	if (diff < 0) {
		alert("The From date selected must be before the To date.");
		return false;
	} else if (diff > 2592000000) {       // milliseconds in 30 days.
		alert("Please verify your arrival and departure dates are within" +
			  " 30 days of one another. Unfortunately, we cannot process" +
			  " requests for trip durations greater than 30 days.");
		return false;
	}

	form.submit();
	return false;
}


// Updates the Day drop-down to match a change in the Month/Year drop-down:
function viatorPasFillOutMonthDays(targetPrefix, mmyyyy, selected)
{
	var mmyyyybits = mmyyyy.split(" ");
	var mm = parseInt(mmyyyybits[0]);
	var yyyy = parseInt(mmyyyybits[1]);

	document.getElementById(targetPrefix + '_mm').value = mm;
	document.getElementById(targetPrefix + '_yyyy').value = yyyy;

	var target = document.getElementById(targetPrefix + '_dd_select');
	while (target.options.length > 0) {
		target.options[target.options.length-1] = null;
	}

	var today = viatorPasGetTodaysDate();
	var lastDate = viatorPasGetLastDate();
	var date = new Date(yyyy, mm-1, 1);
	var idx = 0;

	do {
		if ((date > today) && (date <= lastDate)) {
			var opt = new Option(date.getDate(), date.getDate());
			if ((selected) && (selected == date.getDate())) {
				opt.defaultSelected = true;
				idx = target.options.length;
			}
			target.options[target.options.length] = opt;
		}
		date = new Date(date.getTime() + 93600000);     // <-- 24 x 60 x 60 x 1000 plus 2
		                                                // hours to handle DST (AFF-1911).
		date.setHours(0);
	} while (date.getMonth() == mm-1);

	target.selectedIndex = idx;
}


// Sets the Month / Day selection of a Day + Month/Year pair of drop-downs:
function viatorPasSelectMonthDays(targetPrefix, mmyyyy, selected)
{
	var mmTarget = document.getElementById(targetPrefix + '_yyyymm_select');
    for (var i=0; i<mmTarget.options.length; i++) {
        if (mmTarget.options[i].value == mmyyyy) {
            mmTarget.selectedIndex = i;
            break;
        }
    }

    viatorPasFillOutMonthDays(targetPrefix, mmyyyy, selected);
}
