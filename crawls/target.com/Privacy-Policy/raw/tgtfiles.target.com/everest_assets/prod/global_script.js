/* js file */
$(document).ready(function(){
	try{
		var noJS = $(document).find("div.no-js"),
			sessCookie = Target.controller.header.cookie.read('s_sess');			
		if((noJS != null || noJS != "") && sessCookie != null){
			$("div.no-js").hide();
			$("#overlay-curtain").hide();
		}
	}catch(e){}
	
	if( $('.hp_hz_slots-8').length !== 0 ) {
	
		$.lazy.prototype.loadForm = function() {			
			
			var curEvent, form, action, data,placements,lazyRR,posCurtain,closestTag,
				self = this;
			
			if(!self.formsQueue.length || self.loadInProgress) return;
			
			self.loadInProgress = true;
			
			curEvent	= self.formsQueue.shift();
			form 		= $(curEvent.target);
			action 		= form.attr('action');
			data 		= form.serialize();
			placements	= (self.options.placements !== undefined) ? self.options.placements : [];
			lazyRR		= (self.options.lazyRR !== undefined) ? true : false;
			posCurtain	= (self.options.posCurtain !== undefined) ? self.options.posCurtain : false;
			//loading		= ( form.find(".lazyload-curtain") !== undefined ) ? form.find(".lazyload-curtain") : false; 
						
			//if(loading) { loading.removeClass('hidden'); }
			
			$.ajax({
				url: action,
				data: data,
				dataType: 'html',
				cache: false,
				type: 'post',
				curtain: {
					selector: form,
					posCurtain:posCurtain
				},
				success: function(data) {
					
					/////////////////////////////////////
					if( placements.length > 0 ) { //applicable only for HomePage component lazy load
						var dom = $(data);
						dom.filter('script').each(function() {
							if( this.src && this.src !== "" ) {
								Target.util.loadScript({
									src: this.src,
									success: function(data) { }
								});
							}
						});
							
						dom.filter('script').each(function() {
							try {
								$.globalEval(this.src || this.text || this.textContent || this.innerHTML || '');
							} catch(e) {}
						});		
					
						$.each(placements, function(key, val) {
							if($(data).find(val).html()) {
								$(val).html($(data).find(val).html());
							}
						});
					} else {
						form.replaceWith(data);
					}
					
					//Accessibility Fix: To set the focus to the lazy container
					/**
					if(posCurtain) {
						if( placements.length > 0 ) {
							$(placements[placements.length-1]).focus();
						} else {
							self.wrapper.focus();
						}
					}
					*/
					
					//POC for focus Issue:
					//Accessibility Fix: To set the focus to the lazy container
					if(posCurtain) {
						
							if( placements.length > 0 ) {							
							//$(placements[placements.length-1]).find('h2:eq(0)').focus();
							var placementElem = $(placements[placements.length-1]);
								closestTag = placementElem.find('h2').eq(0);
							if( closestTag.length === 0 ) {
								closestTag = placementElem.find('a').eq(0);
							}
							closestTag.attr('tabindex','-1').focus();
						} else {
							closestTag = self.wrapper.find('h2').eq(0);
							if( closestTag.length === 0 ) {
								closestTag = self.wrapper.find('a').eq(0);
							}
							closestTag.attr('tabindex','-1').focus();
						}
					}
					
					if( lazyRR ) {
						// TODO: Needs to call the below code in the rr-ready method							
						if(typeof rr_recs !== "undefined") {
							self.rrCb();
						} else {
							setTimeout(function(){self.rrCb();},2000);
						}
					}
					////////////////////////////////////
					self.forms = self.wrapper.find('form.lazy-load').filter(function() {
						return !$(this).parents(self.exclude).length;
					});
					self.loadForm();
					self.configForms();
					self.loadInProgress = false;
					if(self.options.onComplete){
						self.options.onComplete();
					}					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.overlay.currentOverlay.trigger('close.overlay');
					console.log("Error in lazy load");
				}
			});				
		};
	}	
});