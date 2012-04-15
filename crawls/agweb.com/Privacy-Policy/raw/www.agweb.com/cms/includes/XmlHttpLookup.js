
var queryField;
var lookupURL;
var divName;
var ifName;
var lastVal = "";
var val = ""
var xmlHttp;
var cache = new Object();
var searching = false;
var globalDiv;
var divFormatted = false;
var DIV_BG_COLOR = "#464646";
var DIV_HIGHLIGHT_COLOR = "#979696";
var FONT_COLOR = "#a6a6a6";
var FONT_HOVER_COLOR = "#353535";
var divWidth = "300px";

/**
The InitQueryCode function should be called by the <body onload> event, passing
at least the queryFieldName and lookupURLPrefix parameters, where:

queryFieldName = the name of the form field we're using for lookups
lookupURLPrefix = the URL we'll use to pass the query string back to the server,
                  which will be immediately proceeded by the query string

For example:
<body onload="InitQueryCode('lookupField', 'http://lookupserver/QueryHandler?q=')">

The above example will monitor the input box called "lookupField" on this page,
and when it changes the contents of the field will be passed to lookupserver like:
http://lookupserver/QueryHandler?q=fieldValue

The http://lookupserver/QueryHandler will be expected to return a text response
with a single line of text that calls the showQueryDiv function, in a format like:
showQueryDiv("smi", new Array("John Smith", "Mary Smith"), new Array("555-1212", "555-1234"));

*/
function InitQueryCode (queryFieldName, lookupURLPrefix, hiddenDivName)
{
  queryField = document.getElementById(queryFieldName);
  //queryField.onblur = hideDiv;
  queryField.onkeydown = keypressHandler;
  
  // for some reason, Firefox 1.0 doesn't allow us to set autocomplete to off
  // this way, so you should manually set autocomplete="off" in the input tag
  // if you can -- we'll try to set it here in case you forget
  queryField.autocomplete = "off";
  
  lookupURL = lookupURLPrefix;
  if (hiddenDivName)
    divName = hiddenDivName;
  else
    divName = "querydiv";
  ifName = "queryiframe";
  
  // add a blank value to the cache (so we don't try to do a lookup when the
  // field is empty) and start checking for changes to the input field
  addToCache("", new Array(), new Array());
  setTimeout("mainLoop()", 100);
}


/**
This is a helper function that just adds results to our cache, to avoid
repeat lookups.
*/
function addToCache (queryString, resultArray1, resultArray2)
{
  cache[queryString] = new Array(resultArray1, resultArray2);
}


/**
This is the function that monitors the queryField, and calls the lookup
functions when the queryField value changes.
*/
mainLoop = function() {
    val = queryField.value;
    if (val == 'SEARCH OUR SITE')
        val = '';
    else
        val = escape(val);

    // if the field value has changed and we're not currently waiting for
    // a lookup result to be returned, do a lookup (or use the cache, if
    // we can)
    if (lastVal != val && searching == false) {
        var cacheResult = cache[val];
        if (cacheResult)
            showQueryDiv(val, cacheResult[0], cacheResult[1]);
        else
            doRemoteQuery(val);
        lastVal = val;
    }

    setTimeout("mainLoop()", 100);
    return true;
}
;


