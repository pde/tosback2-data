/* <![CDATA[ */
jQuery(document).ready(function() {
	jQuery("a[class*=fancybox]").fancybox({
		'overlayOpacity'	:	0.7,
		'overlayColor'		:	'#000000',
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'easingIn'      	: 'easeOutBack',
		'easingOut'     	: 'easeInBack',
		'speedIn' 			: '700',
		'centerOnScroll'	: true
	});
	
	jQuery("a[class*='et_video_lightbox']").click(function(){
		var et_video_href = jQuery(this).attr('href'),
			et_video_link;

		et_vimeo = et_video_href.match(/vimeo.com\/(.*)/i);
		if ( et_vimeo != null )	et_video_link = 'http://player.vimeo.com/video/' + et_vimeo[1];
		else {
			et_youtube = et_video_href.match(/watch\?v=([^&]*)/i);
			if ( et_youtube != null ) et_video_link = 'http://youtube.com/embed/' + et_youtube[1];
		}
		
		jQuery.fancybox({
			'overlayOpacity'	:	0.7,
			'overlayColor'		:	'#000000',
			'autoScale'		: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'easingIn'      : 'easeOutBack',
			'easingOut'     : 'easeInBack',
			'type'			: 'iframe',
			'centerOnScroll'	: true,
			'speedIn' 			: '700',
			'href'			: et_video_link
		});
		return false;
	});
	
	var $portfolioItem = jQuery('.et_pt_gallery_entry');
	$portfolioItem.find('.et_pt_item_image').css('background-color','#000000');
	jQuery('.zoom-icon, .more-icon').css({'opacity':'0','visibility':'visible'});
	
	$portfolioItem.hover(function(){
		jQuery(this).find('.et_pt_item_image').stop(true, true).animate({top: -10}, 500).find('img.portfolio').stop(true, true).animate({opacity: 0.7},500);
		jQuery(this).find('.zoom-icon').stop(true, true).animate({opacity: 1, left: 43},400);
		jQuery(this).find('.more-icon').stop(true, true).animate({opacity: 1, left: 110},400);
	}, function(){
		jQuery(this).find('.zoom-icon').stop(true, true).animate({opacity: 0, left: 31},400);
		jQuery(this).find('.more-icon').stop(true, true).animate({opacity: 0, left: 128},400);
		jQuery(this).find('.et_pt_item_image').stop(true, true).animate({top: 0}, 500).find('img.portfolio').stop(true, true).animate({opacity: 1},500);
	});
	
	
	//contact page
	var $et_contact_container = jQuery('#et-contact'),
		$et_contact_form = $et_contact_container.find('form#et_contact_form'),
		$et_contact_submit = $et_contact_container.find('input#et_contact_submit'),
		$et_inputs = $et_contact_form.find('input[type=text],textarea'),
		et_email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
		et_contact_error = false,
		form_default_values = new Array(),
		$et_contact_message = jQuery('#et-contact-message'),
		et_message = '';
		
		form_default_values['et_contact_name'] = 'Name';
		form_default_values['et_contact_email'] = 'Email Address';
		form_default_values['et_contact_subject'] = 'Subject';
		form_default_values['et_contact_message'] = 'Message';
			
	$et_inputs.live('focus', function(){
		if ( jQuery(this).val() === form_default_values[jQuery(this).attr('id')] ) jQuery(this).val("");
	}).live('blur', function(){
		if (jQuery(this).val() === "") jQuery(this).val(form_default_values[jQuery(this).attr('id')]);
	});
	
	$et_contact_form.live('submit', function() {
		et_contact_error = false;
		et_message = '<ul>';
	
		$et_inputs.removeClass('et_contact_error');
		
		$et_inputs.each(function(index, domEle){
			if ( jQuery(domEle).val() === '' || jQuery(domEle).val() === form_default_values[jQuery(domEle).attr('id')] ) {
				jQuery(domEle).addClass('et_contact_error');
				et_contact_error = true;
				
				var default_value = form_default_values[jQuery(domEle).attr('id')];
				if ( default_value === undefined ) default_value = 'Captcha';
								
				et_message += '<li>Fill ' + default_value + ' field</li>';
			}
			if ( (jQuery(domEle).attr('id') == 'et_contact_email') && !et_email_reg.test(jQuery(domEle).val()) ) {
				jQuery(domEle).removeClass('et_contact_error').addClass('et_contact_error');
				et_contact_error = true;
				
				if ( !et_email_reg.test(jQuery(domEle).val()) ) et_message += '<li>Invalid email</li>';
			}
		});
		
		if ( !et_contact_error ) {
			$href = jQuery(this).attr('action');
				
			$et_contact_container.fadeTo('fast',0.2).load($href+' #et-contact', jQuery(this).serializeArray(), function() {
				$et_contact_container.fadeTo('fast',1);
			});
		}
		
		et_message += '</ul>';
		
		if ( et_message != '<ul></ul>' )
			$et_contact_message.html(et_message);
		
		return false;
	});
		
	var $et_searchinput = jQuery('#et-searchinput');
		etsearchvalue = $et_searchinput.val();
	
	$et_searchinput.focus(function(){
		if (jQuery(this).val() === etsearchvalue) jQuery(this).val("");
	}).blur(function(){
		if (jQuery(this).val() === "") jQuery(this).val(etsearchvalue);
	});
	
	var $et_template_portfolio_thumb = jQuery('.et_pt_portfolio_entry');
	$et_template_portfolio_thumb.hover(function(){
		jQuery(this).find('img').fadeTo('fast', 0.8);
		jQuery(this).find('.et_portfolio_more_icon,.et_portfolio_zoom_icon').fadeTo('fast', 1);
	}, function(){
		jQuery(this).find('img').fadeTo('fast', 1);
		jQuery(this).find('.et_portfolio_more_icon,.et_portfolio_zoom_icon').fadeTo('fast', 0);
	});
		
});
/* ]]> */