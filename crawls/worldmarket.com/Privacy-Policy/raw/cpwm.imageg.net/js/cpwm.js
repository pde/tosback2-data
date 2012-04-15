// JavaScript Document
if (cpwm) {
} else {
    var cpwm = {};
}

/* custom popup window */
cpwm.showCustomPopUp = function(target, name, params) {
    remote = open(target, name, params);
}

/* enhanced image */
cpwm.showEnhancedImage = function(productId)
{
	var showEnhancedProduct;
	var mainProductEnhViewURL;
	var flag = "false";
    if (notEmpty(essProductsArray))
    {
        for (var i = 0; i < essProductsArray.length; i++)
        {
            if (essProductsArray[i].productId == productId)
            {
				flag = "true";
                showEnhancedProduct = essProductsArray[i];
				mainProductEnhViewURL = showEnhancedProduct.enhancedImageURL;				
				break;
            }
        }

			if(flag == "false"){
				ess.product=new ess.Product(ess.productJSON);
				if(notEmpty(ess.product)){
					mainProductEnhViewURL = ess.product.enhancedImageURL;
				}
			}
			if( notEmpty(showEnhancedProduct) && notEmpty(showEnhancedProduct.getCurrentView().enhancedImageURL)){	

				var enhancedImageURL = '/product/zoom.jsp?productId=' + productId + '&prodZoomImg=' + showEnhancedProduct.getCurrentView().enhancedImageURL;
				/* alert('====== cpwm.showEnhancedImage ======' + '\nproductId = ' + productId + '\ness.product = ' + ess.product + '\ness.product.getCurrentView() = ' + ess.product.getCurrentView() + '\ness.product.getCurrentView().enhancedImageURL = ' + ess.product.getCurrentView().enhancedImageURL + '\nenhancedImageURL = ' + enhancedImageURL); */
				remote = open(enhancedImageURL,'largeImage','width=545,height=625,left=0,top=0,scrollbars');

			} else if(notEmpty(mainProductEnhViewURL)){
				
				var enhancedImageURL = '/product/zoom.jsp?productId=' + productId + '&prodZoomImg=' + mainProductEnhViewURL;
				/* alert('====== cpwm.showEnhancedImage ======' + '\nproductId = ' + productId + '\ness.product = ' + ess.product + '\ness.product.getCurrentView() = ' + ess.product.getCurrentView() + '\ness.product.enhancedImageURL = ' + ess.product.enhancedImageURL + '\nenhancedImageURL = ' + enhancedImageURL); */
				remote = open(enhancedImageURL,'largeImage','width=545,height=625,left=0,top=0,scrollbars');
			}
    }
}

/* email a friend popup window */
cpwm.emailAFriend = function(target) {
    remote = open(target, 'email_a_friend', 'width=550,height=720,top=0,left=0,resizable=no,scrollbars=yes');
}

/* recently viewed: clear command */
cpwm.clearRecentlyViewed = function(target)
{
    var historyController = target;
    var errorRedirect = target + '?ruvClear=yes';
    new Ajax.Request(historyController,
    {
        method: 'get',
        parameters:
        {
            async: true,
            ruvClear: 'yes',
            ajax: 'yes'
        },
        onComplete: function(e)
        {
            if (e.status == '200')
            {
                try
                {
                    /* clear the recently viewed history */
                    $('recent-history').innerHTML = '';
                    $('recent-history').style.display = 'none';
                }
                catch(x)
                {
                    /* if exception occurs, submit to the cartHandler so it performs the proper redirect */
                    location.href = errorRedirect;
                }
            }
        },
        onException: function(e, m)
        {
            /* if exception occurs, submit to the history so it performs the proper redirect */
            location.href = errorRedirect;
        },
        onError: function(e, m)
        {
            /* if error occurs, submit to the history so it performs the proper redirect */
            location.href = errorRedirect;
        }
    })
}

/* common utility functions: left trim, right trim, trim all */
cpwm.LTrim = function(value) {
    var re = /^\s*/;
    return value.replace(re, "");
}
cpwm.RTrim = function(value) {
    var re = /\s*$/;
    return value.replace(re, "");
}
cpwm.trim = function(value) {
    return cpwm.LTrim(cpwm.RTrim(value));
}

/* common utility function: is provided value numeric */
function isNumeric(v) {
    var isNumeric = false;
    if (notEmpty(v)) {
        var vChars = '0123456789';
        isNumeric = true;
        var Char;
        for (var i = 0; i < v.length && isNumeric; i++) {
            Char = v.charAt(i);
            if (vChars.indexOf(Char) == -1) {
                isNumeric = false;
                break;
            }
        }
    }
    return isNumeric;
}

/* common utility function: is provided value not empty / not undefined */
function isEmpty(v) {
    return !notEmpty(v);
}

function notEmpty(v) {
    var notEmpty = notNull(v);
    if (notEmpty) {
        try {
            if (v.length == 0) notEmpty = false;
        }
        catch(e1) {
            try {
                if (v.size == 0) notEmpty = false;
            } catch(e2) {
            }
        }
    }
    return notEmpty;
}

/* common utility function: is provided value not undefined / not null */
function notNull(v) {
    return v != undefined && v != null;
}

function isIE6()
{
    var ie6 = false;
    try {
        if (document.all && navigator.appVersion.toLowerCase().indexOf('msie 6.') != -1) ie6 = true;
    } catch(e) {
        /* swallow */
    }
    return ie6;
};


document.observe('dom:loaded', function(e)
{
    /* wishlistSubmit: ADA and JavaScript Disabled accessibility for the Add to Wish List link/button */
    if ($('wishlistSubmit')) {
        $('wishlistSubmit').innerHTML = '<a id="add-to-wishlist" href="#" onclick="ess.validateProducts(\'wishList\');return false;" title="Add to Wish List" class="wishlist">Add to Wish List</a> <img src="../images/prd_sidebar2Bullet.gif" width="13" height="12" alt="Add to Wish List"/>';
    }

    /* prodSelectors: used as part of non-javascript accessibility with the color and size product selectors */
    var prodSelectors = $$('.prod_selector');
    if (prodSelectors)
    {
        for (var i=0; i < prodSelectors.length; i++)
        {
            $(prodSelectors[i].id).setStyle({display:'block'});
        }
    }
});

/* Footer input box handling - zip code and email signup */
Event.observe(window, 'load', function() {
    
//     * if on page load, defaults are not set, apply class
//     * (ie. page refresh displays previously entered input box content)
//     
    if	($('zip-box')) {
        if	($('zip-box').value != 'Zip Code') {
	        $('zip-box').className = 'inputActive';
        }
    }
    
    if ($('footer')) {
        var footerInp = $('footer').select('input[type="text"]');
        for (var i=0; i<footerInp.length; i++) {
            if (footerInp[i].id == 'zip-box')  {
                /* only on zip or email inputs */
                footerInp[i].onfocus = function() {
                    /* on focused, if not defaults apply class to set style and clear box */
                    if (this.value == 'Zip Code')  {
                        this.value = '';
                    }
                    this.className = 'inputActive';
                };
                footerInp[i].onblur = function() {
                /* on blur, set style depending on what is left in the input box */
                if (this.value.length == 0) {
                    /* if empty */
                    this.className = null;
                    if (this.id == 'zip-box') { 
                        this.value = 'Zip Code';
                    }
                } else if (this.value == 'Zip Code')  {
                    /* if default */
                    this.className = null;	
                } else {
                    /* if has content and is not default */
                    this.className = 'inputActive';
                }
                };
            }
        }
    }
});

