function trackClick(name) {
	parseOmnitureJSON({
		"prop26": name,
	});

	var s1=s_gi(getId());
	s1.linkTrackVars="prop26";
	s1.tl(true, 'o', name);
	
}

// Function to attach Omniture event to close button in modal window
function bindEventsToCloseButtons() {
	jQuery('a.modalClose').each(function() {
		jQuery(this).click(function() {
			var name = "";
			if (jQuery("#recipientFormIFrame").contents().find("a > img[name^=ViewCart]").attr("name")) {
				name = "CloseButton - Step 2";
			} else if (jQuery("#recipientFormIFrame").contents().find("td > img[class=addRecipients]").attr("class")) {
				name = "CloseButton - Step 1";
			}
			if (name != "")
				trackClick(name);
		});
	});
}

jQuery(document).ready(function() {
	bindEventsToCloseButtons();
	
	jQuery("input[name=freeGiftRecipeint]").click(function(event) {
		event.preventDefault();
		var name = "Continue - Free Gift";
		trackClick(name);
		setTimeout(function() {
			jQuery("#freeGiftRecipientForm").trigger("submit");
		}, 1000);
		
	});	
	
	
	
	// attach Omniture event to QAS window
	jQuery.ajaxSetup({
		complete: function () {
			jQuery("tr[id^=qas-multiple]>td").bind("click.omnitureTagging", function(e) {
				var name = "Use Suggested Address";
				e.preventDefault();
				trackClick(name);
				jQuery(this).unbind("click.omnitureTagging");
				setTimeout(function() {
					
					jQuery(this).trigger("click");
				}, 10000);
			});		
		}
	});
});













