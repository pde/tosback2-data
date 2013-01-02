
	
	
	
	
	
	var isCookieCreated = false,
	cookieHeader = "";


function isInternational() {
        var data, flag = false;
        
        if ($('body').is('.kmart')) {   
            return false;  // only applies to Kmart   
        }
    
        
        if (typeof intShipFlgSwitch !== 'undefined' && intShipFlgSwitch === 'TRUE') {
            data = FED.Util.getCountryData();
            if (data && typeof data.countryCode !== 'undefined' && data.countryCode !== 'US') {
                flag = true;
            }
        }
        return flag;
    }

function createIframe(d){
	var iframe = d.body.appendChild(d.createElement('iframe'));
	iframe.id = "casSeoIframe";
	//iframe.onload = "javascript: checkLogon();";
	document.getElementById('casSeoIframe').onload=checkLogin;
	doc = iframe.contentWindow.document;
	doc.open().write('');
	doc.close(); //iframe onload event happens
	
	var casUrl = $('input[name = casUrl]').val();	
	
	iframe.frameborder = "0";
	iframe.width = "0px";
	iframe.height = "0px";
	iframe.src=casUrl;
}



 function checkLogin()
      {
      		username = "";
      		cartTotalItems = "";
		cartTotalPrice = "";
		sywrM = "";
		sywrP = "";
		sywrT = "";
	      	if($.cookie('s_r') == 's_r_Y'){
		    var storeId= $('input[name = storeId]').val();
		    var attributeIdVal = $('body').attr('id');
			
			
				if(storeId == '10153' || storeId == '10151' || storeId == '10156'|| storeId == '10165')
				{
					if((["subcategory ", "keysearch", "product", "compare"].indexOf(attributeIdVal) >= 0) && (storeId == '10153' || storeId == '10151'))
					{
						location.href = location.href;
						
					}
					else
					{
						readAkamaiCookie();  
						if (isCookieCreated){
								if (cookieHeader[1] !== null) {
									username=cookieHeader[1];
								}
								if (cookieHeader[2] !== null) {
									cartTotalItems=cookieHeader[2];
								}
								if (cookieHeader[3] !== null) {
								 	cartTotalPrice=cookieHeader[3];
								}
								if (cookieHeader[5] !== null) {
								 	sywrM=cookieHeader[5];
								}
								if (cookieHeader[6] !== null) {
									 sywrP=cookieHeader[6];
								}
								if (cookieHeader[7] !== null) {
							  		sywrT=cookieHeader[7];
							 	}
						 
						  	 createSignInHTML(username,cartTotalItems,cartTotalPrice,sywrM,sywrP,sywrT);
						}
				
						if (typeof sywrEpsAkCookieProd === 'function') {
								sywrEpsAkCookieProd();
						}
						if(storeId == '10153' || storeId == '10151')
						{
							// spu repainting
							$('#loc_shcModal-closer').click();
							onLogin();
						}
					}
				}
				else if(storeId == '10154' || storeId == '10155')
				{
					repaintOtherStores(storeId);
				}
			}
      }

   

function repaintOtherStores(storeId)
{
	var loginText		='';
	var signIn			='';
	var Register		='';
	var myProfile		='';
	var logOff			='';
	var usernameDisplay	='';
	
	var MyprofileURL	= $('input[name = MyprofileURL]').val();
	var LogoffURL		= $('input[name = LogoffURL]').val();
	var LogonFormURL	= $('input[name = LogonFormURL]').val();
	var AccountViewURL	= $('input[name = AccountViewURL]').val();
	var loginHeaderMsg= '';
	
	if(storeId == '10155')
	{
		loginHeaderMsg = 'Welcome to your Garage of Knowledge';
	}
	else if(storeId == '10154')
	{
		loginHeaderMsg = 'Welcome to Kenmore.com ';
	}
	
	var userNameCookieValue=$.cookie("s_u");
	var usrId = $('input[name = userId]').val();
	var usrType = $('input[name = userType]').val();
	if (!!userNameCookieValue  && userNameCookieValue !== undefined  && userNameCookieValue !== "s_u"){
			if(storeId != "10154"){
			myProfile=" <a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=" + MyprofileURL + "> [My Profile]</a></span>";
			logOff="<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href="+ LogoffURL +"> [Log out]</a>";
			} else {
				logOff="<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href="+ LogoffURL +">| Log out</a>";
			}			
			loginText="<span id=\"checkForLogin\">" + userNameCookieValue + ", " + loginHeaderMsg  + myProfile + logOff;
			
			$('div#checkForLoginDiv').html(loginText);
		}
		else if(usrId != undefined && usrId != '-1002' && usrType != undefined && usrType == 'R'){
					//Making an Ajax call to fetch the display Name. Added a new parameter akamaiFlow to the call.
					var tempUrl = "/shc/s/GetMiniCartLoginAjax?storeId="+strId+"&shcapiBypassSSO=true"+"&akamaiFlow=false";
						 
					$.getJSON(tempUrl,function(data){
						if (data.login !== null) {
							userNameCookieValue = data.login;
					}
					if(storeId != "10154"){
						myProfile=" <a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=" + MyprofileURL + "> [My Profile]</a></span>";
						logOff="<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href="+ LogoffURL +"> [Log out]</a>";
					} else {
						logOff="<a onclick=\"trackClickAction(this, 'Logout', 'Logout');\" href="+ LogoffURL +">| Log out</a>";
					}			
					loginText="<span id=\"checkForLogin\">" + userNameCookieValue + ", " + loginHeaderMsg  + myProfile + logOff;
					
					$.cookie("s_u", userNameCookieValue, {path: '/'});
					$('div#checkForLoginDiv').html(loginText);
					
				});				
		} 
		else{
			signIn="Welcome, <a onclick=\"trackClickAction(this, 'Sign In', 'Sign In');\" href=\"javascript:fnShowLoginModal('LOGIN','" + LogonFormURL + "&screenName=LOGIN');\">sign in </a>";
			Register="<a onclick=\"trackClickAction(this, 'Register', 'Register');\" href=\"javascript:fnShowLoginModal('REG','" + LogonFormURL + "&screenName=REG');\">register </a></span>";
			if(storeId != "10154"){
			myProfile="<a onclick=\"trackClickAction(this, 'Profile', 'Profile');\" href=\"javascript:fnShowLoginModal('PROFILE','" + AccountViewURL + "&screenName=PROFILE');\">[My Profile]</a>";
			} 
			loginText="<span id=\"checkForLogin\">" + signIn + "or " + Register + myProfile;
			
			$('div#checkForLoginDiv').html(loginText);
			
		}
}
 
 
(function(d){
   if(!isInternational()){
  var s_sd = 'N';
  if($.cookie('s_sd') == 's_sd'){
  	s_sd = 'Y';
  }
  var secureReq = $('input[name = secureReq]').val();
  var preCasAssertion = $('#preCASAssertionVal').val();
 
  if(s_sd != 'Y' && secureReq != 'Y'){
	  createIframe(d);
	  if(preCasAssertion == 'ON'){
	  	$.cookie('s_sd','s_sd');
	  }
  }
 }
 })(document);