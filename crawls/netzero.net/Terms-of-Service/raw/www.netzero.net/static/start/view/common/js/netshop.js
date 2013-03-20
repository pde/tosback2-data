function getLoginIframe(){
		var welcomeIframeContainer = document.getElementById('welcomeIframeContainer'), welcomeIframe = document.getElementById('welcomeIframeId');
		if( welcomeIframe !== null) {
			return;
		}
		welcomeIframe = document.createElement('iframe');		
		welcomeIframe.setAttribute('id', 'welcomeIframeId');
		if(capurl != "")
			{
		welcomeIframe.height = '300';
			}
		else{welcomeIframe.height = '75';}
		welcomeIframe.width = '260';
		welcomeIframe.style.position = 'relative';
		welcomeIframe.style.border = '0';
		welcomeIframe.frameBorder = 0;
		welcomeIframe.setAttribute('scrolling', 'no');
		welcomeIframe.setAttribute('src', loginSrc);
		welcomeIframeContainer.appendChild(welcomeIframe);
}

// function to set the signin button
var button_press=true;	
function sign_press(curobj){
	if(button_press==true)
	{	
		button_press=false;
		pressed_down();
		getLoginIframe();
		overlay(curobj, 'login-overlay', 'rightbottom');
	}
	else if(button_press==false)
	{	s_overlayclose('login-overlay'); }
}	
	
function pressed_down(){
	document.getElementById('sign_button_div').innerHTML = "<a href='javascript:sign_press(sign_button_div)'><img src='/static/start/view/img/dsl/dsl-signup/signin-pressed.gif' alt='sign-in' border=0 /></a>";
}	

function pressed_up(){
	document.getElementById('sign_button_div').innerHTML = "<a href='javascript:sign_press(sign_button_div)'><img src='/static/start/view/img/dsl/dsl-signup/signin-unpressed.gif' alt='sign-in' border=0 /></a>";	
}		
				
function getposOffset(overlay, offsettype){
var totaloffset=(offsettype=="left")? overlay.offsetLeft : overlay.offsetTop;
var parentEl=overlay.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}

function overlay(curobj, subobjstr, opt_position){
if (document.getElementById)
{
	var subobj=document.getElementById(subobjstr)
	subobj.style.display=(subobj.style.display!="block")? "block" : "none"
	var xpos=getposOffset(curobj, "left")+((typeof opt_position!="undefined" && opt_position.indexOf("right")!=-1)? -(subobj.offsetWidth-curobj.offsetWidth) : 0) 
	var ypos=getposOffset(curobj, "top")+((typeof opt_position!="undefined" && opt_position.indexOf("bottom")!=-1)? curobj.offsetHeight : 0)
	subobj.style.left=xpos+"px"
	subobj.style.top=ypos+"px"
	return false
}
else
	return true

}

function overlay_1(curobj, subobjstr, opt_position, offset){
if (document.getElementById)
{
	var subobj=document.getElementById(subobjstr)
	subobj.style.display=(subobj.style.display!="block")? "block" : "none"
	var xpos=getposOffset(curobj, "left")+((typeof opt_position!="undefined" && opt_position.indexOf("right")!=-1)? -(subobj.offsetWidth-curobj.offsetWidth) : 0) 
	var ypos=getposOffset(curobj, "top")+((typeof opt_position!="undefined" && opt_position.indexOf("bottom")!=-1)? curobj.offsetHeight : 0)
	subobj.style.left=xpos-offset+"px"
	subobj.style.top=ypos+"px"
	return false
}
else
	return true
}

function overlay_2(curobj, subobjstr, opt_position, offset){
   	var subobj=document.getElementById(subobjstr); 
	subobj.style.display=(subobj.style.display!="block")? "block" : "none";
}

	
function s_overlayclose(subobj){
	button_press=true;
	pressed_up();
	document.getElementById(subobj).style.display="none"
}	

function overlayclose(subobj){
document.getElementById(subobj).style.display="none"
}

function AutoTab(inputValue, maxLength, linkItem){
  var tn=inputValue;
 	var currentLength = tn.length;
	if(currentLength== maxLength)
		{
		if(linkItem.value=="") {
				linkItem.focus();
		   	linkItem.select();
		}
	}
}

// this is for the sign in overlay sign in validation		
function errormessage(errormessage,field)
{
alert(errormessage);
field.focus();
}
		
function logonValidation(form) {
var memberIdText = 'Member ID';

var memberid= form.MemberID.value.toLowerCase();
if(!areCookiesEnabled()) {return false;}

if(memberid.length == 0) {errormessage(memberIdText+" required!",form.MemberID);return false;}

if(form.Password.value.length == 0) {errormessage("Password required!",form.Password);return false;}

return true;
}

// this function is for the wireless form submission
function wirelessSub(form, zipValue){
var test;
var textmsg = "Invalid ZipCode!";
var first=false;
	if(zipValue.length!=5)
	{ first=true; textmsg = "Please enter 5-digit ZipCode!"; }
	test = numberLoop ( zipValue.length, zipValue);

	if(test==false && first==false)
	{ form.action="http://www.inphonic.com/mobile/?r=netzero&refcode1=NTZ_1015_001_Rob1&zipcode="+zipValue; }
	if(test==true || first==true)
	{ errormessage( textmsg ,form.zipcode); return false; }
}

function numberLoop ( slength, value )
{
var valid = "0123456789";
var test=0;
	for(var i=0; i<slength; i++)
	{
		temp=""+ value.substring(i, i+1)
		if(valid.indexOf(temp) == "-1") 
		{ test=1; }
	}	// for loop
	if(test==1)
	{ return true; }
	if(test==0)
	{ return false; }
} // numberLoop

// function for broadband number submit
function bbSub(form, areacode, phonepre, phonesuf, abc)
{
var textmsg = "Invalid Phone Number!";
var test=false;
var first=false;
	if(areacode.length!=3 || phonepre.length!=3 || phonesuf.length!=4 )
	{ first=true; textmsg="Please enter a valid 10-digit telephone number!"; }
	if( first==false && test==false)
	{ test = numberLoop ( areacode.length, areacode); }
	if( first==false && test==false)
	{ test = numberLoop ( phonepre.length, phonepre); }
	if( first==false && test==false)
	{ test = numberLoop ( phonesuf.length, phonesuf);}
	if(test==false && first==false) {
	 form.action="http://"+abc+"/account/serviceAvailabilityWithTN.do?refcd=DSLFD0607TAB&campaignId=DSLFD0607TAB" }
	if(test==true || first==true)
	{ errormessage( textmsg ,form.phoneAreaCode); return false; }	
}

function bbSub1(form, areacode, phonepre, phonesuf, abc)
{
var textmsg = "Invalid Phone Number!";
var test=false;
var first=false;
	if(areacode.length!=3 || phonepre.length!=3 || phonesuf.length!=4 )
	{ first=true; textmsg="Please enter a valid 10-digit telephone number!"; }
	if( first==false && test==false)
	{ test = numberLoop ( areacode.length, areacode); }
	if( first==false && test==false)
	{ test = numberLoop ( phonepre.length, phonepre); }
	if( first==false && test==false)
	{ test = numberLoop ( phonesuf.length, phonesuf);}
	if(test==false && first==false) {
	 form.action="http://"+abc+"/account/serviceAvailabilityWithTN.do?refcd=DSLFD0607TABMAC&campaignId=DSLFD0607TABMAC" }
	if(test==true || first==true)
	{ errormessage( textmsg ,form.phoneAreaCode); return false; }	
}