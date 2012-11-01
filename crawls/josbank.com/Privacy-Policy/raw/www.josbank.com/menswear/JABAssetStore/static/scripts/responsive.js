
if( (document.location.href.indexOf("Home_")!= -1) || 
		(document.location.href.indexOf("SubCategory_")!= -1) || 
		(document.location.href.indexOf("Product_")!= -1) || 
		(document.location.href.indexOf("CheckoutShoppingCartView")!= -1) ||
		(document.location.href.indexOf("CheckoutLoginFormView")!= -1) ||
		(document.location.href.indexOf("CheckoutShippingView")!= -1) ||
		(document.location.href.indexOf("CheckoutPaymentView")!= -1) ||
		(document.location.href.indexOf("OrderOKView")!= -1))  
{
	
	document.write('<script type="text/javascript"'
		+'src="'+((location.protocol=='http:')?'http:':'https:')
		+'//'+respScript+'"></scr'+'ipt>');			
}
