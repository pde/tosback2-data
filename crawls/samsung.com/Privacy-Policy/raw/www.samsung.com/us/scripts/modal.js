//Modal functions for TV spec grid modules - may be used for other modal uses

function modal(filePath, width, height, print, tvtype){

	var popupHeight = $(window).height() - 60;
		
	$('body').append('<div id="modal_cover" onclick="hide_Modal()" style="margin: 0; width:100%; height:100%; display:block; z-index:2147483602 !important; position:fixed; top: 0; left: 0; background: #000000; opacity: 0.8; filter: alpha(opacity=80);"></div>');

	$('body').append('<div id="modal_wrapper" style="width:' + width + 'px; height:' + popupHeight + 'px; margin: -' + popupHeight / 2 + 'px 0 0 -' + width / 2 + 'px; display:block; z-index: 2147483647 !important; position:fixed; top: 50%; left: 50%; border:solid 1px black; background: #ffffff; overflow: auto;"></div>');

	$('#modal_wrapper').load(filePath);
	
	$('body').append('<a href="javascript:void(0);" class="btn_close_popup" onclick="hide_Modal()" style="margin: -' + (popupHeight / 2 + 15) + 'px 0 0 -' + width / 2 + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">close layer</a>');

	if(print == 'print_yes' && tvtype == 'plasma'){
		$('body').append('<a class="print_button" href="/us/module/2011_tv_spec_grids/plasma-print.html" target="_blank" style="margin: -' + (popupHeight / 2 + 15) + 'px 0 0 -' + (width / 2 - 85) + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">printer-friendly version</a>');
	}
	
	if(print == 'print_yes' && tvtype == 'led'){
		$('body').append('<a class="print_button" href="/us/module/2011_tv_spec_grids/led-print.html" target="_blank" style="margin: -' + (popupHeight / 2 + 15) + 'px 0 0 -' + (width / 2 - 85) + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">printer-friendly version</a>');
	}
	if(print == 'print_yes' && tvtype == 'lcd'){
		$('body').append('<a class="print_button" href="/us/module/2011_tv_spec_grids/lcd-print.html" target="_blank" style="margin: -' + (popupHeight / 2 + 15) + 'px 0 0 -' + (width / 2 - 85) + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">printer-friendly version</a>');
	}
	if(print == 'print_yes' && tvtype == 'hometheater'){
		$('body').append('<a class="print_button" href="/us/module/2011_tv_spec_grids/hometheater-print.html" target="_blank" style="margin: -' + (popupHeight / 2 + 15) + 'px 0 0 -' + (width / 2 - 85) + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">printer-friendly version</a>');
	}

}
		
//modal for iframes - useful for displaying external webpages
function iframeModal(filePath, width, height, ifWidth, ifHeight){

	$('body').append('<div id="modal_cover" onclick="hide_Modal()" style="margin: 0; width:100%; height:100%; display:block; z-index:2147483602 !important; position:fixed; top: 0; left: 0; background: #000000; opacity: 0.8; filter: alpha(opacity=80);"></div>');

	$('body').append('<div id="modal_wrapper" style="width:' + width + 'px; height:' + height + 'px; margin: -' + height / 2 + 'px 0 0 -' + width / 2 + 'px; display:block; z-index: 2147483647 !important; position:fixed; top: 50%; left: 50%; border:solid 1px black; background: #ffffff; overflow: auto;"><iframe src='+filePath+' scrolling=no width='+ifWidth+' height='+ifHeight+' border=0 ></iframe></div>');

	$('#modal_wrapper').load(filePath);
	
	$('body').append('<a href="javascript:void(0);" class="btn_close_popup" onclick="hide_Modal()" style="margin: -' + (height / 2 + 15) + 'px 0 0 -' + width / 2 + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">close layer</a>');
}

//modal hide function - used by both modal functions
function hide_Modal(){
	$("#modal_wrapper").remove();
	$(".btn_close_popup").remove();
	$("#modal_cover").remove();
	$(".print_button").remove();
}
