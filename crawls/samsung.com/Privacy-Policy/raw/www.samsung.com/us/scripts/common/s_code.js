/* SiteCatalyst code version: H.22.1.
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/*
S_CODE FILE VERSION::   S 1_0 : 1.0.0
*/

var s_account=""; 

if ( window.location.host == "www.samsung.com"||window.location.host == "support-us.samsung.com"||window.location.host== "mobile.samsung.com"||window.location.host == "samsungsxswi.com") s_account="sssamsungnewus";
else if ( window.location.host == "originus.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "stgwebus.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "devwww.samsung.com"   ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "survey.foreseeresults.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "pages.samsung.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "ars.samsung.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "sems-us.samsung.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "shop.us.samsung.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "sso-us.samsung.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "samsungusanews.com" ) s_account = "sssamsungnewus";
else if ( window.location.host == "p15dev.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "p15stgapp.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "p15stgweb.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "p15prod.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "appstore.samsung.com" ) s_account = "sssamsungnewusdev";
else if ( window.location.host == "cho.samsung.com:8480" ) s_account = "sssamsungnewusdev";
else s_account = "sssamsungnewusdev"; 


var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,samsung.com,samsungwireless.com,samsunginstinct.com,samsungmobileusa.com,https://fun.samsungmobileusa.com/index.jsp,https://mobile.samsung.com,samsungusa.com,samsungmobile.com,samsungforbusiness.com,samsungsupport.com,samsungblackjack.com,samsungusanews.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"


//Create Samsung Global Variables
var ss_host = document.location.host.toLowerCase();
var ss_url = document.URL.toLowerCase();
var ss_title = document.title.toLowerCase();
var ss_url_noparams = ss_url; 


if(ss_url_noparams.indexOf("?") >= 0)
    ss_url_noparams = ss_url_noparams.substring(0,ss_url_noparams.indexOf("?"));

if(ss_url_noparams.substring(ss_url_noparams.length-1) == "/")
    ss_url_noparams = ss_url_noparams.substring(0,ss_url_noparams.length-1);

//Remove filename extensions
var types = new Array(".do",".html",".htm");    //Extensions to be removed
for(var i=0; i<types.length; i++)
{
    var pos = ss_url_noparams.lastIndexOf(types[i]);
    if( pos >= 0)
    {
        if( pos + types[i].length == ss_url_noparams.length)    //Is it at the end of the url?
            ss_url_noparams = ss_url_noparams.substring(0, ss_url_noparams.length-types[i].length);
    }
}


//Set the Server variable to the domain currently serving the content.
s.pageName = ss_url_noparams;


//Record page URL and URL w/o parameters
s.prop13 = ss_url_noparams;
s.prop14 = ss_url;

//Split URL for Taxonomy purposes
var url_split = ss_url_noparams.split("/");

//Prevent a filename from going into the taxonomy
for(var i =0; i < url_split.length; i++)
{
    if(url_split[i].indexOf('.') != -1)
        url_split[i] = "";
}

//Set the market based on the URL structure
s.prop2=s.eVar2 = url_split[3];

//Set the directory taxonomy based on the remaining URL structure
s.prop3=s.eVar3 = url_split[4];
s.prop4=s.eVar4 = url_split[5];
s.prop5=s.eVar5 = url_split[6];

//Set the second Hierarchy variable to the directory structure
var url_noparamsorprot = ss_url_noparams.substring(ss_url_noparams.indexOf("//")+2);
s.hier2 = url_noparamsorprot;


//Set module impressions
var mod_class = "module_set";
if(document.getElementsByClassName)
{
    var module_divs = document.getElementsByClassName(mod_class);
    if(module_divs.length > 0)
    {
        var modules = "";
        var sorted_modules = "";
        for(var i = 0; i < module_divs.length; i++)
        {
            if(module_divs[i].id && module_divs[i].id.length > 0)
            {
                if(i > 0)
                    modules += ",";
                modules += module_divs[i].id;
            }
        }
        sorted_modules = bubbleSort(modules,',','|');
        s.prop19 = s.prop20 = sorted_modules;
    }
}
else
{
    var divs = document.getElementsByTagName("div");
    if(divs.length > 0)
    {
        var modules = "";
        var sorted_modules = "";
        for(var i = 0; i < divs.length; i++)
        {
            if(divs[i].className == mod_class)
            {
                if(divs[i].id && divs[i].id.length > 0)
                {
                    if(modules.length > 0)
                        modules += ",";
                    modules += divs[i].id;
                }
            }
        }
        sorted_modules = bubbleSort(modules,',','|');
        s.prop19 = s.prop20 = sorted_modules;
    }
}

/*1.0.3*/
s.prop66="D=s_vi";

//Set time stamp to YYYY:MM:DD:HH
var now = new Date();
var now_month = now.getMonth()+1;
if(now_month.length == 1)
    now_month = "0" + now_month;
var now_date = now.getDate();
if(now_date.length == 1)
    now_date = "0" + now_date;
var now_hour = now.getHours();
if(now_hour.length == 1)
    now_hour = "0" + now_hour;
s.prop39=s.eVar41 = now.getFullYear() + ":" + now_month + ":" + now_date + ":" + now_hour;

//Begin Section to pull data from Page Injected Code
if(typeof(omn_ss_error_page) != 'undefined' && omn_ss_error_page.length > 0)
    s.pageType="errorPage";
    
if(typeof(omn_ss_internal_camp) != 'undefined' && omn_ss_internal_camp.length > 0)
    s.eVar7 = omn_ss_internal_camp.toLowerCase();
    
if(typeof(omn_ss_external_camp) != 'undefined' && omn_ss_external_camp.length > 0)
    s.prop23 = s.campaign = omn_ss_external_camp.toLowerCase();
    
if(typeof(omn_ss_channel) != 'undefined' && omn_ss_channel.length > 0)
{
    s.channel = omn_ss_channel.toLowerCase();
    if(s.channel == "home")
	s.pageName = "http://www.samsung.com/us";
}

if(typeof(omn_ss_language) != 'undefined' && omn_ss_language.length > 0)
    s.prop1 = s.eVar1 = omn_ss_language.toLowerCase();

if(typeof(omn_ss_pfc) != 'undefined' && omn_ss_pfc.length > 0)
    s.prop10 = omn_ss_pfc.toLowerCase();
else
    s.prop10 = "other";

if(typeof(omn_ss_loggedin) != 'undefined' && omn_ss_loggedin.length > 0)
{
    var li = omn_ss_loggedin.toLowerCase();
    if(li == "logged out")
	s.prop25 = "not logged in";
    else
	s.prop25 = li;
}

if(typeof(omn_ss_division) != 'undefined' && omn_ss_division.length > 0)
    s.prop30 = s.eVar54 = omn_ss_division.toLowerCase();


if(typeof(omn_ss_pagetype) != 'undefined' && omn_ss_pagetype.length > 0)
	s.prop22 = s.eVar52 = omn_ss_pagetype.toLowerCase();

