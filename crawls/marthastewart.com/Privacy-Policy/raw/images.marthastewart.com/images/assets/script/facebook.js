fbmsgcopy = 'Add a comment...';

/*
fbcontent_types = [MSLO-EXPERT,
MSLO-CHANNELINFO,
MSLO-OF-THE-DAY,
MSLO-CAMPAIGN,
MSLO-ARTICLE-V2,
MSLO-QUIZ-TRIVIA,
MSLO-QUIZ-PERSONALITY,
MSLO-PHOTOGALLERY,
MSLO-PHOTOGRAPHER,
MSLO-SHOW,
MSLO-MENU,
MSLO-PLANT,
MSLO-PROMOTIONSLIDE,
MSLO-WEBSOURCE,
MSLO-GOODTHINGS,
MSLO-POLL,
MSLO-CHEF,
MSLO-IMAGE,
MSLO-FREEFORM,
MSLO-TOC,
MSLO-QANDA,
MSLO-ARTICLE,
MSLO-COLLECTION,
MSLO-SWEEPSTAKE,
MSLO-FAQ,
MSLO-CELEBRITY,
MSLO-ACL,
MSLO-HOWTO,
MSLO-REGIONINFO,
MSLO-PROMOTION,
MSLO-PDF,
MSLO-VIDEO,
MSLO-RECIPE,
MSLO-FLASH,
MSLO-NEWSLETTER,
MSLO-AUTHOR]
*/
user_fb_logged_in_success = false;

function update_user_box() {
	
	user_fb_logged_in_success = true;

	var user_box = document.getElementById("fbuserbox");


	if (typeof(user_box) != 'undefined') {
	
	user_box.innerHTML = "<div class='connected'><span>"
	+ "<span class='namename'>Welcome, <fb:name uid='loggedinuser' useyou='false'></fb:name></span>"
	+ "<span class='inbox'><span class='fb_pic_container'><fb:profile-pic uid='loggedinuser' facebook-logo='true'></fb:profile-pic></span>"
/* 			+"<input type='button' value='Share this Page on Facebook!'  return false;'></input>" */
	+'<textarea id="fcta" onfocus="updatefcta()">'+fbmsgcopy+'</textarea></span>'
	+ "</span>"
	+'<h2 id="fbarthdr"></h2><p id="fbartdesc"></p>'
	+'<div class="fb_controls">'
	+'<a href="#close" class="engagement-close" id="closebtn_art2">Close</a>'
	+'<a rel="cancel" id="fbclose2" style=""><img alt="cancel" src="/images/assets/module/registration/reg_cancel.gif"/></a>'
	+'<a href="javascript: updatests();" class="ms-global-btn fb_post" style="height: 27px;">'
	+'<img src="http://images.marthastewart.com/images/assets/module/fbc/post_to.png"></a></div></div>';

	FB.XFBML.Host.parseDomTree();
	if (typeof(title) !='undefined') {
		document.getElementById('fbarthdr').innerHTML = title;
	}
	if (typeof(shortDescription)!='undefined') {
		document.getElementById('fbartdesc').innerHTML = shortDescription.truncate(200, '...');
	}
	
	var isPackage = $$(".package").length != 0 ? true : false;
	if (isPackage) {
		document.getElementById('fbarthdr').innerHTML = $$(".current_slide h2")[0].innerHTML;
		document.getElementById('fbartdesc').innerHTML = $$(".current_slide .slide_info p")[0].innerHTML;
	}

	document.getElementById('closebtn_art2').onclick= function() {
		engagement_toolbar.currentaction = '';
		engagement_toolbar.close_all_drawers();
	}
	document.getElementById('fbclose2').onclick= function() {
		collect.close();
	}
	
	var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
	
	/*
document.getElementById('fbhdr').style.position = 'absolute';
	document.getElementById('fbhdr').style.marginBottom = '0';
	document.getElementById('fbclose2').style.marginTop = '2px';
*/
	
	/*
if ($('lpg')) {
		$('fbhdr').style.margin = '0 0 0 -10px';
	}
*/
	if (typeof(fb_timer) != 'undefined') {
		clearInterval(fb_timer);
	}
	updatefbcopy();
	
	}
	
		
//	document.getElementById("collect-sharebook").addClassName('fbc_connected');		
}


if (location.href.indexOf('marthastewart.com') != '-1' || location.href.indexOf('preview.corp.mslo.com') != '-1') { 
	var api_key = '425913da38ac32b244a4285f711d954f'; 
	if (location.href.indexOf('preview.corp.mslo.com') != '-1') {
		var api_key = 'f89219bfd9515c5a73fe00868adbcf05';
	}
}
else if (location.href.indexOf('wholeliving.com') != '-1' || location.href.indexOf('previewbs.corp.mslo.com') != '-1') {
	var api_key = '7792c2dc493e3cd1494cd5d8d4c9221b'; 
}
else if (location.href.indexOf('marthastewartweddings.com') != '-1' || location.href.indexOf('previewmsw.corp.mslo.com') != '-1') {
	var api_key = '0ac81f36aecbc1a00e1e6677ef0c3c5f'; 
}

		
		
