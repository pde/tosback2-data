/*
 *  adds the item in position specified by "id" to the cart
 * @param id  - the position of the item to be added to the cart
 */
function addtobag_makeRequest(id, display_overlay) {
    var item = document.getElementById("item_hidden"+id).value;
    var qty = document.getElementById("qty_select"+id).value;
    var size = document.getElementById("size_select"+id).value;
    var color = color_id_value[id];

    if (!size) {
        return alert("Please select a size");
    }

    var sUrl = "/cart/ajaxadd";
    var postData = "i=" + item + "&c=" + color + "&s=" + size + "&q=" + qty;
    var callback = {
        success: function(o) {
            minCartLock = true;
    		showMiniCart(true);
    		if (typeof hide_quickview != 'undefined') hide_quickview();
            if (o.responseText == undefined)
                return;
            if (typeof quickViewPanel != 'undefined' && global_color_id[2] == undefined) {
                quickViewPanel.setBody('');
                quickViewPanel.hide();
            };
            var d = document.createElement('div'), sc_code;
            d.innerHTML = o.responseText;
            sc_code = YAHOO.util.Selector.query('#sc_ajaxadd', d, true);
            if(sc_code!=null)
                eval(sc_code.innerHTML);

            if (display_overlay) {
                if (o.responseText.match(/item_restriction/i)) 
                {
                    restrictions = new YAHOO.widget.Panel("restrictions", {
                        width:"429px",
                        height: "205px",
                        fixedcenter: true, 
                        constraintoviewport: true, 
                        underlay:"shadow", 
                        close:false, 
                        visible:false, 
                        draggable:false,
                        zIndex: 100
                    });
                    
                    var response = o.responseText.split('<SPLIT>');
                    restrictions.setBody(response[0]);
                    restrictions.render(document.body);
                    restrictions.show();
                    alert(respons[1]);
                    YAHOO.util.Dom.get("cart_navigation").innerHTML = response[1];
                } 
                else 
                {
                    var bag_info = o.responseText.match(/<span style="display: none">(.*)<\/span>/i);
                    var availableQty = o.responseText.match(/<span style="display: none;">(.*)<\/span>/i);
                    if(bag_info)
                        YAHOO.util.Dom.get("cart_navigation").innerHTML = bag_info[1];
                    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("view_bag"), "display", "");
                    color_size[id][color_id_value[id]][size]['quantity'] = availableQty[1];
                    selectSize(size, id);
                    
                    var url = (location.href).split('#');
                    location.href= url[0] + '#mini_cart_button_holder';
                }
            }else
                location.reload(true);
            
            if (typeof addToCartCallBack != 'undefined') {
                addToCartCallBack();
            };
        }
    };
    YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);

    /* Certona code */
    updateCertonaTags(item,color,'shopping+bag')
}

function addtobag_makeRequest_group() {
    
    var items = [];
    var colors = [];
    var sizes = [];
    var qtys = [];
    var idx = 0;
    for (var id = 1; id < document.getElementById("total_items").value; id++) {
        var check = document.getElementById("addtobagcheck"+id).checked;
        if(!check) continue;
        items[idx] = document.getElementById("item_hidden"+id).value;
        colors[idx] = color_id_value[id];
        sizes[idx] = document.getElementById("size_select"+id).value;
        qtys[idx] = document.getElementById("qty_select"+id).value;
        idx++;
    }

    if (items.length < 1) {
        return alert("Please select a size");
    }
    
    for (var id = 1; id < document.getElementById("total_items").value; id++) {
        document.getElementById("addtobagcheck"+id).checked = false;
    }

    var sUrl = "/cart/ajaxaddgroup";
    var postData = "i=" + items.join() + "&c=" + colors.join() + "&s=" + sizes.join() + "&q=" + qtys.join() + '&o=' + YAHOO.util.Selector.query('h1',null, true).innerHTML;
    var callback = {
        success: function(o) {
            if (o.responseText == undefined)
                return;

            showMiniCart(true);

            var d = document.createElement('div'),sc_code;
            d.innerHTML = o.responseText;
            sc_code = YAHOO.util.Selector.query('#sc_ajaxadd', d, true);
            if(sc_code!=null)
               eval(sc_code.innerHTML);

            var bag_info = o.responseText.match(/<span style="display: none">(.*)<\/span>/i);
            var availableQty = o.responseText.match(/<span style="display: none;">(.*)<\/span>/i);
            if(bag_info)
                YAHOO.util.Dom.get("cart_navigation").innerHTML = bag_info[1];
            YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get("view_bag"), "display", "");
            
            var url = (location.href).split('#');
                    location.href= url[0] + '#mini_cart_button_holder';
        }
    };
    YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
}
