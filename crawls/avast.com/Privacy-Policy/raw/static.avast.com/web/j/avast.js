if( typeof jQuery != 'undefined' ){
	
	/**
	 * Avast superclass
	 * @version 1.0
	 * @author Milan Adam
	 * @copyright Avast Software s.r.o &copy;2011
	 */
	var avast = {
		/**
		 * Avast default options
		 * @var boolean disableSlider - disable default slider
		 * @var boolean disableTabs - disable default tabs
		 * @var boolean disableMenu - disable default menu
		 * @var boolean disableTooltip - disable default tooltip
		 * @var boolean disableLanguageSelector - disable default language selector 
		 * @var boolean disableCounter - disable default counter
		 * @var boolean disableNavigation - disable default navigation
		 * @var boolean disableFilter - disable default product filtering
		 * @var boolean disableGaTracking - disable default google analytics tracking
		 * @var string locale - default locale (rewriten in AvastConfig snippet)
		 * @var string rootPath - default path to root of the website (rewriten in AvastConfig snippet)
		 */
		options:{
			disableSlider:false,
			disableTabs:false,
			disableMenu:false,
			disableTooltip:false,
			disableLanguageSelector:false,
			disableCounter:false,
			disableNavigation:false,
			disableFilter:false,
			disableGaTracking:false,
			disableHadd:false,
			disableUpdatePrice:false,
			disableSlideTop:false,
            disableToggleSlide: false,
            disableTestimonials: false,
			locale:"en-ww",
			rootPath:""
		},
		/**
		 * Set language cookie
		 * @param string lang - desired language region to set in cookie
		 */
		setLanguage:function(lang){
		    var d=new Date();
		    d.setDate(d.getDate() + 365);
            document.cookie = "avastComLocale="+lang+";path=/;EXPIRES=" + d.toGMTString();
        },
        /**
         * Returns user operating system
         * @param string appOS - user operating system
         */
        getOS:function(){
            var appOS = "Unknown";
            if(navigator !== undefined && navigator.appVersion !== undefined){
                if (navigator.appVersion.indexOf("Win") != -1) appOS = "Windows";
                if (navigator.appVersion.indexOf("Mac") != -1) appOS = "MacOS";
                if (navigator.appVersion.indexOf("X11") != -1) appOS = "UNIX";
                if (navigator.appVersion.indexOf("Linux") != -1) appOS = "Linux";
            }
            return appOS;
        },
        /**
         * Returns user Windows version
         * @param string winVer - user operating system
         */
        getWinVersion:function(){
            var winVer = "Unknown";
            if(navigator !== undefined && navigator.userAgent !== undefined){
                if (navigator.userAgent.indexOf("Win") != -1){
          if (navigator.userAgent.indexOf("NT 6.1") != -1) winVer = "Win7";
          if (navigator.userAgent.indexOf("NT 6.0") != -1) winVer = "Vista";
          if (navigator.userAgent.indexOf("NT 5.1") != -1) winVer = "XP";
        }
            }
            return winVer;
        }
    };

    // Prevent link click on touch events
    avast.touchEvts = avast.prototype = {        
        enable: function(){
            if(typeof jQuery !== "undefined"){
                if ('ontouchstart' in document.documentElement) {
                    $(document).on('click.touchEvts', 'ul.navlevel-0 li>a', function(e){
                        var par = $(this).parent('li').attr("id");
                        if(par){
                            var id = par.split("-")[1];
                        }
                        if($("#submenu .navparent-" + id).length > 0){
                            e.preventDefault();
                        }
                    });
                }
            }
        }(),
        disable: function(){
            if ('ontouchstart' in document.documentElement) {
                    $(document).off('click.touchEvts', 'ul.navlevel-0 li>a')
            }
        }
    }

    avast.gaTracking = avast.prototype = {
        init:function(){
            $("a").each(function(){
                if($(this).attr('href') != undefined) {
                    if(($(this).attr('href').indexOf('store.avast.co.jp') != -1 && $(this).attr('onclick') == undefined) || ($(this).attr('href').indexOf('dr-store.avast.com') != -1 && $(this).attr('onclick') == undefined)){
                        $(this).click(function(e){
                            var url = $(this).attr('href');
                            if(typeof _gaq !== "undefined"){
                                    _gaq.push(['_link', url]);
                                    e.preventDefault();
                                    return false;
                            }
                            return true;
                        });
                    }
                }
            });
        }
    };
    
    /**
     * Avast slider class
     * @version 1.0
     * @author Milan Adam
     * @copyright Avast Software s.r.o &copy;2011
     */
    avast.slider = avast.prototype = {
        /**
         * @var bxSlider slider - instance of slider
         */
        slider:null,
        /**
         * Slider default options
         * @var boolean pager - creating pager or not
         * @var boolean controls - creating controls(prev/next) or not
         * @var boolean auto - start scrolling or not
         * @var int pause - pause between scrolling
         */
        options:{
            pager: true,
            controls:false,
            auto:true,
            pause:20000,
            prevDomEl:".prev",
            nextDomEl:".next",
            subheaderDomEl:"#subheader ul.home li",
            useCSS: false
        },
        /**
         * Initialization
         * @param string type - choosing predefined slider
         * @param string cDomEl - slider contnet wrapper
         * @param object params - parameters rewriting default options 
         */
        init:function(type,cDomEl,params){
            var root = this;            
            if(params !== undefined){
                for(var param in params){
                    this.options[param] = params[param];
                }
            }
            
            if(type == null) type = "";
            switch(type){
                case "hp":
                    this.options.onBeforeSlide = function(currentSlide, totalSlides){
                        $(root.options.subheaderDomEl).removeClass('active');
                        var i = currentSlide + 1;
                        $(root.options.subheaderDomEl+':nth-child('+i+')').addClass('active');
                    };
                    this.slider = $(cDomEl).bxSlider(this.options);
                    $(root.options.prevDomEl).click(function(){
                        root.slider.goToPrevSlide();
                        $(root.options.subheaderDomEl).removeClass('active');
                        var i = root.slider.getCurrentSlide() + 1;
                        $(root.options.subheaderDomEl+':nth-child('+i+')').addClass('active');
                        return false;
                    });
                    
                    $(root.options.nextDomEl).click(function(){
                        root.slider.goToNextSlide();
                        $(root.options.subheaderDomEl).removeClass('active');
                        var i = root.slider.getCurrentSlide() + 1;
                        $(root.options.subheaderDomEl+':nth-child('+i+')').addClass('active');
                        return false;
                    });
                    
                    $(this.options.subheaderDomEl).live('click',function(){
                        var thumbIndex = $(root.options.subheaderDomEl).index(this);
                        root.slider.goToSlide(thumbIndex);
                      
                        return false;
                    });

                    $(this.options.subheaderDomEl+':first').addClass('active');
                    break;
                case "product-tab":
                    root.options.slideWidth = 90;
                    this.slider = $(cDomEl).bxSlider(this.options);
                      
            $(root.options.prevDomEl).click(function(){
                        root.slider.goToPrevSlide();
                        return false;
                    });
                    
                    $(root.options.nextDomEl).click(function(){
                        root.slider.goToNextSlide();
                      return false;
                    });
                    break;

                case "product":
                    params.slideWidth = 90;
                    if($(cDomEl + " img").length > this.options.maxSlides){
                        //this.slider = $(cDomEl).bxSlider(params);
                        var productSlider = $(cDomEl).bxSlider(this.options);
                        if(productSlider.getSlideCount() >= this.options.maxSlides){
                            
                            $(root.options.prevDomEl).click(function(){
                                productSlider.goToPrevSlide();
                                return false;
                            });
                            
                            $(root.options.nextDomEl).click(function(){
                                productSlider.goToNextSlide();
                                return false;
                            });
                            
                        }
                        else{
                            $(root.options.prevDomEl).hide();
                            $(root.options.nextDomEl).hide();
                        }
                    }else{
                        this.options.maxSlides = $(cDomEl + " img").length;
                        productSlider = $(cDomEl).bxSlider(this.options);
                        $(root.options.prevDomEl).hide();
                        $(root.options.nextDomEl).hide();
                        
                    }                    
                    break;

                case "awards":
                    if($(cDomEl + " .frame").length > this.options.maxSlides){
                        var awardsSlider = $(cDomEl).bxSlider(params);
                    } else {
                        $(params.nextSelector).hide();
                        $(params.prevSelector).hide();
                    }
                    break;

                default:
                    break;
            }
            return this.slider;
        },
        getSlider:function(){
            return this.slider;
        }
    };
    
    /**
     * Avast tabs class
     * @version 1.0
     * @author Milan Adam
     * @copyright Avast Software s.r.o &copy;2011
     */
    avast.tabs = avast.prototype = {
        /**
         * @var string nId - DOM element that has connected tabs
         */
        nId:null,
        /**
         * Tabs default options
         * @var boolean animate - animate on change or not
         * @var string tabs - css selector of relative position of main list in tabs container
         */
        options:{
            animate: true,
            tabs: "> div#tabs-navigation > ul > li"
        },
        /**
         * Initialization
         * @param string eId - DOM element where tabs are included
         * @param object params - parameters rewriting default options 
         */
        init:function(eId,params){
            this.nId = eId;
            if(params !== undefined){
                for(var param in params){
                    this.options[param] = params[param];
                }
            }
            $(this.nId).easytabs(this.options);
        },
        /**
         * Method for selecting specific tab
         * @param string sHref - id of the desired tab with perfix '#' e.g. '#tab3'
         */
        select:function(sHref){
            $(this.nId).easytabs('select',sHref);
        }
    };
    
    /**
     * Avast counter class
     * @version 1.0
     * @author Milan Adam
     * @copyright Avast Software s.r.o &copy;2011
     */
    avast.counter = avast.prototype = {
        options:{
            counterValueDomEl:".counter-value"
        },
        init:function(params){
            var root = this;
            if(params !== undefined){
                for(var param in params){
                    this.options[param] = params[param];
                }
            }
            if($(this.options.counterValueDomEl).length > 0 && $("#home").length == 0) 
            {
                $(this.options.counterValueDomEl).each(function(){
                    root.setCounter($(this));
                });
            }
        },
        setCounter:function(el)
        {   
            var campaign = el.attr('id');
            var parentID = campaign.substr(1);
            if(campaign != 'undefined'){
                $.ajax({
                        type: "POST",
                        url: RootPath + "countdown.php",
                        cache: false,
                        data:"campaign="+campaign,
                        beforeSend: function(){
                        },
                        success: function(html){
                            if(html != "-1")el.html(html);
                            else $("#counter"+parentID).hide();
                        },
                        error:function(){
                            $("#counter"+parentID).hide();
                        }
                });
            }
        }
    };
    
    /**
     * Avast seconds counter class
     * @version 1.0
     * @author Milan Adam
     * @copyright Avast Software s.r.o &copy;2012
     */
    avast.secondsCounter = avast.prototype = {
        startingSeconds:60,
        actualSeconds:60,
        timer:null,
        closed:false,
        options:{
            counterValueDomEl:".counter-seconds-value",
            onComplete:""
        },
        init:function(params){
            var root = this;
            if(params !== undefined){
                for(var param in params){
                    this.options[param] = params[param];
                }
            }
            if($(this.options.counterValueDomEl).length > 0){
                var val = parseInt($(this.options.counterValueDomEl).html());
                if(!isNaN(val)){
                    this.startingSeconds = val;
                    this.actualSeconds = val;
                }
                $(this.options.counterValueDomEl).html(this.actualSeconds);
                this.timer = setInterval(function(){
                    root.processCount();
                },1000);
            }
        },
        processCount:function(){
            this.actualSeconds--;
            $(this.options.counterValueDomEl).html(this.actualSeconds);
            if(this.actualSeconds <= 0) {
                clearInterval(this.timer);
                this.onComplete(this.options.onComplete);
            }
        },
        onComplete:function(func){
            func();
        }
    };
    
    /**
     * Avast hadd manipulation class
     * @version 1.0
     * @author Milan Adam
     * @copyright Avast Software s.r.o &copy;2012
     */
    avast.hadd = avast.prototype = {
        options:{
        regexS:"[\\?&]hadd=([^&#]*)",
        providers:["dr-store.avast.com","store.avast.com","store.avast.ru"]
        },
        init:function(params){
            var root = this;
            if(params !== undefined){
                for(var param in params){
                    this.options[param] = params[param];
                }
            }
            
            var regex = new RegExp(this.options.regexS,"i");
            var results = regex.exec(window.location.href);
            
            if(results == null){
            return 1;
            }
            else{
            var href;
            var providers = this.options.providers;
            var param;
            $("a").each(function(){
                href = $(this).attr('href') ? $(this).attr('href') : "";
                for(var i=0;i<providers.length;i++){
                if(href.indexOf(providers[i]) != -1){
                    if(i == 0){
                        var regIDS = "[\\?&]PRODUCT([^&#=]*)";
                        var regID = new RegExp(regIDS,"i");
                        var ids = regID.exec(href);
                        if(ids == null){}
                        else{
                            param = "HADD"+ids[1]+"[ADDITIONAL1]="+results[1];
                            if(href.indexOf("?") == -1)
                                href = href + "?" + param;
                            else
                                href = href + "&" + param;
                            $(this).attr('href',href);
                        }
                    }
                    else if(i == 1){
                        var regIDS = "productID[\.]([^&#=\/]*)[\/]";
                        var regID = new RegExp(regIDS,"i");
                        var ids = regID.exec(href);
                        if(ids == null){}
                        else{
                            param = "/HADD."+ids[1]+"/ADDITIONAL1."+results[1];
                            href = href + param;
                            $(this).attr('href',href);
                        }
                    }
                    else if(i == 2){
        					      param = "&licenseid="+results[1];
        						    href = href + param;
        						    $(this).attr('href',href);
        				    }
                }
                }
            });
            }
        }
    };
    
        
    avast.numberFormat = avast.prototype = {
        options:{
            decimal:0
        },
        translate:function(number,decimal){
            var root = this;
            if(decimal !== undefined) this.options.decimal = decimal;
            else this.options.decimal = 0;
            if(!isNaN(number) && avast.numberDecimalSeparator !== undefined && avast.numberThousandSeparator !== undefined){
                var ds = avast.numberDecimalSeparator;
                var ts = avast.numberThousandSeparator;
                if(ds && ds){
                    var val = $().number_format(
                           number, 
                           {
                               numberOfDecimals:root.options.decimal, 
                               decimalSeparator: ds,
                               thousandSeparator: ts,
                               symbol: ""
                           });
                    return val;
                }
                else{
                    return number;
                }
            }
            else{
                return number;
            }
        }
    };

    /**
     * Avast navigation v8 class
     * @version 1.0
     */
     avast.navigation = {
        thirdLevelTimer:null,
        options:{
            header:"#header",
            headerNavDomEl:"#header ul",
            subheader:"#subheader",
            subheaderNavDomEl:"#submenu .AVsizer",
            subnavheaderNavDomEl:"#subnav",
            subnavheaderNavDomId:"subnav",
            hideTimeout:200,
            navHihglightOffset: 2,
            subnavWrapperPad: 5,
            navContent:""
        },
        init: function(){
            
            var root = this;


            $("#header li").on('mouseenter', function(e){
                // Check mousemove

                var cObj = $(this);             
                var pos = cObj.offset();                
                var navLiWidth = cObj.outerWidth();
                var navAPos = cObj.find('a').offset();
                var navAWidth = cObj.find('a').outerWidth();
                var par = $(this).attr("id");
                var navHeight = $("#header ul").height();

                if(root.thirdLevelTimer != null) clearTimeout(root.thirdLevelTimer);
                $(root.options.headerNavDomEl).find("li").removeClass("hover");
                $(this).addClass('hover');

                if($(root.options.subnavheaderNavDomEl).length < 1) {
                    $("body").append("<div id='"+root.options.subnavheaderNavDomId+"' style='position:absolute;top:0;left:0;overflow:hidden;'>" +
                        "<div class='down-triangle'>&nbsp;</div>" +
                            "<div id='subnav-wrapper' style='position:absolute;left:0;top:0;'>" +
                                "<div class='container'></div>" +
                            "</div>" +
                        "</div>");
                }
                
                var par = $(this).attr("id");
                if(par){
                    var id = par.split("-")[1];
                }

                if($("#submenu .navparent-" + id).length > 0 && $("#subnav .navparent-" + id).is(':visible') === false){
                    
                    // When new submenu is loaded width have to be updated. All menu wrappers have to have width set to inherit. 
                    $(root.options.subnavheaderNavDomEl).show().css('width','inherit');
                    $(root.options.subnavheaderNavDomEl + " #subnav-wrapper").css('width','inherit');
                    $(root.options.subnavheaderNavDomEl + " .container").css('width','inherit');

                    $(root.options.subnavheaderNavDomEl + " .container").html($("#submenu .navparent-" + id).outerHTML());
                    $(root.options.subnavheaderNavDomEl + " #subnav-wrapper").css({'top':'-9999px','left':'-9999px'}).show();
                    
                    var subnavWidth = $("#subnav-wrapper").outerWidth();
                    var subnavHeight = $("#subnav-wrapper").outerHeight();                    

                    var subnavMinPos = subnavHeight * -1;

                    $(root.options.subnavheaderNavDomEl + " .container").css({'width': subnavWidth});
                                        
                    $(root.options.subnavheaderNavDomEl).css({'top':pos.top + navHeight + root.options.navHihglightOffset,'left':(navAWidth/2) + (navAPos.left - (subnavWidth / 2) - root.options.subnavWrapperPad),'width':subnavWidth ,'height':subnavHeight}).show();
                    $(root.options.subnavheaderNavDomEl + " #subnav-wrapper")
                        .stop()
                        //.css({'top':subnavMinPos-(pos.top + navHeight + root.options.navHihglightOffset),'left':'0'})
                        .css({'top': 0,'left': 0,'opacity': 0})
                        .show()
                        .animate({'opacity':1},{
                            duration: 150
                        });
                } else {
                    if($("#subnav .navparent-" + id).is(':visible')){
                        return;
                    } else {
                        root.hideThirdLevel();
                    }
                }
            });

            $("#header li").on('mouseleave', function(e){
                if(root.thirdLevelTimer != null) clearTimeout(root.thirdLevelTimer);
                root.thirdLevelTimer = setTimeout(function(){
                    root.hideThirdLevel();
                },root.options.hideTimeout);
            });
            
            $("body").on('mouseleave', '#subnav', function(e){
                if(root.thirdLevelTimer != null) clearTimeout(root.thirdLevelTimer);
                root.thirdLevelTimer = setTimeout(function(){
                    root.hideThirdLevel();
                },root.options.hideTimeout);
            }); 
            
            $("body").on('mouseenter', '#subnav', function(e){
                if(root.thirdLevelTimer != null) clearTimeout(root.thirdLevelTimer);
                $(root.options.subheaderNavDomEl).find("li").removeClass("hover");
                var cl = $(root.options.subnavheaderNavDomEl).find("ul").attr("class");
                if(cl){
                    var id = cl.split("-")[1];
                }               
                $(root.options.subheaderNavDomEl).find("li#navid-"+id).addClass("hover");
            });

        },
        hideThirdLevel:function(){
            var el = $(this.options.subnavheaderNavDomEl);
            el.hide();
            $(this.options.headerNavDomEl).find("li").removeClass("hover");
        }

     };
    
    $.fn.replaceText = function( search, replace, text_only ) {
        return this.each(function(){
          var node = this.firstChild,
            val,
            new_val,
            remove = [];
          if ( node ) {
            do {
                if ( node.nodeType === 3) {
                val = node.nodeValue;
                new_val = val.replace( search, replace );
                
                if ( new_val !== val ) {
                  if ( !text_only && /</.test( new_val ) ) {
                    $(node).before( new_val );
                    remove.push( node );
                  } else {
                    node.nodeValue = new_val;
                  }
                }
              }
            } while ( node = node.nextSibling );
          }
          remove.length && $(remove).remove();
        });
      };  
     
     jQuery.fn.removeHighlight = function() {
         return this.find("span.tooltip").each(function() {
              with (this.parentNode) {
                    replaceChild(this.firstChild, this);
              }
         }).end();
    };
    
    $.fn.expandCollapse = function(el){
        this.live('click',function(e){
            e.preventDefault();
            $(el).slideToggle();
            return false;
        }).css('cursor','pointer');
    };
    
    $.fn.outerHTML = function(val){
        if(val){
            $(val).insertBefore(this);
            $(this).remove();
        }
        else{ return $("<div>").append($(this).clone()).html(); }
    };
}


