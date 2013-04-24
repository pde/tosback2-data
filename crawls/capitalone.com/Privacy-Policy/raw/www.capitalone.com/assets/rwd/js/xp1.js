var Cof = Cof || {};
var expEnabled = 0;
var expLoaded = 0;
var activated = false;
var xp1Done = false;

$(function(){
	if (typeof xp1EnabledPage !== 'undefined') {
		if (xp1EnabledPage) {
			Cof.Init();
		}
	}
});

function renderXp1Zone(pagePath, zoneId, locationId, referer) {
	var xp1RenderUrl =  pagePath + "/?zoneId=" + zoneId + "&locationId=" + locationId;
	if (referer != null) {
		xp1RenderUrl = xp1RenderUrl + "&refererParam=" + referer;
	}
	var divToBeReplaced = "X" + zoneId;
	if (zoneId != null && typeof(zoneId) != 'undefined' && zoneId != "") {
		expEnabled++;
		//$('#' + divToBeReplaced).css("visibility","hidden");
		$.ajax({
			type: "GET",
			url: xp1RenderUrl,
			timeout: 3000, // 3 seconds
			success: function (data) {
				if (data.indexOf("DoNotShow")== -1) {
					var content = data.substring(data.indexOf("<expZone>")+9, data.indexOf("</expZone>"));
					var contentToBeReplaced = $('#' + divToBeReplaced).html();
					
					$(function() {
						// invoke function to remove existing footnotes in the footnote zone
						removeExistingFootnotes(contentToBeReplaced);                                              
						$('#' + divToBeReplaced).html(content);

						// invoke function to add New Footnotes in the footnote zone  if there
						// are footnotes in the new content to be replaced.
						addNewFootnotes('#' + divToBeReplaced);

						// Initialize any modals
						if(Cof.Global) {
							Cof.Global();
						}

						//Initial any browse tables on the page
						if (Cof.Browse) {
							if($('table').hasClass('browse-table')) {
								Cof.Browse();
							}
						}
					});
				}
			},
			complete: function(jqXHR, textStatus) {
				hideLoadingImageAndShowZoneContent(zoneId);
			}
		});
	}
}

function showContent() {
	$('#waitingDiv').remove();
	$('#page-content').css('height', '');
	$('#page-content').css('overflow', 'visible');

	if (window.activateCarousel && !activated) {
		activated = true;
		activateCarousel();
	}
	if (Cof.Browse) {
		if($('table').hasClass('browse-table')) {
			Cof.Browse();
		}
	}
}

function hideLoadingImageAndShowZoneContent(zoneId) {
	expLoaded = expLoaded + 1;

	$('#X'+zoneId+"-ajax-loading").css('display', 'none');
	$('#X'+zoneId).css('display', 'block');
	$('#X'+zoneId+"-ajax-loading").remove();

	if (expLoaded >= expEnabled) {
		showContent();
	}
}

function timeoutOverride() {
	$("div[id$='-ajax-loading']").each(function(x, div) {
		var regex = /(.+)-ajax-loading$/i;
		var zoneId = div.id.match(regex)[1];
		$(div).css('display', 'none').remove();
		$('#' + zoneId).css('display', 'block');
	});
	showContent();
}

