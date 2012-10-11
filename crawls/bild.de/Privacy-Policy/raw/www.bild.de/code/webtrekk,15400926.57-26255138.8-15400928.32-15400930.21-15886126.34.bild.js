
/*de.bild.linktracking:26255138.8*/

var de = de || {};
de.bild = de.bild || {};
de.bild.linktacker = (function($) {
 
    var layoutMap = {
        "a-1":["S#-AT1"],
        "ab-1":["A","B#-T1"],
        "ab-2":["A","B#-T1"],
        "ab-3":["A","B#-T1"],
        "ab-4":["A","B#-T1"],
        "abc-1":["A","B#-T1","C#-T1"],
        "abc-2":["A","B#-T1","C#-T1"],
        "tll17559492":["C1R1","C2R12","C1R2","C1R3","C2R3"],
        "tll17563602":["C1R123","C2R1","C3R1","C2R2","C3R2","C2R3","C3R3"],//Videocenter
        "tll17561902":["C1R1","C1R2","C1R3"],
        "tll17562932":["C1R1","C1R2"],
        "tll17563494":["C1R1","C1R2","C2R12"],
        "tll17548100":["C1R1","C2R1","C1R2","C2R2","C1R3","C2R3"],
        "tll17528606":["C12R1","C1R23","C2R2","C2R3"],
        "tll17528586":["C1R1","C2R1","C1R2","C2R2","C1R3","C2R3"],
        "tll17528566":["C1R1","C2R12","C1R2","C1R3","C2R34","C1R4"],
        "tll17528226":["C123R1","C4R12","C1R23","C2R23","C3R23","C4R3"],
        "tll25810000":["C1R1","C2R12","C1R2","C1R3","C2R3"],
        "tll25820018":["C123R1","C4R2","C1R23","C2R23","C3R23","C4R2","C4R3"],
        "tll25667830":["C1R1"],
        "tll25700786":["C1R123","C2R1","C3R1","C2R2","C3R2","C2R3","C3R3"],
        "tll25775548":["C1R1","C2R1","C3R1","C4R1"],
        "tll25835820":["C123R1","C1R2","C2R2","C3R2"],
        "tll25835902":["C1R1","C1R2"],
        "tll25820960":["C1R1","C2R12","C1R2"], //Ratgeber
        "tll26424994":["C1R1","C2R1","C1R2","C1R3","C2R2","C2R3"],  //Regional,
        "tll26455238":["C1R1","C2R12","C1R2","C1R3","C2R3"]//Bild Kämpft
         
    }
 
    function init(){
 
        $('#innerWrapper a,#innerWrapper area').on('click',function(e){
            e.preventDefault();
            getPath($(this));
            return false;
        })
    }
 
    function getPath($elem){
 
        //Timer
        var startTimer = new Date().getTime();
        var isLead = false;
        var isTeaser = false;
        var isVidCenter = false;
        var isNewsticker = false;
        var isImageMap = false;
        var isNav =false;
        var isFooter = false;
        var isSlideshow = false;
 
        //Webtreck Variablen
        var ct =   "";
        var ck5 =  "";
        var ck6=   "";
        var ck7 =  "";
        var ck12 =  "";
 
 
 
        var root = $('#innerWrapper');
 
        var href = $elem.attr('href');
        var docLoc = window.location.host;
        
        var ressort = getRessort(href);
 
        //Block egal für welches element
        var $block = $elem.parents('section');
        var allBlocks = root.find('section');
        var block = allBlocks.index($block);
 
        //Spalte
        var spalte = $elem.parents('.content');
        var spalten = spalte.parent().find('.content');
        spalte = spalten.index(spalte);
 
        
 
 
        if($elem.parents('.lead').length>0){
            isLead = true;
        }
        //Check auf VideoCenter
        if($elem.parents('.mediacenter').length>0){
            isVidCenter = true;
        }
        else if($elem.parents('.nticker').length>0){
            isNewsticker=true;
        }
        else if($elem.get(0).nodeName.toUpperCase()=="AREA"){
            isImageMap = true;
        }
        else if($elem.parents('nav').length>0){
          isNav = true;
        }
        else if($elem.parents('footer').length>0){
         isFooter =true;
        }
        else if($elem.parents('.slideshow').length>0){
         isSlideshow = true;
        }
        else{
            isTeaser=true;
        }
 
        //Teaser
        var pos =0;
        var layout = 0;
 
        //layout unbd Pos des Aufmachers
        if(isLead &&!isNewsticker){
            pos = $elem.parents('li.[class*=pos]');
            pos = pos.length>0?pos:$elem.parents('li');
            var allPos = pos.parent().find('[class*=pos]');
            allPos = allPos.length>0?allPos:$elem.parents('li');           
            pos = allPos.index(pos);
            layout = $elem.parents('.lead').attr('class');
            try{
             layout = layout.match(/[a-d]{1,4}[-]\d{1,2}/)[0];
             layout = (layoutMap[layout][pos]);
            }
            catch(e){
             layout = 'notDefinedLead';
            }
            
 
            //SUPER A
            if(layout.indexOf('S#-AT')!=-1){
                var ressort=getRessort(href);
                ck5 = block==0?layout.replace('#',''):layout.replace('#',block+1);
                ck6=   href;
                ck7 =  "www.bild.de";
                ct =   ck5+"/"+ressort+"/"+ck6;
                ck12 = block>0?layout.replace('#','2'):layout.replace('#','1');
            }
            //check A Rotation
            else if($elem.parents('.rotate').length>0 && layout.indexOf('A')!=-1){
                var lianc = $elem.parents('ul,ol').first().find('li');
                var ateaser = lianc.index($elem.parents('li').first());
                var atText = $elem.parents('.rotate').find('ul li a').eq(ateaser).text();
                ck5 = block==0? "AR"+ateaser : (block+1)+"AR"+ateaser;
                ck6=   href;
                ck7 =  "www.bild.de";
                ct =   ck5+"/"+atText+"/"+ck6;
                ck12 = block>0?"AT_2":"AT_1";
            }
            //Rotation auf B
            else if($elem.parents('.rotate').length>0 && layout.indexOf('B')!=-1){
                var lianc = $elem.parents('ul,ol').first().find('li');
                var bteaser = lianc.index($elem.parents('li').first());
                var btText = $elem.parents('.rotate').find('ul li a').eq(bteaser).text();
                ck5 = block==0? "BR"+ateaser : (block+1)+"BR"+ateaser;
                ck6=   href;
                ck7 =  "www.bild.de";
                ct =   ck5+"/"+btText+"/"+ck6;
                ck12 = block>0?"BT_2":"BT_1";
            }
            //normaler B-Teaser
            else if(layout.indexOf('B')!=-1){
                var ressort=getRessort(href);
                ck5 = block==0?layout.replace('#',''):layout.replace('#',block+1);
                ck6=   href;
                ck7 =  "www.bild.de";
                ct =   ck5+"/"+ressort+"/"+ck6;
                ck12 = block>0?layout.replace('#','2'):layout.replace('#','1');
            }
            //C Teaser
            else{
                var ressort=getRessort(href);
                ck5 = block==0?layout.replace('#',''):layout.replace('#',block+1);
                ck6=   href;
                ck7 =  "www.bild.de";
                ct =   ck5+"/"+ressort+"/"+ck6;
                ck12 = block>0?layout.replace('#','2'):layout.replace('#','1');
            }
 
        }
        //layout unbd Pos des Teaser//Videoblocksblocks
        else if(isTeaser || isVidCenter){
            //Vidcenter berechnet die Position anders ansonsten ist Benamung identisch
            if(isTeaser){
                pos = $elem.parents('div[class*=pos]').eq(0);
                var allPos = pos.parents('.module:eq(0)').children('div[class*=pos]');
                pos = allPos.index(pos);
            }
            else{
                pos = $elem.parents('figure').length!=0?0:$elem.parents('li').first().index()+1;
            }
 
    //ein Modul, dass noch nicht getrackt wird.
    if(pos<0)return false;
    
            layout = $elem.parents('.module').attr('class');
            
           try{
             re =/tll\d+/;
             layout = layout.match(re)[0];
             layout = (layoutMap[layout][pos]);
            }
            catch(e){
             layout = 'notDefinedTeaserBlock';
            }
            
            //Header finden
            var header = trim($block.find('header h2').text()).substring(0,3);
            var ressort = getRessort(href);
 
            ck5 =header+"/"+layout+"/"+ressort ;
            ck6=   href;
            ck7 =  "www.bild.de";
            ck12 = header+"_"+block;
            ct =   header+"/"+header+"_"+block+"/"+layout+"/"+ressort+"/"+ck6;
 
        }
        else if(isNewsticker){
            var nt = $elem.parent('li').index()+1;
            var superA = isLead && block!=0 ? 2:1;
            ct =   "";
            ck5 =  "NT"+nt;
            ck6=  href;
            ck7 =  "www.bild.de";
            ck12 =  "NT"+superA+"-T"+nt;
        }
        else if(isImageMap){
            var imId = $elem.parents('map').attr('id');
            var imTeaser = $elem.index();
            
            ck5 =  imId+'/'+imTeaser+'/'+ressort;
            ck6=  href;
            ck7 =  docLoc;
            ck12 =  imId+'/'+imId;
            ct =   imId+'/'+imTeaser+'/'+ressort+'/'+href;            
                                   
            
        }
        else if(isNav){
            ct =   'NAVI'+href;
            ck5 =  'NAVI';
        }
        else if(isFooter){
             ct =   'Footer'+href; 
             ck5 =  'Footer';
        }
        else if(isSlideshow){
         ct =  'DTBB'+href; 
         ck5 = 'DTBB'; 
        }
 
 
 
 
        var time =new Date().getTime() - startTimer; 
 
 
   tagElem($elem,ct,ck5,ck6,ck7,ck12);
 
     /*   showBox("ct: "+ct+"<br>"+
            "ck5: "+ck5+"<br>"+
            "ck6: "+ck6+"<br>"+
            "ck7: "+ck7+"<br>"+
            "ck12: "+ck12+ " "+"<br>"+
            "Zeit:" +time);
        return false; */
    }
 
    /**
     *
     * @param href href des zu bearbeitenden Links
     * @return {String}  Ressort in dem der Artikel verbaut ist
     */
    function getRessort(href){
       var ressort ='';
        var ar = href.split('/');
       //check, ob Link überhaupt bei Bild.de bleibt und Kein Ajax-Call ist. Kein #, keine Url auf andere Seite wie Stylebook etc.
       if(href.indexOf('http://bild.de')!=-1 || href.indexOf('www.bild.de')!=-1){
 
           var t1 =  $.inArray('www.bild.de',ar);
           var t2 = $.inArray('bild.de',ar);
           var index = t1!=-1?t1:t2=!-1?t2:-1;
           ressort = $.inArray('servlet',ar)==-1?ar[index+1]:ar[index+2];
 
       }
       else if(href.charAt(0)=='/'){
           ressort = $.inArray('servlet',ar)==-1?ar[1]:ar[2];
       }
       else if(href=='#'){
            return 'ajax-call';
        }
       return ressort !=undefined?ressort:'';
    }
 
 
  function tagElem($elem,ct,ck5,ck6,ck7,ck12){
   $elem.attr('data-ct',ct).attr('data-ck5',ck5).attr('data-ck6',ck6).attr('data-ck7',ck7).attr('data-ck12',ck12);
  };
 
    function showBox(text){
        var box = "<div id='infoBox' style='position:fixed;bottom:0px;right:0px;width:300px;height:180px;background:white;border:1px solid black'>";
        if($('#infoBox').length==0){
            $('body').append(box); 
        }
        $('#infoBox').html(text);
 
    }
 
    function trim(str){
        return str.replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1');
    }
 
    return {
 
        init:function(){
            init();
        },
        
        setPath:function(elem){
         getPath($(elem));
        }
 
    }
 
}(jQuery));
/*
jQuery(document).ready(function(){
  //de.bild.linktacker.init()
})
*/ 
/*wtsendtimeparams:15400928.32*/

