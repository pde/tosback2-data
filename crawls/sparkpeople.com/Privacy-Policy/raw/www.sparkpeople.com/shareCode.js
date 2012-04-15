//here you place the ids of every element you want.
	MM_preloadImages('/assets/diet4/share_btn1.gif','/assets/diet4/share_btn2.gif','/assets/diet4/share_btn3.gif','/assets/diet4/share_btn4.gif','/assets/diet4/share_btn5.gif','/assets/diet4/share_btn_send_now.jpg','/assets/diet4/share_btn1_f2.gif','/assets/diet4/share_btn2_f2.gif','/assets/diet4/share_btn3_f2.gif','/assets/diet4/share_btn4_f2.gif','/assets/diet4/share_btn5_f2.gif','/assets/diet4/share_btn_send_now_f2.jpg');
	
	if (showMail == "TRUE")
	{
		var ids=new Array('ste0','ste1','ste2','ste3','ste399');
	}
	else
	{
		var ids=new Array('ste0','ste1','ste2');
	}
	var btnNum;

	var shareCode;

shareCode="<div id=\"sharethis_e\">\n"+

"<div id=\"ste0\">\n"+
"<h2><a href=\"javascript:closeShare();\">close X</a> Choose how to Share:</h2>\n"+
"<a href=\"mailto:?subject="+ sharePageLinkSubject +"&body="+ sharePageLinkBody +"&\" onclick=\"javascript:closeShare(); trackShare(1); \" onMouseOut=\"MM_swapImgRestore();\" onMouseOver=\"MM_swapImage('share_btn1','','/assets/diet4/share_btn1_f2.gif',1);\"><img name=\"share_btn1\" src=\"/assets/diet4/share_btn1.gif\" border=\"0\" alt=\"\"></a>\n"+
"<a href=\"javascript:void(0);\" onclick=\"switchid(2); trackShare(2); \" onMouseOut=\"MM_swapImgRestore();\" onMouseOver=\"MM_swapImage('share_btn2','','/assets/diet4/share_btn2_f2.gif',1);\"><img name=\"share_btn2\" src=\"/assets/diet4/share_btn2.gif\" border=\"0\" alt=\"\"></a>\n"

if (showMail == "TRUE")
{
shareCode+="<a href=\"javascript:void(0);\" onclick=\"switchid(3); trackShare(3); \" onMouseOut=\"MM_swapImgRestore();\" onMouseOver=\"MM_swapImage('share_btn3','','/assets/diet4/share_btn3_f2.gif',1);\"><img name=\"share_btn3\" src=\"/assets/diet4/share_btn3.gif\" border=\"0\" alt=\"\"></a>\n"
}
shareCode+="</div>\n"+

"<div id=\"ste1\">\n"+
"<h2><a href=\"javascript:closeShare();\">close X</a> <a href=\"javascript:void(0);\" onclick=\"switchid(0);\">back</a> Share by Email:</h2>\n"+
"<p>Thanks For Spreading the Spark!</p>\n"+
"</div>\n"+

"<div id=\"ste2\">\n"+
"<h2><a href=\"javascript:closeShare();\">close X</a> <a href=\"javascript:void(0);\" onclick=\"switchid(0);\">back</a> Get Link to Share:</h2>\n"+
"<p>Copy the web address below to send to a friend via email, IM, or any other way.</p>\n"+
"<input type=\"text\" onclick=\"SelectAll('link_input')\" name=\"link_input\" id=\"link_input\" value=\""+ sharePageLinkTwitter +"\">\n"+
"</div>\n"

