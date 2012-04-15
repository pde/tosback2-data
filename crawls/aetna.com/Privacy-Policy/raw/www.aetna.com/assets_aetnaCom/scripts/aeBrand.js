// Shared js file for aetnaCom re-brand 

/* Log-In box functions */

function AetnaCom_UserErase(){
var obj = document.getElementById("USER");
obj.style.backgroundImage = 'url(/assets_aetnaCom/images/structure/whiteBG.gif)';
}

function AetnaCom_PasswordErase(){
var obj = document.getElementById("Password");
obj.style.backgroundImage = 'url(/assets_aetnaCom/images/structure/whiteBG.gif)';
Login.Password.value = '';
}

function AetnaCom_EraseData(){
Login.USER.value = '';
Login.Password.value = '';
}

function AetnaCom_Erase(){
if (document.Login.USER.value.length = 1){
var obj = document.getElementById("USER");
obj.style.backgroundImage = 'url(/assets_aetnaCom/images/structure/whiteBG.gif)';
}}

function PublicQuickCheck(){
if (document.Login.USER.value.length < 1){
alert("Please input your User Name.");
var obj = document.getElementById("USER");
obj.style.backgroundImage = 'url(/assets_aetnaCom/images/structure/whiteBG.gif)';
document.Login.USER.focus();
return false;}
else if (document.Login.PASSWORD.value.length < 1){
alert("Please input your Password.");
var obj = document.getElementById("Password");
obj.style.backgroundImage = 'url(/assets_aetnaCom/images/structure/whiteBG.gif)';
document.Login.PASSWORD.focus();
return false;}
else{return true;}
}

/* producer dropdown menu function */

function stateNav(objOption) {
 document.location.href = objOption.options[objOption.selectedIndex].value;
}

/* Auto tab for zip code/ phone numbers */


function autoTab(field)
{
	if (field.value.length == field.getAttribute("maxlength"))
		field.form.elements[getIndex(field)+1].focus();
}

function getIndex(field)
{
	for(i=0; i < field.form.elements.length; i++)
	{
		if(field.form.elements[i] == field)
			return i;
	}
}

/* Refine Your Search */


function switchMenu(obj,img) {
	var menuSwitch = document.getElementById(obj);
	var ImageSwitch = document.getElementById(img);
	if ( menuSwitch.style.display != "none" ) {
		menuSwitch.style.display = 'none';
		ImageSwitch.src='http://www.aetna.com/assets_aetnaCom/images/structure/plus.gif';
		
		
		
	}
	else {
		menuSwitch.style.display = '';
		ImageSwitch.src='http://www.aetna.com/assets_aetnaCom/images/structure/minus.gif';
		
	}
}

