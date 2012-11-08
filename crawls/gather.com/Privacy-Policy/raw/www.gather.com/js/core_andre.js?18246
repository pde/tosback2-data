/* onload functions
--------------------------------------------------------------------------------------- */

Event.observe(window, 'load', move_ads);

/* core functions
--------------------------------------------------------------------------------------- */

/* Preload Tooltip Images */
var btImg   = new Image(); btImg.src   = 'images/bt.gif';
var btLgImg = new Image(); btLgImg.src = 'images/bt-large.gif';
var navSearchTermEntered = false;
var pageSearchTermEntered = false;

function customBannerState() {
	if ($('bannerActive1').checked == true) {
		removeClass($('bannerStandard'),'active');
		addClass($('bannerCustom'),'active');
	} else if($('bannerActive0').checked == true) {
		addClass($('bannerStandard'),'active');
		removeClass($('bannerCustom'),'active');
	} else { // Default state
		$('bannerActive0').checked = true;
		addClass($('bannerStandard'),'active');
		removeClass($('bannerCustom'),'active');
	}
};

//function for keyup event of the
//nav search bar to enable submission
//if the text box isn't empty
function isEmpty(element)
{
	if (element.value == '' || element.value == 'enter search terms here')
		navSearchTermEntered = false;
	else
		navSearchTermEntered = true;
};


// Search text blanking
function searchState(element) {
	if (element.value == '') {
		//element.value = 'search articles';
		//element.value = 'enter search terms here';
		//removeClass(element,'focused');

		if(element == $('keywords1'))
		{
			syncBasicAndAdvancedSearchBoxes(false);
			pageSearchTermEntered = false;
		}
		else if(element == $('searchInput'))
		{
			navSearchTermEntered = false;
		}


	//} else if(element.value == 'search articles') {
	} else if(element.value == 'enter search terms here') {
		element.value = '';
		addClass(element,'focused');

		if(element == $('keywords1'))
		{
			syncBasicAndAdvancedSearchBoxes(true);
			pageSearchTermEntered = false;
		}
		else if(element == $('searchInput'))
		{
			navSearchTermEntered = false;
		}
	} else {
		if(element == $('keywords1'))
			pageSearchTermEntered = true;
		else if(element == $('searchInput'))
			navSearchTermEntered = true;
	}
};

function syncBasicAndAdvancedSearchBoxes(add)
{
	if(add)
	{
		addClass($('keywords2'), 'active');
		addClass($('keywords1'), 'active');
	}
	else
	{
		removeClass($('keywords2'), 'active');
		removeClass($('keywords1'), 'active');
	}
}

// Search text blanking for advanced search box
function searchStateAdvanced() {
	var element = $('keywords2');

	if (element.value == '') {

		//element.value = 'enter search terms here';

		syncBasicAndAdvancedSearchBoxes(false);

		pageSearchTermEntered = false;



	//} else if(element.value == 'search articles') {
	} else if(element.value == 'enter search terms here') {
		element.value = '';
		syncBasicAndAdvancedSearchBoxes(true);


		pageSearchTermEntered = false;


	} else {

			pageSearchTermEntered = true;

	}
};


// search select box needs to dynamically change the form action
function searchActionPage() {

    if(!navSearchTermEntered)
        return(false);

	var searchType = $F('contentType');
	var formAction = new String();

	switch (searchType.toLowerCase())
	{
		case 'articles' :
			formAction = 'searchResultsArticles.jsp';
			break;
		case 'images' :
			formAction = 'searchResultsImages.jsp';
			break;
		case 'video' :
			formAction = 'searchResultsVideo.jsp';
			break;
		case 'people' :
			formAction = 'searchResultsMembers.jsp';
			break;
		case 'groups' :
			formAction = 'searchResultsGroups.jsp';
			break;
		default :
			formAction = 'searchResultsArticles.jsp';
			break;
	}
	$('searchForm').action = formAction;
}

function anyTagSubmit(element) {
	var tag = new String(document.getElementById(element).value);
	tag = tag.replace(/[^a-zA-Z _0-9]+/g,'');
	tag = tag.replace(/ /g,'+');
	location.href='http://www.gather.com/'+tag;

	return false;
};


function roll_over(img_name, img_src) {
	document[img_name].src = img_src;
};


function popupSize(url,w,h) {
	window.open(url,"name","location=no, scrollbars=yes, toolbar=yes, width=" + w + ",height=" + h + ", resizable=yes");
};

function roll_over(img_name, img_src) {
	document[img_name].src = img_src;
};


// Adjust the height of the comment text TD based on the comment image.
// In Firefox, upon an initial, non-cached page load, height of image is
// seemingly not factored into the table heights.
// (Eventually this won't be using any tables at all)
function wwwCommentImgAdjust() {
  if ($('commentImg').height > $('featureCommentExcerptOuter').parentNode.scrollHeight) {
    $('featureCommentExcerptOuter').parentNode.style.height = $('commentImg').height+'px';
  }
};

// Function to use a CSS class to perform a Select All action for checkboxes
function selectAllByClass(cls,trigger,parentEl) {

  var elList = document.getElementsByClassName(cls,parentEl);

  if (trigger.checked == true) { // Check fields
    for (i = 0; i < elList.length; i++) {
      elList[i].checked = true;
    }
  } else {  // Uncheck fields
    for (i = 0; i < elList.length; i++) {
      elList[i].checked = false;
    }
  }
};


// Cycle the Captcha image on the Registration page
function regChangeCaptcha() {
	var img = document.getElementById('regCaptchaImg');
	img.src="/jcaptcha.gif?" + Math.random();
	return false;
};



