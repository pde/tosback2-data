
/*
 * jQuery 1.2.2 - New Wave Javascript
 *
 * Copyright (c) 2007 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-01-14 17:56:07 -0500 (Mon, 14 Jan 2008) $
 * $Rev: 4454 $
 */

(function(){if(window.jQuery)var _jQuery=window.jQuery;var jQuery=window.jQuery=function(selector,context){return new jQuery.prototype.init(selector,context)};if(window.$)var _$=window.$;window.$=jQuery;var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;var isSimple=/^.[^:#\[\.]*$/;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this}else if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem)if(elem.id!=match[3])return jQuery().find(selector);else{this[0]=elem;this.length=1;return this}else selector=[]}}else return new jQuery(context).find(selector)}else if(jQuery.isFunction(selector))return new jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(selector.constructor==Array&&selector||(selector.jquery||selector.length&&selector!=window&&!selector.nodeType&&selector[0]!=undefined&&selector[0].nodeType)&&jQuery.makeArray(selector)||[selector])},jquery:"1.2.2",size:function(){return this.length},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)},index:function(elem){var ret=-1;this.each(function(i){if(this==elem)ret=i});return ret},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value==undefined)return this.length&&jQuery[type||"attr"](this[0],name)||undefined;else{options={};options[name]=value}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))})},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS")},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])})});return ret},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem}).append(this);return this},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem)})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild)})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)})},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div"),container2=document.createElement("div");container.appendChild(clone);container2.innerHTML=container.innerHTML;return container2.firstChild}else return this.cloneNode(true)});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)});return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector})},add:function(selector){return!selector?this:this.pushStack(jQuery.merge(this.get(),selector.constructor==String?jQuery(selector).get():selector.length!=undefined&&(!selector.nodeName||jQuery.nodeName(selector,"form"))?selector:[selector]))},is:function(selector){return selector?jQuery.multiFilter(selector,this).length>0:false},hasClass:function(selector){return this.is("."+selector)},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value)}}return values}else return(this[0].value||"").replace(/\r/g,"")}return undefined}return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=value.constructor==Array?value:[value];jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)});if(!values.length)this.selectedIndex=-1}else this.value=value})},html:function(value){return value==undefined?(this.length?this[0].innerHTML:null):this.empty().append(value)},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse()}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)}else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.prototype.init.prototype=jQuery.prototype;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem)}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function")target={};if(length==1){target=this;i=0}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){if(target===options[name])continue;if(deep&&options[name]&&typeof options[name]=="object"&&target[name]&&!options[name].nodeType)target[name]=jQuery.extend(target[name],options[name]);else if(options[name]!=undefined)target[name]=options[name]}return target};var expando="jQuery"+(new Date()).getTime(),uuid=0,windowData={};var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/function/i.test(fn+"")},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else script.appendChild(document.createTextNode(data));head.appendChild(script);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!=undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem)}}else{try{delete elem[expando]}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando)}delete jQuery.cache[id]}},each:function(object,callback,args){if(args){if(object.length==undefined){for(var name in object)if(callback.apply(object[name],args)===false)break}else for(var i=0,length=object.length;i<length;i++)if(callback.apply(object[i],args)===false)break}else{if(object.length==undefined){for(var name in object)if(callback.call(object[name],name,object[name])===false)break}else for(var i=0,length=object.length,value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className})},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className)}).join(" "):""},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]}callback.call(elem);for(var name in options)elem.style[name]=old[name]},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)}if(jQuery(elem).is(":visible"))getWH();else jQuery.swap(elem,props,getWH);return Math.max(0,val)}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret;function color(elem){if(!jQuery.browser.safari)return false;var ret=document.defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")==""}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(elem.style,"opacity");return ret==""?"1":ret}if(jQuery.browser.opera&&name=="display"){var save=elem.style.display;elem.style.display="block";elem.style.display=save}if(name.match(/float/i))name=styleFloat;if(!force&&elem.style&&elem.style[name])ret=elem.style[name];else if(document.defaultView&&document.defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var getComputedStyle=document.defaultView.getComputedStyle(elem,null);if(getComputedStyle&&!color(elem))ret=getComputedStyle.getPropertyValue(name);else{var swap=[],stack=[];for(var a=elem;a&&color(a);a=a.parentNode)stack.unshift(a);for(var i=0;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block"}ret=name=="display"&&swap[stack.length-1]!=null?"none":(getComputedStyle&&getComputedStyle.getPropertyValue(name))||"";for(var i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i]}if(name=="opacity"&&ret=="")ret="1"}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var style=elem.style.left,runtimeStyle=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;elem.style.left=ret||0;ret=elem.style.pixelLeft+"px";elem.style.left=style;elem.runtimeStyle.left=runtimeStyle}}return ret},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem=elem.toString();if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else ret=jQuery.merge(ret,elem)});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var fix=jQuery.isXMLDoc(elem)?{}:jQuery.props;if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(fix[name]){if(value!=undefined)elem[fix[name]]=value;return elem[fix[name]]}else if(jQuery.browser.msie&&name=="style")return jQuery.attr(elem.style,"cssText",value);else if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method"))return elem.getAttributeNode(name).nodeValue;else if(elem.tagName){if(value!=undefined){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem.setAttribute(name,""+value)}if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem))return elem.getAttribute(name,2);return elem.getAttribute(name)}else{if(name=="opacity"&&jQuery.browser.msie){if(value!=undefined){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(value).toString()=="NaN"?"":"alpha(opacity="+value*100+")")}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100).toString():""}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});if(value!=undefined)elem[name]=value;return elem[name]}},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")},makeArray:function(array){var ret=[];if(typeof array!="array")for(var i=0,length=array.length;i<length;i++)ret.push(array[i]);else ret=array.slice(0);return ret},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]==elem)return i;return-1},merge:function(first,second){if(jQuery.browser.msie){for(var i=0;second[i];i++)if(second[i].nodeType!=8)first.push(second[i])}else for(var i=0;second[i];i++)first.push(second[i]);return first},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){if(typeof callback=="string")callback=eval("false||function(a,i){return "+callback+"}");var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv&&callback(elems[i],i)||inv&&!callback(elems[i],i))ret.push(elems[i]);return ret},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!==null&&value!=undefined){if(value.constructor!=Array)value=[value];ret=ret.concat(value)}}return ret}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected",maxlength:"maxLength",selectedIndex:"selectedIndex",defaultValue:"defaultValue",tagName:"tagName",nodeName:"nodeName"}});jQuery.each({parent:"elem.parentNode",parents:"jQuery.dir(elem,'parentNode')",next:"jQuery.nth(elem,2,'nextSibling')",prev:"jQuery.nth(elem,2,'previousSibling')",nextAll:"jQuery.dir(elem,'nextSibling')",prevAll:"jQuery.dir(elem,'previousSibling')",siblings:"jQuery.sibling(elem.parentNode.firstChild,elem)",children:"jQuery.sibling(elem.firstChild)",contents:"jQuery.nodeName(elem,'iframe')?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)"},function(name,fn){fn=eval("false||function(elem){return "+fn+"}");jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret))}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this)})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name)},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this)});if(this.parentNode)this.parentNode.removeChild(this)}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild)}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")}});var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":"m[2]=='*'||jQuery.nodeName(a,m[2])","#":"a.getAttribute('id')==m[2]",":":{lt:"i<m[3]-0",gt:"i>m[3]-0",nth:"m[3]-0==i",eq:"m[3]-0==i",first:"i==0",last:"i==r.length-1",even:"i%2==0",odd:"i%2","first-child":"a.parentNode.getElementsByTagName('*')[0]==a","last-child":"jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a","only-child":"!jQuery.nth(a.parentNode.lastChild,2,'previousSibling')",parent:"a.firstChild",empty:"!a.firstChild",contains:"(a.textContent||a.innerText||jQuery(a).text()||'').indexOf(m[3])>=0",visible:'"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',hidden:'"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',enabled:"!a.disabled",disabled:"a.disabled",checked:"a.checked",selected:"a.selected||jQuery.attr(a,'selected')",text:"'text'==a.type",radio:"'radio'==a.type",checkbox:"'checkbox'==a.type",file:"'file'==a.type",password:"'password'==a.type",submit:"'submit'==a.type",image:"'image'==a.type",reset:"'reset'==a.type",button:'"button"==a.type||jQuery.nodeName(a,"button")',input:"/input|select|textarea|button/i.test(a.nodeName)",has:"jQuery.find(m[3],a).length",header:"/h\\d/i.test(a.nodeName)",animated:"jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length"}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r)}return cur},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false;var re=quickChild;var m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n)}if(m=="+")break}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag))}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break}r=tmp}ret=r}t=t.replace(re2,"")}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i])}return tmp},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a)}r=tmp}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last)add=true}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node)}r=tmp}else{var f=jQuery.expr[m[1]];if(typeof f!="string")f=jQuery.expr[m[1]][m[2]];f=eval("false||function(a,i){return "+f+"}");r=jQuery.grep(r,f,not)}}return{r:r,t:t}},dir:function(elem,dir){var matched=[];var cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem))r.push(n)}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval!=undefined)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=function(){return fn.apply(this,arguments)};handler.data=data;handler.guid=fn.guid}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){var val;if(typeof jQuery=="undefined"||jQuery.event.triggered)return val;val=jQuery.event.handle.apply(arguments.callee.elem,arguments);return val});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle)}}handlers[handler.guid]=handler;jQuery.event.global[type]=true});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined)for(var type in events)this.remove(elem,type);else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"))}ret=null;delete events[type]}}})}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data||[]);if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data)}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event)data.unshift(this.fix({type:type,target:elem}));data[0].type=type;if(jQuery.isFunction(jQuery.data(elem,"handle")))val=jQuery.data(elem,"handle").apply(elem,data);if(!fn&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val;event=jQuery.event.fix(event||window.event||{});var parts=event.type.split(".");event.type=parts[0];var handlers=jQuery.data(this,"events")&&jQuery.data(this,"events")[event.type],args=Array.prototype.slice.call(arguments,1);args.unshift(event);for(var j in handlers){var handler=handlers[j];args[0].handler=handler;args[0].data=handler.data;if(!parts[1]||handler.type==parts[1]){var ret=handler.apply(this,args);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation()}}}if(jQuery.browser.msie)event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null;return val},fix:function(event){var originalEvent=event;event=jQuery.extend({},originalEvent);event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true};if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=originalEvent.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event},special:{ready:{setup:function(){bindReady();return},teardown:function(){return}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true},handler:function(event){if(withinElement(event,this))return true;arguments[0].type="mouseenter";return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true},handler:function(event){if(withinElement(event,this))return true;arguments[0].type="mouseleave";return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)})},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);return(fn||data).apply(this,arguments)},fn&&data)})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)})},triggerHandler:function(type,data,fn){if(this[0])return jQuery.event.trigger(type,data,this[0],false,fn);return undefined},toggle:function(){var args=arguments;return this.click(function(event){this.lastToggle=0==this.lastToggle?1:0;event.preventDefault();return args[this.lastToggle].apply(this,arguments)||false})},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut)},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else jQuery.readyList.push(function(){return fn.call(this,jQuery)});return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document)});jQuery.readyList=null}jQuery(document).triggerHandler("ready")}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}jQuery.ready()})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}jQuery.ready()},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return}jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode}catch(error){parent=elem}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()});jQuery.fn.extend({load:function(url,params,callback){if(jQuery.isFunction(url))return this.bind("load",url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null}else{params=jQuery.param(params);type="POST"}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)}});var jsc=(new Date).getTime();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){var jsonp,jsre=/=\?(&|$)/g,status,data;s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(s.type.toLowerCase()=="get"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head)head.removeChild(script)}}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&s.type.toLowerCase()=="get"){var ts=(new Date()).getTime();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")}if(s.data&&s.type.toLowerCase()=="get"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");if((!s.url.indexOf("http")||!s.url.indexOf("//"))&&(s.dataType=="script"||s.dataType=="json")&&s.type.toLowerCase()=="get"){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined}var requestDone=false;var xml=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();xml.open(s.type,s.url,s.async,s.username,s.password);try{if(s.data)xml.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xml.setRequestHeader("X-Requested-With","XMLHttpRequest");xml.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend)s.beforeSend(xml);if(s.global)jQuery.event.trigger("ajaxSend",[xml,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xml)&&"error"||s.ifModified&&jQuery.httpNotModified(xml,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xml,s.dataType)}catch(e){status="parsererror"}}if(status=="success"){var modRes;try{modRes=xml.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success()}else jQuery.handleError(s,xml,status);complete();if(s.async)xml=null}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xml){xml.abort();if(!requestDone)onreadystatechange("timeout")}},s.timeout)}try{xml.send(s.data)}catch(e){jQuery.handleError(s,xml,null,e)}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xml,s])}function complete(){if(s.complete)s.complete(xml,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xml,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop")}return xml},handleError:function(s,xml,status,e){if(s.error)s.error(xml,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xml,s,e])},active:0,httpSuccess:function(r){try{return!r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||r.status==1223||jQuery.browser.safari&&r.status==undefined}catch(e){}return false},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined}catch(e){}return false},httpData:function(r,type){var ct=r.getResponseHeader("content-type");var xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0;var data=xml?r.responseXML:r.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))});else for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))});else s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]));return s.join("&").replace(/%20/g,"+")}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall);var hidden=jQuery(this).is(":hidden"),self=this;for(var p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return jQuery.isFunction(opt.complete)&&opt.complete.apply(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit)}else e.custom(start,val,"")}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx"}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.apply(this)}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1)}});if(!gotoEnd)this.dequeue();return this}});var queue=function(elem,type,array){if(!elem)return undefined;type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",array?jQuery.makeArray(array):[]);return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].apply(this)})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.apply(this)};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={}}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.apply(this.elem,[this.now,this]);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block"},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0},custom:function(from,to,unit){this.startTime=(new Date()).getTime();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=(new Date()).getTime();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block"}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p])}if(done&&jQuery.isFunction(this.options.complete))this.options.complete.apply(this.elem);return false}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.fx.step={scrollLeft:function(fx){fx.elem.scrollLeft=fx.now},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}};jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522,fixed=jQuery.css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&jQuery.css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(jQuery.css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&jQuery.css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode}if((safari2&&(fixed||jQuery.css(offsetChild,"position")=="absolute"))||(mozilla&&jQuery.css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))}results={top:top,left:left}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))}function add(l,t){left+=parseInt(l)||0;top+=parseInt(t)||0}return results}})();

/*
 * jqModal - Minimalist Modaling with jQuery
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.17 +r11
 * 
 */
(function($){$.fn.jqm=function(o){var _o={zIndex:3000,overlay:50,overlayClass:'jqmOverlay',closeClass:'jqmClose',trigger:'.jqModal',ajax:false,target:false,modal:false,toTop:false,onShow:false,onHide:false,onLoad:false};return this.each(function(){if(this._jqm)return;s++;this._jqm=s;H[s]={c:$.extend(_o,o),a:false,w:$(this).addClass('jqmID'+s),s:s};if(_o.trigger)$(this).jqmAddTrigger(_o.trigger)})};$.fn.jqmAddClose=function(e){hs(this,e,'jqmHide');return this};$.fn.jqmAddTrigger=function(e){hs(this,e,'jqmShow');return this};$.fn.jqmShow=function(t){return this.each(function(){if(!H[this._jqm].a)$.jqm.open(this._jqm,t)})};$.fn.jqmHide=function(t){return this.each(function(){if(H[this._jqm].a)$.jqm.close(this._jqm,t)})};$.jqm={hash:{},open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(/^\d+$/.test(h.w.css('z-index')))?h.w.css('z-index'):c.zIndex,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});h.t=t;h.a=true;h.w.css('z-index',z);if(c.modal){if(!A[0])F('bind');A.push(s);o.css('cursor','wait')}else if(c.overlay>0)h.w.jqmAddClose(o);else o=false;h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):false;if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in{Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'")}}if(c.ajax){var r=c.target||h.w,u=c.ajax,r=(typeof r=='string')?$(r,h.w):$(r),u=(u.substr(0,1)=='@')?$(t).attr(u.substring(1)):u;r.load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h)})}else if(cc)h.w.jqmAddClose($(cc,h.w));if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);(c.onShow)?c.onShow(h):h.w.show();e(h);return false},close:function(s){var h=H[s];h.a=false;if(A[0]){A.pop();if(!A[0])F('unbind')}if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove()}return false}};var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version=="6.0"),i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i);f(h)},f=function(h){try{$(':input:visible',h.w)[0].focus()}catch(e){}},F=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m)},m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return!r},hs=function(w,e,y){var s=[];w.each(function(){s.push(this._jqm)});$(e).each(function(){if(this[y])$.extend(this[y],s);else{this[y]=s;$(this).click(function(){for(var i in{jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return false})}})}})(jQuery);


/*
 * jQuery blockUI plugin
 * Version 1.33  (09/14/2007)
 * @requires jQuery v1.1.1
 *
 * $Id$
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
 (function($){$.blockUI=function(msg,css,opts){$.blockUI.impl.install(window,msg,css,opts)};$.blockUI.version=1.33;$.unblockUI=function(opts){$.blockUI.impl.remove(window,opts)};$.fn.block=function(msg,css,opts){return this.each(function(){if(!this.$pos_checked){if($.css(this,"position")=='static')this.style.position='relative';if($.browser.msie)this.style.zoom=1;this.$pos_checked=1}$.blockUI.impl.install(this,msg,css,opts)})};$.fn.unblock=function(opts){return this.each(function(){$.blockUI.impl.remove(this,opts)})};$.fn.displayBox=function(css,fn,isFlash){var msg=this[0];if(!msg)return;var $msg=$(msg);css=css||{};var w=$msg.width()||$msg.attr('width')||css.width||$.blockUI.defaults.displayBoxCSS.width;var h=$msg.height()||$msg.attr('height')||css.height||$.blockUI.defaults.displayBoxCSS.height;if(w[w.length-1]=='%'){var ww=document.documentElement.clientWidth||document.body.clientWidth;w=parseInt(w)||100;w=(w*ww)/100}if(h[h.length-1]=='%'){var hh=document.documentElement.clientHeight||document.body.clientHeight;h=parseInt(h)||100;h=(h*hh)/100}var ml='-'+parseInt(w)/2+'px';var mt='-'+parseInt(h)/2+'px';var ua=navigator.userAgent.toLowerCase();var opts={displayMode:fn||1,noalpha:isFlash&&/mac/.test(ua)&&/firefox/.test(ua)};$.blockUI.impl.install(window,msg,{width:w,height:h,marginTop:mt,marginLeft:ml},opts)};$.blockUI.defaults={pageMessage:'<h1>Please wait...</h1>',elementMessage:'',overlayCSS:{backgroundColor:'#fff',opacity:'0.5'},pageMessageCSS:{width:'250px',margin:'-50px 0 0 -125px',top:'50%',left:'50%',textAlign:'center',color:'#000',backgroundColor:'#fff',border:'3px solid #aaa'},elementMessageCSS:{width:'250px',padding:'10px',textAlign:'center',backgroundColor:'#fff'},displayBoxCSS:{width:'400px',height:'400px',top:'50%',left:'50%'},ie6Stretch:1,allowTabToLeave:0,closeMessage:'Click to close',fadeOut:1,fadeTime:400};$.blockUI.impl={box:null,boxCallback:null,pageBlock:null,pageBlockEls:[],op8:window.opera&&window.opera.version()<9,ie6:$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent),install:function(el,msg,css,opts){opts=opts||{};this.boxCallback=typeof opts.displayMode=='function'?opts.displayMode:null;this.box=opts.displayMode?msg:null;var full=(el==window);var noalpha=this.op8||$.browser.mozilla&&/Linux/.test(navigator.platform);if(typeof opts.alphaOverride!='undefined')noalpha=opts.alphaOverride==0?1:0;if(full&&this.pageBlock)this.remove(window,{fadeOut:0});if(msg&&typeof msg=='object'&&!msg.jquery&&!msg.nodeType){css=msg;msg=null}msg=msg?(msg.nodeType?$(msg):msg):full?$.blockUI.defaults.pageMessage:$.blockUI.defaults.elementMessage;if(opts.displayMode)var basecss=jQuery.extend({},$.blockUI.defaults.displayBoxCSS);else var basecss=jQuery.extend({},full?$.blockUI.defaults.pageMessageCSS:$.blockUI.defaults.elementMessageCSS);css=jQuery.extend(basecss,css||{});var f=($.browser.msie)?$('<iframe class="blockUI" style="z-index:1000;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="javascript:false;"></iframe>'):$('<div class="blockUI" style="display:none"></div>');var w=$('<div class="blockUI" style="z-index:1001;cursor:wait;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var m=full?$('<div class="blockUI blockMsg" style="z-index:1002;cursor:wait;padding:0;position:fixed"></div>'):$('<div class="blockUI" style="display:none;z-index:1002;cursor:wait;position:absolute"></div>');w.css('position',full?'fixed':'absolute');if(msg)m.css(css);if(!noalpha)w.css($.blockUI.defaults.overlayCSS);if(this.op8)w.css({width:''+el.clientWidth,height:''+el.clientHeight});if($.browser.msie)f.css('opacity','0.0');$([f[0],w[0],m[0]]).appendTo(full?'body':el);var expr=$.browser.msie&&(!$.boxModel||$('object,embed',full?null:el).length>0);if(this.ie6||expr){if(full&&$.blockUI.defaults.ie6Stretch&&$.boxModel)$('html,body').css('height','100%');if((this.ie6||!$.boxModel)&&!full){var t=this.sz(el,'borderTopWidth'),l=this.sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0}$.each([f,w,m],function(i,o){var s=o[0].style;s.position='absolute';if(i<2){full?s.setExpression('height','document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + "px"'):s.setExpression('height','this.parentNode.offsetHeight + "px"');full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT)}else{if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0}})}if(opts.displayMode){w.css('cursor','default').attr('title',$.blockUI.defaults.closeMessage);m.css('cursor','default');$([f[0],w[0],m[0]]).removeClass('blockUI').addClass('displayBox');$().click($.blockUI.impl.boxHandler).bind('keypress',$.blockUI.impl.boxHandler)}else this.bind(1,el);m.append(msg).show();if(msg.jquery)msg.show();if(opts.displayMode)return;if(full){this.pageBlock=m[0];this.pageBlockEls=$(':input:enabled:visible',this.pageBlock);setTimeout(this.focus,20)}else this.center(m[0])},remove:function(el,opts){var o=$.extend({},$.blockUI.defaults,opts);this.bind(0,el);var full=el==window;var els=full?$('body').children().filter('.blockUI'):$('.blockUI',el);if(full)this.pageBlock=this.pageBlockEls=null;if(o.fadeOut){els.fadeOut(o.fadeTime,function(){if(this.parentNode)this.parentNode.removeChild(this)})}else els.remove()},boxRemove:function(el){$().unbind('click',$.blockUI.impl.boxHandler).unbind('keypress',$.blockUI.impl.boxHandler);if(this.boxCallback)this.boxCallback(this.box);$('body .displayBox').hide().remove()},handler:function(e){if(e.keyCode&&e.keyCode==9){if($.blockUI.impl.pageBlock&&!$.blockUI.defaults.allowTabToLeave){var els=$.blockUI.impl.pageBlockEls;var fwd=!e.shiftKey&&e.target==els[els.length-1];var back=e.shiftKey&&e.target==els[0];if(fwd||back){setTimeout(function(){$.blockUI.impl.focus(back)},10);return false}}}if($(e.target).parents('div.blockMsg').length>0)return true;return $(e.target).parents().children().filter('div.blockUI').length==0},boxHandler:function(e){if((e.keyCode&&e.keyCode==27)||(e.type=='click'&&$(e.target).parents('div.blockMsg').length==0))$.blockUI.impl.boxRemove();return true},bind:function(b,el){var full=el==window;if(!b&&(full&&!this.pageBlock||!full&&!el.$blocked))return;if(!full)el.$blocked=b;var $e=$(el).find('a,:input');$.each(['mousedown','mouseup','keydown','keypress','click'],function(i,o){$e[b?'bind':'unbind'](o,$.blockUI.impl.handler)})},focus:function(back){if(!$.blockUI.impl.pageBlockEls)return;var e=$.blockUI.impl.pageBlockEls[back===true?$.blockUI.impl.pageBlockEls.length-1:0];if(e)e.focus()},center:function(el){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-this.sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-this.sz(p,'borderTopWidth');s.left=l>0?(l+'px'):'0';s.top=t>0?(t+'px'):'0'},sz:function(el,p){return parseInt($.css(el,p))||0}}})(jQuery);




/* Copyright (c) 2007 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.2
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(4($){$.R($.7,{3:4(c,b,d){9 e=2,q;5($.O(c))d=b,b=c,c=z;$.h($.3.j,4(i,a){5(e.8==a.8&&e.g==a.g&&c==a.m&&(!b||b.$6==a.7.$6)&&(!d||d.$6==a.o.$6))l(q=a)&&v});q=q||Y $.3(2.8,2.g,c,b,d);q.u=v;$.3.s(q.F);l 2},T:4(c,b,d){9 e=2;5($.O(c))d=b,b=c,c=z;$.h($.3.j,4(i,a){5(e.8==a.8&&e.g==a.g&&(!c||c==a.m)&&(!b||b.$6==a.7.$6)&&(!d||d.$6==a.o.$6)&&!2.u)$.3.y(a.F)});l 2}});$.3=4(e,c,a,b,d){2.8=e;2.g=c||S;2.m=a;2.7=b;2.o=d;2.t=[];2.u=v;2.F=$.3.j.K(2)-1;b.$6=b.$6||$.3.I++;5(d)d.$6=d.$6||$.3.I++;l 2};$.3.p={y:4(){9 b=2;5(2.m)2.t.16(2.m,2.7);E 5(2.o)2.t.h(4(i,a){b.o.x(a)});2.t=[];2.u=Q},s:4(){5(2.u)l;9 b=2;9 c=2.t,w=$(2.8,2.g),H=w.11(c);2.t=w;5(2.m){H.10(2.m,2.7);5(c.C>0)$.h(c,4(i,a){5($.B(a,w)<0)$.Z.P(a,b.m,b.7)})}E{H.h(4(){b.7.x(2)});5(2.o&&c.C>0)$.h(c,4(i,a){5($.B(a,w)<0)b.o.x(a)})}}};$.R($.3,{I:0,j:[],k:[],A:v,D:X,N:4(){5($.3.A&&$.3.k.C){9 a=$.3.k.C;W(a--)$.3.j[$.3.k.V()].s()}},U:4(){$.3.A=v},M:4(){$.3.A=Q;$.3.s()},L:4(){$.h(G,4(i,n){5(!$.7[n])l;9 a=$.7[n];$.7[n]=4(){9 r=a.x(2,G);$.3.s();l r}})},s:4(b){5(b!=z){5($.B(b,$.3.k)<0)$.3.k.K(b)}E $.h($.3.j,4(a){5($.B(a,$.3.k)<0)$.3.k.K(a)});5($.3.D)1j($.3.D);$.3.D=1i($.3.N,1h)},y:4(b){5(b!=z)$.3.j[b].y();E $.h($.3.j,4(a){$.3.j[a].y()})}});$.3.L(\'1g\',\'1f\',\'1e\',\'1b\',\'1a\',\'19\',\'18\',\'17\',\'1c\',\'15\',\'1d\',\'P\');$(4(){$.3.M()});9 f=$.p.J;$.p.J=4(a,c){9 r=f.x(2,G);5(a&&a.8)r.g=a.g,r.8=a.8;5(14 a==\'13\')r.g=c||S,r.8=a;l r};$.p.J.p=$.p})(12);',62,82,'||this|livequery|function|if|lqguid|fn|selector|var|||||||context|each||queries|queue|return|type||fn2|prototype|||run|elements|stopped|false|els|apply|stop|undefined|running|inArray|length|timeout|else|id|arguments|nEls|guid|init|push|registerPlugin|play|checkQueue|isFunction|remove|true|extend|document|expire|pause|shift|while|null|new|event|bind|not|jQuery|string|typeof|toggleClass|unbind|addClass|removeAttr|attr|wrap|before|removeClass|empty|after|prepend|append|20|setTimeout|clearTimeout'.split('|'),0,{}))








var $j= jQuery.noConflict();



/*
 * jQuery clueTip plugin
 * Version 0.9.5  (01/24/2008)
 * @requires jQuery v1.1.1+
 * @requires Dimensions plugin 
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

    
(function($) { 
/*
 * @name clueTip
 * @type jQuery
 * @cat Plugins/tooltip
 * @return jQuery
 * @author Karl Swedberg
 *
 * @credit Inspired by Cody Lindley's jTip (http://www.codylindley.com)
 * @credit Thanks to the following people for their many and varied contributions:
      Shelane Enos, Glen Lipka, Hector Santos, Torben Schreiter, Dan G. Switzer, Jörn Zaefferer 
 * @credit Thanks to Jonathan Chaffer, as always, for help with the hard parts. :-)
 */

 /**
 * 
 * Displays a highly customizable tooltip when the user hovers (default) or clicks (optional) the matched element. 
 * By default, the clueTip plugin loads a page indicated by the "rel" attribute via ajax and displays its contents.
 * If a "title" attribute is specified, its value is used as the clueTip's heading.
 * The attribute to be used for both the body and the heading of the clueTip is user-configurable. 
 * Optionally, the clueTip's body can display content from an element on the same page.
 * * Just indicate the element's id (e.g. "#some-id") in the rel attribute.
 * Optionally, the clueTip's body can display content from the title attribute, when a delimiter is indicated. 
 * * The string before the first instance of the delimiter is set as the clueTip's heading.
 * * All subsequent strings are wrapped in separate DIVs and placed in the clueTip's body.
 * The clueTip plugin allows for many, many more options. Pleasee see the examples and the option descriptions below...
 * 
 * 
 * @example $('#tip).cluetip();
 * @desc This is the most basic clueTip. It displays a 275px-wide clueTip on mouseover of the element with an ID of "tip." On mouseout of the element, the clueTip is hidden.
 *
 *
 * @example $('a.clue').cluetip({
 *  hoverClass: 'highlight',
 *  sticky: true,
 *  closePosition: 'bottom',
 *  closeText: '<img src="cross.png" alt="close" />',
 *  truncate: 60,
 *  ajaxSettings: {
 *    type: 'POST'
 *  }
 * });
 * @desc Displays a clueTip on mouseover of all <a> elements with class="clue". The hovered element gets a class of "highlight" added to it (so that it can be styled appropriately. This is esp. useful for non-anchor elements.). The clueTip is "sticky," which means that it will not be hidden until the user either clicks on its "close" text/graphic or displays another clueTip. The "close" text/graphic is set to diplay at the bottom of the clueTip (default is top) and display an image rather than the default "Close" text. Moreover, the body of the clueTip is truncated to the first 60 characters, which are followed by an ellipsis (...). Finally, the clueTip retrieves the content using POST rather than the $.ajax method's default "GET."
 * 
 * More examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 * 
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 */
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $dropShadow, imgCount, openOnDelay=null, closeOnDelay=null;
  $.fn.cluetip = function(options) {

    var opts = $.extend({},$.fn.cluetip.defaults, options);

    if (options && options.ajaxSettings) {
      $.extend(opts.ajaxSettings, options.ajaxSettings);
      delete options.ajaxSettings;
    }
    
    if (options && options.hoverIntent) {
      $.extend(opts.hoverIntent, options.hoverIntent);
      delete options.hoverIntent;
    }    

    if (options && options.fx) {
      $.extend(opts.fx, options.fx);
      delete options.fx;
    }
    
    return this.each(function(index) {
      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = parseInt(opts.cluezIndex, 10)-1;
      var isActive = false

      // create the cluetip divs
      if (!$cluetip) {
        $cluetipInner = $('<div id="cluetip-inner"></div>');
        $cluetipTitle = $('<div id="cluetip-title"></div>');   // customize :change from h3 to div     
        $cluetipOuter = $('<div id="cluetip-outer"></div>').append($cluetipInner).prepend($cluetipTitle);
        $cluetip = $('<div id="cluetip"></div>').css({zIndex: opts.cluezIndex})
        .append($cluetipOuter).append('<div id="cluetip-extra"></div>')[insertionType](insertionElement).hide();
        $('<div id="cluetip-waitimage"></div>').css({position: 'absolute', zIndex: cluezIndex-1})
        .insertBefore('#cluetip').hide();
        $cluetip.css({position: 'absolute', zIndex: cluezIndex});
        $cluetipOuter.css({position: 'relative', zIndex: cluezIndex+1});
        $cluetipArrows = $('<div id="cluetip-arrows" class="cluetip-arrows"></div>').css({zIndex: cluezIndex+1}).appendTo('#cluetip');
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-i-1, opacity:.1, top: 1+i, left: 1+i}));
        };
        $dropShadow.css({position: 'absolute', backgroundColor: '#aaaaaa'}) // customize :change bgcolor     
        .prependTo($cluetip);
      }
      var $this = $(this);
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle) return true;
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight;
      var defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
     
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = isNaN(parseInt(opts.width, 10)) ? 275 : parseInt(opts.width, 10);
      var tipWidth = tipInnerWidth + parseInt($cluetip.css('paddingLeft')) + parseInt($cluetip.css('paddingRight')) + dropShadowSteps;
      var linkWidth = this.offsetWidth;
      var linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if(tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
     
        tipTitle = '<div class="cluetip-title-custom"><b class="cluetip-title-b"><b class="cluetip-title-b5"></b><b class="cluetip-title-b3"></b><b class="cluetip-title-b2"></b><b class="cluetip-title-b1"></b></b><div class="cluetip-title-b1a"><b class="cluetip-title-b1b"></b><div class="cluetip-title-txt">' + tipTitle + '</div> <b class="cluetip-title-b1b"></b></div><b class="cluetip-title-b1c"><b class="cluetip-title-b1"></b> <b class="cluetip-title-b2"></b> <b class="cluetip-title-b3"></b> <b class="cluetip-title-b5"></b></b></div>';
      }
      var localContent;
      

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function( event )
    {
        if( closeOnDelay != null )
        {
          clearTimeout( closeOnDelay );
          closeOnDelay = null;
        }
        if( opts.delayedOpen > 0 )
        {
            openOnDelay = setTimeout( function(){activateIt( event );}, opts.delayedOpen );
        }
        else
        {
            activateIt( event );
        }
    }
    var activateIt = function(event) {
      $cluetipOuter.parent().hide().removeClass().end().children().empty(); // clear out container contents
      openOnDelay = null;
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      $this.attr('title','');
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if ($this[0].tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {

        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if ($this[0].tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        if( opts.arrowHPosition == 'offset' )
        { 
            $cluetip.css({left: (posX > 0 && (opts.positionBy != 'bottomTop'&&opts.positionBy != 'topBottom')) ? posX : (( mouseX < winWidth/2 )? Math.max(mouseX - (tipWidth/5),0) : Math.max(mouseX - (tipWidth/1.25),0) ) });
        }
        else
        {
            $cluetip.css({left: (posX > 0 && (opts.positionBy != 'bottomTop'&&opts.positionBy != 'topBottom')) ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0)});
        }
      }
        wHeight = $(window).height();

/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/
      if (tipParts) {
        var tpl = tipParts.length;
        for (var i=0; i < tpl; i++){
          if (i == 0) {
            $cluetipInner.html(tipParts[i]);
           
          } else { 
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }            
        };
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/
      else if (!opts.local && tipAttribute.indexOf('#') != 0) {
        if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        }
        else {
          var ajaxSettings = opts.ajaxSettings;
          ajaxSettings.url = tipAttribute;
          ajaxSettings.beforeSend = function() {
            $cluetipOuter.children().empty();
            if (opts.waitImage) {
              $('#cluetip-waitimage')
              .css({top: mouseY+20, left: mouseX+20})
              .show();
            }
          };
         ajaxSettings.error = function() {
            if (isActive) {
              $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');
            }
          };
          ajaxSettings.success = function(data) {
            cluetipContents = opts.ajaxProcess(data);
            if (isActive) {
              $cluetipInner.html(cluetipContents);
            }
          };
          ajaxSettings.complete = function() {
          	imgCount = $('#cluetip-inner img').length;
        		if (imgCount) {
        		  $('#cluetip-inner img').load( function(){
          			imgCount--;
          			if (imgCount<1) {
          				$('#cluetip-waitimage').hide();
          			  if (isActive) cluetipShow(pY);
          			}
        		  }); 
        		} else {
      				$('#cluetip-waitimage').hide();
        		  if (isActive) cluetipShow(pY);    
        		} 
          };
          $.ajax(ajaxSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local){
        var $localContent = $(tipAttribute + ':first');
        var localCluetip = $.fn.wrapInner ? $localContent.wrapInner('<div></div>').children().clone(true) : $localContent.html();
        $.fn.wrapInner ? $cluetipInner.empty().append(localCluetip) : $cluetipInner.html(localCluetip);
        cluetipShow(pY);
      }
    };
    
    var clearClose = function() { // custom
        if( closeOnDelay != null )
        {
          clearTimeout( closeOnDelay );
          closeOnDelay = null;
        }
      }
    var goClose = function() { cluetipClose(); } // custom
    
// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
     if (!opts.splitTitle) {
        if($cluetipInner.html()==''||$cluetipInner.html()=='<DIV></DIV>'||$cluetipInner.html()=='<div></div>'){return false}
    }
      $cluetip.addClass('cluetip-' + ctClass);
      
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
    
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky)
      {
            var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
            if(opts.closeText.length > 0 ) {
            (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner); }
            $closeLink.click(function() {
                cluetipClose();
                return false;
                });
            if (opts.mouseOutClose) {
                if ($.fn.hoverIntent && opts.hoverIntent) { 
                $cluetip.hoverIntent({
                over: doNothing, 
                timeout: opts.hoverIntent.timeout,  
                out: function() { $closeLink.trigger('click'); }
                    });
                } 
                else {
                $cluetip.hover(clearClose, goClose ); // custom
                }
            }
            else {
                $cluetip.unbind('mouseout');
             }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? $cluetip.outerHeight() : parseInt(defHeight,10);   
      tipHeight = $cluetip.height();// customize :since outerHeight() does not work
      
      tipY = posY;
      baseline = sTop + wHeight;
     
      if (opts.positionBy == 'fixed') {

        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'topBottom') {
        if (posY + tipHeight + tOffset < baseline && mouseY - sTop < tipHeight + tOffset) { 
              tipY = mouseY + tOffset;
              direction = 'bottom';
          } else { 
              tipY = mouseY - tipHeight - tOffset;
              direction = 'top';
          }
      }else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {  
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || $this[0].tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + opts.arrowSize + '-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
    
      // cutomize to set the left & top for icon hover over
     if (opts.splitTitle) {
        var ofst = $this.parent().offset();
        var testx = ofst.left - 55;
        $cluetip.css("left",testx +"px");
        var testy = posY - opts.dropShadowSteps + tOffset + $this.height();
        $cluetip.css("top",testy +"px");
     }
//     if(direction=='right'){$dropShadow.css({left:'4px'})}else{$dropShadow.css({left:'-2px'})}
     $dropShadow.css({left:'3px'})
     $dropShadow.css({top:'3px'})
     // end cutomize
   
     // -----
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        if( isIE6 )
        {
            bgY = bgY + 40;
        } 
        else
        {
            bgY = bgY - 50;
        }// customize to hinge on the center of the icon
        $cluetipArrows.css({
            top: /(top)/.test(direction) ? tipHeight-1 : /(bottom)/.test(direction) ? (/(sm)/.test(opts.arrowSize) ? -5 : -18) : (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : '',
            left: /(left)/.test(direction) ? tipWidth-dropShadowSteps-1 : /(right)/.test(direction) ? (/(sm)/.test(opts.arrowSize) ? -5 : -18) : ((/(top|bottom)/.test(direction) && opts.arrowHPosition == 'offset') ? (( mouseX < winWidth/2 )? Math.max((tipWidth/5),0) : Math.max((tipWidth/1.25),0) ) : '50%' )
        }).show();         
      }
      else
      {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.open != 'show' && opts.fx.openSpeed);
      if (opts.dropShadow) $dropShadow.css({height: tipHeight, width: opts.width}).show();
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // trigger the optional onShow function
      opts.onShow($cluetip, $cluetipInner);
      //$cluetipTitle.corner("8px");
       // $cluetip.css("display", "inline");
    };

/***************************************
   =INACTIVATION
-------------------------------------- */

    
    var inactivate = function() {
      clearTimeout( openOnDelay );
      openOnDelay = null;
      isActive = false;
      $('#cluetip-waitimage').hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
      };
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
      $('.cluetip-clicked').removeClass('cluetip-clicked');
    };
    
    // close cluetip and reset some things
    var cluetipClose = function()
    { 
        if( opts.delayedClose > 0 )
        {
            closeOnDelay = setTimeout( cluetipCloseIt, opts.delayedClose );
        }
        else
        {
            cluetipCloseIt();
        }
    }
    var cluetipCloseIt = function() {
      closeOnDelay = null;
      $cluetipOuter 
      .parent().hide().removeClass().end()
      .children().empty();
      if (tipTitle) {
        $this.attr('title', tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) $cluetipArrows.css({top: ''});
    };

/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.click(function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.focus(function(event) {
          activate(event);
        });
        $this.blur(function(event) {
          inactivate(event);
        });
  // activate by hover
    // clicking is returned false if cluetip url is same as href url
      } else {
        $this.click(function() {
          if ($this.attr('href') && $this.attr('href') == tipAttribute && !opts.clickThrough) {
            return false;
          }
        });
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.mousemove(function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.mouseover(function() {$this.attr('title',''); })
          .hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove');}
          });           
        } else {
          $this.hover(function(event) { 
            activate(event);
            mouseTracks(event);
          }, function(event) { 
            cluetipClose();
            inactivate(event);
            $this.unbind('mousemove');
          });
        }
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop','topBottom', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    arrowSize:        'lg',     // size of arrows to use large or small (lg or sm)
    arrowHPosition:   'center', // horizontal positioning of the arrow (center or offset)
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    delayedOpen:      0,        // open clueTip on a timed delay (experimental)(custom)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs

    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // function to run just before clueTip is shown.           
    onActivate:       function(e) {return true;},

    // function to run just after clueTip is shown.
    onShow:           function(ct, c){},
    
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<s(cript|tyle)(.|\s)*?\/s(cript|tyle)>/g, '').replace(/<(link|title)(.|\s)*?\/(link|title)>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters, not including error, complete, success, and url
    ajaxSettings: {   
                      dataType: 'html'
    }
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';
  $.cluetip = {};
  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);

/*
 * jQuery corner plugin
 *
 * version 1.7 (1/26/2007)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
jQuery.fn.corner=function(o){function hex2(s){var s=parseInt(s).toString(16);return(s.length<2)?'0'+s:s};function gpc(node){for(;node&&node.nodeName.toLowerCase()!='html';node=node.parentNode){var v=jQuery.css(node,'backgroundColor');if(v.indexOf('rgb')>=0){rgb=v.match(/\d+/g);return'#'+hex2(rgb[0])+hex2(rgb[1])+hex2(rgb[2])}if(v&&v!='transparent')return v}return'#ffffff'};function getW(i){switch(fx){case'round':return Math.round(width*(1-Math.cos(Math.asin(i/width))));case'cool':return Math.round(width*(1+Math.cos(Math.asin(i/width))));case'sharp':return Math.round(width*(1-Math.cos(Math.acos(i/width))));case'bite':return Math.round(width*(Math.cos(Math.asin((width-i-1)/width))));case'slide':return Math.round(width*(Math.atan2(i,width/i)));case'jut':return Math.round(width*(Math.atan2(width,(width-i-1))));case'curl':return Math.round(width*(Math.atan(i)));case'tear':return Math.round(width*(Math.cos(i)));case'wicked':return Math.round(width*(Math.tan(i)));case'long':return Math.round(width*(Math.sqrt(i)));case'sculpt':return Math.round(width*(Math.log((width-i-1),width)));case'dog':return(i&1)?(i+1):width;case'dog2':return(i&2)?(i+1):width;case'dog3':return(i&3)?(i+1):width;case'fray':return(i%2)*width;case'notch':return width;case'bevel':return i+1}};o=(o||"").toLowerCase();var keep=/keep/.test(o);var cc=((o.match(/cc:(#[0-9a-f]+)/)||[])[1]);var sc=((o.match(/sc:(#[0-9a-f]+)/)||[])[1]);var width=parseInt((o.match(/(\d+)px/)||[])[1])||10;var re=/round|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dog/;var fx=((o.match(re)||['round'])[0]);var edges={T:0,B:1};var opts={TL:/top|tl/.test(o),TR:/top|tr/.test(o),BL:/bottom|bl/.test(o),BR:/bottom|br/.test(o)};if(!opts.TL&&!opts.TR&&!opts.BL&&!opts.BR)opts={TL:1,TR:1,BL:1,BR:1};var strip=document.createElement('div');strip.style.overflow='hidden';strip.style.height='1px';strip.style.backgroundColor=sc||'transparent';strip.style.borderStyle='solid';return this.each(function(index){var pad={T:parseInt(jQuery.css(this,'paddingTop'))||0,R:parseInt(jQuery.css(this,'paddingRight'))||0,B:parseInt(jQuery.css(this,'paddingBottom'))||0,L:parseInt(jQuery.css(this,'paddingLeft'))||0};if(jQuery.browser.msie)this.style.zoom=1;if(!keep)this.style.border='none';strip.style.borderColor=cc||gpc(this.parentNode);var cssHeight=jQuery.curCSS(this,'height');for(var j in edges){var bot=edges[j];strip.style.borderStyle='none '+(opts[j+'R']?'solid':'none')+' none '+(opts[j+'L']?'solid':'none');var d=document.createElement('div');var ds=d.style;bot?this.appendChild(d):this.insertBefore(d,this.firstChild);if(bot&&cssHeight!='auto'){if(jQuery.css(this,'position')=='static')this.style.position='relative';ds.position='absolute';ds.bottom=ds.left=ds.padding=ds.margin='0';if(jQuery.browser.msie)ds.setExpression('width','this.parentNode.offsetWidth');else ds.width='100%'}else{ds.margin=!bot?'-'+pad.T+'px -'+pad.R+'px '+(pad.T-width)+'px -'+pad.L+'px':(pad.B-width)+'px -'+pad.R+'px -'+pad.B+'px -'+pad.L+'px'}for(var i=0;i<width;i++){var w=Math.max(0,getW(i));var e=strip.cloneNode(false);e.style.borderWidth='0 '+(opts[j+'R']?w:0)+'px 0 '+(opts[j+'L']?w:0)+'px';bot?d.appendChild(e):d.insertBefore(e,d.firstChild)}}})};





/* Copyright (c) 2007 Paul Bakaus (paul.bakaus@googlemail.com) and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-12-20 08:43:48 -0600 (Thu, 20 Dec 2007) $
 * $Rev: 4257 $
 *
 * Version: 1.2
 *
 * Requires: jQuery 1.2+
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){$.19={P:\'1.2\'};$.u([\'j\',\'w\'],5(i,d){$.q[\'O\'+d]=5(){p(!3[0])6;g a=d==\'j\'?\'s\':\'m\',e=d==\'j\'?\'D\':\'C\';6 3.B(\':y\')?3[0][\'L\'+d]:4(3,d.x())+4(3,\'n\'+a)+4(3,\'n\'+e)};$.q[\'I\'+d]=5(b){p(!3[0])6;g c=d==\'j\'?\'s\':\'m\',e=d==\'j\'?\'D\':\'C\';b=$.F({t:Z},b||{});g a=3.B(\':y\')?3[0][\'8\'+d]:4(3,d.x())+4(3,\'E\'+c+\'w\')+4(3,\'E\'+e+\'w\')+4(3,\'n\'+c)+4(3,\'n\'+e);6 a+(b.t?(4(3,\'t\'+c)+4(3,\'t\'+e)):0)}});$.u([\'m\',\'s\'],5(i,b){$.q[\'l\'+b]=5(a){p(!3[0])6;6 a!=W?3.u(5(){3==h||3==r?h.V(b==\'m\'?a:$(h)[\'U\'](),b==\'s\'?a:$(h)[\'T\']()):3[\'l\'+b]=a}):3[0]==h||3[0]==r?S[(b==\'m\'?\'R\':\'Q\')]||$.N&&r.M[\'l\'+b]||r.A[\'l\'+b]:3[0][\'l\'+b]}});$.q.F({z:5(){g a=0,f=0,o=3[0],8,9,7,v;p(o){7=3.7();8=3.8();9=7.8();8.f-=4(o,\'K\');8.k-=4(o,\'J\');9.f+=4(7,\'H\');9.k+=4(7,\'Y\');v={f:8.f-9.f,k:8.k-9.k}}6 v},7:5(){g a=3[0].7;G(a&&(!/^A|10$/i.16(a.15)&&$.14(a,\'z\')==\'13\'))a=a.7;6 $(a)}});5 4(a,b){6 12($.11(a.17?a[0]:a,b,18))||0}})(X);',62,72,'|||this|num|function|return|offsetParent|offset|parentOffset|||||borr|top|var|window||Height|left|scroll|Left|padding|elem|if|fn|document|Top|margin|each|results|Width|toLowerCase|visible|position|body|is|Right|Bottom|border|extend|while|borderTopWidth|outer|marginLeft|marginTop|client|documentElement|boxModel|inner|version|pageYOffset|pageXOffset|self|scrollTop|scrollLeft|scrollTo|undefined|jQuery|borderLeftWidth|false|html|curCSS|parseInt|static|css|tagName|test|jquery|true|dimensions'.split('|'),0,{}))



/*
jqURL
by Josh Nathanson
*/
jQuery.jqURL = { url: function(args) { args = jQuery.extend({ win: window }, args); return args.win.m_actual_url ? args.win.m_actual_url : args.win.location.href }, loc: function(urlstr, args) { args = jQuery.extend({ win: window, w: 500, h: 500, wintype: '_top' }, args); if (!args.t) { args.t = screen.height / 2 - args.h / 2 } if (!args.l) { args.l = screen.width / 2 - args.w / 2 } if (args['wintype'] == '_top') { args.win.location.href = urlstr } else { open(urlstr, args['wintype'], 'width=' + args.w + ',height=' + args.h + ',top=' + args.t + ',left=' + args.l + ',scrollbars,resizable') } return }, qs: function(args) { args = jQuery.extend({ ret: 'string', win: window }, args); if (args['ret'] == 'string') { return jQuery.jqURL.url({ win: args.win }).split('?')[1] } else if (args['ret'] == 'object') { var qsobj = {}; var thisqs = jQuery.jqURL.url({ win: args.win }).split('?')[1]; if (thisqs) { var pairs = thisqs.split('&'); for (i = 0; i < pairs.length; i++) { var pair = pairs[i].split('='); qsobj[pair[0]] = pair[1] } } return qsobj } }, strip: function(args) { args = jQuery.extend({ keys: '', win: window }, args); if (jQuery.jqURL.url().indexOf('?') == -1) { return jQuery.jqURL.url({ win: args.win }) } else if (!args.keys) { return jQuery.jqURL.url({ win: args.win }).split('?')[0] } else { var qsobj = jQuery.jqURL.qs({ ret: 'object', win: args.win }); var counter = 0; var url = jQuery.jqURL.url({ win: args.win }).split('?')[0] + '?'; var amp = ''; for (var key in qsobj) { if (args.keys.indexOf(key) == -1) { amp = (counter) ? '&' : ''; url = url + amp + key + '=' + qsobj[key]; counter++ } } return url } }, get: function(key, args) { args = jQuery.extend({ win: window }, args); qsobj = jQuery.jqURL.qs({ ret: 'object', win: args.win }); return qsobj[key] }, set: function(hash, args) { args = jQuery.extend({ win: window }, args); var qsobj = jQuery.jqURL.qs({ ret: 'object', win: args.win }); for (var i in hash) { qsobj[i] = hash[i] } var qstring = ''; var counter = 0; var amp = ''; for (var k in qsobj) { amp = (counter) ? '&' : ''; qstring = qstring + amp + k + '=' + qsobj[k]; counter++ } return jQuery.jqURL.strip({ win: args.win }) + '?' + qstring } };


/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-07-21 18:44:59 -0500 (Sat, 21 Jul 2007) $
 * $Rev: 2446 $
 *
 * Version 2.1.1
 */

(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild)})}return this}})(jQuery);

