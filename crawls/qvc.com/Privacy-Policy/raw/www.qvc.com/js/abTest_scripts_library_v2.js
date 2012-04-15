
		var cm_flashVer = GetSwfVer();
var cm_browserType = browserType;	
var cm_HasFlash = 'Flash';



var qMem = getSessionCookie('QMEM');
var manualQMem = getSessionCookie('manQMem');
var idRA = new Array('0', '1', '2','3','4','5','6','7','8','9','A','B','C','D','E','F');
var sID, tsvVar, toggle, abTestType;

var qMem_second = getSessionCookie('QMEM_second');
var manualQMem_second = getSessionCookie('manQMem_second');
var sID_second, toggle_second, abTestType_second;


sID = getQMem(qMem, manualQMem, "manQMem", 1);
sID_second = getQMem(qMem_second, manualQMem_second, "manQMem_second", 7);

function getQMem(qMem, manualQMem, cookieName, cookieDays) {
	var qID;
	if (manualQMem != null)
	{
		qID = manualQMem;
	}
	else
	{
		if (qMem != null)
		{
	  	qID = getSessionID(qMem);
	  	
		}
		else
		{
	  	var ranNum=Math.floor(Math.random()*16)
	  	setCookie(cookieName,idRA[ranNum],cookieDays)
			qID = idRA[ranNum];
			
		}
	}
	return qID;
}

