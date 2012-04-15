/*
Last Modified: 19/10/09 13:55:34

AJS JavaScript library
    A very small library with a lot of functionality
AUTHOR
    4mir Salihefendic (http://amix.dk) - amix@amix.dk
LICENSE
    Copyright (c) 2006 amix. All rights reserved.
    Copyright (c) 2005 Bob Ippolito. All rights reserved.
    http://www.opensource.org/licenses/mit-license.php
VERSION
    4.6
SITE
    http://orangoo.com/AmiNation/AJS


    ****************************************************************

    XXX
    XXX: This is meant as an interim step until all sites have Dojo
    XXX

     ONLY the OOP related functionality has been left in place.
        -- Allows for inheritance (via prototype)

        -- Also left in some very handy utility functions

    ****************************************************************

**/

if(!window.OOP) {
    var OOP = {

        // needed for Class() to work
        update: function(l1, l2) {
            for(var i in l2)
                l1[i] = l2[i];
            return l1;
        },

        //Shortcut: OOP.$b
        bind: function(fn, scope, /*optional*/ extra_args) {
            fn._cscope = scope;
            return OOP._getRealScope(fn, extra_args);
        },

        _getRealScope: function(fn, /*optional*/ extra_args) {
            extra_args = OOP.$A(extra_args);
            var scope = fn._cscope || window;

            return function() {
                try {
                    var args = OOP.$FA(arguments).concat(extra_args);
                    return fn.apply(scope, args);
                }
                catch(e) {
                }
            };
        },

        ////
        // Array functions
        ////

        //Shortcut: OOP.$A
        createArray: function(v) {
            if(OOP.isArray(v) && !OOP.isString(v))
                return v;
            else if(!v)
                return [];
            else
                return [v];
        },

        forceArray: function(args) {
            var r = [];
            for(var i = 0; i < args.length; i++)
                r.push(args[i]);
            return r;
        },

        ////
        // Misc.
        ////

        keys: function(obj) {
            var rval = [];
            for (var prop in obj) {
                rval.push(prop);
            }
            return rval;
        },

        values: function(obj) {
            var rval = [];
            for (var prop in obj) {
                rval.push(obj[prop]);
            }
            return rval;
        },

        urlencode: function(str) {
            return encodeURIComponent(
                    OOP.isDefined(str) && str.toString() || '');
        },

        urldecode: function(str) {
            var result = decodeURIComponent(
                    OOP.isDefined(str) && str.toString() || '');
            return result.replace(/\+/g, ' ');
        },

        isDefined: function(o) {
            return (o != "undefined" && o != null)
        },

        isArray: function(obj) {
            try {
                return obj instanceof Array;
            }
            catch(e) {
                return false;
            }
        },

        isString: function(obj) {
            return (typeof obj == 'string');
        },

        isNumber: function(obj) {
            return (typeof obj == 'number');
        },

        isObject: function(obj) {
            return (typeof obj == 'object');
        },

        isFunction: function(obj) {
            return (typeof obj == 'function');
        },

        isDict: function(o) {
            var str_repr = String(o);
            return str_repr.indexOf(" Object") != -1;
        },

        exportToGlobalScope: function(scope) {
            scope = scope || window;
            for(e in OOP)
                if(e != 'addEventListener')
                    scope[e] = OOP[e];
        },

        log: function(o) {
            try {
                if(window._firebug)
                    window._firebug.log(o);
                else if(window.console)
                    console.log(o);
            }
            catch(e) {
            }
        },

        withScope: function(export_scope, fn) {
            fn.apply(export_scope, []);
        },

        strip: function(str) {
            return str.replace(/^\s+/, '').replace(/\s+$/g, '');
        },

        trim_if_needed: function(str, limit, delim) {
            if(str.length > limit) {
                return str.substring(0, limit) + (delim || '...');
            }
            return str;
        }
    }

    OOP.Class = function(members) {
        var fn = function() {
            if(arguments[0] != 'no_init') {
                return this.init.apply(this, arguments);
            }
        }
        fn.prototype = members;
        OOP.update(fn, OOP.Class.prototype);
        return fn;
    }

    OOP.Class.prototype = {
        extend: function(members) {
            var parent = new this('no_init');
            for(k in members) {
                var prev = parent[k];
                var cur = members[k];
                if (prev && prev != cur && typeof cur == 'function') {
                    cur = this._parentize(cur, prev);
                }
                parent[k] = cur;
            }
            return new OOP.Class(parent);
        },

        implement: function(members) {
            OOP.update(this.prototype, members);
        },

        _parentize: function(cur, prev) {
            return function(){
                this.parent = prev;
                return cur.apply(this, arguments);
            }
        }
    }
};//End class


//Shortcuts
OOP.$FA = OOP.forceArray;
OOP.$A = OOP.createArray;
OOP.hitch = OOP.bind;
