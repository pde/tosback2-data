(function( ){
BF_WIDGET_JS=document.createElement("script"); BF_WIDGET_JS.type="text/javascript";
BF_WIDGET_SRC="http://ct.buzzfeed.com/wd/UserWidget?u=rollingstone.com&to=1&or=vb&wid=1&cb=" + (new Date()).getTime();
setTimeout(function() {document.getElementById("BF_WIDGET_1").appendChild(BF_WIDGET_JS);BF_WIDGET_JS.src=BF_WIDGET_SRC},1);
})();