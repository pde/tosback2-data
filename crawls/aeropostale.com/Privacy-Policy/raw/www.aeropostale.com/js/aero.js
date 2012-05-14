/* Dom Father
*******************************************************************************/
Df.classPath = "/js/df-1.4/";
Df.importModule(
	// "Df.EmbeddedZoom",
	// following items being moved to ant-min-cat and being removed from here for smaller file-size and lesser number of network round-trips - PMO 1903
	// "Df.Navigation",
	// "Df.Scrollbar",
	// "Df.FlyoutZoom",
	// "Df.Lightbox"
);
/* ESS
*******************************************************************************/
var ess = {};

/* Common
*******************************************************************************/
var store = {};

store.pageId = "";

var qs = new String(window.location.search);
if (qs.startsWith("?")) {
	qs = qs.substring(1);
}
store.queryParams = qs.toQueryParams();

/**
 * Removes the outline in Firefox that appears when an A tag is active with a
 * negative text-indent. The site below describes various fixes. I've used
 * JavaScript to remove it just from those links with the problem rather than
 * setting a style on all links. Don't need to fix those that aren't broken.
 *
 * http://sonspring.com/journal/removing-dotted-links
 */
store.removeOutline = function() {
	if (!Prototype.Browser.Gecko) {
		return;
	}
	var theLinks = $$("a");
	for (var i = 0; i < theLinks.length; i++) {
		var theLink = theLinks[i];
		if (theLink.getStyle("text-indent").startsWith("-")) {
			theLink.setStyle({
				overflow: "hidden"
			});
		}
	}
};
/**
 * Returns the filename of the calling page without the extension.
 * Example: if path is /myPath/myPage.html it would return "myPage".
 */
store.getCurrentFile = function() {
	var path = new String(window.location.pathname);
	var start = path.lastIndexOf("/");
	var end = path.indexOf(".", start);
	return path.substring(start + 1, end);
};
store.isEmpty = function(val) {
	if (typeof val == "undefined") {
		return true;
	}
	if (val == undefined || val == null) {
		return true;
	}
	if (typeof val == "string") {
		return val.length == 0 || val == "null" || val == "undefined" || val == "false";
	}
	return false;
};

store.createTabs = function(tabId) {
	if (!$(tabId)) {
		return;
	}

	var pars = {
		hideClassName: "inactive",
		showClassName: "active"
	};

	try {
		var tabs = new Df.Tabset(tabId, pars);
		var items = tabs.getItems();
		for (var i = 0; i < items.length; i++) {
			items[i].getElement().addClassName(pars.hideClassName);
		}
		tabs.showItem(0);
	} catch(err) {}
};

store.validateEmail = function(name) {
	var regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var elemenet = $(name);
	return elemenet && !store.isEmpty(elemenet.getValue()) && elemenet.getValue().match(regEx);
};

store.validateZip = function(name) {
	var regEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;//US Postal Code
	var regExCa = /^\D{1}\d{1}\D{1}\-?\d{1}\D{1}\d{1}$/;//Canadian Postal Code
	var elemenet = $(name);
	return elemenet && !store.isEmpty(elemenet.getValue()) && (elemenet.getValue().match(regEx) || elemenet.getValue().match(regExCa));
};
/* Ajax
*******************************************************************************/
store.ajax = {};
store.ajax.update = function(container, url, onCompleteFnc) {
	var params = {
		method: "get",
		onFailure: function() { alert("Something went wrong..."); }
	};
	if (onCompleteFnc) {
		params.onComplete = onCompleteFnc;
	}
	new Ajax.Updater(container, url, params);
};
/* Bookmark
*******************************************************************************/
store.bookmark = {};
store.bookmark.createBookmark = function() {

	var links = $$("a[rel=bookmark]");
	for (var i = 0; i < links.length; i++) {
		var link = links[i];

		link.observe("click", function() {
			if (Prototype.Browser.IE) {
				if ($("prod_0")) {
					$("prod_0").setStyle({
						visibility: "hidden"
					});
				}
				if ($("at16lb")) {
					$("at16lb").observe("click", function() {
						if ($("prod_0")) {
							$("prod_0").setStyle({
								visibility: "visible"
							});
						}
					});
					if($("at16pt")) {
						var closeLink = $$("div#at16pt a");
						closeLink[0].observe("click", function() {
							if ($("prod_0")) {
								$("prod_0").setStyle({
									visibility: "visible"
								});
							}
						});
					}
					if($("at16pc")) {
						if ($("at_share")) {
							$$("div#at_share div.at_item").each(function (v) {
								v.observe("click", function (e) {
									if ($("prod_0")) {
										$("prod_0").setStyle({
											visibility: "visible"
										});
									}
								});
							});
						}
					}
				}
			}
			return addthis_sendto();
		});
		link.observe("mouseout", function() {
			addthis_close();
		});
		link.observe("mouseover", function() {
			return addthis_open(this.myself, '', '[URL]', '[TITLE]');
		}.bind({myself: link}));

		link.href = "javascript:void(0);";
	}
};
/* Parametric
*******************************************************************************/
store.leftnav = {};
store.leftnav.expandPrefix = "expandMore_";
store.leftnav.modulePrefix = "module_";
store.leftnav.moreLinkText = "more...";

