// Satellite Library
// Property: Ticketmaster Host Sites
// All code and conventions are protected by copyright
// Search Discovery, Inc.

(function(window, document, undefined) {
// Satellite
// =========
//
// Satellite *core*. Yeah, you want it.
//
// In this first section, we have a some useful utility functions. 
var ToString = Object.prototype.toString

var Overrides = window._satellite && window._satellite.override

var SL = {
    
    
    // `$data(elm, prop, [val])`
    // ----------------------------
    //
    // Our own `$data()` method, [a la jQuery](http://api.jquery.com/jQuery.data/)
    // , used to get or set
    // properties on DOM elements without going insane.
    // `uuid` and `dataCache` are used by `$data()`
    //
    // Parameters:
    // 
    // - `elm` - the element to get or set a property to
    // - `prop` - the property name
    // - `val` - the value of the property, if omitted, the method will
    //      return the existing value of the property, if any
    $data: function(elm, prop, val){
        var __satellite__ = '__satellite__'
        var cache = SL.dataCache
        var uuid = elm[__satellite__]
        if (!uuid) uuid = elm[__satellite__] = SL.uuid++
        var datas = cache[uuid]
        if (!datas) datas = cache[uuid] = {}
        if (val === undefined)
            return datas[prop]
        else
            datas[prop] = val
    },
    uuid: 1,
    dataCache: {},
    
    // `isArray(thing)`
    // --------------
    //
    // Returns whether the given thing is an array.
    isArray: Array.isArray || function(thing){
        return ToString.apply(thing) === "[object Array]"
    },

    // `isString(thing)`
    // -----------------
    //
    // Returns whether thing is a string
    isString: function(thing){
        return typeof thing === 'string'
    },

    // `isRegex(thing)`
    // ----------------
    //
    // Returns whether thing is a RegExp object
    isRegex: function(thing){
        return thing instanceof RegExp
    },

    // `each(arr, func, [context])`
    // ------------------
    //
    // A handy method for array iteration wo having to write a for-loop.
    //
    // Parameters:
    //
    // - `arr` - an array
    // - `func(item, index, arr)` - a function which accepts each item in the array
    //      once. I takes these arguments
    //      * `item` - an item
    //      * `index` - the array index of said item
    //      * `arr` - the array
    // - `context` - the context to be bound to `func` when it is invoked
    each: function(arr, func, context){
        for (var i = 0, len = arr.length; i < len; i++)
            func.call(context, arr[i], i, arr)
    },
    
    // `map(arr, func)`
    // ----------------
    //
    // A handy method for mapping an array to another array using a 1-to-1 mapping
    // for each element
    //
    // Parameters:
    //
    // Parameters are the same as `SL.each`, except that `func` is expected to return
    // a the value you want in the corresponding index of the returned array.
    map: function(arr, func, context){
        var ret = []
        for (var i = 0, len = arr.length; i < len; i++)
            ret.push(func.call(context, arr[i], i, arr))
        return ret
    },
    
    // `filter(arr, cond)`
    // -------------------
    //
    // Handy method for take an array and filtering down to a subset of the elements.
    //
    // Parameters:
    //
    // Parameters are the same as `SL.each` except the second argument is `cond`
    // instead of `func` and it is expected to return a truthy value respresenting
    // whether to include this item in the return array or not.
    filter: function(arr, cond, context){
        var ret = []
        for (var i = 0, len = arr.length; i < len; i++){
            var item = arr[i]
            if (cond.call(context, item, i, arr))
                ret.push(item)
        }
        return ret
    },
    
    // `any(arr, cond, context)`
    // -------------------------
    //
    // Another array helper function. Returns true if `cond(item)` returns true
    // for any item in the array.
    any: function(arr, cond, context){
        for (var i = 0, len = arr.length; i < len; i++){
            var item = arr[i]
            if (cond.call(context, item, i, arr))
                return true
        }
        return false
    },

    // `every(arr, cond, context)`
    // ---------------------------
    //
    // Another array helper function. Returns true if `cond(item)` returns true
    // for every item in the array.
    every: function(arr, cond, context){
        var retval = true
        for (var i = 0, len = arr.length; i < len; i++){
            var item = arr[i]
            retval = retval && cond.call(context, item, i, arr)
        }
        return retval
    },
    
    // `contains(arr, obj)`
    // -----------------------
    //
    // Tells you whether an array contains an object.
    //
    // Parameters:
    //
    // - `arr` - said array
    // - `obj` - said object
    contains: function(arr, obj){
        return SL.indexOf(arr, obj) !== -1
    },
    
    // `indexOf(arr, obj)`
    // -------------------
    //
    // Return the index of an object within an array.
    //
    // Parameters;
    //
    // - `arr` - said array
    // - `obj` - said object
    indexOf: function(arr, obj){
        if (arr.indexOf)
            return arr.indexOf(obj)
        for (var i = arr.length; i--;)
            if (obj === arr[i])
                return i
        return -1
    },
    
    
    // `find(arr, obj)`
    // -------------------
    //
    // Return the index of an object within an array.
    //
    // Parameters;
    //
    // - `arr` - said array
    // - `obj` - said object
    find: function(arr, cond, context){
        var ret = []
        for (var i = 0, len = arr.length; i < len; i++){
            var item = arr[i]
            if (cond.call(context, item, i, arr))
                return item
        }
        return null
    },

    // `textMatch(str, str_or_regex)`
    // ------------------------------
    //
    // Perform a string match based on another string or a regex.
    //
    // Parameters:
    //
    // `str` - the input string to be matched
    // `str_or_regex` - the pattern to match against, if this is a string, it requires exact match, if
    //      it's a regex, then it will do regex match
    textMatch: function(str, pattern){
        if (typeof pattern === 'string') return str === pattern
        else if (pattern instanceof RegExp) return pattern.test(str)
        else return false
    },
    
    // `bind(func, context)`
    // ---------------------
    //
    // Binds a context permanently to a context. The returned function is a new function
    // which - when called - will call the passed in function with `context` bound to it.
    //
    // Parameters:
    //
    // `func` - a function
    // `context` - an object to be bound as the context of this function
    bind: function(func, context) {
        return function() {
            return func.apply(context, arguments)
        }
    },
    
    // `throttle(fn, delay)`
    // ---------------------
    //
    // *Throttles* a function `fn` to be called no more than once during the interval
    // specified by `delay`.
    // 
    // Parameters:
    //
    // - `fn` - a function
    // - `delay` - delay in milliseconds
    //
    // *Throttle function stolen from
    //     <http://remysharp.com/2010/07/21/throttling-function-calls/>*
    throttle: function(fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },
    
    // `domReady(callback)`
    // --------------------
    //
    // Registers a callback to be called when the DOM is fully parsed and loaded.
    //
    // Parameters:
    //
    // - `callback` - a function to be called at `domready`
    //
    // *domReady is borrowed from <https://github.com/ded/domready>*
    domReady: (function (ready) {

      var fns = [], fn, f = false
        , doc = document
        , testEl = doc.documentElement
        , hack = testEl.doScroll
        , domContentLoaded = 'DOMContentLoaded'
        , addEventListener = 'addEventListener'
        , onreadystatechange = 'onreadystatechange'
        , loaded = /^loade|^c/.test(doc.readyState)

      function flush(f) {
        loaded = 1
        while (f = fns.shift()) f()
      }

      doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
        doc.removeEventListener(domContentLoaded, fn, f)
        flush()
      }, f)


      hack && doc.attachEvent(onreadystatechange, (fn = function () {
        if (/^c/.test(doc.readyState)) {
          doc.detachEvent(onreadystatechange, fn)
          flush()
        }
      }))

      return (ready = hack ?
        function (fn) {
          self != top ?
            loaded ? fn() : fns.push(fn) :
            function () {
              try {
                testEl.doScroll('left')
              } catch (e) {
                return setTimeout(function() { ready(fn) }, 50)
              }
              fn()
            }()
        } :
        function (fn) {
          loaded ? fn() : fns.push(fn)
        })   
    }()),
    
    // `loadScript(url, [callback])`
    // -----------------------------
    //
    // Load an external script.
    //
    // Parameters:
    //
    // - `url` - the URL of the script
    // - `callback`(optional) - the function to be called after the script has loaded.
    loadScript: function(url, callback){
        var script = document.createElement('script')
        SL.scriptOnLoad(url, script, callback)
        script.src = url
        document.getElementsByTagName('head')[0]
            .appendChild(script)
    },

    scriptOnLoad: function(url, script, callback){
        function cb(err){
            if (err) SL.logError(err)
            if (callback) callback(err)
        }
        if ('onload' in script){
            script.onload = function(){
                cb()
            }
            script.onerror = function(){
                cb(new Error('Failed to load script ' + url))
            }
        }else if ('readyState' in script){
            script.onreadystatechange = function(){
                var rs = script.readyState
                if (rs === 'loaded' || rs === 'complete'){
                    script.onreadystatechange = null
                    cb()
                }
            }
        }
    },
    
    // `pushAsyncScript(callback)`
    // -------------------
    //
    // Called by an async custom user script.
    pushAsyncScript: function(cb){
        SL.tools['default'].pushAsyncScript(cb)
    },
    
    // `pushBlockingScript(callback)`
    // ------------------------------
    //
    // Called by a blocking custom user script.
    pushBlockingScript: function(cb){
        SL.tools['default'].pushBlockingScript(cb)
    },
    
    // `addEventHandler(elm, evt, callback)`
    // -------------------------------------
    //
    // Register an event handler for a element
    //
    // Parameters:
    //
    // - `elm` - the element in question
    // - `evt` - the event type to listen to
    // - `callback` - callback function
    addEventHandler: window.addEventListener ? 
        function(node, evt, cb){ node.addEventListener(evt, cb, false) } :
        function(node, evt, cb){ node.attachEvent('on' + evt, cb) },

    // `preventDefault(evt)`
    // ---------------------
    //
    // Prevent the default browser behavior for this event
    //
    // Parameters:
    //
    // `evt` - the event triggered
    preventDefault: window.addEventListener ?
        function(e){ e.preventDefault() } :
        function(e){ e.returnValue = false },
    
    // `stopPropagation(evt)`
    // ----------------------
    //
    // Cross-browser `stopPropagation`
    //
    // Parameters:
    //
    // `evt` - the event triggered
    stopPropagation: function(e){
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
    },
    
    // `containsElement(elm1, elm2)`
    // ----------------------
    //
    // Given DOM elements `elm1` and `elm2`, returns whether `elm1` contains `elm2`.
    //
    // Parameters:
    //
    // `elm1` - the possible parent
    // `elm2` - the possible child
    //
    // *Ripped from <http://stackoverflow.com/questions/6130737/mouseenter-without-jquery>*
    containsElement: function(container, maybe) {
        return container.contains ? container.contains(maybe) :
            !!(container.compareDocumentPosition(maybe) & 16);
    },
    
    // `matchesCss(css, elm)`
    // ----------------------
    //
    // Returns whether a DOM element matches a given css selector
    //
    // Parameters:
    //
    // - `css` - the CSS selector
    // - `elm` - the element
    matchesCss: (function(docEl){
        var matches = 
            docEl.matchesSelector || 
            docEl.mozMatchesSelector || 
            docEl.webkitMatchesSelector || 
            docEl.oMatchesSelector || 
            docEl.msMatchesSelector
        if (matches)
            return function(selector, elm){
                if (elm === document || elm === window) return false
                try{
                    return matches.call(elm, selector)
                }catch(e){
                    return false
                }
            }
        else if(docEl.querySelectorAll)
            return function(selector, elm) {
                var parent = elm.parentNode
                if (!parent) return false
                try{
                    var nodeList = elm.parentNode.querySelectorAll(selector)
                    for (var i = nodeList.length; i--;)
                    if (nodeList[i] === elm) return true
                }catch(e){
                    //
                }
                return false
            }
        else{
            return function(selector, elm){
                try{
                    return SL.Sizzle.matches(selector, [elm]).length > 0
                }catch(e){
                    return false
                }
            }
        }
    }(document.documentElement)),

    // `cssQuery(css)`
    // ---------------
    //
    // Return a list of element matching the given css selector
    //
    // Parameters:
    //
    // - `css` - the CSS selector
    cssQuery: (function(doc){
        if (doc.querySelectorAll)
            return function(css, cb){
                var results
                try{
                    results = doc.querySelectorAll(css)
                }catch(e){
                    results = []
                }
                cb(results)
            }
        else
            return function(css, cb){
                if (SL.Sizzle){
                    var results
                    try{
                        results = SL.Sizzle(css)
                    }catch(e){
                        results = []
                    }
                    cb(results)
                }else
                    SL.sizzleQueue.push([css, cb])
            }
    })(document),
    
    // `inherit(subClass, superClass)`
    // -------------------------------
    //
    // Make `subClass` inherit `superClass`.
    //
    // Parameters:
    //
    // - `subClass` - a Javascript function representing a constructor - the inheritor
    // - `superClass` - another constructor - the one to inherit from
    inherit: function(subClass, superClass){
        var proto = new superClass()
        proto.constructor = subClass
        subClass.prototype = proto
    },
    
    // `extend(dst, src)`
    // ----------------
    //
    // Extend an object with the properties of another.
    //
    // Parameters:
    //
    // - `dst` - object to copy to
    // - `src` - object to copy from
    extend: function(dst, src){
        for (var prop in src)
            if (src.hasOwnProperty(prop))
                dst[prop] = src[prop]
    },
    

    toArray: (function(){
        try {
            var slice = Array.prototype.slice
            slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
            return function(thing){
                return slice.call(thing, 0)
            }
        // Provide a fallback method if it does not work
        } catch( e ) {
            return function(thing){
                var ret = []
                for (var i = 0, len = thing.length; i < len; i++)
                    ret.push(thing[i])
                return ret
            }
        }
    })()

}

