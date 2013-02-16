var tabs = (function(){
	var $tabWrapper,
		$tabNav,
		$currentTab,
		$tabs,
		$tabContentWrapper,
		$tabContent,
		$dropdown;

	/****** public methods ******/
	return{
		init:function(){
			$tabWrapper = $('#tabs');

			buildTabs();
		}
	}
	/****** private methods ******/
	function buildTabs(){
		$tabNav = $('#tab-nav');
		$currentTab = $tabNav.children('.current');
		$tabs = $tabNav.children('li');

		$tabNav.addClass('length-'+$tabs.length);

		$tabWrapper.children('.content').prepend('<div id="tab-dropdown"><p>Select category</p><div class="select"><select id="tab-select"></select></div></div>');

		$dropdown = $tabWrapper.children('.content').children('#tab-dropdown').find('select');
		$tabContentWrapper = $tabWrapper.children('.content').children('#tab-content');

		$tabs.each(function(){
			var $link = $(this).find('a');

			$dropdown.append('<option value="'+$link.attr('href')+'">'+$link.find('.icon').text()+'</option>');

			$link.click(function(){
				if(controler.size == 's'){

				}else{
					loadTab($(this).parent().parent().parent());
				}
				return false;
			});
		});

		$dropdown.change(function(){
			var dataID = $(this).children("option:selected").attr('value');

			$tabs.each(function(){
				if($(this).find('a').attr('href') == dataID){

					loadTab($(this));
					return false;
				}
			});
		});

		//set up tab content
		buildTabContent();
	}

	function buildTabContent(){
		$tabContent = $tabContentWrapper.children('.content');

		$tabContent.each(function(){
			var $this = $(this),
			 	$featured = $this.find('.featured'),
			 	$video,
			 	$img = $featured.find('.img'),
			 	imgLink = $img.children('a').attr('href'),
			 	videoID;



			 //check if image is linked to a youtube video
			 if($img.length > 0){
				 if(imgLink.indexOf('youtu.be') >= 0){
				 	$img.children('a').append('<span class="play-icon"></span>');
				 	$img.after('<div class="video"></div>');

				 	$video = $featured.find('.video');

				 	videoID = imgLink.replace('http://youtu.be/','');

				 	$img.children('a').click(function(){
				 		//if not in small view load video inline
				 		if(controler.size != 's'){
					 		$img.hide();
					 		$video.show().html('<iframe  width="390" height="228" src="http://www.youtube.com/embed/'+videoID+'?&autoplay=1&autohide=1&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>');

					 		return false;
				 		}
				 	});
				 }
			 }

			//if content has a twitter button
			var $twitterBtn = $featured.find('.twitter');
			if($twitterBtn.length > 0){
				$twitterBtn.append('<div class="twitter-tooltip"></div>');
				var $twitterTooltip = $featured.find('.twitter-tooltip');

				$twitterBtn.children('a').hover(
					function(){
						$twitterTooltip.show();
					},
					function(){
						$twitterTooltip.hide();
					}
				);
			}
		});


		//load google plus buttons
		gapi.plusone.go();

		//load content for default tab
		loadTab($tabs[$currentTab.index()]);

	};

	function loadTab(tabToLoad){
		var $tabToLoad = $(tabToLoad);
		var $dataid_href = $tabToLoad.find('a').attr('href');
		var dataID = ''
		if( $dataid_href ) {
			dataID = $dataid_href.replace('#', '');
		}
		$tabContent.each(function(){
			var $this = $(this);
			if($this.attr('id') == dataID){
				$this.removeClass('visually-hidden');
			}else{
				$this.addClass('visually-hidden');
				$this.find('.video').children().remove();
				$this.find('.img').show();
			}
		});



		$tabNav.children('.current').removeClass('current');
		$tabToLoad.addClass('current');
		$dropdown.children('option').each(function(){
			if($(this).attr('value') == dataID){
				$(this).attr('selected', true);
			}
		});
	}


})();