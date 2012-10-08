/**
 *  Declare the CUTypeAhead object
 */
if (CUTypeAhead == null) var CUTypeAhead = {
	"activeObj" :null,
	"searchTerm":""
};

/**
 *  Holds the data to be used when displaying typeahead
 */
CUTypeAhead.data = [];

/**
 *  Holds an incrementable ID
 */
CUTypeAhead.counter = 0;

/**
 *  See: http://www.dustindiaz.com/rock-solid-addevent/
 */
CUTypeAhead.addEvent = function(inObject, inType, inFunction)
{
	if (inObject.addEventListener)
	{
		inObject.addEventListener( inType, inFunction, false );
		EventCache.add(inObject, inType, inFunction);
	}
	else if (inObject.attachEvent)
	{
		inObject["e" + inType + inFunction] = inFunction;
		inObject[inType + inFunction] = function() { inObject["e" + inType + inFunction]( window.event ); }
		inObject.attachEvent("on" + inType, inObject[inType + inFunction]);
		EventCache.add(inObject, inType, inFunction);
	}
	else
	{
		inObject["on" + inType] = inObject["e" + inType + inFunction];
	}
};

/**
 *  See: http://www.dustindiaz.com/rock-solid-addevent/
 */
var EventCache = function()
{
	var theListEvents = [];
	return {
		theListEvents : theListEvents,
		add : function(node, sEventName, fHandler){
			theListEvents.push(arguments);
		},
		flush : function()
		{
			var i, theItem;
			for(i = theListEvents.length - 1; i >= 0; i = i - 1)
			{
				theItem = theListEvents[i];
				if(theItem[0].removeEventListener){
					theItem[0].removeEventListener(theItem[1], theItem[2], theItem[3]);
				};
				if(theItem[1].substring(0, 2) != "on"){
					theItem[1] = "on" + theItem[1];
				};
				if(theItem[0].detachEvent){
					theItem[0].detachEvent(theItem[1], theItem[2]);
				};
				theItem[0][theItem[1]] = null;
			};
		}
	};
}();

/**
 *  See: http://www.dustindiaz.com/rock-solid-addevent/
 */
CUTypeAhead.addEvent(window,'unload',EventCache.flush);

/**
 *  Delete all children nodes
 */
CUTypeAhead.clearNode = function(inNode)
{
	while(inNode.hasChildNodes()) inNode.removeChild(inNode.firstChild);
};

CUTypeAhead.requestImage = function(inId, inTag, inType) {
    var theScriptTag = document.createElement("script");
    theScriptTag.setAttribute("type", "text/javascript");
    theScriptTag.setAttribute("charset", "utf-8");
    theScriptTag.setAttribute("id", "script" + inId);
    var tagString = "&path=";
    if(inTag instanceof Array){
        for(var i=0;i<inTag.length;i++)
        tagString += "&tag="+encodeURIComponent(inTag[i]);
    }else{
       tagString = "&tag="+encodeURIComponent(inTag);
    }
    theScriptTag.setAttribute("src", "/bin/canonicalimage.json?id=" + encodeURIComponent(inId) + "&callback=" + encodeURIComponent("CUTypeAhead.gotImage") + tagString +"&type="+inType);
    var theHead = document.getElementsByTagName("head").item(0);
    theHead.appendChild(theScriptTag);
};

CUTypeAhead.gotImage = function(inId, inPath) {
    var theScript = document.getElementById("script" + inId);
    if (theScript)
    {
        theScript.parentNode.removeChild(theScript);
    }
    var theImage = document.getElementById(inId);
    if (theImage)
    {
        theImage.setAttribute("src", inPath);
    }
};

CUTypeAhead.getID = function() {
    CUTypeAhead.counter += 1;
    return CUTypeAhead.counter;
};

