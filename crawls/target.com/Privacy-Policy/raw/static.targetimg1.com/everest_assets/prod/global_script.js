/* js file */

//Reset the Target.globals for the Third Party Global Nav to static js file on Akamai.

 if ((Target.globals.AjaxGlobalNavPath == "http://www.target.com/AjaxGlobalNavView?isThirdParty=false") && document.domain == "weeklyad.target.com") {
    Target.globals.AjaxGlobalNavPath = "http://static.targetimg1.com/globalnav/prod/AjaxGlobalNavViewFullPaths.js";
    
}
 if ((Target.globals.AjaxGlobalNavPath == "https://www.target.com/AjaxGlobalNavView?isThirdParty=false") && document.domain == "weeklyad.target.com") {
    Target.globals.AjaxGlobalNavPath = "https://static.targetimg1.com/globalnav/prod/AjaxGlobalNavViewFullPaths.js";
    
}
 if (Target.globals.AjaxGlobalNavPath == "http://www.target.com/AjaxGlobalNavView?isThirdParty=true") {
    Target.globals.AjaxGlobalNavPath = "http://static.targetimg1.com/globalnav/prod/AjaxGlobalNavViewFullPaths.js";
    
}
if (Target.globals.AjaxGlobalNavPath == "https://www.target.com/AjaxGlobalNavView?isThirdParty=true") {
    Target.globals.AjaxGlobalNavPath = "https://static.targetimg1.com/globalnav/prod/AjaxGlobalNavViewFullPaths.js";
    
}
$(document).ready(function() {
    
    //$("#MainMenu .home-link a").attr("href", "/");
    
    //setTimeout(function(){$("#MainMenu .home-link a").attr("href", "/")});
     try {
        var noJS = $(document).find("div.no-js"),
        sessCookie = Target.controller.header.cookie.read('s_sess');
         if ((noJS != null || noJS != "") && sessCookie != null) {
            $("div.no-js").hide();
            $("#overlay-curtain").hide();
            
        }
    }
    catch (e) {}
    
    var domain = document.domain,
    timeOut = {
        "coupons": 4000,
        "weeklyad": 5000,
        "fallingforyou": 6000,
        "lenmar": 6000,
        "prefs": 7000
    },
    current;
     for (i in timeOut) {
         if (domain.search(i) != -1) {
            current = i
        }
    }
    (current != null) && domainRedirect(current);
    function domainRedirect(cur) {
        $("body").delegate("#mini-cart-icon", "mouseover", function() {
            var t = setTimeout(function() {
                $("body").find(".link").delegate("a", "click", function(e) {
                    e.preventDefault();
                    var self = $(this),
                    href = self.attr("href");
                     if ($.browser.msie && $.browser.version == "7.0") {
                         if (cur != "lenmar") {
                            href = href.split(".target.com");
                            
                        }
                        else {
                            href = href.split(".lenmar.com");
                        }
                        href = href[1];
                        
                    }
                    if (href.search(".target.com") == -1) {
                        newLocation = window.location.protocol + "//" + Target.globals.hostName + href;
                        
                    }
                    else {
                        newLocation = href;
                        
                    }
                    window.location = newLocation;
                    self.attr("href", newLocation);
                    
                });
                
            },
            timeOut[current]);
            
        });
        
        $("body").delegate("#ShopMenu .hover a", "click", function(e) {
            e.preventDefault();
            var self = $(this),
            href = self.attr("href");
             if (href.search(".target.com") == -1)
                newLocation = window.location.protocol + "//" + Target.globals.hostName + href;
             else
                newLocation = href;
             if (self.attr("class") == "grdaLink") {
                self.ajaxComplete(function(event, request, settings) {
                    window.location.href = newLocation;
                    self.attr("href", newLocation);
                    
                });
                
            }
            else {
                window.location.href = newLocation;
                self.attr("href", newLocation);
                
            }
        });
        
    }
    var $body = $('body');
    
    if ($body.hasClass("components-testnewLayout")) {
        
        $body.removeClass("components-testnewLayout");
        $body.addClass("components-test");
        $body.addClass("newLayout");
        
    }
	
    
    if ($('.hp_hz_slots-8').length !== 0 && $.browser.webkit && !Target.support.isTouch) {
        $body.addClass('position-fixed');
        setTimeout(function() {
            $body.removeClass('position-fixed');
            
            //$body.find('a:first').focus();
            
        },
        100);
        
    }
	
	if ($("#ProductDetails .primaryInfo #eyebrow").length > 0){
		$(".breadcrumbsArea #breadcrumbs span").length == 0 ? $(".primaryInfo").removeClass("primaryInfoTopMargin").addClass("breadcumNotAvailable") : $(".primaryInfo").addClass("primaryInfoTopMargin").removeClass("breadcumNotAvailable");
	}else{
		$(".primaryInfo").removeClass("primaryInfoTopMargin breadcumNotAvailable");
	}
    
});