/**
Get the <DIV> we're using to display the lookup results, and create the
<DIV> if it doesn't already exist.
*/
function getDiv (divID) {
  if (!globalDiv) {
    // if the div doesn't exist on the page already, create it
    if (!document.getElementById(divID)) {
      var newNode = document.createElement("div");
      newNode.setAttribute("id", divID);
      document.body.appendChild(newNode);
    }
    
    // set the globalDiv reference
    globalDiv = document.getElementById(divID);
    
    // figure out where the top corner of the div should be, based on the
    // bottom left corner of the input field
    var x = queryField.offsetLeft;
    var y = queryField.offsetTop + queryField.offsetHeight;
    var parent = queryField;
    while (parent.offsetParent) {
      parent = parent.offsetParent;
      x += parent.offsetLeft;
      y += parent.offsetTop;
    }
    
    // add some formatting to the div, if we haven't already
    if (!divFormatted) {
      globalDiv.style.backgroundColor = DIV_BG_COLOR;
      globalDiv.style.fontFamily = "Trebuchet MS, Helvetica, sans-serif";
      globalDiv.style.padding = "10px 10px 0 10px";
      globalDiv.style.border = "1px solid #42413c";
      globalDiv.style.fontSize = "13px";
      globalDiv.style.width = divWidth;
      globalDiv.style.position = "absolute";
      globalDiv.style.left = (x-127) + "px";
      globalDiv.style.top = (y+4) + "px";
      globalDiv.style.visibility = "hidden";
      globalDiv.style.zIndex = 10000;
 
      divFormatted = true;
    }
  }

  
  return globalDiv;
}


/**
This is the function that should be returned by the XMLHTTP call. It will
format and display the lookup results.
*/
function showQueryDiv (queryString, resultArray1, resultArray2, resultArray3, resultArray4, count)
{


  var div = getDiv(divName);
  
  // remove any results that are already there
  while (div.childNodes.length > 0)
    div.removeChild(div.childNodes[0]);
  
  // add an entry for each of the results in the resultArray
  for (var i = 0; i < resultArray1.length; i++)
  {
    var result = document.createElement("div");
    result.onmouseover = highlightResult;
    result.onmouseout = unhighlightResult;
    if(!resultArray3) {
        // each result will be contained within its own div
        result.style.cursor = "pointer";
        //result.style.borderBottom = "1px solid #000000";
        result.style.padding = "0px 3px 0px 3px";
        _unhighlightResult(result);
        result.style.textAlign = "left";
        result.style.fontSize = "11px"

        var result1 = document.createElement("span");
        result1.Id = resultArray2[i];
        result1.className = "result1";
        result1.style.textAlign = "left";
        result1.innerHTML = resultArray1[i];
        
        //var result2 = document.createElement("span");
        //result2.className = "result2";
        //result2.style.textAlign = "right";
        //result2.style.paddingLeft = "20px";
        //result2.innerHTML = resultArray2[i];
        
        result.appendChild(result1);
        //result.appendChild(result2);
        result.onmousedown = selectResult;


        div.appendChild(result);
    } else {
        result.className = 'searchItemWrp';
        result.style.position = 'relative';
        result.style.cursor = 'pointer';
        result.style.textAlign = "left";
        var wrapper = document.createElement("div");
        wrapper.style.position = 'relative';
        wrapper.className = 'searchItem';
        if(i == 0) {
            var header = document.createElement("div");
            var lbl;
            var suffix = 'es';
            if(resultArray1.length == 1) suffix = '';
            resultArray1.length < 5 ? lbl = 'Top ' + (resultArray1.length == 1 ? '' : resultArray1.length) + ' Match' + suffix : lbl = 'Top ' + resultArray1.length + ' Matches';
            header.style.fontWeight = 'bold';
            header.style.fontSize = '1.1em';
            header.style.padding = '4px';
            header.innerHTML = lbl;
            header.style.backgroundColor = '#1d4658';
            header.style.color = '#ffffff';
            header.style.display = 'none';
            div.appendChild(header);
        }
        
        var prodDiv = document.createElement("span");
        prodDiv.style.cursor = 'pointer';
        prodDiv.style.whiteSpace = 'nowrap';
        if(!resultArray3[i]=='')prodDiv.innerHTML = " [" + resultArray3[i] + "]<br />";
        
        var details = document.createElement("div");
        details.Id = resultArray2[i];
        details.style.textAlign = 'left';
        details.style.display = 'inline';
	details.className = 'result1';
        details.style.cursor = 'pointer';
        details.innerHTML = resultArray1[i];

        wrapper.appendChild(details);
        wrapper.appendChild(prodDiv);
        
        result.appendChild(wrapper);
        result.onmousedown = new Function("window.location = '" + resultArray4[i] + "'");
        
        div.appendChild(result);

        if(i == resultArray1.length -1) {
            var footer = document.createElement("div");
            footer.style.backgroundColor = '';
            footer.style.color = '#ffffff';
            footer.style.padding = '4px';
            footer.style.textAlign = 'right';
            footer.innerHTML = '<a href="javascript:void(0);" onmousedown=\'window.location="/search/default.aspx?keywords=' + escape(queryField.value) + '"\'><span style=\"color\: \#ffffff\;\" class=\"searchMoreLink\" >View All Results (' + count + ')</span></a>' + (parseInt(count) >= 0 ? '<div class="searchResults">' : '');
            div.appendChild(footer);
        }
    }
  }
  
  // if this resultset isn't already in our cache, add it
  var isCached = cache[queryString];
  if (!isCached)
    addToCache(queryString, resultArray1, resultArray2);
  
  // display the div if we had at least one result
  showDiv(resultArray1.length > 0);
}


