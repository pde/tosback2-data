// frame breaker code only to be included for urls or domains that are not in the exception list
if (self != top && top.location.href.indexOf(document.domain) < 0) top.location.href = window.location.href;
