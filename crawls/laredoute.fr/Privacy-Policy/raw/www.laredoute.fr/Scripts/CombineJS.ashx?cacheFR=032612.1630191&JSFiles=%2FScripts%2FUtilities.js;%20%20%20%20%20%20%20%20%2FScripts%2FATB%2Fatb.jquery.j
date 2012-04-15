

var $j=jQuery.noConflict();function isNullOrUndefined(elem){if(elem==undefined||null==elem)return true;return false;};function isEmpty(field_val){if(isNullOrUndefined(field_val))return true;var field_val=$j.trim(field_val);if(field_val.length<=0)return true;return false;};function GetUrlParamValue(name){if(isNullOrUndefined(window))return null;if(isNullOrUndefined(window.location))return null;if(isNullOrUndefined(window.location.href))return null;name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(isNullOrUndefined(results))return null;if(0==results.length)return null;return unescape(results[1]);};function generateGuid()
{var result,i,j;result='';for(j=0;j<32;j++)
{if(j==8||j==12||j==16||j==20)
result=result+'-';i=Math.floor(Math.random()*16).toString(16).toUpperCase();result=result+i;}
return result}
function GetReturnUrl(){var returnUrl=GetUrlParamValue("ReturnUrl");if(isNullOrUndefined(returnUrl)){if(window.location.href.indexOf('Basket.aspx')>0){return window.location.href.split('#')[0];}
if(window.location.href.indexOf('RPremiumOffer.aspx')>0){return window.location.href.split('#')[0];}
if(window.location.href.indexOf('RExpressOffer.aspx')>0){return window.location.href.split('#')[0];}
else{return null;}}
return returnUrl.replace(/\~/ig,'');};function GetEncryptedReturnUrl(){var returnUrl=GetUrlParamValue("ReturnUrl");if(isNullOrUndefined(returnUrl))return null;if(returnUrl.indexOf("?")>0)
{var arrQuerystring=returnUrl.split('?');if(arrQuerystring.length>1)
{returnUrl=arrQuerystring[0]+"?"+LRFREncodeUrlString(arrQuerystring[1]);}}
return returnUrl.replace(/\~/ig,'');};function GetTemplateTypeUrl(){var returnUrl=GetUrlParamValue("TemplateType");if(isNullOrUndefined(returnUrl))return null;return returnUrl.replace(/\~/ig,'');};function IsInCheckoutPipeline(){var returnUrl=GetReturnUrl();if(isNullOrUndefined(returnUrl))return false;if(returnUrl.indexOf('DirectOrderForm.aspx')!==-1)return true;if(returnUrl.indexOf('Basket.aspx')!==-1)return true;if((returnUrl.indexOf('SubscriptionNewsletters.aspx')!==-1)||(returnUrl.indexOf('RequestCataHomeDeliv.aspx')!==-1)||(returnUrl.indexOf('Orders.aspx')!==-1)||(returnUrl.indexOf('WishList.aspx')!==-1)){return true;}
if(returnUrl.indexOf('Checkout')!==-1)return true;return true;};function DoTransiton(transition,mferrortype){if(isNullOrUndefined(transition)){window.location.href=Urls.TechnicalErrorPage;}else{window.location.href=transition.replace(/\~/ig,'')+"?errortype="+mferrortype;}};function addSVToUrl(urlToPost){var sv=GetUrlParamValue("SV");if(isNullOrUndefined(sv)){sv=GetUrlParamValue("sv");}
if(!isNullOrUndefined(sv)){urlToPost=$j.format("{0}&sv={1}",urlToPost,sv);}
return urlToPost;};function clientValidations(){var cv=GetUrlParamValue("CV");if(isNullOrUndefined(cv)){cv=GetUrlParamValue("cv");}
if(isNullOrUndefined(cv))return true;return false;};function showGenericMessage(displayMsg)
{if($j.trim(displayMsg)!=''){$j('#account div.mferror_message').removeClass("d-off").addClass("d-on").html(displayMsg);}};function hideGenericErrorMessage()
{$j('#account div.mferror_message').removeClass("d-on").addClass("d-off");};function hideFieldHelpErrorWarningMessage()
{$j(parentSelector+'.contextualHelp').hide();$j(parentSelector+'.contextualError').hide();$j(parentSelector+'.contextualWarn').hide();};function hideFieldErrorWarningMessage()
{$j(parentSelector+'.contextualError').hide();$j(parentSelector+'.contextualWarn').hide();};function hideFieldWarningMessage()
{$j(parentSelector+'.contextualWarn').hide();};function hideFieldErrorMessage()
{$j(parentSelector+'.contextualError').hide();};function hideFieldHelpMessage()
{$j(parentSelector+'.contextualHelp').hide();};function HtmlDecode(s)
{var out="";if(s==null)return;var l=s.length;for(var i=0;i<l;i++)
{var ch=s.charAt(i);if(ch=='&')
{var semicolonIndex=s.indexOf(';',i+1);if(semicolonIndex>0)
{var entity=s.substring(i+1,semicolonIndex);if(entity.length>1&&entity.charAt(0)=='#')
{if(entity.charAt(1)=='x'||entity.charAt(1)=='X')
ch=String.fromCharCode(eval('0'+entity.substring(1)));else
ch=String.fromCharCode(eval(entity.substring(1)));}
else
{switch(entity)
{case'quot':ch=String.fromCharCode(0x0022);break;case'amp':ch=String.fromCharCode(0x0026);break;case'lt':ch=String.fromCharCode(0x003c);break;case'gt':ch=String.fromCharCode(0x003e);break;case'nbsp':ch=String.fromCharCode(0x00a0);break;case'iexcl':ch=String.fromCharCode(0x00a1);break;case'cent':ch=String.fromCharCode(0x00a2);break;case'pound':ch=String.fromCharCode(0x00a3);break;case'curren':ch=String.fromCharCode(0x00a4);break;case'yen':ch=String.fromCharCode(0x00a5);break;case'brvbar':ch=String.fromCharCode(0x00a6);break;case'sect':ch=String.fromCharCode(0x00a7);break;case'uml':ch=String.fromCharCode(0x00a8);break;case'copy':ch=String.fromCharCode(0x00a9);break;case'ordf':ch=String.fromCharCode(0x00aa);break;case'laquo':ch=String.fromCharCode(0x00ab);break;case'not':ch=String.fromCharCode(0x00ac);break;case'shy':ch=String.fromCharCode(0x00ad);break;case'reg':ch=String.fromCharCode(0x00ae);break;case'macr':ch=String.fromCharCode(0x00af);break;case'deg':ch=String.fromCharCode(0x00b0);break;case'plusmn':ch=String.fromCharCode(0x00b1);break;case'sup2':ch=String.fromCharCode(0x00b2);break;case'sup3':ch=String.fromCharCode(0x00b3);break;case'acute':ch=String.fromCharCode(0x00b4);break;case'micro':ch=String.fromCharCode(0x00b5);break;case'para':ch=String.fromCharCode(0x00b6);break;case'middot':ch=String.fromCharCode(0x00b7);break;case'cedil':ch=String.fromCharCode(0x00b8);break;case'sup1':ch=String.fromCharCode(0x00b9);break;case'ordm':ch=String.fromCharCode(0x00ba);break;case'raquo':ch=String.fromCharCode(0x00bb);break;case'frac14':ch=String.fromCharCode(0x00bc);break;case'frac12':ch=String.fromCharCode(0x00bd);break;case'frac34':ch=String.fromCharCode(0x00be);break;case'iquest':ch=String.fromCharCode(0x00bf);break;case'Agrave':ch=String.fromCharCode(0x00c0);break;case'Aacute':ch=String.fromCharCode(0x00c1);break;case'Acirc':ch=String.fromCharCode(0x00c2);break;case'Atilde':ch=String.fromCharCode(0x00c3);break;case'Auml':ch=String.fromCharCode(0x00c4);break;case'Aring':ch=String.fromCharCode(0x00c5);break;case'AElig':ch=String.fromCharCode(0x00c6);break;case'Ccedil':ch=String.fromCharCode(0x00c7);break;case'Egrave':ch=String.fromCharCode(0x00c8);break;case'Eacute':ch=String.fromCharCode(0x00c9);break;case'Ecirc':ch=String.fromCharCode(0x00ca);break;case'Euml':ch=String.fromCharCode(0x00cb);break;case'Igrave':ch=String.fromCharCode(0x00cc);break;case'Iacute':ch=String.fromCharCode(0x00cd);break;case'Icirc':ch=String.fromCharCode(0x00ce);break;case'Iuml':ch=String.fromCharCode(0x00cf);break;case'ETH':ch=String.fromCharCode(0x00d0);break;case'Ntilde':ch=String.fromCharCode(0x00d1);break;case'Ograve':ch=String.fromCharCode(0x00d2);break;case'Oacute':ch=String.fromCharCode(0x00d3);break;case'Ocirc':ch=String.fromCharCode(0x00d4);break;case'Otilde':ch=String.fromCharCode(0x00d5);break;case'Ouml':ch=String.fromCharCode(0x00d6);break;case'times':ch=String.fromCharCode(0x00d7);break;case'Oslash':ch=String.fromCharCode(0x00d8);break;case'Ugrave':ch=String.fromCharCode(0x00d9);break;case'Uacute':ch=String.fromCharCode(0x00da);break;case'Ucirc':ch=String.fromCharCode(0x00db);break;case'Uuml':ch=String.fromCharCode(0x00dc);break;case'Yacute':ch=String.fromCharCode(0x00dd);break;case'THORN':ch=String.fromCharCode(0x00de);break;case'szlig':ch=String.fromCharCode(0x00df);break;case'agrave':ch=String.fromCharCode(0x00e0);break;case'aacute':ch=String.fromCharCode(0x00e1);break;case'acirc':ch=String.fromCharCode(0x00e2);break;case'atilde':ch=String.fromCharCode(0x00e3);break;case'auml':ch=String.fromCharCode(0x00e4);break;case'aring':ch=String.fromCharCode(0x00e5);break;case'aelig':ch=String.fromCharCode(0x00e6);break;case'ccedil':ch=String.fromCharCode(0x00e7);break;case'egrave':ch=String.fromCharCode(0x00e8);break;case'eacute':ch=String.fromCharCode(0x00e9);break;case'ecirc':ch=String.fromCharCode(0x00ea);break;case'euml':ch=String.fromCharCode(0x00eb);break;case'igrave':ch=String.fromCharCode(0x00ec);break;case'iacute':ch=String.fromCharCode(0x00ed);break;case'icirc':ch=String.fromCharCode(0x00ee);break;case'iuml':ch=String.fromCharCode(0x00ef);break;case'eth':ch=String.fromCharCode(0x00f0);break;case'ntilde':ch=String.fromCharCode(0x00f1);break;case'ograve':ch=String.fromCharCode(0x00f2);break;case'oacute':ch=String.fromCharCode(0x00f3);break;case'ocirc':ch=String.fromCharCode(0x00f4);break;case'otilde':ch=String.fromCharCode(0x00f5);break;case'ouml':ch=String.fromCharCode(0x00f6);break;case'divide':ch=String.fromCharCode(0x00f7);break;case'oslash':ch=String.fromCharCode(0x00f8);break;case'ugrave':ch=String.fromCharCode(0x00f9);break;case'uacute':ch=String.fromCharCode(0x00fa);break;case'ucirc':ch=String.fromCharCode(0x00fb);break;case'uuml':ch=String.fromCharCode(0x00fc);break;case'yacute':ch=String.fromCharCode(0x00fd);break;case'thorn':ch=String.fromCharCode(0x00fe);break;case'yuml':ch=String.fromCharCode(0x00ff);break;case'OElig':ch=String.fromCharCode(0x0152);break;case'oelig':ch=String.fromCharCode(0x0153);break;case'Scaron':ch=String.fromCharCode(0x0160);break;case'scaron':ch=String.fromCharCode(0x0161);break;case'Yuml':ch=String.fromCharCode(0x0178);break;case'fnof':ch=String.fromCharCode(0x0192);break;case'circ':ch=String.fromCharCode(0x02c6);break;case'tilde':ch=String.fromCharCode(0x02dc);break;case'Alpha':ch=String.fromCharCode(0x0391);break;case'Beta':ch=String.fromCharCode(0x0392);break;case'Gamma':ch=String.fromCharCode(0x0393);break;case'Delta':ch=String.fromCharCode(0x0394);break;case'Epsilon':ch=String.fromCharCode(0x0395);break;case'Zeta':ch=String.fromCharCode(0x0396);break;case'Eta':ch=String.fromCharCode(0x0397);break;case'Theta':ch=String.fromCharCode(0x0398);break;case'Iota':ch=String.fromCharCode(0x0399);break;case'Kappa':ch=String.fromCharCode(0x039a);break;case'Lambda':ch=String.fromCharCode(0x039b);break;case'Mu':ch=String.fromCharCode(0x039c);break;case'Nu':ch=String.fromCharCode(0x039d);break;case'Xi':ch=String.fromCharCode(0x039e);break;case'Omicron':ch=String.fromCharCode(0x039f);break;case'Pi':ch=String.fromCharCode(0x03a0);break;case' Rho ':ch=String.fromCharCode(0x03a1);break;case'Sigma':ch=String.fromCharCode(0x03a3);break;case'Tau':ch=String.fromCharCode(0x03a4);break;case'Upsilon':ch=String.fromCharCode(0x03a5);break;case'Phi':ch=String.fromCharCode(0x03a6);break;case'Chi':ch=String.fromCharCode(0x03a7);break;case'Psi':ch=String.fromCharCode(0x03a8);break;case'Omega':ch=String.fromCharCode(0x03a9);break;case'alpha':ch=String.fromCharCode(0x03b1);break;case'beta':ch=String.fromCharCode(0x03b2);break;case'gamma':ch=String.fromCharCode(0x03b3);break;case'delta':ch=String.fromCharCode(0x03b4);break;case'epsilon':ch=String.fromCharCode(0x03b5);break;case'zeta':ch=String.fromCharCode(0x03b6);break;case'eta':ch=String.fromCharCode(0x03b7);break;case'theta':ch=String.fromCharCode(0x03b8);break;case'iota':ch=String.fromCharCode(0x03b9);break;case'kappa':ch=String.fromCharCode(0x03ba);break;case'lambda':ch=String.fromCharCode(0x03bb);break;case'mu':ch=String.fromCharCode(0x03bc);break;case'nu':ch=String.fromCharCode(0x03bd);break;case'xi':ch=String.fromCharCode(0x03be);break;case'omicron':ch=String.fromCharCode(0x03bf);break;case'pi':ch=String.fromCharCode(0x03c0);break;case'rho':ch=String.fromCharCode(0x03c1);break;case'sigmaf':ch=String.fromCharCode(0x03c2);break;case'sigma':ch=String.fromCharCode(0x03c3);break;case'tau':ch=String.fromCharCode(0x03c4);break;case'upsilon':ch=String.fromCharCode(0x03c5);break;case'phi':ch=String.fromCharCode(0x03c6);break;case'chi':ch=String.fromCharCode(0x03c7);break;case'psi':ch=String.fromCharCode(0x03c8);break;case'omega':ch=String.fromCharCode(0x03c9);break;case'thetasym':ch=String.fromCharCode(0x03d1);break;case'upsih':ch=String.fromCharCode(0x03d2);break;case'piv':ch=String.fromCharCode(0x03d6);break;case'ensp':ch=String.fromCharCode(0x2002);break;case'emsp':ch=String.fromCharCode(0x2003);break;case'thinsp':ch=String.fromCharCode(0x2009);break;case'zwnj':ch=String.fromCharCode(0x200c);break;case'zwj':ch=String.fromCharCode(0x200d);break;case'lrm':ch=String.fromCharCode(0x200e);break;case'rlm':ch=String.fromCharCode(0x200f);break;case'ndash':ch=String.fromCharCode(0x2013);break;case'mdash':ch=String.fromCharCode(0x2014);break;case'lsquo':ch=String.fromCharCode(0x2018);break;case'rsquo':ch=String.fromCharCode(0x2019);break;case'sbquo':ch=String.fromCharCode(0x201a);break;case'ldquo':ch=String.fromCharCode(0x201c);break;case'rdquo':ch=String.fromCharCode(0x201d);break;case'bdquo':ch=String.fromCharCode(0x201e);break;case'dagger':ch=String.fromCharCode(0x2020);break;case'Dagger':ch=String.fromCharCode(0x2021);break;case'bull':ch=String.fromCharCode(0x2022);break;case'hellip':ch=String.fromCharCode(0x2026);break;case'permil':ch=String.fromCharCode(0x2030);break;case'prime':ch=String.fromCharCode(0x2032);break;case'Prime':ch=String.fromCharCode(0x2033);break;case'lsaquo':ch=String.fromCharCode(0x2039);break;case'rsaquo':ch=String.fromCharCode(0x203a);break;case'oline':ch=String.fromCharCode(0x203e);break;case'frasl':ch=String.fromCharCode(0x2044);break;case'euro':ch=String.fromCharCode(0x20ac);break;case'image':ch=String.fromCharCode(0x2111);break;case'weierp':ch=String.fromCharCode(0x2118);break;case'real':ch=String.fromCharCode(0x211c);break;case'trade':ch=String.fromCharCode(0x2122);break;case'alefsym':ch=String.fromCharCode(0x2135);break;case'larr':ch=String.fromCharCode(0x2190);break;case'uarr':ch=String.fromCharCode(0x2191);break;case'rarr':ch=String.fromCharCode(0x2192);break;case'darr':ch=String.fromCharCode(0x2193);break;case'harr':ch=String.fromCharCode(0x2194);break;case'crarr':ch=String.fromCharCode(0x21b5);break;case'lArr':ch=String.fromCharCode(0x21d0);break;case'uArr':ch=String.fromCharCode(0x21d1);break;case'rArr':ch=String.fromCharCode(0x21d2);break;case'dArr':ch=String.fromCharCode(0x21d3);break;case'hArr':ch=String.fromCharCode(0x21d4);break;case'forall':ch=String.fromCharCode(0x2200);break;case'part':ch=String.fromCharCode(0x2202);break;case'exist':ch=String.fromCharCode(0x2203);break;case'empty':ch=String.fromCharCode(0x2205);break;case'nabla':ch=String.fromCharCode(0x2207);break;case'isin':ch=String.fromCharCode(0x2208);break;case'notin':ch=String.fromCharCode(0x2209);break;case'ni':ch=String.fromCharCode(0x220b);break;case'prod':ch=String.fromCharCode(0x220f);break;case'sum':ch=String.fromCharCode(0x2211);break;case'minus':ch=String.fromCharCode(0x2212);break;case'lowast':ch=String.fromCharCode(0x2217);break;case'radic':ch=String.fromCharCode(0x221a);break;case'prop':ch=String.fromCharCode(0x221d);break;case'infin':ch=String.fromCharCode(0x221e);break;case'ang':ch=String.fromCharCode(0x2220);break;case'and':ch=String.fromCharCode(0x2227);break;case'or':ch=String.fromCharCode(0x2228);break;case'cap':ch=String.fromCharCode(0x2229);break;case'cup':ch=String.fromCharCode(0x222a);break;case'int':ch=String.fromCharCode(0x222b);break;case'there4':ch=String.fromCharCode(0x2234);break;case'sim':ch=String.fromCharCode(0x223c);break;case'cong':ch=String.fromCharCode(0x2245);break;case'asymp':ch=String.fromCharCode(0x2248);break;case'ne':ch=String.fromCharCode(0x2260);break;case'equiv':ch=String.fromCharCode(0x2261);break;case'le':ch=String.fromCharCode(0x2264);break;case'ge':ch=String.fromCharCode(0x2265);break;case'sub':ch=String.fromCharCode(0x2282);break;case'sup':ch=String.fromCharCode(0x2283);break;case'nsub':ch=String.fromCharCode(0x2284);break;case'sube':ch=String.fromCharCode(0x2286);break;case'supe':ch=String.fromCharCode(0x2287);break;case'oplus':ch=String.fromCharCode(0x2295);break;case'otimes':ch=String.fromCharCode(0x2297);break;case'perp':ch=String.fromCharCode(0x22a5);break;case'sdot':ch=String.fromCharCode(0x22c5);break;case'lceil':ch=String.fromCharCode(0x2308);break;case'rceil':ch=String.fromCharCode(0x2309);break;case'lfloor':ch=String.fromCharCode(0x230a);break;case'rfloor':ch=String.fromCharCode(0x230b);break;case'lang':ch=String.fromCharCode(0x2329);break;case'rang':ch=String.fromCharCode(0x232a);break;case'loz':ch=String.fromCharCode(0x25ca);break;case'spades':ch=String.fromCharCode(0x2660);break;case'clubs':ch=String.fromCharCode(0x2663);break;case'hearts':ch=String.fromCharCode(0x2665);break;case'diams':ch=String.fromCharCode(0x2666);break;default:ch='';break;}}
i=semicolonIndex;}}
out+=ch;}
return out;}
(function($){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={'array':function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a[a.length]=v;b=true;}}}
a[a.length]=']';return a.join('');},'boolean':function(x){return String(x);},'null':function(x){return"null";},'number':function(x){return isFinite(x)?String(x):'null';},'object':function(x){if(x){if(x instanceof Array){return s.array(x);}
var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a.push(s.string(i),':',v);b=true;}}}
a[a.length]='}';return a.join('');}
return'null';},'string':function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);});}
return'"'+x+'"';}};$j.toJSON=function(v){var f=isNaN(v)?s[typeof v]:s['number'];if(f)return f(v);};$j.parseJSON=function(v,safe){if(safe===undefined)safe=$j.parseJSON.safe;if(safe&&!/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v))
return undefined;return eval('('+v+')');};$j.parseJSON.safe=false;})(jQuery);function GetDeliveryInfoText(availCode,availableDate,backorderDate)
{var availPeriod=0;var retVal='';if(availCode==1)
{retVal=productavailablilityinstock;availPeriod=availableDate;}
else
{retVal=productavailablilitybackordered;availPeriod=backorderDate;}
if((availPeriod==0)||(typeof(availPeriod)=='undefined'))
return retVal;if(retVal.length>0)
var SEPARATOR=" ";else
var SEPARATOR="";var deliveryUnit=CalculateDeliveryUnit(availPeriod);switch(deliveryUnit)
{case 1:deliveryValue=availPeriod*24;return retVal+=SEPARATOR+deliveryinfoinhours.replace(deliveryDelimiter.toLowerCase(),deliveryValue);break;case 2:deliveryValue=availPeriod;return retVal+=SEPARATOR+deliveryinfoindays.replace(deliveryDelimiter.toLowerCase(),deliveryValue);break;case 3:deliveryValue=Math.floor(availPeriod/7);return retVal+=SEPARATOR+deliveryinfoinweeks.replace(deliveryDelimiter.toLowerCase(),deliveryValue);break;}}
function CalculateDeliveryUnit(delayTime)
{if(delayTime<=3)
return 1;else if(delayTime<=13)
return 2;else
return 3;}
function checkForNopeCookie(){nope=ParseQueryStringIgnoreCase("NC");if(!isNullOrUndefined(nope)&&nope!=""){if(nope.length>4){nope=nope.substring(0,5);setSubCookieAndCookie("M.R.SpecialOffers","NC",nope);}}}
function ParseQueryStringIgnoreCase(key){qsFull=window.location.search.substring(1);qsKeyValueArr=qsFull.split('&');for(i=0;i<qsKeyValueArr.length;i++){currentKey=qsKeyValueArr[i].split('=');if(currentKey[0].toUpperCase()==key.toUpperCase()){return currentKey[1];}}}
function OpenCenteredPopUp(url,width,height){var xPos=(screen.width-width)/2;var yPos=(screen.height-height)/2;window.open(url,'',"menubar=no,status=no,width="+width+",height="+height+",scrollbars=yes,resizable=yes,left="+xPos+",top="+yPos);}
function alphanumeric(alphane){var numaric=alphane;for(var j=0;j<numaric.length;j++){var alphaa=numaric.charAt(j);var hh=alphaa.charCodeAt(0);if((hh>47&&hh<58)||(hh>64&&hh<91)||(hh>96&&hh<123)){}
else{return false;}}
return true;}
$j(document).ready(function(){checkForNopeCookie();});function LogAjaxError(src,message){$j.ajax({type:'POST',url:'/Utilities/AjaxLogError.aspx',data:{'Src':src,'Message':message},success:function(){},error:function(){},cache:false,async:true,timeout:300000});}
function GetFullImgPath(fileName){return Media3LevelHierarchyURL+'/'+fileName.substring(6,7)+'/'+fileName.substring(7,8)+'/'+fileName.substring(8,9)+'/'+fileName;}