// The available tools to use.
SL.availableTools = {}

// The avaliable event emitters to use.
SL.availableEventEmitters = []

// The names of the events which can only fire once.
SL.fireOnceEvents = ['condition', 'elementexists']

// Initialize all event emitters.
SL.initEventEmitters = function(){
    SL.eventEmitters = SL.map(SL.availableEventEmitters, function(ee){
        return new ee()
    })
}

// Call `registerElements` on all event emitters.
SL.eventEmitterBackgroundTasks = function(){
    SL.each(SL.eventEmitters, function(ee){
        if ('backgroundTasks' in ee)
            ee.backgroundTasks()
    })
}

// Initialize all tools.
SL.initTools = function(toolSpecs){
    var tools = { 'default': new DefaultTool() }
    for (var id in toolSpecs){
        var toolSpec, ctr, tool
        toolSpec = toolSpecs[id]
        if (toolSpec.euCookie){
            var cookieSet = SL.readCookie('sat_track') === 'false'
            if (cookieSet) continue
        }
        ctr = SL.availableTools[toolSpec.engine]
        tool = new ctr(toolSpec)
        tool.id = id
        tools[id] = tool
    }
    return tools
}

// Pre-process arguments (variable substitutions and lower-casing) before
// feeding them to the tools.
SL.preprocessArguments = function(args, elm, evt, forceLowerCase){
    if (!args) return args
    function preprocessObject(obj){
        var ret = {}
        for (var key in obj){
            if (obj.hasOwnProperty(key)){
                ret[key] = SL.replace(obj[key], elm, evt)
            }
        }
        return ret
    }
    var ret = []
    for (var i = 0, len = args.length; i < len; i++){
        var value = args[i]
        if (typeof value === 'string'){
            value = SL.replace(value, elm, evt)
            if (forceLowerCase)
                value = value.toLowerCase()
        }else if (value && value.constructor === Object){
            value = preprocessObject(value)
        }
        ret.push(value)
    }
    return ret
}

// Execute a command.
SL.execute = function(trig, elm, evt, tools){
    if (_satellite.settings.hideActivity) return
    tools = tools || SL.tools
    
    function doit(toolName){
        var tool = tools[toolName || 'default']
        if (!tool)
            return
        try{
            tool.triggerCommand(trig, elm, evt)
        }catch(e){
            SL.logError(e)
        }
    }
    if (trig.engine){
        var engine = trig.engine
        for (var toolName in tools){
            var tool = tools[toolName]
            if (tool.settings && tool.settings.engine === engine)
                doit(toolName)
        }
    }else if (trig.tool instanceof Array)
        SL.each(trig.tool, function(toolName){
            doit(toolName)
        })
    else
        doit(trig.tool)
}

// `notify(msg, pty)`
// ------------------
//
// Notify the user of things happening in Satellite using `console.log`
//
// - msg - message to print
// - pty - priority
SL.notify = window.console ? function(msg, pty) {
    if (SL.settings.notifications) {
        switch (pty) {
            case 1:
            case 2:
            case 3:
                console['log']("SATELLITE: " + msg);
                break;
            case 4:
                console.warn("SATELLITE: " + msg);
                break;
            case 5:
                console.error("SATELLITE: " + msg);
                break;
            default:
                console['log']("SATELLITE: Notify called with incorrect priority.");
        }
    }
} : function(){}

// `getObjectProperty(obj, property)`
// ============================
//
// Get property(potentially nested) from an object.
SL.getObjectProperty = function(obj, property){
    var propChain = property.split('.')
      , currValue = obj
    for (var i = 0, len = propChain.length; i < len; i++){
        if (currValue == null) return undefined
        currValue = currValue[propChain[i]]
    }
    return currValue
}

// `setVar(name, value)` or `setVar(mapping)`
// ==========================================
//
// Set a customer variable. Can be either called like this
//     
//     _satellite.setVar('name', 'value')
//
// Or by passing in a mapping(object literall) which allows setting multiple variables at
// the same time.
//
//     _satellite.setVar({name: 'value', foo: 'bar'})
SL.setVar = function(){
    var customVars = SL.data.customVars
    if(customVars == null) SL.data.customVars = {}, customVars = SL.data.customVars
    if (typeof arguments[0] === 'string'){
        var prop = arguments[0]
        customVars[prop] = arguments[1]
    }else if (arguments[0]){ // assume an object literal
        var mapping = arguments[0]
        for (var key in mapping)
            customVars[key] = mapping[key]
    }
}

SL.dataElementSafe = function(key, length){
    if (arguments.length > 2){
        // setter
        var value = arguments[2]
        if (length === 'pageview'){
            SL.dataElementSafe.pageviewCache[key] = value
        }else if (length === 'session'){
            SL.setCookie('_sdsat_' + key, value)
        }else if (length === 'visitor') {
            SL.setCookie('_sdsat_' + key, value, 365 * 2)
        }
    }else{
        // getter
        if (length === 'pageview'){
            return SL.dataElementSafe.pageviewCache[key]
        }else if (length === 'session' || length === 'visitor'){
            return SL.readCookie('_sdsat_' + key)
        }
    }
}
SL.dataElementSafe.pageviewCache = {}

SL.realGetDataElement = function(dataDef){
    var ret
    if (dataDef.selector) {
        if (SL.hasSelector) {
            SL.cssQuery(dataDef.selector, function(elms) {
                if (elms.length > 0) {
                    var elm = elms[0]
                    if (dataDef.property === 'text') {
                        ret = elm.innerText || elm.textContent
                    }else{
                        ret = elm[dataDef.property]
                    }
                }
            })
        }
    }else if (dataDef.queryParam) {
        ret = SL.getQueryParam(dataDef.queryParam)
    }else if (dataDef.cookie) {
        ret = SL.readCookie(dataDef.cookie)
    }else if (dataDef.jsVariable) {
        ret = SL.getObjectProperty(window, dataDef.jsVariable)
    }else if (dataDef.customJS) {
        ret = dataDef.customJS()
    }
    return ret
}

SL.getDataElement = function(variable, suppressDefault, dataDef) {
    dataDef = dataDef || SL.dataElements[variable]
    var ret = SL.realGetDataElement(dataDef)
    if (ret === undefined && dataDef.storeLength) {
        ret = SL.dataElementSafe(variable, dataDef.storeLength)
    }else if (ret !== undefined && dataDef.storeLength) {
        SL.dataElementSafe(variable, dataDef.storeLength, ret)
    }
    if (ret === undefined && !suppressDefault) {
        ret = dataDef['default']
    }
    return ret
}

SL.getVar = function(variable, elm, evt){
    var custVars = SL.data.customVars
      , target = evt ? (evt.target || evt.srcElement) : null
      , randMatch
      , value
    var map = {
        URI: SL.data.URI,
        uri: SL.data.URI,
        protocol: document.location.protocol,
        hostname: document.location.hostname
    }
    if (SL.dataElements && variable in SL.dataElements){
        return SL.getDataElement(variable)
    }
    value = map[variable]
    if (value === undefined){
        if (variable.substring(0, 5) === 'this.'){
            variable = variable.slice(5)
            return SL.getObjectProperty(elm, variable)
        }else if(variable.substring(0, 6) === 'event.'){
            variable = variable.slice(6)
            return SL.getObjectProperty(evt, variable)
        }else if(variable.substring(0, 7) === 'target.'){
            variable = variable.slice(7)
            return SL.getObjectProperty(target, variable)
        }else if(variable.substring(0, 7) === 'window.'){
            variable = variable.slice(7)
            return SL.getObjectProperty(window, variable)
        }else if (variable.substring(0, 6) === 'param.'){
            variable = variable.slice(6)
            return SL.getQueryParam(variable)
        }else if(randMatch = variable.match(/^rand([0-9]+)$/)){
            var len = Number(randMatch[1])
              , s = (Math.random() * (Math.pow(10, len) - 1)).toFixed(0)
            return Array(len - s.length + 1).join('0') + s
        }else{
            value = SL.getObjectProperty(custVars, variable)
        }
    }
    return value
}

SL.getVars = function(variables, elm, evt){
    var ret = {}
    SL.each(variables, function(variable){
        ret[variable] = SL.getVar(variable, elm, evt)
    })
    return ret
}

// `replace(str, [elm], [target])`
// ---------------------
//
// Perform variable subtitutions substitute to a string where subtitions are
// specified in the form `"%foo%"`. Variables are lookup either in `SL.data.customVars`, or
// if the `elm` parameter is passed it, and the variable spec is of the form `"%this.tagName%"`, it
// is subsituted with the properties on `elm`, *i.e. `elm.tagName`.
//
// Parameters:
//
// - `str` - string to apply substitutions to
// - `elm`(optional) - object or element to use for substitutions of the form `%this.property%`
// - `target`(optional) - element to use for subsitution of the form `%target.property%`
SL.replace = function(str, elm, evt) {
    if (typeof str !== 'string') return str
    return str
        .replace(/%(.*?)%/g, function(m, variable){
            var val = SL.getVar(variable, elm, evt)
            if (val == null)
                return m
            else
                return val
        })
}



// From a object literal of variable, generate a query string.
SL.searchVariables = function(vars, elm, evt){
    if (!vars || vars.length === 0) return ''
    var qsParts = []
    for (var i = 0, len = vars.length; i < len; i++){
        var varr = vars[i]
          , value = SL.getVar(varr, elm, evt)
         qsParts.push(varr + '=' + escape(value))
    }
    return '?' + qsParts.join('&')
}

// Fire all the trigger actions associated with a rule.
SL.fireRule = function(rule, elm, evt){
    var triggers = rule.trigger
    if (!triggers) return
    for (var i = 0, len = triggers.length; i < len; i++){
        var trig = triggers[i]
        SL.execute(trig, elm, evt)
    }
    if (SL.contains(SL.fireOnceEvents, rule.event))
        rule.expired = true
}

// `isLinked(elm)`
// ---------------
//
// Returns whether the element is either an anchor or a descendant of an anchor or contains an anchor.
//
// `elm` - the element to test
SL.isLinked = function(elm){
    for (var cur = elm; cur; cur = cur.parentNode) {
        if (cur.nodeName.toLowerCase() == "a")
            return true
    }
    return false
}

// Fire a page load event. `type` is one of `pagetop`, `pagebottom`, `domready` and
// `windowload`.
SL.firePageLoadEvent = function(type) {
    var location = document.location
      , evt = {type: type, target: location}
    var rules = SL.pageLoadRules
    for (var i = rules.length; i--;){
        var rule = rules[i]
        if (SL.ruleMatches(rule, evt, location)){
            SL.notify('Rule "' + rule.name + '" fired.', 1)
            SL.fireRule(rule, location, evt)
            rules.splice(i, 1) // remove this page-load rule once fired
        }
    }
    for (var id in SL.tools){
        var tool = SL.tools[id]
        tool.endPLPhase(type)
    }
}

