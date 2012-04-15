var appserver = "";
var wwwserver = "";
var static_appserver = "";
var static_wwwserver = "";
var cookie_domain="";
if (location.host.indexOf("limited.com") != -1){
	appserver = location.protocol + "//" + location.host;
	wwwserver = location.protocol + "//" + location.host;
	imgserver = location.protocol + "//" + location.host;
	if (location.protocol == "https:")
	{	imgserver = "http://" + location.host;
		appserver = "http://" + location.host;
	}
	static_appserver = "http://" + location.host;
	static_wwwserver = "http://" + location.host;
	static_imgserver = "http://" + location.host;
	secure_appserver = "https://" + location.host;
    cookie_domain = ".limited.com";
} else {
	appserver = location.protocol + "//www.victoriassecret.com";
	wwwserver = location.protocol + "//www.victoriassecret.com";
	imgserver = location.protocol + "//www.victoriassecret.com";
	if (location.protocol == "https:")
	{	imgserver = "https://secure.victoriassecret.com";
		appserver = "https://secure.victoriassecret.com";
	}

	static_appserver = "http://www.victoriassecret.com";
	static_wwwserver = "http://www.victoriassecret.com";
	static_imgserver = "http://www.victoriassecret.com";
	secure_appserver = "https://www.victoriassecret.com";	
    cookie_domain = ".victoriassecret.com";
}
var tmpImg = new Image();

function getVSCookie(name){
	var result = "";
	var start = document.cookie.indexOf(name + "=");
	var end;	if (start != -1){
		start += (name.length + 1);
		end = document.cookie.indexOf(";", start);
		if (end == -1)
			end = document.cookie.length;
		result = unescape(document.cookie.substring(start, end));
	}
	return result;
}

function getUUID2(){
	try {
		if (location.pathname == "/index.html" || location.pathname == "/index.html") return;
		if (location.protocol == "https:") return;
		if (getVSCookie("UID").length > 0) return;
			tmpImg.src = appserver + '/createUID.cfm';
		} catch(err) {
			//alert("gguid error = "+err);
		}
}

function setCookieEnabledCheck2() {
	try {
		var cookieEnableFlag = getVSCookie("ceatbt");
		if (cookieEnableFlag == null || cookieEnableFlag == "") 	{
			setVSCookie("ceatbt","y");
		}	
	} catch(err) {
		//alert("gguid error = "+err);
	}
}
function setVSCookie(name, value, expires) {
    var eDate = "";
    if(expires != "" && expires != null)
    {
    	eDate = ";expires=" + expires.toGMTString() + ";";
    }
    var curCookie = name + "=" + escape(value) + "; path=/" + "; domain=" + cookie_domain + eDate;
    document.cookie = curCookie;
}

function troyMetricsNav(trackParam){
	var time = new Date();
	if(trackParam==undefined || trackParam=='')
		trackParam = getVSCookie("abcTestBucket");//pass cookie values if trackParam is null or not supplied		
	var trackElement = "<img src=\"/m/a.gif?curPage="+location.href+"&referrer="+document.referrer+"&time=" + time.valueOf() +"&testBucket="+ trackParam + "\" width = \"0\" height = \"0\"/>";
	document.write(trackElement);
}

function showBrickFishWindow(url, width, height)
{
	var domArr = location.hostname.split(".");
	var subDomain = domArr[0];
	if(subDomain == "espanol" || subDomain == "espanol2")
	{
		url = "/enes" + url;
	}
	var newWin = window.open(url, "LoveYouMom", "height=" + height + ",width=" + width + ",resizable=yes,scrollbars=yes,toolbar=yes,location=yes,left=20,top=20");
}



function signupForEmail() 
{
	var form = document.getElementById("signupForEmailForm");
	var email = document.getElementById("signUpForEmailText").value;		
	if(email == "Sign up for Email" ) 
	{
		window.location = static_appserver + "/CustomerService/SignUp/SignUpForEmail/";
	}
	else 
	{
		window.location = static_appserver + "/CustomerService/SignUp/SignUpForEmail/?email=" + email;
	}
}



