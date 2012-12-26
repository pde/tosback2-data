  /**
     * Proxy between Flash and the User API v.2
     * @param commandArr - array [ commandName, [commandArgs]]
     */
function callUserAPIAction ( commandName, commandParams ) {
    var onSuccess = function( obj ) {
        // in basic.js or editor.js //
        handleUserServerResponse(obj.action, obj.success, obj.errorCode, obj.errorDescription, obj.payload, userApi.getCookie("wixSession"));
    };

    var onError = function( obj ) {
        var action = obj.action;
        var success = false;
        var errorCode = obj.errorCode;
        var errorDescription = obj.statusText;
        var userJson = {};

        // in basic.js or editor.js //
        handleUserServerResponse(action, success, errorCode, errorDescription, userJson, userApi.getCookie("wixSession"));
    };

    if (userApi) {
        //var commandName = commandArr[0];
        commandParams = /*commandArr[1]*/ commandParams || [];
        commandParams.push(onError);
        commandParams.push(onSuccess);

        var result = userApi[commandName].apply(this, commandParams);

        if (commandName == "logout") {
            handleUserServerResponse("logout", true);
        }

        return result;
    }
    else {
	   if (LOG){
			LOG.reportError(loginErrors.USER_API_NOT_LOADED_INITIALIZED_YET);
       }
    }
}