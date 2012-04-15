
var cnnDocDomain='';
if(location.hostname.indexOf('justforlaughschicago.com')>0) { cnnDocDomain='justforlaughschicago.com'; }
if(location.hostname.indexOf('thecomedyfestival.com')>0) { cnnDocDomain='thecomedyfestival.com'; }
if(location.hostname.indexOf('tbs.com')>0) { cnnDocDomain='tbs.com'; }
if(location.hostname.indexOf('turner.com')>0) { cnnDocDomain='turner.com'; }
if(cnnDocDomain) { document.domain = cnnDocDomain;}
