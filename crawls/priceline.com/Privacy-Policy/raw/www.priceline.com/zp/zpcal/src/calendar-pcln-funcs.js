



// Returns:
//   1 if greater than other date
//   0 if same
//   -1 if earlier than other date
//
Date.prototype.compareToDO = function (otherDate) { 
	var year1 = this.getYear();
	var year2 = otherDate.getYear(); 
	var month1 = this.getMonth(); 
	var month2 = otherDate.getMonth(); 
	var day1 = this.getDate(); 
	var day2 = otherDate.getDate(); 
	if (year1 > year2) { return 1;	} 
	if (year2 > year1) { return -1; } //years are equal 
	if (month1 > month2) { return 1; } 
	if (month2 > month1) { return -1; } //years and months are equal 
	if (day1 > day2) { return 1; } 
	if (day2 > day1) { return -1; } //days are equal 
	return 0; 
}

Date.prototype.laterThanDO = function (otherDate) { 
	return( (this.compareToDO(otherDate) == 1 ? true : false) );
}
Date.prototype.earlierThanDO = function (otherDate) { 
	return( (this.compareToDO(otherDate) == -1 ? true : false) );
}
Date.prototype.equalsDO = function (otherDate) { 
	return( (this.compareToDO(otherDate) == 0 ? true : false) );
}
Date.prototype.betweenExclusiveDO = function (earlyDate, lateDate) { 
	if(this.compareToDO(earlyDate) < 1) {return(false);}
	if(this.compareToDO(lateDate) > -1) {return(false);}
	return(true);	
}
Date.prototype.betweenInclusiveDO = function (earlyDate, lateDate) { 
	if(this.compareToDO(earlyDate) < 0) {return(false);}
	if(this.compareToDO(lateDate) > 0) {return(false);}
	return(true);	
}








function gCFD(sDate, sOff) {
var dDate = new Date(sDate);
 if(isNaN(dDate)) {
 dDate = new Date();
 }
var sOff = String(sOff);
var aO = sOff.split("/");
var iMO = parseInt(aO[0]);
var iDO = parseInt(aO[1]);
var iYO = parseInt(aO[2]);
var dNew = new Date(dDate);
dNew.setDate(dNew.getDate() + iDO);
dNew.setMonth(dNew.getMonth() + iMO);

if (dNew.getYear() < 100)
{
dNew.setYear(dNew.getYear() + 2000 + iYO);
}
else
{
dNew.setYear(dNew.getFullYear() + iYO);
}

var sFD = String(dNew.getMonth() + 1) + "/" + String(dNew.getDate()) + "/" + String(dNew.getFullYear());
return(sFD);
}




function fmtCalBoxDate(oBox, sFmt) {
 var sDt = oBox.value;
 if(sDt == null || sDt == "" || String(sDt).indexOf("mm/dd") > -1) {
 	return;
 }
 
 var dtBox = Date.parseDate(sDt, sFmt)

 if(dtBox == null || isNaN(dtBox)) {
  return;
 }
 var sResult = dtBox.print(sFmt);
 oBox.value = sResult;
}



function updateDependentDate(oBox2,sDate1,sOffset, sFmt) {
var d1 = Date.parseDate(sDate1, sFmt)
var d2 = Date.parseDate(oBox2.value, sFmt)

if(isNaN(d1)) {
 return;
}
var sNew = Date.parseDate(gCFD(sDate1, sOffset), sFmt);
if(isNaN(d2)) {
 oBox2.value = sNew;
 return;
}
if(d1 >= d2) {
 oBox2.value = sNew;
 return;
 }
}


function keyOutOfCalTextBox(evt, strIconImg) {
	var oEvt = (window.event) ? window.event : evt;
	var oEL = (oEvt.srcElement) ? oEvt.srcElement : oEvt.target;

	if (oEvt.keyCode == 9) {
		var objAnchor = document.getElementById(oEL.id + "_link");
		if(objAnchor && (objAnchor.onblur != null) ) {
			objAnchor.onblur();
		}
	}

}



