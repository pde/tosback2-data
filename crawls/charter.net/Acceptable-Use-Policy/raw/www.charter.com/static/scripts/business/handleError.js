HandleError = function() {
};	
HandleError.prototype = {
	handleException : function() {
		var thisInstance = this;
		$("#modal-error-custarea").ajaxError(function(event,request, settings) {
			if(request.status==409){
				window.location.href=ctx ;
			}else{
				FormUtil.closePopUp();
				thisInstance.showErrorMesagesModal("An unexpected error has occured. Please try again.");
			}
		});
	},
	
	 
	
	showErrorMesagesModal:function(errorMessage) {
		var thisInstance = this;
		//errorMessage = unique(errorMessage);
		var errorModal = $("#modal-error-custarea");
		errorModal.css("z-index", "3000");
		errorModal.css("display", "block");
		errorModal.css("top", "155px");
		errorModal.css("left", "850.5px");
		$("#modal-error-custarea > .modal-body > .error-message")
				.html(errorMessage);		
		$("#anchorFocus").focus();
	},
	
	showLocalizeValidateErrorMessage:function(errorMessage){
		
		var thisInstance = this;
		//errorMessage = unique(errorMessage);
		var localizeDiv =$("#customer-module-div");
		var errorModal = $("#modal-error-custarea");
		var top=localizeDiv.offset().top + 112;
		var left =localizeDiv.offset().left-18;
		
		errorModal.css("z-index", "3000");
		errorModal.css("display", "block");
		errorModal.css("top", top);
		errorModal.css("left", left);
		$("#modal-error-custarea > .modal-body > .error-message")
				.html(errorMessage);		
		$("#anchorFocus").focus();
	},
	
	resizeErrorMessage : function(parentNode){
		if(parentNode.size() > 0){
			var errorModal = $("#modal-error-custarea");
			var top=parentNode.offset().top + 112;
			var left =parentNode.offset().left-18;
			errorModal.css("top", top);
			errorModal.css("left", left);
		}	
	},
	
	showChannelErrorMesages:function(errorMessage,locationDiv) {
		var thisInstance = this;
		//errorMessage = unique(errorMessage);
		var errorModal = $("#modal-error-custarea");

		var topLocation = "170px";
		var leftLocation = "690.5px";
		if (locationDiv!=null){
			topLocation=(locationDiv.offset().top+68)+"px";
			leftLocation =(locationDiv.offset().left+26)+"px";
		}
		
		errorModal.css("z-index", "3000");
		errorModal.css("display", "block");
		errorModal.css("top", topLocation);
		errorModal.css("left", leftLocation);
		$("#modal-error-custarea > .modal-body > .error-message")
				.html(errorMessage);		
		$("#anchorFocus").focus();
	},
	closeErrorMesagesModal:function() {
		var errorModal = $("#modal-error-custarea");
		errorModal.css("display", "none");
	}
}
var handleError = new HandleError();


$(function() {
	handleError.handleException();
	
});
