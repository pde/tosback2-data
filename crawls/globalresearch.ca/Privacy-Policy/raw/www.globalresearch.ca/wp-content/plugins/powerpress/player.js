/** 
 * jsMediaPlayer 1.2.0 for Blubrry PowerPress
 * 
 * http://www.blubrry.com/powepress/
 *
 * Copyright (c) 2008-2009 Angelo Mandato (angelo [at] mandato {period} com)
 *
 * Released under Aoache 2 license:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * versoin 1.3.0 02/18/2011 - Adding HTML5 audio/video tags if format possibly supported around default video embed.
 * versoin 1.2.0 - 07/20/2009 - Major rewrite, we're now replying less upon this javascript to make way for flexibility for adding future players.
 * versoin 1.1.3 - 03/23/2009 - Added code to support FlowPlayer v3.
 * versoin 1.1.2 - 03/04/2009 - Added options to set the width for audio, width and height for video.
 * versoin 1.1.1 - 12/22/20008 - Minor change to support Windows Media in Firefox. Includes link to preferred Firefox Windows Media Player plugin.
 * versoin 1.1.0 - 11/25/20008 - Major re-write, object now stored in this include file, auto play is no longer a member variable and is determined by function call.
 * version 1.0.3 - 11/02/2008 - Added option for playing quicktime files in an intermediate fashion with an image to click to play.
 * version 1.0.2 - 07/26/2008 - Fixed pop up player bug caused by v 1.0.1
 * version 1.0.1 - 07/28/2008 - fixed flow player looping playback, flash player no longer loops.
 * version 1.0.0 - 07/26/2008 - initial release
 */


/**
	Insert embed for quicktime within specified div
	
	@div - specific div to insert embed into
	@media_url - URL of media file to play
	@width - width of player
	@height - height of player
*/
function powerpress_embed_quicktime(div,media_url,width,height,scale)
{
	if( document.getElementById(div) )
	{
		var contentType = 'video/mpeg'; // Default content type
		if( media_url.indexOf('.m4v') > -1 )
			contentType = 'video/x-m4v';
		if( media_url.indexOf('.mp4') > -1 )
			contentType = 'video/mp4';
		else if( media_url.indexOf('.m4a') > -1 )
			contentType = 'audio/x-m4a';
		else if( media_url.indexOf('.avi') > -1 )
			contentType = 'video/avi';
		else if( media_url.indexOf('.qt') > -1 )
			contentType = 'video/quicktime';
		else if( media_url.indexOf('.mov') > -1 )
			contentType = 'video/quicktime';
		
		var Html = '';
		if( contentType == 'video/mp4' || contentType == 'video/x-m4v' )
			Html += '<video src="'+ media_url +'" width="'+ width +'" height="'+ height +'" controls autoplay>';
		Html += '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="'+ width +'" height="'+ height +'" codebase="http://www.apple.com/qtactivex/qtplugin.cab">\n';
		Html += '	<param name="src" value="'+ media_url +'" />\n';
		Html += '	<param name="href" value="'+ media_url +'" />\n';
		Html += '	<param name="scale" value="'+ scale +'" />\n';
		Html += '	<param name="controller" value="true" />\n';
		Html += '	<param name="autoplay" value="true" />\n';
		Html += '	<param name="pluginspage" value="http://www.apple.com/quicktime/download/" />\n';
		Html += '	<embed type="'+ contentType +'" src="'+ media_url +'" width="'+ width +'" height="'+ height +'" scale="'+ scale +'" correction="full" cache="true" autoplay="true" controller="true" pluginspage="http://www.apple.com/quicktime/download/"></embed>';
		Html += '</object>\n';
		if( contentType == 'video/mp4' || contentType == 'video/x-m4v' )
			Html += '</video>';
		document.getElementById(div).innerHTML = Html;
		return false; // stop the default link from proceeding
	}
	
	return true; // let the default link to the media open...
}

function powerpress_show_embed(id)
{
	if( document.getElementById('powerpress_embed_'+id) ) {
		document.getElementById('powerpress_embed_'+id).style.display = 'block';
		document.getElementById('powerpress_embed_'+id +'_t').select();
	}
	return false;
}

function powerpress_embed_html5iframe(id, url, width, height)
{
	if( document.getElementById('powerpress_player_'+id) ) {
		var Html = '';
		Html += '<iframe';
		Html += ' class="powerpress-player-embed"';
		Html += ' width="' + width +'"';
		Html += ' height="'+ height +'"';
		Html += ' src="'+ url +'"';
		Html += ' frameborder="0"';
		Html += '></iframe>';
		document.getElementById('powerpress_player_'+id).innerHTML = Html;
		return false;
	}
	return true;
}

