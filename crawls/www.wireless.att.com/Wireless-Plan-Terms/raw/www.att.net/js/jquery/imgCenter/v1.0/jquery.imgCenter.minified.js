 /*
 * Image Centering
 * Copyright 2009 Drew Wilson
 * www.drewwilson.com
 *
 * Version 1.0   -   Updated: Oct. 10, 2009
 *
 * This Plug-In will center images inside of it's parent element.
 * By default it even scales each image up or down to fit inside it's parent element.
 * It will also wait to make sure each image is loaded before doing any re-sizing.
 *
 * This Image Centering jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.imgCenter=function(options){var defaults={parentSteps:0,scaleToFit:true,centerVertical:true,complete:function(){},start:function(){},end:function(){}};var opts=$.extend(defaults,options);opts.start.call(this);var len=this.length-1;return this.each(function(i){var current=i;var org_image=$(this);org_image.hide();var theParent=org_image;for(var i=0;i<=opts.parentSteps;i++){theParent=theParent.parent();}
var parWidth=parseInt(theParent.width());var parHeight=parseInt(theParent.height());var parAspect=parWidth/parHeight;if(org_image[0].complete){imgMath(org_image);}else{var loadWatch=setInterval(watch,500);}
function watch(){if(org_image[0].complete){clearInterval(loadWatch);imgMath(org_image);}}
function imgMath(org_image){var imgWidth=parseInt(org_image.width());var imgHeight=parseInt(org_image.height());var imgAspect=imgWidth/imgHeight;if(parWidth!=imgWidth||parHeight!=imgHeight){theParent.css("overflow","hidden");if(opts.scaleToFit){if(parAspect>=1){org_image.css({"width":parWidth+"px"});imgWidth=parWidth;imgHeight=Math.round(imgWidth/imgAspect);if((parWidth/imgAspect)<parHeight){org_image.css({"height":parHeight+"px","width":"auto"});imgHeight=parHeight;imgWidth=Math.round(imgHeight*imgAspect);}}else{org_image.css({"height":parHeight+"px"});imgHeight=parHeight;imgWidth=Math.round(imgHeight*imgAspect);if((parHeight*imgAspect)<parWidth){org_image.css({"width":parWidth+"px","height":"auto"});imgWidth=parWidth;imgHeight=Math.round(imgWidth/imgAspect);}}
if(imgWidth>parWidth){org_image.css({"margin-left":"-"+Math.round((imgWidth-parWidth)/2)+"px"});}
if(imgHeight>parHeight&&opts.centerVertical){org_image.css({"margin-top":"-"+Math.round((imgHeight-parHeight)/2)+"px"});}}else{if(imgWidth>parWidth){org_image.css({"margin-left":"-"+Math.round((imgWidth-parWidth)/2)+"px"});}else if(imgWidth<parWidth){org_image.css({"margin-left":Math.round((parWidth-imgWidth)/2)+"px"});}
if(imgHeight>parHeight&&opts.centerVertical){org_image.css({"margin-top":"-"+Math.round((imgHeight-parHeight)/2)+"px"});}else if(imgHeight<parHeight&&opts.centerVertical){org_image.css({"margin-top":Math.round((parHeight-imgHeight)/2)+"px"});}}
opts.complete.call(this);if(current==len){opts.end.call(this);}}
org_image.show();}});}})(jQuery);