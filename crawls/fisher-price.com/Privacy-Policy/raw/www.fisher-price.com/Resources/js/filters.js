/* Product Filters code  start */
var ajaxRequestMethod = 'GET';
if ($('#locale').val().toLowerCase() === 'en_us') {
	ajaxRequestMethod = 'POST';
}
var isEndecaSearch = $("#endecaSearch").val();
var isSearchResults = $("#searchResults").val();
var isGrandParentsPage = $('#grandParentsPage').val();
var isShareYourThoughts = $('#shareYourThoughts').val();
//variable to set the rounded corvers in IE after ajax success:
var settings = {
    tl: { radius: 16 },
    tr: { radius: 16 },
    bl: { radius: 16 },
    br: { radius: 16 },
    antiAlias: true
};

var settingsColor_content = {
    tl: { radius: 0 },
    tr: { radius: 0 },
    bl: { radius: 11 },
    br: { radius: 11 },
    antiAlias: true
};

var settingsTiles_header = {
    tl: { radius: 11 },
    tr: { radius: 11 },
    bl: { radius: 0 },
    br: { radius: 0 },
    antiAlias: true
};

var settingsLightBox_content = {
    tl: { radius: 0 },
    tr: { radius: 0 },
    bl: { radius: 20 },
    br: { radius: 20 },
    antiAlias: true
};

var settingsLightBox_header = {
    tl: { radius: 20 },
    tr: { radius: 20 },
    bl: { radius: 0 },
    br: { radius: 0 },
    antiAlias: true
};
var xhr1;
var xhr2;

if (($("#brandCode").val() !== '') && ($("#brandCode").val() !== null) && ($("#brandCode").val() !== 'undefined') && ($("#brandCode").val() !== undefined)) {
    isBrandProductPage = true;
} else {
    isBrandProductPage = false;
}

$('a.plus').live("click", function (event) {
    $(this).removeClass('plus').addClass('minus').next().toggleClass('hide');
    initaiteScrollPane();
    event.stopPropagation();
});

$('.minus').live("click", function (event) {
    $(this).removeClass('minus');
    $(this).addClass('plus');
    $(this).next().toggleClass('hide');
    initaiteScrollPane();
    event.stopPropagation();
});


$(".filter-Age li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
	$('.filter-Age li.click-active').each(function () {
		if($(this).attr('categorycode') != $(currentObj).attr('categorycode')) {
			$(this).removeClass('click-active');
		}
	});
    if (isGrandParentsPage === 'true') {
        uniSelectCheckboxforGP(".filter-Age li", currentObj);
    } else {
        uniSelectCheckbox(".filter-Age li", currentObj);
    }
	buildHash(e.hasOwnProperty('originalEvent'));
});


$("ul.filter-category li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    if (isGrandParentsPage === 'true') {
        multiSelectCheckboxforGP("ul.filter-category li", currentObj);
    } else {
        multiSelectCheckbox("ul.filter-category li", currentObj);
    }
	buildHash(e.hasOwnProperty('originalEvent'));
});


$(".filter-brands li:not('.disabled')").live("click", function (e) {
    //alert("clicked");
    var currentObj = $(this);
    if (isGrandParentsPage === 'true') {
        multiSelectCheckboxforGP("ul.filter-brands > li", currentObj);
    } else {
        if (isEndecaSearch !== 'true') {
            multiSelectCheckbox("ul.filter-brands > li", currentObj);
        } else {
            uniSelectCheckbox(".filter-brands li", currentObj);
        }
    }
	buildHash(e.hasOwnProperty('originalEvent'));
});


$("ul.filter-themes > li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    multiSelectCheckbox("ul.filter-themes > li", currentObj);
	buildHash(e.hasOwnProperty('originalEvent'));
});

$(".filter-type li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    uniSelectCheckbox(".filter-type li", currentObj);
	buildHash(e.hasOwnProperty('originalEvent'));
});

$(".filter-solutions li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    if ($('#isBabyGear').val() === 'True') {
        multiSelectCheckbox(".filter-solutions li", currentObj);
    } else {
        uniSelectCheckbox(".filter-solutions li", currentObj);
    }
	buildHash(e.hasOwnProperty('originalEvent'));
});

$(".filter-development-stage li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    uniSelectCheckbox(".filter-development-stage li", currentObj);
	buildHash(e.hasOwnProperty('originalEvent'));
});

$(".filter-collections li:not('.disabled')").live("click", function (e) {
    var currentObj = $(this);
    if ($('#isBabyGear').val() === 'True') {
        multiSelectCheckbox(".filter-collections li", currentObj);
    } else {
        uniSelectCheckbox(".filter-collections li", currentObj);
    }
	buildHash(e.hasOwnProperty('originalEvent'));
});

