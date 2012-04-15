/*
 * 
 * 		PLEASE CONTACT GREG TAFF [gt7886]
 * 		BEFORE MAKING ANY CHANGES TO THIS FILE
 * 
 */

 
jQuery.noConflict();
jQuery.support.cors = true;
	
jQuery.getScript = function(url, callback, cache){
	jQuery.ajax({
		type: "GET",
		url: url,
		success: callback,
		dataType: "script",
		cache: cache
	});
};
	
if(typeof HTMLElement != "undefined"){HTMLElement.prototype.__defineGetter__("innerText", function () {return this.textContent})}
jQuery.extend(jQuery.browser,{SafariMobile : navigator.userAgent.toLowerCase().match(/iP(hone|ad)/i)});
var myHostName = window.location.hostname.indexOf("wireless") != -1 ? "www.wireless.att.com" : "www.att.com";




GlobalNav = {
	showCart: false,
	resources: {
		/* 
			if your application will be developing its own resources, define a global scoped object 
			'customGlobalNavResources' with the following members before the DOMReady event.
			the global nav will then use those resources instead of those defined below.
		*/
		segmentationMenu: "http://" + myHostName + "/globalnav/includes/segmentation_menu.jsp",
		userInfo: "http://" + myHostName + "/globalnav/includes/user_info.jsp",
		menuJSON: "http://" + myHostName + "/navservice/navservlet"
	},
	util: {
		offset: function(element){
			var curLeft = 0; 
			var curTop = 0;
			if(element.offsetParent) {
				do {
					curLeft += element.offsetLeft;
					curTop += element.offsetTop;
				} while(element = element.offsetParent)
			}
			return {top:curTop,left:curLeft}
		},
		startsWith: function(s1,s2){return (s1.match("^"+s2)==s2)},
		endsWith: function(s1,s2){return (s1.match(str+"$")==s2)},
		getGNCookie: function() {
			var globalNavCookie = {"UG":[]};
			var allCookies = document.cookie.split('; ');
			for (var i=0;i<allCookies.length;i++) {
				var cookiePair = allCookies[i].split('=');
				var cookieName = cookiePair[0];
				cookiePair.shift();
				var cookieValue = cookiePair.join('=');
				if(cookieName == "GNSESS"){globalNavCookie = new Function("return " + cookieValue)()}
			}
			return typeof globalNavCookie == "object" ? globalNavCookie : {"UG":[]};
		},
		jMerge: function(El){
			/*
				copy members from jQuery object
				to native HTMLEl object.
				
				remain native members:
				blur, focus, children, insertBefore, 
				offsetParent, scrollLeft, scrollTop,
			*/
			var jEl;
			jEl = jQuery(El);
			El = jEl.get()[0];
			
			for(jMember in jEl){
				if(typeof El[jMember] == "undefined"){
					El[jMember] = jEl[jMember];
				}
			}
			return El;
		},
		forceThis: function(fn, thisValue){
			// returns a function whose 'this' keyword is always the same.
			// useful for passing functions as arguments.
			return function(){
				args = Array.prototype.slice.call(arguments);
				fn.apply(thisValue, args);
			}
		},
		numberToWord: ["One", "Two", "Three", "Four", "Five"],
		groomURL: function(url){
			if(	typeof globalNavDefaultSelections != "undefined" && typeof globalNavDefaultSelections.urls != "undefined"){
				if(typeof globalNavDefaultSelections.urls.myAtt != "undefined" && url.match("^/olam")){return globalNavDefaultSelections.urls.myAtt + url}
				if(typeof globalNavDefaultSelections.urls.www != "undefined" && url.match("^/")){return globalNavDefaultSelections.urls.www + url}
			}
			return url;
		},
		createAdvancedAnchor: function(anchor){
			var thisAnchor;
			if(anchor.url != ""){
				thisAnchor = jQuery(document.createElement("a"));
				thisAnchor.html(anchor.displayName);
				thisAnchor.attr("href", GlobalNav.util.groomURL(anchor.url));
			}else{
				thisAnchor = jQuery(document.createElement("a"));
				thisAnchor.addClass("noHref");
				thisAnchor.html(anchor.displayName);
			}
			if(typeof anchor.advanced != "undefined"){
				var attrs = {};
				var flags = anchor.advanced.split(";");
				var surrogate, anchorString;
				
				for(var i = 0; i < flags.length; i++){attrs[flags[i].split("=")[0]] = flags[i].split("=")[1]}
				thisAnchor.attr(attrs);
			}
			if(anchor.windowLocation == "Y"){thisAnchor.attr("target", "_blank")}
			return thisAnchor.get()[0];
		},
		checkInitConditions: function(){if(GlobalNav.SegMenu.isLoaded && GlobalNav.UserInfo.isLoaded){GlobalNav.initialize()}},
		XDsafe:function(options){
			if (jQuery.browser.msie && window.XDomainRequest) {
				if(typeof options.data.locale == "undefined"){options.data.locale = "en_US"}
				if(typeof options.data.userGroups == "undefined" ){options.data.userGroups = ""}
				var ajaxData = "?locale=" + options.data.locale + "&userGroups=" + options.data.userGroups;
				var xdr = new XDomainRequest();
				xdr.open("get", options.url + ajaxData);
				xdr.onload = function() {options.success(xdr.responseText)};
				xdr.onerror = function() {jQuery.ajax(options)}
				xdr.send();
			} else {
				jQuery.ajax(options);
			}
		},
		tieredMenuAjaxOptions:{},
		tieredMenuAjaxMethods:{
			error:function(jXHR, status, err){if(GlobalNav.util.tieredMenuAjaxOptions.url != GlobalNav.resources.failSafeJSON){GlobalNav.util.getTieredMenuJSON(GlobalNav.resources.failSafeJSON)}},
			success:function(data, status, jXHR){
				data = jQuery.parseJSON(data);
				if(!!data.length && data != null){
					jQuery.each(data, function(index,primaryItem){
						if(primaryItem.code == "010000"){GlobalNav.util.addSecondaryItemsFromJSON("primary_Shop",primaryItem);}
						if(primaryItem.code == "020000"){GlobalNav.util.addSecondaryItemsFromJSON("primary_RC",primaryItem);}
						if(primaryItem.code == "030000"){GlobalNav.util.addSecondaryItemsFromJSON("primary_Support",primaryItem);}
					});
					jQuery.each(GlobalNav.finishFunctions, function(){arguments[1]()});
				}else if(typeof GlobalNav.resources.failSafeJSON != "undefined" && GlobalNav.util.tieredMenuAjaxOptions.url != GlobalNav.resources.failSafeJSON){
					GlobalNav.util.getTieredMenuJSON(GlobalNav.resources.failSafeJSON);
				}
			}
		},
		getTieredMenuJSON: function(url){
			var globalNavCookie = GlobalNav.util.getGNCookie();
			var ajaxData = globalNavCookie.UG.length ? {"userGroups":globalNavCookie.UG.join("|")} : {};
			
			if(
				typeof globalNavDefaultSelections != "undefined" && 
				typeof globalNavDefaultSelections.locale != "undefined" 
			){ajaxData.locale = globalNavDefaultSelections.locale}
			
			GlobalNav.util.tieredMenuAjaxOptions = {
				url:url,
				data:ajaxData,
				type: "GET",
				error:GlobalNav.util.tieredMenuAjaxMethods.error,
				success:GlobalNav.util.tieredMenuAjaxMethods.success
			};
			GlobalNav.util.XDsafe(GlobalNav.util.tieredMenuAjaxOptions);
		},
		addSecondaryItemsFromJSON: function(primaryMenuList, JSON){
		
			var secondaryMenuListId, items, secondaryULs;
			
			if(typeof primaryMenuList == "string"){primaryMenuList = document.getElementById(primaryMenuList)}
			if(typeof globalNavDefaultSelections != "undefined" && JSON.code == globalNavDefaultSelections.primary){primaryMenuList.parentNode.addClass("selected"), GlobalNav.SecondaryNav.pinnedMenu = primaryMenuList}
			primaryMenuList.href=GlobalNav.util.groomURL(JSON.url)
			
			secondaryMenuListId = "secondaryMenu_" + primaryMenuList.id.split("_")[1];
			
			secondaryULs = jQuery(".secondaryMenu");
			jQuery.each(secondaryULs, function(index, menu){if(menu.id == secondaryMenuListId){menu.parentNode.removeChild(menu)}});
				
			var menuItem, thisMenuList;
			
			menuItem = GlobalNav.util.jMerge(document.getElementById("primary_" + secondaryMenuListId.split("_")[1]));
			thisMenuList = GlobalNav.util.jMerge(document.createElement("ul"));
			thisMenuList.attr("id", secondaryMenuListId);
			thisMenuList.attr("class", "secondaryMenu");
			
			if(typeof globalNavDefaultSelections != "undefined" && JSON.code == globalNavDefaultSelections.primary){thisMenuList.addClass("selected")}
			
			GlobalNav.tieredNav.insertBefore(thisMenuList, GlobalNav.Tray.contentContainer);
			
			
			menuItem.bind("mouseenter focus", function(){
				GlobalNav.PrimaryNav.mouseInside = true;
				this.mouseInside = true;
				if(!!GlobalNav.SecondaryNav.visibleMenu && this != GlobalNav.SecondaryNav.visibleMenu){GlobalNav.Tray.hide()}
				GlobalNav.SecondaryNav.peek.apply(this);
			});
			menuItem.bind("mouseleave blur", function(){this.mouseInside = false;});
			menuItem.bind("click", GlobalNav.SecondaryNav.pin);
			
			menuItem.unbind("click", GlobalNav.Tray.hide);
			menuItem.unbind("mouseenter", GlobalNav.Tray.hide);
			
			menuItem.data("subMenu", thisMenuList);
			
			items = JSON.children;
			
			jQuery.each(items, function(index, item){
			
				var listItem, anchor, sliceCoordinates;
			
				listItem = jQuery(document.createElement("li"));
				anchor = GlobalNav.util.jMerge(GlobalNav.util.createAdvancedAnchor(item));
				anchor.attr("name", primaryMenuList.id.split("_")[1] + "_" + item.displayName);
				anchor.addClass("secondaryMenuItem");

				listItem.append(anchor);
				thisMenuList.append(listItem);
				
				if(typeof globalNavDefaultSelections != "undefined" && item.code == globalNavDefaultSelections.secondary){listItem.addClass("selected")}
				
				item.columns = [];
				sliceCoordinates = [];
				
				for(var i = 0; i < item.children.length; i++){
					var thisLink = item.children[i];
					if(item.children[i].isHead){sliceCoordinates.push(i)}
				}
				
				sliceCoordinates.push(item.children.length);
				
				for(var i = 0; i < sliceCoordinates.length - 1; i ++){
					
					var thisItem, thisLinkItem;
					
					thisItem = {};
					thisLinkItem =  item.children[sliceCoordinates[i]];
					thisItem.image = thisLinkItem.image;
					thisItem.specialTreatment = thisLinkItem.specialTreatment;
					thisItem.advanced = thisLinkItem.advanced;
					thisItem.isHead = thisLinkItem.isHead;
					thisItem.displayName = thisLinkItem.displayName;
					thisItem.url = thisLinkItem.url;
					thisItem.rows = item.children.slice(sliceCoordinates[i],sliceCoordinates[i+1]);
					item.columns.push(thisItem);
				}
				
				if(item.columns.length){
				
					var content, firstCol, firstColImage, firstColImageAnchor, firstColContent;
				
					content = GlobalNav.util.jMerge(document.createElement("div"));    
					firstCol = jQuery(document.createElement("div"))
					firstColImage = jQuery(document.createElement("img"))
					firstColImageAnchor = jQuery(GlobalNav.util.createAdvancedAnchor(item))
					firstColContent = jQuery(document.createElement("div"))
					
					content.css("display", "none");
					content.addClass("trayContentItem tray" + GlobalNav.util.numberToWord[item.columns.length] + "Col");
					content.append(firstCol);
					
					firstCol.addClass("firstColumn");
					firstColImage.attr({"src": item.image, "alt": item.displayName});
					firstColContent.addClass("columnContent");
					
					firstColImageAnchor.text("");
					firstColImageAnchor.append(firstColImage);
					firstColContent.append(firstColImageAnchor);
					firstCol.append(firstColContent);
					
					jQuery.each(item.columns, function(index, col){
					
						var trayContentDiv, trayCol, trayHeader, trayHeaderAnchor, trayMenu;
						
						trayContentDiv = jQuery(document.createElement("div"));
						trayCol = jQuery(document.createElement("div"));
						trayHeader = jQuery(document.createElement("h3"));
						trayMenu = jQuery(document.createElement("ul"));
				
						trayHeaderAnchor = jQuery(GlobalNav.util.createAdvancedAnchor(col));
						trayHeaderAnchor.attr("name",primaryMenuList.id.split("_")[1] + "_" + item.displayName + "_" + col.displayName);
						
						trayContentDiv.addClass("columnContent");
						if(col.specialTreatment == "myAtt"){trayCol.addClass("myAttCol")}
						trayCol.addClass("secondColumn");
						
						trayMenu.addClass("trayNoBullet");
						
						jQuery.each(col.rows, function(index,menuItem){
							if(index == 0)return;
							var menuListItem, menuAnchor;
							
							menuListItem = jQuery(document.createElement("li"));
							menuAnchor = jQuery(GlobalNav.util.createAdvancedAnchor(menuItem));
							menuAnchor.attr("name",primaryMenuList.id.split("_")[1] + "_" + item.displayName + "_" + menuItem.displayName);
							menuListItem.append(menuAnchor);
							trayMenu.append(menuListItem);
						});
						
						trayHeader.append(trayHeaderAnchor);
						trayContentDiv.append(trayHeader);
						trayContentDiv.append(trayMenu);
						trayCol.append(trayContentDiv);
						content.append(trayCol);
					});
					
					GlobalNav.Tray.contentContainer.append(content);
					
					anchor.bind("mouseenter focus", GlobalNav.Tray.show);
					anchor.data("content", GlobalNav.util.jMerge(content));
					anchor.data("cols", jQuery(content).find(".secondColumn, .firstColumn"));
				}else{listItem.bind("mouseenter", function(){GlobalNav.SecondaryNav.menuListItems.removeClass("selected");GlobalNav.Tray.hide.apply(this);})}
			});
			GlobalNav.Tray.contentItems = jQuery("div.trayContentItem");
			GlobalNav.PrimaryNav.menuLinks = jQuery("a.primaryMenuItem");
			GlobalNav.SecondaryNav.menuLists = jQuery("ul.secondaryMenu");
			GlobalNav.SecondaryNav.menuListItems = jQuery("a.secondaryMenuItem");
		}
	},
	/*
	##################################
	
		Animation
	
	##################################
	*/
	animate:{
		frameLength: 13,
		duration: 70,
		slideUpSubMenu: function (menu){
			menu.data("subMenu").data("shadow").hide();
			var onComplete = GlobalNav.animate.callBacks.subMenuOnHideComplete;
			var onFrame = GlobalNav.animate.callBacks.subMenuOnFrame;
			menu.data("subMenu").css("height", menu.data("subMenu").outerHeight()); 
			menu.data("subMenu").data("ul").css("height", menu.data("subMenu").data("ul").outerHeight()); 
			menu.animation = new GlobalNav.animate.animationObject(menu.data("subMenu"), "height", 0, onComplete, onFrame);
		},
		slideDownSubMenu: function (menu){
			menu.data("subMenu").data("shadow").hide();
			
			var currentULHeight, currentMenuHeight, onFrame, onComplete, finalHeight;
			
			currentULHeight = menu.data("subMenu").data("ul").outerHeight();
			currentMenuHeight = menu.data("subMenu").outerHeight();
			
			if(menu.data("subMenu").css("display") == "none"){currentULHeight = 0;currentMenuHeight = 0;}
			onComplete = GlobalNav.animate.callBacks.subMenuOnShowComplete;
			onFrame = GlobalNav.animate.callBacks.subMenuOnFrame;
			menu.data("subMenu").css("height", "");
			menu.data("subMenu").data("ul").css("height", "");
			finalHeight = menu.data("subMenu").outerHeight();
			menu.data("subMenu").css({"height": currentMenuHeight, "display": "block"});
			menu.data("subMenu").data("ul").css({"height": currentULHeight, "display": "block"});
			menu.animation = new GlobalNav.animate.animationObject(menu.data("subMenu"), "height", finalHeight, onComplete, onFrame);
		},
		animationObject: function (El, prop, end, onComplete, onFrame){
			if(!!El.jquery){El = GlobalNav.util.jMerge(El)}
			
			var frameLength, duration, startValue, travel, frames;
			
			frameLength = GlobalNav.animate.frameLength;
			duration = GlobalNav.animate.duration;
			startValue = El.css(prop).replace (/[^\d\.]/g, "");
			travel = end - startValue;
			frames = duration / frameLength;
			
			if(travel == 0){if(onComplete){onComplete.apply(El)};return;}
			
			this.active = true;
			this.El = El;
			this.frame = 0;
			this.end = end;
			this.prop = prop;
			this.startValue =  startValue/1;
			this.onFrame = onFrame;
			this.onComplete = onComplete;
			this.travel = travel;
			this.travelPerFrame = travel / frames;
			
			this.interval = window.setInterval(GlobalNav.util.forceThis(GlobalNav.animate.tweenFrame, this), frameLength);
			this.finish = setTimeout(
				GlobalNav.util.forceThis(
					function(){
						this.cancel();
						this.El.css(this.prop, this.end);
						if(this.onComplete){this.onComplete.apply(this.El)}
					},
					this
				),
			duration);
			
			this.cancel = function(){this.active = false;window.clearInterval(this.interval);window.clearTimeout(this.finish)}
		},
		tweenFrame: function (){
			if(!this.active)return;
			this.El.css(this.prop, this.startValue + (this.travelPerFrame * this.frame));
			if(!!this.onFrame){this.onFrame.apply(this.El)}
			this.frame++;
		},
		callBacks:{
			subMenuOnFrame: function(){
				var offset = jQuery.browser.msie ? 16 : 13;
				this.data("ul").css({"display": this.css("display"), "height": Math.max(0, this.outerHeight() - offset)});
			},
			subMenuOnShowComplete: function(){
				this.style.height = "";
				this.data("ul").style.height = "";
				this.data("shadow").show();
			},
			secondaryOnFrame: function(){GlobalNav.Tray.shadow.show()},
			subMenuOnHideComplete: function(){
				this.data("shadow").hide();
				this.style.display = "none";
				this.menuItem.removeClass("over");
			},
			secondaryOnComplete: function(){
				GlobalNav.PrimaryNav.menuLinks.each(function(index, menuLink){menuLink.parentNode.removeClass("selected")});
				GlobalNav.SecondaryNav.visibleMenu = false;
				GlobalNav.SecondaryNav.menuLists.removeClass("selected");
				GlobalNav.SecondaryNav.menuListItems.removeClass("selected");
				GlobalNav.SecondaryNav.menuBar.removeClass("TrayDown");
				GlobalNav.SecondaryNav.menuBar.removeClass("selected");
				GlobalNav.SecondaryNav.menuBar.css("height", "");
				GlobalNav.Tray.shadow.show();
			},
			trayOnFrame: function(){GlobalNav.Tray.shadow.show()},
			trayOnShowComplete: function(){
				GlobalNav.Tray.currentCols.css("height", "");
				GlobalNav.Tray.currentContent.css("height", "");
				GlobalNav.Tray.currentCols.css("height", GlobalNav.Tray.currentContent.outerHeight());
				GlobalNav.Tray.currentContent.css("height", GlobalNav.Tray.currentContent.outerHeight());
				GlobalNav.Tray.shadow.show();
			},
			trayOnHideComplete: function(){
				GlobalNav.Tray.contentItems.css("display", "none");
				GlobalNav.Tray.contentContainer.css("height", "0");
				GlobalNav.SecondaryNav.menuBar.removeClass("TrayDown");
				GlobalNav.SecondaryNav.menuListItems.removeClass("selected");
				GlobalNav.Tray.shadow.show();
			}
		}
	},
	UserInfo:{
		isLoaded: false
	},
	/*
	##################################
	
		Segmentation Menu
	
	##################################
	*/
	SegMenu: {
		isLoaded: false,
		initFunctions: [],
		shadowOffsets: {
			msie: {zIndex: 1, top:-6,left:-10,height:-2,width:1}, 
			modern: {zIndex: 1, top:2,left:-3,height:-4,width:0}
		},
		hideSubMenu: function(){
			this.mouseInside = false;
			window.setTimeout(GlobalNav.util.forceThis(function(){
				if(this.mouseInside){return}
				if(!!this.timeout){window.clearTimeout(this.timeout)}
				if(!!this.animation && this.animation.active){this.animation.cancel();}
				if(!!GlobalNav.SegMenu.activeItem){GlobalNav.SegMenu.activeItem.addClass("selectedChevron");}
				GlobalNav.SegMenu.visibleItem = false;
				GlobalNav.animate.slideUpSubMenu(this);
			}, this),150);
		},
		showSubMenu: function(){
			if(!!jQuery.browser.SafariMobile){this.mouseInside = true}
			GlobalNav.SegMenu.visibleItem = this;
			
			if(!!this.animation && this.animation.active){this.animation.cancel()}else{if(this.data("subMenu").style.display == "block"){return}}
			
			var jOffset, jThisWidth, thisSide, rightValue, leftValue;
			
			this.data("subMenu").css({"width":"", "height":"", "display":""});
			this.data("subMenu").data("ul").css({"width":"", "height":"", "display":""});
			
			jOffset = GlobalNav.util.offset(this); 
			jThisWidth = this.outerWidth();
			thisSide = (jOffset.left + (jThisWidth / 2)) > (jQuery(document).width() / 2) ? "right" : "left";
			rightValue = jOffset.left - Math.abs((jThisWidth - this.data("subMenu").outerWidth() - 1) * (this.data("subMenu").outerWidth() > 1));
			leftValue = jOffset.left + 5;
			
			if(jQuery(this.parentNode).hasClass("rightMost")){rightValue += 2}
			
			this.addClass("over");
			this.removeClass("selectedChevron")
			this.data("subMenu").css({"top": jOffset.top + 34, "left": (thisSide == "right") ? rightValue : leftValue});
			GlobalNav.animate.slideDownSubMenu(this);
		},
		mouseIn: function(){
			this.mouseInside = true;
			this.timeout = window.setTimeout(GlobalNav.util.forceThis(GlobalNav.SegMenu.showSubMenu, this),250)
		},
		initialize: function(){
			jQuery.each(this.initFunctions, function(){arguments[1]()});
			
			this.menuListItems.bind("click", function(){
				if(!this.hasClass("hasURL")){return}
				GlobalNav.SegMenu.activeItem = this;
				GlobalNav.SegMenu.menuListItems.removeClass("selected");
				GlobalNav.SegMenu.menuListItems.removeClass("selectedChevron");
				if(this != GlobalNav.SegMenu.visibleItem){this.addClass(this.hasClass("hasSubMenu") ? "selectedChevron" : "selected")};
			});
			
			jQuery.each(this.menuListItems, function(index, menuItem){
				menuItem = GlobalNav.util.jMerge(menuItem);
				menuItem.attr("name", menuItem.innerText);
				
				if(decodeURI(menuItem.href) != decodeURI(document.location.href.split("#")[0] + "#")){menuItem.addClass("hasURL")}
				if(!!menuItem.parentNode.getElementsByTagName("ul").length){
					menuItem.addClass("hasSubMenu")
					menuItem.data("subMenu", GlobalNav.util.jMerge(menuItem.parentNode.getElementsByTagName("div")[0]));
					menuItem.data("subMenu").menuItem = menuItem;
					
					if(!!jQuery.browser.SafariMobile){
						menuItem.bind("mouseenter focus", GlobalNav.SegMenu.showSubMenu);
						menuItem.bind("mouseleave blur", GlobalNav.SegMenu.hideSubMenu);
						menuItem.data("subMenu").bind("mouseenter", GlobalNav.util.forceThis(GlobalNav.SegMenu.showSubMenu, menuItem));
						menuItem.data("subMenu").bind("mouseleave", GlobalNav.util.forceThis(GlobalNav.SegMenu.hideSubMenu, menuItem));
					}else{
						menuItem.bind("mouseenter focus", GlobalNav.SegMenu.mouseIn);
						menuItem.bind("mouseleave blur", GlobalNav.SegMenu.hideSubMenu);
						menuItem.data("subMenu").bind("mouseenter focus", GlobalNav.util.forceThis(GlobalNav.SegMenu.mouseIn, menuItem));
						menuItem.data("subMenu").bind("mouseleave blur", GlobalNav.util.forceThis(GlobalNav.SegMenu.hideSubMenu, menuItem));
						jQuery(menuItem.data("subMenu")).find("a").bind("focus", GlobalNav.util.forceThis(GlobalNav.SegMenu.mouseIn, menuItem));
						jQuery(menuItem.data("subMenu")).find("a").bind("blur", GlobalNav.util.forceThis(GlobalNav.SegMenu.hideSubMenu, menuItem));
					}
					
					menuItem.data("subMenu").data("shadow", new GlobalNav.shadow(menuItem.data("subMenu"), "segHasShadow", GlobalNav.SegMenu.shadowOffsets));
					menuItem.data("subMenu").data("ul", GlobalNav.util.jMerge(menuItem.data("subMenu").getElementsByTagName("ul")[0]));
					document.getElementById("segMenuBar").appendChild(menuItem.data("subMenu"));
					jQuery.each(menuItem.data("subMenu").getElementsByTagName("a"), function(index, item){jQuery(item).attr("name", menuItem.innerText + "_" + item.innerText)})
				}else{menuItem.addClass("hasNoSubMenu")}
			});
		}
	},
	/*
	##################################
	
		Primary Navigation
	
	##################################
	*/
	PrimaryNav: {
		isLoaded: false,
		initFunctions: [],
		shadowOffsets: {
			msie: {zIndex: "-1", top:-27,left:0,height:2,width:2}, 
			modern: {zIndex: "0", top:-20,left:0,height:0,width:-2}
		},
		
		initialize: function(){
			jQuery.each(this.initFunctions, function(){arguments[1]()});
			jQuery.each(GlobalNav.PrimaryNav.menuLinks.get(), function(index, menuItem){
				menuItem = GlobalNav.util.jMerge(menuItem);
				menuItem.appendChild(document.createElement("span"));
				if(GlobalNav.util.jMerge(menuItem.parentNode).hasClass("selected")){GlobalNav.SecondaryNav.pinnedMenu = menuItem};
				
				if(menuItem.parentNode.getElementsByTagName("ul").length){
					var thisUList = GlobalNav.util.jMerge(menuItem.parentNode.getElementsByTagName("ul")[0]);
					GlobalNav.tieredNav.insertBefore(thisUList, GlobalNav.Tray.contentContainer);
					
					menuItem.bind("mouseenter focus", function(){
						GlobalNav.PrimaryNav.mouseInside = true;
						this.mouseInside = true;
						if(!!GlobalNav.SecondaryNav.visibleMenu && this != GlobalNav.SecondaryNav.visibleMenu){GlobalNav.Tray.hide()}
						GlobalNav.SecondaryNav.peek.apply(this);
					});
					menuItem.bind("mouseleave blur", function(){this.mouseInside = false;});
					menuItem.bind("click", GlobalNav.SecondaryNav.pin);
					menuItem.data("subMenu", thisUList);
				}else{
					menuItem.bind("click", GlobalNav.Tray.hide);
					menuItem.bind("mouseenter", GlobalNav.Tray.hide);
				}
			});
			
			GlobalNav.Tray.shadow = new GlobalNav.shadow(GlobalNav.tieredNav, "globalNavHasShadow", GlobalNav.PrimaryNav.shadowOffsets );
			GlobalNav.Tray.shadow.show = function(){
				this.shadowEl.css({
					"position": "relative",
					"left": this.offsets.left,
					"margin": "auto",
					"display": "block",
					"width": Math.max(this.castingEl.outerWidth() + this.offsets.width,0),
					"height": Math.max(this.castingEl.outerHeight() + this.offsets.height,0),
					"top": ((this.castingEl.outerHeight() - 55) * -1) + this.offsets.top
				});
			}
			GlobalNav.tieredNav.bind("mouseenter", function(){GlobalNav.PrimaryNav.mouseInside = true});
			GlobalNav.tieredNav.bind("mouseleave", function(){GlobalNav.PrimaryNav.mouseInside = false;GlobalNav.Tray.hide.apply(this);GlobalNav.SecondaryNav.hide.apply(this);});
		}
	},
	/*
	##################################
	
		Secondary Navigation
	
	##################################
	*/
	SecondaryNav: {
		initFunctions: [],
		hide: function(){
			if(GlobalNav.SecondaryNav.pinnedMenu){
				GlobalNav.SecondaryNav.show.apply(GlobalNav.SecondaryNav.pinnedMenu);
				GlobalNav.SecondaryNav.menuLists.removeClass("selected");
				GlobalNav.SecondaryNav.pinnedMenu.data("subMenu").addClass("selected");
				GlobalNav.PrimaryNav.menuLinks.each(function(index, menuLink){menuLink.parentNode.removeClass("selected")});
				GlobalNav.SecondaryNav.pinnedMenu.parentNode.addClass("selected");
				GlobalNav.SecondaryNav.visibleMenu = GlobalNav.SecondaryNav.pinnedMenu;
			}else{
				if(!!GlobalNav.SecondaryNav.animation && GlobalNav.SecondaryNav.animation.active){GlobalNav.SecondaryNav.animation.cancel()}
				var onComplete = GlobalNav.animate.callBacks.secondaryOnComplete;
				var onFrame = GlobalNav.animate.callBacks.secondaryOnFrame;
				GlobalNav.SecondaryNav.animation = new GlobalNav.animate.animationObject(GlobalNav.SecondaryNav.menuBar, "height", "0", onComplete, onFrame);
			}
			GlobalNav.Tray.shadow.show();
		},
		peek: function(){
			if(!GlobalNav.SecondaryNav.visibleMenu){
				GlobalNav.SecondaryNav.show.apply(this);
			}else{
				window.setTimeout(GlobalNav.util.forceThis(GlobalNav.SecondaryNav.show, this),250);
			}
		},
		pin: function(){
			GlobalNav.SecondaryNav.visibleMenu = this;
			GlobalNav.SecondaryNav.pinnedMenu = this;
			GlobalNav.SecondaryNav.show.apply(this);
		},
		show: function(){
			if(!this.mouseInside)return
			if(!!GlobalNav.SecondaryNav.animation && GlobalNav.SecondaryNav.animation.active){GlobalNav.SecondaryNav.animation.cancel()}
			
			if(!this.data("subMenu").hasClass("selected")){
				GlobalNav.PrimaryNav.menuLinks.each(function(index, menuLink){menuLink.parentNode.removeClass("selected")});
				GlobalNav.SecondaryNav.menuLists.removeClass("selected");
				GlobalNav.SecondaryNav.menuListItems.removeClass("selected");
				GlobalNav.Tray.contentContainer.css("display", "block");
				GlobalNav.SecondaryNav.menuBar = this.data("subMenu");
				GlobalNav.SecondaryNav.visibleMenu = this;
				
				this.data("subMenu").css("height", "");
				this.parentNode.addClass("selected");
				this.data("subMenu").addClass("selected");
			}
			GlobalNav.Tray.shadow.show();
		},
		initialize: function(){
			jQuery.each(this.initFunctions, function(){arguments[1]()});
			jQuery.each(GlobalNav.SecondaryNav.menuListItems.get(), function(index, menuItem){
				menuItem = GlobalNav.util.jMerge(menuItem);
				if(menuItem.parentNode.getElementsByTagName("div").length){
					var thisContent = menuItem.parentNode.getElementsByTagName("div")[0];
					GlobalNav.Tray.contentContainer.append(thisContent);
					
					menuItem.bind("focus", GlobalNav.Tray.show);
					menuItem.bind("mouseenter", GlobalNav.Tray.show);
					menuItem.data("content", GlobalNav.util.jMerge(thisContent));
					menuItem.data("cols", jQuery(thisContent).find(".secondColumn, .firstColumn"));
				}else{
					menuItem.bind("mouseenter", function(){GlobalNav.SecondaryNav.menuListItems.removeClass("selected");GlobalNav.PrimaryNav.mouseInside = true;GlobalNav.Tray.hide.apply(this)});
				}
			});
		}
	},
	/*
	##################################
	
		Flyout Tray
	
	##################################
	*/
	Tray: {
		initFunctions: [],
		hide: function(){
			if(!!GlobalNav.Tray.animation && GlobalNav.Tray.animation.active){GlobalNav.Tray.animation.cancel()}
			var contentEl = GlobalNav.Tray.contentContainer;
			var onFrame =  GlobalNav.util.forceThis(GlobalNav.animate.callBacks.trayOnFrame, this);
			var onComplete = GlobalNav.util.forceThis(GlobalNav.animate.callBacks.trayOnHideComplete, this);
			contentEl.css("height", contentEl.outerHeight());
			GlobalNav.Tray.animation = new GlobalNav.animate.animationObject(GlobalNav.Tray.contentContainer, "height", 0, onComplete, onFrame);
		},
		show: function(){
			if(!!GlobalNav.Tray.animation && GlobalNav.Tray.animation.active){GlobalNav.Tray.animation.cancel()}
			var onComplete = GlobalNav.util.forceThis(GlobalNav.animate.callBacks.trayOnShowComplete, this);
			var onFrame = GlobalNav.util.forceThis(GlobalNav.animate.callBacks.trayOnFrame, this);
			var startHeight = GlobalNav.Tray.contentContainer.outerHeight();
			
			if(typeof GlobalNav.SecondaryNav.menuBar == "undefined"){GlobalNav.SecondaryNav.menuBar = this.parentNode.parentNode}
			
			GlobalNav.Tray.currentContent = this.data("content");
			GlobalNav.Tray.currentCols = this.data("cols");
			GlobalNav.Tray.contentItems.css("display", "none");
			GlobalNav.Tray.currentContent.css({"display": "block", "height": ""});
			GlobalNav.Tray.currentCols.css("height", "");
			GlobalNav.Tray.contentContainer.css("height", "");
			
			var finalHeight = GlobalNav.Tray.contentContainer.outerHeight();
			
			GlobalNav.Tray.currentContent.css("height", Math.max(GlobalNav.Tray.currentContent.outerHeight(),startHeight));
			GlobalNav.Tray.currentCols.css("height", GlobalNav.Tray.currentContent.outerHeight());
			GlobalNav.Tray.contentContainer.css({"height": startHeight, "display": "block"});
			
			GlobalNav.SecondaryNav.menuBar.addClass("TrayDown");
			GlobalNav.SecondaryNav.menuListItems.removeClass("selected");
			this.addClass("selected");
			GlobalNav.Tray.shadow.show();
			GlobalNav.Tray.animation = new GlobalNav.animate.animationObject(GlobalNav.Tray.contentContainer, "height", finalHeight, onComplete, onFrame);
		},
		initialize: function(){
			jQuery.each(this.initFunctions, function(){arguments[1]()});
		}
	},
	initFunctions: [],
	finishFunctions: [],
	initialize: function(){
		if(GlobalNav.successfullyInitialized == true){return}
		var initTieredNav = !!jQuery("#tieredNav").length
		
		this.SegMenu.menuListItems = jQuery("a.segMenuItem");
		this.SegMenu.initialize();
		

		
		if(initTieredNav){
			// retain references to commonly used Elementss.
			this.Tray.contentItems = jQuery("div.trayContentItem");
			this.SecondaryNav.menuLists = jQuery("ul.secondaryMenu");
			this.SecondaryNav.menuListItems = jQuery("a.secondaryMenuItem");
			this.PrimaryNav.menuLinks = jQuery("a.primaryMenuItem");
			this.Tray.contentContainer = GlobalNav.util.jMerge(document.getElementById("trayContent"));
			this.tieredNav = GlobalNav.util.jMerge(document.getElementById("tieredNav"));
			this.PrimaryNav.initialize();
			this.SecondaryNav.initialize();
			this.Tray.initialize();
		}
		
		jQuery("#primary_CartCount").css("display", this.showCart ? "block" : "none");
		jQuery.each(this.initFunctions, function(){arguments[1]()});
		
		if(initTieredNav){this.Tray.shadow.show()}
		GlobalNav.successfullyInitialized = true;
	},
	/*
	##################################
	
		Shadow Object
	
	##################################
	*/
	shadow: function(div, shadowClass, offsets, parentDiv){
		this.shadowEl = GlobalNav.util.jMerge(document.createElement("div"));
		this.castingEl = GlobalNav.util.jMerge(div);
		this.offsets = jQuery.browser.msie ? offsets.msie : offsets.modern;
		this.shadowEl.addClass(shadowClass);
		this.shadowEl.css({
			"display": "none",
			"background": "black",
			"position": "absolute",
			"z-index": this.offsets.zIndex
		});
		this.hide = function(){this.shadowEl.style.display = "none";}
		this.show = function(){
			this.shadowEl.css({
				"width": Math.max(this.castingEl.outerWidth() + this.offsets.width,0),
				"height": Math.max(this.castingEl.outerHeight() + this.offsets.height,0),
				"top": Math.max(GlobalNav.util.offset(this.castingEl).top + this.offsets.top,0),
				"left": Math.max(GlobalNav.util.offset(this.castingEl).left + this.offsets.left,0),
				"display": "block"
			});
		}
		
		if(typeof parentDiv == "undefined"){
			jQuery("#globalNavShadows").append(this.shadowEl)
		}else{
			parentDiv.insertBefore(this.shadowEl, div);
		}
	}
}

