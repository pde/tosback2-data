/* OnlineOpinion (S3tS,1.12k) */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
var custom_var;
var _sp='%3A\\/\\/';
var _rp='%3A//';
var _poE=0.0; 
var _poX=0.0;
var _sH=screen.height;
var _d=document;
var _w=window;
var _ht=_ht?_ht:escape(_w.location.href);
var _hr=_hr?_hr:_d.referrer;
var _tm=(new Date()).getTime();
var _kp=0;
var _sW=screen.width;
var baseurl;

/**
 * Escape a url
 * @param {String} _u The url to escape
 */
function _fC(_u){
	_aT = _sp +',\\/,\\.,-,_,'+ _rp +',%2F,%2E,%2D,%5F';
	_aA = _aT.split(',');
	
	for(i = 0; i < 5; i++){
		eval('_u=_u.replace(/'+ _aA[i] +'/g,_aA[i+5])')
	}

	return _u
}

/**
 * Open the OpinionLab comment card window.
 */
 function O_LC(){
	var opinionlabURL = 'https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+ _tm +'&time2='+ (new Date()).getTime() +'&prev='+ _fC(escape(_hr)) +'&referer='+ _fC(_ht) +'&height='+ _sH +'&width='+ _sW +'&custom_var='+ custom_var;
	if((typeof url_var == 'undefined')){ }else{opinionlabURL += '&url_var=' + _fC(escape(url_var));}
	if(typeof getOpinionLabURL == 'undefined' || getOpinionLabURL == 0){
		_w.open(opinionlabURL, 'comments', 'width=535,height=192,screenX=' +((_sW-535)/2)+ ',screenY='+ ((_sH-192)/2) +',top='+ ((_sH-192)/2) +',left='+ ((_sW-535)/2) +',resizable=yes,copyhistory=yes,scrollbars=no');
	}
	else{
		return opinionlabURL;
	}	
}

function PP_O_LC(){
	var opinionlabURL = baseurl+'&olparams=time1$'+_tm+'|time2$'+ (new Date()).getTime()+'|prev$'+ _fC(escape(_hr))+'|referer$'+ _fC(_ht)+'|height$'+ _sH +'|width$'+ _sW +'&custom_var='+ custom_var;
	if(typeof getOpinionLabURL == 'undefined' || getOpinionLabURL == 0){
		_w.open(opinionlabURL, 'comments', 'width=535,height=192,screenX=' +((_sW-535)/2)+ ',screenY='+ ((_sH-192)/2) +',top='+ ((_sH-192)/2) +',left='+ ((_sW-535)/2) +',resizable=yes,copyhistory=yes,scrollbars=no');
	}
	else{
		return opinionlabURL;
	}	
}


/** 
 * If a random number (0 - 1) is greater than equal
 * to 1.0 minus _poE, run O_LC() and set _poX to 0.0.
 */
function _fPe(){
	if(Math.random() >= 1.0 - _poE){
		O_LC();
		_poX=0.0
	}
}

/**
 * Called on window unload.
 * If a random number (0 - 1) is greater than equal
 * to 1.0 minus _poX, run O_LC().
 */
function _fPx(){
	if(Math.random() >= 1.0 - _poX){
		O_LC();
	}
}
window.onunload = _fPx;

/**
 * Initializes OptionLab icon and starts scripts.
 * @param {String} _p Image tag markup
 */
function O_GoT(_p){
	_d.write('<a href=\'javascript:O_LC()\'>'+ _p +'</a> <img src=\'https://www.paypalobjects.com/en_US/i/scr/sm_333_oo.gif\' alt=\'' + _p + '\' />');
	_fPe()
}
function PP_O_GoT(_p){
	_d.write('<a href=\'javascript:PP_O_LC()\'>'+ _p +'</a> <img src=\'https://www.paypalobjects.com/en_US/i/scr/sm_333_oo.gif\' alt="' + _p + '" />');
	_fPe()
}
function Mini_O_GoT(_p, base){
	if(base){
		_d.write('<span id=\'opLab\'><a href=\'javascript:PP_O_LC()\'><span>'+ _p +'</span> <img src=\'https://www.paypalobjects.com/en_US/i/scr/sm_333_oo.gif\' alt="' + _p + '" /></a></span>');	
	}
	else{
		_d.write('<span id=\'opLab\'><a href=\'javascript:O_LC()\'><span>'+ _p +'</span> <img src=\'https://www.paypalobjects.com/en_US/i/scr/sm_333_oo.gif\' alt="' + _p + '" /></a></span>');	
	}
	_fPe()
}