/*
 * avastJS core plugin
 * @ver 1.1
 * @copyright: AVAST Software a.s.
 * @author: Mirek Ratman
 */
if( typeof jQuery != 'undefined' && typeof avast != 'undefined' ) {
    avast.core = avast.prototype = {

        /* 
         * method will find the element with max style (param) and set this param to any other boxes
         * @method normalizeStyle
         * @param object $list - list of tags
         * @param string $param - parameter to normalize (example, height, width, etc - not all css styles are supported now)
         * @param string $fix - number that can be added or subtracted from final value
         * @param integer $timeout - timeout (sometimes elements need to be loaded)
         */
        normalizeStyle : function( list, param, fix, timeout ){
            if( typeof list === 'undefined' || typeof param === 'undefined' ){
                return false;
            }

            if( typeof fix !== undefined && !avast.core.isInt(fix) ){
                fix = 0;
            }

            //actual jquery plugin - to fix problems of takeing proper css value from hidden element
            (function(e){e.fn.extend({actual:function(t,n){if(!this[t]){throw'$.actual => The jQuery method "'+t+'" you called does not exist'}var r={absolute:false,clone:false,includeMargin:false};var i=e.extend(r,n);var s=this.eq(0);var o,u;if(i.clone===true){o=function(){var e="position: absolute !important; top: -1000 !important; ";s=s.clone().attr("style",e).appendTo("body")};u=function(){s.remove()}}else{var a=[];var f="";var l;o=function(){if(e.fn.jquery>="1.8.0")l=s.parents().addBack().filter(":hidden");else l=s.parents().andSelf().filter(":hidden");f+="visibility: hidden !important; display: block !important; ";if(i.absolute===true)f+="position: absolute !important; ";l.each(function(){var t=e(this);a.push(t.attr("style"));t.attr("style",f)})};u=function(){l.each(function(t){var n=e(this);var r=a[t];if(r===undefined){n.removeAttr("style")}else{n.attr("style",r)}})}}o();var c=/(outer)/g.test(t)?s[t](i.includeMargin):s[t]();u();return c}})})(jQuery)

            // Define local function
            /* 
             * function will find and get tallest tag height
             * @method getParams
             * @param object $list - list of elements
             * @param string $param - list of elements
             * @param callback $callback - callback
             */
            function getElParams( list, style, callback ){
                if( $(list).find('img').length > 0 ){
                    avast.core.imagesLoaded( list, function(){
                        var paramsList = $(list)
                                            .map( function(){
                                                return parseInt( $(this).actual( style ) , 10);
                                            })
                                            .get();
                        callback( Math.max.apply(null, paramsList) );
                    });
                }
                else{
                    var paramsList = $(list)
                                        .map( function(){
                                            return parseInt( $(this).actual( style ) , 10);
                                        })
                                        .get();
                    callback( Math.max.apply(null, paramsList) );
                }
            }
            
            if( typeof timeout !== undefined && avast.core.isInt(timeout) ){
                setTimeout(
                    function(){
                        getElParams( list, param, function(val){
                            $(list).css( param , val + fix );
                        });
                    },
                    timeout
                ); 
            }
            else{
                getElParams( list, param, function(val){
                    $(list).css( param , val + fix );
                });
            }
        },


        /* 
         * method will check if given value is an integer
         * @method isInt
         * @param object $n - value to check
         * @return boolean
         */
        isInt : function(n) {
            return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
        },


        /* 
         * method will check if given value is an array
         * @method isArray
         * @param object $n - value to check
         * @return boolean
         */
        isArray : function(n) {
            return Object.prototype.toString.call( n ) === '[object Array]' ? true : false;
        },


        /* getMaxMin method
         * method will find the MAX and MIN value form given values 
         * 
         * @var el array of int
         * @result object
         */
        getMaxMin : function( el ){
            return {min:Math.min.apply( null, el ), max:Math.max.apply( null, el )};
        },
        

        /* 
         * method will check if images are loaded
         * @method imagesLoaded
         * @param object $el - element/list of elements to check
         * @param callback $callback
         */
        imagesLoaded : function( el, callback ){
            var elems = $(el).find('img'),
                len = elems.length,
                blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

            elems
                .bind('load.imgloaded',function(){
                    if(--len <= 0 && this.src !== blank){
                        elems.unbind('load.imgloaded');
                        callback.call(elems,this);
                    }
                })
                .each(function(){
                    if(this.complete || this.complete === undefined){
                        var src = this.src;
                        this.src = blank;
                        this.src = src;
                    }
                });

            return;
        },

        /* getRatio method
         * method will calculate ratio from given values 
         * 
         * @var v int
         * @var ref int
         * @var max int
         * @result int
         */
        getRatio : function( v, ref, max ){
            // do not use v === 0, max === 0, ref === 0 instead ... == 0 - is not working correctly in IE6!
            if( v == 0 || v === undefined || v === '' || v === null || isNaN(v) ){
                v = 0;
            }
            if( max == 0 || max === undefined || isNaN(max) ){
                max = 100;
            }
            if( ref == 0 || ref === null || isNaN(ref) ){
                ref = 1;
            }

            return v * ref/max;
        },

        /* attachEl method
         * method will attach destination element (elId) to source element (sElId) - set the position of destination el close to source el
         * 
         * @var sElId string - source element ID
         * @var elId string - destination element ID
         * @var p string - params;
         *      $xPos string - left/right position of attached element
         *      $yPos string - top/bottom position of attached element
         *      $xFix int - X value fix
         *      $yFix int - Y value fix
         */
        attachEl : function( sElId, elId, p ){
            if( p.xPos === undefined ){
                p.xPos = 'center';
            }
            if( p.yPos === undefined ){
                p.yPos = 'center';
            }
            if( p.xFix === undefined ){
                p.xFix = 0;
            }
            if( p.yFix === undefined ){
                p.yFix = 0;
            }

            var sPos = sElId.position();
            if( $(elId).css('position') == 'absolute' ){
                sPos = sElId.offset();
            }
            var sPosFixed = sElId.offset();

            //center possition
            var cTop = sPos.top + Math.floor( $(sElId).outerHeight() / 2 );
            var cLeft = sPos.left + Math.floor( $(sElId).outerWidth() / 2 );

            var leftPos = cLeft;
            switch( p.xPos ){
                case 'left':
                    leftPos = sPos.left;
                break;
                case 'right':
                    leftPos = sPos.left + $(sElId).outerWidth();
                break;
                case 'center':
                    letfPos = sPos.left + Math.floor( $(sElId).outerHeight() / 2 );
                break;
            }

            var topPos = cTop;
            switch( p.yPos ){
                case 'top':
                    topPos = sPos.top - $(elId).outerHeight() - $(sElId).outerHeight();
                break;
                case 'bottom':
                    topPos = sPos.top + $(sElId).outerHeight();
                break;
                case 'center':
                    topPos = sPos.top + $(elId).outerHeight() + Math.floor( $(sElId).outerHeight() / 2 );
                break;
            }

            //fix for window size
            topPos = ( $(window).scrollTop() + $(elId).outerHeight() >  $('body').height() ? topPos + $(elId).outerHeight() + sElId.height() - p.yFix : topPos + p.yFix );
            leftPos = ( sPosFixed.left + $(elId).outerWidth() >  $('body').width() ? leftPos - $(elId).outerWidth() + sElId.width() : leftPos );

            $(elId)
                .css( 'top', topPos + p.yFix )
                .css( 'left', leftPos + p.xFix );
                
        },

        /* sortDropDownListByText method
         * method will sort dropdown list by text taken from <option> elements
         * 
         * @var elId string - source dropdown selectbox element ID
         * @var order string - order (asc/desc)
         * @var excludeFirst boolean - include/exclude first element in sorting procedure (usefull when we have first <option>-- select --</option>
         */
        sortDropDownListByText : function( elId, order, excludeFirst ) {
            var pDesc = 1;
            var pAsc = -1;
            var opt = null;

            if( excludeFirst === undefined ){
                excludeFirst = false;
            }

            if( order === undefined || order == 'asc' ){
                pDesc = -1;
                pAsc = 1;
            }

            if( excludeFirst === true ){
                var dOpt = $( elId + ' option:first');
                opt = $( elId + ' option:not(:first)').sort( function(a,b){
                   return a.text == b.text ? 0 : a.text < b.text ? pDesc : pAsc;
                });
                $( elId ).html( opt ).prepend( dOpt );
            }
            else{
                opt = $( elId + ' option').sort( function(a,b){
                   return a.text == b.text ? 0 : a.text < b.text ? pDesc : pAsc;
                });
                $( elId ).html( opt );
            }
        },

        /* showEffect method
         * Method will create custom effect for display/hide action
         * 
         * @var el string - id of element to be animated
         * @var effect string - name of effect
         * @var type string - effect will be processed on START or END 
         * @var remove boolean - remove element if TRUE
         */
        showEffect : function( el, effect, type, remove ){
            if( el === undefined ){
                return false;
            }
            if( type === undefined ){
                type = 'show';
            }
            if( type === undefined ){
                type = 'start';
            }

            switch( effect ){
                case 'fade':
                    ( type == 'start' ? $(el).fadeIn() : $(el).fadeOut() );
                break;
                case 'show':
                    ( type == 'start' ? $(el).show() : $(el).hide() );
                break;
                case 'slide':
                    ( type == 'start' ? $(el).slideDown() : $(el).slideUp() );
                break;
                default:
                    ( type == 'start' ? $(el).show() : $(el).hide() );
                break;
            }
            if( remove !== undefined ){
                $(el).remove();
            }
        }

    };
}



 /*
 * avastJS sharebox plugin
 * @ver 1.0
 * @copyright: AVAST Software a.s.
 * @author: Mirek Ratman
 */
