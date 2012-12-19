(function(){

/* Add classes for all pages but the home page */
var urlArray = window.location.pathname.split('/');
var pageClasses = location.pathname.split('.')[0].replace(/[./]/g, ' page-').toLowerCase().replace(/page-$/, 'page-home');

if (urlArray[1].toLowerCase() != 'home') {
    $('body').addClass('responsive-page').addClass(pageClasses);
}


/* Make sure .page is always at the correct height */
var pages = $('.page');
var containers = $('.page .productImageContainer');

function resize(){
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var percent = containers.css('font-family').slice(1) / 100; // 'h25' -> 0.25
    var offset = 30;
    if(viewportHeight === 356 || viewportHeight == 208) offset += 65; // fix for iPhones 3-4, consider their falsy viewport height report

    if(viewportWidth > 700) {
        pages.removeAttr('style');
        containers.removeAttr('style');
    } else {
        pages.attr('style', 'height:' + (viewportHeight + offset + 'px !important'));
        containers.css({
            'padding-bottom': 0,
            'height': viewportHeight * percent
        });
    }
}

if($('.page-home').length) {
    $(window).on('resize orientationChange webkitOrientationChange', resize);
    resize();
}

$('.container.divFloatContainer').addClass('wideScreen');

/* Hack to fix scrolling at 1024px width */
/*($(window).on('scroll', function(){
    if($(this).width() !== 1024) return;
    if( $(this).scrollTop() > 0 ) {
        $('.rightSideContainer').css('paddingTop', '0px');
    } else {
        $('.rightSideContainer').css('paddingTop', '30px');
    }
});*/

/*
    Custom Dropdown
    Article: http://cssglobe.com/custom-styling-of-the-select-elements/
    POC: http://jsfiddle.net/Ronny/zZa7d/
*/

$('#dropdownContainer select').each(function(){
    var title = $(this).attr('title');
    if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
    $(this)
        .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
        .after('<span class="select">' + title + '</span>')
        .change(function(){
            val = $('option:selected',this).text();
            $(this).next().text(val);
            var link = document.createElement('a');
            link.href = this.value;
            location = link.href;
        })
});

/* change markup on homepage */
if($('.page-home').length) {
    $('.leftSide .mainBodyMask .page .productImageContainer .mask').remove();
}

/* Remove empty text nodes from pagination */
if($('.PagerNumberArea').length) {
    $('.PagerNumberArea > span')
        .contents()
        .filter(function() {
            return this.nodeType === 3; //Node.TEXT_NODE
        }).remove();
}

/* In Locations, open maps in a new tab instead of inner popup */
if($('.page-locations').length) {
    $('.content').on('click', '[action="openPopup"]', function(){
        if($(window).width() < 599) {
            var popupMarkup = $(this).attr('popupcontent');
            var target = popupMarkup.split("src='")[1].split("'")[0];
            window.open(target);
        }
    });
}

/* Debugging helpers
$('<div id="windowInfo">').appendTo('body');

function print(){
    $('#windowInfo').html( "Screen: " + screen.width + ' x ' + screen.height + "<br> Window: " + $(window).width() + ' x ' + $(window).height());
}
print();
$(window).on("resize scroll orientationChange webkitOrientationChange", print);
*/

})();

