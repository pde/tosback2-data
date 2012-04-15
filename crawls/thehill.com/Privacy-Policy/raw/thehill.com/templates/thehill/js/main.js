var currentMenu;

var changeMenu = function() {
    if (currentMenu && currentMenu.hasClass('over_menu')){
        currentMenu.removeClass('over_menu');
    }
    currentMenu = $(this);
    var mainMenu = $('div', currentMenu);
    currentMenu.addClass('over_menu');
    $('#navlist li div').hide();
    mainMenu.show();
};

var hideMenu = function() {
    if (currentMenu && currentMenu.hasClass('over_menu')){
        currentMenu.removeClass('over_menu');
    }
    $('#navlist li div').hide();
};

function showAdvPopup2()
{
    var _adv = $('.sb-container-replace > .sb-wrapper > div');
    if (_adv.size())
    {
        var _obj = _adv.parent().parent();
        if (!_obj.hasClass('sb-container-replace')) return;
        _obj.addClass('sb-container');
        _obj.parent().css({position:'static',top:'auto',left:'auto'});

        var _over = $('<div class="sb-overlay" style="background-color: rgb(0, 0, 0); opacity: 0.5; filter: alpha(opacity=50);"></div>');
        _obj.find('.sb-wrapper').before(_over);

        var _nav = $('<a title="Close" class="sb-nav-close"></a>');
        _adv.parent().append(_nav);

        _obj.css({top:'0px',left:'0px'});
        _obj.find('.sb-wrapper').css({position:'absolute',top:'50%',left:'50%',margin:'-'+(_obj.parent().height() / 2)+'px 0 0 -'+(_obj.parent().width() / 2)+'px'});
        _obj.find('.sb-nav-close').unbind().bind('click', function(){
            _obj.find('.sb-wrapper').removeAttr('style');
            _obj.removeAttr('style');
            _obj.removeClass('sb-container');
            _nav.remove();
            _over.remove();
            _obj.remove();
            _obj.parent().remove();
        });
        var dfp_timeout = Number($('#dfp_timeout').val());
        if (dfp_timeout > 0 ) setTimeout(function(){ _obj.find('.sb-nav-close').click() }, dfp_timeout);
        _obj.parent().removeAttr('style');
    }
    else if ($('.sb-container-replace').size())
    {
        $('.sb-container-replace').parent().remove();
    }
}

//alexb
$(window).load(function () {
    setTimeout(function(){ showAdvPopup2(); }, 2000);
});    
//end alexb

function candidates_carousel_initCallback(carousel)
{
    carousel.options.scroll = 5;

    $('.candidates_carousel_nav li').click(function(){
        var _obj = $(this);
        var _number = 0;
        if (_obj.hasClass('active')) return false;
        if (_obj.attr('id').length)
        {
            //$('.candidates_carousel_nav li').removeClass('active');
            _number = _obj.attr('id').replace('goto_','');
            //_obj.addClass('active');
            carousel.scroll(jQuery.jcarousel.intval(_number));
        }
        return false;
    });

    /*
    $('.candidates_carousel_nav li.next').unbind().bind('click', function() {
        if ($('.candidates_carousel_nav li.active').next().hasClass('next')) return false;
        $('.candidates_carousel_nav li.active').next().click();
        return false;
    });

    $('.candidates_carousel_nav li.prev').unbind().bind('click', function() {
        if ($('.candidates_carousel_nav li.active').prev().hasClass('prev')) return false;
        $('.candidates_carousel_nav li.active').prev().click();
        return false;
    });
    */

    if (!$('.candidates_carousel_nav .prev').size())
    {
        $('.candidates_carousel_nav li').first().before($('li.prev'));
        $('.candidates_carousel_nav').append($('li.next'));
    }

    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    $('.candidates_carousel_nav, .jcarousel-container').hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto(2);
    });

}

