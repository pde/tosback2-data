/*--------------------- Java Script for Support Detail Page ---------------------------------*/
var locationFlag = true;
var isManageAccountURL = false;
var isValidIPForCrawl = false;
var link="";
var contactValidator = null;


// A self executing function
(function(){ 
	//Adding custom jQuery selector ':locPop' to find out proper anchor elements where location verification popup should be called
	$.expr[':'].locPop = function(obj, index, meta, stack){
		// obj - is a current DOM element; // index - the current loop index in stack; // meta - meta data about your selector; // stack - stack of all elements to loop; // Return true to include current element; // Return false to explude current element
		var $obj = $(obj);
		
		if(!$obj.is('a, area') || $obj.closest('.fp-header-tabs').length || $obj.closest('div.site-map').find('.subhead1').length || $obj.closest('.page-error').length) return false;
		
		var matchStr = $obj.is('#see-all-offers')? 'current_offers' : $obj.attr('href').replace(/\//,'').split('/').shift();
//		return matchStr == 'residential' || matchStr == 'small_business' || matchStr == 'enterprise' || matchStr == 'industry_solutions' || $obj.attr('href').match(/fp_contact_us/);
		return matchStr == 'residential' || matchStr == 'small_business' || matchStr == 'enterprise' || matchStr == 'industry_solutions' || matchStr == 'current_offers';
	};

})();

var fp = function(){
	return {
		reloadOnPopClose: true,
		errMsg: {
			bleed: '<li class="error">Please enter your phone number to confirm product availability for your location. If you do not have a telephone number, enter your area code, the exchange of your neighbors and then 0000</li>',
			noServ: '<li class="error">We\'re sorry; FairPoint does not currently serve your area. To learn more about our company, please refer to the About section of our site.</li>'
		},
		setCookie: function(c_name, value, expiredays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = c_name + "=" + escape($.trim(value)) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
		},
		getCookie: function(c_name) {
			if (document.cookie.length > 0) {
				c_start = document.cookie.indexOf(c_name + "=");
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1;
					c_end = document.cookie.indexOf(";", c_start);
					if (c_end == -1) c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start, c_end));
				}
			}
			return "";
		},
		verificationModal: function(param){
			if(fp.pageType().isLanding && (param && !param.type))	return; //If landing page and popup opens on page load, prevent it.
			if((param && param.type) && $(param.target).closest('ul.fp-header-tabs').length){ 
				window.location = $(param.target).attr('href');
				return;
			}
			
			if(param && param.rigid) {
				$('#loc-veri').find('a.simplemodal-close').hide(); 
			} else {
				$('#loc-veri').find('a.simplemodal-close').show();
			}
			
			$('#loc-veri').modal({
					focus: false,
					escClose: (param && !param.rigid),
						onShow: function(dialog){
							var $form 	= $('#loc-veri-form');
							
							if($('.tip-mask', $form).length) {
							
								$('.tip-mask', $form).each(function(){
									$(this).focus(function(){
										var $this = $(this);
										if($this.attr('name') === 'phone') {
											$this.mask("999-999-9999");
										}
										if($this.val().toLowerCase() === $this.data('defaultText').toLowerCase() || $this.val() == '') {
											$this.removeClass('tool-tip').val('');
										}
									}).blur(function(){
										var $this = $(this);
										if($this.attr('name') === 'phone') {
											$this.trigger('unmask');
											var t = 100;
										} else {
											var t = 0;
										}
										if($this.val().toLowerCase() === $this.data('defaultText').toLowerCase() || $this.val() == '') {
											$this.addClass('tool-tip').val($this.data('defaultText'));
										} else {
											$this.removeClass('tool-tip');
										}
										/*window.setTimeout(function($this){
											if($this.val().toLowerCase() === $this.data('defaultText').toLowerCase() || $this.val() == '') {
												$this.addClass('tool-tip').val($this.data('defaultText'));
											} else {
												$this.removeClass('tool-tip');
											}
										}($this), t);*/
									});
								});
							}
							
							if($('.tip-mask', $form).length) {
								$('.tip-mask', $form).each(function(c){
									var $this = $(this);
									$this.data('defaultText', $this.val()).addClass('tool-tip');
								})
							}
							
							$form.live('submit', function(e){
								e.preventDefault();
								
								var $fields	= $form.find('input[type="text"]'),
									filled 	= false,
									numErrors = 0,
									formOK 	= false,
									verify	= {
										errorContainer: 'loc-veri-error',
										defVal: {
											zip_code: 'Enter Your Zip Code',
											phone: 'Enter Your Phone Number'
										},
										rules: {
											zip_code: {
												zip: /^\d{5}$/
											},
											phone: {
												phoneUS: /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/
											}
										},
										messages: {
											common: 'Please enter your zip code or your phone number',
											zip_code: {
												zip: 'Please enter a valid 5-digit Zip Code'
											},
											phone: {
												phoneUS: 'Please enter a valid phone number'
											}
										}
									},
									servURL = {
										zip_code: '/servlet/CityTelcoMappingServlet',
										phone: '/servlet/PhoneMappingServlet'
									},
									ajaxURL = '',
									errorHolder = $form.find('fieldset #'+verify.errorContainer);
									
								$fields.removeClass('error').removeClass('valid');
								
								if(errorHolder.length) {
									errorHolder.empty();
								} else {
									$form.find('fieldset:last').append('<ul id="'+verify.errorContainer+'" />');
									errorHolder = $form.find('fieldset #'+verify.errorContainer);
								}
								
								errorHolder.empty();
								$fields.each(function(){
									var $this = $(this),
										$name = $this.attr('name');
									
									if($this.val() != '' && $.trim($this.val()).toLowerCase() != $.trim(verify.defVal[$name]).toLowerCase()) {
										filled = true;
									}
									
									if(filled && ($this.val() != '' && $.trim($this.val()).toLowerCase() != $.trim(verify.defVal[$name]).toLowerCase())) {
										var valid = false;
										for(r in verify.rules[$name]) {
											if($this.val().match(verify.rules[$name][r])) {
												valid = true;
											} else {
												valid = false;
												errorHolder.append('<li class="error">'+verify.messages[$name][r]+'</li>');
												break;
											}
										}
										if(valid) {
											$this.addClass('valid').removeClass('error');
										} else {
											$this.addClass('error').removeClass('valid');
										}
									}
								});
								if(!filled) {
									$fields.addClass('error');
									errorHolder.html('<li class="error">'+verify.messages.common+'</li>');
								}
								numErrors = $form.find('.error:input').length;
								formOK = (numErrors > 0) ? false : true;
								if(formOK) {
									// FORM is okay, go ahead and do an AJAX operation or submit the form
									var phoneField 	= $form.find(':input[name="phone"]'),
										zipField	= $form.find(':input[name="zip_code"]'),
										phoneNum	= phoneField.val().replace(/-|\(|\)/, ''),
										phoneFilled = phoneNum != '' && $.trim(phoneNum).toLowerCase() != $.trim(verify.defVal.phone).toLowerCase(),
										zipFilled	= zipField.val() != '' && $.trim(zipField.val()).toLowerCase() != $.trim(verify.defVal.zip_code).toLowerCase(),
										ajaxURL 	= ( phoneFilled && phoneField.hasClass('valid'))? servURL.phone : servURL.zip_code,
										ajaxData	= phoneFilled? "npp=" + phoneNum.substr(0,3) + "&nxx=" + phoneNum.substr(3,3) : 'zip='+zipField.val();
										ajaxData 	+= (phoneFilled && zipFilled)? "&zip="+zipField.val() : '';
										ajaxData	+= (!zipFilled && zipField.data('prevVal'))? "&zip="+zipField.data('prevVal') : '';
										
										$.ajax({
											type: "POST",
											url: ajaxURL,
											data: ajaxData,
											async: false,
											beforeSend: function() {
												fp.setCookie('fp_zip','',0);
												zipField.removeData('prevVal');
											},
											success: function(msg) {
												var bizBU = $.trim(fp.getCookie('activeBU')).replace(/\"/g,'') || 'Residential';
												var telco = fp.getCookie('fp_telco');
												 if(bizBU.match(/business/i)) {
													 if(telco.match(/NNE/)) {
														 fp.setCookie('activeBU', 'Small Business', 365);
													 } else {
														 fp.setCookie('activeBU', 'Business', 365);
													 }
												}
												
												var resArr = msg.replace(/\{|\}/g, '').split(':'),
													response = {},
													bleedZip = '';
												response[resArr.shift()] = resArr.pop();
												
												if(response && response.bleeding) {
													$('#zip_code').data('prevVal', $('#zip_code').val()).val('').trigger('blur');
													$('#phone')[0].focus();
													$('#loc-veri-error').html(fp.errMsg.bleed);
													return;
												}
												
												if(response && !response.bleeding && response.cookies == 'false') {
													$('#loc-veri-error').html(fp.errMsg.noServ);
													return;
												}
												if((param && param.type)) {
													var tgtLink = $(param.currentTarget),
														MYA_link = tgtLink.is('a[href$="manageyouraccount"]'),
														tgtForm = tgtLink.closest('form.aud-seg');
													if(tgtLink.length && tgtForm.length) {
														$(tgtLink).text(fp.getCookie('fp_city').replace(/\"/g,'')+', '+fp.getCookie('fp_state'));
														link = '/'+$('#service-opt').val();
														tgtForm.attr('action', link);
														if(!fp.getCookie('fp_audience') && !fp.pageType().isLanding) {
															fp.setCookie('fp_audience', $('#service-opt').val(), 365);
														}
														if(response && (response.bleeding || (response.cookies == 'false'))) {
															return;
														} else {
															fp.reloadOnPopClose = false;
															$.modal.close();
														}
													} else if(tgtLink.length && MYA_link) {
														var telco = $.trim(fp.getCookie('fp_telco')).split('-').shift(),
															redURL = (telco === 'NNE')? 'https://crmext.fairpoint.com/elogin/Home.aspx' : '/'+'residential/support/myaccount';														
														if(telco === 'NNE') {
															//$.modal.close();
															window.location.reload();
															//$('a[href$="manageyouraccount"]').removeClass('location').attr('href', redURL).attr('target', '_blank');
															//$('a:locPop').unbind('location').unbind('click');
															window.open(redURL);
														} else {
															window.location = redURL;
														}
													} else {
														var cookiedLocation = tgtLink.closest('.location').next().find('.search-input').length;
														link = (cookiedLocation)? window.location.href : tgtLink.attr('href');
														window.location = link;
													}
												} else {
													if(response && (response.bleeding || (response.cookies == 'false'))) {
														return;
													} else {
														window.location = link;
													}
												}
												
											},
											error: function(jqXHR, textStatus, errorThrown) {
												_debug('Error during ajax call while submitting zip code to: '+ ajaxURL);
											}
										}); 
										
								}
							});
						},
						/*onClose: (param && param.checkCookie)? function(dialog){if(!fp.getCookie('fp_telco')) {window.location = '/'; checkCancel(dialog);}} : function(dialog){checkCancel(dialog);}*/
						onClose: function(){
							fp.reloadOnPopClose = (!fp.pageType().isLanding && !fp.telcoCookie) && (!fp.pageType().isGlobal && !fp.pageType().isWholesale);
							
							if(fp.reloadOnPopClose) {
								window.location = '/'+fp.actBU;
								fp.reloadOnPopClose = true;
							} else {
								$.modal.close();
							}
						}
					});
		},
		rrHeightFix: function() {
			$('#body-container').addClass('clearfix');
			var rr = $('.rightRail, #right-rail, .right-rail-liquid');
			var msg = $('#sysITmsg');
			var header_height = $('#header').height();
			var rr_height = rr.height();
			var body_height = $('#body-container').outerHeight();
			var msg_height = msg.is(':visible')? msg.outerHeight() : 0;
			var offset = rr.closest('.breadcrumb-right-rail').length? 0 : 75;
			var netBodyHeight = body_height-header_height;
			if(rr_height > netBodyHeight) {
				$('#body-container').height(rr_height+header_height+msg_height+offset);
			}
		}
	}
}();

$(function(){
	
	var forms = $('form');
	
	if(forms.length) forms.attr('autocomplete', 'off');
	
	if(location.href.match(/fp-newsroom|news_archive/)) {
		$(document).ajaxComplete(function(event, XMLHttpRequest, ajaxOptions){
			if(ajaxOptions.url.match(/\/common\_code\/newstransformation.jsp/))	fp.rrHeightFix();
		});
	} else {
		fp.rrHeightFix();
	}
	$('#recaptcha_reload_btn').click(function(e){ //Recaptcha reload
		  e.preventDefault();
		  Recaptcha.reload();
	  });
	  
	  $('#recaptcha_switch_audio_btn').click(function(e){ //Switch Recaptcha to Audio mode
		  $(this).hide();
		  Recaptcha.switch_type('audio');
		  $(this).hide();
		  //$(this).addClass('recaptcha_only_if_image');
		  $('#recaptcha_switch_img_btn').removeAttr('class').show();
		  return false;
	  });
	  
	  $('#recaptcha_switch_img_btn').click(function(e){ //Switch Recaptcha to text mode
		  $(this).hide();
		  Recaptcha.switch_type('image');
		  $(this).hide();
		  //$(this).addClass('recaptcha_only_if_audio');
		  $('#recaptcha_switch_audio_btn').removeAttr('class').show();
		  return false;
	  });
	
	$('#recaptcha_whatsthis_btn').live('mouseover', function(e){ //Recaptcha help button (mouseover popup)
		$('#captchaHelp').fadeIn('slow');
		$(this).unbind('click').attr('href', '#').removeAttr('target').find('#recaptcha_whatsthis').unbind('click');
	}).live('mouseout', function(e){
		$('#captchaHelp').fadeOut('slow');
	}).live('click', function(e){
		e.preventDefault(); return false;
	});
	
	//Prevent entering other than numbers in location popup text boxes
	$('#loc-veri-form input[type="text"]').numOnly();
	
	//Equalize the height of footer's middle content in the common feature box
	$('tr.footerRow>td[class^="box_"] div.common-features').eqHeight();
	
	if(location.href.match(/fp-newsroom/) && ($.browser.msie && parseInt($.browser.version) == 9)) {
		$('#articleTopic option:first, #articleType option:first').attr('selected', 'selected');
	}
	
	if(location.href.match(/industry_solutions/) && ($.browser.msie && parseInt($.browser.version) == 7)) {
		var footRow = $('.tableContainer table.fourColumn tr.footerRow');
		if(footRow.length && (footRow.find('td[class^="box_"]').length == 2)) {
			footRow.find('td[class^="box_"]').find('div:first-child').width(450);
		}
	}
	
	if($('.tip-mask').length) {
		$('.tip-mask').each(function(c){
			var $this = $(this);
			$this.data('defaultText', $this.val()).addClass('tool-tip');
		})
	}
	
	//On newroom page - adds class "last" in the Event List
	if($('ul.event-list').length) {
		$('ul.event-list li:last').addClass('last');
	}
	
// For tabbing phone box's		   >>>>>>>>>>>>>>>>>>>>> TO BE REMOVED FOR NEW ENTRY EXPERIENCE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< XXXXXX :: XXXXX
		var phoneFocus = $('#phone1, #phone2, #phone3, #altphone1, #altphone2, #altphone3');
			if (phoneFocus.length > 0) {
				phoneFocus.each(function(c){
					$(this).keydown(function(e){
						if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
							if($(this).val().length == parseInt($(this).attr('maxlength'))) {
								if(phoneFocus[c+1]) phoneFocus[c+1].focus();
							}
						}
					});
				});
		  }
// For tabbing phone box's end		   
		   $('#service-opt').change(function(){
			   link = '/'+$(this).val();
			   $(this).closest('form').attr('action', link);
			});
			
			$('form.aud-seg').submit(function(e){
				e.preventDefault();
				if(!fp.getCookie('fp_audience')) {
					fp.setCookie('fp_audience', $('#service-opt').val(), 365);
				}
				$(this).attr('action', '/'+$('#service-opt').val());
				this.submit();
			});
//  Function for accordian.
	$('.accordian_leadership .expander:eq(0)').addClass('open'); 
	$('.accordian_leadership .expander:eq(0)').next().show();
	$('.expander').click(function(e){
		e.preventDefault();
		q = $(this);
		c = $('#body-container');
		q.toggleClass('open');
		q.next().slideToggle({ duration: 500, easing: 'easeOutQuad', complete: function(){/*
			q.data('h', $(this).height());
			if($(this).is(':visible')) {
				c.height(c.height()+q.data('h'));
			} else {
				c.height(c.height()-q.data('h'));
			}
		*/}});
	});
	
	if($('.hilite-smb').length > 0) $('.hilite-smb').fpHiliteBox({mode:'fixed'});
	
	if($('.hilite-fixed').length > 0) $('.hilite-fixed').fpHiliteBox({mode:'fixed'});
	if($('.vantageFeatureSet').length > 0) $('.vantageFeatureSet').fpHiliteBox({mode:'fixed'});

	if($('.serviceWraper').length > 0) $('.serviceWraper').fpHiliteBox({mode:'fixed'});
	if($('#wholsale-land-hilite').length > 0) $('#wholsale-land-hilite').fpHiliteBox({mode:'fixed'});
	if($('#wholsale-local-hilite').length > 0) $('#wholsale-local-hilite').fpHiliteBox({mode:'fixed'});
	if($('.hilite-liquid').length > 0) $('.hilite-liquid').fpHiliteBox({mode:'liquid'});
	if($('.hilite-bundle-landing').length > 0) {
		$('.hilite-bundle-landing').fpHiliteBox({
			mode:'liquid',
			headerClass: 'ServicesTableHdr',
			bodyClass: 'ServicesTableBdy',
			footerClass: 'ServicesTableFtr'
		});
	}

	if($('.hilite-eth-landing').length > 0) {
		$('.hilite-eth-landing').fpHiliteBox({
			mode:'liquid',
			headerClass: 'ServicesTableHdr',
			bodyClass: 'EthTableBdy',
			footerClass: 'ServicesTableFtr'
		});
	}
	
	if($('.hilite-internet-landing').length > 0) {
		$('.hilite-internet-landing').fpHiliteBox({
			engrave: {index: 2, offset: 8},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'internet-bdy',
			footerClass: 'internet-ftr',
			shadow: false
		});
	}
	if($('#smb-voice-ex-me').length > 0) {
		$('#smb-voice-ex-me').fpHiliteBox({
			engrave: {index: 1, offset: 0},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'smb-bdy',
			footerClass: 'smb-ftr',
			shadow: false
		});
	}
	if($('#smb-voice-ex-nh').length > 0) {
		$('#smb-voice-ex-nh').fpHiliteBox({
			engrave: {index: 2, offset: 0},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'smb-bdy',
			footerClass: 'smb-ftr',
			shadow: false
		});
	}
	if($('#smb-voice-local-me').length > 0) {
		$('#smb-voice-local-me').fpHiliteBox({
			//engrave: {index: 2, offset: 0},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'smb-bdy',
			footerClass: 'smb-ftr',
			shadow: false
		});
	}
	if($('#smb-voice-intl').length > 0) {
		$('#smb-voice-intl').fpHiliteBox({
			engrave: {index: 1, offset: 0},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'smb-bdy',
			footerClass: 'smb-ftr',
			shadow: false
		});
	}
	if($('.hilite-2nd').length > 0) {
		$('.hilite-2nd').fpHiliteBox({
			engrave: {index: 1, offset: 4},
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'internet-bdy',
			footerClass: 'internet-ftr',
			shadow: false
		});
	}
	if($('.hilite-games').length > 0) {
		$('.hilite-games').fpHiliteBox({
			mode: 'liquid',
			headerClass: 'service-charge',
			bodyClass: 'internet-bdy',
			footerClass: 'internet-ftr',
			shadow: false
		});
	}
	if($('.landing_backup_sharing').length > 0) {
		$('.landing_backup_sharing').fpHiliteBox({
			//engrave: {index: 2, offset: 8},
			boxClasses: ['box3','box1','box2','box4'],
			mode: 'liquid',
			headerClass: 'per-month',
			bodyClass: 'bkp-bdy',
			footerClass: 'short-benefit',
			shadow: true
		});
	}
	if($('.smb-premium-support').length > 0) {
		$('.smb-premium-support').fpHiliteBox({
			//engrave: {index: 2, offset: 8},
			boxClasses: ['box1','box2','box3','box4'],
			mode: 'liquid',
			headerClass: 'per-month service-charge',
			bodyClass: 'bkp-bdy',
			footerClass: 'short-benefit',
			shadow: false
		});
	}
	if($('.service-support-wrapper').length > 0) {
		$('.service-support-wrapper').fpHiliteBox({
			mode: 'fixed',
			headerClass: 'support-hdr',
			bodyClass: 'support-bdy',
			footerClass: 'support-ftr',
			equalize: 2,
			shadow: false
		});
	}
	if($('.ws-support').length > 0) {
		$('.ws-support').fpHiliteBox({
			mode: 'fixed',
			headerClass: 'support-hdr',
			bodyClass: 'support-bdy-text',
			footerClass: 'support-ftr',
			shadow: false
		});
	}
	if($('#is-land-hilite').length > 0) {
		$('#is-land-hilite').fpHiliteBox({
			mode: 'liquid',
			headerClass: 'support-hdr',
			bodyClass: 'support-bdy-text',
			footerClass: 'support-ftr',
			shadow: false
		});
	}
});

