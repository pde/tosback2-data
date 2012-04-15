var fadeOverlay = {};
$(document).ready(function(){
	fadeOverlay = {
		height : $(window).height()+'px',
		width :	$(window).width()+'px',
		color : '#000000',
		opacity : '0.9',
		altFadeIn : null,
		altFadeOut : null,
		ifadeIn : function(){
			var self = this;
			$('#fadeOverlay')
				.css({
					width:$(window).width()+'px',
					height:$(window).height()+'px',
					opacity:'0.0',
					display:'block'
				})
				.animate({opacity:'0.9'},200,
					function(){
						if(self.altFadeIn!=null && self.altFadeIn!='undefined') self.altFadeIn();
					}
				);
		},
		ifadeOut : function(){
			var self = this;
			if(self.altFadeOut!=null && self.altFadeOut!='undefined') self.altFadeOut();
			$('#fadeOverlay')
				.animate({opacity:'0.0'},200,
					function(){
						$('#fadeOverlay').css({display:'none'});
					}
				);
		},
		build :	function(){
			var self = this;
			$('<div>')
				.attr({id:'fadeOverlay'})
				.css({
					position:'absolute',
					top:'0px',
					left:'0px',
					zIndex:'6000',
					background:self.color,
					cursor:'pointer',
					display:'none'
				})
				.appendTo('body')
				.click(function(){
					self.ifadeOut();
				});
		},
		setColor : function(clr){
			var self = this;
			self.color = clr;
		},
		setOpacity : function(op){
			var self = this;
			self.opacity = op;
		},
		setScroll : function(){
			var self = this;
			$('#fadeOverlay').css({
				top:$(window).scrollTop()+'px'
			});
		},
		setSize : function(){
			var self = this;
			$('#fadeOverlay').css({
				width:$(window).width()+'px',
				height:$(window).height()+'px'
			});
		}
	}
	fadeOverlay.build();
	$(window).resize(function(){
		fadeOverlay.setSize();
	});
	$(window).scroll(function(){
		fadeOverlay.setScroll();
	});
});