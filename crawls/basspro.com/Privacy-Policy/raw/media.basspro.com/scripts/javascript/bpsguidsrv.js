var methodGet = "GET";
var methodPost = "POST";
var postContentType = "application/x-www-form-urlencoded";
var contentTypeHeader = "Content-Type";
var errorMessage = "The following error has occurred: ";
var showDebugMessages = false;

try
{
  showDebugMessages = (window.location.href.indexOf("&showDebugMessages=true") != -1 || window.location.href.indexOf("?showDebugMessages=true") != -1);
}
catch (ignore)
{}

function updated(response, actionObj)
{
  if (showDebugMessages)
    alert(response);
}

function createBPSAJAXRequest()
{
  if (window.XMLHttpRequest)
    return new XMLHttpRequest();
  else if (window.ActiveXObject)
  {
    try
    {
      return new ActiveXObject(xmlHttp);
    }
    catch (msxml2)
    {
      return new ActiveXObject(xml2Http);
    }
  }
  return null;
}

function connectToGUIDService(url, params, method, contentType, action, actionObj)
{
  var request = createBPSAJAXRequest();

  if (request)
  {
    if (!method)
      method = methodGet;

    if (!contentType && method == methodPost)
      contentType = postContentType;

    try
    {
      request.onreadystatechange = function()
      {
        processGUIDResponse(request, action, actionObj);
      }

      request.open(method, url, true);

      if (contentType)
        request.setRequestHeader(contentTypeHeader, contentType);

      if (params)
        request.send(params);
    }
    catch (err)
    {
      if (showDebugMessages)
        alert(errorMessage + err.message);
    }
  }
}

function processGUIDResponse(request, action, actionObj)
{
  var state = request.readyState;

  if (state == 4)
  {
    var httpStatus = request.status;

    if (httpStatus == 200 || httpStatus == 0)
      this[action](request.responseText, actionObj);
    else if (showDebugMessages)
      alert(errorMessage + httpStatus);
  }
}

try
{
  if (s.pageName == "Customer Service : My Account" || s.pageName == "Customer Service : Registration")
  {
    var guid = getId('BPSGUID');
    var bpssid = getId('JSESSIONID');

    try
    {
      connectToGUIDService("/webapp/wcs/stores/servlet/GUIDServiceCallView?catalogId=10001&storeId=10151&langId=-1", ("&action=updateGUID&updateGUID=" + guid + "&updateUID=" + bpsuid + "&updateSID=" + bpssid), methodPost, null, "updated", null);
    }
    catch (error)
    {
      if (showDebugMessages)
        alert(error.message);
    }
  }
}
catch (error)
{
  if (showDebugMessages)
    alert(error.message);
}
