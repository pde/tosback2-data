// JavaScript File - Bass Pro Shops - Home & Departments //
document.write("<link href='//media.basspro.com/scripts/css/mockup.css' rel='stylesheet' type='te"+"xt/css' />");
//JCycle Settings

document.write("<script type='text/javascript' src='//media.basspro.com/scripts/jquery.min.js'></scr"+"ipt>");
//document.write("<script type='text/javascript' src='//media.basspro.com/2012/fathersday-shipping-6690/scripts/jquery-1.6.3.min.js'></scr"+"ipt>");

document.write("<script type='text/javascript' src='//media.basspro.com/scripts/jquery.cycle.all.js'></scr"+"ipt>");

//document.write("<link rel='stylesheet' type='text/css' href='//media.basspro.com/scripts/css/sd.css'>");

// For temporary changes between the rsync and the stage prop....WINNING!  >.<
// document.write("<link rel='stylesheet' type='text/css' href='//media.basspro.com/scripts/css/sd-temp.css'>");

// document.write("<link rel='stylesheet' type='text/css' href='//media.basspro.com/scripts/css/ss.css'>");

// document.write("<link rel='stylesheet' type='text/css' href='//media.basspro.com/scripts/css/styles.css'>");

//document.write("<script type='text/javascript' src='//media.basspro.com/scripts/santa-timeout-bg.js'></scr"+"ipt>");
//document.write("<script type='text/javascript' src='//media.basspro.com/scripts/sky.js'></scr"+"ipt>");

//added 02/14/12 to prevent Bass Pro Inception site inside itself in iframe
/*
function bustout() {
	if (top.location != location) {
	top.location.href = document.location.href ;
	}
}		
*/

$(document).ready(function(){ 
	$(function() {
		
		
		//added 10/11/11 - ssauer - reorder LI and DIV z-index for IE7 fix
		var zIndexNumber = 1000;
		$('li').each(function() {
			$(this).css('zIndex', zIndexNumber);
			zIndexNumber -= 2;
		});
		
		
		$('#slideshow_698_test').cycle({
			fx:      'fade',
			pause: 1,
			speed: 500,
			easeIn: null,
			easeOut: null,
			timeout:  5000,        
			prev:    '#prev_698',
			next:    '#next_698',
			pager:   '#nav_words_698',
			// callback fn that creates a thumbnail to use as pager anchor 
			pagerAnchorBuilder: function(idx, slide) {
				var img = jQuery(slide).find("img").attr("alt");
				return '<li><a href="#">' + img + '</a></li>';
			} 
		});
		
		$('#slideshow').cycle({
			fx:      'fade',
			pause: 1,
			speed: 500,
			easeIn: null,
			easeOut: null,
			timeout:  5000,        
			prev:    '#prev',
			next:    '#next',
			pager:   '#nav-words',
			// callback fn that creates a thumbnail to use as pager anchor 
			pagerAnchorBuilder: function(idx, slide) {
				var img = jQuery(slide).find("img").attr("alt");
				return '<li><a href="#">' + img + '</a></li>';
			} 
		});
			

		$('#slideshow_dept_qa').cycle({
			fx:      'fade',
			pause: 1,
			speed: 500,
			easeIn: null,
			easeOut: null,
			timeout:  5000,  
			pager:   '#nav_words_dept_qa',
			// callback fn that creates a thumbnail to use as pager anchor 
			pagerAnchorBuilder: function(idx, slide) {
				var img = jQuery(slide).find("img").attr("alt");
				return '<li><a href="#">' + img + '</a></li>';
			} 
		});
		
	
		function pagerFactory(idx, slide) {
			var s = idx > 50 ? ' style="display:none"' : '';
			return '<li'+s+'><a href="#">'+(idx+1)+'</a></li>';
		};
		
		
	});

});




/*  WebFontConfig = {
    google: { families: [ 'Hammersmith+One:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })(); */


// Added 9/13/2011 by Greg Landers

