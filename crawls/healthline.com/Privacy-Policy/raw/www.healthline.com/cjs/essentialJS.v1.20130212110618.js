var domUtils = {
  /* try to make domUtils, a JS Framework agnostic library: use following proxy methods (or add your own) if you need to use a YUI or jQuery framework method */
  getViewportWidth :function(){
    /* proxy to appropriate library */
    if(window.YAHOO){
      return YAHOO.util.Dom.getViewportWidth();
    }
    else if(window.jQuery){
      return $(window).width();
    }
    else{
      throw "YAHOO and jQuery not available";
    }
  },
  getViewportHeight: function(){
    /* proxy to appropriate library */
    if(window.YAHOO){
      return YAHOO.util.Dom.getViewportHeight();
    }
    else if(window.jQuery){
      return $(window).height();
    }
    else{
      throw "YAHOO and jQuery not available";
    }
  },
  getDocumentScrollTop:function(){
     /* proxy to appropriate library */
    if(window.YAHOO){
      return YAHOO.util.Dom.getDocumentScrollTop();
    }
    else if(window.jQuery){
      return $(document).scrollTop();
    }
    else{
      throw "YAHOO and jQuery not available";
    }
  },
  setStyle:function(elementRef, styleRef, valueRef){
    if(window.YAHOO){
      return YAHOO.util.Dom.setStyle(elementRef, styleRef, valueRef);
    }
    else if(window.jQuery){
      return $(elementRef).css(styleRef,valueRef);
    }
    else{
      throw "YAHOO and jQuery not available";
    }
  },
  getByClass : function(searchClass,node,tag) {
          var classElements = new Array();
          if ( node == null ) node = document;
          if ( tag == null ) tag = '*';
          var els = node.getElementsByTagName(tag);
          var elsLen = els.length;
          var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
          for (var i = 0; i < elsLen; i++) {
                  if ( pattern.test(els[i].className) ) {
                          classElements.push(els[i]);
                  }
          }
          return classElements;
  },
  centerDiv: function(id, rw, rh){
        var xy = [];
		if (!formdiv) var formdiv = document.getElementById(id);
        if (formdiv.offsetHeight > 0 && rh < 1) rw = formdiv.offsetHeight; // auto-detect height, only if available yet and size isn't explicitly set
        if (formdiv.offsetWidth > 0 && rw < 1) rw = formdiv.offsetWidth;
		if (rw < domUtils.getViewportWidth()){
		  formdiv.style.left = (domUtils.getViewportWidth() - rw)/2 + "px";
		} else {
		  formdiv.style.left = '0px';
		}
		if (rh < domUtils.getViewportHeight()){
		  formdiv.style.top = ((domUtils.getViewportHeight() - rh)/2 + domUtils.getDocumentScrollTop()) + "px";
		} else {
		  var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
		  var scroller = (document.all) ? iebody.scrollTop : window.scrollY;
		  formdiv.style.top = scroller + 'px';
		}
        xy.push(parseInt(formdiv.style.left));
        xy.push(parseInt(formdiv.style.top));
        return xy;
	},
  trackActivity : function(src) {
              var unique = new Date().getTime();
              src = src.indexOf("?") > -1 ? src + "&hlUnique=" + unique : src + "?hlUnique=" + unique;
              var frame = null;
              if (document.getElementById('trackingFrame' + unique)) {
                  document.body.removeChild(document.getElementById('trackingFrame' + unique));
              }
              frame = document.createElement('IMG');
              frame.id = 'trackingFrame' + unique;
              frame.style.display = "none";
              frame.style.height = "1px";
              frame.src = src;
              frame.onload = function(){document.body.removeChild(document.getElementById('trackingFrame' + unique));};
              document.body.appendChild(frame);
     },
  toggleAllTogether: function(btn, divRef, hideName) {
        var items = domUtils.getByClass(divRef), s = null;
        if (!items || items.length == 0) items = document.getElementById(divRef);
        if (!items) return false;

        if (btn.innerHTML.toLowerCase() == 'show all') {
            for (s in items) {
                if (items[s].className.indexOf(hideName) > -1) items[s].className = items[s].className.replace(hideName, "");
            }
            btn.innerHTML = 'Collapse All';
        } else {
            for (s in items) {
                items[s].className = items[s].className + " " + hideName;
            }
            btn.innerHTML = 'Show All';
        }
    },
  toggleAllIndividually: function(divRef, hideName) {
        var items = domUtils.getByClass(divRef), s = null;
        if (!items || items.length == 0) items = document.getElementById(divRef);
        if (!items) return false;

        for (s in items) {
            if (items[s].className.indexOf(hideName) > -1){
                items[s].className = items[s].className.replace(hideName, "");
            } else {
                items[s].className = items[s].className + " " + hideName;
            }
        }
    },
  popUp: function (strURL,strType,strWidth,strHeight){
          var strOptions="";
          if (strType=="news") strOptions="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+strHeight+",width="+strWidth+",top=100,left=100";
          else if (strType=="symptomsearchresult") strOptions="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+strHeight+",width="+strWidth+",top=100,left=100";
          window.open(strURL, 'newWin', strOptions);
    },
  createTransport : function (){if (typeof XMLHttpRequest != "undefined") {var request = new XMLHttpRequest();if (request.overrideMimeType) {request.overrideMimeType('text/xml');}return request;} else if (typeof ActiveXObject != "undefined") {var http = null;try {http = new ActiveXObject("MSXML2.XmlHttp.6.0");return http;} catch (ex) {try {http = new ActiveXObjct("MSXML2.XmlHttp.3.0");return http;} catch (ex2) {try {http = new ActiveXObject("Msxml2.XMLHTTP");return http;} catch (e) {try {http = new ActiveXObject("Microsoft.XMLHTTP");return http;} catch (e) {}}throw Error("Cannot create XMLHttp object.");}}}
    },
  makeParamStr : function(form) {
        var inputList = this.buildFieldList(form, ["input", "textarea", "select"]);
        var getstr = "";
        for (var i=0; i< inputList.length; i++) {
            switch(inputList[i].tagName.toUpperCase()) {
                case "INPUT" :
                    switch(inputList[i].type.toUpperCase()) {
                          case "HIDDEN": getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&"; break;
                          case "TEXT" : getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&"; break;
                          case ("CHECKBOX" || "RADIO") :
                             getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&";
                          break;
                        default: getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&";
                    };
                    break;
                 case "TEXTAREA" : getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&";
                     break;
                 case "SELECT" :
                      var sel = inputList[i];
                      getstr += sel.name + "=" + encodeURIComponent(sel.options[sel.selectedIndex].value) + "&";
                      // TO-DO: handle multi-select
                      break;
                // TO-DO: encrypt passwords
                default: getstr += inputList[i].name + "=" + encodeURIComponent(inputList[i].value) + "&";  // button // file // image // password // reset // submit
            }
        }
        getstr = getstr.substr(0, getstr.length-1);
        return getstr;
    },
  buildFieldList : function(form, tags){
        var inputList = new Array();
        var container = (document.getElementById(form)) ? document.getElementById(form) : form;
        if (container.hasChildNodes()) {
            for (var i=0; i< tags.length; i++) {
                var inputs = container.getElementsByTagName(tags[i]);
                for (var s=0; s< inputs.length; s++) {
                    inputList.push(inputs[s]);
                }
            }
        } else inputList.push(container);
        return inputList;
    },
  get_nextsibling :function (n){
        x=n.nextSibling;
        while (x.nodeType!=1) {
          x=x.nextSibling;
        }
        return x;
    }
};

