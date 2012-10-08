function generateThumbnails(json, count, callback) {
    pareJson4Thumbs(json, count, callback);
}

var VIDEO = 'Video';
var PREVIEW = 'Preview';


function Video() {
    this.guid;  // guid for this video in the feed URL
    this.previewURL; //We are no longer generating previews from our system. The preview logic is now dependent on the trk/seg parameter detailed below
    this.releaseURL;// video URL refer to media$content.data.plfile$url
    this.title;// video title
    this.description;
    this.author;
    this.thumbnail;
    this.isPremium = false;
    this.small_thumbnail;
    this.larg_thumbnail;
    this.default_thumbnail;
    this.updateDate;
    /*
     * categories :This returns a map with a “name” property. 
     * This points to the “Affiliate” or domain that the video is related to, e.g. “DawgPost.com
     * refer to media$categories
     */
    this.categories_name;
    this.categories_scheme;
    this.categories_label;
    
    /*
     * This is the user that added the video into the system. Used to concatenate with the categories/affiliate value
     */
    this.createdBy;
    
    /*
     * Array
     * This is the user friendly representation of selected stats/tags,
     *  e.g. Corey Johnson, Garden City, Kansas, NJCAA Football, JUCO Football, College Football, Football
     */
    this.statsNames;
    
    /*
     * Array
     * his is the guid for each of the selected stats/tags, 
     * e.g. classes:fsnext/players/J/Johnson/92299/rostered/5244029, 
     *      classes:fsnext/players/J/Johnson/92299, classes:fsnext/state/kansas, 
     *      classes:fsnext/division/njcaa-football, classes:fsnext/league/juco-football, 
     *      classes:fsnext/level/college-football, classes:fsnext/sport/football
     */
    this.statsIds;
}

Video.getURL=function(){
     
}

Video.FEED_URL_PROPERTY="feedurl";
Video.BASE_URL_PROPERTY="videoBaseUrl";
Video.VIDEO_ID_PROPERTY="videoId";

//Video.BASE_URL='http://feed.theplatform.com/f/fs-next/poc-allvideo?form=json';
//Video.BASE_URL='http://feed.theplatform.com/f/fs-next/team-usc-trojans?form=json';
Video.BASE_URL='http://feed.theplatform.com/f/fs-next/team-minnesota-gophers?form=json';
//Video.BASE_URL='http://feed.theplatform.com/f/fs-next/sport-college-football?form=json';

// use video_base_url becoming from configuration under /content/fsnext/config/thePlatform/
if(typeof(video_platform_url) != 'undefined' && video_platform_url != 'null'){
    Video.BASE_URL = video_platform_url;
}

if(typeof(para_video_platform) !='undefined'){
//append with para video_platform
    if(para_video_platform != 'null'){
        Video.BASE_URL += para_video_platform;  
    }
}

/**
 * Parse json result from the platform
 * Store the video in a video list;
 * @param json: the json result from the platform
 * @param count: parse the first count video in the list. if the value is -1. return all the video
 * @param callback: after this method done. call back the callback function
 */
Video.parseJson4Thumbs =function (json, count, callback) {

    var result = json;
    var title = result.title;
    var videosArray = new Array();
    if(count ==-1){
        count = result.entries.length;
    }
    for ( var i = 0; i < result.entries.length && i < count; i++) {
        var ite = result.entries[i];
        var video = new Video();
        video.guid=ite.guid;
        video.description = ite.description;
        video.author = ite.author;
        video.title = ite.title;
        video.updateDate = ite.pubDate;
        video.default_thumbnail=ite.plmedia$defaultThumbnailUrl;
        if(ite.next$entitlementTier&& $.trim(ite.next$entitlementTier)!=''){
            video.isPremium = true;
        }
        if(ite.media$categories&&ite.media$categories.length!=0){
            //assume there is only one content
            video.categories_name = ite.media$categories[0].media$name;
            video.categories_scheme =ite.media$categories[0].media$scheme;
            video.categories_label = ite.media$categories[0].media$label;
        }
        if(ite.media$content&&ite.media$content.length!=0){
            //assume there is only one content
            video.releaseURL = ite.media$content[0].plfile$url;
        }
        if(ite.media$thumbnails&& ite.media$thumbnails.length!=0){
            //assume there is only one content
            video.larg_thumbnail = ite.media$thumbnails[0].plfile$url;
        }
        video.createdBy = ite.next$createdBy;
        video.statsNames = ite.stats$names;
        video.statsIds = ite.stats$ids;
        videosArray.push(video);
    }
    callback(videosArray);
}

