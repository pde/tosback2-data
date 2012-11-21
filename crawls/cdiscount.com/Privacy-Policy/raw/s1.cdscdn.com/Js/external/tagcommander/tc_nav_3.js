//VERSION=16.00
//IDTC=1 ( Navigation  )
//IDS=335

if(typeof tc_vars=='undefined')var tc_vars=[];var l='env_work|env_channel|env_language|env_country|env_dnt|env_version|env_refer|env_domain|usr_id|usr_session_id|usr_session|usr_gender|usr_clid_gender|usr_clid_type|usr_clid_lastdate_order|usr_clid_amt_lasttwelvemonth|usr_segment|usr_clid_segment|usr_age|usr_clid_age|usr_postalcode|usr_clid_postalcode|usr_city|usr_nborder|usr_clid_nborder|usr_clid_pr_quantity|usr_mail|usr_clid_mail_optin|usr_clid_cartecd|usr_clid_amt_ati_with_sf|usr_clid_payment_methods|usr_clid_favorite_payment_methods|usr_clid_shipping_method|usr_clid_lastorder_dptid_expproduct|usr_clid_lastorder_dptid_prop1|usr_clid_lastorder_dptid_prop2|usr_clid_favorite_category_pr|usr_clid_favorite_store|usr_clid_favorite_brand|usr_score_3g|usr_name|usr_logged|usr_clid_mail|pg_cat1|pg_cat2|pg_cat3|pg_cat4|pg_cat5|pg_cat6|pg_type_error|pg_sitemapnode_name|pg_sitemapnodeid|pg_departmentid|pg_type|pg_name|pg_homestore|pg_num|pg_init|sf_id|sf_amt_ati|sf_amt_tf|sf_tduid|sf_currency|sf_payment_mode_list|sf_shipping_mode_list|sf_email|sf_prs_purchase_price|sf_prs_nb|sf_delivery_date|sf_ords|sf_type|sf_payment_mode|sf_ship|sf_shipping_mode|sf_promo_type|sf_promo_error|sf_fees|pr_sku|pr_group_sku|pr_name|pr_venteflash|pr_new_offer_nb|pr_occas_offer_nb|pr_bazaarvoice|pr_salermaketplace|pr_up_ati|pr_up_tf|pr_trademark|pr_isbundle|pr_instock|pr_descr|pr_ecotax|pr_striked|pr_currency|lp|search_keywords|search_cat|search_results_number|search_filters|search_filters_value|ba_url|lb|ba_event|ba_department|ba_department1|events|event_type|ap|afs_pubId|afs_query|afs_channel|afs_hl|afs_fontFamily|afs_fontSizeTitle|afs_fontSizeDescription|afs_fontSizeDomainLink|afs_colorTitleLink|afs_colorText|afs_colorDomainLink|afs_ads|afc_client|afc_channel|afc_output|afc_type|afc_language|afc_number|afc_fontFamily|afc_fontSizeTitle|afc_fontSizeDescription|afc_fontSizeDomainLink|afc_ads|afc_colorTitleLink|afc_colorText|afc_colorDomainLink'.split('|');for(k in l){if(!tc_vars.hasOwnProperty(l[k])){tc_vars[l[k]]='';}}
var tc_md5_hexcase=0;var tc_md5_b64pad="";function tc_md5_hex(s){return tc_md5_rstr2hex(tc_md5_rstr(tc_md5_str2rstr_utf8(s)));}
function tc_md5_b64(s){return tc_md5_rstr2b64(tc_md5_rstr(tc_md5_str2rstr_utf8(s)));}
function tc_md5_any(s,e){return tc_md5_rstr2any(tc_md5_rstr(tc_md5_str2rstr_utf8(s)),e);}
function tc_md5_hex_hmac(k,d){return tc_md5_rstr2hex(tc_md5_rstr_hmac(tc_md5_str2rstr_utf8(k),tc_md5_str2rstr_utf8(d)));}
function tc_md5_b64_hmac(k,d){return tc_md5_rstr2b64(tc_md5_rstr_hmac(tc_md5_str2rstr_utf8(k),tc_md5_str2rstr_utf8(d)));}
function tc_md5_any_hmac(k,d,e){return tc_md5_rstr2any(tc_md5_rstr_hmac(tc_md5_str2rstr_utf8(k),tc_md5_str2rstr_utf8(d)),e);}
function tc_md5_vm_test()
{return tc_md5_hex("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";}
function tc_md5_rstr(s)
{return tc_md5_binl2rstr(tc_md5_binl(tc_md5_rstr2binl(s),s.length*8));}
function tc_md5_rstr_hmac(key,data)
{var bkey=tc_md5_rstr2binl(key);if(bkey.length>16)bkey=tc_md5_binl(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=tc_md5_binl(ipad.concat(tc_md5_rstr2binl(data)),512+data.length*8);return tc_md5_binl2rstr(tc_md5_binl(opad.concat(hash),512+128));}
function tc_md5_rstr2hex(input)
{try{tc_md5_hexcase}catch(e){tc_md5_hexcase=0;}
var hex_tab=tc_md5_hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++)
{x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)
+hex_tab.charAt(x&0x0F);}
return output;}
function tc_md5_rstr2b64(input)
{try{tc_md5_b64pad}catch(e){tc_md5_b64pad='';}
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3)
{var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++)
{if(i*8+j*6>input.length*8)output+=tc_md5_b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}
return output;}
function tc_md5_rstr2any(input,encoding)
{var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++)
{dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}
var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++)
{quotient=Array();x=0;for(i=0;i<dividend.length;i++)
{x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)
quotient[quotient.length]=q;}
remainders[j]=x;dividend=quotient;}
var output="";for(i=remainders.length-1;i>=0;i--)
output+=encoding.charAt(remainders[i]);return output;}
function tc_md5_str2rstr_utf8(input)
{var output="";var i=-1;var x,y;while(++i<input.length)
{x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF)
{x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}
if(x<=0x7F)
output+=String.fromCharCode(x);else if(x<=0x7FF)
output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)
output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)
output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}
return output;}
function tc_md5_str2rstr_utf16le(input)
{var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}
function tc_md5_str2rstr_utf16be(input)
{var output="";for(var i=0;i<input.length;i++)
output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}
function tc_md5_rstr2binl(input)
{var output=Array(input.length>>2);for(var i=0;i<output.length;i++)
output[i]=0;for(var i=0;i<input.length*8;i+=8)
output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;}
function tc_md5_binl2rstr(input)
{var output="";for(var i=0;i<input.length*32;i+=8)
output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;}
function tc_md5_binl(x,len)
{x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16)
{var olda=a;var oldb=b;var oldc=c;var oldd=d;a=tc_md5_ff(a,b,c,d,x[i+0],7,-680876936);d=tc_md5_ff(d,a,b,c,x[i+1],12,-389564586);c=tc_md5_ff(c,d,a,b,x[i+2],17,606105819);b=tc_md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=tc_md5_ff(a,b,c,d,x[i+4],7,-176418897);d=tc_md5_ff(d,a,b,c,x[i+5],12,1200080426);c=tc_md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=tc_md5_ff(b,c,d,a,x[i+7],22,-45705983);a=tc_md5_ff(a,b,c,d,x[i+8],7,1770035416);d=tc_md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=tc_md5_ff(c,d,a,b,x[i+10],17,-42063);b=tc_md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=tc_md5_ff(a,b,c,d,x[i+12],7,1804603682);d=tc_md5_ff(d,a,b,c,x[i+13],12,-40341101);c=tc_md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=tc_md5_ff(b,c,d,a,x[i+15],22,1236535329);a=tc_md5_gg(a,b,c,d,x[i+1],5,-165796510);d=tc_md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=tc_md5_gg(c,d,a,b,x[i+11],14,643717713);b=tc_md5_gg(b,c,d,a,x[i+0],20,-373897302);a=tc_md5_gg(a,b,c,d,x[i+5],5,-701558691);d=tc_md5_gg(d,a,b,c,x[i+10],9,38016083);c=tc_md5_gg(c,d,a,b,x[i+15],14,-660478335);b=tc_md5_gg(b,c,d,a,x[i+4],20,-405537848);a=tc_md5_gg(a,b,c,d,x[i+9],5,568446438);d=tc_md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=tc_md5_gg(c,d,a,b,x[i+3],14,-187363961);b=tc_md5_gg(b,c,d,a,x[i+8],20,1163531501);a=tc_md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=tc_md5_gg(d,a,b,c,x[i+2],9,-51403784);c=tc_md5_gg(c,d,a,b,x[i+7],14,1735328473);b=tc_md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=tc_md5_hh(a,b,c,d,x[i+5],4,-378558);d=tc_md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=tc_md5_hh(c,d,a,b,x[i+11],16,1839030562);b=tc_md5_hh(b,c,d,a,x[i+14],23,-35309556);a=tc_md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=tc_md5_hh(d,a,b,c,x[i+4],11,1272893353);c=tc_md5_hh(c,d,a,b,x[i+7],16,-155497632);b=tc_md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=tc_md5_hh(a,b,c,d,x[i+13],4,681279174);d=tc_md5_hh(d,a,b,c,x[i+0],11,-358537222);c=tc_md5_hh(c,d,a,b,x[i+3],16,-722521979);b=tc_md5_hh(b,c,d,a,x[i+6],23,76029189);a=tc_md5_hh(a,b,c,d,x[i+9],4,-640364487);d=tc_md5_hh(d,a,b,c,x[i+12],11,-421815835);c=tc_md5_hh(c,d,a,b,x[i+15],16,530742520);b=tc_md5_hh(b,c,d,a,x[i+2],23,-995338651);a=tc_md5_ii(a,b,c,d,x[i+0],6,-198630844);d=tc_md5_ii(d,a,b,c,x[i+7],10,1126891415);c=tc_md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=tc_md5_ii(b,c,d,a,x[i+5],21,-57434055);a=tc_md5_ii(a,b,c,d,x[i+12],6,1700485571);d=tc_md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=tc_md5_ii(c,d,a,b,x[i+10],15,-1051523);b=tc_md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=tc_md5_ii(a,b,c,d,x[i+8],6,1873313359);d=tc_md5_ii(d,a,b,c,x[i+15],10,-30611744);c=tc_md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=tc_md5_ii(b,c,d,a,x[i+13],21,1309151649);a=tc_md5_ii(a,b,c,d,x[i+4],6,-145523070);d=tc_md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=tc_md5_ii(c,d,a,b,x[i+2],15,718787259);b=tc_md5_ii(b,c,d,a,x[i+9],21,-343485551);a=tc_md5_safe_add(a,olda);b=tc_md5_safe_add(b,oldb);c=tc_md5_safe_add(c,oldc);d=tc_md5_safe_add(d,oldd);}
return Array(a,b,c,d);}
function tc_md5_cmn(q,a,b,x,s,t)
{return tc_md5_safe_add(tc_md5_bit_rol(tc_md5_safe_add(tc_md5_safe_add(a,q),tc_md5_safe_add(x,t)),s),b);}
function tc_md5_ff(a,b,c,d,x,s,t)
{return tc_md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
function tc_md5_gg(a,b,c,d,x,s,t)
{return tc_md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function tc_md5_hh(a,b,c,d,x,s,t)
{return tc_md5_cmn(b^c^d,a,b,x,s,t);}
function tc_md5_ii(a,b,c,d,x,s,t)
{return tc_md5_cmn(c^(b|(~d)),a,b,x,s,t);}
function tc_md5_safe_add(x,y)
{var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function tc_md5_bit_rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
var tc_array_launched_tags_1=Object.prototype.toString.call(tc_array_launched_tags_1)=="[object Array]"?tc_array_launched_tags_1:[];var tc_array_launched_tags_keys_1=Object.prototype.toString.call(tc_array_launched_tags_keys_1)=="[object Array]"?tc_array_launched_tags_keys_1:[];var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS";},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)
return data[i].identity;}
else if(dataProp)
return data[i].identity;}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1));},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"},{string:navigator.platform,subString:"iPad",identity:"iPad"}]};BrowserDetect.init();var tc_browser_rules="";if(BrowserDetect.browser=="Explorer"){tc_browser_rules="Internet Explorer "+BrowserDetect.version;}
if(BrowserDetect.browser=="Chrome"){tc_browser_rules="Chrome "+BrowserDetect.version;}
if(BrowserDetect.browser=="Firefox"){tc_browser_rules="Firefox "+BrowserDetect.version;}
if(BrowserDetect.browser=="Safari"){tc_browser_rules="Safari "+BrowserDetect.version;}var tc_browser="";var tc_browser_version=0;var tc_browser=function(){var tc_ua=navigator.userAgent.toLowerCase();if(tc_ua.indexOf("msie")!=-1){tc_browser="IE";if(tc_tmp=tc_ua.match(/\bmsie (\d+\.\d+)/i)){tc_browser_version=parseFloat(tc_tmp[1]);}}else if(tc_ua.indexOf("firefox")!=-1){tc_browser="FF";tc_browser_version=tc_ua.substr(tc_ua.indexOf("firefox")+8,2);}else if(tc_ua.indexOf("chrome")>-1){tc_browser="CR";tc_browser_version=tc_ua.substr(tc_ua.indexOf("chrome")+7,2);}else if(tc_ua.indexOf("safari")>-1){tc_browser="SF";}else if(tc_ua.indexOf("opera")>-1){tc_browser="OP";}else{tc_browser="OT";return false;}
return true;}
var tc_canKill=function(){return tc_browser!="IE"}
var tc_kill=function(tc_id){if(!tc_canKill())
return false;try
{var tc_elt;if(document.getElementById)
tc_elt=document.getElementById(tc_id);else if(document.all)
tc_elt=document.all[tc_id];else if(document.layers)
tc_elt=document.layers[tc_id];if(!tc_elt){for(var name in this){if(this[name]){if(this[name].id){if(this[name].id==tc_id){tc_elt=this[name];delete name;}}}}}
if(!tc_elt){return false;}
if("src"in tc_elt){var tc_replacement=tc_browser=="FF"||tc_browser=="IE"&&tc_browser_version>=9?"about:blank":tc_browser=="IE"?tc_elt.nodeName=="IMG"?!tc_elt.parentNode.removeChild(tc_elt):false:null;if(tc_replacement!==false){tc_elt["src"]=tc_replacement;}}
if("data"in tc_elt){var tc_replacement=tc_browser=="FF"?"about:blank":null;if(tc_replacement!==false){tc_elt["data"]=tc_replacement;}}
if("text"in tc_elt){var tc_replacement=tc_browser=="FF"?"about:blank":null;if(tc_replacement!==false){tc_elt["text"]=tc_replacement;}}}
catch(err){}
if(tc_elt){tc_elt.parentNode&&tc_elt.parentNode.removeChild(tc_elt);}
delete tc_elt;return true;}
tc_browser();var tc_domain=function(){var tc_hdoc=document;try{tc_hdoc=top.document;}catch(e){}
var my_dom_temp=tc_hdoc.domain.toLowerCase().split(".");var ipregexp="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";if(my_dom_temp.length<2||tc_hdoc.domain.match(ipregexp)){return"";}else{if(my_dom_temp[my_dom_temp.length-2]=="co"&&my_dom_temp[my_dom_temp.length-1]=="uk"){return"."+my_dom_temp[my_dom_temp.length-3]+"."+my_dom_temp[my_dom_temp.length-2]+"."+my_dom_temp[my_dom_temp.length-1];}else{return"."+my_dom_temp[my_dom_temp.length-2]+"."+my_dom_temp[my_dom_temp.length-1];}}};function tc_setCookie(name,value,expires,path,domain,secure)
{if(!domain){domain=tc_domain();}
var today=new Date();today.setTime(today.getTime());if(expires)
{expires=expires*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+escape(value)+
((expires)?";expires="+expires_date.toGMTString():"")+
((path)?";path="+path:";path=/")+
((domain)?";domain="+domain:"")+
((secure)?";secure":"");}
function tc_getCookie(check_name){var a_all_cookies=document.cookie.split(';');var a_temp_cookie='';var cookie_name='';var cookie_value='';var b_cookie_found=false;for(i=0;i<a_all_cookies.length;i++)
{a_temp_cookie=a_all_cookies[i].split('=');cookie_name=a_temp_cookie[0].replace(/^\s+|\s+$/g,'');if(cookie_name==check_name)
{b_cookie_found=true;if(a_temp_cookie.length>1)
{cookie_value=unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g,''));}
return cookie_value;break;}
a_temp_cookie=null;cookie_name='';}
if(!b_cookie_found)
{return'';}}
function tc_getParamURL(my_param_name,my_url){my_param_name=my_param_name.toLowerCase();var tc_array_url_vars=new Array();if(!my_url)
{var my_doc='';try{my_doc=top.document;}catch(e){my_doc=document;}
my_url=my_doc.location.href;}
var start_split=0;var start_split_1=my_url.indexOf("?");var start_split_2=my_url.indexOf("#");if(start_split_1!=-1)
start_split=start_split_1;else if(start_split_2!=-1)
start_split=start_split_2;var temp_location='';if(start_split!=0)
{temp_location=my_url.substring(start_split+1,my_url.length).split('#').join('&');}
temp_location=temp_location.replace(/%3d/g,'=');var temp_array=temp_location.split('&');for(var i=0;i<temp_array.length;i++)
{temp_array2=temp_array[i].split('=');tc_array_url_vars[(temp_array2[0]).toLowerCase()]=temp_array2[1];}
return((tc_array_url_vars[my_param_name]!=undefined)?tc_array_url_vars[my_param_name]:'');}
function tc_match(mystr,mypattern,myflags){var re=new RegExp(mypattern,myflags);return(mystr.match(re));}
function tc_crypt(s){var retour='';for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);if(c>=32&&c<=126){temp=c+26;if(temp>126)
temp=(temp%126)+32-1;retour+=String.fromCharCode(temp);}else{retour+=s.charAt(i);}}
return retour;}
function tc_uncrypt(s){var retour='';for(var i=0;i<s.length;i++){if(s.charCodeAt(i)>=32&&s.charCodeAt(i)<=126){if(s.charCodeAt(i)>=(32+26)&&s.charCodeAt(i)<=126){temp=s.charCodeAt(i)-26;}else{temp=s.charCodeAt(i)-26+(126-32)+1;}
retour+=String.fromCharCode(temp);}else{retour+=s.charAt(i);}}
return retour;}
function tc_setCookiePool(name,poolkey,value,expires,path,domain,secure){var original_cookie_value=tc_getCookie(name);var original_cookie_array=[];if(original_cookie_value!=""){original_cookie_array=original_cookie_value.split('##');}
var final_cookie_array=[];var final_cookie_value="";for(var i=0;i<original_cookie_array.length;i++){var temp=original_cookie_array[i];var temp2=temp.split('::');if(temp2[0]!=poolkey){final_cookie_array.push(temp);}}
final_cookie_array.push(poolkey+"::"+value);final_cookie_value=final_cookie_array.join('##');tc_setCookie(name,final_cookie_value,expires,path,domain,secure);}
function tc_getCookiePool(name,poolkey){var original_cookie_value=tc_getCookie(name);var original_cookie_array=original_cookie_value.split('##');for(var i=0;i<original_cookie_array.length;i++){var temp=original_cookie_array[i];var temp2=temp.split('::');if(temp2[0]==poolkey){return temp2[1];}}
return"";}
var tc_ssl_test_mode=(("https:"==document.location.protocol)?"https://":"http://");var tc_mode_test=(function(){var tc_a=document.cookie.split(';');for(tc_i=0;tc_i<tc_a.length;tc_i++){var tc_b=tc_a[tc_i].split('=');var tc_c=tc_b[0].replace(/^\s+|\s+$/g,'');if(tc_c=="tc_mode_test"){if(tc_b.length>1){return unescape(tc_b[1].replace(/^\s+|\s+$/g,''));}return null;}}return null;})();if(tc_mode_test==1){(function(){var tc_testmodescriptload=document.createElement('script');tc_testmodescriptload.type='text/javascript';tc_testmodescriptload.src=tc_ssl_test_mode+'manager.tagcommander.com/utils/test_mode_include.php?id=1&site=335&type=load&rand='+Math.random()+'&version=';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_testmodescriptload);})();}else{var tc_order_product_criteo="";var tmp_0=tc_vars["sf_ords"];var tc_idx=0;for(var tcnt_0=0;tcnt_0<tmp_0.length;tcnt_0++){var tmp_1=tmp_0[tcnt_0]["prs"];for(var tcnt_1=0;tcnt_1<tmp_1.length;tcnt_1++){tc_idx++;tc_order_product_criteo+="&i"+tc_idx+"="+tmp_1[tcnt_1]["pr_sku"];tc_order_product_criteo+="&p"+tc_idx+"="+tmp_1[tcnt_1]["pr_up_ati"];tc_order_product_criteo+="&q"+tc_idx+"="+tmp_1[tcnt_1]["pr_quantity"];}}
var tc_array_productids="";var tmp_0=tc_vars["lp"];for(var i=0;i<tmp_0.length;i++){tc_array_productids+="&i"+(i+1)+"="+tmp_0[i]["pr_sku"];}
var tc_url=document.location.href;var tc_salefolder_newcustomer=(parseInt(tc_vars["usr_nborder"]||0)>0)?"0":"1";var tc_tradedoubler_config_cd=[{active:false,event:'39527',dptId:['106','112','144'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'39531',dptId:['117'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'39535',dptId:['104','101','105'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'39537',dptId:['113','121','126'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124678',dptId:['107'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124680',dptId:['110'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124682',dptId:['122'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124684',dptId:['120'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124686',dptId:['127','129'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'124688',dptId:['103'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'130655',dptId:['143'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'130657',dptId:['126'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'226696',dptId:['128'],orderNumber:'',orderValue:0,reportInfo:''}];var tc_tradedoubler_config_mp=[{active:false,event:'232541',dptId:['106','112','144'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232545',dptId:['117'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232547',dptId:['104','101','105'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232549',dptId:['113','121','126'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232553',dptId:['107'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232555',dptId:['110'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232557',dptId:['120'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232561',dptId:['127','129'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232563',dptId:['103'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232565',dptId:['143'],orderNumber:'',orderValue:0,reportInfo:''},{active:false,event:'232567',dptId:['128'],orderNumber:'',orderValue:0,reportInfo:''}];var tc_order_product_nuggad="";var tmp_0=tc_vars["sf_ords"];for(var tcnt_0=0;tcnt_0<tmp_0.length;tcnt_0++){var tmp_1=tmp_0[tcnt_0]["prs"];for(var tcnt_1=0;tcnt_1<tmp_1.length;tcnt_1++){tc_order_product_nuggad+="&d7="+(/\d/.exec(tmp_1[tcnt_1]["pr_departmentid"])).toString();tc_order_product_nuggad+="&d14="+(/\d/.exec(tmp_1[tcnt_1]["pr_departmentid"])).toString().substring(0,3);tc_order_product_nuggad+="&d15="+tmp_1[tcnt_1]["pr_category_code"];tc_order_product_nuggad+="&d16="+(/\d/.exec(tmp_1[tcnt_1]["pr_departmentid"])).toString().substring(0,5);}}
var tc_order_tax=(parseFloat(tc_vars["sf_amt_ati"])-parseFloat(tc_vars["sf_amt_tf"])).toFixed(2);var tc_src='',tb=document.getElementsByTagName("img"),cl="fpViewProduct";for(var i=0;i<tb.length;i++){if(tb[i]&&tb[i].className==cl){tc_src=tb[i].src;break;}}
if(tc_src==''){tb=document.getElementsByTagName("a"),cl="cdsZoom";var ctb=null;for(var j=0;j<tb.length;j++){if(tb[j]&&tb[j].className==cl){ctb=tb[j].getElementsByTagName("img")[0];if(ctb){tc_src=ctb.src;break;}}}}
var tc_refer=tc_vars["env_refer"].toLowerCase();var tc_afs_active=false;var tc_iadvize_sid=(tc_vars['env_work']=="prod")?'11':'15';var tc_clicktale_ratio=(tc_vars['env_work']=="prod")?1.5E-05:1;}

//----

function isSampled1(id_site,id_rule,sampler,flag_session){var cookie_name='tc_sample_'+id_site+'_'+id_rule;var tc_date=new Date();tc_date.setTime(tc_date.getTime()+(3600*1000*24*365));var isSampled=(function(){var tc_a=document.cookie.split(';');for(tc_i=0;tc_i<tc_a.length;tc_i++){var tc_b=tc_a[tc_i].split('=');var tc_c=tc_b[0].replace(/^\s+|\s+$/g,'');if(tc_c==cookie_name){if(tc_b.length>1){return unescape(tc_b[1].replace(/^\s+|\s+$/g,''));}return null;}}return null;})();if(isSampled==null){if(Math.floor(Math.random()*sampler)==0){if(flag_session==1){document.cookie=cookie_name+'=1;path=/';}else{document.cookie=cookie_name+'=1;expires='+tc_date.toGMTString()+';path=/';}
isSampled=1;}else{if(flag_session==1){document.cookie=cookie_name+'=0;path=/';}else{document.cookie=cookie_name+'=0;expires='+tc_date.toGMTString()+';path=/';}
isSampled=0;}}
return isSampled;}
var tc_ssl_test_mode=(("https:"==document.location.protocol)?"https://":"http://");var tc_mode_test=(function(){var tc_a=document.cookie.split(';');for(tc_i=0;tc_i<tc_a.length;tc_i++){var tc_b=tc_a[tc_i].split('=');var tc_c=tc_b[0].replace(/^\s+|\s+$/g,'');if(tc_c=="tc_mode_test"){if(tc_b.length>1){return unescape(tc_b[1].replace(/^\s+|\s+$/g,''));}return null;}}return null;})();if(tc_mode_test==1){(function(){var tc_testmodescriptexec=document.createElement('script');tc_testmodescriptexec.type='text/javascript';tc_testmodescriptexec.src=tc_ssl_test_mode+'manager.tagcommander.com/utils/test_mode_include.php?id=1&site=335&type=exec&rand='+Math.random()+'&version=16.00';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_testmodescriptexec);})();(function(){if(top.tc_count!==undefined)
top.tc_count++;else
top.tc_count=1;var tc_newscript=document.createElement('script');tc_newscript.type='text/javascript';tc_newscript.src=tc_ssl_test_mode+'manager.tagcommander.com/utils/livetest/bookmarklet.php?r='+Math.random()+'&nb='+top.tc_count+'&container=335!1&version=16.00';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_newscript);})();}else{if(tc_vars["pg_type"]=='ListeProduit'||tc_vars["pg_type"]=='Recherche'){tc_array_launched_tags_1.push('Criteo - Search / List');tc_array_launched_tags_keys_1.push('3');var pcto_dis=function(){var cto_dis_ifr=document.createElement('IFRAME');cto_dis_ifr.width='1px';cto_dis_ifr.height='1px';cto_dis_ifr.style.display='none';var cto_dis_ifr_src='http://dis.criteo.com/dis/dis.aspx?p=725&c=2&cb='+Math.floor(Math.random()*99999999999);try{cto_dis_ifr_src+='&ref='+encodeURIComponent(document.referrer);}catch(e){}
cto_dis_ifr.src=cto_dis_ifr_src.substring(0,2000);document.body.appendChild(cto_dis_ifr);};var initCriteo=function(){var cto_dis_img=new Image();cto_dis_img.id="tc_img_1_2";cto_dis_img.src='http://cdiscount.widget.criteo.com/pac/display.js?p1='+escape('v=2&wi=6983096&pt1=3'+tc_array_productids)+'&t1=sendEvent&resptype=gif&cb='+Math.floor(Math.random()*99999999999);cto_dis_img.onload=pcto_dis;};initCriteo();}
if(tc_vars["pg_type"]=='FicheProduit'||tc_vars["pg_type"]=='Liste OffreMP'){tc_array_launched_tags_1.push('Criteo - Product Pages');tc_array_launched_tags_keys_1.push('5');var pcto_dis=function(){var cto_dis_ifr=document.createElement('IFRAME');cto_dis_ifr.width='1px';cto_dis_ifr.height='1px';cto_dis_ifr.style.display='none';var cto_dis_ifr_src='http://dis.criteo.com/dis/dis.aspx?p=725&c=2&cb='+Math.floor(Math.random()*99999999999);try{cto_dis_ifr_src+='&ref='+encodeURIComponent(document.referrer);}catch(e){}
cto_dis_ifr.src=cto_dis_ifr_src.substring(0,2000);document.body.appendChild(cto_dis_ifr);};var initCriteo=function(){var cto_dis_img=new Image();cto_dis_img.id="tc_img_1_3";cto_dis_img.src='http://cdiscount.widget.criteo.com/pac/display.js?p1='+escape('v=2&wi=6983096&pt1=2&i='+tc_vars["pr_sku"])+'&t1=sendEvent&resptype=gif&cb='+Math.floor(Math.random()*99999999999);cto_dis_img.onload=pcto_dis;};initCriteo();}
if(tc_vars["pg_type"]=='Panier'){tc_array_launched_tags_1.push('Criteo - Shopping Cart');tc_array_launched_tags_keys_1.push('7');var initCriteo=function(){var cto_dis_img=new Image();cto_dis_img.id="tc_img_1_4";cto_dis_img.src='https://sslwidget.criteo.com/pac/display.js?p1='+escape('v=2&wi=6983099&s=0&si=2'+tc_order_product_criteo)+'&t1=transaction&resptype=gif&cb='+Math.floor(Math.random()*99999999999);};initCriteo();}
tc_array_launched_tags_1.push('Google Analytics Trafic');tc_array_launched_tags_keys_1.push('43');var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-34150465-1']);_gaq.push(['_setDomainName',tc_vars["env_domain"]]);_gaq.push(['_setCampaignCookieTimeout',2592000000]);_gaq.push(['_setAllowAnchor',true]);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.id="tc_script_4_1";ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var tc_ga_script=document.getElementsByTagName('script')[0];tc_ga_script.parentNode.insertBefore(ga,tc_ga_script);})();if((tc_vars["pg_type"]=='Vitrine'&&tc_vars["pg_homestore"]=='1')||(tc_vars["pg_type"]=='PageEspaceClient'||tc_vars["pg_type"]=='FicheProduit'||tc_vars["pg_type"]=='Liste OffreMP')){tc_array_launched_tags_1.push('Google AFC');tc_array_launched_tags_keys_1.push('53');var googleCallback=function(ads){var tmp=tc_vars["afc_ads"];var container='';if(ads.length>=1){var i=0,j=0,s='';for(var tcnt=0;tcnt<tmp.length;tcnt++){container=tmp[tcnt]["container"];while(i<ads.length&&j<tmp[tcnt]["number"]){s+='<a style="text-decoration:none" target="_blank" href="'+
ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+
ads[i].visible_url+'\';return true"><span style="text-decoration:underline;color:'+tc_vars["afc_colorTitleLink"]+';font-size:'+tc_vars["afc_fontSizeTitle"]+'"><b>'+
ads[i].line1+'</b></span></a><br/><span style="color:'+tc_vars["afc_colorText"]+';font-size:'+tc_vars["afc_fontSizeDescription"]+'">'+
ads[i].line2+' '+
ads[i].line3+'</span><br/><a style="text-decoration:none" target="_blank" href="'+
ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+
ads[i].visible_url+'\';return true"><span style="color:'+tc_vars["afc_colorDomainLink"]+';font-size:'+tc_vars["afc_fontSizeDomainLink"]+'">'+
ads[i].visible_url+'</span></a><br/><br/>';i++;j++;}
if(s.length>0){s='<a style="text-decoration:none" target="_blank" href=\"'+google_info.feedback_url+'\" ><span style="color:#676767;font-size:12px">Annonces Google</span></a><br/><br/>'+s;var div=document.getElementById(container);if(div!=null){div.style.fontFamily=tc_vars["afc_fontFamily"]+", sans-serif";div.style.width=tmp[tcnt]["width"];div.innerHTML=s;div.style.display='';}
j=0;s='';}}}};window["google_ad_request_done"]=googleCallback;window["google_ad_client"]=tc_vars["afc_client"];window["google_ad_channel"]=tc_vars["afc_channel"];window["google_max_num_ads"]=tc_vars["afc_number"];window["google_ad_output"]=tc_vars["afc_output"];window["google_ad_type"]=tc_vars["afc_type"];window["google_language"]=tc_vars["afc_language"];var srcAttr=location.protocol+"//pagead2.googlesyndication.com/pagead/show_ads.js";var scriptTag='<scr'+'ipt type="text/javascript" src="'+srcAttr+'"><\/scr'+'ipt>';document.write(scriptTag);}
if((tc_vars["pg_type"]=='Vitrine'&&tc_vars["pg_homestore"]!='1')||(tc_vars["pg_type"]=='ListeProduit'||tc_vars["pg_type"]=='Recherche')){tc_array_launched_tags_1.push('Google AFS');tc_array_launched_tags_keys_1.push('55');var srcAttr=location.protocol+"//www.google.com/adsense/search/ads.js";var scriptTag='<scr'+'ipt type="text/javascript" src="'+srcAttr+'"><\/scr'+'ipt>';document.write(scriptTag);var pageOptions={'pubId':tc_vars["afs_pubId"],'query':tc_vars["afs_query"],'channel':tc_vars["afs_channel"],'adPage':tc_vars["pg_num"],'hl':tc_vars["afs_hl"],'linkTarget':'_blank'};var tmp=tc_vars["afs_ads"];var tabObj=new Array();for(var tcnt=0;tcnt<tmp.length;tcnt++){var obj={'container':tmp[tcnt]["container"],'number':tmp[tcnt]["number"],'width':tmp[tcnt]["width"],'lines':tmp[tcnt]["lines"],'fontFamily':tc_vars["afs_fontFamily"],'fontSizeTitle':tc_vars["afs_fontSizeTitle"],'fontSizeDescription':tc_vars["afs_fontSizeDescription"],'fontSizeDomainLink':tc_vars["afs_fontSizeDomainLink"],'colorTitleLink':tc_vars["afs_colorTitleLink"],'colorText':tc_vars["afs_colorText"],'colorDomainLink':tc_vars["afs_colorDomainLink"]}
if(document.getElementById(obj.container)){tabObj.push(obj);}}
var googleAds=function(){if(typeof google!='undefined'&&!tc_afs_active){tc_afs_active=true;new google.ads.search.Ads(pageOptions,tabObj);}};googleAds();if(document.attachEvent){document.attachEvent('onreadystatechange',googleAds);}
else{document.addEventListener('DOMContentLoaded',googleAds,false);}}
if(tc_vars["pg_type"]=='Homepage'){tc_array_launched_tags_1.push('Sociomantic (homepage)');tc_array_launched_tags_keys_1.push('57');(function(){var tc_so_script=document.createElement('script');tc_so_script.id='tc_script_5_1';tc_so_script.type='text/javascript';tc_so_script.async='async';tc_so_script.src=('https:'==document.location.protocol?'https://':'http://')
+'eu-sonar.sociomantic.com/js/2010-07-01/adpan/cdiscount-fr';var tc_so_obj=document.getElementsByTagName('script')[0];tc_so_obj.parentNode.insertBefore(tc_so_script,tc_so_obj);})();}
if((tc_vars["pg_type"]=='Vitrine'&&tc_vars["pg_homestore"]=='1')||(tc_vars["pg_type"]=='ListeProduit')){tc_array_launched_tags_1.push('Sociomantic (category page)');tc_array_launched_tags_keys_1.push('59');var product={category:[tc_vars["pg_cat2"],tc_vars["pg_cat3"]]};(function(){var tc_so_script=document.createElement('script');tc_so_script.id='tc_script_5_2';tc_so_script.type='text/javascript';tc_so_script.async='async';tc_so_script.src=('https:'==document.location.protocol?'https://':'http://')
+'eu-sonar.sociomantic.com/js/2010-07-01/adpan/cdiscount-fr';var tc_so_obj=document.getElementsByTagName('script')[0];tc_so_obj.parentNode.insertBefore(tc_so_script,tc_so_obj);})();}
if(tc_vars["pg_type"]=='FicheProduit'||tc_vars["pg_type"]=='Liste OffreMP'){tc_array_launched_tags_1.push('Sociomantic (product page)');tc_array_launched_tags_keys_1.push('61');var product={identifier:tc_vars["pr_sku"],fn:tc_vars["pr_name"],description:tc_vars["pr_descr"],valid:tc_vars["pr_instock"],category:[tc_vars["pg_cat2"],tc_vars["pg_cat3"]],brand:tc_vars["pr_trademark"],price:tc_vars["pr_up_ati"],amount:tc_vars["pr_striked"],currency:tc_vars["pr_currency"],url:tc_url,photo:tc_src};(function(){var tc_so_script=document.createElement('script');tc_so_script.id='tc_script_5_3';tc_so_script.type='text/javascript';tc_so_script.async='async';tc_so_script.src=('https:'==document.location.protocol?'https://':'http://')
+'eu-sonar.sociomantic.com/js/2010-07-01/adpan/cdiscount-fr';var tc_so_obj=document.getElementsByTagName('script')[0];tc_so_obj.parentNode.insertBefore(tc_so_script,tc_so_obj);})();}
if(tc_vars["pg_type"]=='Panier'){tc_array_launched_tags_1.push('Sociomantic (basket page)');tc_array_launched_tags_keys_1.push('63');var temp_ords=tc_vars["sf_ords"];var my_pdts=[];for(var i=0;i<temp_ords.length;i++){var temp_pdts=temp_ords[i]["prs"];for(var j=0;j<temp_pdts.length;j++){var product=temp_pdts[j];my_pdts.push({identifier:product['pr_sku'],amount:product['pr_totalprice_ati'],currency:tc_vars["sf_currency"],quantity:product['pr_quantity']});}}
var basket={products:my_pdts};(function(){var tc_so_script=document.createElement('script');tc_so_script.id='tc_script_5_4';tc_so_script.type='text/javascript';tc_so_script.async='async';tc_so_script.src=('https:'==document.location.protocol?'https://':'http://')
+'eu-sonar.sociomantic.com/js/2010-07-01/adpan/cdiscount-fr';var tc_so_obj=document.getElementsByTagName('script')[0];tc_so_obj.parentNode.insertBefore(tc_so_script,tc_so_obj);})();}
if(tc_vars["pg_type"]=='FicheProduit'||tc_vars["pg_type"]=='Liste OffreMP'||tc_vars["pg_type"]=='Panier'){tc_array_launched_tags_1.push('iAdvize Load');tc_array_launched_tags_keys_1.push('83');var idzLoadMe=1;}
tc_array_launched_tags_1.push('iAdvize Chat window');tc_array_launched_tags_keys_1.push('85');var idzCustomData={"page_type":tc_vars["pg_type"],"univers":tc_vars["pg_cat2"],"rayon":tc_vars["pg_cat3"],"brand":tc_vars["pr_trademark"],"product_sku":tc_vars["pr_sku"],"product_name":tc_vars["pr_name"],"product_price":tc_vars["pr_up_ati"],"cart_amount":(parseFloat(tc_vars["sf_amt_ati"])+parseFloat(tc_vars["sf_ship"])+parseFloat(tc_vars["sf_fees"])).toFixed(2)};var idzcook={setCookie:function(e,t,n){if(n){var r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);var i=";expires="+r.toGMTString()}
else var i="";document.cookie=e+"="+t+i+"; path=/"},getCookie:function(e){var t=e+"=",n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" "){i=i.substring(1,i.length);}
if(i.indexOf(t)==0){return i.substring(t.length,i.length);}}
return null;}};var iAdvizeCallbacks={onChatStarted:function(obj){idzcook.setCookie('idzchat',1,30);},onChatEnded:function(obj){idzcook.setCookie('idzchat','',-1);}};(function(){var idz=window.idzLoadMe||idzcook.getCookie('idzchat');var e=document.createElement(idz?'script':'img');e.src=document.location.protocol+'//'+'cdlc.iadvize.com/'+(idz?'iadvize.js':'pixel.php')+'?sid='+tc_iadvize_sid+'&lang=fr';if(idz){e.type='text/javascript';e.async=true;document.getElementsByTagName('body')[0].appendChild(e);}})();if(Math.floor(Math.random()*1000)==0){var tc_ssl=(("https:"==document.location.protocol)?"https://manager.":"http://redirect335.");var imageEltCounter=document.createElement("img");imageEltCounter.src=tc_ssl+"tagcommander.com/utils/hit.php?id=1&site=335&version=16.00&frequency=1000&rand="+Math.random();imageEltCounter.width=1;imageEltCounter.height=1;document.body.appendChild(imageEltCounter);}}
function tc_ajx_exec_1(tc_vars_ajax){}
function tc_events_1(tc_elt,tc_id_event,tc_array_events){tc_array_events["id"]=tc_id_event;}