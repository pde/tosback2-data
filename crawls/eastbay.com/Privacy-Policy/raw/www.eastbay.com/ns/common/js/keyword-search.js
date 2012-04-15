function getquerystring(term) {
	var searchTerm = $.trim(term.toLowerCase());
	searchTerm = searchTerm.replace(/ +/ig,'+');
	return searchTerm;
}
function submitKeywordSearch() {
	if($("form[name=keywordSearch]").find("input[name=keyword]").val() != '') {		
		var searchQuery = "http://"+document.location.host+"/_-_/keyword-" + escape(getquerystring($("form[name=keywordSearch]").find("input[name=keyword]").val()));
		cmCreateManualLinkClickTag('/?cm_sp=Search-_-Text-_-'+escape(getquerystring($("form[name=keywordSearch]").find("input[name=keyword]").val())), escape(getquerystring($("form[name=keywordSearch]").find("input[name=keyword]").val())));
		location.href = searchQuery;
	}
}

$("form[name=keywordSearch]").attr('action','javascript:void(0);');
$("form[name=keywordSearch]").attr('method','');
$("form[name=keywordSearch]").submit(function(e) {
	submitKeywordSearch();
});
