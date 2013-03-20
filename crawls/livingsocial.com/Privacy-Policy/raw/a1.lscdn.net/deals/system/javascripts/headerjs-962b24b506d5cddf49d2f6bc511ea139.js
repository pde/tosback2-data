var JSON;if(!JSON){JSON={};window.JSON=JSON}
(function(){function b(h){return h<10?"0"+h:h}function d(h){f.lastIndex=0;return f.test(h)?'"'+h.replace(f,function(i){var l=o[i];return typeof l==="string"?l:"\\u"+("0000"+i.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+h+'"'}function a(h,i){var l,m,p=e,j,k=i[h];if(k&&typeof k==="object"&&typeof k.toJSON==="function")k=k.toJSON(h);if(typeof n==="function")k=n.call(i,h,k);switch(typeof k){case "string":return d(k);case "number":return isFinite(k)?String(k):"null";case "boolean":case "null":return String(k);
case "object":if(!k)return"null";e+=g;j=[];if(Object.prototype.toString.apply(k)==="[object Array]"){m=k.length;for(h=0;h<m;h+=1)j[h]=a(h,k)||"null";i=j.length===0?"[]":e?"[\n"+e+j.join(",\n"+e)+"\n"+p+"]":"["+j.join(",")+"]";e=p;return i}if(n&&typeof n==="object"){m=n.length;for(h=0;h<m;h+=1)if(typeof n[h]==="string"){l=n[h];if(i=a(l,k))j.push(d(l)+(e?": ":":")+i)}}else for(l in k)if(Object.prototype.hasOwnProperty.call(k,l))if(i=a(l,k))j.push(d(l)+(e?": ":":")+i);i=j.length===0?"{}":e?"{\n"+e+j.join(",\n"+
e)+"\n"+p+"}":"{"+j.join(",")+"}";e=p;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+b(this.getUTCMonth()+1)+"-"+b(this.getUTCDate())+"T"+b(this.getUTCHours())+":"+b(this.getUTCMinutes())+":"+b(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
f=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,g,o={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},n;if(typeof JSON.stringify!=="function")JSON.stringify=function(h,i,l){var m;g=e="";if(typeof l==="number")for(m=0;m<l;m+=1)g+=" ";else if(typeof l==="string")g=l;if((n=i)&&typeof i!=="function"&&(typeof i!=="object"||typeof i.length!=="number"))throw new Error("JSON.stringify");return a("",
{"":h})};if(typeof JSON.parse!=="function")JSON.parse=function(h,i){function l(m,p){var j,k,q=m[p];if(q&&typeof q==="object")for(j in q)if(Object.prototype.hasOwnProperty.call(q,j)){k=l(q,j);if(k!==undefined)q[j]=k;else delete q[j]}return i.call(m,p,q)}h=String(h);c.lastIndex=0;if(c.test(h))h=h.replace(c,function(m){return"\\u"+("0000"+m.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(h.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){h=eval("("+h+")");return typeof i==="function"?l({"":h},""):h}throw new SyntaxError("JSON.parse");}})();var Mustache=function(){var b={},d=function(){};d.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":true},context:{},render:function(a,c,f,e){if(!e){this.context=c;this.buffer=[]}if(!this.includes("",a))if(e)return a;else{this.send(a);return}a=this.render_pragmas(a);var g=this.render_section(a,c,f);if(g===false)g=this.render_tags(a,c,f,e);if(e)return g;else this.sendLines(g)},send:function(a){a!==""&&this.buffer.push(a)},sendLines:function(a){if(a){a=a.split("\n");
for(var c=0;c<a.length;c++)this.send(a[c])}},render_pragmas:function(a){if(!this.includes("%",a))return a;var c=this,f=this.getCachedRegex("render_pragmas",function(e,g){return new RegExp(e+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+g,"g")});return a.replace(f,function(e,g,o){if(!c.pragmas_implemented[g])throw{message:"This implementation of mustache doesn't understand the '"+g+"' pragma"};c.pragmas[g]={};if(o){e=o.split("=");c.pragmas[g][e[0]]=e[1]}return""})},render_partial:function(a,c,f){a=this.trim(a);if(!f||
f[a]===undefined)throw{message:"unknown_partial '"+a+"'"};if(typeof c[a]!="object")return this.render(f[a],c,f,true);return this.render(f[a],c[a],f,true)},render_section:function(a,c,f){if(!this.includes("#",a)&&!this.includes("^",a))return false;var e=this,g=this.getCachedRegex("render_section",function(o,n){return new RegExp("^([\\s\\S]*?)"+o+"(\\^|\\#)\\s*(.+)\\s*"+n+"\n*([\\s\\S]*?)"+o+"\\/\\s*\\3\\s*"+n+"\\s*([\\s\\S]*)$","g")});return a.replace(g,function(o,n,h,i,l,m){o=n?e.render_tags(n,c,
f,true):"";m=m?e.render(m,c,f,true):"";var p;i=e.find(i,c);if(h==="^")p=!i||e.is_array(i)&&i.length===0?e.render(l,c,f,true):"";else if(h==="#")p=e.is_array(i)?e.map(i,function(j){return e.render(l,e.create_context(j),f,true)}).join(""):e.is_object(i)?e.render(l,e.create_context(i),f,true):typeof i==="function"?i.call(c,l,function(j){return e.render(j,c,f,true)}):i?e.render(l,c,f,true):"";return o+p+m})},render_tags:function(a,c,f,e){var g=this,o=function(){return g.getCachedRegex("render_tags",function(l,
m){return new RegExp(l+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+m+"+","g")})},n=o(),h=function(l,m,p){switch(m){case "!":return"";case "=":g.set_delimiters(p);n=o();return"";case ">":return g.render_partial(p,c,f);case "{":return g.find(p,c);default:return g.escape(g.find(p,c))}};a=a.split("\n");for(var i=0;i<a.length;i++){a[i]=a[i].replace(n,h,this);e||this.send(a[i])}if(e)return a.join("\n")},set_delimiters:function(a){a=a.split(" ");this.otag=this.escape_regex(a[0]);this.ctag=this.escape_regex(a[1])},
escape_regex:function(a){if(!arguments.callee.sRE)arguments.callee.sRE=new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g");return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,c){function f(g){return g===false||g===0||g}a=this.trim(a);var e;if(a.match(/([a-z_]+)\./ig))e=f(this.walk_context(a,c));else if(f(c[a]))e=c[a];else if(f(this.context[a]))e=this.context[a];if(typeof e==="function")return e.apply(c);if(e!==undefined)return e;return""},walk_context:function(a,c){a=
a.split(".");c=c[a[0]]!=undefined?c:this.context;for(var f=c[a.shift()];f!=undefined&&a.length>0;){c=f;f=f[a.shift()]}if(typeof f==="function")return f.apply(c);return f},includes:function(a,c){return c.indexOf(this.otag+a)!=-1},escape:function(a){a=String(a===null?"":a);return a.replace(/&(?!\w+;)|["'<>\\]/g,function(c){switch(c){case "&":return"&amp;";case '"':return"&quot;";case "'":return"&#39;";case "<":return"&lt;";case ">":return"&gt;";default:return c}})},create_context:function(a){if(this.is_object(a))return a;
else{var c=".";if(this.pragmas["IMPLICIT-ITERATOR"])c=this.pragmas["IMPLICIT-ITERATOR"].iterator;var f={};f[c]=a;return f}},is_object:function(a){return a&&typeof a=="object"},is_array:function(a){return Object.prototype.toString.call(a)==="[object Array]"},trim:function(a){return a.replace(/^\s*|\s*$/g,"")},map:function(a,c){if(typeof a.map=="function")return a.map(c);else{for(var f=[],e=a.length,g=0;g<e;g++)f.push(c(a[g]));return f}},getCachedRegex:function(a,c){var f=b[this.otag];f||(f=b[this.otag]=
{});var e=f[this.ctag];e||(e=f[this.ctag]={});(f=e[a])||(f=e[a]=c(this.otag,this.ctag));return f}};return{name:"mustache.js",version:"0.4.0-dev",to_html:function(a,c,f,e){var g=new d;if(e)g.send=e;g.render(a,c||{},f);if(!e)return g.buffer.join("\n")}}}();if(typeof window.console==undefined)window.console={log:function(){},error:function(){}};if(!Function.prototype.bind)Function.prototype.bind=function(b){if(typeof this!=="function")throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");var d=Array.prototype.slice.call(arguments,1),a=this,c=function(){},f=function(){return a.apply(this instanceof c?this:b||window,d.concat(Array.prototype.slice.call(arguments)))};c.prototype=this.prototype;f.prototype=new c;return f};
if(!Object.keys)Object.keys=function(b){if(b!==Object(b))throw new TypeError("Object.keys called on non-object");var d=[],a;for(a in b)Object.prototype.hasOwnProperty.call(b,a)&&d.push(a);return d};if(typeof supports_html5_storage!="function"){var supports_html5_storage=function(){try{return"localStorage"in window&&window.localStorage!==null}catch(b){return false}};window.supports_html5_storage=supports_html5_storage}
function Cache(b,d,a){this.storage=b;this.fetcher=d;this.parser=a?new a:new Cache.JSON;this.storage.parser=this.parser;this.fetching=undefined}window.Cache=Cache;Cache.JSON=function(){};Cache.JSON.prototype={parse:function(b){try{this.values=JSON.parse(b)}catch(d){window.console&&typeof window.console.error=="function"&&console.error(d);this.values={}}return this.values},serialize:function(){return JSON.stringify(this.values)}};Cache.JSON=Cache.JSON;Cache.JSON.prototype.parse=Cache.JSON.prototype.parse;
Cache.JSON.prototype.serialize=Cache.JSON.prototype.serialize;
Cache.prototype={fetch:function(b){var d=this.get();if(d)b(d);else if(this.fetcher)if(typeof this.fetching=="object"&&typeof this.fetching.push=="function")this.fetching.push(function(){b(this.storage.read())}.bind(this));else{this.fetching=[];this.fetcher(function(a){this.set(this.parser.parse(a));b(this.get());a=0;for(var c=this.fetching.length;a<c;++a)this.fetching[a]();delete this.fetching}.bind(this))}else b(null)},get:function(){return this.storage.read()},set:function(b){this.storage.store(b);
return b},drop:function(){this.storage.erase()}};Cache.prototype.fetch=Cache.prototype.fetch;Cache.prototype.get=Cache.prototype.get;Cache.prototype.set=Cache.prototype.set;Cache.prototype.drop=Cache.prototype.drop;Cache.Cookie=function(b,d,a){this.name=b;this.minutes=d;if(!a)a=Cache.JSON;if(a)this.parser=new a};Cache.Cookie=Cache.Cookie;
Cache.Cookie.Helpers={storeFor:function(b,d,a){var c="";if(a){c=new Date;c.setTime(c.getTime()+a*60*1E3);c="; expires="+c.toGMTString()}document.cookie=b+"="+d+c+"; path=/"},readFor:function(b){b=b+"=";for(var d=document.cookie.split(";"),a=0;a<d.length;a++){for(var c=d[a];c.charAt(0)==" ";)c=c.substring(1,c.length);if(c.indexOf(b)==0)return c.substring(b.length,c.length)}return null},eraseFor:function(b){this.storeFor(b,"",-1)}};Cache.Cookie.Helpers=Cache.Cookie.Helpers;
Cache.Cookie.Helpers.storeFor=Cache.Cookie.Helpers.storeFor;Cache.Cookie.Helpers.readFor=Cache.Cookie.Helpers.readFor;Cache.Cookie.Helpers.eraseFor=Cache.Cookie.Helpers.eraseFor;if(typeof Object._extend!="function")Object._extend=function(b,d){for(var a in d)b[a]=d[a];return b};Object._extend(Cache.Cookie,Cache.Cookie.Helpers);
Cache.Cookie.prototype={store:function(b){this.parser.values=b;this.storeFor(this.name,this.parser.serialize(),this.minutes)},read:function(){var b=this.readFor(this.name);if(b)try{return this.parser.parse(b)}catch(d){this.erase();window.console&&typeof window.console.error!=undefined&&console.error(d);return null}return null},erase:function(){this.eraseFor(this.name)},_update:function(){this.storeFor(this.name,this.parser.serialize(),this.minutes)}};Cache.Cookie.prototype.store=Cache.Cookie.prototype.store;
Cache.Cookie.prototype.read=Cache.Cookie.prototype.read;Cache.Cookie.prototype.erase=Cache.Cookie.prototype.erase;Object._extend(Cache.Cookie.prototype,Cache.Cookie.Helpers);Cache.Cookie.prototype.readFor=Cache.Cookie.prototype.readFor;Cache.Cookie.prototype.storeFor=Cache.Cookie.prototype.storeFor;Cache.Cookie.prototype.eraseFor=Cache.Cookie.prototype.eraseFor;if(supports_html5_storage()){Cache.Local=function(b,d,a){this.name=b;this.minutes=d;if(!a)a=Cache.JSON;if(a)this.parser=new a};Cache.Local=Cache.Local;Cache.Local.prototype={store:function(b){this.parser.values=b;this._update()},read:function(){var b=localStorage[this.name];if(b&&this._fresh())try{this.parser.parse(b);return this.parser.values}catch(d){this.erase();window.console&&typeof window.console.error!=undefined&&console.error(d);return null}return null},erase:function(){localStorage.removeItem(this.name);
localStorage.removeItem(this._ttlKey())},_update:function(){var b=this.parser.serialize(),d=new Date((new Date).getTime()+this.minutes*60*1E3);localStorage.setItem(this.name,b);localStorage.setItem(this._ttlKey(),d.getTime())},_fresh:function(){try{var b=localStorage[this._ttlKey()];if(!b)return false;var d=new Date,a=new Date(parseInt(b));return d<a}catch(c){console.error(c);return false}},_ttlKey:function(){return this.name+"_ttl"}};Cache.Local.prototype.store=Cache.Local.prototype.store;Cache.Local.prototype.read=
Cache.Local.prototype.read;Cache.Local.prototype.erase=Cache.Local.prototype.erase};Cache.Page=function(b,d){this.name=b;if(!d)d=Cache.JSON;if(d)this.parser=new d;this.storage={}};Cache.Page=Cache.Page;Cache.Page.prototype={store:function(b){this.parser.values=b;this.storage[this.name]=this.parser.serialize()},read:function(){var b=this.storage[this.name];if(b)try{this.parser.parse(b);return this.parser.values}catch(d){this.erase();window.console&&typeof window.console.error!=undefined&&console.error(d);return null}return null},erase:function(){delete this.storage[this.name]}};
Cache.Page.prototype.store=Cache.Page.prototype.store;Cache.Page.prototype.read=Cache.Page.prototype.read;Cache.Page.prototype.erase=Cache.Page.prototype.erase;var Stached={};Stached.views={};Stached.remote_caches={};Stached.View=function(b,d){this.name=b;this.contexts=[];b=0;for(var a=d.length;b<a;++b){var c=d[b];if(c.object)this.contexts.push(new Stached.LocalContext(c.object,c));else c.url?this.contexts.push(new Stached.RemoteContext(c.url,c)):this.contexts.push(c)}};
Stached.View.prototype={fetch:function(b){this._fetchNext(0,{},b);return this},drop:function(){for(var b=0,d=this.contexts.length;b<d;++b)this.contexts[b].drop();return this},_fetchNext:function(b,d,a){if(b>=this.contexts.length)a(d);else typeof this.contexts[b].fetch=="function"&&this.contexts[b].fetch(function(c){if(c)if(this.name){d[this.name]||(d[this.name]={});for(var f in c)d[this.name][f]=c[f]}else for(f in c)d[f]=c[f];this._fetchNext(b+1,d,a)}.bind(this))}};
Stached.LocalContext=function(b){this.data=b;if(typeof b=="string"){b=window[b];this.data={};for(var d in b)this.data[d]=b[d]}};Stached.LocalContext.prototype={fetch:function(b){b(this.data);return this},drop:function(){return this}};
Stached.RemoteContext=function(b,d){function a(e){return e.charAt(0).toUpperCase()+e.slice(1)}var c=null;c=d.cache;var f=d.when;d=d.ts;this.url=b;if(d)this.url+="?ttl="+(new Date).getTime();this.cache=Stached.remote_caches[b];if(!this.cache){c=typeof c=="string"?new (Cache[a(c)])(b):typeof c=="object"?new (Cache[a(c.type)])(b,c.ttl):new Cache.Page(b);Stached.remote_caches[b]=this.cache=new Cache(c,function(e){if(f)f.cookie&&document.cookie.match(f.cookie)&&Cache.Cookie.Helpers.readFor(f.cookie)?Stached.fetchURL(this.url,
e):e(null);else Stached.fetchURL(this.url,e)}.bind(this))}};Stached.RemoteContext.prototype={fetch:function(b){this.cache.fetch(b);return this},drop:function(){this.cache.drop();return this}};Stached._cache={};Stached._events={};Stached._bind=function(b,d){Stached._events[b]=Stached._events[b]?Stached._events[b]:[];Stached._events[b].push(d);Stached._cache[b]&&Stached._trigger(b,Stached._cache[b])};
Stached._trigger=function(b,d,a){if(a)Stached._cache[b]=d;if(a=Stached._events[b])for(var c=0,f=a.length;c<f;++c)a[c](b,d)};Stached.parseResponse=function(b,d){return b.match(/\.json/)?JSON.parse(d.responseText):d.responseText};
Stached.fetchURL=function(b,d){var a=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");a.onreadystatechange=function(){if(a.readyState===4){Stached._trigger("url:"+b.replace(/\?.*$/,""),{body:Stached.parseResponse(b,a),status:a.status},true)}};a.open("GET",b);a.send()};Stached.expireAll=function(){for(var b in Stached.views)Stached.views[b].drop()};Stached.fetch=function(b,d){Stached.views[b].fetch(d)};
Stached.expireCheck=function(){if(document.cookie.match(/stache_expire=all/)){Stached.expireAll();Cache.Cookie.eraseFor("stache_expire")}};Stached.events={};Stached.on=function(b,d){if(!Stached.events[b]){Stached.events[b]=[];Stached.events[b].obj=null}Stached.events[b].push(d);(b=Stached.events[b].obj)&&d(b)};Stached.trigger=function(b,d){var a=Stached.events[b];if(a){Stached.events[b].obj=d;b=0;for(var c=a.length;b<c;++b)a[b](d)}};
Stached.render=function(){function b(j){if(n)j(n.innerHTML);else{var k=o.getAttribute("data-template"),q="/stached/"+k+".mustache";k&&Stached.fetchURL(q,function(t,r){r==200&&j(t)})}}function d(){this.parse=function(j){return this.values=j};this.serialize=function(){return this.values}}var a=function(j,k){var q=function(r,u){if(typeof r.ownerDocument.createRange=="function"){var s=r.ownerDocument.createRange();s.setStartBefore(r);s=s.createContextualFragment(u);r.parentNode.replaceChild(s,r)}else{s=
document.createElement(r.tagName);s.innerHTML=u;r.parentNode.replaceChild(s,r)}return u};if(typeof j.__lookupSetter__=="function"&&j.__lookupSetter__("outerHTML")!="function"||typeof j.outerHTML=="undefined")return q(j,k);else try{j.outerHTML=k;return j.outerHTML}catch(t){window.console&&typeof window.console.error!=undefined&&console.error(t);return q(j,k)}},c=this[0],f=this[1],e=this[2],g=function(j){return document.getElementById(j)},o=g("target-"+c),n=g("template-"+c),h=(e?e.name:null)||"*",i=
new Cache(new Cache.Page(c),b,d);if(o!=null){if(e&&e.hide)o.style.display="none";var l=null;c=[];for(var m in f){g=new Stached.View(m,f[m]);c.push(g);Stached.views[g.name]=g}if(c.length>1){f=[];m=0;for(var p=c.length;m<p;++m){g=c[m];f.push(g)}l=new Stached.View(null,f)}else l=c[0];l.fetch(function(j){if(!j||typeof j!="object"||Object.keys(j)&&Object.keys(j).length==0){if(e.hide)o.style.display="block"}else i.fetch(function(k){k=Mustache.to_html(k,j);a(o,k);h!="*"&&Stached.trigger("render:"+h,{view:l,
options:e,template:n});Stached.trigger("render:*",{view:l,options:e,template:n})})})}};
;if (document.cookie.match(/viewer/)) {
  document.cookie = "authd=1; path=/; domain=" + dls.tld;
}
dls.getStrCookie = function(name) {
  var cookie = document.cookie;
  var setPos = cookie.indexOf(name + '='), stopPos = cookie.indexOf(';', setPos);

  // Dataset does not exist, attempt to register default
  return !~setPos ? null : cookie.substring(
  setPos, ~stopPos ? stopPos : undefined).split('=')[1];
}
dls.getIntCookie = function(name) {
  var id = parseInt(dls.getStrCookie(name));
  return isNaN(id) ? '' : id;
}
;(function() {
  Me = {
    fbKey: FBAppKey,
    id: function() {
      return function() {
        if (dls.viewer) {
          if (dls.viewer.id) {
            return dls.viewer.id;
          } else {
            //cache not cleared on me/info yet fallback to older viewer cookie
            var id = document.cookie.match(/viewer=(\d+)/);
            if (id && id.length == 2) { return id[1]; }
          }
        } else {
          console.log("called me id before stache bind");
        }
        return null;
      }
    },
    array_contains: function (a, obj) {
      var i = a.length;
      while (i--) {
	if (a[i] === obj) {
          return true;
	}
      }
      return false;
    },
    display_name: function() {
      return function() {
        if (this.me) {
          if (this.me.full_name) {
            return this.me.full_name;
          }
          else if (this.me.email) {
            return this.me.email.replace(/@.*/,'');
          }
        }
        return "...";
      }
    },
    loggedIn: function() {
      return function() {
        var cookie = new String(document.cookie)
        return !!cookie.match(/authd=\d+/);
      }
    },
    purchases_for: function(deal_id) {
      if (this.deals) {
        return this.deals[deal_id];
      }
      return null;
    },
    credits_for: function(currency_code) {
      return function() {
        if(this.me && this.me.credits) {
          var credits_value = this.me.credits[currency_code];
          if(credits_value >= 0) {
            return(credits_value);
          } else {
            return(0);
          }
        }
        return 0;
      }
    },
    plus_member: function() {
      return function() {
        return(this.me && this.me.plus_membership);
      }
    }
  }

  FbMe = {
    appearsLoggedIn: (Me.loggedIn().call(Me)),
    isfb: function() {
      return function() {
        var fbc = new RegExp("fbsr_" + Me.fbKey + "=");
        return !!document.cookie.match(fbc);
      }
    },
    isfbVisible: function() {
      return function() {
        var fbc = new RegExp("fbsr_" + Me.fbKey + "=");
        return !!document.cookie.match(fbc) && !document.cookie.match(/viewer=\d+/);
      }
    },
    updateControlBar: function() {
      if (!FbMe.isfbVisible().call(this)) { return; }
      var fbls = new RegExp("fbls_" + Me.fbKey + "=");
      //this is a very odd cookie error case according to old git commit logs
      if (!FbMe.isfb().call(this) && // upgrade
          document.cookie.match(/viewer=\d+/) &&
          document.cookie.match(fbls) &&
          !document.cookie.match(/_ls_lc=1/)) {
        document.cookie = '_ls_lc=1';
        window.location='https://login.livingsocial.com/logout/?return_to=http://livingsocial.com/deals'
        return;
      }

      if (FbMe.isfb().call(this)) {
        FB.api('/me', function(response) {
          if (response.error && FbMe.appearsLoggedIn) {
            //old idea was logout then reload been commented out for awhile, removing the JS logout code
            return;
          }
          FbMe.uid = response.id;
          (function setDisplayName() {
            if ($("#facebook_display_name").length == 0) {
              setTimeout(setDisplayName, 100);
            }
            else {
              //9 chars + the &nbsp; which is included in the html() response
              if($('#my-account-handle .name') && ($('#my-account-handle .name').html().match(/\.\.\./) || $('#my-account-handle .name').html().length <= 9)) {
                $("#facebook_display_name").html(response.name);
              }
            }
          })();
        });
      }
    }
  }
  window.Me = Me;
  window.FbMe = FbMe;
  Stached._bind("url:/me/info.json", function(evt, ctx) {
    dls.mePresent = true;
    var local_me = ctx.body;
    dls.viewer = {
      loggedIn      : true,
      email         : local_me.email,
      isFBConnected : !!document.cookie.match(new RegExp("fbsr_" + Me.fbKey + "=")),
      preferredCity : local_me.city_id,
      subscriptions : local_me.subs
    };
    if(local_me.id instanceof Object) {
      dls.viewer.id = local_me.id()();
    } else {
      dls.viewer.id = local_me.id;
    }
  });

})();
;(function(){
  var _events = [],
      _cachedData = false,
      _fetching = false;
      
  MeInfo = {
    bind: function(callback){
      _events.push(callback);
      if(_cachedData!=false) {
        callback(_cachedData);
      } else if(_fetching==false) {
        _fetching=true;
        _fetchURL();
      }
    },
    run: function() {
      _fetchURL();
    }
  }

  function _fetchURL(){
    if(Me.loggedIn()()) {
      var url = '/me/info.json?ttl=' + (new Date().getTime());
      var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          _cachedData = {body: JSON.parse(xhr.responseText), status: xhr.status};
          _trigger();
        }
      }
      xhr.open('GET', url);
      xhr.send();
    }
  }

  function _trigger(){
    if (_events.length==0) { return; }
    for (var i = 0, len = _events.length; i < len; ++i) {
      _events[i](_cachedData);
    }
  }

  window.MeInfo = MeInfo;
}());;(function(){

  var context, host, protocol;

  var defaultPath = 'services/journal/v1/store',

      // The defaults that get sent in jounal events, and can be overridden on
      // the Journal object, or with each tracked event.
      defaultData = {bucketId: 'default',
                     entityId: 'default',
                     variationId: 'default',
                     userId: '',
                     eventId: ''};

  var servicePath = '',
      serviceUrl = '',

      // The configured event data for the global Journal object.
      eventData = merge({}, defaultData);


  setContext(window);


  /*
   * This is the Journal interface.
   */
  window.Journal = {
    setContext: setContext,
    setServicePath: setServicePath,
    configure: configure,
    trackEvent: trackEvent,
    newTrackerFunction: newTrackerFunction
  }


  /*
   * Set the context for the journal client. Defaults to window. Pass in a
   * window-like object to override.
   */
  function setContext(newContext){
    context = newContext;
    host = context.location.host;
    protocol = context.location.protocol;

    setServicePath(servicePath);
  }

  /*
   * Pass in a full URL to be used to track all journal events. NOTE: this sets
   * the url for all journal tracking.
   */
  function setServicePath(path){
    servicePath = path.replace(/^\//, '') || defaultPath;
    serviceUrl = protocol + '//' + host + '/' + servicePath;
  }

  /*
   * Configure the global Journal object. This will make all tracked events use
   * the configuration passed in. NOTE: Calling this function will overwrite any
   * previous configurations.
   *
   * Configuration options:
   *
   *  bucketId
   *  entitiyId
   *  variationId
   *  userId
   *  event
   */
  function configure(options){
    eventData = merge({}, defaultData, options);
  }

  /*
   * Post an event to the journal service. Optionally pass in overrides to the
   * configuration.
   *
   * Arguments:
   *
   * @event: String, event name to post to journal
   *
   * @options: Object, one-time configuration overrides, see `configure` for
   * available options
   *
   */
  function trackEvent(eventId, options) {
    var request = new context.XMLHttpRequest,
        data = merge({}, eventData, options, {eventId: eventId}),
        jsonData = JSON.stringify([data]);

    request.open('post', serviceUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(jsonData);
  }

  /*
   * Create a custom configured tracking function. Use this if there are more
   * than one tracker configurations in the same context. This function takes
   * the same configuration object as `configure` and returns a function with
   * the same signature as `trackEvent`, but uses the local configuration.
   *
   * Arguments:
   *
   * @config: Object, the same configuration object as `configure`
   *
   * Usage:
   *
   *    var config = {bucketId: 'myBucket', variationId: 'myVariation'},
   *        trackMyEvent = Journal.newTrackerFunction(config);
   *
   *    trackMyEvent('someEvent', {userId: 1});
   *
   *    => POST {"bucketId":"myBucket","entityId":"default",
   *             "variationId":"myVariation","userId":1,"eventId":"someEvent"}
   *
   */
  function newTrackerFunction(config){
    var localDefaultData = merge({}, defaultData, config);

    return function(eventId, options){
      var localEventData = merge({}, localDefaultData, options);
      trackEvent(eventId, localEventData);
    };
  }


  /*
   * Utilities
   */

  function merge(obj){
    var i, l, k, temp,
        args = arguments;

    for(var i = 1, length = args.length; i < length; i++){
      temp = args[i];
      if(typeof temp === 'object')
        for(k in temp)
          obj[k] = temp[k];
    }

    return obj;
  }


// JSON shim for IE7
var JSON;JSON||(JSON={});
(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();

}());
;