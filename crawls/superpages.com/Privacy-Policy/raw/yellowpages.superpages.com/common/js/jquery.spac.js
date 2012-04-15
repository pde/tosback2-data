/**
* Ajax Autocomplete for jQuery
* Date: 06/04/2010
* Last Review: 06/28/2010
* v. 1.1 clear invalid characters from string
* v. 1.2 Added jsonp to make it portable
* SuperPages D.R.
*/
(function($) {
var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
function fnFormatResult(value, data, currentValue) {
value= value.replace(/\&amp;/g,'&');
value= value.replace(/\&lt;/g,'<');
value = value.replace(/&quot;/g,'"');
value = value.replace(/&#034;/g,'"');
value = value.replace(/&lt;/g,"<");
value = value.replace(/&gt;/g,">");
value = value.replace(/&#039;/g,'\'');
var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
return value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
}
function Autocomplete(el, options) {
var whatid = $(el);
if (whatid.width() == 0) { return; } //exit if no text field
this.el = $(el);
this.el.attr('autocomplete', 'off');
this.defaulttext = "Find local businesses e.g. hotels, Dallas TX";
this.suggestions = [];
this.data = [];
this.badQueries = [];
this.selectedIndex = -1;
this.currentValue = this.el.val();
this.intervalId = 0;
this.cachedResponse = [];
this.onChangeInterval = null;
this.ignoreValueChange = false;
this.onClickSubmit = false;
this.serviceUrl = options.serviceUrl;
this.isLocal = false;
this.options = {
autoSubmit: false,
minChars: 1,
maxHeight: 240,
deferRequestBy: 0,
width: 0,
highlight: true,
params: {},
fnFormatResult: fnFormatResult,
delimiter: null,
zIndex: 9999
};
this.initialize();
this.setOptions(options);
}
$.fn.autocomplete = function(options) {
return new Autocomplete(this.get(0)||$('<input />'), options);
};
Autocomplete.prototype = {
killerFn: null,
initialize: function() {
var me, uid, autocompleteElId;
me = this;
uid = Math.floor(Math.random()*0x100000).toString(16);
autocompleteElId = 'Autocomplete_' + uid;
this.killerFn = function(e) {
if ($(e.target).parents('.autocomplete').size() === 0) {
me.killSuggestions();
me.disableKillerFn();
}
};
this.el.bind('click', function() {
me.clearField();
});
if (!this.options.width) { this.options.width = this.el.width(); }
this.mainContainerId = 'AutocompleteContainter_' + uid;
$('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:300px;"></div></div></div>').appendTo('body');
this.container = $('#' + autocompleteElId);
this.fixPosition();
if (window.opera) {
this.el.keypress(function(e) { me.onKeyPress(e); });
} else {
this.el.keydown(function(e) { me.onKeyPress(e); });
}
this.el.keyup(function(e) { me.onKeyUp(e); });
this.el.blur(function() { me.enableKillerFn(); });
this.el.focus(function() { me.defaultText(); me.fixPosition(); });
},
setOptions: function(options){
var o = this.options;
$.extend(o, options);
if(o.lookup){
this.isLocal = true;
if($.isArray(o.lookup)){ o.lookup = { suggestions:o.lookup }; }
}
$('#'+this.mainContainerId).css({ zIndex:o.zIndex });
this.container.css({ maxHeight: o.maxHeight + 'px', width:o.width });
},
clearCache: function(){
this.cachedResponse = [];
this.badQueries = [];
},
disable: function(){
this.disabled = true;
},
enable: function(){
this.disabled = false;
},
clearField: function() {
if(this.el.val() === this.defaulttext || this.el.val() === 'Required field') {
this.el.addClass('normaltext-').css('color', '#000000');
this.el.val('');
}
},
defaultText: function() {
if (this.el.val() === '') {
//if(this.el.val().indexOf(this.defaulttext) != -1) {
this.el.addClass('greyout-').css('color', '#666666');
this.el.val(this.defaulttext);
// }
}
},
fixPosition: function() {
var offset = this.el.offset();
$('#' + this.mainContainerId).css({ top: (offset.top + this.el.innerHeight()) + 'px', left: offset.left + 'px' });
},
enableKillerFn: function() {
var me = this;
$(document).bind('click', me.killerFn);
},
disableKillerFn: function() {
var me = this;
$(document).unbind('click', me.killerFn);
},
killSuggestions: function() {
var me = this;
this.stopKillSuggestions();
this.intervalId = window.setInterval(function() { me.hide(); me.stopKillSuggestions(); }, 300);
},
stopKillSuggestions: function() {
window.clearInterval(this.intervalId);
},
onKeyPress: function(e) {
if (this.disabled || !this.enabled) { return; }
// return will exit the function
// and event will not be prevented
switch (e.keyCode) {
case 27: //KEY_ESC:
this.el.val(this.currentValue);
this.hide();
break;
case 9: //KEY_TAB:
case 8: //backspace:
case 13: //KEY_RETURN:
if (this.selectedIndex === -1) {
this.hide();
return;
}
this.select(this.selectedIndex);
if(e.keyCode === 9){ return; }
break;
case 38: //KEY_UP:
this.moveUp();
break;
case 40: //KEY_DOWN:
this.moveDown();
break;
default:
return;
}
e.stopImmediatePropagation();
e.preventDefault();
},
onKeyUp: function(e) {
if(this.disabled){ return; }
switch (e.keyCode) {
case 38: //KEY_UP:
case 40: //KEY_DOWN:
return;
}
clearInterval(this.onChangeInterval);
if (this.currentValue !== this.el.val()) {
if (this.options.deferRequestBy > 0) {
// Defer lookup in case when value changes very quickly:
var me = this;
this.onChangeInterval = setInterval(function() { me.onValueChange(); }, this.options.deferRequestBy);
} else {
this.onValueChange();
}
}
},
onValueChange: function() {
//this.el.blur();
clearInterval(this.onChangeInterval);
this.currentValue = this.el.val();
var q = this.getQuery(this.currentValue);
this.selectedIndex = -1;
if (this.ignoreValueChange) {
this.ignoreValueChange = false;
return;
}
//this.el.focus();
if (q === '' || q.length < this.options.minChars) {
this.hide();
this.el.addClass('greyout-').css('color', '#666666');
this.el.val(this.defaulttext);
} else {
var emptyfield = this.defaulttext.substring(0, this.defaulttext.length - 1);
if(this.el.val().indexOf(this.defaulttext) != -1) {
var cleardefaultxt = this.el.val().replace(this.defaulttext, '');
this.el.val(cleardefaultxt);
q = cleardefaultxt;
}
if(this.currentValue == emptyfield) {
var cleardeftxt1 = this.el.val().replace(emptyfield, '');
this.el.val(cleardeftxt1);
q = cleardeftxt1;
}
this.el.addClass('greyout-').css('color', '#000000');
this.getSuggestions(q);
}
},
getQuery: function(val) {
var d, arr;
d = this.options.delimiter;
if (!d) { //return $.trim(val);
return val;
}
arr = val.split(d);
//alert("(" + arr[arr.length - 1] + ")" + "(" + arr.length - 1 + ")");
return $.trim(arr[arr.length - 1]);
},
getSuggestionsLocal: function(q) {
var ret, arr, len, val, i;
arr = this.options.lookup;
len = arr.suggestions.length;
ret = { suggestions:[]};
q = q.toLowerCase();
for(i=0; i< len; i++){
val = arr.suggestions[i];
if(val.toLowerCase().indexOf(q) === 0){
ret.suggestions.push(val);
//ret.data.push(arr.data[i]);
}
}
return ret;
},
getSuggestions: function(q) {
var cr, me;
cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[q];
if (cr && $.isArray(cr.suggestions)) {
this.suggestions = cr.suggestions;
//this.data = cr.data;
this.suggest();
} else if (!this.isBadQuery(q)) {
me = this;
q = q.replace(/&/g, "%26");
q = q.replace(/\+/g, "%2b");
q = q.replace(/\'/g, "%27");
me.options.params.query = q;
// $.get(this.serviceUrl, me.options.params + "callback=?", function(txt) { me.processResponse(txt); }, 'json');
service = this.serviceUrl + "?query=" + me.options.params.query + "&cookieparam=" + me.options.params.LOC;
$.getJSON(service + "&callback=?", function(data){
me.processResponse(data);
});
}
},
isBadQuery: function(q) {
var i = this.badQueries.length;
while (i--) {
if (q.indexOf(this.badQueries[i]) === 0) { return true; }
}
return false;
},
hide: function() {
this.enabled = false;
this.selectedIndex = -1;
this.container.hide();
},
suggest: function() {
if (this.suggestions.length === 0) {
this.hide();
return;
}
var me, len, div, f, v, i, s, mOver, mClick;
me = this;
len = this.suggestions.length;
f = this.options.fnFormatResult;
v = this.getQuery(this.currentValue);
mOver = function(xi) { return function() { me.activate(xi); }; };
if (this.onClickSubmit) {
mClick = function(xi) { return function() { me.select(xi); }; };
} else {
mClick = function(xi) { return function() { me.onClicked(xi); }; };
}
this.container.hide().empty();
for (i = 0; i < len; i++) {
s = this.suggestions[i];
div = $((me.selectedIndex === i ? '<div class="selected"' : '<div') + ' title="' + s + '">' + f(s, this.data[i], v) + '</div>');
div.mouseover(mOver(i));
div.click(mClick(i));
this.container.append(div);
}
this.enabled = true;
this.container.show();
},
processResponse: function(data) {
var response = data;
var query;
if(!this.options.noCache){
this.cachedResponse[response.q] = response;
if (response.suggestions.length === 0) { this.badQueries.push(response.q); }
}
query = response.q;
query= query.replace(/\&amp;/g,'&');
query= query.replace(/\&lt;/g,'<');
query = query.replace(/\&quot;/g,'"');
query = query.replace(/\&#034;/g,'"');
query = query.replace(/\&lt;/g,"<");
query = query.replace(/\&gt;/g,">");
query = query.replace(/\&#039;/g,'\'');
query = query.replace(/%20/g,' ');
query = query.replace(/%27/g, '\'');
cleardefaultxtt = this.getQuery(this.currentValue).replace(this.defaulttext, '');
if (query === cleardefaultxtt) {
this.suggestions = response.suggestions;
//this.data = response.data;
this.suggest();
}
},
activate: function(index) {
var divs, activeItem;
divs = this.container.children();
// Clear previous selection:
if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
$(divs.get(this.selectedIndex)).removeClass();
}
this.selectedIndex = index;
if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
activeItem = divs.get(this.selectedIndex);
$(activeItem).addClass('selected');
}
return activeItem;
},
deactivate: function(div, index) {
div.className = '';
if (this.selectedIndex === index) { this.selectedIndex = -1; }
},
select: function(i) {
var selectedValue, f;
selectedValue = this.suggestions[i];
if (selectedValue) {
if (this.options.autoSubmit) {
f = this.el.parents('form');
if (f.length > 0) { f.get(0).submit(); }
}
this.ignoreValueChange = true;
this.hide();
this.onSelect(i);
}
},
moveUp: function() {
if (this.selectedIndex === -1) { return; }
if (this.selectedIndex === 0) {
this.container.children().get(0).className = '';
this.selectedIndex = -1;
this.el.val(this.currentValue);
return;
}
this.adjustScroll(this.selectedIndex - 1);
},
moveDown: function() {
if (this.selectedIndex === (this.suggestions.length - 1)) { return; }
this.adjustScroll(this.selectedIndex + 1);
},
adjustScroll: function(i) {
var activeItem, offsetTop, upperBound, lowerBound;
activeItem = this.activate(i);
offsetTop = activeItem.offsetTop;
upperBound = this.container.scrollTop();
lowerBound = upperBound + this.options.maxHeight - 25;
if (offsetTop < upperBound) {
this.container.scrollTop(offsetTop);
} else if (offsetTop > lowerBound) {
this.container.scrollTop(offsetTop - this.options.maxHeight + 25);
}
theVal = this.getValue(this.suggestions[i])
theVal = theVal.replace(/\&amp;/g,'&');
theVal = theVal.replace(/\&#039;/g,'\'');
theVal = theVal.replace(/\&gt;/g,">");
theVal = theVal.replace(/\&lt;/g,'<');
theVal = theVal.replace(/\&quot;/g,'"');
theVal = theVal.replace(/\&#034;/g,'"');
this.el.val(theVal);
},
onClicked: function(i) {
theVal = this.getValue(this.suggestions[i])
theVal = theVal.replace(/\&amp;/g,'&');
theVal = theVal.replace(/&#039;/g,'\'');
this.el.val(theVal);
this.hide();
},
onSelect: function(i) {
var me, fn, s, d;
me = this;
fn = me.options.onSelect;
s = me.suggestions[i];
d = me.data[i];
s= s.replace(/\&amp;/g,'&');
s= s.replace(/\&lt;/g,'<');
s= s.replace(/&quot;/g,'"');
s= s.replace(/&#034;/g,'"');
s= s.replace(/&lt;/g,"<");
s= s.replace(/&gt;/g,">");
s= s.replace(/&#039;/g,'\'');
me.el.val(me.getValue(s));
if ($.isFunction(fn)) { fn(s, d, me.el); }
},
getValue: function(value){
var del, currVal, arr, me;
me = this;
del = me.options.delimiter;
if (!del) { return value; }
currVal = me.currentValue;
arr = currVal.split(del);
if (arr.length === 1) { return value; }
return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value;
}
};
}(jQuery));