if (showMail == "TRUE")
{
shareCode+="<div id=\"ste3\">\n"+
"<h2><a href=\"javascript:closeShare();\">close X</a> <a href=\"javascript:void(0);\" onclick=\"switchid(0);\">back</a> Share Via SparkMail:</h2>\n"+
"<table border=\"0\" cellpadding=\"4\" cellspacing=\"0\"><tr>\n"+
"<td valign=\"top\">\n"+
"<b>To:</b> <span>(username, separate by commas)</span><br>\n"+
"<textarea id=\"to_input\"></textarea>\n"+
"</td>\n"+
"<td valign=\"top\">\n"+
"<b>Add from address book:</b><br>\n"+
"<select id=\"address_input\" size=\"5\" onchange=\"addFriend(this.options[this.selectedIndex].value, this.selectedIndex);\">\n"

for (var i=0; i<sharePageAddressBook.length; i++) {
	shareCode+="<option value=\"" + sharePageAddressBook[i] + "\">"+ sharePageAddressBook[i] +"</option>\n"

}
	//no Members in address book
	if (sharePageAddressBook.length == 0) {
		shareCode+="<option>No members in Address Book</option>\n"
	}

shareCode+="</select>\n"+
"</td>\n"+
"</tr><tr>\n"+
"<td valign=\"top\">\n"+
"<b>Message:</b><br>\n"+
"<textarea id=\"message_input\">"+ sharePageMessage +"</textarea>\n"+
"</td>\n"+
"<td align=\"center\" valign=\"bottom\">\n"+
"<a href=\"javascript:void(0);\" onclick=\"shareMail();\" onMouseOut=\"MM_swapImgRestore();\" onMouseOver=\"MM_swapImage('share_btn_send_now','','/assets/diet4/share_btn_send_now_f2.jpg',1);\"><img name=\"share_btn_send_now\" src=\"/assets/diet4/share_btn_send_now.jpg\" border=\"0\" alt=\"Send Now\"></a>\n"+
"</td>\n"+
"</tr></table>\n"+
"</div>\n"+

"<div id=\"ste399\">\n"+
"<h2><a href=\"javascript:closeShare();\">close X</a> <a href=\"javascript:void(0);\" onclick=\"switchid(0);\">back</a> Share via SparkMail:</h2>\n"+
"<p>Your message has been shared.</p>\n"+
"</div>\n"+
"</div>\n"
}

function runShare(x) {
	btnNum = x;
	if(btnNum == 1) {
		document.getElementById("sharethis_e_w2").innerHTML = "";
		document.getElementById("sharethis_e_w1").innerHTML = shareCode;
		switchid(0);
				
				//Hide 728x90 AD again
				//if(document.getElementById("body_728_ad")) {
					//document.getElementById("body_728_ad").style.height = "118px";
				//}
				if(document.getElementById("ad_hide_for_menu2")) {
					document.getElementById("ad_hide_for_menu2").style.display = "none";
				}
				
	} else {
		document.getElementById("sharethis_e_w1").innerHTML = "";
		document.getElementById("sharethis_e_w2").innerHTML = shareCode;
		switchid(0);
				//if(document.getElementById("body_728_ad")) {
					//document.getElementById("body_728_ad").style.height = "auto";
				//}
			    //show 728x90 AD again
				if(document.getElementById("ad_hide_for_menu2")) {
					document.getElementById("ad_hide_for_menu2").style.display = "block";
				}
	}

} 

function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}


function trackShare(iType)
{
	var shareURL;
	shareURL = "/share_workhorse.asp?iType=" + iType + "&ShareURL=" + sharePageLink;
	objResponse1 = SPAJAX_createRequestObject();
	SPAJAX_makeRequest(objResponse1, 'get', shareURL, functionplaceholder);

}

function shareMail()
{
	if (document.getElementById("to_input").value == "")
	{
		alert("Please select some friends to share with.");
	}
	else
	{
		var shareURL2;
		shareURL2 = "/share_workhorse.asp?" + jsCredentials + "&iType=6&ShareURL=" + sharePageLink + "&ShareMSG=" + document.getElementById("message_input").value + "&ShareTo=" + document.getElementById("to_input").value + "&strTitle=" + sharePageTitle;
		//window.open(shareURL2, "test");
		objResponse2 = SPAJAX_createRequestObject();
		SPAJAX_makeRequest(objResponse2, 'get', shareURL2, functionplaceholder);

		switchid(399);
	}
	
	return false;
}

function functionplaceholder()
{

}

function addFriend(friend, rid) {
	if(document.getElementById("to_input")) {
    	//show 728x90 AD again
		document.getElementById("to_input").value = document.getElementById("to_input").value + friend + ", ";
		document.getElementById("address_input").remove(rid);
	}
}

function closeShare() {
	if(document.getElementById("ad_hide_for_menu2")) {
    	//show 728x90 AD again
		document.getElementById("ad_hide_for_menu2").style.display = "block";
	}
	if(document.getElementById("body_728_ad")) {
		document.getElementById("body_728_ad").style.height = "auto";
	}

	hideallids();
}

function switchid(id){	
	hideallids();
	id = "ste" + String(id);
	showdiv(id); 

	//if(id == 2) {
		//focus on the link if you are doing "Get Link"
		//document.theShareForm.link_input.focus();
	//}

}

function hideallids(){
	//loop through the array and hide each element by id
	for (var i=0;i<ids.length;i++){
		hidediv(ids[i]);
	}

}

function hidediv(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}

function showdiv(id) {
	//safe function to show an element with a specified id
		  
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';

	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		}
		else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}