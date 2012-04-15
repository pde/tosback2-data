
 /* This is a generated file.  Do not edit.  Edit the individual js files and regenerate the home page. */
/*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.4.0',
  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',

  emptyFunction: function() {},
  K: function(x) {return x}
}

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var Abstract = new Object();

Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}

Object.inspect = function(object) {
  try {
    if (object == undefined) return 'undefined';
    if (object == null) return 'null';
    return object.inspect ? object.inspect() : (object.toString ? object.toString() : typeof object);
  } catch (e) {
    if (e instanceof RangeError) return '...';
    throw e;
  }
}

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}

Function.prototype.bindAsEventListener = function(object) {
  var __method = this;
  return function(event) {
    return __method.call(object, event || window.event);
  }
}

Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
}

/*--------------------------------------------------------------------------*/

function $() {
  var elements = new Array();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }

  return elements;
}
Object.extend(String.prototype, {
  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(eval);
  },

  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },

  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
  },

  toQueryParams: function() {
    var pairs = this.match(/^\??(.*)$/)[1].split('&');
    return pairs.inject({}, function(params, pairString) {
      var pair = pairString.split('=');
      params[pair[0]] = pair[1];
      return params;
    });
  },

  toArray: function() {
    return this.split('');
  },

  camelize: function() {
    var oStringList = this.split('-');
    if (oStringList.length == 1) return oStringList[0];

    var camelizedString = this.indexOf('-') == 0
      ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
      : oStringList[0];

    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }

    return camelizedString;
  },

  inspect: function() {
    return "'" + this.replace('\\', '\\\\').replace("'", '\\\'') + "'";
  },
	_each: function(iterator) {
	    for (var i = 0; i < this.length; i++){
			iterator(this.substring(i, i+1));
		}
	},
	chunkSplit: function(length, limit){
		var output = [];
		var str = this;
		var c = 0;
		while(str.length && (!limit || ++c < limit)){
			output.push(str.substring(0, length));
			str = str.substring(length);
		}
		if(limit){
			output.push(str);
		}
		return output;
	}
	
});

String.prototype.parseQuery = String.prototype.toQueryParams;

var $break    = new Object();
var $continue = new Object();

var Enumerable = {
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) throw e;
        }
      });
    } catch (e) {
      if (e != $break) throw e;
    }
  },

  all: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      result = result && !!(iterator || Prototype.K)(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      if (result = !!(iterator || Prototype.K)(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },

  detect: function (iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern))
        results.push((iterator || Prototype.K)(value, index));
    })
    return results;
  },

  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.collect(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value >= (result || value))
        result = value;
    });
    return result;
  },

  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value <= (result || value))
        result = value;
    });
    return result;
  },

  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator) {
    return this.collect(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.collect(Prototype.K);
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function')
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      iterator(value = collections.pluck(index));
      return value;
    });
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  },
  
	unique: function(){
		return this.inject([], function(results, item){
			if(results.indexOf(item) < 0)
				results.push(item);
			return results;
		});
	}
}

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0; i < iterable.length; i++)
      results.push(iterable[i]);
    return results;
  }
}

Object.extend(Array.prototype, Enumerable);
Object.extend(String.prototype, Enumerable);

Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0; i < this.length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != undefined || value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value.constructor == Array ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  indexOf: function(object) {
    for (var i = 0; i < this.length; i++)
      if (this[i] == object) return i;
    return -1;
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  shift: function() {
    var result = this[0];
    for (var i = 0; i < this.length - 1; i++)
      this[i] = this[i + 1];
    this.length--;
    return result;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});
var Hash = {
  _each: function(iterator) {
    for (key in this) {
      var value = this[key];
      if (typeof value == 'function') continue;

      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },

  keys: function() {
    return this.pluck('key');
  },

  values: function() {
    return this.pluck('value');
  },

  merge: function(hash) {
    return $H(hash).inject($H(this), function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },

  toQueryString: function() {
    return this.map(function(pair) {
      return pair.map(encodeURIComponent).join('=');
    }).join('&');
  },

  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
}

function $H(object) {
  var hash = Object.extend({}, object || {});
  Object.extend(hash, Enumerable);
  Object.extend(hash, Hash);
  return hash;
}
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    do {
      iterator(value);
      value = value.succ();
    } while (this.include(value));
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')},
      function() {return new XMLHttpRequest()}
    ) || false;
  },

  activeRequestCount: 0
}

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responderToAdd) {
    if (!this.include(responderToAdd))
      this.responders.push(responderToAdd);
  },

  unregister: function(responderToRemove) {
    this.responders = this.responders.without(responderToRemove);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (responder[callback] && typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
  },

  onComplete: function() {
    Ajax.activeRequestCount--;
  }
});

Ajax.Base = function() {};
Ajax.Base.prototype = {
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      wait: false,
      parameters:   ''
    }
    Object.extend(this.options, options || {});
  },

  responseIsSuccess: function() {
    return this.transport.status == undefined
        || this.transport.status == 0
        || (this.transport.status >= 200 && this.transport.status < 300);
  },

  responseIsFailure: function() {
    return !this.responseIsSuccess();
  }
}

Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.url = url;
    this.hasStarted = false;
    this.setOptions(options);
    if(!this.options.wait){
      this.start();
    }
  },
  start: function() {
  	if(!this.hasStarted) {
  	  this.hasStarted = true;
  	  this.request(this.url);
  	}
  },
  request: function(url) {
    var parameters = this.options.parameters || '';
    if (parameters.length > 0) parameters += '&_=';

    try {
      this.url = url;
      if (this.options.method == 'get' && parameters.length > 0)
        this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;

      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.options.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) {
        this.transport.onreadystatechange = this.onStateChange.bind(this);
        setTimeout((function() {this.respondToReadyState(1)}).bind(this), 10);
      }

      this.setRequestHeaders();

      var body = this.options.postBody ? this.options.postBody : parameters;
      this.transport.send(this.options.method == 'post' ? body : null);

    } catch (e) {
      this.dispatchException(e);
    }
  },

  setRequestHeaders: function() {
    var requestHeaders =
      ['X-Requested-With', 'XMLHttpRequest',
       'X-Prototype-Version', Prototype.Version];

    if (this.options.method == 'post') {
      requestHeaders.push('Content-type',
        'application/x-www-form-urlencoded');

      /* Force "Connection: close" for Mozilla browsers to work around
       * a bug where XMLHttpReqeuest sends an incorrect Content-length
       * header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType)
        requestHeaders.push('Connection', 'close');
    }

    if (this.options.requestHeaders)
      requestHeaders.push.apply(requestHeaders, this.options.requestHeaders);

    for (var i = 0; i < requestHeaders.length; i += 2)
      this.transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState != 1)
      this.respondToReadyState(this.transport.readyState);
  },

  header: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) {}
  },

  evalJSON: function() {
    try {
      return eval(this.header('X-JSON'));
    } catch (e) {}
  },

  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },

  respondToReadyState: function(readyState) {
    var event = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();

    if (event == 'Complete') {
    	
      /* Avoid memory leak in MSIE: clean up the oncomplete event handler */
      /* This operation has been moved up here to fix a timing issue with IE 5.5 and executing 
       * respondToReadyState multiple times when complete 
       */
      this.transport.onreadystatechange = Prototype.emptyFunction;
      try {
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.responseIsSuccess() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(transport, json);
      } catch (e) {
        this.dispatchException(e);
      }

      if ((this.header('Content-type') || '').match(/^text\/javascript/i))
        this.evalResponse();
    }

    try {
      (this.options['on' + event] || Prototype.emptyFunction)(transport, json);
      Ajax.Responders.dispatch('on' + event, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }

    /* Avoid memory leak in MSIE: clean up the oncomplete event handler */
    /*
    if (event == 'Complete')
      this.transport.onreadystatechange = Prototype.emptyFunction;    
    */
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  },
  
  abort: function(){
  	this.transport.abort();
  }
  
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.containers = {
      success: container.success ? container.success : container,
      failure: container.failure ? container.failure :
        (container.success ? null : container)
    }
    this.url = url;
    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, object) {
      this.updateContent();
      onComplete(transport, object);
    }).bind(this);
    if(!this.options.wait)
      this.start();
  },
  updateContent: function() {
    var receiver = this.responseIsSuccess() ?
      this.containers.success : this.containers.failure;
    var response = this.transport.responseText;

    if (!this.options.evalScripts)
      response = response.stripScripts();

    if (receiver) {
      if (this.options.insertion) {
        new this.options.insertion($(receiver), response);
      } else {
        Element.update($(receiver), response);
      }
    }

    if (this.responseIsSuccess()) {
      if (this.onComplete)
        setTimeout(this.onComplete.bind(this), 10);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});


/**
 * Queue for controlling AJAX actions.
 * You can pass an Ajax.Request or Ajax.Updater object.
 * I wouldn't recommend using a PeriodicalUpdater here.  I don't know what would happen.
 */

Ajax.Queue = Class.create();

Ajax.Queue.FILO = 1;	//First in, Last out
Ajax.Queue.FIFO = 2;	//First in, First out
Ajax.Queue.Single = 3;	//Only one action at a time.  When you add a new action, 
			// the current one will be terminated.

Object.extend(Ajax.Queue.prototype, Enumerable);
Object.extend(Ajax.Queue.prototype, {
	initialize: function(mode, wait){
			var _queue;
			var mode
			var started;

			this._queue = [];
			this.mode = mode;
			this.started = !wait;
	},
	_each:	function(iterator) {
		for (var i = 0; i < this._queue.length; i++)
			iterator(this._queue[i]);
	},
	first:		function(){ return this._queue[0] },
	last:		function(){ return this._queue[this._queue.length - 1] },
	indexOf:	function(object) {
				for (var i = 0; i < this._queue.length; i++)
					if (this._queue[i] == object) return i;
				return -1;
	},
	addAction: function(ajax_obj, options){
		var action = new Ajax.QueueAction(this, ajax_obj, options);
		
		switch(this.mode){
			case Ajax.Queue.FILO:
				if(this._queue.length)
					this._queue[this._queue.length-1].deactivate();
			case Ajax.Queue.FIFO:
				this._queue.push(action);
				break;
			case Ajax.Queue.Single:
				if(this._queue.length > 0){
					if(this._queue[0].is_complete){
						this._queue.shift();
					}
					else{
						var old_action = this._queue[0];
						old_action.action.abort();
						if(old_action.onOverride){
							setTimeout(old_action.onOverride, 1);
						}
						if(this._queue.length)
							this._queue.shift();

					}
				}
				this._queue.push(action);
				if(this.started)
					this._queue[0].activate();
				break;
		}
		
		this.update();
	},
	
	start: function(){
		this.started = true;
		this.update();
	},
	
	stop: function(){
		this.started = false;
	},
	
	update: function(){
		if(this.started){
			switch(this.mode){
				case Ajax.Queue.FILO:
					if(this._queue[this._queue.length-1]){
						if(this._queue[this._queue.length-1].is_complete){
							this._queue.pop();
						}
						if(!this._queue[this._queue.length-1].is_active){
							this._queue[this._queue.length-1].activate();
						}
					}
					break;
				case Ajax.Queue.FIFO:
					if(this._queue[0]){
						if(this._queue[0].is_complete){
							this._queue.shift();
						}
						if(!this._queue[0].is_active){
							this._queue[0].activate();
						}
					}
					break;
				case Ajax.Queue.Single:
					if(this.started){
						if(this._queue.length && !this._queue[0].is_active)
							this._queue[0].activate();
					}
					break;
			}
		}
	}

});

Ajax.QueueAction = Class.create();

Object.extend(Ajax.QueueAction.prototype, {

	initialize: function(queue, action, options){
		var queue;
		var action;
		var priority;		//This does nothing right now
		var onOverride;
		var events;
		var missed_events;
		var is_active;
		var is_complete;
		var debug_mode;

		this.queue = queue;
		this.action = action;
		this.is_active = false;
		this.is_complete = false;
		
		this.missed_events = [];
		this.events = {};

		if(options){
			this.priority = options.priority ? options.priority : 1;
			this.onOverride = options.onOverride ? options.onOverride : null;
			this.debug_mode = options.debug_mode || false;
		}
		

		this.events.onComplete = action.options.onComplete || Prototype.emptyFunction;
		action.options.onComplete = function(){ 
			this.handleEvent('onComplete', $A(arguments)); 
		}.bind(this);
		
		this.events.onSuccess = action.options.onSuccess || Prototype.emptyFunction;
		action.options.onSuccess = function(){ 
			this.handleEvent('onSuccess', $A(arguments)); 
		}.bind(this);
		
		this.events.onFailure = action.options.onFailure || Prototype.emptyFunction;
		action.options.onFailure = function(){ 
			this.handleEvent('onFailure', $A(arguments)); 
		}.bind(this);
		
		this.events.onException = action.options.onException || Prototype.emptyFunction;
		action.options.onException = function(){ 
			this.handleEvent('onException', $A(arguments)); 
		}.bind(this);
		
		this.events.onCreate = action.options.onCreate || Prototype.emptyFunction;
		action.options.onCreate = function(){ 
			this.handleEvent('onCreate', $A(arguments)); 
		}.bind(this);
		
	},
	
	activate: function(){
		this.is_active = true;
		this.action.start();
		while(this.missed_events.length){
			var me = this.missed_events.shift();
			this.applyEvent(me.event_key, me.params);
		}
	},
	
	deactivate: function(){
		//Debug.log('Deactivating ' + this.action.url + '\n' + this.missed_events);
		this.is_active = false;
	},
	
	handleEvent: function(event_key, params){
		var debug = this.action.url + '\n' + event_key + "\n" + params;
		if(this.is_active){
			debug = debug + '\nApplying';
			this.applyEvent(event_key, params);
		}
		else{
			debug = debug + '\nDelaying';
			this.delayEvent(event_key, params);
			debug = debug + '\nMissed Events:' + this.missed_events.pluck('event_key');
		}
		if(this.debug_mode) Debug.log(debug);
	},
	
	applyEvent: function(event_key, params){
		if(this.debug_mode) Debug.log(this.action.url + '\nTriggering ' + event_key);
		this.events[event_key].apply(this.action, params);
		if('onComplete' == event_key){
			this.is_complete = true;
			this.is_active = false;
			this.queue.update();
		}
	},
	
	delayEvent: function(event_key, params){
		this.missed_events.push({event_key: event_key, params: params});
		//Debug.log('Delaying ' + this.action.url + '\n' + this.missed_events.pluck('event_key'));
	}

});

/**
 * Expanded by Aaron J Pedersen to find class when more than one class has been defined
 * Example class="class1 class2" you can find either class1 or class2
 */
document.getElementsByClassName = function(className, parentElement, nodeType) {
	var search_elements;
	
	if(nodeType)
		search_elements = $NL(($(parentElement) || document.body).getElementsByTagName(nodeType));
	else if(document.all)
		search_elements = $NL(($(parentElement) || document.body).all);
	else
		search_elements = $NL(($(parentElement) || document.body).getElementsByTagName("*"));

	className = className.toUpperCase();
 
  return search_elements.inject([], function(elements, child) {
  	var classElements = $A(child.className.toUpperCase().split(' '));
  	classElements.each(function(classElement) {
		if (classElement == className) {
	    		elements.push(child);
		}
  	});
  	return elements;
  });
}

/*--------------------------------------------------------------------------*/

if (!window.Element) {
  var Element = new Object();
}

Object.extend(Element, {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      Element[Element.visible(element) ? 'hide' : 'show'](element);
    }
  },

  hide: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = 'none';
    }
  },

  show: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = '';
    }
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
  },

  update: function(element, html) {
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
  },

  getHeight: function(element) {
    element = $(element);
    return element.offsetHeight;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).include(className);
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).add(className);
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).remove(className);
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        Element.remove(node);
    }
  },

  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },

  scrollTo: function(element) {
    element = $(element);
    var x = element.x ? element.x : element.offsetLeft,
        y = element.y ? element.y : element.offsetTop;
    window.scrollTo(x, y);
  },

  getStyle: function(element, style) {
    element = $(element);
    var value = element.style[style.camelize()];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(style) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style.camelize()];
      }
    }

    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto';

    return value == 'auto' ? null : value;
  },

  setStyle: function(element, style) {
    element = $(element);
    for (name in style)
      element.style[name.camelize()] = style[name];
  },

  getDimensions: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'display') != 'none')
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = '';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = 'none';
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element._overflow = element.style.overflow;
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden')
      element.style.overflow = 'hidden';
  },

  undoClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element.style.overflow = element._overflow;
    element._overflow = undefined;
  }
});

var Toggle = new Object();
Toggle.display = Element.toggle;

/*--------------------------------------------------------------------------*/

Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
}

Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);
    this.content = content.stripScripts();

    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        if (this.element.tagName.toLowerCase() == 'tbody') {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }

    setTimeout(function() {content.evalScripts()}, 10);
  },

  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
}

var Insertion = new Object();

Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});

Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },

  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});

Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});

Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set(this.toArray().concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set(this.select(function(className) {
      return className != classNameToRemove;
    }).join(' '));
  },

  toString: function() {
    return this.toArray().join(' ');
  }
}

Object.extend(Element.ClassNames.prototype, Enumerable);
var Field = {
  clear: function() {
    for (var i = 0; i < arguments.length; i++)
      $(arguments[i]).value = '';
  },

  focus: function(element) {
    $(element).focus();
  },

  present: function() {
    for (var i = 0; i < arguments.length; i++)
      if ($(arguments[i]).value == '') return false;
    return true;
  },

  select: function(element) {
    $(element).select();
  },

  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select)
      element.select();
  }
}

/*--------------------------------------------------------------------------*/

var Form = {
  serialize: function(form) {
    var elements = Form.getElements($(form));
    var queryComponents = new Array();

    for (var i = 0; i < elements.length; i++) {
      var queryComponent = Form.Element.serialize(elements[i]);
      if (queryComponent)
        queryComponents.push(queryComponent);
    }

    return queryComponents.join('&');
  },

  getElements: function(form) {
    form = $(form);
    var elements = new Array();

    for (tagName in Form.Element.Serializers) {
      var tagElements = form.getElementsByTagName(tagName);
      for (var j = 0; j < tagElements.length; j++)
        elements.push(tagElements[j]);
    }
    return elements;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name)
      return inputs;

    var matchingInputs = new Array();
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) ||
          (name && input.name != name))
        continue;
      matchingInputs.push(input);
    }

    return matchingInputs;
  },

  disable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.blur();
      element.disabled = 'true';
    }
  },

  enable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.disabled = '';
    }
  },

  findFirstElement: function(form) {
    return Form.getElements(form).find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    Field.activate(Form.findFirstElement(form));
  },

  reset: function(form) {
    $(form).reset();
  }
}

Form.Element = {
  serialize: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter) {
      var key = encodeURIComponent(parameter[0]);
      if (key.length == 0) return;

      if (parameter[1].constructor != Array)
        parameter[1] = [parameter[1]];

      return parameter[1].map(function(value) {
        return key + '=' + encodeURIComponent(value);
      }).join('&');
    }
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter)
      return parameter[1];
  }
}

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'submit':
      case 'hidden':
      case 'password':
      case 'text':
        return Form.Element.Serializers.textarea(element);
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
    }
    return false;
  },

  inputSelector: function(element) {
    if (element.checked)
      return [element.name, element.value];
  },

  textarea: function(element) {
    return [element.name, element.value];
  },

  select: function(element) {
    return Form.Element.Serializers[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },

  selectOne: function(element) {
    var value = '', opt, index = element.selectedIndex;
    if (index >= 0) {
      opt = element.options[index];
      value = opt.value;
      if (!value && !('value' in opt))
        value = opt.text;
    }
    return [element.name, value];
  },

  selectMany: function(element) {
    var value = new Array();
    for (var i = 0; i < element.length; i++) {
      var opt = element.options[i];
      if (opt.selected) {
        var optValue = opt.value;
        if (!optValue && !('value' in opt))
          optValue = opt.text;
        value.push(optValue);
      }
    }
    return [element.name, value];
  }
}

/*--------------------------------------------------------------------------*/

var $F = Form.Element.getValue;

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;

    this.lastValue = this.getValue();
    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
}

Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    var elements = Form.getElements(this.element);
    for (var i = 0; i < elements.length; i++)
      this.registerCallback(elements[i]);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        case 'password':
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'select-multiple':
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
}

Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,

  element: function(event) {
    return event.target || event.srcElement;
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },

  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },

  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase())))
      element = element.parentNode;
    return element;
  },

  observers: false,

  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
    return this.observers[this.observers.length-1];
  },

  unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0; i < Event.observers.length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },

  observe: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent))
      name = 'keydown';

    return this._observeAndCache(element, name, observer, useCapture);
  },
  
  stopObserving: function(element, name, observer, useCapture) {

    if(arguments.length == 1){
    	name = element[1];
    	observer = element[2];
    	useCapture = element[3];
    	element = element[0];
    }
    
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + name, observer);
    }
  }
});

/* prevent memory leaks in IE */
Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  clone: function(source, target) {
    source = $(source);
    target = $(target);
    target.style.position = 'absolute';
    var offsets = this.cumulativeOffset(source);
    target.style.top    = offsets[1] + 'px';
    target.style.left   = offsets[0] + 'px';
    target.style.width  = source.offsetWidth + 'px';
    target.style.height = source.offsetHeight + 'px';
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
    } while (element = element.parentNode);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },

  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';;
    element.style.left   = left + 'px';;
    element.style.width  = width + 'px';;
    element.style.height = height + 'px';;
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}


////////////////////////////////////////////////////
////	Custom Stuff below this line	////////////

/**
 * Define some globals for figuring out what type of element we have
 */

function Node() {}

Node.ELEMENT_NODE = 1;
Node.ATTRIBUTE_NODE = 2;
Node.TEXT_NODE = 3;
Node.CDATA_SECTION_NODE = 4;
Node.ENTITY_REFERENCE_NODE = 5;
Node.ENTITY_NODE = 6;
Node.PROCESSING_INSTRUCTION_NODE = 7;
Node.COMMENT_NODE = 8;
Node.DOCUMENT_NODE = 9;
Node.DOCUMENT_TYPE_NODE = 10;
Node.DOCUMENT_FRAGMENT_NODE = 11;
Node.NOTATION_NODE = 12;

/**
 * This section extends (or create in IE) the NodeList object
 * to allow for enumeration of read-only node lists (element.childNodes, etc)
 * A NodeList differs from an Array in a couple ways.
 * - It is specifically designed to hold Nodes (XML nodes or HTML elements)
 * - It is read only
 * - It is often "live" meaning that if the DOM changes, this list will often change
 *   without warning.
 * - It's much faster
 */
function IENodeList(node_list){
	var _real_node_list;
	this._real_node_list = node_list;
};

NodeList_Extensions = {
	elements:	function() {
					return this.inject([], function(elementNodes, element) {
					  if(element.nodeType == Node.ELEMENT_NODE)
						elementNodes.push(element);
					  return elementNodes;
					})
				},
	firstElement:	function(){
					return this.elements().first();
				},
	lastElement:	function(){
					return this.elements().last();
				},
	inspect:	Array.prototype.inspect				
};


Object.extend(IENodeList.prototype, Enumerable);
Object.extend(IENodeList.prototype, {
	_each:	function(iterator) {
		for (var i = 0; i < this._real_node_list.length; i++)
			iterator(this._real_node_list[i]);
	},
	first:		function(){ return this._real_node_list[0] },
	last:		function(){ return this._real_node_list[this._real_node_list.length - 1] },
	indexOf:	function(object) {
				for (var i = 0; i < this._real_node_list.length; i++)
					if (this._real_node_list[i] == object) return i;
				return -1;
			}
});
Object.extend(IENodeList.prototype, NodeList_Extensions);

if(typeof NodeList != 'undefined'){
	Object.extend(NodeList.prototype, Enumerable);	
	Object.extend(NodeList.prototype, {
		_each:		Array.prototype._each,
		first:		Array.prototype.first,
		last:		Array.prototype.last,
		indexOf:	Array.prototype.indexOf
	});
	Object.extend(NodeList.prototype, NodeList_Extensions);
}

/**
 * Build a browser independent NodeList object from a node list.
 * This does nothing in FireFox, but supplies a bunch of fixes in IE.
 */
function $NL(node_list){

	if(typeof IENodeList != 'undefined' || typeof node_list != 'NodeList'){
		return new IENodeList(node_list);
	}
	else{
		return node_list;
	}

}


/**
 * The Notification Center allows an object to subscribe to a system wide
 * message and have a function called when that message is broadcast.
 */
var _NotificationCenter = Class.create();
Object.extend(_NotificationCenter.prototype, {
	initialize: function(){
		this.subscribers = [];
	},
	
	addSubscriber: function(message, object, callback, once){
		if(!once || this.subscribers.any(function(sub){ return (message == sub.message && object == sub.object); }))
			this.subscribers.push({message: message, object: object, callback: callback});
	},
	
	/**
	 * Unsubscribe from a message.
	 * TODO: maybe there should be two functions: removeSubscriber and removeSubscriberForMessage
	 * 	the first one would unsubscribe that object from all messages and the second would
	 * 	act like this function does now.
	 */
	removeSubscriber: function(message, object){
		this.subscribers = this.subscribers.reject(function(subscriber){
			if(message == subscriber.message && object == subscriber.object)
				return true;
			else
				return false;
		});
	},
	
	/**
	 * Publish a notification.  This will activate the callback functions of any
	 * subscribers that are subscribed 'message'.
	 * The second parameter ('params'), should be an array of parameters that
	 * will be passed on to the callback functions of the subscribers.
	 */
	sendNotification: function(message, params){
		var sent = 0;
		this.subscribers.each(function(subscriber){
			if(message == subscriber.message){
				if(typeof subscriber.callback == 'string'){
					subscriber.object[subscriber.callback].apply(subscriber.object, [subscriber.message].concat(params));
					++sent;
				}
				else{
					subscriber.callback.apply(subscriber.object, [subscriber.message].concat(params));
					++sent;
				}
			}
		});
	}
});
var NotificationCenter = new _NotificationCenter();

function emptyElement(element){
	while(element.childNodes.length){
		element.removeChild(element.firstChild);
	}
}

var XML = {};
XML.getRootNode = function(responseXML){ 
	switch(responseXML.childNodes.length){
		case 1: return responseXML.childNodes[0]; break;
		case 2: return responseXML.childNodes[1]; break;
		default: return false; break;
	}
}
/**
 * Extensions of Prototype's Event object
 * @overview Event
 */ 

/**
 * Extensions to the Event class.
 * @class Event
 * @static
 */
Object.extend(Event, {_observe: Event.observe, _stopObserving: Event.stopObserving});
Object.extend(Event, {
	/**
	 * Extended to make it easier to stopObserving when anonymous functions are used
	 * as the observer.  Event.observe will now return an array containing all the 
	 * stuff required to stop the observer.
	 * 
	 * <strong>See original documentation for use.</strong>
	 */ 
	observe: function(element, name, observer, useCapture){
		Event._observe(element, name, observer, useCapture);
		return [element, name, observer, useCapture];
	},
	/**
	 * Event.stopObserving has been extended to allow a single parameter to be passed in.
	 * that parameter should be the array returned by Event.observe.
	 * 
	 * <strong>See original documentation for use.</strong>
	 */ 
	stopObserving: function(element, name, observer, useCapture){
	    if(arguments.length == 1){
	    	name = element[1];
	    	observer = element[2];
	    	useCapture = element[3];
	    	element = element[0];
	    }
		Event._stopObserving(element, name, observer, useCapture);
	}
});


var LEXUS_ROOT_URL = (LEXUS_ROOT_URL)?LEXUS_ROOT_URL:"";
var LEXUS_ROOT_ASSET = (LEXUS_ROOT_ASSET)?LEXUS_ROOT_ASSET:"";

/**
 * Function is for debugging.  
 * Will iterate over all properties of the given object and alert each to the UI.
 * @param {Object} obj Object to be debugged.
 */
function whatis (obj) {
	alert(obj)
	for(i in obj) {
		alert(i);	
	}
}	


/**
 * @constructor
 * This Class provides static methods to find the relative postion based on the current browser.
 */
var Dom = function() {
	
};

Dom.Browser = {
  IE:     !!(window.attachEvent && !window.opera),
  Opera:  !!window.opera,
  WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
  Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
  MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
}


Dom.viewport = {
  getDimensions: function() {
    var dimensions = { };
    var B = Dom.Browser;
    ['Width','Height'].each(function(d) {
      //var D = d.capitalize();
      dimensions[d] = (B.WebKit && !document.evaluate) ? self['inner' + d] :
        (B.Opera) ? document.body['client' + d] : document.documentElement['client' + d];
    });
    return dimensions;
  },

  getWidth: function() {
    return this.getDimensions().Width;
  },

  getHeight: function() {
    return this.getDimensions().Height;
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
  }
};

/**
  * Static Method finds the left most X-axis coordinate of the given object.
  * @param {Object} Object or String id of the DOM desired
  * @param topNode Object or String id to declare the top node to traverse too.
  * measurment will include the topNode
  * @return int - X-axis coordinate
  * @member Dom
  */  
Dom.getLeftX = function(id, topNode) {
	var obj = $(id);
	topNode = (topNode) ? $(topNode) : topNode;
  var curleft = 0;
  
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
			if(topNode && obj == topNode)
			  break;
		}
	} else if (obj.x)
		curleft += obj.x;
	return curleft;
}
Dom.getLeftXAsPx = function(id, topNode) {
	return Dom.getLeftX(id, topNode) + "px";
}
/**
 * Static Method finds the right most X-axis coordinate of the given object.
 * @param {Object} id Object or Id of the DOM desired
 * @param topNode Object or String id to declare the top node to traverse too.
 * measurment will include the topNode
 * @return int - X-axis coordinate
 * @member Dom
 */
Dom.getRightX = function(id, topNode) {
	var obj = $(id);
  
  return Dom.getLeftX(obj, topNode) + obj.offsetWidth;
}
Dom.getRightXAsPx = function(id,topNode) {
	return Dom.getRightX(id,topNode) + "px";
}
 /**
 * Static Method finds the bottom most Y-axis coordinate of the given object.
 * @param {Object} Object or String id of the DOM desired
 * @param topNode Object or String id to declare the top node to traverse too.
 * measurment will include the topNode
 * @return int - Y-axis coordinate
 * @member Dom
 */ 
Dom.getBottomY = function(id,topNode) {
	var obj = $(id);
	  
	return Dom.getTopY(obj,topNode) + obj.offsetHeight;
}
Dom.getBottomYAsPx = function(id,topNode) {
	return Dom.getBottomY(id,topNode) + "px";
}
 /**
 * Static Method finds the top most Y-axis coordinate of the given object.
 * @param {Object} Object or String id of the DOM desired
 * @param topNode Object or String id to declare the top node to traverse too.
 * measurment will include the topNode
 * @return int - Y-axis coordinate
 * @member Dom
 */ 
Dom.getTopY = function(id,topNode) {
	var obj = $(id);
	topNode = $(topNode)
	var curtop = 0;
	var index = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			index++;
			curtop += obj.offsetTop		  
			obj = obj.offsetParent;
			if(topNode && obj == topNode)
			  break;
		}
	} else if (obj.y)
	curtop += obj.y;
	return curtop;
}
Dom.getTopYAsPx = function(id,topNode) {
	return Dom.getTopY(id,topNode) + "px";
}
/**
 * Static Method finds the Left, Right, Top, Bottom positions of a certain object
 * and returns an object with 4 properties: <br />
 * .leftX <br />
 * .rightX <br />
 * .topY <br />
 * .bottomY <br />
 * @param {Object} id Object or String id of the DOM desired
 * @param topNode Object or String id to declare the top node to traverse too.
 * measurment will include the topNode
 * @return Object - with 4 properties .leftX, .rightX, .topY, bottomY
 * @member Dom
 */
Dom.getBoundries = function(id,topNode) {

	 var boundries = {
		leftX:   Dom.getLeftX(id,topNode),
		rightX:  Dom.getRightX(id,topNode),
		topY:    Dom.getTopY(id,topNode),
		bottomY: Dom.getBottomY(id,topNode),
		width: Dom.getRightX(id,topNode) - Dom.getLeftX(id,topNode),
		height: Dom.getBottomY(id,topNode) - Dom.getTopY(id,topNode)		
	}
	return boundries;	
}
Dom.isInBounds = function(id, x, y) {
	var rectangle = Dom.getBoundries(id);
	//IE doesn't recognize a one pixel borders as part of the boundaries, but still needs to be included.
	if(document.all){
		rectangle.leftX = rectangle.leftX + 2;
		rectangle.rightX = rectangle.rightX - 2;
		rectangle.topY = rectangle.topY + 2;
		rectangle.bottomY = rectangle.bottomY - 2;
	}
	
	if(x<=rectangle.leftX || x>=rectangle.rightX)
	  return false;
	if(y<=rectangle.topY || y>=rectangle.bottomY)
	  return false;
	
	return true;
}

Dom.isInModBounds = function(id, x, y, topMod, rightMod, botMod, leftMod) {
	botMod = (botMod) ? botMod : topMod;
	leftMod = (leftMod) ? leftMod : rightMod;
	var rectangle = Dom.getBoundries(id);
	rectangle.leftX = rectangle.leftX + leftMod;
	rectangle.rightX = rectangle.rightX - rightMod;
	rectangle.topY = rectangle.topY + topMod;
	rectangle.bottomY = rectangle.bottomY - botMod;
	
	if(x<=rectangle.leftX || x>=rectangle.rightX)
	  return false;
	if(y<=rectangle.topY || y>=rectangle.bottomY)
	  return false;
	
	return true;
}

/**
 * Add some logic to an HTMLImage node to fix transparent png behavior in IE < 7
 *
 * @function
 * @param {HTMLImage} img the image node
 * @param {boolean} [force] by default, only images where the url ends in 'png' are affected
 *         by this method.  supply true to this argument to force the image to be modified.
 * @returns {HTMLImage} the image node is returned to allow for method chaining
 */
Dom.IEPNG = function(img, force){
    if(document.all && !img.src.match('shim.gif')){
        // hide the image to start
        img.style.visibility = 'hidden';
        if(!Dom.IEPNG.wait_list)
            Dom.IEPNG.wait_list = [];
        var iefix_img = function(img, imgObj){
            if((img.src.match(/\.png(\?.*)?$/i) || force) && !img.src.match('shim.gif')){
                //FOR IE, Fix png images
                img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + img.src + "\', sizingMethod='scale')";
                img.style.height = imgObj.height + 'px';
                img.style.width = imgObj.width + 'px';
               
                ///TODO: we should not be using absolute paths in base libraries.  find another solution
                img.src = LEXUS_ROOT_ASSET + '/lexus-share/images/shim.gif';
            }
        };
        var clearWaitList = function(){
            var list = Dom.IEPNG.wait_list;
            var ll = list.length;
            for(var i = 0; i < ll; ++i){
                var obj = list.shift();

                if(obj.imgObj.complete && obj.imgObj.height > 1 && obj.imgObj.width > 1){
                    iefix_img(obj.img, obj.imgObj);
                    obj.img.style.visibility = 'visible';
                }
                else{
                    list.push(obj);
                }
            }
            if(list.length < 1){
                clearInterval(Dom.IEPNG.interval);
                Dom.IEPNG.interval = null;
            }
        };
        if(img.src.match(/\.png(\?.*)?$/i) || force){
            var imgObj = new Image();
            imgObj.src = img.src;
           
            Dom.IEPNG.wait_list.push({img:img,imgObj:imgObj});
           
            if(!Dom.IEPNG.interval){
                Dom.IEPNG.interval = setInterval(clearWaitList, 10);
            }
        }
    }   
    return img;
}; 

//TODO This code has been moved into prototype and should be deleted once we are
// sure there are no other users out there on the site.
function Node() {}

Node.ELEMENT_NODE = 1; 
Node.ATTRIBUTE_NODE = 2; 
Node.TEXT_NODE = 3; 
Node.CDATA_SECTION_NODE = 4; 
Node.ENTITY_REFERENCE_NODE = 5; 
Node.ENTITY_NODE = 6; 
Node.PROCESSING_INSTRUCTION_NODE = 7; 
Node.COMMENT_NODE = 8; 
Node.DOCUMENT_NODE = 9; 
Node.DOCUMENT_TYPE_NODE = 10; 
Node.DOCUMENT_FRAGMENT_NODE = 11; 
Node.NOTATION_NODE = 12;

Node.getFirstElementNode = function(elements) {
	// Hack for Safari's issue with converting to prototype's $A() for childNodes
	var array = new Array();
	for(var i=0; i<elements.length; i++) {
		array.push(elements[i]);
	}
	elements = $A(array);
	return elements.find(function(element) {	
      if(element.nodeType == Node.ELEMENT_NODE)
  		  return element;	
    });
}
Node.getAllElementNode = function(elements) {
   	// Hack for Safari's issue with converting to prototype's $A() for childNodes
    var array = new Array();
	for(var i=0; i<elements.length; i++) {
		array.push(elements[i]);
	}
	return $A(array).inject($(), function(elementNodes, element) {	
      if(element.nodeType == Node.ELEMENT_NODE)
  	    elementNodes.push(element);
      return elementNodes;
    })
}

var isFlashHidden = false;


function hideAllFlashInSafari() {
	if (!isFlashHidden && isMacBrowser()){
		var flashObjs = $A(document.getElementsByTagName('OBJECT')).concat($A(document.getElementsByTagName('EMBED')));
		
		flashObjs.each(function(flashObj) {
			flashObj.parentNode.style.visibility   = 'hidden';	
		})
		isFlashHidden = true;		
	}
}
function showAllFlashInSafari() {
	
	if (isFlashHidden){
		var flashObjs = $A(document.getElementsByTagName('OBJECT')).concat($A(document.getElementsByTagName('EMBED')));
		
		flashObjs.each(function(flashObj) {
			flashObj.parentNode.style.visibility = 'visible';		
		})		
		isFlashHidden = false;		
	}
}
function isMacBrowser() {
	if(navigator.userAgent.toLowerCase().indexOf('mac') > -1) {
		return true;	
	}
	return false;
}
function isFirefoxBrowser(){
	var ua = navigator.userAgent.toLowerCase();
	return ( ua != null && ua.indexOf( "firefox" ) != -1 ) ? true : false;
}

var isSelectHidden = false;
var selectsFound;
function disableAllSelectElementsInIE() {
	if (!isSelectHidden && hideSelectElements()){
		
		if(!selectsFound) {
			var selectObjs = document.getElementsByTagName('SELECT');
			selectsFound = new Array();
			
			for(var i=0; i<selectObjs.length; i++) {
				selectsFound.push(selectObjs[i]);
			}
		}
		for(var i=0; i<selectsFound.length; i++) {
			selectsFound[i].style.visibility = 'hidden';
		}
		isSelectHidden = true;		
	}
}
function enableAllSelectElementsInIE() {
	
	if (isSelectHidden && selectsFound){
		for(var i=0; i<selectsFound.length; i++) {
				selectsFound[i].style.visibility = 'visible';	
		}
		isSelectHidden = false;
	}
		
}
function hideSelectElements() {
	if(document.all) {
		return true;	
	}
	return false;
}


function hideElementsForOverlays() {
	hideAllFlashInSafari();
	disableAllSelectElementsInIE();
}

function showElementsForOverlays() {
	showAllFlashInSafari();
	enableAllSelectElementsInIE();
}
function Address() {}

Address.getParameters = function() {
	var params = new Object;
	
	var search = window.location.search.replace('?','');
	
	if(search != '') {
		var items = search.split('&');
		
		for(var i=0; i<items.length; i++) {
			var keyValue = items[i].split('=');
			
			params[keyValue[0]] = keyValue[1];
		}
	}
	return params;
}

function MovieUtils() {}


MovieUtils.buildFlashMovie = function(destination, params, noPlugin) {
	 	
	 	if(Plugin.isInstalled('Flash') && Plugin.getVersion('Flash') >= 7) {
			var objectCall = 'AC_FL_RunContent(~params~);';
			var objectParams = '';
			
			for(param in params) {
				objectParams += "'" + param + "',";
				objectParams += "'" + params[param] + "',"
			}
			objectParams += "'" + destination + "'";
			objectCall = objectCall.replace('~params~', objectParams);
			
			eval(objectCall);
	 	
	 	}
	 	else if(noPlugin){
	 		MovieUtils.buildNoPlugin(destination,'flash', params['width'], params['height']);
	 		return;
	 	}
	 	
}
 
MovieUtils.buildViewPointMovie = function(destination,params,noPlugin) {
 	
 	if(Plugin.isInstalled('MetaStream')) {
	 	var vmp = new MTSPlugin(params.movie, params.width*1, params.height*1, params.broadcast, params.alt, params.contentType);
		$(destination).innerHTML = vmp.OutputStream();
		
		return vmp;
 	}
 	else if(noPlugin){
 		MovieUtils.buildNoPlugin(destination,'viewpoint', params['width'], params['height']);
 	}
}
MovieUtils.buildQuickTimeMovie = function(destination,params,noPlugin) {
 	
	if(Plugin.isInstalled('QuickTime') && Plugin.getVersionAsFloat('QuickTime') >= 5) {
	    //** Show QTVR **
		var newAnimation = '<OBJECT CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" WIDTH=' + params.width*1 + ' HEIGHT=' + params.height*1 + ' CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab">\n';
		newAnimation = newAnimation + '<PARAM name="SRC" VALUE="' + params.movie + '">\n';
		newAnimation = newAnimation + '<PARAM name="AUTOPLAY" VALUE="true">\n';
		newAnimation = newAnimation + '<PARAM name="CONTROLLER" VALUE="false">\n';
		newAnimation = newAnimation + '<EMBED SRC="' + params.movie + '" WIDTH=' + params.width*1 + ' HEIGHT=' + params.height*1 + ' AUTOPLAY="true" CONTROLLER="false" PLUGINSPAGE="http://www.apple.com/quicktime/download/">\n';
		newAnimation = newAnimation + '</EMBED>\n';
		newAnimation = newAnimation + '</OBJECT>\n';
		
		$(destination).innerHTML = newAnimation;
		return new Object();
   	}
   	else if(noPlugin) {
   		MovieUtils.buildNoPlugin('spinsGalleryViewer', 'quicktime');
   	}
 	
}
MovieUtils.buildMediaPlayerMovie = function(destination,params, noPlugin) {
	
	if(Plugin.isInstalled('Windows Media')) {
		
		var embed = '<object id="MediaPlayer" width=~width~ height=~height~ assid="CLSID:226BF52A52-394A-11D3-B153-00C04F79FAA6 standby="Loading Windows Media Player components..." type="application/x-oleobject">'
				  +  '<param name="url" value="~movie~">'
				  +  '<param name="showcontrols" value="true">'
				  +  '<param name="autoStart" value="true">'
				  +  '<PARAM NAME="uiMode" VALUE="mini">'
				  +  '<embed type="application/x-mplayer2" src="~movie~" name="MediaPlayer" width=~width~ height=~height~></embed>'
				  +  '</object>';
				  
		embed = embed.replace(/~movie~/g, params['movie']);
		embed = embed.replace(/~width~/g, params['width']);
		embed = embed.replace(/~height~/g, params['height']);
		
		$(destination).innerHTML = embed;
	}
	else if(noPlugin){
		MovieUtils.buildNoPlugin(destination,'mediaplayer', params['width'], params['height']);
	}	
	
}

MovieUtils.buildNoPlugin = function(destination, type,width, height) {
	
	var div = '<DIV style="~style~"><DIV>~content~</DIV></DIV>';
	var content = '';
	var style = 'padding-left:5px;padding-right:5px;';
	if(width) {
		style += 'width:'+ (width - 10) + 'px;'
	}
	if(height) {
		style += 'height:'+ (height - 10) + 'px;'
	}
	switch (type) {
		case 'flash':
			content = '<a href="' + MovieUtils.getPluginDownloadLink(type) + '" target="_blank">Download Plug-in</a>'
			break;
		case 'quicktime':			
			content = '<A href="' + MovieUtils.getPluginDownloadLink(type) + '" target="_blank">Download Plug-in</a>'
			break;
		case 'viewpoint':
			content = '<A href="' + MovieUtils.getPluginDownloadLink(type) + '" target="_blank" ></a>'
			break;
		case 'mediaplayer':
			content = '<A href="' + MovieUtils.getPluginDownloadLink(type) + '" target="_blank">Download Plug-in</a>'
			break;	
		default:
			break;
	}
	div = div.replace('~style~', style);
	div = div.replace('~content~', content);
	
	if(destination) {
		$(destination).innerHTML = div;
	}
	else {
		document.write(div);
	}
	
}
MovieUtils.getPluginDownloadLink = function(type) {
	
	switch (type) {
		case 'flash':
			return 'http://get.adobe.com/flashplayer/';
			break;

		case 'quicktime':
			var url = 'http://www.apple.com/quicktime/download/';
			var version = 0;
			if(navigator.appVersion && navigator.appVersion.indexOf('MSIE') > -1) {
				var arVersion = navigator.appVersion.split("MSIE")
				var version = parseFloat(arVersion[1])
				
				if(version <= 5.5) {
					url =  'http://www.apple.com/support/downloads/quicktime652forwindows.html';	
				}
			}
			return url;
			break;

		case 'viewpoint':
			return 'http://www.viewpoint.com/cgi-bin/redirector.pl';
			break;

		case 'mediaplayer':
			return 'http://www.microsoft.com/windows/windowsmedia/player/download/download.aspx'
			break;

		default:
			break;
	}

}
function pluginPopup(url) {
	
}
function hasObject(parent, objectStr) {
	
	if(parent[objectStr])
		return true;
	else
		return false;
}
function ajaxUtils() {

}
ajaxUtils.buildAjaxUrl = function(urlPieces) {
	urlPieces.push('?random=' + Math.random());
	return urlPieces.join('');
}

// Method that appends "_dealer" to the link automatically when the link is accessed from a dealer page

function filterLink(link) {
	// capture the link, split it, add "_dealer." in between the array items, and reassemble the link to make the filtered link
	var linkToConvert = link;
	var splitLink = new Array();
	splitLink = linkToConvert.split('.');
	filteredLink = splitLink[0] + "_dealer." + splitLink[1];
	
	// verify if current page is a dealer page by splitting the url to determine if "dealer" is present in the path
	var isDealer;
	var currentPage = window.location.pathname;
	var splitPage = new Array();
	splitPage = currentPage.split('/');
	var currentPageName = splitPage[splitPage.length - 1].split('.');
	var splitPageName = new Array();
	splitPageName = currentPageName[0].split('_');
	var dealerIndicator = splitPageName[splitPageName.length - 1];
	
	// if "dealer" is present in the url, then set isDealer to true; if not, set to false
	if(dealerIndicator == "dealer"){
		isDealer = "true";
	}
	else{
		isDealer = "false";
	}
	
	// if current page is a dealer page, direct user to the filtered link, defined above
	if(isDealer == "true"){
		window.location.href = filteredLink;
	}
	// if current page is not a dealer page, direct user to the un-filtered link (passed as a parameter)
	else{
		window.location.href = link;
	}
}




/*
 * Site Constants  
 */
 menuTimeout = 250;
 IMG_ROOT = '/images/';
 IMG_SHARE = '/images/'
 var PAGE_ID = '';
 var MODEL_ID = '';
 var PAGE_LOAD = false;
/**
 * Function when called will find all Image tags and cache all images and any Over states that follows a given naming convention.
 * Such as xxxxxx.gif and xxxxxxOver.gif 
 * @type void
 */
 
DebugOnloadEventTiming = Class.create();
Object.extend(DebugOnloadEventTiming.prototype, {
	initialize: function() {
		this.startTime;
		this.endTime;
	},
	startTime: function() {
		this.startTime = new Date();
	},
	endTime: function() {
		this.endTime = new Date();
	},
	getElapseTime: function() {
		return this.endTime.getTime() - this.startTime.getTime();
	},
	printResults: function() {
		Debug.debug('onLoad Events Start Time:  ' + this.startTime.getDay() + '/' + this.startTime.getMonth() + '/' + this.startTime.getYear()
									   + ' ' + this.startTime.getHours() + ':' + this.startTime.getMinutes() + ':' + this.startTime.getSeconds()+ ':' + this.startTime.getMilliseconds() );
									   
		Debug.debug('onLoad Events End Time:  ' + this.endTime.getDay() + '/' + this.endTime.getMonth() + '/' + this.endTime.getYear()
									   + ' ' + this.endTime.getHours() + ':' + this.endTime.getMinutes() + ':' + this.endTime.getSeconds()+ ':' + this.endTime.getMilliseconds() );								   

		Debug.debug('onLoad Events Total Elapse Time:  ' + this.getElapseTime() + '(' + (this.getElapseTime()/1000) + ' seconds)');		

	}
});
var debugOnloadEventTiming = new DebugOnloadEventTiming();
 
OnPageLoadEvents = Class.create();
Object.extend(OnPageLoadEvents.prototype, {
	initialize: function(){
		this.actions = new Array();
		Event.observe(window, 'load', function(){this._executeActions()}.bind(this), false);
	},
	addAction: function(func) {
		
		this.actions.push(func);
	}, 
	_executeActions: function() {
		for(var i=0; i<this.actions.length; i++) {
			var action = this.actions[i];
			action.apply(window,[]);
		}
	}	
});
var onPageLoadEvents = new OnPageLoadEvents();

onPageLoadEvents.addAction(function() {debugOnloadEventTiming.startTime()});
onPageLoadEvents.addAction(function() {PAGE_LOAD = true;});




function debugOnloadStartTime() {
	var startTime
	
}

function cacheAllImages() {
	var cacheit = function(image, tag){
		if(image.src.indexOf(tag) == -1){
			var img = new Image();
			img.src = image.src.replace(new RegExp('(.*?)(\.(gif|png|jpg))', 'i'), '$1'+tag+'$2');
		}
	}
	$NL(document.getElementsByClassName('hover_Ov', document, 'img')).each(function(element){ 
		cacheit(element, 'Ov'); 
		Event.observe(element, 'mouseover', function(){swapOn(element, 'Ov'); });
		Event.observe(element, 'mouseout', function(){swapOut(element, 'Ov'); });
	});
	$NL(document.getElementsByClassName('hover_Over', document, 'img')).each(function(element){
		cacheit(element, 'Over'); 
		Event.observe(element, 'mouseover', function(){swapOn(element, 'Over'); });
		Event.observe(element, 'mouseout', function(){swapOut(element, 'Over'); });
	});
	$NL(document.getElementsByClassName('hover_On', document, 'img')).each(function(element){ cacheit(element, 'On') });
}
onPageLoadEvents.addAction(cacheAllImages);
//vent.observe(window, 'load', cacheAllImages, false);
/**
 * Function can be used to swap states of any image that follows a given naming convention. 
 * Such as xxxxxx.gif (off state) and xxxxxxOver.gif (on state).
 * You can use the function on an image itself like so:  
 * &gt;img src="./images/vn_btnAll.gif" onmouseOver="swapOver(this);" onmouseOut="swapOver(this);" &lt;
 * or you can add it to any element, like say, an A Href, like so:
 *  &lt;a href="./goSomeWhere.html" onmouseOver="swapOver('imageId');" onmouseOut="swapOver('imageId');" &lt; &gt;img src="..../" id="imageId" &lt; &gt;a&lt;
 * @param img String/Object
 * @type void
 */
function swapOver(img, suffix) {
	if(!suffix) { suffix = 'Over'; }
	var img = $(img);
	if(img.src.indexOf(suffix) > -1 || img.src == img.getAttribute('hover_src')) {
		if(img.getAttribute('nohover_src'))
			img.src = img.getAttribute('nohover_src');
		else
			img.src = img.src.replace(suffix, '');
	}
	else {
		if(img.getAttribute('hover_src')){
			img.setAttribute('nohover_src', img.src);
			img.src = img.getAttribute('hover_src');
		}
		else{
			var array = img.src.split('.');
			var src = "";		
			// Loop through all but the last
			for(var i=0; i<(array.length - 1); i++) {
				if(i!=0)
				 src += '.';
				src += array[i];
			}
			img.src = src + suffix + '.' + array[array.length-1];
		}
	}
}
function prepPNGforSwapOver(img, suffix){
	if(!suffix) { suffix = 'Over'; }
	var array = img.src.split('.');
	var src = "";		
	// Loop through all but the last
	for(var i=0; i<(array.length - 1); i++) {
		if(i!=0)
		 src += '.';
		src += array[i];
	}
	hoverSrc = src + suffix + '.' + array[array.length-1];
	img.setAttribute('nohover_src', img.src);
	img.setAttribute('hover_src', hoverSrc);
	Dom.IEPNG(img);
	//alert(img.src);
}
function swapOn(img, suffix) {
	if(!suffix) { suffix = 'Over'; }
	var img = $(img);
	if(img.src.indexOf(suffix) > -1) {
		// Do nothing.
	}
	else if(img.getAttribute('hover_src')){
		img.src = img.getAttribute('hover_src');
	}
	else {
		var array = img.src.split('.');
		var src = "";		
		// Loop through all but the last
		for(var i=0; i<(array.length - 1); i++) {
			if(i!=0)
			 src += '.';
			src += array[i];
		}
		img.src = src + suffix + '.' + array[array.length-1];
	}
}

function swapOut(img, suffix) {
	if(!suffix) { suffix = 'Over'; }
	var img = $(img);
	if(img.src.indexOf(suffix) > -1 || img.src == img.getAttribute('hover_src')) {
		if(img.getAttribute('nohover_src'))
			img.src = img.getAttribute('nohover_src');
		else
			img.src = img.src.replace(suffix, '');
	}
}

function swapOut_click(event, img, suffix){
	if(!suffix) { suffix = 'Over'; }
	var img = $(img);
	if(img.src.indexOf(suffix) > -1) {
		if(!Dom.isInBounds(img, Event.pointerX(event), Event.pointerY(event))){
			img.src = img.src.replace(suffix, '');
		}
	}

}

function swapClass(domObject, classStr){
	if(!domObject) return;
	domObject.className = classStr;
}

Object.extend(Element, {
	removeChildren: function(element){
		while(element.childNodes.length){
			Element.remove(element.childNodes[0]);
		}
	}
});

/**
*	Replaces ~search_string~ with replace_string in input_string.
*	Returns result.
*/

Object.extend(String.prototype, {
	templateReplace: function(search_string, replace_string){
		//var regEx = new RegExp('~' + search_string + '~', 'g')
		var output = this.replace('~' + search_string + '~', replace_string);

		return output;
	}
});

CursorPosition = Class.create();
Object.extend(CursorPosition.prototype, {
	initialize: function() {
		this.currentX;
		this.currentY;
	},
	setXY: function (e) {
	  this.currentX = (!document.all) ? e.pageX : window.event.clientX;
	  this.currentY = (!document.all) ? e.pageY : window.event.clientY;
	},
	getX: function(){
		return this.currentX;
	},
	getY: function(){
		return this.currentY;
	},
	initXY: function(){
		Event.observe(document, 'mousemove', function(event){
			cursorPosition.setXY(event);
		}.bindAsEventListener(this));
	}
});
var cursorPosition = new CursorPosition();
onPageLoadEvents.addAction(cursorPosition.initXY);

/*////////////
File: Tween.js
Creation Date: January 20 2006
Author: Philippe Maegerman
Email: mx2004-at-pandora.be
Website: http://jsTween.blogspot.com
Download: http://cfpim.coffeeflower.com/jsTween/Tween.js
*/////////////
function Delegate() {}
Delegate.create = function (o, f) {
	var a = new Array() ;
	var l = arguments.length ;
	for(var i = 2 ; i < l ; i++) a[i - 2] = arguments[i] ;
	return function() {
		var aP = [].concat(arguments, a) ;
		f.apply(o, aP);
	}
}

Tween = function(obj, prop, func, begin, finish, duration, suffixe){
	this.init(obj, prop, func, begin, finish, duration, suffixe)
}
var t = Tween.prototype;

t.obj = new Object();
t.prop='';
t.func = function (t, b, c, d) { return c*t/d + b; };
t.begin = 0;
t.change = 0;
t.prevTime = 0;
t.prevPos = 0;
t.looping = false;
t._duration = 0;
t._time = 0;
t._pos = 0;
t._position = 0;
t._startTime = 0;
t._finish = 0;
t.name = '';
t.suffixe = '';
t._listeners = new Array();	
t.setTime = function(t){
	this.prevTime = this._time;
	if (t > this.getDuration()) {
		if (this.looping) {
			this.rewind (t - this._duration);
			this.update();
			this.broadcastMessage('onMotionLooped',{target:this,type:'onMotionLooped'});
		} else {
			this._time = this._duration;
			this.update();
			this.stop();
			this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'});
		}
	} else if (t < 0) {
		this.rewind();
		this.update();
	} else {
		this._time = t;
		this.update();
	}
}
t.getTime = function(){
	return this._time;
}
t.setDuration = function(d){
	this._duration = (d == null || d <= 0) ? 100000 : d;
}
t.getDuration = function(){
	return this._duration;
}
t.setPosition = function(p){
	this.prevPos = this._pos;
	var a = this.suffixe != '' ? this.suffixe : '';
	this.obj[this.prop] = Math.round(p) + a;
	this._pos = p;
	this.broadcastMessage('onMotionChanged',{target:this,type:'onMotionChanged'});
}
t.getPosition = function(t){
	if (t == undefined) t = this._time;
	return this.func(t, this.begin, this.change, this._duration);
};
t.setFinish = function(f){
	this.change = f - this.begin;
};
t.geFinish = function(){
	return this.begin + this.change;
};
t.init = function(obj, prop, func, begin, finish, duration, suffixe){
	if (!arguments.length) return;
	this._listeners = new Array();
	this.addListener(this);
	if(suffixe) this.suffixe = suffixe;
	this.obj = obj;
	this.prop = prop;
	this.begin = begin;
	this._pos = begin;
	this.setDuration(duration);
	if (func!=null && func!='') {
		this.func = func;
	}
	this.setFinish(finish);
}
t.start = function(){
	this.rewind();
	this.startEnterFrame();
	this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});
	this._is_animating = true;
	//alert('in');
}
t.rewind = function(t){
	this.stop();
	this._time = (t == undefined) ? 0 : t;
	this.fixTime();
	this.update();
}
t.fforward = function(){
	this._time = this._duration;
	this.fixTime();
	this.update();
}
t.update = function(){
	this.setPosition(this.getPosition(this._time));
	}
t.startEnterFrame = function(){
	this.stopEnterFrame();
	this.isPlaying = true;
	this.onEnterFrame();
}
t.onEnterFrame = function(){
	if(this.isPlaying) {
		this.nextFrame();
		setTimeout(Delegate.create(this, this.onEnterFrame), 0);
	}
}
t.nextFrame = function(){
	this.setTime((this.getTimer() - this._startTime) / 1000);
	}
t.stop = function(){
	this.stopEnterFrame();
	if(this._is_animating){
		this._is_animating = false;
		this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'});
	}
}
t.stopEnterFrame = function(){
	this.isPlaying = false;
}

t.continueTo = function(finish, duration){
	this.begin = this._pos;
	this.setFinish(finish);
	if (this._duration != undefined)
		this.setDuration(duration);
	this.start();
}
t.resume = function(){
	this.fixTime();
	this.startEnterFrame();
	this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'});
}
t.yoyo = function (){
	this.continueTo(this.begin,this._time);
}

t.addListener = function(o){
	this.removeListener (o);
	return this._listeners.push(o);
}
t.removeListener = function(o){
	var a = this._listeners;	
	var i = a.length;
	while (i--) {
		if (a[i] == o) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
t.broadcastMessage = function(){
	var arr = new Array();
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i])
	}
	var e = arr.shift();
	var a = this._listeners;
	var l = a.length;
	for (var i=0; i<l; i++){
		if(a[i][e])
		a[i][e].apply(a[i], arr);
	}
}
t.fixTime = function(){
	this._startTime = this.getTimer() - this._time * 1000;
}
t.getTimer = function(){
	return new Date().getTime() - this._time;
}

Tween.regularEaseIn = function(t,b,c,d){
	return c*(t/=d)*t + b;
	}
Tween.regularEaseOut = function(t,b,c,d){
	return -c *(t/=d)*(t-2) + b;
	}

Tween.regularEaseInOut = function(t,b,c,d){
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
	}
	
//OPACITY TWEEN
OpacityTween.prototype = new Tween();
OpacityTween.prototype.constructor = Tween;
OpacityTween.superclass = Tween.prototype;

function OpacityTween(obj,func,fromOpacity,toOpacity,duration){
	this.targetObject = obj;
	this.init(new Object(),'x',func,fromOpacity,toOpacity,duration);
}
var o = OpacityTween.prototype;
o.targetObject = {};
o.onMotionChanged = function(evt){
	var v = evt.target._pos;
	var t = this.targetObject;
	t.style['opacity'] = v / 100;
	t.style['-moz-opacity'] = v / 100;
	if(t.filters) t.filters.alpha['opacity'] = v;
}

//Sequence
function Sequence(){
	this.children = new Array();
	this.currentChildIndex = 0;
	this._listeners = new Array();
	this.nextObject = new Object();
	this.addListener(this);
}
var s = Sequence.prototype;
s.addChild = function(tween){
	this.children.push(tween)
}
s.removeChild = function(tween){
	var a = this.children;	
	var i = a.length;
	while (i--) {
		if (a[i] == tween) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
s.start = function(){
	this.rewind();
	this.play();
	this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});
}
s.next = function(){
	this.children[this.currentChildIndex].removeListener(this.nextObject);
	if(this.currentChildIndex < this.children.length-1){
		this.currentChildIndex++;
		this.play();
	}
	else{
		this.stop();
		this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'});
	}
}
s.play = function(){
	this.nextObject = new Object();
	this.nextObject.onMotionFinished = Delegate.create(this, this.next);
	this.children[this.currentChildIndex].addListener(this.nextObject);
	this.children[this.currentChildIndex].start();
}
s.stop = function(){
	this.children[this.currentChildIndex].stop();
	this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'});
}
s.rewind = function(){
	this.children[this.currentChildIndex].removeListener(this.nextObject);
	this.currentChildIndex = 0;
	for(var i = 0; i < this.children.length; i++){
		this.children[i].rewind();
	}
}
s.fforward = function(){
	this.children[this.currentChildIndex].removeListener(this.nextObject);
	for(var i = 0; i < this.children.length; i++){
		this.children[i].fforward();
	}
	this.currentChildIndex = this.children.length - 1;
}
s.resume = function(){
	this.children[this.currentChildIndex].resume();
	this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionStopped'});
}
s.addListener = function(o){
	this.removeListener (o);
	return this._listeners.push(o);

}
s.removeListener = function(o){
	var a = this._listeners;	
	var i = a.length;
	while (i--) {
		if (a[i] == o) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
s.broadcastMessage = function(){
	var arr = new Array();
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i])
	}
	var e = arr.shift();
	var a = this._listeners;
	var l = a.length;
	for (var i=0; i<l; i++){
		if(a[i][e])
		a[i][e].apply(a[i], arr);
	}
}

/*//////////////////////////
	PARALLEL
///////////////////////////*/
function Parallel(){
	this.children = new Array();
	this.numChildren = 0;
	this._listeners = new Array();
	this.addListener(this);
	this.isPlaying = false;
}
var s = Parallel.prototype;
s.endObject = new Object();
s.addChild = function(tween){
	this.children.push(tween)
	this.numChildren++;
}
s.start = function(){
	this.play();
	this.broadcastMessage('onMotionStarted', {target:this, type:'onMotionStarted'});
}
s.play = function(){
	for(var u = 0; u < this.numChildren; u++){
		if(u==(this.numChildren-1)){
			this.endObject = new Object();
			this.endObject.onMotionFinished = Delegate.create(this, this.end);
			this.children[u].addListener(this.endObject);
		}
		this.children[u].start();
	}
	this.isPlaying = true;
}

s.end = function(){
	this.children[this.numChildren-1].removeListener(this.endObject);
	this.broadcastMessage('onMotionFinished', {target:this, type:'onMotionFinished'});
	this.isPlaying = false;
}
s.stop = function(){
	this.enumAction('stop');
	this.broadcastMessage('onMotionStopped', {target:this, type:'onMotionStopped'});
	this.isPlaying = false;
}
s.rewind = function(){
	this.enumAction('rewind');
	}
s.fforward = function(){
	this.enumAction('fforward');
	}
s.resume = function(){
	this.enumAction('resume');
	this.broadcastMessage('onMotionResumed', {target:this, type:'onMotionResumed'});
	}
s.yoyo = function(){
	this.enumAction('yoyo');
	}


s.enumAction = function(action){
	for(var u = 0; u < this.numChildren; u++){
		this.children[u][action]();
	}
}

s.addListener = function(o){
	this.removeListener (o);
	return this._listeners.push(o);

}
s.removeListener = function(o){
	var a = this._listeners;	
	var i = a.length;
	while (i--) {
		if (a[i] == o) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
s.broadcastMessage = function(){
	var arr = new Array();
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i])
	}
	var e = arr.shift();
	var a = this._listeners;
	var l = a.length;
	for (var i=0; i<l; i++){
		if(a[i][e])
		a[i][e].apply(a[i], arr);
	}
}

var LEXUS_ROOT_URL = (LEXUS_ROOT_URL)?LEXUS_ROOT_URL:"";
var LEXUS_ROOT_ASSET = (LEXUS_ROOT_ASSET)?LEXUS_ROOT_ASSET:"";

// Current nav item object
var currentItem = {
	name: null,
	button: null,
	submenu: null,
	delayHide: null,
	clearProperties: function(){
		this.name = null;
		this.button = null;
		this.submenu = null;
		this.delayHide = null;		
	}
}
// Submenu close time in milliseconds
var hideMeDelay	= 250;

// Main nav controller class
var mainNavController = Class.create(); 
Object.extend(mainNavController.prototype, {
    initialize: function() {
		this.setOnSection();
		this.setupItemListeners();
    },
	// Set current section's button to on state
	setOnSection: function() {
		var urlRoot = window.LEXUS_ROOT_URL || '';
		switch  (MODEL_ID) {
			// Header items
			case 'Performance':
				this.setOnItem('performance', 'btn');
			break;
			case 'CPO':
				this.setOnItem('cpo', 'btn');
			break;
			case 'Financial':
				this.setOnItem('fs', 'btn');
			break;
			case 'Hybrids':
				this.setOnItem('hyb', 'btn');
			break;
			case 'Quality':
				this.setOnItem('quality', 'btn');
			break;
			// Footer items	
			case 'Owners':
				this.setOnItem('owners', 'btn');
			break;
			case 'Accessories':
				this.setOnItem('accessories', 'btn');
			break;			
			case 'EnformMobileApp':
			case 'MOBILE':
				this.setOnItem('mobile', 'btn');
			break;
			case 'About':
			case 'AboutThisSite':
				this.setOnItem('about', 'btn');
			break;
			case "Contact":
				this.setOnItem('contact', 'btn');
			break;
			case 'Privacy':
			case 'OnlinePrivacyStmt':
				this.setOnItem('privacy', 'btn');
			break;
			case 'LegalTerms':
				this.setOnItem('legal_terms', 'btn');
			break;
			case 'FAQ':
				this.setOnItem('faq', 'btn');
			break;
			case 'Search':
				this.setOnItem('search', 'bkg');
			break;
			// Do nothing
			default: ;
		}
	},
	setOnItem: function(thisItemName, itemType) {
		if (itemType == 'bkg') {
			$('bkg_' + thisItemName).firstChild.src = $('bkg_' + thisItemName).firstChild.src.replace(new RegExp('(.*)(\.gif)', 'i'), '$1On$2');
		}
		if (itemType == 'btn') {
			$('btn_' + thisItemName).src = $('btn_' + thisItemName).src.replace(new RegExp('(.*)(\.gif)', 'i'), '$1On$2');
		}
	},
	setupItemListeners: function() {
	 	items = document.getElementsByClassName('nav_item');
		if (items.length > 0) {
			for (i = 0; i < items.length; i++) {
				var thisItemButton = items[i].childNodes[0].childNodes[0];
				Event.observe(thisItemButton, 'mouseover', this.mouseoverButton.bindAsEventListener(this));
				Event.observe(thisItemButton, 'mouseout', this.delayHideSubmenu.bindAsEventListener(this))
			}
			// Set logo to link to home page
			Event.observe($('nav_top_logo_img'), 'mouseover', function(){
				$('nav_top_logo_img').style.cursor = 'pointer';
			});
			Event.observe($('nav_top_logo_img'), 'click', function(){
				// If page is home page...
				// (Include JS var LOGO_ROTATE == true in other pages to enable this behavior)
				if (typeof LOGO_ROTATE !== 'undefined') {
					if (LOGO_ROTATE == true) {			
						// ...try to fast forward the backgrounds
						if(mainImageAutoRotate) {
							mainImageAutoRotate.fastForward();
						}
					}
				} else {
					// Otherwise, go to home page
					window.location = LEXUS_ROOT_URL + '/lexus-main/';
				}
	
			}.bind(LEXUS_ROOT_URL));
		}
	},
	mouseoverButton: function(event) {
		var thisItemButton = Event.element(event);
		// Clear counter and allow other submenus to reuse it
		this.clearHideSubmenu();
		thisItemName = thisItemButton.id.slice(4, (thisItemButton.id.length));
		thisItemSubmenu = $('sub_' + thisItemName);
		// Show item button over or keep on state
		if (!thisItemButton.src.match('On')) {
			if (thisItemButton.src.match('Sub')) {
				thisItemButton.src = thisItemButton.src.replace(new RegExp('(.*)Sub(\.gif)', 'i'), '$1Over$2');
			}
			if (!thisItemButton.src.match('Over')) {
				thisItemButton.src = thisItemButton.src.replace(new RegExp('(.*)(\.gif)', 'i'), '$1Over$2');
			}
		}
		// If current item isn't this item, do stuff
		if (thisItemName !== currentItem.name) {
			this.hideSubmenu();
			if (window.event) { // IE
				event.cancelBubble = true;
			}
			// If subnav exists, show it
			if (thisItemSubmenu) {
				// Temporary exception code for Innovation submenu
				//if (thisItemName !== 'inno') {
        navigationManager.hideNavigation();
        hideElementsForOverlays();
        thisItemSubmenu.style.visibility = 'visible';
        // Set up submenu mouseover and mouseout 
        Event.observe(thisItemSubmenu, 'mouseover', this.mouseoverSubmenu.bindAsEventListener(this));
        Event.observe(thisItemSubmenu, 'mouseout', this.delayHideSubmenu.bindAsEventListener(this));
				//}
			}
			// Assign current item to be this item
			currentItem.name = thisItemName;
			currentItem.button = thisItemButton;
			currentItem.submenu = thisItemSubmenu;
		}
	},
	mouseoverSubmenu: function(event) {
		var currentItemButton = currentItem.button;
		// Clear counter and allow other submenus to reuse it
		this.clearHideSubmenu();			
		// Show current item button submenu state
		if (currentItemButton.src.match('Over')) {
			currentItemButton.src = currentItemButton.src.replace(new RegExp('(.*)Over(\.gif)', 'i'), '$1Sub$2');
		}
	},
	// Set a delay for hiding both the current item button and submenu
	delayHideSubmenu: function(event) {
		clearTimeout(currentItem.delayHide);
	    currentItem.delayHide = setTimeout(this.hideSubmenu, hideMeDelay);
	},
	hideSubmenu: function() {
		// If current item doesn't exist, return
		if (!currentItem.name) {
			return;
		}
		// Show item button off or keep on state
		if (!currentItem.button.src.match('On')) {
			if (currentItem.button.src.match('Sub')) {
				currentItem.button.src = currentItem.button.src.replace(new RegExp('(.*)Sub(\.gif)', 'i'), '$1$2');
			}
			if (currentItem.button.src.match('Over')) {
				currentItem.button.src = currentItem.button.src.replace(new RegExp('(.*)Over(\.gif)', 'i'), '$1$2');
			}
		}
		// If current item subnav exists, hide it
		if (currentItem.submenu) {
			currentItem.submenu.style.visibility = 'hidden';
		}
		// Clear out current item properties/set it to be nothing
		currentItem.clearProperties();
		
    // Show all flash objects in safari
  	showElementsForOverlays();
	},
	clearHideSubmenu: function() {
		// Clear counter and allow other submenus to reuse it
		if (typeof currentItem.delayHide != "undefined") {
        	clearTimeout(currentItem.delayHide);
    	}
	}
});

// Initialize main nav controller
function initLexusNavController() {
	lexusNavController = new mainNavController();
}
//onPageLoadEvents.addAction(initLexusNavController);
//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs,destination) 
{ 
  var str = '<object ';
  for (var i in objAttrs) {
   	if(i != 'name') {
    	str += i + '="' + objAttrs[i] + '" ';
   	}
  }
  str += '>';
  for (var i in params) {
    if(i != destination)
    	str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  }
  str += '<embed ';
  for (var i in embedAttrs) {
  	if(i != destination) {
    	str += i + '="' + embedAttrs[i] + '" ';
  	}
  }
  str += ' ></embed></object>';

  if($(destination)) {
  	$(destination).innerHTML = str;
  }
  else {
  	document.write(str);
  }
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs, arguments[arguments.length -1]);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

//v1.1
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AX_RunContent(){
  var ret = AC_AX_GetArgs(arguments);
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_AX_GetArgs(args){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "pluginspage":
      case "type":
      case "src":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "data":
      case "codebase":
      case "classid":
      case "id":
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  return ret;
}

		/**
		 * This is the controller class for the Secondary (side) Navigation section.
		 * There will always be exactly one of these objects available, so
		 * I'm instanciating it as the class is created.  This may change in the future.
		 */
		var SecondaryNav = new function (){ 
		
			var root_element;
			var sections;
			var expanders;
			var model_id;
			var page_id;
			var ignore_page_id;
			
			var accordian_func;
			
			var open_section;
			
			/**
			 * Initialize our secondary navigation controller object
			 */
			this.init = function(event){
				/**
				 * Gather referenced to important elements
				 */
				this.root_element = $('sn_wrapper');
				this.sections = document.getElementsByClassName('subsection', this.root_element);
				this.expanders = document.getElementsByClassName('expander', this.root_element);
				
				/**
				 * Get the model id and apply it to the root element.
				 */
				Try.these(
					function(){
						this.model_id = MODEL_ID;
					}.bind(this),
					function(){
						this.model_id = false;
					}
				);
				
				Try.these(
					function(){
						this.page_id = PAGE_ID;
					}.bind(this),
					function(){
						this.page_id = '';
					}.bind(this)
				);
				
				Try.these(
					function(){
						this.ignore_page_id = IGNORE_PAGE_ID;
					},
					function(){
						this.ignore_page_id = false;
					}
				);
				
			
				if(this.model_id){
					Element.addClassName(this.root_element, this.model_id);

//					var head_img = $('sn_imgHeader');
//					head_img.src = head_img.src.replace(new RegExp('.*?\#(.*)'), '$1').replace('MODEL', this.model_id);
//					head_img.setAttribute('alt', head_img.alt.templateReplace('model', this.model_id));
				}

				/**
				 * Set initial open section
				 * Look for a section that has the classname "open"
				 */
				for(i in this.sections){
					if(this.sections[i].className){
						if(Element.hasClassName(this.sections[i].parentNode, 'open')){
							if(this.page_id != 'CLOSEALL'){
								this.open_section = this.sections[i].parentNode;
								if(document.all){
									Element.removeClassName(this.open_section, 'open');
									Element.addClassName(this.open_section, 'open');
								}
							}
							else{
								Element.removeClassName(this.sections[i].parentNode, 'open');
							}
							break;
						}
					}
				}
								
				/**
				 * Setup an onclick event for the expanders so we can change the icon.
				 * Also, setup mouseover hovers for images
				 */
				for (i in this.expanders){
					//Event.observe(this.expanders[i], 'click', this.expand_onclick.bindAsEventListener(this), false);
					Event.observe(this.expanders[i], 'mouseover', function(){swapOn(this.firstChild, 'Ov')}.bind(this.expanders[i]));
					Event.observe(this.expanders[i], 'mouseout', function(){swapOut(this.firstChild, 'Ov')}.bind(this.expanders[i]));
					Event.observe(this.expanders[i], 'click', function(event){swapOut_click(event, this.firstChild, 'Ov')}.bindAsEventListener(this.expanders[i]));
				}
				
				document.getElementsByClassName('section_header', this.root_node, 'a').each(function(element){
					if(!Element.hasClassName(element, 'nohover')){
						Event.observe(element, 'mouseover', function(){swapOn(this.firstChild, 'Ov')}.bind(element));
						Event.observe(element, 'mouseout', function(){swapOut(this.firstChild, 'Ov')}.bind(element));
						Event.observe(element, 'click', function(event){swapOut_click(event, this.firstChild, 'Ov')}.bindAsEventListener(element));
					}
				});
				
				/**
				 * Remove focus from an element after it's clicked so
				 * it doesn't appear with that dotted box around it
				 *
				 * Also, replace the template string %model% with the name of the 
				 * current model page.
				 *
				 * Also, set the onstate of the current page from the name property
				 */
				var links = this.root_element.getElementsByTagName('a');
				for (var i = 0; i < links.length; ++i){
					if(links[i].href){
//						if(this.model_id)
//							links[i].href = links[i].href.templateReplace('model', this.model_id);
						
						Event.observe(links[i], 'click', this.link_onclick.bindAsEventListener(this));
						
						if(!this.ignore_page_id){
							if(this.page_id.length && links[i].name == this.page_id){
								Element.addClassName(links[i], 'onstate');
							
								//Find the section that should be open and open it
								var n = links[i].parentNode;
								while(n.parentNode){
									if(Element.hasClassName(n, 'section')){
										if(this.model_id != 'About' && this.model_id != 'FCV' && this.model_id != 'Dealers' && this.model_id != 'CPO' )
											this.setOpenSection(n, false, true);
										break;
									}
									else{
										n = n.parentNode;
									}
								}
							}
						}
						
						if(Element.hasClassName(links[i], 'section_header')){
							if(links[i].name == this.page_id){
								var img = $NL(links[i].childNodes).elements().first();
								img.src = img.src.replace(new RegExp('(.*)(.gif)', 'i'), '$1On$2');
								//img.setAttribute('hover_src', img.src.replace(new RegExp('(.*)On(.gif)', 'i'), '$1Ov$2'));
								img.setAttribute('hover_src', img.src);
							}
						}
					}
				}
				
				/**
				 * Setup utility list
				 */
				
				if($('topUtility_list')){
					
					//Do template replacement in alt tags
//					$NL($('topUtility_list').getElementsByTagName('img')).each(function(element){
//						element.setAttribute('alt', element.getAttribute('alt').templateReplace('model', this.model_id));
//					}.bind(this));
				
					//Set onstate
					$NL($('topUtility_list').getElementsByTagName('a')).each(function(element){
						if(element.name == this.page_id){
							Element.addClassName(element, 'onstate');
						}
					}.bind(this));
				
				}
				
				/**
				 * Setup onhover event for the utility list part 2
				 */
				if($('botUtility_list')){
					var links = $('botUtility_list').getElementsByTagName('a');
					for(var i = 0; i < links.length; ++i){
						Event.observe(links[i], 'mouseover', function(){swapOn(this.firstChild, 'Ov')}.bind(links[i]));
						Event.observe(links[i], 'mouseout', function(){swapOut(this.firstChild, 'Ov')}.bind(links[i]));
					}
				}
				
				//This is disabled because there is nothing in the init_onload function
				//so it would be a useless function call.
				//onPageLoadEvents.addAction(this.init_onload.bind(this);
				//vent.observe(window, 'load', this.init_onload.bind(this));

			}
			
			/**
			 * Second stage of init function.  Called automatically after page is finished loading.
			 */
			
			this.init_onload = function(){
				// Currently does nothing
			}
			
			/**
			 * Handles onclick event on expander elements.  Sets the new open
			 * section to class "open" which, as defined in the css will have
			 * a the - icon instead of the + icon.
			 */
			this.expand_onclick = function(event){
				/**
				 * Get the clicked element from the event
				 * for some reason, this does not return the 'a' tag
				 * instead, it returns whatever you click on
				 * (an image or list item or whatever)
				 */
				var element = Event.element(event);

				/**
				 * Get the section li from the clicked element
				 */
				if(Element.hasClassName(element.parentNode, 'section'))
					var section = element.parentNode;
				else
					var section = element.parentNode.parentNode;
				
				this.setOpenSection(section, true);
			}
			
			/**
			 * Sets which section should be open.
			 */
			this.setOpenSection = function(section, toggle, no_tween){
				
				//Possible fix for IE jumble bug
/*				if(!PAGE_LOAD){
					onPageLoadEvents.addAction(function(){
						if(document.all){
							Element.removeClassName(this.open_section, 'open');
							Element.addClassName(this.open_section, 'open');
						}
					}.bind(this));
				}
*/				
				no_tween =  true; //Uncomment this line to disable animations
//				var seq = new Sequence();
				
				/**
				 * Unset the 'open' class from all elements
				 */
				for(i in this.sections){
					if(this.sections[i].className && Element.hasClassName(this.sections[i].parentNode, 'open')){
						if(!no_tween){
							ce = this.sections[i];
							var close_height = ce.offsetHeight;
							var close_tween = new Tween(ce.style,'height', Tween.regularEaseOut, close_height, 0, .3, 'px');
							var j = i;

							close_tween.onMotionStopped = function(){ 
								ce.style.height = ''; 
								Element.removeClassName(this.sections[j].parentNode, 'open'); 
							}.bind(this);

							seq.addChild(close_tween);
						}
						else{
							Element.removeClassName(this.sections[i].parentNode, 'open');
						}
					}
				}
				
				/**
				 * Set top 'open' class to the open section
				 */
				if(this.open_section != section || !toggle){
					if(!no_tween){
						var e = $NL(section.childNodes).elements().detect(function(element){ return Element.hasClassName(element, 'subsection') });
						Element.addClassName(section, 'open');
						var open_height = e.scrollHeight;
						Element.removeClassName(section, 'open');
						var open_tween = new Tween(e.style,'height', Tween.regularEaseOut, 0, open_height, .3, 'px');
						
						open_tween.onMotionStopped = function(){ 
							e.style.height = ''; 
						};
						
						open_tween.onMotionStarted = function(){
							Element.addClassName(section, 'open');
							this.open_section = section;						
						}.bind(this);
						
						seq.addChild(open_tween);
					}
					else{
						Element.addClassName(section, 'open');
						this.open_section = section;
						if(document.all){
							Element.removeClassName(section, 'open');
							Element.addClassName(section, 'open');
						}
					}
				}
				else{
					this.open_section = null;
				}
				
//				if(seq.children.length)
//					seq.start();
			}
			
			/**
			 * Removes focus from links after they're clicked
			 * to avoid that nasty dotted line in FireFox.
			 */
			this.link_onclick = function(event){
				var element = Event.element(event);
				element.blur();
			}
			
		}

		/**
		 *  To make room for the Explore F Sport section and it's subsection items,
		 *  we needed to create a function that would close/open the other subsections
		 *  when you clicked to open/close Explore F Sport
		 */
		function accordionSecondaryNav(e) {
			var navElement = document.getElementById(e);
			if (navElement.className.indexOf('open')!=-1) {
				var secNavArr = document.getElementsByTagName('li');
				for(i=0;i<secNavArr.length;i++) {
					if (secNavArr[i].className.indexOf('close') != -1) {
						secNavArr[i].className = secNavArr[i].className.replace(/close/i, "open");
						document.getElementById(e).className = "section close";
					}
				}
			} else {
				var secNavArr = document.getElementsByTagName('li');
				for (i=0;i<secNavArr.length;i++) {
					if(secNavArr[i].className.indexOf('open') != -1) {
						secNavArr[i].className = secNavArr[i].className.replace(/open/i, "close");
						document.getElementById(e).className = "section open";
					}
				}
			}
		}
/*************************************************************************
  This code is from Dynamic Web Coding at www.dyn-web.com
  Copyright 2001-4 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
	This file contains 5 sections
*************************************************************************/
function initScrollLayers(wn,lyr,dragBar,track) {
	if (!PAGE_LOAD){
		return;
	}
  // arguments: id of layer containing scrolling layers (clipped layer), id of layer to scroll, 
  // if horizontal scrolling, id of element containing scrolling content (table?)
  var wndo1 = new dw_scrollObj(wn, lyr, null);
  // arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
  // (x/y offsets of dragBar in track)
  wndo1.setUpScrollbar(dragBar, track, "v", 0, 0);
}
function dw_showLayers() {
  if ( document.getElementById ) {
    var lyr, i;
    for (i=0; arguments[i]; i++) {
      lyr = document.getElementById( arguments[i] );
      lyr.style.visibility = "visible";
    }
  }
}
function dw_hideLayers() {
  if ( document.getElementById ) {
    var lyr, i;
    for (i=0; arguments[i]; i++) {
      lyr = document.getElementById( arguments[i] );
      lyr.style.visibility = "hidden";
    }
  }
}
/* ********************************************************************************************************
    dw_scrollObj.js  version date: June 2004 
    contains constructor and basic methods for scrolling layers.
    Use with dw_hoverscroll.js and/or dw_glidescroll.js,
    and for scrollbars: dw_scroll-aux.js and dw_slidebar.js
*/

dw_scrollObjs = {};
dw_scrollObj.speed = 100; // default speed for mouseover scrolling
//  constructor arguments: id of layer containing scrolling layers (clipped layer), id of layer to scroll, 
//	id of table or other element that scrolling content is nested in. 
//	ns6+/moz need that extra container to get width for horizontal scrolling.
//	(not needed for vertical scrolling)
function dw_scrollObj(wnId, lyrId, cntId) {
  this.id = wnId; dw_scrollObjs[this.id] = this;
  this.lyrId = lyrId;
  this.animString = "dw_scrollObjs." + this.id;
  this.load(lyrId, cntId);
}

dw_scrollObj.loadLayer = function(wnId, id, cntId) {
  if ( dw_scrollObjs[wnId] ) dw_scrollObjs[wnId].load(id, cntId);
}

dw_scrollObj.prototype.load = function(lyrId, cntId) {
  if (!document.getElementById) return;
  var wndo, lyr;
  if (this.lyrId) {
    lyr = document.getElementById(this.lyrId);
    lyr.style.visibility = "hidden";
  }
  lyr = document.getElementById(lyrId);
  wndo = document.getElementById(this.id);
  lyr.style.top = this.y = 0; lyr.style.left = this.x = 0;
  this.maxY = (lyr.offsetHeight - wndo.offsetHeight > 0)? lyr.offsetHeight - wndo.offsetHeight: 0;
  this.wd = cntId? document.getElementById(cntId).offsetWidth: lyr.offsetWidth;
  this.maxX = (this.wd - wndo.offsetWidth > 0)? this.wd - wndo.offsetWidth: 0;
  this.lyrId = lyrId; // hold id of currently visible layer
  lyr.style.visibility = "visible";
  this.cleanAnchors();
  this.on_load(); this.ready = true;
}

dw_scrollObj.prototype.on_load = function() {}  

dw_scrollObj.prototype.shiftTo = function(lyr, x, y) {
  lyr.style.left = (this.x = x) + "px"; 
  lyr.style.top = (this.y = y) + "px";
}

// remove layers from table for ns6+/mozilla (needed for scrolling inside tables)
dw_scrollObj.GeckoTableBugFix = function() {
  var i, wndo, holderId, holder, x, y;
	if ( navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("Firefox") == -1 ) {
    dw_scrollObj.hold = []; // holds id's of wndo and its container
    for (i=0; arguments[i]; i++) {
      if ( dw_scrollObjs[ arguments[i] ] ) {
        wndo = document.getElementById( arguments[i] );
        holderId = wndo.parentNode.id;
        holder = document.getElementById(holderId);
        document.body.appendChild( holder.removeChild(wndo) );
        wndo.style.zIndex = 1000;
        x = holder.offsetLeft; y = holder.offsetTop;
        wndo.style.left = x + "px"; wndo.style.top = y + "px";
        dw_scrollObj.hold[i] = [ arguments[i], holderId ];
      }
    }
   window.addEventListener("resize", dw_scrollObj.rePositionGecko, true);
  }
}

// ns6+/mozilla need to reposition layers onresize when scrolling inside tables.
dw_scrollObj.rePositionGecko = function() {
  var i, wndo, holder, x, y;
  if (dw_scrollObj.hold) {
    for (i=0; dw_scrollObj.hold[i]; i++) {
      wndo = document.getElementById( dw_scrollObj.hold[i][0] );
      holder = document.getElementById( dw_scrollObj.hold[i][1] );
      x = holder.offsetLeft; y = holder.offsetTop;
      wndo.style.left = x + "px"; wndo.style.top = y + "px";
    }
  }
}
/*********************************************************************************************************************************/
/* dw_hoverscroll.js  version date: June 2004 
   mouseover scrolling for dw_scrollObj (in dw_scrollObj.js)  */

dw_scrollObj.stopScroll = function(wnId) {
  if ( dw_scrollObjs[wnId] ) dw_scrollObjs[wnId].endScroll();
}

// increase speed onmousedown of scroll links
dw_scrollObj.doubleSpeed = function(wnId) {
  if ( dw_scrollObjs[wnId] ) dw_scrollObjs[wnId].speed *= 2;
}

dw_scrollObj.resetSpeed = function(wnId) {
  if ( dw_scrollObjs[wnId] ) dw_scrollObjs[wnId].speed /= 2;
}

// algorithms for time-based scrolling and scrolling onmouseover at any angle adapted from youngpup.net
dw_scrollObj.initScroll = function(wnId, deg, sp) {
  if ( dw_scrollObjs[wnId] ) {
    var cosine, sine;
    if (typeof deg == "string") {
			re = new RegExp("[0-9]", "g");
			deg = deg.replace(re, "");
			//Debug.debug(deg);
      switch (deg) {
        case "up"    : deg = 90;  break;
        case "down"  : deg = 270; break;
        case "left"  : deg = 180; break;
        case "right" : deg = 0;   break;
        default: 
          alert("Direction of scroll in mouseover scroll links should be 'up', 'down', 'left', 'right' or number: 0 to 360.");
       }
    } 
    deg = deg % 360;
    if (deg % 90 == 0) {
      cosine = (deg == 0)? -1: (deg == 180)? 1: 0;
      sine = (deg == 90)? 1: (deg == 270)? -1: 0;
    } else {
      var angle = deg * Math.PI/180;
      cosine = -Math.cos(angle); sine = Math.sin(angle);
    }
    dw_scrollObjs[wnId].fx = cosine / ( Math.abs(cosine) + Math.abs(sine) );
    dw_scrollObjs[wnId].fy = sine / ( Math.abs(cosine) + Math.abs(sine) );
    dw_scrollObjs[wnId].endX = (deg == 90 || deg == 270)? dw_scrollObjs[wnId].x:
      (deg < 90 || deg > 270)? -dw_scrollObjs[wnId].maxX: 0; 
    dw_scrollObjs[wnId].endY = (deg == 0 || deg == 180)? dw_scrollObjs[wnId].y: 
      (deg < 180)? 0: -dw_scrollObjs[wnId].maxY;
    dw_scrollObjs[wnId].startScroll(sp);
  }
}

// speed (optional) to override default speed (set in dw_scrollObj.speed)
dw_scrollObj.prototype.startScroll = function(speed) {
  if (!this.ready) return; if (this.timerId) clearInterval(this.timerId);
  this.speed = speed || dw_scrollObj.speed;
  this.lyr = document.getElementById(this.lyrId);
  this.lastTime = ( new Date() ).getTime();
  this.on_scroll_start();  
  this.timerId = setInterval(this.animString + ".scroll()", 10); 
}

dw_scrollObj.prototype.scroll = function() {
  var now = ( new Date() ).getTime();
  var d = (now - this.lastTime)/1000 * this.speed;
  if (d > 0) {
    var x = this.x + this.fx * d; var y = this.y + this.fy * d;
    if (this.fx == 0 || this.fy == 0) { // for horizontal or vertical scrolling
      if ( ( this.fx == -1 && x > -this.maxX ) || ( this.fx == 1 && x < 0 ) || 
        ( this.fy == -1 && y > -this.maxY ) || ( this.fy == 1 && y < 0 ) ) {
        this.lastTime = now;
        this.shiftTo(this.lyr, x, y);
        this.on_scroll(x, y);
      } else {
        clearInterval(this.timerId); this.timerId = 0;
        this.shiftTo(this.lyr, this.endX, this.endY);
        this.on_scroll_end(this.endX, this.endY);
      }
    } else { // for scrolling at an angle (stop when reach end on one axis)
      if ( ( this.fx < 0 && x >= -this.maxX && this.fy < 0 && y >= -this.maxY ) ||
        ( this.fx > 0 && x <= 0 && this.fy > 0 && y <= 0 ) ||
        ( this.fx < 0 && x >= -this.maxX && this.fy > 0 && y <= 0 ) ||
        ( this.fx > 0 && x <= 0 && this.fy < 0 && y >= -this.maxY ) ) {
        this.lastTime = now;
        this.shiftTo(this.lyr, x, y);
        this.on_scroll(x, y);
      } else {
        clearInterval(this.timerId); this.timerId = 0;
        this.on_scroll_end(this.x, this.y);
      }
    }
  }
}

dw_scrollObj.prototype.endScroll = function() {
  if (!this.ready) return;
  if (this.timerId) clearInterval(this.timerId);
  this.timerId = 0;  this.lyr = null;
}

dw_scrollObj.prototype.on_scroll = function() {}
dw_scrollObj.prototype.on_scroll_start = function() {}
dw_scrollObj.prototype.on_scroll_end = function() {}

/*************************************************************************dw_event.js (version date Feb 2004)****************/

var dw_event = {
  
  add: function(obj, etype, fp, cap) {
    cap = cap || false;
    if (obj.addEventListener) obj.addEventListener(etype, fp, cap);
    else if (obj.attachEvent) obj.attachEvent("on" + etype, fp);
  }, 

  remove: function(obj, etype, fp, cap) {
    cap = cap || false;
    if (obj.removeEventListener) obj.removeEventListener(etype, fp, cap);
    else if (obj.detachEvent) obj.detachEvent("on" + etype, fp);
  }, 

  DOMit: function(e) { 
    e = e? e: window.event;
    e.tgt = e.srcElement? e.srcElement: e.target;
    
    if (!e.preventDefault) e.preventDefault = function () { return false; }
    if (!e.stopPropagation) e.stopPropagation = function () { if (window.event) window.event.cancelBubble = true; }
        
    return e;
  }
  
}
/*******************************   dw_slidebar.js   version date: Feb 2004   requires dw_event.js   *******************************************/

// model: Aaron Boodman's dom drag at www.youngpup.net
var dw_slidebar = {
  obj: null,
  slideDur: 500,  // duration of glide onclick of track  
  init: function (bar, track, axis, x, y) {
    x = x || 0; y = y || 0;
    bar.style.left = x + "px"; bar.style.top = y + "px";
    bar.axis = axis; track.bar = bar;
    if (axis == "h") {
      bar.trkWd = track.offsetWidth; // hold for setBarSize
      bar.maxX = bar.trkWd - bar.offsetWidth - x; 
      bar.minX = x; bar.maxY = y; bar.minY = y;
    } else {
      bar.trkHt = track.offsetHeight;
      bar.maxY = bar.trkHt - bar.offsetHeight - y; 
      bar.maxX = x; bar.minX = x; bar.minY = y;
    }
    bar.on_drag_start =  bar.on_drag =   bar.on_drag_end = 
    bar.on_slide_start = bar.on_slide =  bar.on_slide_end = function() {}
    bar.onmousedown = this.startDrag; track.onmousedown = this.startSlide;
  },
  
  startSlide: function(e) { // called onmousedown of track 
    if ( dw_slidebar.aniTimer ) clearInterval(dw_slidebar.aniTimer);
    e = e? e: window.event;
    var bar = dw_slidebar.obj = this.bar; // i.e., track's bar
    e.offX = (typeof e.layerX != "undefined")? e.layerX: e.offsetX;
    e.offY = (typeof e.layerY != "undefined")? e.layerY: e.offsetY;
    bar.startX = parseInt(bar.style.left); bar.startY = parseInt(bar.style.top);
    if (bar.axis == "v") {
      bar.destX = bar.startX;
      bar.destY = (e.offY < bar.startY)? e.offY: e.offY - bar.offsetHeight;
      bar.destY = Math.min( Math.max(bar.destY, bar.minY), bar.maxY );
    } else {
      bar.destX = (e.offX < bar.startX)? e.offX: e.offX - bar.offsetWidth;
      bar.destX = Math.min( Math.max(bar.destX, bar.minX), bar.maxX );
      bar.destY = bar.startY;
    }
    bar.distX = bar.destX - bar.startX; bar.distY = bar.destY - bar.startY;
    dw_slidebar.per = Math.PI/(2 * dw_slidebar.slideDur);
  	dw_slidebar.slideStart = (new Date()).getTime();
    bar.on_slide_start(bar.startX, bar.startY);
  	dw_slidebar.aniTimer = setInterval("dw_slidebar.doSlide()",10);
  },
  
  doSlide: function() {
    if ( !dw_slidebar.obj ) { clearInterval(dw_slidebar.aniTimer); return; }    
    var bar = dw_slidebar.obj;     
    var elapsed = (new Date()).getTime() - this.slideStart;
  	if (elapsed < this.slideDur) {
  		var x = bar.startX + bar.distX * Math.sin(this.per*elapsed);
  		var y = bar.startY + bar.distY * Math.sin(this.per*elapsed);
      bar.style.left = x + "px"; bar.style.top = y + "px";
      bar.on_slide(x, y);
  	} else {	// if time's up
      clearInterval(this.aniTimer);
      bar.style.left = bar.destX + "px"; bar.style.top = bar.destY + "px";
      bar.on_slide_end(bar.destX, bar.destY);
      this.obj = null;
  	}
  },
  
  startDrag: function (e) { // called onmousedown of bar 
    e = dw_event.DOMit(e);
    if ( dw_slidebar.aniTimer ) clearInterval(dw_slidebar.aniTimer);
    var bar = dw_slidebar.obj = this;
    bar.downX = e.clientX; bar.downY = e.clientY;
    bar.startX = parseInt(bar.style.left);
    bar.startY = parseInt(bar.style.top);
    bar.on_drag_start(bar.startX, bar.startY);
    dw_event.add( document, "mousemove", dw_slidebar.doDrag, true );
    dw_event.add( document, "mouseup",   dw_slidebar.endDrag,  true );
    e.stopPropagation();
  },

  doDrag: function (e) {
    e = e? e: window.event;
    if (!dw_slidebar.obj) return;
    var bar = dw_slidebar.obj; 
    var nx = bar.startX + e.clientX - bar.downX;
    var ny = bar.startY + e.clientY - bar.downY;
    nx = Math.min( Math.max( bar.minX, nx ), bar.maxX);
    ny = Math.min( Math.max( bar.minY, ny ), bar.maxY);
    bar.style.left = nx + "px"; bar.style.top  = ny + "px";
    bar.on_drag(nx,ny);
    return false;  
  },
  
  endDrag: function () {
    dw_event.remove( document, "mousemove", dw_slidebar.doDrag, true );
    dw_event.remove( document, "mouseup",   dw_slidebar.endDrag,  true );
    if ( !dw_slidebar.obj ) return; // avoid errors in ie if inappropriate selections
    dw_slidebar.obj.on_drag_end( parseInt(dw_slidebar.obj.style.left), parseInt(dw_slidebar.obj.style.top) );
    dw_slidebar.obj = null;  
  }
  
}
/************************************** dw_scroll_aux.js    version date: May 2004  *******************************************************
  integrates scrolling layers code with scrollbar code (dw_scrollbar.js)
*********************************************************************************************************************************************/

// Size dragBar according to layer size?  
dw_scrollObj.prototype.bSizeDragBar = true;

dw_scrollObj.prototype.setUpScrollbar = function(id, trkId, axis, offx, offy) {
  if (!document.getElementById) return;
  var bar = document.getElementById(id);
  var trk = document.getElementById(trkId);
  dw_slidebar.init(bar, trk, axis, offx, offy);
  // connect dw_slidebar with dw_scrollObj
  bar.wn = dw_scrollObjs[this.id]; // scroll area object this bar connected to
  if (axis == "v") this.vBarId = id; else this.hBarId = id;
  // also called on_load (i.e., when layer loaded), but in case h and v scrollbars, need to call here too
  if (this.bSizeDragBar) this.setBarSize();
  bar.on_drag_start = bar.on_slide_start = dw_scrollObj.getWndoLyrRef;
  bar.on_drag_end =   bar.on_slide_end =   dw_scrollObj.tossWndoLyrRef;
  bar.on_drag =       bar.on_slide =       dw_scrollObj.UpdateWndoLyrPos;
}

// for these 3 functions (assigned to bar.on_drag/slide...) "this" refers to bar
// get/discard ref to layer visible in scroll area
dw_scrollObj.getWndoLyrRef = function()  { this.wnLyr = document.getElementById(this.wn.lyrId); }
dw_scrollObj.tossWndoLyrRef = function() { this.wnLyr = null; }
// keep position of scrolling layer in synch with slide/drag of bar
dw_scrollObj.UpdateWndoLyrPos = function(x, y) {
  var nx, ny;
  if (this.axis == "v") {
    nx = this.wn.x; // floating point values for loaded layer's position held in shiftTo method
    ny = -(y - this.minY) * ( this.wn.maxY / (this.maxY - this.minY) ) || 0;
  } else {
    ny = this.wn.y;
    nx = -(x - this.minX) * ( this.wn.maxX / (this.maxX - this.minX) ) || 0;
  }
  this.wn.shiftTo(this.wnLyr, nx, ny);
}

// Keep position of dragBar in sync with position of layer onscroll
dw_scrollObj.prototype.updateScrollbar = function(x, y) {
  var nx, ny;
  if ( this.vBarId ) {
    if (!this.maxY) return;
    if(!this.vbar) this.vbar = $(this.vBarId);
	ny = -( y * ( (this.vbar.maxY - this.vbar.minY) / this.maxY ) - this.vbar.minY );
    ny = Math.min( Math.max(ny, this.vbar.minY), this.vbar.maxY);  
    nx = parseInt(this.vbar.style.left);
    this.vbar.style.left = nx + "px"; this.vbar.style.top = ny + "px";
  } if ( this.hBarId ) {
    if (!this.maxX) return;
    if(!this.hbar) this.hbar = $(this.hBarId);
    nx = -( x * ( (this.hbar.maxX - this.hbar.minX) / this.maxX ) - this.hbar.minX );
    nx = Math.min( Math.max(nx, this.hbar.minX), this.hbar.maxX);
    ny = parseInt(this.hbar.style.top);
    this.hbar.style.left = nx + "px"; this.hbar.style.top = ny + "px";
  } 
  
}

// Restore dragBar to start position when loading new layer
dw_scrollObj.prototype.restoreScrollbars = function() {
  var bar;
  if (this.vBarId) {
    bar = document.getElementById(this.vBarId);
    bar.style.left = bar.minX + "px"; bar.style.top = bar.minY + "px";
  }
  if (this.hBarId) {
    bar = document.getElementById(this.hBarId);
    bar.style.left = bar.minX + "px"; bar.style.top = bar.minY + "px";
  }
}
  
// Size dragBar in proportion to size of content in layer
// called on_load of layer if bSizeDragBar prop true
dw_scrollObj.prototype.setBarSize = function() {
  var bar;
  var lyr = document.getElementById(this.lyrId);
  var wn = document.getElementById(this.id);
  if (this.vBarId) {
    bar = document.getElementById(this.vBarId);
    bar.style.height = (lyr.offsetHeight > wn.offsetHeight)? bar.trkHt / ( lyr.offsetHeight / wn.offsetHeight ) + "px": bar.trkHt - 2*bar.minY + "px";
    bar.maxY = bar.trkHt - bar.offsetHeight - bar.minY; 
  }
  if (this.hBarId) {
    bar = document.getElementById(this.hBarId);
    bar.style.width = (this.wd > wn.offsetWidth)? bar.trkWd / ( this.wd / wn.offsetWidth ) + "px": bar.trkWd - 2*bar.minX + "px";
    bar.maxX = bar.trkWd - bar.offsetWidth - bar.minX; 
  }
}

// called from load method
dw_scrollObj.prototype.on_load = function() { 
  this.restoreScrollbars();
  if (this.bSizeDragBar) this.setBarSize();
}

dw_scrollObj.prototype.on_scroll = dw_scrollObj.prototype.on_slide = function(x,y) { this.updateScrollbar(x,y); }

// obtain and discard references to relevant dragBar
dw_scrollObj.prototype.on_scroll_start = dw_scrollObj.prototype.on_slide_start = function() {
  if ( this.vBarId ) this.vbar = document.getElementById(this.vBarId);
  if ( this.hBarId ) this.hbar = document.getElementById(this.hBarId);
}

dw_scrollObj.prototype.on_scroll_end = dw_scrollObj.prototype.on_slide_end = function(x, y) { 
  this.updateScrollbar(x,y);
  this.lyr = null; this.bar = null; 
}

//Added by Dave Grijalva
//Fix for anchor links within scroll box
dw_scrollObj.prototype.cleanAnchors = function(){
	var links = {};
	//collect all links with #anchors
	$NL($(this.id).getElementsByTagName('a')).each(function(link){
		var href = link.getAttribute('href');
		var name = link.getAttribute('name');

		if(name){
			if(!links[name]) links[name] = {};
			links[name]['target'] = link;
		}
		
		if(href){
			var hash = href.replace(/.*#(.*)/i, '$1');
			if(hash.length){
				if(!links[hash]) {
					links[hash] = {};
					links[hash].elements = new Array()
				}
				links[hash].elements.push(link);
			}
		}
	});
	
	for(key in links){
		if(links[key].elements && links[key]['target']){
			var link = links[key];
			//kill link to #anchor
			for(var i=0; i<link.elements.length; i++) {
				var element = link.elements[i];	
				element.href = 'javascript:;';
				element.setAttribute('anchor_key', key);
				//attach event for custom scroll
				var t = link['target'];
				Event.observe(element, 'click', this.scrollToAnchor.bindAsEventListener(this));
			}
		}
	}
}

dw_scrollObj.prototype.scrollToAnchor = function(event){
	var element = Event.element(event);
	var anchor_key = element.getAttribute('anchor_key');
	var anchor = $NL($(this.id).getElementsByTagName('a')).find(function(e){return e.name == anchor_key});
	var anchor_offset = Dom.getTopY(anchor, $(this.id));
	anchor_offset = (anchor_offset < this.maxY ? anchor_offset : this.maxY) * -1;
	this.shiftTo($(this.lyrId), 0, anchor_offset);
	this.on_scroll(0, anchor_offset);
}
/**********************************************************************************************/
/* Function footer(ftContainerArray,spacingW3C,spacingIE)            													*/
/*                                                                            								*/
/* Takes 3 parameters (prototype required):                                    								*/
/* ftContainerArray: Array of container ids (Required)  																			*/
/* Spacing: (optional) - Used to fix spacing																								  */
/* spacingW3C: spacing Between lowest container and the footer for W3C compliant-browsers     */
/* spacingIE: spacing Between lowest container and the footer for Internet Explorer           */
/*          Defaults to 20px. It can be set to a positive or a negative value                 */
/*																																														*/
/* Site-wide CSS File: Set #ftArea{display:none;position:absolute;} 													*/
/*																																														*/
/*	For a page that contains 2 container divs, call the function as follow in the page:       */
/*        // Pushes The footer below content   																								*/
/*        var ftContainerArray = new Array('mainContent','rightContent');                     */
/*				vent.observe(window, 'load', function(){footer(ftContainerArray);}, false);        */
/*																																														*/
/* Last Modified: August 28, 2006                                             								*/
/* Author: Christian Dumais                                                   								*/
/**********************************************************************************************/
function footer(ftContainerArray,spacingW3C,spacingIE){
	var ft = null;
	var sp_w3c = (spacingW3C==null)?20:spacingW3C;
	var sp_ie = (spacingIE==null)?20:spacingIE;
	if ($('ftArea')!=null){
		ft = $('ftArea');
		/* Finding if one of the container is lower than the Side Nav and by how much */
		isContainerLower = getLower(ftContainerArray);
		/* Side Nav exist and is lower */
		if (!isContainerLower){
	  	ft.style.top = Dom.getBottomY($('sn_wrapper')) + "px";
		}
		/* Side Nav is NOT Lower or may not exist */
		else{
			/* Set the footer below the lowest container */
			ft.style.top = isContainerLower + ((document.all)?sp_ie:sp_w3c) + "px";
		}
		ft.style.display = "block";
	}
}
/* This function will find if the Side Nav exist and if it is the lowest container */
function getLower(arr){
	for (var i=0;i<arr.length;i++){
		if($(arr[i])){
			var biggest = Dom.getBottomY($(arr[i]));
			break;
		}
	}
	if(typeof(biggest) == "undefined") return 0;
	for (var i=0;i<arr.length;i++){
		if($(arr[i]) && Dom.getBottomY($(arr[i]))>biggest){
				biggest = Dom.getBottomY($(arr[i]));
		}
	}
	sny = ($('sn_wrapper'))?Dom.getBottomY($('sn_wrapper')):null;
	if (sny!=null && sny>biggest){
		/* Side Nav exist and is lower */
		return false;
	}
	else{
		/* Side Nav is NOT lower or may not exist, return biggest Y value */
		return biggest;
	}
}

/**
 * PLUGIN FRAMEWORK, Version 0.5
 * For details, see the Knallgrau web site: http://www.knallgrau.code/prototype/plugins_js
 * Copyright (c) 2006 Matthias Platzer <matthias@knallgrau.at>
 * This code is freely distributable under the terms of an MIT-style license.
 * 
 ***********************************************************************************
 *  Copyright (c) 2006 Matthias Platzer <matthias@knallgrau.at>
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy 
 *  of this software and associated documentation files (the "Software"), to deal 
 *  in the Software without restriction, including without limitation the rights 
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 *  copies of the Software, and to permit persons to whom the Software is 
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 *  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 ***********************************************************************************
 *
 *  inspired by Prototype JavaScript framework
 *
 *  Provides the following functions
 *    // name accepts: 
 *    // Acrobat, QuickTime, DivX, Director, 
 *    // 'Windows Media', Flash, Java, RealPlayer, VLC
 *    Plugin.isInstalled(String name) 
 *    Plugin.getVersion(String name)
 *    Plugin.getPluginsForMimeType(String mimeType)  // returns Array of Plugin Names
 *    Plugin.getPluginsForFileSuffix(String suffix)  // returns Array of Plugin Names
 *    Plugin.embed(pluginName, options, target)
 *    Plugin.getInfo(String name) 
 *      // Result Object contains informations about the plugin
 *      Boolean isInstalled
 *      String  version
 *      String  description
 *      Array   progID        to be used with new ActiveXObject()
 *      String  classID       for ActiveX
 *      String  pluginsPage   URL to download the plugin
 *      Array   acceptedMimeTypes  provides MimeType info for IE
 *
 * CHANGELOG:
 * 17.12.2005: Version 0.1
 *   initial version
 * 18.12.2005: Version 0.2
 *   added mimetypes for divx & co.
 *   added VLC support (detection for IE is missing)
 *   renamed getPluginsForMimeType, getPluginsForFileSuffix -> returns Array, instead of String
 *   dropped support vor Adobe SVG (IE)
 *   tested and debugged RealPlayer -> still reports a strange version number
 *   fixed bugs where script did break on unknown name attribute
 *   added experimental Plugin.embed
 * 20.12.2005: Version 0.3
 *   added docs
 *   added license
 *   rewrote Plugin.embed -> now it's easier to add new formats
 *   downloadURL became pluginsPage
 *   added mimeType, activeXType and codeBase to Plugin.PLUGINS
 *   Plugin.embed accepts strings as target (id)
 *   Added Plugin.embed support for Flash, RealPlayer and VLC
 * 23.03.2006: Version 0.4
 *   Fixed a few warnings reported by firefox in javascript strict mode (reported by Olav Roth)
 * 13.04.2006: Version 0.5
 *   Improved support for Windows Media Plugin
 *   - use WM6.4 ClassID instead of WM7 (this fixes a lot of bad behaviour, like missing controls)
 *   - detect installed ActiveX support for Mozilla (Firefox)
 *   - added support for forceObjectTag as a sideeffect
 *   Fixed a bug with embeding VLC (src needs to be present in the embed tag)
 *   Updated DivX support to final Version 1.0
 * 
 * you may remove the comments section, but please leave the copyright
/*--------------------------------------------------------------------------*/

var PluginFactory = function() {

  // Returns if plugin with identifier name is installed
  // @see Plugin.getInfo
  this.isInstalled = function(name) {
    return Plugin.getInfo(name).isInstalled;
  }

  // Returns version number of plugin if available
  // @see Plugin.getInfo
  this.getVersion = function(name) {
    return Plugin.getInfo(name).version;
  }
	
  this.getVersionAsFloat = function(name) {
    if(!Plugin.getInfo(name).version && Plugin.getInfo(name).version == "")
    	return 0;
    else
    	return parseFloat(Plugin.getInfo(name).version);
  }	
  // Returns an Array of plugin identifier names, 
  // that can handle this mimeType.
  this.getPluginsForMimeType = function(mimeType) {
    var result = [];
    if (supportsNavigatorPlugins()) {
      // navigator.mimeTypes
      for (var i=0; i<navigator.mimeTypes.length; i++) {
        if (navigator.mimeTypes[i].type.indexOf(mimeType) == 0 && navigator.mimeTypes[i].enabledPlugin) {
          var pluginName = (findPluginName(navigator.mimeTypes[i].enabledPlugin.name) || navigator.mimeTypes[i].enabledPlugin.name);
          if (!Array.contains(result, pluginName)) result.push(pluginName);
        }
      }
    } else {
      // Code for IE using ActiveX
      for (var pluginName in Plugin.PLUGINS) {
        var mimeTypes = Plugin.PLUGINS[pluginName].acceptedMimeTypes;
        if (!mimeTypes) continue;
        for (var j=0; j<mimeTypes.length; j++) {
          if (mimeTypes[j].type.indexOf(mimeType) == 0 && Plugin.isInstalled(pluginName)) {
            if (!Array.contains(result, pluginName)) result.push(pluginName);
          }
        }
      }    
    }
    return result;
  }

  // Returns an Array of plugin identifier names, 
  // that can handle a file with this suffix.
  this.getPluginsForFileSuffix = function(suffix) {
    var result = [];
    if (supportsNavigatorPlugins()) {
      // navigator.mimeTypes
      for (var i=0; i<navigator.mimeTypes.length; i++) {
        if ((","+navigator.mimeTypes[i].suffixes+",").indexOf(","+suffix+",") != -1 && navigator.mimeTypes[i].enabledPlugin) {
          var pluginName = (findPluginName(navigator.mimeTypes[i].enabledPlugin.name) || navigator.mimeTypes[i].enabledPlugin.name);
          if (!Array.contains(result, pluginName)) result.push(pluginName);
        }
      }
    } else {
      // Code for IE using ActiveX
      for (var pluginName in Plugin.PLUGINS) {
        var mimeTypes = Plugin.PLUGINS[pluginName].acceptedMimeTypes;
        if (!mimeTypes) continue;
        for (var j=0; j<mimeTypes.length; j++) {
          if ((","+mimeTypes[j].suffixes+",").indexOf(","+suffix+",") != -1 && Plugin.isInstalled(pluginName)) {
            if (!Array.contains(result, pluginName)) result.push(pluginName);
          }
        }
      }    
    }
    return result;
  }

  // Returns general information about a plugin.
  // accepts: Acrobat, QuickTime, DivX, Director, 'Windows Media', 
  //          Flash, Java, RealPlayer, VLC
  this.getInfo = function(name) {

    var info = Plugin.PLUGINS[name];
    var isInstalled = false;
    var version = null;

    if (supportsNavigatorPlugins()) {
      // navigator.plugins
      var plugin = findNavigatorPluginByName((name == "RealPlayer") ? "RealPlayer Version Plugin" : name);
      if (plugin) {
        isInstalled = true;
        version = getVersionFromPlugin(plugin);
      }

    } else {
      // Code for IE using ActiveX
      isInstalled = hasActiveXObject(Plugin.PLUGINS[name] && Plugin.PLUGINS[name].progID);
      if (isInstalled) {
        if (Plugin.PLUGINS[name].getActiveXVersionInfo) {
          version = Plugin.PLUGINS[name].getActiveXVersionInfo();
        } else {
          // assume that the progID contains the version number
          // this is not always correct
          var progID = getProgIdForActiveXObject(Plugin.PLUGINS[name].progID);
          version = getVersionFromPlugin(progID);
        }
      } else {
        version = getActiveXPluginByClassId(Plugin.PLUGINS[name] && Plugin.PLUGINS[name].classID);
        if (version) version = version.replace(/,/g, ".");
        isInstalled = (version!=undefined);
      }

    }

    var result = {};
    for (var i in info) {
      result[i] = info[i];
    }
    result["isInstalled"] = isInstalled;
    result["version"] = version;
    result["name"] = name;

    return result;
  }

/**
 * writes an embed or object tag to document.write or target.
 * @param plugin   name of the plugin to be used
 * @param options  options for embed respectivly object tag.
 *   .src,.width,.height,.type,.activeXType will get a special treatment
 *   all other properties of options will be added to the 
 *   embed tag as attributes resp. to the object tag as param(eters).
 *   option names should be lower case!
 * @param target   optional (id of) container element for the embed/object tag
 */
  this.embed = function(plugin, options, target) {
    options = options || {};

    var embedOptions = Object.extend({}, options);
    var src = embedOptions.src;
    delete embedOptions.src;
    var id = embedOptions.id;
    delete embedOptions.id;
    var name = embedOptions.name || id;
    delete embedOptions.name;
    var width = embedOptions.width;
    delete embedOptions.width;
    var height = embedOptions.height;
    delete embedOptions.height;
    var type = embedOptions.type || (Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].mimeType) || "";
    delete embedOptions.type;
    var activeXType = embedOptions.activeXType || (Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].activeXType) || type;
    delete embedOptions.activeXType;
    var forceEmbedTag = (Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].forceEmbedTag === true) ? true : false;
    var forceObjectTag = (Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].forceObjectdTag === true) ? true : false;

    var embedOptions = Object.extend(((Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].standardEmbedAttributes) || {}), embedOptions);

    switch (plugin) {
      case "QuickTime":
        // get space for controlls
        if (embedOptions.controller == "true" && (height+"").indexOf("%") == -1) {
          height += 16;
        }
        if (!options.activeXType) {
          activeXType = null;
        }
        break;

      case "DivX":
        // get space for controlls
        if ((height+"").indexOf("%") == -1) {
          if (embedOptions.mode == "mini") height += 20;
          else if (embedOptions.mode == "large") height += 65;
          else if (embedOptions.mode == "full") height += 90;
        }
        break;

      case "Windows Media":
        // check if ActiveX for Firefox is installed
        // http://help.yahoo.com/help/us/launch/videos/videos-07.html
        if (!supportsNavigatorPlugins() || window.GeckoActiveXObject) {
           forceObjectTag = true;
        }
        // get space for controlls
        if ((window.ActiveXObject || window.GeckoActiveXObject || window.opera) &&
            (height+"").indexOf("%") == -1) {
          height += 45;
        }
        break;

      case "Flash":
        // flash wants the src to be named "movie" if passed as object param
        if (!supportsNavigatorPlugins()) {
          embedOptions.movie = src;
          src = null;
        }
        break;

      case "VLC":
        // VLC wants the src to be named "target"
        // update: that's actualy wrong, even it's documented like that!
        if (supportsNavigatorPlugins()) {
          embedOptions.target = src;
        }
        break;

      case "RealPlayer":
        break;        

      default: 
        // do nothing
        break;
    }

    // prepare html code
    var html = "";
    if ((supportsNavigatorPlugins() && ! forceObjectTag) || forceEmbedTag) {
      // Netscape Plugin embed Tag
      html += '<embed' + getAttributeHtml("src", src)  + getAttributeHtml("id", id) + getAttributeHtml("name", name) + getAttributeHtml("width", width) + getAttributeHtml("height", height) + getAttributeHtml("pluginspage", Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].pluginsPage) + getAttributeHtml("type", type);
      for (var i in embedOptions) {
        html += ' '+i+'="'+embedOptions[i]+'"';
      }
      html += '></embed>\n';
    } else {
      // ActiveX object tag
      html += '<object classid="clsid:'+(Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].classID)+'"';
      html += getAttributeHtml("id", id) + getAttributeHtml("name", name) + getAttributeHtml("width", width) + getAttributeHtml("height", height) + getAttributeHtml("codebase", (Plugin.PLUGINS[plugin] && Plugin.PLUGINS[plugin].codeBase)) + getAttributeHtml("type", activeXType) + '>\n';
      html += (src) ? '  <param name="src" value="'+src+'">\n' : '';
      for (var i in embedOptions) {
        html += '  <param name="'+i+'" value="'+embedOptions[i]+'" />';
      }
      html += '</object>\n';
    }

    if (target) {
      if (typeof target == "string") target = document.getElementById(target);
      target.innerHTML = html;
    } else {
      document.write(html);
    }
  }

  var getAttributeHtml = function(name, value) {
    return (value) ? (" " + name + "=\"" + value + "\"") : "";
  }

  // Info about known plugins
  this.PLUGINS = {
    "Acrobat": {
      description: "Adobe Acrobat Plugin",
      progID: ["PDF.PdfCtrl.7", "PDF.PdfCtrl.6", "PDF.PdfCtrl.5", "PDF.PdfCtrl.4", "PDF.PdfCtrl.3", "AcroPDF.PDF.1"],
      classID: "CA8A9780-280D-11CF-A24D-444553540000",
      pluginsPage: "http://www.adobe.com/products/acrobat/readstep2.html",
      acceptedMimeTypes: [
        { type: "application/pdf", suffixes: "pdf" },
        { type: "application/vnd.fdf", suffixes: "fdf" },
        { type: "application/vnd.adobe.xfdf", suffixes: "xfdf" },
        { type: "application/vnd.adobe.xdp+xml", suffixes: "xdp" },
        { type: "application/vnd.adobe.xfd+xml", suffixes: "xfd" }
      ]
    },
    "QuickTime": {
      description: "QuickTime Plug-in",
      progID: ["QuickTimeCheckObject.QuickTimeCheck.1", "QuickTime.QuickTime"],
      classID: "02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
      pluginsPage: "http://www.apple.com/quicktime/download/",
      codeBase: "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0",
      mimeType: "video/quicktime",
      standardEmbedAttributes: {
        autoplay: "false"
      },
      // embedInfo: http://www.apple.com/quicktime/tutorials/embed.html 
      //            http://developer.apple.com/quicktime/compatibility.html
      getActiveXVersionInfo: function() { 
        var progID = getProgIdForActiveXObject(Plugin.PLUGINS["QuickTime"].progID); 
        var obj = new ActiveXObject(progID);
        var version = (obj && obj.QuickTimeVersion) ? obj.QuickTimeVersion.toString(16) : "";
        return version.substring(0,1) + '.' + version.substring(1,2) + '.' + version.substring(2,3);
      },
      acceptedMimeTypes: [
        { type: "image/tiff", suffixes: "tif,tiff" },
        { type: "image/x-tiff", suffixes: "tif,tiff" },
        { type: "video/x-m4v", suffixes: "m4v" },
        { type: "image/x-macpaint", suffixes: "pntg,pnt,mac" },
        { type: "image/pict", suffixes: "pict,pic,pct" },
        { type: "image/x-pict", suffixes: "pict,pic,pct" },
        { type: "image/x-quicktime", suffixes: "qtif,qti" },
        { type: "image/x-sgi", suffixes: "sgi,rgb" },
        { type: "image/x-targa", suffixes: "targa,tga" },
        { type: "audio/3gpp", suffixes: "3gp,3gpp" },
        { type: "video/3gpp2", suffixes: "3g2,3gp2" },
        { type: "audio/3gpp2", suffixes: "3g2,3gp2" },
        { type: "video/sd-video", suffixes: "sdv" },
        { type: "application/x-mpeg", suffixes: "amc" },
        { type: "video/mp4", suffixes: "mp4" },
        { type: "audio/mp4", suffixes: "mp4" },
        { type: "audio/x-m4a", suffixes: "m4a" },
        { type: "audio/x-m4p", suffixes: "m4p" },
        { type: "audio/x-m4b", suffixes: "m4b" },
        { type: "video/mpeg", suffixes: "mpeg,mpg,m1s,m1v,m1a,m75,m15,mp2,mpm,mpv,mpa" },
        { type: "audio/mpeg", suffixes: "mpeg,mpg,m1s,m1a,mp2,mpm,mpa,m2a" },
        { type: "audio/x-mpeg", suffixes: "mpeg,mpg,m1s,m1a,mp2,mpm,mpa,m2a" },
        { type: "video/3gpp", suffixes: "3gp,3gpp" },
        { type: "audio/x-gsm", suffixes: "gsm" },
        { type: "audio/AMR", suffixes: "AMR" },
        { type: "audio/aac", suffixes: "aac,adts" },
        { type: "audio/x-aac", suffixes: "aac,adts" },
        { type: "audio/x-caf", suffixes: "caf" },
        { type: "video/x-mpeg", suffixes: "mpeg,mpg,m1s,m1v,m1a,m75,m15,mp2,mpm,mpv,mpa" },
        { type: "audio/aiff", suffixes: "aiff,aif,aifc,cdda" },
        { type: "audio/x-aiff", suffixes: "aiff,aif,aifc,cdda" },
        { type: "audio/basic", suffixes: "au,snd,ulw" },
        { type: "audio/mid", suffixes: "mid,midi,smf,kar" },
        { type: "audio/x-midi", suffixes: "mid,midi,smf,kar" },
        { type: "audio/midi", suffixes: "mid,midi,smf,kar" },
        { type: "audio/vnd.qcelp", suffixes: "qcp" },
        { type: "application/sdp", suffixes: "sdp" },
        { type: "application/x-sdp", suffixes: "sdp" },
        { type: "application/x-rtsp", suffixes: "rtsp,rts" },
        { type: "video/quicktime", suffixes: "mov,qt,mqv" },
        { type: "video/flc", suffixes: "flc,fli,cel" },
        { type: "audio/x-wav", suffixes: "wav,bwf" },
        { type: "audio/wav", suffixes: "wav,bwf" }
      ]
    },
    "DivX": {
      description: "DivX Browser Plugin",
      progID: ["npdivx.DivXBrowserPlugin.1", "npdivx.DivXBrowserPlugin"],
      classID: "67DABFBF-D0AB-41fa-9C46-CC0F21721616",
      codeBase: "http://go.divx.com/plugin/DivXBrowserPlugin.cab",
      pluginsPage: "http://go.divx.com/plugin/download/",
      mimeType: "video/divx",
      standardEmbedAttributes: {
        mode: "mini",
        minversion: "1.0.0"
      },
      // embedInfo: Beta1: http://labs.divx.com/archives/000072.html
      //            SDK&Doc: http://download.divx.com/labs/Webmaster_SDK.zip
      getActiveXVersionInfo2: function() {
        var progID = getProgIdForActiveXObject(Plugin.PLUGINS["DivX"].progID); 
        return "1.0.0"; // that's the only currently available
      },
      acceptedMimeTypes: [
        { type: "video/divx", suffixes: "dvx,divx" }
      ]
    },
    "Director": {
      description: "Macromedia Director",
      progID: ["SWCtl.SWCtl.11","SWCtl.SWCtl.10","SWCtl.SWCtl.9","SWCtl.SWCtl.8","SWCtl.SWCtl.7","SWCtl.SWCtl.6","SWCtl.SWCtl.5","SWCtl.SWCtl.4"],
      classID: "166B1BCA-3F9C-11CF-8075-444553540000",
      pluginsPage: "http://www.macromedia.com/shockwave/download/",
      codeBase: "http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0",
      mimeType: "application/x-director"
    },         
    "Flash": {
      description: "Macromedia Shockwave Flash",
      progID: ["ShockwaveFlash.ShockwaveFlash.9", "ShockwaveFlash.ShockwaveFlash.8.5", "ShockwaveFlash.ShockwaveFlash.8", "ShockwaveFlash.ShockwaveFlash.7", "ShockwaveFlash.ShockwaveFlash.6", "ShockwaveFlash.ShockwaveFlash.5", "ShockwaveFlash.ShockwaveFlash.4"],
      classID: "D27CDB6E-AE6D-11CF-96B8-444553540000",
      pluginsPage: "http://www.macromedia.com/go/getflashplayer",
      codeBase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0",
      mimeType: "application/x-shockwave-flash",
      standardEmbedAttributes: {
        quality: "high"
      },
      // embedInfo: http://www.macromedia.com/cfusion/knowledgebase/index.cfm?id=tn_4150
      //            http://www.macromedia.com/cfusion/knowledgebase/index.cfm?id=tn_12701
      acceptedMimeTypes: [
        { type: "application/x-shockwave-flash", suffixes: "swf" },
        { type: "application/futuresplash", suffixes: "spl" }
      ]
    }, 
    "VLC": {
      description: "VLC multimedia plugin",
      progID: [],
      classID: "",
      pluginsPage: "http://www.videolan.org/doc/play-howto/en/ch02.html#id287569",
      codeBase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0",
      mimeType: "application/x-vlc-plugin",
      standardEmbedAttributes: {
        quality: "high",
        autoplay: "no"
      },
      // embedInfo: http://www.videolan.org/doc/vlc-user-guide/en/ch07.html
      //            http://www.videolan.org/doc/play-howto/en/ch04.html#id293251
      acceptedMimeTypes: [
        { type: "audio/mpeg", suffixes: "mp2,mp3,mpga,mpega" },
        { type: "audio/x-mpeg", suffixes: "mp2,mp3,mpga,mpega" },
        { type: "video/mpeg", suffixes: "mpg,mpeg,mpe" },
        { type: "video/x-mpeg", suffixes: "mpg,mpeg,mpe" },
        { type: "video/mpeg-system", suffixes: "mpg,mpeg,vob" },
        { type: "video/x-mpeg-system", suffixes: "mpg,mpeg,vob" },
        { type: "video/mpeg4", suffixes: "mp4,mpg4" },
        { type: "audio/mpeg4", suffixes: "mp4,mpg4" },
        { type: "application/mpeg4-iod", suffixes: "mp4,mpg4" },
        { type: "application/mpeg4-muxcodetable", suffixes: "mp4,mpg4" },
        { type: "video/x-msvideo", suffixes: "avi" },
        { type: "video/quicktime", suffixes: "mov,qt" },
        { type: "application/x-ogg", suffixes: "ogg" },
        { type: "application/x-vlc-plugin", suffixes: "*" },
        { type: "video/x-ms-asf-plugin", suffixes: "asf,asx,*" },
        { type: "video/x-ms-asf", suffixes: "asf,asx,*" },
        { type: "application/x-mplayer2", suffixes: "dvx,divx,ivx,xvid,ivf,*" },
        { type: "video/x-ms-wmv", suffixes: "wmv,*" },
        { type: "application/x-google-vlc-plugin", suffixes: "*" }      
      ]
    },
    "Windows Media": {
      description: "Windows Media Player Plug-in Dynamic Link Library",
      progID: ["WMPlayer.OCX", "MediaPlayer.MediaPlayer.1"],
      classID: "22D6f312-B0F6-11D0-94AB-0080C74C7E95", // WMP6 -> semms to work a lot better, don't know why
      // classID: "6BF52A52-394A-11D3-B153-00C04F79FAA6", // WMP7+ -> doesn't work for me
      pluginsPage: "http://www.microsoft.com/windows/windowsmedia/",
      codeBase: "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,02,902",
      mimeType: "application/x-mplayer2",
      activeXType: "application/x-oleobject",
      standardEmbedAttributes: {
        autoplay: "false"
      },
      // embedInfo: http://msdn.microsoft.com/archive/default.asp?url=/archive/en-us/samples/internet/imedia/netshow/crossbrowserembed/default.asp
      getActiveXVersionInfo: function() { 
        var progID = getProgIdForActiveXObject(Plugin.PLUGINS["Windows Media"].progID); 
        var obj = new ActiveXObject(progID);
        return (obj && obj.versionInfo) ? obj.versionInfo : "";
      },
      acceptedMimeTypes: [
        { type: "application/asx", suffixes: "*" },
        { type: "video/x-msvideo", suffixes: "avi" },
        { type: "video/x-ms-asf-plugin", suffixes: "*" },
        { type: "application/x-mplayer2", suffixes: "dvx,divx,ivx,xvid,ivf,*" },
        { type: "video/x-ms-asf", suffixes: "asf,asx,*" },
        { type: "video/x-ms-wm", suffixes: "wm,*" },
        { type: "audio/x-ms-wma", suffixes: "wma,*" },
        { type: "audio/x-ms-wax", suffixes: "wax,*" },
        { type: "video/x-ms-wmv", suffixes: "wmv,*" },
        { type: "video/x-ms-wvx", suffixes: "wvx,*" }
      ]
    },
    "Java": {
      description: "Java Virtual Machine",
      progID: [],
      classID: "08B0E5C0-4FCB-11CF-AAA5-00401C608500",
      pluginsPage: "http://www.java.com/de/download/manual.jsp",
      acceptedMimeTypes: [
        { type: "application/x-java-applet", suffixes: "" },
        { type: "application/x-java-bean", suffixes: "" },
        { type: "application/x-java-vm", suffixes: " " }
      ]
    },          
    "RealPlayer": {
      description: "RealPlayer Version Plugin",
      progID: ["RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "rmocx.RealPlayer G2 Control"],
      classID: "CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",
      mimeType: "audio/x-pn-realaudio-plugin",
      pluginsPage: "http://www.real.com/freeplayer/?rppr=rnwk",
      forceEmbedTag: true,
      standardEmbedAttributes: {
        controls: "ControlPanel",
        nojava: "true",
        autostart: "false"
      },
      // embedInfo: http://service.real.com/help/library/guides/realone/ProductionGuide/HTML/realpgd.htm?page=htmfiles/embed.htm
      // couldn't find any info about the object tag!
      getActiveXVersionInfo: function() { 
        var progID = getProgIdForActiveXObject(Plugin.PLUGINS["RealPlayer"].progID); 
        var obj = new ActiveXObject(progID);
        var version = (obj) ? obj.GetVersionInfo() : "";
        return version;
      },
      acceptedMimeTypes: [
        { type: "audio/x-pn-realaudio-plugin", suffixes: "rpm" },
        { type: "application/vnd.rn-realplayer-javascript", suffixes: "rpj" }
      ]
    },
	"MetaStream": {
		description: "MetaStream 3 Plugin",
		progID: ["AxMetaStream.MetaStreamCtl", "AxMetaStream.MetaStreamCtlSecondary"],
		classID: "03F998B2-0E00-11D3-A498-00104B6EB52E",
		mimeType: "application/x-mtx",
		pluginsPage: "http://www.viewpoint.com",
		standardEmbedAttributes: {},
		getActiveXVersionInfo: function() { 
//		  var progID = getProgIdForActiveXObject(Plugin.PLUGINS["MetaStream"].progID); 
//		  var obj = new ActiveXObject(progID);
//		  var version = (obj) ? obj.GetVersion() : "";
//		  return version;
			return 3;
		},
		acceptedMimeTypes: [
			{type: "application/x-mtx", suffixes: "mtx"}
		]
	}
  }

  var supportsNavigatorPlugins = function() {
    return (navigator.plugins && (navigator.plugins.length > 0));
  }

  var supportsActiveX = function() {
    return ((typeof 'ActiveXObject' != 'undefined') && (navigator.userAgent.indexOf('Win') != -1));
  }

  var findNavigatorPluginByName = function(name) {
    if (supportsNavigatorPlugins()) {
      for(var i=0;i<navigator.plugins.length;++i) {
        var plugin = navigator.plugins[i];
        if (plugin.name.indexOf(name) != -1) {
          return plugin;
        }
      }
    }
    return null;
  }

  var findPluginName = function(str) {
    for (var pluginName in Plugin.PLUGINS) {
      if (str.indexOf(pluginName) != -1) {
        return pluginName;
      }
    }
    return null;
  }

  var getIEClientCaps = function() {
    var clientcaps = document.getElementById("__Plugin_ClientCaps");
    if (!clientcaps) {
      var clientcaps = document.createElement("DIV");
      clientcaps.id = "__Plugin_ClientCaps";
      if (clientcaps.addBehavior) {
        clientcaps.addBehavior("#default#clientCaps");
        document.body.appendChild(clientcaps);
      }
      clientcaps = document.getElementById("__Plugin_ClientCaps");
    }
    return clientcaps;    
  }

  var getActiveXPluginByClassId = function(classID) {
    if (!classID) return null;
    if (!classID.match(/{[^}]+}/)) classID = "{" + classID + "}";
    var clientcaps = getIEClientCaps();
    try {
      var result = clientcaps.getComponentVersion(classID, "ComponentID")
      return result || null;
    } catch (err) { }
    return null;
  }

  var hasActiveXObject = function(progID) {
    progID = getProgIdForActiveXObject(progID);
    return (progID != null);
  }

  var getProgIdForActiveXObject = function(progID) {
    if (!progID) return null;
    for (var i=0; i<progID.length; i++) {
      try {
        var obj = new ActiveXObject(progID[i]);
        return progID[i] || null;
      }
      catch(e) { }
    }
    return null;
  }

  // accepts plugin or string
  var getVersionFromPlugin = function(plugin) {
    if (!plugin.name) plugin = { name: plugin, description: name };
    var matches = /[\d][\d\.]*/.exec(plugin.name);
    if (matches && plugin.name.indexOf("Java") == -1) return matches[0];
    matches = /[\d\.]+/.exec(plugin.description);
    return matches ? matches[0] : "";
  }
  
};

// helper functions
// for usage without prototype.js
if (!Object.extend) {
  Object.extend = function(destination, source) {
    for (property in source) {
      destination[property] = source[property];
    }
    return destination;
  }
}

// Array functions
Array.contains = function(arr, el) {
  return Array.indexOf(arr, el) != -1;
}

Array.indexOf = function(arr, el) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i] == el) return i;
  }
  return -1;
}

String.encode =
String.prototype.encode = function() {
  var str = this;
  str = str.replace("&", "&amp;");
  str = str.replace("<", "&lt;");
  str = str.replace(">", "&gt;");
  str = str.replace("\"", "&quot;");
  str = str.replace("\n", "");
  return str;
}

if (!window.Plugin) {
  var Plugin = new Object();
}
Object.extend(Plugin, (new PluginFactory()));

/**
 * @fileoverview nav_top_vehiclebar.js contains all components for the Vehicle Navigation menu.
 * @author Aaron J Pedersen (apederson@dhapdigital.com)
 * <br/> <br/>
 * Documentation is generated by JSDoc (http://jsdoc.sourceforge.net/)
 */
var LEXUS_ROOT_URL = (LEXUS_ROOT_URL)?LEXUS_ROOT_URL:"";
var LEXUS_ROOT_ASSET = (LEXUS_ROOT_ASSET)?LEXUS_ROOT_ASSET:"";
var menuTimeout = 50;

/**
 * Class holds the needed information for a paticular Category of Cars.<br/>
 * Example: Luxury Sedans, which contain LS, GS, ES, and IS models of cars.
 * @constructor
 */
function VehicleCategory(id, name) {
	this.id = id;
	this.name = name;
	this.models = $A();
	this.domHotSpot = null;
	this.domNavigation = null;
	this.domOverlay = null;

  /**
   * Method adds a VehicleModel Object to an array.   
   * @param model VehicleModel Model Object representing a Lexus Model
   * @type void
   * @member VehicleCategory
   */
  this.addModel = function(model) {
  	  model.categoryId = this.id;
    	this.models.push(model);
  }
   /**
   * Method returns a VehicleModel Object from the current array. 
   * @param model VehicleModel Model Object representing a Lexus Model
   * @type VehicleModel
   * @member VehicleCategory
   */
  this.getModel = function(key) {
  	return this.models.find(function(model){
  		if(model.id.indexOf(key) >= 0)
  		  return model;
	})
  }
}
VehicleCategory.prototype.toString = function() {
	return "Category (Object)";
}
/** Type Declarations Class/Instance **/
VehicleCategory.type = 'Category';
VehicleCategory.prototype.type = 'Category';
/*******************************************************************************/
/**
 * Class holds the needed info for a paticular Model of Car.<br/>
 * Example: LS.
 * @constructor
 */
function VehicleModel(id, name, startingPrice, endingPrice,code,perfAccLink) {
	this.id = id.toLowerCase();
	this.name = name;
	this.startingPrice = startingPrice;
	this.endingPrice = endingPrice;
	this.code = code;
	this.perfAccLink = perfAccLink;
	this.categoryId = 0;
	this.features = $A();
	this.domHotSpot = null;
	this.domNavigation = null;
	this.domOverlay = null;
	this.timeOutId = null;
	
	/**
   * Method adds a VehicleFeature Object to an array.
   * @param feature VehicleFeature VehicleFeature Object representing a Lexus Model Feature
   * @type void
   * @member VehicleModel
   */
	this.addFeature = function(feature) {
		if(feature != '') this.features.push(feature);
	}
	/**
	 * Method returns a string representing the price of the Lexus Model
	 * @type String
	 * @member VehicleModel
	 */
	this.getPriceAsString = function() {
		return this.startingPrice;
	}
}
VehicleModel.prototype.toString = function() {
	return "Model (Object)";
}
/** Type Declarations Class/Instance **/
VehicleModel.type = 'Model';
VehicleModel.prototype.type = 'Model';

/*******************************************************************************/

/**
 * Class holds current State of the navigation<br/>
 * @constructor
 */
function VehicleNavigationState () {
	this._navShowing = false;
	this._categoryShowing = false;
	this._modelShowing = false;
	this._currentActive = null;

	/**
	 * @member VehicleNavigationState
	 * Method sets the current state of the navigation.
	 * If false, method will also update categoryShowing and modelShowing attributes
	 * @param boolean - state True/False 
	 */
	this.setNavShowing = function (state) {
		this._navShowing = state;
		
		// update dependencies if false
		if(!state) {
			this.setCategoryShowing(false);
			this.setModelShowing(false);
			this.setCurrentActive(null);
		}
	}
	/**
	 * 
	 * Method sets categoryShowing attribute, to indicate if a Category Navigation is current visible.
	 * If True, will also set _navShowing to true and will set _modelShowing to false, since only a
	 * model or category can be shown at any point.
	 * @param boolean - state True/False 
	 * @member VehicleNavigationState
	 */
	this.setCategoryShowing = function (state) {
		this._categoryShowing = state;
		
		// update dependencies if true
		if(state) {
			this.setNavShowing(true);
			this.setModelShowing(false);
		}
	}
	/**
	 * Method sets modelShowing attribute, to indicate if a Model Navigation is current visible.
	 * If True, will also set _navShowing to true and will set _categoryShowing to false, since only a
	 * model or category can be shown at any point.
	 * @param boolean - state True/False 
	 * @member VehicleNavigationState
	 */
	this.setModelShowing = function (state) {
		this._modelShowing = state;
		
		// update dependencies if true
		if(state) {
			this.setNavShowing(true);
			this.setCategoryShowing(false);
		}
	}
  /**
	 * Method sets the current object that is active on the vehicle navigation
	 * @param object - Category or Model Object
	 * @member VehicleNavigationState
	 */
	this.setCurrentActive = function(object) {
		this._currentActive = object;
		
		if(!object)
		  return;
	  if(object.type == VehicleCategory.type) {
	  	this.setCategoryShowing(true);	  	
	  }
	  //else {
	  //	this.setModelShowing(true);	  	
	  //}
	}
  /**
	 * Method gets the current object that is active on the vehicle navigation
	 * @type object - Category or Model Object
	 * @member VehicleNavigationState
	 */
	this.getCurrentActive = function() {
		return this._currentActive;		
	}
	/**
	 * Method returns true/false depending on if a vehicle navigation is current showing
	 * @type boolean
	 * @member VehicleNavigationState
	 */
	this.isNavShowing = function() {
		return this._navShowing;
	}
	/**
	 * Method returns true/false depending on if a vehicle Category navigation is current showing
	 * @type boolean
	 * @member VehicleNavigationState
	 */
	this.isCategoryShowing = function() {
		return this._categoryShowing;
	}
	/**
	 * Method returns true/false depending on if a vehicle model navigation is current showing
	 * @type boolean
	 * @member VehicleNavigationState
	 */
	this.isModelShowing = function() {
		return this._modelShowing;
	}
}
IntervalHolder = Class.create();
Object.extend(IntervalHolder.prototype, {
	initialize: function(holderId, intervalFunc, intervalTime, maxNum){
		this.holderId = holderId;
		this.counter = 0;
		this.intervalTime = (intervalTime)?intervalTime:250;
		this.maxNum = (maxNum)?maxNum:300;
		this.intervalFunc = intervalFunc;
		this.setTheInterval();
	},
	setTheInterval: function(){
		this.interval = setInterval(function(){
			this.intervalFunc.apply();
			this.checkForMax();
		}.bind(this), this.intervalTime, false);
	},
	clearTheInterval: function(){
		if(this.interval){
		clearInterval(this.interval);
		this.interval = null;
		this.counter = 0;
		}
	},
	checkForMax: function(){
		if(this.maxNum != 0){
			this.counter++;
			if((this.counter > this.maxNum)){
				this.clearTheInterval();
				Debug.log("CLEAR INTERVAL: " + this.holderId);
			}
		}
	}
});

IntervalManager = Class.create();
Object.extend(IntervalManager.prototype, {
	initialize: function(){
		this.intervals = new Array();
	},
	createIntervalHolder: function(holderId, intervalFunc, intervalTime, maxNum){
		if(this.getIntervalHolder(holderId)){
			if(this.getIntervalHolder(holderId).interval){
				//Already Exists and is executing -- Do Nothing
				//this.checkForMax(holderId);
			} else {
				this.getIntervalHolder(holderId).setTheInterval();
			}
			return;
		}
		this.intervals.push(new IntervalHolder(holderId, intervalFunc, intervalTime, maxNum));
	},
	getIntervalHolder: function(holderId){
		var intervalFound = false;
		this.intervals.each(function(intervalHolder){
			if(intervalHolder.holderId == holderId){
				intervalFound = intervalHolder;
				throw $break;
			}
		}.bind(this));
		return intervalFound;
	},
	clearIntervalHolder: function(holderId){
		if(this.getIntervalHolder(holderId)){
			var currentInterval = this.getIntervalHolder(holderId);
			if(currentInterval.interval) currentInterval.clearTheInterval();
		} else {
			//Error - shouldn't happen;
		}
	},
	clearAllIntervals: function(){
		this.intervals.each(function(intervalHolder){
			this.clearIntervalHolder(intervalHolder.holderId)
		}.bind(this));
	}
});

var intervalManager = new IntervalManager();

/*******************************************************************************/
/**
 * Class acts as the controller to handle all interaction of the navigation bar<br/>
 * @constructor
 */
function VehicleNavigationManager() {
	this.categories = $A();
	this.categoryLinks = new Array();
	this.navState = new VehicleNavigationState();
  this.navView = new VehicleNavigationView();
	this.timeOutId;
	this.timeOutSet = false;
	this.buttonOverTimeout;
	this.ajaxQueue;
	this.imageCache = new Array();
	
	this.backdrop;	

	/**
	 * Method will be called on instantiation of this class.
	 * Exact features are TBD
	 * @member VehicleNavigationManager
	 */
	this.init = function() {
	this._setOnState();	
      
	 // Add onload event
	 onPageLoadEvents.addAction(this.init_onload.bindAsEventListener(this));
	 Event.observe(window, 'unload', Event.unloadCache);
	}
	this.init_onload = function() {
	  this._setupNavigation();
	  this._cacheMenuImages();
      this._preLoadMenus();  
	}
	/**
   * Method adds a Category Object to an array.   
   * @param model - Category Category Object representing a Lexus Category
   * @type void
   * @member VehicleNavigationManager
   */
  this.addCategory = function(category) {
    this.categories.push(category);
  }
  /**
   * Method returns a Category Object from the current array.
   * @param model - Category Category Object representing a Lexus Category
   * @type void
   * @member VehicleNavigationManager
   */
  this.getCategory = function(key) {
  	return this.categories.find(function(category){
  		if(category.id.indexOf(key.toUpperCase()) >= 0) {
  		  return category;
  		}
  	})
  }
  /**
   * Function will control the action of showing a Model or Category Vehicle Navigation Item
   * @param domObject Dom Element
   * @param categoryId String 
   * @param modelId String
   * @type void
   * @member VehicleNavigationManager
   */
  this.showNavigation = function (domObject, categoryId, modelId) {
  	var dataObject = this._getDataObject(categoryId);
  	if(dataObject == null)
  	  return;
  	if(this.timeoutSet) {
  		clearTimeout(this.timeoutId);
  		this.timeoutSet = false;
  	}
		intervalManager.clearAllIntervals();
	this.closeDisclaimer();
	
  	// attach Dom Hot Spot if not already done.
  	if(!dataObject.domHotSpot)
  	  dataObject.domHotSpot = domObject;
	  
  	if(this.navState.isNavShowing()) {
  	  if(this.navState.getCurrentActive() == dataObject)
  	    return;
  	  else
  		this.hideNavigation();
  	}
  	// Hide all flash objects in safari
  	hideElementsForOverlays();
  	switch(categoryId){
		case "ALLMODELS":
		  	this._showAllModelsNavigation(dataObject);
		break;
		case "FCV":
		  	this._showFCVNavigation(dataObject);
		break;
		default:
		  	if(dataObject.type == VehicleCategory.type) {
		  		this._showCategoryNavigation(dataObject);
		  	}
		break;
	} 
	
    if(document.all) Event.observe(document.body, 'mouseout', ieBodyhideNavigation, true);
  }
  /**
   * Method will control the action to hide a Model or Category Vehicle Navigation Item.
   * @param eventObject Event
   * @type void
   * @member VehicleNavigationManager
   */
  this.hideNavigation = function (eventObject) {
  	var currentActive = this.navState.getCurrentActive();

  	// Only Hide if its ok
  	if(!this._shouldWeHideNavigation(eventObject))
  	  return;
    
    var wrapper = $('wrapper');
    
    // Hide Navigation
    currentActive.domNavigation.style.display = 'none';
    currentActive.domOverlay.style.display = 'none';
    
    /* 
     * Removed from the actual DOM because IE has issues displaying if we dont remove,
     * since these elements could be cloned.
     */
    wrapper.removeChild(currentActive.domNavigation);
    wrapper.removeChild(currentActive.domOverlay);    
    /*
     * Removed IE specific body event
  	 * 
  	 */
    if(document.all)
      Event.stopObserving(document.body, 'mouseout', ieBodyhideNavigation, true);
      
    this.navState.setNavShowing(false);
    
    // Show all flash objects in safari
  	showElementsForOverlays();
  }
  /**
   * Method will activate a timer and execute hideNavigation().
   * @member VehicleNavigationManager
   */
  this.hideNavigationWithTimeOut = function(eventObject) {
    if(this.timeoutSet)
      return;
    // Only Hide if its ok
  	if(!this._shouldWeHideNavigation(eventObject))
  	  return;

  	this.timeoutId = setTimeout(function(){this.hideNavigation()}.bind(this),menuTimeout);
  	this.timeoutSet = true;
  }
   /**
   * Method will figure out wether or not to hide the current openned navigation
   * @member VehicleNavigationManager
   */
  this._shouldWeHideNavigation = function (eventObject) {
  	var currentActive = this.navState.getCurrentActive();
  	
  	// Nothing to do if we dont have a nav showing
  	if(!currentActive || !currentActive.domNavigation || !currentActive.domOverlay)
  	  return false; 
  	// If in bounds, do nothing
  	if(this.isEventInBounds(currentActive.domOverlay, eventObject) || this.isEventInBounds(currentActive.domNavigation, eventObject)){	
  		return false;
	} else {
  		return true;
	}
  }
  /**
   * Method clears the current hideNavigation timeout setting if there is one.
   * @member VehicleNavigationManager
   */
  this.clearTimeOut = function() {
  	if(this.timeoutSet) {
  	  clearTimeout(this.timeoutId);
  	  this.timeoutSet = false;
  	}
  }
  /**
   * Method will handle the specific task to show a Category Navigation Item
   * @param category VehicleCategory
   * @type void 
   * @member VehicleNavigationManager
   */
  this._showCategoryNavigation = function(category) {
  	var status = this.navView.showCategoryNavigation(category);
  	this.navState.setCurrentActive(category);
  }
  /**
   * Method will handle the specific task to show the AllModel Navigation Item
   * @param category VehicleCategory
   * @type void 
   * @member VehicleNavigationManager
   */
  this._showAllModelsNavigation = function(category) {
  	var status = this.navView.showAllModelsNavigation(category);
  	this.navState.setCurrentActive(category);
  }
  /**
   * Method will handle the specific task to show the Future Concept Navigation Item
   * @param category VehicleCategory
   * @type void 
   * @member VehicleNavigationManager
   */
  this._showFCVNavigation = function(category) {
  	var status = this.navView.showFCVNavigation(category);
  	this.navState.setCurrentActive(category);
  }
  this._showFPNavigation = function(category) {
  	var status = this.navView.showFPNavigation(category);
  	this.navState.setCurrentActive(category);
  }
  /**
   * Method will handle the specific task to show a Model Navigation Item
   * @param category VehicleCategory
   * @type void 
   * @member VehicleNavigationManager
   */
  this._showModelNavigation = function(model) {
  	var status = this.navView.showModelNavigation(model);
  	this.navState.setCurrentActive(model);
  }
  /**
   * Method figures out if the cursor of the given Event is within the given DOM Element
   * @param domObject DOMElement 
   * @param eventObject Event
   * @type void 
   * @member VehicleNavigationManager
   */
  this.isEventInBounds = function(domObject, eventObject) {	
  	if(!eventObject){
  		return false;
	}
	return Dom.isInBounds(domObject,Event.pointerX(eventObject), Event.pointerY(eventObject));
  }
  /**
   * Method pre caches all menu images
   * @type void 
   * @member VehicleNavigationManager
   */  
  this._cacheMenuImages = function() {
		
	for(var x=0; x<this.categories.length; x++) {
		var category = this.categories[x];
	
	    // Cache Model Navigation Images
	    for(var i=0; i<category.models.length; i++) {
	    	var model = category.models[i];
	    	this._cacheModelNavigationImages(model.name);	  
	    }
	}
  }
  /**
   * Method returns either a Category or a Model object based on if a model is passed in.
   * @param category String
   * @param model String (optional)
   * @type VehicleCategory/VehicleModel
   * @member VehicleNavigationManager
   */
  this._getDataObject = function(category, model) {
  	var dataObject;
  	if(!model)
  	  dataObject = this._getCategoryObject(category);
  	else
  	  dataObject = this._getModelObject(category, model);
  	return dataObject;
  }
  /**
   * Method returns either a Category object based on the id passed in
   * @param categoryId String
   * @type VehicleCategory
   * @member VehicleNavigationManager
   */
  this._getCategoryObject = function(categoryId) { 
  	return this.getCategory(categoryId);
  }
  /**
   * Method returns either a Model object based on the id passed in
   * @param modelId String
   * @type Model
   * @member VehicleNavigationManager
   */
  this._getModelObject = function(categoryId, modelId) {
  	var category = this.getCategory(categoryId);
  	return category.getModel(modelId);
  }
  this._setOnState = function() {
  	if(typeof( window[ 'MODEL_ID' ] ) != "undefined") {      
      var onStateImg;
	  var onStateDividerImg;
	  
      // Check if the current page we are on is a model
      for(var i=0; i<this.categories.length; i++) {
      	var category = this.categories[i];
      	for(var x=0; x<category.models.length; x++) {
      		var model = category.models[x];
      		// Determine if we are on this current Model, change image to 'On' state, and cache image
  	 	  	if(MODEL_ID.toLowerCase() == model.id.toLowerCase()) {
  	 	    	onStateImg = $( [model.categoryId.toLowerCase(), '_' , model.id.toLowerCase()].join('') );
  	      		break;
  	      	}
      	}
      }

  	  // If we are not on a Model, look if we are on a misc Link
  	  if(!onStateImg) {
  		onStateImg = $( ['mv', MODEL_ID].join('') );
  	  }

  	  if(onStateImg) {
  		onStateImg.src = onStateImg.src.replace('.gif', 'On.gif');
  		this._cacheImage(onStateImg.src);
  	  }
	  
		switch(MODEL_ID){
			case 'Dealers':
				$('mvFindADealer').src = $('mvFindADealer').src.replace(new RegExp('(.*)(\.gif)', 'i'), '$1On$2'); 
			break;
			case 'FCV':
				onStateDividerImg = $('mvCatDivLHFCV');
			break;
			case 'AllModels':
				onStateDividerImg = $('mvCatDivAllModelsLS');
			break;
		}
  	  if(onStateDividerImg) {
  		onStateDividerImg.style.background = 'url(/lexus-share/images/nav/top/vehiclebar/bkg_verticlebar_dividerOn.gif)';
  	  }
    }
  }
  /**
   * Method executes the preliminary setup of the navigation bar. 
   * Including: caching of all images and rollovers, and all needed
   * events.
   * @member VehicleNavigationManager
   */
  this._setupNavigation = function() {  
  	 var mvCategoryContainers = document.getElementsByClassName('mvCategoryContainer');
  	 var mvMiscLinkContainers = document.getElementsByClassName('mvMiscLinkContainer');
  	 
  	 // Category and Model: Add Events and cache all images
  	 for(var i=0; i<mvCategoryContainers.length; i++) {
  	 	var mvCategoryContainer = mvCategoryContainers[i];
  	 	var mvCategory = $A(document.getElementsByClassName('mvCategory',mvCategoryContainer));
  	 	
  	 	if(mvCategory != '') {
  	 	  this._setupCategory(mvCategory[0]);
  	 	}
  	 }
  	 
  	 // Misc Links: Add Events and cache all images
	for(var i=0; i<mvMiscLinkContainers.length; i++) {
  	 	var miscDivs = ($NL(mvMiscLinkContainers[i].childNodes)).elements();
		
		for(var x=0; x<miscDivs.length; x++) {
			var miscDiv = miscDivs[x];
			var href = ($NL(miscDiv.childNodes)).firstElement();
  	 		var img = ($NL(href.childNodes)).firstElement();
  	 		
  	 		this._cacheOnOverImages(img.src);
			
  	 		if(img.src.indexOf('On.gif') == -1) {
  	 			Event.observe(img, 'mouseout', function() {swapOver(this);}.bind(img), false);
  	 			Event.observe(img, 'mouseover', function() {swapOver(this);}.bind(img), false);
  	 		}
		}
	}
	
	var category = new VehicleCategory('ALLMODELS', 'All Models');
	navigationManager.addCategory(category);
	
	
    // Add Events to AllModels
	var mvAllModelBtn = $('mvAllModels');
   this._cacheOverImage(mvAllModelBtn.src);
	 Event.observe(mvAllModelBtn, 'mouseover', function(event){this.startCheckingToShowNavigation(event, $('mvAllModelsDiv'), 'ALLMODELS');}.bindAsEventListener(this), false);
	 Event.observe(mvAllModelBtn, 'mouseout', function(){intervalManager.clearIntervalHolder('ALLMODELS');}.bind(this), false);
	
	//Add Events to FCV
	var mvFCVBtn = $('mvFCV');
    this._cacheOverImage(mvFCVBtn.src);
		Event.observe(mvFCVBtn, 'mouseover', function(event){this.startCheckingToShowNavigation(event, $('mvFCVDiv'), 'FCV');}.bindAsEventListener(this), false);
		Event.observe(mvFCVBtn, 'mouseout', function(){intervalManager.clearIntervalHolder('FCV');}.bind(this), false);
	
	Event.observe($('mvContainer'), 'mouseout', function() {this.hideNavigationWithTimeOut();}.bindAsEventListener(this), false);
  }
  /**
   * Method prebuild category overlays.
   * @member VehicleNavigationManager
   */
  this._preLoadMenus = function() {  	
  	this.categories.each(function(category){
		switch(category.id){
			case 'ALLMODELS':
				this.navView.buildAllModelsOverlay(category);
			break;
			case 'FCV':
				this.navView.buildFCVOverlay(category);
			break;
			default:
	  	   		this.navView.buildCategoryOverlay(category); 
			break
		}
  	}.bind(this));
  }
  /**
   * Method managers the caching of all navigation category images and
   * adds swapOver and showNavigation events to the category position of the 
   * Navigtaion bar.
   * @member VehicleNavigationManager
   */
  this._setupCategory = function(mvCategory) { 
    // Find Category Image and Cache
    var categoryImg = mvCategory.getElementsByTagName('img')[0];
    this._cacheOverImage(categoryImg.src);
    // Add Events to Category
    Event.observe(categoryImg, 'mouseover', function(event){this.startCheckingToShowNavigation(event, categoryImg);}.bindAsEventListener(this), false);
		Event.observe(categoryImg, 'mouseout', function(){intervalManager.clearIntervalHolder(categoryImg.id);}.bind(this), false);
  }
	this.startCheckingToShowNavigation = function(eventObject, categoryImg, idOverride){
		idOverride = (idOverride) ? idOverride : categoryImg.id;
		intervalManager.createIntervalHolder(idOverride, function(){this.checkToShowNavigation(eventObject, categoryImg, idOverride);}.bind(this), 50)
	}
	this.checkToShowNavigation = function(eventObject, categoryImg, idOverride){
		var idOverride = (idOverride) ? idOverride : categoryImg.id;
		if(Dom.isInModBounds(categoryImg.id,cursorPosition.getX(), cursorPosition.getY(),10, 10)){
			intervalManager.clearIntervalHolder(idOverride);
			this.hideNavigation(eventObject);
			this.showNavigation(categoryImg, idOverride);
		} else {
			//intervalManager.checkForMax(idOverride);
		}
	}
  this._cacheOverImage = function(src) {
    var overImgSrc = src.replace('On.gif', '.gif');
  	this._cacheImage(overImgSrc.replace('.gif', 'Over.gif'));
  }
  this._cacheOnOverImages = function(src) {
  	this._cacheImage(src);
  	this._cacheOverImage(src)        
  }
  /**
   * Method caches image in browser.
   * @member VehicleNavigationManager
   */
  this._cacheImage = function(src) {
  	// Check if we are a third party navigation and we dont have a full url
  	if(window.LEXUS_ROOT_ASSET && src.indexOf('http://') == -1) {
  		src = window.LEXUS_ROOT_ASSET + src;
  	} 

    var newImage = new Image();
  	newImage.src = src;
  	this.imageCache.push(newImage);
  }
  /**
   * Method controls the caching of all Navigation Menu Model images.
   * @member VehicleNavigationManager
   */
  this._cacheModelNavigationImages = function(modelName) {
		if(!modelName) return;
  	this._cacheImage(this.navView._replaceModel(this.navView.IMG_HEAD,modelName));
    this._cacheImage(this.navView._replaceModel(this.navView.IMG_PHOTO,modelName));
    this._cacheImage(this.navView._replaceModel(this.navView.IMG_OVERVIEW,modelName));
    this._cacheImage(this.navView._replaceModel(this.navView.IMG_BUILD,modelName));
  }
  this.launchDisclaimer = function(modelName) {
  	this.hideNavigation();
  	this.closeDisclaimer();
  	
  	hideElementsForOverlays();
  	this.showDisclaimerWrap();
  	
  	this.ajaxQueue = new Ajax.Queue(Ajax.Queue.FIFO, true);
  	this.ajaxQueue.addAction(
  		new Ajax.Updater(
			    document.body,
			    ajaxUtils.buildAjaxUrl(['/lexus-share/includes/models/legal_disclaimers_template.incl']),
			    {
			 	    method: 'get',
		 	        insertion: Insertion.Bottom,
		 	        onComplete: function() {this.prepareContent()}.bind(this),
				    wait: true
			    }
			  )
	)
	this.ajaxQueue.addAction(
  		new Ajax.Updater(
			    'legalDisclaimerHolder',
			    ajaxUtils.buildAjaxUrl(['/lexus-share/includes/models/legal_disclaimers_' + modelName + '.incl']),
			    {
			 	    method: 'get',
		 	        insertion: Insertion.Bottom,
		 	        onComplete: this.setupLegalDisclaimerScroll,
				    wait: true
			    }
			  )
	)
	this.ajaxQueue.start();
  }
  this.launchDisclaimerPopup = function(modelName) {
  	this.hideNavigation();
  	
  	var windowWidth = (document.all) ? document.body.offsetWidth : window.innerWidth;
	var windowHeight = (document.all) ? document.body.offsetHeight : window.innerHeight;
	
	var left = Math.round( (windowWidth - 804) / 2 );
	var top =  Math.round( (windowHeight - 620) / 2 );
	
	this.closeDisclaimer();
	
	legalDisclaimerWindow  = window.open(LEXUS_ROOT_URL + '/lexus-share/includes/models/legal_disclaimer_vendor.html?model='+modelName,'legalDisclaimerWindow','width=' 
																	+ 774 + ',height=' + 425
																	+ ',menubar=no,location=no,resizable=no,scrollbars=no,status=no,left=' + left + 'px,top=' + top + 'px');
	legalDisclaimerWindow.focus();	
	
	// We have to add these events without prototype, since prototype might not
	// be loaded at this point
	if (window.addEventListener) {
      window.addEventListener('unload', this.closeDisclaimer.bind(this), null);
    } else if (window.attachEvent) {
      window.attachEvent('on' + 'unload', this.closeDisclaimer.bind(this));
    }
  }
  this.prepareContent = function() {
  	$('legalClose').onclick = function() {this.closeDisclaimer()}.bind(this);
  	
  }
  this.closeDisclaimer = function() {
  	if($('legalDisclaimerContainer')) {
  		$('legalDisclaimerContainer').parentNode.removeChild($('legalDisclaimerContainer'));
  		this.hideDisclaimerWrap();
  		showElementsForOverlays();
  	}
  	else if(window.legalDisclaimerWindow && !window.legalDisclaimerWindow.closed) {
		legalDisclaimerWindow.close();
		legalDisclaimerWindow = null;
	}
  }
  this.setupLegalDisclaimerScroll = function() {
  		var scrollObj = new dw_scrollObj('legalClippingLayer', 'legalDisclaimerHolder', null);
	
		// arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
		// (x/y offsets of dragBar in track)
		scrollObj.setUpScrollbar("legalDragBar", "legalTrack", "v", 0, 0);
  }
  this.showDisclaimerWrap = function() {
	if(!this.backdrop) {
		this.backdrop = new Backdrop('disclaimerWrap','galleryWrap');
		this.backdrop.observe('click', this.closeDisclaimer.bind(this), false);
	}
	this.backdrop.enable();
  }
  this.hideDisclaimerWrap = function() {
		  if(this.backdrop) {
			this.backdrop.disable();
		}
		
	}
}
/**
 * Class provides static methods to build and display the navigation onto the browser
 * @constructor
 */
function VehicleNavigationView() {
	this.ROOT_IMG = '/lexus-share/images/nav/vehicleNav/';
	this.MODEL_REPLACE = 'model';
	this.MODEL_CODE_REPLACE = 'model-code';
	this.CATEGORY_REPLACE = 'category';
	this.ALLMODELS_CATEGORY_REPLACE = 'allModelsCategory';
	this.IMG_OVERVIEW = this.ROOT_IMG + 'vn_svBtn~' + this.MODEL_REPLACE + '~Ov.gif';
	this.IMG_GALLERY = this.ROOT_IMG + 'vn_svBtn~' + this.MODEL_REPLACE + '~Pg.gif';
	this.IMG_BUILD = this.ROOT_IMG + 'vn_svBtn~' + this.MODEL_REPLACE + '~Bld.gif';
	this.IMG_HEAD = this.ROOT_IMG + 'vn_sv~'  + this.MODEL_REPLACE + '~Head.gif';
	this.IMG_PHOTO = this.ROOT_IMG + 'vn_sv~'  + this.MODEL_REPLACE + '~Photo.gif';
	this.CAT_OVERLAY = this.ROOT_IMG + 'vn_~' + this.CATEGORY_REPLACE + '~On.gif'
	
	/**
	 * Method will control the operatations to build and show a Cateogry Navigation.
	 * Will return true if the Model navigation is displayed
	 * @param category VehicleCategory
	 * @type boolean
	 * @member VehicleNavigationView
	 */
	this.showCategoryNavigation = function(category) {
	    var wrapper = $('wrapper');
		this.buildCategoryOverlay(category);
		this.buildCategoryNavigation(category);
	
		// If we could not build, return, nothing else to do
		if(!category.domOverlay)
		  return;
	
		// Make sure we have the Model class NOT category
	    wrapper.appendChild(category.domOverlay);
	    category.domOverlay.style.top = Dom.getTopYAsPx(category.domHotSpot,wrapper);
	    category.domOverlay.style.left = (Dom.getLeftX(category.domHotSpot,wrapper)-1)+"px";
	    category.domOverlay.style.display = 'block';
			
		if(!category.domNavigation)
		  return;
		category.domNavigation.style.top = Dom.getBottomYAsPx('mvContainer',wrapper);
	
		/*
		 * Need to calculate the position of category div
		 * This will take into consideration the total size of the
		 * category menu and compare with the total size of the navigation bar.
		 * This is to make sure we do NOT position past the right most point of
		 * the navigation bar.
		 */
		var catTotalSize = 1; // we start with one because the category div has to make up one extra right px
		var navTotalSizeRight = 0;
		var catTotalSizeRight = 0;
	
	    /* 
	     * Calculate the total width based on how many models we are showing
	     * also adds the left position of the dom hot spot (category image)
	     */
		for(var i=0; i<category.models.length; i++) {
			catTotalSize += 234;
			if(i>0) {
				catTotalSize += 1;
			}
		}
		catTotalRight = catTotalSize + Dom.getLeftX(category.domHotSpot,wrapper) - 5;
	
	    // calculate the total size and left position of Navigation bar.
	    var mvBoundry = Dom.getBoundries('mvContainer',wrapper);
	    navTotalSize = mvBoundry.width + mvBoundry.leftX
	    
	    /* 
	     * If are category div is larger than the navigation bar then we will 
	     * line it up on the right corner
	     */
		if(catTotalRight  >  navTotalSize) {
		  category.domNavigation.style.left = (mvBoundry.rightX - catTotalSize - 2) + 'px';
		}
		/*
		 * Else position the menu at the left edge of the triggering category image
		 */
		else {
		  category.domNavigation.style.left = (Dom.getLeftX(category.domHotSpot,wrapper) - 2) + 'px';
		}
		wrapper.appendChild(category.domNavigation);
		category.domNavigation.style.display = 'block';
	    
	}
	this.showAllModelsNavigation = function(category){
	    var wrapper = $('wrapper');
		this.buildAllModelsOverlay(category);
		this.buildAllModelsNavigation(category);
		// If we could not build, return, nothing else to do
		if(!category.domOverlay)
		  return;
	    wrapper.appendChild(category.domOverlay);
	    category.domOverlay.style.top = Dom.getTopYAsPx(category.domHotSpot,wrapper);
	    category.domOverlay.style.left = (Dom.getLeftX(category.domHotSpot,wrapper)- 1)+"px";
	    category.domOverlay.style.display = 'block';	
		
		if(!category.domNavigation)
		  return;
		wrapper.appendChild(category.domNavigation);
		category.domNavigation.style.top = Dom.getBottomYAsPx('mvContainer',wrapper);
	    category.domNavigation.style.left = (Dom.getLeftX(category.domHotSpot,wrapper)- 1)+"px";
		category.domNavigation.style.display = 'block';
	}
	this.showFCVNavigation = function(category){
	    var wrapper = $('wrapper');
		this.buildFCVOverlay(category);
		this.buildFCVNavigation(category);
		// If we could not build, return, nothing else to do
		if(!category.domOverlay)
		  return;
	    wrapper.appendChild(category.domOverlay);
	    category.domOverlay.style.top = Dom.getTopYAsPx(category.domHotSpot,wrapper);
	    category.domOverlay.style.left = (Dom.getLeftX(category.domHotSpot,wrapper)- 1)+"px";
	    category.domOverlay.style.display = 'block';	
		
		if(!category.domNavigation)
		  return;
		wrapper.appendChild(category.domNavigation);
		category.domNavigation.style.top = Dom.getBottomYAsPx('mvContainer',wrapper);
	    category.domNavigation.style.left = (Dom.getLeftX(category.domHotSpot,wrapper)- 2)+"px";
		category.domNavigation.style.display = 'block';
	}
	/**
	 * Method will control the operatations to build and show a Model Navigation.
	 * Will return true if the Model navigation is displayed
	 * @param model VehicleModel
	 * @type boolean
	 * @member VehicleNavigationView
	 */
	this.showModelNavigation = function(model) {
		var wrapper = $('wrapper');
		this.buildModelNavigation(model);
	
		// if we could not build, return, nothing else to do
		if(!model.domNavigation)
		  return

        // show and position navigation menu	
		wrapper.appendChild(model.domNavigation);	
		model.domNavigation.style.top = Dom.getBottomYAsPx('mvContainer',wrapper);
		model.domNavigation.style.left = (Dom.getLeftX(model.domHotSpot,wrapper) - 8) + 'px';
	    model.domNavigation.style.display = 'block';
	    
	    
		this.buildModelOverlay(model);
		
		// if we could not build, return, nothing else to do
		if(!model.domOverlay)
		  return
		
		wrapper.appendChild(model.domOverlay);
		model.domOverlay.style.top = Dom.getTopYAsPx(model.domHotSpot,wrapper);
		// We move the image 4 px left because the image has 3px on each side more of space
		model.domOverlay.style.left = (Dom.getLeftX(model.domHotSpot,wrapper) - 4) + 'px';
		
		model.domOverlay.style.display = 'block';
	    
		return true;
	}
	/*
	 * ISF special case popup
	*/
	this.popupISF = function(link, url) {
		link.href = "javascript:void(0);";
		Event.observe(link, 'click', function(event) {
			isfWindow = infoPopUp(url,950,650);
			if (isfWindow) {
				isfWindow.focus();
			}
		});
	}
	/**
	 * Method will build the DIV Object Navigation representing a specific Model.
	 * @param model VehicleModel
	 * @type void
	 * @member VehicleNavigationView
	 */
	this.buildModelNavigation = function(model) {
		if(model.domNavigation) return;
		
		var nav = $('mvNavigationModel_Template').cloneNode(true);
		
		var linksDiv = document.getElementsByClassName('mvNavigationLinks',nav)[0];
		
		var linkDivPhotoGallery = document.createElement('DIV');
		linkDivPhotoGallery.id = 'mvNavigationLinkPhotoGallery' + model.id;
		linkDivPhotoGallery.className = 'mvNavigationLink';
		var linkAnchorPhotoGallery = document.createElement('a');
		linkAnchorPhotoGallery.href = "javascript:GalleryManager.launchGallery('~model~');";
		linkAnchorPhotoGallery.className = 'mvGalleryLink';
		var linkImgPhotoGallery = document.createElement('IMG');
		linkImgPhotoGallery.src = LEXUS_ROOT_URL + '/lexus-share/images/nav/top/vehiclebar/overlay/btn_photo_gallery.png';
		linkImgPhotoGallery.height = '16';
		linkImgPhotoGallery.width = '201';
		linkImgPhotoGallery.alt = model.name + ' Photo Gallery';
		linkAnchorPhotoGallery.appendChild(linkImgPhotoGallery);
		linkDivPhotoGallery.appendChild(linkAnchorPhotoGallery);
		linksDiv.appendChild(linkDivPhotoGallery);
		prepPNGforSwapOver(linkImgPhotoGallery);
		Event.observe(linkDivPhotoGallery, 'mouseover', function(){swapOver(this);}.bind(linkImgPhotoGallery));
		Event.observe(linkDivPhotoGallery, 'mouseout', function(){swapOver(this); Dom.IEPNG(this)}.bind(linkImgPhotoGallery));
		Event.observe(linkAnchorPhotoGallery, 'click', function(){swapOver(this); Dom.IEPNG(this)}.bind(linkImgPhotoGallery));
		
		var linkDivBuildYour = document.createElement('DIV');
		linkDivBuildYour.id = 'mvNavigationLinkBuildYour' + model.id;
		linkDivBuildYour.className = 'mvNavigationLink';
		var linkAnchorBuildYour = document.createElement('a');
		//linkAnchorBuildYour.href = "javascript:void(0);" + LEXUS_ROOT_URL + "/lexus-main/lexusConfigApp/index.jsp?modelName=~model~&modelCode=~model-code~";
		linkAnchorBuildYour.href = "javascript:void(0);" + LEXUS_ROOT_URL + "/configurator/#/styles/?group=~model~"; // BYL 4 links	
		linkAnchorBuildYour.className = "mvBylLink";
		var linkImgBuildYour = document.createElement('IMG');
		linkImgBuildYour.src = LEXUS_ROOT_URL + '/lexus-share/images/nav/top/vehiclebar/overlay/btn_by_' + model.name + '.png';
		linkImgBuildYour.height = '16';
		linkImgBuildYour.width = '201';
		linkImgBuildYour.alt = 'Build Your ' + model.name;
		linkAnchorBuildYour.appendChild(linkImgBuildYour);
		linkDivBuildYour.appendChild(linkAnchorBuildYour);
		linksDiv.appendChild(linkDivBuildYour);
		prepPNGforSwapOver(linkImgBuildYour);
		Event.observe(linkDivBuildYour, 'mouseover', function(){swapOver(this);}.bind(linkImgBuildYour));
		Event.observe(linkDivBuildYour, 'mouseout', function(){swapOver(this); Dom.IEPNG(this)}.bind(linkImgBuildYour));
		
		var linkDivVehicleInfo = document.createElement('DIV');
		linkDivVehicleInfo.id = 'mvNavigationLinkVehicleInfo' + model.id;
		linkDivVehicleInfo.className = 'mvNavigationLink';
		var linkAnchorVehicleInfo = document.createElement('a');
		linkAnchorVehicleInfo.href = "javascript:void(0);" + LEXUS_ROOT_URL + "/lexus-main/models/~model~/";
		linkAnchorVehicleInfo.className = "mvModelLink";
		var linkImgVehicleInfo = document.createElement('IMG');
		linkImgVehicleInfo.src = LEXUS_ROOT_URL + '/lexus-share/images/nav/top/vehiclebar/overlay/btn_vehicle_info.png';
		linkImgVehicleInfo.height = '16';
		linkImgVehicleInfo.width = '201';
		linkImgVehicleInfo.alt = model.name + ' Vehicle Information';
		linkAnchorVehicleInfo.appendChild(linkImgVehicleInfo);
		linkDivVehicleInfo.appendChild(linkAnchorVehicleInfo);
		linksDiv.appendChild(linkDivVehicleInfo);
		prepPNGforSwapOver(linkImgVehicleInfo);
		Event.observe(linkDivVehicleInfo, 'mouseover', function(){swapOver(this);}.bind(linkImgVehicleInfo));
		Event.observe(linkDivVehicleInfo, 'mouseout', function(){swapOver(this); Dom.IEPNG(this)}.bind(linkImgVehicleInfo));
		
		var linkDivPerfAcc = document.createElement('DIV');
		linkDivPerfAcc.id = 'mvNavigationLinkPerfAcc' + model.id;
		linkDivPerfAcc.className = 'mvNavigationLinkPerfAcc';
		var linkAnchorPerfAcc = document.createElement('a');
		linkAnchorPerfAcc.href = "";
		var linkImgPerfAcc = document.createElement('IMG');
		linkImgPerfAcc.src = LEXUS_ROOT_URL + '/lexus-share/images/nav/top/vehiclebar/overlay/btn_performance_accessories.png';
		linkImgPerfAcc.height = '16';
		linkImgPerfAcc.width = '201';
		linkImgPerfAcc.alt = model.name + ' F Sport Accessories';
		linkAnchorPerfAcc.appendChild(linkImgPerfAcc);
		linkDivPerfAcc.appendChild(linkAnchorPerfAcc);
		linksDiv.appendChild(linkDivPerfAcc);
		if(model.perfAccLink) {
			//linkAnchorPerfAcc.href = model.perfAccLink;
			linkAnchorPerfAcc.href = '/performance/#/landing/'+model.name;
			prepPNGforSwapOver(linkImgPerfAcc);
			Event.observe(linkDivPerfAcc, 'mouseover', function(){swapOver(this);}.bind(linkImgPerfAcc));
			Event.observe(linkDivPerfAcc, 'mouseout', function(){swapOver(this); Dom.IEPNG(this)}.bind(linkImgPerfAcc));
		} else {
			linkAnchorPerfAcc.style.display = 'none';
		}
		
		//this._addLinkEvents(nav, model);
		var links = nav.getElementsByTagName('a');
		var divLink = "";
		
		// Set all Links
		for(var i=0; i<links.length; i++) {
			var link = links[i];
			var linkImg = link.firstChild;
			
			if(model.name != "LFA") {
				link.href = this._replaceModelLink(link.href, model.name, model.code);	   	
			} 
			else {
				// Exception for LFA
				switch(link.className) {
					case "mvHeadLink": 
						link.href = LEXUS_ROOT_URL + "/LFA/";
					break;
					case "mvPhotoLink": 
						link.href = LEXUS_ROOT_URL + "/LFA/";
					break;
					case "mvModelLink": 
						link.href = LEXUS_ROOT_URL + "/LFA/";
					break;
					case "mvGalleryLink": 
						link.href = LEXUS_ROOT_URL + "/LFA/index.html?link=1";
					break;
					case "mvBylLink":
						link.href = LEXUS_ROOT_URL + "http://www.Lexus-LFA.com/configurator_en_us.html";
					break;
				}
			}  

			Event.observe(link, 'click', function(event) {
				if(!event) event = window.event;
				event.cancelBubble = true;
				if (event.stopPropagation) {
					event.stopPropagation();
				}
			}); 
			
			if(link.parentNode.className == 'mvNavigationLinkBuildYour~model~') {
				link.parentNode.className = this._replaceModelText(link.parentNode.className, model.name);
			}
			if(link.className == "mvModelLink"){
				divLink = this._replaceModelLink(link.href, model.name, model.code);	   	
			}
		}
		
		
		//Add Events
		// IS F exception
//		if(model.name == "ISF") {
//			Event.observe(nav, 'click', function() {
//				isfWindow = infoPopUp(LEXUS_ROOT_URL + '/lexus-main/isf/',950,650);
//				if (isfWindow) {
//					isfWindow.focus();
//				}
//			});	
//		} else {
			Event.observe(nav, 'click', function() {
				window.location = divLink;
			});	
//		}
		
		// Set all images
		var imgs = nav.getElementsByTagName('IMG');
		for(var i=0; i<imgs.length; i++) {
			var img = imgs[i];
			var pieces = img.src.split('#');
			img.src = this._replaceModel(pieces[pieces.length - 1], model.name);	   	
				img.alt = this._replaceModel(img.alt, model.name.replace(new RegExp("h$"),' Hybrid'));	
			if(img.src.match(/png?/)) Dom.IEPNG(img);	   	
		}
		var carPhotoDivs = document.getElementsByClassName('mvNavigationModelPhoto', nav);
		carPhotoDivs[0].id = 'mvNavigationModel_' + model.name;
		var carTitleDivs = document.getElementsByClassName('mvNavigationModelHead', nav);
		carTitleDivs[0].id = 'mvNavigationTitle_' + model.name;
		
		nav.id = 'mvNav_' + model.categoryId + "_" + model.name;
		
		//Build Features
		var containerDivs = nav.getElementsByTagName('DIV');
		var topChildrenDivs = containerDivs[0].getElementsByTagName('DIV');
		var featuresDiv = topChildrenDivs[topChildrenDivs.length - 1];
		var startingPrice = document.getElementsByClassName('mvNavigationPrice', nav)[0];
		
		for(var i=0; i<model.features.length; i++) {
			var featureDiv = document.createElement('DIV');
			featureDiv.className = 'mvNavigationFeature';
			featureDiv.innerHTML = model.features[i];
			featuresDiv.appendChild(featureDiv);		
		}
		var featureLinks = featuresDiv.getElementsByTagName('a');
		
		// Set all Links
		for(var i=0; i<featureLinks.length; i++) {
			link = featureLinks[i];
			Event.observe(link, 'click', function(event) {
				if(!event) event = window.event;
				event.cancelBubble = true;
				if (event.stopPropagation) {
					event.stopPropagation();
				}
			}); 
			
		}
			
		
		//Build Staring Price
		startingPrice.innerHTML = model.getPriceAsString();
		
		model.domNavigation = nav;
		
		this._addLegalDisclaimerEvents(model.name,model.domNavigation);
		$('mvContainer').appendChild(model.domNavigation);
	}
	/**
	 * Method will build the DIV Object for the Model Overlay representing a specific Model.
	 * @param model VehicleModel
	 * @type void
	 * @member VehicleNavigationView
	 */
	this.buildModelOverlay = function(model) {
		if(model.domOverlay)
		  return;

		var overlayDiv = document.createElement('DIV');
		var overlayHref = document.createElement('A');
		var overlayImg = document.createElement('IMG');
	
		overlayDiv.className = 'mvOverLay';
	
		// browser conflict
		if(document.all)	
		  overlayDiv.onmouseout = function() { event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)};
		else
		  overlayDiv.onmouseout = function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)};
	
		overlayDiv.onmouseover = function() {navigationManager.clearTimeOut()};

		// IS F exception
//	    if(model.name != "ISF") {
			overlayHref.href = model.domHotSpot.parentNode.href;
		    overlayHref.target = model.domHotSpot.parentNode.getAttribute('TARGET');
//		}
//		else {
//			overlayHref.href = 'javascript:void(0);';
//			this.popupISF(overlayHref, LEXUS_ROOT_URL + '/isf');
//		}

	    var imagepath = model.domHotSpot.src.split('vehicleNav');
		overlayImg.src =  imagepath[0]  + 'vehicleNav/vn_svBtn' + model.name + "Over.gif";
		overlayImg.alt = model.name.replace(new RegExp("h$"),' Hybrid');
		
		//ISF alt tag exception
		if(overlayImg.alt == "ISF"){
			overlayImg.alt = "IS F";
		}
		//end ISF alt tag exception
		
		overlayHref.appendChild(overlayImg);
		overlayDiv.appendChild(overlayHref);
	
		model.domOverlay = overlayDiv;
		$('mvContainer').appendChild(model.domOverlay);  
	}
	/**
	 * Method will build the DIV Object Navigation representing a specific Model.
	 * @param model VehicleModel
	 * @type void
	 * @member VehicleNavigationView
	 */
	this.buildCategoryNavigation = function(category) {
		if(category.domNavigation)
		  return;
	   
		var categoryDiv = document.createElement('DIV');
		categoryDiv.id = 'mvCat_' + category.name;
		categoryDiv.className = 'mvNavigationCategory';
		var categoryDivCloseBtn = document.createElement('DIV');
		categoryDivCloseBtn.id = 'mvCatCloseBtn_' + category.name;
		categoryDivCloseBtn.className = 'mvCategoryBottomOverLay';
		var categoryDivCloseBtnImg = document.createElement('IMG');
		
		if(category.models.length > 1){
			categoryDivCloseBtnImg.src = LEXUS_ROOT_ASSET + "/lexus-share/images/nav/top/vehiclebar/overlay/btn_close.gif";
			categoryDivCloseBtnImg.onmouseover = function(){swapOver(this)};
			categoryDivCloseBtnImg.onmouseout = function(){swapOver(this)};
			categoryDivCloseBtnImg.onclick = function(){swapOut(this);navigationManager.hideNavigation();return false;}
		} else {
			categoryDivCloseBtnImg.src = LEXUS_ROOT_ASSET + "/lexus-share/images/shim.gif";
		}
		
		categoryDivCloseBtn.appendChild(categoryDivCloseBtnImg);
		categoryDiv.appendChild(categoryDivCloseBtn);
		
		category.models.each(function(model, index){
									  
			if(!model.domNavigation)  this.buildModelNavigation(model);
		
			modelDiv = model.domNavigation;
		
			modelDiv.id = category.name + '_' + modelDiv.id;
			modelDiv.className = 'mvNavigationModelForCategory';
			modelDiv.style.display = 'block';
		
			if(index>0) {
				var catDivider = document.createElement('DIV');
				var catDividerImg = document.createElement('IMG');
				
				catDivider.className = 'mvNavigationCategoryDivider';	        
				catDividerImg.src = IMG_ROOT + 'spacer.gif'
				
				catDivider.appendChild(catDividerImg);
				categoryDiv.appendChild(catDivider)
			}
		
			Event.observe(model.domNavigation, 'mouseover', function(){
				if(model.timeOutId) clearTimeout(model.timeOutId);
				model.domNavigation.className = 'mvNavigationModelForCategoryOver';
			});
		
			Event.observe(model.domNavigation, 'mouseout', function(){
				model.timeOutId = setTimeout(function(){swapClass(model.domNavigation,'mvNavigationModelForCategory')},10);
			});	

			categoryDiv.appendChild(modelDiv);
			
		}.bind(this));
		
		if(category.id=='FP'){
			
			var FPDiv = document.createElement('DIV');
		
			FPDiv.id = category.name + '_mvNav_FP';
			FPDiv.className = 'mvNavigationModelForCategory';
			FPDiv.style.display = 'block';
			FPDiv.style.width = '300px';
			
			FPDiv.innerHTML+='<a id="FPImg" href="'+ LEXUS_ROOT_URL +'/performance/">F Performance</a>';
			FPDiv.innerHTML+='<div class="mvNavigationPrice" style="padding:10px 0 2px 10px;">Inspired by Fuji speedway. Proven by Lexus.</div>';
			FPDiv.innerHTML+='<div class="mvNavigationDivider" style="padding-left:10px"><img src="/lexus-share/images/spacer.gif" style="width:270px; height:1px;"></div>';
			FPDiv.innerHTML+='<a id="FPVehicles" href="'+ LEXUS_ROOT_URL +'/performance/#/landing/LFA">Inside F Perfomance Vehicles</a>';
			FPDiv.innerHTML+='<a id="FPEquipment" href="'+ LEXUS_ROOT_URL +'/performance/#/landing/ISC">F Sport Equipment</a>';
			FPDiv.innerHTML+='<a id="FPRegistry" href="'+ LEXUS_ROOT_URL +'/performance/#/behind_the_f/registry/">Perfomance Registry</a>';
		
			var catDivider = document.createElement('DIV');
			var catDividerImg = document.createElement('IMG');
			catDivider.className = 'mvNavigationCategoryDivider';	        
			catDividerImg.src = IMG_ROOT + 'spacer.gif';
				
			catDivider.appendChild(catDividerImg);
			categoryDiv.appendChild(catDivider);
		
			Event.observe(FPDiv, 'mouseover', function(){
				if(model.timeOutId) clearTimeout(model.timeOutId);
				FPDiv.className = 'mvNavigationModelForCategoryOver';
			});
		
			Event.observe(FPDiv, 'mouseout', function(){
				model.timeOutId = setTimeout(function(){swapClass(FPDiv,'mvNavigationModelForCategory')},10);
			});

			categoryDiv.appendChild(FPDiv);
			
		}
		
		category.domNavigation = categoryDiv;
		
		$('mvContainer').appendChild(categoryDiv);
		
		if(document.all)
			Event.observe(categoryDiv, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
			Event.observe(categoryDiv, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		
		Event.observe(categoryDiv, 'mouseover', function() {navigationManager.clearTimeOut()})
	  
	}
	this.buildAllModelsNavigation = function(category){
		if(category.domNavigation)
		  return;
		var categoryDiv = $('mvCat_AllModels');
		var mapAreas = $NL(categoryDiv.getElementsByTagName('area'));
		mapAreas.each(function(mapArea){
			var mapAllModelsCategory = mapArea.id.substring(19,(mapArea.id.length));
			// Create category links for Flash Player 9 users vs. others
			if ((mapArea.className == 'allmodels_category')) {
				var mapCategoryHrefPieces = mapArea.getAttribute('href').split('|');
				if ((typeof FlashDetect != 'undefined') && (FlashDetect.installed) && (FlashDetect.major >= 9)) {
					mapArea.href = this._replaceAllModelsCategory(mapCategoryHrefPieces[0], mapAllModelsCategory);
				} else {
					mapArea.href = mapCategoryHrefPieces[1];
				}
			} else {
			Event.observe(mapArea, 'mouseover', function(){
					$('allmodels_title_' + mapArea.getAttribute('alt')).className = $('allmodels_title_' + mapArea.getAttribute('alt')).className + "Over";
			});
			Event.observe(mapArea, 'mouseout', function(){
					$('allmodels_title_' + mapArea.getAttribute('alt')).className = $('allmodels_title_' + mapArea.getAttribute('alt')).className.replace(/Over?/, '');
				});
			}
		}.bind(this));
		if(document.all)
		  Event.observe(categoryDiv, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
		  Event.observe(categoryDiv, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		
		Event.observe(categoryDiv, 'mouseover', function() {navigationManager.clearTimeOut()})
		category.domNavigation = categoryDiv;
	}
	this.buildFCVNavigation = function(category){
		if(category.domNavigation)
		  return;
		var categoryDiv = $('mvCat_FCV');
		$('mvNavigationFCV').style.display= 'block';
		var timeOutId = null;
		if(document.all)
		  	Event.observe(categoryDiv, 'mouseout', function() {
		  		event.cancelBubble = true;
				navigationManager.hideNavigationWithTimeOut(event);
				timeOutId = setTimeout(function(){swapClass($('mvNavigationFCV'),'mvNavigationModelForCategory')},10);
			}.bind(timeOutId));
		else
		  	Event.observe(categoryDiv, 'mouseout', function(event) {
		  		event.cancelBubble = true;
				navigationManager.hideNavigationWithTimeOut(event);
				timeOutId = setTimeout(function(){swapClass($('mvNavigationFCV'),'mvNavigationModelForCategory')},10);
			}.bind(timeOutId));
		
		Event.observe(categoryDiv, 'mouseover', function() {
			if(timeOutId) clearTimeout(timeOutId);
			navigationManager.clearTimeOut();
			categoryDiv.style.cursor = "pointer";
			$('mvNavigationFCV').className = 'mvNavigationModelForCategoryOver';
		}.bind(timeOutId));
		Event.observe(categoryDiv, 'click', function() {
			window.location = LEXUS_ROOT_URL + '/lexus-main/fcv/';
		});	
		
	    var imgs = categoryDiv.getElementsByTagName('IMG');
	   
		// Set all images
		for(var i=0; i<imgs.length; i++) {
			var img = imgs[i];
			var pieces = img.src.split('#');
			img.src = (pieces[1]) ? pieces[1] : img.src;
	   		img.alt = img.alt;
			if(img.src.match(/png?/)) Dom.IEPNG(img);	   	
		}
		category.domNavigation = categoryDiv;
	}
	/**
	 * Method will build the DIV Object for the Model Overlay representing a specific Model.
	 * @param model VehicleModel
	 * @type void
	 * @member VehicleNavigationView
	 */
	this.buildCategoryOverlay = function(category) {
	  if(category.domOverlay)
	    return;

	  var overlayDiv = $('mvCategoryOverLay_Template').cloneNode(true);
	  var divs = overlayDiv.getElementsByTagName('DIV');
	  var topDiv = divs[0];
	
	  overlayDiv.id = 'overlayDiv' + category.id;
          
		if(document.all)
                Event.observe(overlayDiv, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
                Event.observe(overlayDiv, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		Event.observe(overlayDiv, 'mouseover', function() {navigationManager.clearTimeOut()})
		
		// Create category overlay link
		var categoryLink = ($NL(topDiv.childNodes)).firstElement();
		var categoryHrefPieces = categoryLink.href.split('|');

		var allModelsCategory = this._getAllModelsCategory(category);
		// Set links for vehicle categories for Flash Player 9 users vs. others
		if (allModelsCategory != '') {
			if ((typeof FlashDetect != 'undefined') && (FlashDetect.installed) && (FlashDetect.major >= 9)) {
				categoryLink.href = this._replaceAllModelsCategory(categoryHrefPieces[0], allModelsCategory);
			} else {
				categoryLink.href = categoryHrefPieces[1];
			}
		}
	
	  // Create Category Overlay Image Example: 'vn_ESOn.gif'
	  var imgTopDiv = ($NL(categoryLink.childNodes)).firstElement();
	  var pieces = imgTopDiv.src.split('#');
	  imgTopDiv.src = this._replaceCategory(pieces[pieces.length - 1], category.id);
          imgTopDiv.alt = category.name;
	  //Need to calc cached images width;
	  var imgWidth = new Image();
	  imgWidth.src = imgTopDiv.src;
	  // Have to set a width in IE
	  if(document.all)
	    overlayDiv.style.width = imgWidth.width;

	  category.domOverlay = overlayDiv;
	  $('mvContainer').appendChild(category.domOverlay);
	}
	this.buildAllModelsOverlay = function(category){
	  if(category.domOverlay)
	    return;
	  var allModelOverlayImg = $('mvAllModelsBtnOverlayImg');
	  var allModelPieces = allModelOverlayImg.src.split('#');
	  allModelOverlayImg.src = allModelPieces[1];
	  category.domOverlay = $('overlayDivALLMODELS');
		if(document.all)
		  Event.observe(category.domOverlay, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
		  Event.observe(category.domOverlay, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
 		Event.observe(category.domOverlay, 'mouseover', function() {navigationManager.clearTimeOut()})
		
	  //Need to calc cached images width;
	  var imgWidth = new Image();
	  imgWidth.src = allModelOverlayImg.src;
	  // Have to set a width in IE
	  if(document.all)
	    category.domOverlay.style.width = imgWidth.width;
	}
	this.buildFCVOverlay = function(category){
	  if(category.domOverlay)
	    return;
	  var fcvOverlayImg = $('mvFCVBtnOverlayImg');
	  var fcvModelPieces = fcvOverlayImg.src.split('#');
	  fcvOverlayImg.src = fcvModelPieces[1];
	  category.domOverlay = $('overlayDivFCV');
		if(document.all)
		  Event.observe(category.domOverlay, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
		  Event.observe(category.domOverlay, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
 		Event.observe(category.domOverlay, 'mouseover', function() {navigationManager.clearTimeOut()})
		
	  //Need to calc cached images width;
	  var imgWidth = new Image();
	  imgWidth.src = fcvOverlayImg.src;
	  // Have to set a width in IE
	  if(document.all)
	    category.domOverlay.style.width = imgWidth.width;
	}
	this.buildFPOverlay = function(category){
	  if(category.domOverlay)
	    return;
	  var fcvOverlayImg = $('mvFCVBtnOverlayImg');
	  var fcvModelPieces = fcvOverlayImg.src.split('#');
	  fcvOverlayImg.src = fcvModelPieces[1];
	  category.domOverlay = $('overlayDivFCV');
		if(document.all)
		  Event.observe(category.domOverlay, 'mouseout', function() {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
		else
		  Event.observe(category.domOverlay, 'mouseout', function(event) {event.cancelBubble = true;navigationManager.hideNavigationWithTimeOut(event)})
 		Event.observe(category.domOverlay, 'mouseover', function() {navigationManager.clearTimeOut()})
		
	  //Need to calc cached images width;
	  var imgWidth = new Image();
	  imgWidth.src = fcvOverlayImg.src;
	  // Have to set a width in IE
	  if(document.all)
	    category.domOverlay.style.width = imgWidth.width;
	}
	this._addLegalDisclaimerEvents = function(modelId, div) {
		var featureDivs = document.getElementsByClassName('mvNavigationFeatures', div, 'DIV');
		var priceDiv = document.getElementsByClassName('mvNavigationPrice', div, 'DIV')[0];
		
		for(var x=0; x<featureDivs.length; x++) {
			var featureDiv  = featureDivs[x];
			
			var disclaimers = featureDiv.getElementsByTagName('A');
			
			for(var x=0; x<disclaimers.length; x++) {
				var disclaimer = disclaimers[x];
				
				disclaimer.href = 'javascript:void(0);'
				
				// If we are on a vendor site
				if(window.LEXUS_ROOT_URL) {
					disclaimer.onclick = function(event) {
						navigationManager.launchDisclaimerPopup(this);
					}.bind(modelId);
				}
				// else we must be on www.lexus.com
				else {
					disclaimer.onclick = function(event) {
						navigationManager.launchDisclaimer(this);
					}.bind(modelId);
				}
			}
		}
		
		var hrefs = priceDiv.getElementsByTagName('A'); 
		var disclaimer;
		if(hrefs.length > 0) {
			disclaimer = hrefs[0];
		}
		else {
			disclaimer = document.createElement('SPAN');
			disclaimer.className = 'span_disclaim';
			disclaimer.innerHTML = '[<a href="javascript:void(0);" class="link_disclaim">1</a>]';
			priceDiv.appendChild(disclaimer);
		}	
		// Add diclaimer about price 
		// If we are on a vendor site
		if(window.LEXUS_ROOT_URL) {
			disclaimer.onclick = function() {navigationManager.launchDisclaimerPopup(this);}.bind(modelId);
		}
		// else we must be on www.lexus.com
		else {
			disclaimer.onclick = function(event) {
				navigationManager.launchDisclaimer(this);
				if(!event) event = window.event;
				event.cancelBubble = true;
				if (event.stopPropagation) {
					event.stopPropagation();
				}
			}.bind(modelId);
		} 		
		
	}
	/**
	 * Method replaces all ~model~ wildcards with actual model name for lexusConfigApp/links
	 */
	this._replaceModel = function(str, name) {
	  if(str.indexOf('lexusConfigApp') > -1 && name.match(new RegExp("h$"))) {
	  	name = name.replace(new RegExp("h$"),'_HYBRID');
	  }
	  return str.templateReplace(this.MODEL_REPLACE, name);	
	}
	/**
	 * Method replaces all ~model~ wildcards with actual model name for BYL 4 links
	 */
	this._replaceModel = function(str, name) {
	  if(str.indexOf('configurator') > -1 && name.match(new RegExp("HSh$"))) {
	  	name = name.replace(new RegExp("HSh$"),'HS');
	  }
	  else if(str.indexOf('configurator') > -1 && name.match(new RegExp("h$"))) {
	  	name = name.replace(new RegExp("h$"),' Hybrid');
		name = escape(name);
	  }
	  else if(str.indexOf('configurator') > -1 && name.match(new RegExp("ISC$"))) {
	  	name = name.replace(new RegExp("ISC$"),'IS C');
		name = escape(name);
	  }
	  else if(str.indexOf('configurator') > -1 && name.match(new RegExp("ISF$"))) {
	  	name = name.replace(new RegExp("ISF$"),'IS F');
		name = escape(name);
	  }
	  return str.templateReplace(this.MODEL_REPLACE, name);	
	}
	/**
	 * Method replaces all ~model~ wildcards with actual model name
	 */
	this._replaceModelText = function(str, name) {
	  if(name.match(new RegExp("h$"))) {
	  	name = name.replace(new RegExp("h$"),' HYBRID');
	  }
	  return str.templateReplace(this.MODEL_REPLACE, name);	
	}
	this._replaceModelCode = function(str, name) {
		return str.templateReplace(this.MODEL_CODE_REPLACE, name);	
	}
	this._replaceModelLink = function(str, name, code) {
	  str = str.replace('about:blank','');
	  str = str.replace('javascript:void(0);', '');
	  str = this._replaceModel(str, name);
	  str = this._replaceModelCode(str, code);
	  return str;
	}
	/**
	 * Method replaces all ~category~ wildcards with actual category name
	 */
	this._replaceCategory = function(str, cat) {
	  return str.templateReplace(this.CATEGORY_REPLACE, cat);	
	}
	/**
	 * Method replaces all ~allModelsCategory~ wildcards
	 * with actual all models category name
	 */
	this._replaceAllModelsCategory = function(str, cat) {
	  // IE bugs
	  str = str.replace('about:','');
	  str = str.replace('blank','');
	  return str.templateReplace(this.ALLMODELS_CATEGORY_REPLACE, cat);	
	}
  /**
   * Method gets category name as used in deeplink in all models section
   * @member VehicleNavigationView
   */
	this._getAllModelsCategory = function(category){
		var allModelsCategory = '';
		switch (category.id) {
			case 'S':
				allModelsCategory = 'sedans';
				break;
			case 'FP':
				allModelsCategory = 'fperformance';
				break;
			case 'C':
				allModelsCategory = 'convertible';
				break;
			case 'LU':
				allModelsCategory = 'luxuryutility';
				break;
			case 'H':
				allModelsCategory = 'hybrids';
				break;
		}
		return allModelsCategory;
	}
}
function ieBodyhideNavigation() {	
	navigationManager.hideNavigationWithTimeOut();
}
var navigationManager = new VehicleNavigationManager();


/**
 * Modal Backdrop: This is the semi-transparent white backdrop that goes between
 * 		a popup panel and the main page.
 */
var Backdrop = Class.create();
Object.extend(Backdrop.prototype, {
	initialize: function(id, classname){
		//Constants
		this.STATUS_LOADING = "loading";
		this.STATUS_LOADED = "loaded";
		//Prepare Backdrop Div
		this.element = document.createElement('div');
		this.element.id = id;
		if(document.all)
			this.element.className = classname + 'IE';
		else
			this.element.className = classname;
		
		this.element.style.display = 'none';
		//If the user resizes the window, make sure the modal backdrop still covers the whole page
		Event.observe(window, 'resize', function(){this.resize()}.bind(this));
		document.body.appendChild(this.element);		
		
	},
	resize: function() {
		//have to shrink the backdrop so we can get the new scrollHeight
//		this.element.style.height = document.body.offsetHeight + 'px';
//		this.element.style.width = document.body.offsetWidth + 'px';
		
		//make sure the backdrop covers the whole page
		var sizes = this.getPageSize();
		
		//Grabs the highest number out all the possible browser heights.
		var _height = Math.max( 
				document.body.scrollHeight, 
				document.body.offsetHeight,
				document.body.clientHeight,
				document.documentElement.clientHeight, 
				document.documentElement.scrollHeight, 
				document.documentElement.offsetHeight
		);
		
		this.element.style.height = _height + 'px';
		this.element.style.width = "100%";// sizes[0] + 'px';
		
		this.element.style.left = ( window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) + "px";
		this.element.style.top = "0px";
	
		
	},
	// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.org
//
	getPageSize: function(){
		
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll =  document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = windowWidth;
		} else {
			pageWidth = xScroll;
		}
	
	
		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
		return arrayPageSize;
	},
	enable: function(){
		this.element.style.height = document.body.scrollHeight + 'px';
		this.element.style.width = document.body.scrollWidth + 'px';
		this.element.style.display = 'block';
		this.resize();
	},
	disable: function(){
		this.element.style.display = 'none';
	},
	observe: function(action, func, bubble) {
		Event.observe(this.element, action, func, bubble);
	},
	statusIndicator: function(state){
		switch(state){
			case this.STATUS_LOADING:
				var sizes = this.getPageSize();
				var divTop = (sizes[3] / 2) - 7;
				this.element.innerHTML = '<div style="top: ' + divTop + 'px;"  class="backdrop_loader">L O A D I N G</div>';
			break;
			case this.STATUS_LOADED:
				this.element.innerHTML = '';
			break;
		}		
	}
});


//line 7656
var Demo = Class.create();

Object.extend(Demo.prototype, {
	initialize: function(element,id,groupId, name,path) {
		this.element = element;
		this.id = id;
		this.groupId = groupId;
		this.name = name;
		this.path = path;
		
		this.buttonElement;
		this.description;
		this.params;
		this.movie;
		this.type;
		this.meta;
	},
	addParams: function(params) {
		this.params = params;
	},
	addMeta: function(meta) {
		this.type = meta['type'];
		this.meta = meta;		
	},
	getParam: function(name) {
		return (this.params[name]) ? this.params[name] : '';
	},
	getMeta: function(name) {
		return (this.meta[name]) ? this.meta[name] : '';
	}
});

var DemoController = Class.create();

var url_string = String(this.location);
var str1 = url_string.split('/demos/');
if(str1[1]){
	var str2 = str1[1].split('.html');
	if(str2[0] == "demo_popUp"){
		var popUppage = true;
	}else{
		var popUppage = false;
	}
}else{
	var popUppage = false;
}


Object.extend(DemoController.prototype, {
	
	
	initialize: function(){
		this.demoContainer = 'demoContainer';
		this.demoGroups = new Object();
		this.currentGroup;
		this.currentDemo;
		this.onloadDemo;

		this.ajaxQueue;
		this.viewPointMethods;
		// search dom for demos/tutorials/videos and prepre anything that needs to be.
		this._findAllDemos();
		this._launchDemoOnload();
		
		this.backdrop;
	},
	
	openDemo: function(groupId, demoId) {

	
		if($('popupOverlay')) {
			hidePW();	// hide popup windows from glossary terms.
		}
		
		if(!PAGE_LOAD) {
	 		return;
	 	}

		this.currentGroup = this._getDemoGroup(groupId);
		
		if(!$(this.demoContainer )) {
			this._initializeDemo(demoId);
		}
		else {
			this._prepareDemoTemplate(demoId);
		}

		// Make sure we are at the top of the page
		scroll(0,0);
					
	},
	
	closeDemos: function() {
  	  	this.currentDemo = null;
  	  	this.currentGroup = null;
  	  	this._hideDemos();
	},
	
	showDemo: function(demoId) {
		this._playDemo(demoId);
	},
	playCurrentDemo: function() {
		
		this._playDemo(this.currentDemo.id)
	},
	playNextMovie: function() {
		var index;
		
		// If we only have one demo, play it again
		if(this.currentGroup.length < 2) {
			this.playCurrentDemo();
			return;
		}
		// Loop through and find where we are in the stack
		for(var i=0; i<this.currentGroup.length; i++) {
			var demo = this.currentGroup[i];
			if(demo.id == this.currentDemo.id) {
				index = i;
				break;
			}	
		}
		// If we are not on the last demo, play the next one
		if( (index+2) <=  this.currentGroup.length) {
			this.showDemo(this.currentGroup[index+1].id);
		}
		else {
			this.showDemo(this.currentGroup[0].id);
		}
	},
	_playDemo: function(demoId) {
		
		this.currentDemo = this._getDemo(demoId);
		// Retrieve and Build Demo via ajax call
		if(!this.currentDemo.params) {
			this._getDemoAjax(this.currentDemo);
		}
		//Prepare and Build demo since we already have the needed data
		else {
			this._prepareDemo(this.currentDemo);	
		}
	},
	_configureForViewPoint: function(movie) {
		if(movie) {
			vmp = movie;
		 	this.viewPointMethods = new Object();
		 	this.viewPointMethods.movie = movie;
		 	movie.Execute('ForceHostLayering(1)');
		 	Object.extend(this.viewPointMethods, ViewPointMethodsDemo.prototype);
		 	
		 	if(hasObject(window, 'ViewPointMethodsDemo' + this.modelId)) {
		 		Object.extend(this.viewPointMethods, eval(' new ViewPointMethodsDemo' + this.modelId + '()') );
			}
		}
	},
	 
	processViewPointAction: function(ref, func, args) {
		 if(this.viewPointMethods && this.viewPointMethods[func]) {
		   if(!args) 
		 	args = $A();
		   this.viewPointMethods[func].apply(this.viewPointMethods, args);
		  }
	 }, 
	
	_initializeDemo: function(demoId) {
		this._initializeAjax(demoId);
	},
	
	_getAjaxQueue: function() {
		return (this.ajaxQueue) ? this.ajaxQueue : new Ajax.Queue(Ajax.Queue.Single, false);
	},
	
	_initializeAjax: function(demoId) {
			//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			var ajaxQueue = this._getAjaxQueue();
			ajaxQueue.addAction(
				new Ajax.Updater(
					{success: document.body, failure: null }, 
					ajaxUtils.buildAjaxUrl(['/lexus-share/demos/demo_template.html']), 
					{
						method: 'GET',
						wait: true,
						insertion: Insertion.Bottom,	
						onComplete: function() {this.controller._prepareDemoTemplate(this.demoId)}.bind({controller: this, demoId: demoId})
					}
				)
			);
			ajaxQueue.start();
		}
		//code added to allow demos in popup window - by simon chelebyan - team one//
		else{
			
			var ajaxQueue = this._getAjaxQueue();
			ajaxQueue.addAction(
				new Ajax.Updater(
					{success: document.body, failure: null }, 
					ajaxUtils.buildAjaxUrl(['/lexus-share/demos/demo_template_popup.html']), 
					{
						method: 'GET',
						wait: true,
						insertion: Insertion.Bottom,	
						onComplete: function() {this.controller._prepareDemoTemplate(this.demoId)}.bind({controller: this, demoId: demoId})
					}
				)
			);
			ajaxQueue.start();
		}
		//end code by simon
	},
	
	_showDemos: function() {
		hideAllFlashInSafari();
		this._showWrapper();	
		$(this.demoContainer).style.display = 'block';
		
		// Mac browsers fix - Mac browsers seem to set visiblilty to hidden
		// when we close the demo and when we try to relaunch, no movie
		// is visible
		$('demoMovie').style.visibility = "visible";
		
	},
	
	_hideDemos: function() {
		$(this.demoContainer).style.display = 'none';
		$('demoMovie').innerHTML = null;
		this._hideWrapper();
		hidePW();	// hide popup windows from glossary terms.
		showAllFlashInSafari();
	},
	_showWrapper: function() {
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			if(!this.backdrop) {
				this.backdrop = new Backdrop('demoWrapper','galleryWrap');
				this.backdrop.observe('click', this.closeDemos.bind(this), false);
			}
			this.backdrop.enable();
		}
	},
	_hideWrapper: function() {
		  if(this.backdrop) {
			this.backdrop.disable();
		}
	},
	_prepareDemoTemplate: function(demoId) {
		if(this.demoContainer) {
			// Adjust left header image
			this._addMoviesToButtons();
			this._updateModelImage();
			this.showDemo(demoId);	
		}
	},
	
	_addMoviesToButtons: function() {
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			var buttonContainer = $('demoButtonsContainer');
			emptyElement(buttonContainer);
			for(var i=0; i<this.currentGroup.length; i++) {
				
				var demo = this.currentGroup[i];
				var buttonDiv = document.createElement('DIV');
				var middleDiv = document.createElement('DIV');
				var textDiv   = document.createElement('SPAN');
				var fixBr   = document.createElement('BR');
				
				demo.buttonElement = buttonDiv;
				buttonDiv.className = 'demoButtonOff demoButton';
				
				middleDiv.className = 'demoValignMiddle';
				textDiv.innerHTML = demo.name;
				textDiv.className = 'demoButtonText';
				fixBr.className = 'demoButtonFix';
				
				middleDiv.appendChild(textDiv);
				buttonDiv.appendChild(middleDiv);
				buttonContainer.appendChild(buttonDiv);
				buttonContainer.appendChild(fixBr);
				
				this._addEventsToButton(buttonDiv,demo.id);
			}
		}
	},
	_getDemoGroup: function(id) {
		return this.demoGroups[id];
	},
	
	_getDemo: function(id) {
		
		for(var i=0; i<this.currentGroup.length; i++) {
			if(this.currentGroup[i].id == id) {
				return this.currentGroup[i];
			}
		}
	},
	
	_getDemoAjax: function(demo) {
		
		var ajaxQueue = this._getAjaxQueue();
		ajaxQueue.addAction(
				new Ajax.Request(
			      ajaxUtils.buildAjaxUrl([demo.path]), 
			    {
				    method: 'GET',
				    wait:true,
				    onSuccess: 	this._callbackDemo.bind(this)
			    }
			)
		);
		ajaxQueue.start();
	},
	
	_callbackDemo: function() {

		var xml = arguments[0].responseXML.getElementsByTagName('lexus')[0];
		var data = this._getData(xml);
		var demo = this._getDemo(data.meta['demoId']);
		
		demo.addMeta(data.meta);
		demo.addParams(data.params);
		
		this._prepareDemo(demo);
	},
	
	_prepareDemo: function(demo) {
		try{ fireTag('2203.1',{'<title>':demo.getMeta('title')}); }catch(err){}
		
		var width = demo.getParam('width');
		var height = demo.getParam('height');
		
		this._adjustMargin(width, height);
		this._updateDescription(demo.getMeta('description'));
		this._updateTitle(demo.getMeta('title'));
		this._updateDisclaimers(demo.getMeta('disclaimers'));
		this._updateSoundControl(demo.getMeta('sound'));
		this._updateButtonsState(demo);
		if( parseInt(width) > 640 ) {this._adjustTemplate(width, height);}
		this._updatePluginLink(demo.type);
		this._showDemos();
		this._setupScroll();
		
		//Build Movie based on type
		switch (demo.type) {
			case 'flash':
				this._buildFlashDemo(demo);
				break;
				
			case 'viewpoint':
				this._buildViewPointDemo(demo);				
				break;

			case 'mediaplayer':
				this._buildMediaPlayerDemo(demo);				
				break;

			default:
				break;
		}
	},
	_updatePluginLink: function(type) {
		$('demoPlugin').href = MovieUtils.getPluginDownloadLink(type);
	},
	_updateModelImage: function() {
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			$('demoHeaderSection').src = DemoController.ROOT_IMAGES + 'vc_' + MODEL_ID.toLowerCase() + 'Head.gif';
		}else{
			if(mYear==" "){
				if(my07){
					mYear = "2007";
				}
				else{
					mYear = "2008";
				}
			}
			if(MODEL_ID.length<3){
				$('modelShown').innerHTML =  "As shown on the "+mYear+" "+MODEL_ID.toUpperCase();
			}else{
        MODEL_ID = MODEL_ID.toUpperCase();
        switch (MODEL_ID) {
          case 'ISC':
            $('modelShown').innerHTML =  "As shown on the "+mYear+" "+MODEL_ID.substring(0,2).toUpperCase() +" C";
            break;
          case 'ISF':
            $('modelShown').innerHTML =  "As shown on the "+mYear+" "+MODEL_ID.substring(0,2).toUpperCase() +" F";
            break;
          default:
            $('modelShown').innerHTML =  "As shown on the "+mYear+" "+MODEL_ID.substring(0,2).toUpperCase() +" Hybrid";
            break;
        }
			}
		}
	},
	
	_updateTypeImage: function(type) {
		//$('demoHeaderType').src = DemoController.ROOT_IMAGES + type + '.gif';
	},
	
	_updateButtonsState: function(demo) {
		var currentButton = (demo) ? demo.buttonElement : null;
		var buttons = document.getElementsByClassName('demoButton', 'demoButtonsContainer', 'DIV');
		
		for(var i=0; i<buttons.length; i++) {
			if(currentButton == buttons[i]) {
				buttons[i].className = 'demoButton demoButtonOn';
			}
			else {
				buttons[i].className = 'demoButton demoButtonOff';
			}
		}
	},
	
	_adjustMargin: function(width,height) {
		// Need to center movie vertically. Height for demoMovieContainer is 360. 
		var marginLeft=0; var marginTop=0; 
		if (parseInt(width) < 642) { marginLeft = ( 642 - width*1 ) / 2; }
		if (parseInt(height) < 360) { marginTop = ( 360 - height*1 ) / 2; }
		
		$('demoMovie').style.marginLeft= Math.round(marginLeft) + 'px';
		$('demoMovie').style.width= width+'px';
		$('demoMovie').style.marginTop = Math.round(marginTop) + 'px';
		$('demoMovie').style.height= height+'px';
	},
	
	_adjustTemplate: function(width,height) {
		//adjust the box height for oversized flash files
		var playerH = parseInt(height)-45;
		var containerH = parseInt(height) + 260;		
		
		//hide the side nav and play demo title
		$('demoButtonsContainer').style.display = 'none';
		$('demoPlayDemo').style.display = 'none';
		
		//expand the play box
		$('demoBodyContainer').style.display = 'block'; 
		if (parseInt(height) < 360) { $('demoBodyContainer').style.height = playerH+'px'; } else { $('demoBodyContainer').style.height = parseInt(playerH+45) + 'px'; }
		$('demoBodyContainer').style.width = width + 'px';
		if (parseInt(width) < 642) { $('demoBodyContainer').style.marginLeft = '60px'; } else { $('demoBodyContainer').style.marginLeft = 'auto';$('demoBodyContainer').style.marginRight = 'auto'; }
		if (parseInt(height) < 360) { $('demoBodyContainer').style.marginTop = '50px'; } else { $('demoBodyContainer').style.marginTop = '0px'; }
		$('demoBodyContainer').style.marginBottom = '0';
		$('demoContainer').style.height = containerH+'px';
	},
	
	_updateDescription: function(description) {
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			$('demoDescription').innerHTML = description;
		}
	},
	
	_updateTitle: function(title) {
		
		$('demoTitle').innerHTML = title;
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(popUppage){
			document.title = title;
		}
	},
	
	_updateDisclaimers: function(disclaimers) {
		var disclaimerContainer = $('demoDisclaimerContainer');
		
		while(disclaimerContainer.childNodes.length > 0) {
			disclaimerContainer.removeChild(disclaimerContainer .firstChild);
		}
		
		for(var i=0; i<disclaimers.length; i++) {
			var disclaimerElement = document.createElement('DIV');
			disclaimerElement.className = 'demoDisclaimer'
			disclaimerElement.innerHTML = disclaimers[i];
			
			disclaimerContainer .appendChild(disclaimerElement);
		}
	},
	
	_updateSoundControl: function(sound) {
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			switch (sound) {
				case 'external':				
					var demoSound = $('demoSound');
					var demoSoundImage = ($NL(demoSound.childNodes)).firstElement();
					demoSound.style.visibility = 'visible';
					
					Event.observe(demoSoundImage, 'click', function() {demoController.toggleSound(this)}.bind(demoSoundImage));
					break;
				 
				case 'internal':
				default:
					$('demoSound').style.visibility = 'hidden';
					break;
			}
		}

	},
	
	toggleSound: function(soundImage){
		
		if(soundImage.src.indexOf('On.gif') > -1) {
			soundImage.src = soundImage.src.replace('On.gif', 'Off.gif');	
		}
		else {
			soundImage.src = soundImage.src.replace('Off.gif', 'On.gif');
		}
		
		// Need to add logic to broker sound request to current movie
	},
	
	_buildFlashDemo: function(demo) {
		// Add default parameters
		demo.params['codebase'] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
		demo.params['id'] = 'flashDemo';
		demo.params['allowScriptAccess'] = 'sameDomain';
		demo.params['quality'] = 'height';
		demo.params['bgcolor'] = '#FFFFFF';
		demo.params['play'] = 'true';
		
		demo.params['loop'] = 'true';
		demo.params['scale'] = 'showall';
		demo.params['devicefont'] = 'false';
		demo.params['menu'] = 'true';
		demo.params['salign'] = '';
		demo.params['wmode'] = 'transparent';
		
		MovieUtils.buildFlashMovie('demoMovie', demo.params, true);	
	},
	
	_buildViewPointDemo: function(demo) {
		
		// Add default parameters
		demo.params['broadcast'] = '/lexus-share/vp/bkey.mtx';
		demo.params['alt'] = 'popUp';
		
		demo.movie = MovieUtils.buildViewPointMovie('demoMovie', demo.params, true);
		this._configureForViewPoint(demo.movie);
	},
	
	_buildMediaPlayerDemo: function(demo) {
		
		MovieUtils.buildMediaPlayerMovie('demoMovie', demo.params, true);
	},

	_getData: function(xml) {
		var meta = new Object();
		var params = new Object();
		var disclaimers = new Array();
		var metaNode = xml.getElementsByTagName('meta')[0];
		var movieNode = xml.getElementsByTagName('movie')[0];
		
		// Get Movie parameters
		var paramElements = movieNode.getElementsByTagName('param');
		for(var i=0; i<paramElements.length; i++) {
			var element = paramElements[i];
			var name = element.getAttribute('name');
			
			params[name] = (element.firstChild) ? element.firstChild.nodeValue : "";
		}
		// Get Movie Meta Data
		var metaElements = metaNode.getElementsByTagName('param');
		for(var i=0; i<metaElements.length; i++) {
			var element = metaElements[i];
			var name = element.getAttribute('name');
			
			meta[name] = (element.firstChild) ? element.firstChild.nodeValue : "";
		}
		
		var disclaimersElements = metaNode.getElementsByTagName('disclaimer');
		
		for(var i=0; i<disclaimersElements.length; i++) {
			var element = disclaimersElements[i];
			var name = element.getAttribute('name');
			
			disclaimers.push(element.firstChild.nodeValue);
		}
		meta['disclaimers'] = disclaimers;
		return {params: params, meta: meta};
	},
	
	/**
	 * Method scrubs the DOM for all demos on the current page.
	 */
	_findAllDemos: function() {
		var groupElements = document.getElementsByClassName('demoGroup', null, 'DIV');
		var onloadDemoId = Address.getParameters()['demo'];
		// Loop through each Demo Group Found
		for(var x=0; x<groupElements.length; x++) {
			var groupElement = groupElements[x];
			var group = new Array();
			var groupId = x;
			var demoElements = document.getElementsByClassName('demoTarget',groupElement, 'DIV');
			
			// Loop through each Demo found within the current Demo Group
			for(var i=0; i<demoElements.length; i++) {
				var demoElement = demoElements[i];
				var demoId = demoElement.getAttribute('id').replace(new RegExp("-[0-9]$", "g"), '');
				var demoName = demoElement.getAttribute('name');
				var demoPath = [DemoController.ROOT_PATH,MODEL_ID,'/',demoId,'.xml'].join(''); 
			
				var demo = new Demo(demoElement,demoId, groupId,demoName,demoPath);			
				this._addEventsToDemo(demo.element, groupId, demo.id);
				
				this._addDemoToGroup(group, demo);
				
				if(demo.id == onloadDemoId) {
					this.onloadDemo = demo;
				}
			}
			this.demoGroups[groupId] = group;
		}
	},
	_addDemoToGroup: function(group, demo) {
		var found = false;
		for(var i=0; i<group.length; i++) {
			if(group[i].id == demo.id) {
				found = true;
				break;
			}
		}
		if(!found) {
			group.push(demo);
		}
	},
	_launchDemoOnload: function() {
		if(this.onloadDemo) {
			this.openDemo(this.onloadDemo.groupId, this.onloadDemo.id);
		}
	},
	/**
	 * Method adds onclick event to the demo element.
	 * @param demo {DEMO} - Object containing all info about the demo.
	 */
	_addEventsToDemo: function(element, groupId, demoId) {
		Event.observe(element, 'click', function() {demoController.openDemo(this.groupId, this.demoId);return false;}.bind({groupId: groupId, demoId:demoId}));
	},
	
	_addEventsToButton: function(element, demoId) {
		Event.observe(element, 'click', function() {demoController.showDemo(this);return false;}.bind(demoId));
	},
	
	_setupScroll: function() {
		var boundry = Dom.getBoundries('demoFooterContent');
		
		// We only show the scroll bar if we need it.
		//code added to allow demos in popup window - by simon chelebyan - team one//
		if(!popUppage){
			if(boundry.height > 150) { 
				$('demoScrollbar').style.display = 'block';
				var scrollObj = new dw_scrollObj('demoFooterContentContainer', 'demoFooterContent', null);
			
				// arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
				// (x/y offsets of dragBar in track)
				scrollObj.setUpScrollbar("demoDragBar", "demoTrack", "v", 0, 0);
			}
			else {
				$('demoScrollbar').style.display = 'none';
			}
		}else{
			if(boundry.height > 100) { 
				$('demoScrollbar').style.display = 'block';
				var scrollObj = new dw_scrollObj('demoFooterContentContainer', 'demoFooterContent', null);
			
				// arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
				// (x/y offsets of dragBar in track)
				scrollObj.setUpScrollbar("demoDragBar", "demoTrack", "v", 0, 0);
			}
			else {
				$('demoScrollbar').style.display = 'none';
			}
		}
    /*
		var scrollObj = new dw_scrollObj('demoFooterContentContainer', 'demoFooterContent', null);
	
		// arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
		// (x/y offsets of dragBar in track)
		scrollObj.setUpScrollbar("demoDragBar", "demoTrack", "v", 0, 0);
	*/
	}
	
});	

var ViewPointMethodsDemo = Class.create();
Object.extend(ViewPointMethodsDemo.prototype, {
	initialize: {},
	change_copy: function(imgsrc) {
		Debug.debug('change_copy');
		// TODO - will add logic to update $('demoDisclaimerDescription')
	},
	
	disclaimer: function() {
		Debug.debug('disclaimer');
		// Nothing yet
	}
});
var demoController;
DemoController.buildDemoController = function() {
	demoController = new DemoController();
}
DemoController.ROOT_PATH = '/lexus-share/demos/';
DemoController.ROOT_IMAGES = '/lexus-share/images/demos/';
//vent.observe(window, 'load',DemoController.buildDemoController);
onPageLoadEvents.addAction(DemoController.buildDemoController);
/***************************************************************
 * Viewpoint Methods that have to be under window.xxxxxx
 ***************************************************************/
var vmp;
function change_copy() {
	
	demoController.processViewPointAction(null,'change_copy');
}
function disclaimer() {
	
	demoController.processViewPointAction(null,'disclaimer');
}


function playNextMovie() {
	Debug.debug('playNextMovie')
	demoController.playNextMovie();
}
function vwpt_callout() {
	demoController.playNextMovie();
	
}
//line 8364

function VidPlayer() {
	// Constructor
	var id;													// id of the video to display
	var curId = null;										// id of the video currently loaded or last played
	var xmlPath = null;										// path of the xml file that holds data about video
	var wrapperId = "vidWrapper";							// id to assign to the wrapper of the VidPlayer
	var containerId = "vidContainer";						// id to assign to the container of the VidPlayer
	var linkKey = "vidLink";								// name of the class that all links to VidPlayer will have
	var rootPath= '/lexus-share/demos/';					// root of the path where vid file data and vid files
	var metaInfo = Object();								// meta information for the movie file
	var params = Object();									// parameters of the movie (ie size, type, etc);
	var ajaxQueue = new Ajax.Queue(Ajax.Queue.FIFO, false);	// ajaxQueue object to keep track of ajax requests
	var backdrop;
	
	// loops through the page and finds all a tags with 'linkKey' then adds an event to them.
	this.findVidLinks = function() {
		//find all 'a' tags with className = linkKey
		var elements = document.getElementsByClassName(linkKey, null, 'a');

		// loop through all found 'a' tags and apply onClick event to launch vidBox to it
		if(elements) {
			for(var x=0, y=elements.length; x < y; x++) {
				var element = elements[x];
		
				element.onclick = function() {
					vidPlay.openVidBox(this.id);
				}
			}
		}
	};
		
	// open video box
	this.openVidBox = function(newId) {		
		
		if(!PAGE_LOAD) {
	 		return;
	 	}

		id = newId;
		if(ajaxQueue === null) {
			ajaxQueue = new Ajax.Queue(Ajax.Queue.FIFO, false);
		}
		
		if(!$(containerId)) {
			this.buildInterface();	// build interface if not already built
		}
				
		if(id != curId) {
			this.getVidInfo();		// if data isn't the current data loaded, load and parse new data
			curId = id;
		} else {
			this.buildPlayer();
		}
		
		// Make sure we are at the top of the page
		scroll(0,0);
		
	};
	
	// close video box	
	this.closeVidBox = function() {
		ajaxQueue = null;			// unset ajaxQueue so no further request go through.
		
		this.closeVidLegalDisclaimer();
		// if wrapper and container are built hide them
		if($(containerId)) {
			$(containerId).style.display = 'none';
			
			$('vidMovie').removeChild($('vidMovie').firstChild);
		}
		this.hideWrapper();
	};
	
	
	// display video box
	this.showVidBox = function() {
		if($(wrapperId) && $(containerId)) {
			this.showWrapper();
			$(containerId).style.display = 'block';
		}
	};
	this.showWrapper = function() {
		if(!this.backdrop) {
			this.backdrop = new Backdrop(wrapperId,'galleryWrap');
			this.backdrop.observe('click', this.closeVidBox.bind(this), false);
		}
		this.backdrop.enable();
		
	};
	this.hideWrapper = function() {
		if(this.backdrop) {
			this.backdrop.disable();
		}
	};
	// builds interface
	this.buildInterface = function() {	

		// if wrapper doesn't exist, build it
		this.showWrapper();
		
		// get inteface
		ajaxQueue.addAction(new Ajax.Updater({success:document.body,failure:null},ajaxUtils.buildAjaxUrl(['/lexus-share/demos/vid_template.html']),{method:'GET', insertion:Insertion.Bottom}));
		ajaxQueue.start();
	};
	 
	// retrieves information about the video
	this.getVidInfo = function() {	
		// bind 'this' to populateVidInfo or else any 'this' methods calleds in populateVidInfo will not run.
		ajaxQueue.addAction(new Ajax.Request(ajaxUtils.buildAjaxUrl([rootPath+MODEL_ID+'/'+id+'.xml']),{method: 'GET', onComplete: this.populateVidInfo.bind(this)}));
		ajaxQueue.start();
	};
	
	// parse xml and place into video box
	this.populateVidInfo = function(xml) {
		this.metaInfo = Object();  // meta information for the movie file
		this.params = Object();	
		xml = xml.responseXML.getElementsByTagName('lexus')[0];
		var metaNode = xml.getElementsByTagName('meta')[0];
		var movieNode = xml.getElementsByTagName('movie')[0];	
				
		// parse all meta nodes
		var metaElements = metaNode.getElementsByTagName('param');
		for(var x=0, y=metaElements.length; x<y; x++) {
			if(metaElements[x].nodeType == 1) {
				this.metaInfo[metaElements[x].getAttribute('name')] = metaElements[x].firstChild.nodeValue;
			}
		}
		// parse all param nodes	
		var paramElements = movieNode.getElementsByTagName('param');	
		for(var i=0, j=paramElements.length; i<j; i++) {
			if(paramElements[i].nodeType == 1) {	
				this.params[paramElements[i].getAttribute('name')] = paramElements[i].firstChild.nodeValue;
			}
		}
		// set width to width param so that div still aligns to the center of the page.
		$(containerId).style.width = (parseInt(this.params.width, 0)+10)+"px";

		// if ie set class to ie so div aligns to the center of the page
		if(document.all) {
			$(containerId).className = "ie";
		}
		
		var disclaimersElements = metaNode.getElementsByTagName('disclaimer');
		var disclaimers = new Array();
		for(var i=0; i<disclaimersElements.length; i++) {
			var element = disclaimersElements[i];
			var name = element.getAttribute('name');
			
			disclaimers.push(element.firstChild.nodeValue);
		}
		this.metaInfo['disclaimers'] = disclaimers;
		
		// update movie info in display box
		$('vidTitle').innerHTML = this.metaInfo.title;
		$('vidDescription').innerHTML = this.metaInfo.description;
		this.buildPlayer();
	};
	
	// build flash version of video player
	this.buildFlashDemo = function() {

		// Add default parameters
		this.params.codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
		this.params.id = 'flashDemo';
		this.params.allowScriptAccess = 'sameDomain';
		this.params.quality = 'height';
		this.params.bgcolor = '#FFFFFF';
		this.params.play = 'true';
		this.params.loop = 'true';
		this.params.scale = 'showall';
		this.params.devicefont = 'false';
		this.params.menu = 'true';
		this.params.salign = '';
		
		MovieUtils.buildFlashMovie('vidMovie', this.params, true);	
	};
	
	// build view point version of demo
	this.buildViewPointDemo = function() {
		// Not Implemented  
	};
	
	// build media player version of demo
	this.buildMediaPlayerDemo = function() {
		MovieUtils.buildMediaPlayerMovie('vidMovie', this.params, true);
	};
	
	// find version to build then build it
	this.buildPlayer = function() {
		switch (this.metaInfo.type) {
			case 'flash':
				this.buildFlashDemo();
				break;
			case 'mediaplayer':
				this.buildMediaPlayerDemo();				
				break;

			default:
				break;
		}
		this._updatePluginLink(this.metaInfo.type);
		this._updateLegalDisclaimerLink();
		this.showVidBox();
	};
	this.openVidLegalDisclaimer = function() {
		this._getVidLegalDisclaimer();
		$('vidMovie').style.visibility = 'hidden';	
	}
	this._getVidLegalDisclaimer = function() {
		var updater = new Ajax.Updater(
							{success:document.body,failure:null},
							ajaxUtils.buildAjaxUrl(['/lexus-share/demos/vid_legal_disclaimers_template.html']),
							{
								onComplete:this._prepareVidLegalDisclaimer.bind(this), 
								method:'GET', 
								insertion:Insertion.Bottom
							})
		ajaxQueue.addAction(updater);
	};
	this.closeVidLegalDisclaimer = function() {
		if($('videoLegalDisclaimerContainer')) {
  			$('videoLegalDisclaimerContainer').parentNode.removeChild($('videoLegalDisclaimerContainer'));
  			$('vidMovie').style.visibility = 'visible';	
  		}
	};
	this._prepareVidLegalDisclaimer = function() {
		// Add current video's disclaimers
		if($('videoLegalDisclaimerContainer')) {
  			var disclaimers = this.metaInfo['disclaimers'];
  			var disclaimerContainer = $('legalDisclaimerHolder');
  			for(var i=0; i<disclaimers.length; i++) {
				var disclaimerElement = document.createElement('DIV');
				disclaimerElement.className = 'demoDisclaimer'
				disclaimerElement.innerHTML = disclaimers[i];
			
				disclaimerContainer.appendChild(disclaimerElement);
			}
  		}
  		// Add back event to back button
  		Event.observe('vidLegalBack', 'click', this.closeVidLegalDisclaimer.bind(this));
	};
	this._updatePluginLink = function(type) {
		$('demoPlugin').href = MovieUtils.getPluginDownloadLink(type);
	};
	this._updateLegalDisclaimerLink = function() {
		$('demoLegalDisclaimer').onclick = this.openVidLegalDisclaimer.bind(this);
		
	};

}

		
var vidPlay = new VidPlayer();

/**
 * FormValidator
 * A class to manage form validation.  Create an instance of this object
 * by passing in the form element, or id of the form element you want to 
 * have validated.
 */
var FormValidator = Class.create();

Object.extend(FormValidator.prototype, {

	/**
	 * Constructor
	 */
	initialize: function(form_element){
		
		var form_element;
		var validators;
		
		this.form_element = $(form_element);
		this.validators = [];
		
		/**
		 * Extend the form element to make it easier to apply
		 * the validation within HTML.
		 */
		Object.extend(this.form_element, {
			validateAndSubmit: function(){
				if(this.validate())
					this.form_element.submit();
			}.bind(this)
		});

		/**
		 * Insert triggers for form handling
		 */
		
		Event.observe(this.form_element, 'submit', this.validate.bindAsEventListener(this), true);
		
	},
	
	/**
	 * This does most of the work.  You will probably not need to call this directly
	 * as this object will (semi)automatically attach itself to the form and intercept
	 * submit calls.
	 */
	validate: function(event){

		var errors = this.validators.inject([], function(errors, v){
			/**
			 * This line looks a bit cryptic.  What I'm doing here is
			 * a calling the validation function (v.func) and passing 
			 * in the value of the element ($F(v.element)) as the first
			 * parameter, and then the supplied options (v.options) after
			 * that.  If the function returns false, I add that validation
			 * object to the list of errors.
			 */
			if(!v.func.apply(this, [$F(v.element)].concat(v.options)))
				errors.push(v);
			
			return errors;
		});
		
		Debug.log('Checking errors: ', errors);
		
		if(errors.length) {
			Debug.log("Validation failed", errors);
			if(event)
				Event.stop(event);
			this.handleErrors(errors);
			return false;
		}
		else {
			Debug.log('Validation successful');
			return true;
		}

	},
	
	/**
	 * This function recieves an array of failed validation tasks
	 * and will process them accordingly.
	 */
	handleErrors: function(errors){
		//What do I do?
	},
	
	/**
	 * This is how you will by applying your validation rules.
	 * @param element		the form element to be validated or its id
	 * @param validation_func	a function that will validate the data.  There are several static 
	 *				validation function at the end of this file, but you can
	 *				also supply your own.
	 * @param message		the error message to be diplayed if the validaion fails
	 * @param options		an array of parameters to be passed to the validation function
	 */
	addValidator: function(element, validation_func, message, options){
		this.validators.push({element: $(element), func: validation_func, err_msg: message, options: options});
	},
	
	/**
	 * This function behaves the same as addValidator except you need to pass it
	 * the name of the field instead of the element object or id
	 */
	addValidatorByName: function(field_name, validation_func, message, options){

		if(document.all)
			search_elements = $NL(this.form_element.all);
		else
			search_elements = $NL(this.form_element.getElementsByTagName("*"));

		search_elements.each(function(e){
			if(e.name == field_name){
				this.addValidator(e, validation_func, message, options);
			}
		}.bind(this));
	}
});


/** 
 * Validate against a regular expression 
 */
FormValidator.validateRegExp = function(value, exp){
	//Debug.log('validateRegExp', value, exp, value.match(typeof exp == 'RegExp' ? exp : new RegExp(exp)), (typeof exp == 'RegExp' ? exp : new RegExp(exp)));
	return value.match(typeof exp == 'RegExp' ? exp : new RegExp(exp));
};

/** 
 * Validate that the value is a number 
 */	
FormValidator.validateNumeric = function(value){
	return value.match(new RegExp('^-?([0-9]+|[0-9]*\.[0-9]+)$'));
};

/** 
 * Validate the length of the value is within a given range. 
 * By supplying only one length, you can validate that the length
 * is exactly that length.
 */

FormValidator.validateLength = function(value, min_len, max_len){
	if(min_len && max_len){
		return (value.length >= min_len && value.length <= max_len);
	}
	else{
		return (value.length == min_len);
	}
};
/**
 * @fileoverview This is it help proxy the different browsers console behaviors.
 * This file SHOULD BE REMOVED BEFORE the site is live
 */
var Debug = {
	log: function(){},
	debug: function(){},
	warn: function(){},
	error: function(){}
}

/*
Debug.log = function (message, objects) {
	if(document.all) {
		if(window.Logger) 
			Logger.log( message)
		
		return;
	}
	else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1)		
		window.console.log("INFO: " + message);
	else if(window.console)
		console.log.apply(window, arguments);	
}
Debug.debug = function (message, objects) {
	if(document.all) {
		if(window.Logger) 
			Logger.debug(message)
		
		return;
	}
	else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1)		
		window.console.log("DEBUG: " + message);
	else if(window.console)
		console.debug.apply(window, arguments);
}
Debug.warn = function (message, objects) {
	if(document.all) {
		if(window.Logger) 
			Logger.warn(message)
		return;
	}
	else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1)		
		window.console.log("WARNING: " + message);
	else if(window.console)
		console.warn.apply(window, arguments)
}
Debug.error = function (message, objects) {
	if(document.all) {
		if(window.Logger) 
			Logger.error(message)
		return;
	}
	else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1)		
		window.console.log("ERROR: " + message);
	else if(window.console)
		console.error.apply(window, arguments);
}
*/
/* Gallery Functions */
function imgPreload(imgName) {
	var imgVar;
	imgVar = new Image();
	imgVar.src = imgName;
	return imgVar;
}

var curIdx = 0;

/* ********************************************************************************
   Photos
   ******************************************************************************** */
// Reset Thumbnails
function photoClearThumbs() {
	for(i=0; i < photos.length; i++) {
		var a = 'thumb' + i;
		document.getElementById(a).src = photos[i].thumb.src;
	}
}

// Thumbnail Over state
function photoTnOvr(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = photos[idx].thumb_ovr.src;
	}
}

// Thumbnail Off State
function photoTnOff(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = photos[idx].thumb.src;
	}
}

// Photo Activator
function viewPhoto(idx) {
	photoClearThumbs();
	var a = 'thumb' + idx;
	document.getElementById(a).src = photos[idx].thumb_on.src;
	document.getElementById('mainPhoto').src = photos[idx].image;
	curIdx = idx;
	self.focus();
}

// Thumbnail Over state
function photoTnOvrPopUp(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = photos[idx].thumb_ovr.src;
		document.getElementById('colorTitle').innerHTML = photos[idx].title;
	}
}

// Thumbnail Off State
function photoTnOffPopUp(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = photos[idx].thumb.src;
		document.getElementById('colorTitle').innerHTML = photos[curIdx].title;
	}
}

function viewPhotoPopUp(idx) {
	photoClearThumbs();
	var a = 'thumb' + idx;
	document.getElementById(a).src = photos[idx].thumb_on.src;
	document.getElementById('mainPhoto').src = photos[idx].image;
	document.getElementById('colorTitle').innerHTML = photos[idx].title;
	curIdx = idx;
	self.focus();
}



// Launch Gallery
function launchGallery() {
	height = 466;
	if (gModelName == "es"){
		height = 520;
	}
	var photoPopupURL = filenamePrefix + 'gallery_' + whereYouAt + '_photos_popup.html?photoNum=' + curIdx;
	popup(photoPopupURL, "zoom", 769, height, "scrollbars=no,menubar=no");
}

/* ********************************************************************************
   Colors
   ******************************************************************************** */
// Reset Thumbnails
function colorClearThumbs() {
	for(i=0; i < colors.length; i++) { 
		var a = 'thumb' + i;
		document.getElementById(a).src = colors[i].thumb.src;
	}
}

// Thumbnail Over state for Color
function colorTnOvr(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = colors[idx].thumb_ovr.src;
		document.getElementById('colorTitle').innerHTML = colors[idx].title;
	}
}

// Thumbnail Off State for Color
function colorTnOff(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = colors[idx].thumb.src;
		document.getElementById('colorTitle').innerHTML = colors[curIdx].title;
	}
}

// Photo Activator
function viewColor(idx) {
	colorClearThumbs();
	var a = 'thumb' + idx;
	document.getElementById(a).src = colors[idx].thumb_on.src;
	document.getElementById('mainPhoto').src = colors[idx].image;
	document.getElementById('colorTitle').innerHTML = colors[idx].title;

	curIdx = idx;
}




// Launch Gallery
function launchColorGallery() {
	var photoPopupURL = filenamePrefix + 'gallery_' + whereYouAt + '_colors_popup.html?photoNum=' + curIdx;
	popup(photoPopupURL, "zoom", 769, 466, "scrollbars=no,menubar=no");
}

/* ********************************************************************************
   360 Spins
   ******************************************************************************** */
var i = 0;
var j = 0;


// Clears all Animation flags, and starts new animation from beginning
// USED
function spinClearAnimation(type, id) {
	id = id || "";
	var destination = 'spinsGalleryViewer' + id;
	
	if(whereYouAt == 'interior') {
		flipDelay = 3000;
	} else {
		flipDelay = 1000;
	}
	
	if(type == "preset") {
		clearTimeout(presetTimeOut);
		curAnim = true;
		if(document.getElementById('instructions')) {
			document.getElementById('instructions').innerHTML = '<img src="/lexus-share/images/spacer.gif" width="469" height="25" alt="" />';
		}
		document.getElementById(destination).innerHTML = '<img src="/lexus-share/images/spacer.gif" id="mainPhoto' + id + '" name="mainPhoto" width="469" height="225" alt="" />';
		j = 0;
	} else {
		curAnim = false;
		
		// Choose Correct Instructional Image
		if(whereYouAt == 'exterior') {
			document.getElementById('instructions').innerHTML = '<img src="/lexus-share/images/gallery/gal_360_ext_instructions.gif" width="469" height="25" alt="" />';
		} else {
			document.getElementById('instructions').innerHTML = '<img src="/lexus-share/images/gallery/gal_360_int_instructions.gif" width="469" height="25" alt="" />';
		}
	}
	spinPlayAnimation(type, id);
}

// Swap image and reload in 3 sec
// USED
var presetTimeOut;
function spinPlayAnimation(type, id) {
	if(type == "preset" && curAnim == true) {
		// if j is at last frame, start from beginning
		if(j == spinPresetFrames.length) {
			j = 0;
		}
		// swap photo and increment
		if(document.getElementById('mainPhoto' + id)) {
			document.getElementById('mainPhoto' + id).src = spinPresetFrames[j].src;
			j++;
			// replay function
			presetTimeOut = setTimeout(function(){spinPlayAnimation('preset', this)}.bind(id), flipDelay);
		}
		else {
			stopSpin();
		}
		
	} else if(type == "interactive") {
	   
	   	if(Plugin.isInstalled('QuickTime') && Plugin.getVersionAsFloat('QuickTime') >= 5) {
		    //** Show QTVR **
			newAnimation = "<OBJECT CLASSID=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" WIDTH=\"469\" HEIGHT=\"225\" CODEBASE=\"http://www.apple.com/qtactivex/qtplugin.cab\">\n";
			newAnimation = newAnimation + "<PARAM name=\"SRC\" VALUE=\"" + spinQTVR + "\">\n";
			newAnimation = newAnimation + "<PARAM name=\"AUTOPLAY\" VALUE=\"true\">\n";
			newAnimation = newAnimation + "<PARAM name=\"CONTROLLER\" VALUE=\"false\">\n";
			newAnimation = newAnimation + "<EMBED SRC=\"" + spinQTVR + "\" WIDTH=\"469\" HEIGHT=\"225\" AUTOPLAY=\"true\" CONTROLLER=\"false\" PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\">\n";
			newAnimation = newAnimation + "</EMBED>\n";
			newAnimation = newAnimation + "</OBJECT>\n";
			
			document.getElementById('spinsGalleryViewer').innerHTML = newAnimation;
			return new Object();
	   	}
	   	else {
	   		MovieUtils.buildNoPlugin('spinsGalleryViewer', 'quicktime');
	   	}
	}
}

var curSpin = '';
// Main Asset Activator
// USED
function playSpin(type, destination) {
	if(type != curSpin) {
		curSpin = type;
		spinClearAnimation(type, destination);
	}
}
function stopSpin() {
	clearTimeout(presetTimeOut);
}
/* ********************************************************************************
   Videos ( New Type w/ possible Broadcast Spots)
   ******************************************************************************** */

/* ********************************************************************************
   Videos
   ******************************************************************************** */
// Reset Thumbnails
function vClearThumbs() {
	for(i=0; i < videos.length; i++) {
		var a = 'thumb' + i;
		document.getElementById(a).src = videos[i].thumb.src;
	}
	// Must loop through radio buttons and set to false due to Safari Bug
	for(i=0; i<document.forms[0].videos.length;i++) {
		document.forms[0].videos[i].checked = false;
	}
}

// Thumbnail Over state
function vTnOvr(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = videos[idx].thumb_ovr.src;
	}
}

// Thumbnail Off State
function vTnOff(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = videos[idx].thumb.src;
	}
}

// Main Asset Activator
function displayVideo(idx,bw) {
	// Reset all Thumbnails
	vClearThumbs();
	
	// Default Size if thumbnail clicked instead of radio button
	if(!bw) {
		speed = 'hi';
		vidWidth = 272;
		vidHeight = 204;
	} else {
		speed = 'lo';
		vidWidth = 160;
		vidHeight = 120;
	}
	var v = 'video' + idx + '_' + speed;

	// Turn Radio Button "On"
	document.getElementById(v).checked = true;
	
	// Turn Thumbnail "On"
	var a = 'thumb' + idx;
	document.getElementById(a).src = videos[idx].thumb_on.src;
	
	// Build Object/Embed Code
	if (pluginType != "none supported") {
		//** Show Movie. **
		videoCode = "<embed src=\"" + eval('videos[' + idx + '].video_' + pluginType + '_' + speed) + "\" width=\"" + vidWidth +"\" height=\"" + vidHeight +"\"\n";

		//** Show Movie.  Determine proper MIMEtype **
		if (pluginType == "wm") {
			videoCode += ' type="application/x-mplayer2" showcontrols="0" showpositioncontrols="0" showaudiocontrols="1" showtracker="1" showdisplay="0" showstatusbar="0" autosize="0" showgotobar="0" showcaptioning="0" autorewind="0" animationatstart="0" transparentatstart="0" allowscan="1" enablecontextmenu="1" clicktoplay="0" invokeurls="1" defaultframe="datawindow" pluginspage="http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;">\n';
		} 
		videoCode += "</EMBED>\n";
		videoCode = '<table width="469" height="225" border="0" cellspacing="0" cellpadding="0"><tr><td align="center">' + videoCode + '</td></tr></table>';
	} else {
		//** Show Error Message - No Proper Plugins Detected **
		videoCode = "**PLACEHOLDER**<BR>No proper plugin detected.  Download a new one.";
	}
	
	// If image is same, then do not reload main asset
	document.getElementById('vGalleryViewer').innerHTML = videoCode;

	// Set Current Index
	curIdx = idx;
}

/* ********************************************************************************
   Wallpapers
   ******************************************************************************** */
var size = 1024;

// Reset Thumbnails
function wpClearThumbs() {
	for(i=0; i < wallpapers.length; i++) {
		var a = 'thumb' + i;
		document.getElementById(a).src = wallpapers[i].thumb.src;
	}
	// Must loop through radio buttons and set to false due to Safari Bug
	for(i=0; i<document.forms[0].wallpaper.length;i++) {
		document.forms[0].wallpaper[i].checked = false;
	}
}

// Thumbnail Over state
function wpTnOvr(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = wallpapers[idx].thumb_ovr.src;
	}
}

// Thumbnail Off State
function wpTnOff(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = wallpapers[idx].thumb.src;
	}
}

// Main Asset Activator
function viewWP(idx,reso) {
	// Reset all Thumbnails
	wpClearThumbs();
	
	// Default Size if thumbnail clicked instead of radio button
	if(!reso) {
		size = 1024;
	} else {
		size = reso;
	}
	var wp = 'wallpaper' + idx + '_' + size;
	
	// Set Radio Button Value
	document.getElementById(wp).checked = true;
	
	// Turn Thumbnail "On"
	var a = 'thumb' + idx;
	document.getElementById(a).src = wallpapers[idx].thumb_on.src;
	
	// If image is same, then do not reload main asset
	if(idx != curIdx) {
		document.getElementById('mainPhoto').src = wallpapers[idx].image.src;
	}

	// Set Current Index
	curIdx = idx;
}

function wpDownload() {
	// alert(curIdx + '_' + size);
	var pagePrefix = ""
	
	if (gModelName == "is_5speed") {
		pagePrefix = "5speed_";
	} else if (gModelName == "is_eshift") {
		pagePrefix = "eshift_";
	} else if (gModelName == "is_sportcross") {
		pagePrefix = "sportcross_";
	}
	popupPrimary(filenamePrefix + "gallery_wallpapers_popup.html?idx=" + curIdx + "&size=" + size, "wallpaper");
}		

/* ********************************************************************************
   Screen Savers
   ******************************************************************************** */
var i = 0;
var j = 0;

// Clears all Animation flags, and starts new animation from beginning
function ssClearAnimation(idx) {
	for(i=0; i<ss.length; i++) {
		ss[i].curAnim = false;
	}
	j = 0;
	ss[idx].curAnim = true;
	ssPlayAnimation(idx);
}

// Swap image and reload in 3 sec
function ssPlayAnimation(idx) {
	if(ss[idx].curAnim == true) {
		// if j is at last frame, start from beginning
		if(j == ss[idx].frame.length) {
			j = 0;
		}
		// swap photo and increment
		document.getElementById('mainPhoto').src = ss[idx].frame[j].src;
		j++;
		// alert(idx);
		// replay function
		setTimeout('ssPlayAnimation(' + idx + ');', 2000);
	}
}

// Reset Thumbnails
function ssClearThumbs() {
	// Loop through all objects in ss array
	for(i=0; i < ss.length; i++) {
		var a = 'thumb' + i;
		document.getElementById(a).src = ss[i].thumb.src;
	}
}

// Thumbnail Over state
function ssTnOvr(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = ss[idx].thumb_ovr.src;
	}
}

// Thumbnail Off State
function ssTnOff(idx) {
	var a = 'thumb' + idx;
	if(idx != curIdx) {
		document.getElementById(a).src = ss[idx].thumb.src;
	}
}

// Photo Activator
function viewSS(idx) {
	ssClearThumbs();

	var a = 'thumb' + idx;
	document.getElementById(a).src = ss[idx].thumb_on.src;
	if(document.getElementById('ssFileName'))
	{
			document.getElementById('ssFileName').innerHTML = ss[idx].ssFileName;

	}
	// Play Animation
	ssClearAnimation(idx);
	
	// Set Index to Activated Index
	curIdx = idx;
}

// Download Screensaver
function ssDownload() {
	s_linkType='o';
	s_linkName= ss[curIdx].ssFileName;
	s_prop14=ss[curIdx].ssFileName;
	s_lnk=s_co(this);
	s_gs('');
	window.location.href=ss[curIdx].download;
}

/**
 * 
 * Functions from loadFlash.js used by ES/360 pages.
 */
function writeFlashObject(url,w,h,wmode){

	document.write(buildFlashObject(url,w,h,wmode));
}
function buildFlashObject(url, w,h,wmode) {
var theSWF = "";
if (wmode == 'no'){
	wmodeObject ='';
	wmodeEmbed = '';
}else{
	wmodeObject ='<param name="wmode" value="transparent">';
	wmodeEmbed = ' wmode="transparent"';
}
	if (FlashEnabled){
			theSWF = 	'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'">'+
								'	<param name="movie" value="'+url+'">'+
								'	<param name="mode" value="transparent">'+
								'	<param name="quality" value="high">'+ wmodeObject +
								'	<embed'+ wmodeEmbed +' src="'+url+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed>'+
								'</object>';
	}
	return theSWF;	
	
}

// New Legacy functions to 360s that still use old assets

function registerWithParent(id) {
	parent.galleryManager.doTabAction(this,'registerWithParent',[window.self,id]);
}
/******************************************************************
 * Browser/OS Sniffer
 *****************************************************************/

// Read in HTTP_USER_AGENT from browser
var agt = navigator.userAgent.toLowerCase();

// Assign OS Variables
var is_mac = (agt.indexOf("mac") != -1);
var is_win = (agt.indexOf("win") != -1);
var is_ie = (navigator.userAgent.toUpperCase().indexOf("MSIE") > -1)? true:false
var is_ff = (navigator.userAgent.toUpperCase().indexOf("FIREFOX") > -1)? true:false

// Sniff for the two major browsers
var ie  = (document.all)? true:false
var ns6 = ((document.getElementById)&&(!ie))? true:false

// Sniff for Mac, used for IE Mac browsers
var mac = (navigator.userAgent.toUpperCase().indexOf("MAC") > -1)? true:false

// Sniff for AOL, used in certain cases where AOL won't pop open a window the size we want it
var aol = (navigator.userAgent.toUpperCase().indexOf("AOL") > -1)? true:false

/******************************************************************
 * Functions from old menu_dhtml.js
 *****************************************************************/
// Used to test if a value is 'undefined'.  What 'undefined' represents is different for each
// browser, but any variable that has not been defined a value IS 'undefined' in all browsers.
// So, we'll test against this variable to see if another is 'undefined'.
var undef;
var bgXcoord = 0;
var HideText = "";

var PreloadComplete = false;
var HomePreloadComplete = false;

// var is declared in universal nav offsite code, used to define full path.
// we don't want to hose the value, so we'll check if it has one.
if (!T1navPath) {
	var T1navPath = "";
}

var topNavBYLCode = new Array();
topNavBYLCode["ls"] = "9100";	// LS 430

topNavBYLCode["gs_gateway"] = "93";	// GS Generic
topNavBYLCode["gs"] = "9399";	// GS Generic
topNavBYLCode["gs_hybrid"] = "9344";	// GS Generic


topNavBYLCode["es"] = "9000";	// ES 300
topNavBYLCode["is"] = "95";	// IS 300 Generic
topNavBYLCode["sc"] = "9270";	// SC 430
topNavBYLCode["lx"] = "9620";	// LX 470
topNavBYLCode["gx"] = "9700";	// GX 470
topNavBYLCode["rx_gateway"] = "94";	// RX Generic
topNavBYLCode["rx"] = "9499";	// RX 330 FWD/AWD
topNavBYLCode["rx_hybrid"] = "9444";	// RX Hybrid 400

// Layer Build functions.  The IF verifies that, if a layer doesn't exist
// the function will return null instead of a JavaScript error.
function refLayer(layerName) {
	var LAYref;
	if (ie) {
		if (document.all[layerName]) {
			LAYref = document.all[layerName];
			HideText = "hidden";
		} else {
			LAYref = null;
		}
	} else {
	    // default to NS6+
		if (document.getElementById(layerName)) {
			LAYref = document.getElementById(layerName);
			HideText = "hidden";
		} else {
			LAYref = null;
		}
	}
	return LAYref;
}

function gotoBYL() {
	if (topNavBYLCode[gModelName]) {
		top.location.href=T1navPath+"/lexusConfigApp/index.jsp?modelName="+gLegacyAbbrev+"&modelCode="+topNavBYLCode[gModelName];
	} else {
		top.location.href=T1navPath+"/lexusConfigApp/index.jsp";
	}
}

function gotoVC() {
	if (gVCmodel == "rx_gateway") {
		top.location.href=T1navPath+"/models/comparison/rx.html";
	}else if (gVCmodel == "gs_gateway") {
		top.location.href=T1navPath+"/models/comparison/gs.html";
	} else if ((gVCmodel != "") && (gVCmodel != "hybrid")) {
		top.location.href=T1navPath+"/models/comparison/"+gVCmodel+".html";
	} else {
		top.location.href=T1navPath+"/models/comparison/index.html";
	}
}

function gotoContactDealer() {
	top.location.href=T1navPath+"/lexus/jsp/pub/dealers/contact/dealer_contact.jsp";
}

// Detect Current Model section and prepopulate hidden values in Brochure page
function gotoBrochures() {
	var BaseURL=T1navPath+"/lexus/jsp/pub/models/brochures/index.jsp";

	if (gModelName != "") {
		top.location.href=BaseURL+"?modelName="+gModelName;
	} else {
		top.location.href=BaseURL;
	}
}

// Backup function just in case it's being called from an unknown script/page
function gotoBrochurePDA() {
	gotoBrochures();
}

function gotoOrderBrochure(WeShouldReturnTheURL) {
//	document.location.href = T1navPath+"/lexus/SendDocumentRequest?documentType=B"+ordBrochureURL;
	var BaseURL = "https://secure.lexus.com/lexus/jsp/pub-ssl/models/orderbrochure/orderbrochure.jsp";
	var FullURL = "";

	if (gModelName != "") {
		if(gModelName == "rx_hybrid") {
			FullURL=BaseURL+"?modelName=RX Hy&modelCode="+topNavBYLCode[gModelName];
		}else if(gModelName == "gs_hybrid") {
			FullURL=BaseURL+"?modelName=GS Hy&modelCode="+topNavBYLCode[gModelName];
		} else {
			FullURL=BaseURL+"?modelName="+gLegacyAbbrev+"&modelCode="+topNavBYLCode[gModelName];
		}
	} else {
		FullURL=BaseURL+"?modelName=none&modelCode=none";
	}

	if (WeShouldReturnTheURL) {
		return FullURL;
	} else {
		top.location.href=FullURL;
	}
}

/*
curISmodel = "";
function gotoISModel(isModelName) {
    //** Only used within IS model directory, to switch between models. **
	if (gPageName != "") {
		seIdx = gPageName.lastIndexOf("_se");
		if ((seIdx != -1) && (seIdx == gPageName.length-3) && (isModelName == "sportcross")) {
		  // We're on a Special Edition page, but we're jumping to a Sportcross page.
		  // Go to the normal page.
			top.location.href=T1navPath+isModelName+"_"+gPageName.substring(0,seIdx)+".html";
		} else {
			top.location.href=T1navPath+isModelName+"_"+gPageName+".html";
		}
	} else {
		top.location.href=T1navPath+isModelName+".html";
	}
}
*/
function lexusMagazine() {
	magPath = 'http://www.lexus.com/magazine/webEntry.html';
	popup(magPath, 'lexusMagazine', 700, 450, 'menubar=no, scrollbars=no');
	top.location.href=T1navPath+"/owner/";
}

function setGlobals(modelName, pageName) {
// These two vars are effectively the same, but they are used differently.
// For readability purposes, please keep both of them.
	gVCmodel =  modelName
	gModelName = modelName;
	gPageName = pageName;
	gLegacyAbbrev = modelName.toUpperCase();
	gBrochurePDAAbbrev = modelName;
}
/******************************************************************
 * END Functions from old menu_dhtml.js
 *****************************************************************/

//********************************
//** Query String Parsing START **
//********************************

	// This loads all variables in a querystring into an associative array named qsVars
	// I.e., qsVars[variable_name] == variable_value when querystring is ?variable_name=variable_value&...
	var qsVars = new Array();

	var queryString = location.search;

	if (queryString != "") {
 		// -- get rid of ? at start --
  		var qsdata = queryString.slice(1,queryString.length);
		var qsvalues = qsdata.split("&");
		for (i=0; i < qsvalues.length; i++) {
			var qsvaluepair = qsvalues[i].split("=");
			//alert(qsvaluepair[0]);
			//alert(qsvaluepair[1]);
			qsVars[qsvaluepair[0]] = qsvaluepair[1];
		}
	}

//********************************
//** Query String Parsing END **
//********************************

//****************************
//** Flash Sniffing START ****
//****************************

// Check for Flash, set vars if T/F
var Flash4 = false;
var Flash5 = false;
var Flash6 = false;
var FlashEnabled = false;
// Default is False, so we only need to set it as True.
if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] ) {
	// Check for Flash in Netscape
	var nsFlash = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
	if (nsFlash) {
		var FlashVer = parseInt(nsFlash.description.substring(nsFlash.description.indexOf(".")-1));
		if (FlashVer >= 6) {
			Flash6 = true;
		} else if (FlashVer == 5) {
			Flash5 = true;
		} else if (FlashVer == 4) {
			Flash4 = true;
		}
	}
} else if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	var f4Inst;
	var f5Inst;
	var f6Inst;

	eval('try { f4Inst = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.4"); f5Inst = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.5"); f6Inst = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"); } catch (e) { }');

	if (f6Inst != null) {
		Flash6 = true;
	} else if (f5Inst != null) {
		Flash5 = true;
	} else if (f4Inst != null) {
		Flash4 = true;
	}

	f4Inst = null;
	f5Inst = null;
	f6Inst = null;
}

if (qsVars['flash'] == 'disabled') {
	Flash4 = false;
	Flash5 = false;
	Flash6 = false;
	alert('Flash has been disabled for testing purposes.');
	// FlashEnabled default is false
} else if (Flash5 || Flash6) {
	FlashEnabled = true;
}


//**************************
//** Flash Sniffing END ****
//**************************

//**************************
//** Misc Functions START **
//**************************

function newCursor(imgName, curName) {
if (PreloadComplete) {
	document.images[imgName].style.cursor = curName;
}
}

//****************************************************
//** Popup function Fixes IE making popup windows   **
//** 20px higher than specified when menubar is on  **
//** Parameters can be passed in as necessary 	    **
//** returns a reference to the	window if needed    **
//****************************************************

function popup(popupurl,winName,w,h,params) {
   // Build parameter list manually.  This lets us override individual defaults as needed.

	var paramList = "";
	if (params == undef) {
		params = "";
	}
	
	params = params.toLowerCase();
	
	// Centering the Popup
	if (params.indexOf("centered=yes") != -1)
		{
			t = Math.round((screen.height - h) / 2);
			l = Math.round((screen.width - w) / 2);
		}
	else
		{
			t = 35;
			l = 130;
		}

	if (params.indexOf("menubar=no") != -1) {
		paramList = paramList + ",menubar=no";
	} else {
	    // default
		paramList = paramList + ",menubar=yes";
	    // IE adds to the height with a menubar; subtract to keep height the same.
		if (ie && !mac) {
			h = h - 20;
		}
	}
	
	if(aol) // aol anti-spyware tools deduct from our viewable area
		{
		h = h + 45;
		}
	

	// For Mozilla Popups that don't need extra sapce
	if ((params.indexOf("scrollbars=no") != -1) || (params.indexOf("scrollbar=no") != -1)) {
		paramList = paramList + ",scrollbars=no";
	} else if (params.indexOf("mozscroll=auto") != -1 && !is_ie) {
		w = w;
	} else {
	    // default
		paramList = paramList + ",scrollbars=yes";
	    // IE needs extra space to allow for the phantom scrollbar, or we'll get horizontal scrollbars too.
	    // IE 6.x needs 4px more than IE 5.x, but IE 5.x's width needs vary a lot.  So, we'll set all
	    // IE browsers to use the wider IE 6.x size.
		if (ie && !aol)
		{
			w = w + 17;
		}
		else if(is_ff)
		{
			w = w + 19;
		}
		else
		{
			if(aol)
				w = w + 21;
			else
				w = w + 16;
		}
	}
	
	if (params.indexOf("resizable=yes") != -1) {
		paramList = paramList + ",resizable=yes";
	} else {
	    // default
		paramList = paramList + ",resizable=no";
	}
	
	if ((params.indexOf("toolbar=yes") != -1) || (params.indexOf("toolbars=yes") != -1)) {
		paramList = paramList + ",toolbar=yes";
	} else {
	    // default
		paramList = paramList + ",toolbar=no";
	}
	
	if ((params.indexOf("location=yes") != -1) || (params.indexOf("location=yes") != -1)) {
		paramList = paramList + ",location=yes";
	} else {
	    // default
		paramList = paramList + ",location=no";
	}
	
	if ((params.indexOf("status=yes") != -1)) {
		paramList = paramList + ",status=yes";
	} else {
	    // default
		paramList = paramList + ",status=no";
	}
	
	if ((params.indexOf("top=") != -1) || (params.indexOf("left=") != -1)) {
		paramArray = params.split(",");
		for (i=0; i<paramArray.length; i++) {
			if (paramArray[i].indexOf("top=") != -1) {
				pEles = paramArray[i].split("=");
				t = pEles[1];
			}
			if (paramArray[i].indexOf("left=") != -1) {
				pEles = paramArray[i].split("=");
				l = pEles[1];
			}
		}
	}
	// Override window name
	if (winName == "grad") {
	winName = "gradprogram";
	} else if (winName == "gradprog") {
	winName = "gradprogram";
	}
	
	//alert(paramList);
	return window.open(popupurl,winName,"top=" + t + ",left=" + l + ",width=" + w + ",height=" + h + paramList);
}

// Primary Popup 525x470
function popupPrimary(url,popupName,params) {
	// If Parameters are Empty
	var paramList = "";
	if (params == undef) {
		params = "";
	}

	popup(url,popupName,525,470,params);
}

// Secondary Popup 525x230
function popupSecondary(url,popupName,params) {
	// If Parameters are Empty
	var paramList = "";
	if (params == undef) {
		params = "";
	}

	popup(url,popupName,525,230,params);
}

//************************
//** Misc Functions END **
//************************

//************************
//	Standards Compliant Rollover Script
//	Author : Daniel Nolan
//	http://www.bleedingego.co.uk/webdev.php
//************************
function initRollovers() {
	if (!document.getElementById) return
	
	var aPreLoad = new Array();
	var sTempSrc;
	var aImages = document.getElementsByTagName('img');

	for (var i = 0; i < aImages.length; i++) {		
		if (aImages[i].className == 'imgover') {
			var src = aImages[i].getAttribute('src');
			var ftype = src.substring(src.lastIndexOf('.'), src.length);
			var hsrc = src.replace(ftype, '_ovr'+ftype);

			aImages[i].setAttribute('hsrc', hsrc);
			
			aPreLoad[i] = new Image();
			aPreLoad[i].src = hsrc;
			
			aImages[i].onmouseover = function() {
				sTempSrc = this.getAttribute('src');
				this.setAttribute('src', this.getAttribute('hsrc'));
			}	
			
			aImages[i].onmouseout = function() {
				if (!sTempSrc) sTempSrc = this.getAttribute('src').replace('_ovr'+ftype, ftype);
				this.setAttribute('src', sTempSrc);
			}

			// Added to relieve bug in Mozilla, when layer dissapears and mouse never goes "out", is stuck in hover state
			aImages[i].onclick = function() {
				if (!sTempSrc) sTempSrc = this.getAttribute('src').replace('_ovr'+ftype, ftype);
				this.setAttribute('src', sTempSrc);
			}
		}
	}
	LAYarrowHL = refLayer("arrowHL");
	PreloadComplete = true;
}

//*****************************************
//** Nav Rollover Arrows Functions START **
//** Needed for Events tertiary nav      **
//*****************************************
/*
	plArrowHL = new Image();
	plArrowHL.src = "/assets/common/arrow_highlight.gif";
	plArrowGR = new Image();
	plArrowGR.src = "/assets/common/arrow_gray.gif";

	function arrowHL(imgName) {
		if (document.images[imgName]) {
			document.images[imgName].src = plArrowHL.src;
		}
	}

	function arrowGR(imgName) {
		if (document.images[imgName]) {
			document.images[imgName].src = plArrowGR.src;
		}
	}
*/
// Parent Child Window Hook
function oFocus() {
	self.focus();
}

//***************************************
//** Nav Rollover Arrows Functions END **
//***************************************

// must run to declare default values
setGlobals('','')
function FlashDetectBase(options){
	var self = this;
	var _release = "1.0";
	var options = options || {};
	self.installed = false;
	self.major = -1;
	self.minor = -1;
	self.revision = -1;
	self.revisionStr = "";
	self.activeXVersion = "";
	var activeXDetectRules = options.activeXDetectRules || [
		{
			"name":"ShockwaveFlash.ShockwaveFlash.7",
			"version":function(obj){return getActiveXVersion(obj);}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash.6",
			"version":function(obj){
//				var version = "6,-1,-1,-1";
				var version = "6,0,21";
				try{
					obj.AllowScriptAccess = "always";
					version = getActiveXVersion(obj);
				}catch(err){}
				return version;
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash",
			"version":function(obj){return getActiveXVersion(obj);}
		}
	];
	var getActiveXVersion = function(activeXObj){
		var version = -1;
		try{
			version = activeXObj.GetVariable("$version");
		}catch(err){}
		return version;
	}
	var getActiveXObject = function(name){
		var obj = -1;
		try{
			obj = new ActiveXObject(name);
		}catch(err){}
		return obj;
	}
	var parseActiveXVersion = function(str){
		var versionArray = str.split(",");
		return {
			"major":parseInt(versionArray[0].split(" ")[1]),
			"minor":parseInt(versionArray[1]),
			"revision":parseInt(versionArray[2]),
			"revisionStr":versionArray[2]
		};
	}
	var parseRevisionStrToInt = function(str){
		return parseInt(str.replace(/[a-zA-Z]/g,"")) || self.revision;
	}
	self.majorAtLeast = function(version){
		return self.major >= version;
	}
	self.DetectBase = function(){
		if(navigator.plugins && navigator.plugins.length>0){
			var type = 'application/x-shockwave-flash';
			var mimeTypes = navigator.mimeTypes;
			if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
				var desc = mimeTypes[type].enabledPlugin.description;
				var descParts = desc.split(' ');
				var majorMinor = descParts[2].split('.');
				self.major = parseInt(majorMinor[0]);
				self.minor = parseInt(majorMinor[1]); 
				self.revisionStr = descParts[3];
				self.revision = parseRevisionStrToInt(self.revisionStr);
				self.installed = true;
			}
		}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
			var version = -1;
			for(var i=0; i<activeXDetectRules.length && version==-1; i++){
				var obj = getActiveXObject(activeXDetectRules[i].name);
				if(typeof obj == "object"){
					self.installed = true;
					version = activeXDetectRules[i].version(obj);
					if(version!=-1){
						var versionObj = parseActiveXVersion(version);
						self.major = versionObj.major;
						self.minor = versionObj.minor; 
						self.revision = versionObj.revision;
						self.revisionStr = versionObj.revisionStr;
						self.activeXVersion = version;
					}
				}
			}
		}
	}();
}
var FlashDetect = new FlashDetectBase();

function writeFlashObject(url,w,h,wmode){
	document.write(buildFlashObject(url,w,h,wmode));
}
function buildFlashObject(url, w,h,wmode) {
if (wmode == 'no'){
	wmodeObject ='';
	wmodeEmbed = '';
}else{
	wmodeObject ='<param name="wmode" value="transparent">';
	wmodeEmbed = ' wmode="transparent"';
}
	if(!FlashDetect.installed){
		theSWF = '<div style="padding-top:20px;width:360px;color:#547A66;font-family:verdana;font-size:11px;">To send Eco-Living tips to a friend, download the latest<br /><a href="http://www.macromedia.com/shockwave/download/download.cgi" target="_blank" style="text-decoration:underline;color:#547A66;font-family:verdana;font-size:11px;">Flash Player</a></div>';  	
	}else{
		theSWF = 	'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'">'+
								'	<param name="movie" value="'+url+'">'+
								'	<param name="mode" value="transparent">'+
								'	<param name="quality" value="high">'+ wmodeObject +
								'	<embed'+ wmodeEmbed +' src="'+url+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed>'+
								'</object>';
	}

	return theSWF;	
}
function popup_large_view(viewType){
	if (viewType == 'interior'){
		popup('/assets/models/gallery/360/es/lg_interior.html','popupZoom',770,640,'scrollbars=no,menubar=no,toolbar=no,location=no,status=no');
	}else{
		popup('/assets/models/gallery/360/es/lg_exterior.html','popupZoom',770,640,'scrollbars=no,menubar=no,toolbar=no,location=no,status=no');
	}
}
/*
 * FlashObject embed
 * http://blog.deconcept.com/2004/10/14/web-standards-compliant-javascript-flash-detect-and-embed/
 *
 * by Geoff Stearns (geoff@deconcept.com, http://www.deconcept.com/)
 *
 * v1.0.7 - 11-17-2004
 *
 * Create and write a flash movie to the page, includes detection
 *
 * Usage:
 *
 *	myFlash = new FlashObject("path/to/swf.swf", "swfid", "width", "height", flashversion, "backgroundcolor");
 *	myFlash.altTxt = "Upgrade your Flash Player!";                // optional
 *	myFlash.addParam("wmode", "transparent");                     // optional
 *	myFlash.addVariable("varname1", "varvalue");                  // optional
 *	myFlash.addVariable("varname2", getQueryParamValue("myvar")); // optional
 *	myFlash.write();
 *
 */

FlashObject = function(swf, id, w, h, ver, c) {
	this.swf = swf;
	this.id = id;
	this.width = w;
	this.height = h;
	this.version = ver || 6; // default to 6
	this.align = "middle"; // default to middle
	this.redirect = "";
	this.sq = document.location.search.split("?")[1] || "";
	this.altTxt = "Please <a href='http://www.macromedia.com/go/getflashplayer'>upgrade your Flash Player</a>.";
	this.bypassTxt = "<p>Already have Flash Player? <a href='?detectflash=false&"+ this.sq +"'>Click here if you have Flash Player "+ this.version +" installed</a>.</p>";
	this.params = new Object();
	this.variables = new Object();
	if (c) this.color = this.addParam('bgcolor', c);
	this.addParam('quality', 'high'); // default to high
	this.doDetect = getQueryParamValue('detectflash');
}

FlashObject.prototype.addParam = function(name, value) {
	this.params[name] = value;
}

FlashObject.prototype.getParams = function() {
    return this.params;
}

FlashObject.prototype.getParam = function(name) {
    return this.params[name];
}

FlashObject.prototype.addVariable = function(name, value) {
	this.variables[name] = value;
}

FlashObject.prototype.getVariable = function(name) {
    return this.variables[name];
}

FlashObject.prototype.getVariables = function() {
    return this.variables;
}

FlashObject.prototype.getParamTags = function() {
    var paramTags = "";
    for (var param in this.getParams()) {
        paramTags += '<param name="' + param + '" value="' + this.getParam(param) + '" />';
    }
    if (paramTags == "") {
        paramTags = null;
    }
    return paramTags;
}

FlashObject.prototype.getHTML = function() {
    var flashHTML = "";
    if (window.ActiveXObject && navigator.userAgent.indexOf('Mac') == -1) { // PC IE
        flashHTML += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.width + '" height="' + this.height + '" id="' + this.id + '" align="' + this.align + '">';
        flashHTML += '<param name="movie" value="' + this.swf + '" />';
        if (this.getParamTags() != null) {
            flashHTML += this.getParamTags();
        }
        if (this.getVariablePairs() != null) {
            flashHTML += '<param name="flashVars" value="' + this.getVariablePairs() + '" />';
        }
        flashHTML += '</object>';
    }
    else { // Everyone else
        flashHTML += '<embed type="application/x-shockwave-flash" src="' + this.swf + '" width="' + this.width + '" height="' + this.height + '" id="' + this.id + '" align="' + this.align + '"';
        for (var param in this.getParams()) {
            flashHTML += ' ' + param + '="' + this.getParam(param) + '"';
        }
        if (this.getVariablePairs() != null) {
            flashHTML += ' flashVars="' + this.getVariablePairs() + '"';
        }
        flashHTML += '></embed>';
    }
    return flashHTML;	
}


FlashObject.prototype.getVariablePairs = function() {
    var variablePairs = new Array();
    for (var name in this.getVariables()) {
        variablePairs.push(name + "=" + escape(this.getVariable(name)));
    }
    if (variablePairs.length > 0) {
        return variablePairs.join("&");
    }
    else {
        return null;
    }
}

FlashObject.prototype.write = function(elementId) {
	if(detectFlash(this.version) || this.doDetect=='false') {
		if (elementId) {
			document.getElementById(elementId).innerHTML = this.getHTML();
		} else {
			document.write(this.getHTML());
		}
	} else {
		if (this.redirect != "") {
			document.location.replace(this.redirect);
		} else {
			if (elementId) {
				document.getElementById(elementId).innerHTML = this.altTxt +""+ this.bypassTxt;
			} else {
				document.write(this.altTxt +""+ this.bypassTxt);
			}
		}
	}		
}

FlashObject.prototype.returnHTML = function(elementId) {
	if(detectFlash(this.version) || this.doDetect=='false') {
		if (elementId) {
			document.getElementById(elementId).innerHTML = this.getHTML();
		} else {
			return (this.getHTML());
		}
	} else {
		if (this.redirect != "") {
			document.location.replace(this.redirect);
		} else {
			if (elementId) {
				document.getElementById(elementId).innerHTML = this.altTxt +""+ this.bypassTxt;
			} else {
				return (this.altTxt +""+ this.bypassTxt);
			}
		}
	}		
}

function getFlashVersion() {
	var flashversion = 0;
	if (navigator.plugins && navigator.plugins.length) {
		var x = navigator.plugins["Shockwave Flash"];
		if(x){
			if (x.description) {
				var y = x.description;
	   			flashversion = y.charAt(y.indexOf('.')-1);
			}
		}
	} else {
		result = false;
	    for(var i = 15; i >= 3 && result != true; i--){
   			execScript('on error resume next: result = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.'+i+'"))','VBScript');
   			flashversion = i;
   		}
	}
	return flashversion;
}

function detectFlash(ver) {	
	if (getFlashVersion() >= ver) {
		return true;
	} else {
		return false;
	}
}

// get value of querystring param
function getQueryParamValue(param) {
	var q = document.location.search;
	var detectIndex = q.indexOf(param);
	var endIndex = (q.indexOf("&", detectIndex) != -1) ? q.indexOf("&", detectIndex) : q.length;
	if(q.length > 1 && detectIndex != -1) {
		return q.substring(q.indexOf("=", detectIndex)+1, endIndex);
	} else {
		return "";
	}
}

/* add Array.push if needed */
if(Array.prototype.push == null){
	Array.prototype.push = function(item){
		this[this.length] = item;
		return this.length;
	}
}
var vmp;
var VET_IfVer="05.00.01.04",
VET_ch,
VET_Ap=navigator.appName,
VET_Bv=parseInt(navigator.appVersion.substring(0,1)),
VET_Ag=navigator.userAgent.toLowerCase(),
VET_IE=VET_Ag.indexOf("msie")!=-1&&(VET_Bv>=4)&&VET_Ag.indexOf("opera")==-1,
VET_IE5=(VET_IE&&(VET_Ag.charAt(VET_Ag.indexOf('msie')+5)=='5')),
VET_Firefox=VET_Ag.indexOf('firefox')!=-1,
VET_Safari=((VET_Ag.indexOf("safari/")!=-1) && (parseInt(VET_Ag.substring(VET_Ag.indexOf("safari/")+7,VET_Ag.length)) >= 100)),
VET_NN=VET_Ap.indexOf("Netscape")!=-1,
VET_NN4=VET_NN&&VET_Bv==4,
VET_Gecko=VET_Ag.indexOf('gecko')!=-1,
VET_CS=VET_Ag.indexOf('cs 2000 7')!=-1,
VET_AOL=VET_Ag.indexOf('aol')!=-1,
VET_NN6=VET_NN&&(parseInt(navigator.vendorSub)==6),
VET_NN7=VET_NN&&(parseInt(navigator.vendorSub)==7)&&!VET_CS,
VET_AppVer=parseFloat(navigator.appVersion),
VET_Win=navigator.platform=="Win32",
VET_Mac=VET_Ag.indexOf('mac')!=-1,
VET_Java=navigator.javaEnabled(),
VET_Mim="application/x-mtx",
VET_Cv=VET_Hff=VET_Mc=VET_Dbg=VET_Sdr=0,
VET_NNtrgr="0",VET_Pu,
VET_AxPriID="03F998B2-0E00-11D3-A498-00104B6EB52E",
VET_AxPriNa="AxMetaStream.MetaStreamCtl",
VET_AxSecID="1B00725B-C455-4DE6-BFB6-AD540AD427CD",
VET_AxSecNa="AxMetaStream.MetaStreamCtlSecondary",
VET_AltPlugin=0,
VET_AxID=VET_AxPriID,
VET_Gnns=VET_Gac=VET_Gurl=VET_Gnam=VET_Gprp="",
VET_Dv="http://www.viewpoint.com/installer/",
VET_Re=VET_Dv+'index.html?',VET_Ln="none",VET_Tr="Trigger",VET_Rtyp=1,
VET_Ic="ISceneComponent",VET_Cf="ComponentFileName",
VET_Sc="SceneComponent.mtc",VET_Bk="BroadcastKeyFileURL",
VET_Premium=false,
VET_TopURL=""
if(!window.VET_WindowID)VET_WindowID=(new Date()).getTime()+"_"+Math.floor(Math.random()*10000)
	//These legacy is* definitions are for backwards compatibility only. Remove if you want.
	isIE=isIE4=VET_IE||VET_Gecko
	isNN=VET_NN4
	isNN6=VET_NN6
	isMac=VET_Mac
	isWin=VET_Win
function VET_Mili(){var v=new Date();return v.getTime()}
function VET_Rand(f){return Math.floor(Math.random()*f)}
VET_StartGid=((VET_Mili()%100000)*10000)+VET_Rand(10000)
MTSPlugin.prototype.genid=VET_StartGid
function Check_OSX(){if(!VET_Mac)return false;if(VET_Ag.indexOf("mac os x")!=-1)return true
	if(navigator.plugins)
		for(var i=0;i<navigator.plugins.length;i++){
			if(navigator.plugins[i].name.toLowerCase()=="default plugin carbon.cfm")return true
		}
	return false
}
VET_MacOSX=Check_OSX()
VET_UnknownOS=!VET_Mac&&!VET_Win
VET_UnknownBrowser=!VET_IE&&!VET_NN
VET_Pu="Javascript:MTSopenBrWindow('"+VET_Re+"'+VET_Rtyp+'&"+VET_IfVer+"&"+window.location.href+"','vet_install','width=500,height=400,toolbar=no,location=no,resizable=no')"
if(VET_IE&&!VET_Mac)document.write("<SCRIPT LANGUAGE=\"VBScript\">\nDim p_o\nFunction VET_IEChk(n)\nVET_IEChk=1\nOn Error Resume Next\nSet p_o=CreateObject(n)\nif IsObject(p_o) then\nVET_IEChk=0\nend if\nEnd Function\n</SCRIPT>\n")
function MTSDebugger(i){VET_Dbg=i}
function MTSConsole(p1,p2){arguments.length==1?_mtsConsole(p1):_mtsConsole(p1,p2)}
function VET_Ci(arg){
	if(VET_ch==null||VET_ch.closed){
		if(arguments.length==1&&arg==1&&!VET_Premium){
			VET_Premium=true
			MTSJumpToRedirector()
			return
		}
		var e=new Date();e.setTime(e.getTime()+30000)
		SetCookie("VETInstallerPopup",("AutoReload; expires="+e.toGMTString()))
		var c=GetCookie("VETInstallerPopup")
		if((c!=""&&c.substring(0,10)=="AutoReload")||IsMTSInstalled())location.reload()
	}
	else setTimeout("VET_Ci(0)",1000)
}
function MTSopenBrWindow(u,n,f){VET_ch=window.open(u,n,f);setTimeout("VET_Ci(1)",2000)}

function testPlugin(create)
{	
	if (create) {
		var divTemp = document.createElement("div");
		divTemp.setAttribute("id","vmpTempDiv");
		divTemp.setAttribute("style",'position: absolute; top: -100px; left: -100px; z-index: 1000;');
		document.body.appendChild(divTemp);
		document.getElementById('vmpTempDiv').innerHTML = '<embed Component="ISceneComponent" Componentfilename="SceneComponent.mtc" type="application/x-mtx" name="vmpTest" width="2" height="2" script="true" VMPClassID="{03F998B2-0E00-11D3-A498-00104B6EB52E}"></embed>';
	} else {
		if (typeof document.getElementById('vmpTempDiv') == "object") 
		{
			var tempRef = document.getElementById('vmpTempDiv');
			tempRef.parentNode.removeChild(tempRef);
			tempRef.innerHTML = "";
		}
	}
}

function VET_Np(mimetype,pluginName)
{
	if (VET_NN && VET_Gecko) navigator.plugins.refresh(false);
	if (navigator.plugins) 
	{
		for (var i = 0; i < navigator.plugins.length; i++) 
		{
			if (navigator.plugins[i].name.toLowerCase() == pluginName.toLowerCase()) 
			{
				for (var j = 0; j < navigator.plugins[i].length; j++) 
				{
					var mim = navigator.plugins[i][j]
					if (mim.enabledPlugin && (mim.type == mimetype)) 
					{
						if (VET_Win && VET_Gecko && (document.body != null)) 
						{
							testPlugin(true);
							if(typeof document.embeds.vmpTest.DoCommand != "undefined") 
							{
								testPlugin(false);
								return true
							} else {
								testPlugin(false);
								return false;
							}
						} else if (VET_Mac && VET_Gecko && (!VET_Safari)) {
							return false;
						} else {
							return true
						}
					}
				}
				return false
			}
		}
	return false
	}
}

function VET_Ax(){
	if(VET_IEChk(VET_AxPriNa)==0)return true
	if(VET_AltPlugin==1&&VET_IEChk(VET_AxSecNa)==0){VET_AxID=VET_AxSecID;return true}
	return false
}
function IsMTSInstalled(){
	var i = true, m = "MetaStream" + (VET_Mac? "3" : " 3 Plugin")
	if (VET_IE && !VET_Mac) i = VET_Ax()
	else i = VET_Np(VET_Mim, m)
	return i
}
var VET_IsIn=IsMTSInstalled()
MTSPlugin.prototype.createParams=function(pi){this.newParamString=""
	var cMV="50333440",gMV="50333440";this.LN=VET_Ln;var parms=""
	var hMV="50333440"
	if(pi!=null){var xso=pi.indexOf("xmltext")
		if(xso!=-1){var opi=pi,xs=xso+7
			while((xs<pi.length)&&(pi.substring(xs,xs+1)!="<"))xs++
			if(xs<pi.length){var xe=xs,xc=0
				while(xe<pi.length){var chr=pi.substring(xe++,xe)
					if(chr=="&")xc=2;else if(chr==";"){if(xc>0)xc--;else{xe--;break}}
				}
				var xt=pi.substring(xs,xe)
				parms+=AddParm("xmltext",xt)
				if(opi.substring(xe,xe+1)==";")xe++
				pi=opi.substring(0,xso)
				if(xe<opi.length-1)pi+=opi.substring(xe,opi.length)
			}
		}
	}
	if(pi!=null){var tA=pi.split(";")
		for(var i=0;i<tA.length;i++){
			if(tA[i]!=""){var tV=tA[i].split("=");re= / /g;
				tV[0]=tV[0].replace(re,"");var tv0l=tV[0].toLowerCase()
				if(tv0l=="genieminimumversion"){tV[1]=tV[1].replace(re,"");gMV=tV[1]}
				else if(tv0l=="hostminimumversion"){tV[1]=tV[1].replace(re,"");hMV=tV[1]}
				else if(tv0l=="componentminimumversion"){tV[1]=tV[1].replace(re,"");cMV=tV[1]}
				else if(tv0l=="classid"){tV[1]=tV[1].replace(re,"");VET_AxID=tV[1]}
				else if(tv0l=="layer"){tV[1]=tV[1].replace(re,"");this.LN=tV[1]}
				else if(tv0l=="nntrigger"){tV[1]=tV[1].replace(re,"");VET_NNtrgr=tV[1]}
				else if(tv0l=="componentname"){tV[1]=tV[1].replace(re,"");VET_Ic=tV[1]}
				else if(tv0l=="imagelink"){tV[1]=tV[1].replace(re,"");this.ImageLink=tV[1]}
				else if(tv0l=="altplugin"){tV[1]=tV[1].replace(re,"");if(tV[1]=="1"||tV[1]=='true')VET_AltPlugin=1;else VET_AltPlugin=0}
				else if(tv0l=="basehref"){tV[1]=tV[1].replace(re,"");if(tV[1]=="1")this.newParamString+="basehref"+"="+VET_href(this.LN)+";"}
				else if(tv0l=="topurl"){tV[1]=tV[1].replace(re,"");if(VET_TopURL=="")VET_TopURL=tV[1]}
				else{var idx=1,token1=tV[idx-1],token2=tV[idx];idx++
					while(tV[idx]!=null){token2+="="+tV[idx];idx++}
					parms+=AddParm(token1,token2)
					this.newParamString+=token1+"="+token2+";"
				}
			}
		}
	}
	if((VET_NN4&&VET_AppVer<4.5)||VET_Gecko)this.popUp=1
	parms+=AddParm("HostMinimumVersion",hMV)
	if(VET_Mac&&VET_MacOSX)
		parms+=AddParm("WindowID",VET_WindowID)
	parms+=AddParm("ComponentMinimumVersion",cMV)
	parms+=AddParm("GenieMinimumVersion",gMV)
	parms+=AddParm("VMPClassID",("{"+VET_AxID+"}"))
	parms+=AddParm("PageURL",window.location.href)
	if(this.LN!=VET_Ln&&VET_Mac&&VET_IE)this.newParamString+="layername="+this.LN+";"
	this.newParamString+="parentlocation="+self.location.href+";"
	this.newParamString+="mts3interfaceversion="+VET_IfVer+";"
	this.newParamString+="referrer="+(window.VET_Referrer?window.VET_Referrer:window.location.href)+";"
	return parms
}
function AddParm(n,v){if(VET_IE&&VET_Win)return MTSParm(n,v);else return (n+" = "+"'"+v+"' ")}
function GetCookie(a){var e,m=" "+document.cookie+";",N=" "+a+"=",s=m.indexOf(N),r="";if(s!=-1){s+=N.length;e=m.indexOf(";",s);r=unescape(m.substring(s,e))}return r}
function SetCookie(n,v){document.cookie=n+"="+escape(v)}
function ClearCookie(n){var e=new Date();e.setTime(e.getTime()-(3*24*60*60*1000));document.cookie=n+"=ImOutOfHere; expires="+e.toGMTString()}
function GetBase(){var ob=document.getElementsByTagName('BASE');return ((ob&&ob.length)?ob[0].href:null)}
function VET_href(ln){var t="mtsEmpty.html",doc="",c,l
	if(VET_NN4&&ln!=VET_Ln)doc="document."+ln+"."
	doc+="document."
	eval("c="+doc+"links.length")
	var y="write(\"<a href='\"+t+\"'></a>\")"
	eval(doc+y)
	eval("l="+doc+"links[c].href")
	if(t==l)l=""
	else{var re= /mtsEmpty.html/g;
		l=l.replace(re,"")}
	if(VET_Gecko)l=GetBase()
	return l
}
function MTS_IsString(s){if(s=="")return true;for(var i=0;i<s.length;i++){if(((s.charAt(i)<"0")||(s.charAt(i)>"9"))&&(s.charAt(i)!=".")&&(s.charAt(i)!="-"))return true}return false}
function MTSWrapValue(v){var rs=v.toString();if(MTS_IsString(rs))rs="'"+rs+"'";return rs}
function MTSPlugin(file,width,height,bkey,alt,parmsc){
	if (parmsc.toLowerCase().indexOf('imagelink')>-1) this.ImageLink="1";
	if((VET_Gecko)&&((alt.toLowerCase()=="classic")||(alt=="none"))){alt="premium";this.popUp=1}
	if((alt.toLowerCase()=="simple") || (alt.toLowerCase()=="premium") || (alt=="")){
		if(VET_NN4)alt="classic";
		else {
			eval("try{VET_TopURL=top.location.href}catch(e){}");//in eval so NN4 is happy
			VET_Premium=true
			if (!this.ImageLink=="1") alt="popup";
			this.popUp=1
		}
	}
	if(VET_Dbg==1&&arguments.length>6)MTSConsole("Error: MTSPlugin function takes up to 6 parameters. You supplied "+arguments.length+".")
	if((alt.toLowerCase()=="classic")||(alt.toLowerCase()=="none")){alt=VET_Ln;if(MTSPlugin.prototype.genid==VET_StartGid)VET_NNtrgr="1"}
	if(VET_Gecko&&(alt=="none"))alt="popup"
	var str=VET_Ln,na=this.name="MetaCtl"+MTSPlugin.prototype.genid.toString()
	MTSPlugin.prototype.genid++;this.LN=VET_Ln;this.ImageLink="0"
	if(VET_Hff==0&&VET_Mac&&(VET_IE||VET_Gecko))
	{
		//VET_Hff=1
		this.stream += "<div id='HiddenLayer' style='position:absolute;left:-1000px;top:-1000px;width:0px;height:0;z-index:0;visibility:hidden'><form name='MTS3'><input type=text name='mts3_js_jsfield'></form></div>";
		if(VET_Mac&&!VET_MacOSX)setTimeout('ExecValue()',3)
	}
	if(VET_MacOSX){this.sequenceID=0
		this.stream += "<div id='OSX_S_"+this._mtsPID()+"' name='OSX_S_"+this._mtsPID()+"' style='position:absolute;left:2px;top:0px;width:2px;height:2px;visibility:visible;z-index:999999'></div>";
	}
	var parms=this.createParams(parmsc)
	VET_IsIn=IsMTSInstalled()
	if((alt.length!=0)&&(!VET_IsIn))str=alt
	if((VET_NNtrgr=="1")&&(VET_Cv==0)&&VET_NN4)TriggerJS()
	if((((str.toLowerCase()==VET_Ln)&&(!VET_Mac))||((GetCookie(na)=="1")&&(!VET_Mac)))&&((!(this.popUp=="1"))||(str.toLowerCase()==VET_Ln))||(VET_IsIn)){
		if(VET_Win&&VET_IE){var ch=""
			if(file!="")ch=MTSParm("Source",file)
			ch+=MTSParm("Component",VET_Ic)+MTSParm(VET_Cf,VET_Sc)+MTSParm(VET_Bk,bkey)
			ch+=parms;ch+=MTSParm("properties",this.newParamString)
			var cbURL="https://components.viewpoint.com/MTSInstallers/MetaStream3.cab"+"?url="+(window.VET_Referrer?window.VET_Referrer:window.location.href)+"#Version=3,0,2,62"
			str=MTSMarkup("object",ch,"id",na,"classid",("CLSID:"+VET_AxID),"width",width,"height",height,((MTSPlugin.prototype.genid==VET_StartGid+1)?"codebase":"dummy"),cbURL)
			if(VET_Dbg==1)MTSConsole(str,na)
			this.stream += str;
		}else{var tag
			if(VET_Mac&&VET_NN4&&!VET_IsIn)tag="PLUGINSPAGE"
			else if(VET_Mac&&VET_IE&&!VET_IsIn)MTSJumpToRedirector(this.LN)
			else tag="PluginURL"
			str=MTSMarkup("embed","<!-- -->","component",VET_Ic,"componentfilename",VET_Sc,"source",file,"type",VET_Mim,"width",width,"height",height,"script",true,"name",na,VET_Bk,bkey,"properties",this.newParamString,"instancename", na, tag, VET_Pu, parms)
			if(this.LN!=VET_Ln){
				if(VET_Dbg==1)MTSConsole(str,na)
				if(VET_IE||VET_Gecko)this.stream += str;
				else{VET_Gnns=str;var v="document."+this.LN+".document.write(VET_Gnns);";eval(v)}
			}else{
				if(VET_Dbg==1)MTSConsole(str,na)
				this.stream += str;
			}
			if(GetCookie(na+VET_Tr)=="1"){ClearCookie(na+VET_Tr)
				if((this.popUp!='1')&&(VET_NN4))TriggerJS()
			}
		}
		if(this.ImageLink=="1")ClearCookie(na)
	}else{
		if((this.ImageLink!="1"&&this.popUp=="1")||((GetCookie(na)=="1")&&(this.popUp=="1"))||(str.toLowerCase()=="popup")||(VET_Mac&&((str==VET_Ln)||(GetCookie(na)=="1")))){
			if(this.ImageLink=="1")ClearCookie(na)
			if((alt!=VET_Ln)&&(alt.toLowerCase()!="popup")){VET_Gac=alt
				if((VET_NN4)&&(this.LN!=VET_Ln)){var outStr="document."+this.LN+".document.write(VET_Gac);"
					if(VET_Dbg==1)MTSConsole(outStr,na)
					eval(outStr)
				}else{
					if(VET_Dbg==1)MTSConsole(alt,na)
					this.stream += alt;
				}
			}
			MTSJumpToRedirector(this.LN)
		}else{
			if(this.ImageLink=="1"){
				VET_Premium=true;
				str2='JavaScript:mtsClick("'+this.LN+'")';
				str=MTSMarkup("A",str,"HREF",str2)
			}
			VET_Gac=str
			if(VET_NN4&&(this.LN!=VET_Ln)){var outStr="document."+this.LN+".document.write(VET_Gac);"
				if(VET_Dbg==1)MTSConsole(outStr,na)
				eval(outStr)
			}else{
				if(VET_Dbg==1)MTSConsole(str,na)
				this.stream += str;
			}
		}
	}
}
function mtsClick(ln){var t=""
	for(var i=VET_StartGid;i<MTSPlugin.prototype.genid;i++){t="MetaCtl"+i.toString();SetCookie(t,'1')}
	if(VET_NN4)SetCookie(("MetaCtl0"+VET_Tr),"1")
	ClearCookie("VETInstallerPopup")
	if(GetCookie("MetaCtl0")=="1")location.reload()
	else MTSJumpToRedirector(ln);
}
function ExecValue(){document.MTS3.mts3_js_jsfield.value="MTS3_Req";var v=document.MTS3.mts3_js_jsfield.value
	if((v!="")&&(v!="MTS3_Req")){eval(v);v="";document.MTS3.mts3_js_jsfield.value=""}
	if(v=="MTS3_Req")document.MTS3.mts3_js_jsfield.value=""
	setTimeout('ExecValue()',3)
}
MTSPlugin.prototype.stream = '';
MTSPlugin.prototype.OutputStream = function() {return this.stream;}
MTSPlugin.prototype.Console=function(m){_mtsConsole(m,this._mtsPID())}
MTSPlugin.prototype.Execute=function(a,b,c,d,e,f){var v,l=arguments.length;if(l==0)v=this._mtsCall();else if(l==1)v=this._mtsCall(a);else if(l==2)v=this._mtsCall(a,b);else if(l==3)v=this._mtsCall(a,b,c);else if(l==4)v=this._mtsCall(a,b,c,d);else if(l==5)v=this._mtsCall(a,b,c,d,e);else if(l==6)v=this._mtsCall(a,b,c,d,e,f);return v}
MTSPlugin.prototype.SetProperty=function(n,p,v,t,o){if(arguments.length==5)return this.Execute("SetProperty",n,p,MTSWrapValue(v),t,o);else return this.Execute("SetProperty",n,p,MTSWrapValue(v),t)}
MTSPlugin.prototype.GetProperty=function(n,p,t){return this.Execute("GetProperty",n,p,t)}
MTSPlugin.prototype.TriggerAnim=function(a){return this.Execute("TriggerAnimation",VET_An(a))}
MTSPlugin.prototype.ReverseAnim=function(a){return this.Execute("ReverseAnimation",VET_An(a))}
MTSPlugin.prototype.StopAnim=function(a){return this.Execute("StopAnimation",VET_An(a))}
MTSPlugin.prototype.StartAnim=function(a){return this.Execute("StartAnimation",VET_An(a))}
MTSPlugin.prototype.ResetAnim=function(a){return this.Execute("ResetAnimation",VET_An(a))}
MTSPlugin.prototype.ToggleCollapse=function(n){this.SetProperty(n,'clps',this.GetProperty(n,'clps')==0?1:0)}
MTSPlugin.prototype.SetCollapsed=function(n,v){return this.SetProperty(VET_In(n),'clps',MTSWrapValue(v),'mts_int')}
MTSPlugin.prototype.ToggleVisible=function(n){this.SetProperty(n,'visb',this.GetProperty(n,'visb')==0?1:0)}
MTSPlugin.prototype.SetVisible=function(n,v){return this.SetProperty(VET_In(n),'visb',MTSWrapValue(v),'mts_int')}
MTSPlugin.prototype.ClearScene=function(){return this.Execute("ClearScene")}
MTSPlugin.prototype.TogglePano=function(n){this.SetProperty('MTSScene','paac',this.GetProperty('MTSScene','paac')==0?1:0)}
MTSPlugin.prototype.Render=function(){return this.Execute("Render")}
MTSPlugin.prototype.LoadMTX=function(p){return this.Execute("LoadMTX",p)}
MTSPlugin.prototype.ResetCamera=function(){this.SetProperty('MTSScene','rstc','0')}
MTSPlugin.prototype.GetVer=function(c){return this.Execute("GetVersion",c)}
MTSPlugin.prototype.GetLastErrCode=function(){return this.Execute("GetLastErrCode")}
MTSPlugin.prototype.GetLastPluginErr=function(t){return this.Execute("GetLastPluginErr",t)}
MTSPlugin.prototype.SetPluginErr=function(t,v){return this.Execute("SetPluginErr",t,v)}
MTSPlugin.prototype.GetAllPluginErrFor=function(t){return this.Execute("GetAllPluginErrFor",t)}
MTSPlugin.prototype.ClearAllPluginErrs=function(t){return this.Execute("ClearAllPluginErrs",t)}
MTSPlugin.prototype.PostEvent=function(n,d){var a=arguments,x=d;for(var i=2;i<a.length;i++)x+=(","+arguments[i]);return this.Execute("PostEvent",n,x)}
function MTSMarkup(tag,c){var a=arguments
	if(a.length==0)return ""
	var i,s="<"+a[0]
	for(var i=2;i<a.length;i+=2){
		if(a[i+1]!=null)s+=(" "+a[i]+"=\'"+a[i+1]+"\'")
		else s+=" "+a[i]
	}
	s+=(c.length?(">"+c+"</"+a[0]+">"):("/>"))
	return s
}
function MTSParm(n,v){return MTSMarkup("param","","name",n,"value",v.toString())}
MTSPlugin.prototype._mtsPID=function(){return this.name}
function _mtsConsole(){if(VET_Dbg!=1)return;var a=arguments;var ct=a.length;if(ct==0)return
	var msg=a[0].toString(),pn=(ct==1)?"Default":((a[1].constructor==MTSPlugin)?a[1].name:a[1].toString())
	if(VET_Mc==0){VET_Mc=window.open("","console","width=700,height=400"+(VET_Mac&&VET_NN4?",":",resizable")+",scrollbars")
		if(!VET_Gecko)VET_Mc.document.write('<title>debug_output<\/title><plaintext>')
		VET_Mc.focus()
	}
	if(!VET_Mc.closed){var s=pn+"> "+msg+"\n"
		if(!VET_Gecko){VET_Mc.document.write(s)}
		else{var re= /</g;s=s.replace(re,"&lt;");re= />/g;s=s.replace(re,"&gt;");VET_Mc.document.write("<pre>"+s+"</pre>")}
	}
}
function VET_OSX_SendCommand(s,h,w){if(!(VET_IE||VET_Gecko))return
	var l=w.length;
	x="";
	o=VET_IE?eval("document.all['OSX_S_"+h+"']"):eval("document.getElementById('OSX_S_"+h+"')")
	for(var i=0;i<l;i++){var c=w.charAt(i)
		switch(c){
			case '\'':x+="`";break
			case '\"':x+="#";break
			case '#':x+="\\#";break
			case '`':x+="\\`";break
			case '\\':x+="\\\\";break
			default:x+=c;break
		}
	}
	o.innerHTML="<embed	Component='SCRIPT' type='application/x-mtx' name='MetaScriptCtl0' width='1' height='1' ScriptCommand='"+h+"_"+s+"_"+x+"' ScriptOutTgt='document.MTS3.mts3_js_jsfield.value' WindowID='"+VET_WindowID+"'>"
	return (document.MTS3 && document.MTS3.mts3_js_jsfield) ? document.MTS3.mts3_js_jsfield.value : "";
}
function VET_An(n){var s='MTSAnimator.';return n.indexOf(s)==0?n:s+n}
function VET_In(n){var s='MTSInstance.';return n.indexOf(s)==0?n:s+n}
MTSPlugin.prototype._mtsCall=function(){var ar=arguments,c=ar.length
	if(++c<2){alert('too little arguments for functions call');return false}
	var rg=ar[0]+'(',l=c-2,i,li=c-1,pn=this._mtsPID()
	for(var i=1;i<li;i++){rg+=ar[i];if(i<l)rg+=','}rg+=')'
	var pID=pn,r,replace= /MetaCtl/i;
	pID=pID.replace(replace,"")
	if(VET_Mac&&(VET_IE||VET_Gecko)){
		if(VET_MacOSX){
			r=VET_OSX_SendCommand(this.sequenceID++,pn,rg)
			if(VET_Dbg==1)MTSConsole(rg,pn)
		}else{var s=("MTS3_JS"+pn+":"+(rg)+";"),x='document.MTS3.mts3_js_jsfield.value=s;'
			eval(x)
			r=document.MTS3.mts3_js_jsfield.value;document.MTS3.mts3_js_jsfield.value=""
			if(VET_Dbg==1)MTSConsole(s)
		}
	}else{var p,d='document.'
		if(VET_Win&&VET_IE)p=d+'all.'+pn+'.PluginCommand(\"'+rg+'\",0,0);'
		else{var p1=d+'embeds.'+pn+'.DoCommand(\"'+rg+'\");'
			if(this.LN==VET_Ln)p=p1
			else{
				if(VET_Gecko)p=p1
				else p=d+this.LN+'.'+p1
			}
		}
		// LEXUS-TAG - custom coded, in firefox, when switching between movies.. 1st time
		// the second movie is shown, which means we are building it.. the DOCommand method
		// is not availible, so we check for this and dont process the method call if it doesn't exist
		var obj;
		if(VET_Win&&VET_IE) {
			obj = true;
		}
		else {
			obj = eval(d+'embeds.'+pn + '.DoCommand');
		}
		if(obj) {
			r=eval(p)
		}
		
		if(VET_Dbg==1)MTSConsole(rg,pn)
	}
	return r
}

function MTSJumpToRedirector(ln) {
	var c,t="var _FS='"
	if (VET_Sdr < 1 || VET_Premium) {
		VET_Sdr++
		c = GetCookie("VETInstallerPopup")
		var inf = (window.location.search.indexOf("noreloadredir") != -1)
		if((c != "" && c.substring(0,10) == "AutoReload") || inf){
			if((c.substring(10,17) == "Premium") || inf) {
				var e = new Date();
				e.setTime(e.getTime() + 30000)
				SetCookie("VETInstallerPopup",("AutoReload; expires=" + e.toGMTString()))
			}
			else ClearCookie("VETInstallerPopup")
			return
		}
		if (VET_Premium) {
			var e = new Date();
			e.setTime(e.getTime() + 30000)
			SetCookie("VETInstallerPopup",("AutoReloadPremium; expires="+e.toGMTString()))
			var p = GetCookie("VETInstallerPopup")
			if (p != "") VET_TopURL = window.location.href
			var trg = VET_Re + VET_IfVer + "&" + (VET_TopURL != "" ? VET_TopURL : window.location.href)
			setTimeout("top.location.href='" + trg + "';", 250);
			return
		}
	}
}

function TriggerJS(){VET_NNtrgr="0"
	if(IsMTSInstalled())return
	var sp="https://components.viewpoint.com/MTSInstallers/MetaStream3.jar"+"?url="+(window.VET_Referrer?window.VET_Referrer:window.location.href),VET_Cv=2
	if(VET_NN4&&VET_Win&&VET_Java){tr=netscape.softupdate.Trigger
		if(tr.UpdateEnabled()){upd=true
			if((mimeType=navigator.mimeTypes[VET_Mim])!=null&&(plugin=mimeType.enabledPlugin)!=null){
				descr_str=String(plugin.description)
				li=descr_str.lastIndexOf("r")
				if(li>=0){vers=parseInt(descr_str.substring(li+1).toString())
					if(!isNaN(vers)&&vers>=VET_Cv)upd=false
				}
			}
			if(upd)tr.StartSoftwareUpdate(sp,tr.DEFAULT_MODE)
		}
	}
}
function VET_Location(js){if(!VET_Gecko)eval(js);else setTimeout(js,100)}
function VET_OpenContent(ur,re,tar,nam,opt){var lo=((re!="")&&(re!="nil"))?re+ur:ur
	if(tar=="_blank")window.open(lo,nam=="nil"?"":nam,opt=="nil"?"":opt)
	else{var x="window.location.href";if(tar!="_top")x=tar;x+=("=%22"+lo+"%22");eval(unescape(x))}
}


var popupExampleWindow;
/**
 * infoPopUp
 * This is a generic function that creates a popup window with defined parameters
 * @param {string} popID = URL of target window
 * @param {number} popWidth = pixel width of target window
 * @param {number} popHeight = pixel height of target window
 * @param {boolean} defaultElements = does target window contain default browser settings (optional)
 */
 
function infoPopUp(popID, popWidth, popHeight, defaultElements) {

	// calculating the center of the browser window, so that we can center the popup over the window
	var windowWidth = (document.all) ? document.body.offsetWidth : window.innerWidth;
	var windowHeight = (document.all) ? document.body.offsetHeight : window.innerHeight;
	
	var left = Math.round( (windowWidth - popWidth) / 2 ) + "px";
	var top =  Math.round( (windowHeight - popHeight) / 2 ) + "px";

	// close the popup if its already opened
	closeExamplePopup ();

    // opens a new window and sets the object o your popup variable
	var elementString = (defaultElements == true) ? "toolbar=yes, location=yes, directories=yes, status=yes;" : "toolbar=no, location=no, directories=no, status=no;";

	popupExampleWindow = window.open(popID+'','_blank',elementString+', menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width='+popWidth+', height='+popHeight + ',top='+top+', left='+left);
	
	// make sure the popup is the focused window

	if (popupExampleWindow) popupExampleWindow.focus(); 

    // Add events dynamically to the window, that makes sure we close the popup when navigating away from this page

	
	if (window.addEventListener) {

		window.addEventListener('unload', closeExamplePopup, null);

		} 

	else if (window.attachEvent) {

		window.attachEvent('on' + 'unload', closeExamplePopup);

		}
		
}

function closeExamplePopup () {

	// We only close the popup if its exists

	if(popupExampleWindow && ! popupExampleWindow.closed) {

		popupExampleWindow.close();
		popupExampleWindow = null;

	}

}

function hdDemoPopUp(popID, popWidth, popHeight, stayOpen) {

	// calculating the center of the browser window, so that we can center the popup over the window
	var windowWidth = (document.all) ? document.body.offsetWidth : window.innerWidth;
	var windowHeight = (document.all) ? document.body.offsetHeight : window.innerHeight;
	
	var left = Math.round( (windowWidth - popWidth) / 2 ) + "px";
	var top =  Math.round( (windowHeight - popHeight) / 2 ) + "px";

	// close the popup if its already opened
	closeExamplePopup ();

    // opens a new window and sets the object o your popup variable
	popupExampleWindow = window.open(popID+'','_blank','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+popWidth+', height='+popHeight + ',top='+top+', left='+left);
	
	// make sure the popup is the focused window

	popupExampleWindow.focus(); 

    // Add events dynamically to the window, that makes sure we close the popup when navigating away from this page

	if (stayOpen != "keepopen") {
		if (window.addEventListener) {

			window.addEventListener('unload', closeExamplePopup, null);

			} 

		else if (window.attachEvent) {

			window.attachEvent('on' + 'unload', closeExamplePopup);

			}
		}
}


//added a function to go to a new page, than pop up a window on top of that new page
//function created due to task # LEXINTK8-004
//function added by Simon Chelebyan on 10/25/07
//example call: <a href="test2.html?doPopUp=http://vdev.lexus.com/lexus-share/demos/HybridDrive/how_they_work/HybridTechnology/index.html&s_ocid=30355&w=786&h=388">test</a>

function hdDemoPopUpTopOfNewPage() {

  var url_string = String(document.location);
  var url_array1 = url_string.split('?');
  if(url_array1[1]){
  	var e_array = url_array1[1].split('&');
  	var val_array = new Array();
  	for(i=0;i<=20;i++){
  		if(e_array[i]){
			val_array.push(e_array[i].split('='));
   		}
  	}
   }
if(val_array){
  for(j=0; j<val_array.length; j++){
  	//alert(val_array[j][0]);
	switch(val_array[j][0]){
		case "doPopUp":
  			var popPage = val_array[j][1];
 			break;
		case "s_ocid":
  			var s_ocid = val_array[j][1];
 			break;    
		case "w":
  			var width = val_array[j][1];
  			break;
		case "h":
  			var hight = val_array[j][1];
  			break;
		default:
  			break;
	}
  }
  var stayOpen = "keepopen";
  if(popPage){
  	if(s_ocid){
		hdDemoPopUpTop(popPage+"?s_ocid="+s_ocid, width, hight, stayOpen);
	}else{
  		hdDemoPopUpTop(popPage, width, hight, stayOpen);
  	}	
  }
}
 
}


function hdDemoPopUpTop(popID, popWidth, popHeight, stayOpen) {

	// calculating the center of the browser window, so that we can center the popup over the window
	var windowWidth = (document.all) ? document.body.offsetWidth : window.innerWidth;
	var windowHeight = (document.all) ? document.body.offsetHeight : window.innerHeight;
	
	var left = Math.round( (windowWidth - popWidth) / 2 ) + "px";
	var top =  "0px";

	// close the popup if its already opened
	closeExamplePopup ();

    // opens a new window and sets the object o your popup variable
	popupExampleWindow = window.open(popID+'','_blank','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+popWidth+', height='+popHeight + ',top='+top+', left='+left);
	
	// make sure the popup is the focused window

	popupExampleWindow.focus(); 

    // Add events dynamically to the window, that makes sure we close the popup when navigating away from this page

	if (stayOpen != "keepopen") {
		if (window.addEventListener) {

			window.addEventListener('unload', closeExamplePopup, null);

			} 

		else if (window.attachEvent) {

			window.attachEvent('on' + 'unload', closeExamplePopup);

			}
		}
}

function closeExamplePopup () {

	// We only close the popup if its exists

	if(popupExampleWindow && ! popupExampleWindow.closed) {

		popupExampleWindow.close();
		popupExampleWindow = null;

	}

}



onPageLoadEvents.addAction(checkpoploader);

function checkpoploader()
	{
	var p = "";
	if(window.qsVars){
		if (qsVars['pfile']) 
			{
			if (qsVars['pw'] && qsVars['ph']) 
				{
				if (qsVars['pparams'])
					p = qsVars['pparams'];
				popup(qsVars['pfile'],'popup',+qsVars['pw'],+qsVars['ph'],p);
				}
			else
				{
				popupPrimary(qsVars['pfile'],'popup');
				}
			}
		}
	}

/**
 * fullScreenPopUp
 * This is a generic function that creates a popup window that is the size of the user's monitor screen
 * @param {string} url = URL of target window
 */
 
var newScreenWidth = screen.availWidth;
var newScreenHeight = screen.availHeight;

function fullScreenPopUp(url) {
	params  = 'width='+newScreenWidth;
	params += ', height='+newScreenHeight;
	params += ', directories=yes, location=yes, menubar=yes, resizable=yes, scrollbars=1, status=yes, toolbar=yes';

	newwin=window.open(url,'lexuslifestyle', params);
	newwin.moveTo(screen.availTop,screen.availLeft);
	if (window.focus) {newwin.focus()}
	return false;
 }




// Popup Overlay JavaScript Document
/**************** The 4 functions below are performed when the popup layer is open ****************************/
function hidePW(){
 	Popup.close();
}
function initScrollPopupOverlay() {
  // arguments: id of layer containing scrolling layers (clipped layer), id of layer to scroll, 
  // if horizontal scrolling, id of element containing scrolling content (table?)
  var wndo1 = new dw_scrollObj('popupWn', 'popupLyr', null);

  // arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
  // (x/y offsets of dragBar in track)
  wndo1.setUpScrollbar("dragBar", "track", "v", 0, 0);

  //dw_showLayers("scrollbar","popupOverlay");
  return wndo1;
}

function swapHdr(pType) { //changes the Header image in the PopupOverlay
	
	if(pType == 'gl' || pType == 'gl_ajx') {
		$('popupHeader').className = 'glossaryHdr';
		
	}
	else {
		$('popupHeader').className = pType;
	}
}

var Glossary = new GlossaryLoad(); // A unique function for Glossary definitions
function GlossaryLoad() {
	var obj;
	var def_id;
}
GlossaryLoad.prototype.showGlossary = function (obj, def_id, offsetXY, popType) {
	this.popType = popType;
	Popup.showDefinition (obj, def_id, (popType)?popType:'gl', 0, offsetXY);
};


function PopupPanel(){ //The generic PopupOverlay function
	
	var element;	//The popup panel root element
	var _cache;	//Cached popup results
	
	var html_is_loaded;	//If the html for the panel had been loaded
	var error_loading_panel;//If the panel cannot be loaded.  Disable popup if true;
	
	var currentID;
	var currentElement;
	var popType;
	
	this.ajaxQueueSingle = new Ajax.Queue(Ajax.Queue.Single, false);
	this.ajaxQueueFifo = new Ajax.Queue(Ajax.Queue.FIFO, true);
	
}

PopupPanel.prototype.loadPanelHTML = function(definition_id, popType){
	this.popType = popType;
	var onerror = function(){
		this.html_is_loaded = false;
		this.error_loading_panel = true;
	};
	
	var templateAjax = new Ajax.Updater(
		{success: document.body}, 
		'/lexus-share/includes/popup_panel.incl', 
		{ 
			method: 'get',
			onComplete: function() {this.oncomplete()}.bind(this),
			wait: true,
			insertion: Insertion.Bottom,
			onError: onerror.bind(this)
		});
	var glossaryAjax = this.buildAjaxUpdater(definition_id, popType);
	
	this.ajaxQueueFifo.addAction(templateAjax);
	this.ajaxQueueFifo.addAction(glossaryAjax);
	this.ajaxQueueFifo.start();			
};

PopupPanel.prototype.oncomplete = function(){
	this.html_is_loaded = true;
	this.error_loading_panel = false;
	
	this.element = $('popupOverlay');
	
	/* 
	//	These settings will have make the box scroll on hover and scroll twice as fast on click
	Event.observe($('upMover'), 'mouseover', function(){dw_scrollObj.initScroll('popupWn','up')});
	Event.observe($('upMover'), 'mouseout', function(){dw_scrollObj.stopScroll('popupWn','up')});
	Event.observe($('upMover'), 'mousedown', function(){dw_scrollObj.doubleSpeed('popupWn')});
	Event.observe($('upMover'), 'mouseup', function(){dw_scrollObj.resetSpeed('popupWn')});
	
	Event.observe($('downMover'), 'mouseover', function(){dw_scrollObj.initScroll('popupWn','down')});
	Event.observe($('downMover'), 'mouseout', function(){dw_scrollObj.stopScroll('popupWn','down')});
	Event.observe($('downMover'), 'mousedown', function(){dw_scrollObj.doubleSpeed('popupWn')});
	Event.observe($('downMover'), 'mouseup', function(){dw_scrollObj.resetSpeed('popupWn')});
	*/
	
	//	These settings will make the box scroll only when clicked
	Event.observe($('upMover'), 'mousedown', function(){dw_scrollObj.initScroll('popupWn','up')});
	Event.observe($('upMover'), 'mouseup', function(){dw_scrollObj.stopScroll('popupWn','up')});
	
	Event.observe($('downMover'), 'mousedown', function(){dw_scrollObj.initScroll('popupWn','down')});
	Event.observe($('downMover'), 'mouseup', function(){dw_scrollObj.stopScroll('popupWn','down')});

	
	Event.observe(window, 'keypress', function(event){if(event.keyCode == Event.KEY_ESC) hidePW();}.bindAsEventListener(this));

};
PopupPanel.prototype.showDefinition = function(element, definition_id, popType, dontMove, offsetXY){
	this.popType = popType;
	this.dont_move = (dontMove==1)?true:false;
	this.offsetX = (offsetXY && offsetXY.x) ? offsetXY.x : 0;
	this.offsetY = (offsetXY && offsetXY.y) ? offsetXY.y : 0;
	this.currentType = popType;
	this.currentElement = element;
	
	if(!PAGE_LOAD) {
		return;
	}
	
	if(this.html_is_loaded){
		this.ajaxQueueSingle.addAction(this.buildAjaxUpdater(definition_id, popType));
		this.ajaxQueueSingle.start();	
	}
	else {
		this.loadPanelHTML(definition_id, popType);
	}
	
	this.destroyScrollEvents();
	this.setupScrollEvents();
};

PopupPanel.prototype.close = function(){
  if(!$('popupOverlay')) {
  	return;
  }
  $('popupOverlay').style.display = 'none';
  $('popupOverlay').style.visibility = 'hidden'; 
  this.destroyScrollEvents();
}

PopupPanel.prototype.buildAjaxUpdater = function(definition_id, popType) {
	this.popType = popType;
	if (popType != 'gl' && popType != 'gl_ajx') {
			var defURL = '/lexus-share/includes/' + definition_id.toLowerCase() + '.incl'
	} else if (popType == 'gl_ajx') {
		var defURL = '/lexusConfigApp/glossary.action?id='+ definition_id.toLowerCase();
	}
	else { 
		var defURL = '/lexus-share/includes/glossary/' + definition_id.toUpperCase() + '.incl' 
	}
	
	return new Ajax.Updater(
		{success: 'popupLyr'},
		defURL, 
		{ 
			method: 'get',
			wait: true,
			onComplete: function(transport) {this.preparePopupOvlay(popType,transport)}.bind(this)
		});
};
PopupPanel.prototype.preparePopupOvlay = function(popType,transport) {
	this.popType = popType;
	swapHdr(this.currentType);
	if(!this.dont_move){
		this.reposition(this.currentElement);
	}

	//Fix IE drawing problems by forcing it to redraw this element
	this.element.style.display = 'none';
	this.element.style.display = 'block';
	if (popType && popType=="gl_ajx" && transport && transport.responseText) { 
		var gloss_json = eval('('+unescape(transport.responseText)+')');
		if (gloss_json && gloss_json.def && gloss_json.term) { 
			$('popupLyr').innerHTML = "<div class=\"title\">"+gloss_json.term+"</div><div class=\"definition\">"+gloss_json.def+"</div>";
		}
	}
	initScrollPopupOverlay();
};

PopupPanel.prototype.setupScrollEvents = function(){
	if(!this.scroll_events){
		var scroll_event = Event.observe(window, 'scroll', function(){this.reposition(this.currentElement)}.bind(this));
		var resize_event = Event.observe(window, 'resize', function(){this.reposition(this.currentElement)}.bind(this));
		this.scroll_events = [scroll_event, resize_event];
	}
};

PopupPanel.prototype.destroyScrollEvents = function(){
	if(this.scroll_events){
		Event.stopObserving(this.scroll_events[0]);
		Event.stopObserving(this.scroll_events[1]);
		this.scroll_events = false;
	}
};

PopupPanel.prototype.cumulativeScrollOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    var result = [valueL, valueT];
	  result.left = valueL;
	  result.top = valueT;
	  return result;
}



PopupPanel.prototype.reposition = function(element){

	$('popupOverlay').style.display = 'block';
	var left = Position.cumulativeOffset(element)[0];
	var top = Position.cumulativeOffset(element)[1];
	
	var leftpos = (left - (this.element.offsetWidth / 2 ) - 5);
	var toppos = (top - (this.element.offsetHeight));
	
	var scrollX = (document.all)?document.body.scrollLeft:window.pageXOffset;
	var scrollY = (document.documentElement.scrollTop)?document.documentElement.scrollTop:((document.all)?document.body.scrollTop:window.pageYOffset);
	var window_width = (document.all)?document.body.clientWidth:window.innerWidth;
	
	if(MODEL_ID == 'CPO Dealerized') {
		//The following applies only to the Dealerized Model Detail pages. This prevents the Glossary overlay from appearing in the area reserved for the Dealer left navigation.
		leftpos = left;
		}
		
	if(leftpos + this.element.offsetWidth >= (window_width + scrollX)){
		leftpos = ((window_width + scrollX) - this.element.offsetWidth) - 15;
	}
	
	
	$('popupOverlay').style.left = (leftpos > scrollX ? leftpos : scrollX) + 'px';
	$('popupOverlay').style.top = (toppos > scrollY ? toppos : scrollY) + 'px';


	if (this.popType == "gl_ajx") {
		var nodeOff = Position.cumulativeOffset(element)[1];
		var nodeScrollOff = this.cumulativeScrollOffset(element).top;
		$('popupOverlay').style.top = nodeOff - nodeScrollOff + 80 +"px";
		$('popupOverlay').style.left = Position.cumulativeOffset(element)[0] + "px";
	}

	// Initially hidden
	$('popupOverlay').style.visibility = 'visible';	
	
};

var Popup = new PopupPanel();
// PopupDisclaimer Overlay JavaScript Document
/**************** The 4 functions below are performed when the PopupDisclaimer layer is open ****************************/
function hideDisc(){
 	PopupDisclaimer.close();
	window.pauseImageRotation = false;
}
function initScrollPopupDisclaimerOverlay() {
  // arguments: id of layer containing scrolling layers (clipped layer), id of layer to scroll, 
  // if horizontal scrolling, id of element containing scrolling content (table?)
  var wndo1 = new dw_scrollObj('popupWn', 'popupLyr', null);

  // arguments: dragBar id, track id, axis ("v" or "h"), x offset, y offset
  // (x/y offsets of dragBar in track)
  wndo1.setUpScrollbar("dragBar", "track", "v", 0, 0);

  //dw_showLayers("scrollbar","popupOverlay");
  return wndo1;
}

var Disclaimer = new DisclaimerLoad(); // A unique function for Disclaimer definitions
function DisclaimerLoad() {
	var obj;
	var def_id;
}
DisclaimerLoad.prototype.showDisclaimer = function (obj, def_id, offsetXY, popType) {
	window.pauseImageRotation = true;
	PopupDisclaimer.showDefinition (obj, def_id, (popType)?popType:'gl', 0, offsetXY);
};


function PopupDisclaimerPanel(){ //The generic PopupDisclaimerOverlay function
	
	var element;	//The PopupDisclaimer panel root element
	var _cache;	//Cached PopupDisclaimer results
	
	var html_is_loaded;	//If the html for the panel had been loaded
	var error_loading_panel;//If the panel cannot be loaded.  Disable PopupDisclaimer if true;
	
	var currentID;
	var currentElement;
	
	this.ajaxQueueSingle = new Ajax.Queue(Ajax.Queue.Single, false);
	this.ajaxQueueFifo = new Ajax.Queue(Ajax.Queue.FIFO, true);
	
}

PopupDisclaimerPanel.prototype.loadPanelHTML = function(definition_id, popType){
	
	var onerror = function(){
		this.html_is_loaded = false;
		this.error_loading_panel = true;
	};
	
	var templateAjax = new Ajax.Updater({success: document.body}, '/lexus-share/includes/popup_disclaimer.incl', 
	{ 
		method: 'get',
		onComplete: function() {this.oncomplete()}.bind(this),
		wait: true,
		insertion: Insertion.Bottom,
		onError: onerror.bind(this)
	});
	var disclaimerAjax = this.buildAjaxUpdater(definition_id, popType);
	
	this.ajaxQueueFifo.addAction(templateAjax);
	this.ajaxQueueFifo.addAction(disclaimerAjax);
	this.ajaxQueueFifo.start();			
};

PopupDisclaimerPanel.prototype.oncomplete = function(){
	this.html_is_loaded = true;
	this.error_loading_panel = false;
	
	this.element = $('popupOverlay');
	
	//	These settings will make the box scroll only when clicked
	Event.observe($('upMover'), 'mousedown', function(){dw_scrollObj.initScroll('popupWn','up')});
	Event.observe($('upMover'), 'mouseup', function(){dw_scrollObj.stopScroll('popupWn','up')});
	
	Event.observe($('downMover'), 'mousedown', function(){dw_scrollObj.initScroll('popupWn','down')});
	Event.observe($('downMover'), 'mouseup', function(){dw_scrollObj.stopScroll('popupWn','down')});

	
	Event.observe(window, 'keypress', function(event){if(event.keyCode == Event.KEY_ESC) hideDisc();}.bindAsEventListener(this));

};
PopupDisclaimerPanel.prototype.showDefinition = function(element, definition_id, popType, dontMove, offsetXY){
	this.dont_move = (dontMove==1)?true:false;
	this.offsetX = (offsetXY && offsetXY.x) ? offsetXY.x : 0;
	this.offsetY = (offsetXY && offsetXY.y) ? offsetXY.y : 0;
	this.currentType = popType;
	this.currentElement = element;
	
	if(!PAGE_LOAD) {
		return;
	}
	
	if(this.html_is_loaded){
		this.ajaxQueueSingle.addAction(this.buildAjaxUpdater(definition_id, popType));
		this.ajaxQueueSingle.start();	
	}
	else {
		this.loadPanelHTML(definition_id, popType);
	}
	
	this.destroyScrollEvents();
	this.setupScrollEvents();
};

PopupDisclaimerPanel.prototype.close = function(){
  if(!$('popupOverlay')) {
  	return;
  }
  $('popupOverlay').style.display = 'none';
  $('popupOverlay').style.visibility = 'hidden'; 
  this.destroyScrollEvents();
}

PopupDisclaimerPanel.prototype.buildAjaxUpdater = function(definition_id, popType) {
	var defURL = '/lexus-share/includes/disclaimer/' + definition_id.toUpperCase() + '.incl' 
	
	return new Ajax.Updater(
		{success: 'popupLyr'},
		defURL, 
		{ 
			method: 'get',
			wait: true,
			onComplete: function(transport) {this.preparePopupDisclaimerOvlay(popType,transport)}.bind(this)
		});
};
PopupDisclaimerPanel.prototype.preparePopupDisclaimerOvlay = function(popType,transport) {
	if(!this.dont_move){
		this.reposition(this.currentElement);
	}

	//Fix IE drawing problems by forcing it to redraw this element
	this.element.style.display = 'none';
	this.element.style.display = 'block';
	if (popType && popType=="gl_ajx" && transport && transport.responseText) { 
		var gloss_json = eval('('+unescape(transport.responseText)+')');
		if (gloss_json && gloss_json.def && gloss_json.term) { 
			$('popupLyr').innerHTML = "<div class=\"definition\">"+gloss_json.def+"</div>";
		}
	}
	initScrollPopupDisclaimerOverlay();
};

PopupDisclaimerPanel.prototype.setupScrollEvents = function(){
	if(!this.scroll_events){
		var scroll_event = Event.observe(window, 'scroll', function(){this.reposition(this.currentElement)}.bind(this));
		var resize_event = Event.observe(window, 'resize', function(){this.reposition(this.currentElement)}.bind(this));
		this.scroll_events = [scroll_event, resize_event];
	}
};

PopupDisclaimerPanel.prototype.destroyScrollEvents = function(){
	if(this.scroll_events){
		Event.stopObserving(this.scroll_events[0]);
		Event.stopObserving(this.scroll_events[1]);
		this.scroll_events = false;
	}
};

PopupDisclaimerPanel.prototype.reposition = function(element){

	$('popupOverlay').style.display = 'block';
	var left = Position.cumulativeOffset(element)[0];
	var top = Position.cumulativeOffset(element)[1];
	
	var leftpos = (left - (this.element.offsetWidth / 2 ) - 5);
	var toppos = (top - (this.element.offsetHeight));
	
	var scrollX = (document.all)?document.body.scrollLeft:window.pageXOffset;
	var scrollY = (document.documentElement.scrollTop)?document.documentElement.scrollTop:((document.all)?document.body.scrollTop:window.pageYOffset);
	var window_width = (document.all)?document.body.clientWidth:window.innerWidth;
	
	if(MODEL_ID == 'CPO Dealerized') {
		//The following applies only to the Dealerized Model Detail pages. This prevents the Disclaimer overlay from appearing in the area reserved for the Dealer left navigation.
		leftpos = left;
		}
		
	if(leftpos + this.element.offsetWidth >= (window_width + scrollX)){
		leftpos = ((window_width + scrollX) - this.element.offsetWidth) - 15;
	}
	
	$('popupOverlay').style.left = (leftpos > scrollX ? leftpos : scrollX) + 'px';
	$('popupOverlay').style.top = (toppos > scrollY ? toppos : scrollY) + 'px';
	// Initially hidden
	$('popupOverlay').style.visibility = 'visible';	
	
	
};

var PopupDisclaimer = new PopupDisclaimerPanel();
var DynamicLibraryLoader = Class.create(); 
Object.extend(DynamicLibraryLoader.prototype, { 
     // Constructor 
     initialize: function(){ 
		this.queue = new Array(); //not yet loaded;
		this.loaded = new Array(); //already loaded;
		this._DLL_PREEXISTS = "preExists"; //Item exists on page but is not in Queue
		this._DLL_INQUEUE = "inQueue"; // Item exists in the Queue but not yet loaded
		this._DLL_ISLOADED = "isLoaded"; // Item exist in Queue and is loaded
		this._DLL_NOTLOADED = "notLoaded"; //Item is not in Queue or page
     },
	 load: function(srcUrl, callBack){
	 	switch(this.isLoaded(srcUrl)){	
			case this._DLL_PREEXISTS:
				//add To Queue to process
				this.addToQueue(srcUrl, callBack, true);
			break;
			case this._DLL_INQUEUE:
				//Already in Queue.  Do nothing.
			break;
			case this._DLL_ISLOADED:
				//Already loaded.  Add to queue to process callback
				this.addToQueue(srcUrl, callBack, true);
			break;
			case this._DLL_NOTLOADED: 
				this.addToQueue(srcUrl, callBack, false); 
			break;
		}
	 },
	 isLoaded: function(srcUrl){
	 	/* Check to see if is in Queue[srcUrl] already.  
	 	 * 		If yes: check Queue[isLoaded]
	 	 * 			If yes: return "isLoaded"
	 	 * 			If no: return "inQueue"
	 	 *		If no:  Check to see if exists in head already:
	 	 * 			if yes: 	return "preExists"
	 	 * 			If no: return "notLoaded"
	 	 */
		//If Not in Queue
		if(!this.findLibraryInArray(this.queue, srcUrl)) {
			//If Not in Loaded
			if(!this.findLibraryInArray(this.loaded, srcUrl)){
				//If not in Page
				if(!this.checkForScript(srcUrl)){
					//return not loaded
					return this._DLL_NOTLOADED;
				}else{
					//return pre-exists
					return this._DLL_PREEXISTS;
				}
			} else {
				//Is already Loaded
				return this._DLL_ISLOADED;
			}
		} else {
			return this._DLL_INQUEUE;
		}
	 },
	 registered: function(){
	 	// Remove from queue
		var libraryItem = this.queue.shift();
		// Call Callback
		if(libraryItem.cancel == "false"){
			libraryItem.callBack.apply(this);
		} else {
			libraryItem.cancel = "false";
		}
		// Add to Loaded if does not already exist
		if(!this.findLibraryInArray(this.loaded, libraryItem.srcUrl)) 
			this.loaded.push(libraryItem);
		// Process any remaining items in Queue
		this.processQueue();
	 },
	 attachLibrary: function(srcUrl){	
		var e = document.createElement("script");
		e.src = srcUrl;
		e.type="text/javascript";
		document.getElementsByTagName("head")[0].appendChild(e);
	 }, 
	 processQueue: function(){
	 	// Are there any items in the queue?
	 	if(this.queue.length > 0){
			// Is the next item in the Queue a pre-existing Item?
			if(this.queue[0].preExists){
				// Item is already loaded, so register
				this.registered();
			} else {
				this.attachLibrary(this.queue[0].srcUrl);
			}
		}	  	 
	 },
	 addToQueue: function(srcUrl, callBack, preExists){
	 	this.queue.push({srcUrl:srcUrl, callBack:callBack, preExists:preExists, cancel:"false"});
		if(this.queue.length == 1) this.processQueue();
	 },
	 cancelCallback: function(srcUrl){
	 	//a callBack needs to be cancelled before the file has finished loading
	 	switch(this.isLoaded(srcUrl)){	
			case this._DLL_INQUEUE:
				//In Queue.  Cancel CallBack
				this.findLibraryInArray(this.queue, srcUrl).cancel = "true";
			break;
			case this._DLL_ISLOADED:
			case this._DLL_PREEXISTS:
			case this._DLL_NOTLOADED: 
				//Not in Queue.  Do nothing;
			break;
		}
	 },
	 checkForScript: function(srcUrl){
	 	//Check for existence in script tags.
		var existsInPage = false;
		var scriptsArry = document.getElementsByTagName("script");
		for(var i=0; i<scriptsArry.length; i++){
			if(scriptsArry[i].src == srcUrl) {
				existsInPage = true;
			}
		}
		return existsInPage;
	 },
	 findLibraryInArray: function(targetArray, srcUrl){
	 	return targetArray.find(function(item){
			return (item.srcUrl == srcUrl);
		});
	 }
});
dynamicLibraryLoader = new DynamicLibraryLoader();


/**
 * @fileoverview  lexusDynamicLoader.js contains all functions for loading "as needed" javascript libraries.
 * @author Ernesto Johnson (ernesto@dhapdigital.com)
 * @author Chris Yap (cyap@dhapdigital.com)
 * <br/> <br/>
 * Documentation is generated by JSDoc (http://jsdoc.sourceforge.net/)
 */

var LexusDynamicLoader = Class.create(); 
Object.extend(LexusDynamicLoader.prototype, { 
	/**
	 * Class holds the source paths for all dynamically loaded javascript libraries and required callback functionality
	 * Currently there are only 2 libraries loaded externally: gallery.js and OverlayController.js
	 * @constructor
	 */
	initialize: function(){ 
		//General variables used by class
		this._BACKDROP_ID = "galleryWrap";	//id AND classname assigned to backdrop instance
		this.backdrop;						//instance of Backdrop 
		this.cacher = null;						//event container for removing listener when item closed
		
		//Gallery specific variables
		this._EXTJS_GALLERY_SRC = "/lexus-share/js/gallery.js";		//gallery library location
		this._EXTJS_GALLERY = "Gallery";							//launch identifying string.
		this._EXTJS_CLOSEGALLERY = "Close Gallery";					//close identifying string.
		this.gallery_params = "";									//holds argument parameters for passthrough to call back function
		this.gallery_close_counter = 0;								//counter used for gallery close attempts.
		
		//Generic Overlay specific variables
		this._EXTJS_GENERICOVERLAY_SRC = "/lexus-share/js/overlayController.js";	//overlay library location
		this._EXTJS_GENERICOVERLAY = "Overlay";										//launch identifying string
		this._EXTJS_CLOSEGENERICOVERLAY = "Close Overlay";							//close identifying string
		this.overlayParams;															//holds argument parameters for passthrough to call back function
		
		//IFrame Overlay specific variables
		this._EXTJS_IFRAMEOVERLAY_SRC = "/lexus-share/js/iframeOverlayController.js";	//overlay library location
		this._EXTJS_IFRAMEOVERLAY = "IFrame Overlay";										//launch identifying string
		this._EXTJS_CLOSEIFRAMEOVERLAY = "Close IFrame Overlay";							//close identifying string
		this.iframeOverlayParams;															//holds argument parameters for passthrough to call back function
		
	},
	/**
	 * Method is gateway for external script function calls, primarily launching and closing
	 * @param target launch/close identifying string
	 * @param params array of arguments passed in by calling function (usually launcher)
	 * @type LexusDynamicLoader
	 */
	callExternalScript: function(target, params){
		switch(target){
			case this._EXTJS_GALLERY:	//launch Gallery
				this.gallery_params = params;
				this._launchGallery();
			break;
			case this._EXTJS_CLOSEGALLERY:	//close Gallery
				this._closeGallery();
			break;
			case this._EXTJS_GENERICOVERLAY:	//launch Generic Overlay
				this.overlayParams = params[0];
				this._launchOverlay(this.overlayParams);
			break;
			case this._EXTJS_CLOSEGENERICOVERLAY:	//close Generic Overlay
				this._closeOverlay();
			break;
			case this._EXTJS_IFRAMEOVERLAY:	//launch IFrame Overlay
				this.iframeOverlayParams = params[0];
				this._launchIFrameOverlay(this.iframeOverlayParams);
			break;
			case this._EXTJS_CLOSEIFRAMEOVERLAY:	//close IFrame Overlay
				this._closeIFrameOverlay();
			break;
		}
	},
	///////////////// General Class Functions ////////////////////////
	/**
	 * Method to handle page preparation for showing the backdrop.
	 * Includes: hidding glossary popups, cancelling if the page hasn't finished loading, hiding navigation, and hiding flash elements (safari only)
	 * @type LexusDynamicLoader
	 */
	setStage: function(){				
		if($('galleryContainer')) { this._closeGallery();}
		if($('genericOverlayContentContainer')) {	this._closeOverlay();	}	
		if($('iframeOverlayContentContainer')) {	this._closeIFrameOverlay();	}	
		if($('popupOverlay')) hidePW();	// hide popup windows from glossary terms.
		//if(!PAGE_LOAD)	return;
		// Hide navigation overlays if visible.
		if(window.navigationManager) navigationManager.hideNavigation();
		// Hide all flash objects in safari
		hideAllFlashInSafari();
		// Show Backdrop;
		this._showModalBackdrop();
	},
	/**
	 * Method to handle preparation for closing the backdrop
	 * @type LexusDynamicLoader
	 */
	clearStage: function(){	
		// Hide backdrop
		this._hideModalBackdrop();
		// Hide any glossary popups
		hidePW();
		// Show Flash Elements (safari only)
  	  	showAllFlashInSafari();
	},		
	/**
	 * Method to create a new backdrop (if one doesn't already exist) and show loading message
	 * @type LexusDynamicLoader
	 */
	_showModalBackdrop:  function() {
		if(!this.backdrop) {
			this.backdrop = new Backdrop(this._BACKDROP_ID,this._BACKDROP_ID);
		}
		this.backdrop.statusIndicator(this.backdrop.STATUS_LOADING);
		this.backdrop.enable();
	},
	/**
	 * Method to clear backdrop loading message
	 * @type LexusDynamicLoader
	 */
	_clearModalIndicator: function() {
		if(this.backdrop) this.backdrop.statusIndicator(this.backdrop.STATUS_LOADED);
	},	
	clearModalIndicator: function(){
		this._clearModalIndicator(); //Public accessor for closing loading message.
	},
	/**
	 * Method to hide backdrop
	 * @type LexusDynamicLoader
	 */
	_hideModalBackdrop: function() {
		  if(this.backdrop) {
			this.backdrop.disable();
		}		
	},
	/**
	 * Expose backdrop for manual use by other applications.
	 */
	showBackdrop: function () {
		_showModalBackdrop();
	},
	hideBackdrop: function () {
		_hideModalBackdrop();
	},
	///////////////// Gallery Functions ////////////////////////
	/**
	 * Method to load the gallery library and set the callBackGallery function
	 * @type LexusDynamicLoader
	 */
	_launchGallery: function(){
		if($('genericOverlayContentContainer')) {
			this._closeOverlay();
		}	
		this.setStage();
		this.cacher = Event.observe(this._BACKDROP_ID, 'click', this._closeGallery.bind(this));
 		dynamicLibraryLoader.load(this._EXTJS_GALLERY_SRC,this.callBackGallery.bind(this));
	},
	/**
	 * Method to prepare a launchGallery function call upon page load (used for deeplinking)
	 * @type LexusDynamicLoader
	 */
	launchGalleryOnload: function(){		
		var params = Address.getParameters();			
		if(params['launchGallery'] && params['launchGallery'] == 'true') {
			var model = (params['model'] && params['model'] != '') ? params['model'] : MODEL_ID; // TODO - this is going to blow up on hotels pages or anything that is not a model page		
			GalleryManager.launchGallery(model, params['tab'], params['subNav'], params['type']);
		}	
	},
	/**
	 * Method called after the gallery library has been loaded.  Serves as a passthrough to the launch function within the gallery code.
	 * @type LexusDynamicLoader
	 */
	callBackGallery: function(){	
		GalleryManager.launchGalleryLoaded(this.gallery_params);
		//this._clearModalIndicator();
	},
	/**
	 * Method to close gallery.  Due to size of gallery and complexity of initialization, it is a requirment to
	 * check the status of the gallery before closing
	 * @type LexusDynamicLoader
	 */
	_closeGallery: function() {
		/* Check to see if Gallery SRC has been loaded/Registered by
		 * the dynamicLibraryLoader yet.
		 */
		if(dynamicLibraryLoader.findLibraryInArray(dynamicLibraryLoader.queue,this._EXTJS_GALLERY_SRC)){
			// Cancel scheduled LaunchGallery Callback 
			dynamicLibraryLoader.cancelCallback(this._EXTJS_GALLERY_SRC);
			this.clearStage();
			Event.stopObserving(this.cacher);
		} else {
			// Check to see if the Gallery has finished initializing
			if(galleryManager.initializeComplete == "true"){
				galleryManager.closeGalleryLoaded();					
				this.clearStage();
				Event.stopObserving(this.cacher);
			} else {
				//Gallery has loaded, but has not completed initialization
				//set a delay and attempt to close again.
				if(this.gallery_close_counter < 5){
					setTimeout('lexusDynamicLoader._closeGallery()',250);
					this.gallery_close_counter++;
				} else {
					//was unsuccessful 5 times.  Give up and reset counter
					this.gallery_close_counter = 0;
				}				
			}
		}
	},
	///////////////// Generic Overlay Functions ////////////////////////
	/**
	 * Method to load the generic overlay libray and set the callback function
	 * @param contentURL string that contains the path/file that will be loaded into the overlay
	 * @type LexusDynamicLoader
	 */
	_launchOverlay: function(contentURL) {
		if($('galleryContainer')) {
			this._closeGallery();
		}
		this.setStage();
		this.cacher = Event.observe(this._BACKDROP_ID, 'click', this._closeOverlay.bind(this));
		dynamicLibraryLoader.load(this._EXTJS_GENERICOVERLAY_SRC,this.callBackGenericOverlay.bind(this, arguments));
	},
	/**
	 * Method to prepare the launchOverlay function on page load (used for deeplinking)
	 * @type LexusDynamicLoader
	 */
	launchOverlayOnload: function(){		
		var params = Address.getParameters();			
		if(params['launchOverlay'] && params['launchOverlay'] == 'true') {
			GenericOverlay.launchOverlay(params['filepath']);
		}	
	},
	/**
	 * Method called after the generic overlay library has been loaded.  Serves as a passthrough to the launch function within the generic overlay.
	 * @param contentURL string that contains the path/file that will be loaded into the overlay
	 * @type LexusDynamicLoader
	 */
	callBackGenericOverlay: function(contentURL){	
		GenericOverlay.launchOverlayLoaded(contentURL);
	},
	/**
	 * Method to close overlay
	 * @type LexusDynamicLoader
	 */
	_closeOverlay: function() {
		/* Check to see if Generic Overlay SRC has been loaded/Registered by
		 * the dynamicLibraryLoader yet.
		 */
		if(dynamicLibraryLoader.findLibraryInArray(dynamicLibraryLoader.queue,this._EXTJS_GENERICOVERLAY_SRC)){
			// Cancel scheduled LaunchGallery Callback 
			dynamicLibraryLoader.cancelCallback(this._EXTJS_GENERICOVERLAY_SRC);
		} else {	
			// Otherwise, destroy the overlay
			GenericOverlay.destroyOverlayLoaded();
		}
		this.clearStage();
		Event.stopObserving(this.cacher);
	},
	///////////////// IFrame Overlay Functions ////////////////////////
	/**
	 * Method to load the generic overlay libray and set the callback function
	 * @param contentURL string that contains the path/file that will be loaded into the overlay
	 * @type LexusDynamicLoader
	 */
	_launchIFrameOverlay: function(iframeParams) {
		this.setStage();
		this.cacher = Event.observe(this._BACKDROP_ID, 'click', function(){
			//if(!IFrameOverlay || (!IFrameOverlay.overrideClose)){
			if(IFrameOverlay && IFrameOverlay.closeAction){
				IFrameOverlay.closeAction();
			} else {
				this._closeIFrameOverlay();
			}
		}.bind(this));
		dynamicLibraryLoader.load(this._EXTJS_IFRAMEOVERLAY_SRC,this.callBackIFrameOverlay.bind(this, arguments));
	},
	/**
	 * Method to prepare the launchOverlay function on page load (used for deeplinking)
	 * @type LexusDynamicLoader
	 */
	launchIFrameOverlayOnload: function(){		
		var params = Address.getParameters();			
		if(params['launchIFrameOverlay'] && params['launchIFrameOverlay'] == 'true') {
			IFrameOverlay.launchOverlay(params['filepath']);
		}	
	},
	/**
	 * Method called after the generic overlay library has been loaded.  Serves as a passthrough to the launch function within the generic overlay.
	 * @param contentURL string that contains the path/file that will be loaded into the overlay
	 * @type LexusDynamicLoader
	 */
	callBackIFrameOverlay: function(iframeParams){
		IFrameOverlay.launchOverlayLoaded(iframeParams);	
		//this._clearModalIndicator()
	},
	/**
	 * Method to close overlay
	 * @type LexusDynamicLoader
	 */
	_closeIFrameOverlay: function() {
		/* Check to see if Iframe Overlay SRC has been loaded/Registered by
		 * the dynamicLibraryLoader yet.
		 */
		if(dynamicLibraryLoader.findLibraryInArray(dynamicLibraryLoader.queue,this._EXTJS_IFRAMEOVERLAY_SRC)){
			// Cancel scheduled LaunchGallery Callback 
			dynamicLibraryLoader.cancelCallback(this._EXTJS_IFRAMEOVERLAY_SRC);
		} else {	
			if(IFrameOverlay.destroyOverlayLoaded) IFrameOverlay.destroyOverlayLoaded();
		}
		this.clearStage();
		if(this.cacher) Event.stopObserving(this.cacher);
	}
});
var lexusDynamicLoader = new LexusDynamicLoader();
function GalleryManager(){};
GalleryManager.launchGallery = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_GALLERY, arguments)};
GalleryManager.closeGallery = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_CLOSEGALLERY, arguments)};
onPageLoadEvents.addAction(lexusDynamicLoader.launchGalleryOnload);

function GenericOverlay(){};
GenericOverlay.launchOverlay = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_GENERICOVERLAY, arguments)};
GenericOverlay.destroyOverlay = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_CLOSEGENERICOVERLAY)};
onPageLoadEvents.addAction(lexusDynamicLoader.launchOverlayOnload);

function IFrameOverlay(){};
IFrameOverlay.launchOverlay = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_IFRAMEOVERLAY, arguments)};
IFrameOverlay.destroyOverlay = function() {lexusDynamicLoader.callExternalScript(lexusDynamicLoader._EXTJS_CLOSEIFRAMEOVERLAY)};
onPageLoadEvents.addAction(lexusDynamicLoader.launchIFrameOverlayOnload);

/**
 * Object to hold constants containing paths and/or files to be launched using the GenericOverlay.launchOverlay function above.
 * The use of these constants is to ease maintainance/updating the location of these files.
 */
function OverlayFiles(){};
OverlayFiles.LSH_CORE = 'lsh_core/lsh_core.html';
OverlayFiles.HY_CORE = '/hybriddrive/flash/hybridOverlay.html';
OverlayFiles.ES_CARDS = '/models/ES/features/performance/overlay/swf/EScardsOverlay.html';
OverlayFiles.SIFFORD = '/about/partnerships/charlesSiffordOverlay.html';
OverlayFiles.DISCOVERY = '/discoveryOverlay/discoveryOverlay.html';

/**
 * @fileoverview  overlayTracking.js is used for Omniture Tracking the Generic Overlay Component and Gallery
 * @author Ernesto Johnson (ernesto@dhapdigital.com)
 * <br/> <br/>
 * Documentation is generated by JSDoc (http://jsdoc.sourceforge.net/)
 */
var OverlayTracking = Class.create();
Object.extend(OverlayTracking.prototype, {
	/**
	 * Class holds the s_pageName value used for Omniture Tracking and functions to ping Omniture server
	 * @constructor
	 */	
	initialize: function() {
		
		this.TYPE_GENERIC = "Generic Overlay";
		this.TYPE_GALLERY = "Gallery";

		this.OVERLAYTRACK_LAUNCH = "Overlay Launch";
		this.OVERLAYTRACK_CLOSE = "Overlay Close";

		this.modelName = ''; //Currently selected Gallery Model (e.g. "IS")
		this.currentTab = ''; //Currently selected Gallery Tab (e.g. "Photos")
		this.currentSubTab = ''; //Currently selected Gallery Sub Tab (e.g. "Exterior")
		this.currentModifier = ''; //Additional tracking info (e.g. [photo #] "1").  May include multiple items (number and size for example)
		this.galleryClosing = false; //Boolean
		
		this.yldTag = window.location.href.indexOf("yldTag=1") != -1;
		
		this.TAB_PHOTO = "Photo";
		this.TAB_COLOR = "Color";
		this.TAB_360 = "360 View";
		this.TAB_VIDEO = "Video";
		this.TAB_WALLPAPER = "Wallpaper";
		this.TAB_SCREENSAVER = "Screensaver";
		
		this.TAB_SUB_EXT = "Exterior";
		this.TAB_SUB_INT = "Interior";
		this.TAB_SUB_FLA = "Flash";
		this.TAB_SUB_MODELHIGHLIGHTS= "Model Highlights";
		this.TAB_SUB_COMMERCIALS= "Commercials and Videos";
		
		this.TAB_MOD_DOWNLOADPC = "Download PC";
		this.TAB_MOD_DOWNLOADMAC = "Download Mac";
		
		this.GALLERY_CLOSE = "Close";
		
		this.galleryTagType="Gallery";  
		this.genericSection="Model Section"; 
 	},	
	SetTagVariables: function() {
		if (PAGE_ID=='Special') {this.galleryTagType="Gallery:Alt";}
		if (this.galleryType=='Concept'){this.genericSection="FCV"}
		if (this.currentSubTab==""){this.currentSubTab="Combo"}
	},
	overlayTrack: function(eventType) {
		switch(eventType){
			case this.OVERLAYTRACK_LAUNCH:
				try{ 
					
				} catch(e) { 
					/*error*/ 
				}	
			break;
			case this.OVERLAYTRACK_CLOSE:
				try{ 
					
				} catch(e) { 
					/*error*/ 
				}		
			break;
		}
	},
	galleryClose: function(){
		this.galleryClosing = true;
		//this.galleryTrack();
		this.galleryClosing = false;
	},
	galleryTrack: function() {	
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.1,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
			fireTag(1253.1,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
		
		}catch(err){} 
		return;
	},
	galleryPhotoTrack: function() {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.2,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<image_num>':this.currentModifier,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}): 
			fireTag(1253.2,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<image_num>':this.currentModifier,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
		}catch(err){} 
		return;
	},
	galleryColorsTrack: function() {
		this.SetTagVariables();
		// try{ 
			this.yldTag == true ?
			fireTag(2324.3,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
			fireTag(1255.1,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection});
		// }catch(err){} 
		// return;
	},
	galleryColorsSwatch: function() {
		//fireTag(1255.2,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<color>':this.currentModifier}); 
		return;
	},
	galleryVirtualToursTrack: function() {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.4,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}): 
			fireTag(1258.1,{'<model_name>':this.modelName,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
		}catch(err){} 
		return;
	},
	galleryVideoTrack: function() {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.5,{'<model_name>':this.modelName,'<video_title>':this.currentModifier,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
			fireTag(1260.1,{'<model_name>':this.modelName,'<video_title>':this.currentModifier,'<category>':this.currentSubTab,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection});
		}catch(err){} 
		return;
	},
	galleryWallPapersTrack: function() {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.6,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}): 
			fireTag(1261.1,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
		}catch(err){} 
		return;
	},
	galleryWallPapersDownload: function(x,y) {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.7,{'<model_name>':this.modelName,'<image_num>':x,'<image_size>':y,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
			fireTag(1261.2,{'<model_name>':this.modelName,'<image_num>':x,'<image_size>':y,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection});
		}catch(err){} 
		return;
	},
	galleryScreenSaversTrack: function() {
		this.SetTagVariables();
		try{ 
			this.yldTag == true ?
			fireTag(2324.8,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
			fireTag(1262.1,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
		}catch(err){} 
		return;
	},
	galleryScreenSaversDownload: function(x) {
		this.SetTagVariables();
		if(x=='pc'){
			try{ 
				this.yldTag == true ?
				fireTag(2324.9,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}): 
				fireTag(1262.2,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
			}catch(err){} 
		} else {
			try{ 
				this.yldTag == true ?
				fireTag('2324.10',{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}):
				fireTag(1262.3,{'<model_name>':this.modelName,'<gallery_type>':this.galleryTagType,'<generic_site_section>':this.genericSection}); 
			}catch(err){} 
		}
		return; 
	},
	gallerySetModelName: function(str) {this.modelName = str;},
	gallerySetGalleryType: function(str) {this.galleryType = str;},
	gallerySetCurrentTab: function(str){this.currentTab = str;},
	gallerySetCurrentSubTab: function(str){this.currentSubTab = str;},
	gallerySetModifier: function(str){this.currentModifier = " " + str;},
	galleryAddModifier: function(str){this.currentModifier += " " + str;},
	galleryResetModifier: function(){this.currentModifier = "";},
	galleryResetProperties: function() {
		this.modelId = ''; 
		this.currentTab = '';
		this.currentSubTab = '';
		this.currentModifier = '';
		this.galleryClosing = false;
	}
});

closeOverlay = function(x) {
	var so = new SWFObject("/lexus-share/overlay-components/assets/deactivate.swf", "Deactivate", "1", "1", "8", "#000000");
	so.write(x);
	GenericOverlay.destroyOverlay();
}

var OverlayTracker = new OverlayTracking();
var GalleryTracker = new OverlayTracking();
