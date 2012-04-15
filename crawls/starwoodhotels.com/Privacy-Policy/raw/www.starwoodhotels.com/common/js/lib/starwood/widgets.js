/**
 * SW.domWidget provides a common interface for Dom manipulation that
 * runs onDOMReady or when a manual refresh call is made to
 * SW.domWidget.update(rootElement).
 * NOTE: Performance is critical when developing new domWidget!
 * @namespace SW.domWidget
 */


/**
 * base widget - copy and paste the following code to start new widget.
 * must include id. This is used for namespacing.
 * should include load and update methods.
 * initialize is a standard naming convention, not required.
 * the following methods are automatically attached:
 *   setConfig - attaches config objects to html elements
 *   getConfig - retreived config object from html element
 *   setEnabled - turns a widget on/off
 *   getEnabled - used internally to determine if widget is enabled
 * all domWidget are disabled by default. To enable a widget, you must call
 *   SW.domWidget.WIDGET_ID.setEnabled(true);
 */
/*
SW.domWidget.add({
  id:"WidgetId",
  initialize:function(){
     // standard function name - manually called - SW.domWidget.WidgetId.initialize(params...);
  },
  load:function(){
    // do load stuff, find elements and setup
  },
  update:function(root){
    // do update stuff, find elements and setup. root element is passed in.
  }
});

*/

SW.domWidget = {
  widgetArray:[],
  initialize:function(){
    yuiEvent.onDOMReady(SW.domWidget.load);
  },
  /**
   * add a new wiget to the domWidget manager
   * @param {Object} widget
   */
  add:function(widget){
    SW.domWidget.widgetArray.push(widget);
    SW.domWidget[widget.id] = widget;
    widget.enabled = false;
    widget.setConfig = function(els,config){
      var self = this;
      if(! (typeof els == "object") || !(els.constructor == Array)){
        els = [els];
      }
      els.forEach(function(el){
        el = yuiDom.get(el);
        if(!el.widgetConfig){ el.widgetConfig = {}; }
        el.widgetConfig[self.id] = config;
      });
    }
    widget.getConfig = function(el){
      if(el && el.widgetConfig && el.widgetConfig[this.id]){
        return el.widgetConfig[this.id];
      }
      return null;
    }
    widget.setEnabled = function(enabled){
      this.enabled = enabled;
    }
    widget.getEnabled = function(){
      return this.enabled;
    }
  },
  /**
   * runs onDOMReady, checks for enabled domWidget and runs each load method
   */
  load:function(){
    SW.domWidget.widgetArray.forEach(function(widget){
      if(widget.getEnabled() && widget.load){
        widget.load();
      }
    });
  },
  /**
   * Manually call this method when creating html on the fly (dom methods or innerHTML).
   * checks for enabled domWidget and runs each update method, passing in the root element.
   * @param {Object} root
   */
  update:function(root){
    SW.domWidget.widgetArray.forEach(function(widget){
      if(widget.getEnabled() && widget.update){
        widget.update(root);
      }
    });
  }
};
/**
 * get things started...
 */
SW.domWidget.initialize();

/**
 * provides "label inside of text input" functionality. Label and class names are removed on click.
 * Include a custom attribute of label on text inputs, eg: label="(enter city)". When this label is showing,
 * a class of "hasDefaultText" will be applied to the input.
 * @namespace SW.domWidget.inputLabels
 */
