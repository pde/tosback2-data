
var g_Unload = new Array();
var g_Onload = new Array();

function addUnloadEvents(g) {
if  (window.onunload)
	{
		if (window.onunload != doUnloadEvents)
		{
			g_Unload[0] = window.onunload;
			window.onunload = doUnloadEvents;
		}		
		g_Unload[g_Unload.length] = g;
	}
	else
		window.onunload = g;
}

function doUnloadEvents() {
	for (var j=0;j<g_Unload.length;j++)
		g_Unload[j]()
}
 
 
//--------------------------------------------------------------------------------


function addOnloadEvents(f) {
	if  (window.onload)
	{
		if (window.onload != doOnloadEvents)
		{
			g_Onload[0] = window.onload;
			window.onload = doOnloadEvents;
		}		
		g_Onload[g_Onload.length] = f;
	}
	else
		window.onload = f;
}


function doOnloadEvents() {
	for (var i=0;i<g_Onload.length;i++)
		g_Onload[i]();
}


