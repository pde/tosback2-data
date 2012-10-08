findPos = function (obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
openNdnWindow = function(url){
	window.open(url,"ndnPlayer","",false);	
}//player variables

traceMsg = function(msg){
	if (ieVer != 7){
		//var temp = document.getElementById("trace").innerHTML
		//document.getElementById("trace").innerHTML = String("<p>"+msg+"</p>") + temp;
	}
}


var allowFullScreen = new Boolean();

var urlvars = getUrlVars();

if (urlvars["freewheel"] == undefined || urlvars["freewheel"] == "") {
    var freewheel = "0";
} else {
    var freewheel = String(urlvars["freewheel"]);
}
var wid = "0";
if (urlvars["wid"] == undefined || urlvars["wid"] == null || urlvars["wid"] == '') {
   wid = "0";
} else {
   wid = String(urlvars["wid"]);
}
if (urlvars["sitesection"] == undefined) {
    var sitesection = "0";
} else {
    var sitesection = urlvars["sitesection"];
}
var playerWidth = "300";
if (urlvars["width"] == undefined) {
    if (urlvars["w"] == undefined){
		playerWidth = "300";
	}else{
		playerWidth = urlvars["w"];
	}
} else {
    playerWidth = urlvars["width"];
}
var playerHeight = "169";
if (urlvars["height"] == undefined) {
	if (urlvars["h"] == undefined){
		playerHeight = "169";
	} else{
		playerHeight = urlvars["h"];
	}
} else {
    playerHeight = urlvars["height"];
}
if (urlvars["vid"] == undefined || urlvars["vid"] == "") {
    var vidId = "0";
} else {
    var vidId = urlvars["vid"];
}
if (urlvars["cid"] == undefined || urlvars["cid"] == "") {
    var cid = "0";
} else {
    var cid = urlvars["cid"];
}
var thumbId = "inlinePlayer";

if (urlvars["zoneid"] == undefined) {
    var ZoneID = "50974";
} else {
    var ZoneID = urlvars["zoneid"];
}
if (urlvars["guid"] == undefined) {
    var guid = "";
} else {
    var guid = urlvars["guid"];
}
if (urlvars["parent"] == undefined) {
    _parent = document.getElementsByTagName('body')[0];
} else {
    _parent = document.getElementById(urlvars["parent"]);
}
if (urlvars["embed"] == undefined){
	var embed = "iframe";
}else{
	var embed = urlvars["embed"];
}

	var ltype = "4";
	playerWidth = "300";	
	playerHeight = "250";

//Compatibilty mode detection
var agentStr = navigator.userAgent;
var mode;
var isIE9Compatibility = new Boolean(false);

if (agentStr.indexOf("Trident/5.0") > -1) {
	if (agentStr.indexOf("MSIE 7.0") > -1){
		mode = "IE9 Compatibility View";
		isIE9Compatibility = true;
	}else{
		mode = "IE9";
	}
	/*if (agentStr.indexOf("Trident/4.0") > -1) {
		if (agentStr.indexOf("MSIE 7.0") > -1){
			mode = "IE8 Compatibility View";
			isIE9Compatibility = true;
		}else{
		mode = "IE8";
		}
	}else{
		mode = "IE7";
	}*/
}
//alert("Browser Mode:\t" + mode  + "+isIE9Compatibility : \t" +isIE9Compatibility );
//document.title = "Browser Mode:\t" + mode;
//document.write(navigator.userAgent);

// Page view call
var urlArr = String(document.URL).split("?");
var furl = urlArr[0];
SavePageView(wid, furl, null, ((sitesection == '') ? null : sitesection), freewheel);
var rdm = String(Math.floor(Math.random()*1000000000));

var nn4 = (document.layers);
var nn6 = (document.getElementById && !document.all);
var ie4 = (document.all && !document.getElementById);
var ie5 = (document.all && document.getElementById);

var did = "1";
var autoPlay = new Boolean(false);
var disableAds = new Boolean(false);
//var continuousPlay = "6";
var disableEmbed = new Boolean(false);
var disableEmail = new Boolean(false);
var show_ads = new Boolean(true);
var landingURL = "";
var zoneid = "0";
var partnerlogo = "";

//initialize variables
var c2psource = "";
var vidsource = "";
var x = "";
var lastThumb = 999;
var thumbWidth=300;
var thumbHeight=200;
var controlsContent = "";
var thumbContent = "";
var thumbContent2 = "";
var socialWindow = "";
var linkString = "";
var embedString = "";
var thumbNum = 0;
var plistNum = 0;
var vidLoc = "";
var firstPlayClicked = new Boolean(false);
var firstAdRun = new Boolean(true);
var thumbClicked = new Boolean(false);
var adRunning = new Boolean(false);
var bumperPlayed = new Boolean(false);
var firstVidCall = new Boolean(true);
var activePlaylist = 0;
var activeContent = 0;
var isIOS = new Boolean(false);
var isSafari = new Boolean(false);
var isIE = new Boolean(false);
var ieVer = "0";
var isFF = new Boolean(false);
var isAndroid = new Boolean(false);
var isPC = new Boolean(false);
var isMobile = new Boolean(false);
var autoScroll = new Boolean(true);
var thisPos = 1;
//production
//var baseURL = "http://widget.newsinc.com/_cfvp/playlist16x9_player.html";
//test
var imageURL = "http://assets.newsinc.com/inline300img/";
//var imageURL = "";
var isContentArr = new Boolean(false);
var playlistArr = new Array();
var contentArr = new Array();
var assetArr = new Array();
var vidIdArr = new Array();
var durationArr = new Array();
var stillFrameArr = new Array();
var arraysSent = new Boolean(false);
var isEnded = new Boolean(false);
var callOnce = new Boolean(false);
var currentScrollNum = 0;
var scrollCount = 0;
var activeList = "ndn_thumbScroller";
var loopCount = 1;
var k=0;
var firstBuild = new Boolean(true);
var position = new Array();
var container = $('#ndn_container',_parent)[0];  //document.getElementById('ndn_container');
var thumbScroller = $('#ndn_thumbScroller',_parent)[0];  //document.getElementById('ndn_thumbScroller');
var thumbScroller2 = $('#ndn_thumbScroller2',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
var thumbScroller3 = $('#ndn_thumbScroller3',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
var thumbScroller4 = $('#ndn_thumbScroller4',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
var thumbControls = $('#ndn_thumbControls',_parent)[0];  //document.getElementById('ndn_thumbControls');
var thumbContainer = $('#ndn_thumbContainer',_parent)[0];  //document.getElementById('ndn_thumbContainer');
var singleThumb = $('#ndn_singleThumb',_parent)[0];  //document.getElementById('ndn_singleThumb');
var singleContainer = $('#ndn_singleContainer',_parent)[0];  //document.getElementById('ndn_singleContainer');
var singleScroller = $('#ndn_singleScroller',_parent)[0];  //document.getElementById('ndn_singleScroller');
var selector = $('#ndn_selector',_parent)[0];  //document.getElementById('ndn_selector');
var countdown = $('#ndn_countdown',_parent)[0];
var adChoicesContainer = $('#ndn_adchoice',_parent)[0];
var vid = $('#ndn_video',_parent)[0];
var contentCnt = 0;
var contentLength = 0;
var contentArr = new Array();
var orderArr = new Array();
var contentIdArr = new Array();
var contentIdArr2 = new Array();
var plistRetArr = new Array();
var isLanding = new Boolean(true);
var DistributorName = "";
var adCalled = new Boolean(false);
var curThumbAdNum = 0;
var curVidInfo = 0;
var firstScroll = new Boolean(true);
var secondScroll = new Boolean(true);
var isInform = new Boolean(false);
var topMatch = "false";
var htmlInit = new Boolean(false);
var flashInit = new Boolean(false);
var repeat = new Boolean(false);
var buildNum = 1;
var isRepeating = new Boolean(false);
var lastThumbNum = 0;
var continuousPlay = 0;
var continuousPlayCounter = 0;
var progressSent = [];
var pct0 = new Boolean(false);
var pct25 = new Boolean(false);
var pct50 = new Boolean(false);
var pct75 = new Boolean(false);
var pct100 = new Boolean(false);
var inScroll = new Boolean(false);
var videoStartTime = 3;
var videoSegmentLength = 6;
var slateAfterVideoHold = 1;
var fadeDownDuration = 1;

var firstLoad = new Boolean(true);
var auditudeLoaded = new Boolean(false);
var screenNum = 1;

var firstThumbLoaded = new Boolean(false);

var linearAdPlayed = new Boolean(false);
	
if (urlvars["topmatch"] == undefined){
	topMatch = "false";
}else{
	topMatch = urlvars["topmatch"];
}

getInternetExplorerVersion = function()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

//var browserOS = BrowserDetect.OS;
//var browserVersion = BrowserDetect.version;
//$iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
if (navigator.userAgent.match(/like Mac OS X/i)) {
	isIOS = true;
}
if (navigator.userAgent.match(/Safari/i)){
	isSafari = true;
}
if (navigator.userAgent.match(/MSIE/i)){
	isIE = true;
	ieVer = getInternetExplorerVersion();
}
if (navigator.userAgent.match(/Firefox/i)){
	isFF = true;
}
if (navigator.userAgent.match(/(iphone|ipod|ipad)/i)){
	did = "2";
	isMobile = true;	
}
if (navigator.userAgent.match(/Android/i)){
	isAndroid = true;
}
//for testing mobile on Chrome
//did = "2";
//isMobile = true;

//alert(navigator.userAgent.match(/iPad/i));
//alert(navigator.userAgent.match(/iPhone OS 3_1_3/i));

//NOTE: this function will not be needed once the HTML5 data is in the database and on servers
fixVid = function(str){
	str = str.substr(0,str.length-3);
	str = str + "mp4";
	return(str);	
}

getTitle = function(){
	return playlistArr[activePlaylist].Content[activeContent].Name;
}

getDescript = function(){
	return 	playlistArr[activePlaylist].Content[activeContent].Description;
}

pageInit = function () {
	//htmlInit = true;
	if ((DistributorName != "") && (adCalled == false) && (flashInit == true)){
		adCalled = true;
		//sendToActionScript();
	}
}
thisMovie = function (movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}
var sendToActionScript = function(thumbNum){
	if(thumbNum == null){
		thumbNum = 0;
	}
	activeContent = thumbNum;
	$(".ndn_thumbContainer").stopTime('autoScroll');	
	autoScroll = false;
	thumbClicked = true;
	if (isMobile == true){
		
		var x = (screenNum * 4)/contentLength;
		var y = (screenNum * 4)-(contentLength * Math.floor(x));
		var lastPos = 4-y;
		
		thisPos = Number(Number(lastPos) + Number(thumbNum)) + 1;
		traceMsg("thisPos = " + Number(thisPos));
		vid = $('#ndn_video').get(0)
		$('#ndn_video').get(0).src = getAsset(activePlaylist,thumbNum,'src');
		$('#ndn_video').get(0).load();
		$('#ndn_video').get(0).poster = getAsset(activePlaylist,thumbNum,'stillFrame');
		progressSent = [];
		firstPlayClicked = false;
		vid.play();
		//load();
	}else{
		thisMovie('flashcontent').sendVideoToPlay(activeContent,continuousPlay);
		//thisMovie("flashcontent").sendToActionScript(ZoneID,_temp,freewheel,sitesection,cid,wid,landingURL);
	}
	var pattern = 'ndn_thumbimg';
	$('.ndn_inlinePlayerthumbimg').each(function(){
		//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
		if ($(this).attr('id').indexOf(pattern) == 0){
			$(this).css('border-width','0px');
			$(this).css('border-color','#900');
			$(this).css('border-style','none');
			$(this).css('left','0px');
			$(this).css('top','-90px');		
		}
	});
	
	var pattern2 = String('ndn_thumbimg'+thumbNum);
	$('.ndn_inlinePlayerthumbimg').each(function(){
		//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
		//if ($(this).attr("id").indexOf(pattern2) == 0){
		if ($(this).attr("id") == pattern2){
			$(this).css('border-width','2px');
			$(this).css('border-color','#900');
			$(this).css('border-style','solid');
			if (contentLength <= 4){
				$(this).css('left','-6px');
			}else{
				$(this).css('left','-4px');
			}
			$(this).css('top','-92px');		
		}
	});
	
	document.getElementById('title_text').innerHTML = fitStringToWidth(playlistArr[activePlaylist].Contents[thumbNum].Name,200,'title_text',20);
	document.getElementById('provider_text').innerHTML = playlistArr[activePlaylist].Contents[thumbNum].ProducerName;
	var pubDate = new Date(parseInt(playlistArr[activePlaylist].Contents[thumbNum].PubDate.substr(6)));
	document.getElementById('date_text').innerHTML = pubDate.format('mmm d, yyyy',true);
	document.getElementById('prov_logo').src = playlistArr[activePlaylist].Contents[thumbNum].ProducerLogo;
}

showAdChoices = function(doShow){
	traceMsg("doShow = " + doShow);
	if (doShow == true){
		adChoicesContainer.style.visibility = "visible";
	}else{
		adChoicesContainer.style.visibility = "hidden";
	}
}

stopAutoplay = function(){
	$(".ndn_thumbContainer").stopTime('autoScroll');	
	autoScroll = false;
	thumbClicked = true;
}

var updateCountdown = function(txt){
	if (ieVer == 7){
		document.getElementById("ndn_countdown").style.top = "-528px";
	}
	if (isFF == true){
		document.getElementById("ndn_countdown").style.top = "-532px";
	}
	if (isMobile == true){
		document.getElementById("ndn_countdown").style.top = "-533px";
		document.getElementById("ndn_countdown").style.height = "30px";
		document.getElementById("ndn_countdown").style.backgroundColor = "#FFF";
		document.getElementById("ndn_countdown").style.paddingBottom = "10px";
	}
	document.getElementById("ndn_countdown").innerHTML = txt;
	document.getElementById("ndn_countdown").style.visibility = "visible";
}

var hideCountdown = function(){
	document.getElementById("ndn_countdown").style.visibility = "hidden";
}

var shareVideo = function(type){
	var shareStr = String(landingURL+"?freewheel="+freewheel+"&sitesection="+sitesection+"&VID="+playlistArr[activePlaylist].Contents[activeContent].ContentID);
	if (type == "facebook"){
		var shareLink = String("http://www.facebook.com/sharer.php?s=100&p[title]="+playlistArr[activePlaylist].Contents[activeContent].Name+"&p[summary]="+playlistArr[activePlaylist].Contents[activeContent].Description+"&p[url]="+escape( shareStr )+"&p[images][0]=http://thumbnail.newsinc.com/"+playlistArr[activePlaylist].Contents[activeContent].ContentID+".jpg");
		openNdnWindow(shareLink);
	}else if (type == "twitter"){
		var shareLink = String("http://twitter.com/share?text=Watch this video: "+playlistArr[activePlaylist].Contents[activeContent].Name+" &url="+escape( shareStr ));
		openNdnWindow(shareLink);
	}else if (type == "delicious"){
		var shareLink = String("http://www.delicious.com/save?v=5&noui&jump=close&url="+escape( shareStr )+"&title="+playlistArr[activePlaylist].Contents[activeContent].Name+"&notes="+playlistArr[activePlaylist].Contents[activeContent].Description);
		openNdnWindow(shareLink);
	}else if (type == "stumbleupon"){
		var shareLink = String("http://www.stumbleupon.com/submit?url="+escape( shareStr )+"&title="+playlistArr[activePlaylist].Contents[activeContent].Name);
		openNdnWindow(shareLink);
	}else if (type == "myspace"){
		var shareLink = String("http://www.myspace.com/index.cfm?fuseaction=postto&u="+escape( shareStr )+"&t="+playlistArr[activePlaylist].Contents[activeContent].Name+"&c="+playlistArr[activePlaylist].Contents[activeContent].Description);
		openNdnWindow(shareLink);
	}else if (type == "copylink"){
		var shareLink = shareStr;
		thisMovie("flashcontent").copyToClipboard(shareLink);
	}else if (type == "copyembed"){
		var shareLink = String("<iframe src='http://embed.newsinc.com/Single/iframe.html?WID=1&CID=507&VID="+playlistArr[activePlaylist].Contents[activeContent].ContentID+"&freewheel=69016&sitesection="+sitesection+"&height=320&width=523' height=320 width=523 frameborder=no scrolling=no noresize marginwidth=0px marginheight=0px></iframe>");
		traceMsg("shareLink = " + shareLink);
		thisMovie("flashcontent").copyToClipboard(shareLink);
	}else if (type == "email"){
		var emailLink = String(landingURL+"?freewheel="+freewheel+"&sitesection="+sitesection+"&VID="+playlistArr[activePlaylist].Contents[activeContent].ContentID);
		var shareLink = String("http://api.addthis.com/oexchange/0.8/forward/email/offer?url="+escape(emailLink)+"&title="+playlistArr[activePlaylist].Contents[activeContent].Name+"&note="+playlistArr[activePlaylist].Contents[activeContent].Description);
		openNdnWindow(shareLink);
	}
	
}

var showCompanion = function(data, type){
	//alert(data);
	//alert(type);
	if (type == "html"){
		document.getElementById("ndn_companion").innerHTML = data;
	}else if (type == "iframe"){
		document.getElementById("ndn_companion").innerHTML = "<iframe id='ndn_comp' style='height:250px;width:300px;' src="+data+" scrolling='no' frameborder='0' marginheight='0' marginwidth='0'></iframe>";
		document.getElementById("ndn_comp").width = "300";
		document.getElementById("ndn_comp").height = "250";
		document.getElementById("ndn_comp").style.width = "300";
		document.getElementById("ndn_comp").style.height = "250";
		
	}else{
		document.getElementById("ndn_companion").innerHTML = "<iframe id='ndn_comp' style='height:250px;width:300px;' src="+data+" scrolling='no' frameborder='0' marginheight='0' marginwidth='0'></iframe>";
	}
	document.getElementById("ndn_companion").style.visibility = "visible";
	thumbContainer.style.visibility = "hidden";
	thumbControls.style.visibility = "hidden";
	$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "hidden";
	$('#ndn_scrollLeft',_parent)[0].style.visibility = "hidden";
}

var hideCompanion = function(){
	document.getElementById("ndn_companion").innerHTML = "";
	document.getElementById("ndn_companion").style.visibility = "hidden";
	thumbContainer.style.visibility = "visible";
	if (contentLength > 4){
		thumbControls.style.visibility = "visible";
		traceMsg("scrollCount = " + scrollCount + "     " + "loopCount = " + loopCount);
		if (scrollCount > 0 || loopCount > 1){
			$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "visible";
			$('#ndn_scrollLeft',_parent)[0].style.visibility = "visible";
		}
	}
}

setNextVideo = function(nextVidId){
	traceMsg("in setNextVideo");
	//alert("here");
	for (a=0;a<contentLength;a++){
		if (playlistArr[activePlaylist].Contents[a].ContentID == nextVidId){
			activeContent = a;
			break;
		}
	}
	/*
	$(".ndn_inlinePlayerthumbimg",_parent).each(function(i, element) { $(element)[0].style.borderWidth = "0px"; });
	$(".ndn_inlinePlayerthumbimg",_parent).each(function(i, element) { $(element)[0].style.borderColor = "#F00"; });
	$(".ndn_inlinePlayerthumbimg",_parent).each(function(i, element) { $(element)[0].style.borderStyle = "none"; });
	$(".ndn_inlinePlayerthumbimg",_parent).each(function(i, element) { $(element)[0].style.left = "0px"; });
	*/
	var pattern = 'ndn_thumbimg';
	$('.ndn_inlinePlayerthumbimg').each(function(){
		//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
		if ($(this).attr('id').indexOf(pattern) == 0){
			$(this).css('border-width','0px');
			$(this).css('border-color','#900');
			$(this).css('border-style','none');
			$(this).css('left','0px');
			$(this).css('top','-90px');		
		}
	});	
	$(".ndn_inlinePlayerthumbimg",_parent).each(function(i, element) { $(element)[0].style.top = "-90px"; });

	var pattern2 = "ndn_thumbimg"+activeContent;
	$('.ndn_inlinePlayerthumbimg').each(function(){
		//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
		//if ($(this).attr("id").indexOf(pattern2) == 0){
		if ($(this).attr("id") == pattern2){
			$(this).css("border-width","2px");
			$(this).css("border-color","#900");
			$(this).css("border-style","solid");
			if (contentLength <= 4){
				$(this).css("left","-6px");
			}else{
				$(this).css("left","-4px");
			}
			$(this).css("top","-92px");		
		}
	});
	
	document.getElementById("title_text").innerHTML = fitStringToWidth(playlistArr[activePlaylist].Contents[activeContent].Name,200,"title_text",20);
	document.getElementById("provider_text").innerHTML = playlistArr[activePlaylist].Contents[activeContent].ProducerName;
	var pubDate = new Date(parseInt(playlistArr[activePlaylist].Contents[activeContent].PubDate.substr(6)));
	document.getElementById("date_text").innerHTML = pubDate.format("mmm d, yyyy",true);
	document.getElementById("prov_logo").src = playlistArr[activePlaylist].Contents[activeContent].ProducerLogo;
	
}

setVideoInfo = function(listIndex,amt){
	traceMsg("autoPlay = " + autoPlay + " & bumperPlayed = " + bumperPlayed + " & isMobile = " + isMobile);
	if (autoPlay == false && bumperPlayed == false && isMobile != true){
		thisMovie("flashcontent").changeImage(amt);
	}else{
		
	}
	if ((autoPlay == false && thumbClicked == false)||(autoPlay == true && isMobile == true)){
		traceMsg("in setVideoInfo");
		if(amt == "plus"){
			screenNum++;
		}else{
			screenNum--;
		}
		curVidInfo = listIndex; 
		if (curVidInfo >= contentLength){
			curVidInfo = curVidInfo - contentLength;
		}
		if (curVidInfo < 0){
			curVidInfo = contentLength + curVidInfo;
		}
		if(thumbClicked == false){
			if (isMobile == true){
				vid = $('#ndn_video').get(0);
				vid.src = getAsset(activePlaylist,curVidInfo,"src");
				vid.load();
				vid.poster = getAsset(activePlaylist,curVidInfo,"stillFrame");
			}else if (amt != null){
				//thisMovie("flashcontent").changeImage(amt);
			}
			/*
			$(".ndn_thumbimg",_parent).each(function(i, element) { $(element)[0].style.borderWidth = "0px"; });
			$(".ndn_thumbimg",_parent).each(function(i, element) { $(element)[0].style.borderColor = "#F00"; });
			$(".ndn_thumbimg",_parent).each(function(i, element) { $(element)[0].style.borderStyle = "none"; });
			$(".ndn_thumbimg",_parent).each(function(i, element) { $(element)[0].style.left = "0px"; });
			$(".ndn_thumbimg",_parent).each(function(i, element) { $(element)[0].style.top = "-90px"; });
			*/
			var pattern = 'ndn_thumbimg';
			$('.ndn_inlinePlayerthumbimg').each(function(){
				//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
				if ($(this).attr('id').indexOf(pattern) == 0){
					$(this).css('border-width','0px');
					$(this).css('border-color','#900');
					$(this).css('border-style','none');
					$(this).css('left','0px');
					$(this).css('top','-90px');		
				}
			});	
			
			var pattern2 = "ndn_thumbimg"+curVidInfo;
			$('.ndn_inlinePlayerthumbimg').each(function(){
				//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
				
				//if ($(this).attr("id").indexOf(pattern2) == 0){
				if ($(this).attr("id") == pattern2){
					$(this).css("border-width","2px");
					$(this).css("border-color","#900");
					$(this).css("border-style","solid");
					if (contentLength <= 4){
						$(this).css("left","-6px");
					}else{
						$(this).css("left","-4px");
					}
					$(this).css("top","-92px");		
				}
				
				
			});
					
			document.getElementById("title_text").innerHTML = fitStringToWidth(playlistArr[activePlaylist].Contents[curVidInfo].Name,200,"title_text",20);
			document.getElementById("provider_text").innerHTML = playlistArr[activePlaylist].Contents[curVidInfo].ProducerName;
			var pubDate = new Date(parseInt(playlistArr[activePlaylist].Contents[curVidInfo].PubDate.substr(6)));
			document.getElementById("date_text").innerHTML = pubDate.format("mmm d, yyyy",true);
			document.getElementById("prov_logo").src = playlistArr[activePlaylist].Contents[curVidInfo].ProducerLogo;
			activeContent = curVidInfo;	
		}else if (isMobile == false){
			thisMovie("flashcontent").changeImage(amt);
		}
	}
}

setFirstStill = function(listIndex){
	traceMsg("in setFirstStill");
	//$("#ndn_thumbimg"+listIndex,_parent).each(function(i, element) { $(element)[0].style.borderWidth = "2px"; });
	//$("#ndn_thumbimg"+listIndex,_parent).each(function(i, element) { $(element)[0].style.borderColor = "#990000"; });
	//$("#ndn_thumbimg"+listIndex,_parent).each(function(i, element) { $(element)[0].style.borderStyle = "solid"; });
	var pattern2 = "ndn_thumbimg"+listIndex;
	$('.ndn_inlinePlayerthumbimg').each(function(){
		//alert($(this).attr("id") + "     " + pattern + "     " + $(this).attr("id").indexOf(pattern));
		
		//if ($(this).attr("id").indexOf(pattern2) == 0){
		if ($(this).attr("id") == pattern2){
			$(this).css("border-width","2px");
			$(this).css("border-color","#900");
			$(this).css("border-style","solid");
			if (contentLength <= 4){
				$(this).css("left","-6px");
			}else{
				$(this).css("left","-4px");
			}
			$(this).css("top","-92px");		
		}
		
		
	});
	document.getElementById("title_text").innerHTML = fitStringToWidth(playlistArr[activePlaylist].Contents[listIndex].Name,200,"title_text",20);
	document.getElementById("provider_text").innerHTML = playlistArr[activePlaylist].Contents[listIndex].ProducerName;
	var pubDate = new Date(parseInt(playlistArr[activePlaylist].Contents[listIndex].PubDate.substr(6)));
	document.getElementById("date_text").innerHTML = pubDate.format("mmm d, yyyy",true);
	document.getElementById("prov_logo").src = playlistArr[activePlaylist].Contents[listIndex].ProducerLogo;
	if (isMobile == true){
		traceMsg("isMobile");
		//vid = document.getElementById("ndn_video");
		vid = $('#ndn_video',_parent)[0];
		vid.poster = getAsset(activePlaylist,listIndex,"stillFrame");
		vid.src = getAsset(activePlaylist,listIndex,"src");
		vid.load();
		traceMsg('<img src="'+getAsset(activePlaylist,listIndex,"stillFrame")+'">');
	}	//alert(getAsset(activePlaylist,listIndex,"stillFrame"));
	//thisMovie("flashcontent").sendImgToActionScript(getAsset(activePlaylist,listIndex,"stillFrame"),String(buildPlayArray(0)));
}


//process thumbnail launcher
thumbServices = function (data){
	position = findPos($('#ndn_container',_parent)[0]);
	container = $('#ndn_container',_parent)[0];  //document.getElementById('ndn_container');
	thumbScroller = $('#ndn_thumbScroller',_parent)[0];  //document.getElementById('ndn_thumbScroller');
	thumbScroller2 = $('#ndn_thumbScroller2',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
	thumbScroller3 = $('#ndn_thumbScroller3',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
	thumbScroller4 = $('#ndn_thumbScroller4',_parent)[0];  //document.getElementById('ndn_thumbScroller2');
	thumbControls = $('#ndn_thumbControls',_parent)[0];  //document.getElementById('ndn_thumbControls');
	thumbContainer = $('#ndn_thumbContainer',_parent)[0];  //document.getElementById('ndn_thumbContainer');
	singleThumb = $('#ndn_singleThumb',_parent)[0];  //document.getElementById('ndn_singleThumb');
	selector = $('#ndn_selector',_parent)[0];  //document.getElementById('ndn_selector');
	countdown = $('#ndn_countdown',_parent)[0];
	vid = $('#ndn_video',_parent)[0];
	adChoicesContainer = $('#ndn_adchoice',_parent)[0];
	
	adChoicesContainer.style.visibility = "hidden";
	
	DistributorName = data.DistributorName;
	freewheel = data.TrackingGroup;
	ZoneID = data.ZoneID;
	landingURL = data.LandingURL;
	continuousPlay = data.ContinuousPlay;
	
	for(a=0;a < data.DeliverySettings.length;a++){
		var temp = data.DeliverySettings[a].Name;
		switch(temp){
			case "videoStartTime": 
				if ((data.DeliverySettings[a].Value != null) && (data.DeliverySettings[a].Value != "") && (data.DeliverySettings[a].Value != undefined)){
					videoStartTime = data.DeliverySettings[a].Value;
				}
				break;
			case "videoSegmentLength":
				if ((data.DeliverySettings[a].Value != null) && (data.DeliverySettings[a].Value != "") && (data.DeliverySettings[a].Value != undefined)){
					videoSegmentLength = data.DeliverySettings[a].Value;
				}
				break;
			case "slateAfterVideoHold":
				if ((data.DeliverySettings[a].Value != null) && (data.DeliverySettings[a].Value != "") && (data.DeliverySettings[a].Value != undefined)){
					slateAfterVideoHold = data.DeliverySettings[a].Value;
				}
				break;
			case "fadeDownDuration":
				if ((data.DeliverySettings[a].Value != null) && (data.DeliverySettings[a].Value != "") && (data.DeliverySettings[a].Value != undefined)){
					fadeDownDuration = data.DeliverySettings[a].Value;
				}
				break;
		}
	}
	
	
	if (data.DisableAds == true){
		disableAds = true;
	}else{
		disableAds = false;
	}
	
	if (data.DisableSingleEmbed == true){
		disableShare = true;
	}else{
		disableShare = false;
	}
	
	if (data.DisableSocialNetworking == true){
		disableEmail = true;
	}else{
		disableEmail = false;
	}
	
	if (data.DisableVideoPlayOnLoad == true){
		autoPlay = false;
	}else{
		autoPlay = true;
	}
	
	if (adCalled == false && isMobile != true){
		//setupAutoPlay();
		pageInit();
	}
	
	if(isMobile == true){
		traceMsg("adding listener");
		vid = $('#ndn_video',_parent)[0];
		vid.addEventListener('play', function() {
			//traceMsg("check firstPlay");
			if (firstPlayClicked == false && disableAds == false){
				//alert("here");
				traceMsg("firstPlayClicked F : " + firstPlayClicked);
				firstPlayClicked = true;
				traceMsg("firstPlayClicked T : " + firstPlayClicked);
				vid.pause();
				vid.style.visibility = "visible";
				traceMsg("call load");
				load();
			}
			traceMsg("vid play");
			$(".ndn_thumbContainer").stopTime('autoScroll');	
			autoScroll = false;
			thumbClicked = true;
			isEnded = false;
			//stopTimer();
			vid.style.visibility = 'visible';
		},false);
		vid.addEventListener('pause', function() {
			//videoTitleBar.style.visibility = 'visible';
			//if (isIOS == false){
				//socialButton.style.visibility = 'visible';		
				//emailButton.style.visibility = 'visible';	
			//}
		},false);
		
	
		traceMsg("setListeners");
		/*
		vid.addEventListener('ended', function() {
			traceMsg("ended");
			
			if (adRunning == false){
				isEnded = true;
				traceMsg("continuousPlay = " + continuousPlay);
				if(continuousPlay > 0){
					if(continuousPlayCounter < continuousPlay){
						continuousPlayCounter+=1;
						activeContent = activeContent+1;
						if (activeContent >= contentLength){
							activeContent = 0;
						}
						sendToActionScript(activeContent);
					}else{
						continuousPlayCounter = 0;
						//replayButton.style.visibility = nextVideoButton.style.visibility = 'visible';
					}
				}else{				
					///Show  next replay and still frame
					thumbContainer.style.visibility = 'visible';
					//playOverlayImg.style.visibility = 'hidden';
					//replayButton.style.visibility = nextVideoButton.style.visibility = 'visible';
				}
				
			}else{
				///ad running
				//thumbContainer.style.visibility = 'hidden';
				//thumbControls.style.visibility = 'hidden';
				//thumbScroller.style.visibility = 'hidden';
				//playOverlayImg.style.visibility = 'hidden';
				//thumbTitleBar.style.visibility = 'hidden';
				//socialButton.style.visibility = 'hidden';
				//emailButton.style.visibility = 'hidden';
				//socialWindow.style.visibility = 'hidden';
				//vidContainer.style.visibility = 'visible';
				//replayButton.style.visibility = nextVideoButton.style.visibility = 'hidden';
				//trace("vid.addEventListener: ended adRunning: activePlaylist " + activePlaylist);
				//setProgramName(vidId);
			}
			
		},false);
		*/
		/*
		vid.addEventListener('playing', function(){
			
			traceMsg("vid playing");
			//stopTimer();
			
			if (firstVidCall == true && adRunning == false){
				traceMsg("callComscore");
				//callComscore("video");
				firstVidCall = false;
			}
			
		}, false);
		*/
	
	vid.addEventListener('timeupdate', function() {
		//traceMsg(adRunning);
		if (adRunning == false){
			
			var progress = Math.round(vid.currentTime.toFixed(1) / Math.round(vid.duration) * 100);
			if (progress >= 100 && !progressSent[100]){
				progressSent[100] = true;
				videoView("100");
			}else{
				if (progress > 0 && !progressSent[0]){
					progressSent[0] = true;
					videoView("0");
					if (getDuration(activePlaylist,activeContent,"src") > 299){
						myC5 = "03";
					}else{
						myC5 = "02";
					}
					callComscore();
				}else if (progress > 25 && !progressSent[25]){
					progressSent[25] = true;
					videoView("25");
				}else if (progress > 50 && !progressSent[50]){
					progressSent[50] = true;
					videoView("50");
					//trace("vid. EventListener: timeupdate 50 " + progress );
				}else if (progress > 75 && !progressSent[75]){
					progressSent[75] = true;
					videoView("75");
				}
			}
		}/*else{
			
			traceMsg("adRunning = " + adRunning);
			traceMsg(getDuration(activePlaylist,activeContent,"src"));
			traceMsg(vid.currentTime.toFixed(1));
			/// Show progress
			var timeLeft = Math.round(getDuration(activePlaylist,activeContent,"src") - vid.currentTime.toFixed(1));
			if (String(timeLeft) == "NaN"){
				theMessage = '';
			}else{
				theMessage = '<BR>Your selected content will begin in ' + timeLeft + " seconds.";
			}
			//countDownText.innerHTML = theMessage;
			traceMsg("theMessage = " + theMessage);
			updateCountdown(theMessage);
			
		//}*/
	},false);	

		///END mobile only buildplayer
	
	}
	
	//alert(data.SiteSectionName);
	if (sitesection == "0"){
		sitesection = data.SiteSectionName;
	}
	
	if (wid == "0"){
		wid = data.LauncherID;
	}
	if (cid != 0){
		for(c=0;c<data.Playlists.length;c++){
			if (data.Playlists[c].playlistid == cid){
				activePlaylist = c;
				break;
			}
		}
	}
	if (activePlaylist == 0){
		activePlaylist = 1;
	}
	
	playlistArr[activePlaylist] = data.Playlists[activePlaylist];
	playlistArr[activePlaylist].PlaylistOrder = data.Playlists[activePlaylist].PlaylistOrder;
	playlistArr[activePlaylist].Title = data.Playlists[activePlaylist].Title;
	playlistArr[activePlaylist].playlistid = data.Playlists[activePlaylist].playlistid;
	//playlistArr[activePlaylist].Contents = data.Playlists[activePlaylist].Contents;
	playlistArr[activePlaylist].Contents = data.Playlists[activePlaylist].Contents;


	cid = playlistArr[activePlaylist].playlistid;
	contentLength = playlistArr[activePlaylist].Contents.length;
	
	if (contentLength > 12){
		playlistArr[activePlaylist].Contents = playlistArr[activePlaylist].Contents.slice(0,12);
		contentLength = 12;
	}
	controlsContent = "<div class='ndn_"+thumbId+"Scroll'><a id='ndn_scrollLeftLink' onmousedown=\"scrollDivUp('ndn_thumbScroller',false)\"><img id='ndn_scrollLeft' style='margin-left:3px;visibility:hidden;' border='0' src='"+imageURL+"arrowLeft.png'></a><a  id='ndn_scrollRightLink' onmousedown=\"scrollDivDown('ndn_thumbScroller',false)\" ><img id='ndn_scrollRight' border='0' src='"+imageURL+"arrowRight.png' style=display:inline;left:265px;'></a></div>";
	thumbControls.innerHTML = controlsContent;
	setThumbStyle(thumbId);
	for (l=0;l<contentLength;l++){
		vidIdArr[l] = playlistArr[activePlaylist].Contents[l].ContentID;
		durationArr[l] = getDuration(activePlaylist,l,"src");
		stillFrameArr[l] = getAsset(activePlaylist,l,"stillFrame");
	}
	htmlInit = true;
	sendArraysToFlash();
	buildPlaylist();
}

sendArraysToFlash = function(){
	if (flashInit == true && arraysSent == false){
		traceMsg(disableAds);
		thisMovie("flashcontent").sendArraysToActionScript(String(vidIdArr),String(durationArr),String(stillFrameArr),ZoneID,freewheel,sitesection,cid,wid,landingURL,continuousPlay,autoPlay,videoStartTime,videoSegmentLength,slateAfterVideoHold,fadeDownDuration,disableAds,disableShare,disableEmail);
		arraysSent = true;
	}
	if (isMobile == true){
		//document.getElementById("flashcontent").innerHTML = "<video id='ndn_video' src='"+getAsset(activePlaylist,0,"src")+"' controls='controls' width='300' height='169' poster='"+getAsset(activePlaylist,0,"stillFrame")+"'></video>";
		
		document.getElementById('ndn_video').src = getAsset(activePlaylist,0,"src");
		document.getElementById('ndn_video').load();
		document.getElementById('ndn_video').poster = getAsset(activePlaylist,0,"stillFrame");
		//traceMsg("call load");
		//setupAutoPlay();
		//load();
	}
}

sortNumber = function (a,b)
{
return b - a;
}

buildPlaylist = function (){
	if (ieVer == 7){
		//alert("here");
		$('div[id=trace]').hide().empty().remove();
	}
	/*
	if (isMobile == true){
		document.getElementById("flashcontent").innerHTML = "<video id='ndn_video' src='"+getAsset(activePlaylist,0,"src")+"' controls='controls' width='300' height='169' poster='"+getAsset(activePlaylist,0,"stillFrame")+"'></video>";
	}
	*/
	lastThumb = contentLength;
	//alert("contentLength " + contentLength);
	if (lastThumb > 12){
		lastThumb = 12;
	}
//	if (thumbId == "plist" && isRepeating == false && (lastThumb == 5 || lastThumb == 7 || lastThumb == 9 || lastThumb == 11)){
	if (isRepeating == false && lastThumb > 4){
		repeat = true;
		isRepeating = true;
	}
	thumbContent = "<div id='ndn_thumbs'>";
	thumbContent2 = "<div id='ndn_thumbs'>";
	
	var thumbCount = 0;
	var plistThumbCount = 0;
	plistNum = 0;
	var thumbAdNum = 0;
	lastThumbNum = 0;
	var thisThumbNum = 0;
	if (repeat == true){
		lastThumbNum = lastThumb * 4;
	}else{
		lastThumbNum = lastThumb;
	}
	for (k=0;k<lastThumbNum;k++){
		if (thumbCount < 2){
			thumbContent = thumbContent + "<div class='ndn_"+thumbId+"thumb' id='ndn_thumb"+thisThumbNum+"'><a onclick=sendToActionScript('"+thisThumbNum+"')>";
			//thumbContent = thumbContent + "<div class='ndn_"+thumbId+"thumb' id='ndn_thumb"+thisThumbNum+"'><a onclick=sendToActionScript('"+buildPlayArray(thisThumbNum)+"',"+thisThumbNum+")>";
			//thumbContent = thumbContent + "<img class='ndn_"+thumbId+"hoverimage' border='0' src='"+imageURL+"playArrow.png'>";
			thumbContent = thumbContent + "<img class='ndn_"+thumbId+"hoverimage' border='0' src='"+imageURL+"playArrow.png'>";
				//alert(fitStringToWidth(playlistArr[activePlaylist].Contents[k].Name,140,thumbId+"hovertext"));
			thumbContent = thumbContent + "<div class='ndn_"+thumbId+"hovertext'>" + fitStringToWidth(playlistArr[activePlaylist].Contents[thisThumbNum].Name,230,thumbId+"hovertext",36) + "</div>";
			thumbContent = thumbContent + "<img class='ndn_"+thumbId+"thumbimg' id='ndn_thumbimg"+thisThumbNum+"' border='0' src='"+ getAsset(activePlaylist,thisThumbNum,"thumbnail")+"'>";
			thumbContent = thumbContent + "</a></div>";	
			plistNum++;
		}else{
			if (isLanding == true){
				thumbContent2 = thumbContent2 + "<div class='ndn_"+thumbId+"thumb' id='ndn_thumb"+k+"'><a onclick=sendToActionScript('"+thisThumbNum+"')>";
			}else{
				thumbContent2 = thumbContent2 + "<div class='ndn_"+thumbId+"thumb' id='ndn_thumb"+k+"'><a onclick=sendToActionScript('"+thisThumbNum+"')>";
			}
			//thumbContent2 = thumbContent2 + "<img class='ndn_"+thumbId+"hoverimage' border='0' src='"+imageURL+"playArrow.png'>";
			thumbContent2 = thumbContent2 + "<img class='ndn_"+thumbId+"hoverimage' border='0' src='"+imageURL+"playArrow.png'>";
			thumbContent2 = thumbContent2 + "<div class='ndn_"+thumbId+"hovertext'>" + fitStringToWidth(playlistArr[activePlaylist].Contents[thisThumbNum].Name,230,thumbId+"hovertext",36) + "</div>";
			thumbContent2 = thumbContent2 + "<img class='ndn_"+thumbId+"thumbimg' id='ndn_thumbimg"+thisThumbNum+"' border='0' src='"+ getAsset(activePlaylist,thisThumbNum,"thumbnail")+"'>";
			
			thumbContent2 = thumbContent2 + "</a></div>";	
		}
		thumbCount++;
		plistThumbCount++;
		if (plistThumbCount < lastThumb){
			thisThumbNum++;
		}else{
			plistThumbCount = 0;
			thisThumbNum = 0;
		}
		if(thumbCount == 4){
			thumbCount = 0;
		}
	}
	thumbContent = thumbContent + "</div>";
	thumbScroller.innerHTML = thumbContent;
	//$(".ndn_thumbContainer").scrollTo({top:String(position[1])+'px', left:String(position[0])+'px'},0,{duration:0});
	thumbControls.style.top = "-175px";
	thumbScroller2.innerHTML = thumbContent2;
	if (lastThumb > 4){
		thumbScroller3.innerHTML = thumbContent;
		thumbScroller4.innerHTML = thumbContent2;
		var scrollerWidth = 127.5*lastThumbNum/2;
	}else{
		var scrollerWidth = 127.5*Math.ceil(lastThumbNum/2);
	}
	thumbScroller.style.width = String(scrollerWidth)+"px";
	thumbScroller2.style.width = String(scrollerWidth)+"px";
	thumbScroller3.style.width = String(scrollerWidth)+"px";
	thumbScroller4.style.width = String(scrollerWidth)+"px";
	
	thumbScroller2.style.top = "-20px";
	thumbScroller3.style.left = String(scrollerWidth-lastThumb)+"px";
	thumbScroller4.style.left = String(scrollerWidth-lastThumb)+"px";
	if (isIE == true){
		thumbScroller3.style.top = "-280px";
		thumbScroller4.style.top = "-290px";
	}else{
		thumbScroller3.style.top = "-280px";
		thumbScroller4.style.top = "-290px";
	}
	$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "hidden";
	$('#ndn_scrollLeft',_parent)[0].style.visibility = "hidden";
	thumbContainer.style.top = "0px";
	thumbContainer.style.zIndex = "0";
	$(".ndn_inlinePlayerthumb",_parent).each(function(i, element) { $(element)[0].style.float = "left"; });
	setFirstStill(0);
	if (isMobile == true){
		sendToAutoScroll();
		thumbContainer.style.top = "-10px";
	}
	if(lastThumb <= 4){
		thumbControls.style.visibility = "hidden";
	}
}

videoView = function (sendData){
	traceMsg("videoView = " + sendData);
	/*
	////trace("videoView  2: " +sendData);
	////trace("videoView  vid.currentTime: " +vid.currentTime);
	uut = SetAnalyticsCookie();
	//trace("videoView  uut: " +uut);
	$.post("http://ps2.newsinc.com//players/report.xml", { sitesection:sitesection,
				event: "progprogres",
				 freewheel:freewheel,
				 uniqueUserId: uut,
				 videoId: AudVideoId,
				 playlistId: activePlaylist,
				 percentPlayed: sendData ,
				 timePlayed: vid.currentTime
				 
				 },
		function(data) {
			//trace(">>>>>>>>Data Loaded: " + data);
   		});
	*/
	var urlVars = new Object();
	urlVars.event = "progprogress";
	urlVars.uniqueUserId = GAC;
	urlVars.videoId = playlistArr[activePlaylist].Contents[activeContent].ContentID;
	urlVars.percentPlayed = sendData;
	urlVars.timePlayed = Math.floor(vid.currentTime);
	urlVars.playlistId = playlistArr[activePlaylist].playlistid;
	urlVars.freewheel = freewheel;
	urlVars.sitesection = sitesection;
	$.post("http://ps2.newsinc.com//players/report.xml", { sitesection:sitesection,
				event: "progprogres",
				 freewheel:freewheel,
				 uniqueUserId: GAC,
				 videoId: playlistArr[activePlaylist].Contents[activeContent].ContentID,
				 playlistId: playlistArr[activePlaylist].playlistid,
				 percentPlayed: sendData ,
				 timePlayed: Math.floor(vid.currentTime)
				 },
		function() {
			//traceMsg(">>>>>>>>Data Loaded: " + urlVars.event);
   		});
	rdm = String(Math.floor(Math.random()*1000000000));
	GAC = GetAnalyticsUserToken();
	if (GAC == null){
		GAC = SetAnalyticsCookie();
	}
	analyticsString = String("http://sana.newsinc.com/sana.html?wid="+wid+"&uut="+GAC+"&furl="+furl+"&purl=&ssid="+sitesection+"&anid="+freewheel+"&ptype=8&plid="+cid+"&device="+did+"&eventid=1&eventvalue="+sendData+"&rdm="+rdm);
	loadPage('swfviewFRM', null,analyticsString);
}

function replayVideo(){
	//trace("replay video");
	replayButton.style.visibility = nextVideoButton.style.visibility = 'hidden';
	var videoId = playlistArr[activePlaylist].Contents[activeContent].ContentID;
	//currentSelectedThumb
	sendToActionScript(videoId);
	//loadVid(videoId, currentSelectedThumb);
}

function playNextVideo(){
	////trace("playNextVideo");
	////trace("!! playNextVideo activePlaylist : " + activePlaylist);
	replayButton.style.visibility = nextVideoButton.style.visibility = 'hidden';
	activeContent = activeContent+1;
	if (activeContent > contentLength){
		activeContent = 0;
	}
	videoId = playlistArr[activePlaylist].Contents[activeContent].ContentID;
	setNextVideo(videoId);
	sendToActionScript(videoId);
}


setThumbStyle = function (thumbId){
	switch (thumbId)
	{
	case "inlinePlayer":
		thumbWidth = 120;
		thumbHeight = 90;
		container.style.width = "298px";
		container.style.height = "494px";
		container.style.backgroundColor = "#FFF";
		thumbScroller.style.height = "135px";
		thumbScroller.style.top = "-10px";
		thumbScroller.style.display = "inline-block";
		thumbScroller.style.overflow = "hidden";
		thumbScroller.style.float = "left";
		thumbScroller.style.zIndex = "1";
		thumbScroller2.style.height = "135px";
		thumbScroller2.style.top = "-20px";
		thumbScroller2.style.display = "inline-block";
		thumbScroller2.style.overflow = "hidden";
		thumbScroller2.style.float = "left";
		thumbScroller2.style.zIndex = "0";
		thumbScroller3.style.height = "135px";
		thumbScroller3.style.top = "0px";
		thumbScroller3.style.display = "inline-block";
		thumbScroller3.style.overflow = "hidden";
		thumbScroller3.style.float = "left";
		thumbScroller3.style.zIndex = "2";
		thumbScroller4.style.height = "135px";
		thumbScroller4.style.top = "0px";
		thumbScroller4.style.display = "inline-block";
		thumbScroller4.style.backgroundColor = "#FFF";
		thumbScroller4.style.overflow = "hidden";
		thumbScroller4.style.float = "left";
		thumbScroller4.style.zIndex = "1";
		thumbContainer.style.height = "275px";
		thumbContainer.style.width = "253px";	
		thumbContainer.style.position = "relative";
		thumbContainer.style.textAlign = "left";
		thumbContainer.style.top = "0px";
		thumbControls.style.top = "-175px";
		thumbControls.style.display = "inline";
		thumbScroller2.style.backgroundColor = "#FFF";
		if (ieVer == 7){
			document.getElementById('prov_logo').style.marginTop = "-25px";
		}else{
			document.getElementById('prov_logo').style.marginTop = "-15px";
		}
		break;
	}
}


getAsset = function (playlistNum,contentNum,assetType){
	for(m=0;m<playlistArr[playlistNum].Contents[contentNum].Assets.length;m++){
		if (playlistArr[playlistNum].Contents[contentNum].Assets[m].AssetType == assetType){
			var url = playlistArr[playlistNum].Contents[contentNum].Assets[m].AssetLocation.replace(/\\/gi,'/');
			return(	url);
		}
	}
}

getDuration = function (playlistNum,contentNum,assetType){
	for(m=0;m<playlistArr[playlistNum].Contents[contentNum].Assets.length;m++){
		if (playlistArr[playlistNum].Contents[contentNum].Assets[m].AssetType == assetType){
			var dur = playlistArr[playlistNum].Contents[contentNum].Assets[m].Duration;
			return(	dur);
		}
	}
}

var deviceAgent = navigator.userAgent.toLowerCase();
timerDown="";  
timerUp="";  

stopMe = function (){ 
clearTimeout(timerDown)  
clearTimeout(timerUp) 
} 

document.onmousemove=function(){stopMe()}  

sendToAutoScroll = function(){
	autoScrollStart();
	thumbClicked = false;
	autoScroll = true;
}

autoScrollStart = function (){
	//$(".ndn_thumbScroller").stopTime('autoScroll');	
	if(lastThumb > 4){
		$(".ndn_thumbContainer").everyTime(8000, 'autoScroll', function() {
			scrollDivDown("ndn_thumbScroller",true);														
		});
	}
}

scrollDivDown = function (id,auto){
	if (auto == false){
		$(".ndn_thumbContainer").stopTime('autoScroll');	
		autoScroll = false;
	}
		//thisMovie("flashcontent").changeImage("plus");
		//if (thumbClicked == false){
			//setVideoInfo(curVidInfo+4,"plus");
		//}
	if (inScroll == false){
		$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "visible";
		$('#ndn_scrollLeft',_parent)[0].style.visibility = "visible";
		scrollCount++;
		if (scrollCount == lastThumbNum/4 && isAndroid == false){
			scrollCount = 0;
			var scrollerWidth = 127.5*lastThumbNum/2;
			if (activeList == "ndn_thumbScroller"){
				activeList = "ndn_thumbScroller3";
				$('#ndn_thumbScroller3',_parent)[0].style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				$('#ndn_thumbScroller4',_parent)[0].style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				var tempZ = thumbScroller.style.zIndex;
				var tempZnum = Number(tempZ);
				tempZ = String(tempZnum + 1);
				thumbScroller3.style.zIndex = tempZ;
				tempZ = thumbScroller2.style.zIndex;
				tempZnum = Number(tempZ);
				tempZ = String(tempZnum + 1);thumbScroller4.style.zIndex = tempZ;
				//thumbScroller3.style.width = "0px";
				//thumbScroller3.style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				//thumbScroller4.style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
			}else{
				activeList = "ndn_thumbScroller";
				$('#ndn_thumbScroller',_parent)[0].style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				$('#ndn_thumbScroller2',_parent)[0].style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				var tempZ = thumbScroller3.style.zIndex;
				var tempZnum = Number(tempZ);
				tempZ = String(tempZnum + 1);
				thumbScroller.style.zIndex = tempZ;
				tempZ = thumbScroller4.style.zIndex;
				tempZnum = Number(tempZ);
				tempZ = String(tempZnum + 1);
				thumbScroller2.style.zIndex = tempZ;
				//thumbScroller.style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
				//thumbScroller2.style.left = String(loopCount*(scrollerWidth - lastThumb))+"px";
			}
			loopCount++;
		}
		if (scrollCount+1 >= lastThumbNum/4 && isAndroid == true && autoScroll == true){
			$(".ndn_thumbContainer").stopTime('autoScroll');	
			$(".ndn_thumbContainer").everyTime(8000, 'autoScroll', function() {
				scrollDivUp("ndn_thumbScroller",true);														
			});
		}else{
			if (scrollCount+1 >= lastThumbNum/4 && isAndroid == true){
				//scrollCount--;
				$('#ndn_scrollRightLink',_parent)[0].style.visibility = "hidden";
				$('#ndn_scrollRight',_parent)[0].style.visibility = "hidden";			
			}
			inScroll = true;
			$(".ndn_thumbContainer",_parent).scrollTo({top:'0px', left:'+=254px'},0,{duration:1000,onAfter:function(){setVideoInfo(curVidInfo+4,"plus");inScroll=false;}});
		}
	}
		//$(".ndn_thumbContainer",_parent).scrollTo({top:'0px', left:'+=254px'},0,{duration:1000});
		//$(".ndn_thumbContainer",_parent).scrollTo({top:String(position[1])+'px', left:'+=254px'},0,{duration:1000});
}

scrollDivUp = function (id,auto){ 
	if (auto == false){
		$(".ndn_thumbContainer").stopTime('autoScroll');		
		autoScroll = false;
	}
	//if (thumbClicked == false){
		//setVideoInfo(curVidInfo-4,"minus");
	//}
	if (inScroll == false){
		$('#ndn_scrollRightLink',_parent)[0].style.visibility = "visible";
		$('#ndn_scrollRight',_parent)[0].style.visibility = "visible";			
		if (scrollCount == 0){
			scrollCount = lastThumbNum/4;
			var scrollerWidth = 127.5*lastThumbNum/2;
			if (activeList == "ndn_thumbScroller"){
				activeList = "ndn_thumbScroller3";
				thumbScroller3.style.left = String((loopCount-2)*(scrollerWidth - lastThumb))+"px";
				thumbScroller4.style.left = String((loopCount-2)*(scrollerWidth - lastThumb))+"px";
			}else{
				activeList = "ndn_thumbScroller";
				thumbScroller.style.left = String((loopCount-2)*(scrollerWidth - lastThumb))+"px";
				thumbScroller2.style.left = String((loopCount-2)*(scrollerWidth - lastThumb))+"px";
			}
			loopCount--;
		}
		scrollCount--;
		if (scrollCount == 0 && loopCount == 1){
			$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "hidden";
			$('#ndn_scrollLeft',_parent)[0].style.visibility = "hidden";
		}else{
			$('#ndn_scrollLeftLink',_parent)[0].style.visibility = "visible";
			$('#ndn_scrollLeft',_parent)[0].style.visibility = "visible";
		}
		//$(".ndn_thumbContainer",_parent).scrollTo({top:String(position[1])+'px', left:'-=254px'},0,{duration:1000});	
		if (scrollCount <= 0 && isAndroid == true && autoScroll == true){
			$(".ndn_thumbContainer").stopTime('autoScroll');	
			$(".ndn_thumbContainer").everyTime(8000, 'autoScroll', function() {
				scrollDivDown("ndn_thumbScroller",true);														
			});
		}else{
			inScroll = true;
			$(".ndn_thumbContainer",_parent).scrollTo({top:'0px', left:'-=254px'},0,{duration:1000,onAfter:function(){setVideoInfo(curVidInfo-4,"minus");inScroll = false;}});
		}
	}
} 

fitStringToWidth = function (str,width,className,height) {
  function _escTag(s){ return s.replace("<","&lt;").replace(">","&gt;");}

  //Create a span element that will be used to get the width
  var span = document.createElement("span");
  //Allow a classname to be set to get the right font-size.
  if (className) span.className=className;
  span.style.display='inline';
  span.style.visibility = 'hidden';
  span.style.padding = '0px';
  document.body.appendChild(span);

  var result = _escTag(str); // default to the whole string
  //var result = str; // default to the whole string
  span.innerHTML = result;
  // Check if the string will fit in the allowed width. NOTE: if the width
  // can't be determinated (offsetWidth==0) the whole string will be returned.
  //alert(span.offsetWidth + "     " + span.offsetHeight + "     " + width + "     " + result);
  if (span.offsetWidth > width || span.offsetHeight > height) {
    var posStart = 0, posMid, posEnd = str.length, posLength;
    // Calculate (posEnd - posStart) integer division by 2 and
    // assign it to posLength. Repeat until posLength is zero.
    while (posLength = (posEnd - posStart) >> 1) {
      posMid = posStart + posLength;
      //Get the string from the begining up to posMid;
      span.innerHTML = _escTag(str.substring(0,posMid)) + '&hellip;';

      // Check if the current width is too wide (set new end)
      // or too narrow (set new start)
	  
      if ( span.offsetWidth > width ) posEnd = posMid; else posStart=posMid;
    }

    result = '<abbr title="' +
      str.replace("\"","&quot;") + '">' +
      _escTag(str.substring(0,posStart)) +
      '&hellip;<\/abbr>';
  }
  document.body.removeChild(span);
  return result; }

loadThumbs = function (){
	firstLoad = false;
	var lotame = "";
	var div = document.createElement("div");
	div.src = 'http://ad.crwdcntrl.net/5/to=y/p=3046';
	 document.body.appendChild(div);
	//production
	$.GetDataFromURL('http://LT.ndnps.newsinc.com/player/show/'+freewheel+'/'+wid+'/'+cid+'/0/'+did, thumbServices);
	//dev
	//$.GetDataFromURL('http://dev.mps.newsinc.com/player/show/'+freewheel+'/'+wid+'/'+cid+'/0/'+did, thumbServices);
	rdm = String(Math.floor(Math.random()*1000000000));
	GAC = GetAnalyticsUserToken();
	if (GAC == null){
		GAC = SetAnalyticsCookie();
	}
	analyticsString = String("http://sana.newsinc.com/sana.html?wid="+wid+"&uut="+GAC+"&furl="+furl+"&purl=&ssid="+sitesection+"&anid="+freewheel+"&ptype=8&plid="+cid+"&device="+did+"&rdm="+rdm);
	loadPage('swfviewFRM', null,analyticsString);
}

//Browser Detection
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "iPod",
			identity: "iPod"
		},
		{
			string: navigator.platform,
			subString: "iPhone",
			identity: "iPhone"
		},
		{
			string: navigator.platform,
			subString: "iPad",
			identity: "iPad"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		}
	]

};
BrowserDetect.init();

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

// used in SWF view call

loadPage = function (id, nestref, url) {
	if ($('#' + id).length > 0) {
		$('#' + id).remove();
	}
	var frame = document.createElement("iframe");
	frame.id = id;
	frame.src = url;
	frame.height = 0;
	frame.width = 0;
	document.getElementsByTagName('body')[0].appendChild(frame);
}

adComscore = function (value){
		myC5 = value;
		callComscore();
	}


document.write(unescape("%3Cscript src='" +
(document.location.protocol == "https:" ? "https://sb" : "http://b") +
".scorecardresearch.com/beacon.js' %3E%3C/script%3E"));
var myC5 = "09";
function callComscore(){
	COMSCORE.beacon({
	c1:1,
	c2: "11112732",
	c3: DistributorName,
	c4: playlistArr[activePlaylist].Contents[activeContent].ProducerName,
	c5: myC5,
	c6: playlistArr[activePlaylist].Contents[activeContent].ProducerCategory,
	c10: ""
	});
}

function sendReport(percent,playbackSec){
	var urlVars = new Object();
	urlVars.event = "progprogress";
	urlVars.uniqueUserId = GAC;
	urlVars.videoId = playlistArr[activePlaylist].Contents[activeContent].ContentID;
	urlVars.percentPlayed = percent;
	urlVars.timePlayed =  playbackSec;
	urlVars.playlistId = playlistArr[activePlaylist].playlistid;
	urlVars.freewheel = freewheel;
	urlVars.sitesection = sitesection;
	$.post("http://ps2.newsinc.com//players/report.xml", { sitesection:sitesection,
				event: "progprogres",
				 freewheel:freewheel,
				 uniqueUserId: GAC,
				 videoId: playlistArr[activePlaylist].Contents[activeContent].ContentID,
				 playlistId: playlistArr[activePlaylist].playlistid,
				 percentPlayed: percent ,
				 timePlayed: playbackSec
				 },
		function() {
			//traceMsg(">>>>>>>>Data Loaded: " + urlVars.event);
   		});
	if (isMobile == true){
		rdm = String(Math.floor(Math.random()*1000000000));
		GAC = GetAnalyticsUserToken();
		if (GAC == null){
			GAC = SetAnalyticsCookie();
		}
		analyticsString = String("http://sana.newsinc.com/sana.html?wid="+wid+"&uut="+GAC+"&furl="+furl+"&purl=&ssid="+sitesection+"&anid="+freewheel+"&ptype=8&plid="+cid+"&device="+did+"&eventid=1&eventvalue="+percent+"&rdm="+rdm);
		loadPage('swfviewFRM', null,analyticsString);
	}
}