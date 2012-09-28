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
    //carousel.options.scroll = 5;

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
        carousel.startAuto(Number($('#candidates_carousel_auto').val()) > 0 ? Number($('#candidates_carousel_auto').val()) : 0);
    });

}

$(document).ready(function() {

    if ($('.candidates_carousel').size())
    {
        $('.candidates_carousel').each(function(){
            var _max_w = 0;
            var _full_w = 0;
            $(this).find('li').each(function()
            {
                var _w = $(this).find('img').outerWidth();
                if (_w > _max_w) _max_w = _w;
                _full_w += _w;
            });
            var _total_w = 658;
            var _count = Math.floor(_total_w / _max_w);
            var _total_count = Math.ceil($(this).find('li').size() / _count);
            _max_w = _total_w / _count - 1;
            $(this).find('li').each(function()
            {
                if (_max_w > 0) $(this).css('width',(_max_w));
            });
            var _nav_wrap = $(this).parent().parent().find('.candidates_carousel_nav_wrap');
            if (_total_count < 2)
            {
                _nav_wrap.remove();
            }
            else
            {
                for (var _i = 2; _i <= _total_count; _i++)
                {
                    _nav_wrap.find('.candidates_carousel_nav').append($('<li id="goto_'+((_i-1)*_count+1)+'"></li>'));
                }
            }
            if (_full_w < _total_w)
            {
                var _c = $(this).find('li').size();
                _w = _total_w - _c*2; // - marginRight
                _w = _w / _c;
                $(this).find('li').width(_w);
            }
            var _i = 1;
            jQuery(this).jcarousel({
                initCallback: candidates_carousel_initCallback,
                /*animation: 800,*/
                auto: Number($('#candidates_carousel_auto').val()) > 0 ? Number($('#candidates_carousel_auto').val()) : 0,
                wrap: 'both',
                scroll: _count,
                buttonNextHTML: "<li class='next'></li>",
                buttonPrevHTML: "<li class='prev'></li>",
                autoScrollCallback: function(obj, i, _type) { 
                    console.log(i);
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
        });

    }

    if ($('.module_campaign_news.small').size())
    {
        $('.module_campaign_news.small').each(function(i){
            if (i % 2 == 1)
            {
                $(this).css({float: 'right', 'border-right': 'none'});
            }
        });
    }
    if ($('.tampa_locator_map').size())
    {
        $('.tampa_locator_map').each(function(i){
            if (i % 2 == 1)
            {
                $(this).css({float: 'right', 'border-right': 'none'});
            }
        });
    }
    if ($('.delegates_by_state').size())
    {
        $('.delegates_by_state').each(function(i){
            if (i % 2 == 1)
            {
                $(this).css({float: 'right', 'border-right': 'none'});
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
        $("#email2friend").css("height", "400px");
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
                    src: $(this).attr('href') + '&title=' + Base64.encode(document.title)
                }).css({'width': '340px', 'height': '375px'})
        ).show();
        return false;
    });
    if ($('.menu_sub').size())
    {
        $('.menu_sub').prev().css('margin',0);
        var _count_items = $('.menu_sub li').size();
        $('.menu_sub li').each(function(i)
        {
            if (i < _count_items-1)
            {
                $(this).after($('<li class="separator"><span>&nbsp;|&nbsp;</span></li>'));
            }
        });
        var _menu_wrap_height = $('.menu_sub').parent().height();
        var _menu_height = $('.menu_sub').height();
        if (_menu_height > _menu_wrap_height)
        {
            var _more = $('<a class="more-blogs" href="#more-blogs"></a>');
            $('.menu_sub').width(875).after(_more);

            var _additons = $('<ul/>');
            var _count_items = $('.menu_sub li').size();
            for (var _i=_count_items-1; _i>0; _i-=2)
            {
                var _obj = $('.menu_sub li')[_i];
                _additons.prepend(_obj);
                var _obj = $('.menu_sub li')[_i-1];
                _additons.prepend(_obj);
                var _menu_height = $('.menu_sub').height();
                if (_menu_height <= _menu_wrap_height) break;
            }
            if ($(_additons.find('li')[0]).hasClass('separator'))
            {
                $(_additons.find('li')[0]).remove();
            }
            var _c = 8;
            var _w = 0;
            var _dropdown_section = $('<div class="blog-dropdown-section"/>').append(_additons).hide();
            $('.menu_sub').parent().css({overflow: 'visible', position: 'relative'}).append(_dropdown_section);

            var _blogs_timer_id;
            function _more_hover()
            {
                _more.css('background-position', '0 -24px');
                _dropdown_section.show();
                clearTimeout(_blogs_timer_id);
                if (_w > 0) return;
                _additons.find('li').each(function(i)
                {
                    if (i < _c*2)
                    {
                        _w += $(this).width();
                    }
                });
                _dropdown_section.css('max-width',_w);
            }
            function _more_unhover()
            {
                _blogs_timer_id = setTimeout(function(){
                    _more.css('background-position', '0 0');
                    _dropdown_section.hide();
                }, 1500);
            }

            _more.hover(
                function()
                {
                    _more_hover();
                },
                function()
                {
                    _more_unhover();
                }
            );
            _dropdown_section.hover(
                function()
                {
                    _more_hover();
                },
                function()
                {
                    _more_unhover();
                }
            );
        }
    }

    if ($('.custom-list-wrap').size())
    {
        $('.custom-list li').each(function()
        {
            var _w = 0;
            if ($(this).find('img'))
            {
                _w = $(this).find('img').outerWidth(true);
            }
            if (_w > 0) 
            {
                $(this).width(_w);
            }
        });
    }
});

function initialize_map()
{
    if ($('#map').size())
    {
        COORDINATE_CATEGORY = $('.locator-tabs-header a').first().attr('class').replace("locator-tab-","");
        var _default_zoom = 11;
        var _zoom = 1;
        var _center = new google.maps.LatLng(0, 0);
        if (typeof(COORDINATES) == 'undefined' || typeof(COORDINATE_CATEGORY) == 'undefined' || typeof(COORDINATES[COORDINATE_CATEGORY]) == 'undefined')
        {
            return false;
        }
        /*
        if (COORDINATES[COORDINATE_CATEGORY].length == 1)
        {
            _zoom = _default_zoom;
            for (var i in COORDINATES[COORDINATE_CATEGORY]) 
            {
                _center = new google.maps.LatLng(COORDINATES[COORDINATE_CATEGORY][i].lat, COORDINATES[COORDINATE_CATEGORY][i].lng);
            }
        }
        */
        var myMapOptions = { zoom: _zoom, center: _center, scrollwheel: false, mapTypeId: google.maps.MapTypeId.ROADMAP };
        var theMap = new google.maps.Map(document.getElementById("map"), myMapOptions);
        var myOptions = { content: '', disableAutoPan: false, maxWidth: 0, pixelOffset: new google.maps.Size(-140, 0), zIndex: null, closeBoxMargin: "0px", closeBoxURL: "/templates/thehill/images/close.png", infoBoxClearance: new google.maps.Size(1, 1), isHidden: true, pane: "floatPane", enableEventPropagation: false };
        var ib = new InfoBox(myOptions);
        var markers = ({});
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();

        for (_cat in COORDINATES)
        {
            for (var i in COORDINATES[_cat])
            {
                var marker = new google.maps.Marker({
                    map: theMap,
                    draggable: false,
                    position: new google.maps.LatLng(COORDINATES[_cat][i].lat, COORDINATES[_cat][i].lng),
                    title: COORDINATES[_cat][i].title,
                    visible: true,
                    cat: _cat
                });
                markers[(_cat*1000+Number(i))] = marker;
                mapaDetails2(ib, COORDINATES[_cat][i], marker, theMap);
                bounds.extend( new google.maps.LatLng(COORDINATES[_cat][i].lat, COORDINATES[_cat][i].lng) );
            }
        }
        theMap.fitBounds(bounds);

        var mcOptions = { gridSize: 45 };
        var markerCluster = new MarkerClusterer(theMap, markers, mcOptions); /* can be commented */
    }
    function mapaDetails2(ib, row, marker, theMap)
    {
        var _title = row.title;
        var _description = row.description;
        var boxText = document.createElement("div");
        boxText.style.cssText = "box-shadow: 4px 4px 4px #a28b68; -moz-box-shadow: 4px 4px 4px #a28b68; -webkit-box-shadow: 4px 4px 4px #a28b68;";
        $(boxText).append($('<h3>'+_title+'</h3>'));
        $(boxText).append($('<p>'+_description+'</p>'));
        google.maps.event.addListener(marker, "click", function(e) {
            ib.setContent(boxText);
            ib.open(theMap, this);
            ib.show();
        });
    }
    if ($('.locator-tabs-header').size())
    {
        $('.locator-tabs-header a').each(function()
        {
            $(this).click(function()
            {
                $('.locator-tabs-header a').removeClass('active');
                $('.locator-tabs-body ul').hide();
                var _id = $(this).attr('class').replace("locator-tab-","");
                $('.locator-bodt-cat-'+_id).show();
                $(this).addClass('active');
                COORDINATE_CATEGORY = _id;
                if (typeof(markers) != 'undefined')
                {
                    var _new_markers = [];
                    for (var i in markers) 
                    {
                        markers[i].setVisible(false);
                        if (COORDINATE_CATEGORY == markers[i].cat)
                        {
                            markers[i].setVisible(true);
                            _new_markers.push(markers[i]);
                        }
                    }
                    if (typeof(markerCluster) != 'undefined')
                    {
                        markerCluster.clearMarkers();
                        markerCluster.addMarkers(_new_markers);
                    }
                }
            });
        });
        $('.locator-tabs-header a').first().click();
    }
    if ($('.locator-tabs-body li').size())
    {
        $('.locator-tabs-body li span').each(function()
        {
            $(this).click(function()
            {
                var _key = $(this).attr('class').replace('title','').replace('item-id-','');
                _key = Number(_key);
                if (typeof(markers[(COORDINATE_CATEGORY*1000+_key)]) == 'object')
                {
                    theMap.setOptions({"zoom": _default_zoom, "center": new google.maps.LatLng(COORDINATES[COORDINATE_CATEGORY][_key].lat, COORDINATES[COORDINATE_CATEGORY][_key].lng) });
                    google.maps.event.trigger(markers[(COORDINATE_CATEGORY*1000+_key)], 'click');
                }
            });
        });
    }
}

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