// begin inputLabels //
SW.domWidget.add({
  id:"inputLabels",
  initialize:function(){

  },
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  /**
   * find all elements and initialize
   * @param {Object} root
   */
  setup:function(root){
    var self = this;
    yuiDom.getElementsBy(function(input){
      if(!!input.getAttribute("label")){
         self.setupInput(input);
      }
    },"input",root);
    yuiDom.getElementsBy(function(input){
      if(!!input.getAttribute("label")){
         self.setupInput(input);
      }
    },"textarea",root);
  },
  /**
   * initialize single input. Adds listeners for focus and blur on the input.
   * Also, adds listeners for form.onsubmit and submitButton.click. More cleanly handles clearing
   * the label out of the value when the form submits.
   * @param {Object} input
   */
  setupInput:function(input){
    var self = this;
    if(!this.getConfig(input)){
      var config = {
        label:input.getAttribute("label")
      };
      this.setConfig(input,config);
      yuiEvent.addListener(input,"focus",this.removeLabelBridge);
      yuiEvent.addListener(input,"blur",this.setLabelBridge);
      if(input.form){
        yuiEvent.addListener(input.form,"submit",self.removeLabelBridge.bind(input));
        // also try to attach to submit buttons - this fire before forom.onsubmit and can help play better with validation functions
        function addSubmitHandler (submitButton){
          if(submitButton.type == "submit"){
            yuiEvent.addListener(submitButton,"click",self.removeLabelBridge.bind(input));
          }
        }
        yuiDom.getElementsBy(addSubmitHandler,"input",input.form);
        yuiDom.getElementsBy(addSubmitHandler,"button",input.form);
      }
    }
    this.setLabel(input);
  },
  /**
   * two main methods for checking, adding & removing label
   */
  removeLabel:function(input){
    var config = this.getConfig(input);
    if(input.value == config.label){
      yuiDom.removeClass(input,"hasDefaultText");
      input.value = "";
    }
  },
  setLabel:function(input){
    var config = this.getConfig(input);
    if(input.value == "" || input.value == config.label){
      yuiDom.addClass(input,"hasDefaultText");
      input.value = config.label;
    }
  },
  /**
   * event handlers/bridging methods. Maintain "this" in *real* methods.
   */
  removeLabelBridge:function(e){
    SW.domWidget.inputLabels.removeLabel(this);
  },
  setLabelBridge:function(e){
    SW.domWidget.inputLabels.setLabel(this);
  }
});

/**
 * provides tool tip/contextual help. Must have a container element with
 * a class of "toolTipTrigger" and an inner element with a class of
 * "toolTip" (Must only be one "toolTip" inside of a trigger!).
 * @namespace SW.domWidget.toolTips
 */
