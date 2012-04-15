// Global Variables
var d = document;

function replaceString(oldS, newS, fullS) {
// Replaces oldS with newS in the string fullS
   for (var i = 0; i < fullS.length; i++) {
      if (fullS.substring(i, i + oldS.length) == oldS) {
         fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
      }
   }
   return fullS;
}
function getData(q){
  var str = replaceString("XX", "@@", q);
  location = str;
  return false;
}

/* ------------------------- START COOKIES ----------------- */
function readCkStrValue (ckNm){
	ckNm = ckNm + "=";
	// alert(d.cookie);
	var ckStrs = d.cookie.split (';');
	
	for (i = 0; i < ckStrs.length; i++){
		var ckStr = ckStrs [i];
		while (ckStr.charAt(0) == ' ') {
			ckStr = ckStr.substring(1, ckStr.length);
		}
		if (ckStr.indexOf (ckNm) == 0){
			return ckStr.substring (ckNm.length, ckStr.length);
		}
	}
	return null;
}

function setCkStr (ckNm, ckStr){
	// Get Cobrand
	var loc = escape (d.location);
	var s = "http://" + d.domain + "/";
	loc = loc.replace (escape (s), "");
	var pArr = loc.split ("/");
	var path = "; path =/";
	if (pArr [0] != null && pArr [0] != "")
	{
		path = "; path=/" + pArr [0];
	}
	d.cookie = ckNm + "=" + ckStr + "; expires=Fri, 31 Dec 2010 01:00:00 UTC" + path;
}
/* ------------------------- END COOKIES ----------------- */

/* ------------------------- START TAB SCRIPT -------------------------------- */
function displayme(){
	var modid = this.modid;
	var onkey = this.nkey;
	var mObj = d.getElementById (modid);
	var dObjs = mObj.getElementsByTagName ('div');
	var divid;
	// Read CookiePrefString
	var ckStr = readCkStrValue ("COOKIEPREFSTR");
	ckStr = setTabNum (ckStr, modid, onkey+1);

	if (ckStr != null)	{
		setCkStr ("COOKIEPREFSTR", ckStr);
	}

	for (var i = 0; i < dObjs.length; i++)	{
		var c1 = dObjs[i];
		
		if (c1 && c1.getAttribute ('navdiv') == 1)	{
			var li_arr = c1.getElementsByTagName ('li');
			var li_len = li_arr.length;
			for (var j = 0; j < li_len; j++)			{
				li_arr [j].className = 'off';
				if (c1.getAttribute ('tabBorder') == 1)	{
					li_arr [j].style.borderRight = "1px solid #ccc";
				}
			}
			li_arr[onkey].className = 'on';
			if (c1.getAttribute ('tabBorder') == 1)			{
				li_arr [0].style.borderLeft = 'none';
				li_arr [li_len - 1].style.borderRight = 'none';
				li_arr [li_len - 1].style.borderLeft = 'none';
				li_arr [onkey].style.borderRight = 'none';
				if (onkey > 0)
					li_arr [onkey - 1].style.borderRight = 'none';
			}
		}
		if (c1 && c1.getAttribute ('cntdiv') == 1)	{
			var div_arr	= c1.getElementsByTagName ('div');
			var div_out_arr = new Array ();
			for (var k = 0; k < div_arr.length; k++)	{
				if (div_arr [k].getAttribute ('secdiv') == 1){
					div_arr [k].className = 'hideData';
					div_out_arr.push (div_arr [k]);
				}
			}
			div_out_arr [onkey].className = 'showData';
			if (div_out_arr [onkey].id){
				divid = div_out_arr [onkey].id;
				if (divid.substr(0,9) == 'starbucks')	{
					trkclick(divid,14);
				}
			}
		}
	}
	return false;
}

function lnkNavs(id){
	// Read CookiePrefString
	var ckStr = readCkStrValue ("COOKIEPREFSTR");
	// Get Last saved tab for this moudle

	var lastTab = getTabNum (ckStr, id);
	var mObj = d.getElementById (id);
	var dObjs = mObj.getElementsByTagName ('div');
	for (var i = 0; i < dObjs.length; i++){
		var c1 = dObjs[i];
		c1.getAttribute ('tabBorder');
		if (c1 && c1.getAttribute ('navdiv') == 1)		{
			var li_arr = c1.getElementsByTagName ('li');
			var li_len = li_arr.length;			
			for(var j = 0; j < li_len; j++)			{
				// Set the tab to on if you have the cookie set
				var tabclick = li_arr [j].firstChild.getAttribute ('tabclick');
				if (tabclick != 'off')
					li_arr [j].firstChild.onclick = displayme;
				li_arr [j].firstChild.modid = id;
				li_arr [j].firstChild.nkey = j;
				li_arr [j].className = 'off';
				if (c1.getAttribute ('tabBorder') == 1){
					li_arr [j].style.borderRight = "1px solid #ccc";
				}
			}

			li_arr [lastTab - 1].className = 'on';
			if (c1.getAttribute ('tabBorder') == 1)	{
				li_arr [0].style.borderLeft = 'none';
				li_arr [li_len - 2].style.borderLeft = 'none';
				li_arr [li_len - 1].style.borderRight = 'none';
					li_arr [lastTab - 1].style.borderRight = 'none';
				if (lastTab > 1)
				li_arr [lastTab - 2].style.borderRight = 'none';
			}

		}
		if (c1 && c1.getAttribute ('cntdiv') == 1)	{
			var div_arr = c1.getElementsByTagName ('div');
			var div_len = div_arr.length;
			for (var k = 0, l = 0; k < div_len; k++)	{
				// Show the corresponding tab content if the cookie is set otherwise default it to 1
				if (div_arr [k].getAttribute ('secdiv') == 1){
					if (l+1 == lastTab){
						div_arr [k].className = 'showData';	
					}
					else{
						div_arr [k].className = 'hideData';	
					}
					l++;
				}
			}
		}
	}
}

