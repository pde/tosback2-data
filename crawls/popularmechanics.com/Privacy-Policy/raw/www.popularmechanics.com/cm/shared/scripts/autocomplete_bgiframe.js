/**
 * AutoComplete Field - JavaScript Code
 *
 * This is a sample source code provided by fromvega.
 * Search for the complete article at http://www.fromvega.com
 *
 * Enjoy!
 *
 * @author fromvega
 *
 */

 /*
 Version 4 ( June 23, 2008 )
 */
 
// global variables
var acListTotal   =  0;
var acListCurrent = -1;
var acDelay		  = 500;
var acURL		  = null;
var acSearchId	  = null;
var acResultsId	  = null;
var acSearchField = null;
var acResultsDiv  = null;

function setAutoComplete(field_id, results_id, get_url){

	// initialize vars
	acSearchId  = "#" + field_id;
	acResultsId = "#" + results_id;
	acURL 		= get_url;
	$("body > " + acResultsId).remove();
	// create the results div
	$("body").append('<div id="' + results_id + '"></div>');

	// register mostly used vars
	acSearchField	= $(acSearchId);
	acResultsDiv	= $(acResultsId);

	// reposition div
	repositionResultsDiv();
	
	// on blur listener
	acSearchField.blur(function(){ setTimeout("clearAutoComplete()", 200) });

	// on key up listener
	acSearchField.keyup(function (e) {

		// get keyCode (window.event is for IE)
		var keyCode = e.keyCode || window.event.keyCode;
		var lastVal = acSearchField.val();

		// check an treat up and down arrows
		if(updownArrow(keyCode)){
			return;
		}

		// check for an ESC
		if( keyCode == 27){
			clearAutoComplete();
			return;
		}

		// if is text, call with delay
		setTimeout(function () {autoComplete(lastVal)}, acDelay);
	});
}

// treat the auto-complete action (delayed function)
function autoComplete(lastValue)
{
	// get the field value
	var part = acSearchField.val();

	// if it's empty clear the resuts box and return
	if(part == ''){
		clearAutoComplete();
		return;
	}

	// if it's equal the value from the time of the call, allow
	if(lastValue != part){
		return;
	}
	
	// get remote data as JSON
	$.get(acURL + part, function(data){
		// get the total of results
		
		var json = eval("(" + data + ")");		
		json = json.ac.q;
			
		var ansLength = acListTotal = json.length;

		// if there are results populate the results div
		
		if(ansLength > 0){

			var newData = '';
			
			if(ansLength < 6) { // less than 5 Results.
				// create a div for each result
				for(i=0; i < ansLength; i++) {
				newData += '<div class="unselected">' + json[i] + '</div>';
				}
	
				// update the results div
				acResultsDiv.html(newData);
				acResultsDiv.bgiframe();
				acResultsDiv.css("display","block");
				
				// for all divs in results
				var divs = $(acResultsId + " > div");
			
				// on mouse over clean previous selected and set a new one
				divs.mouseover( function() {
					divs.each(function(){ this.className = "unselected"; });
					this.className = "selected";
				})
			
				// on click copy the result text to the search field and hide
				divs.click( function() {
					acSearchField.val(this.childNodes[0].nodeValue);
					add_autocomplete_tracker(); //Add tracking element before submitting
					acSearchField.parents("form").submit();					
					clearAutoComplete();
				});
			} else {
				// create a div for each result
				for(i=0; i < 6; i++) { // Limit to 5 Results.
					newData += '<div class="unselected">' + json[i] + '</div>';
				}
	
				// update the results div
				acResultsDiv.html(newData);
				acResultsDiv.bgiframe();
				acResultsDiv.css("display","block");
				
				// for all divs in results
				var divs = $(acResultsId + " > div");
			
				// on mouse over clean previous selected and set a new one
				divs.mouseover( function() {
					divs.each(function(){ this.className = "unselected"; });
					this.className = "selected";
				})
			
				// on click copy the result text to the search field and hide
				divs.click( function() {
					acSearchField.val(this.childNodes[0].nodeValue);
					add_autocomplete_tracker(); //Add tracking element before submitting
					acSearchField.parents("form").submit();
					clearAutoComplete();
				});
			}
		} else {
			clearAutoComplete();
		}
		
	});
}

