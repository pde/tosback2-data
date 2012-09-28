<!--
	// Search Widget implementation.
	var SearchWidget = {
		checkin: null,
		checkout: null,
		// Reference to YUI used by search widget.
		YAHOO: null,
		yuiLocale: null,

		// List of IDs within search widget.
		// If any of these IDs conflict with IDs already on your page. Change them below and within the form.
		CHECKIN_ID: "check-in",
		CHECKIN_ICON_ID: "checkinIcon",
		CHECKOUT_ID: "check-out",
		CHECKOUT_ICON_ID: "checkoutIcon",
		RESET_DATES_ID: "reset-dates",
		TARGET_ID: "targetId",
		DESTINATION_ID: "destination",
		PREDEFINED_DESTINATION_ID: "predefinedDestination",
		PREDEFINED_TARGETID_ID: "predefinedTargetId",
		ROOMS_ID: "rooms",
		ADULTS_ID: "adults",
		CHILDREN_ID: "children",
		ADULTS_LABEL_ID: "adults_label",
		CHILDREN_LABEL_ID: "children_label",
		SEARCH_ID: "search-btn",
		HOTEL_CHAINS_ID: "hotel-chains",
		STAR_CATEGORY_ID: "star-rating",
		ROOMS_MAX_COUNT: "maxcount",

		// Current locale code.
		localeCode: "en",

		// Fields to store calendar instances.
		checkinCalendar: null,
		checkoutCalendar: null,

		// Fields to store calendar dialogs.
		checkinCalendarDialog: null,
		checkoutCalendarDialog: null,

		today: new Date(),
		checkInDateSelected: new Date(),
		checkOutDateSelected: new Date(),

		// Locale object loaded from JS file.
		locale: null,

		// Main initialization function. Should be called once. Argument reference to YUI main object.
		init: function (YAHOO_LIBRARY_REF) {
			var self = this;
			self.YAHOO = YAHOO_LIBRARY_REF;
			self.loadLocaleFromTemplates();
			self.decorateDatelessCheckbox();
			self.setInitialCheckinCheckoutDates();
			self.decorateCalendars();
			self.decorateDates();
			self.decoratePredefinedDestinations();
			self.decorateRooms();
			self.decorateSearch();
		},

		// Applies current calendar locale.
		loadLocaleFromTemplates: function () {
			var self = this;
			if (typeof yuiLocales == "undefined") {
				// This inserts the default locale if one is not specified.
				self.YAHOO.log("locale was not loaded. Possible reason - incorrect home url in CP", "error");
				self.locale = {};
				self.locale.calendarLocale = self.YAHOO.util.DateLocale;
			} else {
				self.locale = yuiLocales;
				var dateLocale = null;
				var loadLocale = function (postfix) {
					if (!dateLocale) {
						self.localeCode = "en" + postfix;
						dateLocale = yuiLocales.dateLocales[self.localeCode];
						if (!dateLocale) dateLocale = yuiLocales.calendarLocales[self.localeCode];
					}
				};
				// This checks for variations on the new locale (for example fr could be fr_CA).
				loadLocale(""); loadLocale("_SA"); loadLocale("_CA"); loadLocale("_PL"); loadLocale("_TW");

				var originDateLocale = self.YAHOO.lang.merge(dateLocale);
				self.locale.calendarLocale = self.locale.calendarLocales[self.localeCode];
				// Required for some languages like Hindi.
				self.locale.calendarLocale["DATE_RANGE_DELIMITER"] = "--";
				if (!self.locale.calendarLocale.YEAR_OFFSET) self.locale.calendarLocale.YEAR_OFFSET = 0;



				self.YAHOO.util.DateLocale[self.localeCode] = self.YAHOO.lang.merge(self.YAHOO.util.DateLocale, dateLocale);
				self.YAHOO.util.DateLocale[self.localeCode + "_origin"] = self.YAHOO.lang.merge(self.YAHOO.util.DateLocale, originDateLocale);
			}
		},

		// Save entered dates in case of switching to dateless mode.
		updateSavedDates: function () {
			var self = this;
			self.checkin = self.YAHOO.util.Dom.get(self.CHECKIN_ID).value;
			self.checkout = self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value;
		},

		// Restore saved dates in case of switching back to calendar mode.
		restoreSavedDates: function () {
			var self = this;
			self.YAHOO.util.Dom.get(self.CHECKIN_ID).value = self.checkin;
			self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = self.checkout;
		},

		// Set checkin and checkout 'disabled' property.
		setCheckinCheckoutDisable: function (value) {
			var self = this;
			self.YAHOO.util.Dom.get(self.CHECKIN_ID).disabled = self.YAHOO.util.Dom.get(self.CHECKOUT_ID).disabled = value;
		},

		// Set handler for dateless checkbox.
		decorateDatelessCheckbox: function () {
			var self = this;
			var datelessCheckBox = self.YAHOO.util.Dom.get(self.RESET_DATES_ID);
			if (datelessCheckBox) {
				self.updateSavedDates();
				self.YAHOO.util.Event.on(datelessCheckBox, "click", function () {
					if (datelessCheckBox.checked) { // if dateless
						self.updateSavedDates(); // save dates entered
						// clear fields
						self.YAHOO.util.Dom.get(self.CHECKIN_ID).value = self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = "";
						// disable fields
						self.setCheckinCheckoutDisable(true);
					} else {
						// if calendar mode - enable fields and restore dates
						self.setCheckinCheckoutDisable(false);
						self.restoreSavedDates();
					}
				})
			}
		},

		// Utility functions - adds day to date.
		addDays: function (date, days) {
			var result = new Date();
			result.setTime(date.getTime() + (1000 * 3600 * 24) * days);
			return result;
		},

		// Utility function - formats date according to current locale.
		formatDate: function (date) {
			var self = this;
			return self.YAHOO.util.Date.format(date, { format: "%x" }, self.localeCode);
		},

		// Utility function - parses date according current locale.
		parseDate: function (sDate) {
			var self = this;
			var aDate = sDate.split(self.locale.calendarLocale.DATE_FIELD_DELIMITER);
			var rArray;

			if (aDate.length == 2) {
				rArray = [aDate[self.locale.calendarLocale.MD_MONTH_POSITION - 1], aDate[self.locale.calendarLocale.MD_DAY_POSITION - 1]];
				rArray.type = self.YAHOO.widget.Calendar.MONTH_DAY;
			} else {
				rArray = [aDate[self.locale.calendarLocale.MDY_YEAR_POSITION - 1] - self.locale.calendarLocale.YEAR_OFFSET, aDate[self.locale.calendarLocale.MDY_MONTH_POSITION - 1], aDate[self.locale.calendarLocale.MDY_DAY_POSITION - 1]];
				rArray.type = self.YAHOO.widget.Calendar.DATE;
			}

			for (var i = 0; i < rArray.length; i++) {
				rArray[i] = parseInt(rArray[i], 10);
			}
			return self.YAHOO.widget.DateMath.getDate(rArray[0], (rArray[1] - 1), rArray[2])
		},

		// Utility function - formats date and set it to calendar.
		setCalendarDate: function (calendar, date) {
			var self = this;
			if (calendar) calendar.select(self.formatDate(date));
		},

		// Calculate and set initial dates.
		setInitialCheckinCheckoutDates: function () {
			var self = this;
			// today + 3 days
			self.checkInDateSelected = self.addDays(self.today, 3);
			// today + 5 days
			self.checkOutDateSelected = self.addDays(self.checkInDateSelected, 2);
			// set values to inputs
			self.YAHOO.util.Dom.get(self.CHECKIN_ID).value = self.formatDate(self.checkInDateSelected);
			self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = self.formatDate(self.checkOutDateSelected);
		},

		// Set targetId and destination to specify search location.
		setTargetData: function (destination, targetId) {
			var self = this;
			self.YAHOO.util.Dom.get(self.TARGET_ID).value = targetId;
			self.YAHOO.util.Dom.get(self.DESTINATION_ID).value = destination;
		},

		// Set event handlers for selectors of predefined destinations.
		decoratePredefinedDestinations: function () {
			var self = this;
			// selectors with predefined destinations
			var radios = self.YAHOO.util.Selector.query('input[name^=predefined]');
			for (var index = 0; index < radios.length; index++) {
				// on click for any
				self.YAHOO.util.Event.on(radios[index], "click", function (e, radio) {
					// set it to checked
					radio.checked = true;
					// set location data
					self.setTargetData(radio.value, radio.id);
				}, radios[index]);
			}

			var destination = self.YAHOO.util.Dom.get(self.DESTINATION_ID);

			// if users changes destination
			self.YAHOO.util.Event.on(destination, "change", function (e) {
				// set destination text, but clear targetId (it will calculated after redirect)
				self.setTargetData(destination.value, "");
				// check all radios for predefined destination
				for (var i = 0; i < radios.length; i++) {
					// if the text of radio is different from what was entered by the user - uncheck it
					if (radios[i].value != destination.value) {
						if (radios[i].checked) radios[i].checked = false;
					} else { // else set correct targetId (from predefined data)
						radios[i].checked = true;
						self.setTargetData(radios[i].value, radios[i].id);
						break;
					}
				}
				// if pre-filled data is used for the presets, use the destinations entered by user
				if (self.YAHOO.util.Dom.get(self.PREDEFINED_DESTINATION_ID) &&
							self.YAHOO.util.Dom.get(self.PREDEFINED_DESTINATION_ID) == destination.value) {
					// set targetId to pre-filled destination
					self.setTargetData(self.YAHOO.util.Dom.get(self.PREDEFINED_DESTINATION_ID).value,
												self.YAHOO.util.Dom.get(self.PREDEFINED_TARGETID_ID).value);
				}

			});
		},

		// Set event handler for search button.
		decorateSearch: function () {
			var self = this;

			// start search on click
			self.YAHOO.util.Event.on(self.YAHOO.util.Dom.get(self.SEARCH_ID), "click", function () {
				var data = {}; // data for redirect (will converted to URL parameters)
				var targetId = self.YAHOO.util.Dom.get(self.TARGET_ID);
				// target id looks like XXXXX|YYYY|ZZZ, leave only XXXXX|YYYY
				if (targetId.value) data["targetId"] = targetId.value.split("|")[0] + "|" + targetId.value.split("|")[1];

				// collect data of entered destination
				var destination = self.YAHOO.util.Dom.get(self.DESTINATION_ID);
				if (destination.value) data["destination"] = destination.value;

				// if dateless mode is enabled - pass params so server knows about it
				if (self.YAHOO.util.Dom.get(self.RESET_DATES_ID).checked) {
					data["datelessValidating"] = "true";
					data["checkin"] = data["checkout"] = "null";
					data["dateless"] = "true";
				} else { // else get dates entered by user
					//  return
					var checkin = self.parseDate(self.YAHOO.util.Dom.get(self.CHECKIN_ID).value);
					var checkout = self.parseDate(self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value);
					data["checkin"] = self.YAHOO.util.Date.format(checkin, { format: "%x" }, self.localeCode + "_origin");
					data["checkout"] = self.YAHOO.util.Date.format(checkout, { format: "%x" }, self.localeCode + "_origin");
				}

				var rooms = self.YAHOO.util.Dom.get(self.ROOMS_ID);
				var children = self.YAHOO.util.Dom.get(self.CHILDREN_ID);
				data["roomsCount"] = rooms.value;
				if (rooms.value == 1) {
					// if only one room selected - get the number of adults
					data["rooms[0].adultsCount"] = self.YAHOO.util.Dom.get(self.ADULTS_ID).value;
					data["rooms[0].childrenCount"] = children.value;
					// and set age of all children to 7.
					for (var q = 0; q < children.value; q++) {
						data["rooms[0].children[" + q + "].age"] = "7";
					}
				} else {
					// if more than 1 room is selected
					for (var i = 0; i < rooms.value; i++) {
						// set adults = 2 and children = 0 for every room
						data["rooms[" + i + "].adultsCount"] = "2";
						data["rooms[" + i + "].childrenCount"] = "0";
					}
				}

				// if the hotel chain or star ratings filter is set - add it to params
				var chains = self.YAHOO.util.Dom.get(self.HOTEL_CHAINS_ID);
				if (chains.selectedIndex) data["filter.hotelName"] = chains.value;

				var stars = self.YAHOO.util.Dom.get(self.STAR_CATEGORY_ID);
				if (stars.selectedIndex) data["filter.starRates"] = stars.value;

				// set language and currency
				data["lang"] = "en";
				data["currency"] = "USD";

				// prepare URL for redirect
				var url;
				if (rooms.value != self.ROOMS_MAX_COUNT) {
				    url = "http://hotels.united.com/templates/362349/searchWidget?autosearch=true";
				} else {
				    url = "http://hotels.united.com/templates/362349/hotel/groupbooking?autosearch=true";
				}

				for (var key in data) {
					url += ("&" + key + "=" + encodeURIComponent(data[key]));
				}
	            // WI 50134 - White Label Hotel - Home Page > Hotel tab/widget - Search button should not open in new browser window
	            // Results should be displayed in same window.
				window.open(url, '_self');
			});
		},

		// Set event handlers for checkin and checkout checkboxes.
		decorateDates: function () {
			function isValidDate(d) {
				if (Object.prototype.toString.call(d) !== "[object Date]")
					return false;
				return !isNaN(d.getTime());
			}

			var self = this;
			var checkin = self.YAHOO.util.Dom.get(self.CHECKIN_ID);
			// checkin date changes by user (without calendar)
			self.YAHOO.util.Event.on(checkin, "change", function (e) {
				var date = self.parseDate(checkin.value); // try to parse it
				if (isValidDate(date) && date != self.checkInDateSelected) {
					// if the format is correct and has changed - update the calendar with the date entered
					self.checkInDateSelected = date;
					self.setCalendarDate(self.checkinCalendar, date);
					// if the checkout date is before the checkin - correct it
					if (self.addDays(self.checkOutDateSelected, -1) < self.checkInDateSelected) {
						// new checkout = checkin plus 1 day
						self.checkOutDateSelected = self.addDays(self.checkInDateSelected, 1);
						// update the calendar and text field
						self.setCalendarDate(self.checkoutCalendar, self.checkOutDateSelected);
						self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = self.formatDate(self.checkOutDateSelected);
					}
				}
			});

			var checkout = self.YAHOO.util.Dom.get(self.CHECKOUT_ID);
			// if the checkout changed
			self.YAHOO.util.Event.on(checkout, "change", function (e) {
				var date = self.parseDate(checkout.value);
				if (isValidDate(date) && date != self.checkOutDateSelected) {
					// if the format is correct and has changed - update the calendar with the date entered
					self.checkOutDateSelected = date;
					self.setCalendarDate(self.checkoutCalendar, date);
					// if the checkout date is before the checkin - correct it
					if (self.addDays(self.checkOutDateSelected, -1) < self.checkInDateSelected) {
						// new checkout = checkin minus 1 day
						self.checkInDateSelected = self.addDays(self.checkOutDateSelected, -1);
						self.setCalendarDate(self.checkinCalendar, self.checkInDateSelected);
						self.YAHOO.util.Dom.get(self.CHECKIN_ID).value = self.formatDate(self.checkInDateSelected);
					}
				}
			})
		},

		// Set event handlers for room selectors.
		decorateRooms: function () {
			var self = this;
			var rooms = self.YAHOO.util.Dom.get(self.ROOMS_ID);
			var adults = self.YAHOO.util.Dom.get(self.ADULTS_ID);
			var children = self.YAHOO.util.Dom.get(self.CHILDREN_ID);
			var adultsLabel = self.YAHOO.util.Dom.get(self.ADULTS_LABEL_ID);
			var childrenLabel = self.YAHOO.util.Dom.get(self.CHILDREN_LABEL_ID);

			// number of rooms number change
			self.YAHOO.util.Event.on(rooms, "change", function (e) {
				// if zero(0) - hide adults and children dropdowns, else show them
				var display = rooms.value == 1 ? "block" : "none";
				self.YAHOO.util.Dom.setStyle(adults, "display", display);
				self.YAHOO.util.Dom.setStyle(children, "display", display);
				self.YAHOO.util.Dom.setStyle(adultsLabel, "display", display);
				self.YAHOO.util.Dom.setStyle(childrenLabel, "display", display);
			});
		},

		// Set event handlers for calendars.
		decorateCalendars: function () {
			var self = this;
			// function to initilize and show checkin calendar
			var showCheckInCalendar = function () {

				var checkIn = self.YAHOO.util.Dom.get(self.CHECKIN_ID);
				var checkInIcon = self.YAHOO.util.Dom.get(self.CHECKIN_ICON_ID);

				self.showCalendar(
				// getter and setter for calendar dialog
						self.CHECKIN_ID,
						{
							get: function () { return self.checkinCalendarDialog; },
							set: function (value) { self.checkinCalendarDialog = value; }
						},
				// getter and setter for calendar object
						{
						get: function () { return self.checkinCalendar; },
						set: function (value) { self.checkinCalendar = value; }
					},
				// if user clicks any place except calendar - the calendar closes
						function (el) {
							return el != checkIn && !self.YAHOO.util.Dom.isAncestor(checkIn, el) && el != checkInIcon && !self.YAHOO.util.Dom.isAncestor(checkInIcon, el);
						},
				// user selects new date in calendar
						function (date) {
							self.checkInDateSelected = date;
							self.YAHOO.util.Dom.get(self.CHECKIN_ID).value = self.formatDate(date);

							// adjustment if checkout date is incorrect
							if (self.addDays(self.checkOutDateSelected, -1) < self.checkInDateSelected) {
								self.checkOutDateSelected = self.addDays(self.checkInDateSelected, 1);
								self.setCalendarDate(self.checkoutCalendar, self.checkOutDateSelected);
								self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = self.formatDate(self.checkOutDateSelected);
							}

							// then, adjust minimum date of checkout calendar according new checkin date
							if (self.checkoutCalendar)
								self.checkoutCalendar.cfg.setProperty("mindate", self.addDays(self.checkInDateSelected, 1));

						},
						{
							iframe: false,          // Turn iframe off, since container has iframe support.
							hide_blank_weeks: true,
							mindate: self.today,
							start_weekday: 0,
							initDate: function () { return self.checkInDateSelected; }
						}
				);
			};
			// open checkin calendar on click:

			self.YAHOO.util.Event.on(self.YAHOO.util.Dom.get(self.CHECKIN_ID), "focus", function () {
				showCheckInCalendar();
			});

			self.YAHOO.util.Event.on(self.YAHOO.util.Dom.get(self.CHECKIN_ICON_ID), "click", function () {
				if (!self.YAHOO.util.Dom.get(self.CHECKIN_ID).disabled)
					showCheckInCalendar();
			});


			// see comment for checkin calenar, it is 50% the same.
			var showCheckOutCalendar = function () {

				var checkOut = self.YAHOO.util.Dom.get(self.CHECKOUT_ID);
				var checkOutIcon = self.YAHOO.util.Dom.get(self.CHECKOUT_ICON_ID);

				self.showCalendar(
						self.CHECKOUT_ID,
						{
							get: function () { return self.checkoutCalendarDialog; },
							set: function (value) { self.checkoutCalendarDialog = value; }
						},
						{
							get: function () { return self.checkoutCalendar; },
							set: function (value) { self.checkoutCalendar = value; }
						},
						function (el) {
							return el != checkOut && !self.YAHOO.util.Dom.isAncestor(checkOut, el) && el != checkOutIcon && !self.YAHOO.util.Dom.isAncestor(checkOutIcon, el);
						},
						function (date) {
							self.YAHOO.util.Dom.get(self.CHECKOUT_ID).value = self.formatDate(date);
						},
						{
							iframe: false,          // Turn iframe off, since container has iframe support.
							hide_blank_weeks: true,
							mindate: self.addDays(self.checkInDateSelected, 1),
							start_weekday: 0,
							initDate: function () { return self.checkOutDateSelected; }
						}
				);
			};

			self.YAHOO.util.Event.on(self.YAHOO.util.Dom.get(self.CHECKOUT_ID), "focus", function () {
				showCheckOutCalendar();
			});

			self.YAHOO.util.Event.on(self.YAHOO.util.Dom.get(self.CHECKOUT_ICON_ID), "click", function () {
				if (!self.YAHOO.util.Dom.get(self.CHECKOUT_ID).disabled)
					showCheckOutCalendar();
			});

		},

		// Create calendar.
		// @param containerId id of DOM container for calendar.
		// @param dialogStore get/set object for dialog.
		// @param calendarStore get/set object for calendar.
		// @param shouldHide callback to get info about closing.
		// @param changeCallback callback to call on date selection.
		// @param options calendar init options (according YAHOO UI Calendar widget).
		showCalendar: function (containerId, dialogStore, calendarStore, shouldHide, changeCallback, options) {
			var self = this;
			// Default CSS style to avoid black text for todays date.
			self.YAHOO.widget.Calendar.STYLES.CSS_CELL_TODAY = "";

			// if no dialog yet - create it.
			if (!dialogStore.get()) {
				dialogStore.set(new self.YAHOO.widget.Dialog(containerId + "Container", {
					visible: false,
					context: ["show", "tl", "bl"],
					buttons: [],
					draggable: false,
					close: false
				}));

				// hide dialog if we click anywhere in the document other than the calendar
				self.YAHOO.util.Event.on(document, "click", function (e) {
					var el = self.YAHOO.util.Event.getTarget(e);
					var dialogEl = dialogStore.get().element;                            // call to callback for info
					if (el != dialogEl && !self.YAHOO.util.Dom.isAncestor(dialogEl, el) && shouldHide(el)) {
						dialogStore.get().hide();
					}
				});

				// inject DOM element for calendar.
				dialogStore.get().setBody('<div id="' + containerId + 'ContainerCalendar"></div>');
				dialogStore.get().render(self.YAHOO.util.Dom.get(containerId + 'DialogContainer'));

				dialogStore.get().showEvent.subscribe(function () {
					if (self.YAHOO.env.ua.ie) {
						// Since we're hiding the table using yui-overlay-hidden, we
						// want to let the dialog know that the content size has changed, when shown
						// .
						dialogStore.get().fireEvent("changeContent");
					}
				});
			}

			// if there is no calendar yet - create it.
			if (!calendarStore.get()) {

				calendarStore.set(new self.YAHOO.widget.Calendar(containerId + 'ContainerCalendar', options));
				// set week layout based on selected locale.
				for (var key in self.locale.calendarLocale) {
					if (key != 'START_WEEKDAY')
						calendarStore.get().cfg.setProperty(key, self.locale.calendarLocale[key]);
				}

				calendarStore.get().render();

				// set handler for date selection to call provided callback.
				calendarStore.get().selectEvent.subscribe(function () {
					if (calendarStore.get().getSelectedDates().length > 0) {
						var selDate = calendarStore.get().getSelectedDates()[0];
						if (changeCallback) changeCallback(selDate);
					} else {
						if (changeCallback) changeCallback(null);
					}
					dialogStore.get().hide();
				});

				calendarStore.get().renderEvent.subscribe(function () {
					// tell the dialog its' contents have changed, which allows the
					// container to redraw the underlay (for IE6/Safari2)
					calendarStore.get().fireEvent("changeContent");
				});
				if (options.initDate) self.setCalendarDate(calendarStore.get(), options.initDate());
			}

			var selectedDate = calendarStore.get().getSelectedDates();

			if (selectedDate.length > 0) {
				// Set the pagedate to show the selected date if it exists
				calendarStore.get().cfg.setProperty("pagedate", selectedDate[0]);
				calendarStore.get().render();
			}

			dialogStore.get().show();
		}
	};

	// Search widget uses the YAHOO UI. In some rare cases it can conflict with another version of YUI. This helps elminate that problem.
	// In such case you can do following:
	// 1) Try to remove searchWidgetYahooUIloader and replace it with 'SearchWidget.init(YAHOO);' to force using your version of YUI.
	// 2) Try to use YAHOO.util.YUILoader with sandbox (see documentation for YUILoader).
	// Initiate and configure YUI Loader:
	var searchWidgetYahooUIloader = new YAHOO.util.YUILoader({
		// The YUI Loader will automatically identify any additional dependencies required for the specified components.
		// .
		// DataSource required for correct date formating.
		require: ["event", "calendar", "container", "datasource", "selector"],

		// Configures YUI Loader to pull in optional dependencies. 
		// For example, animation is an optional dependency for the slider.
		loadOptional: true,

		// This function is called when all script/css resources have been loaded.
		onSuccess: function () {
			// initalize search widget with loaded YUI reference.
			SearchWidget.init(YAHOO);
		},

		// Configure the Get utility to timeout after 5 seconds for any given node insert
		timeout: 5000,

		// Combine YUI files into a single request (per file type) by using the Yahoo! CDN combo service.
		combine: false,
		// Load compressed version.
		filter: 'min',

		base: 'https://www.travelnow.com/templates/362349/static/41/default/js/yui2/'
		//    base: 'https://ajax.googleapis.com/ajax/libs/yui/2.8.1/build/'
	});

	// Load YUI and start widget.
	if (typeof YAHOO == "undefined" || typeof YAHOO.widget == "undefined" || YAHOO.widget.Calendar == "undefined"
			|| typeof YAHOO.widget.Dialog == "undefined" || typeof YAHOO.util.Date == "undefined")
		searchWidgetYahooUIloader.insert();
	else
		SearchWidget.init(YAHOO);

//-->