SW.domWidget.add({
  id:"toolTips",
  classSettings:{},
  idSettings:{},
  /**
   * base setttings, if none are provided
   */
  settings:{
    /**
     * appendTipToBody - moves the toolTip element to the body element. Makes absolute positioning easier.
     * set to false to leave the tool tip owned by the toolTipTrigger.
     */
    triggerClassName:"toolTipTrigger",
    tipClassName:"toolTip",
    triggerTagName:"span",
    tipTagName:"div",

    appendTipToBody:true,
    showDelay:0.35,
    hideDelay:0.5,
    showDuration:.175,
    hideDuration:.25,
    showTransition:YAHOO.util.Easing.easeIn,
    hideTransition:YAHOO.util.Easing.easeIn,
    stopEventOnClick:true,
    showAttributes:{
      opacity:{from:0,to:1}
    },
    hideAttributes:{
      opacity:{from:1,to:0}
    },
    setPosition:function(config,e){
      var coords  = yuiEvent.getXY(e);
      var viewPortWidth = yuiDom.getViewportWidth();
      var toolTipWidth = yuiDom.getStyle(config.tip,"width");
      toolTipWidth = toolTipWidth.substring(0,toolTipWidth.length-2);
      if ((coords[0] + toolTipWidth) >= viewPortWidth) coords[0] -= toolTipWidth;
      yuiDom.setStyle(config.tip,"left", coords[0] +"px");
      yuiDom.setStyle(config.tip,"top", coords[1] +"px");
    },
    showOnStart:function(config){
      yuiDom.setStyle(config.tip,"opacity",0);
    },
    showOnComplete:function(config){
      // do nothing
    },
    hideOnStart:function(config){
      // do nothing
    },
    hideOnComplete:function(config){
      // do nothing
    }
  },
  /**
   * global settings, affects all tool tips on a page.
   * @See SW.domWidget.toolTips.settings
   * @param {Object} globalSettings
   */
  initialize:function(globalSettings){
    this.addSettings(globalSettings,"global",null);
  },
  /**
   * class name based settings. The class must be applied to the trigger,
   * for example <span class="toolTipTrigger customToolTip"></span>.
   * These settinsg will only apply to the "customToolTip".
   * @See SW.domWidget.toolTips.settings
   * @param {Object} className
   * @param {Object} classSettings
   */
  addClassSettings:function(className,classSettings){
    classSettings.triggerClassName = className;
    this.addSettings(classSettings,"class",className);
  },
  /**
   * id based settings can be useful for specific placement of toolTip for a
   * single element (ie, when the toolTip might display over a select box)
   * @See SW.domWidget.toolTips.settings
   * @param {Object} id
   * @param {Object} idSettings
   */
  addIdSettings:function(id,idSettings){
    this.addSettings(idSettings,"id",id);
  },
  /**
   * internal function for adding settings.
   * @param {Object} settings
   * @param {Object} type
   * @param {Object} id
   */
  addSettings:function(settings,type,id){
    var curSettings,setting;
    switch(type){
      case "global":
        curSettings = this.settings;
        break;
      case "class":
        curSettings = this.classSettings[id] = {};
        break;
      case "id":
        curSettings = this.idSettings[id] = {};
        break;
    }
    if(curSettings && settings){
      for(setting in settings){
        curSettings[setting] = settings[setting];
      }
    }
  },
  /**
   * internal method to lookup a specific setting
   * @param {Object} config
   * @param {Object} setting
   */
  getSetting:function(config,setting){
    if(config.idSettings && typeof config.idSettings[setting] != "undefined"){
      return config.idSettings[setting];
    }
    if(config.classSettings && typeof config.classSettings[setting] != "undefined"){
      return config.classSettings[setting];
    }
    return this.settings[setting];
  },
  load:function(){
    this.getElements();
  },
  update:function(root){
    this.getElements(root);
  },
  /**
   * find the tool tips
   * @param {Object} root
   */
  getElements:function(root){
    var self = this;
    var el,config,className,id;
    root = root || document;

    for(id in this.idSettings){
      el = yuiDom.get(id);
      if(el){
        config = {
          idSettings:this.idSettings[id]
        };
        for(className in this.classSettings){
          if(yuiDom.hasClass(el,className)){
            config.classSettings = this.classSettings[className];
            break;
          }
        }
        self.setup(el);
      }
    }

    for(className in this.classSettings){
      config = {
        classSettings:this.classSettings[className]
      };
      yuiDom.getElementsByClassName(className,self.getSetting(config,"triggerTagName"),root).forEach(function(element){
        self.setup(element);
      });
    }

    config = {};

    yuiDom.getElementsByClassName(self.getSetting(config,"triggerClassName"),self.getSetting(config,"triggerTagName"),root).forEach(function(element){
      self.setup(element);
    });
  },
  /**
   * initialize single tool tip
   * @param {Object} trigger
   */
  setup:function(trigger){
    var classSettings = null,idSettings = null;
    var tip,tipImage,closeButton;
    var animIn,animOut;
    var self = this;
    var primaryElements = [];
    if(!this.getConfig(trigger)){
//      tip = yuiDom.getElementsByClassName("toolTip",null,trigger)[0];
      closeButton = yuiDom.getElementsByClassName("toolTipClose",null,trigger)[0];

      if(trigger.id && this.idSettings[trigger.id]){
        idSettings = this.idSettings[trigger.id];
      }
      for(var prop in this.classSettings){
        if(yuiDom.hasClass(trigger,prop)){
          classSettings = this.classSettings[prop];
          break;
        }
      }
      /**
       * config object is attached to all import elements using this.setConfig();
       * this contains all pertinent information about this instance.
       */
      var config = {
        trigger:trigger,
        tip:null,
        tipImage:tipImage,
        isShowing:false,
        isOver:false,
        showTimeout:null,
        hideTimeout:null,
        classSettings:classSettings,
        idSettings:idSettings,
        x:0,
        y:0
      };
      tip = yuiDom.getElementsByClassName(self.getSetting(config,"tipClassName"),self.getSetting(config,"tipTagName"),trigger)[0];
      config.tip = tip;
      if(this.getSetting(config,"appendTipToBody")){
        document.body.appendChild(tip);
      }

      animIn = new yuiAnim(tip,this.getSetting(config,"showAttributes"),this.getSetting(config,"showDuration"),this.getSetting(config,"showTransition"));
      animIn.onStart.subscribe(function(){
        self.getSetting(config,"showOnStart")(config);
        yuiDom.addClass(config.tip,"toolTipShowing");
      });
      animIn.onComplete.subscribe(function(){
        self.getSetting(config,"showOnComplete")(config);
      });
      animOut = new yuiAnim(tip,this.getSetting(config,"hideAttributes"),this.getSetting(config,"hideDuration"),this.getSetting(config,"hideTransition"));
      animOut.onStart.subscribe(function(){
        self.getSetting(config,"hideOnStart")(config);
      });
      animOut.onComplete.subscribe(function(){
        self.getSetting(config,"hideOnComplete")(config);
        yuiDom.removeClass(config.tip,"toolTipShowing");
      });

      config.animIn = animIn;
      config.animOut = animOut;

      primaryElements.push(trigger);
      primaryElements.push(tip);
      if(closeButton){
        primaryElements.push(closeButton);
      }
      this.setConfig(primaryElements,config);
      // in future allow config to set mouseover or click for showing
      yuiEvent.addListener(trigger,"mouseover",this.bridge.setShow);
      yuiEvent.addListener(trigger,"mouseout",this.bridge.setHide);
      yuiEvent.addListener(tip,"mouseover",this.bridge.clearHide);
      yuiEvent.addListener(tip,"mouseout",this.bridge.setHide);
      // should the following line be config based? this prevents onlcicks from triggering on parent nodes
      if(this.getSetting(config,"stopEventOnClick")){
        yuiEvent.addListener(tip,"click",this.bridge.stopEvent);
      }
      if(closeButton){
        yuiEvent.addListener(closeButton,"click",this.bridge.hideNow);
      }
    }
  },
  /**
   * main internal methods to show and hide tool tips (using timeouts)
   */
  show:function(config){
    if(yuiDom.hasClass(config.tip,"toolTipShowing")){
      return;
    }
    if(config.isOver && !config.isShowing){
      config.isShowing = true;
      config.animIn.animate();
    }
  },
  hide:function(config){
    config.isShowing = false;
    config.animOut.animate();
  },
  setShow:function(config){
    var self = this;
    config.isOver = true;
    this.clearHide(config);
    if(!config.isShowing){
      config.showTimeout = setTimeout(function(){
        self.show(config);
      },this.getSetting(config,"showDelay")*1000);
    }
  },
  setHide:function(config){
    var self = this;
    config.isOver = false;
    if(!config.hideTimeout && config.isShowing){
      clearTimeout(config.showTimeout);
      config.showTimeout = null;
      config.hideTimeout = setTimeout(function(){
        self.hide(config);
      },this.getSetting(config,"hideDelay")*1000);
    }
  },
  clearHide:function(config){
    if(config.hideTimeout){
      clearTimeout(config.hideTimeout);
      config.hideTimeout = null;
    }
  },
  hideNow:function(config){
    this.hide(config);
  },
  /**
   * bridging methods to seperate event handlers from main methods
   */
  bridge:{
    setShow:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);

      if(!config.isShowing){
        self.getSetting(config,"setPosition")(config,e);
      }

      self.setShow(config);
    },
    setHide:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.setHide(config);
    },
    clearHide:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.clearHide(config);
    },
    hideNow:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.hideNow(config);
      yuiEvent.stopEvent(e);
    },
    stopEvent:function(e){
      yuiEvent.stopEvent(e);
    }
  }
});


