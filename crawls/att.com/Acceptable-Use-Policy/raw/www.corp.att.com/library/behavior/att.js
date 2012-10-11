/*
 * AT&T Web Standards Initiative <wsi at att dot com>
 * Joe D'Andrea and Vincent Murphy
 *
 * $Id: att.js,v 1.24 2005/05/04 13:55:41 jdandrea Exp $
 *
 * Behavior Library
 */

/* Super-big tip-of-the-hat: http://v2studio.com/k/code/ (v0.5.70) */

Array.prototype.indexOf = function(value, start, strict) {
    start = start || 0;
    for (var i=start; i<this.length; i++) {
        var item = this[i];
        if (strict            ? item === value   :
            isRegexp(value)   ? value.test(item) :
            isFunction(value) ? value(item)      :
            item == value)
            return i;
    }
    return -1;
}

Array.prototype.find = function(value, start, strict) {
    var i = this.indexOf(value, start, strict);
    if (i != -1) return this[i];
    return null
}

Array.prototype.contains = function(value,strict) {
    return this.indexOf(value,0,strict) !== -1;
}

Array.prototype.has     = Array.prototype.contains;

Array.prototype.include = Array.prototype.contains;

Array.prototype.count = function(value, strict) {
    var pos, start = 0, count = 0;
    while ((pos = this.indexOf(value, start, strict)) !== -1) {
        start = pos + 1;
        count++;
    }
    return count;
}

Array.prototype.remove = function(value,all,strict) {
    while (this.contains(value,strict)) {
        this.splice(this.indexOf(value,0,strict),1);
        if (!all) break
    }
    return this;
}

Array.prototype.merge = function() {
    var a = [];
    for (var i=0; i<arguments.length; i++)
        for (var j=0; j<arguments[i].length; j++)
            a.push(arguments[i][j]);
    for (var i=0; i<a.length; i++) this.push(a[i]);
    return this
}

Array.prototype.min = function() {
    if (!this.length) return;
    var n = this[0];
    for (var i=1; i<this.length; i++) if (n>this[i]) n=this[i];
    return n;
}

Array.prototype.max = function() {
    if (!this.length) return;
    var n = this[0];
    for (var i=1; i<this.length; i++) if (n<this[i]) n=this[i];
    return n;
}

Array.prototype.first = function() { return this[0] }

Array.prototype.last = function() { return this[this.length-1] }

Array.prototype.sjoin = function() { return this.join(' ') }

Array.prototype.njoin = function() { return this.join('\n') }

Array.prototype.cjoin = function() { return this.join(', ') }

Array.prototype.equals = function(a, strict){
    if (this==a) return true;
    if (a.length != this.length) return false;
    return this.map(function(item,idx){
        return strict? item === a[idx] : item == a[idx]
    }).all();
}

Array.prototype.all = function(fn) {
    return filter(this, fn).length == this.length;
}

Array.prototype.any = function(fn) {
    return filter(this, fn).length > 0;
}

Array.prototype.each = function(fn) { return each(this, fn) }

Array.prototype.map = function(fn) { return map(this, fn) }

Array.prototype.filter = function(fn) { return filter(this, fn) }

Array.prototype.select = Array.prototype.filter

Array.prototype.reduce = function() {
    var args = map(arguments);
    fn = args.pop();
    d  = args.pop();
    return reduce(this, d, fn); 
}

Array.prototype.inject = Array.prototype.reduce

