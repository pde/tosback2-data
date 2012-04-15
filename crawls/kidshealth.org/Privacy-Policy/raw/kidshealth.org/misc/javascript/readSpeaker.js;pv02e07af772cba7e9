// JavaScript Document
/*
document.write("<style type='text/css'> ");
document.write("#rspopup {margin: 3px; font-size: 12px; font-family: Arial; width: 160px; border-top: 1px solid #a4cbff; }");
document.write("#rspopup a { display:block; width:161px;color: black; text-decoration: none; } ");
document.write("#rspopup ul { margin: 0px;  } #rspopup li { list-style-type:none; margin:  0px; padding: 0px; padding-left: 2px; padding-top: 2px; } ");
document.write("#rspopup li.head {  width:160px;font-weight: 600;  text-align:left;  text-decoration:none;  background:#ffffff;  color:#000;  padding:0.25em;  margin-left:1px;  } ");
document.write("#rspopup .act { font-weight:bold; color:#000; } ");
document.write("#rspopup ul { margin: 0px; padding: 0px; } #rspopup a, #rspopup a:visited { background:#ffffff; color:#000; display:block; width:160px;  border:2px solid #a4cbff;  text-align:left;  text-decoration:none;  padding:0.25em;  } #rspopup a:hover { background-color: #a4cbff; }");
document.write("#rspopup a.actlink {  color:#000; background-image: url('http://media.readspeaker.com/images/enterprise/default/check.png'); background-repeat: no-repeat; background-position: 98% 3px; } ");
document.write("#bottomlinks { font-family:Arial;color:#333;font-size:11px; } #bottomlinks a {color:black;text-decoration : none;padding : 2px;} #bottomlinks a:hover {color:black;text-decoration : none;padding : 2px;background-color: #a4cbff; }");
document.write("</style>");
*/

var defaultvalue="wordsent";
var defaultsurvive=360000000;
/*
document.write("<style type='text/css'>");
document.write(" .sync_word_highlighted { background-color: #a4cbff; }");
document.write(" .sync_sent_highlighted { background-color: #beffd6; }");
document.write("</style>");
*/

var readid=null;
var restorehtml=null;
var newhtml="";
var oldwordhl=null;
var oldsenthl=null;

function rshlsetContent(thecontent) {
	newhtml+=thecontent;
}

function rshlsetId(theid) {
	readid=theid;
}

function rshlinit() {
	var x=null;
	if (readid!=null) {
		x=document.getElementById(readid);
	}
	if (x!=null) {
		restorehtml=x.innerHTML;
		x.innerHTML=newhtml;
		newhtml="";
	}
}

function rshltidy() {
	var x=null;
	if (readid!=null) {
		x=document.getElementById(readid);
	}
	if (x!=null && restorehtml!=null) {
		x.innerHTML=restorehtml;
		restorehtml=null;
		readid=null;
	}
}

function rshlexit() {
	closepage('xpl');
}

function rshlsync(type,id) {
	var newEl = document.getElementById("sync"+id);
	if (newEl && newEl.className=="sync_sent") {
		if (oldsenthl) {
			oldsenthl.className = 'sync_sent';
		}
		oldsenthl=newEl;
		newEl.className = 'sync_sent_highlighted';
	}
	else if (newEl && newEl.className=="sync_word") {
		if (oldwordhl) {
			oldwordhl.className = 'sync_word';
		}
		oldwordhl=newEl;
		newEl.className = 'sync_word_highlighted';
	}
}

function readpage(rscall,playerid,hasFlashIn) {
	
	if(hasFlashIn=="Flash") {
		var thesync="none";
	}
	else {
	var thesync=loadSettings("ReadSpeakerHL");
	}
	if (thesync=="")
		thesync=defaultvalue;
		var audioformat="mp3";
		if (thesync!='none')
			audioformat="swf";
			origrscall=rscall;
			rscall=rscall+"&audioformat="+audioformat+"&sync="+thesync;
			newrscall=escape(rscall);
			the_player="<div id='rsPlayerWindow'>";
			the_player+="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' style='height: 20px; width: 394px;'>";
			the_player+="<param name='movie' value='http://media.readspeaker.com/flash/readspeaker20.swf?"+audioformat+"="+newrscall+"&autoplay=1&rskin=rounded&c1=0xcccccc&c11=0xebeff3'>";
			the_player+="<param name='quality' value='high'><param name='autostart' value='true'>";
			the_player+="<param name='allowScriptAccess' value='always'><param name='bgcolor' value='#FFFFFF'>";
			the_player+="<param name='loop' value='false'>";
			the_player+="<embed src='http://media.readspeaker.com/flash/readspeaker20.swf?"+audioformat+"="+newrscall+"&autoplay=1&rskin=rounded&c1=0xcccccc&c11=0xebeff3'";
			the_player+=" allowScriptAccess='always' quality='high' autostart='true' bgcolor='#FFFFFF' style='height: 20px; width: 394px;' loop='false' type='application/x-shockwave-flash'";
			the_player+=" pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' swliveconnect='true'>";
			the_player+="</embed></object>";
			the_html="<div id='bottomlinks'><a href='#' onclick='showcontrols(\""+origrscall+"\",\""+playerid+"\",\""+hasFlashIn+"\");return false'>Settings</a> | <a href='"+readSpeakerDownloadLink+"&save=1' target='rs'>Download audio</a> </div>";
			the_html+="<div id='controls'></div>";
			the_html+="<div id='rsCloseButton'><a href='#' onclick='closepage(\""+playerid+"\");return false'><img id='closebr' src='http://graphics.rspeak.com/images/wr/close.gif' border='0' alt='Close player'></a></div></div>";
			var x=document.getElementById(playerid);
			if (x) {
				x.innerHTML=the_player+the_html;
			}
}

