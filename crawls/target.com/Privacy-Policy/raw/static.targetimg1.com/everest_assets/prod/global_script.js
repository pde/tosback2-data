/* js file */

//Reset the Target.globals for the Third Party Global Nav to static js file on Akamai.


if((Target.globals.AjaxGlobalNavPath == "http://www.target.com/AjaxGlobalNavView?isThirdParty=false") && document.domain == "weeklyad.target.com"){
	Target.globals.AjaxGlobalNavPath = "http://static.targetimg1.com/globalnav/prod/AjaxGlobalNavViewFullPaths.js";
}

if((Target.globals.AjaxGlobalNavPath == "https://www.target.com/AjaxGlobalNavView?isThirdParty=false") && document.domain == "weeklyad.target.com"){
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
    
    
     if (!Target.support.isTouch) {
        
        var extMenuControls = $.extend(true, Target.controller.header, {
            setMenuControls: function() {
                
                //alert("newly successfully updated");
                
                var timer = null,
                self = this,
                wait = 300,
                hoverSubTime = 50,
                Hovertimer = null,
                hoverTime = 100,
                subItm = null,
                shopMenu = $("#ShopMenu"),
                mainMenu = $("#MainMenu"),
                // Test if a device supports touch events. TODO move this to framework so it can be used like "Target.support.isTouch"
                isTouch = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? true : false,
                currentMenu = false,
                // Function to open a main nav submenu, expects the L1 <li> as context (this)
                openMenu = function() {
                    var leftVal, rightVal;
                    var curMenu = $(this);
                    var leftVal = curMenu.position().left - 78,
                    rightVal = leftVal + curMenu.innerWidth() + 78;
                    
                    if ($(".showMenu").length == 0) {
                        
                        //console.log("this is time out");
                        Hovertimer = setTimeout(function(e) {
                            curMenu.append('<div class="menuLiBase leftBase" style="top:27px;left:' + leftVal + 'px"></div>');
                            curMenu.append('<div class="menuLiBase rightBase" style="top:27px;left:' + rightVal + 'px"></div>');
                            curMenu.addClass("showMenu");
                            
                        },
                        hoverTime);
                        
                    }
                    else {
                        $("#MainMenu").find(".showMenu").removeClass("showMenu");
                        $("#MainMenu").find(".menuLiBase").remove();
                        curMenu.append('<div class="menuLiBase leftBase" style="top:27px;left:' + leftVal + 'px"></div>');
                        curMenu.append('<div class="menuLiBase rightBase" style="top:27px;left:' + rightVal + 'px"></div>');
                        curMenu.addClass("showMenu");
                        
                    }
                    $('li.lastl2 ul').addClass('lastNoBorder');
                    $('.hover div.opnCont').find(':lt(3) ul:last-child').addClass('lastNoBorder');
                    currentMenu = this;
                    
                },
                
                // Function to close man nav submenu, expects the L1 <li> as context (this)
                closeMenu = function() {
                    $(this).removeClass("showMenu");
                    mainMenu.find(".menuLiBase").remove();
                    currentMenu = false;
                    
                };
                
                mainMenu.undelegate("li.leftmenu, li.rightmenu", "mouseover mouseout");
                
                mainMenu.delegate("li.leftmenu, li.rightmenu", "mouseenter", function() {
                    
                    //console.log("mouseover");
                    clearTimeout(timer);
                    
                    //clearTimeout(Hovertimer);
                    openMenu.call(this);
                    
                });
                mainMenu.delegate("li.leftmenu, li.rightmenu", "mouseleave", function() {
                    MenuItem = $(this);
                    
                    //console.log("mouseout");
                    clearTimeout(Hovertimer);
                    timer = setTimeout(function() {
                        MenuItem.removeClass("showMenu");
                        closeMenu.call(this);
                        
                    },
                    wait);
                    
                });
                
                
                //For Mini Cart
                
                shopMenu.delegate("li", "mouseenter", function() {
                    subItm = $(this);
                    timer = setTimeout(function() {
                        subItm.addClass("showSubMenu");
                        
                    },
                    hoverSubTime);
                    
                });
                shopMenu.delegate("li", "mouseleave", function() {
                    subItm = $(this);
                    clearTimeout(timer);
                    subItm.removeClass("showSubMenu");
                    
                });
                
            }
        });
        Target.controller.header.setMenuControls();
        
    }
    //global nav location redirect
	
	var domain = document.domain,
	timeOut = {"coupons":4000, "weeklyad":5000, "fallingforyou":6000, "lenmar":6000, "prefs":7000 }, 
	current;
	for(i in timeOut ){
		if(domain.search(i) != -1){current=i}		
	}
	(current!=null)&& domainRedirect(current);
	function domainRedirect(cur){
		$("body").delegate("#mini-cart-icon","mouseover",function(){
			var t=setTimeout(function(){
				$("body").find(".link").delegate("a" , "click" , function(e){
					e.preventDefault();
					var self=$(this),
					href= self.attr("href");
					if($.browser.msie && $.browser.version =="7.0" ){
						if(cur!="lenmar"){
							href = href.split(".target.com");
						}else{
							href = href.split(".lenmar.com");}
						href=href[1];
					}
					if(href.search(".target.com")== -1){
						  newLocation = window.location.protocol + "//" + Target.globals.hostName + href;
					}else{
						 newLocation = href;
					}
					window.location = newLocation;
					self.attr("href", newLocation);
				}); 
			},timeOut[current]);
		});
	
		$("body").delegate("#ShopMenu .hover a" , "click" , function(e){
			e.preventDefault();
			var self=$(this),
			href= self.attr("href");
			if(href.search(".target.com")== -1)
				newLocation = window.location.protocol + "//" + Target.globals.hostName + href;
			else 
				newLocation = href;
			if(self.attr("class") == "grdaLink"){
				self.ajaxComplete(function(event,request,settings){
				  window.location.href = newLocation;
				  self.attr("href", newLocation);
				});
			} else {
				window.location.href = newLocation;
				self.attr("href", newLocation);
			}
		});
	}
    var $body = $('body'),
    ishubPage = $('#Other_Cmas_102812_HEROCON_C');
    
    if ($body.hasClass("components-testnewLayout")) {
        
        $body.removeClass("components-testnewLayout");
        $body.addClass("components-test");
        $body.addClass("newLayout");
        
    }
     if (!$body.hasClass("home-underlay") && !$body.hasClass("checkout") && (ishubPage.length === 0)) {
        $body.addClass('holidayhub');
        
    }
    else if ($body.hasClass("home-underlay")) {
        
        if (typeof gomez !== "undefined" && gomez.pgId == "Home Page") {
            
            /**
			$('head').append('<link rel="stylesheet" type="text/css" href="//static.targetimg1.com/2012/holidaystyleguide/css/holiday_style_2012_static_minified.css" />');
			$('head').append('<link rel="stylesheet" type="text/css" href="//static.targetimg1.com/2012/holidaystyleguide/css/holiday_style_2012_logo_minified.css" />');
			Target.util.loadScript({
				src: '//static.targetimg1.com/2012/holidaystyleguide/js/holiday_bootstrap_logo_minified.js', 
				delayLoad: true,
				cache : true
			});
			*/
            
        }
        else {
            $body.addClass('holidayhub');
            
        }
    }
    if ($('.hp_hz_slots-8').length !== 0 && $.browser.webkit && !Target.support.isTouch) {
        $body.addClass('position-fixed');
        setTimeout(function() {
            $body.removeClass('position-fixed');
            
            //$body.find('a:first').focus();
            
        },
        100);
        
    }
    
});

