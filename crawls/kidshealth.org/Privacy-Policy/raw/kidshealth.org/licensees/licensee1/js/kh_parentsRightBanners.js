// Parent right banner includes
// 2008 Marcos Drake
// Example Link Below

//document.write("<a href=\"http://www.nemours.org\" target=\"_blank\"><img src=\"/licensees/licensee1/images/IRParents/banners/brightStartComcastBanner.png\" width=\"124\" height=\"333\" alt=\"\" /></a>");

//document.write("<div id=\"khAdSpace\"><div id=\"khAdTop\"><a href=\"/parent/kh_misc/sponsorship_policy.html\" target=\"_blank\">From KidsHealth:</a></div><div id=\"khAdBody\"><a href=\"http://www.pinklockersociety.org/pls_portal.html\" target=\"_blank\"><img src=\"/images/khAds/test/160test.png\" width=\"160\" height=\"600\" alt=\"Test Ad Banner\" /></a></div><div id=\"khAdFoot\"><a href=\"/parent/kh_misc/sponsorship_opps.html\" target=\"_blank\">Be a KidsHealth Sponsor</a></div></div>");

/*function adspace() {
GA_googleFillSlot(KHAdCat);
alert(KHAdCat);
}

adspace();*/
function doGam() {
//document.write('<script type="text/javascript" src="/licensees/licensee1/js/gam.js?1"><\/script>');
document.write('<iframe src="/licensees/licensee1/js/gam.html?'+new Date().getTime()+'" width="160" height="750" id="gamFrame" frameborder="no" style="border: 0 none; background: transparent;" allowtransparency="true" name="gamFrame" scrolling="no"><\/iframe>');

	
	// gamRefresh moved here so as to only have any effect if refNemours is null
	document.write('<script type="text/javascript">function gamRefresh(url) { document.getElementById(\'gamFrame\').src=url; }<\/script>');

}

function doGam2() {
document.write('<script type="text/javascript" src="/licensees/licensee1/js/gam.js?2"><\/script>');
}


/*function refTest() {
	
if (document.referrer.indexOf('nemours') > -1) {
// do nothing
}
else {
doGam();
}
}

refTest();*/

function checkCookieNemours() {
var nemCheck = readTheCookie('refNemours');
var referringURL = document.referrer;
var referringURLowerCase = referringURL.toLowerCase();
//First check to see if a Nemours cookie exists
if(nemCheck == '1') {
	//Recreate the cookie to reset the timer
	createTheCookie('refNemours','1','.5');
	//do no more (don't display ads)
	//alert("cookie existed");
	}
	
//Next, if there's no cookie, check if the user was referred from Nemours, medlineplus, nlm, nih or mobilewebby
else if(referringURLowerCase.indexOf('nemours') >-1 || referringURLowerCase.indexOf('medlineplus') >-1 || referringURLowerCase.indexOf('nlm') >-1 || referringURLowerCase.indexOf('nih') >-1 || referringURLowerCase.indexOf('mobilewebby') >-1) {
	//This user was sent from a no-ad site so let's create a cookie
	createTheCookie('refNemours','1','.5');
	//do no more (don't display ads)
	}
	
//If none of the above conditions are true then the user either didn't come from a no-ad site
//or their session has timed out -- show the ads
else {
	doGam();	
	}
}
			
function createTheCookie(name,value,days) {
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*60*60*1000));
		var expires = "; expires="+date;
		//alert(date);
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
	
function readTheCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//The following will check cookie/referrer then show ads if appropriate
checkCookieNemours();

//document.write("<a href=\"/licensees/licensee1/js/gam.inc\" target=\"gamFrame\">refresh test</a>");
//document.write('<a href="/licensees/licensee1/js/gam.html?"'+new Date().getTime(+1)+' target="gamFrame">Refresh Test</a>');
// alert(KHAdCat);

function gamHTML() {
var KHAdCat = "parent_general";
GS_googleAddAdSenseService("ca-pub-6880126275411370");
GS_googleEnableAllServices();
GA_googleAddSlot("ca-pub-6880126275411370", "parent_general");
GA_googleAddAttr("subcat", "parent_general_body_basics");
GA_googleFetchAds();
GA_googleFillSlot("parent_general");	
}

	/* 
	Marc: 01/05/2010
	Moved gamRefresh to be triggered when refNemours cookie is null 
	and use empty gamRefresh function if refNemours is positive, as
	called by khCommon.js previously to fix an issue with BWWT pages
	with pagination
	
	function gamRefresh(url) {
			document.getElementById('gamFrame').src=url;
		}
		*/