function setCookie(name,value,days)
	{
	  if (days)
		{
			var date = new Date();
		  date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";

		document.cookie = name+"="+value+expires+"; path=/; domain=.qvc.com";
	}


function getSessionCookie(cookieName)
{
  var qCookie = document.cookie;
  var cookieStart = qCookie.indexOf(' ' + cookieName + '=');
  if (cookieStart == -1)
  {
    cookieStart = qCookie.indexOf('' + cookieName + '=');
  }
  
  if (cookieStart == -1)
  {
    qCookie = null;
  }
  else
  {
    cookieStart = qCookie.indexOf('=', cookieStart) + 1;
    var cookieEnd = qCookie.indexOf(';', cookieStart);
    
    if (cookieEnd == -1)
      cookieEnd = qCookie.length;
    
    qCookie = unescape(qCookie.substring(cookieStart, cookieEnd));
   }
    
  return qCookie;
}

function getSessionID(qMem) {
  var guid;
  var guidRA = qMem.split('GUID=');
  
  if (guidRA.length <=0)
    guid = 0;
  else  
    guid = guidRA[1].charAt(0);
  return guid;  
}

function hUrlOverride(){
	var hUrl = new String(window.location);
	var gid = hUrl.indexOf('group=');
	var grpID;

	if (gid <= -1)
	  grpID = 0;
	else
	  grpID = hUrl.charAt(gid + 6);	
	return grpID;
}

function getGroup(sID, toggle) {
 var group;
 var override = hUrlOverride();
 var splitValue = Math.floor((idRA.length) * toggle);
 if (override == 0)
	{
		for (i=0; i< splitValue; i++)
  	{
    	group='B';    
      if(idRA[i] == sID)
    	{
 				group = 'A';
      	break;
    	}
    }
  }
  else
  {
  	group = new String(override); 
	}
  return group;
}

function getPromoPosition(promoPosition) {
	switch (promoPosition)
	{
		case 'bottomLeft':
			containerID = 'first-child';
			break;
		case 'bottomMiddle':
			containerID = 'second-child';
			break;
		case 'bottomRight':
			containerID = 'third-child';
			break;
	 }
	 return containerID;
}

function displayBottomPromo() {
	
	$$('#first-child .promo_headline')[0].setStyle('visibility', 'visible');
	$$('#second-child .promo_headline')[0].setStyle('visibility', 'visible');
	if ($$('#promos li a .promo_headline') != 'undefined')
	{
		// custom TSV headline for waitlist
	}
	else
		$$('#third-child .promo_headline')[0].setStyle('visibility', 'visible');
	
	$$('#first-child img')[0].setStyle('visibility', 'visible');
	$$('#second-child img')[0].setStyle('visibility', 'visible');
	if ($$('#promos li img') != 'undefined')
	{
		// custom TSV image for waitlist 
	}
	else
	$$('#third-child img')[0].setStyle('visibility', 'visible');	
}

//function for rollover
function abRollover(groupID) {
	if (groupID == 'A')
  {
    //keep swatching
    
    //grab all the URL and add group in tagging
    $('alternateImg').setStyle('display', 'block');
    $('staticImg').setStyle('display', 'none');
    var placeHolder, currLink, tempLink, reRA, re, sp, spRA,lnk, group;
    var tempHref;
    var raLen = $$('#left area').length;
    for (i=0; i < raLen; i++)    
    {
    	tempHref= $$('#left area')[i].getProperty('href');
    	//alert('tempHref[' + i + '] :: ' + tempHref);
  		placeHolder = tempHref.split('?');
  		currLink = placeHolder[0];
  		re = $$('#left area')[i].getProperty('manual_cm_re');
  		reRA = re.split('-_-');  
  		re = reRA[0] + '-_-' + reRA[1] + 'A-_-' + reRA[2];
  		
  		sp = $$('#left area')[i].getProperty('manual_cm_sp');
  		spRA = sp.split('-_-');  
  		sp = spRA[0] + '-_-' + spRA[1] + 'A-_-' + spRA[2];
  		
  		lnk = currLink + '?';    	
    	$$('#left area')[i].setProperty('href' , lnk);
    	$$('#left area')[i].setProperty('manual_cm_sp' , sp);
    	$$('#left area')[i].setProperty('manual_cm_re' , re);
  		
  		
    }
    cmCreateConversionEventTag("TSV GROUP A","2","HOMEPAGE","0");
  }
  else
  {
    //display static image
    $('content').setStyle('background', 'url(' + staticImg + ') no-repeat');
    $('alternateImg').setStyle('display', 'none');
    $('staticImg').setStyle('display', 'block');   
   
    cmCreateConversionEventTag("TSV GROUP B","2","HOMEPAGE","0");
  } 
}


//function for headline/static image
function abTSVStaticImage(groupID) {
var promoLink, linkRA, re, reRA, sp, spRA;

if (groupID == 'A')
  {    
    $('content').setStyle('background', 'url(' + img1 + ')');
  }
  else
  {
    $('content').setStyle('background', 'url(' + img2 + ')');
  } 
  
 var tempLink = $$('#left a')[0].getProperty('href');
 
 		re = $$('#left a')[0].getProperty('manual_cm_re');
  	reRA = re.split('-_-');  
  	re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
  	
  	sp = $$('#left a')[0].getProperty('manual_cm_sp');
  	spRA = sp.split('-_-');  
  	sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
  	
  	$$('#left a')[0].setProperty('manual_cm_sp' , sp);
  	$$('#left a')[0].setProperty('manual_cm_re' , re);
}


//function for flash vs. static
function abFlashStatic(groupID) {
	var browserName=navigator.appName;
	var promoLink, linkRA, re, reRA, sp, spRA;
	if (groupID == 'A')
  {
    $('alternateImg').setStyle('display', 'block');  
	  $('staticImg').setStyle('display', 'none');
  }
  else
  {
    $('staticImg').setStyle('display', 'block');
    $('alternateImg').setStyle('display', 'none');
  } 
  
  var tempLink = $$('#staticImg a')[0].getProperty('href');
 	//alert('tempLink :: ' + tempLink)
 	
 	re = $$('#staticImg a')[0].getProperty('manual_cm_re');
 	reRA = re.split('-_-');  
 	re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
 	
 	sp = $$('#staticImg a')[0].getProperty('manual_cm_sp');
 	spRA = sp.split('-_-');  
 	sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
 	
 	$$('#staticImg a')[0].setProperty('manual_cm_sp' , sp);
 	$$('#staticImg a')[0].setProperty('manual_cm_re' , re);
 	
 }

//function for tsv container link
function abTSVContainerLink(groupID) { 	
  if (groupID == 'A')
  {
		currLink = linkA;
 	}
  else
  {
    //display search redirect
    currLink = linkB;
  } 
  
  re = $$('#left a')[0].getProperty('manual_cm_re');
  reRA = re.split('-_-');  
  re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
  
  sp = $$('#left a')[0].getProperty('manual_cm_sp');
  spRA = sp.split('-_-');  
  sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
  
  	
 lnk = currLink + '?';    	
 $$('#left a')[0].setProperty('href' , lnk);
 $$('#left a')[0].setProperty('manual_cm_sp' , sp);
 $$('#left a')[0].setProperty('manual_cm_re' , re);
  
}

//function for tsv container & backup promo small container
function abTSVSmallContainer(groupID, promoPosition) {
	var containerID, cmRA, cmLink, tempLink, templinkRA, cmRE;
	
	containerID = getPromoPosition(promoPosition);
	
	if ($(otoPosition))
	{		
		if (groupID == 'A')
		{
			//var linkRA, tsvLink, promoLink;
			$('content').setStyle('background', 'url(' + tsvBg + ') no-repeat');
			$('left').setStyle('display', 'inline');
			$('right').setStyle('display', 'inline');
			$('altLeft').setStyle('display', 'none');
			$('altRight').setStyle('display', 'none');
			
			tsvLink = $$('#left a')[0].getProperty('href');
			cmRA = tsvLink.split('-_-');
			cmLink= cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2] + '-_-' + cmRA[3] + groupID + '-_-' + cmRA[4];
			//alert('cmLink :: ' + cmLink);

		
			templinkRA  = cmTagRE.split('-_-');
			cmRE = templinkRA[0] + '-_-' + templinkRA[1] + groupID + '-_-' + templinkRA[2];
		
			var re = $$('#left a')[0].getProperty('manual_cm_re');
  		var reRA = re.split('-_-');  
  		re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
  	
  		// no longer displaying site promo tag in small containers
  		var sp = $$('#left a')[0].getProperty('manual_cm_sp');
  		var spRA = sp.split('-_-');  
  		sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
			//alert('sp :: ' + sp);
			
			tempLink = $$('#' + containerID + ' a')[0].getProperty('href');
			
			$$('#left a')[0].setProperty('manual_cm_re', re);
			$$('#left a')[0].setProperty('manual_cm_sp', sp);
			var cm = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
			cmRA = cm.split('-_-');
			cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
			$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
			
		}
		else
		{
			$('content').setStyle('background', 'url(' + altBg + ') no-repeat');
			$('left').setStyle('display', 'none');
			$('right').setStyle('display', 'none');
			$('altLeft').setStyle('display', 'inline');
			$('altRight').setStyle('display', 'inline');
			
			$$('#' + containerID + ' img')[0].setProperty('src', imgLink);
			$$('#' + containerID + ' .promo_headline')[0].setText(headline);			
			$$('#' + containerID + ' .promo_caption')[0].setText(caption);
			
			
			tempLink = $$('#altLeft a')[0].getProperty('href');
			cmRA = tempLink.split('-_-');
			cmLink= cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2] + '-_-' + cmRA[3] + groupID + '-_-' + cmRA[4];
			
			templinkRA  = cmTagRE.split('-_-');
			cmRE = templinkRA[0] + '-_-' + templinkRA[1] + groupID + '-_-' + templinkRA[2];
			
			var re = $$('#altLeft a')[0].getProperty('manual_cm_re');
  		var reRA = re.split('-_-');  
  		re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
  		
  		//var sp = $$('#altLeft a')[0].getProperty('manual_cm_sp');
  		//var spRA = sp.split('-_-');  
  		//sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
			
			
			$$('#altLeft a')[0].setProperty('manual_cm_re', re);
			$$('#altLeft a')[0].setProperty('manual_cm_sp', sp);
			$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
			$$('#' + containerID + ' a').setProperty('href', promoLink);
		}
	}
	
	displayBottomPromo();	
}

