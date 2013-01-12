/*
Custom Quick View Enhancement Functions
*/

function CustomQVEObj(showPQV,showRating,showBadge,itemCode){
	this.showPQV = showPQV;
	this.showRating = showRating;
	this.showBadge = showBadge;
	this.itemCode = itemCode;
}

function processQVE(classId){

	customQVEArray = new Array();
	
	// Preparing the list of div with thumbnail data
	jQuery(classId).each(function(){
		var obj = jQuery(this);
		var showPQV = obj.attr('qv') == ''?false:obj.attr('qv');
		var showRating = obj.attr('rating') == ''?false:obj.attr('rating');
		var showBadge = obj.attr('badging') == ''?false:obj.attr('badging');
		var itemCode = obj.attr('id');
		
		if(itemCode != ''){
			customQVEArray.push(new CustomQVEObj(showPQV,showRating,showBadge,itemCode));
		}
		else{
		window.console.log('Div with class getThumb should have id as categoryItem code');
		}
	});
	
	if(customQVEArray.length > 0){
	
		var data = JSON.stringify(customQVEArray);
		
		// Sending the Ajax call to get the data of content thumbnails of entrire page at once
		jQuery.ajax({
			type: "POST",
			url: "/wmcustomthumbnail.do",
			data: {"data":data},
			async: true,
			success: function(responseHTML){
				
				// Iterating the list of empty content thumnbnail objects
				while(customQVEArray.length > 0){
					
					var customQVEObject = customQVEArray.pop();
					
					var container = jQuery("div#" + customQVEObject.itemCode);
					
					// Puting the HTML of content thumbnails from response 
					container.html(jQuery(responseHTML).find("div#" + customQVEObject.itemCode).html());
					
					if(!container.hasClass('getThumb')){
						container.addClass('getThumb');
					}					
					
					if(container.html().trim().length > 0){
						if(customQVEObject.showPQV){
							jQuery("div#" + customQVEObject.itemCode + " .qveThumbnail").unbind("mouseenter").bind("mouseenter", function(){
								var obj = jQuery(this);
								jQuery.fn.qve("attachButton", this, obj.attr("dialogTitle"), obj.attr("catPK"), obj.attr("buttonOn"), obj.attr("buttonOff"), obj.attr("url"), obj.attr("windowWidth"), obj.attr("windowHeight"),(obj.attr("showInCenter")!=null));
							});
							jQuery("div#" + customQVEObject.itemCode + " .qveThumbnail").unbind("mouseleave").bind("mouseleave", function(){
								jQuery.fn.qve("detachButton", this);
							});
						}						
					}else{
						container.css('display','none');
					}
					
				}
			},
			error: function(e){
			}
		});
	
	}
}

jQuery(document).ready(function() {
	processQVE("div.getThumb");
});

