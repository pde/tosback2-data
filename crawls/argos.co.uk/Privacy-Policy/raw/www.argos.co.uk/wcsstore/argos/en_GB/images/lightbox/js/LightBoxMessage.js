var LightBoxMessage = {};
$(document).ready(function(){
	LightBoxMessage = new (function(){
		var rememberAnchor = document.getElementById("rememberMeMessage");
		if(!rememberAnchor) return;
		$( rememberAnchor).bind("click", rememberMeMessage_onClick);
		
		if ($("div.benefitsofregistration")) {
				$("div.benefitsofregistration p").show();
		}
		var benefitAnchor = document.getElementById("benefitsofregistration");
		if(!benefitAnchor) return;
		$( benefitAnchor).bind("click", benefitsofregistration_onClick);
	})
	
	function rememberMeMessage_onClick(){
		showMessageInLightbox("LB_MESSAGE_REMEMBER_ME_EXPLAINED");
		return false;
	}
	
	function benefitsofregistration_onClick(){
		showMessageInLightbox("LB_MESSAGE_BENEFITS_OF_REGISTRATION");
		return false;	
	}
	
	function showMessageInLightbox(message){
		LightBox.setHTML(LightBox.loadingHTML);
		LightBox.showOverlay();
		LightBox.setOverlayTooltip("To close the message box click on the 'Close X' link") 
	    LightBox.showLightBox();		
	    var data ="";
	    data +="&message="+message;
		LightBox.extended.request({
			url: "https://" + window.location.host + "/webapp/wcs/stores/servlet/SimpleAjaxMessage",
			dataType: "json",
			type: "get",
			data: data,
			success: showMessageLightBox,
			error: showRequestError
		});
	}
	
	function showMessageLightBox(json) {
		LightBox.hideLightBox();
		LightBox.setHTML(json.html);
		
		var dialogue = $("#lightBox")[0];

			$(dialogue).addClass("lightBoxLoginMessage");


		LightBox.showLightBox();
		LightBoxLoginMessage.init();
	}
	
	
	shutlMessageHTML = function showHTMLMessageInLightbox(){
		LightBox.setHTML(LightBox.loadingHTML);
		LightBox.showOverlay();
		LightBox.setOverlayTooltip("To close the message box click on the 'Close X' link") 
	    LightBox.showLightBox();
		LightBox.extended.request({
			url: "https://" + window.location.host + "/wcsstore/argos/argosincludes/shutl.htm",
			dataType: "html",
			type: "get",
			success: showMessageLightBoxHTML,
			error: showRequestError
		
		});
	}
	
	function showMessageLightBoxHTML(html) {
		LightBox.hideLightBox();
		LightBox.setHTML(html);
		
		var dialogue = $("#lightBox")[0];
		$(dialogue).addClass("lightBoxLoginMessage");
		LightBox.showLightBox();
		LightBoxShutlMessageHTML.init();
	}
	
	
	
	function showRequestError(XMLHttpRequest, textStatus, errorThrown) {
	    	
    	var html = '';
    	html += '<div id="lightBoxError">';
    	html +=		'<div class="heading"><h2>An error occured</h2><a href="#" class="closeLightBox">Close</a></div>'
    	html +=		'<div class="details">';
    	html +=			'<p>Request: '+XMLHttpRequest+'</p>';
    	html +=			'<p>Status: '+textStatus+'</p>';
    	html +=			'<p>Code: '+XMLHttpRequest.status+'</p>';
    	html +=			'<p>Error: '+errorThrown+'</p>';
    	html +=		'</div>';
    	html += '</div>';
    	LightBox.hideLightBox();
    	LightBox.setHTML(html);
    	LightBox.showLightBox();
    }
});
var LightBoxLoginMessage = new (function() {
	this.init = init;
	function init() {
		$("#lightBoxLogin .closeLightBox").bind("click", closeLightBox_onClick);
	}
	
	function closeLightBox_onClick() {
		var dialogue = $("#lightBox")[0];
		$(dialogue).removeClass("lightBoxLoginMessage");
		return false;
	}
});
LightBoxShutlMessageHTML = new (function() {
	this.init = init;
	function init() {

		var inPageForm = $("form#shutlForm");
		var lightBoxForm = $("#lightBox #shutlLightBoxForm");
		var formDataValue = $("form#shutlForm #shutlData").attr("value");
		var formOnSubmitValue = $(inPageForm).attr("onsubmit");
		var formActionValue = $(inPageForm).attr("action");
	
		$(lightBoxForm).attr("action",formActionValue);
		$(lightBoxForm).attr("onsubmit",formOnSubmitValue);
		$("#lightBox #shutlLightBoxForm #shutlData").attr("value",formDataValue);
		var submitButton = 	$(lightBoxForm).find("input.submit");
	
		$(submitButton).bind("click", function(){
			//hide lightbox following submission
			var firstCloseLink = $("#ShutlContent .closeLightBox")[0];
			$(firstCloseLink).click();
		});
	
	}

});