store.leftnav.addMoreLinks = function() {
	var expandModules = $$(".expandMore");
	for (var i = 0; i < expandModules.length; i++) {
		var expandMore = expandModules[i];
		var theId = expandMore.id.substring(store.leftnav.expandPrefix.length);
		var module = $(store.leftnav.modulePrefix + theId);

		// remove existing more link
		var moduleLinks = module.select("p.more");
		for (var j = 0; j < moduleLinks.length; j++) {
			var link = moduleLinks[j];
			if (link.id.indexOf("more_") >= 0) {
				link.remove();
			}
		}

		// length after more link has been removed
		var moduleLength = module.select("p").length;

		var expandLinks = expandMore.select("p");
		for (var j = moduleLength; j < expandLinks.length; j++) {
			var link = expandLinks[j];
			if (link.id.indexOf("more_") >= 0) {
				continue;
			}
			link.addClassName("more");
			module.appendChild(link);
		}

		// add new more link
		var moreLink = $(document.createElement("p"));
		moreLink.addClassName("moreLink");
		moreLink.update(store.leftnav.moreLinkText);
		moreLink.observe("click", function() {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].removeClassName("more");
			}
			this.myself.remove();
		}.bind({items: module.select(".more"), myself: moreLink}));
		module.appendChild(moreLink);
	}
}
/* More Colors
*******************************************************************************/
store.moreColors = {};
store.moreColors.init = function() {
    setTimeout(function() {
        var prodContent = $('products');
        var prodDiamondFamily = $('productsDiamondFamily');
        var rowHeights = {};
        if(prodContent || prodDiamondFamily){
            var colorCounter = 0;
            while (1) {
                colorCounter++;
                var color = $('colors'+colorCounter);
                if (color) {
                    var dt = color.getElementsBySelector("dt")[0];
                    var rowId = color.readAttribute('data-rowid');
                    var rowHeight = 0;
                    if (typeof(rowHeights[rowId]) != 'number') {
                        rowHeights[rowId] = $(rowId).getHeight();
                    }
                    rowHeight = rowHeights[rowId];

                    if (isPs > -1) {
                        color.setStyle({
                            top: rowHeight - dt.getHeight() - 4 + "px"
                        });
                    }
                    else {
                        color.setStyle({
                            top: rowHeight - dt.getHeight() + "px"
                        });
                    }

                    if (isPs > -1) {
                        new Df.TogglePane(color, {
                            controller: new Df.Ui(dt),
                            eventType: "click",
                            animate: {
                                top: rowHeight - color.getHeight() - 4,
                                time: 500
                            }
                        });
                    }
                    else {
                        new Df.TogglePane(color, {
                            controller: new Df.Ui(dt),
                            eventType: "click",
                            animate: {
                                top: rowHeight - color.getHeight(),
                                time: 500
                            }
                        });
                    }

                    color.setStyle({visibility: 'visible'});
                }
                else {
                    break;
                }
            }

            if (typeof(isLazyLoaded) == 'boolean' && isLazyLoaded == true) {
                if (prodDiamondFamily) {
                    prodDiamondFamily.select('img[data-imgsrc!=""]').each(function(v) {
                        v.src = v.readAttribute('data-imgsrc');
                    });
                } else {
                    prodContent.select('img[data-imgsrc!=""]').each(function(v) {
                        v.src = v.readAttribute('data-imgsrc');
                    });
                }
            }
        }
    }, 500);
};
/* FeaturedProduct on Category page
*******************************************************************************/
store.featProduct = {};
store.featProduct.init = function() {
	// Fix the width of the slider element
	if ($("featured") != null) {
		var Prods = document.getElementById("featured");
		var ProdListItems = Prods.getElementsByTagName("li");
		var width = 0;
		for (var i = 0; i < ProdListItems.length; i++) {
			width += ProdListItems[i].offsetWidth;
		}
		var productSlider = $("product-slider");
		productSlider.style.width = width + "px";

		var ins3 = new Df.Slider("featured");

		ins3.pars.animate = {
			time: 100,
			pause: 20
		};

		ins3.pars.iterateBy = "li";
		ins3.set();
	}
};
/* Gift Cert
*******************************************************************************/
store.giftCert = {};

store.giftCert.familyForm = function() {
	if ($("qtyform")) {
		$("qtyform").onsubmit = function(e) {
			var giftCardsSelected = 0;
			var qtyBoxes = $$("#qtyform select");

			for (var i = 0; i < qtyBoxes.length; i++) {
				var qtyBox = qtyBoxes[i];

				if (parseInt(qtyBox.getValue()) > 0) {
					giftCardsSelected++;
				}
			}
			if (giftCardsSelected == 0) {
				alert("Please select at least one Gift Certificate");
				return false;
			}
			$("prodCounter").update(giftCardsSelected);

			return true;
		};
	}
};
store.giftCert.detailsForm = function() {
	if ($("detailsForm")) {
		$("detailsForm").onsubmit = function(e) {
			var certs = $$("#detailsForm li");
			for (var i = 0; i < certs.length; i++) {
				if ($("rName" + i) && !$("rName" + i).present()) {
					alert("Please enter the recipient's name.");
					$("rName" + i).focus();
					return false;
				}
				if (!store.validateEmail("rEmail" + i)) {
					alert("Please enter a valid email address.");
					$("rEmail" + i).focus();
					return false;
				}
				if ($("from" + i) && !$("from" + i).present()) {
					alert("Please enter the sender's name.");
					$("from" + i).focus();
					return false;
				}
				if ($("msg" + i) && $("msg" + i).present() && $("msg" + i).getValue().length > 120) {
					alert("Please limit your message to 120 characters.");
					$("msg" + i).focus();
					return false;
				}
				if ($("amount" + i) && $("amount" + i).getValue() == 0) {
					alert("Please select a gift certificate amount.");
					$("amount" + i).focus();
					return false;
				}
			}
			return true;
		};
	}
};
store.giftCert.preview = function(i) {
	if ($("detailsForm")) {
		if ($("rName" + i) && !$("rName" + i).present()) {
			alert("Please enter the recipient's name.");
			$("rName" + i).focus();
			return;
		}
		if (!store.validateEmail("rEmail" + i)) {
			alert("Please enter a valid email address.");
			$("rEmail" + i).focus();
			return;
		}
		if ($("from" + i) && !$("from" + i).present()) {
			alert("Please enter the sender's name.");
			$("from" + i).focus();
			return;
		}
		if ($("msg" + i) && $("msg" + i).present() && $F("msg" + i).length > 120) {
			alert("Please limit your message to 120 characters.");
			$("msg" + i).focus();
			return;
		}
		if ($("amount" + i) && $("amount" + i).getValue() == 0) {
			alert("Please select a gift certificate amount.");
			$("amount" + i).focus();
			return;
		}
	}

	var url = "preview.jsp?"
		+ "rName=" + $F("rName" + i)
		+ "&rEmail=" + $F("rEmail" + i)
		+ "&from=" + $F("from" + i)
		+ "&msg=" + $F("msg" + i)
		+ "&amount=" + $F("amount" + i)
		+ "&vendorCode=" + $F("vendorCode" + i)
		+ "&action_type=" + $F("action_type")
		+ "&categoryId=" + $F("categoryId")
		+ "&cp=" + $F("cp")
		+ "&prod_0=" + $F("prod_0");
	store.popup.giftCert(url);
};
store.giftCert.processBadWords = function() {
	if (!$("badWordField")) {
		return;
	}
	var error = $("badWordField").innerHTML;
	$("badWordField").addClassName("hide");
	alert(error);
};

/* Popups
*******************************************************************************/
/**
 * Need for legacy code in cart and checkout.
 */
function showCustomPopUp(url, name, params) {
	window.open(url, name, params);
}
store.popup = {};
store.popup.height = 630;
store.popup.width = 530;
store.popup.standard = "width=" + store.popup.width + ",height=" + store.popup.height
	+ ",toolbar=no,status=no,menubar=no";

