/**
  * NoTE: You must setup searchDefaultVal, searchErrTxtTimeout, and searchSLIDomain variables outside of this javascript. 
  * The values should come from the system, and as such, need to be set in a jsp file rather than js
**/

$(document).ready(function(e) {
	// Search Field 
	$(".sfield").val(searchDefaultVal).focus(search.focusHandler).blur(search.blurHandler);
});

(function( search, $, undefined ) {
	search.test = function(){
		alert('blah');
	};

	//focus handler
	search.focusHandler = function(event){
		if ($(this).val() == searchDefaultVal) {
			$(this).val("");
		}
	};
	
	//blur handler
	search.blurHandler = function(event){
		if ($(this).val() == "") {
			$(this).val(searchDefaultVal);
		}
	};

	//submit action for search form
	search.goSearch = function(event) {	
		var sval = $(this).find(".sfield").val();
		var isFul = $(this).attr('isSearchF');
		
		var bErr = goSearchErrCheck(sval, $(this).find(".sErr"));
		
		//if there is an error, or this is not fulcrum, prevent the default submit
		if(bErr || isFul != "true")
			event.preventDefault();
		
		//if not fulcrum, and no error, continue to redirect search
		if(!bErr && isFul != "true")
			goSearchRedirect(sval);
	};
	
	//checks that the value is valid
	function goSearchErrCheck(sval, errElem){
		//error, return true and show err msg
		if(sval === searchDefaultVal || sval === null || sval.length == 0) {
			$(errElem).show();	
			
			setInterval(
				function(){
					$(errElem).hide();
				},searchErrTxtTimeout);
				
			return true;
		}
		
		return false;
	}
	
	//redirects in case of non-fulcrum
	function goSearchRedirect(sval){
		var	strOut = "";
		
		if(sval.length > 0){
			strOut = encodeURI(sval);
		}

		if (strOut == '')
			window.location = 'http://' + searchSLIDomain + '/';
		else
			window.location = 'http://' + searchSLIDomain + '/search?p=Q&ts=custom&lbc=hottopic&w=' + strOut;
	}
}( window.search = window.search || {}, jQuery ));