var T="";
var S="";
var TS = "";
var SRC_param = getRequestParameter('SRC');

var today = new Date;

 
// Add by Sarayu for SEM Feature 3475: SCS, channelId, and sessionId should all be passed through to be able to track visitors, 3/12/2010
var rqst_parms = window.location.search;
rqst_parms = rqst_parms.replace("?","");
var SCS_param = getRequestParameter('SCS');
var channelId_param = getRequestParameter('channelId');
var sessionId_param = getRequestParameter('sessionId');

var isLoggedin = 0;

if (locn == null) {
    var locn = "";
}

var af = false;
var al = false;
function kw(){
    setSRC();
    if (al) return;
    lastCookie();
    if (af) return;
    document.ypform.C.focus();
}


function setSRC(){
    // Set the form SRC value for Employee tool, InfoSpace etc
    document.ypform.SRC.value = SRC_param;

    // Add by Sarayu for SEM Feature 3475: SCS, channelId, and sessionId should all be passed through to be able to track visitors, 3/12/2010
    document.ypform.SCS.value = SCS_param;
    document.ypform.channelId.value = channelId_param;
    document.ypform.sessionId.value = sessionId_param;
}

function setFocus(){
    setSRC();
    document.ypform.C.focus();
}

function verifySimple() {
    var keywd = document.ypform.C.value;
    keywd = keywd.replace( /^\s+/g, "" );
    keywd = keywd.replace( /\s+$/g, "" );
    if (keywd == "" || keywd == "Required field" || keywd == "Business Name, Category, Keyword" || keywd == "Find local businesses e.g. hotels, Dallas TX") {
        document.ypform.C.value = "Required field";
        document.ypform.C.style.color = "red";
        document.ypform.C.focus();

        return false;
    }

    keywd = keywd.replace( /Business Name, Category, Keyword/g, "" );
    keywd = keywd.replace( /Required field/g, "" );
    document.ypform.C.value = keywd;

    return true;
}

function MM_setTextOfTextfield(objName,x,newText) { //v3.0
    var obj = MM_findObj(objName);
    if (obj) obj.value = newText;
}

function MM_findObj(n, d) { //v4.01
    var p,i,x;
    if(!d) d=document;
    if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document;
        n=n.substring(0,p);
    }
    if(!(x=d[n])&&d.all) x=d.all[n];
    for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
    for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
    if(!x && d.getElementById) x=d.getElementById(n);
    return x;
}

function changeTxtColor(objName, objText) {
    var obj = MM_findObj(objName);
    if (obj) var objVal = obj.value;
    objVal = objVal.replace( /^\s+/g, "" );

    if (objVal == 'Required field') {
        obj.style.color = "#FF0000";  // Required Field is red

    } else if (objVal == objText) {
        obj.style.color = "#999999";  // Default text is gray
    } else {
        obj.style.color = "#000000";  // user text is black
    }
}

function isInputEmpty(objName, msgText) {
    var obj = MM_findObj(objName);

    if (obj) var objVal = obj.value;

    objVal = objVal.replace( /^\s+/g, "" );

    if (objVal == "") {
        alert(msgText);
        obj.focus();
        return true;
    }
    return false;
}

function getInputText(objName) {
    var obj = MM_findObj(objName);
    var objVal =  '';
    if (obj) objVal = obj.value;
    objVal = objVal.replace( /^\s+/g, "" );

    return objVal;
}

function toggleContent(contentID, object){
    if (contentID ==1){
        var listshow = document.getElementById(object);
        listshow.style.display="block";
    }
    if (contentID==0){
        var listshow = document.getElementById(object);
        listshow.style.display="none";
    }
}
		
function setie6popupCookie() {
    var today = new Date();
    var expireDate = new Date();
    expireDate.setTime(today.getTime() + 60*60*24*1000);//1 day
    document.cookie= "iepopup_ck=" + "yes"  + "; expires=" + expireDate + "; path=/" + "; domain=.superpages.com";
}

