//Needed or not, is pure DOMREADY,SO Is fine. References UI.js
// Hello concat
$(function() {
		   
	$.global.RatingWidgets = new $.RatingWidgets();
	$.global.DetailedRatings = new $.DetailedRatings();

	$.global.CustomerReviews = new $.CustomerReviews();
	$.global.AlsoRecommendedOverlay = new $.AlsoRecommendedOverlay();

	$('#previewBtn').add('#SaveButton button.btn_saveChanges, .reviewActionButtton').click(function(){
	
		var titleVal = $('textarea[name=title]').val();
		var reviewbodyVal = $('textarea[name=body]').val();
		if($('#writeReviewForm').exists()) { 
			var buttonType = ($('.reviewActionButtton').exists()) ? 'Preview or Submit' : 'Preview';
		} else {
			var buttonType = 'Save Changes';
		}
		$('#reviewForm').find('p.error').remove();
		if($("#selectPenName").get(0) != null && $("input[name='Visibility']:checked").val() == "Public"){
				$.global.PenNameSelector.open();
				return false;
		}
		
		$("div.wordFilterErrorMsg").add('.pageErrorsDisplay').html("");	
		
		if (titleVal == '' || reviewbodyVal == ''){
			var $reviewWrap = ($('#writeReviewForm').exists()) ? $('#writeReviewForm') : $('div.myReviewContent');
			var errorMsg = 'Please provide all the information that is required.';
			if(titleVal == '' && reviewbodyVal != '') {
				errorMsg = "Please add a Headline, then click the \""+buttonType+"\" button to continue.";
			} else if(titleVal != '' && reviewbodyVal == '') {
				errorMsg = "Please add a Review, then click the \""+buttonType+"\" button to continue.";
			} else {
				errorMsg = "Please add a Headline and a Review, then click the \""+buttonType+"\" button to continue.";
			}
			
			if (!$reviewWrap.find('div.wordFilterErrorMsg').exists()) {
				if($reviewWrap.is('#writeReviewForm')){
					$('#title').after('<div class="wordFilterErrorMsg clear">'+errorMsg+'</div>');
					$('.pageErrorsDisplay').html('<div class="wordFilterErrorMsg errorMsg">'+errorMsg+'</div>');
				}
				else {
					$reviewWrap.prepend('<div class="wordFilterErrorMsg clear">'+errorMsg+'</div>');
				}

				$('div.wordFilterErrorMsg').show();
			}
			else {
				if($reviewWrap.find('div.wordFilterErrorMsg').text().indexOf('required') == -1){
					$reviewWrap.find('div.wordFilterErrorMsg').append(errorMsg);
				}
			}
			window.location = '#';
						
			return false;
		}
		else {
			$('#ratingReviewForm').submit();
		}
	})

	if($("#findProducts").get(0) != null) {
		$.global.ReviewAlsoRecommended = new $.ReviewAlsoRecommended({
			maxNum: 5,
			curNum: $("#reviewForm a.removeIcon").size()
		});
	}

	if($("#choosePenname").get(0) != null) {
		$.global.PenNameSelector  = new $.PenNameSelector({
			onComplete: function(penname) {
				$("#choosePenname").html("Show My Pen Name (" + penname +")");
			},
			type: "other"
		});

		$("#writeReviewForm").submit(function(e) {
			if($("#selectPenName").get(0) != null && $(this).find("input[name='Visibility']:checked").val() == "Public"){
				e.preventDefault(e);
				$.global.PenNameSelector.open();
			}
		});
	}
	
	
 
	/* ***** trigger overlay that reviewer must own product to leave review : currently on product code NE(apps) **** */	
	if($("input[name='triggerOwnedProductOvrly']").val() === 'true') {		
		$.global.mustPurchaseToReviewSelector = new $.mustPurchaseToReviewSelector();			
	 	$.global.mustPurchaseToReviewSelector.open();
	}else if($("input[name='triggerOwnedProductOvrly']").get(0) != null){
		$("input[name='triggerOwnedProductOvrly']").remove();
	}
	

	if($("#review-remaining").get(0) != null) {
		$('textarea.body').maxLength(3500, $('#review-remaining'), 'Characters remaining', 100);
		$('textarea.headline').maxLength(250, $('#headline-remaining'));
	}else{
		$('textarea[name=body]').maxLength(3500, $('#textareaMaxChars'));
	}
	$('#titleInput').maxLength(250, $('#inputMaxChars'));
	
	// prevent the insertion of a carrige return into Review Title (DMS_P00058701)
	$('textarea.headline').keydown(function(e) {
		if(e.keyCode == 13) {
			e.preventDefault(e);
		}
	});

    var CancelReviewPrompt_Content_Holder ='<div style="padding: 20px;"> \
			<span style="font-weight:bold; font-size:10px;">Are you sure you want to cancel the changes you\'ve made to this review? </span><br/>														\
			<br/>																																													\
			<button class="cancel_yes"><img src="' + $.hosts.resources + '/presources/community/images/yes_green.png" /></button>															\
			<button class="cancel_no"><img src="' + $.hosts.resources + '/presources/community/images/no_gray.png" /></button>														\
		</div>																																														\
		';

    $.global.ReadyServiceCancelReviewPrompt = new $.Confirm({
	          heading: "Cancel My Changes",
	          id: "myCancelReviewPrompt",
	          content: CancelReviewPrompt_Content_Holder,
	          cancel: {path: "button.cancel_no", action: function() {
                    return true;
	          }},
	          ok: {path: "button.cancel_yes", action: function() {
                    //window.onbeforeunload = null;
                    return CancelReviewEdit_Submit();
	          }}
	    });
		
	 	
		
});


