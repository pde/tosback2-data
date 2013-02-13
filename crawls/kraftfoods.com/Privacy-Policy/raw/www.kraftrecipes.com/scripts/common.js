<!--
// BCS Release v59 - Pluck Ballyhoo (7/7/10)

var bInit = true;
var moo = 0;
var setemptyvalue = 0;
var customarray = new Array('test');
var actb_ItemCount = 0;
var ajaxKraftMaster='';

//Ankit - Featured section in flyout getting crawled

var elcrecipe='<div class="image"><img src="/assets/recipe_images/Easy-Lemon-Chicken-Picatta-59239.jpg" alt="Easy Lemon-Chicken Piccata" width="175" height="103"></div><div class="copy"><div class="heading">Easy Lemon-Chicken Piccata</div>  Enjoy this delicious lemon chicken recipe which is sure to become a family favorite!  </div><div class="moreLink"><a href="/recipes/easy-lemon-chicken-piccata-122866.aspx"><img src="/assets/images/button/btn_more.png"  alt="more"></a></div></div>';
var ofcballs='<div class="frame"><div class="image"><img src="/assets/recipe_images/Oreo-Football-Cookie-Balls-52162.jpg" alt="football party center" width="175" height="103"></div><div class="copy"><div class="heading">football party center</div>  Kick off your football party with our winning recipes. </div><div class="moreLink"><a href="/recipes/holidays-and-entertaining/entertaining/MVPFootballPartyPlanner.aspx"><img src="/assets/images/button/btn_more.png"  alt="more"></a></div></div>';
var kraftcheesefb='<div class="image"><img src="/kraftcheese/PublishingImages//brand/thumbnails/CA_FreshTake_ChickenTomatoeSpinach_568-thumb.jpg" alt="Southwest Three Cheese Chicken" width="175" height="103"></div><div class="copy">Southwest Three Cheese Chicken   </div><div class="moreLink"><a href="/kraftcheese/recipes/southwest-three-cheese-chicken.aspx"><img src="/assets/images/button/btn_more.png"  alt="more"></a></div>';
var snackwellfb='<div class="image"><img src="/SiteCollectionImages/ImageRepository/KR_Redesign_2011/Products_MegaNav_Snackwells.jpg" alt="Be Bad. Snack Well." width="175" height="103"></div><div class="copy"><div class="heading">Be Bad. Snack Well.</div>  SnackWells has new pretzels and popcorn! Deliciously indulgent, perfectly portioned.   </div><div class="moreLink"><a href="http://www.nabiscoworld.com/snackwells/" target="_blank"><img src="/assets/images/button/btn_more.png"  alt="more"></a></div>';
var barryfb='<div class="userPhoto"><img src="/SiteCollectionImages/ImageRepository/0/Community_Nav_Featured_3.jpg" alt="" width="45" height="45" border="0"></div> <div class="userStats"><div class="userName"><a href="http://www.kraftrecipes.com/community/persona.aspx?UID=0a5cfe86beb9d87b6544738640eee622&plckUserId=0a5cfe86beb9d87b6544738640eee622christinebarry">christinebarry</a></div><div class="userQuote">christinebarry loves to make Mozzarella Pasta Bake! </div></div><a href="http://www.kraftrecipes.com/community/persona.aspx?UID=0a5cfe86beb9d87b6544738640eee622&plckUserId=0a5cfe86beb9d87b6544738640eee622christinebarry"><img src="/assets/images/button/btn_more_link.png"  alt="more"></a> <a href="/registration/contextualsignuplogin.aspx"><img src="/assets/images/button/btn_join_now.png"  alt="join now"></a>';

//Ankit - Featured section in flyout getting crawled

function AjaxCall(strUrl, divTag)
{
	alert(strUrl);
	  window.addEvent('domready', function(){		    
		    new Ajax(strUrl, {method:  'get', update: $(divTag), evalScripts: true}).request();
		  });	
}

function SetEmpty(ctrl)
{
	if (setemptyvalue == 0)
	{
                ctrl.style.color = "black"
		ctrl.value='';
	}
	else if(setemptyvalue == 1)
		setemptyvalue = 0;
}

function closeWebPart()
{
	MSOTlPn_ShowToolPane(0);
}

function setResult(control, value)
{
  	var ctlElement;
	ctlElement = document.getElementById(control);
	ctlElement.value = value;
}