var isDO=false;var EnumAddToBasketCallingPage={Default:'Default',PDP:'ProductDetailPage',MPD:'MultiProductDetailPage',ListPageCompResult:'ComparisionResultPage',DirectOrder:'DirectOrder',MiniPDP:'MiniPDP',Basket:'Basket',BasketProposedService:'BasketProposedService',Wishlist:'Wishlist'};var EnumAddToWishListCallingPage={Default:'Default',PDP:'ProductDetailPage',MPD:'MultiProductDetailPage',MiniPDP:'MiniPDP',WishList:'WishList'};var AddToBasketCallingPage=EnumAddToBasketCallingPage.Default;var AddToWishListCallingPage=EnumAddToWishListCallingPage.Default;var isSearchResultProduct=0;toNumber=function(val){return parseInt(parseFloat(replaceCommaWithPeriod(val)));};replaceCommaWithPeriod=function(val){var retString='';if(isNullOrUndefined(val))return'';var strVal=new String(val);var num_array=strVal.split(',');if(1==num_array.length)return strVal;for(var index=0,tot=(num_array.length-1);index<tot;index++){retString=retString+num_array[index];}
retString=retString+"."+num_array[num_array.length-1];return retString;};function toFloat(val){if(val==null||typeof val=='undefined')return 0;return parseFloat(replaceCommaWithPeriod(val));}
function toBoolean(val){if(val==null||typeof val=='undefined')return false;return val.toLowerCase()=="true";}
isNullOrUndefined=function(elem){if(elem==undefined||null==elem)return true;return false;};var c_serviceSizeCode='99999';var c_atbUrl='/Shopping_Basket/AjaxAddToBasket.aspx';var c_basketURL="/Panier/Basket.aspx";var c_atwlUrl='/WishList/AjaxAddToWishList.aspx';var c_addMode='add';var c_updateMode='update';var c_deleteMode='delete';var c_setlowstockflag='setlowstockflag';var c_getServicesQS='?getServicesForProducts=true';var c_getServicesFalseQS='?getServicesForProducts=false';var c_atbQS='?addToBasket=true';var c_atwlQS='?addToWishList=true';var c_sslayerQS='?showSubLayer=true';var c_getPushProductQS='&getPushProducts=true';var c_modifyQS='?modifyBasket=true&lineItemId=';var c_modifyWLQS='?modifyWishList=true&lineItemId=';var c_deleteQS='?deleteBasket=true&lineItemId=';var c_setlowstockflagQS='?setlowstockflagWishList=true&lowstockflag=';var c_deleteWLQS='?deleteWishList=true&lineItemId=';var c_deleteWLCountQA='&totalwllineitemcount=';var c_wishlistURL="/MySpace/Wishlist.aspx";var c_techErrorUrl="/Error_Pages/Error404_technical_error.aspx";var productsToAdd=null;var services=null;var pushProducts=null;var currentOptions=null;var currentIsEcoPart=null;var TotalWLItemsCount=0;var isAvailProdcut=false;var availRequestsJSON=null;function GenericATBError(showAlert){if(!isNullOrUndefined(showAlert)&&showAlert){alert("Une erreur est survenue durant l'ajout au panier.");}
return false;}
function ValidateFRProductArray(frProducts,showAlert){if(isNullOrUndefined(frProducts)||(frProducts.length<=0)){return GenericATBError(showAlert);}
for(var j=0;j<frProducts.length;j++){if(!isNullOrUndefined(frProducts[j].SoldByMeter)&&(frProducts[j].SoldByMeter.toString().toLowerCase()=="true")){if(frProducts[j].Quantity>15){if(!isNullOrUndefined(showAlert)&&showAlert){alert("Veuillez saisir une quantit\351 num\351rique inf\351rieure \340 1000.");}
return false;}}
else{if(frProducts[j].Quantity>1500){if(!isNullOrUndefined(showAlert)&&showAlert){alert("Veuillez saisir une quantit\351 num\351rique inf\351rieure \340 200.");}
return false;}}}
return true;}
function ATBIsSKUAvailable(size_json,showAlert){if(isNullOrUndefined(size_json)){if(!isNullOrUndefined(showAlert)&&showAlert){alert("Une produit n’est pas disponible pour cette taille ou ce coloris.");}
return false;}
if(size_json.AVCD=="1"||size_json.AVCD=="2"){return true;}
if(!isNullOrUndefined(showAlert)&&showAlert){alert("Une produit n’est pas disponible pour cette taille ou ce coloris.");}
return false;}
function ATBGetServices(size_json,frProd){if(isNullOrUndefined(size_json)||isNullOrUndefined(frProd)||isNullOrUndefined(size_json.Services)||(size_json.Services.length<=0)){return null;}
var services=JSONQuery("[?SType=3]",size_json.Services);if(isNullOrUndefined(services)||(services.length<=0)){return null;}
var ATBServices=null;var tempArr=new Array();ATBServices=$j.extend(true,tempArr,services);if(isNullOrUndefined(ATBServices)||(ATBServices.length<=0)){return null;}
for(var j=0;j<ATBServices.length;j++){ATBServices[j].MainProductGUID=frProd.LineItemGUID;}
return ATBServices;}
function ATBGetProductDetailsJSON(productId,documentId,productJSONList){if(isNullOrUndefined(productId)||isNullOrUndefined(documentId)||isNullOrUndefined(productJSONList)){return null;}
var prod_json_array;prod_json_array=JSONQuery("[?PIDDID='"+productId+documentId+"']",productJSONList);if(isNullOrUndefined(prod_json_array)){return null;}
var prod_details_json=prod_json_array[0].Details;if(isNullOrUndefined(prod_details_json)){return null;}
return prod_details_json;}
function ATBGetColorJSON(prod_details_json,firstDimRef,bIntRef){if(isNullOrUndefined(prod_details_json)||isNullOrUndefined(firstDimRef)){return null;}
var color_json_array;color_json_array=JSONQuery("[?IREF='"+firstDimRef+"']",prod_details_json.COLORS);if(isNullOrUndefined(color_json_array)){return null;}
if(color_json_array.length!=1){return null;}
var color_json=color_json_array[0];if(isNullOrUndefined(color_json)){return null;}
return color_json;}
function ATBGetSizeJSON(color_json,secDimRef,bIntRef){if(isNullOrUndefined(color_json)||isNullOrUndefined(secDimRef)){return null;}
var size_json_array;size_json_array=JSONQuery("[?SIREF='"+secDimRef+"']",color_json.SDIM);if(isNullOrUndefined(size_json_array)){return null;}
if(size_json_array.length!=1){return null;}
var size_json=size_json_array[0];if(isNullOrUndefined(size_json)){return null;}
return size_json;}
function FRProduct(quantity,personalization,prod_details_json,color_json,size_json,categoryName){if(isNullOrUndefined(quantity)||isNullOrUndefined(personalization)||isNullOrUndefined(prod_details_json)||isNullOrUndefined(color_json)||isNullOrUndefined(size_json)){return null;}
if(isNaN(quantity)||toNumber(quantity)<1){return null;}
var atbLayerProdImage=color_json.SmallPict;if($j.trim(atbLayerProdImage)==""){atbLayerProdImage=color_json.BigPict;}
this.InternalReference=color_json.IREF;this.SecInternalReference=size_json.SIREF;this.ItemOfferId=size_json.OID;this.Title=prod_details_json.TITL;this.ProductId=prod_details_json.PID;this.DocumentId=prod_details_json.DID;this.CategoryId=prod_details_json.CID;this.PresCode=color_json.PZ;this.SizeCode=size_json.HSZ;this.CategoryName=categoryName;this.Origin="1";this.AssociatedItemId="0";this.Price=replaceCommaWithPeriod(size_json.SPAS);this.UnitPrice=replaceCommaWithPeriod(size_json.UNPR);this.Personalization=personalization;this.ColorText=color_json.CNM;this.SizeText=size_json.TXT;this.HasAssociatedService=size_json.ISAS.toLowerCase();this.CkgCode="0";this.CkgPrice="0";this.IsEcoPart=toBoolean(size_json.D3EF)?"true":"false";this.Quantity=quantity;this.Discount=size_json.DSAM;this.NoReductBrand=size_json.SNRB.toLowerCase();this.StrikePrice=replaceCommaWithPeriod(size_json.STPR);this.ParentLineItemGUID="";this.LineItemGUID=generateGuid();this.Description=atbLayerProdImage;if(prod_details_json.Vdrinfo!=null){this.VendorId=prod_details_json.Vdrinfo.Id;this.isMarketPlaceProduct=prod_details_json.Vdrinfo.IsMktpr
this.VendorName=prod_details_json.Vdrinfo.Vn;}}
function ATBServiceToFRProduct(service,frProd){if(isNullOrUndefined(service)||isNullOrUndefined(frProd)){return null;}
var prod=new FRProduct();if(isNullOrUndefined(prod)){return null;}
prod.PresCode=service.PZ;prod.SizeCode=c_serviceSizeCode;prod.Price=toFloat(service.Price);prod.ItemOfferId=service.OID;prod.Title=service.Desc;prod.Description=service.Img;prod.ParentLineItemGUID=frProd.LineItemGUID;prod.LineItemGUID=generateGuid();if(!isNullOrUndefined(frProd.SoldByMeter)&&(frProd.SoldByMeter.toString().toLowerCase()=="true")){prod.Quantity=1;}
else{prod.Quantity=frProd.Quantity;}
return prod;}
var blockATBActions=false;var isServicesCall=false;function AddToBasket(productList,options,serviceList,pushList,miniPdpObject,lineItemId,excludedAvailProducts){if(blockATBActions==true){return;}
blockATBActions=true;productsToAdd=productList;currentOptions=options;pushProducts=pushList;if(isNullOrUndefined(productsToAdd)||(currentOptions.mode!=c_addMode&&currentOptions.mode!=c_updateMode&&currentOptions.mode!=c_deleteMode)){ErrorDisplay("Une erreur est survenue durant l'ajout au panier.");blockATBActions=false;return;}
if(options.forceCallingServices==true){var url=c_getServicesQS;var onSuccess=function(data){isServicesCall=false;if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);blockATBActions=false;return;}
services=data.Services;if(options.mode==c_addMode){var showServicesLayer=true;for(product in productList){if(productList[product].ParentLineItemGUID!=null&&productList[product].ParentLineItemGUID!=''){showServicesLayer=false;break;}}
if(showServicesLayer&&!isNullOrUndefined(services)&&(services.length>0)){if(AddToBasketCallingPage==EnumAddToBasketCallingPage.MiniPDP){$j('.miniPdpBox').remove();}
BindServicesLayer(productList,services);ShowServicesLayer();blockATBActions=false;}else{var url=c_atbQS;if(options.callPushProduct==true&&pushProducts==null){url+=c_getPushProductQS;}
if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);blockATBActions=false;return;}
if(options.callPushProduct==true&&pushProducts==null){pushProducts=data.PushProducts;}
services=null;if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){UpdateBasketCount();blockATBActions=false;showModal(defaultContent);GoToBasket();return true;}
else if(AddToBasketCallingPage==EnumAddToBasketCallingPage.BasketProposedService){UpdateBasketCount();blockATBActions=false;if(!isNullOrUndefined(lineItemId)){GoToSpecificBasketItem(lineItemId);}
else{GoToBasket();}
return true;}
else if(!isNullOrUndefined(isDO)&&isDO){UpdateBasketCount();blockATBActions=false;showModal(defaultContent);GoToBasket();return true;}else{if(AddToBasketCallingPage==EnumAddToBasketCallingPage.MiniPDP){$j('.miniPdpBox').remove();}
if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Wishlist){showModal(defaultContent);GoToBasket();return true;}
UpdateBasketCount();BindATBLayer(productsToAdd);ShowATBLayer();$j('#ATBLayer .associated_products .quick_view_overlay,#ATBLayer .associated_products .quick_view_overlay_button').remove();$j('#ATBLayer .associated_products .product_picture').addMiniPDPOnPush('Cross sell ATB');productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;}
setAddToBasketOmnitureTags(data.OmnitureATBJSON);};CallATBPage(url,productList,true,onSuccess);}}else if(options.mode==c_updateMode){var url=c_modifyQS+lineItemId;if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);return;}
var tmpInternalReference=productsToAdd[0].InternalReference;productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;setAddToBasketOmnitureTags(data.OmnitureATBJSON);if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){showModal(defaultContent);if(!isNullOrUndefined(lineItemId)){GoToSpecificBasketItem(lineItemId);}
else{GoToBasket();}}else{GoToBasket();}};CallATBPage(url,productList,true,onSuccess);}else if(options.mode==c_deleteMode){var url=c_deleteQS+lineItemId;if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);return;}
productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;setAddToBasketOmnitureTags(data.OmnitureATBJSON);if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){showModal(defaultContent);}GoToBasket();};CallATBPage(url,productList,true,onSuccess);}};isServicesCall=true;CallATBPage(url,productList,true,onSuccess);}else{services=serviceList;if(options.mode==c_addMode){var showServicesLayer=true;for(product in productList){if(productList[product].ParentLineItemGUID!=null&&productList[product].ParentLineItemGUID!=''){showServicesLayer=false;break;}}
if(showServicesLayer&&!isNullOrUndefined(services)&&(services.length>0)){if(AddToBasketCallingPage==EnumAddToBasketCallingPage.MiniPDP){$j('.miniPdpBox').remove();}
BindServicesLayer(productList,services);ShowServicesLayer();blockATBActions=false;}else{var url=c_atbQS;if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
if(options.callPushProduct==true&&pushProducts==null){url+=c_getPushProductQS;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);blockATBActions=false;return;}
if(options.callPushProduct==true&&pushProducts==null){pushProducts=data.PushProducts;}
services=null;if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){UpdateBasketCount();blockATBActions=false;showModal(defaultContent);GoToBasket();return true;}
else if(AddToBasketCallingPage==EnumAddToBasketCallingPage.BasketProposedService){UpdateBasketCount();blockATBActions=false;if(!isNullOrUndefined(lineItemId)){GoToSpecificBasketItem(lineItemId);}
else{GoToBasket();}
return true;}
if(AddToBasketCallingPage==EnumAddToBasketCallingPage.DirectOrder&&!isNullOrUndefined(isDO)&&isDO){if(pushProducts==null||(pushProducts!=null&&pushProducts.search("associated_products")==-1)){UpdateBasketCount();blockATBActions=false;showModal(defaultContent);GoToBasket();return true;}
else{if(options.callPushProduct==true){availRequestsJson=data.AvailRequestsJson;GetPushProductsFromAvailForATB(availRequestsJson,excludedAvailProducts,data.AvailZone1Template,data.AvailZone2Template,pushProducts);}
BindATBLayer(productsToAdd,isDO);ShowATBLayer();UpdateBasketCount();$j('#ATBLayer .associated_products .quick_view_overlay,#ATBLayer .associated_products .quick_view_overlay_button').remove();$j('#ATBLayer .associated_products .product_picture').addMiniPDPOnPush('Cross sell ATB direct');blockATBActions=false;}}
else if((location.href.indexOf('Basket.aspx')>-1||location.href.indexOf('BasketV2.aspx')>-1)&&!isNullOrUndefined(isDO)&&isDO){UpdateBasketCount();blockATBActions=false;showModal(defaultContent);GoToBasket();return true;}
else{if(options.callPushProduct==true){availRequestsJson=data.AvailRequestsJson;GetPushProductsFromAvailForATB(availRequestsJson,excludedAvailProducts,data.AvailZone1Template,data.AvailZone2Template,pushProducts);}
if(AddToBasketCallingPage==EnumAddToBasketCallingPage.MiniPDP){$j('.miniPdpBox').remove();}
if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Wishlist){showModal(defaultContent);GoToBasket();return true;}
UpdateBasketCount();BindATBLayer(productsToAdd);ShowATBLayer();$j('#ATBLayer .associated_products .quick_view_overlay,#ATBLayer .associated_products .quick_view_overlay_button').remove();$j('#ATBLayer .associated_products .product_picture').addMiniPDPOnPush('Cross sell ATB');productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;}
setAddToBasketOmnitureTags(data.OmnitureATBJSON);};CallATBPage(url,productList,true,onSuccess);}}else if(options.mode==c_updateMode){var url=c_modifyQS+lineItemId;if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);return;}
var tmpInternalReference=productsToAdd[0].InternalReference;productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;setAddToBasketOmnitureTags(data.OmnitureATBJSON);if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){showModal(defaultContent);if(!isNullOrUndefined(lineItemId)){GoToSpecificBasketItem(lineItemId);}
else{GoToBasket();}}else{GoToBasket();}};CallATBPage(url,productList,true,onSuccess);}else if(options.mode==c_deleteMode){var url=c_deleteQS+lineItemId;if(!isNullOrUndefined(excludedAvailProducts)){url+='&availExclude='+excludedAvailProducts;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);return;}
productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;setAddToBasketOmnitureTags(data.OmnitureATBJSON);if(AddToBasketCallingPage==EnumAddToBasketCallingPage.Basket){showModal(defaultContent);}GoToBasket();};CallATBPage(url,productList,true,onSuccess);}}}
var blockATWLActions=false;var isServicesCallWL=false;function AddToWishList(productList,options,serviceList,pushList,miniPdpObject,lineItemId,totalWLItemsCount){if(blockATWLActions==true){return;}
blockATWLActions=true;productsToAdd=productList;currentOptions=options;pushProducts=pushList;TotalWLItemsCount=totalWLItemsCount;if(currentOptions.mode!=c_setlowstockflag){if(isNullOrUndefined(productsToAdd)||(currentOptions.mode!=c_addMode&&currentOptions.mode!=c_updateMode&&currentOptions.mode!=c_deleteMode)){ErrorDisplay("Une erreur est survenue durant l'ajout au vos favoris.");blockATBActions=false;return;}}
services=serviceList;if(options.mode==c_addMode){var url=c_atwlQS;if(options.callPushProduct==true&&pushProducts==null){url+=c_getPushProductQS;}
var onSuccess=function(data){if(data.StatusString=="KO"){ATWL_Error(data.ErrorMessage,data.ErrorUrl);blockATWLActions=false;return;}
if(options.callPushProduct==true&&pushProducts==null){pushProducts=data.PushProducts;}
if(options.callPushProduct==true){availRequestsJSON=data.AvailRequestsJSON;GetPushProductsFromSaasForATW(availRequestsJSON);}
services=null;if(AddToWishListCallingPage==EnumAddToWishListCallingPage.WishList){blockATWLActions=false;showModal(defaultContent);GoToWishList();return true;}
if(AddToWishListCallingPage==EnumAddToWishListCallingPage.MiniPDP){$j('.miniPdpBox').remove();}
var sPath=window.location.pathname;var sPage=sPath.substring(sPath.lastIndexOf('/')+1);var isWLPage=false;if(sPage.toLowerCase()=="wishlist.aspx"){isWLPage=true;}
BindWLLayer(productsToAdd,false);ShowWLLayer(isWLPage);$j('#ATWLayer .associated_products .quick_view_overlay,#ATWLayer .associated_products .quick_view_overlay_button').remove();$j('#ATWLayer .associated_products .product_picture').addMiniPDPOnPush('Wishlist AVAIL');productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATBActions=false;setAddToWishListOmnitureTags(data.OmnitureATWLJSON);};CallATWLPage(url,productList,true,onSuccess);}
else if(options.mode==c_updateMode){var url=c_modifyWLQS+lineItemId;var onSuccess=function(data){if(data.StatusString=="KO"){ATWL_Error(data.ErrorMessage,data.ErrorUrl);return;}
var tmpInternalReference=productsToAdd[0].InternalReference;productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATWLActions=false;setAddToWishListOmnitureTags(data.OmnitureATWLJSON);GoToWishList();};CallATWLPage(url,productList,true,onSuccess);}
else if(options.mode==c_deleteMode){var url=c_deleteWLQS+lineItemId+c_deleteWLCountQA+TotalWLItemsCount;var onSuccess=function(data){if(data.StatusString=="KO"){ATWL_Error(data.ErrorMessage,data.ErrorUrl);return;}
productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATWLActions=false;setAddToWishListOmnitureTags(data.OmnitureATWLJSON);GoToWishList();};CallATWLPage(url,productList,true,onSuccess);}
else if(options.mode==c_setlowstockflag){var url=c_setlowstockflagQS+options.value;var onSuccess=function(data){if(data.StatusString=="KO"){ATWL_Error(data.ErrorMessage,data.ErrorUrl);return;}
productsToAdd=null;services=null;pushProducts=null;currentOptions=null;blockATWLActions=false;};CallATWLPage(url,productList,true,onSuccess);}
blockATWLActions=false;if(preferesTabButton.hasClass('tab_selected')){topSticky.find('.preferes').trigger('click');}}
var blockShowSubActions=false;function ShowSubstitutionLayer(prodid,docid,catid){if(blockShowSubActions==true){return;}
blockShowSubActions=true;if(isNullOrUndefined(prodid)||isNullOrUndefined(docid)){ErrorDisplay("Une erreur est survenue durant l'ajout au vos favoris.");blockShowSubActions=false;return;}
var url=c_sslayerQS+'&productid='+prodid+'&documentid='+docid+'&categoryid='+catid;var onSuccess=function(data){if(data.StatusString=="KO"){ATB_Error(data.ErrorMessage,data.ErrorUrl);blockShowSubActions=false;return;}
if(data!=null&&data.PushProducts!=null){pushProducts=data.PushProducts;}
BindWLLayer(null,true);ShowWLLayer(false);$j('#ATWLayer .associated_products .quick_view_overlay,#ATWLayer .associated_products .quick_view_overlay_button').remove();$j('#ATWLayer .associated_products .product_picture').addMiniPDPOnPush('Wishlist substitution product');blockShowSubActions=false;setAddToWishListOmnitureTags(data.OmnitureATWLJSON);};CallATWLPage(url,null,true,onSuccess);blockShowSubActions=false;}
function GoToSpecificBasket(presCode){if(typeof(IsBasketV2)!='undefined'&&IsBasketV2!=null&&IsBasketV2==true){c_basketURL="/PanierV2/BasketV2.aspx";}
window.location.href=c_basketURL+'?presCodeToGo='+FirstInternalReference;}
function GoToSpecificBasketItem(ItemID){if(typeof(IsBasketV2)!='undefined'&&IsBasketV2!=null&&IsBasketV2==true){c_basketURL="/PanierV2/BasketV2.aspx";}
window.location.href=c_basketURL+'?basketItemIdToGo='+ItemID;}
function GoToBasket(){if(typeof(IsBasketV2)!='undefined'&&IsBasketV2!=null&&IsBasketV2==true){c_basketURL="/PanierV2/BasketV2.aspx";}
var flag=true;flag=CheckCookiesEnabled();if(flag)window.location.href=c_basketURL;}
function GoToWishList(){var flag=true;flag=CheckCookiesEnabled();if(flag)window.location.href=c_wishlistURL;}
function BindMPDPATBLayer(productList,miniPdpObject){var product=productList[0];var productImage=$j(miniPdpObject).find(".atb_content .mini_pdp_product_picture");if($j('#visualstyleBit').val()==8){productImage.hide()}
else{productImage.attr('src',product.Description);}
var productInfo=$j(miniPdpObject).find(".atb_content .product_text");$j(miniPdpObject).find(".atb_content .product_title").html(product.Title);var toAppend='';if(!isNullOrUndefined(product.PresCode)){toAppend='Ref : '+product.PresCode+'<br />';}
if(product.SizeText!=null&&product.SizeText!=''){toAppend+='Taille : '+product.SizeText+'<br/>';}
if(product.ColorText!=null&&product.ColorText!=''){toAppend+='Coloris : '+product.ColorText+'<br/>';}
toAppend+='Quantité : '+product.Quantity;productInfo.empty();productInfo.append(toAppend);var priceZone=$j(miniPdpObject).find(".atb_content .atb_price");if(!isIdentifiedCKG()||product.CkgPrice<=0){toAppend='<div class="normal_price"><div class="price_block">';if(product.StrikePrice>product.Price||product.Discount!=0){toAppend+='<p>';if(product.StrikePrice!=0){toAppend+='<span class="old_price">'+formatPrice(product.StrikePrice*product.Quantity)+' €</span>';}
if(product.Discount!=0){toAppend+='<span class="discount"> -'+product.Discount+'%</span>';}
toAppend+='</p>';}
toAppend+='<p class="product_price">'+formatPrice(product.Price*product.Quantity)+' €</p></div><div class="clear"></div></div>';}else{toAppend='<div class="ckg_price"><div class="price_block"><p>-'+formatPrice((product.Price-product.CkgPrice)*product.Quantity)+'€ avec la <strong>Carte Kangourou</strong></p>';toAppend+='<p class="price_line">soit <span class="product_price">'+formatPrice(product.CkgPrice*product.Quantity)+' €</span></p></div><div class="clear"></div></div>';}
priceZone.empty();priceZone.append(toAppend);$j(miniPdpObject).find(".normal_content").fadeOut('normal',function(){$j(miniPdpObject).find(".product_main_info_block_content").children(".ATB_content").fadeIn('normal',function(){ShowGoToBasket();});});openedMiniPDP=null;}
function BindServicesLayer(products,services){var ServicesBoxDynamicContent=$j('#ServicesLayer .services_list');var contentToAdd='';var productName;var firstServiceForThisProduct;for(var i=0;i<products.length;i++){firstServiceForThisProduct=true
for(var j=0;j<services.length;j++){if(services[j].MainProductGUID==products[i].LineItemGUID){if(firstServiceForThisProduct){productName=products[i].Title;if(contentToAdd!=''){contentToAdd+='<li class="blank_line"></li>';}
firstServiceForThisProduct=false;}else{productName='';}
contentToAdd+='<li class="service_line">';contentToAdd+='<p class="product_name">'+productName;contentToAdd+='</p>';contentToAdd+='<p class="group_name">';if(services.length>1){contentToAdd+='<input type="checkbox" class="'+services[j].OID+' '+services[j].MainProductGUID;contentToAdd+='" id="service_'+services[j].OID+services[j].MainProductGUID+'" />';contentToAdd+='<label for="service_'+services[j].OID+services[j].MainProductGUID+'">';}
else{contentToAdd+='<input type="checkbox" class="'+services[j].OID+' '+services[j].MainProductGUID;contentToAdd+='" id="service_'+services[j].OID+services[j].MainProductGUID+'" style="display:none" checked />';contentToAdd+='<label for="service_'+services[j].OID+services[j].MainProductGUID+'">';}
contentToAdd+=services[j].Desc+'</label></p>';contentToAdd+='<p class="price_line">';contentToAdd+='<span class="price">'+formatPrice(services[j].Price)+'€</span>';contentToAdd+='</p>';contentToAdd+='</li>';}}}
ServicesBoxDynamicContent.empty();ServicesBoxDynamicContent.append(contentToAdd);}
function AddServicesFromLayer(){$j('#ServicesLayer .services_list input[type=checkbox]').each(function(){if($j(this).attr('checked')==true){var tab=$j(this).attr('class').split(' ');ATBService(tab[0],tab[1]);}});var tmpOptions={"mode":c_addMode,"forceCallingServices":false,"callPushProduct":false};if(currentOptions.mode==c_updateMode){tmpOptions.mode=c_updateMode;}
tmpOptions.callPushProduct=currentOptions.callPushProduct;HideNewModalBox();AddToBasket(productsToAdd,tmpOptions,null,pushProducts,null,null,currentIsEcoPart);}
function ATBService(serviceId,prodId){var service=null;for(var i=0;i<services.length;i++){service=services[i];if(service.OID==serviceId&&service.MainProductGUID==prodId){break;}}
var newProductsTab=Array();var j=0;for(var i=0;i<productsToAdd.length;i++){if(productsToAdd[i].LineItemGUID==service.MainProductGUID){newProductsTab[j]=productsToAdd[i];j++;var quant=1;if(!isNullOrUndefined(productsToAdd[i].SoldByMeter)&&(productsToAdd[i].SoldByMeter.toString().toLowerCase()=="true")){quant=1;}
else{quant=productsToAdd[i].Quantity;}
newProductsTab[j]=ServiceToFRProduct(service,quant);}else{newProductsTab[j]=productsToAdd[i];}
j++;}
productsToAdd=newProductsTab;}
function ServiceToFRProduct(service,qty){if(isNullOrUndefined(service)||isNullOrUndefined(qty)){return null;}
var prod=new FRProduct();if(isNullOrUndefined(prod)){return null;}
prod.PresCode=service.PZ;prod.ItemOfferId=service.OID;prod.SizeCode=c_serviceSizeCode;prod.Price=toFloat(service.Price);prod.Title=service.Desc;prod.Description=service.Img;prod.ParentLineItemGUID=service.MainProductGUID;prod.LineItemGUID=generateGuid();prod.Quantity=qty;return prod;}
function ValidateWithoutAddedServices(){var tmpOptions={"mode":c_addMode,"forceCallingServices":false,"callPushProduct":false};if(currentOptions.mode==c_updateMode){tmpOptions.mode=c_updateMode;}
tmpOptions.callPushProduct=currentOptions.callPushProduct;AddToBasket(productsToAdd,tmpOptions,null,pushProducts,null,null,currentIsEcoPart);}
function CallATBPage(urlParameters,postData,asyncValue,onSuccessFunction){for(var pData=0;pData<postData.length;pData++){if(postData[pData].ParentCategories&&postData[pData].ParentCategories.length<=0){postData[pData].ParentCategories=null;}}
urlParameters=urlParameters+"&ATBCallingPage="+AddToBasketCallingPage;if(!isNullOrUndefined(isSearchResultProduct)&&isSearchResultProduct==1){urlParameters=urlParameters+"&source="+isSearchResultProduct;}
if(!isNullOrUndefined(isAvailProdcut)&&isAvailProdcut==true){urlParameters=urlParameters+"&isavail=true";}
$j.ajax({type:'POST',url:c_atbUrl+urlParameters,data:{product:$j.toJSON(postData)},dataType:"json",success:onSuccessFunction,error:AjaxATBError,cache:false,async:asyncValue,timeout:300000});isSearchResultProduct=0;}
function CallATWLPage(urlParameters,postData,asyncValue,onSuccessFunction){urlParameters=urlParameters+"&ATWLCallingPage="+AddToWishListCallingPage;$j.ajax({type:'POST',url:c_atwlUrl+urlParameters,data:{product:$j.toJSON(postData)},dataType:"json",success:onSuccessFunction,error:AjaxATWLError,cache:false,async:asyncValue,timeout:300000});}
function AjaxATBError(XMLHttpRequest,textStatus,errorThrown){try{LogAjaxError("AjaxATB",textStatus+'\n'+errorThrown)}catch(ex){}
blockATBActions=false;if(isServicesCall){isServicesCall=false;if(AddToBasketCallingPage==EnumAddToBasketCallingPage.DirectOrder){ReportTechnicalErrorsToOmniture('AddToBasketClick_AjaxATBError_Services');}
var tmpOptions={"mode":c_addMode,"forceCallingServices":false,"callPushProduct":false};if(currentOptions.mode==c_updateMode){tmpOptions.mode=c_updateMode;}
tmpOptions.callPushProduct=currentOptions.callPushProduct;AddToBasket(productsToAdd,tmpOptions,null,pushProducts,null,null,currentIsEcoPart);}else{isServicesCall=false;if(AddToBasketCallingPage!=EnumAddToBasketCallingPage.DirectOrder){window.location.href=c_techErrorUrl+'?AjaxATBErrorReason='+textStatus;}
else{ShowGenericErrorMessage();ReportTechnicalErrorsToOmniture('AToBClick_'+textStatus+'_'+errorThrown);}}}
function AjaxATWLError(XMLHttpRequest,textStatus,errorThrown){try{LogAjaxError("AjaxATW",textStatus+'\n'+errorThrown)}catch(ex){}
blockATWLActions=false;window.location.href=c_techErrorUrl+'?AjaxATWLErrorReason='+textStatus;}
function ATB_Error(errorMessage,errorUrl){blockATBActions=false;ReportTechnicalErrorsToOmniture('AddToBasketClick_AjaxATBError_KO');if(!isNullOrUndefined(errorUrl)){if(errorUrl.indexOf('~')==0){errorUrl=errorUrl.substring(1);}
window.location.replace(errorUrl);}else{ErrorDisplay(errorMessage);}}
function ATWL_Error(errorMessage,errorUrl){blockATWLActions=false;if(!isNullOrUndefined(errorUrl)){if(errorUrl.indexOf('~')==0){errorUrl=errorUrl.substring(1);}
if(errorUrl.indexOf('IdentifyAcctPopup')<=0){window.location.replace(errorUrl);}
else{OpenCenteredPopUp(errorUrl,1000,600);}}else{ErrorDisplay(errorMessage);}}
function OpenCenteredPopUp(url,width,height){var xPos=(screen.width-width)/2;var yPos=(screen.height-height)/2;window.open(url,'',"menubar=no,status=no,width="+width+",height="+height+",scrollbars=yes,resizable=yes,left="+xPos+",top="+yPos);}
function ErrorDisplay(message){productsToAdd=null;services=null;pushProducts=null;currentOptions=null;alert(message);if(typeof BindLastSeenProducts=='function')
BindLastSeenProducts('error');}
function HideServiceLayer(){HideNewModalBox();$j('#ServicesBoxDynamicContent').empty();}
function HideModalBox(divId){$j("#wrapper").css({position:""});$j('#'+divId).hide();$j("#opacityLayer").hide();}
function ShowModalBox(divId){var divWrapper=document.getElementById('wrapper');if(!document.getElementById('opacityLayer')){var opacityLayer=document.createElement('div');opacityLayer.id="opacityLayer";document.body.appendChild(opacityLayer);var layerHeight=document.body.offsetHeight;$j(opacityLayer).css({left:divWrapper.offsetLeft,top:0,background:"black",height:layerHeight,width:divWrapper.offsetWidth,position:"absolute",zIndex:500,filter:"alpha(opacity=55)",opacity:0.55});$j(opacityLayer).bgiframe();}else{var opacityLayer=document.getElementById('opacityLayer');}
$j("#wrapper").css({position:"relative"});$j(opacityLayer).show();$j('#'+divId).css({zIndex:501});$j('#'+divId).show();}
function ShowATBLayer(){$j('#ATBLayer ul.added_products').attr('style','');try{if(isTouchDevice()){$j('#ATBLayer ul.added_products').css({'max-height':'20000px'});}}catch(ex){}
if(currentModalBoxContent==null){$j('#ATBLayer ul.added_products').attr('style','');try{if(isTouchDevice()){$j('#ATBLayer ul.added_products').css({'max-height':'20000px'});}}catch(ex){}
var scrollTop=$j(window).scrollTop();try{var rightPosition=($j(window).width()-982)/2;}catch(ex){var rightPosition=0;}
var pos={left:null,top:(scrollTop+120),right:(168+rightPosition),bottom:null};ShowNewModalBox('ATBLayer',pos);}}
function ShowServicesLayer(){if(currentModalBoxContent==null){var scrollTop=$j(window).scrollTop();try{var rightPosition=$j("#wrapper").position().left;}catch(ex){var rightPosition=0;}
var pos={left:null,top:(scrollTop+120),right:(168+rightPosition),bottom:null};ShowNewBlockingModalBox('ServicesLayer',pos,function(){HideServiceLayer();ValidateWithoutAddedServices();});}}
function ShowWLLayer(isWLPage){$j('#ATWLayer ul.added_products').attr('style','');try{if(isTouchDevice()){$j('#ATWLayer ul.added_products').css({'max-height':'auto'});}}catch(ex){}
if(currentModalBoxContent==null){$j('#ATWLayer ul.added_products').attr('style','');try{if(isTouchDevice()){$j('#ATWLayer ul.added_products').css({'max-height':'auto'});}}catch(ex){}
var scrollTop=$j(window).scrollTop();var rightPosition=($j(window).width()-982)/2;var pos={left:null,top:(scrollTop+120),right:(168+rightPosition),bottom:null};ShowNewModalBox('ATWLayer',pos,null,null,isWLPage);}}
function BindWLLayer(products,isSubstitutionLayer){var assoc_bloc;var totalPrice=0;var totalDiscount=0;if(!isSubstitutionLayer){var baseUl=$j('#ATWLayer .added_products');var toAppend;var isEcoPart=false;baseUl.empty();var product=null;for(var i=0;i<products.length;i++){product=products[i];if(product!=null){if(!isNullOrUndefined(product.StrikePrice))
{totalDiscount+=(product.StrikePrice*product.Quantity);}
totalPrice+=(product.Price*product.Quantity);}
if(product.ParentLineItemGUID!=null&&product.ParentLineItemGUID!=''){toAppend='<li class="service">';if(product.Description!=null&&product.Description!=''){toAppend+='<img width="40" height="40" src="'+product.Description+'" alt="Service '+product.Title+'" />';}
toAppend+='<div class="infos"><strong>'+product.Title+'</strong><br />';if(!isNullOrUndefined(product.PresCode)&&product.PresCode!=0&&(!product.IsMarketPlaceProduct)){toAppend+='Ref : '+product.PresCode;}
toAppend+=+'</div>';toAppend+='<div class="price"><p class="current_price">'+formatPrice(product.Price)+' €</p></div>';toAppend+='<div class="clear"></div></li>';}else{toAppend='<li class="product">';if(product.Description!=null&&product.Description!=''){toAppend+='<img width="72" height="72" src="'+product.Description+'" alt="Visuel du produit '+product.Title+'" />';}
toAppend+='<div class="infos"><strong>'+product.Title+'</strong><br />';if(!isNullOrUndefined(product.PresCode)&&product.PresCode!=0&&(!product.IsMarketPlaceProduct)){toAppend+='Ref : '+product.PresCode+'<br />';}
if(product.SizeText!=null&&product.SizeText!=''){toAppend+='Taille : '+product.SizeText+'<br/>';}
if(product.ColorText!=null&&product.ColorText!=''){toAppend+='Coloris : '+product.ColorText+'<br/>';}
toAppend+='Quantité : '+product.Quantity;toAppend+='</div>';if(product.IsEcoPart=="true"||product.IsEcoPart==true){isEcoPart=true;}
toAppend+='<div class="price">';if(product.StrikePrice>product.Price||product.Discount!=0){toAppend+='<p>';if(product.StrikePrice!=0){toAppend+='<span class="old_price">'+formatPrice(product.StrikePrice*product.Quantity)+' €</span>';}
if(product.Discount!=0){toAppend+='<span class="discount"> -'+formatDiscount(product.Discount)+'%</span>';}
toAppend+='</p>';}
toAppend+='<p class="current_price">'+formatPrice(product.Price*product.Quantity)+' €';if(product.IsEcoPart=="true"||product.IsEcoPart==true){toAppend+='*';}
toAppend+='</p></div>';toAppend+='<div class="clear"></div></li>';}
if(i!=products.length-1){toAppend+='<li class="separator"><span class="first"></span><span class="second"></span>';toAppend+='<div class="clear"></div></li>';}
baseUl.append(toAppend);}
if(products.length>1){if(totalDiscount!=0&&totalDiscount!=totalPrice){totalDiscount=Math.round(totalDiscount*100)/100;$j('#ATWLayer .atb_total_line p.strike_price').html(formatPrice(totalDiscount)+' €').show();}else{$j('#ATWLayer .atb_total_line p.strike_price').hide();}
totalPrice=Math.round(totalPrice*100)/100;$j('#ATWLayer .atb_total_line p.price').html(formatPrice(totalPrice)+' €');$j('#ATWLayer .atb_total_line').show();$j("#ATWLayer .atw_content .added_products .price, #ATWLayer .atw_content .added_products .ckg_price").css("float","left");$j('#ATWLayer .add_to_basket_block:eq(1)').hide();}else{$j('#ATWLayer .atb_total_line').hide();$j('#ATWLayer .add_to_basket_block:eq(1)').show();}
if(!isEcoPart){$j('#ATWLayer .atw_content .eco').hide();}else{$j('#ATWLayer .atw_content .eco').show();}
var sPath=window.location.pathname;var sPage=sPath.substring(sPath.lastIndexOf('/')+1);if(sPage.toLowerCase()=="wishlist.aspx"){$j('#ATWLayer .add_to_basket_block .continue').attr({'href':"javascript:GoToWishList();"});}
assoc_bloc=$j("#ATWLayer .associated_products_block");showPushProductsWL(assoc_bloc);}
else{$j('#ATWLayer .atw_title, #ATWLayer ul, #ATWLayer .eco, #ATWLayer .add_to_basket_block').hide();assoc_bloc=$j("#ATWLayer .associated_products_block");assoc_bloc.empty();showPushProductsWL(assoc_bloc);}}
function showPushProductsWL(assoc_bloc){if(!isNullOrUndefined(assoc_bloc)){if(pushProducts!=null&&trim(pushProducts)!=''){assoc_bloc.show();assoc_bloc.empty();assoc_bloc.append(pushProducts);assoc_bloc.find('.set').empty();assoc_bloc.find('li:gt(2)').empty().hide();if($j(assoc_bloc).find('ul.products li').length==0)
$j(assoc_bloc).hide();}
else{assoc_bloc.hide();}}}
$j(document).ready(function(){$j('div.add-basket-img .fixpng').show();});function isIdentifiedCKG(){var CKGUserCookieValue=GetSubCookieValue("M.R.User","CKGUser");if(CKGUserCookieValue!=null){if(CKGUserCookieValue!="NotCKG")return true;}
return false;}
function formatPrice(originalPrice){if(null==originalPrice&&'undefined'==typeof originalPrice)return 0;var newPrice=(originalPrice+"").split('.').join(',');if(newPrice.indexOf(',')==-1){newPrice+=",00";}else{if(newPrice.split(',')[1].length==1){newPrice+="0";}}
var cutPrice=newPrice.split(',');if(cutPrice[1].length>2){newPrice=cutPrice[0]+","+cutPrice[1].substring(0,2);}
return newPrice;}
function formatDiscount(originalDiscount){var newDiscount=(originalDiscount+"").split('.')[0];return newDiscount;}
function BindATBLayer(products,isDO){var baseUl=$j('#ATBLayer .added_products');var toAppend;var isEcoPart=false;baseUl.empty();if(isNullOrUndefined(isDO)||!isDO){var product=null;var totalPrice=0;var totalDiscount=0;for(var i=0;i<products.length;i++){product=products[i];if(product!=null){if(!isNullOrUndefined(product.GDPrice)){totalPrice+=(product.GDPrice*product.Quantity);if(!isNullOrUndefined(product.StrikePrice))
{totalDiscount+=(product.Price*product.Quantity);}}else{totalPrice+=(product.Price*product.Quantity);if(!isNullOrUndefined(product.StrikePrice))
{totalDiscount+=(product.StrikePrice*product.Quantity);}else{totalDiscount+=(product.Price*product.Quantity);}}}
if(product.ParentLineItemGUID!=null&&product.ParentLineItemGUID!=''){toAppend='<li class="service">';if(product.Description!=null&&product.Description!=''){toAppend+='<img width="40" height="40" src="'+product.Description+'" alt="Service '+product.Title+'" />';}
toAppend+='<div class="infos"><strong>'+product.Title+'</strong><br />';if(!isNullOrUndefined(product.PresCode)&&product.PresCode!=0&&(!product.IsMarketPlaceProduct)){toAppend+='Ref : '+product.PresCode;}
toAppend+='</div>';toAppend+='<div class="price"><p class="current_price">'+formatPrice(product.Price)+' €</p></div>';toAppend+='<div class="clear"></div></li>';}else{toAppend='<li class="product">';if(product.Description!=null&&product.Description!=''){toAppend+='<img width="72" height="72" src="'+product.Description+'" alt="Visuel du produit '+product.Title+'" />';}
toAppend+='<div class="infos"><strong>'+product.Title+'</strong><br />';if(!isNullOrUndefined(product.PresCode)&&product.PresCode!=0&&(!product.IsMarketPlaceProduct)){toAppend+='Ref : '+product.PresCode+'<br />';}
if(product.SizeText!=null&&product.SizeText!=''){toAppend+='Taille : '+product.SizeText+'<br/>';}
if(product.ColorText!=null&&product.ColorText!=''){toAppend+='Coloris : '+product.ColorText+'<br/>';}
toAppend+='Quantité : '+product.Quantity;toAppend+='</div>';if(product.IsEcoPart=="true"||product.IsEcoPart==true){isEcoPart=true;}
toAppend+='<div class="price">';if(product.StrikePrice>product.Price||product.Discount!=0){toAppend+='<p>';if(product.StrikePrice!=0&&product.StrikePrice!=product.Price){toAppend+='<span class="old_price">'+formatPrice(product.StrikePrice*product.Quantity)+' €</span>';}
if(product.Discount!=0){toAppend+='<span class="discount"> -'+formatDiscount(product.Discount)+'%</span>';}
toAppend+='</p>';}
toAppend+='<p class="current_price">'+formatPrice(product.Price*product.Quantity)+' €';if(product.IsEcoPart=="true"||product.IsEcoPart==true){toAppend+='*';}
toAppend+='</p></div>';toAppend+='<div class="clear"></div></li>';}
if(i!=products.length-1){toAppend+='<li class="separator"><span class="first"></span><span class="second"></span>';toAppend+='<div class="clear"></div></li>';}
baseUl.append(toAppend);}
if(products.length>1){if(totalDiscount!=0&&totalDiscount!=totalPrice){totalDiscount=Math.round(totalDiscount*100)/100;$j('#ATBLayer .atb_total_line p.strike_price').html(formatPrice(totalDiscount)+' €').show();}else{$j('#ATBLayer .atb_total_line p.strike_price').hide();}
totalPrice=Math.round(totalPrice*100)/100;$j('#ATBLayer .atb_total_line p.price').html(formatPrice(totalPrice)+' €');$j('#ATBLayer .atb_total_line').show();$j("#ATBLayer .atb_content .added_products .price, #ATBLayer .atb_content .added_products .ckg_price").css("float","left");$j('#ATBLayer .add_to_basket_block:eq(1)').hide();}else{$j('#ATBLayer .atb_total_line').hide();$j('#ATBLayer .add_to_basket_block:eq(1)').show();}}
if(!isEcoPart){$j('#ATBLayer .add_to_basket_block span').hide();}else{$j('#ATBLayer .add_to_basket_block span').show();}
if(!isNullOrUndefined(isDO)&&isDO){$j('#ATBLayer .atb_total_line').hide();$j('.atb_title').text('Vous venez d’ajouter votre sélection au panier');$j('#ATBLayer .continue').addClass('continue_DO');$j('#ATBLayer .continue_DO').removeClass('continue');}else{$j('.atb_title').text('Vous venez d\'ajouter au panier le(s) produit(s) suivant(s) : ');$j('#ATBLayer .continue').removeClass('continue_DO');}
var assoc_bloc=$j("#ATBLayer .associated_products_block");if(!isNullOrUndefined(assoc_bloc)){if(pushProducts!=null&&trim(pushProducts)!=''){assoc_bloc.show();assoc_bloc.empty();assoc_bloc.append(pushProducts);assoc_bloc.find('.set').empty();}
else{assoc_bloc.hide();}}}
function trim(myString){return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')}
(function($){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={'array':function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a[a.length]=v;b=true;}}}
a[a.length]=']';return a.join('');},'boolean':function(x){return String(x);},'null':function(x){return"null";},'number':function(x){return isFinite(x)?String(x):'null';},'object':function(x){if(x){if(x instanceof Array){return s.array(x);}
var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a.push(s.string(i),':',v);b=true;}}}
a[a.length]='}';return a.join('');}
return'null';},'string':function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);});}
return'"'+x+'"';}};$j.toJSON=function(v){var f=isNaN(v)?s[typeof v]:s['number'];if(f)return f(v);};$j.parseJSON=function(v,safe){if(safe===undefined)safe=$j.parseJSON.safe;if(safe&&!/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v))
return undefined;return eval('('+v+')');};$j.parseJSON.safe=false;})(jQuery);function generateGuid(){var result,i,j;result='';for(j=0;j<32;j++){if(j==8||j==12||j==16||j==20)
result=result+'-';i=Math.floor(Math.random()*16).toString(16).toUpperCase();result=result+i;}
return result}
function setAddToWishListOmnitureTags(ObjOmnitureATWLJSON){if(isNullOrUndefined(s))return;if(s.eVar30!=null){s.eVar30="";}
if(s.eVar12!=null){s.eVar12="";}
if(s.eVar41!=null){s.eVar41="";}
SetATBExternalCampaignTags();if(s.prop12!=null){s.prop12="";}
if(s.events!=null){s.events="";}
if(s.prop55!=null){s.prop55="0";}
s.products='';s.events=(ObjOmnitureATWLJSON!=null)?ObjOmnitureATWLJSON.ATWLEvents:'';s.eVar30=(ObjOmnitureATWLJSON!=null)?ObjOmnitureATWLJSON.EVar30:'';s.eVar12='';s.prop12='';if(ObjOmnitureATWLJSON!=null&&ObjOmnitureATWLJSON.PageName!=''){s.pageName=ObjOmnitureATWLJSON.PageName;}
if(ObjOmnitureATWLJSON!=null&&ObjOmnitureATWLJSON.Channel!=''){s.channel=ObjOmnitureATWLJSON.Channel;}
s.tl(false,'o',"FRAddToWishListFromPDP");}
function setAddToBasketOmnitureTags(ObjOmnitureATBJSON){if(isNullOrUndefined(s))return;}
function setAddToBasketOmnitureTags(ObjOmnitureATBJSON){if(isNullOrUndefined(s))return;if(s.eVar29!=null)
{s.eVar29="";}
if(s.eVar10!=null){s.eVar10="";}
if(s.eVar12!=null){s.eVar12="";}
if(s.products!=null){s.products="";}
if(s.prop23!=null){s.prop23="";}
if(s.prop12!=null){s.prop12="";}
if(s.events!=null){s.events="";}
if(s.eVar46!=null){s.eVar46="";}
if(s.prop55!=null){s.prop55="0";}
s.linkTrackVars="eVar10,eVar12,products,events";s.products=(ObjOmnitureATBJSON!=null)?ObjOmnitureATBJSON.ProductString:'';s.events=(ObjOmnitureATBJSON!=null)?ObjOmnitureATBJSON.ATBEvents:'';var bshpclick=getUrlVars()['bshpclick'];if(bshpclick!=null&&bshpclick=='true')
s.eVar10='shpmarques';else
s.eVar10=(ObjOmnitureATBJSON!=null)?ObjOmnitureATBJSON.SalesArea:'';s.eVar12=(ObjOmnitureATBJSON!=null)?ObjOmnitureATBJSON.ShoppingTool:'';s.prop12=(ObjOmnitureATBJSON!=null)?ObjOmnitureATBJSON.ShoppingTool:'';if(ObjOmnitureATBJSON!=null&&ObjOmnitureATBJSON.Evar46String!=null&&ObjOmnitureATBJSON.Evar46String!=''){s.eVar46=ObjOmnitureATBJSON.Evar46String;}
SetATBExternalCampaignTags();if(ObjOmnitureATBJSON!=null&&ObjOmnitureATBJSON.PageName!=''){s.pageName=ObjOmnitureATBJSON.PageName;}
if(ObjOmnitureATBJSON!=null&&ObjOmnitureATBJSON.Channel!=''){s.channel=ObjOmnitureATBJSON.Channel;}
s.tl(false,'o',"FRAddToBasketFromPDP");}
function getUrlVars(){var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
return vars;}
function ReportTechnicalErrorsToOmniture(linkName){try{if(AddToBasketCallingPage!=EnumAddToBasketCallingPage.DirectOrder)return;if(typeof(s)=="undefined")return;var callingPage;var callFrom;if(s.prop48!=null){s.prop48="";}
if(s.prop49!=null){s.prop49="";}
s.linkTrackVars="prop47,prop48,prop49";s.prop1="FR";s.prop2="Redcats FR";s.prop3="LaRedoute";s.prop4="";s.prop5="LaRedoute FR";s.eVar1="FR";s.eVar2="Redcats FR";s.eVar3="LaRedoute";s.eVar4="";s.eVar5="LaRedoute FR";s.channel="ERREUR";s.pageName="FR:RE:ERREUR:Page inaccessible";s.pageType="TechnicalError";var currentURL=window.location.protocol+"//"+window.location.host+'/order_from_catalog/DirectOrder09.aspx?'+linkName;s.prop47=window.location.href;s.prop48=currentURL;s.prop49='TechnicalError';SetATBExternalCampaignTags();hpeventscookieval=GetCookie("OEvent1");if(hpeventscookieval!=null&&hpeventscookieval!=""){s.events=hpeventscookieval;}
DeleteCookie("OEvent1");custNmbrCookieVal=GetSubCookieValue('M.R.User','CustNmbr');if(custNmbrCookieVal!=null&&custNmbrCookieVal!=""){s.prop10=custNmbrCookieVal;}
s.tl(false,'o',linkName);}
catch(e){}}
function ATBAjaxContentLoadEvet(){var scrollLeftFlag=false;var scrollRightFlag=true;var moverScale=(availItemsCount-3)*186;if(availItemsCount>3){$j(".bottomScroller").children(".scrollRight").css({"visibility":"visible"});}
$j(".scrollRight").unbind('click');$j(".scrollLeft").unbind('click');$j(".scrollLeft").click(function(){if(scrollLeftFlag){$j(this).parent().children(".productScroller").children(".products").animate({"left":"+="+moverScale+"px"},"slow");scrollLeftFlag=false;scrollRightFlag=true;$j(".bottomScroller").children(".scrollLeft").css({"visibility":"hidden"});$j(".bottomScroller").children(".scrollRight").css({"visibility":"visible"});}});$j(".scrollRight").click(function(){if(scrollRightFlag){$j(this).parent().children(".productScroller").children(".products").animate({"left":"-="+moverScale+"px"},"slow");scrollLeftFlag=true;scrollRightFlag=false;$j(".bottomScroller").children(".scrollLeft").css({"visibility":"visible"});$j(".bottomScroller").children(".scrollRight").css({"visibility":"hidden"});}});}
function SetATBExternalCampaignTags(){if(s.eVar35!=null){s.eVar35="";}
if(s.eVar36!=null){s.eVar36="";}
if(s.eVar37!=null){s.eVar37="";}
if(s.eVar38!=null){s.eVar38="";}
if(s.eVar39!=null){s.eVar39="";}
if(s.eVar24!=null){s.eVar24="";}
s.campaign='';}
function ATBGetServicesFromM2Services(M2AncSvcs,frProd){if(isNullOrUndefined(frProd)||isNullOrUndefined(M2AncSvcs)||(M2AncSvcs.length<=0)){return null;}
var ATBServices=null;for(var svcIndex=0;svcIndex<M2AncSvcs.length;svcIndex++)
{if(isNullOrUndefined(M2AncSvcs[svcIndex].BTy)){continue;}
if(M2AncSvcs[svcIndex].BTy.Id!=3){continue;}
var svc=new Services(M2AncSvcs[svcIndex]);if(isNullOrUndefined(svc)){continue;}
if(isNullOrUndefined(ATBServices))
{ATBServices=new Array();}
ATBServices.push(svc);}
if(isNullOrUndefined(ATBServices)||(ATBServices.length<=0)){return null;}
for(var j=0;j<ATBServices.length;j++){ATBServices[j].MainProductGUID=frProd.LineItemGUID;}
return ATBServices;}
function Services(AncSvc){if(isNullOrUndefined(AncSvc)){return null;}
if(isNullOrUndefined(AncSvc.ItemOfferId)){return null;}
this.ID=AncSvc.Id;this.Rank=AncSvc.Rnk;this.Price=AncSvc.LiPr;this.PZ=AncSvc.AltId;this.OID=AncSvc.ItemOfferId;this.Desc=AncSvc.DN;if(!isNullOrUndefined(AncSvc.Imgs)&&(AncSvc.Imgs.length>0)&&!isNullOrUndefined(AncSvc.Imgs[0].FlNm)){this.Img="http://media.laredoute.fr/images/Pdp09/"+AncSvc.Imgs[0].FlNm;}
this.Url=AncSvc.ExpURL;if(!isNullOrUndefined(AncSvc.BTy)){this.SType=AncSvc.BTy.Id;}
this.InBKT="";this.MainProductGUID="";this.TType=AncSvc.DisTmTy;}

