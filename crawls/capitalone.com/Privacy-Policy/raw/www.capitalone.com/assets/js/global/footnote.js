var	footnoteCount=0;

$(document).ready(function() {
	renumberSingleFootnotes();
});

//For Single Manual/Dynamic footnotes replace number with symbol (*)
function renumberSingleFootnotes() {
	var seen = {};
	// Calculate the footnote count by iterating over all unique footnote anchors.
	$('div a[href^="#footnote"]').each(function() {
		var href=$(this).attr('href');
		if (seen[href])
			return true;
		else {
			seen[href] = true;
			footnoteCount++;
		}
	});
	// Update the footnote anchor/text with symbol(*) for single footnotes (dynamic)
	if (footnoteCount==1) {
		$('.footnote').text('*');
		$('#footnotes p[id^="footnote"] sup[id^="footnoteSup"]').text('*');
	}
}
// This function removes existing footnotes in the zone contents passed
function removeExistingFootnotes(content){
	var seen = {};
	$(content).find('.footnote').each(function(){
		var href = $(this).attr('href');
		var footnoteId = $(this).text();
		if (seen[footnoteId]) {
			return true;
		}
		else {
			// remove the footnote p if the anchor is not used elsewhere.
			if ( $('div a[href="' + href + '"]').length==1 ) {
				$(href).parent(".footnote_content_wrapper").remove();
				seen[footnoteId] = true;
			}
		}
	});
}
// This function adds footnotes in the footnote zone based the div passed(if footnote anchors are found).
// It also renumbers the footnote anchors based on the footnoteCount.
function addNewFootnotes(div) {
	var seen = {};
	var seenID ={};
	// Add new footnotes if count is set
	if (footnoteCount > 0) {
		//Iterate over all footnote anchors ("footnote" is the css class)
		$(div + ' .footnote').each(function(){
			var pId = $(this).attr('href');
			var footnoteId = $(this).text();
			//Continue to next footnote anchor if its already been added
			if (seen[footnoteId]) {
				$(this).attr('href', '#footnote'+seenID[footnoteId]);
				$(this).html('<sup>' +seenID[footnoteId]+ '</sup>');		
				return true;
			}
			else {
				seen[footnoteId] = true;
				footnoteCount++;
				seenID[footnoteId] = footnoteCount;
				
				$(this).attr('href', '#footnote'+footnoteCount);
				$(this).html('<sup>' + footnoteCount + '</sup>');
				var hiddenText = eval("footnoteText" + footnoteId);
				var footnoteP = '<div class="footnote_content_wrapper"><p id="footnote' + footnoteCount + '">' + 
				'<span class="fn-dis"><sup id="footnoteSup' + footnoteCount + '">' + footnoteCount 
				+ '</sup></span>' + hiddenText + '</p></div>';
				$.trim(footnoteP);
				$('#footnotes').append(footnoteP);
			}
		});
	}
	// Remove the footnotes that are not used on the page
	$('#footnotes .footnote_content_wrapper p[id^="footnote"]').each(function() {
		var href = $(this).attr("id");
		if ( ($('div a[href="#' + href  + '"]').length==0) && ( href != "footnote") ) {
			$(this).parent(".footnote_content_wrapper").remove();
		}
	});
	// For Single footnotes(X+1 replaced) replace number with symbol (*)
	renumberSingleFootnotes();
}