// `track(id)`
// -----------
//
// Directly launch an event by id.
SL.track = function(ruleName) {
    // trim extra spaces that may exist at beginning or end of string
    ruleName = ruleName.replace(/^\s*/,"").replace(/\s*$/,"")
    for (var i = 0; i < SL.directCallRules.length; i++){
        var rule = SL.directCallRules[i]
        if (rule.name === ruleName){
            SL.notify('Direct call Rule "' + ruleName + '" fired.', 1)
            SL.fireRule(rule, location, {type: ruleName})
            return
        }
    }
    SL.notify('Direct call Rule "' + ruleName + '" not found.', 1)
}

// `basePath()`
// ------------
//
// Returns the base path of all Satellite generated assets.
SL.basePath = function(){
    if (SL.data.host)
        return (document.location.protocol === 'https:' ? 
        'https://' + SL.data.host.https : 
        'http://' + SL.data.host.http) + '/'
    else
        return this.settings.basePath
}

// `setLocation(url)`
// ------------------
//
// Set the current URL
//
// - `url` - the URL to set to
SL.setLocation = function(url){
    window.location = url
}

SL.parseQueryParams = function(str){
    if (str === '') return {}
    var ret = {}
      , pairs = str.substring(1).split('&')
    SL.each(pairs, function(pair){
        pair = pair.split('=')
        ret[pair[0]] = pair[1]
    })
    return ret
}

var QueryParams = SL.parseQueryParams(window.location.search)

SL.getQueryParam = function(key){
    return QueryParams[key]
}

SL.readCookie = function(name) {
    var nameEQ = name + "="
    var parts = document.cookie.split(';')
    for(var i=0;i < parts.length;i++) {
        var c = parts[i]
        while (c.charAt(0)==' '){
            c = c.substring(1,c.length)
        }
        if (c.indexOf(nameEQ) === 0){
            return c.substring(nameEQ.length,c.length)
        }
    }
    return undefined
}

SL.setCookie = function(name,value,days) {
    var expires
    if (days) {
        var date = new Date()
        date.setTime(date.getTime()+(days*24*60*60*1000))
        expires = "; expires="+date.toGMTString()
    }
    else{
        expires = ""
    }
    document.cookie = name+"="+value+expires+"; path=/"
}

SL.removeCookie = function(name) {
    SL.setCookie(name,"",-1);
}

SL.propertiesMatch = function(property, elm){
    var fallbacks = SL.propertiesMatch.fallbacks
    if (property){
        for (var prop in property){
            var target = property[prop]
            var value
            if (prop in elm)
                value = elm[prop]
            else if (prop in fallbacks && fallbacks[prop] in elm)
                value = elm[fallbacks[prop]]
            else
                value = elm.getAttribute ? elm.getAttribute(prop) : undefined
            if (typeof target === 'string' && target !== value) return false
            if (target instanceof RegExp && !target.test(value)) return false
        }
    }
    return true
}

SL.propertiesMatch.fallbacks = {
    innerText: 'textContent'
}

// `ruleMatches(rule, evt, elm, eventEntriesFound)`
// ------------------------------------------------
//
// - `rule` - the rules to match
// - `evt` - the event triggered
// - `elm` - the element the event was on
// - `eventEntriesFound` - number of rules matched so far
SL.ruleMatches = function(rule, evt, elm, eventEntriesFound){
    var location = document.location
      , cnd = rule.condition
      , cnds = rule.conditions
      , property = rule.property
      , eventType = evt.type
      , matchValue = rule.value
      , target = evt.target || evt.srcElement
      , initialTarget = elm === target
    if (rule.event !== eventType) return false
    if (rule.isDefault && eventEntriesFound > 0)
        return false
    if (rule.expired) return false
    if (!(initialTarget || 
            ((rule.bubbleFireIfParent !== false) && (eventEntriesFound === 0 || (rule.bubbleFireIfChildFired !== false))))) return false

    if (rule.selector && !SL.matchesCss(rule.selector, elm)) return false
    if (!SL.propertiesMatch(property, elm)) return false
    if (matchValue != null){
        if (typeof matchValue === 'string'){
            if (matchValue !== elm.value)
                return false
        }else if (!matchValue.test(elm.value))
            return false
    }
    if (cnd){
        try{
            if (!cnd.call(elm, evt, target)){
                SL.notify('Condition for rule "' + rule.name + '" not met.', 1)
                return false
            }
        }catch(e){
            SL.notify('Condition for rule "' + rule.name + '" not met. Error: ' + e.message, 1)
            return false
        }
    }
    if (cnds){
        var failed = SL.find(cnds, function(cnd){
            try{
                return !cnd.call(elm, evt, target)
            }catch(e){
                SL.notify('Condition for rule "' + rule.name + '" not met. Error: ' + e.message, 1)
                return true
            }
        })
        if (failed){
            SL.notify('Condition ' + failed.toString() + ' for rule "' + rule.name + '" not met.', 1)
            return false
        }
    }
    return true
}


SL.evtHandlers = {}
SL.whenEvent = function(evtName, callback){
    var handlers = SL.evtHandlers
    if (!handlers[evtName])
        handlers[evtName] = []
    handlers[evtName].push(callback)
}
    
SL.handleEvent = function(evt) {
    // Don't process an event twice.
    if (SL.$data(evt, 'eventProcessed')) return

    var eventType = evt.type.toLowerCase()
      , target = evt.target || evt.srcElement
      , rulesMatched = 0
      , rules = SL.rules
      , tools = SL.tools
      , handlers = SL.evtHandlers[evt.type]
      
    if (handlers){
        SL.each(handlers, function(cb){
            cb(evt)
        })
    }
      
    if (target && target.nodeName)
        SL.notify("detected " + eventType + " on " + target.nodeName, 1)
    else
        SL.notify("detected " + eventType, 1)
    
    for (var curr = target; curr; curr = curr.parentNode) {
        var bubbleStop = false
        SL.each(rules, function(rule){
            if (SL.ruleMatches(rule, evt, curr, rulesMatched)){
                SL.notify('Rule "' + rule.name + '" fired.', 1)
                SL.fireRule(rule, curr, evt)
                rulesMatched++
                if (rule.bubbleStop)
                    bubbleStop = true
            }
        })
        if (bubbleStop) break
    }
    
    SL.$data(evt, 'eventProcessed', true)
}

// `onEvent(evt)`
// ------------
//
// Handle an event, whether it is a DOM event or a synthetic event.
//
// - `evt` - the event triggered
SL.onEvent = document.querySelectorAll ? 
function(evt){ SL.handleEvent(evt) } : 
(function(){
    var q = []
    var onEvent = function(evt) {
        if (evt.selector)
            q.push(evt)
        else
            SL.handleEvent(evt)
    }
    onEvent.pendingEvents = q
    return onEvent
})()


// `registerEvents(elm, events)`
// -----------------------------
//
// Register events for an element using `track` as the callback
//
// - `elm` - the element to listen for events on
// - `events` - an array of event types (strings)
SL.registerEvents = function(elm, events){
    for (var i = events.length - 1; i >= 0; i--){
        var event = events[i]
        if (!SL.$data(elm, event + '.tracked')){
            SL.addEventHandler(elm, event, SL.onEvent)
            SL.$data(elm, event + '.tracked', true)
        }
    }   
}

// `registerEventsForTags(tags, events)`
// -------------------------------------
//
// Register events for all element that have the specified tags
//
// - `tags` - an array of tags to match for (strings)
// - `events` - an array of event types (strings)
SL.registerEventsForTags = function(tags, events){
    for (var i = tags.length - 1; i >= 0; i--){
        var tag = tags[i]
        var elms = document.getElementsByTagName(tag);
        for (var j = elms.length - 1; j >= 0; j--)
            SL.registerEvents(elms[j], events)
    }
}

// `setListeners()`
// ----------------
//
// Set events for `document`
SL.setListeners = function() {
    SL.registerEvents(document, ["click","submit"]);
};

// `setFormListeners()`
// --------------------
//
// Listen for events on form elements.
SL.setFormListeners = function() {
    SL.registerEventsForTags(
        ['input', 'select', 'textarea', 'button'],
        ["select","change","focus","blur","keypress"]);
};

// `setVideoListeners()`
// ---------------------
//
// Listen for events on video elements.
SL.setVideoListeners = function() {
    SL.registerEventsForTags(['video'],
        ["play","pause","ended","volumechange","stalled","timeupdate","loadeddata"])
}

// `readStoredSetting(name)`
// ==================
//
// Reads the cookie of the given name.
// Stolen from <http://www.quirksmode.org/js/cookies.html>
SL.readStoredSetting = function(name) {
    if (!window.localStorage) return null
    name = 'sdsat_' + name
    return window.localStorage.getItem(name)
}

// Read satelliteUtilsCookie values to see about getting bookmarklet running / settings
SL.loadStoredSettings = function () {
    var debug = SL.readStoredSetting('debug')
      , hideActivity = SL.readStoredSetting('hide_activity')
    if (debug)
        SL.settings.notifications = debug === 'true'
    if (hideActivity)
        SL.settings.hideActivity = hideActivity === 'true'
}

SL.isRuleActive = function(rule, date){
    var schd = rule.schedule
    if (!schd) return true
    
    var utc = schd.utc
      , getDate = utc ? 'getUTCDate' : 'getDate'
      , getDay = utc ? 'getUTCDay' : 'getDay'
      , getFullYear = utc ? 'getUTCFullYear' : 'getFullYear'
      , getMonth = utc ? 'getUTCMonth' : 'getMonth'
      , getHours = utc ? 'getUTCHours' : 'getHours'
      , getMinutes = utc ? 'getUTCMinutes' : 'getMinutes'
      , setHours = utc ? 'setUTCHours' : 'setHours'
      , setMinutes = utc ? 'setUTCMinutes' : 'setMinutes'
      , setDate = utc ? 'setUTCDate' : 'setDate'
    
    date = date || new Date()
    
    function dayDiff(one, other){
        other = modifyDate(other, {
            hour: one[getHours](),
            minute: one[getMinutes]()
        })
        return Math.floor(Math.abs((one.getTime() - other.getTime()) / (1000 * 60 * 60 * 24)))
    }
    function monthDiff(one, other){
        function months(date){
            return date[getFullYear]() * 12 + date[getMonth]()
        }
        return Math.abs(months(one) - months(other))
    }
    function modifyDate(date, fields){
        var retval = new Date(date.getTime())
        for (var field in fields){
            var val = fields[field]
            switch(field){
                case 'hour':
                    retval[setHours](val)
                    break
                case 'minute':
                    retval[setMinutes](val)
                    break
                case 'date':
                    retval[setDate](val)
                    break
            }
        }
        return retval
    }
    function timeGreaterThan(one, other){
        var h1 = one[getHours]()
          , m1 = one[getMinutes]()
          , h2 = other[getHours]()
          , m2 = other[getMinutes]()
        return (h1 * 60 + m1) > (h2 * 60 + m2)
    }
    function timeLessThan(one, other){
        var h1 = one[getHours]()
          , m1 = one[getMinutes]()
          , h2 = other[getHours]()
          , m2 = other[getMinutes]()
        return (h1 * 60 + m1) < (h2 * 60 + m2)
    }
    

    if (schd.repeat){
        if (timeGreaterThan(schd.start, date)) return false
        if (timeLessThan(schd.end, date)) return false
        if (date < schd.start) return false
        if (schd.endRepeat && date >= schd.endRepeat) return false
        if (schd.repeat === 'daily'){
            if (schd.repeatEvery){
                var dd = dayDiff(schd.start, date)
                if (dd % schd.repeatEvery !== 0) return false
            }
        }else if (schd.repeat === 'weekly'){
            if (schd.days){
                if (!SL.contains(schd.days, date[getDay]())) return false
            }else
                if (schd.start[getDay]() !== date[getDay]()) return false
            if (schd.repeatEvery){
                var diff = dayDiff(schd.start, date)
                if (diff % (7 * schd.repeatEvery) !== 0)
                    return false
            }
        }else if (schd.repeat === 'monthly'){
            if (schd.repeatEvery){
                var md = monthDiff(schd.start, date)
                if (md % schd.repeatEvery !== 0) return false
            }
            if (schd.nthWeek && schd.mthDay){
                if (schd.mthDay !== date[getDay]()) return false
                var nthWeek = Math.floor((date[getDate]() - date[getDay]() + 1) / 7)
                if (schd.nthWeek !== nthWeek) return false
            }else
                if (schd.start[getDate]() !== date[getDate]()) return false
        }else if (schd.repeat === 'yearly'){
            if (schd.start[getMonth]() !== date[getMonth]()) return false
            if (schd.start[getDate]() !== date[getDate]()) return false
            if (schd.repeatEvery){
                var diff = Math.abs(schd.start[getFullYear]() - date[getFullYear]())
                if (diff % schd.repeatEvery !== 0) return false
            }
        }
    }else{
        if (schd.start > date) return false
        if (schd.end < date) return false
    }
    return true
}