CUTypeAhead.mouseTrigger = function(e) {
	var theTargets = [];
	var theAlwaysDisplays = [];
	var char;
	var evt = (e) ? e : window.event;
	var theMatchesOutput = document.getElementById("matches");
	var theSearchElement = document.getElementById("search");
	if (evt.type == "mouseover") {
		CUTypeAhead.clearNode(theMatchesOutput);
		theMatchesOutput.style.display = "none";
		if (theSearchElement.value) {
			var theSearchText = theSearchElement.value.toLowerCase();
			theSearchText = theSearchText.replace(/^\s*/, "").replace(/\s*$/, "");
			if (theSearchText.length >= 3) {
				CUTypeAhead.clearNode(theMatchesOutput);
				CUTypeAhead.searchTerm = theSearchElement.value;
				CUTypeAhead.activeObj = null;
				for (var i = 0; (i < CUTypeAhead.data.length); i++) {
					var theKeyword = CUTypeAhead.data[i].keyword.toLowerCase();
					var theImage = CUTypeAhead.data[i].image;
					var theTarget = CUTypeAhead.data[i].target;
					var theAlwaysDisplay = CUTypeAhead.data[i].always;
					var theTargetIsDisplayedAlready = false;
					for (var j = 0; (j < theTargets.length); j++) {
						if (theTargets[j] == theTarget) {
							if (!theAlwaysDisplays[j]) {
								theTargetIsDisplayedAlready = true;
								break;
							}
						}
					}
					if (!theTargetIsDisplayedAlready) {
						if (theKeyword.indexOf(theSearchText) == 0) {
                            var theID = CUTypeAhead.getID();
                            if (CUTypeAhead.data[i].tag)
                            {
                                var theMatchHTML = "<div class='results-inner-box'><a href='" + theTarget + "'><img id='" + theID + "' src='' width='95' height='69' title='" + CUTypeAhead.data[i].keyword + "' alt='" + CUTypeAhead.data[i].keyword + "'/></a><a href='" + theTarget + "' class='product-links'>" + CUTypeAhead.data[i].keyword + "</a></div>";
                                theMatchesOutput.innerHTML += theMatchHTML;
                            }
                            else
                            {
                                var theMatchHTML = "<div class='results-inner-box'><a href='" + theTarget + "'><img id='" + theID + "' src='" + theImage + "' width='95' height='69' title='" + CUTypeAhead.data[i].keyword + "' alt='" + CUTypeAhead.data[i].keyword + "'/></a><a href='" + theTarget + "' class='product-links'>" + CUTypeAhead.data[i].keyword + "</a></div>";
                                theMatchesOutput.innerHTML += theMatchHTML;
                            }
							theTargets.push(theTarget);
							theAlwaysDisplays.push(theAlwaysDisplay);
                            if (CUTypeAhead.data[i].tag)
                            {
                                CUTypeAhead.requestImage(theID, CUTypeAhead.data[i].tag, CUTypeAhead.data[i].type);
                            }
						}
						if (theTargets.length == 3) {
							break;
						}
					}
				}
			}
		}
	}
	if (theTargets.length > 0) {
		var theViewAllHTML = "<div class='view-search-results-box'><div class='view-search-results'><a href='javascript:CUTypeAhead.submit();'>View all search results for &quot;" + theSearchElement.value + "&quot;</a></div></div>"
		theMatchesOutput.innerHTML += theViewAllHTML;
		theMatchesOutput.style.display = "block";
	}
};

/**
 *  Compare the search box contents to the typeahead data.
 */
