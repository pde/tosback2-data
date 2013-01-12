
/*
JC:26.4 This is just here so that users don't see errors in production. 
        For dev you can add debug=1 as a querystring param.
*/
if(location.href.indexOf("debug=1")===-1){window.onerror=function(m,u,l){if(location.href.indexOf("debug=1")!==-1&&console&&console.error&&l>0){console.error("Script error! "+m);}return true;}}

/* functions for coremetrics */

function getReferrerURL()
{
  if(getCookie("bhrf") != "null")
  {
      return getCookie("bhrf");
  }
  return "";
}

function getMMCVendor()
{
	if(getURLParam('PARTNERID').length>0)
	{
		return  getURLParam('PARTNERID');
	}
	return "";
}

function getMMCPlacement()
{
    str = getMMCVendor();
	if(getURLParam('BANNERID').length>0)
	{
		return  getURLParam('BANNERID');
	}
	return str;
}

function getMMCCategory()
{
	if(getURLParam('TRACKINGCAT').length>0)
	{
		return getURLParam('TRACKINGCAT');
	}
	else if(getURLParam('CATEGORYID').length>0)
	{
		return getURLParam('CATEGORYID');
	}
	return "";
}

function getMMCItem()
{
      /*  STATIK: after gaining more insight into this project this does not seem correct
      adid is used for insite ads like promotions and are handed out by oz when a pool is created
      */
	/* if(getURLParam('ADID').length>0){return getURLParam('ADID');} else */
       if(getURLParam('ID').length>0)
	{
		return  getURLParam('ID');
	}
	return "";
}

function getLinkShareID()
{
	if(getURLParam('LINKSHAREID').length>0)
	{
		return getURLParam('LINKSHAREID');
	}
	return "";
}