SL.isOutboundLink = function(elm){
    if (!elm.getAttribute('href')) return false
    var hostname = elm.hostname
    var href = elm.href
    var protocol = elm.protocol
    if (protocol !== 'http:' && protocol !== 'https:') return false
    var spansSubdomains = SL.settings.spansSubdomains
    if (spansSubdomains && SL.isSubdomainOf(hostname, location.hostname)) return false
    var isMyDomain = SL.any(SL.settings.domainList, function(domain){
        return SL.isSubdomainOf(hostname, domain)
    })
    if (isMyDomain) return false
    return hostname !== location.hostname
}

SL.isLinkerLink = function(elm){
    return SL.hasMultipleDomains() &&
        elm.hostname != location.hostname && 
        !elm.href.match(/^javascript/i) &&
        !SL.isOutboundLink(elm)
}

SL.isSubdomainOf = function(sub, root){
    if (sub === root) return true
    var idx = sub.length - root.length
    if (idx > 0)
        return sub.substring(idx) === root
    return false
}

// Filter `SL.rules` down to only the once relevant for the current page.
SL.filterRules = function(){
    var locationData = {
        hostname: location.hostname
        , protocol: location.protocol
        , URI: SL.data.URI
    }
      
    function matches(rule){
        if (!SL.ruleInScope(rule, locationData)) return false
        if (!SL.isRuleActive(rule)) return false
        return true
    }
      
    SL.rules = SL.filter(SL.rules, matches)
    SL.pageLoadRules = SL.filter(SL.pageLoadRules, matches)

}

SL.ruleInScope = function(rule, location){
    var scope = rule.scope
    if (!scope) return true
    var URI = scope.URI
    var subdomains = scope.subdomains
    var domains = scope.domains
    var protocols = scope.protocols

    if (URI && includeExcludeFails(URI, location.URI)) return false
    if (subdomains && includeExcludeFails(subdomains, location.hostname)) return false
    if (domains && matchFails(domains, location.hostname)) return false
    if (protocols && matchFails(protocols, location.protocol)) return false
     
    function includeExcludeFails(matcher, matchee){
        var include = matcher.include
        var exclude = matcher.exclude
        if (include && matchFails(include, matchee)) return true
        if (exclude){
            if (SL.isString(exclude) && exclude === matchee)
                return true
            if (SL.isArray(exclude) && SL.any(exclude, matches))
                return true
            if (SL.isRegex(exclude) && matches(exclude))
                return true
        }
        
        return false

        function matches(regex){
            return matchee.match(regex)
        }
    }

    function matchFails(matcher, matchee){
        if (SL.isString(matcher) && matcher !== matchee)
            return true
        if (SL.isArray(matcher) && !SL.any(matcher, matches))
            return true
        if (SL.isRegex(matcher) && !matches(matcher))
            return true
        return false

        function matches(regex){
            return matchee.match(regex)
        }

    }
    
    return true
}


// Run background tasks once. This will get invoked periodically.
SL.backgroundTasks = function(){
    var start = +new Date()
    SL.setFormListeners()
    SL.setVideoListeners()
    SL.loadStoredSettings()
    SL.registerNewElementsForDynamicRules()
    SL.eventEmitterBackgroundTasks()
    
    // Trigger condition events
    //SL.onEvent({type: 'condition', target: 'document'})
    var end = +new Date()
    // We want to keep an eye on the execution time here.
    // If it gets to around 50ms for any customer site, 
    // we want to either optimize or start using a task queue
    //SL.notify('Background tasks executed in ' + (end - start) + 'ms', 3)
}



// For rules that poll for dynamically injected elements on the page, 
// find them and register events for them.
SL.registerNewElementsForDynamicRules = function(){
    SL.each(SL.dynamicRules, function(rule){
        SL.cssQuery(rule.selector, function(elms){
            SL.each(elms, function(elm){
                if (SL.propertiesMatch(rule.property, elm)){
                    SL.registerEvents(elm, [rule.event])
                }
            })
        })
    })
}

// If the browser doesn't support CSS selector queries, we have to include one.
SL.ensureCSSSelector = function(){
    if (document.querySelectorAll){
        SL.hasSelector = true
        return
    }
    SL.loadingSizzle = true
    SL.sizzleQueue = []
    SL.loadScript(SL.basePath() + 'selector.js', function(){
        if (!SL.Sizzle){
            SL.logError(new Error('Failed to load selector.js'))
            return
        }
        var pending = SL.onEvent.pendingEvents
        SL.each(pending, function(evt){
            SL.handleEvent(evt)
        }, this)
        SL.onEvent = SL.handleEvent
        SL.hasSelector = true
        ;delete SL.loadingSizzle
        SL.each(SL.sizzleQueue, function(item){
            SL.cssQuery(item[0], item[1])
        })
        ;delete SL.sizzleQueue
        
    })
}

// Error Handling

SL.errors = []
SL.logError = function(err){
    SL.errors.push(err)
    SL.notify(err.name + ' - ' + err.message, 5)
}

// `pageBottom()`
// --------------
//
// The function is to be called by the web page using an script tag like so:
//
//     <script>_satellite.pageBottom()</script>
//
// just before the `</body>` tag.
SL.pageBottom = function(){
    SL.pageBottomFired = true
    SL.firePageLoadEvent('pagebottom')
}

// This allows Rover to configure the browser to use the staging library instead.
SL.stagingLibraryOverride = function(){
    /*jshint evil:true */
    var libraryOverride = SL.readStoredSetting('stagingLibrary') === 'true'
    if (libraryOverride){ // allow Rover to override the library to staging
        var scripts = document.getElementsByTagName('script')
          , regex = /^(.*)satelliteLib-(.*)\.js$/
          , regexStaging = /^(.*)satelliteLib-(.*)-staging\.js$/
          , match
          , matchStaging
          , src
        for (var i = 0, len = scripts.length; i < len; i++){
            src = scripts[i].getAttribute('src')
            if (!src) continue
            if (!match) match = src.match(regex)
            if (!matchStaging) matchStaging = src.match(regexStaging)
            if (matchStaging) break
        }
        if (match && !matchStaging){
            var stagingURL = match[1] + 'satelliteLib-' + match[2] + '-staging.js'
            document.write('<script src="' + stagingURL + '"></script>')
            return true
        }
    }
    return false
}

SL.checkAsyncInclude = function(){
    if (window.satellite_asyncLoad)
        SL.notify('You may be using the async installation of Satellite. In-page HTML and the "pagebottom" event will not work. Please update your Satellite installation for these features.', 5)
}

SL.hasMultipleDomains = function(){
    return SL.settings.domainList.length > 1
}

SL.handleOverrides = function(){
    if (Overrides){
        for (var key in Overrides){
            if (Overrides.hasOwnProperty(key)){
                SL.data[key] = Overrides[key]
            }
        }
    }
}

// `init()`
// --------
//
// Initialize Satellite.
//
// - `settings` - all the settings that comprising a library.
SL.init = function(settings) {
    if (SL.stagingLibraryOverride())
        return
        
    var tools = settings.tools
    ;delete settings.tools
    for (var key in settings){
        SL[key] = settings[key]
    }
    
    if(SL.data.customVars === undefined) 
        SL.data.customVars = {}
    
    SL.data.queryParams = QueryParams

    SL.handleOverrides()

    SL.detectBrowserInfo()

    if (SL.trackVisitorInfo)
        SL.trackVisitorInfo()

    SL.loadStoredSettings()
        
    SL.checkAsyncInclude()
    
    SL.ensureCSSSelector()
    
    SL.filterRules()
    SL.dynamicRules = SL.filter(SL.rules, function(rule){
        return rule.eventHandlerOnElement
    })
    
    SL.tools = SL.initTools(tools)
    SL.initEventEmitters()
    
    if (SL.settings.forceLowerCase)
        SL.data.URI = SL.data.URI.toLowerCase()

    if (SL.hasSelector)
        SL.domReady(SL.eventEmitterBackgroundTasks)
    SL.setListeners()
    
    // Setup background tasks
    function backgroundTasks(){
        SL.backgroundTasks()
        setTimeout(backgroundTasks, (SL.settings.recheckEvery || 3000))
    }
    SL.domReady(backgroundTasks)
    
    // Setup page load events
    SL.firePageLoadEvent('pagetop')
    
    SL.domReady(function(){
        SL.domReadyFired = true
        if (!SL.pageBottomFired)
            SL.pageBottom()
        SL.firePageLoadEvent('domready')
    })
    SL.addEventHandler(window, 'load', function(){
        SL.firePageLoadEvent('windowload')
    })
}

SL.pageLoadPhases = ['pagetop', 'pagebottom', 'domready', 'windowload']

SL.loadEventBefore = function(one, other){
    return SL.indexOf(SL.pageLoadPhases, one) <= SL.indexOf(SL.pageLoadPhases, other)
}

SL.flushPendingCalls = function(tool){
    if (tool.pending){
        SL.each(tool.pending, function(call){
            var cmd = call[0]
              , elm = call[1]
              , evt = call[2]
              , args = call[3]
            if (cmd in tool)
                tool[cmd].apply(tool, [elm, evt].concat(args))
            else if (tool.emit)
                tool.emit(cmd, elm, evt, args)
            else
                SL.notify('Failed to trigger ' + cmd + 
                    ' for tool ' + tool.id, 1)
        })
        ;delete tool.pending
    }
}
SL.setDebug = function(debug){
    if (!window.localStorage) return
    window.localStorage.setItem('sdsat_debug', debug)
}

SL.detectBrowserInfo = function(){
    // Based on <http://jsbin.com/inubez/3/>
    function matcher(regexs){
      return function(userAgent){
        for (var key in regexs){
          var regex = regexs[key];
          var match = regex.test(userAgent);
          if (match) return key;
        }
        return "Unknown";  
      };
    }

    var getBrowser = matcher({
        OmniWeb: /OmniWeb/,
        "Opera Mini": /Opera Mini/,
        "Opera Mobile": /Opera Mobi/,
        Opera: /Opera/,
        "Mobile Safari": /Mobile(\/[0-9A-z]+)? Safari/,
        Chrome: /Chrome/,
        Firefox: /Firefox/,
        "IE Mobile": /IEMobile/,
        IE: /MSIE/,
        Safari: /Safari/
    });

    var getOS = matcher({
        iOS: /iPhone|iPad|iPod/,
        Blackberry: /BlackBerry/,
        "Symbian OS": /SymbOS/,
        Maemo: /Maemo/,
        Android: /Android [0-9\.]+;/,
        Linux: / Linux /,
        Unix: /FreeBSD|OpenBSD|CrOS/,
        Windows: / Windows /,
        MacOS: /Macintosh;/
    });

    var getDeviceType = matcher({
        iPhone: /iPhone/,
        iPad: /iPad/,
        iPod: /iPod/,
        Nokia: /SymbOS|Maemo/,
        "Windows Phone": /IEMobile/,
        Blackberry: /BlackBerry/,
        Android: /Android [0-9\.]+;/,
        Desktop: /.*/
    });

    var userAgent = navigator.userAgent
    SL.browserInfo = {
        browser: getBrowser(userAgent)
        , os: getOS(userAgent)
        , deviceType: getDeviceType(userAgent)
    }
}

