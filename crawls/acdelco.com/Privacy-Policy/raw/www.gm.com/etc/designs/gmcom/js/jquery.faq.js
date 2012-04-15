(function($){

	$.fn.extend({

		//pass the options variable to the function
		faqToggle: function(options) {
		
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
			}

			var options =  $.extend(defaults, options);
 
			return this.each(function() {
				var $this = $( this ),
					$ul = $this.find( 'ul' ),
					$a = $ul.children( 'a.minus' ),
					$faqQ = $ul.children( '.faqQ' ),
					$faqA = $ul.children( '.faqA' );
				if( $ul.is( '.qaBox' )){
					//fix the width
					$ul.css({ width: 600 });
					//the html starts everything in the open state toggle it to the close state
					$faqA.slideToggle( 0, function(){
						//control the background of the boxes
						$this.removeClass( 'expandBoxOpen' ).hover(
							function(){
								$this.removeClass( 'expandBoxOpen' ).addClass( 'expandBoxHover' );
							},
							function(){
								$this.removeClass( 'expandBoxHover' );
								if( $a.is( '.minus' )){
									$this.addClass( 'expandBoxOpen' );
								}
							}
						);
						//control the plus or minus
						$a.removeClass( 'minus' ).addClass( 'plus' ).parents( 'div.faqquestion:eq(0)' ).find( 'li.faqQ' ).click( function(){
							$faqA.slideToggle( function(){
								if( $a.is( '.plus' )){
									
	// hold footer at bottom of ipad ver<5 screen unless faq toggles push it below bottom (jason.campbell)
	$a.data('h',$ul.parent().innerHeight()-53);

									$a.removeClass( 'plus' ).addClass( 'minus' );
									//if all are open change the expand text to collapse
									var flag = true;
									$( 'div.faqquestion ul a' ).each( function(){
										if( $( this ).is( '.plus' )) flag = false;

									});
									if( flag ) $( 'a.expAll' ).text( 'Collapse All -' );
								} else if( $a.is( '.minus' )){
									$a.removeClass( 'minus' ).addClass( 'plus' );
									$( 'a.expAll' ).text( 'Expand All +' );

								}

	// hold footer at bottom of ipad ver<5 screen unless faq toggles push it below bottom (jason.campbell)
	if($('body').hasClass('ver4') && $('div.faqquestion').length>0 && Math.abs(window.orientation)!=90)
		shiftFooter($a.attr('class'),$a.data('h'));

							});
							return false;
						});
						$a.click( function(){ 
							$( this ).siblings( 'li.faqQ' ).trigger( 'click' );

							return false;
						});
					});
				}
			});
		}
	});
	
	// hold footer at bottom of ipad ver<5 screen unless faq toggles push it below bottom
	// #auxiliaryNavigation moved to after #content > #shadedContainer in gFooter.js
	// ipad ver<5 footer set to static position in giPad.css (ver 5+ inherits global fixed)(jason.campbell)
	var initMargin;
	$(document).ready(function(){
		initMargin=parseInt($("div.shadedContainer").css("marginBottom"));
	});
	function shiftFooter(classname,val){
		classname=='plus'?initMargin=initMargin+val:initMargin=initMargin-val;
	
		initMargin<0?setMar=0:setMar=initMargin;
		setMar=setMar+'px';
		$('div.shadedContainer').css('marginBottom',setMar);
	}


})(jQuery);
