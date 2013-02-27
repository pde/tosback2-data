$(function () {
    var postMessageToStatusFrame = false;
    var canResize = (typeof window.postMessage !== 'undefined' && typeof JSON !== 'undefined');
    $('.hlJoinTalentNetwork').click(function (e) {
        e.preventDefault();

        var joinWrap = $('<div id="join-ajax-form">').appendTo(document.body);
        var closeSpan = $('<span id="spnCancelImg" />').appendTo(joinWrap).click(function () {
            joinWrap.dialog('close');

            // to connect GoogleAnalyticsEventTracking.js (close)
            $(document.body).trigger('joinCancelled');
        });
        var elemJoinLink = $(this);
        var joinUrl = elemJoinLink.attr('href') + (elemJoinLink.attr('href').indexOf('?') > -1 ? '&' : '?') + 'isAjax=true';
        var iframe = createIframe(joinUrl);
        joinWrap.dialog({
            autoOpen: true,
            height: 'auto',
            width: '780px',
            minHeight: '80px',
            position: ['center', 100],
            draggable: false,
            modal: true,
            resizable: false,
            dialogClass: 'join-widget',
            close: function () {
                joinWrap.remove();
                $(document.body).css('overflow', '');
            }
        }).append(iframe);
        setupMessaging(iframe);

        // to connect GoogleAnalyticsEventTracking.js (close)
        $(document.body).trigger('joinStarted', [elemJoinLink]);
    });

    function createIframe(originalUrl) {
        var srcURL = ScriptVariables.Get('JoinFormURL') + originalUrl.substring(originalUrl.indexOf('?')) + '&portable=frame&newjoin=1&joinpath=default&SiteLang=' + ScriptVariables.Get('SiteLang');
        if (srcURL.indexOf('TN_DID') === -1 && srcURL.indexOf('tn_did') === -1)
            srcURL += '&TN_DID=' + ScriptVariables.Get('TNDID');
        if (ScriptVariables.Get('IsPortable'))
            srcURL += '&talentCapture=1';

        if (!(!ScriptVariables.Get('str') || 0 === ScriptVariables.Get('str').length))
            srcUrl += '&str=' + ScriptVariables.Get('str');

        var myIframe = $('<iframe name="cb-secure-joinform" id="join-frame">').attr({
            src: srcURL,
            width: '100%',
            frameborder: 0
        });
        if (!canResize) {
            myIframe.css({ 'height': '600px' });
        }

        if (typeof window.postMessage === 'undefined')
            myIframe.attr({ height: '600px' });

        return myIframe;
    }
});

$(function () {
	$('.hlWhatIsTalentNetwork').click(function () {

		var formWrapper = $('#join-widget'),
			elemJoinLink = $(this),
			sFormURL = elemJoinLink.attr('href') + (elemJoinLink.attr('href').indexOf('?') > -1 ? '&' : '?') + 'isAjax=true',
			iframe = null;
		if (formWrapper.length < 1) {
			formWrapper = $('<div />', { id: 'join-widget' }).appendTo(document.body);
		}

		formWrapper.dialog({
			autoOpen: false,
			height: 'auto',
			width: '470px',
			minHeight: '80px',
			position: ['center', 100],
			draggable: false,
			modal: true,
			resizable: false,
			dialogClass: 'join-widget',
			close: function () {
				formWrapper.remove();
				iframe.remove();
				$(document.body).css('overflow', '');
			}
		});

		// create iframe
		iframe = $('<iframe />', {
			'name': 'join-widget-uploader'
		}).appendTo(document.body).hide().load(function () {

			try {
				// get message from join form result inside iframe
				var eHtmlMessage = iframe.contents().find("#message-container").children(':first');
				if (eHtmlMessage.length !== 0) {

					// copy message into join form inside dialog
					$('#message-container', formWrapper).attr('class', eHtmlMessage.attr('class')).html(eHtmlMessage.html());
				}

			} catch (e) { }
		});

		// load join form into dialog
		formWrapper.load(sFormURL + ' #form-wrapper', function () {

			// set join form submit target to iframe
			$('form', formWrapper).attr('target', 'join-widget-uploader');
			$('#spnWhatIsTNJoin').show().click(function () {
				formWrapper.dialog('close');
				$('.hlJoinTalentNetwork').click();
				return false;
			});

			$('#spnWhatIsTNClose').show().click(function () {
				formWrapper.dialog('close');
				$('.hlJoinTalentNetwork').click();
				return false;
			});

			$('#spnCancelImg').show().click(function () {
				formWrapper.dialog('close');
				return false;
			});

			$(document.body).css('overflow', 'hidden');
			formWrapper.dialog('open');
		});

		return false;
		e.preventDefault();

	});
});
(function ($, undefined) {
    if ($.ui && $.ui.dialog) {
        $.ui.dialog.overlay.events = $.map('focus'.split(','), function (event) { return event + '.dialog-overlay'; }).join(' ');
    }
} (jQuery));