/**
	Insert embed for H.264 mp4 video, with fallback to WebM
	
	@div - specific div to insert embed into
	@media_url - URL of media file to play
	@width - width of player
	@height - height of player
	@webm_media_url - Alternative WebM media URL
*/
function powerpress_embed_html5v(id,media_url,width,height,webm_media_url)
{
	if( document.getElementById('powerpress_player_'+id) )
	{
		var poster = '';
		if( document.getElementById('powerpress_player_'+id).getElementsByTagName ) {
			var images = document.getElementById('powerpress_player_'+id).getElementsByTagName('img');
			if( images.length && images[0].src )
				poster = images[0].src;
		}
		
		var contentType = 'video/mp4'; // Default content type
		if( media_url.indexOf('.webm') > -1 )
			contentType = 'video/webm';
		if( media_url.indexOf('.ogg') > -1 || media_url.indexOf('.ogv') > -1 )
			contentType = 'video/ogg';
		
		var v = document.createElement("video");
		var html5 = false;
		if( !!v.canPlayType ) {
			var status = v.canPlayType(contentType);
			if( status == 'probably' || status == 'maybe' ) {
				html5 = true;
			}
			else if( webm_media_url )
			{
				status = v.canPlayType('video/webm');
				if( status == 'probably' || status == 'maybe' ) {
					html5 = true;
				}
			}
		}
		
		if( html5 ) {
			var s = document.createElement('source');
			v.width = width; v.height = height; v.controls = true;
			if( poster ) v.poster = poster;
			s.src = media_url; s.type = contentType;
			v.appendChild(s);
			if( webm_media_url ) {
				var s_webm = document.createElement('source');
				s_webm.src = webm_media_url; s_webm.type = 'video/webm; codecs="vp8, vorbis"';
				v.appendChild(s_webm);
			}
			
			document.getElementById('powerpress_player_'+id).innerHTML = '';
			document.getElementById('powerpress_player_'+id).appendChild(v);
			v.play();
		} else {
			delete(v);
			pp_flashembed(
				'powerpress_player_'+id,
			{src: powerpress_url +'FlowPlayerClassic.swf', width: width, height: height, wmode: 'transparent' },
				{config: { autoPlay: true, autoBuffering: true, showFullScreenButton: true, showMenu: false, videoFile: media_url, loop: false, autoRewind: true, splashImageFile: poster } }
			);
		}
		
		if( window.powerpress_resize_player )
			powerpress_resize_player();
		
		return false; // stop the default link from proceeding
	}
	
	return true; // let the default link to the media open...
}

/**
	Insert embed for audio, with fallback to flash (m4a/mp3/ogg)
	
	@div - specific div to insert embed into
	@media_url - URL of media file to play
	@width - width of player
	@height - height of player
	@webm_media_url - Alternative WebM media URL
*/
function powerpress_embed_html5a(id,media_url)
{
	if( document.getElementById('powerpress_player_'+id) )
	{
		var poster = '';
		if( document.getElementById('powerpress_player_'+id).getElementsByTagName ) {
			var images = document.getElementById('powerpress_player_'+id).getElementsByTagName('img');
			if( images.length && images[0].src )
				poster = images[0].src;
		}
		
		var contentType = 'audio/mpeg'; // Default content type
		if( media_url.indexOf('.m4a') > -1 )
			contentType = 'audio/x-m4a';
		if( media_url.indexOf('.ogg') > -1 || media_url.indexOf('.oga') > -1 )
			contentType = 'audio/ogg';
		
		var a = document.createElement("audio");
		var html5 = false;
		if( !!a.canPlayType ) {
			var status = a.canPlayType(contentType);
			if( status == 'probably' || status == 'maybe' ) {
				html5 = true;
			}
		}
		
		if( html5 ) {
			var s = document.createElement('source');
			a.controls = true;
			s.src = media_url; s.type = contentType;
			a.appendChild(s);
			
			document.getElementById('powerpress_player_'+id).innerHTML = '';
			document.getElementById('powerpress_player_'+id).appendChild(a);
			a.play();
		} else {
			delete(a);
			if( contentType != 'audio/ogg') {
				pp_flashembed(
					'powerpress_player_'+id,
					{src: powerpress_url +'FlowPlayerClassic.swf', width: 320, height: 24, wmode: 'transparent' },
						{config: { autoPlay: true, autoBuffering: true, showFullScreenButton: false, showMenu: false, videoFile: media_url, loop: false, autoRewind: true } }
					);
			} else { return true; }
		}
		
		return false; // stop the default link from proceeding
	}
	
	return true; // let the default link to the media open...
}

