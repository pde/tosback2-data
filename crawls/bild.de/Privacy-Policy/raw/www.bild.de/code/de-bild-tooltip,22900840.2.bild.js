
/*de.bild.tooltip:22900840.2*/

var de=de || {};
de.bild = de.bild || {};
de.bild.tooltip = (function($){
    var $doc,
 // Anzeige Tips (Altlast-Code)
 $toolTips,
 // schon eingebautes div #tooltip
 //$toolTipAnzeige,
 
 // neue verbesserte Version! titleTips
 $titleTips,
 
 // Element is schon von server gerendert?
 $tooltipContainer,
 // ToolTip ist unsichtbar?
 toolTipHidden = true;
    /**
     * Sets the position of the tooltip
     * @function
     * @name positionToolTip
     * @memberOf de.bild.tooltip
     * @private
     */ 
    function positionToolTip($container, x, y){
  $container.css({
   top: y + 5,
   left: x + 10
  });
  if (toolTipHidden === true) {
   $container.show();
   toolTipHidden = false;
  }
 };
 
    /**
     * Tooltip einblenden und der Maus folgen
     * @function
     * @name showToolTip
     * @memberOf de.bild.tooltip
     * @private
     */ 
    function showToolTip($el,$container){
  $el = $el || null;
  if (toolTipHidden === true) {
   $container.show();
   toolTipHidden = false;
  }
  $el.mousemove(function(e){
   positionToolTip($container, e.pageX, e.pageY);
  });
  return toolTipHidden;
 };
    /**
     * Tooltip ausblenden und das Maus-Event dazu toeten
     * @function
     * @name hideToolTip
     * @memberOf de.bild.tooltip
     * @private
     */ 
    function hideToolTip($el,$container){
        //setTimeout(function(){
            //$container.removeClass('show');
   $container.hide();
   $el.unbind('mousemove');
         //},100);
  
        
        toolTipHidden = true;
        return toolTipHidden;
    }; 
    function insertContainer(){
     if ($('#ttipwrapper').length === 0) {
      $tooltipContainer = $('<div id="ttipwrapper" />'); 
   $('body').append($tooltipContainer);
   return true;
  }
  return false;
    };
    /**
     * @function
     * @name init
     * @memberOf de.bild.tooltip
     * @private
     */ 
 function init(){
  
  insertContainer();
  // title tips
  $titleTips = $('#contentWrapper a.title-tip');
  
  // anziege tips
  $toolTips = $('#contentWrapper a.tooltip');
  
  //altTips
  $altTips = $('#contentWrapper a.altTip');
  
  // Die alten Tooltips
  if ($toolTips.length) {
   // Community verwendet auch die Klasse 'tooltip' aber in einem voellig unterschiedlichen Weg
   // Deswegen wollen wir Elemente mit 'em' Tags auslassen
   $toolTips.each(function(){
    var $this = $(this);
    $this.data('tipContent', 'Anzeige');
    if ($this.find('em').length === 0) {
     $this.mouseover(function(e){
      e.preventDefault();
      $tooltipContainer.html($this.data('tipContent'));
      positionToolTip($tooltipContainer, e.pageX, e.pageY);
      showToolTip($this, $tooltipContainer);
     }).mouseout(function(e){
      hideToolTip($this, $tooltipContainer);
     });
    }
   });
  }
  
  if ($titleTips.length) {
   
   $titleTips.each(function(){
    var $this = $(this), $span = $this.find('span.quickinfo');
    $this.mouseover(function(e){
     e.preventDefault();
     $tooltipContainer.html($span.html());
     positionToolTip($tooltipContainer, e.pageX, e.pageY);
     showToolTip($this, $tooltipContainer);
    }).mouseout(function(e){
     hideToolTip($this, $tooltipContainer);
    });
    
   });
  }
  // wir brauchen hier die Styles zu aktualisieren
  // #altTip wird zum #ttipwrapper.altTip
  if ($altTips.length) {
   $altTips.each(function(){
    var $this = $(this), $img = $this.find('img:first');
    $this.data('tipContent', $img.attr('alt'));
    
    $this.mouseover(function(e){
     e.preventDefault();
     $tooltipContainer.html($this.data('tipContent'));
     $tooltipContainer.addClass('altTip');
     positionToolTip($tooltipContainer, e.pageX, e.pageY);
     showToolTip($this, $tooltipContainer);
    }).mouseout(function(e){
     hideToolTip($this, $tooltipContainer);
     $tooltipContainer.removeClass('altTip');
    });
    
   });
  }
  return $toolTips.add($titleTips).add($altTips);
 };
 
 return {
  'init' : function(){
   return init();
  }
 }
   
}(jQuery));