//spanish toglle logic please do not remove
function switchSpanish(){
var domArr = location.hostname.split(".");
var subDomain = domArr[0];
var curUrl = location.href;
var queryString = curUrl.substring(curUrl.indexOf(".com")+4,curUrl.length);
if(queryString == undefined)
 queryString ='';
var newURL ="http://espanol2.victoriassecret.com";

	if(subDomain !=  undefined){		
	  if(queryString == undefined || queryString == '') newURL = "http://espanol2.victoriassecret.com/enes/sdwww2/";
	  else newURL = "http://espanol2.victoriassecret.com/enes/sdwww2" + queryString;		
	}
	window.location.replace(newURL);
}

function switchLanguage(){
urls=new Array();
	oh=new Array();tsd=new Array();
	tsh='espanol.victoriassecret.com';
            oh[0]='search.victoriassecret.com';tsd[0]='/enes/sdsearch/'; 
            oh[1]='www.victoriassecret.com';tsd[1]='/enes/';
	urls[0]=new URLData(tsh, oh, tsd);

	oh=new Array();tsd=new Array();
	tsh='espanol2.victoriassecret.com';
            oh[0]='www2.victoriassecret.com';tsd[0]='/enes/sdwww2/';
            urls[1]=new URLData(tsh, oh, tsd);

	var found=false;
	for (i=0;i<urls.length;i++){ 
		idx=location.href.indexOf(urls[i].tsh);
		if(idx==-1){
			for (j=0;j<urls[i].oh.length;j++){ 
				idx=location.href.indexOf(urls[i].oh[j]);
				if(idx>-1){
					idx=idx+urls[i].oh[j].length;hname=urls[i].tsh+urls[i].tsd[j];
					found=true;
					break;
				}
			}
		}else{
			for (j=0;j<urls[i].tsd.length;j++){ 
				idx=location.href.indexOf(urls[i].tsd[j]);
				if(idx>-1){
					idx=idx+urls[i].tsd[j].length;hname=urls[i].oh[j];
					found=true;
					break;
				}
			}
		}
		if (found) break;
	}

	path=location.href.substring(idx);
	hend=hname.charAt(hname.length-1); pstart=path.charAt(0);
	if(hend=='/' && pstart=='/') path=path.substring(path.indexOf('/')+1);
	if(hend!='/' && pstart!='/') path='/'+path;
	location.href=location.protocol+'//'+hname+path;
	return false;
}
function URLData(tsh, oh, tsd) {
	this.tsh = tsh;
	this.oh = oh;
	this.tsd = tsd;
}
//spanish toglle logic please do not remove... ends here ..

