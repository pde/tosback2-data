FormUtil = function() {
};
FormUtil.defaultHandleError = function(wrapper) {

	if (wrapper.triggerValidateSource != null)
		return;
	var errorSet = wrapper.validateResult.errorSet;
	errorSet = unique(errorSet);
	var errorMessageDiv = $(wrapper.form).find(".errorMessage");
	errorMessageDiv.empty();
	if (errorSet.length > 0) {
		errorMessageDiv.hide();
	}
	for ( var i = 0; i < errorSet.length; i++) {
		errorMessageDiv
				.append('<p style="display: block;" class="error-message">' + errorSet[i] + '</p>');
	}
	if (errorSet.length > 0) {
		errorMessageDiv.show("slow");
	}
};
FormUtil.defaultHandleAllErrorSource = function(wrapper, result) {

	var source = wrapper.currentSource;
	if (!result) {
		source.addClass("invalid-error");
	} else {
		source.removeClass("invalid-error");
	}
};
FormUtil.defaultHandleErrorSource = function(wrapper, result) {
	var source = wrapper.triggerValidateSource;
	if (!result) {
		source.addClass("invalid-error");
	} else {
		source.removeClass("invalid-error");
	}

	var errorSet = wrapper.getActivedErrorMessages();
	errorSet = unique(errorSet);
	var errorMessageDiv = $(wrapper.form).find(".errorMessage");
	errorMessageDiv.empty();
	if (errorSet.length > 0) {
		errorMessageDiv.hide();
	}
	for ( var i = 0; i < errorSet.length; i++) {
		errorMessageDiv
				.append('<p style="display: block;" class="error-message">' + errorSet[i] + '</p>');
	}
	if (errorSet.length > 0) {
		errorMessageDiv.show("slow");
	}
};

FormUtil.popupModalWindow = function(url,callBack) {
	$(".site-modal-overlay").css("display", "block");
	var bindParam = {
		type : "POST",
		async : false,
		url : ctx + url,
		//	url : "https://charter-uat.activationnow.com/store/" + url,
		success : function(data) {
			FormUtil.hideSelecterOnIE6();
			$(".modal-display-area").html(data);
			$("a.site-modal-close").click(function() {
				FormUtil.closePopUp();
			});
			if(callBack!=null){
				callBack();
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	};
	$.ajax(bindParam);
};

FormUtil.getCookies = function(name) {
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return '';
};

FormUtil.closePopUp = function() {
	$("div.site-modal-overlay").css("display", "none");
	$(".modal-display-area .site-modal-normal").css("display", "none");
	$(".modal-display-area .site-modal-buyflow").css("display", "none");
	FormUtil.showSelecterOnIE6();
};

FormUtil.perResizeCurvycorner = function(node) {
	var extHeight = 0;
	if (BrowserDetect.browser == "Explorer") {
		var nodeHeight = node.height();
		var padDivHeight = node.find(".autoPadDiv").height();
		extHeight = nodeHeight - padDivHeight;
	}
	return extHeight;
};

FormUtil.resizeCurvycornerOnIE = function(node, extHeight) {
	if (BrowserDetect.browser == "Explorer") {
		if (extHeight == null) {
			extHeight = 0;
		}
		var height = node.find(".autoPadDiv").height();
		node.css("height", (height + extHeight) + "px");
		node.find("div").first()
				.css("height", (height - 10 + extHeight) + "px");
	}
	$('div#buyflow-body-content').css({'min-height' : $('div.buyflow-sidebar').height()});
};

FormUtil.hideSelecterOnIE6 = function() {
	if ("Explorer" == BrowserDetect.browser && BrowserDetect.version == 6) {
		$("select").css("visibility","hidden");
		
	}
};

FormUtil.showSelecterOnIE6 = function(){
	if ("Explorer" == BrowserDetect.browser && BrowserDetect.version == 6) {
		$("select").css("visibility","visible");
	}
};

function unique(array) {

	var ret = [], done = {};
	try {
		for ( var i = 0, length = array.length; i < length; i++) {
			// var id = jQuery.data( array[ i ] );
			var id = array[i];
			if (!done[id]) {
				done[id] = true;
				ret.push(array[i]); 
			}
		}
	} catch (e) {
		ret = array;
	}
	return ret;
};

$(document).ready(function(){
	
	// TEMP HIDE THE DIV WITH "Sample Questions"
	$('div.right-f div.chat-portal p a.notice').css({'display': 'none'});
	
	$('#search-page-newSearch').keyup(function(e){
		//	alert(e.keyCode + " :: ENTER WAS HIT");
		if(e.keyCode == "13"){			
			var newSearchString = $('#search-page-newSearch').val();
			runNewSearch(newSearchString);
		}			
	});

	$('#search-page-submit').click(function(){
		var newSearchString = $('#search-page-newSearch').val();
		runNewSearch(newSearchString);
	});
});

function runNewSearch(newSearch){
	var qsString = 'http://ask.charter.com/index.jsp?interfaceID=1&requestType=NormalRequest&source=1&question=' + newSearch;
	window.open(qsString, 'IntelliResponseWindow','resizable=yes, scrollbars=yes,width=950, height=600, left=100, top=25, toolbar=no,location=yes,directories=no,menubar=no,status=yes');

//	SEARCH FUNCITONALITY :: NOT :: ASK CHARTER
	//	var qsString = "http://192.168.129.38:8080/store/search/index.jsp?_dyncharset=UTF-8&_dynSessConf=-2662911203203166635&search=" + newSearch + "&_D%3Asearch=+&%2Fsynchronoss%2Fformhandler%2FGoogleSearchFormHandler.successURL=%2Fstore%2Fsearch%2Findex.jsp&_D%3A%2Fsynchronoss%2Fformhandler%2FGoogleSearchFormHandler.successURL=+&_D%3A%2Fsynchronoss%2Fformhandler%2FGoogleSearchFormHandler.submit=+&_DARGS=%2Fstore%2Fincludes%2Fheader.jsp";
	//	window.location.href = qsString;
}

$(document).ready(function() {
	
	var flowW = $('.body-container ').width();
	
	$(window).resize(function() {
		if ($('.body-container ').width() != flowW) {
			alert('Window Resized... do your thing...');
		}
	});
	
	$.ajaxSetup({
		  dataType: "html"
	});
});

function displayOverlapLoaderBar(){
	$("#overlay").show();
    $('body').css({'overflow-y': 'hidden'});
	$('html').css({'overflow-y': 'hidden'});
	//	$('#overlay').css({'top' : 0, 'opacity' : .9});
	$('#overlay').css({'top' : 0, 'margin-top': 0, 'opacity' : .9});
	$(document).keydown(function(event){
		if(event.keyCode==9||event.keyCode==32||event.keyCode==8){
			return false;
		}
	});
}

function hideOverlapLoaderBar(){
	$('#overlay').css({'top' : '-10000px', 'opacity' : 0});
	$("#overlay").hide();
}
