//Modernizr 2.6.2
;window.Modernizr=function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(l.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:s(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var A in m)u(m,A)&&(r=A.toLowerCase(),e[r]=m[A](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),h=j=null,e._version=d,e._prefixes=l,e.testStyles=s,e}(this,this.document);
if (!String.prototype.trim) String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};


$(document).ready(function() {
    if ($('#main .menu')) {
        if (Modernizr.touch) {
            var hideItAll = function() {
                $(".menu ul.sub").css('display','none');
                $(".menu .subL").css('display','none');
                $("a.hasSub.deep").removeClass('sel');
            };
            var onMenuClick = function(e){
                e.preventDefault();
                if ($(this).parent().children('ul.sub').is(':visible')) {
                    menuMainOut(e,$(this).parent());
                } else {
                    hideItAll();
                    menuMainIn(e,$(this).parent());
                }
                e.stopPropagation();
            };
            $("a.hasSub").not('.deep').on('click', onMenuClick);
            /*$(".menuUser a").on('click', onMenuClick);*/
            $("body div").not('a.hasSub').on('click', function(e){
                hideItAll();
            });
            $('a.hasSub.deep').click(function(e){
                if (!$(this).hasClass('sel')) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuMainIn(e,$(this).parent());
                }
            });
        } else {
            $('.menu li').hover(menuMainIn,menuMainOut);
        }
        $('#search .select').hover(menuSearchIn,menuSearchOut);
        $('#search .list a').click(menuSearchClick);
        $('#search .list a.sel').click();
        $('#searchAdvBtn').click(searchAdv.Show);
        //$('#search .adv').bind('mouseenter',searchAdv.In).bind('mouseleave',searchAdv.Out);
        if (getCookie('UID')) {
            menuCounter();
        }
        $('#userInvites a').hover(inviteIn,inviteOut);
    }
    $('input[placeholder],textarea[placeholder]').bind('focus',placeholderIn).bind('blur',placeholderOut);
    $('body').on('mouseenter','a,div,span,i,u,input',xEvent.mIn).on('mouseleave','a,div,span,i,input',xEvent.mOut).on('click','a,input',xEvent.click);
    $('.tabs .head a').bind('click',tabChange);
    searchList.init($('#searchText'),$('#searchList'));
    $('iframe').bind('load',xEvent.frameLoaded);
    $(".menuNewsLink").hover(function(e){$("#menuNews").show();}, function(e){if (!$(this).attr('stay')) { $("#menuNews").hide();} });
    $("#menuNews").hover(function(e){$(this).show();}, function(e){$(this).hide()});
    $(".menuUser .sub li a.ssub").hover(function(e){$(".menuUser .sub li a.hasSub").addClass('unHovered');}, function(e){$(".menuUser .sub li a.hasSub").removeClass('unHovered');});
    $(".userOuter .s .c input").change(function(e){
        if ($(this).is(':checked')) $(this).parent().parent().parent().addClass('sel');
        else $(this).parent().parent().parent().removeClass('sel')
    });
    //$("#menuNews").hover(function(e){$(".menuNewsLink").attr('stay',1)}, function(e){$(".menuNewsLink").removeAttr('stay')});
});

function captchaLoad(id) {
    if (typeof(Recaptcha)=='undefined') {
        $.ajax({'dataType':'script','url':'http://static.xhamster.com/js/recaptcha_ajax.js'}).done(function (){
            Recaptcha.create("6Ld7YsISAAAAAN-PZ6ABWPR9y5IhwiWbGZgeoqRa",id, {theme: "white"});
        });
    } else Recaptcha.create("6Ld7YsISAAAAAN-PZ6ABWPR9y5IhwiWbGZgeoqRa",id, {theme: "white"})
}

var xEvent = {};
xEvent.frameLoaded = function (e) {
    $(this).next('.loader,.loaderAjax').hide();
}

xEvent.frameLoad = function (t,src) {
    $(t).attr('src',src).bind('load',xEvent.frameLoaded).next('.loader,.loaderAjax').show();
}

