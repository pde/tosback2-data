





var chat_switch = "ON";
var chat_open_time = "08:00";
var chat_closed_time = "20:00";
var chat_open_days = "23456";
		
function chatActive(dateStamp) {
	var pass = 'false';
	var daylen = 1440; // 1440 mins in a day.
	var hourlen = 60; // 60 mins in an hour
	if (chat_switch.toUpperCase() == "ON") {
		var daysarray = chat_open_days.split('');
		var chat_open_time_array = chat_open_time.split(':');
		var chat_closed_time_array = chat_closed_time.split(':');
		var starttime = (parseInt(chat_open_time_array[0],10) * hourlen) + parseInt(chat_open_time_array[1],10);
		var worklen = ((parseInt(chat_closed_time_array[0],10) * hourlen) + parseInt(chat_closed_time_array[1],10)) - starttime;
		var mydate = new Date(dateStamp);
		var myminutes = (mydate.getDay() * daylen) + (mydate.getHours() * hourlen) + mydate.getMinutes();
		for (var currentday in daysarray) {
			var calcday = parseInt(daysarray[currentday]) - 1;
			if (myminutes >= (starttime + (daylen * calcday)) && myminutes <= (starttime + (daylen * calcday) + worklen)) {
				pass = 'true';
				break;
			}
	            }
		}
	return pass;
		}
	
	
	var propertyValues = new Object;
	propertyValues = ( {
	
	timeStamp: 1334476801616,
	
	cartOverLayFlag: 'ON',
	addToCartErrorMessage:'We are unable to process your request at this time.Please close this window and try again.',
	addToCartTimeOutMessage:'We may encounter an error while adding items to cart. Please view your cart for details.',
	waitMessage:'Please wait while we add the items to your cart.',

		
        loading: 'Loading...',

		
        logout: 'Log out',

		
		login: 'Log in',		
        
		
		welcomedefaultloggedin: 'You are logged in.',
		
		
		welcomeuserloggedin: '<b>Welcome</b>, {0}',		
		
		
        closewindow: 'Close Window',

		
        ajaxTimeout: 10000,

		
		flyoutTimeoutOpenMS: 200,
		flyoutTimeoutCloseMS: 1000,		
		flyoutPreloadMaxIndex: 3,	
		homePageFlyoutAjaxSwitch: 'OFF',
		nonHomePageFlyoutAjaxSwitch: 'ON',		
	
		
        previous: '&laquo; Previous',
        next: 'Next &raquo;',

		
        carouselitemcounter: '{0}-{1} of {2} items',
        carouselitemtotal: '{0} of {0} items',

		
        expand: 'Expand to See All',
        collapse: 'Collapse',

		
        addtocart: 'Add to Cart',
        
		
        s7secure: 'https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com',
        s7kiosksecure: 'https://origin-d5.scene7.com',
        s7nonsecure: 'http://s7d5.scene7.com',
	
		
        s7path: '/is/image/Staples/{0}_sc7',
        s7reddotpath: '/is/image/Staples/reddot?{3}&$imgsrc={0}&$headline=SAVE&$symbol=%24&$dollars={1}&$cents={2}',

		
		reviewsMasterSwitch: 'ON',	
		
		
		reviewsFeaturedItemsThreshold: '10',
		
		
		checkoutExclusionPages: 'yourorder,shippinginfo,paymentinfo,revieworder,orderconf,orderconfprnt,kioskexpresscheckout,kioskrevieworder,checkoutenteraddress,checkoutreviewandpay',
		
		
	isChatOpen: chatActive('Apr 15, 2012 12:16:27'),
		masterChatSwitch: 'ON',
		showChatOnSku: 'ON',
		showChatOnHome: 'ON',
		
		
	cmSwitch: 'OFF',	

		
	analyticsSwitch: 'ON',

		
	searchAutocomplete: 'ON',

		
	flyoutCmsp: 'merchandising-_-Flyout {0}-_-{1}',
	flyoutAnalytics: 'Flyout:{0}:{1}',	

		
	samHeaderMakestartpageSwitch: 'ON',
	samHeaderShowuserdataSwitch: 'ON',

	
	
	ajaxLoggingSwitch: 'ON',
	personalizationSwitch: 'ON',	
		
	
	ajaxPerformanceSwitch: 'OFF',
	
	paginateAjaxErrorString: 'The last pagination operation failed.',
	filterAjaxErrorString: 'The last filter operation failed. ',  
	sortAjaxErrorString: 'The last sort operation failed.',
	
	
	compAjaxErrorString: 'The last operation failed.'
    } );