function Activate_CancelReviewPrompt() {

	$.global.ReadyServiceCancelReviewPrompt.prompt();

	return false;
}

function CancelReviewEdit_Submit() {

	// This is assumed to only be called from an EssentiaList page
//	$('#readOnlyReview')
//		.add('#EditButton')
//		.show();

//	$('#editReview')
//		.add('#editDetailedRatings')
//		.add('#privacySettings')
//		.add('#SaveButton')
//        .add('#CancelButton')
//		.hide();
    window.location = window.location;

	return true;
}

function promptDiscardChanges() {
    return "If you leave this page, any of your changes will be lost. Discard your changes?";
}

function editMode(){
	var review = $("#reviewBody");
	var reviewText = review.val();
	while(reviewText.search("<BR/>") != -1) {
	    reviewText= reviewText.replace("<BR/>", "\n");
	}
	review.val(reviewText);

	$('#readOnlyReview')
		.add('#EditButton')
		.hide();

	$('#editReview')
		.add('#editDetailedRatings')
		.add('#privacySettings')
		.add('#SaveButton')
        .add('#CancelButton')
        .add('#helpfulCountEdit')
		.show();

     //window.onbeforeunload = promptDiscardChanges;
}

function cancelEdit(){

    Activate_CancelReviewPrompt();
//	$('#readOnlyReview')
//		.add('#EditButton')
//		.show();

//	$('#editReview')
//		.add('#editDetailedRatings')
//		.add('#privacySettings')
//		.add('#SaveButton')
//        .add('#CancelButton')
//		.hide();
return false;
}



$.CustomerReviews = function(options) {
    var self = this;
    this.settings = $.extend({
        eventBucket: $("#forceWidth, .page-box")
    }, options);

    this.$elem = null;

    this.settings.eventBucket.delegate("click", {
        "img.helpful, a.helpful": sendHelpful,
        "a.sort-action": sort
    });


    //Set defaults to support two versions of the call
    var paginateParams = '';
    var abVersionParam = '';
    var uiActionValue = 'CustomerReviewsCallback'; // this is for the non-Format Collapsed pages <div class='loading-spinner'>LOADING...</div>
    var loaderString = "<div class='wrap20'><p><br /><img src='" + $.hosts.resources + "/presources/images/ajax-loader.gif' /> Loading...<br /><br /></p></div>"

    // Check to see if Format Collapsed Product page is using this code.
    if ($('#page-type', '#page-data').text() == 'product-page-format-collapsed') {
        paginateParams = '&pageend=20'; // using default of 5 per page for April launch, until Production Customer Review database job completes to fully support 20 per page
        abVersionParam = '&ce_content=product-page';
        uiActionValue = 'CustomerReviewsPageCallback';
        loaderString = "<div class='loading-spinner'>LOADING...</div>";
    };

    function sort(e) {
        e.preventDefault(e);
        var sortType = 0;
        var $target = $(e.target);

        if ($target.hasClass("newest")) {
            if ($target.hasClass("down-arrow")) {
                sortType = 1;
            } else {
                sortType = 0;
            }
        } else if ($target.hasClass("highestRating")) {
            if ($target.hasClass("down-arrow")) {
                sortType = 4;
            } else {
                sortType = 3;
            }
        } else if ($target.hasClass("mostHelpful")) {
            if ($target.hasClass("on")) {
                return false;
            } else {
                sortType = 2;
            }
        }

        $("#reviewData").html(loaderString);
        var ean = $target.get(0).id.split("_")[1];
        var pt = $target.get(0).id.split("_")[0];
        self.sendSort(sortType, ean, pt);

    }



    this.sendSort = function(sort, ean, pt) {
        ui.request({
            baseURL: $.hosts.commServices,
            parameters: "?page=ReviewsCallback&uiAction=" + uiActionValue + "&ean=" + ean + "&pt=" + pt + "&bnOutput=1&groupid=" + sort + "&sort=" + sort + paginateParams + abVersionParam,
            callback: { name: "cbf", value: "$.global.CustomerReviews.sortCallback" }
        });
    }

    function sendHelpful(e) {
        e.preventDefault(e);
        self.$elem = $(e.target);
        var values = self.$elem.get(0).id.split("_");


        if ($(e.target).hasClass("no")) {
            self.sendHelpfulData({ status: 0, communityId: values[0], reviewId: values[1] });
        } else {
            self.sendHelpfulData({ status: 1, communityId: values[0], reviewId: values[1] });
        }
    }

    this.sortCallback = function(response) {
		var $customerReviews,
			$tabReview = $("#tab-custreview", "#reviewBox");

		$customerReviews = ($tabReview.length===0) ? $(".page-box #reviewBox") :  $tabReview;

        // Removed hard coded Flag Overlay supplied by Format Collapsed Product page on intial load, as the Community response provides its own Flag Overlay (with dynamic radio buttons).
        $("#flagThisReview.product-page-hard-coded").remove();
        $customerReviews.html(response.output).trigger("reviewsUpdated");

        var nextLink = $('a.custRevTabPaginate');
        nextLink.each(function(i) {
            $(this).click(function(e) { getReviews(e); });
        });
        //$("#reviewBox").html(response.output);
    }

    this.sendHelpfulData = function(params) {
        ui.request({
            baseURL: $.hosts.commServices,
            parameters: "?page=ReviewsCallback&uiAction=SetIsHelpfulCallback&ishelpful=" + params.status + "&bnOutput=1&reviewid=" + params.reviewId + "&communityid=" + params.communityId,
            callback: { name: "cbf", value: "$.global.CustomerReviews.helpfulCallback" }
        });
    }

    this.helpfulCallback = function(response) {
        var msg = 'Thank you for your feedback!';
        if (response.output == 'ReviewerCanNotSubmitVote') {
            msg = "You may not vote on your own review.";
        } else if (response.status == 'False') {
            msg = response.output;
        }
        self.$elem.parents("p").html(msg);
    }
}

