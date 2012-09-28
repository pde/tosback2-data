/*  
********************************************** SART INCLUDE jquery.uniform.js ***************************** *****************************
*/
/*

Uniform v1.7.5
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.4 or newer

Much thanks to Thomas Reynolds and Buck Wilson for their help and advice on this

Disabling text selection is made possible by Mathias Bynens <http://mathiasbynens.be/>
and his noSelect plugin. <http://github.com/mathiasbynens/noSelect-jQuery-Plugin>

Also, thanks to David Kaneda and Eugene Bond for their contributions to the plugin

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Enjoy!

*/

(function($) {
  $.uniform = {
    options: {
      selectClass:   'selector',
      radioClass: 'radio',
      checkboxClass: 'checker',
      fileClass: 'uploader',
      filenameClass: 'filename',
      fileBtnClass: 'action',
      fileDefaultText: 'No file selected',
      fileBtnText: 'Choose File',
      checkedClass: 'checked',
      focusClass: 'focus',
      disabledClass: 'disabled',
      buttonClass: 'button',
      activeClass: 'active',
      hoverClass: 'hover',
      useID: true,
      idPrefix: 'uniform',
      resetSelector: false,
      autoHide: true
    },
    elements: []
  };

  if($.browser.msie && $.browser.version < 7){
    $.support.selectOpacity = false;
  }else{
    $.support.selectOpacity = true;
  }

  $.fn.uniform = function(options) {

    options = $.extend($.uniform.options, options);

    var el = this;
    //code for specifying a reset button
    if(options.resetSelector != false){
      $(options.resetSelector).mouseup(function(){
        function resetThis(){
          $.uniform.update(el);
        }
        setTimeout(resetThis, 10);
      });
    }
    
    function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }
    
    function doTextarea(elem){
      $(elem).addClass("uniform");
      storeElement(elem);
    }
    
    function doButton(elem){
      var $el = $(elem);
      
      var divTag = $("<div>"),
          spanTag = $("<span>");
      
      divTag.addClass(options.buttonClass);
      
      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      
      var btnText;
      
      if($el.is("a") || $el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is(":reset") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }
      
      btnText = btnText == "" ? $el.is(":reset") ? "Reset" : "Submit" : btnText;
      
      spanTag.html(btnText);
      
      $el.css("opacity", 0);
      $el.wrap(divTag);
      $el.wrap(spanTag);
      
      //redefine variables
      divTag = $el.closest("div");
      spanTag = $el.closest("span");
      
      if($el.is(":disabled")) divTag.addClass(options.disabledClass);
      
      divTag.bind({
        "mouseenter.uniform": function(){
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function(){
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function(){
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(e){
          if($(e.target).is("span") || $(e.target).is("div")){    
            if(elem[0].dispatchEvent){
              var ev = document.createEvent('MouseEvents');
              ev.initEvent( 'click', true, true );
              elem[0].dispatchEvent(ev);
            }else{
              elem[0].click();
            }
          }
        }
      });
      
      elem.bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        }
      });
      
      $.uniform.noSelect(divTag);
      storeElement(elem);
      
    }

    function doSelect(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }
      
      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.html());
      
      elem.css('opacity', 0);
      elem.wrap(divTag);
      elem.before(spanTag);

      //redefine variables
      divTag = elem.parent("div");
      spanTag = elem.siblings("span");

      elem.bind({
        "change.uniform": function() {
          spanTag.html(elem.find(":selected").html());
          divTag.removeClass(options.activeClass);
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").html());
        }
      });
      
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      $.uniform.noSelect(spanTag);
      
      storeElement(elem);

    }

    function doCheckbox(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }
      
      divTag.addClass(options.checkboxClass);

      //assign the id of the element
      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span.
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });
      
      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check our box
        spanTag.addClass(options.checkedClass);
      }

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);
    }

    function doRadio(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
          
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.radioClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            var classes = options.radioClass.split(" ")[0];
            $("." + classes + " span." + options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchend.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform touchbegin.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check span
        spanTag.addClass(options.checkedClass);
      }
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);

    }

    function doFile(elem){
      //sanitize input
      var $el = $(elem);

      var divTag = $('<div />'),
          filenameTag = $('<span>'+options.fileDefaultText+'</span>'),
          btnTag = $('<span>'+options.fileBtnText+'</span>');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.fileClass);
      filenameTag.addClass(options.filenameClass);
      btnTag.addClass(options.fileBtnClass);

      if(options.useID && $el.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      }

      //wrap with the proper elements
      $el.wrap(divTag);
      $el.after(btnTag);
      $el.after(filenameTag);

      //redefine variables
      divTag = $el.closest("div");
      filenameTag = $el.siblings("."+options.filenameClass);
      btnTag = $el.siblings("."+options.fileBtnClass);

      //set the size
      if(!$el.attr("size")){
        var divWidth = divTag.width();
        //$el.css("width", divWidth);
        $el.attr("size", divWidth/10);
      }

      //actions
      var setFilename = function()
      {
        var filename = $el.val();
        if (filename === '')
        {
          filename = options.fileDefaultText;
        }
        else
        {
          filename = filename.split(/[\/\\]+/);
          filename = filename[(filename.length-1)];
        }
        filenameTag.text(filename);
      };

      // Account for input saved across refreshes
      setFilename();

      $el
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "mousedown.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      // IE7 doesn't fire onChange until blur or second fire.
      if ($.browser.msie){
        // IE considers browser chrome blocking I/O, so it
        // suspends tiemouts until after the file has been selected.
        $el.bind('click.uniform.ie7', function() {
          setTimeout(setFilename, 0);
        });
      }else{
        // All other browsers behave properly
        $el.bind('change.uniform', setFilename);
      }

      //handle defaults
      if($el.attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      
      $.uniform.noSelect(filenameTag);
      $.uniform.noSelect(btnTag);
      
      storeElement(elem);

    }
    
    $.uniform.restore = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      
      $(elem).each(function(){
        if($(this).is(":checkbox")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is("select")){
          //remove sibling span
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is(":radio")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is(":file")){
          //remove sibling spans
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is("button, :submit, :reset, a, input[type='button']")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }
        
        //unbind events
        $(this).unbind(".uniform");
        
        //reset inline style
        $(this).css("opacity", "1");
        
        //remove item from list of uniformed elements
        var index = $.inArray($(elem), $.uniform.elements);
        $.uniform.elements.splice(index, 1);
      });
    };

    function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }
    
    //noSelect v1.0
    $.uniform.noSelect = function(elem) {
      function f() {
       return false;
      };
      $(elem).each(function() {
       this.onselectstart = this.ondragstart = f; // Webkit & IE
       $(this)
        .mousedown(f) // Webkit & Opera
        .css({ MozUserSelect: 'none' }); // Firefox
      });
     };

    $.uniform.update = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      //sanitize input
      elem = $(elem);

      elem.each(function(){
        //do to each item in the selector
        //function to reset all classes
        var $e = $(this);

        if($e.is("select")){
          //element is a select
          var spanTag = $e.siblings("span");
          var divTag = $e.parent("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          //reset current selected text
          spanTag.html($e.find(":selected").html());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":checkbox")){
          //element is a checkbox
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":radio")){
          //element is a radio
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":file")){
          var divTag = $e.parent("div");
          var filenameTag = $e.siblings(options.filenameClass);
          btnTag = $e.siblings(options.fileBtnClass);

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          filenameTag.text($e.val());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":submit") || $e.is(":reset") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
          var divTag = $e.closest("div");
          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
          
        }
        
      });
    };

    return this.each(function() {
      if($.support.selectOpacity){
        var elem = $(this);

        if(elem.is("select")){
          //element is a select
          if(elem.attr("multiple") != true){
            //element is not a multi-select
            if(elem.attr("size") == undefined || elem.attr("size") <= 1){
              doSelect(elem);
            }
          }
        }else if(elem.is(":checkbox")){
          //element is a checkbox
          doCheckbox(elem);
        }else if(elem.is(":radio")){
          //element is a radio
          doRadio(elem);
        }else if(elem.is(":file")){
          //element is a file upload
          doFile(elem);
        }else if(elem.is(":text, :password, input[type='email']")){
          doInput(elem);
        }else if(elem.is("textarea")){
          doTextarea(elem);
        }else if(elem.is("a") || elem.is(":submit") || elem.is(":reset") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }
          
      }
    });
  };
})(jQuery);

/*
********************************************** SART INCLUDE jquery.listen.js *****************************
*/
/**
 * jQuery.Listen - Light and fast event handling, using event delegation.
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/7/2008
 * http://flesler.blogspot.com/2007/10/jquerylisten.html
 * @version 1.0.3
 */
