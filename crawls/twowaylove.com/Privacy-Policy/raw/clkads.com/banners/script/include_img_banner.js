
var pageUrl="";
var refUrl="";

//in case the pb_keyword was defined- put it as the "orig_url"
if (typeof pb_keyword!="undefined") {
	pageUrl="?q="+pb_keyword.substring(0, 1500); //make sure it is not very long string- url has a limit.
}
else {

	try
	{
		refUrl=escape(document.referrer);
		pageUrl=escape(window.location);
		pageUrl=escape(window.top.location);
	}
	catch (e) {
	}
}

var tid="DUMMY";
if (typeof pb_cid!="undefined")
{
	tid=pb_cid;
}

var pid=null;
if (typeof pb_pid!="undefined")
{
	pid=pb_pid;
}

var adType='banner_300x250';

if (typeof pb_type!="undefined") {
	adType=pb_type;
}

var redirurl;
if (typeof pb_redirurl!="undefined") {
	redirurl=escape(pb_redirurl);
}


var htmlName="img-banner.html";
var bannerDimension=getDimension(adType);
var f_width=bannerDimension.w;
var f_height=bannerDimension.h;

var keywords=getKeywordFromMeta();
if (keywords) {
	keywords=escape(keywords);
}


var hn = getAdHostName();
//var u="http://clkads.com/banners/"+htmlName+"?tid="+tid+"&num="+1+"&w="+f_width+"&h="+f_height+"&orig_url="+pageUrl+"&ref_url="+refUrl+(redirurl? "&redirurl="+redirurl : "");
var u="http://"+hn+"/banners/"+htmlName+"?tid="+tid+"&num="+1+"&w="+f_width+"&h="+f_height+"&orig_url="+pageUrl+"&ref_url="+refUrl+(redirurl? "&redirurl="+redirurl : "" + "&keywords="+keywords);

if (pid) {
	u=u+"&pid="+pid;
}


var ifrm = document.createElement("iframe");
ifrm.setAttribute("name","adsfrm");
ifrm.setAttribute("id","adsfrm");
ifrm.setAttribute("frameBorder","0");
ifrm.setAttribute("src",u);
ifrm.style.width = f_width+"px";
ifrm.style.height = f_height+"px"; 
ifrm.style.border = "none";
ifrm.scrolling="no";


//save the attributes on the iframe element so can be used after if refreshing the url

ifrm.setAttribute("htmlName",htmlName);
ifrm.setAttribute("tid",tid);
ifrm.setAttribute("w",f_width);
ifrm.setAttribute("h",f_height);
ifrm.setAttribute("allowTransparency","allowtransparency");
ifrm.setAttribute("hid", hn);
if (pid) {
	ifrm.setAttribute("pid",pid);
}


//insert iframe after script tag
var scripts = document.getElementsByTagName('script');
var myScript = scripts[ scripts.length - 1 ];
if (myScript.parentNode!=document.getElementsByTagName('head')[0]) {
	myScript.parentNode.insertBefore( ifrm, myScript.nextSibling );
}
else{
	window.onload = function() {
		document.getElementsByTagName('body')[0].appendChild( ifrm);
	};
}

/**
 * Use this method in order to refresh the contextual ads using the given keyword
 * If there are several ads on the same page, all of the ads will be refreshed.
 * @param keyword
 * @return
 */
function refreshAd(keyword)
{
	if (keyword) {
		keyword=keyword.substring(0, 1500); //make sure it is not very long string- url has a limit.
		
		var collection = document.getElementsByName('adsfrm');
		
		if (collection) {
			for (var i=0;i<collection.length;i++) {
				var ifrm=collection.item(i);
				var bannerName=ifrm.getAttribute("bannerName");
				var h = ifrm.getAttribute("h");
				var w = ifrm.getAttribute("w");
				var tid=ifrm.getAttribute("tid");
				var pid=ifrm.getAttribute("pid");
				var hid=ifrm.getAttribute("hid");

                if(!hid) {
                    hid = "clkads.com";
                }

				var u="http://"+hid+"/banners/"+htmlName+"?orig_url=?q="+keyword+"&ref_url="+refUrl+"&tid="+tid+"&num="+1+"&w="+f_width+"&h="+f_height;
				if (pid) {
					u=u+"&pid="+pid;
				}
				ifrm.src=u;
			}
		}
	}
}

function getAdHostName() {
    var res = "clkads.com";
    var scriptTag = document.getElementById("rh_banner_id");
    if(scriptTag) {
        var src = scriptTag.src;
        //get the domain name from the src attribute of the script tag
        //will capture all character sequence after http(s):// and the first slash (/)
        var regexp = RegExp("^https?://([a-z0-9\\-\\.\\_\\:]+)/.*$");
        try{
        	res = regexp.exec(src)[1];
        }
        catch(e) {}
        
        if(!res) {
            res = "clkads.com";
        }
    }
    return res;
}
function getDimension(bname)
{
	bname=bname.substr(7).toLowerCase();
	return {w:bname.substr(0,bname.indexOf("x")),h:bname.substr(bname.indexOf("x")+1)};
}

function getMetaContent(metaName) { 
   var metas = document.getElementsByTagName('meta'); 
   
   if (metas) {
	   for (var i=0; i<metas.length; i++) { 
	      if (metas[i].getAttribute("name") == metaName) { 
	         return metas[i].getAttribute("content"); 
	      } 
	   } 
   }

    return null;
} 

function getKeywordFromMeta()
{
	var keywords=getMetaContent("keywords");
	if (keywords==null) {
		keywords=getMetaContent("description");
		if (keywords==null) {
			keywords=document.title;
		}
	}
	if (keywords!=null && keywords.length>80) {
		keywords=keywords.substr(0,80);
	}
	return keywords;
}
