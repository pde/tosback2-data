var menuTimer = new Object;
var isInMenu = new Object;
var menuMouseLeaveTimeout = 300;	// in milliseconds

function initializeMenu(menuId) {
	isInMenu[menuId] = false;
	
	hideAllMenus(menuId);
	
	jQuery("#" + menuId + " li").each(function() {
		var menuItem = jQuery(this);
		menuItem.data("menuId", menuId);

		var childMenuId = menuItem.attr("childmenuid");
		if (childMenuId != "") {
			var childMenu = jQuery("#" + childMenuId);
			
			childMenu.data("parentMenuId", menuId);
			childMenu.data("parentMenu", menuItem);
			
			childMenu.hover(
				function() {
					var menuId = jQuery(this).data("parentMenuId");
					resetMenuTimer(menuId);
					isInMenu[menuId] = true;
					jQuery(this).data("parentMenu").addClass("current");
				},			
				function() {
					var menuId = jQuery(this).data("parentMenuId");
					isInMenu[menuId] = false;
					setMenuTimer(menuId);
				}
			);
		}

		menuItem.hover(
			function() {
				var menuItem = jQuery(this);
				var menuId = menuItem.data("menuId");
				resetMenuTimer(menuId);
				isInMenu[menuId] = true;
				hideAllMenus(menuId);
				menuItem.addClass("current");
				showMenu(jQuery(this).attr("childmenuid"));
			},	
			function() {
				var menuId = jQuery(this).data("menuId");
				isInMenu[menuId] = false;
				setMenuTimer(menuId);
			}
		);
	});	
}

function showMenu(childMenuId) {
	if (childMenuId != "") {
		jQuery("#" + childMenuId).show();
	}
}

function hideMenu(childMenuId) {
	if (childMenuId != "") {
		jQuery("#" + childMenuId).hide();
	}
}

function hideAllMenus(menuId) {
	jQuery("#" + menuId + " li").each(function() {
		var menuItem = jQuery(this);
		menuItem.removeClass("current");
		hideMenu(menuItem.attr("childmenuid"));
	});
}

function checkMenuHover(menuId) {
	resetMenuTimer(menuId);
	if (!isInMenu[menuId]) {
		isInMenu[menuId] = false;
		hideAllMenus(menuId);
	}
}

function setMenuTimer(menuId) {
	menuTimer[menuId] = setTimeout(function() {
		checkMenuHover(menuId);
	}, menuMouseLeaveTimeout);
}

function resetMenuTimer(menuId) {
	if (menuTimer[menuId]) {
		clearTimeout(menuTimer[menuId]);
		menuTimer[menuId] = null;
	}
}