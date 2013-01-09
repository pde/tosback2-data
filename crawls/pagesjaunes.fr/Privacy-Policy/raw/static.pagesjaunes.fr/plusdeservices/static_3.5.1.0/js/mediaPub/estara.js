var wv_vars = typeof(wv_vars)=="undefined" ? new Array() : wv_vars;
wv_vars["ui_width"]     = "430";
wv_vars["ui_height"]    = "378";
wv_vars["ui_version"]   = "UI0001";
wv_vars["ui_newwindow"] = "yes";
wv_vars["ui_accountid"] = "200106282255";
wv_vars["ui_host"]      = "as00.estara.com";
wv_vars["ui_maxreferrer"] = 350;
wv_vars["ui_window"]    = null;

function webVoiceNNG()
{
  var wv_argscopy = arguments;
  wv_argscopy[wv_argscopy.length++] = "calltype=webvoicepop";
  return wv_startNNG(wv_argscopy);
}

function wv_startNNG(a)
{
  var wv_wndname = "webVoiceWindow" + (new Date()).getTime() + Math.round(Math.random()*1000000);
  var wv_referrer = escape(window.location);
  if (wv_referrer.length>wv_vars["ui_maxreferrer"])
  {
    var wv_tmp  = (window.location).toString().indexOf("?");
    wv_referrer = wv_tmp>0 ? escape((window.location).toString().substring(0,wv_tmp)+"---TRUNCATED") : escape("UNAVAILABLE - URL IS TOO LONG");
    if (wv_referrer.length>wv_vars["ui_maxreferrer"])
	{
	  wv_referrer = escape("UNAVAILABLE - URL IS TOO LONG");
	}
  }
  var wv_pagetitle = typeof(document.title)!="undefined" ? escape(document.title) : "UNKNOWN";
  if (wv_pagetitle.length>255)
  {
    wv_pagetitle = escape((document.title).toString().substring(0,243)+"---TRUNCATED");
  }
  var wv_newwindow = wv_vars["ui_newwindow"];
  var wv_width = wv_vars["ui_width"];
  var wv_height = wv_vars["ui_height"];
  var wv_ui = wv_vars["ui_version"];
  var wv_accountid = wv_vars["ui_accountid"];
  var wv_features = "";
  var wv_baseurl = "";
  var wv_getRequest = "";
  var wv_protocol = document.location.protocol=="file:" ? "http" : "";

  for (var i=0 ; i<a.length ; i++)
  {
    var wv_Arg = a[i].toString();
    var wv_indexDelim = wv_Arg.indexOf("=");
    if (wv_indexDelim!=-1)
    {
      var Name = (wv_Arg.substring(0,wv_indexDelim)).toLowerCase();
      var Value = wv_Arg.substring(wv_indexDelim+1,wv_Arg.length);
      switch(Name)
      {
        case "wndname": wv_wndname = Value;
        break;
        case "referrer": wv_referrer = escape(Value);
        break;
        case "newwindow": wv_newwindow = Value;
        break;
        case "width": wv_width = Value;
        break;
        case "height": wv_height = Value;
        break;
        case "accountid": wv_accountid = Value;
        break;
        case "wv_ui": wv_ui = Value;
        break;
        case "features": wv_features = Value;
        break;
        case "baseurl": wv_baseurl = Value;
        break;
        case "protocol": wv_protocol = Value;
        break;
        case "ppwinname": if (Value=="") { Value = "PagePushWindow" + (new Date()).getTime() + Math.round(Math.random()*1000000); this.name = Value; }
                default: wv_getRequest += "&" + Name + "=" + escape(Value);
        break;
      }
    }
    else
    {
      alert("ERROR: Invalid argument passed to webXXX() function - Arg" + i + " is missing '=' sign : " + wv_Arg );
      return null;
    }
  }

  
  if (wv_protocol!="") wv_protocol += ":";
  if (wv_baseurl=="")  wv_baseurl  = wv_protocol + "//" + wv_vars["ui_host"] + "/UI/" + wv_ui + "/" + wv_ui + ".php";
  if (wv_features=="") wv_features = "width=" + wv_width + ",height=" + wv_height + ",menubar=no,toolbar=no,directories=no,scrollbars=no,status=no,left=0,top=0,resizable=no";
  wv_getRequest = wv_baseurl +
                  ( wv_baseurl.indexOf("?")==-1 ? "?" : "&" ) +
                  "donotcache=" + (new Date()).getTime() +
                  "&accountid=" + wv_accountid +
                  "&referrer="  + wv_referrer +
                  "&pagetitle="  + wv_pagetitle +
                  "" +
                  wv_getRequest;


  return wv_getRequest;
}