/*wt_send_timeparams:8295454.7 V3.1 */
function wt3_start_quicksend(params){
 var old_activation = wt.deactivatePixel;
 wt.deactivatePixel = false;
 wt.quicksend('', params, 'ce.pl');
 wt.deactivatePixel = old_activation;
};
function wt3_send_timeparams(params, dest){
 if (!wt.version){
 return true;
 }
 var allParas=params.split(';');
 params='';
 for (var i in allParas){
 if (typeof(allParas[i]) != 'string'){
 continue;
 }
 if(allParas[i].indexOf('=') != -1){
 var paras=allParas[i].split('=');
 params+='&'+paras[0]+'='+wt.wtEscape(paras[1]);
 } else {
 params+=';'+allParas[i];
 }
 }
 params+='&z='+new Date().getTime();
 if (dest == 1){
 wt.registerEvent(window, (wt.isIE && wt.wtTypeof(window.onbeforeunload)) ? "beforeunload" : "unload", function(){wt3_start_quicksend(params)});
 } else {
 wt3_start_quicksend(params);
 }
};
function wt_send_timeparams(params, dest){
 wt3_send_timeparams(params, dest);
};
/*webtrekkmedia:15400930.21*/

/*webtrekkmedia:15400930.15-2 V3.1*/
if(typeof(webtrekkMediaTracking)=="undefined"){var webtrekkMediaTracking=new Object();};function wt_init_media(trackDomain,trackId,sampling){webtrekkMediaTracking.mediaStVersion=316;webtrekkMediaTracking.trackDomain=trackDomain;webtrekkMediaTracking.trackId=trackId;webtrekkMediaTracking.pixelSampling=(sampling)?sampling:0;webtrekkMediaTracking.deactivatePixel=false;webtrekkMediaTracking.posInterval=new Object();webtrekkMediaTracking.time=new Object();if(Math&&Math.random&&parseInt(Math.random()*parseInt(webtrekkMediaTracking.pixelSampling))!=0){webtrekkMediaTracking.deactivatePixel=true;}};function wt_sendinfo_media(wt_mi,mk,mt1,mt2,mg,bw,vol,mute){var wt_mg="";var params="";var wt_re=(typeof(wt_mediaInterval)!="undefined")?parseInt(wt_mediaInterval):3*2*5*2;var send=false;params+="&bw="+((bw)?bw:"");params+="&vol="+((vol)?vol:"");params+="&mut="+((mute)?mute:"");if(mg){mg=mg.split(";");for(var z=0;z<mg.length;z++){var tmp=mg[z].split("=");if(mk!="init"&&tmp[0].indexOf("mg")!=-1){continue;}else{wt_mg+="&"+tmp[0]+"="+wt_stEscape(tmp[1]);}}};if(mk=="init"){webtrekkMediaTracking.posInterval[wt_mi]="";webtrekkMediaTracking.time[wt_mi]="";};if(typeof(webtrekkMediaTracking.trackId)=="undefined"&&typeof(webtrekk)=="object"){wt_init_media(webtrekk.trackDomain,webtrekk.trackId);}else if(typeof(webtrekkMediaTracking.trackId)=="undefined"&&typeof(webtrekk)=="undefined"){return;};if(webtrekkMediaTracking.trackId&&typeof(webtrekkMediaTracking.instance)=="undefined"){webtrekkMediaTracking.instance=wt_getPixelInstance();webtrekkMediaTracking.eid=wt_getEid(webtrekkMediaTracking.trackId.split(","),webtrekkMediaTracking.instance.split(";"));webtrekkMediaTracking.pixelDeactivate=wt_getSampling(webtrekkMediaTracking.trackId.split(","),webtrekkMediaTracking.instance.split(";"));};if(typeof(mt2)!="undefined"&&mt2!=""&&mt2&&(typeof(webtrekkMediaTracking.posInterval[wt_mi])=="undefined"||webtrekkMediaTracking.posInterval[wt_mi]=="")){webtrekkMediaTracking.posInterval[wt_mi]=((parseInt(mt2)/wt_re)>=10)?(parseInt(mt2)/wt_re*1000):10*1000;}else if((typeof(mt2)=="undefined"||mt2=="")&&(typeof(webtrekkMediaTracking.posInterval[wt_mi])=="undefined"||webtrekkMediaTracking.posInterval[wt_mi]=="")){webtrekkMediaTracking.posInterval[wt_mi]=3*2*5*2*1000;};var trackId=webtrekkMediaTracking.trackId.split(",");for(var i=0;i<trackId.length;i++){var tempParams=params;if(mk=="pos"&&!send){if(webtrekkMediaTracking.time[wt_mi]==""){webtrekkMediaTracking.time[wt_mi]=new Date().getTime();send=true;}else{var tempTime=new Date().getTime();if(tempTime-webtrekkMediaTracking.time[wt_mi]<webtrekkMediaTracking.posInterval[wt_mi]){return;}else{webtrekkMediaTracking.time[wt_mi]=tempTime;send=true;}}};if(typeof(webtrekkMediaTracking.eid[i])!="undefined"&&webtrekkMediaTracking.eid[i]!=""){tempParams+="&eid="+webtrekkMediaTracking.eid[i];};if(typeof(webtrekkMediaTracking.pixelDeactivate[i])!="undefined"&&webtrekkMediaTracking.pixelDeactivate[i]=="true"){continue;};wt_stQuicksend(trackId[i],"st&mi="+wt_stEscape(wt_mi)+"&mk="+mk+"&mt1="+mt1+"&mt2="+mt2+wt_mg+tempParams);}};function wt_stQuicksend(trackId,params,script){if(!webtrekkMediaTracking.trackDomain||!webtrekkMediaTracking.trackId||(typeof(webtrekkMediaTracking.deactivatePixel)!="undefined"&&webtrekkMediaTracking.deactivatePixel)){return;};if(!script){script="wt.pl";};params+="&x="+new Date().getTime();var wt_url=(location.protocol=="https:"?"https:":"http:")+"//"+webtrekkMediaTracking.trackDomain+"/"+trackId+"/"+script+"?p="+webtrekkMediaTracking.mediaStVersion+","+params;if(document.images){if(typeof(wt_i)=="undefined"){wt_i=new Array();};var ii=wt_i.length;wt_i[ii]=new Image();wt_i[ii].src=wt_url;wt_i[ii].onload=function(){};}else{document.write("<img src=\'"+wt_url+"\' height=\'1\' width=\'1\'>");}};function wt_stEscape(u){if(typeof(encodeURIComponent)=="function"){return encodeURIComponent(u);};return escape(u);};function wt_typeof(v){return(typeof v!="undefined")?1:0;};function wt_getPixelInstance(){var wt_instance="";for(var index in window){if(typeof(window[index])=="object"&&window[index]!=null){try{var contentId=(window[index]["contentId"])?window[index]["contentId"]:false;var trackId=(window[index]["trackId"])?window[index]["trackId"]:false;var trackDomain=(window[index]["trackDomain"])?window[index]["trackDomain"]:false;var domain=(window[index]["domain"])?window[index]["domain"]:false;var version=(window[index]["version"])?window[index]["version"]:(window["wt_version"])?window["wt_version"]:false;if(contentId&&trackId&&trackDomain&&domain&&version){wt_instance+=index+";";}}catch(e){}}};return wt_instance;};function wt_getEid(trackId,instance){var found=false;var wt_eid="";for(var i=0;i<trackId.length;i++){found=false;for(var j=0;j<instance.length-1;j++){var eid=(window[instance[j]]["eid"])?window[instance[j]]["eid"]:(instance[j]=="webtrekk"&&window["wt_cookie_eid"])?window["wt_cookie_eid"]:false;if(eid){var temp=window[instance[j]]["trackId"].split(",");for(var k=0;k<temp.length;k++){if(trackId[i]==temp[k]){wt_eid+=eid+";";found=true;break;}}};if(found){break;}};if(!found){wt_eid+=";";}};return wt_eid.split(";");};function wt_getSampling(trackId,instance){var found=false;var wt_sampling="";for(var i=0;i<trackId.length;i++){found=false;for(var j=0;j<instance.length-1;j++){var deactivatePixel=(window[instance[j]]["deactivatePixel"])?window[instance[j]]["deactivatePixel"]:(instance[j]=="webtrekk"&&window["wt_deactivatePixel"])?window["wt_deactivatePixel"]:false;var temp=window[instance[j]]["trackId"].split(",");for(var k=0;k<temp.length;k++){if(trackId[i]==temp[k]){wt_sampling+=deactivatePixel+";";found=true;break;}};if(found){break;}};if(!found){wt_sampling+=";";}};return wt_sampling.split(";");};
/*webtrekk-video:15886126.34*/

/*webtrekk-video:15886126.19-2 V3.1 */
function videoTrackingEvent(filmName, eventBezeichnung, zeit, prozent, useCookie, searchterm, documentName, durationSec, withAdsString, layout, description, firstPublicationDate, videoKeyword, leereVariable,ivwCode, dontTrack) {
wt_init_media("springer02.webtrekk.net","850416555242498");
if ( (eventBezeichnung === "PLAY" || eventBezeichnung === "playClick") && ((dontTrack === false || dontTrack === 'false' || dontTrack === undefined || dontTrack === 'undefined') && (typeof ivwCode !== 'undefined' && ivwCode !== null))) {
 var _img = "<img name=\"ivwPixelVideo\" src=\"http://bild.ivwbox.de/cgi-bin/ivw/FP/" + ivwCode + "?zeit=" + ~~(Math.random() * 100000000) + "\" width=\"1\" height=\"1\" /><br clear=\"all\" />";
 jQuery('body').append(_img);
}
try {
 var webtrekkAction;
 switch(eventBezeichnung) {
  case 'PLAY': webtrekkAction = "init"; zeit = 0; break;
  case 'START': webtrekkAction = "play"; break;
  case 'PAUSE': webtrekkAction = "pause"; break;
  case 'COMPLETE': webtrekkAction = "eof"; break;
  case 'TIMEUPDATE': webtrekkAction = "pos"; break;
  case 'playClick': webtrekkAction = "init"; zeit = 0; break;
  case 'playStart': webtrekkAction = "play"; break;
  case 'pause': webtrekkAction = "pause"; break;
  case 'playComplete': webtrekkAction = "eof"; break;
  case '""': webtrekkAction = "pos"; break;
  default: break;
 }
 if (webtrekkAction) {
  var url = window.location.pathname;
  if (zeit == '""' || zeit < 0) {
   zeit = 0;
  }
  if (durationSec == '""' || durationSec < 0) {
   durationSec = 0;
  }
 
  var parString = (webtrekkAction === 'init') ? "ck1=" + withAdsString + ";ck2=" + layout + ";ck3=" + url + ";ck4=" + description + ";ck8=" + withAdsString + "/" + videoKeyword + ";ck9=" + firstPublicationDate + ";mg1=" + description : '';
  if (webtrekkAction == "eof") {
   wt_sendinfo_media(documentName, "end", zeit, durationSec, parString, "", "", "");
   wt_sendinfo_media(documentName, "eof", zeit, durationSec, parString, "", "", "");
  }
  else {
   wt_sendinfo_media(documentName, webtrekkAction, zeit, durationSec, parString, "", "", "");
  }
 }
}
catch (e) {
}
} // videoTrackingEvent
/*webtrekk:15400926.57*/

