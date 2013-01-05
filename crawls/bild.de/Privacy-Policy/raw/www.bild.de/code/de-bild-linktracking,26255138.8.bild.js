
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