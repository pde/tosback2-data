HN.Home = new function () {
    var self = this;
    var bannerConfigs = [];
    var waitBannerLoaded = true;
    var allBannerAreLoaded = true;
    var inInitialRunning = false;
    var loopHotSpotEffect = false;
    var showBannerPaging = false;
    var showBannerSlideControls = true;
    var bannerInSliding = false;
    var toutInSliding = false;

    var queues = [];
    var banners = [];
    var navigateQueues = [];
    var navigateQueueInterval = null;
    var lastToutInWaitingSlide = null;
    var stopSlideCallBack = null;
    var carouselHdl = null;


    this.addBannerConfig = function (id, data) {

        bannerConfigs[id] = data;
        if (id == 'config') {
            waitBannerLoaded = bannerConfigs[id]['checkLoadedBannersBeforeSliding'];
            loopHotSpotEffect = bannerConfigs[id]['loopHotSpotEffect'];
            showBannerPaging = bannerConfigs[id]['showBannerPaging'];
            showBannerSlideControls = bannerConfigs[id]['showBannerSlideControls'];
        }

    }

    this.waitUntilAllBannerLoaded = function (content) {
        allBannerAreLoaded = false;
        var lis = $("li", content);
        var totalBanner = lis.length;
        var countBannerLoaded = 0;

        if (banners.length == 0) {

            lis.each(function (i) {
                var $bannerImage = $(this).find("> img");
                if ($bannerImage.length == 0) {
                    var imagePath = $(this).css('background-image').replace(/url\(['"]?([^\)'"]+)['"]?\)/, "$1");

                    $bannerImage = $('<img/>').attr('src', imagePath);
                }

                banners.push($bannerImage);
            });
        }

        for (var i = 0; i < banners.length; i++) {
            var $img = banners[i];
            if ($img.length > 0) {
                if ($img[0].complete == 'true' || $img[0].complete == true) {

                    countBannerLoaded++
                } else {
                    $img.load(function () {

                        countBannerLoaded++
                    });
                }
                

            }
        }



        var bannerLoadedInterval = null;

        bannerLoadedInterval = window.setInterval(function () {
            if (countBannerLoaded >= 1) {
                window.clearInterval(bannerLoadedInterval);
                allBannerAreLoaded = true;
            }
        }, 500);



    }

    this.extractId = function (lastSeparateChar, elementId) {

        var id = '';
        var pos = elementId.lastIndexOf(lastSeparateChar);
        var length = elementId.length;
        if (pos != -1) {
            id = elementId.substr(pos + 1, length - pos);
        }
        return id;
    }


    this.showBannerPaging = function (idx, content, navigateTo) {

        var $parent = content.parent();
        var $item = content.find(">*:eq(" + idx + ")");
        var currentIdx = HN.Home.extractId('-', $item.attr('id'));
        var lis = content.find('> li').not('li[id*="copy"]');
        var totalRealBanner = 0;
        if (lis.length > 0)
            totalRealBanner = lis.length;

        var spotPagingContainer = $('#spotPagingContainer');
        var spotControl = null;
        if (spotPagingContainer.length > 0) {

            spotPagingContainer.hover(function (e) {
                e.stopPropagation();
            }, function (e) { });


            var spotControlHtml = '<div class="spot_slider_control">';
            spotControlHtml += '</div>';

            spotPagingContainer.append(spotControlHtml);
            spotControl = spotPagingContainer.find('.spot_slider_control');

        }

        var spotControlWidth = 0;
        if (spotControl != null && spotControl.length > 0) {

            for (var i = 0; i < totalRealBanner; i++) {

                if (currentIdx == i) {
                    var spot = $('<div id="spot-' + i + '" class="spot actived"><a href="javascript:void(0);"></a></div>');
                } else {
                    var spot = $('<div id="spot-' + i + '" class="spot"><a href="javascript:void(0);"></a></div>');
                }

                spot.bind('click', function () {
                    var idx = HN.Home.extractId('-', $(this).attr('id'));
                    //console.log('bannerInSliding :' + bannerInSliding);

                    navigateQueues.push(idx);
                    if (navigateQueueInterval == null) {
                        navigateQueueInterval = window.setInterval(function () {
                            if (navigateQueues.length == 0) {
                                window.clearInterval(navigateQueueInterval);
                                navigateQueueInterval = null;
                            } else {
                                if (!bannerInSliding) {
                                    navigateTo(navigateQueues.pop());
                                }
                            }
                        }, 50);
                    }


                });


                spotControl.append(spot);
                spotControlWidth += spot.outerWidth(true);

                if ($.browser.msie && $.browser.version == 6) {
                    spotControlWidth += 20;
                }


            }
            spotControl.css({ 'width': spotControlWidth });
        }


    }

    this.closeLegalTooltip = function () {
        var $tooltipContent = $('.tooltip-content');
        $tooltipContent.data('hover', false);
        $tooltipContent.slideUp();
    }

    this.showLegalTooltip = function () {
        var touchy = (/iphone|ipod|ipad|android/i).test(navigator.userAgent);
        var $tooltipContent = $('.tooltip-content');
        $tooltipContent.find('.close').click(function () {
            HN.Home.closeLegalTooltip();
        });
        $tooltipContent.data('hover', false);

        $('.tooltip-legal').each(function () {
            var $this = $(this);
            var $parent = $this.parent();

            $(this).hover(function () {


                clearTimeout($(this).data('leave'));
                $(this).data('enter', setTimeout(function () {

                    $this.addClass('tooltip-legal-hover');
                    var $style = $parent.find('.tooltip-style');
                    var $text = $parent.find('.tooltip-text');
                    var top = $parent.position().top;
                    var left = $parent.position().left;

                    var style = eval('(' + $style.val() + ')');

                    top = top + style.t;
                    left = left + style.l;
                    if (touchy)
                        left -= 130;

                    $tooltipContent.css({ width: style.w, top: top, left: left, 'opacity': '0.8', 'filter': '' })
                    $tooltipContent.find('.content').html($text.val());
                    $tooltipContent.slideDown();


                }, 100));




            }, function () {


                clearTimeout($(this).data('enter'));

                $(this).data('leave', setTimeout(function () {
                    if ($tooltipContent.data('hover'))
                        return;
                    HN.Home.closeLegalTooltip();

                }, 500));




            });
        });


        $tooltipContent.hover(function () {
            $tooltipContent.data('hover', true);

        }, function () {
            $tooltipContent.data('hover', false);
            HN.Home.closeLegalTooltip();
        });

    }

    this.toggleBannerSlideControls = function (content) {
        var $parent = content.parent();
        var $sliderControl = $parent.find('.slider_controls');

        if ($sliderControl.length > 0) {

            if (showBannerSlideControls) {
                $sliderControl.show();
            } else {
                $sliderControl.hide();
            }
        }

    }

    this.startAutoSlide = function () {
        if (self.carouselHdl != null)
            self.carouselHdl.trigger('notify.startAutoSlide');
    }

    this.stopAutoSlide = function () {
        if (self.carouselHdl != null)
            self.carouselHdl.trigger('notify.stopAutoSlide');
    }

    this.initialBannerSlide = function (carouselHdl, idx, content, navigateTo, stopSlide) {

        self.carouselHdl = carouselHdl;
        navigateTo = navigateTo || function () { };
        stopSlideCallBack = stopSlide || function () { };

        if (inInitialRunning) {
            if (allBannerAreLoaded) {
                inInitialRunning = false;

                return true;
            } else {
                return false;
            }
        } else {

            inInitialRunning = true;
            allBannerAreLoaded = true;

            HN.Home.toggleBannerSlideControls(content);

            if (showBannerPaging) {
                HN.Home.showBannerPaging(idx, content, navigateTo);
            }


            if (waitBannerLoaded) {
                HN.Home.waitUntilAllBannerLoaded(content);
            }

            HN.Home.showLegalTooltip();


            if (allBannerAreLoaded) {


                var $item = content.find(">*:eq(" + idx + ")");
                var bannerConfig = $('input[name="banner-config"]');
                if (bannerConfig.length > 0) {
                    HN.Home.runHotSpotEffect($item, bannerConfig.val());
                }
                inInitialRunning = false;
                return true;
            } else {

                var initialInterval = window.setInterval(function () {
                    if (allBannerAreLoaded) {

                        window.clearInterval(initialInterval);
                        var $item = content.find(">*:eq(" + idx + ")");
                        var bannerConfig = $('input[name="banner-config"]', $item);
                        if (bannerConfig.length > 0) {
                            HN.Home.runHotSpotEffect($item, bannerConfig.val());
                        }
                    }
                }, 200);

            }
            return false;

        }
    }



    this.beforeBannerSlide = function (idxFrom, idxTo, dispItems, content) {

        bannerInSliding = true;
        var $item = content.find(">*:eq(" + idxFrom + ")");
        var $nextItem = content.find(">*:eq(" + idxTo + ")");
        var currentIdx = HN.Home.extractId('-', $item.attr('id'));

        // remove all effect if they are running

        if (loopHotSpotEffect) {
            var $content = $item.find("> div");
            var spots = $content.find("> div");
            spots.hide();

            $content = $nextItem.find("> div");
            spots = $content.find("> div");
            spots.hide();
        }

        if (loopHotSpotEffect) {
            for (var i = 0; i < queues.length; i++) {
                if (jQuery.fxqueue(queues[i]).name != undefined) {
                    jQuery.fxqueue(queues[i]).stop();
                }
            }

            for (var i = 0; i < queues.length; i++) {
                HN.Home.removeItemFromArray(queues[i], queues);
            }

        }



        if (showBannerPaging) {
            //var $parent = content.parent();
            var spotControl = $('.spot_slider_control');
            if (spotControl.length > 0) {
                var spots = spotControl.find('.spot');

                var activedSpot = $(spots[currentIdx]);
                if (activedSpot.length > 0 && activedSpot.hasClass('actived'))
                    activedSpot.removeClass('actived');
            }
        }

        HN.Home.closeLegalTooltip();

    }


    this.afterBannerSlide = function (idx, content) {

        var needRunEffect = false;
        var $item = content.find(">*:eq(" + idx + ")");
        var currentIdx = HN.Home.extractId('-', $item.attr('id'));

        if (showBannerPaging) {
            //var $parent = content.parent();
            var spotControl = $('.spot_slider_control');
            if (spotControl.length > 0) {
                var spots = spotControl.find('.spot');
                var activedSpot = $(spots[currentIdx]);
                if (activedSpot.length > 0 && !activedSpot.hasClass('actived'))
                    activedSpot.addClass('actived');
            }
        }


        if (loopHotSpotEffect) {
            needRunEffect = true;
        } else {
            var div = $item.find("> div:eq(0)");
            if (div.css('display') == 'none') {

                needRunEffect = true;
            }
        }

        if (needRunEffect) {
            var bannerConfig = $('input[name="banner-config"]', $item);
            if (bannerConfig.length > 0) {
                HN.Home.runHotSpotEffect($item, bannerConfig.val());
            }
        }

        bannerInSliding = false;

    }




    this.removeItemFromArray = function (removeItem, arr) {
        arr = jQuery.grep(arr, function (value) {
            return value != removeItem;
        });

        return arr;
    }


    this.runHotSpotEffect = function (banner, configCls) {

        var queueName = 'hotSpotQueue';
        var queue = 'global';


        if (bannerConfigs[configCls] == undefined)
            return;

        var hotspotsConfig = bannerConfigs[configCls]['hotspots'];




        for (var i = 0; i < hotspotsConfig.length; i++) {
            var hotspotConfig = hotspotsConfig[i];
            var $hotspot = $('.' + hotspotConfig.cls, banner)

            queue = 'global';
            if (hotspotConfig.effectGroup != undefined)
                queue = hotspotConfig.effectGroup;

            if ($.inArray(queue, queues) == -1) {
                queues.push(queue);
            }


            switch (hotspotConfig.effect) {
                case 'slideFade':
                    $hotspot.css({ left: hotspotConfig.startX, top: hotspotConfig.startY });
                    $hotspot.animate(
                        { opacity: 'toggle', left: hotspotConfig.endX, top: hotspotConfig.endY },
                        { speed: hotspotConfig.speed,
                            easing: 'easeOutBounce',
                            queue: queue,
                            preDelay: hotspotConfig.nextPreDelay
                        });
                    break;
                case 'fadeOut':
                    $hotspot.css({ left: hotspotConfig.endX, top: hotspotConfig.endY });


                    $hotspot.fadeOut({
                        duration: hotspotConfig.speed,
                        queue: queue,
                        preDelay: hotspotConfig.nextPreDelay
                    });


                    break;
                case 'fadeIn':
                    $hotspot.css({ left: hotspotConfig.endX, top: hotspotConfig.endY });
                    //$hotspot.css('filter', 'none');
                    //console.log(queue);
                    $hotspot.fadeIn({
                        duration: hotspotConfig.speed,
                        queue: queue,
                        preDelay: hotspotConfig.nextPreDelay
                    });



                    break;

            }


        }


        for (var i = 0; i < queues.length; i++) {

            if (jQuery.fxqueue(queues[i]).name != undefined) {

                jQuery.fxqueue(queues[i]).start();
            }
        }

    }

    this.printBannerConfigs = function () {
        console.log(bannerConfigs);
    }

    this.closeZipCodeDialog = function () {
        var $container = $('#homeBannerContainer');
        var dialogID = 'zipcodeDialog';
        var $dialog = $container.find('#' + dialogID);
        if ($dialog.length > 0) {
            $dialog.hide();
        }
    }

    this.confirmZipcode = function () {
        var $container = $('#homeBannerContainer');
        var dialogID = 'zipcodeDialog';
        var $dialog = $container.find('#' + dialogID);

        if ($dialog.length > 0) {
            var $zipInput = $('input[class="postal_code"]', $dialog);

            if (!IC.Validator.validate('postalCode.us.short', $zipInput.val()) || !IC.Validator.validate('required', $zipInput.val())) {
                return;
            }

            var $vehicleInput = $('input[class="vehicle_model"]', $dialog);
            var params = '';
            if ($vehicleInput.val() != '')
                params += 'vehicle=' + $vehicleInput.val() + '&';

            params += 'zipcode=' + $zipInput.val();
            window.top.location = '/financial-tools/special-offers.aspx?' + params;
        }
    }

    this.findSpecialOffer = function () {
        var $container = $('#homeBannerSliderViewPort');
        var $zipInput = $('input[class*="postal_code"]', $container);

        if (!IC.Validator.validate('postalCode.us.short', $zipInput.val()) || !IC.Validator.validate('required', $zipInput.val())) {
            return;
        }



        var params = 'zipcode=' + $zipInput.val();
        window.top.location = '/financial-tools/special-offers.aspx?' + params;


    }

    this.addZipCodeValidator = function () {

        var $postal_code_inputs = $('#homeBannerSliderViewPort .postal_code, .main_page_nav .postal_code');
        /*var defaultText = $('input.postal_code', $container).val();*/
        if ($postal_code_inputs.length == 0)
            return;


        $postal_code_inputs.each(function () {
            $(this).data('defaultText', $(this).val());
            if (HN.getPostalCode != undefined) {
                if (HN.getPostalCode()) {
                    $(this).val(HN.getPostalCode());
                    if (IC.Validator.validate('postalCode.us.short', $(this).val()) && IC.Validator.validate('required', $(this).val())) {
                    }
                }
            }

        }).bind('keypress', function (e) {
            var code = e.keyCode ? e.keyCode : e.which;
            if (code != 8 && code != 46 && code != 35 && code != 36) {

                if (!IC.Validator.validate('maxLength', $(this).val(), 4))
                    e.preventDefault();

                if (!IC.Validator.validate('numeric', String.fromCharCode(code))) {
                    e.preventDefault();
                }
            }


        }).bind('keyup', function (e) {
            if (IC.Validator.validate('postalCode.us.short', $(this).val()) && IC.Validator.validate('required', $(this).val())) {

                if (HN.setPostalCode != undefined) {
                    HN.setPostalCode($(this).val());
                }

            }
        }).bind('focus', function (e) {
            if ($(this).val() == $(this).data('defaultText')) {
                $(this).val('');
            }
            if (stopSlideCallBack != undefined)
                stopSlideCallBack();

            $(this).addClass('input_focus');
        }).bind('blur', function (e) {
            if ($(this).val() == '') {
                $(this).val($(this).data('defaultText'));
            }
            $(this).removeClass('input_focus');
        });

    }

    this.openZipCodeDialog = function (vehicleModel, offsetObjId) {

        var $container = $('#homeBannerContainer');
        var dialogID = 'zipcodeDialog';
        var $dialog = $container.find('#' + dialogID);

        if ($dialog.length == 0) {

            var dialogHtml = '';
            dialogHtml += '<div id="zipcodeDialog" class="zipcodeDialog enter_zip_code" style="position:absolute;">';
            dialogHtml += '<a href="javascript:void(0)" class="close_button" onclick="javascript:HN.Home.closeZipCodeDialog();">X</a>';
            dialogHtml += '<p class="content">You can find special offers or rebates for your area</p>';
            dialogHtml += '<div class="error_summary" style="display: none;"><p></p></div>';
            dialogHtml += '<input type="hidden" value="" class="vehicle_model"/>';
            dialogHtml += '<label for="zip_code">ZIP CODE:</label><br /><input type="number" class="postal_code" value=""/>';
            dialogHtml += '<input type="button" value="GO" class="go_button" onclick="javascript:HN.Home.confirmZipcode();"><span class="zip_code_action_indicator"></span>';
            dialogHtml += '</div>';
            $dialog = $(dialogHtml);

            //$dialog.css({position:'absolute', 'top':'20%', 'left':'40%'});
            $container.append($dialog);
            $container.css({ position: 'relative' });


            var $go = $('.go_button', $dialog);
            $go.attr('disabled', true);

            $('input.postal_code', $dialog).each(function () {
                if (HN.getPostalCode != undefined) {

                    if (HN.getPostalCode()) {
                        $(this).val(HN.getPostalCode());
                        if (IC.Validator.validate('postalCode.us.short', $(this).val()) && IC.Validator.validate('required', $(this).val())) {
                            $go.attr('disabled', false);
                        }
                    }

                 }

            }).bind('keypress', function (e) {
                var code = e.keyCode ? e.keyCode : e.which;
                if (code != 8 && code != 46 && code != 35 && code != 36) {

                    if (!IC.Validator.validate('maxLength', $(this).val(), 4))
                        e.preventDefault();

                    if (!IC.Validator.validate('numeric', String.fromCharCode(code))) {
                        e.preventDefault();
                    }
                }


            }).bind('keyup', function (e) {
                if (IC.Validator.validate('postalCode.us.short', $(this).val()) && IC.Validator.validate('required', $(this).val())) {
                    $go.attr('disabled', false);
                } else {
                    $go.attr('disabled', true);
                }
            });

        }

        if ($('#' + offsetObjId, $container).length > 0) {
            var offset = $('#' + offsetObjId, $container).offset();
            //console.log($dialog.width());
            //console.log($dialog.height());
            var dlgLeft = offset.left - $dialog.width() - 10;
            var dlgTop = offset.top - ($dialog.height() / 2);
            $dialog.css({ position: 'absolute', 'top': dlgTop + 'px', 'left': dlgLeft + 'px' });
        } else {
            $dialog.css({ position: 'absolute', 'top': '20%', 'left': '42%' });
        }

        $('input[class="vehicle_model"]', $dialog).val(vehicleModel);
        $dialog.show();

    }

    this.openVideoBox = function ($content, $title, $height, $width) {
        var touchy = (/iphone|ipod|ipad|android/i).test(navigator.userAgent);
        if (touchy) {
            HN.Video.openYoutubeDialog('youtubeDialog', $title, $content, 'page', $height, $width);
        } else {
            Shadowbox.open({
                content: $content,
                player: 'swf',
                title: $title,
                height: $height,
                width: $width
            });

        }

    }

};


$(document).ready(function() {   
    HN.Home.addZipCodeValidator();
	
	// add touch detect on lazy suzan
	var $lazy_suzan = $('#families .mask');
	if($lazy_suzan.length > 0) {

		$lazy_suzan.touchwipe({
			 direction:'h',
			 wipeLeft: function() { 
				$('#tooltip').css('visibility','hidden').empty();
				$('#families .btnNext').click();
			 },
			 wipeRight: function() {
				$('#tooltip').css('visibility','hidden').empty();
				$('#families .btnPrevious').click();
			  },
			 preventDefaultEvents: false,
			 checkMinMove:true,
			 checkMoving:true
		});

	}
	

});