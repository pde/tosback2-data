(function() {
	
	lib.fonts = window.lib.fonts = {
		font1 : {
			fontFamily : "HelveticaNeue",
			src : "/js/extensions/cufonReplacement/font1.font.js"
		}
	};
	
	lib.cufonReplacement = window.lib.cufonReplacement = {
		replacements : {
			replacement1 : {
				selector : ".cufonFont1",
				opts : {
					fontFamily : lib.fonts.font1.fontFamily
					//separate : "none"
				}
	
			}
		},
		func : {
			loadFonts : function(settings) {
				var settings = $.extend({
					fonts : [],
					allFonts : false
				}, settings);
				
				/* Add all fonts if specified */
				if( settings.allFonts )
				{ settings.fonts = lib.fonts; }
				/* ------------ */
				
				/* Load the font js file */
				$.each( settings.fonts, function() {
					document.write('<script type="text/javascript" src="' + this.src + '"></script>');
				});
				/* ---------------- */
			},
			doReplacements : function(settings) {
				var settings = $.extend({
					replacements : [],
					allReplacements : false,
					isRefresh : false
				}, settings);
				
				if( settings.allReplacements )
				{ settings.replacements = lib.cufonReplacement.replacements; }
					
				if( !settings.isRefresh )
				{
					$.each(settings.replacements, function() {
						Cufon.replace( this.selector, this.opts );
					});
				}
				else
				{
					$.each(settings.replacements, function() {
						Cufon.refresh( this.selector );
					});
				}
			}
		}
	};
})();

/* You can do your own font loading and replacements in site.js
 * by commenting out the code below.
 */

/* Create the font Includes */
lib.cufonReplacement.func.loadFonts({ allFonts : true });
//lib.cufonReplacement.func.loadFonts({ fonts : [ lib.fonts.font1 ] });

/* Do Replacements */
lib.cufonReplacement.func.doReplacements({ allReplacements : true });
//lib.cufonReplacement.func.doReplacements({ replacements : [ lib.cufonReplacement.replacements.replacement1 ] });

/* Add this to the end of the <body> tag, for ie speedup Cufon.now(); */

/* ---------------------- */