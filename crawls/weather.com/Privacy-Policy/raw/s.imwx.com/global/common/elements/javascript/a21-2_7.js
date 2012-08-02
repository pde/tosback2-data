// Enclose this in a function to make it into a "module".
(function() {


// Let's make JavaScript a bit more functional.
//
// Underscore.js 0.1.4
// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){var q=this,C=q._,m={},j=Array.prototype,n=Object.prototype,i=j.slice,D=j.unshift,E=n.toString,o=n.hasOwnProperty,s=j.forEach,t=j.map,u=j.reduce,v=j.reduceRight,w=j.filter,x=j.every,y=j.some,p=j.indexOf,z=j.lastIndexOf;n=Array.isArray;var F=Object.keys,c=function(a){return new l(a)};if(typeof module!=="undefined"&&module.exports){module.exports=c;c._=c}else q._=c;c.VERSION="1.1.4";var k=c.each=c.forEach=function(a,b,d){if(a!=null)if(s&&a.forEach===s)a.forEach(b,d);else if(c.isNumber(a.length))for(var e=
0,f=a.length;e<f;e++){if(b.call(d,a[e],e,a)===m)break}else for(e in a)if(o.call(a,e))if(b.call(d,a[e],e,a)===m)break};c.map=function(a,b,d){var e=[];if(a==null)return e;if(t&&a.map===t)return a.map(b,d);k(a,function(f,g,h){e[e.length]=b.call(d,f,g,h)});return e};c.reduce=c.foldl=c.inject=function(a,b,d,e){var f=d!==void 0;if(a==null)a=[];if(u&&a.reduce===u){if(e)b=c.bind(b,e);return f?a.reduce(b,d):a.reduce(b)}k(a,function(g,h,G){if(!f&&h===0){d=g;f=true}else d=b.call(e,d,g,h,G)});if(!f)throw new TypeError("Reduce of empty array with no initial value");
return d};c.reduceRight=c.foldr=function(a,b,d,e){if(a==null)a=[];if(v&&a.reduceRight===v){if(e)b=c.bind(b,e);return d!==void 0?a.reduceRight(b,d):a.reduceRight(b)}a=(c.isArray(a)?a.slice():c.toArray(a)).reverse();return c.reduce(a,b,d,e)};c.find=c.detect=function(a,b,d){var e;A(a,function(f,g,h){if(b.call(d,f,g,h)){e=f;return true}});return e};c.filter=c.select=function(a,b,d){var e=[];if(a==null)return e;if(w&&a.filter===w)return a.filter(b,d);k(a,function(f,g,h){if(b.call(d,f,g,h))e[e.length]=
f});return e};c.reject=function(a,b,d){var e=[];if(a==null)return e;k(a,function(f,g,h){b.call(d,f,g,h)||(e[e.length]=f)});return e};c.every=c.all=function(a,b,d){b=b||c.identity;var e=true;if(a==null)return e;if(x&&a.every===x)return a.every(b,d);k(a,function(f,g,h){if(!(e=e&&b.call(d,f,g,h)))return m});return e};var A=c.some=c.any=function(a,b,d){b=b||c.identity;var e=false;if(a==null)return e;if(y&&a.some===y)return a.some(b,d);k(a,function(f,g,h){if(e=b.call(d,f,g,h))return m});return e};c.include=
c.contains=function(a,b){var d=false;if(a==null)return d;if(p&&a.indexOf===p)return a.indexOf(b)!=-1;A(a,function(e){if(d=e===b)return true});return d};c.invoke=function(a,b){var d=i.call(arguments,2);return c.map(a,function(e){return(b?e[b]:e).apply(e,d)})};c.pluck=function(a,b){return c.map(a,function(d){return d[b]})};c.max=function(a,b,d){if(!b&&c.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};k(a,function(f,g,h){g=b?b.call(d,f,g,h):f;g>=e.computed&&(e={value:f,computed:g})});
return e.value};c.min=function(a,b,d){if(!b&&c.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};k(a,function(f,g,h){g=b?b.call(d,f,g,h):f;g<e.computed&&(e={value:f,computed:g})});return e.value};c.sortBy=function(a,b,d){return c.pluck(c.map(a,function(e,f,g){return{value:e,criteria:b.call(d,e,f,g)}}).sort(function(e,f){var g=e.criteria,h=f.criteria;return g<h?-1:g>h?1:0}),"value")};c.sortedIndex=function(a,b,d){d=d||c.identity;for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(b)?
e=g+1:f=g}return e};c.toArray=function(a){if(!a)return[];if(a.toArray)return a.toArray();if(c.isArray(a))return a;if(c.isArguments(a))return i.call(a);return c.values(a)};c.size=function(a){return c.toArray(a).length};c.first=c.head=function(a,b,d){return b&&!d?i.call(a,0,b):a[0]};c.rest=c.tail=function(a,b,d){return i.call(a,c.isUndefined(b)||d?1:b)};c.last=function(a){return a[a.length-1]};c.compact=function(a){return c.filter(a,function(b){return!!b})};c.flatten=function(a){return c.reduce(a,function(b,
d){if(c.isArray(d))return b.concat(c.flatten(d));b[b.length]=d;return b},[])};c.without=function(a){var b=i.call(arguments,1);return c.filter(a,function(d){return!c.include(b,d)})};c.uniq=c.unique=function(a,b){return c.reduce(a,function(d,e,f){if(0==f||(b===true?c.last(d)!=e:!c.include(d,e)))d[d.length]=e;return d},[])};c.intersect=function(a){var b=i.call(arguments,1);return c.filter(c.uniq(a),function(d){return c.every(b,function(e){return c.indexOf(e,d)>=0})})};c.zip=function(){for(var a=i.call(arguments),
b=c.max(c.pluck(a,"length")),d=Array(b),e=0;e<b;e++)d[e]=c.pluck(a,""+e);return d};c.indexOf=function(a,b,d){if(a==null)return-1;if(d){d=c.sortedIndex(a,b);return a[d]===b?d:-1}if(p&&a.indexOf===p)return a.indexOf(b);d=0;for(var e=a.length;d<e;d++)if(a[d]===b)return d;return-1};c.lastIndexOf=function(a,b){if(a==null)return-1;if(z&&a.lastIndexOf===z)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};c.range=function(a,b,d){var e=i.call(arguments),f=e.length<=1;a=f?0:e[0];
b=f?e[0]:e[1];d=e[2]||1;e=Math.max(Math.ceil((b-a)/d),0);f=0;for(var g=Array(e);f<e;){g[f++]=a;a+=d}return g};c.bind=function(a,b){var d=i.call(arguments,2);return function(){return a.apply(b||{},d.concat(i.call(arguments)))}};c.bindAll=function(a){var b=i.call(arguments,1);if(b.length==0)b=c.functions(a);k(b,function(d){a[d]=c.bind(a[d],a)});return a};c.memoize=function(a,b){var d={};b=b||c.identity;return function(){var e=b.apply(this,arguments);return e in d?d[e]:d[e]=a.apply(this,arguments)}};
c.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};c.defer=function(a){return c.delay.apply(c,[a,1].concat(i.call(arguments,1)))};var B=function(a,b,d){var e;return function(){var f=this,g=arguments,h=function(){e=null;a.apply(f,g)};d&&clearTimeout(e);if(d||!e)e=setTimeout(h,b)}};c.throttle=function(a,b){return B(a,b,false)};c.debounce=function(a,b){return B(a,b,true)};c.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments));return b.apply(this,
d)}};c.compose=function(){var a=i.call(arguments);return function(){for(var b=i.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};c.keys=F||function(a){if(c.isArray(a))return c.range(0,a.length);var b=[],d;for(d in a)if(o.call(a,d))b[b.length]=d;return b};c.values=function(a){return c.map(a,c.identity)};c.functions=c.methods=function(a){return c.filter(c.keys(a),function(b){return c.isFunction(a[b])}).sort()};c.extend=function(a){k(i.call(arguments,1),function(b){for(var d in b)a[d]=
b[d]});return a};c.clone=function(a){return c.isArray(a)?a.slice():c.extend({},a)};c.tap=function(a,b){b(a);return a};c.isEqual=function(a,b){if(a===b)return true;var d=typeof a;if(d!=typeof b)return false;if(a==b)return true;if(!a&&b||a&&!b)return false;if(a._chain)a=a._wrapped;if(b._chain)b=b._wrapped;if(a.isEqual)return a.isEqual(b);if(c.isDate(a)&&c.isDate(b))return a.getTime()===b.getTime();if(c.isNaN(a)&&c.isNaN(b))return false;if(c.isRegExp(a)&&c.isRegExp(b))return a.source===b.source&&a.global===
b.global&&a.ignoreCase===b.ignoreCase&&a.multiline===b.multiline;if(d!=="object")return false;if(a.length&&a.length!==b.length)return false;d=c.keys(a);var e=c.keys(b);if(d.length!=e.length)return false;for(var f in a)if(!(f in b)||!c.isEqual(a[f],b[f]))return false;return true};c.isEmpty=function(a){if(c.isArray(a)||c.isString(a))return a.length===0;for(var b in a)if(o.call(a,b))return false;return true};c.isElement=function(a){return!!(a&&a.nodeType==1)};c.isArray=n||function(a){return E.call(a)===
"[object Array]"};c.isArguments=function(a){return!!(a&&o.call(a,"callee"))};c.isFunction=function(a){return!!(a&&a.constructor&&a.call&&a.apply)};c.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};c.isNumber=function(a){return!!(a===0||a&&a.toExponential&&a.toFixed)};c.isNaN=function(a){return a!==a};c.isBoolean=function(a){return a===true||a===false};c.isDate=function(a){return!!(a&&a.getTimezoneOffset&&a.setUTCFullYear)};c.isRegExp=function(a){return!!(a&&a.test&&a.exec&&(a.ignoreCase||
a.ignoreCase===false))};c.isNull=function(a){return a===null};c.isUndefined=function(a){return a===void 0};c.noConflict=function(){q._=C;return this};c.identity=function(a){return a};c.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};c.mixin=function(a){k(c.functions(a),function(b){H(b,c[b]=a[b])})};var I=0;c.uniqueId=function(a){var b=I++;return a?a+b:b};c.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};c.template=function(a,b){var d=c.templateSettings;d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+
a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.interpolate,function(e,f){return"',"+f.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||null,function(e,f){return"');"+f.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";d=new Function("obj",d);return b?d(b):d};var l=function(a){this._wrapped=a};c.prototype=l.prototype;var r=function(a,b){return b?c(a).chain():a},H=function(a,b){l.prototype[a]=function(){var d=
i.call(arguments);D.call(d,this._wrapped);return r(b.apply(c,d),this._chain)}};c.mixin(c);k(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=j[a];l.prototype[a]=function(){b.apply(this._wrapped,arguments);return r(this._wrapped,this._chain)}});k(["concat","join","slice"],function(a){var b=j[a];l.prototype[a]=function(){return r(b.apply(this._wrapped,arguments),this._chain)}});l.prototype.chain=function(){this._chain=true;return this};l.prototype.value=function(){return this._wrapped}})();


