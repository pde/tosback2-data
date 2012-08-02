(function() {
    if (window.DLQGLOBALS !== undefined) { return; }
    
    function matchProtocol(url) {
      // If array assume: [insecure-url,secure-url]
      // but tolerate single-element arrays
      if (url instanceof Array && url.length == 2) {
          return ('https:' == document.location.protocol) ? url[1] : url[0];
      } else if (url instanceof Array) {
          return url[0];
      } else {
        return url;
      }
    }

    window.DLQGLOBALS = {
        domains: {
            quilt: matchProtocol(["http://static.daylife.com/","https://origin-static.daylife.com/"]),
            dashboard: matchProtocol("https://dashboard.daylife.com/"),
            appsapi: matchProtocol(["http://apps.daylife.com/","https://origin-apps.daylife.com/"]),
            ads: matchProtocol(["http://apps.daylife.com/","https://origin-apps.daylife.com/"]),
            analytics: matchProtocol(["http://daylife-analytics.com/"])
        },
        paths: {
            quiltJS: 'quilt/20120731.0/js/',
            quiltCSS: 'quilt/20120731.0/css/',
            quiltIMG: 'quilt/20120731.0/img/',
            analyticsGIF: '_.gif',
            customerAd: 'customer_ads/ad'
        },
        keys: {
            exceptional: 'a190e359e242178150c4b9fcc5671091af58c7cc'
        }
    };

    // preserve for backward compatibility with installer
    window.DLQ_QUILT_DOMAIN = DLQGLOBALS.domains.quilt;
    window.DLQ_QUILT_JS = DLQGLOBALS.paths.quiltJS;

    // OBSOLETED by pull request frontend#1313
    // REMOVE AFTER 7-1-2012
    //
    window.DLQ_ANALYTICS_GIF_URL = DLQGLOBALS.domains.analytics +'_.gif';
    window.DLQ_APPS_API_DOMAIN = DLQGLOBALS.domains.appsapi;
    window.DLQ_DASHBOARD_DOMAIN = DLQGLOBALS.domains.dashboard;
    window.DLQ_EXCEPTIONAL_KEY = 'a190e359e242178150c4b9fcc5671091af58c7cc';
    window.DLQ_QUILT_CSS = DLQGLOBALS.paths.quiltCSS;
    window.DLQ_QUILT_IMG = DLQGLOBALS.paths.quiltIMG;
    window.DLQ_CUSTOMER_AD = DLQGLOBALS.domains.ads +'customer_ads/ad';
})();
window.DLQComponentDependencies={MustacheViews:{},clearNamespace:function(){window.DLQComponentDependencies=null}};DLQComponentDependencies.Basics=function(){function h(){var f=Date.parse(new Date);if(typeof f!="number")f=parseInt((new Date).toString().replace(/[^\d]*/g,""));return f+Math.round(Math.random()*1E4)}return{makeGuid:h,makePlaceholderId:function(f){f=f||"";return f+h()},writePlaceholderDiv:function(f,i,r){r=r||"";f='<div id="'+f+'" class="dlquilt-component-placeholder">'+r+"</div>";if(!i||i&&!i.preventDocumentWrite())document.write(f)}}}();(function(h){if(h.DLQLoad&&!h.DLQLoad.fakeLoad)return false;else{var f={},i=[],r=[],t=[],s=[],l=[],p=[],v=[],m=h.DLQGLOBALS.domains,w=h.DLQGLOBALS.paths,R=/(^https*:)\/\/([^\/]+).*/,C="https:"==document.location.protocol;if(h.console==undefined)h.console={log:function(){}};h.DLQJSON=function(){if(h.JSON)try{JSON.parse(JSON.stringify({foo:"bar"}));return h.JSON}catch(a){return null}else return null}();var o=function(a,b,c){for(var d,e=a.length-1;e>=0;e--){d=a[e];if(!c&&d===b||c&&c(d,b)===true)return e}return-1},
G=function(a){return DLQJSON.parse(DLQJSON.stringify(a),function(b,c){var d;if(typeof c=="string"&&c.indexOf("[")===0)try{d=eval("("+c+")");if(typeof d=="object"&&Object.prototype.toString.apply(d)==="[object Array]")return d}catch(e){}return c})},x=function(a,b,c){l.push({src:a,onComplete:b,onFail:c})},H=function(a){a=o(v,a,function(b,c){return b.version==c});if(a!=-1)return v[a]},J=function(a,b,c){for(var d=[],e,j,g=0;g<l.length;g++){e=l[g];if(e.src==a)if(c&&e.onFail)e.onFail();else{if(!c&&e.onComplete)if(b)(j=
I(a))&&e.onComplete(j);else e.onComplete()}else d.push(l[g])}l=d},K=function(a,b){return a.src==b},I=function(a){a=o(p,a,K);return a!=-1?G(p[a].data):null},S=function(a){a=o(p,a,K);if(a!=-1){p.splice(a,1);return true}else return false},D=function(a,b,c){if(o(i,a)!=-1)x(a,b,c);else if(o(r,a)!=-1)b&&b();else{i.push(a);x(a,b,c);y(a,false)}},y=function(a,b,c,d,e){c=c!==false;e=e||1E4;var j=document.getElementsByTagName("head")[0]||document.documentElement,g=document.createElement("script"),n=false,z,
L;g.src=b?a+b:a;if(c){g.setAttribute("async","async");g.setAttribute("defer","defer")}if(d)for(var M in d)g.setAttribute(M,d[M]);z=h.setTimeout(function(){if(b){var T=b.split("=")[1];h[T]=function(){}}J(a,b?true:false,true);N(g,a);L=!b?"Load static":"JSONP";f.loadFramework(1,function(U){U.reportException(L,a+" timed out after"+e+"ms.")});t.push(a)},e);g.onload=g.onreadystatechange=function(){if(!n&&(!g.readyState||g.readyState==="loaded"||g.readyState==="complete")){n=true;h.clearTimeout(z);N(g,a);
r.push(a);J(a,b?true:false)}};j.insertBefore(g,j.firstChild)},N=function(a,b){var c=document.getElementsByTagName("head")[0]||document.documentElement;a.onload=a.onreadystatechange=null;c&&a.parentNode&&c.removeChild(a);c=o(i,b);c!=-1&&i.splice(c,1)},O=function(a){return(a=a?a.replace(/\/+$/,""):"")?a+"/":a},q=function(a,b,c){a=O(a);b=O(b);c=c?c.replace(/\/+$/,""):"";return[a,b,c].join("")},P=function(a){var b=typeof a;if(b=="object")if(a){if(typeof a.length=="number"&&!a.propertyIsEnumerable("length")&&
typeof a.splice=="function")b="array"}else b="null";return b},Q=function(a,b){var c=[],d,e,j,g,n;for(d in a)if(a.hasOwnProperty(d)){e=a[d];g=encodeURIComponent(d);n=encodeURIComponent(e);if(typeof e=="string"||typeof e=="number")c.push(g+"="+n);else if(P(e)=="array")for(j=0;j<e.length;j++){n=encodeURIComponent(e[j]);b?c.push(g+"[]="+n):c.push(g+"="+n)}}return c.length?"?"+c.join("&"):""},E=function(a){var b=a.indexOf("?"),c={};a=(b!=-1?a.substr(b+1):a).split("&");b=a.length;for(var d,e,j,g=0;g<b;g++)if((d=
a[g].split("="))&&d[1]){e=decodeURIComponent(d[1].replace(/\+/g,"%20"));j=d[0].replace("[]","");if(c[j]&&d[0].indexOf("[]")!=-1)c[j].push(e);else c[j]=d[0].indexOf("[]")!=-1?[e]:e}return c},u=function(a,b,c,d){if(!(b||c))return a;b=b||{};var e=a;e=a.indexOf("?");if(e==-1)e=a+Q(b,d);else{var j=E(a),g;for(g in b)if(b[g])j[g]=b[g];if(c&&P(c)=="array")for(b=c.length-1;b>=0;b--)delete j[c[b]];e=a.substr(0,e)+Q(j,d)}return e};f.arrayIndexOf=o;f.deepCopy=G;f.URL={setQuery:function(a,b,c,d){return u(a,b,
c,d)},getQueryParams:function(a){return E(a)},quiltImage:function(a){return q(m.quilt,w.quiltIMG,a)},quiltCSS:function(a){return q(m.quilt,w.quiltCSS,a)},quiltJS:function(a){return q(m.quilt,w.quiltJS,a)},analyticsGIF:function(){return q(m.analytics,"",w.analyticsGIF)},customerAd:function(a,b,c){b=b||"0000000000000";return u(q(m.ads,w.customerAd,a+"/"+b),c)},componentApi:function(a,b){return u(q(m.appsapi,"",a),b)},pollApi:function(a,b){return u(q(m.appsapi,"",a),b)},dashboard:function(a,b){return u(q(m.dashboard,
a),b)},analyticsApi:function(a,b){return u(q(m.appsapi,"",a),b)},matchProtocol:function(a){a=a||"";var b=[["www.youtube.com","www.youtube.com"],["player.vimeo.com","player.vimeo.com"],["i.ytimg.com","i.ytimg.com"],["a0.twimg.com","si0.twimg.com"],["api.getexceptional.com","api.getexceptional.com"],["farm5.staticflickr.com","farm5.staticflickr.com"]],c=a.match(R),d=c?c[1]:null;c=c?c[2]:null;var e=C?0:1,j=C?1:0,g=b.length-1;if(d&&d!=document.location.protocol)for(;g>=0;g--)if(b[g][e]==c)return a.replace(c,
b[g][j]).replace(d,C?"https:":"http:");return a},resizeImage:function(a,b,c,d){var e=a.split("?")[0];a=E(a);var j=e.match(/(\d*x)(\d*).jpg/);e=e.replace(/(\d*x)(\d*).jpg/,"");var g=j[1];j=j[2];if(d&&g&&j&&b&&c){d=parseInt(g)/parseInt(j);c=d>1?"":c;b=(d<=1?"":b)+"x"}else{c=c||"";b=(b||"")+"x"}e=e+b+c+".jpg";e=f.URL.matchProtocol(e);return e=f.URL.setQuery(e,a)},getCanonicalUrl:function(){var a=h.DLQPageConfig,b=location.href,c=location.protocol+"//"+location.hostname;if(a&&a.canonicalUrl)b=a.canonicalUrl;
else if(a=document.getElementsByTagName("link"))for(var d=a.length-1;d>=0;d--)if(a[d].getAttribute("rel")=="canonical")b=a[d].getAttribute("href");if(b.indexOf("/")===0)b=c+b;else if(b.search(/^https*:\/\//)==-1){a=location.pathname.split("/");a.pop();a.push(b);b=c+a.join("/")}return b}};f.loadComponent=function(a,b){b=b||{};var c=a.toLowerCase()+".js",d=f.URL.quiltJS(c),e={"data-dlquilt-component":b.componentId,"data-dlquilt-customer":b.customerId};if(b.config)b.config.dlqLoaded=true;x(d,null,function(){h.DLQComponentConfig=
null});if(h.DLQComponentConfig){var j;j=h.setInterval(function(){if(h.DLQComponentConfig===null){h.clearInterval(j);h.DLQComponentConfig=b;y(d,null,false,e)}},50)}else{h.DLQComponentConfig=b;y(d,null,false,e)}};f.loadCss=function(a){if(o(s,a)==-1){s.push(a);var b=document.getElementsByTagName("head")[0]||document.documentElement,c=document.createElement("link");c.href=a;c.type="text/css";c.rel="stylesheet";b.appendChild(c)}};var F=function(){var a=Date.parse(new Date);if(typeof a!="number")a=parseInt((new Date).toString().replace(/[^\d]*/g,
""));return a+Math.round(Math.random()*1E4)};f.loadFramework=function(a,b){var c=a.toString();if(c.length==1)c+=".0";var d;D(f.URL.quiltJS("dlquilt-"+c+".js"),function(){d=H(a);if(!d){v.push(h.DLQuilt);h.DLQuilt=null;d=H(a)}d&&b(d)});return d};var A=[];DLQJSON||D(f.URL.quiltJS("dlqjson.js"),function(){for(var a=0;a<A.length;a++)f.jsonp(A[a][0],A[a][1])});f.jsonp=function(a,b){if(DLQJSON){b=b||{};var c=b.jsonpParam||"jscallback",d=b.jsonpFuncName||"DLQuilt_callback_"+F(),e=b.onComplete||function(){},
j=b.onFail,g=b.noCache===true,n=null;if(b.params)a=u(a,b.params);if(o(i,a)!=-1)x(a,e,j);else{if(g){if(((g=S(a))||o(t,a)!=-1)&&b.jsonpFuncName)d+=F()}else n=I(a);if(n)e(n);else{h[d]=function(z){p.push({src:a,data:z})};i.push(a);x(a,e,j);c=c+"="+d;c=a.indexOf("?")==-1?"?"+c:"&"+c;y(a,c,true,null,b.failAfter)}}}else A.push([a,b])};f.api=function(a,b,c,d){d=d||{};var e=b+"_"+(d.jsonpFuncName||F());switch(a){case "component":a=f.URL.componentApi(b,c);break;case "poll":a=f.URL.pollApi(b,c);break;case "analytics":a=
f.URL.analyticsApi(b,c);break;default:a=null}h.DLQLoad.jsonp(a,{jsonpFuncName:e,onComplete:d.onComplete,onFail:d.onFail,noCache:d.noCache,failAfter:d.failAfter});return a};f.loadScript=D}if(h.DLQLoad&&h.DLQLoad.fakeLoad)for(var B in f){if(f.hasOwnProperty(B)&&h.DLQLoad[B]==undefined)h.DLQLoad[B]=f[B]}else h.DLQLoad=f;return true})(window);(function(){var h=function(f){var i=window.DLQComponentConfig||{config:{}};window.DLQComponentConfig=null;if(!i.config)i.config={};this.customerId=i.customerId||null;this.componentId=i.componentId||null;this.installId=i.installId||null;this.appendTo=i.config.appendTo||null;this.insertAfter=i.config.insertAfter||null;this.insertBefore=i.config.insertBefore||null;this.noDocumentWrite=i.config.noDocumentWrite===true?true:false;this.usePreviewData=i.config.usePreviewData===true?true:false;this.useDefaultCss=
i.config.useDefaultCss===false?false:true;this.referrer=typeof i.config.referrer=="string"?i.config.referrer:null;this.dlqLoaded=i.config.dlqLoaded;this.paramOverride=i.paramOverride||null;if(f)for(k in f)if(f.hasOwnProperty(k)&&this[k]==undefined)this[k]=i.config[k]!=undefined?i.config[k]:f[k]};h.prototype={preventDocumentWrite:function(){return this.noDocumentWrite||this.appendTo||this.insertBefore||this.insertAfter},getComponentId:function(){return this.componentId},getCustomerId:function(){return this.customerId},
getReferrer:function(){return this.referrer||location.href},getInstallId:function(){return this.installId}};DLQComponentDependencies.LocalConfig=h})();(function(){function h(t){t=t.result.installed.sort(function(v,m){return v.install_id<m.install_id?-1:v.install_id>m.install_id?1:0});for(var s,l,p=0;p<t.length;p++){s=t[p];l=s.selector||{};l={customerId:i,installId:s.install_id,componentId:s.component_id,config:{noDocumentWrite:true,insertAfter:l.insertAfter,insertBefore:l.insertBefore,appendTo:l.appendTo}};DLQLoad.loadComponent(s.component_type,l)}}window.DLQIncludeComponentsLoaded=true;var f=DLQComponentDependencies,i=(new f.LocalConfig).getCustomerId();
if(i){var r={customer_id:i,url:DLQLoad.URL.getCanonicalUrl()};DLQLoad.api("component","get_installed_components",r,{jsonpFuncName:i+"includecomponents",onComplete:h})}f.clearNamespace()})();