//function for tsv container & backup promo small container
function abDblLinkSmallContainer(groupID, promoPosition) {
	var containerID, cmRA, cmRASP, cmLink, tempLink, templinkRA, cmRE;
	
	containerID = getPromoPosition(promoPosition);
	
	$('altLink').setStyle('visibility', 'visible');
	if ($(otoPosition))
	{		
		if (groupID == 'A')
		{
			var linkRA, tsvLink, promoLink;
			$('altLink').setStyle('visibility', 'visible');
			tsvLink = $$('#altLink a')[0].getProperty('href');
			cmRA = tsvLink.split('-_-');
			cmLink= cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2] + '-_-' + cmRA[3] + groupID + '-_-' + cmRA[4];

		
			templinkRA  = cmTagRE.split('-_-');
			cmRE = templinkRA[0] + '-_-' + templinkRA[1] + groupID + '-_-' + templinkRA[2];
		
			var re = $$('#altLink a')[0].getProperty('manual_cm_re');
  		var reRA = re.split('-_-');  
  		re = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
  	
  		var sp = $$('#altLink a')[0].getProperty('manual_cm_sp');
  		var spRA = sp.split('-_-');  
  		sp = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
			
			tempLink = $$('#' + containerID + ' a')[0].getProperty('href');
			
			
				$$('#altLink a')[0].setProperty('manual_cm_re', re);
				$$('#altLink a')[0].setProperty('manual_cm_sp', sp);
				var cm = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
				cmRA = cm.split('-_-');
				cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
				$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
			
		}
		else
		{
			var newLinkName = $$('#' + containerID + ' .promo_headline')[0].getText();
			var newLinkHref = $$('#' + containerID + ' a')[0].getProperty('href');
	
			
			$('altLink').setStyle('visibility', 'visible');
						
			var reRA = cmTagRE.split('-_-');
			var cmRE = reRA[0] + '-_-' + reRA[1] + groupID + '-_-' + reRA[2];
			var tagRE_dbl = cmTagRE_dbl.split('-_-');
			var cmRE_dbl = tagRE_dbl[0] + '-_-' + tagRE_dbl[1] + groupID + '-_-' + tagRE_dbl[2];
			var tagSP_dbl = cmTagSP_dbl.split('-_-');
			var cmSP_dbl = tagSP_dbl[0] + '-_-' + tagSP_dbl[1] + groupID + '-_-' + tagSP_dbl[2];
			
			
				$$('#altLink a')[0].setProperty('href', newLinkHref);
				$$('#altLink a')[0].setProperty('manual_cm_re', cmRE_dbl);
				$$('#altLink a')[0].setProperty('manual_cm_sp', cmSP_dbl);
			
				$$('#' + containerID + ' a').setProperty('href', promLink);
				$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
			
			
			$$('#altLink a')[0].setText(newLinkName);
			$$('#' + containerID + ' img')[0].setProperty('alt', headline);
			$$('#' + containerID + ' img')[0].setProperty('src', imgLink);			
			$$('#' + containerID + ' .promo_headline')[0].setText(headline);
			$$('#' + containerID + ' .promo_caption')[0].setText(caption);
		}
	}
	
	displayBottomPromo();	
}


