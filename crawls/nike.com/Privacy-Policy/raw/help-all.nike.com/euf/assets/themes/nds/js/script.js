/* Author:
	Josh McKenney, Swift Collective
*/

$(document).ready(function() {
	if ( $(".gridBoxes").length > 0 && ($.browser.msie && Number($.browser.version) <= 8) )  {
		// different for different breakpoints... 
		if ($(window).width() < 1306) {
			$('.gridBoxes>div:nth-child(odd)').css('padding-right','10px');
			$('.gridBoxes>div:nth-child(even)').css('padding-left','10px');
		}
	}

	if ($(window).width() > 1305 && ($.browser.msie && Number($.browser.version) <= 8)) {
		$('.pageForm.desktopTwoColumn>div:nth-child(even)').css({'text-align':'right','float':'right'});
		// Where two columns goes to 3 columns on landing page. Complex nth level resets and sets... 
		$('.gridBoxes>div:nth-child(3n+1)').attr('style', 'padding:0 14px 0 0 !important');
		$('.gridBoxes>div:nth-child(3n+2)').attr('style', 'padding:0 7px !important');
		$('.gridBoxes>div:nth-child(3n+3)').attr('style', 'padding:0 0 0 14px !important');
	}
	// TODO, different nth-child for different break points. 

	equalHeightFun();

	$(window).resize(function() {

		$('.equalHeights').each(function(){
			var tallest = 0;
			$(this).children().each(function(i){
				$(this).css({'height': 'auto'}).find('.roundBg').css('height', 'auto');
			});
		});
		equalHeightFun();

	});

	// In case these options change, only need to change them here. 
	$('.pageForm.insertCountries').html('\
		<select id="sizesCountry" name="sizesCountry" class="sizesCountry">\
			<option value="sizesUS">UNITED STATES</option>\
			<option value="sizesAustria">AUSTRIA</option>\
			<option value="sizesBelgium">BELGIUM</option>\
			<option value="sizesCN">CHINA</option>\
			<option value="sizesCzech">CZECH REPUBLIC</option>\
			<option value="sizesDenmark">DENMARK</option>\
			<option value="sizesFinland">FINLAND</option>\
			<option value="sizesFrance">FRANCE</option>\
			<option value="sizesGermany">GERMANY</option>\
			<option value="sizesGreece">GREECE</option>\
			<option value="sizesHungary">HUNGARY</option>\
			<option value="sizesIreland">IRELAND</option>\
			<option value="sizesItaly">ITALY</option>\
			<option value="sizesLuxembourg">LUXEMBOURG</option>\
			<option value="sizesNetherlands">NETHERLANDS</option>\
			<option value="sizesPoland">POLAND</option>\
			<option value="sizesPortugal">PORTUGAL</option>\
			<option value="sizesSlovenia">SLOVENIA</option>\
			<option value="sizesSpain">SPAIN</option>\
			<option value="sizesSweden">SWEDEN</option>\
			<option value="sizesUK">UK</option>\
		</select>\
	');

	$(".pageForm input, .pageForm textarea, .pageForm select").uniform();

	// Load modal on click
	// First unbind whatever Nike is doing...
	// console.log($('.rnChatOnline').data('events'));
	$('.rnChatOnline').off();
	$('.rnChatOnline').parent().off();
	$('.rnChatOnline').click(function (e) {
		$('.modalContent.onlineChat').modal({
			overlayClose:true,
			//minHeight: 890,
			autoResize: true,
			maxWidth: 414,
			opacity: 70,
			position: [50],
			containerCss: {'position':'absolute'},
			onShow: function(dlg) {
				$('#simplemodal-container').css('height','auto');
				return false;
			}
		});
		return false;
	});

	/*
	$('.rnCmUnit, .rnInUnit').mousedown(function (e) {
		if($(this).attr("class") == 'rnCmUnit') {
			$('.sizeChart .in').fadeOut('fast',function(){
				$('.sizeChart .cm').fadeIn();
			});
		} else {
			$('.sizeChart .cm').fadeOut('fast',function(){
				$('.sizeChart .in').fadeIn();
			});
		}
		setToggleActive($(this).parent());
	});
	// convert all in to cm
	if( $('.sizesMostlyNotInches').length > 0 || $('.sizesMostlyInches').length > 0 ) {
		var convertThese = $('.sizesMostlyInches .doNotConvert, .sizesMostlyNotInches .convert');
		convertThese.each(function(){
			var tdContent = $(this).text();
			var fractionArray = tdContent.split(' ');
			var converted = 0
			for (var i = 0; i < fractionArray.length; i++) {
				var arrayPart = fractionArray[i];
				if (arrayPart.indexOf("'") != -1) {
					// remove foot mark and convert to inches.
					arrayPart = arrayPart.replace("'","");
					arrayPart = arrayPart * 12;
				}
				if (arrayPart.indexOf("\"") != -1) {
					// remove inches mark.
					arrayPart = arrayPart.replace("\"","");
				}
				converted = converted + eval(arrayPart);
			}
			$(this).wrapInner('<span class="in">');
			var convertedText = converted * 2.54;
			var convertedText = convertedText.toFixed(1);
			$(this).append('<span class="cm">'+convertedText+'</span>');
		});
	}
	*/
	
	$('input.rn_SearchField').focus(function(){
		var txtval = $('input.rn_SearchField').val();
		if(txtval == 'SEARCH HELP'){ $(this).val('');}
		$(this).css({'font-family' : 'Helvetica,Arial,sans-serif', 'color' : '#222222'});
	});
	
	$('input.rn_SearchField').blur(function(){
		var txtval = $('input.rn_SearchField').val();
		if(txtval == ''){ $(this).val('SEARCH HELP');}
		$(this).css({'font-family' : '"TradeGothicW01-BoldCn20 675337", sans-serif', 'color' : '#999999'});
	});
	
	/*
	$('#rn_ProductCategoryInput_7_Button_Visible_Text').toggle(function() {
		$(this).css({'border-bottom' : '0px', 'background-color' : '#dddddd'});
	}, function() {
		$(this).css({'border-bottom' : '1px', 'background-color' : 'transparent'});
	});
	*/

	$("#rn_ProductCategoryInput_7").on("click", "span", function(event){
		if ($(this).css('background-color') == 'transparent') {
			$(this).css({'border-bottom' : '0px', 'background-color' : '#dddddd'});
		} else {
			$(this).css({'border-bottom' : '1px', 'background-color' : 'transparent'});
		}
	});
});