store.popup.helpDesk = function(url) {
	window.open(url, "helpdesk", store.popup.standard + ",scrollbars=yes,resizable=yes");
}
store.popup.promo = function(url) {
	window.open(url, "promo", store.popup.standard + ",scrollbars=yes,resizable=no");
};
store.popup.emailFriend = function(url) {
	window.open(url, "emailFriend", store.popup.standard + ",scrollbars=no,resizable=yes");
};
store.popup.emailSignup = function(url) {
	var container = $("emailSignupPage");
	if (!container) {
		container = $(document.createElement("div"));
		container.id = "emailSignupPage";
		$(store.pageId).appendChild(container);
	}
	store.ajax.update(container, "/email/form.jsp", function() {
		var offset = 9;
		var width = $("nav-email").cumulativeOffset().left - offset;
		$("emailSignupPage").setStyle({
			left: width + "px"
		});
		if (!$("emailSignupForm")) {
			return;
		}
		$("emailSignupForm").onsubmit = function(e) {

			var validated = store.emailSignup.validate();
			if(validated) {
				$('emailSignupForm').request({
					onSuccess: function(transport){ 
						$('emailWrapper').update(transport.responseText);
						store.animatedScrollToTop();
					},
					onFailure: function(transport,e) {
						$('emailWrapper').update("Error commmunicating with the server.");
					}
				});	
			}
			
			return false;
		}
	});
};
store.animatedScrollToTop = function() {
	if(document.viewport.getScrollOffsets().top>0) {
		window.scrollBy(0,-40);	
		setTimeout(store.animatedScrollToTop,25);
	}
}

