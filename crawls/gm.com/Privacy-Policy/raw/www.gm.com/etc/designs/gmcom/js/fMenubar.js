
$('document').ready(function(){

	var brandOptions = $('.brandOptions');
	var selectedBrand = brandOptions.find('option[selected]').text().length > 0 ? brandOptions.find('option[selected]') : brandOptions.find('option:eq(0)' );
	var options = $('option', brandOptions);
	var count = 0;
	var inc = 0;
	var brandFeedArr = [];
	
	// places brand descriptions inside of contentOne into an array and removes unseen nodes
	//var brandContent = $('.brandContent ul li').toArray();
	//$('.brandContent ul li').remove();
	
	
	$('.brandContent').remove();
		

	
	//places all feeds into a 2d array
	brandFeedArr.push($('.gmFeed li'),$('.chevroletFeed li'),$('.buickFeed li'),$('.gmcFeed li'),$('.cadillacFeed li'));
	$('.brandFeed ul li').remove();
	
	//places brand feeds inside of contentTwo into an array and removes unseen nodes
	var brandFeeds = $('.brandFeed').toArray();
	$('.feedWrapper li:first').nextAll().remove();
	$('.brandFeed ul').append( $( brandFeedArr[inc][count] ).clone() );
	//Add cufon here
	if( typeof( Cufon ) == 'function' && Cufon.replace ){
		//Cufon.refresh();
		$('div.slideHolder .gotham-bold-dynamic:visible').each(function() {
			if ( !$(this).attr('cufid') ) {
				Cufon.replace(this, {
			fontFamily: 'gotham-bold',
			hover: true
		});
	}
		});
	}
	// dynamically creates buttons and drop down selections
	$('.chooseBrand').append('<a class="brandTarget" href="#">--SELECT--</a>');
	/*
	$('.menuHolder').prepend('<ul class="brandDropOptions" />');
	options.each( function( i, val){
		//This will prevent the brand feed items from displaying on the home page menu bar
		var href = $( brandContent[i] ).find( 'a' ).length > 0 ? $( brandContent[i] ).find( 'a' ).attr( 'href' ) : '#';
		$('.brandDropOptions').append('<li><a href="' + href + '">' + $(this).text() + '</a></li>');
	});
	*/
	
	// calls drop down menu when brand button is clicked
	$('.brandTarget').live('click',function(){

		if(navigator.platform=="iPad" && $('.menuHolder').css('display')=='block'){
			$('.menuHolder').hide();
			return;
		}


		$( '.menuHolder ul.brandDropOptions li' ).each( function(){
			$( this ).show();
			if( $( this ).find( 'a' ).text() == $( 'a.brandTarget' ).text() || ( $( this ).find( 'a' ).text() == 'GENERAL MOTORS' && $( 'a.brandTarget' ).text() == '--SELECT--' )){
				$( this ).hide();
			}
		});
		$('.menuHolder').show();


	});

	// click function for drop down menu links
	/* this is commented out to prevent this code from displaying the brand feed items on the home page menu bar.
	$('.brandDropOptions li a').live('click',function(){
		var text = $(this).html();
		var firstContent = $('.brandContent ul li:first');
		var firstFeed = $('.feedWrapper li:first');
		var brandArray = $('.brandOptions option').toArray();

		$('.brandTarget').html(text);
		if($(options[0]).text() === $('.brandTarget').text()){
			inc = 0;
		}else if($(options[1]).text() === $('.brandTarget').text()){
			inc = 1;
		}else if($(options[2]).text() === $('.brandTarget').text()){
			inc = 2;
		}else if($(options[3]).text() === $('.brandTarget').text()){
			inc = 3;
		}else if($(options[4]).text() === $('.brandTarget').text()){
			inc = 4;
		}
		if($('.brandTarget').html() == $(brandArray[inc]).html() && $(brandContent[inc]).html() != firstContent.html()){
			$('.brandContent ul').append(brandContent[inc]);
			$('.feedWrapper').append(brandFeeds[inc]);
			firstContent.remove();
			firstFeed.remove();
			$('.contentSlideNo').find('.slideNoActive').removeClass('slideNoActive');
			$('.brandFeed ul li').remove();
			count = 0;
			$('.brandFeed ul').append(brandFeedArr[inc][count]);
			$('.brandFeed ul li:first').css('opacity','1');
		}
		$('.menuHolder').hide();
		// adds a corresponding #href for each feed
		if($('.contentSlideNo').html() === ''){
			for(var i = 1; i <= $(brandFeedArr[inc]).length; i++){
				$('.contentSlideNo').append('<a id="slideNo'+i+'" href="#">' + i + '</a>');
			}
		}
		if(!$('.contentSlideNo a').hasClass('slideNoActive')){
			$('.contentSlideNo a:first').addClass('slideNoActive');
		}
		$('.slideHolder ul li:first').nextAll().detach();
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			//Cufon.refresh();
			$('div.slideHolder .gotham-bold-dynamic:visible').each(function() {
				if ( !$(this).attr('cufid') ) {
					Cufon.replace(this, {
						fontFamily: 'gotham-bold',
						hover: true
					});
				}
			});
		}
	});
	*/

	// fades drop down menu if mouse leaves area
	$('.menuHolder').live('mouseleave',function(){
		$('.menuHolder').hide();
		
	});
	
	// controls hover states for css made buttons
	$('.learnMoreBtn, .feedBtn').live('mouseenter',function(){
		$(this).find('span').removeClass('altLinkColor');
	}).live('mouseleave',function(){
		$(this).find('span').addClass('altLinkColor');
	});
	
	// controls left arrow button that slides feed content
	$('.slideLeft').live('click',function(){
		if($('.contentSlideNo a:first-child').hasClass( 'slideNoActive' )){
			$( '.contentSlideNo a:last-child' ).trigger( 'click' );
		}else{
			$('a.slideNoActive').prev().trigger( 'click' );
		}
	});
	
	// controls right arrow button that slides feed content
	$('.slideRight').live('click',function(event){
		if($('.contentSlideNo a:last-child').hasClass( 'slideNoActive' )){
			$( '.contentSlideNo a:first-child' ).trigger( 'click' );
		}else{
			$('a.slideNoActive').next().trigger( 'click' );
		}
	});
	var id;
	// controls numbers links for feed content slides
	$('.contentSlideNo a').live('click',function(){
		if( $( this ).is( '.slideNoActive' )) return false;
	
		id = $(this).attr("id").toString().split("slideNo")[1];
		if(id=='1'){count=0;}
		if(id=='2'){count=1;}
		if(id=='3'){count=2;}
		if(id=='4'){count=3;}
		if(id=='5'){count=4;}
		/*if($(this).text() == '1' && count !== 0 && $(feedArr[0]) !== null){
			count = 0;
		}else if($(this).text() == '2' && count != 1 && $(feedArr[1]) !== null){
			count = 1;
		}else if($(this).text() == '3' && count != 2 && $(feedArr[2]) !== null){
			count = 2;
		}else if($(this).text() == '4' && count != 3 && $(feedArr[3]) !== null){
			count = 3;
		}else if($(this).text() == '5' && count != 4 && $(feedArr[4]) !== null){
			count = 4;
		}*/
		$(brandFeedArr[inc][count]).clone().appendTo($('.slideHolder ul'));
		//Add cufon here
		if( typeof( Cufon ) == 'function' && Cufon.replace ){
			//Cufon.refresh();
			$('div.slideHolder .gotham-bold-dynamic:visible').each(function() {
				if ( !$(this).attr('cufid') ) {
					Cufon.replace(this, {
				fontFamily: 'gotham-bold',
				hover: true
			});
		}
			});
		}
		$('a[class="slideNoActive"]').removeClass('slideNoActive');
		$(this).addClass('slideNoActive');
		if($('.slideHolder ul li').length >= 2){
			$('.slideHolder ul li:last').css('opacity','0');
			$('.slideHolder ul li:first').animate({opacity:0}, 500 );
			$('.slideHolder ul li:last').animate({opacity:1}, 500 );
			$('.slideHolder ul').animate({marginLeft:'-=' + $('.slideHolder ul li:first').width() + 'px'}, 500, function(){
				$(this).animate({marginLeft:'+=' + $('.slideHolder ul li:last').width() + 'px'}, 0, function(){
					$('.slideHolder ul li:first').remove();
				});
			});	
		}
		//add cufon to the numbers
		//gothamMedium( '.contentSlideNo.gotham-medium-dynamic:visible' );
	});

	// adds a corresponding #href for each feed
	for(var i = 1; i <= $(brandFeedArr[inc]).length; i++){
		$('.contentSlideNo').append('<a id="slideNo'+i+'" href="#">' + i + '</a>');
	}
	$('.contentSlideNo a:first').addClass('slideNoActive');
	//add cufon to the numbers
	//gothamMedium( '.contentSlideNo.gotham-medium-dynamic:visible', true );
	
	// creates contentless divs before and after menu
	var menuWidth = $('.menuContentWrapper').width();
	$('.menuBarWrapper').prepend('<div class="menuBarFill" />').append('<div class="menuBarFill" />');
	$('.menuBarFill').css({
		'width':(($(window).width() - menuWidth) / 2)
	});
	
	// recalculates menuBarFill widths on window resize
	function menuBarHorizontal(){
		$('.menuBarFill').css({
			'width': Math.max( 0, $( window ).width() - menuWidth ) / 2 
		});
	}
	$(window).resize(function(){
		menuBarHorizontal();
	});

	//positions menuBarverticaly
	function menuBarVertical(){
		var windowHeight = $( window ).height(),
			$menuBar = $( 'div.menuBarWrapper' ),
			menuBarHeight = $menuBar.outerHeight();
		$menuBar.css({ top: ( windowHeight - menuBarHeight ) / 2 });
	}
	$( window ).resize( function(){
		menuBarVertical();
	});

	//timer to position menubar
	function menubarTimeFunction(){
		var menuBarTimer = setTimeout( 
			function(){
				menuBarHorizontal();
				menuBarVertical();
				menubarTimeFunction();
			},
			100
		);
	}
	menubarTimeFunction();
});