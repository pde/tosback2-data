function findPosY(obj) {
	try {
		var curtop = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				curtop += obj.offsetTop
				obj = obj.offsetParent;
			}
		}
		else if (obj.y) {
			curtop += obj.y;
		}
	}
	catch (e) { }
	return curtop;
}
function doRightRail() {

	if ((document.getElementById('innerRightColumn')) && (document.getElementById('leftColumn'))) {
		document.getElementById('innerRightColumn').style.height = (document.getElementById('leftColumn').clientHeight) + 'px';
	}

	if ((document.getElementById('outerRightColumn')) && (document.getElementById('leftColumn'))) {
		var topLeft = findPosY(document.getElementById('leftColumn'));
		var topRight = findPosY(document.getElementById('outerRightColumn'));
		var bottomLeft = topLeft +document.getElementById('leftColumn').clientHeight;
		var bottomRight = topRight+document.getElementById('outerRightColumn').clientHeight;
		var offset = topLeft - topRight;
		if (bottomLeft < bottomRight) {
			var newHeight = (document.getElementById('outerRightColumn').clientHeight - offset) + 25;
			var oldHeight = document.getElementById('leftColumn').clientHeight;
			if (oldHeight < newHeight) {
				document.getElementById('leftColumn').style.height = newHeight +'px';	
			}
		}
		bottomLeft = topLeft +document.getElementById('leftColumn').clientHeight;
		bottomRight = topRight+document.getElementById('outerRightColumn').clientHeight;
		if (bottomLeft > bottomRight) {
			var newHeight = document.getElementById('leftColumn').clientHeight + offset;
			var oldHeight = document.getElementById('outerRightColumn').clientHeight;
			if (oldHeight < newHeight) {
				document.getElementById('outerRightColumn').style.height = newHeight +'px';	
			}
		}
	}
}

function drawStubCols() {
	bGuest = false;
	bFullReg = false;
	bEmailSet = false;
	gFakeLinksActive = false;
	gCategoryId = '';
	if (document.getElementById('prefCenterModuleResults')) {
		moduleCheck();
	}
	if (document.getElementById('hiddenGenreId')) {
		getCategoryId();
	}
	
	try {
		var bottomPos = findPosY(document.getElementById('footer'));
		var bottomBodyTop = false;
		if (document.getElementById('bottomBody')) {
			bottomBodyTop = findPosY(document.getElementById('bottomBody'));
		}
	}
	catch (e) {
	}
	try {
		if (document.getElementById('leftColumn')) {
			var leftColTop = findPosY(document.getElementById('leftColumn'));
			var newHeight = bottomPos - leftColTop;
			if (newHeight > document.getElementById('leftColumn').clientHeight) {
				document.getElementById('leftColumn').style.height = newHeight+'px';
			}
		}
	}
	catch (e) {
	} 

	doRightRail();

	try {
		if (document.getElementById('innerRightColumn')) {
			var innerRightColTop = findPosY(document.getElementById('innerRightColumn'));
			var newHeight = bottomPos - innerRightColTop;
			if (newHeight > document.getElementById('innerRightColumn').clientHeight) {
				document.getElementById('innerRightColumn').style.height = newHeight+'px';
			}
		}
	}
	catch (e) {
	}

	doRightRail();
}

// pref center modules 
function turnAlertOn() {
	if (document.getElementById('pc_alertContainer')) {
		document.getElementById('pc_alertContainer').style.display = 'block';
		doRightRail();
	}
}

function userCheck() {
if ((!getCookieAllIn('STUB_SESSION')) && (!getCookieAllIn('STUB_PERSISTENT'))) { return false; }
var stubCookie = urlDecode(getCookieAllIn('STUB_SESSION'));
userId = stubCookie.match(/guest_uid\~\^\~(\d*)\~\^\~/);


if (userId) {
	bGuest = true;
	bFullReg = false;
}
else {
	stubCookie = urlDecode(getCookieAllIn('STUB_PERSISTENT'));
	userId = stubCookie.match(/stub_uid\~\^\~(\d*)\~\^\~/);
	bGuest = false;
	bFullReg = true;
}

return(userId);
}

function enterFunc(evt) {
    var charCode = 0;
    if (!evt) {evt = event;}
    if (evt.which) { charCode = evt.which; }
    else if (evt.charCode) { charCode = evt.charCode; }
    else if (evt.keyCode) { charCode = evt.keyCode; }
    if ((charCode == 13) || (charCode == 3)) { doPrefs(); }
}

function moduleCheck() {
userId = userCheck();
if (!userId) {
	document.getElementById('moduleOff').style.display = 'block';			
	}
}

