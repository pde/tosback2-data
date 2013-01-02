JY = {
    screenWidth: null,
    brand: 'JY',
    subNavItem: '',
    subNav: '',
    common: {
        init: function() {
            gigya.socialize.addEventHandlers({
                context: { str: 'congrats on your' },
                onLogin: UTILS.gigyaLoginHandler,
                onLogout: UTILS.gigyaLogoutHandler
            });
            //window.log('JY.common.init();');
            UTILS.setScreenSize();
            if ( JY.screenWidth < 960 ){
                $('img.btn-quickshop').remove();
            }
            //UTILS.rotateIt(document);
            UTILS.setBrand();
            $('input[type=checkbox]').not($('div.rev-attr input[type="checkbox"]')).prettyCheckboxes();
            if (JY.brand == 'JY') {
                JY.subNav = '/assets/json/journeys_subnavs.js';
            } else if (JY.brand == 'SHI') {
                JY.subNav = '/assets/json/shi_subnavs.js';
            }
            $(window).resize(function() { UTILS.setScreenSize });
            $('input#keywords').focus(function() {
                if ($(this).val() == 'search') { $(this).attr('value', ''); }
            });
            $('input#keywords').blur(function() {
                if ($(this).val() == '') { $(this).attr('value', 'search'); }
            });
            $('form#search-form input[type="submit"]').click(function(e) {
                if ($('input#keywords').val() == 'search') {
                    e.preventDefault();
                } else {
                    $('form#search-form').submit();
                }
            });
            $('ul.slides li:empty').remove();
            var lastLi = $('ul.prod-list li:last');
            if (lastLi.is(':empty')) {
                lastLi.remove();
            }
            $('div#tweet-inner').tweet({
                username: 'JOURNEYSshoes',
                join_text: 'auto',
                avatar_size: 32,
                count: 4,
                auto_join_text_default: '',
                auto_join_text_ed: '',
                auto_join_text_ing: '',
                auto_join_text_reply: '',
                auto_join_text_url: '',
                loading_text: 'loading tweets&hellip;',
                template: '{text}'
            });
            if (swfobject.hasFlashPlayerVersion("1")) {
                $(".with-flash").show();
            } else {
                $(".with-flash").hide();
            }
            $.ajax({//get the minicart
                url: '/ajx/getminicart.aspx',
                dataType: 'text',
                success: function(data) {
                    var obj = $.parseJSON(data);
                    UTILS.drawMiniCart(obj.cart, false);
                },
                error: function(a, b, c) {
                    window.log('error getting subnavs', a, b, c);
                }
            });
            $('a#cart-info').mouseenter(function() {
                clearTimeout(UTILS.hideMiniCartTimeout);
                //console.log(parseInt($('span#mini-cart-qty').text()));
                if (parseInt($('span#mini-cart-qty').text()) != 0) {
                    UTILS.showMiniCart();
                }
            });
            $('a#cart-info').click(function(e) {
                if ($('div#mini-cart-wrap').is(':visible')) {
                    UTILS.startHideMiniCart();
                } else {
                    clearTimeout(UTILS.hideMiniCartTimeout);
                    if (parseInt($('span#mini-cart-qty').text()) != 0) {
                        UTILS.showMiniCart();
                    }
                }
            });
            $('div#mini-cart-wrap').mouseenter(function() {
                clearTimeout(UTILS.hideMiniCartTimeout);
            });
            $('a#cart-info,div#mini-cart-wrap').mouseleave(function() {
                UTILS.startHideMiniCart();
            });
            $('ul#mini-cart-items a.lnk-delete-prod').live('click', function() {
                var numItems = parseInt($('span#mini-cart-qty').text());
                var remItems = 0;
                var li = $(this).parents('li');
                remItems = parseInt(li.find('span.mc-qty-count').text());
                pid = li.data('id');
                $.ajax({
                    url: '/ajx/getminicart.aspx',
                    data: 'did=' + pid,
                    dataType: 'json',
                    success: function(data) {
                    console.log(data);
                        li.slideUp();
                        $('span#mini-cart-qty').text(data.cart.products.length);
                        $('span#mini-cart-subtotal,span#mini-cart-subtotal-top').text(data.cart.miniSubTotal);
                        UTILS.drawMiniCart(data.cart,false);
//                        li.slideUp();
//                        $('ul#mini-cart-items li:last').css('border', 'none');
//                        $('span#mini-cart-qty').text(data.cart.products.length);
//                        $('span#mini-cart-subtotal,span#mini-cart-subtotal-top').text(data.cart.miniSubTotal);
                    },
                    error: function(a, b, c) {
                        window.log('delete cart error', a, b, c);
                    }
                });
            });
            //            $('a#lnk-login').mouseenter(function() {
            //                clearTimeout(UTILS.hideLoginTimeout);
            //                if (JY.screenWidth > 768) {
            //                    UTILS.showLogin();
            //                }
            //            });
            $('div#site-login').mouseenter(function() {
                clearTimeout(UTILS.hideLoginTimeout);
            });
            $('a#lnk-login,div#site-login').mouseleave(function() {
                UTILS.startHideLogin();
            });
            $('a#lnk-login').click(function(e) {
                e.preventDefault();
                if ($('div#site-login').is(':visible')) {
                    UTILS.startHideLogin();
                } else {
                    UTILS.showLogin();
                }
            });
            $('ul#subnav-inner li a.hasSub').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var subName = link.data('sub-name');
                if ($('div#subnav-wrap-' + subName).is(':visible')) {
                    UTILS.startHideNavs();
                } else {
                    $('section#subnav-options-wrapper div.subnav-wrap').not('div#subnav-wrap-' + subName).hide();
                    UTILS.hideNavTimeoutClear();
                    UTILS.showSubnavs(subName);
                }
            });
            $('section#subnav-options-wrapper').mouseenter(function() {
                clearTimeout(UTILS.hideNavTimeout);
            });
            $('section#subnav-options-wrapper').mouseleave(function() {
                UTILS.startHideNavs();
            });
            $('a#lnk-login-forgot-pass').live('click', function(e) {
                e.preventDefault();
                $('div#modal-cover,div#actions-email,a#btn-submit-hint,div#modal-forgot-pass,div#forgot-email-controls,input#txt-forgot-pass-email,a#btn-submit-forgot-pass').show();
                $('div#forgot-login-hint,div#actions-hint,p#forgot-email-success,p#forgot-email-fail').hide();
                UTILS.startHideLogin();
            });
            $('input#txt-forgot-pass-email').focus(function() {
                $(this).attr('value', '');
            });
            $('a#btn-ok-forgot-pass,a#btn-close-forgot-pass').live('click', function(e) {
                $('div#modal-cover').hide();
                $('div#modal-forgot-pass').hide();
                e.preventDefault();
            });
            $('a#btn-submit-forgot-pass').live('click', function(e) {
                e.preventDefault();
                UTILS.submitForgotPass();
            });
            $('a#btn-submit-hint').live('click', function(e) {
                e.preventDefault();
                UTILS.submitForgotHint();
            });
            $('a.modal-close').click(function(e) {
                e.preventDefault();
                $('div.modal-wrap,div.modal-cover').hide();
            });
            $('a#btn-login-submit').click(function(e) {
                e.preventDefault();
                var user = $('input#txtLoginEmail').val();
                var pw = $('input#txtLoginPass').val();
                $.ajax({
                    data: 'user=' + user + '&pass=' + pw,
                    url: '/ajx/login.aspx',
                    dataType: 'json',
                    success: function(data) {
                        if (data.loggedIn) {
                            $('a#lnk-login').remove();
                            $('div.subnav-inner').append('<a href="/account">account</a>');
                            UTILS.startHideLogin();
                        } else {
                            $('div#error-login-form').text(data.message).slideDown();
                        }
                    },
                    error: function(a, b, c) {
                        window.log('login error', a, b, c);
                    }
                });
            });
            $('a#lnk-cancel-friend').click(function(e) {
                e.preventDefault();
                $('div#email-form input').attr('value', '');
                $('div#email-form').slideUp();
            });
            $('a#lnk-send-friend').click(function(e) {
                e.preventDefault();
                $('div#sentFriendMessage').hide();
                $.ajax({
                    data: 'oid=' + $('section#product').data('id') + '&senderName=' + $('input#txtYourName').val() + '&senderEmail=' + $('input#txtYourEmail').val() + '&recName=' + $('input#txtFriendName').val() + '&recEmail=' + $('input#txtFriendEmail').val() + '&message=' + $('textarea#txtFriendMessage').val(),
                    url: '/ajx/tellafriend.aspx',
                    dataType: 'json',
                    success: function(data) {
                        if (data.sent) {
                            $('div#sentFriendMessage').removeClass('error').addClass('success').text(data.message).slideDown();
                        } else {
                            $('div#sentFriendMessage').removeClass('success').addClass('error').text(data.message).slideDown();
                        }
                    },
                    error: function(a, b, c) {
                        window.log('send error', a, b, c);
                    }
                });
            });
            $('img.btn-quickshop').click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                var prodID = $(this).data('id');
                $.ajax({
                    data: 'id=' + prodID,
                    dataType: 'json',
                    url: '/ajx/quickshop.aspx',
                    success: function(data) {
                        UTILS.quickShop(data, false);
                    },
                    error: function(a, b, c) {
                        window.log('quick shop error', a, b, c);
                    }
                });
            });
            $('ul#qs-alt-views a').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var img = $('img#qs-main-img');
                img.attr('src', link.attr('href'));
            });
            $('select#selQSSize').live('change', function() {
                if ($(this).find('option:selected').val() != '') {
                    $('div#qs-msg-add-cart').hide();
                }
            });
            $('select#selQSColor').live('change', function() {
                if ($(this).find('option:selected').val() != '') {
                    var prodID = $(this).find('option:selected').val();
                    $.ajax({
                        data: 'id=' + prodID,
                        dataType: 'json',
                        url: '/ajx/quickshop.aspx',
                        success: function(data) {
                            UTILS.quickShop(data, true);
                        },
                        error: function(a, b, c) {
                            window.log('quick shop change error', a, b, c);
                        }
                    });
                }
            });
            $('a#qs-btn-add').live('click', function(e) {
                e.preventDefault();
                UTILS.addToCart(true);
            });
            $('a#lnk-bday-club').click(function(e) {
                e.preventDefault();
                $('div#modal-bday').dialog({
                    modal: true,
                    height: 440,
                    width: 550,
                    position: ['center', 'center'],
                    dialogClass: 'modal-quickshop'
                });
            });
            $('a#btn-close-bday').click(function(e) {
                $('div#modal-bday').dialog('close');
            });
            $('nav#nav-products a.second-level').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var listID = 'sublevel-' + link.data('filter');
                if (link.hasClass('closed')) {
                    $('#' + listID).slideDown('300', 'easeInQuad', function() {
                        link.removeClass('closed').addClass('open');
                        link.find('span.plus').remove();
                        link.append(' <span class="minus">-</span>');
                    });
                } else {
                    $('#' + listID).slideUp('300', 'easeOutQuad', function() {
                        link.removeClass('open').addClass('closed');
                        link.find('span.minus').remove();
                        link.append(' <span class="plus">+</span>');
                    });
                }
            });
            $('a#btn-write-rev').click(function(e) {
                e.preventDefault();
                $('div#rev-write-review-form input[type="radio"]').rating({
                    starWidth: 24
                });
                $('div#write-rev-wrap').slideDown();
                if ($('div.reviews').length < 1) {
                    $('div#rev-explanation,div#reviews-empty').hide();
                }
                //$('input[type=checkbox]').prettyCheckboxes();
            });
        },
        finalize: function() {
            //window.log('UTILS.common.finalize();');
            UTILS.tweets.rotateTweets(5000);
        }
    },
    jy_body_home: {
        init: function() {
            UTILS.homeHeroSlide($('article#home-slider-wrap'));
            UTILS.homeFeatSlide($('div#featured-brand-wrap'));
            $('div#featured-brand-wrap ul.flex-direction-nav').appendTo($('article#featured-brands'));
        },
        jy_body_home: function() {
            UTILS.homeTabs();
        },
        finalize: function() {

        }
    },
    jy_body_products: {
        init: function() {
            if (JY.screenWidth > 480) {
                UTILS.productsBrandSlide($('div#featured-brand-wrap'));
            }
            UTILS.homeHeroSlide($('article#home-slider-wrap'));
            UTILS.homeFeatSlide($('div#featured-brand-wrap'));
            /*$('ul#edit-opts select, div#filter-drops select').dropkick({
            theme: 'journeys'
            });*/
            if ($(window).width() < 481) {
                var minHeight = 0, thisHeight = 0;
                $('section#prod-wrap ul li a.prod-link').each(function() {
                    var link = $(this);
                    thisHeight = link.height() + link.find('span.prod-name').height() + link.find('span.prod-price').height();
                    if (thisHeight > minHeight) {
                        minHeight = thisHeight;
                    }
                });
                $('a.prod-link').css('min-height', minHeight + 'px');
            }
        },
        jy_body_products: function() {
            UTILS.homeTabs();
            $('a#lnk-brand-desc').click(function(e) {
                if ($('div#brand-info').is(':visible')) {
                    $('div#brand-info').slideUp();
                    $(this).removeClass('minus');
                } else {
                    $('div#brand-info').slideDown();
                    $(this).addClass('minus');
                }
            });
        },
        finalize: function() {

        }
    },
    shi_body_products: {
        init: function() {
            if (JY.screenWidth > 480) {
                UTILS.productsBrandSlide($('div#featured-brand-wrap'));
            }
            /*$('ul#edit-opts select, div#filter-drops select').dropkick({
            theme: 'journeys'
            });*/
            if ($(window).width() < 481) {
                var minHeight = 0, thisHeight = 0;
                $('section#prod-wrap ul li a.prod-link').each(function() {
                    var link = $(this);
                    thisHeight = link.height() + link.find('span.prod-name').height() + link.find('span.prod-price').height();
                    if (thisHeight > minHeight) {
                        minHeight = thisHeight;
                    }
                });
                $('a.prod-link').css('min-height', minHeight + 'px');
            }
        },
        shi_body_products: function() {
            UTILS.homeTabs();
            $('a#lnk-brand-desc').click(function(e) {
                if ($('div#brand-info').is(':visible')) {
                    $('div#brand-info').slideUp();
                    $(this).removeClass('minus');
                } else {
                    $('div#brand-info').slideDown();
                    $(this).addClass('minus');
                }
            });
        },
        finalize: function() {

        }
    },
    jy_body_product: {
        productID: null,
        chosenSize: null,
        init: function() {
            JY.jy_body_product.productID = $('section#product').data('id');
            if (Modernizr.touch) { $('a#lnk-zoom').hide(); }
            if (JY.screenWidth < 768) {
                $('div#prod-social').insertBefore($('div#product-alerts'));
            }
        },
        jy_body_product: function() {
            $('nav#xsell-tab-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                var pos = $('nav#xsell-tab-nav').offset();
                $('nav#xsell-tab-nav a').removeClass('active');
                $(this).addClass('active');
                $('div#tabs-xsell div.tab-content').hide().removeClass('active-tab');
                $('div#' + showMe).show().addClass('active-tab');
                $('html,body').animate({ scrollTop: pos.top - 280 }, 200, 'easeInQuad');
            });
            $('nav#info-tab-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                var pos = $('nav#info-tab-nav').offset();
                $('nav#info-tab-nav a').removeClass('active');
                $(this).addClass('active');
                $('div#tabs-product-info div.tab-content').hide().removeClass('active-tab');
                $('div#' + showMe).show().addClass('active-tab');
                $('html,body').animate({ scrollTop: pos.top - 380 }, 200, 'easeInQuad');
            });
            $('ul#alt-views a.lnk-alt').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var img = $('div#full-size-img-wrap img');
                var view = link.data('view');
                img.attr('src', '/images/products/1_' + JY.jy_body_product.productID + '_FS' + view + '.JPG');
                $('img#imgZoom').attr('src', '/images/products/1_' + JY.jy_body_product.productID + '_ZM' + view + '.JPG');
                $('ul#alt-views li').addClass('inactive');
                link.parent('li').removeClass('inactive');
            });
            $('input#txt-alert-email').focus(function() {
                $(this).removeClass('inactive').attr('value', '');
            });
            $('input#txt-alert-email').blur(function() {
                if ($(this).val().length < 1) {
                    $(this).addClass('inactive').attr('value', 'enter your email address');
                }
            });
            $('ul#size-list a').live('click', function(e) {
                if ($(this).hasClass('unavailable')) { return false; }
                e.preventDefault();
                var link = $(this);
                var size = link.data('size');
                JY.jy_body_product.chosenSize = size;
                $('ul#size-list a').removeClass('chosen');
                link.addClass('chosen');
            });
            $('ul#size-list li a').mouseover(function(){
                if ( $('div#no-size').is(':visible') ){$('div#no-size').hide();}
                if ( $(this).hasClass('unavailable') ){
                    console.log($('div#description-wrap').offset().top, $('ul#size-list').offset().top);
                    var top = $('ul#size-list').offset().top - $('div#description-wrap').offset().top + 63;
                    $('div#no-size').slideDown();
                    $('div#no-size').css('bottom', top + 'px');
                }
            });
            $('div#no-size').mouseout(function(){$('div#no-size').hide();});
            if (JY.screenWidth < 768) {
                $('a#lnk-zoom').hide();
                $('div#description-wrap').insertAfter($('a#lnk-zoom'));
            }
            $('a#lnk-zoom').click(function(e) {
                e.preventDefault();
                if ($(this).hasClass('zoomed')) {
                    $('div#zoom-wrap').fadeOut();
                    $(this).removeClass('zoomed');
                } else {
                    $('div#zoom-wrap').fadeIn().mousemove(UTILS.zoomMove);
                    $(this).addClass('zoomed');
                    UTILS.hideZoom();
                }
            });
            $('a#btn-add-cart').click(function(e) {
                e.preventDefault();
                UTILS.addToCart(false);
            });
            $('a#lnk-wishlist').click(function(e) {
                e.preventDefault();
                UTILS.addToWishlist();
            });
            $('a#lnk-chart').click(function(e) {
                e.preventDefault();
                var chart = $(this).data('chart') + '.html';
                $.get('/assets/templates/' + chart, function(data) { $('div#dvSizeChart').html(data); });
                $('div#modal-cover,div#modal-size-chart').show();
                $('html,body').animate({ scrollTop: $('div#modal-size-chart').offset().top }, 200, 'easeInQuad');
            });
            $('a#lnk-email').click(function(e) {
                e.preventDefault();
                $('div#email-form').slideDown();
            });
            $('a#lnk-availability').click(function(e) {
                e.preventDefault();
                $('div#msg-check-store').hide();
                $('div#modal-cover,div#modal-check-store').show();
                $('html,body').animate({ scrollTop: $('body').offset().top }, 200, 'easeInQuad');
                $('div#results-info').hide();
                $('div#check-stores-page1').show();
            });
            $('ul#check-size-list a').click(function(e) {
                e.preventDefault();
                $('ul#check-size-list a').removeClass('chosen');
                $(this).addClass('chosen');
            });
            if ( $('ul#size-list li').length == 1 ){
                $('ul#size-list li:first').find('a').click();
            }
            $('a#btn-check-store').click(function(e) {
                e.preventDefault();
                var sku = $('ul#check-size-list').find('a.chosen').data('size');
                if (sku === undefined) {
                    $('div#storeSearchError').text('please select a size').slideDown();
                } else {
                    $.ajax({
                        data: 'sku=' + sku + '&zip=' + $('input#txtZipCheckStore').val() + '&radius=' + $('select#selCheckRadius option:selected').val(),
                        url: '/ajx/storeavail.aspx',
                        dataType: 'json',
                        success: function(data) {
                            if (!data.found) {
                                $('div#storeSearchError').text(data.message).slideDown();
                                UTILS.drawStoreList(data.stores);
                            } else {
                                $('div#check-stores-page1').hide();
                                $('div#results-info').show();
                                $('span#loc-rad').text($('select#selCheckRadius option:selected').val() + ' miles');
                                $('span#loc-zip-search').text($('input#txtZipCheckStore').val());
                                $('span#loc-count').text(data.count);
                                UTILS.drawStoreList(data.stores);
                            }
                        },
                        error: function(a, b, c) {
                            window.log('error finding store', a, b, c);
                        }
                    });
                }
            });
            $('a#lnk-back-search-loc').click(function(e) {
                e.preventDefault();
                $('div#results-info').hide();
                $('div#check-stores-page1').show();
            });
            $('input#rev-overall-hidden').val($('div#rev-overall input[type="radio"]:checked').val());
            //            $('div#rev-overall input[type="radio"]').raty({
            //                starOn  : 'hand-on.png',
            //                starOff : 'hand-off.png',
            //                path		: '/assets/img/',
            //				precision	: true,
            //				size		: 25,
            //				hints: ['poor','fair','average','good','excellent'],
            //				scoreName: 'rev-overall-hidden',
            //				click: function(score,evt){
            //				    $('input#rev-overall-hidden').val(score);
            //				}
            //            });
            //            $('div#rev-overall input[type="radio"]').change(function(){
            //                if ( $(this).is(':checked') ){
            //                    $('input#rev-overall-hidden').val($(this).val());
            //                }
            //            });
            $('a.lnk-rev-hands').live('click', function(e) {
                e.preventDefault();
                $('a#lnk-tab-reviews').click();
            });
        },
        finalize: function() {

        }
    },
    shi_body_product: {
        productID: null,
        chosenSize: null,
        init: function() {
            JY.shi_body_product.productID = $('section#product').data('id');
            if (Modernizr.touch) { $('a#lnk-zoom').hide(); }
            if (JY.screenWidth < 768) {
                $('div#prod-social').insertBefore($('div#product-alerts'));
            }
        },
        shi_body_product: function() {
            $('nav#xsell-tab-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                var pos = $('nav#xsell-tab-nav').offset();
                $('nav#xsell-tab-nav a').removeClass('active');
                $(this).addClass('active');
                $('div#tabs-xsell div.tab-content').hide().removeClass('active-tab');
                $('div#' + showMe).show().addClass('active-tab');
                $('html,body').animate({ scrollTop: pos.top - 280 }, 200, 'easeInQuad');
            });
            $('nav#info-tab-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                var pos = $('nav#info-tab-nav').offset();
                $('nav#info-tab-nav a').removeClass('active');
                $(this).addClass('active');
                $('div#tabs-product-info div.tab-content').hide().removeClass('active-tab');
                $('div#' + showMe).show().addClass('active-tab');
                $('html,body').animate({ scrollTop: pos.top - 380 }, 200, 'easeInQuad');
            });
            $('ul#alt-views a.lnk-alt').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var img = $('div#full-size-img-wrap img');
                var view = link.data('view');
                img.attr('src', '/images/products/1_' + JY.shi_body_product.productID + '_FS' + view + '.JPG');
                $('img#imgZoom').attr('src', '/images/products/1_' + JY.shi_body_product.productID + '_ZM' + view + '.JPG');
                $('ul#alt-views li').addClass('inactive');
                link.parent('li').removeClass('inactive');
            });
            $('input#txt-alert-email').focus(function() {
                $(this).removeClass('inactive').attr('value', '');
            });
            $('input#txt-alert-email').blur(function() {
                if ($(this).val().length < 1) {
                    $(this).addClass('inactive').attr('value', 'enter your email address');
                }
            });
            $('ul#size-list a').live('click', function(e) {
                if ($(this).hasClass('unavailable')) { return false; }
                e.preventDefault();
                var link = $(this);
                var size = link.data('size');
                JY.jy_body_product.chosenSize = size;
                $('ul#size-list a').removeClass('chosen');
                link.addClass('chosen');
            });
            if ( $('ul#size-list li').length == 1 ){
                $('ul#size-list li:first').find('a').click();
            }
            if (JY.screenWidth < 768) {
                $('a#lnk-zoom').hide();
                $('div#description-wrap').insertAfter($('a#lnk-zoom'));
            }
            $('a#lnk-zoom').click(function(e) {
                e.preventDefault();
                if ($(this).hasClass('zoomed')) {
                    $('div#zoom-wrap').fadeOut();
                    $(this).removeClass('zoomed');
                } else {
                    $('div#zoom-wrap').fadeIn().mousemove(UTILS.zoomMove);
                    $(this).addClass('zoomed');
                    UTILS.hideZoom();
                }
            });
            $('a#btn-add-cart').click(function(e) {
                e.preventDefault();
                UTILS.addToCart(false);
            });
            $('a#lnk-wishlist').click(function(e) {
                e.preventDefault();
                UTILS.addToWishlist();
            });
            $('a#lnk-chart').click(function(e) {
                e.preventDefault();
                var chart = $(this).data('chart') + '.html';
                $.get('/assets/templates/' + chart, function(data) { $('div#dvSizeChart').html(data); });
                $('div#modal-cover,div#modal-size-chart').show();
                $('html,body').animate({ scrollTop: $('div#modal-size-chart').offset().top }, 200, 'easeInQuad');
            });
            $('a#lnk-email').click(function(e) {
                e.preventDefault();
                $('div#email-form').slideDown();
            });
            $('a#lnk-availability').click(function(e) {
                e.preventDefault();
                $('div#msg-check-store').hide();
                $('div#modal-cover,div#modal-check-store').show();
                $('html,body').animate({ scrollTop: $('body').offset().top }, 200, 'easeInQuad');
                $('div#results-info').hide();
                $('div#check-stores-page1').show();
            });
            $('ul#check-size-list a').click(function(e) {
                e.preventDefault();
                $('ul#check-size-list a').removeClass('chosen');
                $(this).addClass('chosen');
            });
            $('a#btn-check-store').click(function(e) {
                e.preventDefault();
                var sku = $('ul#check-size-list').find('a.chosen').data('size');
                if (sku === undefined) {
                    $('div#storeSearchError').text('please select a size').slideDown();
                } else {
                    $.ajax({
                        data: 'sku=' + sku + '&zip=' + $('input#txtZipCheckStore').val() + '&radius=' + $('select#selCheckRadius option:selected').val(),
                        url: '/ajx/storeavail.aspx',
                        dataType: 'json',
                        success: function(data) {
                            if (!data.found) {
                                $('div#storeSearchError').text(data.message).slideDown();
                                UTILS.drawStoreList(data.stores);
                            } else {
                                $('div#check-stores-page1').hide();
                                $('div#results-info').show();
                                $('span#loc-rad').text($('select#selCheckRadius option:selected').val() + ' miles');
                                $('span#loc-zip-search').text($('input#txtZipCheckStore').val());
                                $('span#loc-count').text(data.count);
                                UTILS.drawStoreList(data.stores);
                            }
                        },
                        error: function(a, b, c) {
                            window.log('error finding store', a, b, c);
                        }
                    });
                }
            });
            $('a#lnk-back-search-loc').click(function(e) {
                e.preventDefault();
                $('div#results-info').hide();
                $('div#check-stores-page1').show();
            });
            $('a.lnk-rev-hands').live('click', function(e) {
                e.preventDefault();
                $('a#lnk-tab-reviews').click();
            });
        },
        finalize: function() {

        }
    },
    jy_body_locator: {
        init: function() {
            /*$('div#search-what select').dropkick({
            theme: 'journeys'
            });*/
            $('.label_check, .label_radio').click(function() {
                UTILS.setupLabel();
            });
            UTILS.setupLabel();
        },
        jy_body_locator: function() {
            $('input#txtZipCode').focus(function() { $(this).removeClass('default').attr('value', ''); })
            $('input#txtZipCode').blur(function() {
                if ($(this).val().length < 1) {
                    $(this).attr('value', 'zip code').addClass('default');
                }
            });
            $('map#store-map area').click(function(e) {
                e.preventDefault();
                var stores = '';
                $('div#locate-brand input[type="checkbox"]').each(function() {
                    if ($(this).is(':checked')) {
                        stores += $(this).val();
                    }
                });
                UTILS.locator.state = $(this).data('state');
                UTILS.locator.stores = stores;
                if ($('input#txtZipCode').val() != 'zip code') {
                    UTILS.locator.zip = $('input#txtZipCode').val();
                }
                UTILS.locator.radius = $('select#sel-radius option:selected').val();
                //console.log(UTILS.locator.state, UTILS.locator.stores, UTILS.locator.zip, UTILS.locator.radius);
                UTILS.locator.searchStores();
            });
            $('a#lnk-map-details,a#lnk-map-results').click(function(e) {
                e.preventDefault();
                $('section#results-wrap,section#details-wrap').hide();
                $('section#map-wrap').slideDown();
                if (JY.screenWidth > 767) {
                    $('html,body').animate({
                        scrollTop: ($('div#crumbs').offset().top - 219)
                    }, 500);
                } else {
                    $('html,body').animate({
                        scrollTop: ($('h3#results-crumbs').offset().top)
                    }, 500);
                }
            });
            $('address.addr-store strong.store-loc a').live('click', function(e) {
                e.preventDefault();
                UTILS.locator.storeID = $(this).parents('address.addr-store').data('storeid');
                UTILS.locator.getDetails();
            });
            $('a#lnk-result-stores').click(function(e) {
                e.preventDefault();
                $('section#map-wrap,section#details-wrap').hide();
                $('section#results-wrap').slideDown();
            });
            $('a#btn-search').click(function(e) {
                e.preventDefault();
                var stores = '';
                if ($('input#txtZipCode').val() != 'zip code') {
                    UTILS.locator.zip = $('input#txtZipCode').val();
                }
                UTILS.locator.state = $('select#sel-state option:selected').val();
                UTILS.locator.radius = $('select#sel-radius option:selected').val();
                $('div#locate-brand input[type="checkbox"]').each(function() {
                    if ($(this).is(':checked')) {
                        stores += $(this).val();
                    }
                });
                UTILS.locator.stores = stores;
                //console.log(UTILS.locator.state, UTILS.locator.stores, UTILS.locator.zip, UTILS.locator.radius);
                UTILS.locator.searchStores();
            });
            if (JY.screenWidth < 768) {
                $('section#map-wrap').remove();
                $('div#locator-opts').insertAfter($('div#crumb-wrap'));
            }
            $('a#lnkExample').click(function(e){
                e.preventDefault();
                $('div#modal-example,div#modal-cover').show();
            });
            $('a#btn-close-example').click(function(e){
                e.preventDefault();
                $('div#modal-example,div#modal-cover').hide();
            });
        },
        finalize: function() {

        }
    },
    jy_body_brands: {
        init: function() {
            UTILS.brand_scroll();
        },
        jy_body_brands: function() {
            $('nav#brands-flipper a').click(function(e) {
                e.preventDefault();
                var link = $(this);
                var theTab = $('article#tabContent-' + link.data('filter'));
                var theList = $('ul#alpha-nav-' + link.data('filter'));
                $('nav#brands-flipper a').removeClass('active');
                link.addClass('active');
                if (link.text() == 'men' || link.text() == 'women') {
                    $('a#lnk-tabJourneys').addClass('active');
                } else if (link.text() == 'boys' || link.text() == 'girls') {
                    $('a#lnk-tabKidz').addClass('active');
                }
                $('section#brand-list-wrap article.tabContent, div#brand-list-top ul.alpha-nav').hide();
                theList.show();
                theTab.fadeIn('300', UTILS.brand_scroll());
                $('html, body').animate({ scrollTop: 0 }, 500);
            });
        },
        finalize: function() {

        }
    },
    shi_body_home: {
        init: function() {
            UTILS.homeHeroSlide($('article#home-slider-wrap'));
            UTILS.homeFeatSlide($('div#featured-brand-wrap'));
            $('div#featured-brand-wrap ul.flex-direction-nav').appendTo($('article#featured-brands'));
        },
        shi_body_home: function() {
            UTILS.homeTabs();
        },
        finalize: function() {

        }
    },
    jy_gift_cards: {
        cardsAdded: 0,
        addToCart: function(selVal) {
            //console.log(selVal);
            $.ajax({
                data: 'oid=' + selVal + '&email=' + $('input#txtRecEmail').val() + '&name=' + $('input#txtRecName').val(),
                url: '/ajx/getminicart.aspx',
                dataType: 'json',
                success: function(data) {
                    if (data.message == 'added') {
                        JY.jy_gift_cards.cardsAdded++;
                        UTILS.drawMiniCart(data.cart, true);
                        $('a#cart-info').mouseenter();
                        $('html,body').animate({
                            scrollTop: ($('header#hdr-site').offset().top)
                        }, 500);
                    }
                },
                error: function(a, b, c) {
                    window.log('error adding to cart', a, b, c);
                }
            });
        },
        init: function() {
            $('input#txtCardNumber').focus(function() {
                $(this).attr('value', '');
            });
            $('input#txtCardNumber').blur(function() {
                if ($(this).val() == '') {
                    $(this).attr('value', 'eg. 2399868');
                }
            });
            $('input#btnLookup').click(function(e) {
                if ($('input#txtCardNumber').val() == 'eg. 2399868') {
                    e.preventDefault();
                }
            });
        },
        jy_gift_cards: function() {
            var errors = 0;
            $('select#selVirtual').change(function() {
                if ($(this).find('option:selected').val() == '') {
                    errors = 0;
                }
            });
            $('a#btn-add-card').click(function(e) {
                e.preventDefault();
                var cards = '';
                $('div.controls').removeClass('error');
                $('div.error').hide();
                if ($('select#selVirtual option:selected').val() != '') {
                    if ($('input#txtRecName').val().replace(' ', '') == '') {
                        errors++;
                        $('div#rec-name-error').slideDown();
                    }
                    if ($('input#txtRecEmail').val().replace(' ', '') == '') {
                        errors++;
                        $('div#rec-email-error').slideDown();
                    }
                    if ($('input#txtRecEmail2').val().replace(' ', '') == '' || $('input#txtReEmail2').val() != $('input#txtReEmail').val()) {
                        errors++;
                        $('div#rec-email2-error').slideDown();
                    }
                    if (errors < 1) { cards += $('select#selVirtual').val() + ','; }
                }
                if ($('select#selJourneys option:selected').val() != '' && errors < 1) {
                    cards += $('select#selJourneys option:selected').val() + ',';
                }
                if ($('select#selKidz option:selected').val() != '' && errors < 1) {
                    cards += $('select#selKidz option:selected').val() + ',';
                }
                if ($('select#selShi option:selected').val() != '' && errors < 1) {
                    cards += $('select#selShi option:selected').val() + ',';
                }
                if ($('select#selUBJ option:selected').val() != '' && errors < 1) {
                    cards += $('select#selUBJ option:selected').val() + ',';
                }
                if (cards.charAt(cards.length - 1) == ',') { cards = cards.slice(0, -1) }
                JY.jy_gift_cards.addToCart(cards);
            });
        },
        finalize: function() {

        }
    },
    jy_checkout: {
        init: function() {
            var html = '';
            var obj;
            $.ajax({//get the minicart
                url: '/ajx/getminicart.aspx',
                dataType: 'text',
                success: function(data) {
                    obj = $.parseJSON(data);
                    $.ajax({
                        url: '/assets/templates/checkout-side-cart.html',
                        cache: false,
                        success: function(template) {
                            html = Mustache.to_html(template, obj.cart);
                            $('div#cart-products').html(html);
                            UTILS.updateShipSubtotal();
                        },
                        error: function(a, b, c) {
                            window.log('draw cart error', a, b, c);
                        }
                    });
                },
                error: function(a, b, c) {
                    window.log('error getting minicart', a, b, c);
                }
            });
        }
    },
    jy_cart: {
        init: function() {
            $('div#login-window').dialog({
                autoOpen: false,
                modal: true,
                width: 690,
                position: ['center', 40],
                draggable: false,
                resizable: false
            });
            $('a#btn-checkout,a#btn-chk-card').click(function(e) {
                e.preventDefault();
                $('div#login-window').dialog('open');
            });
            $('a#btn-close-modal').click(function(e) {
                e.preventDefault();
                $('div#login-window').dialog('close');
            });
        },
        jy_cart: function() {
            $('a#remove-alert').click(function(e) {
                e.preventDefault();
                $(this).parent('div.form-alert').slideUp();
            });
            $('input#txtPromoCode').focus(function() {
                $(this).attr('value', '');
            });
            $('input#txtPromoCode').blur(function() {
                if ($(this).val().length < 1) { $(this).attr('value', 'eg; 3456603'); }
            });
            $('a#btnApply').click(function(e) {
                if ($('input#txtPromoCode').val() == 'eg; 3456603') {
                    e.preventDefault();
                }
            });
            $('a#btn-ic-check').click(function(e) {
                e.preventDefault();
                $('div#cart_items_info').hide();
                $('form#iframe_loader').submit();
                $('div#iframe_wrap').show();
            });
        },
        finalize: function() {

        }
    },
    jy_shipping: {
        init: function() {
            $('input[name="ship-method"]').prettyCheckboxes();
            var defShip = $('input[name="ship-method"]:checked').next().data('cost');
            $('span#lblTotalShipping').text('$' + defShip);
            UTILS.updateShipSubtotal();
        },
        jy_shipping: function() {
            $('input[name="ship-method"]').change(function() {
                var rad = $(this);
                var cost = rad.next().data('cost');
                if (rad.is(':checked')) {
                    $('span#ship-type').text(rad.next('label').find('strong').text());
                    $('span#lblTotalShipping').text('$' + cost);
                    //$('span#lblSubTotal').text();
                }
                UTILS.updateShipSubtotal();
            });
        },
        finalize: function() {

        }
    },
    jy_billing: {
        init: function() {
            UTILS.updateShipSubtotal();
            $('div#cvc-window').dialog({
                autoOpen: false,
                modal: true,
                width: 600,
                height: 400,
                position: ['center', 40],
                draggable: false,
                resizable: false
            });
            $('a#btn-checkout,a#btn-chk-card').click(function(e) {
                e.preventDefault();
                $('div#login-window').dialog('open');
            });
            $('a#btn-close-modal').click(function(e) {
                e.preventDefault();
                $('div#login-window').dialog('close');
            });
            $('div.pay-choice').live('click', function(e) {
                //console.log('clicked choice');
                var theBox = $(this).find('input[type="checkbox"]').attr('id');
                switch (theBox) {
                    case 'cbGiftCard':
                        if ($('input#cbPayPal').is(':checked')) {
                            $('input#cbPayPal').attr('checked', false);
                            $('div.pay-choice label[for="cbPayPal"]').removeClass('checked');
                            $('div#dvPPDetails').hide();
                            $('div#dvGCDetails,div#dvCCDetails').show();
                        } else {
                            $('div#dvGCDetails').show();
                        }
                        if ($('input#cbGiftCard').is(':checked')) {
                            $('input#cbGiftCard').attr('checked', false);
                            $('div.pay-choice label[for="cbGiftCard"]').removeClass('checked');
                        } else {
                            $('input#cbGiftCard').attr('checked', true);
                            $('div.pay-choice label[for="cbGiftCard"]').addClass('checked');
                            $('div#dvGCDetails').hide();
                        }
                        break;
                    case 'cbBML':
                        $('div.pay-choice label[for="cbCreditCard"],div.pay-choice label[for="cbPayPal"]').removeClass('checked');
                        $('input#cbCreditCard,input#cbPayPal').attr('checked', false);
                        $('div#dvCCDetails,div#dvPPDetails').hide();
                        $('div#dvBMLDetails').show();
                        break;
                    case 'cbCreditCard':
                        $('div.pay-choice label[for="cbBML"],div.pay-choice label[for="cbPayPal"]').removeClass('checked');
                        $('input#cbBML,input#cbPayPal').attr('checked', false);
                        $('div#dvBMLDetails,div#dvPPDetails').hide();
                        $('div#dvCCDetails').show();
                        break;
                    case 'cbPayPal':
                        $('div.pay-choice label').removeClass('checked');
                        $('div.pay-choice input[type="checkbox"]').attr('checked', false);
                        $('div#dvBMLDetails,div#dvCCDetails,div#dvGCDetails').hide();
                        $('div#dvPPDetails').show();
                        break;
                }
                if ($(this).find('input[type="checkbox"]').is(':checked')) {
                    $(this).find('input[type="checkbox"]').attr('checked', false);
                    $(this).find('label.prettyCheckbox').removeClass('checked');
                } else {
                    $(this).find('input[type="checkbox"]').attr('checked', true);
                    $(this).find('label.prettyCheckbox').addClass('checked');
                }
            });
        },
        jy_billing: function() {
            $('a#lnk-what-cvc').click(function(e) {
                e.preventDefault();
                $('div#cvc-window').dialog('open');
            });
            $('a#btn-close-modal').click(function(e) {
                e.preventDefault();
                $('div#cvc-window').dialog('close');
            });
        },
        finalize: function() {

        }
    },
    jy_cart_review: {
        init: function() {
            UTILS.updateShipSubtotal();
        },
        jy_cart_review: function() {

        },
        finalize: function() {

        }
    },
    jy_account_profile: {
        init: function() {

        },
        jy_account_profile: function() {
            $('nav#orders-tabs-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                $('nav#orders-tabs-nav a').removeClass('active');
                $(this).addClass('active');
                $('article.tab-wrap').hide().removeClass('active-tab');
                $('article#' + showMe).show().addClass('active-tab');
            });
            $('table#table-wishlist a.icon-delete').click(function(e) {
                var itemID = $(this).data('id');
                $.ajax({
                    dataType: 'json',
                    url: '/ajx/wishlist.aspx',
                    data: 'wlID=' + itemID,
                    type: 'get',
                    success: function(data){
                        if ( data.message === "ok" ){
                            $('table#table-wishlist a.icon-delete[data-id="' + itemID + '"]').parent('td').parent('tr').slideUp(300, function(){$(this).remove();});
                        }
                    },
                    error: function(a,b,c){
                        window.log('wishlist remove error', a, b, c);
                    }
                });
            });
        },
        finalize: function() {

        }
    },
    jy_address_book: {
        init: function() {
            var addresses, html = '';
            $.ajax({
                cache: false,
                url: '/ajx/getaddressbook.aspx',
                //url: '/assets/json/address-book.json',
                dataType: 'json',
                success: function(data) {
                    addresses = data.addresses;
                    if (addresses.length > 0) {
                        html += '<ul class="address-list">';
                        for (var i = 0; i < addresses.length; i++) {
                            html += '<li class="address"><a href="#" data-id="' + addresses[i].addressID + '" class="icon-delete" title="delete this address"></a>';
                            html += '<span data-name="addr-title"><h4>' + addresses[i].title + '</h4></span>';
                            html += '<span data-name="company">' + addresses[i].company + '</span>' + (addresses[i].company == '' ? '' : '<br />');
                            html += '<span data-name="firstname">' + addresses[i].firstName + '</span> <span data-name="lastname">' + addresses[i].lastName + '</span><br />';
                            html += '<span data-name="addr1">' + addresses[i].addr1 + '</span><br />';
                            if (addresses[i].addr2.length > 0) {
                                html += '<span data-name="addr2">' + addresses[i].addr2 + '</span><br />';
                            } else {
                                html += '<span data-name="addr2" class="hidden">' + addresses[i].addr2 + '</span><br class="hidden" />';
                            }
                            html += '<span data-name="city">' + addresses[i].city + '</span>, <span data-name="state">' + addresses[i].state + '</span> <span data-name="zipcode">' + addresses[i].zip + '</span><br />';
                            html += '<span data-name="phone">' + addresses[i].phone + '</span>';
                            html += '<a href="#" class="lnk-edit" data-id="' + addresses[i].addressID + '">edit</a>';
                            html += '<span class="hidden" data-name="isBusiness">' + addresses[i].isBusiness + '</span></li>';
                        }
                        html += '</ul>';
                        $('div#existing-addresses').html(html);
                        $('div#existing-addresses ul li:last').css('border', 'none');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    window.log('addr-error', jqXHR, textStatus, errorThrown);
                }
            })
        },
        jy_address_book: function() {
            $('div#existing-addresses ul.address-list li.address a.icon-delete').live('click', function(e) {
                e.preventDefault();
                var $link = $(this);
                var addrID = $link.data('id');
                var $li = $link.parents('li.address');
                $li.slideUp('200', function() { $li.remove(); $('div#existing-addresses ul li:last').css('border', 'none'); });
                $.ajax({
                    //send the address ID to the server to remove it from the DB
                    data: 'r=' + addrID,
                    url: '/ajx/getaddressbook.aspx',
                    dataType: 'json',
                    success: function(data) {
                        //some kind of message or no?
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        window.log('addr-error', jqXHR, textStatus, errorThrown);
                    }
                });
            });
            $('div#existing-addresses ul.address-list li.address a.lnk-edit').live('click', function(e) {
                e.preventDefault();
                var link = $(this);
                var li = link.parents('li.address');
                var addrID = link.data('id');
                var span, theKey, theValue, input;
                li.children('span').each(function() {
                    span = $(this);
                    theKey = span.data('name');
                    theValue = span.text();
                    input = $('div#form-address').find('input[data-field="' + theKey + '"]');
                    if (theKey == 'state') {
                        input = $('div#form-address').find('select[data-field="' + theKey + '"]');
                        input.find('option[value="' + theValue.toUpperCase() + '"]').attr('selected', true);
                    } else if (theKey == 'isBusiness') {
                        input = $('input#cbIsBusiness');
                        //console.log(input);
                        if (theValue == 'true') {
                            input.attr('checked', true);
                            $('label[for="cbIsBusiness"]').addClass('checked');
                        } else {
                            input.attr('checked', false);
                            $('label[for="cbIsBusiness"]').removeClass('checked');
                        }
                    } else {
                        input.attr('value', theValue);
                    }
                });
            });
        },
        finalize: function() {

        }
    },
    jy_editorial: {
        init: function() {
            $('nav#home-tab-nav a').click(function(e) {
                e.preventDefault();
                var showMe = $(this).data('tab');
                var pos = $('nav#home-tab-nav').offset();
                $('nav#home-tab-nav a').removeClass('active');
                $(this).addClass('active');
                $('article.tab-wrap').hide().removeClass('active-tab');
                $('article#' + showMe).show().addClass('active-tab');
                $('html,body').animate({ scrollTop: $('header#hdr-home-tabs').offset().top - 180 }, 200, 'easeInQuad');
            });
            $('a#lnk-show-rules').click(function(e) {
                e.preventDefault();
                if ($('div#contest-rules').is(':visible')) {
                    $('div#contest-rules').slideUp();
                    $(this).text("show rules");
                } else {
                    $('div#contest-rules').slideDown();
                    $(this).text("hide rules");
                }
            });
            $('a#lnk-clear-info').click(function(e) {
                e.preventDefault();
                $('div#dvForm input').each(function() { $(this).val(''); });
                $('div#dvForm option').removeAttr('selected');
            });
        }
    }
}

