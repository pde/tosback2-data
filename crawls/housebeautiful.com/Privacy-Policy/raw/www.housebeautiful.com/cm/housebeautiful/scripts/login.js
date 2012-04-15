// JavaScript Document
function getURL(){
	return document.URL;
}

var regVisitor = mag_user.user_name;
var regVisitorname = mag_user.first_name;
var regfirstname = mag_user.first_name;

function cutString(str,num){
 if(typeof(str) != 'undefined')
 {
  if(str.length > num){
    var newStr = str.substr(0,num);
    newStr += "...";
    str = newStr;
  }
  return(str);
 }
}

if (!!regfirstname) {
 regVisitorname = cutString(regfirstname,12);}
else {
 regVisitorname = cutString(regVisitor,12);}

//if ( typeof( window[ 'regVisitorname' ] ) != "undefined" ) {
//Make sure regVisitorname is defined. It's undefined if you are logged out
//regVisitorname = cutString(regVisitorname,12);
//}


var currPos = getURL();

function headerLogin_new() {
	if (mag_user.logged_in) {			
		document.write('<div id="HDR_top_right_logged_4"><strong>Hi ' + '<a href="/registration/?editProfile=1">' + regVisitorname + '</a>' + '<span class="HDR_sep_4">&nbsp;|&nbsp;</span><span><a href="/registration/logout?next_url='+ currPos +'">Sign Out</a></span></strong></div>');	
	}
else {		
		document.write('<div id="HDR_top_right_login_4"><b><span class="HDR_top_login_link_4 HDR_top_safari_fix_4"><a href="/login/">Sign In</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/registration/">Join Free</a></span></b></div>');
	}
}


function headerLogin() {
	if (mag_user.logged_in) {
		document.write('<div id="loggedin_name">');
		document.write('Welcome back, ');
		document.write('<a href="/registration/?editProfile=1">' + regVisitorname + '</a>');
		document.write('!</div><br clear="all" />');
		document.write('<div id="hdr_search_cntr"><div class="h_pulldown_row"><form name="header_search" action="/search/fast_search" method="get"><table width="264" border="0" cellpadding="0" cellspacing="0"><tr><td><input name="search_term" type="text" maxlength="30" class="searchbar_drop_left" value="" id="gen_search" style="width:178px;" autocomplete="off" /></td><td width="6"></td><td align="right"><input name="search" value="search" type="submit" class="button2" /></td></tr></table></form></div></div>');
		document.write('<div id="hdr_pd_cntr"><div class="h_pulldown_row"><form name="header_dm"><select name="dmfield" class="selectbox" style="width:218px;z-index:0;"><option value="/decorating/paint-colors/">Paint a Room</option><option value="/shopping/">Great Gifts</option><option value="/archive/decorating/colors/">Color Ideas</option><option value="/archive/decorating/makeovers/">Makeovers</option><option value="/archive/kitchens/dream/">Kitchens of the Month</option></select><input name="selection" type="button" value="go" class="button3" onclick="location.href = document.header_dm.dmfield.value;" style="cursor:pointer; margin-left:6px;""/></form></div></div>');
		document.write('<div id="login_imgwrapper">');  
		document.write('<div class="loggedoptions"><a href="/registration/logout?next_url=');
		document.write(currPos);
		document.write('"><img src="/cm/housebeautiful/images/design/hdr/logout.gif" /></a></div>');
		document.write('</div>');
		}
		else {
		document.write('<div id="hdr_search_cntr"><div class="h_pulldown_row"><form name="header_search" action="/search/fast_search" method="get"><table width="264" border="0" cellpadding="0" cellspacing="0"><tr><td><input name="search_term" type="text" maxlength="30" class="searchbar_drop_left" value="" id="gen_search" style="width:178px;" autocomplete="off" /></td><td width="6"></td><td align="right"><input name="search" value="search" type="submit" class="button2" /></td></tr></table></form></div></div>');
		document.write('<div id="hdr_pd_cntr"><div class="h_pulldown_row"><form name="header_dm"><select name="dmfield" class="selectbox" style="width:218px;z-index:0;"><option value="/decorating/paint-colors/">Paint a Room</option><option value="/shopping/">Great Gifts</option><option value="/archive/decorating/colors/">Color Ideas</option><option value="/archive/decorating/makeovers/">Makeovers</option><option value="/archive/kitchens/dream/">Kitchens of the Month</option></select><input name="selection" type="button" value="go" class="button3" onclick="location.href = document.header_dm.dmfield.value;" style="cursor:pointer; margin-left:6px;"/></form></div></div>');
		document.write('<div id="login_imgwrapper">');  
		document.write('<div class="loggedoptions"><img src="/cm/housebeautiful/images/design/hdr/login.gif" style="margin-right:13px;" height="22" width="125" alt="login" class="pointer" onclick="loginslide();" />');
		document.write('<a href="/registration/"><img alt="Register" id="button_registration" src="/cm/housebeautiful/images/design/hdr/registration.gif" /></a></div>');
		document.write('</div>');  
		}
}