/** 
 * Constants and local variables for A21 module.
 * These variables are defined for minimizer purposes. 
 */
// the window object
var win = window;

// The PCO object
var wx = win.wx;

// YUI's objects
var YAHOO_UTIL  = YAHOO.util;
var Get         = YAHOO_UTIL.Get;
var customEvent = YAHOO_UTIL.CustomEvent;

// The window.document.
var doc = win.document;

// This will be replaced by makeRequest-<version-number>.html
//var makeRequest = "MAKE_REQUEST_URL";
var makeRequest = "makeRequest-2_7.html";

// The actuall location of makerequest.
var mARURL = "/common/a21/" + makeRequest;

//URL for TagServer
var mCRURL = 
  "http://wxdata.weather.com/wxdata/ts/cfg/%pageid%.js?modeid=%modeid%&cb=%cb%&key=5f1a2e4a-87d1-11e0-ac1c-0019b9d6d44c";

// Beacon URL
var BEACON = "http://b.imwx.com/b/";


/**
 * ECMAScript 5's Object.create. It creates a new object. It also helps with 
 * prototypal inheritance with objects.  If the browser doesn't support it, it 
 * defines it so this library can use it. 
 */
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}


/**
 * This handles throwing of the beacons.
 */
var Beacon = {};
Beacon.beacons = [];