function __strfn(args, fn) {
    function quote(s) { return '"' + s.replace(/"/g,'\\"') + '"' }
    if (!/\breturn\b/.test(fn)) {
        fn = fn.replace(/;\s*$/, '');
        fn = fn.insert(fn.lastIndexOf(';')+1, ' return ');
    }
    return eval('new Function('
        + map(args.split(/\s*,\s*/), quote).join()
        + ','
        + quote(fn)
        + ')'
        );
}

function each(list, fn) {
    if (typeof(fn)=='string') return each(list, __strfn('item,idx,list', fn));
    for (var i=0; i < list.length; i++) fn(list[i], i, list);
}

function map(list, fn) {
    if (typeof(fn)=='string') return map(list, __strfn('item,idx,list', fn));

    var result = [];
    fn = fn || function(v) {return v};
    for (var i=0; i < list.length; i++) result.push(fn(list[i], i, list));
    return result;
}

function combine() {
    var args   = map(arguments);
    var lists  = map(args.slice(0,-1),'map(item)');
    var fn     = args.last();
    var toplen = map(lists, "item.length").max();
    var vals   = [];

    if (!fn) fn = function(){return map(arguments)};
    if (typeof fn == 'string') {
        if (lists.length > 26) throw 'string functions can take at most 26 lists';
        var a = 'a'.charCodeAt(0);
        fn = __strfn(map(range(a, a+lists.length),'String.fromCharCode(item)').join(','), fn);
    }

    map(lists, function(li) {
        while (li.length < toplen) li.push(null);
        map(li, function(item,ix){
            if (ix < vals.length) vals[ix].push(item);
            else vals.push([item]);
        });
    });

    return map(vals, function(val) { return fn.apply(fn, val) });
}

function filter(list, fn) {
    if (typeof(fn)=='string') return filter(list, __strfn('item,idx,list', fn));

    var result = [];
    fn = fn || function(v) {return v};
    map(list, function(item,idx,list) { if (fn(item,idx,list)) result.push(item) } );
    return result;
}

function reduce(list, initial, fn) {
    if (undef(fn)) {
        fn      = initial;
        initial = window.undefined; 
    }
    if (typeof(fn)=='string') return reduce(list, initial, __strfn('a,b', fn));
    if (isdef(initial)) list.splice(0,0,initial);
    if (list.length===0) return false;
    if (list.length===1) return list[0];
    var result = list[0];
    var i = 1;
    while(i<list.length) result = fn(result,list[i++]);
    return result;
}

function isAlien(a)     { return isObject(a) && typeof a.constructor != 'function' }

function isArray(a)     { return isObject(a) && a.constructor == Array }

function isBoolean(a)   { return typeof a == 'boolean' }

function isFunction(a)  { return typeof a == 'function' }

function isNull(a)      { return typeof a == 'object' && !a }

function isNumber(a)    { return typeof a == 'number' && isFinite(a) }

function isObject(a)    { return (a && typeof a == 'object') || isFunction(a) }

function isRegexp(a)    { return a && a.constructor == RegExp }

function isString(a)    { return typeof a == 'string' }

function isUndefined(a) { return typeof a == 'undefined' }

/*
function isEmpty(o)     {
    var i, v;
    if (isObject(o)) {
        for (i in o) {
            v = o[i];
            if (isUndefined(v) && isFunction(v)) {
                return false;
            }
        }
    }
    return true;
}
*/

if (!Function.prototype.apply) Function.prototype.apply = function (o, a) {
    var r, x = '____apply';
    if (!isObject(o)) {
        o = {};
    }
    o[x] = this;
    switch ((a && a.length) || 0) {
    case 0:
        r = o[x]();
        break;
    case 1:
        r = o[x](a[0]);
        break;
    case 2:
        r = o[x](a[0], a[1]);
        break;
    case 3:
        r = o[x](a[0], a[1], a[2]);
        break;
    case 4:
        r = o[x](a[0], a[1], a[2], a[3]);
        break;
    case 5:
        r = o[x](a[0], a[1], a[2], a[3], a[4]);
        break;
    case 6:
        r = o[x](a[0], a[1], a[2], a[3], a[4], a[5]);
        break;
    default:
        alert('Too many arguments to apply.');
    }
    delete o[x];
    return r;
}

if (!Array.prototype.pop) Array.prototype.pop = function () {
    return this.splice(this.length - 1, 1)[0];
}

if (!Array.prototype.push) Array.prototype.push = function() {
    for (var i=0; i<arguments.length; i++) this[this.length] = arguments[i];
    return this.length;
}

if (!Array.prototype.shift) Array.prototype.shift = function () {
    return this.splice(0, 1)[0];
}

if (!Array.prototype.splice) Array.prototype.splice = function (s, d) {
    var max = Math.max,
        min = Math.min,
        a = [], 
        e,  
        i = max(arguments.length - 2, 0),   
        k = 0,
        l = this.length,
        n,  
        v,  
        x;  

    s = s || 0;
    if (s < 0) {
        s += l;
    }
    s = max(min(s, l), 0);  
    d = max(min(isNumber(d) ? d : l, l - s), 0);    
    v = i - d;
    n = l + v;
    while (k < d) {
        e = this[s + k];
        if (!isUndefined(e)) {
            a[k] = e;
        }
        k += 1;
    }
    x = l - s - d;
    if (v < 0) {
        k = s + i;
        while (x) {
            this[k] = this[k - v];
            k += 1;
            x -= 1;
        }
        this.length = n;
    } else if (v > 0) {
        k = 1;
        while (x) {
            this[n - k] = this[l - k];
            k += 1;
            x -= 1;
        }
    }
    for (k = 0; k < i; ++k) {
        this[s + k] = arguments[k + 2];
    }
    return a;
}

if (!Array.prototype.unshift) Array.prototype.unshift = function () {
    this.splice.apply(this,
        [0, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
}

if ( /^function\s*\(\s*\)\s*\{\s*\}$/.test('a'.replace(/a/,function(){})) ) {
    String.prototype.replace_ = String.prototype.replace;
    String.prototype.replace = function(rx, rf) { 
        if (isFunction(rf)) {
            var s = this,
                r,   
                rfv, 
                replaceList = [];
            while ((r=rx.exec(s))!==null) {
                rfv = rf.apply(rf, map(r).concat([r.index, s]));
                replaceList.push({ start: r.index, length: r[0].length, value: rfv });
                if (!rx.global) break;
            }
            for (var i=replaceList.length-1; i>=0; i--) {
                var rli = replaceList[i];
                s = s.splice(rli.start, rli.length, rli.value);
            }
            return s;
        } else return this.replace_(rx, rf);
    }
}

String.prototype.trimLeft = function() { return this.replace(/^\s+/,'') }

String.prototype.trimRight = function() { return this.replace(/\s+$/,'') }

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,'') }

String.prototype.insert = function(idx,value) { return this.slice(0,idx) + value + this.slice(idx) }

String.prototype.strip = function(idx1,idx2) {
    if (arguments.length==1) idx2 = this.length;
    return this.slice(0,idx1) + this.slice(idx2);
}

String.prototype.splice = function(idx,count,value) { return this.strip(idx, idx+count).insert(idx, value) }

String.prototype.subArgs = function() { return this.subDict(map(arguments)) }

String.prototype.subDict = function(dict) {
    var
        parts = this.split('{'),
        r = parts[0],
        part, ci, k, v;
    for (var i = 1; i < parts.length; i++) {
        part = parts[i];
        ci   = part.indexOf('}');
        k    = part.substring(0,ci);
        v    = dict[k];
        r   += isdef(v) ? v + part.substring(ci+1) : '{' + part;
    }
    return r;
}

String.prototype.subn = function(d) {
    if (arguments.length > 1 || !isObject(arguments[0])) d = map(arguments);
    return this.subDict(d);
}

String.prototype.wrap = function(left,right) {
    if (undef(left)) throw 'S.wrap takes 1 argument (none given)';
    if (undef(right)) right = left;
    return left + this + right;
}

String.prototype.quote = function() { return this.wrap('"') }

String.prototype.squote = function() { return this.wrap("'") }

String.prototype.pad = function(side, len, chr) {
    if (undef(chr)) chr = ' ';
    var s = this;
    var left = side.toLowerCase()=='left';
    while (s.length<len) s = left? chr + s : s + chr;
    return s;
}

String.prototype.padLeft = function(len, chr) { return this.pad('left',len,chr) }

String.prototype.padRight = function(len, chr) { return this.pad('right',len,chr) }

String.prototype.zerofill = function(len) {
    var s = this;
    var ix = /^[+-]/.test(s) ? 1 : 0;
    while (s.length<len) s = s.insert(ix, '0');
    return s;
}

String.prototype.isEmpty = function(donttrim) { return !(donttrim? this : this.trim()).length }

function undef(v) { return  isUndefined(v) }

function isdef(v) { return !isUndefined(v) }

function cmp(a,b) { return a<b?-1:a==b?0:1 }

function list(s, sep) {
    if (!isString(sep) && !isRegexp(sep))
        sep = sep? ',' : /\s*,\s*/;
    return s.split(sep);
}

function range(start,stop,step) {
    if (isUndefined(stop)) return range(0,start,step);
    if (isUndefined(step)) step = 1;
    var ss = (step/Math.abs(step)); 
    var r = [];
    for (i=start; i*ss<stop*ss; i=i+step) r.push(i);
    return r;
}

function maprange(start, stop, fn) {
    if (arguments.length==2) return maprange(0, start, stop);
    if (arguments.length!=3) throw "maprange takes 2 or 3 arguments";
    return map(range(start,stop), fn);
}

function isList(o) { return o && isObject(o) && (isArray(o) || o.item) }

function isElement(o, strict) {
    return o && isObject(o) && ((!strict && (o==window || o==document)) || o.nodeType == 1)
}

function getElem(el) {
    var ge = (document.getElementById && function(id){return document.getElementById(id)} ) ||
             (document.all && function(id){return document.all[id]} ) ||
             function(){return null};
    return isElement(el)? el : isString(el) ? ge(el) : null;
}

function getElemList(el) {
    if      (isElement(el)) return [el];
    else if (isString(el) ) return getElemList(el.split(/\s+/g)); 
    else if (isList(el)   ) {
        var r = map(el, getElem);
        return filter(r, isElement).length==r.length? r : null;
    }
    else return null;
}

function filterElementNodes(nodeList, tagName) {
    return filter(nodeList, function(n){
        
        
        
        
        return n.nodeType==1 && n.nodeName!='!' && 
               (undef(tagName) || tagName == '*' || n.nodeName.toUpperCase()==tagName.toUpperCase())
    })
}

function getAll(tagName, parent) {
    parent = isdef(parent)? getElem(parent) : document;
    if (undef(tagName)) tagName = '*';
    var r = parent.getElementsByTagName(tagName);
    
    return r.length || tagName != '*'?  map(r) :
        reduce(filterElementNodes(parent.childNodes), [], function(l,c){
            return l.merge([c], getAll(tagName, c))
        })
}

function getElementsByClass(className, tagName, parentNode) {
    
    
    
    var noClassTags = list('#comment,BASE,BASEFONT,HEAD,HTML,META,PARAM,SCRIPT,STYLE,TITLE');
    return filter(getAll(tagName,parentNode),
        function(elem) {
            return !noClassTags.include(elem.nodeName) && hasClass(elem, className) 
        });
}

getElementsByClassName = getElementsByClass;

function hasClass(elem, className) {
    return getElem(elem).className.split(' ').count(className);
}

function remClass(elem, className, all) {
    elem = getElem(elem);
    elem.className = elem.className.split(' ').remove(className,all).join(' ');
}

function addClass(elem, className, allowDuplicates) {
    elem = getElem(elem);
    if (!allowDuplicates && elem.className.split(' ').contains(className)) return;
    elem.className += (elem.className.length?' ':'') + className;
}

function swapClass(e,c) {
    if (hasClass(e,c)) remClass(e,c); else addClass(e,c);
    return !!hasClass(e,c);
}

function condClass(e,c,cond) { (cond?addClass:remClass)(e,c) }

function insertBefore(newChild, refChild) {
    return refChild.parentNode.insertBefore(newChild, refChild);
}

function insertAfter(newChild, refChild) {
    if (refChild.nextSibling) insertBefore(newChild, refChild.nextSibling);
    else refChild.parentNode.appendChild(newChild);
    return newChild;
}

var ALLOW_LEGACY_EVENTS = true;

function getEventModel() {
    var d = document;
    return d.addEventListener? 'DOM' :
           d.attachEvent     ? 'IE'  :
                               'legacy';
}

function IE_Event(currentTarget) {
    this.currentTarget   = currentTarget;
    this.preventDefault  = function() { window.event.returnValue  = false }
    this.stopPropagation = function() { window.event.cancelBubble = true }
    this.target  = window.event.srcElement;
    var self = this;
    
    list('altKey,ctrlKey,shiftKey,clientX,clientY').map(function(p){ self[p] = event[p] });
    return this;
}

function Legacy_Event(currentTarget) {
    this.currentTarget   = currentTarget;
    return this;
}

function addEvent(els, ev, fn, capture) {
    if (!ALLOW_LEGACY_EVENTS && getEventModel()=='legacy') return false;
    if (undef(capture)) capture = true;
    function DOM_addEvent   (el, ev, fn, capture) { el.addEventListener(ev, fn, capture) }
    function legacy_addEvent(el, ev, fn) {
        var evn = 'on'+ev;
        if (!el[evn] || undef(el[evn].handlers)) {
            el[evn] = function() {
                map(el[evn].handlers, function(h){  h( new (el.attachEvent?IE_Event:Legacy_Event)(el) ) });
            }
            el[evn].handlers = [];
        }
        el[evn].handlers.push(fn);
    }
    var addEventFn = getEventModel()=='DOM'? DOM_addEvent : legacy_addEvent;
    map(getElemList(els), function(el) { addEventFn(el, ev, fn, capture) });
}

function remEvent(els, ev, fn, capture) {
    if (!ALLOW_LEGACY_EVENTS && getEventModel()=='legacy') return false;
    if (undef(capture)) capture = true;
    map(getElemList(els), function(el) {
        if(getEventModel()=='DOM') el.removeEventListener(ev, fn, capture);
        else el['on'+ev].handlers.remove(fn);
    });
}

function addEventDict(els, evDict, capture) {
    for (ev in evDict) addEvent(els, ev, evDict[ev], capture);
}

function addLoadEvent(fn) {
    
    var w = getEventModel()=="DOM" && !window.addEventListener ? document : window;
    return addEvent(w, 'load', fn, true)
}


/* Additional helper functions/prototypes */

function ifdef(v,alt){return isdef(v)?v:alt;};
String.prototype.dirname=function(){return(this=='/'?'/':this.substring(0,this.lastIndexOf('/')));};
String.prototype.dirtop=function(){return this.split('/')[1];};
String.prototype.uritop=function(){return(this.substring(0,this.indexOf('/',this.indexOf('//')+2)));};
String.prototype.uridirtop=function(){return(this.substring(0,this.indexOf('/',this.indexOf('/',this.indexOf('//')+2)+1)+1));};
String.prototype.uridir=function(){return(this.touri().dirname());};
Function.prototype.getName=function(){return this.toString().split(' ')[1].split('(')[0];};
String.prototype.touri=function(){var u=document.URL;if(this.substring(0,4)=='http'){return this;}else if(this.substring(0,1)=='/'){return(u.uritop()+this);}else{return(u.dirname()+this);}};
String.prototype.stripJSessionID=function(){
  return this.replace(/;jsessionid=[^?]+/,'');
};

function getMetaContentByName(n,d){if (document.getElementsByTagName) {var e=document.getElementsByTagName('meta');if(!isdef(e))return d;for (var i=0;i<e.length;i++) {if (e[i].name==n) {return e[i].content;}}return d;}}
function getMetaContentByNamePrefix(p,m) {
  var vi, v, vv;
  if (arguments.length!=2) throw "getMetaContentByNamePrefix takes 2 arguments";
  var e = document.getElementsByTagName('meta');
  for (var i=e.length;--i>-1;) {
    vi = e[i].name.lastIndexOf('-');
    v  = e[i].name.substring(0, vi);
    vv = e[i].name.substring(vi+1);
    if (v.length > 1 && v == p && vv.length > 0) { m[vv] = e[i].content; }
  }
}

function attSetStatus(s){window.status=s;return true;}
function attClearStatus(){window.status='';}

/* TODO: Replace this so we don't need embedded js in the page */
function ga(o,e){if (document.getElementById){a=o.id.substring(1); p = ""; r = ""; g = e.target;if (g) { t = g.id;f = g.parentNode;if (f) {p = f.id;h = f.parentNode;if (h) r = h.id;}} else{h = e.srcElement;f = h.parentNode; if (f) p = f.id;t = h.id;}if (t==a || p==a || r==a) return true;location.href=document.getElementById(a).href}}

/* Tip-of-the-hat: http://www.htmldog.com/articles/suckerfish/hover/ */
function sfHover() {
  var els = new Array("dt", "li", "tr");
  for (var e = 0; e<els.length; e++) {
    var sfEls = document.getElementsByTagName(els[e]);
    for (var i=0; i<sfEls.length; i++) {
      sfEls[i].onmouseover=function() { addClass(this, "sfhover"); }
      sfEls[i].onmouseout=function() { remClass(this, "sfhover"); }
    }
  }
  return true;
}

/* Hat-tip: http://jibbering.com/2002/4/httprequest.html */
var xmlhttp;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
    xmlhttp = false;
  }
}
@else
xmlhttp = false;
@end @*/
if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
  try {
    xmlhttp = new XMLHttpRequest();
  } catch (e) {
    xmlhttp = false;
  }
}

