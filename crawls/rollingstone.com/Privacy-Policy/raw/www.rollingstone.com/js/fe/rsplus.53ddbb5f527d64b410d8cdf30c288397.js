var rsUpsell = null;

//see apps/fe/config/app.yml # Rolling Stone Plus URLs
var rsPlusArchiveUrl = 'http://archive.rollingstone.com/';
var rsPlusArchiveRedirectUrl = 'http://archive.rollingstone.com/Adapters/RollingStoneAuthAdapter/RegisterReturn';
var rsPlusArchiveLegacyUrl = '/plus/archive';

$(function(){
	document.createElement('rs:plus-upsell');
	
	rsUpsell = $('rs\\:plus-upsell, plus-upsell').eq(0);
	
	rsUpsell.rsplusEmbed({
		api:plus_embed_endpoint,
		onLogin:function($form){
			var username = $form.find('input[name="username"]').val();
			var password = $form.find('input[name="password"]').val();
			
			if(username.length && password.length) rsUpsell.rsplusAuth('login', $form.find('input[name="username"]').val(), $form.find('input[name="password"]').val());
			return false;
		}
	}).rsplusAuth({
		api:plus_api_endpoint,
		onInit:function(hasSessionKey){
			if(hasSessionKey){
				rsUpsell.rsplusAuth('checkSession');
			}else{
				rsUpsell.rsplusEmbed('render', false);
			}
		},
		onCheckSession:function(response){
			rsUpsell.rsplusEmbed('render', response.success);
		},
		onLogin:function(response){
			$('.login-form').find('.error-message').remove();
			if(response.success){
				rsUpsell.rsplusEmbed('render', response.success);
			}else{
				var error = $('<p class="error-message"></p>').text(response.message);
				$('.login-form').after(error);
			}
		}
		
	});
	
	// Add auth plugin to the body, as it is a global plugin and does not need to be associated with any specific element
	$('body').rsplusAuth({
		api:plus_api_endpoint,
		onLogin:function(response, redirect, element){
			if(response.success){
				if(redirect){
					if(String(window.location).search('plus/archive#') != -1){
						window.location.reload();
					}else{
						window.location = redirect;
					}
				}else{
					$('#logged-in .username').text(response.data.session.username)
					$('#logged-in').show();
					$('#logged-out').hide();
				}	
			}else{
				var error = $('<p class="error-message"></p>').text(response.message);
				element.after(error);			
			}
		}, 
		onLogout:function(response, redirect, element){
			if(response.success){
				if(redirect){
					if(String(window.location).search('plus/archive#') != -1){
						window.location.reload();
					}else{
						window.location = redirect;
					}
				}else{
					$('#logged-in').hide();
					$('#logged-out').show();
				}	
			}
		},
		onCheckSession: function(response) {
			if(response.success) {
				$('#logged-in span.username').html(response.data.session.username);
				$('#logged-in').show();
				$('#logged-out').hide();
			}
			else{
				$('#logged-out').show();
				$('#logged-in').hide();
			}
			
		}
	});
	
	$('body').rsplusAuth('checkSession');
	
	$('.login-form:not(#promoBoxLogin1)').live('submit', function(){
		var $this = $(this);
		if($this.attr('data-action') != undefined){
			action = ($this.attr('data-action') == 'false') ? false : $this.attr('data-action');
		}else if (match = document.cookie.match(/archiveSearch=([\{].+[\}])/)) {
			var archiveSearch = JSON.parse(match[1]);
			action = archiveSearch.url; 
		}else{
			action = (window.location.hash.length) ? rsPlusArchiveLegacyUrl + window.location.hash : rsPlusArchiveRedirectUrl;
		}
		
		$('body').rsplusAuth('login', $(this).find('input[name="username"]').val(), $(this).find('input[name="password"]').val(), action, $this);
		
		return false;
	});

	$('.logout-btn').live('click', function(){
		var $this = $(this);
		if($this.attr('data-action') != undefined){
			action = ($this.attr('data-action') == 'false') ? false : $this.attr('data-action');
		}else{
			action = (window.location.hash.length) ? rsPlusArchiveLegacyUrl + window.location.hash : rsPlusArchiveRedirectUrl;
		}
		
		$('body').rsplusAuth('logout', action, $this);

		return false;
	});

	// Html5 Placeholder cross-browser support plugin 
    var inputs = $('.login-form > input[placeholder]');

    if(inputs.length) {
    	inputs.placeholder();
    }
});