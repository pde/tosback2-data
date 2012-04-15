function setSideNavHeight() {
	var objSideNavCategories = $('sideNavCategories');
	var objSideNav = $('sideNav');
	var objContent = $('mainContent');
	if (objSideNavCategories && objSideNav && objContent) {
		if (objContent.offsetHeight > objSideNav.offsetHeight) {
			var intSideNavOuterHeight = objSideNav.offsetHeight - objSideNavCategories.offsetHeight;
			objSideNavCategories.style.height = (objContent.offsetHeight-intSideNavOuterHeight) + 'px';
		} else if (objSideNav.offsetHeight > objContent.offsetHeight) {
			var strHeight = objContent.offsetHeight + (objSideNav.offsetHeight-objContent.offsetHeight) + 'px';
			if (clientBrowser.isIE) {
				objContent.style.height = strHeight;
			} else {
				objContent.style.minHeight = strHeight;
			}
		}
	}
}

Event.observe(window,"load", function() {
	setSideNavHeight();
});

Event.observe(window,"beforeunload", function() {
    if(window['quickLook']) {
	    quickLook.closeRelatedWindows();
    }
});
