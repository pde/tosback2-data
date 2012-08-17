/*
Custom Quick View Enhancement Functions
*/

jQuery(document).ready(function() {
	jQuery("div .getThumb").each(function(){
		var obj = jQuery(this);
		var showPQV = obj.attr('qv') == ''?false:obj.attr('qv');
		var showRating = obj.attr('rating') == ''?false:obj.attr('rating');
		var showBadge = obj.attr('badging') == ''?false:obj.attr('badging');
		var itemCode = obj.attr('id');
		if(itemCode != ''){
		obj.load("/wmcustomthumbnail.do?itemCode=" + itemCode + "&showBadge=" + showBadge + "&showPQV="+ showPQV + "&showRating=" +showRating,function(){
			jQuery("div#" + itemCode + " .qveThumbnail").unbind("mouseenter").bind("mouseenter", function(){				
				var obj = jQuery(this);
				jQuery.fn.qve("attachButton", this, obj.attr("dialogTitle"), obj.attr("catPK"), obj.attr("buttonOn"), obj.attr("buttonOff"), obj.attr("url"), obj.attr("windowWidth"), obj.attr("windowHeight"),(obj.attr("showInCenter")!=null));
			});
			jQuery("div#" + itemCode + " .qveThumbnail").unbind("mouseleave").bind("mouseleave", function(){
				jQuery.fn.qve("detachButton", this);
			});
		});
		}
		else{
		window.console.log('Div with class getThumb should have id as categoryItem code');
		}
	});	
});

