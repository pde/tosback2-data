//////////////////////////////////////core API object/////////////////////////////////////
var Dom = {
	//internet explorer detection (true|false)
	ie: function(){
		var isitOpera = "no";
		if(navigator.userAgent.indexOf("Opera")!=-1){
		var versionindex=navigator.userAgent.indexOf("Opera")+6
		if (parseInt(navigator.userAgent.charAt(versionindex))>=8)
		isitOpera = "yes";
		}
		if((document.all) && (isitOpera != "yes"))return 1
		return 0
	},
	
	//scanned html elements array
	tags: ['div','img','span','ul'],
	
	//(string|(full|att|single))
	fragment: function(str,type){
		if(type == 'att')return '(?:'+str+'=\".*?)((\n|\r|.)*?)(?:\")'
		if(type == 'single')return '(?:<'+str+'.*?)((\n|\r|.)*?)(?:\/>)'
		return '(?:<'+str+'.*?>)((\n|\r|.)*?)(?:<\/'+str+'>)'
	},
	
	//include needed JavaScript Files
	getJS: function(){
		var head = document.getElementsByTagName('head')[0]
		for(var i = 0; i < arguments.length; i++) {
			var include = document.createElement('script')
			include.src = arguments[i]
			include.type = "text/javascript"
			head.appendChild(include);
		}
	},
	
	//initiate the api
	father: function(opt){
		if(!opt)var opt = Dom.tags
		for(i=0; i<opt.length; i++){
			var obj = document.getElementsByTagName(opt[i])
			for(j=0; j<obj.length; j++){
				var elm = obj[j]
				if(elm.getAttribute('hotness')){
					Dom.json(elm,elm.getAttribute('hotness').exe())
				}	
			}	 
		}
	},
	
	//parse the JSON Object
	json: function(elm,obj){
		if(obj.ref){
		}
		if(obj.actions){
			for(var i=0; i<obj.actions.length; i++){
				for(property in obj.actions[i]){
					if(property == "para"){
						var thePara = obj.actions[i][property]
					}else{
						var theCall = obj.actions[i][property]
						var theCat = property
					}
				}
			window[theCat][theCall](elm,thePara)
			}
		}
		if(obj.end){
		}
	}
}

//holder for global variables
var Global = {}
Global.ie = Dom.ie()

//Wizzles object
var Wizzle = {}




//////////////////////////////////////////////////////////////////////
Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}

///////////////////////////////find elements by ID/////////////////////////////
$ = function(){
 	var elements = [];
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')element = document.getElementById(element);
		if (arguments.length == 1)return element;
		elements.push(element);
  	}
	return elements;
}

///////////////////////////////find elements by tag name////////////////
//ele = tag array
//obj = parent element
$T = function(ele,obj){
	var elements = [];
	for (var i = 0; i < ele.length; i++) {
		if(obj){
			var temp = $(obj).getElementsByTagName(ele[i])
		}else{
			var temp = document.getElementsByTagName(ele[i])
		}
		for(var j=0; j<temp.length; j++){
			elements.push(temp[j])
		}
	}
	return elements;
}

///////////////////////////////find elements by class name////////////////
$C = document.getElementsByClassName = function(className, parentElement) {
  var children = ($(parentElement) || document.body).getElementsByTagName('*');
  return $A(children).inject([], function(elements, child) {
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
      elements.push(child);
    return elements;
  });
}

$E = function(tag,elm,para){
	var obj = document.createElement(tag)
	if(para.className)obj.className = para.className
	if(para.id)obj.id = para.id
	if(para.href)obj.href = para.href
	if(para.src)obj.src = para.src
	if(para.html)obj.innerHTML = para.html
	if(para.element)obj.appendChild = para.element
	if(para.onclick)obj.onclick = para.onclick
	elm.appendChild(obj)
	return obj
}