SL.BaseTool = function(settings){
    this.settings = settings ? settings: {}
}
SL.BaseTool.prototype = {
    triggerCommand: function(trig, elm, evt){
        var settings = this.settings || {}
          , forceLowerCase = SL.settings.forceLowerCase

          
        if (this.initialize && !this.initialized && !this.initializing){
            if (this.isQueueable(trig) && evt && SL.loadEventBefore(evt.type, settings.loadOn)){
                this.queueCommand(trig, elm, evt)
                return
            }
        }
          
        if ('forceLowerCase' in settings)
            forceLowerCase = settings.forceLowerCase
        var args = SL.preprocessArguments(trig['arguments'], elm, evt, forceLowerCase)
          , cmd = trig.command
          , method = this['$' + cmd]

        if (method){
            method.apply(this, [elm, evt].concat(args))
        }else if (this.$missing$){
            this.$missing$(cmd, elm, evt, args)
        }else
            SL.notify('Failed to trigger ' + cmd + 
                ' for tool ' + this.id, 1)
        
    },
    endPLPhase: function(pageLoadEvent){
        // override to handle end initialization
    },
    isQueueable: function(trig){
        // everything is queueable except `cancelToolInit`
        return trig.command !== 'cancelToolInit'
    },
    flushQueue: function(){
        if (this.pending)
            SL.each(this.pending, function(args){
                this.triggerCommand.apply(this, args)
            }, this)
    },
    queueCommand: function(trig, elm, evt){
        if (!this.pending)
            this.pending = []
        this.pending.push([trig, elm, evt])
    },
    $cancelToolInit: function(){
        this._cancelToolInit = true
    }
}

// Set Satellite to the global variable `_satellite`.
window._satellite = SL

// Orientation Change Event Emitter
// ================================
//
// The `orientationchange` event on mobile devices fire when the devices switchs between
// portrait and landscape modes. You can use `%event.orientation%` in your command arguments
// to evaluate to either `portrait` or `landscape`.
function OrientationChangeEventEmitter(){
    SL.addEventHandler(window, "orientationchange", OrientationChangeEventEmitter.orientationChange)
}
OrientationChangeEventEmitter.orientationChange = function (e) {
    var orientation = window.orientation === 0 ? 
        'portrait' : 
        'landscape'
    e.orientation = orientation
    SL.onEvent(e)
}
SL.availableEventEmitters.push(OrientationChangeEventEmitter)
// ElementExistsEventEmitter
// ==================
//
// Emits the `elementexists` event. The `elementexists` event fires when an element
// of a specified selector becomes into existance - either because it's in the page
// markup or dynamically injected later on. *Each rule only fires once.*

function ElementExistsEventEmitter(){
    this.rules = SL.filter(SL.rules, function(rule){
        return rule.event === 'elementexists'
    })
}
ElementExistsEventEmitter.prototype.backgroundTasks = function(){
    SL.each(this.rules, function(rule){
        SL.cssQuery(rule.selector, function(elms){
            if (elms.length > 0)
                SL.onEvent({type: 'elementexists', target: elms[0]})
        })
    })
}

SL.availableEventEmitters.push(ElementExistsEventEmitter)
// Mobile Zoom Tracker
// ===================
//
// Emits the `zoomchange` event when the zoom level has changed on an iOS device
// (unsupported on Android).
// The event will have the following properties
//
// - `method` - either `pinch` or `double tap`
// - `zoom` - a number representing the scale of zoom
// - `target` - target will be the document object
function ZoomEventEmitter(){
    if (!('ongestureend' in window) || !('ontouchend' in window))
        return // this browser doesn't support both touch events and gestures
    
    var lastZoom = ZoomEventEmitter.currentZoom()
      , gestureEndTime
      , delayFire = SL.settings.zoomChangeDelay || 1000
      , currentTimer
    SL.addEventHandler(document, 'gestureend', function(event){
        gestureEndTime = + new Date()
        setTimeout(function(){
            var z = ZoomEventEmitter.currentZoom()
            if (z === lastZoom) return
            lastZoom = z
            if (currentTimer)
                clearTimeout(currentTimer)
            currentTimer = setTimeout(function(){
                currentTimer = null
                var z = ZoomEventEmitter.currentZoom()
                if (lastZoom === z)
                    SL.onEvent({
                        type: 'zoomchange', 
                        method: 'pinch', 
                        zoom: z.toFixed(2),
                        target: document
                    })
            }, delayFire)
        }, 50)
    })

    SL.addEventHandler(document, 'touchend', function(e){
        if (gestureEndTime && (+new Date() - gestureEndTime) < 50) return
        setTimeout(function(){
            var z = ZoomEventEmitter.currentZoom()
            if (z === lastZoom) return
            lastZoom = z
            if (currentTimer)
                clearTimeout(currentTimer)
            currentTimer = setTimeout(function(){
                currentTimer = null
                var z = ZoomEventEmitter.currentZoom()
                if (lastZoom === z)
                    SL.onEvent({
                        type: 'zoomchange', 
                        method: 'double tap', 
                        zoom: z.toFixed(2),
                        target: document
                    })
            }, delayFire)
        }, 250)
    })
}

ZoomEventEmitter.currentZoom = function(){
    return document.documentElement.clientWidth / window.innerWidth
}

SL.availableEventEmitters.push(ZoomEventEmitter)
// VideoPlayedEventEmitter
// =======================
//
// Emits the `videoplayed` event, given a specified percentage or duration, i.e. `videoplayed`
// is a parameterized event. A rule looks like this
//
//      {
//          name: "Video 10% complete",
//          event: "videoplayed(10%)",
//          selector: "#video",
//          trigger: [
//              {
//                  tool: "ga",
//                  command: "trackEvent",
//                  arguments: [
//                      "video",
//                      "video 10% complete",
//                      "from: %URI%"
//                  ]
//              }
//          ]
//      }
//
// `10%` is in the paranthesis which indicates this rule will only fire when the 10%
// of the total length of the video has been played.
// You can also specifiy a duration in seconds, which looks like `videoplayed(8s)` - which
// stands for 8 seconds.

function VideoPlayedEventEmitter(){
    this.rules = SL.filter(SL.rules, function(rule){
        return rule.event.substring(0, 11) === 'videoplayed'
    })
    this.eventHandler = SL.bind(this.onUpdateTime, this)
}
VideoPlayedEventEmitter.prototype = {
    backgroundTasks: function(){
        var eventHandler = this.eventHandler
        SL.each(SL.rules, function(rule){
            SL.cssQuery(rule.selector || 'video', function(elms){
                SL.each(elms, function(elm){
                    if (SL.$data(elm, 'videoplayed.tracked')) return
                    SL.addEventHandler(elm, 'timeupdate', SL.throttle(eventHandler, 100))
                    SL.$data(elm, 'videoplayed.tracked', true)
                })
            })
        })
    },
    evalRule: function(elm, rule){
        var eventType = rule.event
          , seekable = elm.seekable
          , startTime = seekable.start(0)
          , endTime = seekable.end(0)
          , currentTime = elm.currentTime
          , m = rule.event.match(/^videoplayed\(([0-9]+)([s%])\)$/)
        if (!m) return
        var unit = m[2]
          , amount = Number(m[1])
        var func = unit === '%' ?
            function(){
                return amount <= 
                    100 * (currentTime - startTime) / (endTime - startTime)
            } :
            function(){
                return amount <= currentTime - startTime
            }
        if (!SL.$data(elm, eventType) && func()){
            SL.$data(elm, eventType, true)
            SL.onEvent({type: eventType, target: elm})
        }
    },
    onUpdateTime: function(e){
        var rules = this.rules
          , elm = e.target
        if (!elm.seekable || elm.seekable.length === 0) return
        for (var i = 0, len = rules.length; i < len; i++)
            this.evalRule(elm, rules[i])
    }
}
SL.availableEventEmitters.push(VideoPlayedEventEmitter)
// Hover Event Emitter
// =====================
//
// Emits the `hover` event in the event. This is better than `mouseover` because you can introduce a certain delay.
// 
//  {
//        name: "Hover for 1 second"
//        event: "hover(1000)",
//        ...
//  }
function HoverEventEmitter(){
    var eventRegex = this.eventRegex = /^hover\(([0-9]+)\)$/
    var rules = this.rules = []
    SL.each(SL.rules, function(rule){
        var m = rule.event.match(eventRegex)
        if (m){
            rules.push([
                Number(rule.event.match(eventRegex)[1]), 
                rule.selector
            ])
        }
    })
}
HoverEventEmitter.prototype = {
    backgroundTasks: function(){
        var self = this
        SL.each(this.rules, function(rule){
            var selector = rule[1]
              , delay = rule[0]
            SL.cssQuery(selector, function(newElms){
                SL.each(newElms, function(elm){
                    self.trackElement(elm, delay)
                })
            })
        }, this)
    },
    trackElement: function(elm, delay){
        var self = this
          , trackDelays = SL.$data(elm, 'hover.delays')
        if (!trackDelays){
            SL.addEventHandler(elm, 'mouseover', function(e){
                self.onMouseOver(e, elm)
            })
            SL.addEventHandler(elm, 'mouseout', function(e){
                self.onMouseOut(e, elm)
            })
            SL.$data(elm, 'hover.delays', [delay])
        }
        else if (!SL.contains(trackDelays, delay)){
            trackDelays.push(delay)
        }
    },
    onMouseOver: function(e, elem){
        var target = e.target || e.srcElement
          , related = e.relatedTarget || e.fromElement
          , hit = (elem === target || SL.containsElement(elem, target)) && 
                !SL.containsElement(elem, related)
        if (hit)
            this.onMouseEnter(elem)
    },
    onMouseEnter: function(elm){
        var delays = SL.$data(elm, 'hover.delays')
        var delayTimers = SL.map(delays, function(delay){
            return setTimeout(function(){
                SL.onEvent({type: 'hover(' + delay + ')', target: elm})
            }, delay)
        })
        SL.$data(elm, 'hover.delayTimers', delayTimers)
    },
    onMouseOut: function(e, elem){
        var target = e.target || e.srcElement
          , related = e.relatedTarget || e.toElement
          , hit = (elem === target || SL.containsElement(elem, target)) && 
                !SL.containsElement(elem, related)
        if (hit)
            this.onMouseLeave(elem)
    },
    onMouseLeave: function(elm){
        var delayTimers = SL.$data(elm, 'hover.delayTimers')
        if (delayTimers)
            SL.each(delayTimers, function(timer){
                clearTimeout(timer)
            })
    }
}
SL.availableEventEmitters.push(HoverEventEmitter)
// Twitter Event Emitter
// =====================
//
// Emits the `twitter.tweet` event in the event a user tweets from the site.
function TwitterEventEmitter(){
    function init(){
        var twttr = window.twttr
        if (twttr && twttr.events && twttr.events.bind) {
            twttr.events.bind('tweet', function(event) {
                if (event) {
                    SL.notify("tracking a tweet button", 1)
                    SL.onEvent({type: 'twitter.tweet', target: document})
                }
            });
        }
    }
    SL.domReady(init)
}
SL.availableEventEmitters.push(TwitterEventEmitter)
// Facebook Event Emitter
// ======================
//
// Will track `edge.create`, `edge.remove` and `message.send` events from the Facebook
// Javascript API and emit `facebook.like`, `facebook.unlike` and `facebook.send` events
// respectively.

function FacebookEventEmitter(){
    function init(){
        var FB = window.FB
        if (FB && FB.Event && FB.Event.subscribe){   
            try {
                FB.Event.subscribe('edge.create', function() {
                    SL.notify("tracking a facebook like", 1)
                    SL.onEvent({type: 'facebook.like', target: document})
                });
                FB.Event.subscribe('edge.remove', function() {
                    SL.notify("tracking a facebook unlike", 1)
                    SL.onEvent({type: 'facebook.unlike', target: document})
                });
                FB.Event.subscribe('message.send', function() {
                    SL.notify("tracking a facebook share", 1)
                    SL.onEvent({type: 'facebook.send', target: document})
                })
            }catch (e) {}
        }
    }
    SL.domReady(init)
}
SL.availableEventEmitters.push(FacebookEventEmitter)
// InviewEventEmitter
// ==================
//
// Emits the `inview` event. The `inview` event fires on an element when the element
// first comes into the view of the user. If the element is in view immediately upon page
// load, it will be fired right away, if it only comes in view after some scrolling, it
// will fire then. An optional delay interval `inviewDelay` can be specified in the rule
// which determine how long the element has to be in view for before the event fires,
// of which the default value is 1 second.

function InViewEventEmitter(){
    this.rules = SL.filter(SL.rules, function(rule){
        return rule.event === 'inview'
    })
    this.elements = []
    this.eventHandler = SL.bind(this.track, this)
    SL.addEventHandler(window, 'scroll', this.eventHandler)
    SL.addEventHandler(window, 'load', this.eventHandler)
}

