function ReplaceImage(ImageName, ImageSrc)
{
if (document.images) {
if (typeof(ImageName) == 'string') {
document.images[ImageName].src = ImageSrc;
} else if ((typeof(ImageName) == 'object') && ImageSrc && ImageName.src) {
ImageName.src = ImageSrc;
}
}
}
var HelpDocWindow = null;
function OpenHelpPage(url)
{
if (url) {
if (HelpDocWindow) {
if (HelpDocWindow.closed) {
HelpDocWindow = window.open(url,'HelpDoc','width=550,height=400,left=100,top=100,scrollbars=yes',true);
} else {
HelpDocWindow.location = url;
}
} else {
HelpDocWindow = window.open(url,'HelpDoc','width=550,height=400,left=100,top=100,scrollbars=yes',true);
}
if (HelpDocWindow) {
HelpDocWindow.focus();
}
}
}
var GlossaryWindow = null;
function OpenGlossaryItem(url)
{
if (url) {
if (GlossaryWindow) {
if (GlossaryWindow.closed) {
GlossaryWindow = window.open(url,'Glossary','width=550,height=400,left=400,top=300,scrollbars=yes',true);
} else {
GlossaryWindow.location = url;
}
} else {
GlossaryWindow = window.open(url,'Glossary','width=550,height=400,left=100,top=100,scrollbars=yes',true);
}
if (GlossaryWindow) {
GlossaryWindow.focus();
}
}
}
function updateParent(newURL) {
if (opener.document) {
opener.document.location=newURL;
opener.focus();
}
}
function preload(image_url) {
if (document.images)
{
var preloader = new Image(10,10); 
preloader.src=image_url; 
}
}