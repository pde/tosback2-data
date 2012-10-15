/* OnlineOpinion (S3tS v3.1.1) Supports passing domains in argument */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

var custom_var,
_sp = '%3A\\/\\/',
_rp = '%3A//',
_poE = 0.0,
_poX = 0.0,
_sH = screen.height,
_d = document,
_w = window,
_ht = escape(_w.location.href),
_hr = _d.referrer,
_tm = (new Date()).getTime(),
_kp = 0,
_sW = screen.width;
function _fC(_u) {
    _aT = _sp + ',\\/,\\.,-,_,' + _rp + ',%2F,%2E,%2D,%5F';
    _aA = _aT.split(',');
    for (i = 0; i < 5; i++) {
        eval('_u=_u.replace(/' + _aA[i] + '/g,_aA[i+5])')
    }
    return _u
};
function O_LC(new_domain) {
    _domain = _ht.replace('https%3A//', '').replace('http%3A//', '');
    if (typeof new_domain == 'undefined' || new_domain == '') {
        _sp = '%3A\\/\\/';
        _rp = '%3A//'
    } else {
        _sp = '%3A\\/\\/' + _domain.substr(0, _domain.indexOf('/'));
        _rp = '%3A//' + new_domain
    }
    _w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1=' + _tm + '&time2=' + (new Date()).getTime() + '&prev=' + _fC(escape(_hr)) + '&referer=' + _fC(_ht) + '&height=' + _sH + '&width=' + _sW + '&custom_var=' + custom_var, 'comments', 'width=535,height=192,screenX=' + ((_sW - 535) / 2) + ',screenY=' + ((_sH - 192) / 2) + ',top=' + ((_sH - 192) / 2) + ',left=' + ((_sW - 535) / 2) + ',resizable=yes,copyhistory=yes,scrollbars=no')
};
function _fPe() {
    if (Math.random() >= 1.0 - _poE) {
        O_LC();
        _poX = 0.0
    }
};
function _fPx() {
    if (Math.random() >= 1.0 - _poX) O_LC()
};
window.onunload = _fPx;
function O_GoT(_p) {
    _d.write('<a href=\'javascript:O_LC()\'>' + _p + '</a>');
    _fPe()
}