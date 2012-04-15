var formHasReset = false;
var thisPageActiveTab = 0;
var bDisableTabbedNavJs = false;
jQuery(document).ready(function() {

//	jQuery("#ajaxSharePriceBox").load("/ajax/?sharePriceBox",null,function(){
//		jQuery(this).show('slow');
//	});

	jQuery(".alert").animate({ backgroundColor: "white" }, 3000).slideUp();

	/* FAQs */

	jQuery('dd').hide();

	jQuery('dt').click(function () {
//		jQuery('dd').slideUp('fast');
		jQuery(this).next().toggle('slow');
		return false;
	});

	/* Tabbed content */

	if (!bDisableTabbedNavJs && jQuery('.tabbedNav').length) {

		jQuery('.tabbedNav li a').click(function() {
			return showTabbedContent(jQuery('.tabbedNav li a').index(jQuery(this)));
		});

		var sUrl = document.location.toString();

		if (sUrl.match('#tab')) {
			iAnchor = parseInt(sUrl.split('#tab')[1])-1;
			showTabbedContent(iAnchor);
		} else if (thisPageActiveTab) {
			showTabbedContent(thisPageActiveTab);
		} else {
			showDefaultTabbedContent();
		}

	}

	/* Search box */

	jQuery("#search_query").click( function () {

		if (false == formHasReset) {
			jQuery("#search_query").val('');
			jQuery("#search_query").removeClass('faded');
			formHasReset = true;
		}

	});

});

function showDefaultTabbedContent ()
{

	jQuery('.tabbedBox').each(function(e){
		jQuery(this).find('.tabbedNav li').removeClass('selected');
		jQuery(this).find('.tabbedNav li').eq(0).addClass('selected');
		jQuery(this).find('.tabbedContent').hide();
		jQuery(this).find('.tabbedContent').eq(0).show();
	});

}

function showTabbedContent (iTabId)
{

	if ('hasLinks' == jQuery('.tabbedNav li').eq(iTabId).parent().attr('class').split(' ').slice(-1)) {
		return true;
	}

	jQuery('.tabbedNav li').eq(iTabId).parent().children().removeClass('selected');
	jQuery('.tabbedNav li').eq(iTabId).addClass('selected');

	jQuery('.tabbedNav li').eq(iTabId).parent().parent().parent().children('.tabbedContent').hide();
	jQuery('.tabbedContent').eq(iTabId).show();

	return false;

}
