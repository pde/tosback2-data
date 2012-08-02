/**
 * socialbuttons() v1
 * by: Justin Grant justin.grant@digitaria.com
 */
(function($) {

	var methods = {
		init : function(options) {
			return this.each(function() {
				var $obj = $(this), data = $obj.data('socialbuttons');

				var likeSpecs = {
					facebookId : false,
					twitterUsername : false,
					siteId : false,
					callback : false
				};

				var $fbBtn, $twtrBtn, $myfavBtn;

				if (options) { $.extend(likeSpecs, options); }
                
				$obj.addClass('socialbuttons');
				$obj.html('');
				$obj.data('socialbuttons', likeSpecs);

				//facebook
				if(likeSpecs.facebookId) {
					if (likeSpecs.facebookId == "101109956647505") {
						fbProfile = "https://www.facebook.com/NBCSmash";
					} else {
						fbProfile = "https://www.facebook.com/profile.php?id=" + likeSpecs.facebookId;
					}
					
					$fbBtn = $(document.createElement("span")).addClass("fb-btn").html('<iframe scrolling="no" frameborder="0" allowtransparency="true" src="https://www.facebook.com/plugins/like.php?app_id=277167178962657&href= ' + fbProfile + '&send=false&layout=button_count&width=450&show_faces=false&action=like&colorscheme=light&font&height=21"></iframe>');
					$obj.append($fbBtn);
				}
				//twitter
				if(likeSpecs.twitterUsername){
					$twtrBtn = $(document.createElement("span")).addClass("twtr-btn").html('<iframe scrolling="no" frameborder="0" allowtransparency="true" src="http://platform.twitter.com/widgets/follow_button.html?screen_name=' + likeSpecs.twitterUsername + '&show_screen_name=false"></iframe>');
					$obj.append($twtrBtn);
				}
				//myfav
				likeSpecs.siteId = null; // disable for now
				if(likeSpecs.siteId){

					$myfavBtn  = $(document.createElement("span")).addClass("myfav-btn").html(document.createElement("a"));
					$obj.append($myfavBtn);
					
					var addFav = function(){

						var loginInterval, $myfavBtn = $obj.find(".myfav-btn");
						var saveFavorite = function(){
							var curfavs;
							$.ajax({
								url: "/assets/esp/social/Identity/getFavShows.json",
								beforeSend: function(xhr){ xhr.setRequestHeader("X-Framework-JSON-Request", "PLAINJSON"); },
								dataType: 'json',
								cache: false,
								success: function(data) { curfavs = data.showList; },
								complete:function(){
									var saveUrl = "/assets/esp/social/Collections/saveFavorites?siteIds=" + escape(likeSpecs.siteId + "," + curfavs);
									$.ajax({
										url: saveUrl,
										cache: false,
										success: function(data) {
											$myfavBtn.addClass("isFav").find("a").unbind('click').bind('click', removeFav);
										}
									});
								}
							});
						};
						
						if (nbcu.sn.session.isLoggedIn()) {
							saveFavorite();
						}else {
							$.fancybox({
								'centerOnScroll' : true,
								'transitionIn' : 'none',
								'transitionOut' : 'none',
								'autoScale' : false,
								'type' : 'iframe',
								'href' : '/assets/core/themes/current/nbc/includes/login_overlay.html',
								'width' : 583,
								'height' : 496,
								'scrolling' : 'no',
								'padding' : 0,
								'margin' : 0
							});//myFav button actions

							loginInterval = self.setInterval(function(){
								if (nbcu.sn.session.isLoggedIn()) {
									window.clearInterval(loginInterval);
									saveFavorite();
								}
							}, 1000);
						}
					};

					var removeFav = function() {
						var curfavs;
						$.ajax({ 
							url: "/assets/esp/social/Collections/removeFavorite.json", 
							beforeSend: function(xhr){xhr.setRequestHeader("X-Framework-JSON-Request", "PLAINJSON"); }, 
							dataType: 'json', data:({'site_id':likeSpecs.siteId}), 
							cache:false, 
							success: function(data) { 
								curfavs = data.shows;
							}, 
							complete:function(){
								$myfavBtn.removeClass("isFav");
								$myfavBtn.find("a").unbind("click").bind('click', addFav);
							} 
						});
					};

					$myfavBtn.find("a").bind("click",addFav);

					if (nbcu.sn.session.isLoggedIn()) {
						// Cachebust just once per page view using re-using DART's random number
						var dartRand = randDARTNumber || top.randDARTNumber;

						$.ajax({
							url: "/assets/esp/social/Identity/getFavShows.json?_=" + dartRand,
							beforeSend: function(xhr){ xhr.setRequestHeader("X-Framework-JSON-Request", "PLAINJSON"); },
							dataType: 'json',
							success: function(data) {
								if(data.showList.search(likeSpecs.siteId) > -1){
									$myfavBtn.addClass("isFav").find("a").unbind('click').bind('click', removeFav);
								}
							}
						});
					}//fav check on creation
				}//check for user option
			});
		}//init method
	};//methods namespace

	/**
	 * socialbuttons namespace: methods above
	 */
	$.fn.socialbuttons = function(method) {

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.socialbuttons');
		}

	};
})(jQuery);



