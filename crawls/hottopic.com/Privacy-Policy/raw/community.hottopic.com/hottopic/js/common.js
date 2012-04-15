// JavaScript Document

<!-- auto left menu height adjustment -->
function leftNav(){
if (document.getElementById("sidebar2") && !document.getElementById("sidebar4")){
	try{
		document.getElementById("sidebar2").style.height = document.getElementById("mainContent2").offsetHeight + "px";
	}catch(error){
		//alert(error);
	}

}
else if (document.getElementById("sidebar3")){
document.getElementById("sidebar3").style.height = document.getElementById("mainContent3").offsetHeight + "px";
}

else if (document.getElementById("sidebar4")){
document.getElementById("sidebar2").style.height = document.getElementById("mainContent4").offsetHeight + "px";
document.getElementById("sidebar4").style.height = document.getElementById("mainContent4").offsetHeight + "px";

}

	
}

// magic zoom
/* Copyright 2008 MagicToolBox.com. To use this code on your own site, visit http://magictoolbox.com */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7 g=\'C\';7 W=4b.3Z.1H();6(W.2n("1B")!=-1){g=\'1B\'}v 6(W.2n("C")!=-1){g=\'C\'}v 6(W.2n("1w")!=-1){g=\'1w\'}v 6(W.2n("40")!=-1){g=\'23\'}7 1v=1j 41();h 1l(B){l 8.42(B)};h q(2B,33){6(2B.3D){7 y=2B.3D[33];y=b(y)?y:\'L\'}v 6(16.3f){7 31=8.3Y.3f(2B,1Q);7 y=31?31[33]:1Q}l y}h 2g(e){6(e.3m){7 r=e.3m();7 21=0;7 2d=0;6(8.11&&(8.11.1p||8.11.1m)){2d=8.11.1m;21=8.11.1p}v 6(8.1c&&(8.1c.1p||8.1c.1m)){2d=8.1c.1m;21=8.1c.1p}l{\'m\':r.m+21,\'z\':r.z+2d,\'2f\':r.2f+21,\'1W\':r.1W+2d}}}h 2S(e){7 x=0;7 y=0;6(g==\'C\'){y=e.2q;x=e.2x;6(8.11&&(8.11.1p||8.11.1m)){y=e.2q+8.11.1m;x=e.2x+8.11.1p}v 6(8.1c&&(8.1c.1p||8.1c.1m)){y=e.2q+8.1c.1m;x=e.2x+8.1c.1p}}v{y=e.2q;x=e.2x;y+=16.3X;x+=16.3T}l{\'x\':x,\'y\':y}}h 2J(){l D};7 32=h(){7 1a=1J;6(!1a[1])1a=[4,1a[0]];1h(7 2X 3S 1a[1])1a[0][2X]=1a[1][2X];l 1a[0]};h 1d(1L,S,1O){6(g==\'23\'||g==\'1B\'||g==\'1w\'){3q{1L.3U(S,1O,D)}3I(e){3V("J 3W: "+e+", S="+S)}}v 6(g==\'C\'){1L.43("2K"+S,1O)}};h 3n(1L,S,1O){6(g==\'23\'||g==\'1B\'||g==\'1w\'){1L.44(S,1O,D)}v 6(g==\'C\'){1L.3R("2K"+S,1O)}};h 3K(){7 1M=[];1h(7 i=0;i<1J.1k;i++)1h(7 j=0;j<1J[i].1k;j++)1M.2L(1J[i][j]);l 1M};h 3G(2R,3h){1M=[];1h(7 i=3h;i<2R.1k;i++)1M.2L(2R[i]);l 1M};h 1f(2T,3F){7 1a=3G(1J,2);l h(){2T[3F].4c(2T,3K(1J,1a))}};h 1E(e){6(g==\'23\'||g==\'1w\'||g==\'1B\'){e.3d=N;e.4d();e.4e()}v 6(g==\'C\'){16.S.3d=N}};h J(3c,39,3a,3b,k){4.2j=D;4.E=1l(3c);4.c=1l(39);4.a=1l(3a);4.n=1l(3b);4.t=0;4.k=k;6(!4.k["1G"]){4.k["1G"]=""}4.1z=0;4.1r=0;4.R=0;4.Q=0;4.X=20;4.4a=20;4.1q=0;4.1n=0;4.2D=\'\';4.G=1Q;6(4.k["1V"]!=\'\'){4.G=8.17(\'25\');4.G.5.o=\'1C\';4.G.5.1i=\'1x\';4.G.1U=\'3J\';4.G.5.2s=\'2t\';4.G.5.49=\'45\';4.G.36=4.k["1R"]+\'<46/><T 47="0" 2V="\'+4.k["1R"]+\'" 1g="\'+4.k["1V"]+\'"/>\';4.E.18(4.G)}4.48=\'\';4.2m=D;1v.2L(4);4.2F=1f(4,"2A")};J.13.3H=h(){3n(16.8,"2a",4.2F);6(4.k["o"]=="1D"){1l(4.E.B+"-3A").30(4.a)}};J.13.2A=h(e){7 r=2S(e);7 x=r[\'x\'];7 y=r[\'y\'];7 Z=0;7 Y=0;7 O=4.c;22(O&&O.1I!="3B"&&O.1I!="3C"){Z+=O.3y;Y+=O.3x;O=O.3w}6(g==\'C\'){7 r=2g(4.c);Y=r[\'m\'];Z=r[\'z\']}Y+=b(q(4.c,\'26\'));Z+=b(q(4.c,\'35\'));6(g!=\'C\'||!(8.1e&&\'2e\'==8.1e.1H())){Y+=b(q(4.c,\'2b\'));Z+=b(q(4.c,\'2l\'))}6(x>b(Y+4.R)){4.2c();l D}6(x<b(Y)){4.2c();l D}6(y>b(Z+4.Q)){4.2c();l D}6(y<b(Z)){4.2c();l D}6(g==\'C\'){4.E.5.1T=1}l N};J.13.2C=h(e){1E(e);4.E.5.2Y=\'3r\'};J.13.2U=h(e){1E(e);4.E.5.2Y=\'4f\'};J.13.2a=h(e){1E(e);1h(i=0;i<1v.1k;i++){6(1v[i]!=4){1v[i].2A(e)}}6(4.k&&4.k["1F"]==N){6(4.E.5.2Y!=\'3r\'){l}}6(4.2j){l}6(!4.2A(e)){l}4.2j=N;7 2v=4.c;7 Y=0;7 Z=0;6(g==\'23\'||g==\'1B\'||g==\'1w\'){7 O=2v;22(O.1I!="3B"&&O.1I!="3C"){Z+=O.3y;Y+=O.3x;O=O.3w}}v{7 r=2g(4.c);Y=r[\'m\'];Z=r[\'z\']}Y+=b(q(4.c,\'26\'));Z+=b(q(4.c,\'35\'));6(g!=\'C\'||!(8.1e&&\'2e\'==8.1e.1H())){Y+=b(q(4.c,\'2b\'));Z+=b(q(4.c,\'2l\'))}7 r=2S(e);7 x=r[\'x\'];7 y=r[\'y\'];4.1q=x-Y;4.1n=y-Z;6((4.1q+4.X/2)>=4.R){4.1q=4.R-4.X/2}6((4.1n+4.V/2)>=4.Q){4.1n=4.Q-4.V/2}6((4.1q-4.X/2)<=0){4.1q=4.X/2}6((4.1n-4.V/2)<=0){4.1n=4.V/2}2P(1f(4,"38"),10)};J.13.38=h(){7 1Z=4.1q-4.X/2;7 27=4.1n-4.V/2;7 2w=1Z*(4.1z/4.R);7 2i=27*(4.1r/4.Q);1Z+=b(q(4.c,\'26\'));27+=b(q(4.c,\'35\'));6(g!=\'C\'||!(8.1e&&\'2e\'==8.1e.1H())){1Z+=b(q(4.c,\'2b\'));27+=b(q(4.c,\'2l\'))}4.t.5.m=1Z+\'H\';4.t.5.z=27+\'H\';4.t.5.1i="2z";6((4.1z-2w)<b(4.a.5.K)){2w=4.1z-b(4.a.5.K)}6((4.1r-2i)<b(4.a.5.I)){2i=4.1r-b(4.a.5.I)}4.n.5.m=(-2w)+\'H\';4.n.5.z=(-2i)+\'H\';4.a.5.m=4.2D;4.a.5.2s=\'2t\';4.a.5.1i=\'2z\';4.n.5.2s=\'2t\';4.n.5.1i=\'2z\';4.2j=D};h 4S(2O){7 2N="";1h(i=0;i<2O.1k;i++){2N+=4R.4T(14^2O.4U(i))}l 2N};J.13.2c=h(){6(4.k&&4.k["28"]==N)l;6(4.t){4.t.5.1i="1x"}4.a.5.m=\'-1Y\';6(g==\'C\'){4.E.5.1T=0}};J.13.2G=h(){4.X=b(4.a.5.K)/(4.1z/4.R);6(4.k&&4.k["1G"]!=""){4.V=(b(4.a.5.I)-19)/(4.1r/4.Q)}v{4.V=b(4.a.5.I)/(4.1r/4.Q)}6(4.X>4.R){4.X=4.R}6(4.V>4.Q){4.V=4.Q}4.X=2r.34(4.X);4.V=2r.34(4.V);6(!(8.1e&&\'2e\'==8.1e.1H())){7 2I=b(q(4.t,\'26\'));4.t.5.K=(4.X-2*2I)+\'H\';4.t.5.I=(4.V-2*2I)+\'H\'}v{4.t.5.K=4.X+\'H\';4.t.5.I=4.V+\'H\'}};J.13.3j=h(){4.t=8.17("25");4.t.1U=\'4V\';4.t.5.1T=10;4.t.5.1i=\'1x\';4.t.5.o=\'1C\';4.t.5["U"]=2M(4.k[\'U\']/1S.0);4.t.5["-4Q-U"]=2M(4.k[\'U\']/1S.0);4.t.5["-4P-U"]=2M(4.k[\'U\']/1S.0);4.t.5["3i"]="4K(4J="+4.k[\'U\']+")";4.E.18(4.t);4.2G();4.E.4L="2K";4.E.5.4X="3l";4.E.4M=2J;4.E.4O=2J};J.13.3t=h(){7 3e=4.n.1g;22(4.a.1A){4.a.30(4.a.1A)}6(g==\'C\'){7 f=8.17("4N");f.5.m=\'L\';f.5.z=\'L\';f.5.o=\'1C\';f.5.3i=\'4W:4Y.53.51(5=0,U=0)\';f.5.K=4.a.5.K;f.5.I=4.a.5.I;f.52=0;4.a.18(f)}6(4.k&&4.k["1G"]!=""){7 f=8.17("25");f.1U=\'2h\';f.B=\'2h\'+4.a.B;f.5.o=\'1X\';f.5.1T=10;f.5.m=\'L\';f.5.z=\'L\';f.5.2Q=\'4Z\';f.36=4.k["1G"];4.a.18(f)}7 2p=8.17("25");2p.5.3o="1x";4.a.18(2p);4.n=8.17("1o");4.n.1g=3e;4.n.5.o=\'1X\';4.n.5.3L=\'L\';4.n.5.2Q=\'L\';2p.18(4.n)};J.13.1P=h(){6(4.G!=1Q&&!4.n.2H&&4.c.K!=0&&4.c.I!=0){4.G.5.m=(b(4.c.K)/2-b(4.G.4H)/2)+\'H\';4.G.5.z=(b(4.c.I)/2-b(4.G.4p)/2)+\'H\';4.G.5.1i=\'2z\'}6(g==\'1w\'){6(!4.2m){1d(4.n,"3O",1f(4,"1P"));4.2m=N;l}}v{6(!4.n.2H||!4.c.2H){2P(1f(4,"1P"),1S);l}}4.n.5.3L=\'L\';4.n.5.2Q=\'L\';4.1z=4.n.K;4.1r=4.n.I;4.R=4.c.K;4.Q=4.c.I;6(4.1z==0||4.1r==0||4.R==0||4.Q==0){2P(1f(4,"1P"),1S);l}6(g==\'1B\'||(g==\'C\'&&!(8.1e&&\'2e\'==8.1e.1H()))){4.R-=b(q(4.c,\'2b\'));4.R-=b(q(4.c,\'3Q\'));4.Q-=b(q(4.c,\'2l\'));4.Q-=b(q(4.c,\'4o\'))}6(4.G!=1Q)4.G.5.1i=\'1x\';4.E.5.K=4.c.K+\'H\';7 r=2g(4.c);6(!r){4.a.5.m=4.R+b(q(4.c,\'26\'))+b(q(4.c,\'4g\'))+b(q(4.c,\'2b\'))+b(q(4.c,\'3Q\'))+15+\'H\'}v{4.a.5.m=(r[\'2f\']-r[\'m\']+15)+\'H\'}4.a.5.z=\'L\';3z(4.k[\'o\']){1b\'m\':4.a.5.m=\'-\'+(15+b(4.a.5.K))+\'H\';12;1b\'1W\':6(r){4.a.5.z=r[\'1W\']-r[\'z\']+15+\'H\'}v{4.a.5.z=4.c.I+15+\'H\'}4.a.5.m=\'L\';12;1b\'z\':4.a.5.z=\'-\'+(15+b(4.a.5.I))+\'H\';4.a.5.m=\'L\';12;1b\'1D\':4.a.5.m=\'L\';4.a.5.z=\'L\';12;1b\'2E\':4.a.5.m=\'L\';4.a.5.z=\'L\';12}4.2D=4.a.5.m;6(4.t){4.2G();l}4.3t();4.3j();1d(16.8,"2a",4.2F);1d(4.E,"2a",1f(4,"2a"));6(4.k&&4.k["1F"]==N){1d(4.E,"2C",1f(4,"2C"));1d(4.E,"2U",1f(4,"2U"));4.1q=4.R/2;4.1n=4.Q/2;4.38()}};J.13.2Z=h(e,1K){6(1K.2o==4.n.1g)l;7 29=8.17("1o");29.B=4.n.B;29.1g=1K.2o;7 p=4.n.4r;p.4s(29,4.n);4.n=29;4.n.5.o=\'1X\';4.c.1g=1K.3N;6(1K.37!=\'\'&&1l(\'2h\'+4.a.B)){1l(\'2h\'+4.a.B).36=1K.37}4.2m=D;4.1P()};h 3E(B,F){7 9=16.8.2W("A");1h(7 i=0;i<9.1k;i++){6(9[i].1s==B){1d(9[i],"2y",h(S){6(g!=\'C\'){4.3P()}v{16.3u()}1E(S);l D});1d(9[i],F.k[\'24\'],1f(F,"2Z",9[i]));9[i].5.3p=\'0\';9[i].2u=32;9[i].2u({F:F,4n:h(){4.F.2Z(1Q,4)}});7 T=8.17("1o");T.1g=9[i].2o;T.5.o=\'1C\';T.5.m=\'-1Y\';T.5.z=\'-1Y\';8.11.18(T);T=8.17("1o");T.1g=9[i].3N;T.5.o=\'1C\';T.5.m=\'-1Y\';T.5.z=\'-1Y\';8.11.18(T)}}};h 4m(){22(1v.1k>0){7 F=1v.4i();F.3H()}};h 3k(){7 1R=\'4h 4j\';7 1V=\'\';7 1N=16.8.2W("1o");1h(7 i=0;i<1N.1k;i++){6(/3J/.3g(1N[i].1U)){6(1N[i].2V!=\'\')1R=1N[i].2V;1V=1N[i].1g;12}}7 9=16.8.2W("A");1h(7 i=0;i<9.1k;i++){6(/J/.3g(9[i].1U)){22(9[i].1A){6(9[i].1A.1I!=\'1o\'){9[i].30(9[i].1A)}v{12}}6(9[i].1A.1I!=\'1o\')4k"4l J 4t!";7 1u=2r.34(2r.4u()*4D);9[i].5.o="1X";9[i].5.2s=\'2t\';9[i].5.3p=\'0\';9[i].5.4C=\'3l\';1d(9[i],"2y",h(S){6(g!=\'C\'){4.3P()}v{16.3u()}1E(S);l D});6(9[i].B==\'\'){9[i].B="4E"+1u}6(g==\'C\'){9[i].5.1T=0}7 2v=9[i].1A;2v.B="3M"+1u;7 M=8.17("25");M.B="4F"+1u;P=1j 1t(/U(\\s+)?:(\\s+)?(\\d+)/i);u=P.1y(9[i].1s);7 U=50;6(u){U=b(u[3])}P=1j 1t(/4G\\-4B(\\s+)?:(\\s+)?(2y|4A)/i);u=P.1y(9[i].1s);7 24=\'2y\';6(u){24=u[3]}P=1j 1t(/F\\-K(\\s+)?:(\\s+)?(\\w+)/i);u=P.1y(9[i].1s);M.5.K=\'3v\';6(u){M.5.K=u[3]}P=1j 1t(/F\\-I(\\s+)?:(\\s+)?(\\w+)/i);u=P.1y(9[i].1s);M.5.I=\'3v\';6(u){M.5.I=u[3]}P=1j 1t(/F\\-o(\\s+)?:(\\s+)?(\\w+)/i);u=P.1y(9[i].1s);7 o=\'2f\';6(u){3z(u[3]){1b\'m\':o=\'m\';12;1b\'1W\':o=\'1W\';12;1b\'z\':o=\'z\';12;1b\'1D\':o=\'1D\';12;1b\'2E\':o=\'2E\';12}}P=1j 1t(/4w\\-4v(\\s+)?:(\\s+)?(N|D)/i);u=P.1y(9[i].1s);7 1F=D;6(u){6(u[3]==\'N\')1F=N}P=1j 1t(/4x\\-4y\\-F(\\s+)?:(\\s+)?(N|D)/i);u=P.1y(9[i].1s);7 28=D;6(u){6(u[3]==\'N\')28=N}M.5.3o=\'1x\';M.1U="4z";M.5.1T=1S;M.5.1i=\'1x\';6(o!=\'1D\'){M.5.o=\'1C\'}v{M.5.o=\'1X\'}7 2k=8.17("1o");2k.B="3s"+1u;2k.1g=9[i].2o;M.18(2k);6(o!=\'1D\'){9[i].18(M)}v{1l(9[i].B+\'-3A\').18(M)}7 k={28:28,1F:1F,1G:9[i].37,U:U,24:24,o:o,1R:1R,1V:1V};7 F=1j J(9[i].B,\'3M\'+1u,M.B,\'3s\'+1u,k);9[i].2u=32;9[i].2u({F:F});F.1P();3E(9[i].B,F)}}};6(g==\'C\')3q{8.4I("4q",D,N)}3I(e){};1d(16,"3O",3k);',62,314,'||||this|style|if|var|document|aels|bigImageCont|parseInt|smallImage||||MagicZoom_ua|function|||settings|return|left|bigImage|position||MagicZoom_getStyle|||pup|matches|else||||top||id|msie|false|smallImageCont|zoom|loadingCont|px|height|MagicZoom|width|0px|bigCont|true|tag|re|smallImageSizeY|smallImageSizeX|event|img|opacity|popupSizeY||popupSizeX|smallX|smallY||body|break|prototype|||window|createElement|appendChild||args|case|documentElement|MagicZoom_addEventListener|compatMode|MagicZoom_createMethodReference|src|for|visibility|new|length|_el|scrollTop|positionY|IMG|scrollLeft|positionX|bigImageSizeY|rel|RegExp|rand|MagicZoom_zooms|safari|hidden|exec|bigImageSizeX|firstChild|opera|absolute|custom|MagicZoom_stopEventPropagation|drag_mode|header|toLowerCase|tagName|arguments|ael|obj|result|iels|listener|initZoom|null|loadingText|100|zIndex|className|loadingImg|bottom|relative|10000px|pleft||wx|while|gecko|thumb_change|DIV|borderLeftWidth|ptop|bigImage_always_visible|newBigImage|mousemove|paddingLeft|hiderect|wy|backcompat|right|MagicZoom_getBounds|MagicZoomHeader|perY|recalculating|bigImg|paddingTop|safariOnLoadStarted|indexOf|href|ar1|clientY|Math|display|block|mzextend|smallImg|perX|clientX|click|visible|checkcoords|el|mousedown|bigImageContStyleLeft|inner|checkcoords_ref|recalculatePopupDimensions|complete|bw|MagicView_ia|on|push|parseFloat|vc68|vc67|setTimeout|padding|sequence|MagicZoom_getEventBounds|object|mouseup|alt|getElementsByTagName|property|cursor|replaceZoom|removeChild|css|MagicZoom_extendElement|styleProp|round|borderTopWidth|innerHTML|title|showrect|smallImageId|bigImageContId|bigImageId|smallImageContId|cancelBubble|bigimgsrc|getComputedStyle|test|skip|filter|initPopup|MagicZoom_findZooms|none|getBoundingClientRect|MagicZoom_removeEventListener|overflow|outline|try|move|bim|initBigContainer|focus|300px|offsetParent|offsetLeft|offsetTop|switch|big|BODY|HTML|currentStyle|MagicZoom_findSelectors|methodName|MagicZoom_withoutFirst|stopZoom|catch|MagicZoomLoading|MagicZoom_concat|borderWidth|sim|rev|load|blur|paddingRight|detachEvent|in|pageXOffset|addEventListener|alert|error|pageYOffset|defaultView|userAgent|mozilla|Array|getElementById|attachEvent|removeEventListener|center|br|border|baseuri|textAlign|popupSizey|navigator|apply|preventDefault|stopPropagation|default|borderRightWidth|Loading|pop|Zoom|throw|Invalid|MagicZoom_stopZooms|selectThisZoom|paddingBottom|offsetHeight|BackgroundImageCache|parentNode|replaceChild|invocation|random|mode|drag|always|show|MagicZoomBigImageCont|mouseover|change|textDecoration|1000000|sc|bc|thumb|offsetWidth|execCommand|Opacity|alpha|unselectable|onselectstart|IFRAME|oncontextmenu|html|moz|String|xgdf7fsgd56|fromCharCode|charCodeAt|MagicZoomPup|progid|MozUserSelect|DXImageTransform|3px||Alpha|frameBorder|Microsoft'.split('|'),0,{}))

