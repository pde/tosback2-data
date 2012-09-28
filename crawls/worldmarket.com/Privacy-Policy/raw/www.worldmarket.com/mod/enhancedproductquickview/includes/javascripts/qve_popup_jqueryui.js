/*
Quick View Enhancement Modal Window by jQueryUI
*/
(function($){
	/**
		Function name: ml_popup
		Purpose: popup modal dialog using jQueryUI
		params:
			dialog_title: Dialog title
			close_text: text of close button
			url: url of quickviewenhancement link
			type: type of modal dialog, default to iframe
			width: width of Quickview enhancement modal box
			height: height of Quickview enhancement modal box
			showInCenter: whether modal dialog always showed in center
	*/
	$.fn.ml_popup = function(dialog_title,close_text,url,type,width,height,showInCenter){
		//form dialog html with an iframe inside
		var frameid = new Date().getTime(); //EPQV-12 fix: use new frame id to make sure Safari will not cache frame content when going back
		if ($('#popup-content').length == 0){
			$('body').append(
				overlay	= $('<div id="popup-content"><iframe name="' + frameid + '" frameborder="0" style="background:transparent;border:none;" width="' + (width) + '" height="' + (height) + '" scrolling="no" id="epqvPopup" allowTransparency="true"></iframe></div>')
			)
		}
		else{
			//change iframe's src property
			$('#popup-content').html('<iframe name="' + frameid + '" frameborder="0" style="background:transparent;border:none;" width="' + (width) + '" height="' + (height) + '" scrolling="no" id="epqvPopup" allowTransparency="true"></iframe>');
		}
		//create dialog by jQueryUI API
		$('#popup-content').dialog({
					show: 'fade',
					hide: 'fade',
					autoOpen: false,
					modal:true,
					closeText: close_text,
					width: width,
					height: 'auto',
					zIndex: 3999,//Fix EPQV-14
					draggable:!showInCenter,
					title:dialog_title
				});
		// open dialog
		$('#popup-content iframe').attr("src",url);;
		$('#popup-content').dialog("open");
		
		var dialogPos = $('#popup-content');
		dialogPos.css("position","relative");
		
		// always show modal dialog in the center
		if (showInCenter){
			$(window).unbind('resize').bind('resize scroll', function(){
				var obj = $(this);
				winWidth = obj.width();
				winHeight = obj.height();
				//EPQV-30 :Vertical and horizontal slider bars does not scale correctly when window resized
				//exit function if window height < modal dialog
				if(winHeight<height) return;
				scrollTop = obj.scrollTop();
				scrollLeft = obj.scrollLeft();
				var top = scrollTop + (winHeight/2) - (height/2);
				if (top < scrollTop)
					top = scrollTop;
				var left  = scrollLeft + (winWidth/2) - (width/2)
				if (left < scrollLeft)
					left = scrollLeft;
				var dialog = $('#popup-content').parent(".ui-dialog");
				dialog.css("top",Math.floor(top));
				$('.ui-widget-overlay').css('height', document.body.scrollHeight);
				//dialog.css("left",Math.floor(left));
				if (winWidth > 1000) {
					dialog.css("left",(winWidth-width)/2);
				} else {
					dialog.css("left",10);
				}
			});
		}		
		$('.ui-widget-overlay').css('z-index', '3999');
		
		//reset iframe on dialog close
		$('#popup-content').bind( "dialogclose", function(event, ui) {
			//$('#popup-content').html("");
		});
		$(window).resize();
	}
	/**
		Function name: ml_popup_refreshTo
		Purpose: transfer dialog to another url
		params:
			dialog_title: Dialog title
			url: url of quickviewenhancement link
	*/
	$.ml_popup_refreshTo = function(dialog_title,url){
		$('#popup-content').dialog("option" , "title",dialog_title);
		var iframe = $('#popup-content iframe');
		iframe.attr("src",url);
	}
})(jQuery);