/*--------------------- Java Script for Support Detail Page End ---------------------------------*/

$(document).ready(function() {
	if(locationFlag==false)
	{
		$('#loc-veri').modal();
		$('#btn-con-phn').hide();
		$('#btn-con-zip').show();
	}
	
	$('a[href$="manageyouraccount"]').addClass('location');
	
	fp.telcoCookie = (fp.getCookie('fp_telco') && fp.getCookie('fp_telco') != 'Generic');

	fp.pageType = function(){
		var pagetype = {};
		 	pagetype.raw = $('#page_type').text(),
			pagetype.serviceCode	= $.trim(pagetype.raw.split('|').shift()),
			pagetype.isLanding	= $.trim(pagetype.raw.split('|').pop()).toLowerCase() === 'landing page';
			pagetype.isGlobal = window.location.href.match(/\/global\//);
			pagetype.isWholesale = window.location.href.match(/\/wholesale/);
			return pagetype;
	};
	
	fp.buDiv = $('#BU');
	fp.actBU = $.trim(fp.getCookie('activeBU').toLowerCase()).replace(/\s/g, '_').replace(/\"/g, '') || $.trim(fp.buDiv.text().toLowerCase()).replace(/\s|\"/g, '_').replace(/\"/g, '') || 'residential';
	
	if(!fp.pageType().isLanding && !fp.getCookie('fp_audience')) {
		if(fp.buDiv.length) {
			fp.setCookie('fp_audience', fp.actBU, 365);
		}
	}
	
	$('#service-opt').val(fp.actBU);
	
	//Chcking if page has no Telco cookie and adding "location" class on appropriate anchor to show popups.
	if(!fp.telcoCookie){
		$('a:locPop, area:locPop').addClass('location');
	}
	
	
	if(document.getElementById("contact-us")){
		if(location.search!=""){
			if(location.search.indexOf("emailSuccess")>0){
				$('#emailSuccessMessage').modal();
			}
			else if(location.search.indexOf("emailFailure")>0){
				$('#emailFailureMessage').modal();
			}
		}
	}

  $(".fp-header-tabs a").each(function(c){
	  	$(this).hover(function(){if(!$(this).parent().hasClass('active')) $(this).parent().addClass('hover');
	  }, function(){
		$(this).parent().removeClass('hover');
	  }).click(function(){
		$(this).parent().removeClass('hover').closest('.availability-bdy').find('div[id^="error"]').hide();
		if($('#errorBleed').length)	{
			$('#errorBleed').removeData('bleed');
		}
	  })
  });
  
	if(typeof($.fn.slider) === 'function') {
		tvPkgSlider();
		phonePkgSlider();
		speedPkgSlider();
		phone2Slider()
		tv2Slider()
		internet2Slider()
		
		if($('#speedSlider-Box').parents('#internetDiv').is(':visible')) {
			val2 = $( "#speedSlider-Box" ).slider( "value" );
		} else {
			val2 = $( "#tvSlider-Box" ).slider( "value" );
		}
		$( ".totalAmount" ).html('=$'+(val1+val2)+"<sup>.00</sup>" );
		$( ".totalAmount2" ).html('=$'+(val4+val5+val6)+"<sup>.00</sup>");
	}
	
var val1 = 315;
var val2 = 22;
var val3 = 2;
var val4 = 2;
var val5 = 2;
var val6 = 2;

$('input[type="text"]').focus(function() {
    $(this).addClass("in-focus");
});
 
$('input[type="text"]').blur(function() {
    $(this).removeClass("in-focus");
});
// code for Modal Window end

//---------------Modal Window end---------- -----------------------------------------

	$("ul.fp-header-tabs li").click(function() {
		$(this).addClass("active").siblings().removeClass('active');
	});
		
	function setMyCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+ "; path=/";
	document.cookie=c_name + "=" + c_value;
}
	
	$('li.headlink').hover(
			function() { $('ul', this).css('display', 'block'); },
			function() { $('ul', this).css('display', 'none'); });

	
	
// for clear text feild 
var clearMePrevious ='';
	$('#fp-headerSearch').focus(function(){
		if($(this).val()==$(this).attr('value')){
			clearMePrevious = $(this).val();
			$(this).val('');
		}
	});


	$('#fp-headerSearch').blur(function(){
		if($(this).val()==''){
		$(this).val(clearMePrevious);
		}
	});
// for clear text feild end
$('#tvHdr').click(function() {
	$( ".totalAmount" ).html('=$'+(val1+val3)+"<sup>.00</sup>"  );
	$('#internetDiv').hide();
  	$('#TvDiv').show();
	$(this).switchClass("internetTvHead", "selecthead", 10);
	$('#internetHdr').switchClass("selecthead", "internetTvHead", 10);
	$('.internerTvBody').switchClass('internerTvBody','tvInternerBody', 10);
});


$('#internetHdr').click(function() { 
	$( ".totalAmount" ).html('=$'+(val1+val2)+"<sup>.00</sup>"  );
 	$('#TvDiv').hide();
  	$('#internetDiv').show();	
	$(this).switchClass("internetTvHead", "selecthead", 10);
	$('#tvHdr').switchClass("selecthead", "internetTvHead", 10);
	$('.tvInternerBody').switchClass('tvInternerBody','internerTvBody', 10);	
});


/*$("#btn-reset").click(function() {
  $("label.error").hide();
  $(".error").removeClass("error");
});*/


$('#fsubmit').click(function() { 
$("#Req-call").validate({
	rules: {
	  Fname: "required",
	  Lname: "required",
	  phone3: "required",
	  interest:"required",
  		   email: {
				 email: true
			 }
		 },
	 messages: {
		 Fname: "Please specify your First Name.",
		 Lname: "Please specify your Last Name.",
		 phone3:"Please enter your Phone Number.",
		 interest:"Please select an interest area.",
		 email: {
			 required: "We need your email address to contact you.",
			 email: "Your email address must be in the format of name@domain.com."
		  }
	 },
	 
	groups: {
    Phone: "phone1 phone3"},
  errorPlacement: function(error, element) {
     if (element.attr("name") == "phone1" 
                 || element.attr("name") == "phone3" )
       error.insertAfter("#phone3");
	 else
       error.insertAfter(element);
   },
   

	meta: "validate",
   submitHandler: function(form) {form.submit() },

debug:true
		 
	});
});
$('#ac-btn-add').click(function() { 
	$("#manage-ac").validate({
	
		rules: {
			  unit_typ: "required",
			  city: "required",
			  state: "required",
			  zip_code:"required"
			}
		  });	
	});
	
	$('.tab-address').click(function() {
		$('#tel-con').hide();
		$('#add-con').show();
		$('#btn-con-zip').hide();
		$('#btn-con-phn').show();
 });
$('.tab-telephone').click(function() {
		$('#add-con').hide();
		$('#tel-con').show();
		$('#btn-con-zip').show();
		$('#btn-con-phn').hide();
	
 });

//function for contact us form validation start
$('#btn-reset').click(function() { 
	contactValidator.resetForm();
	$('#recaptcha_widget_div').css({border: '1px #ccc solid'});
	$('#captchaError').hide();
	$(this).closest('form').find(':input').removeClass('in-focus');
});

contactValidator=$("#contact-us").validate({
	rules: {
	  Fname: "required",
	  Lname: "required",
	  phone1: {
			required: true,
			digits: true,
			minlength: 3,
			maxlength: 3
		},
		phone2: {
			required: true,
			digits: true,
			minlength: 3,
			maxlength: 3
		},
		phone3: {

			required: true,
			digits: true,
			minlength: 4,
			maxlength: 4
		},
		altphone1: {
			required: true,
			digits: true,
			minlength: 3,
			maxlength: 3
		},
		altphone2: {
			required: true,
			digits: true,
			minlength: 3,
			maxlength: 3
		},
		altphone3: {
			required: true,
			digits: true,
			minlength: 4,
			maxlength: 4
		},
		zip_code:{
			 required: true,
			 zip: true,
			 digits: true,
			 minlength: 5,
			 maxlength: 5
		},
	  interest: "required",
	  priority: "required",
  	  email: {
		 required: true,
		 email: true
	   },
	   recaptcha_response_field: {
		   required: true
	   }
	},
	 messages: {
     Fname: "Please specify your First Name.",
	 Lname: "Please specify your Last Name.",
	 zip_code: {
      		 required: "Please enter the zip code.",
       		 digits: "Please enter a valid zip code.",
			 minlength: "Please enter a valid 5-digit ZIP code.",
			 maxlength: "Please enter a valid 5-digit ZIP code."
   		  },
	   phone1:{
		 required: "Please enter your Phone Number.",
		 digits: "Please enter a valid Phone Number.",
		 minlength: "Please enter a valid Phone Number.",
		 maxlength: "Please enter a valid Phone Number."
	  },
	  phone2:{
		 required: "Please enter your Phone Number.",
		 digits: "Please enter a valid Phone Number.",
		 minlength: "Please enter a valid Phone Number.",
		 maxlength: "Please enter a valid Phone Number."
	  },

	 phone3:{
      	 required: "Please enter your Phone Number.",
       	 digits: "Please enter a valid Phone Number.",
		 minlength: "Please enter a valid Phone Number.",
		 maxlength: "Please enter a valid Phone Number."
	  },
	 altphone1:{
		 required: "Please enter your Alternate Phone Number.",
		 digits: "Please enter a valid Alternate Phone Number.",
		 minlength: "Please enter a valid Alternate Phone Number.",
		 maxlength: "Please enter a valid Alternate Phone Number."
	  },
	   altphone2:{
		 required: "Please enter your Alternate Phone Number.",
		 digits: "Please enter a valid Alternate Phone Number.",
		 minlength: "Please enter a valid Alternate Phone Number.",
		 maxlength: "Please enter a valid Alternate Phone Number."
	  },
  altphone3:{
		 required: "Please enter your Alternate Phone Number.",
		 digits: "Please enter a valid Alternate Phone Number.",
		 minlength: "Please enter a valid Alternate Phone Number.",
		 maxlength: "Please enter a valid Alternate Phone Number."
	  },
	  interest: "Please select an interest area.",
	  priority: "Please select the priority.",

     email: {
      		 required: "Please enter your email address.",
       		 email: "Email address must be in the format of name@domain.com."
   		  },
	  recaptcha_response_field: {
	   	required: "Please type both words separated by a space."
   	  }
	 
	 },
	 
	groups: {
    Phone: "phone1 phone2 phone3",
	AlternatePhone: "altphone1 altphone2 altphone3"},
  errorPlacement: function(error, element) {
     if (element.attr("name") == "phone1" || element.attr("name") == "phone2" 
                 || element.attr("name") == "phone3" )
       error.insertAfter("#phone3");
	 else if (element.attr("name") == "altphone1" || element.attr("name") == "altphone2" 
                 || element.attr("name") == "altphone3" )
       error.insertAfter("#altphone3");
	 else if (element.attr("name") == "recaptcha_response_field")
	 	error.insertBefore('#captchaError');
     else
       error.insertAfter(element);
   },
   highlight: function(element, errorClass, validClass){
	   $(element).removeClass(validClass).addClass(errorClass);
	   $('#captchaError').hide();
	},
   submitHandler: function(form) {
		//form.submit();
		$.ajax({
			url: $(form).attr('action')+'?callback=callBackFunc',
			type: $(form).attr('method'),
			data: $(form).serialize(),
			crossDomain: true,
			dataType: 'jsonp',
			contentType: 'application/json; charset=utf-8',
			//jsonp: 'callBackFunc',
			jsonpCallback: 'callBackFunc',
			beforeSend: function(){
				$('#captchaError').hide();
				if(!$('#wait-anim').length) $(document.body).append('<div id="wait-anim" style="display:none;"><img title="" alt="" src="/cmsimages/channel-loader.gif" /></div>');
				$('#wait-anim').modal({
					escClose: false,
					opacity: 20
				});
			},
			success: function(msg){
				_debug('success');
			},
			error: function(xhr){
				_debug(xhr);
				_debug('error during contact us form submission via AJAX call');
			}
		});
	}
});
//function for contact us form validation end

if($('.msg').length > 0 ) {
	$('.msg img').click(function() { 
		$('.msg').slideUp('medium', false, function(){
			if($.browser.msie && parseInt($.browser.version) === 7 && $('.topDropdown').length) {
				$('.fp-header-nav').css({position: 'absolute'});
				if((window.location.href.match(/\/wholesale/) || window.location.href.match(/\/global/)) && $('.aud-seg').length) {
					$('.topDropdown').position({
						my: 'left top',
						at: 'right top',
						of: '.logoContainer',
						collision: 'none',
						offset: '30 -10'
					});
				} else {
					$('.topDropdown').position({
						my: 'left top',
						at: 'right top',
						of: '.logoContainer',
						collision: 'none',
						offset: '30 16'
					});
				}
			}
		});
	});
}


$('a[href*="liveChat=yes"]').click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=400, height=400");
});

if($('#segments-gw').length) {
	fp.gw = true;
	
	if(window.location.href.match(/userIP=/) || (fp.getCookie('newloc') || fp.getCookie('fp_state'))) {
		$('.gw-btnset:visible').prevAll('a.location:first').attr('href', window.location.href);
		$(".fp-header-tabs a").click(function(){
			var indx = $(this).parent().index();
			$('.seg-mid:eq('+indx+')').find('.gw-btnset').prevAll('a.location:first').attr('href', window.location.href);
		});
	}
	$('a[href*="vantagepoint"]').addClass('location');
}

$('#body-gw .seg-mid .gw-btnset a, a.location, area.location, .location a, #header .fp-header-tabs a').bind('click', function(e){
	var $this = $(this);
	link = (fp.gw || $this.is('.site-map-container a.location'))? $this.attr("href") : ($this.is('.location a') || $this.is('a.location'))? window.location.href : $this.attr("href");
	
	if(typeof(isValidIPForCrawl) == "undefined" || isValidIPForCrawl == 'false' || !isValidIPForCrawl || $this.is('a.location') || $this.is('.location a')) {
		if($this.attr('href').search(/small_business|enterprise|industry_solution|manageAccountURL|residential/)>=0 || $(this).closest('.location').length || $this.is('a.location') || $this.is('.location a')) {
			if((!$this.is('.fp-header-tabs a') && !$this.is('.site-map-container a.location')) || !fp.telcoCookie){
				fp.verificationModal(e);
				return false;
			}
		}
	//$('#location-varification-zip')
	} else {
		if($this.attr('href').match(/manageAccountURL/)) {
			sendUserAway(fp.getCookie('newloc'), link);
			//window.location = manageAccIndexedLocation[parseInt(fp.getCookie('newloc'))];
			return false;
		} else {
			if(fp.getCookie('newloc')) {
				if(fp.getCookie('fp_zip')) {
					//send_user(link, 'zip'); 
					window.location = link;
					return false;
				}
			}
		}
	}
});

isValidIPForCrawl = fp.telcoCookie;

if(!fp.telcoCookie) {
	locationPopup();
}

// Function to handle the hover behavior for different html element in IE6
if($.browser.msie && $.browser.version == "6.0" )
{
	$(".ie6hover").hover(function()
	{
		$(this).addClass("hover");
	},
	function()
	{
		$(this).removeClass("hover");
	});		
}

}); // document.ready() ends
/*---------------------Script for Tripal Slider Start--------------------------------------*/

