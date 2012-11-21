function submitFeedback(dataString, feedbackFormId) {
	$('#'+feedbackFormId).html("Thanks for letting us know how we did. Your feedback is important to us.");
    $.ajax({
    	type: "POST",
        url: "/services/search/feedback",
        data: dataString
	});
	return false;
}

function clickResult(linkid) {
	var urlString = '/services/search/click?linkid='+ linkid;
	$.ajax({
		type: "PUT",
		url: urlString
	});
	$('#'+linkid).next().click();
}


