var rootOpener = null;

/* Using Multiple JavaScript Onload Functions
* Param[1]: fucn : Function Name to be executed.
**/
function AddLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

AddLoadEvent(function () {
    rootOpener = self;
    while (rootOpener.opener != null)
        rootOpener = rootOpener.opener;
});

// The variable 'country' stores the country directory prefix for ASP
var country = ""

var Ver4 = parseInt(navigator.appVersion) >= 4
var Nav4 = ((navigator.appName == "Netscape") && Ver4)
var IE4 = ((navigator.userAgent.indexOf("MSIE") != -1) && Ver4)

// Load the url in the parent window
function loadinparent(url, closeSelf){
	self.opener.location = url;
	if(closeSelf) self.close();
	}

//function to convert numeric dataaccording to contry specific data 
function GetNumericData(stringData)
{   //de-DE uses Number format of ##,# , 
    //en-US, en-gb, en-au, en-CA all use ##.#, 
    //more variations can be added as per need basic for other countries 
    return (stringData.replace(",","."))   
}


var myWindow
//Pop Up Window
function windowOpen(url,width,height,mb,sp) {

myWindow = window.open(url,"windowRef","width=" + width + ",height=" + height+",top=0,left=0,screenX=20,screenY=20,resizable=0,menubar=" + mb + ",scrollbars="+sp);
self.name="main"
}

//Pop Up Window
function windowOpen2(url,wname,width,height,mb,sp) {
myWindow2 = window.open(url,wname,"width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,resizable=0,left=0,top=0,menubar=" + mb + ",scrollbars="+sp);
window.close()
}

//BEGIN FOOD TRACKER CODE

var trackfood = 0
var testlocation=location.href

function foodTrackDiv() {
//alert("here")
if (Nav4) {
var testfile = 0
if (testlocation.search("a7_my_activity") != -1){
testfile=1
} else if (testlocation.search("a7_my_food") != -1) {
testfile=1
}
if (testfile==1){
if (origWidth != window.innerWidth || origHeight != window.innerHeight) {
closefind(2)
}
}
}
}

//END FOOD TRACKER CODE  -

function recipeBuilder() {
//alert("recipebuilder")
var testfile = 0
if (testlocation.search("d6_fr_recipebuilder_edit.asp") != -1){
//alert("recipeBuilder")
serverpage();
	}
if (testlocation.search("d6_fr_recipebuilder_net.asp") != -1){
//alert("recipeBuilder")
serverpage();
	}
if (testlocation.search("netscape.html") != -1){
//alert("recipeBuilder")
serverpage();
	}
}

//added the query string append char to make sure that if the code in TOPNAV 
//can make the redirect url the only key in the query string should that be necessary
//dispatcher url provided by PeripheralSercurityManager
function loginPopupAbsoluteDispatcher(domain, dispatcherURL, queryStringAppendChar, redirectUrlKey, isWWButtonClicked) {
    var url = "http://" + domain + dispatcherURL + queryStringAppendChar + redirectUrlKey + "=" + escape(document.URL);
    if(isWWButtonClicked && true === isWWButtonClicked)
        url = url + "&WB=true"
        
    location.href = url;
}

function loginPopupAbsolute(domain, setURL, toNavQs, isWWButtonClicked) {
    var url = "https://" + domain + "/util/Login.aspx?txtHiddenURL=" + escape(setURL);
    if (typeof (toNavQs) != 'undefined' && toNavQs != null && toNavQs == 'true')
        url = url + "&fblogon=yes";
    
    if(isWWButtonClicked && true === isWWButtonClicked)
        url = url + "&WB=true"
    
    location.href = url;
}

function loginPopup(setURL, toNavQs, isWWButtonClicked) {
    if (setURL.indexOf("xp1=home") > 0)
        setURL = "/index.aspx";
    var url = "https://" + document.domain + "/util/Login.aspx?txtHiddenURL=" + escape(setURL);
    if (typeof (toNavQs) != 'undefined' && toNavQs != null && toNavQs == 'true')
        url = url + "&fblogon=yes";
       
    if(isWWButtonClicked && true === isWWButtonClicked)
        url = url + "&WB=true"
        
    location.href = url;
}

function loginPopupLocal(setURL, toNavQs) {
    var url = "https://" + document.domain + "/util/Login.aspx?txtHiddenURL=" + escape(setURL) + "&#LgnMktg";
    if (typeof (toNavQs) != 'undefined' && toNavQs != null && toNavQs == 'true')
        url = url + "&fblogon=yes";
    location.href = url;
}

