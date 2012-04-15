jQuery.fn.expandCollapseList = function(attr) {
	attr = attr || {};
	attr.duration = attr.duration || "fast"; // values: string 'fast' or 'slow' or int in milliseconds
	attr.expandIcon = attr.expandIcon || "+"; // values: string image tag or text
	attr.collapseIcon = attr.collapseIcon || "-"; // values: string image tag or text 
	attr.expanded = attr.expanded || "none"; // values: 'all', 'none', [1,2,3]
	attr.moreLink = attr.moreLink || "more..."; // values: string text
	attr.lessLink = attr.lessLink || "less..."; // values: string text
	attr.maxChildren = attr.maxChildren || "all"; // values: int
	attr.showLessLink = attr.showLessLink || false; // values: boolean

	// helper method to help determine how to toggle the Plus/Minus text/image icons
	function matchIcons(sDomHTML, sAttr){
		// if it looks like a tag/image, compare sources
		if (sAttr.indexOf("<") != -1 && sAttr.indexOf(">") != -1){
			var oDomHTML = jQuery(sDomHTML);
			var oAttr = jQuery(sAttr);
		
			return (oDomHTML.attr("src") == oAttr.attr("src"));
		
		// else compare strings
		} else {
			return (sDomHTML == sAttr);
		}
	}

	// loop through all children li nodes
	jQuery(this).children("li").each(function(){
			// if this li node has a child UL node
			if (jQuery('ul', this).length > 0) {
				// prepend the span tag for the Plus/Minus icon
				if (attr.expanded != "all") {

					jQuery(this).prepend(
						jQuery("<span/>", {
							html: attr.expandIcon,
							className: "plusMinus",
							click: function() {
								// slide down hidden UL
								jQuery(this).parent().find("ul").slideToggle(attr.duration);

								// swap the Plus/Minus icons
								if (matchIcons(jQuery(this).html(), attr.expandIcon)){
									jQuery(this).html(attr.collapseIcon);
								} else {
									jQuery(this).html(attr.expandIcon);
								}
							}
						})
					);

				}

				// add the 'more' link if expanded == 'all' and li reaches max children length 
				if (attr.expanded == "all" && attr.maxChildren != "all" && jQuery('ul', this).children("li").length > attr.maxChildren){
					
                    // flag children li greater than max
                    var childLIs = jQuery('ul', this).children("li");
                    for (var i=0; i<childLIs.length; i++){
						if (i >= attr.maxChildren) jQuery(childLIs[i]).addClass("tempHideClass");
					}

                    // hide children li greater than max
                    jQuery(".tempHideClass").wrapAll('<div class="hiddenDiv" style="display:none;" />');

                    // unflag children li greater than max
                    jQuery(".tempHideClass").removeClass("tempHideClass");

					// add the more link
					jQuery('ul', this).append(
						jQuery("<li/>", {
							html: attr.moreLink,
							className: "more",
							click: function(){
                                var bIE = (typeof(document.all) != "undefined");

								if (attr.showLessLink){

									if (jQuery(this).hasClass("more")){
										jQuery(this).html(attr.lessLink);
										
                                        if (bIE){
                                            jQuery(this).parent().children(".hiddenDiv").show();
                                        } else {
                                            jQuery(this).parent().children(".hiddenDiv").slideDown(attr.duration);
                                        }
									} else {
										jQuery(this).html(attr.moreLink);
                                        if (bIE){
                                            jQuery(this).parent().children(".hiddenDiv").hide();
                                        } else {   
                                            jQuery(this).parent().children(".hiddenDiv").slideUp(attr.duration);
                                        }

									}

									jQuery(this).toggleClass("more");
									jQuery(this).toggleClass("less");

								} else {
									// slide down hidden LIs
                                    if (bIE){
                                        jQuery(this).parent().children(".hiddenDiv").show();
                                    } else {       
                                        jQuery(this).parent().children(".hiddenDiv").slideDown(attr.duration);
                                    }
									// remove more link
									jQuery(this).remove();
								}

							}
						})
					);					
				}

			// no child UL node found, no need to expand/collapse functionality
			} else {
				if (attr.expanded != "all") {
					// prepend the span tag for the Not Expandable spacer
					jQuery(this).prepend(
						jQuery("<span/>", {
							html: "&nbsp;",
							className: "notExpandable"						
						})
					);
				}
			}
	});
	
	// expand an array of nodes [1,2,3]
	if (jQuery.isArray( attr.expanded )) {
		for (var k=0; k<attr.expanded.length; k++ ){
			for (var i=0; i<jQuery(this).children("li").length; i++){
				if (attr.expanded[k] -1 == i){
					jQuery(jQuery(this).children("li")[i]).find("ul").parent().find(".plusMinus").html(attr.collapseIcon);
					jQuery(jQuery(this).children("li")[i]).find("ul").show();
				}
			}
		}

	// expand all nodes
	} else if (attr.expanded == "all") {
		jQuery(".plusMinus").html(attr.collapseIcon);
		jQuery(this).find("ul").show();
	
	// hide all nodes 
	} else {
		jQuery(".plusMinus").html(attr.expandIcon);
		jQuery(this).find("ul").hide();		
	}
}