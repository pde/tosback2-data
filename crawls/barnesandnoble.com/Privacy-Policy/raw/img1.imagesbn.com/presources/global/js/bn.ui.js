/**
 * @file bn.ui.js
 * @author Filipe Araujo
 *
 * @version 1.6
 *
 * @history	1.0	added selectmenu
 *			1.1	added expander, tweaked selectmenu
 *			1.2	added placeholder
 *			1.3	added expander-progressive & progressive loader
 *			1.4	renamed expander to expose, does more stuff, lots more!
 *			1.5 popup  && swap added
 *			1.6 syncState added to expose
 *
 * @TODO	selectMenu : optimize to delegate instead of "li" binding
 * @TODO	selectMenu : depreciate 1.2.5 select trigger
 */

if(typeof window.BN === 'undefined') {
	window.BN = {};
}


/*
 * @namespace	BN
 */
BN.ui = BN.ui || {};

/**
 * Expose UI Widget
 * @class expose
 */
BN.ui.expose = (function($) {
	var
		/**
		 * search for role that matches "ui:expose" and convert each result into a new Expose
		 * @method init
		 * @param {Object} e event
		 * @private
		 */
		init = function(e) {
			$.each($('[data-bn-role="ui:expose"]',(e && e.data) ? e.data.context : null).filter(function() {
				return !$(this).data('role');
			}),Expose);
		},

		/**
		 * @constructor
		 * @method Expose
		 * @private
		 * @return {Object} expose api
		 */
		Expose = function() {
			var

				/**
				 * storing object for expose widget, jquery dom object
				 * @private
				 * @property $expose
				 * @type Object
				 */
				$expose = $(this),
			
				/**
				 * storing object for defaults
				 * @private
				 * @property defaults
				 * @type Object
				 */
				defaults = {
					allow: 'toggle',
					close : 'click',
					open : 'click',
					target : $expose.next()
				},

				/**
				 * storing object for options, automatically declares $expose next element
				 * as the default target
				 * @private
				 * @property options
				 * @type Object
				 */
				options = {},

				/**
				 * storing object for expose target, jquery dom object
				 * @private
				 * @property $target
				 * @type Object
				 */
				$target,

				/**
				 * set variables and binds events to $expose and $target
				 * @method buildExpose
				 * @private
				 */
				buildExpose = function() {
					$.extend(options,defaults,new Function('return ' + $expose.attr('data-bn-options'))());
					$target = (typeof options.target === 'object') ? options.target : $('[data-bn-name="' + options.target + '"]');

					$expose.data('role',{
						component: 'ui',
						type: 'expose'
					});

					if(options.handleText && options.handleText[0] === null){
						options.handleText[0] = $expose.html();
					}

					if(!$target.data('role')) {
						$target.data('role',{component: 'ui', type: 'expose'});
					}

//					BN.debug.group('BN components : ui:expose', [$expose,$expose.data('role')]);

					buildInteraction();
					syncStates();
				},

				/**
				 * build event interaction
				 * @method buildInteraction
				 * @private
				 */
				buildInteraction = function(){
					var key;

					if(options.open === options.close){
						return $expose.bind(options.open, checkState);
					}
					if(typeof options.close === 'object'){
						for(key in options.close){
							if(key === 'target'){
								$target.bind(options.close[key],collapse);
							}
						}
					}
					else {
						$expose.bind(options.close, collapse);
					}
					$expose.bind(options.open, expose);
				},

				/**
				 * triggers both open and close, but the method will filter out the incorrect state
				 * @method checkState
				 * @private
				 */
				checkState = function(e) {
					collapse();
					expose();
					return false;
				},

				/**
				 * checks whether the $target is currently visible and collapses it, also removes an
				 * active class from $expose
				 * @method collapse
				 * @private
				 */
				collapse = function(e) {
					
					/* webkit bug with jquery and inputs */
					if (e && e.originalEvent.relatedTarget && e.originalEvent.relatedTarget !== document && !e.originalEvent.relatedTarget.parentNode){
						return false;
					}

					if(!$target.is(':visible') || options.allow === 'open'){
						return false;
					}

					if(options.fx === 'fade'){
						$target.fadeOut('fast');
					}
					else {
						$target.slideUp();
					}


					if(options.handleText){
						$expose.html(options.handleText[0]);
					}

					$target.triggerHandler('onClose.BN.events');
					$expose.removeClass('active');
					return false;

				},

				/**
				 * checks whether the $target is currently hidden; if hidden it checks for an
				 * intercepting data value on $target and defer responsibility
				 * otherwise it shows $targer, also adds an active class to $expose
				 * @method expose
				 * @private
				 */
				expose = function() {
					if($target.is(':visible') || options.allow === 'close'){
						return false;
					}
					
					if($target.data('beforeLoad') === true){
						$expose.addClass('active');
						return $target.show().data('beforeLoad',false).triggerHandler('beforeLoad');
					}

					if(options.fx === 'fade'){
						$target.fadeIn('fast');
					}
					else {
						$target.slideDown(400);
					}

					if(options.handleText){
						$expose.html(options.handleText[1]);
					}
					
					$target.triggerHandler('onOpen.BN.events');
					$expose.addClass('active');
					return false;
				},

				/**
				 * looks against the $expose and $target to see whether an ".active"
				 * class is applied, if it is then it will sync the other side to
				 * its status
				 * @method syncStates
				 * @private
				 */
				syncStates = function(){
					if($expose.is('.active') && $target.is(':hidden')){
						setTimeout(function(){
							expose();
						}, 500);
					}

					if($target.is('.active') && $expose.is(':hidden')){
						$expose.addClass('active');
					}
				};


			buildExpose();

			/**
			 * @scope BN.ui.expose.Expose
			 */
			return {};
		};

	$(window).bind('loaded.BN.events.site',init);

	/**
	 * @scope BN.ui.expose
	 */
	return {
		/**
		 * @method
		 * @public
		 */
		init: init
	};
}(jQuery));


