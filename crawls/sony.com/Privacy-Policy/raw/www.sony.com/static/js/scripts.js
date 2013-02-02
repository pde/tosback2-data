//jQuery elipsis plugin http://stackoverflow.com/questions/536814/insert-ellipsis-into-html-tag-if-content-too-wide
(function(e) {
    e.fn.ellipsis = function() {
        return this.each(function() {
            var a = e(this);
            if (a.css("overflow") == "hidden") {
                var c = a.html(),
                    d = a.hasClass("multiline"),
                    b = e(this.cloneNode(true)).hide().css("position", "absolute").css("overflow", "visible").width(d ? a.width() : "auto").height(d ? "auto" : a.height());
                a.after(b);
                for (d = d ?
                function() {
                    return b.height() > a.height()
                } : function() {
                    return b.width() > a.width()
                }; c.length > 0 && d();) {
                    c = c.substr(0, c.length - 1);
                    b.html(c + "[...]")
                }
                a.html(b.html());
                b.remove()
            }
        })
    }
})(jQuery);

//jQuery Cookie plugin https://github.com/carhartl/jquery-cookie#readme
jQuery.cookie = function(d, e, b) {
    if (arguments.length > 1 && String(e) !== "[object Object]") {
        b = jQuery.extend({}, b);
        if (e === null || e === undefined) {
            b.expires = -1
        }
        if (typeof b.expires === "number") {
            var g = b.expires,
                c = b.expires = new Date();
            c.setDate(c.getDate() + g)
        }
        e = String(e);
        return (document.cookie = [encodeURIComponent(d), "=", b.raw ? e : encodeURIComponent(e), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join(""))
    }
    b = e || {};
    var a, f = b.raw ?
    function(h) {
        return h
    } : decodeURIComponent;
    return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(document.cookie)) ? f(a[1]) : null
};


//jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

//alerts
var alerts = (function() {
    var d, b, a;
    return {
        init: function() {
            d = $("#alert");
            b = d.find(".close-btn").children("a");
            a = d.find(".content").attr("id");
            c()
        }
    };

    function c() {
        if ($.cookie(a) != "hide") {
            d.children(".content").removeClass("visually-hidden");
            d.data("origText", d.find(".description").html());
            d.find(".description").ellipsis();
            b.click(function() {
                d.children(".content").animate({
                    opacity: 0
                }, 200, function() {
                    d.children(".content").slideUp("normal", function() {
                        d.removeClass("loaded")
                    })
                });
                $.cookie(a, "hide");
                return false
            });
            d.attr("data-size", controler.size);
            $.cookie(a, "show");
            $(window).resize(function() {
                if (d.attr("data-size") != controler.size) {
                    d.find(".description").html(d.data("origText"));
                    if (controler.size != "s") {
                        d.find(".description").ellipsis()
                    }
                    d.attr("data-size", controler.size)
                }
            })
        }
    }
})();

