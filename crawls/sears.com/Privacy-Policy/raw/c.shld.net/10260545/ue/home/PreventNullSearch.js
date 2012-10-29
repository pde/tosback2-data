/* Prevent null search from search bar starts till end*/
var searchKeywordInput=$("#keyword"),
    submitKeywordInput=$("#goBtn"),
    searchKeywordLabel=$("#keywordLabel");
/* Use non-standard search for WeeklyAd */
if (location.href.match(/WeeklyAdHome|WeeklyAdDept/gi)) {
        searchKeywordLabel.click(function() {
	      $(searchKeywordInput).focus();
        });
        searchKeywordInput.focus(function() {
	searchKeywordLabel.hide();
	$("#keyword").blur(function() {
		var keyword=$("#keyword").val();
		if ($.trim(keyword) === "") {
			searchKeywordInput.val('');
			searchKeywordLabel.show();
		}
	});
        });

	searchKeywordLabel.text('Search your LocalAd offers');
	$("#srchFrm").unbind().submit(function(e) {
		var keyword=$("#keyword").val(),
		keywordTrimmed = keyword.mtrim().trim();
		searchwithinLocalAd(keywordTrimmed);
		e.preventDefault();
		return false;
	 });
} else {
	$("#srchFrm").submit(function() {
		var keyword=$("#keyword").val(),
			keywordTrimmed = keyword.mtrim().trim();
			$('#keyword').val(keywordTrimmed);
			
		if (keywordTrimmed!=="") {
			keywordTrimmed = keywordTrimmed.replace(/&/gi, "%26").replace(/ /gi, "+").replace(/,/gi, "%2C");
			af_omniture_update();			
			document.location = '/search=' + keywordTrimmed;
		}
		return false;
	});
}
