function renderXp1Zone(pagePath, zoneId, locationId) {
	var xp1RenderUrl =  pagePath + "?zoneId=" + zoneId + "&locationId=" + locationId;
	var divToBeReplaced = "X" + zoneId;
	if (zoneId != null && typeof(zoneId) != 'undefined' && zoneId != "") 
	{
		$('#' + divToBeReplaced).css("visibility","hidden");
	    $.ajax({
	        type: "GET",
	        url: xp1RenderUrl,
	        success: function (data) {
	            if (data.indexOf("DoNotShow")== -1) {
	            	var content = data.substring(data.indexOf("<expZone>")+9, data.indexOf("</expZone>"));  
	            	var contentToBeReplaced = $('#' + divToBeReplaced).html();
	            	
	            	$(document).ready(function() {
	            		// invoke function to remove existing footnotes in the footnote zone		
	            		removeExistingFootnotes(contentToBeReplaced);			       					        			            	
		            	
		            	$('#' + divToBeReplaced).html(content);
		       
		            	// invoke function to add New Footnotes in the footnote zone  if there
		            	// are footnotes in the new content to be replaced.						       
		       			addNewFootnotes('#' + divToBeReplaced);
		       			
						// Initialize any modals
						if(window.initModals) {
							initModals();
						}
						
						//Initial any browse tables on the page
						if (window.initBrowseTable) {
							initBrowseTable();
						}
						if (window.initeCardFilters) {
							initCardFilters();
						}
	       			});	
	            }
	        },
	        complete: function(jqXHR, textStatus) {
	            $('#' + divToBeReplaced).css('visibility', 'visible');
	        }
	    });
	}
}

function renderXp1PrimaryNav(ebcUrl, primaryNavDivId) {

	$.ajax({
			type: "GET", //get instead of post
			url: ebcUrl, //reg exp to trim to check for
			success: function (navContent) {
				if (navContent && navContent != '' && navContent.indexOf("DoNotShow") == -1) {
					$('#' + primaryNavDivId).css("visibility", "hidden");
					$('#' + primaryNavDivId).html(navContent);
				}
			},
			complete: function() {
				$('#' + primaryNavDivId).css("visibility", "visible");
			}
	});
}