// Function to move Ads from Footer to Column C if necessary
function move_ads() {
/* THIS DEFAULT WILL ERROR OUT THE ADS LOGIC
	if (!pageLength) {
		pageLength = 0;
	}
*/
  if ((typeof colBLength == 'undefined' || colBLength == null || colBLength < 1) && pageLength > 0) {
  var adsHolder001    = $('adsHolder001');
  var adsHolder002    = $('adsHolder002');
  var adsHolder003    = $('adsHolder003');
  var adsHolder004    = $('adsHolder004');
  var adsHolder005    = $('adsHolder005');
  var adsHolder006    = $('adsHolder006');

  var colCAdBanner001 = $('colCAdBanner001');
  var colCAdCPC001    = $('colCAdCPC001');
  var colCAdBanner002 = $('colCAdBanner002');
  var colCAdBanner003 = $('colCAdBanner003');
  var colCAdBanner004 = $('colCAdBanner004');
  var colCAdBanner005 = $('colCAdBanner005');

  // 1st
  // Always display first square-button regardless of page length
  if (adsHolder001 != null && colCAdBanner001 != null &&
      typeof adsHolder001 != 'undefined' && typeof colCAdBanner001 != 'undefined') {
    //alert('[IE] moving Ad 1...');
    colCAdBanner001.appendChild(adsHolder001);
    colCAdBanner001.style.display = 'block'; // IE kludge as prior parent was display:none
  }

  // 2nd
  // Always display first banner regardless of page length
  if (adsHolder002 != null && colCAdBanner002 != null &&
      typeof adsHolder002 != 'undefined' && typeof colCAdBanner002 != 'undefined') {
    //alert('[IE] moving Ad 2...');
    colCAdBanner002.appendChild(adsHolder002);
    colCAdBanner002.style.display = 'block'; // IE kludge as prior parent was display:none
  }

  // 3rd
  // Always display second square-button regardless of page length
  if (adsHolder003 != null && colCAdBanner003 != null &&
      typeof adsHolder003 != 'undefined' && typeof colCAdBanner003 != 'undefined') {
    //alert('[IE] moving Ad 3...');
    colCAdBanner003.appendChild(adsHolder003);
    colCAdBanner003.style.display = 'block'; // IE kludge as prior parent was display:none
  }

  // 4th
  // Show 2nd column C Ads if present and pageLength is greater than:
  // Header, 1 Ad, Footer - then 300px average for half an Ad
  if (pageLength > (264 + 600 + 143 + 300)) {
    if (adsHolder004 != null && colCAdCPC001 != null &&
        typeof adsHolder004 != 'undefined' && typeof colCAdCPC001 != 'undefined') {
      //alert('[IE] moving Ad 4...');
      colCAdCPC001.appendChild(adsHolder004);
      colCAdCPC001.style.display = 'block'; // IE kludge as prior parent was display:none
    }
  }

  // 5th
  // Show 2nd column C Ads if present and pageLength is greater than:
  // Header, 2 Ads, Footer - then 300px average for half an Ad (maybe a long CPC one)
 // alert("pagelength: "+pageLength);
//  if (pageLength > (280 + 125 + 600 + 125 + 600 + 100)) {
    if (adsHolder005 != null && colCAdBanner004 != null &&
        typeof adsHolder005 != 'undefined' && typeof colCAdBanner004 != 'undefined') {
      //alert('[IE] moving Ad 5...');
      colCAdBanner004.appendChild(adsHolder005);
      colCAdBanner004.style.display = 'block'; // IE kludge as prior parent was display:none
    }
//  }
  // 6th
  // Show 2nd column C Ads if present and pageLength is greater than:
  // Header, 2 Ads, Footer - then 300px average for half an Ad (maybe a long CPC one)
//  if (pageLength > (280 + 125 + 600 + 125 + 600 + 100 + 600 + 150)) {
    if (adsHolder006 != null && colCAdBanner005 != null &&
        typeof adsHolder006 != 'undefined' && typeof colCAdBanner005 != 'undefined') {
      //alert('[IE] moving Ad 5...');
      colCAdBanner005.appendChild(adsHolder006);
      colCAdBanner005.style.display = 'block'; // IE kludge as prior parent was display:none
    }
 // }
  }
};

// Hide or show an element with simple style.display change
// Additional if a second object is passed, loop through any select tags inside it and hide them
function disp(el,selCon) {

  if (el.style.display == 'none' || el.style.display == '') { //Cover bases if property is not set
    el.style.display = 'block';

    // Loop through select boxes and hide them for IE6 and it's infinite z-index idiocy
    if (selCon != null && typeof selCon != 'undefined') {
      // NOTE: Use $A() to convert node list to array
      $A(selCon.getElementsByTagName('select')).each(function(sel) {
                                                  sel.style.visibility = 'hidden';
                                                });
    }

  } else if (el.style.display == 'block') {
    el.style.display = 'none';

    if (selCon != null && typeof selCon != 'undefined') {
      $A(selCon.getElementsByTagName('select')).each(function(sel) {
                                                  sel.style.visibility = 'visible';
                                                });
    }

  }
  return false;
};

// Adjust the upload column top margin on the createEditArticle
// page so a long drafts list won't obscure attached images
/*
function upload_draft_margin() {
        $('uploadColumnContainer').style.marginTop = $('draftListContainer').offsetHeight + 'px';
};
*/

// Enable or Disable Guarded Viewing granular sub-choices
function guardedOptions() {
//  if ($F('showAdultContentFalse') == 'false') {
    //$A($('adultChoices').getElementsByTagName('input')).each( function(el){el.disabled = true;  } );
//    $('adultChoices').hide()
//  } else if ($F('showAdultContentTrue') == 'true') {
    //$A($('adultChoices').getElementsByTagName('input')).each( function(el){el.disabled = false; } );
//    $('adultChoices').show()
//  }

  if(typeof Effect == 'undefined') {
    if($F('showAdultContentFalse') == 'false'){ $('adultChoices').hide(); } else { $('adultChoices').show(); }
  } else {
    if($F('showAdultContentFalse') == 'false'){
      Effect.BlindUp($('adultChoices'), {duration:1});
    } else {
      Effect.BlindDown($('adultChoices'), {duration:1});
    }
  }

};

// Constrain an image to a specific square maximum
// (not pretty because it's client-side, but better than nothing)
function constrainImg(img,size) {
  img.height = (img.height > size) ? size : img.height;
  img.width  = (img.width  > size) ? size : img.width;
};

// Toggle show/hide of element (mainly for Careers page)
function showHide(targetId) {
  //$(targetId).style.display = ($(targetId).style.display == 'none') ? '' : 'none';
  $(targetId).toggle();
};

// Adjust the height of an iframe via onload based on content (plus 20px)
function iframeHeight(el,crossdomain) {
  if (crossdomain) {
    // iframeInterval = setInterval(iframeHeightInterval,200);
  } else {
    //find the height of the internal page
    var newHeight = el.contentWindow.document.body.scrollHeight + 20;
    //change the height of the iframe
    el.height = newHeight;
  }
};

// Set height of iframe based on hash, then clear interval
function iframeHeightInterval() {
  /*
  if () {
    clearInterval(iframeInterval);
  }
  */
};

// Impose a maximum character count on a textarea
function imposeMaxLength(Object, MaxLen)
{
  if(Object.value.length > MaxLen)
  {
    Object.value = Object.value.substring(0, MaxLen);
  }
};

// Disregard newline characters
function preventNewline(Object)
{
	Object.value = Object.value.replace(/\r\n/g,"");
	Object.value = Object.value.replace(/\n/g,"");
};


/*  group invite functions
----------------------------------------------------------------------------------- */

function declineGrpInvite(id, el) {
    var url = 'declineGrpInvite.action';
    if ($(el)) {
        if (typeof Effect != 'undefined') {
            new Effect.DropOut(el);
        } else {
        //$(el).hide();
        }
    }
    new Ajax.Updater( {success: ''}, url, { method: 'get',
                                                   parameters: { grpMemberId: id },
                                                   onSuccess: function() { $(el).remove(); },
                                                   onFailure: function() { $(el).show(); alert('Grp Invite decline failed. Please try again later.'); }
                                                 });
};


/* connection functions
--------------------------------------------------------------------------------------- */

function declineConnectionRequest(id, el) {
    var url = 'declineFriend.action';
    if ($(el)) {
        if (typeof Effect != 'undefined') {
            new Effect.DropOut(el);
        } else {
        $(el).hide();
        }
    }
    new Ajax.Updater( {success: ''}, url, { method: 'get',
                                                   parameters: { memberConnectionId: id },
                                                   onSuccess: function() { $(el).remove(); },
                                                   onFailure: function() { $(el).show(); alert('Connection request removal failed. Please try again later.'); }
                                                 });
};

function setInviteProcessedRequest(id, el) {
    var url = 'setInviteProcessed.action';
    if ($(el)) {
        if (typeof Effect != 'undefined') {
            new Effect.DropOut(el);
        } else {
        $(el).hide();
        }
    }
    new Ajax.Updater( {success: ''}, url, { method: 'get',
                                                   parameters: { inviteBaseId: id },
                                                   onSuccess: function() { $(el).remove(); },
                                                   onFailure: function() { $(el).show(); alert('Skip settings failed. Please try again later.'); }
                                                 });
};



