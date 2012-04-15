/*
 * Added for bug 383376
 */
var cX = 0; var cY = 0; var rX = 0; var rY = 0;
function UpdateCursorPosition(e){ cX = e.pageX; cY = e.pageY;}
function UpdateCursorPositionDocAll(e){ cX = event.clientX; cY = event.clientY;}
if(document.all) { document.onmousemove = UpdateCursorPositionDocAll; }
else { document.onmousemove = UpdateCursorPosition; }
function AssignPosition(d) {
if(self.pageYOffset) {
	rX = self.pageXOffset;
	rY = self.pageYOffset;
	}
else if(document.documentElement && document.documentElement.scrollTop) {
	rX = document.documentElement.scrollLeft;
	rY = document.documentElement.scrollTop;
	}
else if(document.body) {
	rX = document.body.scrollLeft;
	rY = document.body.scrollTop;
	}
if(document.all) {
	cX += rX; 
	cY += rY;
	}
d.style.left = (cX+10) + "px";
d.style.top = (cY+10) + "px";
}
function HideContent(d) {
if(d.length < 1) { return; }
document.getElementById(d).style.display = "none";
}
function ShowContent(d) {
if(d.length < 1) { return; }
var dd = document.getElementById(d);
AssignPosition(dd);
dd.style.display = "block";
}
function ReverseContentDisplay(d) {
if(d.length < 1) { return; }
var dd = document.getElementById(d);
AssignPosition(dd);
if(dd.style.display == "none") { dd.style.display = "block"; }
else { dd.style.display = "none"; }
}

/*
 * Opens a popup window and places focus on it.
 * Pass flags as true or false.
 */
function openPopupWindow( urlString, windowName,
                          includeToolbar, includeStatus, isScrollable, isResizable,
                          width, height )
{
  var attributes = '';

  if ( includeToolbar == true )
  {
      attributes = attributes + 'toolbar=yes,';
  }
  else
  {
      attributes = attributes + 'toolbar=no,';
  }

  if ( includeStatus == true )
  {
      attributes = attributes + 'status=yes,';
  }
  else
  {
      attributes = attributes + 'status=no,';
  }

  if ( isScrollable == true )
  {
      attributes = attributes + 'scrollbars=yes,';
  }
  else
  {
      attributes = attributes + 'scrollbars=no,';
  }

  if ( isResizable == true )
  {
      attributes = attributes + 'resizable=yes,';
  }
  else
  {
      attributes = attributes + 'resizable=no,';
  }

  attributes = attributes + 'width=' + width + ",";

  attributes = attributes + 'height=' + height;

  var popupWindow = window.open( urlString, windowName, attributes );

  popupWindow.focus();

  return popupWindow;
}

/*
 * see if Netscape or a Mac is in use
 *
 */
function isNetscapeOrMac()
{
  browser_version = parseInt( navigator.appVersion );
  browser_type    = navigator.appName;
  platform        = navigator.platform;
  platform_slice  = platform.slice( 0, 3 );

  
//  alert( 'browser_version:' + browser_version + ':\n' +
//         'browser_type:'    + browser_type    + ':\n' +
//         'platform:'        + platform        + ':\n' +
//         'platform_slice:'  + platform_slice  + ':' );

  if ( (browser_type == "Netscape") ||
       (platform_slice == "Mac"   )  )
  {
    return true;
  }

  return false;
}

/**
 * See if Mac is in use.
 */
function isMac( )
{
  platform        = navigator.platform;
  platform_slice  = platform.slice( 0, 3 );

  if ( platform_slice == "Mac" )
  {
    return true;
  }

  return false;
}

