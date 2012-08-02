
function imposeMaxLength(Object, MaxLen) {
	MaxLen = MaxLen - 1;
	if (Object.value.length > MaxLen) {
		Object.value = Object.value.substring(0, MaxLen);
	}
}

$(function () {
	$.extend($.ui.dialog.overlay, {
		create: function (dialog) {
			if (this.instances.length === 0) {
				// prevent use of anchors and inputs
				// we use a setTimeout in case the overlay is created from an
				// event that we're going to be cancelling (see #2804)
				setTimeout(function () {
					// handle $(el).dialog().dialog('close') (see #4065)
					if ($.ui.dialog.overlay.instances.length) {
						$('.ui-widget-overlay').bind($.ui.dialog.overlay.events, function (event) {
							// stop events if the z-index of the target is < the z-index of the overlay
							// we cannot return true when we don't want to cancel the event (#3523)
							if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
								return false;
							}
						});
					}
				}, 1);

				// allow closing by pressing the escape key
				$(document).bind("keydown.dialog-overlay", function (event) {
					if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

						dialog.close(event);
						event.preventDefault();
					}
				});

				// handle window resize
				$(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize);
			}

			var $el = (this.oldInstances.pop() || $("<div>").addClass("ui-widget-overlay"))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

			if ($.fn.bgiframe) {
				$el.bgiframe();
			}

			this.instances.push($el);
			return $el;
		}
	});
} ());

$(function () {
    $('.hlJoinTalentNetwork').click(function (e) {
        var formWrapper = $('#join-widget'),
			elemJoinLink = $(this),
			sFormURL = elemJoinLink.attr('href') + (elemJoinLink.attr('href').indexOf('?') > -1 ? '&' : '?') + 'isAjax=true',
			form = $('<form enctype="multipart/form-data" method="post" target="join-widget-uploader" />'),
			isJoined = false,
			iframe = null;
        form.attr('action', sFormURL);
        if (formWrapper.length < 1) {
            formWrapper = $('<div />', { id: 'join-widget' }).appendTo(document.body).append(form);
        }

        formWrapper.dialog({
            autoOpen: false,
            height: 'auto',
            width: '720px',
            minHeight: '80px',
            position: ['center', 100],
            draggable: false,
            modal: true,
            resizable: false,
            dialogClass: 'join-widget',
            close: function () {
                if (!isJoined) {
                    // to connect GoogleAnalyticsEventTracking.js (close)
                    $(document.body).trigger('joinCancelled', elemJoinLink);
                }
                formWrapper.remove();
                iframe.remove();
                $(document.body).css('overflow', '');
            }
        });

        // create iframe
        iframe = $('<iframe name="join-widget-uploader" />').appendTo(document.body).hide().load(function () {
            // join form was submitted and we have response
            try {
                // get message from join form result inside iframe
                var eHtmlMessage = iframe.contents().find("#message-container").children(':first');
                if (eHtmlMessage.length !== 0) {

                    // copy message into join form inside dialog
                    $('#message-container', formWrapper).attr('class', eHtmlMessage.attr('class')).html(eHtmlMessage.html());

                    if ($(eHtmlMessage).attr('class') === 'success') {
                        // join form submit success
                        isJoined = true;

                        // to connect GoogleAnalyticsEventTracking.js (complete)
                        $(document.body).trigger('joinCompleted', elemJoinLink);

                        (function () {
                            // add TNMI_DID to continue link for internal apply
                            var eContinueLink = $('[id$="hlTalentNetworkContinueJoin"]'),
								eRealContinueLink = iframe.contents().find('[id$="hlTalentNetworkContinueJoin"]');
                            if (eContinueLink.length > 0 && eRealContinueLink.length > 0 && eRealContinueLink.attr('href')) {
                                eContinueLink.attr('href', eRealContinueLink.attr('href'));
                            }
                        } ());

                        $('.spnContinueOption', formWrapper).show();
                        $('#form-elements', formWrapper).hide();
                        $('#custom-join').hide();
                        $('#custom-sidebar').hide();
                        $('#btnJoinTalentNetwork', formWrapper).hide();
                    }
                }

                $('#btnJoinTalentNetwork').attr('disabled', null).removeClass('disabled');
            } catch (e) { }
        });

        // load join form into dialog
        form.load(sFormURL + ' #form-wrapper', function () {
            // loaded join form into dialog

            var subfieldSections = $('[class^="countrylist-subfield"]');
            subfieldSections.hide();
            if ($('.countrylist').length == 0) {
                $('.countrylist-subfields-US').show();
            } else {
                $('.countrylist').change(function () {
                    subfieldSections.hide();
                    $(':input', subfieldSections).each(function () {
                        $(this).val('');
                    });
                    if ($(this).val() !== '') {
                        var subfields = $('.countrylist-subfields-' + $(this).val());
                        if (subfields.length === 0) {
                            subfields = $('.countrylist-subfields');
                        }
                        subfields.show();
                    }
                }).change();
            }

            // set join form button properties
            $('.spnContinueOption', formWrapper).hide().click(function (e) {
                if (sFormURL.toLowerCase().indexOf('isnotready=true') > -1) {
                    e.preventDefault();
                    formWrapper.dialog('close');
                }
            })
            $('#spnCancelImg').show().click(function () {
                formWrapper.dialog('close');
            });
            $('#btnJoinTalentNetwork', formWrapper).click(function () {
                $('#btnJoinTalentNetwork').attr('disabled', 'disabled').addClass('disabled');
                if ($.browser.msie || $.browser.webkit) {
                    $('form', formWrapper).submit();
                }
            });

            // to connect GoogleAnalyticsEventTracking.js (start)
            $(document.body).trigger('joinStarted', elemJoinLink);

            // check if user has already joined before
            if ($('#message-container .success', formWrapper).length > 0) {
                isJoined = true;
                $('.spnContinueOption', formWrapper).show();

                // to connect GoogleAnalyticsEventTracking.js (already user)
                $(document.body).trigger('joinAlreadyUser', elemJoinLink);
            }

            $('form', formWrapper).submit(function () {
                // to connect GoogleAnalyticsEventTracking.js (submit)
                $(document.body).trigger('joinSubmitted', elemJoinLink);
            });

            $('option').each(function () {
                $(this).addClass('option-' + $(this).val());

                if ($(this).css('display') === 'none') {
                    $(this).remove();
                }
            });
            //$(document.body).css('overflow', 'hidden');
            formWrapper.dialog('open');
        });

        e.preventDefault();
    });
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

