(function() {
    /**
     * Object responsible for Skava's Omniture analytics. trackAnalytics is the only public method and is exported
     * as skava.omniture.client.trackAnalytics.
     */
    var SkavaOmnitureClient = function SkavaOmnitureClient() {};

    /**
     * This is a collection of event handlers that are called by SkavaOmnitureClient.trackAnalytics(). The first
     * argument of trackAnalytics, pageName, is used to look up which analyticEvents handler to execute.
     */
    SkavaOmnitureClient.analyticEvents = {};

    /**
     * The following private members of this module are for managing registry IDs for previously viewed registries.
     *  Kiosk uses an array stored in the parent frame.
     *  Webstore uses a session cookie.
     */
    var COOKIE_NAME = 'omniGrViewed';

    /**
     * A map of objects for managing previously viewed registry state. One for kiosk, one for webstore.
     */
    var managers = {
        kiosk: {
            init: function() {
                s = values;
                if (isChildFrame) {
                    window.parent.kiosk.cache.omniture.viewedRegistries = [];
                }
            },
            isOmnitureActive: function() {
                return window !== window.parent && window.parent.isOmnitureActive();
            },
            hasViewedRegistry: function(regId) {
                if (isChildFrame) {
                    var array = window.parent.kiosk.cache.omniture.viewedRegistries;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === regId) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return false; // if not in frame, send to omniture every time
                }
            },
            clearVariables: function() {
            },
            preserveViewedRegistryId: function(regId) {
                if (isChildFrame) {
                    window.parent.kiosk.cache.omniture.viewedRegistries.push(regId);
                }
            },
            submit: function() {
                window.parent.omni.submit(s);
            }
        },
        webstore: {
            init: function() {},
            isOmnitureActive: function() {
                return typeof s !== 'undefined';
            },
            hasViewedRegistry: function(regId) {
                var val = '' + $.cookie(COOKIE_NAME);
                return val ? val.indexOf(regId) !== -1 : false;
            },
            clearVariables: function() {
                s.manageVars("clearVars");
            },
            preserveViewedRegistryId: function(regId) {
                var origVal = $.cookie(COOKIE_NAME);
                var val = origVal ? origVal + ',' + regId : '' + regId;
                var expiresDate = new Date();
                expiresDate.setTime(expiresDate.getTime() + (1000 * 60 * 60 * 24));
                $.cookie(COOKIE_NAME, val);
            },
            submit: function() {
                s.t();
            }
        }
    };

    var _isKiosk = function() {
        return typeof isKiosk !== 'undefined' && isKiosk;
    };

    /**
     * Choose the correct manager and call it's init function.
     */
    var manager = _isKiosk() ? managers.kiosk : managers.webstore;
    manager.init();

    /**
     * Mappings of Skava's registryType values to the correct values for analytics
     */
    var skavaRegistryTypeMappings = {
        "registry.wedding": "bridal",
        "registry.bridal": "bridal",
        "registry.splday": "wishlist",
        "registry.baby": "baby"
    };

    /**
     * Exposed API for handling Omniture submissions from Skava pages.
     *
     * @param eventName - key of handler in SkavaOmnitureClient.analyticEvents to execute
     * @param values - values bound to Omniture's s object
     */
    SkavaOmnitureClient.prototype.trackAnalytics = function(eventName, values) {
        if (manager.isOmnitureActive()) {
            var newValues = this.massageInput(values);
            if (typeof console !== 'undefined') {
                console.log('Submitting Omniture report for ' + eventName + ' with values: ', newValues);
            }
            manager.clearVariables();
            var submit = SkavaOmnitureClient.analyticEvents[eventName](newValues);
            if (typeof submit === 'undefined' || submit) {
                manager.submit();
            }
        }
    };

    SkavaOmnitureClient.prototype.massageInput = function(values) {
        // default with object literal if false-y
        var newValues = values || {};
        // replace Skava's registryType value with the appropriate value for reports
        if (newValues.registryType) {
            $.each(skavaRegistryTypeMappings, function(key, value) {
                var matchesMapping = newValues.registryType === key;
                if (matchesMapping) {
                    newValues.registryType = value;
                }
                return !matchesMapping;
            });
        }
        return newValues;
    };

    /**
     * Below are handler methods for analytic events.  Return false to not auto-submit the s object's data.
     */

    /********************
     * QuickView Events *
     *******************/
    SkavaOmnitureClient.analyticEvents.QuickViewAddToBag = function(values) {
        s.pageName = "QuickView:Add to Cart";
        s.prop4 = "QuickView: Add to Cart";
        s.prop9 = "Cart";
        s.prop10 = "Cart";
        s.prop11 = "Cart";
        s.events = "scAdd";

        //var isWebExclusive = typeof values["valicons"] !== 'undefined' && values["valicons"].indexOf("Online_Exclusive") >= 0 ? 'Y' : 'N';

        s.products = ";" + values["sku"] + ";;;;evar25=" + s.eVar25 + "|evar26=" + s.eVar26 + "|evar27=" + s.eVar27 + "|evar28=" + s.eVar28 + "|eVar29=" + s.eVar29;
    };

    /*******************
     * Wishlist Events *
     *******************/
    var pageLoadValues = {};

    SkavaOmnitureClient.analyticEvents.wlPageLoad = function(values) {
        pageLoadValues = {};
        if(typeof values["giftingListing"] === 'undefined') {
            s.pageName = "Gift Guide:" + values["pageName"];
            s.prop1 = values["giftGuide"];
            s.prop2 = values["category"];
            s.prop3 = values["subcategory"];
            s.prop4 = "Gift Guide";

            s.eVar25 = s.eVar26 = s.eVar27 = s.prop1;

            s.eVar3 = "Gift Guide";
            pageLoadValues["giftingListing"] = "Gifting";

            var level = 3;

            if (!values["subcategory"]) {
                level = 2;
                if(!values["category"]) {
                    level = 1;
                }
            }

            switch(level) {
                case 2:
                    s.eVar26 += ">" + s.prop2;
                    s.eVar27 += ">" + s.prop2;
                    break;
                case 3:
                    s.eVar27 += ">" + s.prop2 + ">" + s.prop3;
                    break;
                default:
                    break;
            }

            s.eVar28 = s.eVar27;

            pageLoadValues["level"] = level;
        } else {
            s.eVar3 = "List|" + values["ownerGuest"];
            s.eVar57 = values["listName"] + "|" + values["ownerGuest"];
            s.pageName = values["pageName"] + ":" + values["listName"] + ":" + values["pageSection"] + ":" + values["ownerGuest"];
            s.prop1 = s.eVar25 = values["pageName"];
            s.prop2 = s.eVar26 = values["pageName"];
            s.prop3 = s.eVar27 = values["pageName"];
            s.prop4 = values["pageType"] || values["pageName"];
            s.prop9 = values["pageSection"] || values["pageName"];
            s.prop10 = values["pageSubSection"] || values["pageName"];
            s.prop11 = values["pageSubSection"] || values["pageName"];
            pageLoadValues["giftingListing"] = "List";
            pageLoadValues["listName"] = s.eVar57;

            if(!values["pageSection"]) analyticEvents["listView"]();
        }
        pageLoadValues["pageName"] = s.pageName;
    };

    SkavaOmnitureClient.analyticEvents.wlListAdd = function(values) {
        if(values.length !== undefined) {
            s.events="event28,event35";
            var products = "";
            $.each(values, function(ind, item){
                s.eVar57 = item["listName"];
                products += ";" + item["sku"] + ";;;event35=" + item["retailPrice"] + ",";
            });
            s.products = products.substring(0, products.length-1);
            s.prop4 = "List: Add to List";
        }
    };

    SkavaOmnitureClient.analyticEvents.wlListRemove = function(values) {
        //Page Load - s.eVar57 = values["listName"];
        s.events = "event29";
        s.products = ";" + values["sku"];
    };

    SkavaOmnitureClient.analyticEvents.wlListView = function() {
        s.events = "event32";
        s.prop4 = "List View";
        //Page Load - s.eVar57 = values["listName"] + "|" + values["ownerGuest"];
    };

    SkavaOmnitureClient.analyticEvents.wlListCreate = function(values) {
        s.events = "event30";
        s.eVar57 = values["listName"] + "|owner";
    };

    SkavaOmnitureClient.analyticEvents.wlListDelete = function(values) {
        s.events = "event31";
        s.eVar57 = values["listName"] + "|owner";
    };

    SkavaOmnitureClient.analyticEvents.wlListShare = function() {
        s.events = "event34";
        s.eVar58 = "List";
    };

    SkavaOmnitureClient.analyticEvents.wlPrint = function() {
        s.prop24 = "List";
    };

    SkavaOmnitureClient.analyticEvents.wlListSettings = function(values) {
        s.prop31 = pageLoadValues["listName"] + ":" + values["budget"] + ":" + values["privacy"] + ":" + values["eventDate"];
        s.prop4 = "List Settings";
    };

    SkavaOmnitureClient.analyticEvents.wlListSearch = function(values) {
        s.prop5 = "List:" + values["searchTerm"];
        s.eVar8 = "List:" + values["searchTerm"];
        s.eVar9 = "list";
    };

    SkavaOmnitureClient.analyticEvents.wlViewViaPSW = function(values) {
        s.eVar59 = "Product Selection Window";
        s.prop4 = "Product Selection Window";
        s.events = "ProdView,event36";
        s.products = ";" + values["productId"];
        s.pageName = s.pageName + ":Product Selection Window";
    };

    SkavaOmnitureClient.analyticEvents.wlPswToProductPage = function(values) {
        s.events = "ProdView";
        s.products = ";" + values["productId"];
        s.eVar59 = "Product Page";
        s.prop4 = "Product Page";
    };

    SkavaOmnitureClient.analyticEvents.wlAddToBag = function(values) {
        s.pageName = pageLoadValues["giftingListing"] + ":Add to Cart";
        s.prop4 = pageLoadValues["giftingListing"] + ": Add to Cart";
        s.prop9 = "Cart";
        s.prop10 = "Cart";
        s.prop11 = "Cart";
        s.events = "scAdd";

        var isWebExclusive = typeof values["valicons"] !== 'undefined' && values["valicons"].indexOf("Online_Exclusive") >= 0 ? 'Y' : 'N';

        s.products = ";" + values["sku"] + ";;;;evar16="
            + isWebExclusive + "|evar25=" + s.eVar25 + "|evar26=" + s.eVar26 + "|evar27=" + s.eVar27 + "|evar28=" + s.eVar28 + "|eVar29=" + s.eVar29;
    };

    /************************
     * Gift Registry Events *
     ************************/
    /**
     * View product from registry, requires a value for:
     *  productCode
     *  productName
     *  registryId
     *  registryType
     *  eventType (optional)
     *  eventDate
     *  location
     *  ownership
     *  visibility
     */
    SkavaOmnitureClient.analyticEvents.grProdView = function(values) {
        s.pageName = 'pdp:(' + values.productCode + ') ' + values.productName;
        s.prop4 = s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'product detail page';
        s.products = values.productCode;
        s.events = 'prodView,event3';
    };

    /**
     * Click favorite UI elements, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  eventDate
     *  location
     *  ownership
     *  visibility
     */
    SkavaOmnitureClient.analyticEvents.grFavoriteClick = function(values) {
        s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
        s.pageName = s.prop4 = s.prop1 = s.prop2 = s.prop3 = s.prop7 = s.eVar3 + ': favorite';
        SkavaOmnitureClient.setRegistryDetails(values);
        s.products = values.productCode;
        s.events = 'event40';
    };

    /**
     * Visit registry landing page, requires a value for:
     *  registryType (optional)
     *  eventType (optional)
     */
    SkavaOmnitureClient.analyticEvents.grLanding = function(values) {
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values, true);
        s.pageName = s.prop4 = s.eVar3 + ': landing page';
    };

    /**
     * Login
     */
    SkavaOmnitureClient.analyticEvents.grLogin = function() {
        s.pageName = s.prop4 = 'Registry: Sign in';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = s.eVar3 = 'Registry';
    };

    /**
     * Create registry start, requires a value for:
     *  registryType (optional)
     */
    SkavaOmnitureClient.analyticEvents.grCreateStart = function(values) {
        var registryType = values.registryType ? values.registryType + ' details' : 'Type of registry';
        s.pageName = s.prop4 = 'Registry: ' + registryType;
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
    };

    /**
     * Create registry complete, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  eventDate
     *  location
     *  ownership
     *  visibility
     */
    SkavaOmnitureClient.analyticEvents.grCreateComplete = function(values) {
        s.prop4 = SkavaOmnitureClient.getRegistryDescriptor(values) + ': Confirmation';
        s.pageName = s.prop4 + ': ' + values.registryId;
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = s.eVar3 = 'Registry';
        SkavaOmnitureClient.setRegistryDetails(values);
        s.events = 'event13,event30';
    };

    /**
     * Print registry, requires a value for:
     *  registryType
     *  eventType (optional)
     */
    SkavaOmnitureClient.analyticEvents.grPrint = function(values) {
        s.pageName = s.prop4 = 'Registry: print';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        s.prop24 = SkavaOmnitureClient.getRegistryDescriptor(values);
        SkavaOmnitureClient.setRegistryDetails(values);
    };

    /**
     * Share registry, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  eventDate
     *  location
     *  ownership
     *  visibility
     */
    SkavaOmnitureClient.analyticEvents.grShare = function(values) {
        s.pageName = s.prop4 = 'Registry: share';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        SkavaOmnitureClient.setRegistryDetails(values);
        s.events = 'event34';
        s.eVar58 = SkavaOmnitureClient.getRegistryDescriptor(values);
    };

    /**
     * Search results, requires a value for:
     *  registryType
     *  eventType (optional)
     *  searchTerm
     *  sortType (optional)
     */
    SkavaOmnitureClient.analyticEvents.grSearchResults = function(values) {
        s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
        s.pageName = s.prop4 = s.eVar3 + ': Search results';
        if (values.sortType) {
            s.pageName = s.pageName + '(sort by ' + values.sortType +')';
        }
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        s.prop5 = s.eVar3 + ':(' + values.searchTerm + ')';
    };

    /**
     * View registry, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  eventDate
     *  location
     *  ownership
     *  visibility
     */
    SkavaOmnitureClient.analyticEvents.grView = function(values) {
        var regId = values.registryId;
        if (manager.hasViewedRegistry(regId)) {
            if (typeof console !== 'undefined') {
                console.log('Not handling Omniture event grView because user has already viewed this registry');
            }
        } else {
            s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
            var regMeta = s.prop1 = s.prop2 = s.prop3 = s.prop7 = s.eVar3 + ': Details';
            s.pageName = regMeta + ': ' + regId;
            s.prop4 = 'Registry: Details';
            s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
            SkavaOmnitureClient.setRegistryDetails(values);
            s.events = 'event32';
            manager.preserveViewedRegistryId(regId);
        }
    };

    /**
     * Add to registry, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  ownership
     *  productCode
     *  totalItemPrice
     */
    SkavaOmnitureClient.analyticEvents.grAdd = function(values) {
        values.itemPrice = values.totalItemPrice / values.quantity;
        for (var i = 0; i < values.quantity; i++) {
            skava.omniture.client.trackAnalytics('grAddSingle', values);
        }
        return false;
    };

    SkavaOmnitureClient.analyticEvents.grAddSingle = function(values) {
        s.pageName = s.prop4 = 'Add to registry pop-up';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        SkavaOmnitureClient.setRegistryDetails(values);
        s.products = ';' + values.productCode + ';;;' + 'event35=' + values.itemPrice;
        s.events = 'event28,event35';
    };

    /**
     * Delete registry, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  ownership
     */
    SkavaOmnitureClient.analyticEvents.grDeleteRegistry = function(values) {
        s.pageName = s.prop4 = 'Registry: delete';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
        SkavaOmnitureClient.setRegistryDetails(values);
        s.events = 'event31';
    };

    /**
     * Delete from registry, requires a value for:
     *  registryId
     *  registryType
     *  eventType (optional)
     *  ownership
     *  productCode
     */
    SkavaOmnitureClient.analyticEvents.grDelete = function(values) {
        s.pageName = s.prop4 = 'Registry: delete item';
        s.prop1 = s.prop2 = s.prop3 = s.prop7 = 'Registry';
        s.eVar3 = SkavaOmnitureClient.getRegistryDescriptor(values);
        SkavaOmnitureClient.setRegistryDetails(values);
        if (!values.productCode) {
            throw new Error("Skava: Please only throw the 'grDelete' event when removing an item from a registry and you have a valid sku to pass as 'productCode'")
        }
        s.products = values.productCode;
        s.events = 'event29';
    };

    SkavaOmnitureClient.analyticEvents.grAddToBag = function(values) {
        s.pageName = 'Cart: Add to Cart';
        s.pageType = s.prop4 = 'Cart Add';
        s.prop1 = s.prop2 = s.prop3 = s.prop9 = s.prop10 = s.prop11 = "Cart";
        s.events = "scAdd";

        var isWebExclusive = typeof values.valicons !== 'undefined' && values.valicons.indexOf("Online_Exclusive") >= 0;

        s.products = ";" + values.sku + ";;;;evar16=" + (isWebExclusive ? 'Y' : 'N');
    };

    /***********************
     * Gift Registry Utils *
     ***********************/
    SkavaOmnitureClient.getRegistryType = function(values, isLanding) {
        if (values.registryType) {
            return values.registryType.toLowerCase() === 'wishlist'
                ? isLanding ? values.registryType : SkavaOmnitureClient.getWishlistRegistryType(values)
                : values.registryType;
        } else {
            return '';
        }
    };

    SkavaOmnitureClient.getWishlistRegistryType = function(values) {
        if (values.eventType) {
            return values.registryType + ': ' + values.eventType;
        } else {
            throw new Error("Skava: please provide an eventType property when registryType is 'wishlist'");
        }
    };

    SkavaOmnitureClient.getRegistryDescriptor = function(values, isLanding) {
        var registryType = SkavaOmnitureClient.getRegistryType(values, isLanding);
        var result = 'Registry';
        if (registryType.length) {
            result += ': ' + registryType;
        }
        return result;
    };

    SkavaOmnitureClient.setRegistryDetails = function(values) {
        var regMeta = SkavaOmnitureClient.getRegistryDescriptor(values);
        s.eVar57 = regMeta + ': ' + values.registryId + '|' + SkavaOmnitureClient.getOwnership(values);
    };

    SkavaOmnitureClient.getOwnership = function(values) {
        return values.ownership ? 'owner' : 'guest';
    };

    /**
     * Module export
     */
    if (typeof namespace === 'undefined') {
        if (typeof skava === 'undefined') skava = {};
        if (typeof skava.omniture === 'undefined') skava.omniture = {};
    } else {
        namespace('skava.omniture');
    }
    skava.omniture.client = new SkavaOmnitureClient();
})();
