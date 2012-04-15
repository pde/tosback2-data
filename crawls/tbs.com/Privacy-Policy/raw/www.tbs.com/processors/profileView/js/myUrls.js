
var MyUrls = {
getMyUrlsURL: '/processors/profile/services/getMyBookmarks.do',
saveMyUrlsURL: '/processors/profile/services/saveMyBookmark.do',
removeMyUrlURL: '/processors/profile/services/deleteMyBookmark.do',
saveMyShowURL: '/processors/profile/services/saveMyShows.do',
removeMyShowURL: '/processors/profile/services/deleteMyShows.do',
showIds:['43466','43472','43473','43470','43471','43669','43671'],
showUrlsContainerElement: '',
showUrlsElement: '',
defaultShowUrlsElement: 'myUrls',
defaultShowUrlsContainerElement: 'moreSection',
removeUrlsElement: '',
showElement: '',
setShowIds: function(shows) {
this.showIds = shows;
},
updateMyShow: function(element,feedUrl) {
this.showElement = element;
if (element && element.checked) {
if (feedUrl == null) {
alert("can't save the show with no contentId");
element.checked = false;
}else {
var param = 'showName='+element.id;
if (feedUrl != null) {
param = param + "&showId="+feedUrl;
}
this.getJSONData('saveShow',param, this.saveShow.bind(this));
}
}else if(element && ! element.checked) {
var param = 'showId='+feedUrl;
this.getJSONData('removeShow',param, this.saveShow.bind(this));
}
},
removeThisUrl: function(element) {
this.removeUrlsElement = element;
var param = 'url='+element.id;
this.getJSONData('removeUrl',param, this.removeUrl.bind(this));
},
saveThisUrl: function (container, element,urlName, url) {
this.showUrlsContainerElement = container || defaultShowUrlsContainerElement;
this.showUrlsElement = element || this.defaultShowUrlsElement;
var param = 'title=' + urlName + '&url='+url;
this.getJSONData('saveUrl',param, this.displayUrls.bind(this));
},
viewMyTntUrls: function (container, element) {
this.showUrlsContainerElement = container || defaultShowUrlsContainerElement;
this.showUrlsElement = element || this.defaultShowUrlsElement;
this.getJSONData('viewUrls', '', this.displayUrls.bind(this));
},
saveShow: function(json) {
for (var y = 0; y < this.showIds.length; y++) 
{
var thisShowId = this.showIds[y];
var showElem = document.getElementById(thisShowId);
if (showElem != null) {
//alert(showElem.id+thisShowId);
var found = false;
for(var x = 0; x < json.length; x++) {
var showName = json[x].name;
var showId = json[x].id;
if (thisShowId == showId) {
found = true;
break;
} 
}
if (found) {
showElem.style.display = 'block';
}else { 
showElem.style.display = 'none';
}
}else {
//alert("showElem is null");
}
}
},
removeShow: function(json) {
this.showElement.checked = false;
top.location.reload(true);
top.frames['showFrame'].location.reload(true);
},
removeUrl: function() {
var parentNode = this.removeUrlsElement.parentNode;
if (parentNode != null) {
parentNode = parentNode.parentNode;
if (parentNode != null && parentNode.style != null && parentNode.style.display != null) {
parentNode.style.display = 'none';
}
}
},
displayUrls: function (json) {
if (json == null || typeof json == 'undefined') {
}else {
var containerElem = document.getElementById(this.showUrlsContainerElement);
if (containerElem) {
containerElem.style.display = "block";
}
var showUrlsElem = document.getElementById(this.showUrlsElement);
if (showUrlsElem)
{
var urlNode = document.getElementById('urlNode');
if (urlNode) {
showUrlsElem.removeChild(urlNode);
}
var entryDiv = Builder.node('div',{id:'urlNode'});
if (json.length > 0) {
var titleSection = Builder.node('p','', 'My Bookmarks:');
}else {
var titleSection = Builder.node('p','', 'You do not have any myTBS bookmarks.');
}
entryDiv.appendChild(titleSection);
for(var x = 0; x < json.length; x++) {
var paragraph = Builder.node('p');
var linkhref = Builder.node('a', {href:json[x].url,target:'_top'}, this.truncateDetail(json[x].name,40));
paragraph.appendChild(linkhref);
entryDiv.appendChild(paragraph);
}
var newbmheight = json.length;
newbmheight = newbmheight * 15;
newbmheight = newbmheight + 110;
newbmheight = newbmheight+"px"
window.parent.document.getElementById("loginframe").style.height=newbmheight;
// window.parent.document.getElementById("loginframe").style.border="1px solid black";
//alert(json.length);
showUrlsElem.appendChild(entryDiv);
}
}
},
truncateDetail: function(detail,l) {
var words=detail.split(" ");
var numWords=words.length;
var output = new Array();
var ol=0;
var cWord = '';
for(var w=0; w<numWords; w++)
{
cWord=words[w];
var cwl=cWord.length;
if((ol+cwl)<=l)
{
output.push(cWord);
ol+=cwl+1;
}
else {
break;
}
}
return output.join(" ")+"";
},
getJSONData: function(actionItem, param, callback) {
var requestedUrl = this.getMyUrlsURL;
if (actionItem == 'saveUrl') {
requestedUrl = this.saveMyUrlsURL;
if (param !='') {
requestedUrl = requestedUrl + '?' + param;
}
}else if (actionItem == 'removeUrl') {
requestedUrl = this.removeMyUrlURL;
if (param !='') {
requestedUrl = requestedUrl + '?' + param;
}
}else if (actionItem == 'saveShow') {
requestedUrl = this.saveMyShowURL;
if (param !='') {
requestedUrl = requestedUrl + '?' + param;
}
}else if (actionItem == 'removeShow') {
requestedUrl = this.removeMyShowURL;
if (param !='') {
requestedUrl = requestedUrl + '?' + param;
}
}
if (actionItem == 'viewUrls' || actionItem == 'saveUrl' || actionItem == 'saveShow' || actionItem == 'removeShow') {
new Ajax.Request(requestedUrl,{
method: 'get',
onSuccess: function(transport) {
var jsonCache;
jsonCache = transport.responseText.evalJSON();
callback(jsonCache);
},
onFailure: function() {
callback();
}
});
}else {
new Ajax.Request(requestedUrl,{
method: 'get',
onSuccess: function(transport) {
callback();
},
onFailure: function() {
}
});
}
}
}
