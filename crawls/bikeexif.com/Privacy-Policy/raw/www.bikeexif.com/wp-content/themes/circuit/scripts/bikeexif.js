

$(document).ready(function() {

	if ($("#clean-archives-revolutions").is("div")) {
		cleanArchivesRevolutions();
	}

	$(".archive-post-list, .exif-post-list").delegate("li", "hover", function(e) {
		if (e.type==='mouseenter'){
			$(this).find(".post-title a").animate({paddingBottom:20}, 100,'swing');
		}
		else {
			$(this).find(".post-title a").animate({paddingBottom:10}, 100,'swing');
		}
	});

	$searchSortForm = $("#search-results").find("#searchform-sort");
	$searchSortForm.find("#btn-go").hide();
	$searchSortForm.find("select").change(function() {
		$(this).closest("form").submit();
	});

	EXIF.archivesIntro();
});

var EXIF = EXIF || {};

EXIF.archivesIntro = function(){

	var $introWidget = $("#archives-intro");

	$introWidget.find("li:not(:first)").fadeOut(100);



	function fadeInNext() {
		setTimeout(function() {
			var $currentEl = $introWidget.find("li.active");
			var $nextEl = $currentEl.next();
			if ($nextEl.length == 0) {
				$nextEl = $introWidget.find("li:first");
			}
			$currentEl.fadeOut(2500, function() {
				$(this).removeClass("active");
			});
			$nextEl.fadeIn(2500, function(){
				$(this).addClass("active");
				fadeInNext();
			});
		}, 6000);

	}

	fadeInNext();

}


function cleanArchivesRevolutions() {

	$car = $("#clean-archives-revolutions");


	if ($car.find(".active").length < 1) {
		$car.find(".archives-year:first").addClass("active");
	}

	function setParentHeight(){
		//get the height
		var h = $(".archives-year.active").height() + $(".archives-year.active ul").outerHeight();
		//we only need to do this on regular pages.
		$("#content .archives-list-container").height(h);
	}

	//replace the year links with tabby goodness
	$car.delegate(".archives-year h3 a", "click", function(e) {
		e.preventDefault();


		$car.find(".archives-year.active").removeClass("active");
		$(this).closest(".archives-year").addClass("active");

		setParentHeight();

		return false;
	});

	setParentHeight();

}