function checkCancel(dialog) {
	$.modal.close();
	return false;
}

function phone2Slider(){
	$("#phone2-Box" ).slider({
			range: "max",
			min: 10,
			max: 50,
			value: 29,
			
			slide: function(event, ui) {
				val4 = ui.value;
				$( ".PackegAmount2" ).html('$'+val4);
				$( ".totalAmount2" ).html('=$'+(val4+val5+val6)+"<sup>.00</sup>" );
			}
		});
		$( ".PackegAmount2" ).html('$'+ $( "#phone2-Box" ).slider( "value" ));
		
		val4 = $( "#phone2-Box" ).slider( "value" );
}

function tv2Slider(){
	$("#tvSlider2-Box" ).slider({
			range: "max",
			min: 1,
			max: 200,
			value: 100,
			slide: function(event, ui) {
				val5 = ui.value;
				$( ".tvAmount2" ).html('$'+val5);
				$( ".totalAmount2" ).html('=$'+(val4+val5+val6)+"<sup>.00</sup>" );
			}
		});
		$( ".tvAmount2" ).html('$'+ $( "#tvSlider2-Box" ).slider( "value" ));
		
		val5 = $( "#tvSlider2-Box" ).slider( "value" );
}

function internet2Slider(){
	$("#internetSlider-Box" ).slider({
			range: "max",
			min: 100,
			max: 500,
			value: 295,
			slide: function(event, ui) {
				val6 = ui.value;
				$( ".internetAmount" ).html('$'+val6);
				$( ".totalAmount2" ).html('=$'+(val4+val5+val6)+"<sup>.00</sup>" );
			}
		});
		$( ".internetAmount" ).html('$'+ $( "#internetSlider-Box" ).slider( "value" ));
		
		val6 = $( "#internetSlider-Box" ).slider( "value" );
}