xEvent.mIn = function (e) {
    var t = $(this);
    if (t.attr('overicon') && !t.hasClass('off')) t.children('.icon,.iconL').addClass(t.attr('overicon'));
    if (t.attr('hint')) xEvent.hintShow(t,t.attr('hint'));
}

xEvent.mOut = function (e) {
    var t = $(this);
    if (t.attr('overicon')) t.children('.icon,.iconL').removeClass(t.attr('overicon'));
    if (t.attr('hint')) xEvent.hintHide(t);
}

xEvent.click = function (e) {
    var t = $(this);
    if (t.hasClass('off')) {
        if (e) e.preventDefault();
        return;
    }
    var ajaxUrl = t.attr('ajax');
    if (ajaxUrl) {
        if (e) e.preventDefault();
        if (t.hasClass('frameLoader')) $('#frameLoader').show();
        if (!t.data('ajax')) {
            var domID = t.attr('id');
            if (!domID) {
                domID = "_ajaxDOM"+$.now();
                t.attr('id',domID);
            }
            $data = {'domID':domID};
            if (t.attr('from')) {
                $data['from'] = t.attr('from');
            }
            var ajaxID = $.ajax({
                'url':ajaxUrl,
                'data':$data,
                'context':this,
                'dataType':'script',
                'complete': function() {
                    t.removeData('ajax');
                }
            });
            t.data('ajax',ajaxID);
        }
    }
}

xEvent.hintEnter = function (e) {
    var t = $(this);
    var text = t.attr('hint');
    xEvent.hintShow(t,text);
}

xEvent.hintShow = function (t,text,temporary,className) {
    var hintBox;
    if (typeof(temporary)!='undefined') {
        if (typeof(className)=='undefined') className = 'hintBox';
        $('#'+temporary).remove();
        $('body').append("<table class='"+className+"' id='"+temporary+"'><tr><td><div class='box'><div class='txt'></div></div><div class='arrow'></div></td></tr></table>");
        hintBox = $('#'+temporary);
    } else {
        hintBox = $('#hint');
    }
    var pos = t.offset();
    var w = t.attr('hintw'); 
    if (!w) {
        $('.box',hintBox).css({'width':'auto'});
        $('.txt',hintBox).css({'white-space':'nowrap'}).html(text);
    }
    else {
        $('.box',hintBox).css({'width':w+'px'});
        $('.txt',hintBox).css({'white-space':'normal'}).html(text);
    }
    /*
    if (!w) hintBox.css({'width':'auto','maxWidth':'150px'});
    else hintBox.css({'width':w+'px','maxWidth':'none'});
    */
    var left = pos.left+t.innerWidth()/2;
    var top = pos.top-1*hintBox.innerHeight()-3;
    var mleft = -1*hintBox.innerWidth()/2;
    var css = {'margin-left':mleft+'px','top':top+'px','left':left+'px'};
    
    hintBox.css(css);
    hintBox.show();
    if (temporary) setTimeout('xEvent.hintDel("#'+temporary+'")',5000)
}

xEvent.hintDel = function (id) {
    $(id).fadeOut('fast',function(){$(this).remove()});
}

xEvent.hintHide = function(e) {
    $('#hint').hide();
}

xEvent.disable = function(el) {
    el = $(el);
    el.each(function(){
        var t = $(this);
        var overClass = t.attr('overicon');
        var hint=t.attr('hint');
        $(t).removeAttr('href').removeAttr('ajax').removeAttr('href').removeAttr('hint').removeAttr('overicon');
        if (overClass) $('.'+overClass,t).removeClass(overClass);
        if (hint) xEvent.hintHide();
    });
}

xEvent.loaderShow = function (el) {
    el = $(el);
    el.css({'position': 'relative'});
    var h = el.innerHeight();
    el.append("<div class='loader loaderAjax' style='height:"+h+"px'></div>");
}

