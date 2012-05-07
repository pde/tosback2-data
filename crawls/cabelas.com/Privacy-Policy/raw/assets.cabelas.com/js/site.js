(function() {
	var site = window.site = {
		data : {
			hideMegaMenu : false,
			megaMenuInterval1 : 500,
			megaMenuInterval2 : 200,
			megaMenuTimeoutOpen : null,
			megaMenuTimeoutClose : null,
			megaMenuOpen : false,
			imageRotatorIntervals : [],
			KEYBOARD : {'LEFT':37, 'RIGHT':39, 'ENTER':13, 'ZERO':96, 'NINE':105, 'BACKSPC':8, 'DEL':46},
			FILTER : {'NUMBERS' : /[^\d]/gi, 'ZIP_CODE' : /[^\d\-]/gi, 'CURRENCY' : /[^\d\.]/gi}
		},
		func : {
			openMegaMenu : function(i) {

				/* Close any open menus */
				site.func.closeMegaMenu();
				
				/* If this button is not active we need to keep the button on. */
				var button = $("img", ".js-defaultHeaderNavigation .js-navLink:eq(" + i + ") > a");
				if( $(button).attr("id") != "js-defaultHeaderButtonActive" )
				{ 
					$(button).triggerHandler("mouseover.button");
					$(button).addClass("js-megaMenuOn").attr("id", "js-defaultHeaderButtonActive");
				}
				/* --------------- */
			
				/* Get the data, get the menu position */
				var thisMenu = $(".js-megaMenu", ".js-defaultHeaderNavigation .js-navLink:eq(" + i + ")");
				var HTMLContent = 	'<div class="megaMenu">' +
									'  <div class="ie6png content">' +
									$(thisMenu).html() +
									'  </div>' +
									'  <div class="ie6png bottom"><!--  --></div>' +
									'</div>';
					
				var position = lib.utils.getPosition( $(thisMenu).parent().parent() )[0];
				position[0] = position[0] - 10;
				position[1] = position[1] + 31;
				
				if( /Firefox/.test(navigator.userAgent) )
				{ position[0]++; position[1]++; }
				/* -------------- */
				
				/* Create the Mega Menu Layer */
				lib.layer.create("#megaMenuLayer", {
					defaultContent : HTMLContent,
					xPos : position[0],
					yPos : position[1],
					callback : function() {
						/* Set menu as on */
						site.data.megaMenuOpen = true;
						
						/* create Events to Close Mega Menu */
						$("#megaMenuLayer").bind("mouseenter", function() {
							clearTimeout( site.data.megaMenuTimeoutClose );
							clearTimeout( site.data.megaMenuTimeoutOpen );
						}).bind("mouseleave", function() {
							clearTimeout( site.data.megaMenuTimeoutClose );
							clearTimeout( site.data.megaMenuTimeoutOpen );
							site.data.megaMenuTimeoutClose = setTimeout(function() { site.func.closeMegaMenu(); }, site.data.megaMenuInterval1 );
						});
						/* -------------------- */
					}
				});
				
			},
			closeMegaMenu : function() {
				/* Remove the Active Button, if we made it active */
				$(".js-megaMenuOn").removeAttr("id").removeClass("js-megaMenuOn").triggerHandler("mouseout.button");
				
				site.data.megaMenuOpen = false;
				lib.layer.remove("#megaMenuLayer");
			},
			filter : function(elem, regExp){
				$(elem).keyup(function(evt){
					//console.log(evt.keyCode);
					var isValidKey = (evt.keyCode >= site.data.KEYBOARD.ZERO && 
							evt.keyCode <= site.data.KEYBOARD.NINE && 
							evt.keyCode != site.data.KEYBOARD.LEFT &&
							evt.keyCode != site.data.KEYBOARD.RIGHT && 
							evt.keyCode != site.data.KEYBOARD.BACKSPC &&
							evt.keyCode != site.data.KEYBOARD.DEL);
					if(!isValidKey){
						$(this).val($(this).val().replace(regExp, ""));
					}
				});
			},
			
			focusFirstField : function(){
				//focuses the first input field on the page
				//console.log('focusing');
				$("div.accountSection input").not("[type=image], [type=hidden], [type=submit]").eq(0).focus();
			}
		},
		init : {
			headerButtons : function() {
				//site.data.activeMenu is set in header_default.jsp
				try {
					$(".js-defaultHeaderNavigation > li > a > img").eq(site.data.activeMenu).addClass('js-defaultHeaderButtonActive');
					btnSrc = $(".js-defaultHeaderNavigation > li > a > img").eq(site.data.activeMenu).attr('src');
					btnSrc = btnSrc.replace('_off.gif', '_on.gif');
					$(".js-defaultHeaderNavigation > li > a").eq(site.data.activeMenu).children('img').attr('src', btnSrc);
				} catch(e){
					
				}
			
				$(".js-defaultHeaderNavigation > li > a").each(function(i) {
					/* Setup the Button */
					var offPath = $("img", this).attr("src");
					var onPath = offPath.replace("_off", "_on");
					new lib.obj.button({
						off: offPath,
						on: onPath,
						hover: onPath,
						hasClick: true,
						hasHover: true,
						activeId: "js-defaultHeaderButtonActive",
						buttonSelector: $("img", this),
						buttonCollectionSelector : ".js-defaultHeaderNavigation img"
					});
					/* ------------------- */
					
					/* for keyboard input */
					$(this).focus(function() {
						$("img",this).triggerHandler("mouseover.button");
					}).blur(function() {
						$("img",this).triggerHandler("mouseout.button");
					});
					/* ----------------- */
			
				});
				
			},
			megaMenu : function() {
				/* Setup the Events to open / close the mega menu */
				$(".js-defaultHeaderNavigation .js-navLink").each(function(i) {
					if( $(".js-megaMenu", this).size() > 0 )
					{ 
						$(this).bind("mouseenter", function() {
							clearTimeout( site.data.megaMenuTimeoutClose );
							clearTimeout( site.data.megaMenuTimeoutOpen );
							site.data.megaMenuTimeoutOpen = setTimeout(function() { site.func.openMegaMenu(i); }, ( site.data.megaMenuOpen ) ? site.data.megaMenuInterval2 : site.data.megaMenuInterval1 ); 
						}).bind("mouseleave", function() {
							clearTimeout( site.data.megaMenuTimeoutClose );
							clearTimeout( site.data.megaMenuTimeoutOpen );
							site.data.megaMenuTimeoutClose = setTimeout(function() { site.func.closeMegaMenu(); }, site.data.megaMenuInterval1 );
						});
					}
				});
				/* ------------ */
			},
			imageRotators : function() {
				$(".js-imageRotator").each(function(i) {
					
					site.data.imageRotatorIntervals[i] = null;
					var thisRotator = this;
					
					// Create the itemFader obj 
					var thisItemFader = new lib.obj.itemFader({
						viewport: ".js-imageRotator:eq(" + i + ")",
						item: ".js-imageRotator:eq(" + i + ") .panel",
						circular : true,
						preFadeCallback : function() { 
							// Show the Panel Link as Active
							$(".js-panelLink", thisRotator).eq(thisItemFader.faderInfo.index).triggerHandler("click.button"); 
						},
						interval : 1000
					});
					
					// Initialize the height (for Safari)
					$("img", thisItemFader.item).one("load",function(){
						var imgHeight = $(thisItemFader.item).find("img").height() + "px";
						$(thisItemFader.viewport).height(imgHeight);
					}).each(function(){
						if(this.complete || (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6))
							$(this).trigger("load");
					}); 
					
					setTimeout(function(){
						// For IE, FOUC
						$(thisItemFader.item).not(":eq(0)").fadeTo(0,0);
						$(thisItemFader.item).eq(0).css({'z-index':'11', 'opacity': '1'});
						$(thisItemFader.item).css({'position':'absolute'});
					},500);
					
										
					// Create the Panel Links as Buttons 
					new lib.obj.button({
						cssButton: true,
						hasClick: true,
						hasHover: true,
						activeId: "js-activeRotatorPanelButton",
						cssOff: "off",
						cssHover: "on",
						cssOn: "on",
						buttonSelector: ".js-imageRotator:eq(" + i + ") .js-panelLink",
						buttonCollectionSelector : ".js-imageRotator:eq(" + i + ") .js-panelLink"
					});
										
					// Setup the Events for clicking a Panel Link 
					$(".js-panelLink", this).each(function(x) {
						$(this).bind("click.imageRotator", function(evt) {
							evt.preventDefault();
							
							// Stop the Rotator
							$(".js-pause", thisRotator).triggerHandler("click.imageRotator");
						
							// Update the Status of the itemFader, and fade it 
							thisItemFader.faderInfo.prevIndex = thisItemFader.faderInfo.index;
							thisItemFader.faderInfo.index = x;
							thisItemFader.fade();
						});
					}).eq( thisItemFader.faderInfo.index ).triggerHandler("click.button");
						
					
					// Setup the Play / Pause events 
					$(".js-play", thisRotator).bind("click.imageRotator", function(evt) {
						evt.preventDefault();
						$(".js-pause", thisRotator).show();
						$(this).hide();
						
						// Start the Rotator 
						clearInterval( site.data.imageRotatorIntervals[i] );
						site.data.imageRotatorIntervals[i] = setInterval(function() {
							thisItemFader.forward();
						}, 5000);
					});
					
					$(".js-play", thisRotator).triggerHandler("click.imageRotator");
					
					$(".js-pause", thisRotator).bind("click.imageRotator", function(evt) {
						evt.preventDefault();
						$(".js-play", thisRotator).show();
						$(this).hide();
						
						// Stop the Rotator
						clearInterval( site.data.imageRotatorIntervals[i] );
					});
					
					// Wait Until All Panel Images have loaded, then start the rotator
					var tempInterval = setInterval( function() {
						if( lib.image.isComplete(".js-imageRotator:eq(" + i + ") img") )
						{ clearInterval(tempInterval); $(".js-play", thisRotator).click(); }
					}, 250);
				}); 
			},
			jsLinks : function() {
				/* Back Link */
				$(".js-backLink").click(function(evt) {
					evt.preventDefault();
					history.back();
				});
				/* Print Link */
				$(".js-printThisPage").click(function(evt) {
					evt.preventDefault();
					window.print();
				});
			},
			genericPopups : function() {
				/* use layers on the widescreen kiosk */
				if ($("body").hasClass("kiosk768")) {
					$("a.js-genericPopup1").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=670&height=800");
						tb_init(me);//pass el to init thickbox
					});
					$("a.js-genericPopup2").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=470&height=800");
						tb_init(me);//pass el to init thickbox
					});
					$("a.js-productPopup").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=670&height=800");
						tb_init(me);//pass el to init thickbox
					});
					$("a.js-videoPopup").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=600&height=550");
						tb_init(me);//pass el to init thickbox
					});
					$("a.js-viewLarger").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=670&height=800");
						tb_init(me);//pass el to init thickbox
					});
					$("a.js-reviewPopup").each(function(){
						var me = $(this);
						var myHref = me.attr("href");
						var sep = myHref.indexOf("?") > -1 ? "&" : "?";
						me.attr("href", myHref + sep + "&TBiframed=true&KeepThis=true&TB_iframe=true&width=670&height=800");
						tb_init(me);//pass el to init thickbox
					});
				} else {
					/* otherwise use popups */
					lib.link.popupWindow("a.js-genericPopup1", { width : 650 , height : 550, scrollbars : 1, resizable : 1});
					lib.link.popupWindow("a.js-genericPopup2", { width : 450 , height : 550, scrollbars : 1, resizable : 1 });
					lib.link.popupWindow("a.js-productPopup", { width: 780, height: 690, scrollbars : 1, resizable : 1 });
					lib.link.popupWindow("a.js-videoPopup", { width : 500 , height : 500, scrollbars : 1, resizable : 1 });
					lib.link.popupWindow("a.js-viewLarger", { width: 780, height: 690, scrollbars : 1, resizable : 1 });
					lib.link.popupWindow("a.js-reviewPopup", { width: 755, height: 550, scrollbars : 1, resizable : 1 });
				}
			},
			imageViewerFunctionality : function() {
				if( $(".js-itemImageViewer").size() > 0 )
				{
					/* Create the Scene7 Viewers */
					var viewers = lib.scene7.func.initViewers({
						scope : ".js-itemImageViewer",
						viewerSelector : ".js-scene7Viewer"
					});
					/* ------------- */
					/* Add the Image Functionality */
					$(".js-itemImageViewer").each(function(i) {
						/* Viewer Functionality */
						$(".js-zoomIn", this).click(function(evt) {
							evt.preventDefault();
							lib.scene7.func.zoomIn( viewers[i] );
						});
						$(".js-zoomOut", this).click(function(evt) {
							evt.preventDefault();
							lib.scene7.func.zoomOut( viewers[i] );
						});
						$(".js-reset", this).click(function(evt) {
							evt.preventDefault();
							lib.scene7.func.reset( viewers[i] );
						});
						/* ----------------- */
						/* Swatches and More Images as buttons */
						new lib.obj.button({
							hasClick: true,
							hasHover: true,
							activeId: "js-activeImage",
							cssButton: true,
							cssOff: "inactive",
							cssOn: "active",
							cssHover: "inactive",
							buttonSelector: ".js-itemImageViewer:eq("+i+") .js-miniImage",
							buttonCollectionSelector : ".js-itemImageViewer:eq("+i+") .js-miniImage"
						});
						/* --------------- */
						/* Swatches / alternate Images when clicked */
						var thisCollection = this;
						$(".swatches .js-miniImage", this).click(function(evt) {
							evt.preventDefault();
							/* set the shown display */
							$(".js-showingSwatch", thisCollection).text( $("img", this).attr("alt") );
							/* Change the Main Image */
							lib.scene7.func.changeImage( viewers[i], $(this).attr("href").split("cImage=")[1], true);
							$(".js-reset").click();
						});
						
						$(".moreViews .js-miniImage", this).click(function(evt) {
							evt.preventDefault();
							/* set the shown display */
							$(".js-showingSwatch", thisCollection).text( $("img", this).attr("alt") );
							/* Change the Main Image */
							lib.scene7.func.changeImage( viewers[i], $(this).attr("href").split("cImage=")[1], true);
							$(".js-reset").click();
						});
						
						$("#js-activeImage", this).triggerHandler("click");
						/* -------------- */
					});
					/* ------------------ */
				}
			},
			paginationSortCompare : function() {
				/* Setup teh "items per page", and "sort by" */
				$(".js-itemsPerPage, .js-sortBy").change(function() {
					window.location = $(this).val();
				});
				/* ------------------- */
				
				/* Setup Compare Functionality */
				$(".js-compareCheckedItems").bind("click.compare", function(evt) {
					evt.preventDefault();
					var params = $(".js-compareCheckbox").serialize();
					if( params == "" ) {
						if (!$('#compareError').length)
							$('#top-errors').append('<div id="compareError" class="errorNotification errorText">There are currently no items selected to compare.</div>');
					}
					else {
						window.location = $(this).attr("href") + "&" + params;
					}
				});

				$(".js-unselectCheckedItems").bind("click.compare", function(evt) {
					evt.preventDefault();
					$(".js-compareCheckbox:checked").removeAttr("checked");
				});

				$(".js-compareAllItems").bind("click.compare", function(evt) {
					evt.preventDefault();

					$(".js-compareCheckbox").attr("checked", true);

					var params = $(".js-compareCheckbox").serialize();
					window.location = $(this).attr("href") + "&" + params;
				});
				/* ------------------- */
			},
			storeFinder : function() {
				$(".js-storeFinderDropdown").change(function() {
					if( $(this).val() != "0" )
					{ window.location = "/stores/store_info.jsp?pageName=" + $(this).val(); }
				});
			}
			
		},
		obj : {
			
			
		}
	};
})();

