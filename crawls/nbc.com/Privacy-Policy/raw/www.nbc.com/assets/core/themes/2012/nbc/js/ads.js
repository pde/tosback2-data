/* OPA */
var adWidth = NBC('.ad728x90 object').width() || NBC('.ad728x90 swf').width() || NBC('.ad728x90 img').width() || NBC('.ad728x90 div').width() || NBC('.ad728x90 table').width() || NBC('.ad728x90 iframe').width();
if (adWidth > 728) {
    NBC('.ad728x90').parent().height("auto");
    NBC('.spotlight-inner').hide();
}
