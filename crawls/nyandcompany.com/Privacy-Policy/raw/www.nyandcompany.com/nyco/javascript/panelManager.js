/// <reference path="jquery-1.2.6-vsdoc.js" />

if ((typeof(nyco) == 'undefined') || (nyco == null))
{
  var nyco = {};
}

nyco.panelManager = 
{
  
  panels : [],
  
  animationSpeed : 'medium',
  
  panel : function(panelHeader, panelElement, collapsedBackgroundPosition, expandedBackgroundPosition)
  {
    this.panelHeader = $(panelHeader);
    this.panelElement = $(panelElement);
    this.collapsedBackgroundPosition = collapsedBackgroundPosition;
    this.expandedBackgroundPosition = expandedBackgroundPosition;
    this.isExpanded = false;
  },
  
  addPanel : function(panelHeaderId, panelElementId, collapsedBackgroundPosition, expandedBackgroundPosition)
  {
    var panel = new nyco.panelManager.panel($('#' + panelHeaderId), $('#' + panelElementId), collapsedBackgroundPosition, expandedBackgroundPosition);
    
    nyco.panelManager.panels.push(panel);
    
    $(panel.panelHeader).bind('click', panel, function(e)
      {
        var panel = e.data;
        nyco.panelManager.toggle(panel);
      }
    );
  
  },
  
  toggle : function(panel)
  {
    
    if (!panel.isExpanded)
    {
      $(panel.panelElement).show(nyco.panelManager.animationSpeed);
      if (panel.collapsedBackgroundPosition != null)
      {
        $(panel.panelHeader).css('background-position', panel.collapsedBackgroundPosition);
      }
      panel.isExpanded = true;
    }
    else
    {
      $(panel.panelElement).hide(nyco.panelManager.animationSpeed);
      if (panel.collapsedBackgroundPosition != null)
      {
        $(panel.panelHeader).css('background-position', panel.expandedBackgroundPosition);
      }      
      panel.isExpanded = false;
    }
    
  }
  
}
