/*

>>>> DO NOT EDIT THIS SCRIPT <<<<

Name: Google Analytics Keyword Sleuth 2.0.3 - ga.js Version
Author: Michael Harrison
Created: 01/18/2008
Description: If a visitor arrives from a search engine, grab their exact search query and store it in the user defined variable.

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script src="http://www.[yoursitehere].com/path/to/ga_keyword2.js" type="text/javascript"></script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-XXXXXX-X");
pageTracker._initData();
pageTracker._trackPageview();
</script>

~~~~~~
~~~~~~
Last modified by Michael Harrison on 03/24/2008
*/

function noPercent(x)
{
	x = unescape(x);
	return x.replace(/\+/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function getRef()
{
	ref = document.referrer;
	re = /(\?|&)(q|p|query|encquery|qt|terms|rdata|qs|wd|text|szukaj|k|searchExpr|search_for|string|search_query|searchfor)=([^&]+)/;
	searchq = re.exec(ref);
	if(searchq) {
		searchq[3] = noPercent(searchq[3]);
		sleuthTracker._setVar(searchq[3]);
	}
	else {
		sleuthTracker._setVar(document.referrer);
	}
}

function sleuth()
{
	if(document.location.search.indexOf("gclid")!=-1||document.location.search.indexOf("cpc")!=-1) {
		getRef();
	}
}

var sleuthTracker = _gat._getTracker("UA-1");
sleuthTracker._initData();
sleuth();