function populateTxtBox(item)
{
	for(var i=0;i<item.form.elements.length;i++)
	{
		if(item==item.form.elements[i])
		{
			var rtnVal = item.options[item.selectedIndex].value;
			if (rtnVal.indexOf(":") > -1)
			{
				item.form.elements[i+1].value=rtnVal.substring(rtnVal.indexOf(":",(rtnVal.indexOf(":")+1))+1,rtnVal.lastIndexOf(":"));
				//item.form.elements[i+2].value=rtnVal.substring(0,rtnVal.indexOf(":"));
			} else {
				item.form.elements[i+1].value=rtnVal;
				//item.form.elements[i+2].value=rtnVal;
			}
		}
	}
}

function init() {
//	if (bInit)
//	{
//	myMenus = new menuEffects('.hdr_search ul', {dropdownheight: 200, 
//													dropdownwidth: 324, 
//													parentdomelement: "#topMenu",
//													droponclick: false, 
//													sweepdropdown: false,
//													dropdowndelay: 1350,
//													rollupdelay: 900
//	});
//	}
}

function handleModalboxClose(me) {
	if (me) {
		if (me.href!="#" && me.href!=""){
			window.location.href=me.href;
		}
	} else {
//		Modalbox.close();
		if (jQuery("#mydiag").dialog( "isOpen" )===true) {
			//true
			jQuery("#mydiag").dialog("close");
		}
		
	}
	return false;
}

function handleModalboxCloseNoReload(me) {
	if (me){
		if (me.href!="#" && me.href!=""){
			window.location.href=me.href;
		}
	} else {
//		Modalbox.closeNoReload();
	}

	return false;
}

function resizeModalbox(h,w,cap) {
//	Modalbox.nextPage(h,w,cap);
	return false;
}


// Begin: Previously KraftCanada.js -------------------------------------------------------------------------------------------

	//BUSTS the page out of a frameset.
	// ??? should this be back in?
	//if (self.location != top.location) {
	//	top.location = self.location;
	//}

function openCustomWin(urly,wid,ht,topz,leftz,namaroni,scrl) {
	pd = "";
	tf = pd + urly;
	nw = window.open(tf,namaroni,"width=" + wid + ",height=" + ht + ",top=" + topz + ",left=" + leftz + ",scrollbars=" + scrl);
}
	
