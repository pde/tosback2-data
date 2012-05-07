function Querystring(qs) {
    this.params = new Object()
    this.get = Querystring_get
    if (qs == null)
        qs = location.search.substring(1, location.search.length)
    if (qs.length == 0) return
    qs = qs.replace(/\+/g, ' ')
    var args = qs.split('&') // parse out name/value pairs separated via &
    for (var i = 0; i < args.length; i++) {
        var value;
        var pair = args[i].split('=')
        var name = unescape(pair[0])
        if (pair.length == 2)
            value = unescape(pair[1])
        else
            value = name
        this.params[name] = value
    }
}
function Querystring_get(key, default_) {
    if (default_ == null) default_ = null;
    var value = this.params[key]
    if (value == null) value = default_;
    return value
}

var fqs = new Querystring();
var DeffeduLvl;
var DeffCategory;
var DeffSubject;
var ExecutefNextStep = false;

DeffEduLvl = fqs.get("edulvl");
DeffCategory = fqs.get("category");
DeffSubject = fqs.get("subject");

var fxmlhttp = false;
var fxml;
var fdoc;
var fstr;

if (!fxmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
        fxmlhttp = new XMLHttpRequest();
    } catch (e) {
        fxmlhttp = false;
    }
}
if (!fxmlhttp && window.createRequest) {
    try {
        fxmlhttp = window.createRequest();
    } catch (e) {
        fxmlhttp = false;
    }
}

function LoadfDegrees() {
    fxmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx", true);
    fxmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetEDULevel_ByCampaign");
    fxmlhttp.setRequestHeader("Content-Type", "text/xml");
    fxmlhttp.onreadystatechange = function () {
        if (fxmlhttp.readyState == 4) {
            ExecutefNextStep = false;
            fxml = fxmlhttp.responseText;
            var nodes = fxml.split("<EduLevel>");
            var i = 0;
            var index = 1;

            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].indexOf("<Value>") > -1) {
                    var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>") + 7, 1);
                    var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>") + 13, nodes[i].indexOf("</DisplayName>") - 13);
                    document.myfooterform.eduLvl[index] = new Option(nodetext, nodeval);
                    if (nodeval == DeffeduLvl) {
                        document.myfooterform.eduLvl.selectedIndex = index;
                        ExecutefNextStep = true;
                    }
                    index++;
                }
            }
            if (ExecutefNextStep) DegreefChanged();
        }

    }
    str = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap12:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">" +
		"<soap12:Body>" +
		"<GetEDULevel_ByCampaign xmlns=\"http://elearners.com/\">" +
		"<RPCamp_GUID>" + document.myfooterform.cid.value + "</RPCamp_GUID>" +
		"</GetEDULevel_ByCampaign>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";
   fxmlhttp.send(str);
}
function DegreefChanged() {
    document.myfooterform.optone.disabled = false;
    document.myfooterform.industry.disabled = true;
    document.myfooterform.industry.selectedIndex = 0;

    var x;

    for (x = document.myfooterform.optone.length - 1; x > 0; x--) {
        document.myfooterform.optone[x] = null;
    }
    fxmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx", true);
    fxmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetCategories_SSOProfile");
    fxmlhttp.setRequestHeader("Content-Type", "text/xml");
    fxmlhttp.onreadystatechange = function () {
        if (fxmlhttp.readyState == 4) {
            ExecutefNextStep = false;
            fxml = fxmlhttp.responseText;
            var nodes = fxml.split("<Category>");
            var i = 0;
            var index = 1;
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].indexOf("<Value>") > -1) {
                    var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>") + 7, nodes[i].indexOf("</Value>") - nodes[i].indexOf("<Value>") - 7);
                    var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>") + 13, nodes[i].indexOf("</DisplayName>") - 13);

                    if (nodetext.indexOf("&amp;") > -1) {
                        nodetext = nodetext.substr(0, nodetext.indexOf("&amp;")) + "&" + nodetext.substr(nodetext.indexOf("&amp;") + 5)
                    }
                    document.myfooterform.optone[index] = new Option(nodetext, nodeval);
                    if (nodeval == DeffCategory) {
                        document.myfooterform.optone.selectedIndex = index;
                        ExecutefNextStep = true;
                    }
                    index++;
                }
            }
            if (ExecutefNextStep) CategoryfChanged();
        }
    }

    str = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap12:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">" +
		"<soap12:Body>" +
		"<GetCategories_SSOProfile xmlns=\"http://elearners.com/\">" +
		"<Degree>" + document.myfooterform.eduLvl[document.myfooterform.eduLvl.selectedIndex].value + "</Degree>" +
		"<RPCamp_GUID>" + document.myfooterform.cid.value + "</RPCamp_GUID>" +
		"<tsource>" + getQDFfTSource() + "</tsource>" +
		"</GetCategories_SSOProfile>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";

    fxmlhttp.send(str);
}

function CategoryfChanged() {
    document.myfooterform.industry.disabled = false;
    document.myfooterform.industry.selectedIndex = 0;
    var x;
    for (x = document.myfooterform.industry.length - 1; x > 0; x--) {
        document.myfooterform.industry[x] = null;
    }

    fxmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx", true);
    fxmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetSubjects_SSOProfile");
    fxmlhttp.setRequestHeader("Content-Type", "text/xml");
    fxmlhttp.onreadystatechange = function () {
        if (fxmlhttp.readyState == 4) {
            fxml = fxmlhttp.responseText;
            var nodes = fxml.split("<Subject>");
            var i = 0;
            var index = 1;

            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].indexOf("<Value>") > -1) {
                    var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>") + 7, nodes[i].indexOf("</Value>") - nodes[i].indexOf("<Value>") - 7);

                    var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>") + 13, nodes[i].indexOf("</DisplayName>") - 13);
                    document.myfooterform.industry[index] = new Option(nodetext, nodeval);

                    if (nodeval == DeffSubject) {
                        document.myfooterform.industry.selectedIndex = index;
                    }
                    index++;
                }
            }
        }
    }

    str = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap12:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">" +
		"<soap12:Body>" +
		"<GetSubjects_SSOProfile xmlns=\"http://elearners.com/\">" +
		"<Degree>" + document.myfooterform.eduLvl[document.myfooterform.eduLvl.selectedIndex].value + "</Degree>" +
		"<Category>" + document.myfooterform.optone[document.myfooterform.optone.selectedIndex].value + "</Category>" +
		"<RPCamp_GUID>" + document.myfooterform.cid.value + "</RPCamp_GUID>" +
		"</GetSubjects_SSOProfile>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";
    fxmlhttp.send(str);
}