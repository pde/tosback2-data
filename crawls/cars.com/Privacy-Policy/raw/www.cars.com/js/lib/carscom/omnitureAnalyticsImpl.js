carscom.analytics.OmnitureFactory = function() {
    function Factory() {
        //Private inner implementation
        var provider = s_clven;
        var analytics = {};
        
        //Omniture tracked properties defined here, per Omniture Fusion Playbook 2.11
        analytics[carscom.analytics.MAKE] = ['prop12','eVar12'];
        analytics[carscom.analytics.YEAR] = ['prop14','eVar14'];
        analytics[carscom.analytics.MIN_PRICE] = ['prop10','eVar16'];
        analytics[carscom.analytics.MAX_PRICE] = ['prop9','eVar15'];
        analytics[carscom.analytics.BODY_STYLE] = ['prop37','eVar37'];
        analytics[carscom.analytics.MPG] = ['prop38'];
        
        function clearProps() {
            for (name in analytics) {
                var props = analytics[name];
                for (propName in props) {
                    provider[propName] = '';
                }
            }
        }
        
        //Override abstract function in carscom.analytics.ajax
        this.trackEvent = function(eventSource, eventValue, propName, params) {
            clearProps();
            var iiPropName = this.resolvePropertyName(propName, eventSource);
            var propBag = analytics[iiPropName];
            try {
                if (typeof propBag != "undefined") {
                    var linkTrack = 'prop39';
                    for (itemIndex in propBag) {
                        provider[propBag[itemIndex]] = "ajax:"+eventValue;
                        linkTrack += ","+propBag[itemIndex];
                    }
                    provider.linkTrackVars = linkTrack;
                }
    
                //All AJAX events get this property
                provider.prop39 = "ajax:"+iiPropName;
                provider.linkTrackEvents = "None";
                provider.tl(eventSource, 'o', iiPropName);
            } catch(ex) {}
        }
    }

    //Return Omniture implementation via factory
    if (typeof s_clven == "undefined") throw "Omniture implementation unavailable";
    Factory.prototype = new carscom.analytics.EventTracker();
    return new Factory();
}