var origin='DirectOrder';var intermPageUrl='/Order_from_catalog/DOM2ServicesCallPage.aspx?';var directOrderURL='';var ISM2AjaxFailed=false;var blockingM2Call=false;var userPresCode='';function GetM2ProductAsJSON(SKUParam,usePresCode,callback,origin,vendorid,pId,dId){if(blockingM2Call==true){return;}
blockingM2Call=true;var callBackParam="";if(usePresCode){directOrderURL=intermPageUrl+'prescode='+SKUParam;callBackParam=SKUParam;}else{directOrderURL=intermPageUrl+'itemofferid='+SKUParam;callBackParam=lineItemInfo.internalreference;}
userPresCode=SKUParam;if(!JSONisNullOrUndefinedOrEmpty(origin)){if(origin==2||origin==4){directOrderURL+='&ro=do';}else{directOrderURL+='&ro=web';}}
if(!JSONisNullOrUndefinedOrEmpty(vendorid)){directOrderURL+='&vid='+vendorid;}
if(!JSONisNullOrUndefinedOrEmpty(pId)){directOrderURL+='&pid='+pId;}
if(!JSONisNullOrUndefinedOrEmpty(dId)){directOrderURL+='&did='+dId;}
var onSuccessFunction=function(data){callback(data,callBackParam);blockingM2Call=false;}
$j.ajax({type:'POST',url:directOrderURL,dataType:"json",data:{},success:onSuccessFunction,error:onM2Error,cache:false,async:true,timeout:300000});}
function onM2Error(XMLHttpRequest,textStatus,errorThrown){try{LogAjaxError("DirectOrderM2Call",textStatus+'\n'+errorThrown)}catch(ex){}
ISM2AjaxFailed=true;ShowGenericErrorMessage();ReportTechnicalErrorsToOmniture('OkClick_'+textStatus+'_'+userPresCode);blockingM2Call=false;}
function IsValidM2Product(M2DOProductJson){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return false;}
var Product=M2DOProductJson.Products[0];if(JSONisNullOrUndefinedOrEmpty(Product)){return false;}
else{return true;}}
function GetM2ProductTitle(M2DOProductJson){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ProductTitle=M2DOProductJson.Products[0].DN;if(JSONisNullOrUndefinedOrEmpty(M2ProductTitle)){return null;}
return M2ProductTitle;}
function GetM2ProductDescription(M2DOProductJson){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ProductDescription=M2DOProductJson.Products[0].Des;if(JSONisNullOrUndefinedOrEmpty(M2ProductDescription)){return null;}
return M2ProductDescription;}
function GetM2ProductBrand(M2DOProductJson){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].Br)){return null;}
var M2ProductBrand=M2DOProductJson.Products[0].Br.DN;if(JSONisNullOrUndefinedOrEmpty(M2ProductBrand)){return null;}
return M2ProductBrand;}
function GetM2ProductUnitLabel(M2DOProductJson){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ProductUnitLabel=M2DOProductJson.Products[0].MsrmtTyp.DN;if(JSONisNullOrUndefinedOrEmpty(M2ProductUnitLabel)){return null;}
return M2ProductUnitLabel;}
function IsM2PersonalizationExist(M2DOProductJson,FirstLevelSku,SecondInternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var FirstLevelSkuBlock=JSONQuery(".[?AltId='"+FirstLevelSku+"']",M2DOProductJson.Products[0].Vrnts);var AllowPersonalization=JSONQuery(".[?Id='"+SecondInternalReference+"'][0].AlwPrsz",FirstLevelSkuBlock[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(AllowPersonalization)){return null;}
return AllowPersonalization;}
function IsM2PersonalizationExistByInternalReference(M2DOProductJson,InternalReference,SecondInternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var AllowPersonalization=JSONQuery(".[?Id='"+InternalReference+"']..[?Id='"+SecondInternalReference+"'][0].AlwPrsz",M2DOProductJson.Products[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(AllowPersonalization)){return null;}
return AllowPersonalization;}
function GetM2ColorJsonByPresscode(M2DOProductJson,FirstLevelSku){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
if(JSONisNullOrUndefinedOrEmpty(FirstLevelSku)){var M2ColorJson=JSONQuery("[?AltId!='']",M2DOProductJson.Products[0].Vrnts);}
else{var M2ColorJson=JSONQuery("[?AltId='"+FirstLevelSku+"']",M2DOProductJson.Products[0].Vrnts);}
if(JSONisNullOrUndefinedOrEmpty(M2ColorJson)){return null;}
return M2ColorJson;}
function GetM2SizeJsonByPresscode(M2DOProductJson,FirstLevelSku){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
if(JSONisNullOrUndefinedOrEmpty(FirstLevelSku)){return null;}
else{var M2SizeJson=JSONQuery("[?AltId='"+FirstLevelSku+"']",M2DOProductJson.Products[0].Vrnts)[0].Vrnts;}
if(JSONisNullOrUndefinedOrEmpty(M2SizeJson)){return null;}
return M2SizeJson;}
function GetM2ColorJsonByInternalRefernce(M2DOProductJson,FirstLevelSku){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
if(JSONisNullOrUndefinedOrEmpty(FirstLevelSku)){var M2ColorJson=JSONQuery("[?Id!='']",M2DOProductJson.Products[0].Vrnts);}
else{var M2ColorJson=JSONQuery("[?Id='"+FirstLevelSku+"']",M2DOProductJson.Products[0].Vrnts);}
if(JSONisNullOrUndefinedOrEmpty(M2ColorJson)){return null;}
return M2ColorJson;}
function GetM2SizeJsonByInternalRefernce(M2DOProductJson,InternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
if(JSONisNullOrUndefinedOrEmpty(InternalReference)){return null;}
else{var M2SizeJson=JSONQuery("[?Id='"+InternalReference+"']",M2DOProductJson.Products[0].Vrnts)[0].Vrnts;}
if(JSONisNullOrUndefinedOrEmpty(M2SizeJson)){return null;}
return M2SizeJson;}
function GetM2SizeObjectFromM2Color(M2Color,Id){if(JSONisNullOrUndefinedOrEmpty(M2Color)||JSONisNullOrUndefinedOrEmpty(Id)){return null;}
var M2SizeObject=JSONQuery("[?Id='"+Id+"']",M2Color[0].Vrnts)[0];if(JSONisNullOrUndefinedOrEmpty(M2SizeObject)){return null;}
return M2SizeObject;}
function GetM2ProductQuantity(M2DOProductJson,FirstLevelSku,SecondInternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ProductQuantity=JSONQuery(".[?AltId='"+FirstLevelSku+"']..[?Id='"+SecondInternalReference+"'][0].QtyInf",M2DOProductJson.Products[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(M2ProductQuantity)){return null;}
return M2ProductQuantity;}
function GetM2ProductQuantityByInternalReference(M2DOProductJson,InternalReference,SecondInternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ProductQuantity=JSONQuery(".[?Id='"+InternalReference+"']..[?Id='"+SecondInternalReference+"'][0].QtyInf",M2DOProductJson.Products[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(M2ProductQuantity)){return null;}
return M2ProductQuantity;}
function FRProductObjectFromM2BasketObject(m2basketObject){this.Title=m2basketObject.DisplayName;this.ItemOfferId=m2basketObject.ItemOfferId;this.InternalReference=m2basketObject.InternalReference;this.SecInternalReference=m2basketObject.SecInternalReference;this.ProductId=m2basketObject.ProductId;this.DocumentId=m2basketObject.CatalogVersionId;this.CategoryId=m2basketObject.CategoryId;this.PresCode=m2basketObject.FirstLevelSku;this.SizeCode=m2basketObject.SizeCode;this.Origin="1";this.AssociatedItemId="0";this.CategoryName=m2basketObject.CategoryName;this.Price=m2basketObject.Price;this.UnitPrice=m2basketObject.UnitPrice;this.Personalization=m2basketObject.Personalization;this.ColorText=m2basketObject.ColorText;this.SizeText=m2basketObject.SizeText;this.HasAssociatedService=m2basketObject.HasAncillaryService;this.CkgCode="0";this.CkgPrice="0";this.IsEcoPart=m2basketObject.IsEcoComplaint;this.Quantity=toFloat(m2basketObject.Quantity);this.Discount=m2basketObject.Discount;this.NoReductBrand=false;this.StrikePrice=m2basketObject.StrikePrice;this.ParentLineItemGUID="";this.LineItemGUID=generateGuid();this.Description=m2basketObject.MediaImageUrl;this.BrandLabel=m2basketObject.BrandLabel;this.VendorId=m2basketObject.VendorId;this.IsMarketPlaceProduct=m2basketObject.IsMarketPlaceProduct;if(!isNullOrUndefined(m2basketObject.VendorName)){this.VendorName=m2basketObject.VendorName;}
else{this.VendorName="";}
this.AvailablePaidServices=m2basketObject.AvailablePaidServices;this.AvailableDeals=m2basketObject.AvailableDeals;}
function FRProductObjectFromM2Service(service,relatedProduct){var prod=new FRProduct();prod.PresCode=service.AltId;prod.SizeCode='99999';prod.Price=toFloat(service.LiPr);prod.ItemOfferId=service.ItemOfferId;prod.Title=service.DN;if(!isNullOrUndefined(service.Imgs)){prod.Description=service.Imgs[0].URL;}
prod.ParentLineItemGUID=relatedProduct.LineItemGUID;prod.LineItemGUID=generateGuid();if(!isNullOrUndefined(relatedProduct.SoldByMeter)&&(relatedProduct.SoldByMeter.toString().toLowerCase()=="true")){prod.Quantity=1;}
else{prod.Quantity=relatedProduct.Quantity;}
return prod;}
function GetM2BasketJSONFromOffer(M2DOProductJson,offerid,quantity,personalization){for(var i=0;i<M2DOProductJson.Products[0].Vrnts.length;i++){for(var j=0;j<M2DOProductJson.Products[0].Vrnts[i].Vrnts.length;j++){for(var k=0;k<M2DOProductJson.Products[0].Vrnts[i].Vrnts[j].Ofrs.length;k++){if(M2DOProductJson.Products[0].Vrnts[i].Vrnts[j].Ofrs[k].ItemOfferId==offerid){var product=M2DOProductJson.Products[0];var color=M2DOProductJson.Products[0].Vrnts[i];var size=M2DOProductJson.Products[0].Vrnts[i].Vrnts[j];var sizeArray=Array();sizeArray.push(size);var offer=M2DOProductJson.Products[0].Vrnts[i].Vrnts[j].Ofrs[k];var availablePaidServices=JSONQuery("[?BTy.Id=3]",offer.AncSvcs);var availableDeals=(M2DOProductJson.Products[0].Dl!=null&&M2DOProductJson.Products[0].Dl.Cmbs!=null&&M2DOProductJson.Products[0].Dl.Cmbs.length>0)?M2DOProductJson.Products[0].Dl.Cmbs:null;basketJson={"DisplayName":product.DN,"ItemOfferId":offerid,"InternalReference":color.Id,"SecInternalReference":size.Id,"ProductId":product.Id,"CatalogVersionId":product.CatVerId,"CategoryId":product.PCId,"FirstLevelSku":color.AltId,"SizeCode":GetSizeCodeFromM2Size(sizeArray),"Price":offer.LiPr,"UnitPrice":offer.LtUntPr,"Personalization":personalization,"ColorText":color.DN,"SizeText":size.DN,"HasAncillaryService":!JSONisNullOrUndefinedOrEmpty(offer.AncSvcs)?offer.AncSvcs[0].FAv:false,"IsEcoComplaint":offer.EnvCmpl.FCpl,"Quantity":quantity,"Discount":offer.Dis,"StrikePrice":offer.PrLiPr,"MediaImageUrl":(!JSONisNullOrUndefinedOrEmpty(color.Imgs))?GetMediumPict(color.Imgs):'',"BrandLabel":!JSONisNullOrUndefinedOrEmpty(product.Br)?product.Br.DN:'',"VendorId":!JSONisNullOrUndefinedOrEmpty(offer.VdrInfo)?offer.VdrInfo.Id:0,"IsMarketPlaceProduct":!JSONisNullOrUndefinedOrEmpty(offer.VdrInfo)?offer.VdrInfo.IsMktPr:false,"VendorName":!JSONisNullOrUndefinedOrEmpty(offer.VdrInfo)?offer.VdrInfo.DN:'',"CategoryName":GetCategoryName(M2DOProductJson),"AvailablePaidServices":(availablePaidServices.length==0?null:availablePaidServices),"AvailableDeals":availableDeals}
return basketJson;}}}}
return null;}
function GetMediumPict(imgs){for(var i=0;i<imgs.length;i++){if(imgs[i].Id=="mediumPict"){return imgs[i].URL;}}
return'';}
function GetM2BasketJSON(M2DOProductJson,PressCode,SecInternalReference,quantity,personalization){try{if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ColorJson=JSONQuery("[?AltId='"+PressCode+"']",M2DOProductJson.Products[0].Vrnts);var M2SizeJson=JSONQuery("[?Id='"+SecInternalReference+"']",M2ColorJson[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(M2ColorJson)||JSONisNullOrUndefinedOrEmpty(M2SizeJson)){return null;}
basketJson={"DisplayName":M2DOProductJson.Products[0].DN,"ItemOfferId":M2SizeJson[0].ItemOfferId,"InternalReference":M2ColorJson[0].Id,"SecInternalReference":M2SizeJson[0].Id,"ProductId":M2DOProductJson.Products[0].Id,"CatalogVersionId":M2DOProductJson.Products[0].CatVerId,"CategoryId":M2DOProductJson.Products[0].PCId,"FirstLevelSku":M2ColorJson[0].AltId,"SizeCode":GetSizeCodeFromM2Size(M2SizeJson),"CancelledFlag":"false","IsMeasurable":"false","Origin":origin,"Price":M2SizeJson[0].LiPr,"UnitPrice":M2SizeJson[0].LtUntPr,"Personalization":personalization,"ColorText":M2ColorJson[0].DN,"SizeText":M2SizeJson[0].DN,"HasAncillaryService":!JSONisNullOrUndefinedOrEmpty(M2SizeJson[0].AncSvcs)?M2SizeJson[0].AncSvcs[0].FAv:false,"IsEcoComplaint":M2SizeJson[0].EnvCmpl.FCpl,"Quantity":quantity,"Discount":M2SizeJson[0].Dis,"StrikePrice":M2SizeJson[0].PrLiPr,"MediaImageUrl":(!JSONisNullOrUndefinedOrEmpty(M2ColorJson[0].Imgs))?M2ColorJson[0].Imgs[0].FlNm:'',"BrandLabel":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].Br)?M2DOProductJson.Products[0].Br.DN:'',"VendorId":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].VdrInfo)?M2DOProductJson.Products[0].VdrInfo.Id:0,"IsMarketPlaceProduct":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].VdrInfo)?M2DOProductJson.Products[0].VdrInfo.IsMktPr:false,"VendorName":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].VdrInfo)?M2DOProductJson.Products[0].VdrInfo.DN:'',"CategoryName":GetCategoryName(M2DOProductJson)}
var M2BasketJSON=basketJson;if(JSONisNullOrUndefinedOrEmpty(M2BasketJSON)){return null;}
return M2BasketJSON;}
catch(e){return null;}}
function GetM2BasketJSONByInternalReference(M2DOProductJson,InternalReference,SecondInternalReference,quantity,personalization){try{if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)){return null;}
var M2ColorJson=JSONQuery("[?Id='"+InternalReference+"']",M2DOProductJson.Products[0].Vrnts);var M2SizeJson=JSONQuery("[?Id='"+SecondInternalReference+"']",M2ColorJson[0].Vrnts);if(JSONisNullOrUndefinedOrEmpty(M2ColorJson)||JSONisNullOrUndefinedOrEmpty(M2SizeJson)){return null;}
var offer=M2SizeJson[0].Ofrs[0];basketJson={"DisplayName":M2DOProductJson.Products[0].DN,"ItemOfferId":offer.ItemOfferId,"InternalReference":M2ColorJson[0].Id,"SecInternalReference":M2SizeJson[0].Id,"ProductId":M2DOProductJson.Products[0].Id,"CatalogVersionId":M2DOProductJson.Products[0].CatVerId,"CategoryId":M2DOProductJson.Products[0].PCId,"FirstLevelSku":M2ColorJson[0].AltId,"SizeCode":GetSizeCodeFromM2Size(M2SizeJson),"Origin":origin,"Price":offer.LiPr,"UnitPrice":offer.LtUntPr,"Personalization":personalization,"ColorText":M2ColorJson[0].DN,"SizeText":M2SizeJson[0].DN,"HasAncillaryService":!JSONisNullOrUndefinedOrEmpty(offer.AncSvcs)?offer.AncSvcs[0].FAv:false,"IsEcoComplaint":offer.EnvCmpl.FCpl,"Quantity":quantity,"Discount":offer.Dis,"StrikePrice":offer.PrLiPr,"MediaImageUrl":(!JSONisNullOrUndefinedOrEmpty(M2ColorJson[0].Imgs))?M2ColorJson[0].Imgs[0].FlNm:'',"BrandLabel":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].Br)?M2DOProductJson.Products[0].Br.DN:'',"VendorId":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].VdrInfo)?M2DOProductJson.Products[0].VdrInfo.Id:0,"IsMarketPlaceProduct":!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].VdrInfo)?M2DOProductJson.Products[0].VdrInfo.IsMktPr:false,"CategoryName":GetCategoryName(M2DOProductJson)}
var M2BasketJSON=basketJson;if(JSONisNullOrUndefinedOrEmpty(M2BasketJSON)){return null;}
return M2BasketJSON;}
catch(e){return null;}}
function GetSizeCodeFromM2Size(M2SizeObj){for(var i=0;i<M2SizeObj[0].MscCds.length;i++){if(M2SizeObj[0].MscCds[i].BTy.Id=="HighSizeCode"){return M2SizeObj[0].MscCds[i].Des;}}
return"";}
function JSONisNullOrUndefinedOrEmpty(jsonobject){if(jsonobject==undefined||null==jsonobject||jsonobject.length<=0)return true;return false;}
function IsSoldByMeter(MsrmtTypId){if(MsrmtTypId==2){return true};return false;}
function SetOrigin(originName){if(JSONisNullOrUndefinedOrEmpty(originName)){origin='DirectOrder';}
else{origin=originName;}}
function GetCategoryName(M2DOProductJson){var categoryName='';if(!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].IsMlOrdPrd)&&M2DOProductJson.Products[0].IsMlOrdPrd==true)
categoryName='Papier';else if(!JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products[0].AscCats)&&M2DOProductJson.Products[0].AscCats.length>=2)
categoryName=M2DOProductJson.Products[0].AscCats[0].DN;return categoryName;}
function GetM2ServicesByOfferID(M2DOProductJson,offerId){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)||(M2DOProductJson.Products.length<=0)){return null;}
var AncSvcs=null;var colors=M2DOProductJson.Products[0].Vrnts;for(var i=0;i<colors.length;i++){var currentColor=colors[i];var sizes=currentColor.Vrnts;for(var j=0;j<sizes.length;j++){var offers=sizes[j].Ofrs;for(var k=0;k<offers.length;k++){if(offers[k].ItemOfferId==offerId){AncSvcs=offers[k].AncSvcs;}}}}
return(AncSvcs==null||AncSvcs.length==0)?null:AncSvcs;}
function GetM2ServicesByInternalReferenceAndSecondInternalReference(M2DOProductJson,InternalReference,SecInternalReference){if(JSONisNullOrUndefinedOrEmpty(M2DOProductJson)||JSONisNullOrUndefinedOrEmpty(M2DOProductJson.Products)||(M2DOProductJson.Products.length<=0)){return null;}
return GetM2ServicesForProduct(M2DOProductJson.Products[0],InternalReference,SecInternalReference);}
function GetM2ServicesForProduct(ProdJson,intRef,secIntRef){if(JSONisNullOrUndefinedOrEmpty(ProdJson)||JSONisNullOrUndefinedOrEmpty(ProdJson.Vrnts)||(ProdJson.Vrnts.length<=0)){return null;}
var Colors=ProdJson.Vrnts;var Sizes=null;for(var i=0;i<Colors.length;i++){if(Colors[i].Id==intRef){Sizes=Colors[i].Vrnts;break;}}
if(JSONisNullOrUndefinedOrEmpty(Sizes)||(Sizes.length<=0)){return null;}
var AncSvcs=null;for(var j=0;j<Sizes.length;j++){if(Sizes[j].Id==secIntRef){AncSvcs=Sizes[j].AncSvcs;break;}}
if(JSONisNullOrUndefinedOrEmpty(AncSvcs)||(AncSvcs.length<=0)){return null;}
return AncSvcs;}