//nav
var nav = (function(){
    var $menuBtn,
        $nav,
        $navContent,
        $navList,
        $navListItems,
        $allNavListItems,
        $allNavLinks,
        $firstDropdownLists,
        $dropdownList,
        $dropdownListitems,
        $dropdownLinks,
        navTracker = 0,
        navHeight;
    
    /****** public methods ******/
    return{
        init:function(obj){
            $nav = $('nav');
            $menuBtn = $('#menu-btn a');
            nav.btn = $menuBtn;
            
            $menuBtn.click(function() {
                var $this = $(this);

                search.close();
                
                if($this.parent().hasClass("closed")){
                    nav.animateMenu("show");
                }else{
                    nav.animateMenu("hide");
                }
                return false;
            });
            
            buildNav();
        },
        animateMenu:function(showOrHide){
            if(showOrHide == 'show'){
                $menuBtn.parent().removeClass('closed').addClass('open');
                
                $navContent.css({'left': 0});
                
            }else if(showOrHide == 'hide'){
                $menuBtn.parent().removeClass('open').addClass('closed');
                $navContent.css({'left': 480});
                navTracker = 0;
            }
        }
    }
    /****** private methods ******/
    function buildNav(){
        $nav.find('.sub').each(function(){
            $(this).children('ul').prepend('<li class="title"><a href="#"><span>'+$(this).children('a').children('span').text()+'</span></a></li>');
        });
        
        $navContent = $nav.children('.content'),
        $navList = $navContent.children('ul');
        $navListItems = $navList.children('li');
        $allNavListItems = $navList.find('li');
        $allNavLinks = $navListItems.find('a');
        $firstDropdownLists = $navListItems.children('li');
        $dropdownList = $navListItems.find('ul');
        $dropdownListItems = $navListItems.find('li');
        $dropdownLinks = $dropdownList.find('a');
        navHeight = $navList.height();

        $navList.addClass('current');
        
        $allNavListItems.hover(
            function(){
                if(controler.size != 's'){
                    //alert('add Hover');
                    $(this).addClass('hover');
                    //adjustDropdown($(this).children('ul'));
                }
            },
            function(){
                if(controler.size != 's'){
                    //alert('remove hover');
                    $(this).removeClass('hover');
                    //adjustDropdown($(this).children('ul'));
                }
        });
        
        //add active class to links when clicked
        $allNavLinks.click(function(){
            var $this = $(this),
                $parent = $this.parent();
                
            //if ther is a sub menu
            if($parent.hasClass('sub')){
                //if it is small view
                if(controler.size == 's'){
                    //label next level and make it visible
                    //$this.next("ul").addClass("next-nav").css("display", "block");
                    slideNav('forward');
                    $parent.addClass('current');
                //if it is not small view
                }else{
                    if($parent.hasClass('top') && $this.hasClass('clicked')){
                        //alert('deActivateDropdowns');
                        deActivateDropdowns();
                    }else{
                        //alert('activateDropdown');
                        activateDropdown($this);
                    }
                }
                return false;
                
            }else if($parent.hasClass('title') == true){
                $this.html('title');
                slideNav("back");
                $parent.parent().parent().addClass('previous');
                return false;
            }
                
            
        });
        
        $(window).resize(function(){
            resize();
        });
        
        if(controler.size == 's'){
            resize();
        }
        
    };
    
    function resize(){
        if(controler.size == 's'){
            var newWidth;
            if(controler.windowWidth > 480){
                newWidth = 480;
            }else{
                newWidth = controler.windowWidth;
            }
            $navList.width(newWidth);
            $dropdownList.width(newWidth).css('left', newWidth);
            if($menuBtn.parent().hasClass('open')){
                $navContent.css('left', -(navTracker*newWidth));
            }
            $navContent.addClass('mobile');
        }else{
            if($navContent.hasClass('mobile')){
                //close the mobile menu if it is showing
                $menuBtn.parent().removeClass('open').addClass('closed');
                $navContent.find('.current').removeClass('current');
                $navContent.attr('style','').removeAttr('style');
                $navList.attr('style','').removeAttr('style');
                $dropdownList.attr('style','').removeAttr('style');
            }
            
        }
    };

    function slideNav(direction){
        var contentWidth,
            navMargin = $navContent.css('left');
        
        navMargin = parseInt(navMargin.replace('px',''));
        
        if(controler.windowWidth > 480){
            contentWidth = 480;
        }else{
            contentWidth = controler.windowWidth;
        }
         
        if(direction == 'forward'){         
            navTracker++;
            
            $navContent.stop().animate({
                'left': navMargin - contentWidth
            }, 300, function(){
                
            });
        }else if(direction == 'back'){
            navTracker--;
            $navContent.stop().animate({
                'left': navMargin + contentWidth
            }, 300, function(){
                $navContent.find('.previous').removeClass('previous').removeClass('current');
            });
        }
    }
    
    function activateDropdown(link){
        //alert('activateDropdown');
        var $link = $(link),
            $parent = $link.parent(),
            $siblings = $parent.siblings(),
            $activeChildren;
        
        //if the clicked link is active
        if($link.hasClass('clicked')){
            //alert('has been clicked');
            //make it not active
            $parent.removeClass('hover');
            $link.removeClass('clicked');
            //make children not active
            $activeChildren = $parent.find('.hover');
            $clickedChildren = $parent.find('.clicked');
            $activeChildren.removeClass('hover');
            $clickedChildren.removeClass('clicked');
            
        //if the clicked link is not active
        }else{
            //alert('does not have hover');
            //make it active
            $parent.addClass('hover');
            $link.addClass('clicked');
            //remove active states from siblings 
            $siblings.each(function(){
                var $this = $(this);
                if($this.children('a').hasClass('clicked')){
                    $activeChildren = $this.find('.hover');
                    $clickedChildren = $this.find('.clicked');
                    $this.removeClass('hover');
                    $activeChildren.removeClass('hover');
                    $clickedChildren.removeClass('clicked');
                }
            });
            
            //adjustDropdown($parent.children('ul'));
            
        }
    };
    function deActivateDropdowns(){
        //alert('deActivateDropdowns');
        var $active = $navList.find('.hover'),
            $clicked = $navList.find('.clicked');
        
        $active.removeClass('hover');
        $clicked.removeClass('clicked');
        $firstDropdownLists.css('left', -9999);
    };
    
    function adjustDropdown(list){
        var $list = $(list),
            $activeTab = $navList.children('.hover'),
            $otherLists = $navList.children('li:not(.hover)').children('ul'),
            $activeDropdown = $activeTab.children('ul'),
            offset = $list.offset().left + 235,
            windowWidth = $(window).width(),
            currentLeft = parseInt($activeDropdown.css('left').replace('px',''));
        
        $otherLists.css('left', -9999);
        /*
        if(offset > windowWidth){
            $activeDropdown.css('left', currentLeft-(offset - windowWidth));
        }else{
            $activeDropdown.css('left', 'auto');
        }*/
        
    };

})();

