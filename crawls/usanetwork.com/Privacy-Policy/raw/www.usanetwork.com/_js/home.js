var usa_debug = true; //temporary
var usa_currentHomeFeatureId = 0;
var usa_nextHomeFeatureId = 0;
var usa_currentUsaFeatureRotationItem;
var usa_showNowUsaFeatureRotationItem;
var usa_totalUsaFeatureRotationItems;
var usa_featureRotationTimeout;
var usa_featureRotationInterval = 20000;
var usa_currentBodyClass = '';
var usa_videoPlaying = false;
var usa_videoAdPlaying = false;
var fwSiteSection = 'usa_usa_home';

function usa_summarize(input, maxLength)
{
	var inputLength = input.length;
	var adjustedMaxLength = maxLength;
	
	if ((navigator.platform).toLowerCase().indexOf('win') != -1)
	{
		adjustedMaxLength = adjustedMaxLength - 3;
	}
	if (inputLength <= adjustedMaxLength)
	{
		return input;
	}
	else
	{
		var output = '';
		var inputPieces = input.split(' ');
		for (var i=0; i<inputPieces.length ; i++)
		{
			if ((output + inputPieces[i]).length <= adjustedMaxLength)
			{
				output += inputPieces[i] + ' ';
			}
			else
			{
				break;
			}
		}
		output = $.trim(output);
		output.substr(0, (output.length - 3));
		output = $.trim(output);
		output += '&#8230;';
		return output;
	} 
}

function usa_buildHomeScheduleModule(options)
{
	usa_debugOut('fn: usa_buildHomeScheduleModule()');
	usa_debugOut(options);

	// setup main defaults
	var default_args = {
		'target' : '',
		'data' : '',
		'max' : 6
	}
	
	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}
	
	var max = (options['data'].item.length < options['max']) ? options['data'].item.length : options['max'];
	
	if (typeof options['data'] == 'object')
	{
		var html = '';
		
		html += '<div class="dateToday">'+options['data'].attributes.date+'</div>';
		html += '<h3>On Now</h3>';
		html += '<div class="date">'+options['data'].currentitem.time+'</div>';
		html += '<div class="show" title="'+options['data'].currentitem.show+options['data'].currentitem.showtitle+'">'+usa_summarize(options['data'].currentitem.show+options['data'].currentitem.showtitle, 30)+'</div>';
		html += '<h3>Tonight</h3>';
		
		for (var i=0 ; i<max ; i++)
		{
			var showName = options['data'].item[i].show;
			var showDescription = options['data'].item[i].showtitle;
			var showTime = options['data'].item[i].time;
			
			html += '<div class="showing"><div class="date">'+showTime+'</div><div class="episode" title="'+showName+showDescription+'">'+usa_summarize((showName+showDescription),30)+'</div></div>';
		}
		html += '<div class="clear"></div>';
		$(options['target']).html(html);
	}
}

function usa_buildHomeFeatureRotation(options)
{
	usa_debugOut('fn: usa_buildHomeFeatureRotation()');
	usa_debugOut(options);
	
	// setup main defaults
	var default_args = {
		'target' : '',
		'data' : ''
	}
	
	// override defaults with arguments
	for (var index in default_args)
	{
		if (typeof options[index] == "undefined") options[index] = default_args[index];
	}
	
	if (typeof options['data'] == 'object')
	{
		var html = '';
		var navHtml = '';
		var firstVideoId = '';
		var bodyClass = (options['data'].feature[0].attributes.title).replace(/\s/g, '').toLowerCase();
		$('body').addClass(bodyClass);
		usa_currentBodyClass = bodyClass;
		
		navHtml += '<div id="usa_featureRotationNav">';
		html += '<div id="usa_featureRotation">';
		for (var i=0 ; i<options['data'].feature.length ; i++)
		{
			title = options['data'].feature[i].attributes.title;
			subTitle = options['data'].feature[i].attributes.subTitle;
			url = options['data'].feature[i].content.attributes.link;
			target = options['data'].feature[i].content.attributes.target;
			img = options['data'].feature[i].content.attributes.src;
			videoId = options['data'].feature[i].video.attributes.clipID;
			
			if (i==0)
			{
				firstVideoId = videoId;
			}
			
			// temporary fix
			/*img = img.replace('../..', '');
			img = img.replace('images/home', '_img/home');
			img = img.replace('.swf', '.jpg');*/
			
			html += '<div class="usa_featureRotationItem" id="usa_featureRotationItem_'+i+'" style="background: #000000 url('+img+') top right"><a href="'+url+'" target="'+target+'"><span>'+subTitle+'</span></a></div>';
			navHtml += '<a href="javascript:usa_showSpecifcFeatureRotation('+i+');" id="usa_featureRotationNavItem_'+i+'"><span class="leftTab"></span><span class="midTab">'+title+'</span><span class="rightTab"></span></a>';
		}
		navHtml += '</div>';
		html += '</div>';
		
		html += '<div class="clear"></div>';
		$(options['target']).html(html+navHtml);
		
		usa_debugOut('play video: ' + usa_homeFeature.feature[0].video.attributes.clipID);
		
		if (usa_homeFeature.feature[0].video.attributes.clipID != '')
		{
			document.getElementById('usa_videoIframe').src = "/videos/small.html?_usa/videos/_" + usa_homeFeature.feature[0].video.attributes.clipID;
			$('#usa_videoIframe').css('display', 'block');
		}
		else
		{
			document.getElementById('usa_videoIframe').src = "javascript:'<html></html>'";
			$('#usa_videoIframe').css('display', 'none');
		}
	}
}


