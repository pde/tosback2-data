
/*sfx:25798976.1*/

/** 
 * version: 29022012
 *Die sfx.js reagiert auf Tags und Classnames der gesamten Seite und gehoert in den Fuß der Seite.
 * Bei folgenden Events ist spaeter eventuell eine Absprache mit anderen Scripts notwendig:
 * document.onload (nicht DOM-onload) - fuer Rotationsfunktionen
 * document.onkeydown - fuer die ESC-Taste
 * document.onmousemove fuer Bildvergroeßerung und ToolTip
 */
/**
 * Variablen-Deklaration
 */
//das Hauptobjekt
var de = de || {};
de.bild = de.bild || {};

//hier verwendetes Objekt
de.bild.sfx = de.bild.sfx || {};

//z-Indizes
de.bild.sfx.BACK = 1000;
de.bild.sfx.MIDDLE = 1005;
de.bild.sfx.FRONT = 1010;
de.bild.sfx.AKTION = 99999;

//Zaehler fuer temporaere ID-Vergabe
de.bild.sfx.zz = 1000;

//Blocker fuer KTG-Galerien wegen Flackerns
de.bild.sfx.ktgblock = 0;

//Erkennung einer Newsticker-Seite
de.bild.sfx.ntAside = 0;

//Grosse Schleife und Pagintor Ausgefuehrt
de.bild.sfx.ausgefuehrt = de.bild.sfx.paginatorLaeuft = false;
de.bild.sfx.stgOutDelay = null;


/**
 * JavaScript-im-Snippet-aktivieren-Funktion
 * @param {String} was Inhalt des Snippets
 */