/**
 * Fires the error beacon
 *
 * @param {String} err        the error message
 * @param {String} position   position name
 * @param {String} doc        where to attach the beacon
 */
Beacon.fireErrorBeacon = function (err, position, doc) {
  var zone = A21.zone;
  var site = A21.site;
  var uri  = escape(win.location.href);
  var beaconKeywords = position ?  [ 'pageid=', wx.config.page.pageId, 
    '&position=', position, '&zone=', zone, '&site=', site, '&', 
    collectKeywords(position)].join('').replace(/;/g, '&') : '';

  Beacon.fireBeacon([BEACON, "error?type=ad&subtype=", err, "&rmid=", 
    wx.config.user.rmid, "&page=", uri, "&", beaconKeywords].join(''), doc);
};

/**
 * Fires a generic beacon. It attaches an image to the DOM. 
 *
 * @param {String} src  the url for the beacon
 * @param {String} dom where to attach the beacon
 */
Beacon.fireBeacon = function(src, dom) {
  // if dom isn't passed in, let's just attach the beacon to the parent
  // document body.
  var doc    = dom || document;
  var beacon = doc.createElement('img');
  var body   = doc.body;

  beacon.src           = src;
  beacon.style.display = "none";
  
  body && body.appendChild(beacon); 
};


/**
 * Defines Statemachine functionality.
 */
var StateMachine = { };

StateMachine.currentState = '';

// objects to hold the transitions from state to state. It's gonna be stored 
// like this:
// StateMachine.transitions = {
//   fromState1: toState1,
//   fromState2: toState2,
//   ...
//   };
StateMachine.transitions = {};

/**
 * Adds a transition
 * @param {String} fromState 
 * @param {String} toState
 */
StateMachine.addTransition = function(fromState, toState) {
  this.transitions[fromState] = toState;
};

/**
 * Set the state it should start from
 * @param {String} state  the name of the state you want to start from.
 */
StateMachine.setInitialState = function(state) {
  // make sure we haven't set a state already. Or else this wouldn't be 
  // an initial state. 
  if (this.currentState === '') {
    this.currentState = state;
  }
};

/**
 * Change to a state. If the newState's previous state is not the current 
 * state, it will not change the state. It will remain in the current state.
 *
 * @param {String} newState  
 */
StateMachine.changeStateTo = function(newState) {
  // make sure this is a valid transition before we change the state.
  if (this.transitions[this.currentState] === newState) {
    this.currentState = newState;
  }
};

/**
 * Events that is internal to this library. It is part of the flow of the ads 
 * registering and showing
 */
var MyEvents = {};

// These events act like normal events. pce stands for page controller events.
MyEvents.onTagServerFinish = new customEvent('pceTagServerFinish');
MyEvents.onParseFinished   = new customEvent('pceParseFinishOnce');
MyEvents.onMasterAdDone    = new customEvent('pceMasterAdDoneOnce');

// These are configured to fire once, the custom event will only notify 
// subscribers a single time regardless of how many times the event is fired. 
// In addition, new subscribers will be notified immediately if the event has 
// already been fired.
MyEvents.onParseFinishedFireOnce  = new customEvent('pceParseFinish', window, 
  true, customEvent.LIST, true);
MyEvents.onMasterAdDoneFireOnce   = new customEvent('pceMasterAdDone', window, 
  true, customEvent.LIST, true);




/**
 * Handles all the stuff that happens on the page itself. It determines what
 * type of page it is, it modifies the PCO, and so on.  
 */
var Page = {};

// is it a static or dynamic page?
Page.pageType = '';

// Some constants
Page.DYNAMIC_PAGE = 0;
Page.STATIC_PAGE  = 1;
Page.DESKTOP      = 2;


/**
 * Determines if the current page is dynamic.
 */
Page.isDynamicPage = function() {
  return this.pageType === this.DYNAMIC_PAGE;
};

/**
 * Determines if the current page is static.
 */
Page.isStaticPage = function() {
  return this.pageType === this.STATIC_PAGE;
};

/**
 * Figures out if the page is dynamic or static.
 */
Page.determinePageType = function() {
  // wx and wx.config objects better be in the page.
  var pcoExists = (wx && wx.config);
  var ad, page;

  // PCO must exist in all pages that want to use this lib.
  if (pcoExists) {
    ad   = wx.config.ad;
    page = wx.config.page;

    // if wx.config.ad.sequence is defined and has positions in it, then it must be a dynamic page
    if (ad && ad.sequence && ad.sequence.length > 0) { 
      this.pageType = this.DYNAMIC_PAGE; 
    
    // but if at least the pageId is set, then it's a static page. 
    } else if (page.pageId) { 
      this.pageType = this.STATIC_PAGE; 
    } else {
      Beacon.fireErrorBeacon('noPageConfigObject');  
    }
  // If PCO doesn't exists, something is wrong.
  } else {
    Beacon.fireErrorBeacon('noPageConfigObject');  
  }
};

/**
 * Refreshes the wx.config objects by calling TS again.
 */
Page.refresh = function() {
  var ad   = wx.config.ad;
  var page = wx.config.page;
  var mode = ad.mode || 'default';
  var cb   = 'wx.config.refreshTSData'; 
  
  Page.callTagserver(page.pageId, mode, cb);
};


/**
 * converts TagServer JSON to Wx.config object format.
 * @param   o   {Object}    the Tagserver object
 */
