/** 
 * jQuery ifixpng plugin Copyright (c) 2007 Kush M. 
 *  
 * Cookie plugin Copyright (c) 2006 Klaus Hartl (stilbuero.de) 
 * Both Plugins Dual licensed under the MIT and GPL licenses: 
 * http://www.opensource.org/licenses/mit-license.php 
 * http://www.gnu.org/licenses/gpl.html 
 *  
 */ 
jQuery.preloadImages=function(){for(var a=0;a<arguments.length;a++){jQuery("<img>").attr("src",arguments[a])}};(function(b){b.ifixpng=function(c){b.ifixpng.pixel=c};b.ifixpng.getPixel=function(){return b.ifixpng.pixel||"/images/pixel.gif"};var a={ltie7:b.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),filter:function(c){return"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src='"+c+"')"}};b.fn.ifixpng=a.ltie7?function(){return this.each(function(){var c=b(this);var f=false;if(c.is("img")||c.is("input")){if(c.attr("src")){if(c.attr("src").match(/.*\.png([?].*)?$/i)){var d=(f&&c.attr("src").substring(0,1)!="/")?f+c.attr("src"):c.attr("src");c.css({filter:a.filter(d),width:c.width(),height:c.height()}).attr({src:b.ifixpng.getPixel()}).positionFix()}}}else{var g=c.css("backgroundImage");if(g.match(/^url\(["']?(.*\.png([?].*)?)["']?\)$/i)){g=RegExp.$1;c.css({backgroundImage:"none",filter:a.filter(g)}).children().positionFix()}}})}:function(){return this};b.fn.iunfixpng=a.ltie7?function(){return this.each(function(){var c=b(this);var d=c.css("filter");if(d.match(/src=["']?(.*\.png([?].*)?)["']?/i)){d=RegExp.$1;if(c.is("img")||c.is("input")){c.attr({src:d}).css({filter:""})}else{c.css({filter:"",background:"url("+d+")"})}}})}:function(){return this};b.fn.positionFix=function(){return this.each(function(){var d=b(this);var c=d.css("position");if(c!="absolute"&&c!="relative"){d.css({position:"relative"})}})}})(jQuery);jQuery.cookie=function(b,k,n){if(typeof k!="undefined"){n=n||{};if(k===null){k="";n.expires=-1}var f="";if(n.expires&&(typeof n.expires=="number"||n.expires.toUTCString)){var g;if(typeof n.expires=="number"){g=new Date();g.setTime(g.getTime()+(n.expires*24*60*60*1000))}else{g=n.expires}f="; expires="+g.toUTCString()}var m=n.path?"; path="+n.path:"";var h=n.domain?"; domain="+n.domain:"";var a=n.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(k),f,m,h,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var l=document.cookie.split(";");for(var j=0;j<l.length;j++){var c=jQuery.trim(l[j]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};(function(d){var c=[];var b=false;var a=20;d.elReady=function(g,f){c.push({selector:g,func:f})};d.elReady.run=function(){var j=c.length;var f=false;for(var h=0;h<j;++h){if(typeof c[h].selector!="undefined"&&typeof c[h].func!="undefined"){var g=d(c[h].selector);if(g.length>0){c[h].func.apply(g);f=true}}else{f=true}if(f||b){c=c.slice(0,h).concat(c.slice(h+1));h=h-1;j=j-1}f=false}if(c.length>0||!b){window.setTimeout(d.elReady.run,a)}};d.elReady.init=function(){d(document).ready(function(){b=true});window.setTimeout(d.elReady.run,a)};d.elReady.init()})(jQuery);var searchLabel;var c1host="www.capitalone.com";var c1proto=window.location.protocol;if(window.location.hostname.search(/(?:qa|dev|local).*?\.capitalone\.com/)){c1host=window.location.hostname}var c1server=c1proto+"//"+c1host;var c1ZipCode={tbHeight:126,tbWidth:425,hover:false,direct:false,noPromptCookie:"nozip",goToUrl:"",regionalUrls:["/bank/(?!commercial|banking|services/online|index\\.php).*?","/banking/personal.*?","/checking-accounts.*?","/savings-accounts.*?","/certificates-deposit.*?",/*"/personalloans.*?",*/"/smallbusiness.*?","/contactus/index\\.php","/sitemap/index\\.php","/login\\.php"],askForZip:function(a){if(this.validZip()||window.c1zip==1){return true}this.goToUrl=a;var b="#TB_inline";var c="zipContent";tb_show(null,b+"?height="+this.tbHeight+"&width="+this.tbWidth+"&inlineId="+c+"&modal=true",false);jQuery("#zip_form input.zipCodeInput").focus();document.onkeyup=function(d){if(d==null){keycode=event.keyCode}else{keycode=d.which}if(keycode==27){c1ZipCode.rejectZip()}};return false},rejectZip:function(){jQuery.cookie(this.noPromptCookie,"true",{path:"/",domain:".capitalone.com"});tb_remove();window.location.assign(this.goToUrl);return false},submitZip:function(c){var a=window.c1zip;var b=null;window.c1zip=jQuery("#"+c+" input.zipCodeInput").val();if(!this.validZip()){if(c=="zip_form"){jQuery("span.tb_message").text("Please enter a valid five-digit ZIP Code.").css("fontWeight","bold").css("color","#f2cf6f")}else{jQuery("#ddMessage").text("ZIP Code must be five digits").css("fontWeight","bold").css("fontSize","10px").css("color","red")}window.c1zip=a;return false}else{if(window.location.hostname.search(/(?:pt-web|web|qa|dev|local|www|((kdc|pdc)staging)).*?\.capitalone\.com/)==-1){b=document.createElement("input");jQuery(b).attr("type","hidden").attr("name","exthost").attr("value",escape(window.location.href));jQuery("#"+c).append(b)}else{if(c1ZipCode.goToUrl==""){c1ZipCode.goToUrl=window.location.href}b=document.createElement("input");jQuery(b).attr("type","hidden").attr("name","dest").attr("value",escape(c1ZipCode.goToUrl));jQuery("#"+c).append(b);if(c1ZipCode.direct){inputDirect=document.createElement("input");jQuery(inputDirect).attr("type","hidden").attr("name","direct").attr("value","yes");jQuery("#"+c).append(inputDirect)}if(c=="change_zip"){jQuery.cookie("setzipcode","yes",{path:"/",domain:".capitalone.com"})}if(typeof tb_remove=="function"){tb_remove()}}}return true},validateLink:function(c){var f=new RegExp("((https?|ftp)://([^/]+))?(/[^?]*)?(\\?.*)?");var j=new RegExp("(?:"+c1ZipCode.regionalUrls.join("|")+")");var g=jQuery(c).attr("href");var b=f.exec(g);var i=jQuery(c).attr("rel");if(typeof i!="undefined"){if(i=="direct"){c1ZipCode.direct=true}else{if(i=="zipcode"){c1ZipCode.askForZip(g);return false}}}var a="";if(b.length>=5&&typeof b[4]=="string"){a=b[4]}if(b.length>=6&&typeof b[5]=="string"&&b[5].indexOf("capitalonehomeloans")!=-1){a+=b[5]}if(a.substr(a.length-1)=="/"){a+="index.php"}if(typeof a!="undefined"&&!(a.indexOf("open")!=-1&&a.indexOf("account")!=-1)&&a.indexOf("apply")==-1&&a.match(j)){if(a=="/"||a=="/indexa.php"||a=="/index.php"||a=="/bank/"||a=="/bank/index.php"){return}var h=window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"));var d=a.substr(0,a.lastIndexOf("/"));if(a.indexOf("banking.php")!=-1||h==""||h=="/contactus"||h=="/sitemap"||h!=d){c1ZipCode.askForZip(g);return false}}},validRegion:function(){if(typeof window.validRegion=="undefined"){return false}if(window.validRegion!==true){return false}return true},validZip:function(){if(typeof window.c1zip=="undefined"){return false}if(window.c1zip.constructor!=String){return false}if(/\d{5}/.test(window.c1zip)==false){return false}var a=parseInt(window.c1zip,10);if(a<500||a>99999){return false}return true}};jQuery.elReady("span.lobLogo img",function(){jQuery.ifixpng(c1proto+"//www.capitalone.com/images/https-common/spacer.gif");this.ifixpng()});jQuery.elReady(".globalNav dl.findProducts",function(){this.hover(function(){jQuery(this).addClass("findProductsOver")},function(){jQuery(this).removeClass("findProductsOver")})});jQuery.elReady(".globalNav dl.accessYourAccount",function(){this.hover(function(){jQuery(this).addClass("accessYourAccountOver")},function(){jQuery(this).removeClass("accessYourAccountOver")})});jQuery.elReady(".globalNav dl.customerService",function(){this.hover(function(){jQuery(this).addClass("customerServiceOver")},function(){jQuery(this).removeClass("customerServiceOver")})});jQuery.elReady(".globalNav dl.zipCode",function(){this.hover(function(){jQuery(this).addClass("zipCodeOver")},function(){jQuery(this).removeClass("zipCodeOver")})});jQuery.elReady("dl.zipCode dd",function(){this.mouseover(function(){c1ZipCode.hover=true});this.mouseout(function(){c1ZipCode.hover=false})});jQuery.elReady(".search_field",function(){var a=jQuery("#header #search label").remove().text();this.val(a);this.mouseover(function(){jQuery(".globalNav dl.customerService").removeClass("customerServiceOver");jQuery(".globalNav dl.zipCodeOver").removeClass("zipCodeOver")});this.focus(function(){jQuery(this).addClass("js-focus");if(this.value==a){jQuery(this).val("")}});this.blur(function(){jQuery(this).removeClass("js-focus");if(this.value==""){jQuery(this).val(a)}});jQuery("#c1-search-form").submit(function(){if(jQuery(".search_field").val()==a){jQuery(".search_field").val("")}if(typeof cg2!="undefined"){$(this).append('<input type="hidden" name="cg2" value="'+unescape(cg2)+'" />')}$(this).append('<input type="hidden" name="refer" value="'+encodeURI(location.href)+'" />')})});jQuery.elReady(".search_btn",function(){this.hover(function(){jQuery(this).addClass("js-hover")},function(){jQuery(this).removeClass("js-hover")})});jQuery.elReady("html",function(){this.click(function(){if(!c1ZipCode.hover){jQuery(".globalNav dl.zipCode").removeClass("zipCodeOver")}})});jQuery.elReady("#zipCode",function(){this.focus(function(){jQuery(this).addClass("js-focus");jQuery(".globalNav dl.zipCode").unbind();jQuery(".search_field").mouseover(function(){jQuery(".globalNav dl.customerService").removeClass("customerServiceOver")})});this.blur(function(){jQuery(this).removeClass("js-focus");jQuery(".globalNav dl.zipCode").hover(function(){jQuery(this).addClass("zipCodeOver")},function(){jQuery(this).removeClass("zipCodeOver")});jQuery(".search_field").mouseover(function(){jQuery(".globalNav dl.customerService").removeClass("customerServiceOver");jQuery(".globalNav dl.zipCodeOver").removeClass("zipCodeOver")})})});jQuery(document).ready(function(){if(!c1ZipCode.validZip()&&!c1ZipCode.validRegion()&&window.location.hostname.indexOf("capitalone.com")!=-1&&(document.cookie.indexOf(c1ZipCode.noPromptCookie)==-1||jQuery.cookie(c1ZipCode.noPromptCookie)!="true")&&typeof tb_show=="function"&&window.c1zip!==1){jQuery("a").click(function(){return c1ZipCode.validateLink(this)})}jQuery(".close").click(function(){c1ZipCode.rejectZip()});jQuery.preloadImages(c1server+"/images/presentation/header/zip_code_bg.png")});try{document.execCommand("BackgroundImageCache",false,true)}catch(e){};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 