CUTypeAhead.keyTrigger = function(e) {
	var theTargets = [];
	var theAlwaysDisplays = [];
	var char;
	var evt = (e) ? e : window.event;
	var theMatchesOutput = document.getElementById("matches");
	var theSearchElement = document.getElementById("search");
	if (evt.type == "keyup") {
		if (evt.keyCode != 38 && evt.keyCode != 40) {
			CUTypeAhead.clearNode(theMatchesOutput);
			CUTypeAhead.activeObj = null;
			theMatchesOutput.style.display = "none";
			if (theSearchElement.value) {
				var theSearchText = theSearchElement.value.toLowerCase();
				theSearchText = theSearchText.replace(/^\s*/, "").replace(/\s*$/, "");
				if (theSearchText.length >= 3) {
					CUTypeAhead.searchTerm = theSearchElement.value;
					CUTypeAhead.clearNode(theMatchesOutput);
					for (var i = 0; (i < CUTypeAhead.data.length); i++) {
						var theKeyword = CUTypeAhead.data[i].keyword.toLowerCase();
						var theImage = CUTypeAhead.data[i].image;
						var theTarget = CUTypeAhead.data[i].target;
						var theAlwaysDisplay = CUTypeAhead.data[i].always;
						var theTargetIsDisplayedAlready = false;
						for (var j = 0; (j < theTargets.length); j++) {
							if (theTargets[j] == theTarget) {
								if (!theAlwaysDisplays[j]) {
									theTargetIsDisplayedAlready = true;
									break;
								}
							}
						}
						if (!theTargetIsDisplayedAlready) {
							if (theKeyword.indexOf(theSearchText) == 0) {
                                var theID = CUTypeAhead.getID();
                                if (CUTypeAhead.data[i].tag)
                                {
                                    var theMatchHTML = "<div class='results-inner-box'><a href='" + theTarget + "'><img id='" + theID + "' src='' width='95' height='69' title='" + CUTypeAhead.data[i].keyword + "' alt='" + CUTypeAhead.data[i].keyword + "'/></a><a href='" + theTarget + "' class='product-links'>" + CUTypeAhead.data[i].keyword + "</a></div>";
                                    theMatchesOutput.innerHTML += theMatchHTML;
                                }
                                else
                                {
                                    var theMatchHTML = "<div class='results-inner-box'><a href='" + theTarget + "'><img id='" + theID + "' src='" + theImage + "' width='95' height='69' title='" + CUTypeAhead.data[i].keyword + "' alt='" + CUTypeAhead.data[i].keyword + "'/></a><a href='" + theTarget + "' class='product-links'>" + CUTypeAhead.data[i].keyword + "</a></div>";
                                    theMatchesOutput.innerHTML += theMatchHTML;
                                }
								theTargets.push(theTarget);
								theAlwaysDisplays.push(theAlwaysDisplay);
                                if (CUTypeAhead.data[i].tag)
                                {
                                    CUTypeAhead.requestImage(theID, CUTypeAhead.data[i].tag, CUTypeAhead.data[i].type);
                                }
							}
							if (theTargets.length == 3) {
								break;
							}
						}
					}
				}
			}
		}
		if (evt.keyCode == 40) {
			var divObjs = document.getElementById("matches").getElementsByTagName("div");
			var resultsObj = [];
			for (i = 0; i < divObjs.length; i++) {
				if (divObjs[i].className == "results-inner-box" || divObjs[i].className == "results-inner-box-active" || divObjs[i].className == "view-search-results-box" || divObjs[i].className == "view-search-results-box-active") {
					resultsObj.push(divObjs[i]);
					if (divObjs[i].className == "results-inner-box-active" || divObjs[i].className == "view-search-results-box-active" ) {
						CUTypeAhead.activeObj = divObjs[i];
					}
				}
			}
			if (CUTypeAhead.activeObj == null && resultsObj.length > 0) {
				CUTypeAhead.activeObj = resultsObj[0];
				if (resultsObj[0].className == "results-inner-box") {
					resultsObj[0].className = "results-inner-box-active";
				}
				if (CUTypeAhead.activeObj.getElementsByTagName("img")[0] === undefined ) {
					document.getElementById("search").value = CUTypeAhead.searchTerm;
				}
				else {
					document.getElementById("search").value = CUTypeAhead.activeObj.getElementsByTagName("img")[0].title;
				}
			}
			else if(CUTypeAhead.activeObj == null && resultsObj.length === 0){
				return;
			}
			else {
				for(j = 0; j < resultsObj.length; j++){
					if(resultsObj[j] == CUTypeAhead.activeObj){
						if (resultsObj[j].className == "results-inner-box-active") {
							resultsObj[j].className = "results-inner-box";
						}
						if (resultsObj[j].className == "view-search-results-box-active") {
							resultsObj[j].className = "view-search-results-box";
						}
						var k = j + 1;
						if (resultsObj[k] !== undefined) {
							if (resultsObj[k].className == "results-inner-box") {
								resultsObj[k].className = "results-inner-box-active";
							}
							if (resultsObj[k].className == "view-search-results-box") {
								resultsObj[k].className = "view-search-results-box-active";
							}
							CUTypeAhead.activeObj = resultsObj[k];
							break;
						}
						else {
							if (resultsObj[0].className == "results-inner-box") {
								resultsObj[0].className = "results-inner-box-active";
							}
							if (resultsObj[0].className == "view-search-results-box") {
								resultsObj[0].className = "view-search-results-box-active";
							}
							CUTypeAhead.activeObj = resultsObj[0];
							break;
						}
					}
				}
				if (CUTypeAhead.activeObj.getElementsByTagName("img")[0] === undefined) {
					document.getElementById("search").value = CUTypeAhead.searchTerm;
				}
				else {
					document.getElementById("search").value = CUTypeAhead.activeObj.getElementsByTagName("img")[0].title;
				}
			}
		}
		if (evt.keyCode == 38) {
			var divObjs = document.getElementById("matches").getElementsByTagName("div");
			var resultsObj = [];
			for (i = 0; i < divObjs.length; i++) {
				if (divObjs[i].className == "results-inner-box" || divObjs[i].className == "results-inner-box-active" || divObjs[i].className == "view-search-results-box" || divObjs[i].className == "view-search-results-box-active" ) {
					resultsObj.push(divObjs[i]);
					if (divObjs[i].className == "results-inner-box-active" || divObjs[i].className == "view-search-results-box-active") {
						CUTypeAhead.activeObj = divObjs[i];
					}
				}
			}
			if (CUTypeAhead.activeObj == null && resultsObj.length > 0) {
				CUTypeAhead.activeObj = resultsObj[0];
				if (resultsObj[0].className == "results-inner-box") {
					resultsObj[0].className = "results-inner-box-active";
				}
				if (resultsObj[0].className == "view-search-results-box") {
					resultsObj[0].className = "view-search-results-box-active";
				}
			}
			else if(CUTypeAhead.activeObj == null && resultsObj.length === 0){
				return;
			}
			else {
				for(j = 0; j < resultsObj.length; j++){
					if(resultsObj[j] == CUTypeAhead.activeObj){
						if (resultsObj[j].className == "results-inner-box-active") {
							resultsObj[j].className = "results-inner-box";
						}
						if (resultsObj[j].className == "view-search-results-box-active") {
							resultsObj[j].className = "view-search-results-box";
						}
						var k = j - 1;
						if (resultsObj[k] !== undefined) {
							if (resultsObj[k].className =="results-inner-box") {
								resultsObj[k].className = "results-inner-box-active";
							}
							if (resultsObj[k].className =="view-search-results-box") {
								resultsObj[k].className = "view-search-results-box-active";
							}
							CUTypeAhead.activeObj = resultsObj[k];
							break;
						}
						else {
							if (resultsObj[(resultsObj.length-1)].className == "results-inner-box"){
								resultsObj[(resultsObj.length-1)].className = "results-inner-box-active";
							}
							if (resultsObj[(resultsObj.length-1)].className == "view-search-results-box"){
								resultsObj[(resultsObj.length-1)].className = "view-search-results-box-active";
							}
							CUTypeAhead.activeObj = resultsObj[(resultsObj.length - 1)];
							break;
						}
					}
				}
				if (CUTypeAhead.activeObj.getElementsByTagName("img")[0] === undefined) {
					document.getElementById("search").value = CUTypeAhead.searchTerm;
				}
				else {
					document.getElementById("search").value = CUTypeAhead.activeObj.getElementsByTagName("img")[0].title;
				}
			}
		}
	}
	if (theTargets.length > 0) {
		var theViewAllHTML = "<div class='view-search-results-box'><div class='view-search-results'><a href='javascript:CUTypeAhead.submit();'>View all search results for &quot;" + theSearchElement.value + "&quot;</a></div></div>"
		theMatchesOutput.innerHTML += theViewAllHTML;
		theMatchesOutput.style.display = "block";
	}
};

