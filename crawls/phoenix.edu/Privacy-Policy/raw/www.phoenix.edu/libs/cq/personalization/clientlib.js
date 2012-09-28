/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics</code> library contains all analytics component classes and utilities.
 * @static
 * @class CQ_Analytics
 */

if( !window.CQ_Analytics ) {
    window.CQ_Analytics = {};
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.Operator</code> object is a singleton providing the most common operator names.
 */
CQ_Analytics.Operator = (function() {
    return function () {
    };
})();

/**
 * @cfg {String} IS
 * Operator "is".
 * @final
 */
CQ_Analytics.Operator.IS = "is";

/**
 * @cfg {String} EQUALS
 * Operator "equals".
 * @final
 */
CQ_Analytics.Operator.EQUALS = "equals";

/**
 * @cfg {String} NOT_EQUALS
 * Operator "not equals".
 * @final
 */
CQ_Analytics.Operator.NOT_EQUAL = "notequal";

/**
 * @cfg {String} GREATER
 * Operator "greater than".
 * @final
 */
CQ_Analytics.Operator.GREATER = "greater";

/**
 * @cfg {String} GREATER_OR_EQUAL
 * Operator "equals or greater than".
 * @final
 */
CQ_Analytics.Operator.GREATER_OR_EQUAL = "greaterorequal";

/**
 * @cfg {String} OLDER
 * Operator "older than".
 * @final
 */
CQ_Analytics.Operator.OLDER = "older";

/**
 * @cfg {String} OLDER_OR_EQUAL
 * Operator "equals or older than".
 * @final
 */
CQ_Analytics.Operator.OLDER_OR_EQUAL = "olderorequal";

/**
 * @cfg {String} LESS
 * Operator "less than".
 * @final
 */
CQ_Analytics.Operator.LESS = "less";

/**
 * @cfg {String} LESS_OR_EQUAL
 * Operator "equals or less than".
 * @final
 */
CQ_Analytics.Operator.LESS_OR_EQUAL = "lessorequal";

/**
 * @cfg {String} YOUNGER
 * Operator "younger than".
 * @final
 */
CQ_Analytics.Operator.YOUNGER = "younger";

/**
 * @cfg {String} YOUNGER_OR_EQUAL
 * Operator "equals or younger than".
 * @final
 */
CQ_Analytics.Operator.YOUNGER_OR_EQUAL = "youngerorequal";

/**
 * @cfg {String} CONTAINS
 * Operator "contains".
 * @final
 */
CQ_Analytics.Operator.CONTAINS = "contains";

/**
 * @cfg {String} BEGINS_WITH
 * Operator "begins with".
 * @final
 */
CQ_Analytics.Operator.BEGINS_WITH = "beginswith";

/**
 * The <code>CQ_Analytics.OperatorActions</code> object is a singleton providing utilities to resolve operations
 * containing operators (type of <code>CQ_Analytics.Operators</code>).
 */
CQ_Analytics.OperatorActions = function() {
    var mapping = {};

    var addOperator = function(name, text, operation) {
        mapping[name] = [text, operation];
    };

    addOperator(CQ_Analytics.Operator.EQUALS, "equals", "==");
    addOperator(CQ_Analytics.Operator.IS, "is", "==");

    addOperator(CQ_Analytics.Operator.NOT_EQUAL, "is not equal to", "!=");

    addOperator(CQ_Analytics.Operator.GREATER, "is greater than", ">");
    addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL, "is equal to or greater than", ">=");

    addOperator(CQ_Analytics.Operator.OLDER, "is older than", ">");
    addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL, "is equal to or older than", ">=");

    addOperator(CQ_Analytics.Operator.LESS, "is less than", "<");
    addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL, "is equal to or less than", "<=");

    addOperator(CQ_Analytics.Operator.YOUNGER, "is younger than", "<");
    addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL, "is equal to or younger than", "<=");

    addOperator(CQ_Analytics.Operator.CONTAINS, "contains", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    });

    addOperator(CQ_Analytics.Operator.BEGINS_WITH, "begins with", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) == 0;
            }
            return true;
        }
        return false;
    });

    var getByIndex = function(op, index) {
        if (mapping[op] && mapping[op][index]) {
            return mapping[op][index];
        }
        return "";
    };

    var escapeQuote = function(str) {
        if (str) {
            str = str.replace(new RegExp("\\'", "ig"), str);
        }
        return str;
    };

    return {
        /**
         * Returns operator friendly english name.
         * @param {CQ_Analytics.Operator} operator
         * @return {String} text if defined, empty string otherwise.
         */
        getText: function(operator) {
            return getByIndex(operator, 0);
        },

        /**
         * Returns operator operation, which can be either:<ul>
         * <li>String: mathematical JS operator like ==, <, <=, > ... </li>
         * <li>Function: function requiring 2 parameters, the 2 values to operate and which returns true if operation
         * success, false otherwise.
         * Example: contains operator function.<code>
         function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    }
         * </code></li>
         * </ul>
         * @param {CQ_Analytics.Operator} operator
         * @return {String/Function} Operator string or function if operator is defined, empty string otherwise.
         */
        getOperation: function(operator) {
            return getByIndex(operator, 1);
        },

        /**
         * Operates a property value and a value with an operator. Sample: <code>
           var obj = {};
           obj["age"] = 30;
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.IS, "30", "parseInt"); //returns true
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.GREATER_THAN, "40", "parseInt"); //returns false
         * </code>
         *
         * @param {Object} object Value container.
         * @param {String} property Name of the propert to operate.
         * @param {CQ_Analytics.Operator} operator
         * @param {String} value The second value of the operation
         * @param {String} valueFormat (optional) An optional value formatter (parseInt, parseFloat, toString...)
         * @return {Boolean} true if operation success, false otherwise.
         */
        operate: function(object, property, operator, value, valueFormat) {
            try {
                if (object && object[property]) {
                    var toEval = "";
                    var op = this.getOperation(operator);
                    op = op ? op : operator;
                    var objectValue = CQ.shared.XSS.getXSSTablePropertyValue(object, property);
                    if (typeof op == "function") {
                        return op.call(this, objectValue, value, valueFormat);
                    } else {
                        if (valueFormat) {
                            toEval = valueFormat + "(" + objectValue + ") " + op + " " + valueFormat + "(" + value + ")";
                        } else {
                            var s1 = escapeQuote(objectValue);
                            var s2 = escapeQuote(value);
                            toEval = "'" + s1 + "' " + op + " '" + s2 + "'";
                        }
                        var b = eval(toEval);
                        return b;
                    }

                }
            } catch(e) {
                //console.log("Error in Operator resolution", e, toEval);
            }
            return false;
        }
    };
}();
/**
 * RUZEE.ShadedBorder 0.6.1
 * (c) 2006 Steffen Rusitschka
 *
 * RUZEE.ShadedBorder is freely distributable under the terms of an MIT-style license.
 * For details, see http://www.ruzee.com/
 */

var RUZEE = window.RUZEE || {};