de.bild.sfx.javascriptGo = function(was){
    //das Snippet nach Script-Tags durchsuchen
    var scriptText = was.match(/\<SCRIPT(.|\s)+?\<\/SCRIPT\>/gi),
    scriptTextLen = scriptText.length,
    headTag = document.getElementsByTagName('head')[0],
    i = 0,
    j = 0,
    newScript,
    scriptIncluded,
    scripts;

    if (scriptText) {
        //fuer alle gefundenen Script-Tags
        for (;i < scriptTextLen; i++) {
            //im DOM ein neues Script anlegen
            newScript = document.createElement('script');
            //wenn Script-Tag mit "src"
            if (scriptText[i].match(/\<SCRIPT.+?src\=\"(.+?)\"/i)) {
           
                //das neue Script bekommt diese src
                newScript.src = RegExp.$1;
                //check, ob das Skript schon eingebunden ist und hängt es dann in den Head der Seite
                scriptIncluded = false;
                scripts = headTag.getElementsByTagName('script');
               
                for (;j < scripts.length; j++) {
                    if (scripts[j].src == newScript.src) {
                        scriptIncluded = true;
                        break;
                    }
                }
                if (!scriptIncluded) {
                    //den Type Script-Tags
                    newScript.type = "text/javascript";
                    //das neue Script wird ins DOM gehaengt            
                    headTag.appendChild(newScript);
                }
            }
            else {
                //entferne die Script-Tags selber
                scriptText[i] = scriptText[i].replace(/\<SCRI.+?\>|<\/SCRIPT\>/gi, "");
                //Funktionsaufrufe werde per eval sofort ausgeführt.
                eval(scriptText[i]);
            }
        }
    }
};

/**
 * großer NewsTicker
 * wechselt im großen Newsticker die Anzeigeflaechen und die dazugehoerigen Listenpunkte
 * @param {String} was Id des Newsticker
 */
de.bild.sfx.ntturn = function(was){

    //die NewsTicker-Childs, Anzeigeflaechen
    var ntteas = document.getElementById('allteas').childNodes,

    ntteasLen = ntteas.length,
  
    //die unteren Listenelemente des NewsTickers
    ntlist = document.getElementById('nticker-list').getElementsByTagName('li'),

    ntlistLen = ntlist.length,
  
    //Zaehler fuer ID-Vergabe
    nttz = 0,
    j = 0,
    h = 0;
  
    //alle Teaserflaechen
    for (;h < ntteasLen; h++) {
        if (ntteas[h].className == "ntteaser") {
      
            //bekommen eine ID (Kopplung Liste-Teaser)
            ntteas[h].id = ntteas[h].id ? ntteas[h].id : "nt" + nttz;
            nttz++;
          
            //und werden nicht mehr angezeigt
            ntteas[h].style.display = "none";
          
          
        }
    }
  
    //alle Listenelemente inaktiv
    for (;j < ntlistLen; j++) {
        ntlist[j].className = ntlist[j].className.replace(/active/g, "");
    }
  
    //der gewuenschte Teaser wird angezeigt
    document.getElementById("nt" + was).style.display = "block";
  
    //aktuelles Listenelement aktiv
    ntlist[was].className += " active";
  
    //"href" des aufrufenden Tags wird abgestellt
    return false;
};

//nur, weil der Funktions-Name eventuell schon verbaut ist, in den snippets
window.ntturn = function(was){
    de.bild.sfx.ntturn(was);
    return false;
};



/**
 * Snippet-Funktion
 * universeller XML-Request
 * @param {String} was Pfad zum Snippet
 * @param {String}        was   Id des zu wechselnden Bereiches
 * @param {String|Object} wohin Id des entsprechenden Multiteasers | angeklicktes Objekt
 * @param {Object}        obj   optional, angeklicktes Objekt aktiviert die TabLeiste
 */
function paginator(was, wohin, obj){
    if (!was || was === '') {
        return true;
    }
    de.bild.sfx.paginatorLaeuft = true;
    //Aufgrund des IE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        if (window.event.srcElement.tagName == "A") {
            e.returnValue = false;
        }
    }
   
    //wenn "wohin" keine ID, sondern Objekt (this) übergibt, dann
    if (typeof wohin == 'object') {
        //wird aus dem wohin=objekt ein wohin=ID (siehe Funktion)
        wohin = de.bild.sfx.ObjParToId(wohin, wohin.className);

    }
   
    //wenn Tabs aktiviert/deaktiviert werden muessen
    if (typeof obj === "object") {//TabAktivator
        var par = obj.parentNode.parentNode.childNodes,
        parLength = par.length,
        i = 0;
        if (par) {
            for (;i < parLength; i++) {
                if (par[i].className) {
               
                    //alle Tabs inaktiv
                    par[i].className = par[i].className.replace(/active/, "");
                }
            }
           
            //das aktuelle Tab wird aktiv
            if (obj.parentNode) {
                obj.parentNode.className += " active";
            }
        }
    }
   
    //XML-Request mit Browserweiche
    var http = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
   
    //entfernt XML-Fehlermeldungen im FF
    if (http.overrideMimeType) {
        http.overrideMimeType('text/html');
    }
   
    //bei Ladestatus-Wechsel
    http.onreadystatechange = function(){
        var ziel = document.getElementById(wohin),
        $ziel = jQuery(ziel);
       
        //wenn Schnipsel komplett geladen
        if (http.readyState == "complete" || http.readyState == 4) {
            if (ziel) {
                $ziel.empty();

                //alles andere sofort Schnipsel schreiben
                ziel.innerHTML = http.responseText;

                if (de.bild.sfx.stgOutDelay) {
                    de.bild.sfx.paginatorLaeuft = false;
                    de.bild.sfx.stgout(de.bild.sfx.stgOutDelay);
                    de.bild.sfx.stgOutDelay = null;
                }

                de.bild.sfx.paginatorLaeuft = false;
               
                //Snippet-JavaScript aktivieren
                de.bild.sfx.javascriptGo(http.responseText);
               
                //Blocker für KTG-Galerien wegen Flackern
                de.bild.sfx.ktgblock = 1;
               
                //Mausereignisse neu initialisieren             
                //Wenn es sich nicht um eine KTG handelt init ausführen
                if (ziel.className.indexOf("shorttext") == -1) {
                    de.bild.sfx.init();
                }

                //reinit
                if (de.bild.init) {
                    de.bild.init($ziel);
                 }


                if (typeof QGTV != "undefined" && typeof QGTV.initialize == "function") {
                    QGTV.initialize()
                };



                //fuer NewsTicker: wenn dritter Parameter eine Zahl
                if (typeof obj == "number") {//welcher NewsTicker
                    //starte den NewsTicker-Wechsel (wichtig beim "Rueckwaertstickern" im NewsTicker, Zeitverzoegerung wegen IE6-Flackern)
                    setTimeout('de.bild.sfx.ntturn(' + obj + ')', 1);
                }


               
                /*
                //wenn in Overlay
                if (wohin == "aktionsbox") {
                    with (ziel) {
                        style.display = "block";
                       
                        //Ausrichtung des Overlayers
                        style.left = document.documentElement.clientWidth / 2 - clientWidth / 2 + "px";
                        style.top = document.documentElement.clientHeight / 2 - clientHeight / 2 + ((document.compatMode && !window.XMLHttpRequest) ? document.documentElement.scrollTop : 0) + "px";
                    }
                   
                    //wenn fuer "send-a-friend", dann URL einfuegen
                    if (document.getElementById('safIM')) {
                        document.getElementById('safIM').value = location;
                    }
                    //und das Message-Feld auf 1500 Zeichen begrenzen
                    if (document.getElementById('safMESSAGE')) {
                        document.getElementById('safMESSAGE').onkeydown = document.getElementById('safMESSAGE').onblur = function(){
                            if (this.value.length > 1500) {
                                this.value = this.value.substr(0, 1500);
                            }
                        };
                    }
                }
               */
            }
        }
    };
   
    //oeffnet asynchron XML-Request mit "POST" oder "GET"
    if (obj == "POST") {
        var poststr = "";
        /*
        if (wohin == 'aktionsbox') {
            poststr = "safIM=" + escape(encodeURI(document.getElementsByName("safIM")[0].value)) +
            "&safFROM=" +
            escape(encodeURI(document.getElementsByName("safFROM")[0].value)) +
            "&safTO=" +
            escape(encodeURI(document.getElementsByName("safTO")[0].value)) +
            "&safMESSAGE=" +
            escape(encodeURI(document.getElementsByName("safMESSAGE")[0].value));
            if (document.getElementsByName("safBack")[0]) {
                poststr += "&safBack=" + escape(encodeURI(document.getElementsByName("safBack")[0].value));
            }
        }
        */
        http.open('POST', unescape(was), true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", poststr.length);
        http.setRequestHeader("Connection", "close");
        http.send(poststr);
    }
    else {
        //Schnipsel anfordern
        http.open("GET", unescape(was), true);
        http.send(null);
       
    }
   
    //den "href" im aufrufenden HTML-Tag totlegen
   
    de.bild.sfx.paginatorLaeuft = false;
    return false;
}