xEvent.loaderHide = function (el) {
    $('loader',el).remove();
}
var searchList = {'ajax':false, 'list': false, 'input':false};

searchList.init = function (input,list) {
    //input.typeWatch({callback: searchList.query,wait: 150,highlight: true,captureLength:-1});
    input.keydown(searchList.key);
    input.keyup(searchList.keyUp);
    searchList.list = list;
    searchList.list.bind('mouseenter',searchList.mIn).bind('mouseleave',searchList.mOut);
}

searchList.keyUp = function (e) {
    var t = $(this);
    var valOld = t.data('searchList');
    var valCurr = t.val().trim();
    if (valOld != valCurr) {
        t.data('searchList',valCurr);
        searchList.query(valCurr,t);
    }
}


searchList.key = function (e) {
    if (e.keyCode == 40) {
        e.preventDefault();
        searchList.select(true);
    }
    if (e.keyCode == 38) {
        e.preventDefault();
        searchList.select(false);
    }
}

searchList.select = function (up) {
    if (!searchList.input) return;
    var selected = $('.sel',searchList.list);
    var all = $('a',searchList.list);
    var selectedNext;
    if (selected.size()) {
        if (up) {
            selectedNext = selected.next();
            if (!selectedNext.size()) selectedNext = all.eq(0);
        } else {
            selectedNext = selected.prev();
            if (!selectedNext.size()) selectedNext = all.eq(all.size()-1);
        }
        
    } else selectedNext = all.eq(0);
    if (!selectedNext.size()) return;
    all.removeClass('sel');
    selectedNext.addClass('sel');
    var text = selectedNext.text();
    searchList.input.data('searchList',text).val(selectedNext.text());
}

searchList.showList = function (el) {
    var pos = el.offset();
    var h = el.outerHeight();
    searchList.list.css({'left':pos.left,'top':(pos.top+h)});
    searchList.list.show();
}

searchList.query = function (text,el) {
    if (searchList.ajax) searchList.ajax.abort();
    if (!text.length) {
        searchList.list.hide();
        return;
    }
    searchList.ajax = $.ajax({
        'url':'/ajax/search.php',
        'data':{'q':text},
        'dataType':'json',
        'context':el
    }).done(function (data) {
        var html = "";
        $.each(data,function (index,value){
            html+="<a href='#'>"+value+"</a>";
        });
        searchList.list.html(html).children('a').bind('click',searchList.click);
        searchList.input = $(el);
        searchList.showList(searchList.input);
        searchList.input.bind('blur',searchList.mOut);
    }).always(function (data) {
        searchList.ajax = false;
    });    
}

searchList.click = function (e) {
    e.preventDefault();
    if (!searchList.input) return false;
    searchList.input.val($(this).text());
    searchList.list.hide();
    searchList.input.parents('form').submit();
}

searchList.mOut = function (e) {
    searchList.list.hide();
    searchList.input.bind('blur',searchList.mOut)
}

searchList.mIn = function (e) {
    searchList.input.unbind('blur',searchList.mOut)
}

searchList.submit = function (e) {
    if (searchList.ajax) searchList.ajax.abort();
    //return false;
}


function placeholderIn(e) {
    $(this).attr('placeholderBk',$(this).attr('placeholder')).removeAttr('placeholder');
}

function placeholderOut(e) {
    $(this).attr('placeholder',$(this).attr('placeholderBk'));
}

function inviteIn(e) {
    $('#userInvites div').addClass('hover');
}

function inviteOut(e) {
    $('#userInvites div').removeClass('hover');
}

function menuCounter() {
    $.ajax({
        'url':'/menuAjax.php?act=counter',
        'dataType':'script',
        complete:function(jqXHR, textStatus) {
            setTimeout(menuCounter,60000);
        }
    });
}