// Hat-tip: http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) { createCookie(name,"",-1); }
function testCookie() {
  createCookie('attTestCookie','1',0);
  var test = readCookie('attTestCookie');
  if (!test || test != '1') {
    return false;
  } else {
    eraseCookie('attTestCookie');
    return true;
  }
}

// Tip-of-the-hat: http://www.mikeindustries.com/
function attForceRedraw() {
  var d = document;
  if (d.body && d.body.style) {
    d.body.style.height = "1px";
    d.body.style.height = "auto";
  }
}

// Table Behavior
function attTableInit() {

  // Hat-tip: http://www.alistapart.com/articles/zebratables/
  // Hey kids! Who wants to be Heath Ledger? (Pick me! Ooh! Pick me!)
  var table = getElementsByClass('ledger', 'TABLE');
  if (table) {
    // Iterate through candidate tables, tbodys, rows and cells
    for (var t = 0; t < table.length; t++) {
      var even = false;
      var tbody = table[t].getElementsByTagName("tbody");
      for (var b = 0; b < tbody.length; b++) {
        var tr = tbody[b].getElementsByTagName("tr");
        for (var i = 0; i < tr.length; i++) {
          var td = tr[i].getElementsByTagName("td");
          for (var j = 0; j < td.length; j++) {
            addClass(td[j], even ? "even" : "odd");
          }
          even = !even;
        }
      }
    }
  }
}

