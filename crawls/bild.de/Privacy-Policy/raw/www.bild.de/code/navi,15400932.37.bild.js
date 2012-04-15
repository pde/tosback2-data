
/*navi:15400932.37*/

/**
* Die navi.js ist zuständig für die DHTML-Effekte der Hauptnavigation
* Sie gehört unmittelbar unter das HTML der Hauptnavigation, wodurch eine schnelle Funktionalität gewährleistet ist
* @version 2.0 - auf jQuery umgestellt
* @author Ramon 02/2011
*  
*/

if (de.bild.sso) de.bild.sso.init();

//die Navi gehört zum Hauptobjekt
var de = de || {};
de.bild = de.bild || {};
//die Navifunktion ist anonym und selbstausführend
de.bild.nav = (function($){
    // jQuery nicht vorhanden?
    if (!$) {
        throw('jQuery nicht übergeben oder vorhanden');
        return;
    }
    
 // Logo aufstellen
 function initLogo(){
         // Logo Elemente   
        // Sind wir auf Home? Logo sollte nur auf der Homepage aufklappen
        var _isHome = isHome(),
        logo = $('#logo');
        
        if (_isHome) {
        
            var _firstA = logo.find('a').first(), 
            _lastA = logo.find('a').last(), 
            _firstUL = logo.find('ul').first();
            
            // Logo zuklappen
            _firstUL.removeClass('active');
            
            logo.mouseenter(function(e, fromFocus){
                // besonders für IE6, weil es erst nach einigen Sekunden erkennt, dass das DOM aktualisiert worden ist
                // IE6 mag auch nicht, das gecachte Element, deshalb durchqueren wir noch mal das Logo-Objekt           
                setTimeout(function(){
                    logo.find('ul').first().addClass('active');
                }, 10);
                
            }).mouseleave(function(e){
                setTimeout(function(){
                    _firstUL.removeClass('active');
                }, 10);
            })  // Tabulator 
            // Wir vergewissern uns, dass Logo offen bleibt, während dessen Kinderelemente Fokus haben 
            .find('a').focusin(function(e, fromFocus){
                logo.trigger('mouseover', [true]);
            });
        } // endif
        
            // von navi.js 1.0 - Logo zuklappen, wenn man auf die Nachbarn landet
            // vorwärts, bzw nach dem Logo
            $('#service').focusin(function(){
                logo.trigger('mouseleave', [true]);         
            });
            // rückwärts, bzw vor dem Logo
            $('body a:eq(1)').focusin(function(){
                logo.trigger('mouseleave', [true]);
            });  
  
 }
 
    // Die Navi aufstellen
    function initNavi(){
         
  
        // Event Elemente
        $('#event > li').mouseenter(function(e){
            $(this).has('span').addClass('active').has('img').animate({
                height: 60
            }, 50);
        }).mouseleave(function(e){
            $(this).has('span').removeClass('active').has('img').animate({
                height: 15
            }, 50);
        })  // Tabulator 
        .find('a').focusin(function(){
            $(this).parent('li').trigger('mouseenter');
        }).focusout(function(){
            $(this).parent('li').trigger('mouseleave');
        });
        
       
        // lvl2 Elemente
        var lvl2 = $('#lvl2 > li'),
  
  // Aktuelles Element speichern und markieren
  _aktSeite = lvl2.filter('li.current');
  _aktSeite.data('current',true);
  
        lvl2.each(function(index){
            var _self = $(this), _selfLeft = _self.position().left, _selfWidth = _self.innerWidth(), _anzeige = _self.find('span.mark');
            
            // von navi.js 1.0 - fuer IE6 eine CSS-Ausbesserung?
            _anzeige.css({
                'width': _selfWidth
            });
            
            _self.mouseenter(function(e, fromFocus){
            
                // Andere li.actives entfernen  
                // Bei der Unterbrechung des Tabulators wird alles zurückgesetzt            
                $('#lvl2 li.active').removeClass('active');
                
                //wenn Untermenü (3.Level) vorhanden, className = active else className = current               
                if (_self.has('ol.lvl3').length) {
                    _self.addClass('active');
                }
    
                else  {
                    _self.addClass('current');
                }
                
                // anziege show
                if (_anzeige.length > 0) {
     _anzeige.show();
                   // _anzeige.removeClass = 'hide';
                }
                
            }).mouseleave(function(e, fromFocus){
                if (_self.has('ol.lvl3').length) {
                    _self.removeClass('active');
                }
    // else if Element die aktuelle Seite NICHT ist
                 else if (!_self.data('current')) {
                    _self.removeClass('current');
                }
                // anziege hide
                if (_anzeige.length > 0) {
     _anzeige.hide();
                   // _anzeige.addClass = 'hide';
                }
            });
            
            
        // Dimensionvariablen, mit denen wir die 'lvl-alt' Klasse zuordnen
            var _navWidth = $('#nav').outerWidth(),
            _ollvl3 = _self.find('ol.lvl3'), 
            _lvl3LiWidth = _ollvl3.outerWidth(),
            _ollvl4 = _ollvl3.find('ol.lvl4');
           
            
           // die Position der Level3Elemente setzen
            // wird ausgelöst, wenn die x-Position des Elements höher als die Navibreite minus die Breite von einem Level3Element ist.
            // wenn lvl2 ein lvl3 hat
            if (_ollvl3.length > 0) {
                if (_selfLeft <= _navWidth && _selfLeft >= (_navWidth - _lvl3LiWidth)) {
                    _ollvl3.addClass('lvl-alt');
                }    
            }
            // wenn lvl3 ein lvl4 hat
            if (_ollvl4.length > 0) {
            // die Position der Level4Elemente setzen
                // wird ausgelöst,wenn die x-Position des Elements höher als die Navibreite minus die Breite von zwei Level3Elementen ist.
                if (_selfLeft <= _navWidth && _selfLeft >= (_navWidth - (_lvl3LiWidth * 2))) {
                    _ollvl4.addClass('lvl-alt');
                }
            }     
        });
        
        
        // lvl3 & lvl4 Elemente
        var lvl3 = $('#lvl2 ol.lvl3 li');
        lvl3.each(function(index){
            var _self = $(this);
            // alle letzen Kinder bekommen die Klasse 'last'
            // damit wir Bescheid wissen, wo der Tabulator steht.
            if (_self.is(':last-child')) {
                _self.addClass('last');
            }
            _self.mouseenter(function(e, fromFocus){
                _self.addClass('active');
            }).mouseleave(function(e, fromFocus){
                _self.removeClass('active');
            });
        });
        
        
        /**
     * Der Tabulator (Opera unterbunden)
     * Das entsprechende Mausereignis wird bei fokussierten Navielementen ausgeführt.
     *   */
        if (!$.browser.opera) {
        
            // Verhalten der lvl2 a Tags
            $('#lvl2 > li > a').each(function(index){
                // Objekte cachen
                var _self = $(this), _selfParent = _self.parent('li'), _selfHasKids = _self.next('ol.lvl3').length;
                // Alle fokussierten Objekte bekommen die 'hasFocus' Eigenschaft, damit wir wissen, auf welchem Element wir stehen.
                _self.data('hasFocus', false).focusin(function(e){
                    // Wir unterscheiden zwischen einem vom Tabulator ausgelöstenund einem Maus ausgelösten Ereignis
                    // vom Tabulator === true
                    // alle bisher offenen Elemente zuklappen (ie - vorwärts)
                    $('#lvl2 > li.active ol.lvl3 > li.active').removeClass('active');
                    _selfParent.trigger('mouseenter', [true]);
                    _self.data('hasFocus', true);
                }).focusout(function(){
                    if (_selfHasKids < 1) {
                        _selfParent.trigger('mouseleave', [true]);
                    }
                    _self.data('hasFocus', false);
                });
            });
            
            // Verhalten der lvl3 a Tags
            $('#lvl2 ol.lvl3 > li > a').each(function(index){
                // Objekte cachen
                var _self = $(this), _selfParent = _self.parent('li'), _selfHasKids = $(this).next('ol.lvl4').length;
                _self.data('hasFocus', false).focusin(function(e){
                    // alle bisher offenen Elemente zuklappen (vorwärts)
                   $('#lvl2 > li.active ol.lvl3 > li.active').removeClass('active');
                    // aktuelles Element aktivieren             
                    _selfParent.addClass('active');
                    _self.data('hasFocus', true);
                }).focusout(function(e){
                    // Wenn das lvl3 Object keinen lvl4 hat, Klasse entnehmen
                    if (_selfHasKids < 1) {
                        _selfParent.removeClass('active');
                    }
                    // Wenn wir auf dem letzten lvl3 Element, das lvl2 Parentelements bliebt offen (rückwärts)
                     if (_selfHasKids > 1 && _selfParent.hasClass('last') && _self.data('hasFocus')) {
                        return;
                     }
                    _self.data('hasFocus', false);
                });
            });
            
            // Verhalten der lvl4 a Tags
            $('#lvl2 ol.lvl4 > li > a').each(function(index){
                // Objekte cachen
                var _self = $(this), _selfParent = _self.parent('li');
                _self.data('hasFocus', false).focusin(function(e){
                    // aktuelles Elements aktiviert  
                    _selfParent.addClass('active');
                    _self.data('hasFocus', true);
                }).focusout(function(e){
                    // Wenn wir auf dem letzten lvl4 Element, das lvl3 Parentelements bliebt offen (rückwärts)
                    if (_selfParent.hasClass('last') && _selfParent.parents('li.active').hasClass('last') && _self.data('hasFocus')) {
                        return;
                    }
                    
                    // aktuelles Element deaktivieren
                    _selfParent.removeClass('active');
                    _self.data('hasFocus', false);
                });
            });
            
            
            // von navi.js 1.0 - Schließen des letzten Menüs auf erstem Focus außerhalb der Navi
            $('#contentWrapper').focusin(function(){
                $('#lvl2 li.active').trigger('mouseleave', [true]);
            });
            // wenn es einen Breadcrumb vor dem contentWrapper gibt
            $('#breadcrumb').focusin(function(){
                $('#lvl2 li.active').trigger('mouseleave', [true]);
            });
            
        }
   
   
    }; // end initNavi();
 
   // Sind wir auf der Homepage? Home sollte die Klasse 'current' haben
   function isHome() {
        // und nicht auf der Videobuehne
        if ($('body#video').length > 0) {
            return false;
        } else if ($('#lvl2 > li:first-child').hasClass('current') ) {
            return true;
        }
        return false;
    }
 
// INIT
        initNavi();



    // Falls irgendwo die Navi wieder aufgestellt werden muss
    return {
        init: function(){
            initNavi();
        }
    }
    
 // jQuery unserer Funktion übergeben
}(jQuery));