UTILS = {
    fire: function(func, funcname, args) {
        var namespace = JY;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        var bodyId = document.body.id;
        UTILS.fire('common');

        $.each(document.body.className.split(/\s+/), function(i, classnm) {
            UTILS.fire(classnm);
            UTILS.fire(classnm, bodyId);
        });
        UTILS.fire('common', 'finalize');
    },
    locator: {
        radius: 5,
        state: '',
        zip: '',
        stores: '',
        storeID: '',
        returnedStores: null,
        storeDetails: null,
        headerPlace: '',
        searchStores: function() {
            //console.log('p=' + UTILS.locator.stores + '&s=' + UTILS.locator.state + '&z=' + UTILS.locator.zip + '&r=' + parseInt(UTILS.locator.radius));
            $.ajax({
                cache: false,
                dataType: "json",
                //url: '/assets/json/store-locator-results.json',
                url: '/ajx/getstores.aspx',
                data: 'p=' + UTILS.locator.stores + '&s=' + UTILS.locator.state + '&z=' + UTILS.locator.zip + '&r=' + parseInt(UTILS.locator.radius),
                success: function(data) {
                if ((data.jy.length > 0) || (data.shi.length > 0) || (data.kz.length > 0) || (data.ubj.length > 0)) {
                        UTILS.locator.headerPlace = data.header;
                        UTILS.locator.drawStores(data.jy, 'jy');
                        UTILS.locator.drawStores(data.shi, 'shi');
                        UTILS.locator.drawStores(data.kz, 'kids');
                        UTILS.locator.drawStores(data.ubj, 'ubj');
                    } else {
                        $('span#blurb-within').html('<span class="txtOrange">no stores found</span>');
                        if (JY.screenWidth > 767) {
                            $('html,body').animate({
                                scrollTop: ($('div#crumbs').offset().top - 219)
                            }, 500);
                        } else {
                            $('html,body').animate({
                                scrollTop: ($('h3#results-crumbs').offset().top)
                            }, 500);
                        }
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    window.log(jqXHR, textStatus, errorThrown);
                }
            });
        },
        getDetails: function() {
            $.ajax({
                cache: false,
                //url: '/assets/json/store-locator-results.json',
                url: 'ajx/getstores.aspx',
                data: 'oid=' + UTILS.locator.storeID,
                dataType: 'json',
                success: function(data) {
                    UTILS.locator.drawStore(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    window.log(jqXHR, textStatus, errorThrown);
                }
            });
        },
        drawStores: function(stores, brand) {
            //console.log(stores.length);
            //console.log(stores);
            if ((stores !== undefined) && (stores.length > 0)) {
                var li = '<li>';
                var mapQ = '';
                for (var i = 0; i < stores.length; i++) {
                    mapQ = stores[i].ADDR1 + ' ' + stores[i].ADDR2 + ' ' + stores[i].CITY + ' ' + stores[i].STATE + ' ' + stores[i].ZIP;
                    li += '\
										<address class="addr-store" data-storeID="' + stores[i].OID + '">\
											<strong class="store-loc"><a href="#">' + stores[i].ADDR1 + '<br />\
											STORE ' + stores[i].NUMBER + '</a></strong><br />\
											' + stores[i].ADDR2 + ' <br />\
											' + stores[i].CITY + ', ' + stores[i].STATE + ' ' + stores[i].ZIP + '<br />\
											' + stores[i].PHONE + '\
											<a href="https://maps.google.com/maps?q=' + mapQ + '" class="lnk-map" target="_blank">map or directions</a>\
										</address>\
					'
                    if ((i > 0) && ((i + 1) % 3 == 0)) {
                        li += '</li><li>';
                    }
                }
                li += '</li>';
                $('ul#' + brand + '-store-list').html(li);
                $('div#' + brand + '-results').show();
                if ($('ul#' + brand + '-store-list li:last').children().length < 1) {
                    $('ul#' + brand + '-store-list li:last').remove();
                }
                if ($('input#txtZipcode').val() == 'zip code') {
                    $('span#blurb-within').html('stores within <span class="txtOrange">' + $('select#sel-radius option:selected').text() + '</span> of <span class="txtOrange">' + $('input#txtZipcode').val() + '</span>');
                } else {
                    $('span#blurb-within').html('<span class="txtOrange">' + UTILS.locator.headerPlace + '</span>');
                }

            } else {
                $('div#' + brand + '-results').hide();
            }
            $('section#map-wrap,section#details-wrap').hide();
            $('section#results-wrap').slideDown();
            if (JY.screenWidth > 767) {
                $('html,body').animate({
                    scrollTop: ($('div#crumbs').offset().top - 219)
                }, 500);
            } else {
                $('html,body').animate({
                    scrollTop: ($('h3#results-crumbs').offset().top)
                }, 500);
            }
        },
        drawStore: function(storeJSON) {
            var crumbTxt = '';
            var html = storeJSON.ADDR1 + '<br />' + storeJSON.ADDR2 + '<br />' + storeJSON.CITY + ', ' + storeJSON.STATE + ' ' + storeJSON.ZIP + '<br />' + storeJSON.PHONE;
            var imgSrc = '/images/bg_store_journeys.jpg';
            switch (storeJSON.BRAND.toUpperCase()) {
                case 'SHI':
                    imgSrc = '/images/bg_store_shi.jpg';
                    break;
                case 'KIDZ':
                    imgSrc = '/images/bg_store_kidz.jpg';
                    break;
            }
            //console.log(UTILS.locator.zip, UTILS.locator.state);
            if (UTILS.locator.zip != '') {
                crumbTxt = 'stores within ' + UTILS.locator.radius + ' miles of ' + UTILS.locator.zip;
            } else if (UTILS.locator.state != '') {
                crumbTxt = 'stores in ' + UTILS.locator.state;
            }
            $('#lnk-result-stores').text(crumbTxt);
            $('span#lct-store-name').text(storeJSON.ADDR1)
            $('h4.store-title').text(storeJSON.BRAND + ' at ' + storeJSON.ADDR1 + ': store ' + storeJSON.NUMBER);
            $('div#find-it address.addr-store').html(html);
            if (storeJSON.HOURS) {
                $('div#store-hours').html('<h4>store hours</h4>' + storeJSON.HOURS);
            }
            $('img#detail-hero').attr('src', imgSrc);
            $('section#results-wrap,section#map-wrap').hide();
            $('section#details-wrap').slideDown();
            if (JY.screenWidth > 767) {
                $('html,body').animate({
                    scrollTop: ($('div#crumbs').offset().top - 219)
                }, 500);
            } else {
                $('html,body').animate({
                    scrollTop: ($('h3#details-crumbs').offset().top)
                }, 500);
            }
        }
    },
    brand_scroll: function() {
        var li, letter, gender, article, destination, count;
        $('div#brand-list-top ul.alpha-nav:visible li').each(function(index) {
            li = $(this);
            letter = li.data('id');
            gender = li.parent('ul.alpha-nav').data('gender');
            article = $('article#tabContent-' + gender);
            if (letter !== undefined) {
                count = $('article#tabContent-' + gender + ' div#alpha-' + letter.toUpperCase() + ' a').length;
                if (count < 1) {
                    $('article#tabContent-' + gender + ' div#alpha-' + letter.toUpperCase()).hide();
                    li.addClass('inactive');
                }
            }
        });
        $('div#brand-list-top ul.alpha-nav li').click(function() {
            if ($(this).hasClass('inactive')) {
                return false;
            }
            li = $(this);
            letter = li.data('id');
            gender = li.parent('ul.alpha-nav').data('gender');
            article = $('article#tabContent-' + gender);
            destination = article.find('div#alpha-' + letter.toUpperCase());
            $('html, body').animate({
                scrollTop: (destination.offset().top - 280)
            }, 500);
        });
    },
    tweets: {
        moveTweets: function() {
            var list = $('ul#feedList');
            var first = $('ul#feedList li:first')
            first.slideUp(300, function() { first.show().appendTo($('ul#feedList')); });
            list.css('top', '0px')
            UTILS.tweets.rotateTweets(5000);
        },
        rotateTweets: function(time) {
            setTimeout(UTILS.tweets.moveTweets, time)
        }
    },
    zoomMove: function(e) {
        var mouseYPercent = (e.pageY - $('#zoom-wrap').offset().top) / $('#zoom-wrap').height();
        var mouseXPercent = (e.pageX - $('#zoom-wrap').offset().left) / $('#zoom-wrap').width();
        var imgHeight = .9 * $('img#imgZoom').height();
        var imgWidth = .9 * $('img#imgZoom').width();
        $('img#imgZoom').css({ 'top': 0 - imgHeight * (mouseYPercent / 1.8),
            left: 0 - imgWidth * (mouseXPercent / 1.8)
        });
    },
    hideZoom: function() {
        $('img#imgZoom').bind('click', function() {
            $('div#zoom-wrap').fadeOut();
            $('a#lnk-zoom').removeClass('zoomed');
        });
    },
    setScreenSize: function() {
        var winWidth = $(window).width();
        if (winWidth > 480 && winWidth <= 768) {
            JY.screenWidth = 768;
        } else if (winWidth > 320 && winWidth <= 480) {
            JY.screenWidth = 480;
        } else if (winWidth <= 320) {
            JY.screenWidth = 320;
        } else {
            JY.screenWidth = 960;
        }
    },
    setBrand: function() {
        if ($('body').hasClass('shi')) { JY.brand = 'SHI'; }
    },
    setupLabel: function() {
        if ($('.label_check input').length) {
            $('.label_check').each(function() {
                $(this).removeClass('c_on');
            });
            $('.label_check input:checked').each(function() {
                $(this).parent('label').addClass('c_on');
            });
        };
        if ($('.label_radio input').length) {
            $('.label_radio').each(function() {
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function() {
                $(this).parent('label').addClass('r_on');
            });
        };
    },
    hideNavTimeout: null,
    hideNavTimeoutClear: function() {
        clearTimeout(UTILS.hideNavTimeout);
    },
    showSubnavs: function(theNav) {
        //clearTimeout(UTILS.hideNavTimeout);
        $('div.subnav-wrap').hide();
        $('div#subnav-wrap-' + theNav).show();
        $('section#subnav-options-wrapper').slideDown();
    },
    startHideNavs: function() {
        UTILS.hideNavTimeout = setTimeout(function() { UTILS.hideSubnavs(); }, 300);
    },
    hideSubnavs: function() {
        $('section#subnav-options-wrapper').slideUp();
        $('div.subnav-wrap').hide();
        UTILS.hideNavTimeoutClear();
    },
    hideMiniCartTimeout: null,
    hideMiniCartTimeoutClear: function() {
        clearTimeout(UTILS.hideMiniCartTimeout);
    },
    showMiniCart: function() {
        $('div#mini-cart-wrap').slideDown();
    },
    startHideMiniCart: function() {
        UTILS.hideMiniCartTimeout = setTimeout(function() { UTILS.hideMiniCart(); }, 300);
    },
    hideMiniCart: function() {
        $('div#mini-cart-wrap').slideUp();
    },
    sortCart: function(a,b){
        return (b.cartID - a.cartID);
    },    
    drawMiniCart: function(minicart, slideIt) {
        var html = '';
        var qty = 0, showingText='', items='items';
        var cheatCart = minicart;
        for (var i = 0; i < minicart.products.length; i++){
            qty += parseInt(minicart.products[i].prodQty);
        }
        var sorted = minicart.products.sort(UTILS.sortCart);
        cheatCart.products = sorted;
        for (var i = 6; i < cheatCart.products.length ; i++){
            cheatCart.products.splice([i], 1);
        }
        if ( cheatCart.products.length == 1 ){ items = 'item'; }
        showingText = '<div class="mini-cart-info">Showing ' + cheatCart.products.length + ' of ' + qty + ' ' + items + '. </div>'
        //console.log('length: ', minicart.products.length);
        $.ajax({
            url: '/assets/templates/mini-cart.html',
            cache: false,
            success: function(template) {
                html = Mustache.to_html(template, cheatCart);
                $('div#mini-cart-wrap').html(html);
                $('ul#mini-cart-items li:last').css('border', 'none');
                $('span#mini-cart-qty').text(qty);
                if ( qty > 6 ){
                   $('ul#mini-cart-items').before(showingText); 
                }
            },
            error: function(a, b, c) {
                window.log('draw minicart error', a, b, c);
            }
        });
        if (slideIt) {
            UTILS.showMiniCart();
        }
    },
    hideLoginTimeout: null,
    hideLoginTimeoutClear: function() {
        clearTimeout(UTILS.hideLoginTimeout);
    },
    showLogin: function() {
        $('div#site-login').slideDown();
        $('a#lnk-login').addClass('active');
    },
    startHideLogin: function() {
        UTILS.hideLoginTimeout = setTimeout(function() { UTILS.hideLogin(); }, 300);
    },
    hideLogin: function() {
        $('div#site-login').slideUp();
        $('a#lnk-login').removeClass('active');
    },
    homeHeroSlide: function(slideWhat) {
        slideWhat.flexslider({
            animation: 'slide',             //String: Select your animation type, "fade" or "slide"
            slideDirection: 'horizontal',   //String: Select the sliding direction, "horizontal" or "vertical"
            slideshow: true,                //Boolean: Animate slider automatically
            slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
            animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
            directionNav: false,            //Boolean: Create navigation for previous/next navigation? (true/false)
            controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
            keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
            mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
            prevText: '',           		//String: Set the text for the "previous" directionNav item
            nextText: '',               	//String: Set the text for the "next" directionNav item
            pausePlay: false,               //Boolean: Create pause/play dynamic element
            pauseText: '',             		//String: Set the text for the "pause" pausePlay item
            playText: '',               	//String: Set the text for the "play" pausePlay item
            randomize: false,               //Boolean: Randomize slide order
            slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
            animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
            pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
            pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
            controlsContainer: '',          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
            manualControls: '',             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
            start: function() { },            //Callback: function(slider) - Fires when the slider loads the first slide
            before: function() { },           //Callback: function(slider) - Fires asynchronously with each slider animation
            after: function() { },            //Callback: function(slider) - Fires after each slider animation completes
            end: function() { }               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
        });
    },
    homeFeatSlide: function(slideWhat) {
        slideWhat.flexslider({
            animation: 'slide',
            slideDirection: 'horizontal',
            slideshow: false,
            controlNav: false
        });
    },
    homeTabs: function() {
        $('nav#home-tab-nav a').click(function(e) {
            e.preventDefault();
            var showMe = $(this).data('tab');
            var pos = $('nav#home-tab-nav').offset();
            $('nav#home-tab-nav a').removeClass('active');
            $(this).addClass('active');
            $('article.tab-wrap').hide().removeClass('active-tab');
            $('article#' + showMe).show().addClass('active-tab');
            $('html,body').animate({ scrollTop: $('header#hdr-home-tabs').offset().top - 180 }, 200, 'easeInQuad');
        });
    },
    productsBrandSlide: function(slideWhat) {
        slideWhat.flexslider({
            animation: 'slide',
            slideDirection: 'horizontal',
            slideshow: false,
            controlNav: false
        });
    },
    isEmptyObject: function(obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    },
    roundNumber: function(num, dec) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    },
    updateShipSubtotal: function() {
        var itemsTotal = 0;
        var thisPrice = 0;
        var shipTotal = parseFloat($('span#lblTotalShipping').text().replace('$', ''));
        var promoTotal = parseFloat($('span#lblTotalDiscount').text().replace('$', ''));
        var subtotal = 0;
        $('div#cart-products li').each(function() {
            thisPrice = parseFloat($(this).find('div.product-price').text().replace('$', '').replace(',',''));
            itemsTotal = thisPrice + itemsTotal;
        });
        subtotal = itemsTotal + shipTotal - promoTotal;
        subtotal = UTILS.roundNumber(subtotal, 2);
        $('span#lblSubTotal').text('$' + subtotal);
    },
    submitForgotPass: function() {
        var email = $('input#txt-forgot-pass-email').val();
        var foundEmail = false; //should be set to false, make it true when email actually sends
        $.ajax({
            data: 'user=' + email,
            url: '/ajx/forgotpassword.aspx',
            dataType: 'json',
            success: function(data) {
                $('p#initial-text').slideUp();
                foundEmail = data.found;
                if (foundEmail) {
                    UTILS.forgotPassEmail = email;
                    $('div#forgot-email-controls,input#txt-forgot-pass-email,div#actions-email,p#forgot-hint-fail').hide();
                    $('label#lbl-hint-question').text(data.question);
                    $('div#forgot-login-hint,div#actions-hint').show();
                } else {
                    $('p#forgot-email-fail').show();
                }
            },
            error: function(a, b, c) {
                window.log('error getting password', a, b, c);
            }
        });
    },
    submitForgotHint: function() {
        var hintAnswer = $('input#txt-forgot-hint-answer').val();
        var sent = false; //should be set to false, make it true when email actually sends
        $.ajax({
            data: 'user=' + UTILS.forgotPassEmail + '&hintAnswer=' + hintAnswer,
            url: '/ajx/forgotpassword.aspx',
            dataType: 'json',
            success: function(data) {
                if (data.correctAnswer) {
                    $('span#span-forgot-email').text('"' + UTILS.forgotPassEmail + '"');
                    $('p#forgot-email-success').slideDown();
                    $('div#forgot-email-controls,div#forgot-login-hint,div#actions-email,a#btn-submit-hint').hide();
                    $('a#btn-ok-forgot-pass').show();
                } else {
                    $('p#forgot-hint-fail').show();
                }
            },
            error: function(a, b, c) {
                window.log('error getting hint question', a, b, c);
            }
        });
    },
    addToCart: function(qs) {
        var sku;
        $('div#msg-add-cart,div#qs-msg-add-cart').hide();
        if (qs) {
            sku = $('select#selQSSize option:selected').val();
        } else {
            sku = $('ul#size-list').find('a.chosen').data('size');
        }
        if (sku === undefined || sku == '') {
            if (qs) {
                $('div#qs-msg-add-cart').addClass('error').removeClass('success').text('please select a size').slideDown();
            } else {
                $('div#msg-add-cart').addClass('error').removeClass('success').text('please select a size').slideDown();
            }
            return;
        }
        $.ajax({
            data: 'oid=' + sku,
            url: '/ajx/getminicart.aspx',
            dataType: 'json',
            success: function(data) {
                if (data.message == 'added') {
                    if (qs) {
                        $('div#qs-msg-add-cart').addClass('success').removeClass('error').text('added ' + $('h3#qs-title').text() + ' to your cart').show();
                        setTimeout(function(){$('a#btn-close-qs').click();}, 3000);
                    } else {
                        $('div#msg-add-cart').addClass('success').removeClass('error').text('added ' + $('h2#product-title').text() + ' to your cart');
                    }
                } else {
                    $('div#msg-add-cart,div#qs-msg-add-cart').addClass('error').removeClass('success').text('there was an error adding the item to your cart').slideDown();
                }
                UTILS.drawMiniCart(data.cart, true);
            },
            error: function(a, b, c) {
                window.log('error adding to cart', a, b, c);
            }
        })
    },
    addToWishlist: function() {
        var sku;
        $('div#msg-add-cart').hide();
        sku = $('ul#size-list').find('a.chosen').data('size');
        if (sku === undefined) {
            $('div#msg-add-wishlist').addClass('error').removeClass('success').html('<p>please select a size</p>').slideDown();
            return;
        }
        $.ajax({
            data: 'oid=' + sku,
            url: '/ajx/addtowishlist.aspx',
            dataType: 'json',
            success: function(data) {
                if (data.addSucceeded) {
                    $('div#msg-add-wishlist').hide();
                    $('div#modal-cover,div#modal-wl-added').show();
                    $('html,body').animate({ scrollTop: $('body').offset().top }, 300, 'easeInQuad');
                } else {
                    $('div#msg-add-wishlist').addClass('error').removeClass('success').html('<p>you must be a registered customer and logged in to add items to your wishlist.</p>').slideDown();
                }
            },
            error: function(a, b, c) {
                window.log('error adding to wishlist', a, b, c);
            }
        });
    },
    drawStoreList: function(stores) {
        //console.log(stores);
        $.ajax({
            url: '/assets/templates/store-listing.html',
            cache: false,
            success: function(template) {
                html = Mustache.to_html(template, stores);
                $('div#store-listings').html(html);
            },
            error: function(a, b, c) {
                window.log('draw stores error', a, b, c);
            }
        });
    },
    rotateIt: function(doc) {
        var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
        function fix() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, fix, true);
        }
        if ((meta = meta[meta.length - 1]) && addEvent in doc) {
            fix();
            scales = [.25, 1.6];
            doc[addEvent](type, fix, true);
        }
    },
    quickShop: function(json, open) {
        if (json.product !== undefined) {
            var html = null;
            $.ajax({
                url: '/assets/templates/quick-shop.html',
                cache: false,
                success: function(template) {
                    html = Mustache.to_html(template, json.product);
                    $('div#modal-qs-wrap').html(html);
                    if (!open) {
                        $('div#modal-quickshop').dialog({
                            modal: true,
                            height: 440,
                            width: 550,
                            position: ['center', 'center'],
                            dialogClass: 'modal-quickshop'
                        });
                    }
                },
                error: function(a, b, c) {
                    window.log('draw quickshop error', a, b, c);
                }
            });
            $('a#btn-close-qs').click(function(e) {
                e.preventDefault();
                $('div#modal-quickshop').dialog('close');
            });
        } else {

        }
    },
    gigyaLoginHandler: function(eventObj) {
        $.ajax({
            url: '/ajx/gigya.aspx',
            cache: false,
            data: 'email=' + eventObj.user.email + '&provider=' + eventObj.provider + '&firstName=' + eventObj.user.firstName + '&lastName=' + eventObj.user.lastName,
            dataType: 'json',
            success: function(message) {
                if (message.success == 'false') {
                    alert('unable to log in with ' + eventObj.provider + '. please log in with your journeys site credentials.');
                } else {
                    if (window.location.pathname.search('/checkout/login.aspx') >= 0) {
                        window.location = '/checkout/shipping.aspx';
                    } else if (window.location.pathname.search('/account/login.aspx') >= 0) {
                        window.location = '/account/index.aspx';
                    }
                }
            },
            error: function(a, b, c) {
                window.log('gigya login error', a, b, c);
            }
        });
        ////        console.log(eventObj);
        ////        window.log(eventObj.context.str + ' ' + eventObj.eventName + ' to ' + eventObj.provider + '! ' + eventObj.provider + ' user ID: ' +  eventObj.user.identities[eventObj.provider].providerUID);
        ////        window.log('Your UID: ' + UID + '\n timestamp: ' + timestamp + '\n signature: ' + signature + '\n Your UID encoded: ' + encodedUID);
        ////        UTILS.verifyTheSignature(eventObj.UID, eventObj.timestamp, eventObj.signature);
        //        // Check whether the user is new by searching if eventObj.UID exists in your database
        //        var newUser = true; // lets assume the user is new
        //        
        //        if (newUser) {
        //            // 1. Register user 
        //            // 2. Store new user in DB
        //            // 3. link site account to social network identity
        //            //   3.1 first construct the linkAccounts parameters
        //            var dateStr = Math.round(new Date().getTime()/1000.0); // Current time in Unix format
        //																//(i.e. the number of seconds since Jan. 1st 1970)
        //			
        //            var siteUID = '1'; // siteUID should be taken from the new user record
        //                                               // you have stored in your DB in the previous step
        //            var yourSig = UTILS.createSignature(siteUID, dateStr);

        //            var params = {
        //                siteUID: siteUID, 
        //                timestamp:dateStr,
        //				cid:'',
        //                signature:yourSig
        //            };
        //            
        //            //   3.1 call linkAccounts method:
        //            gigya.socialize.notifyRegistration(params);
        //        }
    },
    gigyaLogoutHandler: function(eventObj) {
        window.log('signed out');
    },
    createSignature: function(UID, timestamp) {
        encodedUID = encodeURIComponent(UID);
        return '';
    },
    verifyTheSignature: function(UID, timestamp, signature) {
        encodedUID = encodeURIComponent(UID);
    },
    logoutFromGS: function() {
        gigya.services.socialize.logout(); // logout from Gigya platform
    }
}
jQuery(function() {
    $ = jQuery;
    UTILS.loadEvents();
});

//temporary until myBuys removes it from their calls
function hoverEffect() {}