/**
This is called whenever the user clicks one of the lookup results.
It puts the value of the result in the queryField and hides the
lookup div.
*/
function selectResult()
{
  _selectResult(this);
}


/** This actually fills the field with the selected result and hides the div */
function _selectResult(item)
{
  var spans = item.getElementsByTagName("span");
  if (spans) {
    for (var i = 0; i < spans.length; i++) {
      if (spans[i].className == "result1") {
      
		var str = spans[i].innerHTML;
		var re = new RegExp('&amp;', 'gi');
		str = str.replace(re, '&');

        queryField.value = str;
                
        MyCallback(spans[i].Id);
        
        lastVal = val = escape(queryField.value);
        searching = false;
        mainLoop();
        queryField.focus();
        showDiv(false);
        return;
      }
    }
  }
}


/**
This is called when a user mouses over a lookup result
*/
function highlightResult()
{
  _highlightResult(this);
}

/** This actually highlights the selected result */
function _highlightResult(item)
{
  item.style.backgroundColor = DIV_HIGHLIGHT_COLOR;
  item.style.color= FONT_HOVER_COLOR
}


/**
This is called when a user mouses away from a lookup result
*/
function unhighlightResult()
{
  _unhighlightResult(this);
}

/** This actually unhighlights the selected result */
function _unhighlightResult(item)
{
  item.style.backgroundColor = DIV_BG_COLOR;
  item.style.color= FONT_COLOR
}


/**
This either shows or hides the lookup div, depending on the value of
the "show" parameter.
*/
function showDiv (show)
{
  var div = getDiv(divName);
  if (show)
    div.style.visibility = "visible";
  else
    div.style.visibility = "hidden";

  adjustiFrame();
}


/**
We originally used showDiv as the function that was called by the onBlur
event of the field, but it turns out that Firefox will pass an event as the first
parameter of the function, which would cause the div to always be visible.
So onBlur now calls hideDiv instead.
*/
function hideDiv ()
{
  showDiv(false);
}


/**
Use an "iFrame shim" to deal with problems where the lookup div shows up behind
selection list elements, if they're below the queryField. The problem and solution are
described at:

http://dotnetjunkies.com/WebLog/jking/archive/2003/07/21/488.aspx
http://dotnetjunkies.com/WebLog/jking/archive/2003/10/30/2975.aspx
*/
function adjustiFrame()
{
  if (!document.getElementById(ifName)) {
    var newNode = document.createElement("iFrame");
    newNode.setAttribute("id", ifName);
    newNode.setAttribute("src", "javascript:false;");
    newNode.setAttribute("scrolling", "no");
    newNode.setAttribute("frameborder", "0");
    document.body.appendChild(newNode);
  }
  
  iFrameDiv = document.getElementById(ifName);
  var div = getDiv(divName);
  
  try {
    iFrameDiv.style.position = "absolute";
    iFrameDiv.style.width = div.offsetWidth;
    iFrameDiv.style.height = div.offsetHeight;
    iFrameDiv.style.top = div.style.top;
    iFrameDiv.style.left = div.style.left;
    iFrameDiv.style.zIndex = div.style.zIndex - 1;
    iFrameDiv.style.visibility = div.style.visibility;
  } catch(e) {
  }
}


