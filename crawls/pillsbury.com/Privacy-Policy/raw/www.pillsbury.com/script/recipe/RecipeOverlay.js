var titleLength = 100;
var descriptionLength = 155;
var emptyStar = "/Images/star_blue_empty.png";
var fullStar = "/Images/star_blue_full.png";
var halfStar = "/Images/star_blue_half.png";
var maxStars = 5;

var recipeSummaryData = {
    Title: ko.observable('Recipe Title'),
    Description: ko.observable('Recipe Description'),
    IngredientCount: ko.observable('0'),
    TotalTime: ko.observable('0'),
    PrepTime: ko.observable('0'),
    IsMemberGenerated: ko.observable(false),
    ContestLogo: ko.observable(null),
    ScaledUserRating: ko.observable('5'),
    HasErrors: ko.observable(false),
    IsLoading: ko.observable(true),
    RecipeId: ko.observable(''),
    RecommendationValue: ko.observable('0%'),
    RecipePage: ko.observable(''),
    GetRecipeSummary: function (recipeAnchor) {
        var rid = recipeAnchor.attr("rid");
        this.RecipeId(rid);
        recipeSummaryData.IsLoading(true);
        GetRecipeSummaryFromService(recipeAnchor);
    }
};

function ApplyRecipeSummaryBinding(data, recipeAnchor) {
    recipeSummaryData.IsLoading(false);
    jQuery(recipeAnchor).data('ajaxRequestInProgress', 'no');
    if (data != null) {
        recipeSummaryData.Title((data.Title.length >= titleLength ? data.Title.substring(0, titleLength) + "..." : data.Title));
        recipeSummaryData.Description((data.Description.length >= descriptionLength ? data.Description.substring(0, descriptionLength) + "..." : data.Description));
        recipeSummaryData.IngredientCount(data.IngredientCount);
        recipeSummaryData.TotalTime(data.TotalTime);
        recipeSummaryData.PrepTime(data.PrepTime);
        recipeSummaryData.IsMemberGenerated(data.IsMemberGenerated);
        recipeSummaryData.ContestLogo(data.ContestLogo);
        recipeSummaryData.ScaledUserRating(data.ScaledUserRating);
        recipeSummaryData.RecommendationValue(data.RecommendationValue);
        recipeSummaryData.RecipePage(data.RecipePage);
        recipeSummaryData.HasErrors(false);


        jQuery("#recipeSummaryDiv").find(".viewRecipeLink").attr("href", data.RecipePage + "?overLay=Recipe");
        jQuery("#recipeSummaryDiv").find(".addToRecipeBoxLink").attr("href", data.RecipeBoxPage + "&overLay=RecipeBox"); //WTReq :12 this query string will be read in recipebox page
        jQuery("#recipeSummaryDiv").find(".jq_printLink").attr("href", data.PrintPage+ "&overLay=Print");
        jQuery("#recipeSummaryDiv").find(".jq_emailLink").attr("href", data.RecipePage + "?tab=Email&overLay=Email");
        jQuery("#recipeSummaryDiv").find(".jq_facebookLink").unbind('click');
        jQuery("#recipeSummaryDiv").find(".jq_twitterLink").unbind('click');
        jQuery("#recipeSummaryDiv").find(".jq_facebookLink").click(function (event) { ShareClick(recipeSummaryData.RecipePage(), recipeSummaryData.Title(), 1, event); });
        jQuery("#recipeSummaryDiv").find(".jq_twitterLink").click(function (event) { ShareClick(recipeSummaryData.RecipePage(), recipeSummaryData.Title(), 2, event); });
        jQuery("#recipeSummaryDiv").find(".jq_imgContestWinnner").data("contestLogo", recipeSummaryData.ContestLogo()).css("display", function () {
            var contestLogo = jQuery(this).data('contestLogo');
            if (contestLogo != null && contestLogo != "") {
                jQuery(this).attr("src", contestLogo);                
                return "inline";
            }
            return "none";
        });

        DisplayRating(recipeSummaryData.ScaledUserRating(), jQuery("#recipeSummaryDiv").find(".jq_overlayRating"));

        var r_sum1 = jQuery("#recipeSummaryDiv").clone(true)
        var r_sum2 = jQuery("#recipeSummaryDiv").clone(true)
        r_sum1.appendTo(recipeAnchor).attr("id", "span" + jQuery(recipeAnchor).attr("rid")).addClass("tooltipPosition");
        if (jQuery(recipeAnchor).data("over") == "yes") {
            CopySummarytoPopup(r_sum2, recipeAnchor);
        }
        jQuery(recipeAnchor).find("#span" + jQuery(recipeAnchor).attr("rid")).find("*").removeAttr("data-bind");
        

    }
    else {
        recipeSummaryData.HasErrors(true);
    }
}

function DisplayErrorMessage(jqXHR, textStatus, errorThrown) {
    recipeSummaryData.HasErrors(true);
    recipeSummaryData.IsLoading(false);
}

