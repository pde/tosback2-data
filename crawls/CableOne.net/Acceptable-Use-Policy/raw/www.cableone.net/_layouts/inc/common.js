// Global "namespace" for Javascript functionality.
var C1 = function () {
    // Private Elements
    var startup = [];                       // An array that will contain functions to call during init
    var shaderId = 'shader';                // The id of the div that is used for lightbox functionality. TODO: consider moving this to a different location?
    var locationCookie = 'c1_location';     // The name of the cookie used to store location info.
    var cityCookie = 'c1_City';
    var stateCookie = 'c1_State';     // The name of the cookie used to store state info.
    var systemIdCookie = 'c1_systemID';     // The name of the cookie used to store system id.
    var zipCookie = 'c1_zipcode';           // The name of the cookie used to store zip code info.
    var oldSystemCookie = 'CableOneSystem';   // The name of the cookie used to store zip code info.
    var statesServiced = [];                // An array of the states that cableone services. Pulled from ajax.
    var selectedCities = [];                // An array of the cities available to the current state. Pulled from ajax.
    var _handlerPrefix = '/_controltemplates/';

    // Private function that fades an element by quicly changing its opacity.
    // o : The initial opacity of an element that will be faded.
    // inc : The increment to fade an element. Positive values to decrease opacity, negative to increase it. (This feels backwards, but is what prototype uses.)
    // eq : A function that provides returns a boolean. This determines when to exit the fade loop.
    // postFunc : An optional function that runs after the fade loop has completed.
    function fade(elem, o, inc, eq, postFunc) {
        function fadeloop() {
            if (eq(o)) {
                o += inc;
                $j(elem).fadeTo(o);
                setTimeout(function () { fadeloop(); }, 10);
            } else {
                if (postFunc != null) {
                    postFunc();
                }
            }
        }
        fadeloop();
    }

    // Private function that displays/hides the appropriate location panels, depending on whether the user already specified a location.
    function displayLocationPanel(showLocation) {
        if (showLocation) {
            $j('div.#c1_LocationSet').hide();
            $j('div.#c1_LocationNotSet').show();
        } else {
            $j('div.#c1_LocationSet').show();
            $j('div.#c1_LocationNotSet').hide();
            $j('#shadow').hide();
        }
    }

    // Gets the height of the page. This was grabbed from a webpage somewhere.
    function getHeight() {
        return document.body.offsetHeight + 50;
    }

    // 
    function storeZip(zip) {
        if (zip != null && zip != '') {
            C1.setCookie(zipCookie, zip, 14);
        }
    }
	
	function storeState(state) {
        if (state != null && state != '') {
            C1.setCookie(stateCookie, state, 14);
        }
    }
	
	function storeCity(city) {
        if (city != null && city != '') {
            C1.setCookie(cityCookie, city, 14);
        }
    }

    // store old system id as cookie
    function storeOldSystem(code) {
        if (code != null && code != '') {
            C1.setCookie(oldSystemCookie, code, 365);
        }
    }

    // Creates a shader element if it does not already exist and makes it completely transparent.
    function getOrCreateShader(elemId) {
        var elem = $j(elemId);
        if (elem == null) {
            elem = createDiv(elemId, {
                backgroundColor: '#000',
                width: '100%',
                height: height() + 'px',
                position: 'absolute',
                top: '0px',
                left: '0px',
                zIndex: C1.topZ
            });
            $j(elem).hide();
        }
        $j(elem).fadeTo(1.0);
        return elem;
    }

    // Creates a new div element and adds it to the document's body.
    function createDiv(elemId, style, parent) {
        var div = document.createElement('div');
        div.attr('id', elemId);
        if (parent == null) {
            document.body.append(div);
        } else {
            parent.append(div);
        }
        $j(div).css(style);
        return div;
    }

    // Populates the statesServiced array if it has not been filled already.
    function getStates() {
        if (statesServiced.length == 0) {
            retrieveStates();
        }
    }

    // Populates a dropdown list with an array of objects.
    // list: the dropdown list
    // objects: the array of objects that will make up the list
    // valField: the property of the object that will fill the 'value' attribute of the dropdown option.
    // textField: the property of the object that will fill the 'text' attribute of the dropdown option.
    function bindList(list, objects, valField, textField) {
        clearListItems(list);
        $j(list).prepend($j('<option></option>').val('').html('Select a city'));
        $j.each(objects, function (i, item) {
            $j(list).append($j('<option></option>').val(item.Name).html(item.Name));
        });
    }

    function clearListItems(list) {
        $j(list).html("");
    }

    // Retrieves a list of cities available for the selected state.
    // callback: a function to handle the list of cities. This is used because the asynchronous nature of the ajax call; it will return 
    // null before the call completes and cause unexpected behavior.
    // TODO: this could be cleaned up more since the function should ONLY retrieve cities. A refactoring could be to just give the callback
    // function the city array, and let that do whatever with it.

    function retrieveCities(callback) {
        $j('#cityList').html('');
        $j.ajax({
            type: 'GET',
            url: C1.ajaxUrl,
            data: 'f=getCities&state=' + C1.selectedState.Abbreviation,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
				selectedCities = data;
                var cityText = ""; 
				$j.each(data, function (i, item) {
					cityText = cityText + '<div class="setLocationSystem" onclick="javascript:C1.func.setLocation();" onmouseover="javascript:C1.func.setCity(\'' + item.Name + '\')"><a class="systemLink" href="javascript:C1.func.setLocation();" ><span style="color: #FFFFFF !important;">' + item.Name + '</span></a></div>';
				});
				
                $j('#cityList').html(cityText);
                bindList('#c1_cityList', data, 'Name', 'Name');
            },
            failure: function (data) {
            }
        });
        /*$j('cityList').innerHTML = '';
        var a = new Ajax.Request(C1.ajaxUrl, {
        method: 'get',
        parameters: { f: 'getCities', state: C1.selectedState.Abbreviation },
        onSuccess: function(transport) {
        selectedCities = transport.responseText.evalJSON();
        var cityText = selectedCities.inject('', callback);
        $j('cityList').innerHTML = cityText;
        bindList('c1_cityList', selectedCities, 'Name', 'Name');
        }
        });*/
    }

    function getCityByZip(zipCode, callback) {
        $j.ajax({
            type: 'GET',
            url: C1.ajaxUrl,
            data: 'f=getCityByZip&zip=' + zipCode,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data == null) {
                    alert('Zip code ' + zipCode + ' is not serviced.');
                } else {
                    C1.selectedState = { Abbreviation: data.State };
                    C1.selectedCity = data;
                    callback(data);
                }
            },
            failure: function (data) {
            }
        });
        /* var a = new Ajax.Request(C1.ajaxUrl, {
        method: 'get',
        parameters: { f: 'getCityByZip', zip: zipCode},
        onSuccess: function(transport) {
        var city = transport.responseText.evalJSON();
        if (city == null) {
        alert('zip code ' + zipCode + ' is not serviced.');
        } else {
        C1.selectedState = { Abbreviation: city.State };
        C1.selectedCity = city;
        callback(city);
        }
        },
        onFailure: function(transport) {
        //alert('zip lookup failure: ' + transport.responseText);
        }
        });*/
    }

    function retrieveAreas(callback) {
        $j.ajax({
            type: 'GET',
            url: C1.ajaxUrl,
            data: 'f=getAreas&cityId=' + C1.selectedCity.Id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            failure: function (data) {
            }
        });
        /* var a = new Ajax.Request(C1.ajaxUrl, {
        method: 'get',
        parameters: { f: 'getAreas', cityId: C1.selectedCity.Id },
        onSuccess: function(transport) {
        var areas = transport.responseText.evalJSON();
        callback(areas);
        },
        onFailure: function(transport) {
        //alert('retrieval error: ' + transport.responseText)
        }
        });*/
    }

    // Retrieves a list of states available from an ajax call.
    function retrieveStates() {
        $j.ajax({
            type: 'GET',
            url: C1.ajaxUrl,
            data: 'f=getStates',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                statesServiced = data;
            },
            failure: function (data) {
            }
        });
    }

    // loops through the state array looking for a particular abbreviation.
    function lookupState(stateAbbr) {
        return lookup(statesServiced, function (state) {
            return state.Abbreviation == stateAbbr;
        });
    }

    // loops through the city array looking for a particular city name.
    function lookupCity(cityName) {
        return lookup(selectedCities, function (city) {
            return city.Name == cityName;
        });
    }

    // loops through an array, and performs a comparison operation, returning the first match.
    function lookup(arr, comparer) {
        for (var i = 0; i < arr.length; i++) {
            if (comparer(arr[i])) {
                return arr[i];
            }
        }
        return null;
    }

    function displayAreas() {
        retrieveAreas(function (areas) {
            var areaRows = "<tr>\n";
			var count = 0;
			$j.each(areas, function (i, item) {
				count = count + 1;
				if (count == 2) {
					areaRows = areaRows + '<td>' + item + '</td>\n</tr>\n<tr>\n';
					count = 0;
				} else {
					areaRows = areaRows + '<td>' + item + '</td>\n';
				}
			});
            areaRows = areaRows + '<td></td>\n</tr>\n';
            
            $j('#serviceAreaTable').html('<table class="c1_list">\n<tbody>\n' + areaRows + '</tbody>\n</table>\n');
        });
    }

    // Public Elements
    var pub = {
        // Properties
        topZ: 100,                  // Z-Order of the highest element.
        loginActive: false,         // A flag stating that the login window is currently being displayed.
        locationActive: false,      // A flag stating that the location window is currently being displayed.
        ajaxUrl: _handlerPrefix + 'ajax.aspx',       // URL to the ajax handler.
        selectedState: null,        // The state currently selected by the user setting a location.
        selectedCity: null,         // The city currently selected by the user setting a location.
        handlerPathPrefix: _handlerPrefix,      // The prefix to insert before calls to http handlers. Needed because this differs from dev and production environments.

        // Functions

        effects: { // Effects namespace for functions that perform UI operations.

            // Bolds the text of the provided element.       
            embolden: function (elem) {
                $j(elem).css({ fontWeight: 'bold' });
            },

            // Unbolds the text of the provided element.
            unbold: function (elem) {
                $j(elem).css({ fontWeight: 'normal' });
            },

            // Displays an element as a "lightbox" by graying out the screen and displaying a specific element.
            lightbox: function (boxElem) {
                C1.effects.shade();
                var z = C1.topZ + 1;
                C1.effects.center(boxElem);
                $j(boxElem).css({ zIndex: z });
                $j(boxElem).show();
            },

            // Returns the screen back to a pre-lightbox state.
            unLightbox: function (boxElem) {
                C1.effects.fadeOut(shaderId, function () { $j(shaderId).hide(); });
                $j(boxElem).hide();
            },

            // Centers an element to its parent element.
            center: function (boxElem) {
                var boxW = $j(boxElem).width();
                var screenW = $j(boxElem).offsetParent().width();
                var x = screenW / 2 - boxW / 2;
                $j(boxElem).css({
                    position: 'absolute',
                    top: '50px',
                    left: x + 'px'
                });
            },

            // Shades the whole screen by overlaying a new div with a semi-transparent black background.
            shade: function () {
                // get or create an element that fills the whole screen
                var shader = getOrCreateShader(shaderId);
                shader.show();
                C1.effects.fadeIn(shaderId, 0.8);
            },

            // Fades in the specified div.
            fadeIn: function (elem, maxOpacity) {
                fade(elem, 0.0, 0.20, function (o) { return o < maxOpacity; });
            },

            // Fades out the specified div.
            fadeOut: function (elem, postFunc) {
                fade(elem, 1.0, -0.20, function (o) { return o > 0.0; }, postFunc);
            }
        },

        // Functionality for controls
        func: {
            searchZipCode: function (zipBox) {
                var zip = $j('#c1_zipLookup').val();
                if (zip != null && zip != '') {
                    storeZip(zip);
                    // perform the actual search.
                    getCityByZip(zip, function (city) {
						//storeCity(city.Name);
						//storeState(city.State);
						C1.func.setState(city.State);
						C1.selectedState = lookupState(city.State);
						C1.selectedCity = city;
                        ////$j('selectedCity').innerHTML = city.Name + ', ' + city.State;
                        ////displayAreas();
                        C1.func.setLocation();
                    });
                }
                else {
                    alert('zip can not be blank');
                }
            },

            getOldSystem: function (oldSystem, callback) {
                /*var a = new Ajax.Request(C1.ajaxUrl, {
                method: 'get',
                parameters: { f: 'getCityByOldSystemId', oldSystem: oldSystem},
                onSuccess: function(transport) {
                var city = transport.responseText.evalJSON();
                if (city != null) {
                callback(city);
                }
                },
                onFailure: function(transport) {
                //alert('System lookup failure: ' + transport.responseText);
                }
                });*/
            },

            // Displays the Set Your Location box.
            showSetLocation: function () {
                $j('#ctl00_SetLocation_LocationMap').attr("src", "/SiteCollectionImages/Map/usmap_MASTER.gif");
                C1.func.initStates();
                getStates();
                $j('div.#c1_setLocationContainer').css({ 'width': '600px', 'position': 'absolute', 'zIndex': '3000' });
                $j('div.#c1_setLocationContainer').css("left", "186px");
                C1.func.togglePanels(0);

                $j('.setlocation').append('<div id="shadow" style="position:fixed; z-index:2999; background-color:#000; display:none; top: 0px; left: 0px;"></div>');
                var maskHeight = $j(document).height();
                var maskWidth = $j(window).width();

                $j('#shadow').css({ 'width': maskWidth, 'height': maskHeight });
                $j('#shadow').fadeIn(500);
                $j('#shadow').fadeTo("slow", 0.8);
                $j('div.#c1_setLocationContainer').fadeIn(1000);
            },


            // Hides the 'set your location' box
            hideLocation: function () {
				$j('div.#c1_setLocationContainer').hide();
				$j('#shadow').hide();
            },

            // Checks to see if a location has already been set by a user.
            checkLocation: function () {
                var loc = C1.readCookie(cityCookie);
                var state = C1.readCookie(stateCookie);
                $j('#yourLocation').html(loc + ', ' + state);
                displayLocationPanel(loc == null || loc == '');
            },

            // Sets the selected state object.
            setState: function (state) {

                $j('#cityList').html('');

                if (typeof (state) == 'string') {
                    state = lookupState(state);
                }
                C1.selectedState = state;
                $j('#selectedState').addClass("nobr");
                $j('#selectedStateFooter2').html(C1.selectedState.StateName);
				$j('#selectedStateFooter').html(C1.selectedState.StateName);
				$j('#selectedState').html(C1.selectedState.StateName);
                $j('#cityImage').attr('src', C1.selectedState.ImageUrl);
                $j('#stateImage').attr('src', C1.selectedState.ImageUrl);
                $j('#serviceAreaTable').html('');
                retrieveCities(function (acc, city) {
                    //acc += '<a onmouseover="javascript:C1.func.displayStar(' + city.StarCoordinates.X + ',' + city.StarCoordinates.Y + ')" onmouseout="javacsript:C1.func.hideStar()" href="javascript:C1.func.setCity(\'' + city.Name + '\')">' + city.Name + '</a><br />';
                    acc += '<div class="setLocationSystem" onclick="javascript:C1.func.setLocation();" onmouseover="javascript:C1.func.setCity(\'' + city.Name + '\')"><a class="systemLink" href="javascript:C1.func.setLocation();" ><span style="color: #FFFFFF !important;">' + city.Name + '</span></a></div>';
                    return acc;
                });

                C1.func.togglePanels(1);
            },

            // Sets the selected state via a dropdown list.
            setStateFromList: function (list) { 
				var state = list.value;
                C1.func.setState(state);
            },

            // Sets the selcted city via a dropdown list.
            setCityFromList: function (list) {
				var city = list.value;
                C1.func.setCity(city);
                C1.func.setLocation();
            },

            // Sets the selected city and displays the 'areas serviced' panel.
            setCity: function (cityName) {
                //if ((C1.selectedCity == null) || (C1.selectedCity.Name != cityName)) {

                    //C1.func.hideStar();
                    $j('#selectedCity').html(cityName + ', ' + C1.selectedState.Abbreviation);
					var city = lookupCity(cityName);
					
                    C1.selectedCity = city;

                    $j('#serviceAreaTable').html('Loading...');
                    displayAreas();
                    //C1.func.displayStar(city.StarCoordinates.X, city.StarCoordinates.Y);
                //}
            },

            // Completes the 'set your location' functionality. 
            setLocation: function () {
                var days = 14;
                var loc = C1.selectedCity.Name + ', ' + C1.selectedState.Abbreviation;
                $j('#yourLocation').html(loc);
                if ($j('#saveLocationFlag:checked') == true) {
                    days = 365;
                }
                C1.setCookie(cityCookie, C1.selectedCity.Name, days);
                C1.setCookie(stateCookie, C1.selectedState.Abbreviation, days);
                C1.setCookie(systemIdCookie, C1.selectedCity.SystemID, days);
                //displayLocationPanel(false);
                //C1.func.hideLocation();
                document.location.reload(true);
            },

            // Completes the 'clear your location' functionality. 
            clearLocation: function () {
                C1.clearCookie(oldSystemCookie);
                C1.clearCookie(locationCookie);
                C1.clearCookie(cityCookie);
                C1.clearCookie(stateCookie);
                C1.clearCookie(systemIdCookie);
                //displayLocationPanel(false);
                //C1.func.hideLocation();
                document.location.reload(true);
            },

            // Displays a 'set your location' panel.
            togglePanels: function (index) {
                $j('.c1_locationPanel').hide();
                if (index == null) {
                    index = 0;
                }
                $j('#c1_stepNum').html(index + 1 + '');
                var id = index + 1;
                $j('#c1_locationPanel' + id).show();
            },

            // Populates the statesServiced array.
            initStates: function () {
                getStates();
            }
        },

        // Extracts an element from its current position and moves it to the bottom of the form.
        moveElem: function (elemId) {
            //var elem = $j(elemId).remove();
            //var parent = $j(document.body).childElements()[0];
            //$j(parent).insert(elem, {position: 'bottom'});
        },

        // Sets a cookie. Taken from quirksmode.org.
        setCookie: function (name, value, daysTilExpires, path) {
            if (path == null) {
                path = '/';
            }
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * 24 * daysTilExpires);
            document.cookie = name + "=" + value + ";expires=" + expire.toGMTString() + '; path=' + path;
        },

        // Reads a cookie. Taken from quirksmode.org.
        readCookie: function (c_name) {
			if (document.cookie.length>0)
			  {
			  c_start=document.cookie.indexOf(c_name + "=");
			  if (c_start!=-1)
				{
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
				}
			  }
			return "";
            //var nameEQ = name + "=";
            //var ca = document.cookie.split(';');
            //for (var i = 0; i < ca.length; i++) {
            //    var c = ca[i];
            //    while (c.charAt(0) == ' ') {
            //        c = c.substring(1, c.length);
            //    }
            //   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            //}
            //return null;
        },

        // Erases a cookie. Taken from quirksmode.org
        clearCookie: function (name) {
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() - 1);
            document.cookie = name + "=;expires=" + expire.toGMTString() + '; path=/';
            document.cookie = name + "=;expires=" + expire.toGMTString() + '; path=/;domain=cableone.net';
            document.cookie = name + "=;expires=" + expire.toGMTString() + '; path=/;domain=www.cableone.net';
            //C1.setCookie(name, "", -1);
            //alert('Information has been cleared!');
        },

        // Adds a function to the initialization queue.
        addInit: function (func) {
            startup[startup.length] = func;
        },

        // Performs any functions that should be run at startup time.
        init: function () {
            for (var i = 0; i < startup.length; i++) {
                startup[i]();
            }
        }
    };
    return pub;
} ();