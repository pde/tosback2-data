function Querystring(qs) { 
	this.params = new Object()
	this.get=Querystring_get
	if (qs == null)
		qs=location.search.substring(1,location.search.length)
	if (qs.length == 0) return
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &
	for (var i=0;i<args.length;i++) {
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
	var value=this.params[key]
	if (value==null) value=default_;
	return value
}

var qs = new Querystring();
var DefEduLvl;
var DefCategory;
var DefSubject;
var ExecuteNextStep=false;

DefEduLvl=qs.get("edulvl");
DefCategory=qs.get("category");
DefSubject=qs.get("subject");

var xmlhttp=false;
var xml;
var doc;
var str;

if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		xmlhttp=false;
	}
}
if (!xmlhttp && window.createRequest) {
	try {
		xmlhttp = window.createRequest();
	} catch (e) {
		xmlhttp=false;
	}
}

function LoadDegrees() 
{
xmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx",true);
xmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetEDULevel_ByCampaign");
xmlhttp.setRequestHeader("Content-Type", "text/xml");
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4) 
    {
        ExecuteNextStep=false;
        xml = xmlhttp.responseText;
        var nodes = xml.split("<EduLevel>");
        var i=0;
        var index=1;

        for(i=0;i<nodes.length;i++)
        {
            if(nodes[i].indexOf("<Value>") > -1)
            {
                var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>")+7, 1);
                var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>")+13, nodes[i].indexOf("</DisplayName>")-13);
                document.myform.eduLvl[index] = new Option(nodetext, nodeval);
                if (nodeval==DefEduLvl)
                { 
                    document.myform.eduLvl.selectedIndex = index;                
                    ExecuteNextStep=true;
                }
                index++;
            }
        }
        if (ExecuteNextStep) DegreeChanged();
    }

}
str = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap12:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">" +
		"<soap12:Body>" +
		"<GetEDULevel_ByCampaign xmlns=\"http://elearners.com/\">" +
		"<RPCamp_GUID>" + document.myform.cid.value + "</RPCamp_GUID>" +
		"</GetEDULevel_ByCampaign>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";
 xmlhttp.send(str);
}
function DegreeChanged() {
document.myform.optone.disabled=false;
document.myform.industry.disabled=true;
document.myform.industry.selectedIndex=0;

var x;

for(x=document.myform.optone.length-1;x>0;x--)
{
	document.myform.optone[x] = null;
}
xmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx",true);
xmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetCategories_SSOProfile");
xmlhttp.setRequestHeader("Content-Type", "text/xml");
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
        ExecuteNextStep=false;
        xml = xmlhttp.responseText;
        var nodes = xml.split("<Category>");
        var i=0;
        var index=1;
        for(i=0;i<nodes.length;i++)
        {
            if(nodes[i].indexOf("<Value>") > -1)
            {
                var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>")+7, nodes[i].indexOf("</Value>")-nodes[i].indexOf("<Value>")-7);
                var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>")+13, nodes[i].indexOf("</DisplayName>")-13);
               	
                if(nodetext.indexOf("&amp;") > -1) 
                {
                    nodetext = nodetext.substr(0, nodetext.indexOf("&amp;")) + "&" + nodetext.substr(nodetext.indexOf("&amp;")+5)
                }
                document.myform.optone[index] = new Option(nodetext, nodeval);
                if (nodeval==DefCategory)
                { 
                    document.myform.optone.selectedIndex = index;
                    ExecuteNextStep=true;
                }
                index++;
            }
        }
        if (ExecuteNextStep) CategoryChanged();
    }
}

str = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
		"<soap12:Envelope " +
		"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
		"xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">" +
		"<soap12:Body>" +
		"<GetCategories_SSOProfile xmlns=\"http://elearners.com/\">" +
		"<Degree>" + document.myform.eduLvl[document.myform.eduLvl.selectedIndex].value + "</Degree>" +
		"<RPCamp_GUID>" + document.myform.cid.value + "</RPCamp_GUID>" +
		"<tsource>" + getQDFTSource() + "</tsource>" +
		"</GetCategories_SSOProfile>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";

xmlhttp.send(str);
}

function CategoryChanged() {
document.myform.industry.disabled=false;
document.myform.industry.selectedIndex=0;
var x;
for(x=document.myform.industry.length-1;x>0;x--)
{
	document.myform.industry[x] = null;
}

xmlhttp.open("POST", "/WebServices/external/ELearnersWebService.asmx",true);
xmlhttp.setRequestHeader("SOAPAction", "http://elearners.com/GetSubjects_SSOProfile");
xmlhttp.setRequestHeader("Content-Type", "text/xml");
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
        xml = xmlhttp.responseText;
        var nodes = xml.split("<Subject>");
        var i=0;
        var index=1;

        for(i=0;i<nodes.length;i++)
        {
            if(nodes[i].indexOf("<Value>") > -1)
            {
                var nodeval = nodes[i].substr(nodes[i].indexOf("<Value>")+7, nodes[i].indexOf("</Value>")-nodes[i].indexOf("<Value>")-7);
		
                var nodetext = nodes[i].substr(nodes[i].indexOf("<DisplayName>")+13, nodes[i].indexOf("</DisplayName>")-13);
                document.myform.industry[index] = new Option(nodetext, nodeval);
                
                if (nodeval==DefSubject)
                { 
                    document.myform.industry.selectedIndex = index;                
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
		"<Degree>" + document.myform.eduLvl[document.myform.eduLvl.selectedIndex].value + "</Degree>" +
		"<Category>"  + document.myform.optone[document.myform.optone.selectedIndex].value + "</Category>" + 
		"<RPCamp_GUID>" + document.myform.cid.value + "</RPCamp_GUID>" +
		"</GetSubjects_SSOProfile>" +
		"</soap12:Body>" +
		"</soap12:Envelope>";
xmlhttp.send(str);
}