function openNewWin(wurl)
{
	newWindow=window.open(wurl);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

// This should no longer be applicable
//MM_preloadImages('/assets/images/nav/nav_chinese_on.gif');


function clearSearchText(txt)
{
	if ((txt.value == "search") || (txt.value == "recherche"))
		txt.value = "";
}

function loadSearchFlower()
{
	var divFlower = document.getElementById('searchFlower');
	var scope = RequestQueryString('scope');

	if (divFlower != null){
		if (scope == '' || scope.indexOf('recipes') != -1 || scope.indexOf('memberrecipes') != -1) {
			divFlower.style.display = 'block';
		} else {

			divFlower.style.display = 'none';
		}
	}
}

// 
var hasClickedSubmit = false;
var msg = "Did you make any changes to your profile?  Click 'OK' to save your profile changes.";
	
function unLoadVerify()
{
	
	if (!hasClickedSubmit) {
		if (window.confirm(msg)) {
			var btnSubmit = document.getElementById('EditProfile1_cmdUpdate');
			btnSubmit.click();
			
		}
	}
}

function killDoubleClick()
{
	if (!hasClickedSubmit) {
		hasClickedSubmit = true;
		return true;
	}
	return false;
}

// End: Previously KraftCanada.js -------------------------------------------------------------------------------------------


function winopen(wurl,wname,wfeatures)
{
   newWindow=window.open(wurl,wname,wfeatures);
}

function select_url(x)
{
    parent.location.href = x;
}

function open_window_sm(url, h, w, name){
	if (!(name)) {
		name = "popupbrowserWindow1";
	}
	var xPos = (screen.width - w) / 2;
	var yPos = (screen.height - h) / 2;
	popupbrowser=window.open(url,name,"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,height=" + h + ",width=" + w + ",left=" + xPos + ",top=" + yPos +"");
	popupbrowser.focus();

}

function open_window_scroll(url, h, w, name){
	if (!(name)) {
		name = "popupbrowserWindow1";
	}
	var xPos = (screen.width - w) / 2;
	var yPos = (screen.height - h) / 2;
	popupbrowser=window.open(url,name,"toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=" + h + ",width=" + w + ",left=" + xPos + ",top=" + yPos +"");
	popupbrowser.focus();
}

function open_window_sm(url, h, w, name){
	if (!(name)) {
		name = "popupbrowserWindow1";
	}
	var xPos = (screen.width - w) / 2;
	var yPos = (screen.height - h) / 2;
	popupbrowser=window.open(url,name,"toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,height=" + h + ",width=" + w + ",left=" + xPos + ",top=" + yPos +"");
	popupbrowser.focus();

}

function open_window_scroll(url, h, w, name){
	if (!(name)) {
		name = "popupbrowserWindow1";
	}
	var xPos = (screen.width - w) / 2;
	var yPos = (screen.height - h) / 2;
	popupbrowser=window.open(url,name,"toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=" + h + ",width=" + w + ",left=" + xPos + ",top=" + yPos +"");
	popupbrowser.focus();
}

function getMilliseconds() {

dot = new Date(0);
now = new Date();
t = (now - dot);
return(t);

}

function getHyperloadDcr(dcr){
dcr = dcr +"?" +getMilliseconds();
return dcr;

}


var buttonCounter = 0;
function OneButtonClick() {
	if (buttonCounter == 0) {
		buttonCounter = 1;
		return true;
	} else {
		return false;
	}
}

function containsNoBad( instring ) {
    badChars = "<>";
    for (var i=0; i< instring.length; i++) {
       if (badChars.indexOf(instring.charAt(i)) != -1) {
          return false;
       }
    }
    return true;
}
	
function navChange(imgName,imgSrc){
	document.images[imgName].src = imgSrc;
}

function navChangeAlt(inputName,imgSrc){
	document.getElementById(inputName).src = imgSrc;
}

function colorOver(id,type){
	if(type == "featured"){
		document.getElementById(id).style.backgroundColor='#d7e7f4';
	}
	else{
		document.getElementById(id).style.backgroundColor='#ffffff';
	}
}

function colorOff(id,type){
	if(type == "featured"){
		document.getElementById(id).style.backgroundColor='#ffffff';
	}
	else{
		document.getElementById(id).style.backgroundColor='#d7e7f4';
	}
}

function inArray(thearray, searchfor) {
	var found = false;

	if (thearray.length > 0) {
		var arraystring = '@' + thearray.join('@');
		found = (arraystring.indexOf('@' + searchfor) > -1)
	}
	return found
}

function doSubmit(event,btn)
{
	
	if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13))
	{ 
	
		if (navigator.appName == "Netscape")
		{
			btn = btn.replace(/:/g, "_");
		}

		document.getElementById(btn).click();
		return false;
	} 
	return true; 
}

function makeDefaultTextBox(txt)
{
	document.getElementById(txt).focus();
}

function getfile(filename,divname,layername) 
{
   var nn4 = (document.layers);
   var nn6 = (document.getElementById && !document.all);
   var ie4 = (document.all && !document.getElementById);
   var ie5 = (document.all && document.getElementById);

   if (nn4){
      eval('parent.document.' + divname + '.layers.' + layername + '.load(filename, parent.document.' + divname + '.layers.' + layername + '.clip.width)');
   }
   else if (ie4) eval('parent.document.all.' + divname + '.document.frames[layername].location = filename');
   else if (ie5 || nn6) parent.document.getElementById(layername).src = filename;
}

function trimright(s) {
	while (s.charAt(s.length -1) == ' ') {
		s = s.substring(0, s.length-1);		
	}
	return s;
}

function loadNewPage(ddl) {
	window.location = ddl[ddl.selectedIndex].value;
}

function RotateBack(divCurrent, divPrevious)                    
{
	var objDivCurrent = document.getElementById(divCurrent);
	var objDivPrevious = document.getElementById(divPrevious);

    objDivCurrent.style.display = 'none';
    objDivPrevious.style.display = 'block';
}

function RotateForward(divCurrent, divNext)
{
	var objDivCurrent = document.getElementById(divCurrent);
	var objDivNext = document.getElementById(divNext);

    objDivCurrent.style.display = 'none';
    objDivNext.style.display = 'block';
}


function hideDivById(divCurrent)
{
	var objDiv = document.getElementById(divCurrent);
	if (objDiv != null) {
		if (objDiv.style.display == 'none')
			objDiv.style.display = 'block';
		else
			objDiv.style.display = 'none';
	}
}

