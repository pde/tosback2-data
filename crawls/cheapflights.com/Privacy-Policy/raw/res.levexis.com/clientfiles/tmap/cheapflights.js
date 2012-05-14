// Copyright TagMan Ltd 2012: T 2.00 V branches/201101_2_SLT C Fri May 11 11:35:07 2012

//
// Created from template 2.00.tt
// Date: 11:35:07 11-May-2012
//

if(typeof LEVU=="undefined"){LEVU=function(){function f(a){var b=document.getElementsByTagName("body");if(b.length===0)b=document.getElementsByTagName("head");b[0].appendChild(a)}return p={SQ:function(a){var b=this.FS(a);if(b){var c=b.src.indexOf("/"+a+"?");if(c>-1)return b.src.substr(c+a.length+2)}return""},ES:function(a){if((a=this.FS(a))&&a.innerHTML)try{eval(a.innerHTML)}catch(b){LEVU.LE("error with es of [ "+a.innerHTML+" ]","Error")}},FS:function(a){for(var b=document.getElementsByTagName("script"),
c=b.length-1;c>=0;c-=1)if(b[c].src.indexOf("/"+a)>-1)return b[c];return""},GP:function(a,b){if(b&&a)return LEVU.RX(a,"[?|&]?"+b+"=([^&]*)")},SP:function(a,b,c){var d=a.indexOf(b);if(d>0){d=RegExp("[&|?]"+b+"=[^&]*");return a.replace(d,b+"="+c)}else if(d<0)return a+"&"+b+"="+c;else{d=RegExp("^"+b+"=[^&]*");return a.replace(d,b+"="+c)}},AIF:function(a,b){var c=document.createElement("iframe");if(b){c.width="18px";c.height="18px"}else{c.width="0px";c.height="0px"}c.style.position="absolute";c.style.top=
"0px";c.style.left="-999em";f(c);c.src=a},WIF:function(a,b){var c=LEVU.GetCB(5),d='<iframe id="tmif'+c+'" src="" style="position: absolute; top: 0px; left: -999em " ';d+=b?'width = "18px" height="18px"':'width = "0px" height="0px"';document.write(d+"></iframe>");document.getElementById("tmif"+c).src=a},AJS:function(a){var b=document.createElement("script");b.type="text/javascript";f(b);b.src=a},CIm:function(a){(new Image).src=a},DS:function(a){if(!a)return 0;return a>=Math.random()*100?1:0},LE:function(a,
b){b||(b="Error");typeof console!="undefined"&&LEVU.GC("tmDebug")==1&&console.log("TagMan "+b+": "+a)},GetCB:function(a){return(Math.random()+"").substr(2,a)},GC:function(a){var b=document.cookie,c=b.indexOf(a+"=");if(c>-1){epos=b.indexOf(";",c);return epos>c?unescape(b.substr(c+a.length+1,epos-c-a.length-1)):unescape(b.substr(c+a.length+1))}else return""},SC:function(a,b,c,d){a=a+"="+escape(b)+";";if(d==1)a+=" expires=Tue, 2 Jun 2015 00:00:00 UTC;";c||(c="/");a+=" path="+c+";";document.cookie=a},
OTQ:function(a){var b=[];for(var c in a)b.push(escape(c)+"="+escape(a[c]));return b.join("&")},QTO:function(a){a=a.replace(/^[?&]/,"").split("&");for(var b={},c=0;c<a.length;c++){var d=a[c].split("=");b[unescape(d[0])]=unescape(d[1])}return b?b:""},IIF:function(){return window.parent.frames.length===0?0:1},RX:function(a,b){if(a&&b){var c=RegExp(b).exec(a);if(c){c.splice(0,1);return c.join("")}}return""},SS:function(a,b,c){if(a)return c?a.toString().substr(b,c):a.toString().substr(b);return""},FD:function(a,
b){if(a&&b)return a.indexOf(b)==-1?0:1;return 0},GS:function(a,b){if(a&&b){var c="";b=","+b+",";for(var d=a.split("/"),g=d.length*-1,e=0;e<d.length;e+=1){if(b.indexOf(","+e+",")>-1||b.indexOf(","+g+",")>-1){if(c)c+="/";c+=d[e]}g+=1}return c}},WJS:function(a,b){var c='<script type="text/javascript"';c+=b?' src="'+a+'">':">"+a;document.write(c+"<\/script>")},ADW:function(a){if(typeof LEVU.djs=="undefined")LEVU.djs="";LEVU.djs+=" "+a},IDW:function(){if(typeof LEVU.djs!="undefined"&&LEVU.djs){var a="https://"==
LEVU.GPR()?"https://sec":"http://res";LEVU.WJS(a+".levexis.com/js/LEVU.WDW.xjs",1)}},WDW:function(){if(typeof LEVU.djs!="undefined"&&LEVU.djs){LEVU.WJS(LEVU.djs,0);LEVU.djs=""}},GPR:function(){return location.protocol=="https:"?"https://":"http://"},PR:function(a){var b="";for(var c in a)b+="\t"+c+"=>"+a[c]+"\n";return b}}}();LEVU.ES("lu.js");var q=LEVU.SQ("lu.js");if(q){var u=LEVU.GPR()+q;LEVU.WJS(u,1)}};
if ( LEVU.GC('tmStaging') ) {
    // avoid infinite loop if someone puts live template on staging or is messing around with their dns
    if (typeof(tmIncludedOnce)=='undefined') {
        var stagingMapURL = LEVU.FS('cheapflights.js');
        if (stagingMapURL) {            
            var stagingMapURL = stagingMapURL.src.replace( /(.*?)\/\/(.*?)\.(.*?)\// , '$1//tagstaging.$3/' );
            LEVU.WJS(stagingMapURL,1);
        } else {
            LEVU.LE('Unable to find [cheapflights.js]','FATAL');
        }
        var tmIncludedOnce = 1;
    }
} else {

    <!-- No Client JS -->
    
    // reverse compatibility
    if (typeof( tmPageId ) == 'undefined' && typeof( tmContId ) != 'undefined') var tmPageId = tmContId;
    
    
    if (typeof(tmPageId)!='undefined') LEVU.LE('base tmPageId='+tmPageId,'Debug');
    if (typeof(tmOPV)!='undefined') LEVU.LE('base tmOPV='+tmOPV,'Debug');
    
    // Initialise globals
    var searchRecords = [ location.hostname // domain section only for QA containers
,LEVU.GS(document.location.toString(), 2) // Region Mapping
,LEVU.GS(document.location.toString(),2) + document.location.pathname // Home Page Mapping
,LEVU.GS(document.location.toString(), 2) + LEVU.GS(location.pathname,"1,2") // name and path
,LEVU.GS(document.location.toString(),3) // Deal Page Mapping
,LEVU.GS(document.location.toString(),3) // BE Page Mapping
,LEVU.GS(document.location.toString(),2)+ LEVU.GS(document.location.toString(),3) // Region and Page Rule
,((LEVU.GS(location.toString(), 2) === "www.cheapflights.co.uk" && LEVU.GS(location.pathname, 1)==="flights" && LEVU.GS(location.pathname, 3)!=="")?"yes":"no") // UK Deals but not flights
 ];
    
    if (!searchRecords) {
            LEVU.LE('No mapping rules found','Warning');
    } else {
            LEVU.LE("Mapping Rule Values\n" + LEVU.PR(searchRecords),'Debug');	
    }
   
    // Unhashed data
    var Unencoded = [ {OPVTO:30,SPID:1,Maps:{"0de-t7-web-st.qa.cheapflights.net":[18,0],"0us-web-st.qa.cheapflights.net":[16,0],"0ca-web-st.qa.cheapflights.net":[20,0],"0uk-t7-web-st.qa.cheapflights.net":[57,0],"0au-t7-web-st.qa.cheapflights.net":[22,0],"1www.cheapflug.de":[3,0],"110.180.101.11:82":[25,0],"1www.cheapflights.com.au":[31,0],"1www.cheapvuelos.es":[33,0],"1www.cheapvols.fr":[35,0],"1www.cheapvoli.it":[37,0],"1www.cheapflights.ca":[4,0],"1www.cheapflights.com":[2,0],"110.180.101.11:90":[17,0],"110.180.101.10:82":[15,0],"110.180.101.11":[23,0],"110.180.101.11:91":[10,0],"110.180.101.11:84":[27,0],"110.180.101.11:65":[21,0],"110.180.101.10:94":[19,0],"1192.168.30.163":[55,0],"2www.cheapflights.co.uk/":[49,0],"2www.cheapflights.com/":[48,0],"2www.cheapflights.ca/":[50,0],"2www.cheapflug.de/":[54,0],"3www.cheapvoli.itworkers/partnerselect.aspx ":[41,0],"3www.cheapvoli.frworkers/partnerselect.aspx ":[39,0],"3www.cheapvoli.auworkers/partnerselect.aspx ":[38,0],"3www.cheapvoli.esworkers/partnerselect.aspx ":[40,0],"3/mvc/mobile/partnerselect.mvc":[55,0],"6www.cheapflights.co.ukbook-flights-online":[52,0],"7yes":[51,0]}} ];

    var i=-1;
    var tmContainer;
    //
    // Only Search if pageId maches
    //
    for (var j=0;j<Unencoded.length;j++) {
    	var map = Unencoded[j];
	if (map["SPID"] == tmPageId) {
		i = searchRecords.length;
		LEVU.LE("Mapping string\n" + LEVU.PR(map["Maps"]),'Debug');	
		while (i > 0 && !tmContainer) {
			i--;
			tmContainer = map["Maps"][i+searchRecords[i].toString()];
		}
	}
    }
    if (i==-1)
	LEVU.LE('No mappings for this tmContainer','Warning');
     
    // update pageId and tmContainerId if matched
    if (tmContainer) {
            var sourcePageId =  tmPageId;
            tmOPV = tmContainer[1];
            tmPageId = tmContainer[0];
    }
}