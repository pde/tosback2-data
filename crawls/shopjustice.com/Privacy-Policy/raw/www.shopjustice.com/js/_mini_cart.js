/**
 * MiniCart logic
 *
 * Calls cart lines to see what's on the cart to render it in the MiniCart panel
 *
 * @see http://www.webdesignerdepot.com/2009/04/10-tips-to-design-usable-shopping-carts/
 */

var minCartLock = false, visibleCart = false, cartTransaction = false,miniCart;
YAHOO.util.Event.onAvailable('mini_cart_button_holder',function(){
    YAHOO.util.Event.addListener(this, 'mouseenter', 
        function(){
            showMiniCart();
        }); 
    YAHOO.util.Event.addListener(this, 'mouseout',
        function(e){
            // The mouseout event also fires when the mouse leaves to a child element, this should detect this case and ignore the event
            var parent = e.relatedTarget || e.toElement;
            while(parent != document.body) {
                if(typeof(parent.id)!='undefined' && parent.id==this.id)
                    return;
                parent = parent.parentNode;
            }
            // Now that the false mouse outs have been taken out, i can continue to do what i have to do
            if (cartTransaction != false && YAHOO.util.Connect.isCallInProgress(cartTransaction)) {
                YAHOO.util.Connect.abort(cartTransaction);
                visibleCart = false;
            }
            if (minCartLock && !visibleCart) {
                YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_button_holder"), "background-color", "");
            	YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_link"), "color", "#448CCB");
            }
            minCartLock = false;
        });     
}); 

function unColorButton() {
    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_button_holder"), "background-color", "");
	YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_link"), "color", "#448CCB");
    YAHOO.util.Event.addListener(YAHOO.util.Dom.get('mini_cart_button_holder'), 'mouseenter', showMiniCart);
    visibleCart = minCartLock = false;
    miniCart.hide();
    miniCart.destroy();
    var item = YAHOO.util.Selector.query('#mini_cart_c'), d;
    for(d in item)
        if(typeof(item[d].parent)!='undefined')
            item[d].parent.removeChild(item[d]);
        
    item = YAHOO.util.Selector.query('#mini_cart_f'), d;
    for(d in item)
        if(typeof(item[d].parent)!='undefined')
            item[d].parent.removeChild(item[d]);
}

/**
 * Function to be triggered after adding an item to the cart or after the mouseover the button
 * 
 * @return void
 */
function showMiniCart(force) {
    var _force = typeof(force)=='undefined'?false:force;
    if(!_force && visibleCart && !minCartLock)
        return;
    minCartLock=true; // Setup the lock
    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_button_holder"), "background-color", "#448CCB");
    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("mini_cart_link"), "color", "#FFFFFF");
    YAHOO.util.Event.removeListener(YAHOO.util.Dom.get('mini_cart_button_holder'), 'mouseenter', showMiniCart);
    
    miniCart = new YAHOO.widget.Panel("mini_cart", {
        context:[document.getElementById('mini_cart_button_holder'), 'tr', 'br', ['beforeShow']],  // align the panel to this/button. panel.top-right = this.bottom-right
        width: '223px',
        underlay: 'shadow',
        close: true,
        visible: false,
        draggable: false,
        zindex:8,
        effect:{effect:YAHOO.widget.ContainerEffect.FADE, duration: 1}
    });
    YAHOO.util.Dom.addClass(miniCart.innerElement, 'jus_panel');
    
    miniCart.subscribe("hide",unColorButton);
    
    var module = YAHOO.util.Dom.get("mini_cart_button_holder").className;
    var sUrl = '/cart/mini';
    if(module == 'cart') sUrl += '?reload=true';
    if(module == 'checkout' || module == 'account') sUrl = '/checkout/mini';
      
    cartTransaction = YAHOO.util.Connect.asyncRequest('GET', sUrl, {
        cache: false,
        success: function(call) {
            if (minCartLock) {
                // free the lock to avoid anyone else to write here (pending requests)
                minCartLock = false;
                miniCart.render(document.body);
                miniCart.show();
                miniCart.setBody(call.responseText);
                miniRemove();
                // I don't know why the panel always a button or lin gets focus, this removes the focus
                miniCart.getFocusableElements()[0].blur();
                visibleCart = true;
            }       
        }
    }, null);
}

/**
 * removes the element from the cart without leaving current page
 * @return
 */
function miniRemove() {
	var form = YAHOO.util.Selector.query('#mini_cart form.remove');
	for (var itemToRemove in form) {
		YAHOO.util.Event.addListener(form[itemToRemove], 'submit', function(event) {
			YAHOO.util.Event.stopEvent(event);
			// this is the form
			var clickedForm = this;
			var values = YAHOO.util.Selector.query('input', this);
			var postValues = 'submit=true';
			for (var value in values) {
				var key = values[value].name;
				var val = values[value].value;
				postValues += '&' + key + '=' + val;
			}
			
	        var transaction = YAHOO.util.Connect.asyncRequest('POST', form[itemToRemove].action, {
	            cache: false,
	            success: function(call) {
	                var item = YAHOO.util.Dom.getAncestorByClassName(clickedForm, 'item');
	                item.parentNode.removeChild(item);
	                
	                var items    = YAHOO.util.Selector.query('#mini_cart .item');
	                var amount   = 0;
	                var totalQty = 0;
	                for (item in items) {
	                	var qty   = YAHOO.util.Selector.query('.qty', items[item])[0];
	                	qty       = parseInt(qty.innerHTML.substring(5));
	                	totalQty += qty;
	                	var price = YAHOO.util.Selector.query('.price', items[item])[0];
	                	price     = parseFloat(price.innerHTML.substring(1));
	                    amount   +=  price * qty ;
	                }
	                items = YAHOO.util.Selector.query('#mini_cart .item.previouslyAdded'); 
	                if (items == '') {
	                    var x = YAHOO.util.Selector.query('#mini_cart .group.previouslyAdded');
	                    /*'YAHOO.util.DOM.style(x[0],'display', 'none');*/
						x[0].style.display = 'none';
	                }
					
	                var miniSubTotal = YAHOO.util.Selector.query('#miniSubtotal')[0];
	                if (typeof(miniSubTotal) != 'undefined') {
	                	miniSubTotal.innerHTML = amount.toFixed(2);
	                }
	                
	                var miniQty     = YAHOO.util.Selector.query('#cart_navigation')[0];
	                miniQty.innerHTML = totalQty;
					var reload = YAHOO.util.Selector.query('#reload_page')
                    if (reload != '' && reload[0].innerHTML == 'true') {
                        location.reload();
                    }
	            }
	        }, postValues);
			
		});
	}
}; 
