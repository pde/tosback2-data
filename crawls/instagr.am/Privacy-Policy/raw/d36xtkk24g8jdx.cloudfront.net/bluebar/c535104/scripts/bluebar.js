//  PLUCK A URL PARAM

function get_param(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

//  AUTOGROW TEXTAREA

(function($) {
    $.fn.autogrow = function(options) {
        options = options || {};

        this.filter('textarea').each(function() {
            var textarea    = this,
                $ta         = $(textarea),
                minHeight   = 30, //$ta.height(),
                lineHeight  = $ta.css('lineHeight'),
                lastHeight  = $ta.height();

            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $ta.width(),
                fontSize:   $ta.css('fontSize'),
                fontFamily: $ta.css('fontFamily'),
                lineHeight: $ta.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);

            function update() {
                update.pending = false;

                var val = textarea.value
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n/g, '<br/>');

                shadow.html(val);

                var newHeight = Math.max(shadow.height() + 14, minHeight);
                if (newHeight != lastHeight) {
                    $ta.css('height', lastHeight = newHeight);
                    if (options.onHeightChange)
                        options.onHeightChange.call(textarea, newHeight);
                }
            }

            $ta.change(update).keydown(function() {
                if (!update.pending) {
                    update.pending = true;
                    setTimeout(update, 10);
                }
            });

            update.call(textarea);
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


//  DROPDOWNS
//
//  TODO this is duplicated in React; when we refactor this
//  to use the same components, we should remove this

function openDropdown(e) {
    $(e.target).parents('.has-dropdown').toggleClass("dropdown-open");
    $(e.target).toggleClass("link-active");
}

$(document).ready(function() {
    $(".top-bar .has-dropdown > a").click(openDropdown);
});