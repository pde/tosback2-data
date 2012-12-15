/* brand logo lockup (like investors home bottom) */
/**
 * @author jason.campbell
**/
(function($){
			
	$.fn.extend({

		brandLockup: function( options ) {
			
			var defaults = {
				bgColor			:		'#0C0F14',
				hoverColor	:		'#1c1f23',
				borders			:		true,
				itemWidth		:		140
			}

			var options =  $.extend( defaults, options );
	
			$.globals={
			};

			return this.each( function(index) {
				$this=$(this);
				
				var itemParent=$this.children('ul');
				var itemAnchors=itemParent.find('a');
				var logoLength=itemParent.find('li').length;

				itemAnchors.css('height','97px');
	
				itemAnchors.mouseup(function(){$(this).blur();});
			
				$bgColor=options.bgColor;
				$hoverColor=options.hoverColor;
				
				itemParent.find('li').each(function(index){
					
					!options.borders?
						bg=$bgColor
					:
					index==0?
						bg='url(/etc/designs/gmcom/images/gInvestors/brandLockUp-left.png) no-repeat '+$bgColor+''
					:
					index==(logoLength-1)?
						bg='url(/etc/designs/gmcom/images/gInvestors/brandLockUp-right.png) -1px 0 no-repeat '+$bgColor+''
					:
						bg='url(/etc/designs/gmcom/images/gInvestors/brandLockUp-center.png) 0 0 no-repeat '+$bgColor+'';
					
					$(this).css({
						width:options.itemWidth,
						height:'99px',
						border:'none',
						background:bg
					});
					
					$this.css({width:options.itemWidth*(index+1)});
					
					$(this).hover(function(){
						$(this).css('backgroundColor', $hoverColor);
					},
					function(){
						$(this).css('backgroundColor',$bgColor);
					});
					
				});
				
			});
		}
	});
})(jQuery);

$(document).ready(function(){
	$('body#investors .subsection_image_link_container:nth-child(2)').brandLockup({});
	$('body.contentpagetwocolumn .brandLogoLockUp_container').brandLockup({});
});