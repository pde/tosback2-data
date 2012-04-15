/**
 * tabinate() v1
 */
(function($) {

	var methods = {
		init : function(options) {
			return this
					.each(function() {
						var $obj = $(this), data = $obj.data('tabinate'), $tabNode, $tabUL;

						var tabSpecs = {
							tabNode : false,
							activeNode : false,
							noContent : false, 
							tabCallback: false
						};// tabSpecs: default options

						if (options)
							$.extend(tabSpecs, options); // polymorphic merge

						$obj.addClass('global-tabbed');
						$tabNode = $(tabSpecs.tabNode);

						if($tabNode.length == 0 ) {
							$tabNode = $(document.createElement('div'));
							$obj.prepend($tabNode);
						}
						
						$tabNode.addClass('global-tabs');
						$tabUL = $(document.createElement('ul'));
						$tabNode.html($tabUL);

						$obj.find(".tabbed").each(function(){
							var cssClass = $(this).attr("className").replace(/tabbed| |active/g,''); 
							var $btnSpan = $(document.createElement('span')).text($(this).attr("title"));
							var $btn = $(document.createElement('a')).html($btnSpan);
							var $li = $(document.createElement('li')).html($btn).addClass(cssClass);
							
							if($(this).is(".active")) $li.addClass('active');
							$tabUL.append($li);
							
							$btn.click(function(e){
								$chosenTab = $(this).parent(); 
								if(!$chosenTab.is(".active")) {
									var activeClass = $chosenTab.attr("className").replace(/tabbed| /g,''); 
									$obj.find(".active").removeClass("active");
									$tabNode.find(".active").removeClass("active");
									
									$obj.find("."+activeClass).addClass("active");
									$tabNode.find("."+activeClass).addClass("active");
									
									if(typeof tabSpecs.tabCallback == "function") tabSpecs.tabCallback($chosenTab, e);
								}
							});
						});
					});
		},

		/**
		 * Namespacing FTW: Clears data collection for specific instances
		 */
		destroy : function() {
			return this.each(function() {
				$(this).removeData('tabinate');
			});
		}
	};

	/**
	 * tabinate namespace: methods above
	 */
	$.fn.tabinate = function(method) {

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tabinate');
		}

	};

})(jQuery);