/**
 * handles onchange of select box where the option values are urls.
 * add a class of "urlSelect" to the select box.
 * @namespace SW.domWidget.urlSelect
 */
SW.domWidget.add({
  id:"urlSelect",
  initialize:function(){
  },
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  setup:function(root){
    var self = this;
    yuiDom.getElementsByClassName("urlSelect","select",root).forEach(function(selectBox){
      self.setupSelect(selectBox);
    });
  },
  setupSelect:function(selectBox){
    var config;
    if(!this.getConfig(selectBox)){
      config = {
        input:selectBox
      }
      this.setConfig(selectBox,config);
      yuiEvent.addListener(selectBox,"change",this.selectUrlBridge);
    }
  },
  selectUrl:function(config){
    if(config.input.value){
      document.location.href = config.input.value;
    }
  },
  /**
   * bridging method
   * @param {Object} e
   */
  selectUrlBridge:function(e){
    SW.domWidget.urlSelect.selectUrl(SW.domWidget.urlSelect.getConfig(this));
  }
});

SW.domWidget.add({
  id:"dhtmlSelect",
  container:null,
  trigger:null,
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  setup:function(root){
    var self = this;
    yuiDom.getElementsByClassName("dhtmlSelect","div",root).forEach(function(container){
      if(!self.getConfig(container)){
        var config = {
          container:container,
          trigger:yuiDom.getElementsByClassName("dhtmlSelectTrigger",null,container)[0]
        };
        self.setConfig([config.trigger,config.container],config);
        yuiEvent.addListener(config.trigger,"click",self.showBridge);
        SW.domWidget.bodyClickHandler.add(self.hideBridge,[config.container],config.trigger);
      }
    });
  },
  show:function(config){
    yuiDom.addClass(config.container,"show");
  },
  hide:function(config){
    yuiDom.removeClass(config.container,"show");
  },
  showBridge:function(e){
    var self = SW.domWidget.dhtmlSelect;
    var config = self.getConfig(this);
    self.show(config);
  },
  hideBridge:function(e){
    var self = SW.domWidget.dhtmlSelect;
    var config = self.getConfig(this);
    self.hide(config);
  }
});

