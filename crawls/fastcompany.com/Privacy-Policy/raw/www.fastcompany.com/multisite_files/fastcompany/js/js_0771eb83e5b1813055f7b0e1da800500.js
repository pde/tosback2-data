var tracking = tracking || {};
;
var tracking = tracking || {};

tracking.omniture = function() {
  sanitize = function(str) {
    return str.replace(/[^A-Za-z0-9\-\s]*/g, '');
  };

  return {
    search: function(terms) {
      // update a search event
      var s=s_gi(s_account);
      s.linkTrackVars='prop14,eVar12,events';
      s.linkTrackEvents='event1';
      s.eVar12=s.prop14=terms;
      s.events='event1';
      s.tl(this,'o','Internal Search');
    },
    pageView: function(pageName, pageNum, path) {
      // Page view event
      if ( pageName ) {
         // replicate the transformations to the pageName in PHP.
         s.pageName = s.server + ':';
         s.pageName += s.channel + ':';
         pageName = pageName.replace(/\s+?/g, '-').toLowerCase();
         s.pageName += sanitize(pageName);
      }

      if ( pageNum || pageNum === 0) {
        s.prop13 = String(pageNum);
      }

      s.events='event9';

      s.t();
    }
  };
}();
;
﻿/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);;
/*
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.3 
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(6($,g,h,i){l j=\'2f\',2h={3i:\'2f\',N:{O:E,C:E,z:E,I:E,r:E,L:E,K:E,A:E},2q:0,1a:\'\',13:\'\',3:h.3h.1b,x:h.13,1q:\'2f.3d\',y:{},1o:0,1w:w,3c:w,3b:w,29:E,2c:6(){},39:6(){},1P:6(){},2g:6(){},8:{O:{3:\'\',15:E,1i:\'38\',14:\'36-4Z\',28:\'\'},C:{3:\'\',15:E,S:\'1M\',Z:\'4W\',G:\'\',1A:\'E\',2l:\'E\',2m:\'\',1B:\'\',14:\'4S\'},z:{3:\'\',15:E,2r:\'\',y:\'34\',2v:\'\',19:\'\',1I:\'\',14:\'36\'},I:{3:\'\',15:E,Q:\'4L\'},r:{3:\'\',15:E,1i:\'38\'},L:{3:\'\',15:E,Z:\'1\'},K:{3:\'\',15:E,2a:\'\'},A:{3:\'\',1C:\'\',1s:\'\',Z:\'34\'}}},1n={O:"",C:"1D://4K.C.o/4y?q=4v%2Y,%4k,%4j,%4i,%4g,%4f,3j,%46,%45%43%42%41%2Y=%27{3}%27&1y=?",z:"T://3X.3Q.z.o/1/3E/y.2H?3={3}&1y=?",I:"T://3m.I.o/2.0/5c.5a?55={3}&Q=1c&1y=?",r:\'T://53.r.o/4R/2H/4C/m?3={3}&1y=?\',L:"",K:"T://1p.K.o/4A/y/N?4s=4p&3={3}&1y=?",A:""},2B={O:6(b){l c=b.4.8.O;$(b.p).X(\'.8\').12(\'<n H="U 4e"><n H="g-26" m-1i="\'+c.1i+\'" m-1b="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-28="\'+c.28+\'"></n></n>\');g.40={14:b.4.8.O.14};l d=0;9(B 2y===\'F\'&&d==0){d=1;(6(){l a=h.1d(\'P\');a.Q=\'x/1c\';a.1h=w;a.17=\'//3x.2x.o/Y/26.Y\';l s=h.1g(\'P\')[0];s.1e.1f(a,s)})()}J{2y.26.3Y()}},C:6(c){l e=c.4.8.C;$(c.p).X(\'.8\').12(\'<n H="U C"><n 2T="1U-47"></n><n H="1U-1M" m-1b="\'+(e.3!==\'\'?e.3:c.4.3)+\'" m-1A="\'+e.1A+\'" m-Z="\'+e.Z+\'" m-G="\'+e.G+\'" m-3v-2l="\'+e.2l+\'" m-S="\'+e.S+\'" m-2m="\'+e.2m+\'" m-1B="\'+e.1B+\'" m-19="\'+e.19+\'"></n></n>\');l f=0;9(B 1j===\'F\'&&f==0){f=1;(6(d,s,a){l b,2t=d.1g(s)[0];9(d.3y(a)){1v}b=d.1d(s);b.2T=a;b.17=\'//4d.C.4o/\'+e.14+\'/4u.Y#4D=1\';2t.1e.1f(b,2t)}(h,\'P\',\'C-5i\'))}J{1j.3o.3q()}},z:6(b){l c=b.4.8.z;$(b.p).X(\'.8\').12(\'<n H="U z"><a 1b="1D://z.o/N" H="z-N-U" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-y="\'+c.y+\'" m-x="\'+b.4.x+\'" m-19="\'+c.19+\'" m-2v="\'+c.2v+\'" m-1I="\'+c.1I+\'" m-14="\'+c.14+\'" m-2r="\'+c.2r+\'">3r</a></n>\');l d=0;9(B 2k===\'F\'&&d==0){d=1;(6(){l a=h.1d(\'P\');a.Q=\'x/1c\';a.1h=w;a.17=\'//1L.z.o/1F.Y\';l s=h.1g(\'P\')[0];s.1e.1f(a,s)})()}J{$.3D({3:\'//1L.z.o/1F.Y\',3F:\'P\',3G:w})}},I:6(a){l b=a.4.8.I;$(a.p).X(\'.8\').12(\'<n H="U I"><a H="3I \'+b.Q+\'" 3M="3V 3W" 1b="T://I.o/2z?3=\'+V((b.3!==\'\'?b.3:a.4.3))+\'"></a></n>\');l c=0;9(B 44===\'F\'&&c==0){c=1;(6(){l s=h.1d(\'2A\'),25=h.1g(\'2A\')[0];s.Q=\'x/1c\';s.1h=w;s.17=\'//1F.I.o/8.Y\';25.1e.1f(s,25)})()}},r:6(a){9(a.4.8.r.1i==\'4h\'){l b=\'G:2s;\',2u=\'D:2C;G:2s;1B-1i:4z;1t-D:2C;\',2o=\'D:2D;1t-D:2D;2n-51:1G;\'}J{l b=\'G:54;\',2u=\'2j:59;2i:0 1G;D:1u;G:5d;1t-D:1u;\',2o=\'2j:5g;D:1u;1t-D:1u;\'}l c=a.1w(a.4.y.r);9(B c==="F"){c=0}$(a.p).X(\'.8\').12(\'<n H="U r"><n 1S="\'+b+\'1B:5j 5k,5l,5n-5t;3k:3l;1R:#3n;2E:3p-2F;2j:2G;D:1u;1t-D:3s;2n:0;2i:0;x-3t:0;3u-2e:3w;">\'+\'<n 1S="\'+2u+\'2I-1R:#2J;2n-3z:3A;3B:3C;x-2e:2K;1O:2L 2M #3H;1O-2N:1G;">\'+c+\'</n>\'+\'<n 1S="\'+2o+\'2E:2F;2i:0;x-2e:2K;x-3J:2G;G:2s;2I-1R:#3K;1O:2L 2M #3L;1O-2N:1G;1R:#2J;">\'+\'<2O 17="T://1p.r.o/3N/2O/r.3O.3P" D="10" G="10" 3R="3S" /> 3T</n></n></n>\');$(a.p).X(\'.r\').3U(\'1P\',6(){a.2P(\'r\')})},L:6(b){l c=b.4.8.L;$(b.p).X(\'.8\').12(\'<n H="U L"><2Q:2b Z="\'+c.Z+\'" 3h="\'+(c.3!==\'\'?c.3:b.4.3)+\'"></2Q:2b></n>\');l d=0;9(B 1E===\'F\'&&d==0){d=1;(6(){l a=h.1d(\'P\');a.Q=\'x/1c\';a.1h=w;a.17=\'//1L.L.o/1/1F.Y\';l s=h.1g(\'P\')[0];s.1e.1f(a,s)})();s=g.3Z(6(){9(B 1E!==\'F\'){1E.2R();24(s)}},23)}J{1E.2R()}},K:6(b){l c=b.4.8.K;$(b.p).X(\'.8\').12(\'<n H="U K"><P Q="22/N" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-2a="\'+c.2a+\'"></P></n>\');l d=0;9(B g.2S===\'F\'&&d==0){d=1;(6(){l a=h.1d(\'P\');a.Q=\'x/1c\';a.1h=w;a.17=\'//1L.K.o/22.Y\';l s=h.1g(\'P\')[0];s.1e.1f(a,s)})()}J{g.2S.1K()}},A:6(b){l c=b.4.8.A;$(b.p).X(\'.8\').12(\'<n H="U A"><a 1b="T://A.o/1J/1Z/U/?3=\'+(c.3!==\'\'?c.3:b.4.3)+\'&1C=\'+c.1C+\'&1s=\'+c.1s+\'" H="1J-48-U" y-Z="\'+c.Z+\'">49 4a</a></n>\');(6(){l a=h.1d(\'P\');a.Q=\'x/1c\';a.1h=w;a.17=\'//4b.A.o/Y/4c.Y\';l s=h.1g(\'P\')[0];s.1e.1f(a,s)})()}},2w={O:6(){},C:6(){1U=g.2U(6(){9(B 1j!==\'F\'){1j.1Y.1X(\'2V.1Z\',6(a){1m.1l([\'1k\',\'C\',\'1M\',a])});1j.1Y.1X(\'2V.4l\',6(a){1m.1l([\'1k\',\'C\',\'4m\',a])});1j.1Y.1X(\'4n.1A\',6(a){1m.1l([\'1k\',\'C\',\'1A\',a])});24(1U)}},2W)},z:6(){2X=g.2U(6(){9(B 2k!==\'F\'){2k.4q.4r(\'1H\',6(a){9(a){1m.1l([\'1k\',\'z\',\'1H\'])}});24(2X)}},2W)},I:6(){},r:6(){},L:6(){},K:6(){6 4t(){1m.1l([\'1k\',\'K\',\'N\'])}},A:6(){}},2Z={O:6(a){g.16("1D://4w.2x.o/N?4x="+a.8.O.14+"&3="+V((a.8.O.3!==\'\'?a.8.O.3:a.3)),"","18=0, 1V=0, G=30, D=23")},C:6(a){g.16("T://1p.C.o/31/31.3d?u="+V((a.8.C.3!==\'\'?a.8.C.3:a.3))+"&t="+a.x+"","","18=0, 1V=0, G=30, D=23")},z:6(a){g.16("1D://z.o/4B/1H?x="+V(a.x)+"&3="+V((a.8.z.3!==\'\'?a.8.z.3:a.3))+(a.8.z.19!==\'\'?\'&19=\'+a.8.z.19:\'\'),"","18=0, 1V=0, G=32, D=33")},I:6(a){g.16("T://I.o/4E/4F/2z?3="+V((a.8.I.3!==\'\'?a.8.I.3:a.3))+"&13="+a.x+"&1I=w&1S=w","","18=0, 1V=0, G=32, D=33")},r:6(a){g.16(\'T://1p.r.o/4G?v=5&4H&4I=4J&3=\'+V((a.8.r.3!==\'\'?a.8.r.3:a.3))+\'&13=\'+a.x,\'r\',\'18=1N,G=1r,D=1r\')},L:6(a){g.16(\'T://1p.L.o/2b/?3=\'+V((a.8.r.3!==\'\'?a.8.r.3:a.3)),\'L\',\'18=1N,G=1r,D=1r\')},K:6(a){g.16(\'1D://1p.K.o/4M/N?3=\'+V((a.8.r.3!==\'\'?a.8.r.3:a.3))+\'&4N=&4O=w\',\'K\',\'18=1N,G=1r,D=1r\')},A:6(a){g.16(\'T://A.o/1J/1Z/U/?3=\'+V((a.8.A.3!==\'\'?a.8.A.3:a.3))+\'&1C=\'+V(a.8.A.1C)+\'&1s=\'+a.8.A.1s,\'A\',\'18=1N,G=4P,D=4Q\')}};6 R(a,b){7.p=a;7.4=$.4T(w,{},2h,b);7.4.N=b.N;7.4U=2h;7.4V=j;7.1K()};R.W.1K=6(){l c=7;9(7.4.1q!==\'\'){1n.O=7.4.1q+\'?3={3}&Q=O\';1n.L=7.4.1q+\'?3={3}&Q=L\';1n.A=7.4.1q+\'?3={3}&Q=A\'}$(7.p).4X(7.4.3i);9(B $(7.p).m(\'13\')!==\'F\'){7.4.13=$(7.p).4Y(\'m-13\')}9(B $(7.p).m(\'3\')!==\'F\'){7.4.3=$(7.p).m(\'3\')}9(B $(7.p).m(\'x\')!==\'F\'){7.4.x=$(7.p).m(\'x\')}$.1z(7.4.N,6(a,b){9(b===w){c.4.2q++}});9(c.4.3b===w){$.1z(7.4.N,6(a,b){9(b===w){50{c.35(a)}52(e){}}})}J 9(c.4.1a!==\'\'){7.4.2g(7,7.4)}J{7.20()}$(7.p).2c(6(){9($(7).X(\'.8\').37===0&&c.4.3c===w){c.20()}c.4.2c(c,c.4)},6(){c.4.39(c,c.4)});$(7.p).1P(6(){c.4.1P(c,c.4);1v E})};R.W.20=6(){l c=7;$(7.p).12(\'<n H="8"></n>\');$.1z(c.4.N,6(a,b){9(b==w){2B[a](c);9(c.4.29===w){2w[a]()}}})};R.W.35=6(c){l d=7,y=0,3=1n[c].1x(\'{3}\',V(7.4.3));9(7.4.8[c].15===w&&7.4.8[c].3!==\'\'){3=1n[c].1x(\'{3}\',7.4.8[c].3)}9(3!=\'\'&&d.4.1q!==\'\'){$.56(3,6(a){9(B a.y!=="F"){l b=a.y+\'\';b=b.1x(\'\\57\\58\',\'\');y+=2d(b,10)}J 9(a.m&&a.m.37>0&&B a.m[0].3a!=="F"){y+=2d(a.m[0].3a,10)}J 9(B a[0]!=="F"){y+=2d(a[0].5b,10)}J 9(B a[0]!=="F"){}d.4.y[c]=y;d.4.1o+=y;d.21();d.1Q()}).5e(6(){d.4.y[c]=0;d.1Q()})}J{d.21();d.4.y[c]=0;d.1Q()}};R.W.1Q=6(){l a=0;5f(e 22 7.4.y){a++}9(a===7.4.2q){7.4.2g(7,7.4)}};R.W.21=6(){l a=7.4.1o,1a=7.4.1a;9(7.4.1w===w){a=7.1w(a)}9(1a!==\'\'){1a=1a.1x(\'{1o}\',a);$(7.p).1T(1a)}J{$(7.p).1T(\'<n H="5h"><a H="y" 1b="#">\'+a+\'</a>\'+(7.4.13!==\'\'?\'<a H="N" 1b="#">\'+7.4.13+\'</a>\':\'\')+\'</n>\')}};R.W.1w=6(a){9(a>=3e){a=(a/3e).3f(2)+"M"}J 9(a>=3g){a=(a/3g).3f(1)+"k"}1v a};R.W.2P=6(a){2Z[a](7.4);9(7.4.29===w){l b={O:{11:\'5m\',S:\'+1\'},C:{11:\'C\',S:\'1M\'},z:{11:\'z\',S:\'1H\'},I:{11:\'I\',S:\'2p\'},r:{11:\'r\',S:\'2p\'},L:{11:\'L\',S:\'2p\'},K:{11:\'K\',S:\'N\'},A:{11:\'A\',S:\'1J\'}};1m.1l([\'1k\',b[a].11,b[a].S])}};R.W.5o=6(){l a=$(7.p).1T();$(7.p).1T(a.1x(7.4.1o,7.4.1o+1))};R.W.5p=6(a,b){9(a!==\'\'){7.4.3=a}9(b!==\'\'){7.4.x=b}};$.5q[j]=6(b){l c=5r;9(b===i||B b===\'5s\'){1v 7.1z(6(){9(!$.m(7,\'1W\'+j)){$.m(7,\'1W\'+j,5u R(7,b))}})}J 9(B b===\'5v\'&&b[0]!==\'5w\'&&b!==\'1K\'){1v 7.1z(6(){l a=$.m(7,\'1W\'+j);9(a 5x R&&B a[b]===\'6\'){a[b].5y(a,5z.W.5A.5B(c,1))}})}}})(5C,5D,5E);',62,351,'|||url|options||function|this|buttons|if||||||||||||var|data|div|com|element||delicious|||||true|text|count|twitter|pinterest|typeof|facebook|height|false|undefined|width|class|digg|else|linkedin|stumbleupon||share|googlePlus|script|type|Plugin|action|http|button|encodeURIComponent|prototype|find|js|layout||site|append|title|lang|urlCount|open|src|toolbar|via|template|href|javascript|createElement|parentNode|insertBefore|getElementsByTagName|async|size|FB|_trackSocial|push|_gaq|urlJson|total|www|urlCurl|550|description|line|20px|return|shorterTotal|replace|callback|each|send|font|media|https|STMBLPN|widgets|3px|tweet|related|pin|init|platform|like|no|border|click|rendererPerso|color|style|html|fb|status|plugin_|subscribe|Event|create|loadButtons|renderer|in|500|clearInterval|s1|plusone||annotation|enableTracking|counter|badge|hover|parseInt|align|sharrre|render|defaults|padding|float|twttr|faces|colorscheme|margin|cssShare|add|shareTotal|counturl|50px|fjs|cssCount|hashtags|tracking|google|gapi|submit|SCRIPT|loadButton|35px|18px|display|block|none|json|background|fff|center|1px|solid|radius|img|openPopup|su|processWidgets|IN|id|setInterval|edge|1000|tw|20url|popup|900|sharer|650|360|horizontal|getSocialJson|en|length|medium|hide|total_count|enableCounter|enableHover|php|1e6|toFixed|1e3|location|className|commentsbox_count|cursor|pointer|services|666666|XFBML|inline|parse|Tweet|normal|indent|vertical|show|baseline|apis|getElementById|bottom|5px|overflow|hidden|ajax|urls|dataType|cache|ccc|DiggThisButton|decoration|7EACEE|40679C|rel|static|small|gif|api|alt|Delicious|Add|on|nofollow|external|cdn|go|setTimeout|___gcfg|20WHERE|20link_stat|20FROM|__DBW|20click_count|20comments_fbid|root|it|Pin|It|assets|pinit|connect|googleplus|20total_count|20comment_count|tall|20like_count|20share_count|20normalized_url|remove|unlike|message|net|jsonp|events|bind|format|LinkedInShare|all|SELECT|plus|hl|fql|15px|countserv|intent|urlinfo|xfbml|tools|diggthis|save|noui|jump|close|graph|DiggCompact|cws|token|isFramed|700|300|v2|en_US|extend|_defaults|_name|button_count|addClass|attr|US|try|top|catch|feeds|93px|links|getJSON|u00c2|u00a0|right|getInfo|total_posts|story|26px|error|for|left|box|jssdk|12px|Arial|Helvetica|Google|sans|simulateClick|update|fn|arguments|object|serif|new|string|_|instanceof|apply|Array|slice|call|jQuery|window|document'.split('|'),0,{}))
;
(function ($) {
    // Use strict mode to avoid errors: https://developer.mozilla.org/en/JavaScript/Strict_mode
    "use strict";

    Drupal.behaviors.sharrre = function (context) {
        if (typeof(Drupal.settings.sharrre) !== 'undefined') {
            Drupal.sharrre.init({instances:Drupal.settings.sharrre.instances});
        }
    };

    Drupal.sharrre = (function () {
        var config = {},

            sharrreInstance = function (id, settings) {
                $('#' + id).sharrre(settings);
            },

            init = function (options) {
                // Extend config with options
                config = $.extend(config, options);

                var instances = config.instances;

                $.each(instances, function (idx) {
                    sharrreInstance(this.id, this.settings);
                });

                // Move the Fb and Twitter like counts into position above their buttons
                setTimeout(function () {
                    $('.round-counters .facebook').attr("title", $('#count-facebook').text());
                    $('.round-counters .twitter').attr("title", $('#count-twitter').text());
                }, 1500);

            };

        return {
            init:init
        }

    }());

})(jQuery);
;