$.AlsoRecommendedOverlay = function() {
	var overlay = null;
	var $target = null;
	
	function init() {
		overlay = new $.Overlay({block: 0, container: $("#forceWidth")});
		overlay.set.id("ovrly_AlsoRecommended");
		overlay.set.width(491);	
		
		$("#product-bottom").delegate("click", {
			"a.recommendOverlay": open
		});
		
		$(document).delegate("click", {
			"a.closeButton": close
		});
	}

	function open(e) {
		e.preventDefault(e);
		$target = $(e.target);
		var values = $target.get(0).id.split("|");

		var reviewID = values[1];
		var connectioneans = values[0];

		ui.request({
			baseURL: $.hosts.commServices,
			parameters: "?page=ReviewsCallback&uiAction=GetConnectionsCallback&reviewid="+reviewID+"&connectioneans=" + connectioneans,
			callback: {name: "cbf", value: "$.global.AlsoRecommendedOverlay.show" }
		});
	}

	function close(e) {
		e.preventDefault(e);
		//$("#alsoRecommendOverlay").remove();
		overlay.close();
	}

	this.show = function(response) {
		var viewportWidth = $(window).width();
		var targetLeft = $target.offset().left;
		var overlayWidth = 580;
		
		var adjustment = 0;
		if(overlayWidth + targetLeft > viewportWidth) {
			adjustment = viewportWidth - (overlayWidth + targetLeft);
		}
		
		overlay.set.content(response.output);
		overlay.open();
		
		overlay.set.left($target.offset().left + adjustment);
		overlay.set.top($target.offset().top + 12);
		
        $("a.addToWishListFromReview").each(function(index, item) {
            $(item).click(function() {
                var values = $(this).get(0).id.split("_");
                ui.request({
			        baseURL: $.hosts.commServices,
			        parameters: "?page=WishList&pageType=WishList&uiAction=AddItemToWishFromProductPage&bnOutput=1&ListId=" + values[2] + "&ean="+values[0]+"&productCode=" + values[1]
		        });
                $(this).parent().html('<p style="margin-top:5px; margin-bottom:0px;padding-bottom:0px;"><strong>Added!</strong></p>');
            });
        });
	}

	init();
}