Page.translate = function(o) {
  /**
   * helper function to parse the LAYOUT object from TS.
   * @param {Object} layout  the LAYOUT object from TS.
   * @returns {Function}  this function will work with reduce() to gather all the positions.
   */ 
  function addPos(layout) {
    return function(o, p) {
      // we're creating a new wx.config.ad.positions object.
      // So the new wx.config.ad.positions.<position name> has to be a new object. 
      o[p] = {};

      // fill out wx.config.ad.positions.<position name>.sizes array in the PCO.
      o[p].sizes = (_.isArray(layout[p].size)) ?  layout[p].size : [layout[p].size];
      
      // fill out wx.config.ad.positions.<position name>.keywords array in the PCO.
      o[p].keywords = layout[p].keywords;

      return o;
    };
  }

  /**
   * removes the ad positions from TS and translate them into PCO format.
   * @param {Array}  positions  the LAYOUT.sequence array from TS.
   * @param {Object} layout     the LAYOUT object from TS.
   * @returns {Object} wx.config.ad.positions object.
   */
  function extractAdPositions(positions, layout) {
    return _.reduce(positions, addPos(layout), {});
  }

  var ad;
  var layout = o.LAYOUT;
  
  if (wx && wx.config && wx.config.ad) {
    ad           = wx.config.ad;
    ad.testSite  = o.test_keyword;
    ad.site      = o.prod_keyword;
    ad.zone      = o.zone;
    
    // copy all the LAYOUT's keywords into the keywords object.
    ad.keywords  = o.keywords.concat(layout.keywords); 
    ad.sequence  = layout.sequence;

    // let's fill out the wx.config.ad.positions object.
    ad.positions = extractAdPositions(wx.config.ad.sequence, layout);
    
    ad.ord       = getOrd();
  }
  // Fire the event letting the subscribes know we've finished translating the
  // TS data to PCO data.
  MyEvents.onTagServerFinish.fire(); 
};


/**
 * call the TS again. It is used when we refresh the ads.
 * @param   json    {Object}    the JSON object returned from TagServer
 */
Page.refreshTSData = window.wx.config.refreshTSData = function(json) {
  /**
   * Since we're refreshing the ads, we'll just call the notifyRegistered
   * again for all the positions.
   * @param {String} pos the position name.
   */
  function register(pos) {
    // if the position exists...
    if (!!$(pos)) {
      MyEvents.onParseFinished.subscribe(showPosition(pos, MyEvents.onMasterAdDone));
    } else {
      Beacon.fireErrorBeacon('missingPositions', pos);
    }
  }

  /**
   * Callback function if the TS call was successful.
   * @param {Object} json  the TS object.
   */ 
  function success(json) {
    var positions = json.LAYOUT.sequence;
    // go through all the positions and re-register them again.
    MyEvents.onTagServerFinish.subscribe(function() {
      _.each(positions, register);
      A21.changeStateTo('MASTER_AD');
      findKeywords();
    });

    // now we can translate the TS data into PCO data.
    Page.translate(json);
  }

  Page.callBackDo(json, success);
};

/**
 * Helper function for the Callback from tagserver
 * @param {Object}    json     the object from TagServer.
 * @param {Function}  success  the function to call if we got a valid JSON from 
 * TS.
 */
Page.callBackDo = function(json, success) {
  if (json && json['class'] !== 'error' && json.LAYOUT && json.LAYOUT.sequence) {
    success(json);
  } else {
    Beacon.fireErrorBeacon('noTagServerData');
  }
};

/**
 * callback function for TagServer call
 * @param   json    {Object}    the JSON object returned from TagServer
 */
Page.gotTSData = window.wx.config.gotTSData = function(json) {
  // this is simpler than the refresh because we don't need to 
  // re-register all the positions again. 
  Page.callBackDo(json, function(o) { Page.translate(o); });
};

/**
 * @param {String} pageId  the pageid for this page.
 * @param {String} mode    the modeid for this page.
 * @param {String} cb      the callback for TS
 */
Page.callTagserver = function(pageId, mode, cb) {
  Get.script(mCRURL.replace('%pageid%', pageId)
    .replace('%modeid%', mode).replace('%cb%', cb));
};

/**
 * Check if the page is in Debug Mode by seeing if the adstest cookie exists.
 */
Page.isDebugMode = function() {
  return !!YAHOO_UTIL.Cookie.get('adstest');
};



/**
 * A statemachine that handles the functionalities of each ad position.
 */
var Position = Object.create(StateMachine);
Position.isMaster = false;

// set up the state machine.
Position.setInitialState('UNREGISTERED');
Position.addTransition('UNREGISTERED', 'LOADING');
Position.addTransition('LOADING', 'DONE');

/**
 * resizes the ad to the correct shape 
 */
Position.resize = function() {
  function isHidden(pos) {
    var w = pos.actualSize.width;
    var h = pos.actualSize.height;
    
    return (w == 1 || h == 1 || w == 0 || h == 0);
  }

  var name       = this.name;
  var frameName  = name + "_frame";
  var actualSize = this.actualSize;
  var width      = isHidden(this) ? 0 : actualSize.width;
  var height     = isHidden(this) ? 0 : actualSize.height;
  var YUD        = YAHOO_UTIL.Dom;

  $(name).style.display = isHidden(this) ? 'none' : 'block';
  A21.adShown[name]     = isHidden(this) ? false : true;

  // resize the position and the position's frame.
  YUD.setStyle([frameName, name], "height", height + 'px');
  YUD.setStyle([frameName, name], "width",  width  + 'px');
  A21.onResize.fire({ position: name, height: height, width: width }); 
  
  // we finished resizing the ad, so everything is done. Fire the onFinish 
  // event. 
  A21.onFinish.fire({"position": name, "Positions": A21.positions, 
    "adVariables": A21.adVariables()});
};


/**
 * Creates the u string
 * @returns {String} the u keyword. 
 */
Position.uString = function() {
  var loc        = (wx && wx.config && wx.config.loc) || {};
  var famChanCat = A21.zone.split('/');
 
  return [
    'ord-'   , (A21.ord || 'nl'),
    '*tile-' , this.tile, 
    '*rmid-' , wx.config.user.rmid].join('');
};