/* profile comment functions (much is replicated from comment posting)
--------------------------------------------------------------------------------------- */

/* Preload Comment Button Images */
var commentImgPost    = new Image(); commentImgPost.src    = 'images/buttons/btn_post.png';
var commentImgPosting = new Image(); commentImgPosting.src = 'images/buttons/btn_posting.png';


function checkUploadStatus(form) {

    var statusRes = new Ajax.PeriodicalUpdater('tmpContainer',
                                           'http://www.gather.com/uploadStatus.jspf', { method: 'post', frequency: 10, decay: 2,
                                                        parameters: $(form).serialize(true),
                                                        onSuccess: function(t) {
                                                            responseObj = t.responseText.evalJSON();

                                                            for (var i=0; i<responseObj.length; i++) {
                                                                if(responseObj[i].success) {
                                                                    $('image-'+responseObj[i].contentId).src='http://media-files.gather.com'+responseObj[i].pathToImage;
                                                                    $('procMsgProcessing-'+responseObj[i].contentId).style.display='none';
                                                                    //disable the form field so its not a parameter when serialized
                                                                    $('contentId-'+responseObj[i].contentId).disabled=true;
                                                                    params = $(form).serialize(true);
                                                                    if(!params.contentIds) {
                                                                        statusRes.stop();
                                                                    } else {
                                                                       statusRes.options.parameters = $(form).serialize(true);
                                                                    }

                                                                } else {
                                                                  if(responseObj[i].errorCode == 3) {
                                                                    $('procMsgFailed-'+responseObj[i].contentId).style.display='block';
                                                                    //disable the form field so its not a parameter when serialized
                                                                    $('contentId-'+responseObj[i].contentId).disabled=true;
                                                                    params = $(form).serialize(true);
                                                                    if(!params.contentIds) {
                                                                        statusRes.stop();
                                                                    } else {
                                                                       statusRes.options.parameters = $(form).serialize(true);
                                                                    }
                                                                  } else {
                                                                        $('procMsgProcessing-'+responseObj[i].contentId).innerHTML="processing...";
                                                                  }
                                                                }
                                                            }

                                                        }});
}

function movePhotoIntoAlbum(currentAlbumId, currentPageNumber, photoToMoveElement, targetAlbumElement) {
  new Effect.Highlight(targetAlbumElement, { startcolor: "#f3901c", restorecolor: "#ffffff" });
  photoToMoveElement.hide();

  var fileId = photoToMoveElement.id.substring("fileId-".length);
  var targetAlbumId = targetAlbumElement.id.substring("albumId-".length);

  if ($('organizeErrors')) {
    $('organizeErrors').hide();
  }

  gatherAjax.Request({ url: "organizePhotosIntoAlbum.action", options: {
    method: 'POST',
    parameters: {
      sourceAlbumId: currentAlbumId,
      targetAlbumId: targetAlbumId,
      movingFileId: fileId,
      pageNumber: currentPageNumber},
    onSuccess: function(transport) {
      var response = transport.responseText.evalJSON();

      if (response.success) {
		$("numFiles-albumId-" + currentAlbumId).innerHTML = response.sourceAlbumPhotoCount + " photos";
		$("numFiles-albumId-" + targetAlbumId).innerHTML = response.targetAlbumPhotoCount + " photos";

      	if (currentAlbumId != '') {
        	$("coverFileImg-albumId-" + currentAlbumId).src = response.sourceAlbumCoverFileHref;
          $("coverFileImgBCol-albumId-" + currentAlbumId).src = response.sourceAlbumCoverFileHref;
        }

        if (targetAlbumId != '') {
        	$("coverFileImg-albumId-" + targetAlbumId).src = response.targetAlbumCoverFileHref;
        }

        if (response.gapFileHref != '') {
          $("photos").insert("<li class='photo' id='fileId-" + response.gapFileId
                  + "'><img src='" + response.gapFileHref + "' alt=''/></li>");
          new Draggable("fileId-" + response.gapFileId, { scroll: window, revert: true });
        }

        photoToMoveElement.parentNode.removeChild(photoToMoveElement);

      } else {
        if (response.moveFileErrorMessage != '') {
          if ($('organizeErrors')) {
            $('organizeErrors').innerHTML = response.moveFileErrorMessage;
            $('organizeErrors').show();
          } else {
            alert(response.moveFileErrorMessage);
          }
        } else {
          alert("Move failed");
        }

        photoToMoveElement.show();
      }
    },
    onError: function(transport) {
      alert("An error occurred moving photo");

      photoToMoveElement.show();
    }
  }});
}

function createAlbum(form) {

    gatherAjax.Request({ url: form.action, options: {
    method: 'POST',
    parameters: form.serialize(true),
      onSuccess: function(transport) {
        var response = transport.responseText.evalJSON();
        if(response.success) {
          if (this.top.location.pathname == '/organizePhotosInAlbum.action'){

            //add album to carousel
            var newAlbum = "<a href='organizePhotosInAlbum.action?currentAlbumId=" + response.albumId
                    + "' id='albumId-" + response.albumId + "' class='albumDrop'>"
                    + "<div class='albumIcon' onclick='location.href=$(this).up().href'>"
                    + "<img src='/images/icon_album_cover60.png' alt='' id='coverFileImg-albumId-" + response.albumId + "'/>"
                    + "</div>"
                    + response.albumName
                    + "<div id='numFiles-albumId-" + response.albumId + "' class='med_gray'>0 photos</div>"
                    + "<div class='cb'></div>"
                    + "</a>";
            if (parent.document.getElementById('albumCarouselList').childElements().length > 0) {
              parent.albumCarousel.insertBefore(0, newAlbum);
            } else {
              parent.document.getElementById("albumCarouselContainer").show();
              parent.document.getElementById("albumCarouselList").insert({top: "<li id='albumCarousel-item-1'>" + newAlbum + "</li>"});
              parent.document.createAlbumCarousel();
            }
            parent.Droppables.add("albumId-" + response.albumId, { accept: "photo", hoverclass: "albumHover", onDrop: parent.moveIntoAlbum });
            parent.updateAlbumMessage();

          } else {//if(this.top.location.pathname == '/createEditImage.jsp'){
            //add the album to the dropdown and make it selected
            var optn = document.createElement("OPTION");

            optn.text = response.albumName;
            optn.value = response.albumId;
            optn.selected=true;
            parent.document.getElementById('albumDropdown').options.add(optn);
            if (typeof updateViewRestrictions != "undefined") {
              parent.updateViewRestrictions();
            }
            parent.updateAlbumViewMsg();
            
            parent.updateIfAlbumIsPublic();
          }

          parent.myLightWindow.deactivate();

        } else {
          //add the error message to the page
          if(response.albumNameErrorMessage) {
	        var div = $('createAlbumErrorDiv');
	        $('createAlbumErrorMessage').innerHTML = response.albumNameErrorMessage;
	        div.show();
			addClass($('albumName'), 'errorField');
	      } else {
			removeClass($('albumName'), 'errorField');
	        $('createAlbumErrorDiv').hide();
	      }
          if(response.albumDescriptionErrorMessage) {
            addClass($('albumDescriptionDiv'),'error');
          } else {
            removeClass($('albumDescriptionDiv'),'error');
          }
        }

      }, onError: function(transport){parent.myLightWindow.deactivate();}}});
}

