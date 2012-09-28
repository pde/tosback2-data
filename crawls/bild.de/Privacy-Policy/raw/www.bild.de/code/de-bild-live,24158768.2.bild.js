
/*de.bild.live:24158768.2*/

//
var de = de || {};
de.bild = de.bild || {};
de.bild.live = (function($) {
 var settings = {
  'autoRefresh' : 10000,
  'refreshButton' : 'a.refresh',
  'loadNextOffset' : 500,
  'refreshTimeout' : 5000,
  'loadingScreen' : '<li id="tickerInitToken">bitte Warten</li>',
  'viewCommentList' : 'elementListJson',
  'viewCommentCount' : 'elementCountJson',
  'noMessage' : '<em> Keine neuen Meldungen </em>'
 }
 
 var liveticker, autoRefresh,clickTimeout = true, newMessages=0,content,elementCount=0;
 function Liveticker($elem) {
  //singleton
  if(liveticker) {
   return liveticker;
  }
  liveticker = this;
  liveticker.$elem = $elem;
  liveticker.content = $elem.find('ol');
  liveticker.$refreshButton = $elem.find(settings.refreshButton);
  liveticker.$newMessages = liveticker.$refreshButton.siblings('em');
  //set Interval for getting amount of new messages
  autoRefresh = setInterval(function() {
   updateTicker(false);
  }, settings.autoRefresh);
  elementCount = liveticker.$elem.find('li').size();
  //falls nachträgliche Initialisierung gesetzt ist
  if(liveticker.$elem.find('li.hide')) {
   var loadingToken = $(settings.loadingScreen);
   liveticker.$elem.find('li.hide').first().before(loadingToken);
   //load next x Elements on scroll t.b.d.
   initNextItem();
   $(window).on("scroll.liveticker touchmove.liveticker", initNextItem);
  }
  //replace Content when clicked on refresh
  $('body').on('click', 'div.liveticker a.refresh', function(e) {
   e.preventDefault();
   if(clickTimeout) {
    clickTimeout = false;
    //avoid to many refreshes
    setTimeout(function() {
     clickTimeout = true;
    }, settings.refreshTimeout);
    updateTicker(true);
   }
  });
  return Liveticker;
 };
 //get number of new messages (JSON)
 /**
   * @param {Boolean} refresh - flag that distinguishes between a refresh and new message - request
   */
 function updateTicker(refresh) {
  clearInterval(autoRefresh);
  var obj = liveticker.$refreshButton[0];
  if(!refresh) {
   //change view for CommentCount Request
   obj.href = obj.href.replace(settings.viewCommentList, settings.viewCommentCount);
  } else {
   //change view for CommentCount Request
   obj.href = obj.href.replace(settings.viewCommentCount, settings.viewCommentList);
  }
  de.bild.httpFist.load({
   'obj' : obj,
   'dataType' : 'json',
   'callback' : function(response) {
    var html = response.html;
    //aktualisieren des Timestamps
    if(refresh && html) {
     //neuen Inhalt setzen
     //nur ersetzen, falls sie was geändert hat
     var clone =liveticker.content.clone();
     clone.find('.vjs-time-control').remove();
     
     if(clone.text().trim() != $(html).text().trim()) {      
      liveticker.content.empty().html(html);
      
      
      //FadeIn Effekt für neue Elemente - funktioniert nur zum Teil
      var tCount = liveticker.$elem.find('li').size();
      var dif = tCount- elementCount;      
      if(dif > 0){
       //liveticker.$elem.find('li:lt('+dif+')').hide().fadeIn('slow');
      }
      
      //loadingToken setzen
      liveticker.$elem.find('li.hide').first().before(settings.loadingScreen);
      de.bild.init(liveticker.$elem);
      initNextItem();
     }
     //neue Nachrichten zurücksetzen
     setMessageStatus(settings.noMessage);
     //timestamp aktualisieren
     if( typeof (parseInt(response.timestamp)) == 'number') {
      var aktTimestamp = liveticker.$refreshButton[0].href.match(/timestamp=[0-9]+/);
      if(aktTimestamp) {
       liveticker.$refreshButton[0].href = liveticker.$refreshButton[0].href.replace(aktTimestamp, 'timestamp=' + response.timestamp);
      }
     }
    } else {
     //Statusmeldung anpassen
     setMessageStatus(html);
    }
    //Intervall anwerfen
    autoRefresh = setInterval(function() {
     updateTicker(false);
    }, settings.autoRefresh);
   }
  });
 };
 function setMessageStatus(messages) {
  var messages = $(messages).text();
  if(messages && $.trim(liveticker.$newMessages.text()) != $.trim(messages)) {
   liveticker.$newMessages.stop(true, true).hide().empty().text(messages).fadeIn();
  }
 };
 function initNextItem() {
  
  var loadingToken = $('#tickerInitToken');
  
  if(loadingToken.size()>0 
   && $(document).scrollTop() + settings.loadNextOffset + window.screen.availHeight >= loadingToken.position().top 
   && loadingToken.position().top > 0) {
   var nextLi = loadingToken.next('li.hide'); 
   nextLi.removeClass('hide');
   loadingToken.remove();
   de.bild.init(nextLi);
   
   if(liveticker.$elem.find('li.hide').size() > 0) {
    liveticker.$elem.find('li.hide').first().before(settings.loadingScreen);
    initNextItem();
   }
  }
 }
 return {
  'init' : function($liveticker) {
   
   //Caching deaktivieren
   $.ajaxSetup({ cache: true });
   if($liveticker.length) {
    return new Liveticker($liveticker);
   }
   return false;
  },
  'getLiveTicker' : function() {
   if(liveticker) {
    return liveticker;
   }
   return null;
  },
  'stopAutoRefresh' : function() {
   return clearInterval(autoRefresh);
  },
  'startAutoRefresh' : function() {
   autoRefresh = setInterval(function() {
    updateTicker(false);
   }, settings.autoRefresh);
   return autoRefresh;
  }
 };
})(jQuery); 