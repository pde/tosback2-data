(function($) {
	// mini cart widget - handles keeping the minicart up to date with the server,
	// along with any server interaction that need to occur (like clicking checkout)
	
	// uses publish/subscribe mechanisms to get contact from other pieces of the app
	// if, for example, you know that the cart needs updated, simply publish a message
	// from the other piecs of the page:
	// amplify.publish( "otc.cart.update", {} );
	// we do this so that if the minicart does not exist on the page, no errors will happen,
	// yet if it does exist, it will get the message.
	
	$.widget( "otc.minicart", {
		_create: function() {
			var self = this;
			this.$numItems = this.element.find( ".cartlink .number-items" );
			this.$cartContents = this.element.find( ".minicart-container" );
			this.isjScroll = false;
			this.element.find( ".cartstatus .cartlink" ).show();
			
			
			// create superfish menu
		    this.element.find('ul#sf-minicart').superfish({
		        animation: {
		            opacity: 'show'
		        },
		        speed: 180,
		        delay: 500,
		        onShow: function() { 
		        	if( self.isjScroll ){ return; }
		        	/*
		        	self.$cartContents.find( ".minicart-items" ).jScrollPane(
                                {
                    verticalDragMinHeight: 28,
					verticalDragMaxHeight: 28,
					horizontalDragMinWidth: 28,
					horizontalDragMaxWidth: 28,
					height: 315
                                }
                            );
		        	*/
		        	self.isjScroll = true;
		        }
		    });
			
			this._initnewdetails();
			this.cartIsOpen = false;
			this.updateCart();
			
			// todo: register mouseover/mouseout behavior for cart here
			// currently we are just storing a flag so that we know
			// the cart is currently being viewed. This is important
			// to the widget so that cart contents are not swapped out
			// while the user is interacting with the cart
			// also, we use delegate here so that even as DOM elements
			// are swapped out underneath this core widget element, these
			// event handlers will remain.
			this.element
				.delegate( ".cartstatus", "mouseover", function() {
					self.cartIsOpen = true;
					self._trigger( "open" );
				})
				.delegate( ".cartstatus", "mouseout", function() {
					self.cartIsOpen = false;
					self._trigger( "close" );
				});
			
			// listen for any other part of the app to issue a request
			// for the cart to update.	
			amplify.subscribe( "otc.cart.update", function() {
				self.updateCart();
			});
			
		},
		// public methods
		updateCart: function() {
			// if cart is already open, do NOT replace contents on the user.
			// would be bad UX
		//
		//		this.element.one( "minicartclose", function() {
		//			this._getContents();
		//		})
		//	} else {
				this._getContents();
		//	}
		},
		_getContents: function(){
			var self = this;
			amplify.request({
    			resourceId: "otc.cart",
	    		success: function( data ) {
	    			var $newCart = $( data );
	    			numItems = $newCart.find( ".number-items" ).text();
	    			// start loading notification		
	    			self._busy();
	    			
	    			
	    			// dont replace entire contents of all items - only replace the few items
	    			// that may have changed. this should preserve any events placed on minicart
	    			// DOM elements from other sources
	    			
	    			// replace cart contents
	    			self.$numItems.text( numItems );
	    			self.$cartContents.html( $newCart.find( ".minicart-container" ).children() );	
	    			//
	    			//replace number of items in the cart
	    		//	self.$numItems.text( numItems );
	    		
	    			// jScroll needs actual height to render properly, or else it hard codes
	    			// height to 0.
	    			self._initjScroll();
	    			// todo: add jscroll here to this.$cartcontents list
					// self.$cartContents.find( ".minicart-items" ).jScrollPane();
	    			// reinitialize cart details, as they have been
	    			// replaced above
	    			self._initnewdetails();
	    			
	    			// end the loading notification
	    			self._endbusy();
	    		}
	    	});
		},
		// need to temporarily show the item list somewhere to allow
		// jscroll to initialize properly
		_initjScroll: function() {
			this.isjScroll = false;
			//var $items = this.$cartContents.find( ".minicart-items" ),
			//	$prnt = $items.parent()
			//	$dblprnt = $prnt.parent();
			//	    			
			//	$prnt
    		//		.addClass( "out-of-screen-show" )
    		//		.appendTo( "body" )
    		//		.jScrollPane()
    		//		.appendTo( $dblprnt )
    		//		.removeClass( "out-of-screen-show" );
		},
		// this is the function where you do any "dressing up" of the
		// html that comes down from the server.
		_initnewdetails: function() {
			this.element
				.find( "div.minicart-items table tr:last" ).addClass( "lastrow" );
				
		// minicart promotion - free $10 giftcard on orders 59 or over 113011
			var promogoal = 59;
			var userstotalnum = parseFloat($( '#minicart table td.grandtotal p' ).text().replace(/[\$\-\s,]/g, "")); 
			var differenceamt = (promogoal - userstotalnum).toFixed(2);
			
			$( '#promo_total' ).html(differenceamt);
			
			$( '#gtpromo' ).css( 'display' , 'none' );
			$( '#ltpromo' ).css( 'display' , 'none' );

			$( 'a.minicartpop' ).live('click', function(){
				newwindow=window.open($(this).attr('href'),'','height=215,width=397');
				if (window.focus) {newwindow.focus()}
				return false;
			});
						
			if (userstotalnum >= promogoal)  
			  {
				  $( '#gtpromo' ).css( 'display' , 'block' );
			  }
			else
			  {
				  $( '#ltpromo' ).css( 'display' , 'block' );
			  }
		// end minicart promotion 111011.
		
		},
		_busy: function() {
			//show loading notification here		
		},
		_endbusy: function() {
			// end loading notification here
		}
	});
	$('#minicart li#noScriptMiniCart div.cartStatus').hide();
    $('#minicart li.cartstatus div.cartlink').show();
    $('.number-items').show();
})(jQuery);