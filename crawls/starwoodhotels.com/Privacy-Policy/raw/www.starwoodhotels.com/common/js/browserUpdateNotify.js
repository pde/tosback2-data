var yuiDom = YAHOO.util.Dom;
var yuiEvent = YAHOO.util.Event;
var browserUpdateNotify = {
		panel: null,
		initialize: function () {
		hideLayer=SW.tools.Cookie.get("updateNotify");
		browserUpdateNotify.panel = new YAHOO.widget.Panel("browserUpgrade",
               { width:"450px",
                height: "auto",
                fixedcenter: true,
                constraintoviewport: true,
                underlay: false,
                close: false,
                draggable: false,
                modal: true,
                visible: true,
                zIndex: 1001
               }
		)
	 if (hideLayer!="hide") {
		browserUpdateNotify.showUpdateLayer();
		yuiEvent.addListener((yuiDom.getElementsByClassName("notificationCloser")),"click",browserUpdateNotify.hideUpdateLayer);
	}
},
showUpdateLayer: function(){
	yuiDom.setStyle("browserUpgrade","display", "block");
	browserUpdateNotify.panel.render(document.body);
    browserUpdateNotify.panel.show();
},
hideUpdateLayer: function() {
	SW.tools.Cookie.set("updateNotify", "hide");
	browserUpdateNotify.panel.hide();
  }
}
yuiEvent.onDOMReady(function(){browserUpdateNotify.initialize()});