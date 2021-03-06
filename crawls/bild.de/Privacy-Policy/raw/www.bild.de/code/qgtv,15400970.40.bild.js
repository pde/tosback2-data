
/*qgtv:15400970.40*/

var de = de || {};
de.bild = de.bild || {};
de.bild.qgtv = de.bild.qgtv || {};
var qgtv = new Object();
de.bild.qgtv.reInitID = false;
//check auf IE 6
if (jQuery.browser.msie && jQuery.browser.version.substr(0,1)<7) {
 de.bild.qgtv.ie6 = true;
}
else{
 de.bild.qgtv.ie6 = false;
}
// Für FlashFix im IE6-8
de.bild.qgtv.vidParams = "";
//Globale Ajax Einstellungen
jQuery.ajaxSetup({
    cache: false
});
de.bild.qgtv.ChangeSubformState = function(id){
    if (jQuery('#' + id).attr('checked')) {
        jQuery('.' + id).removeClass('hidden');
    }
    else {
 
        jQuery('.' + id).addClass('hidden');
    }
}
de.bild.qgtv.GetCookie = function(cookieName){
    wert = '';
    cookies = document.cookie;
    if (cookies) {
        name = '';
        ende = false;
        while (cookieName != name && !ende) {
            j = cookies.search('=');
            k = cookies.search(';');
            if (j < 0) {
                ende = true;
            }
            if (k < 0) {
                ende = true;
                k = cookies.length
            }
            name = cookies.substring(0, j);
            wert = cookies.substring(j + 1, k);
            if (!ende) {
                cookies = cookies.substring(k + 1);
            }
        }
    }
    return wert;
};
de.bild.qgtv.UserHasVoted = function(votingId){
    wert = de.bild.qgtv.GetCookie('QGTV_Votes');
    return wert.search(votingId) >= 0;
};
de.bild.qgtv.SubmitQGTV = function(source, formid, action){
  //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden 
    if (window.event) {     
        var e = window.event;
   e.returnValue = false;
    }
    destination = '#qgtv' + formid;
    selector = destination + ' form.qgtv';
    if (jQuery(selector + " input[name='__action']").length > 0) {
        jQuery(selector + " input[name='__action']").val(action);
    }
    else {
        jQuery(selector).append('<input name="__action" type="hidden" value="' + action + '" />');
    }
    parameter = jQuery(selector).serialize();
    de.bild.qgtv.AjaxReplace(source, 'POST', parameter, destination);
};
de.bild.qgtv.ShowFormLightbox = function(source, formid, delay){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowLightbox(source, 'POST', parameter, '', true, delay);
};
de.bild.qgtv.ShowCaptchaLightbox = function(source, formid, delay, switchFunction){
    parameter = jQuery(formid).serialize();
    de.bild.qgtv.ShowLightboxCond(source, 'POST', parameter, '', true, delay, function(html) {
        var captchaOk = jQuery(html).find('#qgtvCaptchaOk').length != 0;
        if (captchaOk && typeof(switchFunction) === "function")
        {
            switchFunction();
        }
        return !captchaOk;
    });
};
de.bild.qgtv.ShowPlayerLightbox = function(source){
    de.bild.qgtv.ShowLightbox(source, 'POST', '', '');
    return false;
};
de.bild.qgtv.AjaxReplace = function(source, type, parameter, destination){
    destination = jQuery(destination);
    jQuery.ajax({
        url: source,
        type: type,
        data: parameter,
        success: function(html){
            destination.replaceWith(html);
            QGTV.initialize();
         
            de.bild.qgtv.zoom.Events();
        },
        error: function(html){
        
        }
    });
};
/** LIGHTBOX */
/**  @param source -  Das zu ladende Snippet
 *  @param type -  Die Methode - Get/Post
 *  @param params -  Die Parameter, die der Ajax-Aufruf mitnehmen soll
 *  @param background - die Farbe des Hintergrunds in der Lightbox
 */
