iperceptions = window.iperceptions || {};

//API function to add floating icon
iperceptions.ipeIcon = function(config) {
    config = config || {};
    if(iperceptions.launchedIcon) {
        return;
    }
    iperceptions.launchedIcon = true;

    var _pos_x = config.pos_x || 'right', //left|middle|right
        _pos_y = config.pos_y || 'bottom', //'top'|middle|bottom 
        _img_out = config.img_out || "/images/IPLIB_icon.png",
        _img_over = config.img_over || "/images/IPLIB_icon_over.png", 
        _size_out = [78, 78],
        _size_over = [242, 78],
        _size_current = _size_out,
        _id = Math.ceil(Math.random() * 10000),
        _div_id = 'UIF-' + _id, 
        _img_id = 'UIF-IMG-' + _id,
		_page = '<div id="' + _div_id + '" ' +
        'style="display:none;position:fixed;cursor:pointer;margin:0px!important;padding:0px!important;border:0px!important;' +
        'z-index: 2147483647!important;' +
		(_pos_x == 'right' ? 'text-align:right!important;' : 'text-align:left!important;') +
		(_pos_y == 'bottom' ? 'vertical-align:bottom!important;' : 'vertical-align:top!important;') +
        'background-color:transparent!important;">' +
        '<img id="' + _img_id + '" ' +
        ' src="' + _img_out + '" />' +
        '</div>',
		_img, _div, _is_ie;
      
        //Generic method to attach an event to a DOM element
        domAddEvent = function (target, eventName, handlerFn) {
            if (target.addEventListener)
                target.addEventListener(eventName, handlerFn, true);
            else if (target.attachEvent)
                target.attachEvent("on" + eventName, handlerFn);
            else
                target["on" + eventName] = handlerFn;
        },

        ipeSetPos = function(pos_x, pos_y) {
            var div = document.getElementById(_div_id),
                divW = _size_current[0],
                divH = _size_current[1],
                viewsize = iperceptions.viewSize(),
                bodyWidth, bodyHeight, winW, winH; 



            //Our default viewsize calculation sometimes to include the scrollbar.  document.documentElement.client[Width|Height] do not include scrollbar.
            bodyWidth = document.documentElement.clientWidth;
            if (bodyWidth > 0 && bodyWidth < viewsize[0]) {
                viewsize[0] = bodyWidth;
            }

            bodyHeight = document.documentElement.clientHeight;
            if (bodyHeight > 0 && bodyHeight < viewsize[1]) {
                viewsize[1] = bodyHeight;
            }

            winW = parseInt((viewsize[0] - divW));
            winH = parseInt((viewsize[1] - divH));
               
            if (pos_x == 'left') { div.style.left = '0px'; }
            else if (pos_x == 'right') { div.style.right = '0px'; }
            else if(winW >= 0) { div.style.left = (winW / 2 >> 0) + 'px'; }
            if (pos_y == 'top') { div.style.top = '0px'; }
            else if (pos_y == 'bottom') { div.style.bottom = "0px"; }
            else if(winH >= 0) { div.style.top = (winH / 2 >> 0) + 'px'; }
        },

        isIE = function() {
            var ua = navigator.userAgent.toLowerCase(),
            isOpera = (ua.indexOf('opera') != -1);
            return ua.indexOf('msie') != -1 && !isOpera && (ua.indexOf('webtv') == -1);
        },

        IEMajorVersion = function() {
            var m = /MSIE\s*(\d*)/.exec(navigator.userAgent),
                v = (m && m[1]) || -1;
            if(isNaN(parseInt(v, 10))) {
                v = -1;
            }
            return v;
        };

    _is_ie = isIE();

    //Now blocking IE6
    if(_is_ie && IEMajorVersion() < 7) {
        return;
    }

    if (_is_ie) {
        document.body.insertAdjacentHTML("beforeEnd", _page);
    } else {
        _dL = document.createElement("div");
        _dL.innerHTML = _page;
        document.body.appendChild(_dL);
    }
    _img = document.getElementById(_img_id);
    _div = document.getElementById(_div_id);
    _div.style.display = "block";
    _div.style.height = _size_out[1] + 'px';
    ipeSetPos(_pos_x, _pos_y);

    domAddEvent(window, 'resize', function () { ipeSetPos(_pos_x, _pos_y); });
    domAddEvent(window, 'scroll', function () { ipeSetPos(_pos_x, _pos_y); }); 
    domAddEvent(_img, "mouseout", function () {
            _img.src = _img_out;
            _size_current = _size_out;
        });
    domAddEvent(_img, "mouseover", function () {
            _img.src = _img_over;
            _size_current = _size_over;
    });
    domAddEvent(_img, "click", function (e) {
        iperceptions.ipeCC(config);
    });
}


