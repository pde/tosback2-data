if(typeof NICK == "undefined" || !NICK) var NICK = {};

NICK.namespace("imx");


$(document).ready(function() {
	// Commented out until IMX is fixed.
	$(document).bind("tooltip.OPEN", function(e, data){
		//if($('#tooltip-stats-' + data.cmsid).size() > 0){
			NICK.imx.getReport(data.cmsid, data.itemType, ".tooltip-total-plays", ".tooltip-rate");
		//}
	});
	
	$(document).bind("tooltip.CLOSE", function(){ $(".tooltip-total-plays").html(""); $(".tooltip-rate").html("");});
});	

NICK.imx.getRating = function(cmsid){
	NICK.utils.doLog("get rating for cms: "+cmsid);
};

NICK.imx.doRating = function(cmsid, rating){
	NICK.utils.doLog("do rating "+rating);
	
	$('#stats-rating a.rate-up').hide();
	$('#stats-rating a.rate-down').hide();
	
	var rateUp = $('#stats-rating span.rate-up');
	var rateDown = $('#stats-rating span.rate-down');
	
	if(rating > 0){
		rateUp.addClass("rate-up-active").show();
		rateDown.addClass("rated-dn").show();
	}else{
		rateUp.addClass("rate-down-active").show();
		rateDown.addClass("rated-up").show();
	}
	
	var params = {
	 	'itemId':cmsid,
		'rating':rating
	 }; 
	NICK.request.doRequest({
		dataType:"jsonp",
		url: NICK.config.IMX_RATE,
		data: params,
		onSuccess: function(response) {
			//$("div.rating-box").html(response);
			$('#stats-rating span.rate-down.rate-disabled').show();
			
		},
		onFail: function(errors) {
			for(var error in errors) {
				NICK.utils.doLog("NICK.rating.getRating: Error: "+error+" - "+errors[error]);
			}
		}				
	});
};

NICK.imx.callIMXPlay = function(_cmsid,_type){
	var cmsid = "";
	if(_cmsid == null){
		cmsid = NICK.get("cmsId");
	}else{
		cmsid = _cmsid;
	}
	var type = "";
	if(_cmsid == null){
		type = NICK.get("type");
	}else{
		type = _type;
	}
	
	NICK.request.doRequest({
		dataType:"jsonp",
		url: NICK.config.IMX_PUT,
		data: {itemId:cmsid, action:"play", value:type},
		onSuccess: function(response) {
			NICK.utils.doLog("IMX Play Success:");
			
		},
		onFail: function(errors) {
			for(var error in errors) {
				NICK.utils.doLog("IMX Play : Error: "+error+" - "+errors[error]);
			}
		}				
	});
};

NICK.imx.getReport = function(_cmsid, _type, _playid, _rateid){
	NICK.request.doRequest({
		dataType:"json",
		url: NICK.config.IMX_VIEW_COUNT,
		data: {itemId:_cmsid, type:_type, listUrls:"thumbsup,thumbsdown,viewcount"},
		onSuccess: function(response) {
			if(response == null || !response.length || response[0].itemList == null) {
				NickLog.debug("IMX: invalid response: "+response.length);
				$("#nick-tooltip").find(".info-list").hide();
				return;
			}
				
			var count = 0;
			var rate = 100;
			var thumbsup = 0;
			var thumbsdown = 0;
			var viewCount = 0;
			$(".display-rating-only .rate-up").removeClass("rate-up-active");
			$(".display-rating-only .rate-down").removeClass("rate-down-active");
			
			for(var i = 0; i < response.length; i++) {
				viewCount = response[i].itemList.items[0].viewcount;
				NickLog.debug("IMX: count: "+ viewCount+" | type: "+response[i].itemList.listUrl);

				switch(response[i].itemList.listUrl) {
					case "/imx/nick/gamehub/item/rating/thumbsup" : {
						thumbsup = viewCount;
						break;
					} case "/imx/nick/upick/top/rating/item/thumbsup" : {
						thumbsup = viewCount;
						break;
					} case "/imx/nick/gamehub/item/rating/thumbsdown" : {
						thumbsdown = viewCount;
						break;
					} case "/imx/nick/upick/top/rating/item/thumbsdown" : {
						thumbsdown = viewCount;
						break;
					} case "/imx/nick/gamehub/item/play/game" : {
						count = viewCount;
						break;
					} case "/imx/nick/upick/top/play/item/video" : {								
						count = viewCount;
						break;
					} default : {
						NickLog.debug("IMX: no match on listUrl: "+response[i].itemList.listUrl);								
					}
				}
				//NickLog.debug("IMX: len:1: "+ response.length+ " | "+thumbsup+" | "+thumbsdown+" | "+count);
			}
			
			rate = (thumbsup + thumbsdown == 0) ? 50 : Math.ceil((thumbsup / (thumbsup + thumbsdown)) * 100);
			NICK.utils.doLog("IMX report: count: " + count+ " | thumsup: "+thumbsup+ " | thumbsdown: "+thumbsdown+" | rate: "+rate);

			// Hide ratings / views for new items with 0 views.
			if(count === 0){
				$("#nick-tooltip").find(".info-list, .game-social").hide();
			}else{
				$("#nick-tooltip").find(".info-list, .game-social").show();
					
				NICK.utils.doLog("IMX report---> count: " + count+ " | thumsup: "+thumbsup+ " | thumbsdown: "+thumbsdown);
					
				count = addCommas(count);
					
				$(_playid).html(count);
				$(_rateid).html(rate+"%");
					
				if(rate>49){ 
					$(".display-rating-only .rate-up").addClass("rate-up-active");
				}else{
					$(".display-rating-only .rate-down").addClass("rate-down-active");
				}
					
			}
		},
		onFail: function(errors) {
			for(var error in errors) {
				NICK.utils.doLog("IMX View Count : Error: "+error+" - "+errors[error]);
			}
		}				
	});
};

/** Still working on this, more work needs to be completed on the controller.
 * Request a consolidated imx report for multiple items.
 * 
 * @param config An object containing the default config overrides.
 * @param callback A function to call when data is returned from imx.
 * @param errorCallback A function to call when the request returns an error.
 * 
 */
NICK.imx.getMultiReport = function (_config, _callback, _errorCallback) {	
	
	var defaults = {
		listUrls: 'thumbsup,thumbsdown,viewcount',
		type: 'video',
		items: []
	};
	
	_config = $.extend(defaults,_config);
	
	// If there are no item id's passed to this function, call the error callback, because we need them.
	if (_config.items.length === 0) {
		
		NICK.utils.doLog("IMX Multi Report : Error: Items are no defined.");
		
		if (typeof _errorCallback !== 'undefined') {
				_errorCallback('Items are not defined.');
		}
		
		return;	
	}
	
	NICK.request.doRequest({
		dataType:"json",
		url: NICK.config.IMX_VIEW_COUNT,
		data: {itemIds: _config.items.join(','), type: _config.type, listUrls: _config.listUrls},
		cache: true,
		onSuccess: function (response) {
			_callback(response);	
		},
		onFail: function (errors) {
			
			for(var error in errors) {
				NICK.utils.doLog("IMX Multi Report : Error: "+error+" - "+errors[error]);
			}
			
			
			if (typeof _errorCallback !== 'undefined') {
				_errorCallback(errors);
			}
			
		}
	});
	
};

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


