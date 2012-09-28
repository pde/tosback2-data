// page init
jQuery(function() {
  initAccordion();
  initDropDown();
  initOpenClose();
});

// open-close init
function initOpenClose() {
  jQuery('div.filter-wrap').openClose({
    addClassBeforeAnimation : false,
    activeClass : 'expanded',
    opener : 'a.opener',
    slider : 'div.slide',
    effect : 'slide',
    animSpeed : 500
  });

}

/*
 * jQuery Open/Close plugin
 */
;
(function($) {
  jQuery.fn.openClose = function(o) {
    // default options
    var options = $.extend({
      addClassBeforeAnimation : true,
      activeClass : 'active',
      opener : '.opener',
      slider : '.slide',
      animSpeed : 400,
      animStart : false,
      animEnd : false,
      effect : 'fade',
      event : 'click'
    }, o);

    return this.each(function() {
      // options
      var holder = jQuery(this), animating;
      var opener = jQuery(options.opener, holder);
      var slider = jQuery(options.slider, holder);
      if (slider.length) {
        opener.bind(options.event, function() {
          if (!animating) {
            animating = true;
            if (typeof options.animStart === 'function')
              options.animStart();
            if (holder.hasClass(options.activeClass)) {
              toggleEffects[options.effect].hide({
                speed : options.animSpeed,
                box : slider,
                complete : function() {
                  animating = false;
                  if (!options.addClassBeforeAnimation) {
                    holder.removeClass(options.activeClass);
                  }
                  if (typeof options.animEnd === 'function')
                    options.animEnd();
                }
              });
              if (options.addClassBeforeAnimation) {
                holder.removeClass(options.activeClass);
              }
            } else {
              if (options.addClassBeforeAnimation) {
                holder.addClass(options.activeClass);
              }
              toggleEffects[options.effect].show({
                speed : options.animSpeed,
                box : slider,
                complete : function() {
                  animating = false;
                  if (!options.addClassBeforeAnimation) {
                    holder.addClass(options.activeClass);
                  }
                  if (typeof options.animEnd === 'function')
                    options.animEnd();
                }
              })
            }
          }
          return false;
        });
        if (holder.hasClass(options.activeClass)) {
          slider.show();
        } else {
          slider.hide();
        }
      }
    });
  }

  // animation effects
  var toggleEffects = {
    slide : {
      show : function(o) {
        o.box.slideDown(o.speed, o.complete);
      },
      hide : function(o) {
        o.box.slideUp(o.speed, o.complete);
      }
    },
    fade : {
      show : function(o) {
        o.box.fadeIn(o.speed, o.complete);
      },
      hide : function(o) {
        o.box.fadeOut(o.speed, o.complete);
      }
    },
    none : {
      show : function(o) {
        o.box.show(0, o.complete);
      },
      hide : function(o) {
        o.box.hide(0, o.complete);
      }
    }
  }
}(jQuery));

// clear inputs on focus
function initInputs() {
  PlaceholderInput.replaceByOptions({
    // filter options
    clearInputs : true,
    clearTextareas : true,
    clearPasswords : true,
    skipClass : 'default',

    // input options
    wrapWithElement : false,
    showUntilTyping : false,
    getParentByClass : false,
    placeholderAttr : 'value'
  });
}

