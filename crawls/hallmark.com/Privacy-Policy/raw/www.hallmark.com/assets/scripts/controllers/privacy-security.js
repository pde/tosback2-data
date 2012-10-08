define("assets/scripts/presenters/SmoothScrolling", [ "jquery", "assets/scripts/events" ], function(e, t) {
    "use strict";
    var n = function() {
        this.$smoothScrollNav = e(".js-linked-nav a"), this.scrollPositionOffset = 16, this.bind();
    };
    return n.prototype.bind = function() {
        var t = this;
        e(this.$smoothScrollNav).on({
            click: function(n) {
                n.preventDefault();
                var r = e(this);
                t.scrollToSection(r);
            }
        });
    }, n.prototype.scrollToSection = function(t) {
        var n = this, r = t.attr("href"), i = e(r).offset();
        i = i.top - n.scrollPositionOffset, e("html,body").animate({
            scrollTop: i
        }, 1e3);
    }, n;
}), require([ "jquery", "assets/scripts/presenters/SmoothScrolling" ], function(e, t) {
    "use strict";
    var n = new t;
}), define("assets/scripts/controllers/privacy-security", [], function() {});