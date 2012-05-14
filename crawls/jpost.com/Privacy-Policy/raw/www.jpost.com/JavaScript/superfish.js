
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



$(document).ready(function(){
    try
    {
      /*  var category = window.location.toString().split('/');
        
        if(category[2] != category[category.length-1])
        {
            switch(category[3].toLowerCase())
            {
                case "business":
                if(category[4].toLowerCase()=="realestate")
                {
                  $("#menuDiv ul>il").removeClass("current");
                  $("#menuLifestyle").addClass("current");
                  
               
                }
                else
                {
                   $("#menuDiv ul>il").removeClass("current");
                   $("#menuNews").addClass("current");
                   
                }
                SetCurrentSub();
                 break;
                 
                case "headlines":
                case "middleeast":
                case "international":
                case "iranianthreat":
                case "sports":
                 case "health":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuNews").addClass("current");
                SetCurrentSub();
                
                break;
                
                case "opinion":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuOpinion").addClass("current");
                SetCurrentSub();
                break;
                
                case "videoarticles":
                case "magazine":
                case "localisrael":
                case "injerusalem":
                case "metro":
                case "ivrit":
                case "premium":
                case "dash":
                case "epaper":
                case "christianinisrael":
                case "jerusalemreport":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuOurmagazines").addClass("current");
                SetCurrentSub();
                break;
                
                case "jewishworld":
                case "cafeoleh":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuJewishWorld").addClass("current");
                SetCurrentSub();
                break;
                
                case "artsandculture":
                case "travel":
              
                case "lifestyle":
                case "specialreports":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuLifestyle").addClass("current");
                SetCurrentSub();
                break;
                
                case "features":
                case "israel":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuFeatures").addClass("current");
                SetCurrentSub();
                break;
                
                case "landedpages":
                case "newsletter":
                case "rss":
                $("#menuDiv ul>il").removeClass("current");
                $("#menuMyJpost").addClass("current");
                SetCurrentSub();
                break;
                
                default:
                $("#menuDiv ul>il").removeClass("current");
                $("#menuNews").addClass("current");
                SetCurrentSub();
                break;
            }
        }*/
        
       

        

    }
    catch(ex){}
});

        function SetCurrentSub()
        {
            var cur = $('.current li>a');
            var curloc = window.location.pathname.toString().split('/');
            var n = 0;
            var setN = true;
            for(var i = 0; i < cur.size(); i++)
            {
                
                var j = cur.get(i).pathname.split('/');
                var jParam1 = j[0];
                var jParam2 = j[1];
                if(jParam1 == "")
                {
                    jParam1 = j[1];
                    jParam2 = j[2];
                }
                
                if(curloc[2].indexOf('.') != -1)
                { 
                    if(jParam1 == curloc[1])
                    {
                       $('.current li:eq('+i+') a').attr('style', 'color:#6998B9 !important;');
                       
                        break;
                    }
                }
                else
                {
                    if(jParam1 == curloc[1] && n == 0 && setN)
                    {
                       n = i;
                       setN = false;
                    }
                
                    if(jParam2 == curloc[2])
                    {
                       $('.current li:eq('+i+') a').attr('style', 'color:#6998B9 !important;');
                      
                        break;
                    }
                    
                    if((i+1) == cur.size() && !setN)
                    {
                      $('.current li:eq('+n+') a').attr('style', 'color:#6998B9 !important;');
                       
                        break;
                    }
                    
                }
                
            }
        }

    function KeepInRed()
    {
        try {
            document.getElementById('menuOurmagazines').style.backgroundImage = "url(../images/Premium/nav-premium.jpg)";
        }
        catch(ex){}
    }

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
		delay		: 1000,
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


