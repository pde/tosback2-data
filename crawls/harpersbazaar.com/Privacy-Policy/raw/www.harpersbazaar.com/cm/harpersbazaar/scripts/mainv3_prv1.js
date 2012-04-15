//ClearDefaultInputText
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

//Image Swap Script
function img_swap(img_ID,nameoffile){
	document.getElementById(img_ID).setAttribute('src',nameoffile);
}

// RATE IT.js
// this is defualt rated value, we'll have to work on how to give it a standard server value later
var ratedvalue = 0;
 
function rateit_over(x){
x = parseInt( x );
var rateitstring;
blankrates();
for (i = 1; i <= x; i=i+1){
rateitstring = 'rateit_'+i;
if (i <= ratedvalue) {
document.getElementById(rateitstring).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/photorate-on.jpg');
} else {
document.getElementById(rateitstring).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/photorate-on.jpg');
}
}
}

 
function rateit_on(x){
 x = parseInt( x );
 var parsed_x;
 var rateitstring;
 blankrates();
 for (i = 1; i <= x; i=i+1){
  parsed_x = parseInt(i/1);
  rateitstring = 'rateit_'+parsed_x;
  document.getElementById(rateitstring).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/photorate-on.jpg');
 }
 ratedvalue = x;
}
function rateit_click(x,my_url){
 blankrates();
 var parsed_x;
 var rateitstring;
 for (i = 1; i <= x; i=i+1){
  parsed_x = parseInt(i/1);
  rateitstring = 'rateit_'+parsed_x;
  document.getElementById(rateitstring).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/photorate-on.jpg');
 }
 var dasurl = my_url+"/"+x;
 $.get(dasurl,function(data){process_rateit(data);});
}
 
function process_rateit(data){
 var rate_data = parseInt( data );
 rateit_on(rate_data);
}
 
function keepratedvalue(){
 rateit_on(ratedvalue)
}
 
function blankrates(){
 for (i = 1; i <= 10; i++){
  document.getElementById('rateit_'+i).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/photorate-off.jpg');
 }
 
}

function viral_on(x){
	document.getElementById(x).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/'+x+'-on.gif');
	}
function viral_down(x){
	document.getElementById(x).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/'+x+'-off.gif');
	}
function viral_off(x){
	document.getElementById(x).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/'+x+'-off.gif');
	}
function viral_up(x){
	document.getElementById(x).setAttribute('src','/cm/harpersbazaar/images/design/v02/photorate/'+x+'-on.gif');
}

//Date Script
/*Current date script credit: 
JavaScript Kit (www.javascriptkit.com)
Over 200+ free scripts here!
*/
var mydate=new Date()
var year=mydate.getYear()
if (year < 1000)
year+=1900
var day=mydate.getDay()
var month=mydate.getMonth()
var daym=mydate.getDate()
if (daym<10)
daym="0"+daym
var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December")

