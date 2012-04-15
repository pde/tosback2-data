FlashFunction = function() {
	this.addToCart = null;
	this.offerId = null;
	this.tabId = null;
};

FlashFunction.prototype = {
	orderNowSubmit : function(){
		var thisInstance = this;	
		if(this.offerId == null || $.trim(this.offerId).length == 0){
			window.location.href = ctx + "storefront/index.jsp";
			return;
		}
		var bindParam = {
				
			type : "POST",
			async : false,
			url : ctx + "learn/includes/availiableOffers.jsp",
			data : {
				"offerId" : this.offerId
			},
			success : function(data) {
				$("#catalogRefIdsInput").val(thisInstance.offerId);
				$("#addItemToOrderSuccessURLInput").val(ctx+"configure/configure.jsp?bundleId="+thisInstance.offerId);				
				var available = $(data).find("#isAvailableInput").val();
				var isExistingUser = $(data).find("#isExistingUser").val();
				if("true"==isExistingUser || !thisInstance.addToCart) {
					var params = "offerId="+thisInstance.offerId;
					if(thisInstance.tabId!=null){
						params += "&selectedTabId="+thisInstance.tabId;
					}
					window.location.href = ctx + "storefront/index.jsp?"+params;
				} else if("true"==available){
					$("#submit_offer").click();
				} else {
					
					FormUtil.popupModalWindow("serviceability/popup/modalNotServiceable.jsp?offerId="+thisInstance.offerId);							
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		};
		$.ajax(bindParam);
	},
	
	popupModalLocalizeWindow : function(){
		var thisInstance = this;
		FormUtil.popupModalWindow("serviceability/popup/modalLocalize.jsp",function(){
			$(".localize-area P").first().text("Please enter your information below to check if this offer is available in your locality and place order.");
			$(".site-modal-close").click(function(){
				thisInstance.clearInfo();
			});
		});		
	},
	
	clearInfo : function(){
		this.addToCart = null;
		this.offerId = null;
	}
	
};

var flashFunction = new FlashFunction();
