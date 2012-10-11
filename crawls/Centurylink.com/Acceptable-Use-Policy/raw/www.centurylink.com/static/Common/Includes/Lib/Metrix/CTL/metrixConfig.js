/*** Omniture SiteCatalyst Unique PageName Tagging ***/

for(i=0;i<document.forms.length;i++){
if(location.pathname=="/shop/Television/index.html"){if(typeof(pageNameExt)=='undefined'&&!document.getElementById('location'))var pageNameExt="_PRE"}
else if(typeof(pageNameExt)=='undefined'&&document.forms[i].id.match(/availForm|newCustomers|continueForm/))var pageNameExt="_PRE"};
function tagAddressSelect(){$('#address').change(function(){trackAvailCheck('NOrder_Address');this.form.submit()});}
function trackAvailCheck(cType){
	s.linkTrackVars='eVar12,events';
	s.linkTrackEvents='event8';
	s.events='event8';
	s.eVar12='CheckAvail_'+cType;
	void(s.tl());//alert('CheckAvail_'+cType);
	void(pixel_conversion('2034')); //icrossing tracking call
}
function makePOSTRequest(http_request, url, parameters, destination) {
	if (http_request) {
		if(typeof(destination)=="string") destination = document.getElementById(destination);
		http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.setRequestHeader("Content-length", parameters.length);
		http_request.setRequestHeader("Connection", "close");
		http_request.send(parameters);
		http_request.onreadystatechange = function() {
			if (http_request.readyState == 4) {
				if (http_request.status == 200) {
					result = http_request.responseText;
					destination.innerHTML = result;
					tagAddressSelect();
					return true;
				} else {
					if (http_request.readyState == 4) {
						if (http_request.status == 200) {
							result = http_request.responseText;
							destination.innerHTML = result;
							tagAddressSelect();
							return true;
						} else {
							destination.innerHTML = 'An error has occurred - please try again later.';
							return false;
						}
					}
				}
			}
		}
	} else {
	   return false;
	}
}
$('form#newCustomers').submit(function(){trackAvailCheck('New_Zip');});
$('form#continueForm').submit(function(){trackAvailCheck('Existing_Phone');});


/*** Doubleclick onclick tracking ***/
function dblClck_btnClick() {
	//remove old DART tag; leave function so nothing breaks - Eric M - 5/29/2012

 }

/*** Generic load of Floodlight/DART tag onClick ***/
/*** Use for loading DART tags on buttons, images, etc where click is involved ***/
function genFloodlight_onClick(srcStr) {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	var tag_url="https://fls.doubleclick.net/activityi;" + srcStr + a + "?";
	if(document.getElementById("genDARTonclick_Div")){var flDiv=document.getElementById("genDARTonclick_Div");}
	else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="genDARTonclick_Div";flDiv.style.display="none";}
	var genDARTiframe=document.createElement("iframe");
	genDARTiframe.id="genDARTonclick_"+Math.floor(Math.random()*999999);
	genDARTiframe.src=tag_url;
	flDiv.appendChild(genDARTiframe);
	setTimeout("return",1500);
 }
/*** GLOBAL Floodlight/DART tag **/

	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	var nowTimestamp = new Date();
	var currDateStr = nowTimestamp.getHours() + ":" + nowTimestamp.getMinutes() + ":" + nowTimestamp.getSeconds() + ":" + nowTimestamp.getMilliseconds();
	var currPage = window.location.pathname;
	if (typeof setU6 == "undefined"){
		var setU6 = "GLOBAL";
	}

/*
	This DART tag is removed to mitigate a mixed security warning IN IE 9.
	This mixed security warning was causing multiple usability issues throughout centurylink.com,
	Including several serious issues on www.centurylink.com/prismtv

	//Start of Rosetta DoubleClick Floodlight Tag: Please do not remove
	//Activity name of this tag: Global Footer Tag
	//URL of the webpage where the tag is expected to be placed: http://www.centurylink.com/
	//This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
	//Creation Date: 12/16/2010
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	document.write('<iframe src="https://fls.doubleclick.net/activityi;src=2833013;type=shared;cat=globa539;u7='+currDateStr+';u5='+currPage+';u6='+setU6+';u2=Page;ord=' + a + '?" width="1" height="1" frameborder="0"></iframe>');

 */

/*** Omniture SiteCatalyst ***/
document.write('<script type="text/javascript" src="/static/Common/Includes/Lib/Metrix/CTL/s_code.js"></'+'script>');

/*** iCROSSING i2a global tracking code ***/
document.write('<script type="text/javascript" src="/static/Common/Includes/Lib/Metrix/CTL/i2a.js"></'+'script>');

/*** Tealeaf tracking code ***/
document.write('<script type="text/javascript" src="/static/Common/Includes/Lib/Metrix/CTL/TeaLeaf.js"></'+'script>');

/*** Opinionlab - Inject the Opinionlab Feedback link into the global footer ***/
document.write('<script language="javascript" src="/static/Common/Includes/Lib/Metrix/CTL/oo_engine.js"></'+'script>');
$('#footer>.support>.nav>li:first').removeClass('first').parent().prepend('<li class="first"><a href="javascript:O_LC();">Feedback<img src="/static/Common/Includes/Lib/Metrix/CTL/sm_oo.gif" style="margin-left:6px;border:0"/></a></li>');

/** This appears to fix a jquery-ui problem. Your guess is as good as anybody's. **/
document.write('&nbsp;');
/*** Foresee Trigger code ***/
//document.write('<script type="text/javascript" src="/static/Common/Includes/Lib/Metrix/Common/foresee/foresee-trigger.js"></script>');
