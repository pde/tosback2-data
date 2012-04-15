HEARST.init = function() {
	
	// NORMALIZE STYLES
	// Load safari.css if agent is webkit, but not chrome
	var agent = navigator.userAgent.toLowerCase(),
		webkit = /webkit/.test(agent),
		chrome = /chrome/.test(agent);

	if (webkit && !chrome) {
		$('head').append('<link href="/cm/marieclaire/assets/styles/safari.css" rel="stylesheet" />');
	}

	// MODULES
	function initModules() {
		// Default CSS selectors for collapse and/or tabbed module elements.
		var	collapseModule = '.module',
			collapseModuleHeaders = collapseModule + ' .cbc>h5',
			tabbedModule = '.tabbed.module>.cbs>.cbc>.content',
			tabClass = '.tab',
			tabs = [tabbedModule, tabClass].join(' '),
			defaultTabs = tabs + ':first-child',
			defaultCollapsed = '.module.closed .cbc>h5';

		// Collapse modules CLICK event
		$(collapseModuleHeaders).click( function(){
			$(this).siblings('.content').slideToggle();
			$(this).parent().toggleClass('closed');
		});

		// Tabbed modules CLICK event
		$(tabs).click(
			function() {
				var activeTab = '.' + $(this).text().toLowerCase().replace(/ /g,"_"),
					allContent = $(this).siblings('ul').children(),
					activeContent = $(this).siblings('ul').children(activeTab);
				$(this).siblings(tabClass).removeClass('click');
				$(this).addClass('click');
				allContent.hide();
				activeContent.show();
			}
		);
		
		// Initiate default modules
		$(defaultCollapsed).click();

		// Initiate default tabs
		$(defaultTabs).click();
		
	};
	
	function initTabs($elem, tmpl) {
		$elem = $elem || $('[tabs]');

		$elem.each(function() {
			var template,
				declare = $(this).find('[js_tmpl]'),
				declareHTML = declare.html(),
				declareRX = /<!--([^!]*)-->/,
				tabs = [],
				$tabs = $('<div class="tabs"></div>'),
				$thisContainer = $(this);
				
			if (declareHTML && declareRX.test(declareHTML)) {
				declare.remove();
				template = tmpl || $.trim(declareRX.exec(declareHTML)[1]);
			} else {
				template = tmpl || '<div class="{{ tab_class }}">{{ tab_label }}</div>';
			}

			$thisContainer
				.find('[tab]')
					.each(function() {
						var tabLabel = $(this).attr('tab'),
							tabClass = tabLabel.toLowerCase().replace(/\s/g,'_'),
							tabHTML = template.templateReplace({
								tab_class: tabClass,
								tab_label: tabLabel
							});
						tabs[tabs.length] = tabHTML;
					});

			$tabs
				.html(tabs.join(''))
				.children()
					.each(function() {
						$(this).click(function() {
							var activeTab = $(this).text(),
								activeClass = 'tabs ' + $(this).attr('class') + '_is_active';
							$(this)
								.siblings('.click')
									.removeClass('click')
								.end()
								.addClass('click')
								.parent()
									.attr('class', activeClass);

							$thisContainer.find('[tab]:visible').hide().end().find('[tab="' + activeTab + '"]').fadeIn('fast');
						})
						.css('cursor','pointer');
					})
					.eq(0).click();

			$(this).prepend($tabs);
		});
	}
	// /MODULES
	
	// BLOCK LINKS
	function initBlockLinks() {	
		var className = arguments[0] || 'block_link';
		
		$('[block_link]')
			.each(
				function() {
					var $this = $(this),
						thisLink = $this.find('a[href]')[0];
					
					if (thisLink) {
						$this.hover(
							function() {
								$this.addClass(className);
							},
							function() {
								$this.removeClass(className);
							})
						.click(
							function() {
								window.location.href = thisLink.href;
							});
					}
			});
	};
	// /BLOCK LINKS

	// VIRAL TOOLS
	function initViralTools() {
		$('.viral_toolbar .email').each(function() {
			var url = this.href,
				name = 'emailThis',
				features = 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=490,height=520';

			$(this).click(function(e) {
				window.open(url, name, features);
				return false;
			});
		});		
	};	
	// /VIRAL TOOLS
	
	// ANSWEROLGY TOUT - If content is too long. Script hides heading and source
	function initAnswerology() {
		var $answerology = $('#answerology_tout'),
			$container = $answerology.find('.content'),
			$content = $container.find('.answer'),
			$heading = $content.find('.answerquestiontext'),
			$by = $content.find('.questionbytext');

		if ($content.height() > $container.height()) {
			$heading.hide();
		}
	
		if ($content.height() > $container.height()) {
			$by.hide();
		}
	}
	// /ANSWEROLGY TOUT

	function initWrapper() {
		
		initModules();
		initTabs();
		initViralTools();
		initAnswerology();
		
		// NAV Z-INDEX
		$('#global_navigation_bar').hover(
			function() {
				$(this).css('z-index', 1e9);
			},
			function() {
				$(this).css('z-index', 1);
			}
		);
		// /NAV Z-INDEX

		// INPUT FOCUS/BLUR
		$(':text, :password')
			.bind(
				'focus.clearInput',
				function() {
					$(this)
						.removeClass('blur')
						.addClass('focus');
	
					if (this.value.toLowerCase() === this.defaultValue.toLowerCase()) {
						this.value = '';
					}
				}
			)
			.bind(
				'blur.clearInput',
				function() {
					$(this)
						.removeClass('focus')
						.addClass('blur');
					if (this.value === '' && !this.hasChanged) {
						this.value = this.defaultValue;
					}
				}
			)
			.bind(
				'keydown.clearInput',
				function(e) {
					if (e.keyCode !== 9) {
						this.hasChanged = true;
						$(this).unbind('keydown.clearInput');
					};
				}
			);

		$('.registration :text, .registration :password')
			.unbind('.clearInput');
		// /INPUT FOCUS/BLUR
		
	};

	//////////////////////////////////////////////
	// Execute procedures contingent on the DOM //
	//////////////////////////////////////////////
	$(function() {
		$('body').removeClass('no_js').addClass('js');
		initWrapper();
		initBlockLinks();
		HEARST.init = true;
	});

	return false;
}( );

/* prevent exec script in search box */
$(document).ready(function(){
            
            $("form[action='/search/'] a")
            .attr("href","#")
            .click(function(e){
                        e.preventDefault();
                        $(this).parents("form").submit();    
            });

            $("form[action='/search/']").submit(function(){
                        $input = $("input[name=q]",this);
                        //get unsafe search string 
                        var s = $input.val();
                        //replace
                        s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                        //set safe search string 
                        $input.val(s);
            });

});