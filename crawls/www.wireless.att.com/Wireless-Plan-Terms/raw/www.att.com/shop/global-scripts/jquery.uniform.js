/*

Uniform v1.7.3
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
	  spanPrefix: 'SpanUniform',//Added for OC2PA dropdown truncate function
      resetSelector: false
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
	  $(elem).wrap('<span class="textInput-wrapper"><span></span></span>');
	   elem.bind({
        "focus.uniform": function(){
			elem.parent().addClass(options.focusClass);
			elem.parent().parent().addClass(options.focusClass);
			//elem.parent().parent().addClass("focussed");
        },
        "blur.uniform": function(){
			elem.parent().removeClass(options.focusClass);
			elem.parent().parent().removeClass(options.focusClass);
			//elem.parent().parent().removeClass("focussed");
        }
      });
	  
    }
    
    function doTextarea(elem){
		$(elem).wrap('<span class="textInput-wrapper"></span>');
		//$(elem).addClass("uniform");
		storeElement(elem);
    }
    
    function doButton(elem){
      $el = elem;
      
      var divTag = $("<div>"),
          spanTag = $("<span>");
      
      divTag.addClass(options.buttonClass);
	  
      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      
      var btnText;
      
      if($el.is("a")){
        btnText = $el.text();
      }else if($el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }
      
      if(btnText == "") btnText = "Submit";
      
      spanTag.html(btnText);
      
      $el.hide();
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
		  //divTag.parent().addClass("focussed"); //mm535k
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
		  //divTag.parent().removeClass("focussed"); //mm535k
        }
      });
      
      $.uniform.noSelect(divTag);
      storeElement(elem);
    }

    function doSelect(elem){
	  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	  is_safari = navigator.userAgent.toLowerCase().indexOf('safari') > -1,
	  is_mac = navigator.userAgent.match(/mac/i),
        divTag = $('<div />'),
        spanTag = $('<span />');
	/*newly Added code for OC2PA dropdown truncate function starts*/
	  if(elem.hasClass('fixwidtrun')) {
	  var selcla= 1;
	  }
	  else {
	  var selcla= 2;
	  }
	  /*newly Added code for OC2PA dropdown truncate function ends*/
      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
		spanTag.attr("id", options.spanPrefix+"-"+elem.attr("id"));//Added for OC2PA dropdown truncate function
      }
      
      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.text());
      
      elem.css('opacity', 0);
	  //elem.css('margin', '');
      elem.wrap(divTag);
      elem.before(spanTag);

		//redefine variables
		divTag = elem.parent("div");
		spanTag = elem.siblings("span");
		if (is_chrome) {
			spanTag.css('width',eval(elem.widestSize()-26)+'px'); //alert('chrome'); //chrome detects as safari so put chrome first  
		} else if(is_safari) {
			if(!!is_mac) {
				spanTag.css('width',eval(elem.widestSize()-26)+'px');
			}else {
				spanTag.css('width',eval(elem.widestSize()-26)+'px'); //alert('safari'); //safari doesnt like the width of the selects so dont add pixels
			}
		} else {
			spanTag.css('width',eval(elem.widestSize()-26)+'px'); //other browsers IE and FF same as chrome
			
			
		}
		/*newly Added code for OC2PA dropdown truncate function starts*/
		if(selcla == 1){
		var spanlen=spanTag.width() - 18;
		var selitm=elem.find(":selected:first").text();
		var selwid=elem.find(":selected:first").width();
		//var sellen=selitm.length;
		var txt=constrain(selitm, spanlen);
		spanTag.html(txt)
		}
		/*newly Added code for OC2PA dropdown truncate function ends*/
      elem.bind({
        "change.uniform": function() {
		/*newly Added code for OC2PA dropdown truncate function starts*/
		if(elem.hasClass('fixwidtrun')) {
	  var selcla= 1;
	  }
	  else {
	  var selcla= 2;
	  }
		if(selcla == 1){
		var spanlen=spanTag.width() - 18;
		var selitm=elem.find(":selected").text();
		var selwid=elem.find(":selected").width();
		var txt=constrain(selitm, spanlen);
         spanTag.html(txt);
		  }
		  else{
          spanTag.text(elem.find(":selected").text());
		  }          
		  divTag.removeClass(options.activeClass);
		  /*newly Added code for OC2PA dropdown truncate function ends*/
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
		  //divTag.parent().addClass("focussed"); //mm535k
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
		 // divTag.parent().removeClass("focussed"); //mm535k
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
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").text());
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

      var divTag = $('<div />'),
          spanTag = $('<span />');

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
		 // divTag.parent().addClass("focussed"); //mm535k
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
		  //divTag.parent().removeClass("focussed"); //mm535k
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

      var divTag = $('<div />'),
          spanTag = $('<span />');

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
		  //divTag.parent().parent().addClass("focussed"); //mm535k
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
		 // divTag.parent().parent().removeClass("focussed"); //mm535k
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            $("."+options.radioClass + " span."+options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
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
		  //divTag.parent().parent().addClass("focussed");
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
		  //divTag.parent().parent().removeClass("focussed");
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
		  //divTag.parent().addClass("focussed"); //mm535k
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
		  //divTag.parent().removeClass("focussed"); //mm535k
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
        }else if($(this).is("button, :submit, a, input[type='button']")){
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
          spanTag.html($e.find(":selected").text());

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
        }else if($e.is(":submit") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
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
        }else if(elem.is("a") || elem.is(":submit") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }
          
      }
    });
  };
  
  /*newly Added code for OC2PA dropdown truncate function starts*/
  function constrain(text, ideal_width){
	var ideal_width_fin=ideal_width - 5;
    var temp_item = ('<span class="tphd_hide" style="display:none;">'+ text +'</span>');
    $(temp_item).appendTo('body');
    var item_width = $('span.tphd_hide').width();
	var ideal = parseInt(ideal_width_fin);
    var smaller_text = text;
    if ((item_width>ideal) || (item_width==ideal )){
        while (item_width > ideal) {
            smaller_text = smaller_text.substr(0, (smaller_text.length-1));
            $('.tphd_hide').html(smaller_text);
            item_width = $('span.tphd_hide').width();
        }
        smaller_text = smaller_text;
    }
    $('span.tphd_hide').remove();
    return smaller_text;
}
/*newly Added code for OC2PA dropdown truncate function ends*/
})(jQuery);