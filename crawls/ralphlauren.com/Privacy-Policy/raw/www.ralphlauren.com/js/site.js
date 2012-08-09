function df_lightbox_pinkpony_show(){}

function df_lightbox_pinkpony_hide(){}

function df_lightbox_show(){}

function df_lightbox_hide(){}


Event.observe(window, 'load', function(e){

	var pars = {
		animate: {
			time: 150,
			opacity:.8
		}        
	}

	if (Df.Modal) {
		Df.Modal.setPars(pars)
	}
	


	Df.Shells = {
		dialog: function(holder) {
			if(!holder) {
				holder = document.body
			}
			var dialog = Df.e('div', $(holder) ,{className: 'dialog'})
			var title = Df.e('div', dialog ,{className: 'titleDialog'})
			var close = Df.e('span', title ,{innerHTML: '<img src="../images/pixel.gif" width="26" height="24" border="0" />'})
			close.observe('click', Df.Lightbox.hide)
			var content = Df.e('div', dialog)

			return {element:dialog, content:content}
		}
	}
	
	if (Df.Lightbox) {
		
		Df.Lightbox.createDialog(
			new Df.Dialog(
				Df.Shells.dialog()
			).set({
				animate: {
					time: 150,
					opacity:.9999
				},
				drag: false,
				resize: false,
				center: true//.df_if(!Df.browser().ie)
			})
		);
	}
		
	window.df_lightbox_show = function(linkURL){
	/*Omniturecustom link tracking start */
		RugbyOverlayView(true, 'global_rugby_lightbox')
	/*Omniturecustom link tracking end */	
		Df.Lightbox.setContent('<div><a href="javascript:window.open(\'' + linkURL + '\', \'Rugby\');void(df_lightbox_hide());"><img src="../images/rugby_interstitial_080312.jpg" width="312" height="273" border="0" /></a></div>')	
		return Df.Lightbox.show()
	
	}
	window.df_lightbox_hide = function(){
		return Df.Lightbox.hide()
	}
	
	window.df_lightbox_pinkpony_show = function(linkURL){
		Df.Lightbox.setContent('<div><a href="javascript:window.open(\'' + linkURL + '\', \'PinkPony\');void(df_lightbox_pinkpony_hide());"><img src="../images/0930_pp_auction_310x270.jpg" width="310" height="270" border="0" /></a></div>')	
		return Df.Lightbox.show()
	
	}
	window.df_lightbox_pinkpony_hide = function(){
		return Df.Lightbox.hide()
	}

	
	/*
	$('flashcontent_Rugby_headNav').observe('click', function(e){
		Df.Lightbox.show()
	})
	*/
	
	
	if(Df.browser && Df.browser().ie){
		Df.Lightbox.getDialog().element.observe(':show', function(e){
			
			scrollTo(0,0) //option 1
			
			//Df.Lightbox.getDialog().element.style.top = document.body.scrollTop + 'px'
			
			//alert(parseInt(Df.Lightbox.getDialog().element.style.top) + ' fdgd ' + document.body.scrollTop)
			
		})
	}
	var CharLimit = new Number(120);
	jQuery(".AddCountDown").keyup(function(){
		if(!isNaN(jQuery(this).attr("CharLimit"))){
			CharLimit = parseInt(jQuery(this).attr("CharLimit"));
			if (jQuery(this).val().length > CharLimit) {
				jQuery(this).val(jQuery(this).val().substring(0,CharLimit));
			} else {				
				jQuery("#ogm-char-limit").html(CharLimit-jQuery(this).val().length);
			}
		}
		
	});
});