;(function($){var a='indexer',h=$.event,j=h.special,k=$.listen=function(c,d,e,f){if(typeof d!='object'){f=e;e=d;d=document}o(c.split(/\s+/),function(a){a=k.fixes[a]||a;var b=m(d,a)||m(d,a,new n(a,d));b.append(e,f);b.start()})},m=function(b,c,d){return $.data(b,c+'.'+a,d)};$.fn[a]=function(a){return this[0]&&m(this[0],a)||null};$[a]=function(a){return m(document,a)};$.extend(k,{regex:/^((?:\w*?|\*))(?:([#.])([\w-]+))?$/,fixes:{focus:'focusin',blur:'focusout'},cache:function(a){this.caching=a}});$.each(k.fixes,function(a,b){j[b]={setup:function(){if($.browser.msie)return!1;this.addEventListener(a,j[b].handler,!0)},teardown:function(){if($.browser.msie)return!1;this.removeEventListener(a,j[b].handler,!0)},handler:function(e){arguments[0]=e=h.fix(e);e.type=b;return h.handle.apply(this,arguments)}}});$.fn.listen=function(a,b,c){return this.each(function(){k(a,this,b,c)})};function n(a,b){$.extend(this,{ids:{},tags:{},listener:b,event:a});this.id=n.instances.push(this)};n.instances=[];n.prototype={constructor:n,handle:function(e){var a=e.stopPropagation;e.stopPropagation=function(){e.stopped=1;a.apply(this,arguments)};m(this,e.type).parse(e);e.stopPropagation=a;a=e.data=null},on:0,bubbles:0,start:function(){var a=this;if(!a.on){h.add(a.listener,a.event,a.handle);a.on=1}},stop:function(){var a=this;if(a.on){h.remove(a.listener,a.event,a.handle);a.on=0}},cache:function(a,b){return $.data(a,'listenCache_'+this.id,b)},parse:function(e){var z=this,c=e.data||e.target,d=arguments,f;if(!k.caching||!(f=z.cache(c))){f=[];if(c.id&&z.ids[c.id])p(f,z.ids[c.id]);o([c.nodeName,'*'],function(a){var b=z.tags[a];if(b)o((c.className+' *').split(' '),function(a){if(a&&b[a])p(f,b[a])})});if(k.caching)z.cache(c,f)}if(f[0]){o(f,function(a){if(a.apply(c,d)===!1){e.preventDefault();e.stopPropagation()}})}if(!e.stopped&&(c=c.parentNode)&&(c.nodeName=='A'||z.bubbles&&c!=z.listener)){e.data=c;z.parse(e)}f=d=c=null},append:function(f,g){var z=this;o(f.split(/\s*,\s*/),function(a){var b=k.regex.exec(a);if(!b)throw'$.listen > "'+a+'" is not a supported selector.';var c=b[2]=='#'&&b[3],d=b[1].toUpperCase()||'*',e=b[3]||'*';if(c)(z.ids[c]||(z.ids[c]=[])).push(g);else if(d){d=z.tags[d]=z.tags[d]||{};(d[e]||(d[e]=[])).push(g)}})}};function o(a,b,c){for(var i=0,l=a.length;i<l;i++)b.call(c,a[i],i)};function p(a,b){a.push.apply(a,b);return a};$(window).unload(function(){if(typeof n=='function')o(n.instances,function(b){b.stop();$.removeData(b.listener,b.event+'.'+a);b.ids=b.names=b.listener=null})})})(jQuery);

/*
********************************************** SART INCLUDE jquery.cluetip.js *****************************
*/
/*
 * jQuery clueTip plugin
 * Version 1.0.4  (June 28, 2009)
 * @requires jQuery v1.2.6+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/*
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/

;(function($) { 
  $.cluetip = {version: '1.0.4'};
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $cluetipWait, $dropShadow, imgCount;
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      return this.unbind('.cluetip');
    }
    return this.each(function(index) {
      var link = this, $this = $(this);
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(true, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = +opts.cluezIndex;
      $this.data('thisInfo', {title: link.title, zIndex: cluezIndex});
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $(['<div id="cluetip">',
          '<div id="cluetip-outer">',
            '<h3 id="cluetip-title"></h3>',
            '<div id="cluetip-inner"></div>',
          '</div>',
          '<div id="cluetip-extra"></div>',
          '<div id="cluetip-arrows" class="cluetip-arrows"></div>',
        '</div>'].join(''))
        [insertionType](insertionElement).hide();
        
        $cluetip = $('#cluetip').css({position: 'absolute'});
        $cluetipOuter = $('#cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
        $cluetipInner = $('#cluetip-inner');
        $cluetipTitle = $('#cluetip-title');        
        $cluetipArrows = $('#cluetip-arrows');
        $cluetipWait = $('<div id="cluetip-waitimage"></div>')
          .css({position: 'absolute'}).insertBefore($cluetip).hide();
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-1, opacity:.1, top: 1+i, left: 1+i}));
        };
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle && !js) return true;
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'),10)||0) + (parseInt($cluetip.css('paddingRight'),10)||0) + dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if(tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }
      
      var localContent;
      function returnFalse() { return false; }

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({
          left: (posX > 0 && opts.positionBy != 'bottomTop') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0),
          zIndex: $this.data('thisInfo').zIndex
        });
        $cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tipParts[0]);
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }          
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') != 0) {
        if (/\.(jpe?g|tiff?|gif|png)$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;
          var ajaxSettings = {
            cache: false, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $this.data('thisInfo').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');  
                }
              }
            },
            success: function(data, textStatus) {       
              cluetipContents = opts.ajaxProcess.call(link, data);
              if (isActive) {
                if (optionSuccess) {optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);}
                $cluetipInner.html(cluetipContents);
              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);}
              imgCount = $('#cluetip-inner img').length;
              if (imgCount && !$.browser.opera) {
                $('#cluetip-inner img').bind('load error', function() {
                  imgCount--;
                  if (imgCount<1) {
                    $cluetipWait.hide();
                    if (isActive) cluetipShow(pY);
                  }
                }); 
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              } 
            }
          };
          var ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);
          
          $.ajax(ajaxMergedSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        
        var $localContent = $(tipAttribute + (/#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner);
        $closeLink.bind('click.cluetip', function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          $cluetip.bind('mouseleave.cluetip', function() {
            cluetipClose();
          });
        } else {
          $cluetip.unbind('mouseleave.cluetip');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({zIndex: $this.data('thisInfo').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.open != 'show' && opts.fx.openSpeed);
      if (opts.dropShadow) { $dropShadow.css({height: tipHeight, width: tipInnerWidth, zIndex: $this.data('thisInfo').zIndex-1}).show(); }
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
        clearTimeout(closeOnDelay);        
      };
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass();
      opts.onHide.call(link, $cluetip, $cluetipInner);
      $this.removeClass('cluetip-clicked');
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) $cluetipArrows.css({top: ''});
    };

    $(document).bind('hideCluetip', function(e) {
      cluetipClose();
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.bind('focus.cluetip', function(event) {
          activate(event);
        });
        $this.bind('blur.cluetip', function(event) {
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $this[opts.clickThrough ? 'unbind' : 'bind']('click', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove.cluetip');}
          });           
        } else {
          $this.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $this.unbind('mousemove.cluetip');
          });
        }
        // remove default title tooltip on hover
        $this.bind('mouseenter.cluetip', function(event) {
          $this.attr('title','');
        })
        .bind('mouseleave.cluetip', function(event) {
          $this.attr('title', $this.data('thisInfo').title);
        });
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    localPrefix:      null,       // string to be prepended to the tip attribute if local is true
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    escapeTitle:      false,    // whether to html escape the title attribute
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs
    
    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // short-circuit function to run just before clueTip is shown. 
    onActivate:       function(e) {return true;},

    // function to run just after clueTip is shown. 
    onShow:           function(ct, ci){},
    // function to run just after clueTip is hidden.
    onHide:           function(ct, ci){},
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend, 
    // will be queued first within the default callbacks. 
    // The only exception is error, which overrides the default
    ajaxSettings: {
                      // error: function(ct, ci) { /* override default error callback */ }
                      // beforeSend: function(ct, ci) { /* called first within default beforeSend callback }
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';

  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);

/*
********************************************** SART INCLUDE jquery.treeview.js *****************************
*/
/*
 * Treeview 1.4 - jQuery plugin to hide and show branches of a tree
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 * http://docs.jquery.com/Plugins/Treeview
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.treeview.js 4684 2008-02-07 19:08:06Z joern.zaefferer $
 *
 */

;(function($) {

	$.extend($.fn, {
		swapClass: function(c1, c2) {
			var c1Elements = this.filter('.' + c1);
			this.filter('.' + c2).removeClass(c2).addClass(c1);
			c1Elements.removeClass(c1).addClass(c2);
			return this;
		},
		replaceClass: function(c1, c2) {
			return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
		},
		hoverClass: function(className) {
			className = className || "hover";
			return this.hover(function() {
				$(this).addClass(className);
			}, function() {
				$(this).removeClass(className);
			});
		},
		heightToggle: function(animated, callback) {
			animated ?
				this.animate({ height: "toggle" }, animated, callback) :
				this.each(function(){
					jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
					if(callback)
						callback.apply(this, arguments);
				});
		},
		heightHide: function(animated, callback) {
			if (animated) {
				this.animate({ height: "hide" }, animated, callback);
			} else {
				this.hide();
				if (callback)
					this.each(callback);				
			}
		},
		prepareBranches: function(settings) {
			if (!settings.prerendered) {
				// mark last tree items
				this.filter(":last-child:not(ul)").addClass(CLASSES.last);
				// collapse whole tree, or only those marked as closed, anyway except those marked as open
				this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide();
			}
			// return all items with sublists
			return this.filter(":has(>ul)");
		},
		applyClasses: function(settings, toggler) {
			this.filter(":has(>ul):not(:has(>a))").find(">span").click(function(event) {
				toggler.apply($(this).next());
			}).add( $("a", this) ).hoverClass();
			
			
			if (!settings.prerendered) {
				// handle closed ones first
				this.filter(":has(>ul:hidden)")
						.addClass(CLASSES.expandable)
						.replaceClass(CLASSES.last, CLASSES.lastExpandable);
						
				// handle open ones
				this.not(":has(>ul:hidden)")
						.addClass(CLASSES.collapsable)
						.replaceClass(CLASSES.last, CLASSES.lastCollapsable);
						
	            // create hitarea
				this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea).each(function() {
					var classes = "";
					$.each($(this).parent().attr("class").split(" "), function() {
						classes += this + "-hitarea ";
					});
					$(this).addClass( classes );
				});
			}
			
			// apply event to hitarea
			this.find("div." + CLASSES.hitarea).click( toggler );
		},
		treeview: function(settings) {
			
			settings = $.extend({
				cookieId: "treeview"
			}, settings);
			
			if (settings.add) {
				return this.trigger("add", [settings.add]);
			}
			
			if ( settings.toggle ) {
				var callback = settings.toggle;
				settings.toggle = function() {
					return callback.apply($(this).parent()[0], arguments);
				};
			}
		
			// factory for treecontroller
			function treeController(tree, control) {
				// factory for click handlers
				function handler(filter) {
					return function() {
						// reuse toggle event handler, applying the elements to toggle
						// start searching for all hitareas
						toggler.apply( $("div." + CLASSES.hitarea, tree).filter(function() {
							// for plain toggle, no filter is provided, otherwise we need to check the parent element
							return filter ? $(this).parent("." + filter).length : true;
						}) );
						return false;
					};
				}
				// click on first element to collapse tree
				$("a:eq(0)", control).click( handler(CLASSES.collapsable) );
				// click on second to expand tree
				$("a:eq(1)", control).click( handler(CLASSES.expandable) );
				// click on third to toggle tree
				$("a:eq(2)", control).click( handler() ); 
			}
		
			// handle toggle event
			function toggler() {
				$(this)
					.parent()
					// swap classes for hitarea
					.find(">.hitarea")
						.swapClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
						.swapClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea )
					.end()
					// swap classes for parent li
					.swapClass( CLASSES.collapsable, CLASSES.expandable )
					.swapClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
					// find child lists
					.find( ">ul" )
					// toggle them
					.heightToggle( settings.animated, settings.toggle );
				if ( settings.unique ) {
					$(this).parent()
						.siblings()
						// swap classes for hitarea
						.find(">.hitarea")
							.replaceClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
							.replaceClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea )
						.end()
						.replaceClass( CLASSES.collapsable, CLASSES.expandable )
						.replaceClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
						.find( ">ul" )
						.heightHide( settings.animated, settings.toggle );
				}
			}
			
			function serialize() {
				function binary(arg) {
					return arg ? 1 : 0;
				}
				var data = [];
				branches.each(function(i, e) {
					data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0;
				});
				$.cookie(settings.cookieId, data.join("") );
			}
			
			function deserialize() {
				var stored = $.cookie(settings.cookieId);
				if ( stored ) {
					var data = stored.split("");
					branches.each(function(i, e) {
						$(e).find(">ul")[ parseInt(data[i]) ? "show" : "hide" ]();
					});
				}
			}
			
			// add treeview class to activate styles
			this.addClass("treeview");
			
			// prepare branches and find all tree items with child lists
			var branches = this.find("li").prepareBranches(settings);
			
			switch(settings.persist) {
			case "cookie":
				var current = this.find("a").filter(function() { return this.href.toLowerCase() == location.href.toLowerCase(); });
				if ( current.length ) {
					current.addClass("selected").parents("ul, li").add( current.next() ).show();
				}
				var toggleCallback = settings.toggle;
				settings.toggle = function() {
					serialize();
					if (toggleCallback) {
						toggleCallback.apply(this, arguments);
					}
				};
				deserialize();
				break;
			case "location":
				var current = this.find("a").filter(function() { return this.href.toLowerCase() == location.href.toLowerCase(); });
				if ( current.length ) {
					current.addClass("selected").parents("ul, li").add( current.next() ).show();
				}
				break;
			}
			
			branches.applyClasses(settings, toggler);
				
			// if control option is set, create the treecontroller and show it
			if ( settings.control ) {
				treeController(this, settings.control);
				$(settings.control).show();
			}
			
			return this.bind("add", function(event, branches) {
				$(branches).prev()
					.removeClass(CLASSES.last)
					.removeClass(CLASSES.lastCollapsable)
					.removeClass(CLASSES.lastExpandable)
				.find(">.hitarea")
					.removeClass(CLASSES.lastCollapsableHitarea)
					.removeClass(CLASSES.lastExpandableHitarea);
				$(branches).find("li").andSelf().prepareBranches(settings).applyClasses(settings, toggler);
			});
		}
	});
	
	// classes used by the plugin
	// need to be styled via external stylesheet, see first example
	var CLASSES = $.fn.treeview.classes = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		expandableHitarea: "expandable-hitarea",
		lastExpandableHitarea: "lastExpandable-hitarea",
		collapsable: "collapsable",
		collapsableHitarea: "collapsable-hitarea",
		lastCollapsableHitarea: "lastCollapsable-hitarea",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	};
	
	// provide backwards compability
	$.fn.Treeview = $.fn.treeview;	
	
})(jQuery);
/*
********************************************** SART INCLUDE jquery.cookie.js *****************************
*/
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*
********************************************** SART INCLUDE jquery.nyroModal-1.4.2.js *****************************
*/
/*
 * nyroModal - jQuery Plugin
 * http://nyromodal.nyrodev.com
 *
 * Copyright (c) 2008 Cedric Nirousset (nyrodev.com)
 * Licensed under the MIT license
 *
 * $Date: 2009-02-19 (Thu, 19 Feb 2009) $
 * $version: 1.4.2
 */
jQuery(function($) {

	// -------------------------------------------------------
	// Private Variables
	// -------------------------------------------------------

	var userAgent = navigator.userAgent.toLowerCase();
	var browserVersion = (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1];
	var isIE6 = (/msie/.test(userAgent) && !/opera/.test(userAgent) && parseInt(browserVersion) < 7);
	var body = $('body');

	var currentSettings;

	var shouldResize = false;

	// To know if the fix for the Issue 10 should be applied (or has been applied)
	var fixFF = false;

	// Used for retrieve the content from an hidden div
	var contentElt;
	var contentEltLast;

	// Contains info about nyroModal state and all div references
	var modal = {
		started: false,
		ready: false,
		dataReady: false,
		anim: false,
		animContent: false,
		loadingShown: false,
		transition: false,
		closing: false,
		error: false,
		blocker: null,
		blockerVars: null,
		full: null,
		bg: null,
		loading: null,
		tmp: null,
		content: null,
		wrapper: null,
		contentWrapper: null,
		scripts: new Array(),
		scriptsShown: new Array()
	};

	// Indicate of the height or the width was resized, to reinit the currentsettings related to null
	var resized = {
		width: false,
		height: false
	};


	// -------------------------------------------------------
	// Public function
	// -------------------------------------------------------

	// jQuery extension function. A paramater object could be used to overwrite the default settings
	$.fn.nyroModal = function(settings) {
		if (!this)
			return false;
		return this.each(function(){
			if (this.nodeName.toLowerCase() == 'form') {
				$(this).submit(function(e) {
					if ($(this).data('processing'))
						return true;
					if (this.enctype == 'multipart/form-data') {
						processModal($.extend(settings, {
							from: this
						}));
						return true;
					}
					e.preventDefault();
					processModal($.extend(settings, {
						from: this
					}));
					return false;
				});
			} else {
				$(this).click(function(e) {
					e.preventDefault();
					processModal($.extend(settings, {
						from: this
					}));
					return false;
				});
			}
		});
	};

	// jQuery extension function to call manually the modal. A paramater object could be used to overwrite the default settings
	$.fn.nyroModalManual = function(settings) {
		if (!this.length)
			processModal(settings);
		return this.each(function(){
			processModal($.extend(settings, {
				from: this
			}));
		});
	};

	$.nyroModalManual = function(settings) {
		processModal(settings);
	};

	// Update the current settings
	// object settings
	// string deep1 first key where overwrite the settings
	// string deep2 second key where overwrite the settings
	$.nyroModalSettings = function(settings, deep1, deep2) {
		setCurrentSettings(settings, deep1, deep2);
		if (!deep1 && modal.started) {
			if (modal.bg && settings.bgColor)
				currentSettings.updateBgColor(modal, currentSettings, function(){});

			if (modal.contentWrapper && settings.title)
				setTitle();

			if (((settings.width && settings.width == currentSettings.width) || (settings.height && settings.height == currentSettings.height))) {
				if (modal.contentWrapper)
					calculateSize(true);
				if (modal.contentWrapper && modal.contentWrapper.is(':visible') && !modal.animContent) {
					if (fixFF)
						modal.content.css({position: ''});
					currentSettings.resize(modal, currentSettings, function() {
						if (fixFF)
							modal.content.css({position: 'fixed'});
						if ($.isFunction(currentSettings.endResize))
							currentSettings.endResize(modal, currentSettings);
					});
				}
			}
		}
	};

	// Remove the modal function
	$.nyroModalRemove = function() {
		removeModal();
	};

	// Go to the next image for a gallery
	// return false if nothing was done
	$.nyroModalNext = function() {
		var link = getGalleryLink(1);
		if (link)
			return link.nyroModalManual(getCurrentSettingsNew());
		return false;
	};

	// Go to the previous image for a gallery
	// return false if nothing was done
	$.nyroModalPrev = function() {
		var link = getGalleryLink(-1);
		if (link)
			return link.nyroModalManual(getCurrentSettingsNew());
		return false;
	};


	// -------------------------------------------------------
	// Default Settings
	// -------------------------------------------------------

	$.fn.nyroModal.settings = {
		debug: false, // Show the debug in the background
		blocker: false, // Element which will be blocked by the modal
		modal: false, // Esc key or click backgrdound enabling or not
		type: '', // nyroModal type (form, formData, iframe, image, etc...)
		from: '', // Dom object where the call come from
		hash: '', // Eventual hash in the url
		processHandler: null, // Handler just before the real process
		selIndicator: 'nyroModalSel', // Value added when a form or Ajax is sent with a filter content
		formIndicator: 'nyroModal', // Value added when a form is sent
		content: null, // Raw content if type content is used
		bgColor: '#E8E8E8', // Background color
		ajax: {}, // Ajax option (url, data, type, success will be overwritten for a form, url and success only for an ajax call)
		swf: { // Swf player options if swf type is used.
			wmode: 'transparent'
		},
		width: null, // default Width If null, will be calculate automatically
		height: null, // default Height If null, will be calculate automatically
		minWidth: 60, // Minimum width
		minHeight: 60, // Minimum height
		resizable: true, // Indicate if the content is resizable. Will be set to false for swf
		autoSizable: true, // Indicate if the content is auto sizable. If not, the min size will be used
		padding: 25, // padding for the max modal size
		regexImg: '[^\.]\.(jpg|jpeg|png|tiff|gif|bmp)\s*$', // Regex to find images
		defaultImgAlt: 'Image', // Default alt attribute for the images
		setWidthImgTitle: true, // Set the width to the image title
		ltr: true, // Left to Right by default. Put to false for Hebrew or Right to Left language
		gallery: null, // Gallery name if provided
		galleryLinks: '<a href="#" class="nyroModalPrev">Prev</a><a href="#"  class="nyroModalNext">Next</a>', // Use .nyroModalPrev and .nyroModalNext to set the navigation link
		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			bg: {
				position: 'absolute',
				overflow: 'hidden',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%'
			},
			wrapper: {
				position: 'absolute',
				top: '50%',
				left: '50%'
			},
			wrapper2: {
			},
			content: {
				overflow: 'auto'
			},
			loading: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				marginTop: '-50px',
				marginLeft: '-50px'
			}
		},

		wrap: { // Wrapper div used to style the modal regarding the content type
			div: '<div class="wrapper"></div>',
			ajax: '<div class="wrapper"></div>',
			form: '<div class="wrapper"></div>',
			formData: '<div class="wrapper"></div>',
			image: '<div class="wrapperImg"></div>',
			swf: '<div class="wrapperSwf"></div>',
			iframe: '<div class="wrapperIframe"></div>',
			iframeForm: '<div class="wrapperIframe"></div>',
			manual: '<div class="wrapper"></div>'
		},

		//closeButton: '<a href="#" class="nyroModalClose" id="closeBut" title="close">Close</a>', // Adding automaticly as the first child of #nyroModalWrapper

		title: null, // Modal title
		titleFromIframe: false, // When using iframe in the same domain, try to get the title from it

		openSelector: '.nyroModal', // selector for open a new modal. will be used to parse automaticly at page loading
		closeSelector: '.nyroModalClose', // selector to close the modal

		contentLoading: '<a href="#" class="nyroModalClose">Cancel</a>', // Loading div content

		errorClass: 'error', // CSS Error class added to the loading div in case of error
		contentError: 'The requested content cannot be loaded.<br />Please try again later.<br /><a href="#" class="nyroModalClose">Close</a>', // Content placed in the loading div in case of error

		handleError: null, // Callback in case of error

		showBackground: showBackground, // Show background animation function
		hideBackground: hideBackground, // Hide background animation function

		endFillContent: null, // Will be called after filling and wraping the content, before parsing closeSelector and openSelector and showing the content
		showContent: showContent, // Show content animation function
		endShowContent: null, // Will be called once the content is shown
		beforeHideContent: null, // Will be called just before the modal closing
		hideContent: hideContent, // Hide content animation function

		showTransition: showTransition, // Show the transition animation (a modal is already shown and a new one is requested)
		hideTransition: hideTransition, // Hide the transition animation to show the content

		showLoading: showLoading, // show loading animation function
		hideLoading: hideLoading, // hide loading animation function

		resize: resize, // Resize animation function
		endResize: null, // Will be called one the content is resized

		updateBgColor: updateBgColor, // Change background color animation function

		endRemove: null // Will be called once the modal is totally gone
	};

	// -------------------------------------------------------
	// Private function
	// -------------------------------------------------------

	// Main function
	function processModal(settings) {
		if (modal.loadingShown || modal.transition || modal.anim)
			return;
		debug('processModal');
		modal.started = true;
		setDefaultCurrentSettings(settings);
		if (!modal.full)
			modal.blockerVars = modal.blocker = null;
		modal.error = false;
		modal.closing = false;
		modal.dataReady = false;
		modal.scripts = new Array();
		modal.scriptsShown = new Array();

		currentSettings.type = fileType();

		if ($.isFunction(currentSettings.processHandler))
			currentSettings.processHandler(currentSettings);

		from = currentSettings.from;
		url = currentSettings.url;

		if (currentSettings.type == 'swf') {
			// Swf is transforming as a raw content
			currentSettings.resizable = false;
			setCurrentSettings({overflow: 'hidden'}, 'css', 'content');
			currentSettings.content = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+currentSettings.width+'" height="'+currentSettings.height+'"><param name="movie" value="'+url+'"></param>';
			var tmp = '';
			$.each(currentSettings.swf, function(name, val) {
				currentSettings.content+= '<param name="'+name+'" value="'+val+'"></param>';
				tmp+= ' '+name+'="'+val+'"';
			});
			currentSettings.content+= '<embed src="'+url+'" type="application/x-shockwave-flash" width="'+currentSettings.width+'" height="'+currentSettings.height+'"'+tmp+'></embed></object>';
		}

		if (from) {
			var jFrom = $(from);
			if (currentSettings.type == 'form') {
				var data = $(from).serializeArray();
				data.push({name: currentSettings.formIndicator, value: 1});
				if (currentSettings.selector)
					data.push({name: currentSettings.selIndicator, value: currentSettings.selector.substring(1)});
				$.ajax($.extend({}, currentSettings.ajax, {
						url: url,
						data: data,
						type: from.method,
						success: ajaxLoaded,
						error: loadingError
					}));
				debug('Form Ajax Load: '+jFrom.attr('action'));
				showModal();
			} else if (currentSettings.type == 'formData') {
				// Form with data. We're using a hidden iframe
				initModal();
				jFrom.attr('target', 'nyroModalIframe');
				jFrom.attr('action', url);
				jFrom.prepend('<input type="hidden" name="'+currentSettings.formIndicator+'" value="1" />');
				if (currentSettings.selector)
					jFrom.prepend('<input type="hidden" name="'+currentSettings.selIndicator+'" value="'+currentSettings.selector.substring(1)+'" />');
				modal.tmp.html('<iframe frameborder="0" hspace="0" name="nyroModalIframe"></iframe>');
				$('iframe', modal.tmp)
					.css({
						width: currentSettings.width,
						height: currentSettings.height
					})
					.error(loadingError)
					.load(formDataLoaded);
				debug('Form Data Load: '+jFrom.attr('action'));
				showModal();
				showContentOrLoading();
			} else if (currentSettings.type == 'image') {
				var title = jFrom.attr('title') || currentSettings.defaultImgAlt;
				initModal();
				modal.tmp.html('<img id="nyroModalImg" />').find('img').attr('alt', title);
				debug('Image Load: '+url);
				modal.tmp.css({lineHeight: 0});
				$('img', modal.tmp)
					.error(loadingError)
					.load(function() {
						debug('Image Loaded: '+this.src);
						$(this).unbind('load');
						var w = modal.tmp.width();
						var h = modal.tmp.height();
						modal.tmp.css({lineHeight: ''});
						resized.width = w;
						resized.height = h;
						setCurrentSettings({
							width: w,
							height: h,
							imgWidth: w,
							imgHeight: h
						});
						setCurrentSettings({overflow: 'hidden'}, 'css', 'content');
						modal.dataReady = true;
						if (modal.loadingShown || modal.transition)
							showContentOrLoading();
					})
					.attr('src', url);
				showModal();
			} else if (currentSettings.type == 'iframeForm') {
				initModal();
				modal.tmp.html('<iframe frameborder="0" hspace="0" src="" name="nyroModalIframe" id="nyroModalIframe"></iframe>');
				debug('Iframe Form Load: '+url);
				$('iframe', modal.tmp).eq(0)
					.css({
						width: '100%',
						height: $.support.boxModel? '99%' : '100%'
					})
					.load(function(e) {
						if (currentSettings.titleFromIframe && url.indexOf(window.location.hostname) > -1)
							$.nyroModalSettings({title: $('iframe', modal.full).contents().find('title').text()});
					});
				modal.dataReady = true;
				showModal();
			} else if (currentSettings.type == 'iframe') {
				initModal();
				modal.tmp.html('<iframe frameborder="0" hspace="0" src="'+url+'" name="nyroModalIframe" id="nyroModalIframe"></iframe>');
				debug('Iframe Load: '+url);
				$('iframe', modal.tmp).eq(0)
					.css({
						width: '100%',
						height: $.support.boxModel? '99%' : '100%'
					})
					.load(function(e) {
						if (currentSettings.titleFromIframe && url.indexOf(window.location.hostname) > -1)
							$.nyroModalSettings({title: $('iframe', modal.full).contents().find('title').text()});
					});
				modal.dataReady = true;
				showModal();
			} else if (currentSettings.type) {
				// Could be every other kind of type or a dom selector
				debug('Content: '+currentSettings.type);
				initModal();
				modal.tmp.html(currentSettings.content);
				var w = modal.tmp.width();
				var h = modal.tmp.height();
				var div = $(currentSettings.type);
				if (div.length) {
					setCurrentSettings({type: 'div'});
					w = div.width();
					h = div.height();
					if (contentElt)
						contentEltLast = contentElt;
					contentElt = div;
					modal.tmp.append(div.contents());
				}
				setCurrentSettings({
					width: w,
					height: h
				});
				if (modal.tmp.html())
					modal.dataReady = true;
				else
					loadingError();
				if (!modal.ready)
					showModal();
				else
					endHideContent();
			} else {
				debug('Ajax Load: '+url);
				setCurrentSettings({type: 'ajax'});
				var data = currentSettings.ajax.data || {};
				if (currentSettings.selector) {
					if (typeof data == "string") {
						data+= '&'+currentSettings.selIndicator+'='+currentSettings.selector.substring(1);
					} else {
						data[currentSettings.selIndicator] = currentSettings.selector.substring(1);
					}
				}
				$.ajax($.extend(true, currentSettings.ajax, {
					url: url,
					success: ajaxLoaded,
					error: loadingError,
					data: data
				}));
				showModal();
			}
		} else if (currentSettings.content) {
			// Raw content not from a DOM element
			debug('Content: '+currentSettings.type);
			setCurrentSettings({type: 'manual'});
			initModal();
			modal.tmp.html($('<div/>').html(currentSettings.content).contents());
			if (modal.tmp.html())
				modal.dataReady = true;
			else
				loadingError();
			showModal();
		} else {
			// What should we show here? nothing happen
		}
	}

	// Update the current settings
	// object settings
	// string deep1 first key where overwrite the settings
	// string deep2 second key where overwrite the settings
	function setDefaultCurrentSettings(settings) {
		debug('setDefaultCurrentSettings');
		currentSettings = $.extend(true, {}, $.fn.nyroModal.settings, settings);
		currentSettings.selector = '';
		currentSettings.borderW = 0;
		currentSettings.borderH = 0;
		currentSettings.resizable = true;
		setMargin();
	}

	function setCurrentSettings(settings, deep1, deep2) {
		if (modal.started) {
			if (deep1 && deep2) {
				$.extend(true, currentSettings[deep1][deep2], settings);
			} else if (deep1) {
				$.extend(true, currentSettings[deep1], settings);
			} else {
				if (modal.animContent) {
					if (settings.width) {
						settings.setWidth = settings.width;
						delete settings['width'];
						shouldResize = true;
					}
					if (settings.height) {
						settings.setHeight = settings.height;
						delete settings['height'];
						shouldResize = true;
					}
				}
				$.extend(true, currentSettings, settings);
			}
		} else {
			if (deep1 && deep2) {
				$.extend(true, $.fn.nyroModal.settings[deep1][deep2], settings);
			} else if (deep1) {
				$.extend(true, $.fn.nyroModal.settings[deep1], settings);
			} else {
				$.extend(true, $.fn.nyroModal.settings, settings);
			}
		}
	}

	// Set the margin for postionning the element. Useful for IE6
	function setMarginScroll() {
		if (isIE6 && !modal.blocker) {
			if (document.documentElement) {
				currentSettings.marginScrollLeft = document.documentElement.scrollLeft;
				currentSettings.marginScrollTop = document.documentElement.scrollTop;
			} else {
				currentSettings.marginScrollLeft = document.body.scrollLeft;
				currentSettings.marginScrollTop = document.body.scrollTop;
			}
		} else {
			currentSettings.marginScrollLeft = 0;
			currentSettings.marginScrollTop = 0;
		}
	}

	// Set the margin for the content
	function setMargin() {
		setMarginScroll();
		currentSettings.marginLeft = -(currentSettings.width+currentSettings.borderW)/2;
		currentSettings.marginTop = -(currentSettings.height+currentSettings.borderH)/2;
		if (!modal.blocker) {
			currentSettings.marginLeft+= currentSettings.marginScrollLeft;
			currentSettings.marginTop+= currentSettings.marginScrollTop;
		}
	}

	// Set the margin for the current loading
	function setMarginLoading() {
		setMarginScroll();
		var outer = getOuter(modal.loading);
		currentSettings.marginTopLoading = -(modal.loading.height() + outer.h.border + outer.h.padding)/2;
		currentSettings.marginLeftLoading = -(modal.loading.width() + outer.w.border + outer.w.padding)/2;
		if (!modal.blocker) {
			currentSettings.marginLefttLoading+= currentSettings.marginScrollLeft;
			currentSettings.marginTopLoading+= currentSettings.marginScrollTop;
		}
	}

	// Set the modal Title
	function setTitle() {
		var title = $('h1#nyroModalTitle', modal.contentWrapper);
		if (title.length)
			title.text(currentSettings.title);
		else
			modal.contentWrapper.prepend('<h1 id="nyroModalTitle">'+currentSettings.title+'</h1>');
	}

	// Init the nyroModal div by settings the CSS elements and hide needed elements
	function initModal() {
		debug('initModal');
		if (!modal.full) {
			if (currentSettings.debug)
				setCurrentSettings({color: 'white'}, 'css', 'bg');

			var full = {
				zIndex: 100,
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%'
			};

			var contain = body;
			var iframeHideIE = '';
			if (currentSettings.blocker) {
				modal.blocker = contain = $(currentSettings.blocker);
				var pos = modal.blocker.offset();
				var w = modal.blocker.outerWidth();
				var h = modal.blocker.outerHeight();
				if (isIE6) {
					setCurrentSettings({
						height: '100%',
						width: '100%',
						top: 0,
						left: 0
					}, 'css', 'bg');
				}
				modal.blockerVars = {
					top: pos.top,
					left: pos.left,
					width: w,
					height: h
				};
				var plusTop = (/msie/.test(userAgent) ?0:getCurCSS(body.get(0), 'borderTopWidth'));
				var plusLeft = (/msie/.test(userAgent) ?0:getCurCSS(body.get(0), 'borderLeftWidth'));
				full = {
					position: 'absolute',
					top: pos.top + plusTop,
					left: pos.left + plusLeft,
					width: w,
					height: h
				};
			} else if (isIE6) {
				body.css({
					height: body.height()+'px',
					width: body.width()+'px',
					position: 'static',
					overflow: 'hidden'
				});
				$('html').css({overflow: 'hidden'});
				setCurrentSettings({
					css: {
						bg: {
							position: 'absolute',
							zIndex: 101,
							height: '110%',
							width: '110%',
							top: currentSettings.marginScrollTop+'px',
							left: currentSettings.marginScrollLeft+'px'
						},
						wrapper: { zIndex: 102	},
						loading: { zIndex: 103	}
					}
				});

				iframeHideIE = $('<iframe id="nyroModalIframeHideIe"></iframe>')
								.css($.extend({},
									currentSettings.css.bg, {
										opacity: 0,
										zIndex: 50,
										border: 'none'
									}));
			}

			contain.append($('<div id="nyroModalFull"><div id="nyroModalBg"></div><div id="nyroModalWrapper"><div id="nyroModalContent"></div></div><div id="nyrModalTmp"></div><div id="nyroModalLoading"></div></div>').hide());

			modal.full = $('#nyroModalFull')
				.css(full)
				.show();
			modal.bg = $('#nyroModalBg')
				.css($.extend({
						backgroundColor: currentSettings.bgColor
					}, currentSettings.css.bg))
				.before(iframeHideIE);
			if (!currentSettings.modal)
				modal.bg.click(removeModal);
			modal.loading = $('#nyroModalLoading')
				.css(currentSettings.css.loading)
				.hide();
			modal.contentWrapper = $('#nyroModalWrapper')
				.css(currentSettings.css.wrapper)
				.hide();
			modal.content = $('#nyroModalContent');
			modal.tmp = $('#nyrModalTmp').hide();

			// To stop the mousewheel if the the plugin is available
			if ($.isFunction($.fn.mousewheel)) {
				modal.content.mousewheel(function(e, d) {
					var elt = modal.content.get(0);
					if ((d > 0 && elt.scrollTop == 0) ||
							(d < 0 && elt.scrollHeight - elt.scrollTop == elt.clientHeight)) {
						e.preventDefault();
						e.stopPropagation();
					}
				});
			}

			$(document).keydown(keyHandler);
			modal.content.css({width: 'auto', height: 'auto'});
			modal.contentWrapper.css({width: 'auto', height: 'auto'});
		}
	}

	// Show the modal (ie: the background and then the loading if needed or the content directly)
	function showModal() {
		debug('showModal');
		if (!modal.ready) {
			initModal();
			modal.anim = true;
			currentSettings.showBackground(modal, currentSettings, endBackground);
		} else {
			modal.anim = true;
			modal.transition = true;
			currentSettings.showTransition(modal, currentSettings, function(){endHideContent();modal.anim=false;showContentOrLoading();});
		}
	}

	// Used for the escape key or the arrow in the gallery type
	function keyHandler(e) {
		if (e.keyCode == 27) {
			if (!currentSettings.modal)
				removeModal();
		} else if (currentSettings.gallery && modal.ready && modal.dataReady && !modal.anim && !modal.transition) {
			if (e.keyCode == 39 || e.keyCode == 40) {
				e.preventDefault();
				$.nyroModalNext();
				return false;
			} else if (e.keyCode == 37 || e.keyCode == 38) {
				e.preventDefault();
				$.nyroModalPrev();
				return false;
			}
		}
	}

	// Determine the filetype regarding the link DOM element
	function fileType() {
		if (currentSettings.forceType) {
			var tmp = currentSettings.forceType;
			if (!currentSettings.content)
				currentSettings.from = true;
			currentSettings.forceType = null;
			return tmp;
		}

		var from = currentSettings.from;

		var url;

		if (from && from.nodeName) {
			var jFrom = $(from);
			currentSettings.url = url = from.nodeName.toLowerCase() == 'form'? jFrom.attr('action') : from.href;

			if (jFrom.attr('rev') == 'modal')
				currentSettings.modal = true;

			currentSettings.title = jFrom.attr('title');

			if (from && from.rel)
				currentSettings.gallery = from.rel;

			var imgType = imageType(url, from);
			if (imgType)
				return imgType;

			var iframe = false;
			if (from.target && from.target.toLowerCase() == '_blank' || (from.hostname && from.hostname.replace(/:\d*$/,'') != window.location.hostname.replace(/:\d*$/,''))) {
				iframe = true;
			}
			if (from.nodeName.toLowerCase() == 'form') {
				if (iframe)
					return 'iframeForm';
				setCurrentSettings(extractUrlSel(url));
				if (jFrom.attr('enctype') == 'multipart/form-data')
					return 'formData';
				return 'form';
			}
			if (iframe)
				return 'iframe';
		} else {
			url = currentSettings.url;
			if (!currentSettings.content)
				currentSettings.from = true;

			if (!url)
				return null;

			var reg1 = new RegExp("^http://", "g");
			if (url.match(reg1))
				return 'iframe';
		}

		var imgType = imageType(url, from);
		if (imgType)
			return imgType;

		var swf = new RegExp('[^\.]\.(swf)\s*$', 'i');
		if (swf.test(url))
			return 'swf';

		var tmp = extractUrlSel(url);
		setCurrentSettings(tmp);

		if (!tmp.url)
			return tmp.selector;
	}

	function imageType(url, from) {
		var image = new RegExp(currentSettings.regexImg, 'i');
		if (image.test(url)) {
			return 'image';
		}
	}

	function extractUrlSel(url) {
		var ret = {
			url: null,
			selector: null
		};

		if (url) {
			var hash = getHash(url);
			var hashLoc = getHash(window.location.href);
			var curLoc = window.location.href.substring(0, window.location.href.length - hashLoc.length);
			var req = url.substring(0, url.length - hash.length);

			if (req == curLoc) {
				ret.selector = hash;
			} else {
				ret.url = req;
				ret.selector = hash;
			}
		}
		return ret;
	}

	// Called when the content cannot be loaded or tiemout reached
	function loadingError() {
		debug('loadingError');

		modal.error = true;

		if (!modal.ready)
			return;

		if ($.isFunction(currentSettings.handleError))
			currentSettings.handleError(modal, currentSettings);

		modal.loading
			.addClass(currentSettings.errorClass)
			.html(currentSettings.contentError);
		$(currentSettings.closeSelector, modal.loading).click(removeModal);
		setMarginLoading();
		modal.loading
			.css({
				marginTop: currentSettings.marginTopLoading+'px',
				marginLeft: currentSettings.marginLeftLoading+'px'
			});
	}

	// Put the content from modal.tmp to modal.content
	function fillContent() {
		debug('fillContent');
		if (!modal.tmp.html())
			return;

		modal.content.html(modal.tmp.contents());
		modal.tmp.empty();
		wrapContent();

		if (currentSettings.type == 'iframeForm') {
			$(currentSettings.from)
				.attr('target', 'nyroModalIframe')
				.data('processing', 1)
				.submit()
				.attr('target', '_blank')
				.removeData('processing');
		}

		if ($.isFunction(currentSettings.endFillContent))
			currentSettings.endFillContent(modal, currentSettings);

		modal.content.append(modal.scripts);

		$(currentSettings.closeSelector, modal.contentWrapper).click(removeModal);
		$(currentSettings.openSelector, modal.contentWrapper).nyroModal(getCurrentSettingsNew());
	}

	// Get the current settings to be used in new links
	function getCurrentSettingsNew() {
		var currentSettingsNew = $.extend(true, {}, currentSettings);
		if (resized.width)
			currentSettingsNew.width = null;
		if (resized.height)
			currentSettingsNew.height = null;
		currentSettingsNew.css.content.overflow = 'auto';
		return currentSettingsNew;
	}

	// Wrap the content and update the modal size if needed
	function wrapContent() {
		debug('wrapContent');

		var wrap = $(currentSettings.wrap[currentSettings.type]);
		modal.content.append(wrap.children().remove());
		modal.contentWrapper.wrapInner(wrap);

		if (currentSettings.gallery) {
			// Set the action for the next and prev button (or remove them)
			modal.content.append(currentSettings.galleryLinks);

			var currentSettingsNew = getCurrentSettingsNew();

			var linkPrev = getGalleryLink(-1);
			if (linkPrev) {
				var prev = $('.nyroModalPrev', modal.contentWrapper)
					.attr('href', linkPrev.attr('href'))
					.click(function(e) {
						e.preventDefault();
						linkPrev.nyroModalManual(currentSettingsNew);
						return false;
					});
				if (isIE6 && currentSettings.type == 'swf') {
					prev.before($('<iframe id="nyroModalIframeHideIeGalleryPrev"></iframe>').css({
											position: prev.css('position'),
											top: prev.css('top'),
											left: prev.css('left'),
											width: prev.width(),
											height: prev.height(),
											opacity: 0,
											border: 'none'
										}));
				}
			} else {
				$('.nyroModalPrev', modal.contentWrapper).remove();
			}
			var linkNext = getGalleryLink(1);
			if (linkNext) {
				var next = $('.nyroModalNext', modal.contentWrapper)
					.attr('href', linkNext.attr('href'))
					.click(function(e) {
						e.preventDefault();
						linkNext.nyroModalManual(currentSettingsNew);
						return false;
					});
				if (isIE6 && currentSettings.type == 'swf') {
					next.before($('<iframe id="nyroModalIframeHideIeGalleryNext"></iframe>')
									.css($.extend({}, {
											position: next.css('position'),
											top: next.css('top'),
											left: next.css('left'),
											width: next.width(),
											height: next.height(),
											opacity: 0,
											border: 'none'
										})));
				}
			} else {
				$('.nyroModalNext', modal.contentWrapper).remove();
			}
		}

		calculateSize();
	}

	function getGalleryLink(dir) {
		if (currentSettings.gallery) {
			if (!currentSettings.ltr)
				dir *= -1;
			// next
			var gallery = $('[rel="'+currentSettings.gallery+'"]');
			var currentIndex = gallery.index(currentSettings.from);
			var index = currentIndex + dir;
			if (index >= 0 && index < gallery.length)
				return gallery.eq(index);
		}
		return false;
	}

	// Calculate the size for the contentWrapper
	function calculateSize(resizing) {
		debug('calculateSize');

		if (!modal.wrapper)
			modal.wrapper = modal.contentWrapper.children(':first');

		resized.width = false;
		resized.height = false;
		if (currentSettings.autoSizable && (!currentSettings.width || !currentSettings.height)) {
			modal.contentWrapper
				.css({
					opacity: 0,
					width: 'auto',
					height: 'auto'
				})
				.show();
			var tmp = {
				width: 'auto',
				height: 'auto'
			};
			if (currentSettings.width) {
				tmp.width = currentSettings.width;
			} else if (currentSettings.type == 'iframe') {
				tmp.width = currentSettings.minWidth;
			}
				
			if (currentSettings.height) {
				tmp.height = currentSettings.height
			} else if (currentSettings.type == 'iframe') {
				tmp.height = currentSettings.minHeight;
			}
			
			modal.content.css(tmp);
			if (!currentSettings.width) {
				currentSettings.width = modal.content.outerWidth(true);
				resized.width = true;
			}
			if (!currentSettings.height) {
				currentSettings.height = modal.content.outerHeight(true);
				resized.height = true;
			}
			modal.contentWrapper.hide().css({opacity: 1});
		}

		currentSettings.width = Math.max(currentSettings.width, currentSettings.minWidth);
		currentSettings.height = Math.max(currentSettings.height, currentSettings.minHeight);

		var outerWrapper = getOuter(modal.contentWrapper);
		var outerWrapper2 = getOuter(modal.wrapper);
		var outerContent = getOuter(modal.content);

		var tmp = {
			content: {
				width: currentSettings.width,
				height: currentSettings.height
			},
			wrapper2: {
				width: currentSettings.width + outerContent.w.total,
				height: currentSettings.height + outerContent.h.total
			},
			wrapper: {
				width: currentSettings.width + outerContent.w.total + outerWrapper2.w.total,
				height: currentSettings.height + outerContent.h.total + outerWrapper2.h.total
			}
		};

		if (currentSettings.resizable) {
			var maxHeight = modal.blockerVars? modal.blockerVars.height : $(window).height()
								- outerWrapper.h.border
								- (tmp.wrapper.height - currentSettings.height);
			var maxWidth = modal.blockerVars? modal.blockerVars.width : $(window).width()
								- outerWrapper.w.border
								- (tmp.wrapper.width - currentSettings.width);
			maxHeight-= currentSettings.padding*2;
			maxWidth-= currentSettings.padding*2;

			if (tmp.content.height > maxHeight || tmp.content.width > maxWidth) {
				// We're gonna resize the modal as it will goes outside the view port
				if (currentSettings.type == 'image') {
					// An image is resized proportionnaly
					var diffW = tmp.content.width - currentSettings.imgWidth;
					var diffH = tmp.content.height - currentSettings.imgHeight;
						if (diffH < 0) diffH = 0;
						if (diffW < 0) diffW = 0;
					var calcH = maxHeight - diffH;
					var calcW = maxWidth - diffW;
					var ratio = Math.min(calcH/currentSettings.imgHeight, calcW/currentSettings.imgWidth);

					calcH = Math.floor(currentSettings.imgHeight*ratio);
					calcW = Math.floor(currentSettings.imgWidth*ratio);
					$('img#nyroModalImg', modal.content).css({
						height: calcH+'px',
						width: calcW+'px'
					});
					tmp.content.height = calcH + diffH;
					tmp.content.width = calcW + diffW;
				} else {
					// For an HTML content, we simply decrease the size
					tmp.content.height = Math.min(tmp.content.height, maxHeight);
					tmp.content.width = Math.min(tmp.content.width, maxWidth);
				}
				tmp.wrapper2 = {
						width: tmp.content.width + outerContent.w.total,
						height: tmp.content.height + outerContent.h.total
					};
				tmp.wrapper = {
						width: tmp.content.width + outerContent.w.total + outerWrapper2.w.total,
						height: tmp.content.height + outerContent.h.total + outerWrapper2.h.total
					};
			}
		}

		modal.content.css($.extend({}, tmp.content, currentSettings.css.content));
		modal.wrapper.css($.extend({}, tmp.wrapper2, currentSettings.css.wrapper2));

		if (!resizing) {
			modal.contentWrapper.css($.extend({}, tmp.wrapper, currentSettings.css.wrapper));
			if (currentSettings.type == 'image') {
				// Adding the title for the image
				var title = $('img', modal.content).attr('alt');
				$('img', modal.content).removeAttr('alt');
				if (title != currentSettings.defaultImgAlt) {
					var divTitle = $('<div>'+title+'</div>');
					modal.content.append(divTitle);
					if (currentSettings.setWidthImgTitle) {
						var outerDivTitle = getOuter(divTitle);
						divTitle.css({width: (tmp.content.width + outerContent.w.padding - outerDivTitle.w.total)+'px'});
					}
				}
			}

			if (!currentSettings.modal)
				modal.contentWrapper.prepend(currentSettings.closeButton);
		}

		if (currentSettings.title)
			setTitle();

		tmp.wrapper.borderW = outerWrapper.w.border;
		tmp.wrapper.borderH = outerWrapper.h.border;

		setCurrentSettings(tmp.wrapper);
		setMargin();
	}

	function removeModal(e) {
		debug('removeModal');
		if (e)
			e.preventDefault();
		if (modal.full && modal.ready) {
			modal.ready = false;
			modal.anim = true;
			modal.closing = true;
			if (modal.loadingShown || modal.transition) {
				currentSettings.hideLoading(modal, currentSettings, function() {
						modal.loading.hide();
						modal.loadingShown = false;
						modal.transition = false;
						currentSettings.hideBackground(modal, currentSettings, endRemove);
					});
			} else {
				if (fixFF)
					modal.content.css({position: ''}); // Fix Issue #10, remove the attribute
				modal.wrapper.css({overflow: 'hidden'}); // Used to fix a visual issue when hiding
				modal.content.css({overflow: 'hidden'}); // Used to fix a visual issue when hiding
				if ($.isFunction(currentSettings.beforeHideContent)) {
					currentSettings.beforeHideContent(modal, currentSettings, function() {
						currentSettings.hideContent(modal, currentSettings, function() {
							endHideContent();
							currentSettings.hideBackground(modal, currentSettings, endRemove);
						});
					});
				} else {
					currentSettings.hideContent(modal, currentSettings, function() {
							endHideContent();
							currentSettings.hideBackground(modal, currentSettings, endRemove);
						});
				}
			}
		}
		if (e)
			return false;
	}

	function showContentOrLoading() {
		debug('showContentOrLoading');
		if (modal.ready && !modal.anim) {
			if (modal.dataReady) {
				if (modal.tmp.html()) {
					modal.anim = true;
					if (modal.transition) {
						fillContent();
						modal.animContent = true;
						currentSettings.hideTransition(modal, currentSettings, function() {
							modal.loading.hide();
							modal.transition = false;
							modal.loadingShown = false;
							endShowContent();
						});
					} else {
						currentSettings.hideLoading(modal, currentSettings, function() {
								modal.loading.hide();
								modal.loadingShown = false;
								fillContent();
								setMarginLoading();
								setMargin();
								modal.animContent = true;
								currentSettings.showContent(modal, currentSettings, endShowContent);
							});
					}
				}
			} else if (!modal.loadingShown && !modal.transition) {
				modal.anim = true;
				modal.loadingShown = true;
				if (modal.error)
					loadingError();
				else
					modal.loading.html(currentSettings.contentLoading);
				$(currentSettings.closeSelector, modal.loading).click(removeModal);
				setMarginLoading();
				currentSettings.showLoading(modal, currentSettings, function(){modal.anim=false;showContentOrLoading();});
			}
		}
	}


	// -------------------------------------------------------
	// Private Data Loaded callback
	// -------------------------------------------------------

	function ajaxLoaded(data) {
		debug('AjaxLoaded: '+this.url);
		modal.tmp.html(currentSettings.selector
			?filterScripts($('<div>'+data+'</div>').find(currentSettings.selector).contents())
			:filterScripts(data));
		if (modal.tmp.html()) {
			modal.dataReady = true;
			showContentOrLoading();
		} else
			loadingError();
	}

	function formDataLoaded() {
		debug('formDataLoaded');
		var jFrom = $(currentSettings.from);
		jFrom.attr('action', jFrom.attr('action')+currentSettings.selector);
		jFrom.attr('target', '');
		$('input[name='+currentSettings.formIndicator+']', currentSettings.from).remove();
		var iframe = modal.tmp.children('iframe');
		var iframeContent = iframe.unbind('load').contents().find(currentSettings.selector || 'body').not('script[src]');
		iframe.attr('src', 'about:blank'); // Used to stop the loading in FF
		modal.tmp.html(iframeContent.html());
		if (modal.tmp.html()) {
			modal.dataReady = true;
			showContentOrLoading();
		} else
			loadingError();
	}


	// -------------------------------------------------------
	// Private Animation callback
	// -------------------------------------------------------

	function endHideContent() {
		debug('endHideContent');
		modal.anim = false;
		if (contentEltLast) {
			contentEltLast.append(modal.content.contents());
			contentEltLast= null;
		} else if (contentElt) {
			contentElt.append(modal.content.contents());
			contentElt= null;
		}
		modal.content.empty();
		
		modal.contentWrapper.hide().children().remove().empty().attr('style', '').hide();

		if (modal.closing || modal.transition)
			modal.contentWrapper.hide();

		modal.contentWrapper
			.css(currentSettings.css.wrapper)
			.append(modal.content);
		showContentOrLoading();
	}

	function endRemove() {
		debug('endRemove');
		$(document).unbind('keydown', keyHandler);
		modal.anim = false;
		modal.full.remove();
		modal.full = null;
		if (isIE6) {
			body.css({height: '', width: '', position: '', overflow: ''});
			$('html').css({overflow: ''});
		}
		if ($.isFunction(currentSettings.endRemove))
			currentSettings.endRemove(modal, currentSettings);
	}

	function endBackground() {
		debug('endBackground');
		modal.ready = true;
		modal.anim = false;
		showContentOrLoading();
	}

	function endShowContent() {
		debug('endShowContent');
		modal.anim = false;
		modal.animContent = false;
		modal.contentWrapper.css({opacity: ''}); // for the close button in IE
		fixFF = /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent) && parseFloat(browserVersion) < 1.9 && currentSettings.type != 'image';
		if (fixFF)
			modal.content.css({position: 'fixed'}); // Fix Issue #10
		modal.content.append(modal.scriptsShown);
		if (currentSettings.autoSizable && currentSettings.type == 'iframe') {
			var iframe = modal.content.find('iframe');
			if (iframe.length && iframe.attr('src').indexOf(window.location.hostname) !== -1) {
				var body = iframe.contents().find('body');
			
				if (body.height() > 0) {
					var h = body.outerHeight(true)+1;
					var w = body.outerWidth(true)+1;
					$.nyroModalSettings({
						height: h,
						width: w
					});
				} else {
					iframe.bind('load', function() {
						var body = iframe.contents().find('body');
						if (body.length && body.height() > 0) {
							var h = body.outerHeight(true)+1;
							var w = body.outerWidth(true)+1;
							$.nyroModalSettings({
								height: h,
								width: w
							});
						}
					});
				}
			}
		}
		if ($.isFunction(currentSettings.endShowContent))
			currentSettings.endShowContent(modal, currentSettings);
		if (shouldResize) {
			shouldResize = false;
			$.nyroModalSettings({width: currentSettings.setWidth, height: currentSettings.setHeight});
			delete currentSettings['setWidth'];
			delete currentSettings['setHeight'];
		}
		if (resized.width)
			setCurrentSettings({width: null});
		if (resized.height)
			setCurrentSettings({height: null});
	}


	// -------------------------------------------------------
	// Utilities
	// -------------------------------------------------------

	// Get the selector from an url (as string)
	function getHash(url) {
		if (typeof url == 'string') {
			var hashPos = url.indexOf('#');
			if (hashPos > -1)
				return url.substring(hashPos);
		}
		return '';
	}

	// Filter an html content to remove the script[src]
	function filterScripts(data) {
		// Removing the body, head and html tag
		if (typeof data == 'string')
			data = data.replace(/<\/?(html|head|body)([^>]*)>/gi, '');
		var tmp = new Array();
		$.each($.clean({0:data}, this.ownerDocument), function() {
			if ($.nodeName(this, "script")) {
				if (!this.src || $(this).attr('rel') == 'forceLoad') {
					if ($(this).attr('rev') == 'shown')
						modal.scriptsShown.push(this);
					else
						modal.scripts.push(this);
				}
			} else
				tmp.push(this);
		});
		return tmp;
	}

	// Get the vertical and horizontal margin, padding and border dimension
	function getOuter(elm) {
		elm = elm.get(0);
		var ret = {
			h: {
				margin: getCurCSS(elm, 'marginTop') + getCurCSS(elm, 'marginBottom'),
				border: getCurCSS(elm, 'borderTopWidth') + getCurCSS(elm, 'borderBottomWidth'),
				padding: getCurCSS(elm, 'paddingTop') + getCurCSS(elm, 'paddingBottom')
			},
			w: {
				margin: getCurCSS(elm, 'marginLeft') + getCurCSS(elm, 'marginRight'),
				border: getCurCSS(elm, 'borderLeftWidth') + getCurCSS(elm, 'borderRightWidth'),
				padding: getCurCSS(elm, 'paddingLeft') + getCurCSS(elm, 'paddingRight')
			}
		};

		ret.h.outer = ret.h.margin + ret.h.border;
		ret.w.outer = ret.w.margin + ret.w.border;

		ret.h.inner = ret.h.padding + ret.h.border;
		ret.w.inner = ret.w.padding + ret.w.border;

		ret.h.total = ret.h.outer + ret.h.padding;
		ret.w.total = ret.w.outer + ret.w.padding;

		return ret;
	}

	function getCurCSS(elm, name) {
		var ret = parseInt($.curCSS(elm, name, true));
		if (isNaN(ret))
			ret = 0;
		return ret;
	}

	// Proxy Debug function
	function debug(msg) {
		if ($.fn.nyroModal.settings.debug || currentSettings && currentSettings.debug)
			nyroModalDebug(msg, modal, currentSettings || {});
	}

	// -------------------------------------------------------
	// Default animation function
	// -------------------------------------------------------

	function showBackground(elts, settings, callback) {
		elts.bg.css({opacity:0}).fadeTo(100, 0.50, callback);
	}

	function hideBackground(elts, settings, callback) {
		elts.bg.fadeOut(100, callback);
	}

	function showLoading(elts, settings, callback) {
		elts.loading
			.css({
				marginTop: settings.marginTopLoading+'px',
				marginLeft: settings.marginLeftLoading+'px',
				opacity: 0
			})
			.show()
			.animate({
				opacity: 1
			}, {complete: callback, duration: 400});
	}

	function hideLoading(elts, settings, callback) {
		callback();
	}

	function showContent(elts, settings, callback) {
		elts.loading
			.css({
				marginTop: settings.marginTopLoading+'px',
				marginLeft: settings.marginLeftLoading+'px'
			})
			.show()
			.animate({
				width: settings.width+'px',
				height: settings.height+'px',
				marginTop: settings.marginTop+'px',
				marginLeft: settings.marginLeft+'px'
			}, {duration: 350, complete: function() {
				elts.contentWrapper
					.css({
						width: settings.width+'px',
						height: settings.height+'px',
						marginTop: settings.marginTop+'px',
						marginLeft: settings.marginLeft+'px'
					})
					.show();
					elts.loading.fadeOut(200, callback);
				}
			});
	}

	function hideContent(elts, settings, callback) {
		elts.contentWrapper
			.animate({
				height: '50px',
				width: '50px',
				marginTop: (-(25+settings.borderH)/2 + settings.marginScrollTop)+'px',
				marginLeft: (-(25+settings.borderW)/2 + settings.marginScrollLeft)+'px'
			}, {duration: 350, complete: function() {
				elts.contentWrapper.hide();
				callback();
			}});
	}

	function showTransition(elts, settings, callback) {
		// Put the loading with the same dimensions of the current content
		elts.loading
			.css({
				marginTop: elts.contentWrapper.css('marginTop'),
				marginLeft: elts.contentWrapper.css('marginLeft'),
				height: elts.contentWrapper.css('height'),
				width: elts.contentWrapper.css('width'),
				opacity: 0
			})
			.show()
			.fadeTo(100, 1, function() {
					elts.contentWrapper.hide();
					callback();
				});
	}

	function hideTransition(elts, settings, callback) {
		// Place the content wrapper underneath the the loading with the right dimensions
		elts.contentWrapper
			.hide()
			.css({
				width: settings.width+'px',
				height: settings.height+'px',
				marginLeft: settings.marginLeft+'px',
				marginTop: settings.marginTop+'px',
				opacity: 1
			});
		elts.loading
			.animate({
				width: settings.width+'px',
				height: settings.height+'px',
				marginLeft: settings.marginLeft+'px',
				marginTop: settings.marginTop+'px'
			}, {complete: function() {
					elts.contentWrapper.show();
					elts.loading.fadeOut(400, function() {
						elts.loading.hide();
						callback();
					});
				}, duration: 350});
	}

	function resize(elts, settings, callback) {
		elts.contentWrapper
			.animate({
				width: settings.width+'px',
				height: settings.height+'px',
				marginLeft: settings.marginLeft+'px',
				marginTop: settings.marginTop+'px'
			}, {complete: callback, duration: 400});
	}

	function updateBgColor(elts, settings, callback) {
		if (!$.fx.step.backgroundColor) {
			elts.bg.css({backgroundColor: settings.bgColor});
			callback();
		} else
			elts.bg
				.animate({
					backgroundColor: settings.bgColor
				}, {complete: callback, duration: 400});
	}

	// -------------------------------------------------------
	// Default initialization
	// -------------------------------------------------------

	$($.fn.nyroModal.settings.openSelector).nyroModal();

});