function checkforie6popup()
{ 
    //read cookie
    var rck=$.cookie('iepopup_ck');
    // In MSIE, the true version is after "MSIE" in userAgent

    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
        var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
        if (ieversion<=6 && (rck == null))
        {
            setie6popupCookie();
            P7_Snap('what','ie6popup',10,20);
            $('#ie6popup').show();
        }
    }
}

function P7_Snap() { //v2.67 by PVII
    var g,x,y,ox,bx,oy,p,tx,a,b,k,d,da,e,el,tw,q0,xx,yy,w1,pa='px',args=P7_Snap.arguments;
    a=parseInt(a);
    if(document.layers||window.opera){
        pa='';
    }
    for(k=0;k<(args.length);k+=4){
        if((g=MM_findObj(args[k]))!=null){
            if((el=MM_findObj(args[k+1]))!=null){
                a=parseInt(args[k+2]);
                b=parseInt(args[k+3]);
                x=0;
                y=0;
                ox=0;
                oy=0;
                p="";
                tx=1;
                da="document.all['"+args[k]+"']";
                if(document.getElementById){
                    d="document.getElementsByName('"+args[k]+"')[0]";
                    if(!eval(d)){
                        d="document.getElementById('"+args[k]+"')";
                        if(!eval(d)){
                            d=da;
                        }
                    }
            }else if(document.all){
                d=da;
            }
            if(document.all||document.getElementById){
                while(tx==1){
                    p+=".offsetParent";
                    if(eval(d+p)){
                        x+=parseInt(eval(d+p+".offsetLeft"));
                        y+=parseInt(eval(d+p+".offsetTop"));
                    }else{
                        tx=0;
                    }
                }
                ox=parseInt(g.offsetLeft);
            oy=parseInt(g.offsetTop);
            tw=x+ox+y+oy;
            if(tw==0||(navigator.appVersion.indexOf("MSIE 4")>-1&&navigator.appVersion.indexOf("Mac")>-1)){
                ox=0;
                oy=0;
                if(g.style.left){
                    x=parseInt(g.style.left);
                    y=parseInt(g.style.top);
                }else{
                    w1=parseInt(el.style.width);
                    bx=(a<0)?-5-w1:-10;
                    a=(Math.abs(a)<1000)?0:a;
                    b=(Math.abs(b)<1000)?0:b;
                    x=document.body.scrollLeft+event.clientX+bx;
                    y=document.body.scrollTop+event.clientY;
                }
            }
    }else if(document.layers){
        x=g.x;
        y=g.y;
        q0=document.layers,dd="";
        for(var s=0;s<q0.length;s++){
            dd='document.'+q0[s].name;
            if(eval(dd+'.document.'+args[k])){
                x+=eval(dd+'.left');
                y+=eval(dd+'.top');
                break;
            }
        }
        }
    e=(document.layers)?el:el.style;
xx=parseInt(x+ox+a),yy=parseInt(y+oy+b);
if(navigator.appVersion.indexOf("MSIE 5")>-1 && navigator.appVersion.indexOf("Mac")>-1){
    xx+=parseInt(document.body.leftMargin);
    yy+=parseInt(document.body.topMargin);
}
e.left=xx+pa;
e.top=yy+pa;
}
}
}
}

function toggle(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function CreateBookmarkLink(){
    title = "Yellow Pages : Superpages.com";
    url = "http://www.superpages.com/";
    if (window.sidebar) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(title, url,"");
    } else if( window.external ) { // IE Favorite
        window.external.AddFavorite( url, title);
    }else if(window.opera && window.print) { // Opera Hotlist
        return true;
    }
}
function displayEACLink() {
    if (SRC_param == 'employee') {
        document.write('<span style="color:#000000;"><b>Employees: </b></span><a onClick="omniTrackGTnSecFeat(\'GT\', \'Employees-Add New Listing\');" href="https://visauth.idearc.com/?dest=http://www.superpages.com/cgi-bin/addchange_redirect.pl?a=add&token=12spad3750&additional1=true&additional2=true&SRC=employee">Add New Listing</a> | ');
    }
}