// assign one href to another - to handle image icons outside of the anchor
function assignHrefToNewAnchor(hrefId, newHrefId)
{
	var objAnchor= document.getElementById(hrefId);
	var objNewAnchor= document.getElementById(newHrefId);	
	if (objAnchor != null && objNewAnchor !=null) 
	{
		objNewAnchor.href = objAnchor.href;
	}	
}

    function RotateBack(divCurrent, divPrevious)                    
{
	var objDivCurrent = document.getElementById(divCurrent);
	var objDivPrevious = document.getElementById(divPrevious);

    objDivCurrent.style.display = 'none';
    objDivPrevious.style.display = 'block';
}

function RotateForward(divCurrent, divNext)
{
	var objDivCurrent = document.getElementById(divCurrent);
	var objDivNext = document.getElementById(divNext);

    objDivCurrent.style.display = 'none';
    objDivNext.style.display = 'block';
}

function RequestQueryString(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if ( 
			aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
} 

// ******* AD SERV ***********
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return '';
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var rndNumber = '';

function generateRandomNumber() {

	if (rndNumber.length == '')
	{
		rndNumber = Math.ceil(Math.random() * 10000000000);
	}
	
	return rndNumber;

}

function getQueryStringValueByURL(key, strURL)
{
	var arrStr = strURL.split('&')
	var returnValue = '';

	for(count=0;count<arrStr.length;count++)
	{
		var QSarr = arrStr[count].split('=')
		if (QSarr.length == 2)
		{
			if (QSarr[0].toLowerCase().trim() == key.toLowerCase().trim())
			{
				returnValue = QSarr[1].trim();
				break;
			}
		}
	}
	return returnValue;

}

function buildAdServParameters()
{
	var strParams = '';

	if (hashvalue != null) {
		strParams = strParams + 'kw=' + getQueryStringValueByURL('searchtext',hashvalue) + (';');
	}

	strParams = strParams + 'age=' + readCookie('age') + (';');
	strParams = strParams + 'gen=' + readCookie('gen') + (';');
	strParams = strParams + 'zip=' + readCookie('zip') + (';');
	strParams = strParams + 'kids1=' + readCookie('u12') + (';');
	strParams = strParams + 'kids2=' + readCookie('13+') + (';');
	strParams = strParams + 'mag=' + readCookie('mag') + (';');
	strParams = strParams + 'rbe=' + readCookie('rbe') + (';');
	strParams = strParams + 'hl=' + readCookie('hl') + (';');

	return strParams;
}

function replaceAdServTags()
{
	var imgImage;

	if (document.images) 
	{
		//Loop for all images
		for (var loopCounter = 0; loopCounter < document.images.length; loopCounter++) 
		{
			imgImage = document.images[loopCounter];
			imgImage.src = imgImage.src.replace('%7BPARAMETERS%7D', buildAdServParameters())
			imgImage.src = imgImage.src.replace('%7RANDOM%7D', generateRandomNumber())
		}
	}
}
// ******* AD SERV ***********


// ******* Member Recipes ***********
function GotoGroup(currentGroup, selectedGroup)
{
	var objDivCurrent = document.getElementById(currentGroup);
	var objDivSelected = document.getElementById(selectedGroup);

    if ((objDivCurrent!=null)&&(objDivSelected!=null)) {
        objDivCurrent.style.display = 'none';
        objDivSelected.style.display = 'block';
    }
    
}
// ******* Member Recipes ***********


// ******* Mega Nav *****************
var megaNavTimerHandle = null;
var megaNavTimerHandle2 = null;
var menuList = [];

var menuCount = 0;
var bExtraValue = false;

function resetTimer() {
    if (megaNavTimerHandle2 != null) {
    	clearTimeout(megaNavTimerHandle2);
	megaNavTimerHandle2 = null;
    }
}

function hideCallOutToolTip(divid)
{
    divObj = document.getElementById(divid);
    if (divObj != null)
		divObj.style.display = 'none';
}

function showCallOutToolTip(divid)
{
    divObj = document.getElementById(divid);
    if (divObj != null) 
		divObj.style.display = 'block';
}

function showMegaNav(div, bDelay) {
	if (bDelay) {
		megaNavTimerHandle2 = setTimeout("reallyShowMegaNav('" + div + "', '" + bDelay + "');", 500);
	}
	else {
		reallyShowMegaNav(div, bDelay);
	}

}

function reallyShowMegaNav(div, bDelay) {

    hideAllMegaNavs(div);

    if (megaNavTimerHandle != null) {
    	clearTimeout(megaNavTimerHandle);
	megaNavTimerHandle = null;
    }

    divObj = document.getElementById(div);

    if (divObj != null) {
	    //if (bDelay) {	
	    //	setTimeout("reallyReallyShowMegaNav('" + div + "');", 300);
	    //}
	    //else {
		reallyReallyShowMegaNav(div);
	    //}
    }
}

function reallyReallyShowMegaNav(div) {
    hideAllMegaNavs(div);

    divObj = document.getElementById(div);

    if (divObj != null) {

	divObj.style.display = 'block';
		
	var intMenuItem;

	for (var i=0; i<menuList.length; i++) {
		if (div == menuList[i]) {
			if (bExtraValue)
			{
				intMenuItem = i;
			}
			else
			{
				intMenuItem = i + 1;
			}
		}
	}
	changeClass('pn_item' + intMenuItem + 'h', 'pn_item' + intMenuItem + '2');

	//megaNavTimerHandle = setTimeout("reallyHideMegaNav('" + div + "');", 10000);

    }

}

function hideMegaNav(div) {
    megaNavTimerHandle = setTimeout("reallyHideMegaNav('" + div + "');", 250);
}

function reallyHideMegaNav(div) {
    divObj = document.getElementById(div);
    if (divObj != null) {
		divObj.style.display = 'none';
		var intMenuItem = 0;

		for (var i=0; i<menuList.length; i++) {
			if (div == menuList[i]) {
				if (bExtraValue)
				{
					intMenuItem = i;
				}
				else
				{
					intMenuItem = i + 1;
				}
			}
		}
		if (intMenuItem != 0) {
			changeClass('pn_item' + intMenuItem + 'h', 'pn_item' + intMenuItem);
		}
    }
}

function hideAllMegaNavs(div) {
	for (var i=0; i<menuList.length; i++) {
		if (div != menuList[i]) {
			reallyHideMegaNav(menuList[i]); 
		}
		
	}

}

function changeClass(id, newClass)
{
	var identity=document.getElementById(id);
	if (identity != null)
	{
		identity.className=newClass;
	}
}


// ******* Mega Nav *****************


// ******* Session ******************
function readSessionCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		if (c.indexOf(nameEQ) > 0) {
		    var ba = document.cookie.split('&');
		    for(var j=0;j < ba.length;j++) {
		        var b = ba[j];
		        var pos = b.indexOf(nameEQ);
		        if ( pos >= 0) {
		            return b.substring(nameEQ.length,b.length);
		        }
		    }
		}
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return '';
}