webtrekk.linkTrackAttribute = "data-ck5"; 
/*webtrekkV3.1*/ 
var beforeWebtrekk = function(){};
var afterWebtrekk = function(){};
var beforeUnloadPixel = function(){};
var afterUnloadPixel = function(){};
var webtrekkUnloadObjects=[];var webtrekkLinktrackObjects=[];var webtrekkHeatmapObjects=[];function webtrekkUnload($a){for(i=0;i<webtrekkUnloadObjects.length;i++){if(webtrekkUnloadObjects[i].cookie=="1"&&!webtrekkUnloadObjects[i].optOut&&!webtrekkUnloadObjects[i].deactivatePixel){webtrekkUnloadObjects[i].firstParty();};if(webtrekkUnloadObjects[i].beforeUnloadPixel!=false){webtrekkUnloadObjects[i].beforeUnloadPixel();};var p="";if(webtrekkUnloadObjects[i].config.linkId){p+="&ct="+webtrekkUnloadObjects[i].wtEscape(webtrekkUnloadObjects[i].maxlen(webtrekkUnloadObjects[i].config.linkId,255));if(p){if(webtrekkUnloadObjects[i].linktrackOut){p+="&ctx=1";};var $b=webtrekkUnloadObjects[i].ccParams;if(typeof($b)=='string'&&$b!=''){p+=$b;}}};if(webtrekkUnloadObjects[i].wtEp){if(webtrekkUnloadObjects[i].wtEpEncoded){p+=webtrekkUnloadObjects[i].wtEp;}else{var $c=webtrekkUnloadObjects[i].wtEp;if(typeof($c)=='string'&&$c!=''){$c=$c.split(/;/);for(var z=0;z<$c.length;z++){if(webtrekkUnloadObjects[i].wtTypeof($c[z])){var $d=$c[z].split(/=/);if(webtrekkUnloadObjects[i].checkSC('custom')){$d[1]=webtrekkUnloadObjects[i].decrypt($d[1]);};$d[1]=webtrekkUnloadObjects[i].wtEscape($d[1]);p+='&'+$d[0]+'='+$d[1];}}}}};if(webtrekkUnloadObjects[i].formObject&&$a!="noForm"){var gatherFormsP=webtrekkUnloadObjects[i].gatherForm();if(gatherFormsP){p+="&fn="+(webtrekkUnloadObjects[i].formName?webtrekkUnloadObjects[i].formName:webtrekkUnloadObjects[i].contentId.split(";")[0])+'|'+(webtrekkUnloadObjects[i].formSubmit?"1":"0");p+="&ft="+webtrekkUnloadObjects[i].wtEscape(gatherFormsP);}};if(p!=""||webtrekkUnloadObjects[i].config.sendOnUnload){if(webtrekkUnloadObjects[i].isChrome){webtrekkUnloadObjects[i].quicksend(webtrekkUnloadObjects[i].wtEscape(webtrekkUnloadObjects[i].contentId.split(";")[0])+",1,"+webtrekkUnloadObjects[i].baseparams(),p,false,"saveRequest");}else{webtrekkUnloadObjects[i].quicksend(webtrekkUnloadObjects[i].wtEscape(webtrekkUnloadObjects[i].contentId.split(";")[0])+",1,"+webtrekkUnloadObjects[i].baseparams(),p,false,"sendRequest");};webtrekkUnloadObjects[i].config.linkId="";webtrekkUnloadObjects[i].ccParams="";webtrekkUnloadObjects[i].wtEp="";};if(webtrekkUnloadObjects[i].afterUnloadPixel!=false){webtrekkUnloadObjects[i].afterUnloadPixel();}}};function webtrekkLinktrack(e){for(z=0;z<webtrekkLinktrackObjects.length;z++){if((e.which&&e.which==1)||(e.button&&e.button==1)){var a=document.all?window.event.srcElement:this;for(var i=0;i<4;i++){if(a.tagName&&a.tagName.toLowerCase()!="a"&&a.tagName.toLowerCase()!="area"){a=a.parentElement;}};a.lname=(a.getAttribute('name')?a.getAttribute('name'):"");webtrekkLinktrackObjects[z].getCCParams(a);if(webtrekkLinktrackObjects[z].linkTrackAttribute){var tmp="";eval("tmp = (a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute)?a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute):'')");if(tmp){a.lname=tmp;}};a.lpos=0;if(!webtrekkLinktrackObjects[z].wtLength(a.lpos)&&a.tagName){c=document.links;for(d=0;d<webtrekkLinktrackObjects[z].wtLength(c);d++){if(a==c[d]){a.lpos=d+1;break;}}};if(a.lpos){if(webtrekkLinktrackObjects[z].linkTrack=="link"){var y=a.href.indexOf("//");y=(y>=0?a.href.substr(y+2):a.href);if(webtrekkLinktrackObjects[z].linkTrackPattern){if(!webtrekkLinktrackObjects[z].linkTrackReplace){webtrekkLinktrackObjects[z].linkTrackReplace="";};y=y.replace(webtrekkLinktrackObjects[z].linkTrackPattern,webtrekkLinktrackObjects[z].linkTrackReplace);};webtrekkLinktrackObjects[z].config.linkId=(a.lname?(a.lname+"."):"")+y.split("?")[0].replace(/\//g,".");var p="";if(webtrekkLinktrackObjects[z].linkTrackParams){p=webtrekkLinktrackObjects[z].linkTrackParams.replace(/;/g,",").split(",");};for(var i=0;i<p.length;i++){var v=webtrekkLinktrackObjects[z].urlParam(y,p[i],"");if(v){webtrekkLinktrackObjects[z].config.linkId+="."+p[i]+"."+v;}}}else if(webtrekkLinktrackObjects[z].linkTrack=="standard"&&a.lname){webtrekkLinktrackObjects[z].config.linkId=a.lname;};webtrekkLinktrackObjects[z].isDownloadFile=false;if(webtrekkLinktrackObjects[z].linkTrackDownloads){var $e=a.href.split(".");$e=$e.pop();var $f=webtrekkLinktrackObjects[z].linkTrackDownloads.split(";");for(i=0;i<$f.length;i++){if($f[i]==$e){webtrekkLinktrackObjects[z].isDownloadFile=true;break;}}};if(webtrekkLinktrackObjects[z].config.linkId){if(webtrekkLinktrackObjects[z].domain&&!webtrekkLinktrackObjects[z].isOwnDomain(a.href)){webtrekkLinktrackObjects[z].linktrackOut=true;}};if(webtrekkLinktrackObjects[z].isSafari||webtrekkLinktrackObjects[z].isOpera||webtrekkLinktrackObjects[z].isChrome||webtrekkLinktrackObjects[z].isDownloadFile||(webtrekkLinktrackObjects[z].config.linkId&&a.target!=""&&a.target!="_self")){webtrekkLinktrackObjects[z].sendinfo(webtrekkLinktrackObjects[z].config);}}}}};function webtrekkHeatmapClick(e){var isOpera=(navigator.userAgent.indexOf('Opera')!=-1);var isIE=(!isOpera&&navigator.userAgent.indexOf('MSIE')!=-1);for(z=0;z<webtrekkHeatmapObjects.length;z++){var $g={left:-1,top:-1};if(document.getElementById(webtrekkHeatmapObjects[z].heatmapRefpoint)){var $h=document.getElementById(webtrekkHeatmapObjects[z].heatmapRefpoint);if(webtrekkHeatmapObjects[z].wtTypeof($h.offsetLeft)){while($h){$g.left+=$h.offsetLeft;$g.top+=$h.offsetTop;$h=$h.offsetParent;}}};var $i=0;var $j=0;if(!e){var e=window.event;};if(e.pageX||e.pageY){$i=e.pageX;$j=e.pageY;}else{if(e.clientX||e.clientY){$i=e.clientX;$j=e.clientY;if(isIE){if(document.body.scrollLeft>0||document.body.scrollTop>0){$i+=document.body.scrollLeft;$j+=document.body.scrollTop;}else{if(document.documentElement.scrollLeft>0||document.documentElement.scrollTop>0){$i+=document.documentElement.scrollLeft;$j+=document.documentElement.scrollTop;}}}}};var $k=0;if(isIE){$k=document.body.clientWidth;}else{$k=self.innerWidth-16;};var $l=true;if($i>=$k||!webtrekkHeatmapObjects[z].sentFullPixel){$l=false;};if(($g.top>=0||$g.left>=0)&&$i>$g.left&&$j>$g.top){$i='-'+($i-$g.left);$j='-'+($j-$g.top);};if($l){webtrekkHeatmapObjects[z].quicksend(webtrekkHeatmapObjects[z].wtEscape(webtrekkHeatmapObjects[z].contentId.split(";")[0])+","+$i+","+$j,'',"hm","sendRequest");}}};function webtrekkStartHeatmap(){if(typeof(wt_heatmap)!="undefined"){window.setTimeout("wt_heatmap()",1000);}else{if(typeof($m)=="undefined")$m=0;$m++;if($m<60)window.setTimeout("webtrekkStartHeatmap()",1000);}};function webtrekkStartOverlay(){if(typeof(wt_overlay)!="undefined"){wt_overlay();}else{if(typeof($n)=="undefined")$n=0;$n++;if($n<60)window.setTimeout("webtrekkStartOverlay()",1000);}};function webtrekkFormTrackInstall(){for(i=0;i<webtrekkUnloadObjects.length;i++){webtrekkUnloadObjects[i].findForm();if(!webtrekkUnloadObjects[i].formObject){continue;};for(var j=0;j<webtrekkUnloadObjects[i].formObject.elements.length;j++){var e=webtrekkUnloadObjects[i].formObject.elements[j];webtrekkUnloadObjects[i].formObject.elements[j].formIndex=i;webtrekkUnloadObjects[i].registerEvent(e,"focus",webtrekkFormFocus);};webtrekkUnloadObjects[i].registerEvent(webtrekkUnloadObjects[i].formObject,"submit",webtrekkFormSubmit);}};function webtrekkFormSubmit(e){for(i=0;i<webtrekkUnloadObjects.length;i++){if(!webtrekkUnloadObjects[i].form){continue;};if(e.target==webtrekkUnloadObjects[i].formObject||e.srcElement==webtrekkUnloadObjects[i].formObject){webtrekkUnloadObjects[i].formSubmit=true;}}};function webtrekkFormFocus(e){var a=document.all?window.event.srcElement:e.target;if(!a.name||a.type=="submit"||a.type=="image"){return;};if(webtrekkUnloadObjects[a.formIndex]){var i=a.formIndex;if(webtrekkUnloadObjects[i].formObject){var f=webtrekkUnloadObjects[i].formObject.getAttribute('name')?webtrekkUnloadObjects[i].formObject.getAttribute('name'):webtrekkUnloadObjects[i].contentId.split(";")[0];}else{return;};if(webtrekkUnloadObjects[i].formAttribute){var tmp="";eval("tmp = (webtrekkUnloadObjects["+i+"].formObject.getAttribute(webtrekkUnloadObjects["+i+"].formAttribute) ? webtrekkUnloadObjects["+i+"].formObject.getAttribute(webtrekkUnloadObjects["+i+"].formAttribute):'')");if(tmp){f=tmp;}};webtrekkUnloadObjects[i].formFocus=a.name;}};function webtrekkV3($o){if(!$o){var $o=webtrekkConfig;};this.trackId=($o.trackId)?$o.trackId:(webtrekkConfig.trackId)?webtrekkConfig.trackId:false;this.trackDomain=($o.trackDomain)?$o.trackDomain:(webtrekkConfig.trackDomain)?webtrekkConfig.trackDomain:false;this.domain=($o.domain)?$o.domain:(webtrekkConfig.domain)?webtrekkConfig.domain:false;this.linkTrack=($o.linkTrack)?$o.linkTrack:(webtrekkConfig.linkTrack)?webtrekkConfig.linkTrack:false;this.linkTrackAttribute=($o.linkTrackAttribute)?$o.linkTrackAttribute:(webtrekkConfig.linkTrackAttribute)?webtrekkConfig.linkTrackAttribute:false;this.linkTrackPattern=($o.linkTrackPattern)?$o.linkTrackPattern:(webtrekkConfig.linkTrackPattern)?webtrekkConfig.linkTrackPattern:false;this.linkTrackReplace=($o.linkTrackReplace)?$o.linkTrackReplace:(webtrekkConfig.linkTrackReplace)?webtrekkConfig.linkTrackReplace:false;this.linkTrackDownloads=($o.linkTrackDownloads)?$o.linkTrackDownloads:(webtrekkConfig.linkTrackDownloads)?webtrekkConfig.linkTrackDownloads:false;this.customParameter=($o.customParameter)?$o.customParameter:(webtrekkConfig.customParameter)?webtrekkConfig.customParameter:false;this.customClickParameter=($o.customClickParameter)?$o.customClickParameter:(webtrekkConfig.customClickParameter)?webtrekkConfig.customClickParameter:false;this.customSessionParameter=($o.customSessionParameter)?$o.customSessionParameter:(webtrekkConfig.customSessionParameter)?webtrekkConfig.customSessionParameter:false;this.customTimeParameter=($o.customTimeParameter)?$o.customTimeParameter:(webtrekkConfig.customTimeParameter)?webtrekkConfig.customTimeParameter:false;this.customCampaignParameter=($o.customCampaignParameter)?$o.customCampaignParameter:(webtrekkConfig.customCampaignParameter)?webtrekkConfig.customCampaignParameter:false;this.customEcommerceParameter=($o.customEcommerceParameter)?$o.customEcommerceParameter:(webtrekkConfig.customEcommerceParameter)?webtrekkConfig.customEcommerceParameter:false;this.orderValue=($o.orderValue)?$o.orderValue:(webtrekkConfig.orderValue)?webtrekkConfig.orderValue:false;this.orderCurrency=($o.orderCurrency)?$o.orderCurrency:(webtrekkConfig.orderCurrency)?webtrekkConfig.orderCurrency:false;this.orderId=($o.orderId)?$o.orderId:(webtrekkConfig.orderId)?webtrekkConfig.orderId:false;this.product=($o.product)?$o.product:(webtrekkConfig.product)?webtrekkConfig.product:false;this.productCost=($o.productCost)?$o.productCost:(webtrekkConfig.productCost)?webtrekkConfig.productCost:false;this.productQuantity=($o.productQuantity)?$o.productQuantity:(webtrekkConfig.productQuantity)?webtrekkConfig.productQuantity:false;this.productCategory=($o.productCategory)?$o.productCategory:(webtrekkConfig.productCategory)?webtrekkConfig.productCategory:false;this.productStatus=($o.productStatus)?$o.productStatus:(webtrekkConfig.productStatus)?webtrekkConfig.productStatus:false;this.customerId=($o.customerId)?$o.customerId:(webtrekkConfig.customerId)?webtrekkConfig.customerId:false;this.crmCategory=($o.crmCategory)?$o.crmCategory:(webtrekkConfig.crmCategory)?webtrekkConfig.crmCategory:false;this.contentGroup=($o.contentGroup)?$o.contentGroup:(webtrekkConfig.contentGroup)?webtrekkConfig.contentGroup:false;this.mediaCode=($o.mediaCode)?$o.mediaCode:(webtrekkConfig.mediaCode)?webtrekkConfig.mediaCode:false;this.mediaCodeValue=($o.mediaCodeValue)?$o.mediaCodeValue:(webtrekkConfig.mediaCodeValue)?webtrekkConfig.mediaCodeValue:false;this.mediaCodeCookie=($o.mediaCodeCookie)?$o.mediaCodeCookie:(webtrekkConfig.mediaCodeCookie)?webtrekkConfig.mediaCodeCookie:false;this.campaignId=($o.campaignId)?$o.campaignId:(webtrekkConfig.campaignId)?webtrekkConfig.campaignId:false;this.campaignAction=($o.campaignAction)?$o.campaignAction:(webtrekkConfig.campaignAction)?webtrekkConfig.campaignAction:"click";this.internalSearch=($o.internalSearch)?$o.internalSearch:(webtrekkConfig.internalSearch)?webtrekkConfig.internalSearch:false;this.customSid=($o.customSid)?$o.customSid:(webtrekkConfig.customSid)?webtrekkConfig.customSid:false;this.customEid=($o.customEid)?$o.customEid:(webtrekkConfig.customEid)?webtrekkConfig.customEid:false;this.cookie=($o.cookie)?$o.cookie:(webtrekkConfig.cookie)?webtrekkConfig.cookie:"3";this.cookieEidTimeout=($o.cookieEidTimeout)?$o.cookieEidTimeout:(webtrekkConfig.cookieEidTimeout)?webtrekkConfig.cookieEidTimeout:false;this.cookieSidTimeout=($o.cookieSidTimeout)?$o.cookieSidTimeout:(webtrekkConfig.cookieSidTimeout)?webtrekkConfig.cookieSidTimeout:false;this.forceNewSession=($o.forceNewSession)?$o.forceNewSession:(webtrekkConfig.forceNewSession)?webtrekkConfig.forceNewSession:false;this.xwtip=($o.xwtip)?$o.xwtip:(webtrekkConfig.xwtip)?webtrekkConfig.xwtip:false;this.xwtua=($o.xwtua)?$o.xwtua:(webtrekkConfig.xwtua)?webtrekkConfig.xwtua:false;this.xwtrq=($o.xwtrq)?$o.xwtrq:(webtrekkConfig.xwtrq)?webtrekkConfig.xwtrq:false;this.mediaCodeFrames=($o.mediaCodeFrames)?$o.mediaCodeFrames:(webtrekkConfig.mediaCodeFrames)?webtrekkConfig.mediaCodeFrames:false;this.framesetReferrer=($o.framesetReferrer)?$o.framesetReferrer:(webtrekkConfig.framesetReferrer)?webtrekkConfig.framesetReferrer:false;this.plugins=($o.plugins&&$o.plugins!='')?$o.plugins:(webtrekkConfig.plugins&&webtrekkConfig.plugins!='')?webtrekkConfig.plugins:['Adobe Acrobat','Windows Media Player','Shockwave Flash','RealPlayer','QuickTime','Java','Silverlight'];if(typeof(this.plugins)=="string"){this.plugins=this.plugins.split(";");};this.forceHTTPS=($o.forceHTTPS)?$o.forceHTTPS:(webtrekkConfig.forceHTTPS)?webtrekkConfig.forceHTTPS:false;this.secureConfig=($o.secureConfig)?$o.secureConfig:(webtrekkConfig.secureConfig)?webtrekkConfig.secureConfig:false;this.heatmap=($o.heatmap)?$o.heatmap:(webtrekkConfig.heatmap)?webtrekkConfig.heatmap:false;this.heatmapRefpoint=($o.heatmapRefpoint)?$o.heatmapRefpoint:(webtrekkConfig.heatmapRefpoint)?webtrekkConfig.heatmapRefpoint:"wt_refpoint";this.pixelSampling=($o.pixelSampling)?$o.pixelSampling:(webtrekkConfig.pixelSampling)?webtrekkConfig.pixelSampling:false;this.form=($o.form)?$o.form:(webtrekkConfig.form)?webtrekkConfig.form:false;this.formAttribute=($o.formAttribute)?$o.formAttribute:(webtrekkConfig.formAttribute)?webtrekkConfig.formAttribute:false;this.formFieldAttribute=($o.formFieldAttribute)?$o.formFieldAttribute:(webtrekkConfig.formFieldAttribute)?webtrekkConfig.formFieldAttribute:false;this.formFullContent=($o.formFullContent)?$o.formFullContent:(webtrekkConfig.formFullContent)?webtrekkConfig.formFullContent:false;this.formAnonymous=($o.formAnonymous)?$o.formAnonymous:(webtrekkConfig.formAnonymous)?webtrekkConfig.formAnonymous:false;this.reporturl=($o.reporturl)?$o.reporturl:(webtrekkConfig.reporturl)?webtrekkConfig.reporturl:'report2.webtrekk.de/cgi-bin/wt';this.disableOverlayView=($o.disableOverlayView)?$o.disableOverlayView:(webtrekkConfig.disableOverlayView)?webtrekkConfig.disableOverlayView:false;this.version=315;this.beforeSendinfoPixel=($o.beforeSendinfoPixel)?$o.beforeSendinfoPixel:(webtrekkConfig.beforeSendinfoPixel)?webtrekkConfig.beforeSendinfoPixel:false;;this.afterSendinfoPixel=($o.afterSendinfoPixel)?$o.afterSendinfoPixel:(webtrekkConfig.afterSendinfoPixel)?webtrekkConfig.afterSendinfoPixel:false;;this.beforeUnloadPixel=($o.beforeUnloadPixel)?$o.beforeUnloadPixel:(webtrekkConfig.beforeUnloadPixel)?webtrekkConfig.beforeUnloadPixel:false;;this.afterUnloadPixel=($o.afterUnloadPixel)?$o.afterUnloadPixel:(webtrekkConfig.afterUnloadPixel)?webtrekkConfig.afterUnloadPixel:false;;this.deactivatePixel=false;this.optOut=false;this.eid=false;this.sampleCookieString=false;this.cookieOne=false;this.linkId=false;this.linktrackOut=false;this.linktrackNamedlinksOnly=true;this.ccParams=false;this.sentFullPixel=false;this.sentCampaignIds={};this.wtEp=false;this.wtEpEncoded=false;this.trackingSwitchMediaCode=false;this.trackingSwitchMediaCodeValue=false;this.trackingSwitchMediaCodeTimestamp=false;this.heatmapOn=false;this.overlayOn=false;this.gatherFormsP=false;this.formObject=false;this.formName=false;this.formFocus=false;this.formSubmit=false;this.browserLang=false;this.config=false;this.unloadInstance=webtrekkUnloadObjects.length;this.xlc=false;this.xlct=false;this.xlcv=false;this.plugin={};if(typeof(navigator.language)=="string"){this.browserLang=navigator.language.substring(0,2);}else if(typeof(navigator.userLanguage)=="string"){this.browserLang=navigator.userLanguage.substring(0,2);};this.getConfig=function(){var c={"contentId":this.contentId,"linkId":this.linkId,"sendOnUnload":false,"customParameter":this.customParameter,"customClickParameter":this.customClickParameter,"customSessionParameter":this.customSessionParameter,"customTimeParameter":this.customTimeParameter,"customCampaignParameter":this.customCampaignParameter,"customEcommerceParameter":this.customEcommerceParameter,"orderValue":this.orderValue,"orderCurrency":this.orderCurrency,"orderId":this.orderId,"product":this.product,"productCost":this.productCost,"productQuantity":this.productQuantity,"productCategory":this.productCategory,"productStatus":this.productStatus,"customerId":this.customerId,"crmCategory":this.crmCategory,"contentGroup":this.contentGroup,"campaignId":this.campaignId,"campaignAction":this.campaignAction,"internalSearch":this.internalSearch,"customSid":this.customSid,"customEid":this.customEid,"forceNewSession":this.forceNewSession,"xwtip":this.xwtip,"xwtua":this.xwtua,"xwtrq":this.xwtrq,"framesetReferrer":this.framesetReferrer,"forceHTTPS":this.forceHTTPS,"beforeSendinfoPixel":this.beforeSendinfoPixel,"afterSendinfoPixel":this.afterSendinfoPixel,"beforeUnloadPixel":this.beforeUnloadPixel,"afterUnloadPixel":this.afterUnloadPixel,"xlc":this.xlc,"xlct":this.xlct,"xlcv":this.xlcv};return c;};this.indexOf=function(a,b,c){return a.indexOf(b,c?c:0);};this.wtTypeof=function(v){return(typeof v!="undefined")?1:0;};this.wtLength=function(a){return a!="undefined"?a.length:0;};this.getTimezone=function(){return Math.round((new Date().getTimezoneOffset()/60)*(-1));};this.wtHref=function(){return this.wtLocation().href;};this.wtLocation=function(){var r=document.location;if(!document.layers&&document.getElementById){eval("try {r=top.document.location;}catch(e){r=document.location;};");}else{r=top.document.location;};return r;};this.getWebtrekkPath=function(){if(!document.layers&&document.getElementById){var $p=document.getElementsByTagName('script');for(var i=0;i<$p.length;i++){if($p[i].src.match(/webtrekk[a-z|A-Z|0-9|_]*\.js/g)){return $p[i].src.replace(/webtrekk[a-z|A-Z|0-9|_]*\.js/g,'');}}};return '';};this.include=function(s){if(!document.createElement){return false;};var $q=document.getElementsByTagName('head').item(0);var js=document.createElement('script');js.setAttribute('language','javascript');js.setAttribute('type','text/javascript');js.setAttribute('src',s);$q.appendChild(js);return true;};this.isIE=this.indexOf(navigator.appName,"Microsoft")?false:true;if(!this.isIE){this.isOpera=this.indexOf(navigator.appName,"Opera")?false:true;if(!this.isOpera){this.isSafari=(navigator.vendor.toLowerCase().indexOf("apple")!=-1)?true:false;this.isChrome=(navigator.vendor.toLowerCase().indexOf("google")!=-1)?true:false;}};this.url2contentId=function($r){if(!$r){return "no_content";};var tmp=new RegExp("//(.*)").exec($r);if(tmp.length<1){return "no_content";};var $s=tmp[1].split("?")[0].replace(/\./g,"_").replace(/\//g, ".").replace(/\.{2,};/g,".").toLowerCase();return $s.split(";")[0];};this.contentId=($o.contentId)?$o.contentId:this.url2contentId(document.location.href);this.registerEvent=function($h,e,f){if($h.addEventListener){$h.addEventListener(e,f,false);}else{if($h.attachEvent){if(e=="beforeunload"){this.unregisterEvent($h,e,f);};$h.attachEvent("on"+e,f);}}};this.unregisterEvent=function($h,e,f){if($h.removeEventListener){$h.removeEventListener(e,f,false);}else{if($h.detachEvent){$h.detachEvent("on"+e,f);}}};this.maxlen=function(v,l){if(v&&v.length>l){return v.substring(0,l-1);};return v;};this.wtEscape=function(u){if(typeof(encodeURIComponent)=='function'){return encodeURIComponent(u);};return escape(u);};this.wtUnescape=function(u){if(typeof(decodeURIComponent)=='function'){return decodeURIComponent(u);};return unescape(u);};this.decrypt=function(x){if(x){return eval("try {this.wtUnescape(x.replace(/([0-9a-fA-F][0-9a-fA-F])/g,'%$1'));}catch(e){''};");}};this.checkSC=function(x){if(typeof(this.secureConfig)!='string'){return false;};var sc=this.secureConfig.split(';');for(var i=0;i<sc.length;i++){if(sc[i]==x){return true;}};return false;};this.zeroPad=function(n,$t){var $u="000000000000"+n;return $u.substring(($u.length-$t),$u.length);};this.generateEid=function(){return '2'+this.zeroPad(Math.floor(new Date().getTime()/1000),10)+this.zeroPad(Math.floor(Math.random()*1000000),8);};this.getexpirydate=function($v){var $w;var $x=new Date();var $y=Date.parse($x);$x.setTime($y+$v*60*1000);$w=$x.toUTCString();return $w;};this.setCookie=function(name,$z,$A){var d=location.hostname;var $B="^[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"$";if(d.search($B)==-1){d=location.hostname.split(".");d=d[d.length-2]+"."+d[d.length-1];};var c;if(d.split('.')[0].length<2&&typeof $A!="undefined"){c=name+"="+escape($z)+";path=/;expires="+this.getexpirydate($A);}else if(d.split('.')[0].length<2){c=name+"="+escape($z)+";path=/";}else if(typeof $A!="undefined"){c=name+"="+escape($z)+";domain="+d+";path=/;expires="+this.getexpirydate($A);}else{c=name+"="+escape($z)+";path=/;domain="+d;};document.cookie=c;};this.getCookie=function($C){var $D=""+document.cookie;var $E=$D.indexOf($C);if($E==-1||$C==""){return "";};var $F=$D.indexOf(';',$E);if($F==-1){$F=$D.length;};return unescape($D.substring($E+$C.length+1,$F));};this.optOut=(this.getCookie("webtrekkOptOut"))?true:false;if(this.optOut){this.deactivatePixel=true;};this.urlParam=function($r,$G,$H){var p=new Array();if($r.indexOf("?")>0){p=$r.substring($r.indexOf("?")+1).replace(/&amp;/g,"&").split("&");};for(var i=0;i<p.length;i++){if(p[i].indexOf($G+"=")==0){return this.wtUnescape(p[i].substring($G.length+1).replace(/\+/g,"%20"));}};return $H;};this.allUrlParam=function($G,$H){if(this.mediaCodeFrames&&this.mediaCodeFrames!=''){var lf=this.mediaCodeFrames.split(";");for(var i=0;i<lf.length;i++){var $I=false;eval("try { lFrame = eval(lf[i]) }catch(e){};");if($I&&$I!=top&&$I.location){var $J=this.urlParam($I.location.href,$G,$H);if($J!=$H){return $J;}}};return $H;}else{var topLocation="";eval("try {topLocation = top.location.href;}catch(e){topLocation=document.location.href;};");return this.urlParam(topLocation,$G,$H);}};this.linkTrackInit=function(){for(i=0;i<webtrekkLinktrackObjects.length;i++){if(this==webtrekkLinktrackObjects[i]){return;}};webtrekkLinktrackObjects.push(this);if(this.linkTrack&&this.linkTrack=="link"){this.linktrackNamedlinksOnly=false;};for(c=0;c<document.links.length;c++){var name=document.links[c].getAttribute('name');if(this.linkTrackAttribute&&this.linkTrackAttribute!=""){var tmp="";eval("tmp = (document.links[c].getAttribute(this.linkTrackAttribute)?document.links[c].getAttribute(this.linkTrackAttribute):'')");if(tmp){name=tmp;}};if(name||!this.linktrackNamedlinksOnly){this.registerEvent(document.links[c],'mousedown',webtrekkLinktrack);}}};if(this.linkTrack){this.linkTrackInit();};this.getCCParams=function(a){var p='';if(this.config.customClickParameter){var $K=(this.config.customClickParameter[a.getAttribute('name')])?this.config.customClickParameter[a.getAttribute('name')]:this.config.customClickParameter[a.id];if(!$K){$K=this.config.customClickParameter;};for(var z in $K){if(!isNaN(z)&&this.wtTypeof($K[z])&&typeof($K[z])=='string'&&$K[z]!=''){if(this.checkSC('custom')){$K[z]=this.decrypt($K[z]);};p+='&ck'+z+'='+this.wtEscape($K[z]);}}};this.ccParams=p;return;};this.plugInArray=function($L,$M){if(typeof($L)!='object'){return false;};for(var i=0;i<$L.length;i++){var $N=new RegExp($L[i].toLowerCase(),'g');if($M.toLowerCase().search($N)!=-1){return $L[i];}};return false;};this.quicksend=function($O,$P,$Q,$R){if(!this.trackDomain||!this.trackId||this.deactivatePixel){return;};if(!$Q){$Q="wt";};if(typeof(this.requestTimeout)=="undefined"){this.requestTimeout=5;};if(this.cookie=="1"){$P="&eid="+this.eid+"&one="+(this.cookieOne?"1":"0")+"&fns="+(this.forceNewSession?"1":"0")+$P;};if(this.cookie!="1"&&(this.wtTypeof(this.cookieEidTimeout)||this.wtTypeof(this.cookieSidTimeout))){if(this.wtTypeof(this.cookieEidTimeout)&&this.cookieEidTimeout!=''){$P="&cet="+this.cookieEidTimeout+$P;};if(this.wtTypeof(this.cookieSidTimeout)&&this.cookieSidTimeout!=''){$P="&cst="+this.cookieSidTimeout+$P;}};if(this.pixelSampling>0){$P+="&ps="+this.pixelSampling;};$P="&tz="+this.getTimezone()+$P;var $S=(location.protocol=="https:"?"https:":"http:");if(this.forceHTTPS){$S="https:";};var $T=$S+"//"+this.trackDomain+"/"+this.trackId+"/"+$Q+"?p="+this.version+","+$O+$P+"&eor=1";if($R=="saveRequest"&&this.cookie=="3"){if(this.getCookie("saveRequestV3")){this.setCookie("saveRequestV3",this.getCookie("saveRequestV3")+"<<>>"+$T,this.requestTimeout);}else{this.setCookie("saveRequestV3",$T,this.requestTimeout);}}else{this.sendPixel($T,$Q);};if($Q!='hm'){this.cookieOne=false;this.sentFullPixel=1;}};this.sendPixel=function($r,$Q){if(document.images){if(!this.wtTypeof($U)){var $U=new Array();};var ii=$U.length;$U[ii]=new Image();if($Q=='hm'){$U[ii].src=$r+"&hm_ts="+new Date().getTime();}else{$U[ii].src=$r;};$U[ii].onload=function(){};}else{document.write("<img src='"+$r+"' height='1' width='1'>");}};this.send=function(p,$V,ep){if($V=="link"){this.config.linkId=p;this.linkTrack="manual";this.wtEp=ep;if(this.isChrome||this.isOpera||this.isSafari){webtrekkUnload('noForm');}else{this.registerEvent(window,(this.isIE&&this.wtTypeof(window.onbeforeunload))?"beforeunload":"unload",webtrekkUnload);};return;};if($V=="click"){this.config.linkId=p;this.wtEp=ep;webtrekkUnload('noForm');return;};var $W=(p)?p:this.config.contentId;if(!$W){$W="no_content";};var $X="";var $Y=this.wtEscape($W)+",1,";$Y+=this.baseparams();var $Z=navigator.plugins.length;var $00="";if($Z>0){var $01=Array();for(var i=0;i<$Z;i++){if(navigator.plugins&&navigator.appName!='Microsoft Internet Explorer'){if(navigator.plugins[i].name=="Shockwave Flash"){$00=navigator.plugins[i].description;}else{$00=navigator.plugins[i].name;};var $02=this.plugInArray(this.plugins,$00);if($02&&!this.plugInArray($01,$02)){$01.push($02);}}};$00=$01.join("|");};if(typeof(ep)=="string"&&ep!=""){ep=ep.split(/;/);for(var z=0;z<ep.length;z++){if(this.wtTypeof(ep[z])){$d=ep[z].split(/=/);if(this.checkSC('custom')){$d[1]=this.decrypt($d[1]);};$d[1]=this.wtEscape($d[1]);$X+='&'+$d[0]+'='+$d[1];}}}else{this.wtEpEncoded=false;var $03='';if(typeof(this.config.customParameter)=='object'){for(var z in this.config.customParameter){if(!isNaN(z)&&this.wtTypeof(this.config.customParameter[z])&&typeof(this.config.customParameter[z])=='string'&&this.config.customParameter[z]!=''){if(this.checkSC('custom')){this.config.customParameter[z]=this.decrypt(this.config.customParameter[z]);};$03+='&cp'+z+'='+this.wtEscape(this.config.customParameter[z]);}}};var $04='';if(typeof(this.config.customSessionParameter)=='object'){for(var z in this.config.customSessionParameter){if(!isNaN(z)&&this.wtTypeof(this.config.customSessionParameter[z])&&typeof(this.config.customSessionParameter[z])=='string'&&this.config.customSessionParameter[z]!=''){if(this.checkSC('custom')){this.config.customSessionParameter[z]=this.decrypt(this.config.customSessionParameter[z]);};$04+='&cs'+z+'='+this.wtEscape(this.config.customSessionParameter[z]);}}};var $05='';if(typeof(this.config.customTimeParameter)=='object'){for(var z in this.config.customTimeParameter){if(!isNaN(z)&&this.wtTypeof(this.config.customTimeParameter[z])&&typeof(this.config.customTimeParameter[z])=='string'&&this.config.customTimeParameter[z]!=''){if(this.checkSC('custom')){this.config.customTimeParameter[z]=this.decrypt(this.config.customTimeParameter[z]);};$05+='&ce'+z+'='+this.wtEscape(this.config.customTimeParameter[z]);}}};var $06='';if(typeof(this.config.customEcommerceParameter)=='object'){for(var z in this.config.customEcommerceParameter){if(!isNaN(z)&&this.wtTypeof(this.config.customEcommerceParameter[z])&&typeof(this.config.customEcommerceParameter[z])=='string'&&this.config.customEcommerceParameter[z]!=''){if(this.checkSC('custom')){this.config.customEcommerceParameter[z]=this.decrypt(this.config.customEcommerceParameter[z]);};$06+='&cb'+z+'='+this.wtEscape(this.config.customEcommerceParameter[z]);}}};if(this.config.orderValue){if(this.checkSC('order')){$X+="&ov="+this.wtEscape(this.decrypt(this.config.orderValue));}else{$X+="&ov="+this.wtEscape(this.config.orderValue);}};if(this.config.orderCurrency){if(this.checkSC('order')){$X+="&cr="+this.wtEscape(this.decrypt(this.config.orderCurrency));}else{$X+="&cr="+this.wtEscape(this.config.orderCurrency);}};if(this.config.orderId){$X+="&oi="+this.wtEscape(this.config.orderId);};if(this.config.product){$X+="&ba="+this.wtEscape(this.config.product);if(this.config.productCost){$X+="&co="+this.wtEscape(this.config.productCost);};if(this.config.productQuantity){$X+="&qn="+this.wtEscape(this.config.productQuantity);};if(typeof(this.config.productCategory)=='object'){for(var z in this.config.productCategory){if(!isNaN(z)&&typeof(this.config.productCategory[z])=='string'&&this.config.productCategory[z]!=''){$X+="&ca"+z+"="+this.wtEscape(this.config.productCategory[z]);}}};if(this.config.productStatus){$X+="&st="+this.wtEscape(this.config.productStatus);}};if(this.config.customerId){$X+="&cd="+this.wtEscape(this.config.customerId);};if(typeof(this.config.crmCategory)=='object'){for(var z in this.config.crmCategory){if(!isNaN(z)&&typeof(this.config.crmCategory[z])=='string'&&this.config.crmCategory[z]!=''){$X+="&vc"+z+"="+this.wtEscape(this.config.crmCategory[z]);}}};if(this.browserLang){$X+="&la="+this.wtEscape(this.browserLang);};if(typeof(this.config.contentGroup)=='object'){for(var z in this.config.contentGroup){if(!isNaN(z)&&typeof(this.config.contentGroup[z])=='string'&&this.config.contentGroup[z]!=''){$X+="&cg"+z+"="+this.wtEscape(this.config.contentGroup[z]);}}};var $07='';if(this.config.campaignId&&!(this.config.campaignId in this.sentCampaignIds)){$X+="&mc="+this.wtEscape(this.config.campaignId);$X+="&mca="+this.config.campaignAction.substring(0,1);this.sentCampaignIds[this.config.campaignId]=true;if(typeof(this.config.customCampaignParameter)=='object'){for(var z in this.config.customCampaignParameter){if(!isNaN(z)&&this.wtTypeof(this.config.customCampaignParameter[z])&&typeof(this.config.customCampaignParameter[z])=='string'&&this.config.customCampaignParameter[z]!=''){if(this.checkSC('custom')){this.config.customCampaignParameter[z]=this.decrypt(this.config.customCampaignParameter[z]);};$07+='&cc'+z+'='+this.wtEscape(this.config.customCampaignParameter[z]);}}}};if(this.trackingSwitchMediaCode){$X+="&tmc="+this.wtEscape(this.trackingSwitchMediaCode);};if(this.trackingSwitchMediaCodeValue){$X+="&tmcv="+this.wtEscape(this.trackingSwitchMediaCodeValue);};if(this.trackingSwitchMediaCodeTimestamp){$X+="&tmct="+this.wtEscape(this.trackingSwitchMediaCodeTimestamp);};var $08="";var $09;if(typeof(wt_vt)!="undefined"){$09=wt_vt;};if(!this.wtTypeof($09)){$09=this.urlParam(location.href,'wt_vt',false);};if($09){var $0a=this.getCookie('wt_vt').split(";");for(var i=0;i<$0a.length;i++){if($0a[i].indexOf($09+'v')!=-1){$08='&wt_vt='+$0a[i].split('t')[0].split('v')[1];}}};if($08){$X+=$08;};if(this.config.internalSearch){$X+="&is="+this.wtEscape(this.maxlen(this.config.internalSearch,255));};if($03){$X+=$03;};if($07){$X+=$07;};if($05){$X+=$05;};if($06){$X+=$06;};if($04){$X+=$04;};if(this.wtTypeof(this.config.customSid)&&this.config.customSid!=''){$X+="&csid="+this.config.customSid;};if(this.wtTypeof(this.config.customEid)&&this.config.customEid!=''){$X+="&ceid="+this.config.customEid;};if(this.wtTypeof(this.config.xwtip)&&this.config.xwtip!=''){$X+="&X-WT-IP="+this.wtEscape(this.config.xwtip);};if(this.wtTypeof(this.config.xwtua)&&this.config.xwtua!=''){$X+="&X-WT-UA="+this.wtEscape(this.config.xwtua);};if(this.wtTypeof(this.config.xwtrq)&&this.config.xwtrq!=''){$X+="&X-WT-RQ="+this.wtEscape(this.config.xwtrq);}};if(this.config.linkId&&this.config.customClickParameter){var $K=(this.config.customClickParameter[this.config.linkId])?this.config.customClickParameter[this.config.linkId]:this.config.customClickParameter;for(var z in $K){if(!isNaN(z)&&this.wtTypeof($K[z])&&typeof($K[z])=='string'&&$K[z]!=''){if(this.checkSC('custom')){$K[z]=this.decrypt($K[z]);};$X+='&ck'+z+'='+this.wtEscape($K[z]);}};this.ccParams=false;};if(this.config.xlc&&this.config.xlct){if(this.config.xlc!=""||this.config.xlct!=""){if(this.config.xlcv){var $0b=this.getExtLifeCycles(this.config.xlc,this.config.xlct,this.config.xlcv);}else{var $0b=this.getExtLifeCycles(this.config.xlc,this.config.xlct);};$X+=$0b;}};if(this.config.linkId&&this.config.sendOnUnload){this.linkTrack="manual";this.wtEp=$X;this.wtEpEncoded=true;if(this.isChrome||this.isOpera||this.isSafari){webtrekkUnload('noForm');}else{this.registerEvent(window,(this.isIE&&this.wtTypeof(window.onbeforeunload))?"beforeunload":"unload",webtrekkUnload);};return;}else if(this.config.linkId){this.wtEp=$X;this.wtEpEncoded=true;webtrekkUnload('noForm');return;}else if(!this.config.contentId&&!this.config.linkId){this.config.contentId=this.contentId;this.config.linkId="wt_ignore";this.wtEp=$X;this.wtEpEncoded=true;webtrekkUnload('noForm');return;}else if(this.config.sendOnUnload){this.wtEp=$X;this.wtEpEncoded=true;if(this.isChrome||this.isOpera||this.isSafari){webtrekkUnload('noForm');}else{this.registerEvent(window,(this.isIE&&this.wtTypeof(window.onbeforeunload))?"beforeunload":"unload",webtrekkUnload);};return;};if(this.cookie=="1"){if(this.cookieOne){$X+="&np="+this.wtEscape($00);}}else{$X+="&np="+this.wtEscape($00);};this.quicksend($Y,$X,false,"sendRequest");};this.sendinfo=function(c,p,$V,ep){if(this.cookie=="1"&&!this.optOut&&!this.deactivatePixel){this.firstParty();};if(location.href.indexOf('fb_xd_fragment')!=-1){return;};if(typeof(c)=='object'){this.config=c;}else{this.config=this.getConfig();};if(!this.config.campaignId&&this.mediaCode){this.getMediaCode();};if(this.getCookie("saveRequestV3")){var $0c=this.getCookie("saveRequestV3").split("<<>>");for(var i=0;i<$0c.length;i++){this.sendPixel($0c[i],"wt");};this.setCookie("saveRequestV3","");};if(this.beforeSendinfoPixel!=false){this.beforeSendinfoPixel();};if(this.contentId!=""||p!=""||document.layers){this.send(p,$V,ep);};if(this.afterSendinfoPixel!=false){this.afterSendinfoPixel();}};this.sendinfo_media=function($0d,mk,$0e,$0f,mg,bw,$0g,$0h){if(this.wtTypeof($0i)){$0i($0d,mk,$0e,$0f,mg,bw,$0g,$0h,this.unloadInstance);}};this.sendExtLifeCycles=function($0j){if(typeof($0j)!="object"){return;};if(typeof($0j.xlc)=="undefined"&&typeof($0j.xlct)=="undefined"){return;};if($0j.xlc!=""||$0j.xlct!=""){if(typeof($0j.xlcv)!="undefined"){var $P=this.getExtLifeCycles($0j.xlc,$0j.xlct,$0j.xlcv);}else{var $P=this.getExtLifeCycles($0j.xlc,$0j.xlct);}}else{return;};this.quicksend('wt_ignore',$P,false,"sendRequest");};this.getExtLifeCycles=function(xlc,xlct,xlcv){var $0k="";var $0l=new Object();var $0m=xlc.split("|");for(var i=0;i<$0m.length;i++){var $0n=$0m[i].split(";");for(var j=0;j<$0n.length;j++){if(j==0){$0k+=this.wtEscape($0n[j]);}else{$0k+=$0n[j];};$0k+=";";};$0k=$0k.substr(0,$0k.length-1);$0k+="|";};$0k=$0k.substr(0,$0k.length-1);$0l.xlcl=this.wtEscape(xlc.split("|").length);$0l.xlct=this.wtEscape(xlct);if(typeof(xlcv)!="undefined"){$0l.xlcv=this.wtEscape(xlcv);};$0l.xlc=this.wtEscape($0k);var $P="";for(i in $0l){$P+="&"+i+"="+$0l[i];};return $P;};this.isOwnDomain=function(l){var pt='';if(this.domain){if(this.domain.toUpperCase().indexOf("REGEXP:")==0){pt=new RegExp(this.domain.substring(7),"i");if(pt.test(this.getDomain(l))){return true;}}else{var $0o=this.domain.split(';');var $0p=this.getDomain(l);for(var i=0;i<$0o.length;i++){if($0p==$0o[i]){return true;}}}}else{return false;};return false;};this.getDomain=function(l){if(typeof(l)!='string'){return '';};l=this.wtUnescape(l);l=l.split('://')[1];var rx=new RegExp('^(?:[^\/]+:\/\/)?([^\/:]+)','g');if(typeof(l)!="undefined"){l=l.match(rx);if(l[0]){return l[0].toLowerCase();}};return '';};this.baseparams=function(){var $0q=screen.width+"x"+screen.height+","+(navigator.appName!='Netscape'?screen.colorDepth:screen.pixelDepth)+",";$0q+=((navigator.cookieEnabled==true)?"1,":((navigator.cookieEnabled==false)?"0,":((document.cookie.indexOf("=")!=-1)?"1,":"0,")));$0q+=new Date().getTime()+",";var $0r=0;if(this.framesetReferrer){$0r=this.wtEscape(this.framesetReferrer);}else{if(document.referrer.length>0){$0r=this.wtEscape(document.referrer);}};if(this.sentFullPixel){$0q+="2";}else if(!this.isOwnDomain($0r)){$0q+=$0r;}else if(this.isOwnDomain($0r)){$0q+="1";}else{$0q+=$0r;};var h=0;if(!document.layers&&document.getElementById){eval("try {h = top.window.innerHeight;}catch(e){};");}else{h=top.window.innerHeight;};if(!h){eval("try {h = top.document.documentElement.clientHeight;}catch(e){};");};if(!h){eval("try {h = top.document.body.clientHeight;}catch(e){};");};var w=0;if(!document.layers&&document.getElementById){eval("try {w = top.window.innerWidth;}catch(e){};");}else{w=top.window.innerWidth;};if(!w){eval("try {w = top.document.documentElement.clientWidth;}catch(e){};");};if(!w){eval("try {w = top.document.body.clientWidth;}catch(e){};");};if(h&&h>screen.height){h=screen.height;};if(w&&w>screen.width){w=screen.width;};if(typeof(w)=='undefined'){w=-1;};if(typeof(h)=='undefined'){h=-1;};$0q+=","+w+"x"+h;$0q+=","+(navigator.javaEnabled()?"1":"0");return $0q;};this.getMediaCode=function(mc){if(!mc){if(!this.mediaCode){return false;};mc=this.mediaCode;};if(this.mediaCodeValue){v=this.mediaCodeValue.split(";");};var m=mc.split(";");this.config.campaignId="";for(var i=0;i<m.length;i++){if(this.config.campaignId!=""){this.config.campaignId+=";";};if(this.mediaCodeCookie){if(this.getCookie('wt_'+m[i].toLowerCase()+this.allUrlParam(m[i],"").toLowerCase())==''){this.config.campaignId+=m[i]+this.wtEscape("="+this.allUrlParam(m[i],""));}else{this.config.campaignId+=m[i]+"=ignore";};var $0s='';if(this.mediaCodeCookie=='eid'){$0s=60*30*24*60;};this.setCookie('wt_'+m[i].toLowerCase()+this.allUrlParam(m[i],"").toLowerCase(),1,$0s);}else{if(typeof(v)!="undefined"&&typeof(v[i])!="undefined"&&v[i]!=""){this.config.campaignId+=m[i]+this.wtEscape("="+v[i]);}else if(this.allUrlParam(m[i],"")!=""){this.config.campaignId+=m[i]+this.wtEscape("="+this.allUrlParam(m[i],""));}}}};this.searchContentIds=function(){var $0t=0;var $0u=0;this.contentIds="";do{$0t++;if(this.urlParam(location.href,"wt_contentId"+$0t,false)){var $0v=this.urlParam(location.href,"wt_contentId"+$0t,false);this.contentIds+="&wt_contentId"+$0t+"="+this.wtEscape($0v);$0u++;}}while($0u>=$0t);};this.heatmapOn=(this.wtHref().indexOf("wt_heatmap=1")>=0);this.overlayOn=(this.wtHref().indexOf("wt_overlay=1")>=0||document.cookie.indexOf("wt_overlay=1")>=0);if(this.wtHref().indexOf("wt_overlay=0")>=0){this.overlayOn=false;this.setCookie("wt_overlay","",-1);};var $0w=false;for(i=0;i<webtrekkHeatmapObjects.length;i++){if(this==webtrekkHeatmapObjects[i]){$0w=true;}};if(!$0w){webtrekkHeatmapObjects.push(this);};if(this.heatmap&&this.heatmap=="1"&&!this.heatmapOn){this.registerEvent(document,"mousedown",webtrekkHeatmapClick);};if(this.heatmapOn&&!this.disableOverlayView){this.searchContentIds();if(this.contentIds){if(this.include(location.protocol+"//"+this.reporturl+"/heatmap.pl?wt_contentId="+this.contentIds+"&x="+new Date().getTime())){if(navigator.userAgent.indexOf('MSIE 6')!=-1&&navigator.userAgent.indexOf('Windows NT 5.0')!=-1){alert("Click OK to start heatmap.");};this.registerEvent(window,"load",webtrekkStartHeatmap);}}else{if(this.include(location.protocol+"//"+this.reporturl+"/heatmap.pl?wt_contentId="+this.wtEscape(this.contentId.split(";")[0])+"&x="+new Date().getTime())){if(navigator.userAgent.indexOf('MSIE 6')!=-1&&navigator.userAgent.indexOf('Windows NT 5.0')!=-1){alert("Click OK to start heatmap.");};this.registerEvent(window,"load",webtrekkStartHeatmap);}}};if(this.overlayOn&&!this.disableOverlayView){this.searchContentIds();this.setCookie("wt_overlay","1");if(this.contentIds){if(this.include(location.protocol+"//"+this.reporturl+"/overlay.pl?wt_contentId="+this.contentIds+"&x="+new Date().getTime())){this.registerEvent(window,"load",webtrekkStartOverlay);}}else{if(this.include(location.protocol+"//"+this.reporturl+"/overlay.pl?wt_contentId="+this.wtEscape(this.contentId.split(";")[0])+"&x="+new Date().getTime())){this.registerEvent(window,"load",webtrekkStartOverlay);}}};this.setPixelSampling=function($0x){if(!$0x){var $0x=this.pixelSampling;};var trackId=this.trackId.split(",")[0];var $0y=this.getCookie("wt3_sample").split(";");var $0z=false;for(var i=0;i<$0y.length;i++){if(this.indexOf($0y[i],trackId+"|"+$0x)!=-1){$0z=true;}else{if(this.indexOf($0y[i],trackId+"|")!=-1){$0y[i]="";}}};if(!$0z){if(Math&&Math.random&&parseInt(Math.random()*$0x)==0){$0y.push(trackId+"|"+$0x+"|1");}else{$0y.push(trackId+"|"+$0x+"|0");};var $0A=6;if(this.cookieEidTimeout){$0A=this.cookieEidTimeout;};this.setCookie("wt3_sample",$0y.join(";"),$0A*30*24*60);$0y=this.getCookie("wt3_sample");}else{$0y=$0y.join(";");};if(this.indexOf($0y,trackId+"|"+$0x+"|1")==-1){this.deactivatePixel=true;}};if(this.pixelSampling&&!this.optOut){this.setPixelSampling();};this.firstParty=function(){var $0B=this.getCookie("wt3_sid").split(";");var $0C=this.getCookie("wt3_eid").split(";");var $0D=(this.cookieSidTimeout)?this.cookieSidTimeout:30;var $0A=(this.cookieEidTimeout)?this.cookieEidTimeout:6;var trackId=this.trackId.split(",")[0];var $0E=false;var $0F=false;for(var i=0;i<$0B.length;i++){if($0B[i].indexOf(trackId)!=-1){$0E=i;break;}};for(var i=0;i<$0C.length;i++){if($0C[i].indexOf(trackId+"|")!=-1){$0F=i;break;}};if(!$0E){$0B.push(trackId);if($0F){this.forceNewSession=true;}};if(!$0F){this.eid=this.generateEid();this.cookieOne=true;$0C.push(trackId+"|"+this.eid);this.setCookie("wt3_eid",$0C.join(";"),$0A*30*24*60);}else{this.eid=$0C[$0F].replace(trackId+"|","");};this.setCookie("wt3_sid",$0B.join(";"));};var $0G=false;for(i=0;i<webtrekkUnloadObjects.length;i++){if(this==webtrekkUnloadObjects[i]){$0G=true;}};if(!$0G){webtrekkUnloadObjects.push(this);this.registerEvent(window,(this.wtTypeof(window.onbeforeunload))?"beforeunload":"unload",webtrekkUnload);};this.findForm=function(){if(!this.form||this.formObject){return;};var f=document.forms;for(var i=0;i<f.length;i++){var cf=f[i];if(this.wtTypeof(cf.elements["wt_form"])){this.formObject=cf;return;}}};this.checkFormFocus=function($0H){if($0H==this.formFocus){return 1;};return 0;};this.getFormFieldValue=function(ff){var p=ff.name;if(this.formFieldAttribute){p='';var tmp=false;eval("tmp = (ff.getAttribute(this.formFieldAttribute) ? ff.getAttribute(this.formFieldAttribute) : '')");if(tmp){p=tmp;};if(p){p=p.replace(/[\.|;]/g,"_");}};return p;};this.gatherForm=function(){var $0I=";";if(!this.formObject){return;};var f=this.formObject;var p=f.getAttribute('name')?f.getAttribute('name'):this.contentId.split(";")[0];if(this.formAttribute){var tmp="";eval("tmp = (f.getAttribute(this.formAttribute) ? f.getAttribute(this.formAttribute) : '')");if(tmp){p=tmp;}};this.formName=p;var fl="";if(this.wtTypeof(f.elements["wt_fields"])){fl=f.elements["wt_fields"].value;};if(!fl){for(var i=0;i<f.elements.length;i++){var e=f.elements[i];if(this.getFormFieldValue(e)){fl+=this.getFormFieldValue(e)+$0I;}};fl=fl.substring(0,fl.lastIndexOf($0I))};var $0J=fl.split($0I);var $0K=$0J.length;var $0L="";if(this.formFullContent){$0L=this.formFullContent.split($0I);};var pa="";var $0M=new Array();for(var i=0;i<f.elements.length;i++){var e=f.elements[i],$z,$0N,$0O=false;if(fl){for(var j=0;j<$0K;j++){if(this.getFormFieldValue(e)==$0J[j]){$0O=true;}}}else{if(this.getFormFieldValue(e)){$0O=true;}};if($0O){$z=null;if(e.type=='select-multiple'){for(var j=0;j<e.options.length;j++){var $0u=false;if(e.options[j].selected){$0u=true;pa+=";"+this.getFormFieldValue(e).replace(/[\.|;]/g,"_")+"."+e.type+"|"+((this.formAnonymous)?"anon":e.options[j].value.replace(/[\.|;]/g,"_"))+"|"+this.checkFormFocus(e.name);};if(!$0u){$z="empty";}}};if(e.type=='select-one'){if(e.selectedIndex!=-1){$z=e.options[e.selectedIndex].value.replace(/[\.|;]/,"_");if(!$z){$z="empty";}}};if(e.type=='checkbox'){if(!e.checked){$z="empty";}else{$z=e.value.replace(/[\.|;]/,"_");}};if(e.type=='radio'){if(e.checked){$z=e.value.replace(/[\.|;]/g,"_");};$0M[$0M.length]=this.getFormFieldValue(e);};if(e.type=="password"||e.type=="text"||e.type=="textarea"){$z=(e.value?"filled_out":"empty");for(var k=0;k<$0L.length;k++){if($0L[k]==this.getFormFieldValue(e)){$z=this.maxlen(e.value,30);}};if(!$z){$z="empty";}};if($z){name=this.getFormFieldValue(e).replace(/[\.|;]/g,"_");$0N=";"+name+"."+e.type+"|";if(pa.indexOf($0N)==-1){pa+=$0N+((this.formAnonymous&&$z!="empty"&&$z!="filled_out")?"anon":$z)+"|"+this.checkFormFocus(e.name);}}}};for(var i=0;i<$0M.length;i++){var n=";"+$0M[i].replace(/[\.|;]/g,"_")+".radio|";if(pa.indexOf(n)==-1){pa+=n+((this.formAnonymous)?"anon":"empty")+"|"+this.checkFormFocus(e.name);}};if(pa){pa=pa.substring(1);};return pa;};this.formTrackInstall=function(f){if(f){this.formObject=(document.forms[f])?document.forms[f]:false;}else{this.formObject=(document.forms[0])?document.forms[0]:false;};if(this.formObject){this.form="1";webtrekkFormTrackInstall();}};if(this.form){webtrekkFormTrackInstall();};this.cookieManager=function(name,$0P,$0Q){var i,j;this.name=name;this.keySeperator="~";this.fieldSeparator="#";this.durationSeperator="|";this.found=false;this.expires=$0P;this.accessPath=$0Q;this.rawValue="";this.fields=[];this.fieldsDuration=[];this.fieldnames=[];this.read=function(){var $0R=this.name+"=";var $0S=document.cookie;this.rawValue=null;this.found=false;if($0S.length>0){$0T=$0S.indexOf($0R);if($0T!=-1){$0T+=$0R.length;end=$0S.indexOf(";",$0T);if(end==-1){end=$0S.length};this.rawValue=$0S.substring($0T,end);this.found=true;}};if(this.rawValue!=null){var sl=this.rawValue.length;var $0U=0;var $0V=0;var i=0;do{$0V=this.rawValue.indexOf(this.fieldSeparator,$0U);if($0V!=-1){var $0W=this.rawValue.substring($0U,$0V).split(this.durationSeperator);var rV=$0W[0].split(this.keySeperator);this.fields[rV[0]]=unescape(rV[1]);this.fieldsDuration[rV[0]]=parseInt(unescape($0W[1]));i++;$0U=$0V+1;}}while($0V!=-1&$0V!=(this.rawValue.length-1));};return this.found;};this.getSize=function(){var $0X=new Date().getTime();var $0Y="";for(i in this.fields){if(this.fieldsDuration[i]>=$0X){$0Y+=escape(i)+this.keySeperator+escape(this.fields[i])+this.durationSeperator+escape(this.fieldsDuration[i])+this.fieldSeparator;}};return $0Y.length;};this.write=function(){var $0X=new Date().getTime();var $0Z=true;var $0Y=this.name+"=";for(i in this.fields){if(this.fieldsDuration[i]>=$0X){$0Y+=escape(i)+this.keySeperator+escape(this.fields[i])+this.durationSeperator+escape(this.fieldsDuration[i])+this.fieldSeparator;$0Z=false;}};var $10=($0Z)?-99999:this.expires;if($10!=""){if(typeof($10)=="number"){var $11=new Date();var $12=new Date();$12.setTime($11.getTime()+1000*60*60*24*$10);$0Y+="; expires="+$12.toGMTString();}else{$0Y+="; expires="+$10.toGMTString();}};if(this.accessPath!=null){$0Y+="; PATH="+this.accessPath;};var d=location.hostname;var $B="^[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"\.[0-9]{1,3"+String.fromCharCode(125)+"$";if(d.search($B)==-1){d=location.hostname.split(".");d=d[d.length-2]+"."+d[d.length-1];};$0Y+="; DOMAIN="+d;document.cookie=$0Y;return null;};this.remove=function(){this.expires=-10;this.write();return this.read();};this.get=function($13){var $0X=new Date().getTime();if(this.fieldsDuration[$13]>=$0X){return this.fields[$13];};return "";};this.set=function($13,$14,$A,$V,$15){if(!$A){$A=31536000;};if(!$V){$V="";};var $0X=new Date().getTime();if($V=="first"&&this.fields[$13]!=""&&this.fields[$13]!=null&&this.fieldsDuration[$13]>=$0X){return this.fields[$13];};this.fields[$13]=$14;this.fieldsDuration[$13]=$0X+(parseInt($A)*1000);if(!$15){this.write();};return $14;};this.prepare=function($13,$14,$A,$V){this.set($13,$14,$A,$V,true);};this.read();};};
/*webtrekkCookieConverter*/
function wt_updatePixel(){var timeEid = (wt.cookieEidTimeout) ? wt.cookieEidTimeout : 6;var timeSid = (wt.cookieSidTimeout) ? wt.cookieSidTimeout : 30;if(wt.getCookie("wt_sample")){wt.deactivatePixel = false;var sampleValues = wt.getCookie("wt_sample").split("|");wt.setCookie("wt_sample", "", -1000);wt.setCookie("wt3_sample", ";"+wt.trackId.split(",")[0]+"|"+sampleValues[1]+"|"+sampleValues[0], timeEid*30*24*60);wt.setPixelSampling();}if(wt.getCookie("wt_eid")){var eidValue = wt.getCookie("wt_eid");wt.setCookie("wt_eid", "", -1000);wt.setCookie("wt3_eid", ";"+wt.trackId.split(",")[0]+"|"+eidValue, timeEid*30*24*60);wt.firstParty();}if(wt.getCookie("wt_sid")){wt.setCookie("wt_sid", "", -1000);wt.setCookie("wt3_sid", ";"+wt.trackId.split(",")[0], timeSid*30*24*60);wt.firstParty();}if(wt.getCookie("wt_l_v")){wt.setCookie("wt_l_v", "", -1000);}};
function wt_linkTrackInit(e){wt.linkTrackInit();};
/*webtrekkCompatibilityMode*/
if(typeof(webtrekk.linkTrack) != "undefined") {
 webtrekk.oldLinkTrack = webtrekk.linkTrack;
 webtrekk.linkTrack = "";
}
function wt_sendinfo(p, mode, ep) {if (wt) {for (i in webtrekk) {if (i != "plugins" && i != "sendinfo") {wt[i] = webtrekk[i];}}wt.sendinfo(false, p, mode, ep);}}
if (typeof(webtrekk) == "object") {
 webtrekkConfig = webtrekk;
 window.wt = new webtrekkV3();
 wt.heatmapRefpoint = "service"; 
 wt.linkTrack = (typeof(webtrekk.oldLinkTrack) != "undefined") ? webtrekk.oldLinkTrack : "";
 wt.registerEvent(window, "load", wt_linkTrackInit);
 if(typeof(beforeWebtrekk) == "function"){wt.beforeSendinfoPixel = beforeWebtrekk;}
 if(typeof(afterWebtrekk) == "function"){wt.afterSendinfoPixel = afterWebtrekk;}
 if(typeof(beforeUnloadPixel) == "function"){wt.beforeUnloadPixel = beforeUnloadPixel;}
 if(typeof(afterUnloadPixel) == "function"){wt.afterUnloadPixel = afterUnloadPixel;}
 if(typeof(wt_updatePixel) == "function"){
 wt_updatePixel();
 }
}
if(typeof(webtrekk.oldLinkTrack) != "undefined") {
 webtrekk.linkTrack = webtrekk.oldLinkTrack;
}
/*webtrekkLinkTrackTeaserposition*/
function webtrekkLinktrack(e){for (z=0; z<webtrekkLinktrackObjects.length; z++){if ((e.which&&e.which==1)||(e.button&&e.button==1)) {var a=document.all?window.event.srcElement:this;for(var i=0;i<4;i++) {if(a.tagName&&a.tagName.toLowerCase()!="a"&&a.tagName.toLowerCase()!="area") {a=a.parentElement;}}   if(de.bild.linktacker){de.bild.linktacker.setPath(a);}    a.lname = (a.getAttribute('data-ck5') ? a.getAttribute('data-ck5') : ""); webtrekkLinktrackObjects[z].getCCParams(a);if (webtrekkLinktrackObjects[z].linkTrackAttribute) {var tmp = "";eval("tmp = (a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute)?a.getAttribute(webtrekkLinktrackObjects[z].linkTrackAttribute):'')");if (tmp) {a.lname=tmp;}}a.lpos = 0;if(!webtrekkLinktrackObjects[z].wtLength(a.lpos)&&a.tagName) {c=document.links;for(d=0;d<webtrekkLinktrackObjects[z].wtLength(c);d++) {if(a==c[d]) {a.lpos=d+1;break;}}}if (a.lpos) {if (webtrekkLinktrackObjects[z].linkTrack=="link") {var y = a.href.indexOf ("//");y = (y>=0?a.href.substr(y+2):a.href); if(webtrekkLinktrackObjects[z].linkTrackPattern){if(!webtrekkLinktrackObjects[z].linkTrackReplace) {webtrekkLinktrackObjects[z].linkTrackReplace = "";}y = y.replace(webtrekkLinktrackObjects[z].linkTrackPattern,webtrekkLinktrackObjects[z].linkTrackReplace);}webtrekkLinktrackObjects[z].wtEp = (a.lname ? ("ck5=" + a.lname + ";") : "");webtrekkLinktrackObjects[z].wtEp += (a.href ? ("ck6=" + a.href + ";") : "");webtrekkLinktrackObjects[z].wtEp += "ck7=" + document.location.href;webtrekkLinktrackObjects[z].config.linkId = (a.lname?(a.lname+"."):"") + y.split("?")[0].replace (/\//g, ".");var p = "";if (webtrekkLinktrackObjects[z].linkTrackParams) {p = webtrekkLinktrackObjects[z].linkTrackParams.replace(/;/g,",").split(",");}for (var i = 0; i < p.length; i++) {var v = webtrekkLinktrackObjects[z].urlParam (y, p[i], "");if (v) {webtrekkLinktrackObjects[z].config.linkId += "." + p[i] + "." + v;}}}else if (webtrekkLinktrackObjects[z].linkTrack == "standard" && a.lname) {webtrekkLinktrackObjects[z].config.linkId = a.lname;}webtrekkLinktrackObjects[z].isDownloadFile = false;if (webtrekkLinktrackObjects[z].linkTrackDownloads) {var link_extension = a.href.split(".");link_extension = link_extension.pop();var wt_dfe = webtrekkLinktrackObjects[z].linkTrackDownloads.split(";");for (i=0; i<wt_dfe.length; i++){if (wt_dfe[i] == link_extension){webtrekkLinktrackObjects[z].isDownloadFile = true;break;}}}if (webtrekkLinktrackObjects[z].config.linkId) {if (webtrekkLinktrackObjects[z].domain && !webtrekkLinktrackObjects[z].isOwnDomain(a.href)) {webtrekkLinktrackObjects[z].linktrackOut = true;}}if(webtrekkLinktrackObjects[z].isSafari || webtrekkLinktrackObjects[z].isOpera || webtrekkLinktrackObjects[z].isChrome || webtrekkLinktrackObjects[z].isDownloadFile || (webtrekkLinktrackObjects[z].config.linkId && a.target!="" && a.target!="_self") ){webtrekkLinktrackObjects[z].sendinfo(webtrekkLinktrackObjects[z].config);}}}}};
/*webtrekkChangeCookie*/
if(wt.getCookie("wt_sr")){
 var timeEid = (wt.cookieEidTimeout) ? wt.cookieEidTimeout : 6;wt.deactivatePixel = false;var sampleValues = wt.getCookie("wt_sr").split("|");wt.setCookie("wt_sr", "", -1000);wt.setCookie("wt3_sample", ";"+wt.trackId.split(",")[0]+"|"+sampleValues[1]+"|"+sampleValues[0], timeEid*30*24*60);wt.setPixelSampling();
}
/*webtrekkDisablePixel*/
if(!wt.deactivatePixel){
 wt.deactivatePixel = (wt.isOwnDomain(document.location.href) ? false : true);
}