function closepage(playerid) {
	var x=document.getElementById(playerid);
	if (x) {
		x.innerHTML='';
	}
	rshltidy();
}

function saveSettings(name, content, lifetime) {
 	lifetime=parseInt(eval(lifetime));  
	if (lifetime+""=="NaN") {
		tmpdate="";
	}
	else {
		var thedate = new Date();
		thedate.setTime(thedate.getTime() + lifetime);
		thedate=thedate.toGMTString();
		tmpdate="; expires="+thedate;
	}
	document.cookie=name+"="+escape(content)+tmpdate;
}

function loadSettings(ckname) {
	ckarr=document.cookie;
	cks=ckarr.split("; ");
	for (i=0;i<cks.length;i++) {
		cknameval=cks[i].split("=");
		if (cknameval[0]==ckname) {
			return unescape(cknameval[1]);
		}
	}
	return "";          
}

function setstyle(style) {
	saveSettings("ReadSpeakerHL",style,defaultsurvive);
	var x=document.getElementById('controls');
	if (x!=null)
		x.innerHTML="";
}

function showcontrols(rscall,playerid,hasFlashIn) {
	var x=document.getElementById('controls');
	if (x!=null && x.innerHTML!="") {
	x.innerHTML="";
    return false;
	}
	if(hasFlashIn=="Flash") {
		var thevalue="none";
		//setstyle("none");
	}
	else {
	var thevalue=loadSettings("ReadSpeakerHL");
	}
	if (thevalue=="")
		thevalue=defaultvalue;
		thestring="<div id='rspopup'><ul><li class='head'>Highlighting Options</li>";
		
		if(hasFlashIn!="Flash") {
		thestring+="<li class="; if (thevalue=="wordsent") thestring+="'act'";
		thestring+="><a href='#' onclick='setstyle(\"wordsent\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="wordsent") thestring+="class='actlink'"; thestring+=">Word and Sentence</a></li>";
		thestring+="<li class="; if (thevalue=="sent") thestring+="'act'";
		thestring+="><a href='#' onclick='setstyle(\"sent\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="sent") thestring+="class='actlink'"; thestring+=">Sentence only</a></li>";
		thestring+="<li class="; if (thevalue=="word") thestring+="act";
		thestring+="><a href='#' onclick='setstyle(\"word\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="word") thestring+="class='actlink'"; thestring+=">Word only</a></li>";
		thestring+="<li class="; if (thevalue=="none") thestring+="act";
		thestring+="><a href='#' onclick='setstyle(\"none\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="none") thestring+="class='actlink'"; thestring+=">No Highlighting</a></li></ul></div>";
		}
		else {
		thestring+="<li><a>Highlighting is not available for this piece of content.</a></li></ul></div>";	
		}
		
		var x=document.getElementById('controls');
		if (x!=null)
			x.innerHTML=thestring;
}

function makeTheRSLinkEN() {
	document.write('<a accesskey="L"  href="http://app.readspeaker.com/cgi-bin/rsent?customerid=5202&amp;lang=en_us&amp;voice=Kate&amp;speed=100&amp;readid=whichRead_'+whichReadPage+'&amp;url='+theRSURL+'&amp;mdid='+whichReadPage+'&amp;audiofilename=KidsHealth_'+encodeURIComponent(rsAudioTitle)+'" onclick="readpage(this.href, \'xp1\',\''+doesItGotFlash+'\'); return false;">Listen</a>');
	}
	
function makeTheRSLinkES() {
	document.write('<a accesskey="L"  href="http://app.readspeaker.com/cgi-bin/rsent?customerid=5202&amp;lang=es_us&amp;speed=75&amp;readid=whichRead_'+whichReadPage+'&amp;url='+theRSURL+'&amp;mdid='+whichReadPage+'&amp;audiofilename=KidsHealth_'+encodeURIComponent(rsAudioTitle)+'" onclick="readpage(this.href, \'xp1\',\''+doesItGotFlash+'\'); return false;">Escuchar</a>');	
}