/**
 * 
 * @@param d: the input date, if the date is less a minute than current time, return 1 minute ago,
 * @return if the date is less a minute than current time, return 1 minute ago
 *         if the date is less than a hour but older than a minute, return X hours ago
 *         if the date is older than a day, return X days ago.
 */
Video.setTimeAgoStr=function(d) {
    var now= new Date();
    var between=(now.getTime()-d.getTime())/1000;
    var minute = between / 60;
    var hour, day;
    if (minute < 1)
        return "1 minute ago";
    else if (minute < 60)
        return Math.round(minute) + " minutes ago";
    else {
        hour = minute / 60;
        if (hour < 24) {
            return Math.round(hour) + " hours ago";
        } else {
            day = hour / 24;
            return Math.round(day) + " days ago";
        }
    }
    
}

/**
 * 
 * Formate Query String sending to the platform
 * if there is no ?form=json,
 * add it.
 * if the protocal is https
 * use it.
 * @param str
 * @return
 * 
 */
Video.formateQueryStatements=function(str){
    var query = str;
    if(query!=null && $.trim(query)!=""){
        if(query.indexOf("?form=json")==-1){
             query+="?form=json"
        }
        if(query.substring(0,6).indexOf("http")==-1){
            var host=((window.location.protocol == 'https:')?'https':'http')+'://';
            query = host+query;
        }
    }
    return query;
}

Video.millisecondsStrToDate = function(str){
    var startyear = 1970; 
    var startmonth = 1;
    var startday = 1;
    var d;
    d = new Date();
    var now= new Date();
    d.setFullYear(startyear, startmonth, startday);
    d.setTime(0);
    d.setMilliseconds(str);
    return d;
}

/**
 * @param guid: videoid;
 * @param caller:  the object instance;
 * @param func: callback fucntion
 * @return
 */
Video.getSingleVideo= function(guid,caller,callback,url){
    if(null != guid && $.trim(guid)!=''){
        var self = this;
        var appender = "&byGuid="+guid
        var baseURL = Video.BASE_URL;
        if(url!=undefined && url && url!=""){
            baseURL = url;
        }

        Video.getVideos(Video.formateQueryStatements(baseURL)+appender,this,function(videoList){
            if(videoList!=null && videoList.length>0){
                callback.call(caller,videoList[0]);
            }else{
                callback.call(caller,null);
            }
        });
    }else{
        console.error("guid  is null or blank");
    }
},




Video.retrieveQuickVideoList=function(){

}


/**
 * 
 * 
 * @param url:feeds url from the platform
 * @param callee: the callee of this methed
 * @param callback:this callee's method.
 * @return no return , after get the result from the platform and set in a videolist. will call the callback funtion and pass the parament to the call back function
 */
Video.getVideos = function (url,callee,callback){
    if(url!=null &&$.trim(url)!=''){
        $.getJSON(Video.formateQueryStatements(url), function(result) {
            if(result.responseCode =='400'){
                console.error('error:'+result.title +'\n'+'description'+result.description+'\n'+'serverStackTrace'+result.serverStackTrace);
            }else {
                Video.parseJson4Thumbs(result, -1, function(videoList) {
                        callback.call(callee,videoList);
                });
            }
        });
    }else{
        console.error('url to query video is null or empty');
    }
}

Video.getVideoPathInBrowser=function (){      
            var params = [];    
            var url =new String();
            var url =  window.location.href;
            var path = window.location.pathname;
            if(url.indexOf("#")==-1){
                return null;
            }
            if(url.indexOf(path)!==-1){
                var temp = url.substring(url.indexOf(path)+path.length+1);   //remove the whole path. in the above example. remove the http://localhost:4502/cf#/content/fsnext/college/usc-trojans/videos/video1.html. Then temp = #hello;
                var tempParams = temp.split("#");
                if(temp.indexOf("#")!==-1){                    
                    //start with 0 to skip the url;
                    for(var i=0;i<tempParams.length;i++){
                        params[i]=tempParams[i];
                    }
                  }
            }
            return params;
            
}

