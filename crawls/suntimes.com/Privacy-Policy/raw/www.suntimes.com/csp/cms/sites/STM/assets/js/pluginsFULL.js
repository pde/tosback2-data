
(function(c){function p(e,b,a){var d=this,l=e.add(this),h=e.find(a.tabs),i=b.jquery?b:e.children(b),j;h.length||(h=e.children());i.length||(i=e.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return d.click(n,g);if(f>n)return d.click(0,g)}if(!k.length){if(j>=0)return d;f=a.initialIndex;k=h.eq(f)}if(f===j)return d;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(d,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return d}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return d.click(j+1)},prev:function(){return d.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return d}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(d).bind(g,a[g]);d[g]=function(k){c(d).bind(g,k);return d}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){d.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){d.click(c(this).attr("href"),f)});if(location.hash)d.click(location.hash);else if(a.initialIndex===
0||a.initialIndex>0)d.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.3"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(e,b){o[e]=b}};var o={"default":function(e,b){this.getPanes().hide().eq(e).show();b.call()},fade:function(e,b){var a=this.getConf(),d=a.fadeOutSpeed,l=this.getPanes();d?l.fadeOut(d):l.hide();l.eq(e).fadeIn(a.fadeInSpeed,b)},slide:function(e,b){this.getPanes().slideUp(200);
this.getPanes().eq(e).slideDown(400,b)},ajax:function(e,b){this.getPanes().eq(0).load(this.getTabs().eq(e).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(e,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(e).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(e,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b={onBeforeClick:b};b=c.extend({},
c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),e,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);
(function(e){function n(f,c){var a=e(c);return a.length<2?a:f.parent().find(c)}function t(f,c){var a=this,l=f.add(a),g=f.children(),k=0,m=c.vertical;j||(j=a);if(g.length>1)g=e(c.items,f);e.extend(a,{getConf:function(){return c},getIndex:function(){return k},getSize:function(){return a.getItems().size()},getNaviButtons:function(){return o.add(p)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(b,d){return a.seekTo(k+
b,d)},next:function(b){return a.move(1,b)},prev:function(b){return a.move(-1,b)},begin:function(b){return a.seekTo(0,b)},end:function(b){return a.seekTo(a.getSize()-1,b)},focus:function(){return j=a},addItem:function(b){b=e(b);if(c.circular){e(".cloned:last").before(b);e(".cloned:first").replaceWith(b.clone().addClass(c.clonedClass))}else g.append(b);l.trigger("onAddItem",[b]);return a},seekTo:function(b,d,h){if(c.circular&&b===0&&k==-1&&d!==0)return a;if(!c.circular&&b<0||b>a.getSize()||b<-1)return a;
var i=b;if(b.jquery)b=a.getItems().index(b);else i=a.getItems().eq(b);var q=e.Event("onBeforeSeek");if(!h){l.trigger(q,[b,d]);if(q.isDefaultPrevented()||!i.length)return a}i=m?{top:-i.position().top}:{left:-i.position().left};k=b;j=a;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){l.trigger("onSeek",[b])});return a}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(b,d){e.isFunction(c[d])&&e(a).bind(d,c[d]);a[d]=function(h){e(a).bind(d,h);return a}});if(c.circular){var r=a.getItems().slice(-1).clone().prependTo(g),
s=a.getItems().eq(1).clone().appendTo(g);r.add(s).addClass(c.clonedClass);a.onBeforeSeek(function(b,d,h){if(!b.isDefaultPrevented())if(d==-1){a.seekTo(r,h,function(){a.end(0)});return b.preventDefault()}else d==a.getSize()&&a.seekTo(s,h,function(){a.begin(0)})});a.seekTo(0,0)}var o=n(f,c.prev).click(function(){a.prev()}),p=n(f,c.next).click(function(){a.next()});!c.circular&&a.getSize()>1&&a.onBeforeSeek(function(b,d){setTimeout(function(){if(!b.isDefaultPrevented()){o.toggleClass(c.disabledClass,
d<=0);p.toggleClass(c.disabledClass,d>=a.getSize()-1)}},1)});c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(b,d){if(c.mousewheel){a.move(d<0?1:-1,c.wheelSpeed||50);return false}});c.keyboard&&e(document).bind("keydown.scrollable",function(b){if(!(!c.keyboard||b.altKey||b.ctrlKey||e(b.target).is(":input")))if(!(c.keyboard!="static"&&j!=a)){var d=b.keyCode;if(m&&(d==38||d==40)){a.move(d==38?-1:1);return b.preventDefault()}if(!m&&(d==37||d==39)){a.move(d==37?-1:1);return b.preventDefault()}}});
e(a).trigger("onBeforeSeek",[c.initialIndex])}e.tools=e.tools||{version:"1.2.3"};e.tools.scrollable={conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,wheelSpeed:0}};var j;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},e.tools.scrollable.conf,f);this.each(function(){c=new t(e(this),f);e(this).data("scrollable",
c)});return f.api?c:this}})(jQuery);
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);
(function($){jQuery.fn.pngFix=function(settings){settings=jQuery.extend({blankgif:'blank.gif'},settings);var ie55=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 5.5")!=-1);var ie6=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 6.0")!=-1);if(jQuery.browser.msie&&(ie55||ie6)){jQuery(this).find("img[@src$=.png]").each(function(){jQuery(this).attr('width',jQuery(this).width());jQuery(this).attr('height',jQuery(this).height());var prevStyle='';var strNewHTML='';var imgId=(jQuery(this).attr('id'))?'id="'+jQuery(this).attr('id')+'" ':'';var imgClass=(jQuery(this).attr('class'))?'class="'+jQuery(this).attr('class')+'" ':'';var imgTitle=(jQuery(this).attr('title'))?'title="'+jQuery(this).attr('title')+'" ':'';var imgAlt=(jQuery(this).attr('alt'))?'alt="'+jQuery(this).attr('alt')+'" ':'';var imgAlign=(jQuery(this).attr('align'))?'float:'+jQuery(this).attr('align')+';':'';var imgHand=(jQuery(this).parent().attr('href'))?'cursor:hand;':'';if(this.style.border){prevStyle+='border:'+this.style.border+';';this.style.border=''}if(this.style.padding){prevStyle+='padding:'+this.style.padding+';';this.style.padding=''}if(this.style.margin){prevStyle+='margin:'+this.style.margin+';';this.style.margin=''}var imgStyle=(this.style.cssText);strNewHTML+='<span '+imgId+imgClass+imgTitle+imgAlt;strNewHTML+='style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;strNewHTML+='width:'+jQuery(this).width()+'px;'+'height:'+jQuery(this).height()+'px;';strNewHTML+='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader'+'(src=\''+jQuery(this).attr('src')+'\', sizingMethod=\'scale\');';strNewHTML+=imgStyle+'"></span>';if(prevStyle!=''){strNewHTML='<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:'+jQuery(this).width()+'px;'+'height:'+jQuery(this).height()+'px;'+'">'+strNewHTML+'</span>'}jQuery(this).hide();jQuery(this).after(strNewHTML)});jQuery(this).find("*").each(function(){var bgIMG=jQuery(this).css('background-image');if(bgIMG.indexOf(".png")!=-1){var iebg=bgIMG.split('url("')[1].split('")')[0];jQuery(this).css('background-image','none');jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+iebg+"',sizingMethod='scale')"}});jQuery(this).find("input[@src$=.png]").each(function(){var bgIMG=jQuery(this).attr('src');jQuery(this).get(0).runtimeStyle.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader'+'(src=\''+bgIMG+'\', sizingMethod=\'scale\');';jQuery(this).attr('src',settings.blankgif)})}return jQuery}})(jQuery);
jQuery.url=function(){var segments={};var parsed={};var options={url:window.location,strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var parseUri=function(){str=decodeURI(options.url);var m=options.parser[options.strictMode?"strict":"loose"].exec(str);var uri={};var i=14;while(i--){uri[options.key[i]]=m[i]||""}uri[options.q.name]={};uri[options.key[12]].replace(options.q.parser,function($0,$1,$2){if($1){uri[options.q.name][$1]=$2}});return uri};var key=function(key){if(!parsed.length){setUp()}if(key=="base"){if(parsed.port!==null&&parsed.port!==""){return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/"}else{return parsed.protocol+"://"+parsed.host+"/"}}return(parsed[key]==="")?null:parsed[key]};var param=function(item){if(!parsed.length){setUp()}return(parsed.queryKey[item]===null)?null:parsed.queryKey[item]};var setUp=function(){parsed=parseUri();getSegments()};var getSegments=function(){var p=parsed.path;segments=[];segments=parsed.path.length==1?{}:(p.charAt(p.length-1)=="/"?p.substring(1,p.length-1):path=p.substring(1)).split("/")};return{setMode:function(mode){strictMode=mode=="strict"?true:false;return this},setUrl:function(newUri){options.url=newUri===undefined?window.location:newUri;setUp();return this},segment:function(pos){if(!parsed.length){setUp()}if(pos===undefined){return segments.length}return(segments[pos]===""||segments[pos]===undefined)?null:segments[pos]},attr:key,param:param}}();
(function($){$.fn.clearField=function(s){s=jQuery.extend({blurClass:'clearFieldBlurred',activeClass:'clearFieldActive',attribute:'rel',value:''},s);return $(this).each(function(){var el=$(this);s.value=el.val();if(el.attr(s.attribute)==undefined){el.attr(s.attribute,el.val()).addClass(s.blurClass)}else{s.value=el.attr(s.attribute)}el.focus(function(){if(el.val()==el.attr(s.attribute)){el.val('').removeClass(s.blurClass).addClass(s.activeClass)}});el.blur(function(){if(el.val()==''){el.val(el.attr(s.attribute)).removeClass(s.activeClass).addClass(s.blurClass)}})})}})(jQuery);
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.H($.2L,{17:7(d){l(!6.F){d&&d.2q&&2T.1z&&1z.52("3y 3p, 4L\'t 17, 64 3y");8}p c=$.19(6[0],\'v\');l(c){8 c}c=2w $.v(d,6[0]);$.19(6[0],\'v\',c);l(c.q.3x){6.3s("1w, 3i").1o(".4E").3e(7(){c.3b=w});l(c.q.35){6.3s("1w, 3i").1o(":2s").3e(7(){c.1Z=6})}6.2s(7(b){l(c.q.2q)b.5J();7 1T(){l(c.q.35){l(c.1Z){p a=$("<1w 1V=\'5r\'/>").1s("u",c.1Z.u).33(c.1Z.Z).51(c.U)}c.q.35.V(c,c.U);l(c.1Z){a.3D()}8 N}8 w}l(c.3b){c.3b=N;8 1T()}l(c.L()){l(c.1b){c.1l=w;8 N}8 1T()}12{c.2l();8 N}})}8 c},J:7(){l($(6[0]).2W(\'L\')){8 6.17().L()}12{p b=w;p a=$(6[0].L).17();6.P(7(){b&=a.I(6)});8 b}},4D:7(c){p d={},$I=6;$.P(c.1I(/\\s/),7(a,b){d[b]=$I.1s(b);$I.6d(b)});8 d},1i:7(h,k){p f=6[0];l(h){p i=$.19(f.L,\'v\').q;p d=i.1i;p c=$.v.36(f);23(h){1e"1d":$.H(c,$.v.1X(k));d[f.u]=c;l(k.G)i.G[f.u]=$.H(i.G[f.u],k.G);31;1e"3D":l(!k){T d[f.u];8 c}p e={};$.P(k.1I(/\\s/),7(a,b){e[b]=c[b];T c[b]});8 e}}p g=$.v.41($.H({},$.v.3Y(f),$.v.3V(f),$.v.3T(f),$.v.36(f)),f);l(g.15){p j=g.15;T g.15;g=$.H({15:j},g)}8 g}});$.H($.5p[":"],{5n:7(a){8!$.1p(""+a.Z)},5g:7(a){8!!$.1p(""+a.Z)},5f:7(a){8!a.4h}});$.v=7(b,a){6.q=$.H(w,{},$.v.3d,b);6.U=a;6.3I()};$.v.W=7(c,b){l(R.F==1)8 7(){p a=$.3F(R);a.4V(c);8 $.v.W.1Q(6,a)};l(R.F>2&&b.2c!=3B){b=$.3F(R).4Q(1)}l(b.2c!=3B){b=[b]}$.P(b,7(i,n){c=c.1u(2w 3t("\\\\{"+i+"\\\\}","g"),n)});8 c};$.H($.v,{3d:{G:{},2a:{},1i:{},1c:"3r",28:"J",2F:"4P",2l:w,3o:$([]),2D:$([]),3x:w,3l:[],3k:N,4O:7(a){6.3U=a;l(6.q.4K&&!6.4J){6.q.1K&&6.q.1K.V(6,a,6.q.1c,6.q.28);6.1M(a).2A()}},4C:7(a){l(!6.1E(a)&&(a.u 11 6.1a||!6.K(a))){6.I(a)}},6c:7(a){l(a.u 11 6.1a||a==6.4A){6.I(a)}},68:7(a){l(a.u 11 6.1a)6.I(a);12 l(a.4x.u 11 6.1a)6.I(a.4x)},39:7(a,c,b){$(a).22(c).2v(b)},1K:7(a,c,b){$(a).2v(c).22(b)}},63:7(a){$.H($.v.3d,a)},G:{15:"61 4r 2W 15.",1q:"M 2O 6 4r.",1J:"M O a J 1J 5X.",1B:"M O a J 5W.",1A:"M O a J 1A.",2j:"M O a J 1A (5Q).",1G:"M O a J 1G.",1P:"M O 5O 1P.",2f:"M O a J 5L 5I 1G.",2o:"M O 47 5F Z 5B.",43:"M O a Z 5z a J 5x.",18:$.v.W("M O 3K 5v 2X {0} 2V."),1y:$.v.W("M O 5t 5s {0} 2V."),2i:$.v.W("M O a Z 3W {0} 3O {1} 2V 5o."),2r:$.v.W("M O a Z 3W {0} 3O {1}."),1C:$.v.W("M O a Z 5j 2X 46 3M 3L {0}."),1t:$.v.W("M O a Z 5d 2X 46 3M 3L {0}.")},3J:N,5a:{3I:7(){6.24=$(6.q.2D);6.4t=6.24.F&&6.24||$(6.U);6.2x=$(6.q.3o).1d(6.q.2D);6.1a={};6.54={};6.1b=0;6.1h={};6.1f={};6.21();p f=(6.2a={});$.P(6.q.2a,7(d,c){$.P(c.1I(/\\s/),7(a,b){f[b]=d})});p e=6.q.1i;$.P(e,7(b,a){e[b]=$.v.1X(a)});7 2N(a){p b=$.19(6[0].L,"v"),3c="4W"+a.1V.1u(/^17/,"");b.q[3c]&&b.q[3c].V(b,6[0])}$(6.U).2K(":3E, :4U, :4T, 2e, 4S","2d 2J 4R",2N).2K(":3C, :3A, 2e, 3z","3e",2N);l(6.q.3w)$(6.U).2I("1f-L.17",6.q.3w)},L:7(){6.3v();$.H(6.1a,6.1v);6.1f=$.H({},6.1v);l(!6.J())$(6.U).3u("1f-L",[6]);6.1m();8 6.J()},3v:7(){6.2H();Q(p i=0,14=(6.2b=6.14());14[i];i++){6.29(14[i])}8 6.J()},I:7(a){a=6.2G(a);6.4A=a;6.2P(a);6.2b=$(a);p b=6.29(a);l(b){T 6.1f[a.u]}12{6.1f[a.u]=w}l(!6.3q()){6.13=6.13.1d(6.2x)}6.1m();8 b},1m:7(b){l(b){$.H(6.1v,b);6.S=[];Q(p c 11 b){6.S.27({1j:b[c],I:6.26(c)[0]})}6.1n=$.3n(6.1n,7(a){8!(a.u 11 b)})}6.q.1m?6.q.1m.V(6,6.1v,6.S):6.3m()},2S:7(){l($.2L.2S)$(6.U).2S();6.1a={};6.2H();6.2Q();6.14().2v(6.q.1c)},3q:7(){8 6.2k(6.1f)},2k:7(a){p b=0;Q(p i 11 a)b++;8 b},2Q:7(){6.2C(6.13).2A()},J:7(){8 6.3j()==0},3j:7(){8 6.S.F},2l:7(){l(6.q.2l){3Q{$(6.3h()||6.S.F&&6.S[0].I||[]).1o(":4N").3g().4M("2d")}3f(e){}}},3h:7(){p a=6.3U;8 a&&$.3n(6.S,7(n){8 n.I.u==a.u}).F==1&&a},14:7(){p a=6,2B={};8 $([]).1d(6.U.14).1o(":1w").1L(":2s, :21, :4I, [4H]").1L(6.q.3l).1o(7(){!6.u&&a.q.2q&&2T.1z&&1z.3r("%o 4G 3K u 4F",6);l(6.u 11 2B||!a.2k($(6).1i()))8 N;2B[6.u]=w;8 w})},2G:7(a){8 $(a)[0]},2z:7(){8 $(6.q.2F+"."+6.q.1c,6.4t)},21:7(){6.1n=[];6.S=[];6.1v={};6.1k=$([]);6.13=$([]);6.2b=$([])},2H:7(){6.21();6.13=6.2z().1d(6.2x)},2P:7(a){6.21();6.13=6.1M(a)},29:7(d){d=6.2G(d);l(6.1E(d)){d=6.26(d.u)[0]}p a=$(d).1i();p c=N;Q(Y 11 a){p b={Y:Y,2n:a[Y]};3Q{p f=$.v.1N[Y].V(6,d.Z.1u(/\\r/g,""),d,b.2n);l(f=="1S-1Y"){c=w;6g}c=N;l(f=="1h"){6.13=6.13.1L(6.1M(d));8}l(!f){6.4B(d,b);8 N}}3f(e){6.q.2q&&2T.1z&&1z.6f("6e 6b 6a 69 I "+d.4z+", 29 47 \'"+b.Y+"\' Y",e);67 e;}}l(c)8;l(6.2k(a))6.1n.27(d);8 w},4y:7(a,b){l(!$.1H)8;p c=6.q.3a?$(a).1H()[6.q.3a]:$(a).1H();8 c&&c.G&&c.G[b]},4w:7(a,b){p m=6.q.G[a];8 m&&(m.2c==4v?m:m[b])},4u:7(){Q(p i=0;i<R.F;i++){l(R[i]!==20)8 R[i]}8 20},2u:7(a,b){8 6.4u(6.4w(a.u,b),6.4y(a,b),!6.q.3k&&a.62||20,$.v.G[b],"<4s>60: 5Z 1j 5Y Q "+a.u+"</4s>")},4B:7(b,a){p c=6.2u(b,a.Y),37=/\\$?\\{(\\d+)\\}/g;l(1g c=="7"){c=c.V(6,a.2n,b)}12 l(37.16(c)){c=1F.W(c.1u(37,\'{$1}\'),a.2n)}6.S.27({1j:c,I:b});6.1v[b.u]=c;6.1a[b.u]=c},2C:7(a){l(6.q.2t)a=a.1d(a.4q(6.q.2t));8 a},3m:7(){Q(p i=0;6.S[i];i++){p a=6.S[i];6.q.39&&6.q.39.V(6,a.I,6.q.1c,6.q.28);6.2E(a.I,a.1j)}l(6.S.F){6.1k=6.1k.1d(6.2x)}l(6.q.1x){Q(p i=0;6.1n[i];i++){6.2E(6.1n[i])}}l(6.q.1K){Q(p i=0,14=6.4p();14[i];i++){6.q.1K.V(6,14[i],6.q.1c,6.q.28)}}6.13=6.13.1L(6.1k);6.2Q();6.2C(6.1k).4o()},4p:7(){8 6.2b.1L(6.4n())},4n:7(){8 $(6.S).4m(7(){8 6.I})},2E:7(a,c){p b=6.1M(a);l(b.F){b.2v().22(6.q.1c);b.1s("4l")&&b.4k(c)}12{b=$("<"+6.q.2F+"/>").1s({"Q":6.34(a),4l:w}).22(6.q.1c).4k(c||"");l(6.q.2t){b=b.2A().4o().5V("<"+6.q.2t+"/>").4q()}l(!6.24.5S(b).F)6.q.4j?6.q.4j(b,$(a)):b.5R(a)}l(!c&&6.q.1x){b.3E("");1g 6.q.1x=="1D"?b.22(6.q.1x):6.q.1x(b)}6.1k=6.1k.1d(b)},1M:7(a){p b=6.34(a);8 6.2z().1o(7(){8 $(6).1s(\'Q\')==b})},34:7(a){8 6.2a[a.u]||(6.1E(a)?a.u:a.4z||a.u)},1E:7(a){8/3C|3A/i.16(a.1V)},26:7(d){p c=6.U;8 $(4i.5P(d)).4m(7(a,b){8 b.L==c&&b.u==d&&b||4g})},1O:7(a,b){23(b.4f.4e()){1e\'2e\':8 $("3z:3p",b).F;1e\'1w\':l(6.1E(b))8 6.26(b.u).1o(\':4h\').F}8 a.F},4d:7(b,a){8 6.32[1g b]?6.32[1g b](b,a):w},32:{"5N":7(b,a){8 b},"1D":7(b,a){8!!$(b,a.L).F},"7":7(b,a){8 b(a)}},K:7(a){8!$.v.1N.15.V(6,$.1p(a.Z),a)&&"1S-1Y"},4c:7(a){l(!6.1h[a.u]){6.1b++;6.1h[a.u]=w}},4b:7(a,b){6.1b--;l(6.1b<0)6.1b=0;T 6.1h[a.u];l(b&&6.1b==0&&6.1l&&6.L()){$(6.U).2s();6.1l=N}12 l(!b&&6.1b==0&&6.1l){$(6.U).3u("1f-L",[6]);6.1l=N}},2h:7(a){8 $.19(a,"2h")||$.19(a,"2h",{2M:4g,J:w,1j:6.2u(a,"1q")})}},1R:{15:{15:w},1J:{1J:w},1B:{1B:w},1A:{1A:w},2j:{2j:w},4a:{4a:w},1G:{1G:w},49:{49:w},1P:{1P:w},2f:{2f:w}},48:7(a,b){a.2c==4v?6.1R[a]=b:$.H(6.1R,a)},3V:7(b){p a={};p c=$(b).1s(\'5H\');c&&$.P(c.1I(\' \'),7(){l(6 11 $.v.1R){$.H(a,$.v.1R[6])}});8 a},3T:7(c){p a={};p d=$(c);Q(Y 11 $.v.1N){p b=d.1s(Y);l(b){a[Y]=b}}l(a.18&&/-1|5G|5C/.16(a.18)){T a.18}8 a},3Y:7(a){l(!$.1H)8{};p b=$.19(a.L,\'v\').q.3a;8 b?$(a).1H()[b]:$(a).1H()},36:7(b){p a={};p c=$.19(b.L,\'v\');l(c.q.1i){a=$.v.1X(c.q.1i[b.u])||{}}8 a},41:7(d,e){$.P(d,7(c,b){l(b===N){T d[c];8}l(b.2R||b.2p){p a=w;23(1g b.2p){1e"1D":a=!!$(b.2p,e.L).F;31;1e"7":a=b.2p.V(e,e);31}l(a){d[c]=b.2R!==20?b.2R:w}12{T d[c]}}});$.P(d,7(a,b){d[a]=$.44(b)?b(e):b});$.P([\'1y\',\'18\',\'1t\',\'1C\'],7(){l(d[6]){d[6]=2Z(d[6])}});$.P([\'2i\',\'2r\'],7(){l(d[6]){d[6]=[2Z(d[6][0]),2Z(d[6][1])]}});l($.v.3J){l(d.1t&&d.1C){d.2r=[d.1t,d.1C];T d.1t;T d.1C}l(d.1y&&d.18){d.2i=[d.1y,d.18];T d.1y;T d.18}}l(d.G){T d.G}8 d},1X:7(a){l(1g a=="1D"){p b={};$.P(a.1I(/\\s/),7(){b[6]=w});a=b}8 a},5A:7(c,a,b){$.v.1N[c]=a;$.v.G[c]=b!=20?b:$.v.G[c];l(a.F<3){$.v.48(c,$.v.1X(c))}},1N:{15:7(c,d,a){l(!6.4d(a,d))8"1S-1Y";23(d.4f.4e()){1e\'2e\':p b=$(d).33();8 b&&b.F>0;1e\'1w\':l(6.1E(d))8 6.1O(c,d)>0;5y:8 $.1p(c).F>0}},1q:7(f,h,j){l(6.K(h))8"1S-1Y";p g=6.2h(h);l(!6.q.G[h.u])6.q.G[h.u]={};g.40=6.q.G[h.u].1q;6.q.G[h.u].1q=g.1j;j=1g j=="1D"&&{1B:j}||j;l(g.2M!==f){g.2M=f;p k=6;6.4c(h);p i={};i[h.u]=f;$.2U($.H(w,{1B:j,3Z:"2Y",3X:"17"+h.u,5w:"5u",19:i,1x:7(d){k.q.G[h.u].1q=g.40;p b=d===w;l(b){p e=k.1l;k.2P(h);k.1l=e;k.1n.27(h);k.1m()}12{p a={};p c=(g.1j=d||k.2u(h,"1q"));a[h.u]=$.44(c)?c(f):c;k.1m(a)}g.J=b;k.4b(h,b)}},j));8"1h"}12 l(6.1h[h.u]){8"1h"}8 g.J},1y:7(b,c,a){8 6.K(c)||6.1O($.1p(b),c)>=a},18:7(b,c,a){8 6.K(c)||6.1O($.1p(b),c)<=a},2i:7(b,d,a){p c=6.1O($.1p(b),d);8 6.K(d)||(c>=a[0]&&c<=a[1])},1t:7(b,c,a){8 6.K(c)||b>=a},1C:7(b,c,a){8 6.K(c)||b<=a},2r:7(b,c,a){8 6.K(c)||(b>=a[0]&&b<=a[1])},1J:7(a,b){8 6.K(b)||/^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^X`{\\|}~]|[\\E-\\B\\C-\\x\\A-\\y])+(\\.([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^X`{\\|}~]|[\\E-\\B\\C-\\x\\A-\\y])+)*)|((\\3S)((((\\2m|\\1W)*(\\30\\3R))?(\\2m|\\1W)+)?(([\\3P-\\5q\\45\\42\\5D-\\5E\\3N]|\\5m|[\\5l-\\5k]|[\\5i-\\5K]|[\\E-\\B\\C-\\x\\A-\\y])|(\\\\([\\3P-\\1W\\45\\42\\30-\\3N]|[\\E-\\B\\C-\\x\\A-\\y]))))*(((\\2m|\\1W)*(\\30\\3R))?(\\2m|\\1W)+)?(\\3S)))@((([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])))\\.)+(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|[\\E-\\B\\C-\\x\\A-\\y])))\\.?$/i.16(a)},1B:7(a,b){8 6.K(b)||/^(5h?|5M):\\/\\/(((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|\\d|[\\E-\\B\\C-\\x\\A-\\y])))\\.)+(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])|(([a-z]|[\\E-\\B\\C-\\x\\A-\\y])([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])*([a-z]|[\\E-\\B\\C-\\x\\A-\\y])))\\.?)(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|[\\5e-\\5T]|\\/|\\?)*)?(\\#((([a-z]|\\d|-|\\.|X|~|[\\E-\\B\\C-\\x\\A-\\y])|(%[\\1U-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$/i.16(a)},1A:7(a,b){8 6.K(b)||!/5U|5c/.16(2w 5b(a))},2j:7(a,b){8 6.K(b)||/^\\d{4}[\\/-]\\d{1,2}[\\/-]\\d{1,2}$/.16(a)},1G:7(a,b){8 6.K(b)||/^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)(?:\\.\\d+)?$/.16(a)},1P:7(a,b){8 6.K(b)||/^\\d+$/.16(a)},2f:7(b,e){l(6.K(e))8"1S-1Y";l(/[^0-9-]+/.16(b))8 N;p a=0,d=0,2g=N;b=b.1u(/\\D/g,"");Q(p n=b.F-1;n>=0;n--){p c=b.59(n);p d=58(c,10);l(2g){l((d*=2)>9)d-=9}a+=d;2g=!2g}8(a%10)==0},43:7(b,c,a){a=1g a=="1D"?a.1u(/,/g,\'|\'):"57|56?g|55";8 6.K(c)||b.65(2w 3t(".("+a+")$","i"))},2o:7(c,d,a){p b=$(a).66(".17-2o").2I("3H.17-2o",7(){$(d).J()});8 c==b.33()}}});$.W=$.v.W})(1F);(7($){p c=$.2U;p d={};$.2U=7(a){a=$.H(a,$.H({},$.53,a));p b=a.3X;l(a.3Z=="2Y"){l(d[b]){d[b].2Y()}8(d[b]=c.1Q(6,R))}8 c.1Q(6,R)}})(1F);(7($){l(!1F.1r.38.2d&&!1F.1r.38.2J&&4i.3G){$.P({3g:\'2d\',3H:\'2J\'},7(b,a){$.1r.38[a]={50:7(){6.3G(b,2y,w)},4Z:7(){6.4Y(b,2y,w)},2y:7(e){R[0]=$.1r.2O(e);R[0].1V=a;8 $.1r.1T.1Q(6,R)}};7 2y(e){e=$.1r.2O(e);e.1V=a;8 $.1r.1T.V(6,e)}})};$.H($.2L,{2K:7(d,e,c){8 6.2I(e,7(a){p b=$(a.4X);l(b.2W(d)){8 c.1Q(b,R)}})}})})(1F);',62,389,'||||||this|function|return|||||||||||||if||||var|settings||||name|validator|true|uFDCF|uFFEF||uFDF0|uD7FF|uF900||u00A0|length|messages|extend|element|valid|optional|form|Please|false|enter|each|for|arguments|errorList|delete|currentForm|call|format|_|method|value||in|else|toHide|elements|required|test|validate|maxlength|data|submitted|pendingRequest|errorClass|add|case|invalid|typeof|pending|rules|message|toShow|formSubmitted|showErrors|successList|filter|trim|remote|event|attr|min|replace|errorMap|input|success|minlength|console|date|url|max|string|checkable|jQuery|number|metadata|split|email|unhighlight|not|errorsFor|methods|getLength|digits|apply|classRuleSettings|dependency|handle|da|type|x09|normalizeRule|mismatch|submitButton|undefined|reset|addClass|switch|labelContainer||findByName|push|validClass|check|groups|currentElements|constructor|focusin|select|creditcard|bEven|previousValue|rangelength|dateISO|objectLength|focusInvalid|x20|parameters|equalTo|depends|debug|range|submit|wrapper|defaultMessage|removeClass|new|containers|handler|errors|hide|rulesCache|addWrapper|errorLabelContainer|showLabel|errorElement|clean|prepareForm|bind|focusout|validateDelegate|fn|old|delegate|fix|prepareElement|hideErrors|param|resetForm|window|ajax|characters|is|than|abort|Number|x0d|break|dependTypes|val|idOrName|submitHandler|staticRules|theregex|special|highlight|meta|cancelSubmit|eventType|defaults|click|catch|focus|findLastActive|button|size|ignoreTitle|ignore|defaultShowErrors|grep|errorContainer|selected|numberOfInvalids|error|find|RegExp|triggerHandler|checkForm|invalidHandler|onsubmit|nothing|option|checkbox|Array|radio|remove|text|makeArray|addEventListener|blur|init|autoCreateRanges|no|to|equal|x7f|and|x01|try|x0a|x22|attributeRules|lastActive|classRules|between|port|metadataRules|mode|originalMessage|normalizeRules|x0c|accept|isFunction|x0b|or|the|addClassRules|numberDE|dateDE|stopRequest|startRequest|depend|toLowerCase|nodeName|null|checked|document|errorPlacement|html|generated|map|invalidElements|show|validElements|parent|field|strong|errorContext|findDefined|String|customMessage|parentNode|customMetaMessage|id|lastElement|formatAndAdd|onfocusout|removeAttrs|cancel|assigned|has|disabled|image|blockFocusCleanup|focusCleanup|can|trigger|visible|onfocusin|label|slice|keyup|textarea|file|password|unshift|on|target|removeEventListener|teardown|setup|appendTo|warn|ajaxSettings|valueCache|gif|jpe|png|parseInt|charAt|prototype|Date|NaN|greater|uE000|unchecked|filled|https|x5d|less|x5b|x23|x21|blank|long|expr|x08|hidden|least|at|json|more|dataType|extension|default|with|addMethod|again|524288|x0e|x1f|same|2147483647|class|card|preventDefault|x7e|credit|ftp|boolean|only|getElementsByName|ISO|insertAfter|append|uF8FF|Invalid|wrap|URL|address|defined|No|Warning|This|title|setDefaults|returning|match|unbind|throw|onclick|checking|when|occured|onkeyup|removeAttr|exception|log|continue'.split('|'),0,{}));
(function($){
var interval=null;
var checklist=[];
$.elementReady=function(id,fn){
checklist.push({id:id,fn:fn});
if(!interval){
interval=setInterval(check,$.elementReady.interval_ms);
}
return this;
};
$.elementReady.interval_ms=23;
function check(){
var docReady=$.isReady;
for(var i=checklist.length-1;0<=i;--i){
var el=document.getElementById(checklist[i].id);
if(el){
var fn=checklist[i].fn;
checklist[i]=checklist[checklist.length-1];
checklist.pop();
fn.apply(el,[$]);
}
}
if(docReady){
clearInterval(interval);
interval=null;
}
};
})(jQuery);
jQuery.cookie=function(key,value,options){
if(arguments.length>1&&String(value)!=="[object Object]"){
options=jQuery.extend({},options);
if(value===null||value===undefined){
options.expires=-1;
}
if(typeof options.expires==='number'){
var days=options.expires,t=options.expires=new Date();
t.setDate(t.getDate()+days);
}
value=String(value);
return(document.cookie=[
encodeURIComponent(key),'=',
options.raw?value:encodeURIComponent(value),
options.expires?'; expires='+options.expires.toUTCString():'',
options.path?'; path='+options.path:'',
options.domain?'; domain='+options.domain:'',
options.secure?'; secure':''
].join(''));
}
options=value||{};
var result,decode=options.raw?function(s){return s;}:decodeURIComponent;
return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null;
};
(function($){
$.fn.hoverIntent=function(f,g){
var cfg={
sensitivity:7,
interval:100,
timeout:0
};
cfg=$.extend(cfg,g?{over:f,out:g}:f);
var cX,cY,pX,pY;
var track=function(ev){
cX=ev.pageX;
cY=ev.pageY;
};
var compare=function(ev,ob){
ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){
$(ob).unbind("mousemove",track);
ob.hoverIntent_s=1;
return cfg.over.apply(ob,[ev]);
}else{
pX=cX;pY=cY;
ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);
}
};
var delay=function(ev,ob){
ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
ob.hoverIntent_s=0;
return cfg.out.apply(ob,[ev]);
};
var handleHover=function(e){
var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;
while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}
if(p==this){return false;}
var ev=jQuery.extend({},e);
var ob=this;
if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}
if(e.type=="mouseover"){
pX=ev.pageX;pY=ev.pageY;
$(ob).bind("mousemove",track);
if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}
}else{
$(ob).unbind("mousemove",track);
if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}
}
};
return this.mouseover(handleHover).mouseout(handleHover);
};
})(jQuery);
jQuery.fn.extend({
getUrlParam:function(strParamName){
strParamName=escape(unescape(strParamName));
var returnVal=new Array();
var qString=null;
if($(this).attr("nodeName")=="#document"){
if(window.location.search.search(strParamName)>-1){
qString=window.location.search.substr(1,window.location.search.length).split("&");
}
}else if($(this).attr("src")!="undefined"){
var strHref=$(this).attr("src")
if(strHref.indexOf("?")>-1){
var strQueryString=strHref.substr(strHref.indexOf("?")+1);
qString=strQueryString.split("&");
}
}else if($(this).attr("href")!="undefined"){
var strHref=$(this).attr("href")
if(strHref.indexOf("?")>-1){
var strQueryString=strHref.substr(strHref.indexOf("?")+1);
qString=strQueryString.split("&");
}
}else{
return null;
}
if(qString==null)return null;
for(var i=0;i<qString.length;i++){
if(escape(unescape(qString[i].split("=")[0]))==strParamName){
returnVal.push(qString[i].split("=")[1]);
}
}
if(returnVal.length==0)return null;
else if(returnVal.length==1)return returnVal[0];
else return returnVal;
}
});
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2xml|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}));
(function(b){b.tinysort={id:"TinySort",version:"1.0.4",defaults:{order:"asc",attr:"",place:"start",returns:false}};b.fn.extend({tinysort:function(h,j){if(h&&typeof(h)!="string"){j=h;h=null}var e=b.extend({},b.tinysort.defaults,j);var p={};this.each(function(t){var v=(!h||h=="")?b(this):b(this).find(h);var u=e.order=="rand"?""+Math.random():(e.attr==""?v.text():v.attr(e.attr));var s=b(this).parent();if(!p[s]){p[s]={s:[],n:[]}}if(v.length>0){p[s].s.push({s:u,e:b(this),n:t})}else{p[s].n.push({e:b(this),n:t})}});for(var g in p){var d=p[g];d.s.sort(function k(t,s){var i=t.s.toLowerCase?t.s.toLowerCase():t.s;var u=s.s.toLowerCase?s.s.toLowerCase():s.s;if(c(t.s)&&c(s.s)){i=parseFloat(t.s);u=parseFloat(s.s)}return(e.order=="asc"?1:-1)*(i<u?-1:(i>u?1:0))})}var m=[];for(var g in p){var d=p[g];var n=[];var f=b(this).length;switch(e.place){case"first":b.each(d.s,function(s,t){f=Math.min(f,t.n)});break;case"org":b.each(d.s,function(s,t){n.push(t.n)});break;case"end":f=d.n.length;break;default:f=0}var q=[0,0];for(var l=0;l<b(this).length;l++){var o=l>=f&&l<f+d.s.length;if(a(n,l)){o=true}var r=(o?d.s:d.n)[q[o?0:1]].e;r.parent().append(r);if(o||!e.returns){m.push(r.get(0))}q[o?0:1]++}}return this.pushStack(m)}});function c(e){var d=/^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(e);return d&&d.length>0?d[1]:false}function a(e,f){var d=false;b.each(e,function(h,g){if(!d){d=g==f}});return d}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);
(function($){
$.timeago=function(timestamp){
if(timestamp instanceof Date){
return inWords(timestamp);
}else if(typeof timestamp==="string"){
return inWords($.timeago.parse(timestamp));
}else{
return inWords($.timeago.datetime(timestamp));
}
};
var $t=$.timeago;
$.extend($.timeago,{
settings:{
refreshMillis:60000,
allowFuture:false,
strings:{
prefixAgo:null,
prefixFromNow:null,
suffixAgo:"ago",
suffixFromNow:"from now",
seconds:"less than a minute",
minute:"about a minute",
minutes:"%d minutes",
hour:"about an hour",
hours:"about %d hours",
day:"a day",
days:"%d days",
month:"about a month",
months:"%d months",
year:"about a year",
years:"%d years",
numbers:[]
}
},
inWords:function(distanceMillis){
var $l=this.settings.strings;
var prefix=$l.prefixAgo;
var suffix=$l.suffixAgo;
if(this.settings.allowFuture){
if(distanceMillis<0){
prefix=$l.prefixFromNow;
suffix=$l.suffixFromNow;
}
distanceMillis=Math.abs(distanceMillis);
}
var seconds=distanceMillis/1000;
var minutes=seconds/60;
var hours=minutes/60;
var days=hours/24;
var years=days/365;
function substitute(stringOrFunction,number){
var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction;
var value=($l.numbers&&$l.numbers[number])||number;
return string.replace(/%d/i,value);
}
var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||
seconds<90&&substitute($l.minute,1)||
minutes<55&&substitute($l.minutes,Math.round(minutes))||
minutes<90&&substitute($l.hour,1)||
hours<24&&substitute($l.hours,Math.round(hours))||
hours<48&&substitute($l.day,1)||
days<30&&substitute($l.days,Math.floor(days))||
days<60&&substitute($l.month,1)||
days<365&&substitute($l.months,Math.floor(days/30))||
years<2&&substitute($l.year,1)||
substitute($l.years,Math.floor(years));
return $.trim([prefix,words,suffix].join(" "));
},
parse:function(iso8601){
var s=$.trim(iso8601);
s=s.replace(/\.\d\d\d+/,"");
s=s.replace(/-/,"/").replace(/-/,"/");
s=s.replace(/T/," ").replace(/Z/," UTC");
s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
return new Date(s);
},
datetime:function(elem){
var isTime=$(elem).get(0).tagName.toLowerCase()==="time";
var iso8601=isTime?$(elem).attr("datetime"):$(elem).attr("title");
return $t.parse(iso8601);
}
});
$.fn.timeago=function(){
var self=this;
self.each(refresh);
var $s=$t.settings;
if($s.refreshMillis>0){
setInterval(function(){self.each(refresh);},$s.refreshMillis);
}
return self;
};
function refresh(){
var data=prepareData(this);
if(!isNaN(data.datetime)){
$(this).text(inWords(data.datetime));
}
return this;
}
function prepareData(element){
element=$(element);
if(!element.data("timeago")){
element.data("timeago",{datetime:$t.datetime(element)});
var text=$.trim(element.text());
if(text.length>0){
element.attr("title",text);
}
}
return element.data("timeago");
}
function inWords(date){
return $t.inWords(distance(date));
}
function distance(date){
return(new Date().getTime()-date.getTime());
}
document.createElement("abbr");
document.createElement("time");
}(jQuery));
$(document).ready(function(){$("input:text, textarea, input:password").each(function(){if(this.value=='')this.value=this.title;});$("input:text, textarea, input:password").focus(function(){if(this.value==this.title)this.value='';});$("input:text, textarea, input:password").blur(function(){if(this.value=='')this.value=this.title;});$("input:image, input:button, input:submit").click(function(){$(this.form.elements).each(function(){if(this.type=='text'||this.type=='textarea'||this.type=='password'){if(this.value==this.title&&this.title!=''){this.value='';}}});});});
(function($){
$.fn.lightBox=function(settings){
settings=jQuery.extend({
overlayBgColor:'#CECECE',
overlayOpacity:0.8,
fixedNavigation:false,
imageLoading:'/csp/cms/sites/STM/assets/img/lightbox/lightbox-ico-loading.gif',
imageBtnPrev:'/csp/cms/sites/STM/assets/img/lightbox/lightbox-btn-prev.gif',
imageBtnNext:'/csp/cms/sites/STM/assets/img/lightbox/lightbox-btn-next.gif',
imageBtnClose:'/csp/cms/sites/STM/assets/img/lightbox/lightbox-btn-close.gif',
imageBlank:'/csp/cms/sites/STM/assets/img/lightbox/lightbox-blank.gif',
containerBorderSize:10,
containerResizeSpeed:400,
txtImage:'Image',
txtOf:'of',
keyToClose:'c',
keyToPrev:'p',
keyToNext:'n',
imageArray:[],
activeImage:0
},settings);
var jQueryMatchedObj=this;
function _initialize(){
_start(this,jQueryMatchedObj);
return false;
}
function _start(objClicked,jQueryMatchedObj){
$('embed, object, select').css({'visibility':'hidden'});
_set_interface();
settings.imageArray.length=0;
settings.activeImage=0;
if(jQueryMatchedObj.length==1){
settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
}else{
for(var i=0;i<jQueryMatchedObj.length;i++){
settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));
}
}
while(settings.imageArray[settings.activeImage][0]!=objClicked.getAttribute('href')){
settings.activeImage++;
}
_set_image_to_view();
}
function _set_interface(){
$('body').append('<div id="jquery-overlay" style="z-index:201;"></div><div id="jquery-lightbox" style="z-index:202;"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="'+settings.imageLoading+'"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="'+settings.imageBtnClose+'"></a></div></div></div></div>');
var arrPageSizes=___getPageSize();
$('#jquery-overlay').css({
backgroundColor:settings.overlayBgColor,
opacity:settings.overlayOpacity,
width:arrPageSizes[0],
height:arrPageSizes[1]
}).fadeIn();
var arrPageScroll=___getPageScroll();
$('#jquery-lightbox').css({
top:arrPageScroll[1]+(arrPageSizes[3]/10),
left:arrPageScroll[0]
}).show();
$('#jquery-overlay,#jquery-lightbox').click(function(){
_finish();
});
$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function(){
_finish();
return false;
});
$(window).resize(function(){
var arrPageSizes=___getPageSize();
$('#jquery-overlay').css({
width:arrPageSizes[0],
height:arrPageSizes[1]
});
var arrPageScroll=___getPageScroll();
$('#jquery-lightbox').css({
top:arrPageScroll[1]+(arrPageSizes[3]/10),
left:arrPageScroll[0]
});
});
}
function _set_image_to_view(){
$('#lightbox-loading').show();
if(settings.fixedNavigation){
$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
}else{
$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
}
var objImagePreloader=new Image();
objImagePreloader.onload=function(){
$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);
_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
objImagePreloader.onload=function(){};
};
objImagePreloader.src=settings.imageArray[settings.activeImage][0];


};
function _resize_container_image_box(intImageWidth,intImageHeight){
var intCurrentWidth=$('#lightbox-container-image-box').width();
var intCurrentHeight=$('#lightbox-container-image-box').height();
var intWidth=(intImageWidth+(settings.containerBorderSize*2));
var intHeight=(intImageHeight+(settings.containerBorderSize*2));
var intDiffW=intCurrentWidth-intWidth;
var intDiffH=intCurrentHeight-intHeight;
$('#lightbox-container-image-box').animate({width:intWidth,height:intHeight},settings.containerResizeSpeed,function(){_show_image();});
if((intDiffW==0)&&(intDiffH==0)){
if($.browser.msie){
___pause(250);
}else{
___pause(100);
}
}
$('#lightbox-container-image-data-box').css({width:intImageWidth});
$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({height:intImageHeight+(settings.containerBorderSize*2)});
};
function _show_image(){
$('#lightbox-loading').hide();
$('#lightbox-image').fadeIn(function(){
_show_image_data();
_set_navigation();
});
_preload_neighbor_images();
};
function _show_image_data(){
$('#lightbox-container-image-data-box').slideDown('fast');
$('#lightbox-image-details-caption').hide();
if(settings.imageArray[settings.activeImage][1]){
$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
}
if(settings.imageArray.length>1){
$('#lightbox-image-details-currentNumber').html(settings.txtImage+' '+(settings.activeImage+1)+' '+settings.txtOf+' '+settings.imageArray.length).show();
}
}
function _set_navigation(){
$('#lightbox-nav').show();
$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({'background':'transparent url('+settings.imageBlank+') no-repeat'});
if(settings.activeImage!=0){
if(settings.fixedNavigation){
$('#lightbox-nav-btnPrev').css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'})
.unbind()
.bind('click',function(){
settings.activeImage=settings.activeImage-1;
_set_image_to_view();
return false;
});
}else{
$('#lightbox-nav-btnPrev').unbind().hover(function(){
$(this).css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'});
},function(){
$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});
}).show().bind('click',function(){
settings.activeImage=settings.activeImage-1;
_set_image_to_view();
return false;
});
}
}
if(settings.activeImage!=(settings.imageArray.length-1)){
if(settings.fixedNavigation){
$('#lightbox-nav-btnNext').css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'})
.unbind()
.bind('click',function(){
settings.activeImage=settings.activeImage+1;
_set_image_to_view();
return false;
});
}else{
$('#lightbox-nav-btnNext').unbind().hover(function(){
$(this).css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'});
},function(){
$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});
}).show().bind('click',function(){
settings.activeImage=settings.activeImage+1;
_set_image_to_view();
return false;
});
}
}
_enable_keyboard_navigation();
}
function _enable_keyboard_navigation(){
$(document).keydown(function(objEvent){
_keyboard_action(objEvent);
});
}
function _disable_keyboard_navigation(){
$(document).unbind();
}
function _keyboard_action(objEvent){
if(objEvent==null){
keycode=event.keyCode;
escapeKey=27;
}else{
keycode=objEvent.keyCode;
escapeKey=objEvent.DOM_VK_ESCAPE;
}
key=String.fromCharCode(keycode).toLowerCase();
if((key==settings.keyToClose)||(key=='x')||(keycode==escapeKey)){
_finish();
}
if((key==settings.keyToPrev)||(keycode==37)){
if(settings.activeImage!=0){
settings.activeImage=settings.activeImage-1;
_set_image_to_view();
_disable_keyboard_navigation();
}
}
if((key==settings.keyToNext)||(keycode==39)){
if(settings.activeImage!=(settings.imageArray.length-1)){
settings.activeImage=settings.activeImage+1;
_set_image_to_view();
_disable_keyboard_navigation();
}
}
}
function _preload_neighbor_images(){
if((settings.imageArray.length-1)>settings.activeImage){
objNext=new Image();
objNext.src=settings.imageArray[settings.activeImage+1][0];
}
if(settings.activeImage>0){
objPrev=new Image();
objPrev.src=settings.imageArray[settings.activeImage-1][0];
}
}
function _finish(){
$('#jquery-lightbox').remove();
$('#jquery-overlay').fadeOut(function(){$('#jquery-overlay').remove();});
$('embed, object, select').css({'visibility':'visible'});
}
function ___getPageSize(){
var xScroll,yScroll;
if(window.innerHeight&&window.scrollMaxY){
xScroll=window.innerWidth+window.scrollMaxX;
yScroll=window.innerHeight+window.scrollMaxY;
}else if(document.body.scrollHeight>document.body.offsetHeight){
xScroll=document.body.scrollWidth;
yScroll=document.body.scrollHeight;
}else{
xScroll=document.body.offsetWidth;
yScroll=document.body.offsetHeight;
}
var windowWidth,windowHeight;
if(self.innerHeight){
if(document.documentElement.clientWidth){
windowWidth=document.documentElement.clientWidth;
}else{
windowWidth=self.innerWidth;
}
windowHeight=self.innerHeight;
}else if(document.documentElement&&document.documentElement.clientHeight){
windowWidth=document.documentElement.clientWidth;
windowHeight=document.documentElement.clientHeight;
}else if(document.body){
windowWidth=document.body.clientWidth;
windowHeight=document.body.clientHeight;
}
if(yScroll<windowHeight){
pageHeight=windowHeight;
}else{
pageHeight=yScroll;
}
if(xScroll<windowWidth){
pageWidth=xScroll;
}else{
pageWidth=windowWidth;
}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);
return arrayPageSize;
};
function ___getPageScroll(){
var xScroll,yScroll;
if(self.pageYOffset){
yScroll=self.pageYOffset;
xScroll=self.pageXOffset;
}else if(document.documentElement&&document.documentElement.scrollTop){
yScroll=document.documentElement.scrollTop;
xScroll=document.documentElement.scrollLeft;
}else if(document.body){
yScroll=document.body.scrollTop;
xScroll=document.body.scrollLeft;
}
arrayPageScroll=new Array(xScroll,yScroll);
return arrayPageScroll;
};
function ___pause(ms){
var date=new Date();
curDate=null;
do{var curDate=new Date();}
while(curDate-date<ms);
};
return this.unbind('click').click(_initialize);
};
})(jQuery);
/*!
  jQuery Taconite plugin - A port of the Taconite framework by Ryan Asleson and
      Nathaniel T. Schutta: http://taconite.sourceforge.net/
 
  Examples and documentation at: http://malsup.com/jquery/taconite/
  Copyright (c) 2007-2011 M. Alsup
  Dual licensed under the MIT and GPL licenses:
  http://www.opensource.org/licenses/mit-license.php
  http://www.gnu.org/licenses/gpl.html
  Thanks to Kenton Simpson for contributing many good ideas!
 
  @version: 3.62  25-APR-2011
  @requires jQuery v1.3.2 or later
 */
