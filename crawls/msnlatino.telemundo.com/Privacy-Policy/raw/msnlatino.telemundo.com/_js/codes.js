//Displays ads on Telemundo, requires jQuery

//DIVAL is the object that adds the di pixel on the page after every refresh
var DIVAL;
if (AD_CODES.di_url !== undefined) {
    var params = {
        "cURL": AD_CODES.cURL,
        "di": AD_CODES.di,
        "pi": AD_CODES.pi,
        "ps": AD_CODES.ps
    };
    DIVAL = new diValue(params);
}

/* Example JSON AD CODE
{
    "ad_base": "http://ad.doubleclick.net/adj/",
    "iframe_url": "/static/iframe.html",
    "di_url": "http://c.msn.com/c.gif?di=2585&pi=70709&ps=97089&tp=&rf=",
    "params": {
        "dart_site": "nbcu.telemundo",
        "ad_tag_page_name": "home",
        "site": "telemundo",
        "sect": "home",
        "category_excludes": ";!c=home;!c=telemundo;!c=noexpand",
        "pageid": "2043925204"   //unique (per page) value to identify the page
    },
    "sizes": {
        "728x90": {
            "category_excludes": ";!c=noopapd",
            "dcopt": "dcopt=ist",
            "position": "pos=1",
            "tile": "tile=1",
            "size": "sz=728x90"
        },
        "120x90": {
            "position": "pos=2",
            "tile": "tile=2",
            "size": "sz=120x90"
        },
        "120x30": {
            "position": "pos=3",
            "tile": "tile=3",
            "size": "sz=120x30"
        },
        "300x250": {
            "position": "pos=4",
            "tile": "tile=4",
            "size": "sz=300x250"
        },
        "300x125": {
            "position": "pos=5",
            "tile": "tile=5",
            "size": "sz=300x125"
        }
    }
};
*/