///////////////////////////////include js files //////////////////////
/*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/
var Prototype = {
  Version: '1.4.0',
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

Object.inspect = function(object) {
  try {
    if (object == undefined) return 'undefined';
    if (object == null) return 'null';
    return object.inspect ? object.inspect() : object.toString();
  } catch (e) {
    if (e instanceof RangeError) return '...';
    throw e;
  }
}

Object.extendExcept = function(destination,source,opt){
	for (property in source) {
    	var doit = false
		doit = opt.detect(function(v,i){
			if(v == property){
				return true
			}else{
				return false	
			}
		});
		if(!doit){
			destination[property] = source[property];
		}
	}
  	return destination;
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

////////////////////////////////////////////////////////////////////

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

//BEGIN EXTEND STRING
Object.extend(String.prototype, {
  
  isString: function(){
	  return 'string'
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
  
  //convert string to object
	exe: function(){
		return(eval('[' + this + ']')[0])
	},
	
	//create unique Number
	uId: function(){
		return this + "u" + new Date().getTime() + parseInt(10000*Math.random())
	},
	
	extract: function(frag){
		var matchAll = new RegExp(frag, 'img');
		var matchOne = new RegExp(frag, 'im');
		return (this.match(matchAll) || []).map(function(tag) {
		  return (tag.match(matchOne) || ['', ''])[1];
		});
	},
	
	extractScripts: function() {
		return this.extract(Dom.fragment('script'))
	},
	
	extractLinks: function() {
		return this.extract(Dom.fragment('link','single'))
	},
	
	extractStyles: function() {
		return this.extract(Dom.fragment('style'))
	},
	
	extractLongTag: function(tag) {
		return this.extract(Dom.fragment(tag))
	},
	
	extractShortTag: function(tag) {
		return this.extract(Dom.fragment(tag,'single'))
	},
	
	extractAttribute: function(name) {
		return this.extract(Dom.fragment(name,'att'))
	},
	
	stripScripts: function() {
    	return this.replace(new RegExp(Dom.fragment('script'), 'img'), '');
  	},
	
	stripLinks: function() {
    	return this.replace(new RegExp(Dom.fragment('link','single'), 'img'), '');
  	},
	
	stripStyles: function() {
    	return this.replace(new RegExp(Dom.fragment('style'), 'img'), '');
  	},
	
	stripTags: function() {
    	return this.replace(/<\/?[^>]+>/gi, '');
  	},
	
	toArray: function() {
    	return this.split('');
  	},
	
	vert: function(){
		var html = ''
		var ary = this.toArray()
		for(var i=0; i<ary.length; i++){
			html = html + ary[i] + '<br />'
		}
		return html
	},
	
	trim: function(){
		var obj = this.replace(/^\s+/,'')
		return obj.replace(/$\s+/,'')
	}
});
//END EXTEND STRING


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
  }
}

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});


var Transform = {
	toQueryString: function(par){
		if(typeof par != "Array"){
			var ary = []
			for(v in par){
				if(objectType(par[v]) == 'array'){
					for(var i=0; i<par[v].length; i++){
						ary.push(v+'='+par[v][i])
					}
				}else{
					try{
						ary.push(v+'='+par[v]())	
					}catch(e){
						ary.push(v+'='+par[v])
					}
					
				}
			}
		}
		return ary.join('&')
	}
}	

var Imagize = {
	Imagizer: function(className){
		if(!className){
			var className = 'imagize'
		}
		var ary = String(this).toArray()
		var holder = document.createElement('div')
		holder.className = className
		ary.each(function(v,i){
			if(v == '$')v = 'dollar'
			if(v == '.')v = 'dot'
			if(v == ',')v = 'comma'
			var node = document.createElement('div')
			node.className = "i"+v
			holder.appendChild(node)
		});
		return holder
	}
}
Object.extend(String.prototype, Imagize)

////////////////////////////////////////////////////////////////////////////
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

//BEGIN EXTEND ARRAY
Object.extend(Array.prototype, Enumerable);
Object.extend(Array.prototype, Transform);
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
	},
	
	DESC: function(p){
		if(p){
			this.sort(function(a,b){
				x = a[p]
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b[p]
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return -1;
				if (y > x)return 1;
				return 0;
			});
		}else{
			this.sort(function(a,b){
				
				x = a
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				
				if (x > y)return -1;
				if (y > x)return 1;
				return 0;
			});
		}
	},
	
	ASC: function(p){
		if(p){
			this.sort(function(a,b){
				x = a[p]
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b[p]
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return 1;
				if (y > x)return -1;
				return 0;
			});
		}else{
			this.sort(function(a,b){
				
				x = a
				if(!parseInt(x)){
				x = String(x).toUpperCase()
				}
				
				y = b
				if(!parseInt(y)){
				y = String(y).toUpperCase()
				}
				
				if (x > y)return 1;
				if (y > x)return -1;
				return 0;
			});
		}
		
		
	},
	
	isArray: function(){
		return 'array'
	}
});

//END EXTEND ARRAY

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

/////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////
var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}



//BEGIN EXTEND ELEMENT
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

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
  },

  update: function(element, html) {
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
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

  setStyle: function(element, style) {
    element = $(element);
    for (name in style)
      
	  if(name == 'opacity' && Global.ie){
			element.filters.Alpha.Opacity = style[name] * 100;
	  }
	  element.style[name.camelize()] = style[name];
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
	},
	
  	getStyle: function(element, style) {
		element = $(element);
		
		if(style == 'opacity' && Global.ie){
			return parseInt(element.filters.Alpha.Opacity)/100
		}
		
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
	
	//return array of 1st child elements
	getChildElements: function(obj,ele){
		if(obj.hasChildNodes()){
			var elm = []
			for(var i=0; i<obj.childNodes.length; i++ ){
				if(obj.childNodes[i].tagName){
					if(ele){
						if(obj.childNodes[i].tagName.toLowerCase() == ele) elm.push(obj.childNodes[i])
					}else{
						elm.push(obj.childNodes[i])
					}
				}
			}
			if(elm.length == 0)return false
			return elm
		}
		return false
	},
	
	//returns the dems of child elements
	getChildDem: function(obj){
		var temp = Element.getChildElements(obj)
		var h = 0
		var w = 0
		for(var i=0; i<temp.length; i++){
			h += parseInt(temp[i].offsetHeight)
			w += parseInt(temp[i].offsetWidth)
		}
		return {height:h,width:w}
	},
	
	//convert object reference to a unque id or pass id
	toId: function(obj){
		if(obj.id)return obj.id
		return obj.id = new String().uId()
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
	
	addAttributeString: function(node,rec,atts){
		for(var i=0; i<atts.length; i++){
			var temp = atts[i]
			var att = rec.extractAttribute(temp)
			if(att!='')node[temp] = att
		}
	}
  
});

//END EXTEND ELEMENT

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

//////////////////////////////////////////////////////////////////////////////
var $F = Form.Element.getValue;

/////////////////////////////////////////////////////////////////////////////

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

  observers: false,
  
  element: function(event) {
    return event.target || event.srcElement;
  },
  
  keyCode: function(event){
	  return event.keyCode || event.which 
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
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
  
  	_observeAndCache: function(element, name, observer, useCapture) {
	    if (!this.observers) this.observers = [];
	    if (element.addEventListener) {
	      this.observers.push([element, name, observer, useCapture]);
	      element.addEventListener(name, observer, useCapture);
	    } else if (element.attachEvent) {
	      this.observers.push([element, name, observer, useCapture]);
	      element.attachEvent('on' + name, observer);
	    }
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
	
	    this._observeAndCache(element, name, observer, useCapture);
	},
	
	stopObserving: function(element, name, observer, useCapture) {
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
	
	pointerX: function(event) {
    	return event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	},
	
	pointerY: function(event) {
		return event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	}
  
});

// prevent memory leaks in IE 
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
	    do{
	      valueT += element.offsetTop  || 0;
	      valueL += element.offsetLeft || 0;
	      element = element.offsetParent;
	    }while (element);
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

/////////////////////////////////// extend DATE ///////////////////////////////////////
Object.extend(Date.prototype,
	{
	//JSON object of new paramerters and methods
	
	//find the last day of the month
	getLastDay: function(){
		for(var i=28; i<33; i++){
			this.setDate(i)
			if(this.getDate() == 1){
				this.setDate(this.getDate()-(i-1))
				return i-1
			}
		}
	},
	
	//turn month into text
	getTextMonth: function(){
		var month = this.getMonth()
		if(month == 0)return "January"
		if(month == 1)return "February"
		if(month == 2)return "March"
		if(month == 3)return "April"
		if(month == 4)return "May"
		if(month == 5)return "June"
		if(month == 6)return "July"
		if(month == 7)return "August"
		if(month == 8)return "September"
		if(month == 9)return "October"
		if(month == 10)return "November"
		if(month == 11)return "December"
	},
	
	//turn day of week into text
	getTextDay: function(){
		var day = this.getDay()
		if(day == 0)return "Sunday"
		if(day == 1)return "Monday"
		if(day == 2)return "Tuesday"
		if(day == 3)return "Wednesday"
		if(day == 4)return "Thursday"
		if(day == 5)return "Friday"
		if(day == 6)return "Saturday"
	}
	
	//END JSON object
	});

/////////////////////////////////// extend NUMBER ///////////////////////////////////////
Object.extend(Number.prototype, Imagize)
Object.extend(Number.prototype,
	{
	//JSON object of new paramerters and methods
	
	//number suffix
	suff: function(){
		var str = this.toString()
		var count = parseInt(str.length -1)
		if(this == 0)return this
		if((str[count]>3 && str[count]<10) || str[count-1]==1 && count != 0 )return this + "th"
		if(str[count] == 1)return this + "st"
		if(str[count] == 2)return this + "nd"
		if(str[count] == 3)return this + "rd"
		return this + "th"
	},
	
	hex: function() {
		var digits = this.toString(16);
		if (this < 16) return '0' + digits;
		return digits;
	},
	
	succ: function(skip) {
		if(skip)return this + skip;
		return this + 1;
  	},
	
	isNumber: function(){
		return 'number'
	},
	
	round: function(places){
		return Math.round(this*(Math.pow(10,places)))/Math.pow(10,places)
	},
	
	dollars: function(){
		var num = this.round(2)
		num = num.toString()
		var dec = num.indexOf(new String('.'))
		if(dec == -1){
			num = num.concat(new String('.00'))   
		}else if(((num.length-1) - dec) == 1){
			num = num.concat(new String('0'))
		}
		return '$'+num
	}
	
	//END JSON object
	});

var objectType = function(s){
	var result = false
	result = Try.these(
		s.isArray,
		s.isString,
		s.isNumber
	);
	return result
}

Object.JSONstring = function(obj){
	var text = ''
	
	if(obj.constructor == Array){
		arrayRecusive(obj);
	}else if(obj.constructor == Object){
		objectRecusive(obj);
	}else{
		return false;
	}
	
	return text
	
	function dec(v){
		if(v.constructor == Array){
				arrayRecusive(v)
		}
		else if(v.constructor == Number){
			text += v;
		}
		else if(v.constructor == String){
			text += '"'+v+'"';
		}
		else if(v.constructor == Boolean){
			text += v;
		}
		else if(v.constructor == Object){
			objectRecusive(v);
		}
		else if(v.constructor == Function){
			text += v;
		}
	}
	
	//scan object
	function objectRecusive(obj){
		
		text += '{';
		var i = 0
		var j = 0
		
		for(q in obj)i++
		
		if(i>0){
			for(q in obj){
				j++
				text += '"'+q+'": '
				
				dec(obj[q]);
				
				if(j<i){
					text += ','
				}
			}
		}
		text += '}'
	}
	
	//scan array
	function arrayRecusive(ary){
		text += '['
		if(ary.length > 0){
			ary.each(function(v,i){
				
				dec(v);
				
				if(i<(ary.length-1)){
					text += ','
				}
			
			});
		}
		text += ']'
	}
}

var Time = {
	toStdTime: function(){
		var i = parseInt(this)
		if(i == 0 || i == 2400){
			return '12:00 AM'
		}else if(i==1200){
			return '12:00 PM'
		}else{
			if(i<1200){
				var str = String(i)
				var end = "AM"
			}else{
				var str = String(i-1200)
				var end = "PM"
			}
			return str.substring(0,(str.length-2))+':'+str.substr((str.length-2),2)+ ' ' + end
		}
	}
}
Object.extend(String.prototype,Time)
Object.extend(Number.prototype,Time)


var Size = {
	/*opperators and values
	skip(int)
	pause(int)
	maxHeight(child|int|same)
	maxWidth(child|int|same)
	timerVar(string)
	*/
	grow: function(ref,para){
		//set default paramenters
		var paraObj = {
		skip: 10,
		pause: 20,
		maxHeight: "child",
		maxWidth: "child",
		timerVar: "t"
		}
		
		//incorporate adjusted parameters
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		if(paraObj.maxHeight == "child" || paraObj.maxWidth == "child"){
			//get dementions of inner container
			var temp = Element.getChildDem($(ref))
			
			if(paraObj.maxHeight == "child"){
				paraObj.maxHeight = temp.height
			}
			if(paraObj.maxWidth == "child"){
				paraObj.maxWidth = temp.width
			}
		}
		
		Global.timerVarH = paraObj.timerVar + "h"
		Global.timerVarW = paraObj.timerVar + "w"
		
		//grow width
		if(paraObj.maxWidth !== "same"){
			clearInterval(Global[Global.timerVarW])
			//Size.growI('width',ref,paraObj.maxWidth,paraObj.skip,Global.timerVarW)
			Global[Global.timerVarW] = setInterval("Size.growI('width','"+ref+"',"+paraObj.maxWidth+","+paraObj.skip+",'"+Global.timerVarW+"')",paraObj.pause)
		}
		
		//grow height
		if(paraObj.maxHeight !== "same"){
			clearInterval(Global[Global.timerVarH])
			//Size.growI('height',ref,paraObj.maxWidth,paraObj.skip,Global.timerVarH)
			Global[Global.timerVarH] = setInterval("Size.growI('height','"+ref+"',"+paraObj.maxHeight+","+paraObj.skip+",'"+Global.timerVarH+"')",paraObj.pause)
		}
	},
	/*opperators and values
	skip(int)
	pause(int)
	minHeight(innerDiv|int|same)
	minWidth(innerDiv|int|same)
	timerVar(string)
	*/
	shrink: function(ref,para){
		//set default paramenters
		var paraObj = {
		skip: 10,
		pause: 20,
		minHeight: 0,
		minWidth: 0,
		timerVar: "t"
		}
		
		//incorporate adjusted parameters
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		if(paraObj.minHeight == "child" || paraObj.minWidth == "child"){
			//get dementions of inner container
			var temp = Element.getChildDem($(ref))
			if(paraObj.minHeight == "child"){
				paraObj.minHeight = temp.height
			}
			if(paraObj.minWidth == "child"){
				paraObj.minWidth = temp.width
			}
		}
		
		Global.timerVarH = paraObj.timerVar + "h"
		Global.timerVarW = paraObj.timerVar + "w"
		
		//shrink width
		if(paraObj.minWidth !== "same"){
			clearInterval(Global[Global.timerVarW])
			Size.shrinkI('width',ref,paraObj.maxWidth,paraObj.skip,Global.timerVarW)
			Global[Global.timerVarW] = setInterval("Size.shrinkI('width','"+ref+"',"+paraObj.minWidth+","+paraObj.skip+",'"+Global.timerVarW+"')",paraObj.pause)
		}
		
		//shrink height
		if(paraObj.minHeight !== "same"){
			clearInterval(Global[Global.timerVarH])
			Size.shrinkI('height',ref,paraObj.maxWidth,paraObj.skip,Global.timerVarH)
			Global[Global.timerVarH] = setInterval("Size.shrinkI('height','"+ref+"',"+paraObj.minHeight+","+paraObj.skip+",'"+Global.timerVarH+"')",paraObj.pause)
		}
	},
	
	growI: function(d,r,p,i,t){
		var obj = $(r).style
		if((parseInt(obj[d] || Element.getStyle($(r),d)) + i) <= p)return obj[d] = parseInt(obj[d] || Element.getStyle($(r),d)) + i + 'px'
		if(parseInt(obj[d] || Element.getStyle($(r),d)) < p)return obj[d] = p + 'px'
		clearInterval(Global[t])
	},
	
 	shrinkI: function(d,r,p,i,t){
		var obj = $(r).style
		if((parseInt(obj[d] || Element.getStyle($(r),d)) - i) >= p)return obj[d] = parseInt(obj[d] || Element.getStyle($(r),d)) - i + 'px'
		if(parseInt(obj[d] || Element.getStyle($(r),d)) > p)return obj[d] = p + 'px'
		clearInterval(Global[t])
	}

}
	
