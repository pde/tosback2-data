MACYS.namespace('GlobalPool');
MACYS.GlobalPool.index = 0;
YAHOO.util.Event.onDOMReady(function(){
    var globalPool = YAHOO.util.Dom.get('globalMastheadPool');
    if (globalPool) {
    	MACYS.GlobalPool.nodes = YAHOO.util.Dom.getElementsBy(function(){return true;}, 'div', globalPool);
        YAHOO.util.Dom.removeClass(MACYS.GlobalPool.nodes[MACYS.GlobalPool.index], 'hidden');
        MACYS.GlobalPool.interval = setInterval("MACYS.GlobalPool.scrollGlobalNavAd()", 7000);
    }
});
MACYS.GlobalPool.scrollGlobalNavAd = function() {
    YAHOO.util.Dom.addClass(MACYS.GlobalPool.nodes[MACYS.GlobalPool.index], 'hidden');
    MACYS.GlobalPool.index = (MACYS.GlobalPool.index+1 >= MACYS.GlobalPool.nodes.length)?0: MACYS.GlobalPool.index + 1;
    YAHOO.util.Dom.removeClass(MACYS.GlobalPool.nodes[MACYS.GlobalPool.index], 'hidden');
};