/**
 * Adds the ad in the page and shows itself. It creates an iframe and puts it
 * in the position's div.
 */
Position.show = function() {
  function addKey(src) { 
    return src + '&key=' + A21.positions[name].key; 
  }
  
  var name = this.name;
  var src, keysrc;

  if ($(name)) {
    // check if the iframe's URL already has parameters on it.
    src = (mARURL.indexOf('?') < 0) ? (mARURL + '?pos=' + name) : 
      (mARURL + '&pos=' + name); 

    // add a unique key to get around Firefox's caching iframe bug.
    keysrc = src + '&key=' + A21.positions[name].key; 

    // create the iframe
    $(name).innerHTML = ['<iframe id="', name, 
      '_frame" frameBorder="0" scrolling="no" allowtransparency="true" ',
      'class="OASAdFrame" style="width: 1px; height: 1px" width="1" ',
      'height="1"></iframe>'].join('');

    // set the src to the iframe.
    $(name + '_frame').contentWindow.location.replace(keysrc);
  } else {
    Beacon.fireErrorBeacon('missingPositions', name);
  }
};


/**
 * This is the only "public" object. It exposes an API to the devs to register
 * positions, subscribe to events, etc.
 */
var A21 = win.A21 = Object.create(StateMachine);

// some states and transitions for ads2.1
A21.setInitialState('INIT');
A21.addTransition('INIT', 'MASTER_AD');
A21.addTransition('MASTER_AD', 'COMPANION_ADS');
A21.addTransition('COMPANION_ADS', 'DONE');
A21.addTransition('DONE', 'INIT');

// This object determines if the ad is either a grey.gif ad (not shown on page)
// or an actual ad (shown on the page)
A21.adShown = {};

// The positions for this page
A21.positions= {};

// Some common ad keywords
A21.zone = '';
A21.ord  = '';
A21.site = '';    

/**
 * Legacy functions that shouldn't do anything anymore
 * @deprecated
 */
A21.initDynamic = A21.initStatic = function() {};

/**
 * The start  time to calculate the ord
 */ 
A21.startTime = (new Date()).getTime();

// Custom A21 Events. 
A21.onParseConfig           = new customEvent('parseConfig');
A21.onParseFinished         = new customEvent('parseFinished', window, true, customEvent.LIST, true);
A21.onMasterAdDone          = new customEvent('masterAdDone', window, true, customEvent.LIST, true);
A21.onMasterAdDoneFireOnce  = new customEvent('masterAdDoneFireOnce');
A21.onWaitingForRefresh     = new customEvent('waitingForRefresh');

// These events fires for each ad position on the page. 
A21.onAdPositionStart  = A21.onAdStart = new customEvent('adStart');
A21.onAdPositionResize = A21.onResize  = new customEvent('resize');
A21.onAdPositionFinish = A21.onFinish  = new customEvent('finish');

/**
 * an object to store some common a21 keywords. It's here due to some legacy 
 * plugin code.
 * @deprecated.
 */
A21.adVariables = function() {
  return {
    "zone" : A21.zone,
    "ord"  : A21.ord,
    "site" : A21.site
  };
};


/**
 * Used primary by kickapps. It sets the path for makeRequest.html if it doesn't 
 * exist in the standard location (/common/a21).
 *
 * @param   {String}    path    the path where makeRequest.html resides.
 */
A21.setPath = function(path) {
  // check if there is a trailing slash ('/')  at the end of tha path and 
  // handle it accordingly.
  mARURL = path + (/\/$/.test(path) ? '' : '/') + makeRequest;
  return mARURL;
};

/**
 * Refreshes the page
 */
A21.refreshNew = A21.refresh = function() {
  unsubscribeAllEvents(); 
  A21.positions = {}; 
  A21.changeStateTo('INIT');
  Page.refresh();
};

/**
 * Called by MakeRequest. It retrieve all the keywords that a beacon needs. 
 * The Beacons are derived from the actual keywords for the position and other
 * data retrieved from the click-through URL.
 * 
 * @param   {String} posName The position's name
 * @returns {String} The keyword in this format: 
 *  key1=val1&key2=val2&...&keyN=valN
 */
A21.getBeaconKeywords = function(posName)
{
	var pos = A21.positions[posName];
	
	
	return [
		'u=', pos.u,
		'&site=', A21.site, 
		'&zone=', A21.zone, 
		'&tile=', pos.tile, 
		'&sz=', pos.sizes.join(','),
		'&pageid=',wx.config.page.pageId,
		collectBeaconKeywords(posName).replace(/;/g, '&')
	].join('');
};


function collectBeaconKeywords(posName) {
	  function checkLo(keyword) { return (/lo=/.test(keyword)) ? keyword : 'lo=' + keyword; }
	
	  function ordKeyword() { return "ord=" + A21.ord; }
	  
	  var pos              = A21.positions[posName] || {};
	  var ad               = wx.config.ad;
		var parentKeywords   = ad.keywords.join(';');
		var layoutKeywords   = ad.layout ? ';' + checkLo(ad.layout) : '';
		var sz               = pos.sizes || [];
		
	  
		// if it's in debug more, we have to pass in a special keyword to let the ads 
		// know we're in debug mode. 
		var debugKeyword     = debugMode() ?  'adstest=' + GetCookie('adstest') + ';' : '';

		
		

	  return [
	    layoutKeywords, 
	    pos.keywords, 
	    getWxKeywords(), 
	    getLocKeywords(), 
	    getUserKeywords(), 
	    parentKeywords, 
	    debugKeyword,
	    getMultipleValueKeywords()].join(';');
	}
	
/**
 * called by makeRequest when an ad position has finished processing.
 */
A21.finish = function(positionName) {
  // helper function to check if all positions are done.
  var isPositionDone = function(p) { return p.currentState === 'DONE'; }
  var position       = A21.positions[positionName];

  position.changeStateTo('DONE');

  // we check if all the positions are done so we can change A21's
  // state to DONE. Then it would be ready to be refreshed
  if (_.all(A21.positions, isPositionDone)) { 
    A21.changeStateTo('DONE');
    A21.onWaitingForRefresh.fire();  
  }
};



