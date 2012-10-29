/* js file */

$(document).ready(function(){

	//$("#MainMenu .home-link a").attr("href", "/");
	//setTimeout(function(){$("#MainMenu .home-link a").attr("href", "/")});
	try{
		var noJS = $(document).find("div.no-js"),
			sessCookie = Target.controller.header.cookie.read('s_sess');			
		if((noJS != null || noJS != "") && sessCookie != null){
			$("div.no-js").hide();
			$("#overlay-curtain").hide();
		}
	}catch(e){}
	
	if( $('.hp_hz_slots-8').length !== 0 ) {
	
		$.lazy.prototype.loadForm = function() {			
			
			var curEvent, form, action, data,placements,lazyRR,posCurtain,closestTag,
				self = this;
			
			if(!self.formsQueue.length || self.loadInProgress) return;
			
			self.loadInProgress = true;
			
			curEvent	= self.formsQueue.shift();
			form 		= $(curEvent.target);
			action 		= form.attr('action');
			data 		= form.serialize();
			placements	= (self.options.placements !== undefined) ? self.options.placements : [];
			lazyRR		= (self.options.lazyRR !== undefined) ? true : false;
			posCurtain	= (self.options.posCurtain !== undefined) ? self.options.posCurtain : false;
			//loading		= ( form.find(".lazyload-curtain") !== undefined ) ? form.find(".lazyload-curtain") : false; 
						
			//if(loading) { loading.removeClass('hidden'); }
			
			$.ajax({
				url: action,
				data: data,
				dataType: 'html',
				cache: false,
				type: 'post',
				curtain: {
					selector: form,
					posCurtain:posCurtain
				},
				success: function(data) {
					
					/////////////////////////////////////
					if( placements.length > 0 ) { //applicable only for HomePage component lazy load
						var dom = $(data);
						dom.filter('script').each(function() {
							if( this.src && this.src !== "" ) {
								Target.util.loadScript({
									src: this.src,
									success: function(data) { }
								});
							}
						});
							
						dom.filter('script').each(function() {
							try {
								$.globalEval(this.src || this.text || this.textContent || this.innerHTML || '');
							} catch(e) {}
						});		
					
						$.each(placements, function(key, val) {
							if($(data).find(val).html()) {
								$(val).html($(data).find(val).html());
							}
						});
					} else {
						form.replaceWith(data);
					}
					
					//Accessibility Fix: To set the focus to the lazy container
					/**
					if(posCurtain) {
						if( placements.length > 0 ) {
							$(placements[placements.length-1]).focus();
						} else {
							self.wrapper.focus();
						}
					}
					*/
					
					//POC for focus Issue:
					//Accessibility Fix: To set the focus to the lazy container
					if(posCurtain) {
						
							if( placements.length > 0 ) {							
							//$(placements[placements.length-1]).find('h2:eq(0)').focus();
							var placementElem = $(placements[placements.length-1]);
								closestTag = placementElem.find('h2').eq(0);
							if( closestTag.length === 0 ) {
								closestTag = placementElem.find('a').eq(0);
							}
							closestTag.attr('tabindex','-1').focus();
						} else {
							closestTag = self.wrapper.find('h2').eq(0);
							if( closestTag.length === 0 ) {
								closestTag = self.wrapper.find('a').eq(0);
							}
							closestTag.attr('tabindex','-1').focus();
						}
					}
					
					if( lazyRR ) {
						// TODO: Needs to call the below code in the rr-ready method							
						if(typeof rr_recs !== "undefined") {
							self.rrCb();
						} else {
							setTimeout(function(){self.rrCb();},2000);
						}
					}
					////////////////////////////////////
					self.forms = self.wrapper.find('form.lazy-load').filter(function() {
						return !$(this).parents(self.exclude).length;
					});
					self.loadForm();
					self.configForms();
					self.loadInProgress = false;
					if(self.options.onComplete){
						self.options.onComplete();
					}					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.overlay.currentOverlay.trigger('close.overlay');
					console.log("Error in lazy load");
				}
			});				
		};
	}
	
	
	if(!Target.support.isTouch) {
		
		var extMenuControls = $.extend(true, Target.controller.header, {setMenuControls: function() {
		
			//alert("newly successfully updated");
			
			var timer = null,
			self = this,
			wait = 300,
			hoverSubTime = 50,
			Hovertimer = null,
			hoverTime = 100,
			subItm = null,
			shopMenu = $("#ShopMenu"),
			mainMenu = $("#MainMenu"),
			// Test if a device supports touch events. TODO move this to framework so it can be used like "Target.support.isTouch"
			isTouch = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? true : false,
			currentMenu = false,
			// Function to open a main nav submenu, expects the L1 <li> as context (this)
			openMenu = function () {
				var leftVal, rightVal;
				var curMenu = $(this);
				var leftVal = curMenu.position().left - 78,
					rightVal = leftVal + curMenu.innerWidth() + 78;						
				
				if($(".showMenu").length == 0) {
					//console.log("this is time out");
					Hovertimer = setTimeout(function(e){							
							curMenu.append('<div class="menuLiBase leftBase" style="top:27px;left:' + leftVal + 'px"></div>');
							curMenu.append('<div class="menuLiBase rightBase" style="top:27px;left:' + rightVal + 'px"></div>');
							curMenu.addClass("showMenu");					
						},hoverTime);
				
				} else {			
					$("#MainMenu").find(".showMenu").removeClass("showMenu");
					$("#MainMenu").find(".menuLiBase").remove();
					curMenu.append('<div class="menuLiBase leftBase" style="top:27px;left:' + leftVal + 'px"></div>');
					curMenu.append('<div class="menuLiBase rightBase" style="top:27px;left:' + rightVal + 'px"></div>');
					curMenu.addClass("showMenu");				
				}
				
				$('li.last12 ul').addClass('lastNoBorder');
				$('.hover div.opnCont').find(':lt(3) ul:last-child').addClass('lastNoBorder');
				currentMenu = this;				
				
			},
			// Function to close man nav submenu, expects the L1 <li> as context (this)
			closeMenu = function () {
				$(this).removeClass("showMenu");
				mainMenu.find(".menuLiBase").remove();
				currentMenu = false;
			};
			
			mainMenu.undelegate("li.leftmenu, li.rightmenu", "mouseover mouseout");
			
			mainMenu.delegate("li.leftmenu, li.rightmenu", "mouseenter", function () {
				//console.log("mouseover");
				clearTimeout(timer);
				//clearTimeout(Hovertimer);
                openMenu.call(this);
            });
            mainMenu.delegate("li.leftmenu, li.rightmenu", "mouseleave", function () {
                MenuItem = $(this);
				//console.log("mouseout");
				clearTimeout(Hovertimer);
                timer = setTimeout(function () {
                    MenuItem.removeClass("showMenu");
                    closeMenu.call(this);
                }, wait);
            });

            //For Mini Cart

            shopMenu.delegate("li", "mouseenter", function () {
                subItm = $(this);
                timer = setTimeout(function () {
                    subItm.addClass("showSubMenu");
                }, hoverSubTime);
            });
            shopMenu.delegate("li", "mouseleave", function () {
				subItm = $(this);
                clearTimeout(timer);
                subItm.removeClass("showSubMenu");
            });			
			
		}});		
		Target.controller.header.setMenuControls();	
	}	

	var $body		= $('body'),
		ishubPage	= $('#Other_Cmas_102812_HEROCON_C');
	
	if($body.hasClass("components-testnewLayout")){
	
		$body.removeClass("components-testnewLayout");
		$body.addClass("components-test");
		$body.addClass("newLayout");
		
	}
	
	if(!$body.hasClass("home-underlay") && !$body.hasClass("checkout") && (ishubPage.length === 0)) {
		$body.addClass('holidayhub');
	} else if ($body.hasClass("home-underlay")) {
		
		if(typeof gomez !== "undefined" && gomez.pgId == "Home Page") {
			/**
			$('head').append('<link rel="stylesheet" type="text/css" href="//static.targetimg1.com/2012/holidaystyleguide/css/holiday_style_2012_static_minified.css" />');
			$('head').append('<link rel="stylesheet" type="text/css" href="//static.targetimg1.com/2012/holidaystyleguide/css/holiday_style_2012_logo_minified.css" />');
			Target.util.loadScript({
				src: '//static.targetimg1.com/2012/holidaystyleguide/js/holiday_bootstrap_logo_minified.js', 
				delayLoad: true,
				cache : true
			});
			*/	
		} else {
			$body.addClass('holidayhub');
		}
	}
});
