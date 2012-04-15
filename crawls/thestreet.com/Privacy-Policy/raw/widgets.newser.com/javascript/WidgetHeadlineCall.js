if (typeof widgetType == 'undefined' || !widgetType) var widgetType = 'square';
if (typeof partnerId == 'undefined' || !partnerId) var partnerId = 'all';
if (typeof sectionId == 'undefined' || !sectionId) var sectionId = 1;
if (typeof channelId == 'undefined' || !channelId) var channelId = 0;
if (typeof tagGroupId == 'undefined' || !tagGroupId) var tagGroupId = 0;
if (typeof autoPlay == 'undefined' || !autoPlay) var autoPlay = true;
if (typeof widgetColor == 'undefined' || !widgetColor) var widgetColor='000000';
if (typeof widgetBGColor == 'undefined' || !widgetBGColor) var widgetBGColor='FFFFFF';
if (typeof widgetHeaderColor == 'undefined' || !widgetHeaderColor) var widgetHeaderColor='FFFFFF';
if (typeof widgetHeaderBGColor == 'undefined' || !widgetHeaderBGColor) var widgetHeaderBGColor='666666';
if (typeof numHeadlines == 'undefined' || !numHeadlines) var numHeadlines=9;
if (typeof slideShowDelay == 'undefined' || !slideShowDelay) var slideShowDelay=3;
if (typeof font == 'undefined' || !font) var font='arial';
if (typeof headerFont == 'undefined' || !headerFont) var headerFont='arial';
if (typeof headerText == 'undefined' || !headerText) var headerText = '';
if (typeof searchbox == 'undefined' || !searchbox) var searchbox = 'true';
if (typeof linkColor == 'undefined' || !linkColor) var linkColor = '999999';
if (typeof selectedColor == 'undefined' || !selectedColor) var selectedColor = '999999';
if (typeof selectedBGColor == 'undefined' || !selectedBGColor) var selectedBGColor = 'FFFFFF';
if (typeof reload == 'undefined' || !reload) var reload = 0;
if (typeof popular == 'undefined' || !popular) var popular = 'n';
if (typeof newwindow == 'undefined' || !newwindow) var newwindow = false;
if (typeof utm_source == 'undefined' || !utm_source) var utm_source = '';
if (typeof utm_medium == 'undefined' || !utm_medium) var utm_medium = '';
if (typeof utm_campaign == 'undefined' || !utm_campaign) var utm_campaign = '';
if (typeof label == 'undefined' || !label) var label = '';
if (typeof numGridRows == 'undefined' || !numGridRows) var numGridRows = 2;
if (typeof numGridCols == 'undefined' || !numGridCols) var numGridCols = 2;
if (typeof squareWidth == 'undefined' || !squareWidth) var squareWidth = 240;
if (typeof showLinks == 'undefined' || !showLinks) var showLinks = 'n';
if (widgetType == 'square') {
    if (typeof width == 'undefined' || !width) width = 300;
    if (typeof height == 'undefined' || !height) height = 250;
}
else if (widgetType == 'headline') {
    if (typeof width == 'undefined' || !width) width = 780;
    if (typeof height == 'undefined' || !height) height = 250;
}
else if (widgetType == 'carousel') {
    if (typeof width == 'undefined' || !width) width = 1006;
    if (typeof height == 'undefined' || !height) height = 167;
}
else if (widgetType == 'grid') {
    if (squareWidth < 100 || squareWidth > 480) squareWidth = 240;
    if (numGridRows < 1 || numGridRows > 10) numGridRows = 2;
    if (numGridCols < 1 || numGridCols > 10) numGridCols = 2;
    var squareHeight = (squareWidth * 2) / 3;
    var numHeadlines = numGridCols * numGridRows;
    var storySquarePadding = 4;
    var storySquareBorder = 1;
    var width = (numGridCols * (squareWidth + storySquarePadding + (storySquareBorder * 2))) + storySquarePadding;
    var height = (numGridRows * (squareHeight + storySquarePadding + (storySquareBorder * 2))) + storySquarePadding;
}
if (widgetType == 'square' || widgetType == 'headline') {
    var hostName = 'widgets.newser.com';
    var tempString = window.location.toString();
    if (tempString.indexOf("widgets.newser.com") < 0 && tempString.indexOf("www.newser.com") < 0 && tempString.indexOf('newser.com') >= 0) {
        hostName = tempString.substring(7);
        hostName = hostName.substring(0, hostName.indexOf('/'));
        hostName = hostName.replace("www.", "");
        hostName = hostName.replace("rss.", "");
        hostName = hostName.replace(".newser.com", ".widgets.newser.com");
    }
    document.write('<iframe src="http://' + hostName + '/widgets/widgetheadline.aspx?partnerid=' + partnerId + '&sectionid=' + sectionId + '&popular=' + popular + '&newwindow=' + newwindow + '&autoplay=' + autoPlay + '&widgetColor=' + widgetColor + '&widgetbgcolor=' + widgetBGColor + 'widgetheadercolor=' + widgetHeaderColor + '&widgetheaderbgcolor=' + widgetHeaderBGColor + '&font=' + font + '&headerFont=' + headerFont + '&headerText=' + headerText + '&numheadlines=' + numHeadlines + '&slideshowdelay=' + slideShowDelay + '&searchbox=' + searchbox + '&widgettype=' + widgetType + '&widgetlinkcolor=' + linkColor + '&widgethighlightcolor=' + selectedColor + '&widgethighlightbgcolor=' + selectedBGColor + '&reload=' + reload + '&utm_source=' + utm_source + '&utm_medium=' + utm_medium + '&utm_campaign=' + utm_campaign + '" ' + 'width="' + width + '" scrolling="no" height="' + height + '" marginwidth="0" marginheight="0" frameborder="0" style="border:1px solid #eee;"></iframe>');
}
else if (widgetType == 'carousel' || widgetType == 'grid') {
    var hostName = 'www.newser.com';
    var tempString = window.location.toString();
    if (tempString.indexOf("www.newser.com") < 0 && tempString.indexOf('newser.com') >= 0) {
        hostName = tempString.substring(7);
        hostName = hostName.substring(0, hostName.indexOf('/'));
    }
    document.write('<iframe src="http://' + hostName + '/widgetsite/' + widgetType + '.aspx?sectionid=' + sectionId + '&channelid=' + channelId + '&taggroupid=' + tagGroupId + '&popular=' + popular + '&newwindow=' + newwindow + '&label=' + label + '&squarewidth=' + squareWidth + '&numheadlines=' + numHeadlines + '&utm_source=' + utm_source + '&utm_medium=' + utm_medium + '&utm_campaign=' + utm_campaign + '&showlinks=' + showLinks + '" ' + 'width="' + width + '" scrolling="no" height="' + height + '" marginwidth="0" marginheight="0" frameborder="0" style="border:1px solid #eee;"></iframe>');
}