//function for 2 bottom row continer 
function abTestBottom(groupID, promoPosition) {
	//var browserName=navigator.appName;
	var containerID, cmRA, cmRE;
	var tempLink, linkRA;	
	
	containerID = getPromoPosition(promoPosition);
	
		if (groupID == 'A')
		{
			var linkRA, tempLink, promoLink;
			
			tempLink = $$('#' + containerID + ' a')[0].getProperty('href');
			
				var cm = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
				cmRA = cm.split('-_-');
				cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
				$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
						
		}
		else
		{
			var tempLinkRA
			
			if (containerID == 'first-child')
			{
				tempLinkRA = '2';
			}
			else if (containerID == 'second-child')
			{
				tempLinkRA = '3';
			}
			else if (containerID == 'third-child')
			{
				tempLinkRA = '4';
			}
			
			if (promLink)
			{				
				//take new url and add groupID in tag
				templinkRA  = cmTagRE.split('-_-');
				cmRE = templinkRA[0] + '-_-' + templinkRA[1] + groupID + '-_-' + templinkRA[2];
				
				//linkRA = promLink.split('-_-');
				//tempLink = linkRA[0] + '-_-' + tempLinkRA + groupID + '-_-' + linkRA[2];
				$$('#' + containerID + ' a').setProperty('href', promLink);	
				$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);				
			}
			else
			{
				//alert('else')
				tempLink = $$('#' + containerID + ' a')[0].getProperty('href');
				
					var cm = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
					cmRA = cm.split('-_-');
					cmRE = cmRA[0] + '-_-' + tempLinkRA + groupID + '-_-' + cmRA[2];
					$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);			
				
			}			
			
			if (imgLink)
			{
				$$('#' + containerID + ' img')[0].setProperty('src', imgLink);
			}
			
			//if (alttag)
			//	$$('#' + containerID + ' img')[0].setProperty('alt', alttag);
			//
			if (headline)
				$$('#' + containerID + ' .promo_headline')[0].setHTML(headline);
			
			if (caption)
				$$('#' + containerID + ' .promo_caption')[0].setHTML(caption);
		}
	displayBottomPromo();
} 


function abNavPromo(groupID, promoPosition, navPosition) {
	var containerID, cmRA, cmRE, cmNav, cmNavRA, cmNavRE;
	var tempLink, linkRA;
	var nTempLink, nLinkRA, nLink;
	
	if ($(otoPosition))
	{
	
	var navLink = $$('#communityNav a')[navPosition];
	
	containerID = getPromoPosition(promoPosition);
	
	if (groupID == 'A')
	{
		tempLink = $$('#' + containerID + ' a')[0].getProperty('href');
		nTempLink = $$('#communityNav a')[navPosition].getProperty('href');
				
		
			var cm = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
			cmRA = cm.split('-_-');
			cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
			
			var cmNav = navLink.getProperty('manual_cm_re');
			cmNavRA = cmNav.split('-_-');
			cmNavRE = cmNavRA[0] + '-_-' + cmNavRA[1] + groupID + '-_-' + cmNavRA[2];
			
			$$('#' + containerID + ' a').setProperty('manual_cm_re', cmRE);
			navLink.setProperty('manual_cm_re', cmNavRE); 
					  		
	}
	else
	{
		
		var newNavLink, newNavHeadline;
		
		nTempLink = $$('#' + containerID + ' a')[0].getProperty('href');
		nTempLinkCM = $$('#' + containerID + ' a')[0].getProperty('manual_cm_re');
		cmNavRA = nTempLinkCM.split('-_-'); 
		cmNavRE = 'LN-_-SPOTLIGHTON-_-' + navPosition + groupID + ':' + cmNavRA[cmNavRA.length-1];
		

		
			navLink.setProperty('href', nTempLink);
			navLink.setProperty('manual_cm_re', cmNavRE);
		
		
		
		if (navHeadline)
			newNavHeadline = navHeadline;
		else
			newNavHeadline = $$('#' + containerID + ' .promo_headline')[0].getText();
		
		navLink.setText(newNavHeadline);
		
		var cmTagRA = cmTagRE.split('-_-');
		var promoCM = cmTagRA[0] + '-_-' + cmTagRA[1]  + groupID + '-_-' + cmTagRA[2];
		
		
			$$('#' + containerID + ' a').setProperty('href', promoLink);
			$$('#' + containerID + ' a').setProperty('manual_cm_re', promoCM);
		
		
		$$('#' + containerID + ' img')[0].setProperty('alt', headline);
		$$('#' + containerID + ' img')[0].setProperty('src', imgLink);
		$$('#' + containerID + ' .promo_headline')[0].setText(headline);
		$$('#' + containerID + ' .promo_caption')[0].setText(caption);

		}
	}
	displayBottomPromo();
}

