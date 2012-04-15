	function leaveFidelity(url) {
		var message ="You are about to leave Fidelity.com for a site that is unaffiliated with Fidelity. Fidelity has not been involved in the preparation of the content supplied at the unaffiliated site and does not guarantee or assume any responsibility for its content.";
		if (confirm(message)) {
				 window.open (url, "newwindow", config="height=380,width=617,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=no,directories=no,status=no");
		}
}

function ofPopWinVid(theURL) {
newWindow = window.open(theURL,'subWindowVideo','toolbar=no,location=no,scrollbars=yes,status=no,menubar=no,resizable=yes,fullscreen=no,left=80,top=80,height=426,width=640');
newWindow.focus();
}

var toc_item;
function highlightTOC()
{
	var default_toc_item = "";
	try
	{
		document.getElementById(toc_item).className = "selected";
	}
	catch(e)
	{
		document.getElementById(default_toc_item).className = "selected";
		return;
	}
}

function expand(selectedItem , groupId){
	
	if(selectedItem!=""){
		toc_item = selectedItem;
		document.getElementById(selectedItem).parentNode.style.display="block";
		highlightTOC();
	}else{
		document.getElementById(groupId).style.display="block";
	}
}

var accountNumberPattern = /^[A-Z0-9]{9}$/;

validateAccountNumber = function (accountNumber) {
	var yourProfileLink = document.getElementById("your_profile_link");
	 if ((accountNumberPattern.test (accountNumber))) {		
		yourProfileLink.href = yourProfileLink.href + "?account=" + accountNumber;
		return true;
	}		
	return false;		
}

getQueryString = function () {
	var parent_query_string = parent.document.location.search;
	var query_string = document.location.search;
	if (parent_query_string.indexOf("account=")) {
		query_string = parent_query_string;
	}

	if (query_string.indexOf("account=")) {
		validateAccountNumber(query_string.split("account=")[1]);
	}
	return true;
}

function showPopupDiv(caller, target, focusID) {
	var caller = document.getElementById(caller);
	var target = document.getElementById(target);
	target.style.display = 'block';
	lastFocusID = caller;
	if(focusID)
		document.getElementById(focusID).focus();
}

function hidePopupDiv(target) {
	document.getElementById(target).style.display = "none";
	lastFocusID.focus();
}

function showPDF()
{
	statename=document.theform.state.options[document.theform.state.selectedIndex].value;
	if( statename =="AL" ||  statename =="AK" || statename =="AZ" ||  statename =="CT" ||  statename =="DC"
	||  statename =="KY" ||  statename =="ME" ||  statename =="MI"  || statename =="NJ" 
	||  statename =="ND" ||  statename =="RI" ||  statename =="TX" ||  statename =="WV") {
		document.location= "/accounts/pdf/FILI1035.pdf";
	}
	else if (statename == "MT")	{
		document.location= "/accounts/pdf/88181MT.pdf";
	}
	else {
		document.location= "/accounts/pdf/88181" + statename + ".pdf";
	}
}

function popWin(theURL) {
var infowindow;
var infowindow2;
	// Popup width and height are optional second and third parameters to this function
	var theHeight = 420;
	var theWidth = 245;
	if (popWin.arguments.length == 3)
	{
		theWidth = popWin.arguments[1];
		theHeight = popWin.arguments[2];
	}
	var xPosition = 450;
	var yPosition = 250;
	if (popWin.arguments.length == 5)
	{
		theWidth = popWin.arguments[1];
		theHeight = popWin.arguments[2];
		xPosition = popWin.arguments[3];
		yPosition = popWin.arguments[4];
	}
	
	if(theWidth == 245) {
	infowindow=window.open (theURL, 'infowindow','width='+theWidth+',height='+theHeight+',left='+xPosition+',top='+yPosition+',location=no,resizable=yes,menubar=no,status=no,toolbar=no,scrollbars=yes');
infowindow.opener=self;
infowindow.focus();
	}
	if(theWidth == 617) {
	infowindow2=window.open (theURL, 'infowindow2','width='+theWidth+',height='+theHeight+',left='+xPosition+',top='+yPosition+',location=no,resizable=yes,menubar=no,status=no,toolbar=no,scrollbars=yes');
infowindow2.opener=self;
infowindow2.focus();
	}
	if(window.infowindow) {
	window.infowindow.close();
	}
	if(window.infowindow2) {
	window.infowindow2.close();
	} 
}

