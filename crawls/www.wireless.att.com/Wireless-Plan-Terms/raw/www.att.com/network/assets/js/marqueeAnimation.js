function MarqueeSlideshow($element){
	this.element = $element;
	this.nDur = 700;
	this.nDelay = 3500;
	this.aSlides = this.element.children(".animationSlide");
	this.nCurr = 0;

	// 
	this.init = function(){
		//this.element.css({"display":"block"});
		this.nCurr = 0;

		if(this.slideInterval) clearInterval(this.slideInterval);
		jQuery(this.aSlides[0]).stop();
		jQuery(this.aSlides[1]).stop();
		jQuery(this.aSlides[2]).stop();

		jQuery(this.aSlides[0]).css("z-index", 2);
		jQuery(this.aSlides[1]).css("z-index", 1);
		jQuery(this.aSlides[2]).css("z-index", 0);

		jQuery(this.aSlides[0]).css("opacity", 1);
		jQuery(this.aSlides[1]).css("opacity", 1);
		jQuery(this.aSlides[2]).css("opacity", 1);

		this.slideInterval = setInterval(this.showSlide.bind(this), this.nDelay);
	}
	

	// 
	this.showSlide = function(){
		var slide = jQuery(this.aSlides[this.nCurr]);
		slide.css("z-index",2);

		if(this.nCurr == this.aSlides.length-1)
		{
			//clearInterval(this.slideInterval);
			this.nCurr = 0;
			
			jQuery(this.aSlides[0]).css("z-index", 1);
			jQuery(this.aSlides[0]).css("opacity", 1);
			jQuery(this.aSlides[1]).css("z-index", 0);
			jQuery(this.aSlides[1]).css("opacity", 1);

			slide.animate({"opacity": 0}, this.nDur, "", function(){
			jQuery(this).css("z-index", -1);
			jQuery(this).css("opacity", 1);
			});
		}
		else
		{
			slide.animate({"opacity": 0}, this.nDur);
			this.nCurr++;
		}
	}

	// 
	this.reorder = function(){
		
	}
}

var Intro = {
	init: function(){
		jQuery("#homeBtn").hide();
		jQuery("#prevBumper").hide();
		jQuery("#nextBumper").hide();
		jQuery(window).load( function(){
			setTimeout(this.animate.bind(this), 20);	
		}.bind(this));
		// this.animate();
	},
	animate: function(){
		setTimeout(function(){ jQuery("#intro1").animate({"opacity": 0}); }.bind(this), 1000);
		setTimeout(function(){ jQuery("#intro3").animate({"left": 170}, 400, "easeOutSine", function(){ jQuery("#intro3").css({"background-position":"0px 0px"}) }).animate({"left": 200}, 2000, "linear", function(){ jQuery("#intro3").css({"background-position":"0px -440px"}) }).animate({"left": 2500}, 300, "easeInSine"); }.bind(this), 1700);
		setTimeout(function(){ jQuery("#intro4").animate({"left": 185}, 430, "easeOutSine", function(){ jQuery("#intro4").css({"background-position":"0px 0px"}) }).animate({"left": 210}, 1900, "linear", function(){ jQuery("#intro4").css({"background-position":"0px -66px"}) }).animate({"left": 2500}, 300, "easeInSine").animate({"delay":0}, 300, "", this.resolve.bind(this)); }.bind(this), 4000)
		
	},
	resolve: function($event){
		this.cancel();
		homeSlideshow.init();
	},
	cancel: function(){
		jQuery("#introTakeover").remove();
		jQuery("#homeBtn").show();
		jQuery("#prevBumper").show();
		jQuery("#nextBumper").show();
	}
};

jQuery(document).ready(function(){
	//Intro.init();
	//document.getElementById("introTakeover").appendChild(Intro.wrapper);
	Intro.resolve();
	
});