

(function(){
var DATA={
  "admin_account_id": 1617017, 
  "api_host": "api", 
  "click_goals": [
    {
      "event_name": "Dart: 300x250 - Right Rail", 
      "experiments": [
        11480236
      ], 
      "selector": "div#SecondaryContent > div:eq(0) > div:eq(0)"
    }, 
    {
      "event_name": "Aggregate Module", 
      "experiments": [
        23328837
      ], 
      "selector": "section#FeaturedCarousel"
    }, 
    {
      "event_name": "Top Bar: Related Articles", 
      "experiments": [
        11480236
      ], 
      "selector": "div.window"
    }, 
    {
      "event_name": "R2S1", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(0)"
    }, 
    {
      "event_name": "R2S3", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(2)"
    }, 
    {
      "event_name": "TopLeft Wide", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(1) > div:eq(0)"
    }, 
    {
      "event_name": "R2S2", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(1)"
    }, 
    {
      "event_name": "R2S4", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(3)"
    }, 
    {
      "event_name": "Dart: 990x90", 
      "experiments": [
        11480236
      ], 
      "selector": "div.Ad990x90"
    }, 
    {
      "event_name": "Trending Now: Right Rail", 
      "experiments": [
        11480236
      ], 
      "selector": "ul.list"
    }, 
    {
      "event_name": "R1S2", 
      "experiments": [
        23328837
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(1) > div:eq(1)"
    }, 
    {
      "event_name": "tr", 
      "experiments": [
        23328837
      ], 
      "selector": "div.lay2TopRight"
    }, 
    {
      "event_name": "leftbutton", 
      "experiments": [
        39745778
      ], 
      "selector": "button.prev"
    }, 
    {
      "event_name": "row2slot3", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(2)"
    }, 
    {
      "event_name": "row1slot2", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(1) > div:eq(1)"
    }, 
    {
      "event_name": "rightbutton", 
      "experiments": [
        39745778
      ], 
      "selector": "button.next"
    }, 
    {
      "event_name": "r1s1", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(1) > div:eq(0)"
    }, 
    {
      "event_name": "articlelistleft", 
      "experiments": [
        39745778
      ], 
      "selector": "section.body"
    }, 
    {
      "event_name": "greatest_hits", 
      "experiments": [
        39745778
      ], 
      "selector": "div.body"
    }, 
    {
      "event_name": "row2slot1", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(0)"
    }, 
    {
      "event_name": "row2slot4", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(3)"
    }, 
    {
      "event_name": "row2slot2", 
      "experiments": [
        39745778
      ], 
      "selector": "ol.stage > li:eq(1) > div:eq(2) > div:eq(1)"
    }, 
    {
      "event_name": "cracked_shows", 
      "experiments": [
        39745778
      ], 
      "selector": "ul.body"
    }, 
    {
      "event_name": "navandtools", 
      "experiments": [
        39745778
      ], 
      "selector": "#NavAndTools"
    }
  ], 
  "experiments": {
    "23328837": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.cracked.com/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "ignore": 95, 
      "name": "Cracked Homepage Test1", 
      "variation_ids": [
        "23324930", 
        "23354858"
      ]
    }, 
    "39745778": {
      "conditions": [
        {
          "type": "url", 
          "values": [
            {
              "match": "simple", 
              "value": "www.cracked.com/"
            }
          ]
        }, 
        {
          "only_first_time": true, 
          "type": "visitor", 
          "value": "all"
        }
      ], 
      "enabled": true, 
      "enabled_variation_ids": [
        "40566015", 
        "40396942"
      ], 
      "ignore": 80, 
      "name": "Cracked Homepage Test1 (Modified Click Tracking 4_23)", 
      "variation_ids": [
        "40566015", 
        "40396942"
      ], 
      "variation_weights": {
        "40396942": 4999, 
        "40566015": 5001
      }
    }
  }, 
  "log_host": "log3", 
  "project_id": 8057353, 
  "public_suffixes": {
    "cracked.com": [
      "www.cracked.com"
    ]
  }, 
  "revision": 84, 
  "variations": {
    "23324930": {
      "name": "Original Page"
    }, 
    "23354858": {
      "code": "$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0)\").removeClass(\"lay3TopLeft\").addClass(\"lay2Top\");\n$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(1)\").removeClass(\"lay3TopRight\").addClass(\"lay2Top\").addClass(\"lay2TopRight\");\n$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0) > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src\", $(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0) > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src2\"));\n$(\"div.lay2TopRight > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src\", $(\"div.lay2TopRight > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src2\"));", 
      "name": "Variation #1"
    }, 
    "40396942": {
      "code": "$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0)\").removeClass(\"lay3TopLeft\").addClass(\"lay2Top\");\n$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(1)\").removeClass(\"lay3TopRight\").addClass(\"lay2Top\").addClass(\"lay2TopRight\");\n$(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0) > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src\", $(\"ol.stage > li:eq(1) > div:eq(1) > div:eq(0) > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src2\"));\n$(\"div.lay2TopRight > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src\", $(\"div.lay2TopRight > div:eq(0) > a:eq(0) > img:eq(0)\").attr(\"src2\"));", 
      "name": "Variation #1"
    }, 
    "40566015": {
      "name": "Original Page"
    }
  }
};
//
var GEOTARGETING = {
  'city': "SANFRANCISCO",
  'continent': "NA",
  'country': "US",
  'region': "CA"
};

var optly={Cleanse:{}};optly.Cleanse.each=function(a,d,b){var c=!!Object.prototype.__lookupGetter__,e;for(e in a)if(a.hasOwnProperty(e)){var f=c?a.__lookupGetter__(e):null;d.call(b,e,!f?a[e]:null,f)}};
optly.Cleanse.finish=function(){if(optly.Cleanse.running)optly.Cleanse.running=!1,optly.Cleanse.each(optly.Cleanse.types,function(a,d){Object.prototype.__defineGetter__&&optly.Cleanse.each(optly.Cleanse.getters[a],function(b,c){d.prototype.__defineGetter__(b,c);optly.Cleanse.log("restored getter",a,b)});optly.Cleanse.each(optly.Cleanse.properties[a],function(b,c){d.prototype[b]=c;optly.Cleanse.log("restored property",a,b)})}),optly.Cleanse.log("finish")};
optly.Cleanse.log=function(a,d,b){d?(d=d.replace(/_/g,""),optly.Cleanse.logs.push("Optimizely / Info / Cleanse / "+a+": "+d+"."+b)):optly.Cleanse.logs.push("Optimizely / Info / Cleanse / "+a)};
optly.Cleanse.start=function(){var a=/^https?:\/\/[^\/]*\//.exec(window.location.href);if(!a||!(a[0].indexOf("optimizely")!==-1&&a[0].indexOf("edit")===-1))optly.Cleanse.log("start"),optly.Cleanse.running=!0,optly.Cleanse.each(optly.Cleanse.types,function(a,b){optly.Cleanse.getters[a]={};optly.Cleanse.properties[a]={};optly.Cleanse.each(b.prototype,function(c,e,f){f?(optly.Cleanse.getters[a][c]=f,optly.Cleanse.log("cleansed getter",a,c)):(optly.Cleanse.properties[a][c]=e,optly.Cleanse.log("cleansed property",
a,c));delete b.prototype[c]})})};optly.Cleanse.getters={};optly.Cleanse.logs=[];optly.Cleanse.properties={};optly.Cleanse.types={Object_:Object};window.optly=window.optly||{};window.optly.Cleanse=window.optly.Cleanse||{finish:optly.Cleanse.finish,logs:optly.Cleanse.logs};optly.Cleanse.start();