function ofPopWinVideo(url,h,w) {
	var wVideo = window.open(url,'infoWindowVideo','toolbar=no,location=no,scrollbars=auto,status=no,menubar=no,resizable=yes,fullscreen=no,left=80,top=80,height='+h+',width='+w);
	wVideo.focus();
}

function ofPopWinVideo2(theURL) {
	var newWindow = window.open(theURL,'subWindowVideo','directories=no,toolbar=no,location=no,scrollbars=yes,status=no,menubar=no,resizable=yes,fullscreen=no,left=80,top=80,height=380,width=617');
	newWindow.focus();
}

function ofPopWin1024(theURL) {
newWindow = window.open(theURL,'subWindow1024','toolbar=no,location=no,scrollbars=yes,status=no,menubar=no,resizable=yes,fullscreen=no,left=80,top=80,height=556,width=808')
newWindow.focus()
}

function layerSwap(layerToShow)
{
	document.getElementById(rounded_tabs_head[currentLayer]).className='';
	document.getElementById(rounded_tabs_head[layerToShow]).className='selected';
	
	document.getElementById(rounded_tabs_body[currentLayer]).style.display='none';
	document.getElementById(rounded_tabs_body[layerToShow]).style.display='block';

	currentLayer=layerToShow;
}

function ofPageInit(){
	var query_string = parent.document.location.search;
	var tabNumber = query_string.substring(query_string.indexOf('tab=')+4,query_string.indexOf('tab=')+5);
	if(tabNumber>=1&&tabNumber<=4){
		layerSwap(tabNumber-1);
	}
}

enableButton = function(checkbox) {
	if (checkbox.checked == true) {
		document.getElementById("signupButton").disabled = false;
	}else {
		document.getElementById("signupButton").disabled = true;
	}
}

function loginRedirect(durl) {
	var mc = getCookie('MC');

	if ((mc == null) || (mc.length < 80)) {
		location.replace(durl);
	}
}

function showVideoPlayer(lastLink){
		var videoPlayerWrapper = document.getElementById('videoPlayerWrapper');
		var closeButton = document.getElementById('closeButton');
		var releasePid = "EfwD_Qy_Z7c4W4vWn20dxLf0tsHTIvZb";
		initPlayer(releasePid, 480, 270);
		videoPlayerWrapper.style.display = "block";
		closeButton.focus();
		lastVLink = lastLink;
	}
function hideVideoPlayer(){
	var videoPlayerWrapper = document.getElementById('videoPlayerWrapper');
	videoPlayerWrapper.style.display = "none";
	document.getElementById('embedDiv').innerHTML = "";
	lastVLink.focus();
}

function openIMpopup(link){
	var loc = location.href;
	var theURL=link;
	theURL = theURL +"?refURL="+ loc;
	var popHeight = 625;
	var popWidth =  644;
	var popLeft = (screen.width/2)-(popWidth/2);
	var popTop = (screen.height/2)-(popHeight/2);
	impopupWindow = window.open(theURL,'IMWindow','toolbar=no,location=yes,scrollbars=yes,directories=no,status=yes,menubar=no,resizable=yes,fullscreen=no,left='+popLeft+',top='+popTop+',height='+popHeight+',width='+popWidth+'');
	impopupWindow.focus();
}