// Util functions needed by `InViewEventEmitter`
InViewEventEmitter.offset = function(elem) {
	var box

	try {
		box = elem.getBoundingClientRect()
	} catch(e) {}

	var doc = document,
		docElem = doc.documentElement

	var body = doc.body,
		win = window,
		clientTop  = docElem.clientTop  || body.clientTop  || 0,
		clientLeft = docElem.clientLeft || body.clientLeft || 0,
		scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop,
		scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
		top  = box.top  + scrollTop  - clientTop,
		left = box.left + scrollLeft - clientLeft

	return { top: top, left: left }
}
InViewEventEmitter.getViewportHeight = function() {
    var height = window.innerHeight // Safari, Opera
    var mode = document.compatMode

    if (mode) { // IE, Gecko
        height = (mode == 'CSS1Compat') ?
        document.documentElement.clientHeight : // Standards
        document.body.clientHeight // Quirks
    }

    return height
}
InViewEventEmitter.getScrollTop = function(){
    return (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop)
}

InViewEventEmitter.prototype = {
    backgroundTasks: function(){
        var elements = this.elements
          , self = this
        SL.each(this.rules, function(rule){
            SL.cssQuery(rule.selector, function(elms){
                var addCount = 0
                SL.each(elms, function(elm){
                    if (!SL.contains(elements, elm)){
                        elements.push(elm)
                        addCount++
                    }
                })
                if (addCount){
                    SL.notify(rule.selector + ' added ' + addCount + ' elements.', 1)
                    self.track()
                }
            })
        })
    },
    checkInView: function(el, recheck){
        var vpH = InViewEventEmitter.getViewportHeight()
          , scrolltop = InViewEventEmitter.getScrollTop()
          , top = InViewEventEmitter.offset(el).top
          , height = el.offsetHeight
          , inview = SL.$data(el, 'inview')
        if (scrolltop > (top + height) || scrolltop + vpH < top) {
            if (inview)
                SL.$data(el, 'inview', false)
            this.processRules(el, function(rule, viewedProp, timeoutProp){
                var timeout = SL.$data(el, timeoutProp)
                if (timeout){
                    clearTimeout(timeout)
                }
            })
        } else if (scrolltop < (top + height)) {
            if (!inview)
                SL.$data(el, 'inview', true)
            var self = this
            this.processRules(el, function(rule, viewedProp, timeoutProp){
                if (recheck || !rule.inviewDelay){
                    SL.$data(el, viewedProp, true)
                    
                    SL.onEvent({type: 'inview', target: el})
                }else if(rule.inviewDelay){
                    var timeout = SL.$data(el, timeoutProp)
                    if (timeout)
                        clearTimeout(timeout)
                    timeout = setTimeout(function(){
                        self.checkInView(el, true)
                    }, rule.inviewDelay)
                    SL.$data(el, timeoutProp, timeout)
                }
            })
        }
    },
    track: function(){
        SL.each(this.elements, function(elm){
            this.checkInView(elm)
        }, this)
    },
    processRules: function(elm, callback){
        SL.each(this.rules, function(rule, i){
            var viewedProp = 'viewed_' + i
              , timeoutProp = 'inview_timeout_id_' + i
            if (SL.$data(elm, viewedProp)) return
            if (SL.matchesCss(rule.selector, elm)){
                callback(rule, viewedProp, timeoutProp)
            }
        })
    }
}
SL.availableEventEmitters.push(InViewEventEmitter)
// Site Catalyst Tool
// ---------------------
//
// The SiteCatalystTool allows you to use any Google Analytics command.
// Example:
//
//      trigger: [
//          {
//              tool: "sc",
//              command: "trackLink"
//          }
//      ]
//
function SiteCatalystTool(settings){
    this.settings = settings
    this.varBindings = {}
    this.events = []
    this.products = []
}
SL.inherit(SiteCatalystTool, SL.BaseTool)
SL.extend(SiteCatalystTool.prototype, {
    name: 'SC',
    initialize: function(pageLoadEvent){
        if (this._cancelToolInit) return
        
        if (this.settings.initTool !== false){
            var url = this.settings.sCodeURL || SL.basePath() + 's_code.js'
            if (typeof url === 'object'){
                if (window.location.protocol === 'https:')
                    url = url.https
                else
                    url = url.http
            }
            if (!url.match(/^https?:/))
                url = SL.basePath() + url
            if (this.settings.initVars){
                var initVars = this.substituteVariables(
                    this.settings.initVars, 
                    {
                        type: pageLoadEvent
                    })
                this.$setVars(null, null, initVars)
            }
            SL.loadScript(url, SL.bind(function(){
                SL.notify('SiteCatalyst: loaded.', 1)
                if (this.settings.customInit){
                    this.settings.customInit(this.getS())
                }
                this.trackInitialPageView()
                this.initialized = true
                this.initializing = false
            }, this))
            this.initializing = true
        }else{
            this.initializing = true
        }
    },
    backgroundTasks: function(){
        if (this.initializing){
            if (typeof window.s_gi === 'function'){
                this.flushQueue()
                this.initialized = true
                this.initializing = false
            }
        }
    },
    substituteVariables: function(obj, evt){
        var forceLowerCase = ('forceLowerCase' in this.settings) ? 
            this.settings.forceLowerCase :
            SL.settings.forceLowerCase
        var ret = {}
        for (var key in obj){
            var value = obj[key]
            ret[key] = SL.replace(value, location, evt)
        }
        return ret
    },
    trackInitialPageView: function(){
        this.flushQueue()
        this.sendBeacon()
    },
    endPLPhase: function(pageLoadEvent){
        var loadOn = this.settings.loadOn
        if (pageLoadEvent === loadOn){
            this.initialize(pageLoadEvent)
        }
    },
    $setVars: function(elm, evt, vars){
        for (var v in vars){
            var val = vars[v]
            if (typeof val === 'function')
                val = val()
            this.varBindings[v] = val
        }
        SL.notify('SiteCatalyst: set variables.', 2)
    },
    $customSetup: function(elm, evt, setup){
        this.customSetupFunc = function(s){
            setup.call(elm, evt, s)
        }
    },
    getAccount: function(hostname){
        if (hostname && this.settings.accountByHost){
            return this.settings.accountByHost[hostname] || this.settings.account
        }else{
            return this.settings.account
        }
    },
    getS: function(s, hostname){
        var varBindings = this.varBindings
        var hostname = hostname || window.location.hostname
        var acct = this.getAccount(hostname)
        var s_gi = window.s_gi
        if (!s_gi) return null
        var s = s || s_gi(acct)
        for (var v in varBindings)
            s[v] = varBindings[v]
        if (this.events.length > 0)
            s.events = this.events.join(',')
        if (this.customSetupFunc)
            this.customSetupFunc.call(window, s)
        return s
    },
    clearVarBindings: function(){
        this.varBindings = {}
    },
    sendBeacon: function(){
        var s = this.getS(window[this.settings.renameS || 's'])
        if (!s){
            SL.notify('SiteCatalyst: page code not loaded', 1)
            return
        }
        s.linkTrackVars = ''
        s.linkTrackEvents = ''
        s.t()
        this.clearVarBindings()
        SL.notify("SiteCatalyst: tracked page view", 1)
    },
    $trackLink: function(elm, evt, type, linkName){
        linkName = linkName || 
            (elm && elm.nodeName.toLowerCase() === 'a' ? elm.innerHTML : '') || 
            'link clicked'
        var s = this.getS(window[this.settings.renameS || 's'])
        if (!s){
            SL.notify('SiteCatalyst: page code not loaded', 1)
            return
        }
        var definedVarNames = this.definedVarNames()
        if (this.events.length > 0)
            definedVarNames.push('events')
        if (s.products)
            definedVarNames.push('products')

        s.linkTrackVars = definedVarNames.join(',')
        s.linkTrackEvents = this.events.join(',')
        s.tl(true, type || 'o', linkName)
        this.clearVarBindings()
        SL.notify("SiteCatalyst: tracked link", 1)
    },
    definedVarNames: function(){
        var ret = []
        for (var varname in this.varBindings){
            if (/^(eVar[0-9]+)|(prop[0-9]+)$/.test(varname))
                ret.push(varname)
        }
        return ret
    },
    $trackPageView: function(){
        var s = this.getS()
        if (!s){
            SL.notify('SiteCatalyst: page code not loaded', 1)
            return
        }
        s.linkTrackVars = ''
        s.linkTrackEvents = ''
        s.t()
        this.clearVarBindings()
        SL.notify("SiteCatalyst: tracked page view", 1)
    },
    $postTransaction: function(elm, evt, varname){
        var trans = SL.data.transaction = window[varname]
          , s = this.varBindings
          , mapping = this.settings.fieldVarMapping
        
        SL.each(trans.items, function(item){
            this.products.push(item)
        }, this)
        
        s.products = SL.map(this.products, function(item){
            var vars = []
            if (mapping && mapping.item){
                for (var field in mapping.item){
                    var varname = mapping.item[field]
                    vars.push(varname + '=' + item[field])
                    if (varname.substring(0, 5) === 'event')
                        this.events.push(varname)
                }
            }
            var arr = ['', item.product, item.quantity, item.unitPrice * item.quantity]
            if (vars.length > 0)
                arr.push(vars.join('|'))
            return arr.join(';')
        }, this).join(',')
        
        if (mapping && mapping.transaction){
            // Add top-level events/eVars to products string
            var topLevelVars = []
            for (var field in mapping.transaction){
                var varname = mapping.transaction[field]
                topLevelVars.push(varname + '=' + trans[field])
                if (varname.substring(0, 5) === 'event')
                    this.events.push(varname)
            }
            if (s.products.length > 0)
                s.products += ','
            s.products += ';;;;' + topLevelVars.join('|')
        }
        
        
    },
    $addEvent: function(elm, evt){
        for (var i = 2, len = arguments.length; i < len; i++){
            this.events.push(arguments[i])
        }
    },
    $addProduct: function(elm, evt){
        for (var i = 2, len = arguments.length; i < len; i++){
            this.products.push(arguments[i])
        }
    }
})
SL.availableTools.sc = SiteCatalystTool
// The Default Tool
// ================
//
// The default tool comes with several handy utilities.

