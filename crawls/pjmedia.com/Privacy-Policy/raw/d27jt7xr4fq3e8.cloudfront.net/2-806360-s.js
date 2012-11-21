	(function(is_contained) {
	var c,p,params,scripts=document.getElementsByTagName('script'),htmlescape = function(s){ return s.replace(/[&<>'"]/g, function(c){
		return '&'+{'&':'amp','<':'lt','>':'gt','"':'#34',"'":'#39'}[c]+';';
	});}, introspection = (function (htmlescape,scripts){
		var s;
		for(var i=0;i<scripts.length;i++){
			if(/^https?:\/\/s3.amazonaws.com\/sniffer\/2-806360-s.js/.test(scripts[i].src)){
				s = scripts[i].src;
				break;
			}
		}
		if( ! s){
			for(var i=0;i<scripts.length;i++){
				if(/^https?:\/\/(cdn1.skinected.com|d27jt7xr4fq3e8.cloudfront.net)\/2-806360-s.js/.test(scripts[i].src)){
					s = scripts[i].src;
					break;
				}
			}
		}
		if( ! s){
			return s;
		}

		var is_secure = /^https/.test(s);
		s = s.replace(/^https?:../,'');

		var is_recent = /^s3.amazonaws.com\/sniffer/.test(s);
		s = s.replace(/^[^#]+#/,'');

				var rubicon = s.replace(/^[^!]*!/,'');
		s = s.replace(/!.*/,'');

		s = s.split(';;');
		for(var c = 0; c < s.length; c++){
			var p=s[c].split(';');
			if(3 == p.length && p[0] === (is_secure ? 'secure_pixel' : 'pixel')){
												document.write(
					('img'===p[1] ? '<img' : '<script')
					+('img'===p[1] ? ' width="1" height="1" border="0" style="outline:none;"' : ' type="text/javascript"')
					+' src="'+htmlescape(decodeURIComponent(p[2]))+'"'
					+('img'===p[1] ? "\/>" : "\/><\/script>")
				);
			}
		}
		return {
			is_secure:is_secure
			,is_recent:is_recent
			,rubicon:rubicon
		};
	})(htmlescape,scripts)
	;

	if(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm|opera/i.test(navigator.userAgent)){return [-5,'blacklisted user agent']}

	if(window.screen.width < 1280){return [-6,'window.screen.width < 1280']}

	if(navigator.appName=='Microsoft Internet Explorer'){
		var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(navigator.userAgent)!=null)
			if(parseFloat(RegExp.$1)<7){return [-3,'IE < 7']}
		if( ! is_contained)
			if(top.document.compatMode!='CSS1Compat'){return [-4,'!CSS1Compat']}
	}
	var learned = {};

	if(is_contained){
		
		var whence_i_came = (function(){
					var href,referrer,w=window,result='',sanity=100;
			while(top !== w && --sanity){
				try{referrer = w.document.referrer}catch(e){referrer=null}
				if(referrer){result=referrer}
				w=w.parent;
				try{href = w.location.href}catch(e){href=null}
				if(href){result=href}
			}
			return result.replace(/^(?:[^\/]*\/){2}(?:[^@\/]*@)?([^:\/]+)\.?(?::[0-9]*)?\/.*/,'$1');
		})();

		if( ! whence_i_came){return [-15,'no guess at top domain']}

		if(/(^|\.)(bing|google|yahoo|autoscout24)(\.|$)/i.test(whence_i_came)){return [-17,'blacklisted domain '+whence_i_came]}

		var strategy,all_strategies=['sk','mm'];
		if( ! learned[whence_i_came] || ! learned[whence_i_came]['preferred']){
			if(0.005 < Math.random()){return [0,'throttled scouting']}
			if(introspection.rubicon){
								sk_rubicon = introspection.rubicon
			}
			document.write("<script src='"
				+"http://ads.skinected.com/js/strategy.js"				+'?placement_id='+"64"				+'&whence_i_came='+whence_i_came
			+"'><\/script>");
			return [3,'wrote learning breaker'];
		}
		strategy = learned[whence_i_came]['preferred'];
		switch(strategy){
			case 'sk':
				document.write("<script src='"
					+"http://cdn1.skinected.com/2-806360-b.js"				+"'><\/script>");
				return [1,'wrote skinected breaker'];
			case 'mm':
				document.write("<script src='"
					+"http://cdn1.skinected.com/2-806360-bmm.js"				+"'><\/script>");
				return [2,'wrote mm breaker'];
			default:
				return [-16,'unknown breaking strategy'];
		}
	}

	if(top.document.body.offsetWidth < 1240){return [-7,'top.document.body.offsetWidth < 1240']}

	if(1 < Math.random()){return [0,'throttled by fill rate']}

	var td= top.document,tf= top.frames,i= td.createElement('iframe'),is= i.style,divs=td.getElementsByTagName('div');

		if( typeof(td.sk_skin_present) === 'undefined' ) {td.sk_skin_present = 1} else {return [-9,'skinected skin detected']}
	if( typeof(top.SK_RB_ADDED) === 'undefined' ) {top.SK_RB_ADDED = 1} else {return [-9,'skinected skin detected']}

		if( td.getElementById('jpsuperheader') ) {return [-10,'jetpack digital skin detected']}

		if( td.getElementById('SM__romeLeftAdBg') ) {return [-11,'hypermedia skin detected']}

		if( td.getElementById('MaxFooter') ) {return [-12,'ad4games skin detected']}

		if( td.getElementById('skin-container') ) {return [-14,'pointroll skin detected']}

	for( c = 0; c < divs.length; c++ ) {
				if( divs[c].id.substring(0,5) === 'a4gss' ) {return [-13,'ad4games skin detected']}
				if( /skin-container/.test(divs[c].className) ) {return [-14,'pointroll skin detected']}
				if( divs[c].id.substring(0,6) === 've_ce_' ) {return [-19,'ve ce skin detected']}
	}

	if( typeof(top.window.cpmstar_str) != 'undefined' ) {return [-18,'cpmstar skin detected']}
	if( typeof(top.window.cpmstar_pid) != 'undefined' ) {return [-18,'cpmstar skin detected']}

	is.width= is.height= (i.width= i.height= 1)+'px';
	is.borderWidth= is.padding= is.margin= i.marginheight= i.marginwidth= 0;
	i.frameborder= i.scrolling= 'no'
	is.overflow= 'hidden';
	is.position='fixed';
	is.top= '-99em';	td.getElementsByTagName('body')[0].appendChild(i);
	i = tf[tf.length-1];
	i.document.write('<!doctype html><html><head><\/head><body>');
	var r= /^https?:\/\/cdn1.skinected.com\/\d-\d+-s.js#broken_by=/ ;
	if(Math.random() < ( 0.005 / 1)  ){
		for( c = 0; c < scripts.length; c++ ) {
			if(r.test(scripts[c].src)){
				i.document.write(
					'<script src="'
					+'http://ads.skinected.com/js/broken-by.js'
					+'?placement_id='+"64"										+'&breaker='+scripts[c].src.replace(r,'')					+'"><\/script>'
				);
				break;
			}
		}

		if(c == scripts.length){
			i.document.write(
				'<script src="'
				+'http://ads.skinected.com/js/broken-by.js'
				+'?placement_id='+"64"				+'&whence_i_came='+encodeURIComponent(top.location.host)
				+'&breaker=js'
				+'"><\/script>'
			);
		}
	}

	i.document.write(
		'<script type="text/javascript">'
		+"var sk_force_width = 1082;"+"var sk_disable_ob_clicks = 0;"	
		+'<\/script>'
				+"<script src=\"http://ib.adnxs.com/ttj?id=806360\"><\/script>\n"			);
	
	i.document.write('<\/body><\/html>');
	if (navigator.userAgent.indexOf("Firefox")>=0) { i.document.close(); }
	return [0];
})((function(){try{ return 'undefined' == typeof top.document || 'unknown' == typeof top.document}catch(e){return true}})());
