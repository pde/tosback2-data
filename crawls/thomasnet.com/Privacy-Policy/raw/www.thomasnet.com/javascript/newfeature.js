if(navigator.cookieEnabled === true){

var sawPopup	= $.cookie("newSitePopup");

if(sawPopup == null){
	document.write('<img src="/images/images/newsite_popup.png" alt="" id="newfeature" usemap="#newsitepop" />\n');
	document.write('<map name="newsitepop" id="newsitepopid">\n');
	document.write('<area shape="rect" class="newfeatlink" coords="48,44,126,58" href="/about-thomasnet.html" ad="About_PopUp" alt="" />\n');
	document.write('<area shape="rect" class="newfeatlink" coords="83,72,238,89" href="/productsearch/" ad="About_PopUp" alt="" />\n');
	document.write('<area shape="rect" class="newfeatlink" coords="82,91,198,108" href="/profile/00150014/aerzen-usa-corp.html" ad="About_PopUp" alt="" />\n');
	document.write('<area shape="rect" class="newfeatlink" coords="310,110,430,128" href="/local.html?what=Metal+Stampings&amp;cov=SO&amp;heading=78560109&amp;location=Cincinnati%7COH%7C39.1619%7C-84.4569&amp;sortby=Featured" ad="About_PopUp" alt="" />\n');
	document.write('<area shape="rect" coords="451,12,469,30" href="javascript:void(0);" onclick="dcsExternal(\'/link.html\',\'TINCATL1=TNET&amp;');
	document.write('TINCATL2=ABOUT&amp;TINCATL3=POPUP&amp;TINCATL4=CLOSE\',\''+location.host+'\');" alt="" id="newfeatclose" />\n');
	document.write('</map>\n');

	var now = new Date();
	$("#newfeature").delay(800).fadeIn("slow");
	$.cookie('newSitePopup', now, { path: '/', domain: 'thomasnet.com' });
	$("#newfeatclose").click(function () {
		$.cookie('newSitePopup', now, { expires: 365, path: '/', domain: 'thomasnet.com' });
		$("#newfeature").fadeOut("fast");
	});
}

}
