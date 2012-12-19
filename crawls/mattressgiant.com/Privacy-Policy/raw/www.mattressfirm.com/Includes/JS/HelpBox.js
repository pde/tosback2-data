function ShowHelpBox() {

    var width = screen.width;
    if (width < 1000) {
        width = 1000;
    }
    var height = screen.height;
    if (height < 1500) {
        height = 1500;
    }

    var hbOverlay = document.getElementById('hbOverlay');
    hbOverlay.style.height = height + "px";
    hbOverlay.style.width = width + "px";
    hbOverlay.style.display = 'block';

    var HelpBoxRoot = document.getElementById("hbRoot");
    HelpBoxRoot.style.display = "block";
    var center = window.center({ width: HelpBoxRoot.style.width, height: HelpBoxRoot.style.height });
    HelpBoxRoot.style.top = center.y - 210;
    HelpBoxRoot.style.left = center.x - 150;
    //alert("h: " + HelpBoxRoot.style.height + " w: " + HelpBoxRoot.style.width);
    //alert("top: " + HelpBoxRoot.style.top + " left: " + HelpBoxRoot.style.left);
    //HelpBoxRoot.style.top = (height / 2)-600;
    //HelpBoxRoot.style.left = (width / 2)-150;
    //point = window.center({ width: 300, height: 400 })
    //HelpBoxRoot.style.top = point.y;
    //HelpBoxRoot.style.left = point.x;
}

window.size = function() {
    var w = 0;
    var h = 0;
    //IE
    if (!window.innerWidth) {
        //strict mode
        if (!(document.documentElement.clientWidth == 0)) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        }
        //quirks mode
        else {
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    }
    //w3c
    else {
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return { width: w, height: h };
}
window.center = function() {
    var hWnd = (arguments[0] != null) ? arguments[0] : { width: 0, height: 0 };
    var _x = 0;
    var _y = 0;
    var offsetX = 0;
    var offsetY = 0;
    //IE
    if (!window.pageYOffset) {
        //strict mode
        if (!(document.documentElement.scrollTop == 0)) {
            offsetY = document.documentElement.scrollTop;
            offsetX = document.documentElement.scrollLeft;
        }
        //quirks mode
        else {
            offsetY = document.body.scrollTop;
            offsetX = document.body.scrollLeft;
        }
    }
    //w3c
    else {
        offsetX = window.pageXOffset;
        offsetY = window.pageYOffset;
    }
    _x = ((this.size().width - hWnd.width) / 2) + offsetX;
    _y = ((this.size().height - hWnd.height) / 2) + offsetY;
    return { x: _x, y: _y };
}

function ShowRedHelpButton() {
    var floatdiv = document.getElementById('floatdiv');
    floatdiv.style.visibility = 'visible';
}

function HideRedHelpButton() {
    var floatdiv = document.getElementById('floatdiv');
    floatdiv.style.visibility = 'hidden';
}

function ShowOrHideHelp() {
    //alert(document.location.href);
    last = document.location.href.lastIndexOf('/');
    //alert(document.location.href.substring(last + 1).toLowerCase());
    var cur_page = document.location.href.substring(last + 1).toLowerCase();

    switch (cur_page) {
        case "mattressmatching.aspx":
        case "mattressmatching.aspx":
            HideRedHelpButton();
            break;
        default:
            ShowRedHelpButton();
            break;
    }
}