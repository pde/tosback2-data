/**
 * This is the WebTrends Finding Method implementation for Cabela's
 */
function FindingMethod() {
	var fm=this;
	this.bindFunc = "click";
	this.wtTags = {};
	this.WTz_pg = "";
	
	/**
	 * Method to initialize the object.
	 */
	this.init = function() {
		// Set the bind function based on the browser
		this.bindFunc = ($.browser.msie?"click":"mousedown");
		
		// Store all the WT MetaTags in an object so we can reference them
		// if/when needed
		$('meta').each(function(){
			if($(this).attr('name').match("^WT\.")) {
				fm.wtTags[$(this).attr('name').replace("WT.", '')] = $(this).attr('content');
			}
		});
		// If the tag is empty, perhaps it came through on the url parmas
		if (fm.wtTags.z_l == undefined) {
			url = fm.parseUrl(window.location.href);
			fm.wtTags.z_l = url.params['WTz_l'];
		}

		// Handle the main navigation
		$('.navigation>li>a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = 'SBC';
					url.query = null;
					url.source = null;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Handle the home page content
		$('#homepageTemplate1 .layoutCenterColumn a, #homepageTemplate2 .layoutCenterColumn a, #homepageTemplate1 .layoutCenterColumn area, #homepageTemplate2 .layoutCenterColumn area').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				if (fm.wtTags.cg_s == 'Google') {
					wtzl = 'GHome';
				} else if (fm.wtTags.cg_s == 'Regular') {
					wtzl = 'Home';
				} else {
					wtzl = fm.wtTags.cg_s+'Home';
				}
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = wtzl;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});

		// Handle the site map
		$('#siteMapLinks a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = 'SiteMap';
					url.query = null;
					url.source = null;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Handle the category/subcategory page content
		$('#categoryTemplate1 .layoutCenterColumn a, #categoryTemplate2 .layoutCenterColumn a, #subcategoryTemplate1 .layoutCenterColumn a, #subcategoryTemplate2 .layoutCenterColumn a, #categoryTemplate1 .layoutCenterColumn area, #categoryTemplate2 .layoutCenterColumn area, #subcategoryTemplate1 .layoutCenterColumn area, #subcategoryTemplate2 .layoutCenterColumn area').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));				
				if((url.path != "" && url.anchor == "")){
					if (fm.isValidLink(url)) {				
						url.params['WTz_l'] = fm.wtTags.z_l+";"+fm.wtTags.z_pg;						
						$(this).attr('href', $.url.build(url));
					}
				}
			}, this, fm));
		});
		
		// Handle Index Managed Content
		
		$('#indexTemplate1 .categoryBannerCMS a, #indexTemplate2 .categoryBannerCMS a, #indexTemplate3 .categoryBannerCMS a, #indexTemplate4 .categoryBannerCMS a, #indexTemplate6 .categoryBannerCMS a, #indexTemplate7 .categoryBannerCMS a, #indexTemplate11 categoryBannerCMS a, #indexTemplate12 .categoryBannerCMS a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));				
				if((url.path != "" && url.anchor == "")){
					if (fm.isValidLink(url)) {				
						url.params['WTz_l'] = fm.wtTags.z_l+";MC"+fm.wtTags.z_pg;						
						$(this).attr('href', $.url.build(url));
					}
				}
			}, this, fm));
		});
		// Handle the search results page
		$('#searchResults .includeEndecaProducts a.itemName').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = fm.wtTags.z_l;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Handle the no search results
		if (fm.wtTags.z_pg == 'NoSearchResults') {
			$('#searchResults .layoutCenterColumn a').each(function(index) {			
				$(this).bind(fm.bindFunc, fm.bind(function() {
					url = fm.parseUrl($(this).attr('href'));
					if (fm.isValidLink(url)) {
						url.params['WTz_l'] = "Header;Search-No items Found-" + $("#searchBy option:selected").text();
						$(this).attr('href', $.url.build(url));
					}
				}, this, fm));
			});
		}
		
		//handle the related links
        $('.refinements h4').each(function(index) {
        	if($(this).html() == "Related Links"){
        		$(this).next('ul').children('li').children('a').each(function(index) {	
        			$(this).bind(fm.bindFunc, fm.bind(function() {
        				url = fm.parseUrl($(this).attr('href'));
        				if (fm.isValidLink(url) && fm.wtTags.z_l.lastIndexOf("RL") == -1) {
        					url.params['WTz_l'] = fm.wtTags.z_l + ";RL";
        					$(this).attr('href', $.url.build(url));
        				}
        			}, this, fm));
        		});
        	}
		});	
		
		// Handle the did you mean link
		$('.didYouMean a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] += ";DYM";
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Footer!
		$('#siteFooter a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = "Footer";
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Tag the links in the header
		$('#siteHeader .content a, .logo a, .customerService').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = "Header";
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Handle the YMAL
		$('.youMayAlsoLike a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					wtzl = "YMAL"
					if (fm.wtTags.z_typ != undefined && fm.wtTags.z_typ != "") {
						wtzl += ";"+fm.wtTags.z_typ;
					}
					if (fm.wtTags.pn_sku != undefined && fm.wtTags.pn_sku != "") {
						wtzl += ";"+fm.wtTags.pn_sku;
					}
					url.params['WTz_l'] = wtzl;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Handle the Customer Who Bought Also Bought
		$('#itemAddedToCartTemplate .relatedItems a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					var wtzl = "CWBAB";
					if (fm.wtTags.pn_sku != undefined && fm.wtTags.pn_sku != "") {
						wtzl += ";"+fm.wtTags.pn_sku;
					}
					url.params['WTz_l'] = wtzl;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		fm.initTabs();
		
		// Handle all the index links on subcategory pages and the product links on index pages
		if (fm.wtTags.cg_s == 'SubCategory' || fm.wtTags.cg_s == 'Index') {
			$('.itemEntry a').each(function(index) {
				$(this).bind(fm.bindFunc, fm.bind(function() {
					url = fm.parseUrl($(this).attr('href'));
					if (fm.isValidLink(url)) {
						url.params['WTz_l'] = fm.wtTags.z_l+";"+fm.wtTags.z_pg;
						$(this).attr('href', $.url.build(url));
					}
				}, this, fm));
			});
		}
		
		//Handle ensemble links on product pages
		$('.labledContainer').each(function(index) {
			if ($(this).find('.label').text() == "View Full Collection") {
				$(this).find('a').each(function() {
					$(this).bind(fm.bindFunc, fm.bind(function() {
						url = fm.parseUrl($(this).attr('href'));
						if (fm.isValidLink(url)) {
							if(fm.wtTags.z_l.lastIndexOf(";") != -1 && fm.wtTags.z_l.lastIndexOf("pod") > fm.wtTags.z_l.lastIndexOf(";")){
								url.params['WTz_l'] = fm.wtTags.z_l.replace(fm.wtTags.z_l.substring(fm.wtTags.z_l.lastIndexOf("pod")), fm.wtTags.z_pg);
								$(this).attr('href', $.url.build(url));
							}else{
								url.params['WTz_l'] = fm.wtTags.z_l+";"+fm.wtTags.z_pg;
								$(this).attr('href', $.url.build(url));
							}
						}
					}, this, fm));
				});
			}
		});
		
		//Handle product links on ensemble page
		$('.podProductList').each(function(index) {
			$('.productInfo').each(function(index) {
				$(this).find('a').each(function() {
					$(this).bind(fm.bindFunc, fm.bind(function() {
						url = fm.parseUrl($(this).attr('href'));
						if (fm.isValidLink(url)){
							if(fm.wtTags.z_l.lastIndexOf(";") != -1 && fm.wtTags.z_l.lastIndexOf("prd") > fm.wtTags.z_l.lastIndexOf(";")){
								url.params['WTz_l'] = fm.wtTags.z_l.replace(fm.wtTags.z_l.substring(fm.wtTags.z_l.lastIndexOf("prd")), fm.wtTags.z_pg);
								$(this).attr('href', $.url.build(url));
							}else{
								url.params['WTz_l'] = fm.wtTags.z_l+";"+fm.wtTags.z_pg;
								$(this).attr('href', $.url.build(url));
							}
						}
					}, this, fm));
				});
			});
		});			
		
		// Inject an input param into the header search form
		$("#js-headerSearchForm").append("<input type=\"hidden\" name=\"WTz_l\" id=\"searchWTz_l\" value=\"Header\" />");
		$("#js-headerSearchForm").bind('submit', function() {
				$('#searchWTz_l').val($('#searchWTz_l').val() + ';Search-'+$("#searchBy option:selected").text());
			});
		
		// Inject an input param into the search within form
		$("#js-searchWithinForm").append("<input type=\"hidden\" name=\"WTz_l\" id=\"searchWithinWTz_l\" value=\"" + fm.wtTags.z_l +";SearchWithin\" />");
		
		// Handle the catalog left nav
		$('.catalogNavigation a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					// If the current finding method set to unknown, use the SBC;LN method
					if (fm.wtTags.z_l == 'Unknown') {
						url.params['WTz_l'] = 'SBC; LN'+fm.wtTags.z_pg;
					}
					// If we are simply going deeper, this is easy
					if (fm.clickDepth($(this)) > fm.activeDepth()) {
						url.params['WTz_l'] = fm.wtTags.z_l+";"+fm.wtTags.z_pg;
					}
					// It's also easy if we are staying at the same level
					if (fm.clickDepth($(this)) == fm.activeDepth()) {
						url.params['WTz_l'] = fm.wtTags.z_l;
					}
					// This is where the fun starts!
					if (fm.clickDepth($(this)) < fm.activeDepth()) {
						fmTokens = fm.wtTags.z_l.split(";");
						// If we are already using SBC, we need to try to determine
						// where to add the current link
						if (fmTokens.length >= 1 && fmTokens[0] == 'SBC') {
							i = 1;
							fmString = 'SBC;';
							while (i < fmTokens.length && i <= fm.clickDepth($(this))) {
								fmString += fmTokens[i] + ";";
								i++;
							}
							fmString = fmString.replace(/;$/, '');
							//fmString += fm.getCategoryIdFromUrl(url);
							url.params['WTz_l'] = fmString;
						// Otherwise, we need to jump to SBC; LN;
						} else {
							url.params['WTz_l'] = 'SBC; LN'+fm.wtTags.z_pg;
						}
					}
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
				
		// Tag the links in CQO
		$('#cqoItemsFoundTemplate a').each(function(index) {
			url = fm.parseUrl($(this).attr('href'));
			if (fm.isValidLink(url)) {
				url.params['WTz_l'] = "CQO";
				$(this).attr('href', $.url.build(url));
			}
		});
		
		//handle siteGlobalPromotion link
		$('.siteGlobalPromotion a').each(function(index) {
		       $(this).bind(fm.bindFunc, fm.bind(function() {
			        url = fm.parseUrl($(this).attr('href'));
			        if (fm.isValidLink(url)) {
					url.params['WTz_l'] = "GlobalBanner";
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		//handle RightRail 
	        $('.RightRail a').each(function(index) {
		        $(this).bind(fm.bindFunc, fm.bind(function() {
				 url = fm.parseUrl($(this).attr('href'));
		                if (fm.isValidLink(url)) {
				        url.params['WTz_l'] = "RightRail";
					$(this).attr('href', $.url.build(url));
			         }
		        }, this, fm));		       
	         });
		
		// Inject an input param into the CQO search form
		$('form[name="cqoItemSearchForm"]').append("<input type=\"hidden\" name=\"WTz_l\" id=\"cqoWTz_l\" value=\"CQO\" />");
		
		// Recently viewed "seeAll" links
		$('.seeAll a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					url.params['WTz_l'] = "RV";
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		// Left Nav Bottom (Related Categories and See Also
		$('.leftColumnBottom ul').each(function(index) {
			if ($(this).find('h4').text() == "Related Categories") {
				$(this).find('a').each(function() {
					url = fm.parseUrl($(this).attr('href'));
					if (fm.isValidLink(url)) {
						// If the current finding method set to unknown
						if (fm.wtTags.z_l == 'Unknown') {
							url.params['WTz_l'] = 'SBC;RC'+fm.wtTags.z_pg;
						}else{
							url.params['WTz_l'] = fm.wtTags.z_l +';RC'+fm.wtTags.z_pg;
						}
					}
					$(this).attr('href', $.url.build(url));
				});
			}
			if ($(this).find('h4').text() == "See Also") {
				$(this).find('a').each(function() {
					url = fm.parseUrl($(this).attr('href'));
					if (fm.isValidLink(url)) {
						// If the current finding method set to unknown
						if (fm.wtTags.z_l == 'Unknown') {
							url.params['WTz_l'] = 'SBC;SA'+fm.wtTags.z_pg;
						}else{
							url.params['WTz_l'] = fm.wtTags.z_l +';SA'+fm.wtTags.z_pg;
						}
					}
					$(this).attr('href', $.url.build(url));
				});
			}
		});
	}

	//handle tagging for tabs
	this.initTabs = function(){
		// Handle the related items tab
		$('#relatedItemsPanel a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					wtzl = "RI"
					if (fm.wtTags.z_typ != undefined && fm.wtTags.z_typ != "") {
						wtzl += ";"+fm.wtTags.z_typ;
					}
					if (fm.wtTags.pn_sku != undefined && fm.wtTags.pn_sku != "") {
						wtzl += ";"+fm.wtTags.pn_sku;
					}
					url.params['WTz_l'] = wtzl;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
		
		//handle the accessories tab
		$('#accessoriesPanel a').each(function(index) {
			$(this).bind(fm.bindFunc, fm.bind(function() {
				url = fm.parseUrl($(this).attr('href'));
				if (fm.isValidLink(url)) {
					wtzl = "AC"
					if (fm.wtTags.z_typ != undefined && fm.wtTags.z_typ != "") {
						wtzl += ";"+fm.wtTags.z_typ;
					}
					if (fm.wtTags.pn_sku != undefined && fm.wtTags.pn_sku != "") {
						wtzl += ";"+fm.wtTags.pn_sku;
					}
					url.params['WTz_l'] = wtzl;
					$(this).attr('href', $.url.build(url));
				}
			}, this, fm));
		});
	}
	
	/**
	 * Method to test a url to see if it's eligible for Finding Method tagging.
	 * 
	 * @param URL A jQuery URL Decoded object (see the jQuery URL Decoder extension)
	 * @return Boolean True means valid, false otherwise
	 */
	this.isValidLink=function(url) {
		// Make sure the link is on the cabelas.com domain
		if (url.host.length != 0 && url.host.indexOf('cabelas.com') < 0) {
			return false
		}
		
		// Make sure the link isn't a javascript event
		if ($.url.build(url).indexOf("javascript") >= 0) {
			return false;
		}
		return true;
		
	}
	
	this.activeDepth = function() {
		var activeNav=$(".catalogNavigation .active");
		return activeNav.eq(activeNav.length-1).parents("ul").length;
	}
	
	/**
	 * A bind function which takes a function and arguments used to essentially
	 * overload the default jQuery bind function.
	 * @param fn The bind function to call
	 * @param scope The arguments to pass to fn.apply
	 * @return A function
	 */
	this.bind = function(fn, scope) {
		return function() { fn.apply(scope, arguments) };
	}

	this.breadcrumb = function(breadCrumbIds) {
		bcTokens = breadCrumbIds.split("|");
		fmTokens = fm.wtTags.z_l.split(";");
		if (bcTokens.length == 0) {
			return;
		}
		if (fmTokens.length >= 1 && fmTokens[0] == 'SBC') {
			fmStr = 'SBC';
			// This isn't standard SBC so append the second token
			if (fmTokens.length >= 2 && fmTokens[1].indexOf('cat') != 0) {
				fmStr += ';'+fmTokens[1];
			}
		} else {
			fmStr = 'SBC;BR'+fm.wtTags.z_pg;
		}
		ii = 0;
		$('.breadcrumb a').each(function(index) {
			url = fm.parseUrl($(this).attr('href'));
			url.params['WTz_l'] = fmStr;
			$(this).attr('href', $.url.build(url));
			// If we are in SBC, just append the tokens until they match
			if (fmTokens.length >= 1 && fmTokens[0] == 'SBC') {
				if ('cat'+bcTokens[ii] == fmTokens[ii+1]) {
					fmStr += ";" + fmTokens[ii+1];
				}
			}
			ii++;
		});
	}

	this.clickDepth = function(element) {
		return $(element).parents("ul").length;
	}
	
	/**
	 * Method to get the categoryId from a jQuery url object
	 * @param url A jQuery url object
	 * @return String The categoryId
	 */
	this.getCategoryIdFromUrl = function(url) {
		if (url.params['categoryId'] != null) {
			return url.params['categoryId'];
		} else {
			// Pull it from the category id in the URL (eg Ns-CATEGORY_SEQ_99141480)
			return url.path.replace(/.*Ns-CATEGORY_SEQ_([0-9]*).*/, '$1');
		}
		
	}
	
	this.parseUrl = function(urlString) {
		url = $.url.parse(urlString);
		url.query = null;
		url.source = null;
		return url;
	}

	// MegaMenu tracking
	this.tagMegaMenu = function() {
		$('.megaMenuList a, .otherWaysToShop a').each(function(index) {
			// Try to first fetch from the webTrendsCategoryId hidden value
			catId = $(this).parents(".js-navLink").children(".webTrendsCategoryId").val();
			if (catId == undefined) {
				caturl = fm.parseUrl($(this).parents(".js-navLink").children('a:first-child'));
				if (caturl.params != null && caturl.params['categoryId'] != null) {
					catId = "cat"+caturl.params['categoryId'];
				}
			}
			if (catId == undefined || catId == null) catId = "";
			url = fm.parseUrl($(this).attr('href'));
			if (fm.isValidLink(url)) {
				url.params['WTz_l'] = 'SBC;MM'+catId;
				$(this).attr('href', $.url.build(url));
			}
		});

	}

	return this;
}

fm=new FindingMethod();
$(document).ready(function() {
	fm.init();
});