$(document).ready(function() {

    if ($('.candidates_carousel').size())
    {
        $('.candidates_carousel').each(function(){
            if ($(this).find('li').size() < 5)
            {
                var _c = $(this).find('li').size();
                var _w = 658;
                _w = _w - _c*2; // - marginRight
                _w = _w / _c;
                $(this).find('li').width(_w);
            }
        });
        var _i = 1;
        jQuery('.candidates_carousel').jcarousel({
            initCallback: candidates_carousel_initCallback,
            /*animation: 800,*/
            auto: Number($('#candidates_carousel_auto').val()) > 0 ? Number($('#candidates_carousel_auto').val()) : 0,
            wrap: 'both',
            buttonNextHTML: "<li class='next'></li>",
            buttonPrevHTML: "<li class='prev'></li>",
            autoScrollCallback: function(obj, i, _type) { 
                if (_type == 'auto')
                {
                    if (i != 1 || i == _i)
                    {
                        $('.candidates_carousel_nav li').removeClass('active');
                        $('.candidates_carousel_nav li#goto_'+i).addClass('active');
                    }
                    _i = i;
                }
                else if (_type == 'prev')
                {
                    if ($('.candidates_carousel_nav li.active').prev().hasClass('prev'))
                    {
                        i = $('.candidates_carousel_nav li.next').prev().attr('id').replace('goto_','');
                    }
                    else
                    {
                        i = $('.candidates_carousel_nav li.active').prev().attr('id').replace('goto_','');
                    }
                    $('.candidates_carousel_nav li').removeClass('active');
                    $('.candidates_carousel_nav li#goto_'+i).addClass('active');
                }
                else
                {
                    $('.candidates_carousel_nav li').removeClass('active');
                    $('.candidates_carousel_nav li#goto_'+i).addClass('active');
                }
            }
        });
    }

    if ($('.module_campaign_news.small').size())
    {
        $('.module_campaign_news.small').each(function(i){
            if (i % 2 == 1)
            {
                $(this).css({float: 'right'});
            }
        });
    }
    if ($('.module_campaign_twitter_news.small').size())
    {
        $('.module_campaign_twitter_news.small').each(function(i){
            if (i % 2 == 1)
            {
                $(this).css({float: 'right'});
            }
        });
    }

    if ($('.code-video').size())
    {
        $('.code-video').each(function(){
            var _w = $(this).find('div').first().width();
            $(this).css({width: _w, margin: '0px auto'});
        });
    }

    $('#navlist li').each(function(){
        var mainMenu = $('ul', $(this));
        if (mainMenu != null) {
            var div = $("<div></div>").hide();

            var table = $("<table></table>");

            var menuItems = mainMenu.find("li");

            var colums = 2;
            var rowNumber = Math.ceil(menuItems.length / colums);
            for (var i=0; i < colums; i++ ) {
                var tr = $("<tr></tr>");
                for (var j=0; j < rowNumber; j++) {
                    var item_number = i * rowNumber + j;
                    var td = $("<td></td>").css('white-space', 'nowrap').html($(menuItems[item_number]).html());
                    tr.append(td);
                }
                table.append(tr);
            }
            if (menuItems.length > 0) {
                div.append(table);
                $(this).append(div);
            }
        }
    });
    $('#navlist li').mouseover(changeMenu);
    $('#navlist li').mouseleave(hideMenu);
    $('#menu_sub li a').mouseleave(function() {
        var currentMenu = $(this);
        if (!currentMenu.hasClass('active')) {
            currentMenu.removeClass('hover');
        }
    });
    $('#menu_sub li a').mouseover(function() {
        var currentMenu = $(this);
        if (!currentMenu.hasClass('active')) {
            currentMenu.addClass('hover');
        }
    });
    $('div.tool td.email a').bind('click', function() {
        $("#email2friend").css("height", "190px");
        $("#email2friend").append(
            $('<div />').attr('id', 'email2friend_close').append(
                $('<a />').attr('title', 'Close').bind('click', function(){
                    $("#email2friend").hide().empty();
                }).append(
                    $('<img />').attr('src', '/templates/thehill/images/close.png').attr('alt', 'Close')
                )
            ),
            $('<iframe />')
                .attr({
                    name: 'email',
                    scrolling: 'no',
                    frameborder: '0',
                    width: '340px',
                    height: '170px',
                    src: $(this).attr('href') + '&title=' + Base64.encode(document.title)
                })
        ).show();
        return false;
    });
});

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
