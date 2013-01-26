//live 
var lpMTagConfig = {'lpServer' : "sales.liveperson.net",'lpNumber' : "9551721", 'lpProtocol' : (document.location.toString().indexOf("https:") == 0) ? "https" : "http"}
// test camp
//var lpMTagConfig = {'lpServer' : "sales.liveperson.net",'lpNumber' : "41054783", 'lpProtocol' : (document.location.toString().indexOf("https:") == 0) ? "https" : "http"}

function lpAddMonitorTag(src){if(typeof(src)=='undefined'||typeof(src)=='object'){src=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:'/hcp/html/mTag.js';}if(src.indexOf('http')!=0){src=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+src+'?site='+lpMTagConfig.lpNumber;}else{if(src.indexOf('site=')<0){if(src.indexOf('?')<0)src=src+'?';else src=src+'&';src=src+'site='+lpMTagConfig.lpNumber;}};var s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('charset','iso-8859-1');s.setAttribute('src',src);document.getElementsByTagName('head').item(0).appendChild(s);}

if (window.attachEvent) window.attachEvent('onload',lpAddMonitorTag);
else window.addEventListener("load",lpAddMonitorTag,false);

//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=="undefined") lpMTagConfig.dynButton=new Array();

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') lpMTagConfig.pageVar = new Array();
if (typeof(lpMTagConfig.sessionVar)=='undefined') lpMTagConfig.sessionVar = new Array();
if (typeof(lpMTagConfig.visitorVar)=='undefined') lpMTagConfig.visitorVar = new Array();

//Send variables to LivePerson on page load
function lpAddVars(scope,name,value)    {
    if (value != 0 && value != "")  //This is optional, depends if client wants to pass 0 or blank values
    {
        switch (scope){
            case "page": 
                lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+"="+escape(value);
                break;
            case "session": 
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+"="+escape(value);
                break;
            case "visitor": 
                lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+"="+escape(value);
            break;
        }
    }
}

//Send variables to LivePerson after page load, such as in an onClick function
function lpSendVars(scope,name,value){
    switch (scope){
        case "page": 
            lpMTag.lpSendData('&PAGEVAR!'+name+'='+value,true);
            break;
        case "session": 
            lpMTag.lpSendData('&SESSIONVAR!'+name+'='+value,true);
            break;
        case "visitor": 
            lpMTag.lpSendData('&VISITORVAR!'+name+'='+value,true);
            break;
    }
}

// Patch for First Party Cookie
lpMTagConfig.InviteOpenChat = function (url, name, params) {
    lpMTagConfig.InviteOpenWindow(url, name, params);
};
 

lpMTagConfig.InviteOpenVoice = function (url, name, params) {
    lpMTagConfig.InviteOpenWindow(url, name, params);
};

lpMTagConfig.InviteOpenWindow = function (url, name, params) {
    if (lpMTagConfig.useFirstParty) {
        var data = lpMTag.lpGetCookie(lpMTagConfig.lpNumber + '-VID');
        if (data!=null) {
            url += '&visitor='+ data;
            var skey = lpMTag.lpGetCookie(lpMTagConfig.lpNumber + '-SKEY');
            if (skey != null) {
                url += '&msessionkey=' + skey;
            }
        }
        var ow = window.open(url, name, params);
    }
};


lpAddVars('page','UAScontext',document.title);