//Dash board parts ...
function HideDIV(d) { 
var txtprn="";
txtprn +='<div id="navText" style="display: block">'
txtprn +='	<div class="bottomNav" style="line-height: 17px; padding-top: 10px; width: 144px;">';
txtprn +='		<a href="javascript:popUpWindow(\'' + static_appserver + '/html/common/security_privacy.html#SECURITY\',480,520,\'yes\',\'yes\');">SSL Secure Checkout</a>';
txtprn +='		<a href='+ static_appserver + '/catalogue/>Catalogue Quick Order</a>';
txtprn +='		<a href='+ static_appserver + '/html/custsrvc/orderstatus/>Check Order Status</a>';
txtprn +='		<a href='+ static_appserver + '/html/custsrvc/>Customer Service</a>';
txtprn +='	</div>';
txtprn +='	<div class="bottomNav" style="line-height: 17px; padding-top: 10px; width: 145px;">';
txtprn +='		<a href= '+ static_appserver + '/html/custsrvc/contact/>Contact Us</a>';
txtprn +='		<a href= '+ static_appserver + '/html/custsrvc/request/>Request a Catalogue</a>';
txtprn +='		<a href= '+ static_appserver + '/html/custsrvc/storeloc/>Find a Store Near You</a>';
txtprn +='		<a href= '+ static_appserver + '/html/custsrvc/angelcard/>Angel Card</a>';
txtprn +='	</div>';
txtprn +='	<div class="bottomNav" style="line-height: 17px; padding-top: 10px; width: 144px;">';
txtprn +='		<a href="javascript:popUpWindow(\'' + static_appserver + '/html/common/security_privacy.html\',480,520,\'yes\',\'yes\');">Privacy &amp; Security</a>';
txtprn +='		<a href="javascript:popUpWindow(\'' + static_appserver + '/html/common/california_privacy.html\', 380, 395,\'yes\',\'yes\');">California Privacy</a>';
txtprn +='		<a href= '+ static_appserver + '/html/custsrvc/recallinfo/index.cfm>Recall Notice</a>';
txtprn +='		<a href="javascript:popUpWindow(\'' + static_appserver + '/html/common/website_use.html\',335,370,\'yes\',\'yes\');">Site Terms & Notices</a>';
txtprn +='	</div>';       
txtprn +='	<div style="width: 140px; padding-top:7px;" class="bottomNav">';            
txtprn +='		<div style=" text-align:left;padding-top:4px;" id="signUpForEmailInput">';
txtprn +='			<form id="signUpForEmailForm" onsubmit="if(document.signupForEmailForm.email.value==\'Sign up for Email\')document.signupForEmailForm.email.value =\'\';" id="signupForEmailForm" name="signupForEmailForm" action="/html/custsrvc/email-signup/">';
txtprn +='				<div style="float: left; width: 109px;" class="inputBorder textie">';
txtprn +='						<input  id="signUpForEmailText" type="text" style="border-width: 0pt; width: 107px;"  onfocus="this.value = \'\';" value="Sign up for Email" name="email" />';
txtprn +='				</div>';
txtprn +='				<div style="padding-left: 3px; float: left;"><a href="javascript:signupForEmail();"><input width="23" height="16" type="image" alt="Go" src="/images/common/pagenav/email_go_button.gif"/></a>';
txtprn +='				</div>';
txtprn +='           </form>';
txtprn +='		</div>';
txtprn +='       <div style="float:left;padding-top:3px;"><a href="javascript:if(document.signupForEmailForm.email.value==\'Sign up for Email\') document.signupForEmailForm.email.value =\'\';document.signupForEmailForm.submit();">Get the inside scoop on new collections, events, exclusive offers & more</a></div>';
txtprn +='	</div>'; 
txtprn +='  </div>';
document.getElementById('navText').innerHTML = '';
document.getElementById('navText').innerHTML = txtprn;
txtprn='';
}
function DisplayDIV(d) {
document.getElementById('navText').innerHTML = '';
if(d=='div1'){ 	
	document.getElementById('navText').innerHTML ='<a href=' + static_appserver + '/html/custsrvc/giftservices/#gift_wrap><img src="/images/common/pagenav/vdaydashboard/Shop_Feature.jpg" border="0"></a>';
	}
if(d=='div2'){
	document.getElementById('navText').innerHTML ='<a href='+ static_appserver + '/landing/?cgnbr=OSGIFCHRDEL&rfnbr=5604><img src="/images/common/pagenav/vdaydashboard/GiftCard_Feature.jpg" border="0"></a>';
	}
if(d=='div3'){	
	document.getElementById('navText').innerHTML ='<a href='+ static_appserver + '/commerce/wishlist/index.jsp?namespace=vsWishlist&origin=wishListMenu.jsp&event=link.MyView&rfnbr=4689><img src="/images/common/pagenav/vdaydashboard/Delivery_Feature.jpg" border="0"></a>';
	}
if(d=='div4'){	
	document.getElementById('navText').innerHTML ='<a href='+ static_appserver + '/commerce/wishlist/index.jsp?namespace=vsWishlist&origin=wishListMenu.jsp&event=link.MyView&rfnbr=4689><img src="/images/common/pagenav/vdaydashboard/WishList_Feature.jpg" border="0"></a>';
	}	
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

