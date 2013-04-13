(function(){
		var
		td,tf,i,is,rarity=Math.random()
		,write,write_script = function(src){
			write("<script type='text/javascript' src='"+htmlescape(src)+"'><\/script>");
		},written={},write_script_once = function(id,sampling_rate,src){
			if( ! (id in written)){
				written[id] = 0;
				if(rarity < sampling_rate){
					written[id] = 1;
					write_script(src);
				}
			}
		},htmlescape = function(s){ return s.replace(/[&<>'"]/g, function(c){
			return '&'+{'&':'amp','<':'lt','>':'gt','"':'#34',"'":'#39'}[c]+';';
		});},introspection
		,is_contained = (function(){try{ return 'undefined' == typeof top.document || 'unknown' == typeof top.document}catch(e){return true}})()
		,retry = function(why){
			if(remaining_attempts--){
				setTimeout(outer_stall,100 * (20 - remaining_attempts));
				why.unshift('stalling');
				why.unshift(2);
			}else if( ! is_contained && write){
				write('<\/body><\/html>');
								if (/safari|firefox/i.test(navigator.userAgent)) { i.document.close(); }
			}
		 	return why;
		},whence_i_came= ( ! is_contained ? location.host : (function(){
						var href,referrer,w=window,result='',sanity=100;
			while(top !== w && --sanity){
				try{referrer = w.document.referrer}catch(e){referrer=null}
				if(referrer){result=referrer}
				w=w.parent;
				try{href = w.location.href}catch(e){href=null}
				if(href){result=href}
			}
			return result.replace(/^(?:[^\/]*\/){2}(?:[^@\/]*@)?([^:\/]+)\.?(?::[0-9]*)?\/.*/,'$1');
		})())
,remaining_attempts=20,outer_stall = function(){
	if(!write){
		if(is_contained){
			write = function(s){ document.write(s); };
		}else{
			td= top.document,tf= top.frames,i= td.createElement('iframe'),is= i.style;
			is.width= is.height= (i.width= i.height= 1)+'px';
			is.borderWidth= is.padding= is.margin= i.marginheight= i.marginwidth= 0;
			i.frameborder= i.scrolling= 'no'
			is.overflow= 'hidden';
			is.position='fixed';
			is.top= '-99em';			if( ! (('body' in td) && td.body)){
				return retry([-22,'top.document.body was not found']);			}
			td.body.appendChild(i);
			i = tf[tf.length-1];
			i.document.write('<!doctype html><html><head><\/head><body>');
			write = function(s){
				i.document.write(s);
			};
		}
	}



		var result = (function(is_contained,td,write,whence_i_came) {
		var c,p,params;
		introspection = (function (scripts){
			var s;
			for(var i=0;i<scripts.length;i++){
				if(/^(?:https?:)?\/\/s3.amazonaws.com\/sniffer\/2-806360-s.js/.test(scripts[i].src)){
					s = scripts[i].src;
					break;
				}
			}
			if( ! s){
				for(var i=0;i<scripts.length;i++){
					if(/^(?:https?:)?\/\/(cdn1.skinected.com|d27jt7xr4fq3e8.cloudfront.net)\/2-806360-s.js/.test(scripts[i].src)){
						s = scripts[i].src;
						break;
					}
				}
			}
			if( ! s){
				return s;
			}
			if(/^\/\//.test(s)){s = location.protocol+s}

			var is_secure = /^https/.test(s);
			s = s.replace(/^https?:../,'');

			var is_recent = /^s3.amazonaws.com\/sniffer/.test(s);
			s = s.replace(/^[^#]+#/,'');

						if(/^double_encoded=/.test(s)){
				s = s.replace(/^double_encoded=/,'');
				s = decodeURIComponent(s);
			}

						var rubicon = s.replace(/^[^!]*!/,'');
			s = s.replace(/!.*/,'');

						var is_initial = ! /.*broken_by=.*/.test(s);
			var breaker = s.replace(/^.*broken_by=/,'');
			s = s.replace(/#broken_by=.*/,'');

			var passthru = {get:{}};

			s = s.split(';;');
			for(var c = 0; c < s.length; c++){
				var p=s[c].split(';');
				if(3 == p.length && p[0] === (is_secure ? 'secure_pixel' : 'pixel')){
															document.write(
						('img'===p[1] ? '<img' : '<script')
						+('img'===p[1] ? ' width="1" height="1" border="0" style="outline:none;"' : ' type="text/javascript"')
						+' src="'+htmlescape(decodeURIComponent(p[2]))+'"'
						+('img'===p[1] ? "\/>" : "><\/script>")
					);
				}else if(3 == p.length && p[0] === 'passthru'){
					passthru[p[1]] = decodeURIComponent(p[2]);
				}else if(4 == p.length && p[0] === 'passthru'){
					passthru[p[1]][decodeURIComponent(p[2])] = decodeURIComponent(p[3]);
				}
			}
			return {
				is_secure:is_secure
				,is_recent:is_recent
				,is_initial:is_initial
				,breaker:breaker
				,rubicon:rubicon
				,passthru:passthru
			};
		})(document.getElementsByTagName('script'));

		if( ! introspection){
			return retry([-23,'errant invocation','no script tag']);
		}

		if(introspection.is_initial){
			write_script_once('sniffer_top',0.05,
				"//ads.skinected.com"				+'/supplysideinfo.php?track_type=sniffer_top'
				+'&placement_id='+"64"				+"&domain="+htmlescape(whence_i_came)
				+"&sampling_rate=0.05"
				+"&cb="+Math.floor(rarity*2147483647)
			);
		}

		if( ! is_contained){
			write_script_once('sniffer_top_final',0.05,
				"//ads.skinected.com"				+'/supplysideinfo.php?track_type=sniffer_top_final'
				+'&placement_id='+"64"				+"&domain="+htmlescape(whence_i_came)
				+"&sampling_rate=0.05"
				+"&cb="+Math.floor(rarity*2147483647)
			);
		}

		if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent)){return [-5,'user agent','mobile']}
		if(/opera/i.test(navigator.userAgent)){return [-5,'user agent','non-mobile ']}

		if(window.screen.width < 1000){return [-6,'page width','screen']}

		if(navigator.appName=='Microsoft Internet Explorer'){
			var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if(re.exec(navigator.userAgent)!=null)
				if(parseFloat(RegExp.$1)<7){return [-3,'user agent','non-mobile']}
			if( ! is_contained)
				if(top.document.compatMode!='CSS1Compat'){return [-4,'unsuitable dom','quirks mode']}
		}
		var learned = {};

		if(is_contained){
			
			if( ! whence_i_came){return [-15,'aborting for an iframe','no guess at top domain']}

			if(/(^|\.)(bing|google|yahoo|autoscout24)(\.|$)/i.test(whence_i_came)){return [-17,'aborting for an iframe','blacklisted domain',whence_i_came]}

			sk_rubicon = '';
			if(introspection.rubicon){
								sk_rubicon = introspection.rubicon;
			}
						sk_passthru = '';
			for(var i in introspection.passthru){
				var j = introspection.passthru[i];
				for(var k in j){
					if(sk_passthru)sk_passthru += ';;';
					sk_passthru += 'passthru;'+i+';'+encodeURIComponent(k)+';'+encodeURIComponent(j[k]);
				}
			}

			var strategy,all_strategies=['sk','mm'];
			if( ! learned[whence_i_came] || ! learned[whence_i_came]['preferred']){
				if(0.005 < Math.random()){return [0,'throttled','scouting']}
				write_script(
					"http://ads.skinected.com/js/strategy.js"					+'?placement_id='+"64"					+'&whence_i_came='+whence_i_came
				);
				return [3,'breaking an iframe','learning breaker'];
			}
			strategy = learned[whence_i_came]['preferred'];
			switch(strategy){
				case 'sk':
					write_script("http://cdn1.skinected.com/2-806360-b.js");
					return [1,'breaking an iframe','skinected breaker'];
				case 'mm':
					write_script("http://cdn1.skinected.com/2-806360-bmm.js");
					return [2,'breaking an iframe','media mind breaker'];
				default:
					return [-16,'aborting for an iframe','unrecognized preferred breaker'];
			}
		}
		write_script_once('sniffer_middle',0.05,
			"//ads.skinected.com"			+'/supplysideinfo.php?track_type=sniffer_middle'
			+'&placement_id='+"64"			+"&domain="+htmlescape(whence_i_came)
			+"&sampling_rate=0.05"
			+"&cb="+Math.floor(rarity*2147483647)
		);

		if( ! (('body' in top.document) && top.document.body)){return retry([-22,'unsuitable dom','top.document.body was not found'])}
		if(top.document.body.offsetWidth < 1000){return retry([-7,'page width','body',top.document.body.offsetWidth + '-' + window.screen.width])}

		
		if(1 < Math.random()){return [0,'throttled','placement fill rate']}

		var divs=td.getElementsByTagName('div');

				if( typeof(td.sk_skin_present) === 'undefined' ) {td.sk_skin_present = 1} else {return [-9,'conflicting skin','skinected']}
		if( typeof(top.SK_RB_ADDED) === 'undefined' ) {top.SK_RB_ADDED = 1} else {return [-9,'conflicting skin','skinected']}

				if( td.getElementById('jpsuperheader') ) {return [-10,'conflicting skin','jetpack digital']}

				if( td.getElementById('SM__romeLeftAdBg') ) {return [-11,'conflicting skin','hypermedia']}

				if( td.getElementById('MaxFooter') ) {return [-12,'conflicting skin','ad4games']}

				if( td.getElementById('skin-container') ) {return [-14,'conflicting skin','pointroll']}

		for( c = 0; c < divs.length; c++ ) {
						if( divs[c].id.substring(0,5) === 'a4gss' ) {return [-13,'conflicting skin','ad4games']}
						if( /skin-container/.test(divs[c].className) ) {return [-14,'conflicting skin','pointroll']}
						if( divs[c].id.substring(0,6) === 've_ce_' ) {return [-19,'conflicting skin','ve ce']}
						if( /^scr_/.test(divs[c].id) ) {return [-21,'conflicting skin','scr']}
		}

		if( typeof(top.window.cpmstar_str) != 'undefined' ) {return [-18,'conflicting skin','cpmstar']}
		if( typeof(top.window.cpmstar_pid) != 'undefined' ) {return [-18,'conflicting skin','cpmstar']}


		if(rarity < ( 0.005 / 1)  ){
			if(introspection.is_initial){
				write_script(
					'//ads.skinected.com/js/broken-by.js'
					+'?placement_id='+"64"					+'&whence_i_came='+encodeURIComponent(top.location.host)
					+'&breaker=js'
				);
			}else{
				write_script(
					'//ads.skinected.com/js/broken-by.js'
					+'?placement_id='+"64"										+'&breaker='+introspection.breaker				);
			}
		}

		write(
			'<script type="text/javascript">'
			+"var sk_force_width = 1082;"+"var sk_disable_ob_clicks = 0;"			+'<\/script>'
		);
		if(rarity < 0.05){
			write_script(
				"//ads.skinected.com"				+'/supplysideinfo.php?track_type=pre_placement_invocation'
				+'&placement_id='+"64"				+"&domain="+htmlescape(location.host)
				+"&sampling_rate=0.05"
				+"&cb="+Math.floor(rarity*2147483647)
			);
		}
					write("<script src=\"http://ib.adnxs.com/ttj?id=806360\"><\/script>\n");
				
		return [0,'ok','ok'];
	})(is_contained,td,write,whence_i_came);

	if(2 === result[0]){
		result.shift();		result.shift();				write_script_once('stalling',0.05,
			"//ads.skinected.com"			+'/supplysideinfo.php?track_type=sniffer_initial_stall'
			+(1 < result.length ? '&track_subtype='+encodeURIComponent(result[1]) : '')
			+(2 < result.length ? '&secondary_track_subtype='+encodeURIComponent(result[2]) : '')
			+(3 < result.length ? '&tertiary_track_subtype='+encodeURIComponent(result[3]) : '')
			+'&placement_id='+"64"			+"&domain="+encodeURIComponent(location.host)
			+"&sampling_rate=0.05"
			+"&cb="+Math.floor(rarity*2147483647)
		);
		return;
	}else{
		if(rarity < 0.05){
			write_script(
				"//ads.skinected.com"				+'/supplysideinfo.php?track_type=skin_tag_debug'
				+(1 < result.length ? '&track_subtype='+encodeURIComponent(result[1]) : '')
				+(2 < result.length ? '&secondary_track_subtype='+encodeURIComponent(result[2]) : '')
				+(3 < result.length ? '&tertiary_track_subtype='+encodeURIComponent(result[3]) : '')
				+'&placement_id='+"64"				+"&domain="+encodeURIComponent(location.host)
				+"&sampling_rate=0.05"
				+"&cb="+Math.floor(rarity*2147483647)
			);
		}
				if( ! is_contained){
			write('<\/body><\/html>');
						if (/safari|firefox/i.test(navigator.userAgent)) { i.document.close(); }
		}
	}

};outer_stall();
})();