//function to test 2 different double block links
function abDblLinks(groupID) {
	var cm, cmRA, cmRE;
	var sp, spRA, cmSP;
	var raLen, divName;
	
	if (groupID == 'A')
	{
		$('right').setStyle('display', 'block');
		raLen = $$('#right a').length;
		divName = 'right';	
		
	}
	else
	{
		$('rightAlt').setStyle('display', 'block');
		raLen = $$('#rightAlt a').length;
		if (altBack != 'undefined')
		{
			$('content').setStyle('background','url('+ altBack +'?qlt=95,1&hei=375&wid=685&op_sharpen=1)');
		}
		divName = 'rightAlt';
	}
	
	for (i=0; i < raLen; i++)
	{
		cm = $$('#'+ divName +' a')[i].getProperty('manual_cm_re');
		cmRA = cm.split('-_-');
		cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
		$$('#' + divName + ' a')[i].setProperty('manual_cm_re', cmRE);
		
		sp = $$('#' + divName + ' a')[i].getProperty('manual_cm_sp');
		spRA = sp.split('-_-');
		cmSP = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
		$$('#' + divName + ' a')[i].setProperty('manual_cm_sp', cmSP);
	}
}

//function to test 2 versions of the ENTIRE bottom row (example: event driven vs. regular promotion)
function abBtmRows(groupID) {
	var cmTagRE_old, newTag, cmTagStr, array_temp;
	var promoSpot = ['first-child', 'second-child', 'third-child'];
	var promoLink = [btmPromo2_link, btmPromo3_link, btmPromo4_link];
	var promoHeadline = [btmPromo2_headline, btmPromo3_headline, btmPromo4_headline];
	var promoCaption = [btmPromo2_caption, btmPromo3_caption, btmPromo4_caption];
	var promoImg = [btmPromo2_img, btmPromo3_img, btmPromo4_img];
	var promoAlt = [btmPromo2_alt, btmPromo3_alt, btmPromo4_alt];
	var promoRE = [btmPromo2_re, btmPromo3_re, btmPromo4_re];
	
	if (groupID == 'A')
	{
		// display info entereed in CGen with updated Coremetrics
		
		
		for (i=0; i< promoSpot.length; i++)
		{		
			cmTagRE_old= $$('#' + promoSpot[i] + ' a')[0].getProperty('manual_cm_re');
			newTag = getCMTag(cmTagRE_old);		
			$$('#' + promoSpot[i] + ' a').setProperty('manual_cm_re', newTag);
		}
	}
	else {
		for (i=0; i< promoSpot.length; i++)
		{
			$$('#' + promoSpot[i] + ' a').setProperty('href', promoLink[i]);
			$$('#' + promoSpot[i] + ' .promo_headline').setHTML(promoHeadline[i]);
			$$('#' + promoSpot[i] + ' .promo_caption').setHTML(promoCaption[i]);
			$$('#' + promoSpot[i] + ' img').setProperty('src', promoImg[i]);
			$$('#' + promoSpot[i] + ' img').setProperty('alt', promoAlt[i]);
			
			cm = promoRE[i];
			cmRA = cm.split('-_-');
			cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
			$$('#' + promoSpot[i] + ' a').setProperty('manual_cm_re', cmRE);			
		}
	}
	
	$('promos').setStyle('visibility', 'visible');
}
//function to test OTO location (main containers vs. small container)
function abOTO(groupID)
{
	var cm, cmRA, cmRE;
	var cm_oto, cmRA_oto, cmRE_oto;
	var sp, spRA, cmSP;
	//alert(groupID);
	if (groupID == 'A')
	{
		//keep promo as is and add tagging 
		$('content').setStyle('display', 'block');
		$('left').setStyle('display', 'block');
		
		//add group id in tag
		cm = $$('#left a')[0].getProperty('manual_cm_re');
		cmRA = cm.split('-_-');
		cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
		//alert('real estate tag :: ' + cmRE);
		$$('#left a').setProperty('manual_cm_re', cmRE);
		
		sp = $$('#left a')[0].getProperty('manual_cm_sp');
		spRA = sp.split('-_-');
		cmSP = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
		//alert('site promo tag :: ' + cmSP);
		$$('#left a').setProperty('manual_cm_sp', cmSP);
		
		//OTO small container tagging
		cm_oto = $$('#promos .btmRow-oto a')[0].getProperty('manual_cm_re');
		cmRA_oto = cm_oto.split('-_-');
		cmRE_oto = cmRA_oto[0] + '-_-' + cmRA_oto[1] + groupID + '-_-' + cmRA_oto[2];
		//alert('real estate tag :: ' + cmRE);
		$$('#promos .btmRow-oto a').setProperty('manual_cm_re', cmRE_oto);
	}
	else
	{
		//alert('group B');
		//switch container and add tagging
		//small containter
		$$('#promos .btmRow-oto').setStyle('background-image', 'url("http://images-p.qvc.com/is/image/pic/templates/promo_blank.gif")');
		$$('#promos .btmRow-oto a img').setStyle('padding', '5px 3px 1px');
		$$('#promos .btmRow-oto a').setProperty('href', btmPromo_link);
		$$('#promos .btmRow-oto .promo_headline').setHTML(btmPromo_headline);
		$$('#promos .btmRow-oto .promo_headline').setStyle('color', '#3c3c3c');
		$$('#promos .btmRow-oto .promo_caption').setHTML( btmPromo_caption);
		$$('#promos .btmRow-oto img').setProperty('src', btmPromo_img);
		$$('#promos .btmRow-oto img').setProperty('alt', btmPromo_alt);
		
		//main container
		if ($$('#promos .btmRow-oto').length <=0)
		{
			// no OTO
			$('content').setStyle('display', 'block');
			$('left').setStyle('display', 'block');
		}
		else
		{
			$('otoSpots').setStyle('display','block');
			$('content').setStyle('background', 'url(http://images-p.qvc.com/is/image/pic/hp/hp_oto_20110411.jpg?qlt=95,1&hei=375&wid=685&op_sharpen=1)');
			$('content').setStyle('display', 'block');
			cm = btmPromo_re;
			cmRA = cm.split('-_-');
			cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
			//alert(cmRE);
			$$('#promos li.btmRow-oto a').setProperty('manual_cm_re', cmRE);
		
			//metrics for main container
			var mainLinks = ['otoMain']
			for (var i=0; i< mainLinks.length; i++)
			{			
				cm = $$('#' + mainLinks[i] + ' a')[0].getProperty('manual_cm_re');
				cmRA = cm.split('-_-');
				cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
				//alert('real estate tag :: ' + cmRE);
				$$('#' + mainLinks[i] + ' a').setProperty('manual_cm_re', cmRE);
		  	
				sp = $$('#' + mainLinks[i] + ' a')[0].getProperty('manual_cm_sp');
				spRA = sp.split('-_-');
				cmSP = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
				//alert('site promo tag :: ' + cmSP);
				$$('#' + mainLinks[i] + ' a').setProperty('manual_cm_sp', cmSP);
			}
		}
	}
}
//NEW function to test OTO location (main containers vs. small container)
function abOTONew(groupID)
{
	var cm, cmRA, cmRE;
	var cm_oto, cmRA_oto, cmRE_oto;
	var sp, spRA, cmSP;
	
	if ((isTSV == tsvNumber) || ((waitlistYN == 'true') && (otoYN != 'true'))) {
		otoBackUp();
		return;
	}
	
	if (groupID == 'A')
	{
		otoBackUp();
		
		//add group id in tag
		cm = $$('#left a')[0].getProperty('manual_cm_re');
		cmRA = cm.split('-_-');
		cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
		//alert('real estate tag :: ' + cmRE);
		$$('#left a').setProperty('manual_cm_re', cmRE);
		
		sp = $$('#left a')[0].getProperty('manual_cm_sp');
		spRA = sp.split('-_-');
		cmSP = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
		//alert('site promo tag :: ' + cmSP);
		$$('#left a').setProperty('manual_cm_sp', cmSP);
		
		//OTO small container tagging
		cm_oto = $$('#promos .btmRow-oto a')[0].getProperty('manual_cm_re');
		cmRA_oto = cm_oto.split('-_-');
		cmRE_oto = cmRA_oto[0] + '-_-' + cmRA_oto[1] + groupID + '-_-' + cmRA_oto[2];
		//alert('real estate tag :: ' + cmRE);
		$$('#promos .btmRow-oto a').setProperty('manual_cm_re', cmRE_oto);
	}
	else
	{		
		//small containter
		$$('#promos .btmRow-oto').setStyle('background-image', 'url("http://images-p.qvc.com/is/image/pic/templates/promo_blank.gif")');
		$$('#promos .btmRow-oto a img').setStyle('padding', '5px 3px 1px');
		$$('#promos .btmRow-oto a').setProperty('href', btmPromo_link);
		$$('#promos .btmRow-oto .promo_headline').setHTML(btmPromo_headline);
		$$('#promos .btmRow-oto .promo_headline').setStyle('color', '#3c3c3c');
		$$('#promos .btmRow-oto .promo_caption').setHTML( btmPromo_caption);
		$$('#promos .btmRow-oto img').setProperty('src', btmPromo_img);
		$$('#promos .btmRow-oto img').setProperty('alt', btmPromo_alt);
		
		//main container
		if ($$('#promos .btmRow-oto').length <=0)
		{
			// no OTO
			$('content').setStyle('display', 'block');
			$('left').setStyle('display', 'block');
		}
		else
		{
			$('otoSpots').setStyle('display','block');
			//$('content').setStyle('background', 'url(http://images-p.qvc.com/is/image/pic/hp/hp_oto_20110411.jpg?qlt=95,1&hei=375&wid=685&op_sharpen=1)');
			$('content').setStyle('display', 'block');
			cm = btmPromo_re;
			cmRA = cm.split('-_-');
			cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
			//alert(cmRE);
			$$('#promos li.btmRow-oto a').setProperty('manual_cm_re', cmRE);
		
			//metrics for main container
			var mainLinks = ['otoMain']
			for (var i=0; i< mainLinks.length; i++)
			{			
				cm = $$('#' + mainLinks[i] + ' a')[0].getProperty('manual_cm_re');
				cmRA = cm.split('-_-');
				cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
				//alert('real estate tag :: ' + cmRE);
				$$('#' + mainLinks[i] + ' a').setProperty('manual_cm_re', cmRE);
		  	
				sp = $$('#' + mainLinks[i] + ' a')[0].getProperty('manual_cm_sp');
				spRA = sp.split('-_-');
				cmSP = spRA[0] + '-_-' + spRA[1] + groupID + '-_-' + spRA[2];
				//alert('site promo tag :: ' + cmSP);
				$$('#' + mainLinks[i] + ' a').setProperty('manual_cm_sp', cmSP);
			}
		}
	}
	/*var groupID = getGroup(sID, toggle);
	var cmLocal_attributes = getTagAttributes(groupID);*/
}

