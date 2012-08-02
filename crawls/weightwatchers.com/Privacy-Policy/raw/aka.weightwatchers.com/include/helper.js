$(function () {
    $('.moreOrlessFeatured').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var $moreSpan = $this.children(".more");
        var $closeSpan = $this.children(".close");
        $(this).parents("div.hoverFeatured").children(".hiddenFeatured").slideToggle(800);
        if ($moreSpan.is(":visible") == true) {
            $moreSpan.hide();
            $closeSpan.show();
            $this.toggleClass('lessarrow');
        } else {
            $moreSpan.show();
            $closeSpan.hide();
            $this.toggleClass('lessarrow');
        };
        return false;
    });
});

// show/hide share links
$(function () {
    $('.show_hide').show();
    $('.show_hide').click(function () {
        $(this).parents().next('.slidingDiv').fadeToggle(200);
        return false;
    });
    $('.show_hide_x').click(function () {
        $(this).parents('div:eq(2)').fadeToggle(200);
        return false;
    });
});

$(function () {
	if($.fancybox) {
		$("a.rotd_ss").fancybox({
			'titlePosition': 'inside',
			overlayColor: '#000',
			overlayOpacity: 0.3,
			hideOnOverlayClick: true,
			cyclic: true,
			showNavArrows: true,
			titleFormat: formatTitle,
			onStart: ShowHideOverlapControls('hidden'),
			onCleanup: ShowHideOverlapControls('visible')
		});
	}
});

function formatTitle(title, currentArray, currentIndex, currentOpts) {
    var recipeName = title && title.length ? title : '';
    var pointsValue = $(currentArray[currentIndex]).attr('pointsValue');
    var rcpHref = $(currentArray[currentIndex]).attr('rcpHref');
    var caption = '<div class="rotd-points">' + pointsValue + '</div><div class="rotd-title"><a href="' + rcpHref + '">' + recipeName + '</a></div>';
    return '<div id="recipes-fancybox-title">' + caption + '</div>' + '<div id="recipes-fancybox-number">' + (currentIndex + 1) + ' of ' + currentArray.length + '</div>';
}

function ShowHideOverlapControls(visibilityValue) {
    $('embed, object, select').css('visibility', visibilityValue);
}

function RecipeSearch() {
    var courseType = "";
    var pointsValue = "";

    var courseTypeValue = $('#course').val();
    if (courseTypeValue != "") {
        courseType = "&course=" + courseTypeValue;
    }

    window.location.href = "/search/category.aspx?cat=12&type=R" + GetMainIngredient() + GetPointsRange() + courseType;
}
function RecipeSearchByIngredients(divId) {
    var searchValue = "";

    $('#' + divId + ' input[type="text"]').each(function (index, domEle) {
        var value = $(this).val();
        var placeHolderValue = $(this).attr("PlaceHolder");
        if (value != "" && value != placeHolderValue) {

            if (searchValue != "") {
                searchValue = searchValue + "%20";
            }

            searchValue = searchValue + value;
        }
    });

    window.location.href = "/search/category.aspx?cat=12&type=R&search=" + searchValue;
}

function GetMainIngredient() {
    var mainIngredient = "";
    var mainIngredientValue = $('#main_ingredient').val();
    var searchTextBoxValue = $('#searchBox').val();
    var searchTextBoxPlaceHolder = $('#searchBox').attr("PlaceHolder");

    if (mainIngredientValue != "") {
        mainIngredient = mainIngredientValue;
    }

    if (searchTextBoxValue == searchTextBoxPlaceHolder) {
        searchTextBoxValue = '';
    }

    if (mainIngredient != "") {
        mainIngredient = mainIngredient + "%20" + searchTextBoxValue;
    }
    else {
        mainIngredient = searchTextBoxValue;
    }

    return "&search=" + mainIngredient;
}

function GetPointsRange() {
    var pointsRange = "";
    var pointsRangeText = jQuery.trim($('#points_plus option:selected').text());
    var pointsRangeValue = $('#points_plus').val();

    if (pointsRangeValue != "")
        pointsRange = "&ptrng=" + pointsRangeValue + "|" + encodeURIComponent(pointsRangeText);

    return pointsRange;
}

function PrintMeal(mealId) {
    newWnd = window.open("/util/prt/PrintMeal.aspx?mealId=" + mealId);
}

$(function () {
	if($.fancybox) {
		$(".VideoLightBox").fancybox({
			'padding': 0,
			'overlayColor': '#000',
			'overlayOpacity': 0.5,
			'autoScale': true,
			'transitionIn': 'none',
			'transitionOut': 'none',
			'type': 'swf',
			'swf': { 'allowfullscreen': 'true' },
			'width': 446,
			'height': 251
		});
	}
});

$(function () {
    //hover states on the static widgets
    $('ul#IconsTabs li').hover(
			function () { $(this).addClass('ui-state-hover'); },
			function () { $(this).removeClass('ui-state-hover'); }
		);
});

function ShowMoreTags(more, less) {
    if ($('.hoverTags > span:gt(4)').length > 0) {
        var moreHTML = "<span class='more'>" + more + "</span>";
        var lessHTML = "<span class='less' style='display:none;'>" + less + "</span>";
        var $anchorMoreClose = $("<span>&nbsp;<a href='#' style='margin-left: 5px;'>" + moreHTML + lessHTML + "</a></span>").click(
            function (e) {
                e.preventDefault();
                var $this = $(this);
                var $moreSpan = $(".more", $this);
                var $lessSpan = $(".less", $this);
                 if ($moreSpan.css('display') != 'none') {
                    $moreSpan.hide();
                    $lessSpan.show();
                    $(this).parents("div.hoverTags").children(".hiddenTags").show();
                } else {
                    $moreSpan.show();
                    $lessSpan.hide();
		    $(this).parents("div.hoverTags").children(".hiddenTags").hide();
                };
                return false;
            });
        var $hiddenTags = $('<span class="hiddenTags" style="display:none;"></span>')
        $('.hoverTags > span:gt(4)').each(
            function () {
                $hiddenTags.append($(this));
            });
        $('.hoverTags').append($hiddenTags);
        $('.hoverTags').append($anchorMoreClose);
    }
}


//IE input placeholder attribute fix
$(function () {
    activatePlaceHolder();
});

function activatePlaceHolder() {
    if (hasPlaceholderSupport() != true) {
        $('input[PlaceHolder]').each(function (index, domEle) {
            var $srcElement = $(domEle);
            var placeHolder = $srcElement.attr("PlaceHolder");
            var value = $srcElement.val();
            if ('' == value) {
                $srcElement.val(placeHolder);
            }

            $srcElement.focus(function () {
                var placeHolder = $srcElement.attr("PlaceHolder");
                var value = $srcElement.val();
                if (value == placeHolder)
                    $srcElement.val('');
            });

            $srcElement.blur(function (event) {
                var placeHolder = $srcElement.attr("PlaceHolder");
                var value = $srcElement.val();
                if ('' == value)
                    $srcElement.val(placeHolder);
            });
        });
    }
}

function hasPlaceholderSupport() {
    var input = document.createElement('input');
    return ('placeholder' in input);
}
