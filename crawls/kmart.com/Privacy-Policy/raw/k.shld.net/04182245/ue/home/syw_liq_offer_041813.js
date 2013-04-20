
		//exclusions
		$('#exclusions_121913').live('click', function (event) {
		    console.log('clicked');
		    event.preventDefault();
		    $('#s_syw_exc_modal').shcModal({
		        modalClose: 's_syw_exc_modal_close'
		    }).shcCenter();
		});
		 //exclusions

		function sywLiquidityBanner(sywDivId) {
		    var curDomain = (document.location.hostname.match(/kmart.*/)) ? "kmart" : "sears";
			

		    if ($.cookie("SVPersonalizationCookie") != null || $.cookie("SVPersonalizationCookie") != undefined) {
		        var sywDat = $.cookie('SVPersonalizationCookie');
		        var sywDat = typeof JSON === 'object'? JSON.parse(sywDat) : eval( '('+sywDat+')' );
				var sywMemUrlTec="/shc/s/SywrOffer?channel="+curDomain+".com&sywrNumber=" + sywDat.sywrNumber + "&isHomeFlow=true&storeId=10153";
		       //var sywMemUrlTec = "/ue/home/ti_liquidity_022013.json";
		        
		        $.getJSON(sywMemUrlTec, function (offerData) {
		            if (offerData !== null && offerData.count > 0 && offerData.success) {
		                var ofrTit = offerData.offers[0].title + ' ' + offerData.offers[0].title2;
		                var actLink = offerData.offers[0].actionUrl;



		                $('<link href="/ue/home/syw_liq_offer_041713.css" rel="stylesheet" type="text/css" /><div id="syw_liquidity_offer_container" class="sywOrangeBg"><div id="offers_inner_cont"><div id="mess_only_logo"><a href="/shc/s/' + actLink + '" title="' + ofrTit + '"><img width="120" height="26" src="' + imagePath + 'ue/home/syw_ti_tec_022013.jpg" alt="' + ofrTit + '"/></a></div><div id="offer_item"><a href="/shc/s/' + actLink + '" title="' + ofrTit + '"><h3>' + ofrTit + '</h3><h4>' + offerData.offers[0].description + '</h4></a><a id="exclusions_121913">see details</a><a href="/shc/s/' + actLink + '" class="shopCta">shop now</a></div><div id="s_syw_exc_modal"><div class="modalbg"><p>' + offerData.offers[0].disclaimer + '</p><br /><p id="s_syw_exc_modal_close" class="shcBtn">close</p></div></div></div></div>').insertAfter('#'+sywDivId);

		            }
		        });
		    }
		}		