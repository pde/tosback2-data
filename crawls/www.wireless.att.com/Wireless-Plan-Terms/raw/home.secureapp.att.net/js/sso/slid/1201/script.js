// global variables
var agent = navigator.userAgent;

$(document).ready(function() {
	// Clean up unnecessary Attr
	$('meta[name=viewport]').removeAttr('http-equiv');
	
	// Set all hidden HTML popups
	$('#header').html('<div id="GlobalNav"><div class="globalNavWrap"><ul><li class="selected"><a href="http://www.att.net/" title="att.net" target="_top">att.net</a></li><li><a href="http://www.att.com" title="att.com" target="_top">att.com</a></li><li class="last"><a href="http://uverseonline.att.net/" title="uverse.com" target="_top">uverse.com</a></li></ul><ul class="gnMoreLinks"><li class="last"><a href="http://elportal.att.net" title="En Espa&ntilde;ol" target="_top">En Espa&ntilde;ol</a></li></ul></div></div><div id="masthead"><a href="http://www.att.net" target="_top" id="attLogoHead" title="att.net Home">AT&amp;T</a><div id="signIn"><ul><li class="last"><a href="http://www.att.com/esupport/main.jsp?App_ID=PBY" target="_top">AT&amp;T Support</a></li></ul></div></div>');

	//$('#footerFrame').remove();
	//$('#pageWrap').after('<div id="footer" />');
	$('#footer').html('<div class="footerWrap"><ul><li class="first"><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.support&redirecturl=http://www.att.com/esupport/main.jsp?App_ID=PBY">AT&amp;T Support</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.adinfo&redirecturl=http://www.att.net/legal/advertising" target="_top">Advertise with Us</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.TOS&redirecturl=http://www.att.com/shop/internet/att-internet-terms-of-service.jsp" target="_blank">Terms of Service</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.copyright&redirecturl=http://info.yahoo.com/copyright/details.html" target="_top">Copyright</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.privacy&redirecturl=http://att.yahoo.com/privacy" target="_top">Privacy Policy</a></li><li><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.aboutourads&redirecturl=http://info.yahoo.com/privacy/us/yahoo/attandyahoo/adchoices.html" target="_top">About Our Ads</a></li><li class="last"><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.AUP&redirecturl=http://www.corp.att.com/aup/" target="_top">Acceptable Use Policy</a></li></ul><p><a href="http://www.att.net/s/context.dll?id=1400&type=clickthru&name=global.footer.att.IP&redirecturl=http://www.att.com/gen/privacy-policy?pid=2587" target="_top">Copyright &copy; 2012 AT&amp;T Intellectual Property</a>. All rights reserved. AT&amp;T and the AT&amp;T logo are trademarks of AT&amp;T Intellectual Property.</p></div>');

	$('#qAns1').html('<div class="overContent"><h3>Sign in tips</h3><p>You can log in with your AT&amp;T Email Account: (username@att.net)</p><p>username@ameritech.net<br />username@att.net<br />username@bellsouth.net<br />username@flash.net<br />username@nvbell.net<br />username@pacbell.net<br />username@prodigy.net<br />username@sbcglobal.net<br />username@snet.net<br />username@swbell.net<br />username@wans.net</p></div>');

	$('#qAns2').html('<div class="overContent"><h3>What does "Keep me signed in" mean?</h3><p> Many of our users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net and Mail. By checking  this new box you\'ll stay signed in for up to 2 weeks or until you sign out. You\'ll get easier access to your mail, photos, music, and all your other stuff, even if you close your browser or shut down your computer.</p> <p>To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services.</p> <h3>What if I\'m on a computer that I share with others?</h3> <p>If you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box.</p> <p>This checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer.</p> <p>You can change the length of time you remain signed in to att.net and Mail, once you are signed in, by clicking on the "My Account" link at the top of most of the att.net pages. Go to the "Member Information" section to change the frequency whereby AT&amp;T will prompt you for your password. If you do so, AT&amp;T will ask you to verify your password more frequently, although your sign-in screen will indicate every "two weeks".</p> <p>If you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.</p></div>');
		
	$('#overLayCheck').html('<h3>You have chosen to stay signed in for 2 weeks. What does this mean?</h3><p>Many of our AT&amp;T users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net. By checking this new box, you\'ll stay signed in for up to 2 weeks or until you sign out. To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&amp;T services.</p><p>If you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box.</p> <p>This checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer.</p><p>If you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.</p><ul class="btnSignIn"><li><button id="btnKeepMe" class="btnLong" onClick="chkTick()">Keep Me Signed In</button></li><li><button id="btnSignIn" class="btnLong" onClick="unchkTick()">Sign Me In, but I don\'t want to stay Signed In for 2 weeks</button></li></ul><div class="clrAll"></div>');
	
	// Set variables for Alert Messages for use on iPhone/iPod
	var qAns1 = 'Sign in tips \r \nYou can log in with your AT&T Email Account: (username@att.net) \r \nusername@ameritech.net \nusername@att.net \nusername@bellsouth.net \nusername@flash.net \nusername@nvbell.net \nusername@pacbell.net \nusername@prodigy.net \nusername@sbcglobal.net \nusername@snet.net \nusername@swbell.net \nusername@wans.net';
	
	var qAns2 = 'What does "Keep me signed in" mean? \r \nMany of our users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net and Mail. By checking this new box you\'ll stay signed in for up to 2 weeks or until you sign out. You\'ll get easier access to your mail, photos, music, and all your other stuff, even if you close your browser or shut down your computer. \r \nTo protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services. \r \nWhat if I\'m on a computer that I share with others? \r \nIf you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box. \r \nThis checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer. \r \nYou can change the length of time you remain signed in to att.net and Mail, once you are signed in, by clicking on the "My Account" link at the top of most of the att.net pages. Go to the "Member Information" section to change the frequency whereby AT&T will prompt you for your password. If you do so, AT&T will ask you to verify your password more frequently, although your sign-in screen will indicate every "two weeks". \r \nIf you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.';
	
	//FORGOT PASSWORD URL CHANGES START:
	var ORIGINATION_POINT_URL = document.referrer;
	var RETURN_URL = window.location;
	var CANCEL_URL = document.referrer;
	RETURN_URL = decodeURIComponent(RETURN_URL);

	var strHostName = "HOSTNAME";
	var Result1 = RETURN_URL.search(strHostName);
	var Result2 = RETURN_URL.search("&AUTHNLEVEL");
	var Result3 = RETURN_URL.substring(Result1 + (strHostName.length + 1), Result2);
	var str_URL = "URL";
	Result1 = RETURN_URL.search(str_URL);
	Result2 = RETURN_URL.search("tucd");
	var Result4 = RETURN_URL.substring(Result1 + (str_URL.length + 1), Result2);
	RETURN_URL = "https://" + Result3 + Result4 + "test=success";
	//Return_URL format (from login page URL): "https://" + @HOSTNAME (till &AUTHNLEVEL) + &URL (till &REFERER)
	$('#fgtPwd').attr('href', "https://www.att.com/olam/enterUserIdSlidFpwd.myworld?origination_point=" + ORIGINATION_POINT_URL + "&Return_URL=" + RETURN_URL + "&Cancel_URL=" + CANCEL_URL);
	
	//FORGOT PASSWORD URL CHANGES END;
		
	// IE DETECTION FOR CSS PIE
	if ($.browser.msie) {
					var ieVer = parseInt($.browser.version, 10);
					if (ieVer < 9) {
									// ADD CSS PIE JS TO THE DOM
									$.getScript('https://home.secureapp.att.net/js/pie/1.0b4/pie.js', function() {
													if (window.PIE) {
																	$('#LoginForm, #LoginForm ul.uLogin li input.loginBtn, #loginWrap #LoginForm .overContent, #err, #simplemodal-container').each(function() {
																					PIE.attach(this);
																	});
													}
									});
					}
	}

	// TURNER DETECTION (in app experience)
	if (!!agent.match(/iPad/i)) {
		var referer = gup('REFERER');

		if (referer.match(/adultswim/i) || referer.match(/cartoonnetwork/i) || referer.match(/trutv/i) || referer.match(/cnn/i) || referer.match(/fox/i) || referer.match(/btn2go/i) || referer.match(/nbcolympics/i) || referer.match(/starzplay/i) || referer.match(/encoreplay/i)) {
			var turnerURL = 0;

			//For form sheet modal need to reset the meta tag
			if (window.innerWidth < 560) {
				$('meta[name=viewport]').attr('content', 'width=100%');
			}

			$('head').append('<link rel="stylesheet" href="https://home.secureapp.att.net/css/sso/slid/1201/mobile.css" type="text/css" />');
			$('#loginWrap').css('background:#eee');
		}
	}
	function gup(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);
		if (results == null)
			return "";
		else
			return results[1];
	}

    // DEVICE DETECTION
    if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i) || !!agent.match(/Android/i)) {
        // Apply correct meta tag		
        document.getElementsByTagName('meta').item(0).setAttribute('name', 'viewport');
        document.getElementsByTagName('meta').item(0).setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=1.0, text/html; charset=utf-8');

        // Replace iFrame footer content with inline HTML
        //$('#footer').css({'text-align':'left','padding':'0 5px'}).html('<p><a href="https://home.secureapp.att.net/attportal/s/context.dll?id=1400&type=clickthru&name=global.footer.att.IP&redirecturl=http://www.att.com/gen/privacy-policy?pid=2587">Copyright &copy; 2011 AT&amp;T Intellectual Property.</a><br />All rights reserved.AT&amp;T and the AT&amp;T logo are trademarks of AT&amp;T Intellectual Property.</p>');

        $('#ques1').click(function() {
            if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i)) {
                alert(qAns1);
            } else {
                $('#LoginForm li#uID').css('z-index', '990');
                $('#ques1 .qAns .overContent').width('90%');
                $(this).children('.qAns').modal({
                    minHeight: 225, overlayClose: true, opacity: 0, position: ['25%', null]
                });
            }
        });
        $('#ques2').click(function() {
            if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i)) {
                alert(qAns2);
            } else {
                $('#ques2 .qAns .overContent').width('100%');
                $(this).children('.qAns').modal({
                    minHeight: 560, overlayClose: true, opacity: 0, position: ['5%', null]
                });
            }
        });

    } else {
        // Pull Index via ajax
        //$('#pageWrap #promo').load('https://secureapp.stage.att.net/attportal/s/s.dll?spage=/design/cdls10/sso/loginad.htm&nohtmtags=1&only=y');
        var nocache = Math.ceil(10000 * Math.random());

        // Do not load add if pulling from Turner in app login pages.
        if (turnerURL != 0) {
            //	$.getScript("https://secureapp.stage.att.net/attportal/s/s.dll?spage=/design/cdls10/sso/loginadScript.js&nohtmtags=1&only=y&nocache="+ nocache);

            /* START: Load Yad Frame */
            //$('#promo').html('<iframe src="https://secureapp.stage.att.net/sso/yad/yadIframe.htm" id="yadFrame"></iframe>');

            //$('#pageWrap').append('<iframe src="https://cgate.stage.att.net/commonLogin/igate_edam/staticContent/yadIFrame.htm" frameborder="0" scrolling="no" id="yadFrame"></iframe>');
            //$('#pageWrap').prepend('<div id="YadWrap"></div>');

            //$.getScript('https://secureapp.stage.att.net/js/sso/slid/1108/yad.js',function(){});

            /*
            $.get('https://secureapp.stage.att.net/sso/yad/yadIframe.htm', function(data){
            $('#promo').html(data);
            });
            */
            /* END: Load Yad Frame */

        }

        $('#ques1').hover(
			function() {
			    $('#LoginForm li#uID').css('z-index', '990');
			    $('#qAns1 .overContent').width(275);
			    $(this).children('.qAns').fadeIn();
			},
			function() {
			    $(this).children('.qAns').fadeOut('fast');
			    $('#LoginForm li#uID').css('z-index', '990');
			}
		);
        $('#ques2').hover(
			function() {
			    $('#LoginForm li#uRM').css('z-index', '990');
			    $('#LoginForm li#uID').css({ 'z-index': '500', 'visibility': 'hidden' });
			    $('#ques2 .qAns .overContent').width(590);
			    $(this).children('.qAns').fadeIn();
			},
			function() {
			    $(this).children('.qAns').fadeOut('fast');
			    $('#LoginForm li#uRM').css('z-index', '970');
			    $('#LoginForm li#uID').css({ 'z-index': '990', 'visibility': 'visible' });
			}
		);
    }

    $('#nameBox').focus();

    /*
    $('#fgtPwd').click(function(){
    //window.open("https://uvpsystest2.stage.att.com/uvp/home/password_reset","mywindow","toolbar=0,location=0,menubar=0,resizable=1,scrollbars=1,width=1005,height=580");
    //window.open("https://www.att.com/olam/forgotPasswordAction.olamexecute?forgotPasswordActionEvent=forgotPasswordStep1","mywindow","toolbar=0,location=0,menubar=0,resizable=1,scrollbars=1,width=1005,height=680");
    //window.open("https://www.att.com/olam/forgotPasswordAction.olamexecute?forgotPasswordActionEvent=forgotPasswordStep1","mywindow","toolbar=0,location=0,menubar=0,resizable=1,scrollbars=1,width=1005,height=680");
    return false;
    });
    */

    $('#submitLogin').click(function() {
        submitForm();
        return false;
    });

