Type.registerNamespace('AjaxControlToolkit');AjaxControlToolkit.TextBoxWatermarkBehavior = function(element) {
AjaxControlToolkit.TextBoxWatermarkBehavior.initializeBase(this, [element]);this._watermarkText = null;this._watermarkCssClass = null;this._focusHandler = null;this._blurHandler = null;this._keyPressHandler = null;this._propertyChangedHandler = null;this._watermarkChangedHandler = null;this._oldClassName = null;this._clearedForSubmit = null;this._maxLength = null;if ((typeof(WebForm_OnSubmit) == 'function') && !AjaxControlToolkit.TextBoxWatermarkBehavior._originalWebForm_OnSubmit) {
AjaxControlToolkit.TextBoxWatermarkBehavior._originalWebForm_OnSubmit = WebForm_OnSubmit;WebForm_OnSubmit = AjaxControlToolkit.TextBoxWatermarkBehavior.WebForm_OnSubmit;}
}
AjaxControlToolkit.TextBoxWatermarkBehavior.prototype = {
initialize : function() {
AjaxControlToolkit.TextBoxWatermarkBehavior.callBaseMethod(this, 'initialize');var e = this.get_element();var hasInitialFocus = false;var clientState = AjaxControlToolkit.TextBoxWatermarkBehavior.callBaseMethod(this, 'get_ClientState');if (clientState != null && clientState != "") {
hasInitialFocus = (clientState == "Focused");AjaxControlToolkit.TextBoxWatermarkBehavior.callBaseMethod(this, 'set_ClientState', null);}
this._oldClassName = e.className;this._focusHandler = Function.createDelegate(this, this._onFocus);this._blurHandler = Function.createDelegate(this, this._onBlur);this._keyPressHandler = Function.createDelegate(this, this._onKeyPress);$addHandler(e, 'focus', this._focusHandler);$addHandler(e, 'blur', this._blurHandler);$addHandler(e, 'keypress', this._keyPressHandler);this.registerPropertyChanged();var currentValue = AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_Current();var wrapper = AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element());if (("" == currentValue) || (this._watermarkText == currentValue)) {
wrapper.set_Watermark(this._watermarkText)
wrapper.set_IsWatermarked(true);}
if (hasInitialFocus) {
this._onFocus();} else {
e.blur();this._onBlur();}
this._clearedForSubmit = false;this.registerPartialUpdateEvents();this._watermarkChangedHandler = Function.createDelegate(this, this._onWatermarkChanged);wrapper.add_WatermarkChanged(this._watermarkChangedHandler);},
dispose : function() {
var e = this.get_element();if (this._watermarkChangedHandler) {
AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).remove_WatermarkChanged(this._watermarkChangedHandler);this._watermarkChangedHandler = null;}
if(e.control && this._propertyChangedHandler) {
e.control.remove_propertyChanged(this._propertyChangedHandler);this._propertyChangedHandler = null;}
if (this._focusHandler) {
$removeHandler(e, 'focus', this._focusHandler);this._focusHandler = null;}
if (this._blurHandler) {
$removeHandler(e, 'blur', this._blurHandler);this._blurHandler = null;}
if (this._keyPressHandler) {
$removeHandler(e, 'keypress', this._keyPressHandler);this._keyPressHandler = null;}
if(AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_IsWatermarked()) {
this.clearText(false);}
AjaxControlToolkit.TextBoxWatermarkBehavior.callBaseMethod(this, 'dispose');},
_onWatermarkChanged : function(sender, eventArgs) {
if (AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_IsWatermarked()) {
this._onBlur();} else {
this._onFocus();}
},
clearText : function(focusing) {
var element = this.get_element();var wrapper = AjaxControlToolkit.TextBoxWrapper.get_Wrapper(element);wrapper.set_Value("");wrapper.set_IsWatermarked(false);if(focusing) {
element.setAttribute("autocomplete","off");element.select();}
},
_onFocus : function(evt) {
var e = this.get_element();if(AjaxControlToolkit.TextBoxWrapper.get_Wrapper(e).get_IsWatermarked()) {
this.clearText(evt ? true : false);}
e.className = this._oldClassName;if (this._maxLength > 0) {
this.get_element().maxLength = this._maxLength;this._maxLength = null;}
},
_onBlur : function() {
var wrapper = AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element());if(("" == wrapper.get_Current()) || wrapper.get_IsWatermarked()) {
if (this.get_element().maxLength > 0 && this._watermarkText.length > this.get_element().maxLength) {
this._maxLength = this.get_element().maxLength;this.get_element().maxLength = this._watermarkText.length;}
this._applyWatermark();}
},
_applyWatermark : function() {
var wrapper = AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element());wrapper.set_Watermark(this._watermarkText);wrapper.set_IsWatermarked(true);if(this._watermarkCssClass) {
this.get_element().className = this._watermarkCssClass;}
},
_onKeyPress : function() {
AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).set_IsWatermarked(false);},
registerPropertyChanged : function() {
var e = this.get_element();if(e.control && !this._propertyChangedHandler) {
this._propertyChangedHandler = Function.createDelegate(this, this._onPropertyChanged);e.control.add_propertyChanged(this._propertyChangedHandler);}
},
_onPropertyChanged : function(sender, propertyChangedEventArgs) {
if("text" == propertyChangedEventArgs.get_propertyName()) {
this.set_Value(AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_Current());}
},
_onSubmit : function() {
if(AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_IsWatermarked()) {
this.clearText(false);this._clearedForSubmit = true;}
},
_partialUpdateEndRequest : function(sender, endRequestEventArgs) {
AjaxControlToolkit.TextBoxWatermarkBehavior.callBaseMethod(this, '_partialUpdateEndRequest', [sender, endRequestEventArgs]);if (this.get_element() && this._clearedForSubmit) {
this.get_element().blur();this._onBlur();this._clearedForSubmit = false;}
},
get_WatermarkText : function() {
return this._watermarkText;},
set_WatermarkText : function(value) {
if (this._watermarkText != value) {
this._watermarkText = value;if (AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_IsWatermarked()) {
this._applyWatermark();}
this.raisePropertyChanged('WatermarkText');}
},
get_WatermarkCssClass : function() {
return this._watermarkCssClass;},
set_WatermarkCssClass : function(value) {
if (this._watermarkCssClass != value) {
this._watermarkCssClass = value;if (AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_IsWatermarked()) {
this._applyWatermark();}
this.raisePropertyChanged('WatermarkCssClass');}
},
get_Text : function() {
return AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).get_Value();},
set_Text : function(value) {
if ("" == value) {
AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).set_Current("");this.get_element().blur();this._onBlur();} else {
this._onFocus();AjaxControlToolkit.TextBoxWrapper.get_Wrapper(this.get_element()).set_Current(value);}
}
}
AjaxControlToolkit.TextBoxWatermarkBehavior.registerClass('AjaxControlToolkit.TextBoxWatermarkBehavior', AjaxControlToolkit.BehaviorBase);AjaxControlToolkit.TextBoxWatermarkBehavior.WebForm_OnSubmit = function() {
var result = AjaxControlToolkit.TextBoxWatermarkBehavior._originalWebForm_OnSubmit();if (result) {
var components = Sys.Application.getComponents();for(var i = 0 ;i < components.length ;i++) {
var component = components[i];if (AjaxControlToolkit.TextBoxWatermarkBehavior.isInstanceOfType(component)) {
component._onSubmit();}
}
}
return result;}

if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();