RUZEE.ShadedBorder = {

create: function(opts) {
  var isie = /msie/i.test(navigator.userAgent) && !window.opera;
  var isie6 = isie && !window.XMLHttpRequest;
  function sty(el, h) {
    for(k in h) {
      if (/ie_/.test(k)) {
        if (isie) el.style[k.substr(3)]=h[k];
      } else el.style[k]=h[k];
    }
  }
  function crdiv(h) {
    var el=document.createElement("div");
    el.className = "sb-gen";
    sty(el, h);
    return el;
  }
  function op(v) {
    v = v<0 ? 0 : v;
    if (v>0.99999) return "";
    return isie ? " filter:alpha(opacity=" + (v*100) + ");" : " opacity:" + v + ';';
  }

  var sr = opts.shadow || 0;
  var r = opts.corner || 0;
  var bor = 0;
  var bow = opts.border || 0;
  var boo = opts.borderOpacity || 1;
  var shadow = sr != 0;
  var lw = r > sr ? r : sr;
  var rw = lw;
  var th = lw;
  var bh = lw;
  if (bow > 0) {
    bor = r;
    r = r - bow;
  }
  var cx = r != 0 && shadow ? Math.round(lw/3) : 0;
  var cy = cx;
  var cs = Math.round(cx/2);
  var iclass = r > 0 ? "sb-inner" : "sb-shadow";
  var sclass = "sb-shadow";
  var bclass = "sb-border";
  var edges = opts.edges || "trlb";
  if (!/t/i.test(edges)) th=0;
  if (!/b/i.test(edges)) bh=0;
  if (!/l/i.test(edges)) lw=0;
  if (!/r/i.test(edges)) rw=0;

  var p = { position:"absolute", left:"0", top:"0", width:lw + "px", height:th + "px",
            ie_fontSize:"1px", overflow:"hidden", margin:"0", padding:"0" }; var tl = crdiv(p);
  delete p.left; p.right="0"; p.width=rw + "px"; var tr = crdiv(p);
  delete p.top; p.bottom="0"; p.height=bh + "px"; var br = crdiv(p);
  delete p.right; p.left="0"; p.width=lw + "px"; var bl = crdiv(p);

  var tw = crdiv({ position:"absolute", width:"100%", height:th + "px", ie_fontSize:"1px",
                   top:"0", left:"0", overflow:"hidden", margin:"0", padding:"0" });
  var t = crdiv({ position:"relative", height:th + "px", ie_fontSize:"1px",
                  margin:"0 "+ rw + "px 0 " + lw + "px", overflow:"hidden", padding:"0" });
  tw.appendChild(t);

  var bw = crdiv({ position:"absolute", left:"0", bottom:"0", width:"100%", height:bh + "px",
                   ie_fontSize:"1px", overflow:"hidden", margin:"0", padding:"0" });

  var b = crdiv({ position:"relative", height:bh + "px", ie_fontSize:"1px",
                  margin:"0 "+ rw + "px 0 " + lw + "px", overflow:"hidden", padding:"0" });

  bw.appendChild(b);

  var mw = crdiv({ position:"absolute", top:(-bh)+"px", left:"0", width:"100%", height:"100%",
                   overflow:"hidden", ie_fontSize:"1px", padding:"0", margin:"0" });

  function corner(el,t,l) {
    var w = l ? lw : rw;
    var h = t ? th : bh;
    var s = t ? cs : -cs;
    var dsb = []; var dsi = []; var dss = [];

    var xp=0; var xd=1; if (l) { xp=w-1; xd=-1; }
    for (var x=0; x<w; ++x) {
      var yp=h-1; var yd=-1; if (t) { yp=0; yd=1; }
      var finished=false;
      for (var y=h-1; y>=0 && !finished; --y) {
        var div = '<div style="position:absolute; top:' + yp + 'px; left:' + xp + 'px; ' +
                  'width:1px; height:1px; overflow:hidden; margin:0; padding:0;';

        var xc = x - cx; var yc = y - cy - s;
        var d = Math.sqrt(xc*xc+yc*yc);
        var doShadow = false;

        if (r > 0) {
          // draw border
          if (xc < 0 && yc < bor && yc >= r || yc < 0 && xc < bor && xc >= r) {
            dsb.push(div + op(boo) + '" class="' + bclass + '"></div>');
          } else
          if (d<bor && d>=r-1 && xc>=0 && yc>=0) {
            var dd = div;
            if (d>=bor-1) {
              dd += op((bor-d)*boo);
              doShadow = true;
            } else dd += op(boo);
            dsb.push(dd + '" class="' + bclass + '"></div>');
          }

          // draw inner
          var dd = div + ' z-index:2;' + (t ? 'background-position:0 -' + (r-yc-1) + 'px;' : 'background-image:none;');
          var finish = function() {
            if (!t) dd = dd.replace(/top\:\d+px/, "top:0px");
            dd = dd.replace(/height\:1px/, "height:" + (y+1) + "px");
            dsi.push(dd + '" class="' + iclass + '"></div>');
            finished = true;
          };
          if (xc < 0 && yc < r || yc < 0 && xc < r) {
            finish();
          } else
          if (d<r && xc>=0 && yc>=0) {
            if (d>=r-1) {
              dd += op(r-d);
              doShadow = true;
              dsi.push(dd + '" class="' + iclass + '"></div>');
            } else {
              finish();
            }
          } else doShadow = true;
        } else doShadow = true;

        // draw shadow
        if (sr > 0 && doShadow) {
          d = Math.sqrt(x*x+y*y);
          if (d<sr) {
            dss.push(div + ' z-index:0; ' + op(1-(d/sr)) + '" class="' + sclass + '"></div>');
          }
        }
        yp += yd;
      }
      xp += xd;
    }
    el.innerHTML = dss.concat(dsb.concat(dsi)).join('');
  }

  function mid(mw) {
    var ds = [];

    ds.push('<div style="position:relative; top:' + (th+bh) + 'px; height:2048px; ' +
            ' margin:0 ' + (rw-r-cx) + 'px 0 ' + (lw-r-cx) + 'px; ' +
            ' padding:0; overflow:hidden;' +
            ' background-position:0 ' + (th > 0 ? -(r+cy+cs) : '0') + 'px;"' +
            ' class="' + iclass + '"></div>');

    var dd = '<div style="position:absolute; width:1px;' +
        ' top:' + (th+bh) + 'px; height:2048px; padding:0; margin:0;';
    if (sr>0) {
      for (var x=0; x<lw-r-cx; ++x) {
        ds.push(dd + ' left:' + x + 'px;' + op((x+1.0)/lw) +
            '" class="' + sclass + '"></div>');
      }

      for (var x=0; x<rw-r-cx; ++x) {
        ds.push(dd + ' right:' + x + 'px;' + op((x+1.0)/rw) +
            '" class="' + sclass + '"></div>');
      }
    }

    if (bow > 0) {
      var su = ' width:' + bow + 'px;' + op(boo) + '" class="' + bclass + '"></div>';
      ds.push(dd + ' left:' + (lw-bor-cx) + 'px;' + su);
      ds.push(dd + ' right:' + (rw-bor-cx) + 'px;' + su);
    }

    mw.innerHTML = ds.join('');
  }

  function tb(el, t) {
    var ds = [];
    var h = t ? th : bh;
    var dd = '<div style="height:1px; overflow:hidden; position:absolute; margin:0; padding:0;' +
        ' width:100%; left:0px; ';
    var s = t ? cs : -cs;
    for (var y=0; y<h-s-cy-r; ++y) {
      if (sr>0) ds.push(dd + (t ? 'top:' : 'bottom:') + y + 'px;' + op((y+1)*1.0/h) +
          '" class="' + sclass + '"></div>');
    }
    if (y >= bow) {
      ds.push(dd + (t ? 'top:' : 'bottom:') + (y - bow) + 'px;' + op(boo) +
          ' height:' + bow + 'px;" class="' + bclass + '"></div>');
    }

    ds.push(dd + (t ? 'background-position-y:0; top:' :
                      'background-image:none; bottom:') + y + 'px;' +
        ' height:' + (r+cy+s) + 'px;" class="' + iclass + '"></div>');

    el.innerHTML = ds.join('');
  }

  corner(tl, true, true); corner(tr, true, false);
  corner(bl, false, true); corner(br, false, false);
  mid(mw); tb(t, true); tb(b, false);

  return {
    render: function(el) {
      if (typeof el == 'string') el = document.getElementById(el);
      if (el.length != undefined) {
        for (var i=0; i<el.length; ++i) this.render(el[i]);
        return;
      }
      el.className += " sb";
      sty(el, { position:"relative", background:"transparent" });

      // remove generated children
      var node = el.firstChild;
      while (node) {
        var nextNode = node.nextSibling;
        if (node.nodeType == 1 && node.className == 'sb-gen')
          el.removeChild(node);
        node = nextNode;
      }

      var iel = el.firstChild;

      var twc = tw.cloneNode(true);
      var mwc = mw.cloneNode(true);
      var bwc = bw.cloneNode(true);

      el.insertBefore(tl.cloneNode(true), iel); el.insertBefore(tr.cloneNode(true), iel);
      el.insertBefore(bl.cloneNode(true), iel); el.insertBefore(br.cloneNode(true), iel);
      el.insertBefore(twc, iel); el.insertBefore(mwc, iel);
      el.insertBefore(bwc, iel);

      if (isie6) {
        el.onmouseover=function() { this.className+=" hover"; }
        el.onmouseout=function() { this.className=this.className.replace(/ hover/,""); }
          window.setTimeout(function() {
            el.className+=" hover";
            el.className = el.className.replace(/ hover/,"");
          },100);
      }
      if (isie) {
        function resize() {
          twc.style.width = bwc.style.width = mwc.style.width = el.offsetWidth + "px";
          mwc.firstChild.style.height = el.offsetHeight + "px";
        }
        el.onresize=resize;
        resize();
      }
    }
  };
}
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing a set of utility methods.
 * <br>
 * @static
 * @singleton
 * @class CQ_Analytics.Utils
 */
CQ_Analytics.Utils = new function() {
    return {
        /**
         * Attaches an event handler while properly considering (aka chaining) an existing one
         * @static
         * @param {Object} event Event
         * @param {Function} func Function
         */
        registerDocumentEventHandler: function(event, func) {
            var oldHandler = window.document[event];
            if (typeof window.document[event] != 'function') {
                window.document[event] = func;
            } else {
                // chain old with new func
                window.document[event] = function(e) {
                    if (oldHandler) {
                        oldHandler(e);
                    }
                    func(e);
                };
            }
        },

        /**
         * Creates a event wraping function of a parameter function. Available parameters are:<ul>
         *        <li><b>event</b> : Object<div class="sub-desc">Event</div></li>
         *        <li><b>keyCode</b> : Number<div class="sub-desc">Key code</div></li>
         *        </ul>
         * @static
         * @param {Function} func The function to wrap
         * @return {Function} Wrapping function
         */
        eventWrapper: function(func) {
            return function(e) {
                var keyCode, event;
                if (document.all) {
                    keyCode = window.event.keyCode;
                    event = window.event;
                } else {
                    keyCode = (typeof(e.which) != 'undefined') ? e.which : 0;
                    event = e;
                }
                if (event) {
                    func(event, keyCode);
                }
            };
        },

        /**
         * Loads the HTML returned by a GET request into a DOM element.
         * @static
         * @param {String} url URL to request
         * @param {String} elemId Id of the DOM element where HTML is inserted.
         */
        loadElement: function(url, elemId) {
            CQ_Analytics.Utils.load(url, function(config, status, response) {
                $CQ("#" + elemId).html(response.responseText);
            });
        },

        /**
         * Clears in the inner HTML content of a DOM element.
         * @static
         * @param {String} elemId Id of the DOM element to clear.
         */
        clearElement: function(elemId) {
            if (elemId) {
                $CQ("#" + elemId).html("");
            }
        },

        /**
         * Checks whether or not the specified object exists in the array.
         * @param {Object} o The object to check for
         * @return {Number} The index of o in the array (or -1 if it is not found)
         */
        //Copied from CQ.Ext
        indexOf : function(array, o) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == o) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         */
        load: function(url, callback, scope) {
            return CQ.shared.HTTP.get(url, callback, scope);
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope
         */
        post: function(url, callback, params, scope) {
            return CQ.shared.HTTP.post(url, callback, params, scope);
        },

        /**
         * Returns the current page path.
         * @static
         * @return {String} Page path
         */
        getPagePath: function() {
            return CQ.shared.HTTP.getPath();
        },

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL
         * @return {String} The path
         */
        getPath: function(url) {
            return CQ.shared.HTTP.getPath(url);
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            return CQ.shared.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: function(url) {
            return CQ.shared.HTTP.removeParameters(url);
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         * Copied from CQ.HTTP
         */
        removeAnchor: function(url) {
            return CQ.shared.HTTP.removeAnchor(url);
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        //Copied from CQ.HTTP
        getSchemeAndAuthority: function(url) {
            return CQ.shared.HTTP.getSchemeAndAuthority(url);
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: function(url, doc) {
            return CQ.shared.HTTP.internalize(doc);
        },

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            return CQ.shared.HTTP.externalize(url, encode);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: function(url) {
            return CQ.shared.HTTP.encodePathOfURI(url);
        },

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ' ( )</code><br>
         * <code>; / : @ & = $ ,</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: function(path) {
            return CQ.shared.HTTP.encodePath(path);
        },

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: function() {
            return CQ.shared.HTTP.getContextPath();
        },

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         * @since 5.3
         */
        detectContextPath: function() {
            return CQ.shared.HTTP.detectContextPath();
        },

        /**
         * Takes an object and converts it to an encoded URL. e.g. CQ.Ext.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
         * @param {Object} o
         * @return {String}
         */
        //Copied from CQ.HTTP
        urlEncode : function(o) {
            if (!o) {
                return "";
            }
            if (typeof o == 'string') {
                return o;
            }
            var buf = [];
            for (var key in o) {
                var ov = o[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'undefined') {
                    buf.push(k, "=&");
                } else if (type != "function" && type != "object") {
                    buf.push(k, "=", encodeURIComponent(ov), "&");
                } else if (typeof ov == "array") {
                    if (ov.length) {
                        for (var i = 0, len = ov.length; i < len; i++) {
                            buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                        }
                    } else {
                        buf.push(k, "=&");
                    }
                }
            }
            buf.pop();
            return buf.join("");
        },

        /**
         * Returns a base 16 encoded UID based on a timestamp and a random number.
         * @static
         * @return {String} UID
         */
        getUID: function() {
            //concatenate a timestamp + a 42 bits number ( 2^42- 1)
            var r = Math.floor(Math.random() * (Math.pow(2, 42) - 1));
            return this.getTimestamp().toString(16) + r.toString(16);
        },

        /**
         * Returns a timestamp.
         * @static
         * @return {Number} Timestamp
         */
        getTimestamp: function() {
            var d = new Date();
            return d.getTime();
        },

        /**
         * Inserts a string every x character into another string.
         * @param {String} str Source string
         * @param {Number} every Inserts <b>every</b> x characters
         * @param {String} separator String to insert
         * @return {String} The string with inserted separators
         */
        insert: function(str, every, separator) {
            if (!str || isNaN(every) || !separator) return str;
            var res = "";
            var from = 0;
            var to = every;
            while (to < str.length) {
                res += str.substring(from, to) + separator;
                from += every;
                to += every;
            }
            if (from < str.length) {
                res += str.substring(from);
            }
            return res;
        },

        addListener: function () {
            if (window.addEventListener) {
                return function(el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        },

        removeListener: function() {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }
    };
};

/**
 * A helper class providing a set of clickstream cloud rendering utility methods.
 * <br>
 * @static
 * @singleton
 * @class CQ_Analytics.ClickstreamcloudRenderingUtils
 */

CQ_Analytics.ClickstreamcloudRenderingUtils = new function() {
    return {
        /**
         * Creates a link DOM element.
         * @param {String} text Text
         * @param {Function} func Onclick method
         * @param {Object} props Tag attributes
         * @return {Element} Link DOM element.
         */
        createLink: function(text, func, props, anchor) {
            var link = document.createElement("a");
            link.href = anchor;
            link.onclick = func;
            link.innerHTML = text;
            if (props) {
                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        link[p] = props[p];
                    }
                }
            }
            return link;
        },

        /**
         * Creates a link DOM element.
         * @param {String} text Text
         * @param {String} href Href
         * @param {Object} title Title
         * @return {Element} Link DOM element.
         */
        createStaticLink: function(text, href, title) {
            var link = document.createElement("a");
            link.href = href;
            link.innerHTML = text;
            link.title = title;
            link.alt = title;
            return link;
        },

        /**
         * Creates a span DOM element with format "property = value"
         * @param {String} label Property label
         * @param {String} value Value
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createNameValue: function(label, value, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            span.innerHTML = label + " = " + value;
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element
         * @param {String} text Span inner HTML
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createText: function(text, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            if( text && text.indexOf && (
                    (text.indexOf("/home") != -1 && text.indexOf("/image") != -1)
                    || (text.indexOf("/") != -1 && text.indexOf(".png") != -1))) {
                //image
                span.innerHTML = "<img src=\"" + text + ".prof.thumbnail.png\" border=\"0\">";
            }
            else if(text && text.indexOf && text.indexOf("www.gravatar.com") != -1){
                span.innerHTML = "<img src=\"" + text + "\">";
            }
            else {
                span.innerHTML = text;
            }
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element with format "property = value" and on click, transforms
         * value to text input field.
         * @param {String} name Property label
         * @param {String} value Value
         * @return {Element} Span DOM element.
         */
        createEditablePropertySpan: function(name, value) {
            //TODO generalize css classes
            var onclick = "var editSpan = this.nextSibling; " +
                          "this.style.display = 'none'; " +
                          "editSpan.style.display = 'block';";
            var onblur = "var editSpan = this.parentNode; " +
                         "var readSpan = this.parentNode.previousSibling;" +
                         "var newValue = this.value;" +
                         "editSpan.style.display = 'none'; " +
                         "readSpan.innerHTML = '" + name + " = '+value; " +
                         "readSpan.style.display = 'block';";
            var span = document.createElement("span");
            span.innerHTML = "<span class=\"ccl-data\" onclick=\"" + onclick + "\">" + name + " = " + value + "</span>";
            span.innerHTML += "<span class=\"ccl-data\" style=\"display: none;\">" + name + " = <input class=\"ccl-input\" type=\"text\" value=\"" + value + "\" onblur=\"" + onblur + "\"></span>";
            span.className = "ccl-data";
            return span;
        }
    };
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
CQ_Analytics.Cookie = {
    set: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    erase: function(name) {
        CQ_Analytics.Cookie.set(name, "", -1);
    }
};

/**
 * @class CQ_Analytics.SessionPersistence
 * The CQ_Analytics.SessionPersistence is a class providing method to persist a map of pairs (key/value).
 * @constructor
 * Creates a new CQ_Analytics.SessionPersistence.
 */
CQ_Analytics.SessionPersistence = function() {
    return {
        COOKIE_NAME: "SessionPersistence",
        set: function(key, value) {
            value = value || "";
            var pairsMap = this.getMap();
            if (!pairsMap) {
                pairsMap = "";
            }
            var index = pairsMap.indexOf(key + ":=");
            if (index == -1) {
                pairsMap += key + ":=" + value + "|";
            } else {
                var start = pairsMap.substring(0, index);
                var end = pairsMap.substring(pairsMap.indexOf("|", index + 2) + 1);
                pairsMap = start + key + ":=" + value + "|" + end;
            }

            this.setMap(pairsMap);
        },

        get: function(key) {
            var pairsMap = this.getMap();

            var value = "";
            if (pairsMap) {
                var index = pairsMap.indexOf(key + ":=");
                if (index != -1) {
                    value = pairsMap.substring(index + (key + ":=").length, pairsMap.indexOf("|", index + 2));
                }
            }
            value = (value == "null" ? "" : (value || ""));
            return value;
        },

        getMap: function() {
            var pairsMap = CQ_Analytics.Cookie.read(this.COOKIE_NAME);
            if (pairsMap) {
                return decodeURIComponent(pairsMap);
            }
            return null;
        },

        setMap: function(pairsMap) {
            CQ_Analytics.Cookie.set(this.COOKIE_NAME, encodeURIComponent(pairsMap), 365 /* days */);
        },

        clearMap: function() {
            CQ_Analytics.Cookie.erase(this.COOKIE_NAME);
        },

        remove: function(key) {
            var pairsMap = this.getMap();
            if (!pairsMap) {
                pairsMap = "";
            }
            var index = pairsMap.indexOf(key + ":=");
            if (index != -1) {
                var start = pairsMap.substring(0, index);
                var end = pairsMap.substring(pairsMap.indexOf("|", index + 2) + 1);

                pairsMap = start + end;
            }

            this.setMap(pairsMap);
        }
    };
};

/**
 * @class CQ_Analytics.Observable
 * An Observable adds the observable design pattern to an object: this object fires events and allows other objects to
 * listen to these events and react.
 * @constructor
 * Creates a new Observable.
 */
CQ_Analytics.Observable = function() {
    this.fireEvent = function(event) {
        if (event && this.listeners) {
            event = event.toLowerCase();
            var args = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < this.listeners.length; i++) {
                var l = this.listeners[i];
                if (event == l.event) {
                    if (l.fireFn.apply(l.scope || this || window, args) === false) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
};

/**
 * Appends an event handler to the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 * @param {Object} scope (optional) The scope in which to execute the handler
 * function. The handler function's "this" context.
 */
CQ_Analytics.Observable.prototype.addListener = function(event, fct, scope) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        this.listeners.push({
            "event": event.toLowerCase(),
            "fireFn": fct,
            "scope": scope
        });
    }
};

/**
 * Removes an event handler from the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 */
CQ_Analytics.Observable.prototype.removeListener = function(event, fct) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].event == event &&
                    this.listeners[i].fireFn == fct) {
                this.listeners.splice(i, 1);
            }
        }
    }
};

/**
 * Array of listeners objects.
 * @private
 */
CQ_Analytics.Observable.prototype.listeners = null;

/**
 * @class CQ_Analytics.SessionStore
 * @extends CQ_Analytics.Observable
 * A SessionStore is a container of properties/values.
 * @constructor
 * Creates a new SessionStore.
 */
CQ_Analytics.SessionStore = function() {};

CQ_Analytics.SessionStore.prototype = new CQ_Analytics.Observable();

/**
 * Sets the value of a property.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    this.fireEvent("update", name);
};

/**
 * Initializes the store.
 */
CQ_Analytics.SessionStore.prototype.init = function() {};

/**
 * Returns a store property friendly label.
 * @param {String} name Property name.
 * @return {String} the label.
 */
CQ_Analytics.SessionStore.prototype.getLabel = function(name) { return name; };

/**
 * Returns a store property in a link format.
 * @param {String} name Property name.
 * @return {String} the link value.
 */
CQ_Analytics.SessionStore.prototype.getLink = function(name) { return name; };

/**
 * Removes a property from the store.
 * @param {String} name Property name.
 */
CQ_Analytics.SessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
    }
    var xssName = CQ.shared.XSS.getXSSPropertyName(name);
    if( this.data[xssName] ) {
        delete this.data[xssName];
    }

    this.fireEvent("update", name);
};

