$(document).ready(function() {
    //$('#microSupport .head').bind('click')toggle(microSupport.show, microSupport.hide)
    $('#microSupport .close').bind('click',microSupport.hide);
    $('#microSupport form').bind('submit',microSupport.send);
    $('#microBug').bind('click',microSupport.show);
});

var microSupport = {'ajax':'/ajax/support.php'};

microSupport.show = function (e) {
    e.preventDefault();
    $('#microSupport').slideDown('fast');
    
}

microSupport.hide = function (e) {
    e.preventDefault();
    $('#microSupport').hide();
}
microSupport.send = function (e) {
    e.preventDefault();
    if (!$('#microMess').val().length) {
        $('#microSupport .error').html("Message please :-)");
        return false;
    }
    var data = $('#microSupport form').serializeArray();
    if (typeof(swfobject)!="undefined") {
        var swf = swfobject.getFlashPlayerVersion();
        if (swf) data.push({'name':'flash','value':swf.major+'.'+swf.minor+'.r'+swf.release});
    }
    var os = '';
    if (window.navigator.platform) os = 'platform: '+window.navigator.platform;
    if (window.navigator.cpuClass) os = os+' cpu: '+window.navigator.cpuClass;
    data.push({'name':'os','value':os});
    $.ajax({
        'url':microSupport.ajax,
        'data':data,
        'method':'post',
        'cache':false
    });
    $('#microSupport').animate({'margin-right':'-300px'},'fast','swing',function(){$('#microSupport').hide().css({'margin-right':0})});
    $('#microMess').val('');
    return false;
}