// placeholder class
;
(function() {
  var placeholderCollection = [];
  PlaceholderInput = function() {
    this.options = {
      element : null,
      showUntilTyping : false,
      wrapWithElement : false,
      getParentByClass : false,
      placeholderAttr : 'value',
      inputFocusClass : 'focus',
      inputActiveClass : 'text-active',
      parentFocusClass : 'parent-focus',
      parentActiveClass : 'parent-active',
      labelFocusClass : 'label-focus',
      labelActiveClass : 'label-active',
      fakeElementClass : 'input-placeholder-text'
    }
    placeholderCollection.push(this);
    this.init.apply(this, arguments);
  }
  PlaceholderInput.refreshAllInputs = function(except) {
    for ( var i = 0; i < placeholderCollection.length; i++) {
      if (except !== placeholderCollection[i]) {
        placeholderCollection[i].refreshState();
      }
    }
  }
  PlaceholderInput.replaceByOptions = function(opt) {
    var inputs = [].concat(convertToArray(document.getElementsByTagName('input')), convertToArray(document.getElementsByTagName('textarea')));
    for ( var i = 0; i < inputs.length; i++) {
      if (inputs[i].className.indexOf(opt.skipClass) < 0) {
        var inputType = getInputType(inputs[i]);
        if ((opt.clearInputs && (inputType === 'text' || inputType === 'email')) || (opt.clearTextareas && inputType === 'textarea')
            || (opt.clearPasswords && inputType === 'password')) {
          new PlaceholderInput({
            element : inputs[i],
            wrapWithElement : opt.wrapWithElement,
            showUntilTyping : opt.showUntilTyping,
            getParentByClass : opt.getParentByClass,
            placeholderAttr : inputs[i].getAttribute('placeholder') ? 'placeholder' : opt.placeholderAttr
          });
        }
      }
    }
  }
  PlaceholderInput.prototype = {
    init : function(opt) {
      this.setOptions(opt);
      if (this.element && this.element.PlaceholderInst) {
        this.element.PlaceholderInst.refreshClasses();
      } else {
        this.element.PlaceholderInst = this;
        if (this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
          this.initElements();
          this.attachEvents();
          this.refreshClasses();
        }
      }
    },
    setOptions : function(opt) {
      for ( var p in opt) {
        if (opt.hasOwnProperty(p)) {
          this.options[p] = opt[p];
        }
      }
      if (this.options.element) {
        this.element = this.options.element;
        this.elementType = getInputType(this.element);
        this.wrapWithElement = (this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement
            || this.options.placeholderAttr === 'placeholder');
        this.setOrigValue(this.options.placeholderAttr == 'value' ? this.element.defaultValue : this.element.getAttribute(this.options.placeholderAttr));
      }
    },
    setOrigValue : function(value) {
      this.origValue = value;
    },
    initElements : function() {
      // create fake element if needed
      if (this.wrapWithElement) {
        this.element.value = '';
        this.element.removeAttribute(this.options.placeholderAttr);
        this.fakeElement = document.createElement('span');
        this.fakeElement.className = this.options.fakeElementClass;
        this.fakeElement.innerHTML += this.origValue;
        this.fakeElement.style.color = getStyle(this.element, 'color');
        this.fakeElement.style.position = 'absolute';
        this.element.parentNode.insertBefore(this.fakeElement, this.element);
      }
      // get input label
      if (this.element.id) {
        this.labels = document.getElementsByTagName('label');
        for ( var i = 0; i < this.labels.length; i++) {
          if (this.labels[i].htmlFor === this.element.id) {
            this.labelFor = this.labels[i];
            break;
          }
        }
      }
      // get parent node (or parentNode by className)
      this.elementParent = this.element.parentNode;
      if (typeof this.options.getParentByClass === 'string') {
        var el = this.element;
        while (el.parentNode) {
          if (hasClass(el.parentNode, this.options.getParentByClass)) {
            this.elementParent = el.parentNode;
            break;
          } else {
            el = el.parentNode;
          }
        }
      }
    },
    attachEvents : function() {
      this.element.onfocus = bindScope(this.focusHandler, this);
      this.element.onblur = bindScope(this.blurHandler, this);
      if (this.options.showUntilTyping) {
        this.element.onkeydown = bindScope(this.typingHandler, this);
        this.element.onpaste = bindScope(this.typingHandler, this);
      }
      if (this.wrapWithElement)
        this.fakeElement.onclick = bindScope(this.focusSetter, this);
    },
    togglePlaceholderText : function(state) {
      if (this.wrapWithElement) {
        this.fakeElement.style.display = state ? '' : 'none';
      } else {
        this.element.value = state ? this.origValue : '';
      }
    },
    focusSetter : function() {
      this.element.focus();
    },
    focusHandler : function() {
      clearInterval(this.checkerInterval);
      this.checkerInterval = setInterval(bindScope(this.intervalHandler, this), 1);
      this.focused = true;
      if (!this.element.value.length || this.element.value === this.origValue) {
        if (!this.options.showUntilTyping) {
          this.togglePlaceholderText(false);
        }
      }
      this.refreshClasses();
    },
    blurHandler : function() {
      clearInterval(this.checkerInterval);
      this.focused = false;
      if (!this.element.value.length || this.element.value === this.origValue) {
        this.togglePlaceholderText(true);
      }
      this.refreshClasses();
      PlaceholderInput.refreshAllInputs(this);
    },
    typingHandler : function() {
      setTimeout(bindScope(function() {
        if (this.element.value.length) {
          this.togglePlaceholderText(false);
          this.refreshClasses();
        }
      }, this), 10);
    },
    intervalHandler : function() {
      if (typeof this.tmpValue === 'undefined') {
        this.tmpValue = this.element.value;
      }
      if (this.tmpValue != this.element.value) {
        PlaceholderInput.refreshAllInputs(this);
      }
    },
    refreshState : function() {
      if (this.wrapWithElement) {
        if (this.element.value.length && this.element.value !== this.origValue) {
          this.togglePlaceholderText(false);
        } else if (!this.element.value.length) {
          this.togglePlaceholderText(true);
        }
      }
      this.refreshClasses();
    },
    refreshClasses : function() {
      this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
      this.setStateClass(this.element, this.options.inputFocusClass, this.focused);
      this.setStateClass(this.elementParent, this.options.parentFocusClass, this.focused);
      this.setStateClass(this.labelFor, this.options.labelFocusClass, this.focused);
      this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
      this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
      this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
    },
    setStateClass : function(el, cls, state) {
      if (!el)
        return;
      else if (state)
        addClass(el, cls);
      else
        removeClass(el, cls);
    }
  }

  // utility functions
  function convertToArray(collection) {
    var arr = [];
    for ( var i = 0, ref = arr.length = collection.length; i < ref; i++) {
      arr[i] = collection[i];
    }
    return arr;
  }
  function getInputType(input) {
    return (input.type ? input.type : input.tagName).toLowerCase();
  }
  function hasClass(el, cls) {
    return el.className ? el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : false;
  }
  function addClass(el, cls) {
    if (!hasClass(el, cls))
      el.className += " " + cls;
  }
  function removeClass(el, cls) {
    if (hasClass(el, cls)) {
      el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
    }
  }
  function bindScope(f, scope) {
    return function() {
      return f.apply(scope, arguments)
    }
  }
  function getStyle(el, prop) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(el, null)[prop];
    } else if (el.currentStyle) {
      return el.currentStyle[prop];
    } else {
      return el.style[prop];
    }
  }
}());

