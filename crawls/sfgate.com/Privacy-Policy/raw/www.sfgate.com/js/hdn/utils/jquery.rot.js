// jQuery plugin for rotating tab-sets

(function(jQuery) {
	jQuery.fn.rot = function(startTab) {
		var allSets = this;
		// loop over all elements that match selector and apply plugin
		this.each(function(i) {
			// find all nav tab anchors and add click element
			jQuery('.nav-tabs a', this).click(function(click) {
				// find the index that was clicked
				var j = jQuery('.nav-tabs a', allSets[i]).index(this);
				// remove the selected class from all anchors and add it back the the one clicked
				jQuery('.nav-tabs a', allSets[i]).removeClass('selected').eq(j).addClass('selected');
				// add the selected class to corresponding content tab
				jQuery('.content-tab', allSets[i]).hide().eq(j).show();
				// remove focus from the clicked anchor
				this.blur();
				// stop the click
				click.preventDefault();
			});
			// if no startTab passed, default to 1
			if (!startTab) startTab = 1;
			// "click" the start tab
			jQuery('.nav-tabs a', this).eq(startTab - 1).click();
		});

		return this;
	};
})(jQuery);


// onClick and onMouseover javascript for analytics on the "Wide Centerpiece"
jQuery(document).ready(function($) {
	// Track tab ID when clicking on any links within the main content
	$('.hst-centerpiecewide .tabcontent a').click(function(){
		var tab = $(this).parents('.tabcontent').attr('id').replace("hst_cpiece", "");
		//alert('clickContents: '+tab);
		omniLinkTrack('WideCP', 'Click', 'CP', tab);
		return true;
	});
	// Track tab ID when clicking on the tab itself
	$('.hst-centerpiecewide #hst_cpiece_ctrl a').click(function(){
		var tab = $(this).parents('li').attr('id').replace("hst_cpiece_tab", "");
		//alert('clickTab: '+tab);
		omniLinkTrack('WideCP', 'Click', 'Tab', tab);
		return true;
	});
	// Track tab ID when moused over tab and content is displayed for 2 seconds
	wideTabLastSent = 0; // int of the last tab ID entered
	wideTabTime = []; // "associative array" of Timeout ID foreach tab ID
	$('.hst-centerpiecewide #hst_cpiece_ctrl li').mouseenter(function(){
		var tab = this.id.replace("hst_cpiece_tab", ""); 
		wideTabTime['tab'+tab] = setTimeout("trackMouseEnter("+tab+")",2000);
		// If user hovers over a new tab, cancel any previous tab Timeout function
		for (i in wideTabTime) { 
			if ( i != 'tab'+tab && wideTabTime[i] ){
				clearTimeout(wideTabTime[i]);
				wideTabTime[i] = 0;
			}
		}
	});
});

// Function fired by timer to track the mouseOver event (tabs on Wide Centerpiece)
function trackMouseEnter(tab){
	// as long as content is still selected AND we didn't just send an event for this same tab
	var isSelected = $('#hst_cpiece_tab'+tab).hasClass('selected');
	if ( isSelected && wideTabLastSent!=tab ){
		//alert('mouseEnter: '+tab);
		omniLinkTrack('WideCP', 'Mouse', 'Tab', tab);
		wideTabLastSent = tab;
	}
}

// Function to track Click and MouseOver events (such as within the Wide Centerpiece)
function omniLinkTrack(strSource, strEventType, strObjType, intObjNum) {
	var s=s_gi(s_account);
	s.linkTrackVars='events,eVar8';
	s.linkTrackEvents='event8';
	s.events='event8';
	s.eVar8=strSource+strEventType+strObjType+intObjNum;
	s.tl(true,'o',strSource+strEventType+strObjType+intObjNum);
}

// openTab: click a tab in a set with a unique number
function openTab(clickedTab,setNumber) {
  this.blur();
  setClass = ".tab-set" + setNumber;
  var thisTab = $(setClass + " .nav-tabs a").index(clickedTab);
  $(setClass + " .nav-tabs li a").removeClass("selected");
  $(setClass + " .nav-tabs li a:eq("+thisTab+")").addClass("selected");
  $(setClass + " .content-tab").hide();
  $(setClass + " .content-tab:eq("+thisTab+")").show();
  $(setClass + " .nav-tabs li").removeClass("selected");
  $(clickedTab).parent().addClass("selected");
  currentTab = thisTab;
  $.preventDefault();
  return false;
}


// end js/hdn/utils/jquery.rot.js
