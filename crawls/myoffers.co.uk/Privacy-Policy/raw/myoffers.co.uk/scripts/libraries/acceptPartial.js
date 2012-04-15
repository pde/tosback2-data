jQuery(document).ready(function () {
    var $dv = $('div.questionnaire-container');
    $dv.delegate('input:text', 'change, blur', function () { acceptPartial(this); });
    $dv.find('input:radio').bind('click', function () { acceptPartial(this); }).bind('click', function () { this.onblur(); });
    $dv.find('input:checkbox').bind('click', function () { acceptPartial(this); }).bind('click', function () { this.onblur(); });
    var $selects = $('select', $dv).bind('change', function () { acceptPartial(this); });
});

function acceptPartial(ctrl) {
    var hiddenUID = $("input[id$=hiddenUID]")[0];
    var userId = hiddenUID.value;
    var hiddenVID = $("input[id$=hiddenVID]")[0];
    var visitId = hiddenVID.value;

    var thisData = "{'userId':'" + userId + "','ctrlId':'" + ctrl.id + "'";

    if (ctrl.type == 'checkbox' || ctrl.type == 'radio') {
        if (ctrl.checked != null) {
            thisData = thisData + ",'checkedValue':'" + (ctrl.checked ? "1" : "0") + "'";
        }
        else {
            thisData = thisData + ",'checkedValue':'0'";
        }
        thisData = thisData + ",'answerText':'" + ctrl.value + "'";
    } else if (ctrl.type == 'text') {
        var hf = $(ctrl).parent().find(':hidden')[0];
        thisData = thisData + ",'checkedValue':'" + hf.value + "'";
        thisData = thisData + ",'answerText':'" + ctrl.value + "'";
    } else {
        thisData = thisData + ",'checkedValue':'na'";
        thisData = thisData + ",'answerText':'" + ctrl.value + "'";
    }

    thisData = thisData + ",'visitId':'" + visitId + "','ctrlType':'" + ctrl.type + "'}";

    var url = "/questionnaire.aspx/PageMethod_AcceptPartial";

    callPageMethod(url, thisData);
}

function callPageMethod(url, thisData) {
    var spliturl = window.location.pathname.split('/');
    if (spliturl[1].toLowerCase() == 'myoffers') {
        url = "/myoffers" + url;
    }

    if (url.indexOf("/") == -1) {
        url = location.pathname + "/" + url
    }
    if (jQuery.isFunction(thisData)) {
        callback = thisData;
        data = "{}";
    }
    $.ajax({
        type: "POST",
        url: url,
        data: thisData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: null
    });
}