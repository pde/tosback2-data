	BLOOMIES.namespace("BLOOMIES.iShip");

	//BLOOMIES.iShip.shippingCountryCode = YAHOO.util.Cookie.get("shippingCountry");
	BLOOMIES.iShip.shippingCountryCode = getCookie("shippingCountry");
	BLOOMIES.iShip.internationalMode = false;
	
	if (BLOOMIES.iShip.shippingCountryCode && BLOOMIES.iShip.shippingCountryCode != 'US') {
		BLOOMIES.iShip.internationalMode = true;
	} 
	
	//YAHOO.util.Event.onDOMReady(function(){
	window.onload = function(){
		//overriding bag links
		
		if (BLOOMIES.iShip.internationalMode)
		{
		
			var bagLinks = document.getElementById("bl_nav_account_flag");
			var topBagLinks = "";
			if (bagLinks){
				topBagLinks += "<div id='iShip_changeLink'><a href='/internationalContext/index.ognc' class='iShip_changeCountry'>Change country</a></div>" ;
				topBagLinks += "<div id='iShip_flag'><img src='" + assetsServer + "/web20/assets/img/internationalShipping/flags/" + BLOOMIES.iShip.shippingCountryCode + ".jpg' /></div><div class='clearBoth'></div>";
				bagLinks.innerHTML = topBagLinks;
				bagLinks.style.visibility = "visible";
			}
		}
	}
	//})
