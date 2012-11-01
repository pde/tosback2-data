
    var date = new Date();
    date.setTime(date.getTime()+(365*24*60*60*1000));
    var expires = date.toGMTString();
    document.cookie="WolframAlphaCookieWarning=nom; expires="+expires+"; path=/";
