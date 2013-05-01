// JavaScript Document



browser = navigator.userAgent;
checkIE6 = browser.indexOf('6.0');
 

url = location.href;
breakURL = url.split('/');
section = breakURL[3];
checkHome2 = url.indexOf('.com/index')
if(checkHome2 != '-1') {section = 'home'}     
		if(section == 'home') {directory = ''}
		else {
		directory = breakURL[4];   
		checkDir = directory.indexOf('.html');
		if(checkDir != '-1') {directory = directory.substring(0,checkDir);} 
		if(breakURL.length <= 5) { page = ''}
		else {
		page = breakURL[5];  
		checkPage = page.indexOf('.html');
		if(checkPage != '-1') {page = page.substring(0,checkPage);}  
		}
		}
checkOrderform = url.indexOf('order_form');
if(checkOrderform != '-1') {section = 'order_form'}
checkTab = url.indexOf('tab=');
if(checkTab != '-1') {tab = url.substr(checkTab+4);} 
else {tab=0}

checkPromos = url.indexOf('promos');
if (checkPromos != '-1') {
		directory = 'promos';
}

 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();  
  
 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();



 

 

function renderFooter() {

	document.write('<div class="clear"></div>');

	document.write('<div id="inner-footer">');

	document.write('<ul id="footerNav">');

	document.write('    	<li><a href="/index.html" title="Home">Home</a></li>');

	document.write('    	<li><a href="/about_att/index.html" title="About AT&amp;T">About AT&amp;T </a></li>');

	document.write('    	<li><a href="http://www.att.com/gen/careers?pid=1" title="Careers">Careers</a></li>');

	document.write('    	<li><a href="http://www.wireless.att.com/find-a-store/" title="Store locator">Store locator</a></li>');

	document.write('    	<li><a href="/help/contact_us.html" title="Contact us">Contact us</a></li>');

	document.write('    	<li><a href="/privacy_policy/index.html" title="Privacy policy">Privacy policy</a></li>');

	document.write('    	<li><a href="/privacy_policy/privacy_terms_of_use.html" class="nb" title="Terms of use">Terms of use</a></li>');

	document.write('    </ul>');

	document.write('    <div class="clear"></div>');

	document.write('    <p><a href="http://www.att.com/gen/privacy-policy?pid=2587" class="nb" title="AT&amp;T Intellectual Property">© 2003-2012 AT&amp;T Intellectual Property.</a>  All rights reserved. <a href="http://www.yellowpages.com" class="nb">YELLOWPAGES.COM</a></p>');

	document.write('</div>');

	

	document.write('<div id="pop"> </div>');

}

 

 







function renderAnalyticsCode() {

document.write('<script>');

document.write(' var _gaq = _gaq || []; ');

document.write('_gaq.push([\'_setAccount\', \'UA-273710-14\']);  ');  

document.write(' _gaq.push([\'_trackPageview\']);');

document.write(" (function() {"); 
document.write("    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"); 
document.write("    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"); 
document.write("    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"); 
document.write("  })();"); 
document.write("}  "); 
document.write("function recordOutboundLink(link, category, action) {  ");
document.write("_gat._getTrackerByName()._trackEvent(category, action);  ");
document.write("setTimeout('document.location = \"' + link.href + '\"', 100); ");
document.write("}  ");
document.write("</script>"); 

}




browser = navigator.userAgent;
checkIE6 = browser.indexOf('6.0');
 

url = location.href;
breakURL = url.split('/');
section = breakURL[3];
checkHome2 = url.indexOf('.com/index')
if(checkHome2 != '-1') {section = 'home'}     
		if(section == 'home') {directory = ''}
		else {
		directory = breakURL[4];   
		checkDir = directory.indexOf('.html');
		if(checkDir != '-1') {directory = directory.substring(0,checkDir);} 
		if(breakURL.length <= 5) { page = ''}
		else {
		page = breakURL[5];  
		checkPage = page.indexOf('.html');
		if(checkPage != '-1') {page = page.substring(0,checkPage);}  
		}
		}
checkOrderform = url.indexOf('order_form');
if(checkOrderform != '-1') {section = 'order_form'}
checkTab = url.indexOf('tab=');
if(checkTab != '-1') {tab = url.substr(checkTab+4);} 
else {tab=0}

checkPromos = url.indexOf('promos');
if (checkPromos != '-1') {
		directory = 'promos';
}

 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();  
  
 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 
state = getState();

 

 



/* ******************************************************************************************************************************************************************************************  */

/* Please make any updates to the IN SITE navigation in this function to the function directly below this one that renders the navigation on the EXTERNAL ORDER FORM found at https://www.att.com/Common/espanol/order_form.html.  */

/* ******************************************************************************************************************************************************************************************  */