var Opacity = {
	/*opperators and values
	skip(int)
	pause(int)
	maxO(float)
	timerVar(string)
	onComplete
	*/
	plus: function(ref,para){
		
		//set default paramenters
		var paraObj = {
			skip: .05,
			pause: 40,
			maxO: 1,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		ref = Element.toId(ref)
		Global.timerVar = paraObj.timerVar
		
		clearInterval(Global[Global.timerVar])
		Opacity.plusI(ref,paraObj.maxO,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Opacity.plusI('"+ref+"',"+paraObj.maxO+","+paraObj.skip+",'"+Global.timerVar+"',"+paraObj.onComplete+")",paraObj.pause)
	},
	
	/*opperators and values
	skip(int)
	pause(int)
	minO(float)
	timerVar(string)
	*/
	minus: function(ref, para){
		//set default paramenters
			var paraObj = {
			skip: .05,
			pause: 40,
			minO: 0,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		Global.timerVar = paraObj.timerVar
		
		clearInterval(Global[Global.timerVar])
		Opacity.minusI(ref,paraObj.minO,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Opacity.minusI('"+ref+"',"+paraObj.minO+","+paraObj.skip+",'"+Global.timerVar+"',"+paraObj.onComplete+")",paraObj.pause)
	},
	
	plusI: function(r,o,i,t,c){
		
		if(Global.ie){
			var co = parseInt($(r).filters.Alpha.Opacity)
			if(co < (parseFloat(o)*100))return $(r).filters.Alpha.Opacity = co + (parseFloat(i)*100)
			clearInterval(Global[t])
			if(c)c()
		}else{
			var co = parseFloat($(r).style.opacity || Element.getStyle($(r),'opacity'))
			if(co < parseFloat(o))return $(r).style.opacity= (co + parseFloat(i))
			clearInterval(Global[t])
			if(c)c()
		}
	},
	
	minusI: function(r,o,i,t,c){
		if(Global.ie){
			var co = parseInt($(r).filters.Alpha.Opacity)
			if(co > (parseFloat(o)*100))return $(r).filters.Alpha.Opacity = co - (parseFloat(i)*100)
			clearInterval(Global[t])
			if(c)c()
		}else{
			var co = parseFloat($(r).style.opacity || Element.getStyle($(r),'opacity'))
			if(co > parseFloat(o))return $(r).style.opacity= (co - parseFloat(i))
			clearInterval(Global[t])
			if(c)c()
		}
	}
}

var Scroll = {
	/*opperators and values
	skip(int)
	pause(int)
	point(px)
	timerVar(string)
	onComplete
	*/
	down: function(ref, para){
		
		//set default paramenters
			var paraObj = {
			skip: 10,
			pause: 10,
			point: 0,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		Global.timerVar = paraObj.timerVar
		clearInterval(Global[Global.timerVar])
		Scroll.minusI('top',ref,paraObj.point,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Scroll.minusI('top','"+ref+"',"+paraObj.point+","+paraObj.skip+",'"+Global.timerVar+"',"+ paraObj.onComplete +")",paraObj.pause)
	},
	
	up: function(ref, para){
		
		//set default paramenters
			var paraObj = {
			skip: 10,
			pause: 10,
			point: 0,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		Global.timerVar = paraObj.timerVar
		
		clearInterval(Global[Global.timerVar])
		Scroll.plusI('top',ref,paraObj.point,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Scroll.plusI('top','"+ref+"',"+paraObj.point+","+paraObj.skip+",'"+Global.timerVar+"',"+ paraObj.onComplete +")",paraObj.pause)
	},
	
	left: function(ref, para){
		//set default paramenters
			var paraObj = {
			skip: 10,
			pause: 10,
			point: 0,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		Global.timerVar = paraObj.timerVar
		clearInterval(Global[Global.timerVar])
		Scroll.plusI('left',ref,paraObj.point,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Scroll.plusI('left','"+ref+"',"+paraObj.point+","+paraObj.skip+",'"+Global.timerVar+"',"+ paraObj.onComplete +")",paraObj.pause)
	},
	
	right: function(ref,para){
		//set default paramenters
			var paraObj = {
			skip: 10,
			pause: 10,
			point: 0,
			timerVar: "t",
			onComplete: false
		}
		
		paraObj = Object.extend(paraObj,para)
		
		ref = Element.toId(ref)
		
		Global.timerVar = paraObj.timerVar
		clearInterval(Global[Global.timerVar])
		Scroll.minusI('left',ref,paraObj.point,paraObj.skip,Global.timerVar,paraObj.onComplete)
		Global[Global.timerVar] = setInterval("Scroll.minusI('left','"+ref+"',"+paraObj.point+","+paraObj.skip+",'"+Global.timerVar+"',"+ paraObj.onComplete +")",paraObj.pause)
	},
	
	minusI: function(d,r,p,i,t,c){
		var obj = $(r).style
		if((parseInt(obj[d] || Element.getStyle($(r),d)) - i) >= p)return obj[d] = parseInt(obj[d] || Element.getStyle($(r),d)) - i + 'px'
		if(parseInt(obj[d] || Element.getStyle($(r),d)) > p)return obj[d] = p + 'px'
		clearInterval(Global[t])
		if(c)c()
	},
	
	plusI: function(d,r,p,i,t,c){
		var obj = $(r).style
		if((parseInt(obj[d] || Element.getStyle($(r),d)) + i) <= p)return obj[d] = parseInt(obj[d] || Element.getStyle($(r),d)) + i + 'px'
		if(parseInt(obj[d] || Element.getStyle($(r),d)) < p)return obj[d] = p + 'px'
		clearInterval(Global[t])
		if(c)c()
	}
	
	
}

var Move = {
	down: Scroll.up,
	up: Scroll.down,
	left: Scroll.right,
	right: Scroll.left
}














/////////////////////////////////////AJAX object/////////////////////////////

var Xml = {
	create: function(){
		if(window.ActiveXObject)return new ActiveXObject("Microsoft.XMLDOM")
		return document.implementation.createDocument("","",null);
	},
	
	get: function(url){
		xmlDoc = this.create()
		xmlDoc.async=false;
		xmlDoc.load(url);
		return(xmlDoc);
	}
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
    this.setOptions(options);
    this.request(url);
  },

  request: function(url) {
    var parameters = this.options.parameters || '';
    if (parameters.length > 0) parameters += '&_=';

    try {
      this.url = url;
      if (this.options.method == 'get' && parameters.length > 0)
        this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;

      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.options.method, this.url,
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
    if (event == 'Complete')
      this.transport.onreadystatechange = Prototype.emptyFunction;
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.containers = {
      success: container.success ? $(container.success) : $(container),
      failure: container.failure ? $(container.failure) :
        (container.success ? null : $(container))
    }

    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, object) {
      this.updateContent();
      onComplete(transport, object);
    }).bind(this);

    this.request(url);
  },

  updateContent: function() {
    var receiver = this.responseIsSuccess() ?
      this.containers.success : this.containers.failure;
    var response = this.transport.responseText;

    if (!this.options.evalScripts)
      response = response.stripScripts();

    if (receiver) {
      if (this.options.insertion) {
        new this.options.insertion(receiver, response);
      } else {
        Element.update(receiver, response);
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
