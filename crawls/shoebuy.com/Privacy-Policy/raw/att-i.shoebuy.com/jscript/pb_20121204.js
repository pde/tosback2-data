var PbarLoader = new function PbarLoader() {
	var pbar_inst = null;
	var cls = function() {
		var pbarListeners = [];
		// Pbar statuses:
		// 0 - not loading
		// 1 - loading
		// 2 - loaded
		var pbarStatus = 0;
		var rp;
		var pbarRef = null;
		var pbih = '40px';
		if(typeof pbarIHeight !== 'undefined' && pbarIHeight != null) pbih=pbarIHeight;
		var pbib = '';
		if(typeof pbarIBackground !== 'undefined' && pbarIBackground != null) pbib=pbarIBackground;
		var pbh = '14px';
		if(typeof pbarHeight !== 'undefined' && pbarHeight != null) pbh=pbarHeight;
		var pbb = '';
		if(typeof pbarBackground !== 'undefined' && pbarBackground != null) pbb=pbarBackground;
		
		this.getPbarImageHeight = function() {
			return pbih;
		}
		this.setPbarImageHeight = function(height) {
			pbih = height;
		}
		this.getPbarImageBackground = function() {
			return pbib;
		}
		this.setPbarImageBackground = function(background) {
			pbib = background;
		}
		this.getPbarHeight = function() {
			return pbh;
		}
		this.setPbarHeight = function(height) {
			pbh = height;
		}
		this.getPbarBackground = function() {
			return pbb;
		}
		this.setPbarBackground = function(background) {
			pbb = background;
		}
		// Listener should be an object and can implement these functions
		// pbarLoading - called when the promobar beings to load
		// pbarLoaded - called with the promobar has completed loading
		this.addListener = function(listener) {
			if(listener)
				pbarListeners.push(listener);
		};
		this.getPbarRef = function() {
			return pbarRef;
		}
		this.isPbarLoading = function() {
			return pbarStatus === 1;
		}
		this.isPbarLoaded = function() {
			return pbarStatus === 2;
		}
		this.setupPbar = function(pbarUrl, force_pbar) {
			if(pbarStatus === 1 )
				return false;
				
			pbarStatus = 1;
			if(force_pbar) {
				pbarRef = force_pbar;
				createCookie('ShoebuyPbar', force_pbar);
			} else {
				pbarRef = readCookie('ShoebuyPbar');
				if(!pbarRef)
					pbarRef = readCookie('ShoebuyEntry');
			}
			
			if (window.XMLHttpRequest) {
				rp=new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				rp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			if (rp!=null) {
				if (pbarUrl==null || pbarUrl.length == 0) pbarUrl = '/pbar';
				pbarUrl += (pbarRef==null) ? '/pbar.jsp' : '/pbar.jsp?' + pbarRef;
				rp.open('GET',pbarUrl,true);
				rp.onreadystatechange=function (event) {
					if (this.readyState == 4 && pbarStatus < 2) {
						if(this.status == 200) {
							var c = this.responseText;
							if (c.indexOf("href") >= 0) {
								var px;
								if (px = document.getElementById('pbar')) {
									var p2;
									if(p2 = document.getElementById('pbar-async')) {
										p2.innerHTML = '';
									} else {
										p2 = document.createElement('div');
										p2.id= 'pbar-async';
										if (p2 != null)
											px.appendChild(p2);
									}
									if (p2 != null) {
										p2.innerHTML = c;
										if (c.indexOf("img") >= 0) {
											px.style.height=pbih;
											px.style.background=pbib;
										} else {
											px.style.height=pbh;
											px.style.background=pbb;
										}
									}
								}
							}
						}
						pbarStatus = 2;
						for(var i in pbarListeners) {
							var listener = pbarListeners[i];
							if(listener.pbarLoaded)
								listener.pbarLoaded();
						}
					}
				};
				for(var i in pbarListeners) {
					var listener = pbarListeners[i];
					if(listener.pbarLoading)
						listener.pbarLoading();
				}
				rp.send(null);
			} else {
				pbarStatus = 0;
				return false;
			}
		}
	};
	
	cls.instance = function() {
		if(pbar_inst == null)
			pbar_inst = new cls();
		return pbar_inst;
	}
	
	return cls;
};

function setupPbar(pbarUrl, force_pbar) {
	var loader = PbarLoader.instance();
	loader.setupPbar(pbarUrl, force_pbar);
}
