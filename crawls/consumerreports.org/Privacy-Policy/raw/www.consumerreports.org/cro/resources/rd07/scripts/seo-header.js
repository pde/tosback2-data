var overItemOrMenu = 0;
var carPage = 0;
var thisURL = document.location.href;
if(thisURL.indexOf('/cro/cars/') != -1) { carPage = 1; }



function getPosition(element){
	var curleft = curtop = 0;
	if (element.offsetParent) {	
		do {
			curleft += element.offsetLeft;
			curtop += element.offsetTop;	
		} while (element = element.offsetParent);
	}
	return [curleft,curtop];
}
function showMenuPop(event, that, obj){
overItemOrMenu = 1;

if(document.getElementById(obj).style.display == 'block'){return;} //leave, menu is already open


   //unfocus all pulldown menus (overlap z-index-ish issues otherwise)
   numSelects = document.getElementsByTagName('select').length;
   for(index=0;index<numSelects;index++){
      document.getElementsByTagName('select')[index].blur();
   }

   //var shiftMenuAt = 650; //only used for the shopping menu

   var popWidth = 306; //only used for the shopping menu
   if(navigator.userAgent.indexOf('MSIE') != -1){ popWidth = 332; } // ie is different, for some whacky reason
   if(navigator.userAgent.indexOf('MSIE') != -1 | document.getElementById(obj) == 'mainNavPopHealth'){ popWidth = 352; } 
   var parentClass = that.parentNode.className;
   var menuHeight = 24; //height of the main nav bar

   //hide all dropdowns
   document.getElementById('mainNavPopCars').style.display = 'none';
   document.getElementById('mainNavPopAppliances').style.display = 'none';
   document.getElementById('mainNavPopElectronics').style.display = 'none';
   document.getElementById('mainNavPopHome').style.display = 'none';
   document.getElementById('mainNavPopBabies').style.display = 'none';
   document.getElementById('mainNavPopShopping').style.display = 'none';
   if(document.getElementById('mainNavPopHealth'))document.getElementById('mainNavPopHealth').style.display = 'none';

   //make sure all menu items are off
   document.getElementById('main-nav-cars-link').style.top = '0px';
   document.getElementById('main-nav-appliances-link').style.top = '0px';
   document.getElementById('main-nav-electronics-link').style.top = '0px';
   document.getElementById('main-nav-home-link').style.top = '0px';
   document.getElementById('main-nav-babies-link').style.top = '0px';
   document.getElementById('main-nav-shopping-link').style.top = '0px';
   if(document.getElementById('main-nav-health-link'))document.getElementById('main-nav-health-link').style.top = '0px';
   
   document.getElementById(that.id).style.position= ''; // needed for ie7 positioning (to get x below)

   xOffset = document.getElementById("main_nav").offsetLeft;
   yOffset = document.getElementById("main_nav").offsetTop + menuHeight;

   try{
      var x = event.currentTarget.offsetLeft;
      var y = event.currentTarget.offsetTop;
      menuItemWidth = event.currentTarget.offsetWidth;
   }
   catch(z){
    menuItemWidth = 120;
     x = 0;
     thatX = that;
     x = getPosition(that)[0];


     x = x - document.getElementById('main_nav').offsetLeft;

      thatY = that;
      y = thatY.offsetTop;;
      while (thatY = thatY.offsetParent) {
         y += thatY.offsetTop;
      }
      y += 18;
   }

  // need to display first to get height, but doing hidden at -500px
   document.getElementById(obj).style.left = '-500px';
   document.getElementById(obj).style.display = 'block';

   y -= document.getElementById(obj).offsetHeight;
   y += 17;

   x += xOffset;
   y = yOffset;


   if(navigator.userAgent.indexOf('MSIE') != -1   &&   obj == 'mainNavPopShopping'){ 
		x = x+21;
   }

   //turn on this menu item (needs to be done down here, for ie, below try/catch)
   document.getElementById(that.id).style.position= 'relative';
   document.getElementById(that.id).style.top = '-32px';




//if(x > shiftMenuAt) { x = x - popWidth + menuItemWidth; }
   if(obj == 'mainNavPopShopping' || obj == 'mainNavPopHealth'){ x = x - popWidth + menuItemWidth; }
   document.getElementById(obj).style.left = x + 'px';
   document.getElementById(obj).style.top = y + 'px';

   if((navigator.userAgent.indexOf('Mac') != -1) && (navigator.userAgent.indexOf('Firefox') != -1)){ 
      document.getElementById(obj).style.opacity = '.95';
      document.getElementById(obj).style.display = 'block'; 
   }
   else{ fadeIn(obj); }
   
   if(!carPage){return;}

   //show subnav blocker for cars page
   document.getElementById('subNavBlocker').style.left = x + 'px';
   document.getElementById('subNavBlocker').style.top = y  + 'px';
   document.getElementById('subNavBlocker').style.display = 'block';


} // end showMenuPop


