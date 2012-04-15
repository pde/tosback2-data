
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);

$(document).ready(function(){
jQuery('.sf-menu').supersubs({ 
		minWidth:    12,   // minimum width of sub-menus in em units 
		maxWidth:    27,   // maximum width of sub-menus in em units 
		extraWidth:  1     // extra width can ensure lines don't sometimes turn over 
											 // due to slight rounding differences and font-family 
      }).superfish({
				delay:	300,
				speed:       'fast',                          // faster animation speed 
        autoArrows:  false,                           // disable generation of arrow mark-up 
        dropShadows: false                            // disable drop shadows 
	});

	
	//$('#nav ul li').hover(function(){
	//	var divElem = $(this).find('div.crazyMenu');
	//	if(divElem.css('top')=="0px"){
	//		var classId=$(this).attr('rel');
	//		var divWidth = divElem.width();
	//		
	//		var posTop = $('#nav').offset().top + 28;
	//		var posLeft = $(this).find('a').offset().left;
	//		var rightEdge = $('#nav').offset().left + $('#nav').width();
	//		var mainColAlign="left";
	//		if((divWidth + posLeft) > rightEdge){
	//			posLeft=rightEdge - divWidth;
	//			
	//			//var linkEdge = $(this).find('a').offset().left + $(this).find('a').width();
	//			//posLeft=linkEdge - divWidth;
	//			//mainColAlign="right";
	//		}
	//		divElem.css('top', posTop+"px");
	//		divElem.css('left', posLeft+"px");
	//		divElem.css('width', divWidth+"px");
	//		divElem.load('crazyMenu.php?classId='+classId+'&width='+divWidth+'&align='+mainColAlign);
	//		
	//
	//	}
	//	$(this).addClass("hovering");
	//	//var mainCol = divElem.find('div.mainCol');
	//	//	var contentCol = divElem.find('div.content');
	//	//	var height=mainCol.height();
	//	//	//alert(height);
	//	//	contentHeight=contentCol.height();
	//	//	if(contentHeight > height){
	//	//		height=contentHeight;
	//	//	}
	//	//	mainCol.height(height);
	//	//	contentCol.height(height);
	//	
	//	// ** jquery position way.  Seems wonky in IE right now
	//	//var divElem = $(this).find('div.crazyMenu');
	//	//var align = "left";
	//	//if (divElem.hasClass("crazyRight")){align="right";}
	//	//divElem.position({
	//	//		of: $( this ).find('a'),
	//	//		my: align+" top",
	//	//		at: align+" bottom",
	//	//		collision: "none"
	//	//	});	
	//	//$(this).addClass("hovering");
	//	
	//},function(){
	//	$(this).removeClass("hovering");
	//
	//
	//	});

}
);