/**
 * Shamefully stolen from an answer on Stack Overflow.
 *
 * @see http://stackoverflow.com/questions/209043/browser-version-in-prototype-library
 * @author samuel
 */

(function (p) {
    if (p.Browser.IE) {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            Prototype.BrowserFeatures.Version = new Number(RegExp.$1);
        }
    }
})(Prototype);