CUTypeAhead.submit = function(e)
{

	document.forms["search-form"].submit();
};

CUTypeAhead.hideMatches = function(inEvent)
{
	var theMatchesOutput = document.getElementById("matches");
	var theTypeAheadDiv = document.getElementById("typeahead");
	var theToElement = null;
	if (inEvent.relatedTarget)
	{
		theToElement = inEvent.relatedTarget;
	}
	else if (inEvent.toElement)
	{
		theToElement = inEvent.toElement;
	}
	var theOriginalToElement = theToElement;
	if (theToElement)
	{
		var theFoundParent = false;
		while (theToElement.parentNode)
		{
			theToElement = theToElement.parentNode;
			if (theToElement == theMatchesOutput || theToElement == theTypeAheadDiv)
			{
				theFoundParent = true;
				break;
			}
		}
		if (theFoundParent === false)
		{
			theMatchesOutput.style.display = "none";
		}
	}
};

CUTypeAhead.keydownTrigger = function(e)
{
	var char;
	var evt = (e) ? e : window.event;
	var divObjs = document.getElementById("matches").getElementsByTagName("div");
	var resultsObj = [];
	var activeObj;
	for (i = 0; i < divObjs.length; i++) {
		if (divObjs[i].className == "results-inner-box" || divObjs[i].className == "results-inner-box-active") {
			resultsObj.push(divObjs[i]);
			if (divObjs[i].className == "results-inner-box-active") {
				activeObj = divObjs[i];
			}
		}
	}
	if (activeObj === null || resultsObj.length > 0) {
		resultsObj[0].className = "results-inner-box-active";
	}
};

