/// <reference path="jquery-1.2.6-vsdoc.js" />

if ((typeof(nyco) == 'undefined') || (nyco == null))
{
  var nyco = {};
}

nyco.tabManager = 
{
  
  tabSets : [],
  
  tab : function(tabSetId, tab, tabPanel)
  {
    this.tabSetId = tabSetId;
    this.tab = tab;
    this.tabPanel = tabPanel;
    this.selected = false;
  },
  
  loadTabs : function(tabSetId, tabSelector)
  {
    var tabElements = $(tabSelector);
    var tabSet = [];
    
    tabElements.each(function(index) 
      {
        this.href = 'javascript:void(0);';
        var tabObject = new nyco.tabManager.tab(tabSetId, this, document.getElementById(this.rel));
        
        tabSet.push(tabObject);
        if (index == 0)
        {
          nyco.tabManager.activateTab(tabObject);
        }
      }
    );
    
    nyco.tabManager.tabSets[tabSetId] = tabSet;
    
    jQuery.each(tabSet, function(index, tabObject) 
      {
        $(tabObject.tab).bind('click', tabObject, function(e)
          {
            var tabObject = e.data;
            nyco.tabManager.deactivateTab(tabObject.tabSetId);
            nyco.tabManager.activateTab(tabObject);
          }
        );
      }
    );
  
  },
  // Overloaded for customer service pages
	  loadTabs2 : function(tabSetId, tabSelector,selIndex)
  { 
    var tabElements = $(tabSelector);
    var tabSet = [];
    
    tabElements.each(function(index) 
      {
        this.href = 'javascript:void(0);';
        var tabObject = new nyco.tabManager.tab(tabSetId, this, document.getElementById(this.rel));
        
        tabSet.push(tabObject);
		
        if ((selIndex == null && index == 0) || selIndex==this.rel)
        { 
		 tabObject.selected = true;
        }
      }
    );
    
    nyco.tabManager.tabSets[tabSetId] = tabSet;
    
    jQuery.each(tabSet, function(index, tabObject) 
      {
        $(tabObject.tab).bind('click', tabObject, function(e)
          {
            var tabObject = e.data;
            nyco.tabManager.deactivateTab(tabObject.tabSetId);
            nyco.tabManager.activateTab(tabObject);
          }
        );
      }
    );
  
  },
  
  activateTab : function(tabObject)
  {
    tabObject.selected = true;
    
    var parent = $(tabObject.tab).parent().get(0);
    if (!jQuery.className.has(parent.className, 'selected'))
    {
      $(parent).addClass('selected');
      $(tabObject.tabPanel).addClass('selected');
    }
  },
  
  deactivateTab : function(tabSetId)
  {
    jQuery.each(nyco.tabManager.tabSets[tabSetId], function(index, tabObject) 
      {
        if (tabObject.selected)
        {
          var parent = $(tabObject.tab).parent().get(0);
          $(parent).removeClass('selected')
          $(tabObject.tabPanel).removeClass('selected');
        }
      }
    );
  }

}
