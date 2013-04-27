$(document).ready(function() {
    $('.menu2 .l1 a').hover(menu2.over,menu2.out)
    $('.menu2').bind('mouseleave',menu2.outAll);
    $('.menu2 .l3').bind('mouseleave',menu2.l3out);
    $('.menu2 .l2 a').hover(menu2.l2over,menu2.l2out);
});

var menu2 = {'timer':false};

menu2.over = function (e) {
    var t = $(this);
    var subName = t.attr('sub');
    if (!subName) return;
    var menu = t.closest('.menu2');
    var timer = menu.data('timer');
    if (timer) clearTimeout(timer);
    var timerCall = function() {
        if (menu.data('show') == subName) return;
        var subAll = $('.l2 .sub',menu);
        var subShow = subAll.filter('[sub='+subName+']');
        if (!subShow.size()) return;
        var subHide = subAll.not(subShow);
        $('a',t.parent()).removeClass('sel');
        t.addClass('sel');
        $(subHide).hide();
        subShow.show().css({'top':'-30px'}).animate({'top':0},300);
        menu.data('show',subName);
    }
    menu.data('timer',setTimeout(timerCall,125));
}


menu2.outAll = function (e) {
    $('.l3 .sub',this).hide();
}
menu2.out = function (e) {
    var t = $(this);
    var menu = t.closest('.menu2');
    var timer = menu.data('timer');
    if (timer) clearTimeout(timer);
}

menu2.l2over = function (e) {
    var t = $(this);
    var menu = $(this).closest('.menu2')
    var ajax = t.attr('load');
    $('.l3 .sub',menu).hide();
    if (!ajax) return;
    if (t.data('ajax')) return;
    var timer = t.data('timer');
    if (timer) return;
    var timerCall = function() {
        var subID = t.data('subID');
        if (subID) {
            $('#'+subID).show();
            return;
        }
        subID = "sub"+$.now();
        var loader = $('.iconMenuAjax',t);
        if (!loader.size()) t.prepend('<div class="icon iconMenuAjax"></div>');
        else loader.show();
        var ajaxID = $.ajax({
            'url':ajax,
            'data': {'ajax':1,'menu':subID},
            'cache':true,
            'context':t.get(0)
        }).done(function(data) {
            var menu = $(this).closest('.menu2')
            $('.l3',menu).append(data);
            $('.l3 .toggle',menu).bind('click',menu2.l3toggle);
        }).always(function () {
            $(this).removeData('ajax').children('.iconMenuAjax').hide();
        });
        t.data('ajax',ajaxID);
        t.data('subID',subID);
    }
    t.data('timer',setTimeout(timerCall,125));
}

menu2.l2out = function (e) {
    var t = $(this);
    var timer = t.data('timer');
    if (timer) clearTimeout(timer);
    t.removeData('timer');
    var subID = t.data('subID');
    if (subID) {
        if ($(e.relatedTarget).closest('.sub').attr('id') !=subID) $('#'+subID).hide();
    }
}

menu2.l3toggle = function (e) {
    var t = $(this);
    var sub = t.parent().next();
    if (t.attr('show')) {
        sub.hide();
        t.text(t.attr('titleshow')).removeAttr('show');
    } else {
        sub.show();
        t.text(t.attr('titlehide')).attr('show',1);
    }
}

menu2.l3out = function (e) {
    $('.sub',this).hide();
}