// Default debug function, to be overwritten if needed
//      Be aware that the settings parameter could be empty
function nyroModalDebug(msg, elts, settings) {
	if (elts.full)
		elts.bg.prepend(msg+'<br />');
}

/*
********************************************** SART INCLUDE jquery.tooltip.js *****************************
*/
/**
 *  jQuery Tooltip Plugin
 *@requires jQuery v1.2.6
 *  http://www.socialembedded.com/labs
 *
 *  Copyright (c)  Hernan Amiune (hernan.amiune.com)
 *  Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 * 
 *  Version: 1.3
 */
 
(function($){ $.fn.tooltip = function(options){

    var defaults = {
        cssClass: "",     		// CSS class or classes to style the tooltip
		delay : 100,        	// The number of milliseconds before displaying the tooltip
        duration : 500,   		// The number of milliseconds after moving the mouse cusor before removing the tooltip.
		stickyDuration : 10000, // added a delay before removing a sticky tooltip.
        xOffset : 20,     		// X offset will allow the tooltip to appear offset by x pixels.
        yOffset : 10,     		// Y offset will allow the tooltip to appear offset by y pixels.
		opacity : 0,      		// 0 is completely opaque and 100 completely transparent
		sticky : false,   		// true to make the tooltip sticky
		fadeDuration: 400 		// [toxi20090112] added fade duration in millis (default = "normal")
	};
  
    var options = $.extend(defaults, options);
	
	
	return this.each(function(index) {
		
		var $this = $(this);
		
		//use just one div for all tooltips
		// [toxi20090112] allow the tooltip div to be already present (would break currently)
		$tooltip=$("#divTooltip");
		if($tooltip.length == 0){
			$tooltip = $('<div id="divTooltip"></div>');			
			$('body').append($tooltip);
			$tooltip.hide();
		}
		
		function displayTooltip(e){
		    //compatibility issue
			e = e ? e : window.event;
			
			//don't hide the tooltip if the mouse is over the element again
			clearTimeout($tooltip.data("hideTimeoutId"));
			
			//set the tooltip class
			$tooltip.removeClass($tooltip.attr("class"));
			$tooltip.css("width","");
			$tooltip.css("height","");
			$tooltip.addClass(options.cssClass);
			$tooltip.css("opacity",1-options.opacity/100);
			$tooltip.css("position","absolute");			
			
			//save the title text and remove it from title to avoid showing the default tooltip
			$tooltip.data("title",$this.attr("title"));
			if(!options.sticky)$this.attr("title","");
			$tooltip.data("alt",$this.attr("alt"));
			if(!options.sticky)$this.attr("alt","");
			
			//set the tooltip content
			$tooltip.html($tooltip.data("title"));
			// [toxi20090112] only use ajax if there actually is an href attrib present
			var href=$this.attr("href"); //Changed from "href" to "lang" (allows for use on img tags with xhtml validation, without using anchor tags)
			//href!="" added
			if(href!=undefined && href!="" && href != "#")
			    $tooltip.html($.ajax({url:$this.attr("href"),async:false}).responseText); //Changed from "href" to "lang" (allows for use on img tags with xhtml validation, without using anchor tags)
			
			//set the tooltip position
			winw = $(window).width();
			w = $tooltip.width();
			xOffset = options.xOffset;
			//alert(" xOffset :"+xOffset);
			
			//right priority
			if(w+xOffset+50 < winw-e.clientX)
			  $tooltip.css("left", $(document).scrollLeft() + e.clientX+xOffset);
			else if(w+xOffset+50 < e.clientX)
			  $tooltip.css("left", $(document).scrollLeft() + e.clientX-(w+xOffset));
			else{
			  //there is more space at left, fit the tooltip there
			  if(e.clientX > winw/2){
				$tooltip.width(e.clientX-50);
				$tooltip.css("left", $(document).scrollLeft() + 25);
			  }
			  //there is more space at right, fit the tooltip there
			  else{
				$tooltip.width((winw-e.clientX)-50);
				$tooltip.css("left", $(document).scrollLeft() + e.clientX+xOffset);
			  }
			}
			
			winh = $(window).height();
			h = $tooltip.height();
			yOffset = options.yOffset;

			//top position priority
			if(h+yOffset + 50 < e.clientY)
			  $tooltip.css("top", $(document).scrollTop() + e.clientY-(h+yOffset));
			else if(h+yOffset + 50 < winh-e.clientY)
			  $tooltip.css("top", $(document).scrollTop() + e.clientY+yOffset);
			else 
			  $tooltip.css("top", $(document).scrollTop() + 10);
			
			//start the timer to show the tooltip
			//[toxi20090112] modified to make use of fadeDuration option
			if(!options.sticky)$tooltip.data("showTimeoutId", setTimeout("$tooltip.fadeIn("+options.fadeDuration+")",options.delay));
			else $tooltip.toggle();
		}
		
		
		if(options.sticky){
			
			/**$this.mouseover(function(e){  //Added to activate event on mouseover or click
                e.preventDefault();
				displayTooltip(e);
				$this.attr("title",$tooltip.data("title"));
				$this.attr("alt",$tooltip.data("alt"));
				clearTimeout($tooltip.data("showTimeoutId"));
				$tooltip.data("hideTimeoutId", setTimeout("$tooltip.fadeOut("+options.fadeDuration+")",options.stickyDuration));
		    });
			**/
			
			$this.click(function(e){  //Modified
                e.preventDefault();
				displayTooltip(e);
				$this.attr("title",$tooltip.data("title"));
				$this.attr("alt",$tooltip.data("alt"));
				clearTimeout($tooltip.data("showTimeoutId"));
				//$tooltip.data("hideTimeoutId", setTimeout("$tooltip.fadeOut("+options.fadeDuration+")",options.stickyDuration));
		    });

			
		}
		else{
		    
			//displays the tooltip
			$this.mouseover( function(e){
				displayTooltip(e);
			});
			
			$this.mouseout(function(e){
				//restore the title
				$this.attr("title",$tooltip.data("title"));
				$this.attr("alt",$tooltip.data("alt"));
				//don't show the tooltip if the mouse left the element before the delay time
				clearTimeout($tooltip.data("showTimeoutId"));
				//start the timer to hide the tooltip
				//[toxi20090112] modified to make use of fadeDuration option
				$tooltip.data("hideTimeoutId", setTimeout("$tooltip.fadeOut("+options.fadeDuration+")",options.duration));
			});
			
			$this.click(function(e){
		        e.preventDefault();
		    });
		}
		
		

	});

}})(jQuery);

