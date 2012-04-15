webmd.p.reg_data={
	services:{
		defaults:{
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			timeout: 10000,
			type: 'GET',
			cache:'false'
		},
		get_app_data:function(){
			var d = new Date()
			var overrides = {
				success: function(data){
					webmd.p.header.build_app_menu(data);
				},
				url:window.location.protocol+'//'+window.location.hostname+'/api/reg/MyAppsAPI.svc/json/myapps?_='+d.getTime(),
				error:function(jqXHR, textStatus, errorThrown){
					var message = '';
					var host = ( window.location.host.split(".")[1] == 'webmd' ) ? 'member' : 'member.'+window.location.host.split(".")[1];
					response = jQuery.parseJSON(jqXHR.responseText)
					if(response){
						if(response.code == -2){
							var signin_url = '<a class="signin_overlay_utn" href="https://'+host+'.webmd.com/default.aspx?returl='+encodeURIComponent(webmd.url.addParam('bookmark', 'true', document.location.href))+'" onclick="return sl(this,\'\',\'reg-ovlylogin\');">sign in</a>';
							message = 'Your session has ended. To protect your privacy, please ' + signin_url + ' again.'
						}else if(response.code == 0){
							message = 'Sorry. We are experiencing problems with the server. Please try again later.'
						}
					}
					webmd.p.header.showMenuError(message);
				}
			};
			return $.extend({}, this.defaults, overrides);
		},
		get_bm_data:function(set_storage){
			var overrides = {
				success: function(data){
					webmd.p.header.build_bm_menu(data, false);
					if(set_storage)
						webmd.p.reg_data.build_storage(data);
				},
				url:window.location.protocol+'//'+window.location.hostname+'/api/reg/Bookmarks.svc/json/bookmark?count=11',
				error:function(jqXHR, textStatus, errorThrown){
					var message = '';
					var host = ( window.location.host.split(".")[1] == 'webmd' ) ? 'member' : 'member.'+window.location.host.split(".")[1];
					response = jQuery.parseJSON(jqXHR.responseText)
					if(response){
						if(response.code == -2){
							var signin_url = '<a class="signin_overlay_utn" href="https://'+host+'.webmd.com/default.aspx?returl='+encodeURIComponent(webmd.url.addParam('bookmark', 'true', document.location.href))+'" onclick="return sl(this,\'\',\'reg-ovlylogin\');">sign in</a>';
							message = 'Your session has ended. To protect your privacy, please ' + signin_url + ' again.'
						}else if(response.code == 0){
							message = 'Sorry. We are experiencing problems with the server. Please try again later.'
						}
					}
					webmd.p.header.showMenuError(message);
				}
			};
			return $.extend({}, this.defaults, overrides);
		},
		hide_promo:function(){
			var appid = $('#promo_app_id').val();
			var instanceid = $('#instance_id').val();
			var dataObj = {"appId" : appid, "instanceId" :instanceid, "isVisible" : "false"};
			var overrides = {
				type:'POST',
				data:webmd.json.stringify(dataObj),
				url:window.location.protocol+'//'+window.location.hostname+'/api/reg/MyAppsAPI.svc/json/appvisibility'
			};
			return $.extend({}, this.defaults, overrides);
		},
		add_bookmark:function(){
			var title = $('.add_bookmark_input').val();
			var url = document.URL;
			var host = ( window.location.host.split(".")[1] == 'webmd' ) ? 'member' : 'member.'+window.location.host.split(".")[1];
			url = url.replace('//','\/\/');
			var dataObj = {"title" : title, "url" : url};
			var overrides = {
				success: function(data){
					webmd.p.header.addBMSsuccess();
					webmd.p.header.kill_cache();
				},
				error:function(jqXHR, textStatus, errorThrown){
					var errorTxt = "There was an error in your request. Please try again later."
					response = jQuery.parseJSON(jqXHR.responseText)
					if(response){
						if(response.code == -1000){
							errorTxt = "This page has already been saved";
						}else if(response.code == -1001){
							errorTxt = "There is already a saved item with that name.  Please type a new name.";
						}else if(response.code == -1002){
							errorTxt = "You have exceeded the max amount of bookmarks.  Please delete some of the above in order to add more.";
						}else if(response.code == -2){
							var signin_url = '<a class="signin_overlay_utn" href="https://'+host+'.webmd.com/default.aspx?returl='+encodeURIComponent(webmd.url.addParam('bookmark', 'true', document.location.href))+'" onclick="return sl(this,\'\',\'reg-ovlylogin\');">sign in</a>';
							errorTxt = 'Your session has ended. To protect your privacy, please ' + signin_url + ' again.'
						}
					}
					webmd.p.header.showOverlayError(errorTxt);
				},
				type:'POST', data:webmd.json.stringify(dataObj),
				url:window.location.protocol+'//'+window.location.hostname+'/api/reg/Bookmarks.svc/json/add'
			};
			return $.extend({}, this.defaults, overrides);
		}
	},
	
	build_storage:function(data){
		data = data.data
		var bm_data = data.bookmarks.bookmarks;
		for (i=0; i<bm_data.length; i++){
			localStorage.setItem( bm_data[i].order, webmd.json.stringify(bm_data[i]) );
		}
	},
	supports_storage:function(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	
	bm_data:[],
	app_data:{},
	
	//templates for promos, app and bm list items
	templates:{
		apps:'<li><span class="app_image"><img src="'+image_server_url+'/webmd{IconUrl}" /></span><a href="{RootUrl}" onclick="return sl(this,\'\',\'reg-myapp_{Id}\');">{Name}</a></li>',

		bookmarks:'<li id="{id}"><a href="{url}" onclick="return sl(this,\'\',\'reg-mybkmrk_{order}\');">{title}</a><span class="clearfix">&nbsp;</span></li>',

		app_promo:'<span class="hdr_promo_icon"><img src="'+image_server_url+'/webmd{IconUrl}"></span>'
					+'<span class="hdr_promo_text">'
					+'<strong class="hdr_promo_name"><a href="{RootUrl}" onclick="return sl(this,\'\',\'reg-myapp_sgstd}\');">{Name}</a></strong>{ActionText}'
					+'<input type="hidden" id="promo_app_id" value="{Id}" />'
					+'<input type="hidden" id="instance_id" value="{instanceId}" />'
					+'</span>',
		//webmd homepage gets different promo treatment
		bookmarks_empty_home:'<div id="my_pages_empty_rdr">'
					+'<h2>My WebMD Pages</h2>'
					+'<p>Now you can save your favorite pages on WebMD!  If you\'re on a page that you would like to visit later, click "Save" in the upper right-hand corner and it will be added to your "My WebMD Pages" list.</p></div>',
					
		bookmarks_empty:'<div id="my_pages_empty_rdr">'
					+'<h2>My WebMD Pages</h2>'
					+'<p>Now you can save your favorite pages on WebMD!  If you\'re on a page that you would like to visit later, click "Save" in the upper right-hand corner and it will be added to your "My WebMD Pages" list.</p>'
					+'<p class="start_building_rdr"><strong>Start building your quick links:</strong>'
					+'<a id="add_bm_link" href="#">Add this Page to your "<strong>My WebMD Pages</strong>"</a>'
					+'</p></div>'
	}
}

webmd.p.header={
	//standard function to return object with environment vars
	domain_vals: function(){
		prvwDmn = ((document.location.href.indexOf('preview.w') != -1) || (document.location.href.indexOf('member.perf') != -1)) ? 'preview.' : '';
		currDmn = (document.location.href.indexOf('perf.w') != -1) ? 'perf.' : (document.location.href.indexOf('qa00.w') != -1) ? 'qa00.' : (document.location.href.indexOf('preview.w') != -1) ? 'perf.' : '';
		member_url = 'https://member.'+currDmn+'webmd.com';
		signcookie = webmd.cookie.exists("WBMD_AUTH");
		if(image_server_url.indexOf(currDmn) == -1 && image_server_url.indexOf('preview') < 0){
			image_server_url = image_server_url.replace('img.','img.'+currDmn);
		}
		
		return {
			prvwDmn:prvwDmn,
			currDmn:currDmn,
			member_url:member_url,
			signcookie:signcookie
		}
	},
	
	addBMSsuccess:function(){
		webmd.overlay.close();
	},
	
	validate:function(form,typ) {
		var hasEmailError = false;
		var hasPasswordError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var emailaddressVal = form.find("input.email").val();
		var emailTxt = "Enter your Email Address here";
		//Email
		if(!typ || typ == "email") {
			if(emailaddressVal == '' || emailaddressVal == emailTxt || !emailReg.test(emailaddressVal)) {
				if(emailaddressVal == '' || emailaddressVal == emailTxt) {
					form.find(".email .sign_error span.change").html("your");
				}	else {
					form.find(".email .sign_error span.change").html("a valid");
				}
				form.find(".email .sign_error span").show();
				form.find('input.email').addClass('empty');
				hasEmailError = true;
			} else {
				form.find(".email .sign_error span").hide();
				form.find('input.email').removeClass('empty');
			}
		}
		//Password
		
		if(!typ || typ.indexOf("password") != -1) {
			if(form.find("input[name*='_password']").attr('value')=="") {
				form.find(".password .sign_error span").show();
				form.find('input.password').addClass('empty');
				hasPasswordError = true;
			} else {
				form.find(".password .sign_error span").hide();
				form.find('input.password').removeClass('empty');
			}
		}
		if(hasEmailError == true || hasPasswordError == true) { 
			return false; 
		} else {
			return true;
		}
	},
	
	//whenever an api call is made, clear local storage and reset bookmarks array
	kill_cache:function(){
		var _data = webmd.p.reg_data;
		if (_data.supports_storage()){
			localStorage.clear();
		}
		_data.bm_data.length = 0;
	},
	
	//user signs in on different account, force storage to be cleared
	cleanSession:function(){
		var _self = this;
		var prevUrl = document.referrer;
		var curHost = '';
		if(prevUrl != ''){
			prevUrl = prevUrl.split('/')[2].split('.')[0];
		}
		curHost = window.location.host.split('.')[0];
		if(curHost != prevUrl)
			_self.kill_cache();
	},
	
	setup_page_header:function(){
		var _self = this;
		var domain_vals = _self.domain_vals();

		//clean up localstorage from previous session and domain transfer		
		$('#ctl00_ContentWell_Login_imgCmdSubmit').bind('click',function(){
			_self.kill_cache();
		});		
		_self.cleanSession();
		
		bookmark_link = $('<a title="Save" href="#" rel="nofollow">Save</a>');
		$(bookmark_link).unbind('click').bind('click',function(e){
			e.preventDefault();
			wmdPageLink('bkmrkpg');
			webmd.p.header.bookmark_page();
		});
		if($('#headerLinks_print').length && hdr){
			var bothHidden = (!$("#headerLinks_email").is(':visible') && !$("#headerLinks_print").is(':visible')) ? true : false;
			if(!bothHidden){
				var targetLink = (!$(".headerLinks_fmt:last").is(':visible')) ? $(".headerLinks_fmt:first") : $(".headerLinks_fmt:last");
				if(targetLink.length < 1) targetLink = $('#breadcrumb_rdr'); //all else fails, just put if after breadcrumb_rdr
				$(bookmark_link).insertAfter(targetLink).wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
			}
		}else if(hdr && location.host.indexOf('member.') == -1){
			if($('#breadcrumb_rdr').length > 0 && $('#exchange-group-tools').length < 1){
				$(bookmark_link).appendTo('#breadcrumb_rdr').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
				$('#breadcrumb_rdr').css('width','100%');

			//exchanges has an extra menu
			}else if($('#exchange-group-tools').length > 0){
				$(bookmark_link).insertAfter('#exchange-group-tools').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
			//all other pages where breadcrumb does not match
			}else{
				$(bookmark_link).prependTo('#breadcrumb_ctr').wrap('<div class="headerLinks_fmt_on" id="headerLinks_pages" />');
			}
		}				

		$(".bottom_header .search_date .date_fmt").html(wmd_today);
		if($('#searchQuery_fmt').val() != '') { $('#searchQuery_fmt').css('backgroundImage','none'); }
		if(!hdr) { $(".social_masthead h6").remove(); }
		webmd.m.hdrbadges = {
			badges : [
				{ url : 'http://fit.' + (prvwDmn || currDmn) + 'webmd.com/welcome-parents',
					oc : 'htool-fit',
					img : '/modules/masthead_fit',
					alt : 'WebMD FIT' }
			],
			build : function(pick) {
				$("#header_ctr #ContentPane2 .bottom_header #reglinks").after('<div id="masthead_badge"><a href="' + this.badges[pick].url + '" onclick="return sl(this,\'\',\'' + this.badges[pick].oc + '\');" title="What\'s fit for Kids?"><span class="jawsonly">What\'s fit for Kids?</span></a></div>');
			}
		}
		//alert(s_sponsor_program);
		if(!s_sponsor_program || s_sponsor_program == ''){
			if(hdr && pf_param != 'true' && !domain_vals.signcookie) { webmd.m.hdrbadges.build(0); }
		}
		
		//check for subscription return flag
		if(webmd.url.getParam('retsub')){
			var submitComplete = '';
			if(document.location.href.indexOf('/diet/')>-1){
				submitComplete = function(){
					window.location.href=domain_vals.member_url+"/subscriptions.aspx";
				}
				webmd.overlay = $.extend(webmd.overlay, {
					close: function(){
						$.fn.colorbox.close();
						submitComplete();
					}
				});
			}
		}else if(document.location.host.indexOf('vaccine')>-1 && document.referrer.indexOf('retsub=t')>-1){
			window.location.href=domain_vals.member_url+"/subscriptions.aspx";
		}
	},
	
	toggle_promo_menu:function(method){
		var hdr_promo_rdr = $('#hdr_promo_rdr');
		var toggle_btn = $('#promo_toggle');
		var html = toggle_btn.html();
		if(method == 'init'){
			if(webmd.cookie.getJson('ui').showpromos == true){
				toggle("show");
			}else{
				toggle("hide");
			}
		}else if(webmd.cookie.getJson('ui').showpromos == true){
			toggle("hide");
			webmd.cookie.setJson('ui', $.extend(webmd.cookie.getJson('ui'), {showpromos:false}), {expires:30,domain:'webmd.com'});
		
		}else{
			toggle("show");
			webmd.cookie.setJson('ui', $.extend(webmd.cookie.getJson('ui'), {showpromos:true}), {expires:30,domain:'webmd.com'});
		}
		
		function toggle(state){
			if(state == "show"){
				if($.browser.msie && parseInt($.browser.version) < 9){
					hdr_promo_rdr.css('display','block')
						.removeClass('promo_closed');
				}else{
					hdr_promo_rdr.slideDown()
						.removeClass('promo_closed');
				}
				toggle_btn.html(html.replace('Open','Close'))
				.removeClass('toggle_closed');
			}else{
				if($.browser.msie && parseInt($.browser.version) < 9){
					hdr_promo_rdr.css('display','none')
						.addClass('promo_closed');
				}else{
					hdr_promo_rdr.slideUp()
						.addClass('promo_closed');
				}
				toggle_btn.html(html.replace('Close','Open'))
				.addClass('toggle_closed');
			}
		}
	},
	
	build_app_menu:function(app_data){
		var _self = this;
		var domain_vals = _self.domain_vals();

		if(app_data){
			var _data = webmd.p.reg_data;
			var curApp = '';
			$('#apps_content_rdr ul').html('');
			var user_apps = app_data.data.UserApps;
			for (var i = 0; i < user_apps.UsedApps.length; i++) {
				currApp = user_apps.UsedApps[i];
				if(!currApp.IsHidden){
					if(currApp.Application.RootUrl.indexOf(domain_vals.currDmn) < 1){
						currApp.Application.RootUrl = currApp.Application.RootUrl.replace('webmd.',domain_vals.currDmn+'webmd.')
					}
					currApp.Application.IconUrl = currApp.Application.IconUrl.replace('.png','_sm.png');
					$('#apps_content_rdr ul').append( $(webmd.substitute(_data.templates.apps, currApp.Application)) );
				}
			}
			if(!$('#apps_content_rdr ul li').length){
				$('#apps_content_rdr ul').append('<br />As a WebMD user, you have access to many free health tools. <a href="https://member.'+domain_vals.currDmn+'webmd.com/applications.aspx">Learn More</a>');
			}
			
			$('#promo_toggle').unbind('click').bind('click',function(e){
				e.preventDefault();
				_self.toggle_promo_menu();
			});
			


			function get_next_promo(pos){
				var found = false;
				var printa = '';
				var start = (pos != 'init')? pos : 0;
				var available_apps = [];
				var k = 0;
				
				//initial loop, create array of unhidden, unused apps
				for (var j = 0; j < user_apps.UnusedApps.length; j++) {
					if(!user_apps.UnusedApps[j].IsHidden){
						available_apps[k] = user_apps.UnusedApps[j];
						k++;
					}
				}
				if(available_apps.length == 0){
					$('#promo_toggle, #hdr_promo_rdr').hide();
				}else{
					//there is atleast one unhidden promo, show it
					for (var i = start; i < available_apps.length; i++) {
						if(i != pos){
							if(available_apps[i].Application.RootUrl.indexOf(domain_vals.currDmn) < 1){
								available_apps[i].Application.RootUrl = available_apps[i].Application.RootUrl.replace('webmd.',domain_vals.currDmn+'webmd.')
							}
							available_apps[i].Application.instanceId = available_apps[i].Id;
							if(available_apps[i].Application.IconUrl.indexOf('_sm') == -1){
								available_apps[i].Application.IconUrl = available_apps[i].Application.IconUrl.replace('.png','_sm.png');
							}
							$('#current_promo').html($(webmd.substitute(_data.templates.app_promo, available_apps[i].Application)))
								.data('pos',i);
							found = true;
							$('#app_hdr_promo').fadeIn();
							$('.hdr_promo_title_rdr, #app_hdr_promo').show();
							return true;
						}
						
						if(i == available_apps.length -1){
							get_next_promo('init');
							return false;
						}					
					}
				}
			}
			if(user_apps.UnusedApps.length > 0){
				
				$('#app_hdr_promo').html('<div class="hdr_promo">'
					+'<div id="current_promo"></div>'
					+'<a class="hdr_promo_delete" href="#">Delete</a>'
					+'<span class="clearfix"></span></div>');
				
				get_next_promo('init');
				
				$('.hdr_promo_delete').click(function(e){
					e.preventDefault();
					$('#app_hdr_promo').fadeOut(function(){
						var pos = $('#current_promo').data('pos');
						//user_apps.UnusedApps.splice(pos,1);
						//xhr = $.ajax(_data.services.hide_promo());
						
						if(user_apps.UnusedApps.length === 0){
							$('.hdr_promo_title_rdr','#applications_hdr').fadeOut();
						}else{
							get_next_promo(pos);
						}
					});
					wmdPageLink('reg-myapp_sgx');
				});
			}else{
				$('#promo_toggle, #hdr_promo_rdr').hide();
			}
		}else{
			$('#apps_content_rdr').html('<p>Sorry, your applications list is currently unavailable. Please try again later.</p>');
		}

	},
	
	build_bm_menu:function(bm_data, isLocal){
		var _data = webmd.p.reg_data;
		var domain_vals = this.domain_vals();
		var i = 0;
		var length = _data.bm_data.length;
		var endlength = 10;
		var maxlength = 10;
		if(!isLocal){
			if(bm_data.data.bookmarks){
				_data.bm_data = bm_data.data.bookmarks.bookmarks
				length = _data.bm_data.length;
			}
		}else if(!_data.bm_data[0]){
			i=1;
			maxlength = 11;
		}
		if(length>0){
			$('#bookmarks_hdr').html('<strong class="header_title"><a href="'+domain_vals.member_url+'/bookmarks.aspx">Manage My WebMD Pages</a></strong><div id="bookmark_content_rdr" class="dd_content"><ul></ul></div><strong class="header_title"><a href="'+domain_vals.member_url+'/bookmarks.aspx" onclick="return sl(this,\'\',\'reg-mybkmrk_more\');">View All</a></strong>');
			while (i<=endlength){
				if(_data.bm_data[i]){
					if($('#'+_data.bm_data[i].id).length < 1){
						$('#bookmark_content_rdr ul').append( $(webmd.substitute(_data.templates.bookmarks, _data.bm_data[i])) );
					}
				}
				i++;
			}
			if(length <= maxlength){
				$('.header_title:last','#bookmarks_hdr').remove();
			}
		}else{
			show_empty_bookmarks();
		}

		num_links = _data.bm_data.length;
		
		$('#bookmark_content_rdr ul li')
			.mouseenter(function(){ $(this).find('a.delete_link').css('visibility','visible'); })
			.mouseleave(function(){ $(this).find('a.delete_link').css('visibility','hidden'); });
			
		$('a.delete_link','#bookmark_content_rdr ul li')
			.click(function(e){
				e.preventDefault();
				regHdOpt.typing = true;
				
				var del_link = this;
				var link_id = $(this).attr('id').replace('del_','');
				
				var conf_markup = '<div class="conf_popup"><p>Are you sure you want to delete?</p>'
								+ '<a class="webmd-btn webmd-btn-pr webmd-btn-s" id="del_bm_butn" href="#">Yes</a>'
								+ '<a id="cancel_bm_butn" href="#">No</a>'
								+ '</div>'
				
				//open confirmation to delete bookmark
				webmd.overlay.open({
					width: "250px",
					html: conf_markup,
					onComplete: function(){
						$('#cancel_bm_butn').click(function(e){
							e.preventDefault();
							regHdOpt.typing = false;
							webmd.overlay.close();
						});
						$('#del_bm_butn').click(function(e){
							e.preventDefault();
							regHdOpt.typing = false;
							delete_bm(del_link);
							webmd.overlay.close();
							xhr = $.ajax(_data.services.del_bookmark(link_id));
						});
					}
				});
				wmdPageLink('reg-mybkmrk_x');
		});
		
		function delete_bm(elm){
			$(elm).parent().fadeOut();
			num_links--;
			if(num_links == 0){
				show_empty_bookmarks();
			}
		}

		//shows empty bookmark promo when no bookmarks selected
		function show_empty_bookmarks(){
			if(s_package_type.indexOf('homepage')>-1 || location.host.indexOf('member.') > -1){
				bm_template = webmd.p.reg_data.templates.bookmarks_empty_home;
			}else{
				bm_template = webmd.p.reg_data.templates.bookmarks_empty;
			}
			$('#bookmarks_hdr').html(bm_template);
				
			$('#add_bm_link').unbind('click').bind('click',function(e){
				e.preventDefault();
				webmd.p.header.bookmark_page();
			});
		}
	},
	
	is_overlay_loaded:function(show){
		//loads js when not loaded
		if (!webmd.p.registration) {
			webmd.p.registration = {};
		}
		//for sponsored pages, we have to load the reg_hdr_styles for the overlay
		if($("link[href$='reg_hdr_styles.css']","head").length==0){
			webmd.load({
				css:image_server_url + "/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css", 
				load: function() {
					$('.login_rdr').parent().css('top','0px');
				}
			});
		}
		if(!webmd.p.registration.loginOverlay) {
			webmd.load({
				js:image_server_url + "/webmd/PageBuilder_Assets/JS_static/registration/loginOverlay.js", 
				load: function() {
					show();
				}
			});
		}else{
			show();
			return true;
		}
	},
	
	showMenuError:function(message){
		//error to be shown when a service call triggered by dropdown returns error
		var _self = this;
		$('#applications_hdr, #bookmarks_hdr').html('<p>'+message+'</p>');
		_self.bindErrorLogin();
	},
	
	showOverlayError:function(message){
		//error to be shown when a service call triggered from overlay returns error
		var _self = this;
		if($('.overlay_error').length<1){
			$('<p class="overlay_error">'+message+'</p>').insertAfter('.add_bookmark_rdr p:first');
		}else{
			$('.overlay_error').html(message);
		}
		$('.add_bookmark_input','#webmdHoverLoadedContent')
			.css({'border':'1px solid #EC1919','background':'#ffffff'});
		_self.bindErrorLogin();
		webmd.overlay.resize('height');
	},
	
	bindErrorLogin:function(){
		function showPromo(){
			var promoApp = webmd.p.header.getPromoApp();
			var signin_params={
				appid: 	promoApp,
				unAuth: true
			};
			webmd.p.registration.loginOverlay.show(signin_params);
		}
		$('.signin_overlay_utn').click(function(e){
			e.preventDefault();
			wmdPageLink('reg-ovlylogin');
			is_overlay_loaded = webmd.p.header.is_overlay_loaded(showPromo);
			if(is_overlay_loaded){
				webmd.p.registration.loginOverlay.show(signin_params);
			}
		});
	},
	
	/*
		* Checks if user is logged in and shows bookmark overlay.
		* If not logged in, loads js for webmd overlay, then opens bookmark overlay after successful sign in
	*/
	bookmark_page:function(){

		//check if overlay js is loaded, then checks if person is logged in
		var _data = webmd.p.reg_data;
		
		function showPromo(){
			if(webmd.p.registration.isLoggedIn()){
				show_bm_overlay();
			}else{
				var promoApp = webmd.p.header.getPromoApp();
				
				var signin_params={
					appid: 	promoApp,
					returl: webmd.url.addParam('bookmark', 'true', document.location.href)
				};
				webmd.p.registration.loginOverlay.show(signin_params);
			}
		}
		
		function show_bm_overlay(){
				var bm_markup  = '<div class="add_bookmark_rdr"><h2>Save to My WebMD Pages</h2>'
									+'<p>You can save this page with the current page title or you can create a new page title.</p>'
									+'<input type="text" class="add_bookmark_input" />'
									+'<a href="#" id="add_bm_butn" class="webmd-btn webmd-btn-pr webmd-btn-s">Add</a>'
									+'<a href="#" id="cancel_bm_butn">Cancel</a>'
									+'</div>';
	
				webmd.overlay.open({
					width: "550px",
					html: bm_markup,
					onComplete: function(){
						$('#cancel_bm_butn').click(function(e){
							e.preventDefault();
							webmd.overlay.close();
						});
						$('.add_bookmark_input')
							.val(document.title)
							.focus(function(){
								$(this).data('o_val',$(this).val());
								//$(this).val('');
							})
							.blur(function(){
								if($(this).val()==''){
									$(this).val($(this).data('o_val'));
								}
							});
						$('#add_bm_butn').unbind('click').bind('click',function(e){
							e.preventDefault();
							xhr = $.ajax(_data.services.add_bookmark());
							wmdPageLink('bkmrk-ovly-add_sub');
						});
						wmdPageLink('bkmrk-ovly-imp');
					}
				});
		}
		
		is_overlay_loaded = webmd.p.header.is_overlay_loaded(showPromo);
		if(is_overlay_loaded){
			if(webmd.p.registration.isLoggedIn()){
				show_bm_overlay();
			}else{
				//call login overlay function
				promo = showPromo;
			}
		}
		

	},
	
	getPromoApp:function(){
		var promoApp = 1;
		promoApp = (window.location.pathname.indexOf('/magazine/')>-1) ? 6 : promoApp;	//Magazine promo
		promoApp = (window.location.host.indexOf('exchanges')>-1) ? 5 : promoApp;		//Exchanges promo
		return promoApp;
	},
	
	attach_overlay_events:function(){
		regHdOpt = webmd.p.header.regHdOpt;
		overlay_links = $('#registration_hdr li.dd_overlay');
		overlay_divs = $(".login_rdr div[id$='_hdr']");

		var hide_dd = function(elm){
			//hides all dropdowns except elm
			$(overlay_divs).each(function(){
				if(this!=elm) $(this).hide();
			});
		}
		
		var overlayImpression = function(elm){
			var impVal = ''
			if($(elm).hasClass('bookmarks')){
				impVal = 'reg-mybkmrk-imp';
			}else{
				if($('li','#apps_content_rdr').length > 0){
					impVal = 'reg-myapp-imp_1';
				}else{
					impVal = 'reg-myapp-imp_2';
				}
			}
			wmdPageLink(impVal);
		}
		
		$(overlay_links).bind('mouseover', function(e){
			link_elm = this;
			target_elm = $(this).data('dd')
			if(!regHdOpt.typing) {
				if($(link_elm).hasClass('on')==false){
					regHdOpt.enter = setTimeout(function() {
						hide_dd(target_elm)
						$('#registration_hdr li.dd_overlay').removeClass('on');
						$(link_elm).addClass('on');
						$('#'+target_elm).slideDown(regHdOpt.speed.i,overlayImpression(link_elm));
					}, regHdOpt.delay);
				}
			}
		})
		
		.bind('mouseleave', function(e){
			if(!regHdOpt.typing) {
				target_elm = $('#'+$(this).data('dd'));
				clearTimeout(regHdOpt.enter);
				regHdOpt.leave = setTimeout(function() {
					hide_dd(target_elm)
					$('#registration_hdr li.dd_overlay').removeClass('on');
				}, regHdOpt.delay);
			}
		});
		
		if(window.s_reg_status===false){
			$('#registration_hdr .signin')
				.unbind()
				.bind('click', function(e){
					webmd.p.registration.regCheck.regStatusOverlay();
				});
		}
			
		$(overlay_divs).bind('mouseleave', function(e){
			if($('#dd_arrow').length > 0){
				$('#dd_arrow').remove();
			}
			if(!regHdOpt.typing) {
				clearTimeout(regHdOpt.enter);
				regHdOpt.leave = setTimeout(function() {  
					hide_dd(this)
					$('#registration_hdr li.dd_overlay').removeClass('on');
				}, regHdOpt.delay);
			}
		});

		$("#registration_hdr li.dd_overlay, .login_rdr div[id*='_hdr']").unbind('mouseenter').bind('mouseenter', function(e){
			clearTimeout(regHdOpt.leave);
		});
		
		$('.signout a, #ctl00_ContentWell_Login_imgCmdSubmit').click(function(){
			webmd.p.header.kill_cache();
		});
		
	},
	
	regHdOpt:{
		speed : {
			i : 300,
			o : 250
		},
		delay : 300,
		leave : null,
		enter : null,
		tt : null,
		typing : false
	},
	
	init_overlays:function(){
		// Registration Overlays
		domain_vals = webmd.p.header.domain_vals();
		regHdOpt = webmd.p.header.regHdOpt;
		var login_rdr  = $('.login_rdr');

		var _signcookie = domain_vals.signcookie;
		var appTrk = (document.location.href.indexOf('/vaccine') != -1) ? 'vm' : 'core';
		var retLink = (document.location.href.indexOf('/member.') != -1) ? 'http://www.'+currDmn+'webmd.com/default.htm' : (appTrk == "vm") ? 'https://vaccinetracker.'+currDmn+'webmd.com/default.aspx' : document.location.href;
		var tooltip = "If you select \"Keep me signed in on this computer\", every time you visit WebMD.com you won't have to type your email address and password.  This means that a cookie will stay on your computer even when you exit or close your browser which may reduce your levels of privacy and security.   You should never select this option if you're using a publicly accessible computer, or if you're sharing a computer with others.  Even if you select this option there are some features of our site that still require you to log in for privacy reasons.";
		
		//unauthenticated dropdowns
		function create_unauth_dd(){
			//attach dropdown ids to associated links
			$('#registration_hdr .signin').data('dd','signin_form_hdr');
			$('#registration_hdr .whyjoin').data('dd','whyjoin_hdr');
			
			//login dropdown
			var emailTxt = "Enter your Email Address here";
			$('.login_rdr').append('<div id="signin_form_hdr" style="display:none;"><div class="signin_container"><h2>Sign In</h2>' +
				'<form action="' + regAction + '" method="post" name="globalreg"><input type="hidden" name="es" id="es" value="1"/>' +
				'<div class="email"><label for="reglogin_username" class="input">Email Address</label><input  class="email" type="text" maxlength="100" id="reglogin_username" name="reglogin_username" value="' + emailTxt + '" onclick="if(this.value==\'' + emailTxt + '\'){this.value=\'\';}" onblur="if(this.value==\'\'){this.value=\'' + emailTxt + '\';}" /><div class="sign_error"><span>Enter <span class="change">your</span> email address.</span>&nbsp;</div></div>' +
				'<div class="password"><label for="reglogin_password" class="input">Password</label><input class="password pw_txt" type="text" id="passtxt" value="Password" /><input class="password pw_field" type="password"  id="reglogin_password" name="reglogin_password" value="" style="display: none;" /><div class="sign_error"><span>Enter your password.</span>&nbsp;</div></div>' + rememberMe +
				'<div class="signin"><input type="image" id="signin-submit" href="#" alt="Sign In" src="'+image_server_url+'/webmd/consumer_assets/site_images/registration/images/reg_sign-in_form-signin.png" value="Sign In"></div>' +
				'</form>' +
				'<div class="links"><div class="helpers"><a href="https://member.'+domain_vals.currDmn+'webmd.com/recover_password.aspx" onclick="return sl(this,\'\',\'reg-login-lnk_fgpsw\');">Forgot your password?</a><br /><a href="https://member.'+domain_vals.currDmn+'webmd.com/customer_service.aspx?r=username" onclick="return sl(this,\'\',\'reg-login-lnk_trbl\');">Having trouble signing in? Contact us.</a></div>' +
				'<div class="divider"><span></span><strong>OR</strong><span></span></div>' +
				'<div class="signup">Don\'t have a WebMD Account?<br /><a href="https://member.'+domain_vals.currDmn+'webmd.com/register.aspx?returl=http%3a%2f%2fwww.'+domain_vals.currDmn+'webmd.com%2f" onclick="return sl(this,\'\',\'reg-new_'+appTrk+'\');">Sign up now!</a></div></div></div></div>');
			
			$('input.pw_txt').focus(function(){
				var pw_field = $(this).parent().find('.pw_field');
				$(this).hide();
				$(pw_field).show().focus();
			});
			
			
			$('input.pw_field').blur(function(){
				if($(this).attr('value')=="") {
					$(this).hide();
					$(this).parent().find('.pw_txt').show();
				}
			});
			
			$('#signin_form_hdr form').bind('submit', function() {
				if(webmd.p.header.validate($(this))) { 
					return wmdPageLink('reg-login_' + appTrk);
				} else {
					return false;
				}
			});
			$('#signin_form_hdr form input').bind('keypress', function(e) { if(e.keyCode == 13) { $(this).closest("form").submit(); } });
			$('#signin_form_hdr form input').not("#passtxt").bind('blur', function() {webmd.p.header.validate($(this).closest("form"),$(this).attr("class").replace(" empty","")); });
			$('#signin_form_hdr form input').bind('keypress focus', function() { regHdOpt.typing = true; });
			$(document).bind('click', function() {
				if(regHdOpt.typing == true) {
					regHdOpt.typing = false;
					$('#signin_form_hdr').hide();
					$('#registration_hdr .signin').removeClass('on');
				}
			});
			$("#signin_form_hdr").bind('click focus',function(e) { e.stopPropagation();	});
			$("#reg-add-info").hover(function() {
					regHdOpt.tt = setTimeout(function() { $("#reg-add-info-tooltip").slideDown(regHdOpt.speed.i); }, regHdOpt.delay);
				},
				function() {
					clearTimeout(regHdOpt.tt);
					$("#reg-add-info-tooltip").hide();
			});
			$('#registration_hdr .signin').find("a").bind('click', function(e) { e.preventDefault(); });
			
			//why webmd dd
			$('.login_rdr').append('<div id="whyjoin_hdr" style="display: none"><p>Your WebMD Account is:</p><ul><li><a onclick="return sl(this,\'\',\'htool-rg-prm_1\');" href="' + joinUrl + '#safe">Always Safe & Secure</a></li><li><a onclick="return sl(this,\'\',\'htool-rg-prm_2\');" href="'+ joinUrl +'#quick">Free! Quick & Easy to Create</a></li></ul><p>With a WebMD Account you can:</p><ul><li><a onclick="return sl(this,\'\',\'htool-rg-prm_3\');" href="'+ joinUrl +'#track">Track your way to weight loss success</a></li><li><a onclick="return sl(this,\'\',\'htool-rg-prm_4\');" href="'+ joinUrl +'#vaccine">Manage your family\'s vaccinations</a></li><li><a onclick="return sl(this,\'\',\'htool-rg-prm_5\');" href="'+ joinUrl +'#join">Join the conversation</a></li><li><a onclick="return sl(this,\'\',\'htool-rg-prm_6\');" href="'+ joinUrl +'#newsletters">Choose from 50+ health and wellness newsletters</a></li><li><a onclick="return sl(this,\'\',\'htool-rg-prm_7\');" href="'+ joinUrl +'#magazine">Access WebMD the Magazine</a></li></ul></div>');
		}
		
		//authenticated dropdowns
		function create_auth_dd(){
			var _data = webmd.p.reg_data;
			var _self = webmd.p.header;
			
			if (!webmd.cookie.exists('WBMD_SESN')) {
				_self.kill_cache();
			}
			
			$('#registration_hdr .applications').data('dd','applications_hdr');
			$('#registration_hdr .bookmarks').data('dd','bookmarks_hdr');
			
			// My Tools
			login_rdr.append('<div id="applications_hdr"><strong class="header_title"><a href="'+domain_vals.member_url+'/applications.aspx" onclick="return sl(this,\'\',\'reg-myapp_more\');">Manage My Tools</a></strong><div id="apps_content_rdr" class="dd_content"><ul></ul></div><a href="#" id="promo_toggle" class="toggle_closed">Open<span class="tgl_arrow">&nbsp;</span></a><div id="hdr_promo_rdr" class="promo_closed"><h4 class="hdr_promo_title_rdr">WebMD Suggests</h4><div id="app_hdr_promo"></div></div></div>');
			_self.toggle_promo_menu('init');

			$('#registration_hdr .applications a').unbind('mouseenter').bind('mouseenter', function(e){
				if($(this).parent().hasClass('on')==false){
					xhr = $.ajax(_data.services.get_app_data());
				}
			});

			// My Bookmarks
			login_rdr.append('<div id="bookmarks_hdr"></div>');
			$('#registration_hdr .bookmarks a').unbind('mouseenter').bind('mouseenter', function(e){
				if($(this).parent().hasClass('on')==false){
					if (_data.supports_storage()){
						if( localStorage.length === 0 ){
							//storage has been built, create object from local storage, then run function to show data
							xhr = $.ajax(_data.services.get_bm_data(true));
						}else{
							for (i=0; i<=localStorage.length-1; i++)  
							{
								k = localStorage.key(i);
								_data.bm_data[k] = JSON.parse(localStorage.getItem(k));
							}
							webmd.p.header.build_bm_menu(_data.bm_data, true)
						}	
					}else{
						//vintage browsers just make api call
							xhr = $.ajax(_data.services.get_bm_data());
					}
				}
			});
			
			//showbookmark after login when bookmark link is clicked
			if(webmd.url.getParam('bookmark') && webmd.url.getParam('bookmark')=='true')
				$('a','#headerLinks_pages').trigger('click');
		}
			
		if (!_signcookie && hdr) {
			var rememberMe = (appTrk != "vm") ? '<div class="remember-me"><input type="checkbox" class="remember-me" id="rememberme" name="rememberme" value="on" /><label for="remember" class="checkbox">Keep me signed in on this computer</label><div id="reg-add-info"></div><p id="reg-add-info-tooltip">' + tooltip + '</p></div>' : '';
			var joinUrl = 'http://www.' + (domain_vals.currDmn || domain_vals.prvwDmn) + 'webmd.com/why-should-i-sign-up-for-webmd';
			var regAction = 'https://member.' + domain_vals.currDmn + 'webmd.com/default.aspx?returl=' + encodeURIComponent(webmd.url.addParam('login', 'true', retLink));
			webmd.load({
				css:image_server_url + "/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css", 
				load: function() {
					var div = '<ul id="registration_hdr">'
						+ '<li class="signin dd_overlay"><a rel="nofollow" onclick="return sl(this,\'\',\'htool-mymd_si\');" href="https://member.' + domain_vals.currDmn + 'webmd.com/default.aspx?returl=' + encodeURIComponent(retLink) + '">Sign in<span class="dwn_arrow"></span></a></li>'
						+ '<li class="signup"><a rel="nofollow" onclick="return sl(this,\'\',\'htool-mymd_reg\');"  href="https://member.' + domain_vals.currDmn + 'webmd.com/register.aspx?returl=' + encodeURIComponent(retLink) + '">Sign up</a></li>'
						+ '<li class="whyjoin dd_overlay"><a rel="nofollow" onclick="return sl(this,\'\',\'htool-mymd_reg\');"  href="' + joinUrl + '">Why WebMD?<span class="dwn_arrow"></span></a></li></ul>';
					login_rdr.append(div);
					if(pf_param != 'true') { login_rdr.show('fast',function(){
						create_unauth_dd();
						webmd.p.header.attach_overlay_events();
					}); }
				}
			});

			
	
		} else if (!_signcookie) {
			var div = '<a rel="nofollow" onclick="return sl(this,\'\',\'htool-mymd_si\');" href="http://www.'+domain_vals.currDmn+'webmd.com/signin.asp" title="Login"><img src="'+image_server_url+'/webmd/consumer_assets/site_images/layout/2009Chrome/btn_login.png" class="btnLogin" alt="Login" width="84" height="27" border="0"/></a><ul><li class="nobull"><a rel="nofollow"  href="https://member.'+domain_vals.currDmn+'webmd.com/register.aspx" onclick="return sl(this,\'\',\'htool-mymd_reg\');">Register</a></li></ul>';
			$("#reglinks").css({ "width": "auto" });
			$(login_rdr).append(div).css({ "width": "110px" });
			if(pf_param != 'true') { $('.login_rdr').show(); }
		} else if (hdr) {
			webmd.load({
				css:image_server_url+"/webmd/consumer_assets/site_images/registration/css/reg_hdr_styles.css", 
				load: function() {
					var div = '<ul id="registration_hdr">';
					if(typeof window.nickname != 'undefined' && window.nickname != ''){
						div += '<li class="greeting">Hello, <a href="https://member.'+domain_vals.currDmn+'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');">' + (window.nickname || '') + '</a></li>';
					}else{
						div += '<li class="greeting"><a href="https://member.'+domain_vals.currDmn+'webmd.com/profile.aspx" onclick="return sl(this,\'\',\'htool-mymd_snm\');">My Profile</a></li>';
					}
					div	+= '<li class="applications dd_overlay"><a onclick="return sl(this,\'\',\'htool-mymd_ma\');" href="https://member.'+domain_vals.currDmn+'webmd.com/applications.aspx" onclick="return sl(this,\'\',\'htool-mymd_ma\');">My Tools<span class="dwn_arrow"></span></a></li>'
						+ '<li class="bookmarks dd_overlay"><a onclick="return sl(this,\'\',\'htool-mymd_prm\');" href="https://member.'+domain_vals.currDmn+'webmd.com/bookmarks.aspx">My WebMD Pages<span class="dwn_arrow"></span></a></li>'
						+ '<li class="signout"><a onclick="return sl(this,\'\',\'htool-mymd_so\');" href="';
					div += (appTrk == "vm") ? 'https://member.'+domain_vals.currDmn+'webmd.com/signout.aspx?returl=' + encodeURIComponent(retLink) : 'http://www.'+domain_vals.currDmn+'webmd.com/signout.asp';
					div += '">Sign out</a></li></ul>';
					login_rdr.append(div);
					if(pf_param != 'true') {
						login_rdr.css({'display':'block'});
						create_auth_dd()
						webmd.p.header.attach_overlay_events();
					}
				}
			});
			
		} else {
			var div =  '<ul><li><a rel="nofollow" onclick="return sl(this,\'\',\'htool-mymd_ma\');" href="https://member.'+domain_vals.currDmn+'webmd.com/profile.aspx" title="My Account">My Account</a></li><li><a rel="nofollow" href="';
			div += (appTrk == "vm") ? 'https://member.'+domain_vals.currDmn+'webmd.com/signout.aspx?returl=' + encodeURIComponent(retLink) : 'http://www.'+domain_vals.currDmn+'webmd.com/signout.asp';
			div += '" title="Sign out" onclick="return sl(this,\'\',\'htool-mymd_so\');">Sign out</a></li></ul>';
			$("#reglinks").css({ "width": "auto" });
			login_rdr.append(div).css({ "width": "110px" });
			if(pf_param != 'true') { login_rdr.show(); }
		}
		
		
	}
}

var header = webmd.object(webmd.p.header);
domain_vals = webmd.p.header.domain_vals();

if(window.location.protocol=='https:'){
	image_server_url = image_server_url.replace('http:','https:');
}
try {
	var hdr = true;
	if(hdr && pf_param != "true") { 
		$('head').append(webmd.load({css:image_server_url+'/webmd/consumer_assets/site_images/css/masthead_badge.css'}));
	}
	
} catch (e) {
	var hdr = false;
}

$(function() {
	header.setup_page_header();
	header.init_overlays();

});