jQuery(function(){

	if(!!jQuery.browser.SafariMobile){jQuery("body").addClass("ipad")}
	
	if(typeof customGlobalNavResources != "undefined"){
		for(resource in customGlobalNavResources){
			GlobalNav.resources[resource] = (typeof customGlobalNavResources[resource] != "undefined") ? customGlobalNavResources[resource] : GlobalNav.resources[resource];
		}
	}
	var tieredNav = jQuery("#tieredNav");
	var segMenuBar = jQuery("#segMenuBar");
	var globalNavUserInfo = jQuery("#globalNavUserInfo");
	
	if(tieredNav.length){
		GlobalNav.initFunctions.push(function(){
			if(typeof globalNavDefaultSelections != "undefined" && !globalNavDefaultSelections.useDefaultJSONSource && typeof GlobalNav.resources.failSafeJSON != "undefined"){
				GlobalNav.util.getTieredMenuJSON(GlobalNav.resources.failSafeJSON);
			}else{
				GlobalNav.util.getTieredMenuJSON(GlobalNav.resources.menuJSON);
			}
		});
		GlobalNav.finishFunctions.push(function(){GlobalNav.Tray.shadow.show()});
	}else{
		//global module, or globe only
		GlobalNav.initFunctions.push(function(){jQuery.each(GlobalNav.finishFunctions, function(){arguments[1]()})});
	}
	
	GlobalNav.finishFunctions.push(function(){
		if(typeof globalNavDefaultSelections != "undefined" && typeof globalNavDefaultSelections.urls != "undefined" && typeof globalNavDefaultSelections.urls.urlMap != "undefined" && !jQuery.isEmptyObject(globalNavDefaultSelections.urls.urlMap)){
			jQuery.getScript("//www.att.com/scripts/fixLinks.js", null, true);
		}
	});
	
	if(segMenuBar.length && segMenuBar.find("*").length < 2){segMenuBar.load(GlobalNav.resources.segmentationMenu, function(responseText, textStatus){if(textStatus == "success"){GlobalNav.SegMenu.isLoaded = true;GlobalNav.util.checkInitConditions()}})}else{GlobalNav.SegMenu.isLoaded = true;GlobalNav.util.checkInitConditions()}
	if(globalNavUserInfo.length && globalNavUserInfo.find("*").length < 1){globalNavUserInfo.load(GlobalNav.resources.userInfo, function(responseText, textStatus){if(textStatus == "success"){GlobalNav.UserInfo.isLoaded = true;GlobalNav.util.checkInitConditions()}})}else{GlobalNav.UserInfo.isLoaded = true;GlobalNav.util.checkInitConditions()}
});

