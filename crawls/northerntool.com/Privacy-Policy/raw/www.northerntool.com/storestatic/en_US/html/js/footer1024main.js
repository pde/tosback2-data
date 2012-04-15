// footer include file

document.write('</div><div id="footer-wrapper">'+
	'<div id="footer" class="grid960_5">'+
        '<div id="email-deals" class="col col1">'+
        	'<img src="'+imageServer+'/images/footer/email-deals.gif" width="184" height="28" alt="Email Deals" /><br/>'+
            '<span class="intro">Weekly Sales, Specials + Exclusives</span>'+
            '<form action="/shop/tools/NTEFooterEmailSubscribeView?storeId=6970" id="email-deals-signup" name="EmailSubscribe" method="post">'+
            	'<input class="text-input" type="text" name="email" maxlength="60" value="Email Address"/>'+
                '<input class="text-input" type="text" name="firstname" maxlength="25" value="First Name"/>'+
                '<input class="text-input" type="text" name="zipcode" maxlength="7" value="ZIP Code"/>'+
                '<input class="submit" type="image" alt="Sign Up" src="'+imageServer+'/images/footer/signup-new.gif"/>'+
            '</form>'+
			'<scr' + 'ipt type="text/javascript">emailDealsClear();</scr' + 'ipt>'+
            '<div class="small">Northern will not sell, trade, share or rent your email address.</div>'+
        '</div>'+
        
        '<div class="col col4 nested">'+
        
			'<div class="col col1">'+
				'<img src="'+imageServer+'/images/footer/leader-since-1981.gif" width="174" height="28" alt="Leader Since 1981" />'+
				'<ul class="link-list">'+
					'<li><a href="'+ServerHTTP+'/companyinfo/" rel="nofollow">Company Info</a></li>'+
					'<li><a href="'+ServerHTTP+'/affiliates/" rel="nofollow">Affiliates</a></li>'+
					'<li><a href="'+ServerHTTP+'/careers/" rel="nofollow">Careers</a></li>'+
					'<li><a href="'+ServerHTTP+'/gov/">Government</a></li>'+
					'<li><a href="'+ServerHTTP+'/catalog/buyersguides/">Buyers Guides</a></li>'+
					'<li><a href="'+ServerHTTP+'/shop/tools/category_product-manual">Product Manuals</a></li>'+
					'<li><a href="'+ServerHTTP+'/freecatalog/">Free Catalog</a></li>'+
					'<li><a href="'+ServerHTTP+'/stores/">Find a Store</a></li>'+
			   '</ul>'+
			'</div>'+
			
			'<div class="col col1">'+
				'<img src="'+imageServer+'/images/footer/secure-shopping.gif" width="174" height="28" alt="Secure Shopping" />'+
				'<ul class="link-list">'+
					'<li><a href="'+ServerHTTP+'/custhelp/privacypolicy.htm" rel="nofollow">Privacy Policy</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/ordersecurity.htm" rel="nofollow">Order Security</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/terms.htm" rel="nofollow">Terms + Conditions</a></li>'+
					'<li><a href="'+ServerHTTP+'/promotions/lowestprice/lowestpriceguarantee.htm" rel="nofollow">Guaranteed Lowest Prices</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/productreturns.htm" rel="nofollow">Return Policy</a></li>'+
					'<li><a href="'+ServerHTTP+'/sitemap.htm">Site Map</a></li>'+
					'<li><a href="'+ServerHTTP+'/">Home</a></li>'+
					'<li><a href="'+ServerHTTP+'/gift-cards/">Gift Cards</a></li>'+
			   ' </ul>'+
			'</div>'+
			
			'<div class="col col1">'+
				'<img src="'+imageServer+'/images/footer/my-account.gif" width="174" height="28" alt="My Account" />'+
				'<ul class="link-list">'+
					'<li><a href="'+ServerHTTP+'/shop/tools/MyAccountView?storeId=6970" rel="nofollow">Account Updates</a></li>'+
					'<li><a href="'+ServerHTTP+'/shop/tools/OrderStatusInquiry?storeId=6970" rel="nofollow">Order Status</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/orderandpayment.htm" rel="nofollow">Order + Payment</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/shipping.htm" rel="nofollow">Shipping + Delivery</a></li>'+
					'<li><a href="'+ServerHTTP+'/shop/tools/NTE_WishlistTabView?storeId=6970&catalogId=4006970" rel="nofollow">Wish List</a></li>'+
					'<li><a href="'+ServerHTTP+'/credit/" rel="nofollow">Credit Options</a></li>'+
					'<li><a href="'+ServerHTTP+'/custhelp/" rel="nofollow">Help</a></li>'+
					'<li><a href="'+ServerHTTP+'/contactus/" rel="nofollow">Contact Us</a></li>'+
				'</ul>'+
			'</div>'+
			
			'<div class="col col1">'+
				'<img src="'+imageServer+'/images/footer/northern-sites.gif" width="174" height="28" alt="Northern Sites" />'+
				'<ul class="link-list">'+
					'<li id="kotulas-link"><a href="http://www.kotulas.com/" target="_kotulas"><img style="float:right;" src="'+imageServer+'/images/icons/kotulas.png" width="87" height="29" alt="Gifts + Gadgets at Kotulas.com" />Gifts, Gadgets + Unique Items at Kotulas.com</a></li>'+
					'<li><a href="http://projects.northerntool.com/?cm_sp=Social%20Media-_-Project%20Communities-_-Global%20Footer"><img style="float:right;" src="'+imageServer+'/images/icons/social-media-pc.gif" width="20" height="16" alt="View our Project Communities" />View our Project Communities</a></li>'+
					'<li><a href="http://www.facebook.com/pages/Northern-Tool-Equipment-Company/46415639449?cm_sp=Social%20Media-_-Facebook-_-Global%20Footer" target="_Facebook"><img style="float:right;" src="'+imageServer+'/images/icons/social-media-fb.gif" width="20" height="16" alt="Find us on Facebook" />Find us on Facebook</a></li>'+
					'<li><a href="http://twitter.com/NorthernTool?cm_sp=Social%20Media-_-Twitter-_-Global%20Footer" target="_Twitter"><img style="float:right;" src="'+imageServer+'/images/icons/social-media-tw.gif" width="20" height="16" alt="Follow us on Twitter" />Follow us on Twitter</a></li>'+
					'<li><a href="http://www.youtube.com/user/NorthernToolCo?cm_sp=Social%20Media-_-YouTube-_-Global%20Footer" target="_YouTube"><img style="float:right;" src="'+imageServer+'/images/icons/social-media-yt.gif" width="20" height="16" alt="Watch us on YouTube" />Watch us on YouTube</a></li>'+
					'<li><a href="'+ServerHTTP+'/mobile/"><img style="float:right;" src="'+imageServer+'/images/icons/mobile.gif" width="20" height="16" alt="Shop us on your mobile phone" />Shop us on your mobile phone</a></li>'+
					'<li><a href="'+ServerHTTP+'/espanol/ventas.htm">Espa&#241;ol</a></li>'+
				'</ul>'+
			'</div>'+
			
			'<div class="clear spacer6"></div>'+
			
			'<div class="col col4">'+
				'<div id="cc">'+
					'<img src="'+imageServer+'/images/footer/buy-online.gif" alt="Buy Online Or Call 1-800-221-0516" id="buy-online" />'+
					'<img src="'+imageServer+'/images/footer/payment-types.gif" width="245" height="24" alt="Visa, MasterCard, Discover, American Express, PayPal, Northern Gift Card, SmartPay" />'+
				'</div>'+
			
				'<div id="badges">'+
					'<a href="'+ServerHTTP+'/companyinfo/"><img src="'+imageServer+'/images/footer/30-years-in-business.gif" width="99" height="80" alt="30 Years in Business!"/></a>' +
					'<a class="pop-up" href="https://www.mcafeesecure.com/RatingVerify?ref=63.225.137.160" target="_blank" id="mcafee"><img id="mcafee-icon" width="65" height="37" src="//images.scanalert.com/meter/63.225.137.160/63.gif" alt="McAfee Secure sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee Secure is a Trademark of McAfee, Inc.\'); return false;"></a>' +
					'<a class="pop-up" href="https://seal.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.NORTHERNTOOL.COM&lang=en" target="_blank" class="last"><img src="'+imageServer+'/images/footer/verisignseal.gif" width="99" height="80" alt="Click to Verify"/></a>'+
				'</div>'+
			'</div>'+
        
        '</div>'+
    	'<div class="clear"></div>'+
        
		'<div class="col">&nbsp;</div>'+
        '<div id="copyright" class="col col4">'+
            '<p>Copyright &copy; 1996 - 2012 Northern Tool + Equipment Catalog Co. All Rights Reserved.</p>'+
        '</div>'+
	'</div>'+
'</div>');