function pingRequest() {

    var currDate = new Date();
    var currTime = currDate.getTime(); 

gatherAjax.Request({ url: '/loginPing.action', options: {
    method: 'GET',
    parameters: {param: currTime},
    onSuccess: function(transport) {

    }, onError: function(transport){alert('error')}}});
}

function loginPing(requestInterval) {
    window.setInterval("pingRequest()", requestInterval);
}



/* search-related functions
--------------------------------------------------------------------------------------- */

function searchFacetMorphOpen(num) {

  var baseFacetColumnWidth = 151;

  var aFacetBlockSubs = $('facetContainer-'+num).getElementsBySelector('.facetBlockSub');
  if(aFacetBlockSubs.last().empty()) aFacetBlockSubs.pop();

  var openWidth = baseFacetColumnWidth + baseFacetColumnWidth * aFacetBlockSubs.size();

  $('facetOuter-'+num).removeClassName('facetOverHid');
  $('facetOuter-'+num).removeClassName('facetBorder');
  var facetContainer = $('facetContainer-'+num);
  facetContainer.addClassName('facetBorder');
  new Effect.Morph(
          'facetContainer-'+num,
          { style:'width:'+openWidth+'px', duration:0.5,
            afterFinish: function() {
              if(typeof Effect != 'undefined') {
                aFacetBlockSubs.each(function(e){new Effect.Appear(e, {duration:0.5, afterFinish:function(){$('facetMore-'+num).hide();$('facetClose-'+num).show();}});});
              } else {
                aFacetBlockSubs.invoke('show');
                $('facetMore-'+num).hide();
                $('facetClose-'+num).show();
              }
              // create an iframe to sit behind the facet container - need this to block select boxes in IE (hacky, I know)
              var height = facetContainer.getHeight();
              var iframe = document.createElement("iframe");
              iframe.id = "facetContainerIframe-" + num;
              iframe.height = height;
              iframe.width = openWidth;
              iframe.frameBorder = 0;
              iframe.style.position = "absolute";
              iframe.style.top = 0;
              iframe.style.left = 0;
              iframe.style.zIndex = 3;
              facetContainer.parentNode.insertBefore(iframe, facetContainer);
            }
          });
};

function searchFacetMorphClose(num) {
  var iframe = $("facetContainerIframe-" + num);
  iframe.parentNode.removeChild(iframe);
  $('facetClose-'+num).hide();
  $('facetMore-'+num).show();
  if(typeof Effect != 'undefined') {
    $('facetContainer-'+num).getElementsBySelector('.facetBlockSub').each(
            function(e) { new Effect.Fade(e, { duration:0.5, afterFinish: function() {
              new Effect.Morph('facetContainer-'+num, {style:'width:138px', duration:0.5, afterFinish: function() {
                $('facetContainer-'+num).removeClassName('facetBorder');
                $('facetOuter-'+num).addClassName('facetBorder');
                $('facetOuter-'+num).addClassName('facetOverHid');

              }
              });
            }
            });
            });
  } else {
    $('facetContainer-'+num).getElementsBySelector('.facetBlockSub').invoke('hide');
    $('facetContainer-'+num).morph('width:138px');
    $('facetContainer-'+num).removeClassName('facetBorder');
    $('facetOuter-'+num).addClassName('facetBorder');
    $('facetOuter-'+num).addClassName('facetOverHid');
    $('facetClose-'+num).hide();
    $('facetMore-'+num).show();
  }

};

function searchFacetMorphUp(num) {
    var iframe = $("facetContainerIframe-" + num);
    if(iframe != null) {
        searchFacetMorphClose(num);
        //alert("hiding facetmore #" + num);
        $('facetMore-'+num).hide();
    }

    $('facetContainer-'+num).getElementsBySelector('.facetBlockFirst').invoke('hide');
    $('facetDown-'+num).show();
    $('facetUp-'+num).hide();
    if( $('facetMore-'+num) != null) {
        $('facetMore-'+num).style.display="none";
    }
}

function searchFacetMorphDown(num) {
    $('facetContainer-'+num).getElementsBySelector('.facetBlockFirst').invoke('show');
    $('facetDown-'+num).hide()
    $('facetUp-'+num).show();
    if( $('facetMore-'+num) != null) {
        $('facetMore-'+num).show();
    }
}


/* misc functions
--------------------------------------------------------------------------------------- */

// Copy-to-Clipboard Automatically function
function copy(inElement) {
    /*
    if (inElement.createTextRange) {
        var range = inElement.createTextRange();
        if (range && BodyLoaded==1) range.execCommand('Copy');
    */
    if (window.clipboardData) {
        window.clipboardData.setData("Text",inElement.value);
    } else {
        var flashcopier = 'flashcopier';
        if(!document.getElementById(flashcopier)) {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed src="/_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(inElement.value)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
    inElement.focus();
    inElement.select();
};


// Show/Hide contaners per toggle click and optionally hide a loading icon or some-such element
function upDownSlide(toggleElm,hideElm) {
  var sr = $(toggleElm);

  if(typeof hideElm != 'undefined') $(hideElm).hide();

  if(typeof Effect == 'undefined') {
    if(sr.visible()){ sr.hide(); } else { sr.show(); }
  } else {
    if(sr.visible()){
      //new Effect.Fade(sr, {duration : 1 });
      Effect.BlindUp(sr, {duration:1});
    } else {
      //new Effect.Appear(sr, {duration : 1 });
      Effect.BlindDown(sr, {duration:1});
    }
  }
};

var upDownSlideReplaceReady = true;
function upDownSlideReplace(elementToHide, elementToShow) {
  var toHide = $(elementToHide);
  var toShow = $(elementToShow);
  if (typeof Effect == 'undefined') {
    toHide.hide();
    toShow.show();
  } else if (upDownSlideReplaceReady) {
    upDownSlideReplaceReady = false;
    new Effect.Parallel(
            [ new Effect.BlindUp(toHide), new Effect.BlindDown(toShow) ],
            { duration: 1, afterFinish: function() { upDownSlideReplaceReady = true; } }
    );
  }
}

// used by editProfileProperty.tag
function displayPrivacyDiv(propertyName, testValue, selectValue) {
  var pePermissionsDiv = document.getElementById('profileEntryPermissionsDiv_' + propertyName);
  var peDualListDiv = document.getElementById('profileEntryDualListDiv_' + propertyName);

  var showElem = '[class="sidebarItem_text"]';
  var hideElem = '[class="sidebarItem_links"]';
  if ($(pePermissionsDiv).visible()) {
    showElem = '[class="sidebarItem_links"]';
    hideElem = '[class="sidebarItem_text"]';
    $(pePermissionsDiv).up('div').removeClassName("expandedPermissionsDiv");
  } else {
    $(pePermissionsDiv).up('div').addClassName("expandedPermissionsDiv");
  }

  var linksToHide = $('editSectionDiv').select(hideElem);
  linksToHide.each(function(hideMe) {
    hideMe.hide();
  });

  var linksToShow = $('editSectionDiv').select(showElem);
  linksToShow.each(function(showMe) {
    showMe.show();
  });

  if (typeof selectValue == 'undefined') {
    selectValue = window['jsDisplayPrivacy_'+ propertyName];
  }

  upDownSlide(pePermissionsDiv);
  showHideDualListDiv(propertyName, selectValue, testValue);

}

// used by editProfileProperty.tag
function showHideDualListDiv(propertyName, selectValue, testValue, updateGlobally) {
  var divElem = document.getElementById('profileEntryDualListDiv_' + propertyName);

  if (selectValue == testValue && !divElem.visible()) {
    Effect.BlindDown(divElem, {duration:1});
  } else if (divElem.visible()) {
    Effect.BlindUp(divElem, {duration:1});
  }

  if (updateGlobally == true) {
    window['jsDisplayPrivacy_'+propertyName] = selectValue;
  }
}

// used by editProfileProperty.tag
function savePrivacyChanges (propertyName) {
  var dualListBox = window['dualListBox_'+ propertyName];
  var hiddenInputName = document.getElementById(propertyName + '_privacyIds');
  var hrefLink = document.getElementById(propertyName + '_permLink');
  var permText = document.getElementById(propertyName + '_permText');
  var permObj = document.getElementById(propertyName + '_privacy');
  var newText = permObj[permObj.selectedIndex].text;
  window['jsDisplayPrivacy_'+propertyName] = permObj[permObj.selectedIndex].value;

  var value = dualListBox.serializeIds(true);

  $(hiddenInputName).value = value;
  $(hrefLink).innerHTML = newText;
  $(permText).innerHTML = newText;
}


// className functions
// Dean Edwards 2004.10.24
// http://dean.edwards.name/
// COMPLETELY UNNECESSARY NOW PROTOTYPE.JS IMPLEMENTED
function addClass(element, className) {
    if (!hasClass(element, className)) {
        if (element.className) element.className += " " + className;
        else element.className = className;
    }
};
function removeClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    element.className = element.className.replace(regexp, "$2");
};
function hasClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return regexp.test(element.className);
};


