(function( $ ){
	var settings = {
		api:null,
		onInit:null,
		onLogin:null,
		onLogout:null,
		onCheckSession:null
	};
	
	var privateMethods = {
		createCookie: function (name,value,domain) {
			cookie = name+"="+value+"; path=/";
			
			if (domain != null) {
				cookie += "; domain=" + domain;
			}
			
			document.cookie = cookie;
		},
		readCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		eraseCookie: function (name, domain) {
			privateMethods.createCookie(name,"",domain);
		},
		createApiRequest: function(method, data, options){
			data = (data != undefined) ? data : {};
			options = (options != undefined) ? options : {};
			return {
				method:method,
				data:data,
				options:options
			};
		}
	}

	var methods = {
		init : function( options ) {
			return this.each(function(){
				
				jQuery.support.cors = true;
				
				var $this = $(this);
				var data = $this.data('rsplusAuth');
							
				if ( options ) $.extend( settings, options );
								
				// If the plugin hasn't been initialized yet
				if (!data) {	
					$this.data('rsplusAuth', {
						api:'',
						sessionKey:'',
						sessionData:null,
						functions:{
							onInit:null,
							onLogin:null,
							onLogout:null,
							onCheckSession:null
						}
					});
					data = $this.data('rsplusAuth');
				}
				
				data.api = settings.api;
				data.sessionKey = (privateMethods.readCookie('rsplusSessionKey')) ? privateMethods.readCookie('rsplusSessionKey') : false;
				data.functions.onInit = settings.onInit;
				data.functions.onLogin = settings.onLogin;
				data.functions.onLogout = settings.onLogout;
				data.functions.onCheckSession = settings.onCheckSession;

				var hasSessionKey = (data.sessionKey != false);
				$this.trigger('init.rsplusAuth', hasSessionKey);
				if(data.functions.onInit) data.functions.onInit(hasSessionKey);
			});
		},
		checkSession: function(sessionKey){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('rsplusAuth');

				$.ajax({
					url:plus_proxy_endpoint + '?url=' + data.api, 
					data:privateMethods.createApiRequest(
						'check_session', 
						{
							session_key:data.sessionKey
						}
					), 
					success:function(response){
						if(!response) return;
						if(response.success) data.sessionData = response.data.session;
						
						$this.trigger('checkSession.rsplusAuth', response);
						if(data.functions.onCheckSession) data.functions.onCheckSession(response);
					}, 
					dataType:'json',
					cache:false,
					type:'POST'
				});
			});
		},
		login: function(username, password, redirect, el){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('rsplusAuth');
				
				redirect = (redirect != undefined) ? redirect : false;
				el = (el != undefined) ? el : false;

				$.ajax({
					url:plus_proxy_endpoint + '?url=' + data.api,
					data: privateMethods.createApiRequest(
						'login', 
						{
							username:username,
							password:password
						}
					),
					success:function(response){
						if(!response) return;
						if(response.success){
							data.sessionData = response.data.session;
							privateMethods.createCookie('rsplusSessionKey', data.sessionData.key);
							
							authTkt = response.data.authTkt;
							privateMethods.createCookie('rsplusBondiKey', authTkt, '.rollingstone.com');
						}
						$this.trigger('login.rsplusAuth', response, redirect, el);
						if(data.functions.onLogin) data.functions.onLogin(response, redirect, el);
					}, 
					dataType:'json',
					cache:false,
					type:'POST'
				});
			});
		},
		logout:function(redirect, el){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('rsplusAuth');
				
				redirect = (redirect != undefined) ? redirect : false;
				el = (el != undefined) ? el : false;
				
				var sessionKey = (privateMethods.readCookie('rsplusSessionKey')) ? privateMethods.readCookie('rsplusSessionKey') : false;
				
				if(sessionKey){
					$.ajax({
						url:plus_proxy_endpoint + '?url=' + data.api,
						data: privateMethods.createApiRequest(
							'logout', 
							{
								session_key:sessionKey
							}
						),
						success:function(response){
							if(!response) return;
							if(response.success){
								data.sessionData = data.sessionKey = null;
								privateMethods.eraseCookie('rsplusSessionKey');
								privateMethods.eraseCookie('rsplusBondiKey', '.rollingstone.com');
							}
							$this.trigger('logout.rsplusAuth', response, redirect, el);
							if(data.functions.onLogout) data.functions.onLogout(response, redirect, el);
						}, 
						dataType:'json',
						cache:false,
						type:'POST'
					});					
				}
			});	
		}
	};
		
	$.fn.rsplusAuth = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.rsplusAuth' );
		}    
	
	};	
})( jQuery );
