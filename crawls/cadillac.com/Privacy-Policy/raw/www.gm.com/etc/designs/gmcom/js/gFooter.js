$(document).ready( function(){
	$( "div#auxiliaryNavigation" ).minWidth();

	$( 'div#auxiliaryNavigation ul li a' ).each( function(){
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			Cufon.replace( $( this ), { fontFamily: 'gotham-bold', hover: true });
		}

	});
	
// set footer to page content bottom for subset of pages on ipad ver<5
// ipad ver<5 footer set to static position in giPad.css (ver 5+ inherits global fixed)(jason.campbell)

var locations=['aboutGM', 'article', 'toolbar','vision', 'article']; //page groups that need the footer inserted after shadedContainer
var exclusions=['GM_Corporate_Officers', 'board_of_directors0', 'design_technology.html','environment1', 'community_education', 'contactUsForm','designing_for_physically_challenged']; //sub-groups to exclude from locations groups 
var inclusions=['daniel_f_akerson', 'daniel_akerson', 'article', 'corporate_citizenship', 'archive.display-']; //sub-groups of exclusions to include with locations 
var target=false;
var url=window.location.href;

for(i in locations){
	
	if(url.indexOf(locations[i])>-1){// if is present
		target=true;
		
		for(i in exclusions){
			if(url.indexOf(exclusions[i])>-1){
				target=false;
				
				for(i in inclusions){
					if(url.indexOf(inclusions[i])>-1){// if is present
							target=true;
					}
				}
			}
		}
	}
}

// override previous target value for certain body classes
var includeClass=['peoplepage_summary'];
for(i in includeClass){
	if($('body').hasClass(includeClass[i]) && $('body').hasClass('ver4')){
		target=true;
	}
}

var formPageId=['browseByBrand','browseByType'];
for(i in formPageId){
	if( ( $('body').attr('id') == formPageId[i] ) && $('body').hasClass('ver4') ){
		$("#auxiliaryNavigation").insertAfter($(".parbase.disclaimer"));
		target=false;
	}
}
if($('body').hasClass('ver4') && target==true){
    $("#auxiliaryNavigation").insertAfter($("#content>.shadedContainer"));
	$("#auxiliaryNavigation").css('position','relative');
}

 //hide vignette / show iframes on investor pages
(function(){
	if(window.location.href.indexOf('/investors')>-1){
		$('#vignette').css('display','none');
		$('iframe').css('display','block');
	}
		
})()
});


