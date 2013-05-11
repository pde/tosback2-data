function sprintf(){var regex=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;var a=arguments,i=0,format=a[i++];var pad=function(str,len,chr,leftJustify){if(!chr){chr=' ';}
var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str;};var justify=function(value,prefix,leftJustify,minWidth,zeroPad,customPadChar){var diff=minWidth-value.length;if(diff>0){if(leftJustify||!zeroPad){value=pad(value,minWidth,customPadChar,leftJustify);}else{value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length);}}
return value;};var formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{'2':'0b','8':'0','16':'0x'}[base]||'';value=prefix+pad(number.toString(base),precision||0,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad);};var formatString=function(value,leftJustify,minWidth,precision,zeroPad,customPadChar){if(precision!=null){value=value.slice(0,precision);}
return justify(value,'',leftJustify,minWidth,zeroPad,customPadChar);};var doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){var number;var prefix;var method;var textTransform;var value;if(substring=='%%'){return'%';}
var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false,customPadChar=' ';var flagsl=flags.length;for(var j=0;flags&&j<flagsl;j++){switch(flags.charAt(j)){case' ':positivePrefix=' ';break;case'+':positivePrefix='+';break;case'-':leftJustify=true;break;case"'":customPadChar=flags.charAt(j+1);break;case'0':zeroPad=true;break;case'#':prefixBaseX=true;break;}}
if(!minWidth){minWidth=0;}else if(minWidth=='*'){minWidth=+a[i++];}else if(minWidth.charAt(0)=='*'){minWidth=+a[minWidth.slice(1,-1)];}else{minWidth=+minWidth;}
if(minWidth<0){minWidth=-minWidth;leftJustify=true;}
if(!isFinite(minWidth)){throw new Error('sprintf: (minimum-)width must be finite');}
if(!precision){precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:undefined;}else if(precision=='*'){precision=+a[i++];}else if(precision.charAt(0)=='*'){precision=+a[precision.slice(1,-1)];}else{precision=+precision;}
value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case's':return formatString(String(value),leftJustify,minWidth,precision,zeroPad,customPadChar);case'c':return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);case'b':return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'o':return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'x':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'X':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();case'u':return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case'i':case'd':number=(+value)|0;prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad);case'e':case'E':case'f':case'F':case'g':case'G':number=+value;prefix=number<0?'-':positivePrefix;method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]();default:return substring;}};return format.replace(regex,doFormat);};/*
Pure Javascript implementation of Uniforum message translation.
Copyright (C) 2008 Joshua I. Miller <unrtst@cpan.org>, all rights reserved

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Library General Public License as published
by the Free Software Foundation; either version 2, or (at your option)
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Library General Public License for more details.

You should have received a copy of the GNU Library General Public
License along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307,
USA.

=head1 NAME

Javascript Gettext - Javascript implemenation of GNU Gettext API.

=head1 SYNOPSIS

 // //////////////////////////////////////////////////////////
 // Optimum caching way
 <script language="javascript" src="/path/LC_MESSAGES/myDomain.json"></script>
 <script language="javascript" src="/path/Gettext.js'></script>

 // assuming myDomain.json defines variable json_locale_data
 var params = {  "domain" : "myDomain",
                 "locale_data" : json_locale_data
              };
 var gt = new Gettext(params);
 // create a shortcut if you'd like
 function _ (msgid) { return gt.gettext(msgid); }
 alert(_("some string"));
 // or use fully named method
 alert(gt.gettext("some string"));
 // change to use a different "domain"
 gt.textdomain("anotherDomain");
 alert(gt.gettext("some string"));


 // //////////////////////////////////////////////////////////
 // The other way to load the language lookup is a "link" tag
 // Downside is that not all browsers cache XMLHttpRequests the
 // same way, so caching of the language data isn't guarenteed
 // across page loads.
 // Upside is that it's easy to specify multiple files
 <link rel="gettext" href="/path/LC_MESSAGES/myDomain.json" />
 <script language="javascript" src="/path/Gettext.js'></script>

 var gt = new Gettext({ "domain" : "myDomain" });
 // rest is the same


 // //////////////////////////////////////////////////////////
 // The reson the shortcuts aren't exported by default is because they'd be
 // glued to the single domain you created. So, if you're adding i18n support
 // to some js library, you should use it as so:

 if (typeof(MyNamespace) == 'undefined') MyNamespace = {};
 MyNamespace.MyClass = function () {
     var gtParms = { "domain" : 'MyNamespace_MyClass' };
     this.gt = new Gettext(gtParams);
     return this;
 };
 MyNamespace.MyClass.prototype._ = function (msgid) {
     return this.gt.gettext(msgid);
 };
 MyNamespace.MyClass.prototype.something = function () {
     var myString = this._("this will get translated");
 };

 // //////////////////////////////////////////////////////////
 // Adding the shortcuts to a global scope is easier. If that's
 // ok in your app, this is certainly easier.
 var myGettext = new Gettext({ 'domain' : 'myDomain' });
 function _ (msgid) {
     return myGettext.gettext(msgid);
 }
 alert( _("text") );

 // //////////////////////////////////////////////////////////
 // Data structure of the json data
 // NOTE: if you're loading via the <script> tag, you can only
 // load one file, but it can contain multiple domains.
 var json_locale_data = {
     "MyDomain" : {
         "" : {
             "header_key" : "header value",
             "header_key" : "header value",
         "msgid" : [ "msgid_plural", "msgstr", "msgstr_plural", "msgstr_pluralN" ],
         "msgctxt\004msgid" : [ null, "msgstr" ],
         },
     "AnotherDomain" : {
         },
     }

=head1 DESCRIPTION

This is a javascript implementation of GNU Gettext, providing internationalization support for javascript. It differs from existing javascript implementations in that it will support all current Gettext features (ex. plural and context support), and will also support loading language catalogs from .mo, .po, or preprocessed json files (converter included).

The locale initialization differs from that of GNU Gettext / POSIX. Rather than setting the category, domain, and paths, and letting the libs find the right file, you must explicitly load the file at some point. The "domain" will still be honored. Future versions may be expanded to include support for set_locale like features.


=head1 INSTALL

To install this module, simply copy the file lib/Gettext.js to a web accessable location, and reference it from your application.


=head1 CONFIGURATION

Configure in one of two ways:

=over

=item 1. Optimal. Load language definition from statically defined json data.

    <script language="javascript" src="/path/locale/domain.json"></script>

    // in domain.json
    json_locale_data = {
        "mydomain" : {
            // po header fields
            "" : {
                "plural-forms" : "...",
                "lang" : "en",
                },
            // all the msgid strings and translations
            "msgid" : [ "msgid_plural", "translation", "plural_translation" ],
        },
    };
    // please see the included bin/po2json script for the details on this format

This method also allows you to use unsupported file formats, so long as you can parse them into the above format.

=item 2. Use AJAX to load language file.

Use XMLHttpRequest (actually, SJAX - syncronous) to load an external resource.

Supported external formats are:

=over

=item * Javascript Object Notation (.json)

(see bin/po2json)

    type=application/json

=item * Uniforum Portable Object (.po)

(see GNU Gettext's xgettext)

    type=application/x-po

=item * Machine Object (compiled .po) (.mo)

NOTE: .mo format isn't actually supported just yet, but support is planned.

(see GNU Gettext's msgfmt)

    type=application/x-mo

=back

=back

=head1 METHODS

The following methods are implemented:

  new Gettext(args)
  textdomain  (domain)
  gettext     (msgid)
  dgettext    (domainname, msgid)
  dcgettext   (domainname, msgid, LC_MESSAGES)
  ngettext    (msgid, msgid_plural, count)
  dngettext   (domainname, msgid, msgid_plural, count)
  dcngettext  (domainname, msgid, msgid_plural, count, LC_MESSAGES)
  pgettext    (msgctxt, msgid)
  dpgettext   (domainname, msgctxt, msgid)
  dcpgettext  (domainname, msgctxt, msgid, LC_MESSAGES)
  npgettext   (msgctxt, msgid, msgid_plural, count)
  dnpgettext  (domainname, msgctxt, msgid, msgid_plural, count)
  dcnpgettext (domainname, msgctxt, msgid, msgid_plural, count, LC_MESSAGES)
  strargs     (string, args_array)


=head2 new Gettext (args)

Several methods of loading locale data are included. You may specify a plugin or alternative method of loading data by passing the data in as the "locale_data" option. For example:

    var get_locale_data = function () {
        // plugin does whatever to populate locale_data
        return locale_data;
    };
    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : get_locale_data() );

The above can also be used if locale data is specified in a statically included <SCRIPT> tag. Just specify the variable name in the call to new. Ex:

    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : json_locale_data_variable );

Finally, you may load the locale data by referencing it in a <LINK> tag. Simply exclude the 'locale_data' option, and all <LINK rel="gettext" ...> items will be tried. The <LINK> should be specified as:

    <link rel="gettext" type="application/json" href="/path/to/file.json">
    <link rel="gettext" type="text/javascript"  href="/path/to/file.json">
    <link rel="gettext" type="application/x-po" href="/path/to/file.po">
    <link rel="gettext" type="application/x-mo" href="/path/to/file.mo">

args:

=over

=item domain

The Gettext domain, not www.whatev.com. It's usually your applications basename. If the .po file was "myapp.po", this would be "myapp".

=item locale_data

Raw locale data (in json structure). If specified, from_link data will be ignored.

=back

=cut

*/
Gettext=function(args){this.domain='messages';this.locale_data=undefined;var options=["domain","locale_data"];if(this.isValidObject(args)){for(var i in args){for(var j=0;j<options.length;j++){if(i==options[j]){if(this.isValidObject(args[i]))
this[i]=args[i];}}}}
this.try_load_lang();return this;}
Gettext.context_glue="\004";Gettext._locale_data={};Gettext.prototype.try_load_lang=function(){if(typeof(this.locale_data)!='undefined'){var locale_copy=this.locale_data;this.locale_data=undefined;this.parse_locale_data(locale_copy);if(typeof(Gettext._locale_data[this.domain])=='undefined'){throw new Error("Error: Gettext 'locale_data' does not contain the domain '"+this.domain+"'");}}
var lang_link=this.get_lang_refs();if(typeof(lang_link)=='object'&&lang_link.length>0){for(var i=0;i<lang_link.length;i++){var link=lang_link[i];if(link.type=='application/json'){if(!this.try_load_lang_json(link.href)){throw new Error("Error: Gettext 'try_load_lang_json' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");}}else if(link.type=='application/x-po'){if(!this.try_load_lang_po(link.href)){throw new Error("Error: Gettext 'try_load_lang_po' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");}}else{throw new Error("TODO: link type ["+link.type+"] found, and support is planned, but not implemented at this time.");}}}};Gettext.prototype.parse_locale_data=function(locale_data){if(typeof(Gettext._locale_data)=='undefined'){Gettext._locale_data={};}
for(var domain in locale_data){if((!locale_data.hasOwnProperty(domain))||(!this.isValidObject(locale_data[domain])))
continue;var has_msgids=false;for(var msgid in locale_data[domain]){has_msgids=true;break;}
if(!has_msgids)continue;var data=locale_data[domain];if(domain=="")domain="messages";if(!this.isValidObject(Gettext._locale_data[domain]))
Gettext._locale_data[domain]={};if(!this.isValidObject(Gettext._locale_data[domain].head))
Gettext._locale_data[domain].head={};if(!this.isValidObject(Gettext._locale_data[domain].msgs))
Gettext._locale_data[domain].msgs={};for(var key in data){if(key==""){var header=data[key];for(var head in header){var h=head.toLowerCase();Gettext._locale_data[domain].head[h]=header[head];}}else{Gettext._locale_data[domain].msgs[key]=data[key];}}}
for(var domain in Gettext._locale_data){if(this.isValidObject(Gettext._locale_data[domain].head['plural-forms'])&&typeof(Gettext._locale_data[domain].head.plural_func)=='undefined'){var plural_forms=Gettext._locale_data[domain].head['plural-forms'];var pf_re=new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)','m');if(pf_re.test(plural_forms)){var pf=Gettext._locale_data[domain].head['plural-forms'];if(!/;\s*$/.test(pf))pf=pf.concat(';');var code='var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';Gettext._locale_data[domain].head.plural_func=new Function("n",code);}else{throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");}}else if(typeof(Gettext._locale_data[domain].head.plural_func)=='undefined'){Gettext._locale_data[domain].head.plural_func=function(n){var p=(n!=1)?1:0;return{'nplural':2,'plural':p};};}}
return;};Gettext.prototype.try_load_lang_po=function(uri){var data=this.sjax(uri);if(!data)return;var domain=this.uri_basename(uri);var parsed=this.parse_po(data);var rv={};if(parsed){if(!parsed[""])parsed[""]={};if(!parsed[""]["domain"])parsed[""]["domain"]=domain;domain=parsed[""]["domain"];rv[domain]=parsed;this.parse_locale_data(rv);}
return 1;};Gettext.prototype.uri_basename=function(uri){var rv;if(rv=uri.match(/^(.*\/)?(.*)/)){var ext_strip;if(ext_strip=rv[2].match(/^(.*)\..+$/))
return ext_strip[1];else
return rv[2];}else{return"";}};Gettext.prototype.parse_po=function(data){var rv={};var buffer={};var lastbuffer="";var errors=[];var lines=data.split("\n");for(var i=0;i<lines.length;i++){lines[i]=lines[i].replace(/(\n|\r)+$/,'');var match;if(/^$/.test(lines[i])){if(typeof(buffer['msgid'])!='undefined'){var msg_ctxt_id=(typeof(buffer['msgctxt'])!='undefined'&&buffer['msgctxt'].length)?buffer['msgctxt']+Gettext.context_glue+buffer['msgid']:buffer['msgid'];var msgid_plural=(typeof(buffer['msgid_plural'])!='undefined'&&buffer['msgid_plural'].length)?buffer['msgid_plural']:null;var trans=[];for(var str in buffer){var match;if(match=str.match(/^msgstr_(\d+)/))
trans[parseInt(match[1])]=buffer[str];}
trans.unshift(msgid_plural);if(trans.length>1)rv[msg_ctxt_id]=trans;buffer={};lastbuffer="";}}else if(/^#/.test(lines[i])){continue;}else if(match=lines[i].match(/^msgctxt\s+(.*)/)){lastbuffer='msgctxt';buffer[lastbuffer]=this.parse_po_dequote(match[1]);}else if(match=lines[i].match(/^msgid\s+(.*)/)){lastbuffer='msgid';buffer[lastbuffer]=this.parse_po_dequote(match[1]);}else if(match=lines[i].match(/^msgid_plural\s+(.*)/)){lastbuffer='msgid_plural';buffer[lastbuffer]=this.parse_po_dequote(match[1]);}else if(match=lines[i].match(/^msgstr\s+(.*)/)){lastbuffer='msgstr_0';buffer[lastbuffer]=this.parse_po_dequote(match[1]);}else if(match=lines[i].match(/^msgstr\[0\]\s+(.*)/)){lastbuffer='msgstr_0';buffer[lastbuffer]=this.parse_po_dequote(match[1]);}else if(match=lines[i].match(/^msgstr\[(\d+)\]\s+(.*)/)){lastbuffer='msgstr_'+match[1];buffer[lastbuffer]=this.parse_po_dequote(match[2]);}else if(/^"/.test(lines[i])){buffer[lastbuffer]+=this.parse_po_dequote(lines[i]);}else{errors.push("Strange line ["+i+"] : "+lines[i]);}}
if(typeof(buffer['msgid'])!='undefined'){var msg_ctxt_id=(typeof(buffer['msgctxt'])!='undefined'&&buffer['msgctxt'].length)?buffer['msgctxt']+Gettext.context_glue+buffer['msgid']:buffer['msgid'];var msgid_plural=(typeof(buffer['msgid_plural'])!='undefined'&&buffer['msgid_plural'].length)?buffer['msgid_plural']:null;var trans=[];for(var str in buffer){var match;if(match=str.match(/^msgstr_(\d+)/))
trans[parseInt(match[1])]=buffer[str];}
trans.unshift(msgid_plural);if(trans.length>1)rv[msg_ctxt_id]=trans;buffer={};lastbuffer="";}
if(rv[""]&&rv[""][1]){var cur={};var hlines=rv[""][1].split(/\\n/);for(var i=0;i<hlines.length;i++){if(!hlines.length)continue;var pos=hlines[i].indexOf(':',0);if(pos!=-1){var key=hlines[i].substring(0,pos);var val=hlines[i].substring(pos+1);var keylow=key.toLowerCase();if(cur[keylow]&&cur[keylow].length){errors.push("SKIPPING DUPLICATE HEADER LINE: "+hlines[i]);}else if(/#-#-#-#-#/.test(keylow)){errors.push("SKIPPING ERROR MARKER IN HEADER: "+hlines[i]);}else{val=val.replace(/^\s+/,'');cur[keylow]=val;}}else{errors.push("PROBLEM LINE IN HEADER: "+hlines[i]);cur[hlines[i]]='';}}
rv[""]=cur;}else{rv[""]={};}
return rv;};Gettext.prototype.parse_po_dequote=function(str){var match;if(match=str.match(/^"(.*)"/)){str=match[1];}
str=str.replace(/\\"/g,"\"");return str;};Gettext.prototype.try_load_lang_json=function(uri){var data=this.sjax(uri);if(!data)return;var rv=this.JSON(data);this.parse_locale_data(rv);return 1;};Gettext.prototype.get_lang_refs=function(){var langs=new Array();var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].rel=='gettext'&&links[i].href){if(typeof(links[i].type)=='undefined'||links[i].type==''){if(/\.json$/i.test(links[i].href)){links[i].type='application/json';}else if(/\.js$/i.test(links[i].href)){links[i].type='application/json';}else if(/\.po$/i.test(links[i].href)){links[i].type='application/x-po';}else if(/\.mo$/i.test(links[i].href)){links[i].type='application/x-mo';}else{throw new Error("LINK tag with rel=gettext found, but the type and extension are unrecognized.");}}
links[i].type=links[i].type.toLowerCase();if(links[i].type=='application/json'){links[i].type='application/json';}else if(links[i].type=='text/javascript'){links[i].type='application/json';}else if(links[i].type=='application/x-po'){links[i].type='application/x-po';}else if(links[i].type=='application/x-mo'){links[i].type='application/x-mo';}else{throw new Error("LINK tag with rel=gettext found, but the type attribute ["+links[i].type+"] is unrecognized.");}
langs.push(links[i]);}}
return langs;};Gettext.prototype.textdomain=function(domain){if(domain&&domain.length)this.domain=domain;return this.domain;}
Gettext.prototype.gettext=function(msgid){var msgctxt;var msgid_plural;var n;var category;return this.dcnpgettext(null,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dgettext=function(domain,msgid){var msgctxt;var msgid_plural;var n;var category;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dcgettext=function(domain,msgid,category){var msgctxt;var msgid_plural;var n;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.ngettext=function(msgid,msgid_plural,n){var msgctxt;var category;return this.dcnpgettext(null,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dngettext=function(domain,msgid,msgid_plural,n){var msgctxt;var category;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dcngettext=function(domain,msgid,msgid_plural,n,category){var msgctxt;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category,category);};Gettext.prototype.pgettext=function(msgctxt,msgid){var msgid_plural;var n;var category;return this.dcnpgettext(null,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dpgettext=function(domain,msgctxt,msgid){var msgid_plural;var n;var category;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dcpgettext=function(domain,msgctxt,msgid,category){var msgid_plural;var n;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.npgettext=function(msgctxt,msgid,msgid_plural,n){var category;return this.dcnpgettext(null,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dnpgettext=function(domain,msgctxt,msgid,msgid_plural,n){var category;return this.dcnpgettext(domain,msgctxt,msgid,msgid_plural,n,category);};Gettext.prototype.dcnpgettext=function(domain,msgctxt,msgid,msgid_plural,n,category){if(!this.isValidObject(msgid))return'';var plural=this.isValidObject(msgid_plural);var msg_ctxt_id=this.isValidObject(msgctxt)?msgctxt+Gettext.context_glue+msgid:msgid;var domainname=this.isValidObject(domain)?domain:this.isValidObject(this.domain)?this.domain:'messages';var category_name='LC_MESSAGES';var category=5;var locale_data=new Array();if(typeof(Gettext._locale_data)!='undefined'&&this.isValidObject(Gettext._locale_data[domainname])){locale_data.push(Gettext._locale_data[domainname]);}else if(typeof(Gettext._locale_data)!='undefined'){for(var dom in Gettext._locale_data){locale_data.push(Gettext._locale_data[dom]);}}
var trans=[];var found=false;var domain_used;if(locale_data.length){for(var i=0;i<locale_data.length;i++){var locale=locale_data[i];if(this.isValidObject(locale.msgs[msg_ctxt_id])){for(var j=0;j<locale.msgs[msg_ctxt_id].length;j++){trans[j]=locale.msgs[msg_ctxt_id][j];}
trans.shift();domain_used=locale;found=true;if(trans.length>0&&trans[0].length!=0)
break;}}}
if(trans.length==0||trans[0].length==0){trans=[msgid,msgid_plural];}
var translation=trans[0];if(plural){var p;if(found&&this.isValidObject(domain_used.head.plural_func)){var rv=domain_used.head.plural_func(n);if(!rv.plural)rv.plural=0;if(!rv.nplural)rv.nplural=0;if(rv.nplural<=rv.plural)rv.plural=0;p=rv.plural;}else{p=(n!=1)?1:0;}
if(this.isValidObject(trans[p]))
translation=trans[p];}
return translation;};Gettext.strargs=function(str,args){if(null==args||'undefined'==typeof(args)){args=[];}else if(args.constructor!=Array){args=[args];}
var newstr="";while(true){var i=str.indexOf('%');var match_n;if(i==-1){newstr+=str;break;}
newstr+=str.substr(0,i);if(str.substr(i,2)=='%%'){newstr+='%';str=str.substr((i+2));}else if(match_n=str.substr(i).match(/^%(\d+)/)){var arg_n=parseInt(match_n[1]);var length_n=match_n[1].length;if(arg_n>0&&args[arg_n-1]!=null&&typeof(args[arg_n-1])!='undefined')
newstr+=args[arg_n-1];str=str.substr((i+1+length_n));}else{newstr+='%';str=str.substr((i+1));}}
return newstr;}
Gettext.prototype.strargs=function(str,args){return Gettext.strargs(str,args);}
Gettext.prototype.isArray=function(thisObject){return this.isValidObject(thisObject)&&thisObject.constructor==Array;};Gettext.prototype.isValidObject=function(thisObject){if(null==thisObject){return false;}else if('undefined'==typeof(thisObject)){return false;}else{return true;}};Gettext.prototype.sjax=function(uri){var xmlhttp;if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}else if(navigator.userAgent.toLowerCase().indexOf('msie 5')!=-1){xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}else{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}
if(!xmlhttp)
throw new Error("Your browser doesn't do Ajax. Unable to support external language files.");xmlhttp.open('GET',uri,false);try{xmlhttp.send(null);}
catch(e){return;}
var sjax_status=xmlhttp.status;if(sjax_status==200||sjax_status==0){return xmlhttp.responseText;}else{var error=xmlhttp.statusText+" (Error "+xmlhttp.status+")";if(xmlhttp.responseText.length){error+="\n"+xmlhttp.responseText;}
alert(error);return;}}
Gettext.prototype.JSON=function(data){return eval('('+data+')');}
/*

=head1 NOTES

These are some notes on the internals

=over

=item LOCALE CACHING

Loaded locale data is currently cached class-wide. This means that if two scripts are both using Gettext.js, and both share the same gettext domain, that domain will only be loaded once. This will allow you to grab a new object many times from different places, utilize the same domain, and share a single translation file. The downside is that a domain won't be RE-loaded if a new object is instantiated on a domain that had already been instantiated.

=back

=head1 BUGS / TODO

=over

=item error handling

Currently, there are several places that throw errors. In GNU Gettext, there are no fatal errors, which allows text to still be displayed regardless of how broken the environment becomes. We should evaluate and determine where we want to stand on that issue.

=item syncronous only support (no ajax support)

Currently, fetching language data is done purely syncronous, which means the page will halt while those files are fetched/loaded.

This is often what you want, as then following translation requests will actually be translated. However, if all your calls are done dynamically (ie. error handling only or something), loading in the background may be more adventagous.

It's still recommended to use the statically defined <script ...> method, which should have the same delay, but it will cache the result.

=item domain support

domain support while using shortcut methods like C<_('string')> or C<i18n('string')>.

Under normal apps, the domain is usually set globally to the app, and a single language file is used. Under javascript, you may have multiple libraries or applications needing translation support, but the namespace is essentially global.

It's recommended that your app initialize it's own shortcut with it's own domain.  (See examples/wrapper/i18n.js for an example.)

Basically, you'll want to accomplish something like this:

    // in some other .js file that needs i18n
    this.i18nObj = new i18n;
    this.i18n = this.i18nObj.init('domain');
    // do translation
    alert( this.i18n("string") );

If you use this raw Gettext object, then this is all handled for you, as you have your own object then, and will be calling C<myGettextObject.gettext('string')> and such.


=item encoding

May want to add encoding/reencoding stuff. See GNU iconv, or the perl module Locale::Recode from libintl-perl.

=back


=head1 COMPATABILITY

This has been tested on the following browsers. It may work on others, but these are all those to which I have access.

    FF1.5, FF2, FF3, IE6, IE7, Opera9, Opera10, Safari3.1, Chrome

    *FF = Firefox
    *IE = Internet Explorer


=head1 REQUIRES

bin/po2json requires perl, and the perl modules Locale::PO and JSON.

=head1 SEE ALSO

bin/po2json (included),
examples/normal/index.html,
examples/wrapper/i18n.html, examples/wrapper/i18n.js,
Locale::gettext_pp(3pm), POSIX(3pm), gettext(1), gettext(3)

=head1 AUTHOR

Copyright (C) 2008, Joshua I. Miller E<lt>unrtst@cpan.orgE<gt>, all rights reserved. See the source code for details.

=cut

*/;if(typeof sprintf!='function'){throw"locale_simple.js: require a javascript sprintf implementation";}
if(typeof Gettext!='function'||typeof Gettext.strargs!='function'){throw"locale_simple.js: require Gettext.js of http://jsgettext.berlios.de/ to be loaded, included in this distribution.";}
if(typeof locale_simple!='undefined'){throw"locale_simple.js: locale_simple.js already loaded";}
var locale_data={};var locale_simple={curr:null,lang:null,dir:null,dry:0,nowrite:0,tds:{},l_dir:function(dir){if(this.dir!=null){throw"locale_simple.js: can't switch dir";}
this.dir=dir;},l_dry:function(dry,nowrite){this.dry=dry;this.nowrite=nowrite;},l_lang:function(lang){if(this.lang!=null){throw"locale_simple.js: can't switch language";}
this.lang=lang;},ltd:function(textdomain){if(!(textdomain in this.tds)){this.tds[textdomain]=new Gettext({'domain':textdomain,'locale_data':locale_data});}
this.curr=this.tds[textdomain];return textdomain;},wd:function(td,msgctxt,msgid,msgid_plural){if(typeof console!='object'){return;}
if(typeof console.debug!='function'){return;}
if(td){console.debug('# domain: '+td)}
if(msgctxt){console.debug('msgctxt "'+msgctxt+'"')}
if(msgid){console.debug('msgid "'+msgid+'"')}
if(msgid_plural){console.debug('msgid_plural "'+msgid_plural+'"')}
console.debug('');},l:function(){var A=this.argarr(arguments);var id=A.shift();var gt;if(this.dry){gt=id;if(!this.nowrite){this.wd(null,null,id,null);}}else{gt=this.curr.gettext(id);}
A.unshift(gt);return sprintf.apply(null,A);},ln:function(){var A=this.argarr(arguments);var id=A.shift();var idp=A.shift();var n=A.shift();var gt;if(this.dry){if(n!=1){gt=idp;}else{gt=id;}
if(!this.nowrite){this.wd(null,null,id,idp);}}else{gt=this.curr.ngettext(id,idp,n);}
A.unshift(n);A.unshift(gt);return sprintf.apply(null,A);},lp:function(){var A=this.argarr(arguments);var ctxt=A.shift();var id=A.shift();var gt;if(this.dry){gt=id;if(!this.nowrite){this.wd(null,ctxt,id,null);}}else{gt=this.curr.pgettext(ctxt,id);}
A.unshift(gt);return sprintf.apply(null,A);},lnp:function(){var A=this.argarr(arguments);var ctxt=A.shift();var id=A.shift();var idp=A.shift();var n=A.shift();var gt;if(this.dry){if(n!=1){gt=idp;}else{gt=id;}
if(!this.nowrite){this.wd(null,ctxt,id,idp);}}else{gt=this.curr.npgettext(ctxt,id,idp,n);}
A.unshift(n);A.unshift(gt);return sprintf.apply(null,A);},ld:function(){var A=this.argarr(arguments);var td=A.shift();var id=A.shift();var gt;if(this.dry){gt=id;if(!this.nowrite){this.wd(td,null,id,null);}}else{gt=this.curr.dgettext(td,id);}
A.unshift(gt);return sprintf.apply(null,A);},ldn:function(){var A=this.argarr(arguments);var td=A.shift();var id=A.shift();var idp=A.shift();var n=A.shift();var gt;if(this.dry){if(n!=1){gt=idp;}else{gt=id;}
if(!this.nowrite){this.wd(td,null,id,idp);}}else{gt=this.curr.dngettext(td,id,idp,n);}
A.unshift(n);A.unshift(gt);return sprintf.apply(null,A);},ldp:function(){var A=this.argarr(arguments);var td=A.shift();var ctxt=A.shift();var id=A.shift();var gt;if(this.dry){gt=id;if(!this.nowrite){this.wd(td,ctxt,id,null);}}else{gt=this.curr.dpgettext(td,ctxt,id);}
A.unshift(gt);return sprintf.apply(null,A);},ldnp:function(){var A=this.argarr(arguments);var td=A.shift();var ctxt=A.shift();var id=A.shift();var idp=A.shift();var n=A.shift();var gt;if(this.dry){if(n!=1){gt=idp;}else{gt=id;}
if(!this.nowrite){this.wd(td,ctxt,id,idp);}}else{gt=this.curr.dnpgettext(td,ctxt,id,idp,n);}
A.unshift(n);A.unshift(gt);return sprintf.apply(null,A);},argarr:function(args){var arr=new Array();for(var i=0,len=args.length;i<len;i++){arr.push(args[i]);}
return arr;}};function l_dry(){return locale_simple.l_dry.apply(locale_simple,arguments)}
function l_dir(){return locale_simple.l_dir.apply(locale_simple,arguments)}
function l_lang(){return locale_simple.l_lang.apply(locale_simple,arguments)}
function ltd(){return locale_simple.ltd.apply(locale_simple,arguments)}
function l(){return locale_simple.l.apply(locale_simple,arguments)}
function ln(){return locale_simple.ln.apply(locale_simple,arguments)}
function lp(){return locale_simple.lp.apply(locale_simple,arguments)}
function lnp(){return locale_simple.lnp.apply(locale_simple,arguments)}
function ld(){return locale_simple.ld.apply(locale_simple,arguments)}
function ldn(){return locale_simple.ldn.apply(locale_simple,arguments)}
function ldp(){return locale_simple.ldp.apply(locale_simple,arguments)}
function ldnp(){return locale_simple.ldnp.apply(locale_simple,arguments)};locale_data['duckduckgo-duckduckgo']={"Embed Elsewhere:":[null,"Embed Elsewhere:"],"":{"Plural-Forms":" nplurals=2; plural=n != 1;","MIME-Version":" 1.0","POT-Creation-Date":" 2013-05-08 08:30-0600","Language":" English of United States (English of United States)","Last-Translator":" Community","Content-Type":" text/plain; charset=UTF-8","Language-Team":" DuckDuckGo Community <community@duckduckgo.com>","PO-Revision-Date":" 2013-05-08 08:30-0600","Content-Transfer-Encoding":" 8bit","Project-Id-Version":" DuckDuckGo-Translation-0.000"},"Nearby":[null,"Nearby"],"Your IP address is %s in %s":[null,"Your IP address is %s in %s"],"We believe in better search and real privacy at the same time. That's why:":[null,"We believe in better search and real privacy at the same time. That's why:\t "],"cloudsave\u0004You can use Anonymous Cloud Save to store your settings in a more permanent way (on a remote server in the cloud).":[null,"You can use Anonymous Cloud Save to store your settings in a more permanent way (on a remote server in the cloud)."],"random number":[null,"random number"],"Similar":[null,"Similar"],"webelieve\u0004We":[null,"We"],"cloudsave\u0004You can share your settings among computers and browsers.":[null,"You can share your settings among computers and browsers."],"our feedback center":[null,"our feedback center"],"Get results for different meanings of %s":[null,"Get results for different meanings of %s"],"No right topic? Try web links...":[null,"No right topic? Try web links..."],"betterinstantanswers\u0004Better %s.":[null,"Better %s."],"Meanings of %s":[null,"Meanings of %s"],"%d pg":["%d pgs","%d pg","%d pgs"],"Cloud Save":[null,"Cloud Save"],"Translate":[null,"Translate"],"size\u0004Small":[null,"Small"],"Topics":[null,"Topics"],"Use %s command to turn off temporarily.":[null,"Use %s command to turn off temporarily."],"Turn off":[null,"Turn off"],"About DuckDuckGo":[null,"About DuckDuckGo"],"Special":[null,"Special"],"cloudsave\u0004No personally identifiable information will be stored in the cloud, and your pass phrase will never leave your browser.":[null,"No personally identifiable information will be stored in the cloud, and your pass phrase will never leave your browser."],"Entry in %s":[null,"Entry in %s"],"within title":[null,"within title"],"Computed by %s":[null,"Computed by %s"],"Look":[null,"Look"],"cloudsave\u0004I forgot my passphrase. Can you recover it?":[null,"I forgot my passphrase. Can you recover it?"],"See also":[null,"See also"],"We drop the clutter.":[null,"We drop the clutter."],"cloudsave\u0004We don't associate your IP address or browser fingerprint or any other information with the file.":[null,"We don't associate your IP address or browser fingerprint or any other information with the file."],"supportus\u0004Support":[null,"Support"],"If you want to use DuckDuckGo without JavaScript, please use our %s or %s versions.":[null,"If you want to use DuckDuckGo without JavaScript, please use our %s or %s versions."],"Would you like to help develop the platform?":[null,"Would you like to help develop the platform?"],"Bookmarklet and settings data":[null,"Bookmarklet and settings data"],"cloudsave\u0004Enable cloud save by enter your existing passphrase.":[null,"Enable cloud save by enter your existing passphrase."],"newbang\u0004Site name":[null,"Site name"],"related topics":[null,"related topics"],"Results by %s":[null,"Results by %s"],"Reset all settings to defaults":[null,"Reset all settings to defaults"],"More about us...":[null,"More about us..."],"Source:":[null,"Source:"],"Search DuckDuckGo":[null,"Search DuckDuckGo"],"Did you mean %s?":[null,"Did you mean %s?"],"%s shipment tracking":[null,"%s shipment tracking"],"Show all":[null,"Show all"],"cloudsave\u0004You can store several sets of settings for different purposes.":[null,"You can store several sets of settings for different purposes."],"newbang\u0004If you'd like to add or edit a %s, please %s!":[null,"If you'd like to add or edit a %s, please %s!"],"hackus\u0004Hack":[null,"Hack"],"Light green":[null,"Light green"],"optional":[null,"optional"],"cloudsave\u0004You can do this by saving your settings under a different passphrase, optionally deleting the first set.":[null,"You can do this by saving your settings under a different passphrase, optionally deleting the first set."],"setting\u0004Just hide legend":[null,"Just hide legend"],"Load Cloud Settings":[null,"Load Cloud Settings"],"New Window:":[null,"New Window:"],"Muted red":[null,"Muted red"],"syntax":[null,"syntax"],"Please choose a color:":[null,"Please choose a color:"],"Email":[null,"Email"],"setting\u0004Off":[null,"Off"],"newbang\u0004Bang url":[null,"Bang url"],"Hide this legend?":[null,"Hide this legend?"],"See our %s":[null,"See our %s"],"Search result title":[null,"Search result title"],"shortbelieve\u0004%s and %s.":[null,"%s and %s."],"Zero-click Info API":[null,"Zero-click Info API"],"Interface Settings":[null,"Interface Settings"],"Like %s on Facebook":[null,"Like %s on Facebook"],"wedontbubbleyou\u0004We don't %s you.":[null,"We don't %s you."],"More meanings":[null,"More meanings"],"setting\u0004default":[null,"default"],"Region:":[null,"Region:"],"%s is a parked domain (last time we checked).":[null,"%s is a parked domain (last time we checked)."],"Search suggestions":[null,"Search suggestions"],"not %s encoding":[null,"no %s encoding"],"Sidebar:":[null,"Sidebar:"],"Share on %s":[null,"Share on %s"],"Dropdown:":[null,"Dropdown:"],"domain search":[null,"domain search"],"bangcat\u0004Entertainment":[null,"Entertainment"],"Have a question about DuckDuckGo?":[null,"Have a question about DuckDuckGo?"],"searchbox\u0004DuckDuckGo is a search engine that protects privacy and has lots of features.":[null,"DuckDuckGo is a search engine that protects privacy and has lots of features."],"zci-product\u0004track":[null,"track"],"Intense green":[null,"Intense green"],"A string to identify the source.":[null,"A string to identify the source."],"Text link:":[null,"Text link:"],"newbang\u0004Bang command":[null,"Bang command"],"Feedback / Question / Suggestion / Problem:":[null,"Feedback / Question / Suggestion / Problem:"],"cloudsave\u0004How do I change my passphrase?":[null,"How do I change my passphrase?"],"Safe search filtered 0-click info for %s":[null,"Safe search filtered 0-click info for %s"],"Page #s:":[null,"Page #s:"],"Reviews":[null,"Reviews"],"betterinstantanswers\u0004instant answers.":[null,"instant answers."],"Visited links:":[null,"Visited links:"],"cloudsavepassphrase\u0004suggest":[null,"suggest"],"Bang category":[null,"Bang category"],"Load Settings":[null,"Load settings"],"Searches %s using our %s":[null,"Searches %s using our %s"],"Friends don't let friends get tracked.":[null,"Friends don't let friends get tracked."],"Looking for recent announcements?":[null,"Looking for recent announcements?"],"The following required fields were not filled:":[null,"The following required fields were not filled:"],"Embeds:":[null,"Embeds:"],"wedonttrackyou\u0004track":[null,"track"],"cloudsave\u0004Cloud Save":[null,"Cloud Save"],"Alphabetically":[null,"Alphabetically"],"go":[null,"go"],"More":[null,"More"],"Header:":[null,"Header:"],"Get the DuckDuckGo newsletter (monthly).":[null,"Get the DuckDuckGo newsletter (monthly)."],"cloudsave\u0004Enter a new passphrase and click \"%s\". This will save your data under your new passphrase.":[null,"Push \"%s\". This removes the data from the cloud, but it remains in your browser until you click on \"%s\"."],"there was an error.":[null,"there was an error."],"Privacy":[null,"Privacy "],"cloudsave\u0004In the browser, we then select four or five random words from that list, ensuring that it is at least 18-20 characters long.":[null,"In the browser, we then select four or five random words from that list, ensuring that it is at least 18-20 characters long."],"vehicle info":[null,"vehicle info"],"Mark where the search goes with {{{s}}}":[null,"Mark where search goes with {{{s}}}"],"We'd also love to know how you heard about us.":[null,"We'd also love to know how you heard about us."],"supportus\u0004%s us.":[null," \t%s us."],"cloudsave\u0004Push \"%s\". This removes the data from the cloud, but it remains in your browser until you click on \"%s\".":[null,"Push "],"Highlight:":[null,"Highlight:"],"Chat":[null,"Chat"],"Want to develop an instant answer?":[null,"Want to develop an instant answer?"],"DuckDuckGo URL Parameters":[null,"DuckDuckGo URL Parameters"],"Sorry, we can't offer any translation for this page. It is shown here in '%s'.":[null,"Sorry, we can't offer any translation for this page. It is shown here in '%s'."],"map":[null,"map"],"More explanation":[null,"More explanation"],"%s is a zip code in %s":[null,"%s is a zip code in %s"],"No video playback capabilities":[null,"No video playback capabilities"],"click here":[null,"click here"],"Border:":[null,"Border:"],"Offers":[null,"Offers"],"Is someone working on your zero-click plugin?":[null,"Is someone working on your zero-click plugin?"],"next result":[null,"next result"],"Links:":[null,"Links:"],"Get the non-JS version %s":[null,"Get the non-JS version %s"],"cloudsave\u0004It is easier to remember four or five words than 10 random letters and numbers, and far more secure.":[null,"It is easier to remember four or five words than 10 random letters and numbers, and far more secure."],"DuckDuckGo Support Center":[null,"DuckDuckGo Support Center"],"cloudsave\u0004Cloud Save FAQ":[null,"Cloud Save FAQ"],"Some meanings":[null,"Some meanings"],"questions\u0004If you have any questions or concerns, please %s.":[null,"If you have any questions or concerns, please %s."],"Official site":[null,"Official site"],"cloudsave\u0004The cloud save bookmarklet is a URL that automatically enables cloud save.":[null,"The cloud save bookmarklet is a URL that automatically enables cloud save."],"Feedback:":[null,"Feedback:"],"pages":[null,"pages"],"0-click box:":[null,"0-click box:"],"Try: %s":[null,"Try: %s"],"Light blue":[null,"Light blue:"],"Help spread DuckDuckGo (rare emails, <1/mo).":[null,"Help spread DuckDuckGo (rare emails, <1/mo)."],"DuckDuckGo Feedback":[null,"DuckDuckGo Feedback"],"cloudsave\u0004Your passphrase is used to generate a key using the Secure Hash Algorithm known as %s, using a %s bit key.":[null,"Your passphrase is used to generate a key using the Secure Hash Algorithm known as %s, using a %s bit key."],"Save Settings":[null,"Save Settings"],"Try %s":[null,"Try %s"],"placement\u0004Left":[null,"Left"],"Auto-load:":[null,"Auto-load:"],"donttrackus\u0004track":[null,"track"],"Interface":[null,"Interface "],"moreinfo\u0004this help page":[null,"this help page"],"Meanings (disambig):":[null,"Meanings (disambig):"],"%s grouped into sections":[null,"%s grouped into sections"],"wedonttrackyou\u0004We don't %s you.":[null,"We don't %s you."],"bubble":[null,"bubble"],"Feel free to adjust the settings below. Then, just copy and paste the code into your website!":[null,"Feel free to adjust the settings below. Then, just copy and paste the code into your website!\t  "],"Search domain %s":[null,"Search domain %s"],"cloudsave\u0004You can restore your settings after deleting cookies":[null,"You can restore your settings after deleting cookies"],"Most big sites work, e.g. %s (see full list below)":[null,"Most big sites work, e.g. %s (see full list below)"],"Placement:":[null,"Placement"],"Redirect:":[null,"Redirect:"],"DuckDuckGo Bot":[null,"DuckDuckGo Bot"],"useus\u0004Use":[null,"Use"],"Bang url, e.g. %s":[null,"Bang url, e.g. %s"],"Listen":[null,"Listen"],"Link font:":[null,"Link font:"],"Did you mean":[null,"Did you mean"],"Warning! Site could be harmful.":[null,"Warning! Site could be harmful."],"Are you looking for our advanced syntax?":[null,"Are you looking for our advanced syntax?"],"Orange":[null,"Orange"],"Want to share a suggestion with other users?":[null,"Want to share a suggestion with other users?"],"by %s":[null,"by %s"],"cloudsave\u0004No. Unless you deleted your settings, the settings file will still be there but we have no way of associating it with you.":[null,"No. Unless you deleted your settings, the settings file will still be there but we have no way of associating it with you."],"Width:":[null,"Width:"],"Bang command, e.g. %s (usually is domain name, e.g. %s)":[null,"Bang command, e.g. %s (usually is domain name, e.g. %s)"],"Most generic keywords work too, e.g. %s":[null,"Most generic keywords work too, e.g. %s"],"DuckDuckGo New !Bang":[null,"DuckDuckGo New !Bang"],"Shortcuts":[null,"Shortcuts"],"More Related Topics":[null,"More Related Topics"],"size\u0004Larger":[null,"Larger"],"Search ideas":[null,"Search ideas"],"Underline:":[null,"Underline:"],"share this":[null,"share this"],"Try search on":[null,"Try search on"],"or write out the font you want":[null,"or write out the font you want"],"%s for %s":[null,"%s for %s"],"Submit":[null,"Submit"],"Whoops! The feedback form is empty!":[null,"Whoops! The feedback form is empty!"],"Contact Us":[null,"Contact Us"],"snippet text":[null,"snippet text"],"Your settings as a URL parameter bookmarklet:":[null,"Your settings as a URL parameter bookmarklet:"],"Monthly newsletter:":[null,"Monthly newsletter:"],"cloudsave\u0004Save your settings anonymously in the cloud!":[null,"Save your settings anonymously in the cloud!"],"Privacy Settings":[null,"Privacy Settings"],"Curious about the company?":[null,"Curious about the company?"],"Address bar:":[null,"Address bar:"],"Get the non-JS version":[null,"Get the non-JS version"],"nonjsversion\u0004here":[null,"here"],"setting\u0004Show full legend":[null,"Show full legend"],"Try DuckDuckGo for a week!":[null,"Try DuckDuckGo for a week!"],"twitter\u0004Follow %s":[null,"Follow %s"],"This page requires %s":[null,"This page requires %s"],"To introduce people to DuckDuckGo, you can use:":[null,"To introduce people to DuckDuckGo, you can use:"],"Text:":[null,"Text:"],"New %s suggestions?":[null,"New %s suggestions?"],"Technical":[null,"Technical"],"width\u0004Normal":[null,"Normal"],"What does this mean?":[null,"What does this mean? "],"White":[null,"White"],"Result Settings":[null,"Result Settings"],"permanently":[null,"permanently"],"%d disc":["%d discs","%d disc","%d discs"],"size\u0004Largest":[null,"Largest"],"%s is an area code in %s":[null,"%s is an area code in %s"],"We call these commands %s, and this syntax works for 100s of sites:":[null,"We call these commands %s, and this syntax works for 100s of sites:\t  "],"cloudsave\u0004We do not have usernames and we don't store any personally identifiable information.":[null,"We do not have usernames and we don't store any personally identifiable information.\t "],"questions\u0004let us know":[null,"let us know"],"newbang\u0004here":[null,"here"],"privacy policy":[null,"privacy policy"],"Help":[null,"Help"],"Color Settings":[null,"Color Settings"],"Just use this dropdown next to the search box. As you use it, your most frequented sites will automatically be displayed at the top.":[null,"Just use this dropdown next to the search box. As you use it, your most frequented sites will automatically be displayed at the top."],"Choose Subcategory":[null,"Choose Subcategory"],"cloudsave\u0004DuckDuckGo does not ever know your passphrase.":[null,"DuckDuckGo does not ever know your passphase."],"webelieve\u0004We believe in %s and %s at the same time.":[null,"We believe in %s and %s at the same time."],"Email:":[null,"Email:"],"bangcat\u0004Tech":[null,"Tech"],"Set as Homepage":[null,"Set as Homepage"],"News":[null,"News"],"Show pass phrase":[null,"Show pass phrase"],"cloudsave\u0004Only the settings that you have changed. They are detailed on the %s page.":[null,"Only the settings that you have changed. They are detailed on the %s page."],"DuckDuckGo Goodies":[null,"DuckDuckGo Goodies"],"tonsgoodies\u0004tons of goodies":[null,"tons of goodies"],"built with %s":[null,"built with %s"],"Top %d Best Websites of %d.":[null,"Top %d Best Websites of %d."],"Or try %s":[null,"Or try %s"],"Twitter:":[null,"Twitter:"],"Look & Feel Settings":[null,"Look & Feel Settings"],"URLs:":[null,"URLs:"],"bangcat\u0004Shopping":[null,"Shopping"],"Direct link to your settings in the cloud":[null,"Direct link to your settings in the cloud"],"Distinguishes itself with a %s policy":[null,"Distinguishes itself with a %s policy"],"translateus\u0004%s us.":[null,"%s us."],"search amazon":[null,"search amazon"],"Team Duck":[null,"Team Duck "],"random password":[null,"random password"],"Yes":[null,"Yes"],"(see the %s page for detailed descriptions)":[null,"(see the %s page for detailed descriptions)"],"setting\u0004On & floating":[null,"On & floating"],"%s is a phone number in %s":[null,"%s is a phone number in %s"],"Economy and Finance":[null,"Economy and Finance"],"setting\u0004On but no numbers":[null,"O but no numbers"],"cloudsave\u0004Is deleted data really deleted?":[null,"Is deleted data really deleted?"],"cloudsave\u0004We save the settings file on Amazon S3 using the generated key as the name.":[null,"We save the settings file on Amazon S3 using the generated key as the name."],"Grey":[null,"Grey"],"Preview":[null,"Preview"],"More results":[null,"More results"],"HTTPS:":[null,"HTTPS"],"Related topics":[null,"Related topics"],"You can change %s via URL parameters by adding them after the search query, for example:":[null,"You can change %s via URL parameters by adding them after the search query, for example:"],"Add to Browser":[null,"Add to Browser"],"setting\u0004On & scrolling":[null,"On & scrolling"],"Load/Reset":[null,"Load/Reset"],"Follow %s on Twitter":[null,"Follow %s on Twitter"],"DuckDuckGo has better instant answers, less spam and clutter, and real privacy.":[null,"DuckDuckGo has better instant answers, less spam and clutter, and real privacy."],"Doodles? Yes, %s!":[null,"Doodles? Yes, %s!"],"No results.":[null,"No results"],"Site has good reputation.":[null,"Site has good reputation."],"Disable":[null,"Disable"],"size\u0004Large":[null,"Large"],"Your IP address is %s":[null,"Your IP address is %s"],"Partner? %s.":[null,"Partner? %s."],"This page requires Javascript to function.":[null,"This page requires Javascript to function."],"first result":[null,"first result"],"Pink":[null,"Pink"],"album":[null,"album"],"oneofmanyspread\u0004support DuckDuckGo":[null,"support DuckDuckGo"],"Press? %s.":[null,"Press? %s."],"cloudsave\u0004Cloud Save lets you save your settings more permanently by entering a passphrase. It is entirely optional.":[null,"Cloud Save lets you save your settings more permanently by entering a passphrase. It is entirely optional."],"%s will run a search with safe search off.":[null,"%s will run a search with safe search off."],"search too long":[null,"search too long"],"Feedback":[null,"Feedback"],"What is this?":[null,"What is this?"],"main results":[null,"main results"],"PRIVACY":[null,"PRIVACY"],"sort by date":[null,"sort by date "],"pay":[null,"pay"],"Care to help translate DuckDuckGo into your language?":[null,"Care to help translate DuckDuckGo into your language?"],"Get Web links":[null,"Get Web links"],"Library":[null,"Library"],"find files":[null,"find files"],"Favicons:":[null,"Favicons:"],"Safe Search:":[null,"Safe Search:"],"wedontbubbleyou\u0004filter bubble":[null,"filter bubble"],"width\u0004Wide":[null,"Wide"],"within body":[null,"within body"],"Black":[null,"Black"],"oneofmanyspread\u0004spread DuckDuckGo":[null,"spread DuckDuckGo"],"cloudsave\u0004Even if you could do that, there is no point since all the information is there in the open, unencrypted, provided you know the key.":[null,"Even if you could do that, there is no point since all the information is there in the open, unencrypted, provided you know the key."],"Your browser cookies:":[null,"Your browser cookies:"],"Perhaps you've heard about us in %s":[null,"Perhaps you've heard about us in %s"],"Intense red":[null,"Intense red"],"%s is in %s":[null,"%s is in %s"],"Ads via %s":[null,"Ads via %s"],"cloudsave\u0004The benefit of this over using the URL parameters bookmarklet is that when you change settings, they will automatically be saved in the cloud.":[null,"The benefit of this over using the URL parameters bookmarklet is that when you change settings, they will automatically be saved in the cloud."],"Community Platform":[null,"Community Platform"],"URL Parameters":[null,"URL Parameters"],"By category":[null,"By category"],"shortbelieve\u0004no tracking":[null,"no tracking"],"Enter your pass phrase to load your settings from the cloud.":[null,"Enter your pass phrase to load your settings from the cloud.\t  "],"Results":[null,"resultados"],"duckco\u0004%s Forum":[null,"%s Forum"],"DuckDuckGo settings":[null,"DuckDuckGo settings"],"newbang\u0004Submit them %s.":[null,"Submit them %s."],"Plugin suggestions?":[null,"Plugin suggestions?"],"cloudsave\u0004How is it anonymous?":[null,"How is it anonymous?"],"cloudsave\u0004In the interest of transparency, this data is not encrypted: you can see exactly what information we store.":[null,"In the interest of transparency, this data is not encrypted: you can see exactly what information we store."],"hackus\u0004%s us.":[null,"%s us."],"no search":[null,"no search"],"put search terms here":[null,"put search terms here"],"COMMUNITY":[null,"COMMUNITY"],"setting\u0004a particular username, e.g. %s":[null,"a particular username, e.g. %s"],"we have those, too":[null,"we have those, too"],"turn off region":[null,"turn off region"],"random":[null,"random"],"Safe search is on. No safe search results.":[null,"Safe search is on. No safe search results."],"duckduckbot\u0004DuckDuckBot is the Web crawler for %s. It respects %s and originates from these IP addresses:":[null,"DuckDuckBot is the Web crawler for %s. It respects %s and originates from these IP addresses:"],"Or you can type in a command like '%s bags', which will take you to %s and auto-search it for 'bags'.":[null,"Or you can type in a command like '%s bags', which will take you to %s and auto-search it for 'bags'."],"schwag":[null,"schwag"],"useus\u0004%s us.":[null,"%s us."],"newbang\u0004submit it here":[null,"submit it here"],"Site name, e.g. %s or %s":[null,"Site name, e.g. %s or %s"],"shortbelieve\u0004Goodies":[null,"Goodies"],"Want to integrate DuckDuckGo with your browser?":[null,"Want to integrate DuckDuckGo with your browser?"],"tonsgoodies\u0004We have %s.":[null,"We have %s."],"Safe search filtered your search to %s":[null,"Safe search filtered your search to %s"],"cloudsave\u0004Cloud Save discussion on %s":[null,"Cloud Save discussion on %s"],"Goodies":[null,"Goodies"],"All Settings":[null,"All Settings"],"new tab":[null,"new tab"],"setting\u0004Off & centered":[null,"Off & centered"],"cloudsave\u0004What is the cloud save bookmarklet and how does it differ from the URL parameter bookmarklet?":[null,"What is the cloud save bookmarklet and how does it differ from the URL parameter bookmarklet?"],"Developer? Check out %s.":[null,"Developer? Check out %s."],"setting\u0004Just hide \"%s\"":[null,"Just hide "],"Subcategory":[null,"Subcategory"],"temporarily":[null,"temporarily"],"About":[null,"About"],"Supporter? %s.":[null,"Supporter? %s."],"Search Box":[null,"Search Box"],"width\u0004Super wide":[null,"Super wide"],"We do not track or bubble you!":[null,"We do not track or bubble you!"],"DuckDuckGo Instant Answer API":[null,"DuckDuckGo Instant Answer API"],"DuckDuckGo Help":[null,"DuckDuckGo Help"],"webelieve\u0004real privacy":[null,"real privacy"],"No correct topic? Try web links...":[null,"No correct topic? Try web links..."],"Subject:":[null,"Subject:"],"Help Pages":[null,"Help Pages"],"webelieve\u0004no tracking":[null,"not tracking"],"Add a %s search box to your site!":[null,"Add a %s search box to your site!"],"Your settings in %s format:":[null,"Your settings in %s format:"],"See Also":[null,"See Also"],"cloudsave\u0004Your passphrase never leaves the browser, only the key and the settings file associated with it.":[null,"Your passphrase never leaves the browser, only the key and the settings file associated with it."],"Other uses":[null,"Other uses"],"Purple":[null,"Purple"],"bangcat\u0004Research":[null,"Research"],"Top links:":[null,"Top links:"],"Meanings":[null,"Meanings"],"Ignore this box please":[null,"Ignore this box please"],"Pass phrase strength":[null,"Pass phrase strength"],"Yellow":[null,"Yellow"],"bangcat\u0004Online Services":[null,"Online Services"],"Dictionary":[null,"Dictionary"],"uk region":[null,"uk region"],"Support":[null,"Support"],"DuckDuckGo Privacy":[null,"DuckDuckGo Privacy"],"By default, your settings are stored in non-personal browser cookies (in your browser).":[null,"By default, your settings are stored in non-personal browser cookies (in your browser)."],"Images":[null,"Images"],"setting\u0004On":[null,"On"],"shipment tracking":[null,"shipment tracking"],"I'm feeling ducky":[null,"I'm feeling ducky"],"Blue":[null,"Blue"],"Forum":[null,"Forum"],"Web links":[null,"Web links"],"Add to %s":[null,"Add to %s"],"More related topics":[null,"More related topics"],"We don't %s or %s you!":[null,"We don't %s or %s you! "],"cloudsave\u0004Each time you ask for a passphrase suggestion, we get a reasonably large list of random words from the DuckDuckGo servers.":[null,"Each time you ask for a passphrase suggestion, we get a reasonably large list of random words from the DuckDuckGo servers."],"disambiguation":[null,"disambiguation"],"Background:":[null,"Background:"],"cloudsave\u0004How does it work?":[null,"How does it work?"],"hide this FAQ":[null,"hide this FAQ"],"Your settings as a cloud save bookmarklet:":[null,"Your settings as a cloud save bookmarklet:"],"Green":[null,"Green"],"dropdown":[null,"dropdown"],"DuckDuckGo enables you to search 100s of other sites directly.":[null,"DuckDuckGo enables you to search 100s of other sites directly."],"Instant Answer API":[null,"Instant Answer API"],"%s at %s":[null,"%s at %s"],"Map":[null,"Map"],"newbang\u0004New %s":[null,"New %s"],"cloudsave\u0004How does passphrase generation work?":[null,"How does passphrase generation work?"],"Settings":[null,"Settings"],"Sort by date":[null,"Sort by date"],"Regular search box":[null,"Regular search box"],"More links":[null,"More links"],"placement\u0004Middle":[null,"Middle"],"Shortcuts:":[null,"Shortcuts:"],"prev result":[null,"prev result"],"size\u0004Medium":[null,"Medium"],"Searching for info on our XMPP chat service?":[null,"Searching for info on our XMPP chat service?"],"More Links":[null,"More Links\t"],"cloudsave\u0004What information gets saved?":[null,"What information gets saved?"],"'%s' or '%s' or '%s' will take you to the first result.":[null,"'%s' or '%s' or '%s' will take you to the first result."],"Off-white":[null,"Off-white"],"Keyboard shortcuts":[null,"Keyboard shortcuts"],"Policy":[null,"Policy"],"cloudsave\u0004This has a few benefits:":[null,"This has a few benefits:"],"oneofmanyspread\u0004One of many ways to help %s":[null,"One of the many ways to help %s"],"Category":[null,"Category"],"Reverse search":[null,"Reverse search"],"Choose Category":[null,"Choose Category"],"Platform":[null,"Platform"],"or write out the color code you want, e.g. %s (%s is an encoded %s char).":[null,"or write out the color code you want, e.g. %s (%s is an encoded %s char)."],"Some topics grouped into %s":[null,"Some topics grouped into %s"],"Delete my data":[null,"Delete my data"],"bangcat\u0004News":[null,"News"],"More at %s":[null,"More at %s"],"Advertisements:":[null,"Advertisements:"],"cloudsave\u0004We cannot reverse the passphrase key generation.":[null,"We cannot reverse the passphrase key generation.\t "],"Our favorite alternative search engine, DuckDuckGo":[null,"Our favorite alternate search engine, DuckDuckGo"],"More topics":[null,"More topics"],"Spread":[null,"Spread"],"Tan":[null,"Tan"],"Show details of your settings including bookmarklet":[null,"Show details of your settings including bookmarklet"],"There are also shorter versions, e.g. %s":[null,"There are shorter versions, e.g. %s"],"DDG Topics List":[null,"DDG Topics List"],"and %s":[null,"and %s"],"uses results from %s":[null,"uses results from %s"],"Support Us":[null,"Support Us"],"webelieve\u0004better search":[null,"better search"],"setting\u0004username":[null,"username"],"Colors":[null,"colores"],"Internet privacy updates (not just about us).":[null,"Internet privacy updates (not just about us)."],"link to the site":[null,"link to the site"],"We believe you can get better search AND real privacy at the same time. That's why:":[null,"We believe you can get better search AND real privacy at the same time. That's why:\t  "],"%s is a %s":[null,"%s is a %s"],"Sponsored link":[null,"Sponsored link"],"Comments":[null,"Comments"],"Red":[null,"Red"],"Give feedback":[null,"Give feedback"],"Less spam and clutter.":[null,"Less spam and clutter."],"translateus\u0004Translate":[null,"Translate"],"email address":[null,"email address"],"Hide feedback icon?":[null,"Hide feedback icon?"],"Help? Check out %s.":[null,"Help? Check out %s."],"from %s":[null,"from %s"],"cloudsave\u0004Passphrases cannot feasibly be reverse engineered from a key":[null,"Passphrase cannot feasibly be reversed engineered from a key"],"Size:":[null,"Size:"],"Top":[null,"Top"],"bangcat\u0004Multimedia":[null,"Multimedia"],"Develop":[null,"Develop"],"webelieve\u0004%s believe in %s and %s.":[null,"%s believe in %s and %s."],"Please try again":[null,"Please try again"],"DuckDuckGo Search Box":[null,"DuckDuckG Search Box"],"Search syntax":[null,"Search syntax"],"a pure search engine %s and its use is soaring":[null,"a pure search engine %s and its use is soaring"],"Help test new features (rare emails, <1/mo).":[null,"Help test new features (rare emails, <1/mo)."],"URL Params":[null,"URL Params"],"Text font:":[null,"Text font:"],"setting\u0004On but don't save":[null,"On but don't save"],"DuckDuckGo Zero-click Info API":[null,"DuckDuckGo Zero-click Info API"],"Add-ons":[null,"Add-ons"],"Could DuckDuckGo Be The Biggest Long-Term Threat To Google?":[null,"Could DuckDuckGo be the Biggest Long-Term Threat To Google?"],"DuckDuckGo Settings":[null,"DuckDuckGo Settings"],"moreinfo\u0004See %s for more info.":[null,"See %s for more info."],"Try to go there":[null,"Try to go there"],"book":[null,"book"]};ltd('duckduckgo-duckduckgo');