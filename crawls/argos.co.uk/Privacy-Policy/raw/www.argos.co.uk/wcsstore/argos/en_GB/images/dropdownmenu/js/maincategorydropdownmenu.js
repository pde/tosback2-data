if (typeof Argos !== "object") { var Argos = {}; }

/**
 * @class Represents a drop down menu
 * @constructor Create a drop down menu
 * @param {Node} ul The root ul node for the drop down menu
 * @param {Object} options The options for the instance
 * @param {String} options.subMenuType The tag name type for the sub menu, default is "ul"
 * @param {String} options.cssActiveClass The active class that is added to the sub menu activator anchor, default "selected".
 * @param {String} options.cssHideClass The hide class for the menu when in off state (position off screen), default "hide".
 * July 2009 - James Baker / Adam Silver
 */
Argos.DropDownMenu = function(ul, options) {
	var ul = ul || null;
	if(!ul) return;
	
	var config = {
		mainTemplateContainer: "outerwrap",
		subMenuType: "div",
		mainNavId : "#mainnav",
		cssCategoryLinkClass: "maincategorylink",
		cssActiveClass: "selected",
		cssActiveClassNoTabbing: "selectednotabbing",
		cssSpecialClass: "specialselected",
		cssHideClass: "hide",
		columnCountObj: "column",
		cssRequiredColumnClass: "requiredcolumns",
		delayShowSubMenuMS: 0, //in ms
		delayHideSubMenuMS: 0, //in ms
		subMenuLoadContainer: "#submenucontainer",
		subMenuObject: "submenu",
		mainNavItems: "li",
		allowSubmenuTabbing: false
	};
	
	//run these adjustments on page completion
	// moves breadcrumb into mainnav for browsel3 and argosgs pages
	// and applies z-index and margin rules to mainnav
	
	/*if($("body").hasClass("browsel3")||$("body").hasClass("argosgs")){
		$("ul#breadcrumb").remove().appendTo(config.mainNavId);	
		$(config.mainNavId).addClass("marginreset");
	}*/

	var IE6 = ($.browser.msie && parseInt($.browser.version) == 6);
	var IE7 = ($.browser.msie && parseInt($.browser.version) == 7);
	var IE8 = ($.browser.msie && parseInt($.browser.version) == 8);
	var FF = ($.browser.mozilla); //needs work to not do it for FF3 etc

	if(typeof options === "object") {
		config.mainNavContainer = (typeof options.mainNavContainer === "string") ? options.mainNavContainer : config.mainNavContainer;
		config.subMenuType = (typeof options.subMenuType === "string") ? options.subMenuType : config.subMenuType;
		config.mainNavId = (typeof options.mainNavId === "string") ? options.mainNavId : config.mainNavId;
		config.cssActiveClass = (typeof options.cssActiveClass === "string") ? options.cssActiveClass : config.cssActiveClass;
		config.cssSpecialClass = (typeof options.cssSpecialClass === "string") ? options.cssSpecialClass : config.cssSpecialClass;
		config.cssHideClass = (typeof options.cssHideClass === "string") ? options.cssHideClass : config.cssHideClass;
		config.columnCountObj = (typeof options.columnCountObj === "string") ? options.columnCountObj : config.columnCountObj;
		config.delayShowSubMenuMS = (typeof options.delayShowSubMenuMS === "number") ? options.delayShowSubMenuMS : config.delayShowSubMenuMS;
		config.delayHideSubMenuMS = (typeof options.delayHideSubMenuMS === "number") ? options.delayHideSubMenuMS : config.delayHideSubMenuMS;
		config.allowSubmenuTabbing = (typeof options.allowSubmenuTabbing === "boolean") ? options.allowSubmenuTabbing : config.allowSubmenuTabbing;
		config.subMenuLoadContainer = (typeof options.subMenuLoadContainer === "string") ? options.subMenuLoadContainer : config.subMenuLoadContainer;
		config.subMenuObject = (typeof options.subMenuObject === "string") ? options.subMenuObject : config.subMenuObject;
		config.mainNavItems = (typeof options.mainNavItems === "string") ? options.mainNavItems : config.mainNavItems;
		config.allowSubmenuTabbing = (typeof options.allowSubmenuTabbing === "boolean") ? options.allowSubmenuTabbing : config.allowSubmenuTabbing;
	}
	
	if(!config.subMenuLoadContainer) return;
	
	//copy classes from subMenuLoadContainer onto the mainnav element
	var subMenuLoadContainerClasses = $(config.subMenuLoadContainer).attr("class");
	$(ul).addClass(subMenuLoadContainerClasses);

	// if we are allowing tabbing through submenus, populate the main nav menu with the submenu objects immediately
	if(config.allowSubmenuTabbing){
		var submenus = $(config.subMenuLoadContainer).find("."+config.subMenuObject);
		for(var i=submenus.length-1; i>=0;i--) {
			//get submenu id value
			matchIDValue = $(submenus[i]).attr("id");
			submenuInsert = $("#"+matchIDValue);
			$(config.mainNavItems+"."+matchIDValue).append(submenuInsert);
		}
	}

	var mainTemplateSpace = $("#"+config.mainTemplateContainer).width();
	if(mainTemplateSpace>991){
		mainTemplateSpace = 991;
	}	
	
	var mainTemplateLeft =  getPageX(document.getElementById(config.mainTemplateContainer));
	var mainTemplateRight = ((mainTemplateSpace+mainTemplateLeft)-2);
		
	var links = $(ul).find("a"), link, subMenu, subLinks, li, subMenuID;
	for(var i=links.length-1; i>=0;i--) {
		
		link = links[i];
		li = $(link).parent("li")[0] || null;
		// if the link hasn't even got an li then don't handle it
		if(!li) continue;
		subMenuID = $(li).attr("rel");
		//if tabbing through submenus allowed
		if(config.allowSubmenuTabbing){
			subMenu = $(li).find(config.subMenuType)[0] || null;
		} else {
			subMenu = $("#"+subMenuID)[0] || null;
		}
		
		
		
		// if the link doesn't have a sub menu then don't handle it
		if(!subMenu) continue;
	
		new AnchorHandler(link, li, subMenu);
	}
	
	//PPK's find element position
	function getPageX(obj) {
		var curleft = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {curleft += obj.offsetLeft;obj = obj.offsetParent;}
		}
		else if (obj.x) curleft += obj.x;
		return curleft;
	}

	function getPageY(obj) {
		var curtop = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {curtop += obj.offsetTop;obj = obj.offsetParent;}
		}
		else if (obj.y) curtop += obj.y;
		return curtop;
	}
	
	function setPageX(elem, pos) {
		elem.style.left = pos + "px";
	}

	function setPageY(elem, pos) {
		elem.style.top = pos + "px";
	}
	
	/**
	 * The abstraction to handle the interaction between a link and the associated sub menu.
	 * @param {Node} link
	 * @param {Node} li
	 * @param {Node} subMenu
	 * @param {Node} subMenuLink
	 */
	function AnchorHandler(link, li, subMenu, subMenuLink) {
		var me = this;
		link = link;
		li = li;
		
		subMenu = subMenu;
		subMenuLink = subMenuLink || link // subMenuLink only exists for links in the sub menu otherwise its the same as link.
			//prep timeouts
		var timeoutShowSubMenu, timeoutHideSubMenu;
		
		var strUserAgent = navigator.userAgent;
		if(strUserAgent.indexOf('Macintosh')>-1){
			$("a." + config.cssCategoryLinkClass).addClass("macintosh");
		}
			
		//submenu show from mainlinks
		if($(link).hasClass(config.cssCategoryLinkClass)){
			$(link).bind("mouseenter", function(){
				
				clearTimeout(timeoutHideSubMenu);
				delayShowSubMenu(config.delayShowSubMenuMS);
			});
		}
		
		//submenu remove following hover off
		$(li).bind("mouseleave", function(){
			delayHideSubMenu(config.delayHideSubMenuMS);
			clearTimeout(timeoutShowSubMenu);		
		});
		
		//submenu show/hides from tabbing (no delay here)
		if(config.allowSubmenuTabbing){
			$(link).bind("focus", showSubMenu);
		} else {
			$(link).bind("focus", noSubMenuTabbing);
		}
		$(link).bind("blur", hideSubMenu);
		
		//enable tabbing through submenus
		subLinks = $(subMenu).find("a");
		for(var j = subLinks.length-1; j>=0;j-- ) {
			$(subLinks[j]).bind("focus", showSubMenu);
			$(subLinks[j]).bind("blur", hideSubMenu);
		}
		
		function delayShowSubMenu(timeoutval) {
			//set timeouts and go
			timeoutShowSubMenu = setTimeout(function(){	
				//insert menu only for main link mouseover and submenu tabbing disallowed
				if(!config.allowSubmenuTabbing){
					$(subMenu).remove().appendTo(li);
				}
				showSubMenu();
				//bind hover action to submenu to keep it alive (kill the timeouts also)
				$(subMenu).bind("mouseenter", function(){
					clearTimeout(timeoutHideSubMenu);
					clearTimeout(timeoutShowSubMenu);
					showSubMenu();
				});				
			}, timeoutval);
		}
		
		function delayHideSubMenu(timeoutval) {
			//set timeouts and go
			timeoutHideSubMenu = setTimeout(function(){	
				hideSubMenu();
				if(!config.allowSubmenuTabbing){
					$(subMenu).remove().appendTo(config.subMenuLoadContainer);	
				}
			}, timeoutval);
		}
	
		function showSubMenu() {
			//if multiple columns in each menu
			var requiredColumns = $(li).find(config.columnCountObj);
			if (requiredColumns.length > 0){
				$(li).addClass(config.cssRequiredColumnClass+requiredColumns.length);
				$(li).find(config.columnCountObj).eq(requiredColumns.length-1).addClass("last");
			}			
			
			$(li).addClass(config.cssActiveClass);
			if($(li).hasClass(config.cssSpecialClass)) {
				$(li).addClass(config.cssSpecialClass+config.cssActiveClass);
			}	
			
			$(subMenu).removeClass(config.cssHideClass);
		
			positionSubMenu();
		}

		function hideSubMenu() {
			if(timeoutShowSubMenu !== undefined || null){
				clearTimeout(timeoutShowSubMenu);
			}
			$(subMenu).css({left: 0 + "px"});
			$(li).removeClass(config.cssActiveClass);
			$(li).removeClass(config.cssSpecialClass+config.cssActiveClass);
			$(li).removeClass(config.cssActiveClassNoTabbing);
			$(subMenu).addClass(config.cssHideClass);
		}
		
		function noSubMenuTabbing() {
			//if multiple columns in each menu
			$(li).addClass(config.cssActiveClassNoTabbing);
			if($(li).hasClass(config.cssSpecialClass)) {
				$(li).addClass(config.cssSpecialClass+config.cssActiveClassNoTabbing);
			}	
		}
		
		function positionSubMenu() {
			//reset boundaries if window resized to below tamplate width
			if(document.body.clientWidth>mainTemplateSpace){
				mainTemplateLeft =  getPageX(document.getElementById(config.mainTemplateContainer));
				mainTemplateRight = ((mainTemplateSpace+mainTemplateLeft)-2);
			} else {
				mainTemplateLeft =  0;
				mainTemplateRight = (mainTemplateSpace);
			}
		
			$(subMenu).css({left: 0 + "px"});
			var subMenuHalf = (($(subMenu).width()/2)-($(li).width()/2));
			var subMenuRight = (getPageX(subMenu)+$(subMenu).width());
			var subMenuLeft = (getPageX(subMenu));
			var subMenuAdjust = subMenuHalf;

			if(subMenuRight>mainTemplateRight) {
				subMenuAdjust = (subMenuRight-mainTemplateRight);
			} else if ((subMenuLeft-subMenuHalf)<mainTemplateLeft) {
				 subMenuAdjust = (subMenuLeft-mainTemplateLeft);
			} 
			
			
			var ie8Adjust = 0;

			//stops 64bit IE8 from misplacing menus
			/* currently not required
			if(IE8){
				ie8Adjust = 3;
				if(navigator.userAgent){
					var strUserAgent = navigator.userAgent;
					if(strUserAgent.indexOf('Windows NT 5.1')>-1){
						ie8Adjust = 3;
					}
				}
			}	
			
			*/
			
			$(subMenu).css({left: -subMenuAdjust + ie8Adjust + "px"});
			$(subMenu).bgiframe();
		}
		
	}
}

$(document).ready(function() {	
	var ulNode1 = $("#mainnav ul")[0] || null;
	new Argos.DropDownMenu(ulNode1, { 	
		mainNavId : "#mainnav",
		cssHideClass: "off",
		cssSpecialClass: "last",
		columnCountObj: "li.column",
		delayShowSubMenuMS: 300,
		delayHideSubMenuMS: 300,
		subMenuLoadContainer: "#dropdownmenus",
		subMenuObject: "submenu",
		mainNavItems: "li",
	 	allowSubmenuTabbing: false
	 });
	 
	var ulNode2 = $("#secondarynavigation ul")[0] || null;
	new Argos.DropDownMenu(ulNode2, { 	
		mainNavId : "#secondarynavigation",
		cssHideClass: "off",
		cssSpecialClass: "last",
		columnCountObj: "li.column",
		delayShowSubMenuMS: 300,
		delayHideSubMenuMS: 300,
		subMenuLoadContainer: "#dropdownmenus",
		subMenuObject: "submenu",
		mainNavItems: "li",
	 	allowSubmenuTabbing: false
	 });
	 
	
});
