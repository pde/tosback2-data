
$(document).ready(function(){if(PageParameters.LeftNavigationFlyoutEnabled==true){function cmTagOnHover(){if(PageParameters.parentCategoryName==='Department'){cmCreatePageElementTag(PageParameters.categoryName+'s Brands','Left Nav Flyout');}
else{cmCreatePageElementTag(PageParameters.parentCategoryName+'s '+PageParameters.categoryName+' Brands','Left Nav Flyout');}}
function showFlyoutLink(){$('#flyout-hover-link').addClass('flyout-link-hovered');$('#left-nav-flyout-outer').css('visibility','visible');cmTagOnHover();}
function hideFlyoutLink(){$('#flyout-hover-link').removeClass('flyout-link-hovered');$('#left-nav-flyout-outer').css('visibility','hidden');}
if(typeof PageParameters.tto.disableFlyoutNavigation==='undefined'){var hoverConfig={over:showFlyoutLink,timeout:1000,out:hideFlyoutLink};$('#flyout-hover-link').hoverIntent(hoverConfig);}}});