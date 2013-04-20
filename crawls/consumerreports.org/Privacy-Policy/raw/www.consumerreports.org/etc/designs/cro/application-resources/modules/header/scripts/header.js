function focusSearch(obj){
    obj.className = "search-active";
}
function blurSearch(obj){
    if(obj.value==""){
        obj.className = "search";
    }
}
function toggleLogMenu(){
    var logInMenuOpened = document.getElementById("sign-in-menu-openned");
    var logInMenuClosed = document.getElementById("sign-in-menu-closed");
    logInMenuOpened.style.width = $(logInMenuClosed).width() + 10 + ("px");
    if (logInMenuClosed.style.display == "block" || logInMenuClosed.style.display == ""){
        logInMenuOpened.style.display = "block";
        logInMenuClosed.style.display = "none";
    }
    else{
        logInMenuOpened.style.display = "none";
        logInMenuClosed.style.display = "block";
    }
}
function addInputSubmitEvent(e) {
    if(window.event){
        e = window.event;
        if (e.keyCode == 13) {
            document.forms["login"].submit();
            return false;
        }
    }
}

/* seo-header script */
jQuery(document).ready(function() {
    jQuery("#seo-header-wrap > dd").bind("mouseenter", function(){
        jQuery("#seo-header-wrap > dd").removeAttr('style');
        jQuery(".main-nav-wraps").dequeue().hide();
        if(jQuery(this).hasClass("shopping")){
            jQuery("#main-nav-shopping").css({'position' : 'absolute','top' : jQuery(this).position().top+40,'left' : jQuery(this).position().left-193.5});
        }else if(jQuery(this).hasClass("health")){
            jQuery("#main-nav-health").css({'position' : 'absolute','top' : jQuery(this).position().top+40,'left' : jQuery(this).position().left-216});
        }else if(jQuery(this).hasClass("money")){
            jQuery("#main-nav-money").css({'position' : 'absolute','top' : jQuery(this).position().top+40,'left' : jQuery(this).position().left-214});
        } else {
            jQuery("#main-nav-" + this.className.split(' ')[0]).css({'position' : 'absolute','top' : jQuery(this).position().top+40,'left' : jQuery(this).position().left});
        }
        jQuery("#main-nav-" + this.className.split(' ')[0]).css({opacity: 0, display:"block"});
        jQuery(this).css({backgroundPosition: "0 -46px"});
        jQuery("#main-nav-" + this.className.split(' ')[0]).animate({queue: false,opacity: 0.95});
    });
    jQuery("#main_nav").bind("mouseleave", function(){
        jQuery(".main-nav-wraps").dequeue().hide();
        jQuery("#main-nav-" + this.className.split(' ')[0]).show().animate({queue: false,opacity: 0}, 200, function() {
            jQuery("#main-nav-" + this.className.split(' ')[0]).css('display', "none");
        });
        jQuery("#seo-header-wrap > dd").removeAttr('style');
    });
    jQuery(".nav-close-button").bind("click", function(){
        jQuery(".main-nav-wraps").dequeue().hide();
    })
});