//Search
var search = (function() {
    var d, a, c;
    return {
        init: function() {
            d = $("#search-input");
            a = $("#search");
            c = $("#search-button");
            search.btn = c;
            b()
        },
        open: function() {
            c.removeClass("closed").addClass("open");
            a.removeClass("hidden-phone");
            a.addClass("show")
        },
        close: function() {
            c.removeClass("open").addClass("closed");
            a.addClass("hidden-phone");
            a.removeClass("show")
        }
    };

    function b() {
        d.addClass("empty").attr("value", "Search");
        c.children("a").click(function() {
            var f = $(this),
                e = f.parent();
            nav.animateMenu("hide");
            if (c.hasClass("closed")) {
                search.open()
            } else {
                search.close()
            }
            return false
        });
        d.focus(function() {
            if (d.attr("value") == "Search") {
                d.removeClass("empty").attr("value", "")
            }
        });
        d.blur(function() {
            if (d.attr("value") == "") {
                d.addClass("empty").attr("value", "Search")
            }
        })
    }
})();

function sanitize(a) {
    var d = "";
    var c = "";
    for (var b = 0; b < a.length; b++) {
        d = a.charCodeAt(b);
        if (d == 32) {
            c += a[b]
        } else {
            if ((d > 47 && d < 58) || (d > 62 && d < 127)) {
                c += a[b]
            } else {
                c += "&#" + d + ";"
            }
        }
    }
    return c
}
bSearchEntered = false;

function isEmpty(a) {
    if (a == null || a.value.length == 0) {
        return true
    }
}
function errorFormSubmit() {
    sStr = document.forms.error_search_form.error_search_box.value;
    formSubmit(true, sStr, document.forms.error_search_form)
}
function formSubmit(c, e, d) {
    var b = document.forms.formSony.action;
    if (arguments.length == 1) {
        var a = document.forms.formSony.st;
        if (!bSearchEntered || (c && isEmpty(a))) {
            alert("Please enter a search term and then click the GO button.");
            return
        }
        if (!isEmpty(a)) {
            b.value = "search"
        }
        document.forms.formSony.st = document.forms.formSony.st;
        document.forms.formSony.submit()
    } else {
        if (arguments.length == 2) {
            d = document.forms.formSony;
            if (e.length == 0) {
                alert("Please enter a search term and then click the GO button.");
                return
            }
            d.st.value = e;
            d.submit()
        } else {
            d.st.value = e;
            d.submit()
        }
    }
}
function validForm(a) {
    if (a.st.value == "" || a.st.value == "Search" || a.st.value == "search") {
        return false
    }
    return true
}

