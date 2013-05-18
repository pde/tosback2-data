/* Global Slideshow */
var slideInterval;

function initSlides(){
  var a = '<div id="slideshow_control_0" class="on"></div>';
  var b = $('#slide_holder').children('div').length;
  
  $('#slide_holder').removeClass('nojs').children('div:first').css('display','block');

  for(var i=1;i<b;i++){
    a += '<div id="slideshow_control_'+String(i)+'"></div>'; 
  }
  
  $('#slide_0').addClass('on');

  $('#slideshow_controls').prepend(a+'<span class="clear"></span>').css('width',String((b*20)-5)).delegate('div','click',function(){
    upSlides($(this),$('#slide_holder > div.on'));
  });

  $('#slideshow').one('mouseover',function(){
    clearInterval(slideInterval);
  });
}
function upSlides(a){
  if(a != undefined && a.hasClass('on')) return;
  if(a == undefined) a = ($('#slideshow_controls').children('div:last').hasClass('on'))? $('#slideshow_controls').children('div:first') : $('#slideshow_controls').children('div.on').next();
  $('#slideshow_controls').children('div.on').removeClass('on');
  $('#slide_holder').children('div.on').removeClass('on').fadeOut('fast');
  a.addClass('on');
  $('#slide_'+String(a.attr('id').slice(-1))).addClass('on').fadeIn('fast');
}
/* End Global Slideshow */

/* Marketing Tracking Pixels */
function nthChildAdd(a,k){
  var val=0;
  for(var i=0;i<a.length;i++){
    val += parseFloat(a[i].split(';')[k]);
  }
  return val;
}

function trackingPixels(){
  if(location.hostname != 'www.samsclub.com') return;
  
  var px = '';
  var rand = Math.random()*10000000000000000000;

  /* Datalogix Tracking Pixels */
  var loc = (location.pathname.indexOf('.cp') > -1 && $('#breadcrumb').length)? $.trim($('#breadcrumb').text().replace(/\*[^\*]+\*/g,'').replace(/[^0-9a-zA-Z:]/g,'')).split('::')[1].toLowerCase() : location.pathname;
  if(loc.indexOf('order_receipt.jsp') > -1) loc = 'g-660';
  else if(loc == 'baby') loc = 'g-661';
  else if(loc == 'electronicscomputers') loc = 'g-662';
  else if(loc == 'outdoorpatio') loc = 'g-663';
  else loc = 'g-659';
  px += "<img src='"+location.protocol+"//h.nexac.com/e/a-975/s-1743/c-183/"+loc+".xgi?pkey=eqbw69pemzv15&chpcm=&chpsg=&chpcr=&chpck=&rand="+rand+"&chpth=' width='1' height='1' />";

  /* Mindshare Tracking Pixels */
  loc = location.href;
  if(loc.indexOf('purchaseThankYou.jsp') > -1 || loc.indexOf('order_receipt.jsp') > -1){
    var qty = nthChildAdd(s.products.split(','),2);
    var cost = nthChildAdd(s.products.split(','),3);
    var ord = s.purchaseID;
    loc = (loc.indexOf('purchaseThankYou.jsp') > -1)? 'membe351' : 'e-com303';
    px += '<iframe src="'+location.protocol+'//4060429.fls.doubleclick.net/activityi;src=4060429;type=sales227;cat='+loc+';qty='+qty+';cost='+cost+';ord='+ord+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
  }else{
    if(loc.indexOf('homepage.jsp') > -1) loc = 'samsc682';
    else if(loc.indexOf('purchaseMembership.jsp') > -1 && loc.indexOf('?') == -1) loc = 'membe242';
    else if(loc.indexOf('pageName=aboutSams') > -1) loc = 'about104';
    else if(loc.indexOf('orderConfirmation.jsp') > -1) loc = 'revie017';
    if(loc != location.href) px += '<iframe src="'+location.protocol+'//4060429.fls.doubleclick.net/activityi;src=4060429;type=samsc681;cat='+loc+';ord='+rand+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
  }

  $('body').append(px);
}
/* End Marketing Tracking Pixels */

(function($){
/* Fix for Mac OS fly-out menu */
var macOS = navigator.platform.toUpperCase().indexOf('MAC')>=0,
macDev = navigator.userAgent.match(/(Mac|iPhone|iPod|iPad)/i)?true:false,
safariUA = (navigator.userAgent.indexOf('Safari')!= -1 && navigator.userAgent.indexOf('Chrome') == -1);
if ((macOS || macDev) && !safariUA) $('.menul1 .menul2').addClass('mc-mac');
else if ((macOS || macDev) && safariUA) $('.menul1 .menul2').addClass('mc-macsaf');
/* End Fix for Mac OS fly-out menu */

/* OutdoorLiving Run-of-site banner */
try{
var categories=['1877.cp','930195.cp','930197.cp','930199.cp','1881.cp','1883.cp','1885.cp','1857.cp','1858.cp','1860.cp','1889.cp','1897.cp','1900.cp','1862.cp','1871.cp','1872.cp','110101.cp','1551.cp','110103.cp','1863.cp','1887.cp','1864.cp','1868.cp','1865.cp','5160101.cp','2780107.cp','1424.cp','1552.cp','1067.cp','1066.cp','5170101.cp','1373.cp','5170103.cp','1514.cp','430221.cp','5170105.cp','1499.cp'];
var url=location.href;

url=url.match(/\/(\d+\.cp)/i)[1];

if($.inArray(url,categories)>-1){
$(document).ready(function(){
$('#productMainContent').children('.twoCol-product').eq(0).prepend('<div style="width:530px;height:100px;margin-bottom:10px;"><a href="http://samsclub.com/sams/pagedetails/content.jsp?pageName=outdoorLiving&cid=INT_CC10"><img src="http://s7d2.scene7.com/is/image/samsclub/outdoor_living_runofsite?wid=530&fmt=jpg&qlt=90" width="530" height="100"></a></div>');
});
}
}catch(e){}
/* End OutdoorLiving Run-of-site banner */

/* Category and Product Page: Michelin Promise Plan Bug */
$('.fourThinB .michelinPromisePlan').each(function(){
  $('<a href="http://s7d2.scene7.com/is/content/samsclub/michelin_promise_planpdf" target="_blank" style="position:relative;top:5px;"><img src="http://s7d2.scene7.com/is/image/samsclub/icon-MichelinPromisePlan?wid=50&op_sharpen=1"></a>').appendTo($(this).closest('.fourThinB').find('.imgCol'));
  $(this).remove();
});

$('.buffer .michelinPromisePlan').each(function(){
   $('<a href="http://s7d2.scene7.com/is/content/samsclub/michelin_promise_planpdf" target="_blank" style="position:relative;top:5px;"><img src="http://s7d2.scene7.com/is/image/samsclub/icon-MichelinPromisePlan?wid=140&op_sharpen=1"></a>').appendTo($(this).closest('.buffer'));
   $(this).remove();
});

/* Energy Star Logo */
$('.estarlogo').append('<a href="http://www.samsclub.com/sams/pagedetails/content.jsp?pageName=energyStar"></a>')
$('.estarlogo').bind('click', function() {
  window.location = 'http://www.samsclub.com/sams/pagedetails/content.jsp?pageName=energyStar';
});

/* Homepage Slideshow */
if(location.pathname.indexOf('homepage.jsp') > -1){
  initSlides();
  slideInterval = setInterval(function(){
    upSlides();
  }, 4500);
}

})(jQuery);

$(document).ready(function() {
  trackingPixels();
});