/*$("div.level2 li:not('.disabled')").live("click", function (event) {
    var pagination = false;
    var pageIndex = 0;
    var pageSize = 9;
    var currentObject = $(this);
    if ($(this).hasClass('click-active')) {
        if (isGrandParentsPage === 'true') {
            $(this).removeClass("click-active");
            if ($("#viewAll").val() === 'true') {
                collectDataListEndeca(pagination, pageIndex, pageSize);
            } else {
                collectDataListForGP(pagination, pageIndex, pageSize);
            }
        } else {
            if (isEndecaSearch !== 'true') {
                $(".navigation li.click-active").removeClass('click-active');
                collectDataList(pagination, pageIndex, pageSize);
            } else {
                $(this).removeClass("click-active");
                    collectDataListEndeca(pagination, pageIndex, pageSize);
            }
        }

    } else {
        if (isGrandParentsPage === 'true') {
            $(this).addClass('click-active');
            if ($("#viewAll").val() === 'true') {
                collectDataListEndeca(pagination, pageIndex, pageSize);
            } else {
                collectDataListForGP(pagination, pageIndex, pageSize);
            }
        } else {
            if (isEndecaSearch !== 'true') {
                $(".navigation li.click-active").removeClass('click-active');
                $(this).addClass('click-active');
                collectDataList(pagination, pageIndex, pageSize);
            } else {
                $(this).addClass('click-active');
                    collectDataListEndeca(pagination, pageIndex, pageSize);
            }
        }
        gaTracking(currentObject);
    }
    event.stopPropagation();
});
*/
uniSelectCheckbox = function (selectedCategory, currentObject) {
    var pagination = false,
		pageIndex = "",
		pageSize = "";
	window.preventProductsLoading = true;
	if(!window.preventHashParsing) {
		hashSegments = window.location.hash.substr(1, 99999999).split("&");
		for (i = 0; i < hashSegments.length; i++) {
			pieces = hashSegments[i].split("=");
			if (pieces[0] == 'pageIndex') {
				pageIndex = pieces[1];
			}
			if (pieces[0] == 'pageSize') {
				pageSize = pieces[1];
			}
		}
	}
	if(pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == "") {
		pageSize = 9;
	}
    if ($(currentObject).hasClass('click-active')) {
        if (isEndecaSearch !== 'true') {
            //$(".navigation li.click-active").removeClass('click-active');
            $(currentObject).removeClass('click-active');
            collectDataList(pagination, pageIndex, pageSize, currentObject);
        } else {
            $(currentObject).removeClass("click-active");
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else {
        if (isEndecaSearch !== 'true') {
            //$(".navigation li.click-active").removeClass('click-active');
            $(currentObject).addClass('click-active');
            collectDataList(pagination, pageIndex, pageSize, currentObject);
        } else {
            $(selectedCategory).removeClass('click-active');
            $(currentObject).addClass('click-active');
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
        gaTracking(currentObject);
    }
    //curvyCornersRedraw();
};

multiSelectCheckbox = function (selectedCategory, currentObject) {
    var pagination = false,
		pageIndex = "",
		pageSize = "";
	window.preventProductsLoading = true;
	if(!window.preventHashParsing) {
		hashSegments = window.location.hash.substr(1, 99999999).split("&");
		for (i = 0; i < hashSegments.length; i++) {
			pieces = hashSegments[i].split("=");
			if (pieces[0] == 'pageIndex') {
				pageIndex = pieces[1];
			}
			if (pieces[0] == 'pageSize') {
				pageSize = pieces[1];
			}
		}
	}
	if(pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == "") {
		pageSize = 9;
	}

	$(currentObject).parents('li.level2').addClass('click-active');
	if ($(currentObject).hasClass('click-active')) {
		if (isEndecaSearch !== 'true') {
			//$(".navigation li.click-active").removeClass('click-active');
			$(currentObject).removeClass('click-active');
			collectDataList(pagination, pageIndex, pageSize, currentObject);
		} else {
			$(currentObject).removeClass('click-active');
				collectDataListEndeca(pagination, pageIndex, pageSize);
		}
	} else {
		if (isEndecaSearch !== 'true') {
			//$(".navigation li.click-active").removeClass('click-active');
			$(currentObject).addClass('click-active');
			$(currentObject).find('li').each(function () {
				$(this).removeClass('click-active');
			});
			collectDataList(pagination, pageIndex, pageSize, currentObject);
		} else {
			if($(currentObject).css('background-image') != 'none') {
				$(currentObject).addClass('click-active');
				collectDataListEndeca(pagination, pageIndex, pageSize);
			}
		}
		gaTracking(currentObject);
	}
};

uniSelectCheckboxforGP = function (selectedCategory, currentObject) {
    var pagination = false,
		pageIndex = "",
		pageSize = "";
	window.preventProductsLoading = true;
	if(!window.preventHashParsing) {
		hashSegments = window.location.hash.substr(1, 99999999).split("&");
		for (i = 0; i < hashSegments.length; i++) {
			pieces = hashSegments[i].split("=");
			if (pieces[0] == 'pageIndex') {
				pageIndex = pieces[1];
			}
			if (pieces[0] == 'pageSize') {
				pageSize = pieces[1];
			}
		}
	}
	if(pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == "") {
		pageSize = 9;
	}
    if ($(currentObject).hasClass('click-active')) {
        $(currentObject).removeClass("click-active");
        if ($("#viewAll").val() === 'true') {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        } else {
            collectDataListForGP(pagination, pageIndex, pageSize);
        }
    } else {
        $(selectedCategory).removeClass('click-active');
        $(currentObject).addClass('click-active');
        if ($("#viewAll").val() === 'true') {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        } else {
            collectDataListForGP(pagination, pageIndex, pageSize);
        }
        gaTracking(currentObject);
    }
    //curvyCornersRedraw();
};

multiSelectCheckboxforGP = function (selectedCategory, currentObject) {
    var pagination = false,
        pageIndex = "",
        pageSize = "";
	window.preventProductsLoading = true;
	if(!window.preventHashParsing) {
		hashSegments = window.location.hash.substr(1, 99999999).split("&");
		for (i = 0; i < hashSegments.length; i++) {
			pieces = hashSegments[i].split("=");
			if (pieces[0] == 'pageIndex') {
				pageIndex = pieces[1];
			}
			if (pieces[0] == 'pageSize') {
				pageSize = pieces[1];
			}
		}
	}
	if(pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == "") {
		pageSize = 9;
	}
    if ($(currentObject).hasClass('click-active')) {
        $(currentObject).removeClass("click-active");
        if ($("#viewAll").val() === 'true') {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        } else {
            collectDataListForGP(pagination, pageIndex, pageSize);
        }

    } else {
		if($(currentObject).css('background-image') != 'none') {
			$(currentObject).addClass('click-active');
			if ($("#viewAll").val() === 'true') {
				collectDataListEndeca(pagination, pageIndex, pageSize);
			} else {
				collectDataListForGP(pagination, pageIndex, pageSize);
			}
			gaTracking(currentObject);
		}
    }
    //curvyCornersRedraw();
};

var ageFilter = '',
	categoryFilter = '',
	brandsFilter = '',
	themesFilter = '',
	finalDataList = '',
	ageHTML = '',
	categoryHTML = '',
	brandsHTML = '',
	themesHTML = '',
    typeFilter = '',
    typeHTML = '',
    solutionsFilter = '',
    solutionsHTML = '',
    developmentStageFilter = '',
    developmentStageHTML = '',
    collectionsFilter = '',
    collectionsHTML = '',
    gaAge = '',
    gaCategory = '',
    gaBrand = '',
    googleAnalyticsData = '';



collectDataList = function (pagination, pageIndex, pageSize, currentObject) {

    $('.filter-Age li.click-active').each(function () {
        getName = $(this).attr('pName');
		ageFilter = ageFilter + "|" + getName;
        ageHTML = ageHTML + "<span class='left'>" + $(this).html() + "</span><a class='age updateFilterResults' pName='" + getName + "' href='#'></a>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	ageFilter = ageFilter.substring(1);

    $('.filter-category li.click-active').each(function (i) {
        getName = $(this).attr('pName');
		categoryFilter = categoryFilter + "|" + getName;
		categoryHTML = categoryHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='cat updateFilterResults right' pName='" + getName + "' href='#'></a></span>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	categoryFilter = categoryFilter.substring(1);

    $('.filter-type li.click-active').each(function () {
        getName = $(this).attr('pName');
        typeFilter = typeFilter + "|" + getName;
        // typeHTML = typeHTML + "<span>" + $(this).html() + "</span><a class='updateFilterResults' pName='" + getName + "' href='#'></a>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	typeFilter = typeFilter.substring(1);

	$('.filter-solutions li.click-active').each(function () {
		getName = $(this).attr('pName');
		solutionsFilter = solutionsFilter + "|" + getName;
		// solutionsHTML = solutionsHTML + "<span>" + $(this).html() + "</span><a class='updateFilterResults' pName='" + getName + "' href='#'></a>"; 
		googleAnalyticsData = $(this).attr('trackOnSuccess');
	});
	solutionsFilter = solutionsFilter.substring(1);

    $('.filter-development-stage li.click-active').each(function () {
        getName = $(this).attr('pName');
        developmentStageFilter = developmentStageFilter + "|" + getName;
        // developmentStageHTML = developmentStageHTML + "<span>" + $(this).html() + "</span><a class='updateFilterResults' pName='" + getName + "' href='#'></a>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	developmentStageFilter = developmentStageFilter.substring(1);

	$('.filter-collections li.click-active').each(function () {
		getName = $(this).attr('pName');
		collectionsFilter = collectionsFilter + "|" + getName;
		//  collectionsHTML = collectionsHTML + "<span>" + $(this).html() + "</span><a class='updateFilterResults' pName='" + getName + "' href='#'></a>";
		googleAnalyticsData = $(this).attr('trackOnSuccess');
	});
	collectionsFilter = collectionsFilter.substring(1);

    $('.filter-themes li.click-active').each(function (i) {
        getName = $(this).attr('pName');
		themesFilter = themesFilter + "|" + getName;
		themesHTML = themesHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='theme updateFilterResults right' pName='" + getName + "' href='#'></a></span>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	themesFilter = themesFilter.substring(1);

    $('.filter-brands li.click-active').each(function (i) {
        getName = $(this).attr('pName');
		brandsFilter = brandsFilter + "|" + getName;
		brandsHTML = brandsHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='brand updateFilterResults right' pName='" + getName + "' href='#'></a></span>";
        googleAnalyticsData = $(this).attr('trackOnSuccess');
    });
	brandsFilter = brandsFilter.substring(1);

    /* $('.filter-brands li.click-active').each(function () {
    getName = $(this).attr('pName');
    getValue = $(this).attr('pValue');
    brandsFilter = brandsFilter + getName + "," + getValue;
    brandsHTML = brandsHTML + "<span pName='" + getName + "' pValue='" + getValue + "'>" + $(this).html() + "</span><a class='updateFilterResults' href='#'></a>";
    });*/
	
	var ageArray = ageFilter.split("|");
	var categoryArray = categoryFilter.split("|");
	var brandsArray = brandsFilter.split("|");
	var themesArray = themesFilter.split("|");
	var typeArray = typeFilter.split("|");
	var solutionsArray = solutionsFilter.split("|");
	var developmentStageArray = developmentStageFilter.split("|");
	var collectionsArray = collectionsFilter.split("|");
	
	if(ageFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < ageArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + ageArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}
	
	if(categoryFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < categoryArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + categoryArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(brandsFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < brandsArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + brandsArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(themesFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < themesArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + themesArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(typeFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < typeArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + typeArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(solutionsFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < solutionsArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + solutionsArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(developmentStageFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < developmentStageArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + developmentStageArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

	if(collectionsFilter != "") {
		finalDataArr = finalDataList.split(",");
		finalDataList = "";
		for (i = 0; i < collectionsArray.length; i++) {
			for (j = 0; j < finalDataArr.length; j++) {
				finalDataList = finalDataList + "," + finalDataArr[j] + "*" + collectionsArray[i];
				finalDataList = finalDataList.replace(",*", ",");
			}
		}
		finalDataList = finalDataList.substring(1);
	}

/*    var finalDataListObj = new Object();
    finalDataListObj[0] = ageFilter;
    finalDataListObj[1] = categoryFilter;
    finalDataListObj[2] = brandsFilter;
    finalDataListObj[3] = themesFilter;
    finalDataListObj[4] = typeFilter;
    finalDataListObj[5] = solutionsFilter;
    finalDataListObj[6] = developmentStageFilter;
    finalDataListObj[7] = collectionsFilter;
*/
    var finalSelectedCategoriesList = new Object();
    finalSelectedCategoriesList[0] = ageHTML;
    finalSelectedCategoriesList[1] = categoryHTML;
    finalSelectedCategoriesList[2] = brandsHTML;
    finalSelectedCategoriesList[3] = themesHTML;
    finalSelectedCategoriesList[4] = typeHTML;
    finalSelectedCategoriesList[5] = solutionsHTML;
    finalSelectedCategoriesList[6] = developmentStageHTML;
    finalSelectedCategoriesList[7] = collectionsHTML;
/*
    // Nr=AND(OR(4294961765,4294961849),OR(4294961862),NOT(4294961819))

    for (i = 0; i <= 7; i++) {
        if (finalDataListObj[i] !== '') {
            finalDataList = finalDataList + finalDataListObj[i] + "$";
        }
    }
*/
    var targetId = "#result";


    //alert(googleAnalyticsData);

    $('#productsList').html("");
    $('#productsList').addClass('loading');

    // check if the preProductLoad() defined on the page
    if ($.isFunction(window.preProductLoad)) {
    	preProductLoad(finalDataList);
    }
	
	var finalQueryStringToUpdateLeftPanel;

    if($('.brand-site-fpbaby').length > 0) {
		finalQueryStringToUpdateLeftPanel = "agecode=" + ageFilter.replace(/\|/g, ",") + "&catcode=" + categoryFilter.replace(/\|/g, ",");
		if(categoryFilter != "") {
			finalQueryStringToUpdateLeftPanel += ",";
		}
		finalQueryStringToUpdateLeftPanel += solutionsFilter.replace(/\|/g, ",");
		finalQueryStringToUpdateLeftPanel += "&brands=" + collectionsFilter.replace(/\|/g, ",");
		updateFilterCategories(finalQueryStringToUpdateLeftPanel);
	}

    if (pagination === false) {
        updateProductsList(targetId, finalDataList, isBrandProductPage, pageIndex, pageSize, googleAnalyticsData); // filters not via pagination
        clearObjects();
        updateSelectedfilterList(finalSelectedCategoriesList);
        disableAllCheckboxes();
    } else {
        updateComponents(finalDataList, pageIndex, pageSize, isBrandProductPage, googleAnalyticsData); // filaters via pagiantion
        clearObjects();
        updateSelectedfilterList(finalSelectedCategoriesList);
        disableAllCheckboxes();
    }
};

var categoryFilterList = '';
var data_sort = 'pPrice|1';
hashSegments = window.location.hash.substr(1, 99999999).split("&");
for (i = 0; i < hashSegments.length; i++) {
	pieces = hashSegments[i].split("=");
	if (pieces[0] == 'dataSort') {
		data_sort = pieces[1];
	}
}

collectDataListEndeca = function (pagination, pageIndex, pageSize, navOnly, brandHeaderImage) {
	var brandHeaderHTML = null;
	if (brandHeaderImage != null) {
		brandHeaderHTML = brandHeaderImage.html();
	}
    var N = 0, // default value which needs to be sent to the endeca server
		recPerPage = pageSize, // this value is take from the pagination 
		Ns = data_sort, // default sort value
		No = parseInt(pageSize) * parseInt(pageIndex);
    Nr = 'NOT(4294961819)'; // default age/brand/category selection which is sent to the server. This will be modified on brand/catefgory selction
    Nf = '';
	var optionsSelected = false;
    // Following variables are used to form a query string which updtes the left side section based on the selected filters
    var ageQString = '',
        categoryQString = '',
        brandsQString = '';
    $('.filter-Age li.click-active').each(function () {
        Nf = "pMinAge|LT+" + $(this).attr('endeca-attr-max') + "|pMaxAge|GT+" + $(this).attr('endeca-attr-min'); // age category selection
        ageHTML = ageHTML + "<span class='left'>" + $(this).html() + "</span><a class='age updateFilterResults' data-age-name='" + $(this).attr('data-age-name') + "' href='#'></a>";
        ageQString = "cminage=" + $(this).attr('data-min-age') + "&cmaxage=" + $(this).attr('data-max-age') + "&agecode=" + $(this).attr('selector-code');
        gaAge = 'Age- ' + $(this).attr('data-age-name');
		optionsSelected = true;
    });

	isVewAllSelected = $(".filter-category li.void").hasClass('click-active');
    if(navOnly != 1) {
		if (isVewAllSelected === true) {
			$('.filter-category li:not(".void")').removeClass('click-active');
		}
	}

    var selectedFilter_categoryLength = $('.filter-category li.click-active').length;
    $('.filter-category li.click-active').each(function (i) {
        getCategoryCode = $(this).attr('endeca-attr');
        getDataCateryCode = $(this).attr('data-cat-code');
        gaCategory = 'Category- ' + $(this).html();
        if (i === 0) {
            categoryFilterList = categoryFilterList + getCategoryCode;
            categoryHTML = categoryHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='cat updateFilterResults right' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>" + "$";
            categoryQString = categoryQString + getDataCateryCode;
        } else {
            categoryFilterList = categoryFilterList + ',' + getCategoryCode;
            categoryHTML = categoryHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='cat updateFilterResults right' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>";
            categoryQString = categoryQString + ',' + getDataCateryCode;
        }
		optionsSelected = true;
    });
    // final catgory string

    if (categoryFilterList !== '') {
        categoryFilter = "OR(" + categoryFilterList + ")";
    }

    $('.filter-brands li.click-active').each(function () {
        getBrandCodeName = $(this).attr('endeca-attr');
        getDataBrandCode = $(this).attr('data-brand-code');
        gaBrand = 'Brand/Character- ' + $(this).attr('data-brand-name');
        //getValue = $(this).attr('pValue');
        brandsFilter = brandsFilter + getBrandCodeName;
        brandsHTML = brandsHTML + "<span class='left'>" + $(this).html() + "</span><a class='brand updateFilterResults right' data-brand-code='" + $(this).attr('data-brand-code') + "' href='#'></a>";
        brandsQString = brandsQString + getDataBrandCode;
		optionsSelected = true;
    });
    // final Brand string

	if(!optionsSelected && window.topNine && navOnly != 1) {
		data_sort = "";
		collectDataListForInt(pagination, pageIndex, pageSize);
		return;
	}

		if (brandsFilter !== '') {
        brandsFilter = "OR(" + brandsFilter + ")";
    }


    // final string for the age. brand and categoty filter: Follwoing is the patern of the string 		
    // Nr=AND( OR(4294961765,4294961849), OR(4294961862),NOT(4294961819))

    var finalDataListObj = new Object();
    finalDataListObj[0] = categoryFilter;
    finalDataListObj[1] = brandsFilter;
    finalDataListObj[2] = Nr;

    //console.log(ageHTML);
    var finalSelectedCategoriesList = new Object();
    finalSelectedCategoriesList[0] = ageHTML;
    finalSelectedCategoriesList[1] = categoryHTML;
    finalSelectedCategoriesList[2] = brandsHTML;


    if ((categoryFilter === '') && (brandsFilter === '')) {
        Nr = 'NOT(4294961819)';
    } else {
        for (i = 0; i <= 2; i++) {
            if ((finalDataListObj[i] !== '') && i !== 0) {
                if (finalDataList !== '') {
                    finalDataList = finalDataList + ',' + finalDataListObj[i];
                } else {
                    finalDataList = finalDataList + finalDataListObj[i];
                }
            } else {
                finalDataList = finalDataList + finalDataListObj[i];
            }
        };
        Nr = "AND(" + finalDataList + ")";
    }

    var googleAnalyticsData = gaAge + gaCategory + gaBrand + 'SortBy- ' + data_sort + '~None~Toy Finder~Thumbnail~View';

    if (Nf !== '') {
        finalQueryString = "&N=0&Nr=" + Nr + "&Nf=" + Nf + "&recPerPage=" + pageSize + "&Ns=" + Ns + "&No=" + No + "&pageIndex=" + pageIndex;
    } else {
        finalQueryString = "&N=0&Nr=" + Nr + "&recPerPage=" + pageSize + "&Ns=" + Ns + "&No=" + No + "&pageIndex=" + pageIndex;
    }

    if ((Nf === '') && (Nr === 'NOT(4294961819)') && (isVewAllSelected === false) && (Ns === '')) {
        finalQueryString = "&N=0&Nr=" + Nr + "&recPerPage=" + pageSize + "&No=" + No + "&pageIndex=" + pageIndex;
		if (isGrandParentsPage === 'true') {
			finalQueryString = "&recPerPage=" + pageSize + "&Ns=" + Ns + "&No=" + No + "&Nr=" + 'NOT(4294961819)' + "&N=0" + "&pageIndex=" + pageIndex;
		}
    }

    var agequerystring = ageQString ? ageQString : "_nop=1";
    finalQueryStringToUpdateLeftPanel = agequerystring + "&catcode=" + categoryQString + "&brands=" + brandsQString;

    //alert(finalQueryStringToUpdateLeftPanel);
    var targetId = "#result";
    if(navOnly != 1) {
		$('#productsList').html("");
		$('#productsList').addClass('loading');
	}
    // update the left panel
    updateFilterCategories(finalQueryStringToUpdateLeftPanel);
    // update the right panel
    if(navOnly != 1) {
		updateProductsListEndeca(targetId, finalQueryString, googleAnalyticsData, brandHeaderHTML);
    }
	clearObjects();
    // update the selected filters at the top of the leftside panel:
    updateSelectedfilterList(finalSelectedCategoriesList);
    disableAllCheckboxes();
};

collectDataListForGP = function (pagination, pageIndex, pageSize) {

    $('.filter-Age li.click-active').each(function () {
        getMinAge = $(this).attr('data-min-age');
        getMaxAge = $(this).attr('data-max-age');
        ageFilter = ageFilter + "minAge=" + getMinAge + "&maxAge=" + getMaxAge;
        // ageHTML = ageHTML + "<span pName='" + getName + "' pValue='" + getValue + "'>" + $(this).html() + "</span><a class='updateFilterResults' href='#'></a>"
        gaAge = 'Age- ' + $(this).attr('data-age-name');
    });

    //alert(ageFilter);
    isVewAllSelected = $(".filter-category li.void").hasClass('click-active');
    if (isVewAllSelected === true) {
        $('.filter-category li:not(".void")').removeClass('click-active');
    }

    var selectedFilter_categoryLength = $('.filter-category li.click-active').length;
    $('.filter-category li.click-active').each(function (i) {
        getCategoryCode = $(this).attr('data-cat-code');
        gaCategory = 'Category- ' + $(this).html();
        if (i === 0) {
            categoryFilterList = categoryFilterList + getCategoryCode;
            // categoryHTML = categoryHTML + "<span class='left listedItems'><span>" + $(this).html() + "</span><a class='cat updateFilterResults' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>" + "$";
            // categoryQString = categoryQString + getDataCateryCode;
        } else {
            categoryFilterList = categoryFilterList + ',' + getCategoryCode;
            // categoryHTML = categoryHTML + "<span class='left listedItems'><span>" + $(this).html() + "</span><a class='cat updateFilterResults' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>";
            // categoryQString = categoryQString + ',' + getDataCateryCode;
        }
    });

    // alert(categoryFilterList);

    var selectedFilter_brandLength = $('.filter-brands li.click-active').length;
    $('.filter-brands li.click-active').each(function (i) {
        getBrandCode = $(this).attr('data-brand-code');
        gaBrand = 'Brand/Character- ' + $(this).attr('data-brand-name');
        if (i === 0) {
            brandsFilter = brandsFilter + getBrandCode;
            // categoryHTML = categoryHTML + "<span class='left listedItems'><span>" + $(this).html() + "</span><a class='cat updateFilterResults' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>" + "$";
            // categoryQString = categoryQString + getDataCateryCode;
        } else {
            brandsFilter = brandsFilter + ',' + getBrandCode;
            // categoryHTML = categoryHTML + "<span class='left listedItems'><span>" + $(this).html() + "</span><a class='cat updateFilterResults' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>";
            // categoryQString = categoryQString + ',' + getDataCateryCode;
        }
    });

    if (ageFilter === '') {
        ageFilter = "minAge=&maxAge=";
    }
    finalQueryString = ageFilter + "&category=" + categoryFilterList + "&brands=" + brandsFilter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&days=" + $("#days").val() + "&sortType=" + data_sort;
    var googleAnalyticsData = gaAge + gaCategory + gaBrand + 'SortBy- ' + data_sort + '~For GrandParents~None~Thumbnail~View';
    ajaxURL = localInfo + "/product/GetNewProductsForGP?" + finalQueryString;
    $('#productsList').html("");
    $('#productsList').addClass('loading');
    updateProductsListforGP(ajaxURL, googleAnalyticsData);
    clearObjects();

};

collectDataListForInt = function (pagination, pageIndex, pageSize) {
    // Following variables are used to form a query string which updtes the left side section based on the selected filters
    var ageQString = '',
        categoryQString = '',
        brandsQString = '';
    $('.filter-Age li.click-active').each(function () {
        getMinAge = $(this).attr('data-min-age');
        getMaxAge = $(this).attr('data-max-age');
        ageFilter = ageFilter + "minAge=" + getMinAge + "&maxAge=" + getMaxAge;
        ageHTML = ageHTML + "<span class='left'>" + $(this).html() + "</span><a class='age updateFilterResults' data-age-name='" + $(this).attr('data-age-name') + "' href='#'></a>";
        ageQString = "cminage=" + $(this).attr('data-min-age') + "&cmaxage=" + $(this).attr('data-max-age') + "&agecode=" + $(this).attr('selector-code');
        gaAge = 'Age- ' + $(this).attr('data-age-name');
    });

    //alert(ageFilter);
    isVewAllSelected = $(".filter-category li.void").hasClass('click-active');
    if (isVewAllSelected === true) {
        $('.filter-category li:not(".void")').removeClass('click-active');
    }

    var selectedFilter_categoryLength = $('.filter-category li.click-active').length;
    $('.filter-category li.click-active').each(function (i) {
        getCategoryCode = $(this).attr('data-cat-code');
        gaCategory = 'Category- ' + $(this).html();
        if (i === 0) {
            categoryFilterList = categoryFilterList + getCategoryCode;
            categoryHTML = categoryHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='cat updateFilterResults right' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>" + "$";
            categoryQString = categoryQString + getCategoryCode;
        } else {
            categoryFilterList = categoryFilterList + ',' + getCategoryCode;
            categoryHTML = categoryHTML + "<span class='left listedItems'><span class='left'>" + $(this).html() + "</span><a class='cat updateFilterResults right' data-cat-code='" + $(this).attr('data-cat-code') + "' href='#'></a></span>" + "$";
            categoryQString = categoryQString + getCategoryCode;
        }
    });

    // alert(categoryFilterList);

    var selectedFilter_brandLength = $('.filter-brands li.click-active').length;
    $('.filter-brands li.click-active').each(function (i) {
        getBrandCode = $(this).attr('data-brand-code');
        gaBrand = 'Brand/Character- ' + $(this).attr('data-brand-name');
        if (i === 0) {
            brandsFilter = brandsFilter + getBrandCode;
            brandsHTML = brandsHTML + "<span class='left'>" + $(this).html() + "</span><a class='brand updateFilterResults right' data-brand-code='" + $(this).attr('data-brand-code') + "' href='#'></a>";
            brandsQString = brandsQString + getBrandCode;
        } else {
            brandsFilter = brandsFilter + ',' + getBrandCode;
            brandsHTML = brandsHTML + "<span class='left'>" + $(this).html() + "</span><a class='brand updateFilterResults right' data-brand-code='" + $(this).attr('data-brand-code') + "' href='#'></a>";
            brandsQString = brandsQString + getBrandCode;
        }
    });

    //console.log(ageHTML);
    var finalSelectedCategoriesList = new Object();
    finalSelectedCategoriesList[0] = ageHTML;
    finalSelectedCategoriesList[1] = categoryHTML;
    finalSelectedCategoriesList[2] = brandsHTML;
    if (ageFilter === '') {
        ageFilter = "minAge=&maxAge=";
    }
    finalQueryString = ageFilter + "&category=" + categoryFilterList + "&brands=" + brandsFilter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&sortType=" + data_sort + "&PubId=" + $("#PublicationId").val();

    ajaxURL = localInfo + "/product/GetFilteredProductsForInterrnational?" + finalQueryString;
    var agequerystring = ageQString ? ageQString : "_nop=1";
    finalQueryStringToUpdateLeftPanel = agequerystring + "&catcode=" + categoryQString + "&brands=" + brandsQString;
    var googleAnalyticsData = gaAge + gaCategory + gaBrand + 'SortBy- ' + data_sort + '~None~Toy Finder~Thumbnail~View';
    $('#productsList').html("");
    $('#productsList').addClass('loading');
    // update the left panel
    updateFilterCategories(finalQueryStringToUpdateLeftPanel);
    // update the right panel
    updateProductsListforGP(ajaxURL, googleAnalyticsData);
    clearObjects();
    // update the selected filters at the top of the leftside panel:
    updateSelectedfilterList(finalSelectedCategoriesList);
    disableAllCheckboxes();
	data_sort = "pPrice|1";
};

clearObjects = function () {
    finalDataListObj = [];
    ageFilter = '';
    categoryFilter = '';
    brandsFilter = '';
    themesFilter = '';
    finalDataList = '';
    categoryFilterList = '';
    finalQueryString = '';
    Nf = '';
    Nr = '';
    typeFilter = '';
    solutionsFilter = '';
    developmentStageFilter = '';
    collectionsFilter = '';
    ageHTML = '';
    categoryHTML = '';
    brandsHTML = '';
    themesHTML = '';
    typeFilter = '';
    typeHTML = '';
    solutionsFilter = '';
    solutionsHTML = '';
    developmentStageFilter = '';
    developmentStageHTML = '';
    collectionsFilter = '';
    collectionsHTML = '';
};

updateFilterCategories = function (DataList) {
	if(xhr2 && xhr2.readystate != 4){
		xhr2.abort();
	}
	xhr2 = $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        //data: DataList,
        async: 'false',
        url: localInfo + "/Search/GetNavigationFilters?" + DataList,
        success: function (data) {
            if (data !== '') {
                data = data.replace(/\'/g, '"');
                var obj = jQuery.parseJSON(data);
                objAge = obj.age;
                objCategory = obj.category;
                objBrands = obj.brands;
                updateAgeFilterSection(objAge);
                updateCategoryFilterSection(objCategory);
                updateBrandsFilterSection(objBrands);
				$('[endeca-attr=""]:not(.void)').hide();
				$('[data-brand-code="babyu"]').hide();
				var patt=/FPBabyFAP/i;
				var patt2=/\?\?.*\?\?/i;
				var pattTags1=/<.*FPBabyFAP.*>/i;
				var pattTags2=/<.*\?\?.*\?\?.*>/i;
				$('.navigation li').each(function () {
					if((patt.exec($(this).html()) || patt2.exec($(this).html())) && !(pattTags1.exec($(this).html()) || pattTags2.exec($(this).html()))) {
						$(this).hide();
					}
				});
				initaiteScrollPane();
                curvyCornersRedraw();
				
            } else {
                enableAllFiltercategories();
				initaiteScrollPane();
                curvyCornersRedraw();
            }
        },
        error: function (data) {
            enableAllFiltercategories();
        }
    });
};

updateProductsList = function (targetId, finalDataList, isBrandProductPage, pageIndex, pageSize, googleAnalyticsData) {
    if (isBrandProductPage === true) {
        if (finalDataList === '') {
            finalDataList = $("#brandCode").val();
        }
        ajaxURL = localInfo + "/Product/GetProductsForBrands?filterdata=" + finalDataList + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&data_sort=" + data_sort;
    } else {
        ajaxURL = localInfo + "/Filter/GetResults?filterdata=" + finalDataList + "&PubId=" + $("#PubId").val() + "&Page_type=" + $("#Page_type").val() + "&PageCategoryUri=" + $("#PageCategoryUri").val() + "&isBrandPage=" + $("#isBrandPage").val();
    }
	if(xhr1 && xhr1.readystate != 4){
		xhr1.abort();
	}
	xhr1 = $.ajax({
		type: ajaxRequestMethod,
		cache: 'false',
		//data: finalDataList,
		url: ajaxURL,
		success: function (data) {
			$('#productsList').removeClass('loading');
			$('#productsList').html(data);
			curvyCornersRedraw();
			if (isBrandProductPage === true) {
				createCurvyCorners(settings, ".product");
			} else {
				//Filter - Games & Activities Tab
				createCurvyCorners(settingsTiles_header, ".tiles-header, .online-game-tiles-header");
				createCurvyCorners(settingsColor_content, ".color-content");

			}
			enableAllCheckboxes();
			triggerGAOnAjaxSuccess(googleAnalyticsData);
			selectFilterFromHash();
	   },
		error: function (data) {
			enableAllCheckboxes();
		}
	});
};

updateProductsListEndeca = function (targetId, finalDataList, googleAnalyticsData, brandHeaderHTML) {
    if (finalQueryString === 'defaultView') {
        if (isGrandParentsPage === 'true') {
            ajaxURL = localInfo + "/Search/GetProductSearchResults?" + finalQueryString;
        } else {
            ajaxURL = localInfo + "/Product/GetProductsDetailsJson"
        }

    } else {
        ajaxURL = localInfo + "/Search/GetProductSearchResults?" + finalQueryString;
    }
    $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        //data: finalDataList,
        url: ajaxURL,
        success: function (data) {
            $('#productsList').removeClass('loading');
            $('#productsList').html(data);
            curvyCornersRedraw();
            createCurvyCorners(settings, ".product");
            enableAllCheckboxes();
            triggerGAOnAjaxSuccess(googleAnalyticsData);
			selectFilterFromHash();
			if(brandHeaderHTML != null) {
				$('.column-product-find.search-results').prepend("<span class=\"brandHeaderImage\">" + brandHeaderHTML + "</span");
				$('.brandHeaderImage img').show();
			}
        },
        error: function (data) {
            enableAllCheckboxes();
        }
    });
};

updateProductsListforGP = function (ajaxURL, googleAnalyticsData) {
    $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        url: ajaxURL,
        success: function (data) {
            $('#productsList').removeClass('loading');
            $('#productsList').html(data);
            enableAllCheckboxes();
            createCurvyCorners(settings, ".product");
            triggerGAOnAjaxSuccess(googleAnalyticsData);
            curvyCornersRedraw();
 			selectFilterFromHash();
       },
        error: function (data) {
            enableAllCheckboxes();
        }
    });
};

updateAgeFilterSection = function (objAge) {
    var liRef = $(".filter-Age li");
    $(liRef).each(function () {
        var getCode = $(this).attr('selector-code');
		if(getCode == undefined) {
			getCode = $(this).attr('categorycode');
		}
		getCode = getCode.toLowerCase();
        if ($.inArray(getCode, objAge) !== -1) {
            $(this).css("display", 'block');
        } else {
            $(this).css("display", 'none');
        }
    });
    initaiteScrollPane();
};

updateCategoryFilterSection = function (objCategory) {
    var liRef = $(".filter-category li, .filter-solutions li");
    $(liRef).each(function () {
        var getCode = $(this).attr('data-cat-code');
		if(getCode == undefined) {
			getCode = $(this).attr('categorycode');
		}
		getCode = getCode.toLowerCase();
        if ($.inArray(getCode, objCategory) !== -1) {
            $(this).css("display", 'block');
			if($(this).hasClass('level2')) {
				$(this).parents('li').css("display", 'block');
				$(this).parents('li').removeClass('disabled');
			}
        } else {
            $(this).css("display", 'none');
        }
    });
    $(".filter-category li.void").css('display', 'block');
    initaiteScrollPane();
};

updateBrandsFilterSection = function (objBrands) {
    var liRef = $(".filter-brands li, .filter-collections li");
    $(liRef).each(function () {
        var getCode = $(this).attr('data-brand-code');
		if(getCode == undefined) {
			getCode = $(this).attr('categorycode');
		}
		getCode = getCode.toLowerCase();
        if ($.inArray(getCode, objBrands) !== -1) {
            $(this).css("display", 'block');
        } else {
            $(this).css("display", 'none');
        }
    });
    initaiteScrollPane();
};

enableAllFiltercategories = function () {
    $('.navigation li').css('display', 'block');
	var patt=/FPBabyFAP/ig;
	$('.navigation li').each(function () {
		if(patt.exec($(this).html())) {
			$(this).hide();
		}
	});
	 initaiteScrollPane();
};

updateSelectedfilterList = function (finalSelectedCategoriesList) {
    if (finalSelectedCategoriesList[0] !== undefined) {
        var selectedAgeString = finalSelectedCategoriesList[0];
        var creatHTMLage = selectedAgeString; // As this is a singl element, we are directly assigning the HTML string
        if (creatHTMLage !== '') {
            $('.selected-age span').html(creatHTMLage).parents('li').css("display", 'block');
            $('.selected-age').css('border-bottom', '1px solid #C86F1E');
        } else {
            $('.selected-age span').html('');
            $('.selected-age').css('border-bottom', '0px');
        }
    }

    if (finalSelectedCategoriesList[1] !== undefined) {
        var selectedCategoryString = finalSelectedCategoriesList[1];
        var creatHTMLCategories = ''; // As this is a multi string, we need to take the string and then break and etc...
        selectedCategoryString = selectedCategoryString.split('$');
        for (i = 0; i <= selectedCategoryString.length - 1; i++) {
            creatHTMLCategories = creatHTMLCategories + selectedCategoryString[i];
        }

        $(creatHTMLCategories).find('span:last').remove();
        if (creatHTMLCategories !== '') {
            $('.selected-category span.listedItems').html(creatHTMLCategories).parents('li').css("display", 'block');
            $('.selected-category').css('border-bottom', '1px solid #C86F1E');
            $('.selected-category').find('a.expand').remove();
        } else {
            $('.selected-category span.listedItems').html('');
            $('.selected-category').css('border-bottom', '0px');
        }

    }


    if (finalSelectedCategoriesList[2] !== undefined) {
        /* var selectedBrandsString = finalSelectedCategoriesList[2];
        creatHTMLbrands = selectedBrandsString;
        if (creatHTMLbrands !== '') {
        $('.selected-brands span').html(creatHTMLbrands).parents('li').css("display", 'block');
        $('.selected-brands').css('border-bottom', '1px solid #C86F1E');
        } else {
        $('.selected-brands span').html('');
        $('.selected-brands').css('border-bottom', '0px');
        }*/
        var selectedBrandsString = finalSelectedCategoriesList[2];
        var creatHTMLbrands = '';
        selectedBrandsString = selectedBrandsString.split('$');
        for (i = 0; i <= selectedBrandsString.length - 1; i++) {
            creatHTMLbrands = creatHTMLbrands + selectedBrandsString[i];
        }


        $(creatHTMLbrands).find('span:last').remove();
        if (creatHTMLbrands !== '') {
            $('.selected-brands span').html(creatHTMLbrands).parents('li').css("display", 'block');
            $('.selected-brands').css('border-bottom', '1px solid #C86F1E');
        } else {
            $('.selected-brands span').html('');
            $('.selected-brands').css('border-bottom', '0px');
        }
    }

    if (finalSelectedCategoriesList[3] !== undefined) {
        var selectedThemesString = finalSelectedCategoriesList[3];
        var creatHTMLThemes = '';
        selectedThemesString = selectedThemesString.split('$');
        for (i = 0; i <= selectedThemesString.length - 1; i++) {
            creatHTMLThemes = creatHTMLThemes + selectedThemesString[i];
        }


        $(creatHTMLThemes).find('span:last').remove();
        if (creatHTMLThemes !== '') {
            $('.selected-theme span.listedItems').html(creatHTMLThemes).parents('li').css("display", 'block');
            $('.selected-theme').css('border-bottom', '1px solid #C86F1E');
        } else {
            $('.selected-theme span.listedItems').html('');
            $('.selected-theme').css('border-bottom', '0px');
        }
    }

    //Hide/show sort by selected area
    display_sortByArea();

    curvyCornersRedraw();
};

siteSearchResults = function (pageIndex, pageSize, sortValue) {
    // alert("searchResults");
    var tempUrl = document.URL.split("#");
    var url = tempUrl[0];
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var aditionalURL = tempArray[1];
    var No = parseInt(pageSize) * parseInt(pageIndex);
    var ajaxURL = localInfo + "/search/GetSiteSearchResults?" + aditionalURL + "&pageIndex=" + pageIndex + "&recPerPage=" + pageSize + "&Ns=" + sortValue + "&No=" + No;
    $("#productsList").html('');
    $("#productsList").addClass('loading');
    // alert(finalURL);
    // window.location = finalURL;
    updateSearchResultsSection(ajaxURL);
};

siteSearchResults_intl = function (pageIndex, pageSize, sortValue) {
    // alert("searchResults");
    var url = document.URL
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var aditionalURL = tempArray[1];
    var No = parseInt(pageSize) * parseInt(pageIndex);
    var ajaxURL = localInfo + "/product/GetCMASearchResultsAjax?" + aditionalURL + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&data_sort=" + sortValue + "&No=" + No;
    $("#productsList").html('');
    $("#productsList").addClass('loading');
    // alert(finalURL);
    // window.location = finalURL;
    updateSearchResultsSection(ajaxURL);
};

$(".clear-all, .clear-all-icon").live("click", function () {
	window.location.hash = "";
    $(".navigation ul li.click-active").removeClass('click-active');
    $(".navigation ul li").css('display', 'block');
    $(".selected-result li:not('.select')").css('display', 'none');
    initaiteScrollPane();
    var pagination = false,
        pageIndex = 0,
        pageSize = 9;
    if (isEndecaSearch !== 'true') {
        collectDataList(pagination, pageIndex, pageSize);
    } else {
        if ($('#locale').val().toLowerCase() === 'en_us' && window.topNine) {
			data_sort = "";
            collectDataListForInt(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    }

    //Hide/show sort by selected area
    display_sortByArea();

    currentObject = $(this);
    gaTracking(currentObject);
    return false;
});

$(".age.updateFilterResults").live("click", function (e) {
    if ($(this).attr('pName') === undefined) {
        getName = $(this).attr('data-age-name');
        categoryCode = 'data-age-name';
    } else {
        getName = $(this).attr('pName');
        categoryCode = 'pName';
    }
    removeSelectedCategory('filter-Age', getName, categoryCode);
	buildHash(e.hasOwnProperty('originalEvent'));
    return false;
});

$(".cat.updateFilterResults").live("click", function (e) {
    if ($(this).attr('pName') === undefined) {
        getName = $(this).attr('data-cat-code');
        categoryCode = 'data-cat-code';
    } else {
        getName = $(this).attr('pName');
        categoryCode = 'pName';
    }
    removeSelectedCategory('filter-category', getName, categoryCode);
	buildHash(e.hasOwnProperty('originalEvent'));
    return false;
});

$(".brand.updateFilterResults").live("click", function (e) {
    if ($(this).attr('pName') === undefined) {
        getName = $(this).attr('data-brand-code');
        categoryCode = 'data-brand-code';
    } else {
        getName = $(this).attr('pName');
        categoryCode = 'pName';
    }
    removeSelectedCategory('filter-brands', getName, categoryCode);
	buildHash(e.hasOwnProperty('originalEvent'));
    return false;
});

$(".theme.updateFilterResults").live("click", function (e) {
    getName = $(this).attr('pName');
    categoryCode = 'pName';
    removeSelectedCategory('filter-themes', getName, categoryCode);
	buildHash(e.hasOwnProperty('originalEvent'));
    return false;
});

removeSelectedCategory = function (categoryType, getName, categoryCode) {
    var pagination = false,
        pageIndex = 0,
        pageSize = 9;
    $("ul." + categoryType + " li.click-active").each(function () {
        getCurrentName = $(this).attr(categoryCode);
        if (getCurrentName == getName) {
            $(this).removeClass('click-active');
        }
    });
    $(this).parent().remove();
    if (isEndecaSearch !== 'true') {
        collectDataList(pagination, pageIndex, pageSize);
    } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
    }

    //Hide/show sort by selected area
    display_sortByArea();

    //curvyCornersRedraw();
    initaiteScrollPane();
    return false;
};


initaiteScrollPane = function () {
    $('.left-scroll-pane').jScrollPane({ showArrows: true });
    $('.scroll-pane').jScrollPane({ showArrows: false });
};


$(".pageIndex").live("click", function (e) {
    var pageSize = parseInt($(".selected .pageSize").attr('pageSize'));
    var pageIndex = parseInt(jQuery(this).attr("pageindex"));
    var pagination = true;
    if (isSearchResults === 'true') {
            siteSearchResults(pageIndex, pageSize, data_sort);
    } else if (isGrandParentsPage === 'true') {
        if ($("#viewAll").val() === 'false') {
            collectDataListForGP(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else if (isShareYourThoughts === 'true') {
        updateWindowURL(pageSize, pageIndex, 'pageIndex');
    } else {
        if (isEndecaSearch !== 'true') {
            collectDataList(pagination, pageIndex, pageSize);
        } else {
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    }
	if (isShareYourThoughts != 'true') {
		updateHash((this), e.hasOwnProperty('originalEvent'));
	}
});

$(".pageSize").live("click", function (e) {
    var pageSize = parseInt(jQuery(this).attr("pagesize"));
    var pageIndex = 0;
    var pagination = true;
    //alert(isSearchResults);
    if (isSearchResults === 'true') {
            siteSearchResults(pageIndex, pageSize, data_sort);
    } else if (isGrandParentsPage === 'true') {
        pageIndex = 0;
        if ($("#viewAll").val() === 'false') {
            collectDataListForGP(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else if (isShareYourThoughts === 'true') {
        pageIndex = parseInt($('#pagination-results .active').attr('pageindex'));
        updateWindowURL(pageSize, pageIndex, 'pageSize');
    } else {
        if (isEndecaSearch !== 'true') {
            collectDataList(pagination, pageIndex, pageSize);
        } else {
            var pageIndex = 0;
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    }
	if (isShareYourThoughts != 'true') {
		updateHash((this), e.hasOwnProperty('originalEvent'));
	}
});

$(".pagination-next").live("click", function (e) {
    var pageSize = parseInt($(".selected .pageSize").attr('pageSize'));
    var pageIndex;
    var pagination = true;
    pageIndex = parseInt($('#pagination-results .active').attr('pageindex')) + 1;
    if (isSearchResults === 'true') {
            siteSearchResults(pageIndex, pageSize, data_sort);
    } else if (isGrandParentsPage === 'true') {
        if ($("#viewAll").val() === 'false') {
            collectDataListForGP(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else if (isShareYourThoughts === 'true') {
        updateWindowURL(pageSize, pageIndex, 'pageIndex');
    } else {
        if (isEndecaSearch !== 'true') {
            collectDataList(pagination, pageIndex, pageSize);
        } else {
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    }
	if (isShareYourThoughts != 'true') {
		updateHash((this), e.hasOwnProperty('originalEvent'));
	}
});

$(".pagination-previous").live("click", function (e) {
    var pageSize = parseInt($(".selected .pageSize").attr('pageSize'));
    var pageIndex;
    var pagination = true;
    pageIndex = parseInt($('#pagination-results .active').attr('pageindex')) - 1;
    if (isSearchResults === 'true') {
            siteSearchResults(pageIndex, pageSize, data_sort);
    } else if (isGrandParentsPage === 'true') {
        if ($("#viewAll").val() === 'false') {
            collectDataListForGP(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else if (isShareYourThoughts === 'true') {
        updateWindowURL(pageSize, pageIndex, 'pageIndex');
    } else {
        if (isEndecaSearch !== 'true') {
            collectDataList(pagination, pageIndex, pageSize);
        } else {
                collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    }
	if (isShareYourThoughts != 'true') {
		updateHash((this), e.hasOwnProperty('originalEvent'));
	}
});

$(".ellipses").live("click", function () {
    var pageSize = parseInt(jQuery(this).attr("pagesize"));
    var pageIndex;
    var pagination = true;
    if (isEndecaSearch !== 'true') {
        collectDataList(pagination, pageIndex, pageSize);
    } else {
        collectDataListEndeca(pagination, pageIndex, pageSize);
    }
});

updateComponents = function (finalDataList, pageIndex, pageSize, isBrandProductPage) {
    if (isBrandProductPage === true) {
        if (finalDataList === '') {
            finalDataList = $("#brandCode").val();
        }
        ajaxURL = localInfo + "/Product/GetProductsForBrands?filterdata=" + finalDataList + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&data_sort=" + data_sort;
    } else {
        ajaxURL = localInfo + "/Filter/GetResults?filterdata=" + finalDataList + "&PubId=" + $("#PubId").val() + "&Page_type=" + $("#Page_type").val() + "&PageCategoryUri=" + $("#PageCategoryUri").val() + "&isBrandPage=" + $("#isBrandPage").val() + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
    }

    $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        //data: finalDataList,
        url: ajaxURL,
        success: function (data) {
            $('#productsList').removeClass('loading');
            $('#productsList').html(data);
            curvyCornersRedraw();
            if (isBrandProductPage === true) {
                createCurvyCorners(settings, ".product");
            }
            else {
                //Filter - Games & Activities Tab
                createCurvyCorners(settingsTiles_header, ".tiles-header, .online-game-tiles-header");
                createCurvyCorners(settingsColor_content, ".color-content");

            }
            enableAllCheckboxes();
        },
        error: function (data) {
            enableAllCheckboxes();
        }
    });
};

$(".sort-deselected").live("click", function (e) {
    if ($(".selected").length > 0) {
        var pageSize = parseInt($(".selected .pageSize").attr('pageSize'));
        var pageIndex = 0;
    } else {
        var pageSize = 9;
        var pageIndex = 0;
    }
    var pagination = true;
    data_sort = $(this).attr('data-sort');
    sortParam = "Ns";
    if (isBrandProductPage === true) {
        collectDataList(pagination, pageIndex, pageSize);
    } else if (isSearchResults === 'true') {
            siteSearchResults(pageIndex, pageSize, data_sort);
    } else if (isGrandParentsPage === 'true') {
        if ($("#viewAll").val() === 'false') {
            collectDataListForGP(pagination, pageIndex, pageSize);
        } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
        }
    } else {
            collectDataListEndeca(pagination, pageIndex, pageSize);
    }
	if (isShareYourThoughts != 'true') {
		updateHash((this), e.hasOwnProperty('originalEvent'));
	}
});

disableAllCheckboxes = function () {
//    $('.navigation li').addClass('disabled');
};

enableAllCheckboxes = function () {
//    $('.navigation li').removeClass('disabled');
};

collectDataListEndecaForGP = function (pagination, pageIndex, pageSize, navOnly) {
    var N = 0, // default value which needs to be sent to the endeca server
		recPerPage = pageSize, // this value is take from the pagination 
		Ns = data_sort, // default sort value
		No = parseInt(pageSize) * parseInt(pageIndex);
    Nr = 'NOT(4294961819)'; // default age/brand/category selection which is sent to the server. This will be modified on brand/catefgory selction
    Nf = '';

    isViewAllTrue = $('#viewAll').val();
    if (isViewAllTrue === 'true') {
        finalQueryString = "&N=0&Nr=" + Nr + "&recPerPage=" + pageSize + "&Ns=" + Ns + "&No=" + No + "&pageIndex=" + pageIndex;
        ajaxURL = localInfo + "/Search/GetProductSearchResults?";
    } else {
        finalQueryString = "minAge=&maxAge=&category=&brands=&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&days=" + $("#days").val() + "&sortType=" + data_sort;
        ajaxURL = localInfo + "/product/GetNewProductsForGP?";
    }
    //alert(finalQueryStringToUpdateLeftPanel);
    var targetId = "#result";
    $('#productsList').html("");
    $('#productsList').addClass('loading');
    updateProductsListEndecaForGP(targetId, finalQueryString, ajaxURL);
    clearObjects();
    disableAllCheckboxes();

};

updateProductsListEndecaForGP = function (targetId, finalQueryString, ajaxURL) {
    $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        //data: finalDataList,
        url: ajaxURL + finalQueryString,
        success: function (data) {
            $('#productsList').removeClass('loading');
            $('#productsList').html(data);
            enableAllCheckboxes();
 			selectFilterFromHash();
            createCurvyCorners(settings, ".product");
            curvyCornersRedraw();
        },
        error: function (data) {
            enableAllCheckboxes();
        }
    });
};


$("#wahtsNew").live("click", function () {
    var pagination = false,
        pageIndex = 0,
        pageSize = 9;
    $("h3.fSectionHeading").html("New Products");
    $("#viewAll").val('false');
    $('.product-button').removeClass('active');
    $("#viewAllProducts").addClass('active');
    clearAllCheckBoxes();
    collectDataListEndecaForGP(pagination, pageIndex, pageSize);
});

$("#viewAllProducts").live("click", function (e) {
    var pagination = false,
        pageIndex = "",
        pageSize = "";
	if(!window.preventHashParsing) {
		hashSegments = window.location.hash.substr(1, 99999999).split("&");
		for (i = 0; i < hashSegments.length; i++) {
			pieces = hashSegments[i].split("=");
			if (pieces[0] == 'pageIndex') {
				pageIndex = pieces[1];
			}
			if (pieces[0] == 'pageSize') {
				pageSize = pieces[1];
			}
		}
	}
	if(pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == "") {
		pageSize = 9;
	}
    $("h3.fSectionHeading").html("All Products");
    $("#viewAll").val('true');
    $('.product-button').removeClass('active');
    $("#wahtsNew").addClass('active');
    clearAllCheckBoxes();
	buildHash(e.hasOwnProperty('originalEvent'));
    collectDataListEndecaForGP(pagination, pageIndex, pageSize);
	return false;
});

clearAllCheckBoxes = function () {
    $(".navigation li.click-active").removeClass('click-active');
};


updateSearchResultsSection = function (ajaxURL) {
    $.ajax({
        type: ajaxRequestMethod,
        cache: 'false',
        url: ajaxURL,
        success: function (data) {
            $('#productsList').removeClass('loading');
            $('#productsList').html(data);
            //curvyCornersRedraw();
            createCurvyCorners(settings, ".product");
        },
        error: function (data) {
        }
    });
};


curvyCornersRedraw = function () {
    if (!Modernizr.borderradius) {
        // alert('called');
        curvyCorners.redraw();
    }
};

createCurvyCorners = function (settings, className) {
	if (!Modernizr.borderradius) {
        curvyCorners(settings, className);
    }
};

clearAllElementsinThatCategory = function (selectedCategory, currentObject) {
    var pagination = false,
        pageIndex = 0,
        pageSize = 9;
    if ($(currentObject).hasClass('click-active')) {
        $(".navigation li.click-active").removeClass('click-active');
    } else {
        $(".navigation li.click-active").removeClass('click-active');
        $(currentObject).addClass('click-active');
        gaTracking(currentObject);
    }

    /* if ($(selectedCategory + ".viewAllBrands").hasClass('click-active')) {
    $(selectedCategory + ":not('.viewAllBrands')").removeClass('click-active');
    }*/
    collectDataList(pagination, pageIndex, pageSize);
};

triggerGAOnAjaxSuccess = function (googleAnalyticsData) {
    //alert(googleAnalyticsData);
	if(googleAnalyticsData != "") {
		getTrackValue = googleAnalyticsData.replace("'", "\\'");
		getTrackValue = getTrackValue.split('~');
		MATTEL.tracker.Tracker.enableShortCuts();
		Tracker.pagetrack = true;
		//replace(/[^a-zA-Z 0-9]+/g,'');
		var str = getTrackValue[0];

		str = str.replace(String.fromCharCode(8482), "").replace(String.fromCharCode(169), "").replace(String.fromCharCode(174), "");
		trackName = str;
		trackCampain = (getTrackValue[1].indexOf(" ") < 0) ? "CAMPAIGN." + getTrackValue[1].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[1] + "\'";
		trackChannel = (getTrackValue[2].indexOf(" ") < 0) ? "CHANNEL." + getTrackValue[2].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[2] + "\'";
		trackContentType = (getTrackValue[3].indexOf(" ") < 0) ? "CONTENTTYPE." + getTrackValue[3].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[3] + "\'";
		trackAction = (getTrackValue[4].indexOf(" ") < 0) ? "ACTION." + getTrackValue[4].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[4] + "\'";

		var scriptCall = 'Tracker.track(' + '{name:\'' + trackName +
								'\',campaign:' + trackCampain +
								',channel:' + trackChannel +
								',contenttype:' + trackContentType +
								',action:' + trackAction + '})';
		eval(scriptCall);
	}
};

gaTracking = function (currentObj) {
    isTracking = $(currentObj).attr('track');
    if (isTracking !== undefined) {
        getTrackValue = $(currentObj).attr('track').replace("'", "\\'");
        getTrackValue = getTrackValue.split('|');
        MATTEL.tracker.Tracker.enableShortCuts();
        Tracker.pagetrack = true;
        //replace(/[^a-zA-Z 0-9]+/g,'');
        var str = getTrackValue[0];

        str = str.replace(String.fromCharCode(8482), "").replace(String.fromCharCode(169), "").replace(String.fromCharCode(174), "");
        trackName = str;
        trackCampain = (getTrackValue[1].indexOf(" ") < 0) ? "CAMPAIGN." + getTrackValue[1].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[1] + "\'";
        trackChannel = (getTrackValue[2].indexOf(" ") < 0) ? "CHANNEL." + getTrackValue[2].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[2] + "\'";
        trackContentType = (getTrackValue[3].indexOf(" ") < 0) ? "CONTENTTYPE." + getTrackValue[3].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[3] + "\'";
        trackAction = (getTrackValue[4].indexOf(" ") < 0) ? "ACTION." + getTrackValue[4].replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[4] + "\'";

        var scriptCall = 'Tracker.track(' + '{name:\'' + trackName +
							'\',campaign:' + trackCampain +
							',channel:' + trackChannel +
							',contenttype:' + trackContentType +
							',action:' + trackAction + '})';
        eval(scriptCall);
    };
};

updateWindowURL = function (pageSize, pageIndex, qsParam) {
    var url = document.URL
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var aditionalURL = tempArray[1];
    var temp = "";
    if (qsParam === 'pageIndex') {
        qsParamValue = pageIndex;
    } else {
        qsParamValue = pageSize;
    }
    if (aditionalURL) {
        var tempArray = aditionalURL.split("&");
        for (var i in tempArray) {
            if (tempArray[i].indexOf(qsParam) == -1) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + qsParam + "=" + qsParamValue;
    finalAdditionalUrl = newAdditionalURL + rows_txt;
    if (finalAdditionalUrl.indexOf('pageSize') == -1) {
        finalAdditionalUrl = finalAdditionalUrl + '&pageSize=' + pageSize;
    } else if (finalAdditionalUrl.indexOf('pageIndex') == -1) {
        finalAdditionalUrl = finalAdditionalUrl + '&pageIndex=' + pageIndex;
    }
    if (qsParam === 'pageSize') {
        checkPageIndex = 'pageIndex=' + pageIndex;
        replacePageIndex = 'pageIndex=0';
        finalAdditionalUrl = finalAdditionalUrl.replace(checkPageIndex, replacePageIndex);
    }
    var finalURL = baseURL + "?" + finalAdditionalUrl;
    window.location = finalURL;
};

//Hide/Show "Sort By Selected" area
var display_sortByArea = function () {

    /*
    If any filter option is selected, then 'click-active' class gets added to the 'li' to mark it as selected. So if any option is
    selected, then the count will be greater than '0' & hence we need to show the "Sort By Selected" area.
    */

    var selected_filter_count = $(document).find('li.click-active').length;

    //Find the page in which user is currently present
    var page_id = $("body").attr('id');

    //Default value for display area
    var display_value = 'block';

    var top_border_value = ''

    if (selected_filter_count === 0) {
        display_value = top_border_value = 'none';
    }

    switch (page_id) {

        //Find a product page  - hide/show "Selected" area and hide/show top border of "Age" filters section           
        case 'SearchPageView':

            $('#SearchPageView .selected-area').css('display', display_value);

            if (selected_filter_count > 0) {
                $('.navigation .ages').removeClass('ages-no-top-border');
            }
            else {
                $('.navigation .ages').addClass('ages-no-top-border');
            }

            break;

        //Games & Activities  - hide/show "Selected" area and hide/show top border of "Age" filters section            
        case 'VideosLandingPageView':
        case 'ColorLandingPageView':
        case 'CraftLandingPageView':
        case 'OnlineGamesLandingPageView':

            $('.ga_sort-by .selected-area').css('display', display_value);
            break;        
        
    }
}

function buildHash(oe) {
	if(oe) {
		window.stopHash = false
	}
	if(!window.stopHash) {
		var hash = "";
		$('.filter-Age li.click-active').each(function () {
			if($(this).attr('selector-code')) {
				hash = hash + "age=" + $(this).attr('selector-code') + "&";
			}
			else {
				hash = hash + "age=" + $(this).attr('categorycode') + "&";
			}
		});
		$('.filter-category li.click-active').each(function () {
			if($(this).attr('data-cat-code')) {
				hash = hash + "cat=" + $(this).attr('data-cat-code') + "&";
			}
			else {
				hash = hash + "cat=" + $(this).attr('categorycode') + "&";
			}
		});
		$('.filter-brands li.click-active').each(function () {
			if($(this).attr('data-brand-code')) {
				hash = hash + "brand=" + $(this).attr('data-brand-code') + "&";
			}
			else if($(this).attr('pname')) {
				hash = hash + "brand=" + $(this).attr('pname') + "&";
			}
			else {
				hash = hash + "brand=" + $(this).attr('categorycode') + "&";
			}
		});
		$('.filter-development-stage li.click-active').each(function () {
			hash = hash + "dev=" + $(this).attr('categorycode') + "&";
		});
		$('.filter-solutions li.click-active').each(function () {
			hash = hash + "sol=" + $(this).attr('categorycode') + "&";
		});
		$('.filter-collections li.click-active').each(function () {
			hash = hash + "col=" + $(this).attr('categorycode') + "&";
		});
		$('.filter-type li.click-active').each(function () {
			hash = hash + "typ=" + $(this).attr('categorycode') + "&";
		});
		$('.filter-themes li.click-active').each(function () {
			if($(this).attr('pname')) {
				hash = hash + "the=" + $(this).attr('pname') + "&";
			}
			else {
				hash = hash + "the=" + $(this).attr('categorycode') + "&";
			}
		});
		if(!$('#viewAllProducts').hasClass('active') && $('#viewAllProducts').length > 0) {
			hash = hash + "viewAllProducts=true&";
		}
		window.location.hash = hash.substring(0, hash.length-1);
	}
}

function updateHash(obj, oe) {
	hashSegments = window.location.hash.substr(1, 99999999).split("&");
	newHash = "";
	oldPageIndex = "0";
	oldDataSort = "";
	for (i = 0; i < hashSegments.length; i++) {
		pieces = hashSegments[i].split("=");
		if (pieces[0] != "") {
			if (pieces[0] == 'pageIndex') {
				oldPageIndex = pieces[1];
			}
			if (pieces[0] == 'dataSort') {
				oldDataSort = pieces[1];
			}
			if (!($(obj).hasClass(pieces[0]) || (($(obj).hasClass('pagination-next') || $(obj).hasClass('pagination-previous')) && pieces[0] == "pageIndex")) && pieces[0] != "dataSort") {
				newHash = newHash + pieces[0] + "=" + pieces[1] + "&";
			}
		}
	}
	if($(obj).hasClass('pageIndex')) {
		newHash = newHash + 'pageIndex' + "=" + $(obj).attr('pageIndex') + "&";
	}
	else if($(obj).hasClass('pagination-next')) {
		oldPageIndex++;
		newHash = newHash + 'pageIndex' + "=" + oldPageIndex + "&";
	}
	else if($(obj).hasClass('pagination-previous')) {
		oldPageIndex--;
		newHash = newHash + 'pageIndex' + "=" + oldPageIndex + "&";
	}
	if ($(obj).hasClass('pageSize')) {
		newHash = newHash + 'pageSize' + "=" + $(obj).attr('pageSize') + "&";
	}
	if ($(obj).attr('data-sort') != null) {
		newHash = newHash + 'dataSort' + "=" + $(obj).attr('data-sort') + "&";
	}
	window.location.hash = newHash.substring(0, newHash.length-1);
}