function displayLocation() {
	
    if (T != "" && S != "") 
    {
        headerText = T+", "+S;
        headerText += " <a href=\"#\" onclick=\"return false;\" rel=\"nofollow\" style=\"size:8px\" class=\"change ot ot_header_change_city\" title=\"Change City\">change</a>"
        document.write(headerText)
        }
    else
    { 
		var host_name = window.location.hostname;

		if (host_name == 'cars.superpages.com' || host_name == 'cars-test.superpages.com')
		{
			headerText = "Cars";
		} else {
			headerText = "Yellow Pages";
		}
        headerText += " <a href=\"#\" onclick=\"return false;\" rel=\"nofollow\" style=\"size:8px\" class=\"change ot ot_header_change_city\">select location</a>"
        document.write(headerText)
        };
}

function displayResLink() {
    if (SRC_param == 'insp') {
        document.write('<a onClick="omniTrackHeaderTabs(\'People\');" href="http://people.superpages.com/?SRC=insp" rel="nofollow"><span>People</span></a>');
    } else {
        //if (SRC_param != "") {
        if (rqst_parms != "") {
            document.write('<a onClick="omniTrackHeaderTabs(\'People\');" href="http://people.superpages.com/?'+rqst_parms+'" rel="nofollow"><span>People</span></a>');
        } else {
            document.write('<a onClick="omniTrackHeaderTabs(\'People\');" href="http://people.superpages.com/" rel="nofollow"><span>People</span></a>');
        }
    }
}

function displayMapLink() {
    var L_encoded = '';
    if (T != "" || S != "") L_encoded = T+' '+S;

    //if (SRC_param != "") {
    if (rqst_parms != "") {
        //document.write('<a onClick="omniTrackHeaderTabs(\'Map\');" href="http://mapserver.superpages.com/mapbasedsearch/?spheader=true&L='+L_encoded+'&SRC='+SRC_param+'" rel="nofollow"><span>Maps</span></a>');
        document.write('<a onClick="omniTrackHeaderTabs(\'Map\');" href="http://mapserver.superpages.com/mapbasedsearch/?spheader=true&L='+L_encoded+'&'+rqst_parms+'" rel="nofollow"><span>Maps</span></a>');
    } else {
        //document.write('<a onClick="omniTrackHeaderTabs(\'Map\');" href="http://yellowpages.superpages.com/mapbasedsearch/mapsearch.jsp?L='+L_encoded+'" rel="nofollow"><span>Maps</span></a>');
        document.write('<a onClick="omniTrackHeaderTabs(\'Map\');" href="http://mapserver.superpages.com/mapbasedsearch/?spheader=true&L='+L_encoded+'" rel="nofollow"><span>Maps</span></a>');
    }
}

var site_url = window.location.href;
function displayBusinessTab() {
    document.write('<li');
    if (site_url.indexOf('.shtml') < 0) {                  // #### For Mobile test servers
        if (site_url.indexOf('/mobile') == -1) {
            document.write(' class="selected"');
        }
    }
    document.write('><a onClick="omniTrackHeaderTabs(\'Business Info\');" href="/"><span class="tab1">Business</span></a></li>');
}

function displayMobileTab() {
    document.write('<li');
    if (site_url.indexOf('.com/mobile') > 0 || site_url.indexOf('.shtml') > 0) {
        document.write(' class="selected"');
    }
    document.write('><a onClick="omniTrackHeaderTabs(\'Mobile\');" href="http://www.superpages.com/mobile/" rel="nofollow"><span class="tab4">Mobile</span></a></li>');
}

function toProperCase(s)
{
    return s.toLowerCase().replace(/^(.)|\s(.)|-(.)/g,
        function($1) {
            return $1.toUpperCase();
        });
}

function getRequestParameter( name )
{
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}
		
