/*HM_Loader.js
* by Peter Belesis. v4.3 020610
* Copyright (c) 2002 Peter Belesis. All Rights Reserved.
*/

HM_DOM = (document.getElementById) ? true : false;
HM_NS4 = (document.layers) ? true : false;
HM_IE = (document.all) ? true : false;
HM_IE4 = HM_IE && !HM_DOM;
HM_Mac = (navigator.appVersion.indexOf("Mac") != -1);
HM_IE4M = HM_IE4 && HM_Mac;
HM_Opera = (navigator.userAgent.indexOf("Opera")!=-1);
HM_Konqueror = (navigator.userAgent.indexOf("Konqueror")!=-1);

HM_IsMenu = !HM_Opera && !HM_IE4M && (HM_DOM || HM_NS4 || HM_IE4 || HM_Konqueror);

HM_BrowserString = HM_NS4 ? "NS4" : HM_DOM ? "DOM" : "IE4";

if(window.event + "" == "undefined") event = null;
function HM_f_PopUp(){return false};
function HM_f_PopDown(){return false};
popUp = HM_f_PopUp;
popDown = HM_f_PopDown;


HM_GL_MenuWidth          = 150;
HM_GL_FontFamily         = "Verdana,Arial,sans-serif";

if ( HM_IE ) {
   HM_GL_FontSize = 7;
} else {
   HM_GL_FontSize = 8;
}

HM_GL_FontBold           = false;
HM_GL_FontItalic         = false;
HM_GL_FontColor          = "black";
HM_GL_FontColorOver      = "white";
HM_GL_BGColor            = "transparent";
HM_GL_BGColorOver        = "transparent";
HM_GL_ItemPadding        = 3;

HM_GL_BorderWidth        = 1;
HM_GL_BorderColor        = "red";
HM_GL_BorderStyle        = "solid";
HM_GL_SeparatorSize      = 1;
HM_GL_SeparatorColor     = "yellow";

HM_GL_ImageSrc			 = "/x.gif";
HM_GL_ImageSrcLeft		 = "/x.gif";

HM_GL_ImageSrcOver		 = "/x.gif";
HM_GL_ImageSrcLeftOver	 = "/x.gif";

HM_GL_ImageSize          = 5;
HM_GL_ImageHorizSpace    = 5;
HM_GL_ImageVertSpace     = 5;

HM_GL_KeepHilite         = false;
HM_GL_ClickStart         = false;
HM_GL_ClickKill          = 0;
HM_GL_ChildOverlap       = 40;
HM_GL_ChildOffset        = 10;
HM_GL_ChildPerCentOver   = null;
HM_GL_TopSecondsVisible  = .5;
HM_GL_ChildSecondsVisible = .3;
HM_GL_StatusDisplayBuild = 0;
HM_GL_StatusDisplayLink  = 1;
HM_GL_UponDisplay        = null;
HM_GL_UponHide           = null;

HM_GL_RightToLeft		 = false;
HM_GL_CreateTopOnly      = HM_NS4 ? true : false;
HM_GL_ShowLinkCursor     = true;

HM_GL_ScrollEnabled = false;
HM_GL_ScrollBarHeight = 14;
HM_GL_ScrollBarColor = "lightgrey";
HM_GL_ScrollImgSrcTop = "/x.gif";
HM_GL_ScrollImgSrcBot = "/x.gif";
HM_GL_ScrollImgWidth = 9;
HM_GL_ScrollImgHeight = 5;
HM_GL_ScrollBothBars = false;

HM_GL_HoverTimeTop  = 1000;
HM_GL_HoverTimeTree = 1000;

// the following function is included to illustrate the improved JS expression handling of
// the left_position and top_position parameters introduced in 4.0.9
// and modified in 4.1.3 to account for IE6 standards-compliance mode
// you may delete if you have no use for it

function HM_f_CenterMenu(topmenuid) {
	var MinimumPixelLeft = 0;
	var TheMenu = HM_DOM ? document.getElementById(topmenuid) : window[topmenuid];
	var TheMenuWidth = HM_DOM ? parseInt(TheMenu.style.width) : HM_IE4 ? TheMenu.style.pixelWidth : TheMenu.clip.width;
	var TheWindowWidth = HM_IE ? (HM_DOM ? HM_Canvas.clientWidth : document.body.clientWidth) : window.innerWidth;
	return Math.max(parseInt((TheWindowWidth-TheMenuWidth) / 2),MinimumPixelLeft);
}

function HM_f_GetRealLeft(element) {
    var xPos = element.offsetLeft;
    var ParentEl = element.offsetParent;
    while (ParentEl != null) {
        xPos += ParentEl.offsetLeft;
        ParentEl = ParentEl.offsetParent;
    }
    return xPos;
}

function HM_f_GetRealTop(element) {
    var yPos = element.offsetTop;
    var ParentEl = element.offsetParent;
    while (ParentEl != null) {
        yPos += ParentEl.offsetTop;
        ParentEl = ParentEl.offsetParent;
    }
    return yPos;
}

function HM_f_UponHide(menu)
{
	HM_f_ShowHideElements(menu,true);
}

function HM_f_UponDisplay(menu)
{
	HM_f_ShowHideElements(menu,false);
}



if(HM_IsMenu) {

	
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/www/en_US/global/mvc_objects/flyout/HM_Script"+ HM_BrowserString +".js' TYPE='text/javascript'><\/SCR" + "IPT>");
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/www/en_US/global/mvc_objects/flyout/HM_BankAmerica.js' TYPE='text/javascript'><\/SCR" + "IPT>");
}


//end