if( typeof jQuery != 'undefined' && typeof avast != 'undefined' ) {
    avast.sharebox = avast.prototype = {

        conf : {
            delay : 2000,
            title : '',
            alias : '',
            msg : '',
            img : '',
            ref : encodeURI(document.location.href)
        },

        /* add method
         * Method will add and display sharebox for partidular source element (sElId)
         * 
         * @var sElId string - id of source element that was clicked or hoovered
         * @var elId string - id of destination box
         * @var params array - array of parameters
         *          - $title string - text for title
         *          - $msg string - text for message
         *          - $alias string - alias url
         *          - $img string - image
         *          - $ref string - referer url
         *          - $delay int - delay after destination tag will be hidden
         *          - $toRemove array - array of tags to remove from destination tag
         *          - $effect string - fade, show, slide
         *          - $xPos int - left/right position of sharebox
         *          - $yPos int - top/bottom position of sharebox
         */
        add : function( sElId, elId, params ){
            if( params.delay !== undefined ){
                avast.sharebox.conf.delay = params.delay;
            }
            if( params.toRemove !== undefined ){
                $(params.toRemove).each( function(i,v){
                    $(elId).find(v).remove();
                });
            }

            var overTimer = null;

            $(elId)
                .find( 'a:not(.bntClose)' )
                .each( function(){
                    var v = $(this).attr( 'href' );

                    $(this)
                        .attr( 'href', function(){
                            return v.replace( /\b__title__\b/gi, ( params.title !== undefined ? params.title : avast.sharebox.conf.title ) )
                                .replace( /\b__msg__\b/gi, ( params.msg !== undefined ? params.msg : avast.sharebox.conf.msg ) )
                                .replace( /\b__alias__\b/gi, ( params.alias !== undefined ? params.alias : avast.sharebox.conf.alias ) )
                                .replace( /\b__img__\b/gi, ( params.img !== undefined ? params.img : avast.sharebox.conf.img ) )
                                .replace( /\b__ref__\b/gi, ( params.ref !== undefined ? params.ref : avast.sharebox.conf.ref ) );
                        });
                });
            $(elId)
                .find('a#btnCloseShare')
                .bind( 'click', function(e){
                    avast.core.showEffect(elId,params.effect,'end');
                    clearTimeout(overTimer);
                    e.preventDefault();
                });
            $(elId)
                .find('a.print')
                .bind( 'click', function(e){
                    $(elId).hide('fast', function(){
                        window.print();
                    });
                    e.preventDefault();
                });
            $(sElId)
                .bind( 'mouseout', function(){
                    overTimer = setTimeout( function(){
                            avast.core.showEffect(elId,params.effect,'end');
                        }, avast.sharebox.conf.delay ); 
                })
                .bind( 'mouseover', function(){
                    clearTimeout(overTimer);
                });
            $(elId)
                .bind( 'mouseout', function(){
                    overTimer = setTimeout( function(){
                            avast.core.showEffect(elId,params.effect,'end');
                        }, avast.sharebox.conf.delay ); 
                })
                .bind( 'mouseover', function(){
                    clearTimeout(overTimer);
                });
            avast.core.attachEl(sElId, elId, { xPos : params.xPos, yPos : params.yPos, xFix : params.xFix, yFix : params.yFix} );
            avast.core.showEffect(elId,params.effect,'start');
        }
    };
}

//debug only 
if (!window.console) {
    console = {log: function() {}};
}