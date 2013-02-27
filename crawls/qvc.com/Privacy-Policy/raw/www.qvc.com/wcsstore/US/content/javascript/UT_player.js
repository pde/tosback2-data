var video;

function initVideo(controls, stage1, stage2, stage3, flashHeight, flashWidth) {
	var anmationChangedCounter=0;
	var contractTimer=null;

	var height = flashHeight ? flashHeight : 380;
	var width = flashWidth ? flashWidth : 686
	
	video = new QVC.Modules.VideoPlayer.Player({
		container: $('movieoverlay')
	});
	
	video.loadData(stage1());
	
	video.write(storeAssetPath +'VideoPlayer.swf', {
		height: height,
		width: width,
		params: {},
		properties:{},
		vars: {},
		events: {}
	});

	$$('.media_events').addEvent('expand', function(){
		$$('.VideoPlayerWidget').getParent().setStyle('z-index', 101);
		video.loadData(stage2());
		video.setConfiguration();
		video.play();
		if(videoTemplate!=2){ 
			$('navigation').setStyle('display', 'none');
		}else{
			$$('span.video').each(function(item,index){
				if (item.hasClass('state1')) {
					item.removeClass('state1');
					item.addClass('state2');
				}  			
			});
			$('MoreVideosDiv').setStyle('display', 'block');
			$('MoreVideosDiv').setStyle('top', '220px');
			$('navigation').setStyle('top', '245px');
			$('navigation').setStyle('height', '125px');
			if($('divProductButtons')){ 
				$('divProductButtons').setStyle('display', 'none');
			}	
			if($$('.promotionalParagraph')){
				$$('.promotionalParagraph').setStyle('top', '54px'); 
			}		
			if($$('.prodImg')){
				$$('.prodImg').setStyle('display', 'block'); 
			}			
		}
		if (contractTimer != null) {
			$clear(contractTimer);
		}		
		$$('.promotional ').setStyle('display', 'none');
		$$('.videoCover').setStyle('display', 'block');
	});

	$$('.media_events').addEvent('contract', function(){
		if($$('.prodImg')){
			$$('.prodImg').setStyle('display', 'none'); 
		}		
		$$('.VideoPlayerWidget').getParent().setStyle('z-index', 99);
		// Only the meta player has a video list which should be displayed
		if ($('navigation').hasChild('videoList')) {
			contractTimer = (function() {$('navigation').setStyle('display', 'block');}).delay(500);
		}
		if(videoTemplate == 2){
			$('navigation').setStyle('top', '240px');
			$('navigation').setStyle('height', '133px'); 
			$$('span.video').each(function(item,index){
				if (item.hasClass('state2')) {
					item.removeClass('state2');
					item.addClass('state1');
				}  
			
			});
			if($$('.promotionalParagraph')){
				$$('.promotionalParagraph').setStyle('top', '40px'); 
			}
		} 
		$$('.promotional ').setStyle('display', 'block');
		$$('.videoCover').setStyle('display', 'none');
		
		var dom=$$('.media_info')[0];
		dom.setStyle('display', 'none');
		anmationChangedCounter=4;
		dom.setStyle('z-index', 0);
		video.loadData(stage3());
		video.setConfiguration();
	});
	$$('.media_events').addEvent('animationChanged', function(){
			var dom=$$('.media_info')[0];
			anmationChangedCounter++;
			switch(anmationChangedCounter){
				case 3:
					dom.setStyle('display', 'block');
					break;
				case 4:
					dom.setStyle('z-index', 2);
					break;
				case 6:
					anmationChangedCounter=2;
					break;
				default:
				break;
			}
		});

	$$('.media_info').getElement('.contract_link').addEvent('click', function(){
		video.contract();
	});

	$$('.media_events').addEvent('endOfStream', function () {
	  	if (video.streamIterator.hasNext()) {
	  		video.setStream(video.streamIterator.next());
	  		video.play();
	  	} else {
	  		video.pause();
	  		video.seek(0);
	  	}

		var videos = $$('#videoList > li');
		var newActiveIndex = null;
		for (var i=0; i<videos.length; i++) {
			if (videos[i].hasClass('activeVideo')) {
				newActiveIndex = i+1;
			}
			else if (i==newActiveIndex) {
				activateVideo(videos[i].getElement('a'),i+1);
				break;
			}
		}
	});
	
	video.endOfStream=function(){
		QVC.Managers.EventDispatchers.dispatchExtendedEvent($$('.media_events'), 'endOfStream', {}, function(){});
	};
	video.expand=function(){
		QVC.Managers.EventDispatchers.dispatchExtendedEvent($$('.media_events'),'expand', {}, this.dispatchEventToPlayer);
	};
	video.contract=function(){
		QVC.Managers.EventDispatchers.dispatchExtendedEvent($$('.media_events'),'contract', {}, this.dispatchEventToPlayer);
	};
	video.animationChanged=function(){
		QVC.Managers.EventDispatchers.dispatchExtendedEvent($$('.media_events'),'animationChanged', {}, function(){});
	};

	var addStream=function(item, index){
		var anchor=item.getElement('a');
		var url=anchor.get('href');
		var startTimes=QVC.Utils.getVarFromQueryString('startTime',url).split(',');
		var endTimes=QVC.Utils.getVarFromQueryString('endTime',url).split(',');
		var hasIOABeenViewed=false;

		if(item.hasClass('Item_On-Air')){
			var isPlaying=QVC.Modules.VideoPlayer.ModelEvents.PLAY_STATE_CHANGED(video);
			video.loadData(Configurations.Controls.item_on_air());
			if(!isPlaying && !hasIOABeenViewed){
				video.mute();
				hasIOABeenViewed=true;
			}
		}else{
			video.loadData(controls());
		}
		startTimes.each(function(item,index){
			var o=QVC.Utils.getObjectFromQueryString(url);
			o.startTime=startTimes[index];
			if (index > 0) {
				o.previewTime = -1;
			}
			o.endTime=endTimes[index];
			video.addStream(o);
		});
	};
	$$('span.video').each(function(item,index){
		var anchor=item.getElement('a');
		if(null != anchor){
			anchor.addEvent('click', function(e){
				new Event(e).stop();
				item.fireEvent('click');
			});
		}

		item.addEvent('click', function(e){
			if(videoTemplate!=2){ 
				video.contract();
			}			
			video.removeStreams();
			$$('span.video').each(function(item2,index2){
				if (index2 >= index) {
					addStream(item2, index2);
				}
			});
			video.setStream();
			video.setControls();
		});
		if(index===0){
			$$('span.video').each(function(item2,index2){
				addStream(item2, index2);
			});
		};
	});
}

function activateVideo(videoLink, sectionId) {
	$$('.activeVideo').removeClass('activeVideo');
	if(videoTemplate == 2){	 
		//videoLink.getParent().getParent().addClass('activeVideo');
		videoLink.getParent().getParent().getParent().addClass('activeVideo');  
	}else{
		videoLink.getParent().getParent().addClass('activeVideo');
	}		
	if (sectionId) {
		$$('.activeInfo').removeClass('activeInfo');
		$$('.videoInfo'+sectionId).addClass('activeInfo');
	}
	
	tagVideoCoremetrics(sectionId);
}
