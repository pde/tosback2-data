//  *****************************************************************
//  *   Omniture Page Naming Script                                 *
//  *   Author: Manikandan Rajasekaran                              *
//  *****************************************************************
var urlPage=window.location.href;
var finalUrl=urlPage.replace(/^[A-Za-z]+:\/\/\S+?(\/){1}/,"");
finalUrl="/"+finalUrl;
//alert(finalUrl);
var UrltoSplit =finalUrl.split('?');
var UrltoSplit2 = UrltoSplit[0].split('/');
var chckHashfiilename = UrltoSplit2[UrltoSplit2.length - 1];
var fiilename = chckHashfiilename;
var splitHashval = null;
if(chckHashfiilename.indexOf("#") != -1)
{
    splitHashval = chckHashfiilename.split('#'); 
    fiilename  =  splitHashval[0]
}
//if(fiilename.indexOf("?") !=-1)
//{
//    fiilename = fiilename.substring(0,fiilename.indexOf("?"));
//}
//alert(fiilename);
var locale = UrltoSplit2[1];
var firstLevel = UrltoSplit2[1];
var secondLevel = UrltoSplit2[2];
var thirdLevel = UrltoSplit2[3];
var fourthLevel = UrltoSplit2[4];
var fifthLevel = UrltoSplit2[5];
var siteMcafee = "corp";
var sitePartner = "partnerportal"
var subSection = "other";
var country;
var culture;
var market = "direct";
var geo;
var partnerName;
var pageName;
var sEvents;
var sPageType;
var prop1;
var prop2;
var prop3;
var check = true;
var query;
var value;

if(check)
{
   check = false;

   //alert("finalUrl: "+finalUrl.toLowerCase());
           if(finalUrl.toLowerCase().indexOf("/products/") == 3)
            {
                //alert("in products with fiilename: "+fiilename);
                if ((fiilename != null) && (fiilename != undefined) && (fiilename != "")) 
                { 

                    if ((thirdLevel !=undefined) && (thirdLevel.indexOf(".") == -1))
                    {
                            //alert("filename exists with third level: "+thirdLevel);
                            var foldername = UrltoSplit2[UrltoSplit2.length - 2];
                            //alert("foldername: "+foldername);
                            foldername = foldername.toUpperCase().replace(/-/gi, " ");
                            //alert("Family: "+foldername);
                            s.eVar43 ="Family: " + foldername;
                     }
                     else
                     {
                            //alert("filename exists with no third level folder: "+fiilename);
                            var ProductsFileNameSplit = fiilename;
                            //alert("ProductsFileNameSplit: "+ProductsFileNameSplit);
                            var ProductsFileNameArray = ProductsFileNameSplit.split('.');
                            //alert("ProductsFileNameArray: "+ProductsFileNameArray[0]);
                            var ProductsFileName = new String(ProductsFileNameArray[0]);
                            //alert("ProductsFileName: "+ProductsFileName);
                            var var43FileName = ProductsFileName.toUpperCase().replace(/-/gi, " ");
                            var43FileName = var43FileName.replace(/&/gi, "AND");
                            //alert("Product: "+var43FileName);      
                            s.eVar43 ="Product: " + var43FileName;
                            //alert("Product: "+var43FileName);      
                     }
                }
            }
} // end of if Check

//alert("secondLevel: "+secondLevel);
if(secondLevel!=undefined)
{
    if(secondLevel.toLowerCase() == "beta")
    {
         locale = "us";
         secondLevel = "downloads";
         //alert("new secondLevel: "+secondLevel);
    }
}

/*
var partners = getParam('partner');
if(partners!=undefined && partners!='')
{
    market = "direct";
}
*/

if(secondLevel!=undefined)
{
   if(thirdLevel == undefined)
    {
        thirdLevel = secondLevel;
        secondLevel = "root";
        //alert("secondLevel: "+secondLevel);
        //alert("thirdLevel: "+thirdLevel);
    }
}

//alert("firstLevel: "+firstLevel);

if (firstLevel == "threat-intelligence")
{
          //Check the query in the URL
                locale = "us";
                country = "us";
	            culture = "en-us";
	            geo = "NA";
//	            partnerName = "direct";

        fifthLevel = fourthLevel;
        fourthLevel = thirdLevel;
        thirdLevel = secondLevel;
        secondLevel = firstLevel;
        
        //alert("secondLevel "+secondLevel);
        //alert("thirdLevel "+thirdLevel);
        //alert("fourthLevel "+fourthLevel);
}

