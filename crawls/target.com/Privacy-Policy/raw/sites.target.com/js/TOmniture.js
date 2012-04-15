/*
 * Omniture implementation
 * @author:Murali
 *
 * */
var id = ["breadcrumb", "breadcrumbs", "sl_header_breadcrumb_copy", "breadcrumbTbl", "breadcrumb2", "divBreadcrumbs", "amazonTabHeaderBG"];
var idChild = ["globalCrumbLink"];
var obj;

function setOmniture() {
    for (i = 0; i <= (id.length - 1); i++) {
        if ($("#" + id[i]).html() != null || $("." + id[i]).html() != null) {
            obj = ($("#" + id[i]).html() != null) ? $("#" + id[i]) : $("." + id[i]);
            getOmniture(id[i]);
            return;
        }
    }
    for (i = 0; i <= (idChild.length - 1); i++) {
        if ($("#" + idChild[i]).html() != null || $("." + idChild[i]).html() != null) {
            obj = ($("#" + idChild[i]).parent().html() != null) ? $("#" + idChild[i]) : $("." + idChild[i]);
            obj = obj.parent();
            getOmniture(id[i]);
            return;
        }
    }
    getOmniture();
}

function getOmniture(getId) {
    var data = "";
    if (getId == "breadcrumb") {
        data = (typeof (obj) != 'undefined') ? $(obj).find("span:not('.screen-reader-only')").text() : $("title:first").html();
        data = data.toLowerCase().split(">");
    } else {
        data = (typeof (obj) != 'undefined') ? obj.text() : $("title:first").html()
        data = data.toLowerCase().split(":");
    }
    domain = document.domain.replace(".com", "");
    if ((data.length - 1) == 0) {
        pageName = domain;
        s_formOmnitureTags(domain, pageName, 'sites level 1', domain, domain);
    } else if ((data.length - 1) == 1) {
        pageName = domain + ": " + $.trim(data[1]);
        s_formOmnitureTags(domain, pageName, 'sites level 2', (domain + ": " + $.trim(data[1])), (domain + ": " + $.trim(data[1])));
    } else if ((data.length - 1) == 2) {
        var searchStr = ($.trim(data[2]).toLowerCase() == "search results") ? $.trim(data[2]) + "(" + $("#startingAddressMain").val() + ")" : ($.trim(data[2]).toLowerCase() == "store details") ? "store details(" + location.search.split('&')[0].split('=')[1] + ")" : $.trim(data[2]);
        pageName = domain + ": " + $.trim(data[1]) + ": " + searchStr;
        s_formOmnitureTags(domain, pageName, 'sites level 3', (domain + ": " + $.trim(data[1])), (domain + ": " + $.trim(data[1]) + ": " + searchStr));
    } else {
        pageName = domain + ":" + $.trim(data[1]) + ":" + $.trim(data[2]) + ": " + $.trim(data[3]);
        s_formOmnitureTags(domain, pageName, 'sites level 4', $.trim(data[1]), (domain + ": " + $.trim(data[1]) + ": " + $.trim(data[2])), (domain + ": " + $.trim(data[1]) + ": " + $.trim(data[2]) + ": " + $.trim(data[3])));
    }
}

function dubug() {
    if (typeof (window.console) != 'undefined') {
        var varstr = ['channel', 'pageName', 'prop1', 'prop2', 'prop3']
        for (var i = 0; i <= (varstr.length - 1); i++) {
            console.log(varstr[i] + " - " + arguments[i]);
        }
    }
}

function s_formOmnitureTags(channel, pageName, prop1, prop2, prop3, prop9, prop18) {
    //s_account = "targetcomdev";
    s_account= "targetcomprod";
    s.server = "targetdev1";
    if (s.server == "targetdev1") {
        dubug(channel, pageName, prop1, prop2, prop3, prop9, prop18)
    }
    s.channel = channel || '';
    s.prop1 = prop1 || '';
    s.prop2 = prop2 || '';
    s.prop3 = prop3;
    s.pageName = pageName || '';
    s.prop9 = prop9 || '';
    s.prop18 = prop18 || 'not logged in';
    s.eVar9 = s.prop11 = '123456abc';
    if (typeof (omnitureSignInSuccess) != "undefined") {
        s.events = "event25"
    }
    var s_code = s.t();
    if (s_code) document.write(s_code);
}
$(document).ready(function () {
    setOmniture()
});