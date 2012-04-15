// JavaScript Document
var currentTime = new Date();
var currentHour;
var timeOffset = 6;
var gIChannel = "DnpqHi1065376";
var gServer = "chatweb.footlocker.com";
var gAttachedData = null;
var prefillValues = null;
var agentOnlyValues = new Object();
var bEnterOnQueuePage = false;
var gChatHelper = "/ns/chat/html/chatHelper.html";
var gChatWindowWidth = 360;
var gChatWindowHeight = 625;

function showChat() {
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
		endtime = 20;
	} else {
		// WEEKEND HOURS
		starttime = 9;
		endtime = 17;
	}
	if((rightNow.getUTCHours() - timeOffset) < 0) {
		currentHour = 24 - (timeOffset - rightNow.getUTCHours());
	} else {
		currentHour = rightNow.getUTCHours() - timeOffset;
	}
	if(currentHour >= starttime && currentHour < endtime) {
		document.write("<a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\"><img src=\"//www.eastbay.com/ns/chat/images/live-chat-cart-small.gif\" border=\"0\" /></a>");
	} else {
		document.write("<a href=\"#\" onClick=\"cmCreateConversionEventTag('Live Chat',1,'Chat',0); startChatAndCobrowse(gIChannel, gServer, gAttachedData, prefillValues, agentOnlyValues, bEnterOnQueuePage); return false;\"><img src=\"//www.eastbay.com/ns/chat/images/live-chat-cart-small.gif\" border=\"0\" /></a>");
	}
}