/* Navigation Behavior */
function navigationInit() {
  /* Explicit selection via metadata? */
  var sel = getMetaContentByName('navigation-select');
  var url = isdef(sel)?sel.trim().touri().stripJSessionID():'';

  /* Use the current URL */
  if (url == '') { url = document.URL.stripJSessionID(); }

  /* If we've got DOM, have at it ... */
  if (url != '') {
    var utilitymatch = false;
    var e = getAll('div', document);

    /* Give utility nav priority */
    for (var i=0; i<e.length; i++) {
      if (hasClass(e[i], 'utility')) {
        /* Remove from array and re-insert at the start */
        var u = e[i]; e.remove(u); e.unshift(u);
      }
    }

    for (var i=0; i<e.length; i++) {
      if (hasClass(e[i], "autoselect") && hasClass(e[i], "navigation")) {
        // TODO: Make sure this exists before testing it! (normally it does)
        var region = e[i].parentNode.parentNode;

        // Title and index region nav only
        // Index region nav is skipped if utility nav already matched
        if (region == getElem("title")) { region = "title"; }
        else if (hasClass(region, "index") && !utilitymatch) { region = "index"; }
        else { continue; }

        var a = e[i].getElementsByTagName('a');

        var item = null;     /* examined nav item */
        var best = null;     /* best overall nav anchor */
        var best_obj = null; /* best overall nav object */
        var exact = false;   /* exact match */

        /* For each item in the nav */
        for (var j=0; j<a.length && exact == false; j++) {
          item = a[j].href.stripJSessionID();

          if (best != null) {
            /* high-pass filter (items greater than best length) */
            if (item.length<=best.length) { continue; }

            /* low-pass filter (items less than or equal to url length) */
            if (item.length>url.length) { continue; }

            /* notch filter? (file items are exact match by definition) */
            /* (somehow I think the length test is superfluous here) */
            if (item.substring(item.length-1)!='/' && item.length<url.length) { continue; }
          }

          /* Look for the current nav item within our url */    
          if (url.indexOf(item) == 0) {
            best = item; best_obj = a[j];
            if (url.length == item.length) { exact = true; }
          }
        }

        /* Do we have a winner? */
        if (best_obj != null) {
          /* Select it! */
          var p = best_obj.parentNode; addClass(p, "selected");
          var c = p.childNodes;
          for (var n=0; n<c.length; n++) {
            if (c[n].nodeName == "UL") {
              addClass(c[n], "expanded");
              if (region == 'title') { addClass(e[i], "nested"); }
              break;
            }
          }

          /* Disable link if an exact match and not explicitly set */
          if (exact && !isdef(sel)) {
            best_obj.href = "#";
            best_obj.removeAttribute('href');
          }

          /* Expand all parent lists */
          if (region == 'title' && p.parentNode.parentNode.parentNode.parentNode == e[i]) {
            addClass(e[i], "nested");
          }
          while (p.parentNode != e[i]) {
            p = p.parentNode;
            if (p.nodeName == "LI" && region == 'title') {
              addClass(p, 'selected');
            } else {
              /* TODO: Should always be a UL node */
              addClass(p, 'expanded');
            }
          }
          if (hasClass(e[i], "utility")) { utilitymatch = true; }
        }
      }
    }
  }
}