//API function to launch comment card
iperceptions.ipeCC = function(config) {
    var config = config || {};
    config.surveyID = config.surveyID || 108893;

    iperceptions.launch(config);
}

iperceptions.viewSize = function() {
    var width = 0, height = 0;
    if (typeof (window.innerWidth) == 'number') {
        width = window.innerWidth;
        height = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    return [width, height];
}

iperceptions.launch = function(config) {
    config.langID = config.langID || 1;

    var RC = function(n){var nEQ= n+'='; var ca= document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c= ca[i];while (c.charAt(0)==' ') c= c.substring(1,c.length);if (c.indexOf(nEQ) == 0) return c.substring(nEQ.length,c.length);} };

    var name = "IPerceptions_" + config.surveyID;
    var w = 0, h = 0, url = "", l = 0, t = 0, vs = iperceptions.viewSize();
    w = 480;
    h = 580;
    l = Math.max((vs[0] - w) / 2, 0);
    t = Math.max((vs[1] - h) / 2, 0);
    url = window.location.protocol + "//ips-comment.iperceptions.com/UIF/UIFMain.aspx?lid=" + config.langID + "&rn=" + config.surveyID + "&pID=1&referrer=" + encodeURIComponent(window.location.href);
 

    var features = "width=200,height=200, left=" + l + ", top=" + t + ", resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no";

    var html = '<html><head><title>Feedback</title></head><body style="margin:0;overflow:hidden;">' +
                '<div id="IPEMaintenanceMessage" style="display:none; margin-left:0px; margin-top:0px;cursor:pointer; z-index: 2147483647; width:100%; height:100%; position:absolute; background:#FA9100; " onclick="window.close();">' +
                '<div style="border:1px solid white; margin-left:10%; margin-top:10%; width:80%; height:80%">' +
                '<p style="color: white; text-align:center; margin-top:20px;">The feedback feature is currently unavailable.<br><br>Click to Close</p>' +
                '</div>' +
                '</div>' +
                '<script type="text/javascript">' +
                "function lScript2(file, onReady) { var script = document.createElement('script'); script.type = 'text/javascript'; script.src = file; if (typeof (script.onreadystatechange) == 'undefined') { script.onload = function () {if(typeof(onReady) === 'function') { onReady(); } this.onload = null;}; } else { script.onreadystatechange = function () {if (this.readyState != 'loaded' && this.readyState != 'complete') {return;}if(typeof(onReady) === 'function') { onReady(); } this.onreadystatechange = null;}; } document.getElementsByTagName('head')[0].appendChild(script); };" +
                'lScript2("' + window.location.protocol + '//ipinvite.iperceptions.com/invitations/javascripts/layer_global_aicollect_2012.js",' +
                'function() { ' +
                'if(window.globalswitch) { window.resizeTo(' + w + ',' + h +'); top.location = "' + url + '"; } else { document.getElementById("IPEMaintenanceMessage").style.display = "block"; }});' +
                '</script>' +
                '</body></html>';
     var win = window.open("", name, features);
     win.document.write(html);
}

iperceptions.ipeIcon();