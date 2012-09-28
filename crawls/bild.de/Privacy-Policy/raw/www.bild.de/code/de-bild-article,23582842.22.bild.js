
/*de.bild.article:23582842.22*/

var de = de || {};
de.bild = de.bild || {};
de.bild.article = (function($) {
 /*
  <div class="imgEl ie4 expand">
  <div class="hentry hmedia">
  <div class="imgElTitle"><a href="http://bilder.bild.de/fotos-skaliert/kuntz_24876339_h-22869602/3,w=510.bild.jpg">Vergrößern</a></div>
  <a href="#">
  <img src="http://placehold.it/189x252/d00" alt="" class="photo" width="189" height="252" />
  </a>
  <p class="entry-content fn">Bei VÖllmond schloss sich seine <a href="#">Grupft</a> Bei VÖllmond schloss sich seine Grupft!</p>
  <div class="credit">FÖto: Reuters, DPA</div>
  </div>
  </div>
  */
 var $body, templates = {
  'enlargedPhoto' : '<div class="hentry hmedia"><a href="#"><span class="imagePlaceholder loading" style="display:block;height:300px;width:100%;"></span></a><p class="entry-content">%CONTENT%</p><div class="credit">%CREDIT%</div></div>'
 };
 function Imagezoomer(elem) {
  this.$zoomer = $(elem);
  this.$zoomerParent = this.$zoomer.parent();
  this.$zoomLink = this.$zoomer.find('div.imgElTitle > a');
  // setup
  if(this.$zoomLink.length) {
   this.$zoomLink.css('visibility', 'visible');
   this.largeImgSrc = this.$zoomLink.attr('href');
   // get content
   var $content = this.$zoomer.find('.entry-content').length ? this.$zoomer.find('.entry-content') : this.$zoomerParent.find('.entry-content'), $credit = this.$zoomerParent.find('.credit'), content = ($content.length) ? $content.html() : '', credit = ($credit.length) ? $credit.html() : '';
   // save content
   this.lbcontent = templates.enlargedPhoto.replace('%CONTENT%', content).replace('%CREDIT%', credit);
   // save scope
   var _this = this;
   de.lib.live(_this.$zoomer, 'a', 'click', function(e) {
    var $this = $(this);
    if($this.parent().hasClass('imgElTitle') || $this.attr('href') === '#') {
     e.preventDefault();
     var imgObj = new Image();
     // retain dimensions but hide
     imgObj.style.visibility = 'hidden';
     var cb = zoomerCallback(imgObj, _this);
     _this.$zoomer.bildLightbox({
      'closeOnEsc' : true,
      'wrapperClass' : 'lightbox lb7',
      'wrapperId' : 'expand-img-lightbox',
      'content' : _this.lbcontent,
      'overlayColor' : '#000',
      'width' : 500,
      'height' : 400,
      'callback' : cb
     });
    }
   });
  }
  return this;
 };
 function ImageMapZoomer(elem) {
  this.$zoomer = $(elem);
  this.$zoomerParent = this.$zoomer.parent();
  // setup
  if(this.$zoomer) {
   this.largeImgSrc = this.$zoomer.attr('href');
   if(this.largeImgSrc.indexOf('#') == 0) {
    this.largeImgSrc = this.largeImgSrc.substring(1, this.largeImgSrc.length);
   }
   // save content
   this.lbcontent = templates.enlargedPhoto.replace('%CONTENT%', '').replace('%CREDIT%', '');
   // save scope
   var _this = this;
   _this.$zoomer.on('click', function(e) {
    var $this = $(this);
    e.preventDefault();
    var imgObj = new Image();
    // retain dimensions but hide
    imgObj.style.visibility = 'hidden';
    var lbClass = _this.$zoomer.hasClass('image-layer') ? '' : 'lightbox layer lb1';
    var top  = _this.$zoomer.hasClass('image-layer') ? "0px" : null;
    var left  = _this.$zoomer.hasClass('image-layer') ? "0px" : null;
    _this.$zoomer.bildLightbox({
     'closeOnEsc' : true,
     'wrapperClass' : lbClass,
     'wrapperId' : 'expand-img-lightbox',
     'content' : _this.lbcontent,
     'width' : 500,
     'height' : 340,
     'top': top,
     'left':left,
     'callback' : function() {
      //Lightbox anpassen für 60 Jahre Special
      if(_this.$zoomer.hasClass('image-layer')) {
       zoomerCallback(imgObj, _this, true);
      } else {
       zoomerCallback(imgObj, _this);
      }
     }
    });
   });
  }
  return this;
 };
 //Funktion die aufgerufen wird, sobald die Lightbox geladen ist, Param noAdjust wird verwendet, wenn keine vertikale Positionierung erfolgen soll
 function zoomerCallback(imgObj, _this, noAdjust) {
  imgObj.src = _this.largeImgSrc;
  var $lightbox, $placeHolder;
  var to;
  
  //IE <=8 werfen kein zweites load Event. Daher mit Timeout
  if($.browser.msie && $.browser.version<="8"){
   to = setTimeout(function(){
    $(imgObj).trigger('load');
   },5000);
  }
  $(imgObj).on('load',function() { $lightbox = $('#expand-img-lightbox'), $placeHolder = $lightbox.find('span.imagePlaceholder');
   $lightbox.css('height', 'auto');
   
   clearTimeout(to);
   
   
   $placeHolder.removeClass('loading').css({
    'width' : imgObj.width,
    'height' : imgObj.height
   }).html(imgObj);
   // set up fading
   imgObj.style.display = 'none';
   imgObj.style.visibility = 'visible';
   var w = imgObj.width + 94, coords, newWidth = w, newHeight = $lightbox.outerHeight();
   if(_this.$zoomer.data('bildLightbox')) {
    coords = _this.$zoomer.data('bildLightbox').getPos(newWidth, newHeight);
    
    
    if(!noAdjust) {
     $lightbox.css('top', coords.y);     
    }
    //Lightbox  Rahmen komplett entfernen und Positionierung ändern (Top=0)
    else{
     setCustomLB();
    }
    
    $lightbox.animate({
     //'top' : coords.y,
     'left' : coords.x,
     'width' : w
    }, 250, function() {
     $(imgObj).fadeIn(100);
    });
   } else {
    _this.$zoomer.data('bildLightbox').setPos();
   }
   /*Bei Klick auf die LB schließen*/
   $lightbox.find('div.innerBox').on('click', function(e) {
    e.preventDefault();
    _this.$zoomer.data('bildLightbox').close();
   });
  })
 }
//Function die die LB Für das 60 Jahre Special anpasst
 function setCustomLB() {
  $('#expand-img-lightbox').css({
   'z-index' : 1001,
   top:'0px'
  });
  $('#bild-overlay').css({
   'background-color' : '#000',
   opacity : '0.5',
   "z-index" : 1000
  });
  $('#expand-img-lightbox .innerBox').css({
   'background-color' : 'transparent'
  });
  $('#expand-img-lightbox .close').css({
   'position' : 'absolute',
   'top' : '30px',
   'right':'0px',
   'color' : '#929292' 
  }).text('SCHLIESSEN').append('<img style="position:absolute;top:20px;left:27px" src="http://bilder.bild.de/fotos/close60-24658138/Bild/1.bild.png">');  
  
  de.bild.utils.scrollTo("0px", true);
 }

 function setupStepMapLightbox() {
  var $map = $('map.ktg-map'),
  $areas;
  if($map.length) {
   if ($map.hasClass('ktg-links')) {
    $areas = $map.find('area.open-lightbox');
   } else {
    $areas = $map.find('area.open-lightbox[title="KTG"]');
   }
   
    $areas.click(function(e) {
    e.preventDefault();
    var $this = $(this), url = $this.attr('href');
    if(url && url.length > 0) {
     $this.bildLightbox({
      'wrapperClass' : 'lightbox layer lb1',
      'wrapperId' : 'ktg-lightbox',
      'ajax' : $this.attr('href'),
      'callback' : function() {
      }
     });
    }
   });
  }
 };



function setupMicroVids(area) {
  var $ajaxLinks, $loader, $base, $close;
  if(area) {
   $ajaxLinks = jQuery(area);
  } else {
   //FG im InfoElement
   $ajaxLinks = jQuery('.infoFG, .infoVid');
  }
  if($ajaxLinks.length === 0) {
   return $ajaxLinks;
  }
  // Content will be loaded into the specified target via innerHTML
  de.lib.live($ajaxLinks, 'a', 'click', function(e) {
   e.preventDefault();
   var obj = this;
   var $this = jQuery(this).parents('.section');
   if($this.find('.photoGallery, .videoGallery').size() == 0) {
    de.bild.httpFist.load({
     'obj' : obj,
     'callback' : function(data) {
      var $data = jQuery(data);
      $data.hide();
      $this.find($ajaxLinks).after($data);
      slideFG($this);
      // re-register videos
      de.bild.init($data);
     }
    });
   } else {
    slideFG($this);
   }
  });
  function slideFG(elem) {
   var $this = elem;
   var biggerElement = $this.find('.photoGallery, .videoGallery');
   biggerElement.show();
   $this.find('.infoFG, .infoVid').hide();
   var bigHeight = $this.find('.infoFG').size() > 0 ? '457px' : '392px';
   $this.animate({
    width : "457px",
    height : bigHeight
   }, 0, function() {
    $this.height('');
    var $element = $this.parents('.element');
    $element.removeClass('floatL').addClass('center').find('.close').unbind('click').click(function(e) {
     e.preventDefault();
     $close = jQuery(this);
     $element.removeClass('center').addClass('floatL');
     $this.animate({
      width : '189px',
      height : '213px'
     }, 250, function() {
      $close.parents('.section').find('.photoGallery, .videoGallery').hide();
      $this.css('height', '');
      $this.find($ajaxLinks).show();
     });
    })
   });
  };
  return $ajaxLinks;
 };




 function init() {
  var $expands = $('div.imgEl.expand div.hentry');
  if($expands.length) {
   $expands.each(function() {
    new Imagezoomer(this);
   });
  }
  //Bilder in Image Maps als Lightbox
  var areaZoomer = $('map area.image-lightbox, map area.image-layer');
  if(areaZoomer.length) {
   areaZoomer.each(function() {
    new ImageMapZoomer(this);
   });
  }
  setupStepMapLightbox();

setupMicroVids();

 };
 $(function() {
  init();
 });
 return {
 }
})(jQuery);