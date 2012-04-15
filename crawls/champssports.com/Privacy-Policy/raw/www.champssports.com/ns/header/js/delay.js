// JavaScript Document
var tempNavDiv;
var tabNavDiv;
var navCata;
var cNavTimer;
var oNavTimer;
var navDDTimer = 500;
function openTab(div, cat) {
	clearTimeout(cNavTimer);
	if(cat != navCata && navCata != null) {
		hideDiv();
	}
	tabNavDiv = div.getElementsByTagName('div')[0];
	tempNavDiv = div.getElementsByTagName('div')[1];
	if(cat != navCata) {
		navCata = cat;
		hideDiv();
	}
	oNavTimer=setTimeout(showDiv, navDDTimer);
}
function showDiv() {
	tempNavDiv.style.display='block'; tabNavDiv.className=navCata+'Over';
}
function closeTab(div) {
	clearTimeout(oNavTimer);
	tabNavDiv = div.getElementsByTagName('div')[0];
	tempNavDiv = div.getElementsByTagName('div')[1];
	cNavTimer=setTimeout(hideDiv, 300);
}
function hideDiv() {
	tempNavDiv.style.display='none'; tabNavDiv.className='navBtn '+navCata;
}
function setNDDDelay(time) {
	navDDTimer = time;	
}