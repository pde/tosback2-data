function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj == null)
                return errorsArr;
            else {
                handler.onFailure();
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    }

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                url += '&' + handler.getVersionParamName() + '=' + handler.getVersion();
                if (!handler.sendRequest(url))
                    errorObj = createAndGetError('sendRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
            }
            else
                errorObj = createAndGetError('createRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD')
            errorObj['dvp_isOnHead'] = '1';
        if (url)
            errorObj['dvp_jsErrUrl'] = url;
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var rand = Math.random() * 100;
        for (var i = 0; i < handlersArray.length; i++) {
            if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                if (handlersArray[i].handler.isApplicable())
                    return handlersArray[i].handler;
                else
                    break;
            }
        }
        return null;
    }    
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url) {
    try {
        var regex = new RegExp("[\\?&](dvp_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = new Array();
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorQueryString = '';
        var errorObj = errorsArr[j];
        for (key in errorObj) {
            if (errorObj.hasOwnProperty(key)) {
                if (key.indexOf('dvp_jsErrUrl') == -1) {
                    errorQueryString += '&' + key + '=' + errorObj[key];
                }
                else {
                    var params = ['ctx', 'cmp', 'plc', 'sid'];
                    for (var i = 0; i < params.length; i++) {
                        var pvalue = dv_GetParam(errorObj[key], params[i]);
                        if (pvalue) {
                            errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                        }
                    }
                }
            }
        }

        var errorImp = window._dv_win.location.protocol + '//' + serverUrl + errorQueryString;
        dv_sendImgImp(errorImp);
    }
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) { }
}