function renderXp1PrimaryNav(ebcUrl, primaryNavDivId) {
	var currentStrategy = (typeof JSMenuVar_strategy != 'undefined' ? JSMenuVar_strategy : "");
	var currentRegionMajor = (typeof JSMenuVar_BDG_ENT_REGION_MAJOR != 'undefined' ? JSMenuVar_BDG_ENT_REGION_MAJOR : "");
	var currentRegionDma = (typeof JSMenuVar_BDG_ENT_REGION_DMA != 'undefined' ? JSMenuVar_BDG_ENT_REGION_DMA : "");

	if ((
			typeof window.xp_experience != 'undefined'
			&& ("MTS::LDFPOF15" == currentRegionMajor || "MTS::LM4GS4C4S" == currentRegionMajor) 
			&& window.xp_experience.dma == currentRegionDma
			&& $.inArray(Number(window.xp_experience.dma), JSMenuVar_ArrayDMA) != -1
		) || (
			("MTS::LDFPOF15" != currentRegionMajor && "MTS::LM4GS4C4S" != currentRegionMajor)
			&& typeof window.xp_experience != 'undefined'
			&& window.xp_experience.experience == currentStrategy
		)) {
		return;
	}

	var result = getPostObj(ebcUrl);

	$.ajax({
		type: "POST", //get instead of post
		url: result.url, //reg exp to trim to check for
		data: result.data,
		success: function (navContent) {
			if (navContent && navContent != '' && navContent.indexOf("DoNotShow") == -1) {
				$('#' + primaryNavDivId).css("visibility", "hidden");
				$('#' + primaryNavDivId).html(navContent);
				Cof.Header.Zipcode.init();
			}

			//Rearrange super nav
			Cof.Header.PrimaryNav.Render();
		},
		complete: function() {
			$('#' + primaryNavDivId).css("visibility", "visible");
			Cof.Header.PrimaryNav.Render();
			if (typeof cardFilter !== 'undefined') {
				Cof.Browse.Filter();
			}
		}
	});
}

function invokeVsPageTaggingAjaxCall(vsPageTagUrl) {
	$(function(){ 
		ajaxCall(vsPageTagUrl);
	}); 
}

function renderVsPageTagging(vsPageTagWwwUrl) {
	var result = getPostObj(vsPageTagWwwUrl);

	$.ajax({
		type: "POST", //get instead of post
		url: result.url, //reg exp to trim to check for
		data: result.data,
		success: function (vsPageTagAjaxUrl) {
			if (vsPageTagAjaxUrl && vsPageTagAjaxUrl != '' ) {
				invokeVsPageTaggingAjaxCall(vsPageTagAjaxUrl);
			}
		}
	});
}

function invokeSiteCatalystScript(scTagWwwUrl) {
	var result = getPostObj(scTagWwwUrl);
	result.data["swirl_timer"] = totalTime;

	$.ajax({
		type: "POST", //get instead of post
		url: result.url, //reg exp to trim to check for
		data: result.data,
		success: function (scTagAjaxResponse) {
			if (scTagAjaxResponse && scTagAjaxResponse != '' ) {
				renderVsScTagging(scTagAjaxResponse);
			}
		}
	});
}

function renderVsScTagging(scTagAjaxResponse) {
	var scriptText = 	$("div #siteCatalystXp1").html();
	if (typeof scriptText != 'undefined') {
		$("div #siteCatalystXp1").html(scTagAjaxResponse);
	}
}

function invokeDoubleClickScript(xp1DoubleClickTaggingUrl) {
	var result = getPostObj(xp1DoubleClickTaggingUrl);

	$.ajax({
		type: "POST", //get instead of post
		url: result.url,
		data: result.data,
		success: function (doubleClickAjaxResponse) {
			if (doubleClickAjaxResponse && doubleClickAjaxResponse != '' ) {
				scriptText = $("div #xp1DoubleClick").html();
				if (typeof scriptText != 'undefined') {		
					$("div #xp1DoubleClick").html(doubleClickAjaxResponse);
				}
			}
		}
	});
}

function getPostObj(url) {	
	var loc = url;
	var result = new Object();

	if (url != null) {	
		var paramStart = loc.indexOf('?');
		var data = {};
		if (paramStart > -1) {
			//get query string
			var params = loc.substr(paramStart + 1);

			//reset url to just the path
			loc = loc.substr(0, paramStart);

			var p = params.split('&');

			for (x in p) {
				var pair = p[x];
				if (type(pair) != 'Function') {
					var vals = pair.split('=');
					data[vals[0]] = unescape(vals[1]);
				}

				
			}
		}
		
		result.url = loc;
		result.data = data;
	}
	
	return result;
}

function type(o){
    return !!o && Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
}