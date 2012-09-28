$(function() {
	/*ADA Changes starts */
 	function remAsterisk($curVal) {
		if($curVal.find(".invalid_tt").length > 0) {
		       var $idValue=$curVal.find("input:text, input:password, select").attr("id");
		       $("label[for="+$idValue+"]").find("*").css("visibility","hidden");
		 }
	}
	$("div").find("#fname").each(function (i) {
			var $curVal=$(this);
     		remAsterisk($curVal);
	});	
	$("p").each(function (i) {
     		var $curVal=$(this);
     		remAsterisk($curVal);
	});	
	$( 'div.navtab' ).find( 'a' ).click( function( event ){
		event.preventDefault();
		changeTab();
	});

	/*ADA Changes ends */
    handleCookies();
    var $nav = $("#navigation"),
    $nA = $("#navigation").find("a"),
    $cp = $("#cartpop"),
    $sb = $("#searchbox"),
    $leftNav = $("div.leftnav"),
    $leftNavMoreButtons = $leftNav.find("li.more"),
    didPlacehold = false,
    sVal = "Search by Keyword or Web ID",
    rExp = /[^a-zA-Z 0-9 \'\.\-]+/g,
    $spf = $("#shopping_cart_form"),
    mobile = getCookie("mobile");
    
    if ($sb.val() === sVal) {
        $sb.placehold({placeholdValue:sVal});
        didPlacehold = true;
    }
    $sb.blur(function() {
        if (!didPlacehold && $sb.val() === sVal) {
            $sb.placehold({placeholdValue:sVal});
            didPlacehold = true;
        }
    });
    if ($.browser.name === "safari" && $.browser.version < 4) {
        $sb.siblings("button").css({"margin-top":"2px"});
    }
    $("#search-bar").find("form").submit(function() {
        var v = $.trim($sb.val().replace(rExp, ""));
        $sb.val(v);
        return v != sVal && v.length;
    });
    var input = $("div.checkbox_sufsa").find("input:checkbox");
    var signInName = getCookie("VisitorUsaFullName");
    if ((signInName === null || signInName.length <= 0) && input.attr("checked") != "checked") {
        input.attr("checked", "checked");
    }
    $cp.css({display:"none",visibility:"visible"}).slideUp(0, function() {
        $cp.slideDown("slow");
    });
    if ($spf.length) {
        $spf.find("input:checkbox").click(function() {
            $spf.submit();
        });
        $("td.prod-actions").find("li:eq(1)").find("a").removeAttr("onclick").click(function(e) {
            e.preventDefault();
            $(this).parents("td").siblings("th.do-not-display").find("input[id^=remove_]").val("true").parent().siblings("td.prod-quantity").find("input:image").click();
        });
    }
    
    if (!navigator.cookieEnabled) {
        var $cdiv = $('<div id="noCookieDiv"></div>').addClass("error").append("<p>Cookies are required to make a purchase on Kohls.com.</p>").append('<p class="message_description">To learn how to enable cookies in your browser, <a href="/kohlsStore/ourbrands/cookiesrequired.jsp">read this.</a></p>').hide();
        $cdiv.insertAfter("#header").fadeIn();
    }
    var $id = {doc:$(document)};
    $id.breadcrumb = $id.doc.find("div.breadcrumb");
    if ($.browser.msie && $.browser.version === 6 && $id.doc.find("div.searchframe").length > 0 && $id.doc.find("div.searchbar").length > 0) {
        $("#frame").css({overflow:"auto"});
    }
    $("#est-ship").parent().remove();
    $("#shopping-bag-link").find("span").text("Shopping Bag");
    $id.group = $("div.group");
    if ($id.group.length > 0) {
        $id.group.eq(1).append($id.group.eq(2).find("a"));
        $id.group.eq(2).remove();
        $id.group.each(function() {
            $(this).find("a").slice(-1).css({"background-image":"none"});
        });
        $id.group.find("a").eq(0).addClass("email-alerts");
    }
    $("#wrapperhp").css({padding:"8px 0 18px 50px",width:"935px"});
    $nA.last().addClass("last");
    if ($.browser.msie && $.browser.version === 6) {
        var selects = $("select");
        $nav.find("li.nav-list-item").hover(function() {
            selects.addClass("select-hidden");
        }, function() {
            selects.removeClass("select-hidden");
        });
    }
    $nav.children("ul").removeClass("no-js").find("li.nav-list-item").hoverIntent({over:function() {
        $(this).addClass("hover");
    },out:function() {
        $(this).removeClass("hover");
    },interval:75,sensitivity:40});
    $leftNavMoreButtons.click(function() {
        var $moreButton = $(this);
        $leftNavMoreButtons.filter("li.lnav-hidden").removeClass("lnav-hidden").nextAll().addClass("lnav-hidden");
        $moreButton.siblings("li.lnav-hidden").removeClass("lnav-hidden");
        $moreButton.addClass("lnav-hidden");
        return false;
    });
    
    if(mobile.indexOf("0") === 0 || mobile.indexOf("1") === 1){
    	displayMobileFooter();
    }

	/* New JS MB - add to Javascript function file and link, remember to include link to jquery library */
  $('#showme').hide();
		$("#ya-expnd-feat").click(function() {
		$('#showme').fadeToggle('slow', updateLinkText);
			function updateLinkText(){
 				var $link = $("#ya-expnd-feat");
				$(this).is(":visible") ? $link.text("Featured [-]") : $link.text("Featured [+]");
				// TODO : Add info for changing Featured link text in the Transition document.  Req. publish.
			}
		 return false;
		});

});
function displayMobileFooter(){
	var curTemplate = $("meta[name='currentTemplate']").attr("content"),
	switchLink = (location.search.length > 0) ? "&viewsitemode=" : "?viewsitemode=",
	_id = {
	    viewstate: $('<div id="view-state" />').html("<p />"),
	    bottomnav: $("div.bottomnav"),
	    lowernav: $("div.lowernav")
     };
	if(typeof(curTemplate) !== "undefined"){
		if (curTemplate.indexOf("/homepage.jsp") > -1 || curTemplate.indexOf("webstore/home.jsp") > -1) {
	       _id.viewstate.css({
	           "border-bottom": "1px solid #f2f2f2",
	           "line-height": "28px",
	           margin: "0 0 5px",
	           width: "auto",
	           height: "28px"
	       }).find("p").html('View Kohl\'s in: Standard | <a href="' + location.href + switchLink + 'mobile">Mobile</a>');
	       _id.lowernav.find("div.hp_disclaim").before(_id.viewstate);
	   } else {
	       _id.viewstate.css({
	           "border-bottom": "1px solid #f2f2f2",
	           "border-top": "1px solid #f2f2f2",
	           clear: "both",
	           display: "block",
	           "line-height": "12px",
	           margin: "0 0 5px",
	           "text-align": "center",
	           width: "auto",
	           height: "28px"
	       }).find("p").html('View Kohl\'s in: Standard | <a href="' + location.href + switchLink + 'mobile">Mobile</a>');
	       _id.bottomnav.find("div.disclaimer").css({
	           "line-height": "28px",
	           margin: "0 0 5px",
	           "text-align": "center"
	       }).before(_id.viewstate);
	   }
	}
	if(/product_page\.jsp$|product_page_multiple\.jsp$/.test(location.href)){
     	updateSwitchLink();
     }
	// clear the session cookie to allow cart to properly reload when switching views
	$("#view-state").find("a").bind("click",function(){
       	var hasCart = getCookie("kohls_cart") !== "",
       	sessionCookie = "JSESSIONID";
       	if(hasCart){
       		document.cookie = sessionCookie + '=;path=/; expires=Thu, 01-Jan-70 00:00:01 GMT;';
       	}
    });
}

function updateSwitchLink(){
   	var metaUrl = $("meta[property='og:url']").attr("content"),
   	switchLink = $("#view-state").find("a"),
   	rebuiltUrl = switchLink.attr("href");
   	
   	// found the facebook url so use that
   	if(typeof(metaUrl) !== "undefined" && metaUrl.indexOf("PRODUCT<>prd_id") > -1){
   		var metaAnchor = document.createElement('a');
		metaAnchor.href = metaUrl;
   		rebuiltUrl = metaAnchor.protocol + "//" + metaAnchor.host + metaAnchor.pathname + metaAnchor.search + "&viewsitemode=mobile";
   	}else{
   		// build url manually
   		var search = location.search.length > 0 ? location.search + "&" : "?",
   		productMeta = $("meta[name='product-path']").attr("content").split("/"),
   		product = productMeta[productMeta.length - 1],
   		productName = $("meta[name='title']").attr("content").replace(/\s/g,"+").replace(/\./g,"").replace(/-/g,""),
   		productPath = "/kohlsStore/PRD~" + product + "/" + productName + ".jsp";
   		
   		rebuiltUrl = location.protocol + "//" + location.host + productPath + search + "viewsitemode=mobile";
   	}
   	
   	switchLink.attr("href", rebuiltUrl);
   }

if ($.browser.msie && /^6/.test($.browser.version)) {
    jQuery(window).bind("load", function() {
        $.ifixpng("/media/images/StaticContent/global/pixel.gif");
        $("span,h1,h2,h3,h4,h5,h6,img,div.notification p").not("#shopping-bag-link span").ifixpng();
    });
}
function handleCookies() {
    var name = getCookie("VisitorUsaFullName");
    if (name.length > 0) {
        var $p = $("#persistant-nav"),$s = $("#sign-in-link"),$a = $s.find("a");
        $a.attr("href", "/upgrade/myaccount/kohls_logout.jsp").text("Sign Out");
        $s.text(name).append($a);
        $p.find("li:eq(1)").find("a").attr("href", "/upgrade/myaccount/my_account_landing.jsp");
    }
    var totalsCookie = getCookie("VisitorBagTotals");
    if (totalsCookie.length > 0) {
        var cartData = totalsCookie.split("|");
        $("#cart-total,#mini-cart-total").text(cartData[0]);
        $("#num-items,#mini-num-items").text(cartData[1]);
    }
}
function getCookie(n) {
    if (document.cookie.length > 0) {
        var s = document.cookie.indexOf(n + "=");
        if (s !== -1) {
            s = s + n.length + 1;
            var e = document.cookie.indexOf(";", s);
            if (e === -1) {
                e = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(s, e));
        }
    }
    return"";
}
function hideElement(elementId) {
    $("#" + elementId).slideUp();
}
(function($) {
    $.fn.hoverIntent = function(f, g) {
        var cfg = {sensitivity:7,interval:100,timeout:0};
        cfg = $.extend(cfg, g ? {over:f,out:g} : f);
        var cX,cY,pX,pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev]);
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob);
                }, cfg.interval);
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev]);
        };
        var handleHover = function(e) {
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            }
            if (e.type === "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob);
                    }, cfg.interval);
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s === 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob);
                    }, cfg.timeout);
                }
            }
        };
        return this.bind("mouseenter", handleHover).bind("mouseleave", handleHover);
    };
})(jQuery);
