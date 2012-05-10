jQuery(function () {
    var feedbackLink = jQuery("#hlFeedbackTest");
    var deprecatedFeedbackLink = jQuery("#hlFeedback");
    jQuery(feedbackLink).click(positionFeedbackForm);
    jQuery("#hlFeedback").remove();
});

function positionFeedbackForm() {
    var feedbackWindow = jQuery(".cb_style");
    var popupNewYPos = ((jQuery(window).height() - jQuery(feedbackWindow).height()) / 2);
    var popupNewXPos = ((jQuery(window).width() - jQuery(feedbackWindow).width()) / 2);

    var newPosition = {
        "top": (popupNewYPos + jQuery(document).scrollTop()),
        "left": popupNewXPos
    };

    feedbackWindow.css(newPosition);
}

// AddThis GA integration
var addthis_config = {
    pubid: 'ra-4dde9b671006e6cb',
    data_ga_property: 'UA-20753164-1',
    data_track_clickback: false,
    data_track_textcopy: false
};

$(function () {
    if (typeof brightcove !== 'undefined') {
        brightcove.createExperiences();
    }
});

$(function () {
    $('input[type="text"][tip]').each(function () {
        var elem = $(this);
        if (elem.val() === '')
            elem.val(elem.attr('tip'));
    }).focus(function () {
        var elem = $(this);
        if (elem.val() === elem.attr('tip'))
            elem.val('');
    }).blur(function () {
        var elem = $(this);
        if (elem.val() === '')
            elem.val(elem.attr('tip'));
    }).closest('form').submit(function () {
        $('input[type="text"][tip]', $(this)).each(function () {
            var elem = $(this);
            if (elem.val() === elem.attr('tip'))
                elem.val('');
        });
    });
});