// Webtrends 
	$.getScript("https://home.secureapp.att.net/js/Webtrends/webtrends.min.js", function(){
		window.webtrendsAsyncInit=function(){
			var dcs=new Webtrends.dcs().init({
				dcsid:"dcsslzoj37dv0hctv586rtbcg_1v7w"
				,domain:"statse.webtrendslive.com"
				,navigationtag: "div,span"
				,timezone:-5
				,offsite:true
				,download:true
				,downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip"
				,onsitedoms:"beta.att.yahoo.com"
				,plugins:{
					//hm:{src:"//s.webtrends.com/js/webtrends.hm.js"}
					LinkTrack: { src: "https://home.secureapp.att.net/js/Webtrends/linkTrack.js", DivList: "header;attGlobalNavHeader;search-yahoo;att-header-email;support;yom-att-widgetron yom-mod;yui-carousel-content;yom-ad;yom-mod yom-linkbox yom-trending" }
				}
			}).track();
		};
	});


});

/*
function setFocus() {
 if(document.getElementById("cont")){
		document.getElementById("cont").disabled = true;
 }
}
*/

function setRegURL(urlhost){
	if (urlhost == 'entertainment.att.net'|| urlhost == 'uverseonline.att.net')
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=MEA&returnUrl=http%3A%2F%2Fwww.att.net%2Fglobalssosignin%3Frd%3Dhttp%253A%252F%252Fuverseonline.att.net%252Fregistration";
	else if (urlhost == 'games.att.oberon-media.com' || urlhost == 'games.att.net' || urlhost == 'auth.games.att.net')
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=Gaming&returnUrl=http%3A%2F%2Fgames.att.net";
	else
		document.getElementById("regurl").href = "https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.Register.Pageviews."+urlhost.replace(/\./g,"-")+"&redirecturl=https://attreg.att.net/PortalRegWeb/PortalRegController?callingAppId=ME&returnUrl=";
}

