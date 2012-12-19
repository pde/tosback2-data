$(window).load(function () {
	$('.product-tile').each(function () {
		var desc = $('.description', this).html()
		if(desc != null && typeof desc != 'undefined' && desc != '') { 
		
		var distance = -4;
		var time = 250;
		var hideDelay = 0;
		var showDelay = 300;
    
		var hideDelayTimer = null, showDelayTimer = null;
		var beingShown = false, shown = false;
    
		
		var trigger = $(this);
		var popup;

    // set the mouseover and mouseout on both elements
    $('img', this).mouseover(function () {

   
    	var o = $(this).offset();
    	var direction = o.left > $('#main_content_wrapper').width() / 3 ? 'left' : 'right';
     	$('<div id="product-hover" class="hover-tile2 hover-tile-'+direction+'" ui-widget ui-widget-content ui-corner-all><div class="hover-wrap">'+desc+'</div><div class="ear-border"></div><div class="ear"></div></div>').appendTo('body');

// stops the hide event if we move from the trigger to the popup element
      if (hideDelayTimer) clearTimeout(hideDelayTimer);

      if (showDelayTimer) clearTimeout(showDelayTimer);
      showDelayTimer = setTimeout(function () {
      // don't trigger the animation again if we're being shown, or already visible
      if (beingShown || shown) {
        return;
      } else {
        beingShown = true;
        if(direction=='left'){
        $('#product-hover').css({
          left : o.left - 150 - distance + 'px',
          top : o.top - 3,
          display: 'block'
        });}else{
        	$('#product-hover').css({
              left : o.left + 100 + distance + 'px',
              top : o.top - 3,
              display: 'block'
            });
        }
        $('#product-hover').animate(
        		direction=='left'?{
        	left: '+=' + distance + 'px'
        }:{left: '-=' + distance + 'px'}, time, 'swing', function() {
          beingShown = false;
          shown = true;
        });
      }
      }, showDelay);
    }).mouseout(function () {
    	var direction = $(this).offset().left > $(document).width() / 3 ? 'left' : 'right';
      if (showDelayTimer) clearTimeout(showDelayTimer);
      if (hideDelayTimer) clearTimeout(hideDelayTimer);
      
      // store the timer so that it can be cleared in the mouseover if required
      hideDelayTimer = setTimeout(function () {
        hideDelayTimer = null;
        $('#product-hover').animate(direction=='left'?{
          left: '-=' + distance + 'px'
        }:{left:'+='+distance + 'px'}, time, 'swing', function () {
          shown = false;
          $('#product-hover').remove();
        });
      }, hideDelay);
    });
		}
  });
});