// $('.anchor').each( contentUpdater( ) );
// $('.anchor').tmAnchor( {} );
// $('.anchor').bind( 'click', function() {
//     // fill in dialog contents if needed
//     this.conetentUpdater( 'update' );
//     this.tmAnchor( 'align', jquery_dialog );
//     dialog.open();
// } );

(function( $, undefined ) {

$.widget( "ui.tmCarets", {
	options: {
        // top: 'top-caret-selector'
        // bottom: 'bottom-caret-selector'
	},

	_create: function() {
	},

    position: function( options ) {
    },

	destroy: function() {
		$.Widget.prototype.destroy.apply( this, arguments );
	}
});


// do chaining here
// do cancel others here
// do queing here

// context:
//   on_start
//   on_finish
//   dialogs
//   show_animation
//   hide_animation
//
// chain:
//   active_dialog
//   is_running

$.widget( "ui.tmDialog", {
    _groups: {},

    _chains: [],

	options: {
        groups: [],
        setup: function( context ) { return true; },
        after_show: function( context ) { return true; },
        shade: false
	},

    show: function() {
        if ( this.options.shade ) {
            $('.lightbox-shade').css('zIndex', this.element.css('zIndex') - 1 )
                                .css('height', jQuery(document).height())
                                .show();
        }
        var animation = this.options.show_animation || $.makeArray( arguments );
        this.element.show.apply( this.element, animation );
        return this;
    },

    hide: function() {
        var animation = this.options.hide_animation || $.makeArray( arguments );
        if ( this.options.shade ) {
            // just hide the shade now instead of hiding it
            // after the animation completes.  this way, a hide isn't called
            // after the show for the next dialog (if one exists)
            $('.lightbox-shade').hide();
        }
        this.element.hide.apply( this.element, animation );
        return this;
    },

	_create: function() {
        this.element.bgiframe();
        return this;
	},

    queue_chain: function( context ) {
        this._chains.push( {
            context: context,
            active_dialog: 0,
            is_running: false
        } );
        return this;
    },

    preempt_chain: function( context ) {
        this._chains.unshift( {
            context: context,
            active_dialog: 0,
            is_running: false
        } );
        return this;
    },

    start_chain: function() {
        if ( this._chains.length ) {
            var chain = this._chains[0];
            
            if ( !chain.is_running ) {
                if ( chain.context.on_start ) {
                    chain.context.on_start( chain.context );
                }
                chain.is_running = true;
                this.run_chain();
            }
        }
        return this;
    },

    cancel_chain: function() {
        if( this._chains[0] ) {
            this.halt_chain();
            this.finish_chain();
        }
    },

    finish_chain: function() {
        var chain = this._chains[0];
        var context = chain.context;

        if ( context.on_finish ) {
            context.on_finish( context );
        }

        this._chains.shift();
        this.start_chain();
        return this;
    },

    run_chain: function() {
        var chain = this._chains[0];
        var context = chain.context;
        var dialog = $(context.dialogs[chain.active_dialog]);

        if ( dialog.tmDialog( 'option', 'setup' )( context ) ) {
            var animation = context.show_animation ? context.show_animation.concat() : [];
            var after_show = dialog.tmDialog( 'option', 'after_show' ) || null;
            if ( after_show ) {
                animation.push( function() {
                    after_show( context );
                } );
            }
            dialog.tmDialog.apply( dialog, ['show'].concat( animation ) );
            if ( !context.show_animation ) {
                dialog.tmDialog( 'option', 'after_show' )( context );
            }
        }
        else {
            this.next();
        }
        return this;
    },

    halt_chain: function() {
        var chain = this._chains[0];
        var context = chain.context;
        var dialog = $(context.dialogs[chain.active_dialog]);

        dialog.tmDialog.apply( dialog, ['hide'].concat( context.hide_animation || [] ) );
        return this;
    },

    get_current_context: function() {
        if ( this._chains.length ) {
            var chain = this._chains[0];
            var context = chain.context;
            return context;
        }

        return null;
    },

    skip: function() {
        var chain = this._chains[0];
        var context = chain.context;
        
        // TODO: don't remove shade if the next dialog exists
        // and has a shade
        this.halt_chain();
        chain.active_dialog ++;

        return this;
    },

    next: function() {
        var chain = this._chains[0];
        var context = chain.context;
        
        // TODO: don't remove shade if the next dialog exists
        // and has a shade
        this.halt_chain();
        chain.active_dialog ++;

        if ( chain.active_dialog < context.dialogs.length ) {
            this.run_chain();
        }
        else {
            this.finish_chain();
        }
        return this;
    },

    previous: function() {
        var chain = this._chains[0];
        var context = chain.context;
        
        this.halt_chain();
        chain.active_dialog --;

        if ( chain.active_dialog >= 0 ) {
            this.run_chain();
        }
        else {
            this.finish_chain();
        }
        return this;
    },

	destroy: function() {
		$.Widget.prototype.destroy.apply( this, arguments );
	}
});

$('.lightbox-shade').bgiframe();

})( jQuery );

/* Will track an omniture external link once per page load. Subsequent clicks will not be tracked. */
(function ($, window) {
    $.fn.omnitureExternalOnce = function (opts) {
        return this.each(function (i, el) {
            var defaults = {
                    omnitureValue: "",
                    cssClass: "hover",
                    dataValue: "clicked",
                    startEvents: "mouseenter touchstart",
                    endEvents: "mouseleave touchend",
                    timeout: 750
                },
                options = $.extend(defaults, opts || {}),
                $this = $(el);

            $this.bind(options.startEvents, function () {
                tm_omn.trackExternalLinks = false;
                $this.addClass(options.cssClass);
            }).bind(options.endEvents, function () {
                $this.removeClass(options.cssClass);
                window.setTimeout(function () {
                    if (!$this.hasClass(options.cssClass)) {
                        tm_omn.trackExternalLinks = true;
                    }
                }, options.timeout);
            }).bind("click", function () {
                if (!$this.data(options.dataValue)) {
                    omniTracking.navigation_link(options.omnitureValue, false);
                    $this.data(options.dataValue, true);
                }
            });
        });
    };
}(jQuery, window));