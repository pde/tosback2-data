var mainContainer;
var promoTile;
var innerContainer;
var filmStrip;
var videoSelectorXML = null;

var tilePath = null;
var tileHrefPath = null;
var tileFunctionCall = null;
var tileWebtrendTag = null;

var numVideos = 0;
var thumbIterator = 0;
var videoDisplayCount = 5;
var xmlPath;
var popupType = new Array();
var videoTitle = new Array();
var videoWidth;

		
function videoSelector()
{
	this.init = function()
	{
		xmlPath = mainContainer.text();
		if(typeof(console) != "undefined"){console.log(xmlPath);}
		mainContainer.text("");
		mainContainer.css("visibility", "visible");
		
		if (typeof videoSelector_fullWidth == 'undefined') {
			videoWidth = 120;
			mainContainer.append("<div id='promoTile'></div>");
			promoTile = jQuery("#promoTile");
		}
		else
			videoWidth = 160;
		
		mainContainer.append("<div id='innerContainer'></div>");
		innerContainer = jQuery("#innerContainer");
		
		innerContainer.append("<div id='moveButtonLeft'><img src='http://www.att.com/media/en_US/scripts/video_selector/images/leftArrowDisabled.gif' id='buttonLeft' /></div><div id='moveButtonRight'><img src='http://www.att.com/media/en_US/scripts/video_selector/images/rightArrowEnabled.gif' id='buttonRight' /></div><div id='filmstrip'></div>");
		jQuery("#buttonLeft").click(function()
		{
			moveItems("right");
		});
		jQuery("#buttonRight").click(function()
		{
			moveItems("left");
		});
		filmStrip = jQuery("#filmstrip");
		
		getXML();
	}

	function getXML()
	{
		jQuery.ajax(
		{
			type: "GET",
			url: xmlPath,
			dataType: "text",
			success: function(data)
			{
				var xml;
				if (jQuery.browser.msie)
				{
					xml = new ActiveXObject("Microsoft.XMLDOM");
					xml.async = false;
					xml.loadXML(data);
				}
				else
				{
					xml = data;
				}
				videoSelectorXML = jQuery(xml);
				parseXML();
			}
		});
	}
	
	function parseXML()
	{
		if(jQuery.browser.msie)
		{
			if (typeof videoSelector_fullWidth == 'undefined') {
				tilePath = videoSelectorXML.find("videos").attr("panelSrc");
				tileWebtrendTag = videoSelectorXML.find("videos").attr("webtrendsTag");
				tileWebtrendLinkName = videoSelectorXML.find("videos").attr("webtrendsLinkName");
			}
			
			if(videoSelectorXML.find("videos").attr("panelHREF"))
			{
				tileHrefPath = videoSelectorXML.find("videos").attr("panelHREF");
			}
			if(videoSelectorXML.find("videos").attr("panelFunction"))
			{
				tileFunctionCall = videoSelectorXML.find("videos").attr("panelFunction");
			}
		}
		else
		{
			if (typeof videoSelector_fullWidth == 'undefined') {
				tilePath = videoSelectorXML.filter("videos").attr("panelSrc");
				tileWebtrendTag = videoSelectorXML.filter("videos").attr("webtrendsTag");
				tileWebtrendLinkName = videoSelectorXML.filter("videos").attr("webtrendsLinkName");
			}
			
			if(videoSelectorXML.filter("videos").attr("panelHREF"))
			{
				tileHrefPath = videoSelectorXML.filter("videos").attr("panelHREF");
			}
			if(videoSelectorXML.filter("videos").attr("panelFunction"))
			{
				tileFunctionCall = videoSelectorXML.filter("videos").attr("panelFunction");
			}
		}
		
		if (typeof videoSelector_fullWidth == 'undefined')
			buildTile();
		if (jQuery.browser.msie)
		{
			videosNode = videoSelectorXML.find("videos");
			numVideos = videosNode.children("video").length;
		}
		else
		{
			numVideos = videoSelectorXML.children("video").length;
		}
		
		checkButtons();
		
		videoSelectorXML.find("video").each(function(index)
		{
			videoTitle[index] = jQuery(this).attr("title");
		
			filmStrip.append("<div><img src='/media/gvp/video_resources/thumb/" + jQuery(this).attr("thumb") + "' id='thumbImage" + index + "' class='thumbnail' /><img src='http://www.att.com/media/en_US/scripts/video_selector/images/thumb_arrow.png' id='thumbArrow" + index + "' class='thumbPlayArrow' /><p class='vidTitle' id='vidTitle" + index + "'>" + videoTitle[index] + "</p></div>");
			
			popupType[index] = jQuery(this).attr("popupType");
			if(typeof(console) != "undefined"){console.log("popupType " + popupType[index]);}
			
			jQuery("#thumbImage" + index).add("#thumbArrow" + index).click(function(thisObject)
			{
				var tempXMLPath = videoSelectorXML.find("video:eq(" + index + ")").attr("gvpSrc");
				xmlStringForGVPCall = "video_resources/xml/" + tempXMLPath;
				if(tempXMLPath.indexOf("640x360") >= 0)
				{
					if(typeof(console) != "undefined"){console.log("adding large");}
					xmlStringForGVPCall += "&gvpLgFormat";
				}
				if(typeof(console) != "undefined"){console.log("videoThumb clicked " + xmlStringForGVPCall);}
				if(popupType[index] == "div")
				{
					if(typeof(console) != "undefined"){console.log("popupType in if " + popupType[index]);}
					gvp.showPopUp(videoTitle[index], true, true, "div", tempXMLPath);
				}
				else
				{
					if(typeof(console) != "undefined"){console.log("popupType in if none " + popupType[index]);}
					gvp.showPopUp("", true, true, "gvp", xmlStringForGVPCall);
				}
			});
			if (typeof videoSelector_fullWidth == 'undefined')
				var tempLeftMargin = 10 + index * 120;
			else
				var tempLeftMargin = 50 + index * 160;
			jQuery("#thumbImage" + index).css("margin-left", tempLeftMargin);
			jQuery("#thumbArrow" + index).css("margin-left", tempLeftMargin + 87);
			jQuery("#vidTitle" + index).css("margin-left", tempLeftMargin);
		});
	}
			
	function moveItems(direction)
	{
		//console.log("move " + direction);
		
		if(direction == "right" && thumbIterator > 0)
		{
			//filmStrip.animate({left: '+=120'}, 400);
			jQuery(".thumbnail").each(function(index)
			{
				jQuery(this).animate({left: '+=' + videoWidth}, 400);
			});
			jQuery(".vidTitle").each(function(index)
			{
				jQuery(this).animate({left: '+=' + videoWidth}, 400);
			});
			jQuery(".thumbPlayArrow").each(function(index)
			{
				jQuery(this).animate({left: '+=' + videoWidth}, 400);
			});
			thumbIterator--;
		}
		else if(direction == "left" && thumbIterator < numVideos - videoDisplayCount)
		{
			//filmStrip.animate({left: '-=120'}, 400);
			jQuery(".thumbnail").each(function(index)
			{
				jQuery(this).animate({left: '-=' + videoWidth}, 400);
			});
			jQuery(".vidTitle").each(function(index)
			{
				jQuery(this).animate({left: '-=' + videoWidth}, 400);
			});
			jQuery(".thumbPlayArrow").each(function(index)
			{
				jQuery(this).animate({left: '-=' + videoWidth}, 400);
			});
			thumbIterator++;
		}
		
		checkButtons();
	}
	
	function checkButtons()
	{
		if(numVideos > videoDisplayCount)
		{
			if(thumbIterator == 0)
			{
				jQuery("#buttonLeft").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/leftArrowDisabled.gif");
				jQuery("#buttonRight").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/rightArrowEnabled.gif");
			}
			else if(thumbIterator == (numVideos - videoDisplayCount))
			{
				jQuery("#buttonLeft").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/leftArrowEnabled.gif");
				jQuery("#buttonRight").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/rightArrowDisabled.gif");
			}
			else
			{
				jQuery("#buttonLeft").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/leftArrowEnabled.gif");
				jQuery("#buttonRight").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/rightArrowEnabled.gif");
			}
		}
		else
		{
			jQuery("#buttonLeft").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/leftArrowDisabled.gif");
			jQuery("#buttonRight").attr("src", "http://www.att.com/media/en_US/scripts/video_selector/images/rightArrowDisabled.gif");
		}
	}
	
	function buildTile()
	{
		promoTile.append("<img src='" + tilePath + "' id='promoTileImage' />");
		
		if(tileHrefPath != null || tileFunctionCall != null)
		{
			promoTile.css("cursor", "pointer");
			promoTile.click( function(tileObject)
			{
				dcsMultiTrack('DCS.dcsuri','/virtual/'+window.location.pathname,'DCS.dcsref',window.location.href,'DCSext.wtPN',tileWebtrendTag,'DCS.wtNoHit','1','DCSext.wtLinkName',tileWebtrendLinkName);
			
				tileNavigate();
			});
		}
	}
	
	function tileNavigate()
	{
		if(typeof(console) != "undefined"){console.log('in tileNavigate');}
		if(tileHrefPath != null && tileFunctionCall != null)
		{
			if(typeof(console) != "undefined"){console.log("multi call made");}
			prepFunctionCall();
			window.open(tileHrefPath, "_blank");
		}
		else if(tileHrefPath != null)
		{
			if(typeof(console) != "undefined"){console.log("navigation call made");}
			window.open(tileHrefPath, "_blank");
		}
		else if(tileFunctionCall != null)
		{
			if(typeof(console) != "undefined"){console.log("function call made");}
			prepFunctionCall();
		}
	}
	
	function prepFunctionCall()
	{
		
		functionsToCall = tileFunctionCall.split(";");
		console.log(functionsToCall.length);
		
		for(var i=0; i < functionsToCall.length; i++)
		{
			console.log(functionsToCall[i]);
			myFunctionName = functionsToCall[i].split("(");
			console.log("1 " + myFunctionName[0] + "\n2 " + myFunctionName[1]);
			functionParameters = myFunctionName[1].substring(0, myFunctionName[1].indexOf(")"));
			
			console.log("function name " + myFunctionName[0] + "  function parameters " + functionParameters);
			executeFunctionByName(myFunctionName[0], window, functionParameters);
		}
	}
	
	function executeFunctionByName(functionName, context, args)
	{
		//console.log("this " + this);
		var args = Array.prototype.slice.call(arguments, 2);
		//console.log("args " + args + "length " + args.length);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		//console.log("func " + func);
		for(var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		//console.log("context " + context);
		return context[func].apply(this, args);
	}
}

videoSelector = new videoSelector();

jQuery(document).ready(function()
{
// if div with id "videoSelector" does not exists show error in log otherwise
	if(jQuery("#videoSelector").length < 1)
	{
		if (typeof console != 'undefined')
			console.log("containing page does not contain a videoSelector base element")
	}
	else
	{
		mainContainer  = jQuery("#videoSelector");
		videoSelector.init();
	}
});