// ******* Member Recipe Photo ********
function getMemberRecipePhotos()
{
	var bCallServer = false;
	var divArray = document.getElementsByTagName("img");
	var intRecipeID;
	try {
		var serpTool = new BallyhooClient();

		for (i = 0; i < divArray.length; i++) {
			//alert(divArray.className);
			if (divArray[i].className == 'MemberRecipeImage') {
				intRecipeID = divArray[i].id.substring('RecipeID_'.length);

				//pluckPhotoGrabber.enqueueRecipe(intRecipeID);
				serpTool.addRecipe(intRecipeID);

				bCallServer = true;

			}
		
		}
	}
	catch (err) 
	{
		//alert('Err Msg: ' + err.message + '  Desc: ' + err.description + ' Name:  ' + err.name);
	}
	
	//pluckPhotoGrabber.go(setMemberRecipePhotos);
	if (bCallServer == true) {
		serpTool.callServer(setMemberRecipePhotos);
	}
}

function setMemberRecipePhotos(IDs, results) {
	var recipeIDs = IDs.split(",");
	for (idIdx = 0; idIdx < recipeIDs.length; idIdx++) {
		var intRecipeID = recipeIDs[idIdx];
		var photoUrl = results[intRecipeID];

		if (typeof photoUrl == "string") {
			imgControl = document.getElementById('RecipeID_' + intRecipeID);
			if (imgControl) {
				imgControl.src = cleanPhotoURL(photoUrl);
			}

			imgControl2 = document.getElementById('RecipeID2_' + intRecipeID);
			if (imgControl2) {
				imgControl2.src = cleanPhotoURL(photoUrl);
			}

		}
	}
}

function cleanPhotoURL(strPhotoURL) {
	var strFormattedURL = strPhotoURL;

	strFormattedURL = strFormattedURL.toLowerCase();
	strFormattedURL = strFormattedURL.replace('/pending/', '/');

	return strFormattedURL; 
}

