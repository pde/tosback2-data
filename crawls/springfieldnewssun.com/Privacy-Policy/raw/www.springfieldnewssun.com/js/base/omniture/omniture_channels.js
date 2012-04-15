/*
 * omniture_channels.js
 * 
 * Encapsulates logic required to produce channel and hierarchy information for Omniture processing.
 * Created: 3/1/2009
 * Author: Kevin Crenshaw
 * 
 */

var COXNET_ChannelsAndHierarchies = function(path, title, site, sectionOrArticle, fourZeroFour, marketPath, regionPath)
{
  if ( fourZeroFour == null || fourZeroFour == "" )
  {
    fourZeroFour = "false";
  }
  this.context = path;
  this.title = title;
  this.pageNotFound = fourZeroFour;
  this.siteName = site;
  this.sectionOrArticle = sectionOrArticle;
  this.marketPath = marketPath;
  this.regionPath = regionPath;

  this.getFirstPathElement = function()
  {
    var peArr = this.getPathElements();
    var pageElement = peArr[0] == null || peArr[0] == "" ? "homepage" : peArr[0];
    return pageElement.toUpperCase();
  };
  
  this.getChannel = function()
  {
    var chan = "";
    if ( this.pageNotFound == "false" )
    {
      chan = this.siteName + " | " + this.getFirstPathElement();
    }
    return chan;
  };

  this.getPageName = function()
  {
    return this.siteName + " | " + this.title;
  };

  this.getFirstSubChannel = function()
  {
    var subChanArr = this.getSubChannels();
    var firstSubChan = ""; 
    if ( subChanArr[0] != null && subChanArr.length > 1 )
    {
      firstSubChan = this.getChannel() + " | " + subChanArr[0]; 
    }
    return firstSubChan;
  };
  
  this.getSecondSubChannel = function()
  {
	var subChanArr = this.getSubChannels();
	var secondSubChan = "";
	if ( subChanArr[1] != null && subChanArr.length > 2 )
    {
      secondSubChan = this.getFirstSubChannel() + " | " + subChanArr[1]; 
    }
	return secondSubChan;  
  };

  this.getHierarchyOne = function()
  {
    var h1 = "";
    if ( this.marketPath != null && this.marketPath != "" )
    {
      h1 = this.marketPath + this.getHierarchyThree();
    }
    return h1;
  };

  this.getHierarchyTwo = function()
  {
    return this.regionPath + this.getHierarchyThree();
  };

  this.getHierarchyThree = function()
  {
    var h3 = this.siteName + " | " + this.getFirstPathElement();
    var subChannelsArr = this.getSubChannels();
    if( subChannelsArr.length > 1 )
    {
      subChannelsArr[subChannelsArr.length -1] = this.sectionOrArticle + "_" + subChannelsArr[subChannelsArr.length - 2]; 
    } else {
      subChannelsArr[subChannelsArr.length -1] = this.sectionOrArticle + "_" + this.getFirstPathElement();
    }
    for ( var z = 0; z < subChannelsArr.length; z++)
    {
      if ( subChannelsArr[z] != null )
      {
        h3 = h3 + " | " + subChannelsArr[z];
      }
    }
    return h3;
  };

  this.getPathElements = function()
  {
    if ( this.context == null )
    {
      return null;
    }
    
    //Split the path into an array of Strings.
    var lastChar = this.context.substring(this.context.length - 1);
    if( lastChar == "/" )
    {
      this.context = this.context.substring(0, this.context.length - 1);
    }
    var firstChar = this.context.substring(0, 1);
    if( firstChar == "/" )
    {
      this.context = this.context.substring(1, this.context.length);
    }
  
    //Adjust for Topics
    var pathArr = this.context.split("/");
    if( pathArr[0] == 'system' )
    {
      pathArr[0] = 'topics';
    }
    
    var y = 0;
    var elements = new Array();
    for( var z = 0; z < pathArr.length; z++ )
    {
      if( pathArr[z] != 'topicRoot' )
      {
        elements[y++] = pathArr[z];
      }   
    }
    return elements;
  };
  
  this.getSubChannels = function()
  {
    var subChannels = new Array();
    var pElementsArr = this.getPathElements();
    
    if ( pElementsArr != null && pElementsArr.length > 1 )
    {
      var i = 0;
      var j = 0;
      for( i = 1; i < pElementsArr.length; i++ )
      {
        if ( pElementsArr[i] != "" && pElementsArr[i] != null )
        {
          subChannels[j++] = pElementsArr[i];
        }
      }
      //Adjust for Zest CMSO-2197
      var lastEl = subChannels[subChannels.length - 1]; 
      if ( lastEl != null )
      {
        subChannels[subChannels.length - 1] = lastEl.replace("zest", "tool");
      }
    }
    subChannels[subChannels.length] = sectionOrArticle;
    return subChannels;
  };
};