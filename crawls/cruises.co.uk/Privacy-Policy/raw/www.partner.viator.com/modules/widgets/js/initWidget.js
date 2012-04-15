
// Internet Explorer Document.getElementById() fix.
if ((document.all) && (!document.getElementById)) {
	document.getElementById = function(id)
	{
		return document.all[id];
	}
}


// Populates a Viator Widget div, by using a cross-domain AJAX request (a.k.a.
// <script> tag hack):
// - Find the div with name "viatorWidgetDiv_key" (e.g. "viatorWidgetDiv_1234")
// - Use the content of all child div's whose id starts with "viatorWidgetDiv_key"
//   to construct a URL to retrieve the widget content.
// - Create a <script> element that references the generated URL.
// - Create a callback function, document.viatorCallback_key.
// - When the generated <script> tag finishes loading, it will call the callback
//   function, passing in the generated HTML. The callback function will then
//   add the HTML to the widget div, and make it visible.
function initViatorWidgetDiv(key, paramsId)
{
	var prefix = "viatorWidgetDiv_" + key;
	var url = "?callback=document.viatorWidgetDivCallback_" + key;
	if (!paramsId) {
		paramsId = prefix;
	}

	var paramsDiv = document.getElementById(paramsId);
	var widgetDiv = document.getElementById(prefix);

	for (var i=0; i<paramsDiv.childNodes.length; i++) {
		var node = paramsDiv.childNodes[i];
		if ((node.id) && (node.id.indexOf(prefix) == 0)) {
			var name = node.id.substring(prefix.length+1);
			var value = node.innerHTML;

			if (name == "action") {
				url = value + url;
			} else {
				url += "&" + name + "=" + escape(value);
			}
		}
	}

	document['viatorWidgetDivCallback_' + key] = function(html)
	{
		widgetDiv.innerHTML = html;
		widgetDiv.style.display = "block";
	}

	var head = document.getElementsByTagName("head")[0];

	var scriptID = 'viatorWidgetDivScriptTag_' + key;
	var oldScript = document.getElementById(scriptID);
	if (oldScript) {
		oldScript.parentNode.removeChild(oldScript);
	}

	var newScript = document.createElement('script');
	newScript.id = scriptID;
	newScript.type = 'text/javascript';
	newScript.src = url;
	head.appendChild(newScript);
}
