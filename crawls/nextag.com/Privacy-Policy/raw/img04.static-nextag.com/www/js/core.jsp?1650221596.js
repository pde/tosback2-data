







//MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={'version':'1.2.5','build':'008d8f0f2fcc2044e54fdd3635341aaab274e757'};var Native=function(options){options=options||{};var name=options.name;var legacy=options.legacy;var protect=options.protect;var methods=options.implement;var generics=options.generics;var initialize=options.initialize;var afterImplement=options.afterImplement||function(){};var object=initialize||legacy;generics=generics!==false;object.constructor=Native;object.$family={name:'native'};if(legacy&&initialize)object.prototype=legacy.prototype;object.prototype.constructor=object;if(name){var family=name.toLowerCase();object.prototype.$family={name:family};Native.typize(object,family);}
var add=function(obj,name,method,force){if(!protect||force||!obj.prototype[name])obj.prototype[name]=method;if(generics)Native.genericize(obj,name,protect);afterImplement.call(obj,name,method);return obj;};object.alias=function(a1,a2,a3){if(typeof a1=='string'){var pa1=this.prototype[a1];if((a1=pa1))return add(this,a2,a1,a3);}
for(var a in a1)this.alias(a,a1[a],a2);return this;};object.implement=function(a1,a2,a3){if(typeof a1=='string')return add(this,a1,a2,a3);for(var p in a1)add(this,p,a1[p],a2);return this;};if(methods)object.implement(methods);return object;};Native.genericize=function(object,property,check){if((!check||!object[property])&&typeof object.prototype[property]=='function')object[property]=function(){var args=Array.prototype.slice.call(arguments);return object.prototype[property].apply(args.shift(),args);};};Native.implement=function(objects,properties){for(var i=0,l=objects.length;i<l;i++)objects[i].implement(properties);};Native.typize=function(object,family){if(!object.type)object.type=function(item){return($type(item)===family);};};(function(){var natives={'Array':Array,'Date':Date,'Function':Function,'Number':Number,'RegExp':RegExp,'String':String};for(var n in natives)new Native({name:n,initialize:natives[n],protect:true});var types={'boolean':Boolean,'native':Native,'object':Object};for(var t in types)Native.typize(types[t],t);var generics={'Array':["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],'String':["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};for(var g in generics){for(var i=generics[g].length;i--;)Native.genericize(natives[g],generics[g][i],true);}})();var Hash=new Native({name:'Hash',initialize:function(object){if($type(object)=='hash')object=$unlink(object.getClean());for(var key in object)this[key]=object[key];return this;}});Hash.implement({forEach:function(fn,bind){for(var key in this){if(this.hasOwnProperty(key))fn.call(bind,this[key],key,this);}},getClean:function(){var clean={};for(var key in this){if(this.hasOwnProperty(key))clean[key]=this[key];}
return clean;},getLength:function(){var length=0;for(var key in this){if(this.hasOwnProperty(key))length++;}
return length;}});Hash.alias('forEach','each');Array.implement({forEach:function(fn,bind){for(var i=0,l=this.length;i<l;i++)fn.call(bind,this[i],i,this);}});Array.alias('forEach','each');function $A(iterable){if(iterable.item){var l=iterable.length,array=new Array(l);while(l--)array[l]=iterable[l];return array;}
return Array.prototype.slice.call(iterable);};function $arguments(i){return function(){return arguments[i];};};function $chk(obj){return!!(obj||obj===0);};function $clear(timer){clearTimeout(timer);clearInterval(timer);return null;};function $defined(obj){return(obj!=undefined);};function $each(iterable,fn,bind){var type=$type(iterable);((type=='arguments'||type=='collection'||type=='array')?Array:Hash).each(iterable,fn,bind);};function $empty(){};function $extend(original,extended){for(var key in(extended||{}))original[key]=extended[key];return original;};function $H(object){return new Hash(object);};function $lambda(value){return($type(value)=='function')?value:function(){return value;};};function $merge(){var args=Array.slice(arguments);args.unshift({});return $mixin.apply(null,args);};function $mixin(mix){for(var i=1,l=arguments.length;i<l;i++){var object=arguments[i];if($type(object)!='object')continue;for(var key in object){var op=object[key],mp=mix[key];mix[key]=(mp&&$type(op)=='object'&&$type(mp)=='object')?$mixin(mp,op):$unlink(op);}}
return mix;};function $pick(){for(var i=0,l=arguments.length;i<l;i++){if(arguments[i]!=undefined)return arguments[i];}
return null;};function $random(min,max){return Math.floor(Math.random()*(max-min+1)+min);};function $splat(obj){var type=$type(obj);return(type)?((type!='array'&&type!='arguments')?[obj]:obj):[];};var $time=Date.now||function(){return+new Date;};function $try(){for(var i=0,l=arguments.length;i<l;i++){try{return arguments[i]();}catch(e){}}
return null;};function $type(obj){if(obj==undefined)return false;if(obj.$family)return(obj.$family.name=='number'&&!isFinite(obj))?false:obj.$family.name;if(obj.nodeName){switch(obj.nodeType){case 1:return'element';case 3:return(/\S/).test(obj.nodeValue)?'textnode':'whitespace';}}else if(typeof obj.length=='number'){if(obj.callee)return'arguments';else if(obj.item)return'collection';}
return typeof obj;};function $unlink(object){var unlinked;switch($type(object)){case'object':unlinked={};for(var p in object)unlinked[p]=$unlink(object[p]);break;case'hash':unlinked=new Hash(object);break;case'array':unlinked=[];for(var i=0,l=object.length;i<l;i++)unlinked[i]=$unlink(object[i]);break;default:return object;}
return unlinked;};var Browser=$merge({Engine:{name:'unknown',version:0},Platform:{name:(window.orientation!=undefined)?'ipod':(navigator.platform.match(/mac|win|linux/i)||['other'])[0].toLowerCase()},Features:{xpath:!!(document.evaluate),air:!!(window.runtime),query:!!(document.querySelector)},Plugins:{},Engines:{presto:function(){return(!window.opera)?false:((arguments.callee.caller)?960:((document.getElementsByClassName)?950:925));},trident:function(){return(!window.ActiveXObject)?false:((window.XMLHttpRequest)?((document.querySelectorAll)?6:5):4);},webkit:function(){return(navigator.taintEnabled)?false:((Browser.Features.xpath)?((Browser.Features.query)?525:420):419);},gecko:function(){return(!document.getBoxObjectFor&&window.mozInnerScreenX==null)?false:((document.getElementsByClassName)?19:18);}}},Browser||{});Browser.Platform[Browser.Platform.name]=true;Browser.detect=function(){for(var engine in this.Engines){var version=this.Engines[engine]();if(version){this.Engine={name:engine,version:version};this.Engine[engine]=this.Engine[engine+version]=true;break;}}
return{name:engine,version:version};};Browser.detect();Browser.Request=function(){return $try(function(){return new XMLHttpRequest();},function(){return new ActiveXObject('MSXML2.XMLHTTP');},function(){return new ActiveXObject('Microsoft.XMLHTTP');});};Browser.Features.xhr=!!(Browser.Request());Browser.Plugins.Flash=(function(){var version=($try(function(){return navigator.plugins['Shockwave Flash'].description;},function(){return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');})||'0 r0').match(/\d+/g);return{version:parseInt(version[0]||0+'.'+version[1],10)||0,build:parseInt(version[2],10)||0};})();function $exec(text){if(!text)return text;if(window.execScript){window.execScript(text);}else{var script=document.createElement('script');script.setAttribute('type','text/javascript');script[(Browser.Engine.webkit&&Browser.Engine.version<420)?'innerText':'text']=text;document.head.appendChild(script);document.head.removeChild(script);}
return text;};Native.UID=1;var $uid=(Browser.Engine.trident)?function(item){return(item.uid||(item.uid=[Native.UID++]))[0];}:function(item){return item.uid||(item.uid=Native.UID++);};var Window=new Native({name:'Window',legacy:(Browser.Engine.trident)?null:window.Window,initialize:function(win){$uid(win);if(!win.Element){win.Element=$empty;if(Browser.Engine.webkit)win.document.createElement("iframe");win.Element.prototype=(Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{};}
win.document.window=win;return $extend(win,Window.Prototype);},afterImplement:function(property,value){window[property]=Window.Prototype[property]=value;}});Window.Prototype={$family:{name:'window'}};new Window(window);var Document=new Native({name:'Document',legacy:(Browser.Engine.trident)?null:window.Document,initialize:function(doc){$uid(doc);doc.head=doc.getElementsByTagName('head')[0];doc.html=doc.getElementsByTagName('html')[0];if(Browser.Engine.trident&&Browser.Engine.version<=4)$try(function(){doc.execCommand("BackgroundImageCache",false,true);});if(Browser.Engine.trident)doc.window.attachEvent('onunload',function(){doc.window.detachEvent('onunload',arguments.callee);doc.head=doc.html=doc.window=null;});return $extend(doc,Document.Prototype);},afterImplement:function(property,value){document[property]=Document.Prototype[property]=value;}});Document.Prototype={$family:{name:'document'}};new Document(document);Array.implement({every:function(fn,bind){for(var i=0,l=this.length;i<l;i++){if(!fn.call(bind,this[i],i,this))return false;}
return true;},filter:function(fn,bind){var results=[];for(var i=0,l=this.length;i<l;i++){if(fn.call(bind,this[i],i,this))results.push(this[i]);}
return results;},clean:function(){return this.filter($defined);},indexOf:function(item,from){var len=this.length;for(var i=(from<0)?Math.max(0,len+from):from||0;i<len;i++){if(this[i]===item)return i;}
return-1;},map:function(fn,bind){var results=[];for(var i=0,l=this.length;i<l;i++)results[i]=fn.call(bind,this[i],i,this);return results;},some:function(fn,bind){for(var i=0,l=this.length;i<l;i++){if(fn.call(bind,this[i],i,this))return true;}
return false;},associate:function(keys){var obj={},length=Math.min(this.length,keys.length);for(var i=0;i<length;i++)obj[keys[i]]=this[i];return obj;},link:function(object){var result={};for(var i=0,l=this.length;i<l;i++){for(var key in object){if(object[key](this[i])){result[key]=this[i];delete object[key];break;}}}
return result;},contains:function(item,from){return this.indexOf(item,from)!=-1;},extend:function(array){for(var i=0,j=array.length;i<j;i++)this.push(array[i]);return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[$random(0,this.length-1)]:null;},include:function(item){if(!this.contains(item))this.push(item);return this;},combine:function(array){for(var i=0,l=array.length;i<l;i++)this.include(array[i]);return this;},erase:function(item){for(var i=this.length;i--;i){if(this[i]===item)this.splice(i,1);}
return this;},empty:function(){this.length=0;return this;},flatten:function(){var array=[];for(var i=0,l=this.length;i<l;i++){var type=$type(this[i]);if(!type)continue;array=array.concat((type=='array'||type=='collection'||type=='arguments')?Array.flatten(this[i]):this[i]);}
return array;},hexToRgb:function(array){if(this.length!=3)return null;var rgb=this.map(function(value){if(value.length==1)value+=value;return value.toInt(16);});return(array)?rgb:'rgb('+rgb+')';},rgbToHex:function(array){if(this.length<3)return null;if(this.length==4&&this[3]==0&&!array)return'transparent';var hex=[];for(var i=0;i<3;i++){var bit=(this[i]-0).toString(16);hex.push((bit.length==1)?'0'+bit:bit);}
return(array)?hex:'#'+hex.join('');}});try{delete Function.prototype.bind;}catch(e){}
Function.implement({extend:function(properties){for(var property in properties)this[property]=properties[property];return this;},create:function(options){var self=this;options=options||{};return function(event){var args=options.arguments;args=(args!=undefined)?$splat(args):Array.slice(arguments,(options.event)?1:0);if(options.event)args=[event||window.event].extend(args);var returns=function(){return self.apply(options.bind||null,args);};if(options.delay)return setTimeout(returns,options.delay);if(options.periodical)return setInterval(returns,options.periodical);if(options.attempt)return $try(returns);return returns();};},run:function(args,bind){return this.apply(bind,$splat(args));},pass:function(args,bind){return this.create({bind:bind,arguments:args});},bind:function(bind,args){return this.create({bind:bind,arguments:args});},bindWithEvent:function(bind,args){return this.create({bind:bind,arguments:args,event:true});},attempt:function(args,bind){return this.create({bind:bind,arguments:args,attempt:true})();},delay:function(delay,bind,args){return this.create({bind:bind,arguments:args,delay:delay})();},periodical:function(periodical,bind,args){return this.create({bind:bind,arguments:args,periodical:periodical})();}});Number.implement({limit:function(min,max){return Math.min(max,Math.max(min,this));},round:function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;},times:function(fn,bind){for(var i=0;i<this;i++)fn.call(bind,i,this);},toFloat:function(){return parseFloat(this);},toInt:function(base){return parseInt(this,base||10);}});Number.alias('times','each');(function(math){var methods={};math.each(function(name){if(!Number[name])methods[name]=function(){return Math[name].apply(null,[this].concat($A(arguments)));};});Number.implement(methods);})(['abs','acos','asin','atan','atan2','ceil','cos','exp','floor','log','max','min','pow','sin','sqrt','tan']);String.implement({test:function(regex,params){return((typeof regex=='string')?new RegExp(regex,params):regex).test(this);},contains:function(string,separator){return(separator)?(separator+this+separator).indexOf(separator+string+separator)>-1:this.indexOf(string)>-1;},trim:function(){return this.replace(/^\s+|\s+$/g,'');},clean:function(){return this.replace(/\s+/g,' ').trim();},camelCase:function(){return this.replace(/-\D/g,function(match){return match.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/[A-Z]/g,function(match){return('-'+match.charAt(0).toLowerCase());});},capitalize:function(){return this.replace(/\b[a-z]/g,function(match){return match.toUpperCase();});},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,'\\$1');},toInt:function(base){return parseInt(this,base||10);},toFloat:function(){return parseFloat(this);},hexToRgb:function(array){var hex=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(hex)?hex.slice(1).hexToRgb(array):null;},rgbToHex:function(array){var rgb=this.match(/\d{1,3}/g);return(rgb)?rgb.rgbToHex(array):null;},stripScripts:function(option){var scripts='';var text=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){scripts+=arguments[1]+'\n';return'';});if(option===true)$exec(scripts);else if($type(option)=='function')option(scripts,text);return text;},substitute:function(object,regexp){return this.replace(regexp||(/\\?\{([^{}]+)\}/g),function(match,name){if(match.charAt(0)=='\\')return match.slice(1);return(object[name]!=undefined)?object[name]:'';});}});Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(value){for(var key in this){if(this.hasOwnProperty(key)&&this[key]===value)return key;}
return null;},hasValue:function(value){return(Hash.keyOf(this,value)!==null);},extend:function(properties){Hash.each(properties||{},function(value,key){Hash.set(this,key,value);},this);return this;},combine:function(properties){Hash.each(properties||{},function(value,key){Hash.include(this,key,value);},this);return this;},erase:function(key){if(this.hasOwnProperty(key))delete this[key];return this;},get:function(key){return(this.hasOwnProperty(key))?this[key]:null;},set:function(key,value){if(!this[key]||this.hasOwnProperty(key))this[key]=value;return this;},empty:function(){Hash.each(this,function(value,key){delete this[key];},this);return this;},include:function(key,value){if(this[key]==undefined)this[key]=value;return this;},map:function(fn,bind){var results=new Hash;Hash.each(this,function(value,key){results.set(key,fn.call(bind,value,key,this));},this);return results;},filter:function(fn,bind){var results=new Hash;Hash.each(this,function(value,key){if(fn.call(bind,value,key,this))results.set(key,value);},this);return results;},every:function(fn,bind){for(var key in this){if(this.hasOwnProperty(key)&&!fn.call(bind,this[key],key))return false;}
return true;},some:function(fn,bind){for(var key in this){if(this.hasOwnProperty(key)&&fn.call(bind,this[key],key))return true;}
return false;},getKeys:function(){var keys=[];Hash.each(this,function(value,key){keys.push(key);});return keys;},getValues:function(){var values=[];Hash.each(this,function(value){values.push(value);});return values;},toQueryString:function(base){var queryString=[];Hash.each(this,function(value,key){if(base)key=base+'['+key+']';var result;switch($type(value)){case'object':result=Hash.toQueryString(value,key);break;case'array':var qs={};value.each(function(val,i){qs[i]=val;});result=Hash.toQueryString(qs,key);break;default:result=key+'='+encodeURIComponent(value);}
if(value!=undefined)queryString.push(result);});return queryString.join('&');}});Hash.alias({keyOf:'indexOf',hasValue:'contains'});var Event=new Native({name:'Event',initialize:function(event,win){win=win||window;var doc=win.document;event=event||win.event;if(event.$extended)return event;this.$extended=true;var type=event.type;var target=event.target||event.srcElement;while(target&&target.nodeType==3)target=target.parentNode;if(type.test(/key/)){var code=event.which||event.keyCode;var key=Event.Keys.keyOf(code);if(type=='keydown'){var fKey=code-111;if(fKey>0&&fKey<13)key='f'+fKey;}
key=key||String.fromCharCode(code).toLowerCase();}else if(type.match(/(click|mouse|menu)/i)){doc=(!doc.compatMode||doc.compatMode=='CSS1Compat')?doc.html:doc.body;var page={x:event.pageX||event.clientX+doc.scrollLeft,y:event.pageY||event.clientY+doc.scrollTop};var client={x:(event.pageX)?event.pageX-win.pageXOffset:event.clientX,y:(event.pageY)?event.pageY-win.pageYOffset:event.clientY};if(type.match(/DOMMouseScroll|mousewheel/)){var wheel=(event.wheelDelta)?event.wheelDelta/120:-(event.detail||0)/3;}
var rightClick=(event.which==3)||(event.button==2);var related=null;if(type.match(/over|out/)){switch(type){case'mouseover':related=event.relatedTarget||event.fromElement;break;case'mouseout':related=event.relatedTarget||event.toElement;}
if(!(function(){while(related&&related.nodeType==3)related=related.parentNode;return true;}).create({attempt:Browser.Engine.gecko})())related=false;}}
return $extend(this,{event:event,type:type,page:page,client:client,rightClick:rightClick,wheel:wheel,relatedTarget:related,target:target,code:code,key:key,shift:event.shiftKey,control:event.ctrlKey,alt:event.altKey,meta:event.metaKey});}});Event.Keys=new Hash({'enter':13,'up':38,'down':40,'left':37,'right':39,'esc':27,'space':32,'backspace':8,'tab':9,'delete':46});Event.implement({stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation)this.event.stopPropagation();else this.event.cancelBubble=true;return this;},preventDefault:function(){if(this.event.preventDefault)this.event.preventDefault();else this.event.returnValue=false;return this;}});function Class(params){if(params instanceof Function)params={initialize:params};var newClass=function(){Object.reset(this);if(newClass._prototyping)return this;this._current=$empty;var value=(this.initialize)?this.initialize.apply(this,arguments):this;delete this._current;delete this.caller;return value;}.extend(this);newClass.implement(params);newClass.constructor=Class;newClass.prototype.constructor=newClass;return newClass;};Function.prototype.protect=function(){this._protected=true;return this;};Object.reset=function(object,key){if(key==null){for(var p in object)Object.reset(object,p);return object;}
delete object[key];switch($type(object[key])){case'object':var F=function(){};F.prototype=object[key];var i=new F;object[key]=Object.reset(i);break;case'array':object[key]=$unlink(object[key]);break;}
return object;};new Native({name:'Class',initialize:Class}).extend({instantiate:function(F){F._prototyping=true;var proto=new F;delete F._prototyping;return proto;},wrap:function(self,key,method){if(method._origin)method=method._origin;return function(){if(method._protected&&this._current==null)throw new Error('The method "'+key+'" cannot be called.');var caller=this.caller,current=this._current;this.caller=current;this._current=arguments.callee;var result=method.apply(this,arguments);this._current=current;this.caller=caller;return result;}.extend({_owner:self,_origin:method,_name:key});}});Class.implement({implement:function(key,value){if($type(key)=='object'){for(var p in key)this.implement(p,key[p]);return this;}
var mutator=Class.Mutators[key];if(mutator){value=mutator.call(this,value);if(value==null)return this;}
var proto=this.prototype;switch($type(value)){case'function':if(value._hidden)return this;proto[key]=Class.wrap(this,key,value);break;case'object':var previous=proto[key];if($type(previous)=='object')$mixin(previous,value);else proto[key]=$unlink(value);break;case'array':proto[key]=$unlink(value);break;default:proto[key]=value;}
return this;}});Class.Mutators={Extends:function(parent){this.parent=parent;this.prototype=Class.instantiate(parent);this.implement('parent',function(){var name=this.caller._name,previous=this.caller._owner.parent.prototype[name];if(!previous)throw new Error('The method "'+name+'" has no parent.');return previous.apply(this,arguments);}.protect());},Implements:function(items){$splat(items).each(function(item){if(item instanceof Function)item=Class.instantiate(item);this.implement(item);},this);}};var Chain=new Class({$chain:[],chain:function(){this.$chain.extend(Array.flatten(arguments));return this;},callChain:function(){return(this.$chain.length)?this.$chain.shift().apply(this,arguments):false;},clearChain:function(){this.$chain.empty();return this;}});var Events=new Class({$events:{},addEvent:function(type,fn,internal){type=Events.removeOn(type);if(fn!=$empty){this.$events[type]=this.$events[type]||[];this.$events[type].include(fn);if(internal)fn.internal=true;}
return this;},addEvents:function(events){for(var type in events)this.addEvent(type,events[type]);return this;},fireEvent:function(type,args,delay){type=Events.removeOn(type);if(!this.$events||!this.$events[type])return this;this.$events[type].each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);return this;},removeEvent:function(type,fn){type=Events.removeOn(type);if(!this.$events[type])return this;if(!fn.internal)this.$events[type].erase(fn);return this;},removeEvents:function(events){var type;if($type(events)=='object'){for(type in events)this.removeEvent(type,events[type]);return this;}
if(events)events=Events.removeOn(events);for(type in this.$events){if(events&&events!=type)continue;var fns=this.$events[type];for(var i=fns.length;i--;i)this.removeEvent(type,fns[i]);}
return this;}});Events.removeOn=function(string){return string.replace(/^on([A-Z])/,function(full,first){return first.toLowerCase();});};var Options=new Class({setOptions:function(){this.options=$merge.run([this.options].extend(arguments));if(!this.addEvent)return this;for(var option in this.options){if($type(this.options[option])!='function'||!(/^on[A-Z]/).test(option))continue;this.addEvent(option,this.options[option]);delete this.options[option];}
return this;}});var Element=new Native({name:'Element',legacy:window.Element,initialize:function(tag,props){var konstructor=Element.Constructors.get(tag);if(konstructor)return konstructor(props);if(typeof tag=='string')return document.newElement(tag,props);return document.id(tag).set(props);},afterImplement:function(key,value){Element.Prototype[key]=value;if(Array[key])return;Elements.implement(key,function(){var items=[],elements=true;for(var i=0,j=this.length;i<j;i++){var returns=this[i][key].apply(this[i],arguments);items.push(returns);if(elements)elements=($type(returns)=='element');}
return(elements)?new Elements(items):items;});}});Element.Prototype={$family:{name:'element'}};Element.Constructors=new Hash;var IFrame=new Native({name:'IFrame',generics:false,initialize:function(){var params=Array.link(arguments,{properties:Object.type,iframe:$defined});var props=params.properties||{};var iframe=document.id(params.iframe);var onload=props.onload||$empty;delete props.onload;props.id=props.name=$pick(props.id,props.name,iframe?(iframe.id||iframe.name):'IFrame_'+$time());iframe=new Element(iframe||'iframe',props);var onFrameLoad=function(){var host=$try(function(){return iframe.contentWindow.location.host;});if(!host||host==window.location.host){var win=new Window(iframe.contentWindow);new Document(iframe.contentWindow.document);$extend(win.Element.prototype,Element.Prototype);}
onload.call(iframe.contentWindow,iframe.contentWindow.document);};var contentWindow=$try(function(){return iframe.contentWindow;});((contentWindow&&contentWindow.document.body)||window.frames[props.id])?onFrameLoad():iframe.addListener('load',onFrameLoad);return iframe;}});var Elements=new Native({initialize:function(elements,options){options=$extend({ddup:true,cash:true},options);elements=elements||[];if(options.ddup||options.cash){var uniques={},returned=[];for(var i=0,l=elements.length;i<l;i++){var el=document.id(elements[i],!options.cash);if(options.ddup){if(uniques[el.uid])continue;uniques[el.uid]=true;}
if(el)returned.push(el);}
elements=returned;}
return(options.cash)?$extend(elements,this):elements;}});Elements.implement({filter:function(filter,bind){if(!filter)return this;return new Elements(Array.filter(this,(typeof filter=='string')?function(item){return item.match(filter);}:filter,bind));}});(function(){var createElementAcceptsHTML;try{var x=document.createElement('<input name=x>');createElementAcceptsHTML=(x.name=='x');}catch(e){}
var escapeQuotes=function(html){return(''+html).replace(/&/g,'&amp;').replace(/"/g,'&quot;');};Document.implement({newElement:function(tag,props){if(props&&props.checked!=null)props.defaultChecked=props.checked;if(createElementAcceptsHTML&&props){tag='<'+tag;if(props.name)tag+=' name="'+escapeQuotes(props.name)+'"';if(props.type)tag+=' type="'+escapeQuotes(props.type)+'"';tag+='>';delete props.name;delete props.type;}
return this.id(this.createElement(tag)).set(props);},newTextNode:function(text){return this.createTextNode(text);},getDocument:function(){return this;},getWindow:function(){return this.window;},id:(function(){var types={string:function(id,nocash,doc){id=doc.getElementById(id);return(id)?types.element(id,nocash):null;},element:function(el,nocash){$uid(el);if(!nocash&&!el.$family&&!(/^object|embed$/i).test(el.tagName)){var proto=Element.Prototype;for(var p in proto)el[p]=proto[p];};return el;},object:function(obj,nocash,doc){if(obj.toElement)return types.element(obj.toElement(doc),nocash);return null;}};types.textnode=types.whitespace=types.window=types.document=$arguments(0);return function(el,nocash,doc){if(el&&el.$family&&el.uid)return el;var type=$type(el);return(types[type])?types[type](el,nocash,doc||document):null;};})()});})();if(window.$==null)Window.implement({$:function(el,nc){return document.id(el,nc,this.document);}});Window.implement({$$:function(selector){if(arguments.length==1&&typeof selector=='string')return this.document.getElements(selector);var elements=[];var args=Array.flatten(arguments);for(var i=0,l=args.length;i<l;i++){var item=args[i];switch($type(item)){case'element':elements.push(item);break;case'string':elements.extend(this.document.getElements(item,true));}}
return new Elements(elements);},getDocument:function(){return this.document;},getWindow:function(){return this;}});Native.implement([Element,Document],{getElement:function(selector,nocash){return document.id(this.getElements(selector,true)[0]||null,nocash);},getElements:function(tags,nocash){tags=tags.split(',');var elements=[];var ddup=(tags.length>1);tags.each(function(tag){var partial=this.getElementsByTagName(tag.trim());(ddup)?elements.extend(partial):elements=partial;},this);return new Elements(elements,{ddup:ddup,cash:!nocash});}});(function(){var collected={},storage={};var props={input:'checked',option:'selected',textarea:(Browser.Engine.webkit&&Browser.Engine.version<420)?'innerHTML':'value'};var get=function(uid){return(storage[uid]||(storage[uid]={}));};var clean=function(item,retain){if(!item)return;var uid=item.uid;if(retain!==true)retain=false;if(Browser.Engine.trident){if(item.clearAttributes){var clone=retain&&item.cloneNode(false);item.clearAttributes();if(clone)item.mergeAttributes(clone);}else if(item.removeEvents){item.removeEvents();}
if((/object/i).test(item.tagName)){for(var p in item){if(typeof item[p]=='function')item[p]=$empty;}
Element.dispose(item);}}
if(!uid)return;collected[uid]=storage[uid]=null;};var purge=function(){Hash.each(collected,clean);if(Browser.Engine.trident)$A(document.getElementsByTagName('object')).each(clean);if(window.CollectGarbage)CollectGarbage();collected=storage=null;};var walk=function(element,walk,start,match,all,nocash){var el=element[start||walk];var elements=[];while(el){if(el.nodeType==1&&(!match||Element.match(el,match))){if(!all)return document.id(el,nocash);elements.push(el);}
el=el[walk];}
return(all)?new Elements(elements,{ddup:false,cash:!nocash}):null;};var attributes={'html':'innerHTML','class':'className','for':'htmlFor','defaultValue':'defaultValue','text':(Browser.Engine.trident||(Browser.Engine.webkit&&Browser.Engine.version<420))?'innerText':'textContent'};var bools=['compact','nowrap','ismap','declare','noshade','checked','disabled','readonly','multiple','selected','noresize','defer'];var camels=['value','type','defaultValue','accessKey','cellPadding','cellSpacing','colSpan','frameBorder','maxLength','readOnly','rowSpan','tabIndex','useMap'];bools=bools.associate(bools);Hash.extend(attributes,bools);Hash.extend(attributes,camels.associate(camels.map(String.toLowerCase)));var inserters={before:function(context,element){if(element.parentNode)element.parentNode.insertBefore(context,element);},after:function(context,element){if(!element.parentNode)return;var next=element.nextSibling;(next)?element.parentNode.insertBefore(context,next):element.parentNode.appendChild(context);},bottom:function(context,element){element.appendChild(context);},top:function(context,element){var first=element.firstChild;(first)?element.insertBefore(context,first):element.appendChild(context);}};inserters.inside=inserters.bottom;Hash.each(inserters,function(inserter,where){where=where.capitalize();Element.implement('inject'+where,function(el){inserter(this,document.id(el,true));return this;});Element.implement('grab'+where,function(el){inserter(document.id(el,true),this);return this;});});Element.implement({set:function(prop,value){switch($type(prop)){case'object':for(var p in prop)this.set(p,prop[p]);break;case'string':var property=Element.Properties.get(prop);(property&&property.set)?property.set.apply(this,Array.slice(arguments,1)):this.setProperty(prop,value);}
return this;},get:function(prop){var property=Element.Properties.get(prop);return(property&&property.get)?property.get.apply(this,Array.slice(arguments,1)):this.getProperty(prop);},erase:function(prop){var property=Element.Properties.get(prop);(property&&property.erase)?property.erase.apply(this):this.removeProperty(prop);return this;},setProperty:function(attribute,value){var key=attributes[attribute];if(value==undefined)return this.removeProperty(attribute);if(key&&bools[attribute])value=!!value;(key)?this[key]=value:this.setAttribute(attribute,''+value);return this;},setProperties:function(attributes){for(var attribute in attributes)this.setProperty(attribute,attributes[attribute]);return this;},getProperty:function(attribute){var key=attributes[attribute];var value=(key)?this[key]:this.getAttribute(attribute,2);return(bools[attribute])?!!value:(key)?value:value||null;},getProperties:function(){var args=$A(arguments);return args.map(this.getProperty,this).associate(args);},removeProperty:function(attribute){var key=attributes[attribute];(key)?this[key]=(key&&bools[attribute])?false:'':this.removeAttribute(attribute);return this;},removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this;},hasClass:function(className){return this.className.contains(className,' ');},addClass:function(className){if(!this.hasClass(className))this.className=(this.className+' '+className).clean();return this;},removeClass:function(className){this.className=this.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)'),'$1');return this;},toggleClass:function(className){return this.hasClass(className)?this.removeClass(className):this.addClass(className);},adopt:function(){Array.flatten(arguments).each(function(element){element=document.id(element,true);if(element)this.appendChild(element);},this);return this;},appendText:function(text,where){return this.grab(this.getDocument().newTextNode(text),where);},grab:function(el,where){inserters[where||'bottom'](document.id(el,true),this);return this;},inject:function(el,where){inserters[where||'bottom'](this,document.id(el,true));return this;},replaces:function(el){el=document.id(el,true);el.parentNode.replaceChild(this,el);return this;},wraps:function(el,where){el=document.id(el,true);return this.replaces(el).grab(el,where);},getPrevious:function(match,nocash){return walk(this,'previousSibling',null,match,false,nocash);},getAllPrevious:function(match,nocash){return walk(this,'previousSibling',null,match,true,nocash);},getNext:function(match,nocash){return walk(this,'nextSibling',null,match,false,nocash);},getAllNext:function(match,nocash){return walk(this,'nextSibling',null,match,true,nocash);},getFirst:function(match,nocash){return walk(this,'nextSibling','firstChild',match,false,nocash);},getLast:function(match,nocash){return walk(this,'previousSibling','lastChild',match,false,nocash);},getParent:function(match,nocash){return walk(this,'parentNode',null,match,false,nocash);},getParents:function(match,nocash){return walk(this,'parentNode',null,match,true,nocash);},getSiblings:function(match,nocash){return this.getParent().getChildren(match,nocash).erase(this);},getChildren:function(match,nocash){return walk(this,'nextSibling','firstChild',match,true,nocash);},getWindow:function(){return this.ownerDocument.window;},getDocument:function(){return this.ownerDocument;},getElementById:function(id,nocash){var el=this.ownerDocument.getElementById(id);if(!el)return null;for(var parent=el.parentNode;parent!=this;parent=parent.parentNode){if(!parent)return null;}
return document.id(el,nocash);},getSelected:function(){return new Elements($A(this.options).filter(function(option){return option.selected;}));},getComputedStyle:function(property){if(this.currentStyle)return this.currentStyle[property.camelCase()];var computed=this.getDocument().defaultView.getComputedStyle(this,null);return(computed)?computed.getPropertyValue([property.hyphenate()]):null;},toQueryString:function(){var queryString=[];this.getElements('input, select, textarea',true).each(function(el){if(!el.name||el.disabled||el.type=='submit'||el.type=='reset'||el.type=='file')return;var value=(el.tagName.toLowerCase()=='select')?Element.getSelected(el).map(function(opt){return opt.value;}):((el.type=='radio'||el.type=='checkbox')&&!el.checked)?null:el.value;$splat(value).each(function(val){if(typeof val!='undefined')queryString.push(el.name+'='+encodeURIComponent(val));});});return queryString.join('&');},clone:function(contents,keepid){contents=contents!==false;var clone=this.cloneNode(contents);var clean=function(node,element){if(!keepid)node.removeAttribute('id');if(Browser.Engine.trident){node.clearAttributes();node.mergeAttributes(element);node.removeAttribute('uid');if(node.options){var no=node.options,eo=element.options;for(var j=no.length;j--;)no[j].selected=eo[j].selected;}}
var prop=props[element.tagName.toLowerCase()];if(prop&&element[prop])node[prop]=element[prop];};if(contents){var ce=clone.getElementsByTagName('*'),te=this.getElementsByTagName('*');for(var i=ce.length;i--;)clean(ce[i],te[i]);}
clean(clone,this);return document.id(clone);},destroy:function(){Element.empty(this);Element.dispose(this);clean(this,true);return null;},empty:function(){$A(this.childNodes).each(function(node){Element.destroy(node);});return this;},dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this;},hasChild:function(el){el=document.id(el,true);if(!el)return false;if(Browser.Engine.webkit&&Browser.Engine.version<420)return $A(this.getElementsByTagName(el.tagName)).contains(el);return(this.contains)?(this!=el&&this.contains(el)):!!(this.compareDocumentPosition(el)&16);},match:function(tag){return(!tag||(tag==this)||(Element.get(this,'tag')==tag));}});Native.implement([Element,Window,Document],{addListener:function(type,fn){if(type=='unload'){var old=fn,self=this;fn=function(){self.removeListener('unload',fn);old();};}else{collected[this.uid]=this;}
if(this.addEventListener)this.addEventListener(type,fn,false);else this.attachEvent('on'+type,fn);return this;},removeListener:function(type,fn){if(this.removeEventListener)this.removeEventListener(type,fn,false);else this.detachEvent('on'+type,fn);return this;},retrieve:function(property,dflt){var storage=get(this.uid),prop=storage[property];if(dflt!=undefined&&prop==undefined)prop=storage[property]=dflt;return $pick(prop);},store:function(property,value){var storage=get(this.uid);storage[property]=value;return this;},eliminate:function(property){var storage=get(this.uid);delete storage[property];return this;}});window.addListener('unload',purge);})();Element.Properties=new Hash;Element.Properties.style={set:function(style){this.style.cssText=style;},get:function(){return this.style.cssText;},erase:function(){this.style.cssText='';}};Element.Properties.tag={get:function(){return this.tagName.toLowerCase();}};Element.Properties.html=(function(){var wrapper=document.createElement('div');var translations={table:[1,'<table>','</table>'],select:[1,'<select>','</select>'],tbody:[2,'<table><tbody>','</tbody></table>'],tr:[3,'<table><tbody><tr>','</tr></tbody></table>']};translations.thead=translations.tfoot=translations.tbody;var html={set:function(){var html=Array.flatten(arguments).join('');var wrap=Browser.Engine.trident&&translations[this.get('tag')];if(wrap){var first=wrapper;first.innerHTML=wrap[1]+html+wrap[2];for(var i=wrap[0];i--;)first=first.firstChild;this.empty().adopt(first.childNodes);}else{this.innerHTML=html;}}};html.erase=html.set;return html;})();if(Browser.Engine.webkit&&Browser.Engine.version<420)Element.Properties.text={get:function(){if(this.innerText)return this.innerText;var temp=this.ownerDocument.newElement('div',{html:this.innerHTML}).inject(this.ownerDocument.body);var text=temp.innerText;temp.destroy();return text;}};Element.Properties.events={set:function(events){this.addEvents(events);}};Native.implement([Element,Window,Document],{addEvent:function(type,fn){var events=this.retrieve('events',{});events[type]=events[type]||{'keys':[],'values':[]};if(events[type].keys.contains(fn))return this;events[type].keys.push(fn);var realType=type,custom=Element.Events.get(type),condition=fn,self=this;if(custom){if(custom.onAdd)custom.onAdd.call(this,fn);if(custom.condition){condition=function(event){if(custom.condition.call(this,event))return fn.call(this,event);return true;};}
realType=custom.base||realType;}
var defn=function(){return fn.call(self);};var nativeEvent=Element.NativeEvents[realType];if(nativeEvent){if(nativeEvent==2){defn=function(event){event=new Event(event,self.getWindow());if(condition.call(self,event)===false)event.stop();};}
this.addListener(realType,defn);}
events[type].values.push(defn);return this;},removeEvent:function(type,fn){var events=this.retrieve('events');if(!events||!events[type])return this;var pos=events[type].keys.indexOf(fn);if(pos==-1)return this;events[type].keys.splice(pos,1);var value=events[type].values.splice(pos,1)[0];var custom=Element.Events.get(type);if(custom){if(custom.onRemove)custom.onRemove.call(this,fn);type=custom.base||type;}
return(Element.NativeEvents[type])?this.removeListener(type,value):this;},addEvents:function(events){for(var event in events)this.addEvent(event,events[event]);return this;},removeEvents:function(events){var type;if($type(events)=='object'){for(type in events)this.removeEvent(type,events[type]);return this;}
var attached=this.retrieve('events');if(!attached)return this;if(!events){for(type in attached)this.removeEvents(type);this.eliminate('events');}else if(attached[events]){while(attached[events].keys[0])this.removeEvent(events,attached[events].keys[0]);attached[events]=null;}
return this;},fireEvent:function(type,args,delay){var events=this.retrieve('events');if(!events||!events[type])return this;events[type].keys.each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);return this;},cloneEvents:function(from,type){from=document.id(from);var fevents=from.retrieve('events');if(!fevents)return this;if(!type){for(var evType in fevents)this.cloneEvents(from,evType);}else if(fevents[type]){fevents[type].keys.each(function(fn){this.addEvent(type,fn);},this);}
return this;}});try{if(typeof HTMLElement!='undefined')
HTMLElement.prototype.fireEvent=Element.prototype.fireEvent;}catch(e){}
Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};(function(){var $check=function(event){var related=event.relatedTarget;if(related==undefined)return true;if(related===false)return false;return($type(this)!='document'&&related!=this&&related.prefix!='xul'&&!this.hasChild(related));};Element.Events=new Hash({mouseenter:{base:'mouseover',condition:$check},mouseleave:{base:'mouseout',condition:$check},mousewheel:{base:(Browser.Engine.gecko)?'DOMMouseScroll':'mousewheel'}});})();Element.Properties.styles={set:function(styles){this.setStyles(styles);}};Element.Properties.opacity={set:function(opacity,novisibility){if(!novisibility){if(opacity==0){if(this.style.visibility!='hidden')this.style.visibility='hidden';}else{if(this.style.visibility!='visible')this.style.visibility='visible';}}
if(!this.currentStyle||!this.currentStyle.hasLayout)this.style.zoom=1;if(Browser.Engine.trident)this.style.filter=(opacity==1)?'':'alpha(opacity='+opacity*100+')';this.style.opacity=opacity;this.store('opacity',opacity);},get:function(){return this.retrieve('opacity',1);}};Element.implement({setOpacity:function(value){return this.set('opacity',value,true);},getOpacity:function(){return this.get('opacity');},setStyle:function(property,value){switch(property){case'opacity':return this.set('opacity',parseFloat(value));case'float':property=(Browser.Engine.trident)?'styleFloat':'cssFloat';}
property=property.camelCase();if($type(value)!='string'){var map=(Element.Styles.get(property)||'@').split(' ');value=$splat(value).map(function(val,i){if(!map[i])return'';return($type(val)=='number')?map[i].replace('@',Math.round(val)):val;}).join(' ');}else if(value==String(Number(value))){value=Math.round(value);}
this.style[property]=value;return this;},getStyle:function(property){switch(property){case'opacity':return this.get('opacity');case'float':property=(Browser.Engine.trident)?'styleFloat':'cssFloat';}
property=property.camelCase();var result=this.style[property];if(!$chk(result)){result=[];for(var style in Element.ShortStyles){if(property!=style)continue;for(var s in Element.ShortStyles[style])result.push(this.getStyle(s));return result.join(' ');}
result=this.getComputedStyle(property);}
if(result){result=String(result);var color=result.match(/rgba?\([\d\s,]+\)/);if(color)result=result.replace(color[0],color[0].rgbToHex());}
if(Browser.Engine.presto||(Browser.Engine.trident&&!$chk(parseInt(result,10)))){if(property.test(/^(height|width)$/)){var values=(property=='width')?['left','right']:['top','bottom'],size=0;values.each(function(value){size+=this.getStyle('border-'+value+'-width').toInt()+this.getStyle('padding-'+value).toInt();},this);return this['offset'+property.capitalize()]-size+'px';}
if((Browser.Engine.presto)&&String(result).test('px'))return result;if(property.test(/(border(.+)Width|margin|padding)/))return'0px';}
return result;},setStyles:function(styles){for(var style in styles)this.setStyle(style,styles[style]);return this;},getStyles:function(){var result={};Array.flatten(arguments).each(function(key){result[key]=this.getStyle(key);},this);return result;}});Element.Styles=new Hash({left:'@px',top:'@px',bottom:'@px',right:'@px',width:'@px',height:'@px',maxWidth:'@px',maxHeight:'@px',minWidth:'@px',minHeight:'@px',backgroundColor:'rgb(@, @, @)',backgroundPosition:'@px @px',color:'rgb(@, @, @)',fontSize:'@px',letterSpacing:'@px',lineHeight:'@px',clip:'rect(@px @px @px @px)',margin:'@px @px @px @px',padding:'@px @px @px @px',border:'@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',borderWidth:'@px @px @px @px',borderStyle:'@ @ @ @',borderColor:'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',zIndex:'@','zoom':'@',fontWeight:'@',textIndent:'@px',opacity:'@'});Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};['Top','Right','Bottom','Left'].each(function(direction){var Short=Element.ShortStyles;var All=Element.Styles;['margin','padding'].each(function(style){var sd=style+direction;Short[style][sd]=All[sd]='@px';});var bd='border'+direction;Short.border[bd]=All[bd]='@px @ rgb(@, @, @)';var bdw=bd+'Width',bds=bd+'Style',bdc=bd+'Color';Short[bd]={};Short.borderWidth[bdw]=Short[bd][bdw]=All[bdw]='@px';Short.borderStyle[bds]=Short[bd][bds]=All[bds]='@';Short.borderColor[bdc]=Short[bd][bdc]=All[bdc]='rgb(@, @, @)';});(function(){Element.implement({scrollTo:function(x,y){if(isBody(this)){this.getWindow().scrollTo(x,y);}else{this.scrollLeft=x;this.scrollTop=y;}
return this;},getSize:function(){if(isBody(this))return this.getWindow().getSize();return{x:this.offsetWidth,y:this.offsetHeight};},getScrollSize:function(){if(isBody(this))return this.getWindow().getScrollSize();return{x:this.scrollWidth,y:this.scrollHeight};},getScroll:function(){if(isBody(this))return this.getWindow().getScroll();return{x:this.scrollLeft,y:this.scrollTop};},getScrolls:function(){var element=this,position={x:0,y:0};while(element&&!isBody(element)){position.x+=element.scrollLeft;position.y+=element.scrollTop;element=element.parentNode;}
return position;},getOffsetParent:function(){var element=this;if(isBody(element))return null;if(!Browser.Engine.trident)return element.offsetParent;while((element=element.parentNode)&&!isBody(element)){if(styleString(element,'position')!='static')return element;}
return null;},getOffsets:function(){if(this.getBoundingClientRect){var bound=this.getBoundingClientRect(),html=document.id(this.getDocument().documentElement),htmlScroll=html.getScroll(),elemScrolls=this.getScrolls(),elemScroll=this.getScroll(),isFixed=(styleString(this,'position')=='fixed');return{x:bound.left.toInt()+elemScrolls.x-elemScroll.x+((isFixed)?0:htmlScroll.x)-html.clientLeft,y:bound.top.toInt()+elemScrolls.y-elemScroll.y+((isFixed)?0:htmlScroll.y)-html.clientTop};}
var element=this,position={x:0,y:0};if(isBody(this))return position;while(element&&!isBody(element)){position.x+=element.offsetLeft;position.y+=element.offsetTop;if(Browser.Engine.gecko){if(!borderBox(element)){position.x+=leftBorder(element);position.y+=topBorder(element);}
var parent=element.parentNode;if(parent&&styleString(parent,'overflow')!='visible'){position.x+=leftBorder(parent);position.y+=topBorder(parent);}}else if(element!=this&&Browser.Engine.webkit){position.x+=leftBorder(element);position.y+=topBorder(element);}
element=element.offsetParent;}
if(Browser.Engine.gecko&&!borderBox(this)){position.x-=leftBorder(this);position.y-=topBorder(this);}
return position;},getPosition:function(relative){if(isBody(this))return{x:0,y:0};var offset=this.getOffsets(),scroll=this.getScrolls();var position={x:offset.x-scroll.x,y:offset.y-scroll.y};var relativePosition=(relative&&(relative=document.id(relative)))?relative.getPosition():{x:0,y:0};return{x:position.x-relativePosition.x,y:position.y-relativePosition.y};},getCoordinates:function(element){if(isBody(this))return this.getWindow().getCoordinates();var position=this.getPosition(element),size=this.getSize();var obj={left:position.x,top:position.y,width:size.x,height:size.y};obj.right=obj.left+obj.width;obj.bottom=obj.top+obj.height;return obj;},computePosition:function(obj){return{left:obj.x-styleNumber(this,'margin-left'),top:obj.y-styleNumber(this,'margin-top')};},setPosition:function(obj){return this.setStyles(this.computePosition(obj));}});Native.implement([Document,Window],{getSize:function(){if(Browser.Engine.presto||Browser.Engine.webkit){var win=this.getWindow();return{x:win.innerWidth,y:win.innerHeight};}
var doc=getCompatElement(this);return{x:doc.clientWidth,y:doc.clientHeight};},getScroll:function(){var win=this.getWindow(),doc=getCompatElement(this);return{x:win.pageXOffset||doc.scrollLeft,y:win.pageYOffset||doc.scrollTop};},getScrollSize:function(){var doc=getCompatElement(this),min=this.getSize();return{x:Math.max(doc.scrollWidth,min.x),y:Math.max(doc.scrollHeight,min.y)};},getPosition:function(){return{x:0,y:0};},getCoordinates:function(){var size=this.getSize();return{top:0,left:0,bottom:size.y,right:size.x,height:size.y,width:size.x};}});var styleString=Element.getComputedStyle;function styleNumber(element,style){return styleString(element,style).toInt()||0;};function borderBox(element){return styleString(element,'-moz-box-sizing')=='border-box';};function topBorder(element){return styleNumber(element,'border-top-width');};function leftBorder(element){return styleNumber(element,'border-left-width');};function isBody(element){return(/^(?:body|html)$/i).test(element.tagName);};function getCompatElement(element){var doc=element.getDocument();return(!doc.compatMode||doc.compatMode=='CSS1Compat')?doc.html:doc.body;};})();Element.alias('setPosition','position');Native.implement([Window,Document,Element],{getHeight:function(){return this.getSize().y;},getWidth:function(){return this.getSize().x;},getScrollTop:function(){return this.getScroll().y;},getScrollLeft:function(){return this.getScroll().x;},getScrollHeight:function(){return this.getScrollSize().y;},getScrollWidth:function(){return this.getScrollSize().x;},getTop:function(){return this.getPosition().y;},getLeft:function(){return this.getPosition().x;}});Native.implement([Document,Element],{getElements:function(expression,nocash){expression=expression.split(',');var items,local={};for(var i=0,l=expression.length;i<l;i++){var selector=expression[i],elements=Selectors.Utils.search(this,selector,local);if(i!=0&&elements.item)elements=$A(elements);items=(i==0)?elements:(items.item)?$A(items).concat(elements):items.concat(elements);}
return new Elements(items,{ddup:(expression.length>1),cash:!nocash});}});Element.implement({match:function(selector){if(!selector||(selector==this))return true;var tagid=Selectors.Utils.parseTagAndID(selector);var tag=tagid[0],id=tagid[1];if(!Selectors.Filters.byID(this,id)||!Selectors.Filters.byTag(this,tag))return false;var parsed=Selectors.Utils.parseSelector(selector);return(parsed)?Selectors.Utils.filter(this,parsed,{}):true;}});var Selectors={Cache:{nth:{},parsed:{}}};Selectors.RegExps={id:(/#([\w-]+)/),tag:(/^(\w+|\*)/),quick:(/^(\w+|\*)$/),splitter:(/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),combined:(/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)};Selectors.Utils={chk:function(item,uniques){if(!uniques)return true;var uid=$uid(item);if(!uniques[uid])return uniques[uid]=true;return false;},parseNthArgument:function(argument){if(Selectors.Cache.nth[argument])return Selectors.Cache.nth[argument];var parsed=argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!parsed)return false;var inta=parseInt(parsed[1],10);var a=(inta||inta===0)?inta:1;var special=parsed[2]||false;var b=parseInt(parsed[3],10)||0;if(a!=0){b--;while(b<1)b+=a;while(b>=a)b-=a;}else{a=b;special='index';}
switch(special){case'n':parsed={a:a,b:b,special:'n'};break;case'odd':parsed={a:2,b:0,special:'n'};break;case'even':parsed={a:2,b:1,special:'n'};break;case'first':parsed={a:0,special:'index'};break;case'last':parsed={special:'last-child'};break;case'only':parsed={special:'only-child'};break;default:parsed={a:(a-1),special:'index'};}
return Selectors.Cache.nth[argument]=parsed;},parseSelector:function(selector){if(Selectors.Cache.parsed[selector])return Selectors.Cache.parsed[selector];var m,parsed={classes:[],pseudos:[],attributes:[]};while((m=Selectors.RegExps.combined.exec(selector))){var cn=m[1],an=m[2],ao=m[3],av=m[5],pn=m[6],pa=m[7];if(cn){parsed.classes.push(cn);}else if(pn){var parser=Selectors.Pseudo.get(pn);if(parser)parsed.pseudos.push({parser:parser,argument:pa});else parsed.attributes.push({name:pn,operator:'=',value:pa});}else if(an){parsed.attributes.push({name:an,operator:ao,value:av});}}
if(!parsed.classes.length)delete parsed.classes;if(!parsed.attributes.length)delete parsed.attributes;if(!parsed.pseudos.length)delete parsed.pseudos;if(!parsed.classes&&!parsed.attributes&&!parsed.pseudos)parsed=null;return Selectors.Cache.parsed[selector]=parsed;},parseTagAndID:function(selector){var tag=selector.match(Selectors.RegExps.tag);var id=selector.match(Selectors.RegExps.id);return[(tag)?tag[1]:'*',(id)?id[1]:false];},filter:function(item,parsed,local){var i;if(parsed.classes){for(i=parsed.classes.length;i--;i){var cn=parsed.classes[i];if(!Selectors.Filters.byClass(item,cn))return false;}}
if(parsed.attributes){for(i=parsed.attributes.length;i--;i){var att=parsed.attributes[i];if(!Selectors.Filters.byAttribute(item,att.name,att.operator,att.value))return false;}}
if(parsed.pseudos){for(i=parsed.pseudos.length;i--;i){var psd=parsed.pseudos[i];if(!Selectors.Filters.byPseudo(item,psd.parser,psd.argument,local))return false;}}
return true;},getByTagAndID:function(ctx,tag,id){if(id){var item=(ctx.getElementById)?ctx.getElementById(id,true):Element.getElementById(ctx,id,true);return(item&&Selectors.Filters.byTag(item,tag))?[item]:[];}else{return ctx.getElementsByTagName(tag);}},search:function(self,expression,local){var splitters=[];var selectors=expression.trim().replace(Selectors.RegExps.splitter,function(m0,m1,m2){splitters.push(m1);return':)'+m2;}).split(':)');var items,filtered,item;for(var i=0,l=selectors.length;i<l;i++){var selector=selectors[i];if(i==0&&Selectors.RegExps.quick.test(selector)){items=self.getElementsByTagName(selector);continue;}
var splitter=splitters[i-1];var tagid=Selectors.Utils.parseTagAndID(selector);var tag=tagid[0],id=tagid[1];if(i==0){items=Selectors.Utils.getByTagAndID(self,tag,id);}else{var uniques={},found=[];for(var j=0,k=items.length;j<k;j++)found=Selectors.Getters[splitter](found,items[j],tag,id,uniques);items=found;}
var parsed=Selectors.Utils.parseSelector(selector);if(parsed){filtered=[];for(var m=0,n=items.length;m<n;m++){item=items[m];if(Selectors.Utils.filter(item,parsed,local))filtered.push(item);}
items=filtered;}}
return items;}};Selectors.Getters={' ':function(found,self,tag,id,uniques){var items=Selectors.Utils.getByTagAndID(self,tag,id);for(var i=0,l=items.length;i<l;i++){var item=items[i];if(Selectors.Utils.chk(item,uniques))found.push(item);}
return found;},'>':function(found,self,tag,id,uniques){var children=Selectors.Utils.getByTagAndID(self,tag,id);for(var i=0,l=children.length;i<l;i++){var child=children[i];if(child.parentNode==self&&Selectors.Utils.chk(child,uniques))found.push(child);}
return found;},'+':function(found,self,tag,id,uniques){while((self=self.nextSibling)){if(self.nodeType==1){if(Selectors.Utils.chk(self,uniques)&&Selectors.Filters.byTag(self,tag)&&Selectors.Filters.byID(self,id))found.push(self);break;}}
return found;},'~':function(found,self,tag,id,uniques){while((self=self.nextSibling)){if(self.nodeType==1){if(!Selectors.Utils.chk(self,uniques))break;if(Selectors.Filters.byTag(self,tag)&&Selectors.Filters.byID(self,id))found.push(self);}}
return found;}};Selectors.Filters={byTag:function(self,tag){return(tag=='*'||(self.tagName&&self.tagName.toLowerCase()==tag));},byID:function(self,id){return(!id||(self.id&&self.id==id));},byClass:function(self,klass){return(self.className&&self.className.contains&&self.className.contains(klass,' '));},byPseudo:function(self,parser,argument,local){return parser.call(self,argument,local);},byAttribute:function(self,name,operator,value){var result=Element.prototype.getProperty.call(self,name);if(!result)return(operator=='!=');if(!operator||value==undefined)return true;switch(operator){case'=':return(result==value);case'*=':return(result.contains(value));case'^=':return(result.substr(0,value.length)==value);case'$=':return(result.substr(result.length-value.length)==value);case'!=':return(result!=value);case'~=':return result.contains(value,' ');case'|=':return result.contains(value,'-');}
return false;}};Selectors.Pseudo=new Hash({checked:function(){return this.checked;},empty:function(){return!(this.innerText||this.textContent||'').length;},not:function(selector){return!Element.match(this,selector);},contains:function(text){return(this.innerText||this.textContent||'').contains(text);},'first-child':function(){return Selectors.Pseudo.index.call(this,0);},'last-child':function(){var element=this;while((element=element.nextSibling)){if(element.nodeType==1)return false;}
return true;},'only-child':function(){var prev=this;while((prev=prev.previousSibling)){if(prev.nodeType==1)return false;}
var next=this;while((next=next.nextSibling)){if(next.nodeType==1)return false;}
return true;},'nth-child':function(argument,local){argument=(argument==undefined)?'n':argument;var parsed=Selectors.Utils.parseNthArgument(argument);if(parsed.special!='n')return Selectors.Pseudo[parsed.special].call(this,parsed.a,local);var count=0;local.positions=local.positions||{};var uid=$uid(this);if(!local.positions[uid]){var self=this;while((self=self.previousSibling)){if(self.nodeType!=1)continue;count++;var position=local.positions[$uid(self)];if(position!=undefined){count=position+count;break;}}
local.positions[uid]=count;}
return(local.positions[uid]%parsed.a==parsed.b);},index:function(index){var element=this,count=0;while((element=element.previousSibling)){if(element.nodeType==1&&++count>index)return false;}
return(count==index);},even:function(argument,local){return Selectors.Pseudo['nth-child'].call(this,'2n+1',local);},odd:function(argument,local){return Selectors.Pseudo['nth-child'].call(this,'2n',local);},selected:function(){return this.selected;},enabled:function(){return(this.disabled===false);}});Element.Events.domready={onAdd:function(fn){if(Browser.loaded)fn.call(this);}};(function(){var domready=function(){if(Browser.loaded)return;Browser.loaded=true;window.fireEvent('domready');document.fireEvent('domready');};window.addEvent('load',domready);if(Browser.Engine.trident){var temp=document.createElement('div');(function(){($try(function(){temp.doScroll();return document.id(temp).inject(document.body).set('html','temp').dispose();}))?domready():arguments.callee.delay(50);})();}else if(Browser.Engine.webkit&&Browser.Engine.version<525){(function(){(['loaded','complete'].contains(document.readyState))?domready():arguments.callee.delay(50);})();}else{document.addEvent('DOMContentLoaded',domready);}})();var JSON=new Hash(this.JSON&&{stringify:JSON.stringify,parse:JSON.parse}).extend({$specialChars:{'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},$replaceChars:function(chr){return JSON.$specialChars[chr]||'\\u00'+Math.floor(chr.charCodeAt()/16).toString(16)+(chr.charCodeAt()%16).toString(16);},encode:function(obj){switch($type(obj)){case'string':return'"'+obj.replace(/[\x00-\x1f\\"]/g,JSON.$replaceChars)+'"';case'array':return'['+String(obj.map(JSON.encode).clean())+']';case'object':case'hash':var string=[];Hash.each(obj,function(value,key){var json=JSON.encode(value);if(json)string.push(JSON.encode(key)+':'+json);});return'{'+string+'}';case'number':case'boolean':return String(obj);case false:return'null';}
return null;},decode:function(string,secure){if($type(string)!='string'||!string.length)return null;if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"/g,'')))return null;return eval('('+string+')');}});var Cookie=new Class({Implements:Options,options:{path:false,domain:false,duration:false,secure:false,document:document},initialize:function(key,options){this.key=key;this.setOptions(options);},write:function(value){value=encodeURIComponent(value);if(this.options.domain)value+='; domain='+this.options.domain;if(this.options.path)value+='; path='+this.options.path;if(this.options.duration){var date=new Date();date.setTime(date.getTime()+this.options.duration*24*60*60*1000);value+='; expires='+date.toGMTString();}
if(this.options.secure)value+='; secure';this.options.document.cookie=this.key+'='+value;return this;},read:function(){var value=this.options.document.cookie.match('(?:^|;)\\s*'+this.key.escapeRegExp()+'=([^;]*)');return(value)?decodeURIComponent(value[1]):null;},dispose:function(){new Cookie(this.key,$merge(this.options,{duration:-1})).write('');return this;}});Cookie.write=function(key,value,options){return new Cookie(key,options).write(value);};Cookie.read=function(key){return new Cookie(key).read();};Cookie.dispose=function(key,options){return new Cookie(key,options).dispose();};var Swiff=new Class({Implements:[Options],options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:'high',allowScriptAccess:'always',wMode:'transparent',swLiveConnect:true},callBacks:{},vars:{}},toElement:function(){return this.object;},initialize:function(path,options){this.instance='Swiff_'+$time();this.setOptions(options);options=this.options;var id=this.id=options.id||this.instance;var container=document.id(options.container);Swiff.CallBacks[this.instance]={};var params=options.params,vars=options.vars,callBacks=options.callBacks;var properties=$extend({height:options.height,width:options.width},options.properties);var self=this;for(var callBack in callBacks){Swiff.CallBacks[this.instance][callBack]=(function(option){return function(){return option.apply(self.object,arguments);};})(callBacks[callBack]);vars[callBack]='Swiff.CallBacks.'+this.instance+'.'+callBack;}
params.flashVars=Hash.toQueryString(vars);if(Browser.Engine.trident){properties.classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';params.movie=path;}else{properties.type='application/x-shockwave-flash';properties.data=path;}
var build='<object id="'+id+'"';for(var property in properties)build+=' '+property+'="'+properties[property]+'"';build+='>';for(var param in params){if(params[param])build+='<param name="'+param+'" value="'+params[param]+'" />';}
build+='</object>';this.object=((container)?container.empty():new Element('div')).set('html',build).firstChild;},replaces:function(element){element=document.id(element,true);element.parentNode.replaceChild(this.toElement(),element);return this;},inject:function(element){document.id(element,true).appendChild(this.toElement());return this;},remote:function(){return Swiff.remote.apply(Swiff,[this.toElement()].extend(arguments));}});Swiff.CallBacks={};Swiff.remote=function(obj,fn){var rs=obj.CallFunction('<invoke name="'+fn+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+'</invoke>');return eval(rs);};var Fx=new Class({Implements:[Chain,Events,Options],options:{fps:50,unit:false,duration:500,link:'ignore'},initialize:function(options){this.subject=this.subject||this;this.setOptions(options);this.options.duration=Fx.Durations[this.options.duration]||this.options.duration.toInt();var wait=this.options.wait;if(wait===false)this.options.link='cancel';},getTransition:function(){return function(p){return-(Math.cos(Math.PI*p)-1)/2;};},step:function(){var time=$time();if(time<this.time+this.options.duration){var delta=this.transition((time-this.time)/this.options.duration);this.set(this.compute(this.from,this.to,delta));}else{this.set(this.compute(this.from,this.to,1));this.complete();}},set:function(now){return now;},compute:function(from,to,delta){return Fx.compute(from,to,delta);},check:function(){if(!this.timer)return true;switch(this.options.link){case'cancel':this.cancel();return true;case'chain':this.chain(this.caller.bind(this,arguments));return false;}
return false;},start:function(from,to){if(!this.check(from,to))return this;this.from=from;this.to=to;this.time=0;this.transition=this.getTransition();this.startTimer();this.onStart();return this;},complete:function(){if(this.stopTimer())this.onComplete();return this;},cancel:function(){if(this.stopTimer())this.onCancel();return this;},onStart:function(){this.fireEvent('start',this.subject);},onComplete:function(){this.fireEvent('complete',this.subject);if(!this.callChain())this.fireEvent('chainComplete',this.subject);},onCancel:function(){this.fireEvent('cancel',this.subject).clearChain();},pause:function(){this.stopTimer();return this;},resume:function(){this.startTimer();return this;},stopTimer:function(){if(!this.timer)return false;this.time=$time()-this.time;this.timer=$clear(this.timer);return true;},startTimer:function(){if(this.timer)return false;this.time=$time()-this.time;this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);return true;}});Fx.compute=function(from,to,delta){return(to-from)*delta+from;};Fx.Durations={'short':250,'normal':500,'long':1000};Fx.CSS=new Class({Extends:Fx,prepare:function(element,property,values){values=$splat(values);var values1=values[1];if(!$chk(values1)){values[1]=values[0];values[0]=element.getStyle(property);}
var parsed=values.map(this.parse);return{from:parsed[0],to:parsed[1]};},parse:function(value){value=$lambda(value)();value=(typeof value=='string')?value.split(' '):$splat(value);return value.map(function(val){val=String(val);var found=false;Fx.CSS.Parsers.each(function(parser,key){if(found)return;var parsed=parser.parse(val);if($chk(parsed))found={value:parsed,parser:parser};});found=found||{value:val,parser:Fx.CSS.Parsers.String};return found;});},compute:function(from,to,delta){var computed=[];(Math.min(from.length,to.length)).times(function(i){computed.push({value:from[i].parser.compute(from[i].value,to[i].value,delta),parser:from[i].parser});});computed.$family={name:'fx:css:value'};return computed;},serve:function(value,unit){if($type(value)!='fx:css:value')value=this.parse(value);var returned=[];value.each(function(bit){returned=returned.concat(bit.parser.serve(bit.value,unit));});return returned;},render:function(element,property,value,unit){element.setStyle(property,this.serve(value,unit));},search:function(selector){if(Fx.CSS.Cache[selector])return Fx.CSS.Cache[selector];var to={};Array.each(document.styleSheets,function(sheet,j){var href=sheet.href;if(href&&href.contains('://')&&!href.contains(document.domain))return;var rules=sheet.rules||sheet.cssRules;Array.each(rules,function(rule,i){if(!rule.style)return;var selectorText=(rule.selectorText)?rule.selectorText.replace(/^\w+/,function(m){return m.toLowerCase();}):null;if(!selectorText||!selectorText.test('^'+selector+'$'))return;Element.Styles.each(function(value,style){if(!rule.style[style]||Element.ShortStyles[style])return;value=String(rule.style[style]);to[style]=(value.test(/^rgb/))?value.rgbToHex():value;});});});return Fx.CSS.Cache[selector]=to;}});Fx.CSS.Cache={};Fx.CSS.Parsers=new Hash({Color:{parse:function(value){if(value.match(/^#[0-9a-f]{3,6}$/i))return value.hexToRgb(true);return((value=value.match(/(\d+),\s*(\d+),\s*(\d+)/)))?[value[1],value[2],value[3]]:false;},compute:function(from,to,delta){return from.map(function(value,i){return Math.round(Fx.compute(from[i],to[i],delta));});},serve:function(value){return value.map(Number);}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(value,unit){return(unit)?value+unit:value;}},String:{parse:$lambda(false),compute:$arguments(1),serve:$arguments(0)}});Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(element,options){this.element=this.subject=document.id(element);this.parent(options);},set:function(property,now){if(arguments.length==1){now=property;property=this.property||this.options.property;}
this.render(this.element,property,now,this.options.unit);return this;},start:function(property,from,to){if(!this.check(property,from,to))return this;var args=Array.flatten(arguments);this.property=this.options.property||args.shift();var parsed=this.prepare(this.element,this.property,args);return this.parent(parsed.from,parsed.to);}});Element.Properties.tween={set:function(options){var tween=this.retrieve('tween');if(tween)tween.cancel();return this.eliminate('tween').store('tween:options',$extend({link:'cancel'},options));},get:function(options){if(options||!this.retrieve('tween')){if(options||!this.retrieve('tween:options'))this.set('tween',options);this.store('tween',new Fx.Tween(this,this.retrieve('tween:options')));}
return this.retrieve('tween');}};Element.implement({tween:function(property,from,to){this.get('tween').start(arguments);return this;},fade:function(how){var fade=this.get('tween'),o='opacity',toggle;how=$pick(how,'toggle');switch(how){case'in':fade.start(o,1);break;case'out':fade.start(o,0);break;case'show':fade.set(o,1);break;case'hide':fade.set(o,0);break;case'toggle':var flag=this.retrieve('fade:flag',this.get('opacity')==1);fade.start(o,(flag)?0:1);this.store('fade:flag',!flag);toggle=true;break;default:fade.start(o,arguments);}
if(!toggle)this.eliminate('fade:flag');return this;},highlight:function(start,end){if(!end){end=this.retrieve('highlight:original',this.getStyle('background-color'));end=(end=='transparent')?'#fff':end;}
var tween=this.get('tween');tween.start('background-color',start||'#ffff88',end).chain(function(){this.setStyle('background-color',this.retrieve('highlight:original'));tween.callChain();}.bind(this));return this;}});Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(element,options){this.element=this.subject=document.id(element);this.parent(options);},set:function(now){if(typeof now=='string')now=this.search(now);for(var p in now)this.render(this.element,p,now[p],this.options.unit);return this;},compute:function(from,to,delta){var now={};for(var p in from)now[p]=this.parent(from[p],to[p],delta);return now;},start:function(properties){if(!this.check(properties))return this;if(typeof properties=='string')properties=this.search(properties);var from={},to={};for(var p in properties){var parsed=this.prepare(this.element,p,properties[p]);from[p]=parsed.from;to[p]=parsed.to;}
return this.parent(from,to);}});Element.Properties.morph={set:function(options){var morph=this.retrieve('morph');if(morph)morph.cancel();return this.eliminate('morph').store('morph:options',$extend({link:'cancel'},options));},get:function(options){if(options||!this.retrieve('morph')){if(options||!this.retrieve('morph:options'))this.set('morph',options);this.store('morph',new Fx.Morph(this,this.retrieve('morph:options')));}
return this.retrieve('morph');}};Element.implement({morph:function(props){this.get('morph').start(props);return this;}});Fx.implement({getTransition:function(){var trans=this.options.transition||Fx.Transitions.Sine.easeInOut;if(typeof trans=='string'){var data=trans.split(':');trans=Fx.Transitions;trans=trans[data[0]]||trans[data[0].capitalize()];if(data[1])trans=trans['ease'+data[1].capitalize()+(data[2]?data[2].capitalize():'')];}
return trans;}});Fx.Transition=function(transition,params){params=$splat(params);return $extend(transition,{easeIn:function(pos){return transition(pos,params);},easeOut:function(pos){return 1-transition(1-pos,params);},easeInOut:function(pos){return(pos<=0.5)?transition(2*pos,params)/2:(2-transition(2*(1-pos),params))/2;}});};Fx.Transitions=new Hash({linear:$arguments(0)});Fx.Transitions.extend=function(transitions){for(var transition in transitions)Fx.Transitions[transition]=new Fx.Transition(transitions[transition]);};Fx.Transitions.extend({Pow:function(p,x){return Math.pow(p,x[0]||6);},Expo:function(p){return Math.pow(2,8*(p-1));},Circ:function(p){return 1-Math.sin(Math.acos(p));},Sine:function(p){return 1-Math.sin((1-p)*Math.PI/2);},Back:function(p,x){x=x[0]||1.618;return Math.pow(p,2)*((x+1)*p-x);},Bounce:function(p){var value;for(var a=0,b=1;1;a+=b,b/=2){if(p>=(7-4*a)/11){value=b*b-Math.pow((11-6*a-11*p)/4,2);break;}}
return value;},Elastic:function(p,x){return Math.pow(2,10*--p)*Math.cos(20*p*Math.PI*(x[0]||1)/3);}});['Quad','Cubic','Quart','Quint'].each(function(transition,i){Fx.Transitions[transition]=new Fx.Transition(function(p){return Math.pow(p,[i+2]);});});var Request=new Class({Implements:[Chain,Events,Options],options:{url:'',data:'',headers:{'X-Requested-With':'XMLHttpRequest','Accept':'text/javascript, text/html, application/xml, text/xml, */*'},async:true,format:false,method:'post',link:'ignore',isSuccess:null,emulation:true,urlEncoded:true,encoding:'utf-8',evalScripts:false,evalResponse:false,noCache:false},initialize:function(options){this.xhr=new Browser.Request();this.setOptions(options);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers=new Hash(this.options.headers);},onStateChange:function(){if(this.xhr.readyState!=4||!this.running)return;this.running=false;this.status=0;$try(function(){this.status=this.xhr.status;}.bind(this));this.xhr.onreadystatechange=$empty;if(this.options.isSuccess.call(this,this.status)){this.response={text:this.xhr.responseText,xml:this.xhr.responseXML};this.success(this.response.text,this.response.xml);}else{this.response={text:null,xml:null};this.failure();}},isSuccess:function(){return((this.status>=200)&&(this.status<300));},processScripts:function(text){if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader('Content-type')))return $exec(text);return text.stripScripts(this.options.evalScripts);},success:function(text,xml){this.onSuccess(this.processScripts(text),xml);},onSuccess:function(){this.fireEvent('complete',arguments).fireEvent('success',arguments).callChain();},failure:function(){this.onFailure();},onFailure:function(){this.fireEvent('complete').fireEvent('failure',this.xhr);},setHeader:function(name,value){this.headers.set(name,value);return this;},getHeader:function(name){return $try(function(){return this.xhr.getResponseHeader(name);}.bind(this));},check:function(){if(!this.running)return true;switch(this.options.link){case'cancel':this.cancel();return true;case'chain':this.chain(this.caller.bind(this,arguments));return false;}
return false;},send:function(options){if(!this.check(options))return this;this.running=true;var type=$type(options);if(type=='string'||type=='element')options={data:options};var old=this.options;options=$extend({data:old.data,url:old.url,method:old.method},options);var data=options.data,url=String(options.url),method=options.method.toLowerCase();switch($type(data)){case'element':data=document.id(data).toQueryString();break;case'object':case'hash':data=Hash.toQueryString(data);}
if(this.options.format){var format='format='+this.options.format;data=(data)?format+'&'+data:format;}
if(this.options.emulation&&!['get','post'].contains(method)){var _method='_method='+method;data=(data)?_method+'&'+data:_method;method='post';}
if(this.options.urlEncoded&&method=='post'){var encoding=(this.options.encoding)?'; charset='+this.options.encoding:'';this.headers.set('Content-type','application/x-www-form-urlencoded'+encoding);}
if(this.options.noCache){var noCache='noCache='+new Date().getTime();data=(data)?noCache+'&'+data:noCache;}
var trimPosition=url.lastIndexOf('/');if(trimPosition>-1&&(trimPosition=url.indexOf('#'))>-1)url=url.substr(0,trimPosition);if(data&&method=='get'){url=url+(url.contains('?')?'&':'?')+data;data=null;}
this.xhr.open(method.toUpperCase(),url,this.options.async);this.xhr.onreadystatechange=this.onStateChange.bind(this);this.headers.each(function(value,key){try{this.xhr.setRequestHeader(key,value);}catch(e){this.fireEvent('exception',[key,value]);}},this);this.fireEvent('request');this.xhr.send(data);if(!this.options.async)this.onStateChange();return this;},cancel:function(){if(!this.running)return this;this.running=false;this.xhr.abort();this.xhr.onreadystatechange=$empty;this.xhr=new Browser.Request();this.fireEvent('cancel');return this;}});(function(){var methods={};['get','post','put','delete','GET','POST','PUT','DELETE'].each(function(method){methods[method]=function(){var params=Array.link(arguments,{url:String.type,data:$defined});return this.send($extend(params,{method:method}));};});Request.implement(methods);})();Element.Properties.send={set:function(options){var send=this.retrieve('send');if(send)send.cancel();return this.eliminate('send').store('send:options',$extend({data:this,link:'cancel',method:this.get('method')||'post',url:this.get('action')},options));},get:function(options){if(options||!this.retrieve('send')){if(options||!this.retrieve('send:options'))this.set('send',options);this.store('send',new Request(this.retrieve('send:options')));}
return this.retrieve('send');}};Element.implement({send:function(url){var sender=this.get('send');sender.send({data:this,url:url||sender.options.url});return this;}});Request.HTML=new Class({Extends:Request,options:{update:false,append:false,evalScripts:true,filter:false},processHTML:function(text){var match=text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);text=(match)?match[1]:text;var container=new Element('div');return $try(function(){var root='<root>'+text+'</root>',doc;if(Browser.Engine.trident){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async=false;doc.loadXML(root);}else{doc=new DOMParser().parseFromString(root,'text/xml');}
root=doc.getElementsByTagName('root')[0];if(!root)return null;for(var i=0,k=root.childNodes.length;i<k;i++){var child=Element.clone(root.childNodes[i],true,true);if(child)container.grab(child);}
return container;})||container.set('html',text);},success:function(text){var options=this.options,response=this.response;response.html=text.stripScripts(function(script){response.javascript=script;});var temp=this.processHTML(response.html);response.tree=temp.childNodes;response.elements=temp.getElements('*');if(options.filter)response.tree=response.elements.filter(options.filter);if(options.update)document.id(options.update).empty().set('html',response.html);else if(options.append)document.id(options.append).adopt(temp.getChildren());if(options.evalScripts)$exec(response.javascript);this.onSuccess(response.tree,response.elements,response.html,response.javascript);}});Element.Properties.load={set:function(options){var load=this.retrieve('load');if(load)load.cancel();return this.eliminate('load').store('load:options',$extend({data:this,link:'cancel',update:this,method:'get'},options));},get:function(options){if(options||!this.retrieve('load')){if(options||!this.retrieve('load:options'))this.set('load',options);this.store('load',new Request.HTML(this.retrieve('load:options')));}
return this.retrieve('load');}};Element.implement({load:function(){this.get('load').send(Array.link(arguments,{data:Object.type,url:String.type}));return this;}});Request.JSON=new Class({Extends:Request,options:{secure:true},initialize:function(options){this.parent(options);this.headers.extend({'Accept':'application/json','X-Request':'JSON'});},success:function(text){this.response.json=JSON.decode(text,this.options.secure);this.onSuccess(this.response.json,text);}});//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

MooTools.More={version:"1.2.4.4",build:"6f6057dc645fdb7547689183b2311063bd653ddf"};(function(){var a={language:"en-US",languages:{"en-US":{}},cascades:["en-US"]};
var b;MooTools.lang=new Events();$extend(MooTools.lang,{setLanguage:function(c){if(!a.languages[c]){return this;}a.language=c;this.load();this.fireEvent("langChange",c);
return this;},load:function(){var c=this.cascade(this.getCurrentLanguage());b={};$each(c,function(e,d){b[d]=this.lambda(e);},this);},getCurrentLanguage:function(){return a.language;
},addLanguage:function(c){a.languages[c]=a.languages[c]||{};return this;},cascade:function(e){var c=(a.languages[e]||{}).cascades||[];c.combine(a.cascades);
c.erase(e).push(e);var d=c.map(function(f){return a.languages[f];},this);return $merge.apply(this,d);},lambda:function(c){(c||{}).get=function(e,d){return $lambda(c[e]).apply(this,$splat(d));
};return c;},get:function(e,d,c){if(b&&b[e]){return(d?b[e].get(d,c):b[e]);}},set:function(d,e,c){this.addLanguage(d);langData=a.languages[d];if(!langData[e]){langData[e]={};
}$extend(langData[e],c);if(d==this.getCurrentLanguage()){this.load();this.fireEvent("langChange",d);}return this;},list:function(){return Hash.getKeys(a.languages);
}});})();(function(){var c=this;var b=function(){if(c.console&&console.log){try{console.log.apply(console,arguments);}catch(d){console.log(Array.slice(arguments));
}}else{Log.logged.push(arguments);}return this;};var a=function(){this.logged.push(arguments);return this;};this.Log=new Class({logged:[],log:a,resetLog:function(){this.logged.empty();
return this;},enableLog:function(){this.log=b;this.logged.each(function(d){this.log.apply(this,d);},this);return this.resetLog();},disableLog:function(){this.log=a;
return this;}});Log.extend(new Log).enableLog();Log.logger=function(){return this.log.apply(this,arguments);};})();Class.Mutators.Binds=function(a){return a;
};Class.Mutators.initialize=function(a){return function(){$splat(this.Binds).each(function(b){var c=this[b];if(c){this[b]=c.bind(this);}},this);return a.apply(this,arguments);
};};(function(){var i=this.Date;if(!i.now){i.now=$time;}i.Methods={ms:"Milliseconds",year:"FullYear",min:"Minutes",mo:"Month",sec:"Seconds",hr:"Hours"};
["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds","Time","TimezoneOffset","Week","Timezone","GMTOffset","DayOfYear","LastMonth","LastDayOfMonth","UTCDate","UTCDay","UTCFullYear","AMPM","Ordinal","UTCHours","UTCMilliseconds","UTCMinutes","UTCMonth","UTCSeconds"].each(function(p){i.Methods[p.toLowerCase()]=p;
});var d=function(q,p){return new Array(p-String(q).length+1).join("0")+q;};i.implement({set:function(t,r){switch($type(t)){case"object":for(var s in t){this.set(s,t[s]);
}break;case"string":t=t.toLowerCase();var q=i.Methods;if(q[t]){this["set"+q[t]](r);}}return this;},get:function(q){q=q.toLowerCase();var p=i.Methods;if(p[q]){return this["get"+p[q]]();
}return null;},clone:function(){return new i(this.get("time"));},increment:function(p,r){p=p||"day";r=$pick(r,1);switch(p){case"year":return this.increment("month",r*12);
case"month":var q=this.get("date");this.set("date",1).set("mo",this.get("mo")+r);return this.set("date",q.min(this.get("lastdayofmonth")));case"week":return this.increment("day",r*7);
case"day":return this.set("date",this.get("date")+r);}if(!i.units[p]){throw new Error(p+" is not a supported interval");}return this.set("time",this.get("time")+r*i.units[p]());
},decrement:function(p,q){return this.increment(p,-1*$pick(q,1));},isLeapYear:function(){return i.isLeapYear(this.get("year"));},clearTime:function(){return this.set({hr:0,min:0,sec:0,ms:0});
},diff:function(q,p){if($type(q)=="string"){q=i.parse(q);}return((q-this)/i.units[p||"day"](3,3)).toInt();},getLastDayOfMonth:function(){return i.daysInMonth(this.get("mo"),this.get("year"));
},getDayOfYear:function(){return(i.UTC(this.get("year"),this.get("mo"),this.get("date")+1)-i.UTC(this.get("year"),0,1))/i.units.day();},getWeek:function(){return(this.get("dayofyear")/7).ceil();
},getOrdinal:function(p){return i.getMsg("ordinal",p||this.get("date"));},getTimezone:function(){return this.toString().replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");
},getGMTOffset:function(){var p=this.get("timezoneOffset");return((p>0)?"-":"+")+d((p.abs()/60).floor(),2)+d(p%60,2);},setAMPM:function(p){p=p.toUpperCase();
var q=this.get("hr");if(q>11&&p=="AM"){return this.decrement("hour",12);}else{if(q<12&&p=="PM"){return this.increment("hour",12);}}return this;},getAMPM:function(){return(this.get("hr")<12)?"AM":"PM";
},parse:function(p){this.set("time",i.parse(p));return this;},isValid:function(p){return !!(p||this).valueOf();},format:function(p){if(!this.isValid()){return"invalid date";
}p=p||"%x %X";p=k[p.toLowerCase()]||p;var q=this;return p.replace(/%([a-z%])/gi,function(s,r){switch(r){case"a":return i.getMsg("days")[q.get("day")].substr(0,3);
case"A":return i.getMsg("days")[q.get("day")];case"b":return i.getMsg("months")[q.get("month")].substr(0,3);case"B":return i.getMsg("months")[q.get("month")];
case"c":return q.toString();case"d":return d(q.get("date"),2);case"H":return d(q.get("hr"),2);case"I":return((q.get("hr")%12)||12);case"j":return d(q.get("dayofyear"),3);
case"m":return d((q.get("mo")+1),2);case"M":return d(q.get("min"),2);case"o":return q.get("ordinal");case"p":return i.getMsg(q.get("ampm"));case"S":return d(q.get("seconds"),2);
case"U":return d(q.get("week"),2);case"w":return q.get("day");case"x":return q.format(i.getMsg("shortDate"));case"X":return q.format(i.getMsg("shortTime"));
case"y":return q.get("year").toString().substr(2);case"Y":return q.get("year");case"T":return q.get("GMTOffset");case"Z":return q.get("Timezone");}return r;
});},toISOString:function(){return this.format("iso8601");}});i.alias("toISOString","toJSON");i.alias("diff","compare");i.alias("format","strftime");var k={db:"%Y-%m-%d %H:%M:%S",compact:"%Y%m%dT%H%M%S",iso8601:"%Y-%m-%dT%H:%M:%S%T",rfc822:"%a, %d %b %Y %H:%M:%S %Z","short":"%d %b %H:%M","long":"%B %d, %Y %H:%M"};
var g=[];var e=i.parse;var n=function(s,u,r){var q=-1;var t=i.getMsg(s+"s");switch($type(u)){case"object":q=t[u.get(s)];break;case"number":q=t[month-1];
if(!q){throw new Error("Invalid "+s+" index: "+index);}break;case"string":var p=t.filter(function(v){return this.test(v);},new RegExp("^"+u,"i"));if(!p.length){throw new Error("Invalid "+s+" string");
}if(p.length>1){throw new Error("Ambiguous "+s);}q=p[0];}return(r)?t.indexOf(q):q;};i.extend({getMsg:function(q,p){return MooTools.lang.get("Date",q,p);
},units:{ms:$lambda(1),second:$lambda(1000),minute:$lambda(60000),hour:$lambda(3600000),day:$lambda(86400000),week:$lambda(608400000),month:function(q,p){var r=new i;
return i.daysInMonth($pick(q,r.get("mo")),$pick(p,r.get("year")))*86400000;},year:function(p){p=p||new i().get("year");return i.isLeapYear(p)?31622400000:31536000000;
}},daysInMonth:function(q,p){return[31,i.isLeapYear(p)?29:28,31,30,31,30,31,31,30,31,30,31][q];},isLeapYear:function(p){return((p%4===0)&&(p%100!==0))||(p%400===0);
},parse:function(r){var q=$type(r);if(q=="number"){return new i(r);}if(q!="string"){return r;}r=r.clean();if(!r.length){return null;}var p;g.some(function(t){var s=t.re.exec(r);
return(s)?(p=t.handler(s)):false;});return p||new i(e(r));},parseDay:function(p,q){return n("day",p,q);},parseMonth:function(q,p){return n("month",q,p);
},parseUTC:function(q){var p=new i(q);var r=i.UTC(p.get("year"),p.get("mo"),p.get("date"),p.get("hr"),p.get("min"),p.get("sec"));return new i(r);},orderIndex:function(p){return i.getMsg("dateOrder").indexOf(p)+1;
},defineFormat:function(p,q){k[p]=q;},defineFormats:function(p){for(var q in p){i.defineFormat(q,p[q]);}},parsePatterns:g,defineParser:function(p){g.push((p.re&&p.handler)?p:l(p));
},defineParsers:function(){Array.flatten(arguments).each(i.defineParser);},define2DigitYearStart:function(p){h=p%100;m=p-h;}});var m=1900;var h=70;var j=function(p){return new RegExp("(?:"+i.getMsg(p).map(function(q){return q.substr(0,3);
}).join("|")+")[a-z]*");};var a=function(p){switch(p){case"x":return((i.orderIndex("month")==1)?"%m[.-/]%d":"%d[.-/]%m")+"([.-/]%y)?";case"X":return"%H([.:]%M)?([.:]%S([.:]%s)?)? ?%p? ?%T?";
}return null;};var o={d:/[0-2]?[0-9]|3[01]/,H:/[01]?[0-9]|2[0-3]/,I:/0?[1-9]|1[0-2]/,M:/[0-5]?\d/,s:/\d+/,o:/[a-z]*/,p:/[ap]\.?m\.?/,y:/\d{2}|\d{4}/,Y:/\d{4}/,T:/Z|[+-]\d{2}(?::?\d{2})?/};
o.m=o.I;o.S=o.M;var c;var b=function(p){c=p;o.a=o.A=j("days");o.b=o.B=j("months");g.each(function(r,q){if(r.format){g[q]=l(r.format);}});};var l=function(r){if(!c){return{format:r};
}var p=[];var q=(r.source||r).replace(/%([a-z])/gi,function(t,s){return a(s)||t;}).replace(/\((?!\?)/g,"(?:").replace(/ (?!\?|\*)/g,",? ").replace(/%([a-z%])/gi,function(t,s){var u=o[s];
if(!u){return s;}p.push(s);return"("+u.source+")";}).replace(/\[a-z\]/gi,"[a-z\\u00c0-\\uffff]");return{format:r,re:new RegExp("^"+q+"$","i"),handler:function(u){u=u.slice(1).associate(p);
var s=new i().clearTime();if("d" in u){f.call(s,"d",1);}if("m" in u||"b" in u||"B" in u){f.call(s,"m",1);}for(var t in u){f.call(s,t,u[t]);}return s;}};
};var f=function(p,q){if(!q){return this;}switch(p){case"a":case"A":return this.set("day",i.parseDay(q,true));case"b":case"B":return this.set("mo",i.parseMonth(q,true));
case"d":return this.set("date",q);case"H":case"I":return this.set("hr",q);case"m":return this.set("mo",q-1);case"M":return this.set("min",q);case"p":return this.set("ampm",q.replace(/\./g,""));
case"S":return this.set("sec",q);case"s":return this.set("ms",("0."+q)*1000);case"w":return this.set("day",q);case"Y":return this.set("year",q);case"y":q=+q;
if(q<100){q+=m+(q<h?100:0);}return this.set("year",q);case"T":if(q=="Z"){q="+00";}var r=q.match(/([+-])(\d{2}):?(\d{2})?/);r=(r[1]+"1")*(r[2]*60+(+r[3]||0))+this.getTimezoneOffset();
return this.set("time",this-r*60000);}return this;};i.defineParsers("%Y([-./]%m([-./]%d((T| )%X)?)?)?","%Y%m%d(T%H(%M%S?)?)?","%x( %X)?","%d%o( %b( %Y)?)?( %X)?","%b( %d%o)?( %Y)?( %X)?","%Y %b( %d%o( %X)?)?","%o %b %d %X %T %Y");
MooTools.lang.addEvent("langChange",function(p){if(MooTools.lang.get("Date")){b(p);}}).fireEvent("langChange",MooTools.lang.getCurrentLanguage());})();
Element.implement({tidy:function(){this.set("value",this.get("value").tidy());},getTextInRange:function(b,a){return this.get("value").substring(b,a);},getSelectedText:function(){if(this.setSelectionRange){return this.getTextInRange(this.getSelectionStart(),this.getSelectionEnd());
}return document.selection.createRange().text;},getSelectedRange:function(){if($defined(this.selectionStart)){return{start:this.selectionStart,end:this.selectionEnd};
}var e={start:0,end:0};var a=this.getDocument().selection.createRange();if(!a||a.parentElement()!=this){return e;}var c=a.duplicate();if(this.type=="text"){e.start=0-c.moveStart("character",-100000);
e.end=e.start+a.text.length;}else{var b=this.get("value");var d=b.length;c.moveToElementText(this);c.setEndPoint("StartToEnd",a);if(c.text.length){d-=b.match(/[\n\r]*$/)[0].length;
}e.end=d-c.text.length;c.setEndPoint("StartToStart",a);e.start=d-c.text.length;}return e;},getSelectionStart:function(){return this.getSelectedRange().start;
},getSelectionEnd:function(){return this.getSelectedRange().end;},setCaretPosition:function(a){if(a=="end"){a=this.get("value").length;}this.selectRange(a,a);
return this;},getCaretPosition:function(){return this.getSelectedRange().start;},selectRange:function(e,a){if(this.setSelectionRange){this.focus();this.setSelectionRange(e,a);
}else{var c=this.get("value");var d=c.substr(e,a-e).replace(/\r/g,"").length;e=c.substr(0,e).replace(/\r/g,"").length;var b=this.createTextRange();b.collapse(true);
b.moveEnd("character",e+d);b.moveStart("character",e);b.select();}return this;},insertAtCursor:function(b,a){var d=this.getSelectedRange();var c=this.get("value");
this.set("value",c.substring(0,d.start)+b+c.substring(d.end,c.length));if($pick(a,true)){this.selectRange(d.start,d.start+b.length);}else{this.setCaretPosition(d.start+b.length);
}return this;},insertAroundCursor:function(b,a){b=$extend({before:"",defaultMiddle:"",after:""},b);var c=this.getSelectedText()||b.defaultMiddle;var g=this.getSelectedRange();
var f=this.get("value");if(g.start==g.end){this.set("value",f.substring(0,g.start)+b.before+c+b.after+f.substring(g.end,f.length));this.selectRange(g.start+b.before.length,g.end+b.before.length+c.length);
}else{var d=f.substring(g.start,g.end);this.set("value",f.substring(0,g.start)+b.before+d+b.after+f.substring(g.end,f.length));var e=g.start+b.before.length;
if($pick(a,true)){this.selectRange(e,e+d.length);}else{this.setCaretPosition(e+f.length);}}return this;}});Element.implement({isDisplayed:function(){return this.getStyle("display")!="none";
},isVisible:function(){var a=this.offsetWidth,b=this.offsetHeight;return(a==0&&b==0)?false:(a>0&&b>0)?true:this.isDisplayed();},toggle:function(){return this[this.isDisplayed()?"hide":"show"]();
},hide:function(){var b;try{b=this.getStyle("display");}catch(a){}return this.store("originalDisplay",b||"").setStyle("display","none");},show:function(a){a=a||this.retrieve("originalDisplay")||"block";
return this.setStyle("display",(a=="none")?"block":a);},swapClass:function(a,b){return this.removeClass(a).addClass(b);}});if(!window.Form){window.Form={};
}var InputValidator=new Class({Implements:[Options],options:{errorMsg:"Validation failed.",test:function(a){return true;}},initialize:function(b,a){this.setOptions(a);
this.className=b;},test:function(b,a){if(document.id(b)){return this.options.test(document.id(b),a||this.getProps(b));}else{return false;}},getError:function(c,a){var b=this.options.errorMsg;
if($type(b)=="function"){b=b(document.id(c),a||this.getProps(c));}return b;},getProps:function(a){if(!document.id(a)){return{};}return a.get("validatorProps");
}});Element.Properties.validatorProps={set:function(a){return this.eliminate("validatorProps").store("validatorProps",a);},get:function(a){if(a){this.set(a);
}if(this.retrieve("validatorProps")){return this.retrieve("validatorProps");}if(this.getProperty("validatorProps")){try{this.store("validatorProps",JSON.decode(this.getProperty("validatorProps")));
}catch(c){return{};}}else{var b=this.get("class").split(" ").filter(function(d){return d.test(":");});if(!b.length){this.store("validatorProps",{});}else{a={};
b.each(function(d){var f=d.split(":");if(f[1]){try{a[f[0]]=JSON.decode(f[1]);}catch(g){}}});this.store("validatorProps",a);}}return this.retrieve("validatorProps");
}};Form.Validator=new Class({Implements:[Options,Events],Binds:["onSubmit"],options:{fieldSelectors:"input, select, textarea",ignoreHidden:true,ignoreDisabled:true,useTitles:false,evaluateOnSubmit:true,evaluateFieldsOnBlur:true,evaluateFieldsOnChange:true,serial:true,stopOnFailure:true,warningPrefix:function(){return Form.Validator.getMsg("warningPrefix")||"Warning: ";
},errorPrefix:function(){return Form.Validator.getMsg("errorPrefix")||"Error: ";}},initialize:function(b,a){this.setOptions(a);this.element=document.id(b);
this.element.store("validator",this);this.warningPrefix=$lambda(this.options.warningPrefix)();this.errorPrefix=$lambda(this.options.errorPrefix)();if(this.options.evaluateOnSubmit){this.element.addEvent("submit",this.onSubmit);
}if(this.options.evaluateFieldsOnBlur||this.options.evaluateFieldsOnChange){this.watchFields(this.getFields());}},toElement:function(){return this.element;
},getFields:function(){return(this.fields=this.element.getElements(this.options.fieldSelectors));},watchFields:function(a){a.each(function(b){if(this.options.evaluateFieldsOnBlur){b.addEvent("blur",this.validationMonitor.pass([b,false],this));
}if(this.options.evaluateFieldsOnChange){b.addEvent("change",this.validationMonitor.pass([b,true],this));}},this);},validationMonitor:function(){$clear(this.timer);
this.timer=this.validateField.delay(50,this,arguments);},onSubmit:function(a){if(!this.validate(a)&&a){a.preventDefault();}else{this.reset();}},reset:function(){this.getFields().each(this.resetField,this);
return this;},validate:function(b){var a=this.getFields().map(function(c){return this.validateField(c,true);},this).every(function(c){return c;});this.fireEvent("formValidate",[a,this.element,b]);
if(this.options.stopOnFailure&&!a&&b){b.preventDefault();}return a;},validateField:function(i,a){if(this.paused){return true;}i=document.id(i);var d=!i.hasClass("validation-failed");
var f,h;if(this.options.serial&&!a){f=this.element.getElement(".validation-failed");h=this.element.getElement(".warning");}if(i&&(!f||a||i.hasClass("validation-failed")||(f&&!this.options.serial))){var c=i.className.split(" ").some(function(j){return this.getValidator(j);
},this);var g=[];i.className.split(" ").each(function(j){if(j&&!this.test(j,i)){g.include(j);}},this);d=g.length===0;if(c&&!i.hasClass("warnOnly")){if(d){i.addClass("validation-passed").removeClass("validation-failed");
this.fireEvent("elementPass",i);}else{i.addClass("validation-failed").removeClass("validation-passed");this.fireEvent("elementFail",[i,g]);}}if(!h){var e=i.className.split(" ").some(function(j){if(j.test("^warn-")||i.hasClass("warnOnly")){return this.getValidator(j.replace(/^warn-/,""));
}else{return null;}},this);i.removeClass("warning");var b=i.className.split(" ").map(function(j){if(j.test("^warn-")||i.hasClass("warnOnly")){return this.test(j.replace(/^warn-/,""),i,true);
}else{return null;}},this);}}return d;},test:function(b,d,e){d=document.id(d);if((this.options.ignoreHidden&&!d.isVisible())||(this.options.ignoreDisabled&&d.get("disabled"))){return true;
}var a=this.getValidator(b);if(d.hasClass("ignoreValidation")){return true;}e=$pick(e,false);if(d.hasClass("warnOnly")){e=true;}var c=a?a.test(d):true;
if(a&&d.isVisible()){this.fireEvent("elementValidate",[c,d,b,e]);}if(e){return true;}return c;},resetField:function(a){a=document.id(a);if(a){a.className.split(" ").each(function(b){if(b.test("^warn-")){b=b.replace(/^warn-/,"");
}a.removeClass("validation-failed");a.removeClass("warning");a.removeClass("validation-passed");},this);}return this;},stop:function(){this.paused=true;
return this;},start:function(){this.paused=false;return this;},ignoreField:function(a,b){a=document.id(a);if(a){this.enforceField(a);if(b){a.addClass("warnOnly");
}else{a.addClass("ignoreValidation");}}return this;},enforceField:function(a){a=document.id(a);if(a){a.removeClass("warnOnly").removeClass("ignoreValidation");
}return this;}});Form.Validator.getMsg=function(a){return MooTools.lang.get("Form.Validator",a);};Form.Validator.adders={validators:{},add:function(b,a){this.validators[b]=new InputValidator(b,a);
if(!this.initialize){this.implement({validators:this.validators});}},addAllThese:function(a){$A(a).each(function(b){this.add(b[0],b[1]);},this);},getValidator:function(a){return this.validators[a.split(":")[0]];
}};$extend(Form.Validator,Form.Validator.adders);Form.Validator.implement(Form.Validator.adders);Form.Validator.add("IsEmpty",{errorMsg:false,test:function(a){if(a.type=="select-one"||a.type=="select"){return !(a.selectedIndex>=0&&a.options[a.selectedIndex].value!="");
}else{return((a.get("value")==null)||(a.get("value").length==0));}}});Form.Validator.addAllThese([["required",{errorMsg:function(){return Form.Validator.getMsg("required");
},test:function(a){return !Form.Validator.getValidator("IsEmpty").test(a);}}],["minLength",{errorMsg:function(a,b){if($type(b.minLength)){return Form.Validator.getMsg("minLength").substitute({minLength:b.minLength,length:a.get("value").length});
}else{return"";}},test:function(a,b){if($type(b.minLength)){return(a.get("value").length>=$pick(b.minLength,0));}else{return true;}}}],["maxLength",{errorMsg:function(a,b){if($type(b.maxLength)){return Form.Validator.getMsg("maxLength").substitute({maxLength:b.maxLength,length:a.get("value").length});
}else{return"";}},test:function(a,b){return(a.get("value").length<=$pick(b.maxLength,10000));}}],["validate-integer",{errorMsg:Form.Validator.getMsg.pass("integer"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^(-?[1-9]\d*|0)$/).test(a.get("value"));
}}],["validate-numeric",{errorMsg:Form.Validator.getMsg.pass("numeric"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/).test(a.get("value"));
}}],["validate-digits",{errorMsg:Form.Validator.getMsg.pass("digits"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^[\d() .:\-\+#]+$/.test(a.get("value")));
}}],["validate-alpha",{errorMsg:Form.Validator.getMsg.pass("alpha"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^[a-zA-Z]+$/).test(a.get("value"));
}}],["validate-alphanum",{errorMsg:Form.Validator.getMsg.pass("alphanum"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||!(/\W/).test(a.get("value"));
}}],["validate-date",{errorMsg:function(a,b){if(Date.parse){var c=b.dateFormat||"%x";return Form.Validator.getMsg("dateSuchAs").substitute({date:new Date().format(c)});
}else{return Form.Validator.getMsg("dateInFormatMDY");}},test:function(a,b){if(Form.Validator.getValidator("IsEmpty").test(a)){return true;}var g;if(Date.parse){var f=b.dateFormat||"%x";
g=Date.parse(a.get("value"));var e=g.format(f);if(e!="invalid date"){a.set("value",e);}return !isNaN(g);}else{var c=/^(\d{2})\/(\d{2})\/(\d{4})$/;if(!c.test(a.get("value"))){return false;
}g=new Date(a.get("value").replace(c,"$1/$2/$3"));return(parseInt(RegExp.$1,10)==(1+g.getMonth()))&&(parseInt(RegExp.$2,10)==g.getDate())&&(parseInt(RegExp.$3,10)==g.getFullYear());
}}}],["validate-email",{errorMsg:Form.Validator.getMsg.pass("email"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(a.get("value"));
}}],["validate-url",{errorMsg:Form.Validator.getMsg.pass("url"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i).test(a.get("value"));
}}],["validate-currency-dollar",{errorMsg:Form.Validator.getMsg.pass("currencyDollar"),test:function(a){return Form.Validator.getValidator("IsEmpty").test(a)||(/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(a.get("value"));
}}],["validate-one-required",{errorMsg:Form.Validator.getMsg.pass("oneRequired"),test:function(a,b){var c=document.id(b["validate-one-required"])||a.getParent();
return c.getElements("input").some(function(d){if(["checkbox","radio"].contains(d.get("type"))){return d.get("checked");}return d.get("value");});}}]]);
Element.Properties.validator={set:function(a){var b=this.retrieve("validator");if(b){b.setOptions(a);}return this.store("validator:options");},get:function(a){if(a||!this.retrieve("validator")){if(a||!this.retrieve("validator:options")){this.set("validator",a);
}this.store("validator",new Form.Validator(this,this.retrieve("validator:options")));}return this.retrieve("validator");}};Element.implement({validate:function(a){this.set("validator",a);
return this.get("validator",a).validate();}});var FormValidator=Form.Validator;Form.Validator.Inline=new Class({Extends:Form.Validator,options:{scrollToErrorsOnSubmit:true,scrollFxOptions:{transition:"quad:out",offset:{y:-20}}},initialize:function(b,a){this.parent(b,a);
this.addEvent("onElementValidate",function(g,f,e,h){var d=this.getValidator(e);if(!g&&d.getError(f)){if(h){f.addClass("warning");}var c=this.makeAdvice(e,f,d.getError(f),h);
this.insertAdvice(c,f);this.showAdvice(e,f);}else{this.hideAdvice(e,f);}});},makeAdvice:function(d,f,c,g){var e=(g)?this.warningPrefix:this.errorPrefix;
e+=(this.options.useTitles)?f.title||c:c;var a=(g)?"warning-advice":"validation-advice";var b=this.getAdvice(d,f);if(b){b=b.set("html",e);}else{b=new Element("div",{html:e,styles:{display:"none"},id:"advice-"+d+"-"+this.getFieldId(f)}).addClass(a);
}f.store("advice-"+d,b);return b;},getFieldId:function(a){return a.id?a.id:a.id="input_"+a.name;},showAdvice:function(b,c){var a=this.getAdvice(b,c);if(a&&!c.retrieve(this.getPropName(b))&&(a.getStyle("display")=="none"||a.getStyle("visiblity")=="hidden"||a.getStyle("opacity")==0)){c.store(this.getPropName(b),true);
if(a.reveal){a.reveal();}else{a.setStyle("display","block");}}},hideAdvice:function(b,c){var a=this.getAdvice(b,c);if(a&&c.retrieve(this.getPropName(b))){c.store(this.getPropName(b),false);
if(a.dissolve){a.dissolve();}else{a.setStyle("display","none");}}},getPropName:function(a){return"advice"+a;},resetField:function(a){a=document.id(a);if(!a){return this;
}this.parent(a);a.className.split(" ").each(function(b){this.hideAdvice(b,a);},this);return this;},getAllAdviceMessages:function(d,c){var b=[];if(d.hasClass("ignoreValidation")&&!c){return b;
}var a=d.className.split(" ").some(function(g){var e=g.test("^warn-")||d.hasClass("warnOnly");if(e){g=g.replace(/^warn-/,"");}var f=this.getValidator(g);
if(!f){return;}b.push({message:f.getError(d),warnOnly:e,passed:f.test(),validator:f});},this);return b;},getAdvice:function(a,b){return b.retrieve("advice-"+a);
},insertAdvice:function(a,c){var b=c.get("validatorProps");if(!b.msgPos||!document.id(b.msgPos)){if(c.type.toLowerCase()=="radio"){c.getParent().adopt(a);
}else{a.inject(document.id(c),"after");}}else{document.id(b.msgPos).grab(a);}},validateField:function(f,e){var a=this.parent(f,e);if(this.options.scrollToErrorsOnSubmit&&!a){var b=document.id(this).getElement(".validation-failed");
var c=document.id(this).getParent();while(c!=document.body&&c.getScrollSize().y==c.getSize().y){c=c.getParent();}var d=c.retrieve("fvScroller");if(!d&&window.Fx&&Fx.Scroll){d=new Fx.Scroll(c,this.options.scrollFxOptions);
c.store("fvScroller",d);}if(b){if(d){d.toElement(b);}else{c.scrollTo(c.getScroll().x,b.getPosition(c).y-20);}}}return a;}});Request.JSONP=new Class({Implements:[Chain,Events,Options,Log],options:{url:"",data:{},retries:0,timeout:0,link:"ignore",callbackKey:"callback",injectScript:document.head},initialize:function(a){this.setOptions(a);
if(this.options.log){this.enableLog();}this.running=false;this.requests=0;this.triesRemaining=[];},check:function(){if(!this.running){return true;}switch(this.options.link){case"cancel":this.cancel();
return true;case"chain":this.chain(this.caller.bind(this,arguments));return false;}return false;},send:function(c){if(!$chk(arguments[1])&&!this.check(c)){return this;
}var e=$type(c),a=this.options,b=$chk(arguments[1])?arguments[1]:this.requests++;if(e=="string"||e=="element"){c={data:c};}c=$extend({data:a.data,url:a.url},c);
if(!$chk(this.triesRemaining[b])){this.triesRemaining[b]=this.options.retries;}var d=this.triesRemaining[b];(function(){var f=this.getScript(c);this.log("JSONP retrieving script with url: "+f.get("src"));
this.fireEvent("request",f);this.running=true;(function(){if(d){this.triesRemaining[b]=d-1;if(f){f.destroy();this.send(c,b).fireEvent("retry",this.triesRemaining[b]);
}}else{if(f&&this.options.timeout){f.destroy();this.cancel().fireEvent("failure");}}}).delay(this.options.timeout,this);}).delay(Browser.Engine.trident?50:0,this);
return this;},cancel:function(){if(!this.running){return this;}this.running=false;this.fireEvent("cancel");return this;},getScript:function(c){var b=Request.JSONP.counter,d;
Request.JSONP.counter++;switch($type(c.data)){case"element":d=document.id(c.data).toQueryString();break;case"object":case"hash":d=Hash.toQueryString(c.data);
}var e=c.url+(c.url.test("\\?")?"&":"?")+(c.callbackKey||this.options.callbackKey)+"=Request.JSONP.request_map.request_"+b+(d?"&"+d:"");if(e.length>2083){this.log("JSONP "+e+" will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs");
}var a=new Element("script",{type:"text/javascript",src:e});Request.JSONP.request_map["request_"+b]=function(){this.success(arguments,a);}.bind(this);return a.inject(this.options.injectScript);
},success:function(b,a){if(a){a.destroy();}this.running=false;this.log("JSONP successfully retrieved: ",b);this.fireEvent("complete",b).fireEvent("success",b).callChain();
}});Request.JSONP.counter=0;Request.JSONP.request_map={};MooTools.lang.set("en-US","Date",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dateOrder:["month","date","year"],shortDate:"%m/%d/%Y",shortTime:"%I:%M%p",AM:"AM",PM:"PM",ordinal:function(a){return(a>3&&a<21)?"th":["th","st","nd","rd","th"][Math.min(a%10,4)];
},lessThanMinuteAgo:"less than a minute ago",minuteAgo:"about a minute ago",minutesAgo:"{delta} minutes ago",hourAgo:"about an hour ago",hoursAgo:"about {delta} hours ago",dayAgo:"1 day ago",daysAgo:"{delta} days ago",weekAgo:"1 week ago",weeksAgo:"{delta} weeks ago",monthAgo:"1 month ago",monthsAgo:"{delta} months ago",yearAgo:"1 year ago",yearsAgo:"{delta} years ago",lessThanMinuteUntil:"less than a minute from now",minuteUntil:"about a minute from now",minutesUntil:"{delta} minutes from now",hourUntil:"about an hour from now",hoursUntil:"about {delta} hours from now",dayUntil:"1 day from now",daysUntil:"{delta} days from now",weekUntil:"1 week from now",weeksUntil:"{delta} weeks from now",monthUntil:"1 month from now",monthsUntil:"{delta} months from now",yearUntil:"1 year from now",yearsUntil:"{delta} years from now"});
MooTools.lang.set("en-US","Form.Validator",{required:"This field is required.",minLength:"Please enter at least {minLength} characters (you entered {length} characters).",maxLength:"Please enter no more than {maxLength} characters (you entered {length} characters).",integer:"Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.",numeric:'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").',digits:"Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).",alpha:"Please use letters only (a-z) with in this field. No spaces or other characters are allowed.",alphanum:"Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.",dateSuchAs:"Please enter a valid date such as {date}",dateInFormatMDY:'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',email:'Please enter a valid email address. For example "fred@domain.com".',url:"Please enter a valid URL such as http://www.google.com.",currencyDollar:"Please enter a valid $ amount. For example $100.00 .",oneRequired:"Please enter something for at least one of these inputs.",errorPrefix:"Error: ",warningPrefix:"Warning: ",noSpace:"There can be no spaces in this input.",reqChkByNode:"No items are selected.",requiredChk:"This field is required.",reqChkByName:"Please select a {label}.",match:"This field needs to match the {matchName} field",startDate:"the start date",endDate:"the end date",currendDate:"the current date",afterDate:"The date should be the same or after {label}.",beforeDate:"The date should be the same or before {label}.",startMonth:"Please select a start month",sameMonth:"These two dates must be in the same month - you must change one or the other.",creditcard:"The credit card number entered is invalid. Please check the number and try again. {length} digits entered."});
Class.refactor=function(original,refactors){$each(refactors,function(item,name){var origin=original.prototype[name];if(origin&&(origin=origin._origin)&&typeof item=='function')original.implement(name,function(){var old=this.previous;this.previous=origin;var value=item.apply(this,arguments);this.previous=old;return value;});else original.implement(name,item);});return original;};Class.Occlude=new Class({occlude:function(property,element){element=document.id(element||this.element);var instance=element.retrieve(property||this.property);if(instance&&!$defined(this.occluded))
	return this.occluded=instance;this.occluded=false;element.store(property||this.property,this);return this.occluded;}});String.implement({parseQueryString:function(){var vars=this.split(/[&;]/),res={};if(vars.length)vars.each(function(val){var index=val.indexOf('='),keys=index<0?['']:val.substr(0,index).match(/[^\]\[]+/g),value=decodeURIComponent(val.substr(index+1)),obj=res;keys.each(function(key,i){var current=obj[key];if(i<keys.length-1)
	obj=obj[key]=current||{};else if($type(current)=='array')
	current.push(value);else
	obj[key]=$defined(current)?[current,value]:value;});});return res;},cleanQueryString:function(method){return this.split('&').filter(function(val){var index=val.indexOf('='),key=index<0?'':val.substr(0,index),value=val.substr(index+1);return method?method.run([key,value]):$chk(value);}).join('&');}});Element.implement({measure:function(fn){var vis=function(el){return!!(!el||el.offsetHeight||el.offsetWidth);};if(vis(this))return fn.apply(this);var parent=this.getParent(),restorers=[],toMeasure=[];while(!vis(parent)&&parent!=document.body){toMeasure.push(parent.expose());parent=parent.getParent();}
	var restore=this.expose();var result=fn.apply(this);restore();toMeasure.each(function(restore){restore();});return result;},expose:function(){if(this.getStyle('display')!='none')return $empty;var before=this.style.cssText;this.setStyles({display:'block',position:'absolute',visibility:'hidden'});return function(){this.style.cssText=before;}.bind(this);},getDimensions:function(options){options=$merge({computeSize:false},options);var dim={};var getSize=function(el,options){return(options.computeSize)?el.getComputedSize(options):el.getSize();};var parent=this.getParent('body');if(parent&&this.getStyle('display')=='none'){dim=this.measure(function(){return getSize(this,options);});}else if(parent){try{dim=getSize(this,options);}catch(e){}}else{dim={x:0,y:0};}
	return $chk(dim.x)?$extend(dim,{width:dim.x,height:dim.y}):$extend(dim,{x:dim.width,y:dim.height});},getComputedSize:function(options){options=$merge({styles:['padding','border'],plains:{height:['top','bottom'],width:['left','right']},mode:'both'},options);var size={width:0,height:0};switch(options.mode){case'vertical':delete size.width;delete options.plains.width;break;case'horizontal':delete size.height;delete options.plains.height;break;}
	var getStyles=[];$each(options.plains,function(plain,key){plain.each(function(edge){options.styles.each(function(style){getStyles.push((style=='border')?style+'-'+edge+'-'+'width':style+'-'+edge);});});});var styles={};getStyles.each(function(style){styles[style]=this.getComputedStyle(style);},this);var subtracted=[];$each(options.plains,function(plain,key){var capitalized=key.capitalize();size['total'+capitalized]=size['computed'+capitalized]=0;plain.each(function(edge){size['computed'+edge.capitalize()]=0;getStyles.each(function(style,i){if(style.test(edge)){styles[style]=styles[style].toInt()||0;size['total'+capitalized]=size['total'+capitalized]+styles[style];size['computed'+edge.capitalize()]=size['computed'+edge.capitalize()]+styles[style];}
	if(style.test(edge)&&key!=style&&(style.test('border')||style.test('padding'))&&!subtracted.contains(style)){subtracted.push(style);size['computed'+capitalized]=size['computed'+capitalized]-styles[style];}});});});['Width','Height'].each(function(value){var lower=value.toLowerCase();if(!$chk(size[lower]))return;size[lower]=size[lower]+this['offset'+value]+size['computed'+value];size['total'+value]=size[lower]+size['total'+value];delete size['computed'+value];},this);return $extend(styles,size);}});(function(){var original=Element.prototype.position;Element.implement({position:function(options){if(options&&($defined(options.x)||$defined(options.y)))return original?original.apply(this,arguments):this;$each(options||{},function(v,k){if(!$defined(v))delete options[k];});options=$merge({relativeTo:document.body,position:{x:'center',y:'center'},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false,ignoreScroll:false,allowNegative:false},options);var parentOffset={x:0,y:0},parentPositioned=false;var offsetParent=this.measure(function(){return document.id(this.getOffsetParent());});if(offsetParent&&offsetParent!=this.getDocument().body){parentOffset=offsetParent.measure(function(){return this.getPosition();});parentPositioned=offsetParent!=document.id(options.relativeTo);options.offset.x=options.offset.x-parentOffset.x;options.offset.y=options.offset.y-parentOffset.y;}
	var fixValue=function(option){if($type(option)!='string')return option;option=option.toLowerCase();var val={};if(option.test('left'))val.x='left';else if(option.test('right'))val.x='right';else val.x='center';if(option.test('upper')||option.test('top'))val.y='top';else if(option.test('bottom'))val.y='bottom';else val.y='center';return val;};options.edge=fixValue(options.edge);options.position=fixValue(options.position);if(!options.edge){if(options.position.x=='center'&&options.position.y=='center')options.edge={x:'center',y:'center'};else options.edge={x:'left',y:'top'};}
	this.setStyle('position','absolute');var rel=document.id(options.relativeTo)||document.body,calc=rel==document.body?window.getScroll():rel.getPosition(),top=calc.y,left=calc.x;var dim=this.getDimensions({computeSize:true,styles:['padding','border','margin']});var pos={},prefY=options.offset.y,prefX=options.offset.x,winSize=window.getSize();switch(options.position.x){case'left':pos.x=left+prefX;break;case'right':pos.x=left+prefX+rel.offsetWidth;break;default:pos.x=left+((rel==document.body?winSize.x:rel.offsetWidth)/2)+prefX;break;}
	switch(options.position.y){case'top':pos.y=top+prefY;break;case'bottom':pos.y=top+prefY+rel.offsetHeight;break;default:pos.y=top+((rel==document.body?winSize.y:rel.offsetHeight)/2)+prefY;break;}
	if(options.edge){var edgeOffset={};switch(options.edge.x){case'left':edgeOffset.x=0;break;case'right':edgeOffset.x=-dim.x-dim.computedRight-dim.computedLeft;break;default:edgeOffset.x=-(dim.totalWidth/2);break;}
	switch(options.edge.y){case'top':edgeOffset.y=0;break;case'bottom':edgeOffset.y=-dim.y-dim.computedTop-dim.computedBottom;break;default:edgeOffset.y=-(dim.totalHeight/2);break;}
	pos.x+=edgeOffset.x;pos.y+=edgeOffset.y;}
	pos={left:((pos.x>=0||parentPositioned||options.allowNegative)?pos.x:0).toInt(),top:((pos.y>=0||parentPositioned||options.allowNegative)?pos.y:0).toInt()};var xy={left:'x',top:'y'};['minimum','maximum'].each(function(minmax){['left','top'].each(function(lr){var val=options[minmax]?options[minmax][xy[lr]]:null;if(val!=null&&pos[lr]<val)pos[lr]=val;});});if(rel.getStyle('position')=='fixed'||options.relFixedPosition){var winScroll=window.getScroll();pos.top+=winScroll.y;pos.left+=winScroll.x;}
	if(options.ignoreScroll){var relScroll=rel.getScroll();pos.top-=relScroll.y;pos.left-=relScroll.x;}
	if(options.ignoreMargins){pos.left+=(options.edge.x=='right'?dim['margin-right']:options.edge.x=='center'?-dim['margin-left']+((dim['margin-right']+dim['margin-left'])/2):-dim['margin-left']);pos.top+=(options.edge.y=='bottom'?dim['margin-bottom']:options.edge.y=='center'?-dim['margin-top']+((dim['margin-bottom']+dim['margin-top'])/2):-dim['margin-top']);}
	pos.left=Math.ceil(pos.left);pos.top=Math.ceil(pos.top);if(options.returnPos)return pos;else this.setStyles(pos);return this;}});})();if(!window.Form)window.Form={};(function(){Form.Request=new Class({Binds:['onSubmit','onFormValidate'],Implements:[Options,Events,Class.Occlude],options:{requestOptions:{evalScripts:true,useSpinner:true,emulation:false,link:'ignore'},extraData:{},resetForm:true},property:'form.request',initialize:function(form,update,options){this.element=document.id(form);if(this.occlude())return this.occluded;this.update=document.id(update);this.setOptions(options);this.makeRequest();if(this.options.resetForm){this.request.addEvent('success',function(){$try(function(){this.element.reset();}.bind(this));if(window.OverText)OverText.update();}.bind(this));}
	this.attach();},toElement:function(){return this.element;},makeRequest:function(){this.request=new Request.HTML($merge({update:this.update,emulation:false,spinnerTarget:this.element,method:this.element.get('method')||'post'},this.options.requestOptions)).addEvents({success:function(text,xml){['complete','success'].each(function(evt){this.fireEvent(evt,[this.update,text,xml]);},this);}.bind(this),failure:function(xhr){this.fireEvent('complete').fireEvent('failure',xhr);}.bind(this),exception:function(){this.fireEvent('failure',xhr);}.bind(this)});},attach:function(attach){attach=$pick(attach,true);method=attach?'addEvent':'removeEvent';var fv=this.element.retrieve('validator');if(fv)fv[method]('onFormValidate',this.onFormValidate);if(!fv||!attach)this.element[method]('submit',this.onSubmit);},detach:function(){this.attach(false);},enable:function(){this.attach();},disable:function(){this.detach();},onFormValidate:function(valid,form,e){var fv=this.element.retrieve('validator');if(valid||(fv&&!fv.options.stopOnFailure)){if(e&&e.stop)e.stop();this.send();}},onSubmit:function(e){if(this.element.retrieve('validator')){this.detach();return;}
	e.stop();this.send();},send:function(){var str=this.element.toQueryString().trim();var data=$H(this.options.extraData).toQueryString();if(str)str+="&"+data;else str=data;this.fireEvent('send',[this.element,str.parseQueryString()]);this.request.send({data:str,url:this.element.get("action")});return this;}});Element.Properties.formRequest={set:function(){var opt=Array.link(arguments,{options:Object.type,update:Element.type,updateId:String.type});var update=opt.update||opt.updateId;var updater=this.retrieve('form.request');if(update){if(updater)updater.update=document.id(update);this.store('form.request:update',update);}
	if(opt.options){if(updater)updater.setOptions(opt.options);this.store('form.request:options',opt.options);}
	return this;},get:function(){var opt=Array.link(arguments,{options:Object.type,update:Element.type,updateId:String.type});var update=opt.update||opt.updateId;if(opt.options||update||!this.retrieve('form.request')){if(opt.options||!this.retrieve('form.request:options'))this.set('form.request',opt.options);if(update)this.set('form.request',update);this.store('form.request',new Form.Request(this,this.retrieve('form.request:update'),this.retrieve('form.request:options')));}
	return this.retrieve('form.request');}};Element.implement({formUpdate:function(update,options){this.get('form.request',update,options).send();return this;}});})();var IframeShim=new Class({Implements:[Options,Events,Class.Occlude],options:{className:'iframeShim',src:'javascript:false;document.write("");',display:false,zIndex:null,margin:0,offset:{x:0,y:0},browsers:(Browser.Engine.trident4||(Browser.Engine.gecko&&!Browser.Engine.gecko19&&Browser.Platform.mac))},property:'IframeShim',initialize:function(element,options){this.element=document.id(element);if(this.occlude())return this.occluded;this.setOptions(options);this.makeShim();return this;},makeShim:function(){if(this.options.browsers){var zIndex=this.element.getStyle('zIndex').toInt();if(!zIndex){zIndex=1;var pos=this.element.getStyle('position');if(pos=='static'||!pos)this.element.setStyle('position','relative');this.element.setStyle('zIndex',zIndex);}
	zIndex=($chk(this.options.zIndex)&&zIndex>this.options.zIndex)?this.options.zIndex:zIndex-1;if(zIndex<0)zIndex=1;this.shim=new Element('iframe',{src:this.options.src,scrolling:'no',frameborder:0,styles:{zIndex:zIndex,position:'absolute',border:'none',filter:'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'},'class':this.options.className}).store('IframeShim',this);var inject=(function(){this.shim.inject(this.element,'after');this[this.options.display?'show':'hide']();this.fireEvent('inject');}).bind(this);if(!IframeShim.ready)window.addEvent('load',inject);else inject();}else{this.position=this.hide=this.show=this.dispose=$lambda(this);}},position:function(){if(!IframeShim.ready||!this.shim)return this;var size=this.element.measure(function(){return this.getSize();});if(this.options.margin!=undefined){size.x=size.x-(this.options.margin*2);size.y=size.y-(this.options.margin*2);this.options.offset.x+=this.options.margin;this.options.offset.y+=this.options.margin;}
	this.shim.set({width:size.x,height:size.y}).position({relativeTo:this.element,offset:this.options.offset});return this;},hide:function(){if(this.shim)this.shim.setStyle('display','none');return this;},show:function(){if(this.shim)this.shim.setStyle('display','block');return this.position();},dispose:function(){if(this.shim)this.shim.dispose();return this;},destroy:function(){if(this.shim)this.shim.destroy();return this;}});window.addEvent('load',function(){IframeShim.ready=true;});var Mask=new Class({Implements:[Options,Events],Binds:['position'],options:{style:{},'class':'mask',maskMargins:false,useIframeShim:true,iframeShimOptions:{}},initialize:function(target,options){this.target=document.id(target)||document.id(document.body);this.target.store('Mask',this);this.setOptions(options);this.render();this.inject();},render:function(){this.element=new Element('div',{'class':this.options['class'],id:this.options.id||'mask-'+$time(),styles:$merge(this.options.style,{display:'none'}),events:{click:function(){this.fireEvent('click');if(this.options.hideOnClick)this.hide();}.bind(this)}});this.hidden=true;},toElement:function(){return this.element;},inject:function(target,where){where=where||this.options.inject?this.options.inject.where:''||this.target==document.body?'inside':'after';target=target||this.options.inject?this.options.inject.target:''||this.target;this.element.inject(target,where);if(this.options.useIframeShim){this.shim=new IframeShim(this.element,this.options.iframeShimOptions);this.addEvents({show:this.shim.show.bind(this.shim),hide:this.shim.hide.bind(this.shim),destroy:this.shim.destroy.bind(this.shim)});}},position:function(){this.resize(this.options.width,this.options.height);this.element.position({relativeTo:this.target,position:'topLeft',ignoreMargins:!this.options.maskMargins,ignoreScroll:this.target==document.body});return this;},resize:function(x,y){var opt={styles:['padding','border']};if(this.options.maskMargins)opt.styles.push('margin');var dim=this.target.getComputedSize(opt);if(this.target==document.body){var win=window.getSize();if(dim.totalHeight<win.y)dim.totalHeight=win.y;if(dim.totalWidth<win.x)dim.totalWidth=win.x;}
	this.element.setStyles({width:$pick(x,dim.totalWidth,dim.x),height:$pick(y,dim.totalHeight,dim.y)});return this;},show:function(){if(!this.hidden)return this;window.addEvent('resize',this.position);this.position();this.showMask.apply(this,arguments);return this;},showMask:function(){this.element.setStyle('display','block');this.hidden=false;this.fireEvent('show');},hide:function(){if(this.hidden)return this;window.removeEvent('resize',this.position);this.hideMask.apply(this,arguments);if(this.options.destroyOnHide)return this.destroy();return this;},hideMask:function(){this.element.setStyle('display','none');this.hidden=true;this.fireEvent('hide');},toggle:function(){this[this.hidden?'show':'hide']();},destroy:function(){this.hide();this.element.destroy();this.fireEvent('destroy');this.target.eliminate('mask');}});Element.Properties.mask={set:function(options){var mask=this.retrieve('mask');return this.eliminate('mask').store('mask:options',options);},get:function(options){if(options||!this.retrieve('mask')){if(this.retrieve('mask'))this.retrieve('mask').destroy();if(options||!this.retrieve('mask:options'))this.set('mask',options);this.store('mask',new Mask(this,this.retrieve('mask:options')));}
	return this.retrieve('mask');}};Element.implement({mask:function(options){this.get('mask',options).show();return this;},unmask:function(){this.get('mask').hide();return this;}});var Spinner=new Class({Extends:Mask,options:{'class':'spinner',containerPosition:{},content:{'class':'spinner-content'},messageContainer:{'class':'spinner-msg'},img:{'class':'spinner-img'},fxOptions:{link:'chain'}},initialize:function(){this.parent.apply(this,arguments);this.target.store('spinner',this);var deactivate=function(){this.active=false;}.bind(this);this.addEvents({hide:deactivate,show:deactivate});},render:function(){this.parent();this.element.set('id',this.options.id||'spinner-'+$time());this.content=document.id(this.options.content)||new Element('div',this.options.content);this.content.inject(this.element);if(this.options.message){this.msg=document.id(this.options.message)||new Element('p',this.options.messageContainer).appendText(this.options.message);this.msg.inject(this.content);}
	if(this.options.img){this.img=document.id(this.options.img)||new Element('div',this.options.img);this.img.inject(this.content);}
	this.element.set('tween',this.options.fxOptions);},show:function(noFx){if(this.active)return this.chain(this.show.bind(this));if(!this.hidden){this.callChain.delay(20,this);return this;}
	this.active=true;return this.parent(noFx);},showMask:function(noFx){var pos=function(){this.content.position($merge({relativeTo:this.element},this.options.containerPosition));}.bind(this);if(noFx){this.parent();pos();}else{this.element.setStyles({display:'block',opacity:0}).tween('opacity',this.options.style.opacity||0.9);pos();this.hidden=false;this.fireEvent('show');this.callChain();}},hide:function(noFx){if(this.active)return this.chain(this.hide.bind(this));if(this.hidden){this.callChain.delay(20,this);return this;}
	this.active=true;return this.parent(noFx);},hideMask:function(noFx){if(noFx)return this.parent();this.element.tween('opacity',0).get('tween').chain(function(){this.element.setStyle('display','none');this.hidden=true;this.fireEvent('hide');this.callChain();}.bind(this));},destroy:function(){this.content.destroy();this.parent();this.target.eliminate('spinner');}});Spinner.implement(new Chain);if(window.Request){Request=Class.refactor(Request,{options:{useSpinner:false,spinnerOptions:{},spinnerTarget:false},initialize:function(options){this._send=this.send;this.send=function(options){if(this.spinner)this.spinner.chain(this._send.bind(this,options)).show();else this._send(options);return this;};this.previous(options);var update=document.id(this.options.spinnerTarget)||document.id(this.options.update);if(this.options.useSpinner&&update){this.spinner=update.get('spinner',this.options.spinnerOptions);['onComplete','onException','onCancel'].each(function(event){this.addEvent(event,this.spinner.hide.bind(this.spinner));},this);}},getSpinner:function(){return this.spinner;}});}
	Element.Properties.spinner={set:function(options){var spinner=this.retrieve('spinner');return this.eliminate('spinner').store('spinner:options',options);},get:function(options){if(options||!this.retrieve('spinner')){if(this.retrieve('spinner'))this.retrieve('spinner').destroy();if(options||!this.retrieve('spinner:options'))this.set('spinner',options);new Spinner(this,this.retrieve('spinner:options'));}
	return this.retrieve('spinner');}};Element.implement({spin:function(options){this.get('spinner',options).show();return this;},unspin:function(){var opt=Array.link(arguments,{options:Object.type,callback:Function.type});this.get('spinner',opt.options).hide(opt.callback);return this;}});
function utf8(wide) {
	var c, s;
	var enc = "";
	var i = 0;
	while(i<wide.length) {
		c= wide.charCodeAt(i++);
		// handle UTF-16 surrogates
		if (c>=0xDC00 && c<0xE000) continue;
		if (c>=0xD800 && c<0xDC00) {
			if (i>=wide.length) continue;
			s= wide.charCodeAt(i++);
			if (s<0xDC00 || c>=0xDE00) continue;
			c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
		}
		// output value
		if (c<0x80) enc += String.fromCharCode(c);
		else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
		else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
		else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F));
	}
	return enc;
}

var hexchars = "0123456789ABCDEF";

function toHex(n) { return hexchars.charAt(n>>4)+hexchars.charAt(n & 0xF); }

var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.";

function nextagEncodeURI(s) {
	s = utf8(s);
	var c;
	var enc = "";
	if (typeof encodeURIComponent == "function") {
		// Use JavaScript built-in function IE 5.5+ and Netscape 6+ and Mozilla
		// Replace all %26amp%3B in s and after encoding
		return (encodeURIComponent(s.replace(/\%26amp\%3B/g, '%26')).replace(/\%26amp\%3B/g, '%26'));
	} 
	// Need to mimic the JavaScript version Netscape 4 and IE 4 and IE 5.0
	for (var i= 0; i<s.length; i++) {
		if (okURIchars.indexOf(s.charAt(i))==-1)
			enc += "%"+toHex(s.charCodeAt(i));
		else
			enc += s.charAt(i);
	}
	return enc.replace(/\%26amp\%3B/g, '%26');
}

function NextagBrowser(){
	var d = document;
	var nav=navigator;
	this.agt=nav.userAgent.toLowerCase();
	this.major = parseInt(nav.appVersion);
	this.ns=(d.layers);
	this.dom=(d.getElementById)?1:0;
	this.ns4up=(this.ns && this.major >=4);
	this.ns6=(this.agt.indexOf("Netscape6")!=-1);
	this.op=(window.opera? 1:0);
	this.ie=(d.all);
	this.ie5=(d.all&&this.dom);
	this.fb=(this.agt.indexOf("firebird")!=-1);
	this.sf=(this.agt.indexOf("safari")!=-1);
	this.win=((this.agt.indexOf("win")!=-1) || (this.agt.indexOf("16bit")!=-1));
	this.mac=(this.agt.indexOf("mac")!=-1);
};
/* These java functions are shared across NexTag's site */
/* From the header */
window.onerror=handleError;
function handleError(msg, url, line) {
  return (msg == "Not implemented" || msg.indexOf("Access is denied") != -1);
}


String.prototype.trim=function() {
    return this.replace(/^\s+|\s+$/g,'');
}

/*  convert search term into static link on header and footer search form submission */
function submitStaticSearchLink(sid,nid,url){
	if (url.indexOf("OutPDir.jsp") != -1)
		return true;

	var nodeDropdown = document.getElementById(nid);
	if(nodeDropdown && nodeDropdown[nodeDropdown.selectedIndex].value != '0') return true;
	if(document.getElementById(sid) != null){
		var sKeyword = document.getElementById(sid).value;
		if (/[^\u00C0-\uFFFF\w\-\s,]/.test(sKeyword) || sKeyword.search(/\S/)==-1 || !url) return true;
                sKeyword = sKeyword.trim();
		sKeyword = sKeyword.replace(/-/g, '_-_');
		sKeyword = sKeyword.replace(/\s+/g, ' ');
		sKeyword = sKeyword.replace(/\s/g, '-');
		var func = typeof(encodeURIComponent) != "undefined" ? encodeURIComponent : escape;
		url = url.replace(/KEYWORD/g, func(sKeyword));
		location.href = url;
		return false;
	}
	return true;
}

/*  convert search term into static link on header and footer search form submission */
function submitStaticSearchLinkNew(sid,nid,url,pageCodes,pages){
	if (url.indexOf("OutPDir.jsp") != -1)
		return true;

	var nodeDropdown = document.getElementById(nid);
	if(nodeDropdown && nodeDropdown[nodeDropdown.selectedIndex].value != '0') return true;
	if (document.getElementById(sid) != null){
		var sKeyword = document.getElementById(sid).value;
		if (/[^\u00C0-\uFFFF\w\-\s,]/.test(sKeyword) || sKeyword.search(/\S/)==-1 || !url) return true;
			sKeyword = sKeyword.trim();

		var key = Math.abs(hashCode(sKeyword) % 10000);
		var searchExtension = getSearchExtension(key, pageCodes,pages);
		var isKeywordFormat = isKeywordExtension(key, pageCodes['kLow'],pageCodes['kHigh']);

		sKeyword = sKeyword.replace(/-/g, '_-_');
		sKeyword = sKeyword.replace(/\s+/g, ' ');
		sKeyword = sKeyword.replace(/\s/g, '-');
		var func = typeof(encodeURIComponent) != "undefined" ? encodeURIComponent : escape;

		if(isKeywordFormat){
			url = url.replace(url, "/" + func(sKeyword));
		}else{
			url = url.replace(/KEYWORD/g, func(sKeyword));
			url = url.replace(pages['search'], searchExtension);
		}
		location.href = url;
		return false;
	}
	return true;
}

/* see if the given search keyword is keyword format. */
function isKeywordExtension(key, klow, khigh) {
	return (key >= klow && key <= khigh);
}

/* get the page extension for given search keyword */
function getSearchExtension(key, pageCodes,pages) {

	if (key >= pageCodes['kLow'] && key <= pageCodes['kHigh'])
		return pages['keyword'];
	
	if (key >= pageCodes['pLow'] && key <= pageCodes['pHigh'])
		return pages['products'];
	
	if (key >= pageCodes['sLow'] && key <= pageCodes['sHigh'])
		return pages['shop'];
	
	if (key >= pageCodes['cLow'] && key <= pageCodes['cHigh'])
		return pages['compare'];
	
	if (key >= pageCodes['stLow'] && key <= pageCodes['stHigh'])
		return pages['stores'];

	return pages['search'];
}

/* hash code for given keyword */
function hashCode(keyword) {
	var h = 0;
	var len = keyword.length;
	for (var i = 0; i < len; i++) {
		h = 31*h + keyword.charCodeAt(i);

		//var should be convert as Java int(4 byte).
		if(h>2147483647) 
			h = h << 32;
		if(h<-2147483648)
			h = h >> 32;
	}
	return h;
}

/* Opens merchant link in a new window */
function openMerchantLink(linkUrl) {
    window.open(linkUrl,'','');
    return false;
}

function openWin(url){
	var wind = window.open(url,'','');
	event.returnValue = !wind;
	return !wind;
}

function showAlert(timeout, src){
	var e = document.getElementById('priceAlertPopup_0');
	if (e) setTimeout(function() {
		e.style.visibility='visible';
		if (0 < timeout) {
			vshow('idleTitle');
			vhide('priceAlertTitle');
		}
	}, timeout);
	var s = document.getElementById('src');
	if (s) {
	s.value = src;
	}
	return false;
}
function hideAlert(){
	var e = document.getElementById('priceAlertPopup_0');
	if (e) e.style.visibility = 'hidden';
	vhide('idleTitle');
	vshow('priceAlertTitle');
	var s = document.getElementById('src');
	s.value = 'lform';
	return false;
}

function toggleLHS(refine, hide){
	var vert = document.getElementById('search-vertical-container');
	var content = document.getElementById('main-outer-container');
	var toggle = document.getElementById('lhsToggle');
	if (vert.style.display == 'none'){
		vert.style.display = '';
		content.style.marginLeft = (vert.offsetWidth + 8) + 'px';
		toggle.innerHTML = hide;
		document.cookie = "lhson=true; path=/";
	} else {
		vert.style.display = 'none';
		content.style.marginLeft = '0px';
		toggle.innerHTML = refine;
		document.cookie = "lhson=false; path=/";
	}
}

function toggleTableSubRows(element,vertElt,displayMessage, hideMessage){
    var vert = document.getElementById(vertElt);
    var expand = displayMessage.replace(/</,"&lt;"); 
    expand = expand.replace(/>/,"&gt;");
    if (vert.style.display == 'none'){
            vert.style.display = '';
            element.innerHTML = '<image src="/images/minusBox.gif" align="left"/> <a><b>' + hideMessage + '</b></a>';
    } else {
            vert.style.display = 'none';
            element.innerHTML='<image src="/images/plusBox.gif" align="left"/> <a><b>' + expand + '</b></a>';
    }
}



function vshow(id) { document.getElementById(id).style.display=''; }
function vhide(id) { document.getElementById(id).style.display='none'; }

function showHideSQBox(element,divId,iFrameId,url, displayMessage, hideMessage){
	var expand = displayMessage.replace(/</,"&lt;");
	expand = expand.replace(/>/,"&gt;");
	if (document.getElementById(divId).style.display == 'none'){
		document.getElementById(divId).style.display = '';
		document.getElementById(iFrameId).src=url;
		element.innerHTML = '<image src="/images/minusBox.gif"/> <font color="blue"><b>' + hideMessage + '</b></font>';
	} else {
		document.getElementById(divId).style.display = 'none';
		element.innerHTML='<image src="/images/plusBox.gif"/> <font color="blue"><b>' + expand + '</b></font>';
	}
}

function showLikeThisButton(row){
	var btn = document.getElementById("vsBtn_"+row);
	btn.style.display = '';
}

function hideLikeThisButton(row){
	var btn = document.getElementById("vsBtn_"+row);
	btn.style.display = 'none';
}

function showZip(){
	document.getElementById("zip-entry-form").style.display = '';
	document.getElementById("zipTxt").style.display = 'none';
}

function shareFb(link) {
	var share = {
		method: 'stream.share',
		u: link
	};

	FB.ui(share);
}



function ajaxRegisterFB(cbObj) {
	FB.api('/me?fields=email,id,first_name,last_name,location,gender,friends,interests,birthday,activities,likes', function(response) {
		var params = "cmd=FACEBOOKLOGIN";
		var email = response.email;
		params += '&email=' + email;
		if(response.id) {
			params += '&facebookUserId=' + response.id;
		}
		if(response.first_name) {
			params += '&firstName=' + response.first_name;
		}
		if(response.last_name) {
			params += '&lastName=' + response.last_name;
		}
		if(response.location) {
			params += '&location=' + JSON.stringify(response.location);
		}
		if(response.gender) {
			params += '&gend=' + response.gender;
		}
		if(response.birthday) {
			params += '&birthday=' + response.birthday;
		}
		params += '&avatar=' + "http://graph.facebook.com/"+response.id+"/picture";
		if(response.friends) {
			params += '&friends=' + JSON.stringify(response.friends.data);
		}
		var interests = [];
		if(response.likes) {
			interests.push(response.likes.data);
		} else if(response.interests) {
			interests.push(response.interests.data);
		}
		
		if(response.activities) {
			interests.push(response.activities.data);
		}
		if(interests.length > 0) {
			params += '&interests=' + JSON.stringify(interests);
		}
		var loginReq = new Request({
			url: '/accounts/login',
			method: 'post',
			data: params,
			onComplete: function() {
				cbObj.loginSuccess(email);
			}
		});
		loginReq.send();
	});
	
}

function fbLogin(errorMsg) {
    if(!window.isFacebookReady) {
        if (!errorMsg) { errorMsg = "Please try again in a few seconds."; }
        alert(errorMsg);
        return;
    }
	FB.login(function(response) {
		if (response.authResponse) {
			//alert("login");
			if(response.status == "connected") {
				registerFB();
			} else {
				//alert("email not provided: " + response.scope);
			}
		} else {
			//alert("not logged in");
		}
	}, {scope:'email,user_interests,user_likes'});
	return false;
}


function submitSurvey(form_, target){
	var form = document.getElementById(form_); 
	var formElements = form.elements;
	var i=0;
	var postString = "";
	for(i = 0; i < formElements.length; i++){
		if(formElements[i].type == 'radio' || formElements[i].type == 'checkbox'){
			if(formElements[i].checked){
				postString += formElements[i].name + "=" + formElements[i].value;
				if(i != formElements.length - 1){
					postString += "&";
				}
			}
		}
		else{
			postString += formElements[i].name + "=" + formElements[i].value;
			if(i != formElements.length - 1){
				postString += "&";
			}
		}
	}
	http = new NxtgHttpReq(target, {'contentType':'application/x-www-form-urlencoded'});
	http.setPost();
	http.setAsynchronous(true);
	http.send(postString);
}



function suppressLb() {
	var d = new Date();
	// set expiry to 10 years
	d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
	setCookie("nextag.suppressLightbox", "true", d, "/");
	hideLb();
}

function setSessionImpressionCount() {
	var currentCount = getCookie("lbics");
	if(currentCount == null || currentCount == 'NaN') {
		currentCount = 1;
	} else {
		currentCount = parseInt(currentCount);
		currentCount++;
	}
	setCookie("lbics", currentCount, false, "/");
}

function setGlobalImpressionCount() {
	var currentCount = getCookie("lbicg");
	if(currentCount == null || currentCount == 'NaN') {
		currentCount = 1;
	} else {
		currentCount = parseInt(currentCount);
		currentCount++;
	}
	var d = new Date();
	// set expiry to 30 days
	d.setTime( d.getTime() + 30 * 24 * 60 * 60 * 1000 );
	setCookie("lbicg", currentCount, d, "/");
}

function useLongTimeout(maxSessionImps, maxGlobalImps, loggedIn) {
	var sessionCount = getCookie("lbics");
	if(sessionCount == null || sessionCount == 'NaN') {
		sessionCount = 0;
	} else {
		sessionCount = parseInt(sessionCount);
	}
	
	var globalCount = getCookie("lbicg");
	if(globalCount == null || globalCount == 'NaN') {
		globalCount = 0;
	} else {
		globalCount = parseInt(globalCount);
	}
	
	var hasRadar = getCookie("hasRadar");
	
	var returnvalue = sessionCount > maxSessionImps || globalCount > maxGlobalImps || loggedIn || hasRadar == 'true';

	if(sessionCount > maxSessionImps || globalCount > maxGlobalImps || loggedIn || hasRadar == 'true') {
		return true;
	} else {
		return false;
	}
}

/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
	var prefix = name + "=" 
	var start = document.cookie.indexOf(prefix) 

	if (start==-1) {
		return null;
	}
	
	var end = document.cookie.indexOf(";", start+prefix.length) 
	if (end==-1) {
		end=document.cookie.length;
	}

	var value=document.cookie.substring(start+prefix.length, end) 
	return unescape(value);
}

var allProductReviewSummaryPopups = new Array();
function addToProductReviewSummaryPopups(id) {
	if (allProductReviewSummaryPopups != null)
		allProductReviewSummaryPopups.push(id);
}

function onMouseOutWizerankBadge(pid) {
	for ( var i = 0; i < allProductReviewSummaryPopups.length; i++) {
		id = allProductReviewSummaryPopups[i];
		hideElement("product-reviews-summary-id-" + id);
		hideElement("product-reviews-summary-id-container-" + id);
	}
}

function onMouseOverWizerankBadge(pid) {
	for ( var i = 0; i < allProductReviewSummaryPopups.length; i++) {
		id = allProductReviewSummaryPopups[i];
		if (id != pid) {
			hideElement("product-reviews-summary-id-" + id);
			hideElement("product-reviews-summary-id-container-" + id);
		}
	}

	showElement("product-reviews-summary-id-" + pid);
	showElement("product-reviews-summary-id-container-" + pid);
	hideElement("wizerank-id-" + pid, false);

	var e = document.getElementById("wizerank-id-" + pid);
	var e1 = document.getElementById("product-reviews-summary-id-container-"
			+ pid);
	if ((e1 != null) && (e != null)) {
		e1.style.left = e.offsetLeft + "px";
		e1.style.top = e.offsetTop + "px";
	}
}

function onMouseOverProductReviewSummaryPopup(pid) {
	onMouseOverWizerankBadge(pid);
}

function onMouseOutProductReviewSummaryPopup(pid) {
	onMouseOutWizerankBadge(pid);
	onMouseOverProductLine(pid);
}

function onMouseOutProductLine(pid) {
	hideElement("wizerank-id-" + pid, false);
}

function onMouseOverProductLine(pid) {
	showElement("wizerank-id-" + pid, false);
}

function onMouseOverProductLineWithCapsule(pid) {
	showElement("product-reviews-summary-id-container-" + pid);
	showElement("product-reviews-summary-id-" + pid);
}

function onMouseOverWizerankBadgeLarge(pid) {
	showElement("product-reviews-summary-id-container-" + pid);
	showElement("product-reviews-summary-id-" + pid);
}

function onMouseOutWizerankBadgeLarge(pid) {
}

function findCurrentSnippet(prefix, max) {
	// find index of the currently selected snippet
	var selectedSnippetIndex = -1;
	for ( var i = 1; i <= max; i++) {
		var e = document.getElementById(prefix + "_" + i);
		if (e && (e != null)) {
			if (e.style.display != 'none') {
				selectedSnippetIndex = i
				break;
			}
		}
	}
	return selectedSnippetIndex;
}

function onPreviousSnippetClicked(prefix, max, imageroot) {
	var selectedSnippetIndex = findCurrentSnippet(prefix, max);

	if (selectedSnippetIndex > 0) {
		if (selectedSnippetIndex > 1)
			onDotSnippetClicked(prefix, selectedSnippetIndex - 1, max,
					imageroot);
		else
			onDotSnippetClicked(prefix, max, max, imageroot);
	}
}

function onNextSnippetClicked(prefix, max, imageroot) {
	var selectedSnippetIndex = findCurrentSnippet(prefix, max);

	if (selectedSnippetIndex > 0) {
		if (selectedSnippetIndex < max)
			onDotSnippetClicked(prefix, selectedSnippetIndex + 1, max,
					imageroot);
		else
			onDotSnippetClicked(prefix, 1, max, imageroot);
	}
}

function onDotSnippetClicked(prefix, id, max, imageroot) {
	for ( var i = 1; i <= max; i++) {
		hideElement(prefix + "_" + i);
		var dotimgId = prefix + "_DOTIMG_" + i;
		var e = document.getElementById(dotimgId);
		if (e && (e != null)) {
			e.className = "prs-dot";
		}
	}

	showElement(prefix + "_" + id);
	var e1 = document.getElementById(prefix + "_" + id);
    if (e1) e1.style.position = "";

	var dotimgId = prefix + "_DOTIMG_" + id;
	var e = document.getElementById(dotimgId);
	if (e && (e != null)) {
		e.className = "prs-dot-selected";
	}
}

function onHighlightProductRow(row) {
	var BGCOLOR = '#F0F2F2';
	var e = document.getElementById("op-product-details-id-" + row);
	if (e) {
		e.style.backgroundColor = BGCOLOR;
	}
	var e = document.getElementById("op-product-prices-id-" + row);
	if (e) {
		e.style.backgroundColor = BGCOLOR;
	}
	var e = document.getElementById("op-product-sellerinfo-id-" + row);
	if (e) {
		e.style.backgroundColor = BGCOLOR;
	}
}

function onUnHighlightProductRow(row) {
	var e = document.getElementById("op-product-details-id-" + row);
	if (e) {
		e.style.backgroundColor = '';
	}
	e = document.getElementById("op-product-prices-id-" + row);
	if (e) {
		e.style.backgroundColor = '';
	}
	e = document.getElementById("op-product-sellerinfo-id-" + row);
	if (e) {
		e.style.backgroundColor = '';
	}
}

function onProductReviewRatingClick(event, rowid) {
	var posx = -1;
	var posy = -1;
	if (!event)
		var event = window.event;
	if (event.pageX || event.pageY) {
		posx = event.pageX;
		posy = event.pageY;
	} else if (event.clientX || event.clientY) {
		posx = event.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
		posy = event.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
	}

	for ( var i = 0; i < allProductReviewSummaryPopups.length; i++) {
		id = allProductReviewSummaryPopups[i];
		if (id != rowid) {
			hideElement("product-reviews-summary-id-" + id);
			hideElement("product-reviews-summary-id-container-" + id);
		}
	}

	showElement("product-reviews-summary-id-" + rowid);
	showElement("product-reviews-summary-id-container-" + rowid);

	var e1 = document.getElementById("product-reviews-summary-id-container-"
			+ rowid);
	if ((e1 != null) && (posx >= 0) && (posy >= 0)) {
		e1.style.left = posx + "px";
		e1.style.top = posy + "px";
	}
}

function closeProductReviewsSummaryPopup(rowid) {
	var reviewElem = document.getElementById("product-reviews-"+rowid);
	if (reviewElem != null) {
			document.getElementById("product-details-"+rowid).style.display = "none";
			document.getElementById("product-reviews-"+rowid).style.display = "block";
			document.getElementById("product-mlt-"+rowid).style.display = "none";
	}
	hideElement("product-reviews-summary-id-container-"+rowid);
	hideElement("product-reviews-summary-id-"+rowid);
}

function showElement(id, doDisplay) {
	var e = document.getElementById(id);
	if (doDisplay == undefined)
		doDisplay = true;
	if (e != null) {
		if (doDisplay)
			e.style.display = "block";
		e.style.visibility = "visible";
	}
}

function hideElement(id, doDisplay) {
	var e = document.getElementById(id);
	if (doDisplay == undefined)
		doDisplay = true;
	if (e != null) {
		if (doDisplay)
			e.style.display = "none";
		e.style.visibility = "hidden";
	}
}

function isHiden(id) {
	var e = document.getElementById(id);
    return (!e || (e==null) || e.style.visibility=="hidden" || e.style.display=="none");
}



function onShowToolbarOnHover(rowId){
	showElement("tool-line-ghost-"+rowId, false);
}

function onHideToolbarOnHover(rowId){
	hideElement("tool-line-ghost-"+rowId, false);
}

function getStringFromHTML(id) {
    var e = document.getElementById(id);
    var ret = '';
    if (e) {
        v = e.innerHTML;
        if (!isEmpty(v)) return ret = v;
    }
    return ret;
}

function getNumberFromHTML(id) {
	var ret = getStringFromHTML(id);
	if (isEmpty(ret)) return 0;
	else return ret; 
}

function setInnerHTMLForElement(id, value) {
    var e = document.getElementById(id);
    if (e) {
        e.innerHTML = value;
    }
}

function isEmpty(someString) {
    if (someString==null) return true;
    else if ( (typeof someString)=='undefined' ) return true;
    else if ( someString.trim().length<=0 ) return true;
    return false;
}

function PRSSnippet() {
	this.snippetSrc = '';
	this.snippetAuthor = '';
	this.snippetDate = '';
	this.snippetTitle = '';
	this.snippetReview = '';
}

function ProductReviewsSummary() {
	this.wizerank = 0;
    this.revCount = 0;
    this.countRev5 = 0;
    this.countRev4 = 0;
    this.countRev3 = 0;
    this.countRev2 = 0;
    this.countRev1 = 0;
    this.recommendations = '';
    this.bottomline = '';
    this.snippets = new Array();
}



function populatePRSView(prs, rowid) {
	prs.revCount  =  getStringFromHTML('prs-model-rev-count-'+rowid);
    prs.recommendations = getStringFromHTML('prs-model-recommendations-'+rowid);
    prs.releaseDate = getStringFromHTML('prs-model-rel-date-'+rowid);
    prs.bottomline =  getStringFromHTML('prs-model-bl-'+rowid);
    
    prs.snippets = new Array();
    if (isEmpty(prs.bottomline)) {
        for(var i=0; i<3; i++) {
            var suffix = 'snippet_id_'+rowid+'_'+i;
            if (document.getElementById('prs-model-snippet-rev-'+suffix)) {
            	prs.snippets[i] = new PRSSnippet();
                prs.snippets[i].snippetSrc    = getStringFromHTML('prs-model-snippet-src-'+suffix);
                prs.snippets[i].snippetAuthor = getStringFromHTML('prs-model-snippet-aut-'+suffix);
                prs.snippets[i].snippetDate   = getStringFromHTML('prs-model-snippet-dat-'+suffix);
                prs.snippets[i].snippetTitle  = getStringFromHTML('prs-model-snippet-tit-'+suffix);
                prs.snippets[i].snippetReview = getStringFromHTML('prs-model-snippet-rev-'+suffix);
            } else {
            	break;
            }
        }
    }
	
    setInnerHTMLForElement('prs-view-rev-count-rel-date-recom', prs.revCount+prs.recommendations+prs.releaseDate);
    var e = document.getElementById('prs-view-rev-count-rel-date-recom');
    if (e) e.className = 'prs-popup-capsule-summary';

    // bottomline
    s="";
    if (!isEmpty(prs.bottomline)) {
        s+='<div class="img-bottom-line"></div>';
        s+='<span class="product-review-bottomline-quote">&ldquo;</span>'; 
        s+=prs.bottomline;
        s+='<span class="product-review-bottomline-quote">&rdquo;</span>';
    }
    setInnerHTMLForElement('prs-view-bl', s);
    var e = document.getElementById('prs-view-bl');
    if (e) {
        e.className = 'product-review-popup-container';
        e.style.cssFloat = 'left';
        e.style.marginTop = '10px';
        e.style.textAlign = 'left';
        e.style.marginLeft = '9px';
    }

    // capsule
    setInnerHTMLForElement('prs-view-capsule-wizerank', prs.wizerank);
    var e = document.getElementById('prs-view-capsule-wizerank');
    if (e) {
        e.style.paddingTop = "1px";
        e.style.cssFloat = "left";
    }

    var r = (prs.wizerank*65)/100;
    var e = document.getElementById('prs-view-capsule-stars');
    if (e) e.style.width = r+'px';

    // rating chart
    var counts = new Array();
    counts[0] = prs.countRev1*1;
    counts[1] = prs.countRev2*1;
    counts[2] = prs.countRev3*1;
    counts[3] = prs.countRev4*1;
    counts[4] = prs.countRev5*1;
    var reviewCount = counts[0]+counts[1]+counts[2]+counts[3]+counts[4];
    var ratios = new Array();
    for(var i=0; i<5; i++) ratios[i]=0;
    if (reviewCount>0) {
        for(var i=0; i<5; i++) {
            ratios[i]=100*(counts[i]/reviewCount);
        }
    }
    s='';
    s+='<table class="product-review-popup-container" border="0">';
    for(var i=4; i>=0; i--) {
        s+='<tr>';
        s+='<td style="white-space: nowrap; background: none">';
        s+='<span class="product-review-popup-container">'+(i+1)+' Stars</span>';
        s+='</td>';
        s+='<td style="background: none" class="product-review-popup-container">';
        s+='<div style="margin-left: 6px" class="product-review-rating-chart">';
        s+='<div class="product-review-rating-chart-selected" style="width:'+ratios[i]+'%"></div>';
        s+='</div>';
        s+='</td>';
        s+='<td style="background: none"><span class="product-review-popup-container" style="display: inline-block; margin-left: 2px">('+counts[i]+')</span></td>';
        s+='</tr>';
    }
    s+='</table>';
    setInnerHTMLForElement('prs-view-rev-chart', s);

    // snippets
    if (isEmpty(prs.bottomline)) {
        s='';
        var snippets = prs.snippets;
        if (snippets && (snippets.length>1)) {
            s+='<a href="javascript: onPreviousSnippetClicked(\'SNIPPET_ID_'+rowid+'\', '+snippets.length+')"><div class="prs-arrow-left" style="float:left"></div></a>';
        }
       	for(var i=1; (snippets) && snippets!=null && (snippets.length>1) && (i<=snippets.length); i++) {
       		s+='<a href="javascript: onDotSnippetClicked(\'SNIPPET_ID_'+rowid+'\', '+i+', '+snippets.length+')">';
       		if (i==1)
       		    s+='<div id="SNIPPET_ID_'+rowid+'_DOTIMG_'+i+'" class="prs-dot-selected" style="margin-left:3px; float:left"></div>';
       		else
       			s+='<div id="SNIPPET_ID_'+rowid+'_DOTIMG_'+i+'" class="prs-dot" style="margin-left:3px; float:left"></div>';
       		s+='</a>';
        }
        if (snippets && (snippets.length>1)) {
            s+='<a href="javascript: onNextSnippetClicked(\'SNIPPET_ID_'+rowid+'\', '+snippets.length+')"><div class="prs-arrow-right" style="float:left; margin-left:3px"></div></a>';
        }
        for(var i=1; (snippets) && (i<=snippets.length); i++) {
            if (snippets[i-1]==null) break;
            if (i==1)
                s+='<div id="SNIPPET_ID_'+rowid+'_'+i+'">';
            else
            	s+='<div id="SNIPPET_ID_'+rowid+'_'+i+'" style="visibility:hidden; position:absolute">';
            s+='<div name="spacer" style="height:3px ;width:100%; display:inline-block"></div>';
            if (!isEmpty(snippets[i-1].snippetSrc)) {
                s+='<span class="product-review-sourcename">'+snippets[i-1].snippetSrc+'</span>';
            }
            if (!isEmpty(snippets[i-1].snippetAuthor)) {
                s+='<span class="product-review-author"> '+snippets[i-1].snippetAuthor+'</span>';
            }
            if (!isEmpty(snippets[i-1].snippetDate)) {
                if (!isEmpty(s)) s+=',';
                s+='<span class="product-review-author"> '+snippets[i-1].snippetDate+'</span>';
            }
            if (!isEmpty(s)) s+='<br/>';
            if (!isEmpty(snippets[i-1].snippetTitle)) {
                s+='<strong>'+snippets[i-1].snippetTitle+'</strong>';
            }
            if (!isEmpty(snippets[i-1].snippetReview)) {
                s+='<div class="reviews-text" style="margin-top: 3px">'+snippets[i-1].snippetReview+'</div>';
            }
            s+="</div>";
        }
        setInnerHTMLForElement('prs-view-bl', s);
    }

    // more reviews
    s='';
    s+='<a href=\"'+prs.readReviewsUrl+'\" style=\"float:left\"><span class="product-review-link">See more reviews</span></a>';
    setInnerHTMLForElement('prs-view-read-more', s);
}

function closeProductReviewsSummaryPopupView() {
	hideElement("prs-view-container");
	hideElement("prs-view-box");
}







function renderReview(reviewType, rowId, googleAnalyticsEnabled){
	if (reviewType == 'reviews')
	{
		document.getElementById("product-details-"+rowId).style.display = "none";
		document.getElementById("product-reviews-"+rowId).style.display = "block";
		document.getElementById("product-mlt-"+rowId).style.display = "none";
		document.getElementById("wizeReview"+rowId).className = "wizepopupTab current";
		document.getElementById("specReview"+rowId).className = "wizepopupTab";
		document.getElementById("mltReview"+rowId).className = "wizepopupTab";
	}
	else if (reviewType == 'productDetails')
	{
		document.getElementById("product-details-"+rowId).style.display = "block";
		document.getElementById("product-reviews-"+rowId).style.display = "none";
		document.getElementById("product-mlt-"+rowId).style.display = "none";
		document.getElementById("wizeReview"+rowId).className = "wizepopupTab";
		document.getElementById("specReview"+rowId).className = "wizepopupTab current";
		document.getElementById("mltReview"+rowId).className = "wizepopupTab";
	}
	else
	{
		document.getElementById("product-details-"+rowId).style.display = "none";
		document.getElementById("product-reviews-"+rowId).style.display = "none";
		document.getElementById("product-mlt-"+rowId).style.display = "block";
		document.getElementById("wizeReview"+rowId).className = "wizepopupTab";
		document.getElementById("specReview"+rowId).className = "wizepopupTab";
		document.getElementById("mltReview"+rowId).className = "wizepopupTab current";
	}
	if (googleAnalyticsEnabled == 'true' || googleAnalyticsEnabled == true) {
		googleAnalyticsTracking("/ps/pages/Wize-Search.html","WizeTabs-"+reviewType, "Wize");
    }
}




function googleAnalyticsTracking (eventCatagory, eventAction, eventLabel) {
	_gaq.push(['_trackEvent', eventCatagory, eventAction, eventLabel]);
}
function googleAnalyticsSiteTracking (eventCatagory, eventAction, eventLabel) {
	_gaq.push(['_trackEvent', eventCatagory, eventAction, eventLabel]);
}

function DOBValidator(){
	var birthMonth = document.getElementById("birthMonth");
	var birthDate = document.getElementById("birthDate");
	var birthYear = document.getElementById("birthYear");
	if (birthMonth.value != "" && birthDate.value != "" && birthYear.value != ""){
		googleAnalyticsSiteTracking ('/user-details/DOB', 'User Details Page', 'DOB Entered');
	}
}

function getViewPortSize() {
	var viewportwidth;
    var viewportheight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
    	viewportwidth = window.innerWidth;
    	viewportheight = window.innerHeight;
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined' && 
    	    typeof document.documentElement.clientWidth !='undefined' && 
    	    document.documentElement.clientWidth != 0) {
    	viewportwidth = document.documentElement.clientWidth;
        viewportheight = document.documentElement.clientHeight;
     }

     // older versions of IE
     else {
    	viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
     }
    
    var viewPort = new Object();
    viewPort.x=viewportwidth;
    viewPort.y=viewportheight;
    
    return viewPort;
}

function getDocumentScroll() {
	var scrollX, scrollY;
    if(typeof pageYOffset!= 'undefined' && typeof pageXOffset!= 'undefined') {
    	scrollX=pageXOffset;
    	scrollY=pageYOffset;
	}
	else {
		if(document.documentElement.clientHeight!=null) {
			scrollX=document.documentElement.scrollLeft;
			scrollY=document.documentElement.scrollTop;
		}
		else {
			scrollX=document.body.scrollLeft;
			scrollY=document.body.scrollTop;
		}
	}

    var scroll = new Object();
    scroll.x=scrollX;
    scroll.y=scrollY;
    return scroll;
}


function fixZoomPopup(w,h) {
	var viewPort = getViewPortSize();
	if(viewPort.x<(1.5*w) || viewPort.y<(1.2*h))
		return false;
	else
		return true;
}



var xlimgError = function(source){
    source.src = "/images/misc/noimage.gif";
    source.onerror = "";
    return true;
}



function toggleOtherOptionsRow(toggleButton,parentElement,tagtype,subRowHead,subRowsIdPrefix,expandMessage,hideMessage,showfilterbyClass,showclassname,hidefilterbyClass,hideclassname,innerExpandMessage){
	var subRH = document.getElementById(subRowHead);
	var subRows = getElementsByIdStartsWith(parentElement,tagtype,subRowsIdPrefix);
	
	if(subRH.style.display == "none")	{
		subRH.style.display = "";
		toggleButton.innerHTML = '<image src="/images/minusBox.gif" align="left"/> <a><b>' + hideMessage + '</b></a>';
		toggleButton.paddingBottom = ''; 
		toggleButton.style.borderBottom = '';
		if(subRows == null)	{
			return;
		} else 	{
			var subRowLength = subRows.length;
			if(showfilterbyClass) {
				for (var i = 0; i<subRowLength;i++) {
					var row = subRows[i];
					if(row.className.indexOf(showclassname,0)<0) {
						subRows[i]=null;
					}
				}
			}
			for (var i = 0; i<subRowLength;i++) {
				if(subRows[i]!=null) {
					subRows[i].style.display="";					
				}
			}
		}
	} else{
		subRH.style.display = "none";
		toggleButton.innerHTML='<image src="/images/plusBox.gif" align="left"/> <a><b>' + expandMessage + '</b></a>';
		toggleButton.paddingBottom = '2px'; 
		toggleButton.style.borderBottom = '1px solid #CCC';
		if(subRows == null)	{
			return;
		} else	{
			var subRowLength = subRows.length;
			if(hidefilterbyClass) {
				for (var i = 0; i<subRowLength;i++) {
					var row = subRows[i];
					if(row.className.indexOf(hideclassname,0)<0) {
						subRows[i]=null;
					}
				}
			}
			for (var i = 0; i<subRows.length;i++) {
				if(subRows[i]!=null) {
					subRows[i].style.display="none";
					if(subRows[i].id.indexOf('subrows-toggle',0)>=0) {
						var toggleDiv=subRows[i].children[0].children;
						toggleDiv[0].innerHTML='<image src="/images/plusBox.gif" align="left"/> <a><b>' + innerExpandMessage + '</b></a>';
						toggleDiv[0].paddingBottom = '2px'; 
						toggleDiv[0].style.borderBottom = '1px solid #CCC';
						toggleDiv=null;
					}
				}
			}
		}
	}
}

function getElementsByIdStartsWith(container, tag, prefix) {
    var items = [];
    var parent = document.getElementById(container);
    if(parent == null){
    	return items;
    }
    
    var myPosts = parent.getElementsByTagName(tag);
    
    if(myPosts == null){
    	return items;
    }
    
    for (var i = 0; i < myPosts.length; i++) {
		if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
	}
    
    return items;
}

function toggleMoreAttributes(showMoreAttrSpan,isSameMFR) {
	if(showMoreAttrSpan.style.visibility=='hidden') {
		return;
	}
	var domPrefix = (isSameMFR)?"same-mfr-":"diff-mfr-";
	var domSuffix = (isSameMFR)?"-same-mfr":"-diff-mfr";
	var pageNum = Math.ceil(parseInt(document.getElementById("virtual_page_counter"+domSuffix).innerHTML.split("-")[1])/2);
	if(checkForMoreAttributes(pageNum, isSameMFR)) {
		var elements = getElementsByIdStartsWith(domPrefix+"virtualpage_"+pageNum,"ul",domPrefix+"extra_attributes_");
		for (var i = 0; i<elements.length;i++){
			var elem = elements[i];
			var currDisplay = elem.style.display;
			if(currDisplay == "none"){
				elem.style.display="block";
				showMoreAttrSpan.innerHTML="Hide More Attributes";
			}else{
				elem.style.display="none";
				showMoreAttrSpan.innerHTML="Show More Attributes";
			}
		}
		
	}
}

function checkForMoreAttributes(pagenum, isSameMFR) {
	var domPrefix = (isSameMFR)?"same-mfr-":"diff-mfr-";
	var domSuffix = (isSameMFR)?"-same-mfr":"-diff-mfr";
	var elements = getElementsByIdStartsWith(domPrefix+"virtualpage_"+pagenum,"ul",domPrefix+"extra_attributes_");
	if(elements.length==0)
		return false;
	else
		return true;
}

function initComparable(isSameMFR){
	var domPrefix = (isSameMFR)?"same-mfr-":"diff-mfr-";
	var domSuffix = (isSameMFR)?"-same-mfr":"-diff-mfr";
	var currpage=domPrefix+"virtualpage_1";
	var results = parseInt(document.getElementById('virtual_page_total'+domSuffix).innerHTML);
	if(results>1)
		document.getElementById("virtual_page_counter"+domSuffix).innerHTML="1-2";
	else
		document.getElementById("virtual_page_counter"+domSuffix).innerHTML="1-1";
	
	var prevbttn = document.getElementById("np-prev"+domSuffix);
	prevbttn.style.opacity="0.5";
	prevbttn.style.background="#ffffff";
	prevbttn.style.cursor="default";
	if(document.getElementById(domPrefix+"virtualpage_2")==null) {
		var nxtBttn = document.getElementById("np-next"+domSuffix);
		nxtBttn.style.opacity="0.5";
		nxtBttn.style.background="#ffffff";
		nxtBttn.style.cursor="default";
	}
	
	if(checkForMoreAttributes(1,isSameMFR))
		document.getElementById('product-container-show-more'+domSuffix).style.visibility='visible';
		
	document.getElementById(currpage).style.display="block";
}

function moveBack(isSameMFR){
	var domPrefix = (isSameMFR)?"same-mfr-":"diff-mfr-";
	var domSuffix = (isSameMFR)?"-same-mfr":"-diff-mfr";
	var currPageNum = Math.ceil(parseInt(document.getElementById("virtual_page_counter"+domSuffix).innerHTML.split("-")[1])/2);
	var prevpage=domPrefix+"virtualpage_"+(currPageNum-1);
	if(document.getElementById(prevpage) == null){
		return;
	}
	var currpage=domPrefix+"virtualpage_"+currPageNum;
	
	var nextbttn = document.getElementById("np-next"+domSuffix);
	var prevbttn = document.getElementById("np-prev"+domSuffix);
	nextbttn.style.opacity="1.0";
	nextbttn.style.borderLeft="1px solid #c2cccc";
	nextbttn.style.background="#e1e6e6";
	prevbttn.style.borderRight="none";
	
	var showMoreAttrs = document.getElementById('product-container-show-more'+domSuffix);
	if(checkForMoreAttributes(currPageNum-1,isSameMFR)) {
		showMoreAttrs.style.visibility='visible';
	} else {
		showMoreAttrs.style.visibility='hidden';
	}
	
	currPageNum=(currPageNum*2)-2;
	document.getElementById("virtual_page_counter"+domSuffix).innerHTML = (currPageNum-1)+"-"+currPageNum;
	
	if((currPageNum-1) == 1) {
		prevbttn.style.opacity="0.5";
		prevbttn.style.background="#ffffff";
		prevbttn.style.cursor="default";
	}
	document.getElementById(currpage).style.display="none";
	document.getElementById(prevpage).style.display="block";
}

function moveForward(isSameMFR) {
	var domPrefix = (isSameMFR)?"same-mfr-":"diff-mfr-";
	var domSuffix = (isSameMFR)?"-same-mfr":"-diff-mfr";
	var currPageNum = Math.ceil(parseInt(document.getElementById("virtual_page_counter"+domSuffix).innerHTML.split("-")[1])/2);
	var nextpage=domPrefix+"virtualpage_"+(currPageNum+1);
	if(document.getElementById(nextpage) == null) {
		return;
	}
	var currpage=domPrefix+"virtualpage_"+currPageNum;
	var prevbttn = document.getElementById("np-prev"+domSuffix);
	prevbttn.style.opacity="1.0";
	prevbttn.style.background="#e1e6e6";
	prevbttn.style.cursor="pointer";
	
	var showMoreAttrs = document.getElementById('product-container-show-more'+domSuffix);
	if(checkForMoreAttributes(currPageNum+1,isSameMFR)) {
		showMoreAttrs.style.visibility='visible';
	} else {
		showMoreAttrs.style.visibility='hidden';
	}
	
	var results = parseInt(document.getElementById('virtual_page_total'+domSuffix).innerHTML);
	var totalPages = Math.ceil(results/2);
	
	var nextbttn = document.getElementById("np-next"+domSuffix);
	if((currPageNum+1) == totalPages) {
		nextbttn.style.opacity="0.5";
		nextbttn.style.borderLeft="none";
		nextbttn.style.background="#ffffff";
		nextbttn.style.cursor="default";
		
		prevbttn.style.borderRight="1px solid #c2cccc";
		currPageNum = currPageNum+1;
		if(results%2==0){
			currPageNum*=2;
			document.getElementById("virtual_page_counter"+domSuffix).innerHTML=(currPageNum-1)+"-"+currPageNum;
		}else{
			currPageNum=(currPageNum*2)-1;
			document.getElementById("virtual_page_counter"+domSuffix).innerHTML=currPageNum+"-"+currPageNum;
		}
	} else {
		currPageNum=(currPageNum*2)+2;
		document.getElementById("virtual_page_counter"+domSuffix).innerHTML=(currPageNum-1)+"-"+currPageNum;
	}
	document.getElementById(currpage).style.display="none";
	document.getElementById(nextpage).style.display="block";
}
/*Utils functions*/
/**
 * functionPtr should handle all the parameter in it only.
 * e.g. function openSrLb( input){alert('input: ' + input);} 
 * var functionPtr  = function(reponseStr){openSrLb(reponseStr);}; 
 * functionPtr('my param'); will call 
 * openSrLb('my param');
 */
function invokeAjaxCall(url, functionPtr, doPost){
   // Error Check for url
   if(url == null || url.length == 0){
     return;
   }
   //Make ajax call
   var xmlhttp;
   if (window.XMLHttpRequest)
   {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
   }
   else
   {// code for IE6, IE5
	   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   }
   xmlhttp.onreadystatechange=function()
   {
	   if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			   //functionPtr is the function pointer with all the params in it
			   functionPtr(xmlhttp.responseText);
			}
   }
   var protocol = "GET";
   if(doPost == true){
      protocol = "POST";
   }
   xmlhttp.open(protocol,url,true);
   xmlhttp.send();
}
//this will only return the actual content html , no header, no script, no footer etc
function getOnlyNextagHtmlContent(htmlContent){
  if(htmlContent == null){
	  return '';
  }
  var firstIndex = htmlContent.indexOf('<!-- NexTag Content Begins -->');
	if (firstIndex >= 0) {
		var startIndex = firstIndex + '<!-- NexTag Content Begins -->'.length;
		var endIndex = htmlContent.indexOf('<!-- NexTag Content Ends -->',startIndex);
		if (endIndex >= 0 ) {
			var ret_val = htmlContent.substring(startIndex , endIndex);
			return ret_val.trim();
		}
	}
	return htmlContent.trim();
}

function toggleElementWithId(boxId){ /* Use this method to toggle the display of any box element*/
	var box = document.getElementById(boxId);
	if(box != null){
		if(box.style.display == "none"){
			box.style.display = "";
		}else {
			box.style.display = "none";
		}
	}
}
function hideElementById(boxId){
	var box = document.getElementById(boxId);
    if(box != null){
		box.style.display="none";
	}
}

function showBlockElementById(boxId){ /* Use this method to toggle the display of any display:'block' element*/
	var box = document.getElementById(boxId);
	if(box != null){
		box.style.display = "block";
	}
}

var mfrPopupCreated = false;

function getMfrNLA(popupId, searchStr,visibleMfrCnt, nodeid, nodeBoostStr, channel, market, styleType) {
	if(mfrPopupCreated) {
		return;
	}
	var nlaMfrPopup = document.getElementById('nlaPopDiv_'+popupId);
	var baseUrl = "/seo/t1/buyer/outpdir1/AjaxNLAManager.jsp";
	var url = baseUrl + "?search=" + searchStr;
	url = url + "&visibleCnt=" + visibleMfrCnt;
	url = url + "&node=" + nodeid;
	url = url + "&broadMatchCanonicalKeyword=" + searchStr;
	url = url + "&nodeBoostStr="+nodeBoostStr;
	url = url + "&channel="+channel;
	url = url + "&market="+market;
	url = url + "&lt="+styleType;
	nlaMfrPopup.innerHTML = '<div class="nla-pop-main" style="height:184px;width:402px;">'+
	'<div class="nla-pop-container" align="center" style="border:none; padding-top:90px;">'+
	'<table class="nla-pop-table"><tr><td>'+
	'<div align="center"><img src="/images/loading.gif"></div>'+
	'</td></tr></table></div></div>';
	
	var functionPtr = function(responseStr) {
		var htmlContent = getOnlyNextagHtmlContent(responseStr);
		nlaMfrPopup.innerHTML = htmlContent;
		mfrPopupCreated = true;
		nlaMfrPopup.style.top = nlaMfrPopup.style.top - nlaMfrPopup.getSize().y + 18; 
	}
	
	invokeAjaxCall(url, functionPtr, false);
}

/*
Code to fetch content for coupons and deals using ajax
*/
function getAjaxDealsAndCoupons(rowId, left, top, url, thiz) {
    if (thiz.promoPopUp) {
        if (thiz.hasPromoPopUp) {
            if (thiz.promoPopUp.style.visibility == "visible") {
                closePromo();
            } else {
                closePromo();
                showPromo(thiz.promoPopUp, rowId);
            }
        } else
            closePromo();
    } else {
        closePromo();
        var popupId = 'promoPopup_' + rowId;
        var popUp = document.getElementById(popupId);
        if (popUp) {
            thiz.hasPromoPopUp = true;
            thiz.promoPopUp = popUp;
            var pos = findPos(thiz);
            popUp.innerHTML = '<table class="promo-popup-container" style="width:100%;height:100px"><tr><td align="center" valign="middle">' +
                    '<img src="/images/loading.gif">' +
                    '</td></tr></table>';
            popUp.style.left = pos[0] + left + "px";
            popUp.style.top = pos[1] - top + "px";
            popUp.style.visibility = "visible";
            invokeAjaxCall(url, function(responseStr) {
                popUp.innerHTML = getOnlyNextagHtmlContent(responseStr);
                showPromo(popUp, rowId);
            }, false);
        }else
            thiz.promoPopUp=true;
    }

    function closePromo() {
        if (visiblePromoPopup && visiblePromoPopup.style)
            visiblePromoPopup.style.visibility = "hidden";
        visiblePromoPopup = undefined;
    }

    function showPromo(popUp, rowId) {
        visiblePromoPopup = popUp;
        visiblePromoPopup.style.visibility = "visible";
        toggleContent("promo", rowId);
    }

}var NextagUtils = new Object();
NextagUtils.sVisibleDiv = null;
NextagUtils.sVisibleDivToggleFlag = 0;

NextagUtils.sCubeables = new Array();

/** public static variables **/
// detect a special case of "web browser"
NextagUtils.is_ie = ( /msie/i.test(navigator.userAgent) &&
		   !/opera/i.test(navigator.userAgent) );
NextagUtils.is_ie5 = ( NextagUtils.is_ie && /msie 5\.0/i.test(navigator.userAgent) );
// detect Opera browser
NextagUtils.is_opera = /opera/i.test(navigator.userAgent);
// detect KHTML-based browsers
NextagUtils.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);
NextagUtils.is_chrome = navigator.userAgent.toUpperCase().indexOf('CHROME') != -1;

// Event methods
NextagUtils.addEvent = function(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, false);
	} else {
		el["on" + evname] = func;
	}
};

NextagUtils.stopEvent = function(ev) {
	ev || (ev = window.event);
	if (NextagUtils.is_ie) {
		ev.cancelBubble = true;
		ev.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
	return false;
};

NextagUtils.defaultDocumentOnClickHandler = function (ev){
	if (NextagUtils.sVisibleDiv != null){
		if (NextagUtils.sVisibleDivToggleFlag==0){
			NextagUtils.sVisibleDiv.style.display = 'none';
			NextagUtils.sVisibleDiv = null;
		} else
			NextagUtils.sVisibleDivToggleFlag = 0;
	}
	return true;
};

// DOM/Object methods
NextagUtils.createElement = function(type, parent) {
	var el = null;
	if (document.createElementNS) {
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		el = document.createElementNS("http://www.w3.org/1999/xhtml", type);
	} else {
		el = document.createElement(type);
	}
	if (typeof parent != "undefined") {
		parent.appendChild(el);
	}
	return el;
};

// UI methods
NextagUtils.getElementPosition = function(obj){
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent){
		while (obj.offsetParent){
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	} else if (obj.x){
		curleft += obj.x;
		curtop += obj.y;
	}
	return { x: curleft, y: curtop };
};

NextagUtils.getRelativePosition = function(obj, offsetX, offsetY){
	var pos = this.getElementPosition(obj);
	var left = pos.x + offsetX;
	var top = pos.y + offsetY;
  return { x: left, y: top };
};

// UI - Popup DIV methods
NextagUtils.toggleShowDiv = function(id, pos){
	// alert("-- in toggle");
	var elem = document.getElementById(id);
	if (!elem)
		return false;
	if (elem == NextagUtils.sVisibleDiv){
		NextagUtils.sVisibleDiv.style.display = 'none';
		NextagUtils.sVisibleDiv = null;
		return true;
	}
	if (pos){
		elem.style.top = pos.y + 'px';
		elem.style.left = pos.x + 'px';
	}
	if (NextagUtils.sVisibleDiv != null)
		NextagUtils.sVisibleDiv.style.display = 'none';
	NextagUtils.sVisibleDiv = elem;
	elem.style.display = 'block';
	NextagUtils.sVisibleDivToggleFlag = 1;

	return true;
};

NextagUtils.expandSearchRefineScrollDiv = function (prefix){
	var tagT = document.getElementById(prefix + '_T');
	var tagC = document.getElementById(prefix + '_C');
	var tagH = document.getElementById(prefix + '_H');
	var tagM = document.getElementById(prefix + '_M');

	if (tagC && (tagC.style.height == '' ||
			tagC.style.height == undefined))
		tagC.style.height = (tagC.offsetHeight-4) + 'px';

	if (tagT) tagT.className = 'advSRScrollTitle_HL';
	if (tagC) tagC.className = 'advSRScrollContainer_HL';
	if (tagH) tagH.className = 'advSRScrollHidden_HL';
	if (tagM) tagM.className = 'advSRScrollMore_HL';
};

NextagUtils.collapseSearchRefineScrollDiv = function (prefix){
	var tagT = document.getElementById(prefix + '_T');
	var tagC = document.getElementById(prefix + '_C');
	var tagH = document.getElementById(prefix + '_H');
	var tagM = document.getElementById(prefix + '_M');

	if (tagT) tagT.className = 'advSRScrollTitle';
	if (tagC) tagC.className = 'advSRScrollContainer';
	if (tagH) tagH.className = 'advSRScrollHidden';
	if (tagM) tagM.className = 'advSRScrollMore';
};


/**
 * element utilities like positioning and event functions
 * for NextagUtils.getPageX and NextagUtils.getPageY:
 * relatively positioned items will give you trouble, lots of it
 */

NextagUtils.getElementWidth = function(e,b) {return ((b.op)? e.style.pixelWidth:e.offsetWidth);};
NextagUtils.getElementHeight = function(e,b) { return ((b.op)? e.style.pixelHeight:e.offsetHeight); };

/** should provide more reliable element positions than getPageX/getPageY. 
* if inside containers w/ scrollbars, use overflown array 
* adapted from mootools. MIT-style license. MooTools Copyright: copyright (c) 2007 Valerio Proietti, <http://mad4milk.net>
*/
NextagUtils.getPosition = function(elem,overflown) {
	var left = 0, top = 0;
	do {
		left += elem.offsetLeft || 0;
		top += elem.offsetTop || 0;
		elem = elem.offsetParent;
	} while (elem);
	if (overflown) {
		for (var i=0;i<overflown.length;i++) {
			var element = overflown[i];
			if (element) {
				left -= element.scrollLeft || 0;
				top -= element.scrollTop || 0;
			}
		}
	}
	return {'x': left, 'y': top};
};

NextagUtils.getPageX = function(o,b) {
	if (b.op) {
		var x=0;
		while(eval(o)) {
			x+=o.style.pixelLeft;
			o=o.offsetParent;
		}
		return x;
	} else {
		var m=(b.mac&&b.ie)? document.body.leftMargin:0;
		var x=0;
		var incase=0;
		var hasBody=false;
		var hasHtml=false;
		while(eval(o)) {
			x+=o.offsetLeft;
			if (b.ie && o && o.tagName == 'TABLE'){
				incase = x;
				// break;
			} else if (b.ie && o.tagName == 'HTML') {
				hasHtml = true;
			} else if (b.ie && o.tagName == 'BODY') {
				hasBody = true;
			}
			o=o.offsetParent;
		}
		if (hasHtml && !hasBody)
		  x = incase;
		return parseInt(x)+parseInt(m)
	}
};

NextagUtils.getPageY = function(o,b) {
	if(b.ns) {
		var y=(o.pageY)? o.pageY:o.y;
		return y;
	} else if (b.op) {
		var y=0;
		while(eval(o)) {
			y+=o.style.pixelTop;
			o=o.offsetParent;
		}
		return y;
	} else {
		var m = (b.mac&&b.ie)? document.body.topMargin:0;
		var y=0;
		var incase=0;
		var hasBody=false;
		var hasHtml=false;
		while(eval(o)) {
			y+=o.offsetTop;
			if (b.ie && o.tagName == 'TABLE'){
				incase = y;
				// break;
			} else if (b.ie && o.tagName == 'HTML') {
				hasHtml = true;
			} else if (b.ie && o.tagName == 'BODY') {
				hasBody = true;
			}
			o=o.offsetParent;
		}
		if (hasHtml && !hasBody)
		  y = incase;
		return parseInt(y)+parseInt(m);
	}
};

NextagUtils.showElement = function(e,disp) {
	(!disp)? 0:e.style.display=disp;
	e.style.visibility='visible';
};

NextagUtils.hideElement = function(e,disp) {
	(!disp)? 0:e.style.display=disp;
	e.style.visibility='hidden';
};

NextagUtils.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

NextagUtils.hideShowCovered = function (elem, tags) {
	NextagUtils.continuation_for_khtml_browser = function() {
		function getVisib(obj){
			var value = obj.style.visibility;
			if (!value) {
				if (document.defaultView && typeof (document.defaultView.getComputedStyle) == "function") { // Gecko, W3C
					if (!NextagUtils.is_khtml)
						value = document.defaultView.
							getComputedStyle(obj, "").getPropertyValue("visibility");
					else
						value = '';
				} else if (obj.currentStyle) { // IE
					value = obj.currentStyle.visibility;
				} else
					value = '';
			}
			return value;
		};

		var el = elem;

		var p = NextagUtils.getElementPosition(el);
		var EX1 = p.x;
		var EX2 = el.offsetWidth + EX1;
		var EY1 = p.y;
		var EY2 = el.offsetHeight + EY1;

		for (var k = tags.length; k > 0; ) {
			var tag = tags[--k];
			var filter = null;
			if (tag.indexOf('input.') == 0){
				filter = tag.replace('input.','');
				tag = 'input';
			}
			var ar = document.getElementsByTagName(tag);
			var cc = null;

			for (var i = ar.length; i > 0;) {
				cc = ar[--i];

				if (filter != null && filter != cc.type){
					continue;
				}

				p = NextagUtils.getElementPosition(cc);
				var CX1 = p.x;
				var CX2 = cc.offsetWidth + CX1;
				var CY1 = p.y;
				var CY2 = cc.offsetHeight + CY1;

				if (el.style.visibility == 'visible' || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1)) {
					if (!cc.__msh_save_visibility) {
						cc.__msh_save_visibility = getVisib(cc);
					}
					cc.style.visibility = cc.__msh_save_visibility;
				} else {
					if (!cc.__msh_save_visibility) {
						cc.__msh_save_visibility = getVisib(cc);
					}
					cc.style.visibility = "hidden";
				}
			}
		}
	};
	if (NextagUtils.is_khtml)
		setTimeout("NextagUtils.continuation_for_khtml_browser()", 10);
	else
		NextagUtils.continuation_for_khtml_browser();
};

function bookmark(url, curl) {
	var title = document.title;
	if (window.sidebar) {
		//mozilla
		window.sidebar.addPanel(title, url,"");
	} else if (window.external) {
		//ie
		window.external.AddFavorite(url,title) 
	}
	var req = new NxtgHttpReq(curl, {'method':'GET'});
	req.send(null);
}

function resizeBannerAd(id, width, height){
	var frame = document.getElementById(id);
	if (id && frame){
		frame.style.display = 'inline';
		frame.style.height = height + "px";
		if (id.match("fakeresult")) {
			frame.style.width = "100%";
		} else {
		frame.style.width = width + "px";
		if((id.match("search") || id.match("product")) && !id.match("travel")){
			if(id.match("header")){
					frame.style.paddingTop = "8px";
				frame.style.paddingBottom = "10px";
			}else if(id.match("footer")){
				frame.style.paddingTop = "15px";
				} else if(id.match("rsidebar")){
				frame.style.paddingBottom="10px";
				} else if(id.match("lhsbrand")){
				frame.style.paddingBottom="10px";
			}
			} else if(id.match("home")){
			if(id.match("miniforms")){
				frame.style.paddingBottom = "10px";
			}
		}
	}
	}
};

function showParams(start, end, attrs, prefix){
	for(var i=0; i<attrs; i++){
		var elmt = document.getElementById(prefix+i);
		if(elmt){
			if(i >= start && i <= end){
				elmt.style.display = "";
			}else{
				elmt.style.display = "none";
			}
		}
	}
	var back = document.getElementById(prefix+'back');
	var more = document.getElementById(prefix+'more');
	var more_beg = end+1;
	var more_end = more_beg+(end-start);
	var back_beg = (start-1)-(end-start);
	if(back_beg < 0) back_beg = 0;
	var back_end = back_beg+(end-start);

	if(start == 0){
		back.style.display = 'none';
	}else{
		back.style.display = '';
	}
	if(end >= attrs-1){
		more.style.display = 'none';
	}else{
		more.style.display = '';
	}
	more.href = "javascript:showParams(" + more_beg + "," + more_end + "," + attrs + ",'" + prefix + "')";
	back.href = "javascript:showParams(" + back_beg + "," + back_end + "," + attrs + ",'" + prefix + "')";
};

function showElements(mLinkName, linkPrefix, linkNum){
	for(var i=1; i<linkNum; i++){
		var element = document.getElementById(linkPrefix+'_'+i);
		element.style.display = '';
	}
	var moreLink = document.getElementById(mLinkName);
	moreLink.style.display = 'none';
	return false;
}

function toggleNLA(id){
	var content = document.getElementById(id+'_C');
	var imgd = document.getElementById(id+'_im_d');
	var imgr = document.getElementById(id+'_im_r');
	if (!content)
		return false;
	if (content.style.display != 'none'){
        	content.style.display = imgd.style.display = 'none';
        	imgr.style.display = '';
	}else{
        	content.style.display = imgd.style.display = '';
        	imgr.style.display = 'none';
	}

	return true;
};

function resizeIFrame(id){
	var ifd;
	if (id && document.getElementById(id)){
		if (document.getElementById(id).contentWindow == undefined){
			ifd = document.getElementById(id).document;
		} else {
			ifd = document.getElementById(id).contentWindow.document;
		}
		document.getElementById(id).style.height = ifd.body.scrollHeight + "px";
		document.getElementById(id).style.width = "100%";
	}
};

function displayBanners(ads, params){
	var skyscraper = $('banner-skyscraper');
	var footer = $('banner-footer');

	var banners = ads.ad;
	for(var i=0; i<banners.length; i++){
		var cnr=banners[i].cnr;
		var tag=banners[i].tag;
		var height=banners[i].h;
		var width=banners[i].w;
		var iframe = new Element('IFRAME',{'scrolling':'no','frameborder':'0','marginwidth':'0','marginheight':'0',
						'width':width,'height':height,'src':tag}); 

		var bannerDiv = $(params[cnr]);
		var style = params['styles'][cnr];
		iframe.set('styles',style);
		iframe.injectInside(bannerDiv);
	}
};

NextagUtils.makeCubeable = function(o){
	NextagUtils.sCubeables[NextagUtils.sCubeables.length]=o;
};

var SLCTR = new Object();
SLCTR.incs = new Array();
SLCTR.register = function(id,url){ /* alert('SLCTR.register('+id+')');*/ SLCTR.incs[SLCTR.incs.length] = {i:id,u:url}; };
SLCTR.ldPrime = function(ik){
	// alert('SLCTR.ldPrime('+ik+') ' + SLCTR.incs.length);
	for (var i=0; i<SLCTR.incs.length; i++){
		try { document.getElementById(SLCTR.incs[i].i).src = SLCTR.incs[i].u;} 
		catch (e){}
	}
};

/* hideAll, writeBrowseMore and showMore are used for the Browse page */
function hideAll(tagname, classname, viewValue) {
    var elements = document.getElementsByTagName(tagname);
    for (var i=0; i < elements.length; i++) {
        if (elements[i].className == classname) {
            elements[i].style.display=viewValue;
        }
    }
};

/* hideAll, writeBrowseMore and showMore are used for the Browse page */
function showMore(node) {
	var spanId = 'span_' + node;
	var moreId = 'more_' + node;
	document.getElementById(spanId).style.display='inline';
	document.getElementById(moreId).style.display='none';
};

/* add the customizable separator */
function writeBrowseMore(node, moreText, separator){
	moreText = (moreText == undefined) ? 'more...' : moreText;
	separator = (separator == undefined) ? ',' : separator;
	document.write('<span id="more_' + node + '" name="more_link">'+separator+'&nbsp; <a href="javascript:showMore(\'' + node + '\')">' + moreText + '</a></span>');
};

/* Animated Button Manager */

var ntButtonAnimationManager = {};
ntButtonAnimationManager.timers = {};
ntButtonAnimationManager.START_FRAME = 0;
ntButtonAnimationManager.END_FRAME = 2;
ntButtonAnimationManager.ACTIVE_FRAME = 3;
ntButtonAnimationManager.INTERVAL = 150; /* milliseconds */
ntButtonAnimationManager.RESET_INTERVAL = 500 /* milliseconds */
ntButtonAnimationManager.height = 21;
ntButtonAnimationManager.activeId = null;

function startButtonAnimation(buttonId) {
	/* clear existing timers for this button id and start the animation on frame START_FRAME */
	if (ntButtonAnimationManager.timers[buttonId] != null) return;
	clearTimeout(ntButtonAnimationManager.timers[buttonId]);
	ntButtonAnimationManager.timers[buttonId]=null; 
	nextButtonFrame(buttonId, ntButtonAnimationManager.START_FRAME);
}

function showButtonFrame(buttonId, frame) {
	var offset = -1 * ((frame * ntButtonAnimationManager.height) + frame);
	var offsetString = "0 " + offset + "px";
	$(buttonId).setStyle('background-position', offsetString);
}

function nextButtonFrame(buttonId, frame) {
	/* show the indicated frame and start a timer to show the next frame */
	if (frame < (ntButtonAnimationManager.END_FRAME + 1)) {
		showButtonFrame(buttonId, frame)
		ntButtonAnimationManager.timers[buttonId] = setTimeout(function(){ nextButtonFrame(buttonId, frame + 1)}, ntButtonAnimationManager.INTERVAL);
	} else {
		resetAnimatedButton(buttonId);
	}	
}

function endButtonAnimation(buttonId) {

	if (ntButtonAnimationManager.activeId == buttonId) {
		ntButtonAnimationManager.timers[buttonId] = setTimeout(function(){ endButtonAnimation(buttonId); }, ntButtonAnimationManager.INTERVAL);
	} else {
		showButtonFrame(buttonId, ntButtonAnimationManager.START_FRAME);
		ntButtonAnimationManager.timers[buttonId] = null;
	}
}

function resetAnimatedButton(buttonId) {
	if (ntButtonAnimationManager.timers[buttonId] == null) return;
	clearTimeout(ntButtonAnimationManager.timers[buttonId]);
	ntButtonAnimationManager.timers[buttonId] = setTimeout(function(){ endButtonAnimation(buttonId); }, ntButtonAnimationManager.RESET_INTERVAL);
	
}
/** connect browser events to animation manager **/
function initAnimatedButton(name) {
	if (typeof(window.addEvent) != 'undefined' ) {
		
		window.addEvent('domready', function() {
			$(document.body).getElements(name).addEvents({
				'mouseenter' : 	function() { ntButtonAnimationManager.activeId = this.id; startButtonAnimation(this.id); },
				'mouseleave' : 	function() { ntButtonAnimationManager.activeId = null; resetAnimatedButton(this.id); },
				'click' : 	function() { clearTimeout(ntButtonAnimationManager.timers[this.id]); ntButtonAnimationManager.timers[this.id]=null; showButtonFrame(this.id, ntButtonAnimationManager.ACTIVE_FRAME); return true;}
			});
		});
		
	} else {
		// No mootools!
	}
}

// Adding required methods from COMBINED.JS //

function showExpandableDescription(elementId){
		showOutpdirAllDescription(elementId,elementId+'_tail');
		var e = document.getElementById(elementId+'_head');
		if (e) e.style.cursor = 'default';
}

function showOutpdirAllDescription(elementIdToShow, elementIdToHide) {
		var e = document.getElementById(elementIdToShow);
		if (e) e.style.display = "inline";
		e = document.getElementById(elementIdToHide);
		if (e) e.style.display = "none";
}

// Changes ends here from COMBINED.JS //

/* On every page - draw the background graphics after the page has loaded */
window.addEvent('domready', function() {
	if ($(document.body).hasClass("rb")) {
		setTimeout(function() { 
			if ($("outer-container") != null) {
				$("outer-container").addClass("nextag-bkg");
			}
		}, 20);
	}
});

function filter(element, formVariant){
	var value = element.innerHTML;
	var selectionForm = $('selectionForm');
	selectionForm.elements[formVariant].value = value;
	selectionForm.submit();
	
}

function registerFB() {
	FB.api('/me?fields=email,id,first_name,last_name,location,gender,friends,interests,birthday,activities,likes', function(response) {
		if($('fb_email') && response.email) {
			$('fb_email').value = response.email;
		}
		if($('fb_facebookUserId') && response.id) {
			$('fb_facebookUserId').value = response.id;
		}
		if($('fb_firstName') && response.first_name) {
			$('fb_firstName').value = response.first_name;
		}
		if($('fb_lastName') && response.last_name) {
			$('fb_lastName').value = response.last_name;
		}
		if($('fb_location') && response.location) {
			$('fb_location').value = JSON.stringify(response.location);
		}
		if($('fb_gender') && response.gender) {
			$('fb_gender').value = response.gender;
		}
		if($('fb_birthDate') && response.birthday) {
			$('fb_birthDate').value = response.birthday;
		}
		if($('fb_avatar')) {
			$('fb_avatar').value = "http://graph.facebook.com/"+response.id+"/picture";
		}
		if($('fb_friends') && response.friends) {
			$('fb_friends').value = JSON.stringify(response.friends.data);
		}
		var interests = [];
		if(response.likes) {
			interests.push(response.likes.data);
		} else if(response.interests) {
			interests.push(response.interests.data);
		}
		
		if(response.activities) {
			interests.push( response.activities.data);
		}
		if($('fb_interests') && interests.length > 0) {
			$('fb_interests').value = JSON.stringify(interests);
		}
		$('facebook_form').submit();
	});
}

function fbRadarLogin() {
	if ($('fb_radar')) {
		$('fb_radar').value = "true";
	}
	fbLogin("Please try again in a few seconds.");
}

/* ------------ temporary for favorites feature------------ */

function showSharePop(elem,popId) {
	var popup = $('shareCon_'+popId);
	showRbPopup(popup,elem);
};

function showAtlPop(elem) {
	var popId = elem.id.replace("atlLink_","");
	popId = 'atlPop_'+popId;
	showRbPopup($(popId),elem);
};

function showMMPop(elem) {
	var popId = elem.id.replace("mmButton_","");
	popId = 'mmPop_'+popId;
	showPopupOnTop($(popId),elem,-17,18);
};

function showMMProdPop(elem) {
	var popId = 'mmPop';
	showPopupOnTop($(popId),elem,-17,15);
};

function clearInputText(id, tempText) {
	if ($(id) && $(id).value == tempText) {
		$(id).value = '';
	}
}

function showPopupOnTop(popup,caller,x,y) {
	if (popup&&caller) {
		caller = document.id(caller.id);	// for IE
		var pos = caller.getPosition();
		pos.x += x;
		pos.y -= caller.getSize().y + y;
		popup.setPosition(pos);
		popup.fade('in');
		
		var t;
		caller.addEvent('mouseleave',function(e) {
			if (popup.getStyle('opacity')==1) {
				t = setTimeout(function(){popup.fade('out')},1000);
			}
		});
		popup.addEvent('mouseenter',function(e) {
			clearTimeout(t);
		});
		popup.addEvent('mouseleave',function(e) {
			popup.fade('out');
		});
	}
}

function closePopup(popup) {
	$(popup).fade('out');
}



function showSaveSearchPop(elem) {
	var popup = $('searchSavePopup_1');
	showRbPopup(popup,elem);
}

function showSearchAlertPop(elem) {
	var popup = $('searchAlertPopup_1');
	showRbPopup(popup,elem,1);
}

function showCreateListPop(elem,popId,ptitle) {
	var atlPopId = 'atlPop_'+popId;
	$(atlPopId).fade('out');
	var popup = $('createListPopup_1');
	
	new Request.HTML({url: '/buyer/NewList.jsp?rebrand=1&ptitle='+ptitle, 
		onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
			popup.set('html',responseHTML);
			showRbPopup(popup,$(atlPopId),1);
	}}).post();
}

function submitCreateList(form) {
	new Form.Request(form,$('createListPopup_1'),{onComplete:function() {
		populateToolbar('/personal/module/get/mylistsoverview',$('mylistsoverview').getPosition().x);
	}}).send();
	return false;
}

function submitSearchAlert(form) {
	var popup = $('searchAlertPopup_1');
	$('search-alert-form').set('send',{
		onComplete:function(response){
			popup.set('html',response);
			saveSearchForm();
		},
		onSuccess:function(responseText) {
			toggleRadar();
		}
	});
	$('search-alert-form').send();
	toggleRadar();
	return false;
}

function showLogin(popCon,popStatus) {
	if ($(popCon)) {
		var paddingY = $(popCon).getSize().y/2-16;
		$('loginPopupCon').setStyles({padding: paddingY+'px 5px'});
		$(popCon).set('html',$('loginPopup').get('html'));
		if (popStatus&&$(popStatus)) {
			$(popStatus).setStyle('display','block');
		}
	}
}

function atl(popId,gotourl,width,noborder) {
	var conId = 'atlPopContent_'+popId;
	var statCon = $('atlStatus_'+popId);
	var container = $('atlPopContentCon_'+popId);
	var paddingY = $(conId).getSize().y/2-16;
	var paddingX = $(conId).getSize().x/2-16;

	$(conId).set('html','<div style=\"padding:'+paddingY+'px '+paddingX+'px;\"><img src="/images/loading.gif"/></div>');
	var myRequest = new Request.HTML({url: gotourl, 
		onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
			if (width) {
				container.setStyle('width',width);
			}
			if (noborder) {
				statCon.setStyle('border-bottom','none');
			}
			$(conId).set('html',responseHTML);
			statCon.setStyle('display','block');
			populateToolbar('/personal/module/get/mylistsoverview',$('mylistsoverview').getPosition().x);
	}});
	myRequest.post();
}

function saveFave(gotourl,popId,returnurl,toolId) {
	var conId = 'atlPopContent_'+popId;
	var paddingY = $(conId).getSize().y/2-16;
	var paddingX = $(conId).getSize().x/2-16;
	$(conId).set('html','<div style=\"padding:'+paddingY+'px '+paddingX+'px;\"><img src="/images/loading.gif"/></div>');
	
	var reloadCb = function() {
		reloadFave(popId,returnurl);
	}
	populateToolbar(gotourl,$(toolId).getPosition().x,reloadCb);
}

function showRbPopup(popup,caller,noHover) {
	if (popup&&caller) {
		caller = document.id(caller.id);	// for IE
		var pos = caller.getPosition();
		pos.x += caller.getSize().x/2;
		pos.y += caller.getSize().y;
		popup.setPosition(pos);
		popup.fade('in');
		
		if (!noHover) {
			var t;
			caller.addEvent('mouseleave',function(e) {
				if (popup.getStyle('opacity')==1) {
					t = setTimeout(function(){popup.fade('out')},1000);
				}
			});
			popup.addEvent('mouseenter',function(e) {
				clearTimeout(t);
			});
			popup.addEvent('mouseleave',function(e) {
				popup.fade('out');
			});
		}
	}
}
function toggleRadar() {
	if ($('radar-register')) {
		$('radar-register').style.display = 'none';
	}
	if ($('radar-register-row')) {
		$('radar-register-row').style.display='none';
	}
	if ($('radar-info-row')) {
		$('radar-info-row').style.display='none';
	}
	if ($('radar-saved')) {
		$('radar-saved').style.display = 'block';
	}
	lbShown = true;
	clearLBTimeout();
	if (typeof hideLbTimeout == 'function') {
		hideLbTimeout();
	}
}

function togglePriceRadar() {
	if ($('radar-row')) {
		$('radar-row').style.display='none';
	}
	if ($('radar-register-row')) {
		$('radar-register-row').style.display='none';
	}
	if ($('radar-info-row')) {
		$('radar-info-row').style.display='none';
	}
	if ($('radar-row-success')) {
		$('radar-row-success').style.display='';
	}
	if (typeof hideLbTimeout == 'function') {
		hideLbTimeout();
	}
	lbShown = true;
	clearLBTimeout();
}

function saveSearchRadar(search,alias,filter,freq,exp,idSuffix) {
	var email = $('radar-email-input'+idSuffix).value;
	var source = $('radar-source'+idSuffix).value;
	var dealEmails = $('radar-dealEmails-input'+idSuffix).checked;
	
	if (Form.Validator.getValidator('required').test($('radar-email-input'+idSuffix)) && Form.Validator.getValidator('validate-email').test($('radar-email-input'+idSuffix))) {
		var params = 'search='+search+'&alias='+alias+'&fsfilter='+filter+'&freq='+freq+'&email='+email+'&source='+source+'&exp='+exp+'&dealEmails='+dealEmails;
		var radarReq = new Request({
			url: '/radar/search/create',
			method: 'get',
			data: params,
			onComplete: function(response) {
				saveSearchForm();
			},
			onSuccess: function(response) {
				var responseJson = JSON.parse(response);
				if (responseJson.errors) {
					//some error handling here
				} else {
					toggleRadar();
				}
			},
			onFailure: function() {
			}
		});
		radarReq.send();
	} else {
		$('radar-email-error'+idSuffix).style.display = 'block';
	}
}

function savePriceRadar(productId,condition,originalPrice,exp,idSuffix,ptitle,pname,adnode,decMnyFmt) {
	var email = $('radar-email-input'+idSuffix).value;
	var source = $('radar-source'+idSuffix).value;
	var dealEmails = $('radar-dealEmails-input'+idSuffix).checked;
	var price = $('radar-price-input'+idSuffix).value;
	
	$('radar-price-error'+idSuffix).style.display = 'none';
	$('radar-email-error'+idSuffix).style.display = 'none';
	if (Form.Validator.getValidator('required').test($('radar-email-input'+idSuffix)) && Form.Validator.getValidator('validate-email').test($('radar-email-input'+idSuffix))) {
		if (Form.Validator.getValidator('required').test($('radar-price-input'+idSuffix)) &&
				((decMnyFmt && Form.Validator.getValidator('req-greater-zero').test($('radar-price-input'+idSuffix))) || 
				(!decMnyFmt && Form.Validator.getValidator('req-greater-zero-intl').test($('radar-price-input'+idSuffix))))) {
			var params = 'productId='+productId+'&email='+email+'&condition='+condition+'&curprice='+originalPrice+'&priceStr='+price+'&expiration='+exp+'&source='+source+'&dealEmails='+dealEmails;
			var radarReq = new Request({
				url: '/radar/price/create',
				method: 'get',
				data: params,
				onSuccess: function(response) {
					var responseJson = JSON.parse(response);
					if (responseJson.error) {
						//alert("error");
					} else {
						togglePriceRadar();
						var saveUrl = "/personal/module/add/favoriteproducts"+
							"?ptitle="+ptitle
							+"&price="+originalPrice
							+"&annot="+pname
							+"&adnode="+adnode;
						populateToolbar(saveUrl,$('favoriteproducts').getPosition().x);
					}
				},
				onFailure: function() {
				}
			});
			radarReq.send();
		} else {
			$('radar-price-error'+idSuffix).style.display = 'block';
		}
	} else {
		$('radar-email-error'+idSuffix).style.display = 'block';
	}
}

function saveSearchAlert(search,filter,node,popFavs,idSuffix) {
	var form = $('search-alert-form');
	form.elements['email'].value = $('radar-email-input'+idSuffix).value;
	form.elements['source'].value = $('radar-source'+idSuffix).value;
	form.elements['freq'].value = "DAY";
	form.elements['exp'].value = "12";
	
	if (Form.Validator.getValidator('required').test(form.elements['email']) && Form.Validator.getValidator('validate-email').test(form.elements['email'])) {
		var popup = $('searchAlertPopup_1');
		$('search-alert-form').set('send',{
			onComplete:function(response){
				popup.set('html',response);
				if (popFavs != "false") {
					saveSearchForm();
				}
				toggleRadar();
			}
		});
		$('search-alert-form').send();
	} else {
		$('radar-email-error'+idSuffix).style.display = 'block';
	}
	return false;
}

function savePriceAlert(chan,productId,pName,price,ptitle,node,idSuffix) {
	var paId = 'priceAlertPopup_1';
	var paUrl = '/serv/'+chan+'/buyer/PriceAlertAjaxForm.jsp?'+
	'productId='+productId+
	'&productName='+pName+
	'&lowestPrice='+price+
	'&price='+price+
	'&ptitle='+ptitle+
	'&node='+node+
	'&userPrefill=true&rebrand=y&popId=1';
	
	var myRequest = new Request.HTML({url: paUrl, 
		onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
			$(paId).set('html',responseHTML);
			var paForm = $('price-alert-form');
			if(!paForm) {
				return;
			}
			
			var ptitle = "";
			if (paForm.elements['ptitle']) {
				ptitle = paForm.elements['ptitle'].value;
				var curPrice = paForm.elements['curprice'].value;
				var pName = encodeURIComponent(paForm.elements['pname'].value);
				var adnode = paForm.elements['adnode'].value;
			}
			
			paForm.elements['email'].value = $('radar-email-input'+idSuffix).value;
			paForm.elements['source'].value = $('radar-source'+idSuffix).value;
			if (Form.Validator.getValidator('required').test(paForm.elements['email']) && Form.Validator.getValidator('validate-email').test(paForm.elements['email'])) {
				var postUrl = 'usePopup=true&cmd='+paForm.elements['cmd'].value+
				'&productId='+paForm.elements['productId'].value+
				'&channelId='+paForm.elements['channelId'].value+
				'&expiration='+encodeURIComponent(paForm.elements['expiration'].value)+
				'&email='+encodeURIComponent(paForm.elements['email'].value)+
				'&priceStr='+paForm.elements['priceStr'].value+
				'&condition='+paForm.elements['condition'].value+
				'&source='+paForm.elements['source'].value;

				// must use this instead of Form.Request because of IE
				new Request.HTML({
					url: paForm.action,
					method: 'post',
					onSuccess:function(responseTree, responseElements, responseHTML, responseJavaScript) {
						$(paId).set('html',responseHTML);
						if (ptitle != "") {
							var saveUrl = "/personal/module/add/favoriteproducts"+
								"?ptitle="+ptitle
								+"&price="+curPrice
								+"&annot="+pName
								+"&adnode="+adnode;
							populateToolbar(saveUrl,$('favoriteproducts').getPosition().x);
						}
					},
					onFailure:function() {
					},
					onComplete:function() {
						if ($('radar-row')) {
							$('radar-row').style.display='none';
							$('radar-row-success').style.display='table-row';
						}
						hideLbTimeout();
						lbShown = true;
						clearLBTimeout();
					}
				}).send(postUrl);
				new Form.Request(paForm,$('priceAlertPopup_1')).send();
			} else {
				$('radar-email-error'+idSuffix).style.display = 'block';
			}
	}});
	myRequest.post();
	
	return false;
}

function saveSearchForm() {
	form = $('search-save-form');
	
	if (form && form.elements['alias']) {
		var saveUrl = "/personal/module/add/favoritesearches?search="+
			form.elements['search'].value+
			"&alias="+encodeURIComponent(form.elements['alias'].value)+
			"&fsfilter="+form.elements['fsfilter'].value+
			"&adnode="+form.elements['adnode'].value;

		new Form.Request(form,$('searchSavePopup_1'),{onComplete:function() {
			populateToolbar(saveUrl,$('favoritesearches').getPosition().x);
		}}).send();
	}
	return false;
}

function showAtlPriceAlert(chan,popId,productId,pName,price,ptitle,node) {
	var popPrefix = 'atlPop_';
	var atlPopId = popPrefix+popId;
	if ($(atlPopId).getStyle('visibility') == 'visible') {
		$(atlPopId).fade('out');
	}
	showAtlPriceAlert1(chan,popPrefix,popId,productId,pName,price,ptitle,node,"lform")
}

function showAtlPriceAlert1(chan,popPrefix,popId,productId,pName,price,ptitle,node,src) {
	var atlPopId = popPrefix+popId;
	return showAtlPriceAlertHelper(chan,$(atlPopId),productId,pName,price,ptitle,node,src);
}

function showAtlPriceAlertHelper(chan,elem,productId,pName,price,ptitle,node,src,uid) {
	var paId = 'priceAlertPopup_1';
	var paUrl = '/serv/'+chan+'/buyer/PriceAlertAjaxForm.jsp?'+
	'productId='+productId+
	'&productName='+pName+
	'&lowestPrice='+price+
	'&price='+price+
	'&ptitle='+ptitle+
	'&node='+node+
	'&src='+src+
	'&userPrefill=true&rebrand=y&popId=1';
	var myRequest = new Request.HTML({url: paUrl, 
		onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {
			$(paId).set('html',responseHTML);
			if ($('price-alert-form')) {
				var pavalid = new Form.Validator.Inline($('price-alert-form'), {
					scrollToErrorsOnSubmit: false,
					stopOnFailure: true,
					useTitles: true,
					onFormValidate: function(isValid,paForm,submitEvent) {
						if (isValid&&submitEvent) {
							var postUrl = 'usePopup=true&cmd='+paForm.elements['cmd'].value+
							'&productId='+paForm.elements['productId'].value+
							'&channelId='+paForm.elements['channelId'].value+
							'&expiration='+encodeURIComponent(paForm.elements['expiration'].value)+
							'&email='+encodeURIComponent(paForm.elements['email'].value)+
							'&priceStr='+paForm.elements['priceStr'].value+
							'&condition='+paForm.elements['condition'].value+
							'&source='+paForm.elements['source'].value+
							'&curprice='+paForm.elements['curprice'].value;
							if (paForm.elements['wantsEmail'] && paForm.elements['wantsEmail'].checked) {
								postUrl += "&wantsEmail=true";
							}
							submitEvent.stop();
							var paFormCon = $('paFormCon');
							var paddingY = paFormCon.getSize().y/2-16;
							var paddingX = paFormCon.getSize().x/2-16;
							paFormCon.set('html','<div style=\"padding:'+paddingY+'px '+paddingX+'px;\"><img src="/images/loading.gif"/></div>');

							// must use this instead of Form.Request because of IE
							new Request.HTML({
								url: paForm.action,
								method: 'post',
								onSuccess:function(responseTree, responseElements, responseHTML, responseJavaScript) {

									$(paId).set('html',responseHTML);
									var saveUrl = "/personal/module/add/favoriteproducts"+
										"?ptitle="+ptitle
										+"&price="+price
										+"&annot="+encodeURIComponent(pName)
										+"&adnode="+node;
									populateToolbar(saveUrl,$('favoriteproducts').getPosition().x);
								},
								onFailure:function() {
								},
								onComplete:function() {
								}
							}).send(postUrl);
						}
					}
				});
			}
			if(uid == 'tumradar'){
				RadarPopup($(paId),elem,1);
			}else{
			showRbPopup($(paId),elem,1);
			}
	}});
	myRequest.post();
	return false;
}

function reloadFave(popId,gourl) {
	$('saveContainer'+popId).load(gourl);
}

Form.Validator.add('req-greater-zero', {
	errorMsg: 'Value must be positive',
	test: function(element){
		return Form.Validator.getValidator("required").test(element) &&
		Form.Validator.getValidator("validate-currency-dollar").test(element) &&
		element.value != 0 &&
		(/^\d+/).test(element.get("value"));
	}
});

Form.Validator.add('req-greater-zero-intl', {
	errorMsg: 'Value must be positive',
	test: function(element){
		return Form.Validator.getValidator("required").test(element) &&
		(Form.Validator.getValidator('IsEmpty').test(element) || 
		(/^([1-9]{1}[0-9]{0,2}(\.[0-9]{3})*(\,[0-9]{0,2})?|[1-9]{1}\d*(\,[0-9]{0,2})?|0(\,[0-9]{0,2})?|(\,[0-9]{1,2})?)$/).test(element.get('value')))
		element.value != 0 &&
		(/^\d+/).test(element.get("value"));
	}
});

function setToMaxLength(obj) {
	var mLength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : "";
	if (obj.getAttribute && obj.value.length > mLength)
		obj.value = obj.value.substring(0, mLength);
}


var lbto;
var lbShown = false;
var merchTO = false;
function clearLBTimeout() {
	clearTimeout(lbto);
	if (typeof PRadar !== "undefined") {
		PRadar.clearTimedLB();
	}
	if (typeof SRadar !== "undefined") {
		SRadar.clearTimedLB();
	}
}
function hideLb(id) {
	if (!id) id = '';
	if ($('radar-lightbox-background'+id)) {
		$('radar-lightbox-background'+id).style.display = 'none';
	}
	if ($('radar-lightbox-content'+id)) {
		$('radar-lightbox-content'+id).style.display = 'none';
	}
}
function showLb(id, overrideSuppress) {
	if (!overrideSuppress) overrideSuppress = false;
	if(getCookie('suppressLightbox') && !overrideSuppress) {
		return;
	}
	if(overrideSuppress) {
		if($('radar-text-suppressLB')) {
			$('radar-text-suppressLB').style.display = 'none';
		}
		if($('radar-text-suppressLB-top')) {
			$('radar-text-suppressLB-top').style.display = 'none';
		}
		if($('radar-text-suppressLB-fb')) {
			$('radar-text-suppressLB-fb').style.display = 'none';
		}
	}
	if (!id) id = '';
	clearLBTimeout();
	lbShown = true;
	$('radar-lightbox-background'+id).style.width = (document.getScrollSize().x - 1) + 'px';
	$('radar-lightbox-background'+id).style.height = (document.getScrollSize().y - 1) + 'px';
	$('radar-lightbox-background'+id).style.display='block';
	$('radar-lightbox-content'+id).style.display='block';
	$('radar-lightbox-background'+id).style.width = document.getScrollSize().x + 'px';
	$('radar-lightbox-background'+id).style.height = document.getScrollSize().y + 'px';
	setSessionImpressionCount();
	setGlobalImpressionCount();
}

function onProductReviewRatingClick2(rowid) {
    for ( var i = 0; i < allProductReviewSummaryPopups.length; i++) {
        id = allProductReviewSummaryPopups[i];
        if (id != rowid) {
            hideElement("product-reviews-summary-id-" + id);
            hideElement("product-reviews-summary-id-container-" + id);
        }
    }

    var popupId1 = "product-reviews-summary-id-container-"+ rowid;
    var popupId2 = "product-reviews-summary-id-"+ rowid;
    if (isHiden(popupId1)) {
        showElement(popupId1);
        showElement(popupId2);
        var e1 = document.getElementById(popupId1);
        if (e1) {
            if (rowid=='-1') {
            	var id = "prs-capsule-id-" + rowid;
                if (!$(id)) return;
                var pos = $(id).getPosition();
                if (navigator.appVersion.indexOf("MSIE 7")>0) {
                	var pos = $(id).getPosition();
                	e1.style.left =  (pos.x-17)+"px";
                    e1.style.top  =  (pos.y-20)+"px";
                } else {
                	e1.style.left = "51px";
                    e1.style.top =  "-34px";
                }
            } else {
                var id = "prs-capsule-id-" + rowid;
                if (!$(id)) return;
                var pos = $(id).getPosition();
                e1.style.left = (pos.x-17)+"px";
                e1.style.top =  (pos.y-20)+"px";
            }
        }
    } else {
    	var reviewElem = document.getElementById("product-reviews-"+rowid);
    	if (reviewElem != null) {
    			document.getElementById("product-details-"+rowid).style.display = "none";
    			document.getElementById("product-reviews-"+rowid).style.display = "block";
    			document.getElementById("product-mlt-"+rowid).style.display = "none";
    	}
        hideElement(popupId1);
        hideElement(popupId2);
    }
    var reviewElem = document.getElementById("product-reviews-"+rowid);
	if (reviewElem != null) {
		var isDisplay = reviewElem.style.display;
		if (isDisplay == "block") {
			document.getElementById("wizeReview"+rowid).className = "wizepopupTab current";
			document.getElementById("specReview"+rowid).className = "wizepopupTab";
			document.getElementById("mltReview"+rowid).className = "wizepopupTab";
		}
		
		var elemName = document.getElementById("product-reviews-summary-id-container-"+rowid);
	    var elid = "opPNLink_" + rowid;
	    var pos = $(elid).getPosition();
	    elemName.style.left =  (pos.x)+"px";
	    elemName.style.top =  (pos.y-73)+"px";
	}
}

currentPRSPopupRowId = -1;
var allProductReviewSummaries = new Array();
function onProductReviewRatingClick3(rowid) {
    if (rowid==undefined) rowid=currentPRSPopupRowId;
    var popupId1 = "prs-view-container";
    var popupId2 = "prs-view-box";
    if (isHiden(popupId1) || (currentPRSPopupRowId!=rowid)) {
        // populate content
        var prs = allProductReviewSummaries[rowid];
        if (prs!=null) populatePRSView(prs, rowid);
        
        showElement(popupId1);
        showElement(popupId2);
        var e1 = document.getElementById(popupId1);
        if (e1) {
            if (rowid=='-1') {
                var id = "prs-capsule-id-" + rowid;
                if (!$(id)) return;
                var pos = $(id).getPosition();
                if (navigator.appVersion.indexOf("MSIE 7")>0) {
                    var pos = $(id).getPosition();
                    e1.style.left =  (pos.x-17)+"px";
                    e1.style.top  =  (pos.y-20)+"px";
                } else {
                    e1.style.left = "51px";
                    e1.style.top =  "-34px";
                }
            } else {
                var id = "prs-capsule-id-" + rowid;
                if (!$(id)) return;
                var pos = $(id).getPosition();
                e1.style.left = (pos.x-17)+"px";
                e1.style.top =  (pos.y-20)+"px";
            }
        }
        currentPRSPopupRowId = rowid;
    } else {
        hideElement(popupId1);
        hideElement(popupId2);
        currentPRSPopupRowId = -1;
    }
}

function renderWizeReview(rowid, googleAnalyticsEnabled)
{
	if (document.getElementById("product-details-"+rowid) != null) {
		document.getElementById("product-details-"+rowid).style.display = "none";
		document.getElementById("product-reviews-"+rowid).style.display = "block";
		document.getElementById("product-mlt-"+rowid).style.display = "none";
	}
	onProductReviewRatingClick2(rowid);
	var elemName = document.getElementById("product-reviews-summary-id-container-"+rowid);
	if (elemName != null) {
	    var elid = "opPNLink_" + rowid;
	    var pos = $(elid).getPosition();
	    elemName.style.left =  (pos.x)+"px";
	    if (document.getElementById("product-details-"+rowid) == null) {
	    	elemName.style.top =  (pos.y+33)+"px";
	    } else {
		    elemName.style.top =  (pos.y-114)+"px";
		    
		    var beak = document.getElementById("wizepopupBeak_"+rowid);
		    beak.style.top =  "134px";
	    }
	}
	if (googleAnalyticsEnabled == 'true' || googleAnalyticsEnabled == true) {
		googleAnalyticsTracking("/ps/pages/Wize-Search.html","WizeBottomLinetab", "Wize");
    }
}
function renderWizeReviewLayout(rowid, wide, googleAnalyticsEnabled)
{
	onProductReviewRatingClick2(rowid);
	var elemName = document.getElementById("product-reviews-summary-id-container-"+rowid);
	var pos = $("prs-capsule-id-" + rowid).getPosition();
	elemName.style.left =  (pos.x)+"px";
	var beak = document.getElementById("wizepopupBeak_"+rowid);
	if (wide == true){
		elemName.style.top =  (pos.y-124)+"px";
		beak.style.top =  "125px";
	}
	else{
		elemName.style.top =  (pos.y-144)+"px";
		beak.style.top =  "141px";
	}
	if (googleAnalyticsEnabled == 'true' || googleAnalyticsEnabled == true) {
		googleAnalyticsTracking("/ps/pages/Wize-Search.html","WizeTab", "Wize");
    }
}
function renderSpecReview(rowid, googleAnalyticsEnabled)
{
	onProductReviewRatingClick2(rowid);
	if (document.getElementById("product-details-"+rowid) != null) {
		document.getElementById("product-details-"+rowid).style.display = "block";
		document.getElementById("specReview"+rowid).className = "wizepopupTab current";
	}
	if (document.getElementById("product-reviews-"+rowid) != null) {
		document.getElementById("product-reviews-"+rowid).style.display = "none";
		document.getElementById("wizeReview"+rowid).className = "wizepopupTab";
	}
	if (document.getElementById("product-mlt-"+rowid) != null) {
		document.getElementById("product-mlt-"+rowid).style.display = "none";
		document.getElementById("mltReview"+rowid).className = "wizepopupTab";
	}
	var elemName = document.getElementById("product-reviews-summary-id-container-"+rowid);
    var elid = "more-link-" + rowid;
    var pos = $(elid).getPosition();
    if (elemName != null) {
    	elemName.style.left =  (pos.x+60)+"px";
    	elemName.style.top =  (pos.y-47)+"px";
    	var beak = document.getElementById("wizepopupBeak_"+rowid);
        beak.style.top =  "43px";
    }
    if (googleAnalyticsEnabled == 'true' || googleAnalyticsEnabled == true) {
    	googleAnalyticsTracking("/ps/pages/Wize-Search.html","SpecTab", "Wize");
    }
}
function showWizeAtlPop(elem, rowid, topHeight, googleAnalyticsEnabled){
	showWizeSavePop(elem);
    var elemName = document.getElementById("atlPop_"+rowid);
    var elid = "saveContainerPP-" + rowid;
    var pos = $(elid).getPosition();
    if (elemName != null) {
    	elemName.style.left =  "0px";
    	elemName.style.top =  topHeight+"px";
    }
    if (googleAnalyticsEnabled == 'true' || googleAnalyticsEnabled == true) {
    	googleAnalyticsTracking("/ps/pages/Wize-Search.html","SavePopup", "Wize");
    }
}

function showMatchMakerInfoPopup(elem) {
	var popup = $('aboutMatchMaker1');
	showRbPopup(popup,elem);
	var elemName = document.getElementById("aboutMatchMaker1");
	var elid = "matchmakerHelp";
    if (elemName != null) {
    	elemName.style.left =  "233px";
    	elemName.style.top =  "240px";
    }
}
function showWizeSavePop(elem,noHover){
	var popId = elem.id.replace("atlLink_","");
	popId = 'atlPop_'+popId;
	var popup = $(popId);
	if (popup&&elem) {
		elem = document.id(elem.id);	// for IE		
		popup.fade('in');
		
		if (!noHover) {
			var t;
			elem.addEvent('mouseleave',function(e) {
				if (popup.getStyle('opacity')==1) {
					t = setTimeout(function(){popup.fade('out')},1000);
				}
			});
			popup.addEvent('mouseenter',function(e) {
				clearTimeout(t);
			});
			popup.addEvent('mouseleave',function(e) {
				popup.fade('out');
			});
		}
	}
}

function setZoomLightBoxPosition(rowid, posTitle, similar, isGridView, isNorm) {
	var popupPos;
	if(posTitle) {
		var element;
		if(isGridView) {
			element='g-opTitleLink_';
		} else {
			if(similar) 
				element='opPNLinkRI_';
			else 
				element='opPNLink_';
		}
	    popupPos = $(element+rowid).getPosition();
	    popupPos.y+=20;
    }
    else {
    	var viewPortDim = getViewPortSize();
    	var scrollStats = getDocumentScroll();
    	if(isGridView) {
    		popupPos = new Object();
    		popupPos.x=(viewPortDim.x*0.3)+scrollStats.x;
    		popupPos.y=(viewPortDim.y*0.15)+scrollStats.y;
    	} else {
    		popupPos = new Object();
    		var pointer = $('zoom-img-pointer');
    		
    		var element = $('opILink_'+rowid);
    		var elemPos = element.getPosition();
    		
    		var ySeek = elemPos.y;
    		ySeek=ySeek-scrollStats.y;
    		var ySeekVP = viewPortDim.y;
    		
    		var popupYOffSet = 0;
    		var pointerYOffSet = 0;
    		if(ySeek < (ySeekVP/3)) {
    			popupYOffSet = -20;
    		} else if((ySeek < ((2*ySeekVP)/3)) && (ySeek > (ySeekVP/3))) {
    			popupYOffSet  = -200;
    		} else if(ySeek > ((2*ySeekVP)/3)) {
    			popupYOffSet = -360;
    		}
    		
    		pointerYOffSet = (-1*popupYOffSet)-10;
    		pointer.style.top=pointerYOffSet+'px';
    		popupPos.x = elemPos.x+((isNorm)?95:115)+scrollStats.x;
    		popupPos.y= ySeek+popupYOffSet+scrollStats.y;
    	}
    }
	
	$('zoom-img-content').setPosition(popupPos);
}

function hideZoomLightBox(event, showOnHover) {
	var zoomContent = $('zoom-img-content');
	if(showOnHover) {
		var e = event.toElement || event.relatedTarget;
		while(e.parentNode!=null) {
			if (e.parentNode.id == zoomContent.id || e.id == zoomContent.id) {
				return;
			}
			e = e.parentNode;
		}
	}
	
	if ($('zoom-img-bkg')) {
		$('zoom-img-bkg').style.display = 'none';
	}
	
	if (zoomContent) {
		zoomContent.morph({
			'opacity': 0
		});
	}
	
	if($('slideshow-container')) {
		$('slideshow-container').style.visibility= 'hidden';
	}
}

function hideOpenCouponsDealsBoxes() {
	var promoPopup = null;
	var i = 0;
	for(i=0;i<30;i++) {
		promoPopup = $('promoPopup_'+i);
		if(promoPopup!=null) {
			if(promoPopup.style.visibility=="visible") {
				promoPopup.style.visibility="hidden";
			}				
		}
	}
}

function hideZoomLightBoxWithSelfCheck(e) {
	if (!e) var e = window.event || event;
	if ($('zoom-img-bkg')) {
		$('zoom-img-bkg').style.display = 'none';
	}
	var element = document.elementFromPoint(e.clientX, e.clientY);
	var elementId = element.id.toString();
	console.log(elementId);
	if(elementId.indexOf("zoomLens")>=0) {
		element.onclick.apply(element);
		$('zoom-img-bkg').style.display='block';
	} else if ((elementId.indexOf("opBLink")>=0) ||
			(elementId.indexOf("opTitleLink")>=0) ||
			(elementId.indexOf("opPNLink")>=0) ||
			(elementId.indexOf("opILink")>=0) ||
			((element.tagName.toString().toUpperCase().indexOf("A")>=0) && (elementId.length<1) && ((element.parentNode.tagName.toString().toUpperCase().indexOf("DIV")>=0) && (element.parentNode.id.length<1)) && (element.parentNode.parentNode.className.toString().indexOf("button-cell")>=0)) ||
			((element.tagName.toString().toUpperCase().indexOf("IMG")>=0) && (element.parentNode.parentNode.parentNode.id.toString().indexOf("opILink")>=0)) ||
			(((element.parentNode.id.toString().indexOf("opTitleLink")>=0) || (element.parentNode.id.toString().indexOf("opPNLink")>=0)) && (element.tagName.toString().toUpperCase().indexOf("B")>=0)) ||
			((element.className.toString().indexOf("underline")>=0) && (element.tagName.toString().toUpperCase().indexOf("A")>=0)) ||
			(((element.parentNode.id.toString().indexOf("featuredSeller")>=0) && (element.tagName.toString().toUpperCase().indexOf("SPAN")>=0) || (element.tagName.toString().toUpperCase().indexOf("IMG")>=0)))){
		element.click();
		$('zoom-img-bkg').style.display='block';
	} else {
		hideZoomLightBox();
	}
}

function zoomLightBoxSetContent(rowid, contentHtml, 
		showRibbon, showProductTitle, showSellerInfo, showClickInfo, isNorm, 
		popW, popH, contW, contH, hideLensOnClose, posWithTitle, isSimilar, isFixed, isGridView, lensType, isGAEnabled, showOnHover) {

	setZoomLightBoxPosition(rowid, posWithTitle, isSimilar, isGridView, isNorm);
	
	var container = $('slideshow-container');
		container.innerHTML=contentHtml;
	var thumb = $('thumb-container');
		thumb.innerHTML="";
	var images = container.getElements('img');
	var currentIndex = 0;
	var toc = [];
	var showThumbView = showRibbon;
	var tocActive = 'toc-active';
	var thumbOpacity = 0.6;
	$('zoom-img-content').setStyle('width',popW+'px');
	var isMSIE7 = navigator.userAgent.indexOf("MSIE 7.0")>0;
	
	if(showSellerInfo || showClickInfo) {
		popW=popW+100;
	}
	
	if(showProductTitle) {
		if(isNorm) {
			if(isSimilar)
				$('zoom-product-title').set('html',$('opPNLinkRI_'+rowid).outerHTML);
			else
				$('zoom-product-title').set('html',$('opPNLink_'+rowid).outerHTML);
			if(isGAEnabled){
				var zoomptitleLink = getElementsByIdStartsWith('zoom-product-title', 'a', 'opPNLink')[0];
				if(zoomptitleLink != null)
				zoomptitleLink.setAttribute("onclick",'googleAnalyticsTracking ("Xlarge PopupBox Clicks","clickout","PopUp Ptitle")');
			}
		} else {
			if(isSimilar)
				$('zoom-product-title').set('html',$('opPNLinkRI_'+rowid).innerHTML);
			else
				$('zoom-product-title').set('html',$('opPNLink_'+rowid).innerHTML);	
			
			if(isGAEnabled){
				var zoomptitleLink = getElementsByIdStartsWith('zoom-product-title', 'a', 'opTitleLink')[0];
				if(zoomptitleLink != null)
				zoomptitleLink.setAttribute("onclick",'googleAnalyticsTracking ("Xlarge PopupBox Clicks","clickout","PopUp Ptitle")');
			}
		}
	}
	
	if(showSellerInfo) {
		$('zoom-seller-info').set('html',$('op-product-sellerinfo-id-'+rowid).innerHTML);
		var promoLinks = getElementsByIdStartsWith('zoom-seller-info','a','promoPopupLink_');
		var promoPopups = getElementsByIdStartsWith('zoom-seller-info','div','promoPopup_');
		if(isMSIE7) {
			if(promoLinks!=null && promoLinks.length>0) {
				var promoLink1 = promoLinks[0];
				promoLink1.parentNode.removeChild(promoLink1);
			}
			
			if(promoPopups!=null && promoPopups.length>0) {
				var promoPopup1 = promoPopups[0];
				promoPopup1.parentNode.removeChild(promoPopup1);
			}
		} else {
			if((promoLinks!=null && promoLinks.length>0) && (promoPopups!=null && promoPopups.length>0)) {
				var promoLink = promoLinks[0];
				var promoLinkId = "";
				var promoLinkIdNumsIndex = promoLink.id.indexOf('_');
				var promoLinkIdLen = promoLink.id.length;
				var i = 0;
				for(i=promoLinkIdNumsIndex+1;i<promoLinkIdLen;i++) {
					promoLinkId+=promoLink.id[i];
				}
				promoLinkId+="001";
				promoLink.id+="001";
				var promoPopup = promoPopups[0];
				promoPopup.id+="001";
				promoLink.setAttribute("onclick","");
				promoLink.setAttribute("onclick","toggleXLPromoPopup('"+promoLinkId.toString()+"')");				
				
				var promoPopupContents = getElementsByIdStartsWith('zoom-seller-info','div','promo-popup-');
				var promoPopupContentsLen = promoPopupContents.length;
				i=0;
				for(i=0;i<promoPopupContentsLen;i++) {
					promoPopupContents[i].id+='001';
				}
				var promoSellerContents = getElementsByIdStartsWith('zoom-seller-info','div','seller-popup-');
				var promoSellerContentsLen = promoSellerContents.length;
				i=0;
				for(i=0;i<promoSellerContentsLen;i++) {
					promoSellerContents[i].id+='001';
				}
				var promoPopupTab = $('promo-popup-tab-'+promoLinkId);
				if(promoPopupTab!=null) {
					promoPopupTab.setAttribute("onclick","");
					promoPopupTab.setAttribute("onclick", "toggleContent('promo', '"+promoLinkId.toString()+"')");
				}
				var sellerPopupTab = $('seller-popup-tab-'+promoLinkId);
				if(sellerPopupTab!=null) {
					sellerPopupTab.setAttribute("onclick","");
					sellerPopupTab.setAttribute("onclick","toggleContent('seller', '"+promoLinkId.toString()+"')");
				}
				var closePromoPopupArr = getElementsByIdStartsWith('zoom-seller-info','a','closePromoPopup');
				if(closePromoPopupArr!=null && closePromoPopupArr.length>0) {
					var closePromoPopup = closePromoPopupArr[0];
					closePromoPopup.id+='001';
					closePromoPopup.setAttribute("onclick","");
					closePromoPopup.setAttribute("onclick","hideXLPromoPopup('"+promoLinkId.toString()+"')");
				}
				
				promoPopup.style.display='none';
			}
		}

		if(!isNorm){
			if(isGAEnabled){
				var zoomSellerInfoLink = getElementsByIdStartsWith('zoom-seller-info', 'a', 'featuredSeller_')[0];
				if(zoomSellerInfoLink != null)
					zoomSellerInfoLink.setAttribute("onclick",'googleAnalyticsTracking ("Xlarge PopupBox Clicks","clickout","PopUp SellerInfo")')
			}
		}	
	}
	
	if(showClickInfo) {
		$('zoom-click-cell-info').set('html',$('op-product-prices-id-'+rowid).innerHTML);
		if(isGAEnabled){
			var zoomPriceText  = getElementsByIdStartsWith('zoom-click-cell-info', 'div', 'opPriceLink_')[0];
			if(zoomPriceText != null)
				zoomPriceText.setAttribute("onclick",'googleAnalyticsTracking ("Xlarge PopupBox Clicks","clickout","PopUp Price Text")')
			var zoomPriceButtonLink = getElementsByIdStartsWith('zoom-click-cell-info', 'a', 'opBLink_')[0];
			if(zoomPriceButtonLink != null)
				zoomPriceButtonLink.setAttribute("onclick",'googleAnalyticsTracking ("Xlarge PopupBox Clicks","clickout","PopUp Price Click Button")')
		}
	}
	
	if(images.length<2) {
		showThumbView = false;
		popW-=100;
		$('zoom-img-content').setStyle('width',popW+'px');
	}
	
	if(showThumbView){
		var show = function(to) {
			images[currentIndex].fade('out');
			toc[currentIndex].removeClass(tocActive).fade(thumbOpacity);
			images[currentIndex = ($defined(to) ? to : (currentIndex < images.length - 1 ? currentIndex+1 : 0))].fade('in');
			toc[currentIndex].addClass(tocActive).fade(1);
		};
		
		var preview = new Element('div',{
			id: 'slideshow-container-controls-',
			'class': 'slideshow-container-controls'
		}).inject(thumb, 'inside');
		
		images.each(function(img,i) {
			toc.push(new Element('img',{
				src: img.get('src'),
				title: img.get('alt'),
				styles: {opacity: thumbOpacity},
				onerror: img.get('onerror'),
				events: {
				        load: function(e){      
				        						var sz = images[i].getSize();
				        						var reSize = resizeXLargeImg(sz,contW,contH);
				        	                    images[i].width=reSize.x;
				        	                    images[i].height=reSize.y;
				                                images[i].setStyle('padding-top',(contH-sz.y)/2);
				                                images[i].setStyle('padding-left',(contW-sz.x)/2);
				                                if(i==0) {
				                                	show(i);
				                                }
				                        },
				        click: function(e){
				        						show(i);
				                                var sz = images[i].getSize();
				                                images[i].setStyle('padding-top',(contH-sz.y)/2);
				                                images[i].setStyle('padding-left',(contW-sz.x)/2);
				                        },
				        mouseenter: function() { 
				        	this.fade(1);
				        },
				        mouseleave: function() { 
				        	if(!this.hasClass(tocActive)) {
				        		this.fade(thumbOpacity);
				        	}
				        }
				}
			}).inject(preview));
			
			if(i > 0) {
				img.set('opacity',0);
			}
		});
		thumb.setStyle('display','block');
	}
	else {
		thumb.setStyle('display','none');
		images[0].onload = function() {
			var sz = images[0].getSize();
			var reSize = resizeXLargeImg(sz,contW,contH);
			images[0].width=reSize.x;
			images[0].height=reSize.y;
			images[0].setStyle('padding-top',(contH-reSize.y)/2);
			images[0].setStyle('padding-left',(contW-reSize.x)/2);
			container.style.visibility='visible';
		}
	}
	
	hideOpenCouponsDealsBoxes();
	$('zoom-img-bkg').style.display='block';
	$('zoom-img-content').style.display='block';
	$('zoom-img-content').morph({
		'opacity': 1
	});
	
	var rownumber = "row-"+rowid;
	if(isGAEnabled){
		if(isGridView){
			_gaq.push(['_trackEvent', 'XLarge Image Data', 'Grid View '+lensType, rownumber,1]);
		} else{
			_gaq.push(['_trackEvent', 'XLarge Image Data', 'List View '+lensType, rownumber,1]);
		}
	}
}

function toggleXLPromoPopup(id) {
	var popupLink = $('promoPopupLink_'+id);
	var popup = $('promoPopup_'+id);
	var popupLinkPos = popupLink.getPosition();
	var popupPos = new Object();
	//popupPos.x = popupLinkPos.x-388;
	//popupPos.y = popupLinkPos.y-385;
	popup.setPosition(popupPos);
	//popup.style.position='relative';
	toggleContent('promo', id);
	popup.style.display='block';
	popup.style.visibility='visible';
}

function hideXLPromoPopup(id) {
	var popup = $('promoPopup_'+id);
	popup.style.display='none';
	popup.style.visibility='hidden';
}

function resizeXLargeImg(currSize, maxW, maxH) {
	if(currSize.x<=maxW && currSize.y<=maxH) {
		return currSize;
	}
	
	var reSizeX = currSize.x;
	var reSizeY = currSize.y;
	var ratio=reSizeX/reSizeY;
	if(ratio<1) {
		reSizeY=maxH;
		reSizeX=reSizeY*ratio;
	} else if(ratio>1){
		reSizeX=maxW;
		reSizeY=reSizeX/ratio;
	} else if(ratio==1) {
		reSizeX=maxW;
		reSizeY=maxH;
	}
	currSize.x=reSizeX;
	currSize.y=reSizeY;
	return currSize;
}

function morphZoomLensOutGrid(rowid) {
	$('zoomLensg-'+rowid).morph({
		'opacity': 0
	});
}

function morphZoomLensInGrid(rowid) {
	$('zoomLensg-'+rowid).morph({
		'opacity': 1
	});
}

function morphZoomLensOutRow(rowid) {
	$('zoomLensr-'+rowid).morph({
		'opacity': 0
	});
}

function morphZoomLensInRow(rowid,isGrid) {
	$('zoomLensr-'+rowid).morph({
		'opacity': 1
	});
}

function addEventsToModelAttrs(attrid) {	
	var dropDownLeft = $('attribute-name-'+attrid).getWidth();
	$('dropmenu-'+attrid).setStyle('margin-left',dropDownLeft+'px');
	
	var liElements = $('dropmenu-'+attrid).getElementsByTagName('li');
	if(liElements.length>2) {
		var dropDownTop = $('dropdownmenu-'+attrid).getTop();
		$('dropmenu-'+attrid).setStyle('top','-100px');
	}
	
	$('dropmenu-bkg-'+attrid).addEvent('click',function(){
		$('dropmenu-'+attrid).setStyle('visibility','hidden');
		$('dropmenu-bkg-'+attrid).setStyle('display','none');
	});
	
	$('dropdownmenu-'+attrid).addEvent('click', function(){
		$('dropmenu-'+attrid).setStyle('visibility','visible');
		$('dropmenu-bkg-'+attrid).setStyle('display','block');
	});
	
	$$('dropmenu-'+attrid+' li a').addEvent('click', function(){
		var size = this.getChildren('span.first').get('text');
		var price = this.getChildren('span.last').get('text');
		$('sizeval-'+attrid).set('text',size);
		$('priceval-'+attrid).set('text',price);
		$('dropmenu-'+attrid).setStyle('display','none');
		$('dropmenu-bkg-'+attrid).setStyle('display','none');
	});
	
	var isMSIE9 = navigator.userAgent.indexOf("MSIE 9.0")>0;
	var ulWidth = $('dropmenulist-'+attrid).getWidth();
	var ulWidthExtendBy = 5;
	if(isMSIE9) {
		ulWidthExtendBy = 63;
	}
	
	$('dropmenulist-'+attrid).style.width = ulWidth+ulWidthExtendBy+'px';
}

//This sets the position of targetPosDivId with respect to getPosDivId.Adds offsetX, offsetY if provided.
function setPositionForDiv(getPosDivId, targetPosDivId, offsetX, offsetY){
  if(offsetX == null){
     offsetX = 0;
  }
  if(offsetY == null){
     offsetY = 0;
  }
  if (!$(getPosDivId)) return;
  var e1 = $(targetPosDivId);
  if (!e1) return;
  //Get position
  var pos = $(getPosDivId).getPosition();
  //set the position
  e1.style.left = (pos.x-17 + offsetX)+"px";
  e1.style.top =  (pos.y-20 + offsetY)+"px";
}
// requires NextagUtils.js and utils.js

var sTimeouts = new Array();
var sPopupGroups = new Array();
var sGroupPreShowCB = new Array();
var sGroupPostShowCB = new Array();
var sGroupPreHideCB = new Array();
var sGroupPostHideCB = new Array();
var sGroupPopupFixedPos = new Array();
var sIsDisplaying = new Array();
var sGroupUniquePopupId = new Array();
var sWindowWidth;
var sWindowHeight;

var sHideElements = new Array("select","input.checkbox");
var sBrowser = new NextagBrowser();

/**
 * PopupManager constructor parameters
 * triggerPrefix	- default 'trigLink'
 * popupPrefix		- default 'popup'
 * leftOffset			- default 0
 * topOffset			- default 0
 * showEvent      - default mouseover
 * hideEvent      - default mouseout
 * delay          - default 250
 * hideOverlay    - default true
 * allowClicks    - default false
 * flipX          - default false
 * flipY          - default false
 * preShow        - default null
 * postShow       - default null
 * preHide        - default null
 * postHide       - default null
 * showProperty   - default visibility
 * autoHide       - ???
 * discoveryFunc  - default null
 * fixedPos		  - default null
 * uniquePopupId  - default null
 * startIndex     - default 0
 */
function PopupManager(params){
	function setParamDefaults(pname, def) { if (typeof params[pname] == "undefined") { params[pname] = def; } };

	setParamDefaults("triggerPrefix","trigLink");
	setParamDefaults("trigger","trigLink");
	setParamDefaults("triggerIcon","trigLink");
	setParamDefaults("popupPrefix","popup");
	setParamDefaults("leftOffset",0);
	setParamDefaults("topOffset",0);
	setParamDefaults("showEvent","mouseover");
	setParamDefaults("hideEvent","mouseout");
	setParamDefaults("delay", 250);
	setParamDefaults("hideOverlay", true);
	setParamDefaults("allowClicks", false);
	setParamDefaults("flipX", false);
	setParamDefaults("flipY", false);
	setParamDefaults('preShow', null);
	setParamDefaults('postShow', null);
	setParamDefaults('preHide', null);
	setParamDefaults('postHide', null);
	setParamDefaults('showProperty', 'visibility');
	setParamDefaults('autoHide', true);
	setParamDefaults("rightAlign",false);
	setParamDefaults('fixedPos', null);
	setParamDefaults('uniquePopupId', null);
    setParamDefaults('startIndex', 0);

	var mGrpId = sPopupGroups.length;
	var mParams = params;
	
	this.setProperty = function(prop, value) { mParams[prop] = value; };
	this.getProperty = function(prop){ return mParams[prop]; };
	this.positionPopup = function(popup,tr,adjust,fixedPos,trIcon){
		if (!popup || !tr)
			return;
		var pos = fixedPos || tr || trIcon ;
		var top = 0;
		var left = 0;

		if (mParams['rightAlign']){
			mParams['leftOffset'] = NextagUtils.getElementWidth(tr,sBrowser) - NextagUtils.getElementWidth(popup,sBrowser);
		}

		if (!mParams['flipY']){
			//top = (NextagUtils.getPageY(pos,sBrowser) + mParams['topOffset']);
			top = (NextagUtils.getPosition(pos).y + mParams['topOffset']);
		} else {
			//top = (NextagUtils.getPageY(pos,sBrowser) + NextagUtils.getElementHeight(pos,sBrowser) + mParams['topOffset']);
			top = (NextagUtils.getPosition(pos).y + NextagUtils.getElementHeight(pos,sBrowser) + mParams['topOffset']);
		}
		if (!mParams['flipX']){
			//left = (NextagUtils.getPageX(pos,sBrowser) + mParams['leftOffset']);
			left = (NextagUtils.getPosition(pos).x + mParams['leftOffset']);
		} else {
			//left = (NextagUtils.getPageX(pos,sBrowser) + NextagUtils.getElementWidth(pos,sBrowser) + mParams['leftOffset']) ;
			left = (NextagUtils.getPosition(pos).x + NextagUtils.getElementWidth(pos,sBrowser) + mParams['leftOffset']) ;
		}
		popup.style.top = top + 'px';
		popup.style.left = left + 'px';
	};


	if (sBrowser.op)
	  return;

	sPopupGroups[sPopupGroups.length] = this;

	/** private instance methods **/
  var init = function(){
		if (!document.getElementById) {
			return false;
		}

		if( sBrowser.mac == 1 && sBrowser.ie5 == 1 ) {
			return false;
		}

		if (mParams['preShow'] != null)
			sGroupPreShowCB[mGrpId] = mParams['preShow'];
		if (mParams['postShow'] != null)
			sGroupPostShowCB[mGrpId] = mParams['postShow'];
		if (mParams['preHide'] != null)
			sGroupPreHideCB[mGrpId] = mParams['preHide'];
		if (mParams['postHide'] != null)
			sGroupPostHideCB[mGrpId] = mParams['postHide'];
		if (mParams['fixedPos'] != null )
			sGroupPopupFixedPos[mGrpId] = mParams['fixedPos'];
		if (mParams['uniquePopupId'] != null ) 
			sGroupUniquePopupId[mGrpId] = mParams['uniquePopupId'];

		var trigs = mParams['startIndex'];
		var tr = null;
		var trIcon = null;
		var paramSplitToken = '|';
		
		var uniquePopupElement = document.getElementById(sGroupUniquePopupId[mGrpId]);
		while ((tr = document.getElementById(mParams['triggerPrefix'] + '_' + trigs)) ||
				(tr = document.getElementById(mParams['trigger']))) {
			trIcon = document.getElementById(mParams['triggerIcon']+ '_' + trigs);
			var popup = uniquePopupElement ? uniquePopupElement :
				document.getElementById(mParams['popupPrefix'] + '_' + trigs);
			if (popup == null)
				break;

			var fixedPos = document.getElementById(mParams['fixedPos']);

			if (mParams['showEvent'] == 'click' && mParams['hideEvent'] == 'click'){
				NextagUtils.addEvent(tr, 'click', funcShowNow(popup.id,trigs), true);
				if (mParams['allowClicks']) {
					NextagUtils.addEvent(popup, 'click', funcShowNow(popup.id,trigs), true);
					NextagUtils.addEvent(document, 'click', funcHide(popup.id), true);
				}
			} else if (mParams['showEvent'] == 'click' && mParams['hideEvent'] != 'click'){
				NextagUtils.addEvent(tr, 'click', funcClickShow(popup.id,trigs));
				NextagUtils.addEvent(popup, 'mouseover', funcClickShow(popup.id,trigs));
				var hideEvents = mParams['hideEvent'].split(paramSplitToken);
				for(var i = 0; i < hideEvents.length; i++) {	
					var hideEventType = hideEvents[i];		
					if ( hideEventType == 'click') {
						NextagUtils.addEvent(document, 'click', funcClickHide(popup.id), true)
					} else if (hideEventType.indexOf('element#.')==0){
						var heId = hideEventType.replace('element#.','');
						var hes = heId.split(',');
						for (var h=0; h<hes.length; h++){
							var he = document.getElementById(hes[h]+"_"+trigs);
							if (he){NextagUtils.addEvent(he, 'click', funcClickHide(popup.id));}
						}
					} else if (hideEventType.indexOf('element.')==0) {
						var heId = hideEventType.replace('element.','');
						var hes = heId.split(',');
						for (var h=0; h<hes.length; h++){
							var he = document.getElementById(hes[h]);
							if (he){NextagUtils.addEvent(he, 'click', funcClickHide(popup.id));}
						}
					} else {
						NextagUtils.addEvent(tr, hideEventType, funcHide(popup.id));
						NextagUtils.addEvent(popup, hideEventType, funcHide(popup.id));
					}
				}
			} else {
				NextagUtils.addEvent(tr, mParams['showEvent'], funcShow(popup.id,trigs), true);
				NextagUtils.addEvent(popup, mParams['showEvent'], funcShow(popup.id,trigs), true);
				var hideEvents = mParams['hideEvent'].split(paramSplitToken);
				for(var i = 0; i < hideEvents.length; i++) {	
					var hideEventType = hideEvents[i];		
					if (hideEventType.indexOf('element.')==0){
						var he = hideEventType.replace('element.','');
					} else {
						NextagUtils.addEvent(tr, hideEventType, funcHide(popup.id));
						NextagUtils.addEvent(popup, hideEventType, funcHide(popup.id));
					}
				}
			}
			trigs++;
		}
		sWindowWidth = document.body.clientWidth;
		sWindowHeight = document.body.clientHeight;

		return true;
  };

	var funcShow = function (id,num) {
		return new Function("event", "clearTimeout(sTimeouts['"+id+"']);sTimeouts['"+id+"'] = setTimeout(\"PopupManager.show('"+id+"',"+mGrpId+","+num+");\", " + mParams['delay'] + ");");
	};
	var funcHide = function (id) {
		return new Function("event", "clearTimeout(sTimeouts['"+id+"']);sTimeouts['"+id+"'] = setTimeout(\"PopupManager.hide('"+id+"',"+mGrpId+");\", " + mParams['delay'] + ");");
	};

	var funcClickShow = function (id,num) {
		return new Function("event", "clearTimeout(sTimeouts['"+id+"']);sTimeouts['"+id+"'] = setTimeout(\"PopupManager.show('"+id+"',"+mGrpId+","+num+");\", " + 0 + "); NextagUtils.stopEvent(event);");
	};

	var funcClickHide = function (id) {
		return new Function("PopupManager.hide('"+id+"',"+mGrpId+");");
	};
	
	var funcShowNow = function (id,num) {
		return new Function("sIsDisplaying['"+id+"']=true;PopupManager.show('"+id+"',"+mGrpId+","+num+");");
	};

	/** privileged static methods **/
	PopupManager.show = function (id,grpId,pnum) {			
		if (grpId >= sPopupGroups.length || pnum < 0)
			return;
		if (id == sTimeouts['lastshown'])
			return;
		var pm = sPopupGroups[grpId];
		if (pm.getProperty('autoHide'))
			PopupManager.hide(sTimeouts['lastshown'], sTimeouts['lastshown_grpid']);
		var fn = sGroupPreShowCB[grpId];
		if (fn != null){fn('preShow',id,grpId,pnum);}
		var tr = document.getElementById(pm.getProperty('triggerPrefix') + '_' + pnum);
		var trIcon = document.getElementById(pm.getProperty('triggerIcon') + '_' + pnum);
		var uniquePopupElement = document.getElementById(sGroupUniquePopupId[grpId]);
		var popup = uniquePopupElement ? uniquePopupElement : 
				document.getElementById(pm.getProperty('popupPrefix') + '_' + pnum);
		var fixedPos = document.getElementById(sGroupPopupFixedPos[grpId]);
		pm.positionPopup(popup,tr,true,fixedPos,trIcon);
		sTimeouts['lastshown'] = id;
		sTimeouts['lastshown_grpid'] = grpId;
		var el = document.getElementById(id);
		if (el) {
			if (NextagUtils.is_ie && pm.getProperty('hideOverlay'))
				NextagUtils.hideShowCovered(el,sHideElements);
			if (pm.getProperty('showProperty') == 'display'){
				el.style.display = "block";
			} else {
				el.style.visibility = "visible";
			}
		}
		try {
			if (tr && tr.blur) {
				tr.blur();
			}
		} catch (err){}
		fn = sGroupPostShowCB[grpId];
		if (fn != null){fn('postShow',id,grpId,pnum);}
	};

	PopupManager.hide = function (id,grpId) {
		if (grpId >= sPopupGroups.length)
			return;
		if (sIsDisplaying[id]) {
			sIsDisplaying[id] = false;
			return;
		}
		var fn = sGroupPreHideCB[grpId];
		if (fn != null){fn('preHide',id,grpId);}
		var pm = sPopupGroups[grpId];
		var el = document.getElementById(id);
		if (el) {
			if (NextagUtils.is_ie && pm.getProperty('hideOverlay') && el.style.visibility == 'visible')
				NextagUtils.hideShowCovered(el,sHideElements);

			if (pm.getProperty('showProperty') == 'display'){
				el.style.display = "none";
			} else {
				el.style.visibility = "hidden";
			}

			sTimeouts['lastshown'] = null;
			sTimeouts['lastshown_grpid'] = null;
		}
		fn = sGroupPostHideCB[grpId];
		if (fn != null){fn('postHide',id,grpId);}
	};


	/** constructor body */
	init();
};

PopupManager.newPopupGroup = function (params){
	new PopupManager(params);
};

function RegisterPopupManager(eventEle){

    var tableRows=jQuery('table.is-row');
    var lastRow=tableRows[tableRows.size()-1];
    var id=jQuery(lastRow).attr('id');
    var count=id.substr(5);
    PopupManager.newPopupGroup({hideOverlay:false, showEvent:eventEle, triggerIcon:'mltLink_arrow', triggerPrefix:'mltLink', popupPrefix:'mltDiv', leftOffset:7, topOffset:-10, flipX:true,startIndex:Math.round(count/100)+"00"});

};function NxtgHttpReq (url, options_){
	var options = {
		async: true,
		cb: null,
		handler: null,
		method: 'GET',
		contentType: null
	};

	if (options_){
		if (options_.async) { options.async = options_.async; }
		if (options_.cb) { options.cb = options_.cb; }
		if (options_.handler) { options.handler = options_.handler; }
		if (options_.method) { options.method = options_.method; }
		if (options_.contentType) { options.contentType = options_.contentType; }
	}

	var xhr = null;

	this.getURL = function(){return url;};
	this.setPost = function(){ options.method = 'POST';};
	this.setAsynchronous = function(async){ options.async = async; };
	this.getData = function(){
		if (xhr)
			return xhr.responseText;
		return null;
	};

	this.getStatus = function (){
		if (xhr)
			return xhr.status;
		return 0;
	};

	this.setAsynchronous = function(async){ options.async = async; };

	this.getXHR = function(){return xhr;};

	this.send = function(c){
		if(xhr && xhr.readyState!=0){
			xhr.abort();
		}
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(sc) {
				xhr = null;
			}
		}
		if(!xhr && typeof XMLHttpRequest!="undefined"){
			xhr = new XMLHttpRequest()
		}
		if (options.cb || options.handler){
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200){
						if (options.cb)
							options.cb(xhr.responseText, xhr.responseXML);
						if (options.handler && options.handler.procdata)
							options.handler.procdata(xhr.responseText, xhr.responseXML);
					}
				}
			};
		}
		if(xhr){
			xhr.open(options.method,this.getURL(),options.async);
			var content = null;
			if (options.method == 'POST')
				content = c;
			if (options.contentType)
				xhr.setRequestHeader("Content-Type", options.contentType);
			xhr.send(content);
		}
	};
};

var SMONTO = 30000;
var TMONTO = 600000;
function cube(params){
	function set_defs(n,d) { if (typeof params[n] == "undefined") { params[n] = d; } };

	set_defs("dg",false);
	set_defs("tmp",false);
	set_defs("det",false);
	var _obtrkg = false;
	var _p = params;
	var dg_ = _p['dg'];
	var _dgw = null;
	var _buf = new Array();
	var _tmp = _p['tmp'];
	var _det = _p['det'];

	var __event = function(e){return e?e:window.event;}

	var __target = function(e){
		return (e.target)?e.target:e.srcElement;
	}

	var __scrollc = function(){
		if( typeof( window.pageYOffset ) == 'number' ) {
			return {x:window.pageXOffset,y:window.pageYOffset};
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			return {x:document.body.scrollLeft,y:document.body.scrollTop};
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			return {x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop};
		}
		return {x:-1,y:-1};
	}
	var __size = function(){
		if( typeof( window.innerWidth ) == 'number' ) {
			return {w:window.innerWidth,h:window.innerHeight};
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			return {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight};
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			return {w:document.body.clientWidth,h:document.body.clientHeight};
		}
		return {w:-1,h:-1};
	}
	
		var __scSize = function(){
		if( typeof(document.body.parentNode.scrollHeight) == 'number' )
			return {w:document.body.parentNode.scrollWidth,h:document.body.parentNode.scrollHeight};
		else if( typeof( document.body.scrollWidth ) == 'number' )
			return {w:document.body.scrollWidth,h:document.body.scrollHeight};
		return {w:-1,h:-1};
	}

	var __position = function(e){
		var dim = __size();
		if (e.pageX || e.pageY) {
			return {x:e.pageX,y:e.pageY};
		} else if (e.clientX || e.clientY) {
			return {x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
					y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop};
		}
		return {x:0,y:0};
	}

	var _debug = function(m){if (_dgw&&_dgw.document)_dgw.document.writeln('> ' + m + '<br/>');}
	var _cap = function(e,v,dd){
		var s="ev"+e+"="+new Date().getTime()+";"+v;
		var p = _buf.length;
		if (dd&&p>0&&_buf[p-1].indexOf("ev"+e)==0)
			p-=1;
		_buf[p]=s;
		_debug(s);
	}
	this.log = function(cmp,s){
		_buf[_buf.length] = cmp + "=" + s;
		_debug(s);
	}
	
	var __last = new Date();
	var __lasti = -1;
	this.tmon = function(){
		var now = new Date();
		_debug("__tmon: " + __last + " | " + __lasti + " | " + now + " | " + _buf.length);
		var diff = now.getTime() - __last.getTime();
		if (diff<TMONTO){
			setTimeout("cube_inst.tmon()",TMONTO-diff);
			return;
		}
		__send();
		setTimeout("cube_inst.tmon()",TMONTO);
	}
	this.smon = function(){
		if (_obtrkg == true && loadTimes) {
			var i = 0;
			for (i = 0; i < loadTimes.length; i++) {
				_cap('ajaxload',loadTimes[i],true);
			}
			loadTimes.splice(0,i);
		}
		var now = new Date();
		_debug("__smon: " + __last + " | " + __lasti + " | " + now + " | " + _buf.length);
		var bsz = _buf.length;
		if (__lasti > 0){
			bsz -= __lasti;
		}
		if (bsz >= 20)
			__send();
		setTimeout("cube_inst.smon()",SMONTO);
	}
	var __send = function(){
		_debug("sending: " + __last + " | " + __lasti);
		var top = _buf.length;
		if (__lasti == top-1){
			__last = new Date();
			return;
		}
		var u = _p['id'] + "$";
		var st = __lasti==-1?0:__lasti;
		for (var i=st; i<top; i++){
			u += _buf[i] + "$";
		}
		u += "!!";
		var _cbs = (NextagUtils != "undefined" && NextagUtils.sCubeables) ? NextagUtils.sCubeables : new Array(); 
		for (var i=0; i<_cbs.length; i++){
			if (_cbs[i].getLogs) {u+= _cbs[i].getLogs() + "$"; }
		}
		_debug("send url: " + u);
		if (http)
			http.send(u);
		__lasti = top-1;
		__last = new Date();
	}
	var http = null;
	var _init = function(ev){
		if (dg_){_dgw = window.open("about:blank","cubedgw","width=300,height=800,scrollbars=1");}

		var dim = __size();
		var scDim = __scSize();
		var ilog = scDim.w + "x" + scDim.h + "-" + dim.w + "x" + dim.h;

		var _events = _p['cap'];
		if (_events){
			ilog += ";[load,unload";
			for (var i=0; i<_events.length; i++){
				var prt = _events[i].split('.');
				var elem = null;;
				var capev = null;
				if (prt.length==1){
					elem = window;
					capev = prt[0];
				} else if (prt.length == 2){
					capev = prt[1];
					if (prt[0]=='window') elem = window;
					else if (prt[0]=='document') elem = document;
					else elem = document.getElementById(prt[0]);
				}
				if (elem && capev){
					ilog += ","+_events[i]
					if (capev=='click') NextagUtils.addEvent(elem,'click',_hc);
					else if (capev=='scroll') elem.onscroll = _hs;
					else if (capev=='resize') elem.onresize = _hr;
					else if (capev=='blur') NextagUtils.addEvent(elem,'blur',_hb);
					else if (capev=='focus') NextagUtils.addEvent(elem,'focus',_hf);
					else if (capev=='dblclick') NextagUtils.addEvent(elem,'dblclick',_hdc);
					else if (capev=='mousemove') NextagUtils.addEvent(elem,'mousemove',_hmm);
					else if (capev=='mouseover') NextagUtils.addEvent(elem,'mouseover',_hmov);
					else if (capev=='mouseout') NextagUtils.addEvent(elem,'mouseout',_hmot);
					else if (capev=='change') NextagUtils.addEvent(elem,'change',_hfc);
					else if (capev=='submit') NextagUtils.addEvent(elem,'submit',_hfs);
					else if (capev=='reset') NextagUtils.addEvent(elem,'reset',_hfr);
					else if (capev=='select') NextagUtils.addEvent(elem,'select',_hfsl);
					else if (capev=='ajaxload') _obtrkg = true;
				}
			}
			ilog += "]";
		}
		setTimeout("cube_inst.tmon()",600000);
		setTimeout("cube_inst.smon()",30000);
		_cap("init",ilog);
		http = new NxtgHttpReq("/tools/cube.jsp");
		http.setPost();
		return true;
	}

	var __css = function(t){
		var s="";
		s += (t&&t.tagName) ? t.tagName.toLowerCase() : "-";
		if(t&&t.id){
			s += "#"+t.id;
		} else if(t&&t.className) {
			s += "."+t.className;
		} else {
			s += ".-";
		}
		return s;
	}

	var __cge = function(ev,v,dd){
		if(!dd||dd == undefined) dd=false;
		var _e = __event(ev);
		var _t = __target(_e);
		var _v = v?v:"-";
		if(_det){
			_v += "~" + __css(_t);
			if (_t)
				_v += __cktmp(_t,ev);
		} else {
			if (_t) {
				while(!_t.id && _t.parentNode){
					_t = _t.parentNode;
				}
				if (_t.id && _t.parentNode)
					_v += "."+_t.id;
			}
		}
		_cap(_e.type,_v,dd);
		return true;
	}
	
	var __cktmp = function(t,ev){
		if(typeof(t)=="undefined"||!_tmp||!t.tagName) return "";
		var tagName = t.tagName.toLowerCase();
		if(_tmp[tagName+'#'+t.id]){return _tmp[tagName+'#'+t.id](t,ev);}
		if(_tmp['#'+t.id]){return _tmp['#'+t.id](t,ev);}
		if(_tmp[tagName+'.'+t.className]){return _tmp[tagName+'.'+t.className](t,ev);}
		if(_tmp['.'+t.className]){return _tmp['.'+t.className](t,ev);}
		if(_tmp[tagName]){return _tmp[tagName](t,ev);}
		return "";
	}
	
	var _unload = function(ev){
		__cge(ev);
		if (http){ http.setAsynchronous(false); }
		__send();
	}
	var _hc = function(ev){var p = __position(__event(ev));return __cge(ev,p.x+"."+p.y);}
	var _hs = function(ev){
		var _e = __event(ev);
		var sc = __scrollc();
		return __cge(ev,sc.x+"x"+sc.y,true);
	}
	var _hr = function(ev){
		var dim = __size();
		var scDim = __scSize();
		return __cge(ev,scDim.w + "x" + scDim.h + "-" + dim.w + "x" + dim.h);
	}
	var _hb = function(ev){return __cge(ev,null,true);}
	var _hf = function(ev){return __cge(ev,null,true);}
	var _hdc = function(ev){var p = __position(__event(ev));return __cge(ev,p.x+"."+p.y);}
	var _hmm = function(ev){return __cge(ev);}
	var _hmov = function(ev){return __cge(ev);}
	var _hmot = function(ev){return __cge(ev);}
	var _hfc = function(ev){return __cge(ev);}
	var _hfsl = function(ev){return __cge(ev);}
	var _hfs = function(ev){return __cge(ev);}
	var _hfr = function(ev){return __cge(ev);}
	this.ace = function(e,v,dd){ _cap(e,v,dd); }
	NextagUtils.addEvent(window,'load',_init);
	NextagUtils.addEvent(window,'unload',_unload);
};

var cube_inst = null;
function initCube(p){
	if (cube_inst == null){ cube_inst = new cube(p); }
	return cube_inst;
}


function showSellerReviewPopup(sellerIds, url, noCB) {
  	var features = "width=330,height=385,menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,toolbar=no";
  	if (sellerIds != null) { 
  		url += "?sellerIds="+escape(sellerIds);
  		if (noCB) url+="&noCB=1";
  	} else if (noCB) { 
  		url+="?noCB=1";
  	}
	window.open(url, "srp", features);
}function showCatArrows() {
var left = document.getElementById('cat_arrow_l');
var right = document.getElementById('cat_arrow_r');
left.style.visibility='';
right.style.visibility='';
}
function showProdArrows() {
var left = document.getElementById('p_arrow_l');
var right = document.getElementById('p_arrow_r');
var table = document.getElementById('p_table');
left.style.visibility='';
right.style.visibility='';
table.style.padding='0px';
table.style.borderTop='1px solid #ccc';
table.style.borderBottom='1px solid #ccc';
}
function hideCatArrows() {
var left = document.getElementById('cat_arrow_l');
var right = document.getElementById('cat_arrow_r');
left.style.visibility='hidden';
right.style.visibility='hidden';
}
function hideProdArrows() {
var left = document.getElementById('p_arrow_l');
var right = document.getElementById('p_arrow_r');
var table = document.getElementById('p_table');
left.style.visibility='hidden';
right.style.visibility='hidden';
table.style.borderTop='none';
table.style.borderBottom='none';
table.style.padding='1px 0px';
}
function loadCat(section,chan,layout) {
	var url = '/serv/' + chan + '/buyer/HomeFeaturedCategories.jsp';
	if (chan) {
		url+='?chnl='+chan;
	} else {
		url+='?chnl=main';
	}
	if (layout)
		url+='&layout='+layout;
	if (section)
		url+='&n='+section;
	if (typeof(nsinfo) != 'undefined'){
		if (nsinfo.as) url += "&style=" + nsinfo.as;
		if (nsinfo.ssb) url += "&ssb=" + nsinfo.ssb;
		if (nsinfo.bld) url += "&rv=" + nsinfo.bld;
	}
	document.body.style.cursor = 'wait';
	new NxtgHttpReq(url, 
	{cb: function(data) {
			var con = document.getElementById('mainCatCon');
			con.innerHTML = data.substring(data.indexOf('<div'), data.lastIndexOf('</div>'));
			document.body.style.cursor = 'default';
		}
	}).send();
}
function swapCatArw(side,useAlt,path) {
	var img;
	var orig,alt;
	var imgPath = '/images';
	if (path)
		imgPath = path;
	if (side=='l') {
		img= document.getElementById('catLeftArrow');
		orig=imgPath+'/arrowLeftRect.gif';
		alt=imgPath+'/arrowLeftRect2.gif';
	}
	else if (side=='r') {
		img= document.getElementById('catRightArrow');
		orig=imgPath+'/arrowRightRect.gif';
		alt=imgPath+'/arrowRightRect2.gif';
	}
	else return;
	if (useAlt)
		img.src=alt;
	else
		img.src=orig;
}
var reText = "123 Main St, Anytown, CA";
function reInputEnter() {
	var input = document.getElementById('reInputBox');
	if (input.value==reText) {
		input.value = '';
		input.className='textInput smallText';
		return false;
	}
}
function reInputExit() {
	var input = document.getElementById('reInputBox');
	if (input.value=='') {
		input.className='textInput smallGrayText';
		input.value = reText;
		return false;
	}
}
function popup(url,name,features) {
	window.open(url,name,features);
}
function SuggestManager(params){

	var Stat = function(){
		this.fs = false;
		this.reqs = 0;
		this.cache = 0;
		this.zfetch = 0;
		this.nzfetch = 0;
		this.suggkw = false;
		this.toString = function(){
		  return "{fs:"+this.fs+";reqs:"+this.reqs+";cache:"+this.cache+";zfetch:"+this.zfetch+";nzfetch:"+this.nzfetch+";suggkw:"+this.suggkw+"}";
		}
	}
	
	setParamDefaults("searchInput", null);
	setParamDefaults("suggestPopup", null);
	setParamDefaults("maxDisplay", 10);
	setParamDefaults("maxFetch", 100);
	setParamDefaults("minPrefix", 3);
	setParamDefaults("maxLength", 40);
	setParamDefaults("typingDelay", 500);
	setParamDefaults("columns", 1);
	setParamDefaults("showHideLink", true);
	setParamDefaults("showHeader", false);
	setParamDefaults("submitOnClick", true);
	setParamDefaults("showKW", true);
	setParamDefaults("showRecent", false);
	setParamDefaults("maxRecent", 5);
	setParamDefaults("headerTxt", "Search Suggestions:");
	setParamDefaults("hideTxt", "hide search suggestions");
	setParamDefaults("showTxt", "show search suggestions...");
	setParamDefaults("sendEveryRequest", false);
	
	var mParams = params;
	var timer = 0;
	var searchInput = document.getElementById(mParams['searchInput'])
	var suggestPopup = document.getElementById(mParams['suggestPopup']);
	var _ul;
	var listInfocus;
	var target = "/buyer/opensearch.jsp?suggest=complete&perpage="+ mParams['maxFetch'] +"&search=";
	var dataCache = new Array();
	var rsCache = new Array();
	var enabled = params['showKW'];
	var beenSubmitted = false;
	var stats = new Stat();
	var usrKw = null;
	
	this.initialized = false;
	this.getId = function(){
		return mParams['searchInput'];
	}
	
	var searchInputKeyupHlr = function(ev) {
		if (beenSubmitted) return;
		var crtKey = checkKeystroke(ev);

		if (crtKey == 37 && mParams['columns'] == 2) { // <-
			if (_ul && isShown()) {
				if (!listInfocus) {
					listInfocus = _ul.head;
				} else {
					for (var i=0; i < _ul.size/2; i++) listInfocus = listInfocus.pre;
				}
				doHighlight();
			}
		} else if (crtKey == 38) { // up
			if (_ul && isShown()) {
				if (!listInfocus) {
					listInfocus = _ul.tail;
				} else {
					listInfocus = listInfocus.pre;
				}
				doHighlight();
			}
		} else if (crtKey == 39 && mParams['columns'] == 2) { // ->
			if (_ul && isShown()) {
				if (!listInfocus) {
					listInfocus = _ul.head;
				} else {
					for (var i=0; i < _ul.size/2; i++) listInfocus = listInfocus.next;
				}
				doHighlight();
			}	
		} else if (crtKey == 40) { // dn
			if (_ul && isShown()) {
				if (!listInfocus) {
					listInfocus = _ul.head;
				} else {
					listInfocus = listInfocus.next;
				}
				doHighlight();
			}
		} else if (crtKey == 13) { // enter
			stats.fs = true;
			hide();
		} else {			
			if (timer) clearTimeout ( timer );
			if (crtKey == 27 || (crtKey == 8 && searchInput.value && searchInput.value.trim().length < mParams['minPrefix'])){
				hide();
			} else {
				if (enabled) {
					var dd = getCachedData(searchInput.value.toLowerCase());
					//var dd = searchInput.value.toLowerCase();
					if (dd){				
						
						new fetcher().update(dd, rsCache);
					} else {		
							
						timer = setTimeout(fetchHlr, mParams['typingDelay'] );					}
				} else {
					if (!isPromptShown() && searchInput.value.trim().length >= mParams['minPrefix']) {
						showPrompt();
					}
				}
			}
		}
	}

	var _dbg = function(msg){
		var e = document.getElementById(mParams['debugdiv']);
		if (e){
			e.innerHTML = e.innerHTML + '<br/>' + msg;
		}
	}
	
	this.doClickKW = function(kw) {
		searchInput.value = kw; 
		hide();
		usrKw = kw;
		if (mParams['submitOnClick'] && 
			searchInput.parentNode && 
			searchInput.parentNode.tagName == "FORM") {
			searchInput.parentNode.onsubmit();
		}
		cubeLog("userclick");
	}
	var listClickHlr = function(ev) {
		var curNode;
		if (!ev) ev = window.event;
		if (ev.target) curNode = ev.target;
		else if (ev.srcElement) curNode = ev.srcElement;
		
		this.doClickKW(curNode.textValue); 
	}

	var listHLHlr =	function(ev) {
		var curNode;
		if (!ev) ev = window.event;
		if (ev.target) curNode = ev.target;
		else if (ev.srcElement) curNode = ev.srcElement;
		
		if (curNode.tagName != 'LI')
			curNode = curNode.parentNode;

		clearFocus();
		curNode.setAttribute("className", "highLight");
		curNode.setAttribute("class", "highLight");
		listInfocus = curNode;
	}
	var listLLHlr = function(ev) {
		var curNode;
		if (!ev) ev = window.event;
		if (ev.target) curNode = ev.target;
		else if (ev.srcElement) curNode = ev.srcElement;
		
		if (curNode.tagName != 'LI')
			curNode = curNode.parentNode;

		curNode.setAttribute("className", "");
		curNode.setAttribute("class", "");
	}
	
	function fetcher() {
		this.procdata = function(txt) {
			if (!txt)
				return;
				
			var data = eval('(' + txt.trim() + ')');
			if (data && data.length > 1 && data[1]) {
				var cmpt = data[1].length < mParams['maxFetch'];
				dataCache[data[0]] = {c:cmpt,d:data[1]};
				if (data[2]) rsCache = data[2];
				this.update(data[1],rsCache);
				if (data[1].length > 0)
					stats.nzfetch++;
				else
					stats.zfetch++;
			}
		}
		
		this.update = function (kws, rss){
			if (kws != null)
				updateSuggest(kws, rss);
		}
	}
	var filterList = function (list,p){
		var arr = new Array();
	  if (list && p){
			for (var i=0; i<list.length; i++){
				if (list[i].indexOf(p) == 0)
					arr[arr.length] = list[i];
			}
		}
		return arr;
	}
	var getCachedData = function(kw){		
		if (!kw) return;
		var d = dataCache[kw];
		if (d) return d.d;
		if (!mParams['sendEveryRequest'] && kw.trim().length > mParams['minPrefix']){

			var kw_ = kw.substring(0,kw.length-1);
			d = dataCache[kw_];
			if (d && d.c){
				d = filterList(d.d,kw);
				dataCache[kw] = {c:true,d:d};
				return d;
			}
		}
		return null;
	}
	var fetchHlr = function() {
		if (beenSubmitted) return;
		var inKW = searchInput.value.toLowerCase();
		if (inKW.trim().length < mParams['minPrefix'] || inKW.trim().length > mParams['maxLength']) {
			
			hide();
		} else {
			var hdlr = new fetcher();
			var _data = getCachedData(inKW);
			stats.reqs++;
			if (_data){
				hdlr.update(_data, rsCache);
				stats.cache++;
			} else {				
				var url = target+inKW;
				if (nsinfo && typeof(nsinfo) != undefined && nsinfo.bld != null) url += "&rv=" + nsinfo.bld;
				if (mParams['showRecent']) url += "&rs=y";
				new NxtgHttpReq(url, {handler: hdlr}).send();
			}
		}
	}
	
	function isShown() {
		return enabled && suggestPopup.style.visibility == "visible";
	}
	function isPromptShown() {
		return !enabled && suggestPopup.style.visibility == "visible";
	}
	function hide() {
		suggestPopup.style.visibility = "hidden";
		listInfocus = null;
	}
	var cubeLog = function(e){
		if (cube_inst!="undefined" && cube_inst){
			if (cube_inst.log)
				cube_inst.log("ssuggest-event",e);
		}
	}
	this.getLogs = function(){
		stats.suggkw = searchInput && usrKw != null && searchInput.value == usrKw;
		return "ssuggest-stats:" + stats.toString();
	}
	var updateSuggest = function(suggests, recentsearches) {
		if (!suggests) return;
		var prefix = searchInput.value.toLowerCase();
		listInfocus = null;
		_ul = document.createElement("ul");
		_ul.size = 0;
		
		var doTwoCols = suggests.length > 1 && mParams['columns'] == 2;   
		var lc = document.createElement("div");
		var rc = document.createElement("div");
		if (doTwoCols){
			_ul.appendChild(lc);
			_ul.appendChild(rc);
		}
		
		if (recentsearches)
			buildList(prefix, recentsearches, true, Math.min(recentsearches.length, mParams['maxRecent']), _ul, 'underline');
		buildList(prefix, suggests, !mParams['sendEveryRequest'], Math.min(suggests.length, (recentsearches?(_ul.size+mParams['maxDisplay']):mParams['maxDisplay'])), _ul);
		if (_ul && _ul.head && _ul.tail) {
			_ul.head.pre = _ul.tail;
			_ul.tail.next = _ul.head;
		}
		
		var counter = 0;
		var item = _ul.head;
		while (item && counter < _ul.size) {
			if (!doTwoCols) {
				_ul.appendChild(item);
			} else {
				if (counter < _ul.size / 2) lc.appendChild(item);
				else rc.appendChild(item);
			}
			item = item.next;
			counter ++;
		}
		
		if (_ul.head) {
			suggestPopup.innerHTML = "";
			if (mParams['showHeader']) addHeader();
			if (mParams['showHideLink']) addHideLink();
			suggestPopup.appendChild(_ul);
			//if (mParams['showHideLink']) addHideLink();
			suggestPopup.style.visibility = "visible";
		} else {
			hide();
		}
	}
	
	function addHeader() {
		var _headerText = document.createTextNode(mParams['headerTxt']);
		var _header = document.createElement("div");
		_header.setAttribute("id", "suggest-header");
		_header.appendChild(_headerText);
		suggestPopup.appendChild(_header);
	}
	
	function addHideLink() {
		if (document.getElementById('suggest-msg-right')) return;
		
		var _hideText = document.createTextNode(mParams['hideTxt']);
		var _a = document.createElement("a");
		_a.appendChild(_hideText);
		_a.setAttribute("id", "suggest-msg-right");
		_a.setAttribute("href", "javascript:void(0)");
		NextagUtils.addEvent(_a, "click", detachSuggest);
		suggestPopup.appendChild(_a);
	}
	function detachSuggest() {
		createCookie("true");
		enabled = false;
		hide();
		cubeLog("userhide");
	}
	function createCookie(value) {
	  	var date = new Date();
	 	date.setTime(date.getTime()+(100*24*60*60*1000));
	  	var expires = "; expires="+date.toGMTString();
	  	document.cookie = "dss="+value+expires+"; path=/";
	}
	function reEnable() {
		createCookie("false");
		enabled = true;
		fetchHlr();
		if (searchInput && searchInput.focus)
			searchInput.focus();
		cubeLog("userenable");
	}
	this.getCache = function(){
		return dataCache;
	}
	
	this.stopSuggest = function(){
		beenSubmitted = true;
		hide();
	}
	
	function buildList(prefix, suggests, requirePrefix, total, _ul, idMark) {
		var _pre = _ul.tail;
		for (var i=0; _ul.size<total && i<suggests.length; i++) {
			
					
			var suggest = suggests[i];
			if (requirePrefix && suggest.indexOf(prefix) != 0) continue;
			if (suggest.length > mParams['maxLength']) continue;
				
					
			var _li = document.createElement("li");
			_li.position = (_ul.size++);
			
			var matchIndex = suggest.indexOf(prefix);
			var _headText = suggest.substring(0, matchIndex);
			var _head = _headText ? document.createTextNode(_headText) : null;
			var _mid = suggest.substring((_headText ? _headText.length : 0), (_headText ? _headText.length : 0) + prefix.length);
			var _tailText = suggest.substring((_headText ? _headText.length : 0) + prefix.length);
			var _tail = _tailText ? document.createTextNode(_tailText) : null;
			if (_head){
				var _span = document.createElement("span");
				_span.appendChild(_head);
				_li.appendChild(_span);
			}
			_li.appendChild(document.createTextNode(_mid));
			if (_tail) {
				if (matchIndex>=0){
				var _span = document.createElement("span");
				_span.appendChild(_tail);
				_li.appendChild(_span);
			}
				else{
					_li.appendChild(_tail);
				}
			}
			_li.textValue = suggest;
			
			// NextagUtils.addEvent(_li, "click", listClickHlr);
			NextagUtils.addEvent(_li, "click", new Function("event","var s=SuggestManager.Suggests['"+mParams['searchInput']+"'];if(s){s.doClickKW('"+suggest+ "');}"));
			
			NextagUtils.addEvent(_li, "mouseover", listHLHlr);
			//NextagUtils.addEvent(_li, "mouseout", listLLHlr);
			
			if (_pre) {
				_li.pre = _pre;
				_pre.next = _li;
			}
			_pre = _li;
			
			if (!_ul.head) _ul.head = _li;
			_ul.tail = _li;
		}
		if (_ul.tail && idMark)
			_ul.tail.setAttribute('id', idMark);
	}
	function showPrompt() {
		var _text = document.createTextNode(mParams['showTxt']);
		var _a = document.createElement("a");
		_a.appendChild(_text);
		_a.setAttribute("id", "suggest-msg-left");
		_a.setAttribute("href", "javascript:void(0)");
		NextagUtils.addEvent(_a, "click", reEnable);
		
		suggestPopup.innerHTML = "";
		suggestPopup.appendChild(_a);
		suggestPopup.style.visibility = "visible";
	}
	
	/** private instance methods **/
	var init = function(){
		if (!document.getElementById) {
			return false;
		}

		/*if( sBrowser.mac == 1 && sBrowser.ie5 == 1 ) {
			return false;
		}*/
		
		if (!searchInput || !suggestPopup) {
			return false;
		}
		
		NextagUtils.addEvent(searchInput, "keyup", searchInputKeyupHlr);
		searchInput.setAttribute("autocomplete", "off");
		
		if (mParams['submitOnClick'] && 
			searchInput.parentNode && 
			searchInput.parentNode.tagName == "FORM") { 
			NextagUtils.addEvent(searchInput.parentNode, "submit", new Function("event","var s=SuggestManager.Suggests['"+mParams['searchInput']+"'];if(s){s.stopSuggest();}"));
		}
	}
	
	function checkKeystroke(ev) {
		if (!ev) ev = window.event;
		if (ev.keyCode) return ev.keyCode;
		else if (ev.which) return ev.which;
		else return 0;
	}
	
	function setParamDefaults(pname, def) {
		if (typeof params[pname] == "undefined") { params[pname] = def; } 
	}
	
	function doHighlight() {
		clearFocus();
		listInfocus.setAttribute("className", "highLight");
		listInfocus.setAttribute("class", "highLight");
		searchInput.value = listInfocus.textValue;
		usrKw = listInfocus.textValue;
	}
	
	function clearFocus() {
		if (!_ul) return;
		var list = _ul.head;
		for(var i=0; list && i<_ul.size;i++) {
			list.setAttribute("className", "");
			list.setAttribute("class", "");
			list = list.next;
		}
	}
	
	if (searchInput == null || suggestPopup == null) return;
	/** constructor body */
	init();
	this.initialized = true;

	if (NextagUtils != "undefined" && NextagUtils.makeCubeable){
		NextagUtils.makeCubeable(this);
	}
};

SuggestManager.Suggests = new Array();
SuggestManager.newSearchSuggest = function (params){
	var sm = new SuggestManager(params);
	if (sm.initialized) {
		SuggestManager.Suggests[sm.getId()]  = sm;
	}
};

var closeSearchSuggest = function(ev){
	var curNode;
	if (!ev) ev = window.event;
	if (ev.target) curNode = ev.target;
	else if (ev.srcElement) curNode = ev.srcElement;
	
	var suggestPopup = document.getElementById("search-suggest-container");
	var searchInput = document.getElementById("searchTop-s2");
	if (suggestPopup && curNode != suggestPopup && curNode != searchInput) { 
		suggestPopup.style.visibility = "hidden"; 
	}
}
NextagUtils.addEvent(document, "click", closeSearchSuggest);function PriceRadar(params) {
	var productId = params['productId'];
	var condition = params['condition'];
	var originalPrice = params['originalPrice'];
	var exp = params['exp'];
	var idSuffix = params['idSuffix'];
	var ptitle = params['ptitle'];
	var pname = params['pname'];
	var adnode = params['adnode'];
	var decMnyFmt = params['decMnyFmt'];	//decimal money format
	var isFriended = params['isFriended'];
	
	var email;
	var source;
	var dealEmails;
	var price;
	var postWall = false;
	var sendEmail = true;
	
	var self = this;
	
	var FBId = 100002622155542;
	
	this.setPostWall = function(post) {
		postWall = post;
	}
	
	this.setSendEmail = function(email) {
		sendEmail = email;
	}

	this.loginFail = function() {
		$('radar-fb-login-error'+suffix).style.display="block";
	}
	
	this.loginSuccess = function(email) {
		$('radar-email-input'+idSuffix).value = email;
		//showChoiceLb(self);
		this.setAlert();
	}
	
	this.handleTumbleLogIn = function(response) {
		if (typeof handleLoggedIn === "function") {
			handleLoggedIn(response);
			self.setAlert();
		}
	}

	this.fblogin = function(errorMsg) {
		if (Form.Validator.getValidator('required').test($('radar-price-input'+idSuffix)) &&
				((decMnyFmt && Form.Validator.getValidator('req-greater-zero').test($('radar-price-input'+idSuffix))) || 
				(!decMnyFmt && Form.Validator.getValidator('req-greater-zero-intl').test($('radar-price-input'+idSuffix))))) {
		    if(!window.isFacebookReady) {
		        if (!errorMsg) { errorMsg = "Please try again in a few seconds."; }
		        alert(errorMsg);
		        return;
		    }
		    ajaxRegister = true;
			FB.login(function(response) {
				if (response.authResponse) {
					if(response.status == "connected") {
						if (typeof ajaxRegisterFB === "function") {
							ajaxRegisterFB(self);
						} else if (typeof handleLoggedIn === "function" && NextagLogin != undefined && User != undefined) {
							var login = new NextagLogin({
								successCb: self.handleTumbleLogIn
							});
							login.autoFBLogin();
							self.loginSuccess(User.getEmail());
						}
					} else {
						//alert("email not provided: " + response.scope);
					}
				} else {
					//alert("not logged in");
				}
			}, {scope:'email,user_interests,user_likes'});
		} else {
			$('radar-price-error'+idSuffix).style.display = 'block';
		}
		return false;
	}
	
	this.friendRequest = function() {
		if (isFriended == true) {
			return true;
		}
		FB.ui(
			{method: 'friends.add',display:'popup',id: FBId},
			function(param) {
				if (!param) {
					$('radar-friend-error').style.display="block";
				} else if (param.action == false) {
					$('radar-friend-error').style.display="block";
				} else if (param.action == true) {
					isFriended = true;
					self.setAlert();
				}
			}
		);
		return false;
	}
	
	this.setAlert = function() {
		email = $('radar-email-input'+idSuffix).value;
		source = $('radar-source'+idSuffix).value;
		dealEmails = $('radar-dealEmails-input'+idSuffix).checked;
		price = $('radar-price-input'+idSuffix).value;
		
		//if (postWall == true && this.friendRequest() == false) {
		//	return;
		//}
		
		$('radar-price-error'+idSuffix).style.display = 'none';
		$('radar-email-error'+idSuffix).style.display = 'none';
		if (Form.Validator.getValidator('required').test($('radar-email-input'+idSuffix)) && Form.Validator.getValidator('validate-email').test($('radar-email-input'+idSuffix))) {
			if (Form.Validator.getValidator('required').test($('radar-price-input'+idSuffix)) &&
					((decMnyFmt && Form.Validator.getValidator('req-greater-zero').test($('radar-price-input'+idSuffix))) || 
					(!decMnyFmt && Form.Validator.getValidator('req-greater-zero-intl').test($('radar-price-input'+idSuffix))))) {
				var params = 'productId='+productId+'&email='+email+'&condition='+condition+'&curprice='+originalPrice+'&priceStr='+price+'&expiration='+exp+'&source='+source+'&dealEmails='+dealEmails+"&sendEmail="+sendEmail+"&postWall="+postWall;
				var radarReq = new Request({
					url: '/radar/price/create',
					method: 'get',
					data: params,
					onSuccess: function(response) {
						var responseJson = JSON.parse(response);
						if (responseJson.error) {
							//alert("error");
						} else {
							self.toggleSuccess();
							var saveUrl = "/personal/module/add/favoriteproducts"+
								"?ptitle="+ptitle
								+"&price="+originalPrice
								+"&annot="+pname
								+"&adnode="+adnode;
							if (typeof populateToolbar === "funcion") {
								populateToolbar(saveUrl,$('favoriteproducts').getPosition().x);
							}
							if (typeof hideChoiceLb === "function") {
								hideChoiceLb();
							}
						}

						var d = new Date();
						// set expiry to 10 years
						d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
						setCookie("hasRadar", 'true', d, "/");
					},
					onFailure: function() {
					}
				});
				radarReq.send();
			} else {
				$('radar-price-error'+idSuffix).style.display = 'block';
			}
		} else {
			$('radar-email-error'+idSuffix).style.display = 'block';
		}
	}
	
	this.toggleSuccess = function() {
		if ($('radar-row')) {
			$('radar-row').style.display='none';
		}
		if ($('radar-register-row')) {
			$('radar-register-row').style.display='none';
		}
		if ($('radar-info-row')) {
			$('radar-info-row').style.display='none';
		}
		if ($('radar-row-success')) {
			$('radar-row-success').style.display='';
		}
		if ($('lb-success-message-pr')) {
			$('lb-success-message-pr').style.display = '';
		}
		if ($('radar-entry-pr')) {
			$('radar-entry-pr').style.display = 'none';
		}
		if ($('lb-radar-register-row')) {
			$('lb-radar-register-row').style.display = 'none';
		}
		if ($('lb-radar-info-row')) {
			$('lb-radar-info-row').style.display = 'none';
		}
		if ($('lb-radar-register-row-pr')) {
			$('lb-radar-register-row-pr').style.display='none';
		}
		if ($('lb-radar-info-row-pr')) {
			$('lb-radar-info-row-pr').style.display='none';
		}
		if ($('lb-radar-register-row')) {
			$('lb-radar-register-row').style.display='none';
		}
		if ($('lb-radar-info-row')) {
			$('lb-radar-info-row').style.display='none';
		}
		if ($('radar-entry-lb')) {
			$('radar-entry-lb').style.display='none';
		}
		if ($('lb-success-message')) {
			$('lb-success-message').style.display='block';
		}
		if (typeof hideLbTimeout == 'function') {
			hideLbTimeout();
		}
		setTimeout("hideLb('-pr')",2000);
		lbShown = true;
		clearLBTimeout();
	}
}
function SearchRadar(params) {
	var search = params['search'];
	var alias = params['alias'];
	var filter = params['filter'];
	var freq = params['freq'];
	var idSuffix = params['idSuffix'];
	var exp = params['exp'];
	
	var email;
	var source;
	var dealsEmail;
	var self = this;

	this.loginFail = function() {
		$('radar-fb-login-error'+suffix).style.display="block";
	}
	
	this.loginSuccess = function(email) {
		$('radar-email-input'+idSuffix).value = email;
		this.setAlert();
	}
	
	this.handleTumbleLogIn = function(response) {
		if (typeof handleLoggedIn === "function") {
			handleLoggedIn(response);
			self.setAlert();
		}
	}
	
	this.fblogin = function(errorMsg) {
	    if(!window.isFacebookReady) {
	        if (!errorMsg) { errorMsg = "Please try again in a few seconds."; }
	        alert(errorMsg);
	        return;
	    }
	    ajaxRegister = true;
		FB.login(function(response) {
			if (response.authResponse) {
				if(response.status == "connected") {
					if (typeof ajaxRegisterFB === "function") {
						ajaxRegisterFB(self);
					} else if (typeof handleLoggedIn === "function" && NextagLogin != undefined && User != undefined) {
						var login = new NextagLogin({
							successCb: self.handleTumbleLogIn
						});
						login.autoFBLogin();
						self.loginSuccess(User.getEmail());
					}
				} else {
					//alert("email not provided: " + response.scope);
				}
			} else {
				//alert("not logged in");
			}
		}, {scope:'email,user_interests,user_likes'});
		return false;
	}

	this.saveFavoriteSearch = function() {
		var req = new Request({
			url: '/personal/module/add/favoritesearches',
			method: 'get',
			data: 'search=' + search + '&alias=' + alias + '&fsfilter=' + filter + '&adnode=0',
			onComplete: function() {
				if (typeof populateToolbar === 'function') {
					var saveUrl = "/personal/module/add/favoritesearches?search="+search+"&alias="+alias+"&fsfilter="+filter+"&adnode=0";
					populateToolbar(saveUrl,$('favoritesearches').getPosition().x);
				}
			}
		});
		req.send();
		return false;
	}

	this.setAlert = function() {
		var email = $('radar-email-input'+idSuffix).value;
		var source = $('radar-source'+idSuffix).value;
		var dealEmails = $('radar-dealEmails-input'+idSuffix).checked;
		
		if (Form.Validator.getValidator('required').test($('radar-email-input'+idSuffix)) && Form.Validator.getValidator('validate-email').test($('radar-email-input'+idSuffix))) {
			var params = 'search='+search+'&alias='+alias+'&fsfilter='+encodeURIComponent(filter)+'&freq='+freq+'&email='+email+'&source='+source+'&exp='+exp+'&dealEmails='+dealEmails;
			var radarReq = new Request({
				url: '/radar/search/create',
				method: 'get',
				data: params,
				onComplete: function(response) {
					self.saveFavoriteSearch();
				},
				onSuccess: function(response) {
					var responseJson = JSON.parse(response);
					if (responseJson.errors) {
						//some error handling here
					} else {
						self.toggleSuccess();
					}

					var d = new Date();
					// set expiry to 10 years
					d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
					setCookie("hasRadar", 'true', d, "/");
				},
				onFailure: function() {
				}
			});
			radarReq.send();
		} else {
			$('radar-email-error'+idSuffix).style.display = 'block';
		}
	}
	
	this.toggleSuccess = function() {
		if ($('radar-register')) {
			$('radar-register').style.display = 'none';
		}
		if ($('radar-register-row-sa'+idSuffix)) {
			$('radar-register-row-sa'+idSuffix).style.display='none';
		}
		if ($('radar-info-row-sa'+idSuffix)) {
			$('radar-info-row-sa'+idSuffix).style.display='none';
		}
		if ($('radar-saved')) {
			$('radar-saved').style.display = 'block';
		}
		if ($('radar-entry-sa'+idSuffix)) {
			$('radar-entry-sa'+idSuffix).style.display='none';
		}
		if ($('lb-success-message-sa'+idSuffix)) {
			$('lb-success-message-sa'+idSuffix).style.display='block';
		}
		if ($('radar-register-row-sa-lb')) {
			$('radar-register-row-sa-lb').style.display='none';
		}
		if ($('radar-info-row-sa-lb')) {
			$('radar-info-row-sa-lb').style.display='none';
		}
		lbShown = true;
		clearLBTimeout();
		if (typeof hideLbTimeout == 'function') {
			hideLbTimeout(idSuffix);
		}
		setTimeout("hideLb('" + idSuffix + "')",2000);
	}
}
function setupPrLB(vars) {
	PRadar.init({
		productId: vars.prodId,
		condition: "Any",
		originalPrice: vars.origPrice,
		idSuffix: vars.suff,
		ptitle: vars.prodTitle,
		pname: vars.prodName,
		adnode: vars.node,
		decMnyFmt: vars.decFmt,
		source: vars.source,
		lbView: vars.lbView,
		tarPrice: vars.tarPrice,
		titleOverride: vars.titleOverride
	});
}
function openPrLb(vars) {
	setupPrLB(vars);
	if ($('pradar-dontshow' + vars.suff)) {
		$('pradar-dontshow' + vars.suff).style.display = 'none';
	}
	//legacy
	if (typeof clearLBTimeout === "function") {
		lbShown = true;
		clearLBTimeout();
	}
	PRadar.showView();
}
function setPr(vars) {
	setupPrLB(vars);
	PRadar.setAlert();
}
function setupTimedPrLB(vars, timer) {
	setupPrLB(vars);
	PRadar.setTimer(timer);
	PRadar.setLBPop();
}

var PRadar = function() {
	var productId = 0,
		condition = 'ANY',
		originalPrice = 0,
		exp = '',
		idSuffix = '',
		ptitle = 0,
		pname = '',
		adnode = 0,
		decMnyFmt = true, //DECIMAL MONEY FORMAT
		source = '',
		email = '',
		dealEmails = false,
		price = 0,
		moreOptions = [],
		successTO = null,
		lbTO = null,
		lbView = false,
		lbTimer = 999999999,
		lbWasShown = false,
		validEmail,
		validPrice,
		clearErrors,
		setupLightbox,
		teardownLightbox;
	validEmail = function () {
		if (Form.Validator.getValidator('required').test($('pradar-email-input'+idSuffix)) &&
				Form.Validator.getValidator('validate-email').test($('pradar-email-input'+idSuffix))) {
			return true;
		}
		if ($('pradar-email-error'+idSuffix)) {
			$('pradar-email-error'+idSuffix).style.display = 'block';
		} else if ($('pradar-error' + idSuffix)) {
			$('pradar-error' + idSuffix).style.display = 'block';
		}
		PRadar.showView();
		return false;
	};
	validPrice = function () {
		if (Form.Validator.getValidator('required').test($('pradar-price-input'+idSuffix)) &&
				((decMnyFmt && Form.Validator.getValidator('req-greater-zero').test($('pradar-price-input'+idSuffix))) || 
				(!decMnyFmt && Form.Validator.getValidator('req-greater-zero-intl').test($('pradar-price-input'+idSuffix))))) {
			return true;
		}
		$('pradar-price-error'+idSuffix).style.display = 'block';
		PRadar.showView();
		PRadar.showMoreOptions();
		return false;
	};
	clearErrors = function () {
		$('pradar-email-error'+idSuffix).style.display = 'none';
		$('pradar-error' + idSuffix).style.display = 'none';
		$('pradar-price-error'+idSuffix).style.display = 'none';
	};
	setupLightbox = function () {
		if (!lbWasShown && !lbTO) {
			document.addEvents({
				'click': PRadar.setLBPop,
				'scroll': PRadar.setLBPop,
				'mousemove': PRadar.setLBPop,
				'keyup':  PRadar.setLBPop
			});
		}
		if (!lbWasShown) {
			clearTimeout(lbTO);
			lbTO = setTimeout('PRadar.showView()',lbTimer);
		}
	};
	teardownLightbox = function () {
		if (lbTO) {
			document.removeEvents({
				'click': PRadar.setLBPop,
				'scroll': PRadar.setLBPop,
				'mousemove': PRadar.setLBPop,
				'keyup':  PRadar.setLBPop
			});
		}
		clearTimeout(lbTO);
	};
	return {
		init: function(params) {
			productId = params.productId;
			condition = params.condition;
			originalPrice = params.originalPrice;
			exp = params.exp;
			idSuffix = params.idSuffix;
			ptitle = params.ptitle;
			pname = params.pname;
			adnode = params.adnode;
			decMnyFmt = params.decMnyFmt;	
			source = params.source;
			lbView = params.lbView;
			moreOptions = [];
			if (params.titleOverride) {
				$('pradar-title-rust').set('text', params.titleOverride);
			}
			if (lbView) {
				$('pradar-price-input' + idSuffix).value = params.tarPrice;
			}
			teardownLightbox();
		},
		loginSuccess: function(email) {
			if ($('pradar-email-input'+idSuffix)) {
				$('pradar-email-input'+idSuffix).value = email;
			}
			this.setAlert();
		},
		fblogin: function(errorMsg) {
			this.showWait();
			if (validPrice()) {
			    if(!window.isFacebookReady) {
			        if (!errorMsg) { errorMsg = "Please try again in a few seconds."; }
			        alert(errorMsg);
			        PRadar.showFail();
			        return;
			    }
			    ajaxRegister = true;
				FB.login(function(response) {
					if (response.authResponse) {
						if(response.status == "connected"){
							ajaxRegisterFB(PRadar);
						} else {
							PRadar.showFail();
						}
					} else {
						PRadar.showFail();
					}
				}, {scope:'email,user_interests,user_likes'});
			} else {
				$('pradar-price-error'+idSuffix).style.display = 'block';
			}
			return false;
		},
		setAlert: function() {
			this.hideMoreOptions();
			this.showWait();
			email = $('pradar-email-input'+idSuffix).value;
			dealEmails = $('pradar-dealEmails-input'+idSuffix).checked;
			price = $('pradar-price-input'+idSuffix).value;
			$$('#pradar-more-options' + idSuffix + ' input[type=checkbox]').each(function(el) {
				if (el.checked) {
					var selectedOption = encodeURIComponent(el.name + ":" + el.value);
					moreOptions.push(selectedOption);
				}
			});
			
			if (validEmail()) {
				if (validPrice()) {
					var params = 'productId=' + productId +
								'&email=' + email +
								'&condition=' + condition +
								'&curprice=' + originalPrice +
								'&priceStr=' + price +
								'&source=' + source +
								'&dealEmails=' + dealEmails +
								'&moreOptions=' + moreOptions.join(',');
					var radarReq = new Request({
						url: '/radar/price/create',
						method: 'get',
						data: params,
						onSuccess: function(response) {
							var responseJson = JSON.parse(response);
							if (responseJson.error) {
								PRadar.showFail();
							} else {
								PRadar.showSuccess(responseJson);
								var saveUrl = "/personal/module/add/favoriteproducts"+
									"?ptitle="+ptitle
									+"&price="+originalPrice
									+"&annot="+pname
									+"&adnode="+adnode;
								if (typeof populateToolbar === "funcion") {
									populateToolbar(saveUrl,$('favoriteproducts').getPosition().x);
								}
								if (typeof hideChoiceLb === "function") {
									hideChoiceLb();
								}
							}
	
							var d = new Date();
							// set expiry to 10 years
							d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
							setCookie("hasRadar", 'true', d, "/");
						},
						onFailure: function() {
							PRadar.showFail();
						}
					});
					radarReq.send();
				}
			}
		},
		closeLb: function () {
			if (successTO) {
				clearTimeout(successTO);
			}
			this.hideMoreOptions();
			if ($('pradar-lb-bg' + idSuffix)) {
				$('pradar-lb-bg' + idSuffix).style.display = 'none';
			}
			if ($('pradar-lb-ct' + idSuffix)) {
				$('pradar-lb-ct' + idSuffix).style.display = 'none';
			}
			if ($('radar-lb-wait' + idSuffix)) {
				$('radar-lb-wait' + idSuffix).style.display = 'none';
			}
			if ($('radar-lb-success' + idSuffix)) {
				$('radar-lb-success' + idSuffix).style.display = 'none';
			}
		},
		showFail: function () {
			clearErrors();
			$('pradar-error' + idSuffix).style.display = 'block';
			this.showView();
		},
		showSuccess: function (response) {
			var savedItems, item;
			$$('.radar-success-items').each(function(el) {
				savedItems = [];
				savedItems.push(pname);
				response.moreOptions.each( function(item) {
					savedItems.push(item);
				});
				el.set('text', savedItems.join(', '));
			});
			if (lbView && $('radar-lb-success' + idSuffix)) {
				$('pradar-lb-ct' + idSuffix).style.display = 'none';
				$('radar-lb-wait' + idSuffix).style.display = 'none';
				$('radar-lb-success' + idSuffix).style.display = 'block';
				if ($('pradar-inline-in' + idSuffix)) {
					$('pradar-inline-in' + idSuffix).style.display = 'none';
					$('pradar-inline-wait-in' + idSuffix).style.display = 'none';
					$('pradar-inline-success-in' + idSuffix).style.display = 'table-row';
				}
				successTO = setTimeout('PRadar.closeLb()', 2000);
			}
			if ($('pradar-inline-success' + idSuffix)) {
				$('pradar-inline' + idSuffix).style.display = 'none';
				$('pradar-inline-wait' + idSuffix).style.display = 'none';
				$('pradar-inline-success' + idSuffix).style.display = 'table-row';
			}
			this.showLegacySuccess();
		},
		showLegacySuccess: function () {
			if ($('radar-row')) {
				$('radar-row').style.display='none';
			}
			if ($('radar-register-row')) {
				$('radar-register-row').style.display='none';
			}
			if ($('radar-info-row')) {
				$('radar-info-row').style.display='none';
			}
			if ($('radar-row-success')) {
				$('radar-row-success').style.display='';
			}
		},
		showWait: function () {
			if (lbView && $('radar-lb-wait' + idSuffix)) {
				$('pradar-lb-ct' + idSuffix).style.display = 'none';
				$('radar-lb-success' + idSuffix).style.display = 'none';
				$('radar-lb-wait' + idSuffix).style.display = 'block';
			}
			if (!lbView && $('pradar-inline-wait' + idSuffix)) {
				$('pradar-inline' + idSuffix).style.display = 'none';
				$('pradar-inline-success' + idSuffix).style.display = 'none';
				$('pradar-inline-wait' + idSuffix).style.display = 'table-row';
			}
		},
		showView: function () {
			teardownLightbox();
			lbWasShown = true;
			if (lbView) {
				setSessionImpressionCount();
				setGlobalImpressionCount();
			}
			if (lbView && $('pradar-lb-ct' + idSuffix)) {
				$('pradar-lb-bg' + idSuffix).style.display = 'block';
				$('pradar-lb-ct' + idSuffix).style.display = 'block';
				$('radar-lb-wait' + idSuffix).style.display = 'none';
				$('radar-lb-success' + idSuffix).style.display = 'none';
			} else {
				$('pradar-inline' + idSuffix).style.display = 'table-row';
				$('pradar-inline-wait' + idSuffix).style.display = 'none';
				$('pradar-inline-success' + idSuffix).style.display = 'none';
			}
		},
		showMoreOptions: function (suffOverride) {
			var suffix = idSuffix;
			if (suffOverride) {
				suffix = suffOverride;
			}
			if ($('pradar-more-options' + suffix)) {
				$('pradar-more-options' + suffix).style.display = 'block';
			}
		},
		hideMoreOptions: function (suffOverride) {
			var suffix = idSuffix;
			if (suffOverride) {
				suffix = suffOverride;
			}
			if ($('pradar-more-options' + suffix)) {
				$('pradar-more-options' + suffix).style.display = 'none';
			}
		},
		showAdditionalMoreOptions: function (suffOverride) {
			var suffix = idSuffix;
			if (suffOverride) {
				suffix = suffOverride;
			}
			if ($('pradar-more-categories' + suffix)) {
				$('pradar-more-categories' + suffix).style.display = 'none';
			}
			if ($('pradar-hidden-categories' + suffix)) {
				$('pradar-hidden-categories' + suffix).style.display = 'block';
			}
			if ($('pradar-more-brands' + suffix)) {
				$('pradar-more-brands' + suffix).style.display = 'none';
			}
			if ($('pradar-hidden-brands' + suffix)) {
				$('pradar-hidden-brands' + suffix).style.display = 'block';
			}
			if ($('pradar-more-sellers' + suffix)) {
				$('pradar-more-sellers' + suffix).style.display = 'none';
			}
			if ($('pradar-hidden-sellers' + suffix)) {
				$('pradar-hidden-sellers' + suffix).style.display = 'block';
			}
		},
		dontShow: function () {
			var d = new Date();
			// set expiry to 10 years
			d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
			setCookie("nextag.suppressLightbox", "true", d, "/");
			this.closeLb();
		},
		setTimer: function (timer) {
			lbTimer = timer;
		},
		setLBPop: function () {
			setupLightbox();
		},
		clearTimedLB: function () {
			//privded as a means for legacy radar to clear this timer if necessary
			teardownLightbox();
		}
	};
}();
function setupSrLB(vars) {
	SRadar.init({
		search: vars.search,
		alias: vars.alias,
		filter: vars.filter,
		freq: vars.freq,
		idSuffix: vars.idSuffix,
		source: vars.source,
		lbView: vars.lbView,
		titleOverride: vars.titleOverride
	});
}
function openSrLb(vars) {
	setupSrLB(vars);
	if ($('sradar-dontshow' + vars.idSuffix)) {
		$('sradar-dontshow' + vars.idSuffix).style.display = 'none';
	}
	//legacy
	if (typeof clearLBTimeout === "function") {
		lbShown = true;
		clearLBTimeout();
	}
	SRadar.showView();
}

function setSr(vars) {
	setupSrLB(vars);
	SRadar.setAlert();
}
function setupTimedSrLB(vars, timer) {
	setupSrLB(vars);
	SRadar.setTimer(timer);
	SRadar.setLBPop();
}

var SRadar = function() {
	var search = '',
		alias = '',
		filter = '',
		freq = 'WEEK',
		idSuffix = '',
		source = '',
		email = '',
		dealsEmail = false,
		moreOptions = [],
		successTO = null,
		lbTO = null,
		lbView = false,
		lbTimer = 999999999,
		lbWasShown = false,
		validEmail,
		clearErrors,
		setupLightbox,
		teardownLightbox;
	validEmail = function () {
		if (Form.Validator.getValidator('required').test($('sradar-email-input'+idSuffix)) &&
			Form.Validator.getValidator('validate-email').test($('sradar-email-input'+idSuffix))) {
			return true;
		}
		$('sradar-email-error'+idSuffix).style.display = 'block';
		if (lbView) {
			SRadar.showView()
		}
		return false;
	};
	clearErrors = function () {
		$('sradar-email-error'+idSuffix).style.display = 'none';
		$('sradar-error' + idSuffix).style.display = 'none';
	};
	setupLightbox = function () {
		if (!lbWasShown && !lbTO) {
			document.addEvents({
				'click': SRadar.setLBPop,
				'scroll': SRadar.setLBPop,
				'mousemove': SRadar.setLBPop,
				'keyup':  SRadar.setLBPop
			});
		}
		if (!lbWasShown) {
			clearTimeout(lbTO);
			lbTO = setTimeout('SRadar.showView()',lbTimer);
		}
	};
	teardownLightbox = function () {
		if (lbTO) {
			document.removeEvents({
				'click': SRadar.setLBPop,
				'scroll': SRadar.setLBPop,
				'mousemove': SRadar.setLBPop,
				'keyup':  SRadar.setLBPop
			});
		}
		clearTimeout(lbTO);
	};
	return {
		init: function(params) {
			this.closeLb();
			search = params.search;
			alias = params.alias;
			filter = params.filter;
			freq = params.freq;
			idSuffix = params.idSuffix;
			source = params.source;
			lbView = params.lbView;
			moreOptions = [];
			if (params.titleOverride) {
				$('sradar-title-rust').set('text', params.titleOverride);
			}
			teardownLightbox();
		},
		loginSuccess: function(email) {
			if ($('sradar-email-input'+idSuffix)) {
				$('sradar-email-input'+idSuffix).value = email;
			}
			this.setAlert();
		},
		fblogin: function(errorMsg) {
			this.showWait();
		    if(!window.isFacebookReady) {
		        if (!errorMsg) { errorMsg = "Please try again in a few seconds."; }
		        alert(errorMsg);
		        SRadar.showFail();
		        return;
		    }
		    ajaxRegister = true;
			FB.login(function(response) {
				if (response.authResponse) {
					if(response.status == "connected"){
						ajaxRegisterFB(SRadar);
					} else {
						SRadar.showFail();
					}
				} else {
					SRadar.showFail();
				}
			}, {scope:'email,user_interests,user_likes'});
			return false;
		},
		saveFavoriteSearch: function() {
			if (typeof populateToolbar === 'function') {
				var saveUrl = '/personal/module/add/favoritesearches' + '?search=' + search + '&alias=' + alias + '&fsfilter=' + filter + '&adnode=0';
				populateToolbar(saveUrl,$('favoritesearches').getPosition().x);
			}
		},
		setAlert: function() {
			this.hideMoreOptions();
			this.showWait();
			var email = $('sradar-email-input'+idSuffix).value;
			var dealEmails = $('sradar-dealEmails-input'+idSuffix).checked;
			if ($('radar-frequency' + idSuffix)) {
				freq = $('radar-frequency' + idSuffix).getSelected()[0].value;
			}
			$$('#sradar-more-options' + idSuffix + ' input[type=checkbox]').each(function(el) {
				if (el.checked) {
					var selectedOption = encodeURIComponent(el.name + ":" + el.value);
					moreOptions.push(selectedOption);
				}
			});
			
			if (validEmail()) {
				var params = 'search=' + search +
							'&alias=' + alias +
							'&fsfilter=' + filter +
							'&freq=' + freq +
							'&email=' + email +
							'&source=' + source +
							'&dealEmails=' + dealEmails +
							'&moreOptions=' + moreOptions.join(',');
				var radarReq = new Request({
					url: '/radar/search/create',
					method: 'get',
					data: params,
					onSuccess: function(response) {
						var responseJson = JSON.parse(response);
						if (responseJson.error) {
							SRadar.showFail();
						} else {
							SRadar.showSuccess(responseJson);
							SRadar.saveFavoriteSearch();
							SRadar.showLegacySuccess();
						}
	
						var d = new Date();
						// set expiry to 10 years
						d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
						setCookie("hasRadar", 'true', d, "/");
					},
					onFailure: function() {
						SRadar.showFail();
					}
				});
				radarReq.send();
			}
		},
		closeLb: function () {
			lbView = false;
			if (successTO) {
				clearTimeout(successTO);
			}
			this.hideMoreOptions();
			if ($('sradar-lb-bg' + idSuffix)) {
				$('sradar-lb-bg' + idSuffix).style.display = 'none';
			}
			if ($('sradar-lb-ct' + idSuffix)) {
				$('sradar-lb-ct' + idSuffix).style.display = 'none';
			}
			if ($('radar-lb-wait' + idSuffix)) {
				$('radar-lb-wait' + idSuffix).style.display = 'none';
			}
			if ($('radar-lb-success' + idSuffix)) {
				$('radar-lb-success' + idSuffix).style.display = 'none';
			}
		},
		showFail: function () {
			clearErrors();
			$('sradar-error' + idSuffix).style.display = 'block';
			this.showView();
		},
		showSuccess: function (response) {
			var savedItems, item;
			$$('.radar-success-items').each(function(el) {
				savedItems = [];
				savedItems.push(search);
				response.moreOptions.each(function(item) {
					savedItems.push(item);
				});
				el.set('text', savedItems.join(', '));
			});
			if ($('radar-lb-success' + idSuffix) && lbView) {
				$('radar-lb-wait' + idSuffix).style.display = 'none';
				$('radar-lb-success' + idSuffix).style.display = 'block';
				successTO = setTimeout('SRadar.closeLb()', 2000);
			}
		},
		showWait: function () {
			if ($('radar-lb-wait' + idSuffix) && lbView) {
				$('sradar-lb-ct' + idSuffix).style.display = 'none';
				$('radar-lb-wait' + idSuffix).style.display = 'block';
			}
		},
		showView: function () {
			teardownLightbox();
			lbWasShown = true;
			if (lbView) {
				setSessionImpressionCount();
				setGlobalImpressionCount();
			}
			$('sradar-lb-bg' + idSuffix).style.display = 'block';
			$('sradar-lb-ct' + idSuffix).style.display = 'block';
			$('radar-lb-wait' + idSuffix).style.display = 'none';
			$('radar-lb-success' + idSuffix).style.display = 'none';
		},
		showLegacySuccess: function () {
			if ($('radar-register')) {
				$('radar-register').style.display = 'none';
			}
			if ($('radar-register-row-sa'+idSuffix)) {
				$('radar-register-row-sa'+idSuffix).style.display='none';
			}
			if ($('radar-info-row-sa'+idSuffix)) {
				$('radar-info-row-sa'+idSuffix).style.display='none';
			}
			if ($('radar-saved')) {
				$('radar-saved').style.display = 'block';
			}
		},
		showMoreOptions: function () {
			if ($('sradar-more-options' + idSuffix)) {
				$('sradar-more-options' + idSuffix).style.display = 'block';
			}
		},
		hideMoreOptions: function () {
			if ($('sradar-more-options' + idSuffix)) {
				$('sradar-more-options' + idSuffix).style.display = 'none';
			}
		},
		showAdditionalMoreOptions: function () {
			if ($('sradar-more-categories' + idSuffix)) {
				$('sradar-more-categories' + idSuffix).style.display = 'none';
			}
			if ($('sradar-hidden-categories' + idSuffix)) {
				$('sradar-hidden-categories' + idSuffix).style.display = 'block';
			}
			if ($('sradar-more-brands' + idSuffix)) {
				$('sradar-more-brands' + idSuffix).style.display = 'none';
			}
			if ($('sradar-hidden-brands' + idSuffix)) {
				$('sradar-hidden-brands' + idSuffix).style.display = 'block';
			}
			if ($('sradar-more-sellers' + idSuffix)) {
				$('sradar-more-sellers' + idSuffix).style.display = 'none';
			}
			if ($('sradar-hidden-sellers' + idSuffix)) {
				$('sradar-hidden-sellers' + idSuffix).style.display = 'block';
			}
		},
		dontShow: function () {
			var d = new Date();
			// set expiry to 10 years
			d.setTime( d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000 );
			setCookie("nextag.suppressLightbox", "true", d, "/");
			this.closeLb();
		},
		setTimer: function (timer) {
			lbTimer = timer;
		},
		setLBPop: function () {
			setupLightbox();
		},
		clearTimedLB: function () {
			//privded as a means for legacy radar to clear this timer if necessary
			teardownLightbox();
		}
	};
}();