(function($){
var version='3.62';
$.taconite=function(xml){
processDoc(xml);
};
$.taconite.debug=0;
$.taconite.autodetect=true;
$.taconite.defaults={
cdataWrap:'div'
};
$.fn.replace=$.fn.replace||function(a){
this.after(a);
this.remove();
};
$.fn.replaceContent=$.fn.replaceContent||function(a){
return this.empty().append(a);
};
$.expr[':'].taconiteTag=function(a){
return a.taconiteTag===1;
};
$.taconite.enableAutoDetection=function(b){
$.taconite.autodetect=b;
if(origHttpData)
$.httpData=b?origHttpData:detect;
};
var logCount=0;
function log(){
if(!$.taconite.debug||!window.console||!window.console.log)return;
!logCount++&&log('Plugin Version: '+version);
window.console.log('[taconite] '+[].join.call(arguments,''));
}
var parseJSON=$.parseJSON||function(s){
return window['eval']('('+s+')');
};
function httpData(xhr,type,s){
var ct=xhr.getResponseHeader('content-type')||'',
xml=type==='xml'||!type&&ct.indexOf('xml')>=0,
data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==='parsererror'){
$.error&&$.error('parsererror');
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==='string'){
if(type==='json'||!type&&ct.indexOf('json')>=0){
data=parseJSON(data);
}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){
$.globalEval(data);
}
}
return data;
}
function getResponse(xhr,type,s){
if(origHttpData)
return origHttpData(xhr,type,s);
return xhr.responseXML||xhr.responseText;
}
function detect(xhr,type,s){
var ct=xhr.getResponseHeader('content-type');
if($.taconite.debug){
log('[AJAX response] content-type: ',ct,';  status: ',xhr.status,' ',xhr.statusText,';  has responseXML: ',xhr.responseXML!=null);
log('type arg: '+type);
}
var data=getResponse(xhr,type,s);
if(data&&data.documentElement&&data.documentElement.nodeName!='parsererror'){
$.taconite(data);
}
else if(typeof data=='string'){
if(/taconite/.test(data))
$.taconite(data);
}
else{
log('jQuery core httpData returned: '+data);
log('httpData: response is not XML (or not "valid" XML)');
}
return data;
}
$.ajaxPrefilter&&$.ajaxPrefilter(function(options,originalOptions,jqXHR){
jqXHR.success(function(data,status,jqXHR){
if($.taconite.autodetect)
detect(jqXHR,options.dataType,options);
});
});
var origHttpData=$.httpData;
if($.httpData)
$.httpData=detect;
var parsers={'json':jsonParser};
$.taconite.registerParser=function(type,fn){
parsers[type]=fn;
};
function parseRawData(type,data){
var d=data,parser=parsers[type];
if($.isFunction(parser))
d=parser(data);
$.event.trigger('taconite-rawdata-notify',[type,d,data]);
return d;
}
function jsonParser(json){
return parseJSON(json);
}
function processDoc(xml){
var status=true,ex;
try{
if(typeof xml=='string')
xml=convert(xml);
if(!xml){
log('$.taconite invoked without valid document; nothing to process');
return false;
}
var root=xml.documentElement.tagName;
log('XML document root: ',root);
var taconiteDoc=$('taconite',xml)[0];
if(!taconiteDoc){
log('document does not contain <taconite> element; nothing to process');
return false;
}
$.event.trigger('taconite-begin-notify',[taconiteDoc]);
status=go(taconiteDoc);
}catch(e){
status=ex=e;
}
$.event.trigger('taconite-complete-notify',[xml,!!status,status===true?null:status]);
if(ex)
throw ex;
}
function convert(s){
var doc;
log('attempting string to document conversion');
try{
if(window.DOMParser){
var parser=new DOMParser();
doc=parser.parseFromString(s,'text/xml');
}
else{
doc=$("<xml>")[0];
doc.async='false';
doc.loadXML(s);
}
}
catch(e){
if(window.console&&window.console.error)
window.console.error('[taconite] ERROR parsing XML string for conversion: '+e);
throw e;
}
var ok=doc&&doc.documentElement&&doc.documentElement.tagName!='parsererror';
log('conversion ',ok?'successful!':'FAILED');
return doc;
}
function go(xml){
try{
var t=new Date().getTime();
process(xml.childNodes);
$.taconite.lastTime=(new Date().getTime())-t;
log('time to process response: '+$.taconite.lastTime+'ms');
}catch(e){
if(window.console&&window.console.error)
window.console.error('[taconite] ERROR processing document: '+e);
throw e;
}
return true;
}
function process(commands){
var trimHash={wrap:1};
var doPostProcess=0;
var a,n,v,i,j,js,els,raw,type,q,jq,cdataWrap;
for(i=0;i<commands.length;i++){
if(commands[i].nodeType!=1)
continue;
var cmdNode=commands[i],cmd=cmdNode.tagName;
if(cmd=='eval'){
js=(cmdNode.firstChild?cmdNode.firstChild.nodeValue:null);
log('invoking "eval" command: ',js);
if(js)
$.globalEval(js);
continue;
}
if(cmd=='rawData'){
raw=(cmdNode.firstChild?cmdNode.firstChild.nodeValue:null);
type=cmdNode.getAttribute('type');
log('rawData ('+type+'): ',raw);
parseRawData(type,raw);
continue;
}
q=cmdNode.getAttribute('select');
jq=$(q);
if(!jq[0]){
log('No matching targets for selector: ',q);
continue;
}
cdataWrap=cmdNode.getAttribute('cdataWrap')||$.taconite.defaults.cdataWrap;
a=[];
if(cmdNode.childNodes.length>0){
doPostProcess=1;
for(j=0,els=[];j<cmdNode.childNodes.length;j++)
els[j]=createNode(cmdNode.childNodes[j],cdataWrap);
a.push(trimHash[cmd]?cleanse(els):els);
}
n=cmdNode.getAttribute('name');
v=cmdNode.getAttribute('value');
if(n!==null)a.push(n);
if(v!==null)a.push(v);
for(var j=1;true;j++){
v=cmdNode.getAttribute('arg'+j);
if(v===null)
break;
if(v.length){
var n=Number(v);
if(v==n)
v=n;
}
a.push(v);
}
$.taconite.debug&&logCommand(q,cmd,a,els);
jq[cmd].apply(jq,a);
}
doPostProcess&&postProcess();
}
function logCommand(q,cmd,a,els){
var args='...';
if(!els){
args='';
for(var k=0,val=a[0];k<a.length,val=a[k];k++){
k>0&&(args+=',');
typeof val=='string'?(args+=("'"+val+"'")):(args+=val);
}
}
log("invoking command: $('",q,"').",cmd,'('+args+')');
}
function postProcess(){
if($.browser.mozilla)return;
$('select:taconiteTag').each(function(){
var sel=this;
$('option:taconiteTag',this).each(function(){
this.setAttribute('selected','selected');
this.taconiteTag=null;
if(sel.type=='select-one'){
var idx=$('option',sel).index(this);
sel.selectedIndex=idx;
}
});
this.taconiteTag=null;
});
}
function cleanse(els){
for(var i=0,a=[];i<els.length;i++)
if(els[i].nodeType==1)a.push(els[i]);
return a;
}
function createNode(node,cdataWrap){
var type=node.nodeType;
if(type==1)return createElement(node,cdataWrap);
if(type==3)return fixTextNode(node.nodeValue);
if(type==4)return handleCDATA(node.nodeValue,cdataWrap);
return null;
}
function handleCDATA(s,cdataWrap){
var el=document.createElement(cdataWrap);
var $el=$(el)[cdataWrap=='script'?'text':'html'](s);
var $ch=$el.children();
if($ch.size()==1)
return $ch[0];
return el;
}
function fixTextNode(s){
if($.browser.msie)s=s.replace(/\n/g,'\r').replace(/\s+/g,' ');
return document.createTextNode(s);
}
function createElement(node,cdataWrap){
var e,tag=node.tagName.toLowerCase();
if($.browser.msie&&$.browser.version<9){
var type=node.getAttribute('type');
if(tag=='table'||type=='radio'||type=='checkbox'||tag=='button'||
(tag=='select'&&node.getAttribute('multiple'))){
e=document.createElement('<'+tag+' '+copyAttrs(null,node,true)+'>');
}
}
if(!e){
e=document.createElement(tag);
copyAttrs(e,node);
}
if($.browser.msie&&tag=='td'){
var colspan=node.getAttribute('colspan');
if(colspan)e.colSpan=parseInt(colspan);
}
if($.browser.msie&&!e.canHaveChildren){
if(node.childNodes.length>0)
e.text=node.text;
}
else{
for(var i=0,max=node.childNodes.length;i<max;i++){
var child=createNode(node.childNodes[i],cdataWrap);
if(child)e.appendChild(child);
}
}
if(!$.browser.mozilla){
if(tag=='select'||(tag=='option'&&node.getAttribute('selected')))
e.taconiteTag=1;
}
return e;
}
function copyAttrs(dest,src,inline){
for(var i=0,attr='';i<src.attributes.length;i++){
var a=src.attributes[i],n=$.trim(a.name),v=$.trim(a.value);
if(inline)attr+=(n+'="'+v+'" ');
else if(n=='style'){
dest.style.cssText=v;
dest.setAttribute(n,v);
}
else $.attr(dest,n,v);
}
return attr;
}
})(jQuery);
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'1a\']=h.i[\'z\'];h.O(h.i,{y:\'D\',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce'.split('|'),0,{}))
;(function($){
var tmp,loading,overlay,wrap,outer,content,close,title,nav_left,nav_right,
selectedIndex=0,selectedOpts={},selectedArray=[],currentIndex=0,currentOpts={},currentArray=[],
ajaxLoader=null,imgPreloader=new Image(),imgRegExp=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,swfRegExp=/[^\.]\.(swf)\s*$/i,
loadingTimer,loadingFrame=1,
titleHeight=0,titleStr='',start_pos,final_pos,busy=false,fx=$.extend($('<div/>')[0],{prop:0}),
isIE6=$.browser.msie&&$.browser.version<7&&!window.XMLHttpRequest,
_abort=function(){
loading.hide();
imgPreloader.onerror=imgPreloader.onload=null;
if(ajaxLoader){
ajaxLoader.abort();
}
tmp.empty();
},
_error=function(){
if(false===selectedOpts.onError(selectedArray,selectedIndex,selectedOpts)){
loading.hide();
busy=false;
return;
}
selectedOpts.titleShow=false;
selectedOpts.width='auto';
selectedOpts.height='auto';
tmp.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
_process_inline();
},
_start=function(){
var obj=selectedArray[selectedIndex],
href,
type,
title,
str,
emb,
ret;
_abort();
selectedOpts=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data('fancybox')=='undefined'?selectedOpts:$(obj).data('fancybox')));
ret=selectedOpts.onStart(selectedArray,selectedIndex,selectedOpts);
if(ret===false){
busy=false;
return;
}else if(typeof ret=='object'){
selectedOpts=$.extend(selectedOpts,ret);
}
title=selectedOpts.title||(obj.nodeName?$(obj).attr('title'):obj.title)||'';
if(obj.nodeName&&!selectedOpts.orig){
selectedOpts.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(title===''&&selectedOpts.orig&&selectedOpts.titleFromAlt){
title=selectedOpts.orig.attr('alt');
}
href=selectedOpts.href||(obj.nodeName?$(obj).attr('href'):obj.href)||null;
if((/^(?:javascript)/i).test(href)||href=='#'){
href=null;
}
if(selectedOpts.type){
type=selectedOpts.type;
if(!href){
href=selectedOpts.content;
}
}else if(selectedOpts.content){
type='html';
}else if(href){
if(href.match(imgRegExp)){
type='image';
}else if(href.match(swfRegExp)){
type='swf';
}else if($(obj).hasClass("iframe")){
type='iframe';
}else if(href.indexOf("#")===0){
type='inline';
}else{
type='ajax';
}
}
if(!type){
_error();
return;
}
if(type=='inline'){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?'inline':'ajax';
}
selectedOpts.type=type;
selectedOpts.href=href;
selectedOpts.title=title;
if(selectedOpts.autoDimensions){
if(selectedOpts.type=='html'||selectedOpts.type=='inline'||selectedOpts.type=='ajax'){
selectedOpts.width='auto';
selectedOpts.height='auto';
}else{
selectedOpts.autoDimensions=false;
}
}
if(selectedOpts.modal){
selectedOpts.overlayShow=true;
selectedOpts.hideOnOverlayClick=false;
selectedOpts.hideOnContentClick=false;
selectedOpts.enableEscapeButton=false;
selectedOpts.showCloseButton=false;
}
selectedOpts.padding=parseInt(selectedOpts.padding,10);
selectedOpts.margin=parseInt(selectedOpts.margin,10);
tmp.css('padding',(selectedOpts.padding+selectedOpts.margin));
$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change',function(){
$(this).replaceWith(content.children());
});
switch(type){
case'html':
tmp.html(selectedOpts.content);
_process_inline();
break;
case'inline':
if($(obj).parent().is('#fancybox-content')===true){
busy=false;
return;
}
$('<div class="fancybox-inline-tmp" />')
.hide()
.insertBefore($(obj))
.bind('fancybox-cleanup',function(){
$(this).replaceWith(content.children());
}).bind('fancybox-cancel',function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_process_inline();
break;
case'image':
busy=false;
$.fancybox.showActivity();
imgPreloader=new Image();
imgPreloader.onerror=function(){
_error();
};
imgPreloader.onload=function(){
busy=true;
imgPreloader.onerror=imgPreloader.onload=null;
_process_image();
};
imgPreloader.src=href;
break;
case'swf':
selectedOpts.scrolling='no';
str='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+selectedOpts.width+'" height="'+selectedOpts.height+'"><param name="movie" value="'+href+'"></param>';
emb='';
$.each(selectedOpts.swf,function(name,val){
str+='<param name="'+name+'" value="'+val+'"></param>';
emb+=' '+name+'="'+val+'"';
});
str+='<embed src="'+href+'" type="application/x-shockwave-flash" width="'+selectedOpts.width+'" height="'+selectedOpts.height+'"'+emb+'></embed></object>';
tmp.html(str);
_process_inline();
break;
case'ajax':
busy=false;
$.fancybox.showActivity();
selectedOpts.ajax.win=selectedOpts.ajax.success;
ajaxLoader=$.ajax($.extend({},selectedOpts.ajax,{
url:href,
data:selectedOpts.ajax.data||{},
error:function(XMLHttpRequest,textStatus,errorThrown){
if(XMLHttpRequest.status>0){
_error();
}
},
success:function(data,textStatus,XMLHttpRequest){
var o=typeof XMLHttpRequest=='object'?XMLHttpRequest:ajaxLoader;
if(o.status==200){
if(typeof selectedOpts.ajax.win=='function'){
ret=selectedOpts.ajax.win(href,data,textStatus,XMLHttpRequest);
if(ret===false){
loading.hide();
return;
}else if(typeof ret=='string'||typeof ret=='object'){
data=ret;
}
}
tmp.html(data);
_process_inline();
}
}
}));
break;
case'iframe':
_show();
break;
}
},
_process_inline=function(){
var
w=selectedOpts.width,
h=selectedOpts.height;
if(w.toString().indexOf('%')>-1){
w=parseInt(($(window).width()-(selectedOpts.margin*2))*parseFloat(w)/100,10)+'px';
}else{
w=w=='auto'?'auto':w+'px';
}
if(h.toString().indexOf('%')>-1){
h=parseInt(($(window).height()-(selectedOpts.margin*2))*parseFloat(h)/100,10)+'px';
}else{
h=h=='auto'?'auto':h+'px';
}
tmp.wrapInner('<div style="width:'+w+';height:'+h+';overflow: '+(selectedOpts.scrolling=='auto'?'auto':(selectedOpts.scrolling=='yes'?'scroll':'hidden'))+';position:relative;"></div>');
selectedOpts.width=tmp.width();
selectedOpts.height=tmp.height();
_show();
},
_process_image=function(){
selectedOpts.width=imgPreloader.width;
selectedOpts.height=imgPreloader.height;
$("<img />").attr({
'id':'fancybox-img',
'src':imgPreloader.src,
'alt':selectedOpts.title
}).appendTo(tmp);
_show();
},
_show=function(){
var pos,equal;
loading.hide();
if(wrap.is(":visible")&&false===currentOpts.onCleanup(currentArray,currentIndex,currentOpts)){
$.event.trigger('fancybox-cancel');
busy=false;
return;
}
busy=true;
$(content.add(overlay)).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind('keydown.fb');
if(wrap.is(":visible")&&currentOpts.titlePosition!=='outside'){
wrap.css('height',wrap.height());
}
currentArray=selectedArray;
currentIndex=selectedIndex;
currentOpts=selectedOpts;
if(currentOpts.overlayShow){
overlay.css({
'background-color':currentOpts.overlayColor,
'opacity':currentOpts.overlayOpacity,
'cursor':currentOpts.hideOnOverlayClick?'pointer':'auto',
'height':$(document).height(),
'width':$(document).width()
});
if(!overlay.is(':visible')){
if(isIE6){
$('select:not(#fancybox-tmp select)').filter(function(){
return this.style.visibility!=='hidden';
}).css({'visibility':'hidden'}).one('fancybox-cleanup',function(){
this.style.visibility='inherit';
});
}
overlay.show();
}
}else{
overlay.hide();
}
final_pos=_get_zoom_to();
_process_title();
if(wrap.is(":visible")){
$(close.add(nav_left).add(nav_right)).hide();
pos=wrap.position(),
start_pos={
top:pos.top,
left:pos.left,
width:wrap.width(),
height:wrap.height()
};
equal=(start_pos.width==final_pos.width&&start_pos.height==final_pos.height);
content.fadeTo(currentOpts.changeFade,0.3,function(){
var finish_resizing=function(){
content.html(tmp.contents()).fadeTo(currentOpts.changeFade,1,_finish);
};
$.event.trigger('fancybox-change');
content
.empty()
.removeAttr('filter')
.css({
'border-width':currentOpts.padding,
'width':final_pos.width-currentOpts.padding*2,
'height':selectedOpts.autoDimensions?'auto':final_pos.height-titleHeight-currentOpts.padding*2
});
if(equal){
finish_resizing();
}else{
fx.prop=0;
$(fx).animate({prop:1},{
duration:currentOpts.changeSpeed,
easing:currentOpts.easingChange,
step:_draw,
complete:finish_resizing
});
}
});
return;
}
wrap.removeAttr("style");
content.css('border-width',currentOpts.padding);
if(currentOpts.transitionIn=='elastic'){
start_pos=_get_zoom_from();
content.html(tmp.contents());
wrap.show();
if(currentOpts.opacity){
final_pos.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{
duration:currentOpts.speedIn,
easing:currentOpts.easingIn,
step:_draw,
complete:_finish
});
return;
}
if(currentOpts.titlePosition=='inside'&&titleHeight>0){
title.show();
}
content
.css({
'width':final_pos.width-currentOpts.padding*2,
'height':selectedOpts.autoDimensions?'auto':final_pos.height-titleHeight-currentOpts.padding*2
})
.html(tmp.contents());
wrap
.css(final_pos)
.fadeIn(currentOpts.transitionIn=='none'?0:currentOpts.speedIn,_finish);
},
_format_title=function(title){
if(title&&title.length){
if(currentOpts.titlePosition=='float'){
return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+title+'</td><td id="fancybox-title-float-right"></td></tr></table>';
}
return'<div id="fancybox-title-'+currentOpts.titlePosition+'">'+title+'</div>';
}
return false;
},
_process_title=function(){
titleStr=currentOpts.title||'';
titleHeight=0;
title
.empty()
.removeAttr('style')
.removeClass();
if(currentOpts.titleShow===false){
title.hide();
return;
}
titleStr=$.isFunction(currentOpts.titleFormat)?currentOpts.titleFormat(titleStr,currentArray,currentIndex,currentOpts):_format_title(titleStr);
if(!titleStr||titleStr===''){
title.hide();
return;
}
title
.addClass('fancybox-title-'+currentOpts.titlePosition)
.html(titleStr)
.appendTo('body')
.show();
switch(currentOpts.titlePosition){
case'inside':
title
.css({
'width':final_pos.width-(currentOpts.padding*2),
'marginLeft':currentOpts.padding,
'marginRight':currentOpts.padding
});
titleHeight=title.outerHeight(true);
title.appendTo(outer);
final_pos.height+=titleHeight;
break;
case'over':
title
.css({
'marginLeft':currentOpts.padding,
'width':final_pos.width-(currentOpts.padding*2),
'bottom':currentOpts.padding
})
.appendTo(outer);
break;
case'float':
title
.css('left',parseInt((title.width()-final_pos.width-40)/2,10)*-1)
.appendTo(wrap);
break;
default:
title
.css({
'width':final_pos.width-(currentOpts.padding*2),
'paddingLeft':currentOpts.padding,
'paddingRight':currentOpts.padding
})
.appendTo(wrap);
break;
}
title.hide();
},
_set_navigation=function(){
if(currentOpts.enableEscapeButton||currentOpts.enableKeyboardNav){
$(document).bind('keydown.fb',function(e){
if(e.keyCode==27&&currentOpts.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else if((e.keyCode==37||e.keyCode==39)&&currentOpts.enableKeyboardNav&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='SELECT'){
e.preventDefault();
$.fancybox[e.keyCode==37?'prev':'next']();
}
});
}
if(!currentOpts.showNavArrows){
nav_left.hide();
nav_right.hide();
return;
}
if((currentOpts.cyclic&&currentArray.length>1)||currentIndex!==0){
nav_left.show();
}
if((currentOpts.cyclic&&currentArray.length>1)||currentIndex!=(currentArray.length-1)){
nav_right.show();
}
},
_finish=function(){
if(!$.support.opacity){
content.get(0).style.removeAttribute('filter');
wrap.get(0).style.removeAttribute('filter');
}
if(selectedOpts.autoDimensions){
content.css('height','auto');
}
wrap.css('height','auto');
if(titleStr&&titleStr.length){
title.show();
}
if(currentOpts.showCloseButton){
close.show();
}
_set_navigation();
if(currentOpts.hideOnContentClick){
content.bind('click',$.fancybox.close);
}
if(currentOpts.hideOnOverlayClick){
overlay.bind('click',$.fancybox.close);
}
$(window).bind("resize.fb",$.fancybox.resize);
if(currentOpts.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}
if(currentOpts.type=='iframe'){
$('<iframe id="fancybox-frame" name="fancybox-frame'+new Date().getTime()+'" frameborder="0" hspace="0" '+($.browser.msie?'allowtransparency="true""':'')+' scrolling="'+selectedOpts.scrolling+'" src="'+currentOpts.href+'"></iframe>').appendTo(content);
}
wrap.show();
busy=false;
$.fancybox.center();
currentOpts.onComplete(currentArray,currentIndex,currentOpts);
_preload_images();
},
_preload_images=function(){
var href,
objNext;
if((currentArray.length-1)>currentIndex){
href=currentArray[currentIndex+1].href;
if(typeof href!=='undefined'&&href.match(imgRegExp)){
objNext=new Image();
objNext.src=href;
}
}
if(currentIndex>0){
href=currentArray[currentIndex-1].href;
if(typeof href!=='undefined'&&href.match(imgRegExp)){
objNext=new Image();
objNext.src=href;
}
}
},
_draw=function(pos){
var dim={
width:parseInt(start_pos.width+(final_pos.width-start_pos.width)*pos,10),
height:parseInt(start_pos.height+(final_pos.height-start_pos.height)*pos,10),
top:parseInt(start_pos.top+(final_pos.top-start_pos.top)*pos,10),
left:parseInt(start_pos.left+(final_pos.left-start_pos.left)*pos,10)
};
if(typeof final_pos.opacity!=='undefined'){
dim.opacity=pos<0.5?0.5:pos;
}
wrap.css(dim);
content.css({
'width':dim.width-currentOpts.padding*2,
'height':dim.height-(titleHeight*pos)-currentOpts.padding*2
});
},
_get_viewport=function(){
var uagent=navigator.userAgent.toLowerCase();
if(uagent.search('ipad')>-1||uagent.search('iphone')>-1||uagent.search('ipod')>-1||uagent.search('android')>-1){
var viewportwidth;
var viewportheight;
if(typeof window.innerWidth!='undefined'){
viewportwidth=window.innerWidth;
viewportheight=window.innerHeight;
}else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){
viewportwidth=document.documentElement.clientWidth;
viewportheight=document.documentElement.clientHeight;
}else{
viewportwidth=document.getElementsByTagName('body')[0].clientWidth;
viewportheight=document.getElementsByTagName('body')[0].clientHeight;
}
return[
viewportwidth,
viewportheight,
$(document).scrollLeft(),
$(document).scrollTop()
];
}else{
return[
$(window).width()-(currentOpts.margin*2),
$(window).height()-(currentOpts.margin*2),
$(document).scrollLeft()+currentOpts.margin,
$(document).scrollTop()+currentOpts.margin
];
}
},
_get_zoom_to=function(){
var view=_get_viewport(),
to={},
resize=currentOpts.autoScale,
double_padding=currentOpts.padding*2,
ratio;
if(currentOpts.width.toString().indexOf('%')>-1){
to.width=parseInt((view[0]*parseFloat(currentOpts.width))/100,10);
}else{
to.width=currentOpts.width+double_padding;
}
if(currentOpts.height.toString().indexOf('%')>-1){
to.height=parseInt((view[1]*parseFloat(currentOpts.height))/100,10);
}else{
to.height=currentOpts.height+double_padding;
}
if(resize&&(to.width>view[0]||to.height>view[1])){
if(selectedOpts.type=='image'||selectedOpts.type=='swf'){
ratio=(currentOpts.width)/(currentOpts.height);
if((to.width)>view[0]){
to.width=view[0];
to.height=parseInt(((to.width-double_padding)/ratio)+double_padding,10);
}
if((to.height)>view[1]){
to.height=view[1];
to.width=parseInt(((to.height-double_padding)*ratio)+double_padding,10);
}
}else{
to.width=Math.min(to.width,view[0]);
to.height=Math.min(to.height,view[1]);
}
}
to.top=parseInt(Math.max(view[3]-20,view[3]+((view[1]-to.height-40)*0.5)),10);
to.left=parseInt(Math.max(view[2]-20,view[2]+((view[0]-to.width-40)*0.5)),10);
return to;
},
_get_obj_pos=function(obj){
var pos=obj.offset();
pos.top+=parseInt(obj.css('paddingTop'),10)||0;
pos.left+=parseInt(obj.css('paddingLeft'),10)||0;
pos.top+=parseInt(obj.css('border-top-width'),10)||0;
pos.left+=parseInt(obj.css('border-left-width'),10)||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},
_get_zoom_from=function(){
var orig=selectedOpts.orig?$(selectedOpts.orig):false,
from={},
pos,
view;
if(orig&&orig.length){
pos=_get_obj_pos(orig);
from={
width:pos.width+(currentOpts.padding*2),
height:pos.height+(currentOpts.padding*2),
top:pos.top-currentOpts.padding-20,
left:pos.left-currentOpts.padding-20
};
}else{
view=_get_viewport();
from={
width:currentOpts.padding*2,
height:currentOpts.padding*2,
top:parseInt(view[3]+view[1]*0.5,10),
left:parseInt(view[2]+view[0]*0.5,10)
};
}
return from;
},
_animate_loading=function(){
if(!loading.is(':visible')){
clearInterval(loadingTimer);
return;
}
$('div',loading).css('top',(loadingFrame*-40)+'px');
loadingFrame=(loadingFrame+1)%12;
};
$.fn.fancybox=function(options){
if(!$(this).length){
return this;
}
$(this)
.data('fancybox',$.extend({},options,($.metadata?$(this).metadata():{})))
.unbind('click.fb')
.bind('click.fb',function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
selectedArray=[];
selectedIndex=0;
var rel=$(this).attr('rel')||'';
if(!rel||rel==''||rel==='nofollow'){
selectedArray.push(this);
}else{
selectedArray=$("a[rel="+rel+"], area[rel="+rel+"]");
selectedIndex=selectedArray.index(this);
}
_start();
return;
});
return this;
};
$.fancybox=function(obj){
var opts;
if(busy){
return;
}
busy=true;
opts=typeof arguments[1]!=='undefined'?arguments[1]:{};
selectedArray=[];
selectedIndex=parseInt(opts.index,10)||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=='object'){
$(obj[i]).data('fancybox',$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data('fancybox',$.extend({content:obj[i]},opts));
}
}
selectedArray=jQuery.merge(selectedArray,obj);
}else{
if(typeof obj=='object'){
$(obj).data('fancybox',$.extend({},opts,obj));
}else{
obj=$({}).data('fancybox',$.extend({content:obj},opts));
}
selectedArray.push(obj);
}
if(selectedIndex>selectedArray.length||selectedIndex<0){
selectedIndex=0;
}
_start();
};
$.fancybox.showActivity=function(){
clearInterval(loadingTimer);
loading.show();
loadingTimer=setInterval(_animate_loading,66);
};
$.fancybox.hideActivity=function(){
loading.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(currentIndex+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(currentIndex-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos);
selectedArray=currentArray;
if(pos>-1&&pos<currentArray.length){
selectedIndex=pos;
_start();
}else if(currentOpts.cyclic&&currentArray.length>1){
selectedIndex=pos>=currentArray.length?0:currentArray.length-1;
_start();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger('fancybox-cancel');
_abort();
selectedOpts.onCancel(selectedArray,selectedIndex,selectedOpts);
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(':hidden')){
return;
}
busy=true;
if(currentOpts&&false===currentOpts.onCleanup(currentArray,currentIndex,currentOpts)){
busy=false;
return;
}
_abort();
$(close.add(nav_left).add(nav_right)).hide();
$(content.add(overlay)).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind('keydown.fb');
content.find('iframe').attr('src',isIE6&&/^https/i.test(window.location.href||'')?'javascript:void(false)':'about:blank');
if(currentOpts.titlePosition!=='inside'){
title.empty();
}
wrap.stop();
function _cleanup(){
overlay.fadeOut('fast');
title.empty().hide();
wrap.hide();
$.event.trigger('fancybox-cleanup');
content.empty();
currentOpts.onClosed(currentArray,currentIndex,currentOpts);
currentArray=selectedOpts=[];
currentIndex=selectedIndex=0;
currentOpts=selectedOpts={};
busy=false;
}
if(currentOpts.transitionOut=='elastic'){
start_pos=_get_zoom_from();
var pos=wrap.position();
final_pos={
top:pos.top,
left:pos.left,
width:wrap.width(),
height:wrap.height()
};
if(currentOpts.opacity){
final_pos.opacity=1;
}
title.empty().hide();
fx.prop=1;
$(fx).animate({prop:0},{
duration:currentOpts.speedOut,
easing:currentOpts.easingOut,
step:_draw,
complete:_cleanup
});
}else{
wrap.fadeOut(currentOpts.transitionOut=='none'?0:currentOpts.speedOut,_cleanup);
}
};
$.fancybox.resize=function(){
if(overlay.is(':visible')){
overlay.css('height',$(document).height());
}
$.fancybox.center(true);
};
$.fancybox.center=function(){
var view,align;
if(busy){
return;
}
align=arguments[0]===true?1:0;
view=_get_viewport();
if(!align&&(wrap.width()>view[0]||wrap.height()>view[1])){
return;
}
wrap
.stop()
.animate({
'top':parseInt(Math.max(view[3]-20,view[3]+((view[1]-content.height()-40)*0.5)-currentOpts.padding)),
'left':parseInt(Math.max(view[2]-20,view[2]+((view[0]-content.width()-40)*0.5)-currentOpts.padding))
},typeof arguments[0]=='number'?arguments[0]:200);
};
$.fancybox.init=function(){
if($("#fancybox-wrap").length){
return;
}
$('body').append(
tmp=$('<div id="fancybox-tmp"></div>'),
loading=$('<div id="fancybox-loading"><div></div></div>'),
overlay=$('<div id="fancybox-overlay"></div>'),
wrap=$('<div id="fancybox-wrap"></div>')
);
outer=$('<div id="fancybox-outer"></div>')
.append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>')
.appendTo(wrap);
outer.append(
content=$('<div id="fancybox-content"></div>'),
close=$('<a id="fancybox-close"></a>'),
title=$('<div id="fancybox-title"></div>'),
nav_left=$('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
nav_right=$('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
);
close.click($.fancybox.close);
loading.click($.fancybox.cancel);
nav_left.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
nav_right.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if($.fn.mousewheel){
wrap.bind('mousewheel.fb',function(e,delta){
if(busy){
e.preventDefault();
}else if($(e.target).get(0).clientHeight==0||$(e.target).get(0).scrollHeight===$(e.target).get(0).clientHeight){
e.preventDefault();
$.fancybox[delta>0?'prev':'next']();
}
});
}
if(!$.support.opacity){
wrap.addClass('fancybox-ie');
}
if(isIE6){
loading.addClass('fancybox-ie6');
wrap.addClass('fancybox-ie6');
$('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||'')?'javascript:void(false)':'about:blank')+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer);
}
};
$.fn.fancybox.defaults={
padding:10,
margin:40,
opacity:false,
modal:false,
cyclic:false,
scrolling:'auto',
width:560,
height:340,
autoScale:true,
autoDimensions:true,
centerOnScroll:false,
ajax:{},
swf:{wmode:'transparent'},
hideOnOverlayClick:true,
hideOnContentClick:false,
overlayShow:true,
overlayOpacity:0.7,
overlayColor:'#777',
titleShow:true,
titlePosition:'float',
titleFormat:null,
titleFromAlt:false,
transitionIn:'fade',
transitionOut:'fade',
speedIn:300,
speedOut:300,
changeSpeed:300,
changeFade:'fast',
easingIn:'swing',
easingOut:'swing',
showCloseButton:true,
showNavArrows:true,
enableEscapeButton:true,
enableKeyboardNav:true,
onStart:function(){},
onCancel:function(){},
onComplete:function(){},
onCleanup:function(){},
onClosed:function(){},
onError:function(){}
};
$(document).ready(function(){
$.fancybox.init();
});
})(jQuery);
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 Licensed under the MIT License (LICENSE.txt).

 Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 Thanks to: Seamus Leahy for adding deltaX and deltaY

 Version: 3.0.4

 Requires: 1.2.2+
*/
(function(d){function g(a){var b=a||window.event,i=[].slice.call(arguments,1),c=0,h=0,e=0;a=d.event.fix(b);a.type="mousewheel";if(a.wheelDelta)c=a.wheelDelta/120;if(a.detail)c=-a.detail/3;e=c;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){e=0;h=-1*c}if(b.wheelDeltaY!==undefined)e=b.wheelDeltaY/120;if(b.wheelDeltaX!==undefined)h=-1*b.wheelDeltaX/120;i.unshift(a,c,h,e);return d.event.handle.apply(this,i)}var f=["DOMMouseScroll","mousewheel"];d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=
f.length;a;)this.addEventListener(f[--a],g,false);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],g,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
(function(c){c.address=function(){var v=function(a){c(c.address).trigger(c.extend(c.Event(a),function(){for(var b={},e=c.address.parameterNames(),f=0,p=e.length;f<p;f++)b[e[f]]=c.address.parameter(e[f]);return{value:c.address.value(),path:c.address.path(),pathNames:c.address.pathNames(),parameterNames:e,parameters:b,queryString:c.address.queryString()}}.call(c.address)))},w=function(){c().bind.apply(c(c.address),Array.prototype.slice.call(arguments));return c.address},r=function(){return M.pushState&&
d.state!==k},s=function(){return("/"+g.pathname.replace(new RegExp(d.state),"")+g.search+(D()?"#"+D():"")).replace(U,"/")},D=function(){var a=g.href.indexOf("#");return a!=-1?B(g.href.substr(a+1),l):""},u=function(){return r()?s():D()},ha=function(){return"javascript"},N=function(a){a=a.toString();return(d.strict&&a.substr(0,1)!="/"?"/":"")+a},B=function(a,b){if(d.crawlable&&b)return(a!==""?"!":"")+a;return a.replace(/^\!/,"")},x=function(a,b){return parseInt(a.css(b),10)},V=function(a){for(var b,
e,f=0,p=a.childNodes.length;f<p;f++){try{if("src"in a.childNodes[f]&&a.childNodes[f].src)b=String(a.childNodes[f].src)}catch(J){}if(e=V(a.childNodes[f]))b=e}return b},F=function(){if(!K){var a=u();if(h!=a)if(y&&q<7)g.reload();else{y&&q<8&&d.history&&t(O,50);h=a;E(l)}}},E=function(a){v(W);v(a?X:Y);t(Z,10)},Z=function(){if(d.tracker!=="null"&&d.tracker!==null){var a=c.isFunction(d.tracker)?d.tracker:j[d.tracker],b=(g.pathname+g.search+(c.address&&!r()?c.address.value():"")).replace(/\/\//,"/").replace(/^\/$/,
"");if(c.isFunction(a))a(b);else if(c.isFunction(j.urchinTracker))j.urchinTracker(b);else if(j.pageTracker!==k&&c.isFunction(j.pageTracker._trackPageview))j.pageTracker._trackPageview(b);else j._gaq!==k&&c.isFunction(j._gaq.push)&&j._gaq.push(["_trackPageview",decodeURI(b)])}},O=function(){var a=ha()+":"+l+";document.open();document.writeln('<html><head><title>"+n.title.replace("'","\\'")+"</title><script>var "+C+' = "'+encodeURIComponent(u())+(n.domain!=g.hostname?'";document.domain="'+n.domain:
"")+"\";<\/script></head></html>');document.close();";if(q<7)m.src=a;else m.contentWindow.location.replace(a)},aa=function(){if(G&&$!=-1){var a,b=G.substr($+1).split("&");for(i=0;i<b.length;i++){a=b[i].split("=");if(/^(autoUpdate|crawlable|history|strict|wrap)$/.test(a[0]))d[a[0]]=isNaN(a[1])?/^(true|yes)$/i.test(a[1]):parseInt(a[1],10)!==0;if(/^(state|tracker)$/.test(a[0]))d[a[0]]=a[1]}G=null}h=u()},ca=function(){if(!ba){ba=o;aa();var a=function(){ia.call(this);ja.call(this)},b=c("body").ajaxComplete(a);
a();if(d.wrap){c("body > *").wrapAll('<div style="padding:'+(x(b,"marginTop")+x(b,"paddingTop"))+"px "+(x(b,"marginRight")+x(b,"paddingRight"))+"px "+(x(b,"marginBottom")+x(b,"paddingBottom"))+"px "+(x(b,"marginLeft")+x(b,"paddingLeft"))+'px;" />').parent().wrap('<div id="'+C+'" style="height:100%;overflow:auto;position:relative;'+(H&&!window.statusbar.visible?"resize:both;":"")+'" />');c("html, body").css({height:"100%",margin:0,padding:0,overflow:"hidden"});H&&c('<style type="text/css" />').appendTo("head").text("#"+
C+"::-webkit-resizer { background-color: #fff; }")}if(y&&q<8){a=n.getElementsByTagName("frameset")[0];m=n.createElement((a?"":"i")+"frame");if(a){a.insertAdjacentElement("beforeEnd",m);a[a.cols?"cols":"rows"]+=",0";m.noResize=o;m.frameBorder=m.frameSpacing=0}else{m.style.display="none";m.style.width=m.style.height=0;m.tabIndex=-1;n.body.insertAdjacentElement("afterBegin",m)}t(function(){c(m).bind("load",function(){var e=m.contentWindow;h=e[C]!==k?e[C]:"";if(h!=u()){E(l);g.hash=B(h,o)}});m.contentWindow[C]===
k&&O()},50)}t(function(){v("init");E(l)},1);if(!r())if(y&&q>7||!y&&"on"+I in j)if(j.addEventListener)j.addEventListener(I,F,l);else j.attachEvent&&j.attachEvent("on"+I,F);else ka(F,50)}},ia=function(){var a,b=c("a"),e=b.size(),f=-1,p=function(){if(++f!=e){a=c(b.get(f));a.is('[rel*="address:"]')&&a.address();t(p,1)}};t(p,1)},la=function(){if(h!=u()){h=u();E(l)}},ma=function(){if(j.removeEventListener)j.removeEventListener(I,F,l);else j.detachEvent&&j.detachEvent("on"+I,F)},ja=function(){if(d.crawlable){var a=
g.pathname.replace(/\/$/,"");c("body").html().indexOf("_escaped_fragment_")!=-1&&c('a[href]:not([href^=http]), a[href*="'+document.domain+'"]').each(function(){var b=c(this).attr("href").replace(/^http:/,"").replace(new RegExp(a+"/?$"),"");if(b===""||b.indexOf("_escaped_fragment_")!=-1)c(this).attr("href","#"+b.replace(/\/(.*)\?_escaped_fragment_=(.*)$/,"!$2"))})}},k,C="jQueryAddress",I="hashchange",W="change",X="internalChange",Y="externalChange",o=true,l=false,d={autoUpdate:o,crawlable:l,history:o,
strict:o,wrap:l},z=c.browser,q=parseFloat(c.browser.version),da=z.mozilla,y=z.msie,ea=z.opera,H=z.webkit||z.safari,P=l,j=function(){try{return top.document!==k?top:window}catch(a){return window}}(),n=j.document,M=j.history,g=j.location,ka=setInterval,t=setTimeout,U=/\/{2,9}/g;z=navigator.userAgent;var m,G=V(document),$=G?G.indexOf("?"):-1,Q=n.title,K=l,ba=l,R=o,fa=o,L=l,h=u();if(y){q=parseFloat(z.substr(z.indexOf("MSIE")+4));if(n.documentMode&&n.documentMode!=q)q=n.documentMode!=8?7:8;var ga=n.onpropertychange;
n.onpropertychange=function(){ga&&ga.call(n);if(n.title!=Q&&n.title.indexOf("#"+u())!=-1)n.title=Q}}if(P=da&&q>=1||y&&q>=6||ea&&q>=9.5||H&&q>=523){if(ea)history.navigationMode="compatible";if(document.readyState=="complete")var na=setInterval(function(){if(c.address){ca();clearInterval(na)}},50);else{aa();c(ca)}c(window).bind("popstate",la).bind("unload",ma)}else!P&&D()!==""?g.replace(g.href.substr(0,g.href.indexOf("#"))):Z();return{bind:function(a,b,e){return w(a,b,e)},init:function(a){return w("init",
a)},change:function(a){return w(W,a)},internalChange:function(a){return w(X,a)},externalChange:function(a){return w(Y,a)},baseURL:function(){var a=g.href;if(a.indexOf("#")!=-1)a=a.substr(0,a.indexOf("#"));if(/\/$/.test(a))a=a.substr(0,a.length-1);return a},autoUpdate:function(a){if(a!==k){d.autoUpdate=a;return this}return d.autoUpdate},crawlable:function(a){if(a!==k){d.crawlable=a;return this}return d.crawlable},history:function(a){if(a!==k){d.history=a;return this}return d.history},state:function(a){if(a!==
k){d.state=a;var b=s();if(d.state!==k)if(M.pushState)b.substr(0,3)=="/#/"&&g.replace(d.state.replace(/^\/$/,"")+b.substr(2));else b!="/"&&b.replace(/^\/#/,"")!=D()&&t(function(){g.replace(d.state.replace(/^\/$/,"")+"/#"+b)},1);return this}return d.state},strict:function(a){if(a!==k){d.strict=a;return this}return d.strict},tracker:function(a){if(a!==k){d.tracker=a;return this}return d.tracker},wrap:function(a){if(a!==k){d.wrap=a;return this}return d.wrap},update:function(){L=o;this.value(h);L=l;return this},
title:function(a){if(a!==k){t(function(){Q=n.title=a;if(fa&&m&&m.contentWindow&&m.contentWindow.document){m.contentWindow.document.title=a;fa=l}if(!R&&da)g.replace(g.href.indexOf("#")!=-1?g.href:g.href+"#");R=l},50);return this}return n.title},value:function(a){if(a!==k){a=N(a);if(a=="/")a="";if(h==a&&!L)return;R=o;h=a;if(d.autoUpdate||L){E(o);if(r())M[d.history?"pushState":"replaceState"]({},"",d.state.replace(/\/$/,"")+(h===""?"/":h));else{K=o;if(H)if(d.history)g.hash="#"+B(h,o);else g.replace("#"+
B(h,o));else if(h!=u())if(d.history)g.hash="#"+B(h,o);else g.replace("#"+B(h,o));y&&q<8&&d.history&&t(O,50);if(H)t(function(){K=l},1);else K=l}}return this}if(!P)return null;return N(h)},path:function(a){if(a!==k){var b=this.queryString(),e=this.hash();this.value(a+(b?"?"+b:"")+(e?"#"+e:""));return this}return N(h).split("#")[0].split("?")[0]},pathNames:function(){var a=this.path(),b=a.replace(U,"/").split("/");if(a.substr(0,1)=="/"||a.length===0)b.splice(0,1);a.substr(a.length-1,1)=="/"&&b.splice(b.length-
1,1);return b},queryString:function(a){if(a!==k){var b=this.hash();this.value(this.path()+(a?"?"+a:"")+(b?"#"+b:""));return this}a=h.split("?");return a.slice(1,a.length).join("?").split("#")[0]},parameter:function(a,b,e){var f,p;if(b!==k){var J=this.parameterNames();p=[];b=b?b.toString():"";for(f=0;f<J.length;f++){var S=J[f],A=this.parameter(S);if(typeof A=="string")A=[A];if(S==a)A=b===null||b===""?[]:e?A.concat([b]):[b];for(var T=0;T<A.length;T++)p.push(S+"="+A[T])}c.inArray(a,J)==-1&&b!==null&&
b!==""&&p.push(a+"="+b);this.queryString(p.join("&"));return this}if(b=this.queryString()){e=[];p=b.split("&");for(f=0;f<p.length;f++){b=p[f].split("=");b[0]==a&&e.push(b.slice(1).join("="))}if(e.length!==0)return e.length!=1?e:e[0]}},parameterNames:function(){var a=this.queryString(),b=[];if(a&&a.indexOf("=")!=-1){a=a.split("&");for(var e=0;e<a.length;e++){var f=a[e].split("=")[0];c.inArray(f,b)==-1&&b.push(f)}}return b},hash:function(a){if(a!==k){this.value(h.split("#")[0]+(a?"#"+a:""));return this}a=
h.split("#");return a.slice(1,a.length).join("#")}}}();c.fn.address=function(v){if(!c(this).attr("address")){var w=function(r){if(r.shiftKey||r.ctrlKey||r.metaKey)return true;if(c(this).is("a")){var s=v?v.call(this):/address:/.test(c(this).attr("rel"))?c(this).attr("rel").split("address:")[1].split(" ")[0]:c.address.state()!==undefined&&c.address.state()!="/"?c(this).attr("href").replace(new RegExp("^(.*"+c.address.state()+"|\\.)"),""):c(this).attr("href").replace(/^(#\!?|\.)/,"");c.address.value(s);
r.preventDefault()}};c(this).click(w).live("click",w).live("submit",function(r){if(c(this).is("form")){var s=c(this).attr("action");s=v?v.call(this):(s.indexOf("?")!=-1?s.replace(/&$/,""):s+"?")+c(this).serialize();c.address.value(s);r.preventDefault()}}).attr("address",true)}return this}})(jQuery);
/*!
  jQuery blockUI plugin
  Version 2.39 (23-MAY-2011)
  @requires jQuery v1.2.3 or later
 
  Examples at: http://malsup.com/jquery/block/
  Copyright (c) 2007-2010 M. Alsup
  Dual licensed under the MIT and GPL licenses:
  http://www.opensource.org/licenses/mit-license.php
  http://www.gnu.org/licenses/gpl.html
 
  Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
;(function($){
if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)){
alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);
return;
}
$.fn._fadeIn=$.fn.fadeIn;
var noOp=function(){};
var mode=document.documentMode||0;
var setExpr=$.browser.msie&&(($.browser.version<8&&!mode)||mode<8);
var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!mode;
$.blockUI=function(opts){install(window,opts);};
$.unblockUI=function(opts){remove(window,opts);};
$.growlUI=function(title,message,timeout,onClose){
var $m=$('<div class="growlUI"></div>');
if(title)$m.append('<h1>'+title+'</h1>');
if(message)$m.append('<h2>'+message+'</h2>');
if(timeout==undefined)timeout=3000;
$.blockUI({
message:$m,fadeIn:700,fadeOut:1000,centerY:false,
timeout:timeout,showOverlay:false,
onUnblock:onClose,
css:$.blockUI.defaults.growlCSS
});
};
$.fn.block=function(opts){
return this.unblock({fadeOut:0}).each(function(){
if($.css(this,'position')=='static')
this.style.position='relative';
if($.browser.msie)
this.style.zoom=1;
install(this,opts);
});
};
$.fn.unblock=function(opts){
return this.each(function(){
remove(this,opts);
});
};
$.blockUI.version=2.39;
$.blockUI.defaults={
message:'<h1>Please wait...</h1>',
title:null,
draggable:true,
theme:false,
css:{
padding:0,
margin:0,
width:'30%',
top:'40%',
left:'35%',
textAlign:'center',
color:'#000',
border:'3px solid #aaa',
backgroundColor:'#fff',
cursor:'wait'
},
themedCSS:{
width:'30%',
top:'40%',
left:'35%'
},
overlayCSS:{
backgroundColor:'#000',
opacity:0.6,
cursor:'wait'
},
growlCSS:{
width:'350px',
top:'10px',
left:'',
right:'10px',
border:'none',
padding:'5px',
opacity:0.6,
cursor:'default',
color:'#fff',
backgroundColor:'#000',
'-webkit-border-radius':'10px',
'-moz-border-radius':'10px',
'border-radius':'10px'
},
iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',
forceIframe:false,
baseZ:1000,
centerX:true,
centerY:true,
allowBodyStretch:true,
bindEvents:true,
constrainTabKey:true,
fadeIn:200,
fadeOut:400,
timeout:0,
showOverlay:true,
focusInput:true,
applyPlatformOpacityRules:true,
onBlock:null,
onUnblock:null,
quirksmodeOffsetHack:4,
blockMsgClass:'blockMsg'
};
var pageBlock=null;
var pageBlockEls=[];
function install(el,opts){
var full=(el==window);
var msg=opts&&opts.message!==undefined?opts.message:undefined;
opts=$.extend({},$.blockUI.defaults,opts||{});
opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});
var css=$.extend({},$.blockUI.defaults.css,opts.css||{});
var themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});
msg=msg===undefined?opts.message:msg;
if(full&&pageBlock)
remove(window,{fadeOut:0});
if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){
var node=msg.jquery?msg[0]:msg;
var data={};
$(el).data('blockUI.history',data);
data.el=node;
data.parent=node.parentNode;
data.display=node.style.display;
data.position=node.style.position;
if(data.parent)
data.parent.removeChild(node);
}
$(el).data('blockUI.onUnblock',opts.onUnblock);
var z=opts.baseZ;
var lyr1=($.browser.msie||opts.forceIframe)
?$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
:$('<div class="blockUI" style="display:none"></div>');
var lyr2=opts.theme
?$('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(z++)+';display:none"></div>')
:$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
var lyr3,s;
if(opts.theme&&full){
s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">'+
'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+
'<div class="ui-widget-content ui-dialog-content"></div>'+
'</div>';
}
else if(opts.theme){
s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">'+
'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+
'<div class="ui-widget-content ui-dialog-content"></div>'+
'</div>';
}
else if(full){
s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';
}
else{
s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';
}
lyr3=$(s);
if(msg){
if(opts.theme){
lyr3.css(themedCSS);
lyr3.addClass('ui-widget-content');
}
else
lyr3.css(css);
}
if(!opts.theme&&(!opts.applyPlatformOpacityRules||!($.browser.mozilla&&/Linux/.test(navigator.platform))))
lyr2.css(opts.overlayCSS);
lyr2.css('position',full?'fixed':'absolute');
if($.browser.msie||opts.forceIframe)
lyr1.css('opacity',0.0);
var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);
$.each(layers,function(){
this.appendTo($par);
});
if(opts.theme&&opts.draggable&&$.fn.draggable){
lyr3.draggable({
handle:'.ui-dialog-titlebar',
cancel:'li'
});
}
var expr=setExpr&&(!$.boxModel||$('object,embed',full?null:el).length>0);
if(ie6||expr){
if(full&&opts.allowBodyStretch&&$.boxModel)
$('html,body').css('height','100%');
if((ie6||!$.boxModel)&&!full){
var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');
var fixT=t?'(0 - '+t+')':0;
var fixL=l?'(0 - '+l+')':0;
}
$.each([lyr1,lyr2,lyr3],function(i,o){
var s=o[0].style;
s.position='absolute';
if(i<2){
full?s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
:s.setExpression('height','this.parentNode.offsetHeight + "px"');
full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
:s.setExpression('width','this.parentNode.offsetWidth + "px"');
if(fixL)s.setExpression('left',fixL);
if(fixT)s.setExpression('top',fixT);
}
else if(opts.centerY){
if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
s.marginTop=0;
}
else if(!opts.centerY&&full){
var top=(opts.css&&opts.css.top)?parseInt(opts.css.top):0;
var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
s.setExpression('top',expression);
}
});
}
if(msg){
if(opts.theme)
lyr3.find('.ui-widget-content').append(msg);
else
lyr3.append(msg);
if(msg.jquery||msg.nodeType)
$(msg).show();
}
if(($.browser.msie||opts.forceIframe)&&opts.showOverlay)
lyr1.show();
if(opts.fadeIn){
var cb=opts.onBlock?opts.onBlock:noOp;
var cb1=(opts.showOverlay&&!msg)?cb:noOp;
var cb2=msg?cb:noOp;
if(opts.showOverlay)
lyr2._fadeIn(opts.fadeIn,cb1);
if(msg)
lyr3._fadeIn(opts.fadeIn,cb2);
}
else{
if(opts.showOverlay)
lyr2.show();
if(msg)
lyr3.show();
if(opts.onBlock)
opts.onBlock();
}
bind(1,el,opts);
if(full){
pageBlock=lyr3[0];
pageBlockEls=$(':input:enabled:visible',pageBlock);
if(opts.focusInput)
setTimeout(focus,20);
}
else
center(lyr3[0],opts.centerX,opts.centerY);
if(opts.timeout){
var to=setTimeout(function(){
full?$.unblockUI(opts):$(el).unblock(opts);
},opts.timeout);
$(el).data('blockUI.timeout',to);
}
};
function remove(el,opts){
var full=(el==window);
var $el=$(el);
var data=$el.data('blockUI.history');
var to=$el.data('blockUI.timeout');
if(to){
clearTimeout(to);
$el.removeData('blockUI.timeout');
}
opts=$.extend({},$.blockUI.defaults,opts||{});
bind(0,el,opts);
if(opts.onUnblock===null){
opts.onUnblock=$el.data('blockUI.onUnblock');
$el.removeData('blockUI.onUnblock');
}
var els;
if(full)
els=$('body').children().filter('.blockUI').add('body > .blockUI');
else
els=$('.blockUI',el);
if(full)
pageBlock=pageBlockEls=null;
if(opts.fadeOut){
els.fadeOut(opts.fadeOut);
setTimeout(function(){reset(els,data,opts,el);},opts.fadeOut);
}
else
reset(els,data,opts,el);
};
function reset(els,data,opts,el){
els.each(function(i,o){
if(this.parentNode)
this.parentNode.removeChild(this);
});
if(data&&data.el){
data.el.style.display=data.display;
data.el.style.position=data.position;
if(data.parent)
data.parent.appendChild(data.el);
$(el).removeData('blockUI.history');
}
if(typeof opts.onUnblock=='function')
opts.onUnblock(el,opts);
};
function bind(b,el,opts){
var full=el==window,$el=$(el);
if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))
return;
if(!full)
$el.data('blockUI.isBlocked',b);
if(!opts.bindEvents||(b&&!opts.showOverlay))
return;
var events='mousedown mouseup keydown keypress';
b?$(document).bind(events,opts,handler):$(document).unbind(events,handler);
};
function handler(e){
if(e.keyCode&&e.keyCode==9){
if(pageBlock&&e.data.constrainTabKey){
var els=pageBlockEls;
var fwd=!e.shiftKey&&e.target===els[els.length-1];
var back=e.shiftKey&&e.target===els[0];
if(fwd||back){
setTimeout(function(){focus(back)},10);
return false;
}
}
}
var opts=e.data;
if($(e.target).parents('div.'+opts.blockMsgClass).length>0)
return true;
return $(e.target).parents().children().filter('div.blockUI').length==0;
};
function focus(back){
if(!pageBlockEls)
return;
var e=pageBlockEls[back===true?pageBlockEls.length-1:0];
if(e)
e.focus();
};
function center(el,x,y){
var p=el.parentNode,s=el.style;
var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');
var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');
if(x)s.left=l>0?(l+'px'):'0';
if(y)s.top=t>0?(t+'px'):'0';
};
function sz(el,p){
return parseInt($.css(el,p))||0;
};
})(jQuery);