function logPgvw(){
	if(document.getElementById("lognp")) {
	var local = 'http://www.att.net';
	var referringURL = 'http://www.att.net';
		
		if (document.referrer != ""){
			referringURL = document.referrer;
		}
		
		var sind = referringURL.indexOf("://");
		var eind = 0;
		if (sind != -1)
			eind = (referringURL.substring(sind+3, referringURL.length)).indexOf("/");
		if (eind == -1)
			eind = referringURL.length;
		eind = eind + sind + 3;
		local = referringURL.substring(sind+3, eind);
		
		var src = '<img width="1" height="1" src="https://home.secureapp.att.net/attportal/s/context.dll?id=9002001&type=clickthru&name=cgate.signIn.Pageviews.'+local.replace(/\./g,"-")+'&redirecturl=/i/s.gif?nocache='+Math.ceil(10000*Math.random())+'"/>';
		document.getElementById("lognp").innerHTML = src;
		
		setRegURL(local);
	} 
}

function refer(){
	if (document.referrer != "") {
		var referringURL = document.referrer;
		var local = 'http://www.att.net';
		var sind = referringURL.indexOf("://");
		var eind = 0;
		if (sind != -1)
			eind = (referringURL.substring(sind+3, referringURL.length)).indexOf("/");
			
		if (eind == -1)
			eind = referringURL.length;
			
		eind = eind + sind + 3;
		local = referringURL.substring(sind+3, eind);
		if (local == 'games.att.oberon-media.com'){
			location.href = 'http://games.att.oberon-media.com';
		}
		else if (local == 'http://games.att.net'){
			location.href = 'http://games.att.net';
		}
		else if (local == 'auth.games.att.net'){
			location.href = 'http://games.att.net';
		}
		else{
			location.href = document.referrer;
		}
	}	
}

