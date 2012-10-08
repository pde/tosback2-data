function addInputSubmitEvent(e) {
    if(window.event){
        e = window.event;
        if (e.keyCode == 13) {
            document.forms["login"].submit();
            return false;
        }
    }
}

jQuery(document).ready(function() {
                           jQuery('#dialog').dialog({
                               closeText: 'close',
                               autoOpen: false,
                               width:800,
                               modal:true
                           }).parent().removeClass("ui-corner-all");
                           jQuery(".icon-lock").bind("touchstart mouseenter", function(){
                               if(jQuery(this).is("img")) {
                                   jQuery(this).attr("src", "/etc/designs/cro/apage/images/icon_lock_on.png");
                               } else {
                                   jQuery(this).siblings(".icon-lock").attr("src", "/etc/designs/cro/apage/images/icon_lock_on.png");
                               }
                           }).bind("touchend mouseleave", function(){
                               if(jQuery(this).is("img")) {
                                   jQuery(this).attr("src", "/etc/designs/cro/apage/images/icon_lock.png");
                               } else {
                                   jQuery(this).siblings(".icon-lock").attr("src", "/etc/designs/cro/apage/images/icon_lock.png");
                               }
                           })
                           jQuery("#sign-in-menu-link").dialog({
                               autoOpen: false,
                               width:230,
                               modal:true,
                               dialogClass: 'no-title'
                           }).siblings('div.ui-dialog-titlebar').remove();
                           jQuery("#sign-in-menu-link").parent().removeClass("ui-widget").removeClass("ui-widget-content").removeClass("ui-corner-all");
                           jQuery("#sign-in-menu-link").removeClass("ui-widget").removeClass("ui-widget-content").removeClass("ui-corner-all");
                           jQuery.fn.logInMenu = function(options) {
                                                   jQuery(this).each(function () {
                                                           jQuery(this).bind('touchstart mouseenter', function (e) {
                                                                 var $popup = jQuery("#log-in-popup-wrap");
                                                                 $popup.css({'display':'block','position':'absolute'});
                                                                 $popup.css({'left':jQuery(this).offset().left-10+"px",'top':jQuery(this).offset().top-64+"px"});
                                                           });
                                                   });
                                           };
                                           jQuery(".icon-lock,#log-in-popup-wrap").bind('touchend mouseleave', function (e) {
                                                   if (jQuery(e.relatedTarget).parents(".icon-lock,#log-in-popup-wrap").length > 0) {
                                                           return;
                                                   } else {
                                                        if(!isIDevice()){
                                                           jQuery("#log-in-popup-wrap").hide();
                                                        }
                                                   }
                                           });
                           jQuery("#log-in-popup-wrap").bind('mouseleave', function () {
                               jQuery(this).hide();
                           })
                           jQuery('.icon-lock').logInMenu();
                           jQuery("a.sign-in").click(function(){
                               jQuery("#sign-in-menu-link").parent().css({position:"fixed"});
                               var top = jQuery(this).offset().top - jQuery(window).scrollTop();
                               jQuery('#sign-in-menu-link').dialog("option", "position", [null, top]);
                               jQuery('#sign-in-menu-link').dialog('open');
                               return false;
                           });
                           var noSubscriptions = jQuery(".noSubscriptions").css("display");
                           var logInMenuOpened = document.getElementById("sign-in-menu-openned");
                           var logInMenuClosed = document.getElementById("sign-in-menu-closed");
                           if (noSubscriptions == "block" || noSubscriptions == ""){
                                logInMenuOpened.style.display = "block";
                                logInMenuClosed.style.display = "none";
                           }
                       });

function loginPopupScript() {
    jQuery('#dialog').dialog({
        closeText: 'close',
        autoOpen: false,
        width:800,
        modal:true
    }).parent().removeClass("ui-corner-all");
    jQuery(".icon-lock").bind("touchstart mouseenter", function(){
        if(jQuery(this).is("img")) {
            jQuery(this).attr("src", "/etc/designs/cro/apage/images/icon_lock_on.png");
        } else {
            jQuery(this).siblings(".icon-lock").attr("src", "/etc/designs/cro/apage/images/icon_lock_on.png");
        }
    }).bind("touchend mouseleave", function(){
        if(jQuery(this).is("img")) {
            jQuery(this).attr("src", "/etc/designs/cro/apage/images/icon_lock.png");
        } else {
            jQuery(this).siblings(".icon-lock").attr("src", "/etc/designs/cro/apage/images/icon_lock.png");
        }
    })
    jQuery("#sign-in-menu-link").dialog({
        autoOpen: false,
        width:230,
        modal:true,
        dialogClass: 'no-title'
    }).siblings('div.ui-dialog-titlebar').remove();
    jQuery("#sign-in-menu-link").parent().removeClass("ui-widget").removeClass("ui-widget-content").removeClass("ui-corner-all");
    jQuery("#sign-in-menu-link").removeClass("ui-widget").removeClass("ui-widget-content").removeClass("ui-corner-all");
    jQuery.fn.logInMenu = function(options) {
                            jQuery(this).each(function () {
                                    jQuery(this).bind('touchstart mouseenter', function (e) {
                                          var $popup = jQuery("#log-in-popup-wrap");
                                          $popup.css({'display':'block','position':'absolute'});
                                          $popup.css({'left':jQuery(this).offset().left-10+"px",'top':jQuery(this).offset().top-64+"px"});
                                    });
                            });
                    };
                    jQuery(".icon-lock,#log-in-popup-wrap").bind('touchend mouseleave', function (e) {
                            if (jQuery(e.relatedTarget).parents(".icon-lock,#log-in-popup-wrap").length > 0) {
                                    return;
                            } else {
                                    if(!isIDevice()){
                                        jQuery("#log-in-popup-wrap").hide();
                                    }
                            }
                    });
    jQuery("#log-in-popup-wrap").bind('mouseleave', function () {
        jQuery(this).hide();
    })
    jQuery('.icon-lock').logInMenu();
    jQuery("a.sign-in").click(function(){
        jQuery("#sign-in-menu-link").parent().css({position:"fixed"});
        var top = jQuery(this).offset().top - jQuery(window).scrollTop();
        jQuery('#sign-in-menu-link').dialog("option", "position", [null, top]);
        jQuery('#sign-in-menu-link').dialog('open');
        return false;
    });
}


function isIDevice(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)  ||
        (navigator.platform.indexOf("iPad") != -1)
    );
}
