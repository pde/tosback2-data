$(document).ready(function() { 
       
    $('.summaryTab').click(function() {
	var tabIndex = $('.summaryTab').index(this) + 1;
	$('.summarySection').hide();
	$('.summarySection').eq(tabIndex).show();
	
	$('.onSub').css('background','#fff');
	$('.onSub').css('color','#005fbf');
	$('.onSub').eq(tabIndex).css('background','url(/templates/pchprivacy/images/highlight-arrow.png)');
	$('.onSub').eq(tabIndex).css('color','#fff');
    });
    
    $('.summaryLink').click(function() {
	var tabIndex = $('.summaryLink').index(this) + 1;
	$('.summarySection').hide();
	$('.summarySection').eq(tabIndex).show();
	
	$('.onSub').css('background','#fff');
	$('.onSub').css('color','#005fbf');
	$('.onSub').eq(tabIndex).css('background','url(/templates/pchprivacy/images/highlight-arrow.png)');
	$('.onSub').eq(tabIndex).css('color','#fff');
    });
    
    $('.onSub').click(function() {
	var tabIndex = $('.onSub').index(this);
	$('.summarySection').hide();
	$('.summarySection').eq(tabIndex).show();
	
	$('.onSub').css('background','#fff');
	$('.onSub').css('color','#005fbf');
	$('.onSub').eq(tabIndex).css('background','url(/templates/pchprivacy/images/highlight-arrow.png)');
	$('.onSub').eq(tabIndex).css('color','#fff');
    });
    
    $('.moreLink').click(function() {
	$('#summaryFull').toggle();
	$('#moreLink').toggle();
    });

    
});