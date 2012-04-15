var _btbu = "163";
var _btpath="://ads.bridgetrack.com/site/";
var _btl=document.location+"";
var _btr=document.referrer+"";
var bt_test = false;
if(bt_test)
{
	_btpath="://ads-uat.bridgetrack.com/site/";
}
if( (new String( document.location).substr(0,6))=="https:" )
{
	_btpath="https"+_btpath;
}
else
{
	_btpath="http"+_btpath;
}

try
{
	var _btsrc = _btpath + "rtgt.asp?BU=" + _btbu + "&ref=" + escape(_btr) + "&p=" + escape(_btl) + "&r=" + Math.random();
	if(typeof(bt_extra) == "object")
	{
		for(_btkey in bt_extra)
		{
			_btsrc += "&" + _btkey + "=" + bt_extra[_btkey];
		}
	}
	var _btiftag = '<iframe frameborder="0" width="1" height="1" src="'+_btsrc+'"></iframe>';
	document.write(_btiftag);
}
catch(e)
{
}