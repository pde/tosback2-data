var ns4 = (document.layers) ? true:false;			// Variable to track Netscape browser
var ie = (document.all) ? true:false;				// Variable to track Explorer browser
var mac = navigator.appVersion.indexOf('Mac');		// Variable to track Macintosh platform
mac = (mac != -1) ? true:false;
if (ns4) initHeight =  window.innerHeight;
if (ns4) initWidth = window.innerWidth;

//redirect for Netscape 4.0
if (navigator.appName=="Netscape"&&parseFloat(navigator.appVersion)< 4.7)
	window.location = "/creditexpert/common/net40.jsp"

//Universal window.open function
function openWindow(URL,name,props) {
	window.open(URL,name,props);
}
//Log in popup window
function openLoginWindow() {
  window.open('../creditmanager/011_0_ce_login.jsp','loginWindow','width=257,height=185,screenX=300,screenY=200,left=300,top=200');
}
// A function to reload the page on a user resize
function reDo() {
	if (ns4) document.location = document.location; 
}

// function bogusResize
// A function to fix the Netscape CSS resize bug
function bogusResize()
{
 /* if (navigator.appName == 'Netscape')
   {
	if ((window.innerWidth != initWidth) || (window.innerHeight != initHeight))
	{
	  location.reload();
	}
 }*/
}

//onresize = bogusResize;

// function clearMaxSearch
// Clears the search tax from the Max menu
function clearMaxSearch() {
	if (is.nav) {
		document.askMax.document.forms['frmAskMaxSearch'].txtSearchString.value = "";
	}
	else if (is.ie) {
		document.forms['frmAskMaxSearch'].txtSearchString.value="";
	}
}

//these functions handle the rollovers and layer behavior for tabbed navigation

function preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.p) d.p=new Array();
    var i,j=d.p.length,a=preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.p[j]=new Image; d.p[j++].src=a[i];}}
}

function swapImage() { //v3.0
  var i,j=0,x,a=swapImage.arguments; document.sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=findObj(a[i]))!=null){document.sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function swapImgRestore() { //v3.0
  var i,x,a=document.sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function nbGroup(event, grpName) { //v3.0
  var i,img,nbArr,args=nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = findObj(args[2])) != null && !img.init) {
      img.init = true; img.up = args[3]; img.dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = findObj(args[i])) != null) {
        if (!img.up) img.up = img.src;
        img.src = img.dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = findObj(args[i])) != null) {
      if (!img.up) img.up = img.src;
      img.src = (img.dn && args[i+2]) ? args[i+2] : args[i+1];
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.nbOver.length; i++) {
      img = document.nbOver[i]; img.src = (img.dn) ? img.dn : img.up; }
  } else if (event == "down") {
    if ((nbArr = document[grpName]) != null)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.up; img.dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = findObj(args[i])) != null) {
      if (!img.up) img.up = img.src;
      img.src = img.dn = args[i+1];
      nbArr[nbArr.length] = img;
  } }
}