var buildOverlayPop = {
    init: function (src, width, height, close) {
          var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
          var scroller = (document.all) ? iebody.scrollTop : window.scrollY;

          if (document.getElementById('frameOverlayBg')) { var frameOverlayBg = document.getElementById('frameOverlayBg');
          } else { var frameOverlayBg = document.createElement("DIV"); frameOverlayBg.id = "frameOverlayBg"; }
          frameOverlayBg.style.position = "fixed";
          frameOverlayBg.style.top = "0px";
          frameOverlayBg.style.left = "0px";
          frameOverlayBg.style.height = "100%";
          frameOverlayBg.style.width = "100%";
          frameOverlayBg.style.background = "#000";
          frameOverlayBg.style.zIndex = "2147483640";
          domUtils.setStyle(frameOverlayBg,"opacity",".7");
          document.body.appendChild(frameOverlayBg);

          if (close) {
              if (document.getElementById('overlayCloseBtn')) { var overlayCloseBtn = document.getElementById('overlayCloseBtn');
              } else {  var overlayCloseBtn = document.createElement("SPAN"); overlayCloseBtn.id = "overlayCloseBtn"; }
              overlayCloseBtn.style.position = "absolute";
              if (navigator.userAgent.toString().toLowerCase().indexOf("msie 6") > -1) overlayCloseBtn.style.background = "transparent url(/images/hl_close.gif) no-repeat scroll 0 0";
              else overlayCloseBtn.style.background = "transparent url(/images/hl_close.png) no-repeat scroll 0 0";
              overlayCloseBtn.style.height = "25px";
              overlayCloseBtn.style.outline = "0";
              overlayCloseBtn.style.border = "0 none";
              overlayCloseBtn.style.cursor = "pointer";
              overlayCloseBtn.style.width = "25px";
              overlayCloseBtn.style.zIndex = "2147483642"; // atop everything
              overlayCloseBtn.style.display = "none";
              document.body.appendChild(overlayCloseBtn);
              overlayCloseBtn.onmouseover =function(){ this.style.backgroundPosition='0 -29px'; };
              overlayCloseBtn.onmouseout = function(){ this.style.backgroundPosition='0 0'; };
              overlayCloseBtn.onclick =function(){
                    document.body.removeChild(frameOverlayBg);
                    document.body.removeChild(frame);
                    document.body.removeChild(overlayCloseBtn);
              };
          }

          if (typeof(src) == 'string') {
              if (document.getElementById('fullAdFrame')) { var frame = document.getElementById('fullAdFrame');
              } else { var frame = document.createElement('IFRAME'); frame.id = 'fullAdFrame'; }
              frame.style.display = "none";
              frame.style.padding = "0";
              document.body.appendChild(frame);
              frame.frameBorder = "no";
              frame.scrolling = "no";
              frame.setAttribute("name", "iFrameOverlay");
              frame.src = src;
          } else {
              if (document.getElementById('fullAdFrame')) { var frame = document.getElementById('fullAdFrame');
              } else { var frame = document.createElement('DIV'); frame.id = 'fullAdFrame'; }
              frame.style.display = "none";
//              var copy = src.cloneNode(true);
              frame.style.padding = 10 + "px";
//              frame.appendChild(copy);
              document.body.appendChild(frame);
              frame.innerHTML += src.innerHTML;
          }
          frame.setAttribute("style", "margin:0; -moz-box-shadow: 3px 3px 4px #000; -webkit-box-shadow: 3px 3px 4px #000; box-shadow: 3px 3px 4px #000; -ms-filter: \"progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')\"; filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');");
          frame.style.position = "absolute";
          frame.style.background = "#fff";
          if (frame.style.MozBorderRadius !== undefined) {
            frame.style.MozBorderRadius = 15 + "px";
          } else if (frame.style.webkitBorderRadius !== undefined) {
            frame.style.webkitBorderRadius = 15 + "px";
          }

          frame.style.zIndex = "2147483641";
          frame.style.margin = 0;
          frame.style.width = width + "px";
          frame.style.height = height + "px";

          var xy = domUtils.centerDiv('fullAdFrame', width, height);
          frame.style.top = xy[1] + "px";
          frame.style.left = xy[0] + "px";
          if (close) {
             overlayCloseBtn.style.top = (xy[1] - 11) + "px";
             overlayCloseBtn.style.left = (xy[0] + width - 13) + "px";
             overlayCloseBtn.style.display = "";
          }
          frame.style.display = "";
    }, close : function(){
        document.body.removeChild(document.getElementById('frameOverlayBg'));
        document.body.removeChild(document.getElementById('fullAdFrame'));
        if (document.getElementById('overlayCloseBtn')) document.body.removeChild(document.getElementById('overlayCloseBtn'));
    }
};


