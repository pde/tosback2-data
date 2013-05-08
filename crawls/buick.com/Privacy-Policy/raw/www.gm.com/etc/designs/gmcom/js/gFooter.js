$(document).ready( function(){
	//$( "div#auxiliaryNavigation" ).minWidth();

	$( 'div#auxiliaryNavigation ul li a' ).each( function(){
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			Cufon.replace( $( this ), { fontFamily: 'gotham-bold', hover: true });
		}

	});

	/* Dealer Locator 1 Result Only Fix */

	if ( $('#numberOfDealersFound') ) {
		var count = $('#numberOfDealersFound').html();
		if ( count == "1" ) {
			$('html.ie7 h2.dealerName').css({
				'width' : '100%',
				'top'   : '-20px'
			});
		}
	}

// set footer to page content bottom for subset of pages on ipad ver<5
// ipad ver<5 footer set to static position in giPad.css (ver 5+ inherits global fixed)(jason.campbell)

var locations=['aboutGM', 'article', 'toolbar', 'vision', 'article','vehicles', 'GM_Corporate_Officers', 'investors', 'historyAndHeritage']; //page groups that need the footer inserted after shadedContainer
var exclusions=['design_technology.html','environment1.html', 'designing_for_physically_challenged']; //sub-groups to exclude from locations groups
var inclusions=['article', 'corporate_citizenship', 'archive.display-']; //sub-groups of exclusions to include with locations

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
var includeID=['diversity', 'gm_foundation'];
for(i in includeID){
	if($('body').attr('id')===includeID[i] && $('body').hasClass('ver4')){
		target=true;
	}
}


var formPageId=['browseByBrand','browseByType'];
for(i in formPageId){
	if( ( $('body').attr('id') == formPageId[i] ) && $('body').hasClass('ver4') ){

		$("#auxiliaryNavigation").insertAfter($(".parbase.disclaimer"));
		$("#auxiliaryNavigation").css({position:'relative'})
		target=false;
	}
}

if($('body').hasClass('visionpage') && $('body').hasClass('ver4')){
	$("#auxiliaryNavigation").insertAfter($('#background img'));
	target=false;
}


$('body').hasClass('ver4')?target=target:target=false;



if( target==true){
    $("#auxiliaryNavigation").insertAfter($("#content>.shadedContainer"));
	$("#auxiliaryNavigation").css('position','relative !important');
}


	//	 alert(('#content').width());

//set header / footer width for fat pages
if($('body').hasClass('ipad')){
	if($('#content > .shadedContainer').width()>980){
		var scWidth=$('#content > .shadedContainer').width()+'px';
		$('#primaryNavigation').css({width:scWidth});
		$('#primaryNavigation > ul').css({width:scWidth});
	
		$('#auxiliaryNavigation').css('width',scWidth);
	}
	else{
		$('#primaryNavigation').css('width','980px');
		$('#primaryNavigation > ul').css('width','980px');
		$('#auxiliaryNavigation').css('width','980px');
	}
}
 //hide vignette / show iframes on investor pages
(function(){
	if(window.location.href.indexOf('/investors')>-1){
		$('#vignette').css('display','none');
		$('iframe').css('display','block');
	}
})()

		//$('body').css('border','1px #f00 solid');
		// setInterval(function(){alert($('#primaryNavigation').css('width'));},2000);
		//alert($('#auxiliaryNavigation').css('position'));
		//$('body').children().each(function(){console.log($(this).attr('id'));})
		//setTimeout(function(){alert($("#background img").css("width"));},2000);


		//$('#primaryNavigation').css({position:'absolute',top:0,left:0});
		// alert($('#auxiliaryNavigation').css('bottom'));
		//$("#background").css("display","none");
		// setInterval(function(){alert($('#bottomTabContainer').css('width'));},2000);

});

