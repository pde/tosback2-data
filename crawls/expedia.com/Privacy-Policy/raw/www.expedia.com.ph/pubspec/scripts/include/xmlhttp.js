
function CreateXmlHttp()
{
	var xmlhttp;

	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else if (window.ActiveXObject)
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	return xmlhttp;
}

function IssueXmlHttpRequestAsync(method, url, callback, p)
{
	var xmlHttpReq = CreateXmlHttp();

	xmlHttpReq.onreadystatechange = function () {
		if (xmlHttpReq.readyState == 4)
		{
			callback(xmlHttpReq, p);
		}
	}
	
	xmlHttpReq.open(method, url, true);

	xmlHttpReq.send(null);
}

function IssueXmlHttpRequest(method, url, postdata)
{
	var xmlHttpReq = CreateXmlHttp();
	
	xmlHttpReq.open(method, url, false);
	xmlHttpReq.send(postdata);

	return xmlHttpReq.responseText;
}

function updateTimer(timerId, funcstr, ms)
{
	if (timerId)
		clearTimeout(timerId);					

	return setTimeout(funcstr, ms);
}

function stripHeaderFooter(rsp)
{
	var firstIndex = rsp.indexOf(">") + 1;
	var secondIndex = rsp.indexOf("<", firstIndex);

	return rsp.substring(firstIndex, secondIndex);
}

