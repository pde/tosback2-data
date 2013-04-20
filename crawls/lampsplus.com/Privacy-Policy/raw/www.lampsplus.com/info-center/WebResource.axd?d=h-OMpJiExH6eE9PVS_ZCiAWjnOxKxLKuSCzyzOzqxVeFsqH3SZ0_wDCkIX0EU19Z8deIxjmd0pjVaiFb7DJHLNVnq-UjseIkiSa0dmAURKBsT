
function ContentFragmentContainerCustomCallback(variableName, callbackFunction)
{
    this._variableName = variableName;
    this._callbackFunction = callbackFunction;
}

ContentFragmentContainerCustomCallback.prototype._customCallback = function(id, callbackControlId, callbackParameter, callbackContext, successFunction, errorFunction)
{
    this._callbackFunction('custom', 'id=' + encodeURIComponent(id) + '&renderFromCurrent=True&callback_control_id=' + encodeURIComponent(callbackControlId) + '&callback_argument=' + encodeURIComponent(callbackParameter), successFunction, errorFunction, callbackContext);
}
