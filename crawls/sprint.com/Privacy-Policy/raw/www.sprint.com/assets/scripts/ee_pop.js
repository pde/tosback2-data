function loadloadEePopFromForm(fm){
	var url = fm.action+'?';
	var ct = 0;
	var msg='';
	for(x=0; x<fm.elements.length;x++){
		if(fm.elements[x].type != 'image'){
			if(ct>0){
				url+='&';
			}
			url+=fm.elements[x].name+'='+fm.elements[x].value;
			ct++;
		}
	}
	var x = window.open(url,fm.target,'width=630, height=440, top=0, left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes');
	return false;

}

function loadEePopFromLink(lnk){
	var x = window.open(lnk.href,lnk.target,'width=630, height=440, top=0, left=0,toolbar=no,menubar=no,scrollbars=yes, resizable=yes');
	return false;

}



function randomizeBillboards(count){
	if(document.getElementById){
		var thisBanner = Math.floor(Math.random()*count+1);
		for(x=1; x<=count; x++){
			if(x==thisBanner){
				document.getElementById('billboard'+x).style.display='block';
			}
			else{
				document.getElementById('billboard'+x).style.display='none';
			}		
		}
	}	
}


location.getParam=function(name){if(location.search == ""){return null}	var lqry = location.search.substring(1);var params = lqry.split("&");for(x=0; x<params.length; x++){if(name == params[x].split("=")[0]){ return decodeURIComponent(params[x].split("=")[1]); } } return null }

function forwardTracking(type){
	var slink = document.getElementById('sprintLink');
	var nlink = document.getElementById('nextelLink');
	var id12 = location.getParam('id12');
	var id4 = location.getParam('id4');
	var intID = location.getParam('internalId');
	if(id12 != null){
		slink.href+=(slink.href.indexOf('?')>-1)?'&':'?';
		nlink.href+=(nlink.href.indexOf('?')>-1)?'&':'?';
		slink.href+='ART_ExtraOne='+id12;
		nlink.href+='id12='+id12;
	}
	if(id4 != null){
		slink.href+=(slink.href.indexOf('?')>-1)?'&':'?';
		nlink.href+=(nlink.href.indexOf('?')>-1)?'&':'?';
		slink.href+='AB_Ref='+id4;
		nlink.href+='id4='+id4;
	}
	if(type=="business"){
		if(intID != null){
			slink.href+=(slink.href.indexOf('?')>-1)?'&':'?';
			slink.href+='internalId='+intID;
		}
	}
}

// Banner Functions ********************************************************************
var initBanner = "";
function banners_DoFSCommand(command, args) {
  if (command == "setVariable") {
    bbTrack = xType + ';' + args;
	if(typeof s_prop1!="undefined"){
		s_prop1=bbTrack;
	}
  }
}

function getLoginCookie(){
	var name = "SprintEeLoginOptions";
	var firstChar, lastChar;
	var cookieValue='Default';
	var cookieTest = document.cookie;
	firstChar = cookieTest.indexOf(name);
	if(firstChar != -1){
		firstChar += name.length + 1;
		lastChar = cookieTest.indexOf(';', firstChar);
		if(lastChar == -1){lastChar = cookieTest.length;}
		cookieValue = cookieTest.substring(firstChar, lastChar);
	}
	return cookieValue
}


function buildFlash() {
	var flashCrumb = '<div id="billboards">'+
	'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="755" height="220">'+
	'<param name="movie" value="'+bannerBase+'banners.swf?xXML='+xmlBase+xXML+'&xType='+xType+'" />'+
	'<param name="quality" value="high" />'+
	'<param name="bgcolor" value="#ffffff" />'+
	'<embed src="'+bannerBase+'banners.swf?xXML='+xmlBase+xXML+'&xType='+xType+'" quality="high" bgcolor="#FFFFFF" width="755" height="220" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">\</embed>'+
	'<\/object></div>';
	return flashCrumb
}

// var xmlBase="/assets/images/common/entry/prms/flash/xml/"; //root path for xml files., set in individual file 
// var bannerBase="/assets/images/common/entry/prms/flash/";  // path to banner directory
var xType = getLoginCookie();
var bbTrack=xType;
// End Banner Functions ********************************************************************


// AB testing banner function****************************************************************

function bannerQueue(fle,url,alt,targ){
	this.file=fle;
	this.url="#";
	this.alt="Advertisement";
	this.target="_self";
	if(fle.match(/\.swf$/)){this.type='f'}
	else{this.type='i'}
	if(url){this.url=url}
	if(alt){this.alt=alt}
	if(targ){this.target=targ}
}

function getABBanner(que){
	var cnt=que.length;
	var src='<div id="billboards">';	
	thisBanner=Math.floor(Math.random()*que.length);
	switch(que[thisBanner].type){
		case 'f': src+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="755" height="200">';
				  src+='<param name="movie" value="'+que[thisBanner].file+'" />';
				  src+='<param name="quality" value="high" />\n<param name="bgcolor" value="#ffffff" />';
				  src+='<embed src="'+que[thisBanner].file+'" quality="high" bgcolor="#FFFFFF" width="755" height="200" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">\</embed>';				
				  src+='<\/object>';
				  break;
		case 'i': src+='<a href="'+que[thisBanner].url+'" target="'+que[thisBanner].target+'"><img src="'+que[thisBanner].file+'" alt="'+que[thisBanner].alt+'" /></a>';
				  break;
		
	}
	src+='</div>';
	return src;
}

// AB testing banner function****************************************************************