/**
 * fires the impression beacon. MakeRequest calls this
 *
 * @param  {String} keywords the keywords for the beacon
 * @param  {Object} doc      the document to attach the beacon
 */
A21.fireTrackingBeacon = function(keywords, doc) {
 
	 Beacon.fireBeacon([BEACON, "impression?",  keywords].join(''), doc);
};



/**
* Used primary by kickapps. It sets the document.domain
*
* @param   {String}    domain      the domain.
*/
A21.setDomain = function(domain) {
  document.domain = domain;
};

/**
 * Returns the doubleclick url with all the keywords and everything in it for a 
 * position.
 * @param   {String} position the position name
 * @returns {String} the url.
 */
A21.getDFPUrl = function(position) {
  var z    = A21.zone ? A21.zone : ';';
  var site = A21.site;
  
  return ['http://ad.doubleclick.net/adj/', site, '/', z, 
    collectKeywords(position)].join('');
};


/**
 * Checks if the position's ad exists.
 * @returns {Boolean} if the ad is shown on the page or not.
 */
A21.adExists = function(position) {
  return A21.adShown[position]; 
};
     
/**
 * MakeRequest calls this to store the iframe's body html. Useful for debugging 
 * creative codes 
 * @param  {String} position the position name
 * @param  {String} body     the document.body of the iframe.
 */    
A21.storeBody = function(position, body) {
  A21.positions[position].bodyHTML = body;
};

/**
 * MakeRequest calls this to store the size to a position.
 * @param {String} posName      the position name
 * @param {String} size         the size from the clickURL. It is in 
 *  'width/heigth' format.
 * @param {String} iframeWidth  width of the ad iframe
 * @param {String} iframeHeight height of the ad iframe
 */    
A21.storeSize = function(posName, size, iframeWidth, iframeHeight) {
  function extractSize(size) {
    var sizeArray = size.split('/');
    return { width: sizeArray[0], height: sizeArray[1] };
  }

  function calculateSize(position) {
    function noSize() {
      Beacon.fireErrorBeacon('noTagServerSizeDefined', posName);
      return { width: "0", height: "0" }; 
    }

    if (!(position.sizes && position.sizes[0])) { 
      return noSize(); 
    }  
    if (iframeWidth && iframeHeight) { 
      return getClosestSize(position.sizes, iframeWidth, iframeHeight); 
    } 
    return getBiggestSize(position.sizes);
  }
  var position = A21.positions[posName];

  position.actualSize = size ? extractSize(size) : calculateSize(position); 
};

/**
 * Called my MakeRequest if there is an error inside the iframe. 
 * Fires the error beacon.
 * @param  {String} err  the error message
 * @param  {String} pos  the position name
 * @param  {Object} doc  the html element to attach the beacon to.   
 */
A21.fireErrorBeacon = function(err, pos, doc) {
  Beacon.fireErrorBeacon(err, pos, doc);
};

/**
 * checks if the current key match the position.
 * @param {String} pos position name.
 * @param {String} key the key.
 * @returns {Boolean} if the key matches the position's key.
 */
A21.keysMatch = function(pos, key) {
  return (key) ? (A21.positions[pos].key == key) : true;
};

/**
 * Desktop's notifyRegistered. Since Desktop doesn't have a pageId when
 * it starts up, we cant do anything. So this function doesn't start loading
 * the ads.
 */
A21.notifyRegisteredNoLoad = function(positionName) { /* DO NOTHING */ };

/**
 * This is where it all starts. You should call this at each
 * position to register an ad position.
 */
A21.notifyRegistered = function(positionName) {
  // if this is the first time this function is being called, we have to
  // process all the keywords.
  if (A21.currentState === 'INIT') {
    A21.changeStateTo('MASTER_AD');
    processPositions();
  }
   
  // We now wait until PCO processing has been finished. When it's finished,
  // we can show the ad in the position. 
  MyEvents.onParseFinishedFireOnce.subscribe(showPosition(positionName, MyEvents.onMasterAdDoneFireOnce));
};

/**
 * Called by makeRequest. Tells the position to resize, which will transition the position to the "done" state.
 * @param {String} position the position to resize.
 */
A21.setSize = function(positionName) {
  A21.positions[positionName].resize();
};


/**
 * Called by makeRequest. It calls this when the master ad position (tile 1) 
 * has finished processing.
 */
A21.finishMaster =function() {
  A21.changeStateTo('COMPANION_ADS');
  MyEvents.onMasterAdDone.fire();
  MyEvents.onMasterAdDoneFireOnce.fire();
};

/** 
 * Everything STARTS HERE. It determines the page type and calls TS if we need 
 * to. This is called at the bottom of this script to do some 
 * pre-configurations.  
 * 
 * It does NOT fetch the ads. This is obviously done before notifyRegistered
 * gets fired. 
 */
A21.bootup = function() {
  Page.determinePageType();
};

// 
// Misc "private" functions.
// 

/**
 * sets the keyword to "nl" or its value if it exists.
 * @param {String} memo   the entire keyword string.
 * @param {String} value  keyword value
 * @param {String} name   keyword name 
 * @returns the keyword string with the new keyword name and value attached to it.
 */
function keywordString(memo, value, name) {
  return [memo, name, '=', (value || 'nl'), ';'].join('');
}


/** 
 * gets the keyword string with the object of keywords passed in.
 * @param {Object} keymap  the object that stores the keyword name mappings
 *  from PCO to DFP's keyword names.
 * @param {Object} keywords  the object with all the keyword name and its 
 *  values.
 * @returns the keyword string.
 */
function getKeywordValues(keymap, keywords) {
  function keyValuePair(name, value) {
    return [name, '=', (value || 'nl')].join('');
  }
  function keywordString(memo, value, name) {
    return memo + keyValuePair(name, keywords[value]) + ';';
    
  }
  var output = _.reduce(keymap, keywordString, ''); 
  // get rid of the last ';' in the string so we won't have double semicolons (;;) inside the keywords
  return output.substring(0, output.length - 1);
}


