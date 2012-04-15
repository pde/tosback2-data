var pbarRef;
var rp;
function setupPbar(pbarUrl, cache_timeout) {
	pbarRef = readCookie('ShoebuyPbar');
	if(!pbarRef)
	  pbarRef = readCookie('ShoebuyEntry');
	
	if (window.ActiveXObject) {
		rp=new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		rp=new XMLHttpRequest();
	}
	if (rp!=null) {
		if (pbarUrl==null || pbarUrl.length == 0) pbarUrl = '/pbar';
		pbarUrl += (pbarRef==null) ? '/pbar.jsp' : '/pbar.jsp?' + pbarRef;
		rp.open('GET',pbarUrl,true);
		rp.onreadystatechange=function (event) {
			if (rp.readyState == 4 && rp.status == 200) {
				var c = rp.responseText;
				if (c.indexOf("href") >= 0) {
					var p2 = document.createElement('div');
					if (p2 != null) {
						p2.innerHTML = c;
						var px = document.getElementById('pbar');
						if (px != null) {
							px.appendChild(p2);
							var pbih = '40px';
							if(typeof pbarIHeight !== 'undefined' && pbarIHeight != null) pbih=pbarIHeight;
							var pbh = '14px';
							if(typeof pbarHeight !== 'undefined' && pbarHeight != null) pbh=pbarHeight;
							if (c.indexOf("img") >= 0) {
								px.style.height=pbih;
							} else {
								px.style.height=pbh;
							}
						}
					}
				}
			}
		};
		rp.send(null);
	}
}
