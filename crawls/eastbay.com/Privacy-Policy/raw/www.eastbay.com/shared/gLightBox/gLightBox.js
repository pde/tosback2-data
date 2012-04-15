$(document).ready(function() {
	$("a[rel^='gLightBox']").each(initLightBox);
});

function initLightBox() {
	var link = $(this).attr("href");
		
	var width = "";
	var height = "";
	var rel = $(this).attr("rel");
	width = rel.match(/width=\d+/) + ""; // match returns array so append "" to convert to string
	height = rel.match(/height=\d+/) + "";
	width = width.match(/\d+/);
	height = height.match(/\d+/);
	
	$(this).attr("href", "javascript:openLightBox('" + link + "', " + width + ", " + height + ")");
	
	$(window).resize(repositionLightBox);	
}

function repositionLightBox() {
	var documentWidth = $(document).width();
	$("#gLightBox_bg").css("width", documentWidth);
	var bodyWidth = $("body").width();
	var offsetLeft = (bodyWidth - $("#gLightBox").width()) / 2;
	var offsetTop = getViewpointTop() + ((getViewpointHeight() - $("#gLightBox").height()) / 2);
	if (offsetLeft < 0) offsetLeft = 0;
	if (offsetTop < 0) offsetTop = 0;
	$("#gLightBox").animate({left: offsetLeft, top: offsetTop});	
}

function openLightBox(link, width, height, closeAction) {
	// width and height are passed in as null if not found
	// set the default width/height to 360px/100px
	if (width == null || width < 360) width = 360;
	if (height == null || height < 100) height = 100;
	
	if (closeAction == null) {
		closeAction = "closeLightBox()";
	}
	
	var target_width = width;
	var target_height = height;
	
	width = 360;
	height = 100;
	
	var padding = 10;
	
	if ($.browser.msie) padding = 20;
	
	var wrapperWidth = width + 18 + 18 + padding;
	var wrapperHeight = height + 70 + 64;

	var documentHeight = $(document).height();
	var documentWidth = $(document).width();
	$("body").prepend('<div id="gLightBox_bg">&nbsp;</div>');
	$("#gLightBox_bg").css({
		"opacity": 0.8,
		width: documentWidth,
		height: documentHeight
	});
	$("#gLightBox_bg").click(function() {eval(closeAction);});

	if ($.browser.msie && jQuery.browser.version == 6.0)
		$("#gLightBox_bg").css({ "opacity": 0.95 });
	
	var tags = '<div id="gLightBox">';
	tags += '<div id="gLightBox_top">';
	tags += '<div id="gLightBox_topLeft"></div>';
	tags += '<div id="gLightBox_topMiddle"></div>';
	tags += '<div id="gLightBox_topRight"></div>';
	tags += '</div>';
	tags += '<div id="gLightBox_middle">';
	tags += '<div id="gLightBox_middleRight">';
	tags += '<div id="gLightBox_content"></div>';
	tags += '<div style="clear: both"></div>';
	tags += '</div>';
	tags += '</div>';
	tags += '<div id="gLightBox_bottom">';
	tags += '<div id="gLightBox_bottomLeft"></div>';	
	tags += '<div id="gLightBox_bottomMiddle"></div>';	
	tags += '<div id="gLightBox_bottomRight"><a href="javascript:' + closeAction + '"><span class="red">x</span> Close</a></div>';
	tags += '</div>';
	tags +='</div>';
	
	$("body").prepend(tags);

	var bodyWidth = $("body").width();

	var offsetTop = getViewpointTop() + ((getViewpointHeight() - wrapperHeight) / 2);	
	var offsetLeft = (bodyWidth - wrapperWidth) / 2;
	$("#gLightBox").css({width: wrapperWidth, height: wrapperHeight, left: offsetLeft, top: offsetTop});
	$("#gLightBox_content").css({width: width + padding, height: height});
	$("#gLightBox_topMiddle").css({width: wrapperWidth - 200 - 160});
	$("#gLightBox_bottomMiddle").css({width: wrapperWidth - 112 - 153});

	width = target_width;
	height = target_height;

	wrapperWidth = width + 18 + 18 + padding;
	wrapperHeight = height + 70 + 64;

	offsetTop = getViewpointTop() + ((getViewpointHeight() - wrapperHeight) / 2);	
	offsetLeft = (bodyWidth - wrapperWidth) / 2;
	$("#gLightBox").animate({width: wrapperWidth, left: offsetLeft}, function() {
		$("#gLightBox").animate({height: wrapperHeight, top: offsetTop}, function() {
			$("#gLightBox_content").load(gLightBoxTemplatePath, {link: link}, function () {
				$("#gLightBox_content").css("background-image", "none");
			});		
		});			
		$("#gLightBox_content").animate({height: height});
	});
	$("#gLightBox_content").animate({width: width + padding});
	$("#gLightBox_topMiddle").animate({width: wrapperWidth - 200 - 160});
	$("#gLightBox_bottomMiddle").animate({width: wrapperWidth - 112 - 153});	
}

function closeLightBox() {
	$("#gLightBox_bg").remove();
	$("#gLightBox").remove();
}