function focusCalTextBox(evt, objEl) {
	if(objEl != null) {
		focusCalTextBoxEx(objEl)
		return;
	}
	if(evt == null) {
		return;
	}

	var oEvt = (window.event) ? window.event : evt;

	var oEL = (oEvt.srcElement) ? oEvt.srcElement : oEvt.target;

	oEL.select();
	var objAnchor = document.getElementById(oEL.id + "_link");
	if(objAnchor && objAnchor.onclick != null) {
		objAnchor.onclick();
	}
	oEL.select();
}


function focusCalTextBoxEx(oEL) {

	//debugPrint("focusCalTextBoxEx(): " + oEL.name + " -- " + oEL.id);
	oEL.select();
	var objAnchor = document.getElementById(oEL.id + "_link");
	if(objAnchor && objAnchor.onclick != null) {
		objAnchor.onclick();
	}
	oEL.select();
}


// Here, this refers to params object
function zpcalCalOnUpdate(cal) {
	//var objDependentDateElement = this.inputFieldDependent;
	//debugPrint(objDependentDateElement);
	//updateDependentDate(objDependentDateElement, cal.date, this.inputFieldDependentOffset);
	debugPrint(cal.id);
}





function zpcalDateInRange(date) {

	var dtMasterDate = this.dateMaster;
	var dtDependentDate = this.dateDependent;

	var dtEarliestDate = this.dateEarliest;
	var dtLatestDate = this.dateLatest;

	var dtSelectedDate = this.currentDate;


	var blnLocalDebug = false;
	if(false) {
		if(String(date).indexOf("Oct 26") > -1) {
			blnLocalDebug = true;
		}
		if(String(date).indexOf("Nov 09") > -1) {
			blnLocalDebug = true;
		}
	}

	var blnShowSelectedDate = this.showSelectedDate;
	var blnShowMasterDate = this.showMasterDate;
	var blnShowDependentDate = this.showDependentDate;



	if ((dtMasterDate != null) && date.equalsDO(dtMasterDate) && (blnShowMasterDate == true)) {
		if(blnLocalDebug == true) {debugPrint("point 1");}
		if(date.earlierThanDO(dtEarliestDate)) {
			if(blnLocalDebug == true) {debugPrint("point 1.1");}
			return("edges disabled");
		} else {
			if(blnLocalDebug == true) {debugPrint("point 1.2");}
			return("edges");
		}
	}

	if(dtEarliestDate != null) {
		if(blnLocalDebug == true) {debugPrint("point 2");}
		if(date.earlierThanDO(dtEarliestDate)) {
			if(blnLocalDebug == true) {debugPrint("point 2.1");}
			if (dtMasterDate != null && dtMasterDate.earlierThanDO(dtSelectedDate) && date.betweenExclusiveDO(dtMasterDate, dtSelectedDate)) {
				if(blnLocalDebug == true) {debugPrint("point 2.1.1");}
				if(blnLocalDebug == true) {debugPrint("...blnShowSelectedDate = " + blnShowSelectedDate);}
				if(blnShowSelectedDate == true) {
					return("between disabled");
				}
			}
			return(true);
		}
	}
	if(dtLatestDate != null) {
		if(blnLocalDebug == true) {debugPrint("point 3");}
		if(date.laterThanDO(dtLatestDate)) {
			if(blnLocalDebug == true) {debugPrint("point 3.1");}
			return("disabled");
		}
	}


	if ((dtDependentDate != null) && date.equalsDO(dtDependentDate) && (!date.earlierThanDO(dtSelectedDate))) {
		if(blnLocalDebug == true) {debugPrint("point 4");}
		if(blnShowDependentDate == true) {
			if(blnLocalDebug == true) {debugPrint("point 4.1");}
			return ("edges");
		}
	}

	if(this.inputHasValidDate != true) {
		if(blnLocalDebug == true) {debugPrint("point 5");}
		return(false);
	}

	if(blnLocalDebug == true) {debugPrint("point 6");}


	if (dtMasterDate != null && (blnShowMasterDate == true)) {
		if(blnLocalDebug == true) {debugPrint("point 6.1");}
		if(dtMasterDate.earlierThanDO(dtSelectedDate)) {
			if(blnLocalDebug == true) {debugPrint("point 6.1.1");}
			if(date.betweenExclusiveDO(dtMasterDate, dtSelectedDate)) {
				if(blnLocalDebug == true) {debugPrint("point 6.1.1.1");}
				return("between");
			}
		}


	} else {
		if(blnLocalDebug == true) {debugPrint("point 6.2");}
		if (dtDependentDate != null) {
			if(blnLocalDebug == true) {debugPrint("point 6.2.1");}

			if(dtDependentDate.laterThanDO(dtSelectedDate)) {
				if(blnLocalDebug == true) {debugPrint("point 6.2.2");}
				if(date.betweenExclusiveDO(dtSelectedDate, dtDependentDate)) {
					if(blnLocalDebug == true) {debugPrint("point 6.2.3");}
					if(blnShowSelectedDate == true) {
						return("between");
					}
				}
			}


		}
	}

	if(blnLocalDebug == true) {debugPrint("point 7");}

	//all other days are enabled
	return(false);
}