function profilePropertyOnChange(inputElement) {
  if (inputElement.id == 'children') {
    if (inputElement.selectedIndex >= 0) {
      var selectedOption = inputElement.options[inputElement.selectedIndex];
      var editProfilePropertyPair = $("childTypes").ancestors()[0];
      if (selectedOption.text == "I have children") {
        editProfilePropertyPair.show();
      } else {
        editProfilePropertyPair.hide();
        // TODO: uncheck child type checkboxes
      }
    }
  }
}

function submitNamespaceFeedPrefs(form) {
  gatherAjax.Request({ url: form.action,
    options: { method: "post",
      parameters: $(form).serialize(true),
      onSuccess: function(transport) {
        try {
          var response = transport.responseText.evalJSON();
          if (response.success) {

            if (form.feedEnabled.checked) {
              $("feedPrefText").update("everyone can see My Activities");
            } else {
              $("feedPrefText").update("only I can see My Activities");
            }

            if(!$('activitiesPrivacyChanged')){
            	$("profileSectionId").down(".profileViewDropDown").insert({
              		after: "<div id='activitiesPrivacyChanged' class='messageBox'>The privacy settings for My Activities have been changed.</div>"});
            }

            myLightWindow.deactivate();
            new Effect.Highlight("feedPrefText", { startcolor: "#F3901C" });
          } else {
            window.location = response.redirectUrl;
          }
        } catch (e) { alert("Problem submitting namespace activites settings: " + e); }
      }}});
}



function submitProfileEdits(form) {
  clearOldErrors(form);
  if (validateProfileEdits(form)) {
    gatherAjax.Request({ url: form.action,
                         options: { method: "post",
                                    parameters: $(form).serialize(true),
                                    onSuccess: function(transport) {
                                      try {
                                        var response = transport.responseText.evalJSON(true);
                                        if (response.success != true) {
                                          window.location = response.redirectUrl;
                                        }
                                      } catch (e) {
                                        // Non json response text, just print it to the screen
                                        var sectionId = "profileSection_" + $F(form.section);
                                        $(sectionId).innerHTML = transport.responseText;
                                        myLightWindow.deactivate();
                                        new Effect.Highlight(sectionId, { startcolor: "#F3901C" });
                                      }
                                    }}});
  }
}

function validateProfileEdits(form) {
  var valid = true;
  if (form.firstName && form.firstName.value.blank()) {
    showError(form.firstName, "You must enter a first name");
    valid = false;
  }
  if (form.familyName && form.familyName.value.blank()) {
    showError(form.familyName, "You must enter a last name");
    valid = false;
  }
  if (form.custom001_propertyName && form.custom001 && (form.custom001_propertyName.value.blank() != form.custom001.value.blank())) {
    showError(form.custom001, "You must enter text into each field, or leave both fields blank");
    valid = false;
  }
  if (form.birthday_month && form.birthday_day && form.birthday_year) {
    var blankSelects =
        ($F(form.birthday_month).blank() ? 1 : 0) +
        ($F(form.birthday_day).blank() ? 1 : 0) +
        ($F(form.birthday_year).blank() ? 1 : 0);
    if (blankSelects != 0 && blankSelects != 3) {
      showError(form.birthday_year, "Please enter your full birthday (including month, day, and year) or leave it blank")
      valid = false;
    }
  }
  return valid;
}

function showError(formInput, message) {
  var div;
  var ancestors = $(formInput).ancestors();
  for (var i = 0; i < ancestors.length; i++) {
    if (ancestors[i].className.include("editProfilePropertyPair")) {
      div = ancestors[i];
    }
  }
  if (div != null) {
    div.addClassName("profileEditError");
    div.insert({ after: "<div class='profileEditErrorMessage'>" + message + "</div>" })
  } else {
    alert("Something's wrong! Couldn't find profile property pair div");
  }
}

function clearOldErrors(form) {
  var divs = $$(".profileEditError");
  for (var i = 0; i < divs.length; i++) {
    divs[i].removeClassName("profileEditError");
  }
  divs = $$(".profileEditErrorMessage");
  for (i = 0; i < divs.length; i++) {
    divs[i].remove();
  }
}

/* Quirksmode cookie management functions (http://www.quirksmode.org/js/cookies.html)
--------------------------------------------------------------------------------------- */

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function readCookies(name)
{
	var nameEQ = name + "=";
  var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) {
      alert(name + ':' +c.substring(nameEQ.length,c.length)) ;
    }
	}
	return null;
};

function eraseCookie(name)
{
	createCookie(name,"",-1);
};

function deleteCookie(name, path, domain) {
  if (readCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=0";
// "; expires=Tue, 01-Jan-80 00:00:01 GMT";
  }
};

function toggleDisplayAndEdit(displayDivId, displayTextId, editDivId, inputElementId) {
  if(inputElementId == 'memberStatus' && $('memberStatus').value == "What's on your mind? Enter your status here (e.g., is happy, needs a nap, wants candy).") {
    if ($(editDivId).visible()) {
      $(editDivId).hide();
      $(displayDivId).show();
    } else {
      $(editDivId).show();
      $(displayDivId).hide();
      $(inputElementId).focus();
    }
  } else {
    if ($(editDivId).visible()) {
      $(displayTextId).innerHTML = $(inputElementId).value;
      $(editDivId).hide();
      $(displayDivId).show();
    } else {
      $(inputElementId).value = $(displayTextId).innerHTML;
      $(editDivId).show();
      $(displayDivId).hide();
      $(inputElementId).focus();
    }
  }
}

function cancelMemberUpdateStatus() {
    $('memberStatus').value = $('editText').innerHTML;
	$('editBoxDiv').hide();
	$('editTextDiv').show();
	if($('memberStatus') != null) {
	  $('memberStatus').style.fontStyle='normal';
	  $('memberStatus').style.color='#444';
	}
}

/* Methods for handling status updates used on my page and namespace */
function toggleMemberUpdateStatus() {
  toggleDisplayAndEdit("editTextDiv", "editText", "editBoxDiv", "memberStatus");
  if ($('facebookBox') != null && $('facebookBox').checked) {
	  $('facebookBox').checked = false;
  }
  if ($('twitterBox') != null && $('twitterBox').checked) {
	  $('twitterBox').checked = false;
  }
}

var statusRequestActive = false;
function saveStatus(form) {
  if (statusRequestActive) {
    return;
  } else {
    statusRequestActive = true;
  }

  if ($('saveStatusLink')) {
	  // swap out the save text
	  $('saveStatusLink').innerHTML = 'saving...';
  }
  if ($('mainStatusSubmit')) {
	  $('mainStatusSubmit').hide();
	  $('mainStatusSubmitting').show();
  }
  
  gatherAjax.Request({ url: form.action, options: {
    method: 'post',
    parameters: $(form).serialize(true),
    onSuccess: function(transport) {
      //parse the returned object
      var responseObj = gatherAjax.JSON2Object(transport.responseText);

      //update the div with the new value
      if(responseObj.success) {
        $('memberStatus').value = responseObj.memberStatus;
      }
      if($('saveStatusLink')) {
    	  $('saveStatusLink').innerHTML = "save status";
      }
      if ($('mainStatusSubmitting')) {
    	  $('mainStatusSubmitting').hide();
    	  $('mainStatusSubmit').show();
      }
      
      toggleMemberUpdateStatus();
      new Effect.Highlight("editTextDiv", { startcolor: "#F3901C" });
        statusRequestActive = false;
    }, onError: function(transport){statusRequestActive = false;}}});
}

function toggleInterestsFeedTopics() {
  toggleDisplayAndEdit("feedTopicsDisplayDiv", "feedTopicsDisplayText", "feedTopicsEditDiv", "feedTags");
}

function saveInterestsFeedTopics(form) {
  $('saveFeedTopicsLink').innerHTML = 'saving...';

  gatherAjax.Request({
    url: form.action,
    options: {
      method: "post",
      parameters: $(form).serialize(true),
      onSuccess: function(transport) {
        $("feedContent").innerHTML = transport.responseText;
      }}});
}

function filterMemberFeed(form) {
  gatherAjax.Request({
    url: form.action,
    options: { method: "post",
      parameters: $(form).serialize(true),
      onSuccess: function(transport) {
        $("memberFeed").innerHTML = transport.responseText;
        new Effect.Highlight("memberFeedDiv", { startcolor: "#F3901C" });
      }}});
}

function removeMemberSpotlight(link) {
  gatherAjax.Request({
    url: link.href,
    options: {
      method: "post",
      onSuccess: function(transport) {

        gatherAjax.Request({ url: $('namespaceMemberFeedForm').action, options: {
        method: "post",
        parameters: $('namespaceMemberFeedForm').serialize(true),
        onSuccess: function(transport) {
            $('memberFeed').innerHTML = transport.responseText;
      }}});


      gatherAjax.Request({ url: $('namespaceSpotlightForm').action, options: {
        method: "post",
        parameters: $('namespaceSpotlightForm').serialize(true),
        onSuccess: function(transport) {
            $('spotlightedContent').innerHTML = transport.responseText;
      }}});
      }}});
}

function addMemberSpotlight(link) {
  gatherAjax.Request({ url: link.href, options: {
    method: "post",
    onSuccess: function(transport) {

     gatherAjax.Request({ url: $('namespaceMemberFeedForm').action, options: {
        method: "post",
        parameters: $('namespaceMemberFeedForm').serialize(true),
        onSuccess: function(transport) {
            $('memberFeed').innerHTML = transport.responseText;
      }}});


      gatherAjax.Request({ url: $('namespaceSpotlightForm').action, options: {
        method: "post",
        parameters: $('namespaceSpotlightForm').serialize(true),
        onSuccess: function(transport) {
            $('spotlightedContent').innerHTML = transport.responseText;
      }}});


    }}});
}

//functions for conversation follow
function showDiv(as_name) {
    var el = document.getElementById(as_name);

    if(el) {
      el.style.display = "block";
      el.style.visibility = "visible";
    }
}

function hideDiv(as_name) {
      var el = document.getElementById(as_name);

     if(el) {
        el.style.display = "none";
         el.style.visibility = "hidden";
      }
}

function followConversation(link, divToShow, divToHide, errDiv) {
    gatherAjax.Request({ url: link.href, options: {
       method: "post",
       onSuccess: function(transport) {
          var responseObj = gatherAjax.JSON2Object(transport.responseText);

          //update the div with the new value
          if(responseObj.success) {
            //forward the user to the next page
             showDiv(divToShow);
             hideDiv(divToHide);
             hideDiv(errDiv);
          } else {

            showDiv(errDiv);
             hideDiv('divToHide');
             hideDiv('divToShow');
           $(errDiv).addClassName("active");
           $(errDiv).innerHTML = responseObj.message;

          }

    }, onError: function(transport){alert('error')}}});

}


function ajaxLogin(form) {
  //swap out the save button
  if(loginRequestActive)
        return;
  else
        loginRequestActive = true;

    $('signInError').removeClassName("active");
  //$('saveStatusLink').innerHTML = 'saving...';
  gatherAjax.Request({ url: form.action, options: {
    method: 'post',
    parameters: $(form).serialize(true),
    onSuccess: function(transport) {
      //parse the returned object
      var responseObj = gatherAjax.JSON2Object(transport.responseText);

      //update the div with the new value
      if(responseObj.success) {
        //forward the user to the next page
        window.location.href = responseObj.redirectUrl;
      } else {
        //set the error message for login
        //$("loginError").innerHTML = responseObject.message;
       $('signInError').addClassName("active");
        $('signInError').innerHTML = responseObj.message;

      }
      loginRequestActive = false;
    }, onError: function(transport){loginRequestActive = false;}}});
}

function clearRegisterError(formElement)
{
    //if an error occurred display the error message
    formElement.innerHTML = "";
    formElement.removeClassName("green");
    formElement.addClassName("enabled");
}


function validateRegisterFormField(formElement, domainName, displayError, event)
{
    var params = new Array();

    //this is necessary to ignore
    //the intial tab in to the username field
    if(event) {
        if(event.keyCode == 9 || event.which == 9) return;
    }

    var successFunction = function(transport) {
            //parse the returned object
            var responseObj = gatherAjax.JSON2Object(transport.responseText);

          //update the div with the new value
          if(responseObj.success) {

            //if an error occurred display the error message
            $(responseObj.errorField).innerHTML = responseObj.errorMessage;
            $(responseObj.errorField).addClassName("enabled");

          }


          regFormValidationActive = false;
        };

    if(formElement == $('firstName'))
    {
        params['value'] = $F('firstName');
        params['field'] = 1;
        params['errorField'] = 'firstNameError';
    }
    else if(formElement == $('lastName'))
    {
        params['value'] = $F('lastName');
        params['field'] = 2;
        params['errorField'] = 'lastNameError';
    }
    else if(formElement == $('email'))
    {
    	params['value'] = $F('email');
    	params['field'] = 8;
    	params['errorField'] = 'emailError';
    }
    else if(formElement == $('password'))
    {
        params['value'] = $F('password');
        params['field'] = 4;
        params['errorField'] = 'passwordError';
    }
    else if(formElement == $('passwordConfirm'))
    {
        params['value'] = $F('passwordConfirm');
        params['value2'] = $F('password');
        params['field'] = 5;
        params['errorField'] = 'passwordConfirmError';
    }
    else if(formElement == $('passwordConfirmRunning'))
    {
        params['value'] = $F('passwordConfirm');
        params['value2'] = $F('password');
        params['field'] = 7;
        params['errorField'] = 'passwordConfirmError';
    }
    else if(formElement == $('userName'))
    {

        params['value'] = $F('userName');
        params['field'] = 3;
        params['errorField'] = 'userNameError';

        successFunction = function(transport) {
            //parse the returned object
            var responseObj = gatherAjax.JSON2Object(transport.responseText);

          //update the div with the new value
          if(responseObj.success) {

            //if an error occurred display the error message
            $(responseObj.errorField).innerHTML = responseObj.errorMessage;

            if(responseObj.nameAvailable) {
                $(responseObj.errorField).addClassName("green enabled");
            } else {
                $(responseObj.errorField).removeClassName("green");
                $(responseObj.errorField).addClassName("enabled");
            }


          }


          regFormValidationActive = false;
        }
    } else if(formElement == $('oldPassword')) {
        params['value'] = $F('oldPassword');
        params['field'] = 6;
        params['errorField'] = 'oldPasswordError';
    }

    var localUrl = domainName + '/regFormCheck.ajax';

    gatherAjax.Request({ url: localUrl, options: {
        method: 'post',
        parameters: params,
        onSuccess: successFunction, onError: function(transport){regFormValidationActive=false;}}});

}

function runRegExp(test, value)
{
    var rule1 = new RegExp(test);
    return(rule1.test(value));
}

function isValidEmailAddress (strEmail) {
  var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
  return regex.test(strEmail);
}

function toggleCollapsibleSection(toggleLinkElement) {
  toggleLinkElement = $(toggleLinkElement);
  var div = toggleLinkElement.up();
  var img = toggleLinkElement.down("img");
  if (div.hasClassName("collapsed")) {
    div.removeClassName("collapsed");
    img.src = "/images/chevron_up.png";
  } else {
    div.addClassName("collapsed");
    img.src = "/images/chevron_down.png";
  }
}

function toggleRecommendedMore(action) {
	var moreRecommendedLink = $('moreRecommendedLink');
	var moreRecommended = $('moreRecommended');
	if ( action == 'show') {
		moreRecommendedLink.hide();
		moreRecommended.show();
	} else {
		moreRecommended.hide();
		moreRecommendedLink.show();
	}
}


/***********************************************
* Pausing up-down scroller- � Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
function pausescroller(content, divId, divClass, delay){
  this.content=content //message array content
  this.tickerid=divId //ID of ticker div to display information
  this.delay=delay //Delay between msg change, in miliseconds.
  this.mouseoverBol=0 //Boolean to indicate whether mouse is currently over scroller (and pause it if it is)
  this.hiddendivpointer=1 //index of message array for hidden div
  document.write('<div id="'+divId+'" class="'+divClass+'" style="position: relative; overflow: hidden"><div class="innerDiv" style="position: absolute; width: 100%" id="'+divId+'1">'+content[0]+'</div><div class="innerDiv" style="position: absolute; width: 100%; visibility: hidden" id="'+divId+'2">'+content[1]+'</div></div>')
  if (content.length > 1) {
    var scrollerinstance=this
    if (window.addEventListener) //run onload in DOM2 browsers
      window.addEventListener("load", function(){scrollerinstance.initialize()}, false)
    else if (window.attachEvent) //run onload in IE5.5+
      window.attachEvent("onload", function(){scrollerinstance.initialize()})
    else if (document.getElementById) //if legacy DOM browsers, just start scroller after 0.5 sec
      setTimeout(function(){scrollerinstance.initialize()}, 500)
  }
}

// -------------------------------------------------------------------
// initialize()- Initialize scroller method.
// -Get div objects, set initial positions, start up down animation
// -------------------------------------------------------------------

pausescroller.prototype.initialize=function(){
  this.tickerdiv=document.getElementById(this.tickerid)
  this.visiblediv=document.getElementById(this.tickerid+"1")
  this.hiddendiv=document.getElementById(this.tickerid+"2")
  this.visibledivtop=parseInt(pausescroller.getCSSpadding(this.tickerdiv))
  //set width of inner DIVs to outer DIV's width minus padding (padding assumed to be top padding x 2)
  this.visiblediv.style.width=this.hiddendiv.style.width=this.tickerdiv.offsetWidth-(this.visibledivtop*2)+"px"
  this.getinline(this.visiblediv, this.hiddendiv)
  this.hiddendiv.style.visibility="visible"
  var scrollerinstance=this
  document.getElementById(this.tickerid).onmouseover=function(){scrollerinstance.mouseoverBol=1}
  document.getElementById(this.tickerid).onmouseout=function(){scrollerinstance.mouseoverBol=0}
  if (window.attachEvent) //Clean up loose references in IE
    window.attachEvent("onunload", function(){scrollerinstance.tickerdiv.onmouseover=scrollerinstance.tickerdiv.onmouseout=null})
  setTimeout(function(){scrollerinstance.animateup()}, this.delay)
}


// -------------------------------------------------------------------
// animateup()- Move the two inner divs of the scroller up and in sync
// -------------------------------------------------------------------

pausescroller.prototype.animateup=function(){
  var scrollerinstance=this
  if (parseInt(this.hiddendiv.style.top)>(this.visibledivtop+5)){
    this.visiblediv.style.top=parseInt(this.visiblediv.style.top)-5+"px"
    this.hiddendiv.style.top=parseInt(this.hiddendiv.style.top)-5+"px"
    setTimeout(function(){scrollerinstance.animateup()}, 50)
  }
  else{
    this.getinline(this.hiddendiv, this.visiblediv)
    this.swapdivs()
    setTimeout(function(){scrollerinstance.setmessage()}, this.delay)
  }
}

// -------------------------------------------------------------------
// swapdivs()- Swap between which is the visible and which is the hidden div
// -------------------------------------------------------------------

pausescroller.prototype.swapdivs=function(){
  var tempcontainer=this.visiblediv
  this.visiblediv=this.hiddendiv
  this.hiddendiv=tempcontainer
}

pausescroller.prototype.getinline=function(div1, div2){
  div1.style.top=this.visibledivtop+"px"
  div2.style.top=Math.max(div1.parentNode.offsetHeight, div1.offsetHeight)+"px"
}

// -------------------------------------------------------------------
// setmessage()- Populate the hidden div with the next message before it's visible
// -------------------------------------------------------------------

pausescroller.prototype.setmessage=function(){
  var scrollerinstance=this
  if (this.mouseoverBol==1) //if mouse is currently over scoller, do nothing (pause it)
    setTimeout(function(){scrollerinstance.setmessage()}, 100)
  else{
    var i=this.hiddendivpointer
    var ceiling=this.content.length
    this.hiddendivpointer=(i+1>ceiling-1)? 0 : i+1
    this.hiddendiv.innerHTML=this.content[this.hiddendivpointer]
    this.animateup()
  }
}

pausescroller.getCSSpadding=function(tickerobj){ //get CSS padding value, if any
  if (tickerobj.currentStyle)
    return tickerobj.currentStyle["paddingTop"]
  else if (window.getComputedStyle) //if DOM2
    return window.getComputedStyle(tickerobj, "").getPropertyValue("padding-top")
  else
    return 0
}
/* end pausescroller */