//Tabs
var tabs = (function() {
    var c, b, h, f, a, i, g;
    return {
        init: function() {
            c = $("#tabs");
            j()
        }
    };

    function j() {
        b = $("#tab-nav");
        h = b.children(".current");
        f = b.children("li");
        b.addClass("length-" + f.length);
        c.children(".content").prepend('<div id="tab-dropdown"><p>Select category</p><div class="select"><select id="tab-select"></select></div></div>');
        g = c.children(".content").children("#tab-dropdown").find("select");
        a = c.children(".content").children("#tab-content");
        f.each(function() {
            var k = $(this).find("a");
            g.append('<option value="' + k.attr("href") + '">' + k.find(".icon").text() + "</option>");
            k.click(function() {
                if (controler.size == "s") {} else {
                    d($(this).parent().parent().parent())
                }
                return false
            })
        });
        g.change(function() {
            var k = $(this).children("option:selected").attr("value");
            f.each(function() {
                if ($(this).find("a").attr("href") == k) {
                    d($(this));
                    return false
                }
            })
        });
        e()
    }
    function e() {
        i = a.children(".content");
        i.each(function() {
            var q = $(this),
                p = q.find(".featured"),
                k, m = p.find(".img"),
                o = m.children("a").attr("href"),
                n;
            if (m.length > 0) {
                if (o.indexOf("youtu.be") >= 0) {
                    m.children("a").append('<span class="play-icon"></span>');
                    m.after('<div class="video"></div>');
                    k = p.find(".video");
                    n = o.replace("http://youtu.be/", "");
                    m.children("a").click(function() {
                        if (controler.size != "s") {
                            m.hide();
                            k.show().html('<iframe  width="390" height="228" src="http://www.youtube.com/embed/' + n + '?&autoplay=1&autohide=1&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>');
                            return false
                        }
                    })
                }
            }
            var r = p.find(".twitter");
            if (r.length > 0) {
                r.append('<div class="twitter-tooltip"></div>');
                var l = p.find(".twitter-tooltip");
                r.children("a").hover(function() {
                    l.show()
                }, function() {
                    l.hide()
                })
            }
        });
        gapi.plusone.go();
        d(f[h.index()])
    }
    function d(k) {
        var m = $(k),
            l = m.find("a").attr("href")
            if(l){l.replace("#", "");}
        i.each(function() {
            var n = $(this);
            if (n.attr("id") == l) {
                n.removeClass("visually-hidden")
            } else {
                n.addClass("visually-hidden");
                n.find(".video").children().remove();
                n.find(".img").show()
            }
        });
        b.children(".current").removeClass("current");
        m.addClass("current");
        g.children("option").each(function() {
            if ($(this).attr("value") == l) {
                $(this).attr("selected", true)
            }
        })
    }
})();

//promos
var promos = (function() {
    var i, g, j, h = false;
    return {
        init: function() {
            i = $("#promos");
            l()
        }
    };

    function l() {
        g = i.find(".promo-item");
        j = i.find("img");
        g.each(function() {
            var a = $(this),
                c = a.find(".description"),
                b = c.children("p");
            b.hide();
            a.children("a").hover(function() {
                b.slideDown(150, "easeOutCubic", function() {})
            }, function() {
                b.slideUp(250, "easeOutCubic", function() {})
            })
        });
        $(window).resize(function() {
            k()
        });
        k()
    }
    function k() {
        var a;
        if (controler.size == "s") {
            if (controler.windowWidth > 480) {
                a = (480 - 60) / 2
            } else {
                a = (controler.windowWidth - 60) / 2
            }
            g.addClass("adjusted").width(a);
            j.addClass("adjusted").css("margin-left", -((220 - a) / 2))
        } else {
            if (controler.size == "m") {
                g.addClass("adjusted").width(170);
                j.addClass("adjusted").css("margin-left", -25)
            } else {
                if (controler.size == "l") {
                    g.addClass("adjusted").width(220);
                    j.addClass("adjusted").css("margin-left", "auto")
                }
            }
        }
    }
})();

//footer
var footer = (function() {
    var f, g, e;
    return {
        init: function() {
            f = $("#footer");
            h()
        }
    };

    function h() {
        e = f.find(".corporate-info");
        g = f.find(".corp-btn").find("a");
        e.hover(function() {
            if (e.hasClass("clicked") == false) {
                e.addClass("hover")
            }
        }, function() {
            if (e.hasClass("clicked") == false) {
                e.removeClass("hover")
            }
        });
        g.click(function() {
            if (e.hasClass("clicked")) {
                e.removeClass("clicked").removeClass("hover")
            } else {
                e.addClass("clicked")
            }
            return false
        })
    }
})();

//iphone screen fix
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
    if (viewportmeta) {
        viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        document.body.addEventListener("gesturestart", function() {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
        }, false)
    }
}
/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function() {
    window.scrollTo(0, 1)
}, 1000);

//Controler
$(document).ready(function() {
    controler.init()
});
var controler = (function() {
    var d, a, b = false;
    return {
        ie6: false,
        size: "s",
        windowWidth: $(window).width(),
        init: function() {
            d = $("body");
            $search = $("#search").find("#search-input");
            if ($("html").hasClass("ie6")) {
                controler.ie6 = true
            }
            $(window).resize(function() {
                c()
            });
            c();
            search.init();
            alerts.init();
            nav.init();
            tabs.init();
            promos.init();
            footer.init()
        }
    };

    function c() {
        controler.windowWidth = $(window).width();
        if (b == false) {
            if (controler.windowWidth < 740) {
                controler.size = "s";
                d.addClass("s").removeClass("m").removeClass("l")
            } else {
                if (controler.windowWidth >= 740 && controler.windowWidth < 960) {
                    controler.size = "m";
                    d.addClass("m").removeClass("s").removeClass("l")
                } else {
                    if (controler.windowWidth >= 960) {
                        controler.size = "l";
                        d.addClass("l").addClass("m").removeClass("s")
                    }
                }
            }
        }
    }
})();

