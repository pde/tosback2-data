<!--

function ping() { 

	// Mozilla supports XMLHttpRequest. IE supports ActiveX.  
	xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	
	// the xmlhttp object triggers an event everytime the status changes  
	// triggered() function handles the events
	xmlhttp.onreadystatechange = trigger;
	
	xmlhttp.open("GET", "http://data.qvc.com");
	
	// Mozilla is okay with just send(); but  
	// IE expects a value, so use send(null);  
	xmlhttp.send(null);
} 

function trigger() {
	// if the readyState code is 4 (Completed)  
	// and http status is 200 (OK) then we got a good response  
	// other readyState codes:  
	// 0=Uninitialised 1=Loading 2=Loaded 3=Interactive  
	if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {

		// Calculate Coremetrics response time
		var endTime = new Date();
		var eTime = endTime.getTime();
		var elapsedTime = eTime - sTime;

		// If the response time is greater than two seconds then log it
		if (elapsedTime > 2000)
		{
			xmlhttp2 = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	 		xmlhttp2.open("GET", "http://www.qvc.com/asp/cmloggerUS.asp?time=" + elapsedTime);
			xmlhttp2.send(null);
		}

	}
}

var startTime = new Date();
var sTime = startTime.getTime();

//ping();

document.write('<scr' + 'ipt src="/asp/ServerVars_js.asp">' + '<\/script>');
document.write('<scr' + 'ipt type="text/javascript" src="/content/html/coremetrics/v40/eluminate.js">' + '<\/script>');
document.write('<scr' + 'ipt type="text/javascript" src="/content/html/coremetrics/cmdatatagutils.js">' + '<\/script>');
document.write('<scr' + 'ipt type="text/javascript" src="/content/html/coremetrics/qvccommon.js" defer="defer">' + '<\/script>');

// Calculate Coremetrics response time
var endTime = new Date();
var eTime = endTime.getTime();
var elapsedTime = eTime - sTime;

// If the response time is greater than two seconds then log it
if (elapsedTime > 2000)
{
	var url = "http://www.qvc.com/asp/cmloggerUS.asp?time=" + elapsedTime;
	xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.open("GET", url);
	xmlhttp.send(null);
}
//-->
