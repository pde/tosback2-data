var Utility = function() {

	var staticDomain;
	
	return {
		includeScript : function(scriptFilename) {
		    var htmlDoc = document.getElementsByTagName('head').item(0);
		    var js = document.createElement('script');
		    js.setAttribute('language', 'javascript');
		    js.setAttribute('type', 'text/javascript');
		    js.setAttribute('src', scriptFilename);
		    htmlDoc.appendChild(js);
		    return false;
		},
		
		getStaticDomain : function()
		{
			return Utility.staticDomain;
		},
		
		getAnchor : function() {
			var url = document.location.toString();
			return (url.match('#')) ? url.split('#')[1] : '';
		}		
		
	}

}();

var AdvertsAutoRefresh = function()
{
	var lastActionTime;
	var lastRefreshTime;
	var refreshInterval;

	return {
		bootstrap : function(interval)
		{
			if (interval == null) { interval = 30; } // default
			AdvertsAutoRefresh.refreshInterval = interval;

			AdvertsAutoRefresh.lastRefreshTime = new Date();
			AdvertsAutoRefresh.lastActionTime = null;

			AdvertsAutoRefresh.registerStandardEvents();
		},

		registerStandardEvents : function()
		{
				$(document).ready(function()
				{
						$("#homeMapTabs li, #homeMapLinks a, #homeMapPanelSchoolsForm input[type='radio'], #homeMapPanelPropertyForm input[type='radio']").click(AdvertsAutoRefresh.registerUserAction);
				});
		},

		registerUserAction : function()
		{
			AdvertsAutoRefresh.lastActionTime = new Date();
			var differenceInSeconds = Math.round((AdvertsAutoRefresh.lastActionTime.getTime()-AdvertsAutoRefresh.lastRefreshTime.getTime()) / 1000);
			if (differenceInSeconds >= AdvertsAutoRefresh.refreshInterval)
			{
				AdvertsAutoRefresh.refreshAllAdverts();
			}
		},

		refreshAllAdverts : function()
		{
			var i = 1;
			$('iframe.iframeAdvert').each(function()
			{
				var newOrd = Math.floor(Math.random()*999999);
				//iframe.src = iframe.src.replace(/ord=[^&]*/, "ord=20300");
				$(this).attr("src",$(this).attr("src").replace(/ord=[^&]*/, "ord="+newOrd));
			});
			AdvertsAutoRefresh.lastRefreshTime = new Date();
			AdvertsAutoRefresh.lastActionTime = null;
		}
	}
}();

var MapTrackings = function()
{
		return{
			bootstrap : function(location){
					$(document).ready(function()
					{
						MapTrackings.property(location);
						MapTrackings.fmn(location);
						MapTrackings.schools(location);
						MapTrackings.neighbourhood(location);
					});
			},
			property : function(location){
					$('#homeMapPanelPropertyForm input[type="submit"]').click(function(e){
							var radio = $("#homeMapPanelPropertyForm").find("input[type='radio']:checked").val();
							var address = '';
							switch (radio)
							{
								case "sold":
										address = "/outbound/Homepage/"+location+"/MAP/Proeprties/House-price-link/";
										break;

								case "sale":
										address = "/outbound/Homepage/"+location+"/MAP/Properties/for-sale-link/";
										break;

								case "rent":
										address = "/outbound/Homepage/"+location+"/MAP/Properties/for-rent-link/";
										break;
								
							}
							pageTracker._trackPageview(address);
					});

					$('#homeMapContentPanel mini-pad-l a').click(function(){
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Side-BOX/Properties/most-expensive-zoopla-pic/");
					});
					/*$('#homeMapContentPanel .last a').click(function(e){e.preventDefault();
							pageTracker._trackPageview("/outbound/Homepage/Local/Side-BOX/Properties/most-expensive-zoopla-pic/");
					});*/
			},

			fmn : function(location){
					$('#homeMapPanelFindMyNearestForm input[type="submit"]').click(function(e){
							pageTracker._trackPageview('/outbound/Homepage/'+location+'/MAP/FMN/search-box/');
					});

					$('#homeMapPanelFindMyNearest ul li').click(function(e){
							pageTracker._trackPageview('/outbound/Homepage/'+location+'/MAP/FMN/'+$(this).text()+'/');
					});
			},

			schools : function(location){
				$('#homeMapPanelSchoolsForm input[type="submit"]').click(function(e){
							var radio = $("#homeMapPanelSchoolsForm").find("input[type='radio']:checked").val();
							var address = '';
							switch (radio)
							{
								case "primary":
										address = "/outbound/Homepage/"+location+"/MAP/School/Primaryschools-search-link/";
										break;

								case "secondary":
										address = "/outbound/Homepage/"+location+"/MAP/School/secondryschools-search-link/";
										break;

								case "sixth":
										address = "/outbound/Homepage/"+location+"/MAP/School/sixthforms-search-link/";
										break;

								case "all":
										address = "/outbound/Homepage/"+location+"/MAP/School/allschools-search-link/";
										break;

							}
							pageTracker._trackPageview(address);
					});
			},

			neighbourhood : function(location){
					$('.gallery-area a').click(function()
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Photo-Module/BigPhotos/pic-link/");
					});
					$('.gallery-thumbs a').click(function()
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Photo-Module/Thumbnail-Photos/pic-link/");
					});
					$('#neighbour-link').click(function()
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Neighbour-Module/NB-full-profile-link/NB-text-link/");
					});
					$('#more-photos-area').click(function()
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Photo-Module/MORE-Photos/text-link/");
					});
					$("#finance-box ul li a").click(function(e)
					{
							var category = $(this).prev().text();
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/FMC/"+category+"/text-link/");
					});
					$('#newsletter-box form input[type="submit"]').click(function(e)
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Newsletter-box/Signup-NL/Go-Button/");
					});
					$('#view-map a').click(function(e)
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/View-MAP/MAP/View-Button/");
					});
					$('#view-map input').click(function(e)
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Enter-Location/First-time/Go-Button/");
					});
					$('#recent-sales .seo-container a').click(function(e)
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Recent-Prop-Block/text-links/House-price-detail-links/");
					});
					$('#latest-pubs .seo-container a').click(function(e)
					{
							pageTracker._trackPageview("/outbound/Homepage/"+location+"/Latest-Pub-Block/text-links/Bus-detail-links/");
					});
			}

		}
}();
