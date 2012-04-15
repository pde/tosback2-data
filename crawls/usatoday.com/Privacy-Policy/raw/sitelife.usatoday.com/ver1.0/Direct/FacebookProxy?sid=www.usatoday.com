document.domain = "usatoday.com";

var slFacebookProxy = function(){
	this.ApiKey = "8fbbcaace5daaf21720d0ab04b5a5e26";
	this.connectStatus = null;
};

slFacebookProxy.prototype.loadScript = function(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.charset = 'utf-8';
	if (callback)
		script.onload = script.onreadystatechange = function() {
			if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete')
				return;
			script.onreadystatechange = script.onload = null;
			callback();
		};
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild (script);
}

slFacebookProxy.prototype.init = function(callback, iterCount){
	// If no API key, do nothing, call callback immediately.
	if(!this.ApiKey || this.ApiKey == ""){
		if(callback) callback();
		return;
	}
	if (!iterCount){
		iterCount = 0;
	}
	if (iterCount > 10){
		return; // give up
	}
	var me = this;
	//Crazy hack for removing document.write
	if(!document.getElementById("FB_HiddenContainer")){
		try{
			if(!window.document.body){
				document.write('<div style="position: absolute; top: -10000px; left: -10000px; width: 0px; height: 0px;" id="FB_HiddenContainer"></div>');
			}
			else{
				var fbHiddenDiv = document.createElement("div");
				fbHiddenDiv.id = "FB_HiddenContainer";
				fbHiddenDiv.style.position = "absolute";
				fbHiddenDiv.style.left = "-10000px";
				fbHiddenDiv.style.top = "-10000px";
				fbHiddenDiv.style.width = "0px";
				fbHiddenDiv.style.height = "0px";
				window.document.body.insertBefore(fbHiddenDiv, window.document.body.firstChild);
			}
		}
		catch(e){
			setTimeout(function(){
				me.init(callback, ++iterCount);
			}, 100);
			return;
		}
	}

	// Race condition where Fb isn't loaded yet...
	if(!window.FB){
		if(this.alreadyIncludedFeatureLoader){
			setTimeout(function(){
				me.init(callback, ++iterCount);
			}, 100);
		}
		else{
			this.loadScript('http://www.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php', function(){
				me.init(callback, ++iterCount);
			});
			this.alreadyIncludedFeatureLoader = true;
		}
		return;
	}

	if(!this.initialized){
		this.initialized = true;
		FB.init("8fbbcaace5daaf21720d0ab04b5a5e26", "/asp/facebook/FacebookXd.html");
	}

	FB.ensureInit(function(){
		// Get current status
		FB.Connect.get_status().waitUntilReady(function( status ){
			me.connectStatus = status;

			if(callback){
				callback();
			}
		});
	});
};

// Initialize a global facebook API
var slFB = new slFacebookProxy();

slFacebookProxy.prototype.linkImages = function(images, url){
	var fb_images = [];
	for(i=0; i<images.length; i++){
		fb_images.push({'src': images[i], 'href': url});

	}
	return fb_images;
};

slFacebookProxy.prototype.trunc = function(text, maxLen){
	if(!maxLen){
		maxLen = 200;
	}

	if(text.length > maxLen){
		text = text.substring(0, maxLen);
		text = text + "...";
	}

	return text;
};

// New since Facebook depreciated FB.Connect.showFeedDialog....
// template_name is totally ignored.
// variables: Now includes some special values...
//    name : the title of the article (we used to call it "Title".  We accept both (for now))
//    href : link to the article (we used to call it "URL")
//    description : Body of the article (we used to call it "Comment_Body")
//    caption : "{*actor*} commented on an article" or whatever.  used to be part of template bundle.
//    media : Images and stuff.  Array of {'type' : 'image', 'src' : image src, 'href' : url to link}
//    action_links : array like: {'text': 'Read the full article', 'href' : url}
//    share_text : prompt to the user ("Share this comment on Facebook")
//
slFacebookProxy.prototype.submitFeedStory = function(template_name, variables, callback, userComment){
	var me = this;
	if(!this.ApiKey || this.ApiKey == ""){
		if(callback) callback();
		return;
	}
	
	// Convert older parameters from the TemplateBundles days...
	if(variables){
		variables["name"] = variables["name"] || variables["Title"];
		variables["href"] = variables["href"] || variables["URL"];
		variables["description"] = variables["description"] || variables["Comment_Body"];
	}
	
	this.init(function(){
		FB.Connect.streamPublish(userComment, variables, variables["action_links"], null, variables["share_text"], callback, true);	
	});
};

