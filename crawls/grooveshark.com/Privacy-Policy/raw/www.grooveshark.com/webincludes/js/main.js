/**
 * Main Grooveshark Script
 */

(function(){
    var gs = window.gs = {
            
        /* Global Variables */
        
        player: null,
        
        isDev: false,
        userid: null,
        username: null,
        
        // model boxes
        lbFactory: null,
        
        // logging variables
        DEBUG: true,
        fakeConsole: null,
        fakeConsoleBox: null,
        
        // url info
        rootUrl : location.protocol + "//" + location.host,
        pageUrl : location.protocol + "//" + location.host + location.pathname,
        scriptUrl : location.href
            
    };
    if(window.init_data && init_data.session) {
        // user info
    gs.isDev = init_data.session.isdev || true;
    gs.userid = init_data.session.userid;
    gs.username = init_data.session.username;
    }
   
    gs.debug = window.debug = function()
    {
        if (window.console && window.console.log) {
            for (var i=0; i<arguments.length; i++) {
                console.log(arguments[i]);
            }
        }
    }
    
    gs.util = {
            /** The following functions are from
             *  http://blogs.wdevs.com/Sukumar/archive/2005/05/10/3335.aspx
             *
             *  These functions are used to detect whether a variable meets certain conditions provided by the name of the function itself:
             *      isUndefined - sees whether a variable is undefined
             *      isNull - whether a variable is null
             *      isIEObject - whether a variable is an object in IE
             *      isObject -  whether a variable is an object
             *      isFunction - whether a variable is a function
             *      isArray - whether a variable is an array
             *      isEmpty - whether a variable contains other members (applies to objects, functions, arrays)
             *      isNumber - whether a variable is a number (NaN) and not infinite
             *      isString - whether a variable is a string
             *      isBoolean - whether a variable is a boolean
             */
            isUndefined: function(a) { return typeof a == 'undefined'; },
            
            isNull: function(a) { return typeof a == 'object' && !a; },
            
            isIEObject: function(a) { return gs.util.isObject(a) && typeof a.constructor != 'function'; },
            
            isObject: function(a)
            {
                if (a == null || a == undefined) return false;
                return (typeof a == 'object' && !!a) || gs.util.isFunction(a);
            },
            
            isFunction: function(a) { return typeof a == 'function'; },
            
            isArray: function(a) { return gs.util.isObject(a) && a.constructor == Array; },
            
            isEmpty: function(o) {
                if (gs.util.isObject(o)) {
                    for (var i in o) {
                        return false;
                    }
                }
                return true;
            },
            
            isNumber: function(a) { return typeof a == 'number' && isFinite(a); },
            
            isString: function(a) { return typeof a == 'string'; },
            
            isBoolean: function(a) { return typeof a == 'boolean'; },
            
            /**
             *      uses fisher-yates algorithm for randomly shuffle an array
             */
            shuffle: function( myArray )
            {
                    var i = myArray.length;
                    if ( i == 0 ) return false;
                    while ( --i ) {
                            var j = Math.floor( Math.random() * ( i + 1 ) );
                            var tempi = myArray[i];
                            var tempj = myArray[j];
                            myArray[i] = tempj;
                            myArray[j] = tempi;
                    }
                    return myArray;
            },
            
            /**
             * like the php function, makes sure the variable "arr" is an array
             * formally: ensure_array
             */
            arrayEnsure: function(arr)
            {
                return (isArray(arr)) ? arr : [arr];
            },
            
            /** 
             * give array of what you want replaced, and what you want to replace it with and the text you want to be changed
             * formally: str_replace
            **/
            strReplace: function(search_arr, replace_str, subject)
            {
                if(subject=="") return subject;
                search_arr = arrayEnsure(search_arr);
                replace_str = arrayEnsure(replace_str);
                var length = search_arr.length;
                for(var i=0; i<length; i++) {
                    subject = subject.replace(search_arr[i], replace_str[i]);
                }
                return subject;
            },
            
            /**
             *      remove all children from a dom object
             **/
            removeChildren: function(element)
            {
                    if(!element) return;
                var node;
                while ((node = element.lastChild)) {
                    element.removeChild(node);
                }
            },
            
            /**
             * force browser to redraw a given element
             * formally: obj_redraw
             */
            objRedraw: function(obj)
            {
                    obj = obj || document.body;
                var t = obj.style.display;
                obj.style.display = 'none';
                obj.style.display = t;
                obj.className += "";    // ensure safari redraws too
            },
            
            /**
             * Returns {X,Y} coordinate position of DOM object
             */
            get_position: function(doc_obj)
            {
                    var left = 0;
                    var top  = 0;
            
                    while (doc_obj.offsetParent){
                            left += doc_obj.offsetLeft;
                            top  += doc_obj.offsetTop;
                            doc_obj = doc_obj.offsetParent;
                    }
            
                    left += doc_obj.offsetLeft;
                    top  += doc_obj.offsetTop;
            
                    return {x:left, y:top};
            },
            
            /**
             *  fix ie memory leak (http://javascript.crockford.com/memory/leak.html)
             */
            purge: function(d)
            {
                var a = d.attributes, i, l, n;
                if (a) {
                    l = a.length;
                    for (i = 0; i < l; i += 1) {
                        n = a[i].name;
                        if (typeof d[n] === 'function') {
                            d[n] = null;
                        }
                    }
                }
                a = d.childNodes;
                if (a) {
                    l = a.length;
                    for (i = 0; i < l; i += 1) {
                        purge(d.childNodes[i]);
                    }
                }
            },
            
            /**
             * Get the position of the mouse and will place the mouse X and Y value to the corresponding parameters.
             * formally: trackmouse
             */
            getMouse: function(e)
            {
                var posx =  posy = 0;
                if (e.pageX || e.pageY)     {
                            posx = e.pageX;
                            posy = e.pageY;
                    } else if (e.clientX || e.clientY)      {
                            posx = e.clientX + document.body.scrollLeft
                                    + document.documentElement.scrollLeft;
                            posy = e.clientY + document.body.scrollTop
                                    + document.documentElement.scrollTop;
                    }
                return {x:posx, y:posy};
            }
    };
    
    gs.frameLinkHandler = function(event) {
            event = event || window.event;
            var target = event.srcElement || event.target;
            if(target.href && target.href != "#") {
                    gs.debug("loc rep with href: "+target.href);
                    var url = escape(gs.getUrl(target.href));
                    gs.debug("new hash: "+gs.rootUrl+"/"+url);
                    window.top.location.hash = url;
                    
                    
                    event.cancelBubble = true;
                    event.returnValue = false;
                    if(event.stopPropagation) event.stopPropagation();
        if(event.preventDefault) event.preventDefault();
        return false;
            }
    }
    
    gs.getUrl = function(href) {
            if(typeof href !="string") { return ''; }
            var link_href = href.replace(gs.rootUrl, "");
            if(link_href.substring(0,1)=="/") {
                    link_href = link_href.replace("/", "");
            }
            gs.debug("getUrl: page_ref: "+link_href,", orig href: "+href, "gs.rootUrl: "+gs.rootUrl);
            if(link_href=="#") { return ''; }
            return link_href;
    }
    
    /**
     * Standardized show event for all modal boxes
     */
    gs.modal_show = function(hash) {
        hash.w.show();
    }
    
    /**
     * Standardized hide event for all modal boxes
     */
    gs.modal_hide = function(hash) {
        hash.o.remove();
        hash.w.hide();
    }
    
    /**
     *  Extends the array object to have the "indexOf" and "inArray" methods
     */
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(val) {
            for (var n = 0; n < this.length; n++) {
                if (this[n] == val) {
                    return n;
                }
            }
            return -1;
        }
    }
    if(!Array.prototype.inArray) {
        Array.prototype.inArray = function (value) {
            for (var i=0; i < this.length; i++) {
                if (this[i] === value) {
                    return true;
                }
            }
            return false;
        }
    }
    
    /**
     * Extend jQuery to add some custom functions
     */
    $.extend({
        /**  
         * Post information to server and ensure json return data
         */
        postJSON: function( url, data, callback ) {
                return $.post(url, data, callback, "json");
        },
        
        /**
         * Standard forms funcionality
         * formally show_messages
         */
        showMessages: function()
        {
            var text = $("p#messages_text").html();
            if (text != '') {
                $("div#messages").show();
            }
            return this;
        },
        
        /**
         * Standard forms funcionality
         * formally show_alert
         */
        showAlert: function()
        {
            var text = $("p#alert_text").html();
            if (text != '') {
                $("div#alert").show();
            }
            return this;
        },
        
        /**
         * Retrieve dom object from jQuery's function chaining
         */
        dom: function(getAll) {
            getAll = getAll || false;
            if(getAll) {
                    var d = [];
                    $(this).each(function() {
                            d.push(this);
                    });
                    return d;
            }
                    return this[0];
        },
            
        /**
         * Change the way jQuery displays dragged objects
         */
        fixDrag: function() {
            var dragtype = ($(this).attr("id")).split("_")[0];
            if(dragtype=="sid" || dragtype=="lib" || dragtype=="ssid") {
                if(isIE) {
                    var ieobj = document.getElementById($(this).attr("id"));
                    var helper = document.getElementById("dragHelper");
                    helper.innerHTML="<table><tr>"+ieobj.innerHTML+"</tr></table>";
                    var arr = $("td",helper).children();
                } else {
                    var arr = $("td",this).children();
                }
                
                var arr_length = arr.length;
                $(arr[1]).width(180+"px");
                $(arr[2]).width(180+"px");
                $(arr[3]).width(180+"px");
                $(arr[0]).remove();
                $(arr[arr_length-1]).remove();
                $(arr[arr_length-2]).remove();
                        
                $("#dragHelper").width(540+"px").css("opacity",.75);
                $(this).children().children().children(".ellipses").remove();
                $(this).css("background","#FFFFFF").css("color","#294251");
            }
            return this;
        }
    });
        
    //ie6 flicker bug-fix
    if (isIE6) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch(e) {}
    }
    
    $(document).ready(function() {
        var doRemove = false;
        gs.lbFactory = new ModalBoxFactory();
    });

    gs.internFlyerClick = function() {
        var c = "hark.com";
        var e = "obs@g";
        var a = "mai";
        var b = "lto:j";
        var d = "rooves";
        location.href = a + b + e + d + c;
    }

})();
