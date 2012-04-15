var baseSiteURL = 'http://www.oxygen.com';
if (typeof(Sys) == "undefined")
{
//	alert(window.location.pathname + " says: Registering BrowserUtil.js because my developer forgot to.");
	document.writeln("<scr" + "ipt src=\"/js/BrowserUtil.js\" type=\"text/javascript\"></script>");
}

function forceContainerPage(containerUrl)
{
	if (top.location == this.location) top.location.href = containerUrl;
}
/*************************** BEGIN Extend Array Object **************************/
Array.prototype.indexOf = function(searchElement, fromIndex)
{
	var startingIndex = (fromIndex) ? fromIndex : 0;
	for(var i = startingIndex; i < this.length; i++)
	{
		if(this[i] == searchElement) return i;
	}
	return -1;
}
/*************************** END Extend Array Object **************************/

function exitTracker(UrlString, replaceCurrentWindowContent)
{
	var redirUrl = "/common/redir.aspx?d=";
	//open in current window
	if(replaceCurrentWindowContent) document.location = redirUrl + escape(UrlString);
	//open in new window
	else launchPopup({url:redirUrl + escape(UrlString), name:'exitTracker', features:'top=40,left=40,height=500,width=700,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes'});
	
	if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
		event.returnValue = false;
	
	return false;
}

/*************************** BEGIN launchPopup.js **************************
author: Keith J. Frank
		Senior Developer
		Oxygen Media
		12/05/03
TO LAUNCH FROM "ONCLICK" USE:
	onclick="launchPopup({url:'urlString', name:'nameString', features:'featuresString'}); return false">
EXAMPLE:
	<a href="" onclick="launchPopup({url:'default.aspx', name:'gallery', features:'top=40,left=40,height=480,width=522,location=no,menubar=no,resizable=no,scrollbars=no,status=yes,toolbar=no'}); return false">launch Watch N' Vote</a><br>

TO lAUNCH FROM "HREF" USE:
	 href="javascript:void(launchPopup({url:'urlString', name:'nameString', features:'featuresString'}))"
EXAMPLE:
	<a href="javascript:void(launchPopup({url:'default.aspx', name:'gallery', features:'top=40,left=40,height=480,width=522,location=no,menubar=no,resizable=no,scrollbars=no,status=yes,toolbar=no'}))">launch Watch N' Vote from href</a><br>
************************************************************************/
PopupManager = new Object();//to refrence Popup Window Object: PopupMamager.nameString + "Window", or PopupMamager.[nameString + "Window"]
function launchPopup(windowArgs, exclusive){//windowArgs{url:"urlString", name:"nameString", features:"featuresString"}, exclusive true or false
	var exclusive = (exclusive) ? exclusive : false;//boolean close old and open new with same name
	var isSafari = navigator.userAgent.indexOf("Safari") != -1;
	var url = windowArgs.url;
	var windowName = windowArgs.name + "Window";
	var featuresString = (windowArgs.features) ? windowArgs.features : "";
	var nameValArray = (featuresString != "") ? featuresString.split(",") : null;
	var features = new Object();
	if(nameValArray)
	{
		for(var i = 0; i < nameValArray.length; i++){
			var tempArray = nameValArray[i].split("=");
			features[tempArray[0]] = tempArray[1];
		}
	
		if(isSafari){
			if(features.status == "yes"){
				features.height = parseInt(features.height) + 15;
			}
			else
			{
				features.height = parseInt(features.height) - 1;
			}	
			features.width = parseInt(features.width) - 2;
		}
		features.toString = function(){
			var newFeatureString = "";
			var prefix = "";
			for(props in features){
				if(props != "toString"){
					newFeatureString += prefix + props + "=" + features[props];
					prefix = ",";
				}
			}
			return newFeatureString;
		}
	}
	
	if(typeof PopupManager[windowName] == "undefined" || (PopupManager[windowName].closed))
	{
		if(exclusive)//if true closes all other windows before opening new window
		{
			for(win in PopupManager)
			{
				if(typeof PopupManager[win])
				{
					if(typeof PopupManager[win].close != "undefined" ) PopupManager[win].close();
				}
			}
		}
		var feat = features.toString();
		PopupManager[windowName] = window.open(url, windowName, features.toString());
	}
	else
	{
		PopupManager[windowName].location = url;//if named window exists and is open this changes the location to the new url before focusing it 
	}
	if(PopupManager[windowName])PopupManager[windowName].focus();
}
/*************************** END launchPopup.js **************************/