$.RatingWidgets = function(options) {
	var self = this;
	this.ratings = new Array('Not Applicable', 'Awful', 'Poor', 'Fair', 'Great', 'Extraordinary');
	this.oldClass = null;
	/* In our opinion, when this JS is refactored, the html ID string created by the XSL should not begin with the EAN (a number) to be standards compliant.  This change would likley have to be made for Ratting mark at once in the XSL (Digital Locker, Community pages, and Product pages). */
	function init() {
		var ratingWidgets = $("span.rating-widget").not("span.ignore");
		for(var i=0; i<ratingWidgets.length; i++) {
			var spanParent = ratingWidgets[i];
			if(spanParent.getElementsByTagName("img").length == 0) {
				spanParent.className += " noNA";
			}
			spanParent.innerHTML = "<a href='#' class='section_rateTitle rating-0'>&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='#' class='section_rateTitle ratingVal rating-1'>&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='#' class='section_rateTitle ratingVal rating-2'>&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='#' class='section_rateTitle ratingVal rating-3'>&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='#' class='section_rateTitle ratingVal rating-4'>&nbsp;&nbsp;&nbsp;&nbsp;</a><a href='#' class='section_rateTitle ratingVal rating-5'>&nbsp;&nbsp;&nbsp;&nbsp;</a> <input type='hidden' name='selected_rating' class='selected_rating' value=''/>" + spanParent.innerHTML;
			/*if ($.browser.msie) {
				$('a.ratingVal').css('top', 'auto');
			}*/
		}
	}

	/* clam - removed body as delegate as it was causing flicking on flyout */
	this.settings = { eventBucket: $("#forceWidth, .page-box") };
	$.extend(this.settings, options);

	this.settings.eventBucket.delegate("click", {
	  "a.ratingVal": _clicked,
	  "a.rating-0": _clicked
	});

	this.settings.eventBucket.delegate("mouseover", {
	  "a.ratingVal": _mouseover,
	  "a.rating-0": _mouseover
	});

	this.settings.eventBucket.delegate("mouseout", {
	  "a.ratingVal": _mouseout,
	  "a.rating-0": _mouseout
	});

	function _clicked(e) {
		e.preventDefault(e);
		var el = e.target;
		
		// Determine if Overall Rating has been rated
		var isValid = false;
		if($(e.target).get(0).parentNode.className.search("noNA") != -1) {
			isValid = true;
		} else {
			var $parent = $(e.target).parents("div.croWrap").find("span.noNA span");
			var $parentClass = ($parent.size() > 0) ? $parent.get(0).className : $('#writeReviewForm').find("span.noNA span").get(0).className;
			if($parentClass.search("avg") == -1 && $parentClass != "cust-0") {
				isValid = true;
			} else {
				isValid = false;
			}
		}

		if(el.className.search("ratingVal") != -1 || el.className.search("rating-0") != -1) {

			var whichStar = el.className.split("-")[1];

			if(isValid) {
				var $wrap = $(el).parents("div.croWrap");
				if($wrap.find("div.headerText").exists()) {
					$wrap.find("div.headerText").get(0).style.color = ""; 
				} else if($wrap.find("em.red").exists()) {
					$wrap.find("em.red").hide();
				}else if($('div.croWrap').find("em.red").exists()) {
					$('div.croWrap').find("em.red").hide();
				}
				
				self.oldClass = el.parentNode.oldClass;
				self.element = el;

				setRating({
					element: el,
					widgetID: el.parentNode.id,
					whichStar: whichStar
				});

				var uiaction = "SetOverallRatingCallback";
				var paramID = "";
				if(el.parentNode.id.split("_")[2]) {
					uiaction = "SetParameterRatingCallback";
					paramID = "&parameterid=" + el.parentNode.id.split("_")[2];
				}

				ui.request({
					baseURL: 	$.hosts.commServices,
					parameters:	"?bnOutput=1&page=ReviewsCallback&uiAction="+uiaction+"&rating=" + whichStar + "&ean=" + el.parentNode.id.split("_")[0] + "&pt=" + el.parentNode.id.split("_")[1] + paramID,
					callback: {name: 'cbf', value: '$.global.RatingWidgets.ratingCallback'},
					requestSource:el
					
				});
			} else {
				// validation
				var $wrapper = $(el).parents("div.croWrap");
				if($wrapper.find("div.headerText").exists()) {
					$wrapper.find("div.headerText").css({color: "red"});
				} else if($wrapper.find("em.red").exists()) {
					$wrapper.find("em.red").show();
				} else if($('div.croWrap').find("em.red").exists()) {
					$('div.croWrap').find("em.red").show();
					window.scroll(0, 200);
				}
			}

			return false;
		}
	}

	function setRating(params) {
		var naImg = params.element.parentNode.getElementsByTagName("img")[0] || null;

		$("span.rating-widget[id='"+params.widgetID+"'] span").attr("class", "cust-" + params.whichStar);
		if(params.whichStar == 0) {
			naImg.src = naImg.src.replace("NA.gif", "NA_on.gif");
			naImg.className = "CRon";
		} else {
			if(naImg) {
				naImg.src = naImg.src.replace("NA_on.gif", "NA.gif");
				naImg.className = "";
			}
			params.element.parentNode.oldClass = "cust-" + params.whichStar;
		}
	}

	function _mouseover(e) {
		var el = $(e.target).get(0); 

		if(el.className.search("ratingVal") != -1 || el.className.search("rating-0") != -1) {
			var whichStar = el.className.split("-")[1];
			var naImg = el.parentNode.getElementsByTagName("img")[0] || null;

			if(whichStar > 0) {
				el.parentNode.oldClass = el.parentNode.getElementsByTagName("span")[0].className;
				el.parentNode.getElementsByTagName("span")[0].className = "cust-" + whichStar;
				if($(el.parentNode).find('.selected_rating')){ 
				$(el.parentNode).find('.selected_rating')[0].value  =  whichStar; 
				}
				//showToolTip(whichStar, el);
			} else if(whichStar == 0 && naImg){
				naImg.src = naImg.src.replace("NA.gif", "NA_on.gif");
				//showToolTip(whichStar, el);
			}
		}
	}
	function _mouseout(e) {
		var el = $(e.target).get(0);
		if (el.className.search("ratingVal") != -1 || el.className.search("rating-0") != -1) {
			var whichStar = el.className.split("-")[1];
			//hideToolTip();

			var naImg = el.parentNode.getElementsByTagName("img")[0] || null;

			if(whichStar > 0) {
				el.parentNode.getElementsByTagName("span")[0].className = el.parentNode.oldClass;
			} else if(naImg) {
				if(naImg.className != "CRon") {
					naImg.src = naImg.src.replace("NA_on.gif", "NA.gif");
				}
			}
		}
		return false;
	}

	function hideToolTip() {
		try { document.getElementById('toolTip').style.display = "none"; } catch(e) {}
	}
	function showToolTip(starNum, el) {
/*
		var text = self.ratings[starNum];
		var toolTip = document.getElementById('toolTip');

		var div = document.createElement('div');
		div.id = "toolTip";

		div.className = "tip";
		div.innerHTML = '<div id="tipLeftCorner"><div id="tipRightCorner"><div id="tipContent">' + text + '</div></div></div>';

		if(toolTip) {
			toolTip.parentNode.removeChild(toolTip);
			el.parentNode.appendChild(div);
		} else {
			el.parentNode.appendChild(div);
		}
		var divWidth = div.clientWidth - 16;
		div.style.top = -22 + 'px';
		div.style.left = ((el.offsetLeft -2) - (divWidth/2)) + 'px';
*/
	}

	this.ratingCallback = function(response) {
		
		if(isPopUpError (response, "RatingFailed", "Error")) {
			return false;
		}		
		
		if (response.output == 'NotSignedIn') {
			Start_SignIn_With_CallBack(function(result){
				if (result) {
					//alert('execute callback');
					var url = document.location;
					document.location = url;
				}
			}, "submitProductRating");
		}
	}
	init();
}