/*
********************************************** SART INCLUDE jquery.validate.js *****************************
*/
/*
 * jQuery validation plug-in 1.5.2
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6243 2009-02-19 11:40:49Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {
		
		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}
		
		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) {
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				validator.cancelSubmit = true;
			});
		
			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( validator.settings.submitHandler ) {
						validator.settings.submitHandler.call( validator, validator.currentForm );
						return false;
					}
					return true;
				}
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}
		
		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = false;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid |= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim(a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim(a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});


$.format = function(source, params) {
	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass );
				this.errorsFor(element).hide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			if ( element.name in this.submitted )
				this.element(element);
		},
		highlight: function( element, errorClass ) {
			$( element ).addClass( errorClass );
		},
		unhighlight: function( element, errorClass ) {
			$( element ).removeClass( errorClass );
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		dateDE: "Bitte geben Sie ein gültiges Datum ein.",
		number: "Please enter a valid number.",
		numberDE: "Bitte geben Sie eine Nummer ein.",
		digits: "Please enter only digits",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.format("Please enter no more than {0} characters."),
		minlength: $.format("Please enter at least {0} characters."),
		rangelength: $.format("Please enter a value between {0} and {1} characters long."),
		range: $.format("Please enter a value between {0} and {1}."),
		max: $.format("Please enter a value less than or equal to {0}."),
		min: $.format("Please enter a value greater than or equal to {0}."),
		alfaChars:"Please enter only characters [A-Z or a-z]."
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});
			
			function delegate(event) {
				var validator = $.data(this[0].form, "validator");
				validator.settings["on" + event.type] && validator.settings["on" + event.type].call(validator, this[0] );
			}
			$(this.currentForm)
				.delegate("focusin focusout keyup", ":text, :password, :file, select, textarea", delegate)
				.delegate("click", ":radio, :checkbox", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid(); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus();
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.formSubmitted = false;
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method");
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method );
			if ( typeof message == "function" ) 
				message = message.call(this, rule.parameters, element);
			this.errorList.push({
				message: message,
				element: element
			});
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parents( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			return this.errors().filter("[for='" + this.idOrName(element) + "']");
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", previous = {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true},
		alfaChars: {alfaChars: true}
	},
	
	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message;
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				var options = $("option:selected", element);
				return options.length > 0 && ( element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						if ( response ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.showErrors();
						} else {
							var errors = {};
							errors[element.name] =  response || validator.defaultMessage( element, "remote" );
							validator.showErrors(errors);
						}
						previous.valid = response;
						validator.stopRequest(element, response);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valid;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateDE
		dateDE: function(value, element) {
			return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/numberDE
		numberDE: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		alfaChars:function(value,element){			
			//return this.optional(element) || /^[a-zA-Z]+$/.test(value);	
			return this.optional(element) || /^[a-zA-Z][a-zA-Z\ \-\']+$/.test(value);		 
		},
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			return value == $(param).val();
		}
		
	}
	
});

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;(function($) {
	$.each({
		focus: 'focusin',
		blur: 'focusout'	
	}, function( original, fix ){
		$.event.special[fix] = {
			setup:function() {
				if ( $.browser.msie ) return false;
				this.addEventListener( original, $.event.special[fix].handler, true );
			},
			teardown:function() {
				if ( $.browser.msie ) return false;
				this.removeEventListener( original,
				$.event.special[fix].handler, true );
			},
			handler: function(e) {
				arguments[0] = $.event.fix(e);
				arguments[0].type = fix;
				return $.event.handle.apply(this, arguments);
			}
		};
	});
	$.extend($.fn, {
		delegate: function(type, delegate, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		},
		triggerEvent: function(type, target) {
			return this.triggerHandler(type, [$.event.fix({ type: type, target: target })]);
		}
	})
})(jQuery);

/*
********************************************** SART INCLUDE jquery.nyroModal-1.6.2.min.js *****************************
*/
/*
 * nyroModal - jQuery Plugin
 * http://nyromodal.nyrodev.com
 *
 * Copyright (c) 2010 Cedric Nirousset (nyrodev.com)
 * Licensed under the MIT license
 *
 * $Date: 2010-02-23 (Tue, 23 Feb 2010) $
 * $version: 1.6.2
 */