/* var attSidebarInitCalled = false; */
/* function attSidebarInit(){ */
/*   var sidebar = getElementsByClass('sidebar', 'DIV'); */
/*   if (!isdef(sidebar[0])) { return true; } */
/*   var content = getElementsByClass('content', 'DIV', sidebar[0]); */
/*   if (!isdef(content[0])) { return true; } */
/*   //var inc = "/library/local/include/sidebar_" + att_bu.id + ".html"; */
/*   var inc = "/library/local/include/sidebar.html"; */
/*   xmlhttp.open("GET", inc, true); */
/*   xmlhttp.onreadystatechange = function() { */
/*     if (!attSidebarInitCalled && xmlhttp.readyState == 4) { */
/*       attSidebarInitCalled = true; */
/*       content[0].innerHTML = xmlhttp.responseText + content[0].innerHTML; */
/*     } */
/*   } */
/*   xmlhttp.send(null); */
/*   return true; */
/* } */

var attDocInitCalled = false;
function attDocInit(){

/* Moving the title area */

/*   var main = getElementsByClass('main', 'DIV'); */
/*   if (!isdef(main[0])) { return true; } */
/*   var main_content = getElementsByClass('content', 'DIV', main[0]); */
/*   if (!isdef(main_content[0])) { return true; } */
/*   var title = getAll('H1', 'title'); */
/*   insertBefore(title[0], main_content[0].firstChild); */

/* Generate Business Unit Title */

/*   var index = getElementsByClass('index', 'DIV'); */
/*   if (!isdef(index[0])) { return true; } */
/*   var index_content = getElementsByClass('content', 'DIV', index[0]); */
/*   if (!isdef(index_content[0])) { return true; } */
/*                                       */
/*   var bu = document.createElement('div'); addClass(bu, 'businessunit'); */
/*   bu.innerHTML = "<h2>"+att_bu.name+"</h2>"; */
/*   insertBefore(bu, index_content[0].firstChild); */

/* Generate Breadcrumbs */

/*   // var href = att_bu.href ? "<li> &gt; <a href=\""+att_bu.href+"\">"+att_bu.name+"</a></li>" : ""; */
/*   var href = att_bu.href ? "<li>&nbsp;&gt; " + att_bu.name + "</li>" : ""; */ 
/*   var breadcrumb = "<ul><li><a href=\"http://www.att.com/\">Home</a></li>"+href+"</ul>"; */
/*  var bc = document.createElement('div'); addClass(bc, 'navigation'); */
/*   bc.innerHTML = breadcrumb; insertBefore(bc, main_content[0]); */

/* Disable sIFR for group h2 */

  each(getElementsByClass('group', 'DIV'), function(item) {
    each(getAll('H2', item), function (item) {
      addClass(item, 'sIFR-replaced');
    });
  });
  
  return true;
}