$.DetailedRatings = function() {
	var self = this;
	this.coords = [];
	this.dimensions = [];

	function init() {
		$(document).delegate("click", {
		  "a.reviewOverlay": open,
		  "a.closeButton": close,
		  "a.trigger": toggleDetails
		});
		$("body").append("<div id='customerReviewOverlay' class='section_rateTitle reviewOverlay overlayCus'></div>");
	}

	function open(e) {
		e.preventDefault(e);

		var $target = $(e.target);
		var metadata = $target.get(0).id.split("_");
		var groupid = metadata[2] || null;

		var dt = "";
		if($target.hasClass("readOnly")) {
			dt = "&dt=readOnly";
		}

		self.coords = $target.position();
		self.coords.top = $target.offset().top;
		
		self.dimensions = {height: $target.innerHeight(), width: $target.innerWidth()};

		if($target.hasClass("byReviewID")) {
			ui.request({
			baseURL: $.hosts.commServices,
			parameters: '?page=ReviewsCallback&uiAction=GetDetailedRatingsByReviewIDCallback&bnOutput=1&groupid=' + groupid + '&reviewid='+metadata[3] + dt,
			callback: {name: 'cbf', value: 'openDetailedRatings'}
			});
		} else if($target.hasClass("byCommunityID")) {
			ui.request({
				baseURL: $.hosts.commServices,
				parameters: '?page=ReviewsCallback&uiAction=GetCustomerDetailedRatingsCallback&bnOutput=1&groupid=' + groupid + '&ean='+metadata[0]+'&pt=' + metadata[1] + "&penname=" + metadata[3] + dt,
				callback: {name: 'cbf', value: 'openDetailedRatings'}
			});
		} else {
			ui.request({
			baseURL: $.hosts.commServices,
			parameters: '?page=ReviewsCallback&uiAction=GetAverageDetailedRatingsCallback&bnOutput=1&groupid=' + groupid + '&ean='+metadata[0]+'&pt=' + metadata[1] + dt,
			callback: {name: 'cbf', value: 'openDetailedRatings'}
			});
		}
	}

	function close(e) {
		e.preventDefault(e);
		$("#customerReviewOverlay").css({left: "-9999em"}).html("");
	}

	function toggleDetails(e) {
		e.preventDefault(e);
		var $target = $(e.target);
		var $toggleText = $target.parents("div.ratingsHeader").find("div.target");

		if($toggleText.get(0).style.display == "block") {
			$toggleText.hide();
			$target.get(0).style.background = "transparent url(" + $.hosts.resources + "/presources/community/images/button_expand.gif) no-repeat scroll 0px 1px";
		} else {
			$toggleText.show();

			$target.get(0).style.background = "transparent url(" + $.hosts.resources + "/presources/community/images/button_contract.gif) no-repeat scroll 0px 1px";
		}

	}

	init();
}
function openDetailedRatings(response) {
	var viewportWidth = $(window).width();
	var targetLeft = $.global.DetailedRatings.coords.left;
	var overlayWidth = $("#customerReviewOverlay").width();
	
	var adjustment = 0;
	if(overlayWidth + targetLeft > viewportWidth) {
		adjustment = viewportWidth - (overlayWidth + targetLeft);
	}
	
	$("#customerReviewOverlay").html(response.output).css({
		left: $.global.DetailedRatings.coords.left - 100 + adjustment,
		top: $.global.DetailedRatings.coords.top + $.global.DetailedRatings.dimensions.height,
		position: "absolute"
	});
	
}