/* use to get a param from url */
/* all params are evaluated as uppercase, example: getURLParam(PARAMNAME); */
/* TODO: make case insensitive */
function getURLParam(strParamName){
	var strReturn = "";
	var tempHref = window.location.href;
       strHref = tempHref.toUpperCase();
	if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?"));
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
			if ( aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return strReturn;
}

/********** START Window Functions **********/
//HC:Popup window script that is dynamic and will regain focus
// Modified link system to use this one script and pass parameters
// for lighter page weight and more flexibility.
function pop(u,n,f){
	var d = "default";
	var sf = "directories,location,menubar,resizable,scrollbars,status,toolbar";
	if (!n){n = d}
	if (!f){f = sf}
	pw = window.open(u,n,f);
	pw.focus();
}

function openLink(linkID){
				if(!window.opener.closed){
					window.opener.location.href = linkID;
				} else {
					newWin = window.open(linkID,'macys');
					newWin.focus();
				}
				self.close();
}

// AP: This function changes the location of the Parent window and closes the corresponding pop-up
function changeParentWindow(url) {
              //alert("url="+url); 
		var ah,aw,str;
              if (!opener.closed) { 
                 	opener.location=url;
			self.close();
			opener.focus(); 
              } else { 
              	// if opener was closed newWindow below will open window the same size as self which may be too small...
			 str = "left=0,screenX=0,top=0,screenY=0";
			
			if (window.screen) { 
			  //  we want to open a fullscreen window max size is 800 x 600
			ah = screen.availHeight > 600 ? 600 : screen.availHeight - 30;
			 aw = screen.availWidth > 800 ? 800 : screen.availWidth - 10;
			  str += ",height=" + ah;
			 str += ",innerHeight=" + ah;
			 str += ",width=" + aw;
			 str += ",innerWidth=" + aw;
			 } else {
			  str += "directories,location,menubar,resizable,scrollbars,status,toolbar"; // so the user can resize the window manually
			} 
			url += ",default," + str;
                  newWindow = window.open(url);
                  self.close(); 
                  newWindow.focus(); 
              } 
}

function changeParentFrameWindow(url) {
	opener.top.location.href=url;
	self.close();
	opener.focus();
}

function closeWindow() {
	self.close ()
}

// AP: Timed window function, takes time parameter in seconds
var timerID = null;
function wait(time) {
	timerID = setTimeout("closeWindow()",time*1000)
}

/********** END Window Functions **********/


/*********** BEGIN buildFeaturedBrandsURL **********/
// JC: This function is used to parse entries in the featuredBrandsDropdown (used on main 8 cat_01 & cat_04 pages).
// Allows us to mix/match syndicated URLs, Product IDs and pop-up windows.
function buildFeaturedBrandsURL() {
	Current = document.featuredBrands.FeaturedBrand.selectedIndex;
	Value = document.featuredBrands.FeaturedBrand.options[Current].value;
	if (Value != "NOSELECTION"){
		if (isNumber(Value)) {
			document.featuredBrands.submit();
		}
		else {
			location.href=Value;
		}
	}
}

// JC: Test to differentiate between syndicated URLs and Product IDs. Called by buildFeaturedBrandsURL().
function isNumber(Input){
	var numbers = "0123456789";
	var CharacterCheck = "";
	var counter = 0;


	for (var i=0; i < Input.length; i++) {
		CharacterCheck = Input.substring(i,i+1);
		if (numbers.indexOf(CharacterCheck) != -1){
			counter ++;
		}
	}
	if (counter != Input.length) {
		return false;
	}
	else {
		return true;
	}
}

/*********** END buildFeaturedBrandsURL **********/

//JC:16.1 Function used to add tracking info

function trackURL(URL,type) {
var                   LinkType  = "&LinkType=";
if      (type == "E") LinkType += "EverGreen";
else if (type == "D") LinkType += "DepthPath";
else if (type == "F") LinkType += "FlyOut";
else                  LinkType += "Unknown";
var newURL = URL + ((URL.indexOf('?') != -1)? LinkType : "?" + LinkType);
window.location.href = newURL;

}

	  /**
	   * STATIK: simple confirm WL delete function will elaborate and clean up later
	   */
	  
	  /* init test var */
	  var deleteThisWL = "false";
	   
        function confirmWishListDelete()
	  {
	    /* set confirm box verbage */
          var confirmString = "Are you sure you want to delete this wishlist?";
		
		/* test if delete WL should be confirmed */
          if(deleteThisWL == "true")
		{
		  /* reset variable and confirm WL delete */
		  deleteThisWL = "false";
            return confirm(confirmString);
          }
		else
		{
		  /* submit form without WL delete */
            return true;
		}
        }
        
        /**
         * author:            STATIK
         * name:              updateHiddenSubmit
         * last modified:     19.3
         * params:            element and form name
         * desc:
         * updates a submit_hidden form element that is used for ?!?!? who knows why
         * TODO: look at why this hack was implemented, maybe create cleaner solution
         */
	function updateHiddenSubmit(element, formName)
	{
			document[formName].submit_hidden.value = element.value;
			document[formName].submit_hidden.name = element.name;
	}	
	
	//pm: This function is used to count the number of characters in the foward to friend pop-up
	function charCount(m_field, m_cnt, m_max){
		if (m_field.value.length > m_max) {
			m_field.value = m_field.value.substring(0, m_max);
		} else {
			m_cnt.value = m_max - m_field.value.length;
		}
	}
	
	 /**
         * author:            HUGHDIDIT
         * name:              toggleElement
         * last modified:     39.0.24
         * params:            id, state (boolean)
         * desc:              Generic show hide of block level elements
         */
	function toggleElement(id, state)
	{
						var el = document.getElementById(id);    
						// Do nothing if were not working with the DOM
						if (el) {
						                             //  state can be anything that resolve to boolean of true or false  - true = show    false = hide
						                             if (state) {
						                                                         el.className = 'Expanded';
						                                                         /* 
						                                                         el.style.display = 'block';
						                                                         el.style.visibility  = 'visible'; 
						                                                         */
						                             } else {
						                                                        el.className = 'Collapsed';
						                                                        /*
						                                                        el.style.display = 'none';
						                                                        el.style.visibility  = 'hidden';
						                                                        */
						                             }
						}
	}
	function limitText() {
		var zipFieldElem = document.getElementById('ZipCode');
		if (zipFieldElem.value.length < zipFieldElem.maxChars) {
			return true;
		} else {
			return false;
		}
	}
	var zipWasClicked = false;
	function removeInitialText() {
		if (zipWasClicked === false) {
			document.getElementById('ZipCode').value = "";
			zipWasClicked = true;
		} 
	}

	/*
	 * methods: showElements(), hideElements()
	 * params:  unlimited
	 * desc:    Show hide list of block elements
	 * sample:  sv-cu-xx-xx.index.xml
	 */
	function hideElements() {
		for (i=0;i<arguments.length;i++) {
			document.getElementById(arguments[i]).style.display='none';
		}
	}
	function showElements() {
		for (i=0;i<arguments.length;i++) {
			document.getElementById(arguments[i]).style.display='';
		}
	}
	function phone_onkeyup(original,temp,destination)
	{
		if (original.value.length >= original.getAttribute("maxlength") && temp.value == "A")
		{
			temp.value.value="N";
			destination.focus();
		}
	}
	function phone3_onkeyup(original)
	{
		if (original.value.length == original.getAttribute("maxlength"))
		{
			original.focus();
		}
	}
	function phone_onselect(temp)
	{
		temp.value="N";
	}
	function phone_onkeypress(temp)
	{
		temp.value="A";
	}
	function phone_onfocus(original)
	{
		original.select();
	}
	