/**
 *  Attach the event handler to the search box and load the typeahead data.
 */
CUTypeAhead.init = function()
{
	var theSearchElement = document.getElementById("search");
	var theMatchesDiv = document.getElementById("matches");
	var theTypeAhead = document.getElementById("typeahead");
	CUTypeAhead.data = CUTypeAhead.getTypeAheadData(theSearchElement.getAttribute("typeahead"));

	CUTypeAhead.addEvent(theSearchElement,'keyup',CUTypeAhead.keyTrigger); /* if keydown, it won't use the current key in the comparison */
	CUTypeAhead.addEvent(theSearchElement,'mouseover',CUTypeAhead.mouseTrigger); /* if we have already hidden the div by a mouseout, a mouseover will recover it */

	CUTypeAhead.addEvent(theMatchesDiv,'mouseout',CUTypeAhead.hideMatches);
	CUTypeAhead.addEvent(theTypeAhead,'mouseout',CUTypeAhead.hideMatches);
};

/**
 * Retrieve and parse JSON data
 */
CUTypeAhead.getTypeAheadData = function(inURL)
{
	var theHttpRequest;
	var theData;
	if (window.XMLHttpRequest)
	{
		theHttpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		try
		{
			theHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				theHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
			}
		}
	}
	if (!theHttpRequest)
	{
		alert("noHttpRequest");
		return null;
	}
	theHttpRequest.open("GET", inURL, false);
	theHttpRequest.send(null);
	var theResponse = theHttpRequest.responseText;
	return eval(theResponse);
};
CUTypeAhead.addEvent(window,'load',CUTypeAhead.init);