/**
 * Objekt.Parent-zu-ID-Funktion
 * Umrechner, wenn Paginator nicht mit ID, sondern mit Klick-Objekt aufgerufen wird
 * das gewünschte Elternelement (mit Klassennamen "pagination") bekommt dann eine temporaere ID.
 * (Fuer Fotogalerie die Namen "fgloader" und "fgbase")
 * @param {Object} wohin aktives Objekt
 */
de.bild.sfx.ObjParToId = function(wohin, classname){
    var par = wohin.parentNode;
   
    //wenn kein Elternelement mehr vorhanden
    if (!par || par.length == 0) {
        return null;
    }
   
    //wenn der Paginierungsbereich gefunden wird
    if (par.className && par.className.match(/pagination/)) {
   
        //ID-Zähler höher
        de.bild.sfx.zz++;
       
        //ID zusammenbauen
        var tempId = par.id ? par.id : "pagination" + de.bild.sfx.zz;
        //    var tempId="pagination"+de.bild.sfx.zz;
       
        //dieses Elternelement bekommt eine temporaere ID
        par.id = tempId;
       
        //und die Funktion gibt diese ID als String zurück zur weiteren Verarbeitung in der Paginator
        return tempId;
    }

   
    //wenn vorher nichts gefunden, ein Elternelement höher berechnen
    return de.bild.sfx.ObjParToId(par, classname);
};



