/*
  Library of JavaScripts for Sheplers.
*/

// if <html class="js">, then assume javascript will work.
//This allows us to style the site for JavaScript-enabled and disabled modes.
$('html').addClass('js');

//site namespace
var site = {
	isEmpty: function(str) {
		return (str === null || (str.replace(/\s*/g,"") == ""));
	},
	useHiDPI:true,
	variants:{},
	pdp:{}
};

//site.devicePixelRatio is used for calculating HiDPI images on screens that support it.
site.devicePixelRatio = (site.useHiDPI ? window.devicePixelRatio || 1 : 1);

/*
site method getImageUrl

Returns a url using your image provider with the specified file name, width and height.
HiDPI is calculated here, so don't pass it in.
 */

site.getImageUrl = function(fileName, imageWidth, imageHeight){
	var src = site.imageUrlTemplate.replace("{fileName}",fileName);
	src = src.replace("{fileWidth}",imageWidth * site.devicePixelRatio);
	src = src.replace("{fileHeight}",imageHeight * site.devicePixelRatio);
	return src;
};

/***** WIDGET Core functionality *****/
//BASE.JS
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 6=4(){};6.7=4(b,c){3 d=6.o.7;5(2.v){b.8=w}6.r=t;3 e=D 2;d.p(e,b);E 6.r;3 8=e.8;3 f=e.8=4(){5(!6.r){5(2.x||2.8==f){2.x=t;5(8){8.y(2,9)}E 2.x}z 5(9[0]!=w){m(9[0].7||d).p(9[0],e)}}};f.F=2;f.7=2.7;f.A=2.A;f.B=2.B;f.o=e;f.q=2.q;f.n=4(a){m(a=="G")?f:8.n()};d.p(f,c);3 g=8?f:D f;5(!8){f.v=t;g.v=t;5(g.H){f.I=g.H();g.O=f.I}3 h=4(){3 a=9.P;m 6.7.y(a.J,9)};h.J=g.8;g.7=h}5(u g.K=="4"){g.K()}m g};6.o={7:4(c,d){5(9.L>1){3 e=2[c];5(e&&(u d=="4")&&(!e.n||e.n()!=d.n())){3 f=d.n();d=4(){3 a=2.s||6.o.s;2.s=e;3 b;Q{b=f.y(2,9)}R(M){S M;}T{2.s=a}m b};d.n=4(a){m(a=="G")?d:f};d.q=6.q}2[c]=d}z 5(c){3 g=6.o.7;5(!6.r&&u 2!="4"){g=2.7||g}3 h={U:w};3 j=["8","q","n"];3 i=6.r?0:1;3 k;V(k=j[i++]){5(c[k]!=h[k]){g.p(2,k,c[k])}}C(3 l N c){5(!h[l]){g.p(2,l,c[l])}}}m 2},s:4(){}};6=6.7({8:4(){2.7(9[0])}},{F:W,X:"1.1",A:4(a,b,c){C(3 d N a){5(2.o[d]===Y){b.p(c,a[d],d,a)}}},B:4(){C(3 i=0;i<9.L;i++){5(u 9[i]=="4"){9[i](2.o)}z{2.o.7(9[i])}}m 2},q:4(){m Z(2.n())}});',62,62,'||this|var|function|if|Base|extend|constructor|arguments|||||||||||||return|valueOf|prototype|call|toString|_prototyping|base|true|typeof|singleInstance|null|_constructing|apply|else|forEach|implement|for|new|delete|ancestor|object|getWidgetClassName|widgetClass|klass|init|length|ex|in|className|callee|try|catch|throw|finally|toSource|while|Object|version|undefined|String'.split('|'),0,{}));
//PERSISTENT STORAGE (persistentStorage.js)
(function(){var G=function(){function t(a){var c=a||F;B=function(){var d="",g="";for(var l in c){d+=d.length!=0?"|"+l:l;g+="case '"+l+"':return '"+c[l]+"';"}return new Function("input","return input.replace(/"+d+"/g, function(s){ switch(s){ "+g+" default: return s;}}).replace(/ /g,'+');")}();D=function(){var d="",g="";for(var l in c){d+=d.length!=0?"|\\"+c[l]:"\\"+c[l];g+="case '"+c[l]+"':return '"+l+"';"}return new Function("input","return input.replace(/"+d+"/g, function(s){ switch(s){ "+g+" default: return s;}});")}()}
function o(){var a=/#(.*)/.exec(top.location.href);a=top.location.hash?top.location.hash:a?a[1]:"{}";a=a.substr(0,1)=="#"?a.substr(1):a;if(a==w)return v;w=a;var c=a.indexOf("{");if(c!=0){var d=parseInt(a.substr(0,c));a=a.substr(c);if(c=r.fromJSON(f.value)){if(d!=h&&d<c.length)h=d}else{j=a;top.location.hash="0"+j;d=m(a);f.value=r.toJSON([d]);r.notifyListeners(d)}}else h=h!=-1?0:h;return v=a}function s(a){top.location.hash="0"+a;f.value=r.toJSON([m(a)]);h=0}function b(a,c,d){for(var g in c){if(!d&&
typeof c[g]!=typeof a[g])return false;if(typeof c[g]=="array"||typeof c[g]=="object"){if(!b(a[g],c[g],typeof c[g]=="array"))return false}else if(d){if(!$.inArr(c[g],a))return false}else if(c[g]!=a[g])return false}return true}function e(a,c){var d;try{d=n.contentWindow.document;d.open("javascript:'<html></html>'");d.write("<html><body><div id='tState'>"+a+"</div><div id='pState'>"+c+"</div></body></html>");d.close();return true}catch(g){return false}}function p(){if(!n.contentWindow||!n.contentWindow.document)setTimeout(p,
10);else{var a,c,d,g,l,u;a=n.contentWindow.document;c=a.getElementById("pState");g=a.getElementById("tState");u=c?c.innerText:null;setInterval(function(){var x;r.fromJSON(f.value);a=n.contentWindow.document;c=a.getElementById("pState");g=a.getElementById("tState");var y=c?c.innerText:null;x=g?g.innerText:null;d=c?m(y):null;l=g?r.fromJSON(x):null;x=o();if(y!=u){u=y;r.notifyListeners(l?l:d);j=top.location.hash=u}else if(x!==j){j=x;e(r.toJSON(m(j)),j)}},250);k=true}}function A(a,c){if(!k){f=$("#"+a)[0];
if(jQuery.browser.msie){n=$("#"+c)[0];p()}else{counter=history.length;setInterval(function(){var d,g;d=o();var l=m(d),u=r.fromJSON(f.value);g=history.length;if(g!==q&&jQuery.browser.safari){j=d;q=g;(d=u&&u.length>0&&u[q]?u[q]:null)||(d=l);r.notifyListeners(d)}else if(d!==j){j=d;if(d=u&&u.length>0&&h!=-1?u[h]:null){if(!b(d,l)){s(j);d=l}}else{s(j);d=l}r.notifyListeners(d)}},250);k=true}}}function m(a){return r.fromJSON(D(a))}var k=false,n=null,f=null,q=0,h=-1,w="",v="",j="{}",i,B,D,z=[],C=[],F={unique:"~1",
product:"~2",ensemble:"~3",category:"~4",catalog:"~5","true":"~6","false":"~7","null":"~8"};return{initialize:function(a,c){t(i);A(a,c)},setUserDictionary:function(a){i=a},saveState:function(a,c,d){if(k){h=h==-1?0:h;var g=r.fromJSON(f.value)||[{}],l;d=d?{}:m(o())||{};if(c){l=jQuery.dupe(g[h]);g.length=h+1;g.push(l)}else l=g[h];var u=false;if(c&&z.length!=0){u=true;for(var x in z){C.push(z[x]);d[z[x]]&&delete d[z[x]]}z=[]}var y=C.concat(z);if(y.length!=0){for(x in y)l[y[x]]&&delete l[y[x]];C=[]}jQuery.extend(true,
l,a);f.value=r.toJSON(g);if(c){c=!b(d,a);if(u||c){a=jQuery.extend(true,d,a);j=B(r.toJSON(a));h++;if(jQuery.browser.msie)e(r.toJSON(g[h]),B(r.toJSON(a)));else top.location.hash=h+j}}}},loadState:function(a){if(!k)return{};var c=!a?r.fromJSON(f.value):[],d=h==-1?0:h;return c&&c.length>0&&!a?c[d]:m(o())},removeKey:function(a,c){if(k)(c?z:C).push(a)},resetState:function(a){if(k){if(a)top.location.hash="";f.value="[]";h=0}},compareStates:function(a,c){if(!k)return false;return b(a,c)},compress:function(a){if(!k)return a;
return B(a)},decompress:function(a){if(!k)return a;return D(a)},getName:function(){return"URLStorageModule"}}}(),r=function(){function t(b,e){var p=e.widgetData;if(p)p.disableEvents=true;e.jsClass.restoreState(b,e.obj);if(p)p.disableEvents=false}var o=G,s=[];return{setStorageModule:function(b){if(!b.saveState&&!b.loadState&&!b.removeKey&&!b.resetState){b=b.getName?b.getName():"unknown";throw new Error("Module '"+b+"' does not implement saveState, loadState, removeKey, and resetState methods as required by persistent storage library.");
}o=b},register:function(b,e){if(!b.restoreState)throw new Error("The Javascript class you are registering does not implement the restoreState() method!");var p=null;if(e&&$(e).isWidget()){$(e).widgetData({disableEvents:false});p=$(e).widgetData()}s.push({obj:e,jsClass:b,widgetData:p})},notifyListeners:function(b){try{window.PERSISTENT_STORAGE_RESTORING=true;var e=0;switch(s.length&3){case 3:t(b,s[e++]);case 2:t(b,s[e++]);case 1:t(b,s[e++])}if(e<s.length){do{t(b,s[e++]);t(b,s[e++]);t(b,s[e++]);t(b,
s[e++])}while(e<s.length)}}finally{window.PERSISTENT_STORAGE_RESTORING=false}},savePersistent:function(b,e){if(typeof b=="string"){var p=b.toString();b={};b[p]=e}o.saveState(b,true)},loadPersistent:function(){return o.loadState(true)||{}},executeState:function(b){this.notifyListeners(b);o.saveState(b,true,true)},removePersistentKey:function(b){o.removeKey(b,true)},resetPersistent:function(){o.resetState(true)},saveTransient:function(b,e){if(typeof b=="string"){var p=b.toString();b={};b[p]=e}o.saveState(b,
false)},loadTransient:function(){return o.loadState()},removeTransientKey:function(b){o.removeKey(b)},resetTransient:function(){o.resetState()},toJSON:function(b){return E.stringify(b)},fromJSON:function(b){if(b.length==0)return null;try{return E.parse(b,function(p,A){var m;if(typeof A==="string")if(m=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(A))return new Date(Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6]));return A})}catch(e){return null}}}}(),E=function(){function t(k){return k<
10?"0"+k:k}function o(k){return b.test(k)?"'"+k.replace(b,function(n){var f=A[n];if(typeof f==="string")return f;f=n.charCodeAt();return"\\u00"+Math.floor(f/16).toString(16)+(f%16).toString(16)})+"'":"'"+k+"'"}function s(k,n){var f,q,h,w,v=e,j,i=n[k];if(i&&typeof i==="object"&&typeof i.toJSON==="function")i=i.toJSON(k);if(typeof m==="function")i=m.call(n,k,i);switch(typeof i){case "string":return o(i);case "number":return isFinite(i)?String(i):"null";case "boolean":case "null":return String(i);case "object":if(!i)return"null";
e+=p;j=[];if(typeof i.length==="number"&&!i.propertyIsEnumerable("length")){w=i.length;for(f=0;f<w;f+=1)j[f]=s(f,i)||"null";h=j.length===0?"[]":e?"[\n"+e+j.join(",\n"+e)+"\n"+v+"]":"["+j.join(",")+"]";e=v;return h}if(typeof m==="object"){w=m.length;for(f=0;f<w;f+=1){q=m[f];if(typeof q==="string")if(h=s(q,i,m))j.push(o(q)+(e?": ":":")+h)}}else for(q in i)if(h=s(q,i,m))j.push(o(q)+(e?": ":":")+h);h=j.length===0?"{}":e?"{\n"+e+j.join(",\n"+e)+"\n"+v+"}":"{"+j.join(",")+"}";e=v;return h}}Date.prototype.toJSON=
function(){return this.getUTCFullYear()+"-"+t(this.getUTCMonth()+1)+"-"+t(this.getUTCDate())+"T"+t(this.getUTCHours())+":"+t(this.getUTCMinutes())+":"+t(this.getUTCSeconds())+"Z"};var b=/["\\\x00-\x1f\x7f-\x9f]/g,e,p,A={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r","'":"\\'","\\":"\\\\"},m;return{stringify:function(k,n,f){var q;p=e="";if(f)if(typeof f==="number")for(q=0;q<f;q+=1)p+=" ";else if(typeof f==="string")p=f;if(n)if(typeof n==="function"||typeof n==="object"&&typeof n.length===
"number")m=n;else throw new Error("JSON.stringify");else m=function(h,w){if(Object.hasOwnProperty.call(this,h))return w};return s("",{"":k})},parse:function(k,n){function f(h,w){var v,j,i=h[w];if(i&&typeof i==="object")for(v in i)if(Object.hasOwnProperty.call(i,v)){j=f(i,v);if(j!==undefined)i[v]=j;else delete i[v]}return n.call(h,w,i)}var q;if(/^[\],:{}\s]*$/.test(k.replace(/\\['\\\/bfnrtu]/g,"@").replace(/'[^'\\\n\r]*'|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,
""))){q=eval("("+k+")");return typeof n==="function"?f({"":q},""):q}throw new SyntaxError("JSON.parse: "+k);},quote:o}}();window.PersistentStorage=r})();
//ANALYTICS TRACKING (analyticsTracking.js)
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(1i o=="1B"){7 o=C.T({e:{},L:B,J:6(a,b){5(!b){n y w("1G 1A 1v a 1p N 1h G F D 1a 16 13.");}5(a&&a.v&&a.3){2.e[b]=a;5(a.U){a.U()}}q{n y w("1M G F D \'"+b+"\' 1I N o.J()");}},1F:6(a){O 2.e[a]},1z:6(b){7 c=[];f(7 a=0;a<l.K;a++){c.r(l[a])}f(7 p s 2.e){2.e[p].v.u(2.e[p],c)}}});7 H=C.T({A:B,P:m,8:B,L:6(a,b){5(2.1b("P")){n y w("H 19 17 15 14 12 11 10 Z.");}2.8={};2.A=a;5($("X").W("V")=="m"){2.z("1S 9",1O.1N)}},1L:6(){2.4("Q","1H",2.3);2.4("Q","1E",2.3);2.4("1D","1C",2.3);2.4("x","1y",2.3);2.4("x","1x",2.3);2.4("x","1w",2.3);2.4("k","1u",2.3);2.4("k","1t",2.3);2.4("k","1s",2.3);2.4("k","1r",2.3);2.4("9","1o",2.3);2.4("9","1n",2.3);2.4("9","1m",2.3);2.4("9","1q",2.3);2.4("9","1l",2.3);2.4("9","1k",2.3);2.4("t","1j",2.3);2.4("t","1g",2.3);2.4("t","1f",2.3)},I:6(){g 2.A},4:6(a,b,c){5(!2.8[a]){2.8[a]={"j":[b],"M":c}}q{7 d=2.8[a];d["j"].r(b)}},1e:6(a){O 2.8[a]},3:6(a,b){},S:6(a,b){5(1d.1c.E){g(a["j"].E(b)!=-1)}q{f(7 i s a["j"]){5(a["j"][i]===b){g m}}g 1J}},z:6(a,b){5(1K.R){R.18("==> ("+2.I()+") "+a+":",b)}},v:6(b){7 c=[];f(7 a=0;a<l.K;a++){c.r(l[a])}f(7 h s 2.8){5(2.S(2.8[h],b)){7 d=2.8[h]["M"];c.Y(h);5($("X").W("V")=="m"){2.z("1P 1Q",c)}d.u(2,c);g}}c.Y("1R 1T");2.3.u(2,c)}})}',62,118,'||this|genericHandler|addEventHandler|if|function|var|eventHandlers|View|||||providers|for|return|||eventNames|Search|arguments|true|throw|EventTracker||else|push|in|Click|apply|trackEvent|Error|Browsing|new|logEvent|trackerId|null|Base|provider|indexOf|tracking|event|BaseEventTrackingProvider|getTrackerId|addProvider|length|constructor|trackerObject|to|delete|baseTracker|Refinements|console|isEventHandler|extend|init|debug|attr|html|unshift|instantiated|be|cannot|and|registering|class|abstract|are|an|info|is|you|hasOwnProperty|prototype|Array|removeEventHandler|CrossSell|NarrowResults|the|typeof|Filmstrip|Zoom|AltImage|Ensemble|Product|QuickView|name|EnsembleProduct|AsList|AsGrid|SortBy|Keywords|assign|ToPage|ByPage|AllItems|track|must|undefined|Category|Navigation|RefineCategory|removeProvider|You|RefineGroup|passed|false|window|initialize|Unknown|location|document|Event|Track|Generic|Page|Events'.split('|'),0,{}));
//JQUERY.FRY.JS (jquery.fry.js)
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$("2A",G).Y($("<1f 1G=\'1g/1h\'>p.q { 1i: 1H; }</1f>"));9.E({1I:4(a){6 d=(a&&a.2B==1j)?[]:{};J(6 i A a){8(S a[i]===\'1J\'){d[i]=9.1I(a[i])}F{d[i]=a[i]}}5 d},2C:4(a){a+=(a.T(\'?\')>0?"&":"?")+"2D=2E,2F";6 b={};9.2G(a);5 b},1k:{},2H:4(a,b,c,d){b=b.B(",");6 e=[];1K(b.H>0){6 f=b.2I();8(7.1k[f]==y){e.N(f);7.1k[f]=K}}8(e.H>0){a+=(a.T("?")>0?"&":"?")+"2J="+c+"&2K="+e.Z(",")+"&r="+(1l 2L().2M());8(d){a+="&2N="+d}$("U",G).Y($("<2O>").1L({2P:"2Q",1G:"1g/1h",1M:a}))}},2R:4(a,b,c){6 d={h:10.11($("U",G).1m()/2),v:10.11($("U",G).1n()/2)};b=9.E({1o:"2S",1p:K,1m:2T,1n:2U,2V:"2W",1N:"1q",2X:"1q",2Y:"1q"},b);8(b.1p){b=9.E(b,{2Z:(d.h-10.11(b.1m/2)),30:(d.v-10.11(b.1n/2))})}6 e=b.1o;1O b.1p;1O b.1o;b=9.1P(b).z(/&/g,",");c=9.1P(c);a+=(a.T("?")>0?"&":"?")+c;6 f=12.31(a,e,b);f.32();5 f},33:4(b,c){6 a=[];1K(b-->0){a.N(c||0)}5 a},34:4(a,b){5 a.35(b)},36:4(c,d){6 e=[];J(6 a A c){J(6 b A d){8(c[a]===d[b]){e.N(d[b]);1r}}}5 e},37:4(c,d){6 e=[];6 a,b,f;J(a A c){f=u;J(b A d){8(c[a]===d[b]){f=K;1r}}8(!f){e.N(c[a])}}J(b A d){f=u;J(a A c){8(d[b]===c[a]){f=K;1r}}8(!f){e.N(d[b])}}5 e},38:4(b,c){J(6 a A c){8(b===c[a]){5 K}}5 u},39:4(a,b,c){6 d=4(){8(12[$3a]==1s){8($3b-->0){1Q(O.1R,3c)}}F{1S.1T(12,$1U)}}.1V();d.3d=b;d.3e=a;d.1W=c;5 d},1X:4(f,g,h){6 i;8(!f){i=$("p."+g)}F{i=$("p."+g,f)}i.L(4(){6 c=$(7);6 d=c.1g().z(/(\\n|\\r|\\t)/g,"").z(/\\s{2,}/g," ").z(/&1Y;/g,"<").z(/&1Z;/g,">").z(/&3f;/g,"&1Y;").z(/&3g;/g,"&1Z;");6 e=c.1t();6 t;20(4 3h(){t=1S("(4 3i(){6 o="+d+";5 o;})()");c.1u()},4(a){6 b="3j 3k "+g+" - ";8(a 21 3l||a 21 3m){b+="3n 3o 3p: a 22 23, a 22 24 3q 3r, 24 a 3s 3t 13 3u 23 3v 13 3w 3x."}F{b+=a.25}b+="3y 3z 13 1v \'"+d+"\' ";8(e){e=e[0];b+="A 3A 3B 26 3C 13 1v 26: <"+e.3D.27();8(e.14){b+=" 14=\'"+e.14+"\'"}8(e.28){b+=" 15=\'"+e.28+"\'"}b+="/>\\n"}5 b});h(e,t)})},29:4(c){8((S I!="1s")&&$.j.1w){I.2a("3E 3F 1v")}9.1X(c,"q",4(a,b){$(a).q(b)})}});9.V.E({16:4(a,b){6 c=4(){$2b.L(4(){$1U.1T($2b)})}.1V();c.3G=7;c.1W=b;5 1Q(c,a)},3H:4(a,b,c){7.16(a,4(){7.3I(b,c)});5 7},3J:4(a,b,c){7.16(a,4(){7.3K(b,c)});5 7},3L:4(a,b,c,d){7.16(a,4(){7.3M(b,c,d)});5 7},3N:4(b,c,d){5 7.L(4(){9.1x.3O(7,b,4(a){9(7).3P(a,O.1R);5(d||c).W(7,O)},c)})},3Q:4(){5 7.L(4(){9(7).3R(4(){$(7).1t().2c("2d")},4(){$(7).1y("1z-1A").1t().1y("2d")}).3S(4(){$(7).2c("1z-1A")}).3T(4(){$(7).1y("1z-1A")})})},3U:4(){5 7.L(4(){5!7.3V})},q:4(a,b){8(a!=y&&(S a=="3W")&&b==y){6 c=7.H&&7[0].q||y;5(c!=y?c[a]:y)}F 8(a==y&&b==y){6 c=7.H&&7[0].q||y;5(c!=y?c:y)}F{5 7.L(4(){8(!7.q){7.q={}}8(S a!=\'1J\'){7.q[a]=b}F{8(b==y||!b){7.q=9.E(7.q,a)}F{7.q=a}}})}},3X:4(a,b){5 7.2e(a).2f(b)}});9.E(3Y.3Z,{40:4(){5 7.z(/\\b\\w/g,4(a){5 a.41()})},42:4(){5 7.z(/^\\s*/,"")},43:4(){5 7.z(/\\s*$/,"")},44:4(){5 7.z(/^\\s*(.*?)\\s*$/,"$1")},45:4(a,b){6 x=1l 1j(a);x.N(7);x.Z(b?b:" ");5 x},46:4(a,b){6 x=1l 1j(a-1);x.47(7);x.Z(b?b:" ");5 x},17:4(a){5(7.T(a)==0)},18:4(a){6 b=7.H-a.H;b=(b>=0?b:0);5(7.48(b)==a)},19:4(a){5(7.T(a)!=-1)}});9.E(9.49[\':\'],{q:"(4(P, Q){"+"    6 d = P.q;"+"    8 (!d) 5 u;"+"    6 r = /(.*?)([!|\\\\^|\\\\$|\\\\*]?=)(.*)/;"+"    6 a = r.1B(Q);"+"    8 (!d[a[1]]) 5 u;"+"    1C (a[2]) {"+"       k  \'=\': 5 d[a[1]] == a[3];"+"       k \'!=\': 5 d[a[1]] != a[3];"+"       k \'^=\': 5 d[a[1]].17(a[3]);"+"       k \'$=\': 5 d[r[1]].18(a[3]);"+"       k \'*=\': 5 d[r[1]].19(a[3]);"+"       1D  : 5 u;"+"    };"+"})(a, m[3])",2g:"(4(P, Q){"+"    6 d = P.2g;"+"    8 (!d) 5 u;"+"    6 r = /(.*?)([!|\\\\^|\\\\$|\\\\*]?=)(.*)/;"+"    6 a = r.1B(Q);"+"    8 (!d[a[1]]) 5 u;"+"    1C (a[2]) {"+"       k  \'=\': 5 d[a[1]] == a[3];"+"       k \'!=\': 5 d[a[1]] != a[3];"+"       k \'^=\': 5 d[a[1]].17(a[3]);"+"       k \'$=\': 5 d[r[1]].18(a[3]);"+"       k \'*=\': 5 d[r[1]].19(a[3]);"+"       1D  : 5 u;"+"    };"+"})(a, m[3])",2h:"(4(P, Q){"+"    6 d = P.2h;"+"    8 (!d) 5 u;"+"    6 r = /(.*?)([!|\\\\^|\\\\$|\\\\*]?=)(.*)/;"+"    6 a = r.1B(Q);"+"    8 (!d[a[1]]) 5 u;"+"    1C (a[2]) {"+"       k  \'=\': 5 d[a[1]] == a[3];"+"       k \'!=\': 5 d[a[1]] != a[3];"+"       k \'^=\': 5 d[a[1]].17(a[3]);"+"       k \'$=\': 5 d[r[1]].18(a[3]);"+"       k \'*=\': 5 d[r[1]].19(a[3]);"+"       1D  : 5 u;"+"    };"+"})(a, m[3])","A":4(a,i,m){6 l=M(m[3].B("-")[0]);6 h=M(m[3].B("-")[1]);5(i>=l&&i<=h)},"4a":4(a,i,m){6 l=M(m[3].B("-")[0]);6 h=M(m[3].B("-")[1]);5(i>l&&i<h)},"4b":4(a,i,m){6 l=M(m[3].B("-")[0]);6 h=M(m[3].B("-")[1]);5(i<=l||i>=h)},"4c":4(a,i,m){6 l=M(m[3].B("-")[0]);6 h=M(m[3].B("-")[1]);5(i<l||i>h)},"2i":"9(a).2i(m[3]).H>0","2j":"9(a).2j(m[3]).H>0"});6 1E={};$.L(12.1N.4d.B("&"),4(){6 p=7.B("=");1E[p[0].z("?","")]=p[1]});6 2k=4(o){6 a=[];o=o||$.j.1a;$.L(o,4(b,c){a.N(b+"="+c)});5"?"+a.Z("&")};$.E(9.j,{1a:1E,4e:2k,4f:/4g/.4h(4i.4j.27())});8(($.j.1a["4k"]||$("2l").1L("2a")=="K")&&(S I!="1s")){$.E(9.j,{1w:K,C:(4(){6 a=4l($.j.1a["4m"]);5(4n(a)?0:a)})()});(4(){6 f=9.V.1b,2m=9.V.2n,2o=9.V.2p,2q=9.1x.1b,X=u;8($.j.C>0){I.2r("2s 2t: ",$.j.C)}$(G).2e(4(e){8(!X){X=K;6 a=$.j.C;$.j.C^=(e.4o?1:0)+(e.4p?2:0);8($.j.C!=a){I.2r("2s 2t: ",$.j.C)}}});$(G).2f(4(e){8(X){X=u}});9.V.E({1b:4(a,b){8($.j.C==0){8((a!=="1u")){6 c=9(7);I.1c("2u \'",a,"\' 1d ",c," 1e ",b)}}5 f.W(7,O)},2n:4(a,b,c){8($.j.C>0){6 d=9(7);I.1c("4q \'",a,"\' 1d ",d," 1e ",b)}5 2m.W(7,O)},2p:4(a,b,c){8($.j.C>0){6 d=9(7);I.1c("4r 4s \'",a,"\' 1d ",d," 1e ",b)}5 2o.W(7,O)}});9.1x.1b=4(a,b){8($.j.C>1){8((a!=="1u")){6 c=9(7);I.1c("2u \'",a,"\' 1d ",c," 1e ",b)}}5 2q.W(7,O)}})()}9(G).4t(4(){$.29()});4 20(a,b){8($.j.1w){a()}F{4u{a()}4v(D){6 c=$("#2v",G.U);8(c.H==0){c=$("<R 14=\'2v\' 1f=\'1i: 1H;\'/>");$(G.U).Y(c)}6 d=D.4w+" - "+D.25+(D.2w?" [4x "+D.2w+"] ":"")+(D.1F?"A <a 1M=\'"+D.1F+"\'>"+D.1F+"</a>":"")+"<4y/>";8(D.2x){d+="<R 15=\'4z\' 4A=\\"$(\'.2y\', 7).1h(\'1i\',\'4B\');\\">- 4C 4D 4E -<R 15=\'2y\'><2z>"+D.2x+"</2z></R></R>"}8($.4F(b)){d+=b(D)}F 8(b){d+=b}c.Y($("<R 15=\'4G\'>").2l(d))}}};',62,291,'||||function|return|var|this|if|jQuery||||||||||browser|case||||||elementData||||false||||null|replace|in|split|debugLevel|ex|extend|else|document|length|console|for|true|each|parseInt|push|arguments|el|sel|div|typeof|indexOf|body|fn|apply|key|append|join|Math|floor|window|the|id|class|delayed|startsWith|endsWith|contains|queryParams|trigger|info|on|with|style|text|css|display|Array|_widgetCSSKeys|new|width|height|windowName|center|no|break|undefined|parent|remove|data|debugging|event|removeClass|mouse|down|exec|switch|default|qParms|fileName|type|none|dupe|object|while|attr|href|location|delete|param|setTimeout|callee|eval|call|_callback|wrap|callback|readData|lt|gt|trapJavascriptErrors|instanceof|missing|value|or|message|to|toLowerCase|className|initElementData|debug|_jQ|addClass|mouseover|keydown|keyup|widgetState|widgetData|siblings|parents|serFn|html|oBind|bind|oLoad|load|oETrig|warn|Log|level|TRIGGER|jsExceptions|lineNumber|stack|stackMessage|pre|head|constructor|loadImageProps|req|props|javascript|getScript|loadWidgetCSS|shift|gkey|rkeys|Date|getTime|siteCode|link|rel|stylesheet|popup|popupWindow|640|480|titlebar|yes|toolbar|resizable|left|top|open|focus|fillArr|unionArr|concat|intersectArr|diffArr|inArr|waitFor|_obj|_retries|250|retries|obj|Lt|Gt|evalData|evInner|Error|parsing|SyntaxError|EvalError|Possible|causes|include|mismatched|quote|comma|after|last|before|closing|brace|While|evaluating|an|attempt|assign|tagName|Initializing|element|jQ|delayedFadeOut|fadeOut|delayedFadeIn|fadeIn|delayedFadeTo|fadeTo|once|add|unbind|assignMouseEvents|hover|mousedown|mouseup|isEmpty|firstChild|string|keyToggle|String|prototype|properCase|toUpperCase|trimLeft|trimRight|trim|padLeft|padRight|unshift|substr|expr|inx|notin|notinx|search|serializeQueryParams|webkit|applewebkit|test|navigator|userAgent|jsdebug|Number|jsdebuglevel|isNaN|ctrlKey|shiftKey|BIND|AJAX|LOAD|ready|try|catch|name|line|br|stackTrace|onclick|block|Toggle|Stack|Trace|isFunction|jsExceptionMsg'.split('|'),0,{}));
//BASEWIDGET.JS (BaseWidget.js)
if (typeof BaseWidget == "undefined") {

	/**
	 * @class The root class for all widget classes.  All widget classes should extend this class to gain
	 *        the <tt>null</tt> constructor which forces the class to be a single instance.  Additionally,
	 *        each widget class will inherit a <tt>create()</tt> method which will initialize the
	 *        widget, store state data, and assign the client-side controller class.  Finally, each widget
	 *        class will inherit the <tt>getWidgetClassName()</tt> method which will provide the mechanism
	 *        to identify a class by a simple name string.
	 *        <p/>
	 *        Widgets should override the <tt>create()</tt> and <tt>getWidgetClassName()</tt> method to
	 *        be their own.  At the very least, a widget should override <tt>getWidgetClassName()</tt> so
	 *        it can be identified.
	 *        <p/>
	 *        Extending the <tt>create()</tt> method is simple.  Your class should call the base (super) class
	 *        first, and should return the object that is returned by the base class' <tt>create()</tt> method.
	 *        <pre>
	 *   create: function(selector, state) {
	 *      var jQ = this.base(selector, state);
	 *      var s = jQ.widgetState();
	 *
	 *      // Do some initialization
	 *      s.entityCount = jQ.getElementData().entityCount;
	 *      ...
	 *
	 *      // Return the object we were passed from the
	 *      // create method of our ancestor class
	 *      return jQ;
	 *   }
	 *        </pre>
	 *
	 */
	var BaseWidget = Base.extend({

		/*
		 * All widgets extend from BaseWidget, so they inherit the "null" constructor.
		 * This makes them into a "Single Instance" object which cannot be instantiated,
		 * however, it can be extended.
		 */
		constructor: null,

		/**
		 * Create an instance of the widget in the DOM, for the specified <tt>selector</tt>
		 * which designates the element which is to become a widget.  The <tt>state</tt> is
		 * data which is used to initialize and control a widget. This method also assigns
		 * the widget's client-side controller class.  This method will be invoked automatically
		 * by the widget engine once for every instance of the widget in the page, assuming that
		 * the widget has an appropriate "widgetState" DOM element which includes at least
		 * the "widgetClass" property.  Most widgets will not want to override this method,
		 * but rather instead override the "create" method to perform any initialization
		 * logic the widget depends on.
		 *
		 * @param selector {String} The widget's jQuery selector
		 * @param state {Object} An object which contains initialization and control data.
		 * @return {jQuery} A jQuery object which represents the widget
		 */
		construct: function(selector, state) {
			return $(selector).widgetState(state).widgetClass(this);
		},

		/**
		 * This method will be invoked once automatically for each instance of the widget
		 * which was rendered in the page.  It is intended to be overridden in each widgets
		 * sub class and handle setting up any initialization logic that needs to occur before
		 * the user starts interacting with the widget, such as setting up event binds for
		 * handling mouse click events.  Before this method is invoked the "construct"
		 * method will always be invoked first, so the state and class of the widget will already
		 * have been processed.  Note that in order for this method to be invoked automatically
		 * by the widget engine the widget most include a "widgetState" DOM element within
		 * its body which specifies at least the "widgetClass" property.
		 *
		 * @param selector {String} The widget's jQuery selector
		 * @param state {Object} An object which contains initialization and control data.
		 * @return {jQuery} A jQuery object which represents the widget
		 */
		create: function(selector, state) {
			// TODO: This code used to set widgetState and widgetClass again should not be
			// necessary as long as the "contruct" method was called previously.  However,
			// there are still some widgets that don't extend BaseWidget properly, so this
			// code has to remain until those get cleaned up.  When ready, it should instead be:
			// return $(selector);
			return $(selector).widgetState(state).widgetClass(this);
		},

		/** @private */
		widgetClassName: "BaseWidget",

		/**
		 * Returns the widget's controller class name as a String.  If the widget engine is
		 * handling automatically initializing this widget by specifying a "widgetClass"
		 * property within the "widgetState" DOM element, then this method will be handled
		 * automatically.  Otherwise, sub-widget classes must override this method to return
		 * the correct class name.
		 *
		 * @return {String} The class name of this widget, which should match the name of
		 *                  a variable in window scope which represents the actual widget class instance.
		 */
		getWidgetClassName: function() {
			return this.widgetClassName;
		}
	});
}
//JQUERY.WIDGET.INCLUDE.JS (jquery.widget.include.js)
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$("1n",r).1M($("<16 X=\'17/1N\'>p.R { 1o: 1p; } #1q { 17-1O: 18; S-18: T; S-1P: T; } 1r.1Q { 1s: 1R 1t 19; S-1S: T; 1T: 1U; }</16>"));4 2r(){3 w=L.2s("","2t","2u=2v,2w=2x,2y=1V,2z=1V");$("1n",w.r).1M($("<16 X=\'17/1N\'>"+"u { 1u: 2A \'1W 2B\',1W,2C; } "+"p.R { 1o: 1p; } "+"#1q { 17-1O: 18; S-18: T; S-1P: T; } "+"1r.1X { 1Y: 19; 1Z: 20; 1u-21: 2D; } "+".1X .2E { 2F: 2G; 1u-21: 2H; 1Y: 20; 1s: 2I 1t 19; 1Z: 2J; 1o: 1p; } "+"1r.1Q { 1s: 1R 1t 19; S-1S: T; 1T: 1U; }</16>"));$("u",w.r).1a($("#1q").1a());w["$"]=2;w.2K()};2.H({v:"R",z:"1b",22:"2L",1c:"1d",1v:4(a){a[2.z]={};a[2.z][2.22]="#"+a.M;a[2.z][2.1c]=8;9 a[2.z]},Y:[],2M:4(a){a=a?a.Z("|"):[];$.Y=($.Y.I==0?a:$.Y.2N(a))},2O:4(b,c,d,e){6($("1a").10("1w")=="1e"){A.23("#2P# ",N)}3 a=[c];E(3 x=0;x<b.I;x++){a.1x(b[x])}3 f=(e?e.Z("."):[]);6(f.I>0){f.2Q();2R{f=L[f.24(".")];6(f==11||f==8){f=L}}2S(2T){f=L}}y{f=L}d.12(f,a)},25:4(l){3 m=[],13=[];6((F A!="11")&&$.U.1f){A.1y(">> 26 2U")}2.2V(l,"R",4 2W(c,d){3 e=c.q();6((F A!="11")&&$.U.1f&&$.U.2X>1){A.1w("26 q: ",e)}3 f=d.1z,O=d.O;V d.1z;V d.O;3 g=d.1d;3 h=L[g];3 i=d.27||"2Y";V d.1d;V d.27;6(h){h.2Z=g;3 j=e?(e[0].M?"#"+e[0].M:e):8;6(j){6(d.28){30.31(h,j);V d.28}3 k=4(){3 a="<b>"+h.32()+"</b> 33 "+j+"<34/><29>";E(3 b G d){a+="<2a>"+b+": "+d[b]+"</2a>"}9 a+"</29>"};6(h["2b"]){2c(4 2d(){h.2b(j,d)},k)}6(h[i]){2c(4 2d(){h[i](j,d)},k)}}y{1A 1B 1C("35 36 37 38 1D 39 3a q B!");}}6(f){E(3 b G f){m.1x(f[b])}}6(O){E(3 b G O){13.1x(O[b])}}});$(r).2e(4(){6((F A!="11")&&$.U.1f){A.1y(">> 2f 3b 1z...")}E(3 b G m){3 c=m[b];3 d=3c("(4(){ 3 W = "+c.W+"; 9 W;})()");$(c.1E).1g(c.X,d)}6((F A!="11")&&$.U.1f&&13.I){A.1y(">> 2f 3d O")}E(3 b G 13){3 e=13[b];3 d=4(){3 a=N.3e;$(a.2g).1F(a.2h,(a.1G?a.1G:N))};d.2g=e.1F;d.2h=e.X;d.1G=e.t;$(e.1E).1g(e.X,d)}})}});2.H(2.3f[\':\'],{q:"(\' \'+a.3g+\' \').2i(\' q-B \')"});2.1H=4(o){3 a=o.C;o.C=4(){6(a){a.12(7,N)}2.3h(2.1H,"1h")};2([2.1H]).3i("1h",4(){2.1h(o)})};2.14=4(o){3 a=2.14.W,t=2.14.t,D=a.I;a[D]={J:o.J,K:o.K,C:o.C,1I:3j};t[D]={J:[],K:[],C:[]};o.J=4(){t[D].J=N};o.K=4(){t[D].K=N};o.C=4(){t[D].C=N;a[D].1I=1e;6(D==0||!a[D-1]){E(3 i=D;i<a.I&&a[i].1I;i++){6(a[i].J){a[i].J.12(2,t[i].J)}6(a[i].K){a[i].K.12(2,t[i].K)}6(a[i].C){a[i].C.12(2,t[i].C)}a[i]=8;t[i]=8}}};9 2.1h(o)};2.14.W=[];2.14.t=[];2.W.H({q:4(){6(2(7).2j(".q-B")){9 2(7)}9 2(7.1i(".q-B")[0])},2k:4(){9(2(7).q().I!=0)},3k:4(){9 2(7).q().10("M")},P:4(){9 2(7).q()[0]},15:4(a){9 2(a,2(7).q())},3l:4(a){9 2(7).15(a)[0]},3m:4(a){6(a!=8){9 2(2(7).q().1i(a+".q-B")[0])}y{9 2(2(7).q().1i(".q-B")[0])}},3n:4(a){6(a!=8){9 2(2(7).15(a+".q-B")[0])}y{9 2(2(7).15(".q-B")[0])}},R:4(a,b){6(a!=8&&(F a=="2l")&&b==8){3 s=2(7[0]).P()[2.v];9(s!=8?s[a]:8)}y 6(a==8&&b==8){3 e=2(7[0]).P();3 s=e[2.v];6(s==8){s={};e[2.v]=s}9 e[2.v]}y{9 7.Q(4(){3 e=2(7).P();6(!e[2.v]){e[2.v]={}}6(F a!=\'2m\'){e[2.v][a]=b}y{e[2.v]=2.H(e[2.v],a)}})}},1b:4(a,b){6(a!=8&&(F a=="2l")&&b==8){3 c=2(7[0]).P()[2.z];9(c!=8?c[a]:8)}y 6(a==8&&b==8){3 e=2(7[0]).P();3 c=e[2.z];6(c==8){c=2.1v(e);e[2.z]=c}9 c}y{9 7.Q(4(){3 e=2(7).P();3 d=e[2.z]||2.1v(e);6(F a!=\'2m\'){d[a]=b}y{e[2.z]=2.H(d,a)}})}},1d:4(a){6(a){9 7.Q(4(){2(7).1b(2.1c,a)})}9 2(7).1b(2.1c,8)},3o:4(a,b){3 w=2(7).q();6(L.3p){6($("1a").10("1w")=="1e"){A.23("--- 3q 3r \'"+a+"\' 3s 3t()")}9}3 c=w.10("M");6(c!=8){2("#"+c+1J.2n).1F(a,b)}},3u:4(b,c,d){9 2(7).Q(4(){3 a=2(7).q().10("M");6(a!=8){2("#"+a+1J.2n).1g(b,c,d)}})},1j:4(b,c,d,e,f,g){3 h=2(7);3 i=2.3v(2(b).R());6(e){3 p={};E(3 a G e.Z(",")){3 k=i[e.Z(",")[a].3w()];$.H(p,k)}i=p}V i[2.v];3 j={},1K="",1k=c;1K=c.3x().2i("2o:")==-1?"q":(4(){1k=1k.3y(5);9"2o"})();j[1K]=1k;$.H(i,j);6(F f!="4"){$.H(i,f)}y{g=f}i.3z=$.Y.24("\\n");9 h.3A(1J.3B+(d?" "+d:""),i,g)},1L:4(a,b,c,d){3 e=2(7);6(!e.2k()){1A 1B 1C("3C 1E 2j 3D a q G 2p 1D 1L()");}6(!b){1A 1B 1C("3E 2q 3F G 2p 1D 1L()");}9 e.15(b).1j(e,a,8,8,c,d)},3G:4(b,c,d){3 e=2(7).q();3 f=e[0];3 g=8;$(".3H-2q",e).Q(4(){3 a=$(7);a.1i(".q-B").Q(4(){6(7==f){g=a}})});6(g){9 g.1j(e,b,8,8,c,d)}9 e.1j(e,b,".q-B:3I > *",8,c,d)}});2(r).2e(4(){$.25();6($.U.3J){r.u.1l={};$("u",r).1g("3K",4(a){$(".3L",a.3M).Q(4(){6(r.u.1m){3N(r.u.1m)}r.u.1l[7.M]=1e;r.u.1m=3O(4(){r.u.1m=8;E(3 e G r.u.1l){6($("#"+e).I==0){3 n=e.Z("3P")[1];$("#3Q"+n,"1n").3R()}}r.u.1l={}},3S)})})}});',62,241,'||jQuery|var|function||if|this|null|return|||||||||||||||||widget|document||data|body|WIDGET_STATE_KEY|||else|WIDGET_DATA_KEY|console|root|complete|pos|for|typeof|in|extend|length|error|success|window|id|arguments|bubbles|widgetElement|each|widgetState|margin|10px|browser|delete|fn|type|_ajaxedWidgets|split|attr|undefined|apply|allBubbles|ajaxSync|widgetChild|style|text|left|red|html|widgetData|WIDGET_CLASS_KEY|widgetClass|true|debugging|bind|ajax|parents|widgetAjax|value|cleanupIds|cleanTimer|head|display|none|jsExceptions|div|border|solid|font|_initialWidgetData|debug|push|info|bindings|throw|new|Error|to|element|trigger|eData|ajaxQueue|done|jQueryFry|key|widgetTargetLoad|append|css|align|right|jsExceptionMsg|2px|bottom|padding|5px|yes|Courier|stackTrace|background|color|white|weight|WIDGET_SELECTOR_KEY|warn|join|initWidgets|Initializing|widgetInitMethod|persistentStorage|ul|li|construct|trapJavascriptErrors|initWidget|ready|Processing|eTrigger|eType|indexOf|is|isWidget|string|object|triggerElementSuffix|path|call|target|showJavascriptErrorWindow|open|exceptions|width|640|height|480|resizable|scrollbars|10pt|New|fixed|bold|stackMessage|overflow|auto|normal|1px|black|focus|widgetSelector|storeWidgets|concat|fnProxy|PROXY|pop|try|catch|ex|widgets|readData|initFromState|debugLevel|create|widgetClassName|PersistentStorage|register|getWidgetClassName|Id|br|Widget|cannot|constructed|due|no|known|deferred|eval|Event|callee|expr|className|dequeue|queue|false|widgetId|widgetChildElement|outerWidget|innerWidget|widgetTrigger|PERSISTENT_STORAGE_RESTORING|Skipped|event|during|restoreState|widgetBind|dupe|trim|toLowerCase|substr|clientWidgets|load|widgetExecPath|Specified|not|No|specified|widgetLoad|ahah|first|webkit|DOMNodeRemoved|webkitCleanup|relatedNode|clearTimeout|setTimeout|_|style_|remove|1000'.split('|'),0,{}));


// ColorBox v1.3.16 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(a,b,c){function ba(b){if(!T){O=b,Z(a.extend(J,a.data(O,e))),x=a(O),P=0,J.rel!=="nofollow"&&(x=a("."+V).filter(function(){var b=a.data(this,e).rel||this.rel;return b===J.rel}),P=x.index(O),P===-1&&(x=x.add(O),P=x.length-1));if(!R){R=S=!0,q.show();if(J.returnFocus)try{O.blur(),a(O).one(k,function(){try{this.focus()}catch(a){}})}catch(c){}p.css({opacity:+J.opacity,cursor:J.overlayClose?"pointer":"auto"}).show(),J.w=X(J.initialWidth,"x"),J.h=X(J.initialHeight,"y"),U.position(0),n&&y.bind("resize."+o+" scroll."+o,function(){p.css({width:y.width(),height:y.height(),top:y.scrollTop(),left:y.scrollLeft()})}).trigger("resize."+o),$(g,J.onOpen),I.add(C).hide(),H.html(J.close).show()}U.load(!0)}}function _(){var a,b=f+"Slideshow_",c="click."+f,d,e,g;J.slideshow&&x[1]&&(d=function(){E.text(J.slideshowStop).unbind(c).bind(i,function(){if(P<x.length-1||J.loop)a=setTimeout(U.next,J.slideshowSpeed)}).bind(h,function(){clearTimeout(a)}).one(c+" "+j,e),q.removeClass(b+"off").addClass(b+"on"),a=setTimeout(U.next,J.slideshowSpeed)},e=function(){clearTimeout(a),E.text(J.slideshowStart).unbind([i,h,j,c].join(" ")).one(c,d),q.removeClass(b+"on").addClass(b+"off")},J.slideshowAuto?d():e())}function $(b,c){c&&c.call(O),a.event.trigger(b)}function Z(b){for(var c in b)a.isFunction(b[c])&&c.substring(0,2)!=="on"&&(b[c]=b[c].call(O));b.rel=b.rel||O.rel||"nofollow",b.href=a.trim(b.href||a(O).attr("href")),b.title=b.title||O.title}function Y(a){return J.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(a)}function X(a,b){b=b==="x"?y.width():y.height();return typeof a=="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function W(c,d){var e=b.createElement("div");c&&(e.id=f+c),e.style.cssText=d||!1;return a(e)}var d={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:!1,returnFocus:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0},e="colorbox",f="cbox",g=f+"_open",h=f+"_load",i=f+"_complete",j=f+"_cleanup",k=f+"_closed",l=f+"_purge",m=a.browser.msie&&!a.support.opacity,n=m&&a.browser.version<7,o=f+"_IE6",p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J={},K,L,M,N,O,P,Q,R,S,T=!1,U,V=f+"Element";U=a.fn[e]=a[e]=function(b,c){var f=this,g;if(!f[0]&&f.selector)return f;b=b||{},c&&(b.onComplete=c);if(!f[0]||f.selector===undefined)f=a("<a/>"),b.open=!0;f.each(function(){a.data(this,e,a.extend({},a.data(this,e)||d,b)),a(this).addClass(V)}),g=b.open,a.isFunction(g)&&(g=g.call(f)),g&&ba(f[0]);return f},U.init=function(){y=a(c),q=W().attr({id:e,"class":m?f+(n?"IE6":"IE"):""}),p=W("Overlay",n?"position:absolute":"").hide(),r=W("Wrapper"),s=W("Content").append(z=W("LoadedContent","width:0; height:0; overflow:hidden"),B=W("LoadingOverlay").add(W("LoadingGraphic")),C=W("Title"),D=W("Current"),F=W("Next"),G=W("Previous"),E=W("Slideshow").bind(g,_),H=W("Close")),r.append(W().append(W("TopLeft"),t=W("TopCenter"),W("TopRight")),W(!1,"clear:left").append(u=W("MiddleLeft"),s,v=W("MiddleRight")),W(!1,"clear:left").append(W("BottomLeft"),w=W("BottomCenter"),W("BottomRight"))).children().children().css({"float":"left"}),A=W(!1,"position:absolute; width:9999px; visibility:hidden; display:none"),a("body").prepend(p,q.append(r,A)),s.children().hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")}).addClass("hover"),K=t.height()+w.height()+s.outerHeight(!0)-s.height(),L=u.width()+v.width()+s.outerWidth(!0)-s.width(),M=z.outerHeight(!0),N=z.outerWidth(!0),q.css({"padding-bottom":K,"padding-right":L}).hide(),F.click(function(){U.next()}),G.click(function(){U.prev()}),H.click(function(){U.close()}),I=F.add(G).add(D).add(E),s.children().removeClass("hover"),a("."+V).live("click",function(a){a.button!==0&&typeof a.button!="undefined"||a.ctrlKey||a.shiftKey||a.altKey||(a.preventDefault(),ba(this))}),p.click(function(){J.overlayClose&&U.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;R&&J.escKey&&b===27&&(a.preventDefault(),U.close()),R&&J.arrowKey&&x[1]&&(b===37?(a.preventDefault(),G.click()):b===39&&(a.preventDefault(),F.click()))})},U.remove=function(){q.add(p).remove(),a("."+V).die("click").removeData(e).removeClass(V)},U.position=function(a,c){function g(a){t[0].style.width=w[0].style.width=s[0].style.width=a.style.width,B[0].style.height=B[1].style.height=s[0].style.height=u[0].style.height=v[0].style.height=a.style.height}var d,e=Math.max(b.documentElement.clientHeight-J.h-M-K,0)/2+y.scrollTop(),f=Math.max(y.width()-J.w-N-L,0)/2+y.scrollLeft();d=q.width()===J.w+N&&q.height()===J.h+M?0:a,r[0].style.width=r[0].style.height="9999px",q.dequeue().animate({width:J.w+N,height:J.h+M,top:e,left:f},{duration:d,complete:function(){g(this),S=!1,r[0].style.width=J.w+N+L+"px",r[0].style.height=J.h+M+K+"px",c&&c()},step:function(){g(this)}})},U.resize=function(a){if(R){a=a||{},a.width&&(J.w=X(a.width,"x")-N-L),a.innerWidth&&(J.w=X(a.innerWidth,"x")),z.css({width:J.w}),a.height&&(J.h=X(a.height,"y")-M-K),a.innerHeight&&(J.h=X(a.innerHeight,"y"));if(!a.innerHeight&&!a.height){var b=z.wrapInner("<div style='overflow:auto'></div>").children();J.h=b.height(),b.replaceWith(b.children())}z.css({height:J.h}),U.position(J.transition==="none"?0:J.speed)}},U.prep=function(b){function h(b){U.position(b,function(){var b,d,g,h,j=x.length,k,n;!R||(n=function(){B.hide(),$(i,J.onComplete)},m&&Q&&z.fadeIn(100),C.html(J.title).add(z).show(),j>1?(typeof J.current=="string"&&D.html(J.current.replace(/\{current\}/,P+1).replace(/\{total\}/,j)).show(),F[J.loop||P<j-1?"show":"hide"]().html(J.next),G[J.loop||P?"show":"hide"]().html(J.previous),b=P?x[P-1]:x[j-1],g=P<j-1?x[P+1]:x[0],J.slideshow&&E.show(),J.preloading&&(h=a.data(g,e).href||g.href,d=a.data(b,e).href||b.href,h=a.isFunction(h)?h.call(g):h,d=a.isFunction(d)?d.call(b):d,Y(h)&&(a("<img/>")[0].src=h),Y(d)&&(a("<img/>")[0].src=d))):I.hide(),J.iframe?(k=a("<iframe/>").addClass(f+"Iframe")[0],J.fastIframe?n():a(k).load(n),k.name=f+ +(new Date),k.src=J.href,J.scrolling||(k.scrolling="no"),m&&(k.frameBorder=0,k.allowTransparency="true"),a(k).appendTo(z).one(l,function(){k.src="//about:blank"})):n(),J.transition==="fade"?q.fadeTo(c,1,function(){q[0].style.filter=""}):q[0].style.filter="",y.bind("resize."+f,function(){U.position(0)}))})}function g(){J.h=J.h||z.height(),J.h=J.mh&&J.mh<J.h?J.mh:J.h;return J.h}function d(){J.w=J.w||z.width(),J.w=J.mw&&J.mw<J.w?J.mw:J.w;return J.w}if(!!R){var c=J.transition==="none"?0:J.speed;y.unbind("resize."+f),z.remove(),z=W("LoadedContent").html(b),z.hide().appendTo(A.show()).css({width:d(),overflow:J.scrolling?"auto":"hidden"}).css({height:g()}).prependTo(s),A.hide(),a(Q).css({"float":"none"}),n&&a("select").not(q.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(j,function(){this.style.visibility="inherit"}),J.transition==="fade"?q.fadeTo(c,0,function(){h(0)}):h(c)}},U.load=function(b){var c,d,g=U.prep;S=!0,Q=!1,O=x[P],b||Z(a.extend(J,a.data(O,e))),$(l),$(h,J.onLoad),J.h=J.height?X(J.height,"y")-M-K:J.innerHeight&&X(J.innerHeight,"y"),J.w=J.width?X(J.width,"x")-N-L:J.innerWidth&&X(J.innerWidth,"x"),J.mw=J.w,J.mh=J.h,J.maxWidth&&(J.mw=X(J.maxWidth,"x")-N-L,J.mw=J.w&&J.w<J.mw?J.w:J.mw),J.maxHeight&&(J.mh=X(J.maxHeight,"y")-M-K,J.mh=J.h&&J.h<J.mh?J.h:J.mh),c=J.href,B.show(),J.inline?(W().hide().insertBefore(a(c)[0]).one(l,function(){a(this).replaceWith(z.children())}),g(a(c))):J.iframe?g(" "):J.html?g(J.html):Y(c)?(a(Q=new Image).addClass(f+"Photo").error(function(){J.title=!1,g(W("Error").text("This image could not be loaded"))}).load(function(){var a;Q.onload=null,J.scalePhotos&&(d=function(){Q.height-=Q.height*a,Q.width-=Q.width*a},J.mw&&Q.width>J.mw&&(a=(Q.width-J.mw)/Q.width,d()),J.mh&&Q.height>J.mh&&(a=(Q.height-J.mh)/Q.height,d())),J.h&&(Q.style.marginTop=Math.max(J.h-Q.height,0)/2+"px"),x[1]&&(P<x.length-1||J.loop)&&(Q.style.cursor="pointer",Q.onclick=function(){U.next()}),m&&(Q.style.msInterpolationMode="bicubic"),setTimeout(function(){g(Q)},1)}),setTimeout(function(){Q.src=c},1)):c&&A.load(c,function(b,c,d){g(c==="error"?W("Error").text("Request unsuccessful: "+d.statusText):a(this).contents())})},U.next=function(){!S&&x[1]&&(P<x.length-1||J.loop)&&(P=P<x.length-1?P+1:0,U.load())},U.prev=function(){!S&&x[1]&&(P||J.loop)&&(P=P?P-1:x.length-1,U.load())},U.close=function(){R&&!T&&(T=!0,R=!1,$(j,J.onCleanup),y.unbind("."+f+" ."+o),p.fadeTo(200,0),q.stop().fadeTo(300,0,function(){q.add(p).css({opacity:1,cursor:"auto"}).hide(),$(l),z.remove(),setTimeout(function(){T=!1,$(k,J.onClosed)},1)}))},U.element=function(){return a(O)},U.settings=d,a(U.init)})(jQuery,document,this);


/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);


/*************************
	Required for Popup to Layer conversion
*************************/

/*
The default action for writing the response to the active popup layer.
Use this global function so the popup plugin can be changed easily
 */
var writeDataIntoLayer = site.updateOverlay = function(data) {
	//used for ColorBox
	$("#cboxLoadedContent").html(data);
	$.colorbox.resize();
};

jQuery.fn.closeLayer = function(){
	/* use closeLayer() for all close layer events so that the interface with the plugin is only in one spot */
	$.colorbox.close();
};

jQuery.fn.softSlideDown = function(callback){
	this.css("opacity", 0).slideDown(300).fadeTo(150, 1, function() {
		if (callback && typeof callback == "function")
			callback();
	});
	return this;
};

jQuery.fn.softSlideUp = function(callback){
	this.fadeTo(150, 0).slideUp(300, function() {
		if (callback && typeof callback == "function")
			callback();
	}).css("opacity", 1);
	return this;
};

jQuery.fn.hilight = function(callback){
	var me = this;
	if (me.hasClass("animating")) {
		var t = setTimeout(function(){
			me.hilight(callback);
		},200);
	} else {
		var hiliteColor = "#BDE8FF";
		var defaultStart = "#FFFFFF";
		var currentColor = jQuery(this).css('background-color');
		if (currentColor && currentColor != 'transparent' && currentColor.indexOf("rgba(") == -1)
			defaultStart = currentColor;

		me.addClass("animating").css("background-color",defaultStart).animate({ backgroundColor:hiliteColor }, 300, function() {
			me.animate({ backgroundColor:defaultStart }, 1000, function() {
				me.css("background-color",currentColor).removeClass("animating");
				if (callback && typeof callback == "function")
					callback();
			});
		});
		return this;
	}
};

/* site.colorBoxHelper - Used for calling colorBox. */
site.colorBoxHelper = function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	var path = $(this).attr("href");
	var data = "";
	if (!path && this.form) {
		path = this.form.action;
		data = $(this.form).serialize();
	}

	// we need to cache-bust GET requests for IE
	var paramSep = (path.indexOf("?") > 0) ? "&" : "?";
	path = path + paramSep + data;

	$.colorbox({
		scrolling:false,
		href:path,
		cache:false,
		data:data,
		width:false,
		opacity:0.8,
		onComplete:function(data){
			site.updateOverlay(data);
		}
	});

	return false;
};


/* Create cookie */
function createCookie(name, value, domain, secs, path) {
	var expires = "";
	if (secs) {
		var date = new Date();
		date.setTime(date.getTime()+(secs*1000));
		expires = "; expires="+date.toGMTString();
	}

	document.cookie = name+"="+value+expires+"; path=" + ((path) ? path : "/") + ((domain) ? "; domain=" + domain : "");
}


/* Dynamic error management */
site.errorAppend = function(area,msg) {
	$(area)
		.html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,"<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"))
		.show()
		.addClass('error');
};


