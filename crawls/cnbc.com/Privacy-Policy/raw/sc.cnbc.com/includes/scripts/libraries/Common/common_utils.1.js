/*====== BEGIN Common =======*/
var CNBC_Common = {};

CNBC_Common.gotoPage = function(url) {
	// IE hack as it often has problems with attached events and window.location
	if (url != "") {
		setTimeout('window.location.href = "' + url + '"', 0); // IE hack
	}
};

CNBC_Common.openWindow = function(url,windowName,options){
    /*
        //-- all possible options for options --//
        status	    - The status bar at the bottom of the window.
        toolbar	    - The standard browser toolbar, with buttons such as Back and Forward.
        location   	- The Location entry field where you enter the URL.
        menubar	    - The menu bar of the window
        directories	- The standard browser directory buttons, such as What’s New and What’s Cool
        resizable	- Allow/Disallow the user to resize the window.
        scrollbars	- Enable the scrollbars if the document is bigger than the window
        height	    - Specifies the height of the window in pixels. (example: height=’350')
        width	    - Specifies the width of the window in pixels.
    */
    if (windowName=='') {windowName="print";};
    var x = window.open(url,windowName,options);
    x.focus();
};

CNBC_Common.isNull = function(str) {
	if (typeof str == 'undefined' || str == '' || str == null) {
		return true;
	};

	return false;
};

CNBC_Common.validateStr = function(str, replace) {
	replace = replace || "--";
	if (typeof str === 'undefined' || str == '' || str === null) {
		return replace;
	};
	
	return str;
};

CNBC_Common.focus = function($el, defaultText) {
	if (CNBC_Common.checkForDefault($el.val(), defaultText)) {
		$el.val('');
	}
};

CNBC_Common.blur = function($el, defaultText, checkEmpty) {
	var val = $el.val();
	if (CNBC_Common.checkForDefault(val, defaultText, checkEmpty)) {
		$el.val(defaultText);
	}
};

CNBC_Common.checkForDefault = function(val, defaultText, checkEmpty) {
	var flag = (val == defaultText);
	if (checkEmpty && !flag) {
		flag = val == '';
	};

	return flag;
};

CNBC_Common.isArray = function(array) {
    return (array !== null && array instanceof Array);
};

/*====== END Common =======*/


/*====== BEGIN Utils =======*/
function CNBC_Utils() {};

CNBC_Utils.loaderText = 'Loading ...';
CNBC_Utils._fontSizeLabel = 'USERFONTSIZE';
CNBC_Utils._domain = '.cnbc.com';
CNBC_Utils._path = '/';

CNBC_Utils.pageControl = {};
CNBC_Utils.initEvents = function() {
	$('table.data tbody tr').bind('mouseover', function() {
		CNBC_Utils.highlightRow($(this), true);
	}).bind('mouseout', function() {
		CNBC_Utils.highlightRow($(this));
	});
	
	CNBC_Utils.initFontSizeEvents();
	CNBC_Utils.pageControl.initEvents();
};

CNBC_Utils.showLoader = function(el, text) {
	if (el) {
	    var $el = (typeof el === 'string') ? $('#'+el) : el;
	    if ($el.find("div.loader").length == 0) {
    	
	        text = text || CNBC_Utils.loaderText;
	        var div = $('<div class="loader contain"><span class="loading">&nbsp;</span><span class="loadingTxt">' + text + '</span></div>');
	        var pos = $el.position();
	        div.css('top',pos.top+'px')
		        .css('left',pos.left+'px')
		        .css('width',$el.outerWidth()+'px')
		        .css('height',$el.outerHeight()+'px');
        	
	        $el.append(div);
        	
	        return div;
	    }
	}
};

CNBC_Utils.hideLoader = function($div, $container) {
	if ($div) {
		$div.remove();
	} else if ($container && $container.length == 1) {
		$('div.loader', $container).remove();
	}
};

CNBC_Utils.createCookie = function(name,value,h) {
    var expires = "";
    if (!CNBC_Common.isNull(h)) {
        var date = new Date();
        date.setTime($.now()+(h*60*60*1000));
        expires = "; expires="+date.toGMTString();
    };
    document.cookie = name+"="+value+expires+";domain="+this._domain+";path="+this._path;
};

CNBC_Utils.readCookie = function(name) {
    var nameEQ = name + "=";
    var result = CNBC_Utils.parseCookieValues(nameEQ, document.cookie.split(';'));
    if (result == null) {
        var unescaped = unescape(document.cookie);
        result = CNBC_Utils.parseCookieValues(nameEQ, unescaped.split(';'));
    };
    return result;	
};

CNBC_Utils.parseCookieValues = function(name, data){
    for (var i=0, len=data.length; i <len; i++) {
        var c = data[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        };
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    };
    return null;	
};

CNBC_Utils.eraseCookie = function(name) {
    if (CNBC_Utils.readCookie(name)) {
        var params = name + "=;path=" + this._path + ";domain=" + this._domain + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        document.cookie = params;
    }
};