function equalHeightFun()
{
	$('.equalHeights').each(function(){
		var tallest = 0;
		$(this).children().each(function(i){
			if (tallest < $(this).height()) { tallest = $(this).height(); }
		});
		$(this).children().css({'height': tallest}).find('.roundBg').css('height', tallest);
	});
}

/* 
	Wait until load as jquery ready doesn't account for typeface loads which greatly affect the below manipulated areas. 
*/
$(window).load(function () {
    
	setTimeout(function(){
		$('.nav-section a[href="#"]').attr('href', "javascript:void(0)");
	},500);
	
	if ( $("#headSubNavContainer").length > 0 ) {
		// Position the on hover/active oval/arrow below active nav.
		// Get the first list item info. 
		var firstItem = $('#headSubNavContainer li a.active').css('color','white').parent();
		// Get the width and height
		var firstItemWidth = firstItem.outerWidth();
		// Get the position
		var firstItemPosition = firstItem.position();
		// Set width and position
		$('#headSubNavContainer .activeArrows').css({'left': firstItemPosition.left, 'width': firstItemWidth}).show();

		// Change the hover/active on hover/touch
		$('#headSubNavContainer li').hover(
			function () {
				var $this = $(this);
				// Get the width and height
				var firstItemWidth = $this.outerWidth();
				// Get the position
				var firstItemPosition = $this.position();
				$('#headSubNavContainer li a').removeClass('active').css('color', '#666666');
				$this.find('a').addClass('active').css('color', '#ffffff');
				$('#headSubNavContainer .activeArrows').css({'left': firstItemPosition.left, 'width': firstItemWidth});
			},
			function () {
				$('#headSubNavContainer li a').removeClass('active').css('color', '#666666');
				firstItem.find('a').addClass('active').css('color', '#ffffff');
				$('#headSubNavContainer .activeArrows').css({'left': firstItemPosition.left, 'width': firstItemWidth});
			}
		);

		// And again for the tertiary navigation 
		var firstItemTert = $('#headSubNavTertiaryContainer li a.active').parent();
		// Get the width and height
		var firstItemTertWidth = firstItemTert.outerWidth();
		// Get the position
		var firstItemTertPosition = firstItemTert.position();
		// Set width and position
		$('#headSubNavTertiaryContainer .activeArrows').css({'left': firstItemTertPosition.left, 'width': firstItemTertWidth}).show();

		$('#headSubNavTertiaryContainer li').hover(
			function () {
				var $this = $(this);
				// Get the width and height
				var firstItemWidth = $this.outerWidth();
				// Get the position
				var firstItemPosition = $this.position();
				$('#headSubNavTertiaryContainer li a').removeClass('active');
				$this.find('a').addClass('active');
				$('#headSubNavTertiaryContainer .activeArrows').css({'left': firstItemPosition.left, 'width': firstItemWidth});
			},
			function () {
				$('#headSubNavTertiaryContainer li a').removeClass('active');
				firstItemTert.find('a').addClass('active');
				$('#headSubNavTertiaryContainer .activeArrows').css({'left': firstItemTertPosition.left, 'width': firstItemTertWidth});
			}
		);
	}
});
