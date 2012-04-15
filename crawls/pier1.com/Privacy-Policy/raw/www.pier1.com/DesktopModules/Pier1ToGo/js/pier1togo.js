// If we haven't created the PIER1TOGO object already (for namespacing purposes)
// go ahead and create it now
if (typeof PIER1TOGO === 'undefined') {
    PIER1TOGO = {};
}

PIER1TOGO.paging = {
    paginate: function($pagedEl, $linksDestination, numPerPage, pagerLabel) {
        var currentPage = 0, 
            numRows, numPages, $pager;

        $pagedEl.bind('repaginate', function() {
          $(this).children().show()
            .slice(0, currentPage * numPerPage)
              .hide()
            .end()
            .slice(((currentPage + 1) * numPerPage - 1) + 1)
              .hide()
            .end();
        });
     
        numRows = $pagedEl.children().length;
        numPages = Math.ceil(numRows / numPerPage);
        
        $('div.pager', $pagedEl).remove();
        if (numPages < 2) {
            return;
        }
                
        $pager = $('<div class="pager"><span>' + pagerLabel + '</span><ol class="noMarker"></ol></div>');

        for (var page = 0; page < numPages; page++) {

          $('<li><a class="page-number">' + (page + 1) + '</a></li>')
            .bind('click', {'newPage': page}, function(event) {
                currentPage = event.data['newPage'];
                $pagedEl.trigger('repaginate');
                
                $(this).parent().find('a').removeClass('active')
                    .end().end()
                    .children('a').addClass('active');
            })
           .appendTo($pager.children('ol')).addClass('clickable');
        }

        $pager.find('a.page-number:first').addClass('active');
        $pager.appendTo($linksDestination);
        
        $pagedEl.trigger('repaginate');
    } // end paginate
} // end PIER1TOGO.paging

PIER1TOGO.shareListModal = (function () {
    var config, open, close;
    
    config = {
        $el: null, //jQuery object (required)
        openEl: null, //string selector (required)
        closeEl: null, //string selector (optional)
        hideClass: 'hidden', //string (optional)
        dialogOpts: { // object containing jQuery UI dialog options (optional)
            dialogClass: 'Pier1ToGo',
            resizable: false,
            modal: true,
            width: 660
        }
    }
    
    open = function(options) {
        $.extend(true, config, options);
        
        if (!config.$el.length) {
            return;
        }
        
        $(config.openEl).live('click.shareList', function() {
            config.$el.dialog(config.dialogOpts).bind('dialogclose', close).removeClass(config.hideClass);
        });
        
        if (config.closeEl) {
            $(config.closeEl).live('click.shareList', function() {
                config.$el.dialog( "close" );
            });
        }
    };
    
    close = function() {
        $(this)
            .find(':input:not(":submit")').val('').trigger('blur')
            .end()
            .find('div.userMessage').remove();
    }
    
    return {
        open: open
    }
}());

PIER1TOGO.printPage = function($el) {
    $el.live('click', function() {
        window.print();
    });
};

PIER1TOGO.addLoader = (function () {
    var config, add, remove;
    
    config = {
        $el: null,
        placement: 'after', // posible values = 'before', 'after', 'inside'
        blocked: true,
        iconOnly: true,
        markup: $('<span class="loader">Loading...</span>')
    };
    
    add = function(options) {
        $.extend(config, options);

        // remove the image replacment class if we want to show the text
        if (config.iconOnly) {
            config.markup.addClass('ir'); 
        } else {
            config.markup.removeClass('ir'); 
        }

        // do we want to insert this before or after the element
        if (config.placement === 'before') {
            config.markup.insertBefore(config.$el);
        } else if (config.placement === 'inside') {
            config.$el.html(config.markup);
        } else {
            config.markup.insertAfter(config.$el);
        }

        // disable the element
        if (config.blocked) {
            if (config.$el.is('a')) {
                config.$el.addClass('disabled');
            } else {
                config.$el.attr('disabled', 'disabled');
            }
        }
    };
    
    remove = function (options) {
        $.extend(config, options);
        
        config.$el.parent().find('span.loader').remove();
        
        if (config.blocked) {
            if (config.$el.is('a')) {
                config.$el.removeClass('disabled');
            } else {
                config.$el.removeAttr('disabled');
            }
        }
    };
    
    return {
        add: add,
        remove: remove
    };
}());

// https://github.com/nathansmith/formalize
var FORMALIZE = (function($, window, document, undefined) {
	// Private constants.
	var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
	var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
	var WEBKIT = 'webkitAppearance' in document.createElement('select').style;
	var IE7 = !!($.browser.msie && parseInt($.browser.version, 10) === 7);

	// Expose innards of FORMALIZE.
	return {
		// FORMALIZE.go
		go: function() {
			for (var i in FORMALIZE.init) {
				FORMALIZE.init[i]();
			}
		},
		// FORMALIZE.init
		init: {
			detect_webkit: function() {			
				if (!WEBKIT) {
					return;
				}

				// Tweaks for Safari + Chrome.
				$('html').addClass('is_webkit');
			},
			// FORMALIZE.init.full_input_size
			full_input_size: function() {
				if (!IE7 || !$('textarea, input.inputFull').length) {
					return;
				}

				// This fixes width: 100% on <textarea> and class="input_full".
				// It ensures that form elements don't go wider than container.
				$('textarea, input.inputFull').wrap('<span class="input_full_wrap"></span>');
			},
			// FORMALIZE.init.placeholder
			placeholder: function() {
				if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
					// Exit if placeholder is supported natively,
					// or if page does not have any placeholder.
					return;
				}

				$(':input[placeholder]').each(function() {
					var el = $(this);
					var text = el.attr('placeholder');

					function add_placeholder() {
						if (!el.val() || el.val() === text) {
							el.val(text).addClass('placeholder_text');
						}
					}

					add_placeholder();

					el.focus(function() {
						if (el.val() === text) {
							el.val('').removeClass('placeholder_text');;
						}
					}).blur(function() {
						add_placeholder();
					});

					// Prevent <form> from accidentally
					// submitting the placeholder text.
					el.closest('form').submit(function() {
						if (el.val() === text) {
							el.val('');
						}
					}).bind('reset', function() {
						setTimeout(add_placeholder, 50);
					});
				});
			},
			// FORMALIZE.init.autofocus
			autofocus: function() {
				if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
					return;
				}

				$(':input[autofocus]:visible:first').focus();
			}
		}
	};
// Alias jQuery, window, document.
})(jQuery, this, this.document);

jQuery(document).ready(function() {
	FORMALIZE.go(); // Automatically calls all functions in FORMALIZE.init
});


// http://www.JSON.org/
// for formatting JS into the proper JSON format
var JSON;if(!JSON){JSON={};}
(function(){"use strict";function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());