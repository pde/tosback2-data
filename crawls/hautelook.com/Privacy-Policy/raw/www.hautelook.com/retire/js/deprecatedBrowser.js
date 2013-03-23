$(document).ready(function(){
	var sbWrapper = $("#sb-wrapper");
	sbWrapper.css("left", Math.max(($(window).width()-sbWrapper.width())/2, 0));
	
	$(window).resize(function() {
		sbWrapper.css("left", Math.max(($(window).width()-sbWrapper.width())/2, 0));
	});
	
	var browserType = null;
	
	if($.browser.msie) {
		browserType = "Internet Explorer";
	} else {
		browserType = "Mozilla Firefox";
	}
	
	var upgradeSectionIcon = $("<img>");
	var upgradeSectionLink = $("<a class='upgradeNowButton' target='_blank'><div class='left'><div class='right'><p class='middle'>Upgrade Now</p></div></div></a>");
	var altSectionIcon = $("<img>");
	var altSectionLink = $(document.createElement("a"));
	
	altSectionLink.attr("target", "_blank");
	upgradeSectionIcon.attr("alt", browserType);
	
	if(/Internet Explorer/i.test(browserType)) {
		upgradeSectionIcon.attr("src", "images/deprecated_browser/ie.png");
		upgradeSectionLink.attr("href", "http://windows.microsoft.com/en-US/internet-explorer/download-ie");
		
		altSectionIcon.attr("alt", "Mozilla Firefox");
		altSectionIcon.attr("src", "images/deprecated_browser/firefox_small.png");
		altSectionLink.append("<span>Mozilla Firefox</span>");
		altSectionLink.attr("href", "http://www.mozilla.org/en-US/firefox/update");
	} else {
		upgradeSectionIcon.attr("src", "images/deprecated_browser/firefox.png");
		upgradeSectionLink.attr("href", "http://www.mozilla.org/en-US/firefox/update");
		
		altSectionIcon.attr("alt", "Internet Explorer");
		altSectionIcon.attr("src", "images/deprecated_browser/ie_small.png");
		altSectionLink.append("<span>Internet Explorer</span>");
		altSectionLink.attr("href", "http://windows.microsoft.com/en-US/internet-explorer/download-ie");
	}
	
	var upgradeListItem = $("<li>");
	upgradeSectionLink.prepend(upgradeSectionIcon);
	upgradeListItem.append(upgradeSectionLink);
	
	var upgradeSection = $("#deprecated_browser_container div.upgrade-section");
	upgradeSection.prepend("<h2>" + browserType + "</h2>");
	upgradeSection.find("ul").append(upgradeListItem);
	
	var altListItem = $("<li>");
	altSectionLink.prepend(altSectionIcon);
	altListItem.append(altSectionLink);
	$("#deprecated_browser_container div.alternative-section ul li:first").after(altListItem);
	
	if(/Win/i.test(navigator.platform)) {
		$("#deprecated_browser_container div.alternative-section ul a.safari-link").attr("href", "http://support.apple.com/kb/DL1531");
	}
});
