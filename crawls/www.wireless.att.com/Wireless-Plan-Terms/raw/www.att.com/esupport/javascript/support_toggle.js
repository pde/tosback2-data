//<![CDATA[
function cleanup() {
	document.searchForm.query.value="";
}

jQuery(document).ready(function(){
	jQuery("#jQuery-navigation").treeview({
		animated: "fast",
		collapsed: true,
		unique: true,
		persist: "location", /* automatic highlighting based on current url */
		toggle: function() {
			//window.console && console.log("%o was toggled", this);
		}
	});	
	
	var newHeight = jQuery("#thisHeight").height();
	jQuery("#getHeight").css("height",newHeight);
	
	
	//Hide (Collapse) the toggle containers on load
	jQuery(".toggle_container").hide(); 

	//Switch the "Open" and "Close" state per click
	jQuery(".trigger").toggle(function(){
		jQuery(this).addClass("active");
		jQuery(this).removeClass("toggle_colapse");
		jQuery(this).addClass("toggle_expand");
		}, function () {
		jQuery(this).removeClass("active");
		jQuery(this).removeClass("toggle_expand");
		jQuery(this).addClass("toggle_colapse");
	});

	//Slide up and down on click
	jQuery(".trigger").click(function(){
		jQuery(this).next(".toggle_container").slideToggle("slow");
	});	
});
//]]>