/**
 * Kurztextgalerien
 * @param {Object} obj aktuelles Objekt
 */
//"mehr"-Button dynamisch auf Text legen
de.bild.sfx.stgmehr = function(obj, fromInit){
    if (!obj || !obj.parentNode)
        return;
  
    if (obj.getElementsByTagName('span')[0] || obj.className.match(/expanded/)) {
   
        var _span = obj.getElementsByTagName('span')[0], fromInit = fromInit || false, _img = obj.getElementsByTagName('img')[0] || null, objvnParent = obj.parentNode.parentNode.parentNode.parentNode, _offsetHeight = obj.parentNode.parentNode.offsetHeight, _w, _l, erstesDiv = obj.getElementsByTagName('div')[1] ? obj.getElementsByTagName('div')[1] : false;
       
        //"mehr"-Button Breite (je nach Browser und KT-Galerie, Überprüfung, ob Hochformat oder Querformat in KTG eingebaut ist)
        if (erstesDiv && erstesDiv.offsetHeight != 50) {
            //KTG rechte Spalte mit Bochformat
            if (erstesDiv.offsetHeight == 89 && obj.OffsetWidth != 389) {
                _w = obj.offsetWidth - 67 + "px";
            }
            else {
                _w = obj.offsetWidth + "px";
            }
           
        }
        else {
            _w = obj.offsetWidth;
        }
        //"mehr"-Button linksAbstand (je nach Browser und KT-Galerie, Überprüfung, ob Hochformat oder Querformat in KTG eingebaut ist)
        if (erstesDiv && erstesDiv.offsetHeight != 50) {
            _l = 0 + "px";
            if (erstesDiv.offsetHeight == 89 && obj.OffsetWidth != 389) {
                _l = 67 + "px";
            }
            else {
                _l = 0 + "px";
            }
        }
        else {
            _l = "0px";
        }

      
        //Hoehe des Textes auslesen (ist hier noch vom CSS festgelegt, nicht vom Inhalt)
        obj.small = obj.offsetHeight;
        if (_span) {
            _span.style.left = _l;
            _span.style.display = "block";
         }
        

        //wenn ein Snippet neu eingeladen wurde oder diese Galerie initialisiert wird
        if (de.bild.sfx.ktgblock == 1 || !obj.big && !obj.className.match(/expanded/)) {
       
            //kurzes CSS-Ausklappen der KT-Galerie
            if (objvnParent.className == "element center") {
                //Wenn KT in der Lightbox aufgerufen wird, wird keine Hoehe gesetzt, da sich sonst die LB nicht automatisch anpasst
                if (objvnParent.parentNode.className != "innerBox") {
                    //CSS-Ergaenzung, falls ohne Überschrift - IE 16px
                    objvnParent.style.height = _offsetHeight + (!+"\v1" ? 16 : 13) + "px";
                }
               
                objvnParent.className = "element center stOpen2";
            }
            else {
                if (objvnParent.className == "element floatL" || objvnParent.className == "element floatR") {
               
                    //CSS-Ergaenzung, falls ohne Überschrift
                    objvnParent.style.height = _offsetHeight + 13 + "px";
                   
                    objvnParent.className += " stOpen3";
                }
                else {
               
               
                    if (!fromInit) {
                        //CSS-Ergaenzung, falls ohne Überschrift
                        obj.parentNode.parentNode.parentNode.style.height = _offsetHeight + "px";
                       
                    }
                   
                    if (!objvnParent.className.match("element center")) {
                        obj.parentNode.parentNode.parentNode.className = "stWrap stOpen1";
                    }
                   
                    if (_img && _img.offsetHeight == 89) {
                    }
                    else {
                        if (_span) {
                            _span.style.left = "0px";
                            _span.style.width = "255px";
                        }
                    }
                }
            } // endif
            obj.big = obj.offsetHeight;
            //CSS-Zuklappen der KT-Galerie
            if (objvnParent.className == "element center stOpen2") {
                objvnParent.className = "element center";
            }
            else {
                if (objvnParent.className == "element floatL stOpen3" || objvnParent.className == "element floatR stOpen3") {
                    objvnParent.className = objvnParent.className.replace(/ stOpen3/, "");
                }
                else {
                    obj.parentNode.parentNode.parentNode.className = "stWrap";
                }
            }
        }

        //Wenn KT-Galerie ausklappen wuerde,
        if (obj.small < obj.big) {
            //dann zeige den "mehr"-Button
            if (_span) {            
                _span.style.backgroundColor = "#F5F5F5";
                _span.style.textAlign = "right";
                _span.style.bottom = "-1px";
                _span.style.fontSize = "11px";
            }

            //Mehr-Button fuer Regularien
            if (objvnParent.className == "stWrap" || objvnParent.className == "aside content sLast") {
                if (_img && _img.offsetHeight == 89) {
                }
                else {
                    if (_span) {
                        _span.style.left = "0px";
                        _span.style.width = "255px";
                    }
                    
                }
            }
            if (_span) {
                _span.style.display = "block";
            }
            
        } // endif
        else {
            if (_span) {
                _span.style.display = "none";
            }
            
        }
       
       
    } // endif
    de.bild.sfx.ktgblock = 0;
};

