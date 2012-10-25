if (!($.browser.msie)) {

	$(function() {
		
		if (!($.cookie)) {
			$.cookie = function(key, value, options) {
		
		        // https://github.com/carhartl/jquery-cookie
		        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
		            options = $.extend({}, options);
		
		            if (value === null || value === undefined) {
		                options.expires = -1;
		            }
		
		            if (typeof options.expires === 'number') {
		                var days = options.expires, t = options.expires = new Date();
		                t.setDate(t.getDate() + days);
		            }
		
		            value = String(value);
		
		            return (document.cookie = [
		                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
		                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
		                options.path    ? '; path=' + options.path : '',
		                options.domain  ? '; domain=' + options.domain : '',
		                options.secure  ? '; secure' : ''
		            ].join(''));
		        }
		
		        // key and possibly options given, get cookie...
		        options = value || {};
		        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
		
		        var pairs = document.cookie.split('; ');
		        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
		            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
		        }
		        return null;
		    };
		}
		
		
		var pageType,	
			referrer = document.referrer || '',	
			pageReferrer = ( referrer.match( /bluefly.com/g ) || referrer.match( /belleandclive.com/g ) ) ? '' : referrer ,
			pageLocation = location.href,
		
			productUrl, 
			productId,
			productList,
			imageRegex = /.*productCode=([0-9]+).*/g,
			productIds = [],
			
			cookieuserid = $.cookie('DYN_USER_ID'),
			cookietrackerid = $.cookie('CS_TRACKER_ID'),
			cookielogin = $.cookie('loginCookie'),
			
			params,
			trackingUrl = 'http://ani.bluefly.com/impress';
	
		
		// If page referrer is bluefly or b&c keep referrer empty
		if ( pageReferrer.match( /bluefly.com/g ) || pageReferrer.match( /belleandclive.com/g ) ) {
			pageReferrer = '';
		}
		
		
		// Determine Page Type for the switch statement
		if ( pageLocation.match( /list.fly/g ) ) {
			pageType = 'list';
		} else if ( pageLocation.match( /detail.fly/g ) ) {
			pageType = 'pdp';
		} else if ( pageLocation.match( /www.bluefly.com\/designer/g ) ) {
			pageType = 'brand';
		} else if ( pageLocation.match( /www.bluefly.com\/a/g ) ) {
			pageType = 'department';
		}
		
		// Post Function
		var postData = function( productIds ) {  
			
			params = {
				cookieuserid : cookieuserid,
				cookietrackerid : cookietrackerid,
				cookielogin : cookielogin,
				pageurl : pageLocation,
				referrer : pageReferrer,
				productIds : productIds
			}
			
			$.ajax({
				url: trackingUrl,
				type: 'POST',
				timeout : 3000,
				crossDomain: true,
				data: params,
				success: function( responseData, textStatus, jqXHR ) {
					//console.log(params)
				},
				error: function ( responseData, textStatus, errorThrown ) {
					//console.log(responseData);
				}
			});
		}
		
		// Data
		switch( pageType ) {
			
			case 'list':
				productList = $( '.productContainer' );
				
				if ( productList.length !== 0 ) {
					productList.each( function( index ) {
				    	productIds.push( $(this).attr("id") );
					});
				}
				
				if ( productList.length !== 0 ) { postData( productIds ); } else { productIds = -1; postData( productIds );  }
				
			
			break;
			
			case "pdp":
					
				// main product
				var mainProduct = $('#main-product-detail').data('product-id');
				if ( mainProduct ) {
					productIds.push( mainProduct );
				}
				
				productList = $('#suggested-products').find('.product');
				if ( productList.length !== 0 ) {
					productList.each( function( index ) {
						productId = $(this).data('product-id');
						productIds.push( productId );
					});
				}
				
				productList = $('#other-recommendations').find('.product');
				if ( productList.length !== 0 ) {
					productList.each( function( index ) {
						productId = $(this).data('product-id');
						productIds.push( productId );
					});
				}
				
				if ( productList.length !== 0 ) { postData( productIds ); } else { productIds = -1; postData( productIds );  }
				
			
			break;
			
			case "department":
	
				productList = $('.crosssellProd');
				if ( productList.length !== 0 ) {
					productList.each( function( index ) {
				    	productUrl = $(this).find('div').find('a').find('img').attr('src');
						if ( productUrl ) {
							productId = productUrl.replace(imageRegex, '$1');
							productIds.push( productId );
						}
					});
				}
				
				if ( productList.length !== 0 ) { postData( productIds ); } else { productIds = -1; postData( productIds );  }
			
			break;		
		
			case "brand":
				
				productList = $('.categoryListItem').find('.listProdImage');
				if ( productList.length !== 0 ) {
					productList.each( function( index ) {
				    	productUrl = $(this).find('a').find('img').attr('src');
						if ( productUrl ) {
							productId = productUrl.replace(imageRegex, '$1');
							productIds.push( productId );
						}
					});
				}
				
				if ( productList.length !== 0 ) { postData( productIds ); } else { productIds = -1; postData( productIds );  }
			
			break;	
			
			default:
			
				postData( productIds );
			
		}
	
		
	});

}
