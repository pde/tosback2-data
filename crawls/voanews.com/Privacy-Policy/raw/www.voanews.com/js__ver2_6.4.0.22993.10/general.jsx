/// <reference assembly="System.Web.Extensions" name="MicrosoftAjax.debug.js"/>
/// <reference path="http://code.jquery.com/jquery-1.4.1-vsdoc.js"/>

// regex support for jQuery selectors
jQuery.expr[':'].regex = function (elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels, '')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

// switch displaying of an element (hide or display)
function slideToggle(element) {
    $(element).slideToggle("slow", "swing");
}


// open generic modal window (modal_<PARAM:MODAL>.aspx)
function openIframeModal(modal) {

    if (typeof (disableModal) != 'undefined' && disableModal && disableModal.indexOf(modal) >= 0) return;

    var queryString = jQuery.url.attr("query");
    if (queryString) queryString = '?' + queryString;

    var href = '/modal_' + modal + '.aspx';
    if (queryString != null) href = href + queryString;

    $.fancybox({
        'href': href,
        'hideOnContentClick': false,
        'type': 'iframe',
        'titleShow': false,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        //'opacity': true,
        'width': 800,
        'height': 600,
        'padding': 0,
        'margin': 0,
        'onComplete': iframeFancyboxOpened,
        'onClosed': iframeFancyboxClosed
    });
}

function openModalUrl(url, title, options) {
    /// <summary>Opens an URL in iframe in modal popup using FancyBox</summary>
    /// <param name="url" type="String">URL to open</param>
    /// <param name="title" type="String" optinal="true" mayBeNull="true">Optional modal popup title</param>
    /// <param name="options" optional="true" myBeNull="true">Additional optional options for FancyBox</param>
    /// <remarks>This function is intened to be called by users if they want to open their links in modal popup iframe. They should use link like javascript:openModalUrl("http://rferl.org").</remarks>
    var defopt = {
        onComplete: iframeFancyboxOpened,
        onClosed: iframeFancyboxClosed,
        hideOnContentClick: false,
        type: 'iframe',
        titleShow: (typeof(title) != 'undefined' && title) ? true : false,
        transitionIn: 'elastic',
        transitionOut: 'elastic',
        speedIn: 600,
        speedOut: 200,
        width: 800,
        height: 600,
        padding: 0,
        margin: 0,
    };
    if(typeof(options) == 'undefined' || !options) options = defopt;
    else for(o in defopt)
        if(typeof(options[o]) == 'undefined') options[o] = defopt[o];
    $('<a>').attr("href", url).text( (typeof(title) != 'undefined' && title) ? title : "" ).fancybox(options).click();
}


function closeIframeModal() {
    parent.$.fancybox.close();
}


function toggletalkshowbox(liEl) {

    var titleEl = $(liEl).find('span.title');
    var contentEl = $(liEl).find('div.content');

    var content = '';

    if ($(titleEl).html() != '') {
        content = content + '<div class="inlineModalHeader"><div class="modalHeaderInner"><h2>' + $(titleEl).html() + '</h2></div></div>';
    }

    content = content + '<div class="inlineModalContent">' + $(contentEl).html() + '</div>';

    $.fancybox({
        'content': content,
        'hideOnContentClick': false,
        'autoScale': true,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'autoDimensions': false,
        'width': '50%',
        'padding': 0,
        'margin': 0
    });


}

