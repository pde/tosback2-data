try {
    if (typeof (SmtrRmkr) !== 'object') {
        var SmtrRmkr = {
            cookieName: "mdllgx",
            scriptVersion: '10',
            maxQLength: 2048,
            scriptLocation: '//tr.smarterremarketer.net/finishline/',
            eReview: { Min: 1, Max: 5 },
            smtrRmkrCookie: '',
            logInfo: '',
            pageId: '',
            pic: 'mdllgx1x1.gif',
            domain: document.domain,
            wl: window.location,
            pn: window.location.pathname.toLowerCase(),
            pageName: '',
            FunType: { Checkout: 1, Shipping: 2, Payment: 3, Promo: 4, Gift: 5 },
            PageType: { Product: 0, Search: 1, Cart: 2, Category: 3, Purchase: 4, Other: 5 },
            PayType: { Unknown: -1, CC: 0, V: 1, MC: 2, AE: 3, PayPal: 4, BML: 5, Other: 6, D: 7 },
            ShipType: { Other: -1, Free: 0, NextDay: 1, TwoDay: 2, ThrDay: 3, Stand: 4, FE2Day: 5, FEONight: 6, WillCall: 7, Pickup: 8, Grd: 9, Spec: 10, OvrNt: 11, Express: 12, USPS: 13, SprSvr: 14, FE3Day: 15, FEStand: 16 },
            EmailType: { Account: 0, Transact: 1, Marketing: 2, Alert: 3, Click: 4, WishList: 5 },
            PayInteraction: { Number: 0, Month: 1, Year: 2, CVV: 3 },
            SC: { Name: "SMTRRMKTR", Delim: "^", Keys: { OptIn: 0, AccountEmail: 1, Count: 2} },
            pageType: 5,
            urlParamList: '',
            gaId: 'UA-28583725-1',
            sendReview: function (pid, val) {
                try {
                    if (!isNaN(val)) {
                        var rate = (parseFloat(val) - SmtrRmkr.eReview.Min) / (SmtrRmkr.eReview.Max - SmtrRmkr.eReview.Min);
                        if (rate <= 1 && rate >= 0) {
                            SmtrRmkr.requestImage({ action: 'prod_review', rate: rate, pid: pid }, false, null);
                        } else {
                            SmtrRmkr.logError("sendReview", "invalid rate");
                        }
                    }
                } catch (err) { SmtrRmkr.logError("sendReview", err); }
            },
            gaVisitorId: function () {
                var utma = SmtrRmkr.getCookie("__utma");
                if (utma) {
                    var parts = utma.split('.');
                    if (parts && parts.length >= 1) {
                        var id = parseInt(parts[1], 10);
                        if (!isNaN(id)) {
                            return id;
                        }
                    }
                }
                return null;
            },
            //Cookie Code
            getCookie: function (name) {
                name += "=";
                var cookieArray = document.cookie.split(';');
                for (var i = 0; i < cookieArray.length; i++) {
                    var c = cookieArray[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(name) === 0) {
                        return unescape(c.substring(name.length, c.length));
                    }
                }
                return null;
            },
            setCookie: function (name, value, expiresDays, path, domain) {
                var d = document, expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + expiresDays);
                try {
                    var cdomain = "" + ((domain && domain.length > 0) ? domain : SmtrRmkr.domain);
                    d.cookie = name + "=" + escape(value) +
                      ";expires=" + expireDate.toGMTString() +
                      ";path=" + path +
                      ";domain=" + cdomain;

                    var read = SmtrRmkr.getCookie(name);
                    if (!read || read.length === 0) {
                        //try to set session cookie
                        d.cookie = name + "=" + escape(value) +
                          ";path=" + path +
                          ";domain=" + cdomain;
                        read = SmtrRmkr.getCookie(name);
                        if (!read || read.length === 0) {
                            SmtrRmkr.logInfo = SmtrRmkr.logInfo + "nocookieset";
                        }
                    }
                } catch (err) { SmtrRmkr.logError("setCookie", err); }
            },
            getSCookie: function (idx) {
                var c = SmtrRmkr.getCookie(SmtrRmkr.SC.Name);
                if (c && c.length > 0) {
                    var cs = c.split(SmtrRmkr.SC.Delim);
                    if (cs.length > idx) {
                        return cs[idx];
                    }
                }
                return null;
            },
            setSCookie: function (idx, val) {
                var c = SmtrRmkr.getCookie(SmtrRmkr.SC.Name);
                if (!c) {
                    c = Array(SmtrRmkr.SC.Keys.Count).join(SmtrRmkr.SC.Delim);
                }
                var cs = c.split(SmtrRmkr.SC.Delim);
                if (cs.length > idx) {
                    cs[idx] = val.replace(SmtrRmkr.SC.Delim, "", "gi");
                    SmtrRmkr.setCookie(SmtrRmkr.SC.Name, cs.join(SmtrRmkr.SC.Delim), null, "/", null);
                }
            },
            getSmtrRmkrCookie: function () {
                if (!SmtrRmkr.smtrRmkrCookie || SmtrRmkr.smtrRmkrCookie.length === 0) {
                    SmtrRmkr.smtrRmkrCookie = SmtrRmkr.getCookie(SmtrRmkr.cookieName);
                }
                return SmtrRmkr.smtrRmkrCookie;
            },
            // Document, Page Parameter elements
            getFirstParam: function (a) {
                var r = '';
                for (var i = 0; i < a.length; i++) {
                    r = SmtrRmkr.getParam(a[i]);
                    if (r.length > 0) {
                        break;
                    }
                }
                return r;
            },
            getHash: function (p) {
                var retVal = '';
                var h = SmtrRmkr.wl.hash;
                if (h && h.length > 0) {
                    var params = h.slice(1).split('&');
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].indexOf('=') !== -1) {
                            var nv = params[i].split('=');
                            if (p.toLowerCase() === unescape(nv[0].toLowerCase())) {
                                retVal = unescape(nv[1].toLowerCase());
                                break;
                            }
                        }
                    }
                }
                return retVal;
            },
            getParam: function (p) {
                var retVal = '';
                var qparamList = SmtrRmkr.wl.search.substr(1) + '&' + SmtrRmkr.urlParamList;
                var qparamArray = qparamList.split('&');
                for (var i = 0; i < qparamArray.length; i++) {
                    if (qparamArray[i].indexOf('=') !== -1) {
                        var qparam = qparamArray[i].split('=');
                        if (p.toLowerCase() === unescape(qparam[0].toLowerCase())) {
                            retVal = unescape(qparam[1]);
                            break;
                        }
                    }
                }
                return retVal;
            },
            getElementFromEvent: function (e) {
                var ev = (window.event) ? window.event : e;
                return (ev.srcElement) ? ev.srcElement : (ev.target) ? ev.target : null;
            },
            getElement: function (elementName) {
                var d = document;
                var el = d.getElementById(elementName);
                if (el) {
                    return el;
                }
                else {
                    el = d.getElementsByName(elementName);
                    if (el && el.length === 1) {
                        return el[0];
                    }
                }
                return null;
            },
            getElementsByClassName: function (cn) {
                var elements = [];
                var els = document.getElementsByTagName('*');
                for (var i = 0; i < els.length; i++) {
                    var className = els[i].className;
                    if (className && className.length > 0 && className === cn) {
                        elements.push(els[i]);
                    }
                }
                return elements;
            },
            isPage: function (p) {
                return (SmtrRmkr.pn.indexOf(p) !== -1);
            },
            getReferrer: function () {
                var ref = '';
                var d = document;
                if (d.referrer && d.referrer.length > 0) {
                    if (d.referrer.replace(/niketrackclub|reviews|secure|search|https|http|www/gi, '').indexOf('://' + SmtrRmkr.wl.hostname.replace(/niketrackclub|reviews|secure|search|https|http|www/gi, '')) !== 0) {
                        ref = d.referrer;
                    }
                }
                return ref;
            },
            // Methods for attaching onBlur, onChange, etc
            attachToField: function (fun, elementName, atype) {
                try {
                    var el = SmtrRmkr.getElement(elementName);
                    if (el) {
                        addListener(el, atype, fun, true);
                    }
                } catch (err) { }
            },
            attachToFieldOnBlur: function (fun, elementName) {
                SmtrRmkr.attachToField(fun, elementName, "blur");
            },
            attachToFieldOnChange: function (fun, elementName) {
                SmtrRmkr.attachToField(fun, elementName, "change");
            },
            attachToFieldOnSubmit: function (fun, elementName) {
                SmtrRmkr.attachToField(fun, elementName, "submit");
            },
            attachToFieldOnClick: function (fun, elementName) {
                SmtrRmkr.attachToField(fun, elementName, "click");
            },
            //Image and Script methods
            requestImage: function (paramObj, forceSsl, imgLoadFunc) {
                var img = new Image(1, 1);
                var src;

                //add cookie to request obj
                paramObj.modalc = SmtrRmkr.getSmtrRmkrCookie();
                if (!paramObj.modalc || paramObj.modalc.length === 0 && (paramObj.action !== "log")) {
                    paramObj.oldaction = paramObj.action;
                    paramObj.action = "log";
                }
                if (paramObj.action && paramObj.action === "log") {
                    paramObj.u = SmtrRmkr.wl.href;
                }

                src = SmtrRmkr.rootURL(forceSsl);
                src += SmtrRmkr.pic + "?r=" + SmtrRmkr.randomNumber() + "&v=" + SmtrRmkr.scriptVersion;
                src += SmtrRmkr.getParmsFromObject(paramObj);
                img.src = src.substr(0, SmtrRmkr.maxQLength);
                img.onload = imgLoadFunc;
            },
            logError: function (method, errMsg) {
                try {
                    var em = (errMsg ? errMsg : 'NoMsg');
                    if (errMsg && errMsg.message) {
                        em = errMsg.message;
                    }
                    SmtrRmkr.requestImage({ action: "log", method: method, errmsg: em }, false, null);
                } catch (err) { }
            },
            onError: function (msg, url, num) {
                try {
                    var p = { msg: msg, url: url, num: num, href: SmtrRmkr.wl.href };
                    var errMsg = SmtrRmkr.getParmsFromObject(p);
                    //SmtrRmkr.logError("onError", errMsg);
                } catch (e) { }
                return true;
            },
            buildImgReqFromElem: function (elem, action, forceSsl, useFieldName, imgLoadFunc, paramObj) {
                try {
                    if (elem && elem.value && elem.value.length > 0) {
                        if (paramObj === null) {
                            paramObj = {};
                        }
                        paramObj.action = action;
                        if (useFieldName) {
                            paramObj.value = (elem.id ? elem.id : elem.name);
                        } else {
                            paramObj.value = elem.value;
                        }
                        if (elem.type && elem.type === "select-one") {
                            paramObj.text = elem[elem.selectedIndex].text;
                        }
                        SmtrRmkr.requestImage(paramObj, forceSsl, imgLoadFunc);
                    }
                } catch (err) { }
            },
            writeScriptInclude: function (src) {
                var item, d = document;
                item = d.getElementsByTagName('head');
                src = src.substr(0, SmtrRmkr.maxQLength);
                if (item && item.item(0)) {
                    var head = item.item(0);
                    var js = d.createElement('script');
                    js.setAttribute('language', 'javascript');
                    js.setAttribute('type', 'text/javascript');
                    js.setAttribute('src', src);
                    head.appendChild(js);
                } else {
                    d.write(unescape("%3Cscript src='" + src + "' type='text/javascript'%3E%3C/script%3E"));
                }
            },
            //Utility Functions
            getUTC: function () {
                var date = new Date(); //date for current client
                var localOffset = date.getTimezoneOffset(); // get offset from utc in minutes
                return localOffset;
            },
            randomNumber: function () {
                return Math.floor(Math.random() * 2000000000);
            },
            rootURL: function (forceSsl) {
                if (forceSsl) {
                    return "https:" + SmtrRmkr.scriptLocation;
                } else {
                    return SmtrRmkr.wl.protocol + SmtrRmkr.scriptLocation;
                }
            },
            parseParam: function (p) {
                if (p) {
                    return p.replace("'", "");
                } else {
                    return "";
                }
            },
            getParmsFromObject: function (o) {
                var src = '';
                for (var param in o) {
                    switch (typeof (o[param])) {
                        case "number":
                        case "boolean":
                            src += "&" + param + "=" + encodeURIComponent(o[param]);
                            break;
                        case "string":
                            if (o[param] && o[param].length > 0) {
                                src += "&" + param + "=" + encodeURIComponent(SmtrRmkr.parseParam(o[param]));
                            }
                            break;
                    }
                }
                return src;
            },
            cleanMoney: function (str) {
                if (str) {
                    str = parseInt(SmtrRmkr.removeTags(str.replace(/[$,.]/gi, '')), 10);
                }
                return str;
            },
            removeTags: function (str) {
                if (str) {
                    str = str.replace(/<[^>]+>/gi, '');
                }
                return str;
            },
            removeSpaces: function (str) {
                if (str) {
                    str = str.replace(/\s/g, '');
                }
                return str;
            },
            submitPageView: function (param) {
                try {
                    if (!SmtrRmkr.isIgnorePage()) {
                        param.modalc = SmtrRmkr.getSmtrRmkrCookie();
                        param.utc = SmtrRmkr.getUTC();
                        param.gaid = SmtrRmkr.gaId;
                        param.utm_campaign = SmtrRmkr.getFirstParam([SmtrRmkr.campaignKey, "utm_campaign", "cid"]);
                        param.modalme = SmtrRmkr.getParam("modalme");
                        param.modalcte = SmtrRmkr.getParam("modalcte");
                        param.ctid = SmtrRmkr.getParam("om_rid");
                        param.loiid = SmtrRmkr.getParam("loiid");
                        param.scenarioid = SmtrRmkr.getParam("scenarioid");
                        param.pt = SmtrRmkr.pageType;
                        param.gavid = SmtrRmkr.gaVisitorId();
                        param.href = SmtrRmkr.wl.href;
                        param.hostn = SmtrRmkr.wl.hostname;
                        param.pathn = SmtrRmkr.pn;
                        param.ref = SmtrRmkr.getReferrer();

                        if (SmtrRmkr.logInfo && SmtrRmkr.logInfo.length > 0) {
                            param.smtrRmkrLog = SmtrRmkr.logInfo;
                        }

                        var src = SmtrRmkr.rootURL(false) + "modalHandler.ashx?r=" + SmtrRmkr.randomNumber() + "&v=" + SmtrRmkr.scriptVersion;
                        src += SmtrRmkr.getParmsFromObject(param);

                        SmtrRmkr.writeScriptInclude(src);
                    }
                } catch (err) { SmtrRmkr.logError("submitPageView", err); }
            },
            //Order Logic
            orders: [],
            addOrder: function (orderId, affiliation, total, tax, shipping, city, state, country) {
                var i = SmtrRmkr.orderIndex(orderId);
                if (i !== -1) {
                    SmtrRmkr.orders[i].orderId = orderId;
                    SmtrRmkr.orders[i].affiliation = affiliation;
                    SmtrRmkr.orders[i].total += parseInt(parseFloat(total) * 100, 10);
                    SmtrRmkr.orders[i].tax += parseInt(parseFloat(tax) * 100, 10);
                    SmtrRmkr.orders[i].ship += parseInt(parseFloat(shipping) * 100, 10);
                    SmtrRmkr.orders[i].city = city;
                    SmtrRmkr.orders[i].state = state;
                    SmtrRmkr.orders[i].country = country;
                } else {
                    SmtrRmkr.orders.push(new SmtrRmkr.Order(orderId, affiliation, total, tax, shipping, city, state, country));
                }
            },
            addOrderItem: function (orderId, sku, name, category, price, quantity) {
                var ordIndex = SmtrRmkr.orderIndex(orderId);
                if (ordIndex !== -1) {
                    var itemIndex = SmtrRmkr.orderItemIndex(SmtrRmkr.orders[ordIndex], sku);
                    if (itemIndex !== -1) {
                        var item = SmtrRmkr.orders[ordIndex].items[itemIndex];
                        item.quantity += parseInt(quantity, 10);
                    } else {
                        SmtrRmkr.orders[ordIndex].items.push(new SmtrRmkr.OrderItem(orderId, sku, name, category, price, quantity));
                    }
                }
            },
            orderIndex: function (orderId) {
                for (var i = 0; i < SmtrRmkr.orders.length; i++) {
                    if (SmtrRmkr.orders[i].orderId === orderId) {
                        return i;
                    }
                }
                return -1;
            },
            orderItemIndex: function (order, sku) {
                for (var i = 0; i < order.items.length; i++) {
                    if (order.items[i].sku === sku) {
                        return i;
                    }
                }
                return -1;
            },
            clearOrders: function () {
                for (var o = SmtrRmkr.orders.length - 1; o >= 0; o--) {
                    for (var i = SmtrRmkr.orders[o].items.length - 1; i >= 0; i--) {
                        delete SmtrRmkr.orders[o].items[i];
                    }
                    delete SmtrRmkr.orders[o];
                }
            },
            Order: function (orderId, affiliation, total, tax, shipping, city, state, country) {
                this.orderId = orderId;
                this.affiliation = affiliation;
                this.total = parseInt(parseFloat(total) * 100, 10);
                this.tax = parseInt(parseFloat(tax) * 100, 10);
                this.ship = parseInt(parseFloat(shipping) * 100, 10);
                this.city = city;
                this.state = state;
                this.country = country;
                this.items = [];
                return this;
            },
            OrderItem: function (orderId, sku, name, category, price, quantity) {
                this.orderId = orderId;
                this.sku = sku;
                this.name = name;
                this.category = category;
                this.price = parseInt(parseFloat(price) * 100, 10);
                this.quantity = parseInt(quantity, 10);
                return this;
            },
            // GA Method Overrides
            trackTrans: function () {
                try {
                    //tracktrans
                    for (var i = 0; i < SmtrRmkr.orders.length; i++) {
                        var order = SmtrRmkr.orders[i];
                        var param = {};
                        param.action = "purchase_item"; // item will handle purch
                        param.orderid = order.orderId;
                        param.affiliation = order.affiliation;
                        param.total = order.total;
                        param.tax = order.tax;
                        param.shipping = order.shipping;
                        param.city = order.city;
                        param.state = order.state;
                        param.country = order.country;
                        for (var itm = 0; itm < order.items.length; itm++) {
                            var item = order.items[itm];
                            //param.orderId = item.orderId;
                            param.pid = item.sku;
                            param.name = item.name;
                            param.category = item.category;
                            param.price = item.price;
                            param.quantity = item.quantity;
                            SmtrRmkr.requestImage(param, false, null);
                        }
                    }
                    SmtrRmkr.clearOrders();
                } catch (err) { SmtrRmkr.logError("trackTrans2", err); }
            },
            campaignKey: "utm_campaign",
            mediumKey: "utm_medium",
            sourceKey: "utm_source",
            termKey: "utm_term",
            contentKey: "utm_content",
            getMetaData: function (getDesc, getKey) {
                try {
                    var name, m = document.getElementsByTagName("meta");
                    if (m && m.length > 0) {
                        var p = {};
                        p.action = "meta";
                        p.pageid = SmtrRmkr.pageId;
                        for (var i = 0; i < m.length; i++) {
                            if (m[i] && m[i].name && m[i].content) {
                                name = m[i].name.toLowerCase();
                                switch (name) {
                                    case "description":
                                        if (getDesc) {
                                            p.metad = m[i].content;
                                            SmtrRmkr.requestImage(p, false, null);
                                            p.metad = null;
                                        }
                                        break;
                                    case "keywords":
                                        if (getKey) {
                                            p.metak = m[i].content;
                                            SmtrRmkr.requestImage(p, false, null);
                                            p.metak = null;
                                        }
                                        break;
                                }
                            }
                        }
                    }
                } catch (err) { SmtrRmkr.logError("getMetaData", err); }
            },
            onPostProcess: function (p) {
                try {
                    SmtrRmkr.setCookie(SmtrRmkr.cookieName, p.cv, p.ce, p.cp, p.cd);
                    SmtrRmkr.pageId = p.pr;
                    SmtrRmkr.processMarketingInfo();
                    switch (SmtrRmkr.pageType) {
                        case SmtrRmkr.PageType.Cart:
                            SmtrRmkr.smtrRmkrCookie = SmtrRmkr.getCookie(SmtrRmkr.cookieName);
                            SmtrRmkr.updateCartItems(false);
                            break;
                        case SmtrRmkr.PageType.Purchase:
                            break;
                        case SmtrRmkr.PageType.Product:
                        case SmtrRmkr.PageType.Search:
                        case SmtrRmkr.PageType.Category:
                            SmtrRmkr.smtrRmkrCookie = SmtrRmkr.getCookie(SmtrRmkr.cookieName);
                            if (p.md || p.mk) {
                                SmtrRmkr.getMetaData(p.md, p.mk);
                            }
                        default:
                            SmtrRmkr.smtrRmkrCookie = SmtrRmkr.getCookie(SmtrRmkr.cookieName);
                            break;
                    }
                } catch (err) { SmtrRmkr.logError("onPostProcess", err); }
            },
            //Code to get campaign info
            processMarketingInfo: function () {
                try {
                    var p = {};
                    p.action = "campaign";
                    p.pageId = SmtrRmkr.pageId;
                    p.utm_source = SmtrRmkr.getFirstParam([SmtrRmkr.sourceKey, "utm_source"]);
                    p.utm_medium = SmtrRmkr.getFirstParam([SmtrRmkr.mediumKey, "utm_medium"]);
                    p.utm_term = SmtrRmkr.getFirstParam([SmtrRmkr.termKey, "utm_term"]);
                    p.utm_content = SmtrRmkr.getFirstParam([SmtrRmkr.contentKey, "utm_content"]);
                    p.utm_campaign = SmtrRmkr.getFirstParam([SmtrRmkr.campaignKey, "utm_campaign", "cid"]);

                    p.ref = SmtrRmkr.getReferrer();
                    if (p.ref.length === 0) {
                        if (p.utm_campaign.length === 0) {
                            p.utm_campaign = "" + ((SmtrRmkr.getParam("gclid").length > 0) ? "GoogleAdwords" : "");
                        }
                        if (p.utm_campaign.length === 0) {
                            p.utm_campaign = "" + ((SmtrRmkr.getParam("gdftrk").length > 0) ? "GoogleAffiliateNetwork" : "");
                        }
                    }
                    if (p.utm_campaign === "GoogleAdwords" || p.utm_campaign === "GoogleAffiliateNetwork") {
                        p.ref = "http://www.google.com";
                    }
                    p.href = SmtrRmkr.wl.href;
                    if ((p.utm_source + p.utm_medium + p.utm_term + p.utm_content + p.utm_campaign + p.ref).length > 0) {
                        SmtrRmkr.requestImage(p, false, null);
                    }
                } catch (err) { SmtrRmkr.logError("processMarketingInfo", err); }
            },
            onEmail: function (val, type, oi) {
                try {
                    if (val && val.length > 0) {
                        SmtrRmkr.requestImage({ action: 'email', value: val, 'et': type, 'oi': oi }, true, null);
                    }
                } catch (err) { SmtrRmkr.logError("onEmail", err); }
            },
            onEmailEl: function (id, type, oi) {
                try {
                    var el = SmtrRmkr.getElement(id);
                    if (el && el.value && el.value.length > 0) {
                        SmtrRmkr.onEmail(el.value, type, oi);
                    }
                } catch (err) { SmtrRmkr.logError("onEmailEl", err); }
            },
            onEmailEv: function (e, type, oi) {
                try {
                    var el = SmtrRmkr.getElementFromEvent(e);
                    if (el && el.value && el.value.length > 0) {
                        SmtrRmkr.onEmail(el.value, type, oi);
                    }
                } catch (err) { SmtrRmkr.logError("onEmailEv", err); }
            },
            interactedWithCheckout: false,
            onCheckoutEv: function (e) {
                try {
                    if (!SmtrRmkr.interactedWithCheckout) {
                        var el = SmtrRmkr.getElementFromEvent(e);
                        SmtrRmkr.onCheckoutEl(el);
                    }
                } catch (err) { SmtrRmkr.logError("onCheckoutEv", err); }
            },
            onCheckout: function (data) {
                try {
                    if (!SmtrRmkr.interactedWithCheckout) {
                        SmtrRmkr.requestImage({ action: 'checkout', value: data.value, dfint: (typeof (data.isDef) !== 'undefined') ? data.isDef : null }, false, function () { SmtrRmkr.interactedWithCheckout = true; });
                    }
                } catch (err) {
                    SmtrRmkr.logError("onCheckout", err);
                }
            },
            interactedWithPromo: false,
            onPromo: function (e) {
                try {
                    var el = SmtrRmkr.getElementFromEvent(e);
                    SmtrRmkr.requestImage({ action: 'funint', funinttype: SmtrRmkr.FunType.Promo, funintval: el.name ? el.name : el.id }, false, function () { SmtrRmkr.interactedWithPromo = true; });
                } catch (err) { }
            },
            interactedWithGift: false,
            onGiftChange: function (e) {
                try {
                    var el = SmtrRmkr.getElementFromEvent(e);
                    SmtrRmkr.requestImage({ action: 'funint', funinttype: SmtrRmkr.FunType.Gift, funintval: el.name ? el.name : el.id }, false, function () { SmtrRmkr.interactedWithGift = true; });
                } catch (err) { SmtrRmkr.logError("onGiftChange", err); }
            },
            processCRM: function () {
                try {
                    var p = {};
                    p.action = "crm";
                    if ((p.ccid + p.crmid + p.dwid + p.custid).length > 0) {
                        SmtrRmkr.requestImage(p, false, null);
                    }
                } catch (err) { SmtrRmkr.logError("processCRM", err); }
            },
            btsWired: false,
            onBTSCategoryView: function (id) {
                try {
                    SmtrRmkr.pageProcessed = false;
                    SmtrRmkr.processPage({ found: true, cn: 'Back To School: ' + id, cid: 'b2s_' + id, scn: null, brand: null });
                } catch (err) { SmtrRmkr.logError("onBTSCategoryView", err); }
            },
            lastCatName: null,
            lastSubCatName: null,
            lastCatBrand: null,
            getCategory: function () {
                var cat = {};
                cat.found = false;
                try {
                    var cn = null, scn = null, brand = null, cid = null;

                    if (SmtrRmkr.isHomePage()) {
                        cn = 'Homepage';
                    } else if (SmtrRmkr.isPage('/college-hooded-sweatshirt')) {
                        cid = 'colhoodswt';
                        cn = 'college-hooded-sweatshirt';
                    } else if (SmtrRmkr.isPage('/back-to-school')) {
                        var h = SmtrRmkr.wl.hash.replace('#', '');
                        if (h.length == 0 || h.length > 32) {
                            h = 'default';
                        }
                        cn = 'Back To School: ' + h;
                        cid = 'b2s_' + h;
                        
                        if (SmtrRmkr.btsWired == false) {
                            SmtrRmkr.btsWired = true;
                            $(document).ready(function () {
                                $("body").delegate("#bts .brands .header .nav ul li.item", "mouseup", function (event) {
                                    try {
                                        SmtrRmkr.onBTSCategoryView($(this).data('id'));
                                    } catch (derr) { SmtrRmkr.logError("btsmouseup", derr); }
                                });

                                $("body").delegate("#bts .scenes .nav ul li.item", "mousedown", function (event) {
                                    try {
                                        SmtrRmkr.onBTSCategoryView($(this).data('id'));
                                    } catch (derr) { SmtrRmkr.logError("btsmouseup", derr); }
                                });

                                $("body").delegate("#bts .look-cta", "mousedown", function (event) {
                                    try {
                                        SmtrRmkr.onBTSCategoryView($(this).data('id'));
                                    } catch (derr) { SmtrRmkr.logError("btsmouseup", derr); }
                                });

                            });
                        }

                    } else {
                        if (FL && FL.setup && FL.setup.categoryId && FL.setup.categoryId.length > 0) {
                            cid = FL.setup.categoryId;
                            cn = (s && s.prop5 && s.prop5.length > 0) ? s.prop5 : (document.title.length > 0) ? document.title : cid;
                        }
                    }
                    if (cn !== null) {
                        cat.found = true;
                        cat.cn = cn;
                        cat.scn = scn;
                        cat.brand = brand;
                        cat.cid = cid;
                        SmtrRmkr.lastCatName = cat.cn;
                        SmtrRmkr.lastSubCatName = cat.scn;
                        SmtrRmkr.lastCatBrand = cat.brand;
                    }
                } catch (err) { SmtrRmkr.logError("getCategory", err); }
                return cat;
            },
            formatId: function (str) {
                if (str) {
                    var i = str.indexOf('_');
                    if (i != -1) {
                        str = str.substr(0, i) + "_base";
                    }
                }
                return str;
            },
            lastPid: null,
            lastSKU: null,
            getProduct: function () {
                var prod = {};
                prod.found = false;
                try {
                    if (FL && FL.setup && FL.setup.productId && FL.setup.productId.length > 0) {
                        prod.pid = SmtrRmkr.formatId(FL.setup.productId);
                        prod.sku = SmtrRmkr.formatId(FL.setup.productId);
                        prod.brand = FL.setup.brand;
                        prod.found = true;
                        SmtrRmkr.lastPid = prod.pid;
                        SmtrRmkr.lastSKU = prod.sku;
                    }
                } catch (err) { SmtrRmkr.logError("getProduct", err); }

                return prod;
            },
            pageProcessed: false,
            processPage: function (cat) {
                try {
                    if (!SmtrRmkr.pageProcessed) {
                        SmtrRmkr.pageProcessed = true;
                        var d = document;
                        var title = d.title;
                        var smtrRmkrParam = {};
                        SmtrRmkr.pageType = SmtrRmkr.PageType.Other;

                        if (SmtrRmkr.isCartPage()) {
                            SmtrRmkr.pageType = SmtrRmkr.PageType.Cart;
                        } else if (SmtrRmkr.isOrderConfirmPage()) {
                            SmtrRmkr.pageType = SmtrRmkr.PageType.Purchase;
                        } else {
                            var prod = SmtrRmkr.getProduct();
                            if (prod.found) {
                                smtrRmkrParam.pid = prod.pid;
                                smtrRmkrParam.sku = prod.sku;
                                smtrRmkrParam.brand = prod.brand;
                                smtrRmkrParam.t = (title && title.length > 0) ? title.substr(0, 120) : prod.pid.substr(0, 120);
                                SmtrRmkr.pageType = SmtrRmkr.PageType.Product;
                            } else {
                                if (cat == null) {
                                    cat = SmtrRmkr.getCategory();
                                }
                                if (cat.found) {
                                    smtrRmkrParam.cn = cat.cn;
                                    smtrRmkrParam.cid = cat.cid;
                                    smtrRmkrParam.scn = cat.scn;
                                    smtrRmkrParam.brand = cat.brand;
                                    smtrRmkrParam.t = (title && title.length > 0) ? title.substr(0, 120) : cat.cn.substr(0, 120);
                                    SmtrRmkr.pageType = SmtrRmkr.PageType.Category;
                                } else if (FL && FL.setup && FL.setup.searchTerm && FL.setup.searchTerm.length > 0) {
                                    smtrRmkrParam.sp = FL.setup.searchTerm;
                                    SmtrRmkr.pageType = SmtrRmkr.PageType.Search;
                                }
                            }
                        }
                        SmtrRmkr.submitPageView(smtrRmkrParam);
                    }
                } catch (err) { SmtrRmkr.logError("processPage", err); }
            },
            elToTotal: function (n) {
                var tot = 0;
                var el = SmtrRmkr.getElement(n);
                if (el) {
                    tot = SmtrRmkr.cleanMoney((el.value) ? el.value : el.innerHTML);
                }
                return tot;
            },
            trim: function (str) {
                return (str || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
            },
            addToCart: function (pids, qtys, total, addOnly) {
                var p = {};
                p.action = "update_cart";
                //p.cartid = ;
                p.total = total;
                p.productlist = pids;
                p.qtylist = qtys;
                p.ao = addOnly;
                SmtrRmkr.requestImage(p, false, null);
            },
            onOrder: function () {
                try {
                    if (FL && FL.setup && FL.setup.order && FL.setup.order.products) {
                        var ord = FL.setup.order;
                        //(orderId, affiliation, total, tax, shipping, city, state, country) {
                        SmtrRmkr.addOrder(ord.id, '', ord.total, ord.tax, ord.shippingCost, ord.city, ord.state, ord.country);
                        for (var p = 0; p < ord.products.length; p++) {
                            var prod = ord.products[p];
                            //(orderId, sku, name, category, price, quantity)
                            SmtrRmkr.addOrderItem(ord.id, prod.id, prod.name, '', prod.price, prod.quantity);
                        }
                        SmtrRmkr.trackTrans();
                    }
                } catch (err) { SmtrRmkr.logError("onOrder", err); }
            },
            updateCartItems: function (addOnly) {
                try {
                    if (FL && FL.setup && FL.setup.cart && FL.setup.cart.products) {
                        var prods = FL.setup.cart.products;
                        var pids = [], qtys = [], total = 0;
                        for (var i = 0; i < prods.length; i++) {
                            pids.push(prods[i].id);
                            qtys.push(prods[i].quantity);
                            total += SmtrRmkr.cleanMoney(prods[i].salePrice);
                        }
                        SmtrRmkr.addToCart(pids.join(','), qtys.join(','), total, addOnly);
                    }
                } catch (err) { SmtrRmkr.logError("updateCartItems", err); }
            },
            onShipElement: function (el, isDefault) {
                try {
                    var val = (el.value ? el.value.toLowerCase() : (el.id ? el.id.toLowerCase() : (el.name ? el.name.toLowerCase() : '')));
                    var shpVal = SmtrRmkr.ShipType.Other;
                    if (val.indexOf('ground') > -1) {
                        shpVal = SmtrRmkr.ShipType.Grd;
                    } else if (val.indexOf('express') > -1) {
                        shpVal = SmtrRmkr.ShipType.NextDay;
                    } else if (val.indexOf('rush') > -1) {
                        shpVal = SmtrRmkr.ShipType.TwoDay;
                    }
                    if (shpVal !== SmtrRmkr.lastShipMethod) {
                        var p = {};
                        p.action = "ship_change";
                        p.value = shpVal;
                        p.text = val;
                        p.dfint = isDefault;
                        SmtrRmkr.requestImage(p, true, null);
                        SmtrRmkr.lastShipMethod = shpVal;
                    }
                } catch (err) { SmtrRmkr.logError("onShipElement", err); }
            },
            onPayType: function (pt) {
                try {
                    var p = {};
                    p.action = "payment";
                    p.pt = pt;
                    SmtrRmkr.requestImage(p, false, null);
                } catch (err) { SmtrRmkr.logError("onPayType", err); }
            },
            interactedWithPayment: false,
            hasPayYear: false,
            hasPayMonth: false,
            onPaymentChange: function (e) {
                try {
                    var transType = $('input[type=radio][name=transactionType]:checked').val();
                    var t = SmtrRmkr.PayType.Unknown;
                    if (transType) {
                        switch (transType.toLowerCase()) {
                            case 'cc':
                                t = SmtrRmkr.PayType.CC;
                                var cc = SmtrRmkr.getElement("billingCardType");
                                if (cc) {
                                    switch (cc[cc.selectedIndex].value.toLowerCase()) {
                                        case 'amex':
                                            t = SmtrRmkr.PayType.AE;
                                            break;
                                        case 'discover':
                                            t = SmtrRmkr.PayType.D;
                                            break;
                                        case 'mastercard':
                                            t = SmtrRmkr.PayType.MC;
                                            break;
                                        case 'visa':
                                            t = SmtrRmkr.PayType.V;
                                            break;
                                    }
                                }
                                break;
                            case 'bml':
                                t = SmtrRmkr.PayType.BML;
                                break;
                            case 'paypal':
                                t = SmtrRmkr.PayType.PayPal;
                                break;
                            default:
                                t = SmtrRmkr.PayType.Other; // other
                                break;
                        }
                    }
                    if (t !== null) {
                        var p = {};
                        p.action = "payment";
                        p.pt = t;
                        var el = SmtrRmkr.getElementFromEvent(e);
                        var fld = el.id.toLowerCase();
                        if (fld.indexOf('cardnumber') > -1) {
                            p.icn = true;
                        } else if (fld.indexOf('month') > -1) {
                            p.iem = true;
                            SmtrRmkr.hasPayMonth = true;
                            if (SmtrRmkr.hasPayYear) {
                                p.ied = true; // inter with yr already so send date
                            }
                        } else if (fld.indexOf('year') > -1) {
                            p.iey = true;
                            SmtrRmkr.hasPayYear = true;
                            if (SmtrRmkr.hasPayMonth) {
                                p.ied = true; // inter with mo already so send date
                            }
                        } else if (fld.indexOf('securitycode') > -1) {
                            p.icvv = true;
                        }
                        SmtrRmkr.requestImage(p, false, null);
                    }
                } catch (err) { }
            },
            wirePayMethod: function () {
                var payList = "billing_tt_cc,billing_tt_paypal,billing_tt_bml,billingCardType,billingCardNumber,billingExpirationMonth,billingExpirationYear,billingSecurityCode".split(",");
                for (var pi = 0; pi < payList.length; pi++) {
                    SmtrRmkr.attachToFieldOnChange(SmtrRmkr.onPaymentChange, payList[pi]);
                }
            },
            wireShipMethod: function (isDef) {
                $('input[type=radio][name=shippingMethod]').each(function () {
                    if (isDef) {
                        if ($(this).is(':checked')) {
                            SmtrRmkr.onShipElement($(this).get(0), true);
                        }
                    }
                    $(this).click(function () {
                        SmtrRmkr.onShipElement($(this).get(0), false);
                    });
                });

            },
            orig_siteCatalystAddToCart: null,
            prevAddedTot: 0,
            siteCatalystAddToCart: function (pid, qty) {
                var ret = null;
                try { ret = SmtrRmkr.orig_siteCatalystAddToCart(pid, qty); } catch (err) { SmtrRmkr.logError("siteCatalystAddToCart2", err); }
                try {
                    var cartTotal = 0;
                    if (FL && FL.DynamicCart && FL.DynamicCart.pageLoadInfo && FL.DynamicCart.pageLoadInfo.totals.subtotal && FL.DynamicCart.pageLoadInfo.totals.subtotal.length > 0) {
                        cartTotal = SmtrRmkr.cleanMoney(FL.DynamicCart.pageLoadInfo.totals.subtotal);
                    }
                    var prc = 0;
                    if (FL && FL.setup && FL.setup.selectedProduct && FL.setup.selectedProduct.price && FL.setup.selectedProduct.price.length > 0) {
                        var pdp = FL.setup.selectedProduct.price;
                        if (pdp.indexOf(',') > -1) {
                            prc = pdp.split(",")[0];
                        } else {
                            prc = pdp;
                        }
                    } else if (FL && FL.setup && FL.setup.qlSelectedProduct && FL.setup.qlSelectedProduct.price && FL.setup.qlSelectedProduct.price.length > 0) {
                        var pql = FL.setup.qlSelectedProduct.price;
                        if (pql.indexOf(',') > -1) {
                            prc = pql.split(",")[0];
                        } else {
                            prc = pql;
                        }
                    } else {
                        prc = $("#nowPrice").text();
                    }
                    var itmTot = SmtrRmkr.cleanMoney(prc) * parseInt(qty, 10);
                    var newTotal = SmtrRmkr.prevAddedTot + itmTot + cartTotal;
                    SmtrRmkr.addToCart(pid, qty, newTotal, true);
                    SmtrRmkr.prevAddedTot += itmTot; // store amt added
                } catch (err) { SmtrRmkr.logError("siteCatalystAddToCart1", err); }

                return ret;
            },
            onLoad: function () {
                try {

                    SmtrRmkr.processPage(null);

                    if (FL && FL.DynamicCart && typeof (FL.DynamicCart.siteCatalystAddToCart) != 'undefined') {
                        SmtrRmkr.orig_siteCatalystAddToCart = FL.DynamicCart.siteCatalystAddToCart;
                        FL.DynamicCart.siteCatalystAddToCart = SmtrRmkr.siteCatalystAddToCart;
                    }


                    SmtrRmkr.attachToFieldOnClick(function () {
                        SmtrRmkr.onEmailEl('emailSignupEmail', SmtrRmkr.EmailType.Marketing, true);
                    }, 'signUpForEmailsButton');

                    if (SmtrRmkr.isCartPage()) {
                        // paypal
                        SmtrRmkr.attachToFieldOnClick(function () { SmtrRmkr.onPayType(SmtrRmkr.PayType.PayPal); }, 'paypalCheckoutButton');
                        //promo 
                        SmtrRmkr.attachToFieldOnChange(SmtrRmkr.onPromo, 'wcCouponNumber');
                    } else if (SmtrRmkr.isPage('/store/checkout/login.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Transact, null); }, 'non-signinemail');
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'signinemail');

                        SmtrRmkr.attachToFieldOnClick(function () {
                            try {
                                var signUpEl = SmtrRmkr.getElement('regoptinemail');
                                if (signUpEl && signUpEl.checked) {
                                    SmtrRmkr.onEmailEl('non-signinemail', SmtrRmkr.EmailType.Marketing, true);
                                }
                            } catch (suErr) {
                                SmtrRmkr.logError("COLoginSignup", suErr);
                            }
                        }, 'continueButton');
                    } else if (SmtrRmkr.isPage('/store/checkout/ship.jsp')) {
                        // started co
                        SmtrRmkr.onCheckout({ value: 'shipPage' });
                        SmtrRmkr.wireShipMethod(true);
                    } else if (SmtrRmkr.isPage('/store/checkout/bill.jsp')) {
                        SmtrRmkr.wirePayMethod();
                        SmtrRmkr.attachToFieldOnChange(SmtrRmkr.onPromo, 'couponNumber');
                        SmtrRmkr.attachToFieldOnChange(SmtrRmkr.onGift, 'giftCardNumber');
                    } else if (SmtrRmkr.isOrderConfirmPage()) {
                        SmtrRmkr.onOrder();
                    } else if (SmtrRmkr.isPage('/store/my_account/signin.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'signinEmail');
                    } else if (SmtrRmkr.isPage('/store/my_account/register.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'email');
                        SmtrRmkr.attachToFieldOnClick(function () {
                            try {
                                var signUpEl = SmtrRmkr.getElement('receiveEmail');
                                if (signUpEl && signUpEl.checked) {
                                    SmtrRmkr.onEmailEl('email', SmtrRmkr.EmailType.Marketing, true);
                                }
                            } catch (suErr) {
                                SmtrRmkr.logError("RegSignup", suErr);
                            }
                        }, 'Continue');
                    } else if (SmtrRmkr.isPage('/store/my_account/personalprofile.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'email');
                        SmtrRmkr.attachToFieldOnSubmit(function () {
                            try {
                                var signUpEl = SmtrRmkr.getElement('receiveEmail');
                                if (signUpEl && signUpEl.checked) {
                                    SmtrRmkr.onEmailEl('email', SmtrRmkr.EmailType.Marketing, true);
                                }
                            } catch (suErr) {
                                SmtrRmkr.logError("Profile", suErr);
                            }
                        }, 'personalProfileForm');
                    } else if (SmtrRmkr.isPage('/store/my_account/forgotpassword.jsp') || SmtrRmkr.isPage('/store/checkout/forgotpassword.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'forgotPasswordEmail');
                    } else if (SmtrRmkr.isPage('/store/gifts/wishlist_landing.jsp')) {
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.WishList, null); }, 'createEmail');
                        SmtrRmkr.attachToFieldOnChange(function (e) { SmtrRmkr.onEmailEv(e, SmtrRmkr.EmailType.Account, null); }, 'returnEmail');
                    } else if (SmtrRmkr.isPage('/store/catalog/reviewsubmissionpage.jsp')) {
                        //TODO: not wiring up reviews as they are in iframe
                    }
                    //SmtrRmkr.processCRM();
                } catch (err) { SmtrRmkr.logError("onLoad", err); }
            },
            isIgnorePage: function () {
                return false;
            },
            isHomePage: function () {
                return SmtrRmkr.pn.length <= 1;
            },
            isOrderConfirmPage: function () {
                return SmtrRmkr.isPage('/store/checkout/confirm.jsp');
            },
            isCartPage: function () {
                return SmtrRmkr.isPage('/store/checkout/cart.jsp');
            }
        };  //end SmtrRmkr

        if (!window.addListener) {
            window.addListener = function(element, type, expression, bubbling) {
                bubbling = bubbling || false;
                if (window.addEventListener) { // Standard
                    element.removeEventListener(type, expression, bubbling);
                    element.addEventListener(type, expression, bubbling);
                    return true;
                } else if (window.attachEvent) { // IE
                    element.detachEvent('on' + type, expression);
                    element.attachEvent('on' + type, expression);
                    return true;
                } else {
                    return false;
                }
            };
        }
        window.onerror = SmtrRmkr.onError;
        SmtrRmkr.onLoad();
    }
} catch (loaderr) { }