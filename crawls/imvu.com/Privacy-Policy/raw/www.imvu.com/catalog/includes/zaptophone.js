//this file gets used by both web pages and flash (actionscript)... so dont put any HTML specifics in here!

function imvu_zap(url, name, refid, single) {
	var name = typeof name != 'undefined'? name : "";
	var refid = typeof refid != 'undefined' ? refid : "";
	var single = typeof single != 'undefined'? single : "";

	var escUrl = escape(url);
	var escName = escape(name);
	var escRefId = escape(refid);
	var escSingle = escape(single);
	var url = "http://cart.zaptophone.com/zc/app?service=external/mlink&sp=S" + escUrl + "&sp=S" + escName + "&sp=S" + escRefId + "&sp=S" + escSingle;	
        return url;
}
