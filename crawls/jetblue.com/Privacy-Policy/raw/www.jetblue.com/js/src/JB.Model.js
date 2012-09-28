/**
 * Models Cache Namespace.
 * Collection of cached data.
 * @namespace
 */

JB.Model.Cache = {};


/**
 * Gets a Script file that contains all the airport codes and generates an Array of airports available to the passed in country code.
 * @param {String} [url] Option URL to Request from.
 * @param {Function} callback Callback function.
 */

JB.Model.getAirports = function (url, callback) {
    var self = this;
    // Parameter Shift
    if ($.isFunction(url)) {
        var callback = url;
        var url = null;
    }
    if (!!JB.Model.Cache.airports && $.isFunction(callback)) {
        callback(JB.Model.Cache.airports);
        return;
    }
    var countries = {};
    $.map(aRegions, function (region) {
        if (!!region.countries) {
            for (var i = 0; i < region.countries.length; i++) {
                countries[region.countries[i]] = {
                    name: region.name,
                    code: region.code,
                    country: region.countries[i]
                }
            }
        }
    });
    var airportsCode = $.map(countries, function (country) {
        return $.extend(eval("c" + country.country).airports, eval("c" + country.country).airports);
    });
    // Sanatized Airports
    var airports = $.map(airportsCode, function (airport) {
        var airport = (typeof airport === "string") ? eval("o" + airport) : null;
        if (!airport) return;
        if (window["r" + airport.code] != undefined) {
            var routes = eval("r" + airport.code);
            return {
                label: airport.name,
                code: airport.code,
                jb: airport.jb,
                cc: airport.cc,
                duplicate: airport.duplicate == undefined ? false : true,
                country: eval("c" + airport.cc).name,
                region: countries[airport.cc],
                routes: routes
            };
        } else {
            return;
        }
    });
    // ASC sort airports by country name
    airports.sort(function (a, b) {
        var labelA = a.country.toLowerCase(), labelB = b.country.toLowerCase();
        if (labelA < labelB) return -1;
        if (labelA > labelB) return 1
        return 0;
    });
    var airportsByCountry = {};
    for (var i = 0; i < airports.length; i++) {
        if (!!!(airportsByCountry[airports[i].country])) airportsByCountry[airports[i].country] = [];
        airportsByCountry[airports[i].country].push(airports[i]);
    }
    var airports = [];
    for (country in airportsByCountry) {
        airportsByCountry[country].sort(function (a, b) {
            var labelA = a.label.toLowerCase(), labelB = b.label.toLowerCase();
            if (labelA < labelB) return -1;
            if (labelA > labelB) return 1
            return 0;
        });
        airports = airports.concat(airportsByCountry[country]);
    }
    if ($.isFunction(callback)) callback(airports);
    JB.Model.Cache.airports = airports; // Cache
};


/**
 * Gets a Script file that contains all the airport codes and generates an Array of airports available to the passed in country code.
 * @param {String} [url] Option URL to Request from.
 * @param {Function} callback Callback function.
 */

JB.Model.getVacations = function(url, callback){
	var self = this;
	// Parameter Shift
	if($.isFunction(url)){
		var callback = url;
		var url = null;
	}
	if(!!JB.Model.Cache.vacations && $.isFunction(callback)){
		callback(JB.Model.Cache.vacations);
		return;
	}
	var escapeRegex = function(value){
		return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	};
	var destinations = $.map(VacationDests, function(destination){
		if(!!destination){
			return {
				label: destination[1],
				code: destination[0]
			}
		}
	});
	var origins = $.map(FlightOrigins, function(origin){
		if(!!origin){
			var destinations = eval("a" + origin[0]);
			return {
				label: origin[1],
				code: origin[0],
				destinations: $.map(destinations, function(destination){
					if(!!destination) return destination;
				})
			}
		}
	});
	// Add Origins to Destinations
	for(var i = 0; i < destinations.length; i++){
		destinations[i].origins = $.map(origins, function(origin){
			var matcher = new RegExp(escapeRegex(destinations[i].code), "i");
			if(matcher.test(origin.destinations.toString().replace(/\,/gi, " "))) return origin.code;
		});
	}
	// ASC Sort
	origins.sort(function(a, b){
		var labelA = a.label.toLowerCase(), labelB = b.label.toLowerCase();
		if(labelA < labelB) return -1;
		if(labelA > labelB) return 1
		return 0;
	});
	var vacations = {origins: origins, destinations: destinations};
	if($.isFunction(callback)) callback(vacations);
	JB.Model.Cache.vacations = vacations; // Cache
};