jQuery(function($){var userAgent=navigator.userAgent.toLowerCase();var browserVersion=(userAgent.match(/.+(?:rv|webkit|khtml|opera|msie)[\/: ]([\d.]+)/)||[0,'0'])[1];var isIE6=(/msie/.test(userAgent)&&!/opera/.test(userAgent)&&parseInt(browserVersion)<7&&(!window.XMLHttpRequest||typeof(XMLHttpRequest)==='function'));var body=$('body');var currentSettings;var callingSettings;var shouldResize=false;var gallery={};var fixFF=false;var contentElt;var contentEltLast;var modal={started:false,ready:false,dataReady:false,anim:false,animContent:false,loadingShown:false,transition:false,resizing:false,closing:false,error:false,blocker:null,blockerVars:null,full:null,bg:null,loading:null,tmp:null,content:null,wrapper:null,contentWrapper:null,scripts:new Array(),scriptsShown:new Array()};var resized={width:false,height:false,windowResizing:false};var initSettingsSize={width:null,height:null,windowResizing:true};var windowResizeTimeout;$.fn.nyroModal=function(settings){if(!this)return false;return this.each(function(){var me=$(this);if(this.nodeName.toLowerCase()=='form'){me.unbind('submit.nyroModal').bind('submit.nyroModal',function(e){if(e.isDefaultPrevented())return false;if(me.data('nyroModalprocessing'))return true;if(this.enctype=='multipart/form-data'){processModal($.extend(settings,{from:this}));return true}e.preventDefault();processModal($.extend(settings,{from:this}));return false})}else{me.unbind('click.nyroModal').bind('click.nyroModal',function(e){if(e.isDefaultPrevented())return false;e.preventDefault();processModal($.extend(settings,{from:this}));return false})}})};$.fn.nyroModalManual=function(settings){if(!this.length)processModal(settings);return this.each(function(){processModal($.extend(settings,{from:this}))})};$.nyroModalManual=function(settings){processModal(settings)};$.nyroModalSettings=function(settings,deep1,deep2){setCurrentSettings(settings,deep1,deep2);if(!deep1&&modal.started){if(modal.bg&&settings.bgColor)currentSettings.updateBgColor(modal,currentSettings,function(){});if(modal.contentWrapper&&settings.title)setTitle();if(!modal.error&&(settings.windowResizing||(!modal.resizing&&(('width'in settings&&settings.width==currentSettings.width)||('height'in settings&&settings.height==currentSettings.height))))){modal.resizing=true;if(modal.contentWrapper)calculateSize(true);if(modal.contentWrapper&&modal.contentWrapper.is(':visible')&&!modal.animContent){if(fixFF)modal.content.css({position:''});currentSettings.resize(modal,currentSettings,function(){currentSettings.windowResizing=false;modal.resizing=false;if(fixFF)modal.content.css({position:'fixed'});if($.isFunction(currentSettings.endResize))currentSettings.endResize(modal,currentSettings)})}}}};$.nyroModalRemove=function(){removeModal()};$.nyroModalNext=function(){var link=getGalleryLink(1);if(link)return link.nyroModalManual(getCurrentSettingsNew());return false};$.nyroModalPrev=function(){var link=getGalleryLink(-1);if(link)return link.nyroModalManual(getCurrentSettingsNew());return false};$.fn.nyroModal.settings={debug:false,blocker:false,windowResize:true,modal:false,type:'',forceType:null,from:'',hash:'',processHandler:null,selIndicator:'nyroModalSel',formIndicator:'nyroModal',content:null,bgColor:'#666666',ajax:{},swf:{wmode:'transparent'},width:null,height:null,minWidth:20,minHeight:20,resizable:true,autoSizable:true,padding:25,regexImg:'[^\.]\.(jpg|jpeg|png|tiff|gif|bmp)\s*$',addImageDivTitle:false,defaultImgAlt:'Image',setWidthImgTitle:true,ltr:true,gallery:null,galleryLinks:'<a href="#" class="nyroModalPrev">Prev</a><a href="#"  class="nyroModalNext">Next</a>',galleryCounts:galleryCounts,galleryLoop:false,zIndexStart:100,cssOpt:{bg:{position:'absolute',overflow:'hidden',top:0,left:0,height:'100%',width:'100%'},wrapper:{position:'absolute',top:'50%',left:'50%'},wrapper2:{},content:{},loading:{position:'absolute',top:'50%',left:'50%',marginTop:'-50px',marginLeft:'-50px'}},wrap:{div:'<div class="wrapper"></div>',ajax:'<div class="wrapper"></div>',form:'<div class="wrapper"></div>',formData:'<div class="wrapper"></div>',image:'<div class="wrapperImg"></div>',swf:'<div class="wrapperSwf"></div>',iframe:'<div class="wrapperIframe"></div>',iframeForm:'<div class="wrapperIframe"></div>',manual:'<div class="wrapper"></div>'},closeButton:'<a href="#Close" class="nyroModalClose" id="closeBut" title="Close">Close</a>',title:null,titleFromIframe:true,openSelector:'.nyroModal',closeSelector:'.nyroModalClose',contentLoading:'<a href="#Cancel" class="nyroModalClose" title="Cancel loading this popup">Cancel</a>',errorClass:'error',contentError:'The requested content cannot be loaded. <br />Please try again later. <br /><a href="#Close" class="nyroModalClose" title="Close">Close</a>',handleError:null,showBackground:showBackground,hideBackground:hideBackground,endFillContent:null,showContent:showContent,endShowContent:null,beforeHideContent:null,hideContent:hideContent,showTransition:showTransition,hideTransition:hideTransition,showLoading:showLoading,hideLoading:hideLoading,resize:resize,endResize:null,updateBgColor:updateBgColor,endRemove:null};function processModal(settings){if(modal.loadingShown||modal.transition||modal.anim)return;debug('processModal');modal.started=true;callingSettings=$.extend(true,settings);setDefaultCurrentSettings(settings);if(!modal.full)modal.blockerVars=modal.blocker=null;modal.error=false;modal.closing=false;modal.dataReady=false;modal.scripts=new Array();modal.scriptsShown=new Array();currentSettings.type=fileType();if(currentSettings.forceType){if(!currentSettings.content)currentSettings.from=true;currentSettings.type=currentSettings.forceType;currentSettings.forceType=null}if($.isFunction(currentSettings.processHandler))currentSettings.processHandler(currentSettings);var from=currentSettings.from;var url=currentSettings.url;initSettingsSize.width=currentSettings.width;initSettingsSize.height=currentSettings.height;if(currentSettings.type=='swf'){setCurrentSettings({overflow:'visible'},'cssOpt','content');currentSettings.content='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+currentSettings.width+'" height="'+currentSettings.height+'"><param name="movie" value="'+url+'"></param>';var tmp='';$.each(currentSettings.swf,function(name,val){currentSettings.content+='<param name="'+name+'" value="'+val+'"></param>';tmp+=' '+name+'="'+val+'"'});currentSettings.content+='<embed src="'+url+'" type="application/x-shockwave-flash" width="'+currentSettings.width+'" height="'+currentSettings.height+'"'+tmp+'></embed></object>'}if(from){var jFrom=$(from).blur();if(currentSettings.type=='form'){var data=$(from).serializeArray();data.push({name:currentSettings.formIndicator,value:1});if(currentSettings.selector)data.push({name:currentSettings.selIndicator,value:currentSettings.selector.substring(1)});showModal();$.ajax($.extend({},currentSettings.ajax,{url:url,data:data,type:jFrom.attr('method')?jFrom.attr('method'):'get',success:ajaxLoaded,error:loadingError}));debug('Form Ajax Load: '+jFrom.attr('action'))}else if(currentSettings.type=='formData'){initModal();jFrom.attr('target','nyroModalIframe');jFrom.attr('action',url);jFrom.prepend('<input type="hidden" name="'+currentSettings.formIndicator+'" value="1" />');if(currentSettings.selector)jFrom.prepend('<input type="hidden" name="'+currentSettings.selIndicator+'" value="'+currentSettings.selector.substring(1)+'" />');modal.tmp.html('<iframe frameborder="0" hspace="0" name="nyroModalIframe" src="javascript:\'\';"></iframe>');$('iframe',modal.tmp).css({width:currentSettings.width,height:currentSettings.height}).error(loadingError).load(formDataLoaded);debug('Form Data Load: '+jFrom.attr('action'));showModal();showContentOrLoading()}else if(currentSettings.type=='image'){debug('Image Load: '+url);var title=jFrom.attr('title')||currentSettings.defaultImgAlt;initModal();modal.tmp.html('<img id="nyroModalImg" />').find('img').attr('alt',title);modal.tmp.css({lineHeight:0});$('img',modal.tmp).error(loadingError).load(function(){debug('Image Loaded: '+this.src);$(this).unbind('load');var w=modal.tmp.width();var h=modal.tmp.height();modal.tmp.css({lineHeight:''});resized.width=w;resized.height=h;setCurrentSettings({width:w,height:h,imgWidth:w,imgHeight:h});initSettingsSize.width=w;initSettingsSize.height=h;setCurrentSettings({overflow:'visible'},'cssOpt','content');modal.dataReady=true;if(modal.loadingShown||modal.transition)showContentOrLoading()}).attr('src',url);showModal()}else if(currentSettings.type=='iframeForm'){initModal();modal.tmp.html('<iframe frameborder="0" hspace="0" src="javascript:\'\';" name="nyroModalIframe" id="nyroModalIframe"></iframe>');debug('Iframe Form Load: '+url);$('iframe',modal.tmp).eq(0).css({width:'100%',height:$.support.boxModel?'99%':'100%'}).load(iframeLoaded);modal.dataReady=true;showModal()}else if(currentSettings.type=='iframe'){initModal();modal.tmp.html('<iframe frameborder="0" hspace="0" src="javascript:\'\';" name="nyroModalIframe" id="nyroModalIframe"></iframe>');debug('Iframe Load: '+url);$('iframe',modal.tmp).eq(0).css({width:'100%',height:$.support.boxModel?'99%':'100%'}).load(iframeLoaded);modal.dataReady=true;showModal()}else if(currentSettings.type){debug('Content: '+currentSettings.type);initModal();modal.tmp.html(currentSettings.content);var w=modal.tmp.width();var h=modal.tmp.height();var div=$(currentSettings.type);if(div.length){setCurrentSettings({type:'div'});w=div.width();h=div.height();if(contentElt)contentEltLast=contentElt;contentElt=div;modal.tmp.append(div.contents())}initSettingsSize.width=w;initSettingsSize.height=h;setCurrentSettings({width:w,height:h});if(modal.tmp.html())modal.dataReady=true;else loadingError();if(!modal.ready)showModal();else endHideContent()}else{debug('Ajax Load: '+url);setCurrentSettings({type:'ajax'});var data=currentSettings.ajax.data||{};if(currentSettings.selector){if(typeof data=="string"){data+='&'+currentSettings.selIndicator+'='+currentSettings.selector.substring(1)}else{data[currentSettings.selIndicator]=currentSettings.selector.substring(1)}}showModal();$.ajax($.extend(true,currentSettings.ajax,{url:url,success:ajaxLoaded,error:loadingError,data:data}))}}else if(currentSettings.content){debug('Content: '+currentSettings.type);setCurrentSettings({type:'manual'});initModal();modal.tmp.html($('<div/>').html(currentSettings.content).contents());if(modal.tmp.html())modal.dataReady=true;else loadingError();showModal()}else{}}function setDefaultCurrentSettings(settings){debug('setDefaultCurrentSettings');currentSettings=$.extend(true,{},$.fn.nyroModal.settings,settings);setMargin()}function setCurrentSettings(settings,deep1,deep2){if(modal.started){if(deep1&&deep2){$.extend(true,currentSettings[deep1][deep2],settings)}else if(deep1){$.extend(true,currentSettings[deep1],settings)}else{if(modal.animContent){if('width'in settings){if(!modal.resizing){settings.setWidth=settings.width;shouldResize=true}delete settings['width']}if('height'in settings){if(!modal.resizing){settings.setHeight=settings.height;shouldResize=true}delete settings['height']}}$.extend(true,currentSettings,settings)}}else{if(deep1&&deep2){$.extend(true,$.fn.nyroModal.settings[deep1][deep2],settings)}else if(deep1){$.extend(true,$.fn.nyroModal.settings[deep1],settings)}else{$.extend(true,$.fn.nyroModal.settings,settings)}}}function setMarginScroll(){if(isIE6&&!modal.blocker){if(document.documentElement){currentSettings.marginScrollLeft=document.documentElement.scrollLeft;currentSettings.marginScrollTop=document.documentElement.scrollTop}else{currentSettings.marginScrollLeft=document.body.scrollLeft;currentSettings.marginScrollTop=document.body.scrollTop}}else{currentSettings.marginScrollLeft=0;currentSettings.marginScrollTop=0}}function setMargin(){setMarginScroll();currentSettings.marginLeft=-(currentSettings.width+currentSettings.borderW)/2;currentSettings.marginTop=-(currentSettings.height+currentSettings.borderH)/2;if(!modal.blocker){currentSettings.marginLeft+=currentSettings.marginScrollLeft;currentSettings.marginTop+=currentSettings.marginScrollTop}}function setMarginLoading(){setMarginScroll();var outer=getOuter(modal.loading);currentSettings.marginTopLoading=-(modal.loading.height()+outer.h.border+outer.h.padding)/2;currentSettings.marginLeftLoading=-(modal.loading.width()+outer.w.border+outer.w.padding)/2;if(!modal.blocker){currentSettings.marginLeftLoading+=currentSettings.marginScrollLeft;currentSettings.marginTopLoading+=currentSettings.marginScrollTop}}function setTitle(){var title=$('h1#nyroModalTitle',modal.contentWrapper);if(title.length)title.text(currentSettings.title);else modal.contentWrapper.prepend('<h1 id="nyroModalTitle">'+currentSettings.title+'</h1>')}function initModal(){debug('initModal');if(!modal.full){if(currentSettings.debug)setCurrentSettings({color:'white'},'cssOpt','bg');var full={zIndex:currentSettings.zIndexStart,position:'fixed',top:0,left:0,width:'100%',height:'100%'};var contain=body;var iframeHideIE='';if(currentSettings.blocker){modal.blocker=contain=$(currentSettings.blocker);var pos=modal.blocker.offset();var w=modal.blocker.outerWidth();var h=modal.blocker.outerHeight();if(isIE6){setCurrentSettings({height:'100%',width:'100%',top:0,left:0},'cssOpt','bg')}modal.blockerVars={top:pos.top,left:pos.left,width:w,height:h};var plusTop=(/msie/.test(userAgent)?0:getCurCSS(body.get(0),'borderTopWidth'));var plusLeft=(/msie/.test(userAgent)?0:getCurCSS(body.get(0),'borderLeftWidth'));full={position:'absolute',top:pos.top+plusTop,left:pos.left+plusLeft,width:w,height:h}}else if(isIE6){body.css({marginLeft:0,marginRight:0});var w=body.width();var h=$(window).height()+'px';if($(window).height()>=body.outerHeight()){h=body.outerHeight()+'px'}else w+=20;w+='px';body.css({width:w,height:h,position:'static',overflow:'hidden'});$('html').css({overflow:'hidden'});setCurrentSettings({cssOpt:{bg:{position:'absolute',zIndex:currentSettings.zIndexStart+1,height:'110%',width:'110%',top:currentSettings.marginScrollTop+'px',left:currentSettings.marginScrollLeft+'px'},wrapper:{zIndex:currentSettings.zIndexStart+2},loading:{zIndex:currentSettings.zIndexStart+3}}});iframeHideIE=$('<iframe id="nyroModalIframeHideIe" src="javascript:\'\';"></iframe>').css($.extend({},currentSettings.cssOpt.bg,{opacity:0,zIndex:50,border:'none'}))}contain.append($('<div id="nyroModalFull"><div id="nyroModalBg"></div><div id="nyroModalWrapper"><div id="nyroModalContent"></div></div><div id="nyrModalTmp"></div><div id="nyroModalLoading"></div></div>').hide());modal.full=$('#nyroModalFull').css(full).show();modal.bg=$('#nyroModalBg').css($.extend({backgroundColor:currentSettings.bgColor},currentSettings.cssOpt.bg)).before(iframeHideIE);modal.bg.bind('click.nyroModal',clickBg);modal.loading=$('#nyroModalLoading').css(currentSettings.cssOpt.loading).hide();modal.contentWrapper=$('#nyroModalWrapper').css(currentSettings.cssOpt.wrapper).hide();modal.content=$('#nyroModalContent');modal.tmp=$('#nyrModalTmp').hide();if($.isFunction($.fn.mousewheel)){modal.content.mousewheel(function(e,d){var elt=modal.content.get(0);if((d>0&&elt.scrollTop==0)||(d<0&&elt.scrollHeight-elt.scrollTop==elt.clientHeight)){e.preventDefault();e.stopPropagation()}})}$(document).bind('keydown.nyroModal',keyHandler);modal.content.css({width:'auto',height:'auto'});modal.contentWrapper.css({width:'auto',height:'auto'});if(!currentSettings.blocker&&currentSettings.windowResize){$(window).bind('resize.nyroModal',function(){window.clearTimeout(windowResizeTimeout);windowResizeTimeout=window.setTimeout(windowResizeHandler,200)})}}}function windowResizeHandler(){$.nyroModalSettings(initSettingsSize)}function showModal(){debug('showModal');if(!modal.ready){initModal();modal.anim=true;currentSettings.showBackground(modal,currentSettings,endBackground)}else{modal.anim=true;modal.transition=true;currentSettings.showTransition(modal,currentSettings,function(){endHideContent();modal.anim=false;showContentOrLoading()})}}function clickBg(e){if(!currentSettings.modal)removeModal()}function keyHandler(e){if(e.keyCode==27){if(!currentSettings.modal)removeModal()}else if(currentSettings.gallery&&modal.ready&&modal.dataReady&&!modal.anim&&!modal.transition){if(e.keyCode==39||e.keyCode==40){e.preventDefault();$.nyroModalNext();return false}else if(e.keyCode==37||e.keyCode==38){e.preventDefault();$.nyroModalPrev();return false}}}function fileType(){var from=currentSettings.from;var url;if(from&&from.nodeName){var jFrom=$(from);url=jFrom.attr(from.nodeName.toLowerCase()=='form'?'action':'href');if(!url)url=location.href.substring(window.location.host.length+7);currentSettings.url=url;if(jFrom.attr('rev')=='modal')currentSettings.modal=true;currentSettings.title=jFrom.attr('title');if(from&&from.rel&&from.rel.toLowerCase()!='nofollow'){var indexSpace=from.rel.indexOf(' ');currentSettings.gallery=indexSpace>0?from.rel.substr(0,indexSpace):from.rel}var imgType=imageType(url,from);if(imgType)return imgType;if(isSwf(url))return'swf';var iframe=false;if(from.target&&from.target.toLowerCase()=='_blank'||(from.hostname&&from.hostname.replace(/:\d*$/,'')!=window.location.hostname.replace(/:\d*$/,''))){iframe=true}if(from.nodeName.toLowerCase()=='form'){if(iframe)return'iframeForm';setCurrentSettings(extractUrlSel(url));if(jFrom.attr('enctype')=='multipart/form-data')return'formData';return'form'}if(iframe)return'iframe'}else{url=currentSettings.url;if(!currentSettings.content)currentSettings.from=true;if(!url)return null;if(isSwf(url))return'swf';var reg1=new RegExp("^http://|https://","g");if(url.match(reg1))return'iframe'}var imgType=imageType(url,from);if(imgType)return imgType;var tmp=extractUrlSel(url);setCurrentSettings(tmp);if(!tmp.url)return tmp.selector}function imageType(url,from){var image=new RegExp(currentSettings.regexImg,'i');if(image.test(url)){return'image'}}function isSwf(url){var swf=new RegExp('[^\.]\.(swf)\s*$','i');return swf.test(url)}function extractUrlSel(url){var ret={url:null,selector:null};if(url){var hash=getHash(url);var hashLoc=getHash(window.location.href);var curLoc=window.location.href.substring(0,window.location.href.length-hashLoc.length);var req=url.substring(0,url.length-hash.length);if(req==curLoc||req==$('base').attr('href')){ret.selector=hash}else{ret.url=req;ret.selector=hash}}return ret}function loadingError(){debug('loadingError');modal.error=true;if(!modal.ready)return;if($.isFunction(currentSettings.handleError))currentSettings.handleError(modal,currentSettings);modal.loading.addClass(currentSettings.errorClass).html(currentSettings.contentError);$(currentSettings.closeSelector,modal.loading).unbind('click.nyroModal').bind('click.nyroModal',removeModal);setMarginLoading();modal.loading.css({marginTop:currentSettings.marginTopLoading+'px',marginLeft:currentSettings.marginLeftLoading+'px'})}function fillContent(){debug('fillContent');if(!modal.tmp.html())return;modal.content.html(modal.tmp.contents());modal.tmp.empty();wrapContent();if(currentSettings.type=='iframeForm'){$(currentSettings.from).attr('target','nyroModalIframe').data('nyroModalprocessing',1).submit().attr('target','_blank').removeData('nyroModalprocessing')}if(!currentSettings.modal)modal.wrapper.append(currentSettings.closeButton);if($.isFunction(currentSettings.endFillContent))currentSettings.endFillContent(modal,currentSettings);modal.content.append(modal.scripts);$(currentSettings.closeSelector,modal.contentWrapper).unbind('click.nyroModal').bind('click.nyroModal',removeModal);$(currentSettings.openSelector,modal.contentWrapper).nyroModal(getCurrentSettingsNew())}function getCurrentSettingsNew(){return callingSettings;var currentSettingsNew=$.extend(true,{},currentSettings);if(resized.width)currentSettingsNew.width=null;else currentSettingsNew.width=initSettingsSize.width;if(resized.height)currentSettingsNew.height=null;else currentSettingsNew.height=initSettingsSize.height;currentSettingsNew.cssOpt.content.overflow='auto';return currentSettingsNew}function wrapContent(){debug('wrapContent');var wrap=$(currentSettings.wrap[currentSettings.type]);modal.content.append(wrap.children().remove());modal.contentWrapper.wrapInner(wrap);if(currentSettings.gallery){modal.content.append(currentSettings.galleryLinks);gallery.links=$('[rel="'+currentSettings.gallery+'"], [rel^="'+currentSettings.gallery+' "]');gallery.index=gallery.links.index(currentSettings.from);if(currentSettings.galleryCounts&&$.isFunction(currentSettings.galleryCounts))currentSettings.galleryCounts(gallery.index+1,gallery.links.length,modal,currentSettings);var currentSettingsNew=getCurrentSettingsNew();var linkPrev=getGalleryLink(-1);if(linkPrev){var prev=$('.nyroModalPrev',modal.contentWrapper).attr('href',linkPrev.attr('href')).click(function(e){e.preventDefault();$.nyroModalPrev();return false});if(isIE6&&currentSettings.type=='swf'){prev.before($('<iframe id="nyroModalIframeHideIeGalleryPrev" src="javascript:\'\';"></iframe>').css({position:prev.css('position'),top:prev.css('top'),left:prev.css('left'),width:prev.width(),height:prev.height(),opacity:0,border:'none'}))}}else{$('.nyroModalPrev',modal.contentWrapper).remove()}var linkNext=getGalleryLink(1);if(linkNext){var next=$('.nyroModalNext',modal.contentWrapper).attr('href',linkNext.attr('href')).click(function(e){e.preventDefault();$.nyroModalNext();return false});if(isIE6&&currentSettings.type=='swf'){next.before($('<iframe id="nyroModalIframeHideIeGalleryNext" src="javascript:\'\';"></iframe>').css($.extend({},{position:next.css('position'),top:next.css('top'),left:next.css('left'),width:next.width(),height:next.height(),opacity:0,border:'none'})))}}else{$('.nyroModalNext',modal.contentWrapper).remove()}}calculateSize()}function getGalleryLink(dir){if(currentSettings.gallery){if(!currentSettings.ltr)dir*=-1;var index=gallery.index+dir;if(index>=0&&index<gallery.links.length)return gallery.links.eq(index);else if(currentSettings.galleryLoop){if(index<0)return gallery.links.eq(gallery.links.length-1);else return gallery.links.eq(0)}}return false}function calculateSize(resizing){debug('calculateSize');modal.wrapper=modal.contentWrapper.children('div:first');resized.width=false;resized.height=false;if(false&&!currentSettings.windowResizing){initSettingsSize.width=currentSettings.width;initSettingsSize.height=currentSettings.height}if(currentSettings.autoSizable&&(!currentSettings.width||!currentSettings.height)){modal.contentWrapper.css({opacity:0,width:'auto',height:'auto'}).show();var tmp={width:'auto',height:'auto'};if(currentSettings.width){tmp.width=currentSettings.width}else if(currentSettings.type=='iframe'){tmp.width=currentSettings.minWidth}if(currentSettings.height){tmp.height=currentSettings.height}else if(currentSettings.type=='iframe'){tmp.height=currentSettings.minHeight}modal.content.css(tmp);if(!currentSettings.width){currentSettings.width=modal.content.outerWidth(true);resized.width=true}if(!currentSettings.height){currentSettings.height=modal.content.outerHeight(true);resized.height=true}modal.contentWrapper.css({opacity:1});if(!resizing)modal.contentWrapper.hide()}if(currentSettings.type!='image'&&currentSettings.type!='swf'){currentSettings.width=Math.max(currentSettings.width,currentSettings.minWidth);currentSettings.height=Math.max(currentSettings.height,currentSettings.minHeight)}var outerWrapper=getOuter(modal.contentWrapper);var outerWrapper2=getOuter(modal.wrapper);var outerContent=getOuter(modal.content);var tmp={content:{width:currentSettings.width,height:currentSettings.height},wrapper2:{width:currentSettings.width+outerContent.w.total,height:currentSettings.height+outerContent.h.total},wrapper:{width:currentSettings.width+outerContent.w.total+outerWrapper2.w.total,height:currentSettings.height+outerContent.h.total+outerWrapper2.h.total}};if(currentSettings.resizable){var maxHeight=modal.blockerVars?modal.blockerVars.height:$(window).height()-outerWrapper.h.border-(tmp.wrapper.height-currentSettings.height);var maxWidth=modal.blockerVars?modal.blockerVars.width:$(window).width()-outerWrapper.w.border-(tmp.wrapper.width-currentSettings.width);maxHeight-=currentSettings.padding*2;maxWidth-=currentSettings.padding*2;if(tmp.content.height>maxHeight||tmp.content.width>maxWidth){if(currentSettings.type=='image'||currentSettings.type=='swf'){var useW=currentSettings.imgWidth?currentSettings.imgWidth:currentSettings.width;var useH=currentSettings.imgHeight?currentSettings.imgHeight:currentSettings.height;var diffW=tmp.content.width-useW;var diffH=tmp.content.height-useH;if(diffH<0)diffH=0;if(diffW<0)diffW=0;var calcH=maxHeight-diffH;var calcW=maxWidth-diffW;var ratio=Math.min(calcH/useH,calcW/useW);calcW=Math.floor(useW*ratio);calcH=Math.floor(useH*ratio);tmp.content.height=calcH+diffH;tmp.content.width=calcW+diffW}else{tmp.content.height=Math.min(tmp.content.height,maxHeight);tmp.content.width=Math.min(tmp.content.width,maxWidth)}tmp.wrapper2={width:tmp.content.width+outerContent.w.total,height:tmp.content.height+outerContent.h.total};tmp.wrapper={width:tmp.content.width+outerContent.w.total+outerWrapper2.w.total,height:tmp.content.height+outerContent.h.total+outerWrapper2.h.total}}}if(currentSettings.type=='swf'){$('object, embed',modal.content).attr('width',tmp.content.width).attr('height',tmp.content.height)}else if(currentSettings.type=='image'){$('img',modal.content).css({width:tmp.content.width,height:tmp.content.height})}modal.content.css($.extend({},tmp.content,currentSettings.cssOpt.content));modal.wrapper.css($.extend({},tmp.wrapper2,currentSettings.cssOpt.wrapper2));if(!resizing)modal.contentWrapper.css($.extend({},tmp.wrapper,currentSettings.cssOpt.wrapper));if(currentSettings.type=='image'&&currentSettings.addImageDivTitle){$('img',modal.content).removeAttr('alt');var divTitle=$('div',modal.content);if(currentSettings.title!=currentSettings.defaultImgAlt&&currentSettings.title){if(divTitle.length==0){divTitle=$('<div>'+currentSettings.title+'</div>');modal.content.append(divTitle)}if(currentSettings.setWidthImgTitle){var outerDivTitle=getOuter(divTitle);divTitle.css({width:(tmp.content.width+outerContent.w.padding-outerDivTitle.w.total)+'px'})}}else if(divTitle.length=0){divTitle.remove()}}if(currentSettings.title)setTitle();tmp.wrapper.borderW=outerWrapper.w.border;tmp.wrapper.borderH=outerWrapper.h.border;setCurrentSettings(tmp.wrapper);setMargin()}function removeModal(e){debug('removeModal');if(e)e.preventDefault();if(modal.full&&modal.ready){$(document).unbind('keydown.nyroModal');if(!currentSettings.blocker)$(window).unbind('resize.nyroModal');modal.ready=false;modal.anim=true;modal.closing=true;if(modal.loadingShown||modal.transition){currentSettings.hideLoading(modal,currentSettings,function(){modal.loading.hide();modal.loadingShown=false;modal.transition=false;currentSettings.hideBackground(modal,currentSettings,endRemove)})}else{if(fixFF)modal.content.css({position:''});modal.wrapper.css({overflow:'hidden'});modal.content.css({overflow:'hidden'});$('iframe',modal.content).hide();if($.isFunction(currentSettings.beforeHideContent)){currentSettings.beforeHideContent(modal,currentSettings,function(){currentSettings.hideContent(modal,currentSettings,function(){endHideContent();currentSettings.hideBackground(modal,currentSettings,endRemove)})})}else{currentSettings.hideContent(modal,currentSettings,function(){endHideContent();currentSettings.hideBackground(modal,currentSettings,endRemove)})}}}if(e)return false}function showContentOrLoading(){debug('showContentOrLoading');if(modal.ready&&!modal.anim){if(modal.dataReady){if(modal.tmp.html()){modal.anim=true;if(modal.transition){fillContent();modal.animContent=true;currentSettings.hideTransition(modal,currentSettings,function(){modal.loading.hide();modal.transition=false;modal.loadingShown=false;endShowContent()})}else{currentSettings.hideLoading(modal,currentSettings,function(){modal.loading.hide();modal.loadingShown=false;fillContent();setMarginLoading();setMargin();modal.animContent=true;currentSettings.showContent(modal,currentSettings,endShowContent)})}}}else if(!modal.loadingShown&&!modal.transition){modal.anim=true;modal.loadingShown=true;if(modal.error)loadingError();else modal.loading.html(currentSettings.contentLoading);$(currentSettings.closeSelector,modal.loading).unbind('click.nyroModal').bind('click.nyroModal',removeModal);setMarginLoading();currentSettings.showLoading(modal,currentSettings,function(){modal.anim=false;showContentOrLoading()})}}}function ajaxLoaded(data){debug('AjaxLoaded: '+this.url);if(currentSettings.selector){var tmp={};var i=0;data=data.replace(/\r\n/gi,'nyroModalLN').replace(/<script(.|\s)*?\/script>/gi,function(x){tmp[i]=x;return'<pre style="display: none" class=nyroModalScript rel="'+(i++)+'"></pre>'});data=$('<div>'+data+'</div>').find(currentSettings.selector).html().replace(/<pre style="display: none;?" class="?nyroModalScript"? rel="(.?)"><\/pre>/gi,function(x,y,z){return tmp[y]}).replace(/nyroModalLN/gi,"\r\n")}modal.tmp.html(filterScripts(data));if(modal.tmp.html()){modal.dataReady=true;showContentOrLoading()}else loadingError()}function formDataLoaded(){debug('formDataLoaded');var jFrom=$(currentSettings.from);jFrom.attr('action',jFrom.attr('action')+currentSettings.selector);jFrom.attr('target','');$('input[name='+currentSettings.formIndicator+']',currentSettings.from).remove();var iframe=modal.tmp.children('iframe');var iframeContent=iframe.unbind('load').contents().find(currentSettings.selector||'body').not('script[src]');iframe.attr('src','about:blank');modal.tmp.html(iframeContent.html());if(modal.tmp.html()){modal.dataReady=true;showContentOrLoading()}else loadingError()}function iframeLoaded(){if((window.location.hostname&&currentSettings.url.indexOf(window.location.hostname)>-1)||currentSettings.url.indexOf('http://')){var iframe=$('iframe',modal.full).contents();var tmp={};if(currentSettings.titleFromIframe){tmp.title=iframe.find('title').text();if(!tmp.title){try{tmp.title=iframe.find('title').html()}catch(err){}}}var body=iframe.find('body');if(!currentSettings.height&&body.height())tmp.height=body.height();if(!currentSettings.width&&body.width())tmp.width=body.width();$.extend(initSettingsSize,tmp);$.nyroModalSettings(tmp)}}function galleryCounts(nb,total,elts,settings){if(total>1)settings.title+=(settings.title?' - ':'')+nb+'/'+total}function endHideContent(){debug('endHideContent');modal.anim=false;if(contentEltLast){contentEltLast.append(modal.content.contents());contentEltLast=null}else if(contentElt){contentElt.append(modal.content.contents());contentElt=null}modal.content.empty();gallery={};modal.contentWrapper.hide().children().remove().empty().attr('style','').hide();if(modal.closing||modal.transition)modal.contentWrapper.hide();modal.contentWrapper.css(currentSettings.cssOpt.wrapper).append(modal.content);showContentOrLoading()}function endRemove(){debug('endRemove');$(document).unbind('keydown',keyHandler);modal.anim=false;modal.full.remove();modal.full=null;if(isIE6){body.css({height:'',width:'',position:'',overflow:'',marginLeft:'',marginRight:''});$('html').css({overflow:''})}if($.isFunction(currentSettings.endRemove))currentSettings.endRemove(modal,currentSettings)}function endBackground(){debug('endBackground');modal.ready=true;modal.anim=false;showContentOrLoading()}function endShowContent(){debug('endShowContent');modal.anim=false;modal.animContent=false;modal.contentWrapper.css({opacity:''});fixFF=/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)&&parseFloat(browserVersion)<1.9&&currentSettings.type!='image';if(fixFF)modal.content.css({position:'fixed'});modal.content.append(modal.scriptsShown);if(currentSettings.type=='iframe')modal.content.find('iframe').attr('src',currentSettings.url);if($.isFunction(currentSettings.endShowContent))currentSettings.endShowContent(modal,currentSettings);if(shouldResize){shouldResize=false;$.nyroModalSettings({width:currentSettings.setWidth,height:currentSettings.setHeight});delete currentSettings['setWidth'];delete currentSettings['setHeight']}if(resized.width)setCurrentSettings({width:null});if(resized.height)setCurrentSettings({height:null});$('#nyroModalFull a:first').focus();}function getHash(url){if(typeof url=='string'){var hashPos=url.indexOf('#');if(hashPos>-1)return url.substring(hashPos)}return''}function filterScripts(data){if(typeof data=='string')data=data.replace(/<\/?(html|head|body)([^>]*)>/gi,'');var tmp=new Array();$.each($.clean({0:data},this.ownerDocument),function(){if($.nodeName(this,"script")){if(!this.src||$(this).attr('rel')=='forceLoad'){if($(this).attr('rev')=='shown')modal.scriptsShown.push(this);else modal.scripts.push(this)}}else tmp.push(this)});return tmp}function getOuter(elm){elm=elm.get(0);var ret={h:{margin:getCurCSS(elm,'marginTop')+getCurCSS(elm,'marginBottom'),border:getCurCSS(elm,'borderTopWidth')+getCurCSS(elm,'borderBottomWidth'),padding:getCurCSS(elm,'paddingTop')+getCurCSS(elm,'paddingBottom')},w:{margin:getCurCSS(elm,'marginLeft')+getCurCSS(elm,'marginRight'),border:getCurCSS(elm,'borderLeftWidth')+getCurCSS(elm,'borderRightWidth'),padding:getCurCSS(elm,'paddingLeft')+getCurCSS(elm,'paddingRight')}};ret.h.outer=ret.h.margin+ret.h.border;ret.w.outer=ret.w.margin+ret.w.border;ret.h.inner=ret.h.padding+ret.h.border;ret.w.inner=ret.w.padding+ret.w.border;ret.h.total=ret.h.outer+ret.h.padding;ret.w.total=ret.w.outer+ret.w.padding;return ret}function getCurCSS(elm,name){var ret=parseInt($.curCSS(elm,name,true));if(isNaN(ret))ret=0;return ret}function debug(msg){if($.fn.nyroModal.settings.debug||currentSettings&&currentSettings.debug)nyroModalDebug(msg,modal,currentSettings||{})}function showBackground(elts,settings,callback){elts.bg.css({opacity:0}).fadeTo(500,0.75,callback)}function hideBackground(elts,settings,callback){elts.bg.fadeOut(300,callback)}function showLoading(elts,settings,callback){elts.loading.css({marginTop:settings.marginTopLoading+'px',marginLeft:settings.marginLeftLoading+'px',opacity:0}).show().animate({opacity:1},{complete:callback,duration:400})}function hideLoading(elts,settings,callback){callback()}function showContent(elts,settings,callback){elts.loading.css({marginTop:settings.marginTopLoading+'px',marginLeft:settings.marginLeftLoading+'px'}).show().animate({width:settings.width+'px',height:settings.height+'px',marginTop:settings.marginTop+'px',marginLeft:settings.marginLeft+'px'},{duration:350,complete:function(){elts.contentWrapper.css({width:settings.width+'px',height:settings.height+'px',marginTop:settings.marginTop+'px',marginLeft:settings.marginLeft+'px'}).show();elts.loading.fadeOut(200,callback)}})}function hideContent(elts,settings,callback){elts.contentWrapper.animate({height:'50px',width:'50px',marginTop:(-(25+settings.borderH)/2+settings.marginScrollTop)+'px',marginLeft:(-(25+settings.borderW)/2+settings.marginScrollLeft)+'px'},{duration:350,complete:function(){elts.contentWrapper.hide();callback()}})}function showTransition(elts,settings,callback){elts.loading.css({marginTop:elts.contentWrapper.css('marginTop'),marginLeft:elts.contentWrapper.css('marginLeft'),height:elts.contentWrapper.css('height'),width:elts.contentWrapper.css('width'),opacity:0}).show().fadeTo(400,1,function(){elts.contentWrapper.hide();callback()})}function hideTransition(elts,settings,callback){elts.contentWrapper.hide().css({width:settings.width+'px',height:settings.height+'px',marginLeft:settings.marginLeft+'px',marginTop:settings.marginTop+'px',opacity:1});elts.loading.animate({width:settings.width+'px',height:settings.height+'px',marginLeft:settings.marginLeft+'px',marginTop:settings.marginTop+'px'},{complete:function(){elts.contentWrapper.show();elts.loading.fadeOut(400,function(){elts.loading.hide();callback()})},duration:350})}function resize(elts,settings,callback){elts.contentWrapper.animate({width:settings.width+'px',height:settings.height+'px',marginLeft:settings.marginLeft+'px',marginTop:settings.marginTop+'px'},{complete:callback,duration:400})}function updateBgColor(elts,settings,callback){if(!$.fx.step.backgroundColor){elts.bg.css({backgroundColor:settings.bgColor});callback()}else elts.bg.animate({backgroundColor:settings.bgColor},{complete:callback,duration:400})}$($.fn.nyroModal.settings.openSelector).nyroModal()});var tmpDebug='';function nyroModalDebug(msg,elts,settings){if(elts.full&&elts.bg){elts.bg.prepend(msg+'<br />'+tmpDebug);tmpDebug=''}else tmpDebug+=msg+'<br />'}
/*
********************************************** SART INCLUDE jquery.tabs.js *****************************
*/
/*
 * jquery.tools 1.1.2 - The missing UI library for the Web
 * 
 * [tools.tabs-1.0.4, tools.tabs.history-1.0.2]
 * 
 * Copyright (c) 2009 Tero Piirainen
 * http://flowplayer.org/tools/
 *
 * Dual licensed under MIT and GPL 2+ licenses
 * http://www.opensource.org/licenses
 * 
 * -----
 * 
 * File generated: Sat Apr 03 18:05:08 GMT 2010
 */
