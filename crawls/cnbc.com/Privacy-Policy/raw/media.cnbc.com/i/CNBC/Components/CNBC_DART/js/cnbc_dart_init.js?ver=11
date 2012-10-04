// CNBC DART JS Initialization File

//INIT Variables
var cnbc_DARTFlag="new";
var cnbc_DARTEmergencySwitch="off";
var randDARTNumber=0;

//Server Variables
//Freewheel INIT
if (typeof cnbc_Freewheel == 'undefined') var cnbc_Freewheel = {};
//Production 
cnbc_Freewheel.inlineSettings_url = "http://plus.cnbc.com/stickers/partners/cnbcinline/config.xml";
//QA
//cnbc_Freewheel.inlineSettings_url = "http://qa.plus.cnbc.com/stickers/partners/cnbcinline/config.xml";

//Production
cnbc_DART.server = "nbcu.cnbc";
//QA
//cnbc_DART.server = "test.cnbc";
 
//DART Functions
function genSetRandDARTNumber()
{
 randDARTNumber = Math.round(Math.random()*1000000000000);
}
genSetRandDARTNumber();
if (typeof eTandomAd == "undefined")
{
	eTandomAd = "none";
}

cnbc_DART.TruncMatch = function(origStr,origArry,truncSwitch){
	var truncStr = ""
	if (typeof origStr != "string")
	{
		origStr = origStr.toString();
	}
	for (key in origArry)
	{
		if (key == origStr)
			{
				truncStr = origArry[key];
			}
	}
	if (truncStr == "" && truncSwitch == "yes")
	{
		// Truncation code
		truncStr=origStr.toLowerCase().replace(/\W/g,'').replace(/[aeiou]/g,'').substring(0,15);
	}
	return truncStr;
	
};

cnbc_DART.getMetaKeys = function(){
  	var metaElements = document.all ?
    	document.all.tags('META') :
    	document.getElementsByTagName ?
    	document.getElementsByTagName ('META') : new Array();
  	var metaKeywords = new Array();
  	var i = 0;
  	var metaLength = metaElements.length;
  	for (var m = 0; m<metaLength; m++)
  	{
  		var metaObj = metaElements[m];
    	if (metaObj.name == 'keywords')
    	{
      		metaKeywords = metaObj.content.split(",");
      	}
  	}
  	return metaKeywords;
};

cnbc_DART.eliminateDuplicates = function(arr){
	var i,
		n,
      	len=arr.length,
      	out=[],
      	obj={};

  	for (i=0;i<len;i++) {
    	obj[arr[i]]=0;
  	}
  	for (n in obj) {
    	out.push(n);
  	}
  	return out;
};

//Added for visibility in Firebug
cnbc_DART.MetaKeys = cnbc_DART.getMetaKeys();

cnbc_DART.pkgArray = new Array();
cnbc_DART.pkgIDArray = new Array();
cnbc_DART.catExclRawArray = new Array();
cnbc_DART.catExclFilterArray = new Array();
cnbc_DART.franIDRawArray = new Array();
cnbc_DART.franIDFilterArray = new Array();
cnbc_DART.metaKeyLength = cnbc_DART.MetaKeys.length;
for (var i=0; i<cnbc_DART.metaKeyLength; i++)
{
	for (key in cnbc_DART.PackageData.packageID)
	{
		if (key == cnbc_DART.MetaKeys[i])
		{
			cnbc_DART.pkgArray.push(cnbc_DART.PackageData.packageID[key]);	
		}
	}
	for (key in cnbc_DART.CatExcludesData.categories)
	{
		if (key == cnbc_DART.MetaKeys[i])
		{
			cnbc_DART.catExclRawArray.push(cnbc_DART.CatExcludesData.categories[key]);	
		}
	}
	for (key in cnbc_DART.FranchiseData.franID)
	{
		if (key == cnbc_DART.MetaKeys[i])
		{
			cnbc_DART.franIDRawArray.push(cnbc_DART.FranchiseData.franID[key]);	
		}
	}
}

cnbc_DART.pkgIDArray = cnbc_DART.eliminateDuplicates(cnbc_DART.pkgArray.sort());
cnbc_DART.catExclFilterArray = cnbc_DART.eliminateDuplicates(cnbc_DART.catExclRawArray.sort());
cnbc_DART.franIDFilterArray = cnbc_DART.eliminateDuplicates(cnbc_DART.franIDRawArray.sort());


