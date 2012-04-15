
function SetCookie(NameOfCookie, value, expirehours)
{
var ExpireDate = new Date ();
ExpireDate.setTime(ExpireDate.getTime() + (expirehours * 3600 * 1000));
document.cookie = NameOfCookie + "=" + escape(value) +
((expirehours == null) ? "" : "; expires=" + ExpireDate.toGMTString()) +
"; domain=.webshots.com; path=/;" ;
}

function GetCookie(name)
{
  // cookies are separated by semicolons
  var cookieArray = document.cookie.split("; ");
  for (var i=0; i < cookieArray.length; i++)
  {
    // a name/value pair (a crumb) is separated by an equal sign
    var crumb = cookieArray[i].split("=");
    if (name == crumb[0]) 
      return unescape(crumb[1]);
  }

  // a cookie with the requested name does not exist
  return null;
}


var CookieTest = -1;
SetCookie('cookie-test',1,1);
if (document.cookie.indexOf('cookie-test')!=-1)
CookieTest = 1;

//	if (Math.random && (Math.floor(150000*Math.random()) == 1) && (document.cookie.indexOf('satisfaction_survey')==-1))
//		document.write("<script src='http://p.webshots.net/js/satisfaction-1.1.js'></script>");

function openwin(name,w,h,scrollbars,resizable,url)
{
var left = (screen.width-w)/2;
var top  = (screen.height-h)/2;

var win = window.open("",name,"width=" + w + ",height=" + h +",scrollbars=" + scrollbars +",resizable=" + resizable +",screenx="+left+",screeny="+top+",left="+left+",top="+top);
if (url)
win.location.href=url;
win.focus();
return win;
}

var AllCookies = unescape(document.cookie);
function NumDaysToExpire(type)
{
var S;
if (type == 'auction')
S = AllCookies.indexOf("G_x23{:t}") + 9;
else
S = AllCookies.indexOf("G_x21{:t}") + 9;
if (S <= 9)
return 999;
var Y = AllCookies.substring(S, S+4);
var M = AllCookies.substring(S+5, S+7);
var D = AllCookies.substring(S+8, S+10);
var Exp = new Date(Y,M-1,D,23,59,59,0);
var Now = new Date();
var Days = Math.floor((Now.getTime() - Exp.getTime())/(1000*60*60*24));
return Days;
}

var Auctions = ((AllCookies.indexOf("G_x22{:t}5") >= 0) && (NumDaysToExpire('auction') <= 0));
var SignedUp = (AllCookies.indexOf("daily=") >= 0);
var Premium = ((AllCookies.indexOf("G_x20{:t}*pre") >= 0) && (NumDaysToExpire() <= 0));
var Expired = ((AllCookies.indexOf("G_x20{:t}*exp") >= 0) || (NumDaysToExpire() > 0));

function GetFirstName()
{
var Name = "";
if (SignedUp)
{
var start = AllCookies.indexOf("G_x2{:t}") + 8;
var end = AllCookies.indexOf("{:n}", start);
if (start >= 0)
Name = AllCookies.substring(start, end);
}
return Name;
}
