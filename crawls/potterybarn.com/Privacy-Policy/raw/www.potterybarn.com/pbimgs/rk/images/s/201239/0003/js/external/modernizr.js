window.Modernizr=(function(_1,_2,_3){
var _4="2.6.1",_5={},_6=true,_7=_2.documentElement,_8="modernizr",_9=_2.createElement(_8),_a=_9.style,_b=_2.createElement("input"),_c=":)",_d={}.toString,_e=" -webkit- -moz- -o- -ms- ".split(" "),_f="Webkit Moz O ms",_10=_f.split(" "),_11=_f.toLowerCase().split(" "),ns={"svg":"http://www.w3.org/2000/svg"},_12={},_13={},_14={},_15=[],_16=_15.slice,_17,_18=function(_19,_1a,_1b,_1c){
var _1d,ret,_1e,div=_2.createElement("div"),_1f=_2.body,_20=_1f?_1f:_2.createElement("body");
if(parseInt(_1b,10)){
while(_1b--){
_1e=_2.createElement("div");
_1e.id=_1c?_1c[_1b]:_8+(_1b+1);
div.appendChild(_1e);
}
}
_1d=["&#173;","<style id=\"s",_8,"\">",_19,"</style>"].join("");
div.id=_8;
(_1f?div:_20).innerHTML+=_1d;
_20.appendChild(div);
if(!_1f){
_20.style.background="";
_7.appendChild(_20);
}
ret=_1a(div,_19);
!_1f?_20.parentNode.removeChild(_20):div.parentNode.removeChild(div);
return !!ret;
},_21=function(mq){
var _22=_1.matchMedia||_1.msMatchMedia;
if(_22){
return _22(mq).matches;
}
var _23;
_18("@media "+mq+" { #"+_8+" { position: absolute; } }",function(_24){
_23=(_1.getComputedStyle?getComputedStyle(_24,null):_24.currentStyle)["position"]=="absolute";
});
return _23;
},_25=(function(){
var _26={"select":"input","change":"input","submit":"form","reset":"form","error":"img","load":"img","abort":"img"};
function _25(_27,_28){
_28=_28||_2.createElement(_26[_27]||"div");
_27="on"+_27;
var _29=_27 in _28;
if(!_29){
if(!_28.setAttribute){
_28=_2.createElement("div");
}
if(_28.setAttribute&&_28.removeAttribute){
_28.setAttribute(_27,"");
_29=is(_28[_27],"function");
if(!is(_28[_27],"undefined")){
_28[_27]=_3;
}
_28.removeAttribute(_27);
}
}
_28=null;
return _29;
};
return _25;
})(),_2a=({}).hasOwnProperty,_2b;
if(!is(_2a,"undefined")&&!is(_2a.call,"undefined")){
_2b=function(_2c,_2d){
return _2a.call(_2c,_2d);
};
}else{
_2b=function(_2e,_2f){
return ((_2f in _2e)&&is(_2e.constructor.prototype[_2f],"undefined"));
};
}
if(!Function.prototype.bind){
Function.prototype.bind=function bind(_30){
var _31=this;
if(typeof _31!="function"){
throw new TypeError();
}
var _32=_16.call(arguments,1),_33=function(){
if(this instanceof _33){
var F=function(){
};
F.prototype=_31.prototype;
var _34=new F();
var _35=_31.apply(_34,_32.concat(_16.call(arguments)));
if(Object(_35)===_35){
return _35;
}
return _34;
}else{
return _31.apply(_30,_32.concat(_16.call(arguments)));
}
};
return _33;
};
}
function _36(str){
_a.cssText=str;
};
function _37(_38,_39){
return _36(_e.join(_38+";")+(_39||""));
};
function is(obj,_3a){
return typeof obj===_3a;
};
function _3b(str,_3c){
return !!~(""+str).indexOf(_3c);
};
function _3d(_3e,_3f){
for(var i in _3e){
var _40=_3e[i];
if(!_3b(_40,"-")&&_a[_40]!==_3){
return _3f=="pfx"?_40:true;
}
}
return false;
};
function _41(_42,obj,_43){
for(var i in _42){
var _44=obj[_42[i]];
if(_44!==_3){
if(_43===false){
return _42[i];
}
if(is(_44,"function")){
return _44.bind(_43||obj);
}
return _44;
}
}
return false;
};
function _45(_46,_47,_48){
var _49=_46.charAt(0).toUpperCase()+_46.slice(1),_4a=(_46+" "+_10.join(_49+" ")+_49).split(" ");
if(is(_47,"string")||is(_47,"undefined")){
return _3d(_4a,_47);
}else{
_4a=(_46+" "+(_11).join(_49+" ")+_49).split(" ");
return _41(_4a,_47,_48);
}
};
_12["flexbox"]=function(){
return _45("flexWrap");
};
_12["canvas"]=function(){
var _4b=_2.createElement("canvas");
return !!(_4b.getContext&&_4b.getContext("2d"));
};
_12["canvastext"]=function(){
return !!(_5["canvas"]&&is(_2.createElement("canvas").getContext("2d").fillText,"function"));
};
_12["touch"]=function(){
var _4c;
if(("ontouchstart" in _1)||_1.DocumentTouch&&_2 instanceof DocumentTouch){
_4c=true;
}else{
_18(["@media (",_e.join("touch-enabled),("),_8,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(_4d){
_4c=_4d.offsetTop===9;
});
}
return _4c;
};
_12["geolocation"]=function(){
return "geolocation" in navigator;
};
_12["postmessage"]=function(){
return !!_1.postMessage;
};
_12["hashchange"]=function(){
return _25("hashchange",_1)&&(_2.documentMode===_3||_2.documentMode>7);
};
_12["history"]=function(){
return !!(_1.history&&history.pushState);
};
_12["draganddrop"]=function(){
var div=_2.createElement("div");
return ("draggable" in div)||("ondragstart" in div&&"ondrop" in div);
};
_12["rgba"]=function(){
_36("background-color:rgba(150,255,150,.5)");
return _3b(_a.backgroundColor,"rgba");
};
_12["hsla"]=function(){
_36("background-color:hsla(120,40%,100%,.5)");
return _3b(_a.backgroundColor,"rgba")||_3b(_a.backgroundColor,"hsla");
};
_12["multiplebgs"]=function(){
_36("background:url(https://),url(https://),red url(https://)");
return (/(url\s*\(.*?){3}/).test(_a.background);
};
_12["backgroundsize"]=function(){
return _45("backgroundSize");
};
_12["borderimage"]=function(){
return _45("borderImage");
};
_12["borderradius"]=function(){
return _45("borderRadius");
};
_12["boxshadow"]=function(){
return _45("boxShadow");
};
_12["textshadow"]=function(){
return _2.createElement("div").style.textShadow==="";
};
_12["opacity"]=function(){
_37("opacity:.55");
return (/^0.55$/).test(_a.opacity);
};
_12["cssanimations"]=function(){
return _45("animationName");
};
_12["csscolumns"]=function(){
return _45("columnCount");
};
_12["cssgradients"]=function(){
var _4e="background-image:",_4f="gradient(linear,left top,right bottom,from(#9f9),to(white));",_50="linear-gradient(left top,#9f9, white);";
_36((_4e+"-webkit- ".split(" ").join(_4f+_4e)+_e.join(_50+_4e)).slice(0,-_4e.length));
return _3b(_a.backgroundImage,"gradient");
};
_12["csstransforms"]=function(){
return !!_45("transform");
};
_12["csstransforms3d"]=function(){
var ret=!!_45("perspective");
if(ret&&"webkitPerspective" in _7.style){
_18("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(_51,_52){
ret=_51.offsetLeft===9&&_51.offsetHeight===3;
});
}
return ret;
};
_12["csstransitions"]=function(){
return _45("transition");
};
_12["fontface"]=function(){
var _53;
_18("@font-face {font-family:\"font\";src:url(\"https://\")}",function(_54,_55){
var _56=_2.getElementById("smodernizr"),_57=_56.sheet||_56.styleSheet,_58=_57?(_57.cssRules&&_57.cssRules[0]?_57.cssRules[0].cssText:_57.cssText||""):"";
_53=/src/i.test(_58)&&_58.indexOf(_55.split(" ")[0])===0;
});
return _53;
};
_12["generatedcontent"]=function(){
var _59;
_18(["#modernizr:after{content:\"",_c,"\";visibility:hidden}"].join(""),function(_5a){
_59=_5a.offsetHeight>=1;
});
return _59;
};
_12["video"]=function(){
var _5b=_2.createElement("video"),_5c=false;
try{
if(_5c=!!_5b.canPlayType){
_5c=new Boolean(_5c);
_5c.ogg=_5b.canPlayType("video/ogg; codecs=\"theora\"").replace(/^no$/,"");
_5c.h264=_5b.canPlayType("video/mp4; codecs=\"avc1.42E01E\"").replace(/^no$/,"");
_5c.webm=_5b.canPlayType("video/webm; codecs=\"vp8, vorbis\"").replace(/^no$/,"");
}
}
catch(e){
}
return _5c;
};
_12["localstorage"]=function(){
try{
localStorage.setItem(_8,_8);
localStorage.removeItem(_8);
return true;
}
catch(e){
return false;
}
};
_12["sessionstorage"]=function(){
try{
sessionStorage.setItem(_8,_8);
sessionStorage.removeItem(_8);
return true;
}
catch(e){
return false;
}
};
_12["webworkers"]=function(){
return !!_1.Worker;
};
_12["applicationcache"]=function(){
return !!_1.applicationCache;
};
_12["svg"]=function(){
return !!_2.createElementNS&&!!_2.createElementNS(ns.svg,"svg").createSVGRect;
};
_12["inlinesvg"]=function(){
var div=_2.createElement("div");
div.innerHTML="<svg/>";
return (div.firstChild&&div.firstChild.namespaceURI)==ns.svg;
};
function _5d(){
_5["input"]=(function(_5e){
for(var i=0,len=_5e.length;i<len;i++){
_14[_5e[i]]=!!(_5e[i] in _b);
}
if(_14.list){
_14.list=!!(_2.createElement("datalist")&&_1.HTMLDataListElement);
}
return _14;
})("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
_5["inputtypes"]=(function(_5f){
for(var i=0,_60,_61,_62,len=_5f.length;i<len;i++){
_b.setAttribute("type",_61=_5f[i]);
_60=_b.type!=="text";
if(_60){
_b.value=_c;
_b.style.cssText="position:absolute;visibility:hidden;";
if(/^range$/.test(_61)&&_b.style.WebkitAppearance!==_3){
_7.appendChild(_b);
_62=_2.defaultView;
_60=_62.getComputedStyle&&_62.getComputedStyle(_b,null).WebkitAppearance!=="textfield"&&(_b.offsetHeight!==0);
_7.removeChild(_b);
}else{
if(/^(search|tel)$/.test(_61)){
}else{
if(/^(url|email)$/.test(_61)){
_60=_b.checkValidity&&_b.checkValidity()===false;
}else{
_60=_b.value!=_c;
}
}
}
}
_13[_5f[i]]=!!_60;
}
return _13;
})("search tel url email datetime date month week time datetime-local number range color".split(" "));
};
for(var _63 in _12){
if(_2b(_12,_63)){
_17=_63.toLowerCase();
_5[_17]=_12[_63]();
_15.push((_5[_17]?"":"no-")+_17);
}
}
_5.input||_5d();
_5.addTest=function(_64,_65){
if(typeof _64=="object"){
for(var key in _64){
if(_2b(_64,key)){
_5.addTest(key,_64[key]);
}
}
}else{
_64=_64.toLowerCase();
if(_5[_64]!==_3){
return _5;
}
_65=typeof _65=="function"?_65():_65;
if(_6){
_7.className+=" "+(_65?"":"no-")+_64;
}
_5[_64]=_65;
}
return _5;
};
_36("");
_9=_b=null;
_5._version=_4;
_5._prefixes=_e;
_5._domPrefixes=_11;
_5._cssomPrefixes=_10;
_5.mq=_21;
_5.hasEvent=_25;
_5.testProp=function(_66){
return _3d([_66]);
};
_5.testAllProps=_45;
_5.testStyles=_18;
_5.prefixed=function(_67,obj,_68){
if(!obj){
return _45(_67,"pfx");
}else{
return _45(_67,obj,_68);
}
};
_7.className=_7.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(_6?" js "+_15.join(" "):"");
return _5;
})(this,this.document);
(function(_69,_6a){
var _6b=_69.html5||{};
var _6c=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
var _6d=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;
var _6e;
var _6f="_html5shiv";
var _70=0;
var _71={};
var _72;
(function(){
try{
var a=_6a.createElement("a");
a.innerHTML="<xyz></xyz>";
_6e=("hidden" in a);
_72=a.childNodes.length==1||(function(){
(_6a.createElement)("a");
var _73=_6a.createDocumentFragment();
return (typeof _73.cloneNode=="undefined"||typeof _73.createDocumentFragment=="undefined"||typeof _73.createElement=="undefined");
}());
}
catch(e){
_6e=true;
_72=true;
}
}());
function _74(_75,_76){
var p=_75.createElement("p"),_77=_75.getElementsByTagName("head")[0]||_75.documentElement;
p.innerHTML="x<style>"+_76+"</style>";
return _77.insertBefore(p.lastChild,_77.firstChild);
};
function _78(){
var _79=_7a.elements;
return typeof _79=="string"?_79.split(" "):_79;
};
function _7b(_7c){
var _7d=_71[_7c[_6f]];
if(!_7d){
_7d={};
_70++;
_7c[_6f]=_70;
_71[_70]=_7d;
}
return _7d;
};
function _7e(_7f,_80,_81){
if(!_80){
_80=_6a;
}
if(_72){
return _80.createElement(_7f);
}
if(!_81){
_81=_7b(_80);
}
var _82;
if(_81.cache[_7f]){
_82=_81.cache[_7f].cloneNode();
}else{
if(_6d.test(_7f)){
_82=(_81.cache[_7f]=_81.createElem(_7f)).cloneNode();
}else{
_82=_81.createElem(_7f);
}
}
return _82.canHaveChildren&&!_6c.test(_7f)?_81.frag.appendChild(_82):_82;
};
function _83(_84,_85){
if(!_84){
_84=_6a;
}
if(_72){
return _84.createDocumentFragment();
}
_85=_85||_7b(_84);
var _86=_85.frag.cloneNode(),i=0,_87=_78(),l=_87.length;
for(;i<l;i++){
_86.createElement(_87[i]);
}
return _86;
};
function _88(_89,_8a){
if(!_8a.cache){
_8a.cache={};
_8a.createElem=_89.createElement;
_8a.createFrag=_89.createDocumentFragment;
_8a.frag=_8a.createFrag();
}
_89.createElement=function(_8b){
if(!_7a.shivMethods){
return _8a.createElem(_8b);
}
return _7e(_8b,_89,_8a);
};
_89.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+_78().join().replace(/\w+/g,function(_8c){
_8a.createElem(_8c);
_8a.frag.createElement(_8c);
return "c(\""+_8c+"\")";
})+");return n}")(_7a,_8a.frag);
};
function _8d(_8e){
if(!_8e){
_8e=_6a;
}
var _8f=_7b(_8e);
if(_7a.shivCSS&&!_6e&&!_8f.hasCSS){
_8f.hasCSS=!!_74(_8e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}"+"mark{background:#FF0;color:#000}");
}
if(!_72){
_88(_8e,_8f);
}
return _8e;
};
var _7a={"elements":_6b.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video","shivCSS":(_6b.shivCSS!==false),"supportsUnknownElements":_72,"shivMethods":(_6b.shivMethods!==false),"type":"default","shivDocument":_8d,createElement:_7e,createDocumentFragment:_83};
_69.html5=_7a;
_8d(_6a);
var _90=/^$|\b(?:all|print)\b/;
var _91="html5shiv";
var _92=!_72&&(function(){
var _93=_6a.documentElement;
return !(typeof _6a.namespaces=="undefined"||typeof _6a.parentWindow=="undefined"||typeof _93.applyElement=="undefined"||typeof _93.removeNode=="undefined"||typeof _69.attachEvent=="undefined");
}());
function _94(_95){
var _96,_97=_95.getElementsByTagName("*"),_98=_97.length,_99=RegExp("^(?:"+_78().join("|")+")$","i"),_9a=[];
while(_98--){
_96=_97[_98];
if(_99.test(_96.nodeName)){
_9a.push(_96.applyElement(_9b(_96)));
}
}
return _9a;
};
function _9b(_9c){
var _9d,_9e=_9c.attributes,_9f=_9e.length,_a0=_9c.ownerDocument.createElement(_91+":"+_9c.nodeName);
while(_9f--){
_9d=_9e[_9f];
_9d.specified&&_a0.setAttribute(_9d.nodeName,_9d.nodeValue);
}
_a0.style.cssText=_9c.style.cssText;
return _a0;
};
function _a1(_a2){
var _a3,_a4=_a2.split("{"),_a5=_a4.length,_a6=RegExp("(^|[\\s,>+~])("+_78().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),_a7="$1"+_91+"\\:$2";
while(_a5--){
_a3=_a4[_a5]=_a4[_a5].split("}");
_a3[_a3.length-1]=_a3[_a3.length-1].replace(_a6,_a7);
_a4[_a5]=_a3.join("}");
}
return _a4.join("{");
};
function _a8(_a9){
var _aa=_a9.length;
while(_aa--){
_a9[_aa].removeNode();
}
};
function _ab(_ac){
var _ad,_ae,_af=_7b(_ac),_b0=_ac.namespaces,_b1=_ac.parentWindow;
if(!_92||_ac.printShived){
return _ac;
}
if(typeof _b0[_91]=="undefined"){
_b0.add(_91);
}
function _b2(){
clearTimeout(_af._removeSheetTimer);
if(_ad){
_ad.removeNode(true);
}
_ad=null;
};
_b1.attachEvent("onbeforeprint",function(){
_b2();
var _b3,_b4,_b5,_b6=_ac.styleSheets,_b7=[],_b8=_b6.length,_b9=Array(_b8);
while(_b8--){
_b9[_b8]=_b6[_b8];
}
while((_b5=_b9.pop())){
if(!_b5.disabled&&_90.test(_b5.media)){
try{
_b3=_b5.imports;
_b4=_b3.length;
}
catch(er){
_b4=0;
}
for(_b8=0;_b8<_b4;_b8++){
_b9.push(_b3[_b8]);
}
try{
_b7.push(_b5.cssText);
}
catch(er){
}
}
}
_b7=_a1(_b7.reverse().join(""));
_ae=_94(_ac);
_ad=_74(_ac,_b7);
});
_b1.attachEvent("onafterprint",function(){
_a8(_ae);
clearTimeout(_af._removeSheetTimer);
_af._removeSheetTimer=setTimeout(_b2,500);
});
_ac.printShived=true;
return _ac;
};
_7a.type+=" print";
_7a.shivPrint=_ab;
_ab(_6a);
}(this,document));
(function(a,b,c){
function d(a){
return "[object Function]"==o.call(a);
};
function e(a){
return "string"==typeof a;
};
function f(){
};
function g(a){
return !a||"loaded"==a||"complete"==a||"uninitialized"==a;
};
function h(){
var a=p.shift();
q=1,a?a.t?m(function(){
("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1);
},0):(a(),h()):q=0;
};
function i(a,c,d,e,f,i,j){
function k(b){
if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){
"img"!=a&&m(function(){
t.removeChild(l);
},50);
for(var d in y[c]){
y[c].hasOwnProperty(d)&&y[c][d].onload();
}
}
};
var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};
1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){
k.call(this,r);
},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l));
};
function j(a,b,c,d,f){
return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this;
};
function k(){
var a=B;
return a.loader={load:j,i:0},a;
};
var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance" in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){
return "[object Array]"==o.call(a);
},x=[],y={},z={timeout:function(a,b){
return b.length&&(a.timeout=b[0]),a;
}},A,B;
B=function(a){
function b(a){
var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;
for(f=0;f<d;f++){
g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));
}
for(f=0;f<b;f++){
c=x[f](c);
}
return c;
};
function g(a,e,f,g,h){
var i=b(a),j=i.autoCallback;
i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){
k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2;
})));
};
function h(a,b){
function c(a,c){
if(a){
if(e(a)){
c||(j=function(){
var a=[].slice.call(arguments);
k.apply(this,a),l();
}),g(a,j,b,0,h);
}else{
if(Object(a)===a){
for(n in m=function(){
var b=0,c;
for(c in a){
a.hasOwnProperty(c)&&b++;
}
return b;
}(),a){
a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){
var a=[].slice.call(arguments);
k.apply(this,a),l();
}:j[n]=function(a){
return function(){
var b=[].slice.call(arguments);
a&&a.apply(this,b),l();
};
}(k[n])),g(a[n],j,b,n,h));
}
}
}
}else{
!c&&l();
}
};
var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;
c(h?a.yep:a.nope,!!i),i&&c(i);
};
var i,j,l=this.yepnope.loader;
if(e(a)){
g(a,0,l,0);
}else{
if(w(a)){
for(i=0;i<a.length;i++){
j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);
}
}else{
Object(a)===a&&h(a,l);
}
}
},B.addPrefix=function(a,b){
z[a]=b;
},B.addFilter=function(a){
x.push(a);
},B.errorTimeout=10000,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){
b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete";
},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){
var k=b.createElement("script"),l,o,e=e||B.errorTimeout;
k.src=a;
for(o in d){
k.setAttribute(o,d[o]);
}
c=j?h:c||f,k.onreadystatechange=k.onload=function(){
!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null);
},m(function(){
l||(l=1,c(1));
},e),i?k.onload():n.parentNode.insertBefore(k,n);
},a.yepnope.injectCss=function(a,c,d,e,g,i){
var e=b.createElement("link"),j,c=i?h:c||f;
e.href=a,e.rel="stylesheet",e.type="text/css";
for(j in d){
e.setAttribute(j,d[j]);
}
g||(n.parentNode.insertBefore(e,n),m(c,0));
};
})(this,document);
Modernizr.load=function(){
yepnope.apply(window,[].slice.call(arguments,0));
};
Modernizr.addTest("cssfilters",function(){
el=document.createElement("div");
el.style.cssText=Modernizr._prefixes.join("filter"+":blur(2px); ");
return !!el.style.length&&((document.documentMode===undefined||document.documentMode>9));
});
Modernizr.addTest("lastchild",function(){
return Modernizr.testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",function(_ba){
return _ba.lastChild.offsetWidth>_ba.firstChild.offsetWidth;
},2);
});
Modernizr.addTest("cssmask",Modernizr.testAllProps("mask-repeat"));
Modernizr.addTest("emoji",function(){
if(!Modernizr.canvastext){
return false;
}
var _bb=document.createElement("canvas"),ctx=_bb.getContext("2d");
ctx.textBaseline="top";
ctx.font="32px Arial";
ctx.fillText("😃",0,0);
return ctx.getImageData(16,16,1,1).data[0]!==0;
});
Modernizr.addTest("placeholder",function(){
return !!("placeholder" in (Modernizr.input||document.createElement("input"))&&"placeholder" in (Modernizr.textarea||document.createElement("textarea")));
});
Modernizr.addTest("raf",!!Modernizr.prefixed("requestAnimationFrame",window));
(function(_bc,_bd){
_bd.formvalidationapi=false;
_bd.formvalidationmessage=false;
_bd.addTest("formvalidation",function(){
var _be=_bc.createElement("form");
if(!("checkValidity" in _be)){
return false;
}
var _bf=_bc.body,_c0=_bc.documentElement,_c1=false,_c2=false,_c3;
_bd.formvalidationapi=true;
_be.onsubmit=function(e){
if(!window.opera){
e.preventDefault();
}
e.stopPropagation();
};
_be.innerHTML="<input name=\"modTest\" required><button></button>";
_be.style.position="absolute";
_be.style.top="-99999em";
if(!_bf){
_c1=true;
_bf=_bc.createElement("body");
_bf.style.background="";
_c0.appendChild(_bf);
}
_bf.appendChild(_be);
_c3=_be.getElementsByTagName("input")[0];
_c3.oninvalid=function(e){
_c2=true;
e.preventDefault();
e.stopPropagation();
};
_bd.formvalidationmessage=!!_c3.validationMessage;
_be.getElementsByTagName("button")[0].click();
_bf.removeChild(_be);
_c1&&_c0.removeChild(_bf);
return _c2;
});
})(document,window.Modernizr);
