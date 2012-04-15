self.carscom = self.carscom || {};
//Create analytics package namespace
carscom.analytics = {};

//Define abstract, implementation-independent AJAX tracking service
carscom.analytics.EventTracker = function() {
    this.trackables = {}
    
    //Public
    /*
    Send tracking information via the underlying analytics provider.  If no trackable property is found
    associated with the event, the call must fail silently.
    Abstract method; must be implemented in inheritors.
    Function parameters:
        eventSource     DOM object that generated the trackable event
        eventValue      String value to be tracked
        propName        Name of analytics property to be set; can be friendly or implementation-independent.
                        If empty, eventSource should be inspected for a registered id, name or (if link) 
                        innerText property
        param           Arbitrary collection of extra parameters; implementation-dependent
    */
    this.trackEvent = function(eventSource, eventValue, propName, params) {}
    /*
    Associate a friendly name (such as a page element or header name) with an implementation-independent analytics
    property name.  Meant to reduce overhead on calling pages by allowing easily accessible names to stand
    transparently for associated analytics properties.
    Function parameters:
        name            Friendly name of trackable property.  Usually the name of a page element or area
                        where a given type of trackable event is generated.
        property        Implementation-independent carscom property name
    */
    this.registerTrackedProperty = function(name, property) {
        this.trackables[name] = property;
    }
    /*
    Attempt to find a canonical carscom.analytics name for a friendly property name or from DOM properties.
        propName        Name of analytics property to be set; can be friendly or implementation-independent.
                        If empty, eventSource will be inspected for a registered id, name or (if link) 
                        innerText property
        eventSource     DOM object that generated the trackable event
    */
    this.resolvePropertyName = function(propName, eventSource) {
        if (typeof this.trackables[propName] != "undefined") return this.trackables[propName];
        else if (eventSource.nodeName && eventSource.nodeName.toLowerCase() == 'a' && typeof this.trackables[eventSource.innerText] != "undefined") return this.trackables[eventSource.innerText];
        else if (eventSource.id && typeof this.trackables[eventSource.id] != "undefined") return this.trackables[eventSource.id];
        else if (eventSource.name && typeof this.trackables[eventSource.name] != "undefined") return this.trackables[eventSource.name];
        else return null;
    }
};

//Implementation-independent analytics property names
carscom.analytics.MAKE = "Make";
carscom.analytics.MODEL = "Model";
carscom.analytics.YEAR = "Year";
carscom.analytics.MIN_PRICE = "Minimum Price";
carscom.analytics.MAX_PRICE = "Maximum Price";
carscom.analytics.BODY_STYLE = "Body Style";
carscom.analytics.MPG = "Miles per Gallon";