//end of magic zoom


// generic show hide
function hide(element){
if(document.getElementById(element)){
document.getElementById(element).style.visibility="hidden";
}
}
function show(element){
if(document.getElementById(element)){
document.getElementById(element).style.visibility="visible";
}
}

// image gallery script
function LoadGallery(pictureName,imageFile,titleCaption,captionText)
{
  if (document.all)
  {
    document.getElementById(pictureName).style.filter="blendTrans(duration=1)";
    document.getElementById(pictureName).filters.blendTrans.Apply();
  }
  document.getElementById(pictureName).src = imageFile;
  if (document.all)
  {
    document.getElementById(pictureName).filters.blendTrans.Play();
  }
  document.getElementById(titleCaption).innerHTML=captionText;
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function goSearch() {	// local clientside javascript
	var	sstr = "";
	sstr = document.frm_ht_search.searchFor.value;
	//sstr = sstr.toUpperCase();
	var	len = sstr.length;
	var	strOut = "";
	var	i = 0;
	//var	len = sstr.split(" ");
	var	j = 0;
	while (i < len) {
		j = sstr.indexOf(" ",i);
		if (j > i) {
			strOut += sstr.substring(i,j)+"+";
			i = j+1;
		} else {
			strOut += sstr.substring(i,len);
			i = len;
		}
	}
   if (strOut == '')
	window.location = 'http://search.hottopic.com/';
   else
	window.location = 'http://search.hottopic.com/search?p=Q&ts=custom&lbc=hottopic&w=' + strOut;
}


function addVideo(videoUrl,width,height){
var code ='<object type="application/x-shockwave-flash" width="'+width+'" height="'+height+'" id="vplayer" data="http://community.hottopic.com/hottopic/flash/videoplayer.swf">'+
'<param name="flashVars" value="&v='+videoUrl+'"/>'+
'<param name="movie" value="http://community.hottopic.com/hottopic/flash/videoplayer.swf" />'+
'<param name="quality" value="best" /> '+
'</object>';
document.write(code);
}



function addNewVideo(videoPath,splashFrame,autoStart){
var videoPlayerContent='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="320" height="300" id="video-player" align="middle">'+
	'<param name="allowScriptAccess" value="always" />'+
	'<param name="allowFullScreen" value="true" />'+
	'<param name="movie" value="http://community.hottopic.com/flash/video-player.swf?videoPath='+videoPath+'&seekValue='+splashFrame+'&autoStart='+autoStart+'" />'+
    '<param name="quality" value="high" />'+
    '<param name="bgcolor" value="#ffffff" />'+
    '<embed src="http://community.hottopic.com/flash/video-player.swf?videoPath='+videoPath+'&seekValue='+splashFrame+'&autoStart='+autoStart+'" quality="high" bgcolor="#ffffff" width="320" height="300" name="video-player" align="middle" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'+
	'</object>';
	document.write(videoPlayerContent);
}




var currentLocation2 = window.location.toString();

if(currentLocation2.indexOf("search.hottopic.com")>0){
	
	
	
	
	
	


var browser=navigator.appName;

var tempCss = "font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; font-weight:bold; margin:1px 0px 0 0; line-height:20px; height:20px; width:400px; text-align:left; position:absolute; top:-7px; left:400px; float:left; padding-left:0px;";

if (browser=="Microsoft Internet Explorer"){
	tempCss = "font-family:Arial, Helvetica, sans-serif; font-size:12px; text-transform:uppercase; font-weight:bold; margin:1px 0px 0 0; line-height:20px; height:20px; width:400px; text-align:left; position:absolute; top:-7px; left:400px; float:left; padding-left:400px;";

  }






	
	
	
var sliStyle = ''+
'<style>'+
'#header-nav {float:right;margin:0px;padding:0px;}'+
'#header-nav ul {height: 18px;margin:0px;padding:0px;list-style-type:none;}'+
'#header-nav li {height: 18px;list-style-type:none;font-family:Arial, Helvetica, sans-serif;font-size:10px;float:left;padding:0 1px 0 1px;}'+
'#header-nav li a {text-decoration:none;color:white;background-color:black;padding:2px 4px 2px 3px;height:18px;}'+
'#header-nav li a:hover  {color:#ffa500;}'+

'#LogIn_pos {'+tempCss+'}'+

'#Want_rewards2 {font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;height:15px; left:0px; line-height:20px; margin:3px 0 0 0; position:;text-align:left;top:8px;width:400px;}'+
'#LogOut_btn{color:red; text-decoration:none;}'+






'</style>';
document.write(sliStyle);


}
