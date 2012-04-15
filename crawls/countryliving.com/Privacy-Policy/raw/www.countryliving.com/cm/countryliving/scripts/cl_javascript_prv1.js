// JavaScript Document



var channelname = "none";

function initnav(channame){
	hidealltabs();
	channelname = channame;
	// temorarily removed 
	
	navbar_on('tn_'+channelname,channelname);
	
}
var subchannelname = "none";

function initsubnav(subchanname){
	hidealltabs();
	subchannelname = subchanname;
	// temorarily removed 
	
	navbar_on('sn_cntr_'+subchannelname,subchannelname);
}

function hideall(){
	if (channelname != "none"){
		// I went to set navbar on to channel name, whatever that channel name is
		navbar_on('tn_'+channelname,channelname);
	} else {
		hidealltabs()
		hideallnav()
	}
}
var mouseoutofnav = false; 

function timedhide(){
	mouseoutofnav = true;
	var navtimer = setTimeout("shutdownnav()",500);
}
function shutdownnav(){
	if (mouseoutofnav) {
		hideall();
		mouseoutofnav = false;
	}
}
function navbar_on(eid,image_id){
	mouseoutofnav = false;
	hidealltabs();
	hideallnav();
	document.getElementById(eid).style.backgroundPosition = "0 -45px";
	document.getElementById('sn_cntr_'+image_id).style.display = 'block'; 
}

function hidealltabs(){ 
	document.getElementById('tn_decorating').style.backgroundPosition = "0 0"; 
	document.getElementById('tn_antiques').style.backgroundPosition = "0 0";
	document.getElementById('tn_women').style.backgroundPosition = "0 0";
	document.getElementById('tn_crafts').style.backgroundPosition = "0 0";
	document.getElementById('tn_gardening').style.backgroundPosition = "0 0";
	document.getElementById('tn_recipes').style.backgroundPosition = "0 0";
}
function hideallnav(){
	document.getElementById('sn_cntr_decorating').style.display = 'none';
	document.getElementById('sn_cntr_antiques').style.display = 'none';
	document.getElementById('sn_cntr_women').style.display = 'none';
	document.getElementById('sn_cntr_crafts').style.display = 'none';
	document.getElementById('sn_cntr_gardening').style.display = 'none';
	document.getElementById('sn_cntr_recipes').style.display = 'none';
}
 

 function Reload () {
var dum = document.getElementById('iframe1');
dum.contentWindow.location.reload(true);
}

function img_swap(img_ID,nameoffile){
	document.getElementById(img_ID).setAttribute('src',nameoffile);
}

var expanded = new Number;
expanded = 0;

//Check to see if user has just logged in
function checkForLogin() {
	newExpandedValue = new Number;
	newExpandedValue = getQueryVariable('commentLogin');
	if (newExpandedValue == 1) {
		document.location.href = '#article_links_wrapper';
		expand('hidden');
	}
}


// Post Comment Display Toggler
function expand(id){	
	var showDiv = new Object;
	if(expanded==0){	
		showDiv = document.getElementById(id);
		showDiv.style.display = "block";
		expanded = 1;
	}else{
		showDiv = document.getElementById(id);
		showDiv.style.display = "none";
		expanded = 0;	
	}	
}

activeMenu = null; lastMenu = null; origMenu = null; menuStatus = null; var nav_event = null;

function mlon(obj){
	obj.getElementsByTagName("div")[0].style.display = "block";
	menuStatus = true;
	if(activeMenu == null || activeMenu == ""){
		activeMenu = obj.getElementsByTagName("div")[0].offsetParent.id;
		origMenu = 	obj.getElementsByTagName("div")[0].offsetParent.id;	
		highlightfirstanchor(obj);		
	}  else if (activeMenu != obj.getElementsByTagName("div")[0].offsetParent.id){
		activeMenu = obj.getElementsByTagName("div")[0].offsetParent.id;
		highlightfirstanchor(obj);
		unhighlightfirstanchor(lastMenu);
	}
		else {
		activeMenu = obj.getElementsByTagName("div")[0].offsetParent.id;
		highlightfirstanchor(obj);
	}
		
	var browserName=navigator.appName; 
	if (browserName=="Microsoft Internet Explorer") {	
		var IfrRef = document.getElementById('DivShim');	
		IfrRef.style.width = obj.getElementsByTagName("div")[0].offsetParent.offsetWidth;
		IfrRef.style.height = obj.getElementsByTagName("div")[0].offsetParent.offsetHeight;
		IfrRef.style.top = obj.getElementsByTagName("div")[0].offsetParent.offsetTop+81;	
		IfrRef.style.left = obj.getElementsByTagName("div")[0].offsetParent.offsetLeft;
		IfrRef.style.zIndex = obj.getElementsByTagName("div")[0].style.zIndex +1;
		IfrRef.style.display = "block";		
	}
}

