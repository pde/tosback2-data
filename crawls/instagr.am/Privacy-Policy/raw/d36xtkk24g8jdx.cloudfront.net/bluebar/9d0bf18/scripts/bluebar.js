//  PLUCK A URL PARAM

function get_param(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

//  DROPDOWNS

function openDropdown(e)
{
    $(e.currentTarget).parent().toggleClass("dropdown-open");
    $(e.currentTarget).toggleClass("link-active");
}

$(document).ready(function() {
    $(".has-dropdown > a").click(openDropdown);
});

//  AUTOGROW TEXTAREA

(function($) {
    $.fn.autogrow = function(options) {
        this.filter('textarea').each(function() {
            var $this       = $(this),
                minHeight   = 30, //$this.height(),
                lineHeight  = $this.css('lineHeight');
            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $(this).width(),
                fontSize:   $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);
            var update = function() {
                var val = this.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n/g, '<br/>');
                shadow.html(val);
                $(this).css('height', Math.max(shadow.height() + 14, minHeight));
            }
            $(this).change(update).keyup(update).keydown(update);
            update.apply(this);
        });
        return this;
    }
})(jQuery);

//  CSRF AJAX

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});


//  Image Fallback

function imageFallback(el) {
    var fallbackURL = "http://instagram-static.s3.amazonaws.com/bluebar/images/default-avatar.png";

    if(el.parentNode.className.indexOf("img-") > -1 && el.parentNode.tagName.toLowerCase() == 'span')
    {
        el.parentNode.setAttribute("style", el.parentNode.getAttribute("style").split(el.src).join(fallbackURL));
        el.src = fallbackURL;
    }
}