slFacebookProxy.prototype.submitArticleComment = function(title, url, excerpt, comment_body, images, callback){
	var me = this;
	if(!this.ApiKey || this.ApiKey == ""){
		if(callback) callback();
		return;
	}
	
	var variables = {
		'name' : title,
		'href' : url,
		'description' : me.trunc(excerpt)
	}
	
	// setup images if there are any...
	if(images && images.length > 0){
		variables['media'] = [];
		for(var i=0; i<images.length; i++){
			variables['media'].push({'type' : 'image', 'src' : images[i], 'href' : url});
		}
	}
	
	variables['action_links'] = [{'text': 'Read the full article', 'href' : url}];
	
	this.submitFeedStory("ArticleComment", variables, callback, comment_body);
};

slFacebookProxy.prototype.getUrlParameters = function(url){
	var ret = {};
	var params = null;

	var startPos = url.indexOf('?');
	if(startPos >= 0){
		var endPos = url.indexOf('#');
		if(endPos < startPos){
			endPos = url.length;
		}

		params = url.substring(startPos+1, endPos);

		var splitParams = params.split("&");
		for(i=0; i<splitParams.length; i++){
			var kvp = splitParams[i].split('=');
			if(kvp[0]){
				ret[kvp[0]] = kvp[1] || "";
			}
		}
	}

	return ret;
};

slFacebookProxy.prototype.showInviteFriendsDialog = function(title, header, invite_text, next_page, type, accept_text, accept_url){
	var params = this.getUrlParameters(next_page);
	this.init(function(){
	    var the_fbml = "";
		the_fbml += '<fb:fbml>';
		the_fbml += '	<fb:request-form style="width: 750px; height: 660px;" action="' + next_page + '" method="GET" invite="true" type="' + type + '" content="' + invite_text + ' <fb:req-choice url=\'' + accept_url + '\' label=\'' + accept_text + '\'/>">';

		// add input params
		for(var i in params){
			the_fbml += '<input type="hidden" name="'+i+'" value="'+params[i]+'">';
		}

		the_fbml +=	'		<fb:multi-friend-selector showborder="false" bypass="cancel" actiontext="' + header + '"/>';
		the_fbml += '	</fb:request-form>';
		the_fbml += '</fb:fbml>';

		var dlg = new FB.UI.FBMLPopupDialog(title, the_fbml);
		dlg.setContentWidth(750);
		dlg.setContentHeight(660);
		dlg.set_placement(FB.UI.PopupPlacement.center);
		dlg.show();
	});
};

slFacebookProxy.prototype.isLoggedIn = function(){
	return (this.connectStatus != FB.ConnectState.userNotLoggedIn);
};

slFacebookProxy.prototype.currentUserFacebookId = function(){
	//return this.currentUserId;
	if(FB.Facebook.apiClient.get_session()){
		return FB.Facebook.apiClient.get_session().uid;
	}

	else return null;
};

slFacebookProxy.prototype.isConnectedUser = function(){
	return (this.connectStatus == FB.ConnectState.connected);
};

slFacebookProxy.prototype.connectEnabled = function(){
	return (this.ApiKey != "");
};

slFacebookProxy.prototype.renderFbml = function(){
	FB.XFBML.Host.parseDomTree();
};

slFacebookProxy.prototype.onLogin = function(callback){
	this.init(function(){
		FB.Facebook.get_sessionWaitable().waitUntilReady( callback );
	});
};

slFacebookProxy.prototype.queryConnectStatus = function(callback){
	this.init(function(){
		FB.Connect.get_status().waitUntilReady( callback );
	});
};

slFacebookProxy.prototype.login = function(callback){
	var me = this;
	this.init(function(){
		FB.Connect.requireSession(function(){
			FB.Connect.get_status().waitUntilReady(function( status ){
				me.connectStatus = status;

				if(callback){
					me.onLogin(callback);
				}
			});
		});
	});
};

slFacebookProxy.prototype.logout = function(callback){
	this.init(function(){
		FB.Connect.logout(callback);
	});
};

