function getWindowSize() {
						var w = {};

						if (self.innerHeight) // all except Explorer
						{
							w.w = self.innerWidth;
							w.h = self.innerHeight;
						}
						else if (document.documentElement && document.documentElement.clientHeight) // Explorer 6 Strict Mode
						{
							w.w = document.documentElement.clientWidth;
							w.h = document.documentElement.clientHeight;
						}
						else if (document.body) // other Explorers
						{
							w.w = document.body.clientWidth;
							w.h = document.body.clientHeight;
						}


						if (self.pageYOffset) // all except Explorer
						{
							w.l = self.pageXOffset;
							w.t = self.pageYOffset;
						}
						else if (document.documentElement && document.documentElement.scrollTop)
							// Explorer 6 Strict
						{
							w.l = document.documentElement.scrollLeft;
							w.t = document.documentElement.scrollTop;
						}
						else if (document.body) // all other Explorers
						{
							w.l = document.body.scrollLeft;
							w.t = document.body.scrollTop;
						}

						var test1 = document.body.scrollHeight, test2 = document.body.offsetHeight;
						if (test1 > test2) // all but Explorer Mac
						{
							w.pw = document.body.scrollWidth;
							w.ph = document.body.scrollHeight;
						}
						else // Explorer Mac; would also work in Explorer 6 Strict, Mozilla and Safari
						{
							w.pw = document.body.offsetWidth;
							w.ph = document.body.offsetHeight;
						}

						return w;
					}

					function position_popup() {
						
						var poverlay = document.getElementById("popup-overlay"), 
						pdiv = document.getElementById("popup-div"), 
						piframe = document.getElementById("popup-iframe");						
						if (pdiv.style.display=="none") return;
												
						var w = getWindowSize();
											
						poverlay.style.width = w.pw+"px"; poverlay.style.height = w.ph+"px";
						poverlay.style.left = 0; poverlay.style.top = 0; 
						pdiv.style.left = (1*w.l+(w.w-pdiv.offsetWidth)/2)+"px"; 						
						var f = parent.document.getElementById("popup-iframe");
						if(f) pdiv.style.top = (1*w.t+(w.h-pdiv.offsetHeight)/2)+"px";
						else pdiv.style.top = 1*w.t+50+"px";						 
					}
					
	function show_popup(src,w) {
		var poverlay = document.getElementById("popup-overlay"),
		pdiv = document.getElementById("popup-div"), 
		piframe = document.getElementById("popup-iframe");				
		
		if(w) piframe.style.width = w+"px";
		poverlay.style.visibility = "visible";		
		pdiv.style.display = "";
		piframe.src = src;
		position_popup();
		hideSelectBox();
		}
		
	function hide_popup() { 
		var poverlay = document.getElementById("popup-overlay"), 
		pdiv = document.getElementById("popup-div"), 
		piframe = document.getElementById("popup-iframe");				
		poverlay.style.visibility = "hidden";
		pdiv.style.display = "none";
		piframe.src = "about:blank";		 
		showSelectBox();
		}
		

		
	function hideSelectBox() {
		var olIe4 = (document.all) ? true : false;
		//if(!olIe4) return;
		var selEl = (olIe4) ? this.document.all.tags("SELECT") : this.document.getElementsByTagName("SELECT");
		for (var i=0; i<selEl.length; i++) {
			if(!olIe4 && selEl[i].size < 2) continue;  // Not IE and SELECT size is 1 or not specified			
			selEl[i].isHidden = 1;
			selEl[i].style.visibility = 'hidden';
		}
	 }
	function showSelectBox() {
		var olIe4 = (document.all) ? true : false;
		//if(!olIe4) return;
		var selEl = (olIe4) ? this.document.all.tags("SELECT") : this.document.getElementsByTagName("SELECT");
		for (var i=0; i<selEl.length; i++) {
			if(typeof selEl[i].isHidden !=  'undefined' && selEl[i].isHidden) {
				selEl[i].isHidden = 0;
				selEl[i].style.visibility = 'visible';
			}
		}
	 }
	 
//EAS8 Fix