/**
	Insert embed for windows media within specified div
	
	@div - specific div to insert embed into
	@media_url - URL of media file to play
	@width - width of player
	@height - height of player
*/
function powerpress_embed_winplayer(div,media_url,width,height)
{
	if( document.getElementById(div) )
	{
		var Html = '';
		Html += '<object id="winplayer" classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="'+ width +'" height="'+ height +'" standby="loading..." type="application/x-oleobject">\n';
		Html += '	<param name="url" value="'+ media_url +'" />\n';
		Html += '	<param name="AutoStart" value="true" />\n';
		Html += '	<param name="AutoSize" value="true" />\n';
		Html += '	<param name="AllowChangeDisplaySize" value="true" />\n';
		Html += '	<param name="standby" value="Media is loading..." />\n';
		Html += '	<param name="AnimationAtStart" value="true" />\n';
		Html += '	<param name="scale" value="aspect" />\n';
		Html += '	<param name="ShowControls" value="true" />\n';
		Html += '	<param name="ShowCaptioning" value="false" />\n';
		Html += '	<param name="ShowDisplay" value="false" />\n';
		Html += '	<param name="ShowStatusBar" value="false" />\n';
		Html += '	<embed type="application/x-mplayer2" src="'+ media_url +'" width="'+ width +'" height="'+ height +'" scale="aspect" AutoStart="true" ShowDisplay="0" ShowStatusBar="0" AutoSize="1" AnimationAtStart="1" AllowChangeDisplaySize="1" ShowControls="1"></embed>\n';
		Html += '</object>\n';
		document.getElementById(div).innerHTML = Html;
		return false; // stop the default link from proceeding
	}
	return true; // let the default link to the media open...
}

/**
	Insert embed for swf flash within specified div
	
	@div - specific div to insert embed into
	@media_url - URL of media file to play
	@width - width of player
	@height - height of player
*/
function powerpress_embed_swf(div,media_url,width,height)
{
	if( document.getElementById(div) )
	{
		var Html = '';
		Html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+ width +'" height="'+ height +'" menu="true">\n';
		Html += '	<param name="movie" value="'+ media_url +'" />\n';
		Html += '	<param name="quality" value="high" />\n';
		Html += '	<param name="menu" value="true" />\n';
		Html += '	<param name="scale" value="noorder" />\n';
		Html += '	<param name="quality" value="high" />\n';
		Html += '	<embed src="'+ media_url +'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+ width +'" height="'+ height +'" menu="true"></embed>';
		Html += '</object>\n';
		document.getElementById(div).innerHTML = Html;
		return false; // stop the default link from proceeding
	}
	return true; // let the default link to the media open...
}

/** 
 * flashembed 0.31. Adobe Flash embedding script
 * 
 * http://flowplayer.org/tools/flash-embed.html
 *
 * Copyright (c) 2008 Tero Piirainen (tipiirai@gmail.com)
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * >> Basically you can do anything you want but leave this header as is <<
 *
 * version 0.01 - 03/11/2008 
 * version 0.31 - Tue Jul 22 2008 06:30:31 GMT+0200 (GMT+02:00)
 */
 