var channel_path = '/xd_receiver.htm'; 

if (document.getElementById('sharables') != null) {
	FB.init(api_key, channel_path, {"ifUserConnected": update_user_box, "doNotUseCachedConnectState": true});
}


		
		
		function updatefcta() {
			if (document.getElementById('fcta').value == fbmsgcopy) {
				document.getElementById('fcta').value = '';
			}
		}
		function getfctaval() {
			if (document.getElementById('fcta').value == fbmsgcopy) {
				return '';
			}
			else {
				return document.getElementById('fcta').value;
			}
		}
		
		
		function updatests() {
			dacom = getfctaval();
			
			if (typeof($j) != "undefined") {
				if ($j("body#pets.pet-adoption-detail").length == 1) {
					doTrackAction("adoption-FB-ShareThis");
				}
			}
			
			
			if (typeof(shortDescription)=='undefined') {
				shortDescription = 'No Desc';
			}
			if (typeof(title)=='undefined') {
				title = 'No Title';
			}
			if (thumbnail.length < 1) {
				
				if (location.href.indexOf('marthastewart.com') != '-1' || location.href.indexOf('preview.corp.mslo.com') != '-1') { 
					thumbnail = 'http://images.marthastewart.com/images/assets/module/fbc/mslogo.gif';

				}
				else if (location.href.indexOf('wholeliving.com') != '-1' || location.href.indexOf('previewbs.corp.mslo.com') != '-1') {
					thumbnail = 'http://images.marthastewart.com/images/assets/module/fbc/wllogo.gif';

				}
				else if (location.href.indexOf('marthastewartweddings.com') != '-1' || location.href.indexOf('previewmsw.corp.mslo.com') != '-1') {
					thumbnail = 'http://images.marthastewart.com/images/assets/module/fbc/mswlogo.gif';

				}
			}
			if (location.href.indexOf('marthastewart.com') != '-1' || location.href.indexOf('preview.corp.mslo.com') != '-1') { 
					/*
if (location.href.indexOf('qa.marthastewart.com') != '-1') {
						bundleid = '118196901073';
					}

 					else { */
						bundleid = '106145947826';
/* 					} */
				}
				else if (location.href.indexOf('wholeliving.com') != '-1' || location.href.indexOf('previewbs.corp.mslo.com') != '-1') {
					/*
if (location.href.indexOf('qa.wholeliving.com') != '-1') {
						bundleid = '135670274208';
					}
					else {
*/
						bundleid = '126290850567';
					/* } */
				}
				else if (location.href.indexOf('marthastewartweddings.com') != '-1' || location.href.indexOf('previewmsw.corp.mslo.com') != '-1') {
					bundleid = '101846261710';
				}

			
	/*
		
			
function facegup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ) {
    return "";
  }
  else {
    return results[1];
  }
}

newurl = window.location.href;
newurl = newurl.split('?')[0];
newurl = newurl + '?';

if (facegup('lpgStart').length > 0) {
newurl = newurl + 'lpgStart='+facegup('lpgStart')+'&';
}
if (facegup('currentslide').length > 0) {
newurl = newurl + 'currentslide='+facegup('currentslide')+'&';
}
if (facegup('currentChapter').length > 0) {
newurl = newurl + 'currentChapter='+facegup('currentChapter')+'&';
}

if (window.location.hash.length > 0) {
    newurl = newurl + window.location.hash;
}
*/
			

		var isPackage = $$(".package").length != 0 ? true : false;
		isHowTo = false;
		if (!isPackage && $$('.howto').length != 0) {
			isPackage = true;
			isHowTo = true;
		}

		if (isPackage) {
			var imgURL = $$(".current_slide")[0].getElementsByTagName("img")[0].src;
			imgURL = imgURL.split("_xl.jpg")[0];
			imgURL += "_s.jpg";
			thumbnail = imgURL;
			
			shortDescription = '';
			newurl = thumbnail;
			
			if (typeof($$(".current_slide .slide_info h2 a")[0]) != 'undefined') {
				title = $$(".current_slide .slide_info h2 a")[0].innerHTML;
			}
			else if ($$(".current_slide .slide_info h2")[0] != 'undefined') {
				title = $$(".current_slide .slide_info h2")[0].innerHTML;			
			}
			else {
				title = $$(".current_slide .slide_info h1")[0].innerHTML;
			}
			
			if (isHowTo == true) {
				title = $$('#article_title')[0].innerHTML;
			}
		}
		if (typeof(newurl) != 'undefined') {
			newurl = newurl.replace('??', '?').replace('??', '?').replace('??', '?').replace('??', '?');
		}
		else {
			newurl = location.href;
		}
			
		//var D={title:'Martha Stewart Food Page!',comment:'',title_href:'',description:'',images:[{src:thumbnail,href:newurl}],bodycopy:shortDescription, action_linkage:location.href, arttitle:title};
		
		var attachment = {
			name: title,
			href: location.href,
			caption: shortDescription,
			description: '',
			properties: '',
			media: [{ type: 'image', src: thumbnail, href: location.href }]
		}
		
		var action_links = [{text: title, href: location.href}]
		
		var B={value:dacom};
	/* 	if (B = 'Add a comment...') { B= '';} */
		var G="";
		//FB.Connect.showFeedDialog(bundleid,D,'','',2,FB.RequireConnect.doNotRequire,function(){},G,B);
		FB.Connect.streamPublish(dacom, attachment, action_links, "", "What's on your mind?");
}