var $=jQuery;
var h=void 0,i=null;function aa(a,b,c){if(!j)return!1;var d=typeof b==="number"||typeof b==="string"?String(b):i,e=b===!0||b&&b.force===!0||c&&c.force===!0,f=typeof b==="object"&&b.skip===!0||typeof c==="object"&&c.skip===!0;if(d)try{ba(a,d)}catch(g){l("API","Error while activating experiment "+a+" for variation "+d+" -- proceeding without bucketing user.")}var k=i,q=[],L=[];ca(a)?q.push(a):m(n(),function(a){p(a,"manual")&&q.push(a)});m(q,function(a){if(e||da(a,!0))(k=ea(a,f))&&L.push(a)});fa(L);ga();ha()}
function ba(a,b,c){ia=!0;j&&c!==!0&&r.f(document.location.href);a=String(a);b=String(b);if(b==="-1"){v[a]&&delete v[a];ja[a]&&delete ja[a];for(b=0;b<w.length;b++)w[b].j===a&&w.splice(b,1);ka()}else if((c=x(a))&&c.length>0){a:{for(var c=x(a),d=0;d<c.length;d++){var e=la(c[d]);if(y(e,b)){c=c[d];break a}}c=""}A[a]=A[a]||{};A[a][c]=b;l("Distributor","Preferring variation partial "+b+" of section "+c+" of experiment "+a);a=ma(a);a.length===1&&B(a[0],"api.bucketUser",!1,!0)}else B(b,"api.bucketUser",!1,
!0);ga()}function na(a){a&&a==="tracking"||(j=!1);oa=!1}function pa(a,b){var c=[],d=b;C(b)&&(c=qa(b,1),d=b[0]);var e=a[d];e?(l("API",'Called function "'+d+'"'),d!=="acknowledgePreviewMode"&&ra(d,{type:"api"}),e.apply(i,c)):l("API",'Error for unknown function "'+d+'"');sa()}
function ta(){ua={};D={};va={};m(wa(),function(a){var b=E(a);ua[b]=a.split("_");var c=D,d;a:{var e=E(a);d=x(e);if(d.length===0){d=xa(e);for(e=0;e<d.length;e++)if(d[e]===a){d=e;break a}}else{for(var e=a.split("_"),f=[],g=0;g<d.length;g++)for(var k=la(d[g]),q=0;q<k.length;q++)k[q]===e[g]&&f.push(q);if(f!==[]){d=f;break a}}d=-1}c[b]=d;va[b]=ya(a)});za();Aa(window.optimizely,{activeExperiments:F,allExperiments:Ba(),all_experiments:Ba(),data:G,variationIdsMap:ua,variationMap:D,variationNamesMap:va,variation_map:D})}
function Ca(a){if(!ca(a))return!1;Da=Number(a)}function Ea(){Fa=!0}
function za(){var a=n();G={experiments:{},sections:{},state:{},variations:{},visitor:{}};for(var b=0;b<a.length;b++){var c=a[b],d={};d.code=p(c,"code")||"";d.name=p(c,"name")||"";d.manual=p(c,"manual")||!1;d.section_ids=x(c);d.variation_ids=xa(c);G.experiments[c]=d}a=Ga(H("sections")||{});for(b=0;b<a.length;b++)c=a[b],d={},d.name=H("sections",c,"name")||"",d.variation_ids=la(c),G.sections[c]=d;a=Ga(H("variations")||{});for(b=0;b<a.length;b++)c=a[b],d={},d.name=ya(c),d.code=Ha(c),G.variations[c]=d;
a={};b=Ia();a.browser={ff:"Firefox",ie:"Internet Explorer",safari:"Safari",gc:"Google Chrome",opera:"Opera"}[b]||"";b=Ja();a.location={city:b.city,state:b.region,country:b.country};a.params={};c=Ka();c.reverse();b=0;for(d=c.length;b<d;b++)a.params[c[b][0]]=decodeURIComponent(c[b][1]);a.referrer=String(document.referrer);a.mobile=La()!=="unknown";b=navigator.appVersion||"";c="";b.indexOf("Win")!==-1&&(c="Windows");b.indexOf("Mac")!==-1&&(c="Mac");b.indexOf("Linux")!==-1&&(c="Linux");a.os=c;G.visitor=
a;b={};b.activeExperiments=F||[];b.variationMap=D;b.variationNamesMap=va;G.state=b}var G={},ua={},D={},va={};function y(a,b){for(var c=0;c<a.length;c++)if(b==a[c])return!0;return!1}function Ma(a){var b=a.length;if(b===0)return i;if(b===1)return 0;for(var c=0,d=0;d<b;d++)c+=a[d];c*=Math.random();for(d=0;d<b;d++){if(c<a[d])return d;c-=a[d]}return Math.floor(Math.random()*b)}function Na(a,b){var c=qa(arguments,1);return function(){var b=qa(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}
function m(a,b){var c=i;if(C(a))for(var d=a.length,e=0;e<d;++e){if(c=b.call(h,a[e],e),Oa(c))break}else for(d in a)if(Object.prototype.hasOwnProperty.call(a,d)&&(c=b.call(h,d,a[d]),Oa(c)))break;return c}function Aa(a,b){m(b,function(b,d){a[b]=d})}function Pa(a,b){for(var c=[],d=0,e=a.length;d<e;d++){var f=a[d];b(f)&&c.push(f)}return c}function Qa(a,b){return m(b,function(b){if(b===a)return!0})||!1}function C(a){return a&&typeof a==="object"&&a.length&&typeof a.length==="number"}
function Oa(a){return typeof a!=="undefined"}function ca(a){return(typeof a==="number"||typeof a==="string")&&Number(a)==a}function Ga(a){Ga=Object.keys||function(a){var c=[];m(a,function(a){c.push(a)});return c};return Ga.call(i,a)}function Ra(a){var b=document.D||document.getElementsByTagName("head")[0]||document.documentElement,c=document.createElement("script");c.src=a;c.type="text/javascript";b.appendChild(c)}
function I(a,b,c){var d=window.console;if(J&&d&&d.log){var e=qa(arguments,1);e[0]="Optimizely / "+a+" / "+b;Function.prototype.apply.call(d.log,d,e)}}function qa(a,b){return Array.prototype.slice.call(a,b||0,a.length)}function Sa(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function Ta(){if(!Ua){var a=H("click_goals")||[];Ua=[];for(var b=0,c=a.length;b<c;b++)for(var d=a[b],e=d.selector.split(","),f=0,g=e.length;f<g;f++){var k=e[f];if(k)k={event_name:d.event_name,selector:k},d.experiments!==h?k.experiments=d.experiments:d.url_conditions!==h&&(k.url_conditions=d.url_conditions),Ua.push(k)}}return Ua}function Va(){var a=Pa(n(),Wa);Va=function(){return a};return a}function Xa(){return Pa(Ta(),function(a){return a.experiments?!1:Ya(a.url_conditions||[])})}
function Za(a){var b={},c=p(a,"events")||{};m(c,function(a,c){b[a]=[c]});for(var c=Pa(Ta(),function(b){return y(b.experiments||[],a)}),d=0;d<c.length;d++){var e=c[d];b[e.selector]||(b[e.selector]=[]);b[e.selector].push(e.event_name)}return b}function Ba(){return H("experiments")||{}}function n(){return Ga(H("experiments")||{})}function K(a){return'experiment "'+(p(a,"name")||"")+'" ('+a+")"}function x(a){return p(a,"section_ids")||[]}function xa(a){return p(a,"variation_ids")||[]}
function $a(a){var b={},c=H("public_suffixes")||{};m(c,function(a,c){m(c,function(c){b[c]=a})});$a=function(a){return b[a]||""};return $a.call(i,a)}function la(a){return H("sections",a,"variation_ids")||[]}function Ha(a){var b=[];m(a.split("_"),function(a){(a=H("variations",a,"code"))&&b.push(a)});return b.join("\n")}
function E(a){var b={};m(n(),function(a){m(x(a),function(d){m(la(d),function(d){b[d]=a})});m(xa(a),function(d){b[d]=a})});E=function(a){return b[a.split("_")[0]]||""};return E.call(i,a)}function ya(a){var b;return ab(a).join(b||", ")}function ab(a){var b=[];m(a.split("_"),function(a){b.push(H("variations",a,"name")||"Unnamed")});return b}function Wa(a){return!!p(a,"enabled")}function p(a,b){return H("experiments",a,b)}
function H(a){var b=DATA;if(m(arguments,function(a){a=b[a];if(Oa(a))b=a;else return i})!==i)return b}function bb(a){var a=H(a),b=document.location.protocol;b==="chrome-extension:"&&(b="http:");return b+"//"+a+".optimizely.com"}var Ua=i;function ra(a,b){b=b||{};window.optimizelyPreview=window.optimizelyPreview||[];cb||(window.optimizelyPreview.push(["addEvent",window.location.href,{type:"url"}]),cb=!0);window.optimizelyPreview.push(["addEvent",a,b])}function db(){l("Preview","Preview acknowledgement received");eb=!0}function fb(){M=!0;gb&&!eb&&hb()}
function hb(){if(M&&!ib)l("Preview","Will load preview script"),window.optimizelyPreview=window.optimizelyPreview||[],$(document).ready(function(){var a=H("project_id"),a="//optimizely.s3.amazonaws.com/js/"+a+"_preview.js?account_id="+a+"&no_cache="+Math.floor(1E9*Math.random());Ra(a);l("Preview","Now loading preview script "+a)});gb=!0}var eb=!1,cb=!1,gb=!1,jb=[];function Ka(){var a=window.location.search||"";a.indexOf("?")===0&&(a=a.substring(1));for(var a=a.split("&"),b=[],c=0;c<a.length;c++){var d="",e="",f=a[c].split("=");f.length>0&&(d=f[0]);f.length>1&&(e=f[1]);b.push([d,e])}return b}function kb(){for(var a=window.location.search,b,c=/optimizely_([^=]+)=([^&]*)/g,d={};b=c.exec(a);)d[b[1]]=decodeURIComponent(b[2]);return d}
function lb(a,b){var c=x(a),d=[];if(c.length===b.length)m(c,function(a,c){var e=b[c];if(e=la(a)[e])d.push(e);else return d=[],i});else if(b.length===1){var c=xa(a),e=b[0],f=c[e];!f&&y(c,e)&&(f=e);f&&d.push(f)}return d.join("_")}var mb="//cdn.optimizely.com/,https://cdn.optimizely.com/,//optimizely.appspot.com/,https://optimizely.appspot.com/,//www.local/,https://www.local/,//www-local.optimizely.com/,https://www-local.optimizely.com/".split(",");function da(a,b){b=b===!0;l("Condition","Testing experiment "+a);var c=Wa(a),d=p(a,"manual")||!1;if(c)if(nb(a)){if(!b&&d)return l("Condition"," Failed for experiment "+a+" (manual activation mode)"),N[a]="it is set to use manual activation mode",!1}else return l("Condition","Failed for experiment "+a+" (condition failed)"),!1;else return l("Condition","Failed for experiment "+a+" (paused)"),N[a]="it is paused",!1;return!0}
function nb(a){var b=p(a,"conditions")||[],c=!0;m(b,function(b){var e=b.type;if(b.only_first_time&&ob(a))l("Condition",e+" condition passed because it only gets checked when bucketing",!0);else{var f=!b.not,g=(0,pb[e])(b),b=g!==f,e="the visitor "+(g?"passed":"failed")+" a "+e+" targeting condition  when it needed to "+(f?"pass":"fail");l("Condition",e,!b);if(b)return c=!1,N[a]=e,!1}});return c}
function Ya(a){for(var b=window.location.href,c=0;c<a.values.length;c++){var d=a.values[c],e=d.value,d=d.match,f=qb(b,e,d);l("Condition","Testing URL "+b+" against  "+e+" ("+d+")",!0);if(f)return!0}return!1}
var pb={browser:function(a){var b=Ia(),c=rb(),d=!1,e=La();m(a.values,function(a){e!=="unknown"?d=a==="mobile":a.indexOf(b)===0&&(a=a.substr(b.length),d=a===""||a<=c&&c<Number(a)+1);if(d)return i});return d},code:function(a){a=a.value;if(a===h)return!0;try{return Boolean(eval(a))}catch(b){return!1}},cookies:function(a){for(var b=!1,c=a.names||[],a=a.values||[],d=0;d<c.length;d++){var e=O(c[d]);if(b=Oa(a[d])&&Sa(a[d])!==""?b||a[d]===e:b||e!==i&&e!==h)return!0}return!1},event:function(a){var b=O("optimizelyCustomEvents")||
"{}";try{b=P(b)}catch(c){b={}}var d=b[sb()]||[];C(d)||(d=[]);var e=!1;m(a.values,function(a){if($.inArray(a,d)!==-1)return e=!0});return e},language:function(a){var b=tb(),c=!1;m(a.values,function(a){if(c=a==="any"||b.indexOf(a)===0)return i});return c},location:function(a){for(var b=Ja(),c=0;c<a.values.length;c++){var d=a.values[c].split("|"),e=$.trim(d[0]),f=$.trim(d[1]),g=$.trim(d[2]),k=$.trim(d[3]);switch(d.length){case 1:if(b.country===e)return!0;break;case 2:if(b.region===f&&b.country===e)return!0;
break;case 3:if(b.city===g&&(b.region===f||""===f)&&b.country===e)return!0;break;case 4:if(b.continent===k)return!0}}return!1},query:function(a){if(a.values.length===0)return!0;var b=!1,c=Ka();m(a.values,function(a){for(var e=a.key,a=a.value||"",f=0;f<c.length;f++){var g=c[f],k=g[0],g=g[1];if(e!==""&&e===k&&(a===""||a===g))return b=!0}});return b},referrer:function(a){for(var b=document.referrer,c=0;c<a.values.length;c++){var d=a.values[c],e=d.value,d=d.match,f=qb(b,e,d);l("Condition","Testing referrer "+
b+" against  "+e+" ("+d+")",!0);if(f)return!0}return!1},url:Ya,visitor:function(a){var b=ub?"returning":"new";switch(a.value){case "new":return b==="returning"?!1:!0;case "returning":return b==="returning"}return!0}};var vb=window.OPTIMIZELY_TEST_MODULE,wb="com,local,net,org,xxx,edu,es,gov,biz,info,fr,nl,ca,de,kr,it,me,ly,tv,mx,cn,jp,il,in,iq".split(","),xb=/\/\* _optimizely_variation_url( +include="([^"]*)")?( +exclude="([^"]*)")?( +match_type="([^"]*)")?( +include_match_types="([^"]*)")?( +exclude_match_types="([^"]*)")? \*\//;function O(a){var b=a+"=",c=[];m((document.cookie||"").split(/\s*;\s*/),function(a){a.indexOf(b)===0&&c.push(decodeURIComponent(a.substr(b.length)))});var d=c.length;d>1&&I("Cookie","Values found for %s: %s",a,d);return d===0?i:c[0]}
function Q(a,b,c){var d=R||U,e=document.location.hostname;!R&&H("remote_public_suffix")&&yb.push({u:c,name:a,value:b});R&&R!==U&&(zb(a,e),zb(a,U));Ab(a,b,d,c);var f=O(a);f===b?I("Cookie","Successful set %s=%s on %s",a,b,d):(I("Cookie","Setting %s on %s apparently failed (%s != %s)",a,d,f,b),I("Cookie","Setting %s on %s",a,e),Ab(a,b,e,c),f=O(a),f===b&&(I("Cookie","Setting %s on %s worked; saving as new public suffix",a,e),U=e))}
function zb(a,b){I("Cookie","Deleting %s on %s",a,b);document.cookie=[a,"=; domain=.",b,"; path=/; expires=",(new Date(0)).toUTCString()].join("")}function Bb(a){R=a.public_suffix;I("Cookie","Public suffix request returned: %s",R);Q("optimizelyPublicSuffix",R,31536E4);if(R!==U)for(;yb.length>0;)a=yb.shift(),Q(a.name,a.value,a.u);yb=[]}
function Cb(a){var a=bb("api_host")+"/iapi/public_suffix?host="+encodeURIComponent(a),b="callback"+Math.random().toString().replace("0.",""),c=document,d=c.D||c.getElementsByTagName("head")[0]||c.documentElement,c=c.createElement("script");window.optimizely[b]=Bb;c.async="async";c.src=[a,a.indexOf("?")!==-1?"&":"?","callback=optimizely.",b].join("");d.insertBefore(c,d.firstChild)}
function Ab(a,b,c,d){a=[a,"=",encodeURIComponent(b),"; domain=.",c,"; path=/"];d&&a.push("; expires=",(new Date(+new Date+d*1E3)).toUTCString());document.cookie=a.join("")}var U="",R="",yb=[];function Db(){var a=navigator.userAgent,b=Eb([{id:"gc",substring:"Chrome",g:"Chrome"},{id:"safari",K:navigator.vendor,substring:"Apple",g:"Version"},{id:"ff",substring:"Firefox",g:"Firefox"},{id:"opera",prop:window.opera,g:"Opera"},{id:"ie",substring:"MSIE",g:"MSIE"},{id:"mo",substring:"Gecko",g:"rv"}],a),c=Eb([{id:"android",substring:"Android"},{id:"blackberry",substring:"BlackBerry"},{id:"ipad",substring:"iPad"},{id:"iphone",substring:"iPhone"},{id:"ipod",substring:"iPod"},{id:"windows phone",substring:"Windows Phone"}],
a),d=i,e=b.g;e&&(d=Fb(a,e)||Fb(navigator.appVersion,e));return{v:b.id||"unknown",w:d||"unknown",I:c.id||"unknown"}}function Fb(a,b){var c=a.indexOf(b),d=i;c!==-1&&(c+=b.length+1,d=parseFloat(a.substring(c)));return d}function Eb(a,b){return m(a,function(a){var d=a.K||b;if(d&&d.indexOf(a.substring)!==-1||a.prop)return a})||{}};var Da=0,ib=!1,j=!0,M=!1,V="",J=!1,Gb=!1,ia=!1,Fa=!1,oa=!0;function ea(a,b){var b=b===!0,c=Hb(a);if(c&&c.length>0)return l("Distributor","Not distributing experiment "+a+" (already in plan)"),!0;if(b||a in v)return l("Distributor","Not distributing experiment "+a+" (is ignored)"),!1;c=p(a,"enabled_variation_ids")||[];if(c.length===0)return l("Distributor","Permanently ignoring experiment "+a+" (no enabled variations)"),Ib(a),!1;else{var d=p(a,"ignore")||0;if(d>Math.floor(Math.random()*100))return l("Distributor","Permanently ignoring experiment "+a+"("+d+
"% likelihood)"),Ib(a),!1;else{var e=c;A[a]!==h&&(l("Distributor","Taking into account bucketUser variations for experiment "+a),e=ma(a));d=Jb(a,e);e=e[d];l("Distributor","Picked variation "+e+" [index "+d+" of "+c.length+"]");B(e,"distributor",!1);return!0}}}function Jb(a,b){var c=[],d=p(a,"variation_weights")||{};m(b,function(a){c.push(d[a])});return Ma(c)}
function ma(a){var b=[];m(p(a,"enabled_variation_ids")||[],function(c){var d=!0,e;for(e in A[a])c.indexOf(A[a][e])===-1&&(d=!1);d&&b.push(c)});return b}var A={};function fa(a){if(j){C(a)?Kb(a):(a=[],Kb());a=a.concat(W);W=[];for(var b=0;b<a.length;b++)y(F,a[b])||F.push(a[b]);a=Lb(a);Mb.push.apply(Mb,a);Nb()}}
function Nb(){var a=!1;Ob=i;for(l("Evaluator",Pb+" times waited");!a&&Mb.length>0;){l("Evaluator",Mb.length+" steps remaining");var b=Mb.shift(),c=b,a=!1;if(c.N&&!Qb)l("Evaluator","Document not ready yet"),a=!0;else if(c.h&&!Qb&&(c=c.e))for(var c=C(c)?c:[c],d=0;d<c.length;d++){var e=c[d];if(!(e===i||e===h||!e.length)&&$(e).length===0)l("Evaluator","'"+e+"' not found"),a=!0}a?Mb.unshift(b):b.i?(l("Evaluator","Bound event "+b.i+" to selector "+b.e),Rb(b.e,b.i)):b.code&&(l("Evaluator","Run code: "+b.code),
Sb(b.code))}a?(Ob=setTimeout(Nb,Pb===0?10:50),Pb++):l("Evaluator",Pb+" total times waited")}
function Sb(a){a=a.replace(Tb,Ub);if(Vb(a)){l("Evaluator","Redirect detected");var b;Wb(a||"")?b=!0:(b=O("optimizelyRedirect"),b=b===h||b===i||b==="");if(b)l("Evaluator","OK to redirect"),Wb(a)||(l("Evaluator","NOT setting a redirect cookie"),Q("optimizelyRedirect",window.location.href,5)),Q("optimizelyReferrer",document.referrer||"http://www.optimizely.com/redirect-no-referrer");else{l("Evaluator","NOT OK to redirect");return}}eval("var $j = $;");try{eval(a)}catch(c){b=J,J=!0,l("Evaluator","Error: "+
c.message),l("Evaluator","Code: "+a),J=b,l("Evaluator","Failed to run code: "+c.message)}}function Rb(a,b){if(!Xb[a]||!Xb[a][b]){var c="mousedown",d=La();if(d==="iphone"||d==="ipad"||d==="ipod")c="touchstart";$(a).bind(c,function(){r.f.call(r,b,"custom")});Xb[a]||(Xb[a]={});Xb[a][b]=c}}function Yb(a){$b=a}
function Kb(a){a||(a=n());for(var b=0;b<a.length;b++){var c=a[b],d=N[c];d?(ra("Not activating "+K(c)+" because "+d+".",{type:"explanation"}),delete N[c]):ra("Activating "+K(c)+".",{type:"explanation"})}}var Xb={},F=[],W=W||[],$b=0,Qb=!1,N={},Mb=[],Ob=i,Pb=0;$(function(){Qb=!0;Ob!==i&&(l("Evaluator","Document is ready"),clearTimeout(Ob),$b>0?setTimeout(Nb,$b):Nb())});var P,ac;
(function(){function a(a){d.lastIndex=0;return d.test(a)?'"'+a.replace(d,function(a){var b=g[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function b(c,d){var g,t,o,S,T=e,z,u=d[c];typeof k==="function"&&(u=k.call(d,c,u));switch(typeof u){case "string":return a(u);case "number":return isFinite(u)?String(u):"null";case "boolean":case "null":return String(u);case "object":if(!u)return"null";e+=f;z=[];if(Object.prototype.toString.apply(u)==="[object Array]"){S=
u.length;for(g=0;g<S;g+=1)z[g]=b(g,u)||"null";o=z.length===0?"[]":e?"[\n"+e+z.join(",\n"+e)+"\n"+T+"]":"["+z.join(",")+"]";e=T;return o}if(k&&typeof k==="object"){S=k.length;for(g=0;g<S;g+=1)typeof k[g]==="string"&&(t=k[g],(o=b(t,u))&&z.push(a(t)+(e?": ":":")+o))}else for(t in u)Object.prototype.hasOwnProperty.call(u,t)&&(o=b(t,u))&&z.push(a(t)+(e?": ":":")+o);o=z.length===0?"{}":e?"{\n"+e+z.join(",\n"+e)+"\n"+T+"}":"{"+z.join(",")+"}";e=T;return o}}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,f,g={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},k;ac=function(a,c,d){var g;f=e="";if(typeof d==="number")for(g=0;g<d;g+=1)f+=" ";else typeof d==="string"&&(f=d);if((k=c)&&typeof c!=="function"&&(typeof c!=="object"||typeof c.length!=="number"))throw Error("JSON.stringify");return b("",{"":a})};P=function(a,b){function d(a,c){var e,
f,g=a[c];if(g&&typeof g==="object")for(e in g)Object.prototype.hasOwnProperty.call(g,e)&&(f=d(g,e),f!==h?g[e]=f:delete g[e]);return b.call(a,c,g)}var e,a=String(a);c.lastIndex=0;c.test(a)&&(a=a.replace(c,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),typeof b===
"function"?d({"":e},""):e;throw new SyntaxError("JSON.parse");}})();function bc(a){a=a||{};if(oa){a&&a.sVariable&&(cc=a.sVariable);var b=cc||(typeof window.s!=="undefined"?window.s:i);b?dc?(I("Integrator","Tracking with SiteCatalyst"),m(ec(),function(a){var d=E(a),a=fc(d,a,100,100,25),e=a.key+": "+a.value;m(gc(d),function(a){I("Integrator","Setting Site Catalyst %s='%s'",a,e);b[a]=e})})):hc=!0:l("Integrator","Error with SiteCatalyst integration: 's' variable not defined")}}function ic(a,b){return a.replace(/[^a-zA-Z0-9\.\~\!\*\(\)\']+/g,"_").substring(0,b)}
function gc(a){var b=[],c=p(a,"site_catalyst_evar")||i,a=p(a,"site_catalyst_prop")||i;c!==i&&b.push("eVar"+c);a!==i&&b.push("prop"+a);return b}function fc(a,b,c,d,e){a=jc+(p(a,"name")||"");b=ab(b);b.length>1?(b=$.map(b,function(a){return a.substr(0,e-1)}),b=b.join("~")):b=b[0];a=ic(a,c);b=ic(b.replace("#",""),d);return{key:a,value:b}}
function ha(){if(oa){var a=!1;m(ec(),function(b){var c=E(b);if(p(c,"google_analytics_slot")){var d=p(c,"google_analytics_slot")||0,e=fc(c,b,28,24,5);try{I("Integrator","Calling _gaq._setCustomVar for slot %d",d),_gaq.push(["_setCustomVar",d,e.key,e.value,2])}catch(f){l("Integrator","Error sending Google Analytics data for "+K(c))}a=!0}if(H("kissmetrics")){b=fc(c,b,100,100,15);d={};d[b.key]=b.value;try{I("Integrator","Calling _kmq.set"),_kmq.push(["set",d])}catch(g){l("Integrator","Error sending KISSmetrics data for "+
K(c))}}});a&&kc();dc=!0;hc&&(bc(),hc=!1)}}function lc(a){jc=a}function mc(a){cc=a}function ec(){var a=F.concat(W),b=[];m(wa(),function(c){var d=E(c),e=!1;if(Wa(d)){var f=ya(c);y(a,d)&&(I("Integrator",'"%s" relevant because experiment active',f),e=!0);Vb(Ha(c))&&(I("Integrator",'"%s" relevant because it redirects',f),e=!0);e&&b.push(c)}});return b}
function kc(){var a=O("optimizelyReferrer");if(a&&a.length>0){try{I("Integrator","Calling _gaq._setReferrerOverride with %s",a),_gaq.push(["_setReferrerOverride",a])}catch(b){I("Integrator","Error setting Google Analytics referrer: %s",a)}Q("optimizelyReferrer","")}}var hc=!1,dc=!1,jc="Optimizely_",cc=i;function B(a,b,c,d){var c=c===!0,d=d===!0,e=!1,f=E(a);if(f&&(d||!ob(f))){e=!0;if(d&&ob(f))for(d=0;d<w.length;d++)w[d].j===f&&w.splice(d,1);w.push({j:f,id:a,source:b});c&&(W=W||[],W.push(f));ja[f]=!0;ka();l("Plan","Added experiment "+f+" and variation id "+a+" to the plan, source is "+b,!0)}return e}function ob(a){return a in v||a in ja}function nc(a){for(var b=Xa(),c=0,d=b.length;c<d;c++)a.push({i:b[c].event_name,e:b[c].selector,type:"event '"+b[c].event_name+"' (click goal)",h:!0})}
function Lb(a){a===h?a=[]:ca(a)&&(a=[a]);var b=wa(a),c=[],d=[],e=[],f=[];nc(c);m(a,function(a){oc(a,c,e,d,f)});m(b,function(a){for(var a=Ha(a),a=a.split("\n"),b=[],c=!0,e=0,Zb=a.length;e<Zb;e++){var t=$.trim(a[e]);if(t==="/* _optimizely_variation_url_end */")c=!0;else if(t!==""){var o=xb.exec(t);if(o&&o.length===11){var S=o[2]?o[2].split(" "):[],t=o[4]?o[4].split(" "):[],T=o[6]?o[6]:"substring",z=o[8]?o[8].split(" "):[],o=o[10]?o[10].split(" "):[];S.length>0&&(c=pc(S,z,T),c=Ya(c));c&&t.length>0&&
(c=pc(t,o,T),c=!Ya(c))}else c&&b.push(t)}}a=b.join("\n");qc(a,d,f)});a=[];a.push.apply(a,d);a.push.apply(a,e);a.push.apply(a,f);a.push.apply(a,c);return a}function Hb(a){var b=i;m(w,function(c){if(a==c.j)b=c.id});return b}function wa(a){var b=[],c=!Oa(a),a=a||[];m(w,function(d){(c||y(a,d.j))&&b.push(d.id)});return b}function Ib(a){var b;if(b===!0||!ob(a))v[a]=!0,ka()}
function ga(){var a={};m(rc,function(b,c){a[b]=c});m(w,function(b){var c=E(b.id);a[c]=b.id});m(v,function(b){a[b]="0"});Q("optimizelyBuckets",ac(a),31536E4)}function ka(){m(sc,function(a){a()})}
function oc(a,b,c,d,e){var f=Za(a);m(f,function(c,d){m(d,function(d){b.push({i:d,e:c,type:"event '"+d+"' (experiment "+a+")",h:!0})})});var f=p(a,"css")||"",g=p(a,"code")||"",k=p(a,"html")||"";k&&c.push({code:'$("body").append("<div style=\'display:none\'>'+k.replace(/([\f\n\r\t\\'"])/g,"\\$1")+'</div>");',e:"body",type:"global html (experiment "+a+")",h:!0});f&&c.push({code:'$("body").append("<style>'+f.replace(/([\f\n\r\t\\'"])/g,"\\$1")+'</style>");',e:"body",type:"global css (experiment "+a+")",
h:!0});g&&qc(g,d,e)}
function qc(a,b,c){if(a.indexOf("_optimizely_redirect")!==-1)b.push({code:a,type:"code forced (redirect)"});else{for(var a=a.split("\n"),d=!1,e=[],f=[];a.length>0;){var g=Sa(a.shift()),k=f.length>0;if(g)if(g.indexOf("_optimizely_evaluate=force")!==-1)d=!0;else if(g.indexOf("_optimizely_evaluate=safe")!==-1)d=!1;else if(d)e.push(g);else{if(!k){var q=tc.exec(g),L=[];q?(L.push(q[1]),(q=uc.exec(g))&&q.length>4&&L.push(q[4]),c.push({code:g,e:L,type:"safe jquery",h:!0})):k=!0}k&&f.push(g)}}e.length>0&&
b.push({code:e.join("\n"),type:"forced evaluation"});f.length>0&&c.push({code:f.join("\n"),type:"safe non-jquery",N:!0})}}function pc(a,b,c){for(var d={values:[]},e=0,f=a.length;e<f;e++)d.values.push({value:a[e],match:b[e]||c});return d}var sc=[],rc={},v={},tc=/^\$j?\(['"](.+?)['"]\)\..+;\s*$/,uc=/^\$j?\(['"](.+?)['"]\)\.detach\(\)\.(appendTo|insertAfter|insertBefore|prependTo)\(['"](.+?)['"]\);\s*$/,ja={},w=[];function Vb(a){return a.indexOf("_optimizely_redirect")!==-1}function Wb(a){return a.indexOf("_optimizely_redirect_no_cookie")!==-1};function Ub(a,b){var c;c=$.trim(b);var d="";if(window.optimizely&&window.optimizely.data)if(d=c.match(vc))d=window.optimizely.data.visitor.params[d[1]],d===h&&(d="");else{for(var d=c.split("."),e=window.optimizely,f=0,g=d.length;f<g;f++)if(e=e[d[f]],e===h||e===i){e="";break}d=""+e}l("Template",c+" evaluated to: '"+d+"'");return d}var Tb=/\{\{ *optimizely\.([^\n\r{}<>]*)\}\}/g,vc=/^data\.visitor\.params\.(.*)$/;function l(a,b,c){wc.push({A:new Date,z:a,message:b,m:c||!1});xc&&sa()}function yc(){J=!0}function zc(){Gb=J=!0}function sa(){J&&(m(wc,function(a){if(!a.G&&(!a.m||a.m===Gb)){var b=+a.A;I(a.z,a.message+(" [time "+(Ac?b-Ac:0)+" +"+(Bc?b-Bc:0)+"]"));Bc=b;Ac||(Ac=b);a.G=!0}}),xc=!0)}var Bc=i,Ac=i,wc=[],xc=!1;var r={};r.t=function(a,b){var c={},c=b&&ca(b)?{revenue:Number(b)}:b;r.f(a,"custom",c)};r.f=function(a,b,c){c=c||{};M&&(ca(c.revenue)?ra(a,{value:c.revenue}):ra(a));oa&&(r.k.push({name:a,type:b,options:c}),r.r?(r.o(),l("Tracker","Tracking event '"+a+"'")):l("Tracker","Queued tracking event '"+a+"'"))};r.B=function(){$("html").one("mousedown",Na(r.f,"engagement"))};r.C=function(a){return function(){r.J(a)}};
r.l=function(){var a=O("optimizelyPendingLogEvents")||"[]",b=[];try{b=P(a)}catch(c){}if(C(b))for(var a=0,d=b.length;a<d;a++){var e=b[a];if(typeof e!=="string"){b=[];break}else try{P(e);b=[];break}catch(f){}}else b=[];return b};r.H=function(a,b){var c=new Image,d=bb("log_host");c.onload=b;c.src=d+"/event?"+a};
r.n=function(a){var b=(a=a===!0||a==="true")?"true":"false";a?(Q("optimizelyOptOut",b,31536E4),Q("optimizelyBuckets",b,31536E4),alert("You have successfully opted out of Optimizely for this domain.")):(Q("optimizelyOptOut",b,31536E4),alert("You are NOT opted out of Optimizely for this domain."))};r.J=function(a){for(var b=r.l(),c=0,d=b.length;c<d;c++)if(b[c]===a){b.splice(c,1);break}r.q(b)};r.k=[];r.r=!1;
r.o=function(){var a=["a="+H("project_id"),"d="+H("admin_account_id"),"y="+!!H("ip_anonymization")];ia&&a.push("override=true");m(wa(),function(b){var c=E(b);a.push("x"+c+"="+b)});a.push("f="+Va().join(","));var b=a.join("&"),c=[];m(r.k,function(a){var b=[];a.name&&b.push("n="+encodeURIComponent(a.name));a.options.revenue&&b.push("v="+encodeURIComponent(a.options.revenue));a.options.anonymous!==!0&&b.push("u="+sb());b.push("t="+ +new Date);c.push(b.join("&"));if(a.type==="custom")try{r.M(a.name)}catch(d){}});
var d=c.concat(r.l());r.q(d);d=r.p?c:d;r.p=!0;for(var e=0,f=d.length;e<f;e++){var g=d[e];r.H(b+"&"+g,r.C(g))}r.k=[];r.r=!0};r.q=function(a){for(var b=ac(a);b.length>1536;)a=a.slice(0,-1),b=ac(a);Q("optimizelyPendingLogEvents",b,15)};
r.M=function(a){var b=sb(),c=O("optimizelyCustomEvents")||"{}";try{c=P(c)}catch(d){c={}}var e=c[b]||(c[b]=[]),e=C(e)?e:[];$.inArray(a,e)!==-1&&e.splice($.inArray(a,e),1);e.push(a);e.length>10&&e.shift();c[b]=e;var a=0,e=i,f=0,g;for(g in c)if(c.hasOwnProperty(g)&&(a++,c[g].length>f&&g!==b))e=g,f=c[g].length;a>10&&e!==i&&delete c[e];Q("optimizelyCustomEvents",ac(c),31536E4)};r.p=!1;var X;function Ia(){function a(){return X.v}X=X||Db();Ia=a;return a()}function tb(){var a="";try{a=navigator.userLanguage||window.navigator.language,a=a.toLowerCase()}catch(b){a=""}return a}function rb(){function a(){return X.w}X=X||Db();rb=a;return a()}function sb(){var a=O("optimizelyEndUserId");a||(a="oeu"+ +new Date+"r"+Math.random(),Q("optimizelyEndUserId",a,31536E4));return a}
function Ja(){var a={};try{a=GEOTARGETING}catch(b){}var c="",d="",e="",f="";try{d=a.country.toUpperCase()||""}catch(g){d=""}try{e=a.region.toUpperCase()||""}catch(k){e=""}e==="N/A"&&(e="");try{f=a.city.toUpperCase()||""}catch(q){f=""}f==="N/A"&&(f="");try{c=a.continent.toUpperCase()||""}catch(L){c=""}c==="N/A"&&(c="");return{city:f,continent:c,country:d,region:e}}function La(){function a(){return X.I}X=X||Db();La=a;return a()}var ub=h;function qb(a,b,c){switch(c){case "exact":return a=Cc(a),a=Dc(a,"optimizely_log"),a=Dc(a,"optimizely_verbose"),a===Cc(b);case "regex":try{return Boolean(a.match(b))}catch(d){return!1}case "simple":return a=Cc(Ec(a)),b=Cc(Ec(b)),a===b;case "substring":return a=Cc(a),b=Cc(b),a.indexOf(b)!==-1;default:return!1}}function Ec(a){var b=a.indexOf("?");b!==-1&&(a=a.substring(0,b));b=a.indexOf("#");b!==-1&&(a=a.substring(0,b));return a}
function Dc(a,b){return a.replace("&"+b+"=true","").replace("?"+b+"=true&","?").replace("?"+b+"=true","")}function Cc(a){for(var a=a.toLowerCase(),b=a.charAt(a.length-1);b==="/"||b==="&"||b==="?";)a=a.substring(0,a.length-1),b=a.charAt(a.length-1);for(var b=Fc.length,c=0;c<b;c++){var d=Fc[c];a.indexOf(d)===0&&(a=a.substring(d.length))}return a}var Fc=["http://edit.local/","http://preview.optimizely.com/","http://","https://","www."];function Gc(a){return function(b){if(typeof b==="object"&&Hc()){var c=i,d;for(d in b)b.hasOwnProperty(d)&&(c=a.call(this,d,b[d]));return c}else return a.apply(this,arguments)}}function Ic(){var a=Y.each,b=Y;return function(c,d,e){if((c.length===h||b.isFunction(c))&&Hc())if(e)for(var f in c){if(c.hasOwnProperty(f)&&d.apply(c[f],e)===!1)break}else for(f in c){if(c.hasOwnProperty(f)&&!d.call(c[f],f,c[f])===!1)break}else a.apply(this,arguments);return c}}
function Jc(){var a=Y.fn.F,b=Y;return function(c,d,e){return typeof c==="string"&&d&&b.type(d)==="object"&&Hc()?(c=new a(c,h,e),c.attr(d),c):new a(c,d,e)}}function Hc(){for(var a in{})return!0;return!1};if(!vb){var Y=$;Y.fn.attr=Gc(Y.fn.attr);Y.fn.css=Gc(Y.fn.css);Y.fn.extend=Gc(Y.fn.extend);Y.each=Ic();Y.fn.F=Jc()}l("Main","Started, revision "+H("revision"));
(function(){var a=kb(),b=/x(\d+)/,c=!1;m(a,function(a,d){var g=b.exec(a);if(g&&(c=!0,g=g[1],d!=="-1")){var k=lb(g,d.split("_"));B(k,"query",!0);jb.push(g)}});(a.opt_out==="true"||a.opt_out==="false")&&r.n(a.opt_out==="true");ib=a.cross_browser==="true";j=a.disable!=="true"&&a.opt_out!=="true"&&O("optimizelyOptOut")!=="true";M=(a.preview||M)&&j;V=a.load_script;J=a.log==="true";Gb=a.verbose==="true";oa=!c||a.force_tracking==="true";a.client==="false"&&(j=!1,V="js/"+H("project_id")+".js");if(V){var d=
!1;m(mb,function(a){if(V.substring(0,a.length)==a)return d=!0});d||(V="")}})();var Kc=document.location.hostname,Z=Kc.split("."),Lc=Kc,Mc=Z[Z.length-1];Z.length>2&&Z[Z.length-2]==="appspot"&&Mc==="com"?Lc=Z[Z.length-3]+".appspot.com":Z.length>1&&Qa(Mc,wb)&&(Lc=Z[Z.length-2]+"."+Mc);U=Lc;I("Cookie","Guessed public suffix: %s",U);R=$a(Kc);I("Cookie","Public suffix (from data): %s",R);R||(R=O("optimizelyPublicSuffix")||"",I("Cookie","Public suffix (from cookie): %s",R));
!R&&H("remote_public_suffix")&&(I("Cookie","Making request for public suffix on DOM ready"),$(Na(Cb,Kc)));var Nc=O("optimizelyBuckets"),ub=Nc!==h&&Nc!==i;
(function(){var a=O("optimizelyBuckets");if(a){try{a=P(a)}catch(b){a={}}var c={};m(a,function(a,b){var b=String(b),f=E(b);x(f).length>1&&b.indexOf("_")===-1?(c[f]=c[f]||{},c[f][a]=b):b!=="0"?B(b,"cookie",!1)||(rc[a]=b):Ib(a)});m(c,function(a,b){var c;a:{c=[];for(var g=x(a),k=0;k<g.length;k++){var q=b[g[k]];if(q==="0"){c="";break a}c.push(q)}c=c.join("_")}c.length>0?B(c,"cookie",!1):Ib(a)})}})();
(function(){sc.push(ta);var a={$:$,activeExperiments:F||[],allExperiments:Ba(),all_experiments:Ba(),allVariations:H("variations")||{},data:G,revision:H("revision"),variationIdsMap:ua,variation_map:D,variationMap:D,variationNamesMap:va},b={},c=Na(pa,b);Aa(b,{acknowledgePreviewMode:db,activate:aa,activateSiteCatalyst:bc,bucketUser:ba,bucketVisitor:ba,delayDomReadyEval:Yb,delayPageviewTracking:Ca,disable:na,log:yc,integrationPrefix:lc,optOut:r.n,preview:fb,push:c,sc_activate:bc,sc_svar:mc,skipPageTracking:Ea,
trackEvent:r.t,verbose:zc});Aa(a,b);b=window.optimizely;C(b)&&m(b,function(a){c(a)});window.optimizely=a})();l("Info","Is enabled: "+j);l("Info","Is previewing: "+M);l("Info","Script to load: "+(V||"none"));l("Info","Browser type: "+Ia());l("Info","Browser version: "+rb());var Oc=La();Oc!=="unknown"&&l("Info","Mobile browser type: "+Oc);l("Info","Visitor type: "+(ub?"returning":"new"));l("Info","User ID: "+sb());V&&Ra(V);
j&&(m(n(),function(a){if(!Qa(a,W)&&da(a)){l("Distributor","Going to distribute "+K(a));var b=ea(a),c=!1;M&&jb.length>0&&!y(jb,a)&&(l("Distributor","Not going to evaluate because of preview mode, for "+K(a)),c=!0,N[a]="it is not being previewed");b&&!c&&(W=W||[],W.push(a))}}),ga(),r.B(),Fa||(Da>0?setTimeout(function(){r.f(document.location.href)},Da):r.f(document.location.href)),r.o(),ha());
J&&(m(v,function(a){var b=p(a,"name")||"";l("Plan","Ignore experiment '"+b+"' ("+a+")")}),m(w,function(a){var b=E(a.id),c=ya(a.id);l("Plan",K(b)+' in variation "'+c+'" ('+a.id+")")}));j&&(fa(),l("API","Finalizing API."),ta(),sa());hb();

optly.Cleanse.finish();
})();