printWin = null;
var hlPrinter = {
    pickPrintType : function (shareSource){
        var tool = location.pathname;
        if (!shareSource) shareSource = "hl";
        if (tool.indexOf("/galecontent") > -1 || tool.indexOf("/adamcontent") > -1 || tool.indexOf("/hlc") > -1 || tool.indexOf("/sw/") > -1 || tool.indexOf("/elseviercontent") > -1){
            hlPrinter.PrintArticle();
        } else {
            try {
                window.print();
            } catch(e){
                hlPrinter.PopForPrint(null);
            }
            return false;
        }
    },
    PrintArticle : function () {
        if (printWin != null) {printWin.close(); printWin=null;}
        var domain = location.protocol + "//" + location.host + location.pathname;
        if (location.search) domain += location.search + "&print=true";
        else domain += "?print=true";
        printWin = window.open(domain,'_blank','location=0,resizable=1,status=0,scrollbars=1,menubar=0,titlebar=0,width=400,height=600');
        printWin.focus();
    },
    PopForPrint : function(param){
        if (printWin != null) {printWin.close(); printWin=null;}
        var domain = location.href;
        if (domain.indexOf(param) == -1) {
            if (location.search) domain += "&"+param;
            else domain += "?" + param;
        }
        printWin = window.open(domain,'_blank','location=0,resizable=1,status=0,scrollbars=1,menubar=0,titlebar=0,width=1000,height=600');
        printWin.focus();
    }
};