/**
 * Returns all store property names.
 * @param {String[]} excluded (Optional) Array of excluded properties (not returned).
 * @return {String[]} Array of the property names.
 */
CQ_Analytics.SessionStore.prototype.getPropertyNames = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    excluded = excluded ? excluded : [];

    var res = new Array();
    for (var p in this.data) {
        if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
            res.push(p);
        }
    }
    return res;
};

/**
 * Returns the session store attached to the current object (returns this).
 * @return {CQ_Analytics.SessionStore} Session store.
 */
CQ_Analytics.SessionStore.prototype.getSessionStore = function() {
    return this;
};

/**
 * Clears the store.
 */
CQ_Analytics.SessionStore.prototype.clear = function() {
    this.data = null;
};

/**
 * Returns the store data.
 * @param {String[]} excluded Property names to exclude from the result.
 * @return {Object} Object containing the store data (obj["property"] = value).
 */
CQ_Analytics.SessionStore.prototype.getData = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    if (excluded) {
        var ret = {};
        for (var p in this.data) {
            if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
                ret[p] = this.data[p];
            }
        }
        return ret;
    } else {
        return this.data;
    }
};

/**
 * Resets the store: restores initial values.
 */
CQ_Analytics.SessionStore.prototype.reset = function() {
    if (this.data != null) {
        this.data = null;
        this.fireEvent("update");
    }
};