function renderGlobalNav() {  
	
	
 

	document.write('<div id="global-nav">');

	document.write('<ul>');

	document.write('<li class="logo">');

	document.write('<a  id="home" href="/index.html" title="Home"><img src="/mlcomm/_images/template/global_nav/global_logo.jpg" alt="Home" /></a></li>')

	document.write('<li><a  id="shop" class="lang-select" href="#shop-link" title="Shop">SHOP</a>');

	document.write('</li>');

	document.write('<li><a id="help" class="lang-select"  href="#help-link" title="Help ">HELP</a>') 

	document.write('</li>');

	document.write('<li><a  id="news" class="lang-select" href="#news-link"  title="News">NEWS</a>'); 

	document.write('</li>');

	document.write('<li><a  id="about" class="lang-select" href="#about-link" title="About AT&amp;T">ABOUT AT&T</a>'); 

	document.write('</ul>');

	

	document.write('<div class="clear"></div>');	 

	document.write('<div id="lang-drop">');
	document.write('<form>');
	document.write('<select class= langoption" onchange="showLanguageDrop(this)">');
	document.write('<option>Choose Your Language</option> ');
	document.write('<option id="chinese-drop" value="chinese-drop">Chinese | &#20013;&#25991;</option>');
	document.write('<option id="japanese-drop" value="japanese-drop">Japanese | &#26085;&#26412;&#35486;</option>');
	document.write('<option id="korean-drop" value="korean-drop">Korean | &#54620;&#44397;&#50612;</option>');
	document.write('<option id="polish-drop" value="polish-drop">Polish | Polski</option>');
	document.write('<option id="russian-drop" value="russian-drop">Russian | &#1088;&#1091;&#1089;&#1089;&#1082;&#1086;&#1084; &#1103;&#1079;&#1099;&#1082;&#1077;</option>');
	document.write('<option id="tagalog-drop" value="tagalog-drop">Tagalog</option>');
	document.write('<option id="vietnamese-drop" value="vietnamese-drop">Vietnamese | Ti&#7871;ng Vi&#7879;tt</option>');
	document.write('</select>');
	document.write('</form>');
	document.write('</div>');

	document.write('</div>'); 

}


/* ADDED FOR NEW LEGAL TERMS LANDING PAGE */


function renderStateSelect(whichPage) {  

    document.write('<div id="font-size-box">');
	document.write('<ul id="accessibility"><li>Adjust text size: </li><li class="fontresize" id="small"><a href="#">A</a></li><li>|</li><li class="fontresize" id="med"><a href="#">A</a></li><!--<li>|</li><li class="fontresize" id="large"><a href="#">A</a></li>--></ul>');
	document.write('</div>');
	
	document.write('<div  id="top-button-select">');
	document.write('<ul>');
	document.write('<li class="' + whichPage + '" id="chooseState"><a href="javascript:showStateSelect ()" title="Change Your State">' + capState + '</a></li>');
	document.write('<li id="cnow"> <a title="Call Now" href="/about_att/contact_us.html?id=' + state + '">CALL NOW</a></li>');
	document.write('<li><a onClick="recordOutboundLink(this, \'Order Now\', \'Other\');return false;" href="/residential_customers/order_form.html?id=' + state + '" title="Inquire Now">INQUIRE NOW</a></li>');
	document.write('</ul></div>    ');
	
	
						
	
}
 

function showStateSelect () {
	 $(document).ready(function() { 
 $("#chooseState").trigger('click');
 });


}
function stateSelectInitialize(targetPage) {   
	$('#chooseState').removeClass().addClass(targetPage); 
 $("#chooseState").trigger('click');
	
	
}

function getQueryString() {
	var querystring = location.href;
	qPos = querystring.lastIndexOf('?');
	if(qPos != '-1') {
	querystring = querystring.split('?');
	querystring = querystring[1]; 
	}
	else querystring = 'noquery'
	return querystring;
}


function getState() {
	query = getQueryString();
	if(query == 'noquery') {state = 'nostate'} 
	else {
	idPos = query.lastIndexOf('id');
	idAnd = query.lastIndexOf('&');
	idAnc = query.lastIndexOf('&');
	if(idPos != '-1' && idAnd == '-1') {
		 state = query.split('=');
		 state = state[1];
	}
	else {
		 state = query.split('&');
		 state = state[0];
		 state = state.split('=');
		 state = state[1]; 
	}
	}
	isAnc = state.lastIndexOf('#');
	if(isAnc != '-1') {
	state = state.substr(0, isAnc);	
	}
	return state;
}


function displayState(stateID) {
	if(stateID == 'northcarolina') {capState = 'North Carolina'}
	else if(stateID == 'southcarolina') {capState = 'South Carolina'}
	else {
	initCap = stateID.charAt(0)
	initCap = initCap.toUpperCase()
	endState = stateID.substr(1,100);
	capState = initCap + endState;
	if (capState == "Nostate") {capState = '' ; } 
	}
	 
	return capState;
	 
}