/*************************
	Validation Framework
*************************/

var $originalPassword;
var inputFields = function($){

	return {
		validateDoubleEntry : function( firstField, secondField ){
			var isValid = false;

			if ((firstField.val() != firstField.attr("name")) && ( firstField.val() == secondField ) ) {
				isValid = true;
			}

			return isValid;
		},
		originalFieldChanged : function(  firstFieldVal, secondFieldVal, validationSelector ) {
			if( ( secondFieldVal != "")  )
			{
				if( secondFieldVal != firstFieldVal) {
					validationSelector.removeClass("valid").addClass("invalid");
				}
				else {
					validationSelector.removeClass("invalid").addClass("valid");
				}
			}
		}
	};

}($);



site.getLabelText = function(labelObj) {
	var labelText = labelObj.text();
	if (labelObj.html().indexOf("optionalKey") > 0) {
		labelText = labelText.replace(labelObj.find(".optionalKey").text(), "");
	}
	return labelText;
};


// Overlabels without validation.

site.overLabelLite = function($) {

	return {
		showLabel : function(field) {
			var parent = field.parents(".overlabel").eq(0);
			var myLabel = $('label[for=' + field.attr('id') + ']', parent);
			myLabel.fadeTo(150, 1);
		},

		hideLabel : function(field) {
			var parent = field.parents(".overlabel").eq(0);
			var myLabel = $('label[for=' + field.attr('id') + ']', parent);
			myLabel.fadeTo(300, 0);
		},


		init : function(idx, field) {
			field = $(field);
			if (field.hasClass("overLabeled") || field[0].fieldType === 'select') { return; }
			field.addClass("overLabeled");
			var parent = field.parents(".overlabel").eq(0);
			var myLabel = $('label[for=' + field.attr('id') + ']', parent);

			if ($.trim(field.val()) === '') {
				site.overLabelLite.showLabel(field);
			} else {
				site.overLabelLite.hideLabel(field);
			}


			myLabel.click(function() {
				field.focus();
				return false;
			});

			field.bind("focus.overLabels",
						function() {
							site.overLabelLite.hideLabel(field);
						}).bind("blur.overLabels", function() {
							site.overLabelLite.showLabel(field);
							if ($.trim(field.val()) !== '') {
								myLabel.css('visibility', 'hidden');
							} else {
								myLabel.css('visibility', 'visible');
							}
						});
		}
	};
}($);