function submitForm(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var usrName= document.getElementById('nameBox').value;
	var usrPwd= document.getElementById('pwdBox').value;

	usrName = trimAll(usrName);
	usrPwd = trimAll(usrPwd);
		
	if(usrName == null || usrName.length == 0){
		alert("Email is a mandatory field. Please enter your AT&T Email to proceed.");
		document.getElementById("nameBox").focus();
		return false;
	}/*else if (reg.test(usrName) == false){
		alert("Email is invalid. Please enter your email to proceed.");
		document.getElementById("nameBox").focus();
		return false;
	}*/
	  
	else if(usrPwd == null || usrPwd.length == 0){
		alert("Password is a mandatory field. Please enter your password to proceed.");
		document.getElementById("pwdBox").focus();
		return false;
	}
		
	else if(document.getElementById('rememberID').checked == true){
		if (!!agent.match(/iPhone/i) || !!agent.match(/iPod/i)) {
			if(confirm('You have chosen to stay signed in for 2 weeks. What does this mean? \r \nMany of our AT&T users have asked for a way to reduce how frequently they\'re asked to sign-in to att.net. By checking this new box, you\'ll stay signed in for up to 2 weeks or until you sign out. To protect your most sensitive data and activities (like changing your password or using your credit card), we\'ll ask you to re-enter your password when you access some AT&T services. \r \nIf you\'re using a public computer or you share this computer with others, we recommend that you uncheck the "Keep me signed in" box. \r \nThis checkbox applies to this computer only. So, for example, you can stay signed in on your home computer, but maintain more frequent password protection on your work or school computer. \r \nIf you need to sign out, remember to click the "Sign Out" link located at the top of most att.net pages when you\'re signed in.')){
					document.getElementById("submitLogin").disabled = true;	
					document.LoginForm.submit();
			}else {
					$('input#rememberID').attr('checked', false);
				}
			
		} else if (!!agent.match(/Android/i)) {
			$(document).ready(function(){
				$('#overLayCheck').modal({
					maxHeight:515, persist:true,  escClose: false, close:false, opacity:0, position:['10%',null], 
					onOpen: function(dialog) {
						dialog.overlay.show(function() {
							dialog.container.show(function () {
								dialog.data.show();
							});
						});
					}
				});
			});
				
		} else {
			$(document).ready(function(){
				$('#overLayCheck').modal({
					escClose: false, close:false, opacity:50, position:['15%',null], 
					onOpen: function(dialog) {
						dialog.overlay.fadeIn('fast',function() {
							dialog.container.slideDown('fast',function () {
								dialog.data.fadeIn('slow');
							});
						});
					}
				});
			});
			
		}
		return false;
	}
	else {
		document.getElementById("submitLogin").disabled = true;	
		document.LoginForm.submit();
	}
}