function menuSearchClick(e) {
    e.preventDefault();
    var t = $(this);
    var val = t.attr('value');
    var text = t.text();
    $('#search .select span').text(text);
    $('#qcat').val(val);
    if (val == 'video') $('#searchAdvBox').show();
    else $('#searchAdvBox').hide();
    $('a',t.parent()).removeClass("sel");
    t.addClass('sel');
    t.parent().hide();
}

function menuSearchIn(e) {
    $(this).addClass('selectEd').children('.list').show();
    
}
    
function menuSearchOut(e) {
    $(this).removeClass('selectEd').children('.list').hide();
}
    
var searchAdv = {'timer':false}    ;

searchAdv.Out = function (e) {
    //advTimer = setTimeout(searchAdv.Hide,500);
}

searchAdv.In = function (e) {
    clearTimeout(searchAdv.timer);
}

searchAdv.Hide = function (e) {
    $('#searchAdv').hide();
}

searchAdv.Show = function (e) {
    e.preventDefault();
    $('#searchAdv').show();
    if (!$('#searchAdv').attr('loaded')) {
        $.ajax({
            'url':'/menuAjax.php?act=search'
        }).done( function (text) {
            $('#searchAdv').attr('loaded',true);
            $('#searchAdv .box').html(text);
            $('#searchAdv .toggle').bind('click',searchAdv.Toggle).click();
            $('#searchAdv .chGroup input').bind('change',searchAdv.checkGroup);
            $('#searchAdv .channelsBox input').bind('change',searchAdv.checkChannel);
            $('#searchAdv .close').bind('click',searchAdv.Hide);
            $('#searchAdv .save').bind('click',searchAdv.Search);
            $('#searchAdv .reset').bind('click',searchAdv.Reset);
        });
    }
}

searchAdv.Search = function (e) {
    $.ajax({
        'url':'/menuAjax.php?act=searchSave',
        'cache':false,
        'dataType':'json',
        'data':$('#searchAdv').serialize(),
        'type':'POST'
    }).done(function (data) {
        if (data.adv) {
            $('#searchAdvBtn').attr('overicon','iconSettingsAdvOver');
            $('#searchAdvBtn .icon').removeClass('iconSettings').addClass('iconSettingsAdv');
        } else {
            $('#searchAdvBtn').attr('overicon','iconSettingsOver');
            $('#searchAdvBtn .icon').removeClass('iconSettingsAdv').addClass('iconSettings');
        }
        if ($('#searchText').val()) $('#search').submit();
    });
    $('#searchAdv').hide();
}

searchAdv.Reset = function (e) {
    $('#searchAdv input[type=checkbox]').prop('checked',true);
    $('#searchAdv select').val('Any');
}

searchAdv.checkGroup = function (e) {
    var t = $(this);
    var box = t.parents('.channelsGroup');
    var channels = $('.channelsBox',box);
    if (t.prop('checked')) $('input',channels).prop('checked',true);
    else $('input',channels).prop('checked',false);
}

searchAdv.checkChannel = function (e) {
    var t = $(this);
    var box = t.parents('.channelsGroup');
    var channels = $('.channelsBox',box);
    var allCheck = $('.chGroup input',box);
    if (t.prop('checked')) allCheck.prop('checked',true);
    else {
        if (!$('input:checked',channels).size()) allCheck.prop('checked',false);
    }
}

searchAdv.Toggle = function (e) {
    var t = $(this);
    var box = t.parents('.channelsGroup');
    var channels = $('.channelsBox',box);
    var title = '';
    if (t.attr('show')) {
        channels.hide();
        title = t.attr('titleShow');
        t.removeAttr('show');
    } else {
        channels.show();
        title = t.attr('titleHide');
        t.attr('show',1);
    }
    t.text(title);
}

