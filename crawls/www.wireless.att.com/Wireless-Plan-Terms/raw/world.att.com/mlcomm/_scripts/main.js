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