// jquery.transition.min.js
//(function(a){function t(){setTimeout(x,0);return m=a.now()}function x(){m=void 0}var r={},k,q,y=/^(?:toggle|show|hide)$/,z=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,u,m,v=document.createElement("div").style,w;a.support.transition="MozTransition"in v?"MozTransition":"WebkitTransition"in v?"WebkitTransition":!1;a.cssNumber.color=a.cssNumber.backgroundColor=!0;w={linear:"linear",swing:"ease-out",bounce:"cubic-bezier(0,.35,.5,1.3)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeInCubic:"cubic-bezier(.55,.055,.675,.19)", easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)", easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)"};a.fn.extend({animate:function(d,e,g,b){function f(){!1===i.queue&&a._mark(this);var c=a.extend({},i),f=1===this.nodeType,e=f&&a(this).is(":hidden"),b,h,g,j,n;n=a.cssProps;var m=!c.step&& a.support.transition,s=[],o,p;c.animatedProperties={};c.transition={};for(g in d)if(b=a.camelCase(g),g!==b&&(d[b]=d[g],delete d[g]),(h=a.cssHooks[b])&&"expand"in h)for(g in j=h.expand(d[b]),delete d[b],j)g in d||(d[g]=j[g]);for(b in d){h=d[b];a.isArray(h)?(j=c.animatedProperties[b]=h[1],h=d[b]=h[0]):j=c.animatedProperties[b]=c.specialEasing&&c.specialEasing[b]||c.easing||"swing";if(j=m&&f&&0<c.duration&&b.indexOf("scroll")&&w[j])o=n[b]||b,p=o.replace(/([A-Z])/g,"-$1").toLowerCase(),j=p+" "+c.duration+ "ms "+j,c.transition[b]={lower:p,real:o},s.push(j);if("hide"===h&&e||"show"===h&&!e)return c.complete.call(this);if(f&&("height"===b||"width"===b))if(c.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],"inline"===a.css(this,"display")&&"none"===a.css(this,"float")){if(!(h=!a.support.inlineBlockNeedsLayout)){h=this.nodeName;if(!r[h]){j=document.body;o=a("<"+h+">").appendTo(j);p=o.css("display");o.remove();if("none"===p||""===p){k||(k=document.createElement("iframe"),k.frameBorder= k.width=k.height=0);j.appendChild(k);if(!q||!k.createElement)q=(k.contentWindow||k.contentDocument).document,q.write((a.support.boxModel?"<!doctype html>":"")+"<html><body>"),q.close();o=q.createElement(h);q.body.appendChild(o);p=a.css(o,"display");j.removeChild(k)}r[h]=p}h="inline"===r[h]}h?this.style.display="inline-block":this.style.zoom=1}}null!=c.overflow&&(this.style.overflow="hidden");for(g in d)if(f=new a.fx(this,c,g),h=d[g],y.test(h))if(b=a._data(this,"toggle"+g)||("toggle"===h?e?"show": "hide":0))a._data(this,"toggle"+g,"show"===b?"hide":"show"),f[b]();else f[h]();else b=z.exec(h),n=f.cur(),b?(h=parseFloat(b[2]),j=b[3]||(a.cssNumber[g]?"":"px"),"px"!==j&&(a.style(this,g,(h||1)+j),n*=(h||1)/f.cur(),a.style(this,g,n+j)),b[1]&&(h=("-="===b[1]?-1:1)*h+n),f.custom(n,h,j)):f.custom(n,h,"");if(m&&s.length)for(g in j=this.style[m],e=window.getComputedStyle(this),this.style[m]=s.join()+(j&&j.indexOf("none")?","+j:""),c.transition)e[g],a.style.apply(null,c.transition[g].styleToSet);return!0} var i=a.speed(e,g,b);if(a.isEmptyObject(d))return this.each(i.complete,[!1]);d=a.extend({},d);return!1===i.queue?this.each(f):this.queue(i.queue,f)},stop:function(d,e,g){"string"!==typeof d&&(g=e,e=d,d=void 0);e&&!1!==d&&this.queue(d||"fx",[]);return this.each(function(){var b,f=false,e=a.timers,c=a._data(this),l=a.support.transition;g||a._unmark(true,this);if(d==null)for(b in c){if(c[b]&&c[b].stop&&b.indexOf(".run")===b.length-4){var k=c[b];a.removeData(this,b,true);k.stop(g)}}else if(c[b=d+".run"]&& c[b].stop){c=c[b];a.removeData(this,b,true);c.stop(g)}for(b=e.length;b--;)if(e[b].elem===this&&(d==null||e[b].queue===d)){if(g||l)e[b](g);g||e[b].saveState();f=true;e.splice(b,1)}(!g||!f)&&a.dequeue(this,d)})}});a.extend(a.fx.prototype,{cur:function(){if(null!=this.elem[this.prop]&&(!this.elem.style||null==this.elem.style[this.prop]))return this.elem[this.prop];var d,e=a.css(this.elem,this.prop);return isNaN(d=parseFloat(e))?!e||"auto"===e?0:e:d},custom:function(d,e,g){function b(a){return f.step(a)} var f=this,i=a.fx,c=f.options.transition,l=this.prop;this.startTime=m||t();this.end=e;this.now=this.start=d;this.pos=this.state=0;this.unit=g||this.unit||(a.cssNumber[l]?"":"px");b.queue=this.options.queue;b.elem=this.elem;b.saveState=function(){void 0===a._data(f.elem,"fxshow"+f.prop)&&(f.options.hide?a._data(f.elem,"fxshow"+f.prop,f.start):f.options.show&&a._data(f.elem,"fxshow"+f.prop,f.end))};(b.transition=c[l])?(a.timers.push(b),"transform"!=l&&(f.elem.style[c[l].real]=d+f.unit),a.fx.step[l]&& (e=Math.max(0,e)),c[l].styleToSet=[f.elem,l,e+f.unit],c[l].timeout=setTimeout(function(){a.timers.splice(a.timers.indexOf(b),1);f.step(!0)},f.options.duration+30)):b()&&a.timers.push(b)&&!u&&(u=setInterval(i.tick,i.interval))},step:function(d){var e,g=m||t(),b=!0,f=this.elem,i=this.options,c=i.transition[this.prop],l=g>=i.duration+this.startTime,k=a.support.transition;if(c||d||l){c?(clearTimeout(c.timeout),!d&&!l&&(this.elem.style[c.real]=a.css(this.elem,c.real))):(this.now=this.end,this.pos=this.state= 1,this.update());i.animatedProperties[this.prop]=!0;for(e in i.animatedProperties)!0!==i.animatedProperties[e]&&(b=!1);if(b){null!=i.overflow&&!a.support.shrinkWrapBlocks&&a.each(["","X","Y"],function(a,b){f.style["overflow"+b]=i.overflow[a]});i.hide&&a(f).hide();if(c){c=","+f.style[k];for(e in i.transition)c=c.split(i.transition[e].lower).join("_");c=c.replace(/, ?_[^,]*/g,"").substr(1);f.style[k]=c||"none";!c&&(f.style[k]=c)}if(i.hide||i.show)for(e in i.animatedProperties)(d||l)&&a.style(f,e,i.orig[e]), a.removeData(f,"fxshow"+e,!0),a.removeData(f,"toggle"+e,!0);if((e=i.complete)&&(d||l))i.complete=!1,e.call(f)}return!1}Infinity==i.duration?this.now=g:(d=g-this.startTime,this.state=d/i.duration,this.pos=a.easing[i.animatedProperties[this.prop]](this.state,d,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos);this.update();return!0}});a.extend(a.fx,{tick:function(){for(var d,e=a.timers,g=0;g<e.length;g++)d=e[g],!d.transition&&!d()&&e[g]===d&&e.splice(g--,1);e.length||a.fx.stop()}})})(jQuery);