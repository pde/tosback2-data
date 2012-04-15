// Decide browser version
var ns6 = (document.getElementById) ? true : false;
var ie4 = (document.all) ? true : false;
var ie5 = false;
var mX = 4;
var mY = 4;

// IE Stupidity Check. 
if (ie4) {
    if ((navigator.userAgent.indexOf('MSIE 5') > 0) || (navigator.userAgent.indexOf('MSIE 6') > 0) || (navigator.userAgent.indexOf('MSIE 7') > 0) || (navigator.userAgent.indexOf('MSIE 8') > 0 || (navigator.userAgent.indexOf('MSIE 9') > 0))) {
        ie5 = true;
    }
    if (ns6) {
        ns6 = false;
    }
}


//Handle mouse location
document.onmousemove = mouseMove;
function mouseMove(e) {
    if (ns6) {
        mX = e.pageX;
        mY = e.pageY;
    }
    else if (ie5) {
        mX = window.event.clientX;

        if (document.body.clientWidth > document.documentElement.clientWidth)
            mY = (document.body.scrollTop + window.event.clientY);
        else
            mY = (document.documentElement.scrollTop + window.event.clientY);
    }
    else if (ie4) {
        mX = event.x;
        mY = event.y;
    }
}