if(_pageBeginTime != undefined){
    jQuery(window).load(function() {
        var pageEndTime = new Date();
        var difference = pageEndTime.getTime() - _pageBeginTime.getTime();
        // allow overriding of task
        var task = 'client side page load';
        if (ScriptVariables.Contains('ClientSideTimerTask')) 
            task = ScriptVariables.Get('ClientSideTimerTask');        

        // checking for reasonable problems with the timing number
        if (difference >= 0 && difference <= 120000)
            jQuery.cb.Timing(_pageName, 'window.onload', task, difference);        
    });
    jQuery(document).ready(function () {
        var pageEndTime = new Date();
        var difference = pageEndTime.getTime() - _pageBeginTime.getTime();
        // allow overriding of task
        var task = 'client side page load';
        if (ScriptVariables.Contains('ClientSideTimerTask'))
            task = ScriptVariables.Get('ClientSideTimerTask');

        // checking for reasonable problems with the timing number
        if (difference >= 0 && difference <= 120000)
            jQuery.cb.Timing(_pageName, 'document.ready', task, difference);
    });    
}