
// cached javascript
var CommonHeader = {
RegionLookup:function(zip,callback,context){return new ajax_request(this.url + '?_method=RegionLookup&_session=no','zip=' + enc(zip),callback, context);},
RegionBrandLookup:function(zip,url,callback,context){return new ajax_request(this.url + '?_method=RegionBrandLookup&_session=no','zip=' + enc(zip)+ '\r\nurl=' + enc(url),callback, context);},
url:'/ajax/Citizens.CmsSite.Web.Cms.Templates.v2.Common.CommonHeader,Citizens.CmsSite.Web.ashx'
}
function HtmlControl(id) {
	var ele = null;
	if(typeof(id) == 'object') ele = id; else ele = document.getElementById(id);
	if(ele == null) return null;
	var _o = ele.cloneNode(true);
	var _op = document.createElement('SPAN');
	_op.appendChild(_o);	
	this._source = _op.innerHTML;
}
HtmlControl.prototype.toString = function(){ return this._source; }

function HtmlControlUpdate(func, parentId) {
var f,i,ff,fa='';
var ele = document.getElementById(parentId);
if(ele == null) return;
var args = [];
for(i=0; i<HtmlControlUpdate.arguments.length; i++)
	args[args.length] = HtmlControlUpdate.arguments[i];
if(args.length > 2)
	for(i=2; i<args.length; i++){fa += 'args[' + i + ']';if(i < args.length -1){ fa += ','; }}
f = '{"invoke":function(args){return ' + func + '(' + fa + ');}}';
ff = null;eval('ff=' + f + ';');
if(ff != null && typeof(ff.invoke) == 'function')
{
	var res = ff.invoke(args);
	if(res.error != null){alert(res.error);return;}
	ele.innerHTML = res.value;
}
}
function AjaxImage(url){var img=new Image();img.src=url;return img;}
function _getTable(n,e){for(var i=0; i<e.Tables.length; i++){if(e.Tables[i].Name == n)return e.Tables[i];}return null;}
function digi(v, c){v = v + "";var n = "0000";if(v.length < c) return n.substr(0, c-v.length) + v;return v;}
function DateTime(year,month,day,hours,minutes,seconds){if(year>9999||year<1970||month<1||month>12||day<0||day>31||hours<0||hours>23||minutes<0||minutes>59||seconds<0||seconds>59)throw("ArgumentException");this.Year = year;this.Month = month;this.Day = day;this.Hours = hours;this.Minutes = minutes;this.Seconds = seconds;}
DateTime.prototype.toString = function(){return digi(this.Year,4) + digi(this.Month,2) + digi(this.Day,2) + digi(this.Hours,2) + digi(this.Minutes,2) + digi(this.Seconds,2);}
function TimeSpan(){this.Days=0;this.Hours=0;this.Minutes=0;this.Seconds=0;this.Milliseconds=0;}
TimeSpan.prototype.toString = function(){return this.Days+'.'+this.Hours+':'+this.Minutes+':'+this.Seconds+'.'+this.Milliseconds;}