function logSlideshowClick(theAlbumId) {
    var lock = false;
    document.body.style.cursor = "wait";
    while (lock) { /* wait for lock to be released */ }
    lock = true;
    //alert('before ajax');
    gatherAjax.Request({ url: "logSlideshowViewEvent.action",
                         options: {
                           method: 'get',
                         parameters: {albumId: theAlbumId},
                           onSuccess: function(transport) {
                             lock = false;
                             document.body.style.cursor = "auto";
                           },
                           onException: function(request, e) {
                             lock = false;
                             alert(e.message);
                             document.body.style.cursor = "auto";
                           }
                         }});
    //alert('after ajax');
    return false ;
 }

function launchSlideshow(albumId) {
    logSlideshowClick(albumId);

    var x = ((screen.availWidth - 600) / 2);
    var y = ((screen.availHeight - 650) / 2);
    x = (x > 0) ? x : 0;
    y = (y > 0) ? y : 0;

    var newwindow=window.open('viewSlideshow.action?albumId=' + albumId,'viewslideshow_' + albumId,'height=650,scrollbars=yes,width=600,top=' + y + ',left=' + x);
    if (window.focus) {newwindow.focus()}
}

function processWebmailLogin(form) {
    gatherAjax.Request({ url: form.action, options: {
    method: 'POST',
    parameters: form.serialize(true),
    onSuccess: function(transport) {
    	try {
    	    if (transport.responseText.indexOf('inviteContentWebmailForm') >= 0) {
                $('lightwindow_contents').innerHTML = transport.responseText;
            } else {
               	myLightWindow.reloadWindow(transport.responseText);
            }
    	} catch (ex) {
    	    alert(ex);
    	}
    }, onError: function(transport){
    	myLightWindow.deactivate();
    }, onException: function(request, e) {
        alert(e.message);
    }}});
}


function addEmailsFromAddressBook(contactCheckboxes, target) {
    var result = [];

    if (target.value.length > 0) {
        target.value.split(',').each(function(item) {
            result.push(item.strip());
        });
    }

    contactCheckboxes.each(function(chk) {
      if (chk.checked) {
        if (result.length > 0) {
            result.push($F(chk));
        } else {
            result.push($F(chk));
        }
      }
    });

    var toAdd = result.uniq();
    var strContacts = '';

    if (toAdd.length > 0) {
        toAdd.each(function(item) {
            if (strContacts.length > 0)
                strContacts += ', ';
            strContacts += item.strip();
        });
    }
    target.value = strContacts;
}

function showHideMoreInfo(shortContainerObj, fullContainerObj, moreOrless) {
    if (shortContainerObj && fullContainerObj) {
        if (moreOrless == 'more') {
            shortContainerObj.style.display = 'none';
            fullContainerObj.style.display = '';
        }
        else {
            shortContainerObj.style.display = '';
            fullContainerObj.style.display = 'none';
        }
    }
}

function genericSearchState(element, defaultSearchText) {
	if (element.value == "") {
        element.value = defaultSearchText;
        removeClass(element, "focused");
    } else if (element.value == defaultSearchText) {
        element.value = "";
        addClass(element, "focused");
    }
}

function doGroupSearch(searchUrl) {
	location.href = searchUrl + '?keywords=' + $F('grpSearchBox');
}

function stopFollowingConversation(elementId) {
    $(elementId+'stopFollow').value='true';
    $(elementId+'cell').style.backgroundColor='#EEEEEE';
    $(elementId+'commandDiv').hide();
    $(elementId+'messageDiv').show();
}

function authorizeTwitter() {
  window.open('twitterAuthRequest.action');
}

function authorizeFacebook() {
  window.open('facebookAuthRequest.action');
}

function checkSocialNetworkEnabled(socialNetworkName, url){

    var result;
  
    var req = gatherAjax.Request({
        url: url,
        options: {
            method: 'POST',
            asynchronous: false,
            parameters: {
                socialNetworkName: socialNetworkName
              },
            onSuccess: function(t) {
                responseObj = t.responseText.evalJSON();
                result = responseObj.enabled;
            },
            onError: function(t){
              result = false;
              //return false;
            }
        }
    });
    
    return result;
}

function enableBothSocialNetworks() {

  window.open("socialNetworkAuthRequests.action");

}

function processSocialNetworkSharingAuthorizations(twitterCheckBox, facebookCheckBox, url) {

  var twitterChecked = false;
  var twitterEnabled = false;
  var facebookChecked = false;
  var facebookEnabled = false;

  if($(twitterCheckBox) != null && $(twitterCheckBox).checked) {
    twitterChecked = true;
    twitterEnabled = checkSocialNetworkEnabled('twitter', url);
  }
  
  if($(facebookCheckBox) != null && $(facebookCheckBox).checked) {
    facebookChecked = true;
    facebookEnabled = checkSocialNetworkEnabled('facebook', url);
  }
  
  if(!twitterChecked && !facebookChecked) {
    return;
  }

  if(twitterChecked && !twitterEnabled && facebookChecked && !facebookEnabled) {
    enableBothSocialNetworks();
  } else {
   
    if(twitterChecked && !twitterEnabled) {
      authorizeTwitter();
    }
   
    if(facebookChecked && !facebookEnabled) {
      authorizeFacebook();
    }
  }
}

  var currentAlbumIsPublic = true;

  function updateIfAlbumIsPublic() {
      
      var result = true;
      
      if($('albumDropdown').selectedIndex > 0) {
            var req = gatherAjax.Request({
                url: 'checkAlbumIsPublic.action',
                options: {
                    method: 'POST',
                    asynchronous: false,
                    parameters: {
                        albumId: $('albumDropdown')[$('albumDropdown').selectedIndex].value
                      },
                    onSuccess: function(t) {
                        responseObj = t.responseText.evalJSON();
                        result = responseObj.albumPublic;
                    },
                    onError: function(t){
                      result = false;
                    }
                }
            });
      }         
      
      currentAlbumIsPublic = result;
      
      if(!currentAlbumIsPublic) {

        $('shareOnTwitter').checked=false;
        $('shareOnFacebook').checked=false;
        $('shareOnTwitter').disabled=true;
        $('shareOnFacebook').disabled=true;
        $('twitterLabel').style.color="#bbb";
        $('facebookLabel').style.color="#bbb";
      
      } else {
        
        $('shareOnTwitter').disabled=false;
        $('shareOnFacebook').disabled=false;
        $('twitterLabel').style.color="#444";
        $('facebookLabel').style.color="#444";
      
      }
  }
  
  function shareContentButtonHover(name, state) {
  
    if(state == 'true') {
      var left = document.getElementById('shareContentBtnLeftDiv-'+name);
      left.className = 'shareContentHoverBtnLeft';
      var right = document.getElementById('shareContentBtnRightDiv-'+name);
      right.className = 'shareContentHoverBtnRight';
      var fill = document.getElementById('shareContentBtnFillDiv-'+name);
      fill.className = 'shareContentHoverBtnFill';

    } else {
      var left = document.getElementById('shareContentBtnLeftDiv-'+name);
      left.className = 'shareContentBtnLeft';
      var right = document.getElementById('shareContentBtnRightDiv-'+name);
      right.className = 'shareContentBtnRight';
      var fill = document.getElementById('shareContentBtnFillDiv-'+name);
      fill.className = 'shareContentBtnFill';
    }
  }