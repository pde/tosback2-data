/*
* DC Mega Menu - jQuery mega menu
* Copyright (c) 2011 Design Chemical
*
* Dual licensed under the MIT and GPL licenses:
* 	http://www.opensource.org/licenses/mit-license.php
* 	http://www.gnu.org/licenses/gpl.html
*
*/

(function ($) {

    //define the defaults for the plugin and how to call it	
    $.fn.dcMegaMenu = function (options) {
        //set default options  
        var defaults = {
            classParent: 'ww',
            classContainer: 'sub-container',
            classSubParent: 'mega-hdr',
            classSubLink: 'mega-hdr',
            classWidget: 'dc-extra',
            rowItems: 2,
            speed: 'fast',
            effect: 'fade',
            event: 'hover',
            fullWidth: false,
            onLoad: function () { },
            beforeOpen: function () { },
            beforeClose: function () { }
        };

        //call in the default otions
        var options = $.extend(defaults, options);
        var $dcMegaMenuObj = this;

        //act upon the element that is passed into the design    
        return $dcMegaMenuObj.each(function (options) {

            var clSubParent = defaults.classSubParent;
            var clSubLink = defaults.classSubLink;
            var clParent = defaults.classParent;
            var clContainer = defaults.classContainer;
            var clWidget = defaults.classWidget;

            megaSetup();

            function megaOver() {
                var subNav = $('.sub', this);
                $(this).addClass('mega-hover');
                if (defaults.effect == 'fade') {
                    $(subNav).fadeIn(defaults.speed);
                }
                if (defaults.effect == 'slide') {
                    $(subNav).show(defaults.speed);
                }
                // beforeOpen callback;
                defaults.beforeOpen.call(this);
            }
            function megaAction(obj) {
                var subNav = $('.sub', obj);
                $(obj).addClass('mega-hover');
                if (defaults.effect == 'fade') {
                    $(subNav).fadeIn(defaults.speed);
                }
                if (defaults.effect == 'slide') {
                    $(subNav).show(defaults.speed);
                }
                // beforeOpen callback;
                defaults.beforeOpen.call(this);
            }
            function megaOut() {
                var subNav = $('.sub', this);
                $(this).removeClass('mega-hover');
                $(subNav).hide();
                // beforeClose callback;
                defaults.beforeClose.call(this);
            }
            function megaActionClose(obj) {
                var subNav = $('.sub', obj);
                $(obj).removeClass('mega-hover');
                $(subNav).hide();
                // beforeClose callback;
                defaults.beforeClose.call(this);
            }
            function megaReset() {
                $('li', $dcMegaMenuObj).removeClass('mega-hover');
                $('.sub', $dcMegaMenuObj).hide();
            }

            function megaSetup() {
                //+titletext.substring(0, titletext.indexOf('page'));
                var clParentLi = clParent + '-li';
                var menuWidth = $dcMegaMenuObj.outerWidth();
                $('> li', $dcMegaMenuObj).each(function () {
                    //Set Width of sub
                    var $mainSub = $('> ul', this);
                    var $primaryLink = $('> a', this);
                    if ($mainSub.length) {
                        $mainSub.addClass('sub').wrap('<div class="' + clContainer + '" />');

                        $primaryLink.addClass(clParent);
                        var pos = $(this).position();
                        pl = pos.left;

                        $(this).addClass(clParentLi);
                        if ($('ul', $mainSub).length) {
                            $('.' + clContainer, this).addClass('mega');
                            $('> li', $mainSub).each(function () {
                                if (!$(this).hasClass(clWidget)) {
                                    $(this).addClass('mega-unit');
                                    if ($('> ul', this).length) {
                                        $(this).addClass(clSubParent);
                                        $('> a', this).addClass(clSubParent + '-a');
                                    } else {
                                        $(this).addClass(clSubLink);
                                        $('> a', this).addClass(clSubLink + '-a');
                                    }
                                }
                            });

                            $arrow = '';
                            $beginmenu = '<span class="hidden" aria-hidden="true" tabindex="0">Beginning of ' + $primaryLink.text() + ' menu</span>';
                            $endmenu = '<span class="hidden" aria-hidden="true" tabindex="0">End of ' + $primaryLink.text() + ' menu</span>';
                            $closemenu = '<a class="hidden close_menu" aria-hidden="true" href="#">Close ' + $primaryLink.text() + ' menu</a>';
                            // Create Rows
                            var hdrs = $('.mega-unit', this);
                            rowSize = parseInt(defaults.rowItems);
                            for (var i = 0; i < hdrs.length; i += rowSize) {
                                hdrs.slice(i, i + rowSize).wrapAll('<div class="row" />');
                            }

                            // Get Sub Dimensions & Set Row Height
                            $mainSub.show();

                            // Get Position of Parent Item
                            var pw = $(this).width();
                            var pr = pl + pw;

                            // Check available right margin
                            var mr = menuWidth - pr;

                            // // Calc Width of Sub Menu
                            var subw = $mainSub.outerWidth();
                            var totw = $mainSub.parent('.' + clContainer).outerWidth();
                            var cpad = totw - subw;

                            if (defaults.fullWidth == true) {
                                var fw = menuWidth - cpad;
                                $mainSub.parent('.' + clContainer).css({ width: fw + 'px' });
                                $dcMegaMenuObj.addClass('full-width');
                            }
                            var iw = $('.mega-unit', $mainSub).outerWidth(true);
                            var rowItems = $('.row:eq(0) .mega-unit', $mainSub).length;
                            var inneriw = iw * rowItems;
                            var totiw = inneriw + cpad;

                            // Set mega header height
                            $('.row', this).each(function () {
                                $('.mega-unit:last', this).addClass('last');
                                var maxValue = undefined;
                                $('.mega-unit > a', this).each(function () {
                                    var val = parseInt($(this).height());
                                    if (maxValue === undefined || maxValue < val) {
                                        maxValue = val;
                                    }
                                });
                                //$('.mega-unit > a',this).css('height',maxValue+'px');
                                $(this).parent().css('width', inneriw + 'px');
                            });

                            // Calc Required Left Margin incl additional required for right align

                            if (defaults.fullWidth == true) {
                                params = { left: 0 };
                            } else {

                                var ml = mr < ml ? ml + ml - mr : (totiw - pw) / 2;
                                var subLeft = pl - ml;

                                // If Left Position Is Negative Set To Left Margin
                                var params = "";
                                if (mr < ml) {
                                    params = { right: '-2px' };
                                } else {
                                   // params = { left: '-2px' };
                                }
                            }
                            $('.' + clContainer, this).css(params);

                            // Calculate Row Height
                            $('.row', $mainSub).each(function () {
                                var rh = $(this).height();
                                //$('.mega-unit',this).css({height: rh+'px'});
                                //$(this).parent('.row').css({height: rh+'px'});
                            });
                            $mainSub.hide();

                        } else {
                            $('.' + clContainer, this).addClass('non-mega').css('left', '-2px', pl + 'px');
                        }
						
                    $primaryLink.after($arrow);
                    $('.' + clContainer, this).find('.row').prepend($beginmenu);
                    $('.' + clContainer, this).find('.row').append($endmenu);
                    $('.' + clContainer, this).find('.row').append($closemenu);
                    }
                });

                // Set position of mega dropdown to bottom of main menu
                var menuHeight = $('> li > a', $dcMegaMenuObj).outerHeight(true);
                $('.' + clContainer, $dcMegaMenuObj).css('z-index', '800');

                if (defaults.event == 'hover') {
                    // HoverIntent Configuration
                    var config = {
                        sensitivity: 7,
                        interval: 100,
                        over: megaOver,
                        timeout: 40,
                        out: megaOut
                    };
                    $('li', $dcMegaMenuObj).hoverIntent(config);
                }

                if (defaults.event == 'click') {

                    $('body').mouseup(function (e) {
                        if (!$(e.target).parents('.mega-hover').length) {
                            megaReset();
                        }
                    });

                    $('> li > a.' + clParent, $dcMegaMenuObj).click(function (e) {
                        var $parentLi = $(this).parent();
                        if ($parentLi.hasClass('mega-hover')) {
                            megaActionClose($parentLi);
                        } else {
                            megaAction($parentLi);
                        }
                        e.preventDefault();
                    });
                }


                $('.dc-mega-icon').bind('click', function (e) {
                    var $parentLi = $(this).parent();
                    megaAction($parentLi);
                    var focusfield = $(this).next().find('.mega_nav_1col').children().first().next().find('a');
                    setTimeout(function () { $(focusfield).focus(); }, 0);
                    e.preventDefault();
                });

                $('.dc-mega-icon').bind('keyup', function (e) {
                    if (e.keyCode == 13) {
                        if ($(this).parent().siblings().find('.sub').css('display')) {
                            megaReset();
                        }
                        var $parentLi = $(this).parent();
                        megaAction($parentLi);
                        var focusfield = $(this).next().find('.mega_nav_1col').children().first().next().find('a');
                        setTimeout(function () { $(focusfield).focus(); }, 0);
                        e.preventDefault();
                    }
                    return false;
                });

                $('.close_menu').bind('keyup', function (e) {
                    if (e.keyCode == 13) {
                        var $focusfield = $(this).parent().parent().parent().siblings('.dc-mega-icon-text');
                        megaReset();
                        setTimeout(function () { $focusfield.focus(); }, 0);
                        e.preventDefault();
                    }
                    return false;
                });

                $('.sub-container').bind('keyup', function (e) {
                    if (e.keyCode == 27) {
                        var $focusfield = $(this).parent().parent().parent().siblings('.dc-mega-icon-text');
                        megaReset();
                        setTimeout(function () { $focusfield.focus(); }, 0);
                        e.preventDefault();
                    }
                    return false;
                });

                // onLoad callback;
                defaults.onLoad.call(this);
            }
        });
    };
})(jQuery);