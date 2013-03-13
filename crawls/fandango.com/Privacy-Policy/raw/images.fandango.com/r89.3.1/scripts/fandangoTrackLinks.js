 /**  
 * Initialize the fandangoTrackLinks on document load. 
 * Please note the link tracking won't work if the document is not ready (which can happen.)
 *
 */
 //console.log(document.cookie.split(";"));

 $(document).ready(function () {
    //disable this from unit testing
    fandangoTrackLinks.init();
    fandangoTrackLinks.allowRedirect = true;
    fandangoTrackLinks.trackRedirectSelector = "a";
    fandangoTrackLinks.ignoreRedirectClass = "ssoReq";
    fandangoTrackLinks.ignoreTrackingClass = "close-reveal-modal";
    //disable this from unit testing
    fandangoTrackLinks.trackWssPropsFromCookie();
});

/**  
 * fandangoTrackLinks - This is a replacement for setupLinkTrack plugin, which is disabled in this code.
 * This code is dependent on Jquery, Jquery cookie plugin, and s_code.js (H.25.2)
 *
 */
if(!fandangoTrackLinks) { var fandangoTrackLinks = new Object(); };

fandangoTrackLinks = {

/**  
 * Initialize the click-tracking system and attach events to all the links
 *
 * @param {boolean} allowRedirect - Set this to "true" unless this is unit testing. 
 */
    init: function( allowRedirect ) {
         allowRedirect = (typeof allowRedirect === 'undefined') ? true : allowRedirect;
         fandangoTrackLinks.setAllowRedirect(allowRedirect);
         var trackRedirectSelector = fandangoTrackLinks.trackRedirectSelector;
         $("body").on("click.fandangotracking", fandangoTrackLinks.trackRedirectSelector, fandangoTrackLinks.trackClick);
    },

/**  
 * When there is other click event is on the specific element, we do not want to allow the redirect.  
 * Use this to prevent from using "navigate" as doneAction in s.tl() for all the links. 
 * We can overwrite this for case-by-case.
 *
 */
    allowRedirect: true,

/**  
 * Define what jquery selectors should be tracked.  For now, we are doing "catch-all" link.  
 *
 */
    trackRedirectSelector: "a",

/**  
 * We do not want to do the redirect for certain links.  Specify class to ignore the redirect in comman delimited form. (e.g."ssoReq, test")
 *
 */
    ignoreRedirectClass: "",

/**  
 * There are some scripts that add multiple "clicks" to the same class.  This will cause multiple tracking on the same click.
 * Adding this for now to ignore the tracking class.  These links needs to have separate function to track. 
 *
 */
    ignoreTrackingClass: "",

/**  
 * Add log to console if set to true
 *
 */
    debug: true,


/**  
 * trackClick is a function that will be called from click event.  
 * This is a good place to add the logic of how/what will be tracked.
 *
 * @param {Object} event - event object passed in from the click event.
 */
    trackClick: function(event){
        var props;
        var isAllowRedirect = fandangoTrackLinks.allowRedirect;
        var attachedEvents = $(this).data("events");

        //TODO: We can go further and check $(document).data("events") and find
        //      what click event is attached to document - and what "selector"
        //      is affected. Then look if $(this) has these selectors, then 
        //      change isAllowRedirect to "false".
        //      Using this as we are still using JQuery 1.7.1.
        //      In newer version of JQuery, need to use: $._data( $(this)[0], "events" );


        if(thisLinkName = $(this).attr("name")) {
            props = fandangoTrackLinks.getWssProps(thisLinkName);
        }
        else {
            props = "regular link";
            fandangoTrackLinks.removeWssProps();
        }

        // Find out what click events are attached 
        // directly to this function. If there are onclick event, 
        // we won't redirect...assuming those click event is "preventDefault" 
        // This is pretty big assumption, but looking at current codes, 
        // looks like we can do this for <a href> links.

        if(typeof attachedEvents != "undefined") {
            $.each(attachedEvents, function(eventName, eventObj) {
               if(eventName == "click") {
                  isAllowRedirect = false;
               }
            }); 
        }

        // Some inline onclick is not detected, so trying this route.
        // This is not checking if this is "onclick" has "return false" - or not
        // - as the function may be calling "return false" instead.
        // As attachedEvents related function above, this is a big assumption.
        
        if($(this).attr("onclick")){
            isAllowRedirect = false; 
        }

        // If there is target="_blank" (or any other target other than "_self")
        // then the current page should not refresh.
        if($(this).attr("target") && $(this).attr("target") != "_self"){
            isAllowRedirect = false; 
        }

        //If there is more click event attached to this link, 
        // then disable the default link's behavior to redirect. 
        if($(this).hasClass(fandangoTrackLinks.ignoreRedirectClass)) {
            isAllowRedirect = false;
        }

        if(!$(this).hasClass(fandangoTrackLinks.ignoreTrackingClass)) {
            try {
                fandangoTrackLinks.omnitureTrack(this, props, isAllowRedirect);

                if(isAllowRedirect) {
                    // As the omnitureTrack will call s.tl() with linkDoneAction = "navigate"
                    // Changing this from "return false;" to use preventDefault as some other click events
                    // that were attached to the page were not firing due to return false calling event.stopPropagation.
                    // If the link didn't have a default href, then we want to still honor the other click event instead of 
                    // forcing the redirect.
                    event.preventDefault();
                }
            }
            catch (e) {}
        }
         
    },

/**  
 * setAllowRedirect will be called from click event.  
 * This is a good place to add the logic of how/what will be tracked.
 *
 * @param {boolean} allowRedirect - to disable any redirect done by s.tl(), change this to "false"
 */
    setAllowRedirect: function( allowRedirect ) {  
        fandangoTrackLinks.allowRedirect = allowRedirect;
    },

/**  
 * getWssCodesFromNameAttr - This parses the LID and LPOS from a WSS link name and return object.
 *
 * @param {boolean} - fandangoLinkName - Link's name attribute that looks like this: "&lid=[LID]&lpos=[LPOS]" 
 */
    getWssCodesFromNameAttr: function (fandangoLinkName) {
        var nameValueArray = ToNameValueArray(fandangoLinkName);

        if (nameValueArray != null) {
            var lid = nameValueArray["lid"];
            var lpos = nameValueArray["lpos"];

            if (lid != null && lid.length > 0) {

                if (lpos == null || lpos.length <= 0) {
                    lpos = lid;
                }   

                try {
                    wssCode = new Object();
                    wssCode.lid = lid;
                    wssCode.lpos = lpos;
                    return wssCode;
                }
                catch (e) {
                    return null;
                }

            }
            else {
                 return null;
            }

        }
    },

/**  
 * omnitureTrack  - function that calls omnitrue function: s.tl
 *
 *
 * @param {Object} - obj - Link's name attribute that looks like this: "&lid=[LID]&lpos=[LPOS]" 
 * @param {Object} - params - "Prop", "eVars", "Link name" parameters are in this object.
 * @param {boolean} - allowRedirect - Set this to "false" to prevent the page redirect (important if there is 
 *                    any click action that needs to be honored.)
 * @param {String} - linkType - Omniture has link type e=exit link, d=download link and o=generic custom link.
 *                   By default, we are using 'o' as most of the link tracking is for generic custom link.
 * @param {boolean} - pageCountRefresh - Certain link will be clicked and page will not refresh 
 *                    due to the use of AJAX call. However, if we want to track this as a "page refresh", 
 *                    change this to "true".
 */

    omnitureTrack: function (obj, params, allowRedirect, linkType, pageCountRefresh) { 
        
        obj = obj || null;
        params = params || null;
        allowRedirect = (typeof allowRedirect === 'undefined') ? true : allowRedirect;
        linkType = linkType || 'o';
        pageCountRefresh = (typeof pageCountRefresh === 'undefined') ? false : pageCountRefresh;

        // obj can be an link object or none (null)
        fandangoTrackLinks.log(obj);
        //fandangoTrackLinks.log(obj);
        trackVarsArr = new Array(); 
        fandangoLinkName = "Fandango Link"; //This is a randam name I am assigning here...
        //if there is no param object, then link name is passed in.
        if(params != null && typeof(params) == "object") {
            $.each(params, function (paramName, paramValue) {
                // if the param name is "fandangoLinkName" then do not add to s.trackLinkVars.  
                // This param "fandangoLinkName" is a name of the link sent to s.tl (function below)
                
                if(paramName == "fandangoLinkName") {
                    fandangoLinkName = paramValue;
                }
                else {
                    trackVarsArr.push(paramName);
                    s[paramName] = paramValue;
                }

            });

            if(trackVarsArr.length > 0) {
                fandangoTrackLinks.addTrackLinkVars(trackVarsArr.join(",")); 
                // s.linkTrackVars needs to be updated just in case new one was added
                // If no trackVarsArr were added, then  s.tl(...)  will act like s.t()
            }

        }
        else {

            if(params != null) {
            fandangoLinkName = params;
            }

            s.prop5 = s.pageName;
        }


        if(pageCountRefresh) {
            s.t();
        }
        else {
            var linkDoneAction = "navigate";
            if(!allowRedirect) {
                linkDoneAction = null;
            }
            s.tl(obj, linkType, fandangoLinkName, null,  linkDoneAction);
            // What this means: s.tl(this,linkType,linkName, variableOverrides, doneAction)
            // doneAction is an optional parameter to specify a navigation action to execute after the track link call completes on WebKit browsers. 
            // This was added in Omniture s_code H.25.2.
        }

        //Clear s.linkTrackVars
        s.manageVars('clearVars', s.linkTrackVars, 1);
    },


 /**  
 * Log a debug message to the console if we have a console
 *
 * @param {String} - msg - as this is using console.log, this can be 
 *                 string or object assigned when the function is called
 * 
 */
    log: function (msg) {
        if (typeof (console) != "undefined" && fandangoTrackLinks.debug) {
            console.log(msg);
        }
    },

/**  
 * getWssProps adds wss codes into props in the format requested by BIG.
 * This function will call getWssCodesFromNameAttr to get object from 
 * with "lid" and "lpos" WSS values and assign to "prop" for Omniture.
 * We can possibly condense getWssCodesFromNameAttr into this function, 
 * but for easily readability sake, this is a separate function.
 *
 * @param {boolean} objLinkName - The name attribute of the link and it looks like this: "&lid=[LID]&lpos=[LPOS]" 
 *                  
 */
    getWssProps: function (objLinkName) {
        wssCodes = fandangoTrackLinks.getWssCodesFromNameAttr(objLinkName);
        thisProps = new Object();
        
        if(wssCodes != null) {
            thisProps.prop5 = s.pageName; 
            thisProps.prop6 = wssCodes.lid; 
            thisProps.prop7 = s.pageName + '|' + wssCodes.lid; 
            thisProps.prop8 = wssCodes.lpos; 
            thisProps.fandangoLinkName = "wsslink";
            return thisProps;
        }

        return false
        
    },

/**  
 * This removes wss codes from props.
 * When the page does not refresh after s.tl is called, all the WSS props
 * need to be removed, or they will be reported again on next s.tl call.
 *
 */
    removeWssProps: function () {
        s.prop5 = null;
        s.prop6 = null;
        s.prop7 = null; 
        s.prop8 = null;
    },

/**  
 * addWssPropsCookie saves wss related information into cookies.
 * The cookie will be retrieved on the next page load and s.tl will be called to report tracking.
 *
 * $.cookie is dependent on jquery cookie plugin.
 *
 * @param {String} lid - WSS link tracking id 
 * @param {String} lpos - WSS related tracking parameter
 */
    addWssPropsCookie: function (lid, lpos) {
        if($.isFunction($.cookie)){
            fandnangoLid = $.cookie('fandangoTrackingLid', lid, {path: '/'});
            fandnangoLpos = $.cookie('fandangoTrackingLpos', lpos, {path: '/'});
            fandnangoLinkPageName = $.cookie('fandangoTrackingLinkPageName', s.pageName, {path: '/'});
            fandnangoLinkUrl = $.cookie('fandangoTrackingLinkUrl', location.href, {path: '/'});
        }
    },

/**  
 * trackWssPropsFromCookie capture WSS value if set in the cookie and call s.tl().
 * This will also clean up the cookie in the end.
 *
 * $.cookie is dependent on jquery cookie plugin.
 */
    trackWssPropsFromCookie: function () {
        var lid = null;
        var lpos = null;
        var linkPageName = null;
        var linkPageUrl = null;
        var props = new Object();
        if($.isFunction($.cookie)) {
            lid = $.cookie('fandangoTrackingLid');
            lpos = $.cookie('fandangoTrackingLpos');
            linkPageName = $.cookie('fandangoTrackingLinkPageName');
            linkPageUrl = $.cookie('fandangoTrackingLinkPageName');
        }

        if(lpos == null || lpos.length <= 0) {
            lpos = lid;
        }

            props.prop5=linkPageName; 
            props.prop6=lid; 
            props.prop7= (lid != null) ? linkPageName + '|' + lid : null; 
            props.prop8=lpos; 
            props.fandangoLinkName = "wsslink";

        if(lid == null || lid.length <= 0)  {
            fandangoTrackLinks.clearTrackVars();
        }
        else {
            thisobj = new Object();
            thisobj.href = linkPageUrl;
            fandangoTrackLinks.omnitureTrack(thisobj, props, false);
        }

        fandangoTrackLinks.removeWssPropsCookie();
        return true;
    },
    
/**  
 * removeWssPropsCookie removes wss related information from cookies.
 *
 * $.removeCookie is dependent on jquery cookie plugin.
 */
    removeWssPropsCookie: function () {

        if($.isFunction($.removeCookie)){
            $.removeCookie('fandangoTrackingLid',{path: '/'});
            $.removeCookie('fandangoTrackingLpos', {path: '/'});
            $.removeCookie('fandangoTrackingLinkPageName', {path: '/'});
            $.removeCookie('fandangoTrackingLinkUrl', {path: '/'});
       }
    },

/**  
 * mergeParams merges another object into the first object using Jquery's utlity function $.extend.
 *
 * NOTE: NOT USED NOW. This is a utility function that we can use when we add more complex link name attribute
 *       besides WSS lid/lpos values.
 *
 * @param {Object} paramsParent - First object
 * @param {Object} paramsAdded - A second object to be added to the first object.
 */
    mergeParams: function(paramsParent, paramsAdded) {
      return $.extend(paramsParent, paramsAdded);
    },

/**  
 * clearTrackVars removes any variables assigned to props assigned to s.linkTrackVars
 * using the Omniture s_code function manageVars.
 *
 */
    clearTrackVars: function () {
       s.manageVars('clearVars',s.linkTrackVars,1);
    },

/**  
 * addTrackLinkVars adds "prop" to s.linkTrackVars in comma delimited string. 
 *
 */
    addTrackLinkVars: function(linkVars) { 
        currentTrackVars = s.linkTrackVars;
        currentTrackVarsArr = currentTrackVars.replace(/\s/g, '').split(",");
        linkVarsArr =  linkVars.replace(/\s/g, '').split(",");
        $.each(linkVarsArr, function(key, value) {

            if($.inArray(value, currentTrackVarsArr) == "-1") {
                currentTrackVarsArr.push(value);
            }

        });
        s.linkTrackVars = currentTrackVarsArr.join(",");
    }

};