function trimAll(sString) {
	while (sString.substring(0,1) == ' '){
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' '){
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

function chkTick(){
	document.getElementById('rememberID').checked = true;
	document.getElementById("overLayCheck").style.display = "none";
	document.LoginForm.submit();
}

function unchkTick(){
	document.getElementById('rememberID').checked = false;
	document.getElementById("overLayCheck").style.display = "none";
	document.LoginForm.submit();
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function btnChange(){
(document.getElementById('cont')).src = "/img/sso/slid/Cont1.png";
}

function acctSelBtnEnable(){
	document.getElementById('cont').disabled = false;
	document.getElementById('cont').style.color = "#fff";
	document.getElementById('cont').style.backgroundPosition = "0 bottom";
}

function ie6Img(){
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
		var ieversion=new Number(RegExp.$1)
		if (ieversion==6)             
			(document.getElementById('signUp')).src = "/img/sso/slid/IE6/signupToday.png";
		}
}

function getYadContents(){
	var yadContent = $('#yad div, #yad a').html();
	$('#pageWrap').prepend('<div id="YadWrap"></div>');

	$('#YadWrap').append('<div id="richad"></div>');
	$('#richad').html(yadContent);
	
	if($('#richad>img').length){
		var imgPath = $('#richad>img').attr('src');
		$('#richad>img').hide();
		$('#richad>img').wrap('<a href="'+ $('#yad a').attr('href') +'" target="_blank" />')
		$('#richad>a').css({'display':'block','background':'url('+imgPath+') center 0'}).height(1024);
	}

}

function init(){
	logPgvw();
}

window.onload = function(){
	init();
	getYadContents();
}