function updatefbcopy() {
	
if (typeof(contentType) != 'undefined') {
	if (document.getElementById('fbhdr')) {
		newcontenttype = contentType.replace('MSLO-','').replace('-V2','');
		newcontenttype = newcontenttype.replace('HOWTO', 'how-to');
		newcontenttype = newcontenttype.replace('GOODTHINGS', 'good thing');
		newcontenttype = newcontenttype.replace('PHOTOGALLERY', 'photo gallery');
		$$('#fbhdr span')[0].innerHTML = newcontenttype;
		document.getElementById('fbhdr').innerHTML = document.getElementById('fbhdr').innerHTML.toLowerCase();
	}
	else {
		setTimeout('updatefbcopy()', 1000);
	}
	
	//alert(contentType);
	
	if ($$('.fb_login_not_logged_in').length > 1) {
		$$('.fb_login_not_logged_in')[1].hide();
	}
}
	/*

	if (document.getElementById('fbhdr2')) {
	document.getElementById('fbhdr2').innerHTML = document.getElementById('fbhdr2').innerHTML+' '+contentType.replace('MSLO-','').replace('-V2','');
	}
	if (document.getElementById('btn_collect_sharebook')) {
	document.getElementById('btn_collect_sharebook').innerHTML = document.getElementById('btn_collect_sharebook').innerHTML+' '+contentType.replace('MSLO-','').replace('-V2','');
	}
	}
	
*/

	
}
addLoadEvent(updatefbcopy);




/*
Template Bundle Info - 99085242826



Primary One Line Template
{*actor*} is sharing {*arttitle*} on MarthaStewart.com

Primary Short Story Template Title
{*actor*} is sharing {*arttitle*} on MarthaStewart.com


Primary Short Story Template Body
{*bodycopy*}
 
Action Links
1. Go To {*arttitle*}

Action Link URL
{*action_linkage*}

{"images":[{"src":"http://pad.thedigitalmovement.com/_blaise/2007-06-15-dgen-breakfast.jpg", "href":"http://www.facebook.com"}, {"src": "http://pad.thedigitalmovement.com/_blaise/2007-06-13-roger-waters.jpg", "href":"http://www.facebook.com"}], "arttitle": "a title", "bodycopy": "body Copy", "action_linkage": "http://www.google.com"}


*/


//This is a hack to get the dom parsed after the fb button is inserted into the dom sometime before the
//Dom is ready.  However, the FB object isn't initialized until after the dom is ready either.
//Could probably use eval instead of setTimeout, but its basically doing the same thing, and this works.

if ($('fbhdr')) {
	addLoadEvent(startfb_timer);
}

function startfb_timer() {
	updatefbcopy();
	fb_timer = setInterval('if (typeof(FB.XFBML) != "undefined") {FB.XFBML.Host.parseDomTree(); if (typeof(fb_timer) != "undefined") {clearInterval(fb_timer);}} updatefbcopy(); test_fb_loggin();', '1000');
}



function test_fb_loggin() {
//hack hack hack
	if (user_fb_logged_in_success == true && typeof($('fcta')) == 'undefined') {
		update_user_box();
	}
}

/*Revised crap for template bundle

One Line Template / Short Story Template Title
{*actor*} is sharing <a href="{*action_linkage*}">{*arttitle*}</a> on marthastewart.com

Short Story Template Body
{*bodycopy*}

Action Links
1. Go To {*arttitle*}

Action Link URL
{*action_linkage*}

{"images":[{"src":"http://pad.thedigitalmovement.com/_blaise/2007-06-15-dgen-breakfast.jpg", "href":"http://www.facebook.com"}, {"src": "http://pad.thedigitalmovement.com/_blaise/2007-06-13-roger-waters.jpg", "href":"http://www.facebook.com"}], "arttitle": "a title", "bodycopy": "body Copy", "action_linkage": "http://www.google.com"}


ms: 106145947826
msw: 101846261710

*/

