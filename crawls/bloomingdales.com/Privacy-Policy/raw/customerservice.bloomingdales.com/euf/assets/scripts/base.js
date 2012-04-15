/** *****************************************
 * @class BLOOMIES
 * @module BLOOMIES Base
 * @Pattern Singleton
 * @requires YAHOO, BLOOMIES
 * @static
 ***************************************** */

/**
 * BLOOMIES global namespace object. Only create if it doesn't already exist.
 * This governs the Singleton nature of this base object.
 * @static
 */

if (typeof BLOOMIES == "undefined" || !BLOOMIES) {
    var BLOOMIES = {};

    /** Adapted namespacing code from core YUI YAHOO Singleton. Provides for
     * namespacing with BLOOMIES as the root package.
     *
     * @method namespace
     * @param  {String*} arguments 1-n namespaces to create
     * @return {Object}  A reference to the last namespace object created
     * @static
     */
    BLOOMIES.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=BLOOMIES;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] == "BLOOMIES") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };
}   

if(typeof BLOOMIES.log == 'undefined' || !BLOOMIES.log){
    
	/**
     * Stub method. Add implementation in the separate file.
     */
    BLOOMIES.log = function(message, category, source){
    	if(category && "error" == category.toLowerCase()){
    			throw message;
    	}
    }
}

function rollMouseOver(link) { 
	var image = link.firstChild;
	image.src = image.src.replace("_off.", "_on.");
}		
	
function rollMouseOut(link) {
	var image = link.firstChild;
	image.src = image.src.replace("_on.", "_off.");					
}