$(function() {

	/* Header Search Field */
	lib.input.defaultText(".js-searchInput", { defaultText : "keyword or item number" });
	$("input.js-searchInput, input.js-searchWithinResults").focus(function(){
		$(this).select();
	});
	
	/* Footer Email Address Field */
	lib.input.defaultText(".js-footerEmailInput", { defaultText : "enter e-mail address" });
	
	/* if its not in an iframe */
	if(site.data.hideMegaMenu != "true"){
		/* Intialize the Header Navigation Buttons */
		site.init.headerButtons();
	
		/* Initialize the "MegaMenu" functionality */
		site.init.megaMenu();
	} else {
		// if the header and footer are in an iframe, make forms and links break out of the iframe
		$("#defaultHeader a").add("#defaultHeader form").add("#defaultFooter a").add("#defaultFooter form").attr('target', '_top');
	}
	
	/* Initialize any Image Rotator Assets */
	site.init.imageRotators();
	
	/* Initialize any JavaScript links */
	site.init.jsLinks();
	
	/* Initialize Generic Popups */
	site.init.genericPopups();
	
	/* Initialize Any Image Viewer Functionality */
	site.init.imageViewerFunctionality();
	
	/* Initialize the Pagination/Sort/Compare */
	site.init.paginationSortCompare();
	
	/* Init Store Finder (move to store_seach_include.jsp) */
	site.init.storeFinder();
	
	/* focus first field in account section */
	site.func.focusFirstField();
	
});

//Client Requested Functions
function openWindow(url, name) {
	popupWin = window.open(url, name, 'scrollbars=yes,resizable,width=650,height=400,top=50,left=100');
	popupWin.focus();
}
function openWindowBig(url, name) {
	popupWin = window.open(url, name, 'scrollbars=yes,resizable,width=580,height=370,top=50,left=100');
	popupWin.focus();
}

$.urlParam = function(name){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) {
        return "";
    } else {
        return results[1];
    }
};

 function isNumberKey(evt)
 {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
       return false;

    return true;
 }