//Funktion zur oeffnung der Kurztextgalerien
de.bild.sfx.stgauf = function(){
    var obj = this;
    obj.over = 1;
   
    var thisznParent = obj.parentNode.parentNode;
    //jeweils Austausch der Klassennamen
    if (thisznParent.className.match(/element center/)) {
        if (!thisznParent.className.match(/stOpen2/)) {
            thisznParent.className = "element center stOpen2";
        }
    }
    else {
        if (thisznParent.className.match(/element floatL|element floatR/)) {
            if (!thisznParent.className.match(/stOpen3/)) {
                thisznParent.className += " stOpen3";
            }
        }
        else {
            if (!thisznParent.className.match("element center")) {
                //wenn nicht schon offen (unterbindet IE Flackern)
                if (!obj.parentNode.className.match(/stOpen1/)) {
                    obj.parentNode.className += " stOpen1";
                }
            }
        }
    }
   
    //"mehr"-Button weg
    obj.getElementsByTagName('span')[0].style.display = "none";
};

//Funktion zur Abgleichung der Flackerwerte (IExplorer)
de.bild.sfx.stgzu = function(){
    if (!de.bild.sfx.paginatorLaeuft) {
        this.over = 0;
        setTimeout('de.bild.sfx.stgout("' + this.id + '")', 1);
    }
    else {
        de.bild.sfx.stgOutDelay = this.id;
    }
};

/*
 * Funktion zur Schließung der Kurztextgalerien
 * jeweils Austausch der Klassennamen
 * @param {String} was Id der Ktg
 */
