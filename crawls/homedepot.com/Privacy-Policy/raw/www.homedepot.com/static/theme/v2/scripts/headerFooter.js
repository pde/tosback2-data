//
// This file contains scripts that are nessary for the proper rendering and interaction of the Global Header and Footer Project.
//
// Contains scripts for WHY tooltip, MINI CART, USER and LOCALIZATION
//

function getHeaderStoreNum(){
	var locStoreStr = readCookie('THD_LOCSTORE');
	if(locStoreStr != null && locStoreStr.length != 0) {
		var sepLocStoreStr = locStoreStr.split('+');
	}
	var locStoreNum = sepLocStoreStr[0];
	if (locStoreNum != null){
		return locStoreNum;
	}
}


function getHeaderLocalStore(type){
	var storeFinderHref;
	var storeInfo;
	var localStoreMenu;
	try {
		var storeZip = getTHDStoreZip();
		var storeNum = getHeaderStoreNum();
		var storeName = getTHDStoreName();
		var storeString = storeName+' #'+storeNum;
	} catch(e){
		var storeZip = '';
	}
	// This grabs the ZIP from utlis.js and sets a global VAR
	if (storeZip != '' && storeZip != '0') {
		// Live StoreFinder Link.
		storeFinderHref = 'http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp#zip='+getTHDStoreZip();

		// QA StoreFinder Link
		//storeFinderHref = 'http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053&zip='+getTHDStoreZip();

		storeInfo = getTHDLocalStoreInfo();
		localStoreMenu = '<li>My Store Location: <a class="thdOrange b" href="'+storeFinderHref+'" alt="Store Finder">'+storeString+'</a> <a class="smallGreyLink" href="'+storeFinderHref+'" alt="Change">(Change)</a></li>';
	} else {

		// Live StoreFinder Link.
		storeFinderHref = 'http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp';
		
		// QA StoreFinder Link
		//storeFinderHref = 'http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053';

		localStoreMenu = '<li><a class="thdOrange b" href="'+storeFinderHref+'" alt="Store Finder">Choose Your Local Store</a> <a class="smallGreyLink tooltip" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" alt="Why?" id="why">(Why?)</a></li>';
	};
	if(type === 'menu'){
		return localStoreMenu;
	}
	if(type === 'href'){
		return storeFinderHref;
	}
}

function getAccountMenu(loc){
	var localUserMenu;
	var accountMenu;
	try {
		var userName = getTHDUserName();
	} catch(e){
		var userName = '';
	}
	if (userName != '') {
		localUserMenu = '<li>Hello, <a class="thdOrange b" href="javascript:goToTHDMyAccountFromJS();" alt="">'+getTHDUserName()+'</a> <a class="smallGreyLink" href="http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDLogoff?langId=-1&amp;storeId=10051&amp;catalogId=10053&amp;personalizedCatalog=true&amp;changeUser=true&amp;URL=HomePageView" alt="Sign Out">(Sign Out)</a></li>';
		accountMenu = '<li class="end"><a href="javascript:goToTHDMyAccountFromJS();" alt="My Account" rel="nofollow">My Account</a></li>';
	} else {
		localUserMenu = '';
		accountMenu = '<li class="end"><a href="javascript:goToTHDMyAccountFromJS();" alt="My Account" rel="nofollow">My Account</a> <span class="smallGreyLink">(<a class="smallGreyLink" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" alt="Sign in">Sign in</a> or <a class="smallGreyLink" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" alt="Register">Register</a>)</span></li>';
	};
	if(loc === 'user'){
		return localUserMenu;
	}
	if(loc === 'account'){
		return accountMenu;
	}
}

// This is for the EMAIL input in the footer, carried over form 5.6
function popup() {
    var url = 'https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/THDEmailSignUpAddCmd?langId=-1&storeId=10051&catalogId=10053&URL=EmailSignUpView&subscrType=' + document.emailsub.subscrType.value + '&emailInput=' + document.emailsub.emailInput.value + '&formName=emailsub';
    var winWidth = 350;
    var winHeight = 150;
    var winY, winX = 0;
    if (screen.width > winWidth && screen.height > winHeight) {
        winX = (screen.width - winWidth) / 2;
        winY = (screen.height - winHeight) / 2;
    }
    var winOptions = 'location=0,scrollbars=0,menubar=0,toolbar=0,status=0,resizable=1,directories=0,width=' + winWidth + ',height=' + winHeight + ',top=' + winY + ',left=' + winX;
    var windowToOpen = window.open(url, "windowToOpen", winOptions);
    window.top.name = 'opener';
    if (windowToOpen) {
        windowToOpen.focus();
    }
    document.emailsub.emailInput.value = '';
}

// Renders items from utils.js to display the MINI CART accordingly
function showCartBlock() {
	var itemsInCart = getTHDNumberItemsInCart();
	if (itemsInCart != '0' && itemsInCart != '') {
		$("#miniCartNum").html(itemsInCart);
		$("#miniCart").css('background-position','bottom');
	}
}

// Gets called after DOM is ready
$(document).ready(function(){
		
	// displays the header WHY tooltip mouseover		
	$('#why').mouseover(function(e){
		xOffset = 348;
		yOffset = 14;
		if($('#whyToolTip').length == '0'){
			$('body').append('<div id="whyToolTip"></div>');
			var whyTip = $('#whyToolTip');
			var text = this.title;
			whyTip.text(text);
			this.title = '';
			var whyOffset = $('#why').offset();
			var whyTop = whyOffset.top;
			var whyLeft = whyOffset.left;
			var leftPos = whyLeft - xOffset;
			var topPos = whyTop + yOffset;
			whyTip.css('top',topPos + "px").css("left",leftPos + 'px').fadeIn('fast');
		} else {
			var whyOffset = $('#why').offset();
			var whyTop = whyOffset.top;
			var whyLeft = whyOffset.left;
			var leftPos = whyLeft - xOffset;
			var topPos = whyTop + yOffset;
			$('#whyToolTip').css('top',topPos + "px").css("left",leftPos + 'px').fadeIn('fast');
		}
	});
	$('#why').mouseout(function(){
		$('#whyToolTip').fadeOut('fast');
	});
});