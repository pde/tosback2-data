/*
* Autosuggest - jQuery plugin
*
* Bed Bath & Beyond
*
*	How to use? 
*	$("#divname").autosuggest( { dataUrl:"http://localhost/search/ajcSearchAutoComplete.aspx", queryParams:"dim=1"} );
*/
(function($){
 $.fn.autosuggest = function(options) {
	
	// Paramters
	var defaults = {
		dataUrl: "",
		queryParams: "",
		triggerLength: 3,
		suggestionsDivName: "suggestionsDiv",
		suggestionsDivClass: "suggestionsDiv",
		suggestionsDivItemClass: "suggestionsDivItem",
		suggestionsDivItemOverClass: "suggestionsDivItemOver",
		highLightClass: "highlight",
		isScroll: false,
		scrollHeight: "80",
		itemHeight: "16",
		triggerTimeInterval: 300
	};
	var options = $.extend(defaults, options);

	// Currently selected(highlighted) suggestions list item index
	var itemIndex = -1;
	
	// Number of items valid as suggestions, excludes headings
	var listLength = 0;
	
	var isMouseOnDiv =  false;
	
	var currentTimeStamp = 0;
	var prevTimeStamp = 0;
	var timer_ajax;
	var text_sstr = "";
	var sipp_value = "";
	
	// Start Up Function
	var textbox;
	var suggestionsDiv;
	var containerSuggestDiv;
	return this.each(function() {
		
		textbox = $(this);
		textbox.keyup( onKeyUpInTextBox );
		textbox.blur( onOutOfFocusTextBox );
		textbox.focus( onFocusTextBox );
		
		// Get position to display the div
		var offset = getCoOrdsForDiv();
		
		// Format the div style
		suggestionsDiv = createDiv( offset );

		// Create container div
		containerSuggestDiv = createContainerDiv();

		// Add div
		suggestionsDiv.appendTo( containerSuggestDiv );
		containerSuggestDiv.appendTo( document.body );
		
		removeSuggestions();
		
	});

	function onKeyUpInTextBox( e )
	{
		// 38 = UP, 40 = DOWN, 8 = BACKSPACE, 46 = DEL, 27 = ESC
		if( e.keyCode == 38 )
		{
			// When UP key is pressed remove highlight from the currently highlighted div and highligh the upper div
			var prevItemName = "#" + itemIndex.toString();
			itemIndex = itemIndex - 1;
			var currItemName = "#" + itemIndex.toString();
			
			if( itemIndex >= 0 && itemIndex < listLength )
			{
				moveHighlightUp( prevItemName, currItemName );
			}
			else
			{
				itemIndex = itemIndex + 1;
			}
		}
		else if( e.keyCode == 40 )
		{
			// When DOWN key is pressed remove highlight from the currently highlighted div and highligh the below div
			var prevItemName = "#" + itemIndex.toString();
			itemIndex = itemIndex + 1;
			var currItemName = "#" + itemIndex.toString();

			if( itemIndex >= 0 && itemIndex < listLength )
			{
				moveHighlightDown( prevItemName, currItemName );
			}
			else
			{
				itemIndex = itemIndex - 1;
			}
			
		}
		else if( e.keyCode == 13 )
		{
			$("#search_prod").removeAttr("onsubmit");
			// When ENTER key is pressed
			// if any div is highlighted
			// check for a hyper link in currently highlighted div, if found go to that link, else do nothing
			if( itemIndex > -1 )
			{
				var itemName = "#" + itemIndex.toString();
				var link = $(itemName + " > a").attr('href');
				if( link != null )
					window.location = link;
			}
		}
		else if( e.keyCode == 27 )
		{
			removeSuggestions();
		}
		else
		{
			currentTimeStamp = new Date().getTime();
			if ( timer_ajax )
			{
				// Cancel the timed ajax call if user presses another key
				// This cancels call if user presses it key too fast
				clearTimeout(timer_ajax);
				timer_ajax = null;
			}	
			text_sstr = getTextInTextBox();
			sipp_value = getcookievalue("sipp");
			if( sipp_value == null)
				sipp_value = 20;

			if( text_sstr.length >= options.triggerLength)
			{
				// Fire call only after interval
				timer_ajax=setTimeout( timeOutKeyUp, options.triggerTimeInterval );
			}
			else
			{
				removeSuggestions();
			}
		}
		
		prevTimeStamp = currentTimeStamp;
	}
	
	function timeOutKeyUp()
	{
		$.ajax({
			url : options.dataUrl,
			dataType: "application/x-www-form-urlencoded",
			data: options.queryParams + "&sstr=" + text_sstr + "&grid=" + sipp_value,
			success : function (data) 
			{
				if( data != "" )
				{
					removeSuggestions();
					writeSuggestions( data );
				}	
				else
				{
					removeSuggestions();
				}	
			},
			error:function ( xmlHttpReq, txtStatus, errThrown )
			{
				//alert( xmlHttpReq.status + "/" + txtStatus + "/" + errThrown );
			}       
		});
	}
	
	function getCoOrdsForDiv()
	{
		// Get top-left co-ordinate of div
		var offset = textbox.offset();
		
		// Add height of textbox to the top co-ordinate to get the botton left co-ordinate
		offset.top += textbox.height();
		
		// Add some pixels to fix div position, don't know why offset wasnt accurate
		offset.top += 6;
		offset.left += 3;
		
		return offset;
	}

	function createDiv( offset )
	{
		var suggestionsDiv = $("<div></div>");
		suggestionsDiv.css("position", "absolute");
		suggestionsDiv.css("left", offset.left);
		suggestionsDiv.css("top", offset.top);
		suggestionsDiv.css("width", textbox.width() );
		if( options.isScroll )
		{
			suggestionsDiv.css("height", options.scrollHeight );
			suggestionsDiv.css("overflow-y", "auto" );
		}	
		
		suggestionsDiv.attr( "id", options.suggestionsDivName );
		suggestionsDiv.addClass( options.suggestionsDivClass );

		return suggestionsDiv;
	}
	
	function createContainerDiv()
	{
		var containerSuggestDiv = $("<div></div>");
		containerSuggestDiv.attr( "id", "containerSuggestDiv" );
		containerSuggestDiv.mouseover( onMouseOverContainerDiv );
		containerSuggestDiv.mouseout( onMouseOutContainerDiv );
		
		return containerSuggestDiv;
	}	
	
	function getTextInTextBox()
	{
		return textbox.val();
	}
	
	function writeSuggestions( data )
	{
		var splitData = data.split("<br>");
		listLength = splitData.length - 1; // -1 to accomodate the last <br>
		
		var text = getTextInTextBox();
		var i = 0;
		var actualListLength = 0;
		for ( i=0; i<listLength; i++ )
		{
			var suggestionsDivItem = $("<div></div>");
			suggestionsDivItem.addClass( options.suggestionsDivItemClass );

			// Only add id to the div you want to be able to highlight the div item
			if( splitData[i].indexOf("href=") > 0 )
			{
				suggestionsDivItem.attr( "id", actualListLength );
				suggestionsDivItem.mouseover( onMouseOverSuggestionsDivItem );
				suggestionsDivItem.mouseout( onMouseOutSuggestionsDivItem );
				actualListLength++ ;
			}	
			
			if( options.isScroll )
				suggestionsDivItem.attr( "height", options.itemHeight );
			
			suggestionsDivItem.html( splitData[i] );
			suggestionsDivItem.appendTo( suggestionsDiv );
		}
		listLength = actualListLength;
		showSuggestions();
	}
	
	function removeSuggestions()
	{
		itemIndex = -1;
		suggestionsDiv.html( "" );
		suggestionsDiv.hide();
	}
	
	function showSuggestions()
	{
		suggestionsDiv.show();
	}
	
	function onOutOfFocusTextBox()
	{
		if( isMouseOnDiv == false )
		{
			itemIndex = -1;
			removeSuggestions();
		}	
	}
	
	function onFocusTextBox()
	{
		if( suggestionsDiv.html() != "" )
			removeSuggestions();
	}
	
	function onMouseOverSuggestionsDivItem()
	{
		var prevItemName = "#" + itemIndex.toString();
		$(prevItemName).removeClass( options.suggestionsDivItemOverClass );
		
		var item = $(this);
		item.removeClass( options.suggestionsDivItemClass );
		item.addClass( options.suggestionsDivItemOverClass );
		//itemIndex = parseInt( item.attr("id") );
	}
	
	function onMouseOutSuggestionsDivItem()
	{
		var item = $(this);
		item.removeClass( options.suggestionsDivItemOverClass );
		item.addClass( options.suggestionsDivItemClass );
		//itemIndex = -1;
	}
	
	function onMouseOverContainerDiv()
	{
		isMouseOnDiv = true;
	}
	
	function onMouseOutContainerDiv()
	{
		isMouseOnDiv = false;
	}
	
	function moveHighlightDown( prevItemName, currItemName )
	{
		$(prevItemName).removeClass( options.suggestionsDivItemOverClass );
		$(prevItemName).addClass( options.suggestionsDivItemClass );

		$(currItemName).removeClass( options.suggestionsDivItemClass );
		$(currItemName).addClass( options.suggestionsDivItemOverClass );
		
		
		if( options.isScroll )
		{
			if( ( options.itemHeight * ( itemIndex + 1 ) ) >= options.scrollHeight )
			{
				var top = ( ( itemIndex + 2 ) - ( options.scrollHeight / options.itemHeight ) ) * options.itemHeight;
				suggestionsDiv.scrollTop( top );
			}
		}	
	}
	
	function moveHighlightUp( prevItemName, currItemName )
	{
		$(prevItemName).removeClass( options.suggestionsDivItemOverClass );
		$(prevItemName).addClass( options.suggestionsDivItemClass );

		$(currItemName).removeClass( options.suggestionsDivItemClass );
		$(currItemName).addClass( options.suggestionsDivItemOverClass );
	}
	
	function getcookievalue ( cookie_name )
	{
		var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
		if ( results )
			return ( unescape ( results[2] ) );
		else
			return null;
	}
	
 };
})(jQuery);