var overLabels = site.overLabels = function($) {

	var getLabelText = function(labelObj) {
		var labelText = labelObj.text();
		if (labelObj.html().indexOf("optionalKey") > 0) {
			labelText = labelText.replace(labelObj.find(".optionalKey").text(), "");
		}
		return labelText;
	};

	return {
		checkField : function(field) {
			field.focus().blur();
		},

		resetField : function(field, resetLabel) {
			var _scope = field.parents(".formFieldContainer");
			var myLabel = _scope.find('label');
			var myVerify = _scope.find(".verify");
			myVerify.empty();
			if (resetLabel && _scope.find('select').length == 0) {
				/* this is not a select */
				field.val("");
				myLabel.css({visibility: 'visible', display: 'block'});
			}
			_scope.removeClass("valid").removeClass("invalid");
		},


		init : function(_scope) {

			if (_scope.hasClass("overLabeled")) { return; }
			_scope.addClass("overLabeled");
			var myInput = [];
			var fieldType = "input"; /* should be input, select or textarea */
			/* checks for inputs that aren't buttons, then selects, then textareas */
			if (myInput.length == 0) { myInput = _scope.find('input:not([class=formButton],[type=hidden])'); }
			if (myInput.length == 0) { myInput = _scope.find('select'); fieldType = "select"; }
			if (myInput.length == 0) { myInput = _scope.find('textarea'); fieldType = "textarea"; }
			var myLabel = _scope.find('label');

			if ($.trim(myInput.val()) == '' && (fieldType != "select")) {
				myLabel.css('visibility', 'visible');
			}

			myLabel.click(function() {
				myLabel.css('visibility', 'hidden');
				//myInput.focus();
				//return false;
			});

			myInput.attr("autocomplete","off");
			if (fieldType != "select") {

				myInput.bind("focus.overLabels", function() {
					myLabel.fadeTo(300, 0);
					myLabel.css({'display':'none','visibility':'hidden', 'opacity':'0'});

				}).bind("blur.overLabels", function() {
					myLabel.fadeTo(150, 1);
					if ($.trim(myInput.val()) != '') {
						myLabel.css({'display':'none','visibility':'hidden', 'opacity':'0'});
					} else {
						myLabel.css('visibility', 'visible');
					}
				});
			}

			/* setup the inline validation */
			if (!_scope.hasClass("dontVerify")) {
				var myVerify = _scope.find(".verify");
				if (myVerify.length === 0) {
					myVerify = $('<span class="verify"></span>');
					myInput.parent().append(myVerify);
				}

				myInput.bind("focus.overLabels", function(e){
					_scope.removeClass("invalid").removeClass("valid");
					myVerify.removeAttr('role');
					myVerify.removeAttr('aria-invalid');
					if ($.trim(myVerify.html()).length === 0) { myVerify.html($.trim(getLabelText(myLabel))); }
				});

				myInput.bind("blur.overLabels", function(e) {
					if (myInput.length = 2) {
						for (var i = 0; i <= myInput.length; i++) {
							var obj = myInput[i];
							if (obj != undefined && obj.disabled) {
								myInput.splice(i, 1);
							}
							/* test fix - ec */
							if ($.trim(myVerify.html()).length === 0) { myVerify.html($.trim(getLabelText(myLabel))); }
						}
					}
					if ($.trim(myInput.val()) == "") {

						if (myLabel.hasClass("optional")){
							myVerify.removeAttr('role');
							myVerify.removeAttr('aria-invalid');
							myVerify.empty();
						} else {
							myVerify.attr('role', 'alert');
							myVerify.attr('aria-invalid', 'true');
							_scope.addClass("invalid");
						}
					} else if (validate.fieldIsValid(this)) {
						myVerify.removeAttr('role');
						myVerify.removeAttr('aria-invalid');
						_scope.addClass("valid");
					}
					else {
						myVerify.attr('role', 'alert');
						myVerify.attr('aria-invalid', 'true');
						_scope.addClass("invalid");
					}
				});

				/* handle a prefilled form */
				if ($.trim(myInput.val()) != '') {
					myVerify.html(site.getLabelText(myLabel));
					if (validate.fieldIsValid(myInput)) {
						_scope.addClass("valid");
					} else {
						_scope.addClass("invalid");
					}
				}
			}

			if (_scope.hasClass("formFieldError")) {
				/* used when a JSP is showing a server side error */
				myInput.clearOverLabel();
			}
		}
	};
}($);

