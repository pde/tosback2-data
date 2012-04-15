
function RenderOverlay(Title, Message) {

    var Html = "<div class='ResetoverlayWindowShade verification' id='overlayVerification'> <table cellspacing='0' cellpadding='0' class='overLayPanel'><tr><td class='leftTop'></td> <td colspan='2' class='middleTop'></td> <td class='rightTop'></td></tr><tr><td class='leftBorder'></td><td class='overlayContent' colspan='2'><table cellspacing='0' cellpadding='0' width='100%' border='0'><tr><td class='headerSection'><h1 id='_verificationTitle'>" + Title + "</h1></td><td valign='top' class='headerSection'><img onclick='javascript:HideOverlay();' src='/includes/images/newbuyflow/OverLays/closeButton.gif'alt='Close' title='Close' class='buttonStyle' id='_verificationCloseImg' style='display: block;' /></td></tr><tr><td colspan='2'><div class='hozRule'></div></td></tr><tr><td colspan='2'><div style='width:500px;' class='contentSection VerificationContent' id='_verificationDescription'>" + Message + "</div></td></tr><tr><td colspan='2' style='width:530px;float:left;'><div id='OverlayButton'><a href='javascript:void(0);' class='leftStyle' onclick='javascript:RedirectToLocalization();'id='_leftAnchor'><img id='_leftConfirmBtnImg' src='/includes/images/newbuyflow/OverLays/yes.gif' alt='Yes' title='Yes' /></a><a href='javascript:void(0);' class='rightStyle' id='_rightAnchor'><img onclick='javascript:HideOverlay();' id='_rightConfirmBtnImg' src='/includes/images/newbuyflow/OverLays/No.gif' alt='No' title='No' /></a></div></td></tr></table></td><td class='rightBorder'></td></tr><tr><td class='leftBottom'></td><td colspan='2' class='middleBottom'></td><td class='rightBottom'></td></tr></table></div>";

	if(!document.getElementById('ResetOverlay')){
		var body = document.body;
		var div = document.createElement('div');
		div.id = 'ResetOverlay';
	
		if (document.all) {
			body.appendChild(div);
			div.innerHTML = '&nbsp;' + Html;
			overlayAdded = true;
		} else {
			div.innerHTML = '&nbsp;' + Html;
			body.appendChild(div);
			overlayAdded = true;
		}
	}

    RepositionResetOverlay();
    addJsEvent(window, "resize", RepositionResetOverlay);
    addJsEvent(window, "scroll", RepositionResetOverlay);
}
function addJsEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() { obj['e' + type + fn](window.event); }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
}
function removeJsEvent(obj, type, fn) {
    try {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else
            obj.removeEventListener(type, fn, false);
    } catch (err) { }
}
function getResetOvrlayDimensions(el) {
    var dim = { width: 0, height: 0 };
    dim.width = el.offsetWidth;
    dim.height = el.offsetHeight;
    return dim;
}
function getScrollPosition() {
    var pos = { x: 0, y: 0 };
    pos.x = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft;
    pos.y = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
    return pos;
}
function HideOverlay() {
    var ResetOverlay = document.getElementById('ResetOverlay');
    if (ResetOverlay == null)
        return;
    document.body.removeChild(ResetOverlay);
    var Mask = document.getElementById('__Mask');
    if (Mask == null)
        return;
    document.body.removeChild(Mask);
    addJsEvent(window, "resize", RepositionResetOverlay);
    addJsEvent(window, "scroll", RepositionResetOverlay);
}
function getViewport() {
    var v = { width: 0, height: 0 };
    if (window.innerHeight) {
        v.height = window.innerHeight;
        v.width = window.innerWidth;
    } else if (document.documentElement.clientHeight) {
        v.height = document.documentElement.clientHeight;
        v.width = document.documentElement.clientWidth;
    } else {
        v.height = document.body.clientHeight;
        v.width = document.body.clientWidth;
    }
    return v;
}
function RepositionResetOverlay() {
    var OverlayType = document.getElementById('overlayVerification');
    if (!OverlayType) return;
    var vp = getViewport(),
			dm = getResetOvrlayDimensions(OverlayType),
			sp = getScrollPosition();
    OverlayType.style.top = (sp.y + ((vp.height - dm.height) / 2)) + 'px';
    OverlayType.style.left = (sp.x + ((vp.width - dm.width) / 2)) + 'px';
}
function RenderGenericOverlay(Title, Message, LeftFunctionName, RightFunctionName) {
    var Html = "<div class='ResetoverlayWindowShade verification' id='overlayVerification'> <table cellspacing='0' cellpadding='0' class='overLayPanel'><tr><td class='leftTop'></td> <td colspan='2' class='middleTop'></td> <td class='rightTop'></td></tr><tr><td class='leftBorder'></td><td class='overlayContent' colspan='2'><table cellspacing='0' cellpadding='0' width='100%' border='0'><tr><td class='headerSection'><h1 id='_verificationTitle'>" + Title + "</h1></td><td valign='top' class='headerSection'><img onclick='javascript:HideOverlay();' src='/includes/images/newbuyflow/OverLays/closeButton.gif'alt='Close' title='Close' class='buttonStyle' id='_verificationCloseImg' style='display: block;' /></td></tr><tr><td colspan='2'><div class='hozRule'></div></td></tr><tr><td colspan='2'><div style='width:500px;' class='contentSection VerificationContent' id='_verificationDescription'>" + Message + "</div></td></tr><tr><td colspan='2'><div id='OverlayButton'><span id='LeftButtonContainer'><a href='javascript:void(0);' onclick='' class='leftStyle' id='_leftAnchor'><img id='_leftConfirmBtnImg' src='/includes/images/newbuyflow/OverLays/yes.gif' alt='Yes' title='Yes' /></a></span><span id='RightButtonContainer'><a href='javascript:void(0);' onclick='' class='rightStyle' id='_rightAnchor'><img id='_rightConfirmBtnImg' src='/includes/images/newbuyflow/OverLays/No.gif' alt='No' title='No' /></a></span></div></td></tr></table></td><td class='rightBorder'></td></tr><tr><td class='leftBottom'></td><td colspan='2' class='middleBottom'></td><td class='rightBottom'></td></tr></table></div>";
    if (!document.getElementById('ResetOverlay')) {
        var body = document.body;
        var div = document.createElement('div');
        div.id = 'ResetOverlay';

        if (document.all) {
            body.appendChild(div);
            div.innerHTML = '&nbsp;' + Html;
        } else {
            div.innerHTML = '&nbsp;' + Html;
            body.appendChild(div);
        }
        document.getElementById('LeftButtonContainer').onclick = function() { eval(LeftFunctionName); return false; };
        document.getElementById('RightButtonContainer').onclick = function() { eval(RightFunctionName); return false; };
    }
    RepositionResetOverlay();

    addJsEvent(window, "resize", RepositionResetOverlay);
    addJsEvent(window, "scroll", RepositionResetOverlay);
}