if(typeof(omn_ss_searchResultCount) != 'undefined' && omn_ss_searchResultCount.toString().length > 0)
{
    s.prop7 = omn_ss_searchResultCount.toString().toLowerCase();
    if(omn_ss_searchResultCount.toString() == "0" && typeof(omn_ss_searchResultTerm) != 'undefined')
    {
        s.prop9 = s.prop11 = omn_ss_searchResultTerm.toLowerCase();
    }
}

if(typeof(omn_ss_supportSearchResultCount) != 'undefined' && omn_ss_supportSearchResultCount.toString().length > 0)
{
    s.prop7 = omn_ss_supportSearchResultCount.toLowerCase();
    if(omn_ss_supportSearchResultCount.toString() == "0" && typeof(omn_ss_supportSearchResultTerm) != 'undefined')
    {
        s.prop12 = omn_ss_supportSearchResultTerm.toLowerCase();
    }
}

if(typeof(omn_ss_products) != 'undefined' && omn_ss_products.length > 0)
    s.products = omn_ss_products.toLowerCase();

if(typeof(omn_ss_purchaseID) != 'undefined' && omn_ss_purchaseID.length > 0)
    s.purchaseID = omn_ss_purchaseID;

if(typeof(omn_ss_wallType) != 'undefined' && omn_ss_wallType.length > 0)
    s.prop34 = omn_ss_wallType.toLowerCase();

/*1.0.4*/
if(typeof(omn_ss_supportTab) != 'undefined' && omn_ss_supportTab.length > 0)
    s.prop68 = omn_ss_supportTab.toLowerCase();

if(typeof(omn_ss_productType) != 'undefined' && omn_ss_productType.length > 0)
    s.prop35 = s.eVar28 = omn_ss_productType.toLowerCase();

if(typeof(omn_ss_productSubType) != 'undefined' && omn_ss_productSubType.length > 0)
    s.prop36 = s.eVar29 = omn_ss_productSubType.toLowerCase();

if(typeof(omn_ss_productName) != 'undefined' && omn_ss_productName.length > 0)
    s.prop37 = s.eVar30 = s.eVar39 = omn_ss_productName.toLowerCase();

if(typeof(omn_ss_productModelCode) != 'undefined' && omn_ss_productModelCode.length > 0)
    s.eVar38 = omn_ss_productModelCode.toLowerCase();

if(typeof(omn_ss_revSource) != 'undefined' && omn_ss_revSource.length > 0)
    s.eVar32 = omn_ss_revSource.toLowerCase();

if(typeof(omn_ss_events) != 'undefined' && omn_ss_events.length > 0)
    s.events = omn_ss_events;

if(typeof(omn_ss_supportSection) != 'undefined' && omn_ss_supportSection.length > 0)
{
    s.prop27 = omn_ss_supportSection.toLowerCase();
}

/*1.0.2*/
if(typeof(omn_ss_prodregcounter) != 'undefined' && omn_ss_prodregcounter.length > 0)
{
    s.eVar18 = omn_ss_prodregcounter;
}

if(typeof(omn_ss_supportProductType) != 'undefined' && omn_ss_supportProductType.length > 0)
{
    s.eVar14 = omn_ss_supportProductType.toLowerCase();
    s.prop28 = s.eVar13 = s.pageName;
}

if(typeof(omn_ss_supportProductSubType) != 'undefined' && omn_ss_supportProductSubType.length > 0)
{
    s.eVar15 = omn_ss_supportProductSubType.toLowerCase();
}

if(typeof(omn_ss_howToGuide) != 'undefined' && omn_ss_howToGuide.length > 0)
{
    s.eVar16 = omn_ss_howToGuide.toLowerCase();
}


if(typeof(omn_ss_appname) != 'undefined' && omn_ss_appname.length > 0)
{
    s.eVar42 = omn_ss_appname.toLowerCase();
}

/*1.0.5*/
if(typeof(omn_ss_faqname) != 'undefined' && omn_ss_faqname.length > 0)
{
    s.prop67 = omn_ss_faqname.toLowerCase();
}

if(typeof(omn_ss_troubleshootingTopic) != 'undefined' && omn_ss_troubleshootingTopic.length > 0)
{
    s.eVar35 = omn_ss_troubleshootingTopic.toLowerCase();
}

if(typeof(omn_ss_surveyRespID) != 'undefined' && omn_ss_surveyRespID.length > 0)
{
    s.prop41 = s.eVar37 = omn_ss_surveyRespID.toLowerCase();
}

if(typeof(omn_ss_surveyName) != 'undefined' && omn_ss_surveyName.length > 0)
{
    s.prop40 = s.eVar36 = omn_ss_surveyName.toLowerCase();
}
if(typeof(omn_ss_db_vista_alt) != 'undefined' && omn_ss_db_vista_alt.length > 0)
{
    s.prop62 = omn_ss_db_vista_alt.toLowerCase();
}

