jQuery(document).ready(function() { 
	
	/* SHIPPING PAGE */
	jQuery("#right-content table td table td img[src$='POLO_helpdesk_custasst.gif']").parent().parent().parent().parent().parent().attr('class', 'customerAssitance');
	jQuery("#right-content table td.hdsubheader").parent().parent().parent().attr('class', 'shipping');
	jQuery("#right-content table td img[src$='POLO_helpdesk_shipping.gif']").parent().attr('class', 'shippingTitle');
	jQuery("#right-content table td img[src$='POLO_helpdesk_shipping.gif']").attr('class', 'shippingIMG');
	jQuery("#right-content table td img[src$='POLO_helpdesk_shipping.jpg']").parent().attr('class', 'shippingIMG');
	jQuery("#right-content table td table td a.hdNav:contains('My Account')").parent().parent().parent().parent().parent().attr('class', 'lastTD');
	jQuery("#right-content table td img[src$='pixel.gif']").remove();	
	
	/* RETURNING */
	jQuery("#right-content table td img[src$='POLO_helpdesk_return.gif']").parent().attr('class', 'returningTitle');
	jQuery("#right-content table td img[src$='POLO_helpdesk_return.gif']").attr('class', 'shippingIMG');
	jQuery("#returns #right-content table.shipping td table td a:contains('CustomerAssistance@RalphLauren.com')").parent().parent().parent().parent().parent().attr('class', 'lastTD');
	jQuery("#returns #right-content table.shipping td:last").removeAttr('class');
		
	/*SHOPPING AND PAYMENT */
	jQuery("#right-content table td img[src$='POLO_helpdesk_shoppmt.gif']").parent().attr('class', 'shopPayment');
	jQuery("#right-content table td img[src$='POLO_helpdesk_shoppmt.gif']").attr('class', 'shippingIMG');
	jQuery.each(jQuery.browser, function(i, val) {
		if (i == "msie"){
		   jQuery("#checkout #right-content table.shipping td ol").attr('class', 'iePromo');
		}
	});
	
	/* OUR PRODUCTS */
	jQuery('img[src$=\'helpdesk_products.gif\']').parent().addClass('hd-our-products');
	jQuery('td[height=34][colspan=2] img:eq(1)').addClass('shippingIMG');
	jQuery('img[src$=\'helpdesk_products.gif\']').addClass('shippingIMG');
	jQuery('td[rowspan=3][valign=top]').remove();
	jQuery('.hdsubheader:last').parent().next().next().children().addClass('lastTD');
	
	/* GIFT SERVICES  */
	jQuery('img[src$=\'helpdesk_giftserv.gif\']').addClass('shippingIMG');
	jQuery('img[src$=\'helpdesk_giftserv.gif\']').parent().addClass('hd-gift-services');
	jQuery('a[href$=\'categoryId=4105824\']').addClass('a-gift');
	
	/* ACCOUNT INFORMATION  */
	jQuery('img[src$=\'helpdesk_acctinfo.gif\']').addClass('shippingIMG');
	jQuery('img[src$=\'helpdesk_acctinfo.gif\']').parent().addClass('hd-account-info');
	jQuery('a[href=\'#top\']').addClass('hdNav');
	
	/* PRIVACY POLICY	*/
	jQuery('img[src$=\'privsec_091905.gif\']').addClass('shippingIMG');
	jQuery('img[src$=\'privsec_091905.gif\']').parent().addClass('hd-privacy-policy');
	jQuery('#right-content table.shipping p[style$=\'bold;\']').addClass('p-bold');
	
	/* TERMS OF USE PAGE */
	jQuery("#right-content table td img[src$='POLO_helpdesk_terms_091905.gif']").parent().attr('class', 'termsTitle');
	jQuery("#right-content table td img[src$='POLO_helpdesk_terms_091905.gif']").attr('class', 'shippingIMG');	
	jQuery("#right-content table td img[src$='POLO_helpdesk_privsec.jpg']").parent().attr('class', 'shippingIMG');
	jQuery("#right-content table td table td p b:contains('How to Contact Us')").parent().parent().parent().parent().parent().parent().attr('class', 'lastTD');
	
	/*TECH FAQS */
	jQuery("#right-content table td img[src$='POLO_helpdesk_faq2.gif']").parent().attr('class', 'techFAQSTitle');
	jQuery("#right-content table td img[src$='POLO_helpdesk_faq2.gif']").attr('class', 'shippingIMG');
	
	/*FAQS */
	jQuery("#right-content table td img[src$='POLO_helpdesk_faq1.gif']").parent().attr('class', 'FAQSTitle');
	jQuery("#right-content table td img[src$='POLO_helpdesk_faq1.gif']").attr('class', 'shippingIMG');
	jQuery("#buyer #right-content table.shipping ol li a.hdNav:contains('Sign up for PayPal')").attr('class', 'payPal');
});