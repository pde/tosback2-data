var inventory = '';
var networkid = '7103'; //change this for production network
var siteid = '';
var originalPath = window.location.toString().toLowerCase();
var alteredPath = getAlteredPath();
var correlator = Math.floor(Math.random() * 999999999999);

//aws call
document.write('<scr' + 'ipt src="http://aws.usatoday.com/m?jsoncallback=setBannerData&p=' + alteredPath + '&networkid=' + networkid + '"></scr' + 'ipt>');


//aws callback
function setBannerData(AWSCallData) { 
    inventory = ((AWSCallData.inventory[2] == "") ? '' : AWSCallData.inventory[2]) + ((AWSCallData.inventory[3] == "") ? '' : ',' + AWSCallData.inventory[3]) + ((AWSCallData.inventory[4] == "") ? '' : ',' + AWSCallData.inventory[4]);
    networkid = AWSCallData.dfp.networkid != '' ? AWSCallData.dfp.networkid : '7103'; //change this for production network
    siteid = AWSCallData.inventory[0] != '' ? AWSCallData.inventory[0] : 'usatoday';
//    if (inventory == "") {
//        var dirs = (self.mjx_req || self.location.pathname).replace(/[?&].*/, '').replace(/.*:\/\//, '').split('/');
//        dirs.pop();
//        if (4 > dirs.length) dirs.length = 4;
//        dirs[0] = '';
//        inventory = dirs.join().replace(',,', ',').replace(/^,+/, '').replace(/,$/, '');
//        inventory = 'news';
//    }   
}

function OAS_AD(ad_position_name) {
    //parameters
    var c, callback, cookie_enabled, corelator, cust_params, enc_prev_ius, gdfp_req, impl, iu_parts, json_a, output, pagetype;

    ad_position_name = ad_position_name.toLowerCase();
    pagetype = 'article';  

    callback='handleDFPCall'
    cookie_enabled='1'

    var rsi_segs = '';
    if (document.cookie.match(/\brsi_segs=([^;]*)/)) {
        rsi_segs = RegExp.$1;
    }

    cust_params =
    'title=' + document.title + '&sitepage=' + alteredPath + '&pagetype=' + pagetype + '&pos=' + ad_position_name + '&kw=' + document.title + (rsi_segs != '' ? '&segments=' + rsi_segs : '');

    gdfp_req = '1';
    impl = 'ss';
    iu_parts = networkid + ',' + siteid + ',' + ad_position_name + ((inventory == '') ? '' : ',' + inventory);

    enc_prev_ius = ['', 0, 1, 2, 3, 4, 5].slice(0, 1 + iu_parts.split(',').length).join('/'); ;  

    json_a = '1';
    output = 'json_html';

    var prev_iu_szs = {
        bottom728x90:               '728x90'
        ,fixedpanel:	            '336x700'
        ,headline:	                '300x64'
        ,hfheadline:               '300x64'
        ,hflaunchpad:              '980x66|1900x1200|1x1'
         //,HFLaunchPad:            '980x66'
        ,hfposter:	                '300x250'
        ,hfspon :                   '88x31'
        ,hfstrip:	                '1x1'
        ,interstitial:	            '1x1'
        ,launchpad:                '940x30|100x100|970x66|1400x900|970x30|980x66|1900x1200|970x30'
        ,pagecount:	                '1x1'
        ,poster3:                  '160x600|300x250|300x600|468x648'
        //,Poster3:                 '300x250'
        ,poster5:	                '300x250'
        ,posterblog:            	'300x250'
        ,preroll:	                '1x1'
        ,sfposter:	                '300x250'
        ,special1:	                '1x1'
        ,spon1:	                    '88x31'
        ,top728x90:             	'728x90'
        ,upper90:	                '1x1'
        ,video_banner_300:      	'300x250'
        ,zaplet1:               	'1x1, 88x31'
}

    prev_iu_szs[ad_position_name]=(prev_iu_szs[ad_position_name]!= undefined?prev_iu_szs[ad_position_name]:'1x1');

    var lnk = ' src="http://pubads.g.doubleclick.net/gampad/ads?gdfp_req=' + gdfp_req + '&impl=' + impl + '&json_a=' + json_a + '&correlator=' + correlator + '&iu_parts=' + iu_parts + '&enc_prev_ius=' + enc_prev_ius + '&prev_iu_szs=' + prev_iu_szs[ad_position_name] + '&cookie_enabled=' + cookie_enabled + '&output=' + output + '&callback=' + callback + '&cust_params=' + cust_params + '"';
    document.write('<scr' + 'ipt'  + lnk+ '></scr' + 'ipt>');
}

function handleDFPCall(DFPCallData) {
    DFPCallData = DFPCallData.shift() || {}
    var html = "", slot
    for (var slotName in DFPCallData) {
        slot = DFPCallData[slotName]
        html = DFPCallData[slotName]._html_ || ""
        break
    }
    if (!DFPCallData[slotName]._empty_)
        //document.write(html);
        document.write(html.replace('style="background:transparent"', '').replace('style="background: none transparent scroll repeat 0% 0%;"', ''));
//    else
//        if (document.getElementsByTagName('div').length > 0)
//            document.getElementsByTagName('div')[document.getElementsByTagName('div').length - 1].style.display = 'none';
//        else
//            document.write('[[No ad returned from server]]');
}

//get path
function getAlteredPath() {
    var host = window.location.host.toLowerCase();
    var path = originalPath;

    if (window.mjx_req && (window.mjx_req != '')) {
        if (window.mjx_req.charAt(window.mjx_req.lastIndex) == '/') {
            path = mjx_req.substring(0, window.mjx_req.lastIndexOf('/'));
        }
        else {
            host = path = mjx_req;
        }
    }
    else {
        if (!(host == "usatoday.com" || host == "www.usatoday.com" || host == "asp.usatoday.com" || host == "content.usatoday.com")) {
            path = host;
        }
    }
    return (path.indexOf('http') > -1 ? path.substring(path.indexOf('://') + 3) : path)
}