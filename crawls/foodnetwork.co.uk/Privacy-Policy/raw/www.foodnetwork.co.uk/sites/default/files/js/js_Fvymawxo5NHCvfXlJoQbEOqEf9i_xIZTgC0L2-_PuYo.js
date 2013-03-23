(function($,window,undefined){"use strict";var TRUE=true,FALSE=false,NULL=null,QTIP,PLUGINS,MOUSE,usedIDs={},uitooltip='ui-tooltip',widget='ui-widget',disabled='ui-state-disabled',selector='div.qtip.'+uitooltip,defaultClass=uitooltip+'-default',focusClass=uitooltip+'-focus',hoverClass=uitooltip+'-hover',fluidClass=uitooltip+'-fluid',hideOffset='-31000px',replaceSuffix='_replacedByqTip',oldtitle='oldtitle',trackingBound;function log(){log.history=log.history||[];log.history.push(arguments);if('object'===typeof console){var c=console[console.warn?'warn':'log'],args=Array.prototype.slice.call(arguments),a;if(typeof arguments[0]==='string'){args[0]='qTip2: '+ args[0];}
a=c.apply?c.apply(console,args):c(args);}}
function sanitizeOptions(opts)
{var content;if(!opts||'object'!==typeof opts){return FALSE;}
if('object'!==typeof opts.metadata){opts.metadata={type:opts.metadata};}
if('content'in opts){if('object'!==typeof opts.content||opts.content.jquery){opts.content={text:opts.content};}
content=opts.content.text||FALSE;if(!$.isFunction(content)&&((!content&&!content.attr)||content.length<1||('object'===typeof content&&!content.jquery))){opts.content.text=FALSE;}
if('title'in opts.content){if('object'!==typeof opts.content.title){opts.content.title={text:opts.content.title};}
content=opts.content.title.text||FALSE;if(!$.isFunction(content)&&((!content&&!content.attr)||content.length<1||('object'===typeof content&&!content.jquery))){opts.content.title.text=FALSE;}}}
if('position'in opts){if('object'!==typeof opts.position){opts.position={my:opts.position,at:opts.position};}}
if('show'in opts){if('object'!==typeof opts.show){if(opts.show.jquery){opts.show={target:opts.show};}
else{opts.show={event:opts.show};}}}
if('hide'in opts){if('object'!==typeof opts.hide){if(opts.hide.jquery){opts.hide={target:opts.hide};}
else{opts.hide={event:opts.hide};}}}
if('style'in opts){if('object'!==typeof opts.style){opts.style={classes:opts.style};}}
$.each(PLUGINS,function(){if(this.sanitize){this.sanitize(opts);}});return opts;}
function QTip(target,options,id,attr)
{var self=this,docBody=document.body,tooltipID=uitooltip+'-'+ id,isPositioning=0,isDrawing=0,tooltip=$(),namespace='.qtip-'+ id,elements,cache;self.id=id;self.rendered=FALSE;self.elements=elements={target:target};self.timers={img:{}};self.options=options;self.checks={};self.plugins={};self.cache=cache={event:{},target:$(),disabled:FALSE,attr:attr};function convertNotation(notation)
{var i=0,obj,option=options,levels=notation.split('.');while(option=option[levels[i++]]){if(i<levels.length){obj=option;}}
return[obj||options,levels.pop()];}
function setWidget(){var on=options.style.widget;tooltip.toggleClass(widget,on).toggleClass(defaultClass,!on);elements.content.toggleClass(widget+'-content',on);if(elements.titlebar){elements.titlebar.toggleClass(widget+'-header',on);}
if(elements.button){elements.button.toggleClass(uitooltip+'-icon',!on);}}
function removeTitle(reposition)
{if(elements.title){elements.titlebar.remove();elements.titlebar=elements.title=elements.button=NULL;if(reposition!==FALSE){self.reposition();}}}
function createButton()
{var button=options.content.title.button,isString=typeof button==='string',close=isString?button:'Close tooltip';if(elements.button){elements.button.remove();}
if(button.jquery){elements.button=button;}
else{elements.button=$('<a />',{'class':'ui-state-default '+(options.style.widget?'':uitooltip+'-icon'),'title':close,'aria-label':close}).prepend($('<span />',{'class':'ui-icon ui-icon-close','html':'&times;'}));}
elements.button.appendTo(elements.titlebar).attr('role','button').hover(function(event){$(this).toggleClass('ui-state-hover',event.type==='mouseenter');}).click(function(event){if(!tooltip.hasClass(disabled)){self.hide(event);}
return FALSE;}).bind('mousedown keydown mouseup keyup mouseout',function(event){$(this).toggleClass('ui-state-active ui-state-focus',event.type.substr(-4)==='down');});self.redraw();}
function createTitle()
{var id=tooltipID+'-title';if(elements.titlebar){removeTitle();}
elements.titlebar=$('<div />',{'class':uitooltip+'-titlebar '+(options.style.widget?'ui-widget-header':'')}).append(elements.title=$('<div />',{'id':id,'class':uitooltip+'-title','aria-atomic':TRUE})).insertBefore(elements.content);if(options.content.title.button){createButton();}
else if(self.rendered){self.redraw();}}
function updateButton(button)
{var elem=elements.button,title=elements.title;if(!self.rendered){return FALSE;}
if(!button){elem.remove();}
else{if(!title){createTitle();}
createButton();}}
function updateTitle(content,reposition)
{var elem=elements.title;if(!self.rendered||!content){return FALSE;}
if($.isFunction(content)){content=content.call(target,cache.event,self);}
if(content===FALSE){return removeTitle(FALSE);}
else if(content.jquery&&content.length>0){elem.empty().append(content.css({display:'block'}));}
else{elem.html(content);}
self.redraw();if(reposition!==FALSE&&self.rendered&&tooltip.is(':visible')){self.reposition(cache.event);}}
function updateContent(content,reposition)
{var elem=elements.content;if(!self.rendered||!content){return FALSE;}
if($.isFunction(content)){content=content.call(target,cache.event,self)||'';}
if(content.jquery&&content.length>0){elem.empty().append(content.css({display:'block'}));}
else{elem.html(content);}
function detectImages(next){var images,srcs={};function imageLoad(image){if(image){delete srcs[image.src];clearTimeout(self.timers.img[image.src]);$(image).unbind(namespace);}
if($.isEmptyObject(srcs)){self.redraw();if(reposition!==FALSE){self.reposition(cache.event);}
next();}}
if((images=elem.find('img:not([height]):not([width])')).length===0){return imageLoad();}
images.each(function(i,elem){if(srcs[elem.src]!==undefined){return;}
(function timer(){if(elem.height||elem.width){return imageLoad(elem);}
self.timers.img[elem.src]=setTimeout(timer,700);}());$(elem).bind('error'+namespace+' load'+namespace,function(){imageLoad(this);});srcs[elem.src]=elem;});}
if(self.rendered<0){tooltip.queue('fx',detectImages);}
else{isDrawing=0;detectImages($.noop);}
return self;}
function assignEvents()
{var posOptions=options.position,targets={show:options.show.target,hide:options.hide.target,viewport:$(posOptions.viewport),document:$(document),window:$(window)},events={show:$.trim(''+ options.show.event).split(' '),hide:$.trim(''+ options.hide.event).split(' ')},IE6=$.browser.msie&&parseInt($.browser.version,10)===6;function showMethod(event)
{if(tooltip.hasClass(disabled)){return FALSE;}
targets.show.trigger('qtip-'+id+'-inactive');clearTimeout(self.timers.show);clearTimeout(self.timers.hide);var callback=function(){self.toggle(TRUE,event);};if(options.show.delay>0){self.timers.show=setTimeout(callback,options.show.delay);}
else{callback();}}
function hideMethod(event)
{if(tooltip.hasClass(disabled)||isPositioning||isDrawing){return FALSE;}
var relatedTarget=$(event.relatedTarget||event.target),ontoTooltip=relatedTarget.closest(selector)[0]===tooltip[0],ontoTarget=relatedTarget[0]===targets.show[0];clearTimeout(self.timers.show);clearTimeout(self.timers.hide);if((posOptions.target==='mouse'&&ontoTooltip)||(options.hide.fixed&&((/mouse(out|leave|move)/).test(event.type)&&(ontoTooltip||ontoTarget)))){event.preventDefault();event.stopImmediatePropagation();return;}
if(options.hide.delay>0){self.timers.hide=setTimeout(function(){self.hide(event);},options.hide.delay);}
else{self.hide(event);}}
function inactiveMethod(event)
{if(tooltip.hasClass(disabled)){return FALSE;}
clearTimeout(self.timers.inactive);self.timers.inactive=setTimeout(function(){self.hide(event);},options.hide.inactive);}
function repositionMethod(event){if(tooltip.is(':visible')){self.reposition(event);}}
tooltip.bind('mouseenter'+namespace+' mouseleave'+namespace,function(event){var state=event.type==='mouseenter';if(state){self.focus(event);}
tooltip.toggleClass(hoverClass,state);});if(options.hide.fixed){targets.hide=targets.hide.add(tooltip);tooltip.bind('mouseover'+namespace,function(){if(!tooltip.hasClass(disabled)){clearTimeout(self.timers.hide);}});}
if(/mouse(out|leave)/i.test(options.hide.event)){if(options.hide.leave==='window'){targets.window.bind('mouseout'+ namespace,function(event){if(/select|option/.test(event.target)&&!event.relatedTarget){self.hide(event);}});}}
else if(/mouse(over|enter)/i.test(options.show.event)){targets.hide.bind('mouseleave'+namespace,function(event){clearTimeout(self.timers.show);});}
if((''+ options.hide.event).indexOf('unfocus')>-1){targets.document.bind('mousedown'+namespace,function(event){var $target=$(event.target),enabled=!tooltip.hasClass(disabled)&&tooltip.is(':visible');if($target[0]!==tooltip[0]&&$target.parents(selector).length===0&&$target.add(target).length>1){self.hide(event);}});}
if('number'===typeof options.hide.inactive){targets.show.bind('qtip-'+id+'-inactive',inactiveMethod);$.each(QTIP.inactiveEvents,function(index,type){targets.hide.add(elements.tooltip).bind(type+namespace+'-inactive',inactiveMethod);});}
$.each(events.hide,function(index,type){var showIndex=$.inArray(type,events.show),targetHide=$(targets.hide);if((showIndex>-1&&targetHide.add(targets.show).length===targetHide.length)||type==='unfocus')
{targets.show.bind(type+namespace,function(event){if(tooltip.is(':visible')){hideMethod(event);}
else{showMethod(event);}});delete events.show[showIndex];}
else{targets.hide.bind(type+namespace,hideMethod);}});$.each(events.show,function(index,type){targets.show.bind(type+namespace,showMethod);});if('number'===typeof options.hide.distance){targets.show.add(tooltip).bind('mousemove'+namespace,function(event){var origin=cache.origin||{},limit=options.hide.distance,abs=Math.abs;if(abs(event.pageX- origin.pageX)>=limit||abs(event.pageY- origin.pageY)>=limit){self.hide(event);}});}
if(posOptions.target==='mouse'){targets.show.bind('mousemove'+namespace,function(event){MOUSE={pageX:event.pageX,pageY:event.pageY,type:'mousemove'};});if(posOptions.adjust.mouse){if(options.hide.event){tooltip.bind('mouseleave'+namespace,function(event){if((event.relatedTarget||event.target)!==targets.show[0]){self.hide(event);}});}
targets.document.bind('mousemove'+namespace,function(event){if(!tooltip.hasClass(disabled)&&tooltip.is(':visible')){self.reposition(event||MOUSE);}});}}
if(posOptions.adjust.resize||targets.viewport.length){($.event.special.resize?targets.viewport:targets.window).bind('resize'+namespace,repositionMethod);}
if(targets.viewport.length||(IE6&&tooltip.css('position')==='fixed')){targets.viewport.bind('scroll'+namespace,repositionMethod);}}
function unassignEvents()
{var targets=[options.show.target[0],options.hide.target[0],self.rendered&&elements.tooltip[0],options.position.container[0],options.position.viewport[0],window,document];if(self.rendered){$([]).pushStack($.grep(targets,function(i){return typeof i==='object';})).unbind(namespace);}
else{options.show.target.unbind(namespace+'-create');}}
self.checks.builtin={'^id$':function(obj,o,v){var id=v===TRUE?QTIP.nextid:v,tooltipID=uitooltip+'-'+ id;if(id!==FALSE&&id.length>0&&!$('#'+tooltipID).length){tooltip[0].id=tooltipID;elements.content[0].id=tooltipID+'-content';elements.title[0].id=tooltipID+'-title';}},'^content.text$':function(obj,o,v){updateContent(v);},'^content.title.text$':function(obj,o,v){if(!v){return removeTitle();}
if(!elements.title&&v){createTitle();}
updateTitle(v);},'^content.title.button$':function(obj,o,v){updateButton(v);},'^position.(my|at)$':function(obj,o,v){if('string'===typeof v){obj[o]=new PLUGINS.Corner(v);}},'^position.container$':function(obj,o,v){if(self.rendered){tooltip.appendTo(v);}},'^show.ready$':function(){if(!self.rendered){self.render(1);}
else{self.toggle(TRUE);}},'^style.classes$':function(obj,o,v){tooltip.attr('class',uitooltip+' qtip ui-helper-reset '+ v);},'^style.widget|content.title':setWidget,'^events.(render|show|move|hide|focus|blur)$':function(obj,o,v){tooltip[($.isFunction(v)?'':'un')+'bind']('tooltip'+o,v);},'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)':function(){var posOptions=options.position;tooltip.attr('tracking',posOptions.target==='mouse'&&posOptions.adjust.mouse);unassignEvents();assignEvents();}};$.extend(self,{render:function(show)
{if(self.rendered){return self;}
var title=options.content.title.text,posOptions=options.position,callback=$.Event('tooltiprender');$.attr(target[0],'aria-describedby',tooltipID);tooltip=elements.tooltip=$('<div/>',{'id':tooltipID,'class':uitooltip+' qtip ui-helper-reset '+ defaultClass+' '+ options.style.classes,'width':options.style.width||'','height':options.style.height||'','tracking':posOptions.target==='mouse'&&posOptions.adjust.mouse,'role':'alert','aria-live':'polite','aria-atomic':FALSE,'aria-describedby':tooltipID+'-content','aria-hidden':TRUE}).toggleClass(disabled,cache.disabled).data('qtip',self).appendTo(options.position.container).append(elements.content=$('<div />',{'class':uitooltip+'-content','id':tooltipID+'-content','aria-atomic':TRUE}));self.rendered=-1;isDrawing=1;isPositioning=1;if(title){createTitle();updateTitle(title,FALSE);}
updateContent(options.content.text,FALSE);self.rendered=TRUE;setWidget();$.each(options.events,function(name,callback){if($.isFunction(callback)){tooltip.bind(name==='toggle'?'tooltipshow tooltiphide':'tooltip'+name,callback);}});$.each(PLUGINS,function(){if(this.initialize==='render'){this(self);}});assignEvents();tooltip.queue('fx',function(next){callback.originalEvent=cache.event;tooltip.trigger(callback,[self]);isDrawing=0;isPositioning=0;self.redraw();if(options.show.ready||show){self.toggle(TRUE,cache.event);}
next();});return self;},get:function(notation)
{var result,o;switch(notation.toLowerCase())
{case'dimensions':result={height:tooltip.outerHeight(),width:tooltip.outerWidth()};break;case'offset':result=PLUGINS.offset(tooltip,options.position.container);break;default:o=convertNotation(notation.toLowerCase());result=o[0][o[1]];result=result.precedance?result.string():result;break;}
return result;},set:function(option,value)
{var rmove=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,rdraw=/^content\.(title|attr)|style/i,reposition=FALSE,redraw=FALSE,checks=self.checks,name;function callback(notation,args){var category,rule,match;for(category in checks){for(rule in checks[category]){if(match=(new RegExp(rule,'i')).exec(notation)){args.push(match);checks[category][rule].apply(self,args);}}}}
if('string'===typeof option){name=option;option={};option[name]=value;}
else{option=$.extend(TRUE,{},option);}
$.each(option,function(notation,value){var obj=convertNotation(notation.toLowerCase()),previous;previous=obj[0][obj[1]];obj[0][obj[1]]='object'===typeof value&&value.nodeType?$(value):value;option[notation]=[obj[0],obj[1],value,previous];reposition=rmove.test(notation)||reposition;redraw=rdraw.test(notation)||redraw;});sanitizeOptions(options);isPositioning=isDrawing=1;$.each(option,callback);isPositioning=isDrawing=0;if(tooltip.is(':visible')&&self.rendered){if(reposition){self.reposition(options.position.target==='mouse'?NULL:cache.event);}
if(redraw){self.redraw();}}
return self;},toggle:function(state,event)
{if(!self.rendered){if(state){self.render(1);}
else{return self;}}
var type=state?'show':'hide',opts=options[type],visible=tooltip.is(':visible'),sameTarget=!event||options[type].target.length<2||cache.target[0]===event.target,posOptions=options.position,contentOptions=options.content,delay,callback;if((typeof state).search('boolean|number')){state=!visible;}
if(!tooltip.is(':animated')&&visible===state&&sameTarget){return self;}
if(event){if((/over|enter/).test(event.type)&&(/out|leave/).test(cache.event.type)&&event.target===options.show.target[0]&&tooltip.has(event.relatedTarget).length){return self;}
cache.event=$.extend({},event);}
callback=$.Event('tooltip'+type);callback.originalEvent=event?cache.event:NULL;tooltip.trigger(callback,[self,90]);if(callback.isDefaultPrevented()){return self;}
$.attr(tooltip[0],'aria-hidden',!!!state);if(state){cache.origin=$.extend({},MOUSE);self.focus(event);if($.isFunction(contentOptions.text)){updateContent(contentOptions.text,FALSE);}
if($.isFunction(contentOptions.title.text)){updateTitle(contentOptions.title.text,FALSE);}
if(!trackingBound&&posOptions.target==='mouse'&&posOptions.adjust.mouse){$(document).bind('mousemove.qtip',function(event){MOUSE={pageX:event.pageX,pageY:event.pageY,type:'mousemove'};});trackingBound=TRUE;}
self.reposition(event);if(opts.solo){$(selector,opts.solo).not(tooltip).qtip('hide',callback);}}
else{clearTimeout(self.timers.show);delete cache.origin;if(trackingBound&&!$(selector+'[tracking="true"]:visible',opts.solo).not(tooltip).length){$(document).unbind('mousemove.qtip');trackingBound=FALSE;}
self.blur(event);}
function after(){if(state){if($.browser.msie){tooltip[0].style.removeAttribute('filter');}
tooltip.css('overflow','');if('string'===typeof opts.autofocus){$(opts.autofocus,tooltip).focus();}
callback=$.Event('tooltipvisible');callback.originalEvent=event?cache.event:NULL;tooltip.trigger(callback,[self]);}
else{tooltip.css({display:'',visibility:'',opacity:'',left:'',top:''});}}
if(sameTarget){tooltip.stop(0,1);}
if(opts.effect===FALSE){tooltip[type]();after.call(tooltip);}
else if($.isFunction(opts.effect)){opts.effect.call(tooltip,self);tooltip.queue('fx',function(n){after();n();});}
else{tooltip.fadeTo(90,state?1:0,after);}
if(state){opts.target.trigger('qtip-'+id+'-inactive');}
return self;},show:function(event){return self.toggle(TRUE,event);},hide:function(event){return self.toggle(FALSE,event);},focus:function(event)
{if(!self.rendered){return self;}
var qtips=$(selector),curIndex=parseInt(tooltip[0].style.zIndex,10),newIndex=QTIP.zindex+ qtips.length,cachedEvent=$.extend({},event),focusedElem,callback;if(!tooltip.hasClass(focusClass))
{callback=$.Event('tooltipfocus');callback.originalEvent=cachedEvent;tooltip.trigger(callback,[self,newIndex]);if(!callback.isDefaultPrevented()){if(curIndex!==newIndex){qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex=this.style.zIndex- 1;}});qtips.filter('.'+ focusClass).qtip('blur',cachedEvent);}
tooltip.addClass(focusClass)[0].style.zIndex=newIndex;}}
return self;},blur:function(event){var cachedEvent=$.extend({},event),callback;tooltip.removeClass(focusClass);callback=$.Event('tooltipblur');callback.originalEvent=cachedEvent;tooltip.trigger(callback,[self]);return self;},reposition:function(event,effect)
{if(!self.rendered||isPositioning){return self;}
isPositioning=1;var target=options.position.target,posOptions=options.position,my=posOptions.my,at=posOptions.at,adjust=posOptions.adjust,method=adjust.method.split(' '),elemWidth=tooltip.outerWidth(),elemHeight=tooltip.outerHeight(),targetWidth=0,targetHeight=0,callback=$.Event('tooltipmove'),fixed=tooltip.css('position')==='fixed',viewport=posOptions.viewport,position={left:0,top:0},tip=self.plugins.tip,readjust={horizontal:method[0],vertical:method[1]||method[0],left:function(posLeft){var isShift=readjust.horizontal==='shift',viewportScroll=viewport.offset.left+ viewport.scrollLeft,myWidth=my.x==='left'?elemWidth:my.x==='right'?-elemWidth:-elemWidth/2,atWidth=at.x==='left'?targetWidth:at.x==='right'?-targetWidth:-targetWidth/2,tipWidth=tip&&tip.size?tip.size.width||0:0,tipAdjust=tip&&tip.corner&&tip.corner.precedance==='x'&&!isShift?tipWidth:0,overflowLeft=viewportScroll- posLeft+ tipAdjust,overflowRight=posLeft+ elemWidth- viewport.width- viewportScroll+ tipAdjust,offset=myWidth-(my.precedance==='x'||my.x===my.y?atWidth:0),isCenter=my.x==='center';if(isShift){tipAdjust=tip&&tip.corner&&tip.corner.precedance==='y'?tipWidth:0;offset=(my.x==='left'?1:-1)*myWidth- tipAdjust;position.left+=overflowLeft>0?overflowLeft:overflowRight>0?-overflowRight:0;position.left=Math.max(viewport.offset.left+(tipAdjust&&tip.corner.x==='center'?tip.offset:0),posLeft- offset,Math.min(Math.max(viewport.offset.left+ viewport.width,posLeft+ offset),position.left));}
else{if(overflowLeft>0&&(my.x!=='left'||overflowRight>0)){position.left-=offset+(isCenter?0:2*adjust.x);}
else if(overflowRight>0&&(my.x!=='right'||overflowLeft>0)){position.left-=isCenter?-offset:offset+(2*adjust.x);}
if(position.left!==posLeft&&isCenter){position.left-=adjust.x;}
if(position.left<viewportScroll&&-position.left>overflowRight){position.left=posLeft;}}
return position.left- posLeft;},top:function(posTop){var isShift=readjust.vertical==='shift',viewportScroll=viewport.offset.top+ viewport.scrollTop,myHeight=my.y==='top'?elemHeight:my.y==='bottom'?-elemHeight:-elemHeight/2,atHeight=at.y==='top'?targetHeight:at.y==='bottom'?-targetHeight:-targetHeight/2,tipHeight=tip&&tip.size?tip.size.height||0:0,tipAdjust=tip&&tip.corner&&tip.corner.precedance==='y'&&!isShift?tipHeight:0,overflowTop=viewportScroll- posTop+ tipAdjust,overflowBottom=posTop+ elemHeight- viewport.height- viewportScroll+ tipAdjust,offset=myHeight-(my.precedance==='y'||my.x===my.y?atHeight:0),isCenter=my.y==='center';if(isShift){tipAdjust=tip&&tip.corner&&tip.corner.precedance==='x'?tipHeight:0;offset=(my.y==='top'?1:-1)*myHeight- tipAdjust;position.top+=overflowTop>0?overflowTop:overflowBottom>0?-overflowBottom:0;position.top=Math.max(viewport.offset.top+(tipAdjust&&tip.corner.x==='center'?tip.offset:0),posTop- offset,Math.min(Math.max(viewport.offset.top+ viewport.height,posTop+ offset),position.top));}
else{if(overflowTop>0&&(my.y!=='top'||overflowBottom>0)){position.top-=offset+(isCenter?0:2*adjust.y);}
else if(overflowBottom>0&&(my.y!=='bottom'||overflowTop>0)){position.top-=isCenter?-offset:offset+(2*adjust.y);}
if(position.top!==posTop&&isCenter){position.top-=adjust.y;}
if(position.top<0&&-position.top>overflowBottom){position.top=posTop;}}
return position.top- posTop;}};if($.isArray(target)&&target.length===2){at={x:'left',y:'top'};position={left:target[0],top:target[1]};}
else if(target==='mouse'&&((event&&event.pageX)||cache.event.pageX)){at={x:'left',y:'top'};event=(event&&(event.type==='resize'||event.type==='scroll')?cache.event:event&&event.pageX&&event.type==='mousemove'?event:MOUSE&&MOUSE.pageX&&(adjust.mouse||!event||!event.pageX)?{pageX:MOUSE.pageX,pageY:MOUSE.pageY}:!adjust.mouse&&cache.origin&&cache.origin.pageX?cache.origin:event)||event||cache.event||MOUSE||{};position={top:event.pageY,left:event.pageX};}
else{if(target==='event'){if(event&&event.target&&event.type!=='scroll'&&event.type!=='resize'){target=cache.target=$(event.target);}
else{target=cache.target;}}
else{cache.target=$(target);}
target=$(target).eq(0);if(target.length===0){return self;}
else if(target[0]===document||target[0]===window){targetWidth=PLUGINS.iOS?window.innerWidth:target.width();targetHeight=PLUGINS.iOS?window.innerHeight:target.height();if(target[0]===window){position={top:!fixed||PLUGINS.iOS?(viewport||target).scrollTop():0,left:!fixed||PLUGINS.iOS?(viewport||target).scrollLeft():0};}}
else if(target.is('area')&&PLUGINS.imagemap){position=PLUGINS.imagemap(target,at);}
else if(target[0].namespaceURI==='http://www.w3.org/2000/svg'&&PLUGINS.svg){position=PLUGINS.svg(target,at);}
else{targetWidth=target.outerWidth();targetHeight=target.outerHeight();position=PLUGINS.offset(target,posOptions.container,fixed);}
if(position.offset){targetWidth=position.width;targetHeight=position.height;position=position.offset;}
position.left+=at.x==='right'?targetWidth:at.x==='center'?targetWidth/2:0;position.top+=at.y==='bottom'?targetHeight:at.y==='center'?targetHeight/2:0;}
position.left+=adjust.x+(my.x==='right'?-elemWidth:my.x==='center'?-elemWidth/2:0);position.top+=adjust.y+(my.y==='bottom'?-elemHeight:my.y==='center'?-elemHeight/2:0);if(viewport.jquery&&target[0]!==window&&target[0]!==docBody&&readjust.vertical+readjust.horizontal!=='nonenone')
{viewport={elem:viewport,height:viewport[(viewport[0]===window?'h':'outerH')+'eight'](),width:viewport[(viewport[0]===window?'w':'outerW')+'idth'](),scrollLeft:fixed?0:viewport.scrollLeft(),scrollTop:fixed?0:viewport.scrollTop(),offset:viewport.offset()||{left:0,top:0}};position.adjusted={left:readjust.horizontal!=='none'?readjust.left(position.left):0,top:readjust.vertical!=='none'?readjust.top(position.top):0};}
else{position.adjusted={left:0,top:0};}
tooltip.attr('class',function(i,val){return $.attr(this,'class').replace(/ui-tooltip-pos-\w+/i,'');}).addClass(uitooltip+'-pos-'+ my.abbreviation());callback.originalEvent=$.extend({},event);tooltip.trigger(callback,[self,position,viewport.elem||viewport]);if(callback.isDefaultPrevented()){return self;}
delete position.adjusted;if(effect===FALSE||isNaN(position.left)||isNaN(position.top)||target==='mouse'||!$.isFunction(posOptions.effect)){tooltip.css(position);}
else if($.isFunction(posOptions.effect)){posOptions.effect.call(tooltip,self,$.extend({},position));tooltip.queue(function(next){$(this).css({opacity:'',height:''});if($.browser.msie){this.style.removeAttribute('filter');}
next();});}
isPositioning=0;return self;},redraw:function()
{if(self.rendered<1||isDrawing){return self;}
var container=options.position.container,perc,width,max,min;isDrawing=1;if(options.style.height){tooltip.css('height',options.style.height);}
if(options.style.width){tooltip.css('width',options.style.width);}
else{tooltip.css('width','').addClass(fluidClass);width=tooltip.width()+ 1;max=tooltip.css('max-width')||'';min=tooltip.css('min-width')||'';perc=(max+ min).indexOf('%')>-1?container.width()/100:0;max=((max.indexOf('%')>-1?perc:1)*parseInt(max,10))||width;min=((min.indexOf('%')>-1?perc:1)*parseInt(min,10))||0;width=max+ min?Math.min(Math.max(width,min),max):width;tooltip.css('width',Math.round(width)).removeClass(fluidClass);}
isDrawing=0;return self;},disable:function(state)
{if('boolean'!==typeof state){state=!(tooltip.hasClass(disabled)||cache.disabled);}
if(self.rendered){tooltip.toggleClass(disabled,state);$.attr(tooltip[0],'aria-disabled',state);}
else{cache.disabled=!!state;}
return self;},enable:function(){return self.disable(FALSE);},destroy:function()
{var t=target[0],title=$.attr(t,oldtitle);if(self.rendered){tooltip.remove();$.each(self.plugins,function(){if(this.destroy){this.destroy();}});}
clearTimeout(self.timers.show);clearTimeout(self.timers.hide);unassignEvents();$.removeData(t,'qtip');if(options.suppress&&title){$.attr(t,'title',title);target.removeAttr(oldtitle);}
target.removeAttr('aria-describedby').unbind('.qtip');delete usedIDs[self.id];return target;}});}
function init(id,opts)
{var obj,posOptions,attr,config,title,elem=$(this),docBody=$(document.body),newTarget=this===document?docBody:elem,metadata=(elem.metadata)?elem.metadata(opts.metadata):NULL,metadata5=opts.metadata.type==='html5'&&metadata?metadata[opts.metadata.name]:NULL,html5=elem.data(opts.metadata.name||'qtipopts');try{html5=typeof html5==='string'?(new Function("return "+ html5))():html5;}
catch(e){log('Unable to parse HTML5 attribute data: '+ html5);}
config=$.extend(TRUE,{},QTIP.defaults,opts,typeof html5==='object'?sanitizeOptions(html5):NULL,sanitizeOptions(metadata5||metadata));posOptions=config.position;config.id=id;if('boolean'===typeof config.content.text){attr=elem.attr(config.content.attr);if(config.content.attr!==FALSE&&attr){config.content.text=attr;}
else{log('Unable to locate content for tooltip! Aborting render of tooltip on element: ',elem);return FALSE;}}
if(posOptions.container===FALSE){posOptions.container=docBody;}
if(posOptions.target===FALSE){posOptions.target=newTarget;}
if(config.show.target===FALSE){config.show.target=newTarget;}
if(config.show.solo===TRUE){config.show.solo=docBody;}
if(config.hide.target===FALSE){config.hide.target=newTarget;}
if(config.position.viewport===TRUE){config.position.viewport=posOptions.container;}
posOptions.at=new PLUGINS.Corner(posOptions.at);posOptions.my=new PLUGINS.Corner(posOptions.my);if($.data(this,'qtip')){if(config.overwrite){elem.qtip('destroy');}
else if(config.overwrite===FALSE){return FALSE;}}
if(config.suppress&&(title=$.attr(this,'title'))){$(this).removeAttr('title').attr(oldtitle,title);}
obj=new QTip(elem,config,id,!!attr);$.data(this,'qtip',obj);elem.bind('remove.qtip',function(){obj.destroy();});return obj;}
QTIP=$.fn.qtip=function(options,notation,newValue)
{var command=(''+ options).toLowerCase(),returned=NULL,args=command==='disable'?[TRUE]:$.makeArray(arguments).slice(1),event=args[args.length- 1],opts=this[0]?$.data(this[0],'qtip'):NULL;if((!arguments.length&&opts)||command==='api'){return opts;}
else if('string'===typeof options)
{this.each(function()
{var api=$.data(this,'qtip');if(!api){return TRUE;}
if(event&&event.timeStamp){api.cache.event=event;}
if((command==='option'||command==='options')&&notation){if($.isPlainObject(notation)||newValue!==undefined){api.set(notation,newValue);}
else{returned=api.get(notation);return FALSE;}}
else if(api[command]){api[command].apply(api[command],args);}});return returned!==NULL?returned:this;}
else if('object'===typeof options||!arguments.length)
{opts=sanitizeOptions($.extend(TRUE,{},options));return QTIP.bind.call(this,opts,event);}};QTIP.bind=function(opts,event)
{return this.each(function(i){var options,targets,events,namespace,api,id;id=$.isArray(opts.id)?opts.id[i]:opts.id;id=!id||id===FALSE||id.length<1||usedIDs[id]?QTIP.nextid++:(usedIDs[id]=id);namespace='.qtip-'+id+'-create';api=init.call(this,id,opts);if(api===FALSE){return TRUE;}
options=api.options;$.each(PLUGINS,function(){if(this.initialize==='initialize'){this(api);}});targets={show:options.show.target,hide:options.hide.target};events={show:$.trim(''+ options.show.event).replace(/ /g,namespace+' ')+ namespace,hide:$.trim(''+ options.hide.event).replace(/ /g,namespace+' ')+ namespace};if(/mouse(over|enter)/i.test(events.show)&&!/mouse(out|leave)/i.test(events.hide)){events.hide+=' mouseleave'+ namespace;}
targets.show.bind('mousemove'+namespace,function(event){MOUSE={pageX:event.pageX,pageY:event.pageY,type:'mousemove'};});function hoverIntent(event){function render(){api.render(typeof event==='object'||options.show.ready);targets.show.add(targets.hide).unbind(namespace);}
if(api.cache.disabled){return FALSE;}
api.cache.event=$.extend({},event);api.cache.target=event?$(event.target):[undefined];if(options.show.delay>0){clearTimeout(api.timers.show);api.timers.show=setTimeout(render,options.show.delay);if(events.show!==events.hide){targets.hide.bind(events.hide,function(){clearTimeout(api.timers.show);});}}
else{render();}}
targets.show.bind(events.show,hoverIntent);if(options.show.ready||options.prerender){hoverIntent(event);}});};PLUGINS=QTIP.plugins={Corner:function(corner){corner=(''+ corner).replace(/([A-Z])/,' $1').replace(/middle/gi,'center').toLowerCase();this.x=(corner.match(/left|right/i)||corner.match(/center/)||['inherit'])[0].toLowerCase();this.y=(corner.match(/top|bottom|center/i)||['inherit'])[0].toLowerCase();this.precedance=(corner.charAt(0).search(/^(t|b)/)>-1)?'y':'x';this.string=function(){return this.precedance==='y'?this.y+this.x:this.x+this.y;};this.abbreviation=function(){var x=this.x.substr(0,1),y=this.y.substr(0,1);return x===y?x:(x==='c'||(x!=='c'&&y!=='c'))?y+ x:x+ y;};},offset:function(elem,container,fixed){var pos=elem.offset(),parent=container,deep=0,docBody=document.body,coffset;function scroll(e,i){pos.left+=i*e.scrollLeft();pos.top+=i*e.scrollTop();}
if(parent){do{if(parent.css('position')!=='static'){coffset=parent[0]===docBody?{left:parseInt(parent.css('left'),10)||0,top:parseInt(parent.css('top'),10)||0}:parent.position();pos.left-=coffset.left+(parseInt(parent.css('borderLeftWidth'),10)||0)+(parseInt(parent.css('marginLeft'),10)||0);pos.top-=coffset.top+(parseInt(parent.css('borderTopWidth'),10)||0);deep++;}
if(parent[0]===docBody){break;}}
while(parent=parent.offsetParent());if(container[0]!==docBody&&deep>1){scroll(container,1);}
if((PLUGINS.iOS<4.1&&PLUGINS.iOS>3.1)||(!PLUGINS.iOS&&fixed)){scroll($(window),-1);}}
return pos;},iOS:parseFloat((''+(/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,''])[1]).replace('undefined','3_2').replace('_','.'))||FALSE,fn:{attr:function(attr,val){if(this.length){var self=this[0],title='title',api=$.data(self,'qtip');if(attr===title&&'object'===typeof api&&api.options.suppress){if(arguments.length<2){return $.attr(self,oldtitle);}
else{if(api&&api.options.content.attr===title&&api.cache.attr){api.set('content.text',val);}
return this.attr(oldtitle,val);}}}
return $.fn['attr'+replaceSuffix].apply(this,arguments);},clone:function(keepData){var titles=$([]),title='title',elems=$.fn['clone'+replaceSuffix].apply(this,arguments);if(!keepData){elems.filter('['+oldtitle+']').attr('title',function(){return $.attr(this,oldtitle);}).removeAttr(oldtitle);}
return elems;},remove:$.ui?NULL:function(selector,keepData){$(this).each(function(){if(!keepData){if(!selector||$.filter(selector,[this]).length){$('*',this).add(this).each(function(){$(this).triggerHandler('remove');});}}});}}};$.each(PLUGINS.fn,function(name,func){if(!func){return TRUE;}
var old=$.fn[name+replaceSuffix]=$.fn[name];$.fn[name]=function(){return func.apply(this,arguments)||old.apply(this,arguments);};});QTIP.version='2.0.0pre';QTIP.nextid=0;QTIP.inactiveEvents='click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' ');QTIP.zindex=15000;QTIP.defaults={prerender:FALSE,id:FALSE,overwrite:TRUE,suppress:TRUE,content:{text:TRUE,attr:'title',title:{text:FALSE,button:FALSE}},position:{my:'top left',at:'bottom right',target:FALSE,container:FALSE,viewport:FALSE,adjust:{x:0,y:0,mouse:TRUE,resize:TRUE,method:'flip flip'},effect:function(api,pos,viewport){$(this).animate(pos,{duration:200,queue:FALSE});}},show:{target:FALSE,event:'mouseenter',effect:TRUE,delay:90,solo:FALSE,ready:FALSE,autofocus:FALSE},hide:{target:FALSE,event:'mouseleave',effect:TRUE,delay:0,fixed:FALSE,inactive:FALSE,leave:'window',distance:FALSE},style:{classes:'',widget:FALSE,width:FALSE,height:FALSE},events:{render:NULL,move:NULL,show:NULL,hide:NULL,toggle:NULL,visible:NULL,focus:NULL,blur:NULL}};function Ajax(api)
{var self=this,tooltip=api.elements.tooltip,opts=api.options.content.ajax,namespace='.qtip-ajax',rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,first=TRUE;api.checks.ajax={'^content.ajax':function(obj,name,v){if(name==='ajax'){opts=v;}
if(name==='once'){self.init();}
else if(opts&&opts.url){self.load();}
else{tooltip.unbind(namespace);}}};$.extend(self,{init:function()
{if(opts&&opts.url){tooltip.unbind(namespace)[opts.once?'one':'bind']('tooltipshow'+namespace,self.load);}
return self;},load:function(event,first)
{if(event&&event.isDefaultPrevented()){return self;}
var hasSelector=opts.url.indexOf(' '),url=opts.url,selector,hideFirst=opts.once&&!opts.loading&&first;if(hideFirst){tooltip.css('visibility','hidden');}
if(hasSelector>-1){selector=url.substr(hasSelector);url=url.substr(0,hasSelector);}
function after(){if(hideFirst){tooltip.css('visibility','');first=FALSE;}
if($.isFunction(opts.complete)){opts.complete.apply(this,arguments);}}
function successHandler(content){if(selector){content=$('<div/>').append(content.replace(rscript,"")).find(selector);}
api.set('content.text',content);}
function errorHandler(xh,status,error){api.set('content.text',status+': '+ error);}
$.ajax($.extend({success:successHandler,error:errorHandler,context:api},opts,{url:url,complete:after}));return self;}});self.init();}
PLUGINS.ajax=function(api)
{var self=api.plugins.ajax;return'object'===typeof self?self:(api.plugins.ajax=new Ajax(api));};PLUGINS.ajax.initialize='render';PLUGINS.ajax.sanitize=function(options)
{var content=options.content,opts;if(content&&'ajax'in content){opts=content.ajax;if(typeof opts!=='object'){opts=options.content.ajax={url:opts};}
if('boolean'!==typeof opts.once&&opts.once){opts.once=!!opts.once;}}};$.extend(TRUE,QTIP.defaults,{content:{ajax:{loading:TRUE,once:TRUE}}});function BGIFrame(api)
{var self=this,elems=api.elements,tooltip=elems.tooltip,namespace='.bgiframe-'+ api.id;$.extend(self,{init:function()
{elems.bgiframe=$('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';" '+' style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); '+'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>');elems.bgiframe.appendTo(tooltip);tooltip.bind('tooltipmove'+namespace,self.adjust);},adjust:function()
{var dimensions=api.get('dimensions'),plugin=api.plugins.tip,tip=elems.tip,tipAdjust,offset;offset=parseInt(tooltip.css('border-left-width'),10)||0;offset={left:-offset,top:-offset};if(plugin&&tip){tipAdjust=(plugin.corner.precedance==='x')?['width','left']:['height','top'];offset[tipAdjust[1]]-=tip[tipAdjust[0]]();}
elems.bgiframe.css(offset).css(dimensions);},destroy:function()
{elems.bgiframe.remove();tooltip.unbind(namespace);}});self.init();}
PLUGINS.bgiframe=function(api)
{var browser=$.browser,self=api.plugins.bgiframe;if($('select, object').length<1||!(browser.msie&&browser.version.charAt(0)==='6')){return FALSE;}
return'object'===typeof self?self:(api.plugins.bgiframe=new BGIFrame(api));};PLUGINS.bgiframe.initialize='render';PLUGINS.imagemap=function(area,corner)
{if(!area.jquery){area=$(area);}
var shape=area.attr('shape').toLowerCase(),baseCoords=area.attr('coords').split(','),coords=[],image=$('img[usemap="#'+area.parent('map').attr('name')+'"]'),imageOffset=image.offset(),result={width:0,height:0,offset:{top:1e10,right:0,bottom:0,left:1e10}},i=0,next=0;function polyCoordinates(result,coords)
{var i=0,compareX=1,compareY=1,realX=0,realY=0,newWidth=result.width,newHeight=result.height;while(newWidth>0&&newHeight>0&&compareX>0&&compareY>0)
{newWidth=Math.floor(newWidth/2);newHeight=Math.floor(newHeight/2);if(corner.x==='left'){compareX=newWidth;}
else if(corner.x==='right'){compareX=result.width- newWidth;}
else{compareX+=Math.floor(newWidth/2);}
if(corner.y==='top'){compareY=newHeight;}
else if(corner.y==='bottom'){compareY=result.height- newHeight;}
else{compareY+=Math.floor(newHeight/2);}
i=coords.length;while(i--)
{if(coords.length<2){break;}
realX=coords[i][0]- result.offset.left;realY=coords[i][1]- result.offset.top;if((corner.x==='left'&&realX>=compareX)||(corner.x==='right'&&realX<=compareX)||(corner.x==='center'&&(realX<compareX||realX>(result.width- compareX)))||(corner.y==='top'&&realY>=compareY)||(corner.y==='bottom'&&realY<=compareY)||(corner.y==='center'&&(realY<compareY||realY>(result.height- compareY)))){coords.splice(i,1);}}}
return{left:coords[0][0],top:coords[0][1]};}
imageOffset.left+=Math.ceil((image.outerWidth()- image.width())/2);imageOffset.top+=Math.ceil((image.outerHeight()- image.height())/2);if(shape==='poly'){i=baseCoords.length;while(i--)
{next=[parseInt(baseCoords[--i],10),parseInt(baseCoords[i+1],10)];if(next[0]>result.offset.right){result.offset.right=next[0];}
if(next[0]<result.offset.left){result.offset.left=next[0];}
if(next[1]>result.offset.bottom){result.offset.bottom=next[1];}
if(next[1]<result.offset.top){result.offset.top=next[1];}
coords.push(next);}}
else{coords=$.map(baseCoords,function(coord){return parseInt(coord,10);});}
switch(shape)
{case'rect':result={width:Math.abs(coords[2]- coords[0]),height:Math.abs(coords[3]- coords[1]),offset:{left:coords[0],top:coords[1]}};break;case'circle':result={width:coords[2]+ 2,height:coords[2]+ 2,offset:{left:coords[0],top:coords[1]}};break;case'poly':$.extend(result,{width:Math.abs(result.offset.right- result.offset.left),height:Math.abs(result.offset.bottom- result.offset.top)});if(corner.string()==='centercenter'){result.offset={left:result.offset.left+(result.width/2),top:result.offset.top+(result.height/2)};}
else{result.offset=polyCoordinates(result,coords.slice());}
result.width=result.height=0;break;}
result.offset.left+=imageOffset.left;result.offset.top+=imageOffset.top;return result;};function Modal(api)
{var self=this,options=api.options.show.modal,elems=api.elements,tooltip=elems.tooltip,overlaySelector='#qtip-overlay',globalNamespace='.qtipmodal',namespace=globalNamespace+ api.id,attr='is-modal-qtip',docBody=$(document.body),overlay;api.checks.modal={'^show.modal.(on|blur)$':function(){self.init();elems.overlay.toggle(tooltip.is(':visible'));}};$.extend(self,{init:function()
{if(!options.on){return self;}
overlay=self.create();tooltip.attr(attr,TRUE).css('z-index',PLUGINS.modal.zindex+ $(selector+'['+attr+']').length).unbind(globalNamespace).unbind(namespace).bind('tooltipshow'+globalNamespace+' tooltiphide'+globalNamespace,function(event,api,duration){var oEvent=event.originalEvent;if(oEvent&&event.type==='tooltiphide'&&/mouse(leave|enter)/.test(oEvent.type)&&$(oEvent.relatedTarget).closest(overlay[0]).length){event.preventDefault();}
else{self[event.type.replace('tooltip','')](event,duration);}}).bind('tooltipfocus'+globalNamespace,function(event){if(event.isDefaultPrevented()){return;}
var qtips=$(selector).filter('['+attr+']'),newIndex=PLUGINS.modal.zindex+ qtips.length,curIndex=parseInt(tooltip[0].style.zIndex,10);overlay[0].style.zIndex=newIndex;qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex-=1;}});qtips.end().filter('.'+ focusClass).qtip('blur',event.originalEvent);tooltip.addClass(focusClass)[0].style.zIndex=newIndex;event.preventDefault();}).bind('tooltiphide'+globalNamespace,function(event){$('['+ attr+']').filter(':visible').not(tooltip).last().qtip('focus',event);});if(options.escape){$(window).unbind(namespace).bind('keydown'+namespace,function(event){if(event.keyCode===27&&tooltip.hasClass(focusClass)){api.hide(event);}});}
if(options.blur){elems.overlay.unbind(namespace).bind('click'+namespace,function(event){if(tooltip.hasClass(focusClass)){api.hide(event);}});}
return self;},create:function()
{var elem=$(overlaySelector);if(elem.length){elems.overlay=elem;return elem;}
overlay=elems.overlay=$('<div />',{id:overlaySelector.substr(1),html:'<div></div>',mousedown:function(){return FALSE;}}).insertBefore($(selector).first());$(window).unbind(globalNamespace).bind('resize'+globalNamespace,function(){overlay.css({height:$(window).height(),width:$(window).width()});}).triggerHandler('resize');return overlay;},toggle:function(event,state,duration)
{if(event&&event.isDefaultPrevented()){return self;}
var effect=options.effect,type=state?'show':'hide',visible=overlay.is(':visible'),modals=$('['+ attr+']').filter(':visible').not(tooltip),zindex;if(!overlay){overlay=self.create();}
if((overlay.is(':animated')&&visible===state)||(!state&&modals.length)){return self;}
if(state){overlay.css({left:0,top:0});overlay.toggleClass('blurs',options.blur);docBody.delegate('*','focusin'+namespace,function(event){if($(event.target).closest(selector)[0]!==tooltip[0]){$('a, :input, img',tooltip).add(tooltip).focus();}});}
else{docBody.undelegate('*','focusin'+namespace);}
overlay.stop(TRUE,FALSE);if($.isFunction(effect)){effect.call(overlay,state);}
else if(effect===FALSE){overlay[type]();}
else{overlay.fadeTo(parseInt(duration,10)||90,state?1:0,function(){if(!state){$(this).hide();}});}
if(!state){overlay.queue(function(next){overlay.css({left:'',top:''});next();});}
return self;},show:function(event,duration){return self.toggle(event,TRUE,duration);},hide:function(event,duration){return self.toggle(event,FALSE,duration);},destroy:function()
{var delBlanket=overlay;if(delBlanket){delBlanket=$('['+ attr+']').not(tooltip).length<1;if(delBlanket){elems.overlay.remove();$(window).unbind(globalNamespace);}
else{elems.overlay.unbind(globalNamespace+api.id);}
docBody.undelegate('*','focusin'+namespace);}
return tooltip.removeAttr(attr).unbind(globalNamespace);}});self.init();}
PLUGINS.modal=function(api){var self=api.plugins.modal;return'object'===typeof self?self:(api.plugins.modal=new Modal(api));};PLUGINS.modal.initialize='render';PLUGINS.modal.sanitize=function(opts){if(opts.show){if(typeof opts.show.modal!=='object'){opts.show.modal={on:!!opts.show.modal};}
else if(typeof opts.show.modal.on==='undefined'){opts.show.modal.on=TRUE;}}};PLUGINS.modal.zindex=QTIP.zindex-=200;$.extend(TRUE,QTIP.defaults,{show:{modal:{on:FALSE,effect:TRUE,blur:TRUE,escape:TRUE}}});PLUGINS.svg=function(svg,corner)
{var doc=$(document),elem=svg[0],result={width:0,height:0,offset:{top:1e10,left:1e10}},box,mtx,root,point,tPoint;if(elem.getBBox&&elem.parentNode){box=elem.getBBox();mtx=elem.getScreenCTM();root=elem.farthestViewportElement||elem;if(!root.createSVGPoint){return result;}
point=root.createSVGPoint();point.x=box.x;point.y=box.y;tPoint=point.matrixTransform(mtx);result.offset.left=tPoint.x;result.offset.top=tPoint.y;point.x+=box.width;point.y+=box.height;tPoint=point.matrixTransform(mtx);result.width=tPoint.x- result.offset.left;result.height=tPoint.y- result.offset.top;result.offset.left+=doc.scrollLeft();result.offset.top+=doc.scrollTop();}
return result;};function calculateTip(corner,width,height)
{var width2=Math.ceil(width/2),height2=Math.ceil(height/2),tips={bottomright:[[0,0],[width,height],[width,0]],bottomleft:[[0,0],[width,0],[0,height]],topright:[[0,height],[width,0],[width,height]],topleft:[[0,0],[0,height],[width,height]],topcenter:[[0,height],[width2,0],[width,height]],bottomcenter:[[0,0],[width,0],[width2,height]],rightcenter:[[0,0],[width,height2],[0,height]],leftcenter:[[width,0],[width,height],[0,height2]]};tips.lefttop=tips.bottomright;tips.righttop=tips.bottomleft;tips.leftbottom=tips.topright;tips.rightbottom=tips.topleft;return tips[corner.string()];}
function Tip(qTip,command)
{var self=this,opts=qTip.options.style.tip,elems=qTip.elements,tooltip=elems.tooltip,cache={top:0,left:0,corner:''},size={width:opts.width,height:opts.height},color={},border=opts.border||0,namespace='.qtip-tip',hasCanvas=!!($('<canvas />')[0]||{}).getContext;self.corner=NULL;self.mimic=NULL;self.border=border;self.offset=opts.offset;self.size=size;qTip.checks.tip={'^position.my|style.tip.(corner|mimic|border)$':function(){if(!self.init()){self.destroy();}
qTip.reposition();},'^style.tip.(height|width)$':function(){size={width:opts.width,height:opts.height};self.create();self.update();qTip.reposition();},'^content.title.text|style.(classes|widget)$':function(){if(elems.tip){self.update();}}};function reposition(event,api,pos,viewport){if(!elems.tip){return;}
var newCorner=$.extend({},self.corner),adjust=pos.adjusted,method=qTip.options.position.adjust.method.split(' '),horizontal=method[0],vertical=method[1]||method[0],shift={left:FALSE,top:FALSE,x:0,y:0},offset,css={},props;if(self.corner.fixed!==TRUE){if(horizontal==='shift'&&newCorner.precedance==='x'&&adjust.left&&newCorner.y!=='center'){newCorner.precedance=newCorner.precedance==='x'?'y':'x';}
else if(horizontal==='flip'&&adjust.left){newCorner.x=newCorner.x==='center'?(adjust.left>0?'left':'right'):(newCorner.x==='left'?'right':'left');}
if(vertical==='shift'&&newCorner.precedance==='y'&&adjust.top&&newCorner.x!=='center'){newCorner.precedance=newCorner.precedance==='y'?'x':'y';}
else if(vertical==='flip'&&adjust.top){newCorner.y=newCorner.y==='center'?(adjust.top>0?'top':'bottom'):(newCorner.y==='top'?'bottom':'top');}
if(newCorner.string()!==cache.corner&&(cache.top!==adjust.top||cache.left!==adjust.left)){self.update(newCorner,FALSE);}}
offset=self.position(newCorner,adjust);if(offset.right!==undefined){offset.left=-offset.right;}
if(offset.bottom!==undefined){offset.top=-offset.bottom;}
offset.user=Math.max(0,opts.offset);if(shift.left=(horizontal==='shift'&&!!adjust.left)){if(newCorner.x==='center'){css['margin-left']=shift.x=offset['margin-left']- adjust.left;}
else{props=offset.right!==undefined?[adjust.left,-offset.left]:[-adjust.left,offset.left];if((shift.x=Math.max(props[0],props[1]))>props[0]){pos.left-=adjust.left;shift.left=FALSE;}
css[offset.right!==undefined?'right':'left']=shift.x;}}
if(shift.top=(vertical==='shift'&&!!adjust.top)){if(newCorner.y==='center'){css['margin-top']=shift.y=offset['margin-top']- adjust.top;}
else{props=offset.bottom!==undefined?[adjust.top,-offset.top]:[-adjust.top,offset.top];if((shift.y=Math.max(props[0],props[1]))>props[0]){pos.top-=adjust.top;shift.top=FALSE;}
css[offset.bottom!==undefined?'bottom':'top']=shift.y;}}
elems.tip.css(css).toggle(!((shift.x&&shift.y)||(newCorner.x==='center'&&shift.y)||(newCorner.y==='center'&&shift.x)));pos.left-=offset.left.charAt?offset.user:horizontal!=='shift'||shift.top||!shift.left&&!shift.top?offset.left:0;pos.top-=offset.top.charAt?offset.user:vertical!=='shift'||shift.left||!shift.left&&!shift.top?offset.top:0;cache.left=adjust.left;cache.top=adjust.top;cache.corner=newCorner.string();}
function borderWidth(corner,side,backup){side=!side?corner[corner.precedance]:side;var isFluid=tooltip.hasClass(fluidClass),isTitleTop=elems.titlebar&&corner.y==='top',elem=isTitleTop?elems.titlebar:elems.content,css='border-'+ side+'-width',val;tooltip.addClass(fluidClass);val=parseInt(elem.css(css),10);val=(backup?val||parseInt(tooltip.css(css),10):val)||0;tooltip.toggleClass(fluidClass,isFluid);return val;}
function borderRadius(corner){var isTitleTop=elems.titlebar&&corner.y==='top',elem=isTitleTop?elems.titlebar:elems.content,moz=$.browser.mozilla,prefix=moz?'-moz-':$.browser.webkit?'-webkit-':'',side=corner.y+(moz?'':'-')+ corner.x,css=prefix+(moz?'border-radius-'+ side:'border-'+ side+'-radius');return parseInt(elem.css(css),10)||parseInt(tooltip.css(css),10)||0;}
function calculateSize(corner){var y=corner.precedance==='y',width=size[y?'width':'height'],height=size[y?'height':'width'],isCenter=corner.string().indexOf('center')>-1,base=width*(isCenter?0.5:1),pow=Math.pow,round=Math.round,bigHyp,ratio,result,smallHyp=Math.sqrt(pow(base,2)+ pow(height,2)),hyp=[(border/base)*smallHyp,(border/height)*smallHyp];hyp[2]=Math.sqrt(pow(hyp[0],2)- pow(border,2));hyp[3]=Math.sqrt(pow(hyp[1],2)- pow(border,2));bigHyp=smallHyp+ hyp[2]+ hyp[3]+(isCenter?0:hyp[0]);ratio=bigHyp/smallHyp;result=[round(ratio*height),round(ratio*width)];return{height:result[y?0:1],width:result[y?1:0]};}
$.extend(self,{init:function()
{var enabled=self.detectCorner()&&(hasCanvas||$.browser.msie);if(enabled){self.create();self.update();tooltip.unbind(namespace).bind('tooltipmove'+namespace,reposition);}
return enabled;},detectCorner:function()
{var corner=opts.corner,posOptions=qTip.options.position,at=posOptions.at,my=posOptions.my.string?posOptions.my.string():posOptions.my;if(corner===FALSE||(my===FALSE&&at===FALSE)){return FALSE;}
else{if(corner===TRUE){self.corner=new PLUGINS.Corner(my);}
else if(!corner.string){self.corner=new PLUGINS.Corner(corner);self.corner.fixed=TRUE;}}
return self.corner.string()!=='centercenter';},detectColours:function(){var i,fill,border,tip=elems.tip.css({backgroundColor:'',border:''}),corner=self.corner,precedance=corner[corner.precedance],borderSide='border-'+ precedance+'-color',borderSideCamel='border'+ precedance.charAt(0)+ precedance.substr(1)+'Color',invalid=/rgba?\(0, 0, 0(, 0)?\)|transparent/i,backgroundColor='background-color',transparent='transparent',bodyBorder=$(document.body).css('color'),contentColour=qTip.elements.content.css('color'),useTitle=elems.titlebar&&(corner.y==='top'||(corner.y==='center'&&tip.position().top+(size.height/2)+ opts.offset<elems.titlebar.outerHeight(1))),colorElem=useTitle?elems.titlebar:elems.content;tooltip.addClass(fluidClass);color.fill=fill=tip.css(backgroundColor);color.border=border=tip[0].style[borderSideCamel]||tip.css(borderSide)||tooltip.css(borderSide);if(!fill||invalid.test(fill)){color.fill=colorElem.css(backgroundColor)||transparent;if(invalid.test(color.fill)){color.fill=tooltip.css(backgroundColor)||fill;}}
if(!border||invalid.test(border)||border===bodyBorder){color.border=colorElem.css(borderSide)||transparent;if(invalid.test(color.border)||color.border===contentColour){color.border=border;}}
$('*',tip).add(tip).css(backgroundColor,transparent).css('border','');tooltip.removeClass(fluidClass);},create:function()
{var width=size.width,height=size.height,vml;if(elems.tip){elems.tip.remove();}
elems.tip=$('<div />',{'class':'ui-tooltip-tip'}).css({width:width,height:height}).prependTo(tooltip);if(hasCanvas){$('<canvas />').appendTo(elems.tip)[0].getContext('2d').save();}
else{vml='<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>';elems.tip.html(vml+ vml);}},update:function(corner,position)
{var tip=elems.tip,inner=tip.children(),width=size.width,height=size.height,regular='px solid ',transparent='px dashed transparent',mimic=opts.mimic,round=Math.round,precedance,context,coords,translate,newSize;if(!corner){corner=self.corner;}
if(mimic===FALSE){mimic=corner;}
else{mimic=new PLUGINS.Corner(mimic);mimic.precedance=corner.precedance;if(mimic.x==='inherit'){mimic.x=corner.x;}
else if(mimic.y==='inherit'){mimic.y=corner.y;}
else if(mimic.x===mimic.y){mimic[corner.precedance]=corner[corner.precedance];}}
precedance=mimic.precedance;self.detectColours();if(color.border!=='transparent'&&color.border!=='#123456'){border=borderWidth(corner,NULL,TRUE);if(opts.border===0&&border>0){color.fill=color.border;}
self.border=border=opts.border!==TRUE?opts.border:border;}
else{self.border=border=0;}
coords=calculateTip(mimic,width,height);self.size=newSize=calculateSize(corner);tip.css(newSize);if(corner.precedance==='y'){translate=[round(mimic.x==='left'?border:mimic.x==='right'?newSize.width- width- border:(newSize.width- width)/2),round(mimic.y==='top'?newSize.height- height:0)];}
else{translate=[round(mimic.x==='left'?newSize.width- width:0),round(mimic.y==='top'?border:mimic.y==='bottom'?newSize.height- height- border:(newSize.height- height)/2)];}
if(hasCanvas){inner.attr(newSize);context=inner[0].getContext('2d');context.restore();context.save();context.clearRect(0,0,3000,3000);context.translate(translate[0],translate[1]);context.beginPath();context.moveTo(coords[0][0],coords[0][1]);context.lineTo(coords[1][0],coords[1][1]);context.lineTo(coords[2][0],coords[2][1]);context.closePath();context.fillStyle=color.fill;context.strokeStyle=color.border;context.lineWidth=border*2;context.lineJoin='miter';context.miterLimit=100;if(border){context.stroke();}
context.fill();}
else{coords='m'+ coords[0][0]+','+ coords[0][1]+' l'+ coords[1][0]+','+ coords[1][1]+' '+ coords[2][0]+','+ coords[2][1]+' xe';translate[2]=border&&/^(r|b)/i.test(corner.string())?parseFloat($.browser.version,10)===8?2:1:0;inner.css({antialias:''+(mimic.string().indexOf('center')>-1),left:translate[0]-(translate[2]*Number(precedance==='x')),top:translate[1]-(translate[2]*Number(precedance==='y')),width:width+ border,height:height+ border}).each(function(i){var $this=$(this);$this[$this.prop?'prop':'attr']({coordsize:(width+border)+' '+(height+border),path:coords,fillcolor:color.fill,filled:!!i,stroked:!!!i}).css({display:border||i?'block':'none'});if(!i&&$this.html()===''){$this.html('<vml:stroke weight="'+(border*2)+'px" color="'+color.border+'" miterlimit="1000" joinstyle="miter" '+' style="behavior:url(#default#VML); display:inline-block;" />');}});}
if(position!==FALSE){self.position(corner);}},position:function(corner)
{var tip=elems.tip,position={},userOffset=Math.max(0,opts.offset),precedance,dimensions,corners;if(opts.corner===FALSE||!tip){return FALSE;}
corner=corner||self.corner;precedance=corner.precedance;dimensions=calculateSize(corner);corners=[corner.x,corner.y];if(precedance==='x'){corners.reverse();}
$.each(corners,function(i,side){var b,br;if(side==='center'){b=precedance==='y'?'left':'top';position[b]='50%';position['margin-'+ b]=-Math.round(dimensions[precedance==='y'?'width':'height']/2)+ userOffset;}
else{b=borderWidth(corner,side,TRUE);br=borderRadius(corner);position[side]=i?border?borderWidth(corner,side):0:userOffset+(br>b?br:0);}});position[corner[precedance]]-=dimensions[precedance==='x'?'width':'height'];tip.css({top:'',bottom:'',left:'',right:'',margin:''}).css(position);return position;},destroy:function()
{if(elems.tip){elems.tip.remove();}
tooltip.unbind(namespace);}});self.init();}
PLUGINS.tip=function(api)
{var self=api.plugins.tip;return'object'===typeof self?self:(api.plugins.tip=new Tip(api));};PLUGINS.tip.initialize='render';PLUGINS.tip.sanitize=function(options)
{var style=options.style,opts;if(style&&'tip'in style){opts=options.style.tip;if(typeof opts!=='object'){options.style.tip={corner:opts};}
if(!(/string|boolean/i).test(typeof opts.corner)){opts.corner=TRUE;}
if(typeof opts.width!=='number'){delete opts.width;}
if(typeof opts.height!=='number'){delete opts.height;}
if(typeof opts.border!=='number'&&opts.border!==TRUE){delete opts.border;}
if(typeof opts.offset!=='number'){delete opts.offset;}}};$.extend(TRUE,QTIP.defaults,{style:{tip:{corner:TRUE,mimic:FALSE,width:2,height:2,border:FALSE,offset:0}}});}(jQuery,window));;if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)){}else{(function($){Drupal.behaviors.qtip={attach:function(context){if(Drupal.settings.qtip.show_event_type=='click'){show_delay=1;}
else{show_delay=350;}
if(Drupal.settings.qtip.show_speech_bubble_tip){if(Drupal.settings.qtip.show_speech_bubble_tip_side){switch_position=Drupal.settings.qtip.tooltip_position.split('_');if(switch_position[1]=='center'){tip_position=Drupal.settings.qtip.tooltip_position;}
else{tip_position=switch_position[1]+' '+ switch_position[0];}}
else{tip_position=Drupal.settings.qtip.tooltip_position;}}
else{tip_position=false;}
if(Drupal.settings.qtip.color=='custom-color'){Drupal.settings.qtip.color=Drupal.settings.qtip.custom_color;}
if(Drupal.settings.qtip.show_shadow){style_classes='ui-tooltip-shadow '+ Drupal.settings.qtip.color;}
else{style_classes=Drupal.settings.qtip.color;}
if(Drupal.settings.qtip.rounded_corners){style_classes+=' ui-tooltip-rounded';}
if(Drupal.settings.qtip.show_speech_bubble_tip_solid){solid_tip=false;}
else{solid_tip=1;}
$('.qtip-link').each(function(){if(Drupal.settings.qtip.show_event_type=='click'){$(this).addClass('ui-tooltip-click');}
if($(this).children('.qtip-header').length){tooltip_title=$(this).children('.qtip-header').html();}
else{tooltip_title=false;}
build_qtip(this,'node');});if(Drupal.settings.qtip.additional_elements){$(Drupal.settings.qtip.additional_elements).each(function(){$(this).addClass('qtip-additional-element');if(Drupal.settings.qtip.show_event_type=='click'){$(this).addClass('ui-tooltip-click');}
if($(this).children('.qtip-header').length){tooltip_title=$(this).children('.qtip-header').html();}
else{tooltip_title=false;}
build_qtip(this,'node');});}
if(Drupal.settings.qtip.show_webform_descriptions){$('form.webform-client-form .form-text,'+'form.webform-client-form .form-select').each(function(){description=$(this).siblings('.description');description.css('display','none');tooltip_title=false;show_delay=1;build_qtip(this,'form',description.html());});$('form.webform-client-form .form-radios,'+'form.webform-client-form .form-textarea').each(function(){description=$(this).parent().siblings('.description');description.css('display','none');tooltip_title=false;show_delay=1;build_qtip(this,'form',description.html());});}
function build_qtip(el,type,desc){if(type=='form'){show_text=desc?desc:'';show_text=show_text.replace(/(<.*?>)/ig,"");set_my='bottom_center';tip_position='left_center';set_at='right_center';show_event='focus';hide_event='blur';}
else{show_text=$(el).children('.qtip-tooltip');set_my=Drupal.settings.qtip.tooltip_position;set_at=Drupal.settings.qtip.target_position;show_event=Drupal.settings.qtip.show_event_type;hide_event=Drupal.settings.qtip.hide_event_type;}
$(el).qtip({content:{text:show_text,title:{text:tooltip_title}},position:{my:'bottom center',at:'top center',adjust:{screen:true},viewport:jQuery(window)},style:{classes:style_classes,tip:{corner:'bottom center',border:solid_tip,width:13,height:7}},show:{event:show_event,solo:true,delay:show_delay},hide:{event:hide_event,fixed:true,delay:200}});}}};})(jQuery);};(function($){Drupal.ajax=Drupal.ajax||{};Drupal.behaviors.AJAX={attach:function(context,settings){for(var base in settings.ajax){if(!$('#'+ base+'.ajax-processed').length){var element_settings=settings.ajax[base];if(typeof element_settings.selector=='undefined'){element_settings.selector='#'+ base;}
$(element_settings.selector).each(function(){element_settings.element=this;Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings);});$('#'+ base).addClass('ajax-processed');}}
$('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function(){var element_settings={};element_settings.progress={'type':'throbber'};if($(this).attr('href')){element_settings.url=$(this).attr('href');element_settings.event='click';}
var base=$(this).attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings);});$('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function(){var element_settings={};element_settings.url=$(this.form).attr('action');element_settings.setClick=true;element_settings.event='click';element_settings.progress={'type':'throbber'};var base=$(this).attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings);});}};Drupal.ajax=function(base,element,element_settings){var defaults={url:'system/ajax',event:'mousedown',keypress:true,selector:'#'+ base,effect:'none',speed:'none',method:'replaceWith',progress:{type:'throbber',message:Drupal.t('Please wait...')},submit:{'js':true}};$.extend(this,defaults,element_settings);this.element=element;this.element_settings=element_settings;this.url=element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g,'/ajax$1');this.wrapper='#'+ element_settings.wrapper;if(this.element.form){this.form=$(this.element.form);}
var ajax=this;ajax.options={url:ajax.url,data:ajax.submit,beforeSerialize:function(element_settings,options){return ajax.beforeSerialize(element_settings,options);},beforeSubmit:function(form_values,element_settings,options){ajax.ajaxing=true;return ajax.beforeSubmit(form_values,element_settings,options);},beforeSend:function(xmlhttprequest,options){ajax.ajaxing=true;return ajax.beforeSend(xmlhttprequest,options);},success:function(response,status){if(typeof response=='string'){response=$.parseJSON(response);}
return ajax.success(response,status);},complete:function(response,status){ajax.ajaxing=false;if(status=='error'||status=='parsererror'){return ajax.error(response,ajax.url);}},dataType:'json',type:'POST'};$(ajax.element).bind(element_settings.event,function(event){return ajax.eventResponse(this,event);});if(element_settings.keypress){$(ajax.element).keypress(function(event){return ajax.keypressResponse(this,event);});}
if(element_settings.prevent){$(ajax.element).bind(element_settings.prevent,false);}};Drupal.ajax.prototype.keypressResponse=function(element,event){var ajax=this;if(event.which==13||(event.which==32&&element.type!='text'&&element.type!='textarea')){$(ajax.element_settings.element).trigger(ajax.element_settings.event);return false;}};Drupal.ajax.prototype.eventResponse=function(element,event){var ajax=this;if(ajax.ajaxing){return false;}
try{if(ajax.form){if(ajax.setClick){element.form.clk=element;}
ajax.form.ajaxSubmit(ajax.options);}
else{ajax.beforeSerialize(ajax.element,ajax.options);$.ajax(ajax.options);}}
catch(e){ajax.ajaxing=false;alert("An error occurred while attempting to process "+ ajax.options.url+": "+ e.message);}
if(typeof element.type!='undefined'&&(element.type=='checkbox'||element.type=='radio')){return true;}
else{return false;}};Drupal.ajax.prototype.beforeSerialize=function(element,options){if(this.form){var settings=this.settings||Drupal.settings;Drupal.detachBehaviors(this.form,settings,'serialize');}
options.data['ajax_html_ids[]']=[];$('[id]').each(function(){options.data['ajax_html_ids[]'].push(this.id);});options.data['ajax_page_state[theme]']=Drupal.settings.ajaxPageState.theme;options.data['ajax_page_state[theme_token]']=Drupal.settings.ajaxPageState.theme_token;for(var key in Drupal.settings.ajaxPageState.css){options.data['ajax_page_state[css]['+ key+']']=1;}
for(var key in Drupal.settings.ajaxPageState.js){options.data['ajax_page_state[js]['+ key+']']=1;}};Drupal.ajax.prototype.beforeSubmit=function(form_values,element,options){};Drupal.ajax.prototype.beforeSend=function(xmlhttprequest,options){if(this.form){options.extraData=options.extraData||{};options.extraData.ajax_iframe_upload='1';var v=$.fieldValue(this.element);if(v!==null){options.extraData[this.element.name]=v;}}
$(this.element).addClass('progress-disabled').attr('disabled',true);if(this.progress.type=='bar'){var progressBar=new Drupal.progressBar('ajax-progress-'+ this.element.id,eval(this.progress.update_callback),this.progress.method,eval(this.progress.error_callback));if(this.progress.message){progressBar.setProgress(-1,this.progress.message);}
if(this.progress.url){progressBar.startMonitoring(this.progress.url,this.progress.interval||1500);}
this.progress.element=$(progressBar.element).addClass('ajax-progress ajax-progress-bar');this.progress.object=progressBar;$(this.element).after(this.progress.element);}
else if(this.progress.type=='throbber'){this.progress.element=$('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');if(this.progress.message){$('.throbber',this.progress.element).after('<div class="message">'+ this.progress.message+'</div>');}
$(this.element).after(this.progress.element);}};Drupal.ajax.prototype.success=function(response,status){if(this.progress.element){$(this.progress.element).remove();}
if(this.progress.object){this.progress.object.stopMonitoring();}
$(this.element).removeClass('progress-disabled').removeAttr('disabled');Drupal.freezeHeight();for(var i in response){if(response[i]['command']&&this.commands[response[i]['command']]){this.commands[response[i]['command']](this,response[i],status);}}
if(this.form){var settings=this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings);}
Drupal.unfreezeHeight();this.settings=null;};Drupal.ajax.prototype.getEffect=function(response){var type=response.effect||this.effect;var speed=response.speed||this.speed;var effect={};if(type=='none'){effect.showEffect='show';effect.hideEffect='hide';effect.showSpeed='';}
else if(type=='fade'){effect.showEffect='fadeIn';effect.hideEffect='fadeOut';effect.showSpeed=speed;}
else{effect.showEffect=type+'Toggle';effect.hideEffect=type+'Toggle';effect.showSpeed=speed;}
return effect;};Drupal.ajax.prototype.error=function(response,uri){alert(Drupal.ajaxError(response,uri));if(this.progress.element){$(this.progress.element).remove();}
if(this.progress.object){this.progress.object.stopMonitoring();}
$(this.wrapper).show();$(this.element).removeClass('progress-disabled').removeAttr('disabled');if(this.form){var settings=response.settings||this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings);}};Drupal.ajax.prototype.commands={insert:function(ajax,response,status){var wrapper=response.selector?$(response.selector):$(ajax.wrapper);var method=response.method||ajax.method;var effect=ajax.getEffect(response);var new_content_wrapped=$('<div></div>').html(response.data);var new_content=new_content_wrapped.contents();if(new_content.length!=1||new_content.get(0).nodeType!=1){new_content=new_content_wrapped;}
switch(method){case'html':case'replaceWith':case'replaceAll':case'empty':case'remove':var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors(wrapper,settings);}
wrapper[method](new_content);if(effect.showEffect!='show'){new_content.hide();}
if($('.ajax-new-content',new_content).length>0){$('.ajax-new-content',new_content).hide();new_content.show();$('.ajax-new-content',new_content)[effect.showEffect](effect.showSpeed);}
else if(effect.showEffect!='show'){new_content[effect.showEffect](effect.showSpeed);}
if(new_content.parents('html').length>0){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.attachBehaviors(new_content,settings);}},remove:function(ajax,response,status){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors($(response.selector),settings);$(response.selector).remove();},changed:function(ajax,response,status){if(!$(response.selector).hasClass('ajax-changed')){$(response.selector).addClass('ajax-changed');if(response.asterisk){$(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');}}},alert:function(ajax,response,status){alert(response.text,response.title);},css:function(ajax,response,status){$(response.selector).css(response.argument);},settings:function(ajax,response,status){if(response.merge){$.extend(true,Drupal.settings,response.settings);}
else{ajax.settings=response.settings;}},data:function(ajax,response,status){$(response.selector).data(response.name,response.value);},invoke:function(ajax,response,status){var $element=$(response.selector);$element[response.method].apply($element,response.arguments);},restripe:function(ajax,response,status){$('> tbody > tr:visible, > tr:visible',$(response.selector)).removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');}};})(jQuery);;