(function(d){d.tools=d.tools||{};d.tools.tabs={version:"1.0.4",conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",api:false,rotate:false},addEffect:function(e,f){c[e]=f}};var c={"default":function(f,e){this.getPanes().hide().eq(f).animate({opacity:'show'},500);e.call()},fade:function(g,e){var f=this.getConf(),j=f.fadeOutSpeed,h=this.getPanes();if(j){h.fadeOut(j)}else{h.hide()}h.eq(g).fadeIn(f.fadeInSpeed,e)},slide:function(f,e){this.getPanes().slideUp(200);this.getPanes().eq(f).slideDown(400,e)},ajax:function(f,e){this.getPanes().eq(0).load(this.getTabs().eq(f).attr("href"),e)}};var b;d.tools.tabs.addEffect("horizontal",function(f,e){if(!b){b=this.getPanes().eq(0).width()}this.getCurrentPane().animate({width:0},function(){d(this).hide()});this.getPanes().eq(f).animate({width:b},function(){d(this).show();e.call()})});function a(g,h,f){var e=this,j=d(this),i;d.each(f,function(k,l){if(d.isFunction(l)){j.bind(k,l)}});d.extend(this,{click:function(k,n){var o=e.getCurrentPane();var l=g.eq(k);if(typeof k=="string"&&k.replace("#","")){l=g.filter("[href*="+k.replace("#","")+"]");k=Math.max(g.index(l),0)}if(f.rotate){var m=g.length-1;if(k<0){return e.click(m,n)}if(k>m){return e.click(0,n)}}if(!l.length){if(i>=0){return e}k=f.initialIndex;l=g.eq(k)}if(k===i){return e}n=n||d.Event();n.type="onBeforeClick";j.trigger(n,[k]);if(n.isDefaultPrevented()){return}c[f.effect].call(e,k,function(){n.type="onClick";j.trigger(n,[k])});n.type="onStart";j.trigger(n,[k]);if(n.isDefaultPrevented()){return}i=k;g.removeClass(f.current);l.addClass(f.current);return e},getConf:function(){return f},getTabs:function(){return g},getPanes:function(){return h},getCurrentPane:function(){return h.eq(i)},getCurrentTab:function(){return g.eq(i)},getIndex:function(){return i},next:function(){return e.click(i+1)},prev:function(){return e.click(i-1)},bind:function(k,l){j.bind(k,l);return e},onBeforeClick:function(k){return this.bind("onBeforeClick",k)},onClick:function(k){return this.bind("onClick",k)},unbind:function(k){j.unbind(k);return e}});g.each(function(k){d(this).bind(f.event,function(l){e.click(k,l);return false})});if(location.hash){e.click(location.hash)}else{if(f.initialIndex===0||f.initialIndex>0){e.click(f.initialIndex)}}h.find("a[href^=#]").click(function(k){e.click(d(this).attr("href"),k)})}d.fn.tabs=function(i,f){var g=this.eq(typeof f=="number"?f:0).data("tabs");if(g){return g}if(d.isFunction(f)){f={onBeforeClick:f}}var h=d.extend({},d.tools.tabs.conf),e=this.length;f=d.extend(h,f);this.each(function(l){var j=d(this);var k=j.find(f.tabs);if(!k.length){k=j.children()}var m=i.jquery?i:j.children(i);if(!m.length){m=e==1?d(i):j.parent().find(i)}g=new a(k,m,f);j.data("tabs",g)});return f.api?g:this}})(jQuery);
(function(d){var a=d.tools.tabs;a.plugins=a.plugins||{};a.plugins.history={version:"1.0.2",conf:{api:false}};var e,b;function c(f){if(f){var g=b.contentWindow.document;g.open().close();g.location.hash=f}}d.fn.onHash=function(g){var f=this;if(d.browser.msie&&d.browser.version<"8"){if(!b){b=d("<iframe/>").attr("src","javascript:false;").hide().get(0);d("body").append(b);setInterval(function(){var i=b.contentWindow.document,j=i.location.hash;if(e!==j){d.event.trigger("hash",j);e=j}},100);c(location.hash||"#")}f.bind("click.hash",function(h){c(d(this).attr("href"))})}else{setInterval(function(){var j=location.hash;var i=f.filter("[href$="+j+"]");if(!i.length){j=j.replace("#","");i=f.filter("[href$="+j+"]")}if(i.length&&j!==e){e=j;d.event.trigger("hash",j)}},100)}d(window).bind("hash",g);return this};d.fn.history=function(g){var h=d.extend({},a.plugins.history.conf),f;g=d.extend(h,g);this.each(function(){var j=d(this).tabs(),i=j.getTabs();if(j){f=j}i.onHash(function(k,l){if(!l||l=="#"){l=j.getConf().initialIndex}j.click(l)});i.click(function(k){location.hash=d(this).attr("href").replace("#","")})});return g.api?f:this}})(jQuery);

/*
********************************************** SART INCLUDE jquery.textresizer.js *****************************
*/
/*
	jQuery Text Resizer plugin.
	
	Author: Mario J Vargas (angstrey at hotmail dot com)
	Website: http://angstrey.com/
	Documentation: http://angstrey.com/index.php/projects/jquery-text-resizer-plugin/
	
	Version: 1.0
	Revision History:
		* 2009-09-03: Version 1.0. Initial Release
*/
(function($) {
	var DEBUG_MODE = false;
	
	$.fn.textresizer = function( options ) 
	{
	    if( DEBUG_MODE )
		    debug( this );
		
		// Stop plugin execution if no matched elements
		if( this.size() == 0 )
			return;

		// Default font sizes based on number of resize buttons.
		// "this" refers to current jQuery object
		var defaultSizes = buildDefaultFontSizes( this.size() );
	
		// Set up main options before element iteration
		var settings = $.extend( { selector: $(this).selector, sizes: defaultSizes, selectedIndex: -1 }, $.fn.textresizer.defaults, options );

		// Ensure that the number of defined sizes is suitable
		// for number of resize buttons.
		if( this.size() > settings.sizes.length )
		{
		    if( DEBUG_MODE )
		    {
			    debug( 
				    "ERROR: Number of defined sizes incompatible with number of buttons => elements: " + this.size() 
				    + "; defined sizes: " + settings.sizes.length
				    + "; target: " + settings.target );
            }
               			
			return;	// Stop execution of the plugin
		}

		loadPreviousState( settings );
	
		// Iterate and bind click event function to each element
		return this.each( function( i ) {
			var $this = $(this);	// Current resize button
		
			var currSizeValue = settings.sizes[ i ];	// Size corresponding to this resize button
			
			// Mark this button as active if necessary
			if( settings.selectedIndex == i )
				$(this).addClass( "textresizer-active" );
			
			// Apply the font size to target element when its 
			// corresponding resize button is clicked
			$this.bind( "click", { index: i }, function( e ) {		
				settings.selectedIndex = e.data.index;
				
				applyFontSize( currSizeValue, settings );
				saveState( currSizeValue, settings );

				markActive( this, settings );
			});
		});
	}
	
	// Default options of textresizer plugin
	$.fn.textresizer.defaults = {
		type  : "fontSize",	/* Available options: fontSize, css, cssClass */
		target: "body"		/* The HTML element to which the new font size will be applied */
	};

	function applyFontSize( newSize, settings )
	{
	    if( DEBUG_MODE )
		    debug( [ "target: " + settings.target, "newSize: " + newSize, "type: " + settings.type ].join( ", " ) );

		var targetElm = $( settings.target );
		switch( settings.type )
		{
			case "css":
				// Apply new inline CSS properties
				targetElm.css( newSize );
				break;

			case "cssClass":
				// Remove previously assigned CSS class from
				// target element. Iterating through matched
				// elements ensures the class is removed
				var cssClasses = settings.sizes;
				$.each( cssClasses, function( i, value ) {
					targetElm.each( function() {
						if( $(this).hasClass( value ) )
							$(this).removeClass( value );
					});
				});
				
				// Now apply the new CSS class
				targetElm.addClass( newSize );
				break;

			default:
				// Apply new font size
				targetElm.css( "font-size", newSize );
				break;
		}		
	}
	
	function markActive( sizeButton, settings )
	{
		// Deactivate previous button
		$(settings.selector).removeClass( "textresizer-active" );
		
		// Mark this button as active
		$(sizeButton).addClass( "textresizer-active" );
	}
	
	function buildCookieID( selector, target, prop )
	{
	    return "JQUERY.TEXTRESIZER[" + selector + "," + target + "]." + prop;
	}
	
	function getCookie( selector, target, prop )
	{
		var id = buildCookieID( selector, target, prop );
		
		var cookieValue = $.cookie( id );
		
		if( $.cookie( id + ".valueType" ) == "dict" && cookieValue )
		{
			var dict = {};
			var dictValues = cookieValue.split( "|" );
			
			for( var i = 0; i < dictValues.length; i++ )
			{
				// Separate key/value pair and assign to dictionary
				var keyValuePair = dictValues[ i ].split( "=" );
				dict[ keyValuePair[ 0 ] ] = unescape( keyValuePair[ 1 ] );
			}
			
			// Now that the object is finished, return it
			return dict;
		}
		
		return cookieValue;
    }
    
    function setCookie( selector, target, prop, value )
    {
		var id = buildCookieID( selector, target, prop );

		// Cookie expires in 1 year (365 days/year)
		var cookieOpts = { expires: 365, path: "/" };
		
		// Serialize value if it's an object
		if( typeof( value ) == "object" )
		{
		    // TODO: I think I wrote a JavaScript dictionary object serializer somewhere... Have to find it...
		    
			// Store type of value so we can convert it back 
			// to a dictionary object
			$.cookie( id + ".valueType", "dict", cookieOpts );

			var dict = value;	// (Assigning reference to variable dict for readability)
			var dictValues = new Array();
			for( var key in dict )
			{
				dictValues.push( key + "=" + escape( dict[ key ] ) );
			}

			var serializedVals = dictValues.join( "|" );
			$.cookie( id, serializedVals, cookieOpts );
			
			if( DEBUG_MODE )
			    debug( "In setCookie: Cookie: " + id + ": " + serializedVals );
		}
		else
		{
			$.cookie( id, value, cookieOpts );

            if( DEBUG_MODE )
			    debug( "In setCookie: Cookie: " + id + ": " + value );
		}
	}
	
	function loadPreviousState( settings )
	{
		// Determine if jquery.cookie is installed
		if( $.cookie )
		{
		    if( DEBUG_MODE )
			    debug( "In loadPreviousState(): jquery.cookie: INSTALLED" );

			var selectedIndex = getCookie( settings.selector, settings.target, "selectedIndex" );
			if( DEBUG_MODE )
			    debug( "In loadPreviousState: selectedIndex: " + selectedIndex + "; type: " + typeof(selectedIndex) );
			if( selectedIndex )
				settings.selectedIndex = selectedIndex;

			var prevSize = getCookie( settings.selector, settings.target, "size" );
			if( DEBUG_MODE )
			    debug( "In loadPreviousState: prevSize: " + prevSize + "; type: " + typeof(prevSize) );
			if( prevSize )
				applyFontSize( prevSize, settings );
		}
		else
		{
		    if( DEBUG_MODE )
			    debug( "In loadPreviousState(): jquery.cookie: NOT INSTALLED" );
		}
	}
	
	function saveState( newSize, settings )
	{
		// Determine if jquery.cookie is installed
		if( $.cookie )
		{
			if( DEBUG_MODE )
			    debug( "In saveState(): jquery.cookie: INSTALLED" );
			
			setCookie( settings.selector, settings.target, "size", newSize );
			setCookie( settings.selector, settings.target, "selectedIndex", settings.selectedIndex );
		}
		else
		{
			if( DEBUG_MODE )
			    debug( "In saveState(): jquery.cookie: NOT INSTALLED" );
		}
	}
	
	function debug( $obj )
	{
		if( window.console && window.console.log )
		{
			if( typeof( $obj ) == "string" )
				window.console.log( "jquery.textresizer => " + $obj );
			else	// Assumes $obj is jQuery object
				window.console.log( "jquery.textresizer => selection count: " + $obj.size() );
		}
	}
	
	function buildDefaultFontSizes( numElms )
	{
		var size0 = 11;				/* Initial size, measured in pixels */
		
		var mySizes = new Array();
		
		if( DEBUG_MODE )
		    debug( "In buildDefaultFontSizes: numElms = " + numElms );
		
		if( DEBUG_MODE )
		{
		    for( var i = 0; i < numElms; i++ )
		    {
			    // Append elements in increments of 2 units
			    var value = (size0 + (i * 2)) / 10;
			    mySizes.push( value + "em" );	
    			
			    if( DEBUG_MODE )
			        debug( "In buildDefaultFontSizes: mySizes[" + i + "] = " + mySizes[ i ] );
		    }
		}
		else
		{
		    for( var i = 0; i < numElms; i++ )
		    {
			    // Append elements in increments of 2 units
			    var value = (size0 + (i * 2)) / 10;
			    mySizes.push( value + "em" );	
		    }
		}
		
		return mySizes;
	}
})(jQuery);

/*
********************************************** SART INCLUDE jquery.poshytip.js *****************************
*/

/*
 * Poshy Tip jQuery plugin v1.0
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010, Vasil Dinkov, http://vadikom.com/
 */

(function($) {

	var tips = [],
		reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
		rePNG = /\.png$/i,
		ie6 = $.browser.msie && $.browser.version == 6;

	// make sure the tips' position is updated on resize
	function handleWindowResize() {
		$.each(tips, function() {
			this.refresh(true);
		});
	}
	$(window).resize(handleWindowResize);

	$.Poshytip = function(elm, options) {
		this.$elm = $(elm);
		this.opts = $.extend({}, $.fn.poshytip.defaults, options);
		this.$tip = $(['<div class="',this.opts.className,'">',
				'<div class="tip-inner"></div>',
				'<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',
			'</div>'].join(''));
		this.$arrow = this.$tip.find('div.tip-arrow');
		this.$inner = this.$tip.find('div.tip-inner');
		this.disabled = false;
		this.init();
	};

	$.Poshytip.prototype = {
		init: function() {
			tips.push(this);

			// save the original title and a reference to the Poshytip object
			this.$elm.data('title.poshytip', this.$elm.attr('title'))
				.data('poshytip', this);

			// hook element events
			switch (this.opts.showOn) {
				case 'hover':
					this.$elm.bind({
						'mouseenter.poshytip': $.proxy(this.mouseenter, this),
						'mouseleave.poshytip': $.proxy(this.mouseleave, this)
					});
					if (this.opts.alignTo == 'cursor')
						this.$elm.bind('mousemove.poshytip', $.proxy(this.mousemove, this));
					if (this.opts.allowTipHover)
						this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.hide, this));
					break;
				case 'focus':
					this.$elm.bind({
						'focus.poshytip': $.proxy(this.show, this),
						'blur.poshytip': $.proxy(this.hide, this)
					});
					break;
			}
		},
		mouseenter: function(e) {
			if (this.disabled)
				return true;

			this.clearTimeouts();
			this.$elm.attr('title', '');
			this.showTimeout = setTimeout($.proxy(this.show, this), this.opts.showTimeout);
		},
		mouseleave: function() {
			if (this.disabled)
				return true;

			this.clearTimeouts();
			this.$elm.attr('title', this.$elm.data('title.poshytip'));
			this.hideTimeout = setTimeout($.proxy(this.hide, this), this.opts.hideTimeout);
		},
		mousemove: function(e) {
			if (this.disabled)
				return true;

			this.eventX = e.pageX;
			this.eventY = e.pageY;
			if (this.opts.followCursor && this.$tip.data('active')) {
				this.calcPos();
				this.$tip.css({left: this.pos.l, top: this.pos.t});
				if (this.pos.arrow)
					this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
			}
		},
		show: function() {
			if (this.disabled || this.$tip.data('active'))
				return;

			this.reset();
			this.update();
			this.display();
		},
		hide: function() {
			if (this.disabled || !this.$tip.data('active'))
				return;

			this.display(true);
		},
		reset: function() {
			this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
			this.$inner.find('*').poshytip('hide');
			if (this.opts.fade)
				this.$tip.css('opacity', this.opacity);
			this.$arrow[0].className = 'tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left';
		},
		update: function(content) {
			if (this.disabled)
				return;

			var async = content !== undefined;
			if (async) {
				if (!this.$tip.data('active'))
					return;
			} else {
				content = this.opts.content;
			}

			this.$inner.contents().detach();
			var self = this;
			this.$inner.append(
				typeof content == 'function' ?
					content.call(this.$elm[0], function(newContent) {
						self.update(newContent);
					}) :
					content == '[title]' ? this.$elm.data('title.poshytip') : content
			);
			
			this.refresh(async);
		},
		refresh: function(async) {
			if (this.disabled)
				return;

			if (async) {
				if (!this.$tip.data('active'))
					return;
				// save current position as we will need to animate
				var currPos = {left: this.$tip.css('left'), top: this.$tip.css('top')};
			}

			// reset position to avoid text wrapping, etc.
			this.$tip.css({left: 0, top: 0}).appendTo(document.body);

			// save default opacity
			if (this.opacity === undefined)
				this.opacity = this.$tip.css('opacity');

			// check for images - this code is here (i.e. executed each time we show the tip and not on init) due to some browser inconsistencies
			var bgImage = this.$tip.css('background-image').match(reBgImage),
				arrow = this.$arrow.css('background-image').match(reBgImage);

			if (bgImage) {
				var bgImagePNG = rePNG.test(bgImage[1]);
				// fallback to background-color/padding/border in IE6 if a PNG is used
				if (ie6 && bgImagePNG) {
					this.$tip.css('background-image', 'none');
					this.$inner.css({margin: 0, border: 0, padding: 0});
					bgImage = bgImagePNG = false;
				} else {
					this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>')
						.css({border: 0, padding: 0, 'background-image': 'none', 'background-color': 'transparent'})
						.find('.tip-bg-image').css('background-image', 'url("' + bgImage[1] +'")').end()
						.find('td').eq(3).append(this.$inner);
				}
				// disable fade effect in IE due to Alpha filter + translucent PNG issue
				if (bgImagePNG && !$.support.opacity)
					this.opts.fade = false;
			}
			// IE arrow fixes
			if (arrow && !$.support.opacity) {
				// disable arrow in IE6 if using a PNG
				if (ie6 && rePNG.test(arrow[1])) {
					arrow = false;
					this.$arrow.css('background-image', 'none');
				}
				// disable fade effect in IE due to Alpha filter + translucent PNG issue
				this.opts.fade = false;
			}

			var $table = this.$tip.find('table');
			if (ie6) {
				// fix min/max-width in IE6
				this.$tip[0].style.width = '';
				$table.width('auto').find('td').eq(3).width('auto');
				var tipW = this.$tip.width(),
					minW = parseInt(this.$tip.css('min-width')),
					maxW = parseInt(this.$tip.css('max-width'));
				if (!isNaN(minW) && tipW < minW)
					tipW = minW;
				else if (!isNaN(maxW) && tipW > maxW)
					tipW = maxW;
				this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
			} else if ($table[0]) {
				// fix the table width if we are using a background image
				$table.width('auto').find('td').eq(3).width('auto').end().end().width(this.$tip.width()).find('td').eq(3).width('100%');
			}
			this.tipOuterW = this.$tip.outerWidth();
			this.tipOuterH = this.$tip.outerHeight();

			this.calcPos();

			// position and show the arrow image
			if (arrow && this.pos.arrow) {
				this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
				this.$arrow.css('visibility', 'inherit');
			}

			if (async)
				this.$tip.css(currPos).animate({left: this.pos.l, top: this.pos.t}, 200);
			else
				this.$tip.css({left: this.pos.l, top: this.pos.t});
		},
		display: function(hide) {
			var active = this.$tip.data('active');
			if (active && !hide || !active && hide)
				return;

			this.$tip.stop();
			if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (hide && this.opts.hideAniDuration || !hide && this.opts.showAniDuration)) {
				var from = {}, to = {};
				// this.pos.arrow is only undefined when alignX == alignY == 'center' and we don't need to slide in that rare case
				if (this.opts.slide && this.pos.arrow) {
					var prop, arr;
					if (this.pos.arrow == 'bottom' || this.pos.arrow == 'top') {
						prop = 'top';
						arr = 'bottom';
					} else {
						prop = 'left';
						arr = 'right';
					}
					var val = parseInt(this.$tip.css(prop));
					from[prop] = val + (hide ? 0 : this.opts.slideOffset * (this.pos.arrow == arr ? -1 : 1));
					to[prop] = val + (hide ? this.opts.slideOffset * (this.pos.arrow == arr ? 1 : -1) : 0);
				}
				if (this.opts.fade) {
					from.opacity = hide ? this.$tip.css('opacity') : 0;
					to.opacity = hide ? 0 : this.opacity;
				}
				this.$tip.css(from).animate(to, this.opts[hide ? 'hideAniDuration' : 'showAniDuration']);
			}
			hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
			this.$tip.data('active', !active);
		},
		disable: function() {
			this.reset();
			this.disabled = true;
		},
		enable: function() {
			this.disabled = false;
		},
		destroy: function() {
			this.reset();
			this.$tip.remove();
			this.$elm.unbind('poshytip').removeData('title.poshytip').removeData('poshytip');
			tips.splice($.inArray(this, tips), 1);
		},
		clearTimeouts: function() {
			if (this.showTimeout) {
				clearTimeout(this.showTimeout);
				this.showTimeout = 0;
			}
			if (this.hideTimeout) {
				clearTimeout(this.hideTimeout);
				this.hideTimeout = 0;
			}
		},
		calcPos: function() {
			var pos = {l: 0, t: 0, arrow: ''},
				$win = $(window),
				win = {
					l: $win.scrollLeft(),
					t: $win.scrollTop(),
					w: $win.width(),
					h: $win.height()
				}, xL, xC, xR, yT, yC, yB;
			if (this.opts.alignTo == 'cursor') {
				xL = xC = xR = this.eventX;
				yT = yC = yB = this.eventY;
			} else { // this.opts.alignTo == 'target'
				var elmOffset = this.$elm.offset(),
					elm = {
					//				l: elmOffset.left,
					//				t: elmOffset.top,
														// Greg Biggs - 06-27-11 - adjusted the top and left on specifyDeviceModal.jsp
									l: elmOffset.left-10, 					// This aligns tooltip on X-axis
									t: elmOffset.top-5, 					// This aligns tooltip on Y-axis
						w: this.$elm.outerWidth(),
						h: this.$elm.outerHeight()
					};
				xL = elm.l + (this.opts.alignX != 'inner-right' ? 0 : elm.w);	// left edge
				xC = xL + Math.floor(elm.w / 2);				// h center
				xR = xL + (this.opts.alignX != 'inner-left' ? elm.w : 0);	// right edge
				yT = elm.t + (this.opts.alignY != 'inner-bottom' ? 0 : elm.h);	// top edge
				yC = yT + Math.floor(elm.h / 2);				// v center
				yB = yT + (this.opts.alignY != 'inner-top' ? elm.h : 0);	// bottom edge
			}

			// keep in viewport and calc arrow position
			switch (this.opts.alignX) {
				case 'right':
				case 'inner-left':
					pos.l = xR + this.opts.offsetX;
					if (pos.l + this.tipOuterW > win.l + win.w)
						pos.l = win.l + win.w - this.tipOuterW;
					if (this.opts.alignX == 'right' || this.opts.alignY == 'center')
						pos.arrow = 'left';
					break;
				case 'center':
					pos.l = xC - Math.floor(this.tipOuterW / 2);
					if (pos.l + this.tipOuterW > win.l + win.w)
						pos.l = win.l + win.w - this.tipOuterW;
					else if (pos.l < win.l)
						pos.l = win.l;
					break;
				default: // 'left' || 'inner-right'
					pos.l = xL - this.tipOuterW - this.opts.offsetX;
					if (pos.l < win.l)
						pos.l = win.l;
					if (this.opts.alignX == 'left' || this.opts.alignY == 'center')
						pos.arrow = 'right';
			}
			switch (this.opts.alignY) {
				case 'bottom':
				case 'inner-top':
					pos.t = yB + this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'top';
					if (pos.t + this.tipOuterH > win.t + win.h) {
						pos.t = yT - this.tipOuterH - this.opts.offsetY;
						if (pos.arrow == 'top')
							pos.arrow = 'bottom';
					}
					break;
				case 'center':
					pos.t = yC - Math.floor(this.tipOuterH / 2);
					if (pos.t + this.tipOuterH > win.t + win.h)
						pos.t = win.t + win.h - this.tipOuterH;
					else if (pos.t < win.t)
						pos.t = win.t;
					break;
				default: // 'top' || 'inner-bottom'
					pos.t = yT - this.tipOuterH - this.opts.offsetY;
					// 'left' and 'right' need priority for 'target'
					if (!pos.arrow || this.opts.alignTo == 'cursor')
						pos.arrow = 'bottom';
					if (pos.t < win.t) {
						pos.t = yB + this.opts.offsetY;
						if (pos.arrow == 'bottom')
							pos.arrow = 'top';
					}
			}
			this.pos = pos;
		}
	};

	$.fn.poshytip = function(options){
		if (typeof options == 'string') {
			return this.each(function() {
				var poshytip = $(this).data('poshytip');
				if (poshytip && poshytip[options])
					poshytip[options]();
			});
		}

		var opts = $.extend({}, $.fn.poshytip.defaults, options);

		// generate CSS for this tip class if not already generated
		if (!$('#poshytip-css-' + opts.className)[0])
			$(['<style id="poshytip-css-',opts.className,'" type="text/css">',
				'div.',opts.className,'{visibility:hidden;position:absolute;top:0;left:0;}',
				'div.',opts.className,' table, div.',opts.className,' td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}',
				'div.',opts.className,' td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:',opts.bgImageFrameSize,'px;width:',opts.bgImageFrameSize,'px;overflow:hidden;}',
				'div.',opts.className,' td.tip-right{background-position:100% 0;}',
				'div.',opts.className,' td.tip-bottom{background-position:100% 100%;}',
				'div.',opts.className,' td.tip-left{background-position:0 100%;}',
				'div.',opts.className,' div.tip-inner{background-positionis: -',opts.bgImageFrameSize,'px -',opts.bgImageFrameSize,'px;}',
				'div.',opts.className,' div.tip-inner{background-image: url(/esupport/images/tooltip/tip-white/backgroundwhite.gif) repeat scroll bottom left transparent;}',
								
				'div.',opts.className,' div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}',
			'</style>'].join('')).appendTo('head');

		return this.each(function() {
			new $.Poshytip(this, opts);
		});
	}

	// default settings
	$.fn.poshytip.defaults = {
		content: 		'[title]',	// content to display ('[title]', 'string', element, function(updateCallback){...}, jQuery)
		className:		'tip-yellow',	// class for the tips
		bgImageFrameSize:	10,		// size in pixels for the background-image (if set in CSS) frame around the inner content of the tip
		showTimeout:		500,		// timeout before showing the tip (in milliseconds 1000 == 1 second)
		hideTimeout:		100,		// timeout before hiding the tip
		showOn:			'hover',	// handler for showing the tip ('hover', 'focus', 'none') - use 'none' to trigger it manually
		alignTo:		'cursor',	// align/position the tip relative to ('cursor', 'target')
		alignX:			'right',	// horizontal alignment for the tip relative to the mouse cursor or the target element
							// ('right', 'center', 'left', 'inner-left', 'inner-right') - 'inner-*' matter if alignTo:'target'
		alignY:			'top',		// vertical alignment for the tip relative to the mouse cursor or the target element
							// ('bottom', 'center', 'top', 'inner-bottom', 'inner-top') - 'inner-*' matter if alignTo:'target'
		offsetX:		-22,		// offset X pixels from the default position - doesn't matter if alignX:'center'
		offsetY:		18,		// offset Y pixels from the default position - doesn't matter if alignY:'center'
		allowTipHover:		true,		// allow hovering the tip without hiding it onmouseout of the target - matters only if showOn:'hover'
		followCursor:		false,		// if the tip should follow the cursor - matters only if showOn:'hover' and alignTo:'cursor'
		fade: 			true,		// use fade animation
		slide: 			true,		// use slide animation
		slideOffset: 		8,		// slide animation offset
		showAniDuration: 	300,		// show animation duration - set to 0 if you don't want show animation
		hideAniDuration: 	300		// hide animation duration - set to 0 if you don't want hide animation
	};

})(jQuery);

/*
********************************************** SART INCLUDE jquery.usm.js *****************************
*/

jQuery(document).ready(function() {
	
	jQuery('.usm_menu').css({'visibility':'visible'});
	jQuery('ul.usm_menu').css('visibility','visible').hide();

	var usmOpened=false;
	jQuery('.menu_container div').focus(function () {
		jQuery('ul.usm_menu').slideDown('fast');
	});
	
	jQuery('#selectiondetails').click(function(){
		if (usmOpened==false){
			jQuery('ul.usm_menu').slideDown('fast');
			usmOpened=true;
		} else {
			jQuery('ul.usm_menu').slideUp('fast');
			usmOpened=false;
		}
		return false;
	});
	
	jQuery('#usmModule').mouseleave(function(){
		jQuery('ul.usm_menu').slideUp('fast');
		usmOpened=false;	
	});

	jQuery('.usm_menu li.usmTitle > a').click(function () {
		return false;
	});	
	
});