function getCategoryId() {
try {
	var categoryId, bDisplay = false;
	var genreId = getHiddenGenreId();
	if (genreId.length < 1) { return; }
	// begin modify for bug 11822, by Shell
	var callSearch = makeRequest('/listingCatalog/select', 'indent=on&version=2.2&q=%2Bid%3A'+escape(genreId)+'%20AND%20do_not_display_flag%3A0&start=0&rows=1&fl=do_not_display_flag+channelId&qt=genres&wt=standard&stubLogAuditMarker=agouti.getCategoryId');
	callSearch.onreadystatechange = function () {
		if ((callSearch.readyState == 4) && (callSearch.status == 200)) {
			var xmlDoc = callSearch.responseXML.documentElement;
			var docs = xmlDoc.getElementsByTagName('result')[0].getElementsByTagName('doc');
			if(docs.length > 0){
				var attrs = docs[0].getElementsByTagName('str');
				for(var i=0;i<attrs.length;i++){
					var attrName = attrs[i].attributes.getNamedItem('name').value;
					if(attrName == 'channelId'){
						categoryId = attrs[i].childNodes[0].nodeValue;
					}
				}
			}
			if (categoryId == 1 || categoryId == 174 || categoryId == 28) {
				turnAlertOn();
				enableTicketAlertLink(categoryId);
			}
		}
	}
	// end modify for bug 11822, by Shell
}
catch (e) {
	//alert('there was an error');
	if (document.getElementById('prefCenterModule')) {
		document.getElementById('prefCenterModule').style.display = 'none';
	}
	return;
}
}


function enableTicketAlertLink(catId) {
gCategoryId = catId;
gFakeLinksActive = true;

var spans = document.getElementsByTagName('span');
for (i=0; i<spans.length; i++) {
if (spans[i].className && spans[i].className == 'fakeLink') {
	spans[i].className = 'fakeLinkActive';
}
}	
}



function getHiddenGenreId() {
var id = document.getElementById('hiddenGenreId').childNodes[0].nodeValue;
id = cleanUp(id);
return id;
}

function getHiddenGenreDesc() {
var desc = document.getElementById('hiddenGenreDesc').childNodes[0].nodeValue;
desc = cleanUp(desc);
return desc;
}

function cleanUp(txt) {
if (!txt) {return;}
txt = txt.replace(/\n+|\t+/g, '');
txt = txt.replace(/^\s+|$\s+/g, '');
return txt;
}

/*(function trackPCAction(action,value) {
	try {
		s.pageName = '';
		s.server = '';
		s.channel = '';
		s.pageType = '';
		s.hier1 = '';
		s.eVar26 = '';
		s.eVar27 = '';
		if (action == 'myAlerts') {
			s.linkTrackVars="prop12";
			s.prop12 = value;
			s.tl(this,'o','My Alerts Add');
		}
		else if (action == 'ticketUpdate') {
			s.linkTrackVars="prop13";
			s.prop13 = value;
			s.tl(this,'o','Ticket Update Add');	
		}
	}
	catch (e) {
		return;
	}
}*/

function kludgeThis() {
var type = gCategoryId;
var id = getHiddenGenreId();
var desc = getHiddenGenreDesc();
getStatus(type,id,desc);
}

function getStatus(type,value,text) {

if (!gFakeLinksActive) return;

if (!userId && !bEmailSet) {
showNoUser();
return;
}	

var requestType = 'Genre';
var comm;
var data;

if (type.toLowerCase() == 'geo' || type.toLowerCase() == 'venue') {
data = 'geography=' + value;
comm = 1;
requestType = 'Geo';
}
else if (type == 1 || type.toLowerCase() == 'artist' || type.toLowerCase() == 'concert') { //artist
data = 'genre=' + value;
comm = 2;
}
else if (type == 28 || type.toLowerCase() == 'sports') { //sports
data = 'genre=' + value;
comm = 3;
}
else if (type == 174 || type.toLowerCase() == 'theater') { //theater
data = 'genre=' + value;
comm = 5;
}


var comm_request = makeRequest('/preferenceCenter/addCommPreference','comm=' + comm);
var add_request = makeRequest('/preferenceCenter/add'+requestType+'Preference',data);


add_request.onreadystatechange = function() {
if ((add_request.readyState == 4) && (add_request.status == 200)) {
	//trackPCAction('myAlerts',text);
	successUser(text);
}
else {
	if (add_request.readyState == 4) {
		failureUser();
	}
}
}
}