function dv_baseHandler(){function k(a){var b;if(document.createElement&&(b=document.createElement("iframe")))b.name=b.id="iframe_"+Math.floor(1E12*(Math.random()+"")),b.width=0,b.height=0,b.style.display="none",b.src=a;return b}function t(a){try{if(1>=a.depth)return{url:"",depth:""};var b,e=[];e.push({win:window._dv_win.top,depth:0});for(var d,h=1,f=0;0<h&&100>f;){try{if(f++,d=e.shift(),h--,0<d.win.location.toString().length&&d.win!=a)return 0==d.win.document.referrer.length||0==d.depth?{url:d.win.location,
depth:d.depth}:{url:d.win.document.referrer,depth:d.depth-1}}catch(i){}b=d.win.frames.length;for(var j=0;j<b;j++)e.push({win:d.win.frames[j],depth:d.depth+1}),h++}return{url:"",depth:""}}catch(g){return{url:"",depth:""}}}function l(a){new String;var b=new String,e,d,h;for(e=0;e<a.length;e++)h=a.charAt(e),d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(h),0<=d&&(h="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((d+
47)%94)),b+=h;return b}this.createRequest=function(){var a=!1,b=window._dv_win,e=0,d=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=b.parent&&b.parent!=b)if(0<b.parent.location.toString().length)b=b.parent,e++,a=!0;else{a=!1;break}else{0==dv_i&&(a=!0);break}}catch(h){a=!1}var f;0==b.document.referrer.length?f=b.location:a?f=b.location:(f=b.document.referrer,d=!0);var i=null,j=null;null!=window._dv_win.external&&(i=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,j=
void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null);window._dv_win._dvScripts||(window._dv_win._dvScripts=[]);var g=document.getElementsByTagName("script");for(dv_i in g)if((a=g[dv_i].src)&&a.match(/^[ \t]*(http(s)?:\/\/)?[a-z\-]*cdn(s)?\.doubleverify\.com:?[0-9]*\/dvtp_src.js/)&&!dv_Contains(window._dv_win._dvScripts,g[dv_i])){this.dv_script=g[dv_i];window._dv_win._dvScripts[g.length]=g[dv_i];var g=dv_GetParam(a,"region")||"",k="http:",r="0";"https"==a.match("^https")&&
"https"==window._dv_win.location.toString().match("^https")&&(k="https:",r="1");try{for(var u=b,m=b,n=0;10>n&&m!=window._dv_win.top;)n++,m=m.parent;u.depth=n;var s=t(b),p="&aUrl="+encodeURIComponent(s.url),q="&aUrlD="+s.depth,c=b.depth+e;d&&b.depth--}catch(v){q=p=c=b.depth=""}e=dv_GetDynamicParams(a);"41"==g&&(g=50>100*Math.random()?"41":"8",e.push("dvp_region="+g));e=e.join("&");a=k+"//tps"+g+".doubleverify.com/visit.js?ctx="+(dv_GetParam(a,"ctx")||"")+"&cmp="+(dv_GetParam(a,"cmp")||"")+"&ipos="+
(dv_GetParam(a,"ipos")||"")+"&sid="+(dv_GetParam(a,"sid")||"")+"&plc="+(dv_GetParam(a,"plc")||"")+"&adid="+(dv_GetParam(a,"adid")||"")+"&crt="+(dv_GetParam(a,"crt")||"")+"&dvtagver=6.1.src&srcurlD="+b.depth+"&curl="+(null==j?"":encodeURIComponent(j))+"&qpgid="+(null==i?"":i)+"&btreg="+(dv_GetParam(a,"btreg")||"")+"&btadsrv="+(dv_GetParam(a,"btadsrv")||"")+"&adsrv="+(dv_GetParam(a,"adsrv")||"")+"&advid="+(dv_GetParam(a,"advid")||"")+"&num="+(dv_GetParam(a,"num")||"")+"&pid="+(dv_GetParam(a,"pid")||
"")+"&crtname="+(dv_GetParam(a,"crtname")||"")+"&unit="+(dv_GetParam(a,"unit")||"")+"&chnl="+(dv_GetParam(a,"chnl")||"")+"&ssl="+r+"&uid="+(dv_GetParam(a,"uid")||"")+"&scusrid="+(dv_GetParam(a,"scusrid")||"")+"&refD="+c;"http:"==a.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(a+="&dvp_diffSSL=1");e&&(a+="&"+e);b="srcurl="+encodeURIComponent(f);if((c=window._dv_win[l("=@42E:@?")][l("2?46DE@C~C:8:?D")])&&0<c.length){f=[];f[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;
for(i=0;i<c.length;i++)f[i+1]=c[i];c=f.reverse().join(",")}else c=null;c&&(b+="&ancChain="+encodeURIComponent(c));c=dv_GetParam(a,"uid");null==c?(c=dv_GetRnd(),a+="&uid="+c):""==c&&(c=dv_GetRnd(),a=a.replace("&uid=","&uid="+c));c=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(c=2E3);f=navigator.userAgent.toLowerCase();if(-1<f.indexOf("webkit")||-1<f.indexOf("chrome"))f="&referrer="+encodeURIComponent(window._dv_win.location),a.length+f.length<=c&&(a+=f);p.length+q.length+
a.length<=c&&(a+=q,b+=p);return a+"&eparams="+encodeURIComponent(l(b))}};this.sendRequest=function(a){var a='<html><head></head><body><script type="text/javascript" src="'+a+'"><\/script><script type="text/javascript">var script = document.getElementsByTagName("script")[0]; if (script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); } } else document.close();<\/script></body></html>',b=k("about:blank");this.dv_script.id=b.id.replace("iframe",
"script");document.body.insertBefore(b,document.body.firstChild);(b=dv_getPropSafe(b,"contentDocument")||dv_getPropSafe(dv_getPropSafe(b,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[b.name],"document"))?(b.open(),b.write(a)):(b=k('javascript: (function(){document.open(); document.domain="'+window.document.domain+"\"; document.write('"+a+"');})()"),this.dv_script.id=b.id.replace("iframe","script"),document.body.insertBefore(b,document.body.firstChild));return!0};this.isApplicable=
function(){return!0};this.onFailure=function(){var a=window._dv_win._dvScripts,b=this.dv_script;null!=a&&(void 0!=a&&b)&&(b=a.indexOf(b),-1!=b&&a.splice(b,1))};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"5"}};


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function() {
        try{
            window._dv_win = (window._dv_win || window);
            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp('tps30.doubleverify.com/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src', errorsArr);
        }
        catch(e){
           try{
                dv_SendErrorImp('tps30.doubleverify.com/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });   
           }catch(e){}
        }
    }
}

try {
    window._dv_win = window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }
