//
// This file contains scripts that are nessary for the proper rendering and interaction of the Global Header and Footer Project.
//
// Contains scripts for WHY tooltip, MINI CART, USER, LOCALIZTION and LOCALIZATION POPUP
//

/*plugins
===================================*/

//thd.label-over.js v.1.0 - http://ext-dev.homedepot.com/development/homedepot/workbench/index.php/tools/#label-over
jQuery.fn.labelOver=function(e){return this.each(function(){var t=jQuery(this),n=t.attr("for"),r=jQuery("#"+n);if(n){this.hide=function(){t.css({textIndent:-1e4})};this.show=function(){if(r.val()===""){t.css({textIndent:0})}};r.focus(this.hide);r.blur(this.show);t.addClass(e).click(function(){r.focus()});if(r.val()!==""){this.hide()}}})}

var timeout;
function getHeaderStoreNum() {
    var locStoreStr = readCookie('THD_LOCSTORE');
    if (locStoreStr != null && locStoreStr.length != 0) {
        var sepLocStoreStr = locStoreStr.split('+');
    }
    var locStoreNum = sepLocStoreStr[0];
    if (locStoreNum != null) {
        return locStoreNum;
    }
}


function getHeaderLocalStore(type) {
    var storeFinderHref;
    var storeFinderUrl;
    var storeInfo;
    var localStoreMenu;
    var localStoreCompare;
    try {
        var storeZip = getTHDStoreZip();
        var storeNum = getHeaderStoreNum();
        var storeName = getTHDStoreName();
        var storeString = storeName + ' #' + storeNum;
    } catch (e) {
        var storeZip = '';
    }
    // This grabs the ZIP from utlis.js and sets a global VAR
    if (storeZip != '' && storeZip != '0') {
        //storeFinderHref = 'http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp#zip='+getTHDStoreZip();
        storeFinderHref = 'http://' + getHostNameNonSecure() + '/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053&zip=' + getTHDStoreZip();
        storeFinderUrl = '<a href='+storeFinderHref+' name="&lpos=d-header-store finder">Store Finder</a></li>';

        storeInfo = getTHDLocalStoreInfo();
        localStoreMenu = '<a class="thdOrange small" href="'+storeFinderHref+'" title="Change or update your local store"><i class="icon-localization-on"></i></a>Your Store: '+storeString+' <a class="thdOrange small" href="'+storeFinderHref+'" title="Change or update your local store"> (Change)</a>';
        localStoreCompare = 'Based on My Store Location: <a style="color:white;" href="' + storeFinderHref + '" title="Store Finder">' + storeString + '</a> (<a class="thdOrange b" href="' + storeFinderHref + '" title="Change or update your local store">Change</a>)';
    } else {
        storeFinderUrl = '<a href="http://'+getHostNameNonSecure()+'/StoreFinder/index.jsp" name="&lpos=d-header-store finder">Store Finder</a></li>';
        localStoreMenu = '<a class="thdOrange b" href="http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDStoreFinder?langId=-1&storeId=10051&catalogId=10053" title="Store Finder"><i class="icon-localization-off"></i>Select </a> Your Local Store <a class="smallGreyLink tooltip" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why">(Why?)</a>';
        localStoreCompare = '<a class="thdOrange b" href="' + storeFinderHref + '" title="Store Finder">Choose Your Local Store</a> <a class="tooltip" style="color:white;" title="In order to provide up to the minute updates on product pricing and availability at your local store, please select the store nearest to you." href="javascript:void(0);" title="Why?" id="why">(Why?)</a>';
    };
    $('#myStore').html(localStoreMenu);
    $('#navStoreFinder').html(storeFinderUrl);

    if (type === 'menu') {return localStoreMenu;}
    if (type === 'href') {return storeFinderHref;}
    if (type === 'compare') {return localStoreCompare;}
}

function getAccountMenu(loc) {
    var localUserMenu,
        accountMenu,
        thdMyAccount = $('#thdMyAccount'),
        accountInfo = $('#accountInfo');

    try {
        var userName = getTHDUserName();
    } catch (e) {
        var userName = '';
    }

    if(userName !== ''){
        localUserMenu = '<a href="javascript:goToTHDMyAccountFromJS();" ><span id="navUserName">Hello '+getTHDUserName()+', </span></a>';
        accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
        signInOut = '<li><p><a href="http://'+getHostNameNonSecure()+'/webapp/wcs/stores/servlet/THDLogoff?langId=-1&amp;storeId=10051&amp;catalogId=10053&amp;personalizedCatalog=true&amp;changeUser=true&amp;URL=HomePageView" class="thdMyAccountRegister" title="Sign Out">Sign Out</a></p></li>';
    }else{
        localUserMenu = '<a class="thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" title="">Sign In</a><span> or </span><a class="thdOrange b" href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" title="">Register</a>';
        accountMenu = '<a href="javascript:goToTHDMyAccountFromJS();" class="myAccount"  rel="nofollow">Your Account<i class="icon-carrot-grey-down"></i></a>';
        signInOut = '<li><a href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/LogonForm?langId=-1&storeId=10051&catalogId=10053&" class="btn-orange" title="Log in to your account">Sign In</a></li><li><p><a href="https://'+getHostNameSecure()+'/webapp/wcs/stores/servlet/UserRegistrationForm?langId=-1&storeId=10051&catalogId=10053&new=Y" class="thdMyAccountRegister" title="Get faster online checkouts, project and shopping lists and more">Register</a> for an account.</p></li>';   
        
    }

    accountInfo.html(localUserMenu+'<br>'+accountMenu);
    thdMyAccount.find('.linkList').append(signInOut);
    if (loc === 'user') { return localUserMenu;}
    if (loc === 'account') {return accountMenu;}
}

// Renders items from utils.js to display the MINI CART accordingly
function showCartBlock() {  
    if (cookieManager !== undefined || cookieManager !== null) {
        cookieManager.initializeMasterCookie();

        var itemsInCart = getTHDNumberItemsInCart();
        if (itemsInCart !== '0' && itemsInCart !== '') {
            if(itemsInCart > 999){
                $("#miniCartNum").text("999+");
            }else{
                $("#miniCartNum").text(itemsInCart);
            }
            $("#cart").addClass('btn-orange');
        }
    }
}

// Minified Hover Intent Plugin
(function(e){e.fn.hoverIntent=function(t,n){var r={sensitivity:7,interval:100,timeout:0};r=e.extend(r,n?{over:t,out:n}:t);var i,s,o,u;var a=function(e){i=e.pageX;s=e.pageY};var f=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(o-i)+Math.abs(u-s)<r.sensitivity){e(n).unbind("mousemove",a);n.hoverIntent_s=1;return r.over.apply(n,[t])}else{o=i;u=s;n.hoverIntent_t=setTimeout(function(){f(t,n)},r.interval)}};var l=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return r.out.apply(t,[e])};var c=function(t){var n=jQuery.extend({},t);var i=this;if(i.hoverIntent_t){i.hoverIntent_t=clearTimeout(i.hoverIntent_t)}if(t.type=="mouseenter"){o=n.pageX;u=n.pageY;e(i).bind("mousemove",a);if(i.hoverIntent_s!=1){i.hoverIntent_t=setTimeout(function(){f(n,i)},r.interval)}}else{e(i).unbind("mousemove",a);if(i.hoverIntent_s==1){i.hoverIntent_t=setTimeout(function(){l(n,i)},r.timeout)}}};return this.bind("mouseenter",c).bind("mouseleave",c)}})(jQuery)