function isPhotoValid(objPhoto)
{
	var bValid;
	bValid = true;

	if (objPhoto.IsPendingApproval != 'False') {
		bValid = false;
	}

	if (objPhoto.Author.IsBlocked != 'False') {
		bValid = false;
	}

	if (objPhoto.AbuseReportCount >= 3) {
		bValid = false;
	}

	return bValid;
}

// ****** Personal Nav *******************
function updateRecipeBoxCount() {
    var divRBWithCount = document.getElementById('rbWithCount');
    var recipeboxCnt = readCookie('rbc');
    var isLoggedIn = readSessionCookie('loggedin');

    if (divRBWithCount != null){
        if (isLoggedIn.toLowerCase() == 'true')  {
            divRBWithCount.innerHTML = divRBWithCount.innerHTML + ' (' + recipeboxCnt + ')';
        } else {
            divRBWithCount.innerHTML = divRBWithCount.innerHTML + ' (0)';
        }
    }
}

function updateGreeting() {
    var username = readSessionCookie('username');
    var isLoggedIn = readSessionCookie('loggedin');
    var greetingLength = 15;

    if (isLoggedIn.toLowerCase() == 'true') {
        if (username != '') {
            var objGreeting = document.getElementById('greeting');
            if (objGreeting != null) {
                var formattedUsername = unescape(username);
                if (formattedUsername.indexOf('@') > 0) {
                    formattedUsername = formattedUsername.substring(0,formattedUsername.indexOf('@')) 
                } 
                if (formattedUsername.length > greetingLength) {
                    formattedUsername = formattedUsername.substring(0,(greetingLength - 3)) + "...";              
                }
                //objGreeting.innerText = objGreeting.innerText + ' ' + formattedUsername;
				objGreeting.innerHTML = ' ' + formattedUsername;
				var objPersonalNav = document.getElementById('personalNavigator');
				if (objPersonalNav != null) {
					objPersonalNav.className = 'signedIn';
				}
            }
        }
    }
}


function loadPersonalNav() {
	updateGreeting();
	//updateRecipeBoxCount();
}

// ****** Carousel Modules *****************
function dotMouseOver(img) {
img.src='/assets/images/nav/paging_dot_on.png';
}

function dotMouseOut(img) {
	if (img.className != 'current'){
		img.src='/assets/images/nav/paging_dot_off.png'; 
	}
}

function arrowUp(RecipeArray, strPrefix, MaxCount)
{
	var intCounter;
	eval('intCounter = ' + strPrefix + '_Counter;');

	if (intCounter == MaxCount)
	{
		intCounter =  1;
	}
	else
	{
		intCounter = intCounter + 1;
	}
	eval(strPrefix + '_Counter = intCounter;');

	changeCarouselModule3Photos(RecipeArray, strPrefix, intCounter, MaxCount);
}

function arrowDown(RecipeArray, strPrefix, MaxCount)
{
	var intCounter;
	eval('intCounter = ' + strPrefix + '_Counter;');

	if (intCounter == 1)
	{
		intCounter =  MaxCount;
	}
	else
	{
		intCounter = intCounter - 1;
	}
	eval(strPrefix + '_Counter = intCounter;');

	changeCarouselModule3Photos(RecipeArray, strPrefix, intCounter, MaxCount);
}

function changeCarouselModule3Photos(RecipeArray, strPrefix, intCounter, MaxCount){

	// Change yesterday
	if (intCounter == 1)
	{
		changeCarouselModule1Photo(RecipeArray, strPrefix, MaxCount, 0);
	}
	else
	{
		changeCarouselModule1Photo(RecipeArray, strPrefix, intCounter - 1, 0);
	}

	// Change today
	changeCarouselModule1Photo(RecipeArray, strPrefix, intCounter, 1);

	// Change tomorrow
	if (intCounter == MaxCount)
	{
		changeCarouselModule1Photo(RecipeArray, strPrefix, 1, 2);
	}
	else
	{
		changeCarouselModule1Photo(RecipeArray, strPrefix, intCounter + 1, 2);
	}


}