// log out popup
function logoutPopup( showPopup, url ) {
    if (showPopup)
		{
		    //this indexOf check is just to avoid a javascript error if something goes wrong
		    //if the replace isn't made, it's a problem 
		    if (url.indexOf("/util/") >= 0)
			    url = url.replace(url.substr(url.indexOf("/util/")),"/util/autologin_logout.aspx");
			location.href = url;
		}
    else
		{
			location.href = url;
		}
}



//****
//This code is used for the User Guide Demos
//****
var pg = "yes"

function openJUG(page) {
var jugName, windowJug

if (page.indexOf("main") >= 0) {
pg = "gateway"
page="gateway"
} else if (page.indexOf("add_food") >= 0) {
pg = "add_food"
} else if (page.indexOf("add_ex") >= 0) {
pg = "add_ex"
} else if (page.indexOf("changing") >= 0) {
pg = "changing"
} else if (page.indexOf("savebank") >= 0) {
pg = "savebank"
} else if (page.indexOf("hints") >= 0) {
pg = "hints"
} else if (page.indexOf("print") >= 0) {
pg = "print"
}

jugName = "/help/j6_he_jug.asp?pg=" + pg + "&page=" + page

windowJug = window.open(jugName,"jug","width=600,height=420,scrollbars=0,toolbar=0,left=100,top=100");

}
//****
//END
//****

//****
//This code is used for the User Guide Demos
//****
var pg = "yes"

function openMUG(page) {
var mugName, windowMug

if (page.indexOf("main") >= 0) {
pg = "gateway"
page = "gateway"
} else if (page.indexOf("about") >= 0) {
pg = "adding"
} else if (page.indexOf("features") >= 0) {
pg = "changing"
} else if (page.indexOf("preferences") >= 0) {
pg = "banking"
} else if (page.indexOf("printing") >= 0) {
pg = "logsave"
} else if (page.indexOf("faqs") >= 0) {
pg = "timesavers"
}

mugName = "/help/j7_he_mug.asp?pg=" + pg + "&page=" + page

windoMug = window.open(mugName,"mug","width=600,height=420,scrollbars=0,toolbar=0,left=100,top=100");

}
//****
//END
//****

//****
//This code is used for the Help popups
//****

	var helpWindow

	//Pop Up Window
	function windowOpenHelp(url) {

	helpWindow = window.open(url,"windowWWhelp","width=600,height=420,top=0,left=0,screenX=0,screenY=0,resizable=0,menubar=0,scrollbars=1,status=1");
	self.name="main"

	}

//****
//END
//****

//****
//These helper functions support zipcode validator functions (see below)
// Author:      Ashes Mukherjee
// Created on:  07/19/2006 
//****

   // similar to ltrim in VB
   function LTrim(str)
   {
      if (str==null)
      {
        return null;
      }
      for(var i=0;str.charAt(i)==" ";i++);
      return str.substring(i,str.length);
   }

   // similar to rtrim in VB
   function RTrim(str)
   {
      if (str==null)
      {
        return null;
      }
      for(var i=str.length-1;str.charAt(i)==" ";i--);
      return str.substring(0,i+1);
   }

   // combines above two trim functions.
   function Trim(str)
   {
      return LTrim(RTrim(str));
   }

//****
//END
//****

//BEGIN SUBMIT TO MEETING FINDER FUNCTION

	function MeetingFinderSubmit() {
		var zipcode = document.pageform.zipcode.value;

		if (zipcode==""){
      alert(msgEnterPostcode)
			document.pageform.zipcode.focus()
			return false
		}

		document.pageform.action = "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(zipcode);
		document.pageform.submit();
	}

  //To be used by Monthly Pass Meeting Finder Zip Code box only. 
  function MPMeetingFinderSubmit() {

    var zipcode = document.pageform.zipcode.value;
    zipcode = Trim(zipcode);
    var regexpStr = "[0-9\ \-]*[0-9]+[0-9\ \-]*";
    var re = new RegExp(regexpStr);
    
    if (zipcode=="" || zipcode.length < 5 || !zipcode.match(re)){
      alert(msgEnterValidPostcode)
      document.pageform.zipcode.focus()
      return false
    }

    var validatepromo = QSParameters('vp');
    
    if (validatepromo == '')
    {    
        document.pageform.action = "/util/mtf/dispatcher.aspx?z=" + escape(zipcode);
    }
    else
    {
        document.pageform.action = "/util/mtf/dispatcher.aspx?z=" + escape(zipcode) + "&vp=" + escape(validatepromo);
    }
    
    document.pageform.submit();
  }