$.ReviewAlsoRecommended = function(params) {
	var self = this;
	this.settings = $.extend({
		maxNum: 0
	}, params);

	self.searchWidget = new $.SearchWidget({
   		heading: "Also Recommended",
		cbf: "jQuery.global.ReviewAlsoRecommended.searchWidget.displayResults",
		setDefaultValues: function(){
			var searchTerm = $('#queryInput').val();
			var defaultProdType = $('#choiceInput').val();
			$("#" + self.searchWidget.settings.id + " #searchWidget-value").val(searchTerm);
			$("#" + self.searchWidget.settings.id + " #searchWidget-select").val(defaultProdType);
		},
		add: function(e) {
			e.preventDefault(e);
			if(self.settings.curNum < self.settings.maxNum) {
				var values = $(e.target).get(0).id.split("_");
				var pt = values[0];
				var ean = values[1];
				$("div.findProduct").show();
				$("div.findProduct").prepend($(e.target).parents("tr").find("div.reviewHTML"));

				self.settings.curNum++;
				if(self.settings.curNum == self.settings.maxNum) {
					$("#findProducts").parents("p").hide();
				}
			} else {
			    var error = $("#searchMaxLimitError");
                error.text('You may only add 5 items. To add another, you must remove an item from your Also Recommended list.');
                error.show();
				return false;
			}
		},
		refresh: function(e) {
			// THIS IS WHAT HAPPENS WHEN YOU CLICK DONE OR x OUT THE SEARCH WIDGET
		},
		//productTypes: {"Books": "BK","DVD": "VD", "Music": "MU"},
		maxNum: self.settings.maxNum,
		curNum: self.settings.curNum
    });
	function init() {
		$("#findProducts").click(function(e) {
			e.preventDefault(e);
			$('.searchContainer').parent().find('p.error').remove();
		    if($("#queryInput").val()){
				$('.searchContainer').parent().find('p.error').remove();
				self.searchWidget.addItems();
			    self.searchWidget.autoExec(e); 
			}else if($("#queryInput").val() == ''){
				$("#writeReviewForm").find('.searchContainer').before('<p class="error">Please enter a search term.</p>');
			}else{
				self.searchWidget.addItems();
			}
		});
		$("#writeReviewForm").find('.searchContainer').keydown(function(e) {
			if(($(e.target).get(0).id == "choiceInput" || $(e.target).get(0).id == "queryInput" || $(e.target).get(0).id == "findProducts") && e.keyCode == 13) {
				$('.searchContainer').parent().find('p.error').remove();
				if($("#queryInput").val()){
					self.searchWidget.addItems();
					self.searchWidget.autoExec(e);
				}else if($("#queryInput").val() == ''){
					$("#writeReviewForm").find('.searchContainer').before('<p class="error">Please enter a search term.</p>');
				}else{
					self.searchWidget.addItems();
				}
				e.preventDefault(e);
			}
		});
		$("#reviewForm").delegate("click", {
			"a.removeIcon": removeItem
		});
	}
	function removeItem(e) {
		e.preventDefault(e);
		$(e.target).parents("p").remove();
		$("#findProducts").parents("p").show();
		self.settings.curNum--;
		if(self.settings.curNum === 0) $("div.findProduct").hide();
	}
	init();
}