//pinterest
$(document).ready(function() {
    var a = $(".pin-it-button");
    openModal = function(b) {
        window.open(b, "signin", "width=665,height=300")
    };
    a.each(function() {
        var c = $(this),
            b = c.attr("href");
        c.click(function() {
            openModal(b);
            return false
        })
    })
});

//Home Twitter
jQuery(document).ready(function() {

    $('.accordion-toggle').click( function(e){
        $(this).toggleClass('icon-arrow-down');
    });

    var $feed = $("#twitter-feed"),
        twitterContent = "";

    function parseHash(tweet) {
        return tweet.replace(/#([A-Za-z0-9\/\.]*)/g, function(tweet) {
            return '<a target="_new" href="http://twitter.com/search?q=' + tweet.replace("#", "") + '">' + tweet + "</a>"
        })
    }
    function parseLinks(tweet) {
        return tweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(tweet) {
            return tweet.link(tweet)
        })
    }
    function parseAt(tweet) {
        return tweet.replace(/@[\w]+/g, function(tweet) {
            return '<a href="http://www.twitter.com/' + tweet.replace("@", "") + '">' + tweet + "</a>"
        })
    }
    function relative_time(time_value) {
        var values = time_value.split(" ");
        time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
        var parsed_date = Date.parse(time_value);
        var relative_to = arguments.length > 1 ? arguments[1] : new Date;
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1E3);
        delta = delta + relative_to.getTimezoneOffset() * 60;
        var r = "";
        if (delta < 60) r = "a minute ago";
        else if (delta < 120) r = "couple of minutes ago";
        else if (delta < 45 * 60) r = parseInt(delta / 60).toString() + " minutes ago";
        else if (delta < 90 * 60) r = "an hour ago";
        else if (delta < 24 * 60 * 60) r = "" + parseInt(delta / 3600).toString() + " hours ago";
        else if (delta < 48 * 60 * 60) r = "1 day ago";
        else r = parseInt(delta / 86400).toString() + " days ago";
        return r
    }
    function loadTweets() {
        $.ajax({
            url: "http://api.twitter.com/1/lists/statuses.json?slug=sony&owner_screen_name=Sony",
            dataType: "jsonp",
            success: function(data) {
                $(data).each(function(i) {
                    var theTweet = parseHash(parseAt(parseLinks(data[i].text))),
                        img = '<div class="tweet"><div class="img"><a href="https://twitter.com/account/redirect_by_id?id=' + data[i].user.id + '" target="_blank" ><img src="' + data[i].user.profile_image_url + '" /></a></div>',
                        time = '<li class="time">' + relative_time(data[i].created_at) + "</li>",
                        reply = '<li class="reply"><a href="https://twitter.com/intent/tweet?in_reply_to=' + data[i].id_str + '">Reply</a></li>',
                        retweet = '<li class="retweet"><a href="https://twitter.com/intent/retweet?tweet_id=' + data[i].id_str + '">Retweet</a></li>',
                        favorite = '<li class="favorite"><a href="https://twitter.com/intent/favorite?tweet_id=' + data[i].id_str + '">Favorite</a></li>';
                    $feed.find("#twitter-error").remove();
                    twitterContent = twitterContent + img + '<div class="details"><p class="text">' + theTweet + "</p><ul>" + time + reply + retweet + favorite + "</ul></div></div>";
                    if (i == 3) return false
                });
                $feed.append(twitterContent);
                var $tweets = $feed.find(".tweet"),
                    $tweetLinks = $tweets.find("a");
                $tweets.hover(function() {
                    $(this).addClass("hover")
                }, function() {
                    $(this).removeClass("hover")
                });
                $tweetLinks.click(function() {
                    s.prop1 = "news and social";
                    s.prop2 = "social";
                    s.prop13 = "social";
                    s.hier1 = "new and social|social";
                    s.linkTrackVars = "prop1,prop2,prop13,hier1";
                    s.tl(this, "o", "Social")
                })
            },
            error: function(data) {
                var errorText = $feed.find("#twitter-error");
                if (errorText.length < 1) $feed.append('<div id="twitter-error">Twitter is over capacity...</div>');
                setTimeout(function() {
                    loadTweets()
                }, 5E3)
            }
        })
    }
    loadTweets()

});
