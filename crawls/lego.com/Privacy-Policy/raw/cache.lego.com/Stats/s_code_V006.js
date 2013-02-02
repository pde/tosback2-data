/* SiteCatalyst code version: H.24.2.basics
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var s = s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.linkDownloadFileTypes = "jpg,jpeg,png,rbt,mov,wmv,mpg,mpeg,avi,zip,sit,lxf,pdf,gif,mp3,wav,exe,air,rar,dmg";
s.linkInternalFilters = "javascript:,localhost,lego.com,bioniclestory.com,legospace.com,mindstormseducation.com,legofriends.kr,medlem.legoclub.dk,shop.lego.co.kr,city.lego.es,herofactory.lego.it,lego.be,lego.co.uk,lego.de,lego.hu,lego.it,lego.netsvar.se,lego.nettsvar.no,lego.pl,lego.ru,legoclub.com,legoclub.fr,legoeducation.co.kr,legoeducation.co.uk,legoeducation.jp,legoeducation.us,legoevent.co.kr,legofactory.com,legofamilytime.com,legofriends.dk,legofriends.kr,legoshop.com,legoshop.fr,legospace.com,legouniverse.com,legowish.com,legoworld.dk,ninjago.lego.com,ninjago.lego.es";
s.linkLeaveQueryString = false;
s.linkTrackVars = "None";
s.linkTrackEvents = "None";
s.charSet = "UTF-8";

/********************** LEGO SPECIFIC FUNCTIONS *********************/
var s_isDev = s_account.toLowerCase().indexOf("legoglobaldev") >= 0;
var s_isQa = s_account.toLowerCase().indexOf("legoglobalqa") >= 0;