function changeCarouselModule1Photo(RecipeArray, strPrefix, intCounter, intDayIndex) {
	var objRecipeImage;
	var objRecipeName;
	var objRatingAnchor;
	var objDayOfTheWeek;
	var strDayOfTheWeek;
	var intCurrentDay;

	//eval(strPrefix + '_Counter = intCounter;');

	objRecipeImage = document.getElementById(strPrefix + intDayIndex + '_RecipeImage');
	if (objRecipeImage) {
		objRecipeImage.innerHTML = RecipeArray[intCounter][0];
	}

	objRecipeName = document.getElementById(strPrefix + intDayIndex + '_RecipeName');
	if (objRecipeName) {
		objRecipeName.innerHTML = RecipeArray[intCounter][1];
	}

	objRatingAnchor = document.getElementById(strPrefix + intDayIndex + '_Rating');
	if (objRatingAnchor) {
	objRatingAnchor.innerHTML = RecipeArray[intCounter][2];
	}

	objDayOfTheWeek = document.getElementById(strPrefix + intDayIndex + '_DayOfTheWeek');

	if (objDayOfTheWeek) {
		if (intCounter == 1) 
			{ strDayOfTheWeek = strSunday; }
		if (intCounter == 2) 
			{ strDayOfTheWeek = strMonday; }
		if (intCounter == 3) 
			{ strDayOfTheWeek = strTuesday; }
		if (intCounter == 4) 
			{ strDayOfTheWeek = strWednesday; }
		if (intCounter == 5) 
			{ strDayOfTheWeek = strThursday; }
		if (intCounter == 6) 
			{ strDayOfTheWeek = strFriday; }
		if (intCounter == 7) 
			{ strDayOfTheWeek = strSaturday; }

		var d = new Date();
 		if (d.getDay() + 1 == intCounter)
	 		{ strDayOfTheWeek = strToday; }

		objDayOfTheWeek.innerHTML = strDayOfTheWeek;
	}
}

function changeCarouselModule(RecipeArray, strPrefix, intCounter) {
	var objRecipeImage;
	var objRecipeName;
	var objRatingAnchor;
	var objReviewedBy;
	var objQuote;
	var objDot;
	var objPhotoContainer;

	eval(strPrefix + '_Counter = intCounter;');

	objRecipeImage = document.getElementById(strPrefix + '_RecipeImage');
	objRecipeImage.innerHTML = RecipeArray[intCounter][0];

	objRecipeName = document.getElementById(strPrefix + '_RecipeName');
	objRecipeName.innerHTML = RecipeArray[intCounter][1];

	objRatingAnchor = document.getElementById(strPrefix + '_Rating');
	objRatingAnchor.innerHTML = RecipeArray[intCounter][2];

	objReviewedBy = document.getElementById(strPrefix + '_ReviewedBy');
	objReviewedBy.innerHTML = RecipeArray[intCounter][3];

	var recipeLength = RecipeArray.length;
	for (var i=1; i<=recipeLength; i++)
	{
		objQuote = document.getElementById(strPrefix + '_Quote' + i);
		if (objQuote != null)
		{
			if (i == intCounter) 
			{
				objQuote.style.display = 'block';
			} 
			else 
			{
				objQuote.style.display = 'none';
			}
		}

		objPhotoContainer = document.getElementById(strPrefix + '_PhotoContainer' + i);
		if (objPhotoContainer != null)
		{
			if (i == intCounter) 
			{
				objPhotoContainer.style.display = 'block';
			} 
			else 
			{
				objPhotoContainer.style.display = 'none';
			}
		}

		objDot = document.getElementById(strPrefix + '_Dot' + i);
		if (objDot != null)
		{
			if (i == intCounter) 
			{
				objDot.src = '/assets/images/nav/paging_dot_on.png';
				objDot.className = 'current';
			} 
			else 
			{
				objDot.src = '/assets/images/nav/paging_dot_off.png';
				objDot.className = '';
			}
		}

	}

}

function setHVTMouseOver(objDiv)
{
	var imgImages = objDiv.getElementsByTagName('img');

	for (var i=0; i<imgImages.length; i++) {
		imgImages[i].src = imgImages[i].src.replace(".gif", "_on.gif");
	}

	var lnkLinks = objDiv.getElementsByTagName('a');

	for (var i=0; i<lnkLinks.length; i++) {
		lnkLinks[i].style.textDecoration = 'underline';
	}
}

function removeHVTMouseOver(objDiv)
{
	var imgImages = objDiv.getElementsByTagName('img');

	for (var i=0; i<imgImages.length; i++) {
		imgImages[i].src = imgImages[i].src.replace("_on.gif", ".gif");
	}

	var lnkLinks = objDiv.getElementsByTagName('a');

	for (var i=0; i<lnkLinks.length; i++) {
		lnkLinks[i].style.textDecoration = '';
	}
}