function cnbc_DARTAdCall(adWidth,adHeight,PGgroup)
{
	var posTile='';
	var adSub='';
	var adSub2='';
	var pkgIDStrArray=new Array();
	var pkgIDStr='';
	var pkgIDLength = cnbc_DART.pkgIDArray.length;
	var catExcl='';
	var catExclStrArray=new Array();
	var catExclStr='';
	var catExclLength = cnbc_DART.catExclFilterArray.length;
	var franIDStrArray=new Array();
	var franIDStr='';
	var franIDLength = cnbc_DART.franIDFilterArray.length;
	var adSize = adWidth+'x'+adHeight;

//PosTile Logic
	if (adWidth == 88 || adWidth == 120 || adWidth == 235)
	{
		switch (PGgroup)
		{
			case "CNBMKB" :
				posTile = 14;
			break;
			
			case "CNBCUB" :
				posTile = 15;
			break;
      
      case "CNBCDAILY" :
				posTile = 16;
			break;
			
			default:
				posTile = 1;
			break;
		}
	}
	else if (adWidth == 728 || adWidth == 970)
	{
		posTile = 2;
		adSize='728x90,970x66'
	}
	else if (adWidth == 300)
	{
		posTile = 3;
		if (adHeight == 900)
		{
			adSize='300x250,300x600,300x900,160x600';
		}
	} 
	else if (adWidth == 1 && adHeight == 1)
	{
		//null return;
		return;
		//posTile = 9;
	}

//Section and PackageID Matrix Code Stub
	var adSect= cnbc_DART.TruncMatch(cnbc_topSection,cnbc_DART.SectionData.section,"yes");

	if (cnbc_subSection != "")
	{
		adSub = cnbc_DART.TruncMatch(cnbc_subSection,cnbc_DART.SectionData.subSection,"yes");
	}
	
	if (cnbc_subSubSection != "")
	{
		adSub2 = cnbc_DART.TruncMatch(cnbc_subSubSection,cnbc_DART.SectionData.subSubSection,"yes");
	}

	if (pkgIDLength!=0)
	{
		if (pkgIDLength>3)
		{
			pkgIDLength = 3;
		}
		for (var i=0; i<pkgIDLength; i++)
		{
			pkgIDStrArray.push("pkid="+cnbc_DART.pkgIDArray[i])
		}
		pkgIDStr = pkgIDStrArray.join(";")+";";
	}
	
	if (catExclLength!=0)
	{
		for (var i=0; i<catExclLength; i++)
		{
			catExclStrArray.push("!c="+cnbc_DART.catExclFilterArray[i])
		}
		catExclStr = catExclStrArray.join(";")+";";
	}
	
	if (franIDLength!=0)
	{
		/* Support for multiple Franchise ID's - DISABLED
		for (var i=0; i<franIDLength; i++)
		{
			franIDStrArray.push("franid="+cnbc_DART.franIDFilterArray[i])
		}
		franIDStr = franIDStrArray.join(";")+";";
		*/
		
		// Support for single Franchise ID - ENABLED
		franIDStr = "franid="+cnbc_DART.franIDFilterArray[0]+";";
	}

	if (cnbc_DARTEmergencySwitch=="on") 
	{
		// null return
		//document.write('AD Calls Disabled');		
	} 
	else 
	{
  		document.write('<scr'+'ipt src="http://ad.doubleclick.net/adj/'+cnbc_DART.server+'/');
  		
  		if(adSect=='')
  		{
  			adSect = "error";
  			adSub = "404";
  		}
  		if (adSub!='')
  		{
  			document.write(adSect+'_'+adSub+';site=cnbc;sect='+adSect+';sub='+adSub+';');
  			catExcl = "!c="+adSect+";!c="+adSub+";"+catExclStr;
  		} else {
  			document.write(adSect+';site=cnbc;sect='+adSect+';');
  			catExcl = "!c="+adSect+";"+catExclStr;
  		}
  		if (adSub2!='')
  		{
  			document.write('sub2='+adSub2+';');
  		}
  		if (cnbc_docid!='')
  		{
  			document.write('pageid='+cnbc_docid+';');
  		}
  		
  		document.write(pkgIDStr);
  		document.write(franIDStr);
  		  		
  		// Symbol, Industry, and Company not separate keyvalues in Workbench Pages
  		//document.write('sym=[symbol];ind=[industry];comp=[company];');
  		
  		document.write(catExcl+'tandomad='+eTandomAd+';'+(top.__nbcudigitaladops_dtparams||''));
  		
		if (adWidth == 728 || adWidth == 970)
		{
		//Set dcopt for Leaderboard Ads
  			document.write('dcopt=ist;');
  		}
  		
  		document.write('pos='+posTile+';tile='+posTile+';sz='+adSize+';ord=' + randDARTNumber + '?"><\/scr'+'ipt>'); 
	}
}