//End Section to pull data from Page Injected Code




	////////////////////////////////
	//Hier 3 - Cross Sell Hierarchy
	///////////////////////////////
	
	//Note: the first element in each array is the roll-up
	var omn_cat = new Array(5);
	omn_cat[0] = ['video','tvs','blu-ray-dvd','projectors','home-theater'];
	omn_cat[1] = ['mobile','cell-phones','galaxy-tab','cell-phones-accessories','mp3-players','chromebook'];
	omn_cat[2] = ['photography','digital-cameras','camcorders','digital-photo-frames'];
	omn_cat[3] = ['computer','laptops','monitors','printers','projectors','memory-storage','chromebook'];
	omn_cat[4] = ['appliances','washers-dryers','refrigerators','microwaves','dishwashers','oven-ranges'];

	var omn_addToHier = "";
	var omn_rollup = "";
	for(var omn_i=0; omn_i < omn_cat.length; omn_i++)
	{
		if(s.prop3 == omn_cat[omn_i][0])
			omn_rollup = s.prop3;
		for(var omn_x=0; omn_x < omn_cat[omn_i].length; omn_x++)
		{		
			if(s.prop4 == omn_cat[omn_i][omn_x])
				omn_addToHier = s.prop4;
		}
	}
	
	s.prop43 = s.eVar51 = omn_rollup;
	
	if(omn_addToHier)
	{
		var omn_cross_sell = get_cookie("omn_hier");
		if(omn_cross_sell != null)
		{
			if(omn_cross_sell != "")
			{
				//If there is a value in the cookie
				omn_cross_sell = omn_cross_sell.split("<");
				if(omn_cross_sell.length < 5)
				{
					//If the last viewed category is the same as the current then don't add to hier
					if(omn_cross_sell[omn_cross_sell.length-1] == omn_addToHier)
						omn_addToHier = "";
					else		
						omn_cross_sell = omn_cross_sell.join("<") + "<" + omn_addToHier;
				}
				else

					omn_addToHier = "";
			}
		}
		else
		{
			omn_cross_sell = omn_addToHier;
		}
		if( omn_addToHier != "")
		{
			createCookie("omn_hier", omn_cross_sell, 0);
			s.hier3 = omn_cross_sell;
		}
	}	
    

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s){
    /* Add calls to plugins here */
    
    if(!s.campaign)
        s.campaign=semphonicGetQueryParm('cid');
    if(!s.campaign)
        s.campaign=semphonicGetQueryParm('EP_MID');
    if(!s.campaign)
        s.campaign=semphonicGetQueryParm('MKM_CID');
    if(!s.campaign)
     s.campaign=semphonicGetQueryParm('MKM_MID');
	
    /* Start DB VISTA Channel tracking code */    
   	
    if(!s.eVar7)
        s.eVar7 = semphonicGetQueryParm('int_cid');
    if(!s.eVar7)
        s.eVar7=semphonicGetQueryParm('INT'); 
    if(!s.eVar7)
        s.eVar7=semphonicGetQueryParm('pid');
    if (s.eVar7){
        s.prop62=s.eVar7;
    }
    if(!s.prop62)
	s.prop62=semphonicGetQueryParm('aid'); //get alternate id from URL

    if(s.campaign){
	s.prop63=s.campaign;
	s.prop64=s.campaign;
    }else if (s.prop62){
	s.prop63=s.prop62;
    }else{
	s.prop63="";
    }
    s.eVar71="D=c63"; 
 
    /* End DB VISTA Channel tracking code */  

	//Format the events variable based on presence of custom page code and then add the Page View event
	//modified 12_12_11 note 1.0.1
        s.events=s.apl(s.events,'event16',',',1);
     
    s.eVar7=s.getValOnce(s.eVar7,"s_v7",0);
    s.campaign = s.getValOnce(s.campaign,"s_campaign",0);

    s.prop23 = s.campaign;
    s.eVar17 = s.pageName;
    if(s.events && s.events.indexOf("prodView") >= 0)
    {
        s.eVar24="+1";
        s.events=s.apl(s.events,'event2',',',1);
        s.hier1=s.prop2 + ">" + s.prop35 + ">" + s.prop36 + ">" + s.prop37;
    }

    //Set Login event based on Logged In/Logged Out variable
    var li_status = s.getPreviousValue(s.prop25,'gpv_lis','');
/*
    if(typeof(omn_ss_loggedin) != 'undefined' && li_status != 'logged in' && omn_ss_loggedin == 'logged in')
    {
        if(s.events && s.events.length > 0)
            s.events += ",event7,event39";
        else
            s.events = "event7,event39";
    }
*/
    var loginSuccessCookie = getCookie('prof_login_success');

	if(loginSuccessCookie){
                 s.prop15=s.eVar9= "successful login";
		 s.events = "event39";
		deleteCookie('prof_login_success','/',document.domain);	 // remove cookie to avoid multiple omniture calls
	}
    if(typeof(omn_ss_loggedin) == 'undefined' || !omn_ss_loggedin || omn_ss_loggedin.length == 0)
    {
        if(typeof(li_status) != 'undefined' || li_status)
        {
            s.prop25 = li_status;
        }
    }

    s.prop24 = s.getNewRepeat();
    s.server = document.location.host.toLowerCase();
    if(!s.eVar45)
        s.eVar45=s.prop47=semphonicGetQueryParm('MKM_LID');
    if(!s.eVar45)
        s.eVar45=s.prop47=semphonicGetQueryParm('LID');
    
    if(!s.eVar50)
        s.eVar50=semphonicGetQueryParm('EP_RID');
    if(!s.eVar50)
        s.eVar50=semphonicGetQueryParm('MKM_RID');
    
    s.eVar50=s.getValOnce(s.eVar50,"s_evar50",0);
    s.eVar50 = s.c_r('prof_bpno_s');
    
    if(s.eVar50)
        s.prop50 = s.eVar50;

    // capture previous page name; if it exists, capture percent of page viewed for that page
    s.prop53 = s.getPreviousValue(s.pageName,'gpv_pn');
    if (s.prop53)
    {
	s.prop54 = s.getPercentPageViewed();
    }

//Division variables revised 2_28_12
	if(s.prop3 && s.prop3 == 'video') s.prop30 = s.eVar54 = 'shop:tv_video';
	if(s.prop3 && s.prop3 == 'mobile') s.prop30 = s.eVar54 = 'shop:mobile';
	if(s.prop3 && s.prop3 == 'computer') s.prop30 = s.eVar54 = 'shop:computing';
	if(s.prop3 && s.prop3 == 'appliances') s.prop30 = s.eVar54 = 'shop:home_appliances';
	if(s.prop3 && s.prop3 == 'photography') s.prop30 = s.eVar54 = 'shop:photo';
	if(s.prop3 && s.prop3 == 'appstore') 
	{
 	   if(s.prop35 && s.prop35 == 'tvapp') s.prop30 = s.eVar54 = 'shop:tv_video';		
	}
	if(s.prop3 && s.prop3 == 'support')
	{
          if(s.eVar14 && s.eVar14=='cell-phones') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='tvs') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='cell phones') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='printers') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='laptops') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='monitors') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='blu-ray-dvd') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='galaxy-tab') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='galaxy tab') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='refrigerators') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='blu-ray &amp; dvd') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='home-theater') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='home theater') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='blu ray-dvd') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='memory-storage') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='washers-dryers') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='camcorders') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='mp3-players') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='digital-cameras') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='mp3 players') s.prop30=s.eVar54='support:mobile';
          if(s.eVar14 && s.eVar14=='microwaves') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='tablet-pcs') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='digital cameras') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='washers &amp; dryers') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='memory storage') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='tablet pcs') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='washers dryers') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='dishwashers') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='memory &amp; storage') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='oven-ranges') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='oven ranges') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='chromebook') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='all-in-one-pcs') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='projectors') s.prop30=s.eVar54='support:tv_video';
          if(s.eVar14 && s.eVar14=='digital-photo-frames') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='all in-one-pcs') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='all-in-one pcs') s.prop30=s.eVar54='support:computing';
          if(s.eVar14 && s.eVar14=='digital photo-frames') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='digital photo frames') s.prop30=s.eVar54='support:photo';
          if(s.eVar14 && s.eVar14=='air conditioners') s.prop30=s.eVar54='support:home_appliances';
          if(s.eVar14 && s.eVar14=='air-conditioners') s.prop30=s.eVar54='support:home_appliances';
	}
    

    
    //Call to omnitureReviews function in s_doPlugins: 
    s.omnitureReviews("totalReviewCount:eVar48,avgRating:eVar49,type|product:campaign",true); 
 
    //Prevent Facebook referrer inflation
    s.referrer=s.facebookSocialRefferrers();

    var filter_state = get_cookie("ss_fs");
    if(filter_state && filter_state.length > 0)
    {
	if(s.events && s.events.indexOf("event16") >= 0)
	{
	    if(s.products && s.products.length > 0)
	    {
	    	s.eVar55 = filter_state;
	    	s.eVar20 = "+1";
		s.events=s.apl(s.events,'event73',',',1);
	    }
	    createCookie("ss_fs","");
	}
    }

}

s.doPlugins=s_doPlugins








////////////////////////////////////////
/* SEMPHONIC edits for plug-ins BEGIN */