/*************************** BEGIN launchPlayer.js **************************

<a href="" onclick="launchPlayer(["isaac/13805_2", "isaac/13805_4","isaac/11805_2"]); return false">watch video</a>

*****************************************************************************/
function launchPlayer(clipArray)
{
	this.top.playlist = clipArray;
	//this.playlist = clipArray;
	// now child window(video pop up) can access this array using "opener.playlist"
	try
	{
		launchPopup({url:"/video/default.aspx", name:"player", features:"top=40,left=40,height=377,width=352,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"});
	}
	catch(e){
		alert("requires launchPopup.js");
	}
}
/*************************** END launchPlayer.js **************************/

/*************************** BEGIN E-mail functions **************************/
function launchEmailPage(urlString)//urlString must not include "http://" if sending "http://www.oxygen.com/specials/" urlString will be "specials/"
{
	try
	{
		launchPopup({url:"/Common/Email/Default.aspx?url=" + escape(urlString), name:"email", features:"top=40,left=40,height=377,width=352,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"});
		
		if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
			event.returnValue = false;
		
		return false;
	}
	catch(e){
		alert("requires launchPopup.js");
	}
}

function launchEmailVideo()
{

	urlString = "video/fullpage.aspx?clip=" + fr_StoryID;  //requests fr_StoryID from oneclip.js
	try
	{
		launchPopup({url:"/Common/Email/Default.aspx?url=" + escape(urlString), name:"email", features:"top=60,left=60,height=377,width=352,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"});
		
		if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
			event.returnValue = false;
		
		return false;
	}
	catch(e){
		alert("requires launchPopup.js");
	}
	
	if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
		event.returnValue = false;
			
	return false;
}
/*
function launchEmailVideo(playlistArray)
{
	urlString = "video/fullpage.aspx?" + playlistToClipString(playlistArray);
	try
	{
		launchPopup({url:"/Common/Email/Default.aspx?url=" + escape(urlString), name:"email", features:"top=60,left=60,height=377,width=352,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"});
		return false;
	}
	catch(e){
		alert("requires launchPopup.js");
	}
}

function playlistToClipString(playlistArray)
{
	var clipString = "";
	var prefix = "";
	for(var clipIndex=0; clipIndex < playlistArray.length; clipIndex++)
	{
		if(clipIndex > 0)prefix = "&"; 
		clipString += prefix + "clip=" + playlistArray[clipIndex];
	}
	return clipString;
}*/
/*************************** END Email functions **************************/

/*************************** BEGIN Screening Room functions *************************/

function launchEmailScreeningRoomVideo(videoObject)
{
	var trailerString = (videoObject.trailer) ? "&clip=" + videoObject.trailer.filePath + "/" + videoObject.trailer.fileName: "";
	var urlString = "video/fullpage.aspx?clip=" + videoObject.filePath + "/" + videoObject.fileName + trailerString;
	try
	{
		launchPopup({url:"/Common/Email/Default.aspx?url=" + escape(urlString), name:"email", features:"top=60,left=60,height=377,width=352,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no"});
		
		if (Sys.Browser.agent == Sys.Browser.InternetExplorer)
			event.returnValue = false;
		
		return false;
	}
	catch(e){
		alert("requires launchPopup.js");
	}
	
	if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
		event.returnValue = false;
		
	return false;
}

function launchScreeningRoom(criteriaObj, fromOtherDomain)//{fileName:"NYT00101_1", category:"showName[topic]", externalIframe:true} 
{
	//add queryString so screening room can be called from other domains 
	var queryString = "";
	var domain = (fromOtherDomain) ? "http://www.oxygen.com" : "";
	for(props in criteriaObj)
	{
		queryString += "&" + props + "=" + criteriaObj[props];
	}
	var url = domain + "/video/ScreeningRoom.aspx?" + queryString;
	//if(criteriaObj.externalIframe) window.criteriaObj = criteriaObj;
	//else window.top.criteriaObj = criteriaObj;//allows access by Screening Room using "opener.top.criteriaObj"
	try
	{
		launchPopup({url:url, name:"player", features:"top=40,left=40,height=577,width=600,location=no,menubar=no,resizable=no,scrollbars=no,status=yes,toolbar=no"});
	}
	catch(e){
		alert("Please temporarily allow pop-ups to see video.");
	}
	
	if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
		event.returnValue = false;
		
	return false;
}
/******************************* END Screening Room functions***************************/

/*FeedRoom Library Player *************/
	function launchFeedRoomLibrary(storyID)
	{			
		var url = "http://oxygen.feedroom.com/?fr_story=" + storyID;
		launchPopup({url:url, name:"feedRoomLibrary", features:"top=0,left=0,height=820,width=855,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes"});
		
		if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
			event.returnValue = false;
			
		return false;
	}
	
