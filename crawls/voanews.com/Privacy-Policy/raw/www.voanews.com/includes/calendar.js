// JavaScript Document

<!-- Javascript Calendar -->
// adjust the days in a month for to date drop downs
// if selected day is in selected month then keep that day selected else selected the first day
function CM_changeDate(objYear, objMonth, objDay, selectIndex) {    timeA = new Date(objYear.options[objYear.selectedIndex].text, (parseInt(objMonth.options[objMonth.selectedIndex].value)+1), 1);
	timeDifference = timeA - 86400000;
	timeB = new Date(timeDifference);
	var daysInMonth = timeB.getDate();

	for (var i = 0; i < objDay.length; i++) {    	objDay.options[i] = null;
	}
	
	if(isNaN(daysInMonth))daysInMonth = 31;
	for (var i = 0; i < daysInMonth; i++) {    	if(i<9) 
			objDay.options[i] = new Option("0"+(i+1),(i+1));
		else 
			objDay.options[i] = new Option((i+1),(i+1));		
	}
	if (selectIndex < daysInMonth) objDay.options[selectIndex].selected = true;
	else objDay.options[0].selected = true;
}

var sdate = "";
var sdateArray;

function fill() {    var a = new Array();
	if (sdate != "") {    	a = sdate.split("/");
		sdateArray[0].selectedIndex = (new Number(a[0]))-1;
		sdateArray[1].selectedIndex = (new Number(a[1]))-1;
		sdateArray[2].value = a[2];
		sdate = "";
		sdateArray = [];
		
	
	
	}
}