function getTabNum (ckStr, modid){
	var tab = 1; // default;
	if (ckStr != null && modid != null && ckStr != "" && modid != "")	{
		var pv = ckStr.split ('&');
		for (i = 0; i < pv.length; i++)	{
			var pv2 = pv [i].split ('=');
			if (pv2.length == 2 && pv2 [0] == modid && pv2 [1] != "")
			{
				tab = pv2 [1];
			}
		}
	}
	return tab;
}

function setTabNum (ckStr, modid, onkey){
	var found = false;
	if (ckStr != null && modid != null && onkey != null && ckStr != "" && modid != "" && onkey != ""){
		var pv = ckStr.split ('&');
		for (i = 0; i < pv.length; i++)	{
			var pv2 = pv [i].split ('=');
			if (pv2.length == 2 && pv2 [0] == modid && pv2 [1] != ""){
				found = true;
				pv [i] = modid + "=" + onkey.toString ();
			}
		}
		if (!found){
			var pvStr = modid + "=" + onkey;
			pv.push (pvStr);
		}
		return pv.join ("&");
	}
	else	{
		ckStr = modid + "=" + onkey;
		return ckStr;
	}
	return null;	
}
/* ------------------------- END TAB SCRIPT -------------------------------- */

/* ------------------------- START Category Pull Down Menu ----------------- */
var DDSPEED = 10;
var DDTIMER = 15;
var OFFSET = -2;
var ZINT = 100;

function ddMenu(id,d){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearInterval(c.timer);
  if(d == 1){
    clearTimeout(h.timer);
    c.style.display = 'block';
    if(c.maxh && c.maxh <= c.offsetHeight){return}
    else if(!c.maxh){
      c.style.left = (h.offsetWidth + OFFSET) + 'px';
      c.style.height = 'auto';
      c.maxh = c.offsetHeight;
      c.style.height = '0px';
    }
    ZINT = ZINT + 1;
    c.style.zIndex = ZINT;
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }else{
    h.timer = setTimeout(function(){ddCollapse(c)},50);
  }
}

function ddCollapse(c){
  c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}

function cancelHide(id){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearTimeout(h.timer);
  clearInterval(c.timer);
  if(c.offsetHeight < c.maxh){
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }
}

function ddSlide(c,d){
  var currh = c.offsetHeight;
  var dist;
  if(d == 1){
    dist = Math.round((c.maxh - currh) / DDSPEED);
  }else{
    dist = Math.round(currh / DDSPEED);
  }
  if(dist <= 1 && d == 1){
    dist = 1;
  }
  c.style.height = currh + (dist * d) + 'px';
  c.style.opacity = currh / c.maxh;
  c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
  if(currh > (c.maxh - 2) && d == 1){
    clearInterval(c.timer);
  }else if(dist < 1 && d != 1){
    clearInterval(c.timer);
    c.style.display = 'none';
  }
}
/* ------------------------- END Category Pull Down Menu ----------------- */

/* YP SEO Implementation Begins*/
function displayYourCity()
{
	document.getElementById("tab0").className = 'selected';
	document.getElementById("tab1").className = '';
        document.getElementById("yourCity").style.display = 'block';
	document.getElementById("popCities").style.display = 'none';
}
function tabToggle(tabOpt){
	if(tabOpt == 0)
	{
		document.getElementById("tab0").className = 'selected';
		document.getElementById("tab1").className = '';
		document.getElementById("yourCity").style.display = 'block';
		document.getElementById("popCities").style.display = 'none';
	}
	if(tabOpt == 1)
	{
		document.getElementById("tab1").className = 'selected';
		document.getElementById("tab0").className = '';
		document.getElementById("yourCity").style.display = 'none';
		var curdisp = document.getElementById("curdisp").value;
    	if (curdisp == 0)
		{
		  document.getElementById("chicago").className = 'dispNone';
		  document.getElementById("houston").className = 'dispNone';
		  document.getElementById("losAngeles").className = 'dispNone';
		  document.getElementById("miami").className = 'dispNone';
		  document.getElementById("newYork").className = 'dispNone';
		}
		document.getElementById("popCities").style.display = 'block';
	}

}

function listToggle(listOpt){
    var curdisp = document.getElementById("curdisp").value;
    if (curdisp == 0)
	{
	  document.getElementById(listOpt).className = 'dispBlock';
	  document.getElementById("curdisp").value = listOpt;
	}
	else
	{
	 	if (curdisp == listOpt)
		{
		   document.getElementById(listOpt).className = 'dispNone';
		   document.getElementById("curdisp").value = 0;
		}
		else
		{
			document.getElementById(curdisp).className = 'dispNone';
			document.getElementById(listOpt).className = 'dispBlock';
			document.getElementById("curdisp").value = listOpt;
		}
	}
}

/* YP SEO Implementation Ends*/

/* Help Menu Toggle start */
$(document).ready(function(){
	$('li#attSup').children('span').mouseover(function() {
		$(this).css('background-position','0 -60px')
	}).click(function(){
		$(this).css('background-position','0 -79px');
		$('ul#helpMenu').slideToggle().mouseleave(function(){
			$('li#attSup').children('span').delay(1000).css('background-position','0 -41px');
			$(this).delay(1000).slideToggle();
		});				
	}).parent().mouseleave(function(){
		$('li#attSup').children('span').delay(1000).css('background-position','0 -41px');
		$('ul#helpMenu').delay(1000).slideUp();
	});
	
});
/* Help Menu Toggle end */
