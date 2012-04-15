/*
 * Another In Place Editor - a jQuery edit in place plugin
 *
 * Copyright (c) 2009 Dave Hauenstein
 *
 * License:
 * This source file is subject to the BSD license bundled with this package.
 * Available online: {@link http://www.opensource.org/licenses/bsd-license.php}
 * If you did not receive a copy of the license, and are unable to obtain it,
 * email davehauenstein@gmail.com,
 * and I will send you a copy.
 *
 * Project home:
 * http://code.google.com/p/jquery-in-place-editor/
 *
 */
$(document).ready(function(){
	
	// All examples use the commit to function interface for ease of demonstration.
	// If you want to try it against a server, just comment the callback: and 
	// uncomment the url: lines.
	
	// The most basic form of using the inPlaceEditor
	$("#editme1").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		text_size: "26",
		
	});

	// This example shows how to call the function and display a textarea
	// instead of a regular text box. A few other options are set as well,
	// including an image saving icon, rows and columns for the textarea,
	// and a different rollover color.
	$("#editme2").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		text_size: "30",
		
	});

	// A select input field so we can limit our options
	$("#editme3").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
	
	});

	// Using a callback function to update 2 divs
	$("#editme4").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
	
	});
	
	$("#editme5").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
	
	});
	
		$("#editme6").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme7").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme8").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme9").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme10").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
	
		$("#editme11").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme12").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
	
		$("#editme13").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme14").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme15").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme16").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme17").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme18").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme19").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	
		$("#editme20").editInPlace({
		callback: function(unused, enteredText) { return enteredText; },
		// url: "./server.php",
		use_html: "true",
		field_type: "textarea",
		textarea_rows: "15",
		textarea_cols: "60",
		
	});
	// If you need to remove an already bound editor you can call

	// > $(selectorForEditors).unbind('.editInPlace')

	// Which will remove all events that this editor has bound. You need to make sure however that the editor is 'closed' when you call this.
	
});