function zpcalGetDateFromInputField(objField, strFormat) {
	if(objField && objField.value) {
		var dtFieldDate = Date.parseDate(String(objField.value), strFormat);
		if(dtFieldDate == null) {
			dtFieldDate = new Date();
		}

		var intYear = dtFieldDate.getFullYear();
		if(1900 < intYear && intYear < 2000) {
			intYear = intYear + 100;
			dtFieldDate.setFullYear(intYear);
		}

		if(String(dtFieldDate).indexOf("Invalid") > -1 || String(dtFieldDate).indexOf("NaN") > -1) {
			return(null);
		}
		return(dtFieldDate);
	}
	return(null);
}





//
// "this" = params object
//
//
function zpcalSetDateRangeValues(cal) {
	var blnInputHasValidDate = true;
	
	if(!this.inputFieldMaster) {
		this.inputFieldMaster = document.getElementById(this.inputFieldMasterID);
	}
	
	
	
	if(this.inputFieldDependentID) {
		//debugPrint("this.inputFieldDependentID check");
		this.inputFieldDependent = document.getElementById(this.inputFieldDependentID);
	}
	
	if(!this.inputFieldDependent) {
		var objInputField = cal.inputField;
		if(objInputField.onmouseover) {
			var strDependentDataRaw = new String(objInputField.onmouseover + "");
			var strDependentData = strDependentDataRaw.substring(strDependentDataRaw.indexOf("#")+1, strDependentDataRaw.lastIndexOf("#"));
			var arrDependentData = strDependentData.split("|");
			//debugPrint("inputFieldDependent set from event");		
			this.inputFieldDependentID = String(arrDependentData[0]);
			this.inputFieldDependentOffset = String(arrDependentData[1]);
			
			this.inputFieldDependent = document.getElementById(this.inputFieldDependentID);
		}		
	}



	var dtDateMaster = zpcalGetDateFromInputField(this.inputFieldMaster, this.ifFormat);
	cal.dateMaster = dtDateMaster;


	var dtInputFieldDate = zpcalGetDateFromInputField(cal.inputField, this.ifFormat);


	var dtCurrentDate = null;

	if(dtInputFieldDate == null) {
		blnInputHasValidDate = false;
		if(dtDateMaster != null) {
			dtCurrentDate = new Date(gCFD(dtDateMaster, this.offsetFromMasterEarliest));
		} else {
			dtCurrentDate = new Date(gCFD(new Date(), "0/0/0"));
		}
	} else {
		if( (dtDateMaster != null) && (!dtInputFieldDate.laterThanDO(dtDateMaster)) ) {
			dtCurrentDate = new Date(gCFD(dtDateMaster, this.offsetFromMasterEarliest));
		} else {
			dtCurrentDate = new Date(gCFD(dtInputFieldDate, "0/0/0"));
		}
	}

	cal.date = dtCurrentDate;
	cal.dateStr = dtCurrentDate.toString();
	cal.currentDate = dtCurrentDate;
	cal.inputHasValidDate = blnInputHasValidDate;


	var dtDateDependent = zpcalGetDateFromInputField(this.inputFieldDependent, this.ifFormat);
	cal.dateDependent = dtDateDependent;

	var dtDateEarliest = new Date(this.dateEarliest);
	var dtDateLatest = new Date(this.dateLatest);

	var dtRangeStart = new Date(dtDateEarliest);;
	var dtRangeEnd = new Date(dtDateLatest);


	if(dtDateMaster != null) {
		dtDateEarliest = new Date(gCFD(dtDateMaster, this.offsetFromMasterEarliest));
		dtRangeStart = new Date(dtDateEarliest);
		
		if(dtDateMaster.getMonth() == (dtCurrentDate.getMonth() - 1)  ) {
			dtRangeStart = new Date(dtDateMaster);
		}
		if(this.offsetFromMasterLatest != "") {
			dtDateLatest = new Date(gCFD(dtDateMaster, this.offsetFromMasterLatest));
		}
		dtRangeEnd = new Date(gCFD(dtDateLatest, "1/0/0"));

	} else {
		dtRangeStart = new Date(dtDateEarliest);
		dtRangeEnd = new Date(gCFD(dtDateLatest, "1/0/0"));
	}


	cal.dateEarliest = dtDateEarliest;
	cal.dateLatest = dtDateLatest;


	if(cal.inputHasValidDate == false) {
		cal.inputField.value = "";
	} else {
		if( (dtInputFieldDate != null) && !dtInputFieldDate.betweenInclusiveDO(cal.dateEarliest, cal.dateLatest)) {
			cal.inputField.value = "";
			cal.inputHasValidDate = false;
		}
	}
	
	
	
	var blnShowInitialSelectedDate = false;
	if(cal.inputField && cal.inputField.value && Date.parseDate(String(cal.inputField.value), this.ifFormat)) {
		blnShowInitialSelectedDate = true;
	}
	cal.showSelectedDate = blnShowInitialSelectedDate;

	var blnShowMasterDate = false;
	if(this.inputFieldMaster && this.inputFieldMaster.value && Date.parseDate(String(this.inputFieldMaster.value), this.ifFormat)) {
		blnShowMasterDate = true;
	}
	cal.showMasterDate = blnShowMasterDate;
	
	var blnShowDependentDate = false;
	if(this.inputFieldDependent && this.inputFieldDependent.value && Date.parseDate(String(this.inputFieldDependent.value), this.ifFormat)) {
		blnShowDependentDate = true;
	}
	cal.showDependentDate = blnShowDependentDate;
	
	//debugPrint(".....dtDateEarliest = " + dtDateEarliest);
	//debugPrint(".....dtDateLatest = " + dtDateLatest);
	//debugPrint(".....dtRangeStart = " + dtRangeStart);
	//debugPrint(".....dtRangeEnd = " + dtRangeEnd);


	cal.controlMonth = 1;
	if(this.numberMonths > 1) {
		if(dtDateMaster!=null) {
			if(dtDateMaster.getMonth() != dtCurrentDate.getMonth()) {
				cal.controlMonth = 2;
			}
		}
	}
	
	strRangeStart = String(dtRangeStart.getFullYear() + "." + String(100 + (dtRangeStart.getMonth() + 1)).substring(1,3));
	strRangeEnd = String(dtRangeEnd.getFullYear() + "." + String(100 + (dtRangeEnd.getMonth() + 1)).substring(1,3));
	cal.setRange(strRangeStart, strRangeEnd);

}
		
		
		




// DEBUG functions

function initPrint(strFoo) {
	var oInit = document.getElementById("initLog");
	if(oInit) {
		oInit.innerHTML += strFoo + "<br/>\r\n";
	}
}
function initClear() {
	var oInit = document.getElementById("initLog");
	if(oInit) {
		oInit.innerHTML = "";
	}
}

function debugPrint(strFoo) {
	var oDebug = document.getElementById("debugLog");
	if(oDebug) {
		oDebug.innerHTML += strFoo + "<br/>\r\n";
	}
}
function debugPrintINIT(strFoo) {
	debugPrint("..." + strFoo);
}
function debugClear() {
	var oDebug = document.getElementById("debugLog");
	if(oDebug) {
		oDebug.innerHTML = "";
	}
}




