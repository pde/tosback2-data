function WindowOpenMenu(url,width,height) {
  myWindow = window.open("" ,"windowRef","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function swapTab(tabNameOn) {
	var hideTabs = getElementsByCondition(
		function(el){if(el.className=='horizScrollListContent_fmt'){el.style.display='none';return el}}
	)
	var hideLists = getElementsByCondition(
		function(el2){if(el2.className=='horizScrollTab'){el2.style.backgroundColor='#a7bdc9';return el2}}
	)
	var hideDesc = getElementsByCondition(
		function(el3){if(el3.className=='horizScrollDesc_fmt'){el3.style.display='none';return el3}}
	)
	var hidePeriod = getElementsByCondition(
		function(el3){if(el3.className=='horizScrollListPeriod_fmt'){el3.style.display='none';return el3}}
	)
	document.getElementById(tabNameOn + 'Tab').style.backgroundColor = '#899ea9';
	document.getElementById(tabNameOn + 'List').style.display = 'block';
	if (document.getElementById(tabNameOn + 'Period')) {
		document.getElementById(tabNameOn + 'Period').style.display = 'block';
	}
	return false;
}

function getElementsByCondition(condition) {
	var all = document.getElementsByTagName('div');
	var arr = [];
	for(var k=0;k<all.length;k++)
	{
		var elm = all[k];
		if(condition(elm,k))
		arr[arr.length] = elm;
	}
	return arr;
} 

/* For the font sizer 
function setClass(objectID,newClass) {
	var object = document.getElementById(objectID);
	object.className = newClass;
}
*/

/* For advanced search popup in header */	
function ajaxPopupOpen() {
	if (document.getElementById('advSearchAjax_fmt')) {
		document.getElementById('advSearchAjax_fmt').style.display = 'block';
	}								
	return false;
}

function ajaxPopupClose() {
	if (document.getElementById('advSearchAjax_fmt')) {
		document.getElementById('advSearchAjax_fmt').style.display = 'none';
	}
	return false;
}

/* functions for AtoZ Lists */
function setClassName(objId, className) {
    	document.getElementById(objId).className = className;
	}

function toggleALLglossary() {
   setClassName('a2zA');
   setClassName('a2zB');
   setClassName('a2zC');
   setClassName('a2zD');
   setClassName('a2zE');
   setClassName('a2zF');
   setClassName('a2zG');
   setClassName('a2zH');
   setClassName('a2zI');
   setClassName('a2zJ');
   setClassName('a2zK');
   setClassName('a2zL');
   setClassName('a2zM');
   setClassName('a2zN');
   setClassName('a2zO');
   setClassName('a2zP');
   setClassName('a2zQ');
   setClassName('a2zR');
   setClassName('a2zS');
   setClassName('a2zT');
   setClassName('a2zU');
   setClassName('a2zV');
   setClassName('a2zW');
   setClassName('a2zX');
   setClassName('a2zY');
   setClassName('a2zZ');
   setClassName('a2z09');
   setClassName('divA','noDisplay_fmt');
   setClassName('divB','noDisplay_fmt');
   setClassName('divC','noDisplay_fmt');
   setClassName('divD','noDisplay_fmt');
   setClassName('divE','noDisplay_fmt');
   setClassName('divF','noDisplay_fmt');
   setClassName('divG','noDisplay_fmt');
   setClassName('divH','noDisplay_fmt');
   setClassName('divI','noDisplay_fmt');
   setClassName('divJ','noDisplay_fmt');
   setClassName('divK','noDisplay_fmt');
   setClassName('divL','noDisplay_fmt');
   setClassName('divM','noDisplay_fmt');
   setClassName('divN','noDisplay_fmt');
   setClassName('divO','noDisplay_fmt');
   setClassName('divP','noDisplay_fmt');
   setClassName('divQ','noDisplay_fmt');
   setClassName('divR','noDisplay_fmt');
   setClassName('divS','noDisplay_fmt');
   setClassName('divT','noDisplay_fmt');
   setClassName('divU','noDisplay_fmt');
   setClassName('divV','noDisplay_fmt');
   setClassName('divW','noDisplay_fmt');
   setClassName('divX','noDisplay_fmt');
   setClassName('divY','noDisplay_fmt');
   setClassName('divZ','noDisplay_fmt');
   setClassName('div09','noDisplay_fmt');
}

function staticCustomLink(link){
  var s_md;
  try{ s_md=window.parent.s_gi(window.parent.s_account); } catch(e){ s_md=s_gi(s_account); }
  s_md.linkTrackVars="prop17,prop18,prop20,prop34,prop50";
  try{s_md.prop18=link;}catch(e){}
  try{s_md.prop17=link.split('_')[0];}catch(e){}
  try{link=s_md.pageName.split("_").join("-") + "_"+link; }catch(e){} 
  try{s_md.prop20=link;}catch(e){}
  try{s_md.prop34=s_md.pageName.split("_").join("-") +"_"+s_md.prop17;}catch(e){}
  try{ void(window.parent.s_md.tl(true, 'o', link.toLowerCase())); }catch(e){void(s_md.tl(true, 'o', link.toLowerCase())); } 
}



function Split(str, sep)
{
	var tmpStr   = "";
	var tmpArray = new Array();
		for(var i=0; i < str.length; i++)
	{
		if(str.charAt(i) != sep)
		{	
			tmpStr += str.charAt(i);
		}
		else
		{
			tmpArray[tmpArray.length] = tmpStr;
			tmpStr = "";
		}
	}
	tmpArray[tmpArray.length] = tmpStr;
	return tmpArray;
}

function getQueryStringValues()
{
   var args  = new Array();
   var query = location.search.substring(1);
   var pairs = Split(query, "&");
   
   for(var i=0; i < pairs.length; i++)
   {
	  var pos = pairs[i].indexOf("=");
	  if(pos == -1) 
	  {
		 continue;
	  }
	  var argname = pairs[i].substring(0, pos);
	  var value = pairs[i].substring(pos+1); 
	  args[i] = unescape(value); 
   }
   return args;
}

function checkEmailAddr() 
{
var argsVal = getQueryStringValues();	
		illegal = /[^\w._\-]/
	email = document.MiniForm.EmailAddr.value;
		if (email.length<6 || email.indexOf('@')==-1 || email.indexOf('.')==-1)
		email="";
	else 
	{
		At = email.indexOf('@');
		Period = email.lastIndexOf('.');
		DNS1 = email.substring(0,At);
		if (DNS1.length<1 || DNS1.match(illegal)!=null) email="";
		DNS2 = email.substring(At+1,Period);
		if (DNS2.length<1 || DNS2.match(illegal)!=null) email="";
		DNS3 = email.substring(Period+1,email.length);
		if (DNS3.length<2 || DNS3.match(illegal)!=null) email="";
	}
		if (email.length==0) 
	{
		alert("The email address you have entered is invalid. Please re-enter a valid email address.\n");
		document.MiniForm.EmailAddr.focus();
		return false;
	}
	
	return true;
}
function checkEmailAndPrivacy() {
    var argsVal = getQueryStringValues();

    illegal = /[^\w._\-]/
    email = document.MiniForm.EmailAddr.value;

    if ($("#EmailCheck").is(':checked')) {
        if (email.length < 6 || email.indexOf('@') == -1 || email.indexOf('.') == -1)
            email = "";
        else {
            At = email.indexOf('@');
            Period = email.lastIndexOf('.');
            DNS1 = email.substring(0, At);
            if (DNS1.length < 1 || DNS1.match(illegal) != null) email = "";
            DNS2 = email.substring(At + 1, Period);
            if (DNS2.length < 1 || DNS2.match(illegal) != null) email = "";
            DNS3 = email.substring(Period + 1, email.length);
            if (DNS3.length < 2 || DNS3.match(illegal) != null) email = "";
        }

        if (email.length == 0) {
            alert("The email address you have entered is invalid. Please re-enter a valid email address.\n");
            document.MiniForm.EmailAddr.focus();
            return false;
        }
    }
    else {
        $("#EmailCheck,.emailCheckError").addClass("error");
        return false;
    }



    return true;
}



/* --
Select and Copy form element script
--- */

var copytoclip=1

function HighlightAll(theField) {
  var tempval=eval("document."+theField)
  tempval.focus()
  tempval.select()
  if (document.all&&copytoclip==1){
  therange=tempval.createTextRange()
  therange.execCommand("Copy")
  window.status="Contents highlighted and copied to clipboard!"
  setTimeout("window.status=''",1800)
  }
}

function NewWindowOpenMenu(url,width,height) {
  myWindow = window.open("" ,"","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function NewWindowOpenNoMenu(url,width,height) {
  myWindow = window.open("" ,"","width=" + width + ",height=" + height+",top=0,left=0,screenX=0,screenY=0,resizable=no,scrollbars=no");
  myWindow.location.href = "" + url;
  if (!myWindow.opener) myWindow.opener = self;
  }
function myVoid() {
  ;
  }
  
 /* --
DHTML POP UP CENTERED
--- */ 
  var win = null;
function NewWindow(mypage,myname,w,h,scroll){
LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
settings =
'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
win = window.open(mypage,myname,settings)
}

/* Sponsor Box */
function sponsorBox_closePopup(divId) {
	document.getElementById(divId).className = "sponsorBox_popupHidden";
	return false;
}
		
/* Scripts for making Sponsor Box Rollovers Work */
function sponsorBox_rollOver(divId) {
	document.getElementById(divId).className = "sponsorBox_popupVisible";
	return false;
}
/* End Sponsor Box */

function Orencia_sponsorBox_rollOver(divId) {
 if (document.getElementById("sponsorBox_prescribingInfo1")) 
  {document.getElementById("sponsorBox_prescribingInfo1").className = "sponsorBox_popupHidden";}
 if (document.getElementById("sponsorBox_prescribingInfo2")) 
  {document.getElementById("sponsorBox_prescribingInfo2").className = "sponsorBox_popupHidden";}
 if (document.getElementById("sponsorBox_prescribingInfo3")) 
  {document.getElementById("sponsorBox_prescribingInfo3").className = "sponsorBox_popupHidden";}
 if (document.getElementById("sponsorBox_safetyInfo1")) 
  {document.getElementById("sponsorBox_safetyInfo1").className = "sponsorBox_popupHidden";}
 if (document.getElementById("sponsorBox_safetyInfo2")) 
  {document.getElementById("sponsorBox_safetyInfo2").className = "sponsorBox_popupHidden";}
 if (document.getElementById("sponsorBox_safetyInfo3")) 
  {document.getElementById("sponsorBox_safetyInfo3").className = "sponsorBox_popupHidden";}
 document.getElementById(divId).className = "sponsorBox_popupVisible";
 return false;
}


function openPopup(theUrl,w,h) {
    var left = (screen.availWidth - w)/2;
    var top = (screen.availHeight - h)/2

    var args = "scrollbars,resizable" + ",width=" + w + ",height=" + h + ",top=" + top + ",left= " + left;

    var win = window.open(theUrl, "popup", args );

    /* If the window already existed, bring it to the front */
    if (win) { win.focus(); }
    return false;
}

/* function to toggle visibility */
function toggle( targetId, signId ) {
   if ( document.getElementById ) {
    target = document.getElementById( targetId );
	if (signId != '') {sign = document.getElementById( signId );}
    if ( target.style.display == "none" ) {
     target.style.display = "";
	 if (sign) {sign.src = sign.src.replace('plusSign','minusSign');}
    } else {
     target.style.display = "none";
	 if (sign) {sign.src = sign.src.replace('minusSign','plusSign');}
    }
   }
}

function rxList_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=rxList_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