// clear auto complete box
function clearAutoComplete()
{
	acResultsDiv.html('');
	acResultsDiv.css("display","none");
}

// reposition the results div accordingly to the search field
function repositionResultsDiv()
{
	// get the field position
	var sf_pos    = acSearchField.offset();
	var sf_top    = sf_pos.top;
	var sf_left   = sf_pos.left;

	// get the field size
	var sf_height = acSearchField.height();
	var sf_padding_left = parseInt(acSearchField.css('padding-left'),10);
	var sf_padding_right = parseInt(acSearchField.css('padding-right'),10);
	var sf_padding_top = parseInt(acSearchField.css('padding-top'),10);
	var sf_padding_bottom = parseInt(acSearchField.css('padding-bottom'),10);
	var sf_width  = acSearchField.width();

	// apply the css styles - optimized for Firefox
	acResultsDiv.css("position","absolute");
	acResultsDiv.css("left", sf_left);
	acResultsDiv.css("top", sf_top + sf_height + sf_padding_top + sf_padding_bottom + 2);
	acResultsDiv.css("width", sf_width + sf_padding_left + sf_padding_right);
}

// treat up and down key strokes defining the next selected element
function updownArrow(keyCode) {
	if(keyCode == 40 || keyCode == 38){

		if(keyCode == 38){ // keyUp
			if(acListCurrent == 0 || acListCurrent == -1){
				acListCurrent = acListTotal-1;
			}else{
				acListCurrent--;
			}
		} else { // keyDown
			if(acListCurrent == acListTotal-1){
				acListCurrent = 0;
			}else {
				acListCurrent++;
			}
		}

		// loop through each result div applying the correct style
		acResultsDiv.children().each(function(i){
			if(i == acListCurrent){
				acSearchField.val(this.childNodes[0].nodeValue);
				this.className = "selected";
				add_autocomplete_tracker(); //we highlighted an item, add tracker
			} else {
				this.className = "unselected";
			}
		});

		return true;
	}
	else {
		// reset
		acListCurrent = -1;
		remove_autocomplete_tracker(); //We left the list, remove tracker
		return false;
	}
}

//This function will add &srchtyp=auto to the end of the query string so we can track when people use the autocomplete feature
//It works by adding a hidden element to the search form right before submission occurs. (Put Before: acSearchField.parents("form").submit(); )
function add_autocomplete_tracker() {

	if ( document.getElementById('autocomplete_tracking_field_1') == null )
	{
		//parent to add node to
		var parent_to_recieve_node = acSearchField.parents("form")[0];
		if ( !parent_to_recieve_node )
		{
			parent_to_recieve_node = acSearchField.parents()[0]; 
		}
  
		//create an input element
		var new_input_field = document.createElement('input');

		//set its attributes
		new_input_field.setAttribute('type','hidden');
		new_input_field.setAttribute('name','srchtyp');
		new_input_field.setAttribute('value','auto');
		new_input_field.setAttribute('id','autocomplete_tracking_field_1');

		//add the new hidden tracking input
		parent_to_recieve_node.appendChild(new_input_field);

	}
}

//Call this function when a user uses the arrow keys to leave the list of suggestions
function remove_autocomplete_tracker() {
	if ( document.getElementById('autocomplete_tracking_field_1') != null )
	{
		//Get parent of element to remove
		var parent_of_element_to_remove = acSearchField.parents("form")[0];

		if ( !parent_of_element_to_remove )
		{
			parent_of_element_to_remove = acSearchField.parents()[0]; 
		}
	
		//Get element to remove by id
		var element_to_remove = document.getElementById('autocomplete_tracking_field_1');
	
		parent_of_element_to_remove.removeChild(element_to_remove);
		
	}
}