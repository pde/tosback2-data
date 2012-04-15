
function setCookie(c_name, value, expireMinutes) {
    var now = new Date();
    var minutes = now.getMinutes();
    minutes += expireMinutes;
    now.setMinutes(minutes);
    document.cookie = c_name + '=' + escape(value) + ';path=/;expires=' + now.toGMTString();
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

var isIE;
if (navigator.userAgent.indexOf("Safari") > 0 || navigator.product == "Gecko") {
    isIE = false;
}
else {
    isIE = true;
}

if (!isIE) {
    HTMLElement.prototype.__defineGetter__("currentStyle", function ()
    { return document.defaultView.getComputedStyle(this, null); });
}


function ObjHide(div_id, hide) {
    if (isIE) {
        _ObjHide(div_id, hide, 'select');
        _ObjHide(div_id, hide, 'textarea');
    }
    __ObjHide(hide, 'FlashObject');
}

function _ObjHide(div_id, hide, TagName) {
    var i_list = document.getElementsByTagName(TagName);
    if (i_list != null && i_list.length > 0) {
        var d = document.getElementById(div_id);
        var dTop = findPosTop(d), dLeft = findPosLeft(d);
        var o;
        var oTop, oLeft;
        var s = hide ? 'hidden' : 'visible';
        for (var i = 0; i < i_list.length; i++) {
            o = i_list.item(i); oTop = findPosTop(o); oLeft = findPosLeft(o);
            if ((oTop >= dTop && oTop <= dTop + d.offsetHeight) && (oLeft >= dLeft && oLeft <= dLeft + d.offsetWidth))
                o.style.visibility = s;
        }
    }
}

function __ObjHide(hide, id) {
    try {
        var s = hide ? 'hidden' : 'visible';
        var o = document.getElementById(id);
        o.style.visibility = s;
    }
    catch (e) { }
}


function findPosLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) { curleft += obj.offsetLeft; obj = obj.offsetParent; }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function findPosTop(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) { curtop += obj.offsetTop; obj = obj.offsetParent; }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

function GetStyle(obj) {
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
        var rules = isIE ? sheets[i].rules : sheets[i].cssRules;
        for (var j = 0; j < rules.length; j++) {
            //alert('styleSheets index:' + i + ' * rules[' + j + '].selectorText=' + rules[j].selectorText);
            if (rules[j].selectorText == ('.' + obj.className))
                return rules[j].style;
        }
    }
    return null;
}

function ShowPopupDiv(div_id, tb_id, show, cssView, cssHidden, moveToMouse) {
    try {
        var o = document.getElementById(tb_id); var d = document.getElementById(div_id);
        if (show) {
            if (d.className != cssView) {
                d.className = cssView;
                var _style = GetStyle(d);

                if (_style.top == 'auto')
                    d.style.top = findPosTop(o) + o.offsetHeight + 'px';

                if (_style.left == 'auto') {
                    if (moveToMouse) {
                        var w_x
                        if (isIE)
                            w_x = window.event.x;
                        else
                            w_x = findPosLeft(o);
                        d.style.left = w_x + 'px';
                    }
                    else
                        d.style.left = findPosLeft(o) + 'px';
                }
                ObjHide(div_id, true);
                startOpacityChange(div_id, cssHidden, 0);
            }
        } else {
            if (d.className != cssHidden) {
                ObjHide(div_id, false);
                d.className = cssHidden;
            }
        }
    }
    catch (e) { }
}

function HideDiv(div_id, cssHidden) {
    try {
        var d = document.getElementById(div_id);
        ObjHide(div_id, false);
        d.className = cssHidden;
    }
    catch (e) { }
}
function openSizeChart(url) {
    window.open(url, '', 'resizable=yes,status=yes,scrollbars=yes,height=220,width=540');
}