function GetRecipeSummaryFromService(recipeAnchor) {
    jQuery.ajax({
        url: '/Services/Recipe/Summary.ashx',
        data: 'rid=' + recipeSummaryData.RecipeId(),
        success: function (data) { ApplyRecipeSummaryBinding(data, recipeAnchor); },
        error: DisplayErrorMessage,
        dataType: 'json',
        type: 'GET'
    });
}

var summary_timeout;

jQuery(function () {
    ko.applyBindings(recipeSummaryData, document.getElementById('recipeSummaryContainerID'));

    jQuery("#recipeSummaryPop").data('over', 'no');
    jQuery("#recipeSummaryPop").data('timing', 'no');

    jQuery(".recipeSummaryHover").bind('mouseenter',
    function () {
        jQuery("#recipeSummaryPop").data('timing', 'yes');
        var anc = this;
        var fn = function () { ShowRecipeSummary(anc); }
        summary_timeout = setTimeout(fn, 250);
    }).bind('mouseleave',
    function () {
        if (jQuery("#recipeSummaryPop").data('timing') == 'yes') {
            clearTimeout(summary_timeout);
        }
        else {
            jQuery(this).data('over', 'no');
            setTimeout("HideRecipeSummary()", 100);
        }
    });

    jQuery("#recipeSummaryPop").bind('mouseenter',
    function () {
        jQuery(this).data('over', 'yes');
    })
    .bind('mouseleave',
    function () {
        jQuery(this).data('over', 'no');
        setTimeout("HideRecipeSummary()", 100);
    });

});

function ShowRecipeSummary(anchor) {
    jQuery("#recipeSummaryPop").data('timing','no')
    if (jQuery(anchor).data('ajaxRequestInProgress') != 'yes') {
        jQuery(anchor).data('over', 'yes');
        jQuery("div#recipeSummaryPop").data("anchor", jQuery(anchor));
        if (jQuery(anchor).find("#span" + jQuery(anchor).attr("rid")).is("span")) {
            CopySummarytoPopup(jQuery(anchor).find("#span" + jQuery(anchor).attr("rid")).clone(true), anchor);
        }
        else {
            jQuery(anchor).data('ajaxRequestInProgress', 'yes');
            recipeSummaryData.GetRecipeSummary(jQuery(anchor));
        }
    }
}

function HideRecipeSummary() {
    var r_pop = jQuery("#recipeSummaryPop");
    var over_anchor = r_pop.data("anchor");
    if (over_anchor.data('over') == "no" && r_pop.data('over') == "no") {
        jQuery("#recipeSummaryPop").html('');
    }
}

function ShareClick(url, title, option, event) {
    var objShare = new shareMethods(title, url, "share_recipe");
    if (option == 1) {

       
ntptEventTag('ev=Recipeoverlay_FacebookShare_bt&RecipeID=' + recipeSummaryData.RecipeId() + '&RecipeTitle=' + encodeURIComponent(recipeSummaryData.Title()) + '');

        objShare.openFacebook();

    }

    else if (option == 2) {
        
ntptEventTag('ev=Recipeoverlay_twitter_bt&RecipeID=' + recipeSummaryData.RecipeId() + '&RecipeTitle=' + encodeURIComponent(recipeSummaryData.Title()) + '');
        objShare.openTwitter();
    }
    event.preventDefault();
    return false;
}

function CopySummarytoPopup(source, recipeAnchor) {
    var r_pop = jQuery("div#recipeSummaryPop");
    var win_middle = jQuery(window).height() / 2;
    var win_scroll = jQuery(window).scrollTop();
    var offset = jQuery(recipeAnchor).offset();
    r_pop.html('');
    r_pop.css({ 'top': offset.top, 'left': offset.left });
    if (offset.top + 38 - win_scroll > win_middle) {
        source.addClass("recipeSummaryAbove")
    }
    else {
        source.addClass("recipeSummaryBelow")
    }
    source.appendTo(r_pop).css("display", "inline");
}


function DisplayRating(rating, ratingContainer) {
    var objImg;
    jQuery(ratingContainer).html('');
    for (i = 0; i < maxStars; i++) {
        objImg = jQuery(document.createElement("img"));
        objImg.attr("src", emptyStar);
        jQuery(ratingContainer).append(objImg);
    }

    if (rating < 1 || rating > maxStars) rating = 0;
    rating = rating - 1;
    
    var floorRating = Math.floor(rating);
    var indexValue = 0;
    jQuery.each(ratingContainer.find("img"), function (index, img) {
        if (index <= floorRating) {
            jQuery(img).attr("src", fullStar);
            indexValue = index;
        }
    });

    if (indexValue < (maxStars - 1)) {
        rating = rating - floorRating;
        if (rating >= 0.75)
            jQuery(ratingContainer).find("img:nth-child(" + (indexValue + 2) + ")").attr("src", fullStar);
        else if (rating >= 0.25)
            jQuery(ratingContainer).find("img:nth-child(" + (indexValue + 2) + ")").attr("src", halfStar);

    }
}

//End Of File