/**
 * Returns a store property (XSS filtered value).
 * @param {String} name Property name.
 * @param {Boolean} raw Raw value, no XSS filtering
 * @return {String} the value.
 */
CQ_Analytics.SessionStore.prototype.getProperty = function(name, raw) {
    if (this.data == null) {
        this.init();
    }
    if( !raw ) {
        var xssName = CQ.shared.XSS.getXSSPropertyName(name);
        if( this.data[xssName] ) {
            return this.data[xssName];
        }
    }
    return this.data[name];
};

/**
 * Returns the store name.
 */
CQ_Analytics.SessionStore.prototype.getName = function() {
    return this.STORENAME;
};

/**
 * Adds an initial property to the store.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.addInitProperty = function(name, value) {
    if (! this.initProperty) this.initProperty = {};
    this.initProperty[name] = value;
};

/**
 * Loads initial properties from an object.
 * @param {Object} obj Object containing the initil store data (obj["property"] = value).
 */
CQ_Analytics.SessionStore.prototype.loadInitProperties = function(obj) {
    if (obj) {
        for (var p in obj) {
            this.addInitProperty(p, obj[p]);
        }
    }
};

/**
 * @class CQ_Analytics.PersistedSessionStore
 * @extends CQ_Analytics.SessionStore
 * A PersistedSessionStore is a persisted container of properties/values.
 * @constructor
 * Creates a new PersistedSessionStore.
 */
CQ_Analytics.PersistedSessionStore = function () {};

CQ_Analytics.PersistedSessionStore.prototype = new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY = "key";

/**
 * Defines a property as non persited. By default all properties are persisted.
 * @param {String} name Property name
 */
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    this.nonPersisted[name] = true;
};

/**
 * Returns if a property in persisted or not.
 * @param {String} name Property name.
 * @return {Boolean} true if persisted, false otherwise.
 */
CQ_Analytics.PersistedSessionStore.prototype.isPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    return this.nonPersisted[name] !== true;
};

/**
 * Returns the store key name used by persistence.
 * @return {String} The key name.
 */
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey = function() {
    return this.STOREKEY;
};

/**
 * Persists the store. All properties will be persisted as property=value using a CQ_Analytics.SessionPersistence.
 */
CQ_Analytics.PersistedSessionStore.prototype.persist = function() {
    if (this.fireEvent("beforepersist") !== false) {
        var store = new CQ_Analytics.SessionPersistence();
        store.set(this.getStoreKey(), this.toString());
        this.fireEvent("persist");
    }
};

/**
 * {@inheritDoc}
 */
CQ_Analytics.PersistedSessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    if (this.isPersisted(name)) {
        this.persist();
    }
    this.fireEvent("update", name);
};