function name_values(instring) {    var vars = new Array();
	rc = "\235";
	instring = instring.replace(/\\\;/g, rc);

	var pattern = /[a-zA-Z0-9]+\=[\/:#a-zA-Z0-9\. \235]+/gi;
	var y = instring.match(pattern);
	for (i=0; i<y.length; i++) {    	var s = y[i].split("=");
		s[1] = s[1].replace(rc, ";");
		vars[i] = "v_" + s[0];
		eval(vars[i] + " = '" + s[1] + "'");
	}
	return vars;
}

var onClickFnCode = "";
var orig_onClickFnCode = "";

function onClickFn(pday) {    
var re = /pday/;
	onClickFnCode = orig_onClickFnCode;
	onClickFnCode = onClickFnCode.replace(re, "'" + pday + "'");
	eval(onClickFnCode);
}

var v_CloseOnSelect, v_AppendOrReplace, v_AppendChar, v_ReturnData;
var v_Title, v_CurrentDate, v_AllowWeekends, v_DatePeriod, v_SelectStart, v_SelectEnd;
var v_Resizable, v_Width, v_Height, v_SelectAfter, v_SelectBefore, v_NSHierarchy;

var weekend = [0,6];
var weekendColor = "#EEEEEE";
var fontface = "Arial";

var gNow = new Date();
var ggWinCal;           

isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;
isDOM = (document.getElementById) ? true : false;

Calendar.Months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
Calendar.EMonths = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

Calendar.DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

Calendar.supportedFormats = ["MM/DD/YYYY", "MM/DD/YY", "MM-DD-YYYY", "MM-DD-YY", "DD/MON/YYYY", "DD/MON/YY", "DD-MON-YYYY", "DD-MON-YY", "DD/MONTH/YYYY", "DD/MONTH/YY", "DD-MONTH-YYYY", "DD-MONTH-YY", "MONTH DD, YYYY", "DD/MM/YYYY", "DD/MM/YY", "DOW, DD-MON-YY"];

Calendar.count = 0;
Calendar.Format = null;

Calendar.gInitText = "&nbsp;";

function Calendar(p_item, p_WinCal, p_month, p_year, p_format, p_type) {    if ((p_month == null) && (p_year == null))
		return;
	if (p_WinCal == null)
		this.gWinCal = ggWinCal;
	else
		this.gWinCal = p_WinCal;
	if (p_month == null) {    	this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {    	this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}
	if (p_type == null)
		this.gType = "POPUP";		
	else
		this.gType = p_type;
	this.WHO = "window.opener.";
	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
	this.gTitle = "Calendar";
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.get_dow = Calendar_get_dow;
Calendar.calc_month_year = Calendar_calc_month_year;
Calendar.Close = Calendar_Close;
Calendar.Lwwrite = Calendar_Lwwrite;
Calendar.isWeekend = Calendar_isWeekend;

function Calendar_get_month(monthNo, pLanguage) {
if (!pLanguage || pLanguage=="E")
	return Calendar.EMonths[monthNo];
else
	return Calendar.Months[monthNo];
}

function Calendar_get_dow(dayNo) {    return Calendar.DOW[dayNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {    
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {    		if ((p_year % 100) == 0 && (p_year % 400) != 0)
					return Calendar.DOMonth[monthNo];

			return Calendar.lDOMonth[monthNo];
	} else
			return Calendar.DOMonth[monthNo];
}

var ret_arr = new Array();

function Calendar_calc_month_year(p_Month, p_Year, incr) {    
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	if (incr < 0) {    	if (p_Month == 0) {    		ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {    		ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
		Calendar_calc_month_year(ret_arr[0], ret_arr[1], incr + 1);
	} else if (incr > 0) {    	if (p_Month == 11) {    		ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {    		ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
		Calendar_calc_month_year(ret_arr[0], ret_arr[1], incr - 1);
	}
	return ret_arr;
}

function Calendar_isWeekend(pday) {    for (var i=0; i<weekend.length; i++) {    	if (parseInt(pday) == parseInt(weekend[i]))
			return true;
	}
	return false;
}

new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {    var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";
	vCode = vCode + "<TABLE WIDTH='237' BORDER='0' CELLSPACING='1' CELLPADDING='2' BGCOLOR=\"" + this.gBGColor + "\">";
	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = vCode + vHeader_Code + vData_Code;
	vCode = vCode + "</TABLE>";
	return vCode;
}

Calendar.prototype.onclickfn = function() {    var whois = this.WHO + this.gReturnItem;
	var apchar = (this.returnMode == "Replace") ? " = " : " += ";
	var retCode = "apchar = ''" +
					((this.returnMode == "Replace") ? ";" : " + ") +
					"((" + whois + " == '') ? '' : '" + this.appendChar + "');\n" +
				whois + apchar + "apchar + pday;\n";
	return retCode;
}

Calendar.prototype.show = function() {    var vCode = "";
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];
	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];
	var prevYear = parseInt(this.gYear)-1;
	var nextYear = parseInt(this.gYear)+1;
	var prevLDay = Calendar.get_daysofmonth(prevMM, prevYYYY);
	var lastDay = Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var nextLDay = Calendar.get_daysofmonth(nextMM, nextYYYY);
	
	this.gWinCal.document.open();

	this.wwrite("<html>");
	this.wwrite("<head><title>Calendar</title>");
	
	this.wwrite("\n <style type='text/css'> \n");
	this.wwrite("a {  color: #000000; text-decoration: none;} \n");
	this.wwrite("td {  font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #cccccc} \n");
	this.wwrite(".fonttabwhite { font-weight: bold; font-size: 12px ; font-family: Verdana, Arial, Helvetica, sans-serif} \n");
	this.wwrite(".fontbold { font-weight: bold; color: #666666 ; font-size: 12px ; font-family: Verdana, Arial, Helvetica, sans-serif} \n");
	this.wwrite(".fonttabwhite { font-weight: bold; color: #FFFFFF ; font-size: 12px ; font-family: Verdana, Arial, Helvetica, sans-serif} \n");
	this.wwrite("a:hover {text-decoration: underline;font-weight:bold; \n");
	this.wwrite("</style> \n");
	this.wwrite("<script language='javascript'>" + 
			"function onClickFn(pday) {\n" +
			this.onclickfn() + "}\n <\/script>");
	this.wwrite("</head>");

	this.wwrite("<body " + 
			"link=\"" + this.gLinkColor + "\" " + 
			"vlink=\"" + this.gLinkColor + "\" " +
			"alink=\"" + this.gLinkColor + "\" " +
			"text=\"" + this.gTextColor + "\" scroll=\"no\" onload=\"focus();\">");
	
	this.wwrite("<TABLE BORDER=\"0\" WIDTH=\"237\" CELLSPACING=\"0\" CELLPADDING=\"0\" BGCOLOR=\"#CCCCCC\"><TR><TD>");
	this.wwrite("<TABLE BORDER=\"0\" WIDTH=\"237\" CELLSPACING=\"1\" CELLPADDING=\"2\" BGCOLOR=\"#CCCCCC\">" +  
			"<TR><TD WIDTH='205' BGCOLOR='#003399' class='fonttabwhite'>" + this.gMonthName + " " + this.gYear + 
			"</TD><TD WIDTH='20' BGCOLOR='#003399' class='fonttabwhite' ALIGN='CENTER'>" + 
			"<A class='fonttabwhite' HREF='javascript:" +
			this.WHO + "Calendar.Close(\"" + this.gType + "\", \"" + this.INLINE + "\");' " +
			">" + 
			"x</A></TR><TR>" + 
			"<TD BGCOLOR='#EEEEEE' COLSPAN='2' align='center'>");
	this.wwrite("<TABLE BORDER=\"0\" CELLSPACING=\"0\" CELLPADDING=\"0\" BGCOLOR=\"#EEEEEE\"><TR><TD ALIGN=center>");
	this.wwrite("[ <A HREF=\"" +
			"javascript:" + this.WHO + "Build(" + 
			"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "', '" + this.gType + "'" + 
			");\">&#60;&#60;<\/A> ] </TD><TD ALIGN=center>");
	this.wwrite("[ <A HREF=\"" +
			"javascript:" + this.WHO + "Build(" + 
			"'" + this.gReturnItem + "', '" + gNow.getMonth() + "', '" + gNow.getFullYear() + "', '" + this.gFormat + "', '" + this.gType + "'" + 
			");\">Today<\/A> ] </TD><TD ALIGN=center>");
	this.wwrite("[ <A HREF=\"" +
			"javascript:" + this.WHO + "Build(" + 
			"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "', '" + this.gType + "'" + 
			");\">&#62;&#62;<\/A> ] </TD></TR></TABLE>");
	this.wwrite("</TD></TR></TABLE>");
	vCode = this.getMonthlyCalendarCode();
	this.wwrite(vCode);
	this.wwrite("</TD></TR></TABLE>");
	this.wwrite("</body></html>");
	this.gWinCal.document.close();
}

function Calendar_Close(pType, pINLINE) {    if (pType == "POPUP")
		ggWinCal.close();
	if (pType == "INLINE")
		Calendar.Lwwrite(Calendar.gInitText, pINLINE)
}

Calendar.prototype.cal_header = function() {    var vCode = "";
	vCode = vCode + "<TR>";
	vCode = vCode + "<TD WIDTH='15%' bgcolor='#EEEEEE' class='fontbold'>Sun</TD>";
	vCode = vCode + "<TD WIDTH='14%' bgcolor='#EEEEEE' class='fontbold'>Mon</TD>";
	vCode = vCode + "<TD WIDTH='14%' bgcolor='#EEEEEE' class='fontbold'>Tue</TD>";
	vCode = vCode + "<TD WIDTH='14%' bgcolor='#EEEEEE' class='fontbold'>Wed</TD>";
	vCode = vCode + "<TD WIDTH='14%' bgcolor='#EEEEEE' class='fontbold'>Thur</TD>";
	vCode = vCode + "<TD WIDTH='14%' bgcolor='#EEEEEE' class='fontbold'>Fri</TD>";
	vCode = vCode + "<TD WIDTH='15%' bgcolor='#EEEEEE' class='fontbold'>Sat</TD>";
	vCode = vCode + "</TR>";
	return vCode;
}

Calendar.prototype.cal_data = function() {    var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);
	
	var vFirstDay = vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";
	
	var linkText = "";
	var linkCloseText = "";
	var weekSelectStart = new Array();
	var weekSelectEnd = new Array();
	var numrow = 0;
	
	for (r=vFirstDay; r<7; r++) {    	if (!weekSelectStart[numrow])
			 weekSelectStart[numrow] = vDay
		weekSelectEnd[numrow] = vDay;
		vDay = vDay + 1;
	}
	numrow++;
	while (vDay <= vLastDay) {    	for (t=0; t<7; t++) {    		if (!weekSelectStart[numrow])
				weekSelectStart[numrow] = vDay
			weekSelectEnd[numrow] = vDay;
			vDay = vDay + 1;
			if (vDay > vLastDay) 
				break;
		}
		numrow++;
	}
	vDay=1;
	numrow=0;
	
	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary. 
	*/
	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {    		vCode = vCode + "<TD></TD>";
	}
	if (this.closeable) {    	closecodeP = ((this.gType=="POPUP") ? "window.close();" : "");
		closecodeI = "void(0)";
		//closecodeI = "Calendar.Close(\"" + this.gType + "\", \"" + this.INLINE + "\"); ";
	} else {    	closecodeP = "";
		closecodeI = "void(0);' ";
	}
	var whois = this.WHO + 
				((this.gType == "POPUP") ? "document." : "window.document.") + 
				this.gReturnItem + ".value";
	for (j=vFirstDay; j<7; j++) {    	vDate.setDate(vDay);
		if ((this.gAllowWeekends == "No" && Calendar.isWeekend(j)) || 
			(vDate < v_SelectAfter || vDate > v_SelectBefore)) {    				linkText = "";
					linkCloseText = "";
		} else {    		linkText = "<A HREF='javascript:" + closecodeI + "' " +
				"onClick=\"onClickFn('" + 
			
				((this.returnData == "Date") ? 
				this.format_data(vDay) : 
				this.format_dow(vDay)) + 
							
				"');"+this.WHO+"fill();" + 
				closecodeP +
				"\">";
			linkCloseText = "<\/A>";
		}

		vCode = vCode + "<TD " + this.write_weekend_string(j,vDay,vDate) + 
				"><FONT color='#cccccc' SIZE='2' FACE='" + fontface + "'>" + 
				linkText + 
				this.format_day(vDay,vDate) + 
				linkCloseText + 
				"</FONT></TD>";
		vDay = vDay + 1;
	}
	vCode = vCode + "</TR>";
	for (k=2; k<7; k++) {    	vCode = vCode + "<TR>";
		for (j=0; j<7; j++) {    		vDate.setDate(vDay);
			if ((this.gAllowWeekends == "No" && Calendar.isWeekend(j)) || 
				(vDate < v_SelectAfter || vDate > v_SelectBefore)) {    				linkText = "";
					linkCloseText = "";
			} else {    			linkText = "<A HREF='javascript:" + closecodeI + "' " +
					"onClick=\"onClickFn('" + 
			
					((this.returnData == "Date") ? 
					this.format_data(vDay) : 
					this.format_dow(vDay)) + 
					"');"+this.WHO+"fill();" + 
					closecodeP +
					"\">";
			}

			vCode = vCode + "<TD " + this.write_weekend_string(j,vDay,vDate) + 
					"><FONT color='#cccccc' SIZE='2' FACE='" + fontface + "'>" + 
					linkText + 
					this.format_day(vDay,vDate) + 
					linkCloseText + 
					"</FONT></TD>";
			vDay = vDay + 1;

			if (vDay > vLastDay) {    			vOnLastDay = 1;
				break;
			}
		}
		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}
	for (m=1; m<(7-j); m++) {    	vCode = vCode + "<TD></TD>";
	}
	return vCode;
}

Calendar.prototype.format_day = function(vday,vdate) {    var highDate;
	if (this.gCurrentDate != "NONE")
		highDate = this.gCurrentDate;
	else
		highDate = gNow;

	var vNowDay = highDate.getDate();
	var vNowMonth = highDate.getMonth();
	var vNowYear = highDate.getFullYear();
	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear && this.gType=="POPUP")
		return ("<FONT COLOR=\"#003399\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}


Calendar.prototype.write_weekend_string = function(index,vday,vdate) {    var highDate;
	if (this.gCurrentDate != "NONE")
		highDate = this.gCurrentDate;
	else
		highDate = gNow;
	var vNowDay = highDate.getDate();
	var vNowMonth = highDate.getMonth();
	var vNowYear = highDate.getFullYear();
	if (Calendar.isWeekend(index) && this.gType=="POPUP")
		return (" BGCOLOR=\"" + weekendColor + "\"");
	else 
		return (" BGCOLOR=\"#ffffff\"");
}

Calendar.prototype.format_data = function(p_day) {    var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;
	var vDOW = Calendar.get_dow(new Date(vMonth + "\/" + vDD + "\/" + vY4).getDay());

	switch (this.gFormat) {    		case "MM\/DD\/YYYY" :
				vData = vMonth + "\/" + vDD + "\/" + vY4;
				break;
			case "MM\/DD\/YY" :
				vData = vMonth + "\/" + vDD + "\/" + vY2;
				break;
			case "MM-DD-YYYY" :
				vData = vMonth + "-" + vDD + "-" + vY4;
				break;
			case "MM-DD-YY" :
				vData = vMonth + "-" + vDD + "-" + vY2;
				break;

			case "DD\/MON\/YYYY" :
				vData = vDD + "\/" + vMon + "\/" + vY4;
				break;
			case "DD\/MON\/YY" :
				vData = vDD + "\/" + vMon + "\/" + vY2;
				break;
			case "DD-MON-YYYY" :
				vData = vDD + "-" + vMon + "-" + vY4;
				break;
			case "DD-MON-YY" :
				vData = vDD + "-" + vMon + "-" + vY2;
				break;

			case "DD\/MONTH\/YYYY" :
				vData = vDD + "\/" + vFMon + "\/" + vY4;
				break;
			case "DD\/MONTH\/YY" :
				vData = vDD + "\/" + vFMon + "\/" + vY2;
				break;
			case "DD-MONTH-YYYY" :
				vData = vDD + "-" + vFMon + "-" + vY4;
				break;
			case "DD-MONTH-YY" :
				vData = vDD + "-" + vFMon + "-" + vY2;
				break;
			case "MONTH DD, YYYY" :
				vData = vFMon + " " + vDD + ", " + vY4;
				break;
			case "DD\/MM\/YYYY" :
				vData = vDD + "\/" + vMonth + "\/" + vY4;
				break;
			case "DD\/MM\/YY" :
				vData = vDD + "\/" + vMonth + "\/" + vY2;
				break;
			case "DD-MM-YYYY" :
				vData = vDD + "-" + vMonth + "-" + vY4;
				break;
			case "DD-MM-YY" :
				vData = vDD + "-" + vMonth + "-" + vY2;
				break;
			case "DOW, DD-MON-YY" :
				vData = vDOW + ", " + vDD + "-" + vMon + "-" + vY2;
				break;
			default :
				vData = vMonth + "\/" + vDD + "\/" + vY4;
	}

	return vData;
}

Calendar.prototype.format_dow = function(p_day) {    var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;
	var vDate = new Date(vMonth + "\/" + vDD + "\/" + vY4);
	vData = Calendar.get_dow(vDate.getDay());
	return vData;
}

/*
Calendar Writing Functions
*/
Calendar.prototype.wwrite = function(wtext) {    if (this.gType == "POPUP")
		this.gWinCal.document.writeln(wtext);
	else {    	this.codeINLINE += wtext;
	}
}

function Calendar_Lwwrite(pText, pINLINE) {    if (isIE) {    	document.all[pINLINE].innerHTML = pText;
	} else if (isDOM) {    	rng = document.createRange();
		el = document.getElementById(pINLINE);
		rng.setStartBefore(el);
		htmlFrag = rng.createContextualFragment(pText)
		while(el.hasChildNodes()) el.removeChild(el.lastChild);
		el.appendChild(htmlFrag);
	} else if (isNav) {    	var lyr = document.layers[pINLINE].document;
		lyr.open();
		lyr.write(pText);
		lyr.close();
	}
}

/*
Calendar Build Function
*/
function Build(p_item, p_month, p_year, p_format, p_type, p_custom) {    if (p_custom && p_custom != "") {    	v_CurrentDate = "";
		var vvars = name_values(p_custom);
	} else
		v_CurrentDate = "";

	var vCurrentDate;
	if (v_CurrentDate || v_CurrentDate != "") {    	vCurrentDate = new Date(v_CurrentDate);
		p_month = vCurrentDate.getMonth();
		p_year = vCurrentDate.getFullYear().toString();
	} else
		vCurrentDate = "NONE";
	
	v_Resizable = (v_Resizable && v_Resizable != "") ? v_Resizable : "No";
	v_SelectStart = new Date((v_SelectStart && v_SelectStart != "") ? v_SelectStart : vCurrentDate);
	v_SelectEnd = new Date((v_SelectEnd && v_SelectEnd != "") ? v_SelectEnd : vCurrentDate);
	v_SelectStart.setHours(0,0,0,0)
	v_SelectEnd.setHours(23,59,59,999)
	v_SelectAfter = new Date((v_SelectAfter && v_SelectAfter != "") ? v_SelectAfter : "01/01/0001");
	v_SelectBefore = new Date((v_SelectBefore && v_SelectBefore != "") ? v_SelectBefore : "01/01/3000");
	v_SelectAfter.setHours(0,0,0,0)
	v_SelectBefore.setHours(23,59,59,999)
	v_NSHierarchy = isNav ? 
					((v_NSHierarchy && v_NSHierarchy != "") ? (v_NSHierarchy + ".") : "")
					: "";
	var vHeight, vWidth;
	if (p_type == "POPUP") {    	vWidth = (v_Width && v_Width != "") ? v_Width : 260;
		
		if (isIE) vHeight = (v_Height && v_Height != "") ? v_Height : 220;
		else if (isNav) vHeight = (v_Height && v_Height != "") ? v_Height : 210;

		vWinCal = window.open("", "Calendar", 
				"width=" + vWidth + ",height=" + vHeight + 
				",status=no,scrollbars=no,resizable=" + v_Resizable);
		vWinCal.opener = self;
		ggWinCal = vWinCal;
		var p_WinCal = ggWinCal;
	}

	gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format, p_type);
	
	gCal.gCurrentDate = vCurrentDate;
	gCal.gAllowWeekends = 
		(v_AllowWeekends && v_AllowWeekends != "" &&  
		v_AllowWeekends == "Yes") ? "Yes" : "No";

	gCal.gBGColor= (p_type == "POPUP") ? "#cccccc":"#eeeeee";
	gCal.gLinkColor= (p_type == "POPUP") ? "#666666":"#666666";
	gCal.gTextColor=(p_type == "POPUP") ? "#666666":"#eeeeee";
	gCal.gHeaderColor="#000000";
	
	gCal.closeable = v_CloseOnSelect ? 
		((v_CloseOnSelect == "Yes") ? true : false)
		: false;

	gCal.returnMode = v_AppendOrReplace ?
		v_AppendOrReplace : "Replace";

	gCal.returnData = v_ReturnData ?
		v_ReturnData : "Date";

	gCal.appendChar = (gCal.returnMode == "Append") ?
		v_AppendChar ? v_AppendChar : ";" 
		: "";
	gCal.gTitle = v_Title ? v_Title : gCal.gMonthName + "\/" + gCal.gYear;
	
	gCal.show();
}

/* ******************************************************************************* */
/*
Monthly Calendar Code Starts here
*/
function show_calendar() {    
		/* 
		p_item  : Return Item.
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year  : 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_type	: POPUP/INLINE Calendar
		p_custom: String of customizable name/value pair parameters
					v_CloseOnSelect
					v_AppendOrReplace
					v_AppendChar
					v_ReturnData
					v_InlineX
					v_InlineY
					v_Title
					v_CurrentDate
					v_AllowWeekends
					v_Height
					v_Width
					v_Resizable
					v_SelectAfter
					v_NSHierarchy	: If the form calling calendar is in a layer
										(reqd only for Netscape)
	*/
	p_item = arguments[0];
	if (arguments[1] == null)
		p_month = new String(gNow.getMonth());
	else
		p_month = (typeof(arguments[1]) == "number") ? 
						arguments[1].toString() 
						: 
						arguments[1];
	if (arguments[2] == "" || arguments[2] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = (typeof(arguments[2]) == "number") ? 
						arguments[2].toString() 
						: 
						arguments[2];
	if (arguments[3] == null)
		p_format = "MM/DD/YYYY";
	else
		p_format = (typeof(arguments[3]) == "string") ? 
						arguments[3] 
						: 
						"MM/DD/YYYY";
	if (arguments[4] == null)
		p_type = "POPUP";
	else
		p_type = (typeof(arguments[4]) == "string" && 
					(arguments[4] == "POPUP" || arguments[4] == "INLINE")) ?
						arguments[4]
						:
						"POPUP";
	if (arguments[5] == null)
		p_custom = "CloseOnSelect=Yes;AppendOrReplace=Replace;AppendChar=';';ReturnData=Date;Title=Popup Date Picker;AllowWeekends=Yes;Resizable=No";
	else
		p_custom = typeof(arguments[5]) == "string" ?
					arguments[5]
					:
					"CloseOnSelect=Yes;AppendOrReplace=Replace;AppendChar=';';ReturnData=Date;Title=Popup Date Picker;AllowWeekends=Yes;Resizable=No";

	Build(p_item, p_month, p_year, p_format, p_type, p_custom);
}

