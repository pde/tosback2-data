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

function setCookie(c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value + '; path=/';
}

function getCookie(c_name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
	  x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	  x = x.replace(/^\s+|\s+$/g,"");
	  if (x == c_name) {
	    return unescape(y);
      }
	}
}

function populateGET() {
  window.get = {};
  var params = location.search.slice(1).split('&');
  for(var i=0,len=params.length;i<len;i++) {
    var keyVal = params[i].split('=');
    try {
    	window.get[decodeURIComponent(keyVal[0])] = decodeURIComponent(keyVal[1]);
  	} catch(err) {
    	window.get[keyVal[0]] = keyVal[1];
  	}
  }
}

/* called from topnav.js jquery on load because topnav.js loads after jquery.1.4.2 */
function attachStickyView() {
    populateGET();
    var newsize = (window.get['view']) ? window.get['view'] : getCookie('viewsizecookie');
    if (newsize) {
   		newsize = (newsize == 99) ? 'all' : newsize; /* another Polo USA patch */ 
        setCookie('viewsizecookie', newsize, 365);
        jQuery('a[href*="family"]').each(function (index) {
            var href = jQuery(this).attr('href');
        	var html = jQuery(this).html(); /* hacky patch for Polo USA since it doesn't include a view param on the back to 15 <a> */
            if (href.indexOf('view') == -1 && href.indexOf('pg') == -1 && html.substr(0,10) !== 'Back to 15') {
            	jQuery(this).attr('href', href + '&view=' + newsize);
            }
            if (href.indexOf('view') == -1 && href.indexOf('pg') == -1 && html.substr(0,10) == 'Back to 15') {
            	jQuery(this).attr('href', href + '&view=15');
            }
        });
    }
}