function setCookie(c_name, value, domain) {
	var c_value = escape(value) +  ";domain=" + domain + ";path=/";	
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

/* PLP_loadPopup function load the pop up banner from globalHeadTop.html for the first time autolocalized scenario. and Auto localize failture scenario.*/



function loadBannerPopup() {
    var localized = true,
        strNbr = readCookie("THD_LOCSTORE"),
        autolocalizesession = readCookie("THD_AUTOLOCALIZED_SESSION"),
        thdSession = readCookie("THD_SESSION"),
        domain =  getPopupCurrentCookieDomain(),
        $nonLocBanner = $("#nonlocalizeBanner"),
        $locBanner = $("#localizeBanner");
    
//  if(domain.indexOf("http://") !== "-1"){domain = domain.replace("http://", "");} 

    if(strNbr !== null && strNbr !== "") {
        localized = true;
    }else {
        localized = false;
    }


    if(thdSession.indexOf("C37=1") != "-1" ){
        thdSession = thdSession.replace("C37=1", "C37=2");

        if(localized) {
            
    //      cookieManager.createCookie("THD_AUTOLOCALIZED_SESSION","2",null)
            $("#localizeBanner").fadeIn("slow");
            timeout = setTimeout(function(){
            $("#localizeBanner").fadeOut("slow");
            },5000);
            setCookie("THD_SESSION", thdSession, domain);
        }else{
            
    //      cookieManager.createCookie("THD_AUTOLOCALIZED_SESSION","2",null)
            $("#nonlocalizeBanner").fadeIn("slow");
            timeout = setTimeout(function(){
            $("#nonlocalizeBanner").fadeOut("slow");
            },5000);
            setCookie("THD_SESSION", thdSession, domain);
        }
    }
    



    $("body").delegate("#localizeBanner,#nonlocalizeBanner","click",function(e){
        var $target = $(e.target);

        if($target.hasClass("close_text") || $target.hasClass("orange_x")){
            $locBanner.fadeOut("slow");
            $nonLocBanner.fadeOut("slow");
        }
    }).click(function(e){
        var $target = $(e.target);

        if( $target.parent().is("#localizeBanner,#nonlocalizeBanner") || $target.hasClass("banner_input")){
            e.stopPropagation();
        }else{
            $locBanner.fadeOut("slow");
            $nonLocBanner.fadeOut("slow");
        }
    });
    
	$('#localizeBanner').mouseenter(function (e) {
	   	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
	
	$('#nonlocalizeBanner').mouseenter(function (e) {
	   	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
	
	$('#nonlocalizeplpZipCode1').mouseenter(function (e) {
	
       	if (timeout!=null){
		clearTimeout(timeout);
		}
    });
}

/*Top position for tophat localize and non-localize banner  */
$(window).load(function() {
    if (!$("body").hasClass("tophat")) {
        var bannerheight = (80+parseInt($('.tophat > div').height()))+"px";                                    
        $('#localizeBanner,#nonlocalizeBanner').css('top', bannerheight);
       
    }
	    loadBannerPopup();
});
/*Top position for tophat localize and non-localize banner */


function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName === 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}


function getDomain(){
	var currentdomain = window.location.hostname;
	var currentProtocal = window.location.protocol;
	currentdomain = currentProtocal + "//" + currentdomain  ;
	if (currentdomain.indexOf("secure.") != "-1"){currentdomain = currentdomain.replace("secure.", "");}
	if (currentdomain.indexOf("https") != "-1"){ currentdomain = currentdomain.replace("https", "http");}
	return currentdomain;
}

function validateBannerZip() {
    var zipValuenonLocal = document.getElementById("nonlocalizeplpZipCode1").value;
	window.open("http://"+getHostNameNonSecure()+"/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + zipValuenonLocal, "_self");
}

function validateBannerZiponKeypress(evt, thisobj) {
	if (timeout !== null){clearTimeout(timeout);}
    evt = (evt) ? evt : ((window.event) ? window.event : "")
    if (evt) {
        if (evt.keyCode === 13 || evt.which === 13) { validateBannerZip();}
    }
}

function changeStore() {
    var storeZip = getTHDStoreZip();
    window.open("http://"+getHostNameNonSecure() + "/StoreFinder/index.jsp" + "?URL=" + getRedirectUrlForStoreFinder(false, false, "", true) + "&address=" + storeZip, "_self");
}

//My Account URL Redirect
function goToMyAccountProfile(){
    var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=UserRegistrationUpdateForm&",
        registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/UserRegistrationUpdateForm?storeId=10051&langId=-1&catalogId=10053';
    goToLinkFromJS(nonRegisteredTHDMyAcctURL,registeredURL);
}

//My List URL Redirect
function goToMyLists(){
    var nonRegisteredTHDMyAcctURL = THDLogonCmd + "URL=InterestItemDisplay&",
        registeredURL = 'https://' + getHostNameSecure() + '/webapp/wcs/stores/servlet/InterestItemDisplay?catalogId=10053&storeId=10051&ddkey=https:THDInterestItemVerify';
    goToLinkFromJS(nonRegisteredTHDMyAcctURL,registeredURL);
}

// Gets called after DOM is ready
$(function () {
    //localize popUP
    getHeaderLocalStore('href');
    getAccountMenu('account');
    showCartBlock();

    

	/*Ipad flyout hiding fix*/
		$("ul#hd-deptNav li .item").removeClass("active"); 
	/*Ipad flyout hiding fix*/

    //Checks to see which is cliked then pushes page as necessary
    $("#thdMyAccount").delegate("a","click",function(e){
        var $target = $(e.target),
            accountProfile = $target.hasClass("accountProfile"),
            ordersPurchases = $target.hasClass("ordersPurchases"),
            myList = $target.hasClass("myList"),
            projectGuides = $target.hasClass("myProjectGuides"),
            creditCenter = $target.hasClass("myProjectGuides");

        if(accountProfile){
            e.preventDefault();
            goToMyAccountProfile();

        }else if(ordersPurchases){
            e.preventDefault();
            goToOrderStatusFromJS();

        }else if(myList){
            e.preventDefault();
            goToMyLists();

        }else if(projectGuides){
            e.preventDefault();
            goToTHDMyProjectsFromJS();

        }else if(creditCenter){
            e.preventDefault();
            goToTHDMyCreditFromJS();
        }
    });

  

    // displays the header WHY tooltip mouseover		
    $('#why').mouseover(function(e){
        //xOffset = 348;
        var yOffset = 15;

        if ($('#whyToolTip').length == '0') {
            $('body').append('<div id="whyToolTip"></div>');
            var whyTip = $('#whyToolTip');
            var text = this.title;
            whyTip.text(text);
            this.title = '';
            var whyOffset = $('#why').offset();
            var whyTop = whyOffset.top;
            var whyLeft = whyOffset.left;
            var leftPos = whyLeft;
            var topPos = whyTop + yOffset;
            whyTip.css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
        } else {
            var whyOffset = $('#why').offset();
            var whyTop = whyOffset.top;
            var whyLeft = whyOffset.left;
            var leftPos = whyLeft;
            var topPos = whyTop + yOffset;
            $('#whyToolTip').css('top', topPos + "px").css("left", leftPos + 'px').fadeIn('fast');
        }
    });
    $('#why').mouseout(function(){
        $('#whyToolTip').fadeOut('fast');
    });

    //Hover Intent Settings
    $("#hd-deptNav").find(".item").hoverIntent({
        sensitivity: 70, // number = sensitivity threshold (must be 1 or higher)
        interval: 150, // number = milliseconds of polling interval
        over: showFlyout, // function = onMouseOver callback (required)
        timeout: 150, // number = milliseconds delay before onMouseOut function call
        out: hideFlyout // function = onMouseOut callback (required)
    });

    function showFlyout(){ $(this).addClass('active'); }
    function hideFlyout(){ $(this).removeClass('active'); }
	
	/* for header search box, this removes error text on focus. This cannot go in 
	utils.js with other header search stuff because jquery is loaded after.
	var searchFieldText is in utils.js
	9-13-2012 Search Project.
	*/
	function SearchErrorFunction() {
		var $searchFocus = $('#searchFocus');
		$searchFocus.focus(function(){
			if($searchFocus.val()==searchFieldText) {
				$searchFocus.val('');
			}
		});
	}
	SearchErrorFunction();

   //SEARCH BLOCK JAVASCRIPT
    $('#searchFocus').keydown(function(e){
        if (e.keyCode == 13){
            var btn = document.getElementById('searchButton');
            if (btn){
                btn.click();
                return false;
            }
        } 
    });

    $("#searchButton").click(function(){  
        //validateSearchRequest(document.searchBoxForm.keyword,searchUrl);
        var formActionURL, strSearchValue;
         
        strSearchValue = $("#searchFocus").val(); 
        strSearchValue = strSearchValue.replace(/^\s+|\s+$/g,'');

            if(strSearchValue !== '' && strSearchValue !== 'Enter Keyword or SKU'){
                try{ lpAddVars('session','SearchKeyword', strSearchValue); }catch(err){}
                    //Check if the user selected any category.
                    var category_name = $("#list .btn span").text(); //get the selected category from the dept-drown li#list a span.
                    var selectedCategory = $.trim(category_name);
                    
                    if(selectedCategory.indexOf("&") >= 0){
                        selectedCategory = selectedCategory.replace(/ /g,'');
                        var newCategoryname = selectedCategory.split("&");
                        selectedCategory = newCategoryname[0]+'+'+encodeURIComponent("&")+'+'+newCategoryname[1];
                    }else{
                        selectedCategory = selectedCategory.replace(/ /g,'+');
                    }

                   category_name = $.trim(category_name);              
                   category_name = category_name. toUpperCase();

                   //Populating the values from the hidden field to the local variable
                   
                   var selectedVal = document.getElementById('encodedNVal').value;/*pxk8554*/
                   
                  if(category_name !== "SEARCH ALL"){
                        
                        var category_value = "5yc1vZ"+selectedVal;
                        var omnivalue = encodeURIComponent(encodeURIComponent(encodeURIComponent(category_name))); //Triple encoding
                        
                        if(category_name.indexOf("&")>=0){
                            category_name = category_name.replace(/ /g,'');
                            category_name = category_name.replace(/&/g,'-');
                        }else{
                            category_name = category_name.replace(/ /g,'-');
                        }
                        
                        var encodedKeyWord = encodeURIComponent(encodeURIComponent(strSearchValue));//Double Encoding if contains & symbol
                        var host_name = searchUrl.substring(0,searchUrl.indexOf("/webapp"));//searchUrl is a global variable set through the JSP file above the dept-search block
                        var urlParams = 'keyword='+ encodeURIComponent(strSearchValue)+'&Ns=None&Ntpr=1&Ntpc=1&selectedCatgry='+selectedCategory+'&omni='+omnivalue+'&langId=-1&storeId=10051&catalogId=10053';
                        formActionURL = host_name +"/"+category_name+"/h_d1/N-"+category_value+"/Ntt-"+encodedKeyWord+"/searchNav-true/h_d2/Navigation?"+urlParams;
                    }else{    
                        var urlParams = 'keyword='+ encodeURIComponent(strSearchValue)+'&Ns=None&Ntpr=1&Ntpc=1&selectedCatgry='+ selectedCategory;
                        formActionURL = searchUrl+urlParams;
                    }
                    
                    window.location.href = formActionURL;
                    return false;
            }else{
                $("#lblSearch").text("Enter Keyword or SKU");
                return false;
            } 
    });

    /*when a category is selected from the drop down
      1) the text of the category should be displayed in the search head.
      2) the drop down has to be hiiden
    */
    $("ul#dept-list").delegate("a", "click", function(e){
        e.preventDefault();

        var $this = $(this), 
            intIndex = $this.index(),
            strCategory = $this.text(),
            iWidthSearchTextBox,            
            iTotalSearchBlockWidth = 416,
            ibuttonWidth = 45,
            iWidthDeptDropdown;

        //add category name
        $("#list span").text(strCategory); 
        //Populating the values in the hidden fields for the breadcrumbs
        document.getElementById('encodedNVal').value=$this.attr('id');/*pxk8554*/
        //calcualte the width
        iWidthDeptDropdown = $("#dept-dropdown").width();                
        //calculate the input control width
        iWidthSearchTextBox = iTotalSearchBlockWidth - ibuttonWidth - iWidthDeptDropdown;  
        //apply the width
        $("#searchFocus").width(iWidthSearchTextBox);   
    });

    //remove search label plugin
    $("form label.labelRemove").labelOver('over-apply');
});

//end search releated js

function getRedirectUrlForStoreFinder(removeBrowseOptionVar, removeProductCompareVar, browseOptionValue, bannerFlag) {
    var storeFinderRedirect = window.location.href;

	if(storeFinderRedirect.indexOf("?") == "-1"){storeFinderRedirect += "?";}
    if(removeBrowseOptionVar) {storeFinderRedirect = removeBrowseOption(storeFinderRedirect);}
    if(removeProductCompareVar) {storeFinderRedirect = removeRecordCompare(storeFinderRedirect);}
    if(browseOptionValue !== null && browseOptionValue !== "") {storeFinderRedirect = storeFinderRedirect + "&browsestoreoption=" + browseOptionValue;}
    if(bannerFlag){storeFinderRedirect = storeFinderRedirect + "&fromAutolocaliseBanner=true";}
    // Double encoding to avaoid special characters like +, #.
    return encodeURIComponent(encodeURIComponent(storeFinderRedirect.replace('#', '&#')));
}

/************************* End of Search functionality**************************************************************************/