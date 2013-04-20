(function($) {
    if (typeof $.telligent === 'undefined') { $.telligent = {}; }
    if (typeof $.telligent.evolution === 'undefined') { $.telligent.evolution = {}; }
    if (typeof $.telligent.evolution.widgets === 'undefined') { $.telligent.evolution.widgets = {}; }

    var registered = false,
        open = function(context, element) {
            var hoveredElement = element;
            if(context.currentElement === element) {
                return
            }
            // if no longer over, don't even bother
            if(!$(hoveredElement).data('over')) { return }

            // if a different hover is already open, then first close it
            if (context.currentElement &&
                context.currentElement !== element) {
                close(context, context.currentElement);
            }
            // if this is a request to re-open the current open panel, ignore it
            if ((context.currentElement &&
                context.currentElement === element &&
                context.popup.glowPopUpPanel('isShown')) ||
                $(element).closest('.user-info-popup-content').length > 0) {
                return;
            }
            context.currentElement = element;
            context.popup.glowPopUpPanel('html', '');

            // if the element that triggered this is no longer visible, don't show
            if(!$(element).is(':visible')) {
                return;
            }
            var profileMatches = context.profileUrlPattern.exec(element.href);
            if(profileMatches === null) { return; }

            var userName = profileMatches[1];

            var userHtml = context.userCache[userName];
            if (userHtml) {
                if($(element).offset().left + 300 > $(window).width()) {
                    setDirection(context, 'downleft');
                } else {
                    setDirection(context, 'downright');
                }

                context.popup
                    .glowPopUpPanel('html', userHtml)
                    .glowPopUpPanel('show', element, false, true);
                return;
            }
            $.telligent.evolution.get({
                url: context.getUserInformationUrl,
                data: { w_hoverUserName: userName },
                success: function(response)
                {
                    // if no longer over after ajax callback, don't even bother
                    if($(hoveredElement).data('over')) {
                        context.userCache[userName] = response;
                        context.current = element;

                        if($(element).offset().left + 300 > $(window).width()) {
                            setDirection(context, 'downleft');
                        } else {
                            setDirection(context, 'downright');
                        }

                        context.popup
                            .glowPopUpPanel('html', response)
                            .glowPopUpPanel('show', element, false, true);
                    }
                }
            });
        },
        currentDirection = null,
        setDirection = function(context, direction) {
            if(currentDirection !== direction) {
                currentDirection = direction;
                context.popup = $('<div></div>')
                    .glowPopUpPanel({
                        cssClass: 'menu user-info-popup-content menu__user-info-popup-content ' + direction,
                        position: direction,
                        zIndex: 1000,
                        hideOnDocumentClick: false
                    });
            }
        },
        close = function(context) {
            if(!context.over) {
                context.popup.glowPopUpPanel('hide');
                context.currentElement = null;
            }
        };

    $.telligent.evolution.widgets.userHover = {
        register: function(context) {
            // only register once on a given page
            if(!registered) {
                registered = true;

                context.userCache = {};

                context.popup = $('<div></div>')
                    .glowPopUpPanel({
                        cssClass: 'menu user-info-popup-content menu__user-info-popup-content',
                        position: 'downright',
                        zIndex: 1000,
                        hideOnDocumentClick: false
                    })
                    .glowPopUpPanel('html', '');

                $.extend(context, {
                    profileUrlPattern: new RegExp('^(?:' + window.location.protocol + '//' + window.location.host + ')?' +
                        $.telligent.evolution.site.getBaseUrl() + 'members/([^/]+)/(?:default\\.aspx)?', 'i'),
                    avatarUrlPattern: new RegExp('^(?:' + window.location.protocol + '//' + window.location.host + ')?' +
                        $.telligent.evolution.site.getBaseUrl() + '.*?_key/Telligent.Evolution.Components.Avatars/([0-9\\.]*)/', 'i')
                });

                $(function(){
                    $('.user-defined-markup a')
                        .live('mouseenter', function(){
                            $(this).data('over', true);
                        })
                        .live('mouseleave', function(){
                            $(this).data('over', false);
                        })
                        .live('glowDelayedMouseEnter', 999, function() {
                            var a = $(this);
                            if(!a.attr('core_userhover') && context.profileUrlPattern.test(a.attr('href'))) {
                                open(context, a.get(0));
                            }
                        })
                        .live('glowDelayedMouseLeave', 500, function(e) {
                            e.stopPropagation();
                            if(!context.current || context.current === e.target) {
                                close(context);
                            }
                        });
                    $('.internal-link.view-user-profile, .internal-link.view-profile, .avatar > a')
                        .live('mouseenter', function(){
                            $(this).data('over', true);
                        })
                        .live('mouseleave', function(){
                            $(this).data('over', false);
                        })
                        .live('glowDelayedMouseEnter', 999, function() {
                            open(context, this);
                        })
                        .live('glowDelayedMouseLeave', 500, function(e) {
                            e.stopPropagation();
                            if(!context.current || context.current === e.target) {
                                close(context);
                            }
                        });
                    $('div.user-info-popup-content')
                        .live('mouseenter', function(){
                            context.over = true;
                        })
                        .live('glowDelayedMouseLeave', 500, function(e){
                            e.stopPropagation();
                            context.over = false;
                            close(context);
                        });
                    $('div.user-info-popup-content .close a')
                        .live('click', function(){
                            context.over = false;
                            close(context);
                            return false;
                        });
                    $('div.user-info-popup-content a.start-conversation')
                        .live('click', function(){
                            var url = $(this).attr('href');
                            Telligent_Modal.Open(url,550,360,null);
                            return false;
                        });

                    $('div.user-info-popup-content a.add-friend-modal')
                        .live('click', function(){
                            var url = $(this).attr('href');
                            Telligent_Modal.Open(url,550,360,null);
                            return false;
                        });
                    $('div.user-info-popup-content a.add-friend-rest')
                        .live('click', function(){
                            alert('ajax friend request');
                            return false;
                        });
                    $('div.user-info-popup-content a.recent-activity')
                        .live('click', function(){
                            var link = $(this);
                            var responseContainer = link.parent();
                            var userId = parseInt(link.attr('data-userid'), 10);
                            $.telligent.evolution.get({
                                url: context.getRecentActivityUrl,
                                data: { w_userId: userId },
                                success: function(response) {
                                    var item = $('<div></div>')
                                        .addClass('recent-activity')
                                        .html(response)
                                        .hide()
                                        .insertAfter(responseContainer);

                                    responseContainer.glowTransition(item, { duration: 150, complete: function(){
                                        context.popup.glowPopUpPanel('refresh');
                                    } });
                                }
                            });
                            return false;
                        });
                });
            }
        }
    };
}(jQuery));