Video.base64Encode=function (data) {
    // Encodes string using MIME base64 algorithm  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/base64_encode
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Rafał Kukawski (http://kukawski.pl)
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
 
        bits = o1 << 16 | o2 << 8 | o3;
 
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
 
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
 
    enc = tmp_arr.join('');
    
    var r = data.length % 3;
    
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


Video.base64Decode = function (data) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    data += '';
 
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
 
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
 
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
 
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
 
    dec = tmp_arr.join('');
    dec = this.utf8_decode(dec);
 
    return dec;
}

Video.base64Encode=function (data) {
    // Encodes string using MIME base64 algorithm  

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
 
        bits = o1 << 16 | o2 << 8 | o3;
 
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
 
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
 
    enc = tmp_arr.join('');
    
    var r = data.length % 3;
    
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


Video.base64Decode = function (data) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
 
    if (!data) {
        return data;
    }
 
    data += '';
 
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
 
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
 
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
 
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
 
    dec = tmp_arr.join('');
   
 
    return dec;
}
/*
* the following code is support cross domain for ie8, ie9.
*/
if(typeof(jQuery)!='undefined'){

    if (!jQuery.support.cors && window.XDomainRequest) {
        var httpRegEx = /^https?:\/\//i;
        var getOrPostRegEx = /^get|post$/i;
        var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');
        var xmlRegEx = /\/xml/i;
    
        // ajaxTransport exists in jQuery 1.5+
        jQuery.ajaxTransport('text html xml json', function(options, userOptions, jqXHR){
            // XDomainRequests must be: asynchronous, GET or POST methods, HTTP or HTTPS protocol, and same scheme as calling page
            if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(userOptions.url) && sameSchemeRegEx.test(userOptions.url)) {
                var xdr = null;
                var userType = (userOptions.dataType||'').toLowerCase();
                return {
                    send: function(headers, complete){
                        xdr = new XDomainRequest();
                        if (/^\d+$/.test(userOptions.timeout)) {
                            xdr.timeout = userOptions.timeout;
                        }
                        xdr.ontimeout = function(){
                            complete(50000, 'timeout');
                        };
                        xdr.onload = function(){
                            var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
                            var status = {
                                code: 200,
                                message: 'success'
                            };
                            var responses = {
                                text: xdr.responseText
                            };
    
                            try {
                                if (userType === 'html') {
                                    responses.html = xdr.responseText;
                                } else if (userType === 'json') {
                                    try {
                                        responses.json = $.parseJSON(xdr.responseText);
                                    } catch(e) {
                                        status.code = 500;
                                        status.message = 'parseerror';
                                        //throw 'Invalid JSON: ' + xdr.responseText;
                                    }
                                } else if ((userType === 'xml') || ((userType !== 'text') && xmlRegEx.test(xdr.contentType))) {
                                    var doc = new ActiveXObject('Microsoft.XMLDOM');
                                    doc.async = false;
                                    try {
                                        doc.loadXML(xdr.responseText);
                                    } catch(e) {
                                        doc = undefined;
                                    }
                                    if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                                        status.code = 500;
                                        status.message = 'parseerror';
                                        throw 'Invalid XML: ' + xdr.responseText;
                                    }
                                    responses.xml = doc;
                                }
                            } catch(parseMessage) {
                                throw parseMessage;
                            } finally {
                                complete(status.code, status.message, responses, allResponseHeaders);
                            }
                        };
                        xdr.onerror = function(){
                            complete(500, 'error', {
                                text: xdr.responseText
                            });
                        };
                         //Do Not Delete this function! Althrough it is empty.
                        xdr.onprogress = function() {
                    //      console.log(xdr.responseText);
                    
                        };
                        xdr.open(options.type, options.url);
                        //xdr.send(userOptions.data);
                        xdr.send();
                    },
                    abort: function(){
                        if (xdr) {
                            xdr.abort();
                        }
                    }
                };
            }
        });
    }
}
