/**
 * @license 
 * jQuery Tools 1.2.5 Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 *
 * Since: November 2008
 * Date:    Wed Sep 22 06:02:10 2010 +0000 
 */  
(function($) {
			
	// static constructs
	$.tools = $.tools || {version: '1.2.5'};
	
	$.tools.tabs = {
		
		conf: {
			tabs: 'a',
			current: 'current',
			onBeforeClick: null,
			onClick: null, 
			effect: 'fade',
			initialIndex: 0,			
			event: 'click',
			rotate: false,
			
			// 1.2
			history: false
		},
		
		addEffect: function(name, fn) {
			effects[name] = fn;
		}
		
	};
	
	var effects = {
		
		// simple "toggle" effect
		'default': function(i, done) { 
			this.getPanes().hide().eq(i).show();
			done.call();
		}, 
		
		/*
			configuration:
				- fadeOutSpeed (positive value does "crossfading")
				- fadeInSpeed
		*/
		fade: function(i, done) {		
			
			var conf = this.getConf(),            
				 speed = conf.fadeOutSpeed,
				 panes = this.getPanes();
			
			if (speed) {
				panes.fadeOut(speed);	
			} else {
				panes.hide();	
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);	
		},
		
		// for basic accordions
		slide: function(i, done) {
			this.getPanes().slideUp(200);
			this.getPanes().eq(i).slideDown(400, done);			 
		}, 

		/**
		 * AJAX effect
		 */
		ajax: function(i, done)  {			
			this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), function(){
				if($.browser.msie && $.browser.version < 9){
					$("div.tabcontent .topRound-right, div.tabcontent .bottomRound, div.tab-group .topRound-right, div.tab-group .bottomRound").remove();
					$("div.tab-group").prepend('<div class="topRound-right" style="top:-1px; right:-1px"></div>').append('<div class="bottomRound" style="left:-1px"><div style="right:-2px"></div></div>');
				}
				
				//// call back after .tabcontent is loaded
				if ($('.tabcontent .tooltips').length != 0 && jQuery.isFunction(jQuery().poshytip)){
					//alert('tips not loaded script exists function');
						
					$(".tabcontent .tooltips").focus(function(){
						$(this).mouseover();
					});
					$(".tabcontent .tooltips").blur(function(){
						$(this).mouseout();
					});		
					$(".tabcontent .tooltips").each(function(){
						
						var hrefTemp = jQuery(this).attr('href');
						var anchorIndexId = hrefTemp.indexOf("#");
						var aHref = hrefTemp.slice(anchorIndexId ,hrefTemp.length);
						
						$(this).poshytip({
							content: jQuery(aHref).html(),				  
							className: 'tip-white',
							showTimeout: 0.2,
							alignTo: 'target',
							alignX: 'center',
							offsetX: 10,
							allowTipHover: false,
							bgImageFrameSize: 6,
							backgroundGradient: '//www.att.com/images/global/tooltip/tip-white/backgroundwhite.gif',
							fade: true,
							slide: false
						});						  	
					});
					
				} else if ($('.tabcontent .tooltips').length != 0 && !jQuery.isFunction(jQuery().poshytip)) {
						//alert('loaded the tips script because poshytip function doesnt exist');
						$.getScript('/scripts/jquery.poshytip.js', function(){
							//callback function for tooltips getscript
							$(".tabcontent .tooltips").focus(function(){
								$(this).mouseover();
							});
							$(".tabcontent .tooltips").blur(function(){
								$(this).mouseout();
							});		
							$(".tabcontent .tooltips").each(function(){
								
								var hrefTemp = jQuery(this).attr('href');
								var anchorIndexId = hrefTemp.indexOf("#");
								var aHref = hrefTemp.slice(anchorIndexId ,hrefTemp.length);
								
								$(this).poshytip({
									content: jQuery(aHref).html(),				  
									className: 'tip-white',
									showTimeout: 0.2,
									alignTo: 'target',
									alignX: 'center',
									offsetX: 10,
									allowTipHover: false,
									bgImageFrameSize: 6,
									backgroundGradient: '//www.att.com/images/global/tooltip/tip-white/backgroundwhite.gif',
									//	showOn: 'focus', 
									fade: true,
									slide: false
								});						  	
							});
					
						}, true);
					
				}
				
				if($('.tabcontent .openModal, .tabcontent .modalHeader, .tabcontent .modalContent').length != 0 && !jQuery.isFunction(jQuery().colorbox)){
					$.getScript('/scripts/jquery.colorbox.js', $.fn.modals, false);
					//alert('getscript loaded colorbox because the modals do not exist yet.');
				} else if ($('.tabcontent .openModal, .tabcontent .modalHeader, .tabcontent .modalContent').length != 0 && jQuery.isFunction(jQuery().colorbox)){
					$.fn.modals();
					//alert('getscript colorbox not loaded modals already exist.');
				}
				
				if($('.tabcontent .styled_forms').length != 0 && !jQuery.isFunction(jQuery().uniform)){
					//alert('getscript loaded forms because function doesnt exist');
					$.getScript('/scripts/jquery.uniform.js', function(){
							$(".tabcontent .styled_forms input, .tabcontent .styled_forms textarea, .tabcontent .styled_forms select").uniform();
					}, true);
					
				} else if ($('.tabcontent .styled_forms').length != 0 && jQuery.isFunction(jQuery().uniform)){
					//alert('not loaded forms because function exists');
					$(".tabcontent .styled_forms input, .tabcontent .styled_forms textarea, .tabcontent .styled_forms select").uniform();
				}
				
				if($('.tabcontent #usmModule').length != 0){
					$.getScript('/scripts/jquery.usm.js', function(){
						
						//aditional callback after uniform loads
						
					}, true);
				}
				
				if($('.tabcontent .meterwrapper').length != 0) initMeters();
				if($('.tabcontent .stripe').length !=0) stripe();
				
				
			});	
							
		}		
	};   	
	
	var w;
	
	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	 */
	$.tools.tabs.addEffect("horizontal", function(i, done) {
	
		// store original width of a pane into memory
		if (!w) { w = this.getPanes().eq(0).width(); }
		
		// set current pane's width to zero
		this.getCurrentPane().animate({width: 0}, function() { $(this).hide(); });
		
		// grow opened pane to it's original width
		this.getPanes().eq(i).animate({width: w}, function() { 
			$(this).show();
			done.call();
		});
		
	});	

	
	function Tabs(root, paneSelector, conf) {
						
		var self = this, 
			 trigger = root.add(this),
			 tabs = root.find(conf.tabs),
			 panes = paneSelector.jquery ? paneSelector : root.children(paneSelector),			 
			 current;
			 
		
		// make sure tabs and panes are found
		if (!tabs.length)  { tabs = root.children(); }
		if (!panes.length) { panes = root.parent().find(paneSelector); }
		if (!panes.length) { panes = $(paneSelector); }
		
		
		// public methods
		$.extend(this, {				
			click: function(i, e) {
				
				var tab = tabs.eq(i);												 
				
				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}
								
				if (conf.rotate) {
					var last = tabs.length -1; 
					if (i < 0) { return self.click(last, e); }
					if (i > last) { return self.click(0, e); }						
				}
				
				if (!tab.length) {
					if (current >= 0) { return self; }
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}				
				
				// current tab is being clicked
				if (i === current) { return self; }
				
				// possibility to cancel click action				
				e = e || $.Event();
				e.type = "onBeforeClick";
				trigger.trigger(e, [i]);				
				if (e.isDefaultPrevented()) { return; }

				// call the effect
				effects[conf.effect].call(self, i, function() {

					// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [i]);					
				});			
				
				// default behaviour
				current = i;
				tabs.removeClass(conf.current);	
				tab.addClass(conf.current);				
				
				return self;
			},
			
			getConf: function() {
				return conf;	
			},

			getTabs: function() {
				return tabs;	
			},
			
			getPanes: function() {

				return panes;	
			},
			
			getCurrentPane: function() {
				return panes.eq(current);	
			},
			
			getCurrentTab: function() {
				return tabs.eq(current);	
			},
			
			getIndex: function() {
				return current;	
			}, 
			
			next: function() {
				return self.click(current + 1);
			},
			
			prev: function() {
				return self.click(current - 1);	
			},
			
			destroy: function() {
				tabs.unbind(conf.event).removeClass(conf.current);
				panes.find("a[href^=#]").unbind("click.T"); 
				return self;
			}
			
		
		});

		// callbacks	
		$.each("onBeforeClick,onClick".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) {
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;	
			};
		});
	
		
		if (conf.history && $.fn.history) {
			$.tools.history.init(tabs);
			conf.event = 'history';
		}	
		
		// setup click actions for each tab
		tabs.each(function(i) { 				
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});			
		});
		
		// cross tab anchor link
		panes.find("a[href^=#]").bind("click.T", function(e) {
			self.click($(this).attr("href"), e);		
		}); 
		
		// open initial tab
		var tabHash = location.hash.match(/#tab\w+/);
		if (tabHash == null) {
			tabHash = location.hash.match(/\?tab\w+/);
			if (tabHash != null) {
				tabHash[0] = tabHash[0].replace(/\?tab/, '#tab');
			}
		}
		if (tabHash && conf.tabs == "a" && root.find("[href=" + tabHash[0] + "]").length) {
			self.click(tabHash[0]);

			var setTabHeight = $('.tabs li, .ajaxtabs li').tallestSize();
			//alert(setTabHeight);
			if(setTabHeight > 38){
				if ($.browser.msie && $.browser.version < 9){
					$('.tabs li a, .ajaxtabs li a').css({'min-height':'50px'});
				}
				else{
					$('.tabs li a, .ajaxtabs li a').css({'min-height':'36px'});
				}
			}
			
			$('.tabs li, .ajaxtabs li').css({'min-height':setTabHeight});
			
		} else {
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
				var setTabHeight = $('.tabs li, .ajaxtabs li').tallestSize();
				//alert(setTabHeight);
				if(setTabHeight > 38){
					if ($.browser.msie && $.browser.version < 9){
						$('.tabs li a, .ajaxtabs li a').css({'min-height':'36px'});
					}
					else{
						$('.tabs li a, .ajaxtabs li a').css({'min-height':'16px'});
					}
				}
				$('.tabs li, .ajaxtabs li').css({'min-height':setTabHeight});
			}
		}
	}
	
	// jQuery plugin implementation
	$.fn.tabs = function(paneSelector, conf) {
		
		// return existing instance
		var el = this.data("tabs");
		if (el) { 
			el.destroy();	
			this.removeData("tabs");
		}

		if ($.isFunction(conf)) {
			conf = {onBeforeClick: conf};
		}
		
		// setup conf
		conf = $.extend({}, $.tools.tabs.conf, conf);		
		
		
		this.each(function() {				
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("tabs", el); 
		});		
		
		return conf.api ? el: this;		
	};
		
}) (jQuery); 