var menuMainTimer = false;
function menuMainLoad(a,t) {
    var loader = $('.iconMenuAjax',a);
    if (!loader.size()) {
        a.prepend('<div class="icon iconMenuAjax"></div>');
    } else loader.show();
    var ajaxID = $.ajax({
        'url':a.attr('load'),
        'data': {'ajax':1},
        'cache':true,
        'context':t.get(0)
    }).done(function(data) {
        $(this).append(data);
        if (t) {
            menuMainIn.call(this,t.get(0));
        } else {
            menuMainIn.call(this,false);
        }
    }).always(function () {
        $(this).children('a').removeAttr('load').children('.iconMenuAjax').hide();
    });
    t.data('ajax',ajaxID);
}

function menuMainIn(e,obj) {
    if (obj==undefined||!obj) {
        obj=false;
        var t = $(this);
    } else {
        var t = obj;
    }
    if (e) {
        t.data('over',true);
    } else {
        if (!t.data('over')) return false;
    }
    var a = t.children('a');
    var sub = t.children('.sub')
    if (sub.size() && sub.hasClass('subL')) {
        sub.css({'left':t.width()+'px','top':'0'});
    }
    if (!sub.size() && a.attr('load')) {
        menuMainLoad(a,t);
    } else {
        if (a.hasClass('timer')) {
            if (menuMainTimer) clearTimeout(menuMainTimer);
            var timerCall = function() {
                sub.show();
            }
            menuMainTimer = setTimeout(timerCall,125);
        } else sub.show();
    }
    a.addClass('sel');
}

function menuMainOut(e,obj) {
    if (menuMainTimer) clearTimeout(menuMainTimer);
    
    if (obj==undefined||!obj) {
        var t = $(this);
    } else {
        var t = obj;
    }
    if (e) t.data('over',false);
    var a = t.children('a');
    var sub = t.children('.sub')
    if (a.attr('ajax')) {
        $('.iconMenuAjax',a).hide();
        var ajaxID = t.data('ajax');
        if (ajaxID) ajaxID.abort();
    }
    sub.hide();
    if (!a.hasClass('fix')) a.removeClass('sel');
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) end = cookie.length;
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function setCookie(name, value, time) {
    var expires = new Date();
    expires.setTime( expires.getTime() + time );
    document.cookie = name + '=' + value + '; expires=' + expires.toGMTString() + '; path=/';
}

function tabChange(e) {
    var t = $(this);
    if (t.attr('href')!='#') return;
    e.preventDefault();
    var tab = t.parent().parent();
    if (t.hasClass('sel')) return;
    var tabList = t.parent().children('a').removeClass('sel');
    t.addClass('sel');
    var tabNum = tabList.index(t);
    var contentList = $('.content',tab).children('.tab');
    var contentSel = contentList.hide().eq(tabNum).show();
    if (t.attr('ajax') && !contentSel.children().size()) {
        $.ajax({'url':t.attr('ajax'),'dateType':'script'});
        contentSel.html('<div class="loader"></div>');
        return;
    }
    if (t.attr('iframe') && !contentSel.children().size()) {
        contentSel.html('<div class="loader"></div><iframe style="display: none;" src="'+t.attr('iframe')+'" scrolling="no" frameborder="no" align="middle" allowtransparency="true" marginheight="0" marginwidth="0"></iframe>');
        $('iframe',contentSel).bind('load',tabLoad);
        return;
    }
    $('input',t.parent()).val(tabNum);
}

function tabLoad(e) {
    var t = $(this);
    t.parent().children('.loader').hide();
    t.show();
}

function adClick(target,clickRef){
    var bkRef=target.href;
    target.href=clickRef;
    setTimeout(function(){target.href=bkRef},500)
}; 

function openPm(username, width, height, isvideo, sameWin) {
    if (!getCookie('UID')) {
        login.popSignup();
        return false;
    }
    if (typeof(isvideo)=='undefined') isvideo=false;
    if (typeof(sameWin)=='undefined') sameWin=false;
    if (!width) width = 910;
    if (!height) height = 610;
    if (isvideo) var url = baseurl+"/user/"+username+"/messages-video-1";
    else var url = baseurl+"/user/"+username+"/messages-1";
    if (sameWin)
        window.location.href = url;
    else {
        var w = window.open(url, "privateMessage","width="+width+"px,height="+height+"px,resizable=0,toolbar=0,location=0,status=0,menubar=0,directories=0,scrollbars=yes");
        w.focus();
    }
    return false;
}