function ss_link_click_track_2(vLinkTrackVars, vLinkTrackEvents, vLinkTrackProducts, vLinkTrackValues, vLinkLocation, vType, vTypeName) {
    s.events = "";
    var vSplitLinkTrackVars = vLinkTrackVars.split(',');
    var vSplitLinkTrackValues = "";
     
    if (typeof(vLinkTrackValues)!="string")  
        vSplitLinkTrackValues = vLinkTrackValues ;
    else 
        vSplitLinkTrackValues = vLinkTrackValues.split(',');
   
    if(vLinkTrackVars && typeof(vLinkTrackVars) != 'undefined' && vLinkTrackVars.length > 0)
	vLinkTrackVars += ",prop15,prop16,prop17,eVar9,eVar10,eVar11";
    else
	vLinkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";

    if(typeof(s.pageName) == "undefined" || s.pageName == "null" || s.pageName == "undefined")
	s.pageName = document.URL.toLowerCase();

    s.prop15=s.eVar9= vTypeName.toLowerCase();
    s.prop16=s.eVar10= s.pageName + ">" + vTypeName.toLowerCase();
    s.prop17=s.eVar11= s.pageName + ">" + vLinkLocation.toLowerCase() + ">" + vTypeName.toLowerCase();

    s.linkTrackVars = vLinkTrackVars;
    s.linkTrackEvents = vLinkTrackEvents;
   
    if(vLinkTrackEvents && typeof(vLinkTrackEvents) != "undefined" && vLinkTrackEvents.length > 0)
    {
	s.events = s.linkTrackEvents = vLinkTrackEvents;
	if(s.linkTrackVars.length > 0)
	    s.linkTrackVars += ",events";
	else
	    s.linkTrackVars = "events";
    }

    if(vLinkTrackProducts && typeof(vLinkTrackProducts) != "undefined" && vLinkTrackProducts.length > 0)
    {
	s.products = vLinkTrackProducts.toLowerCase();
	if(s.linkTrackVars.length > 0)
	    s.linkTrackVars += ",products";
	else
	    s.linkTrackVars = "products";
    }

    for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {

	try 
	{
	    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim().toLowerCase();
	}
	catch(ex) 
	{
	    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
	}

    }
   
   s.tl(this, vType, vTypeName);
   s.linkTrackVars='None';
   s.linkTrackEvents='None';
}

var comp_init = false;
function ss_compareAdd()
{
    if(!comp_init)
    {
	ss_link_click_track_2('','event3','','','product comparison','o','compare start');
	comp_init = true;
    }
}

function ss_filter_click(filter)
{
    var filter_state = get_cookie("ss_fs");
    if(filter_state)
    {
    	var loc = filter_state.indexOf(filter);
    	if(loc >= 0)
    	{
	    if(loc == 0)
	    {
	    	filter_state = filter_state.substring(filter.length);
	    	if(filter_state.length > 0)
		    filter_state = filter_state.substring(1);
	    }
	    else
	    {
	    	filter_state = filter_state.substring(0,loc-1) + filter_state.substring(loc+filter.length);
	    }
        }
        else
        {
	    if(filter_state.length > 0)
	    	filter_state += "|" + filter;
	    else
	    	filter_state = filter;
    	}
    }
    else
	filter_state = filter;
    
    filter_state = bubbleSort(filter_state,'|','|');
    createCookie("ss_fs",filter_state);
}

function ss_jumbo_wall_click(wallType, panelType, linkName)
{
    s.linkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";
    s.linkTrackEvents = s.events = "";
    s.prop15=s.eVar9= linkName.toLowerCase();
    s.prop16=s.eVar10= wallType.toLowerCase() + ">" + linkName.toLowerCase();
    s.prop17=s.eVar11= wallType.toLowerCase() + ">" + panelType.toLowerCase() + ">" + linkName.toLowerCase();

    s.tl(this, 'o', linkName);
    s.linkTrackVars='None';
    s.linkTrackEvents='None';
}

function ss_jumbo_wall_nav_click(wallType, panelType, linkName, topNav)
{
    s.linkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";
    s.linkTrackEvents = s.events = "";
    s.prop15=s.eVar9= linkName.toLowerCase();
    s.prop16=s.eVar10= wallType.toLowerCase() + ">" + linkName.toLowerCase();
    s.prop17=s.eVar11= wallType.toLowerCase() + ">" + panelType.toLowerCase() + ">" + linkName.toLowerCase();

    if(topNav)
    {
	s.linkTrackVars += ",prop34";
	s.prop34 = linkName;
    }

    s.tl(this, 'o', linkName);
    s.linkTrackVars='None';
    s.linkTrackEvents='None';
}

function ss_jc_click_track(vLinkTrackVars, vLinkTrackEvents, vLinkTrackProducts, vLinkTrackValues, vPage, vLinkLocation, vType, vTypeName) {
    s.events = "";
    var vSplitLinkTrackVars = vLinkTrackVars.split(',');
    var vSplitLinkTrackValues = "";
     
    if (typeof(vLinkTrackValues)!="string")  
        vSplitLinkTrackValues = vLinkTrackValues ;
    else 
        vSplitLinkTrackValues = vLinkTrackValues.split(',');
   
    if(vLinkTrackVars && typeof(vLinkTrackVars) != 'undefined' && vLinkTrackVars.length > 0)
	vLinkTrackVars += ",prop15,prop16,prop17,eVar9,eVar10,eVar11";
    else
	vLinkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";

    s.prop15=s.eVar9= vTypeName.toLowerCase();
    s.prop16=s.eVar10= vPage.toLowerCase() + ">" + vTypeName.toLowerCase();
    s.prop17=s.eVar11= vPage.toLowerCase() + ">" + vLinkLocation.toLowerCase() + ">" + vTypeName.toLowerCase();

    s.linkTrackVars = vLinkTrackVars;
    s.linkTrackEvents = vLinkTrackEvents;
   
    if(vLinkTrackEvents && typeof(vLinkTrackEvents) != "undefined" && vLinkTrackEvents.length > 0)
    {
	s.events = s.linkTrackEvents = vLinkTrackEvents;
	if(s.linkTrackVars.length > 0)
	    s.linkTrackVars += ",events";
	else
	    s.linkTrackVars = "events";
    }

    if(vLinkTrackProducts && typeof(vLinkTrackProducts) != "undefined" && vLinkTrackProducts.length > 0)
    {
	s.products = vLinkTrackProducts.toLowerCase();
	if(s.linkTrackVars.length > 0)
	    s.linkTrackVars += ",products";
	else
	    s.linkTrackVars = "products";
    }

    for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {

	try 
	{
	    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim().toLowerCase();
	}
	catch(ex) 
	{
	    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
	}

    }
   
   s.tl(this, vType, vTypeName);
   s.linkTrackVars='None';
   s.linkTrackEvents='None';
}

function semphonicGetQueryParm(qpin)
{
    var qp = qpin.toLowerCase();
    var d_URL = document.URL.toLowerCase();
    var pos = d_URL.indexOf("?" + qp + "=");
    if (pos == -1)
        pos = d_URL.indexOf("&" + qp + "=");
    if (pos == -1)
          return null;
    pos += qp.length+2;
    if (pos >= d_URL.length)
          return null;
    var endPos1 = d_URL.indexOf("&", pos);
    var endPos2 = d_URL.indexOf("#", pos);
    if (endPos1 < 0 && endPos2 < 0)
    {
        return unescape(d_URL.substring(pos));
    }
    var endPos = endPos1;
    if (endPos < 0 || (endPos2 >= 0 && endPos2 < endPos1))
        endPos = endPos2;

    return unescape(d_URL.substring(pos, endPos));
}