//footer rvi
	var cookieValue = getCookie("rviState");
	if(cookieValue == null) {
		cookieValue = "show";
	}
	if($.returnCookie("rvi")) {
		document.write('<div class="clear"></div>');
		if(cookieValue == "show") {
			document.write('<div id="footer-rvi">');
		} else {
			document.write('<div id="footer-rvi" style="display:none;">');
		}
			document.write('<div id="footer-rvi-bug"><img src="/images/icons/footer-rvi-bug.gif" width="50" height="44" alt="Northern Tool + Equipment"></div>');
			document.write('<div id="footer-rvi-header"><img src="/images/icons/footer-rvi-header.gif" width="115" height="22" alt="Your Recently Viewed Items"></div>');

			$.returnCookie("rvi").slice(0,10).each(function(i){
				var thisCookie = this;

				document.write('<div class="footer-rvi-image"><a class="small" href="'+ServerHTTP+'/shop/tools/product_' + thisCookie[0] + '_' + thisCookie[0] + '">');
				document.write('<img src="/images/product/images/' + thisCookie[1] + '_med.jpg" width="34" height="34" alt="' + thisCookie[1] + '" title="View Product Details"><img class="large" src="/images/product/images/' + thisCookie[1] + '_med.gif" width="114" height="114" alt="' + thisCookie[1] + '" title="View Product Details"></a></div>');
			});
			
			document.write('<div id="footer-rvi-hide"><a href="javascript:void(0);" onclick="$(\'#footer-rvi-show\').show(); $(\'#footer-rvi-hide, #footer-rvi\').hide(); SetSessionCookie(\'rviState\', \'hide\', \'/\');"><img src="/images/buttons/btn3-hide.gif" width="48" height="16" alt="Hide" title="Hide My Recently Viewed Items"></a></div>');

		document.write('</div>');

		if(cookieValue == "show") {
			document.write('<div id="footer-rvi-show" style="display:none;"><a href="javascript:void(0);" onclick="$(\'#footer-rvi-show\').hide(); $(\'#footer-rvi-hide, #footer-rvi\').show(); SetSessionCookie(\'rviState\', \'show\', \'/\');"><img src="/images/buttons/btn3-show.gif" width="48" height="16" alt="Show" title="Show My Recently Viewed Items"></a></div>');
		} else {
			document.write('<div id="footer-rvi-show"><a href="javascript:void(0);" onclick="$(\'#footer-rvi-show\').hide(); $(\'#footer-rvi-hide, #footer-rvi\').show(); SetSessionCookie(\'rviState\', \'show\', \'/\');"><img src="/images/buttons/btn3-show.gif" width="48" height="16" alt="Show" title="Show My Recently Viewed Items"></a></div>');
		}
	}