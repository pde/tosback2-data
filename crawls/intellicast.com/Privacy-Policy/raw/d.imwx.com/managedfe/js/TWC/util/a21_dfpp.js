/**
 * A21 object
 */
window.A21 = window.A21 || {};
(function($){

	/**
	 * This handles throwing of the beacons.
	 */
	var Beacon = {};
	Beacon.beacons = [];
	//Beacon URL
	var BEACON = "http://b.imwx.com/b/";

	var self=this;
	/**
	 * Fires the error beacon
	 *
	 * @param {String} err        the error message
	 * @param {String} position   position name
	 * @param {String} doc        where to attach the beacon
	 */
	Beacon.fireErrorBeacon = function (err, beaconKeywords, doc)
	{


		Beacon.fireBeacon([BEACON, "error?type=DFPP&subtype=", err, "&",beaconKeywords].join(''), doc);
	};

	/**
	 * Fires a generic beacon. It attaches an image to the DOM. 
	 *
	 * @param {String} src  the url for the beacon

	 */
	Beacon.fireBeacon = function(src)
	{
		// if dom isn't passed in, let's just attach the beacon to the parent
		// document body.
		var doc    =  document;
		var beacon = doc.createElement('img');
		var body   = doc.body;

		beacon.src           = src;
		beacon.style.display = "none";

		body && body.appendChild(beacon); 
	};

	/**
	 * fires the impression beacon. 
	 *
	 * @param  {String} keywords the keywords for the beacon
	 * @param  {Object} doc      the document to attach the beacon
	 */
	Beacon.fireTrackingBeacon = function(keywords, doc)
	{
		Beacon.fireBeacon([BEACON, "impression?type=DFPP&",    keywords].join(''), doc);
	};


	/**
	 * Checks if the ads should go into debug mode
	 * returns  {Boolean}   if it's in debug mode or not.
	 */
	function debugMode()
	{
		var isdebug=TWC.pco.get("ad.debug");
		if (!isdebug){
			//try debug param
			var param = document.URL.split('#')[1];
			if (param && param=="adstest"){
				isdebug=true;
			}
		}
	
		return isdebug ;
	}


	/**
	 * Checks if the position is a valid one as defined in the
	 * TWC.pco.get("ad.positions"). 
	 * We dont want to call googletag.display for invalid ad positions out there
	 */
	function isValidPosition(pos)
	{
		var adpos=TWC.pco.get("ad.positions");
		if (typeof(adpos)!="undefined" && typeof(adpos[pos])!="undefined"){
			return true;
		}else{
			return false;
		}
	}


	A21.displayCmd = A21.displayCmd || [];
	var sdynhost = TWC.sdynhost || "d.imwx.com";

	A21.notifyRegistered = function(pos){

		A21.displayCmd.push(function() {
			var height = $("#"+pos).height(),
			width = $("#"+pos).width();
			if(!$("#"+pos).css("display")){
				$("#"+pos).html("<img src='http://s.imwx.com/img/common/blank.gif' width='" + width + "' height='" + height + "'>");
			}
			googletag.display(pos); 
			
		});

		googletag.cmd.push(function() {
			if (isValidPosition(pos)){
				googletag.display(pos); 
			}
		});

	};



	A21.refresh = function(mode,newloc){

		if (!mode ){
			googletag.pubads().refresh();
		}else{
			var	siteId = TWC.pco.get("ad.siteId"),
			pageId = TWC.pco.get("page.pageId");

			TWC.pco.set("currloc",newloc);

			window.googletag = {};
			googletag.cmd = [];
			googletag.cmd.push(function(){
				getAds();
			});
			googletag.cmd = googletag.cmd.concat(A21.displayCmd);

			var wxLocDfrdEvent;
			
			if (newloc && newloc.locid){
				 wxLocDfrdEvent = $.ajax({
					url: ["http://",sdynhost,"/services/wx/",newloc.locid].join(""),
					dataType: "jsonp",
					type:"GET",
					success: function(data) {
						TWC.pco.set("wx",data.wx);
						TWC.pco.set("currloc",data.loc);
					}
				});
			}else{
				 wxLocDfrdEvent=true;
			}

			var adDfrdEvent = $.ajax({
				url: ["http://",sdynhost,"/services/ad/",pageId].join(""),
				dataType: "jsonp",
				data:{
					mode:mode || "default",
					siteId:siteId
				},
				type:"GET",
				success: function(data) {
					if(data){
						var layer = TWC.pco.get('user.mapPrefs.layerName');
						if(layer.indexOf('_') > 0) {
							layer = layer.substring(0, layer.indexOf('_'));
						}
						data.keywords[data.keywords.length] = "mlayer=" + layer;
						TWC.pco.set("ad",data);
					}
				}
			});



			$.when(wxLocDfrdEvent, adDfrdEvent).then(function(){
				TWC.pco.initAdKeywords();
				$.getScript("http://www.googletagservices.com/tag/js/" + A21.googleLib);
			});
		}
	};

	A21.googleLib = A21.googleLib || "gpt.js";
	
	function getAds(){


		try{
			var pcoExists = (TWC && TWC.pco);
			var ad, page;

			A21.slots = [];

			// PCO must exist in all pages that want to use this lib.
			if (pcoExists){
				ad   = TWC.pco.get("ad");
				page = TWC.pco.get("page");

				// Use a different variable for this check... too confusing otherwise
				pcoExists = page && ad && ad.sequence && ad.sequence.length > 0;

				// if TWC.pco.get("ad").sequence is defined and has positions in it, then it must be a dynamic page
				if (!pcoExists ){ 
					Beacon.fireErrorBeacon('noTagServerData');  
				}
			}else{
				Beacon.fireErrorBeacon('noPageConfigObject');  
			}
			if (!pcoExists) return;

			var isDebug=debugMode();
			var ad = TWC.pco.get("ad");
			var cust_params=ad.cust_params;
			var positions = ad.positions;
			var sequence= ad.sequence;
			var zone=ad.zone;
			var site=isDebug?ad.testSite:ad.site;

			var adunit=["/7646",site,zone].join("/");


			var i=0, a=0;

			// ATP-251: JS Error on IE8/IE9 Compat Views
			// Change Owner: Kulanthaivelu Sankaran
			// Change Reason: Always check for property existence before using it. In this case, the for loop
			// will loop through prototype methods in IE9.
			for(a in sequence) {
				positionName=sequence[a];
				if(positions[positionName]) {
					var sz = positions[positionName].sizes;
					var kw = positions[positionName].keywords;

					var slot="";

					var ispreroll=$.inArray("preroll=true",kw);
					var iscompanionOnly=$.inArray("companion=companiononly",kw);
					var iscompanionPlus=$.inArray("companion=companionplus",kw);
					
					if (ispreroll!=-1 || ispreroll>-1){

					}else{
						if (positionName=="WX_Hidden"){
							slot=googletag.defineOutOfPageSlot(adunit+"/outofpage","WX_Hidden");

						}else{
							slot=googletag.defineSlot(adunit,sz,positionName);
						}
						//if companion plus
						if (iscompanionPlus!=-1 || iscompanionPlus>-1){
							slot.addService(googletag.companionAds());
							slot.addService(googletag.pubads());
						}
						else if (iscompanionOnly!=-1 || iscompanionOnly>-1){
							slot.addService(googletag.companionAds());
						}else{
							slot.addService(googletag.pubads());
						}
						A21.slots.push(slot);



						for (var i=0;i<kw.length;i++){
							var kwarr=kw[i].split("=");

							if (kwarr[0] && kwarr[1]){
								if (slot && slot!=""){
									slot.setTargeting(kwarr[0],kwarr[1]);
								}

							}

						}	


					}
				}
			}

			var pagekw=ad.pageKeywords;


			for (i in pagekw){
				try{
					if (typeof pagekw[i]!="undefined"){
						googletag.pubads().setTargeting(i,  pagekw[i]);
					}
				}catch(err){
					Beacon.fireErrorBeacon("jserror:" + error + "in sending" + i + "=" + pagekw[i]);
				}

			} 
			googletag.pubads().collapseEmptyDivs();

			if (typeof(isMobileSite)!="undefined"){
				googletag.pubads().enableAsyncRendering();
			}
			googletag.enableServices();

		}catch(error){
			Beacon.fireErrorBeacon("jserror:" + error);
			
		}
		
	}

	window.googletag = window.googletag || {};
	googletag.cmd = googletag.cmd || [];

	// Apparently, the loading of gpt.js triggers the google.cmd stack
	// So, we should asynchronously load gpt.js when pcoReady fires
	// to insure the pco is in place then all the commands will fire.
	TWC.Events.pcoReady.done(function(){
		$.getScript("http://www.googletagservices.com/tag/js/" + A21.googleLib);
	});
	googletag.cmd.push(function() {
		getAds();
	});
	




	$(document).ready(function() {
		TWC.Events.pcoReady.done(function(){
			var ad=TWC.pco.get("ad");
			if (ad){
				var sequence=ad.sequence;
				var positions= ad.positions;
				var cust_params = ad.cust_params;

				for (a in sequence){
					var positionName=sequence[a];
					var position=positions[positionName];



					// ATP-251: JS Error on IE8/IE9 Compat Views
					// Change Owner: Kulanthaivelu Sankaran
					// Change Reason: Always check for property existence before using it. In this case, the for loop
					// will loop through prototype methods in IE9.
					if(position && isValidPosition(positionName)) {

						var kw = position.keywords;
						var sz = positions[positionName].sizes;

						var ispreroll=$.inArray("preroll=true",kw);
						if (ispreroll!=-1 || ispreroll>-1){
							//do not throw missin pos beacon
						}else{
							var tile=parseInt(a)+1;
							var uKeyword= ["u=",
							               'ord-' , (ad.ord || 'nl'),
							               '*tile-', tile, 
							               '*rmid-', ( TWC.pco.get("user").rmid || 'nl')].join('');

							var tileKeyword="tile=" + tile;

							var poskeywords="";
							var szkeywords= "sz=" + sz.join("|").replace(/,/g,'x');



							for (var i=0;i<kw.length;i++){
								var kwarr=kw[i].split("=");

								if (kwarr[0] && kwarr[1]){
									if (kw[0]!="companion" && kwarr[0]!="preroll"){
										if (poskeywords==""){
											poskeywords= kwarr[0]+"="+kwarr[1] ;
										}else{
											poskeywords= poskeywords + "&" + kwarr[0]+"="+kwarr[1] ;
										}
									}

								}

							}	

							var uri  = "uri=" + escape(window.location.href);
							var pageId="";
							var mode="default";
							var siteId="";
							if (TWC.pco){
								if (TWC.pco.get("page")) {
									pageId="pageId=" + TWC.pco.get("page").pageId;
									mode="mode=" + TWC.pco.get("ad").mode;

								}
								if (TWC.pco.get('ad')){
									site="site=" + TWC.pco.get("ad").site;
								}

							}

							var poskw=[uKeyword,tileKeyword,poskeywords,szkeywords, cust_params, pageId, mode, site, uri].join("&");
							poskw.substr(poskw.length-1)=="&" ? poskw = poskw.substr(0,poskw.length-1) : null ;

							if (!$("#"+positionName)[0]){

								Beacon.fireErrorBeacon("missingpositions",poskw);
							}else{

								Beacon.fireTrackingBeacon(poskw);
							}
						}
					}
				}
			}
		});
	});




})(jQuery);