//For some pages we need to check the query parameters in the URL or cookie
var queryVar = "region";	
var regExp = new RegExp("(\\?|&)" + queryVar + "=[\\w\\d]*", "i");
//alert("regExp: "+regExp);
 
//For other pages we need to check for locale in the cookie
var cookieValue = getCookie("CookieInformation");
if ((cookieValue != null) && (cookieValue != undefined))
{
         cookieValue = cookieValue.replace("locale=","");
         //alert("CookieValue: "+cookieValue); 
}

//alert("firstLevel: "+firstLevel);

//Apps pages have region= or cookie values
if (firstLevel == "apps")
{
    //alert("in apps");
    if (regExp.test(urlPage)) 
    {
        //alert("reg exp test worked");
        query = regExp.exec(urlPage)[0];
        value = query.substr(queryVar.length + 2);    
        //alert("query & value: "+query+" & "+value);
    }

    //alert("in apps with value after test: "+value);

    // if region isn't a parameter, then check for locale in cookie
    if ((value == undefined) || (value == "") )
    {
      // value for region doesn't exist, set locale to cookieValue    
      if(cookieValue == null || cookieValue == undefined)
      {
         cookieValue = "us";
      }

      //alert("CookieValue: "+cookieValue);       
      locale = cookieValue;     
    }
    // value for region exists, set locale to value
    else
    {
       //alert("locale for apps is: "+value);
       locale = value;
    }
}

if (firstLevel == "error-pages")
{
        //alert("cookievalue "+cookieValue);
        //alert("secondLevel "+secondLevel);

        // when its an error page, check cookie value    
        if(cookieValue == null || cookieValue == undefined)
        {
           cookieValue = "us";
        }

        //alert("secondLevel "+secondLevel);
        //alert("thirdLevel "+thirdLevel);

}