//END SUBMIT TO MEETING FINDER FUNCTION

//This function reads the querystring parameters and returns the value of the parameter passed as an arguement. If the parameter is
//not found, the function returns an empty string
function QSParameters(qsParamToFind) 
{
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    var retVal = '';
    
    for (var i=0; i<parms.length; i++) 
    {
        var pos = parms[i].indexOf('=');
        if (pos > 0) 
        {
            var key = parms[i].substring(0,pos);
            var val = parms[i].substring(pos+1);
            
            if (key == qsParamToFind)
            {
                retVal = val;
            }
        }
    }

    return retVal;
}   

// for user submit form by enter key add by alan zhang 10/14/2002



//Captures the "ENTER" key for form submission
function ByEnterKey(evt,eleName){
	var oneChar;
	var flag=false;
	if ((parseInt(navigator.appVersion) >4)&& (navigator.appName=="Netscape"))
	{
		oneChar =evt.which;
		if (oneChar==13)
		{
			var strTag="";
			var btnNameNS=eleName;
			if(document.getElementById(btnNameNS))
			{
			    flag=true;
				document.getElementById(btnNameNS).focus();
				if (!window.sidebar) 
				{
				    document.getElementById(btnNameNS).click();
				}
			}
			else
			{
			    if(document.getElementsByName(btnNameNS)[0])
			    {
			        document.getElementsByName(btnNameNS)[0].focus();
			        if (!window.sidebar) {document.getElementsByName(btnNameNS)[0].click();}
			    }
			    else
			    {
			        for(i=0; i<document.forms[0].length ; i++)
			        {	
				        if(!flag)
				        {
					        if(document.forms[0].elements[i].name != null && document.forms[0].elements[i].name.indexOf(":")>0)
					        {
					            strTag="";
					            strTag=document.forms[0].elements[i].name.substr(0,document.forms[0].elements[i].name.lastIndexOf(":"));
					            btnNameNS="";
					            btnNameNS=strTag+ ":"+eleName;
					            if(document.getElementsByName(btnNameNS).item(0))
					            {
					                flag=true;
						            document.getElementsByName(btnNameNS).item(0).focus();
						            if (!window.sidebar) {document.getElementsByName(btnNameNS).item(0).click();}
					            }
					        }
				        }
			        }
			    }
			}
		}
	}
    else
	{
	    if(document.all)
	    {
		    oneChar=window.event.keyCode;
		    var temp;
		    if (oneChar==13)
		    {
			    var objElem;
			    if(eval("document.all."+eleName))
			    {
				    objElem=eval("document.all."+eleName);
    				
				    objElem.focus();
			        //if(event.srcElement.tagName == "SELECT" ) {	objElem.click(); }
        			
                    if (navigator.platform.indexOf("Mac")>=0 || event.srcElement.tagName == "SELECT") 
                        {objElem.click(); }
                }
		        else
		        {
			        for(i=0;i<document.forms[0].elements.length;i++)
			        {
				        if(!flag)
				        {
					        if(document.forms[0].elements[i].id)
					        {
						        if(document.forms[0].elements[i].id.lastIndexOf("_")>0)
						        {	
							        temp=""
							        temp=document.forms[0].elements[i].id.substr(0,document.forms[0].elements[i].id.lastIndexOf("_"));
							        objElem=eval("document.all." +temp+"_"+eleName);
							        if(objElem)
							        {
								        flag=true;
								        objElem.focus();
								        if (navigator.platform.indexOf("Mac")>=0) 
								            {objElem.click(); }
							        }
						        }
					        }
				        }
			        }
		        }
	        }
		}
	}
    return true;
}







var meetingZip1,meetingZip2,inputCOUNT,oFormMtf,inputControl1,inputControl2,countryZIPword,genericZip,overloadType
var openInPOPUP = false;
var delimiter = "+";
var strSearchType = null; //city&state ||OR|| zipcode search
var formActionPage = "";
var selectedTime = new Array();
var selectedDay = new Array();
var parentControlName;
var isExpand = "";
var wwControlDomain = "";
	
