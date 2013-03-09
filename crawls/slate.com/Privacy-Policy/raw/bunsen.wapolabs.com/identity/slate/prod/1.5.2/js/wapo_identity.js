function WapoSite(name, url, visId) {
	this.name = name;
	this.url = url;
	this.visId = visId;
}

function WapoEnv() {
		this.wapolabs_js = 'http://bunsen.wapolabs.com/wapolabs/1.4.2.1/js/wapolabs.nojq.full.js';
		this.waposites_js = 'http://bunsen.wapolabs.com/identity/js/wapo_sites.js';
		this.cdn_identity = 'http://bunsen.wapolabs.com/identity/1.5.2/';
		this.fb_key = 'a155d53db9f6b23399fda17cc0ccd84e';
		this.fb_xd_receiver = 'http://www.slate.com/xd_receiver.htm';
		this.fb_app_id = '142011022527753';
		this.publicationName = 'Slate';
		this.site_base_domain  = 'slate.com';
		this.site_path = '/';
		this.wapo_secure_protocol  = 'https:';
		this.wapo_site_url  = '//id.slate.com/identity/';
		this.site_url = '//slate.com/';
		this.wapo_public_protocol  = 'http:';
		this.customLoginTrigger = false;
		this.init_xfbml = false;

		this.param_name_jsonp_callback = 'jsonp_callback';
		this.param_name_nonce = 'wp_id_n';
		this.param_name_email_nonce  = 'wp_em_n';
		this.meta_tag_groups  = 'wapoGroups';
		this.param_name_redirect  = 'next_url';
		this.param_name_previous_url  = 'previous_url';
		this.param_name_no_cancel  = 'wp_no_cancel';
		this.param_name_regis_group_name  = 'reg_group';
		this.param_name_login_id  = 'loginId';
		this.param_name_show_registration  = 'show_registration';
		this.param_name_registration_redirect = 'wp_regis_redirect';
		this.param_name_login_redirect = 'wp_login_redirect';
		this.place_holder  = 'ph';
		this.cookie_display  = 'wapo_display';
		this.cookie_groups  = 'wapo_groups';
		this.cookie_vis_id  = 'wapo_vis_id';
		this.cookie_login_id  = 'wapo_login_id';
		this.cookie_previous_ip  = 'wapo_saved_ip';
		this.cookie_last_ip  = 'wapo_last_ip';
		this.cookie_omniture  = 's_vi';
		this.cookie_previous_omniture  = 'wapo_saved_omnitureid';
		this.cookie_previous_ip  = 'wapo_saved_ip';
		this.cookie_block_registration  = 'wapo_block_registration';
		this.visitor_session_length  = '30'; //this is in minutes
		this.cookie_session_id  = 'wapo_sess_id';
		this.cookie_wpni_id = 'wapo_login_id';
                this.identity_iframe_id = 'identity-iframe';
                this.identity_reset_thickbox_event = 'closeModalDialog'; // Event to be triggered

                this.event_name_login = 'wapoLogin';
                this.event_name_new_registration = 'wapoRegister';
                this.event_name_logout = 'wapoLogout';

		this.jskit_commenting_group = 'default';
		this.jskit_consumer_key = 'prod.slate.com';
		this.wapo_reg_url = 'http://id.slate.com/identity/public/login/options?next_url=';
                this.commenting_edit_profile_url = 'https://id.slate.com/identity/siteRegistration/addRegistration?reg_group=default&next_url=';
                this.event_name_fb_async_init = 'wapoFbAsyncInit';

}

var wapoEnv = new WapoEnv();

window.$wpjQ = typeof window.$wpjQ !== 'undefined' && window.$wpjQ || jQuery;


function isBanned()
{
  $wpjQ.ajax({
      url: "http:"+wapoEnv.wapo_site_url+"slateLogin/isBannedLogin.json",
      dataType: 'jsonp',
      cache: false,
      jsonp: wapoEnv.param_name_jsonp_callback,
      success: function(data){
	  if(data.isBanned == true){
	      wapoVisitor.wapoLogout();
          }
      }
  });
}



$wpjQ(document).ready(function($){
    $wpjQ.ajax({
	url: wapoEnv.waposites_js,
	cache: true,
	dataType: "script",
	success: function(scr,textStatus){
	    $wpjQ.ajax({
		url: wapoEnv.wapolabs_js,
		cache: true,
		dataType: "script",
		success: function(){
	 	    $wpjQ.ajax({
			url: wapoEnv.cdn_identity + 'js/identity.js',
			cache: true,
			dataType: "script",
			success: function(){
			    $wpjQ.ajax({
				url: wapoEnv.cdn_identity + 'js/wapo_jskit_addon.js',
				cache: true,
				dataType: "script",
				success: function(){
                            	    if(typeof Echo !== 'undefined'){
                                	wapoIdentityInit();
                            	    }
                            	    isBanned();
				}
			    })
		        }
		    })
		}
    	    })
	}
    })
});