switch (locale){
    case "us":
    {
         country = "us";
         culture = "en-us";
         geo = "NA";
         partnerName = "direct";
       
       break;
    }
    case "uk":
    {
         country = "uk";
         culture = "en-GB";
         geo = "EMEA";
         partnerName = "direct";
        break;
    }
    case "au":
    {
         country = "au";
         culture = "en-AU";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
        break;
    }
    case "sg":
    {
         country = "sg";
         culture = "en-SG";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
        break;
    }
    case "hk":
    {
         country = "hk";
         culture = "zh-HK";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
        break;
    }
    case "de":
    {
         country = "de";
         culture = "de-DE";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "br":
    {
         country = "br";
         culture = "pt-BR";
         market = "direct";
         geo = "LTAM";
         partnerName = "direct";
         break;
    }
    case "fr":
    {
         country = "fr";
         culture = "fr-FR";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "cn":
    {
         country = "cn";
         culture = "zh-CN";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
         break;
    }
    case "es":
    {
         country = "es";
         culture = "es-ES";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "kr":
    {
         country = "kr";
         culture = "ko-KR";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
         break;
    }
    case "tw":
    {
         country = "tw";
         culture = "zh-TW";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
         break;
    }
    case "it":
    {
         country = "it";
         culture = "it-IT";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "mx":
    {
         country = "mx";
         culture = "es-MX";
         geo = "LTAM";
         partnerName = "direct";
         break;
    }
    case "em":
    {
         country = "em";
         culture = "em-EM";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "ap":
    {
         country = "ap";
         culture = "ap-AP";
         geo = "APAC";
         partnerName = "direct";
         break;
    }
    case "lt":
    {
         country = "lt";
         culture = "lt-LT";
         geo = "LTAM";
         partnerName = "direct";
         break;
    }
    case "nl":
    {
         country = "nl";
         culture = "nl-NL";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "pl":
    {
         country = "pl";
         culture = "pl-PL";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "pt":
    {
         country = "pt";
         culture = "pt-PT";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "dk":
    {
         country = "dk";
         culture = "da-DK";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
         break;
    }
    case "se":
    {
         country = "se";
         culture = "sv-SE";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
 
        break;
    }
    case "no":
    {
         country = "no";
         culture = "nn-NO";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
       
        break;
    }
    case "ru":
    {
         country = "ru";
         culture = "ru-RU";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
        break;
    }
    case "in":
    {
         country = "in";
         culture = "en-IN";
         market = "direct";
         geo = "APAC";
         partnerName = "direct";
        break;
    }
    case "ca":
    {
         country = "ca";
         culture = "en-CA";
         market = "direct";
         geo = "NA";
         partnerName = "direct";
        break;
    }
    case "cf":
    {
         country = "cf";
         culture = "fr-CA";
         market = "direct";
         geo = "NA";
         partnerName = "direct";
        break;
    }
    case "cz":
    {
         country = "cz";
         culture = "cs-CZ";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
        break;
    }
    case "tr":
    {
         country = "tr";
         culture = "tr-TR";
         market = "direct";
         geo = "EMEA";
         partnerName = "direct";
        break;
    }

     default:
                country = "us";
	            culture = "en-us";
	            geo = "NA";
	            partnerName = "direct";
}

// start of pageName
pageName  = "corp" + ":" + culture + ":" + market + ":" + secondLevel;

// for error pages, add filename to complete pageName
if(fiilename.toLowerCase() == "404.aspx" || fiilename.toLowerCase() == "500.aspx" || fiilename.toLowerCase() == "500.html" || fiilename.toLowerCase() == "errorpage.aspx")
{
    if(UrltoSplit[1]!=undefined)
    {
        fiilename = fiilename + '?' + UrltoSplit[1];
    }
    pageName  = "corp" + ":" + culture + ":" + market + ":" + fiilename.toLowerCase();
    //alert("pageName: "+pageName);
    }

    if(thirdLevel !=undefined)
    {
        prop1 = "corp:" + culture.toLowerCase() + ":" + market + ":" + secondLevel;
        if(fourthLevel != undefined)
        {
            prop2 = prop1 + ":" + thirdLevel;
            if(fifthLevel != undefined)
            {
                prop3 = prop2 + ":" + fourthLevel;
                pageName = prop3 + ":" +  fiilename.toLowerCase();
            }
            else
            {
                pageName = prop2 + ":" +  fiilename.toLowerCase();
            }
        }
        else
        {  
               pageName = prop1 + ":" +  fiilename.toLowerCase();
        }
    }
    else
    {
        prop1 = "corp:" + culture.toLowerCase() + ":" + market + ":" + secondLevel;
    }

    //alert("pageName "+pageName);
    //alert("prop1 "+prop1);
    //alert("prop2 "+prop2);
    //alert("prop3 "+prop3);
    
function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0)
		{
			return null;
		}
	}
	else
	{
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	{
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

// Helper function, parse param from request string
  function getParam( name )
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
  }
  
function SetLocaleVariablesForOmniture()
{
//var partner = getParam('partner');
var userinfo =  getCookie("UserInfo");
var McAfeeBeta = getCookie("McAfeeBeta");
var GrantNumber = getCookie("GrantNumber");

/*
if(partner!=undefined && partner!='')
{
    s.prop6 = "partner";
    s.eVar6 =  s.prop6;
}
*/

//else
//{
    s.prop6 = market;
    s.eVar6 = market;
//}

var CampaignID = getParam('cid');
    if(pageName != undefined)
    {
        if(pageName.indexOf("#") != -1)
        {
            var HashpageName = pageName.split('#'); 
            pageName  =  HashpageName[0]
        }
    }
s.pageName = pageName.toLowerCase();

s.channel = prop1.toLowerCase();
if(prop2!=undefined && prop2.toString().length > 0)
{
        s.prop1 = prop2.toLowerCase();
        s.eVar22 = s.prop1;
}

if (prop3!=undefined && prop3.toString().length > 0)
{
    s.prop2 = prop3.toLowerCase();
    s.eVar3 = s.prop2;
}
s.prop4=country;
s.prop5=culture;

s.prop7=geo;

if(CampaignID != undefined)
{
s.campaign = CampaignID;
}

if(sPageType || sEvents){
s.pageType=sPageType;
s.events=sEvents;
}
s.eVar1="not defined";
s.eVar4=country;//"";
s.eVar5=culture;//"";

s.eVar7=geo;//

s.eVar21=s.channel; 
s.events = "event1"; // custom page views
}

		function trackomnituredownload(strFilename)
		{
		    s.linkTrackVars+=',events,prop15,eVar15,prop22,eVar26';
            s.linkTrackEvents='event4';
            s.eVar15=strFilename;
            s.events ='event4';
            s.prop15=strFilename;
            s.prop21=s.pageName;
            s.tl(this,'d','Download Type');
		}
		function SetLocaleVariables()
        {
            var partner = getParam('partner');
            var userinfo =  getCookie("UserInfo");
            var McAfeeBeta = getCookie("McAfeeBeta");
            var GrantNumber = getCookie("GrantNumber");

        if(partner!=undefined && partner!='')
        {
            s.prop6 = "partner";
            s.eVar6 =  s.prop6;
        }
        else
        {
            s.prop6 = market;
            s.eVar6 = market;
        }
        var CampaignID = getParam('cid');
           if(pageName != undefined)
            {
                if(pageName.indexOf("#") != -1)
                {
                    var HashpageName1 = pageName.split('#'); 
                    pageName  =  HashpageName1[0]
                }
            }
        s.pageName = pageName;

        s.channel = prop1.toLowerCase();
        if(prop2!=undefined && prop2.toString().length > 0)
        {
                s.prop1 = prop2;
                s.eVar22 = s.prop1;
        }

        if (prop3!=undefined && prop3.toString().length > 0)
        {
            s.prop2 = prop3;
            s.eVar3 = s.prop2;
        }
        s.prop4=country;
        s.prop5=culture;

        s.prop7=geo;

        if(CampaignID != undefined)
        {
        s.campaign = CampaignID;
        }

        if(sPageType || sEvents){
        s.pageType=sPageType;
        s.events=sEvents;
        }
        s.eVar1="not defined";
        s.eVar4=country;//"";
        s.eVar5=culture;//"";

        s.eVar7=geo;//

        s.eVar21=s.channel; 
        s.events = "event1"; // custom page views
}

/*Popup Scripts*/ //CR33945
    
    var win = null;
    function newWindow(mypage,myname,w,h,features) {
    //alert("2");
      var winl = (screen.width-w)/2;
      var wint = (screen.height-h)/2;
      if (winl < 0) winl = 0;
      if (wint < 0) wint = 0;
      //alert("3");
      var settings = 'height=' + h + ',';
      settings += 'width=' + w + ',';
      settings += 'top=' + wint + ',';
      settings += 'left=' + winl + ',';
      settings += features;
      //alert("4");
      win = window.open(mypage,myname,settings);
      //alert("5");
      win.window.focus();
    }

    $(function() {
        var getWidth = screen.width;
        var getHeight = screen.height;
        
        $('.fulScreenPopup').click(function() {
                var fsPopup = $(this).attr('href');
                newWindow(fsPopup,'', getWidth, getHeight,'');
                return false;
        });
        
        var chatPopup = $('.chatPopup').attr('href');
        $('.chatPopup').click(function() {
                //alert("chat" +chatPopup);
                newWindow(chatPopup,'','495','300','');
                return false;
        });
        
        $('.bioPopup').click(function() { 
                var bioPopup = $(this).attr('href');
                newWindow(bioPopup,'','676','450','scrollbars=yes');
                return false;
        });
        
        $('.demoPopup').click(function() {
                var demoPopup = $(this).attr('href');
                newWindow(demoPopup,'','810','650','');
                return false;
        });
		
	    $('.demosmPopup').click(function() {
                var demosmPopup = $(this).attr('href');
                newWindow(demosmPopup,'','770','570','');
                return false;
        });
        
        $('.tutorialPopup').click(function() {
                var tutorialPopup = $(this).attr('href');
                newWindow(tutorialPopup,'','960','520','');
                return false;
        });             
        
        $('.videoPopup').click(function() {
                var videoPopup = $(this).attr('href');
                newWindow(videoPopup,'','700','394','');
                return false;
        });     
        
        $('.podcastPopup').click(function() {
                var podcastPopup = $(this).attr('href');
                newWindow(podcastPopup,'','390','400','');
                return false;
        });
        
        // The line below is for the banner arrow links
        $('.standardBanner a').after('<img src="/img/arrow-link.png" width="21" height="17" />'); 
        
    });
	
	
// Equal Heights	
(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);	
	
$(document).ready(function() {
	$(".homePanel").equalHeights(164,700);
}); 

$(document).ready(function() {
	$(".homeProdPanel").equalHeights(164,700);
}); 	

	