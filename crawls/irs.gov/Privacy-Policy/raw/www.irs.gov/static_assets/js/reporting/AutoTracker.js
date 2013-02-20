
function addLinkerEvents(){
	var as = document.getElementsByTagName("a");
	var extTrack = ["irs.gov", "javascript:void(0)"];
	var extDoc = [".doc", ".docx", ".xls", ".xlsx", ".xlsm", ".ppt", ".pptx", ".exe", ".zip", ".pdf", ".txt", ".rss", ".mobi", ".epub", ".mp3", ".wmv", ".asx", ".smi"];
		
	for (var i = 0; i < as.length; i++) {
		var flag = 0;
		var tmp = as[i].getAttribute("onclick");
		
		if (tmp != null) {
			tmp = String(tmp);
			if (tmp.indexOf('_gaq.push') > -1) 
				continue;
		}
		
//================================================================================================================
// Tracking Outbound Links
//================================================================================================================

		for (var j = 0; j < extTrack.length; j++) {
			if (as[i].href.indexOf(extTrack[j]) == -1 && as[i].href.indexOf('google-analytics.com') == -1) {
				flag++;
			}
		}
		
		if (flag == extTrack.length && as[i].href.indexOf("mailto:") == -1) {
			as[i].onclick = function(){
				var splitResult = this.href.split("//");
			    _gaq.push(['_trackEvent', 'Outbound Links', 'Click', splitResult[1]]) + ';' + ((tmp != null) ? tmp + ';' : '');				
			};
		}

//================================================================================================================
// Tracking Downloads - .doc, .docx, .xls, .xlsx, .xlsm, .ppt, .pptx, .exe, .zip, .pdf, .txt
//================================================================================================================
		
		for (var j = 0; j < extDoc.length; j++) {
			if (as[i].href.indexOf(extTrack[0]) != -1 && as[i].href.indexOf(extDoc[j]) != -1) {
				as[i].onclick = function(){
					var splitResult = this.href.split(extTrack[0]);
				    _gaq.push(['_trackEvent', 'Downloads', 'File Download', splitResult[1]]) + ';' + ((tmp != null) ? tmp + ';' : '');
				}
				break;
			}
		}

//================================================================================================================
// Tracking Email Clicks
//================================================================================================================
		
		if (as[i].href.indexOf("mailto:") != -1) {
			as[i].onclick = function(){
				var splitResult = this.href.split(":");
				_gaq.push(['_trackEvent', 'Email Clicks', 'Mail To', splitResult[1]]) + ';' + ((tmp != null) ? tmp + ';' : '');				
			}
		}
		
		
	}
}