function mlonsub(obj){
	obj.getElementsByTagName("div")[0].style.display = "block";
	menuStatus = true;
	var browserName=navigator.appName; 
	if (browserName=="Microsoft Internet Explorer") {	
		var IfrRef = document.getElementById('DivShim');	
		IfrRef.style.width = obj.getElementsByTagName("div")[0].offsetParent.offsetWidth;
		IfrRef.style.height = obj.getElementsByTagName("div")[0].offsetParent.offsetHeight;
		IfrRef.style.top = obj.getElementsByTagName("div")[0].offsetParent.offsetTop+81;	
		IfrRef.style.left = obj.getElementsByTagName("div")[0].offsetParent.offsetLeft;
		IfrRef.style.zIndex = obj.getElementsByTagName("div")[0].style.zIndex +1;
		IfrRef.style.display = "block";		
	}
}

function mloff(obj) {
	if(lastMenu == null || lastMenu == ""){
		lastMenu = obj;
		lastMenuId = lastMenu.getElementsByTagName("div")[0].offsetParent.id;
		currentOffMenu = lastMenu.getElementsByTagName("div")[0].offsetParent.id;
		obj.getElementsByTagName("div")[0].style.display = "none"	
		}
		 else if (activeMenu != lastMenuId && activeMenu != currentOffMenu){
			unhighlightfirstanchor(lastMenu);
			lastMenu = obj;	
			lastMenuId = lastMenu.getElementsByTagName("div")[0].offsetParent.id;	
			currentOffMenu = obj.getElementsByTagName("div")[0].offsetParent.id;
			obj.getElementsByTagName("div")[0].style.display = "none"		
		} 
		else {
			lastMenuId = lastMenu.getElementsByTagName("div")[0].offsetParent.id;
			currentOffMenu = obj.getElementsByTagName("div")[0].offsetParent.id;
			obj.getElementsByTagName("div")[0].style.display = "none";
			
			if(obj.getElementsByTagName("div")[0].id == "submenu"){
				obj.getElementsByTagName("div")[0].style.display = "none";	
		}
	}			

	menuStatus = false;	
	setTimeout("checkDisplay(lastMenu)", 100);
	var browserName=navigator.appName; 
	if (browserName=="Microsoft Internet Explorer") {					
		var IfrRef = document.getElementById('DivShim');
		IfrRef.style.display = "none";
	}
}

function mloff2(name){
	if (nav_event){
		if (nav_event.srcElement.tagName == "img") {
		//setTimeout("unhighlightfirstanchor(lastMenu)",5000);
		//setTimeout("unlightsub(lastMenu)", 5000)
			lastMenu.getElementsByTagName("div")[0].style.display = "none";		
			unhighlightfirstanchor(lastMenu);
			} else {
          //do nothing
		}
	}
}

function subon(menuName){
	adviceMenu = document.getElementById(menuName); adviceMenu.style.backgroundColor = "#6a524b"; adviceMenu.style.color = "#ffffff";
	if(menuName == "paintBrush"){		
		adviceMenu = document.getElementById('TheLook'); adviceMenu.style.backgroundColor = "#6a524b"; adviceMenu.style.color = "#947869";	
	}
}

function suboff(menuName){
	adviceMenu = document.getElementById(menuName); adviceMenu.style.backgroundColor = "#947869"; adviceMenu.style.color = "#ffffff";	
	if(nav_event){
		if(nav_event.srcElement.tagName != "div"){
			adviceMenu = document.getElementById(menuName); adviceMenu.style.backgroundColor = "#947869"; adviceMenu.style.color = "#ffffff";
			} else {adviceMenu = document.getElementById(menuName); adviceMenu.style.backgroundColor = "#6a524b"; adviceMenu.style.color = "#947869";}
	}
}

function highlightfirstanchor(obj){
	obj.getElementsByTagName("a")[0].style.backgroundPosition = "0px -41px";
}

function unhighlightfirstanchor(obj){
	obj.getElementsByTagName("a")[0].style.backgroundPosition = "0px 0px";
}

function unlightsub(obj){
	obj.getElementsByTagName("div")[0].style.display = "none";
}

function checkDisplay(obj){
	if(menuStatus == false){
		unhighlightfirstanchor(lastMenu);
		obj.getElementsByTagName("div")[0].style.display = "none";
	}
}

/***** Clear default value in forms function *****/
/* ClearDefaultInputText */

function clickclear(thisfield, defaulttext) {

if (thisfield.value == defaulttext) {

thisfield.value = "";

}

}

function clickrecall(thisfield, defaulttext) {

if (thisfield.value == "") {

thisfield.value = defaulttext;

}

}
/***** //Clear default value in forms function *****/

expanded_hidden = 0;

function expand_hidden(){	
	if(expanded_hidden==0){	
		var showDiv = document.getElementById('hidden'); 
		showDiv.style.display = "block";
		expanded_hidden = 1;
	}else{
		var showDiv = document.getElementById('hidden');
		showDiv.style.display = "none";
		expanded_hidden = 0;	
	}	
}