function fadeIn(obj){

   browser = 'moz'
   if(navigator.userAgent.indexOf('MSIE') != -1){ browser = 'ie'; }
   if((navigator.userAgent.indexOf('Mac') != -1) && (navigator.userAgent.indexOf('Firefox') != -1)){ browser = 'MacFF'; }


   if(browser != 'ie'){
      if((document.getElementById(obj).style.opacity == '') || (document.getElementById(obj).style.opacity > .8)){
         newOpValue = '.1';
      }
      else{
         currentOpacityValue = document.getElementById(obj).style.opacity;
         newOpValue = currentOpacityValue * 1 + (0.2);
      }
   }
   else {
      currentOpValue = document.getElementById(obj).style.filter;
      if(currentOpValue != ''){
         currentOpValue = currentOpValue.substring(currentOpValue.indexOf('=')+1,currentOpValue.length-1);
      }
      else{
         currentOpValue = '5';
      }

     if(currentOpValue > 80) {currentOpValue = 5;}

      newOpValue = 1 * currentOpValue + 30;

   }


   fadeRate = 30;
   if(browser == 'MacFF'){fadeRate = 20; newOpValue = 1 * newOpValue + (0.2); }

   if(browser == 'ie'){
      document.getElementById(obj).style.filter= "alpha(opacity=" + newOpValue + ")";
      if(newOpValue > 80){document.getElementById(obj).style.filter= "alpha(opacity=95)"; return; }
   }
   else{
      document.getElementById(obj).style.opacity = newOpValue;
      if(newOpValue > .79){ document.getElementById(obj).style.opacity = '.95'; return; }
   }


   eval('setTimeout("fadeIn(\'' + obj + '\')",' + fadeRate + ');');

   return;

} // end fadeIn


function hideMenuPop(event, obj){

   overItemOrMenu = 0;

   event = event || window.event;

	if (event) {
	   var target = event.relatedTarget || event.toElement;
	   if (target && target.id) {
	      if ((target.id.indexOf("RolloverPop") != -1) || (target.id.indexOf("popLink") != -1)) {
		     return;
		  }
	   }
	}

   eval('setTimeout("hideMenuPopNow(\'' + obj + '\',0)",400);');

   return;

} // end hideMenuPop

function hideMenuPopNow(obj,noOverCheck){
   if((!overItemOrMenu ) || (noOverCheck)){


      //hide subnav blocker for cars page
      document.getElementById('subNavBlocker').style.display = 'none';

      //make sure all menu items look off
      document.getElementById('main-nav-cars-link').style.top = '0px';
      document.getElementById('main-nav-appliances-link').style.top = '0px';
      document.getElementById('main-nav-electronics-link').style.top = '0px';
      document.getElementById('main-nav-home-link').style.top = '0px';
      document.getElementById('main-nav-babies-link').style.top = '0px';
      document.getElementById('main-nav-shopping-link').style.top = '0px';
      if(document.getElementById('main-nav-health-link'))document.getElementById('main-nav-health-link').style.top = '0px';
      document.getElementById(obj).style.display = 'none';
   }
} // end hideMenuPopNow


