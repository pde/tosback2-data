if (!window.$h) { window.$h = {}; }

$h.fixedPanel = {
	init: function(){
		this.hideAds();
		
		var ad = $('#fixedPanelAd'),
			footer = $('#fixedPanelFooter'),
			adOffset = $(ad).offset();
			
		$(window).scroll(function(){
			var footerOffset = $(footer).offset(),
				scrollTop = $(window).scrollTop(),
				newTop = scrollTop - adOffset.top,
				height = $(ad).height();
				
			if (scrollTop > adOffset.top) {
				if ((scrollTop + height) > footerOffset.top) {
					$(ad).css('position','absolute')
						.css('top',footerOffset.top - height - adOffset.top + 'px');
				} else {
					if ($.browser.msie && $.browser.version.substr(0,3) == '7.0'){
						$(ad).animate({
							top: newTop
						},10);
					} else {
						$(ad).css('position','fixed')
							.css('top','0px');
					}
				}
			} else {
				$(ad).css('position','absolute').css('top','0');
			}
		});
	},
	hideAds: function(){
		var adsToHide = this.positionList;
		for (i in adsToHide){
			if (typeof pageAds != "undefined"){
				pageAds[adsToHide[i]] = "";
			} else {
				console.log('pageAds is undefined');
			}
		}
	}
}