function getCookieAllIn(name) {
var nameEQ = name+'=';
if (!document.cookie) { return false; }
var ca = document.cookie.split(';');
for(var i=0; i < ca.length; i++)	{
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return false;
}

function urlDecode(string) {
var HEXCHARS = "0123456789ABCDEFabcdef"; 
var decoded = ''; var i=0;
while (i < string.length) {
var ch = string.charAt(i);
if (ch == "+") {
	decoded += " ";
	i++;
  }
else if (ch == "%") {
	if ((i<(string.length-2))&&(HEXCHARS.indexOf(string.charAt(i+1)) != -1) && (HEXCHARS.indexOf(string.charAt(i+2)) != -1)) {
		decoded += unescape(string.substr(i,3));
		i += 3;
	}
	else {
		decoded += "%[ERROR]";
		i++;
	}
}
else {
	decoded += ch;
	i++;
}
} // while
 return decoded;
}

function showNoUser() {
document.getElementById('prefCenterUser').style.display = 'none';
document.getElementById('prefCenterNoUser').style.display = 'block';
}

function showUser() {
document.getElementById('prefCenterNoUser').style.display = 'none';
document.getElementById('prefCenterUser').style.display = 'block';
}
function emailValidationError(text) {
var outputArea = document.getElementById('prefCenterAdviceText');
clearElement(outputArea);
outputArea.style.className = 'prefCenterWarning';
outputArea.appendChild(document.createTextNode(text));
return;	
}

function doPrefs() {
var prefCenterBtn = document.getElementById('prefCenterButton');
prefCenterBtn.disabled = 'disabled';
var pcEmail = document.getElementById('prefCenterEmail').value;

if ( (!userId) && ((pcEmail.indexOf('@') < 1) || (pcEmail.indexOf('.') < 1)) ) {
	emailValidationError('Please enter a valid email address');
	prefCenterBtn.removeAttribute('disabled');
	return;
}

/*var xmlRequest = 'serviceRequestBody=<userValidation><emailAddress>'+pcEmail+'</emailAddress></userValidation>';
var getuser_request = makeRequest('/userSvc/updateCookiesWithUserId',xmlRequest);
getuser_request.onreadystatechange = function() {
if ((getuser_request.readyState == 4) && (getuser_request.status == 200)) {
	var xmlDoc = getuser_request.responseXML.documentElement;
	if (!xmlDoc) {
		failureUser();
	}
	if (!xmlDoc.getElementsByTagName('userId')) {
		failureUser();
	}
	
	bEmailSet = true;

	var guestUserFlag = xmlDoc.getElementsByTagName('guestUserFlag')[0].childNodes[0].nodeValue;
	var prefList = document.getElementById('prefCenterNoUser').getElementsByTagName('input');
	var actionArray = new Array();
	var data ='';
	for (var i=0; i<prefList.length; i++) {
		if (prefList[i].checked) {
			var url = '/preferenceCenter/add'+prefList[i].name;
			if (prefList[i].name.indexOf('enre') > 0) {
				data = 'genre='+prefList[i].value;
				var genre_request = makeRequest('/preferenceCenter/addCommPreference','comm=3');
			}
			else {
				data = 'geography='+prefList[i].value;
				var geo_request = makeRequest('/preferenceCenter/addCommPreference','comm=1');
			}
			var tempArray = new Array(url,data);
			actionArray.push(tempArray);
		}
	}
	if (actionArray.length < 1) {
		emailValidationError('Please select at least one alert');
		prefCenterBtn.removeAttribute('disabled');
		return;
	}
	doPrefCenterActions(actionArray,guestUserFlag);
}
else {
	if (getuser_request.readyState == 4) {
		failureUser();
	}
}
}*/

	bEmailSet = true;
	var guestUserFlag = 0;
	var prefList = document.getElementById('prefCenterNoUser').getElementsByTagName('input');
	var actionArray = new Array();
	var data ='';
	for (var i=0; i<prefList.length; i++) {
		if (prefList[i].checked) {
			var url = '/preferenceCenter/add'+prefList[i].name;
			if (prefList[i].name.indexOf('enre') > 0) {
				data = 'genre='+prefList[i].value+'&email='+escape(pcEmail);
				var genre_request = makeRequest('/preferenceCenter/addCommPreference','comm=3&email='+escape(pcEmail));
			}
			else {
				data = 'geography='+prefList[i].value+'&email='+escape(pcEmail);
				var geo_request = makeRequest('/preferenceCenter/addCommPreference','comm=1&email='+escape(pcEmail));
			}
			var tempArray = new Array(url,data);
			actionArray.push(tempArray);
		}
	}
	if (actionArray.length < 1) {
		emailValidationError('Please select at least one alert');
		prefCenterBtn.removeAttribute('disabled');
		return;
	}
	doPrefCenterActions(actionArray,guestUserFlag);
}

function doPrefCenterActions(array,guestUserFlag) {
	doThisAction(array,0);
}

function doThisAction(array,i) {
	var add_request = false;
	if (i < array.length-1) {
		add_request = false;
		add_request = makeRequest(array[i][0],array[i][1]);
		add_request.onreadystatechange = function() {
			if (add_request.readyState == 4) {
				if (add_request.status == 200) {
					doThisAction(array,i+1);
				}
				else {
					failureUser();
				}
			}
		}
	}
	else {
		add_request = false;
		add_request = makeRequest(array[i][0],array[i][1]);
		add_request.onreadystatechange = function() {
			if ((add_request.readyState == 4) && (add_request.status == 200)) {
				successUser('StubHub');
			}
			else {
				if (add_request.readyState == 4) {
					failureUser();
				}
			}
		}
	}
}

function successUser(text) {
var dummy = userCheck();

showUser();

var outputArea = document.getElementById('prefCenterUserOutput');
document.getElementById('prefCenterUser').style.display = 'none';
document.getElementById('prefCenterNoUser').style.display = 'none';
clearElement(outputArea);
var newText = document.createTextNode('Thank you for signing up for the '+text+' alert!');
var newBoldTag = document.createElement('b');
newBoldTag.appendChild(newText);
outputArea.appendChild(newBoldTag);
outputArea.appendChild(document.createElement('br'));
var linkUrl = '/?gSec=account&action=my';
var linkText = 'go to My Account';


if (bGuest) {
linkUrl = '/?gSec=login&gAct=register';
linkText = 'complete your registration';
}
newText = document.createTextNode('To customize your experience even more, ');
var newLink = document.createElement('a');
newLink.href = linkUrl;
newLink.appendChild(document.createTextNode(linkText));
outputArea.appendChild(newText);
outputArea.appendChild(newLink);
}

function failureUser() {
var outputArea = document.getElementById('prefCenterUserOutput');
clearElement(outputArea);
}

function makeRequest(url,data) {
var http_request = false;
if (window.XMLHttpRequest) { // Mozilla
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType) {
	http_request.overrideMimeType('text/xml');
}
}
else if (window.ActiveXObject) { // IE
try {
	http_request = new ActiveXObject("Msxml2.XMLHTTP");
}
catch (e) {http_request = new ActiveXObject("Microsoft.XMLHTTP");}
}
  http_request.open("post", url, true);
  http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
http_request.send(data);
return (http_request);
}