function pp_flashembed(root,userParams,flashvars){function getHTML(){var html="";if(typeof flashvars=='function'){flashvars=flashvars();}if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){html='<embed type="application/x-shockwave-flash" ';if(params.id){extend(params,{name:params.id});}for(var key in params){if(params[key]!==null){html+=[key]+'="'+params[key]+'"\n\t';}}if(flashvars){html+='flashvars=\''+concatVars(flashvars)+'\'';}html+='/>';}else{html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';html+='width="'+params.width+'" height="'+params.height+'"';if(!params.id&&document.all){params.id="_"+(""+Math.random()).substring(5);}if(params.id){html+=' id="'+params.id+'"';}html+='>';html+='\n\t<param name="movie" value="'+params.src+'" />';params.id=params.src=params.width=params.height=null;for(var k in params){if(params[k]!==null){html+='\n\t<param name="'+k+'" value="'+params[k]+'" />';}}if(flashvars){html+='\n\t<param name="flashvars" value=\''+concatVars(flashvars)+'\' />';}html+="</object>";if(debug){alert(html);}}return html;}function init(name){var timer=setInterval(function(){var doc=document;var el=doc.getElementById(name);if(el){pp_flashembed(el,userParams,flashvars);clearInterval(timer);}else if(doc&&doc.getElementsByTagName&&doc.getElementById&&doc.body){clearInterval(timer);}},13);return true;}function extend(to,from){if(from){for(key in from){if(from.hasOwnProperty(key)){to[key]=from[key];}}}}var params={src:'#',width:'100%',height:'100%',version:null,onFail:null,expressInstall:null,debug:false,bgcolor:'#ffffff',allowfullscreen:true,allowscriptaccess:'always',quality:'high',type:'application/x-shockwave-flash',pluginspage:'http://www.adobe.com/go/getflashplayer'};if(typeof userParams=='string'){userParams={src:userParams};}extend(params,userParams);var version=pp_flashembed.getVersion();var required=params.version;var express=params.expressInstall;var debug=params.debug;if(typeof root=='string'){var el=document.getElementById(root);if(el){root=el;}else{return init(root);}}if(!root){return;}if(!required||pp_flashembed.isSupported(required)){params.onFail=params.version=params.expressInstall=params.debug=null;root.innerHTML=getHTML();return root.firstChild;}else if(params.onFail){var ret=params.onFail.call(params,pp_flashembed.getVersion(),flashvars);if(ret){root.innerHTML=ret;}}else if(required&&express&&pp_flashembed.isSupported([6,65])){extend(params,{src:express});flashvars={MMredirectURL:location.href,MMplayerType:'PlugIn',MMdoctitle:document.title};root.innerHTML=getHTML();}else{if(root.innerHTML.replace(/\s/g,'')!==''){}else{root.innerHTML="<h2>Flash version "+required+" or greater is required</h2>"+"<h3>"+(version[0]>0?"Your version is "+version:"You have no flash plugin installed")+"</h3>"+"<p>Download latest version from <a href='"+params.pluginspage+"'>here</a></p>";}}function concatVars(vars){var out="";for(var key in vars){if(vars[key]){out+=[key]+'='+asString(vars[key])+'&';}}return out.substring(0,out.length-1);}function asString(obj){switch(typeOf(obj)){case'string':return'"'+obj.replace(new RegExp('(["\\\\])','g'),'\\$1')+'"';case'array':return'['+map(obj,function(el){return asString(el);}).join(',')+']';case'function':return'"function()"';case'object':var str=[];for(var prop in obj){if(obj.hasOwnProperty(prop)){str.push('"'+prop+'":'+asString(obj[prop]));}}return'{'+str.join(',')+'}';}return String(obj).replace(/\s/g," ").replace(/\'/g,"\"");}function typeOf(obj){if(obj===null||obj===undefined){return false;}var type=typeof obj;return(type=='object'&&obj.push)?'array':type;}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};});}function map(arr,func){var newArr=[];for(var i in arr){if(arr.hasOwnProperty(i)){newArr[i]=func(arr[i]);}}return newArr;}return root;}if(typeof jQuery=='function'){(function($){$.fn.extend({pp_flashembed:function(params,flashvars){return this.each(function(){pp_flashembed(this,params,flashvars);});}});})(jQuery);}pp_flashembed=pp_flashembed||{};pp_flashembed.getVersion=function(){var version=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var _d=navigator.plugins["Shockwave Flash"].description;if(typeof _d!="undefined"){_d=_d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var _m=parseInt(_d.replace(/^(.*)\..*$/,"$1"),10);var _r=/r/.test(_d)?parseInt(_d.replace(/^.*r(.*)$/,"$1"),10):0;version=[_m,_r];}}else if(window.ActiveXObject){try{var _a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version=[6,0];_a.AllowScriptAccess="always";}catch(ee){if(version[0]==6){return;}}try{_a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(eee){}}if(typeof _a=="object"){_d=_a.GetVariable("$version");if(typeof _d!="undefined"){_d=_d.replace(/^\S+\s+(.*)$/,"$1").split(",");version=[parseInt(_d[0],10),parseInt(_d[2],10)];}}}return version;};pp_flashembed.isSupported=function(version){var now=pp_flashembed.getVersion();var ret=(now[0]>version[0])||(now[0]==version[0]&&now[1]>=version[1]);return ret;};