/**
 * Placeholder UI Widget
 * @class placeholder
 */
BN.ui.placeholder = (function($) {
	var

		/**
		 * search for role that match ui:placeholder and convert each result into a new Placeholder
		 * @method init
		 * @param {Object} e event
		 * @private
		 */
		init = function(e) {
			$.each($('[data-bn-role="ui:placeholder"], [data-bn-role="ui-placeholder"]',(e && e.data) ? e.data.context : null).filter(function() {
				return !$(this).data('role');
			}),Placeholder);
		},

		/**
		 * @constructor
		 * @method Placeholder
		 * @private
		 * @return {Object} placeholder api
		 */
		Placeholder = function() {
			var

				/**
				 * storing object for placeholder, jquery dom object
				 * @private
				 * @property $placeholder
				 * @type Object
				 */
				$placeholder = $(this),

				/**
				 * storing object for $placeholder's placeholder attribute
				 * @private
				 * @property attr
				 * @type String
				 */
				attr = $placeholder.attr('placeholder'),
			
				/**
				 * storing object for element that removes existing text
				 * @private
				 * @property $eraser
				 * @type Object
				 */
				$eraser,

				/**
				 * boolean for determining whether the $eraser exists
				 * @private
				 * @property $eraser
				 * @type Object
				 */
				eraser = false,


				/**
				 * storing object for defaults
				 * @private
				 * @property defaults
				 * @type Object
				 */
				defaults = {},

				/**
				 * storing object for options
				 * @private
				 * @property options
				 * @type Object
				 */
				options = {},

				/**
				 * set variables and binds events to $placeholder
				 * @method buildPlaceholder
				 * @private
				 */
				buildPlaceholder = function() {
					$.extend(options,defaults,new Function('return ' + $placeholder.attr('data-bn-options'))());
					$placeholder.data('role',{ component: 'ui', type: 'placeholder'})
						.bind('focus blur keyup',checkValue);

					 $eraser = $('<span/>',{
						'class' : 'ui-placeholder-eraser',
						click : removeEraser
					});

					checkValue();

//					BN.debug.group('BN components : ui:placeholder', [$placeholder,$placeholder.data('role')]);
				},
				setPlaceholderValue = function(e){
					var value = $placeholder.val(); 
					if((value !== attr || value.length <=0) && !eraser){
					 	setValue();
					} 
				},
				/**
				 * check existing input value and direct its to appropriate method
				 * @method checkValue
				 * @private
				 */
				checkValue = function(e){
					var value = $placeholder.val();

					if(value.length > 0 && value !== attr && !eraser){
						setEraser(e);
					}
					if((value === attr || value.length <=0) && eraser){
						removeEraser();
					}
					if(value === attr && e && e.type === 'focus') {
						removeValue(e);
						removeClass(e);
					}

					if(value.length<=0 && e && e.type === 'blur') {
						setValue(e);
						setClass(e);
					}
				},

				/**
				 * removes the erasing functionality from the $placeholder
				 * @method setEraser
				 * @private
				 */
				removeEraser = function(e) {
					$eraser.hide();
					eraser = !eraser;
					removeValue(e);
				},

				/**
				 * enables the erasing functionality for the $placeholder
				 * @method setEraser
				 * @private
				 */
				setEraser = function(e) {
					$eraser.insertAfter($placeholder).show();
					eraser = !eraser;
				},

				/**
				 * removes class from the input box
				 * @method removeClass
				 * @private
				 */
				removeClass = function(e) {
					$placeholder.removeClass('placeholder');
				},

				/**
				 * add class to the input box
				 * @method setClass
				 * @private
				 */
				setClass = function(e) {
					$placeholder.addClass('placeholder');
				},
				/**
				 * removes the value from the input box
				 * @method removeValue
				 * @private
				 */
				removeValue = function(e) {
					$placeholder.val('');

					if(e && e.type === 'click'){
						$placeholder.trigger('focus');
					}
				},

				/**
				 * sets the value to the input box
				 * @method setValue
				 * @private
				 */
				setValue = function(e) {
					$placeholder.val(attr);
				};

			setPlaceholderValue();
			buildPlaceholder();

			/**
			 * @scope BN.ui.placeholder.Placeholder
			 */
			return {};
		};

	$(window).bind('loaded.BN.events.navigation',{'context': '#bn-global-header'},init)
		.bind('loaded.BN.events.site',init);

	/**
	 * @scope BN.ui.placeholder
	 */
	return {
		/**
		 * @method init
		 * @public
		 */
		init: init
	};
}(jQuery));