de.bild.sfx.stgout = function(was){
    if (document.getElementById(was)) {
        var obj = document.getElementById(was);
        if (de.bild.sfx.stgOutDelay) {
            obj.over = 0;
        }
       
        if (obj.over == 0) {
            var objznParent = obj.parentNode.parentNode;
            if (objznParent.className == "element center stOpen2") {
                objznParent.className = "element center";
            }
            else {
                //"element floatL" wegen Doppel-Onmouseout
                if (objznParent.className.match(/stOpen3/) || objznParent.className == "element floatL" || objznParent.className == "element center") {
                    objznParent.className = objznParent.className.replace(/ stOpen3/g, "");
                }
                else {
                    obj.parentNode.className = "stWrap";
                }
            }
           
            //fuer nachgeladenes Snippet die "mehr"-Button-Funktion
            for (var i = 0, j = obj.getElementsByTagName('div').length; i < j; i++) {
                var _obj = obj.getElementsByTagName('div')[i];
                if (_obj.className.match(/shorttextContent/)) {
                    de.bild.sfx.stgmehr(_obj);
                }
               
            } //endfor
        }
    }
   
};


/**
 * Funktion um Fenster der Imagemap-Popups bei Klick in den Vordergrund zu holen
 */
de.bild.sfx.imageMapOpener = {};
de.bild.sfx.imageMapOpener.open = function(url, window_name, width, height){
    de.bild.sfx.imageMapOpener.popup = window.open(url, window_name, 'width=' + width + ',height=' + height);
    de.bild.sfx.imageMapOpener.popup.focus();
};



/**
 * PlayerIcons
 * @param {String} was Id des aktuellen PI
 */
de.bild.sfx.PlayerIcon = function(was){
    var obj = document.getElementById(was);
    if (obj.over == 0) {
        obj.getElementsByTagName('span')[0].style.display = "none";
    }
};




/**
 * MouseEvents-Init
 * Im Init-Bereich werden auf benoetigte Schaltflaechen und Anzeigebereiche automatisch die Maus-Events gesetzt
 */

de.bild.sfx.init = function(){

    var pageId = jQuery('body').attr('id');
    hasRectangle = jQuery('div.rectangle.hide').length;

    // expand div.simVids
        function simvids($elem){
           $elem.attr('class', 'altVids');
           $elem.children().attr('class', 'hentry vt9');
           $elem.children(':last-child').addClass('last');
        };
        
        // expand div.topVids
        function topvids($elem){
            $elem.attr('class', 'tVidsFull');
            $elem.children().attr('class', 'hentry vt10');
        }

    var i = 0;
    for (;i < de.bild.sfx.divsLen; i++) {
        
        var _div = de.bild.sfx.Divs[i];
        if (!_div) {
            continue;
        }

        //-----------------------------Ersatzcontent fuer Rectangle-Werbung Video----------
        //wird keine Rectangle-Werbung innerhalb der Video-Seite ausgeliefert
        if (pageId==='video' && hasRectangle > 0) {

            if(jQuery(_div).hasClass('simVids')) {
                simvids(jQuery(_div));
                continue;
            }

            if(jQuery(_div).hasClass('topVids')) {
                topvids(jQuery(_div));
                continue;
            }

        }


       
        //-----------------------------------Videoranking/Heute bei BILD.de----------
        //diese classnames identifizieren die
        if (_div.className.match(/vtr5|vtr3/)) {
            var hbbid = 0, hbbnow = 0,
            childNodeLen = _div.childNodes.length,
            liColl = _div.getElementsByTagName('li'),
            liCollLen = liColl.length;
           
            //Kopplung der Schaltflaechen mit den Anzeigebereichen
            for (var j = 0; j < childNodeLen; j++) {
                if (_div.childNodes[j].className == "hentry vt3") {
                    _div.childNodes[j].id = _div.childNodes[j].id ? _div.childNodes[j].id : "hbb" + hbbid;
                    hbbid++;
                }
            }
           
            //Mausereignisse auf die Schaltflaechen
            for (var j = 0; j < liCollLen; j++) {
                if (!liColl[j].className.match(/disabled/)) {
                    liColl[j].onmouseover = de.bild.sfx.Hbbaktiv;
                    hbbnow = j;
                }
            }
            //nur fuer "Heute bei Bild"
            if (_div.className.match(/vtr5/)) {
                liColl[hbbnow].className += "active";
                document.getElementById('hbb' + hbbnow).style.display = "block";
                document.getElementById('hbb' + hbbnow).style.zIndex = de.bild.sfx.FRONT;
            }

            continue;
        }
       
        //-------------------------------------------------Kurztextgalerien----------
        //dieser classname identifiziert Kurztextgalerien
        if (_div.className.match(/shorttextContent/) && _div.parentNode.className != "hidden") {
       
            //Blocker und ID fuer Entflackern-Funktion
            _div.parentNode.parentNode.over = 0;
            de.bild.sfx.zz++;
            _div.parentNode.parentNode.id = _div.parentNode.parentNode.id ? _div.parentNode.parentNode.id : "ktg" + de.bild.sfx.zz;
           
            if (!_div.className.match(/expanded/)) {
                //auf die gesamte Kurztextgalerie over/out Mausereignisse
                _div.parentNode.parentNode.onmouseover = de.bild.sfx.stgauf;
                _div.parentNode.parentNode.onmouseout = de.bild.sfx.stgzu;      
            }

           
            //"mehr"-Button aufklappen
            if (de.bild.sfx.ktgblock == 0) {
                //Grosse Schleife Ausgefuehrt?
                (de.bild.sfx.ausgefuehrt) ? de.bild.sfx.stgmehr(_div, true) : de.bild.sfx.stgmehr(_div);
            }
            else {
                de.bild.sfx.ktgblock = 0;
            }

            continue;
        }


        

       
    }
    //Bildvergroesserung wird nur einmal initialisiert
    //de.bild.sfx.drag.isInitialised = 1;
   
    //Grosse Schleife Ausgefuehrt
    de.bild.sfx.ausgefuehrt = true;
   
    //Schleife nach dem Paginator Ausgefuehrt
   
    de.bild.sfx.paginatorLaeuft = false;
};

