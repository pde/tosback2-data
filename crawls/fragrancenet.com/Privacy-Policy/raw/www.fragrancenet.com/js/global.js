function getXMLHttpRequestObject(){var xmlhttp=false;try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(E){xmlhttp=false;}}
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
if(!xmlhttp&&window.createRequest){try{xmlhttp=window.createRequest();}catch(e){xmlhttp=false;}}
return xmlhttp;}
jQuery.fn.createTabs=function(opt){return this.each(function(){var container=$(this);var active=0;if(container.attr('id')=='fragFinderTabs'){var togglers=container.find('ul.togglersFF li');var tabs=container.find('.tabContentFF');}
else{var togglers=container.find('ul.togglers li');var tabs=container.find('.tabContent');}
function changeTab(i){if(!togglers.eq(i).hasClass('active')){togglers.eq(active).removeClass('active');togglers.eq(i).addClass('active');if(tabs.length==togglers.length){tabs.eq(active).removeClass('active');tabs.eq(i).addClass('active');}
active=i;}}
togglers.each(function(i){$(this).bind('click',{i:i},function(event){changeTab(event.data.i);return false;});});togglers.eq(active).addClass('active');tabs.eq(active).addClass('active');});};function browser(url){window.open(url);}
function kickOut(ele_id){$('#'+ele_id).css({display:'block','z-index':9999});$('#'+ele_id).addClass('active');}
function kickIn(ele_id){$('#'+ele_id).hide();$('#'+ele_id).removeClass('active');}
$(document).ready(function(){var id;$('div.trigCurrency').mouseenter(function(){id=$(this).attr('id');id=id.replace('currency','');kickOut('navCurrency'+id);}).mouseleave(function(){kickIn('navCurrency'+id);});$('#language').mouseenter(function(){kickOut('navLanguage');}).mouseleave(function(){kickIn('navLanguage');});});$(document).ready(function(){$('input[name=search]').eq(0).autocomplete({serviceUrl:document.location.protocol+'//'+document.location.hostname+':'+document.location.port+'/f/net/autocomplete_suggestions.html',minChars:3,width:190,deferRequestBy:20,onSelect:function(value,data,input){input.parent().parent().parent().submit();},fnFormatResult:formatACResult,zIndex:999});$('input[name=search]').eq(1).autocomplete({serviceUrl:document.location.protocol+'//'+document.location.hostname+':'+document.location.port+'/f/net/autocomplete_suggestions.html',minChars:3,width:190,deferRequestBy:20,onSelect:function(value,data,input){input.parent().parent().parent().submit();},fnFormatResult:formatACResult,zIndex:999});});function formatACResult(value,data,currentValue){var pattern='('+data.join(' ').replace(new RegExp('(\\'+['/','.','*','+','?','|','(',')','[',']','{','}','\\'].join('|\\')+')','g'),'\\$1')+')';var terms=pattern.split(' ');return value.replace(new RegExp('('+terms.join('|')+')','gi'),'<strong>$1<\/strong>');}
jQuery.fn.startSlideShow=function(opt){return this.each(function(){settings=jQuery.extend({speed:2000,interval:6000},opt);var slideshow=$(this);var numSlides=slideshow.find('img').length;var curSlide=0;var playing=false;function autoplay(){playing=setInterval(function(){changeSlide((curSlide+1)%numSlides);},settings.interval);}
function changeSlide(nextSlide){if(curSlide!=nextSlide){clearInterval(playing);playing=false;slideshow.find('img').eq(curSlide).fadeOut(settings.speed);slideshow.find('td').eq(curSlide).removeClass('active');slideshow.find('img').eq(nextSlide).fadeIn(settings.speed);slideshow.find('td').eq(nextSlide).addClass('active');curSlide=nextSlide;autoplay();}}
for(i=1;i<numSlides;i++){slideshow.find('img').eq(i).hide();}
for(i=0;i<numSlides;i++){slideshow.find('td').eq(i).bind('click',{slide:i},function(event){changeSlide(event.data.slide);});}
slideshow.find('td').eq(0).addClass('first active');slideshow.find('td').eq(-1).addClass('last');if(numSlides>1){autoplay();}});};function createPopUp(triggerSelector,popupSelector,autoTrigger){$(popupSelector).draggable({handle:'.t-bar'});$(triggerSelector).click(function(){$(popupSelector).css("top",(($(window).height()-$(popupSelector).outerHeight())/2));$(popupSelector).css("left",(($(window).width()-$(popupSelector).outerWidth())/2));$(popupSelector).show();return false;});$(popupSelector).click(function(e){e.stopPropagation();});$(popupSelector+' .t-bar .close').click(function(){$(popupSelector).hide();return false;});$(popupSelector+' .popBorder').append('<span class="side top"></span><span class="side right"></span>');$(popupSelector+' .popBorder').append('<span class="side bottom"></span><span class="side left"></span>');$(popupSelector+' .popBorder').append('<span class="corner topleft"></span><span class="corner topright"></span>');$(popupSelector+' .popBorder').append('<span class="corner bottomleft"></span><span class="corner bottomright"></span>');if(autoTrigger=='auto')
$(triggerSelector).click();}
$(document).click(function(e){$('.popup').hide();});function initPromisePopup(){$('#promiseTabs').createTabs();if($('a.fnetPromise').length>0){createPopUp('a.fnetPromise','#fnetPromise');$('a.fnetPromise').click(function(){if($(this).hasClass('tab1'))
$('#tabPromise1').click();if($(this).hasClass('tab2'))
$('#tabPromise2').click();if($(this).hasClass('tab3'))
$('#tabPromise3').click();if($(this).hasClass('tab4'))
$('#tabPromise4').click();if($(this).hasClass('tab5'))
$('#tabPromise5').click();});}}
function initUnboxedTesterPopup(trigger){$('#ubtTabs').createTabs();if($(trigger).length>0){createPopUp(trigger,'#unboxed_tester');$(trigger).click(function(){if($(this).hasClass('tabunboxed'))
$('#tabUbt1').click();if($(this).hasClass('tabtester'))
$('#tabUbt2').click();});}}
function submitShoppingSpree(host)
{var http_request=getXMLHttpRequestObject();if(!http_request)
return false;$('#shoppingSpreeName').css('color','#000');$('#shoppingSpreeEmail').css('color','#000');var name=document.getElementById('spree_name');var email=document.getElementById('spree_email');var favorite_fragrance=document.getElementById('spree_fav_frag');var gender='';for(var i=0;i<document.getElementById('spree').gender.length;i++)
{if(document.getElementById('spree').gender[i].checked==true)
{gender=document.getElementById('spree').gender[i].value;break;}}
if(validateEmail(email.value)&&name.value!='')
{var fields='&name='+escape(name.value);fields+='&email='+escape(email.value);fields+='&enter_contest=1';if(favorite_fragrance.value!=''){fields+='&fav_frag='+escape(favorite_fragrance.value);}
if(gender!=''){fields+='&gender='+gender;}
http_request.open('POST',window.location.protocol+'//'+host+'/f/net/contest.html',true);http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");http_request.setRequestHeader("Content-length",fields.length);http_request.setRequestHeader("Connection","close");http_request.send(fields);$('#shopping_spree_close').click();$('#shoppingSpree').hide();}
else
{if(name.value==''){$('#shoppingSpreeName').css('color','#f00');}
if(!validateEmail(email.value)){$('#shoppingSpreeEmail').css('color','#f00');}}}
function validateEmail(elementValue){var emailPattern=/^\s*[\w\.\+-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,4}\s*$/;return emailPattern.test(elementValue);}
function registerVote(id,dir){var bt_http_request=getXMLHttpRequestObject();if(!bt_http_request)
return false;var fields;fields='&vote='+dir+'&vote_id='+id;bt_http_request.open('POST',window.location.protocol+'//'+window.location.host+'/f/net/vote.html',true);bt_http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");bt_http_request.setRequestHeader("Content-length",fields.length);bt_http_request.setRequestHeader("Connection","close");bt_http_request.send(fields);bt_http_request.onreadystatechange=function()
{if(bt_http_request.readyState==4&&bt_http_request.status==200)
{if(bt_http_request.responseText=='Duplicate')
{alert("You have already voted for this item!");}
if(bt_http_request.responseText=='vote failure')
{alert("We're sorry, but there was an error processing your request. Please try again later.");}
try{$('#btVote_'+id).hide();}catch(ex){}}}
return false;}
function updateShipCalc(){$.ajax({type:'GET',url:'/f/net/ship_calc_pop.html?calc_country='+$('#country').val(),dataType:'html',beforeSend:function(){$('#shipCalc_options').html('<li>Loading...</li><li><img src="/images/loading.gif" height="16" width="16" /></li>');},success:function(data){$('#shipCalc_options').html(data);},error:function(){$('#shipCalc_options').html("<li>An unexpected error has occured. Please try again later.</li>");}});return false;}
function pop_cont(page){return g_openWindow(page,520,266,'contest');}
function g_openWindow(page,height,width,win,scrollbars,resizable,toolbar,menubar,top,left){if(!height)height=400;if(!width)width=560;if(!win)win="_new";if(!top)top=0;if(!left)left=0;width="width="+width.toString();height="height="+height.toString();scrollbars=",scrollbars="+((scrollbars)?"yes":"no");resizable=",resizable="+((resizable)?"yes":"no");toolbar=",toolbar="+((toolbar)?"yes":"no");menubar=",menubar="+((menubar)?"yes":"no");top=",top="+((top)?top.toString():"0");left=",left="+((left)?left.toString():"0");attr=width+","+height+scrollbars+resizable+toolbar+menubar+top+left;popupWin=window.open(page,win,attr);try{popupWin.focus();}
catch(ex){}
return false;}
$(document).ready(function(){if($('#fnetPromise').length)
initPromisePopup();if($('.discountCollectPop').length)
createPopUp('.discountCollectPop','#discountEmailCollect');if($('#trig_glamourPopUp').length)
createPopUp('#trig_glamourPopUp','#glamourPopUp');if($('#productPop').length)
initProductPop();if($('#shoppingSpree').length){if($('a.shoppingSpree').length)
createPopUp('a.shoppingSpree','#shoppingSpree');}
if($('#trig_sizeConverter').length)
createPopUp('#trig_sizeConverter','#sizeConverter');if($('#trig_forgotPassword').length)
createPopUp('#trig_forgotPassword','#forgotPassword');if($('#trig_giftGivingService').length)
createPopUp('#trig_giftGivingService','#giftGivingService');if($('#trig_shipCalc').length)
createPopUp('#trig_shipCalc','#shipCalc');if($('.joinCoupList').length)
createPopUp('.joinCoupList','#joinCoupList');if($('.trig_qcPopup').length)
createPopUp('.trig_qcPopup','#qc_popup');if($('.trig_quickGift').length)
createPopUp('.trig_quickGift','#quickGift');if($('.trig_deepDiscount').length)
createPopUp('.trig_deepDiscount','#deepDiscount');if($('.trig_bestValue').length)
createPopUp('.trig_bestValue','#bestValue');if($('.trig_dealPrice').length)
createPopUp('.trig_dealPrice','#dealPrice');if($('.trig_breastCancerAwareness').length)
createPopUp('.trig_breastCancerAwareness','#breastCancerAwareness');if($('.trigger_unboxed').length)
initUnboxedTesterPopup('.trigger_unboxed');if($('.trigger_tester').length)
initUnboxedTesterPopup('.trigger_tester');if($('#trig_sampleCert').length)
createPopUp('#trig_sampleCert','#gcSamplePop');if($('.trig_signinAjax').length)
loginPop();});function initProductPop(){createPopUp('.productPop','#productPop');if($('.productPop').length>0){$('.productPop').click(function(){productPopRender($(this).attr('id'));});}}
function productPopRender(elId){var xmlhttp=getXMLHttpRequestObject();var product=elId.split('_');if(xmlhttp){var ajax_url=window.location.protocol+'//'+window.location.host+'/f/net/product_popup.html?sku='+product[1]+'&cat_code='+product[2]+'&wholesale='+product[3];xmlhttp.open("GET",ajax_url,true);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){var reply=xmlhttp.responseText;var text=reply.split('#::#');$('#product_pop_content').html(text[1]);$('#product_pop_title').html(text[0]);}};xmlhttp.send(1);}
return false;}
if(typeof addEvent!='function'){var addEvent=function(o,t,f,l){var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;if(o[d]&&!l)return o[d](t,f,false);if(!o._evts)o._evts={};if(!o._evts[t]){o._evts[t]=o[n]?{b:o[n]}:{};o[n]=new Function('e','var r = true, o = this, a = o._evts["'+t+'"], i; for (i in a) {'+
'o._f = a[i]; r = o._f(e||window.event) != false && r; o._f = null;'+
'} return r');if(t!='unload')addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL);});}
if(!f._i)f._i=addEvent._i++;o._evts[t][f._i]=f;};addEvent._i=1;var removeEvent=function(o,t,f,l){var d='removeEventListener';if(o[d]&&!l)return o[d](t,f,false);if(o._evts&&o._evts[t]&&f._i)delete o._evts[t][f._i];};}
function runSlideSubmission(code,host,coupon){if(validateEmail($('#email').val())){$.ajax({type:'POST',url:window.location.protocol+'//'+host+'/f/net/slider_request.html',data:$('#joinlist').serialize()+'&data='+escape(coupon),success:function(){$('#coupon_popup_close').click();$('#joinCoupList').css('visibility','hidden');if(code)
window.location=window.location.protocol+'//'+host+'/f/net/coupon.html?coupon_id='+code;}});}
else{$('#couponPopEmailLabel').css('color','#f00');$('#joinCoupList span.errorSpan').show();}}
function addToCart(sku,tooltipSelector,tipPos,arrowPos){var oc=$('#productButton'+sku).attr('onclick');$('#productButton'+sku).attr('onclick','return false;');var tooltip=createTooltip('Loading&hellip;',tooltipSelector);var opt={fadeIn:200,fadeOut:1200,delay:2000,offsetY:-20,offsetX:0,arrowPos:arrowPos};positionTooltip('#'+tooltip.attr('id'),'#trigger'+sku,tipPos,opt);$.ajax({type:'POST',url:window.location.protocol+'//'+window.location.host+'/f/net/add_to_cart.html',dataType:'html',data:'mv_order_item='+sku+'&mv_action=process&mv_todo=refresh&sku='+sku,beforeSend:function(){tooltip.fadeIn(100);},success:function(data){if(data!=1){destroyTooltip('#'+tooltip.attr('id'));tooltip=createTooltip(data,tooltipSelector);positionTooltip('#'+tooltip.attr('id'),'#trigger'+sku,tipPos,opt);tooltip.fadeIn(200).delay(2000).fadeOut(1200,function(){destroyTooltip('#'+tooltip.attr('id'));$('#productButton'+sku).attr('onclick',oc);});}else{destroyTooltip('#'+tooltip.attr('id'));tooltip=createTooltip('You\'ve successfully added this item to your shopping bag!',tooltipSelector);positionTooltip('#'+tooltip.attr('id'),'#trigger'+sku,tipPos,opt);tooltip.fadeIn(200).delay(2000).fadeOut(1200,function(){destroyTooltip('#'+tooltip.attr('id'));$('#productButton'+sku).attr('onclick',oc);});try{var suffix;var string=$('#shoppingBagIcon span.btnTextExtraShopBag').html();string=string.replace(/\sitem(s?)/,'');var numItems=parseInt(string)+1;if(numItems.toString()=='NaN')
numItems='1';suffix=(numItems==1)?'item':'items';$('#shoppingBagIcon span.btnTextExtraShopBag').html(numItems.toString()+' '+suffix);}catch(ex){}}},error:function(){$('#productButton'+sku).attr('onclick',oc);destroyTooltip('#'+tooltip.attr('id'));}});return false;}