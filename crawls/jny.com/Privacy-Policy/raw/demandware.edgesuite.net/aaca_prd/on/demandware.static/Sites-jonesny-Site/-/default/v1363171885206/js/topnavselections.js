var topNavSelection = {
	initialize : function() {
		var navElements = $$('#topNavBar li a,#topNavBar2 li a,#secondNavBar li a,#dropdownHolder li a,#topNavNew a');
		var selectedCategoryID = $('currentlySelectedTopCategoryId');
		var selectedSubcategoryID = $('currentlySelectedCategoryId');
		var selectedSubParentID = $('currentlySelectedParentId'); // for AK
		var selectedContentID = $('currentlySelectedContentId');
		var isSearchByAttributesForm = $('isSearchByAttributesForm');
		var isLookbookForm = $('isLookbookForm');
		var isSceneSeenForm = $('isSceneSeenForm');
		var isRewardsForm = $('isRewardsForm');
		
		for (var i = 0; i < navElements.length; i++) {
			var element = navElements[i];
			var params = element.href.toQueryParams();
			// when cgid was not found as a parameter
			// try to parse it from the url
			if((!("cgid" in params) || params.cgid == "") && element.href.match(/([^/]*),[^,]*,sc\.html/)) {
				params.cgid = RegExp.$1;
			}
			// same for cid
			if((!("cid" in params) || params.cgid == "") && element.href.match(/([^/]*),[^,]*,pg\.html/)) {
				params.cid = RegExp.$1;
			}
			var isByAttributeSearch = element.href.indexOf('/Search-ByAttributes') != -1;
			var isLookbook = element.href.indexOf('/LookBook-Show') != -1;
			var isSceneSeen = element.href.indexOf('/SceneSeen-') != -1;
			var isRewards = element.href.indexOf('/NineLoves-') != -1;
			
			if (element.href.endsWith('#')) {
				params.cgid = null;
				params.cid = null;
				isByAttributeSearch = false;
			}

			// category
			if(params.cgid && (selectedCategoryID && selectedCategoryID.value == params.cgid)
					|| (selectedSubcategoryID && selectedSubcategoryID.value == params.cgid)
					|| (selectedSubParentID && selectedSubParentID.value == params.cgid)) {
				element.addClassName('current');
				try {
					if(persistDropDown) {
						$('dropdownHolder').style.display = 'block';
					}
				} catch(err) {}
			} else if (params.cid && (selectedContentID && selectedContentID.value == params.cid)
					|| (selectedSubcategoryID && selectedSubcategoryID.value == params.cid)
					|| (selectedSubParentID && selectedSubParentID.value == params.cid)) {
				element.addClassName('current');
			} else if (isByAttributeSearch && isSearchByAttributesForm && isSearchByAttributesForm.value == 'true') {
				element.addClassName('current');
			} else if (isLookbookForm && isLookbook && isLookbookForm.value == "true") {
				element.addClassName('current');
			} else if (isSceneSeenForm && isSceneSeen && isSceneSeenForm.value == "true") {
				element.addClassName('current');
			} else if (isRewardsForm && isRewards && isRewardsForm.value == "true") {
				element.addClassName('current');
			}
		}
	}
};
if("observe" in document) {
	document.observe('dom:loaded', function() {
		topNavSelection.initialize();
		try{jQuery('#dropdownHolder li a.current.top1').parent().addClass('current');}catch(err){}
	});
}