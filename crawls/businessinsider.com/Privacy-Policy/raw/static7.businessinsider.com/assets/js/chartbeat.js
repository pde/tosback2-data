/*
 * Chartbeat.
 * This file depends on the Chartbeat API JS,
 * which is currently http://static.chartbeat.com/js/sitewidgets/sitetotal.js
 */
new SiteTotal(
	{
		'api': '/partner/chartbeat/widget',
		'color': '#1d637d', // Optional
		'disableStyles': false, // Optional
		'element': 'chartbeat_widget',
		'label': 'The Engage-O-Meter', // Optional
		'width': 300, // Optional
		'refreshInterval': 90000  // Optional, milliseconds
	}
);
