var start=1;
var end=5;
function setBlocks(start,end, parent_id){
	for(var s=start; s<=end; s++){
		if(document.getElementById(parent_id+s)){
			document.getElementById(parent_id+s).style.display="block";
		}
	}
}



function pageFlip(set,start,parent_id,no_count){//set is how many items are in each set
	var id="";
	var disp="";//what current id's display is 
	var b=0;
	var shown="";
	for(var i=1; document.getElementById(parent_id+i); i++ ){
		id=parent_id+i;
		y=document.getElementById(id);
		disp=y.style.display;
		y.style.display="none"
		if(disp=="block"){b=i;b++;}
	}
	if(start==1){
		b=Math.round(Math.random()*i);
	}
	var end=b+(set);
	if(b == i){
		end=set;
		setBlocks(1,end, parent_id);
		b=1;
	}else if(b == 0){
		end=set;
		setBlocks(1,end, parent_id);
		b=1;
	}else{
		end--;
		setBlocks(b,end, parent_id);
	}
	i--;
	if(end>i){end=i;}
	if(b==end){shown=b;}else{shown=b + '-' + end;}
	if(no_count){
		document.getElementById(parent_id + '_counter').childNodes[0].nodeValue ='next';
	}else{
		document.getElementById(parent_id + '_counter').childNodes[0].nodeValue = shown + ' of ' + i;
	}
}


function changeTab (id,tabname) {
	
	var x=0;
	for(var i=1; document.getElementById(id+'_tab_t'+i); i++ ){
		//set all content areas to none
		document.getElementById(id+'_tab_t'+i).style.display = 'none';
		var tab='t'+i;
		
		//see if this iteration is the selected tab
		if(tabname==tab){
			changeClass(id+'_'+tab,'current');
			x=i-1;
			var prev='t'+x;
		}else{
			changeClass(id+'_'+tab,'none');
		}
	}
	if(x>0){changeClass(id+'_'+prev,'neighbor')}
	if(tabname!=tab){
		changeClass(id+'_'+tab,'last');
	}
	document.getElementById(id+'_tab_'+tabname).style.display = 'block';
	
	
}

function changeClass(id, newClass) {
	identity=document.getElementById(id);
	identity.className=newClass;
}

function deleteCookie(cookie){
	exp = new Date(); 
	exp.setTime(exp.getTime() - 1800000);
	setCookie(cookie, '', exp, false, false, false);
	//document.location.reload();
}
	
function setCookie(name, value, expires, path, domain, secure) { 
	 var curCookie = name + "=" + escape(value) + 
		((expires) ? "; expires=" + expires.toGMTString() : "") + 
		((path) ? "; path=" + path : "") + 
		((domain) ? "; domain=" + domain : "") + 
		((secure) ? "; secure" : ""); 
	 document.cookie = curCookie;
}

function getCookies(name){
	 //in cookie when name is the empty string.
	 if(name == '')
		return('');
	 
	 name_index = document.cookie.indexOf(name + '=');
	 
	 if(name_index == -1)
		return('');
	 
	 cookie_value =  document.cookie.substr(name_index + name.length + 1, 
											document.cookie.length);
	 
	 //All cookie name-value pairs end with a semi-colon, except the last one.
	 end_of_cookie = cookie_value.indexOf(';');
	 if(end_of_cookie != -1)
		cookie_value = cookie_value.substr(0, end_of_cookie);

	 //Restores all the blank spaces.
	 space = cookie_value.indexOf('+');
	 while(space != -1)
		  { 
		  cookie_value = cookie_value.substr(0, space) + ' ' + 
		  cookie_value.substr(space + 1, cookie_value.length);
						 
		  space = cookie_value.indexOf('+');
		  }

	 return(cookie_value);
}

function setMySize(size){
	var exp = new Date(); 
	exp.setTime(exp.getTime() + 18000000000000);
	deleteCookie("fontsize");
	setCookie("fontSize", size, exp, "/", window.location.hostname, "");
}

function changeStyles (size) {
 	var id='story_text';

   setMySize(size);
   obj = document.getElementById(id);
    
	if (!obj) {
       alert("unrecognized ID");
       return false;
    }
	
	if(size=='small'){
    	obj.style.fontSize = "12px";
	}
	if(size=='medium'){
		obj.style.fontSize = "14px";
	}
	if(size=='large'){
		obj.style.fontSize = "16px";
	}
		
	//setMySize(size)
	
    return true;
 }
 