/*---------------------Script for Tripal Slider End--------------------------------------*/


function tvPkgSlider(){
	$("#tvSlider-Box" ).slider({
			range: "max",
			min: 100,
			max: 500,
			value:315,
			step:70,
			slide: function(event, ui) {
				val3 = ui.value;
				$( ".tvAmount" ).html('$'+val3);
				$( ".totalAmount" ).html('=$'+(val1+val3)+"<sup>.00</sup>" );
			}
		});
		$( ".tvAmount" ).html('$'+ $( "#tvSlider-Box" ).slider( "value" ));
		
		val3 = $( "#tvSlider-Box" ).slider( "value" );
}

function phonePkgSlider(){
	$("#slider-Box" ).slider({
			range: "max",
			min: 100,
			max: 500,
			value: 315,
			step:70,
			slide: function( event, ui ) {
				val1 = ui.value;
				if($('#speedSlider-Box').parents('#internetDiv').is(':visible')) {
					val2 = $( "#speedSlider-Box" ).slider( "value" );
				} else {
					val2 = $( "#tvSlider-Box" ).slider( "value" );
				}
				$( ".PackegAmount" ).html('$'+val1);
				$( ".totalAmount" ).html('=$'+(val1+val2)+"<sup>.00</sup>" );
			}
		});
		$( ".PackegAmount" ).html('$'+ $( "#slider-Box" ).slider( "value" ) );
		
		val1 = $("#slider-Box" ).slider( "value" );
}