var reporting_ready = window.reporting_ready || new jQuery.Deferred();
jQuery.when(reporting_ready).then(function (reporting) {
	reporting.capture([
   		{selector: '#tieredNav a', type: 'wtparam', name: 'wtLinkName'},
		{selector: '#tieredNav a', type: 'wtparam', name: 'wtLinkLoc', value: 'GLBN'},
		{selector: '#tieredNav a', type: 'wtlink', name: '', params: 'wtLinkName,wtLinkLoc', trigger: 'mousedown'},
		{selector: '#segMenuBar a', type: 'wtparam', name: 'wtLinkName'},
		{selector: '#segMenuBar a', type: 'wtparam', name: 'wtLinkLoc', value: 'GLBN_GM'},
		{selector: '#segMenuBar a', type: 'wtlink', name: '', params: 'wtLinkName,wtLinkLoc', trigger: 'mousedown'},
		{selector: '#globalNavUserInfo a', type: 'wtparam', name: 'wtLinkName'},
		{selector: '#globalNavUserInfo a', type: 'wtparam', name: 'wtLinkLoc', value: 'GLBN_AN'},
		{selector: '#globalNavUserInfo a', type: 'wtlink', name: '', params: 'wtLinkName,wtLinkLoc', trigger: 'mousedown'},
		{selector: '#footer a', type: 'wtparam', name: 'wtLinkName'},
		{selector: '#footer a', type: 'wtparam', name: 'wtLinkLoc', value: 'GLBN_FTR'},
		{selector: '#footer a', type: 'wtlink', name: '', params: 'wtLinkName,wtLinkLoc', trigger: 'mousedown'},
		{selector: 'form#searchForm', type: 'wtmeta', name: 'wtAutoSuggestInd', deferred: true,
            value: function() {
            	return jQuery('#autoSuggestBox:isvisible').length ? 'Y' : 'N';
        	}
        }
	]);
});