/**
This sets up the XMLHTTP object we're using for the dynamic lookups.
*/
function getXMLHTTP(){
  var A = null;
  
  try{
    A = new ActiveXObject("Msxml2.XMLHTTP");
  }catch(e){
    try{
      A = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(oc){
      A = null;
    }
  }
  
  if(!A && typeof XMLHttpRequest != "undefined") {
    A = new XMLHttpRequest();
  }
  
  return A;
}


/**
This actually sends the lookup request (as a URL with a query string) to a
server in the background. When a response comes back from the server, the
function attached to the onReadyStateChange event is fired off.
*/
function doRemoteQuery (queryString)
{
  searching = true;
  if(xmlHttp && xmlHttp.readyState != 0) {
    xmlHttp.abort()
  }  
  xmlHttp=getXMLHTTP();
  if(xmlHttp){
    xmlHttp.open("GET", lookupURL + queryString, true);
           
    // What do we do when the response comes back?
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.responseText && searching) {
			eval(xmlHttp.responseText);
			searching = false;
      }
    }
    xmlHttp.send(null);
  }
  
}


/**
This is the key handler function, for when a user presses the up arrow,
down arrow, tab key, or enter key from the input field.
*/
function keypressHandler (evt)
{
  // don't do anything if the div is hidden
  var div = getDiv(divName);
  if (div.style.visibility == "hidden")
    return true;
  
  // make sure we have a valid event variable
  if(!evt && window.event) {
    evt = window.event;
  }
  var key = evt.keyCode;
  
  // if this key isn't one of the ones we care about, just return
  var KEYUP = 38;
  var KEYDOWN = 40;
  var KEYENTER = 13;
  var KEYTAB = 9;

  //if ((key != KEYUP) && (key != KEYDOWN) && (key != KEYENTER) && (key != KEYTAB))
  if ((key != KEYENTER) && (key != KEYTAB))
    return true;
  
  // get the span that's currently selected, and perform an appropriate action
  var selNum = getSelectedSpanNum(div);
  var selSpan = setSelectedSpan(div, selNum);
  
  if ((key == KEYENTER) || (key == KEYTAB)) {
      if (selSpan && (key == KEYTAB)) {
          _selectResult(selSpan);
          evt.cancelBubble = true;
          return false;
      }
      else {
          hideDiv();
          buttonClick();
          return false;
      }
  } else {
    if (key == KEYUP)
      selSpan = setSelectedSpan(div, selNum - 1);
    if (key == KEYDOWN)
      selSpan = setSelectedSpan(div, selNum + 1);
    if (selSpan)
      _highlightResult(selSpan);
  }
  
  showDiv(true);
  return true;
}


/**
Get the number of the result that's currently selected/highlighted
(the first result is 0, the second is 1, etc.)
*/
function getSelectedSpanNum (div)
{
  var count = -1;
  var spans = div.getElementsByTagName("div");
  if (spans) {
    for (var i = 0; i < spans.length; i++) {
      count++;
      if (spans[i].style.backgroundColor != div.style.backgroundColor)
        return count;
    }
  }
  
  return -1;
}


/**
Select/highlight the result at the given position
*/
function setSelectedSpan (div, spanNum)
{
  var count = -1;
  var thisSpan;
  var spans = div.getElementsByTagName("div");
  if (spans) {
    for (var i = 0; i < spans.length; i++) {
      if (++count == spanNum) {
        _highlightResult(spans[i]);
        thisSpan = spans[i];
      } else {
        _unhighlightResult(spans[i]);
      }
    }
  }
  
  return thisSpan;
}

