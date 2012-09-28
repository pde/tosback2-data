var expEnabled = 0;
var expLoaded = 0;
var activated = false;

function renderXp1Zone(pagePath, zoneId, locationId, referer) {
  var xp1RenderUrl =  pagePath + "/?zoneId=" + zoneId + "&locationId=" + locationId;
  if (referer != null) {
      xp1RenderUrl = xp1RenderUrl + "&refererParam=" + referer;
  } 
  var divToBeReplaced = "X" + zoneId;
  if (zoneId != null && typeof(zoneId) != 'undefined' && zoneId != "")
  {
    expEnabled++;
  //  $('#' + divToBeReplaced).css("visibility","hidden");
      $.ajax({
          type: "GET",
          url: xp1RenderUrl,
          timeout: 3000, // 3 seconds
          success: function (data) {
              if (data.indexOf("DoNotShow")== -1) {
                var content = data.substring(data.indexOf("<expZone>")+9, data.indexOf("</expZone>"));
                var contentToBeReplaced = $('#' + divToBeReplaced).html();

                $(document).ready(function() {
                  // invoke function to remove existing footnotes in the footnote zone
                  removeExistingFootnotes(contentToBeReplaced);                                              
                    $('#' + divToBeReplaced).html(content);

                  // invoke function to add New Footnotes in the footnote zone  if there
                  // are footnotes in the new content to be replaced.
                addNewFootnotes('#' + divToBeReplaced);

            // Initialize any modals
            if(window.initModals) {
              initModals();
            }

            //Initial any browse tables on the page
            if (window.initBrowseTable) {
              initBrowseTable();
            }
            if (window.initCardFilters) {
              initCardFilters();
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

function showContent() {
	$('#waitingDiv').remove();
    $('#page-content').css('height', '');
	$('#page-content').css('overflow', 'visible');
    
    if (window.activateCarousel && !activated) {
    	activated = true;
      activateCarousel();
      
    }
}

function renderXp1PrimaryNav(ebcUrl, primaryNavDivId) {

	var currentStrategy = (typeof JSMenuVar_strategy != 'undefined' ? JSMenuVar_strategy : "");
	var currentRegionMajor = (typeof JSMenuVar_BDG_ENT_REGION_MAJOR != 'undefined' ? JSMenuVar_BDG_ENT_REGION_MAJOR : "");
	var currentRegionDma = (typeof JSMenuVar_BDG_ENT_REGION_DMA != 'undefined' ? JSMenuVar_BDG_ENT_REGION_DMA : "");

	if ( 	(
			typeof window.xp_experience != 'undefined'
			&& ("MTS::LDFPOF15" == currentRegionMajor || "MTS::LM4GS4C4S" == currentRegionMajor) 
			&& window.xp_experience.dma == currentRegionDma
			&& $.inArray(Number(window.xp_experience.dma), JSMenuVar_ArrayDMA) != -1
		)
		||
		(
			("MTS::LDFPOF15" != currentRegionMajor && "MTS::LM4GS4C4S" != currentRegionMajor)
			&& typeof window.xp_experience != 'undefined'
			&& window.xp_experience.experience == currentStrategy
	   	)
	   )
	{
		return;
	}
	
	$.ajax({
			type: "GET", //get instead of post
			url: ebcUrl, //reg exp to trim to check for
			success: function (navContent) {
				if (navContent && navContent != '' && navContent.indexOf("DoNotShow") == -1) {
					$('#' + primaryNavDivId).css("visibility", "hidden");
					$('#' + primaryNavDivId).html(navContent);
				}
				
				//Rearrange super nav
				Cof.Header.PrimaryNav.Render();
			},
			complete: function() {
				$('#' + primaryNavDivId).css("visibility", "visible");
				Cof.Header.PrimaryNav();
			}
	});
}


function invokeVsPageTaggingAjaxCall(vsPageTagUrl) {
	$(function(){ 
		ajaxCall(vsPageTagUrl); 
	 }); 
}

function renderVsPageTagging(vsPageTagWwwUrl) {
	$.ajax({
			type: "GET", //get instead of post
			url: vsPageTagWwwUrl, //reg exp to trim to check for
			success: function (vsPageTagAjaxUrl) {
				if (vsPageTagAjaxUrl && vsPageTagAjaxUrl != '' ) {
					invokeVsPageTaggingAjaxCall(vsPageTagAjaxUrl);
				}
			}
	});
}

function invokeSiteCatalystScript(scTagWwwUrl) {
	$.ajax({
			type: "GET", //get instead of post
			url: scTagWwwUrl, //reg exp to trim to check for
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
	$.ajax({
			type: "GET", //get instead of post
			url: xp1DoubleClickTaggingUrl,
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