function getCookieVal (offset) {
var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function getCookie (name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
	while (i < clen) {
	var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return null;
}
function loginStatus(){
	var sc = getCookie("SC");
	if((sc != null) && (sc.length > 16)) { 
		document.getElementById("login").style.display="none";
		document.getElementById("non-login-head").style.display="block";
		document.getElementById("non-login-body").style.display="none";
	}else{
		document.getElementById("login").style.display="block";
		document.getElementById("non-login-head").style.display="none";
		document.getElementById("non-login-body").style.display="block";
	}
}	
	
function openPopup(theURL) {
	var newWindow = window.open(theURL,'subWindow1024','toolbar=no,location=no,scrollbars=yes,status=no,menubar=no,resizable=yes,fullscreen=no,left=80,top=80,height=556,width=808')
	newWindow.focus();
}

function stateselect(id){
	var number = document.getElementById("state"+id).selectedIndex;
	if(number !=0) {
		location.href = document.getElementById("state"+id).options[number].value;
	}
}
function focusIt(id) {
	document.getElementById("gogo"+id).focus();
}

function popSmallWin(url)
{

	var wlarge =  window.open(url,'infowindowsmall','width=245,height=420,left=450,top=250,screenX=450,screenY=250,location=no,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,scrollbars=yes,fullscreen=no');
	wlarge.focus();
}

function showContent(obj){
	var title = obj.childNodes[0];
	var offScreen = obj.childNodes[1];
	var answer = obj.nextSibling;
	if(answer.tagName != "DIV"){
		answer = answer.nextSibling;
	}
	if(title.className=="expand"){
		title.className = "collapse";
		answer.className = "";
		offScreen.innerHTML="Hide answer";
	}else{
		title.className = "expand";
		answer.className = "hidden";
		offScreen.innerHTML="Show answer";
	}
}

function loginStatusCheck(){
	var sc = getCookie("SC");
	if((sc != null) && (sc.length > 16)){
		document.getElementById("login").style.display="block";
		document.getElementById('logout').style.display='none';
	}else{
		document.getElementById('logout').style.display='block';
		document.getElementById("login").style.display="none";
	}
}


function popWinPrint(theURL) {
	var newWindow = window.open(theURL,'subWindowDemo','toolbar=no,location=no,scrollbars=yes,status=no,menubar=no,resizable=yes,fullscreen=no,left=150,top=200,height=400,width=700');
	newWindow.focus();
}

function checkZip() {
	var zipcodepattern = /^[0-9]{5}$/;
	var error = "";
	var zipForm = document.theform;
	var str = document.getElementById("zip").value;
	var url = "/misc/framesets/branchlocator_frameset.shtml?zip=" + str;
	if ( str == "" ) {
		error = "Please provide a ZIP code.";
		alert(error);
		return false;
	} else if (!(zipcodepattern.test (str))) {
		error = "Please enter a valid five digit ZIP";
		alert(error);
		return false;
	}
	zipForm.action ="/misc/framesets/branchlocator_frameset.shtml?zip=" + str;
	zipForm.submit();
}

showMessage = function (obj) {
	
	if(obj.creativeUrl == "/images/interactive_messages/180W/GSVideo_A_unknown.gif" ||
		obj.creativeUrl == "/images/interactive_messages/180W/GSVideo_B_unknown.gif" || 
		obj.creativeUrl == "/images/interactive_messages/180W/GSVideo_A_customer.gif" ||
		obj.creativeUrl == "/images/interactive_messages/180W/GSVideo_B_customer.gif") {
		URL = obj.acceptUrl;	
		embedInteractiveMessage(initVars(obj), "message1", "180", "150");
		document.getElementById('interactiveMessage3Href').href="javascript:void(0)";
		document.getElementById('interactiveMessage3').onclick = ofPopWinVideo;
	}
	
	else {
		embedInteractiveMessage(initVars(obj), "message1", "180", "150");
	}
}

function showPhoneNumber(number){
	var sc = getCookie("SC");
	var phonenumber=document.getElementById("phonenumber");
	if((sc != null) && (sc.length > 16)) {
		phonenumber.innerHTML="Call "+number;
	}else{
		phonenumber.innerHTML="Call 800-FIDELITY";
	}
}

function convertToNumber(){
var theTxt = document.getElementById("phoneNumber").value.toLowerCase();
	theTxt = theTxt.replace(/a/g,2);
	theTxt = theTxt.replace(/b/g,2);
	theTxt = theTxt.replace(/c/g,2);
	theTxt = theTxt.replace(/d/g,3);
	theTxt = theTxt.replace(/e/g,3);
	theTxt = theTxt.replace(/f/g,3);
	theTxt = theTxt.replace(/g/g,4);
	theTxt = theTxt.replace(/h/g,4);
	theTxt = theTxt.replace(/i/g,4);
	theTxt = theTxt.replace(/j/g,5);
	theTxt = theTxt.replace(/k/g,5);
	theTxt = theTxt.replace(/l/g,5);
	theTxt = theTxt.replace(/m/g,6);
	theTxt = theTxt.replace(/n/g,6);
	theTxt = theTxt.replace(/o/g,6);
	theTxt = theTxt.replace(/p/g,7);
	theTxt = theTxt.replace(/q/g,7);
	theTxt = theTxt.replace(/r/g,7);
	theTxt = theTxt.replace(/s/g,7);
	theTxt = theTxt.replace(/t/g,8);
	theTxt = theTxt.replace(/u/g,8);
	theTxt = theTxt.replace(/v/g,8);
	theTxt = theTxt.replace(/w/g,9);
	theTxt = theTxt.replace(/x/g,9);
	theTxt = theTxt.replace(/y/g,9);
	theTxt = theTxt.replace(/z/g,9);
	document.getElementById("phoneNumber").value = theTxt;
}