/*FeedRoom Library Player - Channel Edition *************/
	function launchFeedRoomLibraryChannel(channelID)
	{	
		try
		{
			var url = "http://oxygen.feedroom.com/?fr_chl=" + channelID;
			launchPopup({url:url, name:"feedRoomLibrary", features:"top=0,left=0,height=820,width=855,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes"});
			
			if (Sys.Browser.agent == Sys.Browser.InternetExplorer && event != null)
				event.returnValue = false;
				
			return false;
		}
		catch(e){
			alert("requires launchPopup.js");
		}		
	}
	
/*FeedRoom OneClip player in a popup***********/
function launchOneClipPopUp(storyID)
{
	try
	{
		var targetClipURL = "/video/popup.aspx?clip=" + storyID;
		launchPopup({url:targetClipURL, name:"oneClipPopUp", features:"top=40,left=40,height=290,width=340,location=no,menubar=no,resizable=no,scrollbars=no,status=yes,toolbar=no"});
		
		if (Sys.Browser.agent == Sys.Browser.InternetExplorer)
			event.returnValue = false;
			
		return false;
	}
	catch(e){
		alert("requires launchPopup.js");
	}
}

/*Homepage Promo One random rotate ***********/
function getElementsByClassName(cssClass, elementTag, parentID )
{
	var targetParent = parentID ? parentID : 'body';
	var targetTags = elementTag ? elementTag : '*';
	var allTags;
	var targetArray = new Array();

	if (targetParent != 'body')
	{
		allTags = document.getElementById(targetParent).getElementsByTagName(targetTags);
	}
	
	else
	{
		allTags = document.getElementsByTagName(targetParent)[0].getElementsByTagName(targetTags);
	}
	
	
	for (i=0; i<allTags.length; i++)
	{
		if (allTags[i].className == cssClass)
		{
			targetArray.push(allTags[i]);
		}
	}
	
	return targetArray;

}

/* Nav selection*/
 function selectButton(parentBlock, buttonIndex, newPosition)
 {
	//example use: selectButton('navBlock', '2', '0px -27px');
	nodes = document.getElementById(parentBlock).getElementsByTagName ('a');
	nodes[buttonIndex].style.backgroundPosition = newPosition;
 
 }
 
 /* Nav selection2*/
 function selectaNav(parentBlock, buttonIndex)
 {
	//example use: selectaNav('navBlock', '2');
	nodes = document.getElementById(parentBlock).getElementsByTagName ('li');
	nodes[buttonIndex].id = 'current';
 
 }

var randDARTNumber=0;
function genSetRandDARTNumber()
{
 randDARTNumber = Math.round(Math.random()*1000000000000);
}
genSetRandDARTNumber();


/* Parse file name */
function parseFileName(str) 
{
	var slash = '/'
	if (str.match(/\\/)) {
		slash = '\\'
	}
	return str.substring(str.lastIndexOf(slash) + 1, str.lastIndexOf('.'));
}

/* Track file downloads and/or promo clicks in Ominture */
function omniTrackCustomLink(fileDescription)
{
	var s=s_gi('nbcunbcuoxygenbu');
	s.tl(this,'o',fileDescription);
//	alert ("sending tags " + fileDescription);
}






function o2PaginateSection()
{
	contentUnit = $(paginationInfo.sourceDiv).html().split(/<hr>/i);
	var pageIndexInURL = $.getURLParam(paginationInfo.pagingUrlParam);
	var GUID = $.getURLParam(paginationInfo.sourceGUID);
	var activePageIndex = (pageIndexInURL > 0 && (pageIndexInURL <= contentUnit.length)) ? (pageIndexInURL -1) : 0;
	
	var postGUID =   (GUID != null) ? ("?guid=" + GUID) :  "";

	//appendString = (postGUID == "") ? "?" : "&" ;
	//appendString = (window.location.search == "") ? "?" : "&";
	
	//Checks if pagaination paramater (e.g. page=3) is first one in URL to assign appropriate appendstring "?" or "&"
	if (window.location.search == "" || (window.location.search.indexOf(paginationInfo.pagingUrlParam) == 1))
	{
		appendString = "?";
	}
	else
	{
		appendString = "&";
	}
	
	
	$.each(contentUnit, function(i,n){
		$(paginationInfo.linksDiv).append(getLinkHTML(i,postGUID));
	});


	if (activePageIndex <= contentUnit.length)
	{
		$(paginationInfo.targetDiv).html(contentUnit[activePageIndex]);
		activePageLink = $(paginationInfo.linksAnchorDiv)[activePageIndex];
		if (paginationInfo.linkColors)
		{
			$(activePageLink).css("color", paginationInfo.linkColors);
		}
		else
		{
			$(activePageLink).css("color", "#ccc");
		}
	}
	else
	{
		$(paginationInfo.targetDiv).html(contentUnit[0]);
	}
	//$(paginationInfo.targetDiv).prepend("<p><b style=\"font-size:12px;\">Page " + (activePageIndex+1) + " of " + contentUnit.length + "</b></p>") ;
}