//CREATES AN INLINE VMIX VIDEO
function makeVideoObj(obj){
	
	if(!obj.width){
		obj.width = 235;	
	}
	
	if(!obj.height){
		obj.height = obj.width * .787;
	}
	
	if(!obj.autoplay){
		obj.autoplay = 'false';	
	}
	
	if(!obj.ref){
		obj.ref = document.location;	
	}
	
	var pid = 'player_id=1b46d84972003656d7ea292fc5d80122&';
	if(obj.no_ad){
		pid='';	
	}
	
	var video = '<embed id="player_swf" src="http://media.vmixcore.com/core-flash/UnifiedVideoPlayer/UnifiedVideoPlayer.swf?' + pid + '" quality="high" width="' + obj.width + '" height="' + obj.height+ '" name="UnifiedVideoPlayer" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" allowFullScreen="true" wmode="transparent" type="application/x-shockwave-flash" flashvars="' + pid + 'token=' + obj.token + '" pluginspage="http://www.adobe.com/go/getflashplayer"></embed>';
	
	if(obj.share){
		var embedable = video;
		embedable = embedable.replace(/</g,'&lt;');
		embedable = embedable.replace(/>/g,'&gt;');
		embedable = embedable.replace(/"/g,'&quot;');
		
		var embed = '<p class="story_readable"><label style="font-size:10px;color:#666;">Embed this video:</label><br /><input type="text" name="embed_code" value="'+ embedable +'" onclick="this.select();" style="width:'+ (obj.width - 5) +'px" readonly /></p>';
		video += embed;
	}
	
	if(obj.target_id){
		var target = document.getElementById(obj.target_id);
		target.innerHTML = video;
		
	}else{
		return video;
	}
}


//CREATES AN INLINE SWF OBJ
function makeSwfObject(obj){
	
	if(!obj.width){
		obj.width = 600;	
	}
	
	if(!obj.height){
		obj.height = 500;
	}
	
	var video = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" height="'+ obj.height +'" width="'+ obj.width +'">';
	video +='<param name="movie" value="'+ obj.url +'">';
	video +='<param name="quality" value="high" />';
	video +='<param name="menu" value="false" />';
	video += '<param name="wmode" value="transparent" />';
	video +='<embed src="'+ obj.url +'" height="'+ obj.height +'" width="'+ obj.width +'" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	video +='</object>';
	
	if(obj.target_id){
		var target = document.getElementById(obj.target_id);
		target.innerHTML = video;
		
	}else{
		return video;
	}
}



// Popup

var popVideo = null;


function video_pop(url)
{
	if (popVideo && !popVideo.closed)
		popVideo.location.href = url;
	else
	
		var h = 370;
		var w = 340;
	
		/*if((url.match(/gallery/)||url.match(/photos/)) && url.match(/iditarod/)){
			w = 770;
			h = 650;
		}*/
		
		popVideo = window.open(url,'popVideo','height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes,toolbar=no,location=no');
		
	popVideo.focus();
	return false;
}

var popGallery = null;

function story_gallery(url)
{
	if (popGallery && !popGallery.closed)
		popGallery.location.href = url;
	else
		popGallery = window.open(url,'popGallery','height=500,width=350,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popGallery.focus();
	return false;
}

var popMedia = null;

function adn_media(url)
{
	if (popMedia && !popMedia.closed)
		popMedia.location.href = url;
	else
		popMedia = window.open(url,'media','height=820,width=805,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popMedia.focus();
	return false;
}

function adn_media_as(url)
{
	
	//alert('NEW');
	if (popMedia && !popMedia.closed){
		if(popMedia.location.href = url){
			//alert('FOCUSING');
			popMedia.focus();
			return true;
		}
	}else{
		if(popMedia = window.open(url,'media','height=820,width=805,scrollbars=yes,resizable=yes,toolbar=no,location=no')){
			//alert('POPPING UP');
			popMedia.focus();
			return true;
		}
	}
	//alert('RETURNING FALSE');
	return false;
}

var popMedia = null;

function media(url)
{
	if (popMedia && !popMedia.closed)
		popMedia.location.href = url;
	else
		popMedia = window.open(url,'media','height=820,width=805,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popMedia.focus();
	return false;
}




var popGallery = null;

function story_gallery(url)
{
	if (popGallery && !popGallery.closed)
		popGallery.location.href = url;
	else
		popGallery = window.open(url,'popGallery','height=500,width=350,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popGallery.focus();
	return false;
}

var popInfo = null;

function info_box(url)
{
	if (popInfo && !popInfo.closed)
		popInfo.location.href = url;
	else
		popInfo = window.open(url,'popInfo','height=300,width=420,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popInfo.focus();
	return false;
}

function info_box2(url)
{
        if (popInfo && !popInfo.closed)
                popInfo.location.href = url;
        else
                popInfo = window.open(url,'popInfo','height=450,width=500,scrollbars=yes,resizable=yes,toolbar=no,location=no');
        popInfo.focus();
        return false;
}

var popStory = null;

function print_story(url)
{
	if (popStory && !popStory.closed)
		popStory.location.href = url;
	else
		
		var w = 590;
		var h = 600;
	
		if(url.match(/v-story_gallery/)){
			w = 790;
			h = 650;
		}
	
		popStory = window.open(url,'popStory','height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popStory.focus();
	return false;
}

var popGallery = null;

function photo_gallery(url)
{
	if (popGallery && !popGallery.closed)
		popGallery.location.href = url;
	else
	
		var w = 800;
		var h = 820;
	

		
		popGallery = window.open(url,'popGallery','height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popGallery.focus();
	return false;
}


var popWide = null;

function short_wide(url)
{
	if (popWide && !popWide.closed)
		popWide.location.href = url;
	else
		popWide = window.open(url,'popWide','height=415,width=625,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popWide.focus();
	return false;
}

var popJob = null;

function top_job(ref)
{
	var url=ref.href;
	if (popJob && !popJob.closed)
		popJob.location.href = url;
	else
		popJob = window.open(url,'popJob','height=540,width=540,scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popJob.focus();
	return false;
}

var popEnlarge = null;

function enlarge(ref)
{
	var url=ref.href;
	if (popEnlarge && !popEnlarge.closed)
		popEnlarge.location.href = url;
	else
		popEnlarge = window.open(url,'popEnlarge','height=540,width=540,resizable=yes,toolbar=no,location=no');
	popEnlarge.focus();
	return false;
}

var popSized = null;

function popup_sized(url,height,width)
{
	//if (popSized && !popSized.closed)
	//	popSized.location.href = url;
	//else
	if( url.match(/gallery/) && url.match(/photos/) ){
		if(width < 790){
			width = 790;
		}
		if(height < 650){
			height = 650;
		}
	}
		
	popSized = window.open(url,'popSized' + height + width,'height='+height+',width='+width+',resizable=yes,toolbar=no,location=no');
	popSized.focus();
	return false;
}

var popRadio = null;

function js_popup_radio(url,height,width)
{	
	popRadio = window.open(url,'listenLive' + height + width,'height='+height+',width='+width+',resizable=yes,toolbar=no,location=no');
	record_click('ListenLive',url);
	popRadio.focus();
	return false;
}


var popSizedScrl = null;

function popup_sized_scroll(url,height,width)
{
	if (popSizedScrl && !popSizedScrl.closed)
		popSizedScrl.location.href = url;
	else
		if( url.match(/gallery/) && url.match(/photos/) ){
			if(width < 790){
				width = 790;
			}
			if(height < 650){
				height = 650;
			}
		}
		popSizedScrl = window.open(url,'popSizedScrl','height='+height+',width='+width+',scrollbars=yes,resizable=yes,toolbar=no,location=no');
	popSizedScrl.focus();
	return false;
}

var popApVid = null;

function popup_ap_video(url)
{
	if (popApVid && !popApVid.closed){
		popApVid.location.href = url;
	}else{
	
		var h = 750;
		var w = 1100;
		
		popApVid = window.open(url,'popApVid','height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes,toolbar=no,location=no');
		
	}
	
	
	popApVid.focus();
	record_click('ap_video',url);
	return false;
}



var popVmix = null;

function popup_vmix(url)
{
	if (popApVid && !popApVid.closed){
		popApVid.location.href = url;
	}else{
	
		var h = 780;
		var w = 840;
		
		popVmix = window.open(url,'popVmix','height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes,toolbar=no,location=no');
		
	}
	
	
	popVmix.focus();
	return false;
}


function goGallery(url)  {
	galleryWindow = window.open(url,'gallerypopup','status=yes,width=600,height=600,scrollbars=auto,resizable=yes');
}

function jump_to(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

/* this function allows us to track clicks on links that have other onclick functionalit.. bstone@adn.com 4/28/05 */

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}




//TIME STUFF
if(!ts){
var now = new Date();
var ts = now.getTime()/1000;
}
//var d = new Date(ts * 1000);
function makeStamp(ss,hrs,str){
	
	var str = getBreakingText(ss,hrs,str);
	var className = getBreakingClass(ss);
	if(str){
		document.write('<span class="' + className + '">' + str + '</span>');
	}

}

function getBreakingClass(ss){
	var diff = 4*60*60;
	var className = 'breaking';
	//ADDS MINOR CLASSNAME IF NEWS IS MORE THAN 4 HOURS OLD
	
	if( (ts-ss) >= diff ){
		className += ' minor';
	}
	return className;
}

function getBreakingText(ss,hrs,str){
	
	//DEFAULT HOURS CHANGED TO 12 3/13/07
	if(!hrs){hrs = 12;}
	var diff = hrs*60*60;
	
	if( (ts - ss) <= diff ){
		if(!str){
			var ds = new Date(ss * 1000);// * 1000);
			//alert(ds.toLocaleString() + "\n" + d.toLocaleString());
			var mer = 'a.m.';
			var hr = ds.getHours();
			var min = String(ds.getMinutes());
			if(min.length < 2){
				min = '0' + min;
			}
			if(hr > 12){
				hr = hr - 12;
				mer = 'p.m.';
			}else if(hr == 12){
				mer = 'p.m.';
			}
			str =  hr + ':' + min + ' ' + mer + ' AKST';
		}
		return str;
	}else{
		return false;	
	}

}

function record_click(name,ref){
	
	if(window.s_gi){
		
		var obj = document.createElement('a');
		obj.href = ref;
		obj.innerHTML = name;
		
		var link_type = 'o';
		if(ref.match('http') && !ref.match('adn.com') && !ref.match('alaska.com')){
			link_type = 'e';	
		}
		
		var s=s_gi('nmanchorage');
		s.linkTrackVars='None';
		s.linkTrackEvents='None';
		//s.tl(obj,link_type,name);
		
		setTimeout("s.tl('" + obj + "','" + link_type + "','" + name + "')",0);
		
		//alert('Tracked: ' + ref + ' / ' + link_type + ' / ' + name);
	}
	
	
	/*
	s_linkType="o";
	s_linkName=name;
	s_links_lnk=ref;
	var done = false;
	var ct = 0;
	
	
	if(window.s_gs){
		setTimeout("s_gs('nmanchorage')",0);
		done = true;
	}*/

}


function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}


function placeAd(){

	var rh = 0;
	var h1 = 0;
	var h2 = 0;
	
	if(document.getElementById('side_section')){
		h1 = findPos(document.getElementById('side_section'))[1] + document.getElementById('side_section').offsetHeight;
	}
	if(document.getElementById('story_inset')){
		h2 = findPos(document.getElementById('story_inset'))[1] + document.getElementById('story_inset').offsetHeight;
	}
	
	var story_text = document.getElementById('story_text');
	var nodes = story_text.getElementsByTagName('p');
	var done = false;
	
	var className = 'embed_left';
	
	if(h2 > h1){
		className = 'embed_right';
	}
	
	
	for(var i=0;i<nodes.length;i++){
		var node = nodes[i];
		if(node.className && node.className.match(/story_readable/) && !done){
			var os = findPos(node)[1];
			if(os > h1 && os > h2 ){
				var ad = document.getElementById('storyAdWrap');
				ad.className = className;
				
				if(i + 2 < nodes.length){
					node = nodes[i + 2];
				}
				
				/*if(i + 7 < nodes.length){
					node = nodes[i + 4];
				}*/
				
				//var clearing = document.createElement('div');
				//clearing.className = 'clearing';
				//node.insertBefore(clearing,node.firstChild);
				
				node.insertBefore(ad,node.firstChild);
				//if(className == 'embed_right'){
				document.write('<div class="clearing"></div>');
					
				//}
				done=true;
			}
		}
	}
}

var ap_instances = new Array();
function ap_stopAll(playerID) {
	
	for(var i = 0;i<ap_instances.length;i++) {
		try {
			if(ap_instances[i] != playerID) document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 1);
			else document.getElementById("audioplayer" + ap_instances[i].toString()).SetVariable("closePlayer", 0);
		} catch( errorObject ) {
			// stop any errors
		}
	}
	
	var track = document.getElementById('audioplayer' + playerID).innerHTML.match(/[-| |\w|\d|\)|\(|\[|\]|_]*.mp3/);
	record_click('AUDIO|' + track,track);
	
	
	
}

function ap_registerPlayers() {
	var objectID;
	var objectTags = document.getElementsByTagName("object");
	for(var i=0;i<objectTags.length;i++) {
		objectID = objectTags[i].id;
		if(objectID.indexOf("audioplayer") == 0) {
			ap_instances[i] = objectID.substring(11, objectID.length);
		}
	}
}

var ap_clearID = setInterval( ap_registerPlayers, 100 );

var ADN_AUDIO_CT = 1;
function audio_package(ref,title,summary,width,height){
	var player = new Array;
	
	if(title || summary){
		player.push('<div class="audio">');
	}
	
	if(title){
		player.push('<p class="head">' + title + '</p>');	
	}
	
	if(!width){
		width = 290;	
	}
	if(!height){
		height = 24;	
	}
	
	
	var player_lines = audio_player(ref,width,height);
	for(var i=0;i<player_lines.length;i++){
		player.push(player_lines[i]);	
	}
	
	
	if(summary){
		player.push('<p class="summary">' + summary + '</p>');	
	}
	
	if(title || summary){
		player.push('</div>');
	}
	
	writelines(player);
	
	
	
}

function audio_player(ref,width,height,autostart){
	
	if(!width){
		width = 190;	
	}
	if(!height){
		height = 18;
	}
	
	var autoParam = 'no';
	
	if(autostart){
		autoParam = 'yes';
	}
	
	var player = new Array;
	player.push('<object type="application/x-shockwave-flash" data="http://www.adn.com/includes/assets/audio-player/player.swf" id="audioplayer' + ADN_AUDIO_CT + '" height="' + height + '" width="' + width + '">');	
	player.push('<param name="movie" value="http://www.adn.com/includes/assets/audio-player/player.swf">');
	player.push('<param name="FlashVars" value="playerID=' + ADN_AUDIO_CT + '&amp;soundFile=' + ref + '&amp;autostart='+ autoParam +'">');
	player.push('<param name="menu" value="false" />');
	player.push('<param name="wmode" value="transparent" />');
	player.push('<param name="quality" value="high" />');
	player.push('<embed src="http://www.adn.com/includes/assets/audio-player/player.swf" flashvars="playerID=' + ADN_AUDIO_CT + '&amp;soundFile=' + ref + '&amp;autostart='+ autoParam +'" height="' + height + '" width="' + width + '">');
	player.push('</object>');
	
	ADN_AUDIO_CT ++;
	
	return player;
	
}

function writelines(lines){
	if(lines){
		for(var i=0;i<lines.length;i++){
			document.writeln(lines[i]);	
		}	
	}
}

function getMovieTrailer(url){


		var fileCall = 'http://media.adn.com/smedia/movies/trailers/flvplayer.swf?file=' + url + '&autostart=false';
		
		var swf = new Array;
		swf.push('<div id="trailer">');
		swf.push('<object type="application/x-shockwave-flash" width="320" height="260" wmode="transparent" data="' + fileCall + '">');
		swf.push('<param name="movie" value="' + fileCall + '" />');
		swf.push('<param name="wmode" value="transparent" />');
		swf.push('</object>');
		swf.push('</div>');
		writelines(swf);
		
		
}

function openFromPop(url,shouldCloseSelf){
	var isOpenerOpen;
	
	// test if opener window is open
	if(self.opener){
		if(! self.opener.closed){
			isOpenerOpen = 1;
		}
	} 
	
	// the opener is open...refresh the data in that window
	if(isOpenerOpen){
		self.opener.location.href = url;
		if(shouldCloseSelf){
			self.close();
		}
		self.opener.focus();
	// there is no opener window, open a new window
	} else {
		self.location.href = url;
		/*var myWindow = window.open(url,"something");
		if(shouldCloseSelf){
			if(this){
				self.opener = this;
				self.close();
			}
			if(self.parent){
				self.close();
			}
		}
		myWindow.focus();*/
	}
}


/*  ADDS SCRIPTS/STYLES AS NEEDED */
function addHeadContent(){
 if (window.GetCookie) {
 
 	var insitecookie=document.cookie.match('adn_user_auth');
 	var isloggedin = false;
 
 	if(GetCookie(insitecookie)){              
		 var name = (GetCookie(insitecookie).replace(/\|.*/,""));
		 name=name.substr(0,8);
		 if(!name.match(/\.thresh/) && name.length > 0){
			isloggedin = true;
		 }
	}
	
	if(!isloggedin){
		document.writeln('<link href="http://media.adn.com/includes/assets/styles/notloggedin.css" rel="stylesheet" type="text/css" />');
	}
	
	
 }
}

addHeadContent();

