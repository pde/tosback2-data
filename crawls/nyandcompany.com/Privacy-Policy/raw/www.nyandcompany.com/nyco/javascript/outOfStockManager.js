/// <reference path="jquery-1.2.6-vsdoc.js" />

if ((typeof(nyco) == 'undefined') || (nyco == null))
{
  var nyco = {};
}

nyco.outOfStockManager = 
{
  
  anchors : [],
  
  fadeInSpeed : 500,
  
  fadeOutSpeed : 100,
  
  topOffset : -2,
  
  leftOffset : 15,
  
  load : function(selector, outOfStockElementSelector)
  {
    nyco.outOfStockManager.anchors = $(selector);
    
    var outofstockElement = $(outOfStockElementSelector);
    
    nyco.outOfStockManager.anchors.bind('mouseenter', function()
      {
        var hoverItem = $(this);
        outofstockElement.appendTo(hoverItem);
        outofstockElement.css('top', nyco.outOfStockManager.topOffset);
        outofstockElement.css('left', nyco.outOfStockManager.leftOffset);
        outofstockElement.fadeIn(nyco.outOfStockManager.fadeInSpeed);
      }
    );
    
    nyco.outOfStockManager.anchors.bind('mouseleave', function()
      {
        outofstockElement.appendTo($(document.body));
        outofstockElement.hide();
      }
    );
  }

}