/**
 * Gets the forecast keywords. Converts between PCO keywords to DFP keywords.
 */
function getFcstKeywords(keywords) {
  var fcstKeymap = {
    fhi : "tempH",
    fli : "tempL",
    fhr : "tempHR",
    flr : "tempLR",
    fc1 : "cond",
    fc2 : "cond",
    fc3 : "cond"
  };

  /**
   * If the correct forecast keyword exists, it returns the keyword 
   * name=value string.
   * @param {String} memo    the keyword string the new name=value string 
   *   it will be attached to.
   * @param {String} value   the keyword value.
   * @param {String} name    the keyword name.
   * @returns   the keyword string: "name=value" with the memo attached in the 
   *   beginning;
   */
  function makeKeywords(memo, value, name) {
    var keyvalue = keywords[value];
    var props = {
      'fc1'    : keywordString(memo, keyvalue[0], name),
      'fc2'    : keywordString(memo, keyvalue[1], name),
      'fc3'    : keywordString(memo, keyvalue[2], name),
      'default': keywordString(memo, keyvalue, name)
    };

    return props[name] || props['default'];
  }

  if (keywords) {
    var fcst = _.reduce(fcstKeymap, makeKeywords, '');
    // get rid of the last ';' in the string so we won't have double semicolons (;;) inside the keywords
    return fcst.substring(0, fcst.length - 1);
  } else {
    return "";
  }
}

/**
 * Sets all keywords to "nl".
 * @param {Object}  keymap the mapping of PCO keywords to DFP keywords.
 * @returns the keyewords with "nl" as their values.
 */
function getKeywordNulls(keymap) {
  function nulls(memo, value, name) {
    return memo +  name +  '=nl;'; 
  }
  return _.reduce(keymap, nulls, "");
}


/**
 * Gathers all weather information keywords
 *
 * @returns      {String}  the keyword string for the wx.config.wx object
 */
function getWxKeywords() {
  var wx = window.wx.config.wx;

  var wxkeymap = {
    tmp  : 'temp',
    tmpr : 'tempR',
    plln : 'pollen',
    wind : 'wind',
    uv   : 'uv',
    hmid : 'hum',
    sev  : 'severe',
    cnd  : 'cond'
  };

  // if wx.config.wx.temp and wx.config.wx.tempR doesn't exist, just return all
  // the weather keywords with "nl" in them.
  return (wx.temp || wx.tempR) ?  
    getKeywordValues(wxkeymap, wx) + ';' + getFcstKeywords(wx.fcast) : 
    getKeywordNulls(wxkeymap);
}

/**
 * Gathers all location information keywords
 *
 * @returns      {String}  the keyword string for the wx.config.loc object
 */
function getLocKeywords() {
  var loc       = wx.config.loc;
  var locKeyMap = {
    zip : "zip",
    dma : "dma",
    st  : "state",
    cc  : "country"
  };
 
  // if wx.config.loc doesn't exist, just return all the loc keywords with
  // "nl" in them.
  return (loc) ? getKeywordValues(locKeyMap, loc) : getKeywordNulls(locKeyMap);
}

function getMultipleValueKeywords() {
  var user = wx.config.user;

  function printMultipleValues(value, keyname) {
    var arr  = user[value];
    var name = keyname + "=";

    // in the past, PCO had these in different formats. These conditional 
    // blocks assures it handles all cases in case it reverts back and forth. 
    // It used to be stored as string...
    if (_.isString(arr)) { 
      return name + (arr || 'nl;') + ';'; 
    // or an array...
    } else if (arr && _.isArray(arr) && arr.length > 0 && arr[0] != "") { 
      return name + arr.join(';' + name) + ';'; 
    // or nothing.
    } else {
      return name + 'nl;'; 
    }
  }

  function makeKeywords(memo, value, name) {
    // asi and age can have multiple values. So we'll have to handle those
    // in a special way.
    return  ((name === 'asi' || name === 'age') ? 
      memo + printMultipleValues(value, name) : 
      keywordString(memo, user[value], name));
  }

  var userKeyMap = {
    age    : "age",
    asi    : "asi"
  };

  return user ? _.reduce(userKeyMap, makeKeywords, '') : '';
}

/**
 * Gathers all user information keywords
 *
 * @returns  the keyword string for gender
 */
function getUserKeywords() {
  var user = wx.config.user;
  return user ? ("gender=" + (user.gender || "nl")) : ''; 
}

/**
 * Gathers all the keywords in the page level, layout level, and position level
 *
 * @return   {Object}   wx  the weather config file.
 */
function collectKeywords(posName) {
  function checkLo(keyword) { return (/lo=/.test(keyword)) ? keyword : 'lo=' + keyword; }
  function tileKeywords(tiles) { return "tile=" + tiles; }
  function sizeKeywords(sizes) { return "sz=" + sizes; }
  function uKeyword(u) { return ";u=" + u; }
  function ordKeyword() { return "ord=" + A21.ord; }
  
  var pos              = A21.positions[posName] || {};
  var ad               = wx.config.ad;
  var parentKeywords   = ad.keywords.join(';');
  var layoutKeywords   = ad.layout ? ';' + checkLo(wx.config.ad.layout) : '';
  var sz               = pos.sizes || [];
  
  // if it's in debug more, we have to pass in a special keyword to let the ads 
  // know we're in debug mode. 
  var debugKeyword     = debugMode() ? 
    'adstest=' + YAHOO_UTIL.Cookie.get('adstest') + ';' : '';

  return [
    uKeyword(pos.u), 
    layoutKeywords, 
    pos.keywords, 
    getWxKeywords(), 
    getLocKeywords(), 
    getUserKeywords(), 
    parentKeywords, 
    tileKeywords(pos.tile), 
    sizeKeywords(sz.join(',')), 
    debugKeyword,
    getMultipleValueKeywords(),ordKeyword()].join(';');
}