//Lightbox Variablen
var windowWidth = jQuery(window).width();
var windowHeight = jQuery(window).height();
var fromTop = null;
// Default für den Background der Lightbox, kann in HTML-Farbwerte geändert werden. Per default erstmal leer
if (jQuery('.lightbox').length == 0) {
    var bg = null;
}
de.bild.qgtv.ShowLightbox = function(source, type, params, background, draggable, delay){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    bg = background;
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        beforeSend: function(){
            de.bild.qgtv.loaderIcon('.lightbox')
        },
        complete: function(){
            jQuery('#loaderIcon').remove()
        },
        success: function(html){
            //Flash Elemente fuer den IE fixen
            if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
            {
                var temp = jQuery(html).find("object");
                de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";
   
                jQuery(html).find("object param").each(function(index, value)
                {
                    var obj = new Object();
                    obj.name = jQuery(value).attr("name");
                    obj.value = jQuery(value).attr("value");
                    de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                });
   
                de.bild.qgtv.vidParams += "</object>";
            }
            //Flash fix Ende
           
            de.bild.qgtv.InitiateLightbox(html, draggable, delay);
        }
    });
};
de.bild.qgtv.ShowLightboxCond = function(source, type, params, background, draggable, delay, condition){
     //Aufgrund des IE/PBE Bugs, wird hier das Standardevent bei A-Tags unterbunden
    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }
    bg = background;
    jQuery.ajax({
        url: source,
        data: params,
        type: type,
        beforeSend: function(){
            de.bild.qgtv.loaderIcon('.lightbox')
        },
        complete: function(){
            jQuery('#loaderIcon').remove()
        },
        success: function(html){
            if (condition(html))
            {
                //Flash Elemente fuer den IE fixen
                if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8 && jQuery(html).find("object").length != 0)
                {
                    var temp = jQuery(html).find("object");
                    de.bild.qgtv.vidParams = "<object width='"+temp.attr("width")+"' height='"+temp.attr("height")+"' id='"+temp.attr("id")+"' data='"+temp.attr("data")+"' class='"+temp.attr("class")+"' type='"+temp.attr("type")+"' >";
                    jQuery(html).find("object param").each(function(index, value)
                    {
                        var obj = new Object();
                        obj.name = jQuery(value).attr("name");
                        obj.value = jQuery(value).attr("value");
                        de.bild.qgtv.vidParams += "<param name='" + obj.name + "' value='" + obj.value + "'>";
                    });
                    de.bild.qgtv.vidParams += "</object>";
                }
                //Flash fix Ende
                de.bild.qgtv.InitiateLightbox(html, draggable, delay);
            }
        }
    });
};
de.bild.qgtv.InitiateLightbox = function(html, draggable, delay){
    jQuery('.lightbox').remove();
 //Um die LB wird ein Wrapper gelegt, die LB wird auf display none gesetzt und der Wrapper wird wieder entfernt.
 //Das dient dazu, um das Springen der LB zu verhindern
 html="<div id='tempLB' style='display:none'>"+html+"</div>";
    jQuery('body').append(html);
    jQuery('.lightbox').hide();
 html = jQuery("#tempLB").html();
 jQuery("#tempLB").remove();
 jQuery('body').append(html);
     
//IE Flash Fix
if (jQuery.browser.msie && jQuery.browser.version.substr(0,1) <= 8)
{
    jQuery(".lightbox").find("object").parent().html(de.bild.qgtv.vidParams);
} 
 //Wenn ein Video verbaut ist, wird dieses fuer das Ipad umgewandelt
     jQuery(".lightbox").find(".clipTVplayer, .videoGallery").each(function(){
        de.bild.qgtv.reInitID = true;
    });
 
    if (delay == null) {
        delay = 0;
    }
    if (draggable == 1) {
         jQuery(".lightbox").draggable({ handle: '.header' }); 
    }
    setTimeout(function(){
        de.bild.qgtv.ActivateLightbox();
    }, delay);
};
de.bild.qgtv.ActivateLightbox = function(){
    if (bg == null | bg == '') {
        // Falls keine Hintergrundfarbe angegeben ist, wird die transparente Lightbox angezeigt inkl. Rahmen um das Element
        opacity = 0;
         bg = "black";
    }
 jQuery('.lightbox').addClass('layer');
    fromTop = jQuery(document).scrollTop();
    var documentHeight = jQuery(document).height();
    var layerHeight = null;
    //globale Variablen setzen
    de.bild.qgtv.calculateScreen();
    if (documentHeight < windowHeight) {
        layerHeight = windowHeight;
    }
    else {
        layerHeight = !de.bild.qgtv.ie6 ?documentHeight : windowHeight;
    }
    jQuery('#layer').remove();
 if (!de.bild.qgtv.ie6) {
  jQuery('#outerWrapper').prepend('<div id="layer" ' +
  'style="' +
  'left: 0;' +
  'width:' + windowWidth + 'px;' +
  'height:' + layerHeight + 'px;' +
  'z-index:4999;' +
  'position: fixed;' +
  'opacity: 0.' + opacity + ';' +
  'filter: Alpha(opacity=' + opacity + '0);' +
  'background:' + bg +';"></div>');
  jQuery('.lightbox').attr('style', 'position:fixed;');
 }
 else {
 jQuery('#outerWrapper').prepend('<div id="layer" ' +
    'style="' +
    'top:' + fromTop + 'px;' +
    'left:0;' +
    'width:' + windowWidth + 'px;' +
    'height:' + layerHeight + 'px;' +
    'z-index:4999;' +
    'position:absolute;' +
 'opacity: 0.' + opacity + ';' +
    'filter:Alpha(opacity=' + opacity + '0);' +
 'background:' + bg + ';"></div>');
    jQuery('body').css('overflow', 'hidden');
    jQuery('html').css('overflow', 'hidden');
    window.scrollTo(0, fromTop);
    jQuery('.lightbox').attr('style', 'position:absolute;');
 }
    var headerSize = jQuery('.lightbox > .innerBox > .section').width();
    jQuery('.innerBox > .section > .header').css('width', headerSize);
    //Lightbox an Browserfenster anpassen
    de.bild.qgtv.resizeLightbox();
    // esc-Taste gedrückt? Dann schließe die Lightbox
    jQuery('.close').click(function(e){
e.preventDefault();
        de.bild.qgtv.DeactivateLightbox();
    });
    jQuery(document).keyup(function(e){
        if (e.keyCode == 27) {
            de.bild.qgtv.DeactivateLightbox();
        }
    });
    jQuery(window).resize(function(){
        de.bild.qgtv.resizeLightbox();
    });
    jQuery(window).scroll(function(){ 
     if(!jQuery(".lightbox").hasClass("ui-draggable")){
        de.bild.qgtv.resizeLightbox();
      }
    });
  if (de.bild.qgtv.reInitID) {
  if (de.bild.video) de.bild.video.replaceFlash();
        de.bild.qgtv.reInitID = false;
    }
    jQuery('.section').resize(function(){
        //de.bild.qgtv.resizeLightbox();
    });

   // re-register videos
   de.bild.video.initVideoIn( jQuery('.lightbox') );

};
// richtet die Lightbox und das sie umgebende Layer im aktuellen Fenster mittig aus
de.bild.qgtv.contentWidth = null;
de.bild.qgtv.contentHeight = null;
de.bild.qgtv.theLightBox = null;
de.bild.qgtv.resizeLightbox = function(){
    var lightbox = jQuery(".lightbox");
    de.bild.qgtv.calculateScreen();
 //Workaround für verzögert ladene Flash Elemente
    var tmpVObject = jQuery(".lightbox .videoGallery object");
 if (tmpVObject.length > 0)
    {
        var tmpHeight = tmpVObject.attr("height");
        // kleiner Videoplayer
        if (tmpHeight == 282)
        {
            de.bild.qgtv.contentHeight = 419;
        }
        // großer Videoplayer
        else if (tmpHeight == 395)
        {
            de.bild.qgtv.contentHeight = 659;
        }
        // Audioplayer (Object-Größe: 134)
        else
        {
            de.bild.qgtv.contentHeight = 207;
        }
    }
    else
    {
        de.bild.qgtv.contentHeight = lightbox.height();
    }
    de.bild.qgtv.contentWidth =  lightbox.width();
   
 if(!de.bild.qgtv.ie6){
  var contentLeft = (windowWidth < de.bild.qgtv.contentWidth) ? 0 : ((windowWidth - de.bild.qgtv.contentWidth) / 2);
     var contentTop = (windowHeight <= de.bild.qgtv.contentHeight) ? 0 : ((windowHeight - de.bild.qgtv.contentHeight) / 2);
  lightbox.css({top: contentTop + 'px',left:contentLeft + 'px'});
 }
 else{
  var contentLeft = (windowWidth <= de.bild.qgtv.contentWidth) ? 0 : ((windowWidth - de.bild.qgtv.contentWidth) / 2);
     var contentTop = (windowHeight <= de.bild.qgtv.contentHeight) ? fromTop : ((windowHeight - de.bild.qgtv.contentHeight) / 2)+ fromTop;
  lightbox.css({top: contentTop + 'px',left:contentLeft + 'px'});
 }
 
 jQuery("#layer").css({width: windowWidth, height: windowHeight});
};
de.bild.qgtv.calculateScreen = function(){
    windowWidth = jQuery(window).width();
    windowHeight = jQuery(window).height();
};
de.bild.qgtv.DeactivateLightbox = function(){

jQuery('.lightbox').remove();
 jQuery('#layer').remove();
if (de.bild.qgtv.ie6) {
  jQuery('body').css('overflow', 'auto');
  jQuery('html').css('overflow', 'auto');
  window.scrollTo(0, fromTop);
 }
/*
    jQuery('.lightbox').fadeOut(speed, function(){
        jQuery('.lightbox').remove();
    });

    jQuery('#layer').fadeOut(speed, function(){
        jQuery('#layer').remove();
if (de.bild.qgtv.ie6) {
  jQuery('body').css('overflow', 'auto');
  jQuery('html').css('overflow', 'auto');
  window.scrollTo(0, fromTop);
 }
    });

*/
    jQuery(window).unbind('resize');
    bg = null;


    if (window.event) {
        var e = window.event;
        e.returnValue = false;
    }

};
/** Laderädchen-Spaß */
de.bild.qgtv.loaderIcon = function(element){
    //setTimeout(function(){
    var h = jQuery(element).height();
    jQuery(element).html('<div id="loaderIcon" class="loading cform" style="height:' + h + 'px;" ></div>');//}
    //,requestTimeout)
};
/** Funktion zur Aninmation des DSM Ergebnisses. Zählt das aktuelle Ergebnis um 1 hoch
 *
 * @param id Die Id des Votings, nicht nötig, wenn nur ein Voting auf der Seite verbaut ist.
 * @param timeout die Zeit, die vergeht, bevor die Animation gestartet wird
 */