$(function () {
	
	$.ReviewPenNamePopUpQuestion = function () {
		
		// The following is the pre-defined content for PopUp question:makePenName - Question Id 33333 in the community Announcement mechanism:		
			
		var self = this;
		var o = new $.Overlay();					
		self.questionId = "22222";
		self.triggerTarget = {};
		self.isReadyToDepart = false;
		self.addListners = {};
		
		thisPageType = $("#pageType").text();
		thisProfilePenName = $("#profilePenName").text();
		self.hasPenName = Boolean(String(thisProfilePenName).length > 0);
		
		

		var QuestionContent = $.global.popUpQuestionContent.Header_1
				+ "<div class='questionContent'>	\
						<div class='questionMessage' style='display:block;'/>		\
						<h3>Thank you for your review! </h3>	\
					Customer reviews can now be shared on a My B&N profile page.	<br/>	\
					<img src='"+$.hosts.resources+"/presources/community/images/17598_mybn_graphic.jpg' class='myBNpromo'/> \
					Would you like to make your profile public so it can be shared <br/>	\
					with friends and family?	\
					<div class='questionOptions'>	\
							<form id='questionOptions-"+ self.questionId + "'>	\
								<input type='radio' name='popUpPrivacy' value='Public'/> Make it Public	\
								<input type='radio' name='popUpPrivacy' value='Private'/> Keep it Private	<br/>\
								<br/> \
								<img class='continue' src='"+$.hosts.resources+"/presources/community/images/btn_continue.gif'/>	\
								<br/>	\
								Note: Anonymous reviews remain anonymous, <br/> even if your profile is public.<br/><br/>	\
								<div>	\
									<input align='center' type='checkbox' name='DoNotShowAgain' value='N' id='dismissIfChecked'/>	\
									 Don't show me this again	\
								<div>	\
							</form> \
						</div>	\
				</div>";
		
		this.shouldAskQuestion = function () {
			
			var shouldAsk  = Boolean(($("#popUpQuestions #popUpQuestion-22222").exists() 
									&& context.pageType == "ReviewOwner" 
									&& context.profilePrivacyLevel == "Private") 
									|| window.location.href.indexOf('testReviewQuestion=1') != -1);
			
			return shouldAsk;				
		}

	
		this.open = function () {
			
			 o.set.id("ovrly-ReviewPenNamePopUpQuestion");
			 o.set.content(QuestionContent);
			 o.set.width(430);
			 o.open();
			 
			 setDepartureAction (); // creates $.global.PrivacyPopUpQuestionCallBack();
			 
		 	 $('.questionContent .continue').click (function(e){
													  
				e.preventDefault(e);
				
				if (! $("[name='popUpPrivacy']:checked").exists()) {
					
					showManualError ("Please select a Privacy setting to continue.", "choosePrivacy", ".questionContent .questionMessage");
				}
				else {
					setProfilePrivacyOrPenName ();	
				}											  
												  

			});
			 
			 
			o.element.find("a.overlayClose").click(function(){
				 o.close();
			});

			return;
		}
		
		function setProfilePrivacyOrPenName () {  // Copied and addpated from Community Nav
	
			var newPrivacy = $("[name='popUpPrivacy']:checked").val();
	
			if (! self.hasPenName && newPrivacy == 'Public') {

				$.global.PenNameSelector = new $.PenNameSelector();
				
				$.global.PenNameSelector.onCompleteOverrideFlag = true;

				$.global.PenNameSelector.onCompleteOverrideAction = function () { 
				
					$.CheckAndSetDoNotAskAgain ("#questionOptions-" + self.questionId, self.questionId);
				
					// Then make the profile public:
					var myParameters = '?uiAction=UpdatePrivacySetting&status=Public&page=userprofile'
				
						ui.request({
								baseURL: "http://" + $.hosts.community + "/communityportal/ServiceRequest.aspx",
								parameters: myParameters,
								callback: {
									name: "cbf",
									value: "$.global.PenNamePopUpQuestionCallBack"
								}
						
						});
			
				}	
				
				$.global.PenNameSelector.onCompleteOverrideToProfile = function () {
					
					$.CheckAndSetDoNotAskAgain ("#questionOptions-" + self.questionId, self.questionId);
				
					// Then make the profile public:
					var myParameters = '?uiAction=UpdatePrivacySetting&status=Public&page=userprofile'
				
						ui.request({
								baseURL: "http://" + $.hosts.community + "/communityportal/ServiceRequest.aspx",
								parameters: myParameters,
								callback: {
									name: "cbf",
									value: "$.global.PenNamePopUpQuestionCallBack"
								}
						
						});
					
					//	$.global.isReadyToDepart = true;
					// If, at the end of selecting a penname, the user does chooses to 'go to their profile', this action is executed.
					window.location = 'http://' + $.hosts.community;
					
				}
				
				$.global.PenNameSelector.open();
				
				$("#ovrly-ReviewPenNamePopUpQuestion").hide();
			}
			else {
				
				setProfilePrivacySetting (newPrivacy);
				
			}
			
			
			
		}
		function setProfilePrivacySetting (newPrivacy) {  // Copied and addpated from Community Nav
		
		
			//alert('This is the correct funciton. isOwner:' + isOwner + ", thisProfilePenName: " + thisProfilePenName);

			$.CheckAndSetDoNotAskAgain ("#questionOptions-" + self.questionId, self.questionId);
	
			if ($("[name='popUpPrivacy']:checked").exists()){
			
		
				var myParameters = '?uiAction=UpdatePrivacySetting&status=' + newPrivacy + '&page=userprofile'
		
				ui.request({
						baseURL: "http://" + $.hosts.community + "/communityportal/ServiceRequest.aspx",
						parameters: myParameters,
						callback: {
							name: "cbf",
							value: "$.global.PenNamePopUpQuestionCallBack"
						}
				
				});
			}
			
		}	
		
		function setDepartureAction () {
			
			// Remeber 'globally' where the user clicked and make a 'global' call back to be called by the service all response once the question process is complete 
			
			$.global.PenNamePopUpQuestionTrigger = self.triggerTarget;
			
			$.global.PenNamePopUpQuestionCallBack = function (response) {
				
				// The response is ignored because the user is attempting to leave the page either way and that should not be impeded.
				$.departPageNow($.global.PenNamePopUpQuestionTrigger);
			}
		}
		
		
		
		// END pre-defined content for PopUp Question:makeProfilePublic 
	}
	
	$.global.ReviewPenNamePopUp = new $.ReviewPenNamePopUpQuestion();
			
	if ($.global.ReviewPenNamePopUp.shouldAskQuestion()) { 

		//XXXXX		alert('right kind of Reveiw profile; ' + context.pageType + ', ' + context.profilePrivacyLevel);
		
		$.preventDepatureOnAllRealLinks ($.global.ReviewPenNamePopUp);
	}	

});
	
