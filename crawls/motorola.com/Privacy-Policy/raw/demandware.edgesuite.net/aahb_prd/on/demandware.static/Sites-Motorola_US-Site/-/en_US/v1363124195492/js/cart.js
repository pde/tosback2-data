
var $j = jQuery;
var CartPage = function CartPage(){}
CartPage.prototype = {

	initialize: function () {
		$j(document).ready($j.proxy(this.domReady, this));
	},

	domReady: function () {
		this.initDropDown();
		this.initOverlay();

	},

	initDropDown: function () {

		// cart drop down with cart items content
		$j('.js_cartLink').each(function (index, value) {

			var whichContent = $j(value).find("a").attr("rel");
			var sel = '.shopCartDrop';
			var timeoutId = 0;
			if (whichContent) sel += "." + whichContent;
			$j(value).hover(
				function () {
					clearTimeout(timeoutId);
					var height = $j(this).height();
					var width = $j(this).width();
					var widthInner = 0;
					
					if ($j(this).find("a span").length > 0) widthInner = $j($j(this).find("a span")).width();
					else widthInner = $j($j(this).find("a")).width();

					var widthContent = parseInt($j(sel).width());
					var pos = $j(this).position();
					var posT = pos.top;
					var posL = pos.left;
					var posLeftTotal = -(widthContent - widthInner) / 2;
					var posTopTotal = 20; // posT + height;
					$j(sel).css({ 'top': posTopTotal, 'left': posLeftTotal });
					
					//show the minicart
					$j(sel).show();
				},
			    function () {
			    	var my = $j(sel);
			    	timeoutId = setTimeout(function () { my.hide(); }, 250);
			    }
			);
		});

	},

	initOverlay: function () {
		this.assignOverlayLinks();
		this.assignFindStoreLinks();
		this.assignWhereToBuyLinks();

	},
	assignOverlayLinks: function () {
		$j('.js_cartOverlayLink').each(function (index, value) {
			$j(value).motPopup({
				'onStart': function () {
					setTimeout(function () {
						$MM.utils.initHover();
						$MM.pages.cart.imageChange();
						$MM.pages.cart.initAccyCarousel();
						$MM.pages.cart.accyChange();
						$MM.controls.formControls.initSelect();
						var cartId = $j(value).attr('rel');
						$MM.pages.cart.selectRowInit(cartId);
						$MM.pages.cart.assignMultiSelectCartSubmit(cartId);
						$MM.pages.cart.accyChangeColor();
						$MM.pages.cart.prodChangeColor(cartId);
					}, 100)
				},
				'onClose': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleActive();
				},
				'onComplete': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleInActive();
				}
			});
		});
	},
	assignFindStoreLinks: function () {
		$j('.js_findStoreLink').each(function (index, value) {
			$j(value).motPopup({
				'onStart': function () {
					setTimeout(function () {
						$MM.utils.initHover();
						$MM.controls.formControls.initSelect();
						var cartId = $j(value).attr('rel');
						$MM.pages.cart.selectRowInit(cartId);
						$MM.pages.cart.initFindStoreOverlay();

					}, 100)
				},
				'onClose': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleActive();
				},
				'onComplete': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleInActive();
				}
			});
		});
	},
	assignWhereToBuyLinks: function () {
		$j('.js_whereToBuyLink').each(function (index, value) {
			$j(value).motPopup({
				'onStart': function () {
					setTimeout(function () {
						$MM.utils.initHover();

					}, 100)
				},
				'onClose': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleActive();
				},
				'onComplete': function () {
					if ($MM.controls.hero) $MM.controls.hero.toggleInActive();
				}
			});
		});
	},

	imageChange: function () {

		$j('li.cartImgListItem').click(function () {
			var target = $j(this).index();
			$j('li.cartImgListItem').removeClass('selected');
			$j('li.cartImgListItem').eq(target).addClass('selected');

			$j('div.cartProductOverviewImg').addClass('hidden');
			$j('div.cartProductOverviewImg').eq(target).removeClass('hidden');

		});

	},
	hasAccyCarouselInit: false,
	initAccyCarousel: function () {
		if (this.hasAccyCarouselInit) return;
		this.hasAccyCarouselInit = true;
		var pages = $j(".accyGroup").length;
		if (pages > 1) {
			for (var i = 0; i < pages; i++) {
				$j(".accyControls").append("<div class='motBtn'></div>");
			}
			$j(".accyControls div").eq(0).addClass("active");
		} else {
			$j(".accyControls").hide();
			$j(".addAccyBack").hide();
			$j(".addAccyForward").hide();
		}
	},

	accyChange: function () {
		$j('.accyControls div').click(function (e) {
			var target = $j(this).index();
			var pages = $j(".accyGroup").length - 1;

			if (target == 0) {
				$j(".addAccyBack").addClass('disabled');
				$j(".addAccyForward").removeClass('disabled');
			} else if (target == pages) {
				$j(".addAccyBack").removeClass('disabled');
				$j(".addAccyForward").addClass('disabled');
			} else {
				$j(".addAccyBack").removeClass('disabled');
				$j(".addAccyForward").removeClass('disabled');
			}

			$j('.accyGroup').removeClass("isShown");
			$j('.accyGroup').eq(target).addClass("isShown");

			$j('.accyControls div').removeClass('active');
			$j('.accyControls div').eq(target).addClass('active');

		});

		$j('.addAccyBack').click(function () {
			if ($j(this).hasClass('disabled')) {
				return;
			} else {
				var shown;
				var pages = $j('.accyGroup').length - 1;
				$j('.accyGroup').each(function (index) {
					if ($j(this).hasClass('isShown')) {
						shown = index - 1;
						$j(this).removeClass('isShown');
					}
				});
				if (shown >= 1 || pages > 0) {
					$j('.addAccyForward').removeClass('disabled');
				}
				if (shown == 0) {
					$j('.addAccyBack').addClass('disabled');
				}
				$j('.accyGroup').eq(shown).addClass('isShown');
				$j('.accyControls div').removeClass('active');
				$j('.accyControls div').eq(shown).addClass('active');
			}
		});

		$j('.addAccyForward').click(function () {
			if ($j(this).hasClass('disabled')) {
				return;
			} else {
				var shown;
				var pages = $j('.accyGroup').length - 1;
				$j('.accyGroup').each(function (index) {
					if ($j(this).hasClass('isShown')) {
						shown = index + 1;
						$j(this).removeClass('isShown');
					}
				});
				if (shown >= 1) {
					$j('.addAccyBack').removeClass('disabled');
				}
				if (shown == pages) {
					$j('.addAccyForward').addClass('disabled');
				}
				$j('.accyGroup').eq(shown).addClass('isShown');
				$j('.accyControls div').removeClass('active');
				$j('.accyControls div').eq(shown).addClass('active');
			}
		});

	},

	selectRowInit: function (cartId) {
		//assign click to trigger row click handler
		var my = this;
		var row = $j(cartId + " .js_selectRow");
		row.unbind("click");
		row.bind("click", $j.proxy(function (event) {
			my.selectRowClick(event, cartId);
		}, this));

		// is there a default selected row? select it
		var defaultSelect = $j(cartId + " .js_defaultSelect");
		if (defaultSelect.length > 0) {
			var tempEvent = { currentTarget: defaultSelect[0] };
			this.selectRowClick(tempEvent, cartId);
		}
	},
	selectRowClick: function (event, parentId) {
		var target = $j(event.currentTarget);

		var alreadyHighlight = target.hasClass("highlight");

		//swap action button depending on row type
		if (target.hasClass("js_withPlan")) {
			$j(".js_cartBtnWithPlan").removeClass("hidden");
			$j(".js_cartBtn").addClass("hidden");
		} else {
			$j(".js_cartBtnWithPlan").addClass("hidden");
			$j(".js_cartBtn").removeClass("hidden");
		}


		// de-hightlight all rows, highlight just the target row
		$j(parentId + " .js_selectRow").removeClass("highlight");
		target.addClass("highlight");

		// uncheck all radios, check the active one
		$j(parentId + " .js_selInput").attr("checked", false);
		$j(target).find(".js_selInput").attr("checked", true);


		//check all active checkboxes
		if (!alreadyHighlight) {
			$j(parentId + " .js_selInputCheck").attr("checked", false);
			$j(target).find(".js_selInputCheck").attr("checked", true);
		}

	},
	assignMultiSelectCartSubmit: function (cartId) {
		var my = this;

		// assign btn clicks with plans
		var btns = $j($j(cartId + " .js_cartBtnWithPlan").parent());
		var func = $j.proxy(function (event) { my.handleMultiSelectCartSubmit(event, cartId, "withPlan"); }, this);
		btns.unbind("click", func);
		btns.bind("click", func);

		// assign btn clicks with plans
		var btns = $j($j(cartId + " .js_cartBtn").parent());
		var func = $j.proxy(function (event) { my.handleMultiSelectCartSubmit(event, cartId, "noPlan"); }, this);
		btns.unbind("click", func);
		btns.bind("click", func);

	},
	handleMultiSelectCartSubmit: function (event, cartId, which) {
		//find selected row
		var row = $j(cartId + " .js_selectRow.highlight");
		var skuArr = [];
		var mainSku = $j(row.find(".js_selInput").parent()).find("input[name=sku]").val();

		//find number of items to add
		var el = $j(cartId + ' .accyQuan').find(".accyQuanSel").find(".selectBtn");
		var num = 1;
		if (el.length > 0) {
			num = Number(el.html());
		}
		var i = 0;
		for (i = 0; i < num; i++) skuArr.push(mainSku);

		//look for any bundle checkboxes
		$j(row.find(".addToCartCheck input[name=sku]")).each(function (index, value) {
			//has a checkbox sibling?
			var checkboxes = $j(value).siblings("input[type=checkbox]");
			var isIncluded = false;
			if (checkboxes.length > 0) {
				if ($j(checkboxes[0]).attr("checked") == "checked") isIncluded = true;
			} else {
				//no checkboxes, add it
				isIncluded = true;
			}
			if (isIncluded) {
				for (i = 0; i < num; i++) skuArr.push($j(value).val());
			}
		});
		this.addToCartPlanOption(skuArr, which);

	},
	addToCartPlanOption: function (skuArr, planOption) {

		// planOption is either 'noPlan' or 'withPlan'
		if (planOption == undefined) which = "noPlan";

		//intgration entry point
		// productInfo: ["sku1", "sku2" ... "skuN"]
		alert("addToCart " + planOption + " skuArr:[" + skuArr + "]");


	},
	addToCart: function (skuArr) {

		//intgration entry point
		// productInfo: ["sku1", "sku2" ... "skuN"]
		alert("addToCart skuArr:[" + skuArr + "]");

	},

	showQuickView: function (sku) {

		//integration entry point
		alert("showQuickView " + sku);
	},
	addToCartWithQty: function (event, sku, qty_id, colorSelect_id) {
		var el = $j("#" + qty_id);
		el = el.find(".selectBtn");
		var num = Number(el.html());

		// if color id passed in, find color value
		if (colorSelect_id != undefined) {
			el = $j("#" + colorSelect_id).find(".selectBtn");
			colorValue = el.html();
			var colorIndex = -1;
			var els = $j("#" + colorSelect_id).find(".selectOptionsList .selectOptionsItem");
			els.each(function (index, value) {
				if ($j(value).html() == colorValue) {
					colorIndex = index;
					return false;
				}
			});
			if (colorIndex > -1) {
				sku = $j("#" + colorSelect_id).find(".selectOptionsListValues div").eq(colorIndex).html();
			}
		}

		var skuArr = [];
		for (var i = 0; i < num; i++) skuArr.push(sku);
		$MM.pages.cart.addToCart(skuArr);
	},
	addToCartDropDown: function (skuArr) {
		//intgration entry point
		// productInfo: ["sku1", "sku2" ... "skuN"]
		alert("addToCartDropDown skuArr:[" + skuArr + "]");

	},
	initFindStoreOverlay: function () {
		$j(':input').val("");
		$j(".findStoreZipError").addClass("hidden");
	},
	findStoreSubmit: function (event) {
		var isZipValid = this.zipCodeValidator();

		if (isZipValid) {
			$j('#findStoreOverlay').motPopup('closePopup');

			var zipcode = $j("#findStoreZipInput").val();

			var prodId = $j(".findStoreOption input:checked").val();
			var wtRetailerURL = $MM.config.get("findStoreTarget_url");
			var retailerURL = wtRetailerURL;
			retailerURL += zipcode;

			//tracking
			var trackingMap = $MM.config.get("findStoreTracking");
			var trackStr = trackingMap[prodId];
			if (trackStr != null && trackStr != "") {
				try {
					eval(trackStr);
				} catch (e) {
					//e	
				}
			}

			window.open(retailerURL, "retailerWindow", "location=1,status=1,scrollbars=0,width=830,height=770");

			return false;
		}
	},
	zipCodeValidator: function () {


		var zipInput = $j("#findStoreZipInput");
		var zipcode = $j.trim(zipInput.val());
		var errorDiv = $j(".findStoreZipError");

		//if ($MM.config.get("locale").toUpperCase() == "US-EN") {
			var valid = "0123456789-";
			var hyphencount = 0;

			if (zipcode.length != 5 && zipcode.length != 10) {
				errorDiv.removeClass("hidden");
				return false;
			}

			for (var i = 0; i < zipcode.length; i++) {
				temp = "" + zipcode.substring(i, i + 1);
				if (temp == "-") hyphencount++;

				if (valid.indexOf(temp) == "-1") {
					errorDiv.removeClass("hidden");
					$j(':input').val("");
					return false;
				}
				if ((hyphencount > 1) || ((zipcode.length == 10) && "" + zipcode.charAt(5) != "-")) {
					errorDiv.removeClass("hidden");
					$j(':input').val("");
					return false;
				}
			}
			errorDiv.addClass("hidden");
			return true;
		/*} else {
			errorDiv.addClass("hidden");
			return true;
		}*/


	},

	accyChangeColor: function () {
		$j('.accyColor .selectOptionsItem').click(function () {
			var target = $j(this).index();
			var accyImg = $j(this).parents('.accy').children('.accyImg');
			accyImg.children('img').addClass('hidden');
			accyImg.children('img').eq(target).removeClass('hidden');
		});
	},

	prodChangeColor: function (cartId) {
		var my = this;
		$j('.prodColor .selectOptionsItem').click(function () {
			my.prodChangeColorClick(cartId);
		});

	},
	prodGetColorVals: function (cartId) {
		var el = $j(cartId).find(".prodColorSel .selectBtn");
		colorValue = el.html();
		var colorIndex = -1;
		var sku = "";
		var els = $j(cartId).find(".prodColorSel .selectOptionsList .selectOptionsItem");
		els.each(function (index, value) {
			var val = $j(value).html();
			if (val == colorValue) {
				colorIndex = index;
				return false;
			}
		});
		if (colorIndex > -1) {
			sku = $j(cartId).find(".prodColorSel .selectOptionsListValues div").eq(colorIndex).html();
		}
		return { color: colorValue, sku: sku };

	},
	prodChangeColorClick: function (cartId) {
		var colorOb = this.prodGetColorVals(cartId);
		var sku = colorOb.sku;
		//IT AMAZON INTEGRATION
		alert("prodChangeColorClick " + sku + " color:" + colorOb.color);
	}

};

var cart = new CartPage();
cart.initialize();