de.bild.qgtv.count = function(timeout, id){
    if (timeout == null) {
        timeout = 500;
    }
 
    setTimeout(function(){
 
        //Für den Fall, dass Votings IDs bekommen, muss diese Zeile auskommentiert, bzw bearbeitet werden
        if (id != null) {
            if (id.charAt(0) != "#") {
                id = "#" + id;
            }
            id = jQuery(id).children(".imgOuter").children(".imgInner").children(".votes");
         
        }
        else {
            id = jQuery(".votes");
        }
        //in diese Variable wird der aktuelle Votingstand geschrieben
        var votes = "";
        //Diese Variable dient zur Überprüfung, ob sich die Anzahl der Stellen nach dem Abstimmen verändert hat
        var votes_overflow = "";
        //Variable, die angibt, ob sich die Anzahl der Stellen verändert hat
        var overflow = "";
        //Array, dass die neuen (roten) Zahlen sammelt, um sie danach hochzufahren
        var slideUp = new Array();
        //Array, dass die alten Zahlen sammelt und sie herunterzufahren.
        var slideDown = new Array();
        //Offset für die
        var left = 0;
        //Variable, die die neue Einerstelle angibt. Dies ist wichtig, wenn beim Hinzukommen einer neuen Stelle keine Null am Ende steht. z.B: 9+2
        var overflow_number = "0";
        //in diesem String werden die führenden Nullen einer Zahl gespeichert
        var leading_zero = "";
        //gibt an, ob man sich noch am Anfang der Zahl befindet
        var leading = 1;
     
        //Anhand der Klassennamen wird hier der alte Ergebnisstand ermittelt. Dafür werden alle <span> Attribute des DSM Ergebnisses durchgegangen
        //und jeweils das letzte Zeichen der Klasse ausgelesen und zu einer Zahl zusammengefügt
        id.children('span').each(function(index, value){
            var span = jQuery(value).attr('class');
            //nummerischer Wert des <span>-Tags, welcher aus der Klasse ausgelesen wird
            span = span.charAt(span.length - 1);
         
            //Handling von Zahlen, die eine führende Null besitzenz.B: 003
            if (leading && span == "0") {
                leading_zero += "0";
            }
            else {
                leading = 0;
            }
            //jede einzelne Ziffer wird in einen String geschrieben
            votes += (span);
            //um später zu prüfen, ob eine neue Stelle hinzukommt, gibt es eine Prüfvariable
            votes_overflow += (span);
        });
     
        //Votingergebnis hochzählen
        votes++;
        votes = votes.toString();
        // Führende Nulle vorne ranhängen. Ausnahme bietet der Fall, dass man von 0 auf 1 zählt, da es dabei keinen Übertrag gibt aber trotzdem eine führende
        // 0 verschwindet
        if (votes != "1") {
            votes = leading_zero + votes;
        }
        votes_overflow = votes_overflow.toString();
     
     
        //Überprüfung, ob durch die Addition eine Stelle hinzukommt. z.B: 9+1=10
        if (votes.length != votes_overflow.length) {
            overflow = 1;
            overflow_number = votes.charAt(votes.length - 1);
            if (leading_zero.length != 0) {
                //votes und span üm je eine leading-zero kürzen, da es einen Übertrag gibt
                id.children('span').eq(1).remove();
                votes = votes.substr(1, votes.length - 1);
            }
         
         
        }
     
        var top = parseInt(jQuery(".votes > span").css("height"));
     
        //Vergleich, welche Zahl sich geändert hat und hinzufügen eines Überblendungs-Span-Tags
        id.children('span').each(function(index, value){
            var span = jQuery(value).attr('class');
            var oldelem = id.children('span').eq(index);
            left = index * parseInt(oldelem.css("width"));
         
         
            span = span.charAt(span.length - 1);
            if (span != votes.charAt(index)) {
                id.children('span').eq(-1).after('<span class="digit-r' + votes.charAt(index) + '" style="display:none; position:absolute; top:' + top + '; opacity:0"></span>');
                id.children('span').eq(-1).css("left", left);
             
                //die neuen und die alten Zahlen werden in Arrays geschrieben
                slideDown.push(oldelem);
                slideUp.push(id.children('span').eq(-1));
            }
        });
     
        //Wenn eine neue Stelle hinzukommt, wird am Ende der Zahl der Übertrag hinzugefügt und gleich animiert
        if (overflow) {
            var new_one = id.children('span').eq(-1).after('<span class="digit-r' + overflow_number + '"></span>');
            new_one = id.children('span').eq(-1).after('<span class="digit-r' + overflow_number + '" style="position:absolute; top:' + top + ';"></span>');
         
            id.children('span').eq(-1).css("left", left + parseInt(jQuery(".votes > span").css("width"))).animate({
                top: "-5px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "3px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "0px",
                opacity: "1",
                height: top
            }, 100, "swing", function(){
                id.children('span').eq(-1).remove();
            });
        }
     
        //Überlagern der sich geänderten Zahlen. Die neue(n) Zahl(en) schieben sich vor die alten. Im Hintergrund ändern die alten Zahlen
        // ihre Klassen auf die neue Zahl und die für die Anmimation verwendeten Zahlen werden entfernt
        jQuery(slideUp).each(function(index, value){
            var classname = value.attr("class");
            slideDown[index].animate({
                height: "1px"
            }, 500, "swing", function(){
                slideDown[index].css("height", "");
                slideDown[index].attr("class", classname);
                slideDown[index].removeAttr('style');
                value.remove();
            });
            //Hochfahren der roten Zahlen
            value.animate({
                top: "-5px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "3px",
                opacity: "1",
                height: top
            }, 100, "swing").animate({
                top: "0px",
                opacity: "1",
                height: top
            }, 100, "swing");
        });
    }, timeout);
};
/**
 * Funktion dient dazu, den Countdown unterhalb einer DSM-Umfrage zu animieren
 * @param ms Datum in ms, an dem der Countdown abläuft
 * @param elem Die ID des  countdown Elements
 */