$(function() {   
// Coremetrics: Page views for reviews, ratings and library.
	if(typeof cmCreatePageviewTag !== "undefined"){
		try{
			var cmReviewId = "";
			var cmReviewDisplay = "";
			var cmProfile = $("#context #profilePenName").text();
			var pageType = context.pageType;
			if(pageType !== "undefined" && pageType != ""){
				if(pageType.indexOf("Reviews") != -1){
					if ($("input[name='reviewid']").val() != "") {
						cmReviewId = $("input[name='reviewid']").val();
						cmReviewDisplay = ": "+cmProfile+" ("+cmReviewId+")";
						cmCreatePageviewTag ("COMM-MYREVIEWSLIST"+cmReviewDisplay+"", "COMMUNITY REVIEWS");
					}
				}else if(pageType.indexOf("Write") != -1){
					cmCreatePageviewTag ("COMM-WRITEAREVIEW: "+cmProfile+"", "COMMUNITY REVIEWS");
				}else if(pageType.indexOf("Review") != -1){
					var cmProductTitle = $(".bookInfo h4 strong a").text();
					cmCreatePageviewTag ("COMM-MYREVIEWPERMALINK: "+cmProductTitle+"", "COMMUNITY REVIEWS");
				}else if(pageType.indexOf("Ratings") != -1){
					cmCreatePageviewTag ("COMM-MYRATINGSLIST: "+cmProfile+"", "COMMUNITY RATINGS");
				}else if(pageType.indexOf("Library") != -1){
					cmCreatePageviewTag ("COMM-SHOWCASE: "+cmProfile+"", "COMMUNITY SHOWCASE");
				}
			}
		}
		catch(e){}
	}
});
 

//**********************************
//	Class: mustPurchaseToReviewSelector
//**********************************
$.mustPurchaseToReviewSelector = function(options) {
	var self = this;
	var overlay = null;
	var overlayLayout = '<div class="overlayHeader"><h3>We\'re Sorry</h3><a class="overlayClose" href="#"><span>Close</span></a></div><div class="overlayContent"><p><b>You must have purchased this item to write a review.</b></p><p>In order to write a review for a NOOK App, it must be in your NOOK Library.</p><div class="dottedDivider"></div><p></button><button class="btn_GetItNow"/><button class="btn_Cancel"/></form></div></div>';
		   			
	var thisDataPath = $('form#writeReviewForm');	
	var writeReviewEAN = thisDataPath.find("input[name='ean']").val();
	var writeReviewPC = thisDataPath.find("input[name='pt']").val();	
	var productPageUrlPath = "http://search.barnesandnoble.com/books/product.aspx?EAN="+writeReviewEAN;
		//http://search.barnesandnoble.com/books/product.aspx?EAN=9780439784542
		//http://search.barnesandnoble.com/booksearch/isbninquiry.asp?EAN=2940043350251
		function init() {
			overlay = new $.Overlay();
			overlay.set.id("ovrly-MustPurchaseToReview");
			overlay.set.content(overlayLayout);
			overlay.set.width(480);
					
			$("#ovrly-MustPurchaseToReview").delegate("click", {
				"a.overlayClose": function(e){
					//close(e);
					window.location.href = productPageUrlPath;
				},
				"button.btn_GetItNow": function(e){
					window.location.href = productPageUrlPath;
				},
				"button.btn_Cancel" : function(e){
					window.location.href = productPageUrlPath;
				}
			});
		}
	
		this.open = function() {
			show();
		}
	
		function show() {
			overlay.open();
		}
		
		function close(e) {
			//if(e && e.preventDefault) { e.preventDefault(e); }		
			overlay.close();
			//overlay.set.content(overlayLayout);
		}
	
		init();
	 			
};