/**
 * gathers all the keywords and sticks it into all the positions object for A21.
 */
function processPCOPositions(posName, i) {
  var pos = Object.create(Position);
  var ad = wx.config.ad;
  
  try {
    pos.name     = posName;
    pos.isMaster = (i === 0); 
    pos.keywords = wx.config.ad.positions[posName].keywords.join(';');
    pos.sizes    = collectSizes(ad.positions, posName);
    pos.tile     = i + 1;
    pos.u        = pos.uString();
    pos.key      = getKey();
    pos.changeStateTo('LOADING');
    A21.positions[posName] = pos;
  } catch(error) {
    Beacon.fireErrorBeacon("RuntimeError:" + error.message.replace(/\s/g, '_'));
  }
}

/**
 * Calculates the ord
 * @returns     {Number}    the 19 digit ord.
 */
function getOrd() {
  var start = A21.startTime;
  var end   = (new Date()).getTime();

  return (String(start) + String(Math.floor(end * (end - start) * Math.random())) + 
    String(end).split('').reverse().join('')).substring(0,19);
}

/**
 * Gets all the positions from wx.config.ad. Then creats all the keywords for it.
 */
function findKeywords() {
  var ad = wx.config.ad;
  A21.onParseConfig.fire();
  
  A21.site = (debugMode()) ? ad.testSite : ad.site;
  A21.zone = ad.zone;
  A21.ord  = ad.ord || getOrd();
  _.each(ad.sequence, processPCOPositions);
  A21.onParseFinished.fire();

  MyEvents.onParseFinished.fire();
  MyEvents.onParseFinishedFireOnce.fire();
}

/**
 * Checks if the ads should go into debug mode
 * returns  {Boolean}   if it's in debug mode or not.
 */
function debugMode() { return !!YAHOO_UTIL.Cookie.get('adstest'); }

/**
 * Gathers all the sizes for the positions.
 *
 * @param   {Object} positions ad's positions object.
 * @param   {String} posName   The position's name
 * @returns {Array}  The sizes accoring to the position .
 */
function collectSizes(positions, posName) { return positions[posName].sizes; }

/**
 * Determines if the page is dynamic or static and does the
 * correct actions depending on the page type
 */
function processPositions() {
  var mode = (wx.config.ad.mode || 'default');
  
  if (Page.isDynamicPage()) {
    findKeywords();
  } else {
    MyEvents.onTagServerFinish.subscribe(function() { findKeywords(); });
    Page.callTagserver(wx.config.page.pageId, mode, 'wx.config.gotTSData');
  }
}

/**
 * find the value from a key=value pair. 
 * @param   keywords {String}    the keywords string (key1=val1;key2=val2;...;keyn=valn)
 * @param   keyname  {String}    the value for the this keyname to find.
 * @returns {String} the keyvalue. if not found, it returns 'nl'
 */
function findKeyvalue(keywords, keyname) {
  var re  = new RegExp(keyname + "=[^;]+");
  var val = re.exec(keywords);
  return val ? val[0].split('=')[1] : 'nl';  
}

/**
 * @returns the key for the ad call. It's usd to fix the FF caching iframe bug.
 */
function getKey() {
  var d = new Date();
  return d.getTime();
}

/**
 * Basic wrapper for document.getElementById
 * @param   id  {String}    the id of the HTML element
 */
function $(id) {
  return doc.getElementById(id);
}

/**
 * Sometimes, the ads don't return a valid clickthrough url. Therefore, we 
 * don't know the ad's correct size. So we calculate it based on the size
 * stored in the PCO. We return the biggest size possible so it'll at least
 * show all the ad.
 * @param {Array}  sizesArray   the size array from the PCO
 * @param {String} iframeWidth  the width of the iframe. 
 * @param {String} iframeHeight the height of the iframe. 
 * @returns width and height object.
 */ 
function getClosestSize(sizesArray, iframeWidth, iframeHeight) {
  function helper (memo, value, i) {
    var diff       = memo[0];
    var size       = value.split('x');
    var width      = size[0];
    var height     = size[1];
    var widthDiff  = Math.abs(iframeWidth  - width);
    var heightDiff = Math.abs(iframeHeight - height);
    var perimeter  = widthDiff + heightDiff;

    return (perimeter < diff) ? [perimeter, { "width": width, "height": height }] : memo;
  }

  // We check through each element and see which of the perimeter of 
  // PCO's width and height is the closest to the iframe's width and height.
  // We choose a huge number of difference because the difference between 
  // the width and heights has to be small.  We can't use the iframe's width 
  // and height because that is not a valid, defined size.
  //
  // If we use the PCO width and height that's the closest iframe size, then the 
  // probablity of using the correct width and height is greater.
  var tuple = _.reduce(sizesArray, helper, [100000000, {}]);

  return tuple[1];
}


function getBiggestSize(sizesArray) {
  function findArea(size) {
    var sizeArray = size.split("x");
    return sizeArray[0] * sizeArray[1];
  }

  function compare(size1, size2) {
    var area1 = findArea(size1);
    var area2 = findArea(size2);

    return (area1 > area2) ? size1 : size2;
  }
 
  var biggestSize = _.reduce(sizesArray, compare, "-1x1");
  var sizeArray   = biggestSize.split("x");
  
  return {width: sizeArray[0], height: sizeArray[1]};
}

/**
 * this gets subscribed to an event to process and show the position
 */
function showPosition(positionName, evt) {
  return function() {
    var position = A21.positions[positionName];

    if (A21.currentState === 'MASTER_AD') {
      if (position.isMaster) {
        position.show();  
      } else {
        evt.subscribe(function() { position.show(); });
      }
    } else {
      position.show();  
    }
  }
}

/**
 * unsubscribe all the MyEvents.
 */
function unsubscribeAllEvents() {
  _.each(MyEvents, function(e) {
    e.unsubscribeAll();
  });
}

// We start it here to do the initial setup. The process to start retrieving 
// the ads starts at A21.notifyRegistered.
A21.bootup();

})();
