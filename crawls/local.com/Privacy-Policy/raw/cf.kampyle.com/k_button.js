
var k_button_js_revision='$Rev: 17123 $';var k_button={"ff_link":document.getElementById("kampylink"),"host_server":document.getElementById("k_host_server"),"help_button":document.getElementById("k_help_button"),"k_slogan":document.getElementById("k_slogan"),"close_button":document.getElementById("k_close_button"),"extra_params":null,"use_colorbox":false,"newwindow":'',"popitup":function(url,longUrl){if(!this.newwindow.closed&&this.newwindow.location)
this.newwindow.location.href=url;else
{if(!this.window_width)
this.window_width=440;if(!this.window_height)
this.window_height=502;var ua=navigator.userAgent;var isIpad=(ua.indexOf(" AppleWebKit")>=0&&ua.indexOf("Mobile")>=0&&ua.indexOf("iPad")>=0);if(isIpad&&k_button.use_colorbox&&typeof($)!="undefined"&&$.colorbox)
{$.colorbox({href:url,innerWidth:450,innerHeight:512,iframe:true});return false;}
else
{this.newwindow=window.open(url+"",'kampyle_ff','left='+((window.screenX||window.screenLeft)+10)+',top='+((window.screenY||window.screenTop)+10)+',height='+this.window_height+'px,width='+this.window_width+'px,resizable=false');if(!this.newwindow)
{this.newwindow='';return;}
if(!this.newwindow.opener)this.newwindow.opener=self;}}
if(window.focus)
this.newwindow.focus();if(longUrl!='kampyle_ff')
this.newwindow.name=longUrl;return false;},"Set_Cookie":function(name,value,expires,path,domain,secure)
{var today=new Date();today.setTime(today.getTime());if(expires)
expires=expires*1000*60*60*24;var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+escape(value)+
((expires)?";expires="+expires_date.toGMTString():"")+
((path)?";path="+path:"")+
((domain)?";domain="+domain:"")+
((secure)?";secure":"");},"Get_Cookie":function(name)
{var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length)))
return null;if(start==-1)
return null;var end=document.cookie.indexOf(";",len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));},"get_main_domain":function()
{var main_domain='';var domain=document.domain;if(document.domain!="undefined"&&document.domain!=="")
{if(document.domain!='localhost')
{var dots=domain.split(/\./g);var tld=dots[dots.length-1];var sTlds=['COM','EDU','NET','ORG','GOV','MIL','INT'];var mDotsLength=3;for(var i in sTlds)
{if(sTlds[i]==tld.toUpperCase())
mDotsLength=2;}
if(dots.length>mDotsLength)
{main_domain=dots.slice(dots.length-mDotsLength).join('.');}
else
{main_domain=domain;}}}
return main_domain;},"generate_pre_id":function()
{var vector1=Math.floor(Math.random()*(Math.pow(2,48)));var vector2=new Date().getTime();return vector1+"_"+vector2;},"open_ff":function(ff_params,url)
{try
{if(typeof(k_sc_param)=="object")
{k_button.callSiteCatalyst(k_sc_param.instance,k_sc_param.evar);}}
catch(e)
{window.k_sc_error=e;}
var urlObject=this.create_ff_url(ff_params,url);this.popitup(urlObject.shortUrl,urlObject.longUrl);},"create_ff_url":function(ff_params,url,form_data)
{var stats_kvp=[];var matches=false;if(typeof(k_button_js_revision)!='undefined')
{matches=k_button_js_revision.match(/\d+/);if(matches!==false)
{stats_kvp.push('k_button_js_revision='+matches[0]);}}
if(typeof(k_push_js_revision)!='undefined')
{matches=k_push_js_revision.match(/\d+/);if(matches!==false)
{stats_kvp.push('k_push_js_revision='+matches[0]);}}
var cookie_expiration_time_yes=21;if(typeof(k_push_vars)!='undefined')
{if(typeof(k_push_vars.view_percentage)!='undefined')
stats_kvp.push('view_percentage='+k_push_vars.view_percentage);if(typeof(k_push_vars.display_after)!='undefined')
stats_kvp.push('display_after='+k_push_vars.display_after);if(typeof(k_push_vars.cookie_expiration_time_yes)!='undefined')
cookie_expiration_time_yes=k_push_vars.cookie_expiration_time_yes;}
var stats_string=stats_kvp.join("&");var main_domain=k_button.get_main_domain();k_button.Set_Cookie('k_push8','1',cookie_expiration_time_yes,'/',main_domain,'');var url2send=url||window.location.href;url2send=encodeURIComponent(url2send);var ff_url='';if(!ff_params)
{ff_url=k_button.ff_link.href;if(k_button.ff_link.rel=='&push=1')
ff_url=ff_url+k_button.ff_link.rel;}
else
{var ff_link_rel='';if(k_button.ff_link)
{ff_link_rel=k_button.ff_link.rel;k_button.ff_link.href="#";k_button.ff_link.target="";k_button.ff_link.rel='';if(ff_link_rel=='nofollow')
ff_link_rel='';}
var main_url='';if((k_button.host_server)&&k_button.host_server.value){main_url=k_button.host_server.value;}
else if((k_button.ff_link)&&k_button.ff_link.getAttribute('ref_server')!==null){var urlParts=k_button.ff_link.getAttribute('ref_server').split("/");main_url=urlParts[2];}
else{main_url='www.kampyle.com';}
if(!this.loader_url)
this.loader_url='/feedback_form/ff-feedback-form.php?';var protocol=document.location.protocol;if(protocol!="http:"&&protocol!="https:")
{protocol="http:";}
ff_url=protocol+'//'+main_url+this.loader_url+ff_params+ff_link_rel;}
if(window.pageTracker&&window.pageTracker._trackEvent)
{var vectors=this.generate_pre_id();window.pageTracker._trackEvent("KampyleFeedback","NewFeedback",vectors);if(!this.extra_params)
this.extra_params={};this.extra_params.vectors=vectors;}
if(this.extra_params)
{var extra_params=this.make_query_string(this.extra_params);ff_url=ff_url+'&'+extra_params;}
if(k_button.Get_Cookie("session_start_time")!==null)
{var startTime=k_button.Get_Cookie("session_start_time");var now=(new Date()).getTime();var numOfSecondsElapsed=Math.round((now-startTime)/1000);ff_url=ff_url+'&time_on_site='+numOfSecondsElapsed;}
if(stats_string!=='')
{ff_url=ff_url+'&stats='+encodeURIComponent(stats_string);}
var ga_url='';if(k_button.Get_Cookie("__utmz")!==null)
{ga_url='&utmz='+encodeURIComponent(k_button.Get_Cookie("__utmz"))+'&utma='+encodeURIComponent(k_button.Get_Cookie("__utma"))+'&utmv='+encodeURIComponent(k_button.Get_Cookie("__utmv"));}
else if(k_button.Get_Cookie("k_visit")!==null)
{ga_url='&kvisit='+encodeURIComponent(k_button.Get_Cookie("k_visit"));}
var ct_url='';var ct_pid='';if(typeof(ClickTaleGetPID)=='function')
ct_pid=ClickTaleGetPID();if(ct_pid===''&&typeof(KampyleGetClickTalePID)=='function')
ct_pid=KampyleGetClickTalePID();if(ct_pid!==''&&typeof(ClickTaleGetUID)=='function'&&typeof(ClickTaleGetSID)=='function')
{var ct_uid=ClickTaleGetUID();var ct_sid=ClickTaleGetSID();ct_url='&ctdata=0';if(ct_uid!==null&&ct_sid!==null)
{ct_url='&ctdata='+ct_pid+'..'+ct_uid+'..'+ct_sid;}}
var longUrl='kampyle_ff';if(typeof document.body.style.maxHeight=="undefined"){ff_url=ff_url.substring(0,900)
url2send+="&ie6trim=1";}
else if((ff_url.length+url2send.length)>2083){longUrl=url2send;url2send='noUrl';}
k_button.Set_Cookie("k_vectors",null,-1,"/",k_button.get_main_domain(),'');return{"shortUrl":ff_url+'&url='+url2send+ga_url+ct_url,"longUrl":longUrl};},"hide_button":function()
{k_button.ff_link.style.display="none";k_button.close_button.style.display="none";if(k_button.k_slogan)
k_button.k_slogan.style.display="none";},"make_query_string":function(params)
{var query_string='';var params_tmp=[];for(var s in params)
{if(params.hasOwnProperty(s))
{if((s=='u_id')||(s=='u_email'))
params[s]=params[s].replace('+','KAMP_SPEC2B');params_tmp.push(s+'='+encodeURIComponent(params[s]));}}
query_string=params_tmp.join('&');return query_string;},"addCss":function(path)
{var fileref=document.createElement("link");fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",path);if(typeof fileref!="undefined")
document.getElementsByTagName("head")[0].appendChild(fileref);},"callSiteCatalyst":function(sc_instance,sc_evar)
{try
{var vectors=k_button.Get_Cookie("k_vectors");if(vectors===null)
{vectors=k_button.generate_pre_id();k_button.Set_Cookie("k_vectors",vectors,0,"/",k_button.get_main_domain(),'');}
if(!k_button.extra_params)
{k_button.extra_params={};}
k_button.extra_params.vectors=vectors;sc_instance.linkTrackVars=sc_evar;sc_instance[sc_evar]=vectors;sc_instance.tl(true,"o","Feedback Form");}
catch(e)
{window.k_sc_error=e;}},"setCustomVariable":function(paramId,paramValue)
{if(!k_button.extra_params)
{k_button.extra_params={};}
k_button.extra_params['param['+paramId+"]"]=paramValue;},"init":function()
{if(k_button.Get_Cookie("session_start_time")===null)
{var main_domain=k_button.get_main_domain();k_button.Set_Cookie("session_start_time",(new Date()).getTime(),0,"/",main_domain,'');if(k_button.Get_Cookie("k_visit")===null)
{k_button.Set_Cookie('k_visit','1','365','/',main_domain,'');}
else
{k_button.Set_Cookie('k_visit',parseInt(k_button.Get_Cookie("k_visit"),10)+1,'365','/',main_domain,'');}
k_button.newSession=true;}
var ua=navigator.userAgent;var isWebkitMobile=(ua.indexOf(" AppleWebKit")>=0&&ua.indexOf("Mobile")>=0&&ua.indexOf("iPad")<0)||ua.indexOf("Nokia")>=0||ua.indexOf("BlackBerry")>=0;if(isWebkitMobile)
{var positionButton=function(){var but=k_button.ff_link;if(but.className.indexOf("k_bottom")>=0)
{var topHeight=Math.max(document.documentElement["clientHeight"],document.body["scrollHeight"],document.documentElement["scrollHeight"],document.body["offsetHeight"],document.documentElement["offsetHeight"])-k_button.ff_link.children[0].offsetHeight;k_button.ff_link.style.top=topHeight+"px";k_button.ff_link.className+=" absolute";k_button.ff_link.parentNode.className+=" k_container"
if(k_button.k_slogan)
k_button.k_slogan.style.display="none";}};window.addEventListener("orientationchange",positionButton,false);window.addEventListener("resize",positionButton,false);window.addEventListener('load',positionButton,false);positionButton();}
else if(((screen.width<=800)&&(screen.height<=600))&&k_button.ff_link&&(k_button.ff_link.className!='k_static')&&k_button.close_button)
{k_button.close_button.onclick=k_button.hide_button;k_button.close_button.innerHTML='X';k_button.close_button.style.display="block";}
if(k_button.k_slogan===null)
{if(k_button.ff_link)
k_button.ff_link.className=k_button.ff_link.className.replace("_sl","");if(k_button.help_button)
k_button.help_button.className=k_button.help_button.className.replace("_sl","");if(k_button.close_button)
k_button.close_button.className=k_button.close_button.className.replace("_sl","");}
if(typeof(k_sc)=="object"&&k_sc.vectors)
{k_button.extra_params={'vectors':k_sc.vectors};}}};var k_button1=k_button;k_button.init();window.k_button_js_revision=k_button_js_revision;window.k_button=k_button;