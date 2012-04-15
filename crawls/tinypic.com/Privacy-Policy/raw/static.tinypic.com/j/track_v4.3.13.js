function APITrack(type) {
    var tpid = '2cacc812f6662e5f';
    var apiPath = '/api.php';
    var responseFormat = 'json';
    var method = 'track';
    var sig = '243e64a77c25c88fd4f56e8cf9d6907a';
    var params =
        'sig=' + sig +
        '&responsetype=' + responseFormat +
        '&action=' + method +
        '&tpid=' + tpid +
        '&type=' + type;
    $.getJSON( apiPath + "?" + params );
}
