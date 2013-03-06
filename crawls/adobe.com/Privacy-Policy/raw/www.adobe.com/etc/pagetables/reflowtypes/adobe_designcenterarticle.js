
                var dispatcher = adobe.vrbl("reflowDispatcher", adobe.reflow.createDispatcher("width", document));
                
            dispatcher.addLayoutEvent(new adobe.reflow.LayoutEvent("tablet", 0, 960));
        
            dispatcher.addLayoutEvent(new adobe.reflow.LayoutEvent("phone", 0, 359));
        
var viewport = $(window),
        viewportWidth = NaN,
        meta = window.document.getElementsByName("viewport")[0],
        metaContent;

$(window).bind("resize orientationchange", setRenderMode);

if(meta) {
    $(document).bind("adobe.reflow.LayoutChange", snapViewportToMaxWidth);
}

setRenderMode();

function snapViewportToMaxWidth(event, layout_event) {
    if (layout_event.active) {
        var widthSetter = "width=",
            width = widthSetter+layout_event.maxRange,
            content = meta.getAttribute("content");

        if(content.indexOf(widthSetter) > -1) {
            content = content.replace(/width=[^,$]+/, width);
        } else {
            content = width;
        }
        meta.setAttribute("content", content);
    }
}

function setRenderMode() {
    var currentViewportWidth = viewport.width();
    if (viewportWidth == currentViewportWidth) {
        return;
    } //trottle noisy event
    viewportWidth = currentViewportWidth;
    dispatcher.updateLayout(viewportWidth);
}