function setModalLinkGlobal(linkID) {

	try {


		var $link = jQuery('#' + linkID);
		$link.unbind('click');
		$link.click(function() {
			try
			{
				
				$dialog = jQuery('<div id="mydiag"><iframe id="ifrm" scrolling="no" style="width:100%; height: 100%; border:none" /></div>');
				$dialog.dialog({
							autoOpen: false,
							modal: true,
							title: $link.attr('title'),
							draggable: false,
							resizable: false,
							dialogClass: 'popUpContainer curvyIgnore',
							autoResize: false,
							height: $link.attr('modalheight'),
							width: $link.attr('modalwidth'),
							open: function(){
											jQuery('.ui-widget-overlay').bind('click',function(){
															jQuery($dialog).dialog('close');            
											}) 
							}
				});
				var URL = $link.attr('href');

				$dialog.find("#ifrm").attr('src',URL);

				$dialog.dialog('open');
				
				jQuery('.ui-dialog').css('top','60px');
				
				window.scrollTo(0,0);
				return false;
			}
			catch(err)
			{
				alert(err.message);
			}
		});
	} catch(err) {
		alert(err.message);
	}

}


function setModalLink(linkID) {

	try {
		var $link = jQuery('#' + linkID);

		var $dialog = jQuery('<div id="mydiag"><iframe id="ifrm" scrolling="no" style="width:100%; height: 100%; border:none" /></div>')
					.dialog({
							autoOpen: false,
							modal: true,
							title: $link.attr('title'),
							draggable: false,
							resizable: false,
							dialogClass: 'popUpContainer curvyIgnore',
							autoResize: false,
							height: $link.attr('modalheight'),
							width: $link.attr('modalwidth'),
							open: function(){
											jQuery('.ui-widget-overlay').bind('click',function(){
															jQuery($dialog).dialog('close');            
											}) 
							}
					});	
		

		$link.unbind('click');

		$link.click(function() {
						var URL = $link.attr('href');
						//$dialog.attr('src',URL);
						$dialog.find("#ifrm").attr('src',URL);
						$dialog.dialog('open');
						return false;
		});
	} catch(err) {
		alert(err.message);
	}

}




function emailsignupLink(linkID, modalwidth, modalheight)

{
          var username = readSessionCookie('username');
          var isLoggedIn = readSessionCookie('loggedin');
  

               if (isLoggedIn.toLowerCase() == 'true') {
                 if (username != '') {
 
                     window.location = "/community/persona.aspx";
        
                   }
                }

                  else
                 {
		
			try
			{
				
				$dialog = jQuery('<div id="mydiag"><iframe id="ifrm" scrolling="no" style="width:100%; height: 100%; border:none" /></div>');
				$dialog.dialog({
							autoOpen: false,
							modal: true,
							title: 'hungry for mealtime inspiration? <br/> get kraft foods recipes by email.',
							draggable: false,
							resizable: false,
							dialogClass: 'popUpContainer curvyIgnore',
							autoResize: false,
							height: modalheight,
							width:  modalwidth,
							open: function(){
											jQuery('.ui-widget-overlay').bind('click',function(){
															jQuery($dialog).dialog('close');            
											}) 
							}
				});
				var URL = linkID;
				$dialog.find("#ifrm").attr('src',URL);
				$dialog.dialog('open');
				jQuery('.ui-dialog').css('top','60px');
				window.scrollTo(0,0);
				return false;
			}
			catch(err)
			{
				alert(err.message);
			}
                  
                   }

}




function qParam(name){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function toggle_comment(index) {
	var e = document.getElementById('commentfull' + index);

	if((e.style.display == 'none') || (e.style.display == '')){
		e.style.display = 'block';
		i= '/assets/images/button/btn_plus_less.png';
		alttext = 'view less';
	}else{
		e.style.display = 'none'; //set to 'empty' for print stylesheet
		i= '/assets/images/button/btn_plus_more.png';
		alttext = 'view more';
	}
	document.getElementById('commenttoggleimg' + index).src = i;
	document.getElementById('commenttoggleimg' + index).alt =alttext
}

function mouseover(overtext,index){
	document.getElementById('commenttoggleimg' + index).src =overtext;
}

function mouseout(overout,index){
	document.getElementById('commenttoggleimg' + index).src = i;
}