function doPrefModule () {
errorModule('prefCenterEmailError','');
errorModule('prefCenterNameError','');

document.getElementById('prefCenterModuleButton').disabled == 'disabled';
var email = document.getElementById('prefCenterModuleEmail').value;
var name = document.getElementById('prefCenterModuleName').value;
var city =  document.getElementById('prefCenterModuleCity').options[document.getElementById('prefCenterModuleCity').selectedIndex].value;
var genre = parseInt(document.getElementById('prefCenterModuleGenre').value);
if ( (!userId) && ((email.indexOf('@') < 1) || (email.indexOf('.') < 1)) ) {
errorModule('prefCenterEmailError','Please enter a valid email address.');
document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
return;
}
bEmailSet = true;
if ((!userId) && (name.length<2)) {
errorModule('prefCenterNameError','Please enter your name.');
document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
return;
}
if (city == 0) {
errorModule('prefCenterCityError','Please select a city.');
document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
return;
}

var stubCookie = getCookieAllIn('STUB_PERSISTENT');
if (!stubCookie) {
	doModulePrefsNoUser(email,name,city,genre);
	return;
}
else {
if (!userId) {
	doModulePrefsNoUser(email,name,city,genre);
	return;
}
doModulePrefsUser(city,genre,0);
}
}

function doModulePrefsUser(city, genre, guestUserFlag) {
var geo_request = makeRequest('/preferenceCenter/addGeoPreference','geography='+city);
var comm_request = makeRequest('/preferenceCenter/addCommPreference','comm=1');
// only testing one ...
comm_request.onreadystatechange = function() {
if ((comm_request.readyState == 4) && (comm_request.status == 200)) {
	var xmlDoc = comm_request.responseXML.documentElement;
	if (!xmlDoc) {
		failureModule('Unable to process, please try again');
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
	if (xmlDoc.getElementsByTagName('status').length > 0) {
		//trackPCAction('ticketUpdate',document.getElementById('prefCenterModuleCity').options[document.getElementById('prefCenterModuleCity').selectedIndex].firstChild.nodeValue);
		successModule();
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
	else {
		failureModule('Could not set preferences');

		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
}
else {
	if (comm_request.readyState == 4) {
		failureModule('Unable to process, please try again');
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
}	
}
}

function failureModule(text) {
document.getElementById('prefCenterModuleResults').style.display='block';
document.getElementById('prefCenterModule').style.display='none';
var outputArea = document.getElementById('prefCenterModuleResults');
clearElement(outputArea);
outputArea.className='prefCenterWarning';
outputArea.appendChild(document.createTextNode(text));
}

function doModulePrefsNoUser(email,name,city,genre) {
/*var xmlRequest = 'serviceRequestBody=<userValidation><emailAddress>'+email+'</emailAddress></userValidation>';
var getuser_request = makeRequest('/userSvc/updateCookiesWithUserId',xmlRequest);
getuser_request.onreadystatechange = function() {
if ((getuser_request.readyState == 4) && (getuser_request.status == 200)) {
	var xmlDoc = getuser_request.responseXML.documentElement;
	if (!xmlDoc) {
		failureModule('myStubHub is currently down for routine, scheduled maintenance.');
		return;
	}
	if (xmlDoc.getElementsByTagName('userId').length<1) {
		failureModule('myStubHub is currently down for routine, scheduled maintenance.');
		return;
	}
	var guestUserFlag = xmlDoc.getElementsByTagName('guestUserFlag')[0].childNodes[0].nodeValue;
	doModulePrefsUser(city,genre,1);
}
else {
	if (getuser_request.readyState == 4) {
		failureModule('myStubHub is currently down for routine, scheduled maintenance.');
		return;
	}
}
}*/

var geo_request = makeRequest('/preferenceCenter/addGeoPreference','geography='+city+'&email='+escape(email));
var comm_request = makeRequest('/preferenceCenter/addCommPreference','comm=1&email='+escape(email));
// only testing one ...
comm_request.onreadystatechange = function() {
if ((comm_request.readyState == 4) && (comm_request.status == 200)) {
	var xmlDoc = comm_request.responseXML.documentElement;
	if (!xmlDoc) {
		failureModule('Unable to process, please try again');
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
	if (xmlDoc.getElementsByTagName('status').length > 0) {
		//trackPCAction('ticketUpdate',document.getElementById('prefCenterModuleCity').options[document.getElementById('prefCenterModuleCity').selectedIndex].firstChild.nodeValue);
		successModule();
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
	else {
		failureModule('Could not set preferences');

		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
}
else {
	if (comm_request.readyState == 4) {
		failureModule('Unable to process, please try again');
		document.getElementById('prefCenterModuleButton').removeAttribute('disabled');
		return;
	}
}	
}
}

function successModule() {
userCheck();
document.getElementById('prefCenterModuleResults').style.display='block';
document.getElementById('prefCenterModule').style.display='none';
var outputArea = document.getElementById('prefCenterModuleResults');
clearElement(outputArea);
var mainText = 'Thanks for signing up! To customize your experience even more, ';
var linkText = 'go to My Account';
var linkUrl = '/?gSec=account&action=my';
if (bGuest) {
linkText = 'complete your registration';
linkUrl = '/?gSec=login&gAct=register';
}
var newLink = document.createElement('a');
newLink.href = linkUrl;
newLink.appendChild(document.createTextNode(linkText));
outputArea.appendChild(document.createTextNode(mainText));
outputArea.appendChild(newLink);
}

function errorModule(eleId, text) {
if (!document.getElementById(eleId)) {return;}
var element = document.getElementById(eleId);
clearElement(element);
element.appendChild(document.createTextNode(text));
}

function clearElement(element) {
if (element.hasChildNodes()) {
var nodeCount = element.childNodes.length;
for (var i=0; i<nodeCount; i++) {
	element.removeChild(element.childNodes[0]);
}
}
}

function swpcntnt(src,trgt) {
	// begin modify for bug 11822, by Shell
	var trgtEl = document.getElementById(trgt);
	var srcEl = document.getElementById(src);
	var srcChildNodes = srcEl.childNodes;
	var l = srcChildNodes.length;
	var children = new Array(l);
	for (var i=0; i<l; i++) {
		children[i] = srcChildNodes[0];
		srcEl.removeChild(srcChildNodes[0]);
	}
	for (var i=0; i<l; i++) {
		trgtEl.appendChild(children[i]);
	}
	// end modify for bug 11822
}