/**
 * PopUp UI Widget
 * @class popup
 */
BN.ui.popup = (function($) {
	var

		/**
		 * search for role that match ui:popup and convert each result into a new Popup
		 * @method init
		 * @param {Object} e event
		 * @private
		 */
		init = function(e) {
			$.each($('[data-bn-role="ui:popup"]',(e && e.data) ? e.data.context : null).filter(function() {
				return !$(this).data('role');
			}),Popup);
		},

		/**
		 * @constructor
		 * @method Popup
		 * @private
		 * @return {Object} popup api
		 */
		Popup = function() {
			var

				/**
				 * storing object for popup, jquery dom object
				 * @private
				 * @property $popup
				 * @type Object
				 */
				$popup = $(this),

				/**
				 * storing object for options
				 * @private
				 * @property $options
				 * @type Object
				 */
				options,

				/**
				 * set variables and binds events to $popup
				 * @method buildPopup
				 * @private
				 */
				buildPopup = function() {
					options = new Function('return ' + $popup.attr('data-bn-options'))();

					$popup.data('role',{
						component: 'ui',
						type: 'popup'
					}).bind('click', function(){
						BN.utils.winOpen(options.url, options, options.name);
						return false;
					});

//					BN.debug.group('BN components : ui:popup', [$popup,$popup.data('role')]);
				};

			buildPopup();

			/**
			 * @scope BN.ui.popup.Popup
			 */
			return {};
		};

	$(window).bind('loaded.BN.events.site',init);

	/**
	 * @scope BN.ui.popup
	 */
	return {
		/**
		 * @method init
		 * @public
		 */
		init: init
	};
}(jQuery));


/**
 * Selectmenu UI Widget
 * @class selectMenu
 */