function getCMTag(cmTag) {
	var cmRA, cmRE;
	cmRA = cmTag.split('-_-');
	cmRE = cmRA[0] + '-_-' + cmRA[1] + groupID + '-_-' + cmRA[2];
	return cmRE;
}

function abGuestCheckout(groupID)
{
	if (groupID == 'A')
	{    
		//Group B is actually test for Guest Checkout
		//Parms - event category,event type,event name,event points
		//cmCreateConversionEventTag("GROUP B","2","TESTING","0");
		
		// NewQ
		if( $('createAccountTitle') )
		{
			$('createAccountTitle').setHTML("New Account Information");
		}
		
		// NewQ & Checkout & Csweb
		if( $('createAccountText') )
		{
			$('createAccountText').setHTML("<p>Creating a QVC account allows you to place orders quickly and easily. You'll also receive email order and shipping confirmations. An 8-digit customer number will be provided on the next screen. <a href=\"#TB_inline?height=150&width=600&inlineId=overlaywrap\" class=\"smoothbox\" title=\"\">View more benefits of signing up</a>");
			TB_init();
		}
		// NewQ & Checkout & Csweb
		if( $('becomeMember') )
		{
			$('becomeMember').setHTML("<h2>Here are just a few reasons to become a Q Member:</h2><ul><li>Shop online with confidence.</li><li>Store your shipping and payment information for quick check out. </li><li>Track the status of your order from the moment we receive it. </li><li>Provide us with your e-mail address and be the first to learn about upcoming special events, new products, and more, via our E-Newsletters.</li></ul>");
			TB_init();
		}

		// NewQ
		if( $('pinTextAbove') )
		{
			$('pinTextAbove').setStyle('display','block');
		}
		
		// NewQ - Welcome
		if( $('headTitle') && ( strMemberNumber != "" ) )
		{
			$('headTitle').setHTML("Thanks for Signing Up!");
			document.title = "Thanks for signing up for a QVC Account.";
		}
		
		// NewQ - Welcome
		if( $('welcomeMessage') && $('welcomeMessage').getText().match( "hand" ) )
		{
			if( $('welcomeMessageB') )
			{
				$('welcomeMessage').setHTML( $('welcomeMessageB').innerHTML );
			}
		}

	}
	else
	{
		//Parms - event category,event type,event name,event points
		//cmCreateConversionEventTag("GROUP A","2","TESTING","0");
		
		// NewQ
		if( $('pinTextBelow') )
		{
			$('pinTextBelow').setStyle('display','block');
		}

		// NewQ - Welcome
		if( $('headTitle') && ( strMemberNumber != "" ) )
		{
			$('headTitle').setHTML("Congratulations! You're a Q Member");
		}
		
		// NewQ - Welcome
		if( $('welcomeMessage') )
		{
			$('welcomeMessage').setStyle('display','block');
		}
		
		// NewQ & Checkout
		if( $('becomeMember') )
		{
			$('becomeMember').setHTML("<h2>Here are just a few reasons to become a Q Member:</h2><ul><li>Shop online with confidence.</li><li>Store your shipping and payment information for quick check out. </li><li>Track the status of your order from the moment we receive it. </li><li>Provide us with your e-mail address and be the first to learn about upcoming special events, new products, and more, via our E-Newsletters.</li></ul>");
			TB_init();
		}

	}
	
	// NewQ
	if( $('createAccountTitle') )
	{
		$('createAccountTitle').setStyle('visibility', 'visible');
	}
	
	// NewQ
	if( $('createAccountText') )
	{
		$('createAccountText').setStyle('visibility', 'visible');
	}
	
	// NewQ - Welcome
	if( $('welcomeMessage') )
	{
		$('welcomeMessage').setStyle('display','block');
	}

	// NewQ - Welcome
	if( $('welcomeMessageB') )
	{
		$('welcomeMessageB').setHTML( "" );
	}
}

