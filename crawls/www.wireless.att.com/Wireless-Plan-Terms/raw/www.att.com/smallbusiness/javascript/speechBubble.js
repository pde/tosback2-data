// Initialize.
function init_tooltip() {
 
	// Does element exist?
	if (!$('.tooltip').length) {
	// If not, exit.
		return;
	}
	
	// Insert tool tip (hidden).
	$('body').append('<div id="tooltip_outer"><div id="tooltip_inner_top"></div><div id="tooltip_inner"><p></p></div><div id="tooltip_inner_bottom"></div></div>');
	
	// Empty variables.
	var $tt_title, $tt_alt;
	var $tt = $('#tooltip_outer');
	var $tt_i = $('#tooltip_inner');
	
	var $tt_x, tt_y;
	// Watch for hover.
	$('.tooltip').hover(function() {
		// Store title, empty it.
		if ($(this).attr('title')) {
		$tt_title = $(this).attr('title');
		$(this).attr('title', '');
		}
		
		// Store alt, empty it.
		if ($(this).attr('alt')) {
		$tt_alt = $(this).attr('alt');
		$(this).attr('alt', '');
		}
		
		// Insert text.
		$('p',$tt_i).html($tt_title);
		
		// Tool tip coordinates calculated here while text is inserted - **IE Browsers were getting a 0 value for height when it was calculated in other parts of the function thus throwing off the 'top' value of the speechbubble**
		$tt_x = $tt.outerWidth();
		$tt_y = $tt.outerHeight();
		
		// Show tool tip.
		$tt.show();
	},
	function() {
	// Hide tool tip.
	$tt.hide();
	// Empty text.
	$('p',$tt_i).html('');
	// Fix title.
	if ($tt_title) {
	$(this).attr('title', $tt_title);
	}
	// Fix alt.
	if ($tt_alt) {
	$(this).attr('alt', $tt_alt);
	}
	// Watch for movement.
	}).mousemove(function(ev) {
		// Event coordinates.
		var $ev_x = ev.pageX;
		var $ev_y = ev.pageY;
		
		// Body coordinates.
		//	var $bd_x = $('body').outerWidth();
		//	var $bd_y = $('body').outerHeight();
		
		// Move tool tip.
		$tt.css({
		'top': ($ev_y-$tt_y) - 3+"px",
		'left':$ev_x-($tt_x/2)+"px"
		
		//Previous Tool Tip location calculation
		//'top': $ev_y + $tt_y > $bd_y ? $ev_y - $tt_y : $ev_y-5-$tt_y,
		//'left': $ev_x + $tt_x + 20 > $bd_x ? $ev_x - $tt_x - 10 : $ev_x - $tt_x/2
		});
	});
}