var domain = document.domain.toString();
if(domain.indexOf("basspro.com")>-1) Shadowbox.init();

//Added 10/17/2011 by Greg Landers - this JS was included in the old site and there is a lot of content out there making reference to the createNewWindow function

eval(function(m,c,h){function z(i){return(i< 62?'':z(parseInt(i/62)))+((i=i%62)>35?String.fromCharCode(i+29):i.toString(36))}for(var i=0;i< m.length;i++)h[z(i)]=m[i];function d(w){return h[w]?h[w]:w;};return c.replace(/\b\w+\b/g,d);}('|||function|createNewWindow|var|525|50|toolbar|location||directories||status||menubar||scrollbars||resizable||copyhistory|||width|height|top|left|window|open|popup|customWindow|if|else|varN|http|||||||||||||||||www|||basspro||com||servlet||catalog|OnlineShopping|varP|400|varS|varU|varW|varY|vara|varc|vare|varg|vari|100|vark|focus|document|cookie|cookies|true|getCookie|indexOf|return|null|length|unescape|substring|QueryString|for|keys|values|break|new|Array|QueryString_parse|search|split|hvarAID|bpsAID|escape|MM_preloadImages|images|MM_p|arguments|Image|src'.split('|'),'3 4(A){5 B=0;5 C=0;5 D=0;5 E=0;5 F=0;5 G=1;5 H=1;5 I=0;5 J=6;5 K=6;5 L=7;5 M=7;5 N="8="+B+",9="+C+",b="+D+",d="+E+",f="+F+",h="+G+",j="+H+",l="+I+",o="+J+",p="+K+",q="+L+",r="+M;5 O=s.t(A,"u",N);}3 v(N,R,P,i,k,e,U,c,S,a,g,Y,W){w(N)5 N=N;x y="z://Q.T.V/X/Z.10";w(P)5 P=P;x 11=12;w(R)5 R=R;x R=12;w(S)5 S=S;x 13=0;w(U)5 U=U;x 14=0;w(W)5 W=W;x 15=0;w(Y)5 Y=Y;x 16=0;w(a)5 a=a;x 17=0;w(c)5 c=c;x 18=0;w(e)5 e=e;x 19=0;w(g)5 g=g;x 1a=0;w(i)5 i=i;x 1b=1c;w(k)5 k=k;x 1d=1c;5 m="8="+S+",9="+U+",b="+W+",d="+a+",f="+c+",h="+e+",j="+g+",l="+Y+",o="+P+",p="+R+",q="+i+",r="+k;5 n=s.t(N,"u",m);w(s.1e){n.1e()}}1f.1g="1h=1i";5 1g=(1f.1g)?"1":"0";3 1j(A){5 B=1f.1g;5 C=A+"=";5 D=B.1k("; "+C);w(D==-1){D=B.1k(C);w(D!=0)1l 1m;}x D+=2;5 E=1f.1g.1k(";",D);w(E==-1)E=B.1n;1l 1o(B.1p(D+C.1n,E));}3 1q(A){5 B=("");1r(5 C=0;C<1q.1s.1n;C++){w(1q.1s[C]==A){B=1q.1t[C];1u;}}1l B;}1q.1s=1v 1w();1q.1t=1v 1w();3 1x(){5 A=s.9.1y.1p(1);5 B=A.1z("&");1r(5 C=0;C<B.1n;C++){5 D=B[C].1k(\'=\');w(D>=0){5 E=B[C].1p(0,D);5 F=B[C].1p(D+1);1q.1s[1q.1s.1n]=E;1q.1t[1q.1t.1n]=F;}}}1x();w(1q("1A")){1f.1g="1B="+1C(1q("1A"));}3 1D(){5 A=1f;w(A.1E){w(!A.1F)A.1F=1v 1w();5 B,C=A.1F.1n,a=1D.1G;1r(B=0;B<a.1n;B++)w(a[B].1k("#")!=0){A.1F[C]=1v 1H;A.1F[C++].1I=a[B];}}}',{}))

