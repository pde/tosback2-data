/**
 * likebox() v1
 * by: Justin Grant justin.grant@digitaria.com
 */
(function($) {

	var methods = {
		init : function(options) {
			return this.each(function() {
				var $obj = $(this), data = $obj.data('likebox');

				var likeSpecs = {
					facebookId : false,
					twtrName : false,
					siteId : false,
					callback : false
				};
				
				var $fbBtn, $twtrBtn, $myfavBtn; 

				if (options)
					$.extend(likeSpecs, options);

		
					$obj.addClass('likebox');
					$obj.html('');
			
				$obj.data('likebox', likeSpecs);
				
				//facebook
				if(likeSpecs.facebookId) { 
					//if($obj.find(".fb-btn").length==0){ 
						$fbBtn = $(document.createElement("span")).addClass("fb-btn").html('<iframe scrolling="no" frameborder="0" allowtransparency="true" src="https://www.facebook.com/plugins/like.php?app_id=277167178962657&href=https://www.facebook.com/profile.php?id=' + likeSpecs.facebookId + '&send=false&layout=button_count&width=450&show_faces=false&action=like&colorscheme=light&font&height=21"></iframe>');
						$obj.append($fbBtn);
						
					//}
				}
				//twitter
				if(likeSpecs.twtrName){
					//if($obj.find(".twtr-btn").length==0){ 
						$twtrBtn = $(document.createElement("span")).addClass("twtr-btn").html('<iframe scrolling="no" frameborder="0" allowtransparency="true" src="http://platform.twitter.com/widgets/follow_button.html?screen_name=' + likeSpecs.twtrName + '&show_screen_name=false"></iframe>');
						$obj.append($twtrBtn);
					//}
				}
				//myfav
				if(likeSpecs.siteId){

				//	if($obj.find(".myfav-btn").length==0){ 
						
						$myfavBtn  = $(document.createElement("span")).addClass("myfav-btn").html(document.createElement("a"));
						$obj.append($myfavBtn);
						
						$myfavBtn.find("a").click(function(){
							
							var loginInterval, $myfavBtn = $obj.find(".myfav-btn");
							var saveFavorite = function(){
								var curfavs; 
								$.ajax({
									url: "/assets/esp/social/Identity/getFavShows.json",
									beforeSend: function(xhr){ xhr.setRequestHeader("X-Framework-JSON-Request", "PLAINJSON"); },
									dataType: 'json',
									cache: false,
									success: function(data) { curfavs = data.showList; 
									}, 
									complete:function(){
										var saveUrl = "/assets/esp/social/Collections/saveFavorites?siteIds=" + escape(likeSpecs.siteId + "," + curfavs);
										//console.log(saveUrl);
										
										$.ajax({
											url: saveUrl,
											cache: false,
											success: function(data) {}
										});
										
										$myfavBtn.addClass("isFav"); 	
									}
								});
							};
							
							var checkLoginStatus = function(){
								if (nbcu.sn.session.isLoggedIn()) {
									window.clearInterval(loginInterval);
									saveFavorite();
								}
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
									'href' : '/assets/esp/social/Identity/getLoginRegV3Global/?hideClose=1&isOverlay=1',
									'width' : 583,
									'height' : 496,
									'scrolling' : 'no',
									'padding' : 0,
									'margin' : 0
								});//myFav button actions
								
								loginInterval = self.setInterval(checkLoginStatus, 1000);
							}
						});
						
						if (nbcu.sn.session.isLoggedIn()) {
							// Cachebust just once per page view using re-using DART's random number
							var dartRand = randDARTNumber || top.randDARTNumber;
							
							$.ajax({
								url: "/assets/esp/social/Identity/getFavShows.json?_=" + dartRand,
								beforeSend: function(xhr){ xhr.setRequestHeader("X-Framework-JSON-Request", "PLAINJSON"); },
								dataType: 'json',
								success: function(data) {
									if(data.showList.search(likeSpecs.siteId) > -1){
										$obj.find(".myfav-btn").addClass("isFav");
									}
								}
							});
						}//fav check on creation
				//	}//check for button existence 
				}//check for user option
			}); 
		}//init method
	};//methods namespace
	
	/**
	 * likebox namespace: methods above
	 */
	$.fn.likebox = function(method) {

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.likebox');
		}

	};

})(jQuery);


