(function( $ ){
	
	var settings = {
		api:null,
		onInit:null,
		onRender:null,
		allowedAttributes: ['title', 'url', 'content-id', 'issue-id', 'authenticated','type']
	};
	
	var methods = {
		init : function( options ) {
			return this.each(function(){
				
				var $this = $(this);
				var data = $this.data('rsplusEmbed');
							
				if ( options ) $.extend( settings, options );
								
				// If the plugin hasn't been initialized yet
				if (!data) {	
					$this.data('rsplusEmbed', {
						api:'',
						atts:[],
						getVars:{},
						allowedAttributes: null,
						functions:{
							onInit:null,
							onRender:null,
							onLogin:null
						}
					});
					data = $this.data('rsplusEmbed');
				}
				
				data.api = settings.api;
				data.atts = $this[0].attributes;
				data.functions.onInit = settings.onInit;
				data.functions.onRender = settings.onRender;
				data.functions.onLogin = settings.onLogin;
				data.allowedAttributes = settings.allowedAttributes;
				
				for(var i=0; i<data.atts.length; i++){
				    for (var j in data.allowedAttributes) {
				       if (data.allowedAttributes[j] == data.atts[i].name) 
					       data.getVars[encodeURIComponent(data.atts[i].name)] = encodeURIComponent(data.atts[i].value);
					}
				}
				
				// $this.rsplusAuth({
					// api:'http://auth.rollingstone.local/auth.php',
					// onInit:function(hasSessionKey){
						// if(hasSessionKey){
							// $this.rsplusAuth('checkSession');
						// }else{
							// data.authenticated = false;
							// $this.rsplusEmbed('render');
						// }
					// },
					// onCheckSession:function(response){
						// data.authenticated = response.success;
						// $this.rsplusEmbed('render');
					// },
					// onLogin:function(response){
						// data.authenticated = response.success;
						// $this.rsplusEmbed('render');
					// }
// 					
				// });
				
				$this.trigger('init.rsplusEmbed');
				if(data.functions.onInit) data.functions.onInit();
			});
		},
		render:function(authenticated){
			return this.each(function(){

				var $this = $(this);
				var data = $this.data('rsplusEmbed');

				data.getVars.authenticated = (authenticated) ? 1 : 0;
				
				$.ajax({
					url:data.api,
					data:data.getVars,
					type:'GET',
					dataType:'html',
					success:function(html, textStatus, jqXHR){
						$this.empty().html(html);
						$this.find('form').submit(function(){
							var $form = $(this);
							if(data.functions.onLogin != null) data.functions.onLogin($form);
							$this.trigger('login.rsplusEmbed', $form);
							return false;
						});
						if(data.functions.onRender != null) data.functions.onRender(html);
						$this.trigger('render.rsplusEmbed', html);
					}
				});
			});
		}
	};
		
	$.fn.rsplusEmbed = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.rsplusEmbed' );
		}    
	
	};	
})( jQuery );
