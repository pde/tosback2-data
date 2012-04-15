KIDS.ads.overlay = {};

// Show overlay local
KIDS.ads.overlay.show = function(opts) {
	var elementID = opts.id || 'promoOverlay';
	var mediaSrc = opts.src;	
	if (mediaSrc == null || mediaSrc == ''){
		return; 
	}
			
	var swfWidth = opts.width || '650px';
	var swfHeight = opts.height || '550px';
	var parentElement = opts.parent || '.wrapper';
	var overlayElement = opts.element || 'div';
	var destUrl = opts.destUrl || '';
	var fadeOutTime = opts.fadeOutTime || '15';
	var fadeOitTimeInMs = parseInt(fadeOutTime)*1000;
	// Minus height of mamabar 20 px;	
	var verticalLoc = parseInt(opts.verticalLoc)-20 || '266';
	var horizontLoc = opts.horizontLoc || '13';
	
	var isPNG=true;	
	if (mediaSrc.indexOf(".swf") != -1){
		isPNG=false;
	}
		
	if(isPNG){
		overlay = "<" + overlayElement + " id='" + elementID + "' style=\"display: none;\">";		
		overlay = overlay +"<a href=\"javascript:void(0)\" style=\"display:block\"><img src=\"/assets/blank.gif\" alt=\"\" title=\"\" /></a>";
		overlay = overlay +"<div id=\"closeOverlay\" style=\"width:74px; height:36px;position:absolute; left:579px; top:0px; cursor:pointer;\" onclick=\"KIDS.ads.overlay.hide();\" /><!-- -></div>";		
		overlay = overlay + "</" + overlayElement+ ">";
		
		$(parentElement).css({'position':'relative'}).append(overlay);
		
		$("#"+elementID+" > a").click(function () { window.open(destUrl, '_self') });
		$("#"+elementID+" > a > img").attr("src", mediaSrc);
		$("#"+elementID+"").css({'top': verticalLoc+'px', 'left': horizontLoc+'px'});
		$("#"+elementID+"").css('visibility', 'hidden');	
		$("#"+elementID+"").show();
		window.setTimeout(function (){KIDS.ads.overlay.hide();},fadeOitTimeInMs);
	}
	else{
		overlay = "<" + overlayElement + " id='" + elementID + "'> <!-- --> </" + overlayElement+ ">";		
		$(parentElement).css({'position':'relative'}).append(overlay);
		doRegisterSwf(elementID,
				mediaSrc,
				elementID,
				'9.0.124.0',
				swfHeight,
				swfWidth,
				{flashSchemeDomain:"http://www.nickjr-d.mtvi.com"},
				'false',
				'false',
				'/dynamo/javascript/swfobject/expressinstall.swf',
				'/common/detect/get_flash.jhtml',
				{bgcolor:"#ffffff",base:".",wmode:"transparent",salign:"TL",allowScriptAccess:"always",swliveconnect:"false"},
				{name:"", id: elementID}
			);
	}

	$('#' + elementID).css({'visibility': 'visible', 'display': 'block'});
}

KIDS.ads.overlay.hide = function(opts) {
	if (!opts) opts = {};
	overlay = opts.element || '#promoOverlay';
	
	$(overlay).css({'display': 'none', 'visibility': 'hidden'});
}

