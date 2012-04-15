// If we haven't created the PIER1TOGO object already (for namespacing purposes)
// go ahead and create it now
if (typeof PIER1TOGO === 'undefined') {
    PIER1TOGO = {};
}

PIER1TOGO.setLocation = (function () {
    var servicePath = "/DesktopModules/Pier1ToGo/Services/StoreService.aspx/";

    var $storeDialog = null;
    var storesLoaded = false;
    var initialLat, initialLon, initialDesc = '', initialStore = '';
    var portalId;
    var productId;
    var locationChanged = false;
    var locationChangedCallBack = null;

    var GetStoresByPostal = function () {

        postalCode = $('#tbPostalCode').val();
        postalCode = postalCode.split(' ').join('').split('-').join('');
                
        if($('#OriginPortalId').val() == 'undefined'){
            portalId = $('#shoppingListWidget_shoppingWidgetPortalId').val();
        }
        

        jQuery.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: servicePath + "GetClosestStoresByPostalCode",
            data: "{'postalCode':'" + postalCode + "', 'productId':'" + productId + "', 'portalId':'" + portalId + "'}",
            dataType: "json",
            complete: function () {
                PIER1TOGO.addLoader.remove({
                    $el: $('#btnCheckPostalCode'),
                    blocked: true
                });
            },
            success: function (msg) {

                if (msg.d.Message) {
                    $('#setLocationMessage').html(msg.d.Message).css('display', 'block');
                }

                if (!msg.d.IsError) {
                    $('#inputLocation').hide().find('input:text').val('');
                    $('#geoLabel').html(postalCode);
                    $('#storeDetailsContainer').show();
                    $('#storeDetails').undelegate('a.store-hours-toggle', 'click').html(msg.d.Value).fadeIn();
                    $('#continueBrowsing').attr('value', PopupCopy.ContinueBrowsing + ' ' + postalCode);
                    StoreDetailsInit();
                    locationChanged = true;
                }
            }
        });

    }; // end GetStoresByPostal

    var GetStoresByLatLon = function (lat, lon, desc, setCookie, pageNum) {
        if (!setCookie) {
            setCookie = false;
        }

        jQuery.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: servicePath + "GetClosestStoresByLatLon",
            data: "{'latitude':'" + lat + "', 'longitude':'" + lon + "', 'description':'" + desc + "', 'setCookie':" + setCookie + ", 'productId':'" + productId + "', 'portalId':'" + portalId + "'}",
            dataType: "json",
            complete: function () {
                PIER1TOGO.addLoader.remove({
                    $el: $('#btnCheckCity'),
                    blocked: false
                });
            },
            success: function (msg) {

                if (msg.d.Message) {
                    $('#setLocationMessage').html(msg.d.Message).css('display', 'block');
                }

                if (!msg.d.IsError) {
                    $('#inputLocation').hide().find('input:text').val('');
                    $('#geoLabel').html(desc);
                    $('#storeDetailsContainer').show();
                    $('#storeDetails').undelegate('a.store-hours-toggle', 'click').html(msg.d.Value).fadeIn();
                    $('#continueBrowsing').attr('value', PopupCopy.ContinueBrowsing + ' ' + desc);

                    StoreDetailsInit();
                    locationChanged = setCookie;
                    // go to the requested page (to show the store that was clicked on, presumably)
                    $('#storeDetailsFooter div.pager a:contains(' + pageNum + ')').trigger('click');
                }
            }
        });
    }; // end GetStoresByLatLon

    var SetUpHandlers = function () {

        $('#btnCheckPostalCode').live('click', function () {
            $('#setLocationMessage').hide();

            PIER1TOGO.addLoader.add({
                $el: $(this),
                placement: 'after',
                blocked: true,
                iconOnly: true
            });

            GetStoresByPostal();
            return false;
        });

        // handle the Enter key press for the zip code textbox
        $('#tbPostalCode').keypress(function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $('#btnCheckPostalCode').click();
            }
        });

        $('#btnCheckCity').live('click', function () {
            var coords;

            if (!$(this).is(':enabled')) {
                return false;
            }

            $('#setLocationMessage').hide();
            PIER1TOGO.addLoader.add({
                $el: $(this),
                placement: 'after',
                blocked: true,
                iconOnly: true
            });

            coords = $('#hidCityCoords').val().split(",");
            GetStoresByLatLon(coords[0], coords[1], $('#tbCity').val(), true, '1');
            return false;
        });

        // switch between input methods
        $('#aSearchCityInstead').click(function () {
            $('#inputLocationPostal').hide();
            $('#inputLocationCity').show();
            $('#setLocationMessage').hide();
            return false;
        });
        $('#aSearchPostalInstead').click(function () {
            $('#inputLocationCity').hide();
            $('#inputLocationPostal').show();
            $('#setLocationMessage').hide();
            return false;
        });

        // change location button
        $("#aStoreDetailsChangeLocation").click(function () {
            $('#storeDetailsContainer').hide();
            $('#inputLocation').show();
            return false;
        });

        // "Continue browsing" button
        $("#continueBrowsing").live('click', function () {
            $storeDialog.dialog('close');
            return false;
        });

        // refresh the page when dialog is closed if the location or store was set
        $("#setLocation").bind("dialogclose", function (event, ui) {
            if (locationChanged) {
                if (locationChangedCallBack) {
                    locationChangedCallBack();
                }
                else {
                    location.reload(true);
                }
            }
        });

        // set up the city search textbox for autocomplete
        $('#tbCity').autocomplete({
            source: function (request, response) {

                $('#setLocationMessage').hide();

                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: servicePath + "GetMatchingCities",
                    //data: "{'searchTerm':'" + request.term + "'}",
                    data: "{'searchTerm':'" + request.term + "', 'portalId':'" + $('#setLocation_setLocationPortalId').val() + "'}",
                    datatype: "json",
                    success: function (msg) {

                        if (msg.d.Message) {
                            $('#setLocationMessage').html(msg.d.Message).css('display', 'block');
                        }

                        if (!msg.d.IsError) {
                            response(jQuery.map(msg.d.Value, function (item) {
                                return {
                                    label: item.City + ", " + item.State,
                                    value: item.Latitude + ',' + item.Longitude
                                }
                            }));
                        }
                    }
                });
            },
            minLength: 2,
            select: function (event, ui) {
                if (ui.item) {
                    $('#btnCheckCity').removeAttr('disabled');
                    $('#hidCityCoords').val(ui.item.value);
                    $('#tbCity').val(ui.item.label);
                }
                else {
                    $('#btnCheckCity').attr('disabled', 'disabled');
                    $('#hidCityCoords').val('');
                }
                return false;
            },
            focus: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            }
        });

    }; // end SetUpHandlers

    var StoreDetailsInit = function () {
        PIER1TOGO.paging.paginate($('#pagedStoresWrap'), $('#storeDetailsFooter'), 1, PopupCopy.PagerLabel);

        $('#storeDetails').delegate('a.store-hours-toggle', 'click', function (event) {
            event.preventDefault();
            $('#pagedStoresWrap').find('table.store-hours').toggleClass('hidden');
        });

        // show the selected button if a store is already selected
        if (initialStore) {
            $('a.storeSelector.selected[data-storeNum="' + initialStore + '"]').removeClass('hidden');
            $('a.storeSelector.unselected[data-storeNum="' + initialStore + '"]').addClass('hidden');
            var address = $('a.storeSelector.selected[data-storeNum="' + initialStore + '"]').closest('li.store').find('span.addressLine1').html();
            if (address) {
                $('#continueBrowsing').attr('value', PopupCopy.ContinueBrowsing + ' ' + address);
            }
            initialStore = null; //only do this once
        }

        // handle clicks for store selection
        $('a.storeSelector').click(function (event) {
            var storeNum, wasSelected, address;

            event.preventDefault();

            $btn = $(this);
            storeNum = $btn.attr('data-storeNum');
            wasSelected = $btn.hasClass('selected');

            if (!wasSelected) {
                // track when users select a store
                var setLocationTracker = $('#setLocationTracker').val();
                var gaAvailabilityTracker = _gat._getTracker(setLocationTracker);
                gaAvailabilityTracker._initData();
                gaAvailabilityTracker._trackEvent('Inventory', 'Select_Specific_Store_Location');
            }

            jQuery.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: servicePath + "SetSelectedStore",
                data: "{'storeNumber':'" + storeNum + "'}",
                dataType: "json",
                success: function (msg) {

                    if (msg.d.Message) {
                        $('#setLocationMessage').html(msg.d.Message).css('display', 'block');
                    }

                    if (!msg.d.IsError) {

                        // set all buttons to unselected
                        $('a.storeSelector.selected').addClass('hidden');
                        $('a.storeSelector.unselected').removeClass('hidden');

                        // set this to selected if it was unselected
                        if (!wasSelected) {
                            $('a.storeSelector.selected[data-storeNum="' + storeNum + '"]').removeClass('hidden');
                            $('a.storeSelector.unselected[data-storeNum="' + storeNum + '"]').addClass('hidden');
                            address = $('a.storeSelector.selected[data-storeNum="' + storeNum + '"]').closest('li.store').find('span.addressLine1').html();
                            if (address) {
                                $('#continueBrowsing').attr('value', PopupCopy.ContinueBrowsing + ' ' + address);
                            }
                        }
                        else {
                            $('#continueBrowsing').attr('value', PopupCopy.ContinueBrowsing + ' ' + $('#geoLabel').html());
                        }

                        locationChanged = true;
                    }
                }
            });
        });

    }; // end StoreDetailsInit

    return {

        OpenDialogToSearch: function (options) {

            var config = {
                extraCopy: null
            };

            //merge the passed in object with the defaults
            $.extend(true, config, options);

            if (config.extraCopy) {
                $('#setLocationExtraCopy').html(PopupCopy[config.extraCopy]).css('display', 'block');
            }
            else {
                $('#setLocationExtraCopy').hide();
            }

            locationChangedCallBack = config.callback;

            $('#storeDetailsContainer').hide();
            $('#inputLocation').show();
            $storeDialog.dialog('open');
        },

        OpenDialogToStores: function (options) {

            var config = {
                page: '1',
                extraCopy: null
            };

            //merge the passed in object with the defaults
            $.extend(true, config, options);

            $('#inputLocation').hide();
            $('#storeDetailsContainer').show();
            if (config.extraCopy) {
                $('#setLocationExtraCopy').html(PopupCopy[config.extraCopy]).css('display', 'block');
            }
            else {
                $('#setLocationExtraCopy').hide();
            }

            // attempt to go to the requested page (to show the store that was clicked on, presumably)
            $('#storeDetailsFooter div.pager a:contains(' + config.page + ')').trigger('click');

            $storeDialog.dialog('open');

            // stores aren't loaded until the user asks for them, and then loaded only once
            if (!storesLoaded) {
                PIER1TOGO.addLoader.add({
                    $el: $('#storeDetails'),
                    placement: 'inside',
                    blocked: false,
                    iconOnly: false
                });

                GetStoresByLatLon(initialLat, initialLon, initialDesc, false, config.page);
                storesLoaded = true;
            }



        },

        // productIdParam: productId for populating store In Stock indicator (if on a product page)
        // curX: vars set only if location cookie is set, used to load stores on first request
        Initialize: function (portalIdParam, productIdParam, curLat, curLon, curDesc, curStore) {
            initialLat = curLat;
            initialLon = curLon;
            initialDesc = curDesc;
            initialStore = curStore;
            portalId = portalIdParam;
            productId = productIdParam;

            $storeDialog = $('#setLocation')
		            .dialog({
		                autoOpen: false,
		                modal: true,
		                width: '800px',
		                draggable: true,
		                resizable: false,
		                title: PopupCopy.PopupTitle
		            });

            SetUpHandlers();
        }

    };

} ());