/**
 * Transforms the current store of paris (name,value) to a string.
 * @return {String} The stringified store.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.toString = function() {
    var list = null;
    if (this.data) {
        for (var p in this.data) {
            if (this.isPersisted(p) && this.data.hasOwnProperty(p)) {
                list = (list === null ? "" : list + ",");
                list += (p + "=" + this.data[p]);
            }
        }
    }
    return list;
};

/**
 * Parses the given string to fill the store.
 * @param {String} str Stringified store.
 * @return {Object} Parsed object.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.parse = function(str) {
    var obj = {};
    var array = str.split(",");
    for (var t in array) {
        if (array.hasOwnProperty(t)) {
            var entry = array[t].split("=");
            if (entry.length == 2) {
                obj[entry[0]] = entry[1];
            }
        }
    }
    return obj;
};

/**
 * {@inheritDoc}
 */
CQ_Analytics.PersistedSessionStore.prototype.reset = function(deferEvent) {
    if (this.data != null) {
        this.data = {};
        this.persist();
        this.data = null;
        if (!deferEvent) {
            this.fireEvent("update");
        }
    }
};

/**
 * {@inheritDoc}
 */
CQ_Analytics.PersistedSessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
        if (this.isPersisted(name)) {
            this.persist();
        }
    }
    this.fireEvent("update", name);
};

/**
 * {@inheritDoc}
 */
