function init()
{var page_links=document.getElementsByTagName('A');if(page_links.length>0)
{var loc=window.location.toString();var pos=loc.indexOf("/p/");if(pos>0)
{start=pos+3;stop=loc.indexOf("/",start);if(stop<=0)
stop=loc.length;var prods=loc.substring(start,stop);for(i=0;i<page_links.length;i++)
{page_links[i].href=page_links[i].href+"/p/"+prods;}}}}
YAHOO.util.Event.onDOMReady(init);