function setTS(pT, pS, pLink, pDomain) {
			
			
    // #### For Testing - Comment next line before publishing to PROD
    //    var redirLink = "http://spdev.superpages.com";

    var redirLink = "http://www.superpages.com";
    var cookieDomain = ".superpages.com";
			
    if( pLink ) {
        redirLink = pLink;
    }
			
    if( pDomain ) {
        cookieDomain = pDomain;
    }

    if( pT && pS ) {
        SPC_LQ = unescape(pT) + "|" + unescape(pS);
        SPC_LQ = pT + "|" + pS;
        SPC_LQ = SPC_LQ.replace(/ /g,"\+");
        SPC_LQ = SPC_LQ.replace(/%20/g,"\+");
        setcookie("SPC_LQ", SPC_LQ, 100, "/", cookieDomain);
    //				setcookie("SPC_LQ", SPC_LQ);
    }

    window.location = redirLink;
			
    return false;
						
}

		
function setGeoLoc() {
    var SPC_LQ  = unescape(getcookie('SPC_LQ'));
    if(SPC_LQ != "") {
        var idx1 = SPC_LQ.indexOf('|');
        if(idx1 == -1) return "";
        var idx2 = SPC_LQ.indexOf('|',idx1+1);
        if (idx2==-1) idx2=SPC_LQ.length;
        T = SPC_LQ.substring(0,idx1);
				
        while(T.indexOf('+')>-1) {
            index3 = T.indexOf('+');
            T = "" + (T.substring(0,index3) + " " + T.substring(index3 + 1,T.length));
        }
        S = SPC_LQ.substring(idx1+1,idx2);
        if((T + S) == "") {
            TS = "";
        } else {
            if(T == null || T.length == 0) {
                TS = S;
            } else {
                TS = T + ", " + S;
            }
            
			/* If clause added by Sarayu to nly set for home page, 12/3/2010 */
			if (document.body.id == 'home') {
	            s.pageName = "SPHP " + TS;
			}
        }
    }

	/* If clause added by Sarayu to only set for home page, 12/3/2010 */
	if (document.body.id == 'home') {
		s_code = s.t();	// Track page load.
		if(s_code)document.write(s_code);
	}
}

