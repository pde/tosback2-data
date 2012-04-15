$.fn.jTooltip = function(options){
	var defaults = {
		speed: 200,
		delay: 300
	};
	
	var options = $.extend(defaults, options);
	
	getTip = function() {
		var tTip = 
			//"<div class='tip'></div>";
			"<div class='tip'></div>";
		return tTip;
	}
	$("body").prepend(getTip());
	
	$(this).each(function(){
		var $this = $( this ),
			$tipContent = $this.hide().html(),
			$tip = $( '.tip' ),
			offset = $( this ).offset(),
			tLeft = offset.left,
			tTop = offset.top,
			tWidth = $this.width(),
			tHeight = $this.height();
		
		$this.parent().append(' <span class="tTipAnchor"></span>');
		
		$this.parent().find('span.tTipAnchor').hover(function(e){
			$( this ).addClass( 'tTipAnchorHover' );
			$tip.html( $tipContent );
			setTip(e.pageY, e.pageX);
			setTimer();
		}, function(e){
			$(this).removeClass('tTipAnchorHover');
			stopTimer();
			setTimer();
		});
		
		$tip.hover( 
			function(){
				stopTimer();
			},
			function(){
				stopTimer();
				setTimer();
			}
		);
		
		setTimer = function() {
			$this.showTipTimer = setTimeout(
				function(){
					showTip();
				},
				options.delay
			);
		}
		
		stopTimer = function() {
			clearTimeout($this.showTipTimer);
		}
		
		setTip = function(top, left){
			var xTip = (left + 10);
			if ((xTip + $tip.outerWidth()) >= $(window).width())
				xTip = left - $tip.outerWidth();
			if (xTip < 0) xTip = 10;
			
			var yTip = (top - 30);
			if ((yTip + $tip.outerHeight()) >= $(window).height())
				yTip = top - $tip.outerHeight();
			if (yTip < 0) yTip = 10;
			
			$tip.css({'top' : yTip + 'px', 'left' : xTip + 'px'});
		}
		
		showTip = function(){
			stopTimer();
			$tip.animate({"opacity": "toggle"}, options.speed);
		}
	});
};