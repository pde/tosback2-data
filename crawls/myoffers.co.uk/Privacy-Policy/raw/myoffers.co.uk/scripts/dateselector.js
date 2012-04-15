var gbValidationHooked;

function ValidateDateChooser2(source, args)
{
	ValidateDateChooser(source, args, 1);
}

function ValidateDateChooser(source, args, checkValid)
{
	var birthDay, birthMonth, birthYear;
	 birthDay = document.getElementById(DateSelectorValues[0]);
     birthMonth = document.getElementById(DateSelectorValues[1]);
     birthYear = document.getElementById(DateSelectorValues[2]);
     
	if (birthDay && birthMonth && birthYear)
	{
		if (!birthDay[0].selected && !birthMonth[0].selected
			&& !birthYear[0].selected && birthYear.options[birthYear.selectedIndex].value > 0)
		{
			if (checkValid && birthDay.options[birthDay.selectedIndex].value > 
				daysInMonth(birthMonth.options[birthMonth.selectedIndex].value - 1, 
					birthYear.options[birthYear.selectedIndex].value))
			{
				args.IsValid = false;
			}
			else
			{
				args.IsValid = true;
			}
		}
		else
		{
			//HACK: return true for CustomValidationDateChooserValid as CustomValidationDateChooserRequired will be false
			args.IsValid = checkValid;
		}
	}
	else
	{
		args.IsValid = false;
	}
	if (!gbValidationHooked)
	{
		gbValidationHooked = true;
		
		var validator = document.getElementById(DateSelectorValues[3]);
         ValidatorHookupControlID(birthDay, validator);
         ValidatorHookupControlID(birthMonth, validator);
         ValidatorHookupControlID(birthYear, validator);
	}
}

function daysInMonth(iMonth, iYear)
{
	return 32 - new Date(iYear, iMonth, 32).getDate();
}