var GSFN;
if(GSFN == undefined) {
  GSFN = {};
  
  GSFN.gId = function(id) {
    return document.getElementById(id);
  };

  GSFN.hasClassName = function(element, className) {
    var elementClassName = element.className;

    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };

  GSFN.addClassName = function(element, className) {
    if (!GSFN.hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  };

  GSFN.removeClassName = function(element, className) {
    var newClass = GSFN.strip(element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' '));
    element.className = newClass;
    return element;
  };

  GSFN.strip = function(string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}

GSFN.feedback = function(url, tab_options) {
  this.empty_url = "https://s3.amazonaws.com/getsatisfaction.com/feedback/transparent.gif";
  this.feedback_url = url;
  this.tab_options = tab_options ? tab_options : {};
  this.tab_options.placement = this.tab_options.placement ? this.tab_options.placement : 'left';
  this.tab_options.color = this.tab_options.color ? this.tab_options.color : '#222';
  
  
  this.tab_html = '<a href="#" id="fdbk_tab" class="fdbk_tab_'+this.tab_options.placement+'" style="background-color:'+this.tab_options.color+'">FEEDBACK</a>';
  this.overlay_html = '<div id="fdbk_overlay" style="display:none">' +
                        '<div id="fdbk_container">' +
                          '<a href="#" onclick="GSFN.hide();return false" id="fdbk_close"></a>' +
                          '<iframe src="' + this.empty_url + '" id="fdbk_iframe" allowTransparency="true" scrolling="no" frameborder="0" class="loading"></iframe>' +
                        '</div>' +
                        '<div id="fdbk_screen"></div>' +
                      '</div>';
                      
  if(this.tab_options.container) {
    var container_el = this.gId(this.tab_options.container);
    container_el.innerHTML = this.tab_html + this.overlay_html;
  } else {
    document.write(this.tab_html);
    document.write(this.overlay_html);      
  }                   

  this.gId('fdbk_tab').onclick = function() { GSFN.show(); return false; }
  this.gId('fdbk_iframe').setAttribute("src", this.empty_url);
};

GSFN.set_position = function() {
  this.scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
  this.scroll_height = document.documentElement.scrollHeight;
  this.client_height = window.innerHeight || document.documentElement.clientHeight;
  this.gId('fdbk_screen').style.height = this.scroll_height+"px";
  this.gId('fdbk_container').style.top = this.scroll_top+(this.client_height*0.1)+"px";
};

GSFN.show = function() {
  this.gId('fdbk_iframe').setAttribute("src", this.feedback_url);
  if (this.gId('fdbk_iframe').addEventListener) {
    this.gId('fdbk_iframe').addEventListener("load", GSFN.loaded, false);
  } else if (this.gId('fdbk_iframe').attachEvent) {
    this.gId('fdbk_iframe').attachEvent("onload", GSFN.loaded);
  }
  this.set_position();
  
  GSFN.addClassName(document.getElementsByTagName('html')[0], 'feedback_tab_on');
  this.gId('fdbk_overlay').style.display = "block";
};
  
GSFN.hide = function() {
  if (GSFN.gId('fdbk_iframe').addEventListener) {
    GSFN.gId('fdbk_iframe').removeEventListener("load", GSFN.loaded, false);
  } else if (GSFN.gId('fdbk_iframe').attachEvent) {
    GSFN.gId('fdbk_iframe').detachEvent("onload", GSFN.loaded);
  }
  this.gId('fdbk_overlay').style.display = "none";
  this.gId('fdbk_iframe').setAttribute("src", this.empty_url);
  GSFN.gId('fdbk_iframe').className = "loading";

  GSFN.removeClassName(document.getElementsByTagName('html')[0], 'feedback_tab_on');
};
  
GSFN.loaded = function() {
  GSFN.gId('fdbk_iframe').className = "loaded";
};
