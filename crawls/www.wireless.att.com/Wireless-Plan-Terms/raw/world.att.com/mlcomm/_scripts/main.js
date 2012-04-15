// JavaScript Document


 
 
brow = navigator.userAgent;
x = brow.lastIndexOf('6.0');
if(x != '-1') { browser = 'IE6'}
else{ browser = 'realBrowser';}
 


function renderFooter() {
	document.write('<div class="clear"></div>');
	document.write('<div id="inner-footer">');
	document.write('<ul id="footerNav">');
	document.write('    	<li><a href="/index.html?id=' + state + '" title="Home">Home</a></li>');
	document.write('    	<li><a href="/about_att/index.html?id=' + state + '" title="About AT&amp;T">About AT&amp;T </a></li>');
	document.write('    	<li><a href="http://www.att.com/gen/careers?pid=1" title="Careers">Careers</a></li>');
	document.write('    	<li><a href="http://www.wireless.att.com/find-a-store/" title="Store locator">Store locator</a></li>');
	document.write('    	<li><a href="/help/contact_us.html?id=' + state + '" title="Contact us">Contact us</a></li>');
	document.write('    	<li><a href="/privacy_policy/index.html?id=' + state + '" title="Privacy policy">Privacy policy</a></li>');
	document.write('    	<li><a href="/privacy_policy/privacy_terms_of_use.html?id=' + state + '" class="nb" title="Terms of use">Terms of use</a></li>');
	document.write('    </ul>');
	document.write('    <div class="clear"></div>');
	document.write('    <p><a href="http://www.att.com/gen/privacy-policy?pid=2587" class="nb" title="AT&amp;T Intellectual Property">© 2003-2012 AT&amp;T Intellectual Property.</a>  All rights reserved. <a href="http://www.yellowpages.com" class="nb">YELLOWPAGES.COM</a></p>');
	document.write('</div>');
	
	document.write('<div id="pop"> </div>');
}
 




function renderAnalyticsCode() {
document.write('<script>');
document.write(' url = location.href; ');
document.write('checkLive = url.indexOf(\'english-asian-redesign-att.fhstage1.com\');  ');  
document.write(' if(checkLive != \'-1\') { ');
document.write('_uacct = "UA-273710-14"; ');
document.write('urchinTracker(); ');
document.write('}   ');
document.write('</script>');
}