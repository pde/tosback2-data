/**
 * @fileoverview Zapatec Calendar widget. Include this file in your HTML page.
 * Includes Zapatec Calendar modules: calendar-core.js, calendar-date-core.js, calendar-setup.js.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/**
 * @private Get path to this script
 */
if (!window.Zapatec || (Zapatec && !Zapatec.include)) {
	alert("You need to include zapatec.js file!");
} else {
	//Zapatec.calendarPath = Zapatec.getPath();
	Zapatec.calendarPath = "/zp/zpcal/src/";
	
	// Include required scripts
	Zapatec.Transport.include(Zapatec.calendarPath + 'calendar-core.js');
	Zapatec.Transport.include(Zapatec.calendarPath + 'calendar-date-core.js');
	Zapatec.Transport.include(Zapatec.calendarPath + 'calendar-setup.js');
}

window.calendar = null;		/**< global object that remembers the calendar */

// initialize the preferences object;
// embed it in a try/catch so we don't have any surprises
try {
	Zapatec.Calendar.loadPrefs();
} catch(e) {
	//alert("ERROR: " + e);
};
Zapatec.Utils.addEvent(window, "load", Zapatec.Utils.checkActivation);
