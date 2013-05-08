/**
 * This file contains functions for:
 * 
 * - Swapping images based on browser size
 * - Changing images based on swatch selection
 * 
 */

var cmwidth,url,pNum,currentSize,currentImg,resultPage,pinterestLink;
var shouldSwap = 'n';

//This function makes the actual change based on browser size
function changeImages(size,current) {
	
	$("#middle-results .item .img img").each(function() {
		pNum =$(this).prev().text();
		url= protocol +"//dimg.dillards.com/is/image/DillardsZoom/"+pNum+"?$"+size+"$";
		$(this).prop('src',url);
	});
	currentSize=size;
	currentImg=current;
}

//On Window Resize
$(window).smartresize(function() {
	cmwidth = $(window).width();
	if (shouldSwap == 'y') {
		if (cmwidth > 1609 && currentImg != 'lrg') {
			changeImages('searchCatLarge','lrg');
		}else if (cmwidth < 1610 && currentImg == 'sm'){
			changeImages('searchCatMedium','med');
		}
	}
});


//When the document loads, we determine which images to load (they are blank by default)
/*
$(document).ready(function(){
	
	if (shouldSwap == 'y'){
		cmwidth = $(window).width();
		if (cmwidth > 1620) {
			changeImages('searchCatLarge','lrg');
		}else if (cmwidth < 1100) {
			changeImages('searchCatSmall','sm');
		}else{
			changeImages('searchCatMedium','med');
		}
	}
	//$("#middle-results").show();
});
*/

//When a swatch is selected we change the item's image
function bundleSwatchChange(productView, imageDivString, itemPin, colsPerPage, protocol, seoPinURL) {			
	var itemNum = imageDivString.substring(8,imageDivString.length);
	setColorForProductPage(itemNum,productView);
	if( colsPerPage == 3){
		document.getElementById(imageDivString).src=(protocol + '//dimg.dillards.com/is/image/DillardsZoom/' + productView + '?$bundle$&crop=470,0,870,2040;');
	}else{
		document.getElementById(imageDivString).src=(protocol + '//dimg.dillards.com/is/image/DillardsZoom/' + productView +'?$'+currentSize+'$');
	}
	pinterestLink="http://pinterest.com/pin/create/button/?url="+protocol+"//www.dillards.com"+seoPinURL+"df="+productView+"&media="+protocol+"//dimg.dillards.com/is/image/DillardsZoom/"+productView+"?$searchCatLarge$&description=Available%20at%20Dillards.com";
	$("#"+itemPin).prop('href',pinterestLink);
	
}

//This function passes the selected swatch to the product page
function setColorForProductPage(itemNum,productView){
	var url = $("#productURL_" + itemNum).prop('href');
	if (url.indexOf("df") != -1){
		url = url.substring(url,url.indexOf("df") - 1);
	}
	var paramCharacter;
	if (url.indexOf("?") == -1){
		paramCharacter = "?";
	}else{
		paramCharacter = "&";
	}
	$("#productURL_" + itemNum).prop('href', url + paramCharacter + "df=" + productView);
}