store.popup.sizeChart = function(url) {
	window.open(url, "sizeChart", "width=525,height=345,left=380,top=160,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
};
store.popup.sizeChartWide = function(url) {
	window.open(url, "sizeChart", "width=751,height=345,left=380,top=160,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
};
store.popup.giftCert = function(url) {
	window.open(url, "giftCert", store.popup.standard + ",directories=no,location=no,resizable=no,scrollbars=yes,left=((screen.width- 500)/2),top=((screen.height - 500)/2)");
};

store.popup.resize = function() {
	// default values are for firefox
	var width = store.popup.width;
	var height = store.popup.height;
	if (Prototype.Browser.IE) {
		width += 21;
	}
	if (Prototype.Browser.WebKit) {
		width -= 8;
	}
	window.resizeTo(width, height);
};

/**
 * Transforms links that have a rel attribute to JavaScript links. This is done
 * so that people with JavaScript off will still be able to use links.
 */
store.popup.transform = function() {
	// select all links whose rel attribute contains "popup"
	var links = $$("a[rel~=popup]");
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		link.oldHref = link.href;
		if (link.rel.indexOf("helpdesk") >= 0) {
			link.observe("click", function() {
				store.popup.helpDesk(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
		if (link.rel.indexOf("promo") >= 0) {
			link.observe("click", function() {
				store.popup.promo(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
		if (link.rel.indexOf("email") >= 0) {
			link.observe("click", function() {
				store.popup.emailFriend(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
		if (link.rel.indexOf("sizechart") >= 0) {
			link.observe("click", function() {
				store.popup.sizeChart(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
		if (link.rel.indexOf("widechart") >= 0) {
			link.observe("click", function() {
				store.popup.sizeChartWide(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
		if (link.rel.indexOf("signup") >= 0) {
			link.observe("click", function() {
				store.popup.emailSignup(this.oldHref);
			});
			link.href = "javascript:void(0);";
		}
	}
};
/* Product
*******************************************************************************/
var hasProdAlter = false;

store.product = {};

store.product.selectedColor = 0;
store.product.selectedImage = 0;

// Maximum number of alternate images including the main image
// 2 alt images + 1 main image = 3
store.product.maxAltImages = 3;

store.product.alternateImages = new Array();
store.product.alternateProdImages = new Array();

store.product.createPrint = function() {
	var utils = $("utils");
	if (!utils) {
		return;
	}
	var firstChild = utils.firstDescendant();

	var li = $(document.createElement("li"));
	li.update("Print");
	li.addClassName("print");
	li.observe("click", function() {
		print();
	});
	utils.insertBefore(li, firstChild);
};
store.product.initUtils = function() {
	store.product.createPrint();
	store.bookmark.createBookmark();

	new Df.TogglePane($("alt-images"), {
		controller: new Df.Ui($("seeMoreImages")),
		eventType: "hover",
		treatAsMenu: true,
		showClassName: "show",
		hideClassName: "hide",
		onShow: function() {
			$$('img[id^="alternateSku"]').each(function(v) {
				if (v.src == '' || (v.src.indexOf('null') > -1)) {
					v.up('li').setStyle({display: 'none'});
				} else {
					v.up('li').setStyle({display: 'block'});
				}
			});
		}
	});
};
store.product.outfitSetAddToCartBtnStatus = function() {
	var childProdCount = 0;
	var checkBoxes = $$(".selectItemBox input");
	for (var i = 0; i < checkBoxes.length; i++){
		if (checkBoxes[i].checked) {
			childProdCount++;
		}
	}
	if (childProdCount > 0) {
		$$(".addItemsToBag a.inactive").each(function(node) {
			node.style.display = "none";
		});
	} else {
		$$(".addItemsToBag a.inactive").each(function(node) {
			node.style.display = "block";
		});
	}
};
store.product.outfitInitUtils = function(){
	if ($$(".selectItemBox input")){
		$$(".selectItemBox input").each(function(node){
			node.observe("click", function(e){
				store.product.outfitSetAddToCartBtnStatus();
			});
		});
	}
};
store.product.buildZoom = function() {
	var currentImage = "";

	if (store.product.alternateImages.length > 0) {
		currentImage = store.product.alternateImages[store.product.selectedColor][store.product.selectedImage];
	} else if (store.product.alternateProdImages.length > 0) {
		currentImage = store.product.alternateProdImages[store.product.selectedColor][store.product.selectedImage];
	} else {
		return;
	}
	
	new Df.ImageCache(
		currentImage.main,
		currentImage.enh
	);
    
	var loader2 = $(document.body).e('div', 'bottom', {className:'loader'});
	store.product.img2 = new Df.FlyoutZoom('zoomIn', {
		loader: loader2,
		panelHolder: $('flyOutHolder'),
		panelAnimate: {
			width: 300,
			time: 600,
			ease:Df.Transitions.circInOut
		}
	}).load({
		base: currentImage.main,
		zoom: currentImage.enh
	});
}
store.product.setMainImage = function() {
	if (!$("zoomIn")) {
		return;
	}

	var currentImage = "";

	if (store.product.alternateImages.length > 0) {
		currentImage = store.product.alternateImages[store.product.selectedColor][store.product.selectedImage];
	} else if (store.product.alternateProdImages.length > 0) {
		currentImage = store.product.alternateProdImages[store.product.selectedColor][store.product.selectedImage];
	} else {
		return;
	}

	if ($("mainProductImage")) {
		$("mainProductImage").remove();
		store.product.buildZoom();
	} else {
		new Df.ImageCache(
			currentImage.main,
			currentImage.enh
		);
		store.product.img2.load({
			base: currentImage.main,
			zoom: currentImage.enh
		});
	}
};

// Traverse through the itemMap array to get the colors based on productId
// and build a new array with color ids and descriptions
function getStringColors(pidSku) {
	var pidSkuArray = pidSku.split("|");
	productId = pidSkuArray[0];
	colorId = pidSkuArray[1];

	var strSizes = new Array();
	var j = 0;
	for (var i = 0; i < itemMap.length; i++) {
		if (itemMap[i].pid == productId && itemMap[i].cId == colorId) {
			strSizes[j] = itemMap[i].pid + "|" + itemMap[i].sku;
			j++;
			strSizes[j] = itemMap[i].sDesc;
			j++;
		}
	}
	return strSizes;
}

// Dynamically fill the color dropdown based on the selection
function updateSelector(selector, items) {
	// remove options
	while (selector.hasChildNodes()) {
		selector.removeChild(selector.lastChild);
	}

	for (var i = 0; i < items.length; i++) {
		var option = $(document.createElement("option"));
		option.value = items[i].id;
		option.update(items[i].de);
		selector.appendChild(option);
	}
}

// Populate color array to pass to updateSelector function
function populateSizes(sel_element1, sel_element2) {
	var val = sel_element1;
	var items = new Array();

	if (val == "") {
		var o = new Object();
		o.id = "";
		o.de = "select a size";
		items.push(o);

		updateSelector(sel_element2, items);
		return;
	} else if (val != "-1") {
		var o = new Object();
		o.id = "";
		o.de = "select a size";
		items.push(o);

		var colorArray = getStringColors(val);

		for (var i = 0; i < colorArray.length; i++) {
			o = new Object();
			o.id = colorArray[i];
			o.de = colorArray[++i];
			items.push(o);
		}

		updateSelector(sel_element2, items);
	}
}

function displayAlternate(colorFieldIndex) {
	var imageMap = store.product.alternateImages[colorFieldIndex];
	var altImages = $$("#alt-images img");
	var maxAltImages = Math.min(altImages.length, store.product.maxAltImages);
	
	for (var i = 0; i < maxAltImages; i++) {
		var imageMapItem = imageMap[i];
		var altImage = altImages[i];
		if (!imageMapItem || !(imageMapItem.thn && imageMapItem.main && imageMapItem.enh) || !altImage) {
			if (altImage) {
				altImage.up("li").setStyle({
					display: "none"
				});
			}
			continue;
		}
		altImage.src = imageMapItem.thn;
		altImage.up("li").setStyle({
			display: "block"
		});
	}
}
store.product.swapImage = function(view) {
	store.product.selectedImage = view;
	store.product.setMainImage();
};

/* Email Sign up
*******************************************************************************/
store.emailSignup = {};
store.emailSignup.validate = function() {
	var theForm = $("emailSignupForm");

	if (!store.validateEmail("emailAddress")) {
		alert("Please enter in a valid email address.");
		$("emailAddress").focus();
		return false;
	}
	if (!store.validateEmail("emailVerification")) {
		alert("Please enter in a valid email address.");
		$("emailVerification").focus();
		return false;
	}

	if ($F("emailAddress") != $F("emailVerification")) {
		alert("Please ensure the email addresses match.");
		$("emailVerification").focus();
		return false;
	}

	if (!$("zip").present() || !store.validateZip("zip")) {
		alert("Please enter a valid zip code.");
		$("zip").focus();
		return false;
	}

	if($('male') != null){
		var selectedOption = false;
		var genders = theForm.getInputs("radio", "gender");
		for (var i = 0; i < genders.length; i++) {
			if (genders[i].getValue() != null) {
			selectedOption = true;
			break;
		  }
		}
		if (!selectedOption) {
		alert("Please select a gender.");
		return false;
		}
	}
	
	/*
	selectedOption = false;
	var shopOptions = theForm.getInputs("checkbox", "shopFor");
	for (var i = 0; i < shopOptions.length; i++) {
		if (shopOptions[i].getValue() != null) {
			selectedOption = true;
			break;
		}
	}
	if (!selectedOption) {
		alert("Please select at least one shop for option.");
		return false;
	}
	*/
	return true;
};
store.emailSignup.setForm = function() {
	if (!$("emailSignupForm")) {
		return;
	}
	$("emailSignupForm").onsubmit = function(e) {
		return store.emailSignup.validate();
	}
};
store.emailSignup.checkForm = function() {
	if (!$("emailSignupForm")) {
		return;
	}
	$("emailSignupForm").onsubmit = function(e) {
		email = document.getElementById('emailAddress');
		if (!store.validateEmail(email)) {
			alert("Please enter a valid email address.");
			$(email).focus();
			return false;
		}
		return true;
	}
};
/* Search
*******************************************************************************/
store.search = {};
store.search.kw = null;
store.search.text = "keyword or item #";
store.search.init = function() {
	store.search.kw = $("kw");
	if (!store.search.kw) {
		return;
	}
	store.search.kw.observe("click", function() {
		if (store.search.kw.value == store.search.text) {
			store.search.kw.value = "";
		}
	});
	store.search.kw.observe("blur", function() {
		if (store.search.kw.value == "") {
			store.search.kw.value = store.search.text;
		}
	});
};
store.search.swapImage = function(regImg, index) {
	var curProdImg = $("prodShot_" + index);
	if (curProdImg) {
		curProdImg.src = regImg;
	}
};
store.search.SwapUrl = function(UrlImg, colorid, prodid, x) {
	var prodAnchorMain = $("ANCHOR_" + prodid + "_main");
	var prodAnchorSwatch = $("ANCHOR_" + prodid + "_" + x);
	if (prodAnchorMain) {
		prodAnchorMain.href = UrlImg + "&cid=" + colorid;
	}
	if (prodAnchorSwatch) {
		prodAnchorSwatch.href = UrlImg + "&cid=" + colorid;
	}
};
/* Store Locator
*******************************************************************************/
store.locator = {};
store.locator.addOnSubmits = function() {
	if ($("storeSearchForm")) {
		$("storeSearchForm").onsubmit = function(e) {
			var pc = $("postalCode_usa");
			var pcValue = pc.value;
			var noNum = false;

		while (pcValue.charAt(0) == ' '){
			pcValue = pcValue.substring(1);
		}
		while (pcValue.charAt(pcValue.length-1) == ' '){
			pcValue = pcValue.substring(0,pcValue.length-1);
		}

		if (pcValue == '' || pcValue.length > 7)
		{
			alert('Please enter a valid postal code to search by postal code.');
		    return false;			
		}

    		 pc.value = pcValue;
			for (j=0; j < pc.value.length; j++)
			{
				if(isNaN(parseInt(pc.value.charAt(j))))
				{
					noNum = true;
					break;
				}
			}
			if (pcValue.length != 5 || noNum) {
				alert("Please enter a valid postal code to search by.");
				pc.focus();
				return false;
			}
			return true;
		};
	}
	/* SMP 7157 :: functionality removed */
	 
	if ($("storeSearchForm2")) {
		$("storeSearchForm2").onsubmit = function(e) {
			var city = $("city_usa");
			var searchType = $("searchType_usa");
			if (city.value == "") {
    			searchType.value = "STATE"; 
			} else {
   				searchType.value = "CITY_STATE"; 
			}
			return true;
		};
	}
	if ($("storeSearchForm3")) {
		$("storeSearchForm3").onsubmit = function(e) {
			var pc = $("postalCode_ca");
			var pcValue = pc.value;
			var zipNotOk = false;

	while (pcValue.charAt(0) == ' '){
		pcValue = pcValue.substring(1);
	}
	while (pcValue.charAt(pcValue.length-1) == ' '){
		pcValue = pcValue.substring(0,pcValue.length-1);
	}
	 pc.value = pcValue;
	if (pcValue == '' || pcValue.length > 7)
    {
        alert('Please enter a valid postal code to search by postal code.');
	
			return false;
		
    }
	else{
		for (i = 0; i < pcValue.length; i++)
         {
			if (((pcValue.charAt(0) >= "a" && pcValue.charAt(0) <= "z") || (pcValue.charAt(0) >= "A" && pcValue.charAt(0) <= "Z"))) 
			{
				var canadianZipRegularExpression = /^[a-cehj-npr-tvxy]\d[a-z](\s|-)?\d[a-z]\d$/i;
					if(canadianZipRegularExpression.test(pcValue))

					{    				
					   if(pcValue.length > 5 && pcValue.charAt(3) != " ")

						 {
							pc.value = pcValue.substring(0,3) + " " + pcValue.substring(3,pcValue.length);   
							
						 }
					}
					else 

					{
					 zipNotOk = true;

					}
					break;
			   }
			   else 

					{
					 zipNotOk = true;

					}
		  }
	}

			if (pcValue.length == "" || zipNotOk) {
				alert("Please enter a valid postal code to search by.");
				pc.focus();
				return false;
			}
			return true;
		};
	}
	if ($("storeSearchForm4")) {
		$("storeSearchForm4").onsubmit = function(e) {
			var city = $("city_ca");
			var searchType = $("searchType_ca");
			if (city.value == "") {
    			searchType.value = "STATE"; 
			} else {
   				searchType.value = "CITY_STATE"; 
			}
			return true;
		};
	}
};
/* Cart Cross Sells
*******************************************************************************/
store.cart = {
	crossSells: function() {
		var cartRR = $("cart_rr");
		var cartCS = $$('#cartItems td[width="150"]');
		if (cartRR != undefined && cartRR.innerHTML != '' && cartCS.length > 0) {
			$$('#content > table').invoke('writeAttribute', { width: 790 });
			cartCS[0].update('<table border="0" width="150" cellspacing="0" cellpadding="0" align="center"><tr><td id="cart-cross-sells-container" bgcolor="#EAEAEA"></td></tr></table>');
			$('cart-cross-sells-container').update(cartRR.remove());
		}
	}
};

/* Start Up
*******************************************************************************/
/**
 * My thinking with the startup code is that the body has an id. The id is
 * determined and used to see if there is a method assigned to the startup
 * object. If there is a property of the same name as the id of the body id
 * then call that method. All you need to do is add a property to the startup
 * object. The window onload will take care of the rest.
 *
 * Example:
 * store.startup["familyPage"] = function() {
 *     alert("This is a family page.");
 * };
 */
store.startup = {};
store.startup["common"] = function() {
	store.removeOutline();
	store.popup.transform();
	store.search.init();
	if ($("my-bag-anchor")) {
		$("my-bag-anchor").observe("mouseover", function(){showMiniCart();});
	}
	if (Prototype.Browser.IE) {
		var footer = $("footer");
		if (footer) {
			footer.setStyle({
				position: "relative"
			});
			footer.setStyle({
				position: "absolute"
			});
		}
	}
};
store.startup["familyPage"] = function() {
	$$("select[name=s]").each(function(v){
		v.observe('change', function() {
		 // get the current URL
			var sParam = this.value;
			var url = window.location.toString(); //get the parameters 
			url.match(/\?(.+)$/); 
			var base = url.substring(0,url.indexOf("?")+1);
			var params = RegExp.$1;
			// split up the query string and store in an 
			// associative array 
			var params = params.split("&"); 
			var queryStringList = {}; 
			for(var i=0;i<params.length;i++) { 
				var tmp = params[i].split("=");
				if(i!=0 && tmp[0]!="s") {
					base = base + "&";
				}
				if(tmp[0]!="s" && tmp[0]=="page"){
					base = base + "page=1";
				}
				else if(tmp[0]!="s" && tmp[0]!="page") {
					base = base + params[i];
				} 

			}
			base = base + "&s=" + sParam;
			window.location.href = base;
		});
	});

	$$("select[name=f]").each(function(v){
		v.observe('change', function() {
			if(this.value=='') {
				window.location.href = ck.family.defaultURL;
			} else {
				window.location.href = this.value;
			}
		});
	});

	store.moreColors.init();
};
store.startup["familyPage_diamondFamily"] = function() {
	$$("select[name=sort]").each(function(v){
		v.observe('change', function() {
		 // get the current URL
			var sParam = this.value;
			var url = window.location.toString(); //get the parameters 
			url.match(/\?([^#]+)(.*)/); 
			var base = url.substring(0,url.indexOf("?")+1);
			var params = RegExp.$1;
			var anchor = RegExp.$2;
			// split up the query string and store in an 
			// associative array 
			var params = params.split("&"); 
			var queryStringList = {}; 
			for(var i=0;i<params.length;i++) { 
				var tmp = params[i].split("=");
				if(i!=0 && tmp[0]!="sort") {
					base = base + "&";
				}
				if(tmp[0]!="sort" && tmp[0]=="page"){
					base = base + "page=1";
				}
				else if(tmp[0]!="sort" && tmp[0]!="page") {
					base = base + params[i];
				} 

			}
			if (sParam.length >= 1) {
				base = base + "&sort=" + sParam;
			}
			if (anchor && anchor.length >= 1) {
				base = base + anchor;
			}
			window.location.href = base;
		});
	});

	$$("select[name=fsize]").each(function(v){
		v.observe('change', function() {
		 // get the current URL
			var fParam = this.value;
			var url = window.location.toString(); //get the parameters 
			url.match(/\?([^#]+)(.*)/); 
			var base = url.substring(0,url.indexOf("?")+1);
			var params = RegExp.$1;
			var anchor = RegExp.$2;
			// split up the query string and store in an 
			// associative array 
			var params = params.split("&"); 
			var queryStringList = {}; 
			for(var i=0;i<params.length;i++) { 
				var tmp = params[i].split("=");
				var isNotFParam = (tmp[0]!="fsize" && tmp[0]!="filter" && tmp[0]!="searchBySize" && tmp[0]!="fCat" && tmp[0]!="fDomain");
				if(i!=0 && isNotFParam) {
					base = base + "&";
				}
				if(isNotFParam && tmp[0]=="page"){
					base = base + "page=1";
				}
				else if(isNotFParam && tmp[0]!="page") {
					base = base + params[i];
				} 

			}
			
			if (fParam.length >= 1) {
				base = base + "&fsize=" + fParam;
				var fForm = $("fsize-form");
				if (fForm) {
					if (fForm.filter) {
						base = base + "&filter=" + fForm.filter.value;
					}
					if (fForm.searchBySize) {
						base = base + "&searchBySize=" + fForm.searchBySize.value;
					}
					if (fForm.fCat) {
						base = base + "&fCat=" + fForm.fCat.value;
					}
					if (fForm.categoryId) {
						base = base + "&categoryId=" + fForm.categoryId.value;
					}
					if (fForm.fDomain) {
						base = base + "&fDomain=" + fForm.fDomain.value;
					}
				}
			}
			if (anchor && anchor.length >= 1) {
				base = base + anchor;
			}
			window.location.href = base;

/*
			alert($("fsize-form")+"\n"+this.value);
			return false;
			if(this.value=='') {
				window.location.href = ck.family.defaultURL;
			} else {
				window.location.href = this.value;
			}
*/
		});

	});

    $$('#sidebar-left ul.subsubsubcategory').each(function(ul) {
        ul.observe('click', function(event) {
            var element = Event.element(event);
            if (element.tagName.toLowerCase() == 'a') {
                var par = element.up();
                var siblings = par.siblings();
                var count = siblings.length;
                par.addClassName('active');
                for(var i = 0; i < count; i++) {
                    if (siblings[i].hasClassName('active')) {
                        siblings[i].removeClassName('active');
                    }
                }
            }
        });
    });

    $$('#content div.products div.row-head').each(function(div) {
        div.observe('click', function(event) {
            var element = Event.element(event);
            if (element.tagName.toLowerCase() == 'a') {
				var hash = element.readAttribute('href');
				if (typeof hash == 'string' && hash.indexOf('top') >= 0) {
					$$('#sidebar-left ul.subsubsubcategory').each(function(ul) {
						var children = ul.childElements();
						var count = children.length;
						for(var i = 0; i < count; i++) {
							if (children[i].hasClassName('active')) {
								children[i].removeClassName('active');
							}
						}
					});
				}
            }
        });
    });

	if (typeof location.hash == 'string' &&  location.hash.length >= 1 && location.hash.indexOf('#top') == -1) {
		$$('#sidebar-left ul.subsubsubcategory').each(function(ul) {
			var children = ul.childElements();
			var count = children.length;
			for(var i = 0; i < count; i++) {
				var onPageAnchor = children[i].down('a').readAttribute('href');
				if (typeof onPageAnchor == 'string' && onPageAnchor.indexOf(location.hash) >= 0) {
	                children[i].addClassName('active');
					throw $break;
				}
			}
		});
	}

	store.moreColors.init();
};
store.startup["categoryPage"] = function() {
	store.featProduct.init();
};
store.startup["emailSignupPage"] = function() {
	store.emailSignup.setForm();
};
store.startup["emailSignupOverlay"] = function() {
	store.emailSignup.checkForm();
};
store.startup["giftCertPage"] = function() {
	store.giftCert.familyForm();
	store.giftCert.detailsForm();
	store.giftCert.processBadWords();
};
store.startup["productPage"] = function() {
	store.product.initUtils();
	store.createTabs("product-details");
	// this will add the click observer for outfits page
	store.product.outfitInitUtils();
	if ($("orderFormProd")) {
		$("orderFormProd").onsubmit = function(e) {
			return verifyFields();
		};
	}
	store.product.setMainImage();
};
store.startup["searchPage"] = function() {
	store.leftnav.addMoreLinks();
	store.moreColors.init();
};
store.startup["storeLocatorPage"] = function() {
	store.locator.addOnSubmits();
	store.createTabs("locator-tabs");
};
store.startup["cart"] = function() {
	store.cart.crossSells();
};
/* Window Loader
********************************************************************************/
Event.observe(window, "load", function() {
	store.pageId = document.body.id;
	if (store.startup["common"]) {
		store.startup["common"]();
	}
	// This section looks in the startup array for any method with the
	// same name as the body id. If found, then this will run that method.
	if (store.startup[store.pageId]) {
		store.startup[store.pageId]();
	}

    // make rv and cs of same height ... if they both are on this page
    if($("product_rr") && $("recently-viewed")){
        if ($("product_rr").down("div#cross-sells")){
            var csh = $("product_rr").down("div#cross-sells").getHeight() - 8;//8 = 4+4(top and bottom border)
            var rvh = $("recently-viewed").getHeight() - 8;//8 = 4+4(top and bottom border)
            if (csh>rvh){
                $("recently-viewed").setStyle({
                    'height':csh+'px'
                });
            }else{
                $("product_rr").down("div#cross-sells").setStyle({
                    'height':rvh+'px'
                });
            }
        }
    }
});

$(document).observe("dom:loaded", function(e) {
	$(document.body).observe("click", function(ee) {
		Df.Anchor.rewriteHandler(ee);
	});
});

/* Aero Mall Crawl
******************************************************************************/
function functionName(open, height){
	if(open){
		$('aero_rd09_globalLeftPromoSlot_1').setStyle({
		height: height +'px',
		zIndex: 100
		})
	} else {
		$('aero_rd09_globalLeftPromoSlot_1').setStyle({
		height: '31px',
		zIndex: 0
		})
	}
}

/* Break-out feature for 50% off sale (2/21/2011)
 * This can be removed when the promo is over.
******************************************************************************/
function showBreakOutFlash(flashURL) {
	$('content-wrapper').insert('<div id="breakout-flash" style="position: absolute; left: -60px; top: 105px;"></div>');
	var so = new SWFObject(flashURL, 'breakout-flash', '322', '359', '10', '#ffffff');
	so.addParam('wmode', 'transparent');
	so.addParam('menu', 'false');
	so.write('breakout-flash');
	$('breakout-flash').insert(
		'<img src="/images/pixel.gif" width="322" height="359" border="0" usemap="#breakout" style="position: absolute; left: 0;">' +
		'<map name="breakout">' +
		'<area shape="poly" coords="175,307,176,327,218,323,216,303,175,307" href="/family/index.jsp?categoryId=3536103&amp;cp=3534618.3534619.3534624.3542203">' +
		'<area shape="poly" coords="5,27,289,1,320,333,33,359,5,27" href="/family/index.jsp?categoryId=3536151&amp;cp=3534618.3534619.3534623.354105050">' +
		'</map>'
	);
}

/**
*
*******************************************************************************/
var  fiftyOne = {};

fiftyOne.disableOGC = function() {
	if($('qtyform') || $('gcform')) {
		var qty = $$('.item select');

		for(i=0;i<qty.length;i++) {
			qty[i].setAttribute('disabled','disabled');
		}
		
		if($('submitButton')){
			$('submitButton').addClassName("disabled");
		}
		
		if($('addToBag')){
			$('addToBag').addClassName("disabled");
		}
		
		if($('continue')){
			$('continue').addClassName("disabled");
		}
	}
	
	if($('gcContent')) {
		var selects = $$('#gcContent select');
		var inputs = $$('#gcContent input');
		var textarea = $$('#gcContent textarea');
		
		for(i=0;i<selects.length;i++) {
			selects[i].setAttribute('disabled','disabled');
		}
		
		for(i=0;i<inputs.length;i++) {
			inputs[i].setAttribute('disabled','disabled');
		}
		
		for(i=0;i<textarea.length;i++) {
			textarea[i].setAttribute('disabled','disabled');
		}
	}
	
	if($('detailsForm')) {
		var selects = $$('#detailsForm select');
		var inputs = $$('#detailsForm input');
		var textarea = $$('#detailsForm textarea');
		
		for(i=0;i<selects.length;i++) {
			selects[i].setAttribute('disabled','disabled');
		}
		
		for(i=0;i<inputs.length;i++) {
			inputs[i].setAttribute('disabled','disabled');
		}
		
		for(i=0;i<textarea.length;i++) {
			textarea[i].setAttribute('disabled','disabled');
		}
	}

}

var firstLoad = true;
var currencies = [];
var onLoad = false;

function setIntlShippingCountryName(){
	
	var selCountryObj = document.getElementById('selCountry');
	var selCountryIndex = selCountryObj.selectedIndex;
	var selCountry=selCountryObj.options[selCountryIndex].value;

	var selCurrencyObj = document.getElementById('selCurrency');
	var selCurrencyIndex = selCurrencyObj.selectedIndex;
	var selCurrency=selCurrencyObj.options[selCurrencyIndex].value;
	
	

	//document.cookie="COUNTRY_NAME"+"="+selCountry;
	var res = new Ajax.Request('/include/intlSetCountryCurrency.jsp',
	  {
		method:'get',
		parameters:{selCountry: selCountry, selCurrency: selCurrency},
		onSuccess: function(transport){
		  var response = transport.responseText || "no response text";
		 
		 	
		 var currentPage = document.URL;
		 //if (currentPage.indexOf("international") == 36 ||  currentPage.indexOf("international") == 37) { // 36 and 37 needed for sandbox testing
		 if (currentPage.indexOf("international") == 27 ||  currentPage.indexOf("international") == 28 || currentPage.indexOf("international") == 38 ||  currentPage.indexOf("international") == 39) {
			window.location.href = '/';
		 } else {
			Df.Lightbox.hide();
			document.location.reload();
		 }
		},
		onFailure: function(){ alert('Something went wrong...') }
	  });

}


function setIntlShippingCurrency(onLoad){
	if (firstLoad) {
			firstLoad = false;
			var selCurrency = document.getElementById("selCurrency");
			if (selCurrency.length > 0){
				for (var k = 0; k < selCurrency.length; k++) {					
					currencies.push(selCurrency[k].text + "|" + selCurrency[k].value)
				}
			}
	}


	var selCountryObj = document.getElementById('selCountry');
	var selCountryIndex = selCountryObj.selectedIndex;
	var selCountry=selCountryObj.options[selCountryIndex].value;

	var selCurrencyObj = document.getElementById('selCurrency');
	var selCurrencyIndex = selCurrencyObj.selectedIndex;
	var selCurrency=selCurrencyObj.options[selCurrencyIndex].value;

	
	if(selCountry=='United States' || selCountry=='Canada' || selCountry=='UNITED STATES' ||selCountry=='CANADA'){
		var tempCurrencyArray=new Array();
		tempCurrencyArray.push('US Dollar (USD)|US Dollar (USD)');
		populateDropdown('selCurrency', tempCurrencyArray);
	}
	else{
		populateDropdown('selCurrency', currencies);
	}

         var res = new Ajax.Request('http://'+window.location.hostname+'/include/intlShippingCurrency.jsp',
           {
                 method:'get',
                 parameters:{selCountry: selCountry},
                 onSuccess: function(transport){

					var response = transport.responseText || "no response text";

					var str = response.split("\n");

					for ( var i = 0; i < selCurrencyObj.options.length; i++ ) {

						/*if ( selCurrencyObj.options[i].value == str[3] ) {  */
						if(onLoad &&  selCurrencyObj.options[i].value == selCurrency ){
							selCurrencyObj.options[i].selected = 'selected';
							return;
						}
						else if ( !onLoad && selCurrencyObj.options[i].value == str[5] ) {
							selCurrencyObj.options[i].selected = 'selected';
							return;
						}
					}

					/* document.getElementById('selCurrency').value= response;*/

					document.getElementById('selCurrency').value= response;
				},
				onFailure: function(){ alert('Something went wrong...') }
			});

	}

	function populateDropdown(elementId, attribArray){
		var selectElement = document.getElementById(elementId);
		selectElement.disabled = false;
		deleteSelectBoxData(elementId);
		var i;
		for(i = 0; i < attribArray.length; i++){
			var val = attribArray[i].split("|");
			var newOptionElement = document.createElement("option");
			newOptionElement.text = val[0];
			newOptionElement.value = val[1];
			try {
				selectElement.add(newOptionElement, null); // standards compliant
			}
			catch (ex){
				selectElement.add(newOptionElement); // IE only
			}
		}
	}

	function deleteSelectBoxData(elementId){
		var selectElement = document.getElementById(elementId);
		
		var k;
		if (selectElement.length > 0){
			for (k = selectElement.length - 1; k >= 0; k--){					
				selectElement.remove(k);
			}
		}
	}
	
	
	$(document).observe("dom:loaded", function(e) {

	if(typeof international != 'undefined') {
		if($$('a.pagelink')[0]) {
			$$('a.pagelink')[0].observe('click',function(e){
				if(e.currentTarget.text == 'Easy Returns' && international) {
					Event.stop(e);
					window.open('../helpdesk/popup.jsp?display=international&subdisplay=countries','getfile1','width=500,height=400,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
				}
			});
		}
	}

	Df.Lightbox.pars.dialog.className = 'df_modal_expressShop';
	Df.Lightbox.pars.dialog.animate = {opacity:1};
	Df.Lightbox.pars.dialog.title = "Express Shop";
	Df.Lightbox.getDialog().element.setStyle({opacity:0});

	if($('international')) {
		$('international').observe('click', function(e){
			Event.stop(e);
			
			Df.Lightbox.show();
			
			var internationalModal = $$('.df_modal_expressShop')[0];
			var ajax = new Ajax.Request('/include/international_modal.jsp', {
				method: 'post',
				parameters: {
				},
				onSuccess: function(e){
					if (e.status == '200') {
						try {
							internationalModal.innerHTML = e.responseText
							Df.Lightbox.show();
							setIntlShippingCurrency(true);
						} catch(x) { /*alert('catch');  alert(x)*/ }
					}
					
					$('es-close').observe('click', function(){ Df.Lightbox.hide(); });
					$('learnMore').observe('click', function(e){
						Event.stop(e);
						window.open ("/helpdesk/popup.jsp?display=international&subdisplay=countries","Helpdesk","menubar=1,resizable=1,width=850,height=600");
					});
				
					//Hide site-wide international modal when cancel button is clicked.
					$('cancelCurrency').observe('click', function(){ Df.Lightbox.hide(); });
				},
				onException: function(e,m){ /* alert('onException');  alert('description = ' + m.description) */ },
				onError: function(e,m){ /* alert('onError');  alert(e) */ }
			});
			
		});
	}
	
	if($$('.hdLightbox')[0]) {
		$$('.hdLightbox')[0].observe('click', function(e){
			Event.stop(e);
			
			Df.Lightbox.show();
			
			var internationalModal = $$('.df_modal_expressShop')[0];
			var ajax = new Ajax.Request('/include/international_modal.jsp', {
				method: 'post',
				parameters: {
				},
				onSuccess: function(e){
					if (e.status == '200') {
						try {
							internationalModal.innerHTML = e.responseText
							Df.Lightbox.show();
							setIntlShippingCurrency();
						} catch(x) { /*alert('catch');  alert(x)*/ }
					}
					
					$('es-close').observe('click', function(){ Df.Lightbox.hide(); });
					$('learnMore').observe('click', function(e){
						Event.stop(e);
						window.open ('/helpdesk/popup.jsp?display=international&subdisplay=countries#content',"Aeropostale Helpdesk","scrollbars=1,resizable=1,width=850,height=600");
					});
				
					//Hide site-wide international modal when cancel button is clicked.
					$('cancelCurrency').observe('click', function(){ Df.Lightbox.hide(); });
				},
				onException: function(e,m){ /* alert('onException');  alert('description = ' + m.description) */ },
				onError: function(e,m){ /* alert('onError');  alert(e) */ }
			});
			
		});
	}
	
	if(typeof international != 'undefined') {
		if(international) {
			//Converts the currencey for Cross sells on cart page.
			
			var listPrices = $$('#cross-sells .price li:not(.now)');
			var ourPrices = $$('#cross-sells .price li.now');
			var originalPriceString;
			var originalPrice;
			var convertedPrice;
			var finalPrice;
			
			function formatCurrency(amount) {
				var i = parseFloat(amount);
				if(isNaN(i)) { i = 0.00; }
				var minus = '';
				if(i < 0) { minus = '-'; }
				i = Math.abs(i);
				i = parseInt((i + .005) * 100);
				i = i / 100;
				s = new String(i);
				if(s.indexOf('.') < 0) { s += '.00'; }
				if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
				s = minus + s;
				return s;
			}
			
			function roundCurrency(amount){
			
				switch(roundMethod) {
					case 2:
						amount = amount;
						break;
					case 1:
						amount = Math.round(amount * 10)/10;
						break;
					case 0:
						amount = Math.round(amount * 1)/1;
						break;
					case -1:
						amount = Math.floor(amount);
						amount = Math.round(amount / 10)*10;
						break;
					case -2:
						amount = Math.floor(amount);
						amount = Math.round(amount / 100)*100;
						break;
					default:
						//default rounding
				}
				
				var price = new String(amount);
				
				if(price.length < 4 || roundMethod == 0 || roundMethod == -1 || roundMethod == -2) {
					amount = amount + ".00";
				} else if(roundMethod == 1) {
					amount = amount + "0";
				}
				
				return amount;
			
			}

			for(i=0;i<listPrices.length;i++){
				originalPriceString = listPrices[i].innerHTML;
				originalPrice = originalPriceString.match(/[0-9]+(?:\.[0-9])+(0|[0-9])/)[0];
				convertedPrice = originalPrice * fx_rate * lcp;
				convertedPrice = formatCurrency(convertedPrice);
				
				var currency = roundCurrency(convertedPrice);

				finalPrice = currencyCode + " " + currency;
				listPrices[i].innerHTML = finalPrice;
				
			}
			
			for(i=0;i<ourPrices.length;i++){
				originalPriceString = ourPrices[i].innerHTML;
				originalPrice = originalPriceString.match(/[0-9]+(?:\.[0-9])+(0|[0-9])/)[0];
				convertedPrice = originalPrice * fx_rate * lcp;
				convertedPrice = formatCurrency(convertedPrice);

				var currency = roundCurrency(convertedPrice);
				
				finalPrice = "now: " + currencyCode + " " + currency;
				ourPrices[i].innerHTML = finalPrice;
			} 
			
		
			fiftyOne.disableOGC();
		}
	}
});