function usa_updateFeatureRotationNav()
{
	usa_debugOut('fn: usa_updateFeatureRotationNav()');
	
	$("#usa_featureRotationNav a").removeClass('on');
	$("#usa_featureRotationNavItem_" + usa_currentUsaFeatureRotationItem).addClass('on');
}

function usa_showSpecifcFeatureRotation(i)
{
	usa_debugOut('fn: usa_showSpecifcFeatureRotation('+i+')');
	
	if (usa_videoAdPlaying == true)
	{
		return;
	}
	
	usa_videoPlaying = false;
	
	var bodyClass = (usa_homeFeature.feature[i].attributes.title).replace(/\s/g, '').toLowerCase();
	$('body').removeClass(usa_currentBodyClass);
	usa_currentBodyClass = bodyClass;
	$('body').addClass(bodyClass);
	
	usa_debugOut('play video: ' + usa_homeFeature.feature[i].video.attributes.clipID);
	
	if (usa_homeFeature.feature[i].video.attributes.clipID != '')
	{
		document.getElementById('usa_videoIframe').src = "/videos/small.html?_usa/videos/_" + usa_homeFeature.feature[i].video.attributes.clipID + "/autoplay";
		$('#usa_videoIframe').css('display', 'block');
	}
	else
	{
		document.getElementById('usa_videoIframe').src = "javascript:'<html></html>'";
		$('#usa_videoIframe').css('display', 'none');
	}
	
	clearTimeout(usa_featureRotationTimeout);
	var fr = $("#usa_featureRotation");
	usa_showNowUsaFeatureRotationItem = i;
	fr.find(".usa_featureRotationItem").each(function(index) {
		if (index == usa_currentUsaFeatureRotationItem)
		{
			clearTimeout(usa_featureRotationTimeout);
			$(this).fadeOut('fast', function () {
				
				usa_currentUsaFeatureRotationItem = usa_showNowUsaFeatureRotationItem;
				usa_updateFeatureRotationNav();
				
				var fr = $("#usa_featureRotation");
				fr.find(".usa_featureRotationItem").each(function(index) {
					if (index == usa_currentUsaFeatureRotationItem)
					{
						$(this).fadeIn('fast', function () {
							usa_featureRotationTimeout = setTimeout('usa_showNextFeatureRotationItem()', usa_featureRotationInterval);
						});
						return false;
					}
				});
			});
			return false;
		}
	});
}

function usa_showNextFeatureRotationItemIn(seconds)
{
	var timeToShow = seconds * 1000;
	setTimeout('usa_showNextFeatureRotationItem()', timeToShow);
}

function usa_showNextFeatureRotationItem()
{
	usa_debugOut('fn: usa_showNextFeatureRotationItem()');
	
	if (usa_videoPlaying == true || usa_videoAdPlaying == true)
	{
		return;
	}
	
	var fr = $("#usa_featureRotation");
	if (typeof usa_currentUsaFeatureRotationItem == 'undefined')
	{
		fr.find(".usa_featureRotationItem").each(function(index) {
			if (index == 0)
			{
				$(this).fadeIn('slow', function () {
					usa_currentUsaFeatureRotationItem = 0;
					
					if (usa_totalUsaFeatureRotationItems > 1)
					{
						usa_featureRotationTimeout = setTimeout('usa_showNextFeatureRotationItem()', usa_featureRotationInterval);
						usa_updateFeatureRotationNav();
					}
				});
				return false;
			}
		});
	}
	else
	{
		fr.find(".usa_featureRotationItem").each(function(index) {
			if (index == usa_currentUsaFeatureRotationItem)
			{
				clearTimeout(usa_featureRotationTimeout);
				$(this).fadeOut('slow', function () {
					
					if (usa_currentUsaFeatureRotationItem == usa_totalUsaFeatureRotationItems - 1)
					{
						usa_currentUsaFeatureRotationItem = 0;
					}
					else
					{
						usa_currentUsaFeatureRotationItem++;
					}
					
					var bodyClass = (usa_homeFeature.feature[usa_currentUsaFeatureRotationItem].attributes.title).replace(/\s/g, '').toLowerCase();
					$('body').removeClass(usa_currentBodyClass);
					usa_currentBodyClass = bodyClass;
					$('body').addClass(bodyClass);
					
					usa_debugOut('play video: ' + usa_homeFeature.feature[usa_currentUsaFeatureRotationItem].video.attributes.clipID);
					
					if (usa_homeFeature.feature[usa_currentUsaFeatureRotationItem].video.attributes.clipID != '')
					{
						document.getElementById('usa_videoIframe').src = "/videos/small.html?_usa/videos/_" + usa_homeFeature.feature[usa_currentUsaFeatureRotationItem].video.attributes.clipID;
						$('#usa_videoIframe').css('display', 'block');
					}
					else
					{
						document.getElementById('usa_videoIframe').src = "javascript:'<html></html>'";
						$('#usa_videoIframe').css('display', 'none');
					}
					
					usa_updateFeatureRotationNav();
					
					var fr = $("#usa_featureRotation");
					fr.find(".usa_featureRotationItem").each(function(index) {
						if (index == usa_currentUsaFeatureRotationItem)
						{
							$(this).fadeIn('slow', function () {
								usa_featureRotationTimeout = setTimeout('usa_showNextFeatureRotationItem()', usa_featureRotationInterval);
							});
							return false;
						}
					});
				});
				return false;
			}
		});
	}
}

function usa_loadFeatureRotation()
{
	usa_debugOut('fn: usa_loadFeatureRotation()');
	var fr = $("#usa_featureRotation");
	usa_totalUsaFeatureRotationItems = fr.find(".usa_featureRotationItem").length;
	/*
	// setup nav
	for (var i=0; i<usa_totalUsaFeatureRotationItems ; i++)
	{
		$().append();
	}
	*/
	usa_showNextFeatureRotationItem();
}






