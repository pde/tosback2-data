/**
  * Java Script for the Google search integration in the marketing site
 **********************************************************
 * Version	Author		  Date		    Description
 **********************************************************
 *  1.0     Kanwaldeep Singh   15-Dec-05   Inital Draft
 *  1.1		Don Saul	12-Dec-06	edited doSearchTips path 
  **********************************************************
*/


/****************************************************************/
/* Functional methods for executing the search                  */
/****************************************************************/
//method to execute the search
function doSearch(text) 
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&q=";
  text = trimSpace(text);	
  if(text == '' || text == ' ') 
  {
    url += "&emptyQueryText=true";
    window.location.href = url;
    return false;
  }
  url += removeSpecialChar(encodeAMP(encodePLUS(encodeHASH(text))));
  url +="&emptyQueryText=false";
  window.location.href = url;
  return false;
}

//method to execute the search tips
function doSearchTips()
{
	// var url = "/ccp/index.jsp?pg_name=ccpmapp/home_equity/shared/page/search_tips";
	var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search_tips";
	window.location.href = url;
	return false;
}

function doHideSummary(status)
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&hs="+status+"";
  window.location.href = url;
  return false;
}

function doNarrowSearch() 
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&doNarrowSearch=true&ns=true";
  window.location.href = url;
  return false;
}  

function navigateToPage(pageurl) 
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&";
  url += pageurl;
  window.location.href = url;
  return false;
}

function navigateCreditCard(creditCardUrl)
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&";
  url += creditCardUrl+"&currentSite=commercial_microsite";
  window.location.href = url;
  return false;
}

function navigateCreditCardCategories(creditCardUrl)
{
  if(creditCardUrl=='')
	creditCardUrl='&site=cig_cchase&client=internet_collection&restrict=cig_cchase&output=xml_no_dtd&start=0&filter=0&num=1';
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/cc_search&emptyQueryText=false&q=";
  url += creditCardUrl+"&currentSite=cig_cchase";
  window.location.href = url;
  return false;
}

function navigateOtherCreditCard(otherCreditCardUrl) 
{
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&";
  url += otherCreditCardUrl+"&currentSite=dummy";
  window.location.href = url;
  return false;
}  

function navigateMicrositeCategory(creditCardUrl,category)
{
  //alert('the category is : '+category);
  var url = "/ccp/index.jsp?pg_name=ccpmapp/generic/shared/page/chase_search&emptyQueryText=false&";
  url += creditCardUrl+"&currentSite="+category;
  //alert('the url to open window is : '+url);
  window.location.href = url;
  return false;
}

function navigateJPMorganCategories(pagetype,restrict,query)
{
  var url = "http://query.jpmorgan.com/inetSearch/index_redesign.jsp?pageType=" + pagetype +"&q=" + query +"&sort=2&start=1&num=10&lr=&restrict=" + restrict +"&gce=&siteID=&searchoption=&querytext=" + query+"&site=jpmorgan";
  if(pagetype == "_JPMC")
	url="http://www.jpmorganchase.com/corporate/Home/search.htm?search_string="+query;
  window.location.href = url;
  return false;
}

	function showhide(section, action)
	{
		getItem1 = "sect_" + section + "_closed";
		getItem2 = "sect_" + section + "_open";
		if(document.getElementById)
		{
			if (action == "show")
			{
				thisName = document.getElementById(getItem1).style;
				thisName.display = "none";
				//thisName.visibility = "hidden";
				thisName = document.getElementById(getItem2).style;
				thisName.display = "";
				//thisName.visibility = "visible";
			}
			else
			{
				thisName = document.getElementById(getItem2).style;
				thisName.display = "none";
				//thisName.visibility = "hidden";
				thisName = document.getElementById(getItem1).style;
				thisName.display = "";
				//thisName.visibility = "visible";
			}
		}
	}

/****************************************************************/
/* Utility Methods for endcoing the special symbols in url      */
/****************************************************************/

// for trimming spaces
function trimSpace(searchText)
{
  var newSearchText = '';
  var spaceCounter = 0;
  for (var i = 0; i < searchText.length; i++)
  {
    if (searchText.charAt(i) == ' ')
    {
      spaceCounter++;
      if (spaceCounter > 1)
        continue;
      else
        newSearchText += searchText.charAt(i);
    }
    else
    {
      spaceCounter = 0;
      newSearchText += searchText.charAt(i);
    }
  }
  return newSearchText;
}

//Removing the Special character
function removeSpecialChar(searchText)
{
  var newSearchText = "";					
  for (var i = 0; i < searchText.length; i++)
  {
    if (searchText.charCodeAt(i) > 255)
      continue;
    newSearchText += searchText.charAt(i);			
  }
  return newSearchText;
}

//Encode the Ampersand Symbol ( '&' )
function encodeAMP(inString)
{
  var outString = "";
  for (var i=0; i<inString.length; i++)
  {
    if (inString.substring(i, i+1) == "&")
      outString += '%26';
    else
      outString += inString.substring(i, i+1);
  }
  return outString;
}

//Encode the Plus Symbol ( '+' )
function encodePLUS(inString)
{
  var outString = "";
  for (var i=0; i<inString.length; i++)
  {
    if (inString.substring(i, i+1) == "+")
      outString += '%2B';
    else
      outString += inString.substring(i, i+1);
  }
  return outString;
}	

//Encode the Hash Symbol ( '#' )
function encodeHASH(inString)
{
  var outString = "";
  for (var i=0; i<inString.length; i++)
  {
    if (inString.substring(i, i+1) == "#")
      outString += '%23';
    else
      outString += inString.substring(i, i+1);
  }
  return outString;
}

function bolOffSiteLink(gotoName,gotoURL){  
// modified by James Gulick -- 7/15/2005
gotoName = escape(gotoName);
gotoURL = escape(gotoURL); 
var OffSitePopUpURL;
var leftOffset=0;
var topOffset=0;    
//OffSitePopUpURL="weblinking_popup.htm?"; 
OffSitePopUpURL="/ccp/index.jsp?pg_name=ccpmapp/shared/assets/page/offsiteLink&";
if(screen.width){
if(screen.width < 800){
leftOffset=60;
topOffset=90;
}else{
if(screen.width>=800&&screen.width<1024){
leftOffset=160;
topOffset=134;
}else{
if(screen.width>=1024){
leftOffset=272;
topOffset=250;
}
}
}
}
var loadURL=OffSitePopUpURL+'site='+gotoName+'&url='+gotoURL;
var webLinkWin=window.open(loadURL,"weblinking",'width=550,height=375,left='+leftOffset+',top='+topOffset+',screenx='+leftOffset+',screeny='+topOffset+',resizable=no,scrollbars=yes,menubar=no');
webLinkWin.focus();
}