function DefaultTool(){
    this.asyncScriptCallbackQueue = []
    this.argsForBlockingScripts = []
}
SL.inherit(DefaultTool, SL.BaseTool)
SL.extend(DefaultTool.prototype, {
    name: 'Default',
    
    // `loadIframe(src, variables)`
    // ----------------------------
    //
    // Dynamically create an iframe to load a URL.
    //
    // - src - the URL to load
    // - variables - an object literal of which the key/value pairs will be used
    //      to create the query string to use in the src URL
    $loadIframe: function(elm, evt, options){
        var pages = options.pages
          , loadOn = options.loadOn
        var doit = SL.bind(function(){
            SL.each(pages, function(page){
                this.loadIframe(elm, evt, page)
            }, this)
        }, this)
        if (!loadOn) doit()
        if (loadOn === 'domready') SL.domReady(doit)
        if (loadOn === 'load') SL.addEventHandler(window, 'load', doit)
    },
    
    loadIframe: function(elm, evt, page){
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        var host = SL.data.host
          , data = page.data
          , src = this.scriptURL(page.src)
          , search = SL.searchVariables(data, elm, evt)
        if (host)
            src = SL.basePath() + src
        src += search
        iframe.src = src
        var body = document.getElementsByTagName('body')[0]
        if (body)
            body.appendChild(iframe)
        else
            SL.domReady(function(){
                document.getElementsByTagName('body')[0].appendChild(iframe)
            })
    },

    scriptURL: function(url){
        var scriptDir = SL.settings.scriptDir || ''
        return scriptDir + url
    },
    
    // `loadScript(options)
    // ------------------------------
    //
    // Load any number of Javascript files using dynamically generated script tags.
    // If you provide multiple file URLs, they will be loaded sequentially.
    $loadScript: function(elm, evt, options){
        var scripts = options.scripts
          , sequential = options.sequential
          , loadOn = options.loadOn
        var doit = SL.bind(function(){
            if (sequential){
                this.loadScripts(elm, evt, scripts)
            }else{
                SL.each(scripts, function(script){
                    this.loadScripts(elm, evt, [script])
                }, this)
            }
        }, this)
        
        if (!loadOn) doit()
        else if (loadOn === 'domready') SL.domReady(doit)
        else if (loadOn === 'load') SL.addEventHandler(window, 'load', doit)
    },
    
    loadScripts: function(elm, evt, scripts) {
        var scripts = scripts.slice(0)
          , q = this.asyncScriptCallbackQueue
          , lastScript
          , target = evt.target || evt.srcElement
          , self = this
        function loadNext(){
            if (q.length > 0 && lastScript){
                var callback = q.shift()
                callback.call(elm, evt, target)
            }
            var script = scripts.shift()
            if (script){
                var host = SL.data.host
                  , src = self.scriptURL(script.src)
                if (host)
                    src = SL.basePath() + src
                SL.loadScript(src, loadNext)
                lastScript = script
            }
        }
        loadNext()
    },
    
    $loadBlockingScript: function(elm, evt, options){
        var scripts = options.scripts
          , loadOn = options.loadOn
        var doit = SL.bind(function(){
            SL.each(scripts, function(script){
                this.loadBlockingScript(elm, evt, script)
            }, this)
        }, this)
        //if (!loadOn || loadOn === evt.type) doit()
        doit()
    },
    
    loadBlockingScript: function(elm, evt, script){
        /*jshint evil:true */
        var src = this.scriptURL(script.src)
          , host = SL.data.host
          , target = evt.target || evt.srcElement
        if (host)
            src = SL.basePath() + src
        var markup = '<script src="' + src + '"></script>'
        this.argsForBlockingScripts.push([elm, evt, target])
        document.write(markup)
    },
    
    pushAsyncScript: function(callback){
        this.asyncScriptCallbackQueue.push(callback)
    },

    pushBlockingScript: function(callback){
        var args = this.argsForBlockingScripts.shift()
        var element = args[0]
        callback.apply(element, args.slice(1))
    },
    
    // `writeHTML(html)`
    // -----------------
    //
    // Write an HTML fragment onto the page using `document.write()`.
    // 
    // - `html` - the HTML fragment
    $writeHTML: function(elm, evt){
        /*jshint evil:true */
        if (SL.domReadyFired){
            SL.notify('Command writeHTML failed. You may be using an async installation of Satellite.', 1)
            return
        }
        if (evt.type !== 'pagebottom' && evt.type !== 'pagetop'){
            SL.notify('You can only use writeHTML on the `pagetop` and `pagebottom` events.', 1)
            return
        }
        for (var i = 2, len = arguments.length; i < len; i++){
            var html = arguments[i].html
            html = SL.replace(html, elm, evt)
            document.write(html)
        }
    },
    
    linkNeedsDelayActivate: function(a, win){
        win = win || window
        var tagName = a.tagName
          , target = a.getAttribute('target')
        if (tagName && tagName.toLowerCase() !== 'a')
            return false
        if (!target)
            return true
        else if (target === '_blank')
            return false
        else if (target === '_top')
            return win.top === win
        else if (target === '_parent')
            return false
        else if (target === '_self')
            return true
        else if (win.name)
            return target === win.name
        else
            return true
    },
    
    // `delayActivateLink()`
    // ---------------------
    //
    // Delay the activation of an anchor link by first using `evt.preventDefault()` on
    // the click event, and then setting the window location to the destination after
    // a small delay. The default delay is 100 milliseconds, which can be configured in
    // `_satellite.settings.linkDelay`
    $delayActivateLink: function(elm, evt){
        if (!this.linkNeedsDelayActivate(elm)) return
        SL.preventDefault(evt)
        var linkDelay = SL.settings.linkDelay || 100
        setTimeout(function(){
            SL.setLocation(elm.href)
        }, linkDelay)
    },
    
    isQueueable: function(trig){
        return trig.command !== 'writeHTML'
    }
})
SL.availableTools['default'] = DefaultTool

// Google Analytics Tool
// ---------------------
//
// The GATool allows you to use any Google Analytics command.
// Example:
//
//      trigger: [
//          {
//              tool: "ga",
//              command: "trackEvent",
//              arguments: [
//                  "video",
//                  "video 10% complete"
//              ]
//          }
//      ]
//
// This trigger will call the `trackEvent` method, which is equivalent to
//
//     _gaq.push(['_trackEvent', 'video', 'video 10% complete'])
function GATool(settings){
    this.settings = settings
}
SL.inherit(GATool, SL.BaseTool)
SL.extend(GATool.prototype, {
    name: 'GA',
    initialize: function(){
        var settings = this.settings
        var before = window._gaq
          , _gaq = window._gaq = before || []
          , initCommands = settings.initCommands || []
          , customInit = settings.customInit

        this.forceLowerCase = SL.settings.forceLowerCase
        if ('forceLowerCase' in settings){
            this.forceLowerCase = settings.forceLowerCase
        }

        if (!this.isSuppressed()){
            if (!before && !GATool.scriptLoaded){
                var url = ('https:' == document.location.protocol ? 
                    'https://ssl' : 'http://www') + 
                    '.google-analytics.com/ga.js'
                SL.loadScript(url)
                GATool.scriptLoaded = true
                SL.notify('GA: page code loaded.', 1)
            }
            var domain = settings.domain
              , trackerName = settings.trackerName
              , allowLinker = this.allowLinker()
              , account = settings.account
              , domainList = SL.settings.domainList
            _gaq.push([this.cmd('setAccount'), account])
            if (allowLinker)
                _gaq.push([this.cmd('setAllowLinker'), allowLinker])
            var domainName = SL.find(domainList, function(domain){
                var hostname = window.location.hostname
                return hostname.slice(hostname.length - domain.length) === domain
            })
            _gaq.push([this.cmd('setDomainName'), domainName ? ('.' + domainName) : 'auto'])
            SL.each(initCommands, function(cmd){
                var arr = [this.cmd(cmd[0])].concat(cmd.slice(1))
                _gaq.push(arr)
            }, this)
            if (customInit)
                this.suppressInitialPageView = false === customInit(_gaq, trackerName)
            if (settings.pageName)
                this.$overrideInitialPageView(null, null, settings.pageName)
        }else{
            SL.notify('GA: page code not loaded(suppressed).', 1)
        }

        this.initialized = true
        
    },
    isSuppressed: function(){
        return this._cancelToolInit || this.settings.initTool === false
    },
    allowLinker: function(){
        var domainList = SL.settings.domainList
        return (domainList && domainList.length > 1) || !!SL.settings.outboundLinkExcludes
    },
    tracker: function(){
        return this.settings.trackerName
    },
    cmd: function(cmd){
        var tracker = this.tracker()
        return tracker ? tracker + '._' + cmd : '_' + cmd
    },
    $overrideInitialPageView: function(elm, evt, url){
        this.urlOverride = url
    },
    trackInitialPageView: function(){
        if (this.isSuppressed()) return
        if (this.suppressInitialPageView) return
        if (this.urlOverride){
            var args = SL.preprocessArguments([this.urlOverride], location, null, this.forceLowerCase)
            this.$missing$('trackPageview', null, null, args)
        }else{
            this.$missing$('trackPageview')
        }
    },
    endPLPhase: function(pageLoadEvent){
        var loadOn = this.settings.loadOn
        if (pageLoadEvent === loadOn){
            SL.notify('GA: Initializing at ' + pageLoadEvent, 1)
            this.initialize()
            this.flushQueue()
            this.trackInitialPageView()
        }
    },
    $missing$: function(cmd, elm, evt, args){
        if (this._cancelToolInit) return
        var settings = this.settings
          , tracker = this.tracker()
          , fullCmd = this.cmd(cmd)
          , args = args ? [fullCmd].concat(args) : [fullCmd]
        _gaq.push(args)
        if (tracker)
            SL.notify("GA: sent command " + cmd + " to tracker " + tracker + 
                (args.length > 1 ? 
                    " with parameters [" + args.slice(1).join(', ') + "]" :
                    '') + ".", 1)
        else
            SL.notify("GA: sent command " + cmd + 
                (args.length > 1 ? 
                    " with parameters [" + args.slice(1).join(', ') + "]":
                    '') + ".", 1)
    },
    // individual command methods
    $postTransaction: function(elm, evt, varname){
        var trans = SL.data.customVars.transaction = window[varname]
        this.$missing$('addTrans', elm, evt, [
            trans.orderID,
            trans.affiliation,
            trans.total,
            trans.tax,
            trans.shipping,
            trans.city,
            trans.state,
            trans.country
        ])
        SL.each(trans.items, function(item){
            this.$missing$('addItem', elm, evt, [
                item.orderID,
                item.sku,
                item.product,
                item.category,
                item.unitPrice,
                item.quantity
            ])
        }, this)
        this.$missing$('trackTrans', elm, evt)
    },
    $link: function(elm, evt){
        var ga = this
        if (!this.allowLinker()) return
        if (!elm.hostname.match(this.settings.linkerDomains)) return
        if (SL.isSubdomainOf(elm.hostname, location.hostname)) return
        SL.preventDefault(evt)
        var linkDelay = SL.settings.linkDelay || 100
        setTimeout(function(){
            ga.$missing$('link', elm, evt, elm.href)
        }, linkDelay)
    }
})
SL.availableTools.ga = GATool
// Test & Target Tool
// ==================
//
// This tool lets you use Test & Target with Satellite.
//
//