function GLOBALmeetingSubmit(){
	var timeDayQS;
	//the variable tempShowHide is defined on the root\util\mtf\controls\uctr_MeetingFinder.ascx page.
	//try catch is used to for trapping error in case this JS files is used in any other ASPX page
	try
	{
		isExpand = eval("document." + arguments[0] + "." + tempShowHide); 
		isExpand = isExpand.value
	}
	catch(err)
	{
	}
	if(arguments.length == 1) {
	genericZip = arguments[0];
	submit_mtgFinder_ziponly(genericZip);
	return;
	}
	if(arguments.length == 4 || arguments.length == 5) {
	oFormMtf 	   = eval("document." + arguments[0] + ";");
	
	//This is needeed for aspx pages on different domains; formName & domain will be different
	if(typeof(oFormMtf) == "undefined")
    {
        arguments[0] = document.forms[0].id;
		oFormMtf 	   = document.getElementById(arguments[0]);
        wwControlDomain = controlDomain;
    }
	    
	inputControl1  = document.getElementById(arguments[1]);
	countryZIPword = arguments[3];
	
  if(arguments.length == 5)
	strSearchType  = arguments[4];
  else if (arguments.length == 4)
	strSearchType = null;
	
	GetSelectedCheckBoxes()
	if(strSearchType == "z" || strSearchType == "SE" || strSearchType == true || strSearchType == null) { 		inputControl2  = document.getElementById(arguments[2]);}
	if(strSearchType == "cs") { inputControl2  = document.getElementById(arguments[2]).options[document.getElementById(arguments[2]).selectedIndex]; }
	if("undefined" != selectedTime && 0 < selectedTime.length ) {timeDayQS="t="+selectedTime.join()}else{timeDayQS = ""}
	if("undefined" != selectedDay && 0 < selectedDay.length ) {if(undefined != timeDayQS) {timeDayQS += "&"} timeDayQS += "d="+selectedDay.join()}
   }
		//alert("arguments passed: " + arguments.length + "\nArguments expected: " + GLOBALmeetingSubmit.length);
		//test for oneInput
		if(inputControl2 == "undefined" || inputControl2 == null) {
		meetingZip1 = inputControl1.value.split(" ").join("");
		if (strSearchType == "SE")
		{
		    if (meetingZip1.length == 5 && meetingZip1.indexOf(" "))
		    {		    
		        var z1 = meetingZip1.substr(0,3);
		        var z2 = meetingZip1.substr(3,2);
		        meetingZip1 = z1 + " " + z2;
		    } 
		}
		meetingZip2 = "";
		delimiter = "";
		formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(meetingZip1);
		if(undefined != timeDayQS){formActionPage += "&" + timeDayQS;}
		inputCOUNT = 1;
		}
		//else test for 2 inputs
		else {
		meetingZip1 = inputControl1.value;
		meetingZip2 = inputControl2.value;
		inputCOUNT = 2;
		if(strSearchType == "z" || strSearchType == true || strSearchType == null)  { formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(meetingZip1.split(" ").join("")) + delimiter + escape(meetingZip2.split(" ").join("")); }
		if(strSearchType == "cs") { formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=CS&c=" + meetingZip1.split("&").join("~").split(" ").join("%20") + "&st=" + meetingZip2.split("&").join("~").split(" ").join("%20"); }
		if(undefined != timeDayQS){formActionPage += "&" + timeDayQS;}
		}
		
	if (meetingZip1.length == 0 && strSearchType != "cs") {
      alert(msgEnterZipcode);
			inputControl1.value="";
			inputControl1.focus();
			return false;
		} 
	else if(strSearchType == "cs" && inputControl2.value == "") {
    alert(msgSelectState);
		}
		else { submit_mtgFinder(); }
}//end function

function ValidateMeetingSearchInput(){
	var errMsg = "";
	var timeDayQS;
	var zipRe5digit = /^\d{5}$/;
	//the variable tempShowHide is defined on the root\util\mtf\controls\uctr_MeetingFinder.ascx page.
	//try catch is used to for trapping error in case this JS files is used in any other ASPX page
	try
	{
		isExpand = eval("document." + arguments[0] + "." + tempShowHide); 
		isExpand = isExpand.value
	}
	catch(err)
	{
	}
	if(arguments.length == 1) {
	genericZip = arguments[0];
	submit_mtgFinder_ziponly(genericZip);
	return;
	}
	if(arguments.length == 4 || arguments.length == 5) {
	oFormMtf 	   = eval("document." + arguments[0] + ";");
	
	//This is needeed for aspx pages on different domains; formName & domain will be different
	if(typeof(oFormMtf) == "undefined")
    {
        arguments[0] = document.forms[0].id;
		oFormMtf 	   = document.getElementById(arguments[0]);
        wwControlDomain = controlDomain;
    }
	    
	inputControl1  = document.getElementById(arguments[1]);
	countryZIPword = arguments[3];
	
  if(arguments.length == 5)
	strSearchType  = arguments[4];
  else if (arguments.length == 4)
	strSearchType = null;
	
	GetSelectedCheckBoxes()
	if(strSearchType == "z" || strSearchType == "SE" || strSearchType == true || strSearchType == null) { 		inputControl2  = document.getElementById(arguments[2]);}
	if(strSearchType == "cs") { inputControl2  = document.getElementById(arguments[2]).options[document.getElementById(arguments[2]).selectedIndex]; }
	if("undefined" != selectedTime && 0 < selectedTime.length ) {timeDayQS="t="+selectedTime.join()}else{timeDayQS = ""}
	if("undefined" != selectedDay && 0 < selectedDay.length ) {if(undefined != timeDayQS) {timeDayQS += "&"} timeDayQS += "d="+selectedDay.join()}
   }
		//alert("arguments passed: " + arguments.length + "\nArguments expected: " + GLOBALmeetingSubmit.length);
		//test for oneInput
		if(inputControl2 == "undefined" || inputControl2 == null) {
		meetingZip1 = inputControl1.value.split(" ").join("");
		if (strSearchType == "SE")
		{
		    if (meetingZip1.length == 5 && meetingZip1.indexOf(" "))
		    {		    
		        var z1 = meetingZip1.substr(0,3);
		        var z2 = meetingZip1.substr(3,2);
		        meetingZip1 = z1 + " " + z2;
		    } 
		}
		meetingZip2 = "";
		delimiter = "";
		formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(meetingZip1);
		if(undefined != timeDayQS){formActionPage += "&" + timeDayQS;}
		inputCOUNT = 1;
		}
		//else test for 2 inputs
		else {
		meetingZip1 = inputControl1.value;
		meetingZip2 = inputControl2.value;
		inputCOUNT = 2;
		if(strSearchType == "z" || strSearchType == true || strSearchType == null)  { formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(meetingZip1.split(" ").join("")) + delimiter + escape(meetingZip2.split(" ").join("")); }
		if(strSearchType == "cs") { formActionPage = wwControlDomain + "/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=CS&c=" + meetingZip1.split("&").join("~").split(" ").join("%20") + "&st=" + meetingZip2.split("&").join("~").split(" ").join("%20"); }
		if(undefined != timeDayQS){formActionPage += "&" + timeDayQS;}
		}
		
		
	if (meetingZip1.length == 0 || !inputControl1.value.match(zipRe5digit) ) {
      errMsg = msgEnterZipcode;
		} 
		
	else if(strSearchType == "cs" && inputControl2.value == "") {
    errMsg = msgSelectState;
		}
	return errMsg;
}//end function

function GetSelectedCheckBoxes()
{
	var parentControl = document.getElementById(parentControlName);
	var counter = 0;
	var inputs;

	//try catch is used to for trapping error in case this JS files is used in any other ASPX page where object "input" is not defined
	try
	{
		inputs = parentControl.getElementsByTagName("input");
	}
	catch (err)
	{
	}
	var timeCheckboxCounter = 0;	
	var CheckboxDayCounter = 0;
	
	selectedTime = new Array();
	selectedDay = new Array();
	
	for(counter in inputs)
	{
		var conrol = inputs[counter];
		if("checkbox" == conrol.type)
		{
			if(-1 != conrol.name.indexOf("timeOfDayCheckBox")){
				if(true == conrol.checked){selectedTime[selectedTime.length] = timeOfDay[timeCheckboxCounter];}
				timeCheckboxCounter++;
			}
			else if(-1 != conrol.name.match("CheckboxDay")){
				if(true == conrol.checked){selectedDay[selectedDay.length] = day[CheckboxDayCounter];}
				CheckboxDayCounter++;
			}
		}
	}
	
}


function submit_mtgFinder_ziponly(INTgenericZip) {
var mtfWinResults = window.open("/util/mtf/location_results.aspx?pg=0&isExpand=" + isExpand + "&s=ZIP&z=" + escape(INTgenericZip), "MeetingFinder");
mtfWinResults.focus();
}
	
function submit_mtgFinder(){
if(strSearchType == true) { // strSearchType can be true, for popup results, z for zipcode, cs for citystate searches
var mtfWinResults = window.open(formActionPage, "MeetingFinder");
mtfWinResults.focus();
} 
else { //else strSearchType can be "cs" or "z"
oFormMtf.target = "_top"
oFormMtf.action = formActionPage;
oFormMtf.submit();
return true;
}
}//end function






/* PLANMANAGER SUPPORT LOGIC */
  var planManagerPopupWindow  = null;
  var stillProcessing         = false;
      
  function Notify(p_winHandle) {
    planManagerPopupWindow = p_winHandle;
  }
  
  function openPlanManager(aDeepLink, command, w, h, baseURL) 
  {
		var windowWidth  = w || 825;
		var windowHeight = h || screen.height * .85;
		var leftPos = (screen.width-windowWidth)/2;
		var topPos  = (screen.height-windowHeight)/2-30;
		var _command = (command == null || command == "") ? "" : "&" + command;	    
	      
		if(stillProcessing) 
			return;
	          
		stillProcessing = true;
		aDeepLink = (aDeepLink == null || aDeepLink == "") ? "default":aDeepLink;
		if(null == planManagerPopupWindow || true == planManagerPopupWindow.closed) 
		{
			var planManagerUrl = "/plan/mgr/PlanManager.aspx?deepLink=" + aDeepLink  + _command;
			
			if (baseURL != null)
			{
				planManagerUrl = baseURL + planManagerUrl;
			}
			else if (location.protocol != 'http:')
			{
				planManagerUrl = 'http://'+ location.host + planManagerUrl;
			}
			planManagerPopupWindow = window.open(planManagerUrl,"planManagerPopupWindow","left=" + leftPos + ",top=" + topPos + ",width=" + windowWidth + ",height=" + windowHeight + ",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes");
		}
		else {
			try {
				planManagerPopupWindow.focus();
				planManagerPopupWindow.Notify(aDeepLink, command);								
			}
			catch(exception){
				planManagerPopupWindow = null;
				stillProcessing = false; 
				openPlanManager(aDeepLink, command, w, h, baseURL); 
			}
		}
		stillProcessing = false;
	}
  
      //SWITCH GUIDE LOGIC
      function PlanManagerIsActive() {
                return (planManagerPopupWindow != null)
            }
            function DoDefaultAction() {
                return true;
            }
            function CancelDefaultAction() {
                return false;
            }
            function ConfirmTheSwitch(switchMessage) {
                var confirmSwitch = confirm(switchMessage);
              if(confirmSwitch) {
                  planManagerPopupWindow.close();
                  return true;
              }
              else {
                  return CancelDefaultAction();
              }
            }
          function CaptureButtonClicksFor(arrayOfButtonIDs) 
          {
              for(i=0; i<=arrayOfButtonIDs.length-1; i++)
              {
                  var aSwitchButton = document.getElementById(arrayOfButtonIDs[i]);
                  if(aSwitchButton != null) { 
                      aSwitchButton.onclick = SwitchPlans;
                  }
              }
          }
     //END SWITCH-GUIDE LOGIC
     
     function ClosePlanManagerPopupWindow() {
        var planManagerPopupWindow = window.open('','planManagerPopupWindow','width=1,height=1,left=1,top=1,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');
        planManagerPopupWindow.close();
     }
//END

//---------------------------------:::Jscript Object Oriented Classes:::------------------------------
/*JSmith - Oct.29.2003*/

/*Filter Class
 Usage:
	var regExp = /^([0-9]{5})$/;
	var myFilter = new Filter(regExp,"Sorry! Please Enter a Valid Zipcode")
	var checkZip = myFilter.isValid("10462")
*/
function Filter(oRegEx,strError) {
	this.filter = oRegEx;
	this.ErrorMessage = strError || "error";
	this.isValid = function(strValueToTest) {
			return this.filter.test(strValueToTest)
		}
	}


/*Private itemsCollection*/
function itemsCollections() {
	this.private_ArrayZipQuery = new Array();
	this.Add = function(strZipValue) {
		if(strZipValue != "") {
			this.private_ArrayZipQuery[this.private_ArrayZipQuery.length] = strZipValue;
		}
	}
	this.Count = function() { return this.private_ArrayZipQuery.length}
	this.Index = function(IntPos) { return this.private_ArrayZipQuery[parseInt(IntPos)]}
}

/* Print signup Confirmation pages */
 function printSignupConfirmation()
        {
	    var href = window.location.href;
	    var query = "print=true";
	    var newUrl = "";
	    if (href.indexOf('?') == -1)
	        newUrl = href + "?" + query;
	    else
	        newUrl = href + "&" + query;
	    //This will open new page with Page.IsPostBack = true.
	    /*document.forms[0].action = newUrl;
	    document.forms[0].target = "_new";
	    document.forms[0].submit();*/
        //This will open new page with Page.IsPostBack = false.
	    window.open(newUrl);
        }

/*Meetings Finder Class
Usage:
	var filter = /^(([a-zA-Z]{1,3}[0-9]{1,3})(\+)?([0-9]{1,3}[a-zA-Z]{1,3})?)?([0-9]{5})?$/;
	var ZipQuery = new MTFZipSearch();
	ZipQuery.Items.Add("LL20");
	ZipQuery.Items.Add("8RA");
	ZipQuery.Validation = new Filter(filter,"Please enter a valid post/zip code.");
	ZipQuery.Execute(document);
*/
function MTFZipSearch() {
	this.Items = new itemsCollections();
	this.UseValidation = "";
	this.ProcessingPage = "/util/mtf/location_results.aspx";
	this.Dispose = function() {
		this.Items.private_ArrayZipQuery.length = 0;
		strZipQuery = null;
	}
	
	this.Execute = function(oTargetResults) {
		var relativeMTFPath = unescape(this.ProcessingPage + "?pg=0%26s=ZIP%26z=");
		var strZipQuery = ""
			for(i=0;i<=this.Items.private_ArrayZipQuery.length-1;i++) {
				strZipQuery = strZipQuery + this.Items.private_ArrayZipQuery[i] + "+";
			}
		strZipQuery = strZipQuery.substr(0,strZipQuery.lastIndexOf("+"));
					//Check for validation
					if(typeof this.Validation == "object") {
						if(this.Items.private_ArrayZipQuery.length <= 0) { alert(this.Validation.ErrorMessage); this.Dispose(); return; }
						if(!this.Validation.isValid(strZipQuery)) {alert(this.Validation.ErrorMessage); this.Dispose(); return;}
						}
					if(typeof this.Validation == "string") {
						if(this.Validation.length >= 1) {
							if(this.Items.private_ArrayZipQuery.length <= 0) {alert(this.Validation); this.Dispose(); return;}
						}
					}
		oTargetResults.location.href = relativeMTFPath + strZipQuery;
		//alert(relativeMTFPath + strZipQuery);
		this.Dispose();
	}
}
//------End Classes-----------------------------------------------------------------------------
//This method is used by 6.0components
//It gets URL from value attribute for selected option and either open the
//URL in a popup window or in the current window.
function openWindow(dropDownId, validationMessage, window, height, width)
{
	var dropDownObject;
	var selectedOptionIndex;
	
	if(document.getElementById)
	{
		dropDownObject = document.getElementById(dropDownId);
		selectedOptionIndex = dropDownObject.selectedIndex;
		url = dropDownObject.options[selectedOptionIndex].value;
        if(url && '0' != url)
		{
			if("blank" == window.toLowerCase())
			{
				windowOpen(url, width, height, 1,1);
			}
			else
			{
				parent.location.href = url;
			}
		}
		else
		{
			if(validationMessage)
			{
				alert(validationMessage);
			}
			dropDownObject.focus();
			return false;
		}
	}
}



//Begin Toggle Tabs
//These methods is used by 9.3 wide home page components.
function showDiv(pass){
    var divs = document.getElementsByTagName('div'); 
    for(i=0;i < divs.length;i++)
    {
        if(divs[i].id.match(pass) ){//if they are 'see' divs
            if (document.getElementById) // DOM3 = IE5, NS6
                divs[i].style.display="block";// show/hide
            else if (document.layers) // Netscape 4
                document.layers[divs[i]].display="block";
            else // IE 4
                document.all.divs[i].display="block";
        }
        else if(divs[i].className=="mainDiv")
        {
            if (document.getElementById)
                divs[i].style.display="none";
            else if (document.layers) // Netscape 4
                document.divs[i].display="none";
            else // IE 4 
                document.all.divs[i].display="none";
        }
    }
} 
 
function toText(ele,arc)
{
    var span = document.getElementById(ele);
    span.innerHTML = document.getElementById(ele).childNodes[0].innerHTML;
}

function toLink(ele,div,myele,mydiv)
{
    var span = document.getElementById(ele);
    var txt = span.innerHTML;
    span.innerHTML = "<a href=\"javascript:showDiv('" + div  + "');toText('" + ele + "',this);toLink('" + myele + "','" + mydiv + "','" + ele + "','" + div + "')\">" + txt + "</a>";
}
//End Toggle Tabs
      
//Begin Truncate Paragraph
//These methods is used by 9.3 wide home page components.
function truncateText(strMyDivID){
    var strOriginalText = strOriginalArray[strMyDivID];
    var strLinkID = strLinkIDPrefix + strMyDivID;
    //create dynamic hyperlink for expand/collapse the text
    var objCurrentText=document.getElementById(strMyDivID);
    var objShowMore=document.createElement("a");

    objShowMore.id=strLinkID;
    objShowMore.innerHTML=strMoreSource;
    objShowMore.className=strLinkCSS;
    objShowMore.onclick=function(){
        truncateText(strMyDivID);
    };

    try{
        var objFind;
        objFind=document.getElementById(strLinkID);

        if(objFind!=null)
            objCurrentText.removeChild(objFind);
    }catch(e){}

    if(objCurrentText.innerHTML.toString().length-strMore.length>strMaxLength){
        objCurrentText.innerHTML=strOriginalText.substr(0,strMaxLength-1);
        // Do not truncate in the middle of a word (only on a word boundary)
        objCurrentText.innerHTML = objCurrentText.innerHTML.replace(/\w+$/, '');
        objCurrentText.title=strOriginalText;
        objShowMore.innerHTML=strMoreSource;
        objShowMore.title=strClickToViewMoreToolTips;
        objCurrentText.appendChild(objShowMore);
    }else{
        if(strOriginalText.length>strMaxLength){
            objCurrentText.innerHTML=strOriginalText;
            objShowMore.innerHTML=strMinusSource;
            objShowMore.title=strClickToCollapseToolTips;
            objCurrentText.title='';
            objCurrentText.appendChild(objShowMore);
        }
    }
}

function truncateInit(strMyDivID){
    strOriginalArray[strMyDivID]=document.getElementById(strMyDivID).innerHTML.toString();
}

function getGatewayName(){
	var gatewaylevelname = document.getElementById('gatewaylevel1').value;
	return gatewaylevelname;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
//End Truncate Paragraph
//Omnitrue Tracking
function SendTracking(pageName, channel, trackingLocation, searchStatus, searchCategory, searchTerm) {
	s.pageName = pageName;
    if (s.pageName == null || s.pageName.length == 0) { 
		s.pageName=trim(document.title);
		if (s.pageName.indexOf(":") >= 0) {
			s.pageName = trim(s.pageName.substring(s.pageName.indexOf(":")+1))
		}
	}

    if (channel !== undefined) s.channel = channel;
	if (trackingLocation !== undefined) s.prop23 = trackingLocation;
    if (searchStatus !== undefined) s.prop27 = searchStatus;
	if (searchCategory !== undefined) s.prop28 = searchCategory; 
    if (searchTerm !== undefined) s.prop29 = searchTerm;
	
    sendAnalyticsEvent();
}

var omnitureTrackingLateBinding;
function InitOmnitureLateBindingObj() {
    //JS Omniture Tracking Late Binding.
    if (typeof omnitureTrackingLateBinding === 'undefined' || omnitureTrackingLateBinding === null) {
        omnitureTrackingLateBinding = {
            "events": [],
            "eVars": []
        };
    }
}

//Omnitrue Tracking Late Binding, push event into s object within page load.
function PushOmnitureLateBindingEvent(item) {
    InitOmnitureLateBindingObj();
    omnitureTrackingLateBinding.events.push({ "item": item });
}

//Omnitrue Tracking Late Binding, push eVar into s object within page load.
function PushOmnitureLateBindingEvar(item, value) {
    InitOmnitureLateBindingObj();
    omnitureTrackingLateBinding.eVars.push({ "item": item, "value": value });
}
function ValidatePersonnummer_Client(sender, args) {
    args.IsValid = IsValidIdNr(args.Value);
}
function IsValidIdNr(idNumber) {
    if (null == idNumber || "" == idNumber) {
        return true;
    }

    if (idNumber.indexOf("-") != -1) {
        idNumber = idNumber.replace("-", "");
    }

    if (idNumber.indexOf(' ') != -1) {
        idNumber = idNumber.replace(" ", "");
    }

    if (idNumber.length == 12) {
        idNumber = idNumber.substring(2);

    } else if (idNumber.length != 10) {
        return false;
    }


    return (CalculateIdNrControlNumber(idNumber.substring(0, 9)) == parseInt(idNumber[idNumber.length - 1]));
}

function CalculateIdNrControlNumber(idNumber) {
    var sum = 0;
    for (var i = 0; i <= idNumber.length - 1; i++) {
        var number = parseInt(idNumber[i]) * (1 + ((i + 1) % 2));
        number = number.toString();
        if (number.length == 1) {
            sum += parseInt(number)
        }
        else {

            sum += parseInt(number.substring(0, 1));
            sum += parseInt(number.substring(1));

        }
    }

    var szSum = sum.toString();
    var lastNum = parseInt(szSum[szSum.length - 1]);

    return (lastNum != 0) ? 10 - lastNum : 0;
}


//End Omniture Tracking