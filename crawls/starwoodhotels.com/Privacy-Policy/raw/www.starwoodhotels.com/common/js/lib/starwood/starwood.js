/**
 * this files creates the base namespace for all core starwood
 * code -"sw". In addtion, shortcuts are created into the YAHOO.util for ease of coding.
 * @author Danlan
 */

if(YAHOO.util){
    /**
     * create shortcuts into YAHOO lib, allows for easer coding/readability.
     * some of the shortcuts: yuiDom, yuiEvent, yuiAnim, yuiEasing...
     * Same as var yuiDom = YAHOO.util.Dom;
     */
    for(var prop in YAHOO.util){
        window["yui"+ prop] = YAHOO.util[prop];
    }
    if(YAHOO.lang.JSON){
        yuiJSON = YAHOO.lang.JSON;
    }
}
/**
 * create the base "sw" namespace for all core starwood code.
 */
var SW = YAHOO.namespace("SW");

YAHOO.namespace("SW.tools"); // general utility objects and methods
YAHOO.namespace("SW.customEvent"); // custom event models
YAHOO.namespace("SW.widget"); // larger components
YAHOO.namespace("SW.domWidget"); // built in dom scrubbing to gain hooks widgets
YAHOO.namespace("SW.widget.virtualEarth"); // virtualEarth components
YAHOO.namespace("SW.flash"); // adaptors for Flash. When Flash needs to call JS, it uses this namespace. Local flash code should prefix component name with brand (ie SW.flash.SPGTour)
YAHOO.namespace("SW.local"); // namespace for any non-common code. All brand/page specific code resides here
YAHOO.namespace("SW.local.content"); // namespace
YAHOO.namespace("SW.maps");//namespace for map related JS