// Populates the ads with the proper ad codes, as well as does ad refreshing
function dartAds(codes) {
    //found array is a list of what ad sizes we found on the page
    this.found={};
    this.timers={};
    this.reconstruct(codes);
}
// @TODO: add description
dartAds.prototype.reconstruct = function(codes) {
//    console.debug((new Date()).toISOString(), 'DARTad.reconstruct', codes);
    this.codes=codes;
    var default_dart_site = this.codes.params.dart_site;
    //sets the random value for this iteration
    this.getRandom();

    //iframe used for refreshing ads
    this.iframe_url=this.codes.iframe_url;
    //base url for all add calls, consists of combining the json values shown above
    this.base_dart_url=
        this.codes.ad_base+'___DS___/'+
        this.codes.params.ad_tag_page_name;
    var params={site:false,sect:false,sub:false,sub2:false,fold:false,sport:false,cat:false,cls:false,mod:false,yr:false,pageid:false};
    if (top === self) {
        params.tandomad=(top.eTandomAd||'none');
    }
    //this loop now takes the global params and adds them to the base_dart_url
    for(var i in params){
        if(params.hasOwnProperty(i)){
            if(this.codes.params[i]!==undefined){
                this.base_dart_url+=';'+i+'='+this.codes.params[i];
            }
            else if(params[i]!==false){
                this.base_dart_url+=';'+i+'='+params[i];
            }
        }
    }
    //the ___OE___ is a replacement token that gets taken out and replaced with local category excludes
    this.base_dart_url+=';___OE___';
    //add the pixelman code
    if(top === self && top.__nbcudigitaladops_dtparams!==undefined){
        this.base_dart_url+=';'+(top.__nbcudigitaladops_dtparams||'');
    }
    //this array contains the individual calls for each size
    this.dart_urls=[];
    for(var i in this.codes.sizes){
        if(this.codes.sizes.hasOwnProperty(i)){
            var base=this.base_dart_url;
            var url='';
            for(var j in this.codes.sizes[i]){
                if(this.codes.sizes[i].hasOwnProperty(j)){
                    if(j==='category_excludes'){
                        base=base.replace(/___OE___/,this.codes.sizes[i][j]);
                    }
                    else if(j==='dart_site'){
                        base=base.replace(/___DS___/,this.codes.sizes[i][j]);
                    }
                    else{
                        url+=';'+this.codes.sizes[i][j];
                    }
                    
                }
            }
            base=base.replace(/___OE___/,'');
            base=base.replace(/___DS___/,default_dart_site);
            this.dart_urls[i]=base+url+';ord='+this.randDartNumber+'?';
            this.dart_urls[i]=this.dart_urls[i].replace(/;;/g,';');
        }
    }
};
// This displays an ad, and must be called inline where you want the ad to appear
dartAds.prototype.displayAd = function(size) {
//    console.debug((new Date()).toISOString(), 'DARTad.displayAd', size);
    if(this.dart_urls[size]!==undefined){
        var divId;
        if(this.found[size]===undefined){
            
            var counter=0;
            while($('#'+size+'_'+counter).length){
                counter++;
            }
            divId=size+'_'+counter;
            this.found[size]=divId;
        }
        else{
            divId=this.found[size];
        }
        document.write('<div id="'+divId+'" class="beforeAd"></div>'); //this is here to enable the ad refresh so that the ad can live in the proper container
        document.write('<scr'+'ipt src="'+this.dart_urls[size]+'"><\/scr'+'ipt>');
        // var wh=size.split(/x/);
        // $('#'+divId).css({width:parseInt(wh[0]),height:parseInt(wh[1])});
        $('#'+divId).css({width:0,height:0,position:'absolute'});
    }
    
};
// @TODO: add description
dartAds.prototype.getRandom = function() {
    this.randDartNumber=Math.round(Math.random()*10000000);
};
// @TODO: add description
dartAds.prototype.refreshAds = function(val) {
//    console.debug((new Date()).toISOString(), 'DARTad.refreshAds', val);
    if (isNaN(val)) {
        this.getRandom();
    } else {
        this.randDartNumber = val;
    }
    for (var i in this.found) {
        if (this.found.hasOwnProperty(i)) {
            var iframeLoad="";
            var wh=i.split(/x/);
            wh[1]=wh[1].indexOf("_") != -1 ? wh[1].substr(0,wh[1].indexOf("_")) : wh[1];
            
            var url=this.dart_urls[i].replace(/;ord=\d+\?/,';ord='+this.randDartNumber+'?'); //setting the random number
            var divId=this.found[i];
            //this block finds the item with the 'beforeAd' class and uses that to find the parent container of the ad
            //then it sticks a div in there to contain the iframe
            if($('div#'+divId+'.beforeAd').length){
                $('div#'+divId+'.beforeAd').parent().html('<div id="'+divId+'" class="adHolder"></div>'); 
                $('#'+divId).css({width:parseInt(wh[0]),height:parseInt(wh[1]),overflow:'hidden'});
            }
            //empty out the adHolder div, and add the iframe
            if ( wh[0] == 970 ){
                iframeLoad = ' onLoad="$(this).contents().find(\'img\').width() == 728 ? $(this).css({\'width\':\'728px\',\'margin-left\':\'115px\'}) : $(this).width($(this).contents().find(\'img\').width());"';
            }
            
            $('div#'+divId).html();
            if ($.browser.msie) {
                $('div#'+divId).html('<iframe class="adframe" marginheight="0" marginwidth="0" frameborder="0" scrolling="no" frameborder="0" '+iframeLoad+' src="' +this.iframe_url + '?c=' + escape(url) + '" width="'+wh[0]+'" height="'+wh[1]+'"></iframe>');
            } else {
                $('div#'+divId).html('<iframe id="'+divId+'_iframe" class="adframe" marginheight="0" marginwidth="0" frameborder="0" '+iframeLoad+' scrolling="no" frameborder="0"  width="'+wh[0]+'" height="'+wh[1]+'"></iframe>');
                var ifrm = document.getElementById(divId+'_iframe');
                ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
                ifrm.document.open();
                ifrm.document.write('<scr'+'ipt type="text/javascript" charset="utf-8" src="'+url+'"></s'+'cript>');
                ifrm.document.close();
            }
        
        }
    }
    // this block of code runs all the omniture calls 
    if (val == undefined || val != 'AUTO') {
//        console.debug((new Date()).toISOString(), 'DARTad.refreshOmniture');
        if (window.s && window.s !== undefined && window.s.t!==undefined && typeof(window.s.t)==='function') {
            s.t();
        }
        if (window.nbc_s && window.nbc_s !== undefined && window.nbc_s.t!==undefined && typeof(window.nbc_s.t)==='function') {
            nbc_s.t();
        }
        if (window.msn_s && window.msn_s !== undefined && window.msn_s.t!==undefined && typeof(window.msn_s.t)==='function') {
            msn_s.t();
        }
        if (window.smsn && window.smsn !== undefined && window.smsn.t!==undefined && typeof(window.smsn.t)==='function') {
            smsn.t();
        }
        //this runs the divalue code
        if (window.DIVAL && window.DIVAL !== undefined && window.DIVAL.d !== undefined && typeof(window.DIVAL.d)==='function') {
            DIVAL.d();
        }
    }
    // always reset the auto refresh timer
    //this.resetRefreshTimer('AUTOREFRESH');
};
/**
 * Stops an auto refresh timer.
 * @author <a href="mailto:rodolfo.puig@nbcuni.com">Rodolfo Puig</a>
 * @param {String} id Timer identifier
 */
dartAds.prototype.stopRefreshTimer = function(id) {
    var timerId = id || 'DEFAULT';
    // only stop a timer if it exists
    if (typeof this.timers[timerId] !== 'undefined') {
//        console.debug((new Date()).toISOString(), 'DARTad.stopRefreshTimer', 'id:'+timerId+' action:'+refreshAction+' every:'+refreshInterval);
        $(document).stopTime(timerId);
        delete this.timers[timerId];
    }
};
/**
 * Resets an auto refresh timer.
 * @author <a href="mailto:rodolfo.puig@nbcuni.com">Rodolfo Puig</a>
 * @param {String} id Timer identifier
 */