BN.ui.selectMenu = (function($) {
	var
		/**
		 * search for role that match ui:selectmenu and convert each result into a new Selectmenu
		 * @method init
		 * @param {Object} e event
		 * @private
		 */
		init = function(e) {
			$.each($('[data-bn-role="ui:selectmenu"], [data-bn-role="ui-selectmenu"]',(e && e.data) ? e.data.context : null).filter(function() {
				return !$(this).data('role');
			}),SelectMenu);
		},

		/**
		 * @constructor
		 * @method SelectMenu
		 * @private
		 * @return {Object} selectmenu api
		 */
		SelectMenu = function() {
			var
				/**
				 * storing object for original select, jquery dom object
				 * @private
				 * @property $select
				 * @type Object
				 */
				$select = $(this),

				/**
				 * storing object for selectmenu, jquery dom object
				 * @private
				 * @property $menu
				 * @type Object
				 */
				$menu,

				/**
				 * set variables, creates markup and binds events to $selectmenu and each item
				 * @method buildPlaceholder
				 * @private
				 */
				buildMenu = function() {
					var $option,
						$item,
						offset = $select.position();

					$menu = $('<ul class="ui-selectmenu">').bind('mouseleave',function() {
						if($menu.hasClass('ui-selectmenu-open')) {
							setTimeout(function() {
								$menu.find('[data-bn-role="ui:selectmenu:selected"]').triggerHandler('click');
							},200);
						}
					});

					$.each($select.find('option'),function(i,val) {
						$item = $(val);
						$option = createOption($item);

						if($item.attr('selected')) {
							$menu.prepend(createSelected($option));
							$option.addClass('ui-selectmenu-hidden').attr('data-bn-role','ui:selectmenu:hidden');
						}

						$menu.append($option);
					});

					$menu.css({
					//	left: offset.left,
						top: offset.top
					}).insertAfter($select);

					$select.css({ 'visibility': 'hidden' })
						.data('role',{ component: 'ui', type: 'selectmenu' })
						.bind('open.BN.events.ui.selectmenu',openMenu)
						.bind('select.BN.events.ui.selectmenu',setSelect);


//					BN.debug.group('BN components : ui:select', [$select,$select.data('role')]);
				},

				/**
				 * creates a option from an existing select item
				 * @method createOption
				 * @private
				 * @param {Object} $item select option
				 * @return {Object} $li The select option transformed into a list item
				 */
				createOption = function($item) {
					var $li = $('<li>').html($item.html())
						.bind('click',function() {
							if($().jquery >= '1.2.5') {
								$select
									.triggerHandler('select.BN.events.ui.selectmenu',{
									$option: $item,
									$li: $(this)
								});
							}
							else {
								$select.triggerHandler({
									type: 'select.BN.events.ui.selectmenu',
									$option: $item,
									$li: $(this)
								});
							}
						})
						.hover(function() {
							$(this).addClass('ui-selectmenu-hover');
						},function() {
							$(this).removeClass('ui-selectmenu-hover');
						});

					return $li;
				},

				/**
				 * creates selected item from select options
				 * @method createSelected
				 * @private
				 * @param {Object} $option select option
				 * @return {Object} $li The selected option transformed into a list item
				 */
				createSelected = function($option) {
					return $option.clone().addClass('ui-selectmenu-selected')
						.attr('data-bn-role','ui:selectmenu:selected')
						.bind('click',function() {
							$select.triggerHandler('open.BN.events.ui.selectmenu');
						});
				},

				/**
				 * opens the selectmenu
				 * @method openMenu
				 * @private
				 * @param {Object} e event
				 */
				openMenu = function(e) {
					$menu.addClass('ui-selectmenu-open').find('[data-bn-role="ui:selectmenu:selected"]').remove().end()
						.find('[data-bn-role="ui:selectmenu:hidden"]')
						.attr({
							'class': 'ui-selectmenu-selected',
							'data-bn-role': 'ui:selectmenu:selected'
						});
				},

				/**
				 * sets the selected item and updates hidden select
				 * @method setSelect
				 * @private
				 * @param {Object} e event
				 * @param {Object} eventdata jquery 1.2.5 event object
				 */
				setSelect = function(e,eventdata) {
					var $option = ($().jquery >= '1.2.5') ? eventdata.$option : e.$option,
						$li = ($().jquery >= '1.2.5') ? eventdata.$li : e.$li;

					$select.val($option.val());
					$menu.removeClass('ui-selectmenu-open')
						.find('[data-bn-role="ui:selectmenu:selected"]')
						.removeClass('ui-selectmenu-selected').removeAttr('data-bn-role').end()
						.prepend(createSelected(createOption($option).clone()));
					$li.attr({
						'class': 'ui-selectmenu-hidden',
						'data-bn-role': 'ui:selectmenu:hidden'
					});
				};

			buildMenu();

			/**
			 * @scope BN.ui.selectmenu.Selectmenu
			 */
			return {};
		};

	$(window).bind('loaded.BN.events.navigation',{'context': '#bn-global-header'},init)
		.bind('loaded.BN.events.site',init);

	/**
	 * @scope BN.ui.selectMenu
	 */
	return {
		/**
		 * @method init
		 * @public
		 */
		init: init
	};
}(jQuery));


