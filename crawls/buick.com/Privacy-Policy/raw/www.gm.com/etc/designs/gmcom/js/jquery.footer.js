//You need an anonymous function to wrap around your function to avoid conflict  
(function($){
	$.fn.extend({

		time        : null,
		eleWidth    : 0,
		windowWidth : 0,

		minWidth: function() {

			return this.each(function() {
				$wraper = $( this );
				$wraper.thisResize( false );
				$wraper.timer = setTimeout( 
					function(){
						$wraper.thisResize( true );
					},
					100
				);
				$( window ).resize( function() {
					$wraper.thisResize( false );
				});
			});
		},

		thisResize: function( timeout ){
			$this = this;
			$this.windowWidth = $( window ).width();
			$this.eleWidth = 0;
			$this.children( 'ul' ).each( function(){
				$elementWraper = $( this );
				$this.eleWidth = $this.eleWidth + parseInt( $elementWraper.css( 'marginLeft' )) + parseInt( $elementWraper.css( 'marginRight' ));
				$elementWraper.children( 'li' ).each( function(){
					$element = $( this );
					if( !$element.hasClass( 'last' ) && $element.index() > 0 || $element.index() == 0 ){
						$this.eleWidth = $this.eleWidth + $element.outerWidth( true );
					} else {
						return false;
					}
				});
			});
			if( $this.windowWidth > $this.eleWidth + 20 ){
				$this.css({ width: '100%' });
			} else {
				$this.css({ width: $this.eleWidth + 20 + 'px' });
			}
			if( timeout ){
				$wraper.timer = setTimeout( 
					function(){
						$wraper.thisResize( true );
					},
					100
				);
			}
		}
	});
})(jQuery);

/*CSS Browser Selector v0.7.0 (Feb 08, 2012)*/
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('firefox/4')?g+' ff4':is('firefox/5')?g+' ff5':is('firefox/6')?g+' ff6':is('firefox/7')?g+' ff7':is('firefox/8')?g+' ff8':is('firefox/9')?g+' ff9':is('firefox/10')?g+' ff10':is('firefox/11')?g+' ff11':is('firefox/12')?g+' ff12':is('firefox/13')?g+' ff13':is('ff/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
/****************/ 