function showHideLayers() { //v3.0
  var i,p,v,obj,args=showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

window.onbeforeunload=addTrackingImage;
function addTrackingImage()
  { 
    var randomnumber=Math.floor(Math.random()*100000000)
	var img = document.createElement('IMG');
	img.setAttribute('src', 'Images/tracking_pixel_unload.gif?q=' + randomnumber);
	img.setAttribute('width', '1');
	img.setAttribute('height', '1');
    document.body.appendChild(img);
  }

function hideApplet(show)
{ 
  var applet = document.getElementsByTagName('applet');
  for (var i = 0; i < applet.length; i++) { 
    if (show)
		applet[i].style.visibility='visible';
	else
		applet[i].style.visibility='hidden';
  }	
}

function showPrototype()
	{
		hideApplet(0);
		Dialog.info({url: "../info_panel.html", options: {method: 'get'}}, {className: "alphacube", width:660});
	} 
		
function CardSafeHelp()
	{
		hideApplet(0);
		Dialog.info({url: "Cobrand/PopUp/CardSafeHelp.html", options: {method: 'get'}}, {className: "alphacube", width:500});
	}
					
function SallieMae()
	{
		hideApplet(0);
		Dialog.info({url: "Cobrand/PartnerNav/SallieMae/SallieMaePopUp.html", options: {method: 'get'}}, {className: "alphacube", width:410});
	}					
								
function showSelfAssessment()
	{
		//comment
		hideApplet(0);
		Dialog.info({url: "../Cobrand/PopUp/SelfAssessment.html", options: {method: 'get'}}, {className: "alphacube", width:530});
	}
function CardSafeHelpPMID()
	{
		hideApplet(0);
		Dialog.info({url: " ../Cobrand/PopUp/CardSafeHelpPMID.html", options: {method: 'get'}}, {className: "alphacube", width:500});
	}						
			
  
 	
//This function is used to check user status in the contact us page
//then redirets the user to a correct page based on the status
function RedirectURL(checkStatus)
{

//for NotLoggedIn -> user doesn't have an account or in logout status
  if(checkStatus == "NotLoggedIn")
  {
//	RedirectURL = "Message.aspx?PageTypeID=MemberOnlyCustCare";
	RedirectURL = "Login.aspx?nav=dispute";	// Allow user to relogin to access the dispute page
	toMainWindow(RedirectURL);
  }
  
 //for Active -> user with 1B Report 
 if(checkStatus == "Active")
  window.location = "DisputeInfo.aspx";
  
 //for Inactive -> user has an account but doesn't have 1B Report
 if(checkStatus == "Inactive")
  {
	Dialog.info({url: "Cobrand/PopUp/DisputeOverlay.html", options: {method: 'get'}}, {className: "alphacube", width:410});
 }
}


//////////////////////////////////////////////////////////////////////////
//This function is used to check if a user has cardsafe or not.
//if user has cardsafe or is logged out -> display no banner.
//if user doesn't have cardsafe -> display order cardsafe banner.
//it will apply for FAQ & Contact pages.
function displayCardSafeBanner(MemberShipStatus, ReportStatus, PageName)
{

		switch(PageName)
		{
			//for FAQ page
			case "FAQ":
		
				CSFAQBanner = '<a href="CardSafeOrder.aspx?pkgid=CRDSA&areaid=81" onClick="javascript:exitvariable=false;"><img src="Cobrand/Images/FCR_FAQUpSellBox.jpg" border="0" class="FAQUpSellImage"></a><a href="CardSafeOrder.aspx?pkgid=CRDSA&areaid=81" class="FAQUpSellLink" onClick="javascript:exitvariable=false;">CardSafe<sup>TM</sup> - The peace of mind you deserve at the price you need!</a> <a href="CardSafeOrder.aspx?pkgid=CRDSA&areaid=81" class="FAQUpSellLearn"  onClick="javascript:exitvariable=false;">Learn More</a>';
				//logged in without cardsafe
				
				if(MemberShipStatus == "ActiveNonCardSecure" && ReportStatus == 'Active')
					{
								document.write (CSFAQBanner);
					}
					
				//not logged in

				else if(MemberShipStatus == "" && ReportStatus == 'NotLoggedIn')
					{
								document.write (CSFAQBanner);
					}
			break;
			
			
			//for Contact us page
			case "Contact":
				CSContactBanner = '<div id="cardSafeAd"><a href="CardSafeOrder.aspx?pkgid=CRDSA&areaid=81" onClick="javascript:exitvariable=false;" title="Order Card Secure"><img src="Cobrand/Images/ContactUs_CardSafeBanner.jpg" width="880" height="120" alt="Order Card Secure" border="0" /></a></div>';
				//logged in without cardsafe
				
				if(MemberShipStatus == "ActiveNonCardSecure" && ReportStatus == 'Active')
					{
								document.write (CSContactBanner);
					}
					
				//not logged in

				else if(MemberShipStatus == "" && ReportStatus == 'NotLoggedIn')
					{
								document.write (CSContactBanner);
					}
			break;
	}
 
 }
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////



function dispute(checkStatus)
{

 //for Active -> user with 1B Report 
 if(checkStatus=="True")
  window.location = "DisputeInfo.aspx";
  
 //for Inactive -> user has an account but doesn't have 1B Report
 if(checkStatus=="False")
  {
	Dialog.info({url: "../Cobrand/PopUp/DisputeAlerts.html", options: {method: 'get'}}, {className: "alphacube", width:410});
 }
}

//This function is used to check user status in the contact us page
//then show the login banner based on the status
function showLoginBanner(checkStatus)
{

//for NotLoggedIn -> user doesn't have an account or in logout status
  if(checkStatus == "NotLoggedIn")
  {
	var banner;
	     banner = '<div id="ForgotPWBox"><h2>Forgot your username or password?</h2><a href="https://www.freecreditreport.com/username-and-password-assistance" onClick="toMainWindow(this.href);">';
	     banner = banner + '<img src="../Cobrand/Images/clickhere_btn.jpg" alt="CLICK HERE!" /></a></div>';
	document.write(banner);
  }
}

// JCheung Phx Sales Tax 10/31/2008
function fillInSpan(ctrname, txt) {
	var o = $(ctrname);
	if (o != null) o.innerHTML = txt;
}		
function Total(x, y) {
	var result = 0.0;					
	x = x || 0;
	y = y || 0;
	result = Number(x) + Number(y);
	return result;
}	

function updatePopUpContent(tax, total) {
	fillInSpan("spanNT2TTax", tax);
	fillInSpan("spanFluctuationTax", tax);				
	fillInSpan("spanNT2TTotal", total);
	fillInSpan("spanFluctuationTotal", total);
}
function setAllowSubmit(ctrlname){
	Dialog.closeInfo();hideApplet(1);
	__doPostBack(ctrlname, "");	 
}

// JCheung TopChef LightBox	on MCC 03/09/2009
function showLightBox(lightBoxUrl)
{
  hideApplet(0);
  Dialog.info({url: lightBoxUrl, options: {method: 'get'}}, {className: "alphacube", width:660});
}  

//HT////////////////////////////////////////////////////////////////////////////
//switchtab for LP116
function switchTab(tab, imgPath)
{
    var counttabs = document.getElementById('tabs').getElementsByTagName('li');
	//turn off background of all modules, arrow buttons and content on the right
	for(i=0;i<counttabs.length;i++)
		{
			document.getElementById('tab' + (i+1) + '_content').style.display = "none";
			document.getElementById('tab' + (i+1) + '_bottomLeft').style.display = "none";
			document.getElementById('tab' + (i+1) + '_footnote').style.display = "none";
				
		}
	//turn on the selected module, arrow button, and the module content on the right
		document.getElementById(tab + '_content').style.display = 'block';
		document.getElementById(tab + '_bottomLeft').style.display = 'block';
		document.getElementById(tab + '_footnote').style.display = 'block';
		
	//turn off the default content since it doesn't have a highlighted tab
		document.getElementById('tab_content').style.display = 'none';
		document.getElementById('tab_bottomLeft').style.display = 'none';
		document.getElementById('tab_footnote').style.display = 'none';
		
		
	//attach tracking pixel with unique trackID to the module
		var randomnumber=Math.floor(Math.random()*100000000)
		var imgName = imgPath + '?trackID=' + randomnumber;
		var img = document.createElement('IMG');
		img.setAttribute('src', imgName);
		img.setAttribute('width', '0');
		img.setAttribute('height', '0');
	    document.body.appendChild(img);
  
}
	

	
// added for Exhaust Monetization - add a tracking pixel for lightbox pop ups
function trackOverlay(offer)
{ 
	var randomnumber=Math.floor(Math.random()*100000000)
    var img = document.createElement('IMG');
    img.setAttribute('src', 'exitpopup.axd?cmp='+offer+'&q=' + randomnumber);
    img.setAttribute('width', '1');
    img.setAttribute('height', '1');
    img.setAttribute('style', 'display:none');
    document.body.appendChild(img);
}

// added for Exhaust Monetization - check for cookie
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return ""
}

function showIphoneContent(status)
{
	if(status == "NotLoggedIn")
	{
		document.getElementById("notamemberforIphone").style.display = "block";
	}
}