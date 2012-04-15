//
// Created from template /WWW/content/maptemplates/ClientSimpleMap.template
// Date: Thu Nov 17 15:32:43 2011 GMT
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
        var stagingMapURL = LEVU.FS('subaru.js');
        if (stagingMapURL) {            
            var stagingMapURL = stagingMapURL.src.replace( /(.*?)\/\/(.*?)\.(.*?)\// , '$1//tagstaging.$3/' );
            LEVU.WJS(stagingMapURL,1);
        } else {
            LEVU.LE('Unable to find [subaru.js]','FATAL');
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
    var searchRecords = [ LEVU.GS(document.location.toString(), 6) // Stem position 6 (View Configured Vehicle)
,LEVU.GS(location.pathname,'-3') // 3rd position path stem from the right 
,LEVU.GS(location.pathname,'-1') // First position path stem from right
,LEVU.GS(location.pathname,'-2') // 2nd pos path stem from the right
,LEVU.GS(location.pathname,'-2,-1') // last 2 pos path stem from the right
,location.pathname // full path
 ];
    
    if (!searchRecords) {
            LEVU.LE('No mapping rules found','Warning');
    } else {
            LEVU.LE("Mapping Rule Values\n" + LEVU.PR(searchRecords),'Debug');	
    }
   
    // Unhashed data
    var Unencoded = [ {OPVTO:30,SPID:1,Maps:{"2request-quote.html":[10,0],"4shopping-tools/get-quote.html":[10,0],"4shopping-tools/get-brochure.html":[24,0],"4shopping-tools/payments-financing.html":[26,0],"4shopping-tools/schedule-test-drive.html":[25,0],"5/":[15,0],"5/test/quote.html":[30,0],"5/shopping-tools/data/quote":[3,0],"5/shopping-tools/data/brochure":[6,0],"5/shopping-tools/data/testdrive":[5,0],"5/index.html":[15,0]}},
	{OPVTO:30,SPID:3,Maps:{"5/test/quote_tky.html":[31,0]}},
	{OPVTO:30,SPID:2,Maps:{"2environment-sustainability.html":[40,0],"2boxer-engine.html":[65,0],"3impreza":[16,0],"3special-offers":[11,0],"3forester":[22,0],"3legacy":[20,0],"3tribeca":[23,0],"3outback":[21,0],"3find":[7,0],"3impreza-wrx":[19,0],"4special-offers":[11,0],"4enthusiasts/index.html":[14,0],"4impreza/ratings-reviews.html":[52,0],"4impreza-wrx/index.html":[51,0],"4outback/index.html":[48,0],"4legacy/index.html":[47,0],"4forester/index.html":[49,0],"4tribeca/index.html":[50,0],"4impreza-wrx/ratings-reviews.html":[53,0],"4legacy/ratings-reviews.html":[54,0],"4tribeca/ratings-reviews.html":[57,0],"4forester/ratings-reviews.html":[56,0],"4impreza-wrx/features.html":[59,0],"4impreza/features.html":[58,0],"4legacy/features.html":[60,0],"4outback/features.html":[61,0],"4forester/features.html":[62,0],"4tribeca/features.html":[63,0],"4impreza/index.html":[46,0],"4outback/ratings-reviews.html":[55,0],"5/dogtested_2011/index.html":[39,0],"5/dearsubaru/index.html":[41,0],"5/test/home.html":[29,0],"5/engineering/all-wheel-drive.html":[42,0],"5/getmoregs/g-card.html":[33,0],"5/getmoregs/index.html":[32,0],"5/company/environmental-policy.html":[40,0],"5/dogs/index.html":[39,0],"5/vehicles/build/index.html":[12,0],"5/shopping-tools/data/testdrive":[5,0],"5/index.html":[15,0],"5/engineering/index.html":[44,0],"5/why-subaru/reviews-awards.html":[13,0],"5/weather/index.html":[45,0],"5/":[15,0],"5/engineering/safety.html":[64,0],"5/vehicles/impreza/build.html":[12,0],"5/vehicles/tribeca/build.html":[12,0],"5/vehicles/forester/build.html":[12,0],"5/vehicles/outback/build.html":[12,0],"5/vehicles/legacy/build.html":[12,0],"5/vehicles/impreza-wrx/build.html":[12,0]}} ];

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