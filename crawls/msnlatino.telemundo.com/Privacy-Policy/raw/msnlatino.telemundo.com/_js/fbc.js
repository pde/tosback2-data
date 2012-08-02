/*
 * Facebook Connect JS functions
 * 
 * 
 */

var fbConnected = false;
var loggedInStateChecked = false;
var checkUserExistence = true;
var onConnectedFunction = '';
var nbcudps_contestFlag = false;
var serverLoggedInState = "false";

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// getRefresh - used to add a unique number at the end of the url to prevent page caching
function getRefresh()
{
	return new Date().getTime();
}

// @TODO: hook into current Telemundo logout script
function sn_logOut_bkp()
{
	var url = '';
	if (fbConnected)
	{
		url = '/registro?act=logout&refresh=' + getRefresh();
		if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
			url += '&redirectUrl='+redirectToLogin;
		}
		FB.logout();
		window.location.href = url;
	}
	else if (typeof getFBconnectedState == "function")
	{ 
		if (getFBconnectedState() == "Y")
		{
			url = '/registro?act=logout&refresh=' + getRefresh();
                	if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
                        	url += '&redirectUrl='+redirectToLogin;
                	}	

			FB.logout();
			window.location.href = url;
		}
		else 
		{
			url = '/registro?act=logout&refresh=' + getRefresh();
                	if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
                        	url += '&redirectUrl='+redirectToLogin;
                	}

			window.location.href = url;
		}
	}
	else
	{
		url = '/registro?act=logout&refresh=' + getRefresh();
                if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
                        url += '&redirectUrl='+redirectToLogin;
                }

		window.location.href = url;
	}
}

function sn_logOut() {
        var url = '';
	redirectUrl = '';
	FB.getLoginStatus(function(response) {
		if (response.authResponse) {
        		FB.logout(function(response) {
               			url = '/registro?act=logout&refresh=' + getRefresh();
                		if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
                        		url += '&redirectUrl='+redirectToLogin;
                		}
                		// user is now logged out
                	//	window.location.href = url
				redirectUrl = url;
				register_popup(redirectUrl);
        		});	
		} else {
                	url = '/registro?act=logout&refresh=' + getRefresh();
                	if (typeof redirectToLogin != "undefined" && redirectToLogin != '') {
                        	url += '&redirectUrl='+redirectToLogin;
                	}
                	// user is now logged out
                	//window.location.href = url
			redirectUrl = url;
			register_popup(redirectUrl);
		}
	});
	//return redirectUrl;
}


function initUser()
{

}

function refreshXFBML()
{
    
       
        		setTimeout("FB.XFBML.parse()", 0);
        	
   
}

function refreshXFBMLnow()
{
	
        
        	setTimeout("FB.XFBML.parse()", 0);
        
  
}

function refreshXFBMLElement(refreshElement)
{
    
        var fbElement = FB.XFBML.Element(refreshElement);
        FB.XFBML.Host.addElement(fbElement);
   
}

function facebook_onlogin_ready()
{
	
		//FB.XFBML.Host.autoParseDomTree = false;
		//FB.Facebook.get_sessionState().waitUntilReady( function(session)
		//{
		//	loggedInStateChecked = true;
			//fbConnected = session ? true : false;
			//refreshXFBML();
		//});

		FB.login(function(response) {
		  if (response.authResponse) {
			   loggedInStateChecked = true;
			   serverLoggedInState  = "true";
			   fbConnected = true;
			   if (typeof clientParams != "undefined" && typeof fb_onlogin_ready == "function")
			   {
				   fb_onlogin_ready();
			   }
			   else
			   {
					// Facebook Connect - set onConnectedFunction function
					onConnectedFunction = fbcCheckUserExists;
					// set reg config file
                                        if (cf == '') {
                                                cf = "simple_reg";
                                        }					
					// set registration ajax and app uris
					nbcudps_ajaxURL = "/registration/app";
					nbcudps_appURL = "/registro";
					// facebook connected, call onConnected Function
					if (onConnectedFunction != '')
					{
						if (typeof(onConnectedFunction) === "function")
						{
							onConnectedFunction();
						}
					}
				 }
			} else {
				fbConnected = false;
				refreshXFBML();
			  //alert('success2');
		  }
  }, {scope:'read_stream,publish_stream,offline_access,email'});
	
}

