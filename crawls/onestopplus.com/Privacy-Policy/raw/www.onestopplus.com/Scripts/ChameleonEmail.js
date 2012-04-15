//////////////////////////////////Start of EmailAsync///////////////////////////////////////
// Functions renamed to no longer conflict with EmailsyncWithBg.js
// to allow additional email sign-ups using Chameleon. (2009 FB6)

var xmlHttp; 

function AsyncEmail() {
    var url; var txtEmail = document.getElementById("AsyncEmail");
    var emailError = document.getElementById("AsyncEmailError");
    var emailResult = document.getElementById("AsyncEmailResult");
    
    emailError.innerHTML = ""; emailResult.innerHTML = "";
    
    if (txtEmail.value.length > 0) {
        if (echeck(txtEmail.value)==true) {
            var url="/Checkout/ChameleonEmail.aspx?eml=" + txtEmail.value; 
            AsyncEx (url);
        } else { emailError.innerHTML = "Your email address is invalid."; }
    } else { emailError.innerHTML = "Please enter your email address."; }    
}

function AsyncClearUp() {
    var txtEmail = document.getElementById("AsyncEmail");
    var emailError = document.getElementById("AsyncEmailError");
    txtEmail.value = ""; emailError.innerHTML = "";
}

function echeck(str) {
    var at="@";	var dot="."; var lat=str.indexOf(at);
	var lstr=str.length; var ldot=str.indexOf(dot);
	if (str.indexOf(at)==-1) { return false }
	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr) { return false }
	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr) { return false }
	if (str.indexOf(at,(lat+1))!=-1) { return false }
	if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot) { return false }
	if (str.indexOf(dot,(lat+2))==-1) { return false }
	if (str.indexOf(" ")!=-1) { return false }
	return true;				
}

function AsyncResp() { 
    try {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {
            var response = xmlHttp.responseText; 
            if (response.length > 0) {
                var emailResult = document.getElementById("AsyncEmailResult");
                emailResult.innerHTML = response.split("^")[1];
                AsyncClearUp();
            } 
        }
    }
    catch(e){}
}

function AsyncEx(url) { 
    try {
        xmlHttp = AsyncGetXml(AsyncResp); 
        AsyncSendXml(xmlHttp, url); 
    }
    catch(e){} 
} 

function AsyncSendXml(xmlhttp, url) { 
    xmlhttp.open('GET', url, true); 
    xmlhttp.send(null); 
}

function AsyncGetXml(handler) { 
    var objXmlHttp = null;
    if (!window.XMLHttpRequest) {
        objXmlHttp = GetMSXmlHttp();
        if (objXmlHttp != null) {
            objXmlHttp.onreadystatechange = handler;
        }
    } else {
        objXmlHttp = new XMLHttpRequest();
        if (objXmlHttp != null) {
             objXmlHttp.onreadystatechange = handler;
        }
    } 
    return objXmlHttp; 
} 

function GetMSXmlHttp()
{
    var xmlHttp = null;
    var clsids = ["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0",
                 "Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.3.0", 
                 "Msxml2.XMLHTTP.2.6","Microsoft.XMLHTTP.1.0", 
                 "Microsoft.XMLHTTP.1","Microsoft.XMLHTTP"];
    for(var i=0; i<clsids.length && xmlHttp == null; i++) {
        xmlHttp = AsyncCreateXml(clsids[i]);
    }
    return xmlHttp;
}

function AsyncCreateXml(clsid) {
    var xmlHttp = null;
    try {
        xmlHttp = new ActiveXObject(clsid);
        lastclsid = clsid;
        return xmlHttp;
    }
    catch(e){}
}
//////////////////////////////////////////////////////////////////////////////////////
// Basically another EmailAsync. Allows a third email sign-up form per page.

var xmlHttp; 

function ChameleonEmail ()
{
    var url; var txtEmail = document.getElementById("ChamEmail");
    var emailError = document.getElementById("ChamEmailError");
    var emailResult = document.getElementById("ChamEmailResult");
    
    emailError.innerHTML = ""; emailResult.innerHTML = "";
    
    if (txtEmail.value.length > 0) {
        if (echeck(txtEmail.value)==true) {
            var url="/Checkout/ChameleonEmail.aspx?eml=" + txtEmail.value; 
            ChamEx (url);
        } else { emailError.innerHTML = "Your email address is invalid."; }
    } else { emailError.innerHTML = "Please enter your email address."; }    
}

function ClearUp () {
    var txtEmail = document.getElementById("ChamEmail");
    var emailError = document.getElementById("ChamEmailError");
    txtEmail.value = ""; emailError.innerHTML = "";
}

function echeck(str) {
    var at="@";	var dot="."; var lat=str.indexOf(at);
	var lstr=str.length; var ldot=str.indexOf(dot);
	if (str.indexOf(at)==-1) { return false }
	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr) { return false }
	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr) { return false }
	if (str.indexOf(at,(lat+1))!=-1) { return false }
	if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot) { return false }
	if (str.indexOf(dot,(lat+2))==-1) { return false }
	if (str.indexOf(" ")!=-1) { return false }
	return true;				
}

function ChamResp() { 
    try {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {
            var response = xmlHttp.responseText; 
            if (response.length > 0) {
                var emailResult = document.getElementById("ChamEmailResult");
                emailResult.innerHTML = response.split("^")[1];
                ClearUp();
            } 
        }
    }
    catch(e){}
}

function ChamEx(url) { 
    try {
        xmlHttp = ChamGetXml(ChamResp); 
        ChamSendXml(xmlHttp, url); 
    }
    catch(e){} 
} 

function ChamSendXml(xmlhttp, url) { 
    xmlhttp.open('GET', url, true); 
    xmlhttp.send(null); 
}

function ChamGetXml(handler) { 
    var objXmlHttp = null;
    if (!window.XMLHttpRequest) {
        objXmlHttp = GetMSXmlHttp();
        if (objXmlHttp != null) {
            objXmlHttp.onreadystatechange = handler;
        }
    } else {
        objXmlHttp = new XMLHttpRequest();
        if (objXmlHttp != null) {
             objXmlHttp.onreadystatechange = handler;
        }
    } 
    return objXmlHttp; 
} 

function GetMSXmlHttp()
{
    var xmlHttp = null;
    var clsids = ["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0",
                 "Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.3.0", 
                 "Msxml2.XMLHTTP.2.6","Microsoft.XMLHTTP.1.0", 
                 "Microsoft.XMLHTTP.1","Microsoft.XMLHTTP"];
    for(var i=0; i<clsids.length && xmlHttp == null; i++) {
        xmlHttp = ChamCreateXml(clsids[i]);
    }
    return xmlHttp;
}

function ChamCreateXml(clsid) {
    var xmlHttp = null;
    try {
        xmlHttp = new ActiveXObject(clsid);
        lastclsid = clsid;
        return xmlHttp;
    }
    catch(e){}
}
//////////////////////////////////End of EmailAsync/////////////////////////////////////////////////

