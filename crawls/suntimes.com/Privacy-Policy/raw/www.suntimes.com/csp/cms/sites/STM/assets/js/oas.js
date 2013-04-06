//begin OAS Analytics
var d=document;
var OAS_rdl = '';
var OAS_CA = 'N';
if((d.referrer)&&(d.referrer!="[unknown origin]")) {
    	if(d.referrer.indexOf("?") == -1) 
	{
    		OAS_rdl += '&tax23_RefDocLoc='+d.referrer.toString();
    	} else {
    		var rdl=d.referrer;
                var rdl1=rdl.indexOf("?");
    		var rdl2=rdl.substring(0,rdl1);
    		OAS_rdl += '&tax23_RefDocLoc='+rdl2;
    	}
}

function cookie_check(ifd,ife) {
    	var s=ife.indexOf(ifd);
    	if(s==-1) return "";
        s+=ifd.length;
    	var e=ife.indexOf(";",s);
     	if(e==-1)
           e=ife.length;
    	return ife.substring(s,e);
}
function write_cookie() {
    	var d=new Date();
    	var m=d.getTime();
    	document.cookie="OAS_SC1="+m.toString()+";path=/;";
    	var v=cookie_check("OAS_SC1=",document.cookie);
    	if(v!=m.toString())
	   return false;
    	d.setTime(m+3600000);
    	return true;
}
if(write_cookie())OAS_CA="Y";
//end OAS Analytics

var oasKeywords = ''; var OAS_sitepage = ''; var OAS_query = '';
var metaTags = document.getElementsByTagName('meta');
for(var i=0;i<metaTags.length;i++) {
	if(metaTags[i].getAttribute('name') == 'keywords'){
		var arr1 = new Array();  
        	arr1 = metaTags[i].getAttribute('content').split(",");
        	for (var j = 0; j < arr1.length; j++) {
        		oasKeywords = oasKeywords + 'keyword='+arr1[j].toString().replace(/\s/g, "")+'&';
        	}
	}
	//console.log("oasKeywords: "+oasKeywords);
	if(metaTags[i].getAttribute('property') == 'og:type'){
		oasDocType = metaTags[i].getAttribute('content');  //possible method?
	}
}

if (!window.location.pathname.match(/index\.html$/i) && window.location.pathname.match(/\.html$/i) ) {
	//console.log("This is an Article.");
	var storyID = /\/(\d{6,})-\d\d\d/;
	var newPath = window.location.pathname.replace( storyID, "" ); // remove the DTI id number
	if (RegExp.$1 != '') oasKeywords = 'storyid=' + RegExp.$1 + '&' + oasKeywords; // add DTI number to terms
	//console.log(RegExp.$1);
	OAS_sitepage = window.location.hostname + newPath.replace( /(.*)\/.*\.html$/, "$1/article" );
} else {
	//console.log("This is an Index or Section Front.");
	if  (window.location.pathname.match(/index\.html$/i)) {
		OAS_sitepage = window.location.hostname + window.location.pathname;
	} else {
		OAS_sitepage = window.location.hostname + window.location.pathname + '/index.html';
		//http://www.javascriptkit.com/jsref/regexp.shtml
	}
}

OAS_sitepage = OAS_sitepage.replace( /\/\//, "/" );
//OAS_sitepage = OAS_sitepage.replace( /dev\.suntimes/, "www\.suntimes" );
//console.log('\r\nOAS_sitepage: '+OAS_sitepage);

OAS_url = 'http://oascentral.suntimes.com/RealMedia/ads/';
//OAS_sitepage = window.location.hostname + window.location.pathname;
OAS_listpos = 'Bottom,Bottom1,Middle,Middle3,Frame1,TopRight,Top1,Top2,x01,x02';
var OAS_taxonomy='';
OAS_query =  oasKeywords; 
window.location.search.substr(1) != '' ? OAS_query += window.location.search.substr(1)+'&' : OAS_query +='' ;
OAS_query += 'XE' + '&' + OAS_taxonomy + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + '&XE';
//console.log("OAS_query: "+OAS_query);
OAS_target = '_top';
OAS_rns = (Math.random() + "").substring(2, 11);

OAS_version = 11;  // this version has been out since 1994

function OAS_NORMAL(pos) {
  document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" TARGET=' + OAS_target + '>');
  document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" BORDER=0></A>');
}

if (navigator.userAgent.indexOf('Mozilla/3') != -1 || navigator.userAgent.indexOf('Mozilla/4.0 WebTV') != -1) OAS_version = 10;
if (OAS_version >= 11)  document.write('<SCR' + 'IPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/SCRIPT>');

document.write('');
function OAS_AD(pos) {
  if (OAS_version >= 11)
    OAS_RICH(pos);
  else
    OAS_NORMAL(pos);
}