/**
 * Swap UI Widget
 * @class swap
 */
BN.ui.swap = (function($) {
	var

		/**
		 * search for role that match ui:swap and convert each result into a new More
		 * @method init
		 * @param {Object} e event
		 * @private
		 */
		init = function(e) {
			$.each($('[data-bn-role="ui:swap"]',(e && e.data) ? e.data.context : null).filter(function() {
				return !$(this).data('role');
			}),Swap);
		},

		/**
		 * @constructor
		 * @method More
		 * @private
		 * @return {Object} swap api
		 */
		Swap = function() {
			var
				/**
				 * storing object for defaults
				 * @private
				 * @property defaults
				 * @type Object
				 */
				defaults = {
					handleText : ['more','less']
				},

				/**
				 * storing object for $swap handle, jquery dom object
				 * @private
				 * @property $handle
				 * @type Object
				 */
				$handle,

				/**
				 * storing object for defaults
				 * @private
				 * @property defaults
				 * @type Object
				 */
				options = {},

				/**
				 * storing object for $swap, jquery dom object
				 * @private
				 * @property $swap
				 * @type Object
				 */
				$swap = $(this),

				/**
				 * storing object for target swap item, jquery dom object
				 * @private
				 * @property swapper
				 * @type Object
				 */
				swapper = {},

				/**
				 * storing object for original $swap item, jquery dom object
				 * @private
				 * @property swappee
				 * @type Object
				 */
				swappee = {},

				/**
				 * boolean checking whether short text has been swapped with full
				 * @private
				 * @property modified
				 * @type Object
				 */
				swapped = false,

				/**
				 * set variables and binds events to $swap
				 * @method buildMore
				 * @private
				 */
				buildSwap = function() {
					var anchor,
						$who = $swap.find('[data-bn-role="ui:swap-who"]'),
						$with = $swap.find('[data-bn-role="ui:swap-with"]');

					$.extend(options,defaults,new Function('return ' + $swap.attr('data-bn-options'))());

					swappee = {
						$el : $who,
						height : $who.height(),
						html : $who.html(),
						handleText : options.handleText[0]
					};

					swapper = {
						$el : $with,
						html : $with.html(),
						handleText : options.handleText[1]
					};
					
					$swap.data('role',{
						component: 'ui',
						type: 'swap'
					});

					$handle = $swap.find('[data-bn-role="ui:swap-handle"]')
						.bind('click', swap);

					anchor = $handle.attr('href');

					if(anchor && anchor.match(/#\w+/)){
						swappee.anchor = anchor;
					}

					calcSwapper();

					if(options.type === 'text'){
						if(swapper.height < swappee.height + parseFloat($who.css('font-size'))){
							swapAndDisable();
						}
					}
					
//					BN.debug.group('BN components : ui:swap', [$swap,$swap.data('role')]);
				},
			

				/**
				 * create an element with height of 0 and inject a copy of swapper into it,
				 * then stores the height value and removes it from the dom
				 * @method calcSwapper
				 * @private
				 */
				calcSwapper = function(){
					var $clone = swapper.$el.clone(),
						$temp  = $('<div/>').css({height : 0, clear:'both'}).append($clone);
					$temp.insertBefore(swapper.$el);
					swapper.height = $clone.show().height();
					$temp.remove();
				},

				/**
				 * swap the $swappee with the $with
				 * @method swap
				 * @private
				 */
				swap = function(){
					var $with = (swapped) ? swappee : swapper;
					swappee.$el.animate({
						height: $with.height
					}).html($with.html);
					$handle.html($with.handleText).toggleClass('active');
					swapped = !swapped;

					if($with.anchor){
						return true;
					}
					return false;
				},

				/**
				 * swap with $with and disable $swap
				 * @method swap
				 * @private
				 */
				swapAndDisable = function(){
					swappee.$el.html(swapper.html);
					$handle.hide();
				};

			buildSwap();

			/**
			 * @scope BN.ui.swap.Swap
			 */
			return {};
		};

	$(window).bind('loaded.BN.events.site',init);

	/**
	 * @scope BN.ui.swap
	 */
	return {
		/**
		 * @method init
		 * @public
		 */
		init: init
	};
}(jQuery));


(function($){
	$(function(){
		$(window).trigger('loaded.BN.events.site');
	});
})(jQuery);