var attGelInitCalled = false;
var att_bu = null;
function attGelInit(){
  if (!attGelInitCalled) {
    attGelInitCalled = true;
    att_bu = new Object();
    att_bu.id = 'def'; 
    att_bu.name = 'Default';
    getMetaContentByNamePrefix('att-bu', att_bu);
    
    /* TODO: Pick a default att_bu.id if never defined. */
    var sColor = {
      cor: "#810238",
      cus: "#f27d00",
      def: "#656565",
      ent: "#023f72",
      who: "#023f72",
      res: "#61bf1a",
      sma: "#0a94d6"
    }
    att_bu.color = sColor[att_bu.id] ? sColor[att_bu.id] : sColor ["def"];

/* Home Base */

    var sHREF = {
      cor: "http://www.att.com/",
      cus: "http://www.att.com/",
      def: "",
      ent: "http://www.att.com/",
      who: "http://www.att.com/",
      res: "http://www.att.com/",
      sma: "http://www.att.com/"
    }
    att_bu.href = sHREF[att_bu.id] ? sHREF[att_bu.id] : sHREF["def"];

    document.write('<link href="/library/style/' + att_bu.id + '/att.css" rel="stylesheet" type="text/css" />');
  }
  return true;
}
attGelInit();

var attInitCalled = false;
function attInit(){
  if (!attInitCalled) {
    attInitCalled = true;
    if (self.flashInit && isFunction(flashInit)) flashInit();
    // document.forms[0].q.focus();
    //  attSidebarInit();
    attDocInit();
    navigationInit();
    attTableInit();
    sfHover();
    attForceRedraw();
  }
  return true;
}
addLoadEvent(attInit);

