/* OPA */
var adWidth = NBC('.ad728x90 object, .ad970x66 object').width() || NBC('.ad728x90 swf, .ad970x66 swf').width() || NBC('.ad728x90 img, .ad970x66 img').width() || NBC('.ad728x90 div, .ad970x66 div').width() || NBC('.ad728x90 table, .ad970x66 table').width() || NBC('.ad728x90 iframe, .ad970x66 iframe').width();
if (adWidth > 728) {
    NBC('.ad728x90, .ad970x66').parent().height("auto");
    NBC('.spotlight-inner').hide();
}
