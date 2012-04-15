(function () {
    // Singletone instance
    var INSTANCE = null;

    // define the UserApi class
    function UserApiClass(initJson) {
        return this.getInstance().init(initJson); // when called from "new", return the only instance of the API
    }

    ;

    // expose the class on GLOBAL scope!
    window["UserApi"] = UserApiClass;

    UserApiClass.prototype.getInstance = function () {

        if (INSTANCE == null) {
            INSTANCE = createInstance({});
        }

        return INSTANCE;

        function createInstance(initJson) {
            var api = {
                apiActions:{
                    login:"/auth/login",
                    createUser:"/auth/register",
                    forgotPassword:"/auth/forgotPassword",
                    getUserDetails:"/user/getUserDetails",
                    updateUser:"/user/update",
                    setLanguage:"/user/setLanguage"
                },

                /* default params */
                globalParams:{
                    languageCookie:"wixLanguage", helperCookie:"wixClient", mainCookie:"wixSession",
                    languages:{"en":"en", "es":"es", "pt":"pt", "fr":"fr"},
                    loadingObj:"body",
                    usersDomain:"",
                    i:0,
                    jsonpTimeOut:2500,
                    mockJSONPServerCall:false
                },

                /* urlParams: these params will be included in any CORS data send to the server */
                urlParams:{ orgDocID:"", language:"", suid:"", appUrl:"", source:"", urlThatUserRedirectedFrom:""},

                callBacks:{
                    /* an empty obj to have all temporary callback functions */
                },

                init:function (initJson) {
                    // proccess init parameters
                    if (typeof initJson == 'undefined' || !initJson)
                        initJson = {};

                    this.globalParams.corsEnabled = initJson.corsEnabled || false;
                    this.globalParams.usersDomain = initJson.usersDomain || "https://users.wix.com/wix-users";
                    this.urlParams.source = initJson.source || "";
                    this.urlParams.suid = initJson.suid || "";
                    this.urlParams.orgDocID = initJson.orgDocID || "null-doc-id";
                    this.urlParams.language = initJson.language || this.getUserLanguage();
                    this.urlParams.appUrl = encodeURIComponent(document ? document.location.href : "");
                    this.urlParams.urlThatUserRedirectedFrom = initJson.urlThatUserRedirectedFrom && initJson.urlThatUserRedirectedFrom.indexOf("$") == -1 ? encodeURIComponent(initJson.urlThatUserRedirectedFrom) : encodeURIComponent(document ? document.location.href : "");

                    //for jasmine
                    this.globalParams.mockJSONPServerCall = initJson.mockJSONPServerCall || false;

                    return returnObj;
                },

                userAction:function (actionName, params, onError, onSuccess) {
                    var actionURL;
                    var queryString = params;
                    if (api.apiActions.hasOwnProperty(actionName))
                        actionURL = api.apiActions[actionName];
                    else {
                        if (typeof LOG != 'undefined')
                            LOG.reportError(loginErrors.INVALID_USER_ACTION, "", "", {actionName:actionName});
                        return false;
                    }

                    // Serialize the input params object
                    if (typeof params == "object") {
                        queryString = "";
                        for (var paramName in params) {
                            var val = params[paramName];
                            if (val && val != "") {
                                queryString += paramName + "=" + encodeURIComponent(val) + "&"
                            }
                        }

                        if (queryString) {
                            queryString.substr(0, queryString.length - 1);
                        }
                    }

                    /* Create unique string for unique function*/
                    api.globalParams.i++;
                    /* Create an object that holds the string */
                    var tmpFuncName = "callback" + api.globalParams.i;
                    /* Create new temp object to hold the callbacks */
                    var tmpCallbacks = {
                        onSuccess:onSuccess,
                        onError:onError,
                        onSuccessJsonp:function (action, obj) {
                            clear();
                            onSuccess(obj);

                            function clear() {
                                clearTimeout(tmpCallbacks.firstTimeOut);
                                clearTimeout(tmpCallbacks.secondTimeOut);
                                api.callBacks[tmpCallbacks] = null;
                                if (tmpCallbacks.scriptRef != null)
                                    document.getElementsByTagName("head")[0].removeChild(tmpCallbacks.scriptRef);
                            }
                        },
                        firstTimeOut:null,
                        secondTimeOut:null,
                        scriptRef:null
                    };
                    tmpCallbacks.firstTimeOut = setTimeout(function () {
                        api.reportJsonpsError(tmpCallbacks, "JSONP_3S_TIMEOUT")
                    }, 3000);
                    tmpCallbacks.secondTimeOut = setTimeout(function () {
                        api.reportJsonpsError(tmpCallbacks, "JSONP_10S_TIMEOUT")
                    }, 10000);

                    /* adding the new func name to the UserApi main object */
                    api.callBacks[tmpFuncName] = tmpCallbacks;
                    api.sendRequest(queryString, actionURL, tmpFuncName, tmpCallbacks);
                    return true;
                },

                sendRequest:function (queryString, actionURL, tmpFuncName, tmpCallbacks) {
                    var self = this;
                    var url = api.globalParams.usersDomain + actionURL + "?" + queryString;
                    for (var item in api.urlParams) {
                        url = url + "&" + item + "=" + api.urlParams[item];
                    }
                    /* if CORS exist */
                    var xhr = new XMLHttpRequest();
                    /*  Currently we are writing the cookies on teh server side. Internet explorer does not let cookie passing over CORS
                     untill we will write on the client side, all Internet explorer versions will have fallback to Json api.
                     Remove the commented line below and delete the line after to go back to ie8 > with CORS.
                     */
                    //            if (("withCredentials" in xhr) || (typeof XDomainRequest != "undefined")){


                    if ("withCredentials" in xhr && api.globalParams.corsEnabled) {
                        url = url + "&accept=json";
                        api.makeCORS(url, tmpCallbacks);
                    }
                    else if (this.globalParams.mockJSONPServerCall) {
                        var firstObjFromServer = {callback:"", action:"", type:""};
                        var secondObjFromServer = {success:true};
                        UserApi.getInstance().getOnSuccessJsonpCallBack(tmpFuncName)(firstObjFromServer, secondObjFromServer);
                    }
                    else {
                        /* LEGACY - building ugly query */
                        url = url + "&accept=jsonp";
                        url = url + "&callback=UserApi.getInstance().getOnSuccessJsonpCallBack('" + tmpFuncName + "')";
                        url = url + "&callerId=" + tmpFuncName;
                        tmpCallbacks.scriptRef = api.makeJsonp(url);
                    }
                    xhr = null;
                },

                /* LEGACY - remove with jsonp */
                makeJsonp:function (url) {
                    var js = document.createElement("script");
                    js.type = "text/javascript";
                    js.src = url;
                    document.getElementsByTagName("head")[0].appendChild(js);
                    return js;
                },

                getOnSuccessJsonpCallBack:function (callBackFunc) {
                    var cbFunctions = api.callBacks[callBackFunc];
                    return cbFunctions.onSuccessJsonp;
                },

                makeCORS:function (url, tmpCallbacks) {
                    /* we dont need to test for timeout in this old way because we have ajax timeout handling. clear timeout that is only relevant to the jsonp */
                    clearTimeout(tmpCallbacks.firstTimeOut);
                    clearTimeout(tmpCallbacks.secondTimeOut);
                    var that = this;
                    /*TEST */
                    var xhr = new XMLHttpRequest();
                    /* if object exist - we have a CORS supporting browser */
                    if ("withCredentials" in xhr) {
                        xhr.open("GET", url, true);
                        xhr.withCredentials = "true";
                        /* if Microsoft */
                    } else if (typeof XDomainRequest != "undefined") {
                        xhr = new XDomainRequest();
                        xhr.open("GET", url);
                    }
                    //hxr.setRequestHeader("Accept","application/json");
                    /*begin error handling */
                    xhr.onabort = function () {
                        that.reportCorsError(loginErrors.AJAX_ABORTED, xhr, "", tmpCallbacks.onError)
                    };
                    xhr.ontimeout = function () {
                        that.reportCorsError(loginErrors.AJAX_TIMEOUT, xhr, "", tmpCallbacks.onError)
                    };
                    xhr.onerror = function () {
                        that.reportCorsError(loginErrors.AJAX_GENERAL_ERROR, xhr, "", tmpCallbacks.onError);
                    };

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 2)$(that.globalParams.loadingObj).trigger("loading", ["loadStart"]);
                        if (xhr.readyState == 4)$(that.globalParams.loadingObj).trigger("loading", ["loadEnd"]);
                    };

                    xhr.onload = function () {
                        /* 1. If we got an ajax object response */
                        if (xhr.responseText) {
                            /* if we have a json parse object use it, if not - evil eval */
                            var parser = JSON.parse ? JSON.parse : eval;
                            /*2. try to parse the string to json */
                            try {
                                var jsonObj = parser(xhr.responseText);
                            } catch (e) {
                                /* 2. if this is not json report and stop the block */
                                that.reportCorsError(loginErrors.AJAX_JSON_PARSE_FAILED, xhr, e + "not a json", tmpCallbacks.onError);
                                return;
                            }
                            //                    if(jsonObj.payload && jsonObj.payload.cookies)that.setUserCookie(jsonObj.payload.cookies);
                            tmpCallbacks.onSuccess(jsonObj);
                        } else {
                            /* 1. if not - report it */
                            that.reportCorsError(loginErrors.AJAX_NOT_TRUE_AJAX, xhr, "no ajax response", tmpCallbacks.onError)
                        }
                    };
                    xhr.send();
                },
                reportCorsError:function (err, obj, str, onError) {
                    var strObj = "";
                    strObj = strObj + "status:" + obj.status;
                    strObj = strObj + "\n statusText:" + obj.statusText;
                    strObj = strObj + "\n responseText:" + obj.responseText;
                    strObj = strObj + "\n response:" + obj["response"];
                    if (typeof LOG != 'undefined')
                        LOG.reportError(err, "", "", strObj);
                    onError(obj);
                },

                reportJsonpsError:function (obj, errMap) {
                    var strObj = obj.toString();
                    if (typeof LOG != 'undefined')
                        LOG.reportError(loginErrors[errMap], "", "", obj);
                    obj.onError({'statusText':err[9975]});
                },

                getClientParam:function (paramName) {
                    var params = api.getClientParams();
                    return params ? params[paramName] : null;
                },

                getClientParams:function () {
                    var cookie = cookieManager.getCookie(api.globalParams.helperCookie);
                    var params = cookie ? cookie.split("|") : null;
                    if (cookie) {
                        params = cookie.split("|");
                        return {
                            "userName":params[0],
                            "email":params[1],
                            "mailStatus":params[2],
                            "permissions":params[3],
                            "isSessionNew":params[4],
                            "isSessionValid":params[5]
                        }
                    }
                    else {
                        return null;
                    }

                },

                isSessionNew:function () {
                    var created = api.getClientParam(4);
                    return created && created > new Date().getTime() - 20000;
                },

                getUserLanguage:function () {
                    var fromCookie = function () {
                        var langCookie = api.globalParams.languageCookie;
                        return cookieManager.getCookieParams(langCookie);
                    };
                    var fromDomain = function () {
                        var parts = document.domain.toString().split('.'.toString());
                        return  parts[parts.length - 1].length == 2 ? parts[parts.length - 1] : null;
                    };
                    var fromBrowser = function () {
                        return navigator.language || navigator["browserLanguage"]
                    };
                    var lng = fromDomain() || fromCookie.call(this) || fromBrowser();
                    if (api.globalParams.languages[lng]) return lng;
                    return "en";
                }
            };
            /* cookies manager - split */
            var cookieManager = {
                setCookie:function (name, value, time, domain, path, secure) {
                    window[name] = value;
                    var cookie = name + "=" + value;
                    if (time) cookie += ";expires=" + (new Date((new Date()).getTime() + time)).toGMTString();
                    cookie += ";path=" + (path || "/");
                    if (domain) cookie += ";domain=" + domain;
                    if (secure) cookie += ";secure";
                    document.cookie = cookie;
                },

                getCookie:function (name) {
                    if (window[name]) return window[name];
                    if (document.cookie) {
                        var cookies = document.cookie.split(/;\s*/);
                        for (var i = 0, n = cookies.length; i < n; i++) {
                            var cookie = cookies[i];
                            if (cookie.indexOf(name + "=") == 0)
                                return cookie.substr(name.length + 1);
                        }
                    }
                    return null;
                },
                getCookieParams:function (key) {
                    var strKey = key + "=";
                    var cookiesArray = document.cookie.split(';');
                    //go through the array (so through all cookies):
                    for (var i = 0; i < cookiesArray.length; i++) {
                        //Set c to the cookie to be checked
                        var cookie = cookiesArray[i];
                        // If the first character is a space, remove it by using the substring() method. Continue doing this until the first character is not a space.
                        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
                        // if the cookie == key, return its value
                        if (cookie.indexOf(strKey) == 0) return cookie.substring(strKey.length, cookie.length);
                    }
                    return null;
                },

                deleteCookie:function (name) {
                    var domain = (document ? document.location.host : "");
                    domain = domain.substring(domain.indexOf(".") + 1);
                    this.setCookie(name, "", -86400000, domain, "/");
                }
            };

            var returnObj = {
                init:function (initJson) {
                    return api.init(initJson);
                },
                login:function (email, password, rememberMe, onError, onSuccess) {
                    api.userAction("login", { email:email, password:password, rememberMe:rememberMe, enhanced:0 }, onError, onSuccess);
                },
                createUser:function (email, password, onError, onSuccess) {
                    api.userAction("createUser", { email:email, password:password }, onError, onSuccess)
                },
                getUserDetails:function (onError, onSuccess) {
                    api.userAction("getUserDetails", null, onError, onSuccess);
                },
                updateUser:function (password, newUserName, newPassword, newEmail, optInMail, onError, onSuccess) {
                    var paramObj = { newUserName:newUserName, newEmail:newEmail, optInMail:optInMail, newPassword:newPassword, password:password };
                    api.userAction("updateUser", paramObj, onError, onSuccess);
                },
                forgotPassword:function (email, onError, onSuccess) {
                    api.userAction("forgotPassword", {email:email}, onError, onSuccess);
                },
                setLanguage:function (lang, onError, onSuccess) {
                    api.urlParams.language = lang; // langugage is already sent as URL Parameter
                    api.userAction("setLanguage", null, onError, onSuccess);
                },
                isScriptAlive:function () {
                    return "alive";
                },
                getToken:function () {
                    return cookieManager.getCookie(api.globalParams.mainCookie);
                },
                getUserName:function () {
                    return api.getClientParam("userName");
                },
                getEmail:function () {
                    return api.getClientParam("email");
                },
                getMailStatus:function () {
                    return api.getClientParam("mailStatus");
                },
                getPermissions:function () {
                    return api.getClientParam("permissions");
                },
                isSessionValid:function () {
                    var exp = api.getClientParam("isSessionValid");
                    return exp && exp > new Date().getTime();
                },
                logout:function () {
                    cookieManager.deleteCookie(api.globalParams.mainCookie);
                    cookieManager.deleteCookie(api.globalParams.helperCookie);
                },
                getCookie:function (cookieName) {
                    return cookieManager.getCookie(cookieName);
                },
                setCookie:function (name, value, time, domain, path, secure) {
                    return cookieManager.setCookie(name, value, time, domain, path, secure);
                },
                userAction:function (str, onError, onSuccess, action) {
                    api.userAction(str, onError, onSuccess, action)
                },
                getOnSuccessJsonpCallBack:function (callBackFunc) {
                    return api.getOnSuccessJsonpCallBack(callBackFunc);
                }
            };

            return returnObj;
        }

        ; // Create instance function end
    }; // get Instance function end
})();

window["UserApi"].getInstance = UserApi.prototype.getInstance;