if (window.addEventListener)
  window.addEventListener("load", initInputs, false);
else if (window.attachEvent)
  window.attachEvent("onload", initInputs);

function initDropDown() {
  var nav = document.getElementById("side-accordion");
  if (nav) {
    var lis = nav.getElementsByTagName("li");
    for ( var i = 0; i < lis.length; i++) {
      if (lis[i].getElementsByTagName("ul").length > 0) {
        lis[i].className += " has-drop-down"
        lis[i].getElementsByTagName("a")[0].className += " has-drop-down-a"
      }
      lis[i].onmouseover = function() {
        this.className += " hover";
      }
      lis[i].onmouseout = function() {
        this.className = this.className.replace(" hover", "");
      }
    }
  }
}

// accordion init
function initAccordion() {
  jQuery('ul.accordion').slideAccordion({
    opener : '>a.opener',
    slider : '>div.slide',
    collapsible : false,
    animSpeed : 300
  });
}

/*
 * jQuery Accordion plugin
 */
;
(function($) {
  jQuery.fn.slideAccordion = function(o) {
    // default options
    var options = jQuery.extend({
      addClassBeforeAnimation : false,
      activeClass : 'active',
      opener : '.opener',
      slider : '.slide',
      animSpeed : 300,
      collapsible : true,
      event : 'click'
    }, o);

    return this.each(function() {
      // options
      var accordion = jQuery(this);
      var items = accordion.find(':has(' + options.slider + ')');
      items.each(function() {
        var item = jQuery(this);
        var opener = item.find(options.opener);
        var slider = item.find(options.slider);
        opener.bind(options.event, function() {
          if (!slider.is(':animated')) {
            if (item.hasClass(options.activeClass)) {
              if (options.collapsible) {
                slider.slideUp(options.animSpeed, function() {
                  item.removeClass(options.activeClass);
                });
              }
            } else {
              var _levelItems = item.siblings('.' + options.activeClass);
              item.addClass(options.activeClass);
              slider.slideDown(options.animSpeed);

              // collapse others
              _levelItems.find(options.slider).slideUp(options.animSpeed, function() {
                _levelItems.removeClass(options.activeClass);
              })
            }
          }
          return false;
        });
        if (item.hasClass(options.activeClass)) {
          slider.show();
        } else {
          slider.hide();
        }
      });
    });
  }
}(jQuery));
