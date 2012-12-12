;
$(document).on('click', '.expand', function (event){
    event.preventDefault();
    $(this).closest('.expand').nextAll('ul.sub-level:first').toggleClass('expander');
    $(this).closest('.expand').nextAll('ul.sub-level:first').find("ul:first").toggleClass('expander');
    $(this).toggleClass('gray-color');
    $(this).children('.expand-image').toggleClass('show');
    $(this).closest('.expand').nextAll('ul.sub-level:first').find('li:first > a .expand-image').toggleClass('show');
});

$(document).ready(function(){
    $('.faq-tree-item.' + (CQ_Analytics.ProfileDataMgr.getProperty('region') || "NYC")).removeClass('hidden');
});
CQ_Analytics.ClientContextUtils.onStoreRegistered('profile', function() {});

;(function($){
    "use strict";

    $.fn.geolocation = function(opts) {
        CQ_Analytics.ClientContextUtils.onStoreInitialized('profile', function() {
            if(typeof ClientContext.get('/profile/zip') === "undefined" &&
                typeof ClientContext.get('/profile/city') === "undefined" &&
                typeof ClientContext.get('/profile/state') === "undefined" &&
                typeof ClientContext.get('/profile/soaId') === "undefined" &&
                typeof ClientContext.get('/profile/region') === "undefined"){
                var geoLocation = getGeoLocationFromCookie();
                updateGeoLocationProfile(geoLocation);
            }
        }, true);

        var options = $.extend({
            cookieName: 'twc-user-profile',
            cookie: {
                path: '/',
                /* domain: 'timewarnercable.com', */
                expires: 365
            },
            geoLocationServletURI: '/bin/services/geolocation.json',
            updateOnLoad: true,
            defaultGeoLocation: {
                city:       'New York',
                state:      'NY',
                postalCode: '10019',
                soaID:      'NYC.8150',
                region:     'NYC'
            }
        }, opts);

        /* Dyamically determine domain if not defined */
        if(! options.cookie.domain && location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
            options.cookie['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
        }

        var locationEl = $(this).find('#twc-location-popup');

        function setGeoLocation() {
            var geoLocation = getGeoLocationFromCookie();

            if(hasGeoLocationCookie()) {
                if(inFootprint(geoLocation)) {
                    updateLocationHeader(buildLocationString(geoLocation));
                }
                else if(! $.cookie('locerrorclosed')) {
                    showError("oof");
                }
            }
            else {
                geoLocation = options.defaultGeoLocation;
                if(! $.cookie('locerrorclosed'))
                    showError("noc");
            }

            CQ_Analytics.CCM.addListener('configloaded', function(){console.log('configloaded'); updateGeoLocationProfile(geoLocation)}, CQ_Analytics.ProfileDataMgr);
        }

        function inFootprint(geoLocation) {
            return(geoLocation && geoLocation.region && geoLocation.region.length > 0);
        }

        function hasGeoLocationCookie() {
            return(getGeoLocationFromCookie());
        }

        function handleChangeLocation() {
            eraseCookie();
            fetchGeoLocationData();
        }

        function getGeoLocationFromCookie() {
            var geoData = jQuery.parseJSON(getCookie());

            if(geoData && typeof(geoData['city']) === 'string') {
                geoData.city = geoData.city.replace(/\+/g, ' ');
            }

            return(geoData);
        }

        function fetchGeoLocationData() {
            $.getJSON(options.geoLocationServletURI + '?zip=' + $('#locationText').val(), function(geoLocation) {
                writeGeoLocationCookie(geoLocation);
                updateGeoLocationProfile(geoLocation);
                location.reload(); // reload page so geo-aware components can initialize properly.
            }).error(function() {
                handleLocationChangeError();
            });
        }

        function handleLocationChangeError() {
            showError("geo");
        }

        function buildLocationString(geoLocation) {
            return(geoLocation ? geoLocation['city'] + ", " + geoLocation['state'] + " " + geoLocation['postalCode'] : "");
        }

        function updateLocationHeader(str) {
            if(str) {
                $('#twc-location').html(str);
            }
        }

        function updateGeoLocationProfile(geoLocation) {
            if(geoLocation) {
                CQ_Analytics.ProfileDataMgr.setProperty('city', geoLocation['city']);
                CQ_Analytics.ProfileDataMgr.setProperty('state', geoLocation['state']);
                CQ_Analytics.ProfileDataMgr.setProperty('zip', geoLocation['postalCode']);
                CQ_Analytics.ProfileDataMgr.setProperty('soaId', geoLocation['soaID']);
                CQ_Analytics.ProfileDataMgr.setProperty('region', geoLocation['region']);
            }
        }

        function writeGeoLocationCookie(locationData) {
            setCookie(JSON.stringify(locationData));
        }

        function setCookie(data) {
            $.cookie(options.cookieName, data, options.cookie);
        }

        function getCookie() {
            return($.cookie(options.cookieName));
        }

        function eraseCookie() {
            $.cookie(options.cookieName, null, options.cookie);
        }

        function hideErrors() {
            locationEl.removeClass('error');
            $('#twc-location-popup .message').addClass('hidden').hide();
        }

        function showError(errorID) {
            // Persist error window until closed manually
            $.cookie('locerrorclosed', errorID, {expires: 365, path: '/'});

            locationEl.addClass('error');
            $('#twc-location-popup .message').addClass('hidden').hide();
            $('#' + errorID + '-error').removeClass('hidden').show();

            $('ul.location li.last').addClass('hover');
            $('#twc-location-popup').removeClass('hidden').show();
        }

        return this.each(function() {
            $(this).data('initialized', true);

            // Set the location text initially (on page reload)
            setGeoLocation();

            $(this).find('#locationText').on({
                focus: function() {
                    // Maintain the visible state of the drop-down while cursor focus is in the location input element
                    jQuery.noop();
                },
                blur: function() {
                    // Hide the change-location drop down when focus on input text element is lost
                    jQuery.noop();
                },
                keydown: function(e) {
                    // Listen for enter key...
                    e.which === 13 ? handleChangeLocation() : false;
                },
                keyup: function(e) {
                    // Hide error message if input element is cleared out
                    if(!e.target.value) {
                        hideErrors();
                    }
                }
            });

            $(this).find('button:first').on('click', handleChangeLocation);
        });
    }
})(jQuery);

$(document).ready(function(){
    var locationEl = $('ul.location:first');
    // Kludge because of multiple document.ready events :\
    if(locationEl.data('initialized') !== true) {
        locationEl.geolocation();
    }
});
;
jQuery(document).ready(function() {
    var ALL_PAGES = '/etc/tags/twc/lob';
    var ALL_REGIONS = '/etc/tags/twc/location/region';
    var alertSelf = $('.alerts .display-alerts');

    var doesMatch = function(tagArray, matchVal, matchAll) {
        var match = false;
        var arrLen = tagArray.length;
        for (var i=0; i<arrLen; i++) {
            var cmpPath = tagArray[i].path;
            if (cmpPath===matchAll || cmpPath===matchVal || matchVal===tagArray[i].title) {
                match = true;
                break;
            }
        }
        return match;
    };

    var isInRegion = function(alertMsg, region) {
        return typeof(alertMsg.regionTags)==='undefined' ? false : doesMatch(alertMsg.regionTags, region, ALL_REGIONS);
    };

    var isOnPage = function(alertMsg, page) {
        return typeof(alertMsg.pageTags)==='undefined' ? false : doesMatch(alertMsg.pageTags, page, ALL_PAGES);
    };

    if (alertSelf.length>0) { // if component on page
        //read in from HTML; defaults to 'default' from JSP (data-alert-* defaults to "default")
        var src = alertSelf.attr('data-alert-src');
        var pageFilter = alertSelf.attr('data-alert-filter');
        if (src!=='default' && pageFilter!=='default') { // if component configured
            $.getJSON(src+'/jcr:content.json', function(data){
                var items = [];
                var alertLen = typeof(data.alerts)==='undefined' ? 0 : data.alerts.length;
                var regionFilter = typeof(ClientContext)==='object' ? ClientContext.get('profile/region') : ALL_REGIONS;

                for (var i=0; i<alertLen; i++) {
                    var alertMsg = data.alerts[i];
                    if (isInRegion(alertMsg, regionFilter) && isOnPage(alertMsg, pageFilter) ) {
                        items.push('<li>'+alertMsg.message+'</li>');
                    } else { console && console.log(".display-alerts excluding: "+alertMsg.id); }
                }
                if (items.length > 0) {
                    alertSelf.find('.alert-messages').html(items.join(''));
                    alertSelf.removeClass('hidden');
                }
            });
        }
    }
});
;
$(document).ready(function() {
    $('.sbs .collapsible-camera').click(function() {
        // expect div.parsys div.topic-item li a.collapsible-heading, div.parsys div.topic-item li div.topic-content
        if ($(this).parent('li').hasClass('current')) {
            $(this).parent('li').find('.step-image').slideUp('slow', function() {
                //console.log("removing existing current from "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').removeClass('current');
            });
        } else {
            $(this).parents('.step-image').siblings().find('li.current .step-image').slideUp('slow', function() {
                //console.log("removing current from "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').removeClass('current');
            });
            $(this).parent('li').find('.step-image').slideDown('slow', function() {
                //console.log("adding current to "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').addClass('current');
            });
        }
        return false;
    });
});
;
$(document).ready(function() {
//    console.log("topic-item doc.ready() called");
//    console.trace();

    $('.topic-item .collapsible-heading').click(function() {

        // expect div.parsys div.topic-item li a.collapsible-heading, div.parsys div.topic-item li div.topic-content
        if ($(this).parent('li').hasClass('current')) {
            $(this).parent('li').find('.topic-content').slideUp('slow', function() {
                //console.log("removing existing current from "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').removeClass('current');
            });
        } else {
            $(this).parents('.topic-item').siblings().find('li.current .topic-content').slideUp('slow', function() {
                //console.log("removing current from "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').removeClass('current');
            });
            $(this).parent('li').find('.topic-content').slideDown('slow', function() {
                //console.log("adding current to "+$(this).parent().find('.collapsible-heading').text());
                $(this).parent('li').addClass('current');
            });
        }
        return false;
    });
});

$(document).ready(function(){
	$(".show-more").click(function(event){
		if($("#show-more").css("display")=="none"){
			$("#show-more").slideDown("slow");
			$('.show-more').css('display','none');
			$('.show-less').css('display','block');
			return false;
			}
			});
			$(".show-less").click(function(event){
				$("#show-more").slideUp("slow");
				$('.show-more').css('display','block');
				$('.show-less').css('display','none');
				return false;
				});
				});
				
$(".content_show").hover(function(){
	$('.visibility').hide();
	$(this).parent().find(".visibility").show();
	},
	function() {
	    $(this).parent().find(".visibility").hide();
	});
	
	
	
	$(document).ready(function(e) {
		$('img[usemap]').rwdImageMaps();
	});

(function(a){a.fn.rwdImageMaps=function(){var d=this,c=parseFloat(a.fn.jquery);var b=function(){d.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this;a("<img />").attr("src",a(e).attr("src")).load(function(){var f,i;if(c<1.6){f=a(e)[0].getAttribute("width"),i=a(e)[0].getAttribute("height")}else{f=a(e).attr("width"),i=a(e).attr("height")}var g=a(e).width()/100,k=a(e).height()/100,j=a(e).attr("usemap").replace("#",""),l="coords";a('map[name="'+j+'"]').find("area").each(function(){if(!a(this).data(l)){a(this).data(l,a(this).attr(l))}var n=a(this).data(l).split(","),m=new Array(n.length);for(var h=0;h<m.length;++h){if(h%2===0){m[h]=parseInt(((n[h]/f)*100)*g)}else{m[h]=parseInt(((n[h]/i)*100)*k)}}a(this).attr(l,m.toString())})})})};b();a(window).resize(function(){b()})}})(jQuery);


jQuery(function( $ ){
	var message = $('.visibility');
	if (message.offset()!=null) {
		var originalMessageTop = message.offset().top +750;
		var view = $( window );
		view.bind(
			"scroll resize",
			function(){
				var viewTop = view.scrollTop();
				if (
					(viewTop > originalMessageTop) &&
					!message.is('.fixed')
					)
					{
					message
					.removeClass('absolute')
					.addClass('fixed');
	
					} 
					else if (
						(viewTop <= originalMessageTop) &&
						message.is('.fixed')
					)
					{
					message
					.removeClass('fixed')
					.addClass('absolute');
	
					}
				}
			);
		}
	});
	
var $window = $(window),
	$visibility = $('.visibility');

	if ($visibility.offset()!=null)
	{
		var visibilityTop = $visibility.offset().top;

	   $window.scroll(function() {
	        var windowTop = $window.scrollTop();
	
	        $visibility.toggleClass('fixed', windowTop > visibilityTop);
	    });
	}
;(function($) {
    "use strict";

    $.fn.paymentCenters = function(opts) {
        var myAddress;

        var paymentCenters = [];
        var counter = 0;

        var niceNameMap = {
            service: {
                alldaypayment: "24-Hour Payment",
                boxswap: "Box Swap",
                democenter: "Demo Center",
                newequipment: "New Equipment",
                selfinstall: "Self Install",
                setup: "Setup"
            },
            payment: {
                cash: "Cash",
                check: "Check",
                charge: "Charge"
            }
        };

        // TODO: redundant code from user-location FIXME
        var options = $.extend({
            cookieName: 'twc-user-profile',
            cookie: {
                path: '/',
                expires: 365
            },
            geoLocationServletURI: '/bin/services/geolocation.json',
            updateOnLoad: true,
            defaultGeoLocation: {
                city:       'New York',
                state:      'NY',
                postalCode: '10019',
                soaID:      'NYC.8150',
                region:     'NYC'
            }
        }, opts);

        /* Dyamically determine domain if not defined */
        if(! options.cookie.domain && location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
            options.cookie['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
        }


        // Default maximum search radius (miles). Results with distance greater than this are omitted.
        var MAX_DISTANCE = 100;
        var MAX_RESULTS  = 10;

        // For calculating great circle distance
        if(typeof(Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function() {
                return this * Math.PI / 180;
            };
        }

        // Array Remove - By John Resig (MIT Licensed)
        if(typeof(Array.prototype.prune) === 'undefined') {
            Array.prototype.prune = function(from, to) {
                var rest = this.slice((to || from) + 1 || this.length);
                this.length = from < 0 ? this.length + from : from;
                return this.push.apply(this, rest);
            };
        }

        $('.invokemap').live('click', function() {
            $(this).paymentCentersDrivingDirections();
        });

        // Handle click submitting address data
        $('div#addressForm input[type=button]').click(function() {
            var address = $('#address').val();
            var city = $('#city').val();
            var state = $('#state').val();
            var zip = $('#zip').val();
            if(address != "" && city != "" && state != "" && zip != "") {
                //console.log('Geolocating address:' + [address, city, state, zip].join(' '));
                geoLocate([address, city, state, zip].join(' '), function(){
                    setAddress(address, city, state, zip);
                    // Only trigger full localization when not inside accordion to prevent resetting accordion state
                    if(!inAccordion()) {
                        doLocalization(zip);
                    } else {
                        initialize();
                    }
                    $('#addressForm form')[0].reset();
                });
            } else {
                // Missing required elements, display error
                notify('Missing required fields');
            }
            return(false);
        });

        // Fade out error msg on keydown in form input field
        $('div#addressForm input[type=text]').keydown(function(e){
            if($('div#addressForm div.notification').is(':visible')) {
                $('div#addressForm div.notification').fadeOut('slow');
            }
        });

        /*set up fancybox for the map modals*/
        $('.openMap').fancybox({'titlePosition': 'outside', 'transitionIn': 'none', 'transitionOut': 'none'});
        $('.mapZip').fancybox({'titlePosition': 'outside', 'transitionIn': 'none', 'transitionOut': 'none'});

        // TODO: This should rely on events fired from the parent container
        // Figure out if we are contained within an accordion
        if(inAccordion()) {
            // Find the expander element and attach a click handler to it that initializes the PaymentCenter component
            $('div.contact-us-paymentcenter').closest('div.expander').siblings('a').click(function(){
                if($('div.paymentCenterReturns').is(':visible') === false) {
                    initialize();
                }
            });

            // If the section containing PaymentCenter component is open by default, we want to initialize now
            if($('div.paymentCenterReturns').is(':visible') === true) {
                initialize();
            }
        } else {
            //console.log('PaymentCenter is standalone');
            initialize();
        }

        function initialize() {
            // SoCal work-around: If the expression provided to display alternative value evaluates to true,
            // the alternative SoCal message is displayed and we simply don't initialize
            if(twc.paymentCenters.soCalExpression) {
                if(eval(twc.paymentCenters.soCalExpression) === true) {
                    $('#plotMap, div.paymentCenterReturns div.wrap aside.sidebar p:eq(1)').remove();
                    $("#paymentcenter-text-alternative").show();
                    $("#paymentcenter-text-default").hide();
                    $('#paymentcenterresults').empty();
                    paymentCenters.length = 0;
                    return;
                } else {
                    $("#paymentcenter-text-alternative").hide();
                    $("#paymentcenter-text-default").show();
                }
            }

            $('#paymentcenterresults').empty();
            paymentCenters.length = 0;

//            if(ClientContext.get('/profile/startlat1') && ClientContext.get('/profile/startlng1')) {
//                // Origin coordinates available from ProfileData, proceed with fetching PC locations
//                getPaymentCenters();
//            } else
            // For now, we geolocate every time.
            if(ClientContext.get('/profile/postalAddress')) {
                // Coordinates not available, but address is. Calculate coordinates from address, then fetch locations
                //console.log('No coordinates available, but postalAddress is present. Attempting to geocode.');
                geoLocate(ClientContext.get('/profile/postalAddress'), getPaymentCenters);
            } else {
                // No coordinates or address -- display modal prompting for address
                //console.log('No geographic coordinates available');
                // Try to fetch the address from profile data store.
                // If address not present in profile, display address modal if we're currently visible
                myAddress = ClientContext.get('/profile/postalAddress');
                if(!myAddress || myAddress === " ,  ") {
                    $.fancybox({
                        href: '#addressForm',
                        afterClose: function() {
                            //console.log('Closed');
                            if(!$('#addressForm #zip').val()) {
                                $('payment-center-notice').html('closed error').show();
                            }
                        }
                    });
                }
            }
        }

        /**
         * Return boolean indicating whether this component is nested inside an accordion
         * (currently for contact us accordion only)
         */
        function inAccordion() {
            return($('div.paymentCenterReturns').closest('div.accordion').length > 0 ? true : false);
        }

        /**
         * Perform geolocation on a given address and invoke callback upon success.
         * This stores the geographic coordinates in the profile store automatically.
         * @param address  Address on which geolocation is performed
         * @param callback Function to invoke upon successful geolocation
         */
        function geoLocate(address, callback) {
            //console.log('geoLocate()');
            // TODO FIXME: redundant code from user-location... make shared
            var splitAddr = address.split(' ');
            var zipForSoa = splitAddr[splitAddr.length - 1];
            zipForSoa ? zipForSoa : ClientContext.get('/profile/zip');
            $.getJSON(options.geoLocationServletURI + '?zip=' + zipForSoa, function(geoLocation) {
                // Since you changed your location, we need to get your new soaId/region
                writeGeoLocationCookie(geoLocation);
                updateGeoLocationProfile(geoLocation);

                // Call geocoder service to get lat/lon of current location
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                }, function(locResult, status) {
                    //console.log(arguments);
                    if(status === 'OK') {
                        try {
                            ClientContext.set('/profile/startlat1', locResult[0].geometry.location.lat());
                            ClientContext.set('/profile/startlng1', locResult[0].geometry.location.lng());
                            callback();
                        } catch(e) {
                            console.log('Geocoding error:', e);
                        }
                    } else {
                        // Not OK.
                        //console.log('Error geolocating address:', status);
                        notify('Error calculating location: ' + status);
                    }
                });
            }).error(function() {
                // Bad zip or out of footprint
                notify('Error: Specified address is either not found or out of our service area. Please try a different address.');
            });
        }

        function writeGeoLocationCookie(locationData) {
            setCookie(JSON.stringify(locationData));
        }

        function setCookie(data) {
            $.cookie(options.cookieName, data, options.cookie);
        }

        function updateGeoLocationProfile(geoLocation) {
            if(geoLocation) {
                ClientContext.set('/profile/city', geoLocation['city']);
                ClientContext.set('/profile/state', geoLocation['state']);
                ClientContext.set('/profile/zip', geoLocation['postalCode']);
                ClientContext.set('/profile/soaId', geoLocation['soaID']);
                ClientContext.set('/profile/region', geoLocation['region']);
            }
        }

        /**
         * Fetch payment centers with request to QueryBuilder, calculate a rough distance using haversine great circle
         * calculation, sort by rough distance, weed out centers further than MAX_DISTANCE, then calculate an accurate
         * distance with DistanceMatrix service, and, finally, append resulting centers to the DOM.
         */
        function getPaymentCenters() {
            var soaID = ClientContext.get('/profile/soaId');
            var queryURI = "/bin/querybuilder.json?type=cq:Page&tagid=twc:location/soaID/" + soaID + "&tagid.property=jcr:content/cq:tags&p.hits=full&p.nodedepth=10&p.limit=-1";

            $('.paymentcentermaps .loaderimage').show();

            $.getJSON(queryURI, function(data) {
                $.each(data.hits, function() {
                    var paymentCenter = this['jcr:content'].paymentcenter;

                    // Store unique identifier for this center
                    paymentCenter['path'] = this['jcr:path'];
                    paymentCenter['id'] = paymentCenter['path'].replace(/\//g, '_');

                    // Save lat/lon and build formatted address here for convenience
                    var lat = parseFloat(paymentCenter.location.lat);
                    var lng = parseFloat(paymentCenter.location.lng);
                    paymentCenter.address = paymentCenter.location.addressLine1 + '<br/>' + paymentCenter.location.city + ', ' + paymentCenter.location.state + ' ' + paymentCenter.location.zip;

                    // Do an initial great circle distance estimate to filter out far away results within this region
                    var greatCircleDistance = distance({lat: ClientContext.get('/profile/startlat1'), lon: ClientContext.get('/profile/startlng1')}, {lat:lat, lon:lng}, 'm');
                    if(greatCircleDistance <= MAX_DISTANCE) {
                        paymentCenters.push({
                            gcDistance: greatCircleDistance,
                            paymentCenter: paymentCenter
                        });
                    }
                });

                if(paymentCenters.length <= 0) {
                    $('.paymentcentermaps .loaderimage').hide();
                    $('#payment-center-notice').html('No locations found near address. Please try entering a different address.');
                }

                // Sort array of payment center objects by distance
                $('.paymentcentermaps .loaderimage').html('Sorting Results');
                paymentCenters.sort(function(a,b) {
                    if(a.gcDistance < b.gcDistance)
                        return -1;
                    if(a.gcDistance > b.gcDistance)
                        return 1;
                    return 0;
                });

                if(paymentCenters.length > MAX_RESULTS) {
                    paymentCenters.prune(MAX_RESULTS, paymentCenters.length-1);
                }

                // Perform more granular distance calculation using DistanceMatrix service
                calcDistGoogle();
            });
        }

        /**
         * Calculates distance between origin and payment centers using DistanceMatrix API
         */
        function calcDistGoogle() {
            var startLat = ClientContext.get('/profile/startlat1');
            var startLon = ClientContext.get('/profile/startlng1');
            var startLocation = new google.maps.LatLng(startLat, startLon);

            $('.paymentcentermaps .loaderimage').html('Loading: ' + paymentCenters.length + ' payment center details');

            $.each(paymentCenters, function(idx, p) {
                var pc = p.paymentCenter;

                /*write div structure*/
                $('.paymentcentermaps').prepend('<div class="outputdiv" id="outputDiv' + pc.id + '"></div>' +
                    '<div class="hideit">' +
                    '<div class="inlinepaymentcentermap" id="mapper' + pc.id + '"></div>' +
                    '<div id="mapperWrapper' + pc.id + '" style="width:800px;">' +
                    '<div id="map_canvas' + pc.id + '" style="float:left;width: 50%; height: 400px;"></div>' +
                    '<div id="directionsPanel' + pc.id + '" style="float:left;margin-left:10px;width: 48%; height: 400px;"></div>' +
                    '</div>' +
                    '</div>'
                );

                paymentCenters[idx]['idx'] = idx;
                paymentCenters[idx]['divName'] = 'outputDiv' + pc.id;

                var paymentCenterLocation = new google.maps.LatLng(pc.location.lat, pc.location.lng);

                initializeModalMap(pc);
                // TODO: This really needs to be outside the loop and batch up into a single request
                calculateDistances(startLocation, paymentCenterLocation, p);
            });

            // Place markers on the minimap displaying all locations
            buildMultiMap(paymentCenters, startLocation);
        }

        /**
         * Calculate distance to payment center using Google DistanceMatrix service
         * @param {Object} origin Decimal degree coordinates of origin location
         * @param {Object} destination Decimal degree coordinates of payment center
         * @param {Object} p Object containing paymentCenter
         */
        function calculateDistances(origin, destination, p) {
            var pc = p.paymentCenter;
            //console.log('calculateDistances(): ', pc);
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    avoidHighways: false,
                    avoidTolls: false
            }, function(response, status) {
                if(status === google.maps.DistanceMatrixStatus.OK) {
                    var origins = response.originAddresses;
                    var outputDiv = document.getElementById(p.divName);
                    outputDiv.innerHTML = '<b>' + pc.displayName + '</b><br/><b>Hours:</b> ' + pc.hours + '<br/>' + pc.address + ' - <a href="#mapper' + pc.id + '" class="openMap" title="' + pc.address + '">Open Map</a> - <a href="#mapperWrapper' + pc.id + '" class="openMap invokemap ' + pc.id + ' ' + pc.location.lat + ' ' + pc.location.lng + '" title="' + pc.address + '">Open Directions</a><br/><b>Notes:</b> ' + pc.notes + '<br/>';
                    outputDiv.innerHTML += '<div class="payment-types"><b>Payment Types:</b></div> ' + buildPaymentTypes(pc.types);
                    outputDiv.innerHTML += '<b>Services:</b> ' + buildServices(pc.services);

                    for(var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        if(results !== undefined) {
                            for(var j = 0; j < results.length; j++) {
                                outputDiv.innerHTML += '<br/><b>Distance:</b> ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br/>';
                                outputDiv.className += ' ' + results[j].distance.value;
                            }
                        }
                    }
                } else {
                    console.log('Error occurred in DistanceMatrix calculation: ' + status);
                }

                counter++;
                if(counter === paymentCenters.length) {
                    finalSort();
                    counter = 0;
                }
            });
        }

        /**
         * Perform final-pass sort on payment center divs by distance
         */
        function finalSort() {
            $('.outputdiv').css('border-bottom', 'solid #454545 1px');
            var myArray = $('.outputdiv');
            myArray.sort(function(a, b) {
                var d1 = parseInt($(a).attr("class").split(' ')[1], 10);
                var d2 = parseInt($(b).attr("class").split(' ')[1], 10);
                if(d1 > d2) {
                    return 1;
                } else if(d1 < d2) {
                    return -1;
                } else {
                    return 0;
                }
            });

            $('#paymentcenterresults').append(myArray);
            $('.paymentcentermaps .loaderimage').hide();
        }

        /**
         * Initialize the modal map for a payment center
         * @param {Object} pc Payment center
         */
        function initializeModalMap(pc) {
            var mapOptions = {
                scaleControl: true,
                zoom: 16,
                center: new google.maps.LatLng(pc.location.lat, pc.location.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('mapper' + pc.id), mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: map.getCenter()
            });
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<b>' + pc.displayName + '</b><br/>Hours: ' + pc.hours + '<br/>' + pc.location.addressLine1 + '<br/>' + pc.location.city + ', ' + pc.location.state + ' ' + pc.location.zip);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }

        /**
         * Calculate approximate distance between two points on the Earth using Great Circle
         * @param {Object} p1 First point in decimal degrees
         * @param {Object} p2 Second point in decimal degrees
         * @param {String} unit K (kilometers), M (statute miles), N (nautical miles)
         * @return {Number} Distance between the two points in the units specified.
         */
        function distance(p1, p2, unit) {
            var R = 6371; // Radius of the earth in km
            var dLat = (p2.lat - p1.lat).toRad();  // Javascript functions in radians
            var dLon = (p2.lon - p1.lon).toRad();
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(Number(p1.lat).toRad()) * Math.cos(Number(p2.lat).toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            if(unit.toLowerCase() === 'm') { d *= 0.621371; } // Convert to statute miles if needed.
            return(d);
        }

        /**
         * Generate small map with pins for all the locations
         * @param {Array} locations an array of payment center objects
         * @param {Object} startingLocation a google LatLng object representing origin location
         */
        function buildMultiMap(locations, startingLocation) {
            var map = new google.maps.Map(document.getElementById('plotMap'), {
                zoom: 7,
                center: startingLocation,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            for(var i = 0; i < locations.length; i++) {
                var location = new google.maps.LatLng(locations[i].paymentCenter.location.lat, locations[i].paymentCenter.location.lng);
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        $(".outputdiv").removeClass("selected");
                        $("#" + locations[i].divName).addClass("selected");
                        $('html, body').animate({ scrollTop: $("#" + locations[i].divName).offset().top }, 'slow');
                    }
                })(marker, i));
            }
        }

        /**
         * Localize client, update both twc-user-location cookie and context cloud
         * @param {String} address
         * @param {String} city
         * @param {String} state
         * @param {String} zip
         * @return {String} myAddress A String in the form of "<address> <city>, <state> <zip>"
         */
        function setAddress(address, city, state, zip) {
            ClientContext.set('/profile/postalAddress', address + " " + city + ", " + state + " " + zip);
            ClientContext.set('/profile/zip', zip);
            myAddress = ClientContext.get('/profile/postalAddress');
            $.fancybox.close(true);
            return(myAddress);
        }

        /**
         * Trigger localization, reloads page for teasers, etc
         * @param {String} zip
         */
        function doLocalization(zip) {
            $('#twc-location-popup input').val(zip);
            $('#twc-location-popup button').trigger('click');
        }

        /**
         * Build markup for services available at payment center
         * @param {Object} services Object containing key/value pairs of serviceType -> true||false
         * @return {String} Markup containing available services
         */
        function buildServices(services) {
            var out = "";
            for(var service in services) {
                if(services.hasOwnProperty(service)) {
                    if(typeof services[service] === 'boolean' && services[service] === true)  out += '<div class="service_' + service + '">'+niceNameMap.service[service]+'</div>';
                }
            }
            return(out);
        }

        /**
         * Build markup for payment types available at payment center
         * @param {Object} types Object containing key value pairs of paymentType -> true||false
         * @return {String} Markup containing available payment types
         */
        function buildPaymentTypes(types) {
            var out = "";
            for(var pType in types) {
                if(types.hasOwnProperty(pType)) {
                    if(typeof types[pType] === 'boolean' && types[pType] === true) out += '<div class="pType pType_'+ pType + '"></div>';
                }
            }
            return(out + '<br/>');
        }

        /**
         * Display a notification in the address form modal using a fast fade
         * @param {String} msg The message to display
         */
        function notify(msg) {
            $('div#addressForm div.notification').html("<div>"+msg+"</div>").fadeIn('fast');
        }
    };
})(jQuery);
;(function($) {
    $.fn.paymentCentersDrivingDirections = function() {

        var classes = $(this).attr('class').split(" ");
        for(var i = classes.length; i--;) {
            var c = classes[2];
            var lat = classes[3];
            var lng = classes[4];
        }

        if($('#directionsPanel' + c).is(':empty')) {
            var lat, lng, c;
            var myaddresslat = CQ_Analytics.ProfileDataMgr.getProperty('startlat1');
            var myaddresslng = CQ_Analytics.ProfileDataMgr.getProperty('startlng1');

            /*console.log("FROM: " +myaddresslat+", "+myaddresslng+" TO: "+lat+", "+lng);*/
            var directionsService = new google.maps.DirectionsService();
            var originLocation = new google.maps.LatLng(myaddresslat, myaddresslng);
            var destinationLocation = new google.maps.LatLng(lat, lng);
            var directionsDisplay = new google.maps.DirectionsRenderer();

            var mapOptions = {
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: originLocation
            };

            var map = new google.maps.Map(document.getElementById("map_canvas" + c), mapOptions);

            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directionsPanel" + c));
            calcRoute(directionsDisplay, directionsService, originLocation, destinationLocation);
        }

        function calcRoute(directionsDisplay, directionsService, originLocation, destinationLocation) {
            var request = {
                origin: originLocation,
                destination: destinationLocation,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if(status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    console.log("Return status not OK:", status);
                }
            });
        }
    };
})(jQuery);
;(function($) {
    "use strict";
    $.fn.paymentCentersFilters = function(classAdd, masterDivName) {
        var checkboxList = $(this);
        var currentClass = $(this).attr('class');
        var checkboxes = $(this).find($('.' + currentClass + ' input[type=checkbox]'));
        checkboxes.prop('checked', true);
        var b=new Array();
        checkboxes.each(function(index) {
            $(this).click(function() {
                console.log('Adding event to: ' + $(this).attr('name'));
                var divName = $('.' + classAdd + $(this).attr('name').toLowerCase());
                var targetDiv = $('#paymentcenterresults').find(divName);
                var currentCheckedItems = checkboxList.find($('.' + currentClass+ ' input[type=checkbox]:checked'));
                currentCheckedItems.each(function(index) {
                    b[index] = '.' + classAdd + $(this).attr('name').toLowerCase();
                });
                var masterDiv = $('.' + masterDivName);
                masterDiv.each(function(index) {
                    if($(this).children().size() > 0) {
                        $(this).parent().addClass('hidepaymentCenter');
                        var children = $(this).children();
                        children.each(function(index) {
                             if($.inArray(('.' + $(this).attr('class')), b) !== -1) {
                                 console.log('this is in: ' + $(this).attr('class'));
                                 $(this).parent().parent().removeClass('hidepaymentCenter');
                             }
                        });
                    } else {
                        $(this).parent().addClass('hidepaymentCenter');
                        console.log(checkboxes.length);
                        if($('.' + currentClass + ' input[type=checkbox]:checked').length === 0 || $('.' + currentClass + ' input[type=checkbox]:checked').length === checkboxes.length) {
                            $(this).parent().removeClass('hidepaymentCenter');
                        }
                    }
                });
            });
        });
    };
})(jQuery);
// set up faq-survey form validation
$(document).ready(function(){
  $(".faq-survey form").validate({
    rules: {
        YesNo: "required",
        response: {
            required: "#faq-survey_YesNo-1:checked"
        },
        recaptcha_response_field: "required"
    }
  });
  $(".faq-survey input:radio[name=yesno], .faq-survey input:radio[name=YesNo]").change(function () {
    if ($(this).val().toLowerCase === "no") {
      $(".faq-survey textarea").addClass("required");
    } else {
      $(".faq-survey textarea").removeClass("required");
      $('.faq-survey label[for="faq-survey_response"]').removeAttr("style")
    }
  });
});

$(document).ready(function(){
    $('a.related-question.' + (CQ_Analytics.ProfileDataMgr.getProperty('region') || "NYC") + ':lt(7)').removeClass('hidden');
});
;
// .faq-navigator dropdown events
$(document).on('change', '.faq-navigator #nav-selector', function() {
	// this is the dropdown as a whole
	var selected = $(this).val();
	var optionText = $(this).find('[value='+selected+']').text();

	// change which option is displayed
	$('.nav-info .option').not('.hidden').addClass('hidden');
	$(selected).removeClass('hidden');

	if (typeof(s) !== 'undefined') { // analytics for category, if it exists
		s.linkTrackVars='prop19';
		s.prop19='contact category > '+optionText;
		s.tl(this,'o',s.prop19);
		s.prop19 = "";
	}
});

// .faq-navigator category click events
$(document).on('click', '.faq-navigator a.cat', function() {
	var category = $(this);
	var catText = $(category).text();
	var option = category.parents().filter('.option')[0];
	var dest = category.attr('href');

	// hide the old, display the new and set their styling
	$(option).find('.faq-set').not('.hidden').addClass('hidden');
	$(option).find(dest).removeClass('hidden');
	$(this).parent().siblings().removeClass('selected');
	//$(this).parent().parent().find('li.selected').removeClass('selected');
	$(this).parent().addClass('selected');

	if (typeof(s) !== 'undefined') { //analytics for topics
		s.linkTrackVars='prop19,prop37,eVar48';
		s.prop19='contact topic > '+catText;
		s.prop37 = s.eVar48 = catText;
		s.tl(this,'o',s.prop19);
		s.prop19 = "";
		s.prop37 = "";
		s.eVar48 = "";
	}
	return false;	//prevent browser reload
});

$(document).on('click', '.faq-navigator .faq-set a', function() {
	var dest = $(this).attr('href');
	var question = '';
	$.get(dest, function(data) {
		question = $(data).find('.faq-question').text();
		var answer = $(data).find('.parsys.answer').html();
		// fancybox API: http://fancyapps.com/fancybox/ and http://fancybox.net/api
		$.fancybox('<h2 class="faq-question">'+question+'</h2><div class="faq-answer">'+answer+'</div', {minWidth:300, maxWidth:600});
		if (typeof(s) !== 'undefined') { //analytics for faq clicks
			s.cookieLink('Contact Us FAQ:'+question);
		}
	});
	return false;	//prevent browser destination
});
var chatPrompt = chatPrompt || {};
chatPromptIdleTime = 0;
chatPrompt.presetTime = 1000; // setting time to go by milliseconds
var chatIdleInterval;
var chatModalLink = "";
var enabledVal = "";
chatTimerLength = 180;
$(document).ready(function () {
    if ($('#chat-prompt-module').length > 0) {
        var currentSoaId;
        
        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            chatPromptIdleTime = 0;
        });
        $(this).keypress(function (e) {
            chatPromptIdleTime = 0;
        });

        // get users soaid and if they have not entered one use default New York soaid
        var soaid = CQ_Analytics.ProfileDataMgr.getProperty('soaId');
        if (typeof(soaid)==='string' && soaid!=='') {
            currentSoaId = soaid;
        } else {
            currentSoaId = "NYC.8150";
        }

        $.getJSON('/content/bin/soaid/proactiveChatPrompt', function(data) {
            var soaObj = data[currentSoaId];
            var chatObj = soaObj["proactiveChatPrompt"];
            enabledVal = chatObj["enabled"].toString();
            
            if (enabledVal === 'true'){
                var disabled = $('#disabled').val();
                if (disabled !== 'true') {
                    if(! $.cookie('chatPromptCookie')) {
                        chatModalLink = $('#modalLink').val();
                        chatTimerLength = $('#timerlength').val();

                        if (chatModalLink !== '') {
                            //Increment the idle time counter
                            chatIdleInterval = setInterval("timerIncrement()", chatPrompt.presetTime);

                           
                        }
                    }
                }
            }
        });
    }
})
function timerIncrement() {
    chatPromptIdleTime = chatPromptIdleTime + 1;
    if (chatPromptIdleTime > chatTimerLength) {
        clearInterval(chatIdleInterval);
        $.get(chatModalLink + '.html #chatPrompt', function(data) {
            var chatPromptDiv = $(data).find('#chatPromptModal').html();

            if (typeof(s) !== 'undefined') {
                // analytics code for when the modal appears
                var oldPageName = s.pageName;
                s.events="event97";
                s.pageName="chatpop_idle";
                s.channel="chatpop_idle";
                s.eVar50="chatpop_idle|"+oldPageName;
                s.eVar67="ChatPop_idle";
                s.eVar68=oldPageName;
                s.t();
            }

            var options = {
                path: '/'
            };
            // cookie to prevent multiple popups in single browser session
            $.cookie("chatPromptCookie","chatPrompt",options);

            // fancybox API: http://fancyapps.com/fancybox/ and http://fancybox.net/api
            $.fancybox(chatPromptDiv, {
                padding: 0,
                margin: 0,
                maxHeight:600,
                makWidth:600,
                width:'auto',
                height:'auto',
                autoSize:false,
                scrolling: 'no'
            });
        });
    }
}
;(function($){
    "use strict";
    $.fn.pressRelease = function(opts) {
        var options = $.extend({
            path: '',
            type: 'cq:Page',
            orderby: '@jcr:content/press-release/date&orderby.sort=desc',
            limit: 10,
            offset: 0,
            hits: 'full',
            nodedepth: -1,
            tagid: ""
        }, opts);

        function init() {
            $.getJSON(getUrl(), function(data){
                doPagination(data.total);
            });
        }

        function buildList(data) {
            $('.press-releases').html('');
            $.each(data.hits, function(idx, item) {
                // console.log('path ' + this.path , ' title' , this.title , 'created' , this.created , 'lastModified', this.lastModified);
                var releaseDate = new Date(this['jcr:content']['press-release'].date);
                releaseDate = (releaseDate.getMonth()+1) + '/' + releaseDate.getDate()  + '/' + releaseDate.getFullYear();
                $('ul.press-releases').append('<li><a href="' + this['jcr:path'] + '.html"> ' + this['jcr:content']['jcr:title'] + '<span> (' + releaseDate + ')</span></a></li>');
            });
        }

        function createList(url) {
            var queryURI = url;
            $.getJSON(queryURI, function(data){
                doPagination(data.total);
                buildList(data);
            });
        }

        /**
         * Generate URL for QueryBuilder request
         * @return {String} URL for querybuilder query
         */
        function getUrl() {
            var queryURI = "/bin/querybuilder.json?" +
                "path="         + options.path +
                "&type="        + options.type +
                "&orderby="     + options.orderby +
                "&p.offset="    + options.offset +
                "&p.limit="     + options.limit +
                "&p.hits="      + options.hits +
                "&p.nodedepth=" + options.nodedepth +
                "&tagid="       + options.tagid;
            return(queryURI);
        }

        function doPagination(totalItems) {
            var prev = {start: 0, stop: 0};
            $(".pagination").paging(totalItems, {
                format: '- < ncnnnnnnnn! >',
                perpage: 0,
                lapping: 0,
                page: null, // we await hashchange() event
                onSelect: function(page) {
                    options.offset = this.slice[0];
                    $.getJSON(getUrl(), function(data) {
                        buildList(data);
                    });
                    var currentPosition = this.slice;
                    prev = currentPosition;
                    return true; // locate!
                },
                onFormat: function (type) {
                    switch (type) {
                        case 'block': // n and c
                            return '<a href=' + (window.location.hash || "#all-news-tab") + '>' + this.value + '</a>';
                        case 'next':
                            return '<a href="' + (window.location.hash || "#all-news-tab")+ '" class="pagination-next">Next </a>';
                        case 'prev':
                            return '<a href="' + (window.location.hash || "#all-news-tab") + '" class="pagination-prev">Previous</a>';
                        case 'fill':
                            return '<div style="padding-bottom: 7px;">Page ' + this.page + ' of ' + this.pages + '</div>';
                    }
                }
            });
        }

        function setActiveTab(tab) {
            $(tab).siblings().removeClass("active");
            $(tab).addClass("active");
        }

        return this.each(function() {
            // Initial page display
            var selectedTab = window.location.hash || "#all-news-tab" ;
            setActiveTab(selectedTab);

            if (selectedTab === "#local-tab") {
                options.tagid = "twc:location/region/" + ClientContext.get('profile/region') + "&tagid.property=jcr:content/cq:tags";
            } else if (selectedTab === "#corp-tab") {
                options.tagid = "twc:corporate&tagid.property=jcr:content/cq:tags";
            }

            $("#all-news-tab").click(function(event) {
                options.tagid = "";
                init();
                setActiveTab(this);
            });

            // Corporate only
            $("#corp-tab").click(function(event) {
                options.tagid =  "twc:corporate&tagid.property=jcr:content/cq:tags";
                init();
                setActiveTab(this);
            });

            // Localized by region
            $("#local-tab").click(function(event) {
                var region = ClientContext.get('profile/region');
                options.tagid = "twc:location/region/" + region + "&tagid.property=jcr:content/cq:tags";
                init();
                setActiveTab(this);
            });

            init();
        });
    }
})(jQuery);



/**
 * @license jQuery paging plugin v1.1.0 09/04/2011
 * http://www.xarg.org/2011/09/jquery-pagination-revised/
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

(function($, window, undefined) {

    $["fn"]["paging"] = function(number, opts) {

        var self = this,
            Paging = {

                "setOptions": function(opts) {

                    function parseFormat(format) {

                        var gndx = 0, group = 0, num = 1, res = {
                            fstack:         [], // format stack
                            asterisk:       0, // asterisk?
                            inactive:       0, // fill empty pages with inactives up to w?
                            blockwide:      5, // width of number block
                            current:        3, // position of current element in number block
                            rights:         0, // num of rights
                            lefts:          0 // num of lefts
                        }, tok, pattern = /[*<>pq\[\]().-]|[nc]+!?/g;

                        var known = {
                            "[": "first",
                            "]": "last",
                            "<": "prev",
                            ">": "next",
                            "q": "left",
                            "p": "right",
                            "-": "fill",
                            ".": "leap"
                        }, count = {};

                        while ((tok = pattern["exec"](format))) {

                            tok = String(tok);

                            if (undefined === known[tok]) {

                                if ("(" === tok) {
                                    group = ++gndx;
                                } else if (")" === tok) {
                                    group = 0;
                                } else if (num) {

                                    if ("*" === tok) {
                                        res.asterisk = 1;
                                        res.inactive = 0;
                                    } else {
                                        // number block is the only thing left here
                                        res.asterisk = 0;
                                        res.inactive = "!" === tok.charAt(tok.length - 1);
                                        res.blockwide = tok["length"] - res.inactive;
                                        if (!(res.current = 1 + tok.indexOf("c"))) {
                                            res.current = (1 + res.blockwide) >> 1;
                                        }
                                    }

                                    res.fstack[res.fstack.length] = ({
                                        ftype: "block",	// type
                                        fgroup: 0,		// group
                                        fpos: 0		// pos
                                    });
                                    num = 0;
                                }

                            } else {

                                res.fstack[res.fstack.length] = ({
                                    ftype: known[tok], // type
                                    fgroup: group,      // group
                                    fpos: undefined === count[tok] ? count[tok] = 1 : ++count[tok] // pos
                                });

                                if ("q" === tok)
                                    ++res.lefts;
                                else if ("p" === tok)
                                    ++res.rights;
                            }
                        }
                        return res;
                    }

                    this.opts = $.extend(this.opts || {
                        "lapping"		: 0,	// number of elements overlap
                        "perpage"           : 10,	// number of elements per page
                        "page"              : 1,	// current page
                        "refresh"		: {
                            "interval": 10,
                            "url": null
                        },	// refresh callback information

                        "format"		: "",	// visual format string

                        "onLock"            : null, // empty callback. set it if you want to lock the entire pagination

                        "onFormat"		: function (type) {	// callback for every format element

                        },
                        "onSelect"		: function (page){	// callback for page selection

                              // Return code indicates if the link of the clicked format element should be followed (otherwise only the click-event is used)
                            return true;
                        },
                        "onRefresh"		: function (json) {// callback for new data of refresh api
                            }
                    }, opts || {});

                    this.opts["lapping"]|= 0;
                    this.opts["perpage"]|= 0;
                    this.opts["page"]   |= 0;

                    // If the number of elements per page is less then 1, set it to default
                    if (this.opts["perpage"] < 1) {
                        this.opts["perpage"] = 10;
                    }

                    if (this.interval) window.clearInterval(this.interval);

                    if (this.opts["refresh"]["url"]) {

                        this.interval = window.setInterval(function(o) {

                            $["ajax"]({
                                "url": o.opts["refresh"]["url"],
                                "success": function(data) {

                                    if (typeof(data) === "string") {

                                        try {
                                            data = $["parseJSON"](data);
                                        } catch (o) {
                                            return;
                                        }
                                    }
                                    o.opts["onRefresh"](data);
                                }
                            });

                        }, 1000 * this.opts["refresh"]["interval"], this);
                    }

                    this.format = parseFormat(this.opts["format"]);
                    return this;
                },

                "setNumber": function(number) {
                    this.number = (undefined === number || number < 0) ? -1 : number;
                    return this;
                },

                "setPage": function(page) {

                    if (undefined === page) {

                        if (page = this.opts["page"], null === page) {
                            return this;
                        }

                    } else if (this.opts["page"] == page) {
                        return this;
                    }

                    this.opts["page"] = (page|= 0);

                    if (null !== this.opts["onLock"]) {
                        this.opts["onLock"].call(null, page);
                        return this;
                    }

                    var number = this.number;
                    var opts = this.opts;

                    var rStart, rStop;

                    var pages, buffer;

                    var groups = 1, format = this.format;

                    var data, tmp, node, lapping;

                    var count = format.fstack["length"], i = count;


                    // If the lapping is greater than perpage, reduce it to perpage - 1 to avoid endless loops
                    if (opts["perpage"] <= opts["lapping"]) {
                        opts["lapping"] = opts["perpage"] - 1;
                    }

                    lapping = number <= opts["lapping"] ? 0 : opts["lapping"]|0;


                    // If the number is negative, the value doesn"t matter, we loop endlessly with a constant width
                    if (number < 0) {

                        number = -1;
                        pages = -1;

                        rStart = Math.max(1, page - format.current + 1 - lapping);
                        rStop  = rStart + format.blockwide;

                    } else {

                        // Calculate the number of pages
                        pages = 1 + Math.ceil((number - opts["perpage"]) / (opts["perpage"] - lapping));

                        // If current page is negative, start at the end and
                        // Set the current page into a valid range, includes 0, which is set to 1
                        page = Math.max(1, Math.min(page < 0 ? 1 + pages + page : page, pages));

                        // Do we need to print all numbers?
                        if (format.asterisk) {
                            rStart = 1;
                            rStop  = 1 + pages;

                            // Disable :first and :last for asterisk mode as we see all buttons
                            format.current   = page;
                            format.blockwide = pages;

                        } else {

                            // If no, start at the best position and stop at max width or at num of pages
                            rStart = Math.max(1, Math.min(page - format.current, pages - format.blockwide) + 1);
                            rStop = format.inactive ? rStart + format.blockwide : Math.min(rStart + format.blockwide, 1 + pages);
                        }
                    }

                    while (i--) {

                        tmp = 0; // default everything is visible
                        node = format.fstack[i];

                        switch (node.ftype) {

                            case "left":
                                tmp = (node.fpos < rStart);
                                break;
                            case "right":
                                tmp = (rStop <= pages - format.rights + node.fpos);
                                break;

                            case "first":
                                tmp = (format.current < page);
                                break;
                            case "last":
                                tmp = (format.blockwide < format.current + pages - page);
                                break;

                            case "prev":
                                tmp = (1 < page);
                                break;
                            case "next":
                                tmp = (page < pages);
                                break;
                        }
                        groups|= tmp << node.fgroup; // group visible?
                    }

                    data = {
                        "number"	: number,	// number of elements
                        "lapping"	: lapping,	// overlapping
                        "pages"		: pages,	// number of pages
                        "perpage"	: opts["perpage"], // number of elements per page
                        "page"		: page,		// current page
                        "slice"		: [			// two element array with bounds of the current page selection
                            (tmp = page * (opts["perpage"] - lapping) + lapping) - opts["perpage"], // Lower bound
                            Math.min(tmp, number) // Upper bound
                        ]
                    };

                    buffer = "";

                    function buffer_append(opts, data, type) {

                        type = String(opts["onFormat"].call(data, type));

                        if (data["value"])
                            buffer+= type.replace(/<a/i, '<a data-page="' + data["value"] + '"');
                        else
                            buffer+= type
                    }

                    while (++i < count) {

                        node = format.fstack[i];

                        tmp = (groups >> node.fgroup & 1);

                        switch (node.ftype) {
                            case "block":
                                for (; rStart < rStop; ++rStart) {

                                    data["value"]      = rStart;
                                    data["pos"]	       = 1 + format.blockwide - rStop + rStart;

                                    data["active"]     = rStart <= pages || number < 0;     // true if infinity series and rStart <= pages
                                    data["first"]      = 1 === rStart;                      // check if it is the first page
                                    data["last"]       = rStart == pages && 0 < number;     // false if infinity series or rStart != pages

                                    buffer_append(opts, data, node.ftype);
                                }
                                continue;

                            case "left":
                                data["value"]      = node.fpos;
                                data["active"]     = node.fpos < rStart; // Don't take group-visibility into account!
                                break;

                            case "right":
                                data["value"]      = pages - format.rights + node.fpos;
                                data["active"]     = rStop <= data["value"]; // Don't take group-visibility into account!
                                break;

                            case "first":
                                data["value"]      = 1;
                                data["active"]     = tmp && 1 < page;
                                break;

                            case "prev":
                                data["value"]      = Math.max(1, page - 1);
                                data["active"]     = tmp && 1 < page;
                                break;

                            case "last":
                                if ((data["active"]	   = (number < 0))) {
                                    data["value"]      = 1 + page;
                                } else {
                                    data["value"]      = pages;
                                    data["active"]     = tmp && page < pages;
                                }
                                break;

                            case "next":
                                if ((data["active"]	   = (number < 0))) {
                                    data["value"]      = 1 + page;
                                } else {
                                    data["value"]      = Math.min(1 + page, pages);
                                    data["active"]     = tmp && page < pages;
                                }
                                break;

                            case "leap":
                            case "fill":
                                data["pos"]        = node.fpos;
                                data["active"]     = tmp; // tmp is true by default and changes only for group behaviour
                                buffer_append(opts, data, node.ftype);
                                continue;
                        }

                        data["pos"]   = node.fpos;
                        data["last"]  = /* void */
                            data["first"] = undefined;

                        buffer_append(opts, data, node.ftype);
                    }

                    if (self.length) {

                        $("a", self["html"](buffer)).click(function(ev) {
                            ev["preventDefault"]();

                            var obj = this;

                            do {

                                if ('a' === obj["nodeName"].toLowerCase()) {
                                    break;
                                }

                            } while ((obj = obj["parentNode"]));

                            Paging["setPage"]($(obj).data("page"));

                            if (Paging.locate) {
                                window.location = obj["href"];
                            }
                        });

                        this.locate = opts["onSelect"].call({
                            "number"	: number,
                            "lapping"	: lapping,
                            "pages"		: pages,
                            "slice"		: data["slice"]
                        }, page);
                    }
                    return this;
                }
            };

        return Paging
            ["setNumber"](number)
            ["setOptions"](opts)
            ["setPage"]();
    }

}(jQuery, this));
CQ_Analytics.ClientContextUtils.onStoreRegistered('profile', function() {});

;(function($){
    "use strict";

    $.fn.geolocation = function(opts) {
        CQ_Analytics.ClientContextUtils.onStoreInitialized('profile', function() {
            if(typeof ClientContext.get('/profile/zip') === "undefined" &&
                typeof ClientContext.get('/profile/city') === "undefined" &&
                typeof ClientContext.get('/profile/state') === "undefined" &&
                typeof ClientContext.get('/profile/soaId') === "undefined" &&
                typeof ClientContext.get('/profile/region') === "undefined"){
                var geoLocation = getGeoLocationFromCookie();
                updateGeoLocationProfile(geoLocation);
            }
        }, true);

        var options = $.extend({
            cookieName: 'twc-user-profile',
            cookie: {
                path: '/',
                /* domain: 'timewarnercable.com', */
                expires: 365
            },
            geoLocationServletURI: '/bin/services/geolocation.json',
            updateOnLoad: true,
            defaultGeoLocation: {
                city:       'New York',
                state:      'NY',
                postalCode: '10019',
                soaID:      'NYC.8150',
                region:     'NYC'
            }
        }, opts);

        /* Dyamically determine domain if not defined */
        if(! options.cookie.domain && location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
            options.cookie['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
        }

        var locationEl = $(this).find('#twc-location-popup');

        function setGeoLocation() {
            var geoLocation = getGeoLocationFromCookie();

            if(hasGeoLocationCookie()) {
                if(inFootprint(geoLocation)) {
                    updateLocationHeader(buildLocationString(geoLocation));
                }
                else if(! $.cookie('locerrorclosed')) {
                    showError("oof");
                }
            }
            else {
                geoLocation = options.defaultGeoLocation;
                if(! $.cookie('locerrorclosed'))
                    showError("noc");
            }

            CQ_Analytics.CCM.addListener('configloaded', function(){console.log('configloaded'); updateGeoLocationProfile(geoLocation)}, CQ_Analytics.ProfileDataMgr);
        }

        function inFootprint(geoLocation) {
            return(geoLocation && geoLocation.region && geoLocation.region.length > 0);
        }

        function hasGeoLocationCookie() {
            return(getGeoLocationFromCookie());
        }

        function handleChangeLocation() {
            eraseCookie();
            fetchGeoLocationData();
        }

        function getGeoLocationFromCookie() {
            var geoData = jQuery.parseJSON(getCookie());

            if(geoData && typeof(geoData['city']) === 'string') {
                geoData.city = geoData.city.replace(/\+/g, ' ');
            }

            return(geoData);
        }

        function fetchGeoLocationData() {
            $.getJSON(options.geoLocationServletURI + '?zip=' + $('#locationText').val(), function(geoLocation) {
                writeGeoLocationCookie(geoLocation);
                updateGeoLocationProfile(geoLocation);
                location.reload(); // reload page so geo-aware components can initialize properly.
            }).error(function() {
                handleLocationChangeError();
            });
        }

        function handleLocationChangeError() {
            showError("geo");
        }

        function buildLocationString(geoLocation) {
            return(geoLocation ? geoLocation['city'] + ", " + geoLocation['state'] + " " + geoLocation['postalCode'] : "");
        }

        function updateLocationHeader(str) {
            if(str) {
                $('#twc-location').html(str);
            }
        }

        function updateGeoLocationProfile(geoLocation) {
            if(geoLocation) {
                CQ_Analytics.ProfileDataMgr.setProperty('city', geoLocation['city']);
                CQ_Analytics.ProfileDataMgr.setProperty('state', geoLocation['state']);
                CQ_Analytics.ProfileDataMgr.setProperty('zip', geoLocation['postalCode']);
                CQ_Analytics.ProfileDataMgr.setProperty('soaId', geoLocation['soaID']);
                CQ_Analytics.ProfileDataMgr.setProperty('region', geoLocation['region']);
            }
        }

        function writeGeoLocationCookie(locationData) {
            setCookie(JSON.stringify(locationData));
        }

        function setCookie(data) {
            $.cookie(options.cookieName, data, options.cookie);
        }

        function getCookie() {
            return($.cookie(options.cookieName));
        }

        function eraseCookie() {
            $.cookie(options.cookieName, null, options.cookie);
        }

        function hideErrors() {
            locationEl.removeClass('error');
            $('#twc-location-popup .message').addClass('hidden').hide();
        }

        function showError(errorID) {
            // Persist error window until closed manually
            $.cookie('locerrorclosed', errorID, {expires: 365, path: '/'});

            locationEl.addClass('error');
            $('#twc-location-popup .message').addClass('hidden').hide();
            $('#' + errorID + '-error').removeClass('hidden').show();

            $('ul.location li.last').addClass('hover');
            $('#twc-location-popup').removeClass('hidden').show();
        }

        return this.each(function() {
            $(this).data('initialized', true);

            // Set the location text initially (on page reload)
            setGeoLocation();

            $(this).find('#locationText').on({
                focus: function() {
                    // Maintain the visible state of the drop-down while cursor focus is in the location input element
                    jQuery.noop();
                },
                blur: function() {
                    // Hide the change-location drop down when focus on input text element is lost
                    jQuery.noop();
                },
                keydown: function(e) {
                    // Listen for enter key...
                    e.which === 13 ? handleChangeLocation() : false;
                },
                keyup: function(e) {
                    // Hide error message if input element is cleared out
                    if(!e.target.value) {
                        hideErrors();
                    }
                }
            });

            $(this).find('button:first').on('click', handleChangeLocation);
        });
    }
})(jQuery);

$(document).ready(function(){
    var locationEl = $('ul.location:first');
    // Kludge because of multiple document.ready events :\
    if(locationEl.data('initialized') !== true) {
        locationEl.geolocation();
    }
});
$(document).ready(function () {
    if ($('.chatpromptadmin').length > 0) {
        if (!$('#globaldisable').is(":checked"))
        {
          $(".soaids").show();
        }
    }
})
//gatewayCookie.js
$(document).ready(function(){
    var options = {
        path: '/',
        expires: 365
    };
    if(location.hostname.match(/[\w\-]+\.[\w\-]+$/)) {
        options['domain'] = location.hostname.match(/[\w\-]+\.[\w\-]+$/)[0];
    }
    $("li.panel.first").click(function() {
        $.cookie("gatewayRedirect", "panel1", options);
    });

    $("li.panel:not(.first):not(.last)").click(function() {
        $.cookie("gatewayRedirect", "panel2", options);
    });

    $("li.panel.last").click(function() {
        $.cookie("gatewayRedirect", "panel3", options);
    });
});
jQuery(document).ready(function(){
    
    jQuery('.fly-out a').click(function(event, target) {
        event.preventDefault();
//        console.log(jQuery(this).attr("href"));
    });
});
var RecaptchaTemplates={};RecaptchaTemplates.VertHtml='<table id="recaptcha_table" class="recaptchatable" > <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_image" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" autocorrect="off" autocapitalize="off" /> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> ';RecaptchaTemplates.CleanCss=".recaptchatable td img{display:block}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px;padding:7px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto;text-align:left!important}.recaptchatable #recaptcha_image{margin:auto;border:1px solid #dfdfdf!important}.recaptchatable a img{border:0}.recaptchatable a,.recaptchatable a:hover{outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{border:1px solid #dfdfdf!important;margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{font-size:11pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}.recaptchatable{line-height:1em;border:1px solid #dfdfdf!important}.recaptcha_error_text{color:red}";RecaptchaTemplates.CleanHtml='<table id="recaptcha_table" class="recaptchatable"> <tr height="73"> <td class=\'recaptcha_image_cell\' width="302"><center><div id="recaptcha_image"></div></center></td> <td style="padding: 10px 7px 7px 7px;"> <a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="18" alt="" /></a> <a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="15" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="15" alt=""/></a> <a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a> </td> <td style="padding: 18px 7px 18px 7px;"> <img id=\'recaptcha_logo\' alt="" width="71" height="36" /> </td> </tr> <tr> <td style="padding-left: 7px;"> <div class="recaptcha_input_area" style="padding-top: 2px; padding-bottom: 7px;"> <input style="border: 1px solid #3c3c3c; width: 302px;" name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td></td> <td style="padding: 4px 7px 12px 7px;"> <img id="recaptcha_tagline" width="71" height="17" /> </td> </tr> </table> ';RecaptchaTemplates.ContextHtml='<table id="recaptcha_table" class="recaptchatable"> <tr> <td colspan="6" class=\'recaptcha_r1_c1\'></td> </tr> <tr> <td class=\'recaptcha_r2_c1\'></td> <td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td> <td class=\'recaptcha_r2_c2\'></td> </tr> <tr> <td rowspan="6" class=\'recaptcha_r3_c1\'></td> <td colspan="4" class=\'recaptcha_r3_c2\'></td> <td rowspan="6" class=\'recaptcha_r3_c3\'></td> </tr> <tr> <td rowspan="3" class=\'recaptcha_r4_c1\' height="49"> <div class="recaptcha_input_area"> <label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_context" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/> <input name="recaptcha_response_field" id="recaptcha_response_field" type="text" /> </div> </td> <td rowspan="4" class=\'recaptcha_r4_c2\'></td> <td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td> <td rowspan="4" class=\'recaptcha_r4_c4\'></td> </tr> <tr> <td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td> </tr> <tr> <td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td> </tr> <tr> <td class=\'recaptcha_r7_c1\'></td> <td class=\'recaptcha_r8_c1\'></td> </tr> </table> ';RecaptchaTemplates.VertCss=".recaptchatable td img{display:block}.recaptchatable .recaptcha_r1_c1{background:url('IMGROOT/sprite.png') 0 -63px no-repeat;width:318px;height:9px}.recaptchatable .recaptcha_r2_c1{background:url('IMGROOT/sprite.png') -18px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r2_c2{background:url('IMGROOT/sprite.png') -27px 0 no-repeat;width:9px;height:57px}.recaptchatable .recaptcha_r3_c1{background:url('IMGROOT/sprite.png') 0 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r3_c2{background:url('IMGROOT/sprite.png') -18px -57px no-repeat;width:300px;height:6px}.recaptchatable .recaptcha_r3_c3{background:url('IMGROOT/sprite.png') -9px 0 no-repeat;width:9px;height:63px}.recaptchatable .recaptcha_r4_c1{background:url('IMGROOT/sprite.png') -43px 0 no-repeat;width:171px;height:49px}.recaptchatable .recaptcha_r4_c2{background:url('IMGROOT/sprite.png') -36px 0 no-repeat;width:7px;height:57px}.recaptchatable .recaptcha_r4_c4{background:url('IMGROOT/sprite.png') -214px 0 no-repeat;width:97px;height:57px}.recaptchatable .recaptcha_r7_c1{background:url('IMGROOT/sprite.png') -43px -49px no-repeat;width:171px;height:8px}.recaptchatable .recaptcha_r8_c1{background:url('IMGROOT/sprite.png') -43px -49px no-repeat;width:25px;height:8px}.recaptchatable .recaptcha_image_cell center img{height:57px}.recaptchatable .recaptcha_image_cell center{height:57px}.recaptchatable .recaptcha_image_cell{background-color:white;height:57px}#recaptcha_area,#recaptcha_table{width:318px!important}.recaptchatable,#recaptcha_area tr,#recaptcha_area td,#recaptcha_area th{margin:0!important;border:0!important;padding:0!important;border-collapse:collapse!important;vertical-align:middle!important}.recaptchatable *{margin:0;padding:0;border:0;font-family:helvetica,sans-serif;font-size:8pt;color:black;position:static;top:auto;left:auto;right:auto;bottom:auto;text-align:left!important}.recaptchatable #recaptcha_image{margin:auto}.recaptchatable img{border:0!important;margin:0!important;padding:0!important}.recaptchatable a,.recaptchatable a:hover{outline:none;border:0!important;padding:0!important;text-decoration:none;color:blue;background:none!important;font-weight:normal}.recaptcha_input_area{position:relative!important;width:146px!important;height:45px!important;margin-left:20px!important;margin-right:5px!important;margin-top:4px!important;background:none!important}.recaptchatable label.recaptcha_input_area_text{margin:0!important;padding:0!important;position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important;background:none!important;height:auto!important;width:auto!important}.recaptcha_theme_red label.recaptcha_input_area_text,.recaptcha_theme_white label.recaptcha_input_area_text{color:black!important}.recaptcha_theme_blackglass label.recaptcha_input_area_text{color:white!important}.recaptchatable #recaptcha_response_field{width:145px!important;position:absolute!important;bottom:7px!important;padding:0!important;margin:0!important;font-size:10pt}.recaptcha_theme_blackglass #recaptcha_response_field,.recaptcha_theme_white #recaptcha_response_field{border:1px solid gray}.recaptcha_theme_red #recaptcha_response_field{border:1px solid #cca940}.recaptcha_audio_cant_hear_link{font-size:7pt;color:black}.recaptchatable{line-height:1em}#recaptcha_instructions_error{color:red!important}";var RecaptchaStr_en={visual_challenge:"Get a visual challenge",audio_challenge:"Get an audio challenge",refresh_btn:"Get a new challenge",instructions_visual:"Type the two words:",instructions_context:"Type the words in the boxes:",instructions_audio:"Type what you hear:",help_btn:"Help",play_again:"Play sound again",cant_hear_this:"Download sound as MP3",incorrect_try_again:"Incorrect. Try again.",image_alt_text:"reCAPTCHA challenge image"},RecaptchaStr_af={visual_challenge:"Kry 'n visuele verifi\u00ebring",
audio_challenge:"Kry 'n klankverifi\u00ebring",refresh_btn:"Kry 'n nuwe verifi\u00ebring",instructions_visual:"Tik die twee woorde:",instructions_context:"Tik die woorde in die kassies:",instructions_audio:"Tik wat jy hoor:",help_btn:"Hulp",play_again:"Speel geluid weer",cant_hear_this:"Laai die klank af as MP3",incorrect_try_again:"Verkeerd. Probeer weer.",image_alt_text:"reCAPTCHA-verifieerprent"},RecaptchaStr_am={visual_challenge:"\u12e8\u12a5\u12ed\u1273 \u1270\u130b\u1323\u121a \u12a0\u130d\u129d",
audio_challenge:"\u120c\u120b \u12a0\u12f2\u1235 \u12e8\u12f5\u121d\u133d \u1325\u12eb\u1244 \u12ed\u1245\u1228\u1265",refresh_btn:"\u120c\u120b \u12a0\u12f2\u1235 \u1325\u12eb\u1244 \u12ed\u1245\u1228\u1265",instructions_visual:"\u12a5\u1295\u12da\u1205\u1295 \u1201\u1208\u1275 \u1243\u120b\u1275 \u1270\u12ed\u1265 \u1366",instructions_context:"\u1260\u1233\u1325\u1296\u1279 \u12cd\u1235\u1325 \u1243\u120b\u1276\u1279\u1295 \u1270\u12ed\u1265\u1366",instructions_audio:"\u12e8\u121d\u1275\u1230\u121b\u12cd\u1295 \u1270\u12ed\u1265\u1361-",
help_btn:"\u12a5\u1308\u12db",play_again:"\u12f5\u121d\u1339\u1295 \u12a5\u1295\u12f0\u1308\u1293 \u12a0\u132b\u12cd\u1275",cant_hear_this:"\u12f5\u121d\u1339\u1295 \u1260MP3 \u1245\u122d\u133d \u12a0\u12cd\u122d\u12f5",incorrect_try_again:"\u1275\u12ad\u12ad\u120d \u12a0\u12ed\u12f0\u1208\u121d\u1362 \u12a5\u1295\u12f0\u1308\u1293 \u121e\u12ad\u122d\u1362",image_alt_text:"reCAPTCHA \u121d\u1235\u120d \u130d\u1320\u121d"},RecaptchaStr_ar={visual_challenge:"\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u0645\u0631\u0626\u064a",
audio_challenge:"\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u0635\u0648\u062a\u064a",refresh_btn:"\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064d \u062c\u062f\u064a\u062f",instructions_visual:"\u0627\u0643\u062a\u0628 \u0627\u0644\u0643\u0644\u0645\u062a\u064a\u0646:",instructions_context:"\u0627\u0643\u062a\u0628 \u0627\u0644\u0643\u0644\u0645\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0631\u0628\u0639\u0627\u062a:",instructions_audio:"\u0627\u0643\u062a\u0628 \u0645\u0627 \u062a\u0633\u0645\u0639\u0647:",
help_btn:"\u0645\u0633\u0627\u0639\u062f\u0629",play_again:"\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0635\u0648\u062a \u0645\u0631\u0629 \u0623\u062e\u0631\u0649",cant_hear_this:"\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0635\u0648\u062a \u0628\u062a\u0646\u0633\u064a\u0642 MP3",incorrect_try_again:"\u063a\u064a\u0631 \u0635\u062d\u064a\u062d. \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.",image_alt_text:"\u0635\u0648\u0631\u0629 \u0627\u0644\u062a\u062d\u062f\u064a \u0645\u0646 reCAPTCHA"},
RecaptchaStr_bg={visual_challenge:"\u041f\u043e\u043b\u0443\u0447\u0430\u0432\u0430\u043d\u0435 \u043d\u0430 \u0432\u0438\u0437\u0443\u0430\u043b\u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430",audio_challenge:"\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043d\u0435 \u043d\u0430 \u0430\u0443\u0434\u0438\u043e\u0442\u0435\u0441\u0442",refresh_btn:"\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043d\u0435 \u043d\u0430 \u043d\u043e\u0432 \u0442\u0435\u0441\u0442",instructions_visual:"\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0434\u0432\u0435\u0442\u0435 \u0434\u0443\u043c\u0438:",
instructions_context:"\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0434\u0443\u043c\u0438\u0442\u0435:",instructions_audio:"\u0412\u044a\u0432\u0435\u0434\u0435\u0442\u0435 \u0447\u0443\u0442\u043e\u0442\u043e:",help_btn:"\u041f\u043e\u043c\u043e\u0449",play_again:"\u041f\u043e\u0432\u0442\u043e\u0440\u043d\u043e \u043f\u0443\u0441\u043a\u0430\u043d\u0435 \u043d\u0430 \u0437\u0432\u0443\u043a\u0430",cant_hear_this:"\u0418\u0437\u0442\u0435\u0433\u043b\u044f\u043d\u0435 \u043d\u0430 \u0437\u0432\u0443\u043a\u0430 \u0432\u044a\u0432 \u0444\u043e\u0440\u043c\u0430\u0442 MP3",
incorrect_try_again:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u043d\u043e. \u041e\u043f\u0438\u0442\u0430\u0439\u0442\u0435 \u043e\u0442\u043d\u043e\u0432\u043e.",image_alt_text:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043d\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430\u0442\u0430 \u0441 reCAPTCHA"},RecaptchaStr_bn={visual_challenge:"\u098f\u0995\u099f\u09bf \u09a6\u09c3\u09b6\u09cd\u09af\u09ae\u09be\u09a8 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be \u09aa\u09be\u09a8",
audio_challenge:"\u098f\u0995\u099f\u09bf \u0985\u09a1\u09bf\u0993 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be  \u09aa\u09be\u09a8",refresh_btn:"\u098f\u0995\u099f\u09bf \u09a8\u09a4\u09c1\u09a8 \u09aa\u09cd\u09b0\u09a4\u09bf\u09a6\u09cd\u09ac\u09a8\u09cd\u09a6\u09cd\u09ac\u09bf\u09a4\u09be  \u09aa\u09be\u09a8",instructions_visual:"\u09b6\u09ac\u09cd\u09a6 \u09a6\u09c1\u099f\u09bf \u09b2\u09bf\u0996\u09c1\u09a8:",instructions_context:"\u09ac\u09be\u0995\u09cd\u09b8\u09c7 \u09b6\u09ac\u09cd\u09a6\u0997\u09c1\u09b2\u09bf \u099f\u09be\u0987\u09aa \u0995\u09b0\u09c1\u09a8:",
instructions_audio:"\u0986\u09aa\u09a8\u09bf \u09af\u09be \u09b6\u09c1\u09a8\u099b\u09c7\u09a8 \u09a4\u09be \u09b2\u09bf\u0996\u09c1\u09a8:",help_btn:"\u09b8\u09b9\u09be\u09df\u09a4\u09be",play_again:"\u0986\u09ac\u09be\u09b0 \u09b8\u09be\u0989\u09a8\u09cd\u09a1 \u09aa\u09cd\u09b2\u09c7 \u0995\u09b0\u09c1\u09a8",cant_hear_this:"MP3 \u09b0\u09c2\u09aa\u09c7 \u09b6\u09ac\u09cd\u09a6 \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8",incorrect_try_again:"\u09ac\u09c7\u09a0\u09bf\u0995\u09f7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u09f7",
image_alt_text:"reCAPTCHA \u099a\u09cd\u09af\u09be\u09b2\u09c7\u099e\u09cd\u099c \u099a\u09bf\u09a4\u09cd\u09b0"},RecaptchaStr_ca={visual_challenge:"Obt\u00e9n un repte visual",audio_challenge:"Obteniu una prova d'\u00e0udio",refresh_btn:"Obteniu una prova nova",instructions_visual:"Escriviu les dues paraules:",instructions_context:"Escriviu les paraules dels quadres:",instructions_audio:"Escriviu el que escolteu:",help_btn:"Ajuda",play_again:"Torna a reproduir el so",cant_hear_this:"Baixa el so com a MP3",
incorrect_try_again:"No \u00e9s correcte. Torna-ho a provar.",image_alt_text:"Imatge del repte de reCAPTCHA"},RecaptchaStr_cs={visual_challenge:"Zobrazit vizu\u00e1ln\u00ed podobu v\u00fdrazu",audio_challenge:"P\u0159ehr\u00e1t zvukovou podobu v\u00fdrazu",refresh_btn:"Zobrazit nov\u00fd v\u00fdraz",instructions_visual:"Zadejte dv\u011b slova:",instructions_context:"Zadejte slova uveden\u00e1 v pol\u00edch:",instructions_audio:"Napi\u0161te, co jste sly\u0161eli:",help_btn:"N\u00e1pov\u011bda",play_again:"Znovu p\u0159ehr\u00e1t zvuk",
cant_hear_this:"St\u00e1hnout zvuk ve form\u00e1tu MP3",incorrect_try_again:"\u0160patn\u011b. Zkuste to znovu.",image_alt_text:"Obr\u00e1zek reCAPTCHA"},RecaptchaStr_da={visual_challenge:"Hent en visuel udfordring",audio_challenge:"Hent en lydudfordring",refresh_btn:"Hent en ny udfordring",instructions_visual:"Indtast de to ord:",instructions_context:"Indtast ordene i felterne:",instructions_audio:"Indtast det, du h\u00f8rer:",help_btn:"Hj\u00e6lp",play_again:"Afspil lyden igen",cant_hear_this:"Download lyd som MP3",
incorrect_try_again:"Forkert. Pr\u00f8v igen.",image_alt_text:"reCAPTCHA-udfordringsbillede"},RecaptchaStr_de={visual_challenge:"Captcha abrufen",audio_challenge:"Audio-Captcha abrufen",refresh_btn:"Neues Captcha abrufen",instructions_visual:"Geben Sie die 2 W\u00f6rter ein:",instructions_context:"Worte aus den Feldern eingeben:",instructions_audio:"Geben Sie das Geh\u00f6rte ein:",help_btn:"Hilfe",play_again:"Wort erneut abspielen",cant_hear_this:"Wort als MP3 herunterladen",incorrect_try_again:"Falsch. Bitte versuchen Sie es erneut.",
image_alt_text:"reCAPTCHA-Bild"},RecaptchaStr_el={visual_challenge:"\u039f\u03c0\u03c4\u03b9\u03ba\u03ae \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7",audio_challenge:"\u0397\u03c7\u03b7\u03c4\u03b9\u03ba\u03ae \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7",refresh_btn:"\u039d\u03ad\u03b1 \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7",instructions_visual:"\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb\u03bf\u03b3\u03ae\u03c3\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03bb\u03ad\u03be\u03b5\u03b9\u03c2:",
instructions_context:"\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb\u03bf\u03b3\u03ae\u03c3\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03bb\u03ad\u03be\u03b5\u03b9\u03c2:",instructions_audio:"\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb\u03bf\u03b3\u03ae\u03c3\u03c4\u03b5 \u03cc\u03c4\u03b9 \u03b1\u03ba\u03bf\u03cd\u03c4\u03b5:",help_btn:"\u0392\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1",play_again:"\u0391\u03bd\u03b1\u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae \u03ae\u03c7\u03bf\u03c5 \u03be\u03b1\u03bd\u03ac",
cant_hear_this:"\u039b\u03ae\u03c8\u03b7 \u03ae\u03c7\u03bf\u03c5 \u03c9\u03c2 \u039c\u03a13",incorrect_try_again:"\u039b\u03ac\u03b8\u03bf\u03c2. \u0394\u03bf\u03ba\u03b9\u03bc\u03ac\u03c3\u03c4\u03b5 \u03be\u03b1\u03bd\u03ac.",image_alt_text:"\u0395\u03b9\u03ba\u03cc\u03bd\u03b1 \u03c0\u03c1\u03cc\u03ba\u03bb\u03b7\u03c3\u03b7\u03c2 reCAPTCHA"},RecaptchaStr_es={visual_challenge:"Obtener una pista visual",audio_challenge:"Obtener una pista sonora",refresh_btn:"Obtener una pista nueva",instructions_visual:"Escribe las dos palabras:",
instructions_context:"Escribe las palabras de los cuadros:",instructions_audio:"Escribe lo que oigas:",help_btn:"Ayuda",play_again:"Volver a reproducir el sonido",cant_hear_this:"Descargar el sonido en MP3",incorrect_try_again:"Incorrecto. Vu\u00e9lvelo a intentar.",image_alt_text:"Pista de imagen reCAPTCHA"},RecaptchaStr_es_419={visual_challenge:"Enfrentar un desaf\u00edo visual",audio_challenge:"Enfrentar un desaf\u00edo de audio",refresh_btn:"Enfrentar un nuevo desaf\u00edo",instructions_visual:"Tipea las dos palabras.",
instructions_context:"Tipea las palabras en los cuadros",instructions_audio:"Tipea lo que escuchas:",help_btn:"Ayuda",play_again:"Reproducir sonido de nuevo",cant_hear_this:"Descargar sonido en formato MP3",incorrect_try_again:"Incorrecto. Vuelve a intentarlo.",image_alt_text:"Imagen del desaf\u00edo de la reCAPTCHA"},RecaptchaStr_et={visual_challenge:"Kuva kuvap\u00f5hine robotil\u00f5ks",audio_challenge:"Kuva helip\u00f5hine robotil\u00f5ks",refresh_btn:"Kuva uus robotil\u00f5ks",instructions_visual:"Tippige kaks s\u00f5na.",
instructions_context:"Tippige kastides olevad s\u00f5nad.",instructions_audio:"Tippige, mida kuulete.",help_btn:"Abi",play_again:"Esita heli uuesti",cant_hear_this:"Laadi heli alla MP3-vormingus",incorrect_try_again:"Vale. Proovige uuesti.",image_alt_text:"reCAPTCHA robotil\u00f5ksu kujutis"},RecaptchaStr_eu={visual_challenge:"Eskuratu ikusizko erronka",audio_challenge:"Eskuratu audio-erronka",refresh_btn:"Eskuratu erronka berria",instructions_visual:"Idatzi bi hitzak:",instructions_context:"Idatzi koadroetako hitzak:",
instructions_audio:"Idatzi entzuten duzuna:",help_btn:"Laguntza",play_again:"Erreproduzitu soinua berriro",cant_hear_this:"Deskargatu soinua MP3 gisa",incorrect_try_again:"Ez da zuzena. Saiatu berriro.",image_alt_text:"reCAPTCHA erronkaren irudia"},RecaptchaStr_fa={visual_challenge:"\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u062f\u06cc\u062f\u0627\u0631\u06cc",audio_challenge:"\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u0635\u0648\u062a\u06cc",
refresh_btn:"\u062f\u0631\u06cc\u0627\u0641\u062a \u06cc\u06a9 \u0645\u0639\u0645\u0627\u06cc \u062c\u062f\u06cc\u062f",instructions_visual:"\u0627\u06cc\u0646 \u062f\u0648 \u06a9\u0644\u0645\u0647 \u0631\u0627 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:",instructions_context:"\u0648\u0627\u0698\u0647 \u0647\u0627\u06cc \u0645\u0648\u062c\u0648\u062f \u062f\u0631 \u06a9\u0627\u062f\u0631\u0647\u0627 \u0631\u0627 \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:",instructions_audio:"\u0622\u0646\u0686\u0647 \u0631\u0627 \u06a9\u0647 \u0645\u06cc \u0634\u0646\u0648\u06cc\u062f \u062a\u0627\u06cc\u067e \u06a9\u0646\u06cc\u062f:",
help_btn:"\u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc",play_again:"\u067e\u062e\u0634 \u0645\u062c\u062f\u062f \u0635\u062f\u0627",cant_hear_this:"\u062f\u0627\u0646\u0644\u0648\u062f \u0635\u062f\u0627 \u0628\u0647 \u0635\u0648\u0631\u062a MP3",incorrect_try_again:"\u0646\u0627\u062f\u0631\u0633\u062a. \u062f\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062a\u062d\u0627\u0646 \u06a9\u0646\u06cc\u062f.",image_alt_text:""},RecaptchaStr_fi={visual_challenge:"Kuvavahvistus",audio_challenge:"\u00c4\u00e4nivahvistus",
refresh_btn:"Uusi kuva",instructions_visual:"Kirjoita n\u00e4kem\u00e4si kaksi sanaa:",instructions_context:"Kirjoita n\u00e4kem\u00e4si sanat:",instructions_audio:"Kirjoita kuulemasi:",help_btn:"Ohje",play_again:"Toista \u00e4\u00e4ni uudelleen",cant_hear_this:"Lataa \u00e4\u00e4ni MP3-tiedostona",incorrect_try_again:"V\u00e4\u00e4rin. Yrit\u00e4 uudelleen.",image_alt_text:"reCAPTCHA-kuva"},RecaptchaStr_fil={visual_challenge:"Kumuha ng pagsubok na visual",audio_challenge:"Kumuha ng pagsubok na audio",
refresh_btn:"Kumuha ng bagong pagsubok",instructions_visual:"I-type ang dalawang mga salita:",instructions_context:"I-type ang mga salita sa mga kahon:",instructions_audio:"I-type ang iyong narinig",help_btn:"Tulong",play_again:"I-play muli ang tunog",cant_hear_this:"I-download ang tunog bilang MP3",incorrect_try_again:"Hindi wasto. Muling subukan.",image_alt_text:"larawang panghamon ng reCAPTCHA"},RecaptchaStr_fr={visual_challenge:"Test visuel",audio_challenge:"Test audio",refresh_btn:"Nouveau test",
instructions_visual:"Saisissez les deux mots :",instructions_context:"Saisissez les mots ci-dessus :",instructions_audio:"Qu'entendez-vous ?",help_btn:"Aide",play_again:"R\u00e9\u00e9couter",cant_hear_this:"T\u00e9l\u00e9charger l'audio au format MP3",incorrect_try_again:"Incorrect. Veuillez r\u00e9essayer.",image_alt_text:"Image reCAPTCHA"},RecaptchaStr_fr_ca={visual_challenge:"Obtenir un test visuel",audio_challenge:"Obtenir un test audio",refresh_btn:"Obtenir un nouveau test",instructions_visual:"Saisissez les deux mots :",
instructions_context:"Tapez les mots dans les bo\u00eetes de texte\u00a0:",instructions_audio:"Qu'entendez-vous?",help_btn:"Aide",play_again:"Jouer le son de nouveau",cant_hear_this:"T\u00e9l\u00e9charger le son en format MP3",incorrect_try_again:"Erreur, essayez \u00e0 nouveau",image_alt_text:"Image reCAPTCHA"},RecaptchaStr_gl={visual_challenge:"Obter unha proba visual",audio_challenge:"Obter unha proba de audio",refresh_btn:"Obter unha proba nova",instructions_visual:"Escribe as d\u00faas palabras:",
instructions_context:"Escribe as palabras nas caixas:",instructions_audio:"Escribe o que escoitas:",help_btn:"Axuda",play_again:"Reproducir o son de novo",cant_hear_this:"Descargar son como MP3",incorrect_try_again:"Incorrecto. T\u00e9ntao de novo.",image_alt_text:"Imaxe de proba de reCAPTCHA"},RecaptchaStr_gu={visual_challenge:"\u0a8f\u0a95 \u0aa6\u0ac3\u0ab6\u0acd\u0aaf\u0abe\u0aa4\u0acd\u0aae\u0a95 \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb",audio_challenge:"\u0a8f\u0a95 \u0a91\u0aa1\u0abf\u0a93 \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb",
refresh_btn:"\u0a8f\u0a95 \u0aa8\u0ab5\u0acb \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0aae\u0ac7\u0ab3\u0ab5\u0acb",instructions_visual:"\u0aac\u0ac7 \u0ab6\u0aac\u0acd\u0aa6 \u0ab2\u0a96\u0acb:",instructions_context:"\u0aac\u0ac9\u0a95\u0acd\u0ab8\u0aae\u0abe\u0a82 \u0ab6\u0aac\u0acd\u0aa6\u0acb \u0ab2\u0a96\u0acb:",instructions_audio:"\u0aa4\u0aae\u0ac7 \u0a9c\u0ac7 \u0ab8\u0abe\u0a82\u0aad\u0ab3\u0acb \u0a9b\u0acb \u0aa4\u0ac7 \u0ab2\u0a96\u0acb:",help_btn:"\u0ab8\u0ab9\u0abe\u0aaf",play_again:"\u0aa7\u0acd\u0ab5\u0aa8\u0abf \u0aab\u0ab0\u0ac0\u0aa5\u0ac0 \u0a9a\u0ab2\u0abe\u0ab5\u0acb",
cant_hear_this:"MP3 \u0aa4\u0ab0\u0ac0\u0a95\u0ac7 \u0aa7\u0acd\u0ab5\u0aa8\u0abf\u0aa8\u0ac7 \u0aa1\u0abe\u0a89\u0aa8\u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0acb",incorrect_try_again:"\u0a96\u0acb\u0a9f\u0ac1\u0a82. \u0aab\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0aaf\u0abe\u0ab8 \u0a95\u0ab0\u0acb.",image_alt_text:"reCAPTCHA \u0aaa\u0aa1\u0a95\u0abe\u0ab0 \u0a9b\u0aac\u0ac0"},RecaptchaStr_hi={visual_challenge:"\u0915\u094b\u0908 \u0935\u093f\u091c\u0941\u0905\u0932 \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902",
audio_challenge:"\u0915\u094b\u0908 \u0911\u0921\u093f\u092f\u094b \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902",refresh_btn:"\u0915\u094b\u0908 \u0928\u0908 \u091a\u0941\u0928\u094c\u0924\u0940 \u0932\u0947\u0902",instructions_visual:"\u0926\u094b \u0936\u092c\u094d\u200d\u0926 \u0932\u093f\u0916\u0947\u0902:",instructions_context:"\u0936\u092c\u094d\u200d\u0926\u094b\u0902 \u0915\u094b \u092c\u0949\u0915\u094d\u200d\u0938 \u092e\u0947\u0902 \u0932\u093f\u0916\u0947\u0902:",instructions_audio:"\u091c\u094b \u0906\u092a \u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902 \u0909\u0938\u0947 \u0932\u093f\u0916\u0947\u0902:",
help_btn:"\u0938\u0939\u093e\u092f\u0924\u093e",play_again:"\u0927\u094d\u200d\u0935\u0928\u093f \u092a\u0941\u0928: \u091a\u0932\u093e\u090f\u0902",cant_hear_this:"\u0927\u094d\u200d\u0935\u0928\u093f \u0915\u094b MP3 \u0915\u0947 \u0930\u0942\u092a \u092e\u0947\u0902 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902",incorrect_try_again:"\u0917\u0932\u0924. \u092a\u0941\u0928: \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902.",image_alt_text:"reCAPTCHA \u091a\u0941\u0928\u094c\u0924\u0940 \u091b\u0935\u093f"},
RecaptchaStr_hr={visual_challenge:"Dohvati vizualni upit",audio_challenge:"Dohvati zvu\u010dni upit",refresh_btn:"Dohvati novi upit",instructions_visual:"Upi\u0161ite obje rije\u010di:",instructions_context:"Upi\u0161ite rije\u010di u okvire:",instructions_audio:"Upi\u0161ite \u0161to \u010dujete:",help_btn:"Pomo\u0107",play_again:"Ponovi zvuk",cant_hear_this:"Preuzmi zvuk u MP3 formatu",incorrect_try_again:"Nije to\u010dno. Poku\u0161ajte ponovno.",image_alt_text:"Slikovni izazov reCAPTCHA"},RecaptchaStr_hu=
{visual_challenge:"Vizu\u00e1lis kih\u00edv\u00e1s k\u00e9r\u00e9se",audio_challenge:"Hangkih\u00edv\u00e1s k\u00e9r\u00e9se",refresh_btn:"\u00daj kih\u00edv\u00e1s k\u00e9r\u00e9se",instructions_visual:"Adja meg a k\u00e9t sz\u00f3t:",instructions_context:"\u00cdrja be a szavakat a mez\u0151kbe:",instructions_audio:"\u00cdrja le, amit hall:",help_btn:"S\u00fag\u00f3",play_again:"Hang ism\u00e9telt lej\u00e1tsz\u00e1sa",cant_hear_this:"Hang let\u00f6lt\u00e9se MP3 form\u00e1tumban",incorrect_try_again:"Hib\u00e1s. Pr\u00f3b\u00e1lkozzon \u00fajra.",
image_alt_text:"reCAPTCHA ellen\u0151rz\u0151 k\u00e9p"},RecaptchaStr_hy={visual_challenge:"\u054d\u057f\u0561\u0576\u0561\u056c \u057f\u0565\u057d\u0578\u0572\u0561\u056f\u0561\u0576 \u056d\u0576\u0564\u056b\u0580",audio_challenge:"\u054d\u057f\u0561\u0576\u0561\u056c \u0571\u0561\u0575\u0576\u0561\u0575\u056b\u0576 \u056d\u0576\u0564\u056b\u0580",refresh_btn:"\u054d\u057f\u0561\u0576\u0561\u056c \u0576\u0578\u0580 \u056d\u0576\u0564\u056b\u0580",instructions_visual:"\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0561\u0575\u057d \u0565\u0580\u056f\u0578\u0582 \u0562\u0561\u057c\u0565\u0580\u0568\u055d",
instructions_context:"\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0562\u0561\u057c\u0565\u0580\u0568 \u057f\u0578\u0582\u0583\u0565\u0580\u0578\u0582\u0574\u055d",instructions_audio:"\u0544\u0578\u0582\u057f\u0584\u0561\u0563\u0580\u0565\u0584 \u0561\u0575\u0576, \u056b\u0576\u0579 \u056c\u057d\u0578\u0582\u0574 \u0565\u0584\u055d",help_btn:"\u0555\u0563\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576",play_again:"\u0546\u057e\u0561\u0563\u0561\u0580\u056f\u0565\u056c \u0571\u0561\u0575\u0576\u0568 \u056f\u0580\u056f\u056b\u0576",
cant_hear_this:"\u0532\u0565\u057c\u0576\u0565\u056c \u0571\u0561\u0575\u0576\u0568 \u0578\u0580\u057a\u0565\u057d MP3",incorrect_try_again:"\u054d\u056d\u0561\u056c \u0567: \u0553\u0578\u0580\u0571\u0565\u0584 \u056f\u0580\u056f\u056b\u0576:",image_alt_text:""},RecaptchaStr_id={visual_challenge:"Dapatkan kata pengujian berbentuk visual",audio_challenge:"Dapatkan kata pengujian berbentuk audio",refresh_btn:"Dapatkan kata pengujian baru",instructions_visual:"Ketik dua kata ini:",instructions_context:"Ketik kata di dalam kotak:",
instructions_audio:"Ketik yang Anda dengar:",help_btn:"Bantuan",play_again:"Putar suara sekali lagi",cant_hear_this:"Unduh suara sebagai MP3",incorrect_try_again:"Salah. Coba lagi.",image_alt_text:"Gambar tantangan reCAPTCHA"},RecaptchaStr_is={visual_challenge:"F\u00e1 a\u00f0gangspr\u00f3f sem mynd",audio_challenge:"F\u00e1 hlj\u00f3\u00f0pr\u00f3f",refresh_btn:"F\u00e1 n\u00fdtt a\u00f0gangspr\u00f3f",instructions_visual:"Sl\u00e1\u00f0u inn \u00feessi tv\u00f6 or\u00f0:",instructions_context:"Sl\u00e1\u00f0u or\u00f0in inn \u00ed reitina:",
instructions_audio:"Sl\u00e1\u00f0u inn \u00fea\u00f0 sem \u00fe\u00fa heyrir:",help_btn:"Hj\u00e1lp",play_again:"Spila hlj\u00f3\u00f0 aftur",cant_hear_this:"S\u00e6kja hlj\u00f3\u00f0 sem MP3",incorrect_try_again:"Rangt. Reyndu aftur.",image_alt_text:"mynd reCAPTCHA a\u00f0gangspr\u00f3fs"},RecaptchaStr_it={visual_challenge:"Verifica visiva",audio_challenge:"Verifica audio",refresh_btn:"Nuova verifica",instructions_visual:"Digita le due parole:",instructions_context:"Digita le parole nelle caselle:",
instructions_audio:"Digita ci\u00f2 che senti:",help_btn:"Guida",play_again:"Riproduci di nuovo audio",cant_hear_this:"Scarica audio in MP3",incorrect_try_again:"Sbagliato. Riprova.",image_alt_text:"Immagine di verifica reCAPTCHA"},RecaptchaStr_iw={visual_challenge:"\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05d7\u05d6\u05d5\u05ea\u05d9",audio_challenge:"\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05e9\u05de\u05e2",refresh_btn:"\u05e7\u05d1\u05dc \u05d0\u05ea\u05d2\u05e8 \u05d7\u05d3\u05e9",
instructions_visual:"\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05e9\u05ea\u05d9 \u05d4\u05de\u05d9\u05dc\u05d9\u05dd:",instructions_context:"\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05d4\u05de\u05d9\u05dc\u05d9\u05dd \u05d1\u05ea\u05d9\u05d1\u05d5\u05ea:",instructions_audio:"\u05d4\u05e7\u05dc\u05d3 \u05d0\u05ea \u05de\u05d4 \u05e9\u05d0\u05ea\u05d4 \u05e9\u05d5\u05de\u05e2:",help_btn:"\u05e2\u05d6\u05e8\u05d4",play_again:"\u05d4\u05e4\u05e2\u05dc \u05e9\u05d5\u05d1 \u05d0\u05ea \u05d4\u05e9\u05de\u05e2",
cant_hear_this:"\u05d4\u05d5\u05e8\u05d3 \u05e9\u05de\u05e2 \u05db-3MP",incorrect_try_again:"\u05e9\u05d2\u05d5\u05d9. \u05e0\u05e1\u05d4 \u05e9\u05d5\u05d1.",image_alt_text:"\u05ea\u05de\u05d5\u05e0\u05ea \u05d0\u05ea\u05d2\u05e8 \u05e9\u05dc reCAPTCHA"},RecaptchaStr_ja={visual_challenge:"\u753b\u50cf\u3067\u78ba\u8a8d\u3057\u307e\u3059",audio_challenge:"\u97f3\u58f0\u3067\u78ba\u8a8d\u3057\u307e\u3059",refresh_btn:"\u5225\u306e\u5358\u8a9e\u3067\u3084\u308a\u76f4\u3057\u307e\u3059",instructions_visual:"2 \u3064\u306e\u5358\u8a9e\u3092\u5165\u529b\u3057\u307e\u3059:",
instructions_context:"\u30dc\u30c3\u30af\u30b9\u5185\u306e\u5358\u8a9e\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044:",instructions_audio:"\u805e\u3053\u3048\u305f\u5358\u8a9e\u3092\u5165\u529b\u3057\u307e\u3059:",help_btn:"\u30d8\u30eb\u30d7",play_again:"\u3082\u3046\u4e00\u5ea6\u805e\u304f",cant_hear_this:"MP3 \u3067\u97f3\u58f0\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",incorrect_try_again:"\u6b63\u3057\u304f\u3042\u308a\u307e\u305b\u3093\u3002\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
image_alt_text:"reCAPTCHA \u78ba\u8a8d\u7528\u753b\u50cf"},RecaptchaStr_kn={visual_challenge:"\u0ca6\u0cc3\u0cb6\u0ccd\u0caf \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0ccd\u0cb5\u0cc0\u0c95\u0cb0\u0cbf\u0cb8\u0cbf",audio_challenge:"\u0c86\u0ca1\u0cbf\u0caf\u0ccb \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0ccd\u0cb5\u0cc0\u0c95\u0cb0\u0cbf\u0cb8\u0cbf",refresh_btn:"\u0cb9\u0cca\u0cb8 \u0cb8\u0cb5\u0cbe\u0cb2\u0cca\u0c82\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0caa\u0ca1\u0cc6\u0caf\u0cbf\u0cb0\u0cbf",
instructions_visual:"\u0c8e\u0cb0\u0ca1\u0cc1 \u0caa\u0ca6\u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd \u0cae\u0cbe\u0ca1\u0cbf:",instructions_context:"\u0cac\u0cbe\u0c95\u0ccd\u0cb8\u0ccd\u200c\u0ca8\u0cb2\u0ccd\u0cb2\u0cbf \u0caa\u0ca6\u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd\u200c \u0cae\u0cbe\u0ca1\u0cbf:",instructions_audio:"\u0ca8\u0cbf\u0cae\u0c97\u0cc6 \u0c95\u0cc7\u0cb3\u0cbf\u0cb8\u0cc1\u0cb5\u0cc1\u0ca6\u0ca8\u0ccd\u0ca8\u0cc1 \u0c9f\u0cc8\u0caa\u0ccd\u200c \u0cae\u0cbe\u0ca1\u0cbf:",
help_btn:"\u0cb8\u0cb9\u0cbe\u0caf",play_again:"\u0ca7\u0ccd\u0cb5\u0ca8\u0cbf\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 \u0cae\u0ca4\u0ccd\u0ca4\u0cc6 \u0caa\u0ccd\u0cb2\u0cc7 \u0cae\u0cbe\u0ca1\u0cbf",cant_hear_this:"\u0ca7\u0ccd\u0cb5\u0ca8\u0cbf\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 MP3 \u0cb0\u0cc2\u0caa\u0ca6\u0cb2\u0ccd\u0cb2\u0cbf \u0ca1\u0ccc\u0ca8\u0ccd\u200c\u0cb2\u0ccb\u0ca1\u0ccd \u0cae\u0cbe\u0ca1\u0cbf",incorrect_try_again:"\u0ca4\u0caa\u0ccd\u0caa\u0cbe\u0c97\u0cbf\u0ca6\u0cc6. \u0cae\u0ca4\u0ccd\u0ca4\u0cca\u0cae\u0ccd\u0cae\u0cc6 \u0caa\u0ccd\u0cb0\u0caf\u0ca4\u0ccd\u0ca8\u0cbf\u0cb8\u0cbf.",
image_alt_text:"reCAPTCHA \u0cb8\u0cb5\u0cbe\u0cb2\u0cc1 \u0c9a\u0cbf\u0ca4\u0ccd\u0cb0"},RecaptchaStr_ko={visual_challenge:"\uadf8\ub9bc\uc73c\ub85c \ubcf4\uc548\ubb38\uc790 \ubc1b\uae30",audio_challenge:"\uc74c\uc131\uc73c\ub85c \ubcf4\uc548\ubb38\uc790 \ubc1b\uae30",refresh_btn:"\ubcf4\uc548\ubb38\uc790 \uc0c8\ub85c \ubc1b\uae30",instructions_visual:"\ub450 \ub2e8\uc5b4 \uc785\ub825:",instructions_context:"\uc785\ub825\ub780\uc5d0 \ub2e8\uc5b4 \uc785\ub825:",instructions_audio:"\uc74c\uc131 \ubcf4\uc548\ubb38\uc790 \uc785\ub825:",
help_btn:"\ub3c4\uc6c0\ub9d0",play_again:"\uc74c\uc131 \ub2e4\uc2dc \ub4e3\uae30",cant_hear_this:"\uc74c\uc131\uc744 MP3\ub85c \ub2e4\uc6b4\ub85c\ub4dc",incorrect_try_again:"\ud2c0\ub838\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.",image_alt_text:"reCAPTCHA \uc694\uccad \uc774\ubbf8\uc9c0"},RecaptchaStr_lt={visual_challenge:"Gauti vaizdin\u012f atpa\u017einimo test\u0105",audio_challenge:"Gauti garso atpa\u017einimo test\u0105",refresh_btn:"Gauti nauj\u0105 atpa\u017einimo test\u0105",
instructions_visual:"\u012eveskite du \u017eod\u017eius:",instructions_context:"\u012eveskite \u017eod\u017eius laukeliuose:",instructions_audio:"\u012eveskite tai, k\u0105 girdite:",help_btn:"Pagalba",play_again:"Dar kart\u0105 paleisti gars\u0105",cant_hear_this:"Atsisi\u0173sti gars\u0105 kaip MP3",incorrect_try_again:"Neteisingai. Bandykite dar kart\u0105.",image_alt_text:"Testo \u201ereCAPTCHA\u201c vaizdas"},RecaptchaStr_lv={visual_challenge:"Sa\u0146emt vizu\u0101lu izaicin\u0101jumu",audio_challenge:"Sa\u0146emt audio izaicin\u0101jumu",
refresh_btn:"Sa\u0146emt jaunu izaicin\u0101jumu",instructions_visual:"Ierakstiet divus v\u0101rdus:",instructions_context:"Ierakstiet v\u0101rdus lodzi\u0146os:",instructions_audio:"Ierakstiet dzirdamo:",help_btn:"Pal\u012bdz\u012bba",play_again:"V\u0113lreiz atska\u0146ot ska\u0146u",cant_hear_this:"Lejupiel\u0101d\u0113t ska\u0146u MP3\u00a0form\u0101t\u0101",incorrect_try_again:"Nepareizi. M\u0113\u0123iniet v\u0113lreiz.",image_alt_text:"reCAPTCHA izaicin\u0101juma att\u0113ls"},RecaptchaStr_ml=
{visual_challenge:"\u0d12\u0d30\u0d41 \u0d26\u0d43\u0d36\u0d4d\u0d2f \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15",audio_challenge:"\u0d12\u0d30\u0d41 \u0d13\u0d21\u0d3f\u0d2f\u0d4b \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15",refresh_btn:"\u0d12\u0d30\u0d41 \u0d2a\u0d41\u0d24\u0d3f\u0d2f \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d28\u0d47\u0d1f\u0d41\u0d15",instructions_visual:"\u0d30\u0d23\u0d4d\u0d1f\u0d4d \u0d2a\u0d26\u0d19\u0d4d\u0d19\u0d7e \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15:",
instructions_context:"\u0d2c\u0d4b\u0d15\u0d4d\u200c\u0d38\u0d41\u0d15\u0d33\u0d3f\u0d32\u0d46 \u0d2a\u0d26\u0d19\u0d4d\u0d19\u0d7e \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d41\u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15:",instructions_audio:"\u0d15\u0d47\u0d7e\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d24\u0d4d \u0d1f\u0d48\u0d2a\u0d4d\u0d2a\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d42:",help_btn:"\u0d38\u0d39\u0d3e\u0d2f\u0d02",play_again:"\u0d36\u0d2c\u0d4d\u200c\u0d26\u0d02 \u0d35\u0d40\u0d23\u0d4d\u0d1f\u0d41\u0d02 \u0d2a\u0d4d\u0d32\u0d47 \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
cant_hear_this:"\u0d36\u0d2c\u0d4d\u200c\u0d26\u0d02 MP3 \u0d06\u0d2f\u0d3f \u0d21\u0d57\u0d7a\u0d32\u0d4b\u0d21\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",incorrect_try_again:"\u0d24\u0d46\u0d31\u0d4d\u0d31\u0d3e\u0d23\u0d4d. \u0d35\u0d40\u0d23\u0d4d\u0d1f\u0d41\u0d02 \u0d36\u0d4d\u0d30\u0d2e\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d15.",image_alt_text:"reCAPTCHA \u0d1a\u0d32\u0d1e\u0d4d\u0d1a\u0d4d \u0d07\u0d2e\u0d47\u0d1c\u0d4d"},RecaptchaStr_mr={visual_challenge:"\u0926\u0943\u0936\u094d\u200d\u092f\u092e\u093e\u0928 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e",
audio_challenge:"\u0911\u0921\u0940\u0913 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e",refresh_btn:"\u090f\u0915 \u0928\u0935\u0940\u0928 \u0906\u0935\u094d\u0939\u093e\u0928 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u093e",instructions_visual:"\u0926\u094b\u0928 \u0936\u092c\u094d\u0926 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:",instructions_context:"\u092c\u0949\u0915\u094d\u200d\u0938\u0947\u0938\u092e\u0927\u0940\u0932 \u0936\u092c\u094d\u200d\u0926 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:",
instructions_audio:"\u0906\u092a\u0932\u094d\u092f\u093e\u0932\u093e \u091c\u0947 \u0910\u0915\u0942 \u092f\u0947\u0908\u0932 \u0924\u0947 \u091f\u093e\u0907\u092a \u0915\u0930\u093e:",help_btn:"\u092e\u0926\u0924",play_again:"\u0927\u094d\u200d\u0935\u0928\u0940 \u092a\u0941\u0928\u094d\u0939\u093e \u092a\u094d\u200d\u0932\u0947 \u0915\u0930\u093e",cant_hear_this:"MP3 \u0930\u0941\u092a\u093e\u0924 \u0927\u094d\u200d\u0935\u0928\u0940 \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u093e",
incorrect_try_again:"\u0905\u092f\u094b\u0917\u094d\u200d\u092f. \u092a\u0941\u0928\u094d\u200d\u0939\u093e \u092a\u094d\u0930\u092f\u0924\u094d\u200d\u0928 \u0915\u0930\u093e.",image_alt_text:"reCAPTCHA \u0906\u0935\u094d\u200d\u0939\u093e\u0928 \u092a\u094d\u0930\u0924\u093f\u092e\u093e"},RecaptchaStr_ms={visual_challenge:"Dapatkan cabaran visual",audio_challenge:"Dapatkan cabaran audio",refresh_btn:"Dapatkan cabaran baru",instructions_visual:"Taip kedua-dua perkataan:",instructions_context:"Taip perkataan dalam kotak:",
instructions_audio:"Taip apa yang didengari:",help_btn:"Bantuan",play_again:"Mainkan bunyi sekali lagi",cant_hear_this:"Muat turun bunyi sebagai MP3",incorrect_try_again:"Tidak betul. Cuba lagi.",image_alt_text:"Imej cabaran reCAPTCHA"},RecaptchaStr_nl={visual_challenge:"Een visuele uitdaging proberen",audio_challenge:"Een audio-uitdaging proberen",refresh_btn:"Een nieuwe uitdaging proberen",instructions_visual:"Typ de twee woorden:",instructions_context:"Typ de woorden in de vakken:",instructions_audio:"Typ wat u hoort:",
help_btn:"Help",play_again:"Geluid opnieuw afspelen",cant_hear_this:"Geluid downloaden als MP3",incorrect_try_again:"Onjuist. Probeer het opnieuw.",image_alt_text:"reCAPTCHA-uitdagingsafbeelding"},RecaptchaStr_no={visual_challenge:"F\u00e5 en bildeutfordring",audio_challenge:"F\u00e5 en lydutfordring",refresh_btn:"F\u00e5 en ny utfordring",instructions_visual:"Skriv inn de to ordene:",instructions_context:"Skriv inn ordene i feltene:",instructions_audio:"Skriv inn det du h\u00f8rer:",help_btn:"Hjelp",
play_again:"Spill av lyd p\u00e5 nytt",cant_hear_this:"Last ned lyd som MP3",incorrect_try_again:"Feil. Pr\u00f8v p\u00e5 nytt.",image_alt_text:"reCAPTCHA-utfordringsbilde"},RecaptchaStr_pl={visual_challenge:"Poka\u017c podpowied\u017a wizualn\u0105",audio_challenge:"Odtw\u00f3rz podpowied\u017a d\u017awi\u0119kow\u0105",refresh_btn:"Nowa podpowied\u017a",instructions_visual:"Wpisz oba wyrazy:",instructions_context:"Wpisz s\u0142owa wy\u015bwietlane w polach:",instructions_audio:"Wpisz us\u0142yszane s\u0142owa:",
help_btn:"Pomoc",play_again:"Odtw\u00f3rz d\u017awi\u0119k ponownie",cant_hear_this:"Pobierz d\u017awi\u0119k jako plik MP3",incorrect_try_again:"Nieprawid\u0142owo. Spr\u00f3buj ponownie.",image_alt_text:"Zadanie obrazkowe reCAPTCHA"},RecaptchaStr_pt={visual_challenge:"Obter um desafio visual",audio_challenge:"Obter um desafio de \u00e1udio",refresh_btn:"Obter um novo desafio",instructions_visual:"Digite as duas palavras:",instructions_context:"Digite as palavras das caixas:",instructions_audio:"Digite o que voc\u00ea ouve:",
help_btn:"Ajuda",play_again:"Reproduzir som novamente",cant_hear_this:"Fazer download do som no formato MP3",incorrect_try_again:"Incorreto. Tente novamente.",image_alt_text:"Imagem de desafio reCAPTCHA"},RecaptchaStr_pt_pt={visual_challenge:"Obter um desafio visual",audio_challenge:"Obter um desafio de \u00e1udio",refresh_btn:"Obter um novo desafio",instructions_visual:"Escreva as duas palavras:",instructions_context:"Escreva as palavras nas caixas:",instructions_audio:"Escreva o que ouvir:",help_btn:"Ajuda",
play_again:"Reproduzir som novamente",cant_hear_this:"Transferir som como MP3",incorrect_try_again:"Incorreto. Tente novamente.",image_alt_text:"Imagem de desafio reCAPTCHA"},RecaptchaStr_ro={visual_challenge:"Ob\u0163ine\u0163i un cod captcha vizual",audio_challenge:"Ob\u0163ine\u0163i un cod captcha audio",refresh_btn:"Ob\u0163ine\u0163i un nou cod captcha",instructions_visual:"Introduce\u0163i cele dou\u0103 cuvinte:",instructions_context:"Introduce\u0163i cuvintele \u00een casete:",instructions_audio:"Introduce\u0163i ceea ce auzi\u0163i:",
help_btn:"Ajutor",play_again:"Reda\u0163i sunetul din nou",cant_hear_this:"Desc\u0103rca\u0163i fi\u015fierul audio ca MP3",incorrect_try_again:"Incorect. \u00cencerca\u0163i din nou.",image_alt_text:"Imagine de verificare reCAPTCHA"},RecaptchaStr_ru={visual_challenge:"\u0412\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430",audio_challenge:"\u0417\u0432\u0443\u043a\u043e\u0432\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430",refresh_btn:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c",
instructions_visual:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u043e, \u0447\u0442\u043e \u0432\u0438\u0434\u0438\u0442\u0435:",instructions_context:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043b\u043e\u0432\u0430:",instructions_audio:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u043e, \u0447\u0442\u043e \u0441\u043b\u044b\u0448\u0438\u0442\u0435:",help_btn:"\u0421\u043f\u0440\u0430\u0432\u043a\u0430",play_again:"\u041f\u0440\u043e\u0441\u043b\u0443\u0448\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437",
cant_hear_this:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c MP3-\u0444\u0430\u0439\u043b",incorrect_try_again:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.",image_alt_text:"\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u043e \u0441\u043b\u043e\u0432\u0443 reCAPTCHA"},RecaptchaStr_sk={visual_challenge:"Zobrazi\u0165 vizu\u00e1lnu podobu",audio_challenge:"Prehra\u0165 zvukov\u00fa podobu",
refresh_btn:"Zobrazi\u0165 nov\u00fd v\u00fdraz",instructions_visual:"Zadajte tieto dve slov\u00e1:",instructions_context:"Zadajte slov\u00e1 v poliach:",instructions_audio:"Zadajte, \u010do po\u010dujete:",help_btn:"Pomocn\u00edk",play_again:"Znova prehra\u0165 zvuk",cant_hear_this:"Prevzia\u0165 zvuk v podobe s\u00faboru MP3",incorrect_try_again:"Nespr\u00e1vne. Sk\u00faste to znova.",image_alt_text:"Obr\u00e1zok zadania reCAPTCHA"},RecaptchaStr_sl={visual_challenge:"Vizualni preskus",audio_challenge:"Zvo\u010dni preskus",
refresh_btn:"Nov preskus",instructions_visual:"Vnesite besedi:",instructions_context:"Vnesite besede v okvir\u010dkih:",instructions_audio:"Natipkajte, kaj sli\u0161ite:",help_btn:"Pomo\u010d",play_again:"Znova predvajaj zvok",cant_hear_this:"Prenesi zvok kot MP3",incorrect_try_again:"Napa\u010dno. Poskusite znova.",image_alt_text:"Slika izziva reCAPTCHA"},RecaptchaStr_sr={visual_challenge:"\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u0432\u0438\u0437\u0443\u0435\u043b\u043d\u0438 \u0443\u043f\u0438\u0442",
audio_challenge:"\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u0430\u0443\u0434\u0438\u043e \u0443\u043f\u0438\u0442",refresh_btn:"\u041f\u0440\u0438\u043c\u0438\u0442\u0435 \u043d\u043e\u0432\u0438 \u0443\u043f\u0438\u0442",instructions_visual:"\u041e\u0442\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u0434\u0432\u0435 \u0440\u0435\u0447\u0438:",instructions_context:"\u0423\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u0440\u0435\u0447\u0438 \u0443 \u043f\u043e\u0459\u0430:",instructions_audio:"\u041e\u0442\u043a\u0443\u0446\u0430\u0458\u0442\u0435 \u043e\u043d\u043e \u0448\u0442\u043e \u0447\u0443\u0458\u0435\u0442\u0435:",
help_btn:"\u041f\u043e\u043c\u043e\u045b",play_again:"\u041f\u043e\u043d\u043e\u0432\u043e \u043f\u0443\u0441\u0442\u0438 \u0437\u0432\u0443\u043a",cant_hear_this:"\u041f\u0440\u0435\u0443\u0437\u043c\u0438 \u0437\u0432\u0443\u043a \u043a\u0430\u043e MP3 \u0441\u043d\u0438\u043c\u0430\u043a",incorrect_try_again:"\u041d\u0435\u0442\u0430\u0447\u043d\u043e. \u041f\u043e\u043a\u0443\u0448\u0430\u0458\u0442\u0435 \u043f\u043e\u043d\u043e\u0432\u043e.",image_alt_text:"\u0421\u043b\u0438\u043a\u0430 reCAPTCHA \u043f\u0440\u043e\u0432\u0435\u0440\u0435"},
RecaptchaStr_sv={visual_challenge:"H\u00e4mta captcha i bildformat",audio_challenge:"H\u00e4mta captcha i ljudformat",refresh_btn:"H\u00e4mta ny captcha",instructions_visual:"Skriv b\u00e5da orden:",instructions_context:"Skriv orden i rutorna:",instructions_audio:"Skriv det du h\u00f6r:",help_btn:"Hj\u00e4lp",play_again:"Spela upp ljudet igen",cant_hear_this:"H\u00e4mta ljud som MP3",incorrect_try_again:"Fel. F\u00f6rs\u00f6k igen.",image_alt_text:"reCAPTCHA-bild"},RecaptchaStr_sw={visual_challenge:"Pata changamoto ya kuona",
audio_challenge:"Pata changamoto ya sauti",refresh_btn:"Pata changamoto mpya",instructions_visual:"Charaza maneno mawili:",instructions_context:"Charaza maneno katika masanduku:",instructions_audio:"Charaza unachosikia:",help_btn:"Msaada",play_again:"Cheza sauti tena",cant_hear_this:"Pakua sauti kama MP3",incorrect_try_again:"Sio sahihi. Jaribu tena.",image_alt_text:"picha ya changamoto ya reCAPTCHA"},RecaptchaStr_ta={visual_challenge:"\u0baa\u0bbe\u0bb0\u0bcd\u0bb5\u0bc8 \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95",
audio_challenge:"\u0b86\u0b9f\u0bbf\u0baf\u0bcb \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95",refresh_btn:"\u0baa\u0bc1\u0ba4\u0bbf\u0baf \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bc8\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0b95",instructions_visual:"\u0b9a\u0bca\u0bb1\u0bcd\u0b95\u0bb3\u0bc8 \u0b9f\u0bc8\u0baa\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0b95:",instructions_context:"\u0baa\u0bc6\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bbf\u0bb2\u0bcd \u0b89\u0bb3\u0bcd\u0bb3 \u0b9a\u0bca\u0bb1\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3\u0bbf\u0b9f\u0bc1\u0b95:",
instructions_audio:"\u0b95\u0bc7\u0b9f\u0bcd\u0baa\u0ba4\u0bc8 \u0b9f\u0bc8\u0baa\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0b95:",help_btn:"\u0b89\u0ba4\u0bb5\u0bbf",play_again:"\u0b92\u0bb2\u0bbf\u0baf\u0bc8 \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0b87\u0baf\u0b95\u0bcd\u0b95\u0bc1",cant_hear_this:"\u0b92\u0bb2\u0bbf\u0baf\u0bc8 MP3 \u0b86\u0b95 \u0baa\u0ba4\u0bbf\u0bb5\u0bbf\u0bb1\u0b95\u0bcd\u0b95\u0bc1\u0b95",incorrect_try_again:"\u0ba4\u0bb5\u0bb1\u0bbe\u0ba9\u0ba4\u0bc1. \u0bae\u0bc0\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd \u0bae\u0bc1\u0baf\u0bb2\u0bb5\u0bc1\u0bae\u0bcd.",
image_alt_text:"reCAPTCHA \u0b9a\u0bc7\u0bb2\u0b9e\u0bcd\u0b9a\u0bcd \u0baa\u0b9f\u0bae\u0bcd"},RecaptchaStr_te={visual_challenge:"\u0c12\u0c15 \u0c26\u0c43\u0c36\u0c4d\u0c2f\u0c2e\u0c3e\u0c28 \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",audio_challenge:"\u0c12\u0c15 \u0c06\u0c21\u0c3f\u0c2f\u0c4b \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",refresh_btn:"\u0c15\u0c4d\u0c30\u0c4a\u0c24\u0c4d\u0c24 \u0c38\u0c35\u0c3e\u0c32\u0c41\u0c28\u0c41 \u0c38\u0c4d\u0c35\u0c40\u0c15\u0c30\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f",
instructions_visual:"\u0c30\u0c46\u0c02\u0c21\u0c41 \u0c2a\u0c26\u0c3e\u0c32\u0c28\u0c41 \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:",instructions_context:"\u0c2a\u0c26\u0c3e\u0c32\u0c28\u0c41 \u0c2a\u0c46\u0c1f\u0c4d\u0c1f\u0c46\u0c32\u0c4d\u0c32\u0c4b \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:",instructions_audio:"\u0c2e\u0c40\u0c30\u0c41 \u0c35\u0c3f\u0c28\u0c4d\u0c28\u0c26\u0c3f \u0c1f\u0c48\u0c2a\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f:",help_btn:"\u0c38\u0c39\u0c3e\u0c2f\u0c02",
play_again:"\u0c27\u0c4d\u0c35\u0c28\u0c3f\u0c28\u0c3f \u0c2e\u0c33\u0c4d\u0c32\u0c40 \u0c2a\u0c4d\u0c32\u0c47 \u0c1a\u0c47\u0c2f\u0c3f",cant_hear_this:"\u0c27\u0c4d\u0c35\u0c28\u0c3f\u0c28\u0c3f MP3 \u0c35\u0c32\u0c46 \u0c21\u0c4c\u0c28\u0c4d\u200c\u0c32\u0c4b\u0c21\u0c4d \u0c1a\u0c47\u0c2f\u0c3f",incorrect_try_again:"\u0c24\u0c2a\u0c4d\u0c2a\u0c41. \u0c2e\u0c33\u0c4d\u0c32\u0c40 \u0c2a\u0c4d\u0c30\u0c2f\u0c24\u0c4d\u0c28\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f.",image_alt_text:"reCAPTCHA \u0c38\u0c35\u0c3e\u0c32\u0c41 \u0c1a\u0c3f\u0c24\u0c4d\u0c30\u0c02"},
RecaptchaStr_th={visual_challenge:"\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e14\u0e49\u0e32\u0e19\u0e20\u0e32\u0e1e",audio_challenge:"\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e14\u0e49\u0e32\u0e19\u0e40\u0e2a\u0e35\u0e22\u0e07",refresh_btn:"\u0e23\u0e31\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e17\u0e49\u0e32\u0e17\u0e32\u0e22\u0e43\u0e2b\u0e21\u0e48",instructions_visual:"\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e04\u0e33\u0e2a\u0e2d\u0e07\u0e04\u0e33\u0e19\u0e31\u0e49\u0e19:",
instructions_context:"\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e04\u0e33\u0e19\u0e31\u0e49\u0e19\u0e43\u0e19\u0e0a\u0e48\u0e2d\u0e07\u0e19\u0e35\u0e49:",instructions_audio:"\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19:",help_btn:"\u0e04\u0e27\u0e32\u0e21\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",play_again:"\u0e40\u0e25\u0e48\u0e19\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",cant_hear_this:"\u0e14\u0e32\u0e27\u0e42\u0e2b\u0e25\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e40\u0e1b\u0e47\u0e19 MP3",
incorrect_try_again:"\u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07 \u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",image_alt_text:"\u0e23\u0e2b\u0e31\u0e2a\u0e20\u0e32\u0e1e reCAPTCHA"},RecaptchaStr_tr={visual_challenge:"G\u00f6rsel sorgu al",audio_challenge:"Sesli sorgu al",refresh_btn:"Yeniden y\u00fckle",instructions_visual:"\u0130ki kelimeyi yaz\u0131n:",instructions_context:"Kutudaki kelimeleri yaz\u0131n:",instructions_audio:"Duydu\u011funuzu yaz\u0131n:",
help_btn:"Yard\u0131m",play_again:"Sesi tekrar \u00e7al",cant_hear_this:"Sesi MP3 olarak indir",incorrect_try_again:"Yanl\u0131\u015f. Tekrar deneyin.",image_alt_text:"reCAPTCHA sorusu resmi"},RecaptchaStr_uk={visual_challenge:"\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0432\u0456\u0437\u0443\u0430\u043b\u044c\u043d\u0438\u0439 \u0442\u0435\u043a\u0441\u0442",audio_challenge:"\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0430\u0443\u0434\u0456\u043e\u0437\u0430\u043f\u0438\u0441",refresh_btn:"\u041e\u043d\u043e\u0432\u0438\u0442\u0438 \u0442\u0435\u043a\u0441\u0442",
instructions_visual:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0434\u0432\u0430 \u0441\u043b\u043e\u0432\u0430:",instructions_context:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0441\u043b\u043e\u0432\u0430 \u0432 \u043f\u043e\u043b\u044f:",instructions_audio:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u043f\u043e\u0447\u0443\u0442\u0435:",help_btn:"\u0414\u043e\u0432\u0456\u0434\u043a\u0430",play_again:"\u0412\u0456\u0434\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0437\u0430\u043f\u0438\u0441 \u0449\u0435 \u0440\u0430\u0437",
cant_hear_this:"\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u0430\u043f\u0438\u0441 \u044f\u043a MP3",incorrect_try_again:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e. \u0421\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",image_alt_text:"\u0417\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f reCAPTCHA"},RecaptchaStr_ur={visual_challenge:"\u0627\u06cc\u06a9 \u0645\u0631\u0626\u06cc \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba",
audio_challenge:"\u0627\u06cc\u06a9 \u0622\u0688\u06cc\u0648 \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba",refresh_btn:"\u0627\u06cc\u06a9 \u0646\u06cc\u0627 \u0686\u06cc\u0644\u0646\u062c \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba",instructions_visual:"\u062f\u0648 \u0627\u0644\u0641\u0627\u0638 \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:",instructions_context:"\u0627\u0644\u0641\u0627\u0638 \u06a9\u0648 \u062e\u0627\u0646\u0648\u06ba \u0645\u06cc\u06ba \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:",
instructions_audio:"\u0622\u067e \u06a9\u0648 \u062c\u0648 \u0633\u0646\u0627\u0626\u06cc \u062f\u06cc\u062a\u0627 \u06c1\u06d2 \u0627\u0633\u06d2 \u0679\u0627\u0626\u067e \u06a9\u0631\u06cc\u06ba:",help_btn:"\u0645\u062f\u062f",play_again:"\u0622\u0648\u0627\u0632 \u062f\u0648\u0628\u0627\u0631\u06c1 \u0686\u0644\u0627\u0626\u06cc\u06ba",cant_hear_this:"\u0622\u0648\u0627\u0632 \u06a9\u0648 MP3 \u06a9\u06d2 \u0628\u0637\u0648\u0631 \u0688\u0627\u0624\u0646 \u0644\u0648\u0688 \u06a9\u0631\u06cc\u06ba",
incorrect_try_again:"\u063a\u0644\u0637\u06d4 \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba\u06d4",image_alt_text:"reCAPTCHA \u0686\u06cc\u0644\u0646\u062c \u0648\u0627\u0644\u06cc \u0634\u0628\u06cc\u06c1"},RecaptchaStr_vi={visual_challenge:"Nh\u1eadn th\u1eed th\u00e1ch h\u00ecnh \u1ea3nh",audio_challenge:"Nh\u1eadn th\u1eed th\u00e1ch \u00e2m thanh",refresh_btn:"Nh\u1eadn th\u1eed th\u00e1ch m\u1edbi",instructions_visual:"Nh\u1eadp hai t\u1eeb:",instructions_context:"Nh\u1eadp c\u00e1c t\u1eeb trong c\u00e1c \u00f4:",
instructions_audio:"Nh\u1eadp n\u1ed9i dung b\u1ea1n nghe th\u1ea5y:",help_btn:"Tr\u1ee3 gi\u00fap",play_again:"Ph\u00e1t l\u1ea1i \u00e2m thanh",cant_hear_this:"T\u1ea3i \u00e2m thanh xu\u1ed1ng d\u01b0\u1edbi d\u1ea1ng MP3",incorrect_try_again:"Kh\u00f4ng ch\u00ednh x\u00e1c. H\u00e3y th\u1eed l\u1ea1i.",image_alt_text:"H\u00ecnh x\u00e1c th\u1ef1c reCAPTCHA"},RecaptchaStr_zh_cn={visual_challenge:"\u6536\u5230\u4e00\u4e2a\u89c6\u9891\u9080\u8bf7",audio_challenge:"\u6362\u4e00\u7ec4\u97f3\u9891\u9a8c\u8bc1\u7801",
refresh_btn:"\u6362\u4e00\u7ec4\u9a8c\u8bc1\u7801",instructions_visual:"\u8bf7\u952e\u5165\u8fd9\u4e24\u4e2a\u8bcd\uff1a",instructions_context:"\u952e\u5165\u6846\u4e2d\u663e\u793a\u7684\u5b57\u8bcd\uff1a",instructions_audio:"\u8bf7\u952e\u5165\u60a8\u542c\u5230\u7684\u5185\u5bb9\uff1a",help_btn:"\u5e2e\u52a9",play_again:"\u91cd\u65b0\u64ad\u653e",cant_hear_this:"\u4ee5 MP3 \u683c\u5f0f\u4e0b\u8f7d\u58f0\u97f3",incorrect_try_again:"\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u8bd5\u3002",image_alt_text:"reCAPTCHA \u9a8c\u8bc1\u56fe\u7247"},
RecaptchaStr_zh_hk={visual_challenge:"\u56de\u7b54\u5716\u50cf\u9a57\u8b49\u554f\u984c",audio_challenge:"\u53d6\u5f97\u8a9e\u97f3\u9a57\u8b49\u554f\u984c",refresh_btn:"\u63db\u4e00\u500b\u9a57\u8b49\u554f\u984c",instructions_visual:"\u8acb\u8f38\u5165\u9019\u5169\u500b\u5b57\uff1a",instructions_context:"\u5728\u6846\u5167\u8f38\u5165\u5b57\u8a5e\uff1a",instructions_audio:"\u9375\u5165\u60a8\u6240\u807d\u5230\u7684\uff1a",help_btn:"\u8aaa\u660e",play_again:"\u518d\u6b21\u64ad\u653e\u8072\u97f3",cant_hear_this:"\u5c07\u8072\u97f3\u4e0b\u8f09\u70ba MP3",
incorrect_try_again:"\u4e0d\u6b63\u78ba\uff0c\u518d\u8a66\u4e00\u6b21\u3002",image_alt_text:"reCAPTCHA \u9a57\u8b49\u6587\u5b57\u5716\u7247"},RecaptchaStr_zh_tw={visual_challenge:"\u53d6\u5f97\u5716\u7247\u9a57\u8b49\u554f\u984c",audio_challenge:"\u53d6\u5f97\u8a9e\u97f3\u9a57\u8b49\u554f\u984c",refresh_btn:"\u53d6\u5f97\u65b0\u7684\u9a57\u8b49\u554f\u984c",instructions_visual:"\u8acb\u8f38\u5165\u4e0b\u5716\u4e2d\u7684\u5169\u500b\u5b57\uff1a",instructions_context:"\u8acb\u8f38\u5165\u65b9\u584a\u4e2d\u7684\u6587\u5b57\uff1a",
instructions_audio:"\u8acb\u8f38\u5165\u8a9e\u97f3\u5167\u5bb9\uff1a",help_btn:"\u8aaa\u660e",play_again:"\u518d\u6b21\u64ad\u653e",cant_hear_this:"\u4ee5 MP3 \u683c\u5f0f\u4e0b\u8f09\u8072\u97f3",incorrect_try_again:"\u9a57\u8b49\u78bc\u6709\u8aa4\uff0c\u8acb\u518d\u8a66\u4e00\u6b21\u3002",image_alt_text:"reCAPTCHA \u9a57\u8b49\u6587\u5b57\u5716\u7247"},RecaptchaStr_zu={visual_challenge:"Thola inselelo ebonakalayo",audio_challenge:"Thola inselelo yokulalelwayo",refresh_btn:"Thola inselelo entsha",
instructions_visual:"Bhala lawa magama amabili:",instructions_context:"Bhala amagama asemabhokisini:",instructions_audio:"Bhala okuzwayo:",help_btn:"Usizo",play_again:"Phinda udlale okulalelwayo futhi",cant_hear_this:"Layisha umsindo njenge-MP3",incorrect_try_again:"Akulungile. Zama futhi.",image_alt_text:"umfanekiso oyinselelo we-reCAPTCHA"},RecaptchaLangMap={en:RecaptchaStr_en,af:RecaptchaStr_af,am:RecaptchaStr_am,ar:RecaptchaStr_ar,"ar-EG":RecaptchaStr_ar,bg:RecaptchaStr_bg,bn:RecaptchaStr_bn,
ca:RecaptchaStr_ca,cs:RecaptchaStr_cs,da:RecaptchaStr_da,de:RecaptchaStr_de,el:RecaptchaStr_el,"en-GB":RecaptchaStr_en,"en-US":RecaptchaStr_en,es:RecaptchaStr_es,"es-419":RecaptchaStr_es_419,"es-ES":RecaptchaStr_es,et:RecaptchaStr_et,eu:RecaptchaStr_eu,fa:RecaptchaStr_fa,fi:RecaptchaStr_fi,fil:RecaptchaStr_fil,fr:RecaptchaStr_fr,"fr-CA":RecaptchaStr_fr_ca,"fr-FR":RecaptchaStr_fr,gl:RecaptchaStr_gl,gu:RecaptchaStr_gu,hi:RecaptchaStr_hi,hr:RecaptchaStr_hr,hu:RecaptchaStr_hu,hy:RecaptchaStr_hy,id:RecaptchaStr_id,
is:RecaptchaStr_is,it:RecaptchaStr_it,iw:RecaptchaStr_iw,ja:RecaptchaStr_ja,kn:RecaptchaStr_kn,ko:RecaptchaStr_ko,ln:RecaptchaStr_fr,lt:RecaptchaStr_lt,lv:RecaptchaStr_lv,ml:RecaptchaStr_ml,mr:RecaptchaStr_mr,ms:RecaptchaStr_ms,nl:RecaptchaStr_nl,no:RecaptchaStr_no,pl:RecaptchaStr_pl,pt:RecaptchaStr_pt,"pt-BR":RecaptchaStr_pt,"pt-PT":RecaptchaStr_pt_pt,ro:RecaptchaStr_ro,ru:RecaptchaStr_ru,sk:RecaptchaStr_sk,sl:RecaptchaStr_sl,sr:RecaptchaStr_sr,sv:RecaptchaStr_sv,sw:RecaptchaStr_sw,ta:RecaptchaStr_ta,
te:RecaptchaStr_te,th:RecaptchaStr_th,tr:RecaptchaStr_tr,uk:RecaptchaStr_uk,ur:RecaptchaStr_ur,vi:RecaptchaStr_vi,"zh-CN":RecaptchaStr_zh_cn,"zh-HK":RecaptchaStr_zh_hk,"zh-TW":RecaptchaStr_zh_tw,zu:RecaptchaStr_zu,tl:RecaptchaStr_fil,he:RecaptchaStr_iw,"in":RecaptchaStr_id,mo:RecaptchaStr_ro,zh:RecaptchaStr_zh_cn};var RecaptchaStr=RecaptchaStr_en,RecaptchaOptions,RecaptchaDefaultOptions={tabindex:0,theme:"red",callback:null,lang:null,custom_theme_widget:null,custom_translations:null,includeContext:!1},Recaptcha={widget:null,timer_id:-1,style_set:!1,theme:null,type:"image",ajax_verify_cb:null,$:function(a){return"string"==typeof a?document.getElementById(a):a},create:function(a,b,c){Recaptcha.destroy();b&&(Recaptcha.widget=Recaptcha.$(b));Recaptcha._init_options(c);Recaptcha._call_challenge(a)},destroy:function(){var a=
Recaptcha.$("recaptcha_challenge_field");a&&a.parentNode.removeChild(a);-1!=Recaptcha.timer_id&&clearInterval(Recaptcha.timer_id);Recaptcha.timer_id=-1;if(a=Recaptcha.$("recaptcha_image"))a.innerHTML="";Recaptcha.widget&&("custom"!=Recaptcha.theme?Recaptcha.widget.innerHTML="":Recaptcha.widget.style.display="none",Recaptcha.widget=null)},focus_response_field:function(){var a=Recaptcha.$("recaptcha_response_field");a.focus()},get_challenge:function(){return"undefined"==typeof RecaptchaState?null:RecaptchaState.challenge},
get_response:function(){var a=Recaptcha.$("recaptcha_response_field");return!a?null:a.value},ajax_verify:function(a){Recaptcha.ajax_verify_cb=a;var a=Recaptcha.get_challenge()||"",b=Recaptcha.get_response()||"",a=Recaptcha._get_api_server()+"/ajaxverify?c="+encodeURIComponent(a)+"&response="+encodeURIComponent(b);Recaptcha._add_script(a)},_ajax_verify_callback:function(a){Recaptcha.ajax_verify_cb(a)},_get_api_server:function(){var a=window.location.protocol,b;if("undefined"!=typeof _RecaptchaOverrideApiServer)b=
_RecaptchaOverrideApiServer;else{if("undefined"!=typeof RecaptchaState&&"string"==typeof RecaptchaState.server&&0<RecaptchaState.server.length)return RecaptchaState.server.replace(/\/+$/,"");b="www.google.com/recaptcha/api"}return a+"//"+b},_call_challenge:function(a){a=Recaptcha._get_api_server()+"/challenge?k="+a+"&ajax=1&cachestop="+Math.random();Recaptcha.getLang_()&&(a+="&lang="+Recaptcha.getLang_());"undefined"!=typeof RecaptchaOptions.extra_challenge_params&&(a+="&"+RecaptchaOptions.extra_challenge_params);
RecaptchaOptions.includeContext&&(a+="&includeContext=1");Recaptcha._add_script(a)},_add_script:function(a){var b=document.createElement("script");b.type="text/javascript";b.src=a;Recaptcha._get_script_area().appendChild(b)},_get_script_area:function(){var a=document.getElementsByTagName("head");return a=!a||1>a.length?document.body:a[0]},_hash_merge:function(a){for(var b={},c=0;c<a.length;c++)for(var d in a[c])b[d]=a[c][d];"context"==b.theme&&(b.includeContext=!0);return b},_init_options:function(a){a=
a||{};RecaptchaOptions=Recaptcha._hash_merge([RecaptchaDefaultOptions,a])},challenge_callback:function(){var a=Recaptcha.widget;Recaptcha._reset_timer();RecaptchaStr=Recaptcha._hash_merge([RecaptchaStr_en,RecaptchaLangMap[Recaptcha.getLang_()]||{},RecaptchaOptions.custom_translations||{}]);window.addEventListener&&window.addEventListener("unload",function(a){Recaptcha.destroy()},!1);Recaptcha._is_ie()&&window.attachEvent&&window.attachEvent("onbeforeunload",function(){});if(0<navigator.userAgent.indexOf("KHTML")){a=
document.createElement("iframe");a.src="about:blank";a.style.height="0px";a.style.width="0px";a.style.visibility="hidden";a.style.border="none";var b=document.createTextNode("This frame prevents back/forward cache problems in Safari.");a.appendChild(b);document.body.appendChild(a)}Recaptcha._finish_widget()},_add_css:function(a){if(-1!=navigator.appVersion.indexOf("MSIE 5"))document.write('<style type="text/css">'+a+"</style>");else{var b=document.createElement("style");b.type="text/css";b.styleSheet?
b.styleSheet.cssText=a:(a=document.createTextNode(a),b.appendChild(a));Recaptcha._get_script_area().appendChild(b)}},_set_style:function(a){Recaptcha.style_set||(Recaptcha.style_set=!0,Recaptcha._add_css(a+"\n\n.recaptcha_is_showing_audio .recaptcha_only_if_image,.recaptcha_isnot_showing_audio .recaptcha_only_if_audio,.recaptcha_had_incorrect_sol .recaptcha_only_if_no_incorrect_sol,.recaptcha_nothad_incorrect_sol .recaptcha_only_if_incorrect_sol{display:none !important}"))},_init_builtin_theme:function(){var a=
Recaptcha.$,b=Recaptcha._get_api_server(),c=b.length-1;"/"==b[c]&&(b=b.substring(0,c));var c=RecaptchaTemplates.VertCss,d=RecaptchaTemplates.VertHtml,e=b+"/img/"+Recaptcha.theme,f="gif",b=Recaptcha.theme;"clean"==b&&(c=RecaptchaTemplates.CleanCss,d=RecaptchaTemplates.CleanHtml,f="png");"context"==b&&(d=RecaptchaTemplates.ContextHtml);c=c.replace(/IMGROOT/g,e);Recaptcha._set_style(c);Recaptcha.widget.innerHTML='<div id="recaptcha_area">'+d+"</div>";c=function(b,c,d,h){var g=a(b+"_btn"),b=a(b);b.src=
e+"/"+c+"."+f;c=RecaptchaStr[d];b.alt=c;g.title=c;g.href=h};c("recaptcha_reload","refresh","refresh_btn","javascript:Recaptcha.reload();");c("recaptcha_switch_audio","audio","audio_challenge","javascript:Recaptcha.switch_type('audio');");c("recaptcha_switch_img","text","visual_challenge","javascript:Recaptcha.switch_type('image');");c("recaptcha_whatsthis","help","help_btn",Recaptcha._get_help_link());a("recaptcha_whatsthis_btn").target="_blank";a("recaptcha_whatsthis_btn").onclick=function(){Recaptcha.showhelp();
return false};"clean"==b&&(a("recaptcha_logo").src=e+"/logo."+f,a("recaptcha_tagline").src=e+"/tagline."+f);a("recaptcha_table").className="recaptchatable recaptcha_theme_"+Recaptcha.theme;b=function(b,c){var d=a(b);if(d){if(RecaptchaState.rtl&&"span"==d.tagName.toLowerCase())d.dir="rtl";d.appendChild(document.createTextNode(RecaptchaStr[c]))}};b("recaptcha_instructions_image","instructions_visual");b("recaptcha_instructions_context","instructions_context");b("recaptcha_instructions_audio","instructions_audio");
b("recaptcha_instructions_error","incorrect_try_again")},_finish_widget:function(){var a=Recaptcha.$,b=RecaptchaOptions,c=b.theme,d={blackglass:1,clean:1,context:1,custom:1,red:1,white:1};c in d||(c="red");Recaptcha.theme||(Recaptcha.theme=c);"custom"!=Recaptcha.theme?Recaptcha._init_builtin_theme():Recaptcha._set_style("");c=document.createElement("span");c.id="recaptcha_challenge_field_holder";c.style.display="none";a("recaptcha_response_field").parentNode.insertBefore(c,a("recaptcha_response_field"));
a("recaptcha_response_field").setAttribute("autocomplete","off");a("recaptcha_image").style.width="300px";a("recaptcha_image").style.height="57px";Recaptcha.should_focus=!1;Recaptcha._set_challenge(RecaptchaState.challenge,"image");Recaptcha.updateTabIndexes_();Recaptcha.widget&&(Recaptcha.widget.style.display="");b.callback&&b.callback()},updateTabIndexes_:function(){var a=Recaptcha.$,b=RecaptchaOptions;if(b.tabindex&&(b=b.tabindex,a("recaptcha_response_field").tabIndex=b++,"audio"==Recaptcha.type&&
a("recaptcha_audio_play_again")&&(a("recaptcha_audio_play_again").tabIndex=b++,a("recaptcha_audio_download"),a("recaptcha_audio_download").tabIndex=b++),"custom"!=Recaptcha.theme))a("recaptcha_reload_btn").tabIndex=b++,a("recaptcha_switch_audio_btn").tabIndex=b++,a("recaptcha_switch_img_btn").tabIndex=b++,a("recaptcha_whatsthis_btn").tabIndex=b},switch_type:function(a){Recaptcha.type=a;Recaptcha.reload("audio"==Recaptcha.type?"a":"v")},reload:function(a){var b=RecaptchaOptions,c=RecaptchaState;"undefined"==
typeof a&&(a="r");c=Recaptcha._get_api_server()+"/reload?c="+c.challenge+"&k="+c.site+"&reason="+a+"&type="+Recaptcha.type;b.includeContext&&(c+="&includeContext=1");Recaptcha.getLang_()&&(c+="&lang="+Recaptcha.getLang_());"undefined"!=typeof b.extra_challenge_params&&(c+="&"+b.extra_challenge_params);"audio"==Recaptcha.type&&(c=b.audio_beta_12_08?c+"&audio_beta_12_08=1":c+"&new_audio_default=1");Recaptcha.should_focus="t"!=a;Recaptcha._add_script(c)},finish_reload:function(a,b){RecaptchaState.is_incorrect=
!1;Recaptcha._set_challenge(a,b);Recaptcha.updateTabIndexes_()},_set_challenge:function(a,b){var c=Recaptcha.$,d=RecaptchaState;d.challenge=a;Recaptcha.type=b;c("recaptcha_challenge_field_holder").innerHTML='<input type="hidden" name="recaptcha_challenge_field" id="recaptcha_challenge_field" value="'+d.challenge+'"/>';if("audio"==b)c("recaptcha_image").innerHTML=Recaptcha.getAudioCaptchaHtml();else if("image"==b){var e=Recaptcha._get_api_server()+"/image?c="+d.challenge;c("recaptcha_image").innerHTML=
'<img style="display:block;" alt="'+RecaptchaStr.image_alt_text+'" height="57" width="300" src="'+e+'" />'}Recaptcha._css_toggle("recaptcha_had_incorrect_sol","recaptcha_nothad_incorrect_sol",d.is_incorrect);Recaptcha._css_toggle("recaptcha_is_showing_audio","recaptcha_isnot_showing_audio","audio"==b);Recaptcha._clear_input();Recaptcha.should_focus&&Recaptcha.focus_response_field();Recaptcha._reset_timer()},_reset_timer:function(){clearInterval(Recaptcha.timer_id);var a=Math.max(1E3*(RecaptchaState.timeout-
60),6E4);Recaptcha.timer_id=setInterval('Recaptcha.reload("t");',a);return a},showhelp:function(){window.open(Recaptcha._get_help_link(),"recaptcha_popup","width=460,height=580,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes")},_clear_input:function(){Recaptcha.$("recaptcha_response_field").value=""},_displayerror:function(a){var b=Recaptcha.$;b("recaptcha_image").innerHTML="";b("recaptcha_image").appendChild(document.createTextNode(a))},reloaderror:function(a){Recaptcha._displayerror(a)},
_is_ie:function(){return 0<navigator.userAgent.indexOf("MSIE")&&!window.opera},_css_toggle:function(a,b,c){var d=Recaptcha.widget;d||(d=document.body);var e=d.className,e=e.replace(RegExp("(^|\\s+)"+a+"(\\s+|$)")," "),e=e.replace(RegExp("(^|\\s+)"+b+"(\\s+|$)")," "),e=e+(" "+(c?a:b));d.className=e},_get_help_link:function(){var a=Recaptcha._get_api_server().replace(/\/[a-zA-Z0-9]+\/?$/,"/help"),a=a+("?c="+RecaptchaState.challenge);Recaptcha.getLang_()&&(a+="&hl="+Recaptcha.getLang_());return a},playAgain:function(){Recaptcha.$("recaptcha_image").innerHTML=
Recaptcha.getAudioCaptchaHtml()},getAudioCaptchaHtml:function(){var a=Recaptcha._get_api_server()+"/image?c="+RecaptchaState.challenge;0==a.indexOf("https://")&&(a="http://"+a.substring(8));var b=Recaptcha._get_api_server()+"/img/audiocaptcha.swf?v2",b=Recaptcha._is_ie()?'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="'+b+'" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>':
'<embed src="'+b+'" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></embed>',c="";Recaptcha.checkFlashVer()&&(c="<br/>"+Recaptcha.getSpan_('<a id="recaptcha_audio_play_again" class="recaptcha_audio_cant_hear_link" href="#" onclick="Recaptcha.playAgain(); return false;">'+RecaptchaStr.play_again+"</a>"));
c+="<br/>"+Recaptcha.getSpan_('<a id="recaptcha_audio_download" class="recaptcha_audio_cant_hear_link" target="_blank" href="'+a+'">'+RecaptchaStr.cant_hear_this+"</a>");return b+c},getSpan_:function(a){return"<span"+(RecaptchaState&&RecaptchaState.rtl?' dir="rtl"':"")+">"+a+"</span>"},gethttpwavurl:function(){if("audio"!=Recaptcha.type)return"";var a=Recaptcha._get_api_server()+"/image?c="+RecaptchaState.challenge;0==a.indexOf("https://")&&(a="http://"+a.substring(8));return a},checkFlashVer:function(){var a=
-1!=navigator.appVersion.indexOf("MSIE"),b=-1!=navigator.appVersion.toLowerCase().indexOf("win"),c=-1!=navigator.userAgent.indexOf("Opera"),d=-1;if(null!=navigator.plugins&&0<navigator.plugins.length){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"])a=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"",a=navigator.plugins["Shockwave Flash"+a].description,a=a.split(" "),a=a[2].split("."),d=a[0]}else if(a&&b&&!c)try{var e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
f=e.GetVariable("$version"),d=f.split(" ")[1].split(",")[0]}catch(i){}return 9<=d},getLang_:function(){return"undefined"!=typeof RecaptchaState&&RecaptchaState.lang?RecaptchaState.lang:RecaptchaOptions.lang?RecaptchaOptions.lang:null}};
/*!
* MediaElement.js
* HTML5 <video> and <audio> shim and player
* http://mediaelementjs.com/
*
* Creates a JavaScript object that mimics HTML5 MediaElement API
* for browsers that don't understand HTML5 or can't play the provided codec
* Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
*
* Copyright 2010-2012, John Dyer (http://j.hn)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/
// Namespace
var mejs = mejs || {};

// version number
mejs.version = '2.9.1';

// player number (for missing, same id attr)
mejs.meIndex = 0;

// media types accepted by plugins
mejs.plugins = {
    silverlight: [
        {version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav','audio/mpeg']}
    ],
    flash: [
        {version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','video/x-flv','audio/flv','audio/x-flv','audio/mp3','audio/m4a','audio/mpeg', 'video/youtube', 'video/x-youtube']}
        //,{version: [12,0], types: ['video/webm']} // for future reference (hopefully!)
    ],
    youtube: [
        {version: null, types: ['video/youtube', 'video/x-youtube']}
    ],
    vimeo: [
        {version: null, types: ['video/vimeo']}
    ]
};

/*
Utility methods
*/
mejs.Utility = {
    encodeUrl: function(url) {
        return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');
    },
    escapeHTML: function(s) {
        return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
    },
    absolutizeUrl: function(url) {
        var el = document.createElement('div');
        el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
        return el.firstChild.href;
    },
    getScriptPath: function(scriptNames) {
        var
            i = 0,
            j,
            path = '',
            name = '',
            script,
            scripts = document.getElementsByTagName('script'),
            il = scripts.length,
            jl = scriptNames.length;

        for (; i < il; i++) {
            script = scripts[i].src;
            for (j = 0; j < jl; j++) {
                name = scriptNames[j];
                if (script.indexOf(name) > -1) {
                    path = script.substring(0, script.indexOf(name));
                    break;
                }
            }
            if (path !== '') {
                break;
            }
        }
        return path;
    },
    secondsToTimeCode: function(time, forceHours, showFrameCount, fps) {
        //add framecount
        if (typeof showFrameCount == 'undefined') {
            showFrameCount=false;
        } else if(typeof fps == 'undefined') {
            fps = 25;
        }
    
        var hours = Math.floor(time / 3600) % 24,
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time % 60),
            frames = Math.floor(((time % 1)*fps).toFixed(3)),
            result = 
                    ( (forceHours || hours > 0) ? (hours < 10 ? '0' + hours : hours) + ':' : '')
                        + (minutes < 10 ? '0' + minutes : minutes) + ':'
                        + (seconds < 10 ? '0' + seconds : seconds)
                        + ((showFrameCount) ? ':' + (frames < 10 ? '0' + frames : frames) : '');
    
        return result;
    },
    
    timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps){
        if (typeof showFrameCount == 'undefined') {
            showFrameCount=false;
        } else if(typeof fps == 'undefined') {
            fps = 25;
        }
    
        var tc_array = hh_mm_ss_ff.split(":"),
            tc_hh = parseInt(tc_array[0], 10),
            tc_mm = parseInt(tc_array[1], 10),
            tc_ss = parseInt(tc_array[2], 10),
            tc_ff = 0,
            tc_in_seconds = 0;
        
        if (showFrameCount) {
            tc_ff = parseInt(tc_array[3])/fps;
        }
        
        tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;
        
        return tc_in_seconds;
    },
    
    /* borrowed from SWFObject: http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js#474 */
    removeSwf: function(id) {
        var obj = document.getElementById(id);
        if (obj && obj.nodeName == "OBJECT") {
            if (mejs.MediaFeatures.isIE) {
                obj.style.display = "none";
                (function(){
                    if (obj.readyState == 4) {
                        mejs.Utility.removeObjectInIE(id);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                obj.parentNode.removeChild(obj);
            }
        }
    },
    removeObjectInIE: function(id) {
        var obj = document.getElementById(id);
        if (obj) {
            for (var i in obj) {
                if (typeof obj[i] == "function") {
                    obj[i] = null;
                }
            }
            obj.parentNode.removeChild(obj);
        }       
    }
};


// Core detector, plugins are added below
mejs.PluginDetector = {

    // main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
    hasPluginVersion: function(plugin, v) {
        var pv = this.plugins[plugin];
        v[1] = v[1] || 0;
        v[2] = v[2] || 0;
        return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
    },

    // cached values
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),

    // stored version numbers
    plugins: [],

    // runs detectPlugin() and stores the version number
    addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
        this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
    },

    // get the version number from the mimetype (all but IE) or ActiveX (IE)
    detectPlugin: function(pluginName, mimeType, activeX, axDetect) {

        var version = [0,0,0],
            description,
            i,
            ax;

        // Firefox, Webkit, Opera
        if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
            description = this.nav.plugins[pluginName].description;
            if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
                version = description.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
                for (i=0; i<version.length; i++) {
                    version[i] = parseInt(version[i].match(/\d+/), 10);
                }
            }
        // Internet Explorer / ActiveX
        } else if (typeof(window.ActiveXObject) != 'undefined') {
            try {
                ax = new ActiveXObject(activeX);
                if (ax) {
                    version = axDetect(ax);
                }
            }
            catch (e) { }
        }
        return version;
    }
};

// Add Flash detection
mejs.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
    // adapted from SWFObject
    var version = [],
        d = ax.GetVariable("$version");
    if (d) {
        d = d.split(" ")[1].split(",");
        version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
    }
    return version;
});

// Add Silverlight detection
mejs.PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {
    // Silverlight cannot report its version number to IE
    // but it does have a isVersionSupported function, so we have to loop through it to get a version number.
    // adapted from http://www.silverlightversion.com/
    var v = [0,0,0,0],
        loopMatch = function(ax, v, i, n) {
            while(ax.isVersionSupported(v[0]+ "."+ v[1] + "." + v[2] + "." + v[3])){
                v[i]+=n;
            }
            v[i] -= n;
        };
    loopMatch(ax, v, 0, 1);
    loopMatch(ax, v, 1, 1);
    loopMatch(ax, v, 2, 10000); // the third place in the version number is usually 5 digits (4.0.xxxxx)
    loopMatch(ax, v, 2, 1000);
    loopMatch(ax, v, 2, 100);
    loopMatch(ax, v, 2, 10);
    loopMatch(ax, v, 2, 1);
    loopMatch(ax, v, 3, 1);

    return v;
});
// add adobe acrobat
/*
PluginDetector.addPlugin('acrobat','Adobe Acrobat','application/pdf','AcroPDF.PDF', function (ax) {
    var version = [],
        d = ax.GetVersions().split(',')[0].split('=')[1].split('.');

    if (d) {
        version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
    }
    return version;
});
*/
// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
    init: function() {
        var
            t = this,
            d = document,
            nav = mejs.PluginDetector.nav,
            ua = mejs.PluginDetector.ua.toLowerCase(),
            i,
            v,
            html5Elements = ['source','track','audio','video'];

        // detect browsers (only the ones that have some kind of quirk we need to work around)
        t.isiPad = (ua.match(/ipad/i) !== null);
        t.isiPhone = (ua.match(/iphone/i) !== null);
        t.isiOS = t.isiPhone || t.isiPad;
        t.isAndroid = (ua.match(/android/i) !== null);
        t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
        t.isIE = (nav.appName.toLowerCase().indexOf("microsoft") != -1);
        t.isChrome = (ua.match(/chrome/gi) !== null);
        t.isFirefox = (ua.match(/firefox/gi) !== null);
        t.isWebkit = (ua.match(/webkit/gi) !== null);
        t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit;
        t.isOpera = (ua.match(/opera/gi) !== null);
        t.hasTouch = ('ontouchstart' in window);

        // create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
        for (i=0; i<html5Elements.length; i++) {
            v = document.createElement(html5Elements[i]);
        }
        
        t.supportsMediaTag = (typeof v.canPlayType !== 'undefined' || t.isBustedAndroid);

        // detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)
        
        // iOS
        t.hasSemiNativeFullScreen = (typeof v.webkitEnterFullscreen !== 'undefined');
        
        // Webkit/firefox
        t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== 'undefined');
        t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== 'undefined');
        
        t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen);
        t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;
        if (t.hasMozNativeFullScreen) {
            t.nativeFullScreenEnabled = v.mozFullScreenEnabled;
        }
        
        
        if (this.isChrome) {
            t.hasSemiNativeFullScreen = false;
        }
        
        if (t.hasTrueNativeFullScreen) {
            t.fullScreenEventName = (t.hasWebkitNativeFullScreen) ? 'webkitfullscreenchange' : 'mozfullscreenchange';
            
            
            t.isFullScreen = function() {
                if (v.mozRequestFullScreen) {
                    return d.mozFullScreen;
                } else if (v.webkitRequestFullScreen) {
                    return d.webkitIsFullScreen;
                }
            }
                    
            t.requestFullScreen = function(el) {
        
                if (t.hasWebkitNativeFullScreen) {
                    el.webkitRequestFullScreen();
                } else if (t.hasMozNativeFullScreen) {
                    el.mozRequestFullScreen();
                }
            }
            
            t.cancelFullScreen = function() {               
                if (t.hasWebkitNativeFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (t.hasMozNativeFullScreen) {
                    document.mozCancelFullScreen();
                }
            }   
            
        }
        
        
        // OS X 10.5 can't do this even if it says it can :(
        if (t.hasSemiNativeFullScreen && ua.match(/mac os x 10_5/i)) {
            t.hasNativeFullScreen = false;
            t.hasSemiNativeFullScreen = false;
        }
        
    }
};
mejs.MediaFeatures.init();


/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
mejs.HtmlMediaElement = {
    pluginType: 'native',
    isFullScreen: false,

    setCurrentTime: function (time) {
        this.currentTime = time;
    },

    setMuted: function (muted) {
        this.muted = muted;
    },

    setVolume: function (volume) {
        this.volume = volume;
    },

    // for parity with the plugin versions
    stop: function () {
        this.pause();
    },

    // This can be a url string
    // or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
    setSrc: function (url) {
        
        // Fix for IE9 which can't set .src when there are <source> elements. Awesome, right?
        var 
            existingSources = this.getElementsByTagName('source');
        while (existingSources.length > 0){
            this.removeChild(existingSources[0]);
        }
    
        if (typeof url == 'string') {
            this.src = url;
        } else {
            var i, media;

            for (i=0; i<url.length; i++) {
                media = url[i];
                if (this.canPlayType(media.type)) {
                    this.src = media.src;
                }
            }
        }
    },

    setVideoSize: function (width, height) {
        this.width = width;
        this.height = height;
    }
};

/*
Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
*/
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
    this.id = pluginid;
    this.pluginType = pluginType;
    this.src = mediaUrl;
    this.events = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
mejs.PluginMediaElement.prototype = {

    // special
    pluginElement: null,
    pluginType: '',
    isFullScreen: false,

    // not implemented :(
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],

    // HTML5 read-only properties
    paused: true,
    ended: false,
    seeking: false,
    duration: 0,
    error: null,
    tagName: '',

    // HTML5 get/set properties, but only set (updated by event handlers)
    muted: false,
    volume: 1,
    currentTime: 0,

    // HTML5 methods
    play: function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.playVideo();
            } else {
                this.pluginApi.playMedia();
            }
            this.paused = false;
        }
    },
    load: function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
            } else {
                this.pluginApi.loadMedia();
            }
            
            this.paused = false;
        }
    },
    pause: function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.pauseVideo();
            } else {
                this.pluginApi.pauseMedia();
            }           
            
            
            this.paused = true;
        }
    },
    stop: function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.stopVideo();
            } else {
                this.pluginApi.stopMedia();
            }   
            this.paused = true;
        }
    },
    canPlayType: function(type) {
        var i,
            j,
            pluginInfo,
            pluginVersions = mejs.plugins[this.pluginType];

        for (i=0; i<pluginVersions.length; i++) {
            pluginInfo = pluginVersions[i];

            // test if user has the correct plugin version
            if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {

                // test for plugin playback types
                for (j=0; j<pluginInfo.types.length; j++) {
                    // find plugin that can play the type
                    if (type == pluginInfo.types[j]) {
                        return true;
                    }
                }
            }
        }

        return false;
    },
    
    positionFullscreenButton: function(x,y,visibleAndAbove) {
        if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
            this.pluginApi.positionFullscreenButton(x,y,visibleAndAbove);
        }
    },
    
    hideFullscreenButton: function() {
        if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
            this.pluginApi.hideFullscreenButton();
        }       
    },  
    

    // custom methods since not all JavaScript implementations support get/set

    // This can be a url string
    // or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
    setSrc: function (url) {
        if (typeof url == 'string') {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
            this.src = mejs.Utility.absolutizeUrl(url);
        } else {
            var i, media;

            for (i=0; i<url.length; i++) {
                media = url[i];
                if (this.canPlayType(media.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
                    this.src = mejs.Utility.absolutizeUrl(url);
                }
            }
        }

    },
    setCurrentTime: function (time) {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.seekTo(time);
            } else {
                this.pluginApi.setCurrentTime(time);
            }               
            
            
            
            this.currentTime = time;
        }
    },
    setVolume: function (volume) {
        if (this.pluginApi != null) {
            // same on YouTube and MEjs
            if (this.pluginType == 'youtube') {
                this.pluginApi.setVolume(volume * 100);
            } else {
                this.pluginApi.setVolume(volume);
            }
            this.volume = volume;
        }
    },
    setMuted: function (muted) {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                if (muted) {
                    this.pluginApi.mute();
                } else {
                    this.pluginApi.unMute();
                }
                this.muted = muted;
                this.dispatchEvent('volumechange');
            } else {
                this.pluginApi.setMuted(muted);
            }
            this.muted = muted;
        }
    },

    // additional non-HTML5 methods
    setVideoSize: function (width, height) {
        
        //if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
            if ( this.pluginElement.style) {
                this.pluginElement.style.width = width + 'px';
                this.pluginElement.style.height = height + 'px';
            }
            if (this.pluginApi != null && this.pluginApi.setVideoSize) {
                this.pluginApi.setVideoSize(width, height);
            }
        //}
    },

    setFullscreen: function (fullscreen) {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.pluginApi.setFullscreen(fullscreen);
        }
    },
    
    enterFullScreen: function() {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(true);
        }       
        
    },
    
    exitFullScreen: function() {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(false);
        }
    },  

    // start: fake events
    addEventListener: function (eventName, callback, bubble) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    },
    removeEventListener: function (eventName, callback) {
        if (!eventName) { this.events = {}; return true; }
        var callbacks = this.events[eventName];
        if (!callbacks) return true;
        if (!callback) { this.events[eventName] = []; return true; }
        for (i = 0; i < callbacks.length; i++) {
            if (callbacks[i] === callback) {
                this.events[eventName].splice(i, 1);
                return true;
            }
        }
        return false;
    },  
    dispatchEvent: function (eventName) {
        var i,
            args,
            callbacks = this.events[eventName];

        if (callbacks) {
            args = Array.prototype.slice.call(arguments, 1);
            for (i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(null, args);
            }
        }
    },
    // end: fake events
    
    // fake DOM attribute methods
    attributes: {},
    hasAttribute: function(name){
        return (name in this.attributes);  
    },
    removeAttribute: function(name){
        delete this.attributes[name];
    },
    getAttribute: function(name){
        if (this.hasAttribute(name)) {
            return this.attributes[name];
        }
        return '';
    },
    setAttribute: function(name, value){
        this.attributes[name] = value;
    },

    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id);
    }
};

// Handles calls from Flash/Silverlight and reports them as native <video/audio> events and properties
mejs.MediaPluginBridge = {

    pluginMediaElements:{},
    htmlMediaElements:{},

    registerPluginElement: function (id, pluginMediaElement, htmlMediaElement) {
        this.pluginMediaElements[id] = pluginMediaElement;
        this.htmlMediaElements[id] = htmlMediaElement;
    },

    // when Flash/Silverlight is ready, it calls out to this method
    initPlugin: function (id) {

        var pluginMediaElement = this.pluginMediaElements[id],
            htmlMediaElement = this.htmlMediaElements[id];

        if (pluginMediaElement) {
            // find the javascript bridge
            switch (pluginMediaElement.pluginType) {
                case "flash":
                    pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(id);
                    break;
                case "silverlight":
                    pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
                    pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
                    break;
            }
    
            if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
                pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
            }
        }
    },

    // receives events from Flash/Silverlight and sends them out as HTML5 media events
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
    fireEvent: function (id, eventName, values) {

        var
            e,
            i,
            bufferedTime,
            pluginMediaElement = this.pluginMediaElements[id];

        pluginMediaElement.ended = false;
        pluginMediaElement.paused = true;

        // fake event object to mimic real HTML media event.
        e = {
            type: eventName,
            target: pluginMediaElement
        };

        // attach all values to element and event object
        for (i in values) {
            pluginMediaElement[i] = values[i];
            e[i] = values[i];
        }

        // fake the newer W3C buffered TimeRange (loaded and total have been removed)
        bufferedTime = values.bufferedTime || 0;

        e.target.buffered = e.buffered = {
            start: function(index) {
                return 0;
            },
            end: function (index) {
                return bufferedTime;
            },
            length: 1
        };

        pluginMediaElement.dispatchEvent(e.type, e);
    }
};

/*
Default options
*/
mejs.MediaElementDefaults = {
    // allows testing on HTML5, flash, silverlight
    // auto: attempts to detect what the browser can do
    // native: forces HTML5 playback
    // shim: disallows HTML5, will attempt either Flash or Silverlight
    // none: forces fallback view
    mode: 'auto',
    // remove or reorder to change plugin priority and availability
    plugins: ['flash','silverlight','youtube','vimeo'],
    // shows debug errors on screen
    enablePluginDebug: false,
    // overrides the type specified, useful for dynamic instantiation
    type: '',
    // path to Flash and Silverlight plugins
    pluginPath: mejs.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
    // name of flash file
    flashName: 'flashmediaelement.swf',
    // turns on the smoothing filter in Flash
    enablePluginSmoothing: false,
    // name of silverlight file
    silverlightName: 'silverlightmediaelement.xap',
    // default if the <video width> is not specified
    defaultVideoWidth: 480,
    // default if the <video height> is not specified
    defaultVideoHeight: 270,
    // overrides <video width>
    pluginWidth: -1,
    // overrides <video height>
    pluginHeight: -1,
    // additional plugin variables in 'key=value' form
    pluginVars: [], 
    // rate in milliseconds for Flash and Silverlight to fire the timeupdate event
    // larger number is less accurate, but less strain on plugin->JavaScript bridge
    timerRate: 250,
    // initial volume for player
    startVolume: 0.8,
    success: function () { },
    error: function () { }
};

/*
Determines if a browser supports the <video> or <audio> element
and returns either the native element or a Flash/Silverlight version that
mimics HTML5 MediaElement
*/
mejs.MediaElement = function (el, o) {
    return mejs.HtmlMediaElementShim.create(el,o);
};

mejs.HtmlMediaElementShim = {

    create: function(el, o) {
        var
            options = mejs.MediaElementDefaults,
            htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
            tagName = htmlMediaElement.tagName.toLowerCase(),
            isMediaTag = (tagName === 'audio' || tagName === 'video'),
            src = (isMediaTag) ? htmlMediaElement.getAttribute('src') : htmlMediaElement.getAttribute('href'),
            poster = htmlMediaElement.getAttribute('poster'),
            autoplay =  htmlMediaElement.getAttribute('autoplay'),
            preload =  htmlMediaElement.getAttribute('preload'),
            controls =  htmlMediaElement.getAttribute('controls'),
            playback,
            prop;

        // extend options
        for (prop in o) {
            options[prop] = o[prop];
        }

        // clean up attributes
        src =       (typeof src == 'undefined'  || src === null || src == '') ? null : src;     
        poster =    (typeof poster == 'undefined'   || poster === null) ? '' : poster;
        preload =   (typeof preload == 'undefined'  || preload === null || preload === 'false') ? 'none' : preload;
        autoplay =  !(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
        controls =  !(typeof controls == 'undefined' || controls === null || controls === 'false');

        // test for HTML5 and plugin capabilities
        playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
        playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '';

        if (playback.method == 'native') {
            // second fix for android
            if (mejs.MediaFeatures.isBustedAndroid) {
                htmlMediaElement.src = playback.url;
                htmlMediaElement.addEventListener('click', function() {
                    htmlMediaElement.play();
                }, false);
            }
        
            // add methods to native HTMLMediaElement
            return this.updateNative(playback, options, autoplay, preload);
        } else if (playback.method !== '') {
            // create plugin to mimic HTMLMediaElement
            
            return this.createPlugin( playback,  options, poster, autoplay, preload, controls);
        } else {
            // boo, no HTML5, no Flash, no Silverlight.
            this.createErrorMessage( playback, options, poster );
            
            return this;
        }
    },
    
    determinePlayback: function(htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
        var
            mediaFiles = [],
            i,
            j,
            k,
            l,
            n,
            type,
            result = { method: '', url: '', htmlMediaElement: htmlMediaElement, isVideo: (htmlMediaElement.tagName.toLowerCase() != 'audio')},
            pluginName,
            pluginVersions,
            pluginInfo,
            dummy;
            
        // STEP 1: Get URL and type from <video src> or <source src>

        // supplied type overrides <video type> and <source type>
        if (typeof options.type != 'undefined' && options.type !== '') {
            
            // accept either string or array of types
            if (typeof options.type == 'string') {
                mediaFiles.push({type:options.type, url:src});
            } else {
                
                for (i=0; i<options.type.length; i++) {
                    mediaFiles.push({type:options.type[i], url:src});
                }
            }

        // test for src attribute first
        } else if (src !== null) {
            type = this.formatType(src, htmlMediaElement.getAttribute('type'));
            mediaFiles.push({type:type, url:src});

        // then test for <source> elements
        } else {
            // test <source> types to see if they are usable
            for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
                n = htmlMediaElement.childNodes[i];
                if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
                    src = n.getAttribute('src');
                    type = this.formatType(src, n.getAttribute('type'));
                    mediaFiles.push({type:type, url:src});
                }
            }
        }
        
        // in the case of dynamicly created players
        // check for audio types
        if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf('audio') > -1) {
            result.isVideo = false;
        }
        

        // STEP 2: Test for playback method
        
        // special case for Android which sadly doesn't implement the canPlayType function (always returns '')
        if (mejs.MediaFeatures.isBustedAndroid) {
            htmlMediaElement.canPlayType = function(type) {
                return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'maybe' : '';
            };
        }       
        

        // test for native playback first
        if (supportsMediaTag && (options.mode === 'auto' || options.mode === 'native')) {
                        
            if (!isMediaTag) {

                // create a real HTML5 Media Element 
                dummy = document.createElement( result.isVideo ? 'video' : 'audio');            
                htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
                htmlMediaElement.style.display = 'none';
                
                // use this one from now on
                result.htmlMediaElement = htmlMediaElement = dummy;
            }
                
            for (i=0; i<mediaFiles.length; i++) {
                // normal check
                if (htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== '' 
                    // special case for Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
                    || htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/,'mpeg')).replace(/no/, '') !== '') {
                    result.method = 'native';
                    result.url = mediaFiles[i].url;
                    break;
                }
            }           
            
            if (result.method === 'native') {
                if (result.url !== null) {
                    htmlMediaElement.src = result.url;
                }
            
                return result;
            }
        }

        // if native playback didn't work, then test plugins
        if (options.mode === 'auto' || options.mode === 'shim') {
            for (i=0; i<mediaFiles.length; i++) {
                type = mediaFiles[i].type;

                // test all plugins in order of preference [silverlight, flash]
                for (j=0; j<options.plugins.length; j++) {

                    pluginName = options.plugins[j];
            
                    // test version of plugin (for future features)
                    pluginVersions = mejs.plugins[pluginName];              
                    
                    for (k=0; k<pluginVersions.length; k++) {
                        pluginInfo = pluginVersions[k];
                    
                        // test if user has the correct plugin version
                        
                        // for youtube/vimeo
                        if (pluginInfo.version == null || 
                            
                            mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {

                            // test for plugin playback types
                            for (l=0; l<pluginInfo.types.length; l++) {
                                // find plugin that can play the type
                                if (type == pluginInfo.types[l]) {
                                    result.method = pluginName;
                                    result.url = mediaFiles[i].url;
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        // what if there's nothing to play? just grab the first available
        if (result.method === '' && mediaFiles.length > 0) {
            result.url = mediaFiles[0].url;
        }

        return result;
    },

    formatType: function(url, type) {
        var ext;

        // if no type is supplied, fake it with the extension
        if (url && !type) {     
            return this.getTypeFromFile(url);
        } else {
            // only return the mime part of the type in case the attribute contains the codec
            // see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
            // `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
            
            if (type && ~type.indexOf(';')) {
                return type.substr(0, type.indexOf(';')); 
            } else {
                return type;
            }
        }
    },
    
    getTypeFromFile: function(url) {
        var ext = url.substring(url.lastIndexOf('.') + 1);
        return (/(mp4|m4v|ogg|ogv|webm|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video' : 'audio') + '/' + ext;
    },

    createErrorMessage: function(playback, options, poster) {
        var 
            htmlMediaElement = playback.htmlMediaElement,
            errorContainer = document.createElement('div');
            
        errorContainer.className = 'me-cannotplay';

        try {
            errorContainer.style.width = htmlMediaElement.width + 'px';
            errorContainer.style.height = htmlMediaElement.height + 'px';
        } catch (e) {}

        errorContainer.innerHTML = (poster !== '') ?
            '<a href="' + playback.url + '"><img src="' + poster + '" width="100%" height="100%" /></a>' :
            '<a href="' + playback.url + '"><span>Download File</span></a>';

        htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
        htmlMediaElement.style.display = 'none';

        options.error(htmlMediaElement);
    },

    createPlugin:function(playback, options, poster, autoplay, preload, controls) {
        var 
            htmlMediaElement = playback.htmlMediaElement,
            width = 1,
            height = 1,
            pluginid = 'me_' + playback.method + '_' + (mejs.meIndex++),
            pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
            container = document.createElement('div'),
            specialIEContainer,
            node,
            initVars;

        // copy tagName from html media element
        pluginMediaElement.tagName = htmlMediaElement.tagName

        // copy attributes from html media element to plugin media element
        for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
            var attribute = htmlMediaElement.attributes[i];
            if (attribute.specified == true) {
                pluginMediaElement.setAttribute(attribute.name, attribute.value);
            }
        }

        // check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
        node = htmlMediaElement.parentNode;
        while (node !== null && node.tagName.toLowerCase() != 'body') {
            if (node.parentNode.tagName.toLowerCase() == 'p') {
                node.parentNode.parentNode.insertBefore(node, node.parentNode);
                break;
            }
            node = node.parentNode;
        }

        if (playback.isVideo) {
            width = (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
            height = (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;
        
            // in case of '%' make sure it's encoded
            width = mejs.Utility.encodeUrl(width);
            height = mejs.Utility.encodeUrl(height);
        
        } else {
            if (options.enablePluginDebug) {
                width = 320;
                height = 240;
            }
        }

        // register plugin
        pluginMediaElement.success = options.success;
        mejs.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);

        // add container (must be added to DOM before inserting HTML for IE)
        container.className = 'me-plugin';
        container.id = pluginid + '_container';
        
        if (playback.isVideo) {
                htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
        } else {
                document.body.insertBefore(container, document.body.childNodes[0]);
        }

        // flash/silverlight vars
        initVars = [
            'id=' + pluginid,
            'isvideo=' + ((playback.isVideo) ? "true" : "false"),
            'autoplay=' + ((autoplay) ? "true" : "false"),
            'preload=' + preload,
            'width=' + width,
            'startvolume=' + options.startVolume,
            'timerrate=' + options.timerRate,
            'height=' + height];

        if (playback.url !== null) {
            if (playback.method == 'flash') {
                initVars.push('file=' + mejs.Utility.encodeUrl(playback.url));
            } else {
                initVars.push('file=' + playback.url);
            }
        }
        if (options.enablePluginDebug) {
            initVars.push('debug=true');
        }
        if (options.enablePluginSmoothing) {
            initVars.push('smoothing=true');
        }
        if (controls) {
            initVars.push('controls=true'); // shows controls in the plugin if desired
        }
        if (options.pluginVars) {
            initVars = initVars.concat(options.pluginVars);
        }       

        switch (playback.method) {
            case 'silverlight':
                container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="initParams" value="' + initVars.join(',') + '" />' +
'<param name="windowless" value="true" />' +
'<param name="background" value="black" />' +
'<param name="minRuntimeVersion" value="3.0.0.0" />' +
'<param name="autoUpgrade" value="true" />' +
'<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
'</object>';
                    break;

            case 'flash':

                if (mejs.MediaFeatures.isIE) {
                    specialIEContainer = document.createElement('div');
                    container.appendChild(specialIEContainer);
                    specialIEContainer.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="always" />' +
'<param name="allowFullScreen" value="true" />' +
'</object>';

                } else {

                    container.innerHTML =
'<embed id="' + pluginid + '" name="' + pluginid + '" ' +
'play="true" ' +
'loop="false" ' +
'quality="high" ' +
'bgcolor="#000000" ' +
'wmode="transparent" ' +
'allowScriptAccess="always" ' +
'allowFullScreen="true" ' +
'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' +
'src="' + options.pluginPath + options.flashName + '" ' +
'flashvars="' + initVars.join('&') + '" ' +
'width="' + width + '" ' +
'height="' + height + '"></embed>';
                }
                break;
            
            case 'youtube':
            
                
                var
                    videoId = playback.url.substr(playback.url.lastIndexOf('=')+1);
                    youtubeSettings = {
                        container: container,
                        containerId: container.id,
                        pluginMediaElement: pluginMediaElement,
                        pluginId: pluginid,
                        videoId: videoId,
                        height: height,
                        width: width    
                    };              
                
                if (mejs.PluginDetector.hasPluginVersion('flash', [10,0,0]) ) {
                    mejs.YouTubeApi.createFlash(youtubeSettings);
                } else {
                    mejs.YouTubeApi.enqueueIframe(youtubeSettings);     
                }
                
                break;
            
            // DEMO Code. Does NOT work.
            case 'vimeo':
                console.log('vimeoid');
                
                pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf('/')+1);
                
                container.innerHTML =
                    '<object width="' + width + '" height="' + height + '">' +
                        '<param name="allowfullscreen" value="true" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '<param name="flashvars" value="api=1" />' + 
                        '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + pluginMediaElement.vimeoid  + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" />' +
                        '<embed src="//vimeo.com/moogaloop.swf?api=1&amp;clip_id=' + pluginMediaElement.vimeoid + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + width + '" height="' + height + '"></embed>' +
                    '</object>';
                    
                break;          
        }
        // hide original element
        htmlMediaElement.style.display = 'none';

        // FYI: options.success will be fired by the MediaPluginBridge
        
        return pluginMediaElement;
    },

    updateNative: function(playback, options, autoplay, preload) {
        
        var htmlMediaElement = playback.htmlMediaElement,
            m;
        
        
        // add methods to video object to bring it into parity with Flash Object
        for (m in mejs.HtmlMediaElement) {
            htmlMediaElement[m] = mejs.HtmlMediaElement[m];
        }

        /*
        Chrome now supports preload="none"
        if (mejs.MediaFeatures.isChrome) {
        
            // special case to enforce preload attribute (Chrome doesn't respect this)
            if (preload === 'none' && !autoplay) {
            
                // forces the browser to stop loading (note: fails in IE9)
                htmlMediaElement.src = '';
                htmlMediaElement.load();
                htmlMediaElement.canceledPreload = true;

                htmlMediaElement.addEventListener('play',function() {
                    if (htmlMediaElement.canceledPreload) {
                        htmlMediaElement.src = playback.url;
                        htmlMediaElement.load();
                        htmlMediaElement.play();
                        htmlMediaElement.canceledPreload = false;
                    }
                }, false);
            // for some reason Chrome forgets how to autoplay sometimes.
            } else if (autoplay) {
                htmlMediaElement.load();
                htmlMediaElement.play();
            }
        }
        */

        // fire success code
        options.success(htmlMediaElement, htmlMediaElement);
        
        return htmlMediaElement;
    }
};

/*
 - test on IE (object vs. embed)
 - determine when to use iframe (Firefox, Safari, Mobile) vs. Flash (Chrome, IE)
 - fullscreen?
*/

// YouTube Flash and Iframe API
mejs.YouTubeApi = {
    isIframeStarted: false,
    isIframeLoaded: false,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var tag = document.createElement('script');
            tag.src = "http://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.isIframeStarted = true;
        }
    },
    iframeQueue: [],
    enqueueIframe: function(yt) {
        
        if (this.isLoaded) {
            this.createIframe(yt);
        } else {
            this.loadIframeApi();
            this.iframeQueue.push(yt);
        }
    },
    createIframe: function(settings) {
        
        var
        pluginMediaElement = settings.pluginMediaElement,   
        player = new YT.Player(settings.containerId, {
            height: settings.height,
            width: settings.width,
            videoId: settings.videoId,
            playerVars: {controls:0},
            events: {
                'onReady': function() {
                    
                    // hook up iframe object to MEjs
                    settings.pluginMediaElement.pluginApi = player;
                    
                    // init mejs
                    mejs.MediaPluginBridge.initPlugin(settings.pluginId);
                    
                    // create timer
                    setInterval(function() {
                        mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
                    }, 250);                    
                },
                'onStateChange': function(e) {
                    
                    mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);
                    
                }
            }
        });
    },
    
    createEvent: function (player, pluginMediaElement, eventName) {
        var obj = {
            type: eventName,
            target: pluginMediaElement
        };

        if (player && player.getDuration) {
            
            // time 
            pluginMediaElement.currentTime = obj.currentTime = player.getCurrentTime();
            pluginMediaElement.duration = obj.duration = player.getDuration();
            
            // state
            obj.paused = pluginMediaElement.paused;
            obj.ended = pluginMediaElement.ended;           
            
            // sound
            obj.muted = player.isMuted();
            obj.volume = player.getVolume() / 100;
            
            // progress
            obj.bytesTotal = player.getVideoBytesTotal();
            obj.bufferedBytes = player.getVideoBytesLoaded();
            
            // fake the W3C buffered TimeRange
            var bufferedTime = obj.bufferedBytes / obj.bytesTotal * obj.duration;
            
            obj.target.buffered = obj.buffered = {
                start: function(index) {
                    return 0;
                },
                end: function (index) {
                    return bufferedTime;
                },
                length: 1
            };
            
        }
        
        // send event up the chain
        pluginMediaElement.dispatchEvent(obj.type, obj);
    },  
    
    iFrameReady: function() {
        
        this.isLoaded = true;
        this.isIframeLoaded = true;
        
        while (this.iframeQueue.length > 0) {
            var settings = this.iframeQueue.pop();
            this.createIframe(settings);
        }   
    },
    
    // FLASH!
    flashPlayers: {},
    createFlash: function(settings) {
        
        this.flashPlayers[settings.pluginId] = settings;
        
        /*
        settings.container.innerHTML =
            '<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0" ' +
                'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
                '<param name="allowScriptAccess" value="always">' +
                '<param name="wmode" value="transparent">' +
            '</object>';
        */

        var specialIEContainer,
            youtubeUrl = 'http://www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';
            
        if (mejs.MediaFeatures.isIE) {
            
            specialIEContainer = document.createElement('div');
            settings.container.appendChild(specialIEContainer);
            specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '">' +
    '<param name="movie" value="' + youtubeUrl + '" />' +
    '<param name="wmode" value="transparent" />' +
    '<param name="allowScriptAccess" value="always" />' +
    '<param name="allowFullScreen" value="true" />' +
'</object>';
        } else {
        settings.container.innerHTML =
            '<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" ' +
                'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
                '<param name="allowScriptAccess" value="always">' +
                '<param name="wmode" value="transparent">' +
            '</object>';
        }       
        
    },
    
    flashReady: function(id) {
        var
            settings = this.flashPlayers[id],
            player = document.getElementById(id),
            pluginMediaElement = settings.pluginMediaElement;
        
        // hook up and return to MediaELementPlayer.success 
        pluginMediaElement.pluginApi = 
        pluginMediaElement.pluginElement = player;
        mejs.MediaPluginBridge.initPlugin(id);
        
        // load the youtube video
        player.cueVideoById(settings.videoId);
        
        var callbackName = settings.containerId + '_callback'
        
        window[callbackName] = function(e) {
            mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
        }
        
        player.addEventListener('onStateChange', callbackName);
        
        setInterval(function() {
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
        }, 250);
    },
    
    handleStateChange: function(youTubeState, player, pluginMediaElement) {
        switch (youTubeState) {
            case -1: // not started
                pluginMediaElement.paused = true;
                pluginMediaElement.ended = true;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'loadedmetadata');
                //createYouTubeEvent(player, pluginMediaElement, 'loadeddata');
                break;
            case 0:
                pluginMediaElement.paused = false;
                pluginMediaElement.ended = true;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'ended');
                break;
            case 1:
                pluginMediaElement.paused = false;
                pluginMediaElement.ended = false;               
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'play');
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'playing');
                break;
            case 2:
                pluginMediaElement.paused = true;
                pluginMediaElement.ended = false;               
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'pause');
                break;
            case 3: // buffering
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'progress');
                break;
            case 5:
                // cued?
                break;                      
            
        }           
        
    }
}
// IFRAME
function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady();
}
// FLASH
function onYouTubePlayerReady(id) {
    mejs.YouTubeApi.flashReady(id);
}

window.mejs = mejs;
window.MediaElement = mejs.MediaElement;

/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2012, John Dyer (http://j.hn/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
if (typeof jQuery != 'undefined') {
    mejs.$ = jQuery;
} else if (typeof ender != 'undefined') {
    mejs.$ = ender;
}
(function ($) {

    // default player values
    mejs.MepDefaults = {
        // url to poster (to fix iOS 3.x)
        poster: '',
        // default if the <video width> is not specified
        defaultVideoWidth: 480,
        // default if the <video height> is not specified
        defaultVideoHeight: 270,
        // if set, overrides <video width>
        videoWidth: -1,
        // if set, overrides <video height>
        videoHeight: -1,
        // default if the user doesn't specify
        defaultAudioWidth: 400,
        // default if the user doesn't specify
        defaultAudioHeight: 30,
        // width of audio player
        audioWidth: -1,
        // height of audio player
        audioHeight: -1,        
        // initial volume when the player starts (overrided by user cookie)
        startVolume: 0.8,
        // useful for <audio> player loops
        loop: false,
        // resize to media dimensions
        enableAutosize: true,
        // forces the hour marker (##:00:00)
        alwaysShowHours: false,

        // show framecount in timecode (##:00:00:00)
        showTimecodeFrameCount: false,
        // used when showTimecodeFrameCount is set to true
        framesPerSecond: 25,
        
        // automatically calculate the width of the progress bar based on the sizes of other elements
        autosizeProgress : true,
        // Hide controls when playing and mouse is not over the video
        alwaysShowControls: false,
        // force iPad's native controls
        iPadUseNativeControls: false,
        // force iPhone's native controls
        iPhoneUseNativeControls: false, 
        // force Android's native controls
        AndroidUseNativeControls: false,            
        // features to show
        features: ['playpause','current','progress','duration','tracks','volume','fullscreen'],
        // only for dynamic
        isVideo: true,
        
        // turns keyboard support on and off for this instance
        enableKeyboard: true,
        
        // whenthis player starts, it will pause other players
        pauseOtherPlayers: true,
        
        // array of keyboard actions such as play pause
        keyActions: [
                {
                        keys: [
                                32, // SPACE
                                179 // GOOGLE play/pause button
                              ],
                        action: function(player, media) {
                                if (media.paused || media.ended) {
                                        media.play();   
                                } else {
                                        media.pause();
                                }                                       
                        }
                },
                {
                        keys: [38], // UP
                        action: function(player, media) {
                                var newVolume = Math.min(media.volume + 0.1, 1);
                                media.setVolume(newVolume);
                        }
                },
                {
                        keys: [40], // DOWN
                        action: function(player, media) {
                                var newVolume = Math.max(media.volume - 0.1, 0);
                                media.setVolume(newVolume);
                        }
                },
                {
                        keys: [
                                37, // LEFT
                                227 // Google TV rewind
                        ],
                        action: function(player, media) {
                                if (!isNaN(media.duration) && media.duration > 0) {
                                        if (player.isVideo) {
                                                player.showControls();
                                                player.startControlsTimer();
                                        }
                                        
                                        // 5%
                                        var newTime = Math.max(media.currentTime - (media.duration * 0.05), 0);
                                        media.setCurrentTime(newTime);
                                }
                        }
                },
                {
                        keys: [
                                39, // RIGHT
                                228 // Google TV forward
                        ], 
                        action: function(player, media) {
                                if (!isNaN(media.duration) && media.duration > 0) {
                                        if (player.isVideo) {
                                                player.showControls();
                                                player.startControlsTimer();
                                        }
                                        
                                        // 5%
                                        var newTime = Math.min(media.currentTime + (media.duration * 0.05), media.duration);
                                        media.setCurrentTime(newTime);
                                }
                        }
                },
                {
                        keys: [70], // f
                        action: function(player, media) {
                                if (typeof player.enterFullScreen != 'undefined') {
                                        if (player.isFullScreen) {
                                                player.exitFullScreen();
                                        } else {
                                                player.enterFullScreen();
                                        }
                                }
                        }
                }                   
        ]       
    };

    mejs.mepIndex = 0;
    
    mejs.players = [];

    // wraps a MediaElement object in player controls
    mejs.MediaElementPlayer = function(node, o) {
        // enforce object, even without "new" (via John Resig)
        if ( !(this instanceof mejs.MediaElementPlayer) ) {
            return new mejs.MediaElementPlayer(node, o);
        } 

        var t = this;
        
        // these will be reset after the MediaElement.success fires
        t.$media = t.$node = $(node);
        t.node = t.media = t.$media[0];     
        
        // check for existing player
        if (typeof t.node.player != 'undefined') {
            return t.node.player;
        } else {
            // attach player to DOM node for reference
            t.node.player = t;
        }
                
                
        // try to get options from data-mejsoptions
        if (typeof o == 'undefined') {
            o = t.$node.data('mejsoptions');    
        }
            
        // extend default options
        t.options = $.extend({},mejs.MepDefaults,o);
        
        // add to player array (for focus events)
        mejs.players.push(t);
        
        // start up
        t.init();

        return t;
    };

    // actual player
    mejs.MediaElementPlayer.prototype = {
        
        hasFocus: false,
        
        controlsAreVisible: true,
        
        init: function() {

            var
                t = this,
                mf = mejs.MediaFeatures,
                // options for MediaElement (shim)
                meOptions = $.extend(true, {}, t.options, {
                    success: function(media, domNode) { t.meReady(media, domNode); },
                    error: function(e) { t.handleError(e);}
                }),
                tagName = t.media.tagName.toLowerCase();
        
            t.isDynamic = (tagName !== 'audio' && tagName !== 'video');
            
            if (t.isDynamic) {  
                // get video from src or href?              
                t.isVideo = t.options.isVideo;                      
            } else {
                t.isVideo = (tagName !== 'audio' && t.options.isVideo);
            }
        
            // use native controls in iPad, iPhone, and Android 
            if ((mf.isiPad && t.options.iPadUseNativeControls) || (mf.isiPhone && t.options.iPhoneUseNativeControls)) {
                
                // add controls and stop
                t.$media.attr('controls', 'controls');

                // attempt to fix iOS 3 bug
                //t.$media.removeAttr('poster');
                                // no Issue found on iOS3 -ttroxell

                // override Apple's autoplay override for iPads
                if (mf.isiPad && t.media.getAttribute('autoplay') !== null) {
                    t.media.load();
                    t.media.play();
                }
                    
            } else if (mf.isAndroid && t.AndroidUseNativeControls) {
                
                // leave default player

            } else {

                // DESKTOP: use MediaElementPlayer controls
                
                // remove native controls           
                t.$media.removeAttr('controls');                    
                
                // unique ID
                t.id = 'mep_' + mejs.mepIndex++;

                // build container
                t.container =
                    $('<div id="' + t.id + '" class="mejs-container">'+
                        '<div class="mejs-inner">'+
                            '<div class="mejs-mediaelement"></div>'+
                            '<div class="mejs-layers"></div>'+
                            '<div class="mejs-controls"></div>'+
                            '<div class="mejs-clear"></div>'+
                        '</div>' +
                    '</div>')
                    .addClass(t.$media[0].className)
                    .insertBefore(t.$media);    
                    
                // add classes for user and content
                t.container.addClass(
                    (mf.isAndroid ? 'mejs-android ' : '') +
                    (mf.isiOS ? 'mejs-ios ' : '') +
                    (mf.isiPad ? 'mejs-ipad ' : '') +
                    (mf.isiPhone ? 'mejs-iphone ' : '') +
                    (t.isVideo ? 'mejs-video ' : 'mejs-audio ')
                );  
                    

                // move the <video/video> tag into the right spot
                if (mf.isiOS) {
                
                    // sadly, you can't move nodes in iOS, so we have to destroy and recreate it!
                    var $newMedia = t.$media.clone();
                    
                    t.container.find('.mejs-mediaelement').append($newMedia);
                    
                    t.$media.remove();
                    t.$node = t.$media = $newMedia;
                    t.node = t.media = $newMedia[0]
                    
                } else {
                    
                    // normal way of moving it into place (doesn't work on iOS)
                    t.container.find('.mejs-mediaelement').append(t.$media);
                }
                
                // find parts
                t.controls = t.container.find('.mejs-controls');
                t.layers = t.container.find('.mejs-layers');

                // determine the size
                
                /* size priority:
                    (1) videoWidth (forced), 
                    (2) style="width;height;"
                    (3) width attribute,
                    (4) defaultVideoWidth (for unspecified cases)
                */
                
                var capsTagName = tagName.substring(0,1).toUpperCase() + tagName.substring(1);
                
                if (t.options[tagName + 'Width'] > 0 || t.options[tagName + 'Width'].toString().indexOf('%') > -1) {
                    t.width = t.options[tagName + 'Width'];
                } else if (t.media.style.width !== '' && t.media.style.width !== null) {
                    t.width = t.media.style.width;                      
                } else if (t.media.getAttribute('width') !== null) {
                    t.width = t.$media.attr('width');
                } else {
                    t.width = t.options['default' + capsTagName + 'Width'];
                }
                
                if (t.options[tagName + 'Height'] > 0 || t.options[tagName + 'Height'].toString().indexOf('%') > -1) {
                    t.height = t.options[tagName + 'Height'];
                } else if (t.media.style.height !== '' && t.media.style.height !== null) {
                    t.height = t.media.style.height;
                } else if (t.$media[0].getAttribute('height') !== null) {
                    t.height = t.$media.attr('height'); 
                } else {
                    t.height = t.options['default' + capsTagName + 'Height'];
                }

                // set the size, while we wait for the plugins to load below
                t.setPlayerSize(t.width, t.height);
                
                // create MediaElementShim
                meOptions.pluginWidth = t.height;
                meOptions.pluginHeight = t.width;               
            }
            
            

            // create MediaElement shim
            mejs.MediaElement(t.$media[0], meOptions);
        },
        
        showControls: function(doAnimation) {
            var t = this;
            
            doAnimation = typeof doAnimation == 'undefined' || doAnimation;
            
            if (t.controlsAreVisible)
                return;
            
            if (doAnimation) {
                t.controls
                    .css('visibility','visible')
                    .stop(true, true).fadeIn(200, function() {t.controlsAreVisible = true;});   
    
                // any additional controls people might add and want to hide
                t.container.find('.mejs-control')
                    .css('visibility','visible')
                    .stop(true, true).fadeIn(200, function() {t.controlsAreVisible = true;});   
                    
            } else {
                t.controls
                    .css('visibility','visible')
                    .css('display','block');
    
                // any additional controls people might add and want to hide
                t.container.find('.mejs-control')
                    .css('visibility','visible')
                    .css('display','block');
                    
                t.controlsAreVisible = true;
            }
            
            t.setControlsSize();
            
        },

        hideControls: function(doAnimation) {
            var t = this;
            
            doAnimation = typeof doAnimation == 'undefined' || doAnimation;
            
            if (!t.controlsAreVisible)
                return;
            
            if (doAnimation) {
                // fade out main controls
                t.controls.stop(true, true).fadeOut(200, function() {
                    $(this)
                        .css('visibility','hidden')
                        .css('display','block');
                        
                    t.controlsAreVisible = false;
                }); 
    
                // any additional controls people might add and want to hide
                t.container.find('.mejs-control').stop(true, true).fadeOut(200, function() {
                    $(this)
                        .css('visibility','hidden')
                        .css('display','block');
                }); 
            } else {
                
                // hide main controls
                t.controls
                    .css('visibility','hidden')
                    .css('display','block');        
                
                // hide others
                t.container.find('.mejs-control')
                    .css('visibility','hidden')
                    .css('display','block');
                    
                t.controlsAreVisible = false;
            }
        },      

        controlsTimer: null,

        startControlsTimer: function(timeout) {

            var t = this;
            
            timeout = typeof timeout != 'undefined' ? timeout : 1500;

            t.killControlsTimer('start');

            t.controlsTimer = setTimeout(function() {
                //console.log('timer fired');
                t.hideControls();
                t.killControlsTimer('hide');
            }, timeout);
        },

        killControlsTimer: function(src) {

            var t = this;

            if (t.controlsTimer !== null) {
                clearTimeout(t.controlsTimer);
                delete t.controlsTimer;
                t.controlsTimer = null;
            }
        },      
        
        controlsEnabled: true,
        
        disableControls: function() {
            var t= this;
            
            t.killControlsTimer();
            t.hideControls(false);
            this.controlsEnabled = false;
        },
        
        enableControls: function() {
            var t= this;
            
            t.showControls(false);
            
            t.controlsEnabled = true;
        },      
        

        // Sets up all controls and events
        meReady: function(media, domNode) {         
        
        
            var t = this,
                mf = mejs.MediaFeatures,
                autoplayAttr = domNode.getAttribute('autoplay'),
                autoplay = !(typeof autoplayAttr == 'undefined' || autoplayAttr === null || autoplayAttr === 'false'),
                featureIndex,
                feature;

            // make sure it can't create itself again if a plugin reloads
            if (t.created)
                return;
            else
                t.created = true;           

            t.media = media;
            t.domNode = domNode;
            
            if (!(mf.isAndroid && t.options.AndroidUseNativeControls) && !(mf.isiPad && t.options.iPadUseNativeControls) && !(mf.isiPhone && t.options.iPhoneUseNativeControls)) {              
                
                // two built in features
                t.buildposter(t, t.controls, t.layers, t.media);
                t.buildkeyboard(t, t.controls, t.layers, t.media);
                t.buildoverlays(t, t.controls, t.layers, t.media);

                // grab for use by features
                t.findTracks();

                // add user-defined features/controls
                for (featureIndex in t.options.features) {
                    feature = t.options.features[featureIndex];
                    if (t['build' + feature]) {
                        try {
                            t['build' + feature](t, t.controls, t.layers, t.media);
                        } catch (e) {
                            // TODO: report control error
                            //throw e;
                            //console.log('error building ' + feature);
                            //console.log(e);
                        }
                    }
                }

                t.container.trigger('controlsready');
                
                // reset all layers and controls
                t.setPlayerSize(t.width, t.height);
                t.setControlsSize();
                

                // controls fade
                if (t.isVideo) {
                
                    if (mejs.MediaFeatures.hasTouch) {
                        
                        // for touch devices (iOS, Android)
                        // show/hide without animation on touch
                        
                        t.$media.bind('touchstart', function() {
                            
                            
                            // toggle controls
                            if (t.controlsAreVisible) {
                                t.hideControls(false);
                            } else {
                                if (t.controlsEnabled) {
                                    t.showControls(false);
                                }
                            }
                        });                 
                    
                    } else {
                        // click controls
                        var clickElement = (t.media.pluginType == 'native') ? t.$media : $(t.media.pluginElement);
                        
                        // click to play/pause
                        clickElement.click(function() {
                            if (media.paused) {
                                media.play();
                            } else {
                                media.pause();
                            }
                        });
                        
                    
                        // show/hide controls
                        t.container
                            .bind('mouseenter mouseover', function () {
                                if (t.controlsEnabled) {
                                    if (!t.options.alwaysShowControls) {                                
                                        t.killControlsTimer('enter');
                                        t.showControls();
                                        t.startControlsTimer(2500);     
                                    }
                                }
                            })
                            .bind('mousemove', function() {
                                if (t.controlsEnabled) {
                                    if (!t.controlsAreVisible) {
                                        t.showControls();
                                    }
                                    //t.killControlsTimer('move');
                                    if (!t.options.alwaysShowControls) {
                                        t.startControlsTimer(2500);
                                    }
                                }
                            })
                            .bind('mouseleave', function () {
                                if (t.controlsEnabled) {
                                    if (!t.media.paused && !t.options.alwaysShowControls) {
                                        t.startControlsTimer(1000);                             
                                    }
                                }
                            });
                    }
                    
                    // check for autoplay
                    if (autoplay && !t.options.alwaysShowControls) {
                        t.hideControls();
                    }

                    // resizer
                    if (t.options.enableAutosize) {
                        t.media.addEventListener('loadedmetadata', function(e) {
                            // if the <video height> was not set and the options.videoHeight was not set
                            // then resize to the real dimensions
                            if (t.options.videoHeight <= 0 && t.domNode.getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
                                t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
                                t.setControlsSize();
                                t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);
                            }
                        }, false);
                    }
                }
                
                // EVENTS

                // FOCUS: when a video starts playing, it takes focus from other players (possibily pausing them)
                media.addEventListener('play', function() {
                        
                        // go through all other players
                        for (var i=0, il=mejs.players.length; i<il; i++) {
                            var p = mejs.players[i];
                            if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
                                p.pause();
                            }
                            p.hasFocus = false;
                        }
                        
                        t.hasFocus = true;
                },false);
                                

                // ended for all
                t.media.addEventListener('ended', function (e) {
                    try{
                        t.media.setCurrentTime(0);
                    } catch (exp) {
                        
                    }
                    t.media.pause();
                    
                    if (t.setProgressRail)
                        t.setProgressRail();
                    if (t.setCurrentRail)
                        t.setCurrentRail();                     

                    if (t.options.loop) {
                        t.media.play();
                    } else if (!t.options.alwaysShowControls && t.controlsEnabled) {
                        t.showControls();
                    }
                }, false);
                
                // resize on the first play
                t.media.addEventListener('loadedmetadata', function(e) {
                    if (t.updateDuration) {
                        t.updateDuration();
                    }
                    if (t.updateCurrent) {
                        t.updateCurrent();
                    }
                    
                    if (!t.isFullScreen) {
                        t.setPlayerSize(t.width, t.height);
                        t.setControlsSize();
                    }
                }, false);


                // webkit has trouble doing this without a delay
                setTimeout(function () {
                    t.setPlayerSize(t.width, t.height);
                    t.setControlsSize();
                }, 50);
                
                // adjust controls whenever window sizes (used to be in fullscreen only)
                $(window).resize(function() {
                    
                    // don't resize for fullscreen mode             
                    if ( !(t.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen)) ) {
                        t.setPlayerSize(t.width, t.height);
                    }
                    
                    // always adjust controls
                    t.setControlsSize();
                });             

                // TEMP: needs to be moved somewhere else
                if (t.media.pluginType == 'youtube') {
                    t.container.find('.mejs-overlay-play').hide();  
                }
            }
            
            // force autoplay for HTML5
            if (autoplay && media.pluginType == 'native') {
                media.load();
                media.play();
            }


            if (t.options.success) {
                
                if (typeof t.options.success == 'string') {
                        window[t.options.success](t.media, t.domNode, t);
                } else {
                        t.options.success(t.media, t.domNode, t);
                }
            }
        },

        handleError: function(e) {
            var t = this;
            
            t.controls.hide();
        
            // Tell user that the file cannot be played
            if (t.options.error) {
                t.options.error(e);
            }
        },

        setPlayerSize: function(width,height) {
            var t = this;

            if (typeof width != 'undefined')
                t.width = width;
                
            if (typeof height != 'undefined')
                t.height = height;

            // detect 100% mode
            if (t.height.toString().indexOf('%') > 0) {
            
                // do we have the native dimensions yet?
                var 
                    nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth,
                    nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight,
                    parentWidth = t.container.parent().width(),
                    newHeight = parseInt(parentWidth * nativeHeight/nativeWidth, 10);
                    
                if (t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {
                    parentWidth = $(window).width();
                    newHeight = $(window).height();
                }
                    
                
                // set outer container size
                t.container
                    .width(parentWidth)
                    .height(newHeight);
                    
                // set native <video>
                t.$media
                    .width('100%')
                    .height('100%');
                    
                // set shims
                t.container.find('object, embed, iframe')
                    .width('100%')
                    .height('100%');
                    
                // if shim is ready, send the size to the embeded plugin    
                if (t.media.setVideoSize)
                    t.media.setVideoSize(parentWidth, newHeight);
                    
                // set the layers
                t.layers.children('.mejs-layer')
                    .width('100%')
                    .height('100%');                    
            
            
            } else {

                t.container
                    .width(t.width)
                    .height(t.height);
    
                t.layers.children('.mejs-layer')
                    .width(t.width)
                    .height(t.height);
                    
            }
        },

        setControlsSize: function() {
            var t = this,
                usedWidth = 0,
                railWidth = 0,
                rail = t.controls.find('.mejs-time-rail'),
                total = t.controls.find('.mejs-time-total'),
                current = t.controls.find('.mejs-time-current'),
                loaded = t.controls.find('.mejs-time-loaded'),
                others = rail.siblings();
            

            // allow the size to come from custom CSS
            if (t.options && !t.options.autosizeProgress) {
                // Also, frontends devs can be more flexible 
                // due the opportunity of absolute positioning.
                railWidth = parseInt(rail.css('width'));
            }
            
            // attempt to autosize
            if (railWidth === 0 || !railWidth) {
                
                // find the size of all the other controls besides the rail
                others.each(function() {
                    if ($(this).css('position') != 'absolute') {
                        usedWidth += $(this).outerWidth(true);
                    }
                });
                
                // fit the rail into the remaining space
                railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.width());
            }

            // outer area
            rail.width(railWidth);
            // dark space
            total.width(railWidth - (total.outerWidth(true) - total.width()));
            
            if (t.setProgressRail)
                t.setProgressRail();
            if (t.setCurrentRail)
                t.setCurrentRail();             
        },


        buildposter: function(player, controls, layers, media) {
            var t = this,
                poster = 
                $('<div class="mejs-poster mejs-layer">' +
                '</div>')
                    .appendTo(layers),
                posterUrl = player.$media.attr('poster');

            // prioriy goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
            if (player.options.poster !== '') {
                posterUrl = player.options.poster;
            }   
                
            // second, try the real poster
            if (posterUrl !== '' && posterUrl != null) {
                t.setPoster(posterUrl);
            } else {
                poster.hide();
            }

            media.addEventListener('play',function() {
                poster.hide();
            }, false);
        },
        
        setPoster: function(url) {
            var t = this,
                posterDiv = t.container.find('.mejs-poster'),
                posterImg = posterDiv.find('img');
                
            if (posterImg.length == 0) {
                posterImg = $('<img width="100%" height="100%" />').appendTo(posterDiv);
            }   
            
            posterImg.attr('src', url);
        },

        buildoverlays: function(player, controls, layers, media) {
            if (!player.isVideo)
                return;

            var 
            loading = 
                $('<div class="mejs-overlay mejs-layer">'+
                    '<div class="mejs-overlay-loading"><span></span></div>'+
                '</div>')
                .hide() // start out hidden
                .appendTo(layers),
            error = 
                $('<div class="mejs-overlay mejs-layer">'+
                    '<div class="mejs-overlay-error"></div>'+
                '</div>')
                .hide() // start out hidden
                .appendTo(layers),
            // this needs to come last so it's on top
            bigPlay = 
                $('<div class="mejs-overlay mejs-layer mejs-overlay-play">'+
                    '<div class="mejs-overlay-button"></div>'+
                '</div>')
                .appendTo(layers)
                .click(function() {
                    if (media.paused) {
                        media.play();
                    } else {
                        media.pause();
                    }
                });
            
            /*
            if (mejs.MediaFeatures.isiOS || mejs.MediaFeatures.isAndroid) {
                bigPlay.remove();
                loading.remove();
            }
            */
    

            // show/hide big play button
            media.addEventListener('play',function() {
                bigPlay.hide();
                loading.hide();
                controls.find('.mejs-time-buffering').hide();
                error.hide();
            }, false);  
            
            media.addEventListener('playing', function() {
                bigPlay.hide();
                loading.hide();
                controls.find('.mejs-time-buffering').hide();
                error.hide();           
            }, false);

            media.addEventListener('seeking', function() {
                loading.show();
                controls.find('.mejs-time-buffering').show();
            }, false);

            media.addEventListener('seeked', function() {
                loading.hide();
                controls.find('.mejs-time-buffering').hide();
            }, false);
    
            media.addEventListener('pause',function() {
                if (!mejs.MediaFeatures.isiPhone) {
                    bigPlay.show();
                }
            }, false);
            
            media.addEventListener('waiting', function() {
                loading.show(); 
                controls.find('.mejs-time-buffering').show();
            }, false);          
            
            
            // show/hide loading            
            media.addEventListener('loadeddata',function() {
                // for some reason Chrome is firing this event
                //if (mejs.MediaFeatures.isChrome && media.getAttribute && media.getAttribute('preload') === 'none')
                //  return;
                    
                loading.show();
                controls.find('.mejs-time-buffering').show();
            }, false);  
            media.addEventListener('canplay',function() {
                loading.hide();
                controls.find('.mejs-time-buffering').hide();
            }, false);  

            // error handling
            media.addEventListener('error',function() {
                loading.hide();
                controls.find('.mejs-time-buffering').hide();
                error.show();
                error.find('mejs-overlay-error').html("Error loading this resource");
            }, false);              
        },
        
        buildkeyboard: function(player, controls, layers, media) {

                var t = this;
                
                // listen for key presses
                $(document).keydown(function(e) {
                        
                        if (player.hasFocus && player.options.enableKeyboard) {
                                        
                                // find a matching key
                                for (var i=0, il=player.options.keyActions.length; i<il; i++) {
                                        var keyAction = player.options.keyActions[i];
                                        
                                        for (var j=0, jl=keyAction.keys.length; j<jl; j++) {
                                                if (e.keyCode == keyAction.keys[j]) {
                                                        e.preventDefault();
                                                        keyAction.action(player, media);
                                                        return false;
                                                }                                               
                                        }
                                }
                        }
                        
                        return true;
                });
                
                // check if someone clicked outside a player region, then kill its focus
                $(document).click(function(event) {
                        if ($(event.target).closest('.mejs-container').length == 0) {
                                player.hasFocus = false;
                        }
                });
            
        },

        findTracks: function() {
            var t = this,
                tracktags = t.$media.find('track');

            // store for use by plugins
            t.tracks = [];
            tracktags.each(function(index, track) {
                
                track = $(track);
                
                t.tracks.push({
                    srclang: track.attr('srclang').toLowerCase(),
                    src: track.attr('src'),
                    kind: track.attr('kind'),
                    label: track.attr('label') || '',
                    entries: [],
                    isLoaded: false
                });
            });
        },
        changeSkin: function(className) {
            this.container[0].className = 'mejs-container ' + className;
            this.setPlayerSize(this.width, this.height);
            this.setControlsSize();
        },
        play: function() {
            this.media.play();
        },
        pause: function() {
            this.media.pause();
        },
        load: function() {
            this.media.load();
        },
        setMuted: function(muted) {
            this.media.setMuted(muted);
        },
        setCurrentTime: function(time) {
            this.media.setCurrentTime(time);
        },
        getCurrentTime: function() {
            return this.media.currentTime;
        },
        setVolume: function(volume) {
            this.media.setVolume(volume);
        },
        getVolume: function() {
            return this.media.volume;
        },
        setSrc: function(src) {
            this.media.setSrc(src);
        },
        remove: function() {
            var t = this;
            
            if (t.media.pluginType == 'flash') {
                t.media.remove();
            } else if (t.media.pluginType == 'native') {
                t.media.prop('controls', true);
            }
            
            // grab video and put it back in place
            if (!t.isDynamic) {
                t.$node.insertBefore(t.container)
            }
            
            t.container.remove();
        }
    };

    // turn into jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.mediaelementplayer = function (options) {
            return this.each(function () {
                new mejs.MediaElementPlayer(this, options);
            });
        };
    }
    
    $(document).ready(function() {
        // auto enable using JSON attribute
        $('.mejs-player').mediaelementplayer();
    });
    
    // push out to window
    window.MediaElementPlayer = mejs.MediaElementPlayer;

})(mejs.$);

(function($) {

    $.extend(mejs.MepDefaults, {
        playpauseText: 'Play/Pause'
    });

    // PLAY/pause BUTTON
    $.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(player, controls, layers, media) {
            var 
                t = this,
                play = 
                $('<div class="mejs-button mejs-playpause-button mejs-play" >' +
                    '<button type="button" aria-controls="' + t.id + '" title="' + t.options.playpauseText + '"></button>' +
                '</div>')
                .appendTo(controls)
                .click(function(e) {
                    e.preventDefault();
                
                    if (media.paused) {
                        media.play();
                    } else {
                        media.pause();
                    }
                    
                    return false;
                });

            media.addEventListener('play',function() {
                play.removeClass('mejs-play').addClass('mejs-pause');
            }, false);
            media.addEventListener('playing',function() {
                play.removeClass('mejs-play').addClass('mejs-pause');
            }, false);


            media.addEventListener('pause',function() {
                play.removeClass('mejs-pause').addClass('mejs-play');
            }, false);
            media.addEventListener('paused',function() {
                play.removeClass('mejs-pause').addClass('mejs-play');
            }, false);
        }
    });
    
})(mejs.$);
(function($) {

    $.extend(mejs.MepDefaults, {
        stopText: 'Stop'
    });

    // STOP BUTTON
    $.extend(MediaElementPlayer.prototype, {
        buildstop: function(player, controls, layers, media) {
            var t = this,
                stop = 
                $('<div class="mejs-button mejs-stop-button mejs-stop">' +
                    '<button type="button" aria-controls="' + t.id + '" title="' + t.options.stopText + '"></button>' +
                '</div>')
                .appendTo(controls)
                .click(function() {
                    if (!media.paused) {
                        media.pause();
                    }
                    if (media.currentTime > 0) {
                        media.setCurrentTime(0);    
                        controls.find('.mejs-time-current').width('0px');
                        controls.find('.mejs-time-handle').css('left', '0px');
                        controls.find('.mejs-time-float-current').html( mejs.Utility.secondsToTimeCode(0) );
                        controls.find('.mejs-currenttime').html( mejs.Utility.secondsToTimeCode(0) );                   
                        layers.find('.mejs-poster').show();
                    }
                });
        }
    });
    
})(mejs.$);
(function($) {
    // progress/loaded bar
    $.extend(MediaElementPlayer.prototype, {
        buildprogress: function(player, controls, layers, media) {

            $('<div class="mejs-time-rail">'+
                '<span class="mejs-time-total">'+
                    '<span class="mejs-time-buffering"></span>'+
                    '<span class="mejs-time-loaded"></span>'+
                    '<span class="mejs-time-current"></span>'+
                    '<span class="mejs-time-handle"></span>'+
                    '<span class="mejs-time-float">' + 
                        '<span class="mejs-time-float-current">00:00</span>' + 
                        '<span class="mejs-time-float-corner"></span>' + 
                    '</span>'+
                '</span>'+
            '</div>')
                .appendTo(controls);
                controls.find('.mejs-time-buffering').hide();

            var 
                t = this,
                total = controls.find('.mejs-time-total'),
                loaded  = controls.find('.mejs-time-loaded'),
                current  = controls.find('.mejs-time-current'),
                handle  = controls.find('.mejs-time-handle'),
                timefloat  = controls.find('.mejs-time-float'),
                timefloatcurrent  = controls.find('.mejs-time-float-current'),
                handleMouseMove = function (e) {
                    // mouse position relative to the object
                    var x = e.pageX,
                        offset = total.offset(),
                        width = total.outerWidth(),
                        percentage = 0,
                        newTime = 0,
                        pos = x - offset.left;


                    if (x > offset.left && x <= width + offset.left && media.duration) {
                        percentage = ((x - offset.left) / width);
                        newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;

                        // seek to where the mouse is
                        if (mouseIsDown) {
                            media.setCurrentTime(newTime);
                        }

                        // position floating time box
                        if (!mejs.MediaFeatures.hasTouch) {
                                timefloat.css('left', pos);
                                timefloatcurrent.html( mejs.Utility.secondsToTimeCode(newTime) );
                                timefloat.show();
                        }
                    }
                },
                mouseIsDown = false,
                mouseIsOver = false;

            // handle clicks
            //controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
            total
                .bind('mousedown', function (e) {
                    // only handle left clicks
                    if (e.which === 1) {
                        mouseIsDown = true;
                        handleMouseMove(e);
                        $(document)
                            .bind('mousemove.dur', function(e) {
                                handleMouseMove(e);
                            })
                            .bind('mouseup.dur', function (e) {
                                mouseIsDown = false;
                                timefloat.hide();
                                $(document).unbind('.dur');
                            });
                        return false;
                    }
                })
                .bind('mouseenter', function(e) {
                    mouseIsOver = true;
                    $(document).bind('mousemove.dur', function(e) {
                        handleMouseMove(e);
                    });
                    if (!mejs.MediaFeatures.hasTouch) {
                        timefloat.show();
                    }
                })
                .bind('mouseleave',function(e) {
                    mouseIsOver = false;
                    if (!mouseIsDown) {
                        $(document).unbind('.dur');
                        timefloat.hide();
                    }
                });

            // loading
            media.addEventListener('progress', function (e) {
                player.setProgressRail(e);
                player.setCurrentRail(e);
            }, false);

            // current time
            media.addEventListener('timeupdate', function(e) {
                player.setProgressRail(e);
                player.setCurrentRail(e);
            }, false);
            
            
            // store for later use
            t.loaded = loaded;
            t.total = total;
            t.current = current;
            t.handle = handle;
        },
        setProgressRail: function(e) {

            var
                t = this,
                target = (e != undefined) ? e.target : t.media,
                percent = null;         

            // newest HTML5 spec has buffered array (FF4, Webkit)
            if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
                // TODO: account for a real array with multiple values (only Firefox 4 has this so far) 
                percent = target.buffered.end(0) / target.duration;
            } 
            // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
            // to be anything other than 0. If the byte count is available we use this instead.
            // Browsers that support the else if do not seem to have the bufferedBytes value and
            // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
            else if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
                percent = target.bufferedBytes / target.bytesTotal;
            }
            // Firefox 3 with an Ogg file seems to go this way
            else if (e && e.lengthComputable && e.total != 0) {
                percent = e.loaded/e.total;
            }

            // finally update the progress bar
            if (percent !== null) {
                percent = Math.min(1, Math.max(0, percent));
                // update loaded bar
                if (t.loaded && t.total) {
                    t.loaded.width(t.total.width() * percent);
                }
            }
        },
        setCurrentRail: function() {

            var t = this;
        
            if (t.media.currentTime != undefined && t.media.duration) {

                // update bar and handle
                if (t.total && t.handle) {
                    var 
                        newWidth = t.total.width() * t.media.currentTime / t.media.duration,
                        handlePos = newWidth - (t.handle.outerWidth(true) / 2);

                    t.current.width(newWidth);
                    t.handle.css('left', handlePos);
                }
            }

        }   
    });
})(mejs.$);
(function($) {
    
    // options
    $.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: ' <span> | </span> '
    });


    // current and duration 00:00 / 00:00
    $.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(player, controls, layers, media) {
            var t = this;
            
            $('<div class="mejs-time">'+
                    '<span class="mejs-currenttime">' + (player.options.alwaysShowHours ? '00:' : '')
                    + (player.options.showTimecodeFrameCount? '00:00:00':'00:00')+ '</span>'+
                    '</div>')
                    .appendTo(controls);
            
            t.currenttime = t.controls.find('.mejs-currenttime');

            media.addEventListener('timeupdate',function() {
                player.updateCurrent();
            }, false);
        },


        buildduration: function(player, controls, layers, media) {
            var t = this;
            
            if (controls.children().last().find('.mejs-currenttime').length > 0) {
                $(t.options.timeAndDurationSeparator +
                    '<span class="mejs-duration">' + 
                        (t.options.duration > 0 ? 
                            mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25) :
                            ((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount? '00:00:00':'00:00')) 
                        ) + 
                    '</span>')
                    .appendTo(controls.find('.mejs-time'));
            } else {

                // add class to current time
                controls.find('.mejs-currenttime').parent().addClass('mejs-currenttime-container');
                
                $('<div class="mejs-time mejs-duration-container">'+
                    '<span class="mejs-duration">' + 
                        (t.options.duration > 0 ? 
                            mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25) :
                            ((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount? '00:00:00':'00:00')) 
                        ) + 
                    '</span>' +
                '</div>')
                .appendTo(controls);
            }
            
            t.durationD = t.controls.find('.mejs-duration');

            media.addEventListener('timeupdate',function() {
                player.updateDuration();
            }, false);
        },
        
        updateCurrent:  function() {
            var t = this;

            if (t.currenttime) {
                t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25));
            }
        },
        
        updateDuration: function() {    
            var t = this;
            
            if (t.media.duration && t.durationD) {
                t.durationD.html(mejs.Utility.secondsToTimeCode(t.media.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));
            }       
        }
    });

})(mejs.$);
(function($) {

    $.extend(mejs.MepDefaults, {
        muteText: 'Mute Toggle',
        hideVolumeOnTouchDevices: true,
        
        audioVolume: 'horizontal',
        videoVolume: 'vertical'
    });

    $.extend(MediaElementPlayer.prototype, {
        buildvolume: function(player, controls, layers, media) {
                
            // Android and iOS don't support volume controls
            if (mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)
                return;
            
            var t = this,
                mode = (t.isVideo) ? t.options.videoVolume : t.options.audioVolume,
                mute = (mode == 'horizontal') ?
                
                // horizontal version
                $('<div class="mejs-button mejs-volume-button mejs-mute">'+
                    '<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>'+
                '</div>' +
                '<div class="mejs-horizontal-volume-slider">'+ // outer background
                    '<div class="mejs-horizontal-volume-total"></div>'+ // line background
                    '<div class="mejs-horizontal-volume-current"></div>'+ // current volume
                    '<div class="mejs-horizontal-volume-handle"></div>'+ // handle
                '</div>'
                )
                    .appendTo(controls) :
                
                // vertical version
                $('<div class="mejs-button mejs-volume-button mejs-mute">'+
                    '<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>'+
                    '<div class="mejs-volume-slider">'+ // outer background
                        '<div class="mejs-volume-total"></div>'+ // line background
                        '<div class="mejs-volume-current"></div>'+ // current volume
                        '<div class="mejs-volume-handle"></div>'+ // handle
                    '</div>'+
                '</div>')
                    .appendTo(controls),
            volumeSlider = t.container.find('.mejs-volume-slider, .mejs-horizontal-volume-slider'),
            volumeTotal = t.container.find('.mejs-volume-total, .mejs-horizontal-volume-total'),
            volumeCurrent = t.container.find('.mejs-volume-current, .mejs-horizontal-volume-current'),
            volumeHandle = t.container.find('.mejs-volume-handle, .mejs-horizontal-volume-handle'),

            positionVolumeHandle = function(volume, secondTry) {

                if (!volumeSlider.is(':visible') && typeof secondTry != 'undefined') {
                    volumeSlider.show();
                    positionVolumeHandle(volume, true);
                    volumeSlider.hide()
                    return;
                }
            
                // correct to 0-1
                volume = Math.max(0,volume);
                volume = Math.min(volume,1);                    
                
                // ajust mute button style
                if (volume == 0) {
                    mute.removeClass('mejs-mute').addClass('mejs-unmute');
                } else {
                    mute.removeClass('mejs-unmute').addClass('mejs-mute');
                }               

                // position slider 
                if (mode == 'vertical') {
                    var 
                    
                        // height of the full size volume slider background
                        totalHeight = volumeTotal.height(),
                        
                        // top/left of full size volume slider background
                        totalPosition = volumeTotal.position(),
                        
                        // the new top position based on the current volume
                        // 70% volume on 100px height == top:30px
                        newTop = totalHeight - (totalHeight * volume);
    
                    // handle
                    volumeHandle.css('top', totalPosition.top + newTop - (volumeHandle.height() / 2));
    
                    // show the current visibility
                    volumeCurrent.height(totalHeight - newTop );
                    volumeCurrent.css('top', totalPosition.top + newTop);
                } else {
                    var 
                    
                        // height of the full size volume slider background
                        totalWidth = volumeTotal.width(),
                        
                        // top/left of full size volume slider background
                        totalPosition = volumeTotal.position(),
                        
                        // the new left position based on the current volume
                        newLeft = totalWidth * volume;
    
                    // handle
                    volumeHandle.css('left', totalPosition.left + newLeft - (volumeHandle.width() / 2));
    
                    // rezize the current part of the volume bar
                    volumeCurrent.width( newLeft );
                }
            },
            handleVolumeMove = function(e) {
                
                var volume = null,
                    totalOffset = volumeTotal.offset();
                
                // calculate the new volume based on the moust position
                if (mode == 'vertical') {
                
                    var
                        railHeight = volumeTotal.height(),
                        totalTop = parseInt(volumeTotal.css('top').replace(/px/,''),10),
                        newY = e.pageY - totalOffset.top;
                        
                    volume = (railHeight - newY) / railHeight;
                        
                    // the controls just hide themselves (usually when mouse moves too far up)
                    if (totalOffset.top == 0 || totalOffset.left == 0)
                        return;
                    
                } else {
                    var
                        railWidth = volumeTotal.width(),
                        newX = e.pageX - totalOffset.left;
                        
                    volume = newX / railWidth;
                }
                
                // ensure the volume isn't outside 0-1
                volume = Math.max(0,volume);
                volume = Math.min(volume,1);
                
                // position the slider and handle           
                positionVolumeHandle(volume);
                
                // set the media object (this will trigger the volumechanged event)
                if (volume == 0) {
                    media.setMuted(true);
                } else {
                    media.setMuted(false);
                }
                media.setVolume(volume);            
            },
            mouseIsDown = false,
            mouseIsOver = false;

            // SLIDER
            
            mute
                .hover(function() {
                    volumeSlider.show();
                    mouseIsOver = true;
                }, function() {
                    mouseIsOver = false;    
                        
                    if (!mouseIsDown && mode == 'vertical') {
                        volumeSlider.hide();
                    }
                });
            
            volumeSlider
                .bind('mouseover', function() {
                    mouseIsOver = true; 
                })
                .bind('mousedown', function (e) {
                    handleVolumeMove(e);
                    $(document)
                        .bind('mousemove.vol', function(e) {
                            handleVolumeMove(e);
                        })
                        .bind('mouseup.vol', function () {
                            mouseIsDown = false;
                            $(document).unbind('.vol');

                            if (!mouseIsOver && mode == 'vertical') {
                                volumeSlider.hide();
                            }
                        });
                    mouseIsDown = true;
                        
                    return false;
                });


            // MUTE button
            mute.find('button').click(function() {
                media.setMuted( !media.muted );
            });

            // listen for volume change events from other sources
            media.addEventListener('volumechange', function(e) {
                if (!mouseIsDown) {
                    if (media.muted) {
                        positionVolumeHandle(0);
                        mute.removeClass('mejs-mute').addClass('mejs-unmute');
                    } else {
                        positionVolumeHandle(media.volume);
                        mute.removeClass('mejs-unmute').addClass('mejs-mute');
                    }
                }
            }, false);

            if (t.container.is(':visible')) {
                // set initial volume
                positionVolumeHandle(player.options.startVolume);
                
                // shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
                if (media.pluginType === 'native') {
                    media.setVolume(player.options.startVolume);
                }
            }
        }
    });
    
})(mejs.$);

(function($) {
    
    $.extend(mejs.MepDefaults, {
        usePluginFullScreen: true,
        newWindowCallback: function() { return '';},
        fullscreenText: 'Fullscreen'
    });
    
    $.extend(MediaElementPlayer.prototype, {
        
        isFullScreen: false,
        
        isNativeFullScreen: false,
        
        docStyleOverflow: null,
        
        isInIframe: false,
        
        buildfullscreen: function(player, controls, layers, media) {

            if (!player.isVideo)
                return;
                
            player.isInIframe = (window.location != window.parent.location);
                
            // native events
            if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                
                // chrome doesn't alays fire this in an iframe
                var target = null;
                
                if (mejs.MediaFeatures.hasMozNativeFullScreen) {
                    target = $(document);
                } else {
                    target = player.container;
                }
                
                target.bind(mejs.MediaFeatures.fullScreenEventName, function(e) {
                //player.container.bind('webkitfullscreenchange', function(e) {
                
                    
                    if (mejs.MediaFeatures.isFullScreen()) {
                        player.isNativeFullScreen = true;
                        // reset the controls once we are fully in full screen
                        player.setControlsSize();
                    } else {
                        player.isNativeFullScreen = false;
                        // when a user presses ESC
                        // make sure to put the player back into place                              
                        player.exitFullScreen();                
                    }
                });
            }

            var t = this,       
                normalHeight = 0,
                normalWidth = 0,
                container = player.container,                       
                fullscreenBtn = 
                    $('<div class="mejs-button mejs-fullscreen-button">' + 
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.fullscreenText + '"></button>' + 
                    '</div>')
                    .appendTo(controls);
                
                if (t.media.pluginType === 'native' || (!t.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)) {
                    
                    fullscreenBtn.click(function() {
                        var isFullScreen = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || player.isFullScreen;                                                    
                        
                        if (isFullScreen) {
                            player.exitFullScreen();
                        } else {                        
                            player.enterFullScreen();
                        }
                    });
                    
                } else {

                    var hideTimeout = null,
                        supportsPointerEvents = (function() {
                            // TAKEN FROM MODERNIZR
                            var element = document.createElement('x'),
                                documentElement = document.documentElement,
                                getComputedStyle = window.getComputedStyle,
                                supports;
                            if(!('pointerEvents' in element.style)){
                                return false;
                            }
                            element.style.pointerEvents = 'auto';
                            element.style.pointerEvents = 'x';
                            documentElement.appendChild(element);
                            supports = getComputedStyle && 
                                getComputedStyle(element, '').pointerEvents === 'auto';
                            documentElement.removeChild(element);
                            return !!supports;                          
                        })();
                        
                    console.log('supportsPointerEvents', supportsPointerEvents);
                        
                    if (supportsPointerEvents && !mejs.MediaFeatures.isOpera) { // opera doesn't allow this :(
                        
                        // allows clicking through the fullscreen button and controls down directly to Flash
                        
                        /*
                         When a user puts his mouse over the fullscreen button, the controls are disabled
                         So we put a div over the video and another one on iether side of the fullscreen button
                         that caputre mouse movement
                         and restore the controls once the mouse moves outside of the fullscreen button
                        */
                        
                        var fullscreenIsDisabled = false,
                            restoreControls = function() {
                                if (fullscreenIsDisabled) {
                                    // hide the hovers
                                    videoHoverDiv.hide();
                                    controlsLeftHoverDiv.hide();
                                    controlsRightHoverDiv.hide();
                                    
                                    // restore the control bar
                                    fullscreenBtn.css('pointer-events', '');
                                    t.controls.css('pointer-events', '');
                                    
                                    // store for later
                                    fullscreenIsDisabled = false;
                                }
                            },
                            videoHoverDiv = $('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls),
                            controlsLeftHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),
                            controlsRightHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),
                            positionHoverDivs = function() {
                                var style = {position: 'absolute', top: 0, left: 0}; //, backgroundColor: '#f00'};
                                videoHoverDiv.css(style);
                                controlsLeftHoverDiv.css(style);
                                controlsRightHoverDiv.css(style);
                                
                                // over video, but not controls
                                videoHoverDiv
                                    .width( t.container.width() )
                                    .height( t.container.height() - t.controls.height() );
                                
                                // over controls, but not the fullscreen button
                                var fullScreenBtnOffset = fullscreenBtn.offset().left - t.container.offset().left;
                                    fullScreenBtnWidth = fullscreenBtn.outerWidth(true);
                                    
                                controlsLeftHoverDiv
                                    .width( fullScreenBtnOffset )
                                    .height( t.controls.height() )
                                    .css({top: t.container.height() - t.controls.height()});
                                    
                                // after the fullscreen button
                                controlsRightHoverDiv
                                    .width( t.container.width() - fullScreenBtnOffset - fullScreenBtnWidth )
                                    .height( t.controls.height() )
                                    .css({top: t.container.height() - t.controls.height(),
                                         left: fullScreenBtnOffset + fullScreenBtnWidth});                              
                            };
                        
                        $(document).resize(function() {
                            positionHoverDivs();
                        });
                                                
                        // on hover, kill the fullscreen button's HTML handling, allowing clicks down to Flash
                        fullscreenBtn
                            .mouseover(function() {
                                
                                if (!t.isFullScreen) {
                                    
                                    var buttonPos = fullscreenBtn.offset(),
                                        containerPos = player.container.offset();
                                    
                                    // move the button in Flash into place
                                    media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);                                    
                                    
                                    // allows click through
                                    fullscreenBtn.css('pointer-events', 'none');
                                    t.controls.css('pointer-events', 'none');
                                    
                                    // show the divs that will restore things
                                    videoHoverDiv.show();
                                    controlsRightHoverDiv.show();
                                    controlsLeftHoverDiv.show();
                                    positionHoverDivs();
                                    
                                    fullscreenIsDisabled = true;
                                }
                            
                            });
                        
                        // restore controls anytime the user enters or leaves fullscreen    
                        media.addEventListener('fullscreenchange', function(e) {
                            restoreControls();
                        });
                        
                        
                        // the mouseout event doesn't work on the fullscren button, because we already killed the pointer-events
                        // so we use the document.mousemove event to restore controls when the mouse moves outside the fullscreen button 
                        /*
                        $(document).mousemove(function(e) {
                            
                            // if the mouse is anywhere but the fullsceen button, then restore it all
                            if (fullscreenIsDisabled) {
                                
                                var fullscreenBtnPos = fullscreenBtn.offset();
                                

                                if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) ||
                                    e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)
                                    ) {
                                
                                    fullscreenBtn.css('pointer-events', '');
                                    t.controls.css('pointer-events', '');
                                    
                                    fullscreenIsDisabled = false;
                                }
                            }
                        });
                        */
                        
                        
                    } else {
                        
                        // the hover state will show the fullscreen button in Flash to hover up and click
                        
                        fullscreenBtn
                            .mouseover(function() {
                                
                                if (hideTimeout !== null) {
                                    clearTimeout(hideTimeout);
                                    delete hideTimeout;
                                }
                                
                                var buttonPos = fullscreenBtn.offset(),
                                    containerPos = player.container.offset();
                                    
                                media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);
                            
                            })
                            .mouseout(function() {
                            
                                if (hideTimeout !== null) {
                                    clearTimeout(hideTimeout);
                                    delete hideTimeout;
                                }
                                
                                hideTimeout = setTimeout(function() {   
                                    media.hideFullscreenButton();
                                }, 1500);
                                
                                
                            });                     
                    }
                }
            
            player.fullscreenBtn = fullscreenBtn;   

            $(document).bind('keydown',function (e) {
                if (((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || t.isFullScreen) && e.keyCode == 27) {
                    player.exitFullScreen();
                }
            });
                
        },
        enterFullScreen: function() {
            
            var t = this;
            
            // firefox+flash can't adjust plugin sizes without resetting :(
            if (t.media.pluginType !== 'native' && (mejs.MediaFeatures.isFirefox || t.options.usePluginFullScreen)) {
                //t.media.setFullscreen(true);
                //player.isFullScreen = true;
                return;
            }           
                        
            // store overflow 
            docStyleOverflow = document.documentElement.style.overflow;
            // set it to not show scroll bars so 100% will work
            document.documentElement.style.overflow = 'hidden';         
        
            // store sizing
            normalHeight = t.container.height();
            normalWidth = t.container.width();
            
            // attempt to do true fullscreen (Safari 5.1 and Firefox Nightly only for now)
            if (t.media.pluginType === 'native') {
                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                            
                    mejs.MediaFeatures.requestFullScreen(t.container[0]);
                    //return;
                    
                    if (t.isInIframe) {
                        // sometimes exiting from fullscreen doesn't work
                        // notably in Chrome <iframe>. Fixed in version 17
                        setTimeout(function checkFullscreen() {
                                
                            if (t.isNativeFullScreen) {
                                
                                // check if the video is suddenly not really fullscreen
                                if ($(window).width() !== screen.width) {
                                    // manually exit
                                    t.exitFullScreen();
                                } else {
                                    // test again
                                    setTimeout(checkFullscreen, 500);                                                       
                                }
                            }
                            
                            
                        }, 500);
                    }
                    
                } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
                    t.media.webkitEnterFullscreen();
                    return;
                }
            }
            
            // check for iframe launch
            if (t.isInIframe) {
                var url = t.options.newWindowCallback(this);
                
                
                if (url !== '') {
                    
                    // launch immediately
                    if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
                        t.pause();
                        window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');
                        return;
                    } else {
                        setTimeout(function() {
                            if (!t.isNativeFullScreen) {
                                t.pause();
                                window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');                              
                            }
                        }, 250);
                    }
                }   
                
            }
            
            // full window code

            

            // make full size
            t.container
                .addClass('mejs-container-fullscreen')
                .width('100%')
                .height('100%');
                //.css({position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', width: '100%', height: '100%', 'z-index': 1000});              

            // Only needed for safari 5.1 native full screen, can cause display issues elsewhere
            // Actually, it seems to be needed for IE8, too
            //if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                setTimeout(function() {
                    t.container.css({width: '100%', height: '100%'});
                    t.setControlsSize();
                }, 500);
            //}
                
            if (t.pluginType === 'native') {
                t.$media
                    .width('100%')
                    .height('100%');
            } else {
                t.container.find('object, embed, iframe')
                    .width('100%')
                    .height('100%');
                    
                //if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    t.media.setVideoSize($(window).width(),$(window).height());
                //}
            }
            
            t.layers.children('div')
                .width('100%')
                .height('100%');

            if (t.fullscreenBtn) {
                t.fullscreenBtn
                    .removeClass('mejs-fullscreen')
                    .addClass('mejs-unfullscreen');
            }

            t.setControlsSize();
            t.isFullScreen = true;
        },
        
        exitFullScreen: function() {
            
            var t = this;       
        
            // firefox can't adjust plugins
            if (t.media.pluginType !== 'native' && mejs.MediaFeatures.isFirefox) {              
                t.media.setFullscreen(false);
                //player.isFullScreen = false;
                return;
            }       
        
            // come outo of native fullscreen
            if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen)) {
                mejs.MediaFeatures.cancelFullScreen();
            }   

            // restore scroll bars to document
            document.documentElement.style.overflow = docStyleOverflow;                 
                
            t.container
                .removeClass('mejs-container-fullscreen')
                .width(normalWidth)
                .height(normalHeight);
                //.css({position: '', left: '', top: '', right: '', bottom: '', overflow: 'inherit', width: normalWidth + 'px', height: normalHeight + 'px', 'z-index': 1});
            
            if (t.pluginType === 'native') {
                t.$media
                    .width(normalWidth)
                    .height(normalHeight);
            } else {
                t.container.find('object embed')
                    .width(normalWidth)
                    .height(normalHeight);
                    
                t.media.setVideoSize(normalWidth, normalHeight);
            }               

            t.layers.children('div')
                .width(normalWidth)
                .height(normalHeight);

            t.fullscreenBtn
                .removeClass('mejs-unfullscreen')
                .addClass('mejs-fullscreen');

            t.setControlsSize();
            t.isFullScreen = false;
        }   
    });

})(mejs.$);

(function($) {

    // add extra default options 
    $.extend(mejs.MepDefaults, {
        // this will automatically turn on a <track>
        startLanguage: '',
        
        tracksText: 'Captions/Subtitles'
    });

    $.extend(MediaElementPlayer.prototype, {
    
        hasChapters: false,

        buildtracks: function(player, controls, layers, media) {
            if (!player.isVideo)
                return;

            if (player.tracks.length == 0)
                return;

            var t= this, i, options = '';

            player.chapters = 
                    $('<div class="mejs-chapters mejs-layer"></div>')
                        .prependTo(layers).hide();
            player.captions = 
                    $('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>')
                        .prependTo(layers).hide();
            player.captionsText = player.captions.find('.mejs-captions-text');
            player.captionsButton = 
                    $('<div class="mejs-button mejs-captions-button">'+
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '"></button>'+
                        '<div class="mejs-captions-selector">'+
                            '<ul>'+
                                '<li>'+
                                    '<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
                                    '<label for="' + player.id + '_captions_none">None</label>'+
                                '</li>' +
                            '</ul>'+
                        '</div>'+
                    '</div>')
                        .appendTo(controls)
                        
                        // hover
                        .hover(function() {
                            $(this).find('.mejs-captions-selector').css('visibility','visible');
                        }, function() {
                            $(this).find('.mejs-captions-selector').css('visibility','hidden');
                        })                  
                        
                        // handle clicks to the language radio buttons
                        .delegate('input[type=radio]','click',function() {
                            lang = this.value;

                            if (lang == 'none') {
                                player.selectedTrack = null;
                            } else {
                                for (i=0; i<player.tracks.length; i++) {
                                    if (player.tracks[i].srclang == lang) {
                                        player.selectedTrack = player.tracks[i];
                                        player.captions.attr('lang', player.selectedTrack.srclang);
                                        player.displayCaptions();
                                        break;
                                    }
                                }
                            }
                        });
                        //.bind('mouseenter', function() {
                        //  player.captionsButton.find('.mejs-captions-selector').css('visibility','visible')
                        //});

            if (!player.options.alwaysShowControls) {
                // move with controls
                player.container
                    .bind('mouseenter', function () {
                        // push captions above controls
                        player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

                    })
                    .bind('mouseleave', function () {
                        if (!media.paused) {
                            // move back to normal place
                            player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
                        }
                    });
            } else {
                player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');
            }

            player.trackToLoad = -1;
            player.selectedTrack = null;
            player.isLoadingTrack = false;

            

            // add to list
            for (i=0; i<player.tracks.length; i++) {
                if (player.tracks[i].kind == 'subtitles') {
                    player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
                }
            }

            player.loadNextTrack();


            media.addEventListener('timeupdate',function(e) {
                player.displayCaptions();
            }, false);

            media.addEventListener('loadedmetadata', function(e) {
                player.displayChapters();
            }, false);

            player.container.hover(
                function () {
                    // chapters
                    if (player.hasChapters) {
                        player.chapters.css('visibility','visible');
                        player.chapters.fadeIn(200).height(player.chapters.find('.mejs-chapter').outerHeight());
                    }
                },
                function () {
                    if (player.hasChapters && !media.paused) {
                        player.chapters.fadeOut(200, function() {
                            $(this).css('visibility','hidden');
                            $(this).css('display','block');
                        });
                    }
                });
                
            // check for autoplay
            if (player.node.getAttribute('autoplay') !== null) {
                player.chapters.css('visibility','hidden');
            }
        },

        loadNextTrack: function() {
            var t = this;

            t.trackToLoad++;
            if (t.trackToLoad < t.tracks.length) {
                t.isLoadingTrack = true;
                t.loadTrack(t.trackToLoad);
            } else {
                // add done?
                t.isLoadingTrack = false;
            }
        },

        loadTrack: function(index){
            var
                t = this,
                track = t.tracks[index],
                after = function() {

                    track.isLoaded = true;

                    // create button
                    //t.addTrackButton(track.srclang);
                    t.enableTrackButton(track.srclang, track.label);

                    t.loadNextTrack();

                };

            if (track.isTranslation) {

                // translate the first track
                mejs.TrackFormatParser.translateTrackText(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, t.options.googleApiKey, function(newOne) {

                    // store the new translation
                    track.entries = newOne;

                    after();
                });

            } else {
                $.ajax({
                    url: track.src,
                    success: function(d) {

                        // parse the loaded file
                        track.entries = mejs.TrackFormatParser.parse(d);
                        after();

                        if (track.kind == 'chapters' && t.media.duration > 0) {
                            t.drawChapters(track);
                        }
                    },
                    error: function() {
                        t.loadNextTrack();
                    }
                });
            }
        },

        enableTrackButton: function(lang, label) {
            var t = this;
            
            if (label === '') {
                label = mejs.language.codes[lang] || lang;
            }           

            t.captionsButton
                .find('input[value=' + lang + ']')
                    .prop('disabled',false)
                .siblings('label')
                    .html( label );

            // auto select
            if (t.options.startLanguage == lang) {
                $('#' + t.id + '_captions_' + lang).click();
            }

            t.adjustLanguageBox();
        },

        addTrackButton: function(lang, label) {
            var t = this;
            if (label === '') {
                label = mejs.language.codes[lang] || lang;
            }

            t.captionsButton.find('ul').append(
                $('<li>'+
                    '<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
                    '<label for="' + t.id + '_captions_' + lang + '">' + label + ' (loading)' + '</label>'+
                '</li>')
            );

            t.adjustLanguageBox();

            // remove this from the dropdownlist (if it exists)
            t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
        },

        adjustLanguageBox:function() {
            var t = this;
            // adjust the size of the outer box
            t.captionsButton.find('.mejs-captions-selector').height(
                t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
                t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
            );
        },

        displayCaptions: function() {

            if (typeof this.tracks == 'undefined')
                return;

            var
                t = this,
                i,
                track = t.selectedTrack;

            if (track != null && track.isLoaded) {
                for (i=0; i<track.entries.times.length; i++) {
                    if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop){
                        t.captionsText.html(track.entries.text[i]);
                        t.captions.show().height(0);
                        return; // exit out if one is visible;
                    }
                }
                t.captions.hide();
            } else {
                t.captions.hide();
            }
        },

        displayChapters: function() {
            var 
                t = this,
                i;

            for (i=0; i<t.tracks.length; i++) {
                if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
                    t.drawChapters(t.tracks[i]);
                    t.hasChapters = true;
                    break;
                }
            }
        },

        drawChapters: function(chapters) {
            var 
                t = this,
                i,
                dur,
                //width,
                //left,
                percent = 0,
                usedPercent = 0;

            t.chapters.empty();

            for (i=0; i<chapters.entries.times.length; i++) {
                dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
                percent = Math.floor(dur / t.media.duration * 100);
                if (percent + usedPercent > 100 || // too large
                    i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
                    {
                    percent = 100 - usedPercent;
                }
                //width = Math.floor(t.width * dur / t.media.duration);
                //left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
                //if (left + width > t.width) {
                //  width = t.width - left;
                //}

                t.chapters.append( $(
                    '<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' + 
                        '<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' + 
                            '<span class="ch-title">' + chapters.entries.text[i] + '</span>' + 
                            '<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + '</span>' + 
                        '</div>' +
                    '</div>'));
                usedPercent += percent;
            }

            t.chapters.find('div.mejs-chapter').click(function() {
                t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
                if (t.media.paused) {
                    t.media.play(); 
                }
            });

            t.chapters.show();
        }
    });



    mejs.language = {
        codes:  {
            af:'Afrikaans',
            sq:'Albanian',
            ar:'Arabic',
            be:'Belarusian',
            bg:'Bulgarian',
            ca:'Catalan',
            zh:'Chinese',
            'zh-cn':'Chinese Simplified',
            'zh-tw':'Chinese Traditional',
            hr:'Croatian',
            cs:'Czech',
            da:'Danish',
            nl:'Dutch',
            en:'English',
            et:'Estonian',
            tl:'Filipino',
            fi:'Finnish',
            fr:'French',
            gl:'Galician',
            de:'German',
            el:'Greek',
            ht:'Haitian Creole',
            iw:'Hebrew',
            hi:'Hindi',
            hu:'Hungarian',
            is:'Icelandic',
            id:'Indonesian',
            ga:'Irish',
            it:'Italian',
            ja:'Japanese',
            ko:'Korean',
            lv:'Latvian',
            lt:'Lithuanian',
            mk:'Macedonian',
            ms:'Malay',
            mt:'Maltese',
            no:'Norwegian',
            fa:'Persian',
            pl:'Polish',
            pt:'Portuguese',
            //'pt-pt':'Portuguese (Portugal)',
            ro:'Romanian',
            ru:'Russian',
            sr:'Serbian',
            sk:'Slovak',
            sl:'Slovenian',
            es:'Spanish',
            sw:'Swahili',
            sv:'Swedish',
            tl:'Tagalog',
            th:'Thai',
            tr:'Turkish',
            uk:'Ukrainian',
            vi:'Vietnamese',
            cy:'Welsh',
            yi:'Yiddish'
        }
    };

    /*
    Parses WebVVT format which should be formatted as
    ================================
    WEBVTT
    
    1
    00:00:01,1 --> 00:00:05,000
    A line of text

    2
    00:01:15,1 --> 00:02:05,000
    A second line of text
    
    ===============================

    Adapted from: http://www.delphiki.com/html5/playr
    */
    mejs.TrackFormatParser = {
        // match start "chapter-" (or anythingelse)
        pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
        pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

        split2: function (text, regex) {
            // normal version for compliant browsers
            // see below for IE fix
            return text.split(regex);
        },
        parse: function(trackText) {
            var 
                i = 0,
                lines = this.split2(trackText, /\r?\n/),
                entries = {text:[], times:[]},
                timecode,
                text;

            for(; i<lines.length; i++) {
                // check for the line number
                if (this.pattern_identifier.exec(lines[i])){
                    // skip to the next line where the start --> end time code should be
                    i++;
                    timecode = this.pattern_timecode.exec(lines[i]);                
                    
                    if (timecode && i<lines.length){
                        i++;
                        // grab all the (possibly multi-line) text that follows
                        text = lines[i];
                        i++;
                        while(lines[i] !== '' && i<lines.length){
                            text = text + '\n' + lines[i];
                            i++;
                        }

                        // Text is in a different array so I can use .join
                        entries.text.push(text);
                        entries.times.push(
                        {
                            start: mejs.Utility.timeCodeToSeconds(timecode[1]),
                            stop: mejs.Utility.timeCodeToSeconds(timecode[3]),
                            settings: timecode[5]
                        });
                    }
                }
            }

            return entries;
        }
    };
    
    // test for browsers with bad String.split method.
    if ('x\n\ny'.split(/\n/gi).length != 3) {
        // add super slow IE8 and below version
        mejs.TrackFormatParser.split2 = function(text, regex) {
            var 
                parts = [], 
                chunk = '',
                i;

            for (i=0; i<text.length; i++) {
                chunk += text.substring(i,i+1);
                if (regex.test(chunk)) {
                    parts.push(chunk.replace(regex, ''));
                    chunk = '';
                }
            }
            parts.push(chunk);
            return parts;
        }
    }   

})(mejs.$);

/*
* ContextMenu Plugin
* 
*
*/

(function($) {

$.extend(mejs.MepDefaults,
    { 'contextMenuItems': [
        // demo of a fullscreen option
        { 
            render: function(player) {
                
                // check for fullscreen plugin
                if (typeof player.enterFullScreen == 'undefined')
                    return null;
            
                if (player.isFullScreen) {
                    return "Turn off Fullscreen";
                } else {
                    return "Go Fullscreen";
                }
            },
            click: function(player) {
                if (player.isFullScreen) {
                    player.exitFullScreen();
                } else {
                    player.enterFullScreen();
                }
            }
        }
        ,
        // demo of a mute/unmute button
        { 
            render: function(player) {
                if (player.media.muted) {
                    return "Unmute";
                } else {
                    return "Mute";
                }
            },
            click: function(player) {
                if (player.media.muted) {
                    player.setMuted(false);
                } else {
                    player.setMuted(true);
                }
            }
        },
        // separator
        {
            isSeparator: true
        }
        ,
        // demo of simple download video
        { 
            render: function(player) {
                return "Download Video";
            },
            click: function(player) {
                window.location.href = player.media.currentSrc;
            }
        }   
    ]}
);


    $.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(player, controls, layers, media) {
            
            // create context menu
            player.contextMenu = $('<div class="mejs-contextmenu"></div>')
                                .appendTo($('body'))
                                .hide();
            
            // create events for showing context menu
            player.container.bind('contextmenu', function(e) {
                if (player.isContextMenuEnabled) {
                    e.preventDefault();
                    player.renderContextMenu(e.clientX-1, e.clientY-1);
                    return false;
                }
            });
            player.container.bind('click', function() {
                player.contextMenu.hide();
            }); 
            player.contextMenu.bind('mouseleave', function() {

                //console.log('context hover out');
                player.startContextMenuTimer();
                
            });     
        },
        
        isContextMenuEnabled: true,
        enableContextMenu: function() {
            this.isContextMenuEnabled = true;
        },
        disableContextMenu: function() {
            this.isContextMenuEnabled = false;
        },
        
        contextMenuTimeout: null,
        startContextMenuTimer: function() {
            //console.log('startContextMenuTimer');
            
            var t = this;
            
            t.killContextMenuTimer();
            
            t.contextMenuTimer = setTimeout(function() {
                t.hideContextMenu();
                t.killContextMenuTimer();
            }, 750);
        },
        killContextMenuTimer: function() {
            var timer = this.contextMenuTimer;
            
            //console.log('killContextMenuTimer', timer);
            
            if (timer != null) {                
                clearTimeout(timer);
                delete timer;
                timer = null;
            }
        },      
        
        hideContextMenu: function() {
            this.contextMenu.hide();
        },
        
        renderContextMenu: function(x,y) {
            
            // alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly
            var t = this,
                html = '',
                items = t.options.contextMenuItems;
            
            for (var i=0, il=items.length; i<il; i++) {
                
                if (items[i].isSeparator) {
                    html += '<div class="mejs-contextmenu-separator"></div>';
                } else {
                
                    var rendered = items[i].render(t);
                
                    // render can return null if the item doesn't need to be used at the moment
                    if (rendered != null) {
                        html += '<div class="mejs-contextmenu-item" data-itemindex="' + i + '" id="element-' + (Math.random()*1000000) + '">' + rendered + '</div>';
                    }
                }
            }
            
            // position and show the context menu
            t.contextMenu
                .empty()
                .append($(html))
                .css({top:y, left:x})
                .show();
                
            // bind events
            t.contextMenu.find('.mejs-contextmenu-item').each(function() {
                            
                // which one is this?
                var $dom = $(this),
                    itemIndex = parseInt( $dom.data('itemindex'), 10 ),
                    item = t.options.contextMenuItems[itemIndex];
                
                // bind extra functionality?
                if (typeof item.show != 'undefined')
                    item.show( $dom , t);
                
                // bind click action
                $dom.click(function() {         
                    // perform click action
                    if (typeof item.click != 'undefined')
                        item.click(t);
                    
                    // close
                    t.contextMenu.hide();               
                });             
            }); 
            
            // stop the controls from hiding
            setTimeout(function() {
                t.killControlsTimer('rev3');    
            }, 100);
                        
        }
    });
    
})(mejs.$);

/* ----------------------------------
 *
 *  var.js
 *  Used for environment specific global variables
 *  jsEnvironmet is used to switch which set to load.
 *
 *  NOTE: Prod Environment variables are overrides
 *  for vars defined in Dev.
 *
 * ---------------------------------- */

var globalVars = {};

(function(){ // wrapped in anonymous function for memory
    var jsEnvironment = "dev";  // (dev,prod)

    /*** DEV ENVIRONMENT ***/
    var globalVarsDev = {
        "gatewayImages": "/etc/designs/residential/clientlibs/images/",
        "featureImages": "/etc/designs/residential/clientlibs/images/",
        "featureCarouselJSON": "data/feature_carousel.json",
        "featureCarouselTemplates": {
            "one-col": {
                "template": "<div class='sc-header'><div class='sc-innerwrap'><%= data.sc_header %></div></div><div class='sc-wrapper'><div class='sc-col1'><div class='sc-innerwrap'><%= data.sc_col1 %></div></div></div><div class='sc-footer'><div class='sc-innerwrap'><%= data.sc_footer %></div></div>"
            },
            "two-col": {
                "template": "<div class='sc-header'><div class='sc-innerwrap'><%= data.sc_header %></div></div><div class='sc-wrapper'><div class='sc-col1'><div class='sc-innerwrap'><%= data.sc_col1 %></div></div><div class='sc-col2'><div class='sc-innerwrap'><%= data.sc_col2 %></div></div></div><div class='sc-footer'><div class='sc-innerwrap'><%= data.sc_footer %></div></div>"
            },
            "three-col": {
                "template": "<div class='sc-header'><div class='sc-innerwrap'><%= data.sc_header %></div></div><div class='sc-wrapper'><div class='sc-col1'><div class='sc-innerwrap'><%= data.sc_col1 %></div></div><div class='sc-col2'><div class='sc-innerwrap'><%= data.sc_col2 %></div></div><div class='sc-col3'><div class='sc-innerwrap'><%= data.sc_col3 %></div></div></div><div class='sc-footer'><div class='sc-innerwrap'><%= data.sc_footer %></div></div>"
            }
        }
    };

    /*** PROD ENVIRONMENT ***/
    var globalVarsProd = {
        "gatewayImages": "/etc/designs/twcGateway/images/"
    };

    switch(jsEnvironment) {
        case ("dev"):
            globalVars = globalVarsDev;
            break;
        case ("prod"):
            globalVars = $.extend({}, globalVarsDev, globalVarsProd);
            break;
    }
})();
/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9995 (09-AUG-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($) {

var ver = '2.9995';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	$.fn.cycle.debug && log(s);
}		
function log() {
	window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
}


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards)}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			opts.elements && $(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide)
		opts.startingSlide = parseInt(opts.startingSlide,10);
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		opts.randomIndex = 1;
		opts.startingSlide = opts.randomMap[1];
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
	  	$slides.each(function(){
	    	var $slide = $(this);
	    	$slide.css({
	      		"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
	      		"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
	    	});
	  	});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.hover(
			function(){
				pauseFlag = true;
				this.cyclePause++;
				triggerPause(cont, true);
			},
			function(){
				pauseFlag && this.cyclePause--;
				triggerPause(cont, true);
			}
		);

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}
	else if (manual && !p.cyclePause && !opts.bounce && opts.autostop && opts.countdown > 0) {
		/*** 

		JYOAKUM: 	Countdown gets out of sync with manual navigation 
					Added this entire else if.
		***/
		if (Boolean(fwd)){
			--opts.countdown;
		}
		else {
			++opts.countdown;
		}
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length)
				opts.randomIndex = 0;
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	// stage the next transition
	var ms = 0;
	if (opts.timeout && !opts.continuous)
		ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
	else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
		ms = 10;
	if (ms > 0)
		p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards) }, ms);
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	}
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				pauseFlag && cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	activePagerClass: 'activeSlide', // class name used for the active pager link
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	aspect:		   false,  // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	backwards:     false, // true to start slideshow at last slide and move backwards through the stack
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	center: 	   null,  // set to true to have cycle add top/left margin to each slide (use with width and height options)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	containerResize: 1,	  // resize container to fit largest slide
	continuous:	   0,	  // true to start next transition immediately after current one completes
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	easing:		   null,  // easing method for both in and out transitions
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	fit:		   0,	  // force slides to fit container
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height (if the 'fit' option is true, the slides will be set to this height as well)
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	metaAttr:     'cycle',// data- attribute that holds the option data for the slideshow
	next:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	onPrevNextEvent: null,// callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	pager:		   null,  // element, jQuery object, or jQuery selector string for the element to use as pager container
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	prev:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	rev:		   0,	  // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	slideResize:   1,     // force slide width/height to fixed size before every transition
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	timeout:	   4000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	width:         null   // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (!rev === true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (!rev === true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++)
				fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*!
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a,d){function c(h,g){var i=h.nodeName.toLowerCase();if("area"===i){g=h.parentNode;i=g.name;if(!h.href||!i||g.nodeName.toLowerCase()!=="map")return false;h=a("img[usemap=#"+i+"]")[0];return!!h&&e(h)}return(/input|select|textarea|button|object/.test(i)?!h.disabled:"a"==i?h.href||g:g)&&e(h)}function e(h){return!a(h).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(!a.ui.version){a.extend(a.ui,{version:"1.8.16",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(h,g){return typeof h==="number"?this.each(function(){var i=
this;setTimeout(function(){a(i).focus();g&&g.call(i)},h)}):this._focus.apply(this,arguments)},scrollParent:function(){var h;h=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,
"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!h.length?a(document):h},zIndex:function(h){if(h!==d)return this.css("zIndex",h);if(this.length){h=a(this[0]);for(var g;h.length&&h[0]!==document;){g=h.css("position");if(g==="absolute"||g==="relative"||g==="fixed"){g=parseInt(h.css("zIndex"),10);if(!isNaN(g)&&g!==0)return g}h=h.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":
"mousedown")+".ui-disableSelection",function(h){h.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});a.each(["Width","Height"],function(h,g){function i(l,o,n,k){a.each(b,function(){o-=parseFloat(a.curCSS(l,"padding"+this,true))||0;if(n)o-=parseFloat(a.curCSS(l,"border"+this+"Width",true))||0;if(k)o-=parseFloat(a.curCSS(l,"margin"+this,true))||0});return o}var b=g==="Width"?["Left","Right"]:["Top","Bottom"],f=g.toLowerCase(),j={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,
outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+g]=function(l){if(l===d)return j["inner"+g].call(this);return this.each(function(){a(this).css(f,i(this,l)+"px")})};a.fn["outer"+g]=function(l,o){if(typeof l!=="number")return j["outer"+g].call(this,l);return this.each(function(){a(this).css(f,i(this,l,true,o)+"px")})}});a.extend(a.expr[":"],{data:function(h,g,i){return!!a.data(h,i[3])},focusable:function(h){return c(h,!isNaN(a.attr(h,"tabindex")))},tabbable:function(h){var g=a.attr(h,
"tabindex"),i=isNaN(g);return(i||g>=0)&&c(h,!i)}});a(function(){var h=document.body,g=h.appendChild(g=document.createElement("div"));a.extend(g.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});a.support.minHeight=g.offsetHeight===100;a.support.selectstart="onselectstart"in g;h.removeChild(g).style.display="none"});a.extend(a.ui,{plugin:{add:function(h,g,i){h=a.ui[h].prototype;for(var b in i){h.plugins[b]=h.plugins[b]||[];h.plugins[b].push([g,i[b]])}},call:function(h,g,i){if((g=h.plugins[g])&&
h.element[0].parentNode)for(var b=0;b<g.length;b++)h.options[g[b][0]]&&g[b][1].apply(h.element,i)}},contains:function(h,g){return document.compareDocumentPosition?h.compareDocumentPosition(g)&16:h!==g&&h.contains(g)},hasScroll:function(h,g){if(a(h).css("overflow")==="hidden")return false;g=g&&g==="left"?"scrollLeft":"scrollTop";var i=false;if(h[g]>0)return true;h[g]=1;i=h[g]>0;h[g]=0;return i},isOverAxis:function(h,g,i){return h>g&&h<g+i},isOver:function(h,g,i,b,f,j){return a.ui.isOverAxis(h,i,f)&&
a.ui.isOverAxis(g,b,j)}})}})(jQuery);
(function(a,d){if(a.cleanData){var c=a.cleanData;a.cleanData=function(h){for(var g=0,i;(i=h[g])!=null;g++)try{a(i).triggerHandler("remove")}catch(b){}c(h)}}else{var e=a.fn.remove;a.fn.remove=function(h,g){return this.each(function(){if(!g)if(!h||a.filter(h,[this]).length)a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(i){}});return e.call(a(this),h,g)})}}a.widget=function(h,g,i){var b=h.split(".")[0],f;h=h.split(".")[1];f=b+"-"+h;if(!i){i=g;g=a.Widget}a.expr[":"][f]=
function(j){return!!a.data(j,h)};a[b]=a[b]||{};a[b][h]=function(j,l){arguments.length&&this._createWidget(j,l)};g=new g;g.options=a.extend(true,{},g.options);a[b][h].prototype=a.extend(true,g,{namespace:b,widgetName:h,widgetEventPrefix:a[b][h].prototype.widgetEventPrefix||h,widgetBaseClass:f},i);a.widget.bridge(h,a[b][h])};a.widget.bridge=function(h,g){a.fn[h]=function(i){var b=typeof i==="string",f=Array.prototype.slice.call(arguments,1),j=this;i=!b&&f.length?a.extend.apply(null,[true,i].concat(f)):
i;if(b&&i.charAt(0)==="_")return j;b?this.each(function(){var l=a.data(this,h),o=l&&a.isFunction(l[i])?l[i].apply(l,f):l;if(o!==l&&o!==d){j=o;return false}}):this.each(function(){var l=a.data(this,h);l?l.option(i||{})._init():a.data(this,h,new g(i,this))});return j}};a.Widget=function(h,g){arguments.length&&this._createWidget(h,g)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(h,g){a.data(g,this.widgetName,this);this.element=a(g);this.options=
a.extend(true,{},this.options,this._getCreateOptions(),h);var i=this;this.element.bind("remove."+this.widgetName,function(){i.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+
"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(h,g){var i=h;if(arguments.length===0)return a.extend({},this.options);if(typeof h==="string"){if(g===d)return this.options[h];i={};i[h]=g}this._setOptions(i);return this},_setOptions:function(h){var g=this;a.each(h,function(i,b){g._setOption(i,b)});return this},_setOption:function(h,g){this.options[h]=g;if(h==="disabled")this.widget()[g?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",
g);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(h,g,i){var b=this.options[h];g=a.Event(g);g.type=(h===this.widgetEventPrefix?h:this.widgetEventPrefix+h).toLowerCase();i=i||{};if(g.originalEvent){h=a.event.props.length;for(var f;h;){f=a.event.props[--h];g[f]=g.originalEvent[f]}}this.element.trigger(g,i);return!(a.isFunction(b)&&b.call(this.element[0],g,i)===false||g.isDefaultPrevented())}}})(jQuery);
(function(a){var d=false;a(document).mouseup(function(){d=false});a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var c=this;this.element.bind("mousedown."+this.widgetName,function(e){return c._mouseDown(e)}).bind("click."+this.widgetName,function(e){if(true===a.data(e.target,c.widgetName+".preventClickEvent")){a.removeData(e.target,c.widgetName+".preventClickEvent");e.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
this.widgetName)},_mouseDown:function(c){if(!d){this._mouseStarted&&this._mouseUp(c);this._mouseDownEvent=c;var e=this,h=c.which==1,g=typeof this.options.cancel=="string"&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:false;if(!h||g||!this._mouseCapture(c))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c)){this._mouseStarted=
this._mouseStart(c)!==false;if(!this._mouseStarted){c.preventDefault();return true}}true===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(i){return e._mouseMove(i)};this._mouseUpDelegate=function(i){return e._mouseUp(i)};a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.preventDefault();return d=true}},_mouseMove:function(c){if(a.browser.msie&&
!(document.documentMode>=9)&&!c.button)return this._mouseUp(c);if(this._mouseStarted){this._mouseDrag(c);return c.preventDefault()}if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,c)!==false)?this._mouseDrag(c):this._mouseUp(c);return!this._mouseStarted},_mouseUp:function(c){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
false;c.target==this._mouseDownEvent.target&&a.data(c.target,this.widgetName+".preventClickEvent",true);this._mouseStop(c)}return false},_mouseDistanceMet:function(c){return Math.max(Math.abs(this._mouseDownEvent.pageX-c.pageX),Math.abs(this._mouseDownEvent.pageY-c.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(a){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(d){var c=
this.options;if(this.helper||c.disabled||a(d.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(d);if(!this.handle)return false;if(c.iframeFix)a(c.iframeFix===true?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(a(this).offset()).appendTo("body")});return true},_mouseStart:function(d){var c=this.options;
this.helper=this._createHelper(d);this._cacheHelperProportions();if(a.ui.ddmanager)a.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:d.pageX-this.offset.left,top:d.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(d);this.originalPageX=d.pageX;this.originalPageY=d.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);c.containment&&this._setContainment();if(this._trigger("start",d)===false){this._clear();return false}this._cacheHelperProportions();a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,d);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(d,true);a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,d);return true},
_mouseDrag:function(d,c){this.position=this._generatePosition(d);this.positionAbs=this._convertPositionTo("absolute");if(!c){c=this._uiHash();if(this._trigger("drag",d,c)===false){this._mouseUp({});return false}this.position=c.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,d);return false},_mouseStop:function(d){var c=
false;if(a.ui.ddmanager&&!this.options.dropBehaviour)c=a.ui.ddmanager.drop(this,d);if(this.dropped){c=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===true||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var e=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,
10),function(){e._trigger("stop",d)!==false&&e._clear()})}else this._trigger("stop",d)!==false&&this._clear();return false},_mouseUp:function(d){this.options.iframeFix===true&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,d);return a.ui.mouse.prototype._mouseUp.call(this,d)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(d){var c=!this.options.handle||
!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==d.target)c=true});return c},_createHelper:function(d){var c=this.options;d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo);d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&
d.css("position","absolute");return d},_adjustOffsetFromHelper:function(d){if(typeof d=="string")d=d.split(" ");if(a.isArray(d))d={left:+d[0],top:+d[1]||0};if("left"in d)this.offset.click.left=d.left+this.margins.left;if("right"in d)this.offset.click.left=this.helperProportions.width-d.right+this.margins.left;if("top"in d)this.offset.click.top=d.top+this.margins.top;if("bottom"in d)this.offset.click.top=this.helperProportions.height-d.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=
this.helper.offsetParent();var d=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){d.left+=this.scrollParent.scrollLeft();d.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)d={top:0,left:0};return{top:d.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:d.left+(parseInt(this.offsetParent.css("borderLeftWidth"),
10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var d=this.element.position();return{top:d.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:d.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),
10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var d=this.options;if(d.containment=="parent")d.containment=this.helper[0].parentNode;if(d.containment=="document"||d.containment=="window")this.containment=[d.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,d.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,
(d.containment=="document"?0:a(window).scrollLeft())+a(d.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d.containment=="document"?0:a(window).scrollTop())+(a(d.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(d.containment)&&d.containment.constructor!=Array){d=a(d.containment);var c=d[0];if(c){d.offset();var e=a(c).css("overflow")!=
"hidden";this.containment=[(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0),(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0),(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),
10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=d}}else if(d.containment.constructor==Array)this.containment=d.containment},_convertPositionTo:function(d,c){if(!c)c=this.position;d=d=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);return{top:c.top+
this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())*d)}},_generatePosition:function(d){var c=this.options,e=this.cssPosition=="absolute"&&
!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName),g=d.pageX,i=d.pageY;if(this.originalPosition){var b;if(this.containment){if(this.relative_container){b=this.relative_container.offset();b=[this.containment[0]+b.left,this.containment[1]+b.top,this.containment[2]+b.left,this.containment[3]+b.top]}else b=this.containment;if(d.pageX-this.offset.click.left<b[0])g=b[0]+this.offset.click.left;
if(d.pageY-this.offset.click.top<b[1])i=b[1]+this.offset.click.top;if(d.pageX-this.offset.click.left>b[2])g=b[2]+this.offset.click.left;if(d.pageY-this.offset.click.top>b[3])i=b[3]+this.offset.click.top}if(c.grid){i=c.grid[1]?this.originalPageY+Math.round((i-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;i=b?!(i-this.offset.click.top<b[1]||i-this.offset.click.top>b[3])?i:!(i-this.offset.click.top<b[1])?i-c.grid[1]:i+c.grid[1]:i;g=c.grid[0]?this.originalPageX+Math.round((g-this.originalPageX)/
c.grid[0])*c.grid[0]:this.originalPageX;g=b?!(g-this.offset.click.left<b[0]||g-this.offset.click.left>b[2])?g:!(g-this.offset.click.left<b[0])?g-c.grid[0]:g+c.grid[0]:g}}return{top:i-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<
526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(d,c,e){e=e||this._uiHash();a.ui.plugin.call(this,d,[c,e]);if(d=="drag")this.positionAbs=this._convertPositionTo("absolute");return a.Widget.prototype._trigger.call(this,d,c,
e)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});a.extend(a.ui.draggable,{version:"1.8.16"});a.ui.plugin.add("draggable","connectToSortable",{start:function(d,c){var e=a(this).data("draggable"),h=e.options,g=a.extend({},c,{item:e.element});e.sortables=[];a(h.connectToSortable).each(function(){var i=a.data(this,"sortable");if(i&&!i.options.disabled){e.sortables.push({instance:i,shouldRevert:i.options.revert});
i.refreshPositions();i._trigger("activate",d,g)}})},stop:function(d,c){var e=a(this).data("draggable"),h=a.extend({},c,{item:e.element});a.each(e.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;e.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(d);this.instance.options.helper=this.instance.options._helper;e.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=
false;this.instance._trigger("deactivate",d,h)}})},drag:function(d,c){var e=a(this).data("draggable"),h=this;a.each(e.sortables,function(){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(h).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return c.helper[0]};d.target=this.instance.currentItem[0];this.instance._mouseCapture(d,true);this.instance._mouseStart(d,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;
e._trigger("toSortable",d);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}this.instance.currentItem&&this.instance._mouseDrag(d)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",d,this.instance._uiHash(this.instance));this.instance._mouseStop(d,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&
this.instance.placeholder.remove();e._trigger("fromSortable",d);e.dropped=false}})}});a.ui.plugin.add("draggable","cursor",{start:function(){var d=a("body"),c=a(this).data("draggable").options;if(d.css("cursor"))c._cursor=d.css("cursor");d.css("cursor",c.cursor)},stop:function(){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}});a.ui.plugin.add("draggable","opacity",{start:function(d,c){d=a(c.helper);c=a(this).data("draggable").options;if(d.css("opacity"))c._opacity=
d.css("opacity");d.css("opacity",c.opacity)},stop:function(d,c){d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}});a.ui.plugin.add("draggable","scroll",{start:function(){var d=a(this).data("draggable");if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML")d.overflowOffset=d.scrollParent.offset()},drag:function(d){var c=a(this).data("draggable"),e=c.options,h=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!=
"x")if(c.overflowOffset.top+c.scrollParent[0].offsetHeight-d.pageY<e.scrollSensitivity)c.scrollParent[0].scrollTop=h=c.scrollParent[0].scrollTop+e.scrollSpeed;else if(d.pageY-c.overflowOffset.top<e.scrollSensitivity)c.scrollParent[0].scrollTop=h=c.scrollParent[0].scrollTop-e.scrollSpeed;if(!e.axis||e.axis!="y")if(c.overflowOffset.left+c.scrollParent[0].offsetWidth-d.pageX<e.scrollSensitivity)c.scrollParent[0].scrollLeft=h=c.scrollParent[0].scrollLeft+e.scrollSpeed;else if(d.pageX-c.overflowOffset.left<
e.scrollSensitivity)c.scrollParent[0].scrollLeft=h=c.scrollParent[0].scrollLeft-e.scrollSpeed}else{if(!e.axis||e.axis!="x")if(d.pageY-a(document).scrollTop()<e.scrollSensitivity)h=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed);else if(a(window).height()-(d.pageY-a(document).scrollTop())<e.scrollSensitivity)h=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed);if(!e.axis||e.axis!="y")if(d.pageX-a(document).scrollLeft()<e.scrollSensitivity)h=a(document).scrollLeft(a(document).scrollLeft()-
e.scrollSpeed);else if(a(window).width()-(d.pageX-a(document).scrollLeft())<e.scrollSensitivity)h=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed)}h!==false&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(c,d)}});a.ui.plugin.add("draggable","snap",{start:function(){var d=a(this).data("draggable"),c=d.options;d.snapElements=[];a(c.snap.constructor!=String?c.snap.items||":data(draggable)":c.snap).each(function(){var e=a(this),h=e.offset();this!=d.element[0]&&d.snapElements.push({item:this,
width:e.outerWidth(),height:e.outerHeight(),top:h.top,left:h.left})})},drag:function(d,c){for(var e=a(this).data("draggable"),h=e.options,g=h.snapTolerance,i=c.offset.left,b=i+e.helperProportions.width,f=c.offset.top,j=f+e.helperProportions.height,l=e.snapElements.length-1;l>=0;l--){var o=e.snapElements[l].left,n=o+e.snapElements[l].width,k=e.snapElements[l].top,m=k+e.snapElements[l].height;if(o-g<i&&i<n+g&&k-g<f&&f<m+g||o-g<i&&i<n+g&&k-g<j&&j<m+g||o-g<b&&b<n+g&&k-g<f&&f<m+g||o-g<b&&b<n+g&&k-g<j&&
j<m+g){if(h.snapMode!="inner"){var p=Math.abs(k-j)<=g,q=Math.abs(m-f)<=g,s=Math.abs(o-b)<=g,r=Math.abs(n-i)<=g;if(p)c.position.top=e._convertPositionTo("relative",{top:k-e.helperProportions.height,left:0}).top-e.margins.top;if(q)c.position.top=e._convertPositionTo("relative",{top:m,left:0}).top-e.margins.top;if(s)c.position.left=e._convertPositionTo("relative",{top:0,left:o-e.helperProportions.width}).left-e.margins.left;if(r)c.position.left=e._convertPositionTo("relative",{top:0,left:n}).left-e.margins.left}var u=
p||q||s||r;if(h.snapMode!="outer"){p=Math.abs(k-f)<=g;q=Math.abs(m-j)<=g;s=Math.abs(o-i)<=g;r=Math.abs(n-b)<=g;if(p)c.position.top=e._convertPositionTo("relative",{top:k,left:0}).top-e.margins.top;if(q)c.position.top=e._convertPositionTo("relative",{top:m-e.helperProportions.height,left:0}).top-e.margins.top;if(s)c.position.left=e._convertPositionTo("relative",{top:0,left:o}).left-e.margins.left;if(r)c.position.left=e._convertPositionTo("relative",{top:0,left:n-e.helperProportions.width}).left-e.margins.left}if(!e.snapElements[l].snapping&&
(p||q||s||r||u))e.options.snap.snap&&e.options.snap.snap.call(e.element,d,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item}));e.snapElements[l].snapping=p||q||s||r||u}else{e.snapElements[l].snapping&&e.options.snap.release&&e.options.snap.release.call(e.element,d,a.extend(e._uiHash(),{snapItem:e.snapElements[l].item}));e.snapElements[l].snapping=false}}}});a.ui.plugin.add("draggable","stack",{start:function(){var d=a(this).data("draggable").options;d=a.makeArray(a(d.stack)).sort(function(e,h){return(parseInt(a(e).css("zIndex"),
10)||0)-(parseInt(a(h).css("zIndex"),10)||0)});if(d.length){var c=parseInt(d[0].style.zIndex)||0;a(d).each(function(e){this.style.zIndex=c+e});this[0].style.zIndex=c+d.length}}});a.ui.plugin.add("draggable","zIndex",{start:function(d,c){d=a(c.helper);c=a(this).data("draggable").options;if(d.css("zIndex"))c._zIndex=d.css("zIndex");d.css("zIndex",c.zIndex)},stop:function(d,c){d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);
(function(a){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var d=this.options,c=d.accept;this.isover=0;this.isout=1;this.accept=a.isFunction(c)?c:function(e){return e.is(c)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[d.scope]=a.ui.ddmanager.droppables[d.scope]||[];a.ui.ddmanager.droppables[d.scope].push(this);
d.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var d=a.ui.ddmanager.droppables[this.options.scope],c=0;c<d.length;c++)d[c]==this&&d.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(d,c){if(d=="accept")this.accept=a.isFunction(c)?c:function(e){return e.is(c)};a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(d){var c=a.ui.ddmanager.current;this.options.activeClass&&
this.element.addClass(this.options.activeClass);c&&this._trigger("activate",d,this.ui(c))},_deactivate:function(d){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);c&&this._trigger("deactivate",d,this.ui(c))},_over:function(d){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",d,this.ui(c))}},_out:function(d){var c=a.ui.ddmanager.current;if(!(!c||(c.currentItem||c.element)[0]==this.element[0]))if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",d,this.ui(c))}},_drop:function(d,c){var e=c||a.ui.ddmanager.current;if(!e||(e.currentItem||e.element)[0]==this.element[0])return false;var h=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=
a.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==e.options.scope&&g.accept.call(g.element[0],e.currentItem||e.element)&&a.ui.intersect(e,a.extend(g,{offset:g.element.offset()}),g.options.tolerance)){h=true;return false}});if(h)return false;if(this.accept.call(this.element[0],e.currentItem||e.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",
d,this.ui(e));return this.element}return false},ui:function(d){return{draggable:d.currentItem||d.element,helper:d.helper,position:d.position,offset:d.positionAbs}}});a.extend(a.ui.droppable,{version:"1.8.16"});a.ui.intersect=function(d,c,e){if(!c.offset)return false;var h=(d.positionAbs||d.position.absolute).left,g=h+d.helperProportions.width,i=(d.positionAbs||d.position.absolute).top,b=i+d.helperProportions.height,f=c.offset.left,j=f+c.proportions.width,l=c.offset.top,o=l+c.proportions.height;
switch(e){case "fit":return f<=h&&g<=j&&l<=i&&b<=o;case "intersect":return f<h+d.helperProportions.width/2&&g-d.helperProportions.width/2<j&&l<i+d.helperProportions.height/2&&b-d.helperProportions.height/2<o;case "pointer":return a.ui.isOver((d.positionAbs||d.position.absolute).top+(d.clickOffset||d.offset.click).top,(d.positionAbs||d.position.absolute).left+(d.clickOffset||d.offset.click).left,l,f,c.proportions.height,c.proportions.width);case "touch":return(i>=l&&i<=o||b>=l&&b<=o||i<l&&b>o)&&(h>=
f&&h<=j||g>=f&&g<=j||h<f&&g>j);default:return false}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(d,c){var e=a.ui.ddmanager.droppables[d.options.scope]||[],h=c?c.type:null,g=(d.currentItem||d.element).find(":data(droppable)").andSelf(),i=0;a:for(;i<e.length;i++)if(!(e[i].options.disabled||d&&!e[i].accept.call(e[i].element[0],d.currentItem||d.element))){for(var b=0;b<g.length;b++)if(g[b]==e[i].element[0]){e[i].proportions.height=0;continue a}e[i].visible=e[i].element.css("display")!=
"none";if(e[i].visible){h=="mousedown"&&e[i]._activate.call(e[i],c);e[i].offset=e[i].element.offset();e[i].proportions={width:e[i].element[0].offsetWidth,height:e[i].element[0].offsetHeight}}}},drop:function(d,c){var e=false;a.each(a.ui.ddmanager.droppables[d.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&a.ui.intersect(d,this,this.options.tolerance))e=e||this._drop.call(this,c);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],d.currentItem||
d.element)){this.isout=1;this.isover=0;this._deactivate.call(this,c)}}});return e},dragStart:function(d,c){d.element.parents(":not(body,html)").bind("scroll.droppable",function(){d.options.refreshPositions||a.ui.ddmanager.prepareOffsets(d,c)})},drag:function(d,c){d.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(d,c);a.each(a.ui.ddmanager.droppables[d.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var e=a.ui.intersect(d,this,this.options.tolerance);
if(e=!e&&this.isover==1?"isout":e&&this.isover==0?"isover":null){var h;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){h=a.data(g[0],"droppable");h.greedyChild=e=="isover"?1:0}}if(h&&e=="isover"){h.isover=0;h.isout=1;h._out.call(h,c)}this[e]=1;this[e=="isout"?"isover":"isout"]=0;this[e=="isover"?"_over":"_out"].call(this,c);if(h&&e=="isout"){h.isout=0;h.isover=1;h._over.call(h,c)}}}})},dragStop:function(d,c){d.element.parents(":not(body,html)").unbind("scroll.droppable");
d.options.refreshPositions||a.ui.ddmanager.prepareOffsets(d,c)}}})(jQuery);
(function(a){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var e=this,h=this.options;this.element.addClass("ui-resizable");a.extend(this,{_aspectRatio:!!h.aspectRatio,aspectRatio:h.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:h.helper||h.ghost||h.animate?h.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=h.handles||(!a(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var g=this.handles.split(",");this.handles={};for(var i=0;i<g.length;i++){var b=a.trim(g[i]),f=a('<div class="ui-resizable-handle '+("ui-resizable-"+b)+'"></div>');/sw|se|ne|nw/.test(b)&&f.css({zIndex:++h.zIndex});"se"==b&&f.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[b]=".ui-resizable-"+b;this.element.append(f)}}this._renderAxis=function(j){j=j||this.element;for(var l in this.handles){if(this.handles[l].constructor==
String)this.handles[l]=a(this.handles[l],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var o=a(this.handles[l],this.element),n=0;n=/sw|ne|nw|se|n|s/.test(l)?o.outerHeight():o.outerWidth();o=["padding",/ne|nw|n/.test(l)?"Top":/se|sw|s/.test(l)?"Bottom":/^e$/.test(l)?"Right":"Left"].join("");j.css(o,n);this._proportionallyResize()}a(this.handles[l])}};this._renderAxis(this.element);this._handles=a(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!e.resizing){if(this.className)var j=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);e.axis=j&&j[1]?j[1]:"se"}});if(h.autoHide){this._handles.hide();a(this.element).addClass("ui-resizable-autohide").hover(function(){if(!h.disabled){a(this).removeClass("ui-resizable-autohide");e._handles.show()}},function(){if(!h.disabled)if(!e.resizing){a(this).addClass("ui-resizable-autohide");e._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();
var e=function(g){a(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){e(this.element);var h=this.element;h.after(this.originalElement.css({position:h.css("position"),width:h.outerWidth(),height:h.outerHeight(),top:h.css("top"),left:h.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);e(this.originalElement);return this},_mouseCapture:function(e){var h=
false;for(var g in this.handles)if(a(this.handles[g])[0]==e.target)h=true;return!this.options.disabled&&h},_mouseStart:function(e){var h=this.options,g=this.element.position(),i=this.element;this.resizing=true;this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()};if(i.is(".ui-draggable")||/absolute/.test(i.css("position")))i.css({position:"absolute",top:g.top,left:g.left});a.browser.opera&&/relative/.test(i.css("position"))&&i.css({position:"relative",top:"auto",left:"auto"});
this._renderProxy();g=d(this.helper.css("left"));var b=d(this.helper.css("top"));if(h.containment){g+=a(h.containment).scrollLeft()||0;b+=a(h.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:g,top:b};this.size=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};this.originalSize=this._helper?{width:i.outerWidth(),height:i.outerHeight()}:{width:i.width(),height:i.height()};this.originalPosition={left:g,top:b};this.sizeDiff=
{width:i.outerWidth()-i.width(),height:i.outerHeight()-i.height()};this.originalMousePosition={left:e.pageX,top:e.pageY};this.aspectRatio=typeof h.aspectRatio=="number"?h.aspectRatio:this.originalSize.width/this.originalSize.height||1;h=a(".ui-resizable-"+this.axis).css("cursor");a("body").css("cursor",h=="auto"?this.axis+"-resize":h);i.addClass("ui-resizable-resizing");this._propagate("start",e);return true},_mouseDrag:function(e){var h=this.helper,g=this.originalMousePosition,i=this._change[this.axis];
if(!i)return false;g=i.apply(this,[e,e.pageX-g.left||0,e.pageY-g.top||0]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)g=this._updateRatio(g,e);g=this._respectSize(g,e);this._propagate("resize",e);h.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(g);this._trigger("resize",e,this.ui());return false},
_mouseStop:function(e){this.resizing=false;var h=this.options,g=this;if(this._helper){var i=this._proportionallyResizeElements,b=i.length&&/textarea/i.test(i[0].nodeName);i=b&&a.ui.hasScroll(i[0],"left")?0:g.sizeDiff.height;b=b?0:g.sizeDiff.width;b={width:g.helper.width()-b,height:g.helper.height()-i};i=parseInt(g.element.css("left"),10)+(g.position.left-g.originalPosition.left)||null;var f=parseInt(g.element.css("top"),10)+(g.position.top-g.originalPosition.top)||null;h.animate||this.element.css(a.extend(b,
{top:f,left:i}));g.helper.height(g.size.height);g.helper.width(g.size.width);this._helper&&!h.animate&&this._proportionallyResize()}a("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",e);this._helper&&this.helper.remove();return false},_updateVirtualBoundaries:function(e){var h=this.options,g,i,b;h={minWidth:c(h.minWidth)?h.minWidth:0,maxWidth:c(h.maxWidth)?h.maxWidth:Infinity,minHeight:c(h.minHeight)?h.minHeight:0,maxHeight:c(h.maxHeight)?h.maxHeight:
Infinity};if(this._aspectRatio||e){e=h.minHeight*this.aspectRatio;i=h.minWidth/this.aspectRatio;g=h.maxHeight*this.aspectRatio;b=h.maxWidth/this.aspectRatio;if(e>h.minWidth)h.minWidth=e;if(i>h.minHeight)h.minHeight=i;if(g<h.maxWidth)h.maxWidth=g;if(b<h.maxHeight)h.maxHeight=b}this._vBoundaries=h},_updateCache:function(e){this.offset=this.helper.offset();if(c(e.left))this.position.left=e.left;if(c(e.top))this.position.top=e.top;if(c(e.height))this.size.height=e.height;if(c(e.width))this.size.width=
e.width},_updateRatio:function(e){var h=this.position,g=this.size,i=this.axis;if(c(e.height))e.width=e.height*this.aspectRatio;else if(c(e.width))e.height=e.width/this.aspectRatio;if(i=="sw"){e.left=h.left+(g.width-e.width);e.top=null}if(i=="nw"){e.top=h.top+(g.height-e.height);e.left=h.left+(g.width-e.width)}return e},_respectSize:function(e){var h=this._vBoundaries,g=this.axis,i=c(e.width)&&h.maxWidth&&h.maxWidth<e.width,b=c(e.height)&&h.maxHeight&&h.maxHeight<e.height,f=c(e.width)&&h.minWidth&&
h.minWidth>e.width,j=c(e.height)&&h.minHeight&&h.minHeight>e.height;if(f)e.width=h.minWidth;if(j)e.height=h.minHeight;if(i)e.width=h.maxWidth;if(b)e.height=h.maxHeight;var l=this.originalPosition.left+this.originalSize.width,o=this.position.top+this.size.height,n=/sw|nw|w/.test(g);g=/nw|ne|n/.test(g);if(f&&n)e.left=l-h.minWidth;if(i&&n)e.left=l-h.maxWidth;if(j&&g)e.top=o-h.minHeight;if(b&&g)e.top=o-h.maxHeight;if((h=!e.width&&!e.height)&&!e.left&&e.top)e.top=null;else if(h&&!e.top&&e.left)e.left=
null;return e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e=this.helper||this.element,h=0;h<this._proportionallyResizeElements.length;h++){var g=this._proportionallyResizeElements[h];if(!this.borderDif){var i=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],b=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=a.map(i,function(f,j){f=parseInt(f,10)||
0;j=parseInt(b[j],10)||0;return f+j})}a.browser.msie&&(a(e).is(":hidden")||a(e).parents(":hidden").length)||g.css({height:e.height()-this.borderDif[0]-this.borderDif[2]||0,width:e.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var e=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var h=a.browser.msie&&a.browser.version<7,g=h?1:0;h=h?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+
h,height:this.element.outerHeight()+h,position:"absolute",left:this.elementOffset.left-g+"px",top:this.elementOffset.top-g+"px",zIndex:++e.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,h){return{width:this.originalSize.width+h}},w:function(e,h){return{left:this.originalPosition.left+h,width:this.originalSize.width-h}},n:function(e,h,g){return{top:this.originalPosition.top+g,height:this.originalSize.height-g}},s:function(e,h,g){return{height:this.originalSize.height+
g}},se:function(e,h,g){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,h,g]))},sw:function(e,h,g){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,h,g]))},ne:function(e,h,g){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,h,g]))},nw:function(e,h,g){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,h,g]))}},_propagate:function(e,h){a.ui.plugin.call(this,e,[h,this.ui()]);
e!="resize"&&this._trigger(e,h,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});a.extend(a.ui.resizable,{version:"1.8.16"});a.ui.plugin.add("resizable","alsoResize",{start:function(){var e=a(this).data("resizable").options,h=function(g){a(g).each(function(){var i=a(this);i.data("resizable-alsoresize",{width:parseInt(i.width(),
10),height:parseInt(i.height(),10),left:parseInt(i.css("left"),10),top:parseInt(i.css("top"),10),position:i.css("position")})})};if(typeof e.alsoResize=="object"&&!e.alsoResize.parentNode)if(e.alsoResize.length){e.alsoResize=e.alsoResize[0];h(e.alsoResize)}else a.each(e.alsoResize,function(g){h(g)});else h(e.alsoResize)},resize:function(e,h){var g=a(this).data("resizable");e=g.options;var i=g.originalSize,b=g.originalPosition,f={height:g.size.height-i.height||0,width:g.size.width-i.width||0,top:g.position.top-
b.top||0,left:g.position.left-b.left||0},j=function(l,o){a(l).each(function(){var n=a(this),k=a(this).data("resizable-alsoresize"),m={},p=o&&o.length?o:n.parents(h.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(p,function(q,s){if((q=(k[s]||0)+(f[s]||0))&&q>=0)m[s]=q||null});if(a.browser.opera&&/relative/.test(n.css("position"))){g._revertToRelativePosition=true;n.css({position:"absolute",top:"auto",left:"auto"})}n.css(m)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?
a.each(e.alsoResize,function(l,o){j(l,o)}):j(e.alsoResize)},stop:function(){var e=a(this).data("resizable"),h=e.options,g=function(i){a(i).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};if(e._revertToRelativePosition){e._revertToRelativePosition=false;typeof h.alsoResize=="object"&&!h.alsoResize.nodeType?a.each(h.alsoResize,function(i){g(i)}):g(h.alsoResize)}a(this).removeData("resizable-alsoresize")}});a.ui.plugin.add("resizable","animate",{stop:function(e){var h=
a(this).data("resizable"),g=h.options,i=h._proportionallyResizeElements,b=i.length&&/textarea/i.test(i[0].nodeName),f=b&&a.ui.hasScroll(i[0],"left")?0:h.sizeDiff.height;b={width:h.size.width-(b?0:h.sizeDiff.width),height:h.size.height-f};f=parseInt(h.element.css("left"),10)+(h.position.left-h.originalPosition.left)||null;var j=parseInt(h.element.css("top"),10)+(h.position.top-h.originalPosition.top)||null;h.element.animate(a.extend(b,j&&f?{top:j,left:f}:{}),{duration:g.animateDuration,easing:g.animateEasing,
step:function(){var l={width:parseInt(h.element.css("width"),10),height:parseInt(h.element.css("height"),10),top:parseInt(h.element.css("top"),10),left:parseInt(h.element.css("left"),10)};i&&i.length&&a(i[0]).css({width:l.width,height:l.height});h._updateCache(l);h._propagate("resize",e)}})}});a.ui.plugin.add("resizable","containment",{start:function(){var e=a(this).data("resizable"),h=e.element,g=e.options.containment;if(h=g instanceof a?g.get(0):/parent/.test(g)?h.parent().get(0):g){e.containerElement=
a(h);if(/document/.test(g)||g==document){e.containerOffset={left:0,top:0};e.containerPosition={left:0,top:0};e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}}else{var i=a(h),b=[];a(["Top","Right","Left","Bottom"]).each(function(l,o){b[l]=d(i.css("padding"+o))});e.containerOffset=i.offset();e.containerPosition=i.position();e.containerSize={height:i.innerHeight()-b[3],width:i.innerWidth()-b[1]};g=e.containerOffset;
var f=e.containerSize.height,j=e.containerSize.width;j=a.ui.hasScroll(h,"left")?h.scrollWidth:j;f=a.ui.hasScroll(h)?h.scrollHeight:f;e.parentData={element:h,left:g.left,top:g.top,width:j,height:f}}}},resize:function(e){var h=a(this).data("resizable"),g=h.options,i=h.containerOffset,b=h.position;e=h._aspectRatio||e.shiftKey;var f={top:0,left:0},j=h.containerElement;if(j[0]!=document&&/static/.test(j.css("position")))f=i;if(b.left<(h._helper?i.left:0)){h.size.width+=h._helper?h.position.left-i.left:
h.position.left-f.left;if(e)h.size.height=h.size.width/g.aspectRatio;h.position.left=g.helper?i.left:0}if(b.top<(h._helper?i.top:0)){h.size.height+=h._helper?h.position.top-i.top:h.position.top;if(e)h.size.width=h.size.height*g.aspectRatio;h.position.top=h._helper?i.top:0}h.offset.left=h.parentData.left+h.position.left;h.offset.top=h.parentData.top+h.position.top;g=Math.abs((h._helper?h.offset.left-f.left:h.offset.left-f.left)+h.sizeDiff.width);i=Math.abs((h._helper?h.offset.top-f.top:h.offset.top-
i.top)+h.sizeDiff.height);b=h.containerElement.get(0)==h.element.parent().get(0);f=/relative|absolute/.test(h.containerElement.css("position"));if(b&&f)g-=h.parentData.left;if(g+h.size.width>=h.parentData.width){h.size.width=h.parentData.width-g;if(e)h.size.height=h.size.width/h.aspectRatio}if(i+h.size.height>=h.parentData.height){h.size.height=h.parentData.height-i;if(e)h.size.width=h.size.height*h.aspectRatio}},stop:function(){var e=a(this).data("resizable"),h=e.options,g=e.containerOffset,i=e.containerPosition,
b=e.containerElement,f=a(e.helper),j=f.offset(),l=f.outerWidth()-e.sizeDiff.width;f=f.outerHeight()-e.sizeDiff.height;e._helper&&!h.animate&&/relative/.test(b.css("position"))&&a(this).css({left:j.left-i.left-g.left,width:l,height:f});e._helper&&!h.animate&&/static/.test(b.css("position"))&&a(this).css({left:j.left-i.left-g.left,width:l,height:f})}});a.ui.plugin.add("resizable","ghost",{start:function(){var e=a(this).data("resizable"),h=e.options,g=e.size;e.ghost=e.originalElement.clone();e.ghost.css({opacity:0.25,
display:"block",position:"relative",height:g.height,width:g.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");e.ghost.appendTo(e.helper)},resize:function(){var e=a(this).data("resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=a(this).data("resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}});a.ui.plugin.add("resizable","grid",{resize:function(){var e=
a(this).data("resizable"),h=e.options,g=e.size,i=e.originalSize,b=e.originalPosition,f=e.axis;h.grid=typeof h.grid=="number"?[h.grid,h.grid]:h.grid;var j=Math.round((g.width-i.width)/(h.grid[0]||1))*(h.grid[0]||1);h=Math.round((g.height-i.height)/(h.grid[1]||1))*(h.grid[1]||1);if(/^(se|s|e)$/.test(f)){e.size.width=i.width+j;e.size.height=i.height+h}else if(/^(ne)$/.test(f)){e.size.width=i.width+j;e.size.height=i.height+h;e.position.top=b.top-h}else{if(/^(sw)$/.test(f)){e.size.width=i.width+j;e.size.height=
i.height+h}else{e.size.width=i.width+j;e.size.height=i.height+h;e.position.top=b.top-h}e.position.left=b.left-j}}});var d=function(e){return parseInt(e,10)||0},c=function(e){return!isNaN(parseInt(e,10))}})(jQuery);
(function(a){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var d=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(d.options.filter,d.element[0]);c.each(function(){var e=a(this),h=e.offset();a.data(this,"selectable-item",{element:this,$element:e,left:h.left,top:h.top,right:h.left+e.outerWidth(),bottom:h.top+e.outerHeight(),startselected:false,selected:e.hasClass("ui-selected"),
selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(d){var c=this;this.opos=[d.pageX,
d.pageY];if(!this.options.disabled){var e=this.options;this.selectees=a(e.filter,this.element[0]);this._trigger("start",d);a(e.appendTo).append(this.helper);this.helper.css({left:d.clientX,top:d.clientY,width:0,height:0});e.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var h=a.data(this,"selectable-item");h.startselected=true;if(!d.metaKey){h.$element.removeClass("ui-selected");h.selected=false;h.$element.addClass("ui-unselecting");h.unselecting=true;c._trigger("unselecting",
d,{unselecting:h.element})}});a(d.target).parents().andSelf().each(function(){var h=a.data(this,"selectable-item");if(h){var g=!d.metaKey||!h.$element.hasClass("ui-selected");h.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");h.unselecting=!g;h.selecting=g;(h.selected=g)?c._trigger("selecting",d,{selecting:h.element}):c._trigger("unselecting",d,{unselecting:h.element});return false}})}},_mouseDrag:function(d){var c=this;this.dragged=true;if(!this.options.disabled){var e=
this.options,h=this.opos[0],g=this.opos[1],i=d.pageX,b=d.pageY;if(h>i){var f=i;i=h;h=f}if(g>b){f=b;b=g;g=f}this.helper.css({left:h,top:g,width:i-h,height:b-g});this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!(!j||j.element==c.element[0])){var l=false;if(e.tolerance=="touch")l=!(j.left>i||j.right<h||j.top>b||j.bottom<g);else if(e.tolerance=="fit")l=j.left>h&&j.right<i&&j.top>g&&j.bottom<b;if(l){if(j.selected){j.$element.removeClass("ui-selected");j.selected=false}if(j.unselecting){j.$element.removeClass("ui-unselecting");
j.unselecting=false}if(!j.selecting){j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",d,{selecting:j.element})}}else{if(j.selecting)if(d.metaKey&&j.startselected){j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true}else{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected){j.$element.addClass("ui-unselecting");j.unselecting=true}c._trigger("unselecting",d,{unselecting:j.element})}if(j.selected)if(!d.metaKey&&
!j.startselected){j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",d,{unselecting:j.element})}}}});return false}},_mouseStop:function(d){var c=this;this.dragged=false;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;c._trigger("unselected",d,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=
a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;c._trigger("selected",d,{selected:e.element})});this._trigger("stop",d);this.helper.remove();return false}});a.extend(a.ui.selectable,{version:"1.8.16"})})(jQuery);
(function(a){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var d=this.options;this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?d.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var d=this.items.length-1;d>=0;d--)this.items[d].item.removeData("sortable-item");return this},_setOption:function(d,c){if(d===
"disabled"){this.options[d]=c;this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")}else a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(d,c){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(d);var e=null,h=this;a(d.target).parents().each(function(){if(a.data(this,"sortable-item")==h){e=a(this);return false}});if(a.data(d.target,"sortable-item")==h)e=a(d.target);if(!e)return false;if(this.options.handle&&
!c){var g=false;a(this.options.handle,e).find("*").andSelf().each(function(){if(this==d.target)g=true});if(!g)return false}this.currentItem=e;this._removeCurrentsFromItems();return true},_mouseStart:function(d,c,e){c=this.options;var h=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(d);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,
left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:d.pageX-this.offset.left,top:d.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(d);this.originalPageX=d.pageX;this.originalPageY=d.pageY;c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();c.containment&&this._setContainment();if(c.cursor){if(a("body").css("cursor"))this._storedCursor=a("body").css("cursor");a("body").css("cursor",c.cursor)}if(c.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",c.opacity)}if(c.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",c.zIndex)}if(this.scrollParent[0]!=
document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",d,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!e)for(e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("activate",d,h._uiHash(this));if(a.ui.ddmanager)a.ui.ddmanager.current=this;a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,d);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(d);
return true},_mouseDrag:function(d){this.position=this._generatePosition(d);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var c=this.options,e=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-d.pageY<c.scrollSensitivity)this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop+c.scrollSpeed;else if(d.pageY-this.overflowOffset.top<
c.scrollSensitivity)this.scrollParent[0].scrollTop=e=this.scrollParent[0].scrollTop-c.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-d.pageX<c.scrollSensitivity)this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft+c.scrollSpeed;else if(d.pageX-this.overflowOffset.left<c.scrollSensitivity)this.scrollParent[0].scrollLeft=e=this.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(d.pageY-a(document).scrollTop()<c.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()-
c.scrollSpeed);else if(a(window).height()-(d.pageY-a(document).scrollTop())<c.scrollSensitivity)e=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed);if(d.pageX-a(document).scrollLeft()<c.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed);else if(a(window).width()-(d.pageX-a(document).scrollLeft())<c.scrollSensitivity)e=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed)}e!==false&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,
d)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(c=this.items.length-1;c>=0;c--){e=this.items[c];var h=e.item[0],g=this._intersectsWithPointer(e);if(g)if(h!=this.currentItem[0]&&this.placeholder[g==1?"next":"prev"]()[0]!=h&&!a.ui.contains(this.placeholder[0],h)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],
h):true)){this.direction=g==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e))this._rearrange(d,e);else break;this._trigger("change",d,this._uiHash());break}}this._contactContainers(d);a.ui.ddmanager&&a.ui.ddmanager.drag(this,d);this._trigger("sort",d,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(d,c){if(d){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,d);if(this.options.revert){var e=this;c=e.placeholder.offset();
e.reverting=true;a(this.helper).animate({left:c.left-this.offset.parent.left-e.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:c.top-this.offset.parent.top-e.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){e._clear(d)})}else this._clear(d,c);return false}},cancel:function(){var d=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):
this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,d._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,d._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();a.extend(this,{helper:null,
dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(d){var c=this._getItemsAsjQuery(d&&d.connected),e=[];d=d||{};a(c).each(function(){var h=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||/(.+)[-=_](.+)/);if(h)e.push((d.key||h[1]+"[]")+"="+(d.key&&d.expression?h[1]:h[2]))});!e.length&&d.key&&e.push(d.key+"=");return e.join("&")},
toArray:function(d){var c=this._getItemsAsjQuery(d&&d.connected),e=[];d=d||{};c.each(function(){e.push(a(d.item||this).attr(d.attribute||"id")||"")});return e},_intersectsWith:function(d){var c=this.positionAbs.left,e=c+this.helperProportions.width,h=this.positionAbs.top,g=h+this.helperProportions.height,i=d.left,b=i+d.width,f=d.top,j=f+d.height,l=this.offset.click.top,o=this.offset.click.left;l=h+l>f&&h+l<j&&c+o>i&&c+o<b;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||
this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>d[this.floating?"width":"height"]?l:i<c+this.helperProportions.width/2&&e-this.helperProportions.width/2<b&&f<h+this.helperProportions.height/2&&g-this.helperProportions.height/2<j},_intersectsWithPointer:function(d){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height);d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width);c=c&&d;d=this._getDragVerticalDirection();
var e=this._getDragHorizontalDirection();if(!c)return false;return this.floating?e&&e=="right"||d=="down"?2:1:d&&(d=="down"?2:1)},_intersectsWithSides:function(d){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top+d.height/2,d.height);d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left+d.width/2,d.width);var e=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();return this.floating&&h?h=="right"&&d||h=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},
_getDragVerticalDirection:function(){var d=this.positionAbs.top-this.lastPositionAbs.top;return d!=0&&(d>0?"down":"up")},_getDragHorizontalDirection:function(){var d=this.positionAbs.left-this.lastPositionAbs.left;return d!=0&&(d>0?"right":"left")},refresh:function(d){this._refreshItems(d);this.refreshPositions();return this},_connectWith:function(){var d=this.options;return d.connectWith.constructor==String?[d.connectWith]:d.connectWith},_getItemsAsjQuery:function(d){var c=[],e=[],h=this._connectWith();
if(h&&d)for(d=h.length-1;d>=0;d--)for(var g=a(h[d]),i=g.length-1;i>=0;i--){var b=a.data(g[i],"sortable");if(b&&b!=this&&!b.options.disabled)e.push([a.isFunction(b.options.items)?b.options.items.call(b.element):a(b.options.items,b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),b])}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
this]);for(d=e.length-1;d>=0;d--)e[d][0].each(function(){c.push(this)});return a(c)},_removeCurrentsFromItems:function(){for(var d=this.currentItem.find(":data(sortable-item)"),c=0;c<this.items.length;c++)for(var e=0;e<d.length;e++)d[e]==this.items[c].item[0]&&this.items.splice(c,1)},_refreshItems:function(d){this.items=[];this.containers=[this];var c=this.items,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],d,{item:this.currentItem}):a(this.options.items,this.element),
this]],h=this._connectWith();if(h)for(var g=h.length-1;g>=0;g--)for(var i=a(h[g]),b=i.length-1;b>=0;b--){var f=a.data(i[b],"sortable");if(f&&f!=this&&!f.options.disabled){e.push([a.isFunction(f.options.items)?f.options.items.call(f.element[0],d,{item:this.currentItem}):a(f.options.items,f.element),f]);this.containers.push(f)}}for(g=e.length-1;g>=0;g--){d=e[g][1];h=e[g][0];b=0;for(i=h.length;b<i;b++){f=a(h[b]);f.data("sortable-item",d);c.push({item:f,instance:d,width:0,height:0,left:0,top:0})}}},refreshPositions:function(d){if(this.offsetParent&&
this.helper)this.offset.parent=this._getParentOffset();for(var c=this.items.length-1;c>=0;c--){var e=this.items[c];if(!(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0])){var h=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!d){e.width=h.outerWidth();e.height=h.outerHeight()}h=h.offset();e.left=h.left;e.top=h.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(c=
this.containers.length-1;c>=0;c--){h=this.containers[c].element.offset();this.containers[c].containerCache.left=h.left;this.containers[c].containerCache.top=h.top;this.containers[c].containerCache.width=this.containers[c].element.outerWidth();this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(d){var c=d||this,e=c.options;if(!e.placeholder||e.placeholder.constructor==String){var h=e.placeholder;e.placeholder={element:function(){var g=
a(document.createElement(c.currentItem[0].nodeName)).addClass(h||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!h)g.style.visibility="hidden";return g},update:function(g,i){if(!(h&&!e.forcePlaceholderSize)){i.height()||i.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10));i.width()||i.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||
0,10))}}}}c.placeholder=a(e.placeholder.element.call(c.element,c.currentItem));c.currentItem.after(c.placeholder);e.placeholder.update(c,c.placeholder)},_contactContainers:function(d){for(var c=null,e=null,h=this.containers.length-1;h>=0;h--)if(!a.ui.contains(this.currentItem[0],this.containers[h].element[0]))if(this._intersectsWith(this.containers[h].containerCache)){if(!(c&&a.ui.contains(this.containers[h].element[0],c.element[0]))){c=this.containers[h];e=h}}else if(this.containers[h].containerCache.over){this.containers[h]._trigger("out",
d,this._uiHash(this));this.containers[h].containerCache.over=0}if(c)if(this.containers.length===1){this.containers[e]._trigger("over",d,this._uiHash(this));this.containers[e].containerCache.over=1}else if(this.currentContainer!=this.containers[e]){c=1E4;h=null;for(var g=this.positionAbs[this.containers[e].floating?"left":"top"],i=this.items.length-1;i>=0;i--)if(a.ui.contains(this.containers[e].element[0],this.items[i].item[0])){var b=this.items[i][this.containers[e].floating?"left":"top"];if(Math.abs(b-
g)<c){c=Math.abs(b-g);h=this.items[i]}}if(h||this.options.dropOnEmpty){this.currentContainer=this.containers[e];h?this._rearrange(d,h,null,true):this._rearrange(d,null,this.containers[e].element,true);this._trigger("change",d,this._uiHash());this.containers[e]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[e]._trigger("over",d,this._uiHash(this));this.containers[e].containerCache.over=1}}},_createHelper:function(d){var c=
this.options;d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[d,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]);if(d[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(d[0].style.width==
""||c.forceHelperSize)d.width(this.currentItem.width());if(d[0].style.height==""||c.forceHelperSize)d.height(this.currentItem.height());return d},_adjustOffsetFromHelper:function(d){if(typeof d=="string")d=d.split(" ");if(a.isArray(d))d={left:+d[0],top:+d[1]||0};if("left"in d)this.offset.click.left=d.left+this.margins.left;if("right"in d)this.offset.click.left=this.helperProportions.width-d.right+this.margins.left;if("top"in d)this.offset.click.top=d.top+this.margins.top;if("bottom"in d)this.offset.click.top=
this.helperProportions.height-d.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var d=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){d.left+=this.scrollParent.scrollLeft();d.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)d=
{top:0,left:0};return{top:d.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:d.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var d=this.currentItem.position();return{top:d.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:d.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),
10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var d=this.options;if(d.containment=="parent")d.containment=this.helper[0].parentNode;if(d.containment=="document"||d.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(d.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(a(d.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(d.containment)){var c=a(d.containment)[0];d=a(d.containment).offset();var e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),
10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(d,c){if(!c)c=
this.position;d=d=="absolute"?1:-1;var e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&
this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())*d)}},_generatePosition:function(d){var c=this.options,e=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=/(html|body)/i.test(e[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();
var g=d.pageX,i=d.pageY;if(this.originalPosition){if(this.containment){if(d.pageX-this.offset.click.left<this.containment[0])g=this.containment[0]+this.offset.click.left;if(d.pageY-this.offset.click.top<this.containment[1])i=this.containment[1]+this.offset.click.top;if(d.pageX-this.offset.click.left>this.containment[2])g=this.containment[2]+this.offset.click.left;if(d.pageY-this.offset.click.top>this.containment[3])i=this.containment[3]+this.offset.click.top}if(c.grid){i=this.originalPageY+Math.round((i-
this.originalPageY)/c.grid[1])*c.grid[1];i=this.containment?!(i-this.offset.click.top<this.containment[1]||i-this.offset.click.top>this.containment[3])?i:!(i-this.offset.click.top<this.containment[1])?i-c.grid[1]:i+c.grid[1]:i;g=this.originalPageX+Math.round((g-this.originalPageX)/c.grid[0])*c.grid[0];g=this.containment?!(g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2])?g:!(g-this.offset.click.left<this.containment[0])?g-c.grid[0]:g+c.grid[0]:g}}return{top:i-
this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():h?0:e.scrollTop()),left:g-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:e.scrollLeft())}},_rearrange:function(d,c,e,h){e?e[0].appendChild(this.placeholder[0]):c.item[0].parentNode.insertBefore(this.placeholder[0],
this.direction=="down"?c.item[0]:c.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var g=this,i=this.counter;window.setTimeout(function(){i==g.counter&&g.refreshPositions(!h)},0)},_clear:function(d,c){this.reverting=false;var e=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var h in this._storedCSS)if(this._storedCSS[h]=="auto"||this._storedCSS[h]=="static")this._storedCSS[h]=
"";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&e.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c)e.push(function(g){this._trigger("update",g,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||e.push(function(g){this._trigger("remove",
g,this._uiHash())});for(h=this.containers.length-1;h>=0;h--)if(a.ui.contains(this.containers[h].element[0],this.currentItem[0])&&!c){e.push(function(g){return function(i){g._trigger("receive",i,this._uiHash(this))}}.call(this,this.containers[h]));e.push(function(g){return function(i){g._trigger("update",i,this._uiHash(this))}}.call(this,this.containers[h]))}}for(h=this.containers.length-1;h>=0;h--){c||e.push(function(g){return function(i){g._trigger("deactivate",i,this._uiHash(this))}}.call(this,
this.containers[h]));if(this.containers[h].containerCache.over){e.push(function(g){return function(i){g._trigger("out",i,this._uiHash(this))}}.call(this,this.containers[h]));this.containers[h].containerCache.over=0}}this._storedCursor&&a("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",
d,this._uiHash());for(h=0;h<e.length;h++)e[h].call(this,d);this._trigger("stop",d,this._uiHash())}return false}c||this._trigger("beforeStop",d,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!c){for(h=0;h<e.length;h++)e[h].call(this,d);this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},
_uiHash:function(d){var c=d||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:d?d.element:null}}});a.extend(a.ui.sortable,{version:"1.8.16"})})(jQuery);
jQuery.effects||function(a,d){function c(n){var k;if(n&&n.constructor==Array&&n.length==3)return n;if(k=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n))return[parseInt(k[1],10),parseInt(k[2],10),parseInt(k[3],10)];if(k=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n))return[parseFloat(k[1])*2.55,parseFloat(k[2])*2.55,parseFloat(k[3])*2.55];if(k=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n))return[parseInt(k[1],
16),parseInt(k[2],16),parseInt(k[3],16)];if(k=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n))return[parseInt(k[1]+k[1],16),parseInt(k[2]+k[2],16),parseInt(k[3]+k[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(n))return j.transparent;return j[a.trim(n).toLowerCase()]}function e(n,k){var m;do{m=a.curCSS(n,k);if(m!=""&&m!="transparent"||a.nodeName(n,"body"))break;k="backgroundColor"}while(n=n.parentNode);return c(m)}function h(){var n=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
k={},m,p;if(n&&n.length&&n[0]&&n[n[0]])for(var q=n.length;q--;){m=n[q];if(typeof n[m]=="string"){p=m.replace(/\-(\w)/g,function(s,r){return r.toUpperCase()});k[p]=n[m]}}else for(m in n)if(typeof n[m]==="string")k[m]=n[m];return k}function g(n){var k,m;for(k in n){m=n[k];if(m==null||a.isFunction(m)||k in o||/scrollbar/.test(k)||!/color/i.test(k)&&isNaN(parseFloat(m)))delete n[k]}return n}function i(n,k){var m={_:0},p;for(p in k)if(n[p]!=k[p])m[p]=k[p];return m}function b(n,k,m,p){if(typeof n=="object"){p=
k;m=null;k=n;n=k.effect}if(a.isFunction(k)){p=k;m=null;k={}}if(typeof k=="number"||a.fx.speeds[k]){p=m;m=k;k={}}if(a.isFunction(m)){p=m;m=null}k=k||{};m=m||k.duration;m=a.fx.off?0:typeof m=="number"?m:m in a.fx.speeds?a.fx.speeds[m]:a.fx.speeds._default;p=p||k.complete;return[n,k,m,p]}function f(n){if(!n||typeof n==="number"||a.fx.speeds[n])return true;if(typeof n==="string"&&!a.effects[n])return true;return false}a.effects={};a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(n,k){a.fx.step[k]=function(m){if(!m.colorInit){m.start=e(m.elem,k);m.end=c(m.end);m.colorInit=true}m.elem.style[k]="rgb("+Math.max(Math.min(parseInt(m.pos*(m.end[0]-m.start[0])+m.start[0],10),255),0)+","+Math.max(Math.min(parseInt(m.pos*(m.end[1]-m.start[1])+m.start[1],10),255),0)+","+Math.max(Math.min(parseInt(m.pos*(m.end[2]-m.start[2])+m.start[2],10),255),0)+")"}});var j={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},l=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(n,k,m,
p){if(a.isFunction(m)){p=m;m=null}return this.queue(function(){var q=a(this),s=q.attr("style")||" ",r=g(h.call(this)),u,v=q.attr("class");a.each(l,function(w,x){n[x]&&q[x+"Class"](n[x])});u=g(h.call(this));q.attr("class",v);q.animate(i(r,u),{queue:false,duration:k,easing:m,complete:function(){a.each(l,function(w,x){n[x]&&q[x+"Class"](n[x])});if(typeof q.attr("style")=="object"){q.attr("style").cssText="";q.attr("style").cssText=s}else q.attr("style",s);p&&p.apply(this,arguments);a.dequeue(this)}})})};
a.fn.extend({_addClass:a.fn.addClass,addClass:function(n,k,m,p){return k?a.effects.animateClass.apply(this,[{add:n},k,m,p]):this._addClass(n)},_removeClass:a.fn.removeClass,removeClass:function(n,k,m,p){return k?a.effects.animateClass.apply(this,[{remove:n},k,m,p]):this._removeClass(n)},_toggleClass:a.fn.toggleClass,toggleClass:function(n,k,m,p,q){return typeof k=="boolean"||k===d?m?a.effects.animateClass.apply(this,[k?{add:n}:{remove:n},m,p,q]):this._toggleClass(n,k):a.effects.animateClass.apply(this,
[{toggle:n},k,m,p])},switchClass:function(n,k,m,p,q){return a.effects.animateClass.apply(this,[{add:k,remove:n},m,p,q])}});a.extend(a.effects,{version:"1.8.16",save:function(n,k){for(var m=0;m<k.length;m++)k[m]!==null&&n.data("ec.storage."+k[m],n[0].style[k[m]])},restore:function(n,k){for(var m=0;m<k.length;m++)k[m]!==null&&n.css(k[m],n.data("ec.storage."+k[m]))},setMode:function(n,k){if(k=="toggle")k=n.is(":hidden")?"show":"hide";return k},getBaseline:function(n,k){var m;switch(n[0]){case "top":m=
0;break;case "middle":m=0.5;break;case "bottom":m=1;break;default:m=n[0]/k.height}switch(n[1]){case "left":n=0;break;case "center":n=0.5;break;case "right":n=1;break;default:n=n[1]/k.width}return{x:n,y:m}},createWrapper:function(n){if(n.parent().is(".ui-effects-wrapper"))return n.parent();var k={width:n.outerWidth(true),height:n.outerHeight(true),"float":n.css("float")},m=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),
p=document.activeElement;n.wrap(m);if(n[0]===p||a.contains(n[0],p))a(p).focus();m=n.parent();if(n.css("position")=="static"){m.css({position:"relative"});n.css({position:"relative"})}else{a.extend(k,{position:n.css("position"),zIndex:n.css("z-index")});a.each(["top","left","bottom","right"],function(q,s){k[s]=n.css(s);if(isNaN(parseInt(k[s],10)))k[s]="auto"});n.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return m.css(k).show()},removeWrapper:function(n){var k,m=document.activeElement;
if(n.parent().is(".ui-effects-wrapper")){k=n.parent().replaceWith(n);if(n[0]===m||a.contains(n[0],m))a(m).focus();return k}return n},setTransition:function(n,k,m,p){p=p||{};a.each(k,function(q,s){unit=n.cssUnit(s);if(unit[0]>0)p[s]=unit[0]*m+unit[1]});return p}});a.fn.extend({effect:function(n){var k=b.apply(this,arguments),m={options:k[1],duration:k[2],callback:k[3]};k=m.options.mode;var p=a.effects[n];if(a.fx.off||!p)return k?this[k](m.duration,m.callback):this.each(function(){m.callback&&m.callback.call(this)});
return p.call(this,m)},_show:a.fn.show,show:function(n){if(f(n))return this._show.apply(this,arguments);else{var k=b.apply(this,arguments);k[1].mode="show";return this.effect.apply(this,k)}},_hide:a.fn.hide,hide:function(n){if(f(n))return this._hide.apply(this,arguments);else{var k=b.apply(this,arguments);k[1].mode="hide";return this.effect.apply(this,k)}},__toggle:a.fn.toggle,toggle:function(n){if(f(n)||typeof n==="boolean"||a.isFunction(n))return this.__toggle.apply(this,arguments);else{var k=b.apply(this,
arguments);k[1].mode="toggle";return this.effect.apply(this,k)}},cssUnit:function(n){var k=this.css(n),m=[];a.each(["em","px","%","pt"],function(p,q){if(k.indexOf(q)>0)m=[parseFloat(k),q]});return m}});a.easing.jswing=a.easing.swing;a.extend(a.easing,{def:"easeOutQuad",swing:function(n,k,m,p,q){return a.easing[a.easing.def](n,k,m,p,q)},easeInQuad:function(n,k,m,p,q){return p*(k/=q)*k+m},easeOutQuad:function(n,k,m,p,q){return-p*(k/=q)*(k-2)+m},easeInOutQuad:function(n,k,m,p,q){if((k/=q/2)<1)return p/
2*k*k+m;return-p/2*(--k*(k-2)-1)+m},easeInCubic:function(n,k,m,p,q){return p*(k/=q)*k*k+m},easeOutCubic:function(n,k,m,p,q){return p*((k=k/q-1)*k*k+1)+m},easeInOutCubic:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k+m;return p/2*((k-=2)*k*k+2)+m},easeInQuart:function(n,k,m,p,q){return p*(k/=q)*k*k*k+m},easeOutQuart:function(n,k,m,p,q){return-p*((k=k/q-1)*k*k*k-1)+m},easeInOutQuart:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k*k+m;return-p/2*((k-=2)*k*k*k-2)+m},easeInQuint:function(n,k,m,
p,q){return p*(k/=q)*k*k*k*k+m},easeOutQuint:function(n,k,m,p,q){return p*((k=k/q-1)*k*k*k*k+1)+m},easeInOutQuint:function(n,k,m,p,q){if((k/=q/2)<1)return p/2*k*k*k*k*k+m;return p/2*((k-=2)*k*k*k*k+2)+m},easeInSine:function(n,k,m,p,q){return-p*Math.cos(k/q*(Math.PI/2))+p+m},easeOutSine:function(n,k,m,p,q){return p*Math.sin(k/q*(Math.PI/2))+m},easeInOutSine:function(n,k,m,p,q){return-p/2*(Math.cos(Math.PI*k/q)-1)+m},easeInExpo:function(n,k,m,p,q){return k==0?m:p*Math.pow(2,10*(k/q-1))+m},easeOutExpo:function(n,
k,m,p,q){return k==q?m+p:p*(-Math.pow(2,-10*k/q)+1)+m},easeInOutExpo:function(n,k,m,p,q){if(k==0)return m;if(k==q)return m+p;if((k/=q/2)<1)return p/2*Math.pow(2,10*(k-1))+m;return p/2*(-Math.pow(2,-10*--k)+2)+m},easeInCirc:function(n,k,m,p,q){return-p*(Math.sqrt(1-(k/=q)*k)-1)+m},easeOutCirc:function(n,k,m,p,q){return p*Math.sqrt(1-(k=k/q-1)*k)+m},easeInOutCirc:function(n,k,m,p,q){if((k/=q/2)<1)return-p/2*(Math.sqrt(1-k*k)-1)+m;return p/2*(Math.sqrt(1-(k-=2)*k)+1)+m},easeInElastic:function(n,k,m,
p,q){n=1.70158;var s=0,r=p;if(k==0)return m;if((k/=q)==1)return m+p;s||(s=q*0.3);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);return-(r*Math.pow(2,10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s))+m},easeOutElastic:function(n,k,m,p,q){n=1.70158;var s=0,r=p;if(k==0)return m;if((k/=q)==1)return m+p;s||(s=q*0.3);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);return r*Math.pow(2,-10*k)*Math.sin((k*q-n)*2*Math.PI/s)+p+m},easeInOutElastic:function(n,k,m,p,q){n=1.70158;var s=
0,r=p;if(k==0)return m;if((k/=q/2)==2)return m+p;s||(s=q*0.3*1.5);if(r<Math.abs(p)){r=p;n=s/4}else n=s/(2*Math.PI)*Math.asin(p/r);if(k<1)return-0.5*r*Math.pow(2,10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s)+m;return r*Math.pow(2,-10*(k-=1))*Math.sin((k*q-n)*2*Math.PI/s)*0.5+p+m},easeInBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;return p*(k/=q)*k*((s+1)*k-s)+m},easeOutBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;return p*((k=k/q-1)*k*((s+1)*k+s)+1)+m},easeInOutBack:function(n,k,m,p,q,s){if(s==d)s=1.70158;
if((k/=q/2)<1)return p/2*k*k*(((s*=1.525)+1)*k-s)+m;return p/2*((k-=2)*k*(((s*=1.525)+1)*k+s)+2)+m},easeInBounce:function(n,k,m,p,q){return p-a.easing.easeOutBounce(n,q-k,0,p,q)+m},easeOutBounce:function(n,k,m,p,q){return(k/=q)<1/2.75?p*7.5625*k*k+m:k<2/2.75?p*(7.5625*(k-=1.5/2.75)*k+0.75)+m:k<2.5/2.75?p*(7.5625*(k-=2.25/2.75)*k+0.9375)+m:p*(7.5625*(k-=2.625/2.75)*k+0.984375)+m},easeInOutBounce:function(n,k,m,p,q){if(k<q/2)return a.easing.easeInBounce(n,k*2,0,p,q)*0.5+m;return a.easing.easeOutBounce(n,
k*2-q,0,p,q)*0.5+p*0.5+m}})}(jQuery);
(function(a){a.effects.blind=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"vertical";a.effects.save(c,e);c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),b=g=="vertical"?"height":"width";g=g=="vertical"?i.height():i.width();h=="show"&&i.css(b,0);var f={};f[b]=h=="show"?g:0;i.animate(f,d.duration,d.options.easing,function(){h=="hide"&&c.hide();a.effects.restore(c,
e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);
(function(a){a.effects.bounce=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"effect"),g=d.options.direction||"up",i=d.options.distance||20,b=d.options.times||5,f=d.duration||250;/show|hide/.test(h)&&e.push("opacity");a.effects.save(c,e);c.show();a.effects.createWrapper(c);var j=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";i=d.options.distance||(j=="top"?c.outerHeight({margin:true})/3:c.outerWidth({margin:true})/
3);if(h=="show")c.css("opacity",0).css(j,g=="pos"?-i:i);if(h=="hide")i/=b*2;h!="hide"&&b--;if(h=="show"){var l={opacity:1};l[j]=(g=="pos"?"+=":"-=")+i;c.animate(l,f/2,d.options.easing);i/=2;b--}for(l=0;l<b;l++){var o={},n={};o[j]=(g=="pos"?"-=":"+=")+i;n[j]=(g=="pos"?"+=":"-=")+i;c.animate(o,f/2,d.options.easing).animate(n,f/2,d.options.easing);i=h=="hide"?i*2:i/2}if(h=="hide"){l={opacity:0};l[j]=(g=="pos"?"-=":"+=")+i;c.animate(l,f/2,d.options.easing,function(){c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);
d.callback&&d.callback.apply(this,arguments)})}else{o={};n={};o[j]=(g=="pos"?"-=":"+=")+i;n[j]=(g=="pos"?"+=":"-=")+i;c.animate(o,f/2,d.options.easing).animate(n,f/2,d.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);
(function(a){a.effects.clip=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","height","width"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"vertical";a.effects.save(c,e);c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"});i=c[0].tagName=="IMG"?i:c;var b={size:g=="vertical"?"height":"width",position:g=="vertical"?"top":"left"};g=g=="vertical"?i.height():i.width();if(h=="show"){i.css(b.size,0);i.css(b.position,
g/2)}var f={};f[b.size]=h=="show"?g:0;f[b.position]=h=="show"?0:g/2;i.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.drop=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","opacity"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c);var i=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var b=d.options.distance||(i=="top"?c.outerHeight({margin:true})/2:c.outerWidth({margin:true})/2);if(h=="show")c.css("opacity",0).css(i,g=="pos"?-b:b);var f={opacity:h==
"show"?1:0};f[i]=(h=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+b;c.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.explode=function(d){return this.queue(function(){var c=d.options.pieces?Math.round(Math.sqrt(d.options.pieces)):3,e=d.options.pieces?Math.round(Math.sqrt(d.options.pieces)):3;d.options.mode=d.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":d.options.mode;var h=a(this).show().css("visibility","hidden"),g=h.offset();g.top-=parseInt(h.css("marginTop"),10)||0;g.left-=parseInt(h.css("marginLeft"),10)||0;for(var i=h.outerWidth(true),b=h.outerHeight(true),f=0;f<c;f++)for(var j=
0;j<e;j++)h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(i/e),top:-f*(b/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:i/e,height:b/c,left:g.left+j*(i/e)+(d.options.mode=="show"?(j-Math.floor(e/2))*(i/e):0),top:g.top+f*(b/c)+(d.options.mode=="show"?(f-Math.floor(c/2))*(b/c):0),opacity:d.options.mode=="show"?0:1}).animate({left:g.left+j*(i/e)+(d.options.mode=="show"?0:(j-Math.floor(e/2))*(i/e)),top:g.top+
f*(b/c)+(d.options.mode=="show"?0:(f-Math.floor(c/2))*(b/c)),opacity:d.options.mode=="show"?1:0},d.duration||500);setTimeout(function(){d.options.mode=="show"?h.css({visibility:"visible"}):h.css({visibility:"visible"}).hide();d.callback&&d.callback.apply(h[0]);h.dequeue();a("div.ui-effects-explode").remove()},d.duration||500)})}})(jQuery);
(function(a){a.effects.fade=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"hide");c.animate({opacity:e},{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.fold=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"hide"),g=d.options.size||15,i=!!d.options.horizFirst,b=d.duration?d.duration/2:a.fx.speeds._default/2;a.effects.save(c,e);c.show();var f=a.effects.createWrapper(c).css({overflow:"hidden"}),j=h=="show"!=i,l=j?["width","height"]:["height","width"];j=j?[f.width(),f.height()]:[f.height(),f.width()];var o=/([0-9]+)%/.exec(g);if(o)g=parseInt(o[1],
10)/100*j[h=="hide"?0:1];if(h=="show")f.css(i?{height:0,width:g}:{height:g,width:0});i={};o={};i[l[0]]=h=="show"?j[0]:g;o[l[1]]=h=="show"?j[1]:0;f.animate(i,b,d.options.easing).animate(o,b,d.options.easing,function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(c[0],arguments);c.dequeue()})})}})(jQuery);
(function(a){a.effects.highlight=function(d){return this.queue(function(){var c=a(this),e=["backgroundImage","backgroundColor","opacity"],h=a.effects.setMode(c,d.options.mode||"show"),g={backgroundColor:c.css("backgroundColor")};if(h=="hide")g.opacity=0;a.effects.save(c,e);c.show().css({backgroundImage:"none",backgroundColor:d.options.color||"#ffff99"}).animate(g,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);h=="show"&&!a.support.opacity&&
this.style.removeAttribute("filter");d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.pulsate=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"show");times=(d.options.times||5)*2-1;duration=d.duration?d.duration/2:a.fx.speeds._default/2;isVisible=c.is(":visible");animateTo=0;if(!isVisible){c.css("opacity",0).show();animateTo=1}if(e=="hide"&&isVisible||e=="show"&&!isVisible)times--;for(e=0;e<times;e++){c.animate({opacity:animateTo},duration,d.options.easing);animateTo=(animateTo+1)%2}c.animate({opacity:animateTo},duration,
d.options.easing,function(){animateTo==0&&c.hide();d.callback&&d.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);
(function(a){a.effects.puff=function(d){return this.queue(function(){var c=a(this),e=a.effects.setMode(c,d.options.mode||"hide"),h=parseInt(d.options.percent,10)||150,g=h/100,i={height:c.height(),width:c.width()};a.extend(d.options,{fade:true,mode:e,percent:e=="hide"?h:100,from:e=="hide"?i:{height:i.height*g,width:i.width*g}});c.effect("scale",d.options,d.duration,d.callback);c.dequeue()})};a.effects.scale=function(d){return this.queue(function(){var c=a(this),e=a.extend(true,{},d.options),h=a.effects.setMode(c,
d.options.mode||"effect"),g=parseInt(d.options.percent,10)||(parseInt(d.options.percent,10)==0?0:h=="hide"?0:100),i=d.options.direction||"both",b=d.options.origin;if(h!="effect"){e.origin=b||["middle","center"];e.restore=true}b={height:c.height(),width:c.width()};c.from=d.options.from||(h=="show"?{height:0,width:0}:b);g={y:i!="horizontal"?g/100:1,x:i!="vertical"?g/100:1};c.to={height:b.height*g.y,width:b.width*g.x};if(d.options.fade){if(h=="show"){c.from.opacity=0;c.to.opacity=1}if(h=="hide"){c.from.opacity=
1;c.to.opacity=0}}e.from=c.from;e.to=c.to;e.mode=h;c.effect("size",e,d.duration,d.callback);c.dequeue()})};a.effects.size=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],g=["width","height","overflow"],i=["fontSize"],b=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],
j=a.effects.setMode(c,d.options.mode||"effect"),l=d.options.restore||false,o=d.options.scale||"both",n=d.options.origin,k={height:c.height(),width:c.width()};c.from=d.options.from||k;c.to=d.options.to||k;if(n){n=a.effects.getBaseline(n,k);c.from.top=(k.height-c.from.height)*n.y;c.from.left=(k.width-c.from.width)*n.x;c.to.top=(k.height-c.to.height)*n.y;c.to.left=(k.width-c.to.width)*n.x}var m={from:{y:c.from.height/k.height,x:c.from.width/k.width},to:{y:c.to.height/k.height,x:c.to.width/k.width}};
if(o=="box"||o=="both"){if(m.from.y!=m.to.y){e=e.concat(b);c.from=a.effects.setTransition(c,b,m.from.y,c.from);c.to=a.effects.setTransition(c,b,m.to.y,c.to)}if(m.from.x!=m.to.x){e=e.concat(f);c.from=a.effects.setTransition(c,f,m.from.x,c.from);c.to=a.effects.setTransition(c,f,m.to.x,c.to)}}if(o=="content"||o=="both")if(m.from.y!=m.to.y){e=e.concat(i);c.from=a.effects.setTransition(c,i,m.from.y,c.from);c.to=a.effects.setTransition(c,i,m.to.y,c.to)}a.effects.save(c,l?e:h);c.show();a.effects.createWrapper(c);
c.css("overflow","hidden").css(c.from);if(o=="content"||o=="both"){b=b.concat(["marginTop","marginBottom"]).concat(i);f=f.concat(["marginLeft","marginRight"]);g=e.concat(b).concat(f);c.find("*[width]").each(function(){child=a(this);l&&a.effects.save(child,g);var p={height:child.height(),width:child.width()};child.from={height:p.height*m.from.y,width:p.width*m.from.x};child.to={height:p.height*m.to.y,width:p.width*m.to.x};if(m.from.y!=m.to.y){child.from=a.effects.setTransition(child,b,m.from.y,child.from);
child.to=a.effects.setTransition(child,b,m.to.y,child.to)}if(m.from.x!=m.to.x){child.from=a.effects.setTransition(child,f,m.from.x,child.from);child.to=a.effects.setTransition(child,f,m.to.x,child.to)}child.css(child.from);child.animate(child.to,d.duration,d.options.easing,function(){l&&a.effects.restore(child,g)})})}c.animate(c.to,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity);j=="hide"&&c.hide();a.effects.restore(c,
l?e:h);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.shake=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"];a.effects.setMode(c,d.options.mode||"effect");var h=d.options.direction||"left",g=d.options.distance||20,i=d.options.times||3,b=d.duration||d.options.duration||140;a.effects.save(c,e);c.show();a.effects.createWrapper(c);var f=h=="up"||h=="down"?"top":"left",j=h=="up"||h=="left"?"pos":"neg";h={};var l={},o={};h[f]=(j=="pos"?"-=":"+=")+g;l[f]=(j=="pos"?"+=":"-=")+g*2;o[f]=
(j=="pos"?"-=":"+=")+g*2;c.animate(h,b,d.options.easing);for(g=1;g<i;g++)c.animate(l,b,d.options.easing).animate(o,b,d.options.easing);c.animate(l,b,d.options.easing).animate(h,b/2,d.options.easing,function(){a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments)});c.queue("fx",function(){c.dequeue()});c.dequeue()})}})(jQuery);
(function(a){a.effects.slide=function(d){return this.queue(function(){var c=a(this),e=["position","top","bottom","left","right"],h=a.effects.setMode(c,d.options.mode||"show"),g=d.options.direction||"left";a.effects.save(c,e);c.show();a.effects.createWrapper(c).css({overflow:"hidden"});var i=g=="up"||g=="down"?"top":"left";g=g=="up"||g=="left"?"pos":"neg";var b=d.options.distance||(i=="top"?c.outerHeight({margin:true}):c.outerWidth({margin:true}));if(h=="show")c.css(i,g=="pos"?isNaN(b)?"-"+b:-b:b);
var f={};f[i]=(h=="show"?g=="pos"?"+=":"-=":g=="pos"?"-=":"+=")+b;c.animate(f,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){h=="hide"&&c.hide();a.effects.restore(c,e);a.effects.removeWrapper(c);d.callback&&d.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
(function(a){a.effects.transfer=function(d){return this.queue(function(){var c=a(this),e=a(d.options.to),h=e.offset();e={top:h.top,left:h.left,height:e.innerHeight(),width:e.innerWidth()};h=c.offset();var g=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(d.options.className).css({top:h.top,left:h.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(e,d.duration,d.options.easing,function(){g.remove();d.callback&&d.callback.apply(c[0],arguments);
c.dequeue()})})}})(jQuery);
(function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var d=this,c=d.options;d.running=0;d.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");d.headers=
d.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")});d.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(c.navigation){var e=d.element.find("a").filter(c.navigationFilter).eq(0);if(e.length){var h=e.closest(".ui-accordion-header");d.active=h.length?h:e.closest(".ui-accordion-content").prev()}}d.active=d._findActive(d.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");d.active.next().addClass("ui-accordion-content-active");d._createIcons();d.resize();d.element.attr("role","tablist");d.headers.attr("role","tab").bind("keydown.accordion",
function(g){return d._keydown(g)}).next().attr("role","tabpanel");d.headers.not(d.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();d.active.length?d.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):d.headers.eq(0).attr("tabIndex",0);a.browser.safari||d.headers.find("a").attr("tabIndex",-1);c.event&&d.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(g){d._clickHandler.call(d,g,this);g.preventDefault()})},_createIcons:function(){var d=
this.options;if(d.icons){a("<span></span>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var d=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(d.autoHeight||d.fillHeight)c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(d,c){a.Widget.prototype._setOption.apply(this,arguments);d=="active"&&this.activate(c);if(d=="icons"){this._destroyIcons();
c&&this._createIcons()}if(d=="disabled")this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(d){if(!(this.options.disabled||d.altKey||d.ctrlKey)){var c=a.ui.keyCode,e=this.headers.length,h=this.headers.index(d.target),g=false;switch(d.keyCode){case c.RIGHT:case c.DOWN:g=this.headers[(h+1)%e];break;case c.LEFT:case c.UP:g=this.headers[(h-1+e)%e];break;case c.SPACE:case c.ENTER:this._clickHandler({target:d.target},d.target);
d.preventDefault()}if(g){a(d.target).attr("tabIndex",-1);a(g).attr("tabIndex",0);g.focus();return false}return true}},resize:function(){var d=this.options,c;if(d.fillSpace){if(a.browser.msie){var e=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height();a.browser.msie&&this.element.parent().css("overflow",e);this.headers.each(function(){c-=a(this).outerHeight(true)});this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+
a(this).height()))}).css("overflow","auto")}else if(d.autoHeight){c=0;this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c)}return this},activate:function(d){this.options.active=d;d=this._findActive(d)[0];this._clickHandler({target:d},d);return this},_findActive:function(d){return d?typeof d==="number"?this.headers.filter(":eq("+d+")"):this.headers.not(this.headers.not(d)):d===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(d,c){var e=this.options;
if(!e.disabled)if(d.target){d=a(d.currentTarget||c);c=d[0]===this.active[0];e.active=e.collapsible&&c?false:this.headers.index(d);if(!(this.running||!e.collapsible&&c)){var h=this.active;f=d.next();i=this.active.next();b={options:e,newHeader:c&&e.collapsible?a([]):d,oldHeader:this.active,newContent:c&&e.collapsible?a([]):f,oldContent:i};var g=this.headers.index(this.active[0])>this.headers.index(d[0]);this.active=c?a([]):d;this._toggle(f,i,b,c,g);h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
if(!c){d.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected);d.next().addClass("ui-accordion-content-active")}}}else if(e.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);this.active.next().addClass("ui-accordion-content-active");var i=this.active.next(),
b={options:e,newHeader:a([]),oldHeader:e.active,newContent:a([]),oldContent:i},f=this.active=a([]);this._toggle(f,i,b)}},_toggle:function(d,c,e,h,g){var i=this,b=i.options;i.toShow=d;i.toHide=c;i.data=e;var f=function(){if(i)return i._completed.apply(i,arguments)};i._trigger("changestart",null,i.data);i.running=c.size()===0?d.size():c.size();if(b.animated){e={};e=b.collapsible&&h?{toShow:a([]),toHide:c,complete:f,down:g,autoHeight:b.autoHeight||b.fillSpace}:{toShow:d,toHide:c,complete:f,down:g,autoHeight:b.autoHeight||
b.fillSpace};if(!b.proxied)b.proxied=b.animated;if(!b.proxiedDuration)b.proxiedDuration=b.duration;b.animated=a.isFunction(b.proxied)?b.proxied(e):b.proxied;b.duration=a.isFunction(b.proxiedDuration)?b.proxiedDuration(e):b.proxiedDuration;h=a.ui.accordion.animations;var j=b.duration,l=b.animated;if(l&&!h[l]&&!a.easing[l])l="slide";h[l]||(h[l]=function(o){this.slide(o,{easing:l,duration:j||700})});h[l](e)}else{if(b.collapsible&&h)d.toggle();else{c.hide();d.show()}f(true)}c.prev().attr({"aria-expanded":"false",
"aria-selected":"false",tabIndex:-1}).blur();d.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(d){this.running=d?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});a.extend(a.ui.accordion,{version:"1.8.16",
animations:{slide:function(d,c){d=a.extend({easing:"swing",duration:300},d,c);if(d.toHide.size())if(d.toShow.size()){var e=d.toShow.css("overflow"),h=0,g={},i={},b;c=d.toShow;b=c[0].style.width;c.width(parseInt(c.parent().width(),10)-parseInt(c.css("paddingLeft"),10)-parseInt(c.css("paddingRight"),10)-(parseInt(c.css("borderLeftWidth"),10)||0)-(parseInt(c.css("borderRightWidth"),10)||0));a.each(["height","paddingTop","paddingBottom"],function(f,j){i[j]="hide";f=(""+a.css(d.toShow[0],j)).match(/^([\d+-.]+)(.*)$/);
g[j]={value:f[1],unit:f[2]||"px"}});d.toShow.css({height:0,overflow:"hidden"}).show();d.toHide.filter(":hidden").each(d.complete).end().filter(":visible").animate(i,{step:function(f,j){if(j.prop=="height")h=j.end-j.start===0?0:(j.now-j.start)/(j.end-j.start);d.toShow[0].style[j.prop]=h*g[j.prop].value+g[j.prop].unit},duration:d.duration,easing:d.easing,complete:function(){d.autoHeight||d.toShow.css("height","");d.toShow.css({width:b,overflow:e});d.complete()}})}else d.toHide.animate({height:"hide",
paddingTop:"hide",paddingBottom:"hide"},d);else d.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},d)},bounceslide:function(d){this.slide(d,{easing:d.down?"easeOutBounce":"swing",duration:d.down?1E3:200})}}})})(jQuery);
(function(a){var d=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var c=this,e=this.element[0].ownerDocument,h;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(g){if(!(c.options.disabled||c.element.propAttr("readOnly"))){h=
false;var i=a.ui.keyCode;switch(g.keyCode){case i.PAGE_UP:c._move("previousPage",g);break;case i.PAGE_DOWN:c._move("nextPage",g);break;case i.UP:c._move("previous",g);g.preventDefault();break;case i.DOWN:c._move("next",g);g.preventDefault();break;case i.ENTER:case i.NUMPAD_ENTER:if(c.menu.active){h=true;g.preventDefault()}case i.TAB:if(!c.menu.active)return;c.menu.select(g);break;case i.ESCAPE:c.element.val(c.term);c.close(g);break;default:clearTimeout(c.searching);c.searching=setTimeout(function(){if(c.term!=
c.element.val()){c.selectedItem=null;c.search(null,g)}},c.options.delay);break}}}).bind("keypress.autocomplete",function(g){if(h){h=false;g.preventDefault()}}).bind("focus.autocomplete",function(){if(!c.options.disabled){c.selectedItem=null;c.previous=c.element.val()}}).bind("blur.autocomplete",function(g){if(!c.options.disabled){clearTimeout(c.searching);c.closing=setTimeout(function(){c.close(g);c._change(g)},150)}});this._initSource();this.response=function(){return c._response.apply(c,arguments)};
this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",e)[0]).mousedown(function(g){var i=c.menu.element[0];a(g.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(b){b.target!==c.element[0]&&b.target!==i&&!a.ui.contains(i,b.target)&&c.close()})},1);setTimeout(function(){clearTimeout(c.closing)},13)}).menu({focus:function(g,i){i=i.item.data("item.autocomplete");false!==c._trigger("focus",g,{item:i})&&/^key/.test(g.originalEvent.type)&&
c.element.val(i.value)},selected:function(g,i){var b=i.item.data("item.autocomplete"),f=c.previous;if(c.element[0]!==e.activeElement){c.element.focus();c.previous=f;setTimeout(function(){c.previous=f;c.selectedItem=b},1)}false!==c._trigger("select",g,{item:b})&&c.element.val(b.value);c.term=c.element.val();c.close(g);c.selectedItem=b},blur:function(){c.menu.element.is(":visible")&&c.element.val()!==c.term&&c.element.val(c.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
a.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();a.Widget.prototype.destroy.call(this)},_setOption:function(c,e){a.Widget.prototype._setOption.apply(this,arguments);c==="source"&&this._initSource();if(c==="appendTo")this.menu.element.appendTo(a(e||"body",this.element[0].ownerDocument)[0]);c==="disabled"&&
e&&this.xhr&&this.xhr.abort()},_initSource:function(){var c=this,e,h;if(a.isArray(this.options.source)){e=this.options.source;this.source=function(g,i){i(a.ui.autocomplete.filter(e,g.term))}}else if(typeof this.options.source==="string"){h=this.options.source;this.source=function(g,i){c.xhr&&c.xhr.abort();c.xhr=a.ajax({url:h,data:g,dataType:"json",autocompleteRequest:++d,success:function(b){this.autocompleteRequest===d&&i(b)},error:function(){this.autocompleteRequest===d&&i([])}})}}else this.source=
this.options.source},search:function(c,e){c=c!=null?c:this.element.val();this.term=this.element.val();if(c.length<this.options.minLength)return this.close(e);clearTimeout(this.closing);if(this._trigger("search",e)!==false)return this._search(c)},_search:function(c){this.pending++;this.element.addClass("ui-autocomplete-loading");this.source({term:c},this.response)},_response:function(c){if(!this.options.disabled&&c&&c.length){c=this._normalize(c);this._suggest(c);this._trigger("open")}else this.close();
this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(c){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",c)}},_change:function(c){this.previous!==this.element.val()&&this._trigger("change",c,{item:this.selectedItem})},_normalize:function(c){if(c.length&&c[0].label&&c[0].value)return c;return a.map(c,function(e){if(typeof e==="string")return{label:e,value:e};return a.extend({label:e.label||
e.value,value:e.value||e.label},e)})},_suggest:function(c){var e=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(e,c);this.menu.deactivate();this.menu.refresh();e.show();this._resizeMenu();e.position(a.extend({of:this.element},this.options.position));this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var c=this.menu.element;c.outerWidth(Math.max(c.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(c,e){var h=this;
a.each(e,function(g,i){h._renderItem(c,i)})},_renderItem:function(c,e){return a("<li></li>").data("item.autocomplete",e).append(a("<a></a>").text(e.label)).appendTo(c)},_move:function(c,e){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(c)||this.menu.last()&&/^next/.test(c)){this.element.val(this.term);this.menu.deactivate()}else this.menu[c](e);else this.search(null,e)},widget:function(){return this.menu.element}});a.extend(a.ui.autocomplete,{escapeRegex:function(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,
"\\$&")},filter:function(c,e){var h=new RegExp(a.ui.autocomplete.escapeRegex(e),"i");return a.grep(c,function(g){return h.test(g.label||g.value||g)})}})})(jQuery);
(function(a){a.widget("ui.menu",{_create:function(){var d=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(a(c.target).closest(".ui-menu-item a").length){c.preventDefault();d.select(c)}});this.refresh()},refresh:function(){var d=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",
-1).mouseenter(function(c){d.activate(c,a(this).parent())}).mouseleave(function(){d.deactivate()})},activate:function(d,c){this.deactivate();if(this.hasScroll()){var e=c.offset().top-this.element.offset().top,h=this.element.scrollTop(),g=this.element.height();if(e<0)this.element.scrollTop(h+e);else e>=g&&this.element.scrollTop(h+e-g+c.height())}this.active=c.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",d,{item:c})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");this.active=null}},next:function(d){this.move("next",".ui-menu-item:first",d)},previous:function(d){this.move("prev",".ui-menu-item:last",d)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(d,c,e){if(this.active){d=this.active[d+"All"](".ui-menu-item").eq(0);d.length?this.activate(e,d):this.activate(e,this.element.children(c))}else this.activate(e,
this.element.children(c))},nextPage:function(d){if(this.hasScroll())if(!this.active||this.last())this.activate(d,this.element.children(".ui-menu-item:first"));else{var c=this.active.offset().top,e=this.element.height(),h=this.element.children(".ui-menu-item").filter(function(){var g=a(this).offset().top-c-e+a(this).height();return g<10&&g>-10});h.length||(h=this.element.children(".ui-menu-item:last"));this.activate(d,h)}else this.activate(d,this.element.children(".ui-menu-item").filter(!this.active||
this.last()?":first":":last"))},previousPage:function(d){if(this.hasScroll())if(!this.active||this.first())this.activate(d,this.element.children(".ui-menu-item:last"));else{var c=this.active.offset().top,e=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var h=a(this).offset().top-c+e-a(this).height();return h<10&&h>-10});result.length||(result=this.element.children(".ui-menu-item:first"));this.activate(d,result)}else this.activate(d,this.element.children(".ui-menu-item").filter(!this.active||
this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(d){this._trigger("selected",d,{item:this.active})}})})(jQuery);
(function(a){var d,c,e,h,g=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},i=function(b){var f=b.name,j=b.form,l=a([]);if(f)l=j?a(j).find("[name='"+f+"']"):a("[name='"+f+"']",b.ownerDocument).filter(function(){return!this.form});return l};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",g);if(typeof this.options.disabled!==
"boolean")this.options.disabled=this.element.propAttr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,f=this.options,j=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(!j?" ui-state-active":"");if(f.label===null)f.label=this.buttonElement.html();if(this.element.is(":disabled"))f.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!f.disabled){a(this).addClass("ui-state-hover");
this===d&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){f.disabled||a(this).removeClass(l)}).bind("click.button",function(o){if(f.disabled){o.preventDefault();o.stopImmediatePropagation()}});this.element.bind("focus.button",function(){b.buttonElement.addClass("ui-state-focus")}).bind("blur.button",function(){b.buttonElement.removeClass("ui-state-focus")});if(j){this.element.bind("change.button",function(){h||b.refresh()});this.buttonElement.bind("mousedown.button",function(o){if(!f.disabled){h=
false;c=o.pageX;e=o.pageY}}).bind("mouseup.button",function(o){if(!f.disabled)if(c!==o.pageX||e!==o.pageY)h=true})}if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(f.disabled||h)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(f.disabled||h)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed","true");
var o=b.element[0];i(o).not(o).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")});else{this.buttonElement.bind("mousedown.button",function(){if(f.disabled)return false;a(this).addClass("ui-state-active");d=this;a(document).one("mouseup",function(){d=null})}).bind("mouseup.button",function(){if(f.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(o){if(f.disabled)return false;if(o.keyCode==a.ui.keyCode.SPACE||
o.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(o){o.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",f.disabled);this._resetButton()},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type===
"radio"){var b=this.element.parents().filter(":last"),f="label[for='"+this.element.attr("id")+"']";this.buttonElement=b.find(f);if(!this.buttonElement.length){b=b.length?b.siblings():this.element.siblings();this.buttonElement=b.filter(f);if(!this.buttonElement.length)this.buttonElement=b.find(f)}this.element.addClass("ui-helper-hidden-accessible");(b=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},
widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");
a.Widget.prototype.destroy.call(this)},_setOption:function(b,f){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")f?this.element.propAttr("disabled",true):this.element.propAttr("disabled",false);else this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")i(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
"true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
f=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),j=this.options.icons,l=j.primary&&j.secondary,o=[];if(j.primary||j.secondary){if(this.options.text)o.push("ui-button-text-icon"+(l?"s":j.primary?"-primary":"-secondary"));j.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+j.primary+"'></span>");j.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+j.secondary+"'></span>");if(!this.options.text){o.push(l?"ui-button-icons-only":
"ui-button-icon-only");this.hasTitle||b.attr("title",f)}}else o.push("ui-button-text-only");b.addClass(o.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,f){b==="disabled"&&this.buttons.button("option",b,f);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")===
"ltr";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(b?"ui-corner-right":"ui-corner-left").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
a.Widget.prototype.destroy.call(this)}})})(jQuery);
(function(a,d){function c(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};a.extend(this._defaults,this.regional[""]);this.dpDiv=e(a('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function e(b){return b.bind("mouseout",
function(f){f=a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");f.length&&f.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(f){f=a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");if(!(a.datepicker._isDisabledDatepicker(i.inline?b.parent()[0]:i.input[0])||!f.length)){f.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
f.addClass("ui-state-hover");f.hasClass("ui-datepicker-prev")&&f.addClass("ui-datepicker-prev-hover");f.hasClass("ui-datepicker-next")&&f.addClass("ui-datepicker-next-hover")}})}function h(b,f){a.extend(b,f);for(var j in f)if(f[j]==null||f[j]==d)b[j]=f[j];return b}a.extend(a.ui,{datepicker:{version:"1.8.16"}});var g=(new Date).getTime(),i;a.extend(c.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},
setDefaults:function(b){h(this._defaults,b||{});return this},_attachDatepicker:function(b,f){var j=null;for(var l in this._defaults){var o=b.getAttribute("date:"+l);if(o){j=j||{};try{j[l]=eval(o)}catch(n){j[l]=o}}}l=b.nodeName.toLowerCase();o=l=="div"||l=="span";if(!b.id){this.uuid+=1;b.id="dp"+this.uuid}var k=this._newInst(a(b),o);k.settings=a.extend({},f||{},j||{});if(l=="input")this._connectDatepicker(b,k);else o&&this._inlineDatepicker(b,k)},_newInst:function(b,f){return{id:b[0].id.replace(/([^A-Za-z0-9_-])/g,
"\\\\$1"),input:b,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:f,dpDiv:!f?this.dpDiv:e(a('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(b,f){var j=a(b);f.append=a([]);f.trigger=a([]);if(!j.hasClass(this.markerClassName)){this._attachments(j,f);j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
function(l,o,n){f.settings[o]=n}).bind("getData.datepicker",function(l,o){return this._get(f,o)});this._autoSize(f);a.data(b,"datepicker",f);f.settings.disabled&&this._disableDatepicker(b)}},_attachments:function(b,f){var j=this._get(f,"appendText"),l=this._get(f,"isRTL");f.append&&f.append.remove();if(j){f.append=a('<span class="'+this._appendClass+'">'+j+"</span>");b[l?"before":"after"](f.append)}b.unbind("focus",this._showDatepicker);f.trigger&&f.trigger.remove();j=this._get(f,"showOn");if(j==
"focus"||j=="both")b.focus(this._showDatepicker);if(j=="button"||j=="both"){j=this._get(f,"buttonText");var o=this._get(f,"buttonImage");f.trigger=a(this._get(f,"buttonImageOnly")?a("<img/>").addClass(this._triggerClass).attr({src:o,alt:j,title:j}):a('<button type="button"></button>').addClass(this._triggerClass).html(o==""?j:a("<img/>").attr({src:o,alt:j,title:j})));b[l?"before":"after"](f.trigger);f.trigger.click(function(){a.datepicker._datepickerShowing&&a.datepicker._lastInput==b[0]?a.datepicker._hideDatepicker():
a.datepicker._showDatepicker(b[0]);return false})}},_autoSize:function(b){if(this._get(b,"autoSize")&&!b.inline){var f=new Date(2009,11,20),j=this._get(b,"dateFormat");if(j.match(/[DM]/)){var l=function(o){for(var n=0,k=0,m=0;m<o.length;m++)if(o[m].length>n){n=o[m].length;k=m}return k};f.setMonth(l(this._get(b,j.match(/MM/)?"monthNames":"monthNamesShort")));f.setDate(l(this._get(b,j.match(/DD/)?"dayNames":"dayNamesShort"))+20-f.getDay())}b.input.attr("size",this._formatDate(b,f).length)}},_inlineDatepicker:function(b,
f){var j=a(b);if(!j.hasClass(this.markerClassName)){j.addClass(this.markerClassName).append(f.dpDiv).bind("setData.datepicker",function(l,o,n){f.settings[o]=n}).bind("getData.datepicker",function(l,o){return this._get(f,o)});a.data(b,"datepicker",f);this._setDate(f,this._getDefaultDate(f),true);this._updateDatepicker(f);this._updateAlternate(f);f.settings.disabled&&this._disableDatepicker(b);f.dpDiv.css("display","block")}},_dialogDatepicker:function(b,f,j,l,o){b=this._dialogInst;if(!b){this.uuid+=
1;this._dialogInput=a('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);a("body").append(this._dialogInput);b=this._dialogInst=this._newInst(this._dialogInput,false);b.settings={};a.data(this._dialogInput[0],"datepicker",b)}h(b.settings,l||{});f=f&&f.constructor==Date?this._formatDate(b,f):f;this._dialogInput.val(f);this._pos=o?o.length?o:[o.pageX,o.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/
2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");b.settings.onSelect=j;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);a.blockUI&&a.blockUI(this.dpDiv);a.data(this._dialogInput[0],"datepicker",b);return this},_destroyDatepicker:function(b){var f=
a(b),j=a.data(b,"datepicker");if(f.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();a.removeData(b,"datepicker");if(l=="input"){j.append.remove();j.trigger.remove();f.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(l=="div"||l=="span")f.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(b){var f=a(b),j=a.data(b,"datepicker");if(f.hasClass(this.markerClassName)){var l=
b.nodeName.toLowerCase();if(l=="input"){b.disabled=false;j.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(l=="div"||l=="span"){f=f.children("."+this._inlineClass);f.children().removeClass("ui-state-disabled");f.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==b?null:o})}},_disableDatepicker:function(b){var f=a(b),j=a.data(b,
"datepicker");if(f.hasClass(this.markerClassName)){var l=b.nodeName.toLowerCase();if(l=="input"){b.disabled=true;j.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(l=="div"||l=="span"){f=f.children("."+this._inlineClass);f.children().addClass("ui-state-disabled");f.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=a.map(this._disabledInputs,function(o){return o==
b?null:o});this._disabledInputs[this._disabledInputs.length]=b}},_isDisabledDatepicker:function(b){if(!b)return false;for(var f=0;f<this._disabledInputs.length;f++)if(this._disabledInputs[f]==b)return true;return false},_getInst:function(b){try{return a.data(b,"datepicker")}catch(f){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(b,f,j){var l=this._getInst(b);if(arguments.length==2&&typeof f=="string")return f=="defaults"?a.extend({},a.datepicker._defaults):l?f=="all"?
a.extend({},l.settings):this._get(l,f):null;var o=f||{};if(typeof f=="string"){o={};o[f]=j}if(l){this._curInst==l&&this._hideDatepicker();var n=this._getDateDatepicker(b,true),k=this._getMinMaxDate(l,"min"),m=this._getMinMaxDate(l,"max");h(l.settings,o);if(k!==null&&o.dateFormat!==d&&o.minDate===d)l.settings.minDate=this._formatDate(l,k);if(m!==null&&o.dateFormat!==d&&o.maxDate===d)l.settings.maxDate=this._formatDate(l,m);this._attachments(a(b),l);this._autoSize(l);this._setDate(l,n);this._updateAlternate(l);
this._updateDatepicker(l)}},_changeDatepicker:function(b,f,j){this._optionDatepicker(b,f,j)},_refreshDatepicker:function(b){(b=this._getInst(b))&&this._updateDatepicker(b)},_setDateDatepicker:function(b,f){if(b=this._getInst(b)){this._setDate(b,f);this._updateDatepicker(b);this._updateAlternate(b)}},_getDateDatepicker:function(b,f){(b=this._getInst(b))&&!b.inline&&this._setDateFromField(b,f);return b?this._getDate(b):null},_doKeyDown:function(b){var f=a.datepicker._getInst(b.target),j=true,l=f.dpDiv.is(".ui-datepicker-rtl");
f._keyEvent=true;if(a.datepicker._datepickerShowing)switch(b.keyCode){case 9:a.datepicker._hideDatepicker();j=false;break;case 13:j=a("td."+a.datepicker._dayOverClass+":not(."+a.datepicker._currentClass+")",f.dpDiv);j[0]&&a.datepicker._selectDay(b.target,f.selectedMonth,f.selectedYear,j[0]);if(b=a.datepicker._get(f,"onSelect")){j=a.datepicker._formatDate(f);b.apply(f.input?f.input[0]:null,[j,f])}else a.datepicker._hideDatepicker();return false;case 27:a.datepicker._hideDatepicker();break;case 33:a.datepicker._adjustDate(b.target,
b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 34:a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,"stepMonths"),"M");break;case 35:if(b.ctrlKey||b.metaKey)a.datepicker._clearDate(b.target);j=b.ctrlKey||b.metaKey;break;case 36:if(b.ctrlKey||b.metaKey)a.datepicker._gotoToday(b.target);j=b.ctrlKey||b.metaKey;break;case 37:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,l?+1:-1,"D");j=
b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 38:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,-7,"D");j=b.ctrlKey||b.metaKey;break;case 39:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,l?-1:+1,"D");j=b.ctrlKey||b.metaKey;if(b.originalEvent.altKey)a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,
"stepMonths"),"M");break;case 40:if(b.ctrlKey||b.metaKey)a.datepicker._adjustDate(b.target,+7,"D");j=b.ctrlKey||b.metaKey;break;default:j=false}else if(b.keyCode==36&&b.ctrlKey)a.datepicker._showDatepicker(this);else j=false;if(j){b.preventDefault();b.stopPropagation()}},_doKeyPress:function(b){var f=a.datepicker._getInst(b.target);if(a.datepicker._get(f,"constrainInput")){f=a.datepicker._possibleChars(a.datepicker._get(f,"dateFormat"));var j=String.fromCharCode(b.charCode==d?b.keyCode:b.charCode);
return b.ctrlKey||b.metaKey||j<" "||!f||f.indexOf(j)>-1}},_doKeyUp:function(b){b=a.datepicker._getInst(b.target);if(b.input.val()!=b.lastVal)try{if(a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,a.datepicker._getFormatConfig(b))){a.datepicker._setDateFromField(b);a.datepicker._updateAlternate(b);a.datepicker._updateDatepicker(b)}}catch(f){a.datepicker.log(f)}return true},_showDatepicker:function(b){b=b.target||b;if(b.nodeName.toLowerCase()!="input")b=a("input",
b.parentNode)[0];if(!(a.datepicker._isDisabledDatepicker(b)||a.datepicker._lastInput==b)){var f=a.datepicker._getInst(b);if(a.datepicker._curInst&&a.datepicker._curInst!=f){a.datepicker._datepickerShowing&&a.datepicker._triggerOnClose(a.datepicker._curInst);a.datepicker._curInst.dpDiv.stop(true,true)}var j=a.datepicker._get(f,"beforeShow");j=j?j.apply(b,[b,f]):{};if(j!==false){h(f.settings,j);f.lastVal=null;a.datepicker._lastInput=b;a.datepicker._setDateFromField(f);if(a.datepicker._inDialog)b.value=
"";if(!a.datepicker._pos){a.datepicker._pos=a.datepicker._findPos(b);a.datepicker._pos[1]+=b.offsetHeight}var l=false;a(b).parents().each(function(){l|=a(this).css("position")=="fixed";return!l});if(l&&a.browser.opera){a.datepicker._pos[0]-=document.documentElement.scrollLeft;a.datepicker._pos[1]-=document.documentElement.scrollTop}j={left:a.datepicker._pos[0],top:a.datepicker._pos[1]};a.datepicker._pos=null;f.dpDiv.empty();f.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});a.datepicker._updateDatepicker(f);
j=a.datepicker._checkOffset(f,j,l);f.dpDiv.css({position:a.datepicker._inDialog&&a.blockUI?"static":l?"fixed":"absolute",display:"none",left:j.left+"px",top:j.top+"px"});if(!f.inline){j=a.datepicker._get(f,"showAnim");var o=a.datepicker._get(f,"duration"),n=function(){var k=f.dpDiv.find("iframe.ui-datepicker-cover");if(k.length){var m=a.datepicker._getBorders(f.dpDiv);k.css({left:-m[0],top:-m[1],width:f.dpDiv.outerWidth(),height:f.dpDiv.outerHeight()})}};f.dpDiv.zIndex(a(b).zIndex()+1);a.datepicker._datepickerShowing=
true;a.effects&&a.effects[j]?f.dpDiv.show(j,a.datepicker._get(f,"showOptions"),o,n):f.dpDiv[j||"show"](j?o:null,n);if(!j||!o)n();f.input.is(":visible")&&!f.input.is(":disabled")&&f.input.focus();a.datepicker._curInst=f}}}},_updateDatepicker:function(b){this.maxRows=4;var f=a.datepicker._getBorders(b.dpDiv);i=b;b.dpDiv.empty().append(this._generateHTML(b));var j=b.dpDiv.find("iframe.ui-datepicker-cover");j.length&&j.css({left:-f[0],top:-f[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()});
b.dpDiv.find("."+this._dayOverClass+" a").mouseover();f=this._getNumberOfMonths(b);j=f[1];b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");j>1&&b.dpDiv.addClass("ui-datepicker-multi-"+j).css("width",17*j+"em");b.dpDiv[(f[0]!=1||f[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");b.dpDiv[(this._get(b,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");b==a.datepicker._curInst&&a.datepicker._datepickerShowing&&b.input&&b.input.is(":visible")&&
!b.input.is(":disabled")&&b.input[0]!=document.activeElement&&b.input.focus();if(b.yearshtml){var l=b.yearshtml;setTimeout(function(){l===b.yearshtml&&b.yearshtml&&b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);l=b.yearshtml=null},0)}},_getBorders:function(b){var f=function(j){return{thin:1,medium:2,thick:3}[j]||j};return[parseFloat(f(b.css("border-left-width"))),parseFloat(f(b.css("border-top-width")))]},_checkOffset:function(b,f,j){var l=b.dpDiv.outerWidth(),o=b.dpDiv.outerHeight(),
n=b.input?b.input.outerWidth():0,k=b.input?b.input.outerHeight():0,m=document.documentElement.clientWidth+a(document).scrollLeft(),p=document.documentElement.clientHeight+a(document).scrollTop();f.left-=this._get(b,"isRTL")?l-n:0;f.left-=j&&f.left==b.input.offset().left?a(document).scrollLeft():0;f.top-=j&&f.top==b.input.offset().top+k?a(document).scrollTop():0;f.left-=Math.min(f.left,f.left+l>m&&m>l?Math.abs(f.left+l-m):0);f.top-=Math.min(f.top,f.top+o>p&&p>o?Math.abs(o+k):0);return f},_findPos:function(b){for(var f=
this._get(this._getInst(b),"isRTL");b&&(b.type=="hidden"||b.nodeType!=1||a.expr.filters.hidden(b));)b=b[f?"previousSibling":"nextSibling"];b=a(b).offset();return[b.left,b.top]},_triggerOnClose:function(b){var f=this._get(b,"onClose");if(f)f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b])},_hideDatepicker:function(b){var f=this._curInst;if(!(!f||b&&f!=a.data(b,"datepicker")))if(this._datepickerShowing){b=this._get(f,"showAnim");var j=this._get(f,"duration"),l=function(){a.datepicker._tidyDialog(f);
this._curInst=null};a.effects&&a.effects[b]?f.dpDiv.hide(b,a.datepicker._get(f,"showOptions"),j,l):f.dpDiv[b=="slideDown"?"slideUp":b=="fadeIn"?"fadeOut":"hide"](b?j:null,l);b||l();a.datepicker._triggerOnClose(f);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(a.blockUI){a.unblockUI();a("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(b){b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},
_checkExternalClick:function(b){if(a.datepicker._curInst){b=a(b.target);b[0].id!=a.datepicker._mainDivId&&b.parents("#"+a.datepicker._mainDivId).length==0&&!b.hasClass(a.datepicker.markerClassName)&&!b.hasClass(a.datepicker._triggerClass)&&a.datepicker._datepickerShowing&&!(a.datepicker._inDialog&&a.blockUI)&&a.datepicker._hideDatepicker()}},_adjustDate:function(b,f,j){b=a(b);var l=this._getInst(b[0]);if(!this._isDisabledDatepicker(b[0])){this._adjustInstDate(l,f+(j=="M"?this._get(l,"showCurrentAtPos"):
0),j);this._updateDatepicker(l)}},_gotoToday:function(b){b=a(b);var f=this._getInst(b[0]);if(this._get(f,"gotoCurrent")&&f.currentDay){f.selectedDay=f.currentDay;f.drawMonth=f.selectedMonth=f.currentMonth;f.drawYear=f.selectedYear=f.currentYear}else{var j=new Date;f.selectedDay=j.getDate();f.drawMonth=f.selectedMonth=j.getMonth();f.drawYear=f.selectedYear=j.getFullYear()}this._notifyChange(f);this._adjustDate(b)},_selectMonthYear:function(b,f,j){b=a(b);var l=this._getInst(b[0]);l["selected"+(j=="M"?
"Month":"Year")]=l["draw"+(j=="M"?"Month":"Year")]=parseInt(f.options[f.selectedIndex].value,10);this._notifyChange(l);this._adjustDate(b)},_selectDay:function(b,f,j,l){var o=a(b);if(!(a(l).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0]))){o=this._getInst(o[0]);o.selectedDay=o.currentDay=a("a",l).html();o.selectedMonth=o.currentMonth=f;o.selectedYear=o.currentYear=j;this._selectDate(b,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear))}},_clearDate:function(b){b=a(b);
this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(b,f){b=this._getInst(a(b)[0]);f=f!=null?f:this._formatDate(b);b.input&&b.input.val(f);this._updateAlternate(b);var j=this._get(b,"onSelect");if(j)j.apply(b.input?b.input[0]:null,[f,b]);else b.input&&b.input.trigger("change");if(b.inline)this._updateDatepicker(b);else{this._hideDatepicker();this._lastInput=b.input[0];typeof b.input[0]!="object"&&b.input.focus();this._lastInput=null}},_updateAlternate:function(b){var f=this._get(b,"altField");
if(f){var j=this._get(b,"altFormat")||this._get(b,"dateFormat"),l=this._getDate(b),o=this.formatDate(j,l,this._getFormatConfig(b));a(f).each(function(){a(this).val(o)})}},noWeekends:function(b){b=b.getDay();return[b>0&&b<6,""]},iso8601Week:function(b){b=new Date(b.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var f=b.getTime();b.setMonth(0);b.setDate(1);return Math.floor(Math.round((f-b)/864E5)/7)+1},parseDate:function(b,f,j){if(b==null||f==null)throw"Invalid arguments";f=typeof f=="object"?
f.toString():f+"";if(f=="")return null;var l=(j?j.shortYearCutoff:null)||this._defaults.shortYearCutoff;l=typeof l!="string"?l:(new Date).getFullYear()%100+parseInt(l,10);for(var o=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,n=(j?j.dayNames:null)||this._defaults.dayNames,k=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort,m=(j?j.monthNames:null)||this._defaults.monthNames,p=j=-1,q=-1,s=-1,r=false,u=function(z){(z=H+1<b.length&&b.charAt(H+1)==z)&&H++;return z},v=function(z){var I=
u(z);z=new RegExp("^\\d{1,"+(z=="@"?14:z=="!"?20:z=="y"&&I?4:z=="o"?3:2)+"}");z=f.substring(y).match(z);if(!z)throw"Missing number at position "+y;y+=z[0].length;return parseInt(z[0],10)},w=function(z,I,N){z=a.map(u(z)?N:I,function(D,E){return[[E,D]]}).sort(function(D,E){return-(D[1].length-E[1].length)});var J=-1;a.each(z,function(D,E){D=E[1];if(f.substr(y,D.length).toLowerCase()==D.toLowerCase()){J=E[0];y+=D.length;return false}});if(J!=-1)return J+1;else throw"Unknown name at position "+y;},x=
function(){if(f.charAt(y)!=b.charAt(H))throw"Unexpected literal at position "+y;y++},y=0,H=0;H<b.length;H++)if(r)if(b.charAt(H)=="'"&&!u("'"))r=false;else x();else switch(b.charAt(H)){case "d":q=v("d");break;case "D":w("D",o,n);break;case "o":s=v("o");break;case "m":p=v("m");break;case "M":p=w("M",k,m);break;case "y":j=v("y");break;case "@":var C=new Date(v("@"));j=C.getFullYear();p=C.getMonth()+1;q=C.getDate();break;case "!":C=new Date((v("!")-this._ticksTo1970)/1E4);j=C.getFullYear();p=C.getMonth()+
1;q=C.getDate();break;case "'":if(u("'"))x();else r=true;break;default:x()}if(y<f.length)throw"Extra/unparsed characters found in date: "+f.substring(y);if(j==-1)j=(new Date).getFullYear();else if(j<100)j+=(new Date).getFullYear()-(new Date).getFullYear()%100+(j<=l?0:-100);if(s>-1){p=1;q=s;do{l=this._getDaysInMonth(j,p-1);if(q<=l)break;p++;q-=l}while(1)}C=this._daylightSavingAdjust(new Date(j,p-1,q));if(C.getFullYear()!=j||C.getMonth()+1!=p||C.getDate()!=q)throw"Invalid date";return C},ATOM:"yy-mm-dd",
COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(b,f,j){if(!f)return"";var l=(j?j.dayNamesShort:null)||this._defaults.dayNamesShort,o=(j?j.dayNames:null)||this._defaults.dayNames,n=(j?j.monthNamesShort:null)||this._defaults.monthNamesShort;j=(j?j.monthNames:
null)||this._defaults.monthNames;var k=function(u){(u=r+1<b.length&&b.charAt(r+1)==u)&&r++;return u},m=function(u,v,w){v=""+v;if(k(u))for(;v.length<w;)v="0"+v;return v},p=function(u,v,w,x){return k(u)?x[v]:w[v]},q="",s=false;if(f)for(var r=0;r<b.length;r++)if(s)if(b.charAt(r)=="'"&&!k("'"))s=false;else q+=b.charAt(r);else switch(b.charAt(r)){case "d":q+=m("d",f.getDate(),2);break;case "D":q+=p("D",f.getDay(),l,o);break;case "o":q+=m("o",Math.round(((new Date(f.getFullYear(),f.getMonth(),f.getDate())).getTime()-
(new Date(f.getFullYear(),0,0)).getTime())/864E5),3);break;case "m":q+=m("m",f.getMonth()+1,2);break;case "M":q+=p("M",f.getMonth(),n,j);break;case "y":q+=k("y")?f.getFullYear():(f.getYear()%100<10?"0":"")+f.getYear()%100;break;case "@":q+=f.getTime();break;case "!":q+=f.getTime()*1E4+this._ticksTo1970;break;case "'":if(k("'"))q+="'";else s=true;break;default:q+=b.charAt(r)}return q},_possibleChars:function(b){for(var f="",j=false,l=function(n){(n=o+1<b.length&&b.charAt(o+1)==n)&&o++;return n},o=
0;o<b.length;o++)if(j)if(b.charAt(o)=="'"&&!l("'"))j=false;else f+=b.charAt(o);else switch(b.charAt(o)){case "d":case "m":case "y":case "@":f+="0123456789";break;case "D":case "M":return null;case "'":if(l("'"))f+="'";else j=true;break;default:f+=b.charAt(o)}return f},_get:function(b,f){return b.settings[f]!==d?b.settings[f]:this._defaults[f]},_setDateFromField:function(b,f){if(b.input.val()!=b.lastVal){var j=this._get(b,"dateFormat"),l=b.lastVal=b.input?b.input.val():null,o,n;o=n=this._getDefaultDate(b);
var k=this._getFormatConfig(b);try{o=this.parseDate(j,l,k)||n}catch(m){this.log(m);l=f?"":l}b.selectedDay=o.getDate();b.drawMonth=b.selectedMonth=o.getMonth();b.drawYear=b.selectedYear=o.getFullYear();b.currentDay=l?o.getDate():0;b.currentMonth=l?o.getMonth():0;b.currentYear=l?o.getFullYear():0;this._adjustInstDate(b)}},_getDefaultDate:function(b){return this._restrictMinMax(b,this._determineDate(b,this._get(b,"defaultDate"),new Date))},_determineDate:function(b,f,j){var l=function(n){var k=new Date;
k.setDate(k.getDate()+n);return k},o=function(n){try{return a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),n,a.datepicker._getFormatConfig(b))}catch(k){}var m=(n.toLowerCase().match(/^c/)?a.datepicker._getDate(b):null)||new Date,p=m.getFullYear(),q=m.getMonth();m=m.getDate();for(var s=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,r=s.exec(n);r;){switch(r[2]||"d"){case "d":case "D":m+=parseInt(r[1],10);break;case "w":case "W":m+=parseInt(r[1],10)*7;break;case "m":case "M":q+=parseInt(r[1],10);m=
Math.min(m,a.datepicker._getDaysInMonth(p,q));break;case "y":case "Y":p+=parseInt(r[1],10);m=Math.min(m,a.datepicker._getDaysInMonth(p,q));break}r=s.exec(n)}return new Date(p,q,m)};if(f=(f=f==null||f===""?j:typeof f=="string"?o(f):typeof f=="number"?isNaN(f)?j:l(f):new Date(f.getTime()))&&f.toString()=="Invalid Date"?j:f){f.setHours(0);f.setMinutes(0);f.setSeconds(0);f.setMilliseconds(0)}return this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(b){if(!b)return null;b.setHours(b.getHours()>
12?b.getHours()+2:0);return b},_setDate:function(b,f,j){var l=!f,o=b.selectedMonth,n=b.selectedYear;f=this._restrictMinMax(b,this._determineDate(b,f,new Date));b.selectedDay=b.currentDay=f.getDate();b.drawMonth=b.selectedMonth=b.currentMonth=f.getMonth();b.drawYear=b.selectedYear=b.currentYear=f.getFullYear();if((o!=b.selectedMonth||n!=b.selectedYear)&&!j)this._notifyChange(b);this._adjustInstDate(b);if(b.input)b.input.val(l?"":this._formatDate(b))},_getDate:function(b){return!b.currentYear||b.input&&
b.input.val()==""?null:this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay))},_generateHTML:function(b){var f=new Date;f=this._daylightSavingAdjust(new Date(f.getFullYear(),f.getMonth(),f.getDate()));var j=this._get(b,"isRTL"),l=this._get(b,"showButtonPanel"),o=this._get(b,"hideIfNoPrevNext"),n=this._get(b,"navigationAsDateFormat"),k=this._getNumberOfMonths(b),m=this._get(b,"showCurrentAtPos"),p=this._get(b,"stepMonths"),q=k[0]!=1||k[1]!=1,s=this._daylightSavingAdjust(!b.currentDay?
new Date(9999,9,9):new Date(b.currentYear,b.currentMonth,b.currentDay)),r=this._getMinMaxDate(b,"min"),u=this._getMinMaxDate(b,"max");m=b.drawMonth-m;var v=b.drawYear;if(m<0){m+=12;v--}if(u){var w=this._daylightSavingAdjust(new Date(u.getFullYear(),u.getMonth()-k[0]*k[1]+1,u.getDate()));for(w=r&&w<r?r:w;this._daylightSavingAdjust(new Date(v,m,1))>w;){m--;if(m<0){m=11;v--}}}b.drawMonth=m;b.drawYear=v;w=this._get(b,"prevText");w=!n?w:this.formatDate(w,this._daylightSavingAdjust(new Date(v,m-p,1)),this._getFormatConfig(b));
w=this._canAdjustMonth(b,-1,v,m)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+g+".datepicker._adjustDate('#"+b.id+"', -"+p+", 'M');\" title=\""+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>":o?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+w+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"e":"w")+'">'+w+"</span></a>";var x=this._get(b,"nextText");x=!n?x:this.formatDate(x,this._daylightSavingAdjust(new Date(v,
m+p,1)),this._getFormatConfig(b));o=this._canAdjustMonth(b,+1,v,m)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+g+".datepicker._adjustDate('#"+b.id+"', +"+p+", 'M');\" title=\""+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>":o?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+x+'"><span class="ui-icon ui-icon-circle-triangle-'+(j?"w":"e")+'">'+x+"</span></a>";p=this._get(b,"currentText");x=this._get(b,"gotoCurrent")&&
b.currentDay?s:f;p=!n?p:this.formatDate(p,x,this._getFormatConfig(b));n=!b.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+g+'.datepicker._hideDatepicker();">'+this._get(b,"closeText")+"</button>":"";l=l?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(j?n:"")+(this._isInRange(b,x)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+
g+".datepicker._gotoToday('#"+b.id+"');\">"+p+"</button>":"")+(j?"":n)+"</div>":"";n=parseInt(this._get(b,"firstDay"),10);n=isNaN(n)?0:n;p=this._get(b,"showWeek");x=this._get(b,"dayNames");this._get(b,"dayNamesShort");var y=this._get(b,"dayNamesMin"),H=this._get(b,"monthNames"),C=this._get(b,"monthNamesShort"),z=this._get(b,"beforeShowDay"),I=this._get(b,"showOtherMonths"),N=this._get(b,"selectOtherMonths");this._get(b,"calculateWeek");for(var J=this._getDefaultDate(b),D="",E=0;E<k[0];E++){var P=
"";this.maxRows=4;for(var L=0;L<k[1];L++){var Q=this._daylightSavingAdjust(new Date(v,m,b.selectedDay)),B=" ui-corner-all",F="";if(q){F+='<div class="ui-datepicker-group';if(k[1]>1)switch(L){case 0:F+=" ui-datepicker-group-first";B=" ui-corner-"+(j?"right":"left");break;case k[1]-1:F+=" ui-datepicker-group-last";B=" ui-corner-"+(j?"left":"right");break;default:F+=" ui-datepicker-group-middle";B="";break}F+='">'}F+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+B+'">'+(/all|left/.test(B)&&
E==0?j?o:w:"")+(/all|right/.test(B)&&E==0?j?w:o:"")+this._generateMonthYearHeader(b,m,v,r,u,E>0||L>0,H,C)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var G=p?'<th class="ui-datepicker-week-col">'+this._get(b,"weekHeader")+"</th>":"";for(B=0;B<7;B++){var A=(B+n)%7;G+="<th"+((B+n+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+x[A]+'">'+y[A]+"</span></th>"}F+=G+"</tr></thead><tbody>";G=this._getDaysInMonth(v,m);if(v==b.selectedYear&&m==b.selectedMonth)b.selectedDay=Math.min(b.selectedDay,
G);B=(this._getFirstDayOfMonth(v,m)-n+7)%7;G=Math.ceil((B+G)/7);this.maxRows=G=q?this.maxRows>G?this.maxRows:G:G;A=this._daylightSavingAdjust(new Date(v,m,1-B));for(var R=0;R<G;R++){F+="<tr>";var S=!p?"":'<td class="ui-datepicker-week-col">'+this._get(b,"calculateWeek")(A)+"</td>";for(B=0;B<7;B++){var M=z?z.apply(b.input?b.input[0]:null,[A]):[true,""],K=A.getMonth()!=m,O=K&&!N||!M[0]||r&&A<r||u&&A>u;S+='<td class="'+((B+n+6)%7>=5?" ui-datepicker-week-end":"")+(K?" ui-datepicker-other-month":"")+(A.getTime()==
Q.getTime()&&m==b.selectedMonth&&b._keyEvent||J.getTime()==A.getTime()&&J.getTime()==Q.getTime()?" "+this._dayOverClass:"")+(O?" "+this._unselectableClass+" ui-state-disabled":"")+(K&&!I?"":" "+M[1]+(A.getTime()==s.getTime()?" "+this._currentClass:"")+(A.getTime()==f.getTime()?" ui-datepicker-today":""))+'"'+((!K||I)&&M[2]?' title="'+M[2]+'"':"")+(O?"":' onclick="DP_jQuery_'+g+".datepicker._selectDay('#"+b.id+"',"+A.getMonth()+","+A.getFullYear()+', this);return false;"')+">"+(K&&!I?"&#xa0;":O?'<span class="ui-state-default">'+
A.getDate()+"</span>":'<a class="ui-state-default'+(A.getTime()==f.getTime()?" ui-state-highlight":"")+(A.getTime()==s.getTime()?" ui-state-active":"")+(K?" ui-priority-secondary":"")+'" href="#">'+A.getDate()+"</a>")+"</td>";A.setDate(A.getDate()+1);A=this._daylightSavingAdjust(A)}F+=S+"</tr>"}m++;if(m>11){m=0;v++}F+="</tbody></table>"+(q?"</div>"+(k[0]>0&&L==k[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");P+=F}D+=P}D+=l+(a.browser.msie&&parseInt(a.browser.version,10)<7&&!b.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':
"");b._keyEvent=false;return D},_generateMonthYearHeader:function(b,f,j,l,o,n,k,m){var p=this._get(b,"changeMonth"),q=this._get(b,"changeYear"),s=this._get(b,"showMonthAfterYear"),r='<div class="ui-datepicker-title">',u="";if(n||!p)u+='<span class="ui-datepicker-month">'+k[f]+"</span>";else{k=l&&l.getFullYear()==j;var v=o&&o.getFullYear()==j;u+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+g+".datepicker._selectMonthYear('#"+b.id+"', this, 'M');\" >";for(var w=0;w<12;w++)if((!k||w>=l.getMonth())&&
(!v||w<=o.getMonth()))u+='<option value="'+w+'"'+(w==f?' selected="selected"':"")+">"+m[w]+"</option>";u+="</select>"}s||(r+=u+(n||!(p&&q)?"&#xa0;":""));if(!b.yearshtml){b.yearshtml="";if(n||!q)r+='<span class="ui-datepicker-year">'+j+"</span>";else{m=this._get(b,"yearRange").split(":");var x=(new Date).getFullYear();k=function(y){y=y.match(/c[+-].*/)?j+parseInt(y.substring(1),10):y.match(/[+-].*/)?x+parseInt(y,10):parseInt(y,10);return isNaN(y)?x:y};f=k(m[0]);m=Math.max(f,k(m[1]||""));f=l?Math.max(f,
l.getFullYear()):f;m=o?Math.min(m,o.getFullYear()):m;for(b.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+g+".datepicker._selectMonthYear('#"+b.id+"', this, 'Y');\" >";f<=m;f++)b.yearshtml+='<option value="'+f+'"'+(f==j?' selected="selected"':"")+">"+f+"</option>";b.yearshtml+="</select>";r+=b.yearshtml;b.yearshtml=null}}r+=this._get(b,"yearSuffix");if(s)r+=(n||!(p&&q)?"&#xa0;":"")+u;r+="</div>";return r},_adjustInstDate:function(b,f,j){var l=b.drawYear+(j=="Y"?f:0),o=b.drawMonth+
(j=="M"?f:0);f=Math.min(b.selectedDay,this._getDaysInMonth(l,o))+(j=="D"?f:0);l=this._restrictMinMax(b,this._daylightSavingAdjust(new Date(l,o,f)));b.selectedDay=l.getDate();b.drawMonth=b.selectedMonth=l.getMonth();b.drawYear=b.selectedYear=l.getFullYear();if(j=="M"||j=="Y")this._notifyChange(b)},_restrictMinMax:function(b,f){var j=this._getMinMaxDate(b,"min");b=this._getMinMaxDate(b,"max");f=j&&f<j?j:f;return f=b&&f>b?b:f},_notifyChange:function(b){var f=this._get(b,"onChangeMonthYear");if(f)f.apply(b.input?
b.input[0]:null,[b.selectedYear,b.selectedMonth+1,b])},_getNumberOfMonths:function(b){b=this._get(b,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(b,f){return this._determineDate(b,this._get(b,f+"Date"),null)},_getDaysInMonth:function(b,f){return 32-this._daylightSavingAdjust(new Date(b,f,32)).getDate()},_getFirstDayOfMonth:function(b,f){return(new Date(b,f,1)).getDay()},_canAdjustMonth:function(b,f,j,l){var o=this._getNumberOfMonths(b);j=this._daylightSavingAdjust(new Date(j,
l+(f<0?f:o[0]*o[1]),1));f<0&&j.setDate(this._getDaysInMonth(j.getFullYear(),j.getMonth()));return this._isInRange(b,j)},_isInRange:function(b,f){var j=this._getMinMaxDate(b,"min");b=this._getMinMaxDate(b,"max");return(!j||f.getTime()>=j.getTime())&&(!b||f.getTime()<=b.getTime())},_getFormatConfig:function(b){var f=this._get(b,"shortYearCutoff");f=typeof f!="string"?f:(new Date).getFullYear()%100+parseInt(f,10);return{shortYearCutoff:f,dayNamesShort:this._get(b,"dayNamesShort"),dayNames:this._get(b,
"dayNames"),monthNamesShort:this._get(b,"monthNamesShort"),monthNames:this._get(b,"monthNames")}},_formatDate:function(b,f,j,l){if(!f){b.currentDay=b.selectedDay;b.currentMonth=b.selectedMonth;b.currentYear=b.selectedYear}f=f?typeof f=="object"?f:this._daylightSavingAdjust(new Date(l,j,f)):this._daylightSavingAdjust(new Date(b.currentYear,b.currentMonth,b.currentDay));return this.formatDate(this._get(b,"dateFormat"),f,this._getFormatConfig(b))}});a.fn.datepicker=function(b){if(!this.length)return this;
if(!a.datepicker.initialized){a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);a.datepicker.initialized=true}var f=Array.prototype.slice.call(arguments,1);if(typeof b=="string"&&(b=="isDisabled"||b=="getDate"||b=="widget"))return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(f));if(b=="option"&&arguments.length==2&&typeof arguments[1]=="string")return a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(f));return this.each(function(){typeof b==
"string"?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this].concat(f)):a.datepicker._attachDatepicker(this,b)})};a.datepicker=new c;a.datepicker.initialized=false;a.datepicker.uuid=(new Date).getTime();a.datepicker.version="1.8.16";window["DP_jQuery_"+g]=a})(jQuery);
(function(a,d){var c={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},e={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},h=a.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};a.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,
position:{my:"center",at:"center",collision:"fit",using:function(g){var i=a(this).css(g).offset().top;i<0&&a(this).css("top",g.top-i)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var g=this,i=g.options,b=i.title||"&#160;",f=a.ui.dialog.getTitleId(g.element),j=(g.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+
i.dialogClass).css({zIndex:i.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){if(i.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===a.ui.keyCode.ESCAPE){g.close(n);n.preventDefault()}}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(n){g.moveToTop(false,n)});g.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j);var l=(g.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j),
o=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){o.addClass("ui-state-hover")},function(){o.removeClass("ui-state-hover")}).focus(function(){o.addClass("ui-state-focus")}).blur(function(){o.removeClass("ui-state-focus")}).click(function(n){g.close(n);return false}).appendTo(l);(g.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(o);a("<span></span>").addClass("ui-dialog-title").attr("id",
f).html(b).prependTo(l);if(a.isFunction(i.beforeclose)&&!a.isFunction(i.beforeClose))i.beforeClose=i.beforeclose;l.find("*").add(l).disableSelection();i.draggable&&a.fn.draggable&&g._makeDraggable();i.resizable&&a.fn.resizable&&g._makeResizable();g._createButtons(i.buttons);g._isOpen=false;a.fn.bgiframe&&j.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var g=this;g.overlay&&g.overlay.destroy();g.uiDialog.hide();g.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
g.uiDialog.remove();g.originalTitle&&g.element.attr("title",g.originalTitle);return g},widget:function(){return this.uiDialog},close:function(g){var i=this,b,f;if(false!==i._trigger("beforeClose",g)){i.overlay&&i.overlay.destroy();i.uiDialog.unbind("keypress.ui-dialog");i._isOpen=false;if(i.options.hide)i.uiDialog.hide(i.options.hide,function(){i._trigger("close",g)});else{i.uiDialog.hide();i._trigger("close",g)}a.ui.dialog.overlay.resize();if(i.options.modal){b=0;a(".ui-dialog").each(function(){if(this!==
i.uiDialog[0]){f=a(this).css("z-index");isNaN(f)||(b=Math.max(b,f))}});a.ui.dialog.maxZ=b}return i}},isOpen:function(){return this._isOpen},moveToTop:function(g,i){var b=this,f=b.options;if(f.modal&&!g||!f.stack&&!f.modal)return b._trigger("focus",i);if(f.zIndex>a.ui.dialog.maxZ)a.ui.dialog.maxZ=f.zIndex;if(b.overlay){a.ui.dialog.maxZ+=1;b.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)}g={scrollTop:b.element.scrollTop(),scrollLeft:b.element.scrollLeft()};a.ui.dialog.maxZ+=1;
b.uiDialog.css("z-index",a.ui.dialog.maxZ);b.element.attr(g);b._trigger("focus",i);return b},open:function(){if(!this._isOpen){var g=this,i=g.options,b=g.uiDialog;g.overlay=i.modal?new a.ui.dialog.overlay(g):null;g._size();g._position(i.position);b.show(i.show);g.moveToTop(true);i.modal&&b.bind("keypress.ui-dialog",function(f){if(f.keyCode===a.ui.keyCode.TAB){var j=a(":tabbable",this),l=j.filter(":first");j=j.filter(":last");if(f.target===j[0]&&!f.shiftKey){l.focus(1);return false}else if(f.target===
l[0]&&f.shiftKey){j.focus(1);return false}}});a(g.element.find(":tabbable").get().concat(b.find(".ui-dialog-buttonpane :tabbable").get().concat(b.get()))).eq(0).focus();g._isOpen=true;g._trigger("open");return g}},_createButtons:function(g){var i=this,b=false,f=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),j=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);i.uiDialog.find(".ui-dialog-buttonpane").remove();typeof g==="object"&&g!==null&&a.each(g,
function(){return!(b=true)});if(b){a.each(g,function(l,o){o=a.isFunction(o)?{click:o,text:l}:o;var n=a('<button type="button"></button>').click(function(){o.click.apply(i.element[0],arguments)}).appendTo(j);a.each(o,function(k,m){if(k!=="click")k in h?n[k](m):n.attr(k,m)});a.fn.button&&n.button()});f.appendTo(i.uiDialog)}},_makeDraggable:function(){function g(l){return{position:l.position,offset:l.offset}}var i=this,b=i.options,f=a(document),j;i.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
handle:".ui-dialog-titlebar",containment:"document",start:function(l,o){j=b.height==="auto"?"auto":a(this).height();a(this).height(a(this).height()).addClass("ui-dialog-dragging");i._trigger("dragStart",l,g(o))},drag:function(l,o){i._trigger("drag",l,g(o))},stop:function(l,o){b.position=[o.position.left-f.scrollLeft(),o.position.top-f.scrollTop()];a(this).removeClass("ui-dialog-dragging").height(j);i._trigger("dragStop",l,g(o));a.ui.dialog.overlay.resize()}})},_makeResizable:function(g){function i(l){return{originalPosition:l.originalPosition,
originalSize:l.originalSize,position:l.position,size:l.size}}g=g===d?this.options.resizable:g;var b=this,f=b.options,j=b.uiDialog.css("position");g=typeof g==="string"?g:"n,e,s,w,se,sw,ne,nw";b.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:b.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:b._minHeight(),handles:g,start:function(l,o){a(this).addClass("ui-dialog-resizing");b._trigger("resizeStart",l,i(o))},resize:function(l,o){b._trigger("resize",
l,i(o))},stop:function(l,o){a(this).removeClass("ui-dialog-resizing");f.height=a(this).height();f.width=a(this).width();b._trigger("resizeStop",l,i(o));a.ui.dialog.overlay.resize()}}).css("position",j).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var g=this.options;return g.height==="auto"?g.minHeight:Math.min(g.minHeight,g.height)},_position:function(g){var i=[],b=[0,0],f;if(g){if(typeof g==="string"||typeof g==="object"&&"0"in g){i=g.split?g.split(" "):
[g[0],g[1]];if(i.length===1)i[1]=i[0];a.each(["left","top"],function(j,l){if(+i[j]===i[j]){b[j]=i[j];i[j]=l}});g={my:i.join(" "),at:i.join(" "),offset:b.join(" ")}}g=a.extend({},a.ui.dialog.prototype.options.position,g)}else g=a.ui.dialog.prototype.options.position;(f=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},g));f||this.uiDialog.hide()},_setOptions:function(g){var i=this,b={},f=false;a.each(g,function(j,l){i._setOption(j,l);
if(j in c)f=true;if(j in e)b[j]=l});f&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",b)},_setOption:function(g,i){var b=this,f=b.uiDialog;switch(g){case "beforeclose":g="beforeClose";break;case "buttons":b._createButtons(i);break;case "closeText":b.uiDialogTitlebarCloseText.text(""+i);break;case "dialogClass":f.removeClass(b.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+i);break;case "disabled":i?f.addClass("ui-dialog-disabled"):
f.removeClass("ui-dialog-disabled");break;case "draggable":var j=f.is(":data(draggable)");j&&!i&&f.draggable("destroy");!j&&i&&b._makeDraggable();break;case "position":b._position(i);break;case "resizable":(j=f.is(":data(resizable)"))&&!i&&f.resizable("destroy");j&&typeof i==="string"&&f.resizable("option","handles",i);!j&&i!==false&&b._makeResizable(i);break;case "title":a(".ui-dialog-title",b.uiDialogTitlebar).html(""+(i||"&#160;"));break}a.Widget.prototype._setOption.apply(b,arguments)},_size:function(){var g=
this.options,i,b,f=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(g.minWidth>g.width)g.width=g.minWidth;i=this.uiDialog.css({height:"auto",width:g.width}).height();b=Math.max(0,g.minHeight-i);if(g.height==="auto")if(a.support.minHeight)this.element.css({minHeight:b,height:"auto"});else{this.uiDialog.show();g=this.element.css("height","auto").height();f||this.uiDialog.hide();this.element.height(Math.max(g,b))}else this.element.height(Math.max(g.height-
i,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});a.extend(a.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function(g){g=g.attr("id");if(!g){this.uuid+=1;g=this.uuid}return"ui-dialog-title-"+g},overlay:function(g){this.$el=a.ui.dialog.overlay.create(g)}});a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(g){return g+".dialog-overlay"}).join(" "),
create:function(g){if(this.instances.length===0){setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return false})},1);a(document).bind("keydown.dialog-overlay",function(b){if(g.options.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===a.ui.keyCode.ESCAPE){g.close(b);b.preventDefault()}});a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize)}var i=(this.oldInstances.pop()||
a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&i.bgiframe();this.instances.push(i);return i},destroy:function(g){var i=a.inArray(g,this.instances);i!=-1&&this.oldInstances.push(this.instances.splice(i,1)[0]);this.instances.length===0&&a([document,window]).unbind(".dialog-overlay");g.remove();var b=0;a.each(this.instances,function(){b=Math.max(b,this.css("z-index"))});this.maxZ=b},height:function(){var g,i;if(a.browser.msie&&
a.browser.version<7){g=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);i=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return g<i?a(window).height()+"px":g+"px"}else return a(document).height()+"px"},width:function(){var g,i;if(a.browser.msie){g=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);i=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return g<i?a(window).width()+"px":g+"px"}else return a(document).width()+
"px"},resize:function(){var g=a([]);a.each(a.ui.dialog.overlay.instances,function(){g=g.add(this)});g.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}});a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
(function(a){a.ui=a.ui||{};var d=/left|center|right/,c=/top|center|bottom/,e=a.fn.position,h=a.fn.offset;a.fn.position=function(g){if(!g||!g.of)return e.apply(this,arguments);g=a.extend({},g);var i=a(g.of),b=i[0],f=(g.collision||"flip").split(" "),j=g.offset?g.offset.split(" "):[0,0],l,o,n;if(b.nodeType===9){l=i.width();o=i.height();n={top:0,left:0}}else if(b.setTimeout){l=i.width();o=i.height();n={top:i.scrollTop(),left:i.scrollLeft()}}else if(b.preventDefault){g.at="left top";l=o=0;n={top:g.of.pageY,
left:g.of.pageX}}else{l=i.outerWidth();o=i.outerHeight();n=i.offset()}a.each(["my","at"],function(){var k=(g[this]||"").split(" ");if(k.length===1)k=d.test(k[0])?k.concat(["center"]):c.test(k[0])?["center"].concat(k):["center","center"];k[0]=d.test(k[0])?k[0]:"center";k[1]=c.test(k[1])?k[1]:"center";g[this]=k});if(f.length===1)f[1]=f[0];j[0]=parseInt(j[0],10)||0;if(j.length===1)j[1]=j[0];j[1]=parseInt(j[1],10)||0;if(g.at[0]==="right")n.left+=l;else if(g.at[0]==="center")n.left+=l/2;if(g.at[1]==="bottom")n.top+=
o;else if(g.at[1]==="center")n.top+=o/2;n.left+=j[0];n.top+=j[1];return this.each(function(){var k=a(this),m=k.outerWidth(),p=k.outerHeight(),q=parseInt(a.curCSS(this,"marginLeft",true))||0,s=parseInt(a.curCSS(this,"marginTop",true))||0,r=m+q+(parseInt(a.curCSS(this,"marginRight",true))||0),u=p+s+(parseInt(a.curCSS(this,"marginBottom",true))||0),v=a.extend({},n),w;if(g.my[0]==="right")v.left-=m;else if(g.my[0]==="center")v.left-=m/2;if(g.my[1]==="bottom")v.top-=p;else if(g.my[1]==="center")v.top-=
p/2;v.left=Math.round(v.left);v.top=Math.round(v.top);w={left:v.left-q,top:v.top-s};a.each(["left","top"],function(x,y){a.ui.position[f[x]]&&a.ui.position[f[x]][y](v,{targetWidth:l,targetHeight:o,elemWidth:m,elemHeight:p,collisionPosition:w,collisionWidth:r,collisionHeight:u,offset:j,my:g.my,at:g.at})});a.fn.bgiframe&&k.bgiframe();k.offset(a.extend(v,{using:g.using}))})};a.ui.position={fit:{left:function(g,i){var b=a(window);b=i.collisionPosition.left+i.collisionWidth-b.width()-b.scrollLeft();g.left=
b>0?g.left-b:Math.max(g.left-i.collisionPosition.left,g.left)},top:function(g,i){var b=a(window);b=i.collisionPosition.top+i.collisionHeight-b.height()-b.scrollTop();g.top=b>0?g.top-b:Math.max(g.top-i.collisionPosition.top,g.top)}},flip:{left:function(g,i){if(i.at[0]!=="center"){var b=a(window);b=i.collisionPosition.left+i.collisionWidth-b.width()-b.scrollLeft();var f=i.my[0]==="left"?-i.elemWidth:i.my[0]==="right"?i.elemWidth:0,j=i.at[0]==="left"?i.targetWidth:-i.targetWidth,l=-2*i.offset[0];g.left+=
i.collisionPosition.left<0?f+j+l:b>0?f+j+l:0}},top:function(g,i){if(i.at[1]!=="center"){var b=a(window);b=i.collisionPosition.top+i.collisionHeight-b.height()-b.scrollTop();var f=i.my[1]==="top"?-i.elemHeight:i.my[1]==="bottom"?i.elemHeight:0,j=i.at[1]==="top"?i.targetHeight:-i.targetHeight,l=-2*i.offset[1];g.top+=i.collisionPosition.top<0?f+j+l:b>0?f+j+l:0}}}};if(!a.offset.setOffset){a.offset.setOffset=function(g,i){if(/static/.test(a.curCSS(g,"position")))g.style.position="relative";var b=a(g),
f=b.offset(),j=parseInt(a.curCSS(g,"top",true),10)||0,l=parseInt(a.curCSS(g,"left",true),10)||0;f={top:i.top-f.top+j,left:i.left-f.left+l};"using"in i?i.using.call(g,f):b.css(f)};a.fn.offset=function(g){var i=this[0];if(!i||!i.ownerDocument)return null;if(g)return this.each(function(){a.offset.setOffset(this,g)});return h.call(this)}}})(jQuery);
(function(a,d){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();a.Widget.prototype.destroy.apply(this,arguments)},value:function(c){if(c===d)return this._value();this._setOption("value",c);return this},_setOption:function(c,e){if(c==="value"){this.options.value=e;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var c=this.options.value;if(typeof c!=="number")c=0;return Math.min(this.options.max,Math.max(this.min,c))},_percentage:function(){return 100*
this._value()/this.options.max},_refreshValue:function(){var c=this.value(),e=this._percentage();if(this.oldValue!==c){this.oldValue=c;this._trigger("change")}this.valueDiv.toggle(c>this.min).toggleClass("ui-corner-right",c===this.options.max).width(e.toFixed(0)+"%");this.element.attr("aria-valuenow",c)}});a.extend(a.ui.progressbar,{version:"1.8.16"})})(jQuery);
(function(a){a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var d=this,c=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),h=c.values&&c.values.length||1,g=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+
this.orientation+" ui-widget ui-widget-content ui-corner-all"+(c.disabled?" ui-slider-disabled ui-disabled":""));this.range=a([]);if(c.range){if(c.range===true){if(!c.values)c.values=[this._valueMin(),this._valueMin()];if(c.values.length&&c.values.length!==2)c.values=[c.values[0],c.values[0]]}this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(c.range==="min"||c.range==="max"?" ui-slider-range-"+c.range:""))}for(var i=e.length;i<h;i+=1)g.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
this.handles=e.add(a(g.join("")).appendTo(d.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(b){b.preventDefault()}).hover(function(){c.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){if(c.disabled)a(this).blur();else{a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(b){a(this).data("index.ui-slider-handle",
b)});this.handles.keydown(function(b){var f=true,j=a(this).data("index.ui-slider-handle"),l,o,n;if(!d.options.disabled){switch(b.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!d._keySliding){d._keySliding=true;a(this).addClass("ui-state-active");l=d._start(b,j);if(l===false)return}break}n=d.options.step;l=d.options.values&&d.options.values.length?
(o=d.values(j)):(o=d.value());switch(b.keyCode){case a.ui.keyCode.HOME:o=d._valueMin();break;case a.ui.keyCode.END:o=d._valueMax();break;case a.ui.keyCode.PAGE_UP:o=d._trimAlignValue(l+(d._valueMax()-d._valueMin())/5);break;case a.ui.keyCode.PAGE_DOWN:o=d._trimAlignValue(l-(d._valueMax()-d._valueMin())/5);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(l===d._valueMax())return;o=d._trimAlignValue(l+n);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(l===d._valueMin())return;o=d._trimAlignValue(l-
n);break}d._slide(b,j,o);return f}}).keyup(function(b){var f=a(this).data("index.ui-slider-handle");if(d._keySliding){d._keySliding=false;d._stop(b,f);d._change(b,f);a(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();
return this},_mouseCapture:function(d){var c=this.options,e,h,g,i,b;if(c.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();e=this._normValueFromMouse({x:d.pageX,y:d.pageY});h=this._valueMax()-this._valueMin()+1;i=this;this.handles.each(function(f){var j=Math.abs(e-i.values(f));if(h>j){h=j;g=a(this);b=f}});if(c.range===true&&this.values(1)===c.min){b+=1;g=a(this.handles[b])}if(this._start(d,b)===false)return false;
this._mouseSliding=true;i._handleIndex=b;g.addClass("ui-state-active").focus();c=g.offset();this._clickOffset=!a(d.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:d.pageX-c.left-g.width()/2,top:d.pageY-c.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(d,b,e);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(d){var c=
this._normValueFromMouse({x:d.pageX,y:d.pageY});this._slide(d,this._handleIndex,c);return false},_mouseStop:function(d){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(d,this._handleIndex);this._change(d,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c;if(this.orientation==="horizontal"){c=
this.elementSize.width;d=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;d=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}c=d/c;if(c>1)c=1;if(c<0)c=0;if(this.orientation==="vertical")c=1-c;d=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+c*d)},_start:function(d,c){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);
e.values=this.values()}return this._trigger("start",d,e)},_slide:function(d,c,e){var h;if(this.options.values&&this.options.values.length){h=this.values(c?0:1);if(this.options.values.length===2&&this.options.range===true&&(c===0&&e>h||c===1&&e<h))e=h;if(e!==this.values(c)){h=this.values();h[c]=e;d=this._trigger("slide",d,{handle:this.handles[c],value:e,values:h});this.values(c?0:1);d!==false&&this.values(c,e,true)}}else if(e!==this.value()){d=this._trigger("slide",d,{handle:this.handles[c],value:e});
d!==false&&this.value(e)}},_stop:function(d,c){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);e.values=this.values()}this._trigger("stop",d,e)},_change:function(d,c){if(!this._keySliding&&!this._mouseSliding){var e={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(c);e.values=this.values()}this._trigger("change",d,e)}},value:function(d){if(arguments.length){this.options.value=
this._trimAlignValue(d);this._refreshValue();this._change(null,0)}else return this._value()},values:function(d,c){var e,h,g;if(arguments.length>1){this.options.values[d]=this._trimAlignValue(c);this._refreshValue();this._change(null,d)}else if(arguments.length)if(a.isArray(arguments[0])){e=this.options.values;h=arguments[0];for(g=0;g<e.length;g+=1){e[g]=this._trimAlignValue(h[g]);this._change(null,g)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(d):
this.value();else return this._values()},_setOption:function(d,c){var e,h=0;if(a.isArray(this.options.values))h=this.options.values.length;a.Widget.prototype._setOption.apply(this,arguments);switch(d){case "disabled":if(c){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.propAttr("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.propAttr("disabled",false);this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(e=0;e<h;e+=1)this._change(null,e);this._animateOff=false;break}},_value:function(){var d=this.options.value;return d=this._trimAlignValue(d)},_values:function(d){var c,e;if(arguments.length){c=this.options.values[d];
return c=this._trimAlignValue(c)}else{c=this.options.values.slice();for(e=0;e<c.length;e+=1)c[e]=this._trimAlignValue(c[e]);return c}},_trimAlignValue:function(d){if(d<=this._valueMin())return this._valueMin();if(d>=this._valueMax())return this._valueMax();var c=this.options.step>0?this.options.step:1,e=(d-this._valueMin())%c;d=d-e;if(Math.abs(e)*2>=c)d+=e>0?c:-c;return parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var d=
this.options.range,c=this.options,e=this,h=!this._animateOff?c.animate:false,g,i={},b,f,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(o){g=(e.values(o)-e._valueMin())/(e._valueMax()-e._valueMin())*100;i[e.orientation==="horizontal"?"left":"bottom"]=g+"%";a(this).stop(1,1)[h?"animate":"css"](i,c.animate);if(e.options.range===true)if(e.orientation==="horizontal"){if(o===0)e.range.stop(1,1)[h?"animate":"css"]({left:g+"%"},c.animate);if(o===1)e.range[h?"animate":"css"]({width:g-
b+"%"},{queue:false,duration:c.animate})}else{if(o===0)e.range.stop(1,1)[h?"animate":"css"]({bottom:g+"%"},c.animate);if(o===1)e.range[h?"animate":"css"]({height:g-b+"%"},{queue:false,duration:c.animate})}b=g});else{f=this.value();j=this._valueMin();l=this._valueMax();g=l!==j?(f-j)/(l-j)*100:0;i[e.orientation==="horizontal"?"left":"bottom"]=g+"%";this.handle.stop(1,1)[h?"animate":"css"](i,c.animate);if(d==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[h?"animate":"css"]({width:g+"%"},
c.animate);if(d==="max"&&this.orientation==="horizontal")this.range[h?"animate":"css"]({width:100-g+"%"},{queue:false,duration:c.animate});if(d==="min"&&this.orientation==="vertical")this.range.stop(1,1)[h?"animate":"css"]({height:g+"%"},c.animate);if(d==="max"&&this.orientation==="vertical")this.range[h?"animate":"css"]({height:100-g+"%"},{queue:false,duration:c.animate})}}});a.extend(a.ui.slider,{version:"1.8.16"})})(jQuery);
(function(a,d){function c(){return++h}function e(){return++g}var h=0,g=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(i,b){if(i=="selected")this.options.collapsible&&
b==this.options.selected||this.select(b);else{this.options[i]=b;this._tabify()}},_tabId:function(i){return i.title&&i.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+c()},_sanitizeSelector:function(i){return i.replace(/:/g,"\\:")},_cookie:function(){var i=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+e());return a.cookie.apply(null,[i].concat(a.makeArray(arguments)))},_ui:function(i,b){return{tab:i,panel:b,index:this.anchors.index(i)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var i=
a(this);i.html(i.data("label.tabs")).removeData("label.tabs")})},_tabify:function(i){function b(r,u){r.css("display","");!a.support.opacity&&u.opacity&&r[0].style.removeAttribute("filter")}var f=this,j=this.options,l=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=a(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);this.anchors.each(function(r,u){var v=a(u).attr("href"),w=v.split("#")[0],x;if(w&&(w===location.toString().split("#")[0]||
(x=a("base")[0])&&w===x.href)){v=u.hash;u.href=v}if(l.test(v))f.panels=f.panels.add(f.element.find(f._sanitizeSelector(v)));else if(v&&v!=="#"){a.data(u,"href.tabs",v);a.data(u,"load.tabs",v.replace(/#.*$/,""));v=f._tabId(u);u.href="#"+v;u=f.element.find("#"+v);if(!u.length){u=a(j.panelTemplate).attr("id",v).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(f.panels[r-1]||f.list);u.data("destroy.tabs",true)}f.panels=f.panels.add(u)}else j.disabled.push(r)});if(i){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(j.selected===d){location.hash&&this.anchors.each(function(r,u){if(u.hash==location.hash){j.selected=r;return false}});if(typeof j.selected!=="number"&&j.cookie)j.selected=parseInt(f._cookie(),10);if(typeof j.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)j.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));j.selected=j.selected||(this.lis.length?0:-1)}else if(j.selected===null)j.selected=-1;j.selected=j.selected>=0&&this.anchors[j.selected]||j.selected<0?j.selected:0;j.disabled=a.unique(j.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(r){return f.lis.index(r)}))).sort();a.inArray(j.selected,j.disabled)!=-1&&j.disabled.splice(a.inArray(j.selected,j.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(j.selected>=0&&this.anchors.length){f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(j.selected).addClass("ui-tabs-selected ui-state-active");f.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[j.selected],f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash))[0]))});this.load(j.selected)}a(window).bind("unload",function(){f.lis.add(f.anchors).unbind(".tabs");f.lis=f.anchors=f.panels=null})}else j.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));
this.element[j.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");j.cookie&&this._cookie(j.selected,j.cookie);i=0;for(var o;o=this.lis[i];i++)a(o)[a.inArray(i,j.disabled)!=-1&&!a(o).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");j.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(j.event!=="mouseover"){var n=function(r,u){u.is(":not(.ui-state-disabled)")&&u.addClass("ui-state-"+r)},k=function(r,u){u.removeClass("ui-state-"+
r)};this.lis.bind("mouseover.tabs",function(){n("hover",a(this))});this.lis.bind("mouseout.tabs",function(){k("hover",a(this))});this.anchors.bind("focus.tabs",function(){n("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){k("focus",a(this).closest("li"))})}var m,p;if(j.fx)if(a.isArray(j.fx)){m=j.fx[0];p=j.fx[1]}else m=p=j.fx;var q=p?function(r,u){a(r).closest("li").addClass("ui-tabs-selected ui-state-active");u.hide().removeClass("ui-tabs-hide").animate(p,p.duration||"normal",
function(){b(u,p);f._trigger("show",null,f._ui(r,u[0]))})}:function(r,u){a(r).closest("li").addClass("ui-tabs-selected ui-state-active");u.removeClass("ui-tabs-hide");f._trigger("show",null,f._ui(r,u[0]))},s=m?function(r,u){u.animate(m,m.duration||"normal",function(){f.lis.removeClass("ui-tabs-selected ui-state-active");u.addClass("ui-tabs-hide");b(u,m);f.element.dequeue("tabs")})}:function(r,u){f.lis.removeClass("ui-tabs-selected ui-state-active");u.addClass("ui-tabs-hide");f.element.dequeue("tabs")};
this.anchors.bind(j.event+".tabs",function(){var r=this,u=a(r).closest("li"),v=f.panels.filter(":not(.ui-tabs-hide)"),w=f.element.find(f._sanitizeSelector(r.hash));if(u.hasClass("ui-tabs-selected")&&!j.collapsible||u.hasClass("ui-state-disabled")||u.hasClass("ui-state-processing")||f.panels.filter(":animated").length||f._trigger("select",null,f._ui(this,w[0]))===false){this.blur();return false}j.selected=f.anchors.index(this);f.abort();if(j.collapsible)if(u.hasClass("ui-tabs-selected")){j.selected=
-1;j.cookie&&f._cookie(j.selected,j.cookie);f.element.queue("tabs",function(){s(r,v)}).dequeue("tabs");this.blur();return false}else if(!v.length){j.cookie&&f._cookie(j.selected,j.cookie);f.element.queue("tabs",function(){q(r,w)});f.load(f.anchors.index(this));this.blur();return false}j.cookie&&f._cookie(j.selected,j.cookie);if(w.length){v.length&&f.element.queue("tabs",function(){s(r,v)});f.element.queue("tabs",function(){q(r,w)});f.load(f.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";
a.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(i){if(typeof i=="string")i=this.anchors.index(this.anchors.filter("[href$="+i+"]"));return i},destroy:function(){var i=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var b=
a.data(this,"href.tabs");if(b)this.href=b;var f=a(this).unbind(".tabs");a.each(["href","load","cache"],function(j,l){f.removeData(l+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});i.cookie&&this._cookie(null,i.cookie);return this},add:function(i,
b,f){if(f===d)f=this.anchors.length;var j=this,l=this.options;b=a(l.tabTemplate.replace(/#\{href\}/g,i).replace(/#\{label\}/g,b));i=!i.indexOf("#")?i.replace("#",""):this._tabId(a("a",b)[0]);b.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var o=j.element.find("#"+i);o.length||(o=a(l.panelTemplate).attr("id",i).data("destroy.tabs",true));o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(f>=this.lis.length){b.appendTo(this.list);o.appendTo(this.list[0].parentNode)}else{b.insertBefore(this.lis[f]);
o.insertBefore(this.panels[f])}l.disabled=a.map(l.disabled,function(n){return n>=f?++n:n});this._tabify();if(this.anchors.length==1){l.selected=0;b.addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){j._trigger("show",null,j._ui(j.anchors[0],j.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[f],this.panels[f]));return this},remove:function(i){i=this._getIndex(i);var b=this.options,f=this.lis.eq(i).remove(),j=this.panels.eq(i).remove();
if(f.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(i+(i+1<this.anchors.length?1:-1));b.disabled=a.map(a.grep(b.disabled,function(l){return l!=i}),function(l){return l>=i?--l:l});this._tabify();this._trigger("remove",null,this._ui(f.find("a")[0],j[0]));return this},enable:function(i){i=this._getIndex(i);var b=this.options;if(a.inArray(i,b.disabled)!=-1){this.lis.eq(i).removeClass("ui-state-disabled");b.disabled=a.grep(b.disabled,function(f){return f!=i});this._trigger("enable",null,
this._ui(this.anchors[i],this.panels[i]));return this}},disable:function(i){i=this._getIndex(i);var b=this.options;if(i!=b.selected){this.lis.eq(i).addClass("ui-state-disabled");b.disabled.push(i);b.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[i],this.panels[i]))}return this},select:function(i){i=this._getIndex(i);if(i==-1)if(this.options.collapsible&&this.options.selected!=-1)i=this.options.selected;else return this;this.anchors.eq(i).trigger(this.options.event+".tabs");return this},
load:function(i){i=this._getIndex(i);var b=this,f=this.options,j=this.anchors.eq(i)[0],l=a.data(j,"load.tabs");this.abort();if(!l||this.element.queue("tabs").length!==0&&a.data(j,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(i).addClass("ui-state-processing");if(f.spinner){var o=a("span",j);o.data("label.tabs",o.html()).html(f.spinner)}this.xhr=a.ajax(a.extend({},f.ajaxOptions,{url:l,success:function(n,k){b.element.find(b._sanitizeSelector(j.hash)).html(n);b._cleanup();f.cache&&a.data(j,
"cache.tabs",true);b._trigger("load",null,b._ui(b.anchors[i],b.panels[i]));try{f.ajaxOptions.success(n,k)}catch(m){}},error:function(n,k){b._cleanup();b._trigger("load",null,b._ui(b.anchors[i],b.panels[i]));try{f.ajaxOptions.error(n,k,i,j)}catch(m){}}}));b.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},
url:function(i,b){this.anchors.eq(i).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.8.16"});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(i,b){var f=this,j=this.options,l=f._rotate||(f._rotate=function(o){clearTimeout(f.rotation);f.rotation=setTimeout(function(){var n=j.selected;f.select(++n<f.anchors.length?n:0)},i);o&&o.stopPropagation()});b=f._unrotate||(f._unrotate=!b?function(o){o.clientX&&
f.rotate(null)}:function(){t=j.selected;l()});if(i){this.element.bind("tabsshow",l);this.anchors.bind(j.event+".tabs",b);l()}else{clearTimeout(f.rotation);this.element.unbind("tabsshow",l);this.anchors.unbind(j.event+".tabs",b);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);
/*!
 * jQuery UI Widget 1.8.20
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

// jQuery 1.4+
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			try {
				$( elem ).triggerHandler( "remove" );
			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						try {
							$( this ).triggerHandler( "remove" );
						// http://bugs.jquery.com/ticket/8235
						} catch( e ) {}
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
//	$.each( basePrototype, function( key, val ) {
//		if ( $.isPlainObject(val) ) {
//			basePrototype[ key ] = $.extend( {}, val );
//		}
//	});
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				// TODO: add this back in 1.9 and use $.error() (see #5972)
//				if ( !instance ) {
//					throw "cannot call methods on " + name + " prior to initialization; " +
//						"attempted to call method '" + options + "'";
//				}
//				if ( !$.isFunction( instance[options] ) ) {
//					throw "no such method '" + options + "' for " + name + " widget instance";
//				}
//				var methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	// allow instantiation without initializing for simple inheritance
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		// $.widget.bridge stores the plugin instance, but we do it anyway
		// so that it's stored even before the _create function runs
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
/*!
 * jQuery UI 1.8.20
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function( $, undefined ) {

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.8.20",

	keyCode: {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
});

// plugins
$.fn.extend({
	propAttr: $.fn.prop || $.fn.attr,

	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.each( [ "Width", "Height" ], function( i, name ) {
	var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
		type = name.toLowerCase(),
		orig = {
			innerWidth: $.fn.innerWidth,
			innerHeight: $.fn.innerHeight,
			outerWidth: $.fn.outerWidth,
			outerHeight: $.fn.outerHeight
		};

	function reduce( elem, size, border, margin ) {
		$.each( side, function() {
			size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
			if ( border ) {
				size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
			}
			if ( margin ) {
				size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
			}
		});
		return size;
	}

	$.fn[ "inner" + name ] = function( size ) {
		if ( size === undefined ) {
			return orig[ "inner" + name ].call( this );
		}

		return this.each(function() {
			$( this ).css( type, reduce( this, size ) + "px" );
		});
	};

	$.fn[ "outer" + name] = function( size, margin ) {
		if ( typeof size !== "number" ) {
			return orig[ "outer" + name ].call( this, size );
		}

		return this.each(function() {
			$( this).css( type, reduce( this, size, true, margin ) + "px" );
		});
	};
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		var map = element.parentNode,
			mapName = map.name,
			img;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName )
		? !element.disabled
		: "a" == nodeName
			? element.href || isTabIndexNotNaN
			: isTabIndexNotNaN)
		// the element and all of its ancestors must be visible
		&& visible( element );
}

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.curCSS( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	// access offsetHeight before setting the style to prevent a layout bug
	// in IE 9 which causes the elemnt to continue to take up space even
	// after it is removed from the DOM (#8026)
	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});





// deprecated
$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var proto = $.ui[ module ].prototype;
			for ( var i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode ) {
				return;
			}
	
			for ( var i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},
	
	// will be deprecated when we switch to jQuery 1.4 - use jQuery.contains()
	contains: function( a, b ) {
		return document.compareDocumentPosition ?
			a.compareDocumentPosition( b ) & 16 :
			a !== b && a.contains( b );
	},
	
	// only used by resizable
	hasScroll: function( el, a ) {
	
		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}
	
		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;
	
		if ( el[ scroll ] > 0 ) {
			return true;
		}
	
		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},
	
	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
/*!
 * jQuery UI Tabs 1.8.20
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var tabId = 0,
	listId = 0;

function getNextTabId() {
	return ++tabId;
}

function getNextListId() {
	return ++listId;
}

$.widget( "ui.tabs", {
	options: {
		add: null,
		ajaxOptions: null,
		cache: false,
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		collapsible: false,
		disable: null,
		disabled: [],
		enable: null,
		event: "click",
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
		idPrefix: "ui-tabs-",
		load: null,
		panelTemplate: "<div></div>",
		remove: null,
		select: null,
		show: null,
		spinner: "<em>Loading&#8230;</em>",
		tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
	},

	_create: function() {
		this._tabify( true );
	},

	_setOption: function( key, value ) {
		if ( key == "selected" ) {
			if (this.options.collapsible && value == this.options.selected ) {
				return;
			}
			this.select( value );
		} else {
			this.options[ key ] = value;
			this._tabify();
		}
	},

	_tabId: function( a ) {
		return a.title && a.title.replace( /\s/g, "_" ).replace( /[^\w\u00c0-\uFFFF-]/g, "" ) ||
			this.options.idPrefix + getNextTabId();
	},

	_sanitizeSelector: function( hash ) {
		// we need this because an id may contain a ":"
		return hash.replace( /:/g, "\\:" );
	},

	_cookie: function() {
		var cookie = this.cookie ||
			( this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId() );
		return $.cookie.apply( null, [ cookie ].concat( $.makeArray( arguments ) ) );
	},

	_ui: function( tab, panel ) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index( tab )
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter( ".ui-state-processing" )
			.removeClass( "ui-state-processing" )
			.find( "span:data(label.tabs)" )
				.each(function() {
					var el = $( this );
					el.html( el.data( "label.tabs" ) ).removeData( "label.tabs" );
				});
	},

	_tabify: function( init ) {
		var self = this,
			o = this.options,
			fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash

		this.list = this.element.find( "ol,ul" ).eq( 0 );
		this.lis = $( " > li:has(a[href])", this.list );
		this.anchors = this.lis.map(function() {
			return $( "a", this )[ 0 ];
		});
		this.panels = $( [] );

		this.anchors.each(function( i, a ) {
			var href = $( a ).attr( "href" );
			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split( "#" )[ 0 ],
				baseEl;
			if ( hrefBase && ( hrefBase === location.toString().split( "#" )[ 0 ] ||
					( baseEl = $( "base" )[ 0 ]) && hrefBase === baseEl.href ) ) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if ( fragmentId.test( href ) ) {
				self.panels = self.panels.add( self.element.find( self._sanitizeSelector( href ) ) );
			// remote tab
			// prevent loading the page itself if href is just "#"
			} else if ( href && href !== "#" ) {
				// required for restore on destroy
				$.data( a, "href.tabs", href );

				// TODO until #3808 is fixed strip fragment identifier from url
				// (IE fails to load from such url)
				$.data( a, "load.tabs", href.replace( /#.*$/, "" ) );

				var id = self._tabId( a );
				a.href = "#" + id;
				var $panel = self.element.find( "#" + id );
				if ( !$panel.length ) {
					$panel = $( o.panelTemplate )
						.attr( "id", id )
						.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
						.insertAfter( self.panels[ i - 1 ] || self.list );
					$panel.data( "destroy.tabs", true );
				}
				self.panels = self.panels.add( $panel );
			// invalid tab href
			} else {
				o.disabled.push( i );
			}
		});

		// initialization from scratch
		if ( init ) {
			// attach necessary classes for styling
			this.element.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" );
			this.list.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );
			this.lis.addClass( "ui-state-default ui-corner-top" );
			this.panels.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" );

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if ( o.selected === undefined ) {
				if ( location.hash ) {
					this.anchors.each(function( i, a ) {
						if ( a.hash == location.hash ) {
							o.selected = i;
							return false;
						}
					});
				}
				if ( typeof o.selected !== "number" && o.cookie ) {
					o.selected = parseInt( self._cookie(), 10 );
				}
				if ( typeof o.selected !== "number" && this.lis.filter( ".ui-tabs-selected" ).length ) {
					o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
				}
				o.selected = o.selected || ( this.lis.length ? 0 : -1 );
			} else if ( o.selected === null ) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ( ( o.selected >= 0 && this.anchors[ o.selected ] ) || o.selected < 0 )
				? o.selected
				: 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique( o.disabled.concat(
				$.map( this.lis.filter( ".ui-state-disabled" ), function( n, i ) {
					return self.lis.index( n );
				})
			) ).sort();

			if ( $.inArray( o.selected, o.disabled ) != -1 ) {
				o.disabled.splice( $.inArray( o.selected, o.disabled ), 1 );
			}

			// highlight selected tab
			this.panels.addClass( "ui-tabs-hide" );
			this.lis.removeClass( "ui-tabs-selected ui-state-active" );
			// check for length avoids error when initializing empty list
			if ( o.selected >= 0 && this.anchors.length ) {
				self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) ).removeClass( "ui-tabs-hide" );
				this.lis.eq( o.selected ).addClass( "ui-tabs-selected ui-state-active" );

				// seems to be expected behavior that the show callback is fired
				self.element.queue( "tabs", function() {
					self._trigger( "show", null,
						self._ui( self.anchors[ o.selected ], self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) )[ 0 ] ) );
				});

				this.load( o.selected );
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			// TODO: namespace this event
			$( window ).bind( "unload", function() {
				self.lis.add( self.anchors ).unbind( ".tabs" );
				self.lis = self.anchors = self.panels = null;
			});
		// update selected after add/remove
		} else {
			o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
		}

		// update collapsible
		// TODO: use .toggleClass()
		this.element[ o.collapsible ? "addClass" : "removeClass" ]( "ui-tabs-collapsible" );

		// set or update cookie after init and add/remove respectively
		if ( o.cookie ) {
			this._cookie( o.selected, o.cookie );
		}

		// disable tabs
		for ( var i = 0, li; ( li = this.lis[ i ] ); i++ ) {
			$( li )[ $.inArray( i, o.disabled ) != -1 &&
				// TODO: use .toggleClass()
				!$( li ).hasClass( "ui-tabs-selected" ) ? "addClass" : "removeClass" ]( "ui-state-disabled" );
		}

		// reset cache if switching from cached to not cached
		if ( o.cache === false ) {
			this.anchors.removeData( "cache.tabs" );
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add( this.anchors ).unbind( ".tabs" );

		if ( o.event !== "mouseover" ) {
			var addState = function( state, el ) {
				if ( el.is( ":not(.ui-state-disabled)" ) ) {
					el.addClass( "ui-state-" + state );
				}
			};
			var removeState = function( state, el ) {
				el.removeClass( "ui-state-" + state );
			};
			this.lis.bind( "mouseover.tabs" , function() {
				addState( "hover", $( this ) );
			});
			this.lis.bind( "mouseout.tabs", function() {
				removeState( "hover", $( this ) );
			});
			this.anchors.bind( "focus.tabs", function() {
				addState( "focus", $( this ).closest( "li" ) );
			});
			this.anchors.bind( "blur.tabs", function() {
				removeState( "focus", $( this ).closest( "li" ) );
			});
		}

		// set up animations
		var hideFx, showFx;
		if ( o.fx ) {
			if ( $.isArray( o.fx ) ) {
				hideFx = o.fx[ 0 ];
				showFx = o.fx[ 1 ];
			} else {
				hideFx = showFx = o.fx;
			}
		}

		// Reset certain styles left over from animation
		// and prevent IE's ClearType bug...
		function resetStyle( $el, fx ) {
			$el.css( "display", "" );
			if ( !$.support.opacity && fx.opacity ) {
				$el[ 0 ].style.removeAttribute( "filter" );
			}
		}

		// Show a tab...
		var showTab = showFx
			? function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.hide().removeClass( "ui-tabs-hide" ) // avoid flicker that way
					.animate( showFx, showFx.duration || "normal", function() {
						resetStyle( $show, showFx );
						self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
					});
			}
			: function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.removeClass( "ui-tabs-hide" );
				self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
			};

		// Hide a tab, $show is optional...
		var hideTab = hideFx
			? function( clicked, $hide ) {
				$hide.animate( hideFx, hideFx.duration || "normal", function() {
					self.lis.removeClass( "ui-tabs-selected ui-state-active" );
					$hide.addClass( "ui-tabs-hide" );
					resetStyle( $hide, hideFx );
					self.element.dequeue( "tabs" );
				});
			}
			: function( clicked, $hide, $show ) {
				self.lis.removeClass( "ui-tabs-selected ui-state-active" );
				$hide.addClass( "ui-tabs-hide" );
				self.element.dequeue( "tabs" );
			};

		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind( o.event + ".tabs", function() {
			var el = this,
				$li = $(el).closest( "li" ),
				$hide = self.panels.filter( ":not(.ui-tabs-hide)" ),
				$show = self.element.find( self._sanitizeSelector( el.hash ) );

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if ( ( $li.hasClass( "ui-tabs-selected" ) && !o.collapsible) ||
				$li.hasClass( "ui-state-disabled" ) ||
				$li.hasClass( "ui-state-processing" ) ||
				self.panels.filter( ":animated" ).length ||
				self._trigger( "select", null, self._ui( this, $show[ 0 ] ) ) === false ) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index( this );

			self.abort();

			// if tab may be closed
			if ( o.collapsible ) {
				if ( $li.hasClass( "ui-tabs-selected" ) ) {
					o.selected = -1;

					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					}).dequeue( "tabs" );

					this.blur();
					return false;
				} else if ( !$hide.length ) {
					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						showTab( el, $show );
					});

					// TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
					self.load( self.anchors.index( this ) );

					this.blur();
					return false;
				}
			}

			if ( o.cookie ) {
				self._cookie( o.selected, o.cookie );
			}

			// show new tab
			if ( $show.length ) {
				if ( $hide.length ) {
					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					});
				}
				self.element.queue( "tabs", function() {
					showTab( el, $show );
				});

				self.load( self.anchors.index( this ) );
			} else {
				throw "jQuery UI Tabs: Mismatching fragment identifier.";
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ( $.browser.msie ) {
				this.blur();
			}
		});

		// disable click in any case
		this.anchors.bind( "click.tabs", function(){
			return false;
		});
	},

    _getIndex: function( index ) {
		// meta-function to give users option to provide a href string instead of a numerical index.
		// also sanitizes numerical indexes to valid values.
		if ( typeof index == "string" ) {
			index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );
		}

		return index;
	},

	destroy: function() {
		var o = this.options;

		this.abort();

		this.element
			.unbind( ".tabs" )
			.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" )
			.removeData( "tabs" );

		this.list.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );

		this.anchors.each(function() {
			var href = $.data( this, "href.tabs" );
			if ( href ) {
				this.href = href;
			}
			var $this = $( this ).unbind( ".tabs" );
			$.each( [ "href", "load", "cache" ], function( i, prefix ) {
				$this.removeData( prefix + ".tabs" );
			});
		});

		this.lis.unbind( ".tabs" ).add( this.panels ).each(function() {
			if ( $.data( this, "destroy.tabs" ) ) {
				$( this ).remove();
			} else {
				$( this ).removeClass([
					"ui-state-default",
					"ui-corner-top",
					"ui-tabs-selected",
					"ui-state-active",
					"ui-state-hover",
					"ui-state-focus",
					"ui-state-disabled",
					"ui-tabs-panel",
					"ui-widget-content",
					"ui-corner-bottom",
					"ui-tabs-hide"
				].join( " " ) );
			}
		});

		if ( o.cookie ) {
			this._cookie( null, o.cookie );
		}

		return this;
	},

	add: function( url, label, index ) {
		if ( index === undefined ) {
			index = this.anchors.length;
		}

		var self = this,
			o = this.options,
			$li = $( o.tabTemplate.replace( /#\{href\}/g, url ).replace( /#\{label\}/g, label ) ),
			id = !url.indexOf( "#" ) ? url.replace( "#", "" ) : this._tabId( $( "a", $li )[ 0 ] );

		$li.addClass( "ui-state-default ui-corner-top" ).data( "destroy.tabs", true );

		// try to find an existing element before creating a new one
		var $panel = self.element.find( "#" + id );
		if ( !$panel.length ) {
			$panel = $( o.panelTemplate )
				.attr( "id", id )
				.data( "destroy.tabs", true );
		}
		$panel.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" );

		if ( index >= this.lis.length ) {
			$li.appendTo( this.list );
			$panel.appendTo( this.list[ 0 ].parentNode );
		} else {
			$li.insertBefore( this.lis[ index ] );
			$panel.insertBefore( this.panels[ index ] );
		}

		o.disabled = $.map( o.disabled, function( n, i ) {
			return n >= index ? ++n : n;
		});

		this._tabify();

		if ( this.anchors.length == 1 ) {
			o.selected = 0;
			$li.addClass( "ui-tabs-selected ui-state-active" );
			$panel.removeClass( "ui-tabs-hide" );
			this.element.queue( "tabs", function() {
				self._trigger( "show", null, self._ui( self.anchors[ 0 ], self.panels[ 0 ] ) );
			});

			this.load( 0 );
		}

		this._trigger( "add", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	remove: function( index ) {
		index = this._getIndex( index );
		var o = this.options,
			$li = this.lis.eq( index ).remove(),
			$panel = this.panels.eq( index ).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ( $li.hasClass( "ui-tabs-selected" ) && this.anchors.length > 1) {
			this.select( index + ( index + 1 < this.anchors.length ? 1 : -1 ) );
		}

		o.disabled = $.map(
			$.grep( o.disabled, function(n, i) {
				return n != index;
			}),
			function( n, i ) {
				return n >= index ? --n : n;
			});

		this._tabify();

		this._trigger( "remove", null, this._ui( $li.find( "a" )[ 0 ], $panel[ 0 ] ) );
		return this;
	},

	enable: function( index ) {
		index = this._getIndex( index );
		var o = this.options;
		if ( $.inArray( index, o.disabled ) == -1 ) {
			return;
		}

		this.lis.eq( index ).removeClass( "ui-state-disabled" );
		o.disabled = $.grep( o.disabled, function( n, i ) {
			return n != index;
		});

		this._trigger( "enable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	disable: function( index ) {
		index = this._getIndex( index );
		var self = this, o = this.options;
		// cannot disable already selected tab
		if ( index != o.selected ) {
			this.lis.eq( index ).addClass( "ui-state-disabled" );

			o.disabled.push( index );
			o.disabled.sort();

			this._trigger( "disable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		}

		return this;
	},

	select: function( index ) {
		index = this._getIndex( index );
		if ( index == -1 ) {
			if ( this.options.collapsible && this.options.selected != -1 ) {
				index = this.options.selected;
			} else {
				return this;
			}
		}
		this.anchors.eq( index ).trigger( this.options.event + ".tabs" );
		return this;
	},

	load: function( index ) {
		index = this._getIndex( index );
		var self = this,
			o = this.options,
			a = this.anchors.eq( index )[ 0 ],
			url = $.data( a, "load.tabs" );

		this.abort();

		// not remote or from cache
		if ( !url || this.element.queue( "tabs" ).length !== 0 && $.data( a, "cache.tabs" ) ) {
			this.element.dequeue( "tabs" );
			return;
		}

		// load remote from here on
		this.lis.eq( index ).addClass( "ui-state-processing" );

		if ( o.spinner ) {
			var span = $( "span", a );
			span.data( "label.tabs", span.html() ).html( o.spinner );
		}

		this.xhr = $.ajax( $.extend( {}, o.ajaxOptions, {
			url: url,
			success: function( r, s ) {
				self.element.find( self._sanitizeSelector( a.hash ) ).html( r );

				// take care of tab labels
				self._cleanup();

				if ( o.cache ) {
					$.data( a, "cache.tabs", true );
				}

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					o.ajaxOptions.success( r, s );
				}
				catch ( e ) {}
			},
			error: function( xhr, s, e ) {
				// take care of tab labels
				self._cleanup();

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					// Passing index avoid a race condition when this method is
					// called after the user has selected another tab.
					// Pass the anchor that initiated this request allows
					// loadError to manipulate the tab content panel via $(a.hash)
					o.ajaxOptions.error( xhr, s, index, a );
				}
				catch ( e ) {}
			}
		} ) );

		// last, so that load event is fired before show...
		self.element.dequeue( "tabs" );

		return this;
	},

	abort: function() {
		// stop possibly running animations
		this.element.queue( [] );
		this.panels.stop( false, true );

		// "tabs" queue must not contain more than two elements,
		// which are the callbacks for the latest clicked tab...
		this.element.queue( "tabs", this.element.queue( "tabs" ).splice( -2, 2 ) );

		// terminate pending requests from other tabs
		if ( this.xhr ) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();
		return this;
	},

	url: function( index, url ) {
		this.anchors.eq( index ).removeData( "cache.tabs" ).data( "load.tabs", url );
		return this;
	},

	length: function() {
		return this.anchors.length;
	}
});

$.extend( $.ui.tabs, {
	version: "1.8.20"
});

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend( $.ui.tabs.prototype, {
	rotation: null,
	rotate: function( ms, continuing ) {
		var self = this,
			o = this.options;

		var rotate = self._rotate || ( self._rotate = function( e ) {
			clearTimeout( self.rotation );
			self.rotation = setTimeout(function() {
				var t = o.selected;
				self.select( ++t < self.anchors.length ? t : 0 );
			}, ms );
			
			if ( e ) {
				e.stopPropagation();
			}
		});

		var stop = self._unrotate || ( self._unrotate = !continuing
			? function(e) {
				if (e.clientX) { // in case of a true click
					self.rotate(null);
				}
			}
			: function( e ) {
				rotate();
			});

		// start rotation
		if ( ms ) {
			this.element.bind( "tabsshow", rotate );
			this.anchors.bind( o.event + ".tabs", stop );
			rotate();
		// stop rotation
		} else {
			clearTimeout( self.rotation );
			this.element.unbind( "tabsshow", rotate );
			this.anchors.unbind( o.event + ".tabs", stop );
			delete this._rotate;
			delete this._unrotate;
		}

		return this;
	}
});

})( jQuery );
/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			var inputsAndButtons = this.find("input, button");

			// allow suppresing validation by adding a cancel class to the submit button
			inputsAndButtons.filter(".cancel").click(function () {
				validator.cancelSubmit = true;
			});

			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				inputsAndButtons.filter(":submit").click(function () {
					validator.submitButton = this;
				});
			}

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();

				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 )
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event);
			}
			$(this.currentForm)
			       .validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'] ",
						"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() == 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;

			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();

			return meta && meta.messages && meta.messages[method];
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},

		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},

		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;
			// If .prop exists (jQuery >= 1.6), use it to get true/false for required
			if (method === 'required' && typeof $.fn.prop === 'function') {
				value = $element.prop(method);
			} else {
				value = $element.attr(method);
			}
			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	metadataRules: function(element) {
		if (!$.metadata) return {};

		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param == "string" && {url:param} || param;

			if ( this.pending[element.name] ) {
				return "pending";
			}
			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only spaces, digits and dashes
			if (/[^0-9 -]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
// VERSION: 2.2 LAST UPDATE: 13.03.2012
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */
(function(j){for(var d,k=document.getElementsByTagName("head")[0].style,h=["transformProperty","WebkitTransform","OTransform","msTransform","MozTransform"],g=0;g<h.length;g++)void 0!==k[h[g]]&&(d=h[g]);var i="v"=="\v";jQuery.fn.extend({rotate:function(a){if(!(0===this.length||"undefined"==typeof a)){"number"==typeof a&&(a={angle:a});for(var b=[],c=0,f=this.length;c<f;c++){var e=this.get(c);if(!e.Wilq32||!e.Wilq32.PhotoEffect){var d=j.extend(!0,{},a),e=(new Wilq32.PhotoEffect(e,d))._rootObj;
b.push(j(e))}else e.Wilq32.PhotoEffect._handleRotation(a)}return b}},getRotateAngle:function(){for(var a=[],b=0,c=this.length;b<c;b++){var f=this.get(b);f.Wilq32&&f.Wilq32.PhotoEffect&&(a[b]=f.Wilq32.PhotoEffect._angle)}return a},stopRotate:function(){for(var a=0,b=this.length;a<b;a++){var c=this.get(a);c.Wilq32&&c.Wilq32.PhotoEffect&&clearTimeout(c.Wilq32.PhotoEffect._timer)}}});Wilq32=window.Wilq32||{};Wilq32.PhotoEffect=function(){return d?function(a,b){a.Wilq32={PhotoEffect:this};this._img=this._rootObj=
this._eventObj=a;this._handleRotation(b)}:function(a,b){this._img=a;this._rootObj=document.createElement("span");this._rootObj.style.display="inline-block";this._rootObj.Wilq32={PhotoEffect:this};a.parentNode.insertBefore(this._rootObj,a);if(a.complete)this._Loader(b);else{var c=this;jQuery(this._img).bind("load",function(){c._Loader(b)})}}}();Wilq32.PhotoEffect.prototype={_setupParameters:function(a){this._parameters=this._parameters||{};"number"!==typeof this._angle&&(this._angle=0);"number"===
typeof a.angle&&(this._angle=a.angle);this._parameters.animateTo="number"===typeof a.animateTo?a.animateTo:this._angle;this._parameters.step=a.step||this._parameters.step||null;this._parameters.easing=a.easing||this._parameters.easing||function(a,c,f,e,d){return-e*((c=c/d-1)*c*c*c-1)+f};this._parameters.duration=a.duration||this._parameters.duration||1E3;this._parameters.callback=a.callback||this._parameters.callback||function(){};a.bind&&a.bind!=this._parameters.bind&&this._BindEvents(a.bind)},_handleRotation:function(a){this._setupParameters(a);
this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()},_BindEvents:function(a){if(a&&this._eventObj){if(this._parameters.bind){var b=this._parameters.bind,c;for(c in b)b.hasOwnProperty(c)&&jQuery(this._eventObj).unbind(c,b[c])}this._parameters.bind=a;for(c in a)a.hasOwnProperty(c)&&jQuery(this._eventObj).bind(c,a[c])}},_Loader:function(){return i?function(a){var b=this._img.width,c=this._img.height;this._img.parentNode.removeChild(this._img);this._vimage=this.createVMLNode("image");
this._vimage.src=this._img.src;this._vimage.style.height=c+"px";this._vimage.style.width=b+"px";this._vimage.style.position="absolute";this._vimage.style.top="0px";this._vimage.style.left="0px";this._container=this.createVMLNode("group");this._container.style.width=b;this._container.style.height=c;this._container.style.position="absolute";this._container.setAttribute("coordsize",b-1+","+(c-1));this._container.appendChild(this._vimage);this._rootObj.appendChild(this._container);this._rootObj.style.position=
"relative";this._rootObj.style.width=b+"px";this._rootObj.style.height=c+"px";this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;this._eventObj=this._rootObj;this._handleRotation(a)}:function(a){this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;this._width=this._img.width;this._height=this._img.height;this._widthHalf=this._width/2;this._heightHalf=this._height/2;var b=Math.sqrt(this._height*
this._height+this._width*this._width);this._widthAdd=b-this._width;this._heightAdd=b-this._height;this._widthAddHalf=this._widthAdd/2;this._heightAddHalf=this._heightAdd/2;this._img.parentNode.removeChild(this._img);this._aspectW=(parseInt(this._img.style.width,10)||this._width)/this._img.width;this._aspectH=(parseInt(this._img.style.height,10)||this._height)/this._img.height;this._canvas=document.createElement("canvas");this._canvas.setAttribute("width",this._width);this._canvas.style.position="relative";
this._canvas.style.left=-this._widthAddHalf+"px";this._canvas.style.top=-this._heightAddHalf+"px";this._canvas.Wilq32=this._rootObj.Wilq32;this._rootObj.appendChild(this._canvas);this._rootObj.style.width=this._width+"px";this._rootObj.style.height=this._height+"px";this._eventObj=this._canvas;this._cnv=this._canvas.getContext("2d");this._handleRotation(a)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer);this._animateStartTime=+new Date;this._animateStartAngle=this._angle;this._animate()},
_animate:function(){var a=+new Date,b=a-this._animateStartTime>this._parameters.duration;if(b&&!this._parameters.animatedGif)clearTimeout(this._timer);else{(this._canvas||this._vimage||this._img)&&this._rotate(~~(10*this._parameters.easing(0,a-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration))/10);this._parameters.step&&this._parameters.step(this._angle);var c=this;this._timer=setTimeout(function(){c._animate.call(c)},10)}this._parameters.callback&&
b&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var a=Math.PI/180;return i?function(a){this._angle=a;this._container.style.rotation=a%360+"deg"}:d?function(a){this._angle=a;this._img.style[d]="rotate("+a%360+"deg)"}:function(b){this._angle=b;b=b%360*a;this._canvas.width=this._width+this._widthAdd;this._canvas.height=this._height+this._heightAdd;this._cnv.translate(this._widthAddHalf,this._heightAddHalf);this._cnv.translate(this._widthHalf,
this._heightHalf);this._cnv.rotate(b);this._cnv.translate(-this._widthHalf,-this._heightHalf);this._cnv.scale(this._aspectW,this._aspectH);this._cnv.drawImage(this._img,0,0)}}()};i&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(a){return document.createElement("<rvml:"+a+' class="rvml">')}}catch(a){return function(a){return document.createElement("<"+
a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())})(jQuery);
/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(a){a.fn.slides=function(b){return b=a.extend({},a.fn.slides.option,b),this.each(function(){function w(g,h,i){if(!p&&o){p=!0,b.animationStart(n+1);switch(g){case"next":l=n,k=n+1,k=e===k?0:k,r=f*2,g=-f*2,n=k;break;case"prev":l=n,k=n-1,k=k===-1?e-1:k,r=0,g=0,n=k;break;case"pagination":k=parseInt(i,10),l=a("."+b.paginationClass+" li."+b.currentClass+" a",c).attr("href").match("[^#/]+$"),k>l?(r=f*2,g=-f*2):(r=0,g=0),n=k}h==="fade"?b.crossfade?d.children(":eq("+k+")",c).css({zIndex:10}).fadeIn(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1)}):d.children(":eq("+l+")",c).fadeOut(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing)}):d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing,function(){a.browser.msie&&a(this).get(0).style.removeAttribute("filter")}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+k+")").css({left:r,display:"block"}),b.autoHeight?d.animate({left:g,height:d.children(":eq("+k+")").outerHeight()},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1}):d.animate({left:g},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1})),b.pagination&&(a("."+b.paginationClass+" li."+b.currentClass,c).removeClass(b.currentClass),a("."+b.paginationClass+" li:eq("+k+")",c).addClass(b.currentClass))}}function x(){clearInterval(c.data("interval"))}function y(){b.pause?(clearTimeout(c.data("pause")),clearInterval(c.data("interval")),u=setTimeout(function(){clearTimeout(c.data("pause")),v=setInterval(function(){w("next",i)},b.play),c.data("interval",v)},b.pause),c.data("pause",u)):x()}a("."+b.container,a(this)).children().wrapAll('<div class="slides_control"/>');var c=a(this),d=a(".slides_control",c),e=d.children().size(),f=d.children().outerWidth(),g=d.children().outerHeight(),h=b.start-1,i=b.effect.indexOf(",")<0?b.effect:b.effect.replace(" ","").split(",")[0],j=b.effect.indexOf(",")<0?i:b.effect.replace(" ","").split(",")[1],k=0,l=0,m=0,n=0,o,p,q,r,s,t,u,v;if(e<2)return a("."+b.container,a(this)).fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()}),a("."+b.next+", ."+b.prev).fadeOut(0),!1;if(e<2)return;h<0&&(h=0),h>e&&(h=e-1),b.start&&(n=h),b.randomize&&d.randomize(),a("."+b.container,c).css({overflow:"hidden",position:"relative"}),d.children().css({position:"absolute",top:0,left:d.children().outerWidth(),zIndex:0,display:"none"}),d.css({position:"relative",width:f*3,height:g,left:-f}),a("."+b.container,c).css({display:"block"}),b.autoHeight&&(d.children().css({height:"auto"}),d.animate({height:d.children(":eq("+h+")").outerHeight()},b.autoHeightSpeed));if(b.preload&&d.find("img:eq("+h+")").length){a("."+b.container,c).css({background:"url("+b.preloadImage+") no-repeat 50% 50%"});var z=d.find("img:eq("+h+")").attr("src")+"?"+(new Date).getTime();a("img",c).parent().attr("class")!="slides_control"?t=d.children(":eq(0)")[0].tagName.toLowerCase():t=d.find("img:eq("+h+")"),d.find("img:eq("+h+")").attr("src",z).load(function(){d.find(t+":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){a(this).css({zIndex:5}),a("."+b.container,c).css({background:""}),o=!0,b.slidesLoaded()})})}else d.children(":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()});b.bigTarget&&(d.children().css({cursor:"pointer"}),d.children().click(function(){return w("next",i),!1})),b.hoverPause&&b.play&&(d.bind("mouseover",function(){x()}),d.bind("mouseleave",function(){y()})),b.generateNextPrev&&(a("."+b.container,c).after('<a href="#" class="'+b.prev+'">Prev</a>'),a("."+b.prev,c).after('<a href="#" class="'+b.next+'">Next</a>')),a("."+b.next,c).click(function(a){a.preventDefault(),b.play&&y(),w("next",i)}),a("."+b.prev,c).click(function(a){a.preventDefault(),b.play&&y(),w("prev",i)}),b.generatePagination?(b.prependPagination?c.prepend("<ul class="+b.paginationClass+"></ul>"):c.append("<ul class="+b.paginationClass+"></ul>"),d.children().each(function(){a("."+b.paginationClass,c).append('<li><a href="#'+m+'">'+(m+1)+"</a></li>"),m++})):a("."+b.paginationClass+" li a",c).each(function(){a(this).attr("href","#"+m),m++}),a("."+b.paginationClass+" li:eq("+h+")",c).addClass(b.currentClass),a("."+b.paginationClass+" li a",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$"),n!=q&&w("pagination",j,q),!1}),a("a.link",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$")-1,n!=q&&w("pagination",j,q),!1}),b.play&&(v=setInterval(function(){w("next",i)},b.play),c.data("interval",v))})},a.fn.slides.option={preload:!1,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:!1,next:"next",prev:"prev",pagination:!0,generatePagination:!0,prependPagination:!1,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:!1,randomize:!1,play:0,pause:0,hoverPause:!1,autoHeight:!1,autoHeightSpeed:350,bigTarget:!1,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}},a.fn.randomize=function(b){function c(){return Math.round(Math.random())-.5}return a(this).each(function(){var d=a(this),e=d.children(),f=e.length;if(f>1){e.hide();var g=[];for(i=0;i<f;i++)g[g.length]=i;g=g.sort(c),a.each(g,function(a,c){var f=e.eq(c),g=f.clone(!0);g.show().appendTo(d),b!==undefined&&b(f,g),f.remove()})}})}})(jQuery)
/* ----------------------------------
 *	Plugin: fromTemplate Plugin v0.1.0
 *
 *  Copyright (c) 2009 Tomas Salfischberger, John Resig
 *
 *	Notes: 	Updated by SWX to allow templates
 * 			as strings instead of <script> islands
 *
 *  UsedBy: jquery.twc.featureCarousel.js
 *
 *  Uses: 	jquery-1.7.1
 * 
 * --------------------------------- */	

;(function($) {	   
	/* Public function on jQuery elements */
	$.fn.fromTemplate = function(str, data, options) {
	var settings = $.extend({}, $.fn.fromTemplate.defaults, options);

	return this.each(function(){
	  $(this).html(renderTemplate(str, settings, data));
	});
	};

	/* Default settings */
	$.fn.fromTemplate.defaults = {
	modelName: "data",
	templatePrefix: "tmpl_",
	inline: false,
	templateName: ""
	};

	/* Private cache */
	var cache = $.fn.fromTemplate.cache = {};

	/* Find template in cache or generate, then render */
	function renderTemplate(str, opt, data) {
		var fn;
		if (opt.inline) {
			//don't cache inline templates if templateName isn't specified
			if (opt.templateName == "") {
				fn = templateGenerator(str, opt);
			}
			else {
				fn = cache[opt.templateName] = cache[opt.templateName] || templateGenerator(str, opt);	
			}
		}
		else {
			fn = cache[str] = cache[str] || templateGenerator(str, opt);
		}
	return fn(data);
	}

	/* Generate the template function */
	function templateGenerator(str, opt) {
		if (opt.inline) {
			tmpl = str;
		}
		else {
		tmpl = $("#" + opt.templatePrefix + str).html()	  		
		}

	return new Function(opt.modelName,
		"var p=[]; p.push('" +
			tmpl.replace(/[\r\t\n]/g, " ")
			.replace(/'(?=[^%]*%>)/g,"\t")
			.split("'").join("\\'")
			.split("\t").join("'")
			.replace(/<%=(.+?)%>/g, "',$1,'")
			.split("<%").join("');")
			.split("%>").join("p.push('") +
			"');return p.join('');"
);
	  };
})(jQuery);
/* ----------------------------------
 *	Plugin: hoverToggle (opt: classname)
 *
 *	- Adds hover event to target element
 *	- Adds optclass or default 'hover' class to parent element
 * 
 *  UsedBy: tooltip (tooltip is still being developed)
 *
 *  Uses: 	jquery-1.7.1
 *
 * --------------------------------- */	
;(function($) {	   
	$.fn.hoverToggle = function(optclass) { 
		
		$(this).each( function() {
			var hoverclass = optclass ? optclass : 'hover';
			var $parent = $(this).parent();
	
			$parent.hover( 
				function() { // Hover In
					$parent.addClass(hoverclass);
				},
				function() { // Hover Out
					$parent.removeClass(hoverclass);
					$parent.find('input').blur();								
				}
			);

			// In some instances close button is needed, this removes the hover class from the parent element
			$parent.find('a.hover-close').click( function(e) {
				e.preventDefault();

				$parent.removeClass(hoverclass);
				$parent.find('input').blur();

			});
		});	
	} // end $.fn.hoverToggle
})(jQuery);
/* ----------------------------------
 *	Plugin: makeBackground
 *
 *	- Converts an inline image into a
 *    BackgroundImage.  Targets Parent
 *    by default but alternate parent
 *    can be targeted.
 *
 *    Currently, other background
 *    options are hardcoded.
 *
 *  UsedBy: jquery.twc.productModuleTabs.js
 *
 *  Uses: 	jquery-1.7.1
 *
 * --------------------------------- */
;(function($) {
	$.fn.makeBackground = function(targetParent) {

		$.each(this, function() {
			var $wrapper;
			if (typeof targetParent == undefined) {
				$wrapper = $(this).parent();
			}
			else {
				$wrapper = $(this).closest(targetParent);
				if ($wrapper.length == 0) {
					$wrapper = $(this).parent();
				}
			}

			$wrapper.css({
				'background-image': 'url('+$(this).attr('src')+')',
				'background-color': 'transparent',
				'background-repeat': 'no-repeat',
				'background-position': 'right center'
			});
		});

		$(this).hide();
	};

})(jQuery);
/* ----------------------------------
 *	Plugin: vAlign
 *
 *	- Vertically centers a block within 
 *    parent. 
 *  - If the parent isn't fixed, you
 *    will need to call again for 
 *    window.resize.
 * 
 *  UsedBy: HTML Markup for Modules (Generic Helper)
 * 			jquery.twc.tableRowToggle.js
 *
 *  Uses: 	jquery-1.7.1
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.vAlign = function() {
		return this.each(function(i){
			var ah = $(this).height();
			var oh = $(this).parent().height();
			var mh = (oh - ah) / 2;

			// console.log('this: ', $(this), ' ah:', ah, ' oh:', oh, ' mh:', mh);
			if(mh>0) {
				$(this).css('margin-top', mh);
			} 
			else {
				$(this).css('margin-top', 0);
			}
		});
	};
})(jQuery);

(function($) {	   
	$.fn.vAlignPercent = function(percent) {
		return this.each(function(i){
			var oh = $(this).parent().height();
			var mh = (oh * (percent * .01));

			if(mh>0) {
				$(this).css('padding-top', mh);
			} 
			else {
				$(this).css('padding-top', 0);
			}
		});
	};
})(jQuery);
/* ----------------------------------
 *	Plugin: swxPlugins 
 *
 *	- Adds 'last' class to all li:last-child elements
 *  - Adds 'first' class to all li:first-child elements
 *	- Clears input on focus, returns to default value on blur
 * 
 *  UsedBy: HTML Markup for Modules (Generic Helper)
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	

;(function($) {
	$.fn.swxPlugins = function() { 

		// Adds 'last' class to all last li, th, td elements
		$('li:last-child, th:last-child, td:last-child').addClass('last');

		// Adds 'first' class to all first li elements
		$('li:first-child, th:first-child, td:first-child').addClass('first');
		
		//Clear input fields on focus
		$("input[type=text]").focus(clearTextHandler);
		$("input[type=text]").blur(clearTextHandler);
		
		$('ul.stripped-list li:nth-child(odd)').addClass('alt');

	} // end $.fn.swxPlugins

	function clearTextHandler(arg) {
		var a = arg.target;
		if (a.defaultValue == a.value) a.value = "";
		else 
			if (a.value == "") a.value = a.defaultValue;
	} // end clearTextHandler

})(jQuery);
/* ----------------------------------
 *	Plugin: heroFeatureCarousel
 *  UsedBy:
 *
 *  Uses: 	jquery.cycle.all.js
 * 			jquery.fromTemplate.js
 *			vars.js (templates are currently defined in vars)
 *
 * --------------------------------- */

;(function($) {
	$.fn.heroFeatureCarousel = function (options) {

		function log() {
			window.console && console.log && console.log('[heroFeatureCarousel] ' + Array.prototype.join.call(arguments,' '));
		}

		//default options
		var defaultOptions = {
			slideTimeout: 0,
			slideEasing: 'easeInOutExpo',
			slideTrans: 'scrollHorz',
			slideSpeed: 1600
		};


		//Show Slide Animations - Content Overlay
		function slideAni() {
			//Select elements and then change top height -- :)
			$(this).children('.content').css({ top: "+=60", opacity : 0 });

			//Animate elements to original position with a slight delay
			$(this).children('.content').animate({ top: '15', opacity: 1}, 1200, 'easeOutQuint');
		}

		//Hide Slide Animations - Content Overlay
		function hideAni() {
			$(this).children().fadeTo(600,0);
			// reset top position
			$(this).children('.content').stop().css({ top: "+=60", opacity : 0 });
		}

		//Construct and bind carousel for each match and
		return this.each(function () {

			var options = $.extend({}, defaultOptions);

			//Set Slide Show Options
			var slideSpeed = Number(options.slideSpeed);
			var slideTimeout = Number(options.slideTimeout);
			var slideEasing = options.slideEasing;
			var slideTrans = options.slideTrans;
			/** Mini-validation **/
				//ensure timout is not less than speed
				if (options.slideTimeout > 0 && options.slideTimeout < options.slideSpeed) {
					options.slideTimeout = options.slideSpeed;
				}

				//ensure numerics for Timeout and Speed (cycle is picky)
				if (options.slideTimeout == 'NaN') {
					options.slideTimeout = defaultOptions.slideTimeout;
				}
				else {
					options.slideTimeout = parseInt(options.slideTimeout);
				}

				if (options.slideSpeed == 'NaN') {
					options.slideSpeed = defaultOptions.slideSpeed;
				}
				else {
					options.slideSpeed = parseInt(options.slideSpeed);
				}

			/** END Mini-validation **/

			//DOM Specific
			var $container = $(this);
			var $dropShadow = $('<div class="carousel-drop-shadow"></div>');
			var $carousel = $('<ul class="carousel" />');
			var $pager = $('<ul class="pager"><li class="left"><a href="#" title="Previous">Left</a></li><li class="right"><a href="#" title="Next">Right</a></li></ul>');
			var $prevCarousel = $('<ul class="prev" />');
			var $nextCarousel = $('<ul class="next" />');
			var $pager_wrap = $('<div class="pager-wrap" />');
			var $pagination = $('<ul class="pagination" />');

			$container
				.append($prevCarousel.hide())
				.append($nextCarousel.hide())
				.append($pager.hide())
				.append($carousel)
				.append($pager_wrap.append($pagination))
				.append($dropShadow);

			var $prevPager = $container.find('.pager li.left, ul.prev');
			var $nextPager = $container.find('.pager li.right, ul.next');


            function loadCarousel(slidesSelector){
		var numSlides = $(slidesSelector).length;
		$(slidesSelector).each(function(){
			var $currentSlide = $(this).find('.carousel-wrap .carousel>li');
			var slideData = $currentSlide.data('options');
			$prevCarousel.append('<li class="'+slideData.position+'"><img src="'+ slideData.bgImage + '" /></li>');
			$nextCarousel.append('<li class="'+slideData.position+'"><img src="'+ slideData.bgImage + '" /></li>');
			$carousel.append($currentSlide);
		});
				$prevCarousel.find('li:last').prependTo($prevCarousel);
				$nextCarousel.find('li:first').appendTo($nextCarousel);
				initCarousel();
				//empty the slide source.
				$(slidesSelector).empty();

            }


			function initCarousel() {
				var slideLength = $carousel.find('li').length;

				var $allCarousels = $container.find('.carousel, .prev, .next')

				if (slideLength < 1) {
					//safety
					log("Missing Data: Aborted")
					$container.empty();
				} //End if (slideLength < 1)
				else if (slideLength >= 1) {

					//build pager links
					for (var i = slideLength - 1; i >= 0; i--) {
						$pagination.append('<li><a href="#">Slide '+i+'</a></li>')
					};

					var $pager_links = $container.find('.pagination li a');
					$pager_links.fadeTo('fast',0.42);
					$pager_links.hover(
						function() { // Hover in
							$(this).fadeTo('fast',1.0);
						},
						function() { // Hover out
							$(this).fadeTo('fast',0.42);
						}
					);

					// Set width of pager
					var pager_width = (slideLength * 16)+16;

					$pager_wrap.css('width', pager_width).fadeIn();
					$pager.show();

					if (slideLength == 1) {
						//Manually run animation on slide (normally called in carousel slide transistion)
						slideAni.apply($carousel.find('li:first')[0]);
						$pager.css({'visibility': 'hidden'});
						$pager_wrap.css({'visibility': 'hidden'});
						log("Warning: Only one slide. Carousel not fully initialized.");
					}
					else {
						$container.find('.next, .prev').show();
						$carousel.cycle({
							fx: slideTrans,
							easing: slideEasing,
							speed: slideSpeed,
							timeout: slideTimeout,
							pager: $pagination,
							pagerAnchorBuilder: function(idx, slide) {
								// return selector string for existing anchor
								return $pagination.find('li:eq(' + idx + ') a');
							},
							prev: $prevPager,
							next: $nextPager,
							before: hideAni,
							after: slideAni,
							onPrevNextEvent: hideAni,
							sync: 1,
							autostop: true,
							autostopCount: (slideLength + 1)
						});

						$container.find('.next, .prev').cycle({
							fx: slideTrans,
							easing: slideEasing,
							speed: slideSpeed,
							timeout: slideTimeout,
							prev: $prevPager,
							next: $nextPager,
							pagerAnchorBuilder: function(idx, slide) {
								// return selector string for existing anchor
								return $pagination.find('li:eq(' + idx + ') a');
							},
							sync: 1,
							autostop: true,
							autostopCount: (slideLength + 1)
						});

						//Carousel Hover: Pause/Resume
						$('.carousel, .pagination').bind('mouseover.heroFeatureCarousel',
							function() {
								$allCarousels.cycle('pause');
							}
						);

						//Disable Resume if Manual Navigation
						$prevPager.bind('click.heroFeatureCarousel',
							function() {
								$allCarousels.cycle('pause');
								$carousel.unbind('mouseout.heroFeatureCarousel');

								//cleanup
								$(this).unbind('click.heroFeatureCarousel');
							}
						);

						$carousel.bind('mouseout.heroFeatureCarousel',
							function() {
								$allCarousels.cycle('resume');
							}
						);
					} // End else
				} //End else if (slideLength > 1)
			} //End initCarousel


			//populate carousel and intialize it
			loadCarousel('.slide-content .homepage-hero-slide')



		}); // End .each

	}

})(jQuery);
/* ----------------------------------
 *	Plugin: featureCarousel
 *
 *	- Builds feature carousel from JSON data
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery.cycle.all.js
 * 			jquery.fromTemplate.js
 *			vars.js (templates are currently defined in vars)
 *
 * --------------------------------- */	

;(function($) {
	$.fn.featureCarousel = function (options) {

		function log() {
			window.console && console.log && console.log('[featureCarousel] ' + Array.prototype.join.call(arguments,' '));
		}

		//default options
		var defaultOptions = {
			slideTimeout: 0,
			slideEasing: 'easeInOutExpo',
			slideTrans: 'scrollHorz',
			slideSpeed: 1600,
			src: '',
			_carouselData: [{}]
		};

		var _isDataReady = false;

		//default slide data
		var defaultSlide = {
			'background': globalVars.featureImages + 'empty-slide.jpg',
			'content_template': 'one-col',
			'sc_header': '',
			'sc_col1': '',
			'sc_col2': '',
			'sc_col3': '',
			'sc_footer': '',
			'position': 'left'
		};

		//Show Slide Animations - Content Overlay
		function slideAni() {
			//Select elements and then change top height -- :)
			$(this).children('.content').css({ top: "+=60", opacity : 0 });
			
			//Animate elements to original position with a slight delay
			$(this).children('.content').animate({ top: '15', opacity: 1}, 1200, 'easeOutQuint');
		}

		//Hide Slide Animations - Content Overlay
		function hideAni() {
			$(this).children().fadeTo(600,0);
			// reset top position
			$(this).children('.content').stop().css({ top: "+=60", opacity : 0 });
		}
		
		//Construct and bind carousel for each match and 
		return this.each(function () {
			//Load Options - This is done here because options can be loaded from HTML5 Data: meta-options
			var metaOptions = $(this).data('options');

			//support single URL as String for JSON Source
			if (typeof metaOptions == 'string') {
				log('Info: String detected in place of options. Assuming usage as data src url.')
				metaOptions = {'src': metaOptions};
			}

			var options = $.extend({}, defaultOptions, metaOptions);
		
			//Set Slide Show Options
			var slideSpeed = Number(options.slideSpeed);
			var slideTimeout = Number(options.slideTimeout);
			var slideEasing = options.slideEasing;
			var slideTrans = options.slideTrans;
			var carouselData = options._carouselData;

			/** Mini-validation **/
				//ensure timout is not less than speed
				if (options.slideTimeout > 0 && options.slideTimeout < options.slideSpeed) {
					options.slideTimeout = options.slideSpeed;
				}

				//ensure numerics for Timeout and Speed (cycle is picky)
				if (options.slideTimeout == 'NaN') {
					options.slideTimeout = defaultOptions.slideTimeout;
				}
				else {
					options.slideTimeout = parseInt(options.slideTimeout);
				}

				if (options.slideSpeed == 'NaN') {
					options.slideSpeed = defaultOptions.slideSpeed;
				}
				else {
					options.slideSpeed = parseInt(options.slideSpeed);
				}

			/** END Mini-validation **/

			//DOM Specific
			var $container = $(this);
			var $dropShadow = $('<div class="carousel-drop-shadow"></div>');
			var $carousel = $('<ul class="carousel" />');
			var $pager = $('<ul class="pager"><li class="left"><a href="#" title="Previous">Left</a></li><li class="right"><a href="#" title="Next">Right</a></li></ul>');
			var $prevCarousel = $('<ul class="prev" />');
			var $nextCarousel = $('<ul class="next" />');
			var $pager_wrap = $('<div class="pager-wrap" />');
			var $pagination = $('<ul class="pagination" />');

			$container
				.append($prevCarousel.hide())
				.append($nextCarousel.hide())
				.append($pager.hide())
				.append($carousel)
				.append($pager_wrap.append($pagination))
				.append($dropShadow);
				/*.after($dropShadow);*/

			var $prevPager = $container.find('.pager li.left, ul.prev');
			var $nextPager = $container.find('.pager li.right, ul.next');

			function bindData(carouselData){
				//Check for slide data or URL and load if necessary

				//abort on empty dataset
				var carouselData = options._carouselData
				if ($.isEmptyObject(carouselData)) {
					log("DATA ERROR:", carouselData);
					return;
				}
				//Generate Slides
				for (var key in carouselData) {
					//Check if Data exists
					if (carouselData.hasOwnProperty(key) && !$.isEmptyObject(carouselData[key]) && key != "remove") {
						var currentSlide = $.extend({}, defaultSlide, carouselData[key]);

						//PREV
						$prevCarousel.append('<li class="' + currentSlide.position + '"><img src="'+ currentSlide.background + '" /></li>');

						//NEXT
						$nextCarousel.append('<li class="' + currentSlide.position + '"><img src="'+ currentSlide.background + '" /></li>');

						//SLIDE
						$carousel.append(
							$('<li style="background:url('+ currentSlide.background + ') no-repeat top left" class="' + currentSlide.content_template + '"/>')
								.append(
									function(){
										var $template
										//if (typeof globalVars.featureCarouselTemplates[currentSlide.content_template] != 'undefined') {
										try {
											log('Using template (' + currentSlide.content_template + ') for slide ('+ key +').');
											$template = $('<div class="content" />');
											$template.fromTemplate(globalVars.featureCarouselTemplates[currentSlide.content_template].template, currentSlide, {inline: true, templateName: currentSlide.content_template});
										}
										catch(e){ 
											log('Unable to interpert slide template (' + currentSlide.content_template + ') for slide ('+ key +').')}
									return $template

									}
								)
							);						
					} //end if hasOwnProperty
				} // end for key in carouselData

				//Tweak order of prev and next carousels
				$prevCarousel.find('li:last').prependTo($prevCarousel);
				$nextCarousel.find('li:first').appendTo($nextCarousel);

				initCarousel();
			} //End bindCarousel()

			function initCarousel() {
				var slideLength = $carousel.find('li').length;

				var $allCarousels = $container.find('.carousel, .prev, .next')

				if (slideLength < 1) {
					//safety
					log("Missing Data: Aborted")
					$container.empty();
				} //End if (slideLength < 1)
				else if (slideLength >= 1) {
					
					//build pager links
					for (var i = slideLength - 1; i >= 0; i--) {
						$pagination.append('<li><a href="#">Slide '+i+'</a></li>')
					};
					
					var $pager_links = $container.find('.pagination li a');
					$pager_links.fadeTo('fast',0.42);			
					$pager_links.hover( 
						function() { // Hover in
							$(this).fadeTo('fast',1.0);
						},	
						function() { // Hover out
							$(this).fadeTo('fast',0.42);
						}
					);

					// Set width of pager
					var pager_width = (slideLength * 16)+16;
					
					$pager_wrap.css('width', pager_width).fadeIn();	
					$pager.show();	

					if (slideLength == 1) {
						//Manually run animation on slide (normally called in carousel slide transistion)
						slideAni.apply($carousel.find('li:first')[0]);
						$pager.css({'visibility': 'hidden'});
						$pager_wrap.css({'visibility': 'hidden'});
						log("Warning: Only one slide. Carousel not fully initialized.");
					}
					else {
						$container.find('.next, .prev').show();
						$carousel.cycle({
							fx: slideTrans,
							easing: slideEasing,
							speed: slideSpeed,
							timeout: slideTimeout,
							pager: $pagination,
							pagerAnchorBuilder: function(idx, slide) { 
								// return selector string for existing anchor 
								return $pagination.find('li:eq(' + idx + ') a'); 
							}, 		
							prev: $prevPager,
							next: $nextPager,
							before: hideAni,
							after: slideAni,
							onPrevNextEvent: hideAni,
							sync: 1,
							autostop: true,
							autostopCount: (slideLength + 1)
						});
						
						$container.find('.next, .prev').cycle({
							fx: slideTrans,
							easing: slideEasing,
							speed: slideSpeed, 
							timeout: slideTimeout,
							prev: $prevPager,
							next: $nextPager,
							pagerAnchorBuilder: function(idx, slide) { 
								// return selector string for existing anchor 
								return $pagination.find('li:eq(' + idx + ') a'); 
							},
							sync: 1,
							autostop: true,
							autostopCount: (slideLength + 1)
						});

						//Carousel Hover: Pause/Resume
						$('.carousel, .pagination').bind('mouseover.featureCarousel', 
							function() {
								$allCarousels.cycle('pause');
							}
						);

						//Disable Resume if Manual Navigation
						$prevPager.bind('click.featureCarousel', 
							function() {
								$allCarousels.cycle('pause');
								$carousel.unbind('mouseout.featureCarousel');

								//cleanup
								$(this).unbind('click.featureCarousel');
							}
						);
						
						$carousel.bind('mouseout.featureCarousel', 
							function() {
								$allCarousels.cycle('resume');
							}
						);
					} // End else
				} //End else if (slideLength > 1) 
			} //End initCarousel

			// BIND and INIT
			if (typeof options.src !== 'undefined' && options.src != '') {
				$.getJSON(options.src, function(data){
					options._carouselData = $.extend({}, data);
					bindData();
				});
			}
			else {
				//No data for carousel - destroy contents
				log('No Data: Carousel Aborted');
				$container.empty();
			} // End BIND and INIT


		}); // End .each
		//Carousel Text Animation
	} // end $.fn.featureCarousel

})(jQuery);
/* ----------------------------------
 *	Plugin: filmstrip
 *
 *	- Converts a list of images to a horizontal filmstrip
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 * 			jquery.flexCenter.js
 *
 * --------------------------------- */	

;(function($) {	   

	$.fn.filmstrip = function() {
		var $panelList = $(this);
		if($panelList.length > 0)
		{
			$(window).unbind('resize.flex');
			$(window).bind('resize.flex', function(e){
				//width of 5 panels is 1942
				$panelList.flexCenter(0);
			});
								
			$panelList.flexCenter(0);
		}
		
		//Apply scanline overlay only if not ie5 or ie6 (PNG issues)
		if(!($.browser.msie&&parseInt($.browser.version,10)<7&&parseInt($.browser.version,10)>4)){
			$panelList.find('li').each(function(){
				//only apply if li has image and not overlay
				if($(this).has('img.panel-img').length > 0 && $(this).has('img.overlay').length < 1) {
					$(this).prepend('<img src="' + globalVars.gatewayImages + 'overlay-panel-strip.png" class="overlay">');
				}
			});
		}					

	} // end $.fn.filmstrip
})(jQuery);
/* ----------------------------------
 *	Plugin: flexCenter
 *
 *	- Used by filmstrip plugin to cause the filmstrip
 *    to expand from the center without scrollbar.
 * 
 *  UsedBy: jquery.twc.filstrip.js
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.flexCenter = function(iMax, sOuter, sInner){

		//Set defaults for sOuter and sInner
		if (sOuter == undefined) {
			sOuter = 'ul';
		}
		if (sInner == undefined) {
			sInner = 'li';
		}

		var $flexContainer = $(this).find(sOuter);
		var margin_left = 0;
		var container_width = $(this).width();
		var isFluid = false;

		function setMaxFluid() {
			//Make container width dynamic

			iMax = 0;
			isFluid = true;
			$flexContainer.find(sInner).each(function(){
				iMax += $(this).outerWidth(true); //including margins
			});
		}

		if (iMax == undefined&&isNaN(iMax)||iMax < 1) {
			setMaxFluid();
		}
		else {
			iMax = parseInt(iMax);
			/*
			$(this).find(sOuter).css('background-color', $(this).css('background-color'));
			$(this).css('background-color', 'transparent');
			*/
		}
				
		$flexContainer.css({
			'width': iMax + 'px' // You shouldn't need to append a string to the width
		});

		var reInit = false;

		if (isFluid) {
			if (container_width >= iMax) {
				var $clone = $flexContainer.find(sInner + ':not(.clone)').clone();

				$clone.removeClass('last').removeClass('first').addClass('.clone');
				$clone.clone().addClass('.cloneafter').removeAttr('style').appendTo($flexContainer);
				$clone.clone().addClass('.clonebefore').removeAttr('style').prependTo($flexContainer);
				$flexContainer.find(sInner + ':not(.clone)').removeAttr('style');

				setMaxFluid();

				reInit = true;
			}
		}

		margin_left = Math.round(($(this).width() - $flexContainer.width())/2) +'px';

		$flexContainer.css('margin-left',margin_left);
		
		if (reInit) {
			$(window).trigger("resize.flex");
		}
	} // end $.fn.flexCenter

})(jQuery);
/* ----------------------------------
 *	Plugin: navInit
 *
 *	- Init's the main nav hover functionality, 
 * 	  with the mega menu drop downs
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	
;(function($) {	   

	$.fn.navInit = function() {

		var $nav = this; // ul.main-nav
		var $nav_items = $nav.find('> li'); // ul.main-nav li
		var speed = 'normal';

		$nav_items.hover(
			function() { // Hover In
				$(this).addClass('hover');
			},
			function() { // Hover Out
				$(this).removeClass('hover');
			}
		);
	} // $.fn.navInit

})(jQuery);
/* ----------------------------------
 *  Plugin: flyoutInit
 *
 *  - Init's the flyout functionality
 *
 *  UsedBy: anything that wants a flyout...just add the class addflyout to a link
 *
 *  Uses:   jquery
 *
 * --------------------------------- */

;(function($) {
    $.fn.flyoutInit = function() {
        $('.addflyout',this).click(
            function () {

                //close all other flyouts
                var dataTooltip = $(this).attr('data-flyout');

                if(typeof dataTooltip != "undefined"){
                    //check if already in dom if not create it
                    var tooltipObject = $.parseJSON(dataTooltip);
                    var slideDirection = tooltipObject.position;
                    var itemParent = $(this).parent();
                    var ulParent = $(this).closest('ul').parent();
                    //need to get proper sliding directions to animation
                    if(slideDirection.toLowerCase() == "top"){
                        slideDirection = "up";
                    }else if(slideDirection.toLowerCase() == "bottom"){
                        slideDirection = "down";
                    }

                    if($(this).parent().find('.flyout').length == 0){
                        //construct tooltip doesn't exist
                        var flyoutDiv = $('<div/>', {
                            'class': 'flyout ' + tooltipObject.position
                        });
                        var divWrap = $('<div/>', {
                            'class': 'flyout-wrap'
                        });
                        var tooltipH3 = $('<h3/>', {
                            text: tooltipObject.heading
                        });
                        var tooltipP = $('<p/>').html(tooltipObject.body);
                        var tooltipLink = undefined;
                        if (tooltipObject.link) {
	                        tooltipLink = $('<a/>', {
	                            href: tooltipObject.link,
	                            text: tooltipObject.linktext || "Learn More"
	                        });
                        }
                        var tooltipClose = $('<a/>', {
                            href: "javascript:void(0);",
                            "class": "close",
                            text: tooltipObject.closetext || "Close"
                        });
                        tooltipClose.click(function(){
                            flyoutDiv.stop(true, true).hide("slide", {direction: slideDirection}, 1000);
                        });
                        divWrap.append(tooltipClose);
                        divWrap.append(tooltipH3);
                        divWrap.append(tooltipP);
                        if (tooltipLink) {
                            divWrap.append(tooltipLink);
                        }
                        flyoutDiv.append(divWrap);
                        flyoutDiv.css('display', 'none');
                        flyoutDiv.appendTo(itemParent);
                        flyoutDiv.css('top','0');
                        flyoutDiv.css(tooltipObject.position,"100%");
                        //flyoutDiv.css('height',ulParent.height());
                        ulParent.css('overflow','visible');
                        ulParent.css('position','relative');
                    }
                    if($(this).parent().find('.flyout').is(":visible") || jQuery.inArray('inprogress',$(this).parent().find('.flyout:visible').queue()) > 0){
                        $('.flyout:visible').not($(this).parent().find('.flyout')).stop(true, true);
                        $('.flyout:visible').not($(this).parent().find('.flyout')).find('.close').click();
                        $(this).parent().find('.flyout').stop(true, true).hide("slide", {direction: slideDirection}, 500);
                    }else{
                        $('.flyout:visible').stop(true, true);
                        $('.flyout:visible .close').click();
                        //fade in
                        $(this).parent().find('.flyout').stop(true, true).show('slide', {direction: slideDirection}, 500);
                    }
                }

            }
        );
    } // $.fn.toolTipInit

})(jQuery);
/* ----------------------------------
 *	Plugin: productModuleTabs 
 *
 *	- Builds tab module
 *	- Adds hover event to
 *	- Adds 'hover' class to parent element
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	

;(function($) {

	$.fn.productModuleTabs = function (argDefaultTab) { 
		
		var $container = $(this);
		var $tab_nav = $container.find('.tabs-nav');
		var $tab_ul = $tab_nav.find('ul');
		var $tabs = $container.find('.tabs-container');
		var DefaultTab = argDefaultTab || ':first';
		
		/* On init find the tab that is active, if none are select first tab and display content */
		if (0 == $tab_ul.children('.active').length) {
			var goto_id = (function(argDef){ 
				var jqDef = argDef || ':first';
				return $tab_ul.children(jqDef).addClass('active').find('a').prop('hash') || jqDef;
			})(DefaultTab);

			$tabs.find(goto_id).fadeIn('slow', function(){$(this).addClass('active');}).parent().siblings().children(".tab").hide().removeClass('active');

		}
		if (0 == $tabs.children('.active').length) {
			
			$tabs.find(':nth-child(2)').addClass('active').siblings().removeClass('active');

		}
		/* Bind hover action */
		$tab_nav.find('li').hover(
			function() {
			
				var $hovered = $(this);
				var goto_id = $hovered.find('a').prop('hash');	
				
				$hovered.addClass('active').siblings().removeClass('active');
				$tabs.find(goto_id).css({'visibility':'visible'}).stop(true,true).fadeIn('slow', function(){$(this).addClass('active');}).parent().siblings().children(".tab").hide().removeClass('active');

			});

		// Tab module nav has no click functionality, 
		// removing default function and event propagation for any clicks on the links
		// This is to prevent confusion with hash tags in the URL not corresponding to the tab content that is
		$tab_nav.find('li > a').click( function(e) {
			e.preventDefault();
			//TODO: consider the use of #!
		});

		        //Call makeBackground plugin
        $container.find('.tab .make-background').makeBackground('.tab');
        //Call vAlignPlugin
        $container.find('.vert-center').vAlign();
        $container.find('li:last-child').addClass('last');
        $container.find('li:first-child').addClass('first');

	} // end $.fn.productModuleTabs		
})(jQuery);
/* ----------------------------------
 *  Plugin: promoSlider
 *
 *  - Builds slider from ul.slides
 *  - Dynamically builds pagination (from ul.slides li's)
 *  - Adds fade in/out roll over effect for the overlay
 *
 *  UsedBy:
 *
 *  Uses:   jquery
 *          jquery.cycle.all.js
 *          jquery.swx.childCount.js
 *
 * --------------------------------- */

;(function($) {

    $.fn.promoSlider = function (argOptions) {
        var me = this;
        var settings = $.extend( {
          'dynamicWidth': 'false' },
           argOptions);

        function autoSelect(currSlideElement, nextSlideElement, options, forwardFlag){
            var $navItem = $(nextSlideElement).find('.slide-item:first');
            $navItem.removeClass("active");
            $navItem.trigger('click');
        }

        return this.each(function() {
            var $container = $(this);

            var $slider = $container.find('ul.slides');

            if(settings.dynamicWidth==='true'){
                //find current width of the slider
                var $sliderWidth =$container.width();
                $container.find('.slides li').first().each(function(){
                    var itemsInSlide = $(this).find('.slide-item').length;
                    var itemWidthForSlide = ($sliderWidth/itemsInSlide)-10;
                    $(this).find('.slide-item').width(itemWidthForSlide);
                });
            }
            var $pagination = $('<ul class="pagination">'); //$container.find('.pagination');
            var num_slides = $slider.children().length;

            // Generate additional UI (pagination / navigation / backfill) as necessary
            if (num_slides>1) {

                var $firstSlide = $slider.children().first();
                if ($firstSlide.children('ul').length > 0) {
                    $firstSlide = $firstSlide.children('ul');
                }

                var $lastSlide = $slider.children().last()
                if ($lastSlide.children('ul').length > 0) {
                    $lastSlide = $lastSlide.children('ul');
                }

                var iBackfill = $firstSlide.children().length - $lastSlide.children().length;
                var pagin_items ='';

                //console.log('slider: ', $slider, 'first:', $firstSlide, 'last:', $lastSlide, 'iBackfill:', iBackfill);

                //Backfill empty items in last slide with items from first slide -- there will be some overlap
                for (var i = 0; i < iBackfill; i++) {
                    $lastSlide.append($($firstSlide.children()[i]).clone(true, true));
                };

                // Build Pagination insert into DOM
                for (var i=0;i<num_slides;i++) {
                    pagin_items += '<li><a href="#">Slide '+(i+1)+'</a></li>';
                }

                $pagination.append($(pagin_items));
                // Set width inline so we can use margin: 0 auto to center the pagination
                $pagination.css('width', i * 9); // Get width of pagination - Each item is 6px wide + 3px right margin (ghetto? yes.)

                $container.append($pagination);

                // Add Prev Next controls
                if ($container.find('a.prev, a.next').length<1) {
                    var $pager = $('<a href="#" title="Previous" class="prev">Previous</a><a href="#" title="Next" class="next">Next</a>');
                    $container.append($pager);
                }
            }

            //Show Slide Animations - Content Overlay
            // Add hover functionality to slider items overlay
            $slider.children().find('> div').each(function(){
                var sOverLay = 'div.overlay'
                if ($(this).find(sOverLay).length > 0) {
                    $(this).hover(
                        function() { // Hover in
                            $(this).find(sOverLay).stop(true, true).fadeIn();
                        },
                        function() { // Hover out
                            $(this).find(sOverLay).stop(true, true).fadeOut();
                        }
                    );
                }
            });

            var opts = {
                fx:         'scrollHorz',
                speed:      'slow',
                timeout:    0,
                next:       $container.find('a.next'),
                prev:       $container.find('a.prev'),
                pager:      $pagination,
                pagerAnchorBuilder: function(idx, slide) {
                    // return selector string for existing anchor
                    return  $pagination.find('> li:eq(' + idx + ') a');
                }
            }

            // Add Auto-Select functionality to slider -- if needed
            if ($container.find('.auto-select').length > 0) {
                opts.before = autoSelect;

                //manually fire autoSelect if slide lengeth is 1
                if (num_slides == 1) {
                    autoSelect(null,$slider.children().first())
                }
            }

            // Build Slider
            $slider.cycle(opts);

            $slider.find('.slide-item:last-child').addClass('last');
        });


    } // end $.fn.promoSlider

    $.fn.promoSlider.TriggerFirst = function () {
        //Select elements and then change top height -- :)
        //$(this).children(':first').css({ top: "+=60", opacity : 0 });
        console.log('first:', $(this));
    };

})(jQuery);
/* ----------------------------------
 *	Plugin: SliderDetailToggle
 *
 *	- Toggles(hides/shows) details block
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 * 			jquery.easing.1.3.js
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.sliderDetailToggle = function(argAutoClose) {
		
		var $context = this; //div.feature-details-slider
		var bAutoClose = false; // if argAutoClose is true then details don't auto close

		if (typeof argAllowManyOpen != 'undefined') {
			bAutoClose = Boolean(argAutoClose);
		}

		//Generate close button.  Note: This places a close button in each .details pane.  
		//This is done in the event that they want multiple panes open.
		
		//$context.find('.details').prepend($('<div class="close-button"><a href="#"><span class="arrow">Close</span></a></div>'));
		$context.find('.details').prepend($('<div class="close-button"><a href="#close"><span class="arrow">Close</span></a></div>'));

		//Bind CLICK to links to show details
		$context.find('.toggleID').bind('click.sliderDetailToggle', function(e) {

			e.preventDefault();

			var $this = $(this);
			var $details = $(this.hash);
			var $clicked_module = $this.closest('.feature-details-slider');

			if ('#'+$clicked_module.find('.details.active').attr('id')!=this.hash) {
				// Hide (slide up) details block
				var $active = $clicked_module.find('.details.active');

				if (!bAutoClose && $active.length > 0) { //if there are active slides trigger the slidedown in the callback
					$active.stop(true, true).slideUp('fast', 'easeOutExpo', function() {
						$(this).removeClass('active');
						// Show (slide down) details block
						$details.stop(true,true).delay(100).slideDown('fast', 'easeInExpo', function() {
							$(this).addClass('active');
						});
					});
				}
				else {
					// Show (slide down) details block
					$details.stop(true,true).slideDown('fast', 'easeInExpo', function() {
						$(this).addClass('active');
					});
				}
			}
		});

		$context.find('.close-button a').bind('click.sliderDetailClose', function(e) {
			e.preventDefault();

			var $this = $(this);
			var $details = $this.closest('.details.active').slideUp('fast', 'easeOutExpo', function() {
				$(this).removeClass('active');
			});
		});
	

	}; // $.fn.SliderDetailToggle

})(jQuery);
/* ----------------------------------
 *	Plugin: childCount
 *
 *	- Adds a helper class that reflects
 *    the number of children.  example: items-n
 *	  where n is the number of children (optionally filterd).
 *
 *  - argsChildSelector = 'jquery selector string' <optional> defaults to all children.
 *
 *  - argsCssPrefix = 'prefix to use for css class' <optional> defaults to "items"
 *
 *  UsedBy: HTML Markup for Modules (Generic Helper)
 * 			jquery.twc.featureCarouselInit.js
 *
 *  Uses: 	jquery-1.7.1
 *
 * --------------------------------- */

;(function($) {
	$.fn.childCount = function(argsChildSelector, argsCssPrefix) {
		return this.each(function(i){
			var $this = $(this);
			var childSelector = argsChildSelector || "";  /* Defaults to all children, empty string */
			var cssPrefix = (argsCssPrefix || "items") + '-';  /* Defaults to items for prefix */
			var iChildren = $(this).children(childSelector).length;

			// Remove any classes on the element that begins with the same prefix
			var old_class = $this.attr('class') || '';
		    var regx = new RegExp('\\b('+cssPrefix+'\\S*)\\b', 'g');

		    $this.attr('class',old_class.replace(regx, ''));
			$this.addClass(cssPrefix+iChildren);

		});
	};
})(jQuery);
/* ----------------------------------
 *	Plugin: tableRowToggle
 *
 *	- Toggles(hides/shows) details row
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery-1.7.1
 * 			jquery.easing.1.3.js
 *			jquery.vAlign.js
 *
 * --------------------------------- */	
;(function($) {	   

	$.fn.tableRowToggle = function() {
			
		var $table = this; //table.compare
		
		// Click event for showing/hiding the details row
		$table.find('.details-trigger').click( function() {
		
			var $clicked = $(this);
			var $clicked_tr = $clicked.parents('tr');
			var $details_cell_link = $clicked_tr.find('td.details a') || $();
			var $goto = $(this.hash);
			var $media = $goto.closest('tr').find('.media') || $();

			$goto.find('.wrap').stop(true, true).slideToggle('normal', 'easeInOutQuart', function() {
				$clicked_tr.toggleClass('active'); 
				$details_cell_link.html(('details' == $.trim($details_cell_link.html().toLowerCase())) ? 'Close' : 'Details');
				//($details_cell_link.text() == 'Details') ? $details_cell_link.text('Close') : $details_cell_link.text('Details');
				if ($media.css('margin-top') == '0px') {  //only center if hasn't been done so already (manual or auto)
					$media.vAlign();	//vertically align the media image (img is set to visible:hidden by default to reduce fouc)
				}
				$media.find('img').css('visibility', 'visible');	//reveal hidden image
			});	

			return false;

		}); // click

		$table.find('tr').hover(
			function() { // hover in
				$(this).addClass('hover');
			},
			function() { // hover out
				$(this).removeClass('hover');
			}
		);

	}; // $.fn.tableRowToggle

})(jQuery);
/* ----------------------------------
 *  Plugin: toolTipInit
 *
 *  - Init's the Tool Tip functionality
 *
 *  UsedBy:
 *
 *  Uses:   jquery
 *
 * --------------------------------- */

;(function($) {
    $.fn.toolTipInit = function() {
        $(this).hover(
            function () {

                // Get data-attr
                var dataTooltip = $(this).attr('data-tooltip');

                // Save parent elem
                var $parent_elem = $(this);

                if(typeof dataTooltip != "undefined" ){
                    // Check if src

                    //check if already in dom if not create it
                    var tooltipObject = $.parseJSON(dataTooltip);

                    //if($('body').find('.tooltip').length == 0){

                        // Default position = right
                        var position = tooltipObject.position || "right";

                        var $toolTipDiv = $('<div/>', {
                            'class': 'tooltip ' + position
                        });
                        var $divWrap = $('<div/>', {
                            'class': 'wrap'
                        });
                        var $tooltipH3 = $('<h3/>', {
                            text: tooltipObject.heading
                        });
                        var $tooltipP = $('<p/>', {
                            text: tooltipObject.body
                        });
                        var $arrow = $('<span/>', {
                            'class': 'arrow'
                        });



                        // Append elements to body
                        $divWrap.append($tooltipH3, $tooltipP, $arrow);
                        $toolTipDiv.append($divWrap);
                        $toolTipDiv.appendTo($('body'));

                        // Get tooltip elem
                        var $tooltip_elem = $('body').find('.tooltip');
                        var tooltip_height = $tooltip_elem.height(); // ignore bottom padding in height
                        var tooltip_width = $tooltip_elem.width();

                        var parent_height = $parent_elem.innerHeight(); // full height, including padding
                        var parent_width = $parent_elem.width();

                        // Begin calculating coordinates for tooltip position (X/Y)
                        var offset = $(this).offset();

                        // Baseline offset Y (top position)
                        var offsetY = (tooltip_height / 2) - (parent_height/2);
                        offsetY = (offset.top - offsetY);

                        // Baseline offset X (left position)
                        var offsetX = offset.left;

                        // Center Element (used for top and bottom positions) relative to the parent element
                        var centerX = offsetX - ((tooltip_width / 2) - (parent_width / 2 )); // Centered elem

                        var arrow_css = {} // css object for arrow

                        switch(position) {
                            case "top":
                                offsetY = offset.top - (tooltip_height+20); // +20 is a small tweak to get the spacing correct
                                offsetX = centerX; // Center element
                                arrow_css = {'left': (tooltip_width / 2) };
                                break;
                            case "right":
                                offsetY -= ($arrow.height()/2); // Adding the arrow height
                                offsetX += parent_width; // Align tooltip to the right of the element
                                arrow_css = {'top': (tooltip_height / 2) };
                                break;
                            case "bottom":
                                offsetY += (tooltip_height / 2) + parent_height; // Align tooltip below the element
                                offsetX = centerX; // Center tooltip element relative to the parent element
                                arrow_css = {'left': (tooltip_width / 2) };
                                break;
                            case "left":
                                offsetY -= ($arrow.height()/2); // Adding the arrow height
                                offsetX -= tooltip_width; // Make sure the tooltip visibly appears to the left of the element
                                arrow_css = {'top': (tooltip_height / 2) };
                                break;
                        }

                        // Set arrow position
                        $arrow.css(arrow_css);

                        // Set the tooltip top/left positions based on above calculations
                        $tooltip_elem.css({'top':offsetY, 'left':offsetX});

                    //}
                }
                //fade in
                $tooltip_elem.stop(true, true).fadeIn();
            },
            function () {
                //fade out
                $('body').find('.tooltip').stop(true, true).fadeOut().remove();
            }
        );
    } // $.fn.toolTipInit

})(jQuery);
/* ----------------------------------
 *  Plugin: filterPackages
 *
 *  - Toggles(hides/shows) details block
 * 
 *  UsedBy: 
 *
 *  Uses:   jquery
 *          jquery.easing.1.3.js
 *
 * --------------------------------- */ 

;(function($) {    
    $.fn.filterPackages = function(argTextVals) {

        var $context = this; //div.filter-packages
        var $details_wrap = $context.find('.details-modules');
        var $details_module = $context.find('.details-module');
        var $items = $context.find('.item');
        var num_items = $items.length;

        var options = $.extend({}, argTextVals);
        var default_text = options.defaultText || "View Details"; // Super fallback text
        var active_text = options.activeText  || "Hide Details";


        // Equalizing the height of all the item divs
        $items.find('.details .wrap').equalizeHeights();
        //Generate close button.  Note: This places a close button in each .details pane.
        //This is done in the event that they want multiple panes open.
         //$details_wrap.prepend($('<a href="#" class="close">Close</a><img src="static/images/arrow-large-down.png" alt="" class="active-arrow" /> '));            
         $details_wrap.prepend($('<a href="#" class="close">Close</a><img src="' + globalVars.featureImages + 'arrow-large-down.png" alt="" class="active-arrow" /> '));            
        
        //Bind CLICK to links to show details
        $context.find('.toggle-content').text(default_text).bind('click.filterPackagesToggle', function(e) {
            e.preventDefault();

            var $this = $(this);
            var $details = $(this.hash);
            var $clicked_module = $this.parents('.item');
            var offset = $clicked_module.position();
            var index = ($items.index($clicked_module))+1; // Adding 1 to offset the leading 0 in the index, this lines up with num_items for finding the correct position of the active arrow
            var $active_arrow = $context.find('.active-arrow');

            if ($details.hasClass('active')) { // Current Link is clicked link
                // Update details link (clicked link)
                $context.find('a.active').removeClass('active').text(default_text);
                // Update text

                $details_wrap.stop(true,true).slideUp('fast', 'easeInExpo', function() {
                    $(this).removeClass('active');
                    $details.removeClass('active');
                });             
            } else if($details_wrap.hasClass('active')) { // already open, fade in details module
                // In If, fade out current details module, fade in new one  
                
                // Update details link (clicked link)
                $context.find('a.active').removeClass('active').text(default_text); 
                $this.addClass('active').text(active_text); 

                $details_wrap.find('.details-module.active').fadeOut(function() {
                    $(this).removeClass('active');
                   $details.fadeIn(function() {
                        $(this).addClass('active');
                        //The fade in effect above leaves an inline style attribute that needs removed. 
                        $(this).removeAttr('style');
                    });                         
                });
            } else {
                // Update details link (clicked link)
                $context.find('a.active').removeClass('active').text(default_text); 
                $this.addClass('active').text(active_text); 
                
                $details.addClass('active');
                $details.show();
                $details_wrap.stop(true,true).slideDown('fast', 'easeInExpo', function() {
                    $(this).addClass('active');
                });
            }

            // Set correct position of the active arrow, using left
            var left = ($items.width()/2)-($active_arrow.width()/2)+offset.left;
            $active_arrow.css('left',left);

        });

        $context.find('a.close').bind('click.filterPackagesClose', function(e) {
            e.preventDefault();

            var $this = $(this);

            // Update details link (clicked link)
            $context.find('a.active').removeClass('active').text(default_text); 

            $details_wrap.slideUp('fast', 'easeOutExpo', function() {
                $(this).removeClass('active');
                $details_module.removeClass('active');
               // $details_module.hide();
            });
        });
    }; // $.fn.filterPackages

    $.fn.equalizeHeights = function() {
    	  var maxHeight = this.map(function(i,e) {
    	    return $(e).height();
    	  }).get();

    	  return this.height( Math.max.apply(this, maxHeight) );
    };

})(jQuery);
/* ----------------------------------
 *  Plugin: revealModuleToggle 
 *
 *  - Adds reveal hide/show toggle
 *  - Adds 'hover' class to grid elements
 * 
 *  UsedBy: 
 *
 *  Uses:    jquery
 *
 * --------------------------------- */

(function ($) {

    $.fn.revealModuleToggle  = function (argOptions) {
        function log() {
            window.console && console.log && console.log('[revealModuleToggle] ' + Array.prototype.join.call(arguments, ' '));
        }

        //default options
        var _options = {
                "data": {
                    "viewMoreText": "View More",
                    "viewLessText": "View Less"
                }
            },
            Template = function (context) {

                var $this = $(context),
                    $grid = $this.find('.grid'),
                    $grid_list = $this.find('.grid ul'),
                    $grid_items = $grid_list.find('li'),
                    $view_toggle = $this.find('.view-toggle'),
                    intial_height = $grid.height(),
                    expanded_height = $grid_list.height(),
                    $overlays = $grid_items.find('.overlay');

                this.$grid = $grid;
                this.$grid_list = $grid_list;
                this.$grid_items = $grid_items;
                this.$view_toggle = $view_toggle;
                this.intial_height = intial_height;
                this.expanded_height = expanded_height;
                this.$overlays = $overlays;
            };

        function _bind(options) {
            this.$view_toggle.find('a').text(options.data.viewMoreText);
        }

        function _initRevealModule(options) {
            var $this = $(this),
                template = new Template($this);

            template.$view_toggle.find('a').click(function () {
                if (template.$view_toggle.hasClass('less')) { // Hide
                    template.$grid.stop().animate({'height': template.intial_height}, 'fast', function () {
                        template.$view_toggle.removeClass('less');
                        template.$view_toggle.find('a').text(options.data.viewMoreText);
                    });                    
                    return false;

                } else { // show
                    template.$grid.stop().animate({'height': template.expanded_height}, 'fast', function () {
                        template.$view_toggle.addClass('less');
                        template.$view_toggle.find('a').text(options.data.viewLessText);
                    });
                
                return false;
            }});

            template.$overlays.each(function () {
                $(this).data('dHeight', $(this).height());
            });

            template.$grid_items.hover(
                function () {  // Hover In
                    var $overlay = $(this).find('.overlay');
                    $overlay.stop().animate({'height': 155}, 'fast').find('p').show();
                },
                function () { // Hover Out
                    var $overlay = $(this).find('.overlay');
                    $overlay.stop().animate({'height': $overlay.data('dHeight')}, 'fast', function () {
                        $overlay.find('p').hide();
                    });
                }
            );
        }

        return this.each(function () {

            var $this = $(this),
                metaOptions = $(this).data('options'),
                options, template, bind, init;

            //support single URL as String for JSON Source
            if (typeof metaOptions === 'string') {
                log('Info: String detected in place of options. Assuming usage as data src url.');
                metaOptions = {'src': metaOptions};
            }

            options = $.extend({}, _options, argOptions, metaOptions);

            template = new Template(this);
            bind =  $.proxy(_bind, template);
            init = $.proxy(_initRevealModule, this);
            
            var $view_toggle = $this.find('.view-toggle');
            if (template.$grid_items.length <=8 ) {        	
        		template.$view_toggle.find('a').remove();
            }
            else
            {
            	template.$view_toggle.removeClass('hidden');
            }


            // BIND and INIT
            if (typeof options.src !== 'undefined' && options.src !== '') {
                $.getJSON(options.src, function (data) {
                    $.extend(options, data);
                    bind(options);
                    //template = new Template(this);
                    init(options);
                });
            } else {
                //No data for carousel
                log('No Data: Trying to load from markup.');
                bind(options);
                init(options);
            }
        });
    }; // end $.fn.revealModuleToggle
})(jQuery);
/* ----------------------------------
 *	Plugin: modalInit
 *
 *	- Initiates modal functionality
 *  - Opens modal window on click of a.modal
 *
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.modalInit = function(argCallBackBefore, argCallBackAfter){

		var fnCallBackBefore = (typeof argCallBackBefore == 'function') ? argCallBackBefore : new Function()
		var fnCallBackAfter = (typeof argCallBackAfter == 'function') ? argCallBackAfter : new Function()


		this.each( function() {
			var $trigger = $(this); // a.modal
			var $goto_modal = $(this.hash); // a.modal
			var $modal = $(this.hash+'-modal.modal');

			$goto_modal.find('a.close, a.closeBtn').unbind('click.closeModal').bind('click.closeModal', function(e){
			 	e.preventDefault();
				fnCallBackBefore.call($goto_modal);

			 	$goto_modal.fadeOut('normal', function(){
				 	$modal.fadeOut('normal', function(){
			 			fnCallBackAfter.call($goto_modal);
				 	});
			 	}); //IE7 sometimes stops the fadeout animation if the parent fades out first.
			 });

			//*** need to find another way to binding to the mask because the pugin can be run multiple times and the last run would win  using this method **/
			// $modal.unbind('click.closeModal').bind('click.closeModal', function(e){
			//  	e.preventDefault();
			// 	fnCallBackBefore.call(this);

		 // 		var $VisibleModals = $modal.find('.modal-box:visible');
			//  	$VisibleModals.fadeOut('normal', function(){
			// 	 	$modal.fadeOut('normal', function(){
			//  			fnCallBackAfter.call(this);
			// 	 	});

			//  	}); //IE7 sometimes stops the fadeout animation if the parent fades out first.
			//  });

			$modal.find('.modal-box').click(function(e){
				e.stopPropagation(); //prevents default close from propagating the modal-box container
			});


			$trigger.click( function(e){
				e.preventDefault();
console.log("click");
				// $modal is the parent element of $goto_modal, show the child first, then fade the parent in (this will smooth transistions)
				// Since height isn't available to elements with display:none temporarily shift to visiblity: hidden to get the rendered size.
				// Offset needs to be calculated every click because the viewport may change size (ex: window resize)

				$modal.css({visibility: 'hidden', display: 'block'});
				$goto_modal.css({visibility: 'hidden', display: 'block'});

				var top = (($(window).height() / 2) - ($goto_modal.height() / 2));

				$modal.css({visibility: 'visible', display: 'none'});
				$goto_modal.css({visibility: 'visible', display: 'none'});
				
				$goto_modal.css({top: top});
				$goto_modal.show();
				$modal.fadeIn();	
			});

		}); // .each
	} // end $.fn.modalInit
})(jQuery);
/* ----------------------------------
 *	Plugin: channelLineup
 *
 *	- Builds channel lineup tabs
 * 
 *  UsedBy: 
 *
 *  Uses: 	
 *
 * --------------------------------- */	

;(function($) {
	$.fn.channelLineup = function () {
		var me = $(this);
		
		// if($('.no-borderradius').length){
		// 	me.append('<span class="corner tl"></span><span class="corner tr"></span>');
		// }
		
		me.find('.tabs li').click(function(){
			$(this).addClass('active').siblings('li').removeClass('active');
		});
	}
})(jQuery);
/* ----------------------------------
 *	Plugin: channelLineup
 *
 *	- Search results page
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 *
 * --------------------------------- */	

;(function($) {
	$.fn.searchFilters = function () {

		var $context = $(this), // .search-nav
			$filter_lists = $context.find('.filters ul'),
			$filters = $filter_lists.find('a');
			$active_filters = $context.find('.active-filters'),
			$close = $context.find('a.close'),
			$clear = $context.find('a.clear-all');

		if (!$active_filters.children('ul').length) {
			$('<ul></ul>').insertAfter($active_filters.children(':first-child'));
		}

		/** Click event for adding/removing filter from the filter list */
		$filters.click( function() {
			var $clicked = $(this),
				$parent = $clicked.parent(),
				text = $clicked.getTextOnly(),
				filter_item = '<li><span>' + text + '</span><a href="#" class="close">Close</a></li>';

			if ($parent.hasClass('active')) {
				$parent.removeClass('active');
				
				// Find corresponding filter in the active filters list, remove it.
				$active_filters.find('li span:contains('+text+')').parent().fadeOut(function() {
					$(this).remove();
				});

			} else {
				$parent.addClass('active');

				// Check if active filters container is hidden, if it is show it and then append the filter item, if not, then append the filter item
				if($active_filters.is(':hidden')){
					$active_filters.slideDown();
				}
				
				$active_filters.children('ul').prepend(filter_item).fadeIn();								
			} 

			return false;
		});

		/** Click event for 'close' **/
		$close.live('click', function() {
			var $clicked = $(this),
				$parent = $(this).parents('li'),
				text = $parent.find('span').getTextOnly();

			// Remove filter from active filter list
			$(this).parent().fadeOut(function() {
				
				// Remove filter 
				$(this).remove();

				// Remove 'active' class from corresponding filter link
				$filter_lists.find('a:contains('+text+')').parent().removeClass('active');
	
				// Check if active filters has any active filters, if not hide it
				if(!$active_filters.find('ul li').length) {
					$active_filters.slideUp('slow');
				}

			});

			return false;

		});

		/** Click event for 'close' **/
		$clear.live('click', function() {

			$active_filters.find('li').fadeOut('fast', function() {
				$(this).remove();
				$filter_lists.find('li.active').removeClass('active');
			});

			$active_filters.slideUp('slow');
			

			return false;

		});
	
	}

	$.fn.getTextOnly = function() {
		return $(this).clone() // Clone the element
        			.children() 	// Select all the children
        			.remove()   	// Remove all the children
        			.end() 			// Again go back to selected element
        			.text();    	// Get the text of element

	}
})(jQuery);
/* ----------------------------------
 *  Plugin: multiPanelTabs 
 *
 *  - Builds tab module
 *  - Adds hover event to
 *  - Adds 'hover' class to parent element
 * 
 *  UsedBy: 
 *
 *  Uses:   jquery
 *
 * --------------------------------- */ 

;(function($) {

    $.fn.multiPanelTabs = function (argDefaultTab) { 
        
        /* Main function that Reveals the content */
        function ShowPanel() {
            var $this = $(this);
            //tabs panel holds the main splash images.
            var $tab_panels = $('.tabs-container:has(.multipanel)');
            var goto_id = ($this.find('a').prop('hash') || '#').replace('#', '.multipanel-');
            
           
            $this.addClass('active').siblings().removeClass('active');
            $tab_panels
                .find(goto_id)
                // .stop(true, true)
                .fadeIn('slow', function(){
                       // $(this).addClass('active');
                    })
                .siblings()
                .hide()
                .removeClass('active');
            var $focus = $(this).find('a');
             //creates the ID of the target splash/slide from the href of the clicked link in the menu.
            var panelID = ($focus.prop('hash') || '#').replace('#', '.multipanel-');
            
            var $multipanelParent = $(this).closest('.multipanel-tabs').children('.multipanel-container');
            var $visiblePanel = $multipanelParent.children(panelID);
            var $navItem = $visiblePanel.find('.slide-item:first');
            $navItem.removeClass('active');
            $navItem.trigger('click');
        }
        
        /* Main function that Reveals the content */
        function ShowPanelOrLinkDetails() {
            var $this = $(this);
            // see if this tab is active.  If so, go to the details url
            if ($this.hasClass("active") && $(this).data('detailsurl')!=undefined){
                var detailsUrl = $(this).data('detailsurl');
                location.href=detailsUrl;
            }
            else
            {
                ShowPanel.call($this);
            }
        }

        /* Helper function to generated .class based IDs for the tab containers */
        function generateContainerID(tabGroup) {
            return (typeof tabGroup != undefined) ? ('multipanel-container-' + tabGroup) : ('');
        }
        
        /* Helper function to generated .class based IDs for the navigation items */
        function generatePanelID(tabGroup, panelID) {
            return (typeof tabGroup != undefined && typeof panelID != undefined) ? ('multipanel-' + tabGroup + '-' + panelID) : ('');
        }

        function initClassID() {

            /** Panels can exist anywere in the body,
                so search outside of the scope of this **/
            $('.multipanel-container').each(function(){
                //top tabs in menu are in class tabs-nav inside multipanel-tabs
                
                /* 
                ** $(this) refers to the multipanel-tab group thus all multipanel containers on the page are linked to
                ** this menu on init.
                */ 
                var $tabGroup = $(this);
                
                //check to make sure we haven't already run multipanel tabs.
                var isInit = Boolean($(this).data('multipanel.isInit')) || false;

                if (isInit) {
                    /* abort if has been initialized */
                    return;
                }
                else {
                    $(this).data('multipanel.isInit', true);
                }
                
                //Pull from HTML5 data element. typically 'feature' or 'premium
                var tabGroupID = $(this).data('tabgroup');
                //the $tabPanel is now the set of the larger buttons in the multipanel. It refers to the container element of those buttons.
                var $tabPanel = $tabGroup.find('.multipanel');
                
                //Add class to the tabs container - typically multipanel-container-feature
                $tabGroup.addClass(generateContainerID(tabGroupID));
                
                
                $tabPanel.each(function(){
                    var tabPanelID = $(this).data('tabid'); 
                    //Add appropriate classes to each *panel*. j.e. multipanel-tabgroupID-tabPanelID
                    //Note that the individual buttons inside each panel do not have added classes.
                    $(this).addClass(generatePanelID(tabGroupID, tabPanelID));

                    /* Restore proper visibility */
                    $(this).css({'display': 'none', 'visibility': 'visible'});
                })
            })
        };
        //builds classes on the menu panels.
        initClassID.call(this);
        
        return this.each(function() {
            var $container = $(this);
            var tabGroup = $container.data('tabgroup');
            var $tab_nav = $container.find('.tabs-nav');
            var $tab_ul = $tab_nav.not('.multipanel-tabs').find('ul');
            var $tab_panels = $('.tabs-container:has(.multipanel)');
            var DefaultTab = $container.data('tab-default') || argDefaultTab || '.active' || ':first';
            //alert(DefaultTab);
            /* Bind ShowPanel to click event  */
            $tab_ul.find('li').each(function(){
                var showTab = $.proxy(ShowPanel, $(this));
                var showTabOrLinkDetails = $.proxy(ShowPanelOrLinkDetails, $(this));
                $(this).unbind('click.multiPanelTabs').bind( 'click.multiPanelTabs', showTabOrLinkDetails);
                //ensure that whenever a tab is clicked, the hash of that item's sub anchor is used.
              

            });

            /* On init find the button? that is active, if none are select first tab and display content */
            $tab_ul.each(function(){
                var goto_id;
                var $tabs = $(this).children('li');
                //on each li item add a click handler.
                 
                var $active = $tabs.filter('li.active');

                if (0 == $active.length) {
                    $active = $tabs.filter(DefaultTab)
                }
                
                if ($active.is(':visible')) {
                    //$active.triggerHandler('click');
                   // alert($active.data('detailsurl'));
                    ShowPanel.call($active);
                }
            });

            // Tab module nav has no click functionality, 
            // removing default function and event propagation for any clicks on the links
            // This is to prevent confusion with hash tags in the URL not corresponding to the tab content that is
            $tab_ul.find('li > a').click( function(e) {
                e.preventDefault();
               // window.location.hash = $(this).attr('href');
                //TODO: consider the use of #!
            });
          
        });

        
    } // end $.fn.productModuleTabs     
})(jQuery);
/* ----------------------------------
 *	Plugin: featureCarouselInit
 *
 *	- Init's the main nav hover functionality, 
 * 	  with the mega menu drop downs
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery
 *			jquery.cycle.all
 * 			jquery.multipanel (indirectly)
 *
 * --------------------------------- */	
;(function($) {	   

	$.fn.featureCarouselInit = function() {

		//Bind Tab Clicks to Associated Multipanel and 
		//	Set Slides to first Slide and 
		//	Trigger selection of first item as failback if carousel doesn't init (ex: carousel length = 1)

		return this.each(function() {
			
			var $container = $(this);

			$container.find('>.tabs-nav li').bind('click.featureCarouselTab', function() {
				var $focus = $(this).find('a');
				var panelID = ($focus.prop('hash') || '#').replace('#', '.multipanel-');
				var $multipanelParent = $(this).closest('.multipanel-tabs').children('.multipanel-container');
				var $visiblePanel = $multipanelParent.children(panelID);
				var $navItem = $visiblePanel.find('.slide-item:first');
				$navItem.trigger('click');

				var $slider = $visiblePanel.find('.slider ul.slides');
				$slider.cycle(0);

			});
		});

	} // $.fn.navInit

})(jQuery);
;(function($) {
    $.fn.locationHoverToggle = function(optclass) {

        $(this).each(function() {
            var hoverclass = optclass || 'hover';
            var parent = $(this).parent();

            // TODO: fix this kludge that works around swx hover plugin
            parent.unbind('mouseenter mouseleave');
            parent.find('a.hover-close').off('click');

            parent.hover(
                function() { // Hover In
                    parent.addClass(hoverclass);
                },
                function() { // Hover Out
                    if($.cookie('locerrorclosed') === '0') {
                        parent.removeClass(hoverclass);
                        parent.find('input').blur();
                    }
                }
            );

            // In some instances close button is needed, this removes the hover class from the parent element
            parent.find('a.hover-close').click(function(e) {
                e.preventDefault();
                parent.removeClass(hoverclass);
                parent.find('input').blur();
                $.cookie('locerrorclosed', '1', {expires: 365, path: '/'});
            });
        });
    };
})(jQuery);
/* ----------------------------------
 *	Plugin: animateBarsCards
 *
 *	- Plays a sequence of animations for Intenet Music and Photos 
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery-1.7.1
 *			jQueryRotateCompressed.2.2.js
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.animateBarsCards = function(argOptions) {
		
		function log() {
			window.console && console.log && console.log('[animateBarsCards] ' + Array.prototype.join.call(arguments,' '));
		}
		
		//Animate the bar height
		function _raiseTheBar(options) {
			//Raise the Bar

			$(this).find('.bar').each(function() {
				var $bar = $(this);
				var scale = $(this).data('scale');

				// Animate the height of the 'div' with a callback function
				$bar.animate({'height':scale}, 
					{
						duration: options.timing.chartBar, 
						complete: function() {
							// once the bar animation has finished, fade in the results
							$bar.children().fadeIn(options.timing.chartBarLable);
						}
					}
				);
			});
		}
		
		//**Inits the BarChart
		function _BarChart(options, argCallback) {

			var fnCallback = (typeof argCallback == 'function') ? argCallback : new Function();
			var $this = $(this);

			$(this).find('th').each(function(i) {
				var $context = $(this);
				var iWait = ((options.timing.chartHeaders/($context.siblings().length+1))*i)-options.timing.photosDelay; 
				var iDuration = (options.timing.chartHeaders/($context.siblings().length+1));

				iWait = (iWait < 1) ? 0 : iWait;

				$context.delay(iWait).fadeIn(iDuration, function(){
					if ($context.index() == ($context.siblings().length)) {
						//All Headers are now visible begin barAnimation and optional callback
						_raiseTheBar.call($this, options);
						fnCallback.call($this);
					}
				}); // End th.fadeIn
			}); // END th.each
		}

		//** Load PhotoStack
		function _PhotoStack(options, argCallback) {

			var fnCallback = (typeof argCallback == 'function') ? argCallback : new Function();
			var $this = $(this);
						
			$($(this).find('.photo').get().reverse()).each(function(i) {

				var $context = $(this);
				var iWait = ((options.timing.photos/($context.siblings().length+1))*i)+(options.timing.photosDelay * i); 
				var iDuration = (options.timing.photos/($context.siblings().length+1));

				iWait = (iWait < 1) ? 0 : iWait;

				// log('-----');
				// log($context.find('img').attr('src'));
				// log('Wait:' + iWait);
				// log('Duration:' + iDuration);

				// Add rotation, offset, and z-index
				// NOTE: plugin was designed for targeting IMG element for LTE ie8 but the result is undesireable (VML). Images will not be rotated in legacy browsers. 
				$context.rotate($context.data('r'));
				$context.css({
					  'margin-top' : $context.data('y')
					, 'margin-left' : $context.data('x')
					, 'z-index' : i
				});
				
				$context.delay(iWait).animate(
					{
						 opacity: 1
						,top: 0
					},
					{
						  duration:iDuration
						, specialEasing: {
							  opacity: 'easeOutExpo'
							, opacity: 'easeInCirc'
						}
						//, easing: 'easeOutExpo'
						, complete: function(){
							//All animation complete begin optional callback
							fnCallback.call($this);
						}
					});
				}
			);
		}

		//** Bind JSON data to controls
		function _bind(options) {
			// this: context of template object			
			
			this.$background.attr('src', options.data.background);
			this.$title.html(options.data.title);
			this.$body.html(options.data.body);

			this.$chartLegend.html(options.data.chart.legend);
			this.$chartTable.empty();
			var $chartHeaders = $("<tr />");
			var $chartBars = $('<tr />');
			for (var i = 0; i < options.data.chart.bars.length; i++) {

				var $lable = $('<p />');
				$lable.html(options.data.chart.bars[i].lable);
				
				var $bar = $('<div class="bar" />');
				$bar.attr('data-scale', options.data.chart.bars[i].scale);
				$bar.append($lable);

				var $td = $('<td>');
				$td.append($bar);

				var $th = $('<th class="speed-package"/>');
				$th.html(options.data.chart.bars[i].header);

				$chartHeaders.append($th);
				$chartBars.append($td);

			};
			this.$chartTable.append($chartBars);
			this.$chartTable.append($chartHeaders);

			this.$photoStack.empty();
			for (var i = 0; i < options.data.photos.length; i++) {

				var $photoFrame = $('<div class="photo" />');
				$photoFrame.attr('data-r', options.data.photos[i].rotation);
				$photoFrame.attr('data-x', options.data.photos[i]['x-offset']);
				$photoFrame.attr('data-y', options.data.photos[i]['y-offset']);
				
				var $photo = $('<img>');
				$photo.attr('src', options.data.photos[i].image);
				
				$photoFrame.append($photo);
				this.$photoStack.append($photoFrame);
			};

			this.$copyright.empty();
			if (options.data.copyright !== '') {
				this.$copyright.html(options.data.copyright);
			}

			this.$disclaimer.empty();
			if (options.data.disclaimer !== '') {
				this.$disclaimer.html(options.data.disclaimer);
			}
		}


		//** Initialize: Ideally these settings should also be defined in css
		function _initAnimation() {
			// this: context of template object

			this.$background.stop(true,true).hide();
			this.$title.stop(true,true).hide();
			this.$body.stop(true,true).hide();
			this.$copyright.stop(true,true).hide();
			this.$disclaimer.stop(true,true).hide();
			this.$chartTable.stop(true,true).hide();
			this.$chartHeaders.stop(true,true).hide();
			this.$chartLegend.stop(true,true).hide();
			this.$chartBars.stop(true,true).css({'height': 0}).children().stop(true,true).hide();
			this.$photos.stop(true,true).fadeTo(0, '.1').css({'position': 'absolute', 'top': '-500px', display: 'block'});
		}

		var _options = {
			 'data': {
			 	  'background': globalVars.featureImages + 'empty-slide.jpg'
			 	, 'class': ''
			 	, 'title': ''
			 	, 'body': ''
			 	, 'copyright': ''
			 	, 'disclaimer': ''
				, 'chart': {
					  'legend' : ''
					, 'bars' : [
						{
							  'header' : ''
							, 'lable' : ''
							, 'scale' : ''
						}
					]
				  }
				, 'photos': [
			 		{
			 		 	  'image': ''
			 		 	, 'rotation': ''
			 		 	, 'x-offset': ''
			 		 	, 'y-offset': ''
			 		}
			 	]
			 }
			, 'timing': {
				  'background': 600
				, 'title': 600
				, 'body': 600
				, 'copyright': 600
				, 'copyrightDelay': 0
				, 'disclaimer': 600
				, 'disclaimerDelay': 0
				, 'chartLegend': 600
				, 'chartLegendDelay': 600
				, 'chartHeaders': 600
				, 'chartHeadersDelay': 0
				, 'chartBar': 4000
				, 'chartBarLable': 200
				, 'photos': 2400
				, 'photosDelay': 200
			}
		}

		var _template = function(context){
		//**  	Returns a template object who's members are jQuery objects 
		//		of the various regions being updated.
			var $this = $(context);

			// NOTE: Since we are working with re-usable markup we need to 
			// check for it's existance and create it if necessary, idealy it 
			// will be stubbed out on the page but empty.
			// Much of this code can be trimmed if we decide on 
			// inlining vs generating the markup.
			var $featureImage = $this.find('.feature-image');
			var $overlay = $this.find('>.overlay:first');
			var $rtf = $overlay.find('.animation-header');
			var $title = $rtf.find('h2:first');
			var $body = $rtf.find('p:first');
			var $footer = $overlay.find('.animation-footer');
			var $copyright = $overlay.find('.copyright');
			var $disclaimer = $overlay.find('.disclaimer');
			var $animationChart = $rtf.find('.animation-chart');
			var $chartLegend = $animationChart.find('h3')
			var $chartTable = $animationChart.find('table');
			var $photoStack = $overlay.find('.photo-stack');

			if ($featureImage.length == 0) {
				$featureImage = $('<div class="feature-image" />').append('<img src="/etc/designs/residential/clientlibs/images/fancyboximages/blank.gif">');
				$this.prepend($featureImage);
				// log('failsafe: featureImage')
			}

			if ($overlay.length == 0) {
				//missing overlay so injecting it
				$overlay = $('<div class="overlay" />').append($('<div class="wrap" />'));
				$featureImage.after($overlay);
				$overlay = $this.find('.overlay .wrap');
				// log('failsafe: overlay')
			}

			if ($rtf.length == 0) {
				$rtf = $('<div class="rtf animation-header right"/>')
					.append('<div class="animation-chart" />');
				$overlay.append($rtf);
				// log('failsafe: rtf')
			}

			if ($title.length == 0) {
				$title = $('<h2 />');
				$rtf.prepend($title);
				// log('failsafe: title');
			}

			if ($body.length == 0) {
				$body = $('<p />');
				$title.after($body);
				// log('failsafe: body');
			}

			if ($animationChart.length == 0) {
				$animationChart = $('<div class="animation-chart" />');
				$body.after($animationChart);
				// log('failsafe: animationChart')
			}

			if ($chartLegend.length == 0) {
				$chartLegend = $('<h3 class="speed-details"/>');
				$animationChart.prepend($chartLegend);
				// log('failsafe: chartLegend');
			}

			if ($chartTable.length == 0) {
				$chartTable = $('<table />');
				$chartLegend.after($chartTable);
				// log('failsafe: chartTable');
			}

			if ($photoStack.length == 0) {
				$photoStack = $('<div class="photo-stack" />');
				$overlay.append($photoStack);
				// log('failsafe: photoStack');
			}
			
			if ($footer.length == 0) {
				$footer = $('<div class="animation-footer" />');
				$photoStack.after($footer);
				// log('failsafe: footer');
			}

			if ($disclaimer.length == 0) {
				$disclaimer = $('<p class="disclaimer"/>');
				$footer.append($disclaimer);
				// log('failsafe: disclaimer');
			}

			if ($copyright.length == 0) {
				$copyright = $('<p class="copyright"/>');
				$footer.append($copyright);
				// log('failsafe: copyright');
			}


			//$this.empty();

			// expose the template regions

			this.$background = $this.find('.feature-image img:first');
			this.$rtf = $rtf;
			this.$title = $title;
			this.$body = $body;
			this.$copyright = $copyright;
			this.$disclaimer = $disclaimer;
			this.$chartTable = $chartTable;
			this.$chartHeaders = $this.find('.animation-chart th');
			this.$chartLegend = $chartLegend;
			this.$chartBars = $this.find('.animation-chart .bar');
			this.$photoStack = $this.find('.photo-stack');
			this.$photos = $this.find('.photo-stack .photo');
			this.$content = $.fn.add(this.$title).add(this.$body);
		}

		//** Play: Play animation sequence
		function _PlayAnimation(options) {
			// this: context of element match
			var $this = $(this);
			
			var template = new _template($this);

			_initAnimation.call(template);

			// 0: Set Proper class
			$this[0].className = $this[0].className.replace(/\b\w+-animation\b/g, '');
			$this.addClass('barscards-animation'); 
			var newClass = options.data["class"];  //class is reserved in oldIE;
			$this.addClass(newClass + '-animation');
			
			// 1: FadeIn Background
			template.$background.fadeIn(options.timing.background, function(){

				// 2: FadeIn Header Text
				template.$disclaimer.delay(options.timing.disclaimerDelay).fadeIn(options.timing.disclaimer);
				template.$copyright.delay(options.timing.copyrightDelay).fadeIn(options.timing.copyright);
				template.$content.fadeIn(options.timing.title, function() {
		
				}); // END 2
				
				// 3: Load Speed Categories / Begin Photoflip
				template.$chartTable.fadeIn(0, function(){
					//InitPhotoStack
					var thisPhotoStack = $.proxy(_PhotoStack, $this);
					
					//InitBarChart
					_BarChart.call($this, options, thisPhotoStack(options));

				}); // END 3

				//Show Legend
				template.$chartLegend.delay(options.timing.chartLegendDelay).fadeTo(options.timing.chartLegend, 1);
			}); // END 1

		}

		return this.each(function(){
			var $this = $(this);

			//Load Options - This is done here because options can be loaded from HTML5 Data: meta-options
			var metaOptions = $(this).data('options');

			//support single URL as String for JSON Source
			if (typeof metaOptions == 'string') {
				log('Info: String detected in place of options. Assuming usage as data src url.')
				metaOptions = {'src': metaOptions};
			}

			var options = $.extend(true, {}, _options, argOptions, metaOptions)

			var template = new _template(this);
			var Bind =  $.proxy(_bind, template);
			var Play = $.proxy(_PlayAnimation, this);


			// Load JSON if SRC provided
			if (typeof options.src !== 'undefined' && options.src != '') {
				$.getJSON(options.src, function(data){
					$.extend(true, options, data);
					Bind(options);
					template = new _template(this);
					Play(options);
				});
			}
			else {
				//No data for carousel
				log('No Data: Trying to load from markup.');
				//Bind(options);
				Play(options);
				
			} // End BIND and INIT

		}); // End this.each
	};
})(jQuery);
/* ----------------------------------
 *  Plugin: animateInternetGaming
 *
 *  - Plays a sequence of animations for Intenet Gaming
 * 
 *  UsedBy: 
 *
 *  Uses:   jquery-1.7.1
 *          jQueryRotateCompressed.2.2.js
 *
 * --------------------------------- */ 

;(function($) {    
    $.fn.animateInternetGaming = function(argOptions) {
        
    	//WEBCMS-1762 - fix to help binding issues to make disclaimer data stick.
    	var _global_disclaimer = "";
    	
        function log() {
            window.console && console.log && console.log('[animateInternetGaming] ' + Array.prototype.join.call(arguments,' '));
        }
        
        //Animate the bar height
        function _raiseTheBar(options) {
            //Raise the Bar
            $(this).find('.bar').not('.animated').each(function() {
                //Prevent bar from being animated more than once
                $(this).addClass('animated');

                var $gamingLogo = $('.gaming-logo');
                var $bar = $(this).find('.inner');
                var scale = $(this).data('scale');
                var $speedTitle = $(this).parent().find('h3');
                var $height = 130; //$bar.height();

                // Get the y offset of the title based on the height of
                var titleYPos = $height - ($height *(parseInt(scale)/100));
                
              
                // Animate the height of the 'div' with a callback function
                
                $bar.children().show().end().animate({'height':scale}, 
                    {
                        duration: options.timing.chartBar, 
                        complete: function() {
                            // once the bar animation has finished, fade in the results
                            // $bar.children().fadeIn(options.timing.chartBarLable);
                            $speedTitle.animate({ top: titleYPos, opacity: 1}, 1200, 'easeOutQuint', function() {});
                            $('.gaming-logo').animate({ left: '391', opacity: 1}, 1200, 'easeOutQuint');//animate({ top: '300', opacity: 1}, 1200, 'easeOutQuint');
                            $('p.disclaimer').fadeIn('slow');
                           
                        }
                    }
                );
            });
        }
         
        //**Inits the BarChart
        function _BarChart(options, argCallback) {
            var fnCallback = (typeof argCallback == 'function') ? argCallback : new Function();
            var $this = $(this);
            
            $(this).find('li').each(function(i) {

                var $context = $(this);
                var iWait = ((options.timing.chartHeaders/($context.siblings().length+1))*i)-options.timing.photosDelay; 
                var iDuration = (options.timing.chartHeaders/($context.siblings().length+1));

                iWait = (iWait < 1) ? 0 : iWait;

                $context.delay(iWait).fadeIn(iDuration, function(){
                    
                    if ($context.index() == ($context.siblings().length)) {
                        //All Headers are now visible begin barAnimation and optional callback
                        _raiseTheBar.call($this, options);
                        fnCallback.call($this);
                    }
                }); // End th.fadeIn
            }); // END th.each
        }

        //** Bind JSON data to controls
        function _bind(options) {
            // this: context of template object          
            this.$background.attr("src", options.data.background);
            this.$title.html(options.data.title);
            this.$body.html(options.data.body);
            this.$disclaimer.html(options.data.disclaimer);
            _global_disclaimer = this.$disclaimer.html();
            this.$gamingLogo.attr("src", options.data.gamingLogo);
            
            this.$chartItems.empty()
                .filter(".ultimate").append($("<h3 />", { html: options.data.ultimate.header }), $("<div class=\"bar\" />").attr("data-scale", options.data.ultimate.scale).html("<div class=\"inner\"><img src=\"" + options.data.ultimate.img + "\" alt=\"Ultimate\" /></div>")).end()
                .filter(".turbo").append($("<h3 />", { html: options.data.turbo.header }), $("<div class=\"bar\" />").attr("data-scale", options.data.turbo.scale).html("<div class=\"inner\"><img src=\"" + options.data.turbo.img + "\" alt=\"Turbo\" /></div>")).end()
                .filter(".standard").append($("<h3 />", { html: options.data.standard.header }), $("<div class=\"bar\" />").attr("data-scale", options.data.standard.scale).html("<div class=\"inner\"><img src=\"" + options.data.standard.img + "\" alt=\"Standard\" /></div>")).end()
                .filter(".lite").append($("<h3 />", { html: options.data.lite.header }), $("<div class=\"bar\" />").attr("data-scale", options.data.lite.scale).html("<div class=\"inner\"><img src=\"" + options.data.lite.img + "\" alt=\"Lite\" /></div>"));
        }

        //** Initialize: Ideally these settings should also be defined in css
        function _initAnimation() {
            // this: context of template object

            this.$background.stop(true,true).hide();
            this.$wrap.stop(true,true).css({'opacity':0});
            this.$title.stop(true,true).hide();
            this.$body.stop(true,true).hide();
            this.$chartItems.stop(true,true).hide();
            this.$chartHeaders.stop(true,true).css({'top': 0,'opacity':0});
            this.$speedTitle.stop(true,true).css({'top': -63,'opacity':0});
            this.$gamingLogo.stop(true,true).css({'left': 0,'opacity':0, 'display': 'block'});
            this.$chartBars.stop(true,true).css({'height': 0}).children().stop(true,true).hide();
            this.$disclaimer.stop(true,true).hide();
            
        }

        var _options = {
             'data': {
                  'background': globalVars.featureImages + 'empty-slide.jpg'
                , 'title': ''
                , 'body': ''
                , 'disclaimer': ''
                , 'gamingLogo': ''
                , 'ultimate': {
                      'header': ''
                    , 'scale': ''
                    , "img":''
                }
                , 'turbo': {
                    'header': ''
                    , 'scale': ''
                     , "img":''
                     
                }
                , 'standard': {
                    'header': ''
                    , 'scale': ''
                     , "img":''
                }
                , 'lite': {
                    'header': ''
                    , 'scale': ''
                     , "img":''
                }
             }
            , 'timing': {
                  'background' : 600
                , 'title': 600
                , 'body': 600
                , 'chartHeaders': 600
                , 'chartHeadersDelay': 0
                , 'chartBar': 2000
            }
        }

         var _template = function(context) {
        //**    Returns a template object who's members are jQuery objects 
        //      of the various regions being updated.
            var $this = $(context);
            
            var $featureImage = $this.find('.feature-image');
            var $overlay = $this.find('>.overlay:first');
            var $wrap = $overlay.find('.wrap');
            var $rtf = $overlay.find('.animation-header');
             var $gamingLogo = $wrap.find('.gaming-logo');
              var $disclaimer = $wrap.find('.disclaimer');
            var $animationChart = $wrap.find('.animation-chart');
            
            var $title = $rtf.find('h2:first');
            
            var $body = $rtf.find('p');
            
            
            var $chartItems = $animationChart.find('chart'); // Bars are under ul li .bars
            var $speedTitle = $chartItems.find('.chart h3');
            var $chartBars = $chartItems.find('.chart .bar .inner');
           
           
            

            if ($featureImage.length == 0) {
                $featureImage = $('<div class="feature-image" />').append('<img src="/content/dam/InternetGaming/animation-splash-gaming-banner.jpg">');
                $this.prepend($featureImage);
                
            }

            if ($overlay.length == 0) {
                $overlay = $('<div class="overlay" />').append($('<div class="wrap" />'));
                $featureImage.after($overlay);
                $overlay = $this.find('.overlay .wrap');
                
            }

            if ($rtf.length == 0) {
                $rtf = $('<div class="rtf animation-header center"/>')
                   
                $overlay.append($rtf);
                
            }

           

            if ($title.length == 0) {
                $title = $('<h2 />');
                $rtf.prepend($title);
                
            }

            if ($body.length == 0) {
                $body = $('<p />');
                $title.after($body);
               
            }
            if ($gamingLogo.length == 0) {
                $gamingLogo = $('<img class="gaming-logo"  />');
                 $overlay.append($gamingLogo);
                
               
            }  

        
         if ($animationChart.length == 0) {
                $animationChart = $('<div class="animation-chart" />');
                $gamingLogo.after($animationChart);
                
            }

            $chartItems = $('<div class="chart ultimate" style="display:block" /><div class="chart turbo" style="display:block" /><div class="chart standard" style="display:block"/><div class="chart lite" style="display:block" />');
            if($speedTitle.length==0){
                $speedTitle =$('<h3/>');
                $chartItems.append($speedTitle);
            }
             if($chartBars.length==0){
                $chartBars =$('<div class="bar"><div class="inner"/></div>');
                $chartItems.append($chartBars);
            }
            if($('.animation-splash .chart').length==0 ){
                
                $animationChart.prepend($chartItems);
            }
         
            if ($disclaimer.length == 0) {
            	$disclaimer = $('<p  class="disclaimer">'+_global_disclaimer+'</p>');
                
                 $wrap.append($disclaimer);
            }               

            // Expose the template regions
            this.$background = $this.find('.feature-image img:first');
            this.$wrap = $wrap;
            this.$rtf = $rtf;
            this.$title = $title;
            this.$body = $body;
            this.$chartItems = $chartItems;
            this.$speedTitle = $speedTitle;
            this.$chartItems = $chartItems;
            this.$animationChart = $animationChart;
            this.$chartHeaders = $this.find('.chart h3');
            this.$chartBars = $this.find('.chart .bar .inner');
            this.$content = $.fn.add(this.$title).add(this.$body);
            this.$gamingLogo = $gamingLogo;
            
            this.$disclaimer = $disclaimer;

        }


        //** Play: Play animation sequence
        function _PlayAnimation(options) {
            // this: context of element match
            var $this = $(this);
            
            var template = new _template($this);

            _initAnimation.call(template);
            
            // 1: FadeIn Background
            template.$background.fadeIn(options.timing.background, function(){

                template.$wrap.animate({'opacity':1}, function(){

                    // 2: FadeIn Header Text
                    template.$content.fadeIn(options.timing.title, function() {
            
                    }); // END 2
                    
                    // 3: Load Speed Categories / Begin Photoflip
                    template.$chartItems.fadeIn(0, function(){
                        
                        //InitBarChart

                        _BarChart.call($this, options);
                    }); // END 3

                });


                //Show Legend
                // template.$chartLegend.delay(options.timing.chartLegendDelay).fadeTo(options.timing.chartLegend, 1);
            }); // END 1

        }

        return this.each(function(){

            var $this = $(this);

            //Load Options - This is done here because options can be loaded from HTML5 Data: meta-options
            var metaOptions = $(this).data('options');

            //support single URL as String for JSON Source
            if (typeof metaOptions == 'string') {
                
                metaOptions = {'src': metaOptions};
            }

            var options = $.extend({}, _options, argOptions, metaOptions)



    /*
            //SELECTOR VERSION
            var template = {

                  $background : $this.find('.feature-image img:first')
                , $rtf : $this.find('.overlay .animation-header:first')
                , $title : $this.find('.overlay .animation-header h2')
                , $body : $this.find('.animation-header p:first')
                , $chartItems = $animationChart.find('.chart'); // Bars are under ul li .bars
                , $chartBars : $this.find('.animation-chart .bar')
                , $photoStack : $this.find('.photo-stack')
                , $photos : $this.find('.photo-stack .photo')
                , $content : $this.find('.overlay .animation-header h2:first, .animation-header p:first')
                // , $content : ($.fn.add(this.$title).add(this.$body))
            }

            var $featureImage = $this.find('.feature-image');
            var $overlay = $this.find('>.overlay:first');
            var $rtf = $overlay.find('.animation-header');
            var $animationChart = $('.animation-chart');
            var $title = $rtf.find('h2:first');
            var $body = $rtf.find('p:first');
            var
            var $speedTitle = $animationChart.find('h3');
            var $gamingLogo = $('.gaming-logo');
            var $disclaimer = $('.gaming-animation').find('.disclaimer');

    */

            var template = new _template(this);
            var Bind =  $.proxy(_bind, template);
            var Play = $.proxy(_PlayAnimation, this);

            
            // Load JSON if SRC provided
            if (typeof options.src !== 'undefined' && options.src != '') {
                $.getJSON(options.src, function(data){
                    $.extend(options, data);
                    Bind(options);
                    template = new _template(this);
                    Play(options);
                });
            }
            else {
                //No data for carousel
                
                //Bind(options);
                Play(options);
                
            } // End BIND and INIT

        }); // End this.each
    };
})(jQuery);
/* ----------------------------------
 *	Plugin: animateInternetMovies
 *
 *	- Plays a sequence of animations for Intenet Movies 
 * 
 *  UsedBy: 
 *
 *  Uses: 	jquery-1.7.1
 *
 * --------------------------------- */	

;(function($) {	   
	$.fn.animateInternetMovies = function(argOptions) {

    	function log() {
			window.console && console.log && console.log('[animateInternetMovies] ' + Array.prototype.join.call(arguments,' '));
		}
		//Animate the bar height
		function _revealMovieImages(options) {
			//Reveal static image
			$(this).find('.player .loading-bar').each(function(i) {
				var $bar = $(this);
				var $player = $bar.parents('.movie-'+(i+1));
				var $speed = parseInt(options.data.gifPaths[i].revealSpeed);
                if(isNaN($speed)){
                    $speed = i * 1000;
                }
				var $feature_img = $player.find('img.feature');
                var $player_heading = $player.find('h4');
                $player_heading.html(options.data.gifPaths[i].heading);
                var gif_path = options.data.gifPaths[i].featureImage + "?x=" + Math.random();
                //$feature_img.attr('src', "#");
                $feature_img.attr('src', options.data.staticImage);
				// Animate the height of the 'div' with a callback function
				$bar.animate({'height':0}, 
					{
						duration: $speed, 
						complete: function() {
							$feature_img.attr('src', gif_path);
							$player.find('.speed-package').fadeIn('fast');			
						} // complete
					} 
				); // animate
			});
		} // _revealMovieImages
		
		//**Inits the BarChart
		function _showMovies(argCallback, options) {
			
			var fnCallback = (typeof argCallback == 'function') ? argCallback : new Function();
			var $this = $(this); // .movie-players
			
			$(this).find('.player').each(function(i) {
				var $context = $(this);

				var iWait = ((options.timing.speedTypes/($context.siblings().length+1))*i); 
				var iDuration = (options.timing.speedTypes/($context.siblings().length+1));

				iWait = (iWait < 1) ? 0 : iWait;

				$context.delay(iWait).fadeIn(iDuration, function(){
					if ($context.index() == ($context.siblings().length)) {
						//All Headers are now visible begin barAnimation and optional callback
						_revealMovieImages.call($this, options);
						fnCallback.call($this);
					}
				}); // End fadeIn
			}); // END each
		}
        function _bind(options){
            // this: context of template object		
            this.$background.attr('src', options.data.background);
            this.$title.html(options.data.title);
            this.$body.html(options.data.body);
			this.$disclaimer.html(options.data.disclaimer);
			this.$movieLogo.attr('src', options.data.movieLogo);
        }
        //** Initialize: Ideally these settings should also be defined in css
		function _initAnimation() {
			// Initialize: Ideally these settings should also be defined in css
			// TODO: Reset gif back to static gif using the img src
			// TODO: Reshow loading gif bg img (on $bar)
            
			this.$background.stop().hide();
			this.$rtf.stop().hide();		
			this.$moviePlayer.stop().hide();
			this.$disclaimer.stop().hide();
			this.$speedLegend.stop().hide();
			this.$speedTypes.stop().hide();
			this.$gif.stop().hide();
			this.$staticImage.stop().show();
			this.$movieLogo.stop().hide();
            //this.$moviePlayer.find('img').attr('src', '#');
            this.$moviePlayer.find('.loading-bar').stop();
            this.$moviePlayer.find('.loading-bar').css('height', '100%');
            
        }


		var _options = {
            'data':{
			     'background' : globalVars.featureImages + 'empty-slide.jpg'
			    , 'image_path' : '/static/images/dam'
			    , 'static_gif': 'movies_placeholder_5sec_static'
			    , 'feature_gif': 'movies_placeholder_one_loop'
                , 'class': ''
			 	, 'title': ''
			 	, 'body': ''
			 	, 'disclaimer': ''
                , 'movieLogo': globalVars.featureImages + 'dam/logo-movies.png'
                , "gifPaths" : [
			        {
				        "heading": "Ultimate<br><span>Up to 50Mbps</span>"
				        , "featureImage" : "static/images/dam/movies_placeholder_one_loop_1.gif"
			        }
			        ,{
				        "heading": "Turbo<br><span>Up to 20Mbps</span>"
				        , "featureImage" : "static/images/dam/movies_placeholder_one_loop_2.gif"
			        }
			        ,{
				        "heading": "Standard<br><span>Up to 10Mbps</span>"
				        , "featureImage" : "static/images/dam/movies_placeholder_one_loop_3.gif"
			        }
			        ,{
				        "heading": "Lite<br><span>Up to 1Mbps</span>"
				        , "featureImage" : "static/images/dam/movies_placeholder_one_loop_4.gif"
			        }
		        ]
            }
            , 'timing':{
                'background': 600
                , 'rtf': 600
			    , 'title': 600
			    , 'body': 600
			    , 'speedLegend': 600
			    , 'speedLegendDelay': 3000
			    , 'speedTypes': 2000
			    , 'speedTypesDelay': 0
			    , 'loadingBar': 2000
			    , 'delay': 400
            }
		}
        var _template = function(context){
            //**  	Returns a template object who's members are jQuery objects 
            //		of the various regions being updated.
            var $this = $(context);

            var $background = $this.find('.feature-image img');
            var $backgroundFeature = $this.find('.feature-image');
			var $overlay = $this.find('.overlay .wrap');
			var $rtf = $this.find('.overlay .animation-header');	
			var $title = $this.find('.overlay .animation-header h2').first();
			var $body = $this.find('.animation-header p').first();
			var $disclaimer = $this.find('.disclaimer').first();
			var $moviePlayers = $this.find('.movie-players');
			var $moviePlayer = $this.find('.movie-players .player');
			var $staticImage = $moviePlayer.find('.static');
			var $gif = $moviePlayer.find('.active');
			var $speedTypes = $this.find('.movie-players .speed-package');
			var $speedLegend = $this.find('.movie-players .speed-details');
			var $movieLogo = $this.find('.movie-logo');
			var $featureImage = $this.find('img.feature');
			
			if ($background.length == 0) {
				$background = $('<div class="feature-image" />').append('<img src="static/images/dam/animation-splash-movie-banner.jpg">');
				$this.prepend($background);
				// log('failsafe: featureImage')
			}
			
			if ($overlay.length == 0) {
				//missing overlay so injecting it
				$overlay = $('<div class="overlay" />').append($('<div class="wrap" />'));
				$backgroundFeature.after($overlay);
				$overlay = $this.find('.overlay .wrap');
				// log('failsafe: overlay')
			}
			
			if ($rtf.length == 0) {
				$rtf = $('<div class="rtf animation-header center"/>');
				$overlay.append($rtf);
				// log('failsafe: rtf')
			}

			if ($title.length == 0) {
				$title = $('<h2 />');
				$rtf.prepend($title);
				// log('failsafe: title');
			}

			if ($body.length == 0) {
				$body = $('<p />');
				$title.after($body);
				// log('failsafe: body');
			}


			
			if ($moviePlayers.length == 0) {
				$moviePlayers = $('<div class="movie-players"/>');
				$rtf.after($moviePlayers);
				// log('failsafe: animationChart')
			}
			
			if ($moviePlayer.length == 0) {
				for (var i =1; i<=4; i++) {
					$moviePlayer = $('<div class="player movie-' + i + '"/>');
					var $tvFrame = $('<div class="tv-frame"/>')
					var $wrap = $('<div class="image-wrap"/>');
					$wrap.append('<img src="" class="feature"/>');
					$wrap.append('<div class="loading-bar" data-revealSpeed=""/>');
					$tvFrame.append($wrap);
					$speedTypes = $('<h4 class="speed-package" />');
					$moviePlayer.append($tvFrame);
					$moviePlayer.append($speedTypes);
					$moviePlayer.stop().hide();
					$moviePlayers.append($moviePlayer);
				}
			}
			
			if ($disclaimer.length == 0) {
				$disclaimer = $('<p class="disclaimer"/>');
				$moviePlayers.after($disclaimer);
			}

			if ($movieLogo.length == 0) {
				$movieLogo = $('<img class="movie-logo" src="/etc/designs/residential/clientlibs/images/fancyboximages/blank.gif" />');
				$moviePlayers.prepend($movieLogo);
			}

            this.$background = $background;
			this.$rtf = $rtf;	
			this.$title = $title;
			this.$body = $body;
			this.$disclaimer = $disclaimer;
			this.$moviePlayers = $moviePlayers;
			this.$moviePlayer = $moviePlayer;
			this.$staticImage = $staticImage;
			this.$gif = $gif;
			this.$speedTypes = $speedTypes;
			this.$speedLegend = $speedLegend;
			this.$movieLogo = $movieLogo;

        }
        //** Play: Play animation sequence
		function _PlayAnimation(options) {
        	// this: context of element match
			var $this = $(this);
			
			var template = new _template($this);
			_initAnimation.call(template);
			
			// 0: Set Proper class
			$this[0].className = $this[0].className.replace(/\b\w+-animation\b/g, '');
			var newClass = options.data["class"];  //class is reserved in oldIE;
			$this.addClass(newClass + '-animation');

            			
			// 1: FadeIn Background
			template.$background.fadeIn(options.timing.background, function(){

				// 2: FadeIn Header Area
				template.$rtf.fadeIn(options.timing.rtf, function() {
					template.$speedLegend.fadeIn();
					template.$disclaimer.fadeIn();
					
					_showMovies.call(template.$moviePlayers, null, options);
					template.$movieLogo.fadeIn();

				}); // END 2
			}); // END 1
        }
		
		return this.each(function(){
			var $this = $(this);
			console.log("Loop!");

			//Load Options - This is done here because options can be loaded from HTML5 Data: meta-options
			var metaOptions = $(this).data('options');

			//support single URL as String for JSON Source
			if (typeof metaOptions == 'string') {
				log('Info: String detected in place of options. Assuming usage as data src url.')
				metaOptions = {'src': metaOptions};
			}

			var options = $.extend(true, {}, _options, argOptions, metaOptions)

			var template = new _template(this);
			var Bind =  $.proxy(_bind, template);
			var Play = $.proxy(_PlayAnimation, this);

			// Load JSON if SRC provided
			if (typeof options.src !== 'undefined' && options.src != '') {
				$.getJSON(options.src, function(data){
					$.extend(true, options, data);
					Bind(options);
					template = new _template(this);
					Play(options);
				});
			}
			else {
				//No data for carousel
				log('No Data: Trying to load from markup.');
				Play(options);
				
			} // End BIND and INIT

		}); // End this.each
	};
})(jQuery);

/*!
 * fancyBox - jQuery Plugin
 * version: 2.0.6 (16/04/2012)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		didResize	= false,
		resizeTimer	= null,
		isTouch		= document.createTouch !== undefined,
		isString	= function(str) {
			return $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		getValue = function(value, dim) {
			if (dim && isPercentage(value)) {
				value = F.getViewport()[ dim ] / 100 * parseInt(value, 10);
			}

			return Math.round(value) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.0.5',

		defaults: {
			padding: 15,
			margin: 20,

			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,

			autoSize: true,
			autoResize: !isTouch,
			autoCenter : !isTouch,
			fitToView: true,
			aspectRatio: false,
			topRatio: 0.5,

			fixed: false,
			scrolling: 'auto', // 'auto', 'yes' or 'no'
			wrapCSS: '',

			arrows: true,
			closeBtn: true,
			closeClick: false,
			nextClick : false,
			mouseWheel: true,
			autoPlay: false,
			playSpeed: 3000,
			preload : 3,

			modal: false,
			loop: true,
			ajax: { dataType: 'html', headers: { 'X-fancyBox': true } },
			keys: {
				next: [13, 32, 34, 39, 40], // enter, space, page down, right arrow, down arrow
				prev: [8, 33, 37, 38], // backspace, page up, left arrow, up arrow
				close: [27] // escape key
			},

			// Override some properties
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,

			// HTML templates
			tpl: {
				wrap: '<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
				next: '<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect: 'fade', // 'elastic', 'fade' or 'none'
			openSpeed: 300,
			openEasing: 'swing',
			openOpacity: true,
			openMethod: 'zoomIn',

			// Closing fancyBox
			closeEffect: 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed: 300,
			closeEasing: 'swing',
			closeOpacity: true,
			closeMethod: 'zoomOut',

			// Changing next gallery item
			nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed: 300,
			nextEasing: 'swing',
			nextMethod: 'changeIn',

			// Changing previous gallery item
			prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed: 300,
			prevEasing: 'swing',
			prevMethod: 'changeOut',

			// Enabled helpers
			helpers: {
				overlay: {
					speedIn: 0,
					speedOut: 300,
					opacity: 0.8,
					css: {
						cursor: 'pointer'
					},
					closeClick: true
				},
				title: {
					type: 'float' // 'float', 'inside', 'outside' or 'over'
				}
			},

			// Callbacks
			onCancel: $.noop, // If canceling
			beforeLoad: $.noop, // Before loading
			afterLoad: $.noop, // After loading
			beforeShow: $.noop, // Before changing in current item
			afterShow: $.noop, // After opening
			beforeClose: $.noop, // Before closing
			afterClose: $.noop // After closing
		},

		//Current state
		group: {}, // Selected group
		opts: {}, // Group options
		coming: null, // Element being loaded
		current: null, // Currently loaded element
		isOpen: false, // Is currently open
		isOpened: false, // Have been fully opened at least once
		wrap: null,
		skin: null,
		outer: null,
		inner: null,

		player: {
			timer: null,
			isActive: false
		},

		// Loaders
		ajaxLoad: null,
		imgPreload: null,

		// Some collections
		transitions: {},
		helpers: {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			//Kill existing instances
			F.close(true);

			//Normalize group
			if (group && !$.isArray(group)) {
				group = group instanceof $ ? $(group).get() : [group];
			}

			F.isActive = true;

			//Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			//All options are merged recursive except keys
			if ($.isPlainObject(opts) && opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			F._start(F.opts.index || 0);
		},

		cancel: function () {
			if (F.coming && false === F.trigger('onCancel')) {
				return;
			}

			F.coming = null;

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onabort = F.imgPreload.onerror = null;
			}
		},

		close: function (a) {
			F.cancel();

			if (!F.current || false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			//If forced or is still opening then remove immediately
			if (!F.isOpen || (a && a[0] === true)) {
				$('.fancybox-wrap').stop().trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.closeMethod]();
			}
		},

		// Start/stop slideshow
		play: function (a) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					$('body').unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						$('body').bind({
							'afterShow.player onUpdate.player': set,
							'onCancel.player beforeClose.player': stop,
							'beforeLoad.player': clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (F.player.isActive || (a && a[0] === false)) {
				stop();
			} else {
				start();
			}
		},

		next: function () {
			if (F.current) {
				F.jumpto(F.current.index + 1);
			}
		},

		prev: function () {
			if (F.current) {
				F.jumpto(F.current.index - 1);
			}
		},

		jumpto: function (index) {
			if (!F.current) {
				return;
			}

			index = parseInt(index, 10);

			if (F.group.length > 1 && F.current.loop) {
				if (index >= F.group.length) {
					index = 0;

				} else if (index < 0) {
					index = F.group.length - 1;
				}
			}

			if (F.group[index] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		reposition: function (e, onlyAbsolute) {
			var pos;

			if (F.isOpen) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					F.wrap.stop(true, true).animate(pos, 200);

				} else {
					F.wrap.css(pos);
				}
			}
		},

		update: function (e) {
			if (!F.isOpen) {
				return;
			}

			// Run this code after a delay for better performance
			if (!didResize) {
				resizeTimer = setTimeout(function () {
					var current = F.current, anyway = !e || (e && e.type === 'orientationchange');

					if (didResize) {
						didResize = false;

						if (!current) {
							return;
						}

						if ((!e || e.type !== 'scroll') || anyway) {
							if (current.autoSize && current.type !== 'iframe') {
								F.inner.height('auto');
								current.height = F.inner.height();
							}

							if (current.autoResize || anyway) {
								F._setDimension();
							}

							if (current.canGrow && current.type !== 'iframe') {
								F.inner.height('auto');
							}
						}

						if (current.autoCenter || anyway) {
							F.reposition(e);
						}

						F.trigger('onUpdate');
					}
				}, 200);
			}

			didResize = true;
		},

		toggle: function () {
			if (F.isOpen) {
				F.current.fitToView = !F.current.fitToView;

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('keypress.fb');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			F.hideLoading();

			//If user will press the escape-button, the request will be canceled
			D.bind('keypress.fb', function(e) {
				if (e.keyCode === 27) {
					e.preventDefault();
					F.cancel();
				}
			});

			$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
		},

		getViewport: function () {
			// See http://bugs.jquery.com/ticket/6724
			return {
				x: W.scrollLeft(),
				y: W.scrollTop(),
				w: isTouch && window.innerWidth ? window.innerWidth : W.width(),
				h: isTouch && window.innerHeight ? window.innerHeight : W.height()
			};
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys = current.keys;

			if (!current) {
				return;
			}

			W.bind('resize.fb orientationchange.fb' + (current.autoCenter && !current.fixed ? ' scroll.fb' : ''), F.update);

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code, target = e.target || e.srcElement;

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						code = e.keyCode;

						if ($.inArray(code, keys.close) > -1) {
							F.close();
							e.preventDefault();

						} else if ($.inArray(code, keys.next) > -1) {
							F.next();
							e.preventDefault();

						} else if ($.inArray(code, keys.prev) > -1) {
							F.prev();
							e.preventDefault();
						}
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel && F.group.length > 1) {
				F.wrap.bind('mousewheel.fb', function (e, delta) {
					var target = e.target || null;

					if (delta !== 0 && (!target || target.clientHeight === 0 || (target.scrollHeight === target.clientHeight && target.scrollWidth === target.clientWidth))) {
						e.preventDefault();

						F[delta > 0 ? 'prev' : 'next']();
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F[ $.inArray(event, ['onCancel', 'beforeLoad', 'afterLoad']) > -1 ? 'coming' : 'current' ];

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && $.isPlainObject(F.helpers[helper]) && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event](opts, obj);
					}
				});
			}

			$.event.trigger(event + '.fb');
		},

		isImage: function (str) {
			return isString(str) && str.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				element = F.group[index] || null,
				isDom,
				href,
				type,
				rez,
				hrefParts;

			if (element && (element.nodeType || element instanceof $)) {
				isDom = true;

				if ($.metadata) {
					coming = $(element).metadata();
				}
			}

			coming = $.extend(true, {}, F.opts, {index : index, element : element}, ($.isPlainObject(element) ? element : coming));

			// Re-check overridable options
			$.each(['href', 'title', 'content', 'type'], function(i,v) {
				coming[v] = F.opts[ v ] || (isDom && $(element).attr( v )) || coming[ v ] || null;
			});

			// Convert margin property to array - top, right, bottom, left
			if (typeof coming.margin === 'number') {
				coming.margin = [coming.margin, coming.margin, coming.margin, coming.margin];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn : false,
					closeClick: false,
					nextClick : false,
					arrows : false,
					mouseWheel : false,
					keys : null,
					helpers: {
						overlay : {
							css: {
								cursor : 'auto'
							},
							closeClick : false
						}
					}
				});
			}

			//Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;
				return;
			}

			type = coming.type;
			href = coming.href || element;

			///Check if content type is set, if not, try to get
			if (!type) {
				if (isDom) {
					type = $(element).data('fancybox-type');

					if (!type) {
						rez = element.className.match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (!type && isString(href)) {
					if (F.isImage(href)) {
						type = 'image';

					} else if (F.isSWF(href)) {
						type = 'swf';

					} else if (href.match(/^#/)) {
						type = 'inline';
					}
				}

				// ...if not - display element itself
				if (!type) {
					type = isDom ? 'inline' : 'html';
				}

				coming.type = type;
			}

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content) {
					if (type === 'inline') {
						coming.content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

					} else {
						coming.content = element;
					}
				}

				if (!coming.content || !coming.content.length) {
					type = null;
				}

			} else if (!href) {
				type = null;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			if (type === 'ajax' && isString(href)) {
				hrefParts = href.split(/\s+/, 2);

				href = hrefParts.shift();
				coming.selector = hrefParts.shift();
			}

			coming.href  = href;
			coming.group = F.group;
			coming.isDom = isDom;

			switch (type) {
				case 'image':
					F._loadImage();
					break;

				case 'ajax':
					F._loadAjax();
					break;

				case 'inline':
				case 'iframe':
				case 'swf':
				case 'html':
					F._afterLoad();
					break;

				default:
					F._error( 'type' );
			}
		},

		_error: function ( type ) {
			F.hideLoading();

			$.extend(F.coming, {
				type      : 'html',
				autoSize  : true,
				minWidth  : 0,
				minHeight : 0,
				padding   : 15,
				hasError  : type,
				content   : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width;
				F.coming.height = this.height;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete === undefined || !img.complete) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, F.coming.ajax, {
				url: F.coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						F.coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_preloadImages: function() {
			var group = F.group,
				current = F.current,
				len = group.length,
				item,
				href,
				i,
				cnt = Math.min(current.preload, len - 1);

			if (!current.preload || group.length < 2) {
				return;
			}

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];
				href = item.href || $( item ).attr('href') || item;

				if (item.type === 'image' || F.isImage(href)) {
					new Image().src = href;
				}
			}
		},

		_afterLoad: function () {
			F.hideLoading();

			if (!F.coming || false === F.trigger('afterLoad', F.current)) {
				F.coming = false;

				return;
			}

			if (F.isOpened) {
				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.prevMethod]();

			} else {
				$('.fancybox-wrap').stop().trigger('onReset').remove();

				F.trigger('afterClose');
			}

			F.unbindEvents();

			F.isOpen    = false;
			F.current   = F.coming;

			//Build the neccessary markup
			F.wrap  = $(F.current.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + F.current.type + ' fancybox-tmp ' + F.current.wrapCSS).appendTo('body');
			F.skin  = $('.fancybox-skin', F.wrap).css('padding', getValue(F.current.padding));
			F.outer = $('.fancybox-outer', F.wrap);
			F.inner = $('.fancybox-inner', F.wrap);

			F._setContent();
		},

		_setContent: function () {
			var current = F.current,
				content = current.content,
				type    = current.type,
				minWidth    = current.minWidth,
				minHeight   = current.minHeight,
				maxWidth    = current.maxWidth,
				maxHeight   = current.maxHeight,
				loadingBay;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (content instanceof $) {
						if (content.parent().hasClass('fancybox-inner')) {
							content.parents('.fancybox-wrap').unbind('onReset');
						}

						content = content.show().detach();

						$(F.wrap).bind('onReset', function () {
							content.appendTo('body').hide();
						});
					}

					if (current.autoSize) {
						loadingBay = $('<div class="fancybox-wrap ' + F.current.wrapCSS + ' fancybox-tmp"></div>')
							.appendTo('body')
							.css({
								minWidth    : getValue(minWidth, 'w'),
								minHeight   : getValue(minHeight, 'h'),
								maxWidth    : getValue(maxWidth, 'w'),
								maxHeight   : getValue(maxHeight, 'h')
							})
							.append(content);

						current.width = loadingBay.width();
						current.height = loadingBay.height();

						// Re-check to fix 1px bug in some browsers
						loadingBay.width( F.current.width );

						if (loadingBay.height() > current.height) {
							loadingBay.width(current.width + 1);

							current.width = loadingBay.width();
							current.height = loadingBay.height();
						}

						content = loadingBay.contents().detach();

						loadingBay.remove();
					}

					break;

				case 'image':
					content = current.tpl.image.replace('{href}', current.href);

					current.aspectRatio = true;
					break;

				case 'swf':
					content = current.tpl.swf.replace(/\{width\}/g, current.width).replace(/\{height\}/g, current.height).replace(/\{href\}/g, current.href);
					break;

				case 'iframe':
					content = $(current.tpl.iframe.replace('{rnd}', new Date().getTime()) )
						.attr('scrolling', current.scrolling)
						.attr('src', current.href);

					current.scrolling = isTouch ? 'scroll' : 'auto';

					break;
			}

			if (type === 'image' || type === 'swf') {
				current.autoSize = false;
				current.scrolling = 'visible';
			}

			if (type === 'iframe' && current.autoSize) {
				F.showLoading();

				F._setDimension();

				F.inner.css('overflow', current.scrolling);

				content.bind({
					onCancel : function() {
						$(this).unbind();

						F._afterZoomOut();
					},
					load : function() {
						F.hideLoading();

						try {
							if (this.contentWindow.document.location) {
								F.current.height = $(this).contents().find('body').height();
							}
						} catch (e) {
							F.current.autoSize = false;
						}

						F[ F.isOpen ? '_afterZoomIn' : '_beforeShow']();
					}
				}).appendTo(F.inner);

			} else {
				F.inner.append(content);

				F._beforeShow();
			}
		},

		_beforeShow : function() {
			F.coming = null;

			//Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			//Set initial dimensions and hide
			F._setDimension();
			F.wrap.hide().removeClass('fancybox-tmp');

			F.bindEvents();

			F._preloadImages();

			F.transitions[ F.isOpened ? F.current.nextMethod : F.current.openMethod ]();
		},

		_setDimension: function () {
			var wrap      = F.wrap,
				inner     = F.inner,
				current   = F.current,
				viewport  = F.getViewport(),
				margin    = current.margin,
				padding2  = current.padding * 2,
				width     = current.width,
				height    = current.height,
				maxWidth  = current.maxWidth + padding2,
				maxHeight = current.maxHeight + padding2,
				minWidth  = current.minWidth + padding2,
				minHeight = current.minHeight + padding2,
				ratio,
				height_;

			viewport.w -= (margin[1] + margin[3]);
			viewport.h -= (margin[0] + margin[2]);

			if (isPercentage(width)) {
				width = (((viewport.w - padding2) * parseFloat(width)) / 100);
			}

			if (isPercentage(height)) {
				height = (((viewport.h - padding2) * parseFloat(height)) / 100);
			}

			ratio  = width / height;
			width  += padding2;
			height += padding2;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w, maxWidth);
				maxHeight = Math.min(viewport.h, maxHeight);
			}

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width = maxWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height > maxHeight) {
					height = maxHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

				if (width < minWidth) {
					width = minWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height < minHeight) {
					height = minHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));
				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			width = Math.round(width);
			height = Math.round(height);

			//Reset dimensions
			$(wrap.add(inner)).width('auto').height('auto');

			inner.width(width - padding2).height(height - padding2);
			wrap.width(width);

			height_ = wrap.height(); // Real wrap height

			//Fit wrapper inside
			if (width > maxWidth || height_ > maxHeight) {
				while ((width > maxWidth || height_ > maxHeight) && width > minWidth && height_ > minHeight) {
					height = height - 10;

					if (current.aspectRatio) {
						width = Math.round(((height - padding2) * ratio) + padding2);

						if (width < minWidth) {
							width = minWidth;
							height = ((width - padding2) / ratio) + padding2;
						}

					} else {
						width = width - 10;
					}

					inner.width(width - padding2).height(height - padding2);
					wrap.width(width);

					height_ = wrap.height();
				}
			}

			current.dim = {
				width	: getValue(width),
				height	: getValue(height_)
			};

			current.canGrow		= current.autoSize && height > minHeight && height < maxHeight;
			current.canShrink	= false;
			current.canExpand	= false;

			if ((width - padding2) < current.width || (height - padding2) < current.height) {
				current.canExpand = true;

			} else if ((width > viewport.w || height_ > viewport.h) && width > minWidth && height > minHeight) {
				current.canShrink = true;
			}

			F.innerSpace = height_ - padding2 - inner.height();
		},

		_getPosition: function (onlyAbsolute) {
			var current		= F.current,
				viewport    = F.getViewport(),
				margin      = current.margin,
				width       = F.wrap.width() + margin[1] + margin[3],
				height      = F.wrap.height() + margin[0] + margin[2],
				rez         = {
					position: 'absolute',
					top  : margin[0] + viewport.y,
					left : margin[3] + viewport.x
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez = {
					position: 'fixed',
					top  : margin[0],
					left : margin[3]
				};
			}

			rez.top     = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
			rez.left    = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * 0.5)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current, scrolling = current ? current.scrolling : 'no';

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.addClass('fancybox-opened');

			F.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			F.trigger('afterShow');

			F.update();

			//Assign a click event
			if (current.closeClick || current.nextClick) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			//Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', F.close);
			}

			//Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function () {
			var current = F.current;

			F.wrap.trigger('onReset').remove();

			$.extend(F, {
				group: {},
				opts: {},
				current: null,
				isActive: false,
				isOpened: false,
				isOpen: false,
				wrap: null,
				skin: null,
				outer: null,
				inner: null
			});

			F.trigger('afterClose', current);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current = F.current,
				element = current.element,
				padding = current.padding,
				orig    = $(current.orig),
				pos     = {},
				width   = 50,
				height  = 50,
				viewport;

			if (!orig.length && current.isDom && $(element).is(':visible')) {
				orig = $(element).find('img:first');

				if (!orig.length) {
					orig = $(element);
				}
			}

			if (orig.length) {
				pos = orig.offset();

				if (orig.is('img')) {
					width = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				viewport = F.getViewport();

				pos.top  = viewport.y + (viewport.h - height) * 0.5;
				pos.left = viewport.x + (viewport.w - width) * 0.5;
			}

			pos = {
				top     : getValue(pos.top - padding),
				left    : getValue(pos.left - padding),
				width   : getValue(width + padding * 2),
				height  : getValue(height + padding * 2)
			};

			return pos;
		},

		step: function (now, fx) {
			var prop = fx.prop, value, ratio;

			if (prop === 'width' || prop === 'height') {
				value = Math.ceil(now - (F.current.padding * 2));

				if (prop === 'height') {
					ratio = (now - fx.start) / (fx.end - fx.start);

					if (fx.start > fx.end) {
						ratio = 1 - ratio;
					}

					value -= F.innerSpace * ratio;
				}

				F.inner[prop](value);
			}
		},

		zoomIn: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				dim      = current.dim,
				startPos = $.extend({}, dim, F._getPosition( elastic )),
				endPos   = $.extend({opacity : 1}, startPos);

			//Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0;
				}

				F.outer.add(F.inner).width('auto').height('auto');

			} else if (effect === 'fade') {
				startPos.opacity = 0;
			}

			wrap.css(startPos)
				.show()
				.animate(endPos, {
					duration : effect === 'none' ? 0 : current.openSpeed,
					easing   : current.openEasing,
					step     : elastic ? this.step : null,
					complete : F._afterZoomIn
				});
		},

		zoomOut: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0};

			if (elastic) {
				if (wrap.css('position') === 'fixed') {
					wrap.css(F._getPosition(true));
				}

				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0;
				}
			}

			wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.nextEffect,
				elastic  = effect === 'elastic',
				startPos = F._getPosition( elastic ),
				endPos   = { opacity : 1 };

			startPos.opacity = 0;

			if (elastic) {
				startPos.top = getValue(parseInt(startPos.top, 10) - 200);
				endPos.top = '+=200px';
			}

			wrap.css(startPos)
				.show()
				.animate(endPos, {
					duration : effect === 'none' ? 0 : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
		},

		changeOut: function () {
			var wrap     = F.wrap,
				current  = F.current,
				effect   = current.prevEffect,
				endPos   = { opacity : 0 },
				cleanUp  = function () {
					$(this).trigger('onReset').remove();
				};

			wrap.removeClass('fancybox-opened');

			if (effect === 'elastic') {
				endPos.top = '+=200px';
			}

			wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.prevSpeed,
				easing   : current.prevEasing,
				complete : cleanUp
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		overlay: null,

		update: function () {
			var width, scrollWidth, offsetWidth;

			//Reset width/height so it will not mess
			this.overlay.width('100%').height('100%');

			if ($.browser.msie || isTouch) {
				scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				width = scrollWidth < offsetWidth ? W.width() : scrollWidth;

			} else {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		beforeShow: function (opts) {
			if (this.overlay) {
				return;
			}

			opts = $.extend(true, {}, F.defaults.helpers.overlay, opts);

			this.overlay = $('<div id="fancybox-overlay"></div>').css(opts.css).appendTo('body');

			if (opts.closeClick) {
				this.overlay.bind('click.fb', F.close);
			}

			if (F.current.fixed && !isTouch) {
				this.overlay.addClass('overlay-fixed');

			} else {
				this.update();

				this.onUpdate = function () {
					this.update();
				};
			}

			this.overlay.fadeTo(opts.speedIn, opts.opacity);
		},

		afterClose: function (opts) {
			if (this.overlay) {
				this.overlay.fadeOut(opts.speedOut || 0, function () {
					$(this).remove();
				});
			}

			this.overlay = null;
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		beforeShow: function (opts) {
			var title, text = F.current.title;

			if (text) {
				title = $('<div class="fancybox-title fancybox-title-' + opts.type + '-wrap">' + text + '</div>').appendTo('body');

				if (opts.type === 'float') {
					//This helps for some browsers
					title.width(title.width());

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs(parseInt(title.css('margin-bottom'), 10));
				}

				title.appendTo(opts.type === 'over' ? F.inner : (opts.type === 'outside' ? F.wrap : F.skin));
			}
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var that     = $(this),
			selector = this.selector || '',
			index,
			run      = function(e) {
				var what = this, idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !$(what).is('.fancybox-wrap')) {
					e.preventDefault();

					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = $(what).attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					F.open(what, options);
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (selector) {
			D.undelegate(selector, 'click.fb-start').delegate(selector, 'click.fb-start', run);

		} else {
			that.unbind('click.fb-start').bind('click.fb-start', run);
		}

		return this;
	};

	// Test for fixedPosition needs a body at doc ready
	$(document).ready(function() {
		F.defaults.fixed = $.support.fixedPosition || (!($.browser.msie && $.browser.version <= 6) && !isTouch);
	});

}(window, document, jQuery));
 /*!
 * Buttons helper for fancyBox
 * version: 1.0.2
 * @requires fancyBox v2.0 or later
 *
 * Usage: 
 *     $(".fancybox").fancybox({
 *         buttons: {
 *             position : 'top'
 *         }
 *     });
 * 
 * Options:
 *     tpl - HTML template
 *     position - 'top' or 'bottom'
 * 
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>',
		list: null,
		buttons: {},

		update: function () {
			var toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (F.current.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!F.current.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeLoad: function (opts) {
			//Remove self if gallery do not have at least two items
			if (F.group.length < 2) {
				F.coming.helpers.buttons = false;
				F.coming.closeBtn = true;

				return;
			}

			//Increase top margin to give space for buttons
			F.coming.margin[ opts.position === 'bottom' ? 2 : 0 ] += 30;
		},

		onPlayStart: function () {
			if (this.list) {
				this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
			}
		},

		onPlayEnd: function () {
			if (this.list) {
				this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
			}
		},

		afterShow: function (opts) {
			var buttons;

			if (!this.list) {
				this.list = $(opts.tpl || this.tpl).addClass(opts.position || 'top').appendTo('body');

				this.buttons = {
					prev : this.list.find('.btnPrev').click( F.prev ),
					next : this.list.find('.btnNext').click( F.next ),
					play : this.list.find('.btnPlay').click( F.play ),
					toggle : this.list.find('.btnToggle').click( F.toggle )
				}
			}

			buttons = this.buttons;

			//Prev
			if (F.current.index > 0 || F.current.loop) {
				buttons.prev.removeClass('btnDisabled');
			} else {
				buttons.prev.addClass('btnDisabled');
			}

			//Next / Play
			if (F.current.loop || F.current.index < F.group.length - 1) {
				buttons.next.removeClass('btnDisabled');
				buttons.play.removeClass('btnDisabled');

			} else {
				buttons.next.addClass('btnDisabled');
				buttons.play.addClass('btnDisabled');
			}

			this.update();
		},

		onUpdate: function () {
			this.update();
		},

		beforeClose: function () {
			if (this.list) {
				this.list.remove();
			}

			this.list = null;
			this.buttons = {};
		}
	};

}(jQuery));
 /*!
 * Media helper for fancyBox
 * version: 1.0.0
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         media: {}
 *     });
 *
 *  Supports:
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/25634903
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.media = {
		beforeLoad : function(opts, obj) {
			var href = obj.href || '',
				type = false,
				rez;

			if ((rez = href.match(/(youtube\.com|youtu\.be)\/(v\/|u\/|embed\/|watch\?v=)?([^#\&\?]*).*/i))) {
				href = '//www.youtube.com/embed/' + rez[3] + '?autoplay=1&autohide=1&fs=1&rel=0&enablejsapi=1';
				type = 'iframe';

			} else if ((rez = href.match(/vimeo.com\/(\d+)\/?(.*)/))) {
				href = '//player.vimeo.com/video/' + rez[1] + '?hd=1&autoplay=1&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1';
				type = 'iframe';

			} else if ((rez = href.match(/metacafe.com\/watch\/(\d+)\/?(.*)/))) {
				href = '//www.metacafe.com/fplayer/' + rez[1] + '/.swf?playerVars=autoPlay=yes';
				type = 'swf';

			} else if ((rez = href.match(/dailymotion.com\/video\/(.*)\/?(.*)/))) {
				href = '//www.dailymotion.com/swf/video/' + rez[1] + '?additionalInfos=0&autoStart=1';
				type = 'swf';

			} else if ((rez = href.match(/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i))) {
				href = '//www.twitvid.com/embed.php?autoplay=0&guid=' + rez[1];
				type = 'iframe';

			} else if ((rez = href.match(/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i))) {
				href = '//twitpic.com/show/full/' + rez[1];
				type = 'image';

			} else if ((rez = href.match(/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i))) {
				href = '//' + rez[1] + '/p/' + rez[2] + '/media/?size=l';
				type = 'image';

			} else if ((rez = href.match(/maps\.google\.com\/(\?ll=|maps\/?\?q=)(.*)/i))) {
				href = '//maps.google.com/' + rez[1] + '' + rez[2] + '&output=' + (rez[2].indexOf('layer=c') ? 'svembed' : 'embed');
				type = 'iframe';
			}

			if (type) {
				obj.href = href;
				obj.type = type;
			}
		}
	}

}(jQuery));
 /*!
 * Thumbnail helper for fancyBox
 * version: 1.0.4
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         thumbs: {
 *             width  : 50,
 *             height : 50
 *         }
 *     });
 *
 * Options:
 *     width - thumbnail width
 *     height - thumbnail height
 *     source - function to obtain the URL of the thumbnail image
 *     position - 'top' or 'bottom'
 *
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.thumbs = {
		wrap: null,
		list: null,
		width: 0,

		//Default function to obtain the URL of the thumbnail image
		source: function (el) {
			var img;

			if ($.type(el) === 'string') {
				return el;
			}

			img = $(el).find('img');

			return img.length ? img.attr('src') : el.href;
		},

		init: function (opts) {
			var that = this,
				list,
				thumbWidth = opts.width || 50,
				thumbHeight = opts.height || 50,
				thumbSource = opts.source || this.source;

			//Build list structure
			list = '';

			for (var n = 0; n < F.group.length; n++) {
				list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
			}

			this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position || 'bottom').appendTo('body');
			this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);

			//Load each thumbnail
			$.each(F.group, function (i) {
				$("<img />").load(function () {
					var width = this.width,
						height = this.height,
						widthRatio, heightRatio, parent;

					if (!that.list || !width || !height) {
						return;
					}

					//Calculate thumbnail width/height and center it
					widthRatio = width / thumbWidth;
					heightRatio = height / thumbHeight;
					parent = that.list.children().eq(i).find('a');

					if (widthRatio >= 1 && heightRatio >= 1) {
						if (widthRatio > heightRatio) {
							width = Math.floor(width / heightRatio);
							height = thumbHeight;

						} else {
							width = thumbWidth;
							height = Math.floor(height / widthRatio);
						}
					}

					$(this).css({
						width: width,
						height: height,
						top: Math.floor(thumbHeight / 2 - height / 2),
						left: Math.floor(thumbWidth / 2 - width / 2)
					});

					parent.width(thumbWidth).height(thumbHeight);

					$(this).hide().appendTo(parent).fadeIn(300);

				}).attr('src', thumbSource( F.group[ i ] ));
			});

			//Set initial width
			this.width = this.list.children().eq(0).outerWidth(true);

			this.list.width(this.width * (F.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (F.current.index * this.width + this.width * 0.5)));
		},

		//Center list
		update: function (opts) {
			if (this.list) {
				this.list.stop(true).animate({
					'left': Math.floor($(window).width() * 0.5 - (F.current.index * this.width + this.width * 0.5))
				}, 150);
			}
		},

		beforeLoad: function (opts) {
			//Remove self if gallery do not have at least two items
			if (F.group.length < 2) {
				F.coming.helpers.thumbs = false;

				return;
			}

			//Increase bottom margin to give space for thumbs
			F.coming.margin[ opts.position === 'top' ? 0 : 2 ] = opts.height + 30;
		},

		afterShow: function (opts) {
			//Check if exists and create or update list
			if (this.list) {
				this.update(opts);

			} else {
				this.init(opts);
			}

			//Set active element
			this.list.children().removeClass('active').eq(F.current.index).addClass('active');
		},

		onUpdate: function () {
			this.update();
		},

		beforeClose: function () {
			if (this.wrap) {
				this.wrap.remove();
			}

			this.wrap = null;
			this.list = null;
			this.width = 0;
		}
	}

}(jQuery));
// ----------------------------------
//  onload.js
//  Loads on doc.ready
// ----------------------------------

    /* ----------------------------------
       $(selector).pluginName(); --> Plugins/functions are located inside init.js
       --------------------------------- */
//BAW (7/3/12) - adding noConflict to remove any jQuery namespace issues.
//window.$=jQuery.noConflict();     // removing per BAW/segment resolution

(function($) {

    $(document).ready(function() {
          $('a.modalGeneric').fancybox({
                type: 'ajax', 
                fitToView: true, 
                autoSize: true, 
                openEffect:'fade',
                openSpeed:'slow'
                    });
    //*** Global functions/plugins onload ***//
        $('body').swxPlugins();

        // Rounded Corners for older browsers
        $('.no-borderradius .tabs-module, .no-borderradius .top-nav .active a').append('<span class="corner tl"></span><span class="corner tr"></span>');

        //breadcrumbs content:after for Ie7
        $('.ie7 .breadcrumbs li:not(:last)').append("  /");

        // Vertical Centering
        $('.vert-center').vAlign();

        // Convert tagged Images in tabs module to Backgrounds
        $('.tab .make-background').makeBackground('.tab');

    //*** Header functions/plugins onload ***//
        $('div.hover-popup , div.login-popup').hoverToggle();

        // For user-location, requires persistence across pages
        $('#twc-location-popup').locationHoverToggle();

    //*** Module Specific functions/plugins onload ***//
        // Hover functionality and mega menu drop downs
        $('.main-nav').navInit();

        $('.tabs-module').productModuleTabs();

        $('.slider').promoSlider();

        $('a.modal').modalInit();

        $('.reveal-module').revealModuleToggle();

        // Gateway Filmstrip
        $('.filmstrip').filmstrip();

        // Show/Hide toggle for feature details large slider
        $('.feature-details-slider').sliderDetailToggle();

        $(".multipanel-tabs").multiPanelTabs();
        $('.feature-carousel.multipanel-tabs').featureCarouselInit();
        $('.channels-lineup').channelLineup();
        $('.search-nav').searchFilters();


        // Checklist table tooltips
        // TODO: Move into separate function once global tooltips are finalized.
        $('.checklist .feature').hover(
            function() {
                $(this).find('.tooltip').stop(true,true).fadeIn();
            },
            function(){
                $(this).find('.tooltip').stop(true,true).fadeOut();
            });
        $('.filter-packages').filterPackages(); 
        
    }) // END document.ready

})(jQuery);
// JavaScript Document
/*
 * originally based on /etc/designs/residential/clientlibs/js/support/contact.js
 * rewrote EVERYTHING regarding the faq-navigator and placed as a clientlib of the component for modularity
*/
$(document).ready(function() {
    $(document).on('click','li.expander_background > a',function () {
        $(this).siblings(".expander").toggle("open");
        $(this).parent().toggleClass("open");
        return false;
    })
})
$(document).ready(function() {
	$(document).on('click','.faqItem .collapsible-heading',function () { 

        // expect div.parsys div.faqItem li a.collapsible-heading, div.parsys div.faqItem li div.faq-answer
        if ($(this).parent('li').hasClass('current')) {
            $(this).parent('li').find('.faq-answer').slideUp('slow', function() {
                $(this).parent('li').removeClass('current');
            });
        } else {
            $(this).parents('.faqItem').find('li.current .faq-answer').slideUp('slow', function() {
                $(this).parent('li').removeClass('current');
            });
            $(this).parent('li').find('.faq-answer').slideDown('slow', function() {
                $(this).parent('li').addClass('current');
            });
        }
        return false;
    });
})
/*! http://mths.be/placeholder v2.0.7 by @mathias 
    from this plugin https://github.com/mathiasbynens/jquery-placeholder 
    called from the mini-login-form      */
;(function(window, document, $) {

    var isInputSupported = 'placeholder' in document.createElement('input'),
        isTextareaSupported = 'placeholder' in document.createElement('textarea'),
        prototype = $.fn,
        valHooks = $.valHooks,
        hooks,
        placeholder;

    if (isInputSupported && isTextareaSupported) {

        placeholder = prototype.placeholder = function() {
            return this;
        };

        placeholder.input = placeholder.textarea = true;

    } else {

        placeholder = prototype.placeholder = function() {
            var $this = this;
            $this
                .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.placeholder')
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
            return $this;
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {
                var $element = $(element);
                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
            },
            'set': function(element, value) {
                var $element = $(element);
                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value == '') {
                    element.value = value;
                    // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                    if (element != document.activeElement) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass('placeholder')) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        isInputSupported || (valHooks.input = hooks);
        isTextareaSupported || (valHooks.textarea = hooks);

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.placeholder').each(function() {
                this.value = '';
            });
        });

    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {},
            rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this,
            $input = $(input);
        if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass('placeholder');
                input == document.activeElement && input.select();
            }
        }
    }

    function setPlaceholder() {
        var $replacement,
            input = this,
            $input = $(input),
            $origInput = $input,
            id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }
                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-password': true,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                // Note: `$input[0] != input` now!
            }
            $input.addClass('placeholder');
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass('placeholder');
        }
    }

}(this, document, jQuery));
//hide and show script
$(function() {
    $('.multi-form + form .form_button_submit').hide();
    if (window.location.href.match('status')) {
    	 $('.zipCheck').css({ display: "none" });
        $('.multi-form').find('.thankYou').css({ display: "block" });
    } else {
        $('.zipCheck').css({ display: "block" });
    }
    $('.toggle').click(function(e) {
        fetchGeoLocationData();
        e.preventDefault();
        return false;

    });
    $('.call-back-form').click(function() {
        callMymoveServlet();
    });
});
//check to see if the zipcode is in TWC footprint


function fetchGeoLocationData() {

    var x = $('input.zip_code').val();
    if (validateZipCode(x)) {
        $('input#zip_code2').val(x);
        $.getJSON('/bin/services/geolocation.json' + '?zip=' + $('#zip_code1').val(), function(data) {
            if (data.region) {
                geoLocateInRegion(true);

                // Zip code check - serviceable
                s.linkTrackVars="events,eVar7,prop19,eVar59";
                s.linkTrackEvents="event48";
                s.eVar7 = "check availability by zip code - zip code serviceable";
                s.prop19 = "check availability by zip code - zip code serviceable";
                s.eVar59 = s.pageName;
                s.events = "event48";
                s.tl (this, 'o', 'check availability by zip code - zip code serviceable');
            } else {
                geoLocateInRegion(false);

                // zip code check not serviceable
                s.linkTrackVars="events,eVar7,prop19,eVar59";
                s.linkTrackEvents="event48";
                s.eVar7 = "check availability by zip code - zip code not serviceable";
                s.prop19 = "check availability by zip code - zip code not serviceable";
                s.eVar59 = s.pageName;
                s.events = "event48";
                s.tl (this, 'o', 'check availability by zip code - zip code not serviceable');
            }
        }).error(function() {
            geoLocateInRegion(false);

            // Zip code database connectivity problems/etc
            s.linkTrackVars="events,eVar54,eVar59";
            s.linkTrackEvents="event82";
            s.eVar54 = "my move zip code lookup error";
            s.eVar59 = s.pageName;
            s.events = "event82";
            s.tl (this, 'o', 'my move zip code lookup error');
        });
    } else {
        alert("Zip Code must be filled out");
        return false;
    }
}

function geoLocateInRegion(inRegion) {
    if (inRegion) {
   	 	$('.multi-form').find('.fail').css({ display: "none" });
        $('.multi-form').find('.success').css({ display: "block" });
    } else {
    	 $('.multi-form').find('.success').css({ display: "none" });
        $('.multi-form').find('.fail').css({ display: "block" });
    }
}

//submit callback form and sendout thank you email


function callMymoveServlet() {
    var validation = validateForm();
    if (validation == true) {
        var mailTo = $('#email_addr').val();
        $('<input type="hidden" value="' + mailTo + '" name="mailTo"/>').appendTo('.multi-form+form');
        $.getJSON('/bin/mymove.json' + '?FirstName=' + $('#first_name').val() + '&LastName=' + $('#last_name').val() + '&PhoneNumber=' + $('#area_code').val() + $('#prefix').val() + $('#line_number').val() + '&AlternateNumber=' + $('#alt_area_code').val() + $('#alt_prefix').val() + $('#alt_line_number').val() + '&ZipCode=' + $('#zip_code2').val() + '&Email=' + $('#email_addr').val(), function() {
            $('.multi-form+form input.form_button_submit').trigger('click');

            // call back submit success
            s.linkTrackVars="events,eVar7,prop19,eVar59";
            s.linkTrackEvents="event48";
            s.eVar7 = "My Move Get a Call Back Submit success";
            s.prop19 = "My Move Get a Call Back Submit success";
            s.eVar59 = s.pageName;
            s.events = "event48";
            s.tl (this, 'o', 'my move get a callback submit success');
        }).error(function() {
            alert("Callback form couldn't submit.");

            // Get a call back back end/database/etc problems
            s.linkTrackVars="events,eVar54,eVar59";
            s.linkTrackEvents="event82";
            s.eVar54 = "My Move Get a Call Back Submit error";
            s.eVar59 = s.pageName;
            s.events = "event82";
            s.tl (this, 'o', 'my move get a callback submit error');
        });
    }
}

function validateForm() {
    var x = $('input.zip_code').val();
    if (!validateZipCode(x)) {
        alert("Zip Code must be filled out");
        return false;
    }

    x = $('input#first_name').val();
    if (x == null || x == "") {
        alert("First name must be filled out");
        return false;
    }

    x = $('input#last_name').val();
    if (x == null || x == "") {
        alert("Last name must be filled out");
        return false;
    }

    x = $('input#email_addr').val();
    if (!validateEmail(x)) {
        alert("Email must be filled out");
        return false;
    }

    x = $('.phone input#area_code').val();
    y = $('.phone input#prefix').val();
    z = $('.phone input#line_number').val();
    var phone = x + y + z;
    if (!validatePhoneNumber(phone)) {
        alert("Phone number must be filled out");
        return false;
    }
    return true;
}

function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}

function validatePhoneNumber(elementValue) {
    var phoneNumberPattern = /^\d{10}$|^\d{10}-\d{4}$/;
    return phoneNumberPattern.test(elementValue);
}

function validateZipCode(elementValue) {
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return zipCodePattern.test(elementValue);
}


$(document).ready(function () {
    //onfocus of zip field if someone hits return trigger click on the a tag
    $('#zip_code1').keypress(function(e) {
        var code =null;
        code= (e.keyCode ? e.keyCode : e.which);

        if (code==13) {
            $('.toggle').click();
            e.preventDefault();
            return false;
        }
    })
})
