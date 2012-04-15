namespace("nhn",function(){
	var oBrowser;
	var nTop;// = 556;
	var sGoTop;// = "gotop";
	function $Agent() {
		var isOpera = !!(window.opera);
		var nu = navigator.userAgent;
		var isIE = !isOpera && /MSIE/.test(nu), ie5=false, ie55=false, ie6=false, ie7=false, macIE=false;
		
		if (isIE) {
			/MSIE ([0-9\.]+)/.exec(nu);
			var ver = parseFloat(RegExp.$1);
			switch (ver) {
				case 5   : ie5 =true; break;
				case 5.5 : ie55=true; break;
				case 6   : ie6=true; break;
				case 7   : ie7=true; break;
				default  :
			}
		}			
		return {
			IE     : isIE,
			IE5    : isIE && ie5,
			IE55   : isIE && ie55,
			IE6    : isIE && ie6,
			IE7    : isIE && ie7,
			macIE  : isIE && macIE,
			Gecko  : /Gecko/.test(nu),
			Opera  : isOpera,
			Safari : /WebKit/.test(nu),
			KHTML  : /KHTML/.test(nu)
		};
	};		
	function scrollFunc(){
		var oGoTop = document.getElementById(sGoTop);
		if(oBrowser.IE55){
			oGoTop.style.top = nTop + document.body.scrollTop;
		}	
		else if(oBrowser.IE6){
			oGoTop.style.top = nTop + document.documentElement.scrollTop;
		}	
	};
	function goTopEvt(){
		oBrowser = $Agent();
		if(oBrowser.IE55 || oBrowser.IE6){
			if(window.attachEvent){
				window.attachEvent('onscroll',scrollFunc);
			}
		}
	};
	function setup(top,goTop){
		nTop = top;
		sGoTop = goTop;
	}
	eval(namespace.exports('goTopEvt','setup'));	
});
