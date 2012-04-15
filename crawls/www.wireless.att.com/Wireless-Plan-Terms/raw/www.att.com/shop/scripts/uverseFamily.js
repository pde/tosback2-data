function uverseFamilyLib() {

	var notchContainer = null;
	var notch = null;
	
	this.highlightFamilyTile = function () {
		jQuery('img.mainImg', this).removeClass('transparency40per');
		jQuery(this).addClass('valueTileGradient');
		jQuery('.notchContainer', this).show();
	
		jQuery('#uverseFamilyBox .valueTile.currentPage img.mainImg').addClass('transparency40per');
		jQuery('#uverseFamilyBox .valueTile.currentPage').removeClass('valueTileGradient');
		jQuery('#uverseFamilyBox .valueTile.currentPage .notchContainer').hide();
	
	}
	this.unHighlightFamilyTile = function() {
		jQuery('img.mainImg', this).addClass('transparency40per');
		jQuery(this).removeClass('valueTileGradient');
		jQuery('.notchContainer', this).hide();
	
		jQuery('#uverseFamilyBox .valueTile.currentPage img.mainImg').removeClass('transparency40per');
		jQuery('#uverseFamilyBox .valueTile.currentPage').addClass('valueTileGradient');
		jQuery('#uverseFamilyBox .valueTile.currentPage .notchContainer').show();
	}
	this.setupFamilyTiles = function setupFamilyTiles() {
		
		if (jQuery('#uverseFamilyBox') != null) {
	
			notchContainer = document.createElement('div');
			jQuery(notchContainer).addClass('notchContainer');
			notch = document.createElement('img');
			notch.src = "/media/att/2011/shop/common/meetuverse_selected.png";
			jQuery(notch).addClass('notch');
			jQuery(notchContainer).append(notch);
			
			var valueTiles = jQuery('#uverseFamilyBox .valueTile');
			var numValueTiles = valueTiles.size();
			var target = '#';
			var setCurrentTile = jQuery('#setCurrentTile').val();
			valueTiles.each(function(index) {
				var thisTile = jQuery(this);
				if (index == setCurrentTile) {
					thisTile.addClass('currentPage');
				} else {
					thisTile.addClass('otherPage');
				}
				if (index == numValueTiles - 1) {
					thisTile.addClass('lastValueTile');
				}
				target = jQuery('#meetUverseTarget' + index).val();
				thisTile.click({'target':target}, function(e) {
					window.location.href = e.data.target;
				});
			});
		
			jQuery('#uverseFamilyBox .valueTile').append(notchContainer);
			jQuery('.notchContainer').hide();
			
			jQuery('#uverseFamilyBox .valueTile.currentPage').addClass('valueTileGradient');
			jQuery('#uverseFamilyBox .valueTile.currentPage .notchContainer').show();
		
			jQuery('#uverseFamilyBox .valueTile.otherPage img.mainImg').addClass('transparency40per');
		
			jQuery('#uverseFamilyBox .valueTile.otherPage').mouseover(this.highlightFamilyTile);
			jQuery('#uverseFamilyBox .valueTile.otherPage').mouseout(this.unHighlightFamilyTile);
		
		}
	}

}