de.bild.qgtv.timer = function(ms, elem){
    jQuery(document).ready(function(){
        if (ms == null || ms < 0) {
            ms = 0;
        }
     
        if (elem != null) {
            if (elem.charAt(0) != "#") {
                elem = "#" + elem;
            }
        }
        if (jQuery(elem).length != 0) {
            // Array zum Sammeln der zu animierenden Layer
            var slideUp = new Array();
            var countdown = jQuery(elem);
            //Margin-Left der Spans
            var left = 0;
            var big_dsm = countdown.children('span').css("width") == "20px";
            var coutdownLeft = jQuery(countdown).parent().attr("class").indexOf("qgtv-bottom") != -1;
            var date_now = new Date();
            // Ablaufdatum erzeugen
            var date2 = new Date(ms);
            //Zeitverschiebung anpassen
            //date2.setHours(date2.getHours()-6);
         
            //Differenz zwischen der aktuellen Zeit und der Countdownzeit
            var diff = date2.getTime() - date_now.getTime();
         
         
         
            if (diff > 0) {
                //ganzzahlige Stunden, Minuten und Sekunden ausrechnen
                var hours = (diff - (diff % (1000 * 60 * 60))) / (1000 * 60 * 60);
                diff -= hours * (1000 * 60 * 60);
                var minutes = (diff - (diff % (1000 * 60))) / (1000 * 60);
                diff -= minutes * (1000 * 60);
                var seconds = (diff - (diff % (1000))) / (1000);
                diff -= seconds * (1000);
                hours += "";
                minutes += "";
                seconds += "";
            }
            else {
                hours = "00";
                minutes = "00";
                seconds = "00";
            }
         
            //H,M,S zweistellig machen
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
         
         
            //unter alle Zahlen, die sich verändern ein Layer legen für die Animation
         
            //Stunden
         
            var digit1 = countdown.children('span').eq(0).attr("class").charAt(countdown.children('span').eq(0).attr("class").length - 1);
            var digit2 = countdown.children('span').eq(1).attr("class").charAt(countdown.children('span').eq(1).attr("class").length - 1);
            if (digit1 != hours.charAt(0)) {
                countdown.children('span').eq(7).after('<span class="digit-' + hours.charAt(0) + '" style="position:absolute; opacity:0;"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "10px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "231px"));
                    }
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "307px"));
                }
             
            }
            if (digit2 != hours.charAt(1)) {
                countdown.children('span').eq(7).after('<span class="digit-' + hours.charAt(1) + '" style="position:absolute; opacity:0"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "21px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "242px"));
                    }
                 
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "328px"));
                }
            }
         
            //Minuten
         
            var digit3 = countdown.children('span').eq(3).attr("class").charAt(countdown.children('span').eq(3).attr("class").length - 1);
            var digit4 = countdown.children('span').eq(4).attr("class").charAt(countdown.children('span').eq(4).attr("class").length - 1);
            if (digit3 != minutes.charAt(0)) {
                countdown.children('span').eq(7).after('<span class="digit-' + minutes.charAt(0) + '" style="position:absolute; opacity:0"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "40px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "261px"));
                    }
                 
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "358px"));
                }
             
            }
            if (digit4 != minutes.charAt(1)) {
                countdown.children('span').eq(7).after('<span class="digit-' + minutes.charAt(1) + '" style="position:absolute; opacity:0"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "51px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "272px"));
                    }
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "379px"));
                }
            }
         
            //Sekunden
         
            var digit5 = countdown.children('span').eq(6).attr("class").charAt(countdown.children('span').eq(6).attr("class").length - 1);
            var digit6 = countdown.children('span').eq(7).attr("class").charAt(countdown.children('span').eq(7).attr("class").length - 1);
            if (digit5 != seconds.charAt(0)) {
                countdown.children('span').eq(7).after('<span class="digit-' + seconds.charAt(0) + '" style="position:absolute; opacity:0"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "70px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "291px"));
                    }
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "409px"));
                }
             
            }
            if (digit6 != seconds.charAt(1)) {
                countdown.children('span').eq(7).after('<span class="digit-' + seconds.charAt(1) + '" style="position:absolute; opacity:0;"></span>');
                if (!big_dsm) {
                    if (coutdownLeft) {
                        slideUp.push(countdown.children('span').eq(8).css("left", "81px"));
                    }
                    else {
                        slideUp.push(countdown.children('span').eq(8).css("left", "302px"));
                    }
                 
                }
                else {
                    slideUp.push(countdown.children('span').eq(8).css("left", "430px"));
                }
            }
         
            // Animationslayer einblenden
            jQuery(slideUp).each(function(index, value){
         
                var offset = 0;
                switch (value.css("left")) {
                    case "10px":
                        offset = 0;
                        break;
                    case "231px":
                        offset = 0;
                        break;
                    case "307px":
                        offset = 0;
                        break;
                    case "21px":
                        offset = 1;
                        break;
                    case "242px":
                        offset = 1;
                        break;
                    case "328px":
                        offset = 1;
                        break;
                    case "40px":
                        offset = 3;
                        break;
                    case "261px":
                        offset = 3;
                        break;
                    case "358px":
                        offset = 3;
                        break;
                    case "51px":
                        offset = 4;
                        break;
                    case "272px":
                        offset = 4;
                        break;
                    case "379px":
                        offset = 4;
                        break;
                    case "70px":
                        offset = 6;
                        break;
                    case "291px":
                        offset = 6;
                        break;
                    case "409px":
                        offset = 6;
                        break;
                    case "81px":
                        offset = 7;
                        break;
                    case "302px":
                        offset = 7;
                        break;
                    case "430px":
                        offset = 7;
                        break;
                }
             
                value.animate({
                    opacity: "1"
                }, 500, "swing", function(){
                    //altes Span im Hintergrund umbennenen auf die neue Zahl
                    var span_class = value.attr("class").charAt(value.attr("class").length - 1);
                    countdown.children('span').eq(offset).attr("class", "digit-" + span_class);
                    //Layer, das zur Animation diente entfernen
                    value.remove();
                 
                });
             
            });
            //Funktion jede Sekunde wieder aufrufen, um eine heruntertickende Uhr zu simulieren
            setTimeout(function(){
                de.bild.qgtv.timer(ms, elem);
            }, 1000);
        }
    });
};
/*--------------------------------------------------------------------
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 * Usage example below (see comment "Run the script...").
 --------------------------------------------------------------------*/
