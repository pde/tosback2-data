<!--
// Ensure that all popup windows are opened in a consistent manner local

function modifyLegacyPopUrl(theURL){
	var indexCopyKey = theURL.indexOf("copyName=");
	var copyNameValue = null;
	
	if(indexCopyKey > 0){
		if(theURL.length > (indexCopyKey + 9)){
			copyNameValue = theURL.substr((indexCopyKey + 9));
		}
	}
	
	if(copyNameValue != null){
		return "/pp/popupAllSites.html?copyName=" + copyNameValue;
	}
	
	return theURL;
}

function LE_popup(theURL) { 
    LE_popup_large(theURL); 
}

function LE_popup_large(theURL) { 
	theURL = modifyLegacyPopUrl(theURL);
    if (theURL != "")
    {
        var win =  window.open(theURL, "LE_PopupLarge",
                       "scrollbars=yes,width=700,height=540,top=0,left=210,resizable=yes");
        win.focus();
    }
}

function LE_popup_small(theURL) { 
	theURL = modifyLegacyPopUrl(theURL);
    if (theURL != "")
    {
        var win =  window.open(theURL, "LE_PopupSmall",
                       "scrollbars=yes,width=400,height=320,top=50,left=332,resizable=yes");
        win.focus();
    }
}


// Insure that all popup windows are opened in a consistent manner
function swim_popup_internal(theURL,SID,REFER) {
                sid = "?sid=" + SID;
                refer = "&refer=" + REFER;
                ppURL = theURL+sid+refer;
    return window.open(ppURL, "Window2",
                       "scrollbars=yes,width=550,height=370,top=75,left=125");
}

// Lands' End popup window script -RW
function swim_popup(theURL,SID,REFER) {
  swim_popup_internal(theURL,SID,REFER).focus();
}


// popup window that generates content to view an expanded swatch or
// product image
function LE_popup2(akamaiString,ImgPath,ImgAlt,Height,Width) {
    var win =  window.open('', "LE_PopupLarge",
               "scrollbars=yes,width=550,height=540,top=0,left=210,resizable=yes");

    if (typeof akamaiString == "undefined")
       akamaiString = "";

    var headerhtml = "\n<HTML><HEAD>\n<TITLE>Lands' End Image Viewer</TITLE><META http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"></HEAD>\n<BODY bgcolor=\"#D6E1EB\" topmargin=\"0\" leftmargin=\"0\" rightmargin=\"0\" marginwidth=\"0\" marginheight=\"0\">\n<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" height=\"100%\">\n  <tr valign=\"top\" bgcolor=\"#FFFFFF\"> \n    <td height=\"1\"> \n      <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n        <tr bgcolor=\"#D6E1EB\"> \n          <td width=\"50%\" align=\"left\" valign=\"bottom\"><img src=\""+akamaiString+"/IMAGES/OTHER/ledotcom.gif\" width=\"127\" height=\"19\"><br>\n            <img src=\""+akamaiString+"/IMAGES/OTHER/10x10.gif\" width=\"15\" height=\"2\"></td>\n          <td width=\"50%\" align=\"right\" valign=\"top\">\n                 <a href=\"javascript:window.close()\"><img src=\""+akamaiString+"/IMAGES/OTHER/close.gif\" width=\"89\" height=\"23\" border=\"0\"></a>\n               </td>\n        </tr>\n        <tr bgcolor=\"#336699\"> \n          <td align=\"left\" valign=\"top\" height=\"2\" colspan=\"2\"><img src=\""+akamaiString+"/IMAGES/OTHER/10x10.gif\" width=\"5\" height=\"2\"></td>\n        </tr>\n      </table>\n    </td>\n</tr>\n <tr align=\"center\" valign=\"middle\" bgcolor=\"#FFFFFF\"> \n    <td>\n";

    var imagehtml = "";
    if (ImgPath.length > 0) {
        if (typeof ImgAlt == "undefined")
            ImgAlt = "";
        else
            ImgAlt = ' alt="' + ImgAlt + '"';

        if (typeof Width == "undefined")
            Width = "";
        else
            Width = ' width="' + Width + '"';

        if (typeof Height == "undefined")
            Height = "";
        else
            Height = ' height="' + Height + '"';

        imagehtml = '<img src="' + akamaiString + ImgPath + '"' + Width + Height +
                     ImgAlt + '>';
    }

    var footerhtml = '\n    </td>\n  </tr>\n  <tr valign=\"bottom\" bgcolor=\"#FFFFFF\"> \n    <td height=\"1\"> \n      <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n        <tr bgcolor=\"#336699\"> \n          <td colspan=\"2\" align=\"left\" valign=\"top\" height=\"2\"><img src=\"'+akamaiString+'/IMAGES/OTHER/10x10.gif\" width=\"10\" height=\"2\"></td>\n        </tr>\n        <tr bgcolor=\"#D6E1EB\"> \n          <td width=\"50%\" align=\"left\" valign=\"bottom\"><img src="'+akamaiString+'/images/2001.gif" width=\"86\" height=\"11\"></td>\n          <td width=\"50%\" align=\"right\" valign=\"top\" bgcolor=\"#D6E1EB\">\n               <a href=\"javascript:window.close()\"><img src=\"'+akamaiString+'/IMAGES/OTHER/close.gif\" width=\"89\" height=\"23\" border=\"0\"></a><br>\n            <img src=\"'+akamaiString+'/IMAGES/OTHER/10x10.gif\" width=\"7\" height=\"2\"></td>\n        </tr>\n      </table>\n    </td>\n </tr>\n</table>\n</BODY></HTML>\n   ';

    with (win.document) {
        open("text/html", "replace");
        write(headerhtml);
        write(imagehtml);
        write(footerhtml);
        
        close();
        win.focus();
    }
}
function getQSVar(name) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == name) { 
      return pair[1];
    }    
  }
  return ''; 
}

function showPopup(theURL, theWidth, theHeight) {
	theURL = modifyLegacyPopUrl(theURL);
	var win =  window.open(theURL, "le_prod_popup","scrollbars=yes,width=" + theWidth + ",height=" + theHeight + ",top=50,left=332,resizable=yes");
   	win.focus();
}

//-->