de.bild.sfx.mediachartsMusic = function(o){
    if (!o)
        return;
    var p = o.parentNode, lis = p.getElementsByTagName('li');
    for (var i = 0, j = lis.length; i < j; i++) {
        if (i == (j - 1)) {
            lis[i].className = 'last';
        }
        else {
            lis[i].className = ''
        }
    }
    o.className += ' active';
}

/**
 * Die Funktion sfxReady setzt lediglich bei onload diverse Parameter auf "1", statt z.B. Rotations-Funktionen selber aufzurufen
 * Dadurch spielt die Scriptposition im HTML keine Rolle. Ansonsten muesste die addLoadEvent-Funktion in den Kopf der Seite
 */
de.bild.sfx.sfxReady = function(){
    //fuer Rotationen
    de.bild.sfx.Divs.ls = 1;
};







jQuery(document).ready(function(){
    
    /**
     * INTERAKTIONS-BEREICH
     * fuer Lightbox, Mitteilungslayer, etc wird ein Div-Bereich angelegt
     */
    jQuery('body').append(jQuery('<div id="aktionsbox" style=position:absolute;z-Index:' + de.bild.sfx.AKTION + ';display:none;></div>'));
    
    //alle Div-Tags der Seite
    de.bild.sfx.Divs = document.getElementsByTagName('div');
    de.bild.sfx.divsLen = de.bild.sfx.Divs.length;
    
    //Flash-Player durch video-Tag ersetzen
    if (de.bild.video) {
        de.bild.video.replaceFlash();
    }
    
    /**
     * verhindert display:none fuer html-tag bei fehler im facebook-button
     */
    var htmltags = document.getElementsByTagName('html')[0];
    htmltags.style.display = 'block';
    
    //Aufruf der Init-Sequenz
    de.bild.sfx.init();
    
    de.bild.sfx.sfxReady();
});