//function renderSocialMediaAnimation() { 
//var bodyURL = location.href;
//checkURL = bodyURL.indexOf('?id=')
//if(checkURL != '-1') {bodyURL  = bodyURL.substring(0,checkURL);}
//
// 
//document.write('<div id="social-media-sidebar">');
//
//document.write('<div id="social-media-anilink"><img alt="social media" id="social-media-btn" src="http://english.asian.redesign.att.fhdev.com/mlcomm/_images/template/social_media_ani_tab.gif" /></div>');
//document.write('</div>');
//document.write('<div id="social-media-anibox">'); 
//document.write('<div id="inner-media">');
//document.write('<p id="media-facebook"><a href="http://www.facebook.com/attlatino?v=app_4949752878" title="AT&amp;T Latino on Facebook" target="_blank">Like Us</a></p>');
//document.write('<p id="media-youtube"><a href="http://www.youtube.com/attlatino" title="AT&amp;T Latino on YouTube" target="_blank">Subscribe to Us</a></p>');
//document.write('<p id="media-myspace"><a href="http://www.myspace.com/attlatino" title="AT&amp;T Latino on MySpace" target="_blank">Friend Us</a></p>');
//document.write('<p id="media-share"><a href="mailto:?subject=PIENSA SIN LIMITES &body=Hola. Acabo de encontrar datos interesantes sobre una variedad de productos y servicios que ofrece AT%26T.%0D' + bodyURL + '" title="Share AT&amp;T Espanol">Share</a></p>');
//document.write('<p id="anibox-more"><strong><a href="/newsroom/social_media.html?id=' + state +'" title="Learn more">Learn more >></a></strong></p>');
//document.write('</div>');
//
//document.write('</div>');
//}


function renderQuickLinks() {
	document.write('<div id="quick-links">');
document.write('        		<div id="quick-links-box-01" class="quick-links-box">');
document.write('                <h6>Quick Links...</h6>');
document.write('                <ul>');
 if($('body').is('#home')){
document.write('                <li><a href="javascript: stateSelectInitialize(\'home\')" title="Select your state">Select your state</a></li>');
 }
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'promotions\')"') } else {document.write(' href="/legal_terms/index.html?id=' + state + '&page=promos" ');}
												document.write(' title="Promotions">Promotions</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'legal_home\')"') } else {document.write(' href="/legal_terms/index.html?id=' + state  + '" ');}
												document.write(' title="Legal Terms">Legal Terms</a></li>'); 
document.write('                <li><a href="/about_att/contact_us.html?id=' + state  + '" title="Contact Us">Contact Us</a></li>');
document.write('                </ul>');
 document.write('               </div>');
                
document.write('        		<div id="quick-links-box-02" class="quick-links-box">');
document.write('                <h6>Internet...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'hs_internet\')"') } else {document.write(' href="/residential_customers/att_internet/high_speed_internet.html?id=' + state + '" ');}
												document.write('  title="High Speed Internet">High Speed Internet</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'dsl_direct\')"') } else {document.write(' href="/residential_customers/att_internet/dsl_direct.html?id=' + state + '" ');}
												document.write(' title="Internet without phone">Internet without phone</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_internet\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_internet.html?id=' + state + '" ');}
												document.write(' title="U-verse Internet">U-verse Internet</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-03" class="quick-links-box">');
document.write('                <h6>Telephone service...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'phone_landing\')"') } else {document.write(' href="/residential_customers/att_home_phone/home_phone.html?id=' + state + '" ');}
												document.write(' title="Local Phone">Local Phone</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'long_distance\')"') } else {document.write(' href="/residential_customers/att_home_phone/domestic_long_distance.html?id=' + state + '" ');}
												document.write(' title="Domestic long distance">Domestic long distance</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'long_distance\')"') } else {document.write(' href="/residential_customers/att_home_phone/international_long_distance.html?id=' + state + '" ');}
												document.write(' title="International long distance">International long distance</a></li>'); 
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-04" class="quick-links-box">');
document.write('                <h6>AT&amp;T U-verse...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_tv\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_tv.html?id=' + state + '" ');}
												document.write(' title="U-verse TV">U-verse TV</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_voice\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_voice.html?id=' + state + '" ');}
												document.write(' title="U-verse Voice">U-verse Voice</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_internet\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_internet.html?id=' + state + '" ');}
												document.write(' title="U-verse Internet">U-verse Internet</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        		<div id="quick-links-box-05" class="quick-links-box last">');
document.write('                <h6>AT&amp;T digital television...</h6>');
document.write('                <ul>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_tv\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_tv.html?id=' + state + '" ');}
												document.write(' title="U-verse TV">U-verse TV</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'uverse_programming\')"') } else {document.write(' href="/residential_customers/att_uverse/uverse_programming.html?id=' + state + '" ');}
												document.write(' title="U-verse International Programming">U-verse  International Programming</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'directv\')"') } else {document.write(' href="/residential_customers/att_advanced_tv/directv.html?id=' + state + '" ');}
												document.write(' title="AT&amp;T | DIRECTV">AT&amp;T | DIRECTV</a></li>');
document.write('                <li><a ');
		if(state == 'nostate') {document.write(' href="javascript: stateSelectInitialize(\'directv_programming\')"') } else {document.write(' href="/residential_customers/att_advanced_tv/directv_programming.html?id=' + state + '" ');}
												document.write(' title="ADIRECTV">DIRECTV International Programming</a></li>');
document.write('                </ul>');
document.write('                </div>');
                
document.write('        </div>');
}