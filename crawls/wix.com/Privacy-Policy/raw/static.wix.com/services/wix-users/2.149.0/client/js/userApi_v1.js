function UserServer() {

    this.isScriptAlive = isScriptAlive;
    this.isServerAlive = isServerAlive;
    this.addJsNode = addJsNode;
    this.login = login;
    this.enhancedLogin = enhancedLogin;
    this.createUser = createUser;
    this.createUserNoNickname = createUserNoNickname;
    this.enhancedCreateUserNoNickname = enhancedCreateUserNoNickname;
    this.getUserDetails = getUserDetails;
    this.updateUser = updateUser;
    this.forgotPassword = forgotPassword;
    this.logout = logout;
    this.getToken = getToken;
    this.getUserName = getUserName;
    this.getEmail = getEmail;
    this.getMailStatus = getMailStatus;
    this.getPermissions = getPermissions;
    this.isSessionNew = isSessionNew;
    this.isSessionValid = isSessionValid;
    this.setCookies = setCookies;
    this.deleteCookies = deleteCookies;
    this.setUserType = setUserType;
    this.redirect = redirect;
    this.setLanguage = setLanguage;
    this.getLanguage = getLanguage;
    this.getEncryptedGuid = getEncryptedGuid;
    this.getCookie = getCookie;

    var mainCookie = "wixSession", helperCookie = "wixClient", languageCookie = "wixLanguage";
    var apiUrl = "https://" + usersDomain + "/wix-auth/api/";
    var domainName = usersDomain.substr(usersDomain.indexOf("."));
    var languages = ["en","es","pt","fr","de","pl","it","ru"];

    var serverLife = "dead";

    function isScriptAlive() {
        return "alive";
    }

    function isServerAlive() {
        return serverLife;
    }

    function callServer(func, params) {
        var paramStr = "";
        for (var param in params)
            paramStr += "&" + param + "=" + encodeURIComponent(params[param]);
        callStart = new Date().getTime();
        callName = func;
        slowTimeout = setTimeout(function() {
            writeToFloggerSlow("UserClient", callName)
        }, responseSlow);
        failedTimeout = setTimeout(function() {
            writeToFloggerFailed("UserClient", callName)
        }, responseFailed)
        addJsNode(apiUrl + func + "?" + paramStr.substr(1));
    }

    function addJsNode(src) {
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = src;
        document.getElementsByTagName("head")[0].appendChild(js);
    }

    function login(email, password, rememberMe, orgDocID) {
        callServer("login", {email:email, password:password, rememberMe:rememberMe, language: getLanguageFromDomainOrCookie(), orgDocID: orgDocID, appUrl: window.location.href});
    }

    function enhancedLogin(email, password, rememberMe, orgDocID, provider) {
        callServer("login", {email:email, password:password, rememberMe:rememberMe, language: getLanguageFromDomainOrCookie(), orgDocID: orgDocID, enhanced: "1", provider: provider, appUrl: window.location.href});
    }

    function createUser(userName, password, email, orgDocID) {
        //callServer("createUser", {userName:userName, password:password, email:email, language: getLanguageFromDomainOrCookie(), orgDocID: orgDocID});
        createUserNoNickname(password, email, orgDocID);
    }

    function createUserNoNickname(password, email, orgDocID) {
        callServer("createUserNoNickname", {password:password, email:email, language: getLanguageFromDomainOrCookie(), orgDocID: orgDocID, appUrl: window.location.href});
    }

    function enhancedCreateUserNoNickname(password, email, orgDocID, provider) {
        callServer("createUserNoNickname", {password:password, email:email, language: getLanguageFromDomainOrCookie(), orgDocID: orgDocID, provider: provider, appUrl: window.location.href});
    }

    function getUserDetails(wsess) {
        callServer("getUserDetails", {wsess: wsess});
    }

    function updateUser(password, newUserName, newPassword, newEmail, optInMail, wsess) {
        callServer("updateUser", {password:password, newUserName:newUserName, newPassword:newPassword, newEmail:newEmail, optInMail:optInMail, wsess: wsess});
    }

    function setLanguage(language, wsess) {
        setCookie(languageCookie, language, 157784630000);
        if (isSessionValid()) callServer("setUserLanguage", {language:language, wsess:wsess});
        else redirect();
    }

    function redirect() {
        var href = window.location.href.split("#")[0];
        window.location.href = "http://www" + href.substr(href.indexOf("."));
    }

    function forgotPassword(email) {
        callServer("forgotPassword", {email: email});
    }

    function logout() {
        deleteCookies();
        handleUserServerResponse("logout", true);
    }

    function getToken() {
        return getCookie(mainCookie);
    }

    function getUserName() {
        return getClientParam(0);
    }

    function getEmail() {
        return getClientParam(1);
    }

    function getMailStatus() {
        return getClientParam(2);
    }

    function getPermissions() {
        return getClientParam(3);
    }

    function isSessionNew() {
        var created = getClientParam(4);
        return created && created > new Date().getTime() - 20000;
    }

    function isSessionValid() {
        var exp = getClientParam(5);
        return exp && exp > new Date().getTime();
    }

    function getEncryptedGuid() {
        return getClientParam(6);
    }

    function getLanguage() {
        var language = getLanguageFromDomainOrCookie() || getLanguageFromBrowser();
        for (var i in languages)
            if (language == languages[i]) return language;
        return "en";
    }

    function getLanguageFromDomainOrCookie() {
        return getLanguageFromDomain() || getLanguageFromCookie() || "";
    }

    function getLanguageFromDomain() {
        var url = location.href.replace("http://", "");
        var subDomain = url.substr(0, url.indexOf("."));
        return subDomain.length == 2 ? subDomain : null;
    }

    function getLanguageFromCookie() {
        return getCookie(languageCookie);
    }

    function getLanguageFromBrowser() {
        return navigator.language || navigator.browserLanguage;
    }

    function getClientParam(i) {
        var params = getClientParams();
        return params ? params[i] : null;
    }

    function getClientParams() {
        var cookie = getCookie(helperCookie);
        return cookie ? cookie.split("|") : null;
    }

    function setCookies(token, userName, email, mailStatus, permissions, language, sessionExp, encryptedGuid) {
        setCookie(mainCookie, token, sessionExp);
        var now = new Date().getTime();
        setCookie(helperCookie, userName + "|" + email + "|" + mailStatus + "|" + permissions + "|"
                + now + "|" + (now + (sessionExp > 0 ? sessionExp : 86400000)) + "|" + encryptedGuid, sessionExp);
        if (language) setCookie(languageCookie, language, 157784630000);
    }

    function deleteCookies() {
        deleteCookie(mainCookie);
        deleteCookie(helperCookie);
        //deleteCookie(userTypeEnum.cookieName);
    }

    function setCookie(name, value, time) {
        cookieManager.setCookie(name, value, time, domainName);
    }

    function getCookie(name) {
        return cookieManager.getCookie(name);
    }

    function deleteCookie(name) {
        cookieManager.deleteCookie(name, domainName);
    }

    function setUserType(userType) {
        userTypeEnum.setUserType(userType);
    }

    var cookieManager = {

        setCookie : function(name, value, time, domain, path, secure) {
            window[name] = value;
            var cookie = name + "=" + value;
            if (time) cookie += ";expires=" + (new Date((new Date()).getTime() + time)).toGMTString();
            cookie += ";path=" + (path || "/");
            if (domain) cookie += ";domain=" + domain;
            if (secure) cookie += ";secure";
            document.cookie = cookie;
        },

        getCookie : function(name) {
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

        deleteCookie : function(name, domain, path, secure) {
            this.setCookie(name, "", -86400000, domain, path, secure);
        }

    };

    var userTypeEnum = {
        cookieName: "userType",
        expiration: 157784630000,
        ANONYMOUS: 0, REGISTERED: 1, PREMIUM_MONTHLY: 2, PREMIUM_YEARLY: 3,

        setUserType: function(userType) {
            var prevUserType = getCookie(this.cookieName);
            if (!prevUserType || this[userType] > this[prevUserType])
                setCookie(this.cookieName, userType, this.expiration);
        }
    };
}

var userServer = new UserServer();
var responseSlow = 5000, responseFailed = 10000;

function writeToFloggerSlow(appName, action) {
    if (window.location.protocol == 'http:') {
        userServer.addJsNode("http://flogger.wixpress.com/plebs?appVersion=" + appName +
                "&errType=Loginmodule%20request%20response%20is%20very%20slow&app=" + appName +
                "&apiParams=&docID=null&origin=10" +
                "&description=Loginmodule%20request%20was%20sent%205000%20miliseconds%20ago%20and%20no%20reponse%20was%20received%20yet%2E%20" +
                "&scopeInClient=LoginWrapperBase%2EonRequestDelayed&apiCall=" + action);
    }
}

function writeToFloggerFailed(appName, action) {
    if (window.location.protocol == 'http:') {
        userServer.addJsNode("http://flogger.wixpress.com/plebs?appVersion=" + appName +
                "&errType=Loginmodule%20request%20failed%20to%20return&app=" + appName +
                "&apiParams=&docID=null&origin=10" +
                "&description=Loginmodule%20request%20was%20sent%2010000%20miliseconds%20ago%20and%20no%20reponse%20was%20received%20yet%2E%20" +
                "Notified%20user%20of%20a%20timeout" +
                "&scopeInClient=LoginWrapperBase%2EonRequestTimedOut&apiCall=" + action);
    }
}

window.setTimeout(function() {
    try {
        userServer.addJsNode("https://" + usersDomain + "/wix-auth/jsIsAlive.jsp");
    } catch(e) {
    }
}, 3000);