RS.explorerModuleSetup = function(){
	$('.explorerModule').each(function(){		
		//Init
		$(this).find('input:checked') // will initialize the filter by setting all necessary properties and classes on the form 
			.parent().addClass('selected');
		var selectedFilter = $(this).find('input:checked').attr('id');
		$(this).attr('selectedFilter',selectedFilter);	
		var explorerUrl = $(this).attr('action');
		RS.explorerAjaxCall(1,$(this)); // 1 based index
		
		//Setup Click events
		$('.explorerFilter label').click(function(){
			var selectedFilter = $(this).attr('for');			
			var explorerModule = $(this).parents('.explorerModule');
			$(this).parent().parent()
				.find('.selected')
				.removeClass('selected');
			explorerModule.attr('selectedFilter',selectedFilter);
			//console.log('selectedFilter is after click '+explorerModule.attr('selectedFilter'));
			$(this).parent('div.type-check').addClass('selected');
			RS.explorerAjaxCall(1,explorerModule); // 1 based index
		});	
		
		$(this).find('.previousButton a').click(function(){											 
			var thisHref = $(this).attr('href');	
			var thisPos = $(this).attr('slide');
			RS.explorerAjaxCall(thisPos,$(this).parents('.explorerModule'));
			return false;
		});
		$(this).find('.nextButton a').click(function(){													 
			var thisHref = $(this).attr('href');	
			var thisPos = $(this).attr('slide');
			RS.explorerAjaxCall(thisPos,$(this).parents('.explorerModule'));
			
			$('.explorerModuleNavigation > .prevButton').attr('class', 'prevNextButtonNavigation darkVersion previousButton');
			return false;
		});
	});	
};
	
RS.populateExplorer = function(formElem,payload){
	//,positionIndex,previous,next,isFirst,isLast
	//var payload = eval(payload);
	var explorerModule = $(formElem);
	
	//explorerModule.find('.explorerContent').fadeOut(); // For added fancyness
	explorerModule.find('.explorerContent').html(payload.payloadhtml);
	//explorerModule.find('.explorerContent').fadeIn(); // For added fancyness
	if(payload.prevSlide!=null) explorerModule.find('.previousButton a').attr('href','?position='+payload.prevSlide+'&filterby='+payload.channel).attr('slide', payload.prevSlide);
	if(payload.nextSlide!=null) explorerModule.find('.nextButton a').attr('href','?position='+payload.nextSlide+'&filterby='+payload.channel).attr('slide', payload.nextSlide);
	explorerModule.find('.prevNextButtonNavigationPositionIndex').text(payload.positionIndex + '/' + payload.pageCount);

	//Showing and hiding the appropriate buttons
    explorerModule.find('.previousButton,.nextButton').show();

	explorerModule.find('.previousButton').removeClass('disabled');
	if (payload.isFirst != "undefined" && payload.isFirst){
		//explorerModule.find('.previousButton').hide();
		explorerModule.find('.previousButton').attr('class', 'prevNextButtonNavigation darkVersion prevButton disabled');
	}
	if (payload.isLast != "undefined" && payload.isLast){
		explorerModule.find('.nextButton').hide();
	} 
	
	explorerModule.find('.explorerModuleNavigation').show();

	$('.explorerContent li').mouseover(function() {
        $(this).addClass('mOver');
    }).mouseout(function(){
		$(this).removeClass('mOver');
	});	
};

RS.explorerAjaxCall = function(position,form){
	var selectedFilter = $(form).attr('selectedFilter');
	var explorerUrl = $(form).attr('action');

	if (typeof explorerUrl  == "undefined") explorerUrl = "/video/executeAjax";
	    	
    $.ajax({
        url: explorerUrl,
        data:  { 'filterby': selectedFilter, 'position':position },
        dataType: 'json',
        success:  function(data){
            //console.log(data);
            
            RS.populateExplorer(form,data);
        },
        error :  function(data){
            //console.log(data);
        }
    });
};

$(document).ready(function(){	
	RS.explorerModuleSetup();
});