/**
 * single handler for detecting body.onclick. Conditionally fires supplied method
 * if the cick did not originate within one of the supplied test elements.
 * Example usage: dhtml drop-down, when a click outside the drop-down is detected, the close method
 * would be called.
 * @namespace SW.domWidget.bodyClickHandler
 */
SW.domWidget.add({
  id:"bodyClickHandler",
  initialized:false,
  handlers:[],
  load:function(){
    yuiEvent.addListener(document.body,"click",this.clickBridge);
  },
  /**
   * add a new handler
   * @param {Object} method - the method to be called, the event object will be passed as the only parameter to this method.
   * @param {Array} testElements - an array of container elements. If click originates inside one of these, the method will not be invoked.
   * @param {Object} context - Optional, supplies context for the method (the "this" object, defaults to window)
   */
  add:function(method,testElements,context){
    context = context || window;
    this.handlers.push({
      method:method,
      context:context,
      testElements:testElements
    });
  },
  click:function(e){
    var clickedElement = yuiEvent.getTarget(e);
    this.handlers.forEach(function(args){
      var isContained = false;
      for(var i=0;i<args.testElements.length;i++){
        if(args.testElements[i]==clickedElement || yuiDom.isAncestor(args.testElements[i],clickedElement)){
          isContained = true;
          break;
        }
      }
      if(!isContained){
        args.method.apply(args.context,[e]);
      }
    });
  },
  /**
   * bridging method
   * @param {Object} e
   */
  clickBridge:function(e){
    var self = SW.domWidget.bodyClickHandler;
    self.click(e);
  }
});