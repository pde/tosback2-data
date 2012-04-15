// Tab handling
function setTabs(tabSelector, tabContentParent){
	if ($(tabSelector).length && $(tabContentParent).length) {
		$(tabSelector + ":first").parent().addClass("current");
		$($(tabSelector + ":first").attr("href")).addClass("current");
		$($(tabSelector + ":first").attr("href")).siblings().hide();
		$($(tabSelector + ":first").attr("href")).show();


		$(tabSelector).click(function(){
			$(this).parent().siblings().removeClass("current");
			$(this).parent().addClass("current");
			$(tabContentParent).children().removeClass("current");
			$(tabContentParent).children().hide();
			$(tabContentParent + " " + $(this).attr("href")).addClass("current");
			$(tabContentParent + " " + $(this).attr("href")).show();
			return false;
		});
	}
}