//global autosuggest code
var client_id = 1;

function split( val ) {
	return val.split( /,\s*?/ );
}

jQuery(window).load(function(){
	var isValidChar = /^[a-zA-Z0-9\,.#& ]{1,}$/;
	
	jQuery('#search').focus(function(){
		if(jQuery(this).val().toLowerCase() == 'search'){
			jQuery(this).val('');
		}
	});
	jQuery('#search').blur(function(){
		var searchStr = jQuery(this).val();
		searchStr = searchStr.replace(/\s+/g, ' ');
		jQuery(this).val(jQuery.trim(searchStr));
		
		if(!isValidChar.test(searchStr)){
			jQuery(this).val('Search');
		}
	});
	validateSearchForm();
	
});

function validateSearchForm(){
	if(jQuery('#search').length != 0){
		jQuery.getScript('//www.att.com/scripts/jquery-ui-1.8.11.custom.min.js', jQuery.fn.autocompleteConfig, true);
	}
	
	jQuery('#searchForm button').click(function(){
		if ( jQuery('#search').val().toLowerCase() == 'search' || jQuery('#search').val() == '') {
			alert('Please enter at least one keyword in the Search box.');
			jQuery('#search').focus();
			return false;
		}
		else{
			jQuery('#searchForm').submit();
		}
	});
	
	jQuery('#searchForm').submit(function(){
		if ( jQuery('#search').val().toLowerCase() == 'search' || jQuery('#search').val() == '') {
			alert('Please enter at least one keyword in the Search box.');
			jQuery('#search').focus();
			return false;
		}
		else{
			return true;
		}
	});
}

(function(jQuery){
	jQuery.fn.autocompleteConfig = function() {
		
		jQuery("#search").autocomplete({

			appendTo:"#autoSuggestBox",
			delay: 0,	
			open: function(event, ui) { jQuery("#autoSuggestBox").show(); var $ui_autocomplete = jQuery(".ui-autocomplete");
			$ui_autocomplete.css("top","0px");
			$ui_autocomplete.css("left","0px");},
			close: function(event, ui) { jQuery("#autoSuggestBox").hide(); },		
			position: { my : "left top", at: "left top", of:"#autoSuggestBox",collision: "fit"},
			select: function(event, ui) {document.getElementById('search').value=ui.item.value; document.getElementById('searchForm').submit();},

			source: function( request, response ) {
				
				jQuery.ajax({
					url: "/global/search/autoSuggest.jsp?q="+jQuery("#search").val(),
					//url: "/shop/sharedSegments/autoSuggest.jsp?q="+jQuery("#search").val(),
					success: function(data){
						if(split(data)==''){jQuery("#autoSuggestBox").hide();return false;}else{
						response( jQuery.each( split(data), function( item ) {
							return {label: item,value: item}}
						
						));
						}}	
					});
				},
			minLength:1
		})
	}
})(jQuery);