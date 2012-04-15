var timedelay = false;
var menupause;
var cursub = "";
var curitem;
function initiatemenu(primary,secondary,tertiary,quaternary){
if(typeof primary == 'undefined'){primary = '';return;}

if(typeof secondary == 'undefined'){secondary = ''}
if(typeof tertiary == 'undefined'){tertiary = ''}
if(typeof quaternary == 'undefined'){quaternary = ''}
cursub = primary + 'sub';
		if(secondary.length > 0){
				document.getElementById(secondary).className = "contrastcolor";
		}
if(globalnav){
	if(globalnav != "sb"){
	if(primary == '' || primary.length == 0){var primary = 'businessprograms'}
	if(secondary == '' || secondary.length == 0){var secondary = 'smallbusiness'}
	}
}else{
	var globalnav = '';
}
if(primary != ''){
	document.getElementById(primary).className = "btnon";
document.getElementById("submenu").innerHTML = document.getElementById(primary+'sub').innerHTML
}
if(secondary !=''){
	if(document.getElementById(secondary).className == "last"){
		document.getElementById(secondary).className = "last contrastcolor";
	}else{
		document.getElementById(secondary).className = "contrastcolor";
	}
}
if(tertiary != '' && tertiary.length > 0){
			if(document.getElementById(tertiary).className=="drop-up"){
			document.getElementById("d"+tertiary).style.display = 'block';
			document.getElementById(tertiary).className = 'drop-down';
			}
}

if(quaternary != '' && quaternary.length > 0){
		document.getElementById(quaternary).style.fontWeight = 'bold';
}else{
	if(tertiary != '' && tertiary.length > 0){
	document.getElementById("a"+tertiary).style.fontWeight = 'bold';
	}
}

}

function swapNavOn(item){
	navoff();
	curbtn = item.id
	curitem = item.id + "sub"
	document.getElementById(curbtn).className = "btnon"
	//document.getElementById(curbtn).style.color = "#023f72"
	document.getElementById("submenu").innerHTML = document.getElementById(curitem).innerHTML;
}
function navoff(){

	var navLinks = document.getElementById('globalnav').getElementsByTagName("li"); 
	for(var i=0;i<navLinks.length;i++) { 

		if(navLinks[i].className !="divider"){
		navLinks[i].className = "btnoff";
		}
		if(navLinks[i].id == 'sb_phonesdevices' || navLinks[i].id == 'phonesdevices'){
		navLinks[i].className = "btnoffpd";
		}
		//navLinks[i].style.backgroundPosition = "0px 0px";
		//navLinks[i].style.color = "#FFFFFF";

	}
}	
function swapNavOff(item){
		item.className = "btnoff";
		if(item.id == 'sb_phonesdevices' || item.id == 'phonesdevices'){
		item.className = "btnoffpd";
		}		
		//item.style.backgroundPosition = "0px 0px";
		//item.style.color = "#FFFFFF";
}	
function setdelay(){
if(primary.length > 0){
	timedelay = true
	clearTimeout(menupause);
	menupause = setTimeout('hideSubNav()', 1000);
	}
}
function stopdelay(){
	timedelay = false;
}

function hideSubNav(){
	if(primary.length != 0){ 
	if(timedelay == true){
		navoff()
		document.getElementById("submenu").innerHTML = document.getElementById(primary+'sub').innerHTML
		if(primary.length > 0){
				document.getElementById(primary).className = "btnon";
		}
	}
	}
	clearTimeout(menupause);
}
function changeMiniArrow(objName)
{
aobj = document.getElementById("a"+objName)

	obj = document.getElementById(objName);
	if(obj.className=="drop-up")
	{
		obj.className = "drop-down";
			//aobj.style.fontWeight = 'bold';		
	}
	else
	{
		obj.className = "drop-up";
		aobj.style.fontWeight = 'normal';	
	}
}
function toggleBlock(pstrID){
  var myDiv = document.getElementById('d' + pstrID);

  if (myDiv){
    if (myDiv.style.display == 'none'){
      showBlock(pstrID);
    } else{
      hideBlock(pstrID);
    }
  }
}
function breadcrumbs(name){
}
function breadcrumbsNotUsed(){
  soutput = '';
  sURL = new String;
  bits = new Object;
  var x = 0;
  var stop = 0;
  var toutput = "<b>You are here:</b>&nbsp;";
  var output = ""
  sURL = location.href;
  sURL = sURL.slice(8,sURL.length);
  chunkStart = sURL.indexOf("/");
  sURL = sURL.slice(chunkStart+1,sURL.length)
  while(!stop){
    chunkStart = sURL.indexOf("/");
    if (chunkStart != -1){
      bits[x] = sURL.slice(0,chunkStart)
      sURL = sURL.slice(chunkStart+1,sURL.length);
    }else{
      stop = 1;
    }
    x++;
  }
  for(var i in bits){
    output += "<a href=\"";
    for(y=1;y<x-i;y++){
      output += "../";
    }
	switch (bits[i]){
		case 'businesscenter':
		soutput = 'Business Center';
		break;
		case 'phones-devices':
		soutput = 'Phones &amp; Devices';
		break;
		case 'plans':
		soutput = 'Plans';
		break;
		case 'solutions':
		soutput = 'Solutions';
		break;
		case 'built-for-business':
		soutput = 'Built for Business';
		break;
		case 'business-programs':
		soutput = 'Business Programs';
		break;
		case 'support':
		soutput = 'Support';
		break;
		case 'phones-devices':
		soutput = 'Phones &amp; Devices';
		break;
		case 'small':
		soutput = 'Small Business';
		break;
		case 'government':
		soutput = 'Government';
		break;
		case 'college':
		soutput = 'College &amp; University';
		break;		case 'mid-large':
		soutput = 'Mid to Large-size Business';
		break;
		case 'spotlight':
		soutput = 'Spotlight';
		break;
		case 'promotionpage':
		soutput = 'Promotions';
		break;

		default:
		soutput = bits[i]
	}
   //output += bits[i] + "/\">" + soutput + "</a>  <span style=\"font-size:.8em\">>\<\/span\>  ";
	 output += bits[i] + "/\">" + soutput + "</a>  <span style=\"font-size:.8em\">>\<\/span\>  ";
	 toutput += toutput +=output
  }
  document.getElementById("breadcrumb").innerHTML = output + "<span>"+name+"<\/span>";
  document.getElementById("breadcrumb").style.display="block";
}
function showBlock(pstrID){
  var myDiv = document.getElementById('d' + pstrID);
  if (myDiv){
    myDiv.style.display = 'block';		// SHOW this block
  }
}
function hideBlock(pstrID){
  var myDiv = document.getElementById('d' + pstrID);
  if (myDiv){
    myDiv.style.display = 'none';
  }
} 


function cancelEventBubble(evt) {
    if(window.event)
	window.event.cancelBubble = true;
    else
	evt.cancelBubble = true;
}
