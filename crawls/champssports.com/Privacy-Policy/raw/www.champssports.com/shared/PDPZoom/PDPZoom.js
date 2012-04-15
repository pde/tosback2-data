// JavaScript Document

var global_zoomTemplatePath = "";

function zoomPDPImage(sku, scene7, zoomTemplatePath) {
	global_zoomTemplatePath = zoomTemplatePath;

	$("#zoomImageDiv").css("display", "block");
	$("#zoomBackground").css("opacity", "0.9");
	$("#zoomBackground").css("display", "block");
	
	// hide select tag on ie6 because they will appear above zoom layer
	if ($.browser.msie && $.browser.version < 7) $("select").hide();

	/*
	var documentWidth = $(document).width();
	var documentHeight = $(document).height();
	$("body").prepend('<div id="overlayBG"></div>');
	$("#overlayBG").css({opacity: 0.5, position: "absolute", "z-index": 998, width: documentWidth, height: documentHeight, "background-color": "white" });

	var bodyWidth = $("body").width();
	var leftOffset = (bodyWidth - 500) / 2;
	var topOffset = getViewpointTop() + ((getViewpointHeight() - $("#quickview").height()) / 2);	

	$("#zoomImage").css({ left: leftOffset, top: topOffset });	
	*/
	
	swapZoomImage(sku, scene7);
}

function closeZoom() {
	$("#zoomImageDiv").css("display", "none");
	$("#zoomBackground").css("display", "none");
	/* $("#overlayBG").remove(); */
	
	// show select tag on ie6
	if ($.browser.msie && $.browser.version < 7) $("select").show();
}

function swapZoomImage(sourceSKU, scene7) {
	var targetSKU = $("#zoomImageSKU").val();
	var targetThumb = $("#zoomImageThumb").val();
	var targetScene7 =  $("#zoomImageScene7").val();
	
	//if (sourceSKU == targetSKU) return;

	var source = $("#thumb_" + sourceSKU);
	var sourceThumb = source.children("img").attr("src");
	
	var href = 'javascript:swapZoomImage("' + targetSKU + '", "' + targetScene7 + '")';
	source.attr("href", href);
	source.children("img").attr("src", targetThumb);
	source.attr("id", "thumb_" + targetSKU);
	
	$("#zoomImageSKU").val(sourceSKU);
	$("#zoomImageScene7").val(scene7);
	$("#zoomImageThumb").val(sourceThumb);
	$("#zoomImage").load(global_zoomTemplatePath, { sku: sourceSKU, scene7: scene7 });
}

function showOtherStyleInfo(info, infoCount) {
	$("#pdpOtherStyleInfo_" + infoCount).html(info);
}

function hideOtherStyleInfo() {
	$(".pdpOtherStyleInfo").html('&nbsp;');
}