CQ_Analytics.PersistedSessionStore.prototype.clear = function() {
    var store = new CQ_Analytics.SessionPersistence();
    store.remove(this.getStoreKey());
    this.data = null;
};
if(!CQ_Analytics.ClickstreamcloudMgr){CQ_Analytics.ClickstreamcloudMgr=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.stores={};
this.data=null;
this.config=null;
this.isConfigLoaded=false;
this.areStoresLoaded=false;
this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ClickstreamcloudMgr.prototype.STOREKEY="CLICKSTREAMCLOUD";
CQ_Analytics.ClickstreamcloudMgr.prototype.STORENAME="clickstreamcloud";
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_PAGELOAD=1;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_TIMER=2;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_DATAUPDATE=4;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_TIMER=600;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PROCESS_TIMER=60;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE=6;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PATH="/var/statistics/";
CQ_Analytics.ClickstreamcloudMgr.prototype.CONFIG_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/clickstreamcloud/content/config.json",true);
CQ_Analytics.ClickstreamcloudMgr.prototype.init=function(){this.clickstreamcloud={};
this.clickstreamcloudToServer={};
var b=new CQ_Analytics.SessionPersistence();
var d=b.get(this.getStoreKey());
if(d){this.data=this.parse(d)
}else{this.data={}
}if(CQ_Analytics.CCM&&this.isMode(CQ_Analytics.CCM.POST_MODE_TIMER)){var a=this;
var c=function(){a.timer=window.setInterval(function(){try{var f=parseInt(a.data.lastPost);
var h=false;
if(isNaN(f)){h=true
}else{var g=new Date().getTime();
if(g>f+CQ_Analytics.CCM.POST_TIMER*1000){h=true
}}}catch(e){}if(h){a.post()
}},CQ_Analytics.POST_PROCESS_TIMER*1000)
};
if(this.areStoresLoaded){c.call(this)
}else{this.addListener("storesloaded",c,this)
}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getSessionId=function(){if(!this.data.sessionId){this.setSessionId(CQ_Analytics.Utils.getUID())
}return this.data.sessionId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setSessionId=function(a){if(a){this.setProperty("sessionId",a)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getVisitorId=function(){return this.data.visitorId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setVisitorId=function(a){this.setProperty("visitorId",a)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getId=function(){var a=this.getVisitorId();
if(!a){return this.getSessionId()
}return a
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isAnonymous=function(){var a=this.getVisitorId();
return(!a)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isMode=function(a){return(CQ_Analytics.CCM.POST_MODE&a)>0
};
CQ_Analytics.ClickstreamcloudMgr.prototype.get=function(a){if(this.clickstreamcloud==null){this.init()
}if(a){return this.clickstreamcloudToServer
}return this.clickstreamcloud
};
CQ_Analytics.ClickstreamcloudMgr.prototype.register=function(c){if(this.clickstreamcloud==null){this.init()
}var a=this;
this.clickstreamcloud[c.getName()]=c.getData();
this.stores[c.getName()]=c;
var b=this.getStoreConfig(c.getName());
if(b.stats!==false&&b.stats!="false"){this.clickstreamcloudToServer[c.getName()]=c.getData(b.excludedFromStats)
}c.addListener("update",function(){a.update(c)
});
if(this.isMode(CQ_Analytics.CCM.POST_MODE_DATAUPDATE)){c.addListener("persist",function(){if(a.areStoresLoaded){a.post(c)
}})
}this.addListener("clear",function(){c.clear()
});
this.fireEvent("storeupdate",c)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.update=function(b){if(this.clickstreamcloud==null){this.init()
}this.clickstreamcloud[b.getName()]=b.getData();
var a=this.getStoreConfig(b.getName());
if(a.stats!==false&&a.stats!="false"){this.clickstreamcloudToServer[b.getName()]=b.getData(a.excludedFromStats)
}this.fireEvent("storeupdate",b)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.startPosting=function(){this.posting=true
};
CQ_Analytics.ClickstreamcloudMgr.prototype.stopPosting=function(){this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype.post=function(){if(this.posting){try{var e=this.getCCMToJCR();
var d=CQ_Analytics.Utils.getTimestamp();
e["./jcr:primaryType"]="nt:unstructured";
e["./sessionId"]=this.getSessionId();
var c=this.POST_PATH+this.getName()+"/";
if(this.isAnonymous()){var a=CQ_Analytics.Utils.insert(this.getId(),2,"/");
c+="anonymous/"+a+"/"+d
}else{c+="users/"+this.getId()+"/"+d
}CQ_Analytics.Utils.post(c,null,e);
this.setProperty("lastPost",d)
}catch(b){}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getCCMToJCR=function(){var g=this.get(true);
var h={};
for(var d in g){var c=g[d],b=encodeURIComponent(d);
var e=typeof c;
if(e=="object"){for(var f in c){var a=c[f];
f=f.replace(":","/");
h["./"+d+"/./"+f]=a
}}else{h["./"+d]=c
}}return h
},CQ_Analytics.ClickstreamcloudMgr.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.ClickstreamcloudMgr.prototype.clear=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.fireEvent("clear")
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getRegisteredStore=function(a){return this.stores&&this.stores[a]?this.stores[a]:null
};
CQ_Analytics.ClickstreamcloudMgr.prototype.loadConfig=function(c){var setConfig=function(ccm,config){ccm.config=config;
ccm.isConfigLoaded=true;
ccm.fireEvent("configloaded");
ccm.fireEvent("storesloaded");
ccm.areStoresLoaded=true;
if(ccm.isMode(CQ_Analytics.CCM.POST_MODE_PAGELOAD)){ccm.post()
}};
if(c){setConfig(this,c)
}else{var params={};
params.path=CQ_Analytics.Utils.getPagePath();
params.cq_ck=new Date().valueOf();
var url=this.CONFIG_PATH;
url+="?"+CQ_Analytics.Utils.urlEncode(params);
CQ_Analytics.Utils.load(url,function(data,status,response){var config={};
try{config=eval("config = "+response.responseText)
}catch(error){}setConfig(this,config)
},this)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getConfig=function(){return this.config
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getStoreConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["store"]){return this.config.configs[a]["store"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getEditConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["edit"]){return this.config.configs[a]["edit"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getUIConfig=function(a){if(this.config&&this.config.configs&&this.config.configs[a]&&this.config.configs[a]["ui"]){return this.config.configs[a]["ui"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getInitialData=function(a){if(this.config&&this.config.data&&this.config.data[a]){return this.config.data[a]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr=CQ_Analytics.CCM=new CQ_Analytics.ClickstreamcloudMgr();
$CQ(function(){CQ_Analytics.ClickstreamcloudMgr.loadConfig(ClickstreamCloudManagerConfig)
});
window.setTimeout(function(){CQ_Analytics.CCM.init()
},1);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var b in CQ_Analytics.ClickstreamcloudMgr){delete CQ_Analytics.ClickstreamcloudMgr[b]
}CQ_Analytics.ClickstreamcloudMgr=null
}catch(a){}CQ_Analytics.CCM=null
})
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.SegmentMgr</code> object is a singleton providing methods for registration and resolution
 * of different segments.
 */
if (!CQ_Analytics.SegmentMgr) {
    CQ_Analytics.SegmentMgr = function() {
        this.SEGMENTATION_ROOT = "/etc/segmentation";
        this.SEGMENT_SELECTOR = ".segment.js";
        this.SEGMENTATION_SCRIPT_LOADER = "cq-segmentation-loader";

        this.segments = {};
        this.boosts = {};

        var currentObj = this;
        this.fireUpdate = function() {
            currentObj.fireEvent("update");
        };
    };

    CQ_Analytics.SegmentMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.SegmentMgr.prototype.STORENAME = "segments";

    /**
     * Registers a segment.
     * @param {String} segmentPath Path to the segment.
     * @param {String} rule Boolean JS expression defining the segment.
     * @param {Number} boost (Optional) Segment boost (defaults to 0).
     */
    CQ_Analytics.SegmentMgr.prototype.register = function(segmentPath, rule, boost) {
        this.segments[segmentPath] = rule;
        this.boosts[segmentPath] = !isNaN(boost) ? parseInt(boost) : 0;
        this.fireUpdate();
    };

    /**
     * Resolves an array of segments. Resolution depends on operator:<ul>
     * <li>operator is AND: success if all segments of array resolve.</li>
     * <li>operator is OR: success when finding one segment of array resolving.</li>
     * </ul>
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clickstreamcloud  Object containing values to try to resolve segments.
     * @param {String} operator (Optional) Operator: "OR" / "AND" (defaults to "OR").
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolveArray = function(segmentPaths, clickstreamcloud, operator) {
        clickstreamcloud = clickstreamcloud || CQ_Analytics.ClickstreamcloudMgr.get();

        if (!(segmentPaths instanceof Array)) {
            return this.resolve(segmentPaths, clickstreamcloud);
        }

        operator = ( operator == "AND" ? "AND" : "OR");

        var finalRes = ( operator == "AND");
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            var res = this.resolve(s, clickstreamcloud);
            if (operator == "AND") {
                if (res !== true) return res;
            } else {
                if (res === true) return true;
            }
        }
        return finalRes;
    };

    /**
     * Resolves a segment. Tries to eval the rule of the segment the given clickstreamcloud object.
     * @param {String} segmentPath Segment path.
     * @param {Object} clickstreamcloud  Object containing values to try to resolve segments.
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolve = function(segmentPath, clickstreamcloud) {
        clickstreamcloud = clickstreamcloud || CQ_Analytics.ClickstreamcloudMgr.get();

        if (!segmentPath) return false;

        if (segmentPath instanceof Array) return this.resolveArray(segmentPath, clickstreamcloud);


        if (segmentPath.indexOf(this.SEGMENTATION_ROOT) != 0) return false;

        if (segmentPath == this.SEGMENTATION_ROOT) return true;

        if (!this.segments[segmentPath]) return true;

        //first resolve parents
        var parent = segmentPath.substring(0, segmentPath.lastIndexOf("/"));
        if (parent.indexOf(this.SEGMENTATION_ROOT) == 0) {
            var pres = this.resolve(parent, clickstreamcloud);
            if (pres !== true) return pres;
        }

        var rules = "function(clickstreamcloud) { return true ";
        rules += " && ( " + this.segments[segmentPath] + " ) ";
        rules += ";}";

        var res = true;
        try {
            var f = null;
            eval("f = " + rules + "");
            var e = (f == null || f(clickstreamcloud));
            res = res && (e === true);
        } catch(error) {
            return "Unresolved - Error while evaluating segment " + segmentPath + " : " + error.message;
        }
        return res;
    };

    /**
     * Returns all resolving segments for the given clickstreamcloud.
     * @param {Object} clickstreamcloud  Object containing values to try to resolve segments.
     * @return {String[]} Array of resolving segments.
     */
    CQ_Analytics.SegmentMgr.prototype.getResolved = function(clickstreamcloud) {
        clickstreamcloud = clickstreamcloud || CQ_Analytics.ClickstreamcloudMgr.get();
        var res = new Array();
        for (var path in this.segments) {
            if (this.resolve(path, clickstreamcloud) === true) {
                res.push(path);
            }
        }
        return res;
    };

    /**
     * Returns the max boost of an array of segments. Segment must resolve the given clickstreamcloud.
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clickstreamcloud  Object containing values to try to resolve segments.
     * @return {Number} The max boost of the resolving segments.
     */

    CQ_Analytics.SegmentMgr.prototype.getMaxBoost = function(segmentPaths, clickstreamcloud) {
        if (!(segmentPaths instanceof Array)) {
            return this.getBoost(segmentPaths);
        }
        var boost = 0;
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            if (this.resolve(s, clickstreamcloud) === true) {
                var b = this.boosts[s] || 0;
                if (b > boost) {
                    boost = b;
                }
            }
        }
        return boost;
    };

    /**
     * Returns the boost of a segment.
     * @param segmentPath Path of the segment
     * @return {Number} Boost of the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.getBoost = function(segmentPath) {
        if (!(segmentPath instanceof Array)) {
            segmentPath = [segmentPath];
        }
        return this.boosts[segmentPath] || 0;
    };

    /**
     * Reloads the given segment. 
     * @param path Path to the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.reload = function(path) {
        var url = path;
        if( !url ) {
            url = this.SEGMENTATION_ROOT;
        }

        if(url) {
            if(url.indexOf(this.SEGMENT_SELECTOR) == -1) url += this.SEGMENT_SELECTOR;
            try {
                CQ_Analytics.Utils.load(url,function(config, status, response) {
                    if(response && response.responseText) {
                        eval(response.responseText);
                    }
                },this);
                var response = CQ.HTTP.get(scripts[i].src);
            } catch(err) {}
        }
    };

    CQ_Analytics.SegmentMgr.prototype.getSessionStore = function() {
        return this;
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.SegmentMgr.prototype.getProperty = function(name) {
        return name;
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.SegmentMgr.prototype.getLink = function(name) {
        return name + ".html";
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.SegmentMgr.prototype.getLabel = function(name) {
        if (name) {
            var label = name;
            var index = label.lastIndexOf("/");
            if (index != -1) {
                label = label.substring(index + 1, label.length);
            }
            var res = this.resolve(name);
            if (res === true) {
                return label;
            } else {
                if (res !== true) {
                    return "<span class=\"invalid\" title=\"" + res + "\" alt=\"" + res + "\">" + label + "</span>";
                }
            }
        }
        return name;
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.SegmentMgr.prototype.getPropertyNames = function() {
        return this.getResolved();
    };

    CQ_Analytics.SegmentMgr = new CQ_Analytics.SegmentMgr();
    CQ_Analytics.ClickstreamcloudMgr.addListener("storeupdate", CQ_Analytics.SegmentMgr.fireUpdate);

    CQ_Analytics.Utils.addListener(window, "unload", function() {
        try {
            for(var p in CQ_Analytics.SegmentMgr) {
                delete CQ_Analytics.SegmentMgr[p];
            }
        } catch(error) {}
        CQ_Analytics.SegmentMgr = null;
    });
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.StrategyMgr</code> object is a singleton managing registration of different selection
 * strategies and selection of teasers
 */
if (!CQ_Analytics.StrategyMgr) {
    CQ_Analytics.StrategyMgr = function() {
        this.strategies = {};
    };

    CQ_Analytics.StrategyMgr.prototype = {};

    /**
     * Returns if a strategy is registered or not.
     * @param {String} strategy Strategy name
     * @retrun {Boolean} true if strategy registred. False otherwise.
     */
    CQ_Analytics.StrategyMgr.prototype.isRegistered = function(strategy) {
        return !!this.strategies[strategy];
    };

    /**
     * Registers a selection strategy. Selection function must return true or false,
     * and has one Array parameter: list of all teasers.
     * @param {String} strategy Strategy name
     * @param {Function} func Selection function
     */
    CQ_Analytics.StrategyMgr.prototype.register = function(strategy, func) {
        if (typeof func == 'function') {
            this.strategies[strategy] = func;
        }
    };

    /**
     * Chooses one teaser if the teasers list depending on the specified strategy.
     * @param {String} strategy Strategy name
     * @param {Array} teasers List of teasers
     * @return {Object} The selected teaser
     */
    CQ_Analytics.StrategyMgr.prototype.choose = function(strategy, teasers) {
        //no need to apply a strategy to choose in a list of one item!
        if (teasers.length == 1) return teasers[0];

        if (this.strategies[strategy]) {
            return this.strategies[strategy].call(this, teasers);
        }
    };

    CQ_Analytics.StrategyMgr = new CQ_Analytics.StrategyMgr();
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects a teaser depending on the current surfer clickstream score
CQ_Analytics.StrategyMgr.register("clickstream-score", function(teasers) {
    //no need to apply a complex logic choose one item in a set of one!
    if( teasers.length == 1) {
        return teasers[0];
    }

    var selectedTeasers = [];
    if( CQ_Analytics.TagCloudMgr ){
        var tags = CQ_Analytics.TagCloudMgr.getTags();
        tags = tags || {};
        var selectedTeasersWeight =  -1;
        for(var i = 0;i < teasers.length; i++) {
            var currentTeaserWeight = 0;
            var teaserTags = teasers[i].tags;
            if( teaserTags ) {
                for(var j = 0;j<teaserTags.length; j++) {
                    var tagID = teaserTags[j].tagID;
                    currentTeaserWeight += parseInt(tags[tagID]) || 0;
                }
            }

            if( currentTeaserWeight == selectedTeasersWeight) {
                selectedTeasers.push(teasers[i]);
            } else {
                if( currentTeaserWeight > selectedTeasersWeight) {
                    //new max weight, clear list, add current teaser and change max weight
                    selectedTeasers = [];
                    selectedTeasers.push(teasers[i]);
                    selectedTeasersWeight = currentTeaserWeight;
                }
            }
        }
    } else {
        //fallback: random
        selectedTeasers = teasers;
    }

    if( selectedTeasers.length == 1) {
        return selectedTeasers[0];
    }

    //at this point 2 cases:
    // - no tagcloud manager, selected teasers are all resolved teasers
    // - can have several teasers with same max weight

    // ==> random choose
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }
    var ranNum = Math.floor(random*selectedTeasers.length);
    return selectedTeasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects the first teaser
CQ_Analytics.StrategyMgr.register("first", function(teasers) {
    return teasers[0];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which random selects a teaser
CQ_Analytics.StrategyMgr.register("random", function(teasers) {
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }

    var ranNum = Math.floor(random*teasers.length);
    return teasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ClickstreamcloudUI</code> object is a singleton providing utility methods to
 * display the clickstreamcloud and its session stores.
 */
if(!CQ_Analytics.ClickstreamcloudUI) {
    CQ_Analytics.ClickstreamcloudUI = function() {
        this.SHOW_BOX_COOKIE = "show-clickstreamcloud";
        this.BOX_ID = "clickstreamcloud";

        this.box = null;
        this.top = null;
        this.sections = null;
        this.bottom = null;

        this.nbSection = 0;

        this.isRendered = false;
    };

    CQ_Analytics.ClickstreamcloudUI.prototype = new CQ_Analytics.Observable();

    /**
     * Creates the clickstreamcloud box and appends it to a DOM element.
     * @param {Element} parent Box will be appended to the given DOM element.
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.createBox = function(parent) {
        var currentObj = this;
        this.box = document.createElement("div");
        this.box.id = this.BOX_ID;
        this.box.style.display = "none";

        var div = document.createElement("div");
        this.box.appendChild(div);


        this.top = document.createElement("div");
        this.top.className = "ccl-header ccl-header-close";

        this.addListener("close",function() {
            currentObj.onVisibilityChange();
        });

        this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink("","#ccl",""));

        this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Close",
                function() {
                    currentObj.box.style.display = "none";
                    currentObj.fireEvent("close");
                },
        { "className": "ccl-close" },"#ccl"));

        if( this.hideLoadLink === false) {
            this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Load",
                function() {
                    currentObj.fireEvent("loadclick");
                },
        { "className": "ccl-load" },"#ccl"));
        }

        if( this.hideEditLink === false) {
            this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Edit",
                function() {
                    currentObj.fireEvent("editclick");
                },
        { "className": "ccl-edit" },"#ccl"));
        }

        div.appendChild(this.top);

        this.sections = document.createElement("div");
        div.appendChild(this.sections);

        this.bottom = document.createElement("div");
        this.bottom.className = "ccl-spacer";
        div.appendChild(this.bottom);

        var border = RUZEE.ShadedBorder.create({ corner:10, border:2, shadow:21 });
        border.render(div);

        parent.appendChild(this.box);
        //#28337 - IE8: Clickstream Cloud unreadable
        // size in ie is 0px until visible: register and calc on show  
        if (div.onresize) {
            this.addListener("show",div.onresize, div);
        }
    };

    /**
     * Initializes the clickstreamcloud UI with the given config.
     * @param {Object} config Config object. Expected configs are: <ul>
     * <li>target: DOM element ID where the ClickstreamcloudUI will be inserted.</li>
     * <li>version: CQ_Analytics.ClickstreamcloudUI.VERSION_FULL or CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT (defaults to FULL).</li>
     * <li>hideEditLink: false to hide the edit link.</li>
     * <li>hideLoadLink: false to hide the load link.</li>
     * </ul>
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.init = function(config) {
        config = config || {};

        this.parentId = config.target;
        var parent = document.getElementById(this.parentId);
        if( parent ) {
            this.version = config.version || CQ_Analytics.ClickstreamcloudUI.VERSION_FULL;
            this.hideEditLink = config.hideEditLink !== false;
            this.hideLoadLink = config.hideLoadLink !== false;
            this.disableKeyShortcut = config.disableKeyShortcut !== false;

            if (CQ_Analytics.Cookie.read(this.SHOW_BOX_COOKIE) == "true") {
                this.show();
            }

            if( !this.disableKeyShortcut) {
                var currentObj = this;
                CQ_Analytics.Utils.registerDocumentEventHandler("onkeydown", CQ_Analytics.Utils.eventWrapper(function(event, keyCode) {
                    if (event.ctrlKey && event.altKey && keyCode == "C".charCodeAt(0)) { // 84
                        currentObj.toggle();
                    }
                }));
            }
        }
    };

    /**
     * Handles the visibility change event.
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.onVisibilityChange = function() {
        CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE, this.isVisible() ? "true" : "false", 365 /* days */);
    };

    /**
     * Returns if ClickstreamcloudUI is visible.
     * @return {Boolean} true if visible, false otherwise.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.isVisible = function() {
        return (this.box != null && this.box.style.display != "none");
    };

    /**
     * Toggles the visibility.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.toggle = function() {
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    };

    /**
     * Registers a session store. Properties of the store will be displayed in a dedicated section.
     * @param {CQ_Analytics.SessionStore} sessionStore The session store.
     * @param {Object} config Config object. Expected configs are: <ul>
     * <li>title: section title.</li>
     * <li>mode: one of the following UI mode: CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD, CQ_Analytics.ClickstreamcloudUI.MODE_LINK
     * or CQ_Analytics.ClickstreamcloudUI.MODE_STATIC (default).</li>
     * </ul>
     * @param {Function} renderer (Optional) Customer section renderer.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.register = function(sessionStore, config, renderer) {
        var func = function() {
            var section = new CQ_Analytics.ClickstreamcloudUI.Section(sessionStore, this.version, config || {} , renderer);
            this.addSection(section);
            sessionStore.addListener("update", section.reset, section);
        };
        if( this.isRendered ) {
            func.call(this);
        } else {
            this.addListener("render",func,this);
        }
    };

    /**
     * Adds the given section to the UI.
     * @param {Section} section Section to add
     * @param {Number} position Position number in the section list..
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.addSection = function(section, position) {
        if (position < this.nbSection && this.nbSection > 0) {
            //insert
            var i = this.nbSection;
            var n = this.sections.lastChild;
            while (i > position + 1) {
                i--;
                n = n.previousSibling;
            }
            this.sections.insertBefore(section.get(), n);
        } else {
            //to the end
            this.sections.appendChild(section.get());
        }
        this.nbSection++;
    };

    /**
     * Removes the given section from the UI.
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.removeSection = function(section) {
        this.sections.removeChild(section);
        this.nbSection--;
    };

    /**
     * Shows the ClickstreamcloudUI box.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.show = function() {
        if( !this.isRendered) {
            var parent = document.getElementById(this.parentId);
            if( parent ) {
                this.createBox(parent);
                this.isRendered = true;
                this.fireEvent("render");
            }
        }
        this.box.style.display = "block";
        this.onVisibilityChange();
        this.fireEvent("show");
    };

    /**
     * Hdes the ClickstreamcloudUI box.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.hide = function() {
        if ( this.box != null ) {
            this.box.style.display = "none";
        }
        this.onVisibilityChange();
    };

    /**
     * @cfg {String} MODE_TEXTFIELD
     * Textfield display mode: property value is displayed with pattern: property = value.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.MODE_TEXTFIELD = "textfield";

    /**
     * @cfg {String} MODE_TEXTFIELD
     * Link display mode: property value is displayed as a link.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.MODE_LINK = "link";

    /**
     * @cfg {String} MODE_STATIC
     * Static display mode: only property value is displayed as a simple text.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.MODE_STATIC = "static";

    /**
     * @cfg {String} VERSION_FULL
     * Full version display mode: displays a complete UI, session store properties/values are both shown.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_FULL = "full";

    /**
     * @cfg {String} VERSION_LIGHT
     * Light version display mode: displays a light UI, only session store values are shown.
     */

    CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_LIGHT = "light";

    /**
     * A section is a UI container of a session store. It contains HTML rendering of the properties/values of the store.
     * @param {CQ_Analytics.SessionStore} sessionStore The session store.
     * @param {String} version CQ_Analytics.ClickstreamcloudUI.VERSION_FULL or CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT
     * @param {Object} config Config object. Expected configs are: <ul>
     * <li>title: section title.</li>
     * <li>mode: one of the following UI mode: CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD , CQ_Analytics.ClickstreamcloudUI.MODE_LINK
     * or CQ_Analytics.ClickstreamcloudUI.MODE_STATIC (defaults to CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD).</li>
     * </ul>
     * @param {Function} renderer (Optional) Customer section renderer.
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section = function(sessionStore, version, config, renderer) {
        this.contentbox = null;
        this.section = null;
        this.sessionStore = sessionStore;
        this.version = version;
        this.title = config.title;
        this.mode = config.mode || CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD;
        this.renderer = renderer;

        this.buildContentBox = function() {
            if (this.renderer) {
                this.contentbox = this.renderer.call(this.sessionStore);
            } else {
                this.contentbox = document.createElement("p");
                this.contentbox.className = "ccl-sectioncontent";

                var storeConfig = CQ_Analytics.CCM.getStoreConfig(this.sessionStore.getName());
                var names = this.sessionStore.getPropertyNames(storeConfig["invisible"]);
                var data = this.sessionStore.getData();
                if (this.version == CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT) {
                    //in light version, display only the filter values (as a single entry)

                    var filteredValues = new Array();
                    var filteredNames = new Array();
                    for (var i = 0; i < names.length; i++) {
                        var name = names[i];
                        var storeValue = this.sessionStore.getProperty(name);
                        //segment case, no value.
                        if( storeValue == name) {
                            filteredValues.push(name);
                            filteredNames.push(name);
                        } else {
                            var v = CQ.shared.XSS.getXSSTablePropertyValue(data, name);
                            if (CQ_Analytics.Utils.indexOf(filteredValues, v) == -1) {
                                filteredValues.push(v);
                                name = CQ.shared.XSS.KEY_REGEXP.test(name) ? name.substring(0, name.length - 4) : name;
                                filteredNames.push(name);
                            }
                        }
                    }

                    for (var i = 0, currentNb = 0; i < filteredValues.length; i++) {
                        var name = filteredNames[i];
                        var value = filteredValues[i];
                        if (this.mode == CQ_Analytics.ClickstreamcloudUI.MODE_LINK) {
                             var link = CQ_Analytics.Utils.externalize(this.sessionStore.getLink(name),true);
                            this.addLink(this.sessionStore.getLabel(name), link, "ccl-data-light", name);
                        } else {
                            this.addStaticText(value, "ccl-data-light", name);
                        }
                        currentNb++;
                        if (currentNb > 3) {
                            currentNb = 0;
                            this.addLineBreak();
                        }
                    }

                } else {
                    for (var i = 0; i < names.length; i++) {
                        var name = names[i];
                        var v = CQ.shared.XSS.getXSSTablePropertyValue(data, name);
                        name = CQ.shared.XSS.KEY_REGEXP.test(name) ? name.substring(0, name.length - 4) : name;
                        if (this.mode == CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD) {
                            this.addNameValueField(this.sessionStore.getLabel(name), v, name, "ccl-data", name);
                        } else {
                            if (this.mode == CQ_Analytics.ClickstreamcloudUI.MODE_LINK) {
                                var link = CQ_Analytics.Utils.externalize(this.sessionStore.getLink(name),true);
                                this.addLink(this.sessionStore.getLabel(name), link, "ccl-data", name);
                            } else {
                                this.addStaticText(this.sessionStore.getLabel(name), "ccl-data", name);
                            }
                        }
                        // for proper wrapping in IE
                        this.contentbox.appendChild(document.createTextNode(" "));
                    }
                }
            }
        };

        this.buildSection = function() {
            if (this.contentbox == null) {
                this.buildContentBox();
            }

            if (this.section == null) {
                this.section = document.createElement("div");
            }

            var header = document.createElement("div");
            header.className = "ccl-header";
            this.section.appendChild(header);

            var titleDiv = document.createElement("div");
            titleDiv.innerHTML = this.title;
            titleDiv.className = "ccl-title";
            header.appendChild(titleDiv);

            this.section.appendChild(this.contentbox);
        };
    };

    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype = new CQ_Analytics.Observable();

    /**
     * Returns the rendered section.
     * @return {Element} The DOM element
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.get = function() {
        if (this.section == null) {
            this.buildSection();
        }
        return this.section;
    };

    /**
     * Resets the section, i.e. rebuilds section based on the current session store state.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.reset = function() {
        if( !this.isReseting) {
            this.isReseting = true;
            if (this.section != null) {
                while (this.section.hasChildNodes()) {
                    this.section.removeChild(this.section.firstChild);
                }
                this.contentbox = null;
            }
            this.buildSection();
            this.isReseting = false;
        }
    };

    /**
     * Adds a name/value field to the section.
     * @param {String} label Field label.
     * @param {String} value Value.
     * @param {String} name Field label.
     * @param {String} cssClass CSS class added to the DOM element.
     * @param {String} title Element title
     * @private
     */
    //TODO fix wrong parameters: label is not used ?!
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addNameValueField = function(label, value, name, cssClass, title) {
        this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createNameValue(name, value, cssClass, title));
    };

    /**
     * Adds a link field to the section.
     * @param {String} text Link label.
     * @param {String} link Link HREF.
     * @param {String} cssClass CSS class added to the DOM element.
     * @param {String} title Element title
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLink = function(text, link, cssClass, title) {
        if (link) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            span.title = title;
            span.alt = title;
            span.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink(text, link, title));
            this.contentbox.appendChild(span);
        } else {
            this.addStaticText(text);
        }
    };

    /**
     * Adds a text to the section.
     * @param {String} text Text.
     * @param {String} cssClass CSS class added to the DOM element.
     * @param {String} title Element title
     * @private
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addStaticText = function(text, cssClass, title) {
        if (text) {
            this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createText(text, cssClass, title));
        }
    };

    /**
     * Adds a line break to the section.
     */
    CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLineBreak = function() {
        this.contentbox.appendChild(document.createElement("br"));
    };

    CQ_Analytics.ClickstreamcloudUI = new CQ_Analytics.ClickstreamcloudUI();

    CQ_Analytics.CCM.addListener("configloaded",function() {
        CQ_Analytics.ClickstreamcloudUI.init(CQ_Analytics.CCM.getConfig()["ui"]);
    });
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.PageDataMgr</code> object is a store providing page data information.
 */
if (!CQ_Analytics.PageDataMgr) {
    CQ_Analytics.PageDataMgr = function() {};

    CQ_Analytics.PageDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.PageDataMgr.prototype.STORENAME = "pagedata";

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.PageDataMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.fireEvent("update");
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.PageDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    /**
     * {@inheritDoc}
     */
    CQ_Analytics.PageDataMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.PageDataMgr = new CQ_Analytics.PageDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
        this.init();

        //add to std clickstream cloud ui
        CQ_Analytics.ClickstreamcloudUI.register(
                this.getSessionStore(),
                CQ_Analytics.CCM.getUIConfig(this.getName()));

        //registers Page Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);

    }, CQ_Analytics.PageDataMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
if( CQ_Analytics.SegmentMgr && !CQ_Analytics.SegmentMgr.isResolvedRegistered) {
    CQ_Analytics.SegmentMgr.isResolvedRegistered = true;

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //add to std clickstream cloud ui
        CQ_Analytics.ClickstreamcloudUI.register(
                this.getSessionStore(),
                CQ_Analytics.CCM.getUIConfig(this.getName()));


    }, CQ_Analytics.SegmentMgr);
}
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * The <code>CQ_Analytics.PageDataMgr</code> object is a store providing page data information.
 */
if (!window.CQ_Context) {
    window.CQ_Context = function() {};
    window.CQ_Context.prototype = new CQ_Analytics.Observable();

    window.CQ_Context.prototype.getProfile = function() {
        return (function() {
            return {
                getUserId: function() {
                    return this.getProperty("authorizableId");
                },

                getDisplayName: function() {
                    var fn = this.getProperty("formattedName");
                    if( fn ) return fn;

                    fn = this.getProperty("displayName");
                    if( fn ) return fn;

                    //fallback
                    return this.getUserId();
                },

                getFirstname: function() {
                    return this.getProperty("givenName");
                },

                getLastname: function() {
                    return this.getProperty("familyName");
                },

                getEmail: function() {
                    return this.getProperty("email");
                },

                getProperty: function(name) {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getProperty(name);
                    }
                    return "";
                },

                getProperties: function() {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getData();
                    }
                    return {};
                },

                getAvatar: function() {
                    return this.getProperty("avatar");
                },

                onUpdate: function(fct, scope) {
                    if (fct && CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        CQ_Analytics.ProfileDataMgr.addListener("update",fct,scope || this);
                    }
                }
            }
        })();
    };

    window.CQ_Context = new window.CQ_Context();
}