/*
 * Autocomplete - jQuery plugin 1.0.1pre
 *
 * Copyright (c) 2007 Dylan Verheul, Dan G. Switzer, Anjesh Tuladhar, Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 5334 2008-04-27 15:32:44Z joern.zaefferer $
 *
 */
 ;(function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options)})},result:function(handler){return this.bind("result",handler)},search:function(handler){return this.trigger("search",[handler])},flushCache:function(){return this.trigger("flushCache")},setOptions:function(options){return this.trigger("setOptions",[options])},unautocomplete:function(){return this.trigger("unautocomplete")}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);$input.keydown(function(event){lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev()}else{onChange(0,true)}break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next()}else{onChange(0,true)}break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp()}else{onChange(0,true)}break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown()}else{onChange(0,true)}break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){if(!options.multiple)$input.blur();event.preventDefault()}break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break}}).keypress(function(){}).focus(function(){hasFocus++}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults()}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true)}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break}}}if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value])}$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback)})}).bind("flushCache",function(){cache.flush()}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])cache.populate()}).bind("unautocomplete",function(){select.unbind();$input.unbind()});function selectCurrent(){var selected=select.selected();if(!selected)return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){v=words.slice(0,words.length-1).join(options.multipleSeparator)+options.multipleSeparator+v}v+=options.multipleSeparator}$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true}function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return}var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$input.addClass(options.loadingClass);if(!options.matchCase)currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow)}else{stopLoading();select.hide()}};function trimWords(value){if(!value){return[""]}var words=value.split(options.multipleSeparator);var result=[];$.each(words,function(i,value){if($.trim(value))result[i]=$.trim(value)});return result}function lastWord(value){if(!options.multiple)return value;var words=trimWords(value);return words[words.length-1]}function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$.Autocompleter.Selection(input,previousValue.length,previousValue.length+sValue.length)}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200)};function hideResultsNow(){select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result)$input.val("")})}};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show()}else{hideResultsNow()}};function request(term,success,failure){if(!options.matchCase)term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data)}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed)}})}else{select.emptyList();failure(term)}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]}}}return parsed};function stopLoading(){$input.removeClass(options.loadingClass)}};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0]},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>")},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)s=s.toLowerCase();var i=s.indexOf(sub);if(i==-1)return false;return i==0||options.matchContains};function add(q,value){if(length>options.cacheLength){flush()}if(!data[q]){length++}data[q]=value}function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row)}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value)})}setTimeout(populate,25);function flush(){data={};length=0}return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x)}})}}return csub}else if(data[q]){return data[q]}else if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x}});return csub}}}return null}}};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE)}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false}).mousedown(function(){config.mouseDownOnSelect=true}).mouseup(function(){config.mouseDownOnSelect=false});if(options.width>0)element.css("width",options.width);needsInit=false}function target(event){var element=event.target;while(element&&element.tagName!="LI")element=element.parentNode;if(!element)return[];return element}function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight())}else if(offset<list.scrollTop()){list.scrollTop(offset)}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1}else if(active>=listItems.size()){active=0}}function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available}function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i])}listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0}list.bgiframe()}return{display:function(d,q){init();data=d;term=q;fillList()},next:function(){moveSelect(1)},prev:function(){moveSelect(-1)},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active)}else{moveSelect(-8)}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active)}else{moveSelect(8)}},hide:function(){element&&element.hide();active=-1},visible:function(){return element&&element.is(":visible")},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0])},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:$(input).width(),top:offset.top+input.offsetHeight,left:offset.left}).show();if(options.scroll){list.scrollTop(0);list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")))}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data")},emptyList:function(){list&&list.empty()},unbind:function(){element&&element.remove()}}};$.Autocompleter.Selection=function(field,start,end){if(field.createTextRange){var selRange=field.createTextRange();selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select()}else if(field.setSelectionRange){field.setSelectionRange(start,end)}else{if(field.selectionStart){field.selectionStart=start;field.selectionEnd=end}}field.focus()}})(jQuery);