function openW(url, name, w, h) {
    window.open(url, name,"width="+w+"px,height="+h+"px,resizable=0,toolbar=0,location=0,status=0,menubar=0,directories=0,scrollbars=yes");
    return false;
}

(function( $ ){
    $.fn.serializeJSON=function(inp) {
    var json = inp || {};
    jQuery.map($(this).serializeArray(), function(n, i){
    json[n['name']] = n['value'];
    });
    return json;
    };
})( jQuery );


var modal = {'window':false,'mask':false};

modal.init = function () {
    if (modal.mask) return true;
    var mask = $('#mask');
    if (!mask.size()) {
      $('body').append("<div id='mask'></div>");
      mask = $('#mask');
    }
    modal.mask = mask;
    $(window).bind('resize',modal.size);
}

modal.size = function () {
    if (!modal.mask) return false;
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    return modal.mask;
    //return modal.mask.css({'height':maskHeight,'width':maskWidth});
}

modal.show = function (el,noClose,topPosType,opacity) {
    modal.init();
    modal.size().show();
    if (noClose) {
        $(document).unbind('keydown',modal.key);
        $('#mask').unbind('click',modal.hide);
        modal.mask.css({'opacity':0.9});
    } else {
        $(document).bind('keydown',modal.key);
        $('#mask').bind('click',modal.hide);
        modal.mask.css({'opacity':0.5});
    }
    if (opacity) modal.mask.css({'opacity':opacity});
    modal.window = $(el);
    $('.close',modal.window).bind('click',modal.hide);
    $('.spot iframe').hide();
    if (topPosType === false) {
        modal.window.show();
        return;
    }
    
    var winH = $(window).height();
    var winW = $(window).width();
          
    var wTop = 0;
    if (typeof(topPosType) == 'undefined') {
        var wTop = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        wTop += $(window).height()/2-modal.window.height()/2;
    } else if (typeof(topPosType) == 'number') wTop += topPosType;
    else wTop = winH/2-modal.window.height()/2;
    var wLeft = winW/2-modal.window.width()/2;
    if (wTop<0) wTop=0;
    if (wLeft<0) wLeft=0;
    modal.window.css({'top':wTop, 'left':wLeft}).show();
}

modal.key = function (e) {
    if (e.keyCode == 27) {
        $('#mask').click();
    }
}

modal.hide = function (e) {
    if (e) e.preventDefault();
    modal.init();
    $(document).unbind('keydown',modal.key);
    $('#mask').unbind('click',modal.hide);
    modal.mask.hide();
    if (modal.window) modal.window.hide();
    $('.spot iframe').show();
    if (typeof(modal.onHide) == 'function') modal.onHide();
    modal.onHide = false;
    modal.window = false;
}

function js_u_salt(u)
{
    return u*getCookie('UID');
}

function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function openWindow(url, name, width, height)
{
    window.open(url, name,"width="+width+"px,height="+height+"px,resizable=0,toolbar=0,location=0,status=0,menubar=0,directories=0,scrollbars=yes").focus();
    return false;
}

(function() {
    var
        fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
 
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
 
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
 
                break;
            }
        }
    }
    var wscript = null;
    /*
    if (!fullScreenApi.supportsFullScreen) {
        if(typeof window.ActiveXObject!="undefined"){
            try {
                wscript = new ActiveXObject("WScript.Shell");
            } catch (err){
                
            }
            if(wscript!=null) fullScreenApi.supportsFullScreen = true;
        }
    }
    */
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
 
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            if (wscript!=null) return wscript.SendKeys("{F11}");
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            if (wscript!=null) return wscript.SendKeys("{F11}");
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
 
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {
 
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
 
    // export api
    window.fullScreenApi = fullScreenApi;
})();
