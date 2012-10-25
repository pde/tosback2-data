function clickButton(e, buttonid){
  var bt = document.getElementById(buttonid); 
  if (typeof bt == 'object'){ 
        if(navigator.appName.indexOf("Netscape")>(-1)){ 
              if (e.keyCode == 13)
			  { 
                    bt.click(); 
                    return false; 
              } 
        } 
        if (navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){ 
              if (event.keyCode == 13)
			  { 
                    bt.click(); 
                    return false; 
              } 
        } 
  } 
}
function CheckPolicyAccessInput(userid, password){
	var DisplayFlag = false;
	var ErrorMsg = "";
	var userErr = false;
    if (userid.value == "")
	{
	    ErrorMsg = ErrorMsg + "Must enter user ID.<br>";
	    DisplayFlag = true;
	    userErr = true;
    }
    if (password.value == "")
	{
	    ErrorMsg = ErrorMsg + "Must enter a password.\n";
	    DisplayFlag = true;
    }
    if (!isValidCharacter(password.value) || !isValidCharacter(userid.value))
	{
	    ErrorMsg = ErrorMsg + "Must enter English letters.\n";
	    DisplayFlag = true;
	    userErr = true;
    }
    if (DisplayFlag)
	{
	    loginDisplayErrorMsg(ErrorMsg);
	    if(userErr){
		    userid.focus();
		}
	    else {
		    password.focus();
		}
	    return false;
    }
	return true;
}
function isValidCharacter(s){
	var tempRegExp;
	tempRegExp = new RegExp("^\u007E|\u00D1|\u00F1|\u00B4|\u00C1|\u00C9|\u00CD|\u00D3|\u00DA|\u00DD|\u00E1|\u00E9|\u00ED|\u00F3|\u00FA|\u00FD");
	if (tempRegExp.test(s)){
		return false;
	}
	return true;
}
function loginDisplayErrorMsg(errMsg){
	var errMsgDiv = document.getElementById("loginErrMsg");
	errMsgDiv.innerHTML = errMsg;
	errMsgDiv.style.display = "block";
}
function ValUserID(src, args){
	var value = args.Value;
	value = args.Value.replace(/^\s*|\s*$/g,"");
	if ((value == "username"))
		args.IsValid = false;
	else
		args.IsValid = true;

}
function ValPassword(src, args){
	var value = args.Value;
	value = args.Value.replace(/^\s*|\s*$/g,"");
	if ((value == "password"))
		args.IsValid = false;
	else
		args.IsValid = true;
}
function trackOlsLogin(btn){
    if (typeof pageTracker == "object" && Page_IsValid == true) {
        var category = "OLS";
        var eventName = "GeneralLogin";
        var loc = window.location.href;
        //check for domain (in case of claims.prog.com) and then sub-folder (www.prog.com/claims)
        if(loc.split('/')[2].indexOf("claims") != -1 || loc.split('/')[3].indexOf("claims") != -1)
            eventName = "ClaimsLogin";
        pageTracker._trackEvent(category,eventName,loc);
    }
}
function AmadesaOLSLoginClickConversion(){
    if(!!Page_IsValid){
        var id = "7804"; //Amadesa conversion page id (these are obtained from Amadesa)
        if (typeof AmConstant == "object") amReportCompletion(id);
    }
}