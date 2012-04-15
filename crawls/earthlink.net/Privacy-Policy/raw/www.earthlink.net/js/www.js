function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/* JS for auto rotation of home page marquee */
var hToggleOk    = true;
var hChoices     = new Array('dialup','highspeed','web-hosting','software','member');
var hToggleWhich = 0;
var homeImagePath='img/www/nav/';
var navlock = "dialup"; //default locked nav area
var prv_navlock = "";
function www_goToLandingPage() { if(navlock) window.location = navlock+'/'; }

function www_changeNav(which,imagePath) {
	prv_navlock = navlock; // save prv navlock
	navlock = which; //set global variable for locked nav area
	www_restoreNav(imagePath);
	MM_swapImage('nav_'+which,'',imagePath+'www_nav_'+which+'_1.gif',1);
	//www_resetMarquee();	
	//now turn on selected marquee area:	
	//alert(prv_navlock);
	hideDiv('www_home_marquee_'+prv_navlock);
	showDiv('www_home_marquee_'+navlock);
	//now swap top nav images		
	MM_swapImage('image_box_hdr','',imagePath+'www_find_box_hdr_'+which+'.gif',1);
	MM_swapImage('showMe','',imagePath+'www_showme_btn_'+which+'.gif',1);
	// COMMENTING THIS OUT AS IT PREVENTS MARQUEE SCROLL
	//focus on phone input when highspeed is showing
	//if(navlock == 'highspeed' && document.getElementById('area0') != null) {		
		//document.getElementById('area0').focus();
	//}		
}
function www_changeNav2(which,imagePath,state) {
	MM_swapImage('nav_'+which,'',imagePath+'www_nav_'+which+'_'+state+'.gif',1);
}
function www_restoreNav(imagePath) {
	document.images["nav_dialup"].src 	= imagePath+'www_nav_dialup_0.gif';
	document.images["nav_highspeed"].src 	= imagePath+'www_nav_highspeed_0.gif';
	document.images["nav_web-hosting"].src 	= imagePath+'www_nav_web-hosting_0.gif';
	document.images["nav_software"].src = imagePath+'www_nav_software_0.gif';
	document.images["nav_member"].src 	= imagePath+'www_nav_member_0.gif';
}
function www_marqueeCounter() {	
	if(hToggleOk && chkObject('www_home_marquee_member')){ var t=setTimeout("www_marqueeSwitch()",10000); }
	// fast toggle testing
	//if(hToggleOk && chkObject('www_home_marquee_member')){ var t=setTimeout("www_marqueeSwitch()",1000); }
}
// add window onload event
addEvent(window,'onload',www_marqueeCounter);

function www_marqueeSwitch() {
	hToggleWhich++;
	if(hToggleWhich>4) hToggleWhich = 0; //reset to access
	if(hToggleOk){ www_changeNav(hChoices[hToggleWhich],homeImagePath);	}
	www_marqueeCounter();
}
function www_marqueeStop() { hToggleOk = false; }
function www_marqueeStart(){ hToggleOk = true; }
/* END - JS for auto rotation of home page content */
/* END JS for home page marquee area */

function toggleLyr(lyrID,lyrState) // 1 visible, 0 hidden
{
   var obj = document.layers ? document.layers[lyrID] :
   document.getElementById ?  document.getElementById(lyrID).style : document.all[lyrID].style;
   obj.visibility = document.layers ? (lyrState ? "show" : "hide") : (lyrState ? "visible" : "hidden");
}

function togglePhone(e,controllerID) {
	var checkbox = document.getElementById(e);
	var phone_number_fields_array;
	var temp;
	if (controllerID == 'accessForm') {
		phone_number_fields_array = new Array("area0","exchange0","phone0");
	} else if (controllerID == 'phoneForm') {
		phone_number_fields_array = new Array("area1","exchange1","phone1");		
	} else if (controllerID == 'locationForm') {
		phone_number_fields_array = new Array("area2","exchange2","phone2");
	} else if (controllerID == 'storeForm') {
		phone_number_fields_array = new Array("npa","nxx","last_four");
	}
	for (var i = 0; i < phone_number_fields_array.length; i++) {
		temp = phone_number_fields_array[i];
			if (checkbox.checked) {
				d.getElementById(temp).disabled = true;
				d.getElementById(temp).className = "components_box_input_disabled";
			} else {
				d.getElementById(temp).disabled = false;
				d.getElementById(temp).className = "components_box_input";	
			}
	}
}
//run this if the optout phone element is defined, so it will be set to the right state
//on page load
if (document.getElementById('Optout')) { togglePhone('Optout'); }
if (document.getElementById('Optout2')){ togglePhone('Optout2');}