//-----DAS HAUPTOBJEKT----------------------------------------------------------------------
var QGTV = new Object();
QGTV.initCustomInput = function(){
    jQuery('.qgtv input').each(function(i){
        if (jQuery(this).is('[type=checkbox],[type=radio]')) {
            var input = jQuery(this);
         
            // get the associated label using the input's id
            var label = jQuery('label[for=' + input.attr('id') + ']');
         
            //get type, for classname suffix
            var inputType = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';
         
            // wrap the input + label in a div
            jQuery('<div class="custom-' + inputType + '"></div>').insertBefore(input).append(input, label);
         
            // find all inputs in this set using the shared name attribute
            var allInputs = jQuery('input[name=' + input.attr('name') + ']');
         
            // necessary for browsers that don't support the :hover pseudo class on labels
            label.hover(function(){
                jQuery(this).addClass('hover');
                if (inputType == 'checkbox' && input.is(':checked')) {
                    jQuery(this).addClass('checkedHover');
                }
            }, function(){
                jQuery(this).removeClass('hover checkedHover');
            });
         
            //bind custom event, trigger it, bind click,focus,blur events
            input.bind('updateState', function(){
                if (input.is(':checked')) {
                    if (input.is(':radio')) {
                        allInputs.each(function(){
                            jQuery('label[for=' + jQuery(this).attr('id') + ']').removeClass('checked');
                        });
                    };
                    label.addClass('checked checkedHover');
                }
                else {
                    label.removeClass('checked checkedHover checkedFocus');
                }
             
            }).trigger('updateState').click(function(){
                jQuery(this).trigger('updateState');
            }).focus(function(){
                label.addClass('focus');
                if (inputType == 'checkbox' && input.is(':checked')) {
                    jQuery(this).addClass('checkedFocus');
                }
            }).blur(function(){
                label.removeClass('focus checkedFocus');
            });
        }
    });
};
/*-------------------------------------------------------------------------------------------
 * QGTV-Frageboxen (QGTV-Aufmacher.html)
 * Erweiterung des oberen JQuery-Scripts
 * Checkbox-Funktionalität auch auf p-Tags
 * Radiobutton-Funktionalität auch auf p-Tags
 -------------------------------------------------------------------------------------------*/
