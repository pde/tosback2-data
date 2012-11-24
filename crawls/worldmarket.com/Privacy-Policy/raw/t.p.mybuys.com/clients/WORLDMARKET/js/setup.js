function mbcarouselInitCallback(carousel) {
	jQuery('.mbleftnavbtn').bind('click', function() { carousel.prev(); return false; });
	jQuery('.mbrightnavbtn').bind('click', function() { carousel.next(); return false; });
	return false;
}

function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	var done = false;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			callback();

			// Handles memory leak in IE
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};

	head.appendChild(script);
	return false;
}


function initCarousel(visibleitems,scrollitems,dimension) {
	jQuery('#mbcarousel').mbcarousel({
		itemFallbackDimension:dimension,
		wrap: 'circular',
		visible: visibleitems,
		scroll: scrollitems,
		animation: 1000,
		initCallback: mbcarouselInitCallback,
		buttonNextHTML: null,
		buttonPrevHTML: null
	});
}


function loadjQuery(callback) {
	var url = 'http://w.p.mybuys.com/clients/WORLDMARKET/js/lib/jquery-1.4.2.min.js';
	loadScript(url, function () {
		jQuery.noConflict();
		callback();
	});
}
function loadCarousel(callback) {
	var url = 'http://w.p.mybuys.com/clients/WORLDMARKET/js/lib/jquery.mbcarousel.min.js';
	loadScript(url, function() {
		callback();
	});
}