function bubbleSort(ul,splitdelim,joindelim)
{
    var sorted_list = "";
    var unsorted_list = ul.split(splitdelim);

    var i, j, save_val;
    for(i = 0; i < unsorted_list.length; i++)
    {
    for(j = 0; j < unsorted_list.length - 1; j++)
    {
        if(unsorted_list[j] > unsorted_list[j+1])
        {
        save_val = unsorted_list[j+1];
        unsorted_list[j+1] = unsorted_list[j];
        unsorted_list[j] = save_val;
        }
    }
    }
    sorted_list = unsorted_list.join(joindelim);

    return sorted_list;
}

    //Cookie helper functions
    function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    }
    function get_cookie(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

        if (results)
            return (unescape(results[2]));
        else
            return null;
    }

/* SEMPHONIC edits END */
/////////////////////////




/* Configure Modules and Plugins */

s.loadModule("Media")
s.Media.autoTrack=true
s.Media.trackVars="None"
s.Media.trackEvents="None"


/************************** DFA VARIABLES **************************/
/* 
 * DFA wizard and that match your desired preferences. Some of the 
 * variables are optional and have been labeled as such below. */

var dfa_CSID='1511760'; // DFA Client Site ID
var dfa_SPOTID='1782317'; // DFA Spotlight ID
var dfa_tEvar='eVar21'; // transfer variable, typically the "View Through" eVar.
var dfa_errorEvar=''; // DFA error tracking (optional)
var dfa_timeoutEvent=''; // Tracks timeouts/empty responses (optional)
var dfa_requestURL="http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]"; // the DFA request URL
s.maxDelay="750" // maximum time to wait for DFA, in milliseconds

var dfa_visitCookie="s_dfa"; // The name of the visitor cookie to use to restrict DFA calls to once per visit.
var dfa_overrideParam="DFA"; // A query string paramter that will force the DFA call to occur.
var dfa_newRsidsProp=""; //="prop34"; // Stores the new report suites that need the DFA tracking code. (optional)
/************************ END DFA Variables ************************/

//DFA Genesis Integration
s.loadModule("Integrate");
s.Integrate.onLoad=function(s,m) {
	var dfaCheck = s.partnerDFACheck(dfa_visitCookie,dfa_overrideParam,dfa_newRsidsProp);
	if (dfaCheck) {
		s.Integrate.add("DFA");
		s.Integrate.DFA.tEvar=dfa_tEvar;
		s.Integrate.DFA.errorEvar=dfa_errorEvar;
		s.Integrate.DFA.timeoutEvent=dfa_timeoutEvent;
		s.Integrate.DFA.CSID=dfa_CSID;
		s.Integrate.DFA.SPOTID=dfa_SPOTID;
		s.Integrate.DFA.get(dfa_requestURL);
		s.Integrate.DFA.setVars=function(s,p) {
			if (window[p.VAR]) { // got a response
				if(!p.ec) { // no errors
					s[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lcs?p.lcs:0)+"-"+(p.lcp?p.lcp:0)+"-"+(p.lastclk?p.lastclk:0)+"-"+(p.lastclktime?p.lastclktime:0)
				} else if (p.errorEvar) { // got an error response, track
					s[p.errorEvar] = p.ec;
				}
			} else if (p.timeoutEvent) { // empty response or timeout
				s.events = ((!s.events || s.events == '') ? '' : (s.events + ',')) + p.timeoutEvent; // timeout event
			}
		}
	}
}

/********************************************************************
 *
 * Main Plug-in code (should be in Plug-ins section)
 *
 *******************************************************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Partner Plugin: DFA Check 0.9 - Restrict DFA calls to once a visit,
 * per report suite, per click through. Used in conjunction with VISTA
 */
s.partnerDFACheck=new Function("c","src","p",""
+"var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+"ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+"_r(c);if(cr){v=0;}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<a"
+"a.length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1"
+";}}if(!fnd){cs[cn]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k"
+"++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}q="
+"s.wd.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf("
+"'&'+src.toLowerCase()+'=');if(g>-1){s.vpr(p,cr);v=1;}if(!s.c_w(c,cr"
+",t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}return v>=1;");


/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

    
/*
 * facebookSocialPlugin v1.1 - stopping the referrer inflation
 */
s.facebookSocialRefferrers=new Function("c",""
+"var s=this,g,i,j,m,v,d,x,J,n=new Date;n.setTime(n.getTime()+1800000"
+");c=c?c:'s_fbsr';if(s.c_r(c)){J=0}if(!s.c_w(c,1,n)){s.c_w(c,1,0)}if"
+"(!s.c_r(c)){J=0}x=g=s.referrer?s.referrer:document.referrer;if(J==0"
+"){g=g.toLowerCase();if(g){z=g.indexOf('?');i=z>-1?z:g.length;j=g.su"
+"bstring(0,i);v=j.indexOf('facebook.com')>-1?1:'';if(v){f=s.getQuery"
+"Param('u','',g);if(f){d=s.linkInternalFilters.toLowerCase();d=s.spl"
+"it(d,',');b=d.length;for(c=0;c<b;c++){m=f.indexOf(d[c])>-1?1:'';if("
+"m)x=d[1];}}}}}return x");


/* 
 * Plugin: omnitureReviews 0.6 - Depends on ratingsDisplayed function 
 *              defined before the bazaarvoice code (for review collection). 
 */ 
s.omnitureReviews=new Function("p","owr","" 
+"var list='type,client,landing,product,link';" 
+"s=this,qs='bv';prm=s.getQueryParam(qs);if(typeof(omnitureReview" 
+")=='undefined'&&prm!='')omnitureReview=new Object();if(prm!=''){var" 
+" bar=s.split(prm,'-_-');var z=0;while(list){i=list.indexOf(',');i=i" 
+"<0?list.length:i;d=list.substring(0,i);if(d)omnitureReview[d]=bar[z" 
+"];z++;list=list.substring(i==list.length?i:i+1)}}if(typeof(omniture" 
+"Review)!='undefined'){var po=omnitureReview;if(!owr||(owr&&po.revie" 
+"wsFound)){var vs='',i,j,pv,ajc=po.ajaxCatch,nltv='';while(p){i=p.in" 
+"dexOf(',');i=i<0?p.length:i;d=p.substring(0,i);if(d){j=p.indexOf(':" 
+"');if(j>0){pv=d.substring(0,j);d=d.substring(j==d.length?j:j+1);whi" 
+"le(d){j=d.indexOf('|');j=j<0?d.length:j;vs=d.substring(0,j);if(pv.i" 
+"ndexOf('|')>0){var fl,pz='';ptm=pv;while(ptm){k=ptm.indexOf('|');k=" 
+"k<0?ptm.length:k;pv=ptm.substring(0,k);ptm=ptm.substring(k==ptm.len" 
+"gth?k:k+1);dl=fl?'|':'';if(!('undefined'==typeof(po[pv]))){pz=pz+dl" 
+"+po[pv];fl=1;}}s.vpr(vs,pz);if(ajc)nltv+=vs+','}else s.vpr(vs,('und" 
+"efined'==typeof(po[pv]))?'':po[pv]);if(ajc)nltv+=vs+',';d=d.substri" 
+"ng(j==d.length?j:j+1)}}}p=p.substring(i==p.length?i:i+1)}if(ajc)s.l" 
+"inkTrackVars=nltv}}"); 
 
 
/* 
 * Plugin Utilities v3.0 (Required For All Plugins) 
 */ 