jQuery.fn.checkOverLabel = function(callback){
	/* reruns inline validation, useful if modifying the value via javascript */
	site.overLabels.checkField(this);
	return this;
};

jQuery.fn.clearOverLabel = function(callback){
	/* reset the inline validation without clearing the value or resetting the label */
	site.overLabels.resetField(this);
	return this;
};

jQuery.fn.resetOverLabel = function(callback){
	/* reset the inline validation, clears the input value and places the label back in the field */
	site.overLabels.resetField(this, true);
	return this;
};


var validate = function($) {
	var currentCountry = "USA";
	var _isNumeric = function(testStr) {
		var isValid = true;
		var validChars = "0123456789";
		var character;
		if ( typeof(testStr) != "undefined" && testStr != null && testStr != "" ) {
			for (var i = 0; i < testStr.length && isValid; i++) {
				character = testStr.charAt(i);
				if (validChars.indexOf(character) == -1) {
					isValid = false;
				}
			}
		} else {
			isValid = false;
		}
		return isValid;
	};

	return {
		fieldIsValid : function(input) {
			var container = $(input).parents(".formFieldContainer");
			var val = $(input).val();
			var inputFormScope = $(input).parents("form");
			var inputReEntryField;
			var inputValidationSelector;
			var isValid = false;
			var classArr = (container.attr("class")).split(" ");
			var fieldType = null;

			var i;
			for (i=0; i<classArr.length; i++) {
				if (classArr[i].indexOf("type_") === 0) {
					fieldType = classArr[i].replace("type_","");
					break;
				}
			}
			switch (fieldType) {
				case "select":
					if ($.trim(val).length != "")
						isValid = true;
					break;
				case "userID":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "firstName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "lastName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "companyName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "address":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "country":
					if ($.trim(val).length > 2)
						currentCountry = $.trim(val);
						isValid = true;
					break;
				case "city":
					if ($.trim(val).length >= 3)
						isValid = true;
					break;
				case "zipCode":
					var userSelectedState = $("select#state").attr("selectedIndex");
					var $userInput = $.trim(val);
				    var numReg = /^[0-9]+$/;
					var strReg = /[A-Za-z]+/;

					/* run US zipcode validation */
					if ((currentCountry != "USA" && currentCountry != "CAN"))
					{
						isValid = true;
					}

					if (($userInput.length == 5 && $userInput.match(numReg)))
					{
						isValid = true;
					}

					else if ($userInput.length > 5) {
						if ($userInput.charAt(5) == '-') { // Make sure the sixth char is a '-'
							$userInput = $userInput.split( "-" ).join('');
							if ($userInput.length == 9 && $userInput.match(numReg) ) {
								isValid = true;
							}
						}

						if ($userInput.length == 7 ) {
							if ($userInput.charAt(3) == '-' || $userInput.charAt(3) == ' ') { // Make sure the third char is a '-' or ' '(blank)
								$userInput = $userInput.split( "-" ).join('');
								$userInput = $userInput.split( " " ).join('');
							}
							if ($userInput.length == 6) {
								var strAlpha = "";
								var strNumber = "";
								//get Alpha character
								strAlpha += $userInput.charAt(0);
								strAlpha +=	$userInput.charAt(2);
								strAlpha +=	$userInput.charAt(4);
								//get Number character
								strNumber += $userInput.charAt(1);
								strNumber += $userInput.charAt(3);
								strNumber += $userInput.charAt(5);

								 if (numReg.test(strNumber)) {
									 if (strReg.test(strAlpha)) {
										 isValid = true;
									 }
								 }
							}
						}
					}

					break;
				case "storeLocatorText":
					val = $.trim(val);
					if( val != "")
						isValid = true;
					break;
				case "phone":
					/* check for an ext (handles x111, ext111 or extension111 */
					if (val.indexOf("x")>-1) {
						val = val.split("x")[0];
					}
					var numberCount = 0;
					for (n=0; n<val.length; n++) {
						if (_isNumeric(val.charAt(n)))
							numberCount++;
						if (numberCount == 10)
							break;
					}
					if (numberCount >= 10)
						isValid = true;
					break;
				case "emailAddress":
					val = $.trim(val);
					var re = /^[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}@[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}\.[-\w]{2,4}$/;
					if (re.exec(val)) {
						isValid = true;
						inputReEntryField = inputFormScope.find("input#reEnterEmailAddress");
						inputValidationSelector = inputFormScope.find(".type_emailAddressVerify");
						inputFields.originalFieldChanged(  val, $.trim( inputReEntryField.val() ), inputValidationSelector );
					}
					break;
				case "emailAddressVerify":
					val = $.trim(val);
					var re = /^[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}@[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}\.[-\w]{2,4}$/;
					if (re.exec(val)) {

						inputReEntryField = inputFormScope.find("input.js_originalEmail");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;
				case "emailAddressNewVerify":
					val = $.trim(val);
					var re = /^[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}@[-A-Za-z0-9_]+(\.[-A-Za-z0-9_]+){0,3}\.[-\w]{2,4}$/;
					if (re.exec(val)) {

						inputReEntryField = inputFormScope.find("input.js_newEmail");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;
				case "password":
					val = $.trim( val );
					$originalPassword = $("input:not([class=formButton],[type=hidden])", $(this));
					if ((val.length >= 6) && (val.length <= 15)) {
						isValid = true;
						inputReEntryField = inputFormScope.find("input#verifyPassword");
						inputValidationSelector = inputFormScope.find(".type_passwordVerify");
						inputFields.originalFieldChanged( val, $.trim( inputReEntryField.val() ), inputValidationSelector  );
					}
					break;
				case "passwordVerify":
					val = $.trim(val);
					if ((val.length >= 6) && (val.length <= 15)) {
						inputReEntryField = inputFormScope.find("input.js_originalPassword");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;
				case "passwordNewVerify":
					val = $.trim(val);
					if ((val.length >= 6) && (val.length <= 15)) {
						inputReEntryField = inputFormScope.find("input.js_passwordNew");
						isValid = inputFields.validateDoubleEntry( inputReEntryField, val);
					}
					break;
				case "ccName":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "ccNumber":
					if ($.trim(val).length > 0)
						isValid = true;
					break;
				case "securityCode":
					if ($.trim(val).length >= 3) {
						var newVal = $.trim(val);
						var re = /^\d+/;
						if( re.exec(newVal) ) {
						  isValid = true;
						}
					}
					break;
				default :
					return true;
			}
			return isValid;

		}
	};
}($);


// search form in header
site.searchValidation = function() {
	var searchVal = this['keyword'].value;
	if ($.trim(searchVal).length === 0 || searchVal == site.searchInstructions) {
		alert(site.searchErrorText) ;
		return false;
	}
	return true;
};

site.removeParamValue = function(url, param) {
	var params = url.split('&');
	var newUrl = '';
	for (var i=0;i<params.length;i++) {
		if (params[i].indexOf(param) == -1 && params[i] != '') {
			newUrl += (params[i].indexOf('?') >=0) ? params[i] : '&' + params[i];
		}
	}
	return newUrl;
};
/* END Validation Framework */



/***
 * FROM RefinementBoxWidget
***/

// This method will be called when user changes selected refinements
function refinementChange() {
	var refineUrl = removeAllParamValue(window.location.search, "refinementValueIds", "allRefValueIds") + getRefineUrl();
	if(refineUrl.indexOf("?") == -1)
		refineUrl = "?" + refineUrl;
	if($.browser.queryParams["currentIndex"] != null) {
		refineUrl = removeAllParamValue(refineUrl,"currentIndex");
		refineUrl += "&currentIndex=0";
	}
	//alert(refineUrl)
	window.location.search = refineUrl;
}

// Support removing param1 and param2 and their values in the url.
// param2 is optional for backward compatibility.
function removeAllParamValue(url, param1, param2) {
    if( typeof param2 === "undefined" )
        param2 = '';
	var params = url.split('&');
	var newUrl = '';
	for(var i=0;i<params.length;i++)
		if(params[i].indexOf(param1) == -1 && (param2 == '' || params[i].indexOf(param2) == -1) && params[i] != '') {
			if(params[i].indexOf('?') >=0)
				newUrl += params[i];
			else
				newUrl += '&' + params[i];
		}
	return newUrl;

}

// Get the refinement url base on selected refinements
function getRefineUrl() {
	var refineUrl = "";
	var refinementValueIds = $("input[name='refinementValueIds']:checked", ".refinement");
	for(var i = 0; i < refinementValueIds.length; i++) {
		if ( refinementValueIds[i].value != -1 ){
			refineUrl += "&refinementValueIds=" + refinementValueIds[i].value;
		}
    }
    refinementValueIds = $("input[name='refinementValueIds']", ".refinement");
	for(i = 0; i < refinementValueIds.length; i++) {
		if ( refinementValueIds[i].value != -1 ){
			refineUrl += "&allRefValueIds=" + refinementValueIds[i].value;
		}
    }
	return refineUrl;
}

// Remove the selected refinement value with the specified id
function removeSelectedRefinementValue(selectedRefinementValueId) {
	var refineVal=	selectedRefinementValueId;
	 document.getElementById("refinementValueIds_" + selectedRefinementValueId).value = '';
	 refinementChangeMulti(refineVal);
}
// Remove Selected Refinement Part 2  - remove refinement handle multipart query string
function refinementChangeMulti(refineVal) {
    var removeRefinement = "refinementValueIds="+refineVal;
    var seoRefinement = "-RefIds=" + refineVal;
    var myRefineQuery = window.location.search;
    if (myRefineQuery.indexOf(seoRefinement)) {
        var removeSplit = myRefineQuery.split('&');
        for (i = 0; i < removeSplit.length; i++) {
            if (removeSplit[i] == removeRefinement || removeSplit[i].indexOf(seoRefinement) > -1) {
                removeSplit.splice(i, 1);
            }
        }
        var url = removeSplit.join('&');
        if (url.indexOf("removeRefinement=true") == -1) {
            if (url.indexOf("removeRefinement=true") == -1) {
                if (url.indexOf("?") == -1) {
                    url = "?" + url;
                }
                url += "&removeRefinement=true";
            }
        }
        window.location.search = url;
    }
}

function singleValueRefinement(refinementValueId) {
	//var refineUrl = removeAllParamValue(window.location.search, "refinementValueIds") + getRefineUrl();
   var refineUrl = window.location.search;

	if (refineUrl.contains("currentIndex")) {
		refineUrl = removeParamValue(refineUrl, "currentIndex");
	}
	if (refineUrl.contains("pageSize")) {
		refineUrl = removeParamValue(refineUrl, "pageSize");
	}

	if (refineUrl.indexOf("?") == -1) {
		refineUrl = "?" + refineUrl;
	}
	refineUrl = refineUrl + "&refinementValueIds=" + refinementValueId;
	window.location.search = refineUrl;
}





/*
 Email Signup Form
*/
site.callEmailSignup = function(evt) {
	evt.preventDefault();
	//Remove server errors and some styles and classes before we get the html content of the footer form.
	var formAction = $("#subscribeForm").attr("action"),
   	formHTML = $('#subscribeForm').html();//grab the footer email content to replace if server return no errors.

	//Omniture tagging
	s.events="event15";
	var s_code=s.t();if(s_code)document.write(s_code)

	$("#emailSignUp").html("Saving...");
	$('#subscribeForm .error').html("");
	$.ajax({
		type: "POST",
		url: formAction,
		data: $("#subscribeForm").serialize(),
		dataType: "html",
		success:function(xhr){
			var errors = $(xhr).find('#subscribeForm .error').html() || "";
			var messages = $(xhr).find('#subscribeForm .message').html() || "";
			if (errors.trim().length > 0){
				$('#subscribeForm .error').html(errors);
				$('#subscribeForm .message').html("");
			} else if (messages.trim().length > 0){
				$('#subscribeForm .message').html(messages);
			} else {
				$('#subscribeForm .error').html("");
				$('#subscribeForm input.overLabeled', formHTML).removeClass('overLabeled');
				$('#subscribeForm .overlabel label', formHTML).removeAttr('style');
				$('#subscribeForm #userEmail').val("").blur();
			}
			$("#emailSignUp").html("")
		}
	});
	return false;
};


// Manages a single menu or set of menus.
jQuery.fn.menu = function(options){
	options = $.extend({},{
		subnavCss:'div.subNav',
		mouseEvent:'hover', /* hover or click */
		openDuration:1,
		closeDuration:1,
		hoverClass:'hover'
	}, options);

	var menus = $(this);
	menus.find(options.subnavCss).slideUp(0, function(){ $(this).css('visibility','visible'); });

	return this.each(function(){
		var self = $(this);
		var height = self.find(options.subnavCss).height();
		var state = 'closed';
		var count = 0;
		//var count = 10;
		var subnav = self.find(options.subnavCss);
		var open = function(evt){
			if (state !== 'open') {
				menus.not(subnav).mouseleave(); //close all other menus.
				animating = true;
				subnav.show().animate(
					{
						'height':[height,'swing'],
						'opacity':1
					},
					options.openDuration,
					'linear',
					function(){
						state = 'open';
						self.addClass(options.hoverClass);
					}
				);

			}
		};
		var close = function(evt){
			if (state === 'open'){
				subnav.animate(
					{
						'height':[0,'swing'],
						'opacity':0
					},
					options.closeDuration,
					'linear',
					function(){ /* callback */
						state = 'closed';
						subnav.hide();
						self.removeClass(options.hoverClass);
					}
				);
			}
		};
		self[options.mouseEvent === 'click' ? 'click' : 'mouseenter'](open);
		self[options.mouseEvent === 'click' ? 'click' : 'mouseleave'](close);
		$('body').click(close)
	});
};

//Home Page Banner Function

site.currentHomeBanner = 1;
jQuery.fn.simpleRotator = function(options){
	options = $.extend({},options,{
		delay:10000,  /* time in ms to wait between rotations */
		fadeDuration:500
	});
	var self = $(this);
	var currentItem = 0;
	var maxIndex = self.length-1;

	setInterval(function(){
		self.eq(currentItem).fadeOut(options.fadeDuration, function(){
		currentItem++;
		if (currentItem > maxIndex){
			currentItem = 0;
		}
		self.eq(currentItem).fadeIn(options.fadeDuration);
		});
	}, options.delay);

};


/***************
 * BASKET PAGE
 **************/
site.eGiftCertificateInstructions = "Enter e-Gift Certificate - one per order";

site.ShowGiftCertificate = function() {
	if (!document.basket_body) { return false; }
	var el = null;
	var isShowRemoveGiftCert = (document.basket_body.gcRedemptionCode.value != "") && (document.basket_body.gcRedemptionCode.value != site.eGiftCertificateInstructions);
	/*show body*/
	if (site.GiftCertError != ""){
	  site.isShowRemoveGiftCert = false;
	}
	if (!site.isShowRemoveGiftCert){ $("#giftcertblock").show(); }
	else { $("#giftcertremoveblock").show(); }
};

site.removePromoCodeAction = function(){
	var frmbasket_body = document.basket_body;
	frmbasket_body.removePromoCode.value = "TRUE";
	frmbasket_body.checkoutAction.value = "4";/*Promotion Code Action*/
	frmbasket_body.promoCode.value = "";
	frmbasket_body.submit();
};

site.ApplyPromotionCode = function() {
	var frmbasket_body = document.basket_body;
	frmbasket_body.checkoutAction.value = "4";/*Promotion Code Action*/
	frmbasket_body.submit();
};

site.removeGiftCertAction = function(){
	var frmbasket_body = document.basket_body;
	frmbasket_body.removeGiftCert.value = "TRUE";
	frmbasket_body.checkoutAction.value = "3";/*E-GiftCertificate Action*/
	frmbasket_body.gcRedemptionCode.value = "";
	frmbasket_body.submit();
};

site.ApplyEGiftCertificate = function(){
	var frmbasket_body = document.basket_body;
	frmbasket_body.checkoutAction.value = "3";/*E-GiftCertificate Action*/
	frmbasket_body.submit();
};

site.removeOutOfStockItemsAction = function(){
	var frmbasket_body = document.basket_body;
	frmbasket_body.removeOutOfStockItems.value = "TRUE";
	frmbasket_body.submit();
};

site.changeCarrierCode = function(select) {
	var frm = document.basket_body;
	if (!frm) { return; }
	//Get estimated total and current shipping fee (included shipping discount)
	var grandShipping = (typeof document.basket_body.grandShipping != 'undefined')? parseFloat(document.basket_body.grandShipping.value) : 0;
	var estimatedGrandTotal = (typeof document.basket_body.estimatedGrandTotal != 'undefined')? parseFloat(document.basket_body.estimatedGrandTotal.value) : 0;
	//Get new shipping fee
	var selectedValue = select.options[select.selectedIndex].value;
	var selectedText = select.options[select.selectedIndex].text;
	var price = (selectedText.indexOf('FREE') == -1)? selectedText.substring(selectedText.indexOf('$') + 1, selectedText.length) : '0.00';
	var newShippingFee = parseFloat(price);
	//Update estimated total
	if(!isNaN(newShippingFee)) {
	   var newEstimatedGrandTotal = estimatedGrandTotal - grandShipping + newShippingFee;
	   $("#estimated-grand-total").html('$' + newEstimatedGrandTotal.toFixed(2));
	}
};

site.beginCheckout = function() {
	var frm = document.basket_body;
	frm.checkoutAction.value = "2";/*Checkout Action*/
	frm.action = site.checkoutAction;
	frm.submit();
};

site.doAssignDefaultValue = function() {
	if (!document.basket_body) { return; }
	if(document.basket_body.gcRedemptionCode && document.basket_body.gcRedemptionCode.value=="") {
		document.basket_body.gcRedemptionCode.value = site.eGiftCertificateInstructions;
	}
};

site.initializeInstorePickupZipForm = function(aForm) {
	if (!document.instorePickupZipForm) { return; }
	var frminstorePickupZipForm = document.instorePickupZipForm;
	frminstorePickupZipForm.storesListZipCode.value = aForm.storesListZipCode.value;
};

site.submitBasketForm = function(evt) {
	evt = (evt)?evt : ((window.event)?event:null);
	if(evt) {
		var keyCode = evt.keyCode ? evt.keyCode : evt.which;
		//if keyCode is "Enter"
		if(keyCode == 13) {
			site.initializeInstorePickupZipForm(document.basket_body);
			return site.getLocationFromZip(document.instorePickupZipForm);
		}
	}
};
site.submitPromotionCode = function(event) {
	if (event.keyCode == 13) { site.ApplyPromotionCode(); }
};
/* END BASKET PAGE */


/*
thumbCarousel.js
-------------------
A control for scrolling through sets of thumbnail images.

Authors: Scott Shepard
Version: 1.3 (supports swatches and lazy-loading)
Dates: June 18, 2010 (v1.0) Oct 10, 2011 (v1.3)
*/
(function($) {
//Swatches in filmstrips. Context is a filmstrip (<div class="filmstrip">).
	function prepareSwatches(filmstrip){

		//capture mouseover on swatch container, but use event.target to determine the swatch moused-over.
		$(filmstrip).mouseover(function(evt){
			if (!evt || !evt.target){ return; }
			//We want the swatch image's wrapper.
			var target = (evt.target.tagName.toLowerCase() == 'img') ? evt.target.parentNode : evt.target;
			//target must be a swatch.
			if (!target.className || target.className.indexOf('swatch') == -1) { return; }
			//product's recolored image
			var url = target.getAttribute('data-recoloredImage');
			if (!url) { return; }
			//change product's image to the swatch-related recolored image.
			var $target = $(target);
			var productWrap = $target.closest('li');
			var mainSrc = productWrap.find('div.image img').attr('src');
			if (!mainSrc) { return; }
			productWrap.find('div.image img').attr("src", filenameReplace(mainSrc, {'fileName':url}));
		});

	}


	$.fn.thumbCarousel = function(options){
		settings = $.extend({
			'viewport': ".viewport",
			'slidingPanel': "ul.slidingPanel",
			'next': ".next",
			'prev': ".prev",
			'first': ".first",
			'last': ".last",
			'item': "li",
			'direction': "horizontal",
			'showAmount': 4,
			'scrollAmount': 4,
			'thumbnailEasing': "swing",
			'circular': false, /* not implemented */
			'interval': 350,
			'preMoveCallback': null,
			'postMoveCallback': null,
			'flyout': false,
			'flyoutDuration': 200,
			'manageViewportWidth': true,
			'preload':0, /* the number of images that are pre-loaded. 0 turns this feature off. */
			'attachSwatches':false, /* handle swatches */
			'scrollModifier':0 /* adds or subtracts additional movement per item when sliding. */
		}, options);

		//For each thumbCarousel found:
		this.each(function(){

			var self = $(this),
				item = self.find(settings.item),
				itemWidth = item.width() + parseInt(item.css('margin-right')||0,10) + parseInt(item.css('margin-left')||0,10) + parseInt(item.css('padding-left')||0,10) + parseInt(item.css('padding-right')||0,10) + parseInt(item.css('border-width-left')||0,10) + parseInt(item.css('border-width-right')||0,10) + 1,
				showAmount = settings.showAmount,
				scrollAmount = settings.scrollAmount,
				viewportWidth = showAmount * itemWidth,
				numberOfItems = self.find(settings.item).length,
				viewport = self.find(settings.viewport),
				slidingPanel = self.find(settings.slidingPanel),
				pos = 0,
				activeIdx = -1;

			if (settings.manageViewportWidth) { viewport.css('width', viewportWidth); }
			slidingPanel.css('width', numberOfItems*itemWidth);

			//Attach behavior
			self.find(settings.next).click(function(e){
				slideTo("next",e);
			});
			self.find(settings.prev).click(function(e){
				slideTo("prev",e);
			});
			self.find(settings.first).click(function(e){
				slideTo("first",e);
			});
			self.find(settings.last).click(function(e){
				slideTo("last",e);
			});

			//Determine next position and animate to it.
			function slideTo(position, e){
				if (e) { e.preventDefault(); }
				//Determine position
				var nextPos = 0;
				switch (position){
					case ('next'):
						var numberInNextSet = numberOfItems - pos - showAmount;
						if (numberInNextSet < 0) { numberInNextSet = 0; }
						numberInNextSet = (numberInNextSet < showAmount) ? numberInNextSet : showAmount;
						nextPos = pos + numberInNextSet;
						break;
					case ('prev'):
						nextPos = (pos-scrollAmount < 0) ? 0 : pos-scrollAmount;
						break;
					case ('first'):
						nextPos = 0;
						break;
					case ('last'):
						nextPos = numberOfItems-showAmount;
					default: break;
				}

				var left = (nextPos*itemWidth*-1)+settings.scrollModifier*nextPos;
				slidingPanel.animate({ 'marginLeft': left }, settings.interval, settings.thumbnailEasing);
				pos = nextPos;

				//enable or disable next, prev, first, last buttons
				if (nextPos === 0){
					self.find(settings.prev + ", " + settings.first).addClass('disabled');
					self.find(settings.next + ", " + settings.last).removeClass('disabled');
				} else if (pos >= numberOfItems-showAmount) {
					self.find(settings.prev + ", " + settings.first).removeClass('disabled');
					self.find(settings.next + ", " + settings.last).addClass('disabled');
				} else {
					self.find(settings.prev + ", " + settings.first + ", " + settings.next + ", " + settings.last).removeClass('disabled');
				}
				if (numberOfItems <= showAmount){
					self.find(settings.next + ", " + settings.last).addClass('disabled');
				}

				//load images
				var baseImg = $('div.image img',item[0]);
				if (!settings.imagePath) {
					var imgAttrs = filenameParser(baseImg.attr('src'));
					settings.imagePath = imgAttrs.path;
					settings.imageSearch = imgAttrs.search;
				}
				if (settings.preload < settings.showAmount) { settings.preload = settings.showAmount; }
				if (settings.preload === 0) { settings.preload = item.length; }
				var nextImageSet = pos+settings.preload;
				for (var i = pos; i<nextImageSet; i++){
					var div = $('div.image',item[i]);
					var dataSrc = div.attr('data-src');
					var dataAlt = div.attr('data-alt');

					if (!dataSrc) {dataSrc = "__NOIMAGE__";}

					if (dataSrc) {
						var img = $('img', div)[0];
						if (!img) {
							img = document.createElement('img');
							img.src = settings.imagePath + dataSrc + "?" + settings.imageSearch;
							img.width = baseImg.attr('width');
							img.height = baseImg.attr('height');
							img.alt = dataAlt;
							img.title = dataAlt;
							$('a', div).append(img);
						}
					}
				}
			}

			//start on the first pos
			slideTo('first');

			//Flyout behavior
			if (settings.flyout) {
				self.find(item).each(function(idx, el){
					var thumbnail = this;
					var flyout =  $(self.find(settings.flyout)[idx]);
					var height = flyout.height();
					flyout.css({ 'height':0, 'opacity':0, 'zIndex':'-1' });

					//Thumbnail Click behavior
					$(this).find('a').click(function(e){
						e.preventDefault();
						if (activeIdx !== idx) {
							 $(self.find(settings.flyout)[activeIdx])
								.css({'zIndex':'-1'})
								.animate({ 'height':0, 'opacity':0 }, settings.flyoutDuration);
						}
						if (flyout.css('opacity') === 0) {
							activeIdx = idx;
							flyout.css({'zIndex':'0'});
							flyout.animate(
								{ 'height':height, 'opacity':1 },
								settings.flyoutDuration,
								function(){ height = flyout.height(); }
							);
						} else {
							flyout.animate(
								{ 'height':0, 'opacity':0 },
								settings.flyoutDuration,
								function() { flyout.css({'zIndex':'-1'}); }
							);
						}
					});
				});

				// close on bodyclick
				$(document.body).click(function(e){
					if (activeIdx === -1) { return; }
					var aThumb = self.find(item)[activeIdx];
					var aFlyout = self.find(settings.flyout)[activeIdx];
					var eThumb = $(e.target).parents(item).get(0);
					var eFlyout = $(e.target).parents(settings.flyout).get(0);

					// close open flyout if it (or its thumbnail) do not match e.target
					if ((!eThumb && !eFlyout) || (eThumb !== aThumb && eFlyout !== aFlyout)) {
						$(aFlyout).css({ 'height':0, 'opacity':0, 'zIndex':'-1' });
						activeIdx = -1;
					}
				});
			} else {
				$(this).click(function(evt){ evt.stopImmediatePropagation(); });
			}

			//Attach swatches
			if (settings.attachSwatches) { prepareSwatches(this); }

		});

		return this;
	};
})(jQuery);






/* PRODUCT DETAIL PAGE */
//backorder messages
site.pdp.backorderEvents = function(event, variantId, productId, props) {
	// If there is a message, display it
	//this feature is disabled on Sheplers
	if (1==2){
		var msg = "";
		if (props && props.stock === false && props.backorderable) {
			// Item is not in stock, but it is backorderable
			if (!site.isEmpty(props.backDate)) {
				// Item has a backorder date
				msg = site.variants.backorderableDate.replace("[DATE]", props.backDate);
			} else {
				// Item doesn't have a backorder date
				msg = site.variants.backorderable;
			}
		}

		if (site.isEmpty(msg)) {
			$("div.variant-messages").removeClass("message").empty();
		} else {
			$("div.variant-messages").addClass("message").html(msg);
		}
	}

	// Variable variant pricing
	if (props && props.price) {
		$("#variantPrice").html(props.price).show();
		$("#serverPrice").hide();
	} else {
		$("#variantPrice").hide();
		$("#serverPrice").show();

	}
};

/* Hide the zoom panel and show the variant matrix drop downs */
function hideZoom() {
	$(".zoom-overlay").fadeOut(function() {
		$(".VariantMatrix .widget-root").show();
		$(".facebook-like").show();
	});
	$(".imageContainer").removeClass("zoomed");

	var mi = $(".mainItem");
	mi.css("height", mi[0]._oldHeight);
}

function updateMainImage(event, fileURL) {
	ImageWidget.setImageSrc(imgWidget, ImageWidget.getImageSrc(imgWidget), fileURL);
	if (typeof ZoomWidget != "undefined") { ZoomWidget.setImageName("#ZoomPanel", fileURL); }
	if (typeof BaseZoomWidget != "undefined") { BaseZoomWidget.onUpdateImage("#ZoomPanel_EntityZoom_Zoom", event, fileURL); }
}


site.addToCart = function(scope) {
	var relationType = $("input[name=relationType]", scope).val();
	var googleAnalyticsId =  $("input[name=googleAnalyticsId]", scope).val();

	//Google Analytics
	//Getting price of selected variant from widget.
	var price = $("div.price").text().trim();
	price = parseInt(price.replace("$",""));

	var eventCategory = "Add to Cart";
	var eventAction = "PDP Add to Cart";
	var eventLabel = "PDP Add to Cart - " + $("input[name=productName]", scope).val();
	switch (relationType){
		case "recentlyViewed":
			eventAction = "PDP Recently Viewed Add to Cart";
			eventLabel = "Recently Viewed Add to Cart  - " + $("input[name=productName]", scope).val();
			break;
		case "crossSell":
			eventAction = "PDP People Who Bought Add to Cart";
			eventLabel = "People Who Bought Add to Cart - " + $("input[name=productName]", scope).val();
			break;
		case "topSell":
			eventAction = "PDP Our Best Selling Items Add to Cart";
			eventLabel = "Our Best Selling Items Add to Cart - " + $("input[name=productName]", scope).val();
			break;
		case "upSell":
			eventAction = "PDP UpSell Add to Cart";
			eventLabel = "UpSell Add to Cart - " + $("input[name=productName]", scope).val();
			break;
		case "searchResults":
			eventAction = "PDP Search Add to Cart";
			eventLabel = "Search Add to Cart - " + $("input[name=productName]", scope).val();
			break;
		case "Browse":
			eventAction = "PDP Browse Add to Cart";
			eventLabel = "Browse Add to Cart - " + $("input[name=productName]", scope).val();
			break;
	}
	var pageTracker = _gat._getTracker(googleAnalyticsId);
	pageTracker._trackEvent(eventCategory, eventAction, eventLabel, price);
};

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
if (!document.getElementById('gaJsHost')) {
	$('head').append('<script id="gaJsHost" src="' + gaJsHost + 'google-analytics.com/ga.js"></script>');
}


/*
filenameParser returns an object populated with all the parts of a url.
By Scott Shepard 2011-04-22
 */
function filenameParser(src){
	if (typeof src !== 'string') {
		throw "filenameParser: src is not a string.";
	}

	var fileParts, search = null, fileName, fileExt, filePrefix, path, imgUrl, searchParts = [], queryAttributes = {}, attr, pair;
	var pathParts = src.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/); //works when urls have a file extension like ".gif"
	if (!pathParts){
		pathParts = src.match(/(.*)[\/\\]([^\/\\]+\w+)$/); // for urls without file extensions.
		if (!pathParts) { throw('fileNameParser cannot parse file: "'+ src); }
	}

	fileName = pathParts[2] ? pathParts[2] : pathParts[1];
	if (fileName.indexOf('?') > -1){
		search = fileName.substr(fileName.indexOf('?'));
		fileName = fileName.substr(0, fileName.indexOf('?'));
	}
	fileParts = fileName.match(/(^[a-zA-Z0-9_\-]+)(\.[a-zA-Z]{3}$)?/);
	fileExt = fileName.split('.')[1];
	filePrefix = fileName.split('.')[0];
	path = (pathParts[2] ? pathParts[1] : pathParts[0]) + "/";
	imgUrl = path + filePrefix + (fileExt || "");

	if (typeof search === "string" && search.length > 0 && search.substr(0,1) === "?"){
		search = search.substr(1, search.length);
		searchParts = search.split("&amp;");
		if (searchParts.length === 1){ searchParts = search.split("&"); }
		for (var i=0,l=searchParts.length;i<l;i++){
			pair = searchParts[i].split("=");
			if (pair.length === 2){
				queryAttributes[pair[0]] = pair[1];
			}
		}
	}

	return {
		'src': src,
		'path': path,
		'imgUrl': imgUrl,
		'fileName': fileName,
		'filePrefix': filePrefix,
		'fileExt':fileExt,
		'search':search,
		'queryAttributes':queryAttributes
	};
}


/*
filenameReplace returns a url with the file name replaced with a given value.  Requires filenameParser().
By Scott Shepard 2011-04-07

Usage:
Find "param" choices in the object returned from filenameParser.

var src = '/path/to/file/chair_11.jpg?hei=100&wid=100';
var newProps = {'fileName': imageAttrs.fileName, 'queryAttributes':{'size':'245.0,245.0', 'wid':245, 'hei':245}};
mainImage.attr("src", filenameReplace(src, newProps));

 */
function filenameReplace(original, settings){
	var fileProperties = filenameParser(original);
	var search = "", setting, queryAttr, contains, settingAttr;
	for (setting in settings) {
		if (settings.hasOwnProperty(setting)) {
			switch (setting){
				case 'queryAttributes':
					for (queryAttr in fileProperties.queryAttributes){
						if (fileProperties.queryAttributes.hasOwnProperty(queryAttr)) {
							contains = false;
							for (settingAttr in settings[setting]) {
								if (queryAttr === settingAttr) {
									contains = true;
									search += settingAttr + "=" + settings[setting][settingAttr] + "&";
								}
							}
							if (!contains) {
								search += queryAttr + "=" + fileProperties.queryAttributes[queryAttr] + "&";
							}
						}
					}

					fileProperties.search = search.substr(0,search.length-1);
					break;
				case 'fileName':
					fileProperties.fileName = settings[setting];
					break;
			}
		}
	}
	return fileProperties.path + fileProperties.fileName + "?" + fileProperties.search;
}

/*
 * This function will write a message to the document after calculating the number of days remaining. Once the days
 * are calculated, the word day or days will be automatically applied.
 *
 * endDateStr -   (required) This is the end date of the message. Format must be MM/dd/yyyy. (Ex: 09/30/2011)
 * beginningMsg - (required) This is the beginning portion of the message that will always be returned
 *                unless it is the last day and a lastDayMsg was provided or it has expired and an expiredMsg
 *                was provided.
 * endingMsg -    (required) This is the ending portion of the message that will always be returned
 *                unless it is the last day and a lastDayMsg was provided or it has expired and an expiredMsg
 *                was provided.
 * lastDayMsg -   (optional) This is the message that will be returned (as is) if the endDateStr is the current
 *                date. If this is not supplied then the beginningMsg and endingMsg will be used with 1 day as
 *                calculated portion.
 * expiredMsg -   (optional) This is the message that will be returned (as is) if the endDateStr is before the
 *                current date. If this is not supplied then the beginningMsg and endingMsg will be used with 0 days
 *                as calculated portion. If this argument is passed the lastDayMsg must also be passed.
 */
function daysRemaining(endDateStr, beginningMsg, endingMsg, lastDayMsg, expiredMsg) {
	// The number of milliseconds in one day.
	var oneDay = 1000 * 60 * 60 * 24;

	var dateArray = endDateStr.split("/");
	var endDate = new Date(endDateStr);
	var today = new Date();
	var message = "";

	// Convert both dates to milliseconds.
	var todayMillis = today.getTime();
	var endDateMillis = endDate.getTime();

	// Calculate the difference in milliseconds.
	var diffMillis = (endDateMillis - todayMillis);

	// Convert back to days. Add 1.5 days for rounding up to the next day.
	var diffDays = Math.round((diffMillis / oneDay) + 1.5);

	// Apply message to string and return.
	if (diffDays == 1) {
		if (lastDayMsg) {
			message = lastDayMsg;
		} else {
			message = beginningMsg + diffDays + " day" + endingMsg;
		}
	} else if (diffDays <= 0) {
		if (expiredMsg) {
			message = expiredMsg;
		} else {
			message = beginningMsg + "0 days" + endingMsg;
		}
	} else {
		message = beginningMsg + diffDays + " days" + endingMsg;
	}
	document.write(message);
}

//Address form helpers
function refreshStates(country) {
	var el = function(id) { return document.getElementById(id); }
	if (country == "USA") {
		el("statesWrapper").style.display = "block";
		el("states").style.display = "inline-block";
		el("provincesWrapper").style.display = "none";
		el("StatesRequiredSymbol").style.display = "inline-block";
		el("states").removeAttribute("disabled");
		el("provinces").disabled = true;
		el("state").value = document.getElementById("states")[el("states").selectedIndex].value;
		$('input#phone').siblings('label.placeholder').removeClass('optional');

	} else if (country == "CAN") {
		el("statesWrapper").style.display = "none";
		el("provincesWrapper").style.display = "block";
		el("provinces").style.display = "inline-block";
		el("StatesRequiredSymbol").style.display = "inline-block";
		el("states").disabled = true;
		el("provinces").removeAttribute("disabled");
		el("state").value = el("provinces")[el("provinces").selectedIndex].value;
		$('input#phone').siblings('label.placeholder').removeClass('optional');

	} else {
		el("states").disabled = "true";
		el("states").value = "";
		el("provinces").disabled = "true";
		el("provinces").value = "";
		el("provincesWrapper").style.display = "none";
		el("StatesRequiredSymbol").style.display = "none";
		el("state").value = "";
		$('input#phone').siblings('label.placeholder').addClass('optional').parents('div.type_phone').removeClass('valid').removeClass('invalid');
	}
}

function onStateProvinceChange(stateProvince) {
	document.getElementById("state").value = stateProvince.value;
}