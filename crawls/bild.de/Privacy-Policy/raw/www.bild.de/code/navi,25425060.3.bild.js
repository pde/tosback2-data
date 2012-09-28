
/*navi:25425060.3*/

﻿/**
* Die navi.js ist zuständig für die DHTML-Effekte der Hauptnavigation
* Sie gehört unmittelbar unter das HTML der Hauptnavigation, wodurch eine schnelle Funktionalität gewährleistet ist
* @version 2.0 - auf jQuery umgestellt
* @author Ramon 02/2011
*  
*/


// sso
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
    

    // Die Navi aufstellen
    function initNavi(){
        // lvl2 Elemente
        var lvl1 = $('#lvl1 > li'),
		
		// Aktuelles Element speichern und markieren
		_aktSeite = lvl1.filter('li.current');
		_aktSeite.data('current',true);
		
        lvl1.each(function(index){
            var _self = $(this), _selfLeft = _self.position().left, _selfWidth = _self.innerWidth(), _anzeige = _self.find('span.mark');
            
            // von navi.js 1.0 - fuer IE6 eine CSS-Ausbesserung?
            _anzeige.css({
                'width': '_selfWidth'
            }); 
            
            
            _self.mouseenter(function(e, fromFocus){
                // Andere li.actives entfernen  
                // Bei der Unterbrechung des Tabulators wird alles zurückgesetzt            
                $('#lvl1 li.active').removeClass('active');
                
                //wenn Untermenü (2.Level) vorhanden, className = active else className = current               
                if (_self.has('ol.lvl2').length) {
                    _self.addClass('active');
                }
				
                else  {
                    _self.addClass('current');
                }
                
                // anziege show
                if (_anzeige.length > 0) {
					_anzeige.show();
                }
                
                
            }).mouseleave(function(e, fromFocus){
                if (_self.has('ol.lvl2').length) {
                    _self.removeClass('active');
                }
				// else if Element die aktuelle Seite NICHT ist
                 else if (!_self.data('current')) {
                    _self.removeClass('current');
                }
                // anziege hide
                if (_anzeige.length > 0) {
					_anzeige.hide();                   
                }
                
            });
            
            
        // Dimensionvariablen, mit denen wir die 'lvl-alt' Klasse zuordnen
            var _navWidth = $('nav').outerWidth(),
            _ollvl2 = _self.find('ol.lvl2'), 
            _lvl2LiWidth = _ollvl2.outerWidth(),
            _ollvl3 = _ollvl2.find('ol.lvl3');
           
            
           // die Position der Level2Elemente setzen
            // wird ausgelöst, wenn die x-Position des Elements höher als die Navibreite minus die Breite von einem Level2Element ist.
            // wenn lvl1 ein lvl2 hat
            if (_ollvl2.length > 0) {
                if (_selfLeft <= _navWidth && _selfLeft >= (_navWidth - _lvl2LiWidth)) {
                    _ollvl2.addClass('lvl-alt');
                }    
            }

            // wenn lvl2 ein lvl3 hat
            if (_ollvl3.length > 0) {
            // die Position der Level3Elemente setzen
                // wird ausgelöst,wenn die x-Position des Elements höher als die Navibreite minus die Breite von zwei Level2Elementen ist.
                if (_selfLeft <= _navWidth && _selfLeft >= (_navWidth - (_lvl2LiWidth * 2))) {
                    _ollvl3.addClass('lvl-alt');
                }
            }     
        });
        
        
        // lvl2 & lvl3 Elemente
        var lvl2 = $('#lvl1 ol.lvl2 li');
        lvl2.each(function(index){
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
        
            // Verhalten der lvl1 a Tags
            $('#lvl1 > li > a').each(function(index){
                // Objekte cachen
                var _self = $(this), _selfParent = _self.parent('li'), _selfHasKids = _self.next('ol.lvl2').length;
                // Alle fokussierten Objekte bekommen die 'hasFocus' Eigenschaft, damit wir wissen, auf welchem Element wir stehen.
                _self.data('hasFocus', false).focusin(function(e){             	
                    // Wir unterscheiden zwischen einem vom Tabulator ausgelöstenund einem Maus ausgelösten Ereignis
                    // vom Tabulator === true
                    // alle bisher offenen Elemente zuklappen (ie - vorwärts)
                    $('#lvl1 > li.active ol.lvl2 > li.active').removeClass('active');
                    $('#lvl1 > li.active ol.lvl2 > li:eq(0)').focus();
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
            $('#lvl1 ol.lvl2 > li > a').each(function(index){
                // Objekte cachen
                var _self = $(this), _selfParent = _self.parent('li'), _selfHasKids = $(this).next('ol.lvl3').length;
                _self.data('hasFocus', false).focusin(function(e){
                    // alle bisher offenen Elemente zuklappen (vorwärts)
                   $('#lvl1 > li.active ol.lvl2 > li.active').removeClass('active');
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
            $('#lvl1 ol.lvl3 > li > a').each(function(index){
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
                $('#lvl1 li.active').trigger('mouseleave', [true]);
            });
            // wenn es einen Breadcrumb vor dem contentWrapper gibt
            $('#breadcrumb').focusin(function(){
                $('#lvl1 li.active').trigger('mouseleave', [true]);
            });
            

        }
			
			
    }; // end initNavi();
 

   // Sind wir auf der Homepage? Home sollte die Klasse 'current' haben
   function isHome() {
   	    // und nicht auf der Videobuehne
        if ($('body#video').length > 0) {
            return false;
        } else if ($('#lvl1 > li:first-child').hasClass('current') ) {
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
}(jQuery.noConflict()));
