// JavaScript Document
function showHeaderChat() {
	var rightNow = new Date();
	var currentDate = new Date(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate(), 0, 0, 0, 0);
	var compareDate = new Date(rightNow.getFullYear(), 6, 15, 0, 0, 0, 0);
	if(compareDate.getUTCHours() == currentDate.getUTCHours()){
		timeOffset = 5;
	} else {
		timeOffset = 6;
	}
	var day;
	if(rightNow.getUTCHours() < (timeOffset)) {
		if(rightNow.getUTCDay() == 0){
			day = 6; 
		} else {
			day = parseInt(rightNow.getUTCDay() - 1);	
		}
	} else {
		day = rightNow.getUTCDay();
	}
	if(day != 0 && day != 6) {
		// WEEKDAY HOURS
		starttime = 8;
		endtime = 23;
	} else {
		// WEEKEND HOURS
		starttime = 8;
		endtime = 23;
	}
	if((rightNow.getUTCHours() - timeOffset) < 0) {
		currentHour = 24 - (timeOffset - rightNow.getUTCHours());
	} else {
		currentHour = rightNow.getUTCHours() - timeOffset;
	}
	
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<div style=\"margin:0; padding:0; text-align:left;\" class=\"recentlyViewedWrapper\"><a title=\"Eastbay Live Chat\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" href=\"#\"><img src=\"//www.eastbay.com/ns/header/images/live-chat.gif\" border=\"0\"></a></div>");
	} else {
		document.write("<div id=\"offline-chat\" style=\"margin:0; padding:0; text-align:left; cursor:default;\" class=\"recentlyViewedWrapper\"><img src=\"//www.eastbay.com/ns/header/images/header-chat-offline.jpg\" border=\"0\"><div id=\"liveChatDrop\"><p>This service is available from: <br /><br />Sunday - Saturday <br />8:00 AM to 11:00 PM Central Time</p></div></div>");
	}
	
	
}

function showFooterChat() {
	var rightNow = new Date();
	var currentDate = new Date(rightNow.getFullYear(), rightNow.getMonth(), rightNow.getDate(), 0, 0, 0, 0);
	var compareDate = new Date(rightNow.getFullYear(), 6, 15, 0, 0, 0, 0);
	if(compareDate.getUTCHours() == currentDate.getUTCHours()){
		timeOffset = 5;
	} else {
		timeOffset = 6;
	}
	var day;
	if(rightNow.getUTCHours() < (timeOffset)) {
		if(rightNow.getUTCDay() == 0){
			day = 6; 
		} else {
			day = parseInt(rightNow.getUTCDay() - 1);	
		}
	} else {
		day = rightNow.getUTCDay();
	}
	if(day != 0 && day != 6) {
		// WEEKDAY HOURS
		starttime = 8;
		endtime = 23;
	} else {
		// WEEKEND HOURS
		starttime = 8;
		endtime = 23;
	}
	if((rightNow.getUTCHours() - timeOffset) < 0) {
		currentHour = 24 - (timeOffset - rightNow.getUTCHours());
	} else {
		currentHour = rightNow.getUTCHours() - timeOffset;
	}
	
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<li><a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\" title=\"Eastbay Live Chat\"><img class=\"live_chat\" src=\"/ns/images/footer/trans1.gif\" />Live Chat</a></li>");
	} else {
		document.write("<li id=\"offline-chat\"><div style=\"position:relative;\"><img class=\"offline_chat\" src=\"/ns/images/footer/trans1.gif\" />Live Chat</a><div id=\"liveChatDropFooter\"><p>This service is available from: <br /><br />Sunday - Saturday <br />8:00 AM to 11:00 PM Central Time</p></div></div></li>");
	}
	
	
}