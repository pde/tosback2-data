
/***************************************************************************
*
* Copyright (C) Telegraph Media Group Ltd.
* All Rights Reserved. No use, copying or distribution of this work may be
* made. This notice must be included on all copies, modifications and
* derivatives of this work. 
****************************************************************************
* Author:
*
* Description:
* Live updating article functionality
*
* Updates:
*
* 21/04/2011 S Gadhiraju	Fixed the javascript update issue (Ajax call was not updating the article after 5 paragraphs).
* 21/04/2011 S Gadhiraju	DIGI-283 Appended a random string to the url to make sure the call will be made to the server instead of using the cache.
* 08/07/2011 S Gadhiraju	DIGI-915 Took off the random string that is attached to the url and cleaned up the file a bit.
***************************************************************************/

var runUpdate;
var updateFreq = $(document).find('div#updateFreq').text();
var thisUrl = $(document).find('div#articleUrl').text();

$(document).ready(function () {
	
	liveBloggingUpdate(document);
	
	$('#liveBloggingOn').bind('click', function() {
		  runUpdate = true;
		  $(this).addClass('selected');
		  $('#liveBloggingOff').removeClass('selected');
		  liveBloggingUpdate(document);
	});
	$('#liveBloggingOff').bind('click', function() {
		  runUpdate = false;
		  $(this).addClass('selected');
		  $('#liveBloggingOn').removeClass('selected');
	});		

});

var tmg_liveblogging_parent='.story #mainBodyArea';
function makeElement(elementSelector, insertAfterSelector, data, elementValueSelector, appendAsLast, tempParent)
{
	if($(data).find(elementValueSelector) <= 0)
	{
		return;
	}
	
	var divElement; 
	if ($(elementSelector).length > 0){
		divElement = elementSelector;
		$(divElement).empty();
	}
	else
	{
		var element = "<div> </div>";
		var insertSelector;
		
		if(tempParent != undefined)
		{
			tmg_liveblogging_parent = tempParent;
		}
		
		if(appendAsLast)
		{	
			insertSelector = tmg_liveblogging_parent;
			divElement = $(element).appendTo(insertSelector).addClass(elementSelector.substring(1));
		}
		else
		{
			if(insertAfterSelector)
			{
				insertSelector = tmg_liveblogging_parent  + ' ' + insertAfterSelector;
				divElement = $(element).insertAfter(insertSelector).addClass(elementSelector.substring(1));
			}
			else
			{
				insertSelector = tmg_liveblogging_parent;
				divElement = $(element).appendTo(insertSelector).addClass(elementSelector.substring(1));
			}
			
		}
	}
	
	$(tmg_liveblogging_parent + ' ' + elementSelector).append($(data).find(elementValueSelector).html());
	
	return;
}

function liveBloggingUpdate(document) {	
	if (runUpdate) {
		
		jQuery.get(thisUrl, function(data) {
			if (data) {
				if ($(data).find('#lbaLastUpdated').text() != $('div#artLastModified').text()) {
					
					makeElement('.firstPar', null, data, '#lbaFirstPar div.firstPar');
					makeElement('.secondPar', '.firstPar', data, '#lbaSecondPar div.secondPar');
					makeElement('.thirdPar', '.secondPar', data, '#lbaThirdPar div.thirdPar');
					makeElement('.fourthPar', '.thirdPar', data, '#lbaFourthPar div.fourthPar');
					makeElement('.fifthPar', '.fourthPar', data, '#lbaFifthPar div.fifthPar');
					makeElement('.body', null, data, '#lbaBody div.body', true);

					$('div#artLastModified').empty().append($(data).find('#lbaLastUpdated').text());
				}
			} 
		});
		setTimeout(liveBloggingUpdate, updateFreq); 
	}
}

function destroySS() {
	for (i=0; i < ssObj.length; i++) {
		ssObj[i] = '';
	}
}
