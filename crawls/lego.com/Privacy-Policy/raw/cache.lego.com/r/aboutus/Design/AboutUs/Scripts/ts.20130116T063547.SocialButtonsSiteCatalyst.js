function RegisterClick(event, url) {
    if (typeof LEGOSiteStats !== "undefined" && typeof LEGOSiteStats.Legacy !== "undefined") {
        LEGOSiteStats.Legacy.General.OnContentSharing(event, url);
    }
}

$(function () {
    $(".emailPopup").ghcolorbox({
        iframe: true
        , width: 380
        , height: 330
    });
});
