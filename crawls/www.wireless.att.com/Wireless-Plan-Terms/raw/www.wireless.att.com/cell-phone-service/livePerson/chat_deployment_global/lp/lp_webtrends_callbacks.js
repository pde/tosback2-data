

//called from monitor tag when invitation is shown
function lpeventInviteShown(){
	
	try{
        var wtDomain = chkDomain();
        dcsMultiTrack('DCS.dcssip',wtDomain,'DCS.dcsuri','/virtual/chat/inviteShown','DCS.dcsref',document.location.href,'DCSext.wtEvent','loadChatPopUp','DCSext.wtEventSuccessFlag','1','WT.ti','Chat Invite','WT.mc_id','','DCSext.source','');
	} catch(e){}
}      

//called from monitor tag when user accepts invitation
function lpeventInviteAccepted(){

	try{
        var wtDomain = chkDomain();
        dcsMultiTrack('DCS.dcssip',wtDomain,'DCS.dcsuri','/virtual/chat/chatAccepted','DCS.dcsref','http://'+wtDomain+'/virtual/chat/inviteShown','DCSext.wtEvent','submitChatNow','DCSext.wtUserResp','Chat','DCSext.wtEventSuccessFlag','1','WT.ti','Chat Accepted','WT.mc_id','','DCSext.source','');
		lpUASaction("ChatStartedURL",document.location);
	} catch(e){}
}

//called from monitor tag when user declines invitation
function lpeventInviteDeclined(){

	try{
         var wtDomain = chkDomain();
         dcsMultiTrack('DCS.dcssip',wtDomain,'DCS.dcsuri','/virtual/chat/chatDeclined','DCS.dcsref','http://'+wtDomain+'/virtual/chat/inviteShown','DCSext.wtEvent','submitDeclineChat','DCSext.wtUserResp','noThanks','DCSext.wtEventSuccessFlag','1','WT.ti','Chat Declined','WT.mc_id','','DCSext.source','');
	} catch(e){}
}

//===============================================================================================================================
// 05/2008 On certain pages the domain property is not set correctly for tracking purposes. Check for it and write the domain as needed:
function chkDomain(){
	tempDomain = document.domain;
	if (tempDomain != 'www.wireless.att.com') {
       tempDomain = 'www.wireless.att.com';	
	} 
	return tempDomain;
}