var hlFormValidator = {

    checklength : function (obj, len, err) {
      if (obj.value.length >= len) obj.value = obj.value.substring(0, len);
      var errorObj = (document.getElementById(err)) ? document.getElementById(err) : err;
      errorObj.innerHTML = len - obj.value.length;
    },
    validemail : function (strValue) {
      var objRegExp  = new RegExp("^[a-z0-9][a-z0-9_.-]*[a-z0-9_]@[a-z0-9][a-z0-9-]*[a-z0-9](\\.[a-z0-9][a-z0-9-]*[a-z0-9])+\\.?$","i");
      return objRegExp.test(strValue);
    },
    validscreenname : function (strValue) {
      if (strValue.length < 3) {
        return false;
      }
      var objRegExp  = new RegExp("[<>&\\\\]", "i");
      return !objRegExp.test(strValue);
    },
    validzip : function (strValue) {
      var objRegExp  = new RegExp("^[0-9]{5}$", "i");
      return objRegExp.test(strValue);
    },
    validfield : function (strValue){
      var objRegExp = new RegExp("[^ \t\n]");
      return objRegExp.test(strValue);
    },
    validname : function (strValue){
      var objRegExp  = new RegExp("[<>&\\\\]", "i");
      return !objRegExp.test(strValue);
    },
    validphone : function (strValue){
      return (/\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}/.test(strValue));
    },
    validdate : function(str){
        var d = str.split("-");
        if ((d.length < 1) || (d.length > 3)) return false;
        for (var i=0; i<d.length; i++){
            if (isNaN(d[i])) return false;
        }
        return true;
    },
    is_all_ws : function (nod){
        return !(/[^\t\n\r ]/.test(nod.data));
    },
    is_ignorable : function (nod){
      return ( nod.nodeType == 8) || ( (nod.nodeType == 3) && this.is_all_ws(nod) );
    },
    node_parent : function (child){
      return (child.parentElement!=undefined) ? child.parentElement : child.parentNode;
    },
    node_before : function (sib){
      while ((sib = sib.previousSibling)){
        if (!this.is_ignorable(sib))
          return sib;
      }
      return null;
    },
    node_after : function (sib){
      while ((sib = sib.nextSibling)){
        if (!this.is_ignorable(sib))
          return sib;
      }
      return null;
    },
    last_child : function (par){
      var res=par.lastChild;
      while (res) {
        if (!this.is_ignorable(res)) return res;
        res = res.previousSibling;
      }
      return null;
    },
    first_child : function (par){
      var res=par.firstChild;
      while(res){
        if (!this.is_ignorable(res))
          return res;
        res = res.nextSibling;
      }
      return null;
    },
    data_of : function (txt){
      var data = txt.data;
      data = data.replace(/[\t\n\r ]+/g, " ");
      if (data.charAt(0) == " ")
        data = data.substring(1, data.length);
      if (data.charAt(data.length - 1) == " ")
        data = data.substring(0, data.length - 1);
      return data;
    }, are_valid : function (container){
        var obj = (document.getElementById(container)) ? document.getElementById(container) : container;
        var inputList = domUtils.buildFieldList(obj, ["input", "textarea", "select"]);
        var errors = [];
        for (var s=0; s<inputList.length; s++){
            var msg = hlFormValidator.validateField(inputList[s]);
            if (msg != "") {
                var key = "unknown";
                try { key = (inputList[s].id) ? inputList[s].id : inputList[s].name;} catch(e) {}
                errors.push({"field":key, "msg":msg});
            }
        }
        if (errors.length > 0) return errors;
        else return '';
    }, is_valid : function (container){
        var obj = (document.getElementById(container)) ? document.getElementById(container) : container;
        var inputList = domUtils.buildFieldList(obj, ["input", "textarea", "select"]);
        for (var s=0; s<inputList.length; s++){
            var msg = hlFormValidator.validateField(inputList[s]);
            if (msg != "") return msg;
        }
        return '';
    }, validateField : function(field){
            var classList = field.className;
            if (classList){
                classList.toLowerCase();
                var rawstr = "";
                switch(field.tagName.toUpperCase()) {
                    case "INPUT" :
                        switch(field.type.toUpperCase()) {
                              case "HIDDEN": rawstr = field.value; break;
                              case "TEXT" : rawstr = field.value; break;
                              case ("CHECKBOX" || "RADIO") : rawstr = field.checked; break;
                              default: rawstr = field.value;
                        };
                        break;
                     case "TEXTAREA" : rawstr = field.value;
                         break;
                     case "SELECT" : rawstr = field.options[field.selectedIndex].value; break;
                }
                var str= rawstr.replace(/(^\s+)|(\s+$)/g,'');
                if (classList.indexOf('required') > -1) {
                    if (str.length == 0 || str.length == undefined || !str.length || str.length == null) return "Field Cannot Be Empty";
                }
                if (classList.indexOf('phone') > -1) {
                    if (!this.validphone(str)) return '"' + str + '" is not a phone number';
                }
                if (classList.indexOf('name') > -1) {
                    if (!this.validname(str)) return '"' + str + '" is not a name';
                }
                if (classList.indexOf('zip') > -1) {
                    if (!this.validzip(str)) return '"' + str + '" is not a zipcode';
                }
                if (classList.indexOf('date') > -1) {
                    if (!this.validdate(str)) return '"' + str + '" is not a date';
                }
                if (classList.indexOf('email') > -1) {
                    if (!this.validemail(str)) return '"' + str + '" is not a valid email address';
                }
                if (classList.indexOf('is_numeric') > -1) {
                    if (!parseInt(str) && parseInt(str) !== 0) return '"' + str + '" is not an integer'; // "0" returns false
                }
                if (classList.indexOf('AnyIsChecked') > -1) {
                    var formEl = field.form;
                    var nodeList = formEl[field.name];
                    var checked = false;
                    for (var i=0; i < nodeList.length; i++){
                        if (nodeList[i].checked) checked = true;
                    }
                    if (!checked) return 'One of the "' + field.name + '" radio buttons must be checked';
                }
                if (classList.indexOf('lt#') > -1) {
                    var splitted = classList.split("lt#");
                    var lt = (splitted[1].indexOf(" ")) ? splitted[1].substring(0, splitted[1].indexOf(" ")) : splitted[1].substring(0, splitted[1].length);
                    if (parseInt(str) > parseInt(lt)) return '"' + str + '" must be less than ' + lt;
                }
                if (classList.indexOf('gt#') > -1) {
                    var splitted = classList.split("gt#");
                    var gt = (splitted[1].indexOf(" ")) ? splitted[1].substring(0, splitted[1].indexOf(" ")) : splitted[1].substring(0, splitted[1].length);
                    if (parseInt(str) < parseInt(gt)) return '"' + str + '" must be greater than ' + gt;
                }
            }
            return "";
    }
};