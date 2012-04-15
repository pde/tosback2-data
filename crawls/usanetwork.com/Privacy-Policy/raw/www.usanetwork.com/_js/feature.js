// feature rotation
var usa_currentUsaFeatureRotationItem;
var usa_showNowUsaFeatureRotationItem;
var usa_totalUsaFeatureRotationItems;
var usa_featureRotationTimeout;
var usa_featureRotationInterval = 5000;

function usa_updateFeatureRotationNav()
{
	var fr = $("#usa_featureRotationNav");
	fr.find("a").each(function(index) {
		if ($(this).hasClass('on'))
		{
			$(this).removeClass('on');
			return false;
		}
	});
	fr.find("a").each(function(index) {
		if (index == usa_currentUsaFeatureRotationItem)
		{
			$(this).addClass('on');
			return false;
		}
	});
}

function usa_setupFeatureRotationNav()
{
	if (usa_totalUsaFeatureRotationItems > 1)
	{
		for (var i=0; i<usa_totalUsaFeatureRotationItems ; i++)
		{
			if (i == 0)
			{
				$('#usa_featureRotationNav').append('<a href="javascript:usa_showSpecifcFeatureRotation('+i+');" class="on"><span>'+i+'</span></a>');
			}
			else
			{
				$('#usa_featureRotationNav').append('<a href="javascript:usa_showSpecifcFeatureRotation('+i+');"><span>'+i+'</span></a>');
			}
		}
	}
}

function usa_showSpecifcFeatureRotation(i)
{
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

function usa_showNextFeatureRotationItem()
{
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
	var fr = $("#usa_featureRotation");
	usa_totalUsaFeatureRotationItems = fr.find(".usa_featureRotationItem").length;
	
	// setup nav
	for (var i=0; i<usa_totalUsaFeatureRotationItems ; i++)
	{
		$().append();
	}
	
	usa_setupFeatureRotationNav();
	usa_showNextFeatureRotationItem();
}