LEGOSiteStats = window.LEGOSiteStats || {};
LEGOSiteStats.Settings = (function () {
    "use strict";
    return {
        setDownloadLinkTrackingEnabled: function (enabled) {
            var sObj;
            if (LEGOSiteStats.hasOwnProperty("s")) {
                sObj = LEGOSiteStats.s;
            }
            else {
                sObj = window.s;
            }
            sObj.trackDownloadLinks = (enabled === true);
        }
    };
} ());
LEGOSiteStats.GetDefaultLinkTrackingVars = function () {
    return 'events,' +
           'eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar12,eVar26,eVar27,eVar47,eVar50,' +
           'products';
};
LEGOSiteStats.GetSCodeVersion = function () {
    var sCodeSrc, siteStatsSrc, gaDetect, els, i, src, sObj, sVersion;
    sCodeSrc = "";
    siteStatsSrc = "";
    gaDetect = "";
    try {
        els = document.getElementsByTagName("script");
        for (i = 0; i < els.length; i = i + 1) {
            src = (els[i].src + "").toLowerCase();
            if (src.length > 0) {
                if (src.indexOf("/s_code_v") > 0) {
                    sCodeSrc = "|" + src;
                    break;
                }
                else if (src.indexOf("/legositestats.1.js.ashx") > 0) {
                    siteStatsSrc = "|" + src;
                    break;
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(window, "_gaq") || Object.prototype.hasOwnProperty.call(window, "_gat") || Object.prototype.hasOwnProperty.call(window, "urchinTracker")) {
            gaDetect = "|ga";
        }
    }
    catch (ex) {
    }
    sObj = LEGOSiteStats.s || window.s;
    sVersion = sObj.version || "Unknown";
    return sVersion + sCodeSrc + siteStatsSrc + gaDetect;
};

function PageStats() {
    var sPageName, args, pageEvents, i, prop3val;
    if (s._cpychannel) s.channel = s._cpychannel;
    if (s._cpypageName) s.pageName = s._cpypageName;
    sPageName = s.channel;
    args = PageStats.arguments;
    pageEvents = s.events;
    for (i = 0; i < args.length; i++) {
        if (args[i].replace(/^\s+|\s+$/g, '') != '') {
            sPageName += ':' + args[i];
        }
    }
    prop3val = s.prop3;
    if (args[args.length - 1].toLowerCase().indexOf("tellafriend") === 0) {
        pageEvents = "event1";
        s.prop3 = ""
    }
    s.pageName = sPageName;
    s.events = pageEvents;
    s._cpypageName = s.pageName;
    s._cpychannel = s.channel;
    s.t();
    s.prop3 = prop3val;
    s.events = "";
}

function ProductPageStats(category, productNumber) {
    var omitOverview = false;
    if (productNumber.toString() === "") {
        throw "Missing product number for Content Product view event in call to ProductPageStats.";
    } else {
        if (LEGOSiteStats.Settings.hasOwnProperty("OmitOverview")) {
            omitOverview = LEGOSiteStats.Settings.OmitOverview;
        }
        if (category.indexOf(":" + productNumber) > 0) {
            if (s_isDev || s_isQa) {
                if (Object.prototype.hasOwnProperty.call(window, "console")) {
                    console.error("Error in call to ProductPageStats. Param category contains :productNumber.");
                }
            }
            category = category.replace(":" + productNumber, "");
        }
        if (s._cpychannel) s.channel = s._cpychannel;
        s.pageName = s.channel + ":" + category + ":" + productNumber + (omitOverview ? "" : ":overview");
        s._cpypageName = s.pageName;
        s._cpychannel = s.channel;
        s.t({
            events: "event8",
            eVar20: productNumber,
            products: ";" + productNumber + ";;"
        });
        s.events = "";
        s.products = "";
        s.eVar20 = "";
    }
}

// Handle ajax download and exit links problems
try {
    if (window.addEventListener) {
        window.addEventListener('click', function (e) {
            handleClickEvent(e);
        }, false);
    } else {
        document.attachEvent('onclick', function (e) {
            handleClickEvent(e);
        });
    }
}
catch (ex) {
    // Ignore possible errors when adding the ajax download link tracking
}

function handleClickEvent(e) {
    var targ;
    try {
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;
        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        if (targ != undefined && targ.onclick == undefined &&
            targ.tagName.toLowerCase() != 'img') {
            s.lc.apply(targ);
        }
    }
    catch (ex) {
        // fail silent when dom-link parsing fails
    }
}

LEGOSiteStats.TrackingVerification = (function () {
    "use strict";

    var hasValue, logVerificationError, addedEvent100;

    hasValue = function (v) {
        return (typeof v !== 'undefined' && v !== null && v !== '');
    };

    addedEvent100 = false;

    logVerificationError = function (errorMessage) {
        var boxDiv, boxId, sObj;

        if (LEGOSiteStats.hasOwnProperty("s")) {
            sObj = LEGOSiteStats.s;
        }
        else {
            sObj = window.s;
        }

        // Fire "TrackingError" event
        if (!addedEvent100) {
            if (sObj.events !== "") {
                sObj.events += ",";
            }
            sObj.events += "event100";
            addedEvent100 = true;
        }

        // Show error in FireBug console
        if (s_isDev || s_isQa) {
            if (Object.prototype.hasOwnProperty.call(window, "console")) {
                console.error("SiteCatalyst tracking error found on site '" + document.location.href + "':\n" + errorMessage);
            }
        }
    };

    return {
        verifyEVars: function () {
            var requiredValueAry, v, idx, foundValue, t, sObj;
            try {
                if (LEGOSiteStats.hasOwnProperty("s")) {
                    sObj = LEGOSiteStats.s;
                }
                else {
                    sObj = window.s;
                }
                requiredValueAry = ['eVar3', 'eVar7', 'eVar8', 'eVar9', 'eVar26', 'eVar27'];
                for (idx in requiredValueAry) {
                    if (requiredValueAry.hasOwnProperty(idx) === false) {
                        continue;
                    }
                    v = requiredValueAry[idx];
                    foundValue = false;
                    if (sObj.hasOwnProperty(v)) {
                        if (hasValue(s[v]) === true) {
                            foundValue = true;
                        }
                    }
                    if (foundValue === false) {
                        if (sObj.hasOwnProperty("_trackCallType")) {
                            t = ', tracking type: ' + sObj._trackCallType;
                        }
                        logVerificationError('Required tracking value missing: ' + v + t);
                    }
                }
                if (sObj.hasOwnProperty("_trackCallType")) {
                    if (s._trackCallType === "PageHit-LinkHit") {
                        t = "";
                        if (hasValue(s.server)) {
                            t += (t === "" ? "" : ", " ) + "server";
                        }
                        if (hasValue(s.channel)) {
                            t += (t === "" ? "" : ", " ) + "channel";
                        }
                        if (hasValue(s.pageName)) {
                            t += (t === "" ? "" : ", " ) + "pageName";
                        }
                        if (hasValue(s.eVar22)) {
                            t += (t === "" ? "" : ", " ) + "eVar22";
                        }
                        if (hasValue(s.eVar25)) {
                            t += (t === "" ? "" : ", " ) + "eVar25";
                        }
                        if (t !== "") {
                            logVerificationError('LinkHits may not track ' + t + '.');
                        }
                    }
                }
            }
            catch (e) {
            }
        }
    };
} ());
/* End of LEGO SPECIFIC functions */

/* Plugin Config - LEGO SPECIFIC tracking rules */
s.usePlugins = true;

function s_doPlugins(s)
{
    var hasValue, t_search;

    hasValue = function (v) {
        return (typeof v !== 'undefined' && v !== null && v !== '');
    };

    /*Responsys email campaign tracking*/
    s.eVar28 = s.getQueryParam("RRID");
    // s.eVar29 = s.getQueryParam("RVID");
    s.eVar30 = s.getQueryParam("RMID");

    /*External Campaigns*/
    if (!s.campaign) {
        s.campaign = s.getQueryParam('CMP,KAC,HQS', ':');
    }
    s.campaign = s.getValOnce(s.campaign, 's_campaign', 0);

    /*Internal Campaigns*/
    if (!s.eVar2) {
        s.eVar2 = s.getQueryParam('icmp');
    }
    s.eVar2 = s.getValOnce(s.eVar2, 's_eVar2', 0);

    /*Copy props to eVars*/
    if (s.prop3) {
        s.eVar3 = s.prop3;
    }
    if (hasValue(s.eVar3) === false) {
        s.eVar3 = s.server;
    }
    if (s.prop7) {
        s.eVar7 = s.prop7;
    }
    if (s.prop13) {
        s.eVar13 = s.prop13;
        s.eVar13 = s.getValOnce(s.eVar13, 's_evar13', 0);
    }

    /*Account*/
    if (Object.prototype.hasOwnProperty.call(window, "userstats")) {
        s.prop8 = userstats.auth;
        s.prop9 = userstats.iplocation;
        if ((userstats.auth + "").toLowerCase() === "true") {
            s.prop10 = userstats.age;
            s.prop11 = userstats.gender;
            s.prop12 = userstats.country;
        } 
        else {
            s.prop10 = undefined;
            s.prop11 = undefined;
            s.prop12 = undefined;
        }
    }
    if (s.prop8)  { s.eVar8  = "D=c8";  }
    if (s.prop9)  { s.eVar9  = "D=c9";  }
    if (s.prop10) { s.eVar10 = "D=c10"; }
    if (s.prop11) { s.eVar11 = "D=c11"; }
    if (s.prop12) { s.eVar12 = "D=c12"; }
    
    /*Campaign Stacking*/
    s.eVar17 = s.crossVisitParticipation(s.campaign, 's_ev17', '30', '5', '>', 'purchase', 1);

    /*getCartOpen 1.1*/
    s.events = s.getCartOpen("s_scOpen");

    /* Site Search */
    if (s.prop17) {
        s.prop17 = s.prop17.toLowerCase();
        s.eVar19 = s.prop17;
        t_search = s.getValOnce(s.eVar19, 'ev19', 0);
        if (t_search) {
            s.events = s.apl(s.events, "event3", ",", 2);
        }
    }

    /*Campaign Pathing*/
    s.prop19 = s.getAndPersistValue(s.campaign, 's_cp_persist', 0);

    if (s.prop19) {
        s.prop20 = s.prop19 + ' : ' + s.pageName;
    }

    /*ChannelManager*/
    s.channelManager('CMP,HQS,KAC', '', '', '1', 'c_dl');
    s._channelPattern = 'Paid Search|KAC>Email|EMC>Affiliate|AFC';
    s._channelDomain = "Social Media|facebook.com,twitter.com,linkedin.com,myspace.com";

    /*Rename Channels*/
    if (s._channel == "Direct Load") s._channel = "Typed/Bookmarked";
    if (s._channel == "Natural Search") s._channel = "Search Engines - Natural";
    if (s._channel == "Paid Search") s._channel = "Search Engines - Paid";
    if (s._channel == "Referrers") s._channel = "Other Websites";
    if (s._channel == "Paid Non-Search") s._channel = "Paid - Typed/Bookmarked";
    if (s._referringDomain == "Direct Load") s._referringDomain = "Typed/Bookmarked";

    /*Traffic Sources*/
    s.eVar22 = s._channel;
    s.prop22 = s.getAndPersistValue(s.eVar22, 's_v22_persist', 0);

    s.eVar23 = s._partner;
    s.prop23 = s.getAndPersistValue(s.eVar23, 's_v23_persist', 0);

    s.eVar24 = s._keywords;
    s.prop24 = s.getAndPersistValue(s.eVar24, 's_v24_persist', 0);

    s.eVar25 = s._referringDomain;
    s.prop25 = s.getAndPersistValue(s.eVar25, 's_v25_persist', 0);

    /*Apply business logic rules*/
    if (s.hasOwnProperty("_businessLogicDoPlugins")) {
        s._businessLogicDoPlugins(s);
    }
}
s.doPlugins = s_doPlugins;
/************************** PLUGINS SECTION *************************/
/*
* channelManager v2.4 - Tracking External Traffic
*/
s.channelManager = new Function("a", "b", "c", "d", "e", "f", ""
+ "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+ "X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+ "e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"
+ "rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"
+ "ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"
+ "nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"
+ "l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"
+ "Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"
+ ",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"
+ "chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"
+ "=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"
+ "D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"
+ "G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("
+ "k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"
+ "=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"
+ "=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"
+ ");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"
+ "aid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Sea"
+ "rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct Load'}X=M+u+t;c=c?c:'c_m';"
+ "if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"
+ "plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+ "it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"
+ "=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"
+ "plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
+ "it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"
+ "(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"
+ "h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"
+ "th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."
+ "indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"
+ "';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"
+ "ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"
+ "ign=u;s._keywords=M;s._channel=P");
/* Top 294 Search Engines */
s.seList = "search`|qu|7search.com>194.231.30.245,abacho`|q|Abacho.com>search.a"
+ "bout`|terms|About.com>alltheweb`|query,q|All The Web>altavista.co|q"
+ ",r|AltaVista>ca.altavista`|q|AltaVista#Canada>dk.altavista`|q|AltaV"
+ "ista#Denmark>fr.altavista`|q,r|AltaVista#France>it.altavista`|q,r|A"
+ "ltaVista#Italy>nl.altavista`|q|AltaVista#Netherlands>no.altavista`|"
+ "q|AltaVista#Norway>es.altavista`|q,r|AltaVista#Spain>se.altavista`|"
+ "q,r|AltaVista#Sweden>ch.altavista`|q,r|AltaVista#Switzerland>uk.alt"
+ "avista`|q,r|AltaVista#United Kingdom>aol.fr|q|AOL#France>suche.aol."
+ "de,suche.aolsvc.de|q|AOL#Germany>aol.co.uk,search.aol.co.uk|query|A"
+ "OL#United Kingdom>search.aol`,search.aol.ca|query,q|AOL.com Search>"
+ "aport.ru|r|Aport>ask`,ask.co.uk|ask,q|Ask Jeeves>www.baidu`|wd,word"
+ "|Baidu>www.baidu.jp|wd,word|Baidu Japan>search.biglobe.ne.jp|q|Bigl"
+ "obe>business`/search|query|Business.com>centrum.cz|q|Centrum.cz>cli"
+ "x.pt|question|Clix>cuil`|q|Cuil>daum.net,search.daum.net|q|Daum>Dic"
+ "tionary`,Dictionary|term,query,q|Dictionary.com>directhit`|qry,q|Di"
+ "rectHit>eniro.dk|search_word|Eniro>eniro.fi|search_word|Eniro#Finla"
+ "nd>eniro.se|search_word|Eniro#Sweden>euroseek`|query,string|Eurosee"
+ "k>excite.fr|search,q|Excite#France>excite.co.jp|search,s|Excite#Jap"
+ "an>fireball.de|q,query|Fireball>search.fresheye`|ord,kw|FreshEye>go"
+ "o.ne.jp|MT|Goo (Jp.)>g%.co,g%syndication`|q,*|G%>g%`.af|q,*|G%#Afgh"
+ "anistan>g%.as|q,*|G%#American Samoa>g%`.ai|q,*|G%#Anguilla>g%`.ag|q"
+ ",*|G%#Antigua and Barbuda>g%`.ar|q,*|G%#Argentina>g%.am|q,*|G%#Arme"
+ "nia>g%`.au|q,*|G%#Australia>g%.at|q,*|G%#Austria>g%.az|q,*|G%#Azerb"
+ "aijan>g%`.bh|q,*|G%#Bahrain>g%`.bd|q,*|G%#Bangladesh>g%`.by|q,*|G%#"
+ "Belarus>g%.be|q,*|G%#Belgium>g%`.bz|q,*|G%#Belize>g%`.bo|q,*|G%#Bol"
+ "ivia>g%.ba|q,*|G%#Bosnia-Hercegovina>g%.co.bw|q,*|G%#Botswana>g%`.b"
+ "r|q,*|G%#Brasil>g%.vg|q,*|G%#British Virgin Islands>g%`.bn|q,*|G%#B"
+ "runei>g%.bg|q,*|G%#Bulgaria>g%.bi|q,*|G%#Burundi>g%`.kh|q,*|G%#Camb"
+ "odia>g%.ca|q,*|G%#Canada>g%.cl|q,*|G%#Chile>g%.cn|q,*|G%#China>g%`."
+ "co|q,*|G%#Colombia>g%.co.ck|q,*|G%#Cook Islands>g%.co.cr|q,*|G%#Cos"
+ "ta Rica>g%.ci|q,*|G%#Cote D\'Ivoire>g%.hr|q,*|G%#Croatia>g%`.cu|q,*"
+ "|G%#Cuba>g%.cz|q,*|G%#Czech Republic>g%.dk|q,*|G%#Denmark>g%.dj|q,*"
+ "|G%#Djibouti>g%.dm|q,*|G%#Dominica>g%`.do|q,*|G%#Dominican Republic"
+ ">g%`.ec|q,*|G%#Ecuador>g%`.eg|q,*|G%#Egypt>g%`.sv|q,*|G%#El Salvado"
+ "r>g%.ee|q,*|G%#Estonia>g%`.et|q,*|G%#Ethiopia>g%`.fj|q,*|G%#Fiji>g%"
+ ".fi|q,*|G%#Finland>g%.fr|q,*|G%#France>g%.de|q,*|G%#Germany>g%.gr|q"
+ ",*|G%#Greece>g%.gl|q,*|G%#Greenland>g%.gp|q,*|G%#Guadeloupe>g%`.gt|"
+ "q,*|G%#Guatemala>g%.gg|q,*|G%#Guernsey>g%.gy|q,*|G%#Guyana>g%.ht|q,"
+ "*|G%#Haiti>g%.hn|q,*|G%#Honduras>g%`.hk|q,*|G%#Hong Kong>g%.hu|q,*|"
+ "G%#Hungary>g%.co.in|q,*|G%#India>g%.co.id|q,*|G%#Indonesia>g%.ie|q,"
+ "*|G%#Ireland>g%.is|q,*|G%#Island>g%`.gi|q,*|G%#Isle of Gibraltar>g%"
+ ".im|q,*|G%#Isle of Man>g%.co.il|q,*|G%#Israel>g%.it|q,*|G%#Italy>g%"
+ "`.jm|q,*|G%#Jamaica>g%.co.jp|q,*|G%#Japan>g%.je|q,*|G%#Jersey>g%.jo"
+ "|q,*|G%#Jordan>g%.kz|q,*|G%#Kazakhstan>g%.co.ke|q,*|G%#Kenya>g%.ki|"
+ "q,*|G%#Kiribati>g%.co.kr|q,*|G%#Korea>g%.kg|q,*|G%#Kyrgyzstan>g%.la"
+ "|q,*|G%#Laos>g%.lv|q,*|G%#Latvia>g%.co.ls|q,*|G%#Lesotho>g%`.ly|q,*"
+ "|G%#Libya>g%.li|q,*|G%#Liechtenstein>g%.lt|q,*|G%#Lithuania>g%.lu|q"
+ ",*|G%#Luxembourg>g%.mw|q,*|G%#Malawi>g%`.my|q,*|G%#Malaysia>g%.mv|q"
+ ",*|G%#Maldives>g%`.mt|q,*|G%#Malta>g%.mu|q,*|G%#Mauritius>g%`.mx|q,"
+ "*|G%#Mexico>g%.fm|q,*|G%#Micronesia>g%.md|q,*|G%#Moldova>g%.mn|q,*|"
+ "G%#Mongolia>g%.ms|q,*|G%#Montserrat>g%.co.ma|q,*|G%#Morocco>g%`.na|"
+ "q,*|G%#Namibia>g%.nr|q,*|G%#Nauru>g%`.np|q,*|G%#Nepal>g%.nl|q,*|G%#"
+ "Netherlands>g%.co.nz|q,*|G%#New Zealand>g%`.ni|q,*|G%#Nicaragua>g%`"
+ ".ng|q,*|G%#Nigeria>g%.nu|q,*|G%#Niue>g%`.nf|q,*|G%#Norfolk Island>g"
+ "%.no|q,*|G%#Norway>g%`.om|q,*|G%#Oman>g%`.pk|q,*|G%#Pakistan>g%`.pa"
+ "|q,*|G%#Panama>g%`.py|q,*|G%#Paraguay>g%`.pe|q,*|G%#Peru>g%`.ph|q,*"
+ "|G%#Philippines>g%.pn|q,*|G%#Pitcairn Islands>g%.pl|q,*|G%#Poland>g"
+ "%.pt|q,*|G%#Portugal>g%`.pr|q,*|G%#Puerto Rico>g%`.qa|q,*|G%#Qatar>"
+ "g%.cd|q,*|G%#Rep. Dem. du Congo>g%.cg|q,*|G%#Rep. du Congo>g%.ge|q,"
+ "*|G%#Repulic of Georgia>g%.ro|q,*|G%#Romania>g%.ru|q,*|G%#Russia>g%"
+ ".rw|q,*|G%#Rwanda>g%.sh|q,*|G%#Saint Helena>g%`.vc|q,*|G%#Saint Vin"
+ "cent and the Grenadine>g%.ws|q,*|G%#Samoa>g%.sm|q,*|G%#San Marino>g"
+ "%.st|q,*|G%#Sao Tome and Principe>g%`.sa|q,*|G%#Saudi Arabia>g%.sn|"
+ "q,*|G%#Senegal>g%.sc|q,*|G%#Seychelles>g%`.sg|q,*|G%#Singapore>g%.s"
+ "k|q,*|G%#Slovakia>g%.si|q,*|G%#Slovenia>g%`.sb|q,*|G%#Solomon Islan"
+ "ds>g%.co.za|q,*|G%#South Africa>g%.es|q,*|G%#Spain>g%.lk|q,*|G%#Sri"
+ " Lanka>g%.se|q,*|G%#Sweden>g%.ch|q,*|G%#Switzerland>g%`.tw|q,*|G%#T"
+ "aiwan>g%`.tj|q,*|G%#Tajikistan>g%.co.th|q,*|G%#Thailand>g%.bs|q,*|G"
+ "%#The Bahamas>g%.gm|q,*|G%#The Gambia>g%.tk|q,*|G%#Tokelau>g%.to|q,"
+ "*|G%#Tonga>g%.tt|q,*|G%#Trinidad and Tobago>g%`.tr|q,*|G%#Turkey>g%"
+ ".tm|q,*|G%#Turkmenistan>g%.co.ug|q,*|G%#Uganda>g%`.ua|q,*|G%#Ukrain"
+ "e>g%.ae|q,*|G%#United Arab Emirates>g%.co.uk|q,*|G%#United Kingdom>"
+ "g%`.uy|q,*|G%#Uruguay>g%.co.uz|q,*|G%#Uzbekiston>g%.vu|q,*|G%#Vanua"
+ "tu>g%.co.ve|q,*|G%#Venezuela>g%`.vn|q,*|G%#Viet Nam>g%.co.vi|q,*|G%"
+ "#Virgin Islands>g%.co.zm|q,*|G%#Zambia>g%.co.zw|q,*|G%#Zimbabwe>his"
+ "pavista`|cadena|HispaVista>icqit`|q|icq>www.ilse.nl|SEARCH_FOR,sear"
+ "ch_for|Ilse>infoseek.co.jp|qt|Infoseek#Japan>ixquick`|query|ixquick"
+ ">kvasir.no|q,searchExpr|Kvasir>arianna.libero.it|query|Libero-Ricer"
+ "ca>linkopedia`|query|Linkopedia>bing`|q|Microsoft Bing>search.lived"
+ "oor`|q|Livedoor.com>www.lycos`,search.lycos`|query|Lycos>lycos.fr|q"
+ "uery|Lycos#France>lycol.de,search.lycos.de|query|Lycos#Germany>lyco"
+ "s.it|query|Lycos#Italy>lycos.es|query|Lycos#Spain>lycos.co.uk|query"
+ "|Lycos#United Kingdom>mail.ru/search,go.mail.ru/search|q|Mail.ru>bi"
+ "ng`|q|Microsoft Bing>myway`|searchfor|MyWay.com>nate`,search.nate`|"
+ "query|Nate.com>naver`,search.naver`|query|Naver>netscape`|query,sea"
+ "rch|Netscape Search>search.nifty`|q|Nifty>odn.excite.co.jp|search|O"
+ "DN>dmoz.org|search|Open Directory Project>ozu.es|q|Ozu>rambler.ru/s"
+ "rch|words|Rambler>reference`|q|Reference.com>search.ch|q|Search.ch>"
+ "searchalot`|query,q|Searchalot>searchit`|query,keywords|SearchIt>se"
+ "nsis`.au|find|Sensis.com.au>seznam|w|Seznam.cz>g%.sina`.tw|kw|Sina#"
+ "Taiwan>starmedia`|q|Starmedia>abcsok.no|q|Startsiden>suche.ch|q|Suc"
+ "he.ch>teoma`|q|Teoma>terra.es|query|Terra>tiscali.it|key|Tiscali>to"
+ "ile`|query,q|Toile du Quebec>busca.uol`.br|q|UOL Busca>usseek`|stri"
+ "ng|Usseek>vinden.nl|query|Vinden>vindex.nl|search_for|Vindex>virgil"
+ "io.it|qs|Virgilio>voila.fr|kw|Voila>walla.co.il|q|Walla>web.de|su|W"
+ "eb.de>webalta.ru|q|Webalta>wp.pl|szukaj|Wirtualna Polska>woyaa`|que"
+ "ry|WoYaa>y^`,search.y^`|p|Y^!>ar.y^`,ar.search.y^`|p|Y^!#Argentina>"
+ "asia.y^`,asia.search.y^`|p|Y^!#Asia>au.y^`,au.search.y^`|p|Y^!#Aust"
+ "ralia>at.search.y^`|p|Y^!#Austria>br.y^`,br.search.y^`|p|Y^!#Brazil"
+ ">ca.y^`,ca.search.y^`|p|Y^!#Canada>cn.y^`,search.cn.y^`|p|Y^!#China"
+ ">dk.y^`,dk.search.y^`|p|Y^!#Denmark>fi.search.y^`|p|Y^!#Finland>fr."
+ "y^`,fr.search.y^`|p|Y^!#France>de.y^`,de.search.y^`|p|Y^!#Germany>h"
+ "k.y^`,hk.search.y^`|p|Y^!#Hong Kong>in.y^`,in.search.y^`|p|Y^!#Indi"
+ "a>id.y^`,id.search.y^`|p|Y^!#Indonesia>it.y^`,it.search.y^`|p|Y^!#I"
+ "taly>y^.co.jp,search.y^.co.jp|p,va|Y^!#Japan>kids.y^`,kids.y^`/sear"
+ "ch|p|Y^!#Kids>kr.y^`,kr.search.y^`|p|Y^!#Korea>malaysia.y^`,malaysi"
+ "a.search.y^`|p|Y^!#Malaysia>mx.y^`,mx.search.y^`|p|Y^!#Mexico>nl.y^"
+ "`,nl.search.y^`|p|Y^!#Netherlands>nz.y^`,nz.search.y^`|p|Y^!#New Ze"
+ "aland>no.y^`,no.search.y^`|p|Y^!#Norway>ph.y^`,ph.search.y^`|p|Y^!#"
+ "Philippines>ru.y^`,ru.search.y^`|p|Y^!#Russia>sg.y^`,sg.search.y^`|"
+ "p|Y^!#Singapore>es.y^`,es.search.y^`|p|Y^!#Spain>telemundo.y^`,espa"
+ "nol.search.y^`|p|Y^!#Spanish (US : Telemundo)>se.y^`,se.search.y^`|"
+ "p|Y^!#Sweden>ch.search.y^`|p|Y^!#Switzerland>tw.y^`,tw.search.y^`|p"
+ "|Y^!#Taiwan>th.y^`,th.search.y^`|p|Y^!#Thailand>uk.y^`,uk.search.y^"
+ "`|p|Y^!#UK and Ireland>vn.y^`,vn.search.y^`|p|Y^!#Viet Nam>yandex|t"
+ "ext|Yandex.ru>zbozi.cz|q|Zbozi.cz>www.zoek.nl|query,q|Zoek>www.zoek"
+ "en.nl/|query|zoeken.nl>search.cnn.com|query|CNN Web Search>search.e"
+ "arthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search"
+ ">search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
* Plugin Utility: Replace v1.0
*/
s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
* Plugin: getAndPersistValue 0.3 - get a value on every page
*/
s.getAndPersistValue = new Function("v", "c", "e", ""
+ "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+ "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
/*
* Plugin: getQueryParam 2.3
*/
s.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+ "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return ''");
/*
* Plugin: getValOnce 0.2 - get a value once per session or number of days
*/
s.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");
/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
* Function - read combined cookies v 0.2
*/
s.c_rr = s.c_r;
s.c_r = new Function("k", ""
+ "var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+ "urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+ "c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+ ",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+ "m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+ "Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+ "urn v;");
/*
* Function - write combined cookies v 0.2
*/
s.c_wr = s.c_w;
s.c_w = new Function("k", "v", "e", ""
+ "var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+ "c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+ ".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+ "ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+ ".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+ "ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+ "{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+ "='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+ ".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+ "ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+ "Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");
/*
* Plug-in: crossVisitParticipation v1.4
*/
s.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", ""
+ "var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+ " ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+ "ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+ "f(!v||v=='')return '';v=escape(v);var arry=new Array(),a=new Array("
+ "),c=s.c_r(cn),g=0,h=new Array();if(c&&c!='')arry=eval(c);var e=new "
+ "Date();e.setFullYear(e.getFullYear()+5);if(dv==0 && arry.length>0 &"
+ "& arry[arry.length-1][0]==v)arry[arry.length-1]=[v, new Date().getT"
+ "ime()];else arry[arry.length]=[v, new Date().getTime()];var start=a"
+ "rry.length-ct<0?0:arry.length-ct;var td=new Date();for(var x=start;"
+ "x<arry.length;x++){var diff=Math.round((td.getTime()-arry[x][1])/86"
+ "400000);if(diff<ex){h[g]=unescape(arry[x][0]);a[g]=[arry[x][0],arry"
+ "[x][1]];g++;}}var data=s.join(a,{delim:',',front:'[',back:']',wrap:"
+ "\"'\"});s.c_w(cn,data,e);var r=s.join(h,{delim:dl});if(ce) s.c_w(cn"
+ ",'');return r;");
s.join = new Function("v", "p", ""
+ "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
* Plugin: getCartOpen v 1.1 - returns events string with scOpen added
* the first time scAdd occurs during a visit.
*/
s.getCartOpen = new Function("c", ""
+ "var s=this,t=new Date,e=s.events?s.events:'',i=0;t.setTime(t.getTim"
+ "e()+1800000);if(s.c_r(c)||e.indexOf('scOpen')>-1){if(!s.c_w(c,1,t))"
+ "{s.c_w(c,1,0)}}else{if(e.indexOf('scAdd')>-1){if(s.c_w(c,1,t)){i=1}"
+ "else if(s.c_w(c,1,0)){i=1}}}if(i){e=e+',scOpen'}return e");

/*
* Plugin: downloadLinkHandler 0.8 - identify and report download links.
*/
s.downloadLinkHandler = new Function("p", "e", ""
+ "var s=this,o=s.p_gh(),h=o.href,n='linkDownloadFileTypes',i,t;if(!h|"
+ "|(s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n"
+ "]=p?p:t;if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return e?o:"
+ "h;");
/*
* Plugin: exitLinkHandler 0.8 - identify and report exit links.
*/
s.exitLinkHandler = new Function("p", "e", ""
+ "var s=this,o=s.p_gh(),h=o.href,n='linkInternalFilters',i,t;if(!h||("
+ "s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n]="
+ "p?p:t;h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=="
+ "'e')s.linkType='e';else h='';s[n]=t;return e?o:h;");
/*
 * Plugin: linkHandler 0.8 - identify and report custom links.
 */
s.linkHandler = new Function("p","t","e",""
+ "var s=this,o=s.p_gh(),h=o.href,i,l;t=t?t:'o';if(!h||(s.linkType&&(h"
+ "||s.linkName)))return'';i=h.indexOf('?');h=s.linkLeaveQueryString||"
+ "i<0?h:h.substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s"
+ ".linkName=l=='[['?'':l;s.linkType=t;return e?o:h;}return'';");
/*
* Helper functions for the downloadLinkHandler, exitLinkHandler and linkHandler plugins.
*/
s.p_gh = new Function("", ""
+ "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+ "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+ "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+ "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.p_gn = new Function("t", "h", ""
+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+ "return 0;");

/* Configure Modules and Plugins */

s.loadModule("Media");
s.Media.autoTrack = true;
s.Media.trackWhilePlaying = true;
s.Media.trackVars = "None";
s.Media.trackEvents = "None";

s.Media.trackMilestones = "25,50,75";
s.Media.playerName = "My Media Player";
s.Media.segmentByMilestones = true;
s.Media.trackUsingContextData = true;
s.Media.contextDataMapping = {
    "a.media.name": "eVar31,prop31",
    "a.media.segment": "eVar32",
    "a.contentType": "eVar33",
    "a.media.timePlayed": "event43",
    "a.media.view": "event41",
    "a.media.segmentView": "event42",
    "a.media.complete": "event47",
    "a.media.milestones": {
        25: "event44",
        50: "event45",
        75: "event46"
    }
};

s.Media.monitor = function (s, media) {
    s._trackCallType = "MediaHit";
    if (media.mediaEvent === "OPEN" || media.mediaEvent === "MILESTONE") {
        s.eVar38 = media.length;
        s.events = "event61=" + media.length;
        if (s.hasOwnProperty("_businessLogicDoPlugins")) {
            s._businessLogicDoPlugins(s);
        }
        s.Media.trackVars = "events,eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar12,eVar26,eVar27,eVar31,prop31,eVar32,eVar33,eVar38,eVar47,eVar50,eVar52";
        s.Media.trackEvents = "event41,event42,event43,event44,event45,event46,event47,event62";
        s.Media.track(media.name);
        s.eVar38 = "";
        s.events = "";
    }
};

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "lego"; // "legov15";
s.dc = "d1"

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c = "var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+ "this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+ "if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+ ".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.co=0;i.cot=0;i.lm=0;i.lom=0;m.l[n]=i}};m._delete=function(n){var"
+ " m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new Object;"
+ "i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.complete=function(n,o){th"
+ "is.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c=vo.context"
+ "Data,x;c['a.contentType']='video';c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns"
+ "+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i"
+ ".lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x i"
+ "n d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]="
+ "c[x]}else if(y){if(y=='view'||y=='segmentView'||y=='complete'||y=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events"
+ "2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,"
+ "x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){v"
+ "ar m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.fl"
+ "oor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvent"
+ "s,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;n=m.cn(n);i=n&&m.l&&"
+ "m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name"
+ "=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP"
+ "':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'COMPLETE':('CLOSE'))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i"
+ ".lo=o;if((x<=3||x==5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i"
+ ".l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z"
+ ".length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat('"
+ "'+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if("
+ "c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-"
+ "i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||i.x>"
+ "=100){x=0;m.e(n,2,-1,0,0,-1,pd);v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m.completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}e"
+ "k=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePl"
+ "ayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo"
+ ".linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx="
+ "sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthReq"
+ "uired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,x"
+ "c=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s"
+ "_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.curre"
+ "ntMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o'"
+ ",'var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-"
+ "1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}"
+ "';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateC"
+ "hange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()"
+ "?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+"
+ "';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l"
+ ",\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '"
+ "+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if"
+ "(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'"
+ "+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)"
+ "\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTag"
+ "Name(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,fal"
+ "se);if(m.onLoad)m.onLoad(s,m)";
s.m_i("Media");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.trackingServer = "lego.112.2o7.net";  //"legov15.d1.sc.omtrdc.net";

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code = '', s_objectID; function s_gi(un, pg, ss) {
    var c = "s.version='H.24.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+ "\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+ "n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+ "<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+ "pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+ ".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+ "%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+ "{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+ "ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+ "=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+ " s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+ "fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+ "s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+ "rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+ "pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+ "(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+ "=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+ "_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+ "x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+ "r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+ "oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+ "s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+ "('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+ "ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+ "ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+ "=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+ "(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+ ".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+ "s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+ "(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+ "me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+ "=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+ "=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+ "e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+ "=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+ "bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+ "){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+ "0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+ "dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+ "v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+ "lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+ "!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+ "){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+ "if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+ "e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+ "'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+ "erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+ ".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+ "cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+ "e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+ " if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+ "='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+ "'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+ "b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+ "):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+ "indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+ "s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+ "eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+ "f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+ "){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+ "&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+ "':'')+h}return h};s.ot=function(o){var t=o.tagName;if((''+o.tagUrn)!='undefined'||((''+o.scopeName)!='undefined'&&(''+o.scopeName).toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase("
+ "):'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0"
+ ";if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'"
+ "'),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){"
+ "o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+','"
+ ")>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un"
+ ");return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){"
+ "var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)i"
+ "f(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v"
+ "+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o"
+ "=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if("
+ "s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,"
+ "s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+ "){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+ "&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+ "i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+ "n.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,"
+ "l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;"
+ "m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m"
+ "._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s"
+ "[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if"
+ "((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl"
+ ")for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]"
+ "){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o="
+ "g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.su"
+ "bstring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s="
+ "s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s"
+ ".maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o"
+ ".type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o')"
+ ";o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=fun"
+ "ction(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]="
+ "v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<"
+ "s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxD"
+ "elay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()}"
+ ";s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),v"
+ "t=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code=''"
+ ",vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.proto"
+ "type){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','"
+ "var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if"
+ "(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElem"
+ "ent.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}re"
+ "turn hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&"
+ "pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.con"
+ "nectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pa"
+ "geURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo"
+ "&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('."
+ "s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);"
+ "if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex"
+ ";if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}"
+ "if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLi"
+ "ghtProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd."
+ "s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfile"
+ "ID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagConta"
+ "inerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];"
+ "x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&ty"
+ "peof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().in"
+ "dexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var "
+ "apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.iso"
+ "pera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.ap"
+ "v=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i"
+ "=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cooki"
+ "eDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s."
+ "va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,"
+ "channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n"
+ "=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWi"
+ "dth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBuffer"
+ "edRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,lin"
+ "kDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=n"
+ "ew Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w = window, l = w.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf('MSIE '), m = u.indexOf('Netscape6/'), a, i, j, x, s; if (un) { un = un.toLowerCase(); if (l) for (j = 0; j < 2; j++) for (i = 0; i < l.length; i++) { s = l[i]; x = s._c; if ((!x || x == 's_c' || (j > 0 && x == 's_l')) && (s.oun == un || (s.fs && s.sa && s.fs(s.oun, un)))) { if (s.sa) s.sa(un); if (x == 's_c') return s } else s = 0 } } w.s_an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    w.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+ "ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    w.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    w.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
    w.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+ "=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+ "x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    w.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    w.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+ "a");
    w.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+ "f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+ "'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    c = s_d(c); if (e > 0) { a = parseInt(i = v.substring(e + 5)); if (a > 3) a = parseFloat(i) } else if (m > 0) a = parseFloat(u.substring(m + 10)); else a = parseFloat(v); if (a < 5 || v.indexOf('Opera') >= 0 || u.indexOf('Opera') >= 0) c = s_ft(c); if (!s) { s = new Object; if (!w.s_c_in) { w.s_c_il = new Array; w.s_c_in = 0 } s._il = w.s_c_il; s._in = w.s_c_in; s._il[s._in] = s; w.s_c_in++; } s._c = 's_c'; (new Function("s", "un", "pg", "ss", c))(s, un, pg, ss); return s
}
function s_giqf() { var w = window, q = w.s_giq, i, t, s; if (q) for (i = 0; i < q.length; i++) { t = q[i]; s = s_gi(t.oun); s.sa(t.un); s.setTagContainer(t.tagContainerName) } w.s_giq = 0 } s_giqf();

s.gtfsf=function(w) { if(w.location.protocol!='https:'){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs}this.tfs=w;return w };

//------------------------------------------------------------------------
// TrackingBusinessLogicInit - LEGO SPECIFIC
//------------------------------------------------------------------------
// JSLint.com - validated javascript
/*jslint browser: true, white: true, maxerr: 50, indent: 4, nomen: true */
/*global LEGOSiteStats:true, s, window, console, unescape, activatePage */
//------------------------------------------------------------------------

(function (s) {
    "use strict";
    // -------------------------------------------------------------------
    // Patch s_code with LEGO specific business logic rules & requirements
    // -------------------------------------------------------------------
    var hasValue, sObj, stCpy, stlCpy, clearSValue, restoreSValue, sanitizeTrackedVariables;
    sObj = s;
    stCpy = sObj.t;
    stlCpy = sObj.tl;
    hasValue = function (v) {
        return (v !== undefined && v !== null && v !== "");
    };
    clearSValue = function (s, key, forIl) {
        // Copy current s value in s[key] into a shadow value, and then clear the value from the s object. Also copy for s._il state array if specified.
        var i;
        if (hasValue(s[key])) {
            s["_cpy" + key] = s[key];
            s[key] = "";
            if (forIl === true) {
                for (i = 0; i < s._il.length; i = i + 1) {
                    if (hasValue(s._il[i][key])) {
                        s["_cpy_il" + i + key] = s._il[i][key];
                        s._il[i][key] = "";
                    }
                }
            }
        }
    };
    restoreSValue = function (s, key, forIl) {
        // Restore shadow value for key (if found) into s[key], and then delete the shadow copy. Also restore for s._il state array if specified.
        var i;
        if (!hasValue(s[key]) && hasValue(s["_cpy" + key])) {
            s[key] = s["_cpy" + key];
            //s["_cpy" + key] = undefined;
            if (forIl === true) {
                for (i = 0; i < s._il.length; i = i + 1) {
                    if (hasValue(s["_cpy_il" + i + key])) {
                        s._il[i][key] = s["_cpy_il" + i + key];
                        //s["_cpy_il" + i + key] = undefined;
                    }
                }
            }
        }
        // Set new tracked value to cpy value
        s["_cpy" + key] = s[key];
        if (forIl === true) s["_cpy_il" + key] = s[key];
    };
    sanitizeTrackedVariables = function (s, func) {
        // Generic wrapper for clearSValue and restoreSValue.
        //console.group("before");
        //console.log("pageName:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.pageName, s._cpypageName, s.eVar26);
        //console.log("channel:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.channel, s._cpychannel, s.eVar27);
        //console.groupEnd();
        var propIdx;
        if (func !== null) {
            func.apply(s, [s, "pageName", true]);
            func.apply(s, [s, "server", true]);
            func.apply(s, [s, "channel", true]);
            for (propIdx = 1; propIdx <= 75; propIdx = propIdx + 1) {
                // Some props are not to be removed on linkhits
                if (!(propIdx === 14 || propIdx === 15 || propIdx === 16 || propIdx === 26 || propIdx === 50 || propIdx === 53 || propIdx === 54 || propIdx === 55)) {
                    func.apply(s, [s, "prop" + propIdx, false]);
                }
            }
        }
        //console.group("after");
        //console.log("pageName:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.pageName, s._cpypageName, s.eVar26);
        //console.log("channel:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.channel, s._cpychannel, s.eVar27);
        //console.groupEnd();
    };
    sObj._trackCallType = "";
    sObj.t = function () {
        if (this._trackCallType === "LinkHit") {
            // Expected s.t call following s.tl call (link hit)
            this._trackCallType = "PageHit-LinkHit";
        } else if (this._trackCallType === "MediaHit") {
            // Expected s.t call following s.Media.track call (media hit)
            this._trackCallType = "PageHit-MediaHit";
            // If media hits must track as pagehits, remove this if-block
        } else {
            // Regular s.t call (page hit)
            this._trackCallType = "PageHit";
        }
        return stCpy.apply(this, arguments);
    };
    sObj.tl = function () {
        this._trackCallType = "LinkHit";
        return stlCpy.apply(this, arguments);
    };
    sObj._businessLogicDoPlugins = function (s) {
        /*
        ** Business Rules to always enforce
        ** --------------------------------
        */
        // General rules goes here...

        // Make sure the s object cannot be re-initialized (made empty / invalid)
        s_gi = function () { return s; };

        // Always track eVar20 with the last added productNo if event 8,28,53 or 54 is fired
        var getLastProductNo, evList, downloadLink, exitLinkObject, pathElements, hotfix31012013;
        getLastProductNo = function (s) { var pA = (";;;;," + s.products).split(","); return pA[pA.length - 1].split(";")[1]; };
        evList = "," + s.events + ",";
        if (evList.indexOf("event8") > 0 || evList.indexOf("event28") > 0 || evList.indexOf("event53") > 0 || evList.indexOf("event54") > 0) {
            if (hasValue(s.eVar20) === false) {
                s.eVar20 = getLastProductNo(s);
            }
        }

        // Download handler, enable eVar tracking
        downloadLink = s.downloadLinkHandler(s.linkDownloadFileTypes);
        if (downloadLink) {
            s.linkTrackVars = LEGOSiteStats.GetDefaultLinkTrackingVars();
            s.linkTrackEvents = "";
            s._trackCallType = "DownloadLink";
        }

        // Exit link handler, enable eVar tracking
        exitLinkObject = s.exitLinkHandler("", "true");
        if (exitLinkObject) {
            s.linkTrackVars = LEGOSiteStats.GetDefaultLinkTrackingVars();
            s.linkTrackEvents = "";
            s._trackCallType = "ExitLink";
        }

        // Set internal search keywords and user location to lower case
        if (s.prop9) { s.prop9 = s.prop9.toUpperCase(); }
        if (s.eVar9) { s.eVar9 = s.eVar9.toUpperCase(); }
        if (s.prop24) { s.prop24 = s.prop24.toLowerCase(); }
        if (s.eVar24) { s.eVar24 = s.eVar24.toLowerCase(); }
        if (s.prop13) { s.prop13 = s.prop13.toLowerCase(); }
        if (s.eVar13) { s.eVar13 = s.eVar13.toLowerCase(); }

        // LEGO API/Interface type tracking
        s.prop50 = LEGOSiteStats.GetSCodeVersion();
        s.eVar50 = "D=c50";

        // Settings path information based on PageName
        pathElements = s.pageName.split(':');
        s.pageName = pathElements.join(':');
        s.channel = (pathElements.length > 2) ? pathElements.slice(0, 2).join(':') : undefined;
        s.eVar4 = s.prop4 = (pathElements.length > 3) ? pathElements.slice(0, 3).join(':') : undefined;
        s.eVar5 = s.prop5 = (pathElements.length > 4) ? pathElements.slice(0, 4).join(':') : undefined;
        s.eVar6 = s.prop6 = (pathElements.length > 5) ? pathElements.slice(0, 5).join(':') : undefined;

        hotfix31012013 = function (s) { 
            // Hotfix - live release 31-01-2013 - fix missing call to AjaxPageStats on various ajax navigation sites
            var applyHotfix = function (s, v) {
                if (s[v] !== undefined && s[v][0] === ":" && s.eVar3 !== undefined && s.eVar3 !== "") {
                    s[v] = s.eVar3 + s[v];
                }
            };
            applyHotfix(s, "channel");
            applyHotfix(s, "pageName");
            applyHotfix(s, "eVar26");
            applyHotfix(s, "prop4");
            applyHotfix(s, "eVar4");
            applyHotfix(s, "prop5");
            applyHotfix(s, "eVar5");
            applyHotfix(s, "prop6");
            applyHotfix(s, "eVar6");
            applyHotfix(s, "eVar27");
        };

        /*
        ** Business Rules specific for a link type
        ** ---------------------------------------
        */
        //console.group(s._trackCallType);
        if (hasValue(s._trackCallType)) {
            if (s._trackCallType === "PageHit") {
                /*
                ** Rules to enforce for page hits only
                ** -----------------------------------
                */
                //console.log("restore");
                sanitizeTrackedVariables(s, restoreSValue);
                hotfix31012013(s);
                s.eVar26 = s.pageName;
                s.eVar27 = s.channel;
            } else /*if (s._trackCallType === "PageHit-LinkHit" || s._trackCallType === "DownloadLink" || s._trackCallType === "ExitLink" || s._trackCallType === "MediaHit" || s._trackCallType === "PageHit-MediaHit")*/ {
                /*
                **  Rules to enforce for link hits and download links
                ** --------------------------------------------------
                */

                //console.log("restore");
                sanitizeTrackedVariables(s, restoreSValue);
                hotfix31012013(s);
                s.eVar26 = s.pageName;
                s.eVar27 = s.channel;

                // Enrich media name on mediahits
                if ((s._trackCallType === "MediaHit" || s._trackCallType === "PageHit-MediaHit")) {
                    if (hasValue(s.eVar31) && hasValue(s.eVar27) && s.eVar31.indexOf(s.eVar27 + ":") < 0) {
                        s.eVar31 = s.eVar27 + ":" + s.eVar31;
                    }
                    s.prop31 = s.eVar31;
                }

                // Undo any dynamic variable bindings 
                if (s.prop8) { s.eVar8 = s.prop8; }
                if (s.prop9) { s.eVar9 = s.prop9; }
                if (s.prop10) { s.eVar10 = s.prop10; }
                if (s.prop11) { s.eVar11 = s.prop11; }
                if (s.prop12) { s.eVar12 = s.prop12; }
                s.eVar50 = s.prop50;

                //console.log("clear");

                sanitizeTrackedVariables(s, clearSValue);

                if (s.hasOwnProperty("linkTrackVars") === false || s.linkTrackVars === null || s.linkTrackVars === "" || s.linkTrackVars === "None") {
                    s.linkTrackVars = LEGOSiteStats.GetDefaultLinkTrackingVars();
                }
            }
        }

        /*
        ** Business Rules Verification
        ** ---------------------------
        */
        LEGOSiteStats.TrackingVerification.verifyEVars();

        //console.group("tracked");
        //console.log("pageName:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.pageName, s._cpypageName, s.eVar26);
        //console.log("channel:\n  val=%s,\n  cpy=%s,\n  evar=%s", s.channel, s._cpychannel, s.eVar27);
        //console.groupEnd();
        //console.groupEnd(); //_trackCallType
    };
} (s));
