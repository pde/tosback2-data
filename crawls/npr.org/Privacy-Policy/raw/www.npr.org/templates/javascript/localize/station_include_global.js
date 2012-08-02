window.station = "";
var cookieValue = document.cookie;
var stationFind = cookieValue.indexOf("station=");
if(stationFind > -1){
    semiFind = cookieValue.indexOf(";", stationFind);
    if (semiFind == -1){
       semiFind = cookieValue.length;
    }
    window.station = cookieValue.substring(stationFind + 8, semiFind);
}

if(window.station==""){
    $('#stationLocalizationWrap').removeClass('localized');
}
else{
    $('head').append('<script src="/stations/js/global/' + (window.station).toLowerCase() + '.js" type="text/javascript"></script>');
    $('#stationLocalizationWrap').addClass('localized');
}
