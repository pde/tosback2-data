(function(){
// Click Track Global(CTG) - Privacy - in Asset ID 1218404067831
var CTG_cat = new Object();
$(document).ready(function() {
	CTG_cat = new CTG.Track();
	CTG_cat.elementBind('#main','.content-box a',track_contentbox);
	CTG_cat.elementBind('#policyContent','a',track_privacy);
});
// Privacy Page Functions
function track_contentbox()
{
    CTG_cat.link_type = "CB";
	var c_class = "";
    $(this).parents().each(function(i){
	    c_class = $(this).attr('class');
		if(/content-box/.test(c_class))
		{
			CTG_cat.link_header = CTG_cat.link_header + $(this).children('.content-heading').text();
			return(false);
		}
		if(/primary-panel/.test(c_class))
		{
			CTG_cat.link_header = CTG_cat.link_header + "PMPanel";
			return(false);
		}
		if(/primary-tabs/.test(c_class))
		{
			CTG_cat.link_header = CTG_cat.link_header + "PMTab";
			return( false );
		}
	});
	// Get index for FOs
	var c_ele = $(this).parents('li').attr('class');
	if(/featured/.test(c_ele))
	{
		CTG_cat.link_type = "FO_" + ($("."+c_ele).index($(this).parents('li')) + 1);
	}
	CTG_cat.imageLink($(this));
    CTG_cat.buildTString();
	CTG_cat.sendTrackingData();
}
function track_privacy()
{
	CTG_cat.imageLink($(this));
    CTG_cat.buildTString();
	CTG_cat.sendTrackingData();
}
// END Privacy Page Functions
})();