/* -- seats left -- */
s_userAgent = window.navigator.userAgent
isIE = (document.all) ? 1 : 0;
isKHTML = (s_userAgent.indexOf("KHTML")>-1) ? 1 : 0;
isMac = (s_userAgent.indexOf("Mac")>-1) ? 1 : 0;
t_hideinfo = null;
t_fade = null;
function getscrollamt(s_dir){
    i_amt = (s_dir=='y') ? (document.all) ? document.body.scrollTop : window.scrollY : (document.all) ? document.body.scrollLeft : window.scrollX;
    return i_amt;
}
function showinfo(evt,s_info){
    clearTimeout(t_hideinfo);
    o_info = document.getElementById(s_info);
    resetfade(o_info);
    o_info.style.left = "-10000px";
    o_info.style.display="block";
    i_infoh = o_info.offsetHeight;
    i_infow = parseInt(o_info.offsetWidth/2,10);
    evt = (window.event) ? window.event : evt;
    i_mousey = evt.clientY;
    i_mousex = evt.clientX;
    o_content = document.getElementById("mainContent");
    i_y = (i_mousey>i_infoh) ?  getscrollamt('y')-document.getElementById("mainContent").offsetTop + i_mousey-i_infoh-10 : getscrollamt('y')-document.getElementById("mainContent").offsetTop + i_mousey+10;
    if(isKHTML) i_y = (i_mousey-getscrollamt('y')<i_infoh) ?  i_mousey-document.getElementById("mainContent").offsetTop : i_mousey-document.getElementById("mainContent").offsetTop-i_infoh-20;
    i_x = o_content.offsetWidth-o_info.offsetWidth-14;
    o_info.style.top = i_y
    o_info.style.left = i_x
}
function resetfade(o_fade){
    clearTimeout(t_fade);
    o_fade.style.MozOpacity = 1;
    o_fade.style.opacity = 1;
    o_fade.style.filter = "alpha(opacity=100)";
}
function fadeout(s_fade){
    o_fade =document.getElementById(s_fade);
    o_info.style.MozOpacity = i_fade/100;
    o_info.style.opacity = i_fade/100;
    o_info.style.filter = "alpha(opacity="+i_fade+")";
    i_fade-=20;
    if(i_fade>=0)t_fade = setTimeout("fadeout('"+s_fade+"')",50);
    else{o_info.style.display="none";}
}
function hideinfo(){
    i_fade = 100;
    if(isMac&&!isKHTML)o_info.style.display="none";
    else t_fade = setTimeout("fadeout('info_seatsLeft')",500);
}
/* -- /seats left -- */


function showinfoTaxes(evt,s_info,taxes,currency,overcap)
{
clearTimeout(t_hideinfo);
cleanTaxes();
o_info = document.getElementById(s_info);
resetfade(o_info);
showTaxes(taxes,currency,overcap);
o_content = document.getElementById("workspace");
o_info.style.left = "-1000px";
o_info.style.display="block";
i_infoh = o_info.offsetHeight;
i_infow = parseInt(o_info.offsetWidth/2,10);
evt = (window.event) ? window.event : evt;
i_mousey = evt.clientY;
i_mousex = evt.clientX;
i_y = (i_mousey>i_infoh) ? getscrollamt('y')-document.getElementById("workspace").offsetTop + i_mousey-i_infoh+20: getscrollamt('y')-document.getElementById("workspace").offsetTop + i_mousey+10;

if(isKHTML) 
    i_y = (i_mousey-getscrollamt('y')<i_infoh) ? i_mousey-document.getElementById("workspace").offsetTop : i_mousey-document.getElementById("workspace").offsetTop-i_infoh-20;
    i_x = o_content.offsetWidth-o_info.offsetWidth-14;

    target = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;

    var top = getNodePosition( target ).top - (target.offsetHeight) - getNodePosition( o_content ).top;
    top = top - 115;
    i_x = i_x - 15;
    
o_info.style.top = top + "px";
o_info.style.left = i_x + "px";
}

function hideinfoTaxes(){
       i_fade = 100;
    if(isMac&&!isKHTML)o_info.style.display="none";
    else t_fade = setTimeout("fadeout('infoTaxesList')",500);
    
}

function showTaxes( taxes, currency, overcap ) 
{
    taxes = Number(taxes).toFixed(2);
    overcap = Number(overcap).toFixed(2);
    total = Number(overcap) + Number(taxes);
    total =   Number(total).toFixed(2);
    
    taxesString = currency + " $" +taxes;
    overcapString = currency + " $" + overcap;
    totalString = currency + " $" + total;

    var taxesCell = document.getElementById("priceTax");
    var overCapCell = document.getElementById("overMaxTax");
    var totalCell = document.getElementById("totalTax");
    
    taxesCell.innerHTML = taxesString;
    overCapCell.innerHTML = overcapString;
    totalCell.innerHTML = totalString;
    
}

function cleanTaxes()
{
    var taxesCell = document.getElementById("priceTax");
    var overCapCell = document.getElementById("overMaxTax");
    var totalCell = document.getElementById("totalTax");
    
    taxesCell.innerHTML = "";
    overCapCell.innerHTML = "";
    totalCell.innerHTML = "";
}

function getNodePosition(node) {     
        var top = left = 0;
        while (node) {      
           if (node.tagName) {
               top = top + node.offsetTop;
               left = left + node.offsetLeft;       
               node = node.offsetParent;
           } else {
               node = node.parentNode;
           }
        } 
        return {"top": top, "left": left};
    }