mybuys.processResponseHTML = function(zoneHtmls) {
	clearTimeout(this.requestProcId);
	if (!this.renderOK) return;
	var leftoverZones=[]
	for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++) {
		if (this.zoneKeysToZoneDivIds[zk])
			leftoverZones[zk]=true;
	}
	for (zonekey in zoneHtmls) {
		var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
		if (!zoneDivId) continue;
		var zoneDiv = document.getElementById(zoneDivId);
		if (zoneDiv) {
			zoneDiv.innerHTML=zoneHtmls[zonekey];
			leftoverZones[zonekey]=false;
		}
	}
	for (var zk=0;zk<leftoverZones.length;zk++) {
		if (leftoverZones[zk])
			this.loadFailoverImage(zk);
	}
	if (mybuys.params['chn'] && mybuys.params['chn'] == 'm')
	    {

			$myBuysjQuery("#mybuyspagezone10 .carousel").slideshow({
			width:320,
			height:245,
			panel:true,
			playframe:false,
			title:false,
			//imgresize:true,
			//imgzoom:false,
			effecttime:'fast',

			controls: {
				'hide':false,   // show controls bar on mouse hover
				'first':false,  // goto first frame
				'prev':true,   // goto previouse frame (if it first go to last)
				'play':false,    // play slideshow
				'next':true,   // goto next frame (if it last go to first)
				'last':false,   // goto last frame
				'help':false,   // show help message
				'counter':false  // show slide counter				
			}
		    });
		}
	if(this.pagetype != "pie") {
		visibleitems = scrollitems = 0;
		dimension = 172;
		if (this.params.wrz == 1 || this.params.wrz != 1) {
			if(this.pagetype == "CATEGORY" || this.pagetype == "HIGH_LEVEL_CATEGORY" || this.pagetype == "SEARCH_RESULTS") {
				visibleitems = scrollitems = 3;
			}
			else {
				visibleitems = scrollitems = 5;
				if (this.params.wrz == 10) {
					visibleitems = scrollitems = 2;
				}
				if (this.pagetype == "HOME") {
					visibleitems = scrollitems = 8;
					dimension = 116;
				}
			}
		}
		if (typeof jQuery == 'undefined') {
			loadjQuery(
				function() {
					loadCarousel(
						function() {
							initCarousel(visibleitems,scrollitems,dimension);
						}
					)
				}
			);
		} else if (typeof jQuery.mbcarousel == 'undefined') {
				loadCarousel(
					function() {
						initCarousel(visibleitems,scrollitems,dimension);
					}	
				)
		}
	}
};


	mybuys.setClient("WORLDMARKET");
	mybuys.enableZones();



	mybuys.assembleTemplate ("mbbling,mbimage,mbname,mblistcenteralign,mbsalecenteralign");
	mybuys.setStyle('.mblegend','text-align','left');
	mybuys.setStyle('.mbitem','width','145px', 'PADDING-RIGHT', '4px', 'PADDING-LEFT', '4px');
	//mybuys.setStyle('.mbimg','border-width','1px','border-color','#E5B27F','border-style','solid');
	mybuys.setStyle('.mbimgspan','text-align','center');
	mybuys.setStyle('.mbnamelink','line-height','125%');
	mybuys.setStyle('.mbnamelink:link','color','#313131','font-size','12px','text-decoration','underline','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbnamelink:visited','color','#313131','font-size','12px','text-decoration','underline','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbpricelink:link','color','#999999', 'font-size','12px','font-weight','normal','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbpricelink:visited','color','#999999', 'font-size','12px','font-weight','normal','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbsalelink:link','color','#999999','font-size','12px','font-weight','bold','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbsalelink:visited','color','#999999','font-size','12px','font-weight','bold','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mblistlink:link','color','#999999', 'font-size','12px','font-weight','normal','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mblistlink:visited','color','#999999', 'font-size','12px','font-weight','normal','text-decoration','none','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif');
	mybuys.setStyle('.mbnamerowspan','text-align','center');
	mybuys.setStyle('.mbpricerowspan','padding-bottom','1px','margin-left','-2px','padding-top','5px');
	mybuys.setStyle('.mbrating','padding','0px 0px 2px 0px');
	mybuys.setStyle('.mbimg2','padding-top','3px');
	mybuys.setStyle('.mbzone','920px');

	// Landing page styling
	mybuys.setStyle('ul#mbcarousel','width','3660px','overflow','hidden');

	mybuys.setStyle('.mbslider_x4','width','600px','border','0','position','relative','padding','38px 60px 0px','overflow','hidden');
	mybuys.setStyle('.mbslider_x4 .mbitem','width','180px','border','0','padding','5px 9px','margin-left','auto','margin-right','auto');
	mybuys.setStyle('.mbslider_x4 .mbimgspan','margin-bottom','5px');
	mybuys.setStyle('.mbslider_x4 .mbimg','border','1px none #e8e6d9 !important');
	mybuys.setStyle('.mbslider_x4 .mbpricerowspan','margin','10px 0 10px 0','padding','0');
	mybuys.setStyle('.mbslider_x4 .mbpricerowleft','display','none');
	mybuys.setStyle('.mbslider_x4 .mbpricerowright','width','100%','text-align','center');
	mybuys.setStyle('.mbslider_x4 .mbnamelink','font-size','12px','text-decoration','none','line-spacing','13px');
	mybuys.setStyle('.mbslider_x4 .mbpricelink','font-size','12px','font-weight','bold','text-decoration','none','line-spacing','13px');
	mybuys.setStyle('.mbslider_x4 .mbleftnav','width','14px','position','absolute','left','0','top','0','padding','130px 0 0 32px');
	mybuys.setStyle('.mbslider_x4 .mbrightnav','width','14px','position','absolute','right','0','top','0','padding','129px 45px 0 18px');
	mybuys.setStyle('.mbslider_x4 .mbleftnavbtn','cursor','pointer');
	mybuys.setStyle('.mbslider_x4 .mbrightnavbtn','cursor','pointer');
	mybuys.setStyle('.mbslider_x4 .mbbacksquare','width','606px','height','150%','position','absolute','right','57px','top','13px','padding','0px','background-color','#FFFFFF');
	mybuys.setStyle('.mbslider_x4 .mbtitleimg','width','60px','padding','0px 408px 0px','position','absolute','top','0','right','0');
	mybuys.setStyle('.mbslider_x4 .mbcarousel-item','width','200px !important');

	
	mybuys.setStyle('.mbslider_x5','max-height','320px','width','925px','border','0','position','relative','padding','0px 18px','overflow','visible','background-color','#FFFFFF');
	mybuys.setStyle('.mbslider_x5 .mbitem','width','180px','border','0','padding','0px 2px');
	mybuys.setStyle('.mbslider_x5 .mbimgspan','margin-bottom','5px');
	mybuys.setStyle('.mbslider_x5 .mbimg','border','1px none #e8e6d9 !important');
	mybuys.setStyle('.mbslider_x5 .mbpricerowspan','margin','10px 0 10px 0','padding','0');
	mybuys.setStyle('.mbslider_x5 .mbpricerowleft','display','none');
	mybuys.setStyle('.mbslider_x5 .mbpricerowright','width','100%','text-align','center');
	mybuys.setStyle('.mbslider_x5 .mbnamelink','font-size','12px','text-decoration','none','line-spacing','13px');
	mybuys.setStyle('.mbslider_x5 .mbpricelink','font-size','12px','font-weight','bold','text-decoration','none','line-spacing','13px');
	mybuys.setStyle('.mbslider_x5 .mbleftnav','width','28px','position','relative','left','-35px','top','-200px','padding','0px');
	mybuys.setStyle('.mbslider_x5 .mbrightnav','width','28px','position','relative','right','-930px','top','-252px','padding','0px');
	mybuys.setStyle('.mbslider_x5 .mbleftnavbtn','cursor','pointer');
	mybuys.setStyle('.mbslider_x5 .mbrightnavbtn','cursor','pointer');
	mybuys.setStyle('.mbslider_x5 .mbCarousellist','float','left','width','180px !important','padding','5px 2.5px !important');
	mybuys.setStyle('.mbslider_x5 .mbbacksquare','width','933px','height','150%','position','absolute','right','12px','top','13px','padding','0px','background-color','#FFFFFF');
	mybuys.setStyle('.mbslider_x5 .mbtitleimg','width','200px','padding','0px','position','relative','top','-12px','right','-360px');

	//home zone styling
	mybuys.setStyleByPageType('HOME','ul#mbcarousel','width','2784px','overflow','hidden');
	mybuys.setStyleByPageType('HOME','.mbslider_x5','position','relative');
	mybuys.setStyleByPageType('HOME','.mbslider_x5 .mbitem','width','116px');
	mybuys.setStyleByPageType('HOME','.mbslider_x5 .mbCarousellist','width','116px !important','padding','0 !important');
	mybuys.setStyleByPageType('HOME','.mbslider_x5 .mbleftnav','width','28px','position','relative','left','-35px','top','-96px','padding','0px');
	mybuys.setStyleByPageType('HOME','.mbslider_x5 .mbrightnav','width','28px','position','relative','right','-930px','top','-148px','padding','0px');

	//mobile zone styling
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbslider_x5','width','260px','padding','0px 20px','margin','0px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbitem','width','124px','padding','10px 2px 0px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbCarousellist','float','left','width','130px !important','padding','10px 0px 0px !important');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbrightnav','width','28px','position','relative','left','260px','top','-227px','padding','0px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbleftnav','left','-29px','top','-171px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbtitleimg','padding','0px','text-align','left','font-family','SofiaProLight,Verdana,Geneva,Helvetic,sans-serif','color','#1B9990','font-size','12px','font-weight','bold','position','static');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbnamelink:link','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbnamelink:visited','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbpricelink:link','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbpricelink:visited','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbsalelink:link','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbsalelink:visited','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mblistlink:link','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mblistlink:visited','font-size','10px');
	mybuys.setStyleByPageType('PRODUCT_DETAILS','#mybuyspagezone10 .mbimg','cursor','pointer');
	
	mybuys.applyStyles();

	mybuys.setFailOverMsecs(5000);


