  jQuery(document).ready(function() {
    if (document.location.href.indexOf('clickid=') > -1 ) {
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }
        var cookiename = "affiliateclickid";
        var cookievalue = getUrlVars()["clickid"].replace(/#.*$/,'');
        var date = new Date();
        date.setTime(date.getTime()+(7*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        document.cookie = cookiename+"="+cookievalue+expires+"; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    var affiliateclickid=readCookie('affiliateclickid');
    if (document.location.href.indexOf('COSummary-Submit') > -1 && affiliateclickid != null) {
var merchamount = $(".order-subtotal > .cell-detail").html();
var merchamount = merchamount.replace(/\$/g, '');
$('<img src="https://gan.doubleclick.net/gan_conversion?advid=K619034&oid=' + omnPurchaseID + '&amt=' + merchamount + '&fxsrc=USD&event_type=transaction&clickid=' + affiliateclickid + '" width=1 height=1>').insertAfter('.actions');
    }
  });