function highlightFirstLetter(element) {
    if ($(element)[0]) { // only if the element exists
        /*
        $(element).each(function (index) {
        var html = $(this).html();
        if (html) {
        var match = html.match(/>[ \s]*([^<\s]){1}/);
        if (match && match[1]) {
        html = html.replace(/>[ \s]*([^<\s]){1}/, '><span class="firstLetter">' + match[1] + '</span>');
        $(this).html(html);
        }
        }

        });
        */
        var mytrim = function (str) {
            return str.trim().replace(/^\u00A0+|\u00A0+$/g, ''); //NBSP because of IE
        }
        var filterTextNodes = function () {
            if ($(this).is("script, iframe, object, embed, video, noscript, style")) //Ignore these elements
                return null;
            return (this.nodeType == 3 && mytrim($(this).text())) ? true : false;
        };
        $(element).each(function (index) {
            var textNode = $(findFirstNodeDFS($(this), filterTextNodes));
            var textParent = textNode.parent();
            var text = mytrim(textNode.text());

            if (textParent.length > 0 && textNode.length > 0 && text) {
                text = text + ' '; // fix for links in text (missing space before first link)
                var firstLetter;
                //                 "      '     «     »     ‘      ’    ‛     “     „      ‟     ‹    ›      ❛     ❜   ❝       ❞    「     『     〝    〞    〟   ＂        NBSP because of IE
                if (text.match(/^[\u0022\u0027\u00AB\u00BB\u2018\u201A\u201B\u201C\u201E\u201F\u2039\u203A\u275B\u275C\u275D\u275E\u300C\u300E\u301D\u301E\u301F\uFF02][^\s\u00A0]/)) //Left quotes (plus › and »; see http://en.wikipedia.org/wiki/Quotation_mark_glyphs)
                    firstLetter = text.substring(0, 2);
                else
                    firstLetter = text.substring(0, 1);
                var span = $("<span class='firstLetter'/>");
                span.text(firstLetter);
                var rest = document.createTextNode(text.substring(firstLetter.length));

                textParent[0].insertBefore(span[0], textNode[0]);
                textParent[0].insertBefore(rest, textNode[0]);
                textNode.remove();
            }
        });


    }
    /*
    if ($(element)[0]) { // only if the element exists
    var html = $(element).html();
    if (html) {
    var match = html.match(/>[ \s]*([^<\s]){1}/);
    if (match && match[1]) {
    html = html.replace(/>[ \s]*([^<\s]){1}/, '><span class="firstLetter">' + match[1] + '</span>');
    $(element).html(html);
    }
    }
    } 
    */
}

function findFirstNodeDFS(where, condition) {
    /// <summary>Finds first DOM node for which a condition evaluates to true. Nodes are evaluated in Deep First Search order.</summary>
    /// <param name="where" type="jQuery">A root jQuery object to look for items inside it.</param>
    /// <param name="condition" type="Function">The condition to evaluate. It takes no parameter. This object is set to current DOM node to evaluate. Returns true to use this node, null not to use this node and  ignore its children, false not to use this node but try children.</param>
    /// <returns type="Object" domElement="true" mayBeNull="true">A DOM element representing first node found or null if no such node was found.</returns>
    var ret = null;
    where.each(function () {
        var cret = condition.call(this);
        if (cret === true) {
            ret = this;
            return false;
        }
        if (cret === null) return true; //Continue
        var iret = findFirstNodeDFS($(this).contents(), condition);
        if (iret) {
            ret = iret;
            return false;
        }
    });
    return ret;
}


function imageFancyboxOpened() {
    $("#fancybox-outer").addClass('imageFancybox');
    $("a#fancybox-close").html('<span class="title">' + window.Localizations.Common.Title.CloseWindow + '</span>');
}

function imageFancyboxClosed() {
    $("#fancybox-outer").removeClass('imageFancybox');
    $("a#fancybox-close").html('');
}

function iframeFancyboxOpened() {
    $("#fancybox-outer").addClass('iframeFancybox');
    $("a#fancybox-close").html('<span class="title" title="' + window.Localizations.Common.Title.CloseWindow + '">' + window.Localizations.Common.Title.CloseWindow + '</span>');
}

function iframeFancyboxClosed() {
    $("#fancybox-outer").removeClass('iframeFancybox');
    $("a#fancybox-close").html('');
}

function setOpenedMultimediaControl() {
    if ($('#audio_menu_trigger').hasClass('opened')) $('.mm_control_audio').addClass('opened');
    else $('.mm_control_audio').removeClass('opened');

    if ($('#itv_menu_trigger').hasClass('opened')) $('.mm_control_itv').addClass('opened');
    else $('.mm_control_itv').removeClass('opened');
};