function abLastFiveOnAir(groupID)
{
	if (groupID == 'B')
	{
		$('IROA_Background').setStyle('display','block');
		cmCreateConversionEventTag("GROUP B","2","HOMEPAGE","0");
	}
	else
	{
		cmCreateConversionEventTag("GROUP A","2","HOMEPAGE","0");
	}
}

var groupID, groupID_second;
  	

function getTagAttributes(groupID) {
	var abAttributes = 'Homepage|Group' + groupID + '|' + abTestType;
	var flashAttributes = cm_browserType + '|Flash|' + cm_flashVer; 
	var cmAttributes = '-_--_--_-' + flashAttributes + '-_-' + abAttributes;
	return cmAttributes;
}

window.addEvent("domready", function(){
	var abAttributes;
  groupID = getGroup(sID, toggle);
  if (toggle) {
		switch (abTestType)
		{
			case 'rollover':
				abRollover(groupID);
				break;
			case 'staticImg':
				abTSVStaticImage(groupID);
				break;
			case 'flashStatic':
				abFlashStatic(groupID);
				break;
			case 'tsvLink':
				abTSVContainerLink(groupID);
				break;
			case 'tsvSmallPromo':
				abTSVSmallContainer(groupID, promoSpot);
				break;	
			case 'dblSmallPromo':
				abDblLinkSmallContainer(groupID, promoSpot);
				break;		
			case 'bottomContainer':
				abTestBottom(groupID, promoSpot);
				break;
			case 'navPromo':		
				abNavPromo(groupID, promoSpot, navPosition);
				break;
			case 'dblBlockLinks':		
				abDblLinks(groupID);
				break;
			case 'btmRows':		
				abBtmRows(groupID);
				break;
			case 'otoSpot':		
				abOTO(groupID);
				break;
			case 'otoSpotNew':		
				abOTONew(groupID);
				break;
		}
	
  }
	

  //Secondary AB Testing
  if (toggle_second) {
  var groupID;
	var override = hUrlOverride();
  	
  	if (override == 0)
  	{
  	  groupID = getGroup(sID_second, toggle_second);
  	}
  	else
  	{
  	  groupID = new String(override);
  	}

	switch (abTestType_second)
	{
		case 'LastFiveOnAir':
			abLastFiveOnAir(groupID);
			break;
		case 'guestCheckout':
			abGuestCheckout(groupID);
			break;
	}
  }
});