var isHeaderLoginOKClick=false;ReplyMessageStatus={SUCCESS:0,FAILED:1,WARNING:2,TRANSITION:3,TECHNICAL_ERROR:4,MERGEBASKET_FAILED:5,VALIDATION_FAILED:6,LOGIN_OK_BUT_NOACCOUNT:7,INVALID_LOGIN_ATTEMPTS:8,CALL_ADVISORY:9,INVALID_DOB_ATTEMPTS:10,UNKNOWN:99};Urls={IdentifyAccountPage:'/Account/IdentifyAcct.aspx',TechnicalErrorPage:'/Error_Pages/Error404_technical_error.aspx',TechnicalErrorPage_QuickLoginTimeout:'/Error_Pages/Error404_technical_error.aspx?QuickLoginTimeout',DefaultPage:'/Default.aspx'};function FormatErrorMessageInText(errorMessage)
{return"Certains champs du formulaire posent un problème: "+errorMessage;}
function identifyUser(quickLoginURL,currentUserName,password){isHeaderLoginOKClick=true;var secureLoginURL=quickLoginURL+"&uid="+currentUserName+"&pwd="+password;userName=currentUserName;$j.jsonp({url:secureLoginURL,success:SuccessData,cache:false,pageCache:false,error:function(d,msg){isHeaderLoginOKClick=false;if(msg=='timeout')
{RedirectToPage(Urls.TechnicalErrorPage_QuickLoginTimeout);}
else
{RedirectToPage(Urls.IdentifyAccountPage);}},timeout:300000});}
function isNullOrUndefinedJSON(jsonData)
{if(typeof(jsonData)=='undefined'||jsonData==null)
{return true;}
return false;}
function RedirectToPage(redirectUrl)
{if(!isNullOrUndefinedJSON(redirectUrl))
{window.location.href=redirectUrl;}}
function SuccessData(json){isHeaderLoginOKClick=false;if(!isNullOrUndefinedJSON(json))
{var errorMessage='';if(!isNullOrUndefinedJSON(json.GenericErrorMessage))
{errorMessage=json.GenericErrorMessage;}
var IsMFSuccess=true;switch(json.ReplyMessageStatus){case ReplyMessageStatus.WARNING:IsMFSuccess=false;case ReplyMessageStatus.INVALID_LOGIN_ATTEMPTS:IsMFSuccess=false;case ReplyMessageStatus.LOGIN_OK_BUT_NOACCOUNT:IsMFSuccess=false;case ReplyMessageStatus.SUCCESS:if(preferesTabButton.hasClass('tab_selected')){topSticky.find('.preferes').trigger('click');}
var isPageRefresh=false;if(IsMFSuccess){isPageRefresh=DOPageRefresh();}
if(!isPageRefresh){errorMessage=FormatErrorMessageInText(errorMessage);setWelcomeMsg(errorMessage);CallBackOnLoginSuccess();}
break;case ReplyMessageStatus.TRANSITION:DoTransitonForQuickLogin(json.Transition,json.MFErrorTypes);break;default:RedirectToPage(Urls.TechnicalErrorPage+"?QuickLogin="+errorMessage+"&errortype="+json.MFErrorTypes);break;}}
else
{RedirectToPage(Urls.TechnicalErrorPage+"?QuickLogin=NoJSONResponse");}}
function submitToQuickLogin(quickLoginUrl){if(!CheckCookiesEnabled())
{return false;}
if(isHeaderLoginOKClick)
{return;}
plainTextSyncGetCall('/IdentifyAcctAsyncDummyPage.aspx');identifyUser(quickLoginUrl,document.getElementById("quickLoginId").value,document.getElementById("quickLoginPassword").value);}
function DOPageRefresh(){if(typeof(IsBasketV2)!='undefined'&&IsBasketV2!=null&&IsBasketV2==true){var isViewBasketPage=window.location.href.toLowerCase().indexOf("basketv2.aspx");}
else{var isViewBasketPage=window.location.href.toLowerCase().indexOf("basket.aspx");}
var isMappyPage=window.location.href.toLowerCase().indexOf("mappy.aspx");var isFinarefPage=window.location.href.toLowerCase().indexOf("finaref.aspx");var isCKGASKWithoutCard=window.location.href.toLowerCase().indexOf("ckgaskwithoutcard.aspx");var isCKGCustomer=window.location.href.toLowerCase().indexOf("ckgcustomer.aspx");var isCKGLogin=window.location.href.toLowerCase().indexOf("ckglogin.aspx");var isCKGNoASKNoCard=window.location.href.toLowerCase().indexOf("ckgnoasknocard.aspx");var isPremiumOffer=window.location.href.toLowerCase().indexOf("rpremiumoffer.aspx");var isExpressOffer=window.location.href.toLowerCase().indexOf("rexpressoffer.aspx");if(isViewBasketPage>0||isMappyPage>0||isFinarefPage>0||isCKGASKWithoutCard>0||isCKGCustomer>0||isCKGLogin>0||isCKGNoASKNoCard>0||isPremiumOffer>0||isExpressOffer>0)
{window.location.reload();return true;}
return false;}
function DoTransitonForQuickLogin(transition,mferrorType){if(isNullOrUndefined(transition)){window.location.href=Urls.TechnicalErrorPage;}else{window.location.href=transition.replace(/\~/ig,'')+"?errortype="+mferrorType;;}};