//-----FUNKTIONEN---------------------------------------------------------------------------
//-----FUNKTION:OnClick auf Listenfeld
QGTV.checklistClick = function(){
    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
 
    //wenn Radiobuttons
    if (this.inp.type == "radio") {
 
        //deaktiviere zuerst alle RadioLabels
        this.radios = this.parentNode.parentNode.getElementsByTagName('label');
     
        for (var i = 0; i < this.radios.length; i++) {
            this.radios[i].className = "";
        }
     
        //diesen Radiobox-Label auf "markiert"
        this.classe = 'checked focus';
     
        //diese Radiobox checked
        this.inp.checked = true;
     
    }
    //wenn Checkbox
    else {
        //wenn diese Checkbox markiert
        if (this.inp.checked) {
            //Checkbox-Label auf "nicht markiert"
            this.classe = 'hover';
         
            //Checkbox unchecked
            this.inp.checked = false;
        }
     
        //wenn Checkbox nicht markiert
        else {
            //Checkbox-Label auf "markiert"
            this.classe = 'checkedHover';
         
            //Checkbox checked
            this.inp.checked = true;
        }
    }
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};
//-----FUNKTION:Mausover auf Listenfeld
QGTV.checklistOver = function(){
    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
 
    //wenn Check/Radiobox markiert
    if (this.inp.checked) {
 
        //wenn Radiobuttons
        if (this.inp.type == "radio") {
            //Radio-Label auf markiert
            this.classe = "checked focus";
        }
        else {
            //Checkbox-Label auf "markiert und hover"
            this.classe = "checkedHover";
        }
    }
    //wenn Check/Radiobox nicht markiert
    else {
        //Check/Radiobox-Label auf "hover"
        this.classe = "hover";
    }
 
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};
//-----FUNKTION:Mausout auf Listen feld
QGTV.checklistOut = function(){
    //"this" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Input-Objekt
    this.inp = this.parentNode.getElementsByTagName('input')[0];
 
    //wenn Check/Radiobox markiert
    if (this.inp.checked) {
        //wenn Radiobuttons
        if (this.inp.type == "radio") {
            //Radio-Label auf markiert
            this.classe = "checked focus";
        }
        else {
            //Checkbox-Label auf "markiert"
            this.classe = "checked";
        }
    }
    //wenn Check/Radiobox nicht markiert
    else {
        //Check/Radiobox-Label auf "unbenutzt"
        this.classe = "";
    }
 
    //Checkbox-Labels-Funktion aendern
    QGTV.checkboxClasse(this);
};
//-----FUNKTION:Checkbox-Label aendern
QGTV.checkboxClasse = function(obj){
    //"obj" ist das aktuelle <p>-Tag aus dem HTML
    //das zum <p>-Tag gehörende Label-Objekt bekommt neuen Klassennamen
    obj.parentNode.getElementsByTagName('label')[0].className = obj.classe;
};
//-----EVENTS:Maus- und Focus-Effekte-------------------------------------------------------
QGTV.initEffects = function(){
    //alle ul-Tags der Seite werden durcsucht
    QGTV.checklist = document.getElementsByTagName('ul');
    for (var i = 0; i < QGTV.checklist.length; i++) {
 
        //wenn eine QGTV-Fragebox
        if (QGTV.checklist[i].className.match(/qgtv\-list/)) {
     
            //alle einzelnen Listenelement dieser Fragebox
            QGTV.checkLis = QGTV.checklist[i].getElementsByTagName('li');
         
            //wenn eine QGTV-Fragebox mit Checkbox
            if (QGTV.checklist[i].getElementsByTagName('input').length > 0) {
         
                for (var j = 0; j < QGTV.checkLis.length; j++) {
             
                    with (QGTV.checkLis[j].getElementsByTagName('p')[0]) {
                 
                        //Onclick-Funktionsaufruf
                        onclick = QGTV.checklistClick;
                     
                        //OnMouseover-Funktionsaufruf
                        onmouseover = QGTV.checklistOver;
                     
                        //OnMouseout-Funktionsaufruf
                        onmouseout = QGTV.checklistOut;
                     
                    }
                }
                //wenn eine QGTV-Fragebox ohne Checkbox
            }
            else {
                //den CSS-Cursor ueberschreiben
                for (var j = 0; j < QGTV.checkLis.length; j++) {
                    with (QGTV.checkLis[j].getElementsByTagName('p')[0]) {
                        style.cursor = "default";
                    }
                }
            }
        }
    }
};
QGTV.initialize = function(){
    QGTV.initCustomInput();
    QGTV.initEffects();
};
//-----ENDE QGTV-Frageboxen