function getcookie(cookiename) {
    var cookiestring=""+document.cookie;
	var idx1=cookiestring.indexOf(cookiename);
	if (cookiename == "SPFB") {
	idx1=cookiestring.indexOf("SPFB" + "=");
	}
    if (idx1==-1 || cookiename=="") return "";
    var idx2=cookiestring.indexOf(';',idx1);
    if (idx2==-1) idx2=cookiestring.length;
    return unescape(cookiestring.substring(idx1+cookiename.length+1,idx2));
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function setcookie( name, value, expires, path, domain, secure ) {
    // set time, it's in milliseconds
    today.setTime( today.getTime() );
			
    var expires_date
    if ( expires )
    {
        expires = expires * 1000 * 60 * 60 * 24;
        expires_date = new Date( today.getTime() + (expires) );
    }
			
    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

function deletecookie( name, path, domain ) {
    if ( getcookie( name ) ) document.cookie = name + "=" +
        ( ( path ) ? ";path=" + path : "") +
        ( ( domain ) ? ";domain=" + domain : "" ) +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function lastCookie(){
    var lastCS = getcookie("SPC_LQ");
    var lastC="";
    var lastZ="";
    var lastS="";
    var location="";
    if (lastCS != null){
        var lCS = lastCS.split("|");
        lastC = lCS[0];
        lastC = lastC.replace(/\+/g," ");
        lastS = lCS[1];
        lastZ = lCS[2];
        if ( lastZ == undefined ) lastZ = "";
        location = lastC + " " + lastS + " " +  lastZ;
    }
}
	
function trim(str) 
{
   if (str == null) 
     return null;
   var startingIndex = 0;
   var endingIndex = str.length-1;
   while(str.substring(startingIndex, startingIndex+1) == ' ')
   	startingIndex++;
     while(str.substring(endingIndex, endingIndex+1) == ' ')
    	endingIndex--;
	 if(endingIndex < startingIndex) 
	   	return '';
    return str.substring(startingIndex, endingIndex+1);
}  
	
function decode(str) {
	var i = 0;
	str = str.replace('"','');
	var ln = str.length;
	for (i = 0; i <  ln; i++) {
			if (str.charAt(i) == "+") {
              str = str.replace('+', ' ');
			}
	}
	str = unescape(str);
	return str;
}

function getpage1(page) {
 
    // Set up request varible
    try {
        xmlhttp = window.XMLHttpRequest?new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
    }
	  
    catch (e) { 
        alert("Error: Could not load page.");
    }
    scroll(0,0);
    xmlhttp.onreadystatechange = function(){
        if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
            //alert("Status text "+xmlhttp.statusText);
			if (xmlhttp.statusText == "OK") {
               responsetext = xmlhttp.responseText;
			  //alert("responsetext "+responsetext);
			}
            if(document.getElementById("FBregistrationFlyoutWrapper") != null){
                document.getElementById("FBregistrationFlyoutWrapper").style.display="none";
            }
		
			if (responsetext == "SUCCESS"){
				deletecookie("SPFBRes", "/", ".superpages.com");
                showProfile();
            }
        }
    }
    xmlhttp.open("GET", page);
    xmlhttp.send(null);
    return false;
}

function checkStaticPage(){
    var staticPage = false;
    var urlvar=window.location.toString();
    var http_array=urlvar.split("://");
    var url_array=http_array[1].split("/");
    var current_directory = url_array[1];
    var sub_directory = url_array[2];
    var className = current_directory;
    switch(current_directory){
        case "affiliate":{
            staticPage = true;
            $('html').attr('id','affiliate');
            if (!($('body .master').length )) {
                $('body').wrapInner('<div class="master"></div>');
            }
            $('#header').contents().unwrap();
            $('#content').append('</div>');
            break;
        }
        case "affiliateprp":{
            staticPage = true;
            className = "affiliate";
            $('html').attr('id','affiliate');
            if (!($('body .master').length )) {
                $('body').wrapInner('<div class="master"></div>');
            }
            $('#header').contents().unwrap();
            $('#content').append('</div>');
            break;
        }
        case "b2b":{
            staticPage = true;
        }
        case "bp":{
            staticPage = true;
        }
        case "bps":{
            staticPage = true;
        }
        case "cities":{
            staticPage = true;
            var isItWeather = sub_directory.indexOf("weather");
            if (sub_directory == "add_weather.html"){
                className = "add-weather";
            } else if (isItWeather != -1){
                if(sub_directory.indexOf("weatherforecast") != -1 )
                {
                    className = "weather-national"
                    }
                if( sub_directory.indexOf( "-weather-" ) != -1 )
                {
                    className = "weather-city";
                }
            } else {
                className = sub_directory;
            }
        }
        case "edu":{
            staticPage = true;
        }
        case "coupons":{
            $('body').attr('id','coupons');
        }
        case "global":{
            staticPage = true;
        }
        case "lottery":{
            staticPage = true;
        }
        case "postcards":{
            staticPage = true;
        }
        case "ratings_badges":{
            staticPage = true;
        }
        case "terms":{
            staticPage = true;
        }
        case "yellowpages":{
            staticPage = true;
        }
    }
    if(staticPage == true){
        $('body').attr('id','static');
        $('body').addClass(className);
        $('font').contents().unwrap();
        $("img[src$='http://img.superpages.com/images-yp/images/arrow.gif'],img[src$='http://img.superpages.com/images-yp/decor/images/new/arrow.gif']").closest('table').attr('id','breadcrumb');
        $("img[src$='http://sp.superpages.com/images-yp/images/arrow.gif'],img[src$='http://sp.superpages.com/images-yp/decor/images/new/arrow.gif']").closest('table').attr('id','breadcrumb');
    }
}
var originalSearchValue;
$(document).ready(function() {
    checkStaticPage();
	var a1="";
    /* TTP Issue 94837, Sarayu 09/16/2010 */
	/* Use new LABS server (VIP) for auto completion on the home page */
	/* var serHost = "http://yellowpages.superpages.com"; */
	var tservHost = window.location.host;
	//alert(tservHost);
    var serHost = "http://autos.superpages.com/ac";
    var options = {
        serviceUrl: serHost + '/spac.jsp',
        width: 400,
        params: {
            LOC: locn
        },
        noCache: false
    };
 
    a1 = $('#what').autocomplete(options);
       
    $('h1.city a.change').click(function(){
    	
    	var cityChangeUrl = "http://"+tservHost+"/inc/change_city.php";
    	$.getJSON(cityChangeUrl+"?src=" + tservHost + "&callback=?",function(data) {
		$("#changecity").html(data.html).fadeIn('fast');
		$("#changecity a.close").click(function(){
        $("#changecity").fadeOut('fast');
        return false;
		});
		
		$("#form1 .submit").click(function(){
        $("#form1").submit();
		})
		var citySearchValue = $("input#choose_city").attr("value");
		$("input#choose_city").focus(function(){
        if ($("input#choose_city").val() == citySearchValue) {
            $("input#choose_city").val('');
        }
		});
    $("input#choose_city").blur(function(){
        if ($("input#choose_city").val() == '') {
            $("input#choose_city").val(citySearchValue);
        }
    });
	
	$('#city-list a').click(function(){
	
        var selgeo = $(this).attr("href");
			selgeo = selgeo.replace(/http:\/\//g," ");
        var mySplitGeo = selgeo.split("/");
			selgeo = toProperCase(mySplitGeo[2])+"|"+mySplitGeo[1].toUpperCase();
			selgeo = selgeo.replace(/-/g,"\+");

        if (mySplitGeo[1] == 'us') {
            setcookie("SPC_HP", "National", 1, "/", ".superpages.com");			/* set National cookie */
            deletecookie("SPC_LQ", "/", ".superpages.com");     				/* remove Location cookie */
        } else {
            oldcookie = getcookie("SPC_LQ");
        	
            if(oldcookie == "")
            {
                oldcookie = "National|US";
            }
        	
            setcookie("SPC_OLDLQ", oldcookie, 1, "/", ".superpages.com");  			/* set Old Location cookie */
            setcookie("SPC_LQ", selgeo, 1, "/", ".superpages.com");  			/* set Location cookie */
            deletecookie("SPC_HP", "/", ".superpages.com");     				/* remove National cookie */
        }
		try
			{
			if(s.channel == "Home Page"){
					turl = $(this).attr("href");
					window.location.href = turl;
					//document.location.href = turl;
				return false;
				}
			}
			catch(err) { }

    });
    $('a:not([href*="superpages.com"])[href^="http"]').attr({
        target: "_blank"
    });
	});
	return false;
    });
    
    if(originalSearchValue == null) {originalSearchValue = $("input.search-box").attr("title")};
    
    if (T != "" && S != "") {
       // searchValue = originalSearchValue + " "+T+", "+S;
	   searchValue = originalSearchValue + " " + locn;
    } else {
        searchValue = originalSearchValue + " Dallas, TX"
    }
    $("input.search-box").val(searchValue);
    $("input.search-box").attr('title',searchValue);
    $("input.search-box").bind('keypress click', function(){
        if ($("input.search-box").val() == searchValue) {
            $("input.search-box").attr('style','color: #000').val('');
        }
    });
    $("input.search-box").blur(function(){
        if ($("input.search-box").val() == '') {
            $("input.search-box").attr('style','color: #666').val(searchValue);
        }
    });

	$('#states-cities a').click(function(){
		var thref = "http://" + window.location.hostname + $(this).attr("href");
        var selgeo = $(this).attr("href");
        var mySplitGeo = selgeo.split("/");
        selgeo = toProperCase(mySplitGeo[2])+"|"+mySplitGeo[1].toUpperCase();
        selgeo = selgeo.replace(/-/g,"\+");
            oldcookie = getcookie("SPC_LQ");
        	//alert(oldcookie);
          //  if(oldcookie == "")
           // {
           //     oldcookie = "National|US";
			//}
        	
            setcookie("SPC_OLDLQ", oldcookie, 1, "/", ".superpages.com");  		/* set Old Location cookie */
            setcookie("SPC_LQ", selgeo, 1, "/", ".superpages.com");  			/* set Location cookie */
            deletecookie("SPC_HP", "/", ".superpages.com");     				/* remove National cookie */
				
    });
}); //document.ready

(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

