function bolOffSiteLink(gotoName,gotoURL){  
// modified by James Gulick -- 7/15/2005
gotoName = escape(gotoName);
gotoURL = escape(gotoURL); 
var OffSitePopUpURL;
var leftOffset=0;
var topOffset=0;    
//OffSitePopUpURL="weblinking_popup.htm?"; 
OffSitePopUpURL="https://www.chase.com/index.jsp?pg_name=ccpmapp/shared/assets/page/chase-weblinking-disclosure&";
if(screen.width){
if(screen.width < 800){
leftOffset=60;
topOffset=90;
}else{
if(screen.width>=800&&screen.width<1024){
leftOffset=160;
topOffset=134;
}else{
if(screen.width>=1024){
leftOffset=272;
topOffset=250;
}
}
}
}
var loadURL=OffSitePopUpURL+'site='+gotoName+'&url='+gotoURL;
var webLinkWin=window.open(loadURL,"weblinking",'width=550,height=375,left='+leftOffset+',top='+topOffset+',screenx='+leftOffset+',screeny='+topOffset+',resizable=no,scrollbars=yes,menubar=no');
webLinkWin.focus();
}