function fbcCheckUserExists()
{
	// make sure that the config file value is set before calling
	if (typeof(cf) != "undefined")
	{
		// show progress indicator
		if (typeof(fbcPleaseWaitText) != "undefined")
		{
			$('div.fb_loginButton').prepend('<span class="progressIndicator"><span class="text">' + fbcPleaseWaitText + '</span><span class="img"><img src="' + nbcudps_ajaxURL + '/_images/ajax_busy.gif" /></span></span>');
		}
		else
		{
			$('div.fb_loginButton').prepend('<span class="progressIndicator"><span class="text">Please wait... </span><span class="img"><img src="' + nbcudps_ajaxURL + '/_images/ajax_busy.gif" /></span></span>');
		}
		$('#sn_accountRegisterForm').css('display','none');
		$('.reg_model_content div.reg_btn_facebook').addClass('addPadding');
		$.ajax({
		   type: "GET",
		   dataType : "json",
		   url: nbcudps_ajaxURL + "/ajax.php?cf=" + cf + "&control=fbConnectCheckUserExists",
		   success: function(msg) {
		     if (msg.status)
		     {
			switch (msg.status)
			{
				case 'NEW_USER':
					if (nbcudps_contestFlag)
					{
						window.location.href = '/' + nbcudps_contestWrapperName + '?contest=' + cf + '&act=fbcregisterlink';
					}
					else
					{
						window.location.href = nbcudps_appURL + '?act=fbcregisterlink';
					}
					break;
					
				case 'EXISTING_USER':
					$('#sn_accountRegisterForm').fadeOut('slow');
					
					if (typeof(fbcLoggingInText) != "undefined")
					{
						$('div.fb_loginButton span.progressIndicator span.text').html(fbcLoggingInText);
					}
					else
					{
						$('div.fb_loginButton span.progressIndicator span.text').html('Logging you in...');
					}
					
					if (nbcudps_contestFlag)
					{
						var code = "window.top.location.href = '/" + nbcudps_contestWrapperName + "?contest=" + cf + "&act=fbclogin&url=/" + nbcudps_contestWrapperName + "?contest=" + cf + "&token=" + msg.token + "';";
						setTimeout(code, 2000);
						break;
					}
										
					var redirectUrl = '';
					var pattern = /redirectUrl=([^&]+)/i;
					var patternMatch = (window.location.search).match(pattern);
				    	if (patternMatch)
					{
				    		redirectUrl = patternMatch[1];
					}
					else
					{
						// if on any page other than registro, then redrect back to that page
						pattern = nbcudps_appURL;
						patternMatch = (window.location.href).match(pattern);
						if (!patternMatch)
						{
							redirectUrl = window.top.location.href;
						}
					}
					
				    if (redirectUrl != '')
				    {
				    	var code = "window.top.location.href = '" + nbcudps_appURL + "?act=fbclogin&url=" + redirectUrl + "&token=" + msg.token + "';";
				    }
				    else
				    {
				    	//var code = "window.location.href = '" + nbcudps_appURL + "?act=fbclogin&url=/tu_mundo/&token=" + msg.token + "';";
				
					
					var code = "window.top.location.href = '" + readCookie('tm_reg_referrer') +"'";
				    }
				    
					setTimeout(code, 2000);
					
					break;
				default:
					$('div.fb_loginButton span.progressIndicator span.text').html('There was an unknown error. Please try again.');
					$('div.fb_loginButton span.progressIndicator span.img').remove();
					$('#sn_accountRegisterForm').css('display','block');
					$('.reg_model_content div.reg_btn_facebook').addClass('addPadding');
					break;
			}
		     }
		     else
		     {
			$('div.fb_loginButton span.progressIndicator span.text').html('There was an unknown error. Please try again.');
			$('div.fb_loginButton span.progressIndicator span.img').remove();
		     }
		   }
		});
	}
	else
	{
		setTimeout("fbcCheckUserExists()",500);
	}
}

function onConnected(user_id) 
{   
	    if (loggedInStateChecked) {
			return;
		}
	    loggedInStateChecked = true;
			fbConnected = true;

		if (serverLoggedInState == 'true') {
			alert("loggedInStateChecked");

			} else {
			facebook_onlogin_ready();
		}

		/*FB.Facebook.get_sessionState().waitUntilReady( function(session)
		{
			loggedInStateChecked = true;
			fbConnected = true;
			
			// facebook connected, call onConnected Function
			if (onConnectedFunction != '')
			{
				if (typeof(onConnectedFunction) === "function")
				{
					onConnectedFunction();
				}
			}
		});
	*/
}

function onNotConnected() 
{
	
		if (loggedInStateChecked) 
		{
			return;
		}
		loggedInStateChecked = true;
	
}