dartAds.prototype.resetRefreshTimer = function(id) {
    var timerId = id || 'DEFAULT';
    // only reset a timer if it exists
    if (typeof this.timers[timerId] !== 'undefined') {
        $(document).stopTime(timerId);
        var refreshInterval = this.timers[timerId].interval;
        var refreshAction = this.timers[timerId].action;
//        console.debug((new Date()).toISOString(), 'DARTad.resetRefreshTimer', 'id:'+timerId+' action:'+refreshAction+' every:'+refreshInterval);
        $(document).everyTime(refreshInterval, timerId, function(i) {
//            console.debug((new Date()).toISOString(), 'DARTad.loopRefreshTimer', 'id:'+timerId+' action:'+refreshAction+' every:'+refreshInterval);
            DARTad.refreshAds(refreshAction);
        });
    }
};
/**
 * Creates an auto refresh timer.
 * @author <a href="mailto:rodolfo.puig@nbcuni.com">Rodolfo Puig</a>
 * @param {String} id       Timer identifier
 * @param {Number} seconds  Timer seconds interval [optional]
 * @param {String} action   Timer refresh action [optional]
 */
dartAds.prototype.startRefreshTimer = function(id, seconds, action) {
    var timerId = id || 'DEFAULT';
    // remove existing timer
    if (typeof this.timers[timerId] !== 'undefined') {
        this.stopRefreshTimer(timerId);
    }

    var defaultInterval = seconds || 60; // every 60 seconds by default
    var refreshInterval = defaultInterval * 1000; // turn value into milliseconds
    var refreshAction = action;
    this.timers[timerId] = {
        "interval": refreshInterval,
        "action": refreshAction
    };
//    console.debug((new Date()).toISOString(), 'DARTad.startRefreshTimer', 'id:'+timerId+' action:'+refreshAction+' every:'+refreshInterval);
    $(document).everyTime(refreshInterval, timerId, function(i) {
//        console.debug((new Date()).toISOString(), 'DARTad.loopRefreshTimer', 'id:'+timerId+' action:'+refreshAction+' every:'+refreshInterval);
        DARTad.refreshAds(refreshAction);
    });
};
// Instantiate the dartAds object
var DARTad = new dartAds(AD_CODES);

// This appends the divalue pixel on every ad refresh
function diValue(params) {
    //http://c.msn.com/c.gif?di=2585&pi=70709&ps=97089&tp=&rf=
    //http://udc.msn.com/c.gif?js=0&evt=impr&di=0&pi=0&ps=0&mk=en-us    
    this.url=params.cURL+"js=0&evt=impr&di="+params.di+"&pi="+params.pi+"&ps="+params.ps+"&mk=es";
}
// @TODO: add description
diValue.prototype.get_url = function() {
    if (this.url.match(/\?/)) {
        return this.url+'&rand='+DARTad.randDartNumber;
    } else {
        return this.url+'?rand='+DARTad.randDartNumber;
    }
};
// @TODO: add description
diValue.prototype.get_image = function() {
    return '<img class="ctag" width="1" height="1" alt="" src="'+this.get_url()+'" />';
};
// @TODO: add description
diValue.prototype.d = function() {
    //$('body').append(this.get_image());  
};
// @TODO: add description
diValue.prototype.dw = function() {
    //document.write(this.get_image());
};

// Temporary for daily makeover
function dailyMakeOverRefreshAds(ord,section){
    var ad_codes={};
    ad_codes.click = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_1click","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"1click","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};
    ad_codes.cosmet = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_cosmet","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"cosmet","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};
    ad_codes.access = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_access","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"access","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};
    ad_codes.milook = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_milook","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"milook","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};
    ad_codes.hair = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_hair","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"hair","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};    
    ad_codes.main = {"ad_base":"http:\/\/ad.doubleclick.net\/adj\/","iframe_url":"\/static\/iframe.php","di_url":"http:\/\/c.msn.com\/c.gif?di=16525&pi=70709&ps=97089&tp=&rf=","params":{"dart_site":"nbcu.telemundo","ad_tag_page_name":"mujer_tulook_main","site":"telemundo","sect":"mujer","sub":"tulook","sub2":"main","category_excludes":"!c=makeover;!c=telemundo;!c=noexpand","pageid":"1469030099"},"sizes":{"728x90":{"category_excludes":";!c=noopapd","dcopt":"dcopt=ist","position":"pos=1","tile":"tile=1","size":"sz=728x90"},"120x90":{"position":"pos=2","tile":"tile=2","size":"sz=120x90"},"120x30":{"position":"pos=3","tile":"tile=3","size":"sz=120x30"},"300x250":{"position":"pos=4","tile":"tile=4","size":"sz=300x250"},"300x125":{"position":"pos=5","tile":"tile=5","size":"sz=300x125"}}};
    if (ad_codes[section]!==undefined) {
        AD_CODES = ad_codes[section];
     } else{
        AD_CODES = ad_codes.hair;
    }
    DARTad.reconstruct(AD_CODES);
    DARTad.refreshAds(ord);
    COMSCORE.beacon({
        "c1":  2,
        "c2":  1000004,
        "c3":  "",
        "c4":  "",
        "c5":  "",
        "c6":  "",
        "c15": ""
    });
}