function speedPkgSlider(){
	$("#speedSlider-Box" ).slider({
			range: "max",
			min: 100,
			max: 500,
			value:315,
			step:70,
			slide: function( event, ui ) {
				val2 = ui.value;
				$( ".speedAmount" ).html('$'+val2);
				$( ".totalAmount" ).html('=$'+(val1+val2)+"<sup>.00</sup>" );
			}
		});
		$( ".speedAmount" ).html('$'+ $( "#speedSlider-Box" ).slider( "value" ) );
}
	
/*------------------Script for slider end----------------------------------------	*/
	
/*------------------Modal window-----------------------------------------------------*/						   
$(function() {
	
	if($.browser.msie && parseInt($.browser.version) == 7) {$('.my-loc-right button span').width(28);}
	
	$('a[href*="modal=yes"]').click(function(){
		var url = $(this).attr('href');
		
		if(url.match(/coverage_map.jsp/)) {
			$('#RAC').width(700).height(562);
			$('#RAC_FRAME').width(700).height(562);
			/*if($.browser.msie || $.browser.webkit) {
				$('#RAC_FRAME').width(700).height(562);
			} else {
				$('#RAC_FRAME').width(700).height(562);
			}*/
		} else if(url.match(/yourbundlespring/)){
			if($.browser.msie) {
				var wid = (parseInt($.browser.version) == 8)? 512 : 552;
				$('#RAC').width(560).height(wid);
				$('#RAC_FRAME').width(560).height(wid);
			}
		}
		
		$('#RAC').modal();
		$('#RAC_FRAME').attr("src",$(this).attr('href').split('?')[0]);
		return false;
	});
	
	if(!$('.fp-header-nav form.aud-seg').length && !$('ul.topDropdown').is(':empty')) {
		$('.fp-header-nav .navigation:first').css({
			'margin-top': 20
		});	
	} else {
		if($.browser.msie && parseInt($.browser.version) == 7) {
			$('form.aud-seg').find('label, select').css({
				float: 'left'
			}).end().find('select').css({
				margin: '0 0 0 3px'
			})/*.end().css({
				'margin-top': 0
			})*/;
			if((window.location.href.match(/\/wholesale/) || window.location.href.match(/\/global/))) {
				$('form.aud-seg').css({
					'margin-top': 40
				});	
			}
		}
	}

	$('.loc-finder').click(function (e) {
	link="";
	e.preventDefault();
		$('#loc-veri').modal();
		$('#btn-con-phn').hide();
		$('#btn-con-zip').show();
	});
	
	$('.coverage-mapLoc').click(function (e) {
		$('#coverage-mapLoc').modal();
		loadMapForm();// ########## Uncommented on 08/24/2011 by Paras as this function is called in coverage map ##########
		return false;
	});
	
	if (jQuery('#fp-headerSearch').length > 0) {
        $("#fp-headerSearch").bind("focus", function(e) {
            if (this.value == 'Search') { this.value = ''; }
        });

        $("#fp-headerSearch").bind("blur", function(e) {
            if (this.value == '') { this.value = 'Search'; }
        });
    }

	/* for dropdown menu Start*/
	if($.browser.msie && parseInt($.browser.version) === 7 && $('.topDropdown').length) {
		$('.topDropdown').appendTo($(document.body)).css({
			position: 'absolute',
			'z-index': 9999
		})
		if((window.location.href.match(/\/wholesale/) || window.location.href.match(/\/global/)) && $('.aud-seg').length) {
			$('.topDropdown').position({
				my: 'left top',
				at: 'right top',
				of: '.logoContainer',
				collision: 'none',
				offset: '30 0'
			});
		} else {
			$('.topDropdown').position({
				my: 'left top',
				at: 'right top',
				of: '.logoContainer',
				collision: 'none',
				offset: '30 16'
			});
		}
	} else {
		$("ul.topDropdown  li.menu, ul.topDropdown  li.menu-medium").hover(function(){    
			$(this).addClass("hover");
			$('ul:first',this).css('visibility', 'visible');
		}, function(){
			$(this).removeClass("hover");
			$('ul:first',this).css('visibility', 'hidden');
		});
	}
    $("ul.topDropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
	
	$('.loc-finder').click(function (e) {
		$('#loc-finder').modal();
		return false;
	});

});
/* for dropdown menu End*/

//Debugging function over console.log() to avoid any error on non-supported browser
function _debug($stuff) {
	if (window.console && window.console.log)
		window.console.log($stuff);
}

function processKeyword(keyword) {
    if (window.RegExp && window.encodeURIComponent)
        return encodeURIComponent(keyword);
    else
        return keyword;
}

function locationPopup() {
	var contactUs 	= (window.location.href.toLowerCase().match(/fp_contact_us/))? true : false,
		gateway		= ($('#segments-gw').length)? true : false,
		global		= (window.location.href.toLowerCase().match(/\/global/))? true : false,
		wholesale	= (window.location.href.toLowerCase().match(/\/wholesale/))? true : false,
		offers		= (window.location.href.toLowerCase().match(/\/current_offers/))? true : false,
		//askLocation	= (((!global && !contactUs) && !wholesale) && !gateway);
		//askLocation = (!gateway && !wholesale && !global || (global && contactUs || global && offers));
		askLocation = (!gateway && !wholesale && !global || (global && offers));
	link = window.location.href;
	if(askLocation) {
		fp.verificationModal({
			//rigid: true,
			//blank: true,
			checkCookie: true
		});
	}
}

function callBackFunc(response){
	if(response.recaptchastatus && response.recaptchastatus === 'false') {
		Recaptcha.reload ();
		$('#recaptcha_response_field').removeClass('valid').addClass('error');
		$('#captchaError').show();
		$.modal.close();
		return;
	} else if(response.recaptchastatus && response.recaptchastatus === 'true'){
		$('#recaptcha_response_field').removeClass('error').addClass('valid');
		$('#captchaError').hide();
	} else if(response.emailstatus && response.emailstatus === 'success') {
		Recaptcha.reload ();
		//form.reset();
		//$('#reset').trigger('click');
		var valObj = contactValidator || donValidator || sponValidator;
		var form = $(valObj.currentForm).attr('id');
		valObj.resetForm();
		switch(form){
			case 'frmDonation' :
			case 'sponsor-request' :
				$.modal.close();
				window.setTimeout(function(){emailConfirmation();}, 500);
				break;
			case 'contact-us':
				$.modal.close();
				$('#'+form)[0].reset();
				window.setTimeout(function(){
						$('#emailSuccessMessage').modal({
							focus: true,
							onShow: function(){
								window.setTimeout(function(){
									$('#recaptcha_response_field').blur(); //IE fix
									$('.simplemodal-close').focus();
								}, 500);
							}
						});
				}, 500);
				break;
			default:
				_debug('Invalid form identifier!');
		}
	} else {
		try{
			parent.$.modal.close();
		} catch(err){
			
		}
	}
}

setCookie = fp.setCookie;
getCookie = fp.getCookie;