CNBC_Utils.deleteAllLoginCookies = function() {
	//Delete only Login cookies
	var allCNBCCookies = ["c_sna","c_ipb_pass_hash","c_ipb_session_id","c_ipb_member_id","snas","c_ws","SUBSCRIBERINFO3","SUBSCRIBERINFO2","SUBSCRIBERINFO","CASTOKEN","c_enc"];
	for (var i=0, len=allCNBCCookies.length; i<len; i++) {
		var name = unescape(allCNBCCookies[i]);
		CNBC_Utils.eraseCookie(name, this._path, this._domain);
	};
	window.location.reload();
};

CNBC_Utils.initFontSizeEvents = function() {
	if ($('div.font-content').length > 0) {
		CNBC_Utils.setFontSize();
		
		$('a.icon-font').live('click', function() {
			CNBC_Utils.toggleFontSize($(this).attr('data-font'));
		});
	}
};

CNBC_Utils.toggleFontSize = function(dir, val) {
	var $text = $('div.font-content');
	var style = $text.attr('style');
	var font = style ? parseFloat(style.split(':')[1]) : val;
	
	var newFont = (val) ? val : (dir == '+') ? (font + 0.25) : (font - 0.25);

	if (newFont >= 0.75 && newFont <= 1.50) {
		$text.css('font-size', newFont + 'em');
		// use library set cookie
		document.cookie = CNBC_Utils._fontSizeLabel + '=' + newFont;
	}
};

CNBC_Utils.setFontSize = function() {
	var font = CNBC_Utils.getFontSizeCookie() || 1;
	CNBC_Utils.toggleFontSize(null, font);
};

CNBC_Utils.getFontSizeCookie = function() {
	var search = CNBC_Utils._fontSizeLabel;
	var cookie = document.cookie;
	if (cookie.length > 0 && cookie.indexOf(search) != -1) {
		var crumb = cookie.split(';');
		
		for (var i=0, len=crumb.length; i<len; ++i) {
			var key = crumb[i];
			if (key.match(search)) {
				var font = key.split('=');
				return parseFloat(font[1]);
			}
		}
	}
};

CNBC_Utils.toolTipShow = function(id, parentid, $container, info, adjustTop, adjustLeft) {
	$container.append('<div id="'+id+'"></div>');
	
	var $tooltipDiv = $('#'+id);
	var offset = $('#'+parentid).offset();
	
	$tooltipDiv.html(info);
	$tooltipDiv.offset({
         top:  offset.top + adjustTop
        ,left: offset.left + adjustLeft
	});
};

CNBC_Utils.toolTipHide = function(id) {
	$container = $('#'+id);
	if (!CNBC_Common.isNull( $container )) {
        $container.remove();
	}
};

CNBC_Utils.highlightRow = function($el, highlight) {
	var cName = 'hlight';
	$el.siblings('tr').removeClass(cName);
	
	if (highlight) {
		$el.addClass(cName);
	} else {
		$el.removeClass(cName);
	}
};

CNBC_Utils.pageControl.host_url = location.host;
CNBC_Utils.pageControl.initEvents = function () {
    var parent = $("#article-tools");
    if(!CNBC_Common.isNull(parent)) {
        $("a.print", parent).bind("click", function() {
            CNBC_Utils.pageControl.print($(this).attr("data-nodeID"));
        });
        $("a.email", parent).bind("click", function() {
            CNBC_Utils.pageControl.email($(this).attr("data-nodeID"));
        });
    }
};

CNBC_Utils.pageControl.print = function(nodeID) {   
    var url = "http://" + this.host_url + "/id/" + nodeID + "/print";
    CNBC_Common.openWindow(url,'print','width=800,height=600,scrollbars=1,resizable=1');
};

CNBC_Utils.pageControl.email = function(nodeID) {
    var data = this.getEmailData(nodeID);  
    document.location.href = "mailto:?subject="+data.subject+"&body="+data.pubdate+"%0d%0a"+data.body+"... %0d%0a%0d%0a Read More: "+data.loc;
};

CNBC_Utils.pageControl.getEmailData = function(nodeID) {
    var ebody = $("p","div.content").text().substr(0,730);
    var encodeBody = encodeURIComponent($.trim(ebody).replace(/\s+/gi,' '));
    return {
         subject: "CNBC.com Article: " + $("h1.title","div.story").text()
        ,pubdate: $("div.datestamp","div.story").text()
        ,body:    encodeBody
        ,loc:     encodeURIComponent('http://'+location.host+"/id/"+nodeID+'/') // CMS needs to provide url for new story urls  
    };
};
/*
NOTE//: Trigger CNBC_Utils.pageControl.showPrintMenu method from the print Template when loaded
*/
CNBC_Utils.pageControl.showPrintMenu = function() {
    window.print();
};

CNBC_Utils.execute = function(){
    var con = window.console,
    isWarnOk = (con && typeof con.warn == "function"),
    warn = function(msg) { if (isWarnOk) { console.warn(msg); } };
    
    return function(component,func) {
        try{
            func();
        } catch(e) {
            warn("error initializing "+component);
        }
    }
}();

CNBC_Utils.getElement = function(selector, context, property){
    var prop = '_$';
    prop += property || selector;
    if (CNBC_Common.isNull(context._elements) || !CNBC_Common.isArray(context._elements)) {
        context._elements = [];
    };
    if (!context._elements[prop]) {
        context._elements[prop] = $(selector);
    };
    return context._elements[prop];
};
CNBC_Utils.initEvents();
/*====== END Utils =======*/