s.vpr=new Function("vs","v", 
"var s=this,k=vs.substring(0,2)=='s_'?vs.substring(2):vs;s['vpv_'+k]=" 
+"v;s['vpm_'+k]=1"); 
s.dt=new Function("tz","t", 
"var d=new Date;if(t)d.setTime(t);d=new Date(d.getTime()+(d.getTimezo" 
+"neOffset()*60*1000));return new Date(Math.floor(d.getTime()+(tz*60*" 
+"60*1000)))"); 
s.vh_gt=new Function("k","v", 
"var s=this,vh='|'+s.c_r('s_vh_'+k),vi=vh.indexOf('|'+v+'='),ti=vi<0?" 
+"vi:vi+2+v.length,pi=vh.indexOf('|',ti),t=ti<0?'':vh.substring(ti,pi" 
+"<0?vh.length:pi);return t"); 
s.vh_gl=new Function("k", 
"var s=this,vh=s.c_r('s_vh_'+k),e=vh?vh.indexOf('='):0;return vh?(vh." 
+"substring(0,e?e:vh.length)):''"); 
s.vh_s=new Function("k","v", 
"if(k&&v){var s=this,e=new Date,st=e.getTime(),y=e.getYear(),c='s_vh_" 
+"'+k,vh='|'+s.c_r(c)+'|',t=s.vh_gt(k,v);e.setYear((y<1900?y+1900:y)+" 
+"5);if(t)vh=s.rep(vh,'|'+v+'='+t+'|','|');if(vh.substring(0,1)=='|')" 
+"vh=vh.substring(1);if(vh.substring(vh.length-1,vh.length)=='|')vh=v" 
+"h.substring(0,vh.length-1);vh=v+'=[PCC]'+(vh?'|'+vh:'');s.c_w(c,vh," 
+"e);if(s.vh_gt(k,v)!='[PCC]')return 0;vh=s.rep(vh,'[PCC]',st);s.c_w(" 
+"c,vh,e)}return 1"); 


/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Plugin: getQueryParam 2.3  
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"escp(v)}return ''");

/*
 * Plugin: getPercentPageViewed v1.2
 */
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");
s.getPPVSetup();

/*
 * Plugin: getValOnce_v1.0 
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="samsung"
s.trackingServer="nmetrics.samsung.com"
s.trackingServerSecure="smetrics.samsung.com";

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"
+"Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"
+"Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"
+"{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"
+"i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"
+"=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"
+"stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"
+"+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"
+"p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"
+"i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v=\"`z_c_il[\"+m._in+\"],o=`i['\"+i+\"']\"`3p^G^HWindows `P `R"
+"o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"
+"('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"
+"?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"
+"^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"
+"4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"
+"^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";
s.m_i("Media");

//DFA Genesis Integration
/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}





////////////////////////////////////////////////////////////////////////////////////////////
////
//// The following code is from the 1.0 Implementation and should be phased out or absorbed into the 1.5 Implementation
////
////////////////////////////////////////////////////////////////////////////////////////////




if(ss_url_noparams.indexOf("search/espsearchresult") >= 0)
{
	//outer search frame. skipped in order to avoid duplicate page view counts on the search results page.
}
else
	var s_code=s.t();if(s_code)document.write(s_code);


function click_omniture_appstore (eventName, navPath) {
    var path_split = navPath.split (":");
    var t_trackVars = "";
    var full_nav_path = navPath.replace(/:/gi, ">");
    if (path_split.length == 3) {
        t_trackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11,events";
        s.prop15=s.eVar9=path_split[2];
        s.prop16=s.eVar10=path_split[0] + ">" + path_split[2];
        s.prop17=s.eVar11=full_nav_path;
    }
    
    if (path_split.length == 2) {
        t_trackVars = "prop15,prop16,eVar9,eVar10,events";
        s.prop15=s.eVar9=path_split[2];
        s.prop16=s.eVar10=full_nav_path;
    }
    
    s.linkTrackVars=t_trackVars;
    s.linkTrackEvents=eventName; 
    s.events=eventName;
    s.tl(this,'o',full_nav_path);
    s.linkTrackVars='none';
    s.linkTrackEvents='none';
}

/*
a - User Action (must be one of the following: 'PLAYING','STOPPED','COMPLETED','FASTFORWARDED','REWOUND', or 'PAUSED')
n - Video Name (filename or id, whatever is known)
c_T - Current Video Time (current video time on click to the second)
t_T - Total Video Time (total length of video to the second)
vs - Video Source (could be author, creative team or producer, whatever the known source is)
d - Video Date (date the video was uploaded)
c - Video Category (broad category like 'tvs' or 'ugc', whatever might be known)
*/
function ss_trackVideo(a,n,c_T,t_T,vs,d,c)
{
	s.linkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";
	s.linkTrackEvents = "none";

	s.prop15 = s.eVar9 = "video " + a.toLowerCase();
	s.prop16 = s.eVar10 = s.pageName + ">video " + a.toLowerCase();
	s.prop17 = s.eVar11 = s.pageName + ">" + c + ">video " + a.toLowerCase();

	switch(a)
	{
		
		case 'PLAYING':
			s.linkTrackEvents = s.events = "event9";
			s.linkTrackVars += ",events,eVar22";
			s.eVar22 = n;
		  	break;
		case 'PAUSED':
	  		break;
		case 'STOPPED':
	  		break;
		case 'COMPLETED':
	  		break;
		case 'FASTFORWARDED':
	  		break;
		case 'REWOUND':
	  		break;
		default:
			break;
	}

   	s.tl(this, "o", "video " + a.toLowerCase() + ": " + n);
   	s.linkTrackVars="none";
   	s.linkTrackEvents="none";
	s.events = s.eVar22 = "";
}

function trackBVClick(e)
{
	var ev;
	var srcElem;
	if(!window.event)
	{
		ev = e;
		srcElem = ev.target;
	}
	else
	{
		ev = window.event;
		srcElem = ev.srcElement;
	}

	var elClass = srcElem.getAttribute("class");
	elClass = elClass ? elClass : srcElem.getAttribute("classname");

	s.linkTrackVars = "prop15,prop16,prop17,eVar9,eVar10,eVar11";
	s.linkTrackEvents = "";
	var linkName = "";
	var linkArea = "";
	var track = "false";

	if(elClass == 'BVRRSocialBookmarkLinkImage') //for social media share clicks from the review page
	{
/*		var alt = srcElem.alt;
		if(typeof(alt) == 'undefined' || alt == null)
			alt = "unknown";

		switch(alt.toLowerCase())
		{
			case 'facebook':
				s.linkTrackVars += ",events,eVar47";
				s.linkTrackEvents = s.events = "event57";
				s.eVar47 = "facebook";
				linkName = "share review";
				linkArea = "bv review";
				track = "true";
				break;
			case 'digg':
				s.linkTrackVars += ",events,eVar47";
				s.linkTrackEvents = s.events = "event57";
				s.eVar47 = "digg";
				linkName = "share review";
				linkArea = "bv review";
				track = "true";
				break;
			case 'delicious':
				s.linkTrackVars += ",events,eVar47";
				s.linkTrackEvents = s.events = "event57";
				s.eVar47 = "delicious";
				linkName = "share review";
				linkArea = "bv review";
				track = "true";
				break;
			case 'twitter':
				s.linkTrackVars += ",events,eVar47";
				s.linkTrackEvents = s.events = "event57";
				s.eVar47 = "twitter";
				linkName = "share review";
				linkArea = "bv review";
				track = "true";
				break;
			case 'stumbleupon':
				s.linkTrackVars += ",events,eVar47";
				s.linkTrackEvents = s.events = "event57";
				s.eVar47 = "stumbleupon";
				linkName = "share review";
				linkArea = "bv review";
				track = "true";
				break;
			default:
				break;
		}
*/
	}
/*	else if(elClass == 'BVDILabel') //for review feedback clicks
	{
		if(srcElem.innerHTML.toLowerCase() == 'helpful')
		{
			s.linkTrackVars += ",events,eVar46";
			s.linkTrackEvents = s.events = "event56";
			s.eVar46 = "helpful";
			linkName = "helpful";
			linkArea = "bv review";
			track = "true";
		}
		else if(srcElem.innerHTML.toLowerCase() == 'not helpful')
		{
			s.linkTrackVars += ",events,eVar46";
			s.linkTrackEvents = s.events = "event56";
			s.eVar46 = "not helpful";
			linkName = "not helpful";
			linkArea = "bv review";
			track = "true";
		}
	}
	else if(elClass == 'BVDILinkSpan')
	{
		if(srcElem.innerHTML.toLowerCase() == 'report')
		{
			s.linkTrackVars += ",events,eVar46";
			s.linkTrackEvents = s.events = "event56";
			s.eVar46 = "report";
			linkName = "report";
			linkArea = "bv review";
			track = "true";
		}
	}
	else if(srcElem.id == 'BVQASubmitQuestionButtonID')
	{
		s.linkTrackVars += ",events";
		s.linkTrackEvents = s.events = "event63";
		linkName = "submit";
		linkArea = "bv ask a question";
		track = "true";
	}
	else if(srcElem.id == 'BVQASubmitAnswerButtonID')
	{
		s.linkTrackVars += ",events";
		s.linkTrackEvents = s.events = "event64";
		linkName = "submit";
		linkArea = "bv answer a question";
		track = "true";
	}
*/
	else if(srcElem.innerHTML == 'Search')
	{
		s.linkTrackVars += ",events";
		s.linkTrackEvents = s.events = "event65";
		linkName = "search";
		linkArea = "community q & a";
		track = "true";
	}

	if(track == "true")
	{
		s.prop15 = s.eVar9 = linkName;
		s.prop16 = s.eVar10 = s.pageName + ">" + linkName;
		s.prop17 = s.eVar11 = s.pageName + ">" + linkArea + ">" + linkName;

		s.tl(this, "o", linkName);
		s.linkTrackVars = "None";
		s.linkTrackEvents = "None";
	}
}

function ss_link_click_track(vLinkTrackVars, vLinkTrackEvents, vLinkTrackProducts, vLinkTrackValues, vType, vTypeName) {
    s.events = "";
    var vSplitLinkTrackVars = vLinkTrackVars.split(',');
    var vSplitLinkTrackValues = "";
     
    if (typeof(vLinkTrackValues)!="string")  
        vSplitLinkTrackValues = vLinkTrackValues ;
    else 
        vSplitLinkTrackValues = vLinkTrackValues.split(',');
   
    
    s.linkTrackVars = vLinkTrackVars;
    s.linkTrackEvents = vLinkTrackEvents;
   
    for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
        if(vSplitLinkTrackVars[xFI] == "products") {
            s[vSplitLinkTrackVars[xFI]]= vLinkTrackProducts;
        } 
        else {
            if(vSplitLinkTrackVars[xFI] == "events") {
                s[vSplitLinkTrackVars[xFI]]= vLinkTrackEvents;
            }
            else {
                try {
                    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
                }
                catch(ex) {
                    s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
                }
            }
        }
    }
   
   s.tl(this, vType, vTypeName);
   s.linkTrackVars='none';
   s.linkTrackEvents='none';
}

function ss_support_search_click(vSearchTerm,vSearchCategory,vPredictive) {
    
    s.linkTrackVars = 'prop8,eVar8,prop15,prop16,prop17,eVar9,eVar10,eVar11,eVar34,events';
    s.linkTrackEvents = s.events = 'event1';
    s.prop15 = s.eVar9 = 'support search';
    s.prop16 = s.eVar10 = s.pageName + '>support search';
    s.prop17 = s.eVar11 = s.pageName + '>support search>support search';

    s.prop8 = s.eVar8 = vSearchCategory;
    s.eVar34 = vSearchTerm;

    if(vPredictive == 1)
    {
        s.linkTrackEvents = s.events = s.events + ',event11';  
	s.linkTrackVars += ',eVar19'; 
        s.eVar19 = vSearchTerm;
    }

    s.tl(this, 'o', 'support search');
    s.linkTrackVars='none';
    s.linkTrackEvents='none';
}

function ss_search_click(vSearchTerm,vSearchCategory,vPredictive) {
    
    s.linkTrackVars = 'prop6,prop8,eVar6,prop15,prop16,prop17,eVar9,eVar10,eVar11,events';
    if(vSearchCategory == 'general')
    {
        s.linkTrackEvents = 'event5';
        s.events = 'event5';
        s.linkTrackVars += ',eVar23';
        s.eVar23 = '+1';
    }
    else if(vSearchCategory == 'predictive')
    {
        s.linkTrackEvents = 'event11';
        s.events = 'event11';
	s.linkTrackVars += ',eVar19';
        s.eVar19 = vSearchTerm;
    }
    else if(vSearchCategory == 'accessory')
    {
        s.linkTrackEvents = 'event53';
        s.events = 'event53';
    }
    else if(vSearchCategory == 'category')
    {
        s.linkTrackEvents = 'event73';
        s.events = 'event73';
    }
    else if(vSearchCategory == 'accessory compatibility')
    {
        s.linkTrackEvents = 'event80';
        s.events = 'event80';
    }
    else
    { //default case: defaults to a general search
        s.linkTrackEvents = 'event5';
        s.events = 'event5';
        s.linkTrackVars += ',eVar23';
        s.eVar23 = '+1';
    }
    
    s.prop15 = s.eVar9 = vSearchCategory + ' search';
    s.prop16 = s.eVar10 = s.pageName + '>' + vSearchCategory + ' search';
    s.prop17 = s.eVar11 = s.pageName + '>internal search>' + vSearchCategory + ' search';
    s.prop6 = s.eVar6 = vSearchTerm;
    s.prop8 = vSearchCategory;
    if(vPredictive == 1)
    {
	s.linkTrackVars += ",eVar19";
        s.linkTrackEvents = s.events = s.events + ",event11";   
        s.eVar19 = vSearchTerm;
    }
    s.tl(this, 'o', 'internal search: ' + vSearchCategory);
    s.linkTrackVars='none';
    s.linkTrackEvents='none';
}

function ss_clear_object() {
    s.events="";s.products="";s.purchaseID="";s.pageName="";s.server="";s.channel="";
    for(var xFI = 1; xFI <= 50; xFI++) {
            s['prop'+xFI]= "";
        }
    for(var xFI = 1; xFI <= 50; xFI++) {
            s['eVar'+xFI]= "";
        }
}

function ss_page_view_track(vPageName, vPageTrackVars, vPageTrackEvents, vPageTrackProducts, vPageTrackValues) {
    ss_clear_object();

    var vSplitPageTrackVars = vPageTrackVars.split(',');
    var vSplitPageTrackValues = "";
     
    if (typeof(vPageTrackValues)!="string")  
        vSplitPageTrackValues = vPageTrackValues ;
    else 
        vSplitPageTrackValues = vPageTrackValues.split(',');

    s.pageName = vPageName;
    var vSplitPageName = vPageName.split('/');
    s.server = vSplitPageName[0];
    if(vPageName.indexOf('?') >= 0)
    {
        s.prop13 = vPageName.substring(0,vPageName.indexOf('?'));
        s.hier2 = vPageName.substring(0,vPageName.indexOf('?'));
    }
    else
    {
        s.prop13 = vPageName;
        s.hier2 = vPageName;
    }
    s.prop14 = vPageName;
    
    //Prevent a filename from going into the taxonomy
    for(var i =0; i < url_split.length; i++)
    {
        if(url_split[i].indexOf('.') != -1)
            url_split[i] = "";
    }

    //Set the market based on the URL structure
    s.prop2=s.eVar2 = url_split[3];

    //Set the directory taxonomy based on the remaining URL structure
    s.prop3=s.eVar3 = url_split[4];
    s.prop4=s.eVar4 = url_split[5];
    s.prop5=s.eVar5 = url_split[6];

    var now = new Date();
    var now_month = now.getMonth()+1;
    if(now_month.length == 1)
        now_month = "0" + now_month;
    var now_date = now.getDate();
    if(now_date.length == 1)
        now_date = "0" + now_date;
    var now_hour = now.getHours();
    if(now_hour.length == 1)
        now_hour = "0" + now_hour;
    s.prop39=s.eVar41 = now.getFullYear() + ":" + now_month + ":" + now_date + ":" + now_hour;
   
    for(var xFI = 0; xFI < vSplitPageTrackVars.length; xFI++) {
        if(vSplitPageTrackVars[xFI] == "products") {
            s[vSplitPageTrackVars[xFI]]= vPageTrackProducts;
        } 
        else {
            if(vSplitPageTrackVars[xFI] == "events") {
                s[vSplitPageTrackVars[xFI]]= vPageTrackEvents;
            }
            else {
                try {
                    s[vSplitPageTrackVars[xFI]]= vSplitPageTrackValues[xFI].trim();
                }
                catch(ex) {
                    s[vSplitPageTrackVars[xFI]]= vSplitPageTrackValues[xFI];
                }
            }
        }
    }
   
    if(s.events.indexOf("event16") < 0)
    {
        if(s.events.length > 0)
            s.events += ",event16";
        else
            s.events = "event16";
    }

    s.t();
}

var omn_ss_formAbandon = false;
if(typeof(omn_ss_formPresent) != 'undefined' && omn_ss_formPresent)
    omn_ss_formAbandon = true;

function trackFormAbandon()
{
    //proceed only if another form event is not detected
    if(omn_ss_formAbandon)
    {
        s.linkTrackVars='events';
        s.linkTrackEvents='event6'; 
        s.events='event6';
        s.tl(this,'o','form abandon');      
    }
}
        
            function s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
            var vSplitLinkTrackVars = vLinkTrackVars.split(',');
            var vSplitLinkTrackValues = "";
                    
            if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues ;
            else vSplitLinkTrackValues = vLinkTrackValues.split(',');
            
                
            s.linkTrackVars = vLinkTrackVars;
            s.linkTrackEvents = vLinkTrackEvents;
            
            for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
                if(vSplitLinkTrackVars[xFI] == "products") {
                  s[vSplitLinkTrackVars[xFI]]= deleteSpace(vSplitLinkTrackValues[xFI]);
                } else {
                    try {
                                s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
                            }
                            catch(ex) {
                                s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
                            }
                }

            }
            
            s.tl(this, vType, vTypeName);
            s.linkTrackVars='none';
            s.linkTrackEvents='none';
        }

        
        function s_control_clickEx(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
            var vSplitLinkTrackVars = vLinkTrackVars.split(',');
            var vSplitLinkTrackValues = vLinkTrackValues;
            
            s.linkTrackVars = vLinkTrackVars;
            s.linkTrackEvents = vLinkTrackEvents;
            
            for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
                if(vSplitLinkTrackVars[xFI] == "products") {
                  s[vSplitLinkTrackVars[xFI]]= deleteSpace(vSplitLinkTrackValues[xFI]);
                } else {
                    try {
                                s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
                            }
                            catch(ex) {
                                s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
                            }
                }

            }
            
            s.tl(this, vType, vTypeName);
            s.linkTrackVars='none';
            s.linkTrackEvents='none';
        }

        // Control Click Event (Event Arg. Only)
        function s_control_click_eventonly(vEvents) {
            s.linkTrackVars = "events";
            s.linkTrackEvents = vEvents;
            s.events = vEvents;
            
            s.tl(this,'o','event check');
        }
    
        // Control Click Event name (Event Arg. tl_name)
        function s_control_click_event(vEvents,tl_name) {
            s.linkTrackVars = "events";
            s.linkTrackEvents = vEvents;
            s.events = vEvents;
            
            s.tl(this,'o',tl_name);
        }
        
        // Control Click Event & product(Event Arg. product, tl_name)

        function s_control_click_eventproduct(vEvents, product, tl_name) {
            s.linkTrackVars = "products,events";
            s.linkTrackEvents = vEvents;
            s.products = ";" + deleteSpace(product);
            s.events = vEvents;
            s.tl(this,'o',tl_name);
        }
        
        // add to cart
        function addToCart(productId){
            s.linkTrackVars = "products,events";
            s.linkTrackEvents = "scAdd";
            s.events = "scAdd";
            s.products = ";" + deleteSpace(productId);
            
            s.tl(this, "o", "add to cart");
        }
	function getCookie(name)
	{
	  var search = name + "=";
	  if (document.cookie.length > 0)
	  {
		offset = document.cookie.indexOf(search);
		if (offset != -1)
		{
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
		if (end == -1)
		end = document.cookie.length;
	        return unescape(document.cookie.substring(offset, end));
	     }
	  }
	} 