function Tnt(settings){
	this.settings = settings
    // fix loading to pagetop
    SL.notify('Test & Target: Initializing', 1)
    this.styleElements = {}
    this.myInitialize()
}
SL.inherit(Tnt, SL.BaseTool)
SL.extend(Tnt.prototype, {
    name: 'tnt'
    , myInitialize: function(){
        var url = this.settings.mboxURL
        if (typeof url === 'object'){
            if (window.location.protocol === 'https:')
                url = url.https
            else
                url = url.http
        }
        if (!url.match(/^https?:/))
            url = SL.basePath() + url
        if (this.settings.initTool !== false){
            SL.loadScript(url, SL.bind(function(){
                SL.notify('Test & Target: loaded.', 1)
                this.flushQueue()
                this.initialized = true
                this.initializing = false
            }, this))
            this.initializing = true
        }else{
            this.initialized = true
        }
    }
    , $addMbox: function(elm, evt, settings){
        var mboxGoesAround = settings.mboxGoesAround
        var styleText = mboxGoesAround + '{visibility: hidden;}'
        var styleElm = this.appendStyle(styleText)
        if (!(mboxGoesAround in this.styleElements)){
            this.styleElements[mboxGoesAround] = styleElm
        }
        
        if (this.initialized){
            this.$addMBoxStep2(null, null, settings)
        }else if (this.initializing){
            this.queueCommand({
                command: 'addMBoxStep2'
                , "arguments": [settings]
            }, elm, evt)
        }
    }
    , $addMBoxStep2: function(elm, evt, settings){
        var mboxID = this.generateID()
        var self = this
        SL.domReady(SL.bind(function(){
            SL.cssQuery(settings.mboxGoesAround, function(elms){
                var elem = elms[0]
                if (!elem) return
                var newDiv = document.createElement("div")
                newDiv.id = mboxID
                elem.parentNode.replaceChild(newDiv, elem)
                newDiv.appendChild(elem)
                window.mboxDefine(mboxID, settings.mboxName)
                var args = [settings.mboxName]
                if (settings["arguments"])
                    args = args.concat(settings["arguments"])
                window.mboxUpdate.apply(null, args)
                self.reappearWhenCallComesBack(elem, mboxID, settings.timeout, settings)
            });
        }, this))
        this.lastMboxID = mboxID // leave this here for easier testing
    }
    , generateID: function(){
        var id = '_sdsat_mbox_' + String(Math.random()).substring(2) + '_'
        return id
    }
    , appendStyle: function(css){
        // <http://stackoverflow.com/a/524721/5304>
        var head = document.getElementsByTagName('head')[0]
          , style = document.createElement('style')
        style.type = 'text/css'
        if(style.styleSheet){
            style.styleSheet.cssText = css
        }else{
            style.appendChild(document.createTextNode(css))
        }
        head.appendChild(style)
        return style
    }
    , reappearWhenCallComesBack: function(elmGoesAround, mboxID, timeout, settings){
        var self = this

        function reappear(){
            var styleElm = self.styleElements[settings.mboxGoesAround]
            if (styleElm){
                styleElm.parentNode.removeChild(styleElm)
                ;delete self.styleElements[settings.mboxGoesAround]
            }
        }

        setTimeout(function(){
            SL.cssQuery('script[src*="omtrdc.net"]', function(results){
                var script = results[0]
                if (script){
                    SL.scriptOnLoad(script, function(){
                        SL.notify('Test & Target: request complete', 1)
                        reappear()
                        clearTimeout(timeoutID)
                    })
                    var timeoutID = setTimeout(function(){
                        SL.notify('Test & Target: bailing after ' + timeout + 'ms', 1)
                        reappear()
                    }, timeout)
                }else{
                    SL.notify('Test & Target: failed to find T&T ajax call, bailing', 1)
                    reappear()
                }
            })
        }, 1)
    }
})
SL.availableTools.tnt = Tnt
!function(){

function key(name){
    return '_sdsat_' + name
}

SL.trackVisitorInfo = function(){
    var newSession = SL.trackLandingPage()
    SL.trackSessionCount(newSession)
    SL.trackLifetimePagesViewed()
    SL.trackSessionPagesViewed()
    SL.trackTrafficSource()
}

// returns whether this is a new visitor session
SL.trackLandingPage = function(){
    // landing page
    var landingPageKey = key('landing_page')
    var existingLanding = SL.readCookie(landingPageKey)
    if (!existingLanding || existingLanding.split('|').length < 2)
        SL.setCookie(landingPageKey, location.href + '|' + (new Date().getTime()))
    return !existingLanding
}

SL.visitorLandingPage = function(){
    var value = SL.readCookie(key('landing_page'))
    if (!value) return null
    return value.split('|')[0]
}

SL.visitorLandingTime = function(){
    var value = SL.readCookie(key('landing_page'))
    if (!value) return null
    return Number(value.split('|')[1])
}

SL.minutesOnSite = function(){
    var now = new Date().getTime()
    return Math.floor((now - SL.visitorLandingTime()) / 1000 / 60)
}

SL.trackSessionCount = function(newSession){
    if (!newSession) return
    var session = SL.visitorSessionCount()
    SL.setCookie(key('session_count'), session + 1, 365 * 2 /* two years */)
}

SL.visitorSessionCount = function(){
    return Number(SL.readCookie(key('session_count')) || '0')
}

SL.isNewVisitor = function(){
    return SL.visitorSessionCount() === 1
}

SL.trackSessionPagesViewed = function(){
    SL.setCookie(key('pages_viewed'), SL.visitorSessionPagesViewed() + 1)
}

SL.trackLifetimePagesViewed = function(){
    SL.setCookie(key('lt_pages_viewed'), SL.visitorLifetimePagesViewed() + 1, 365 * 2)
}

SL.visitorLifetimePagesViewed = function(){
    return Number(SL.readCookie(key('lt_pages_viewed')) || 0)
}

SL.visitorSessionPagesViewed = function(){
    return Number(SL.readCookie(key('pages_viewed')) || '0')
}

SL.trackTrafficSource = function(){
    var k = key('traffic_source')
    if (!SL.readCookie(k)){
        SL.setCookie(k, document.referrer)
    }
}

SL.trafficSource = function(){
    return SL.readCookie(key('traffic_source'))
}

}()
// E-Commerce APIs
// ---------------
//
// The ecommerce API allows web admins to integrate e-commerce tracking with Satellite.
// More details on the [GA E-Commerce API's](http://code.google.com/apis/analytics/docs/gaJS/gaJSApiEcommerce.html).
// Upon any of the methods on the API being called, they will fire an event, which
// in turn can be handled by a rule in the library.

SL.ecommerce = {
    // `addItem(orderId, sku, name, category, price, quantity)`
    // -------------------------------------
    //
    // Add an item to the transaction.
    addItem: function(){
        var args = [].slice.call(arguments)
        SL.onEvent({type: 'ecommerce.additem', target: args})
    },

    // `addTrans(orderId, affiliation, total, tax, shipping, city, state, country)`
    // ----------------------------------------------------------------------------
    //
    // Add a new transaction.
    addTrans: function(){
        var args = [].slice.call(arguments)
        SL.data.saleData.sale = {
            orderId: args[0],
            revenue: args[2]
        }
        SL.onEvent({type: 'ecommerce.addtrans', target: args})
    },

    // `trackTrans()`
    // --------------
    //
    // Send the transaction data that's been set up using `addItem()` and `addTrans()`
    // to GA to be tracked.
    trackTrans: function(){
        SL.onEvent({type: 'ecommerce.tracktrans', target: []})
    }
}

_satellite.init({
  "tools": {
  },
  "pageLoadRules": [
    {"name":"iPerceptions (Canada)","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-509b15c89ce4890500000006.js","data":[]}]}]}],"scope":{"URI":{"include":[/.*/i],"exclude":[/\/(event|checkout|exchange|shoppinglist|auction|partner_redirect.*)\/.*/i]}},"conditions":[function(){
return _satellite.visitorSessionPagesViewed() > 4;
},function(event,target){
var settings = {
  trueForInclude : false, 
  startTime: 8, 
  endTime: 13
};

var hour = new Date().getHours();
var inRange = (hour >= settings.startTime && hour <= settings.endTime);
return ((inRange && settings.trueForInclude) || (!inRange && !settings.trueForInclude));
},function(){
return _satellite.textMatch(_satellite.getVar("Environment"), "ticketmaster.ca");
}],"event":"pagebottom"},
    {"name":"iPerceptions (US)","trigger":[{"command":"writeHTML","arguments":[{"html":"<!-- Begin: www.iperceptions.com -->\r\n<script type=\"text/javascript\">\r\n;(function (w, d, s) {\r\n    var js,                              \r\n    fjs = d.getElementsByTagName(s)[0],  \r\n    id = \"IPerceptionsJS\",\r\n    a = \"async\",\r\n    b = \"defer\", \r\n    c = d.cookie;\r\n \r\n    if(!(/(^|;)\\s*IPE(_S_)?110179=/.test(c)) && !(d.getElementById(id))) {  \r\n        js = d.createElement(s); \r\n        js.src = w.location.protocol + \"//ips-invite.iperceptions.com/webValidator.aspx?sdfc=44ac590b-110179-629832ab-2ba5-6a89-c3ed-9270a0e350a3&lID=1&loc=STUDY&cD=90&rF=False&iType=1&domainname=0\";\r\n        js.id = id; \r\n        js.type = \"text/javascript\";\r\n        js[a] = a;\r\n        js[b] = b;\r\n        fjs.parentNode.insertBefore(js, fjs);\r\n     }\r\n}) (window, document, \"script\");\r\n</script>\r\n<!-- End: www.iperceptions.com -->\r\n"}]}],"scope":{"URI":{"include":[/.*/i],"exclude":[/\/(event|checkout|exchange|shoppinglist|auction|partner_redirect.*)\/.*/i]}},"conditions":[function(){
return _satellite.visitorSessionPagesViewed() > 4;
},function(event,target){
var settings = {
  trueForInclude : false, 
  startTime: 8, 
  endTime: 13
};

var hour = new Date().getHours();
var inRange = (hour >= settings.startTime && hour <= settings.endTime);
return ((inRange && settings.trueForInclude) || (!inRange && !settings.trueForInclude));
},function(){
return _satellite.textMatch(_satellite.getVar("Environment"), "ticketmaster.com");
}],"event":"pagebottom"}
  ],
  "rules": [
    {"name":"Dead Header","trigger":[{"engine":"ga","command":"trackEvent","arguments":["dead content","dead header click: %this.innerHTML%","from: %URI%"]}],"conditions":[function(event,target){

  return !_satellite.isLinked(target)

}],"event":"click","isDefault":true,"selector":"h1, h2, h3, h4, h5"},
    {"name":"Dead Image","trigger":[{"engine":"ga","command":"trackEvent","arguments":["dead content","dead image click: %this.src%","from: %URI%"]}],"conditions":[function(event,target){

  return !_satellite.isLinked(target)

}],"event":"click","isDefault":true,"selector":"img"},
    {"name":"Download Link","trigger":[{"engine":"ga","command":"trackEvent","arguments":["downloads","download: %this.href%","from: %URI%"]},{"command":"delayActivateLink"}],"event":"click","isDefault":true,"selector":"a","property":{"href":/\.(?:doc|docx|eps|jpg|png|svg|xls|ppt|pptx|pdf|xlsx|tab|csv|zip|txt|vsd|vxd|xml|js|css|rar|exe|wma|mov|avi|wmv|mp3|wav|m4v)($|\&|\?)/i}},
    {"name":"Email Link","trigger":[{"engine":"ga","command":"trackEvent","arguments":["communication/social","email: %this.href%","from: %URI%"]}],"event":"click","isDefault":true,"selector":"a","property":{"href":/^mailto/i}},
    {"name":"Orientation Changed","trigger":[{"engine":"ga","command":"trackEvent","arguments":["mobile","orientation change to %event.orientation%","from: %URI%"]}],"event":"orientationchange","isDefault":true},
    {"name":"Outbound Link","trigger":[{"engine":"ga","command":"trackEvent","arguments":["outbound links","outbound link: %this.href%","from: %URI%"]},{"command":"delayActivateLink"}],"conditions":[function(event,target){
return _satellite.isOutboundLink(this)
}],"event":"click","isDefault":true,"selector":"a"},
    {"name":"Telephone Dial","trigger":[{"engine":"ga","command":"trackEvent","arguments":["mobile","dialed %this.href%","from: %URI%"]}],"event":"click","isDefault":true,"selector":"a","property":{"href":/^tel:/i}},
    {"name":"Zoom Changed","trigger":[{"engine":"ga","command":"trackEvent","arguments":["mobile","user zoomed","Zoomed using: %event.method% to scale %event.zoom%"]}],"event":"zoomchange","isDefault":true}
  ],
  "directCallRules": [

  ],
  "settings": {
    "trackInternalLinks": true,
    "libraryName": "satelliteLib-df472949e8a036d72570b7a081d946474e1d4d29",
    "allowGATTcalls": false,
    "downloadExtensions": /\.(?:doc|docx|eps|jpg|png|svg|xls|ppt|pptx|pdf|xlsx|tab|csv|zip|txt|vsd|vxd|xml|js|css|rar|exe|wma|mov|avi|wmv|mp3|wav|m4v)($|\&|\?)/i,
    "notifications": false,
    "utilVisible": false,
    "domainList": [
      "ticketmaster.ca",
      "ticketmaster.com"
    ],
    "spansSubdomains": true,
    "scriptDir": "bbc5bbf56a4c9cda1271b6b9cb3e94744124c05b/scripts/",
    "tagTimeout": 3000
  },
  "data": {
    "URI": 
document.location.pathname + document.location.search
,
    "browser": {
    },
    "cartItems": [

    ],
    "revenue": "",
    "host": {
      "http": "media.ticketmaster.com/en-us/js/satellite",
      "https": "media.ticketmaster.com/en-us/js/satellite"
    }
  },
  "dataElements": {
    "Environment": {"customJS":function(){
var environments = [
	{"name": "ticketmaster.com",
	 "domains": [
/^(?:.[^.]*\.)?ticketmaster.com$/, 
/^www\.tmol\.(?:dev|qa)[0-9]+\.websys\.tmcs$/, 
/^www\.toolspreview\.us\.websys\.tmcs$/, 
/^qaip[1-6]{1}\.ticketmaster\.net:800(?:2|3){1}$/ 
	]},
	{"name": "ticketmaster.ca",
	 "domains": [
/^(?:.[^.]*\.)?ticketmaster.ca$/, 
/^www\.tmca\.(?:dev|qa)[0-9]+\.websys\.tmcs$/, 
/^www\.toolspreview\.ca\.websys\.tmcs$/, 
/^qaip[1-6]{1}\.ticketmaster\.net:800(?:6|7){1}$/
	]}
];
var thisEnvironment = "unknown";
for(i=0;i<environments.length;i++) {
	en = environments[i].name;
	for(x=0;x<environments[i].domains.length;x++) {
		re = environments[i].domains[x];
		if(window.document.location.host.match(re)) {
			thisEnvironment = en;
			break;
		}
	}
	if(thisEnvironment != "unknown") {
		break;
	}
}
return thisEnvironment;
},"default":"unknown","storeLength":"pageview"},
    "Language": {"cookie":"LANGUAGE","default":"en-us","storeLength":"session"}
  }
});
})(window, document);
