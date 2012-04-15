/* Copyright (C) 2007 reCAPTCHA. Please contact us if you are thinking of modifying & hosting this file. */

var RecaptchaTemplates = {VertHtml:'<table id="recaptcha_table" class="recaptchatable" >\n<tr>\n<td colspan="6" class=\'recaptcha_r1_c1\'></td>\n</tr>\n<tr>\n<td class=\'recaptcha_r2_c1\'></td>\n<td colspan="4" class=\'recaptcha_image_cell\'><div id="recaptcha_image"></div></td>\n<td class=\'recaptcha_r2_c2\'></td>\n</tr>\n<tr>\n<td rowspan="6" class=\'recaptcha_r3_c1\'></td>\n<td colspan="4" class=\'recaptcha_r3_c2\'></td>\n<td rowspan="6" class=\'recaptcha_r3_c3\'></td>\n</tr>\n<tr>\n<td rowspan="3" class=\'recaptcha_r4_c1\' height="49">\n<div class="recaptcha_input_area">\n<label for="recaptcha_response_field" class="recaptcha_input_area_text"><span id="recaptcha_instructions_image" class="recaptcha_only_if_image recaptcha_only_if_no_incorrect_sol"></span><span id="recaptcha_instructions_audio" class="recaptcha_only_if_no_incorrect_sol recaptcha_only_if_audio"></span><span id="recaptcha_instructions_error" class="recaptcha_only_if_incorrect_sol"></span></label><br/>\n<input name="recaptcha_response_field" id="recaptcha_response_field" type="text" />\n</div>\n</td>\n<td rowspan="4" class=\'recaptcha_r4_c2\'></td>\n<td><a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="17" /></a></td>\n<td rowspan="4" class=\'recaptcha_r4_c4\'></td>\n</tr>\n<tr>\n<td><a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="16" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="16" alt=""/></a></td>\n</tr>\n<tr>\n<td><a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a></td>\n</tr>\n<tr>\n<td class=\'recaptcha_r7_c1\'></td>\n<td class=\'recaptcha_r8_c1\'></td>\n</tr>\n</table>\n',VertCss:'.recaptchatable td img {\n/* see http://developer.mozilla.org/en/docs/Images%2C_Tables%2C_and_Mysterious_Gaps */\ndisplay: block;\n}\n.recaptchatable .recaptcha_r1_c1 { background: url(IMGROOT/sprite.png) -0px -63px no-repeat; width: 318px; height: 9px; }\n.recaptchatable .recaptcha_r2_c1 { background: url(IMGROOT/sprite.png) -18px -0px no-repeat; width: 9px; height: 57px; }\n.recaptchatable .recaptcha_r2_c2 { background: url(IMGROOT/sprite.png) -27px -0px no-repeat; width: 9px; height: 57px; }\n.recaptchatable .recaptcha_r3_c1 { background: url(IMGROOT/sprite.png) -0px -0px no-repeat; width: 9px; height: 63px; }\n.recaptchatable .recaptcha_r3_c2 { background: url(IMGROOT/sprite.png) -18px -57px no-repeat; width: 300px; height: 6px; }\n.recaptchatable .recaptcha_r3_c3 { background: url(IMGROOT/sprite.png) -9px -0px no-repeat; width: 9px; height: 63px; }\n.recaptchatable .recaptcha_r4_c1 { background: url(IMGROOT/sprite.png) -43px -0px no-repeat; width: 171px; height: 49px; }\n.recaptchatable .recaptcha_r4_c2 { background: url(IMGROOT/sprite.png) -36px -0px no-repeat; width: 7px; height: 57px; }\n.recaptchatable .recaptcha_r4_c4 { background: url(IMGROOT/sprite.png) -214px -0px no-repeat; width: 97px; height: 57px; }\n.recaptchatable .recaptcha_r7_c1 { background: url(IMGROOT/sprite.png) -43px -49px no-repeat; width: 171px; height: 8px; }\n.recaptchatable .recaptcha_r8_c1 { background: url(IMGROOT/sprite.png) -43px -49px no-repeat; width: 25px; height: 8px; }\n.recaptchatable .recaptcha_image_cell center img { height:57px;}\n.recaptchatable .recaptcha_image_cell center { height:57px;}\n.recaptchatable .recaptcha_image_cell {\nbackground-color:white; height:57px;\n}\n/* some people break their style sheet, we need to clean up after them */\n#recaptcha_area, #recaptcha_table {\nwidth: 318px !important;\n}\n.recaptchatable, #recaptcha_area tr, #recaptcha_area td, #recaptcha_area th {\nmargin:0px !important;\nborder:0px !important;\npadding:0px !important;\nborder-collapse: collapse !important;\nvertical-align: middle !important;\n}\n.recaptchatable * {\nmargin:0px;\npadding:0px;\nborder:0px;\nfont-family:helvetica,sans-serif;\nfont-size:8pt;\ncolor:black;\nposition:static;\ntop:auto;\nleft:auto;\nright:auto;\nbottom:auto;\ntext-align:left !important;\n}\n.recaptchatable #recaptcha_image {\nmargin:auto;\n}\n.recaptchatable img {\nborder:0px !important;\nmargin:0px !important;\npadding:0px !important;\n}\n.recaptchatable a, .recaptchatable a:hover {\n-moz-outline:none;\nborder:0px !important;\npadding:0px !important;\ntext-decoration:none;\ncolor:blue;\nbackground:none !important;\nfont-weight: normal;\n}\n.recaptcha_input_area {\nposition:relative !important;\nwidth:146px !important;\nheight:45px !important;\nmargin-left:20px !important;\nmargin-right:5px !important;\nmargin-top:4px !important;\nbackground:none !important;\n}\n.recaptchatable label.recaptcha_input_area_text {\nmargin:0px !important;  \npadding:0px !important;\nposition:static !important;\ntop:auto !important;\nleft:auto !important;\nright:auto !important;\nbottom:auto !important;\nbackground:none !important;\nheight:auto !important;\nwidth:auto !important;\n}\n.recaptcha_theme_red label.recaptcha_input_area_text,\n.recaptcha_theme_white label.recaptcha_input_area_text {\ncolor:black !important;\n}\n.recaptcha_theme_blackglass label.recaptcha_input_area_text {\ncolor:white !important;\n}\n.recaptchatable #recaptcha_response_field  {\nwidth:145px !important;\nposition:absolute !important;\nbottom:7px !important;\npadding:0px !important;\nmargin:0px !important;\nfont-size:10pt;\n}\n.recaptcha_theme_blackglass #recaptcha_response_field,\n.recaptcha_theme_white #recaptcha_response_field {\nborder: 1px solid gray;\n}\n.recaptcha_theme_red #recaptcha_response_field {\nborder:1px solid #cca940;\n}\n.recaptcha_audio_cant_hear_link {\nfont-size:7pt;\ncolor:black;\n}\n.recaptchatable {\nline-height:1em;\n}\n#recaptcha_instructions_error {\ncolor:red !important;\n}\n',CleanHtml:'<table id="recaptcha_table" class="recaptchatable">\n<tr height="73">\n<td class=\'recaptcha_image_cell\' width="302"><center><div id="recaptcha_image"></div></center></td>\n<td style="padding: 10px 7px 7px 7px;">\n<a id=\'recaptcha_reload_btn\'><img id=\'recaptcha_reload\' width="25" height="18" alt="" /></a>\n<a id=\'recaptcha_switch_audio_btn\' class="recaptcha_only_if_image"><img id=\'recaptcha_switch_audio\' width="25" height="15" alt="" /></a><a id=\'recaptcha_switch_img_btn\' class="recaptcha_only_if_audio"><img id=\'recaptcha_switch_img\' width="25" height="15" alt=""/></a>\n<a id=\'recaptcha_whatsthis_btn\'><img id=\'recaptcha_whatsthis\' width="25" height="16" /></a>\n</td>\n<td style="padding: 18px 7px 18px 7px;">\n<img id=\'recaptcha_logo\' alt="" width="71" height="36" />\n</td>\n</tr>\n<tr>\n<td style="padding-left: 7px;">\n<div class="recaptcha_input_area" style="padding-top: 2px; padding-bottom: 7px;">\n<input style="border: 1px solid #3c3c3c; width: 302px;" name="recaptcha_response_field" id="recaptcha_response_field" type="text" />\n</div>\n</td>\n<td></td>\n<td style="padding: 4px 7px 12px 7px;">\n<img id="recaptcha_tagline" width="71" height="17" />\n</td>\n</tr>\n</table>\n',CleanCss : '.recaptchatable td img {\ndisplay: block;\n}\n.recaptchatable .recaptcha_image_cell center img { height:57px;}\n.recaptchatable .recaptcha_image_cell center { height:57px;}\n.recaptchatable .recaptcha_image_cell {\nbackground-color:white; height:57px; \npadding: 7px !important;\n}\n.recaptchatable, #recaptcha_area tr, #recaptcha_area td, #recaptcha_area th {\nmargin:0px !important;\nborder:0px !important;\nborder-collapse: collapse !important;\nvertical-align: middle !important;\n}\n.recaptchatable * {\nmargin:0px;\npadding:0px;\nborder:0px;\ncolor:black;\nposition:static;\ntop:auto;\nleft:auto;\nright:auto;\nbottom:auto;\ntext-align:left !important;\n}\n.recaptchatable #recaptcha_image {\nmargin:auto;\nborder: 1px solid #dfdfdf !important;\n}\n.recaptchatable a img {\nborder:0px;\n}\n.recaptchatable a, .recaptchatable a:hover {\n-moz-outline:none;\nborder:0px !important;\npadding:0px !important;\ntext-decoration:none;\ncolor:blue;\nbackground:none !important;\nfont-weight: normal;\n}\n.recaptcha_input_area {\nposition:relative !important;\nbackground:none !important;\n}\n.recaptchatable label.recaptcha_input_area_text {\nborder:1px solid #dfdfdf !important;\nmargin:0px !important;  \npadding:0px !important;\nposition:static !important;\ntop:auto !important;\nleft:auto !important;\nright:auto !important;\nbottom:auto !important;\n}\n.recaptcha_theme_red label.recaptcha_input_area_text,\n.recaptcha_theme_white label.recaptcha_input_area_text {\ncolor:black !important;\n}\n.recaptcha_theme_blackglass label.recaptcha_input_area_text {\ncolor:white !important;\n}\n.recaptchatable #recaptcha_response_field  {\nfont-size:11pt;\n}\n.recaptcha_theme_blackglass #recaptcha_response_field,\n.recaptcha_theme_white #recaptcha_response_field {\nborder: 1px solid gray;\n}\n.recaptcha_theme_red #recaptcha_response_field {\nborder:1px solid #cca940;\n}\n.recaptcha_audio_cant_hear_link {\nfont-size:7pt;\ncolor:black;\n}\n.recaptchatable {\nline-height:1em;\nborder: 1px solid #dfdfdf !important;\n}\n.recaptcha_error_text {\ncolor:red;\n}\n'};
var RecaptchaStr_en = {
visual_challenge : "Get a visual challenge",
audio_challenge : "Get an audio challenge",
refresh_btn : "Get a new challenge",
instructions_visual : "Type the two words:",
instructions_audio : "Type what you hear:",
help_btn : "Help",
play_again : "Play sound again",
cant_hear_this : "Download sound as MP3",
incorrect_try_again : "Incorrect. Try again."
};
var RecaptchaStr_de = {
visual_challenge : "Visuelle Aufgabe generieren",
audio_challenge : "Audio-Aufgabe generieren",
refresh_btn : "Neue Aufgabe generieren",
instructions_visual : "Gib die 2 W\u00f6rter ein:",
instructions_audio : "Gib die 8 Ziffern ein:",
help_btn : "Hilfe",
incorrect_try_again: "Falsch. Nochmals versuchen!"
};
var RecaptchaStr_es = {
visual_challenge : "Obt\u00e9n un reto visual",
audio_challenge : "Obt\u00e9n un reto audible",
refresh_btn : "Obt\u00e9n un nuevo reto",
instructions_visual : "Escribe las 2 palabras:",
instructions_audio : "Escribe los 8 n\u00fameros:",
help_btn : "Ayuda",
incorrect_try_again: "Incorrecto. Otro intento."
};
var RecaptchaStr_fr = {
visual_challenge : "D\u00e9fi visuel",
audio_challenge : "D\u00e9fi audio",
refresh_btn : "Nouveau d\u00e9fi",
instructions_visual : "Entrez les deux mots:",
instructions_audio : "Entrez les huit chiffres:",
help_btn : "Aide",
incorrect_try_again: "Incorrect."
};
var RecaptchaStr_nl = {
visual_challenge : "Test me via een afbeelding",
audio_challenge : "Test me via een geluidsfragment",
refresh_btn : "Nieuwe uitdaging",
instructions_visual : "Type de twee woorden:",
instructions_audio : "Type de acht cijfers:",
help_btn : "Help",
incorrect_try_again: "Foute invoer."
};
var RecaptchaStr_pt = {
visual_challenge : "Obter um desafio visual",
audio_challenge : "Obter um desafio sonoro",
refresh_btn : "Obter um novo desafio",
instructions_visual : "Escreva as 2 palavras:",
instructions_audio : "Escreva os 8 numeros:",
help_btn : "Ajuda",
incorrect_try_again: "Incorrecto. Tenta outra vez."
};
var RecaptchaStr_ru = {
visual_challenge : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",
audio_challenge : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0437\u0432\u0443\u043a\u043e\u0432\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",
refresh_btn : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",
instructions_visual : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0432\u0430 \u0441\u043b\u043e\u0432\u0430:",
instructions_audio : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u043e\u0441\u0435\u043c\u044c \u0447\u0438\u0441\u0435\u043b:",
help_btn : "\u041f\u043e\u043c\u043e\u0449\u044c",
incorrect_try_again: "\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e."
};
var RecaptchaStr_tr = {
visual_challenge : "G\u00f6rsel deneme",
audio_challenge : "\u0130\u015Fitsel deneme",
refresh_btn : "Yeni deneme",
instructions_visual : "\u0130ki kelimeyi yaz\u0131n:",
instructions_audio : "Sekiz numaray\u0131 yaz\u0131n:",
help_btn : "Yard\u0131m (\u0130ngilizce)",
incorrect_try_again: "Yanl\u0131\u015f. Bir daha deneyin."
};
var RecaptchaLangMap = { 
en: RecaptchaStr_en,
de: RecaptchaStr_de,
es: RecaptchaStr_es,
fr: RecaptchaStr_fr,
nl: RecaptchaStr_nl,
pt: RecaptchaStr_pt,
ru: RecaptchaStr_ru,
tr: RecaptchaStr_tr
};
var RecaptchaStr = RecaptchaStr_en;
var RecaptchaOptions;
var RecaptchaDefaultOptions = {
tabindex: 0,
theme: 'red',
callback: null,
lang: 'en',
custom_theme_widget : null,
custom_translations : null
};
var Recaptcha = {
widget: null,
timer_id: -1,
style_set: false,
theme: null,
type: 'image',
ajax_verify_cb : null,
$: function(id) { 
if (typeof(id) == "string") {
return document.getElementById(id); 
}
else {
return id;
}
},
create: function(public_key, element, options) {
Recaptcha.destroy();
if (element) {
Recaptcha.widget = Recaptcha.$(element);
}
Recaptcha._init_options(options);
Recaptcha._call_challenge(public_key);
},
destroy: function() {
var challengefield = Recaptcha.$('recaptcha_challenge_field');
if (challengefield) {
challengefield.parentNode.removeChild(challengefield);
}
if (Recaptcha.timer_id != -1) {
clearInterval(Recaptcha.timer_id);
}
Recaptcha.timer_id = -1;
var imagearea = Recaptcha.$('recaptcha_image');
if (imagearea) {
imagearea.innerHTML = "";
}
// don't clear the area if it's custom, the caller might want to
// reuse the dom elements.
if (Recaptcha.widget) {
if (Recaptcha.theme != "custom") {
Recaptcha.widget.innerHTML = "";
} else {
Recaptcha.widget.style.display = "none";
}
Recaptcha.widget = null;
}
},
focus_response_field: function() {
var $ = Recaptcha.$;
var field = $('recaptcha_response_field');
field.focus();
},
get_challenge: function() {
if (typeof(RecaptchaState) == "undefined") {
return null;
}
return RecaptchaState.challenge;
},
get_response: function() {
var $ = Recaptcha.$;
var field = $('recaptcha_response_field');
if (!field) {
return null;
}
return field.value;
},
ajax_verify: function(callback) {
Recaptcha.ajax_verify_cb = callback;
var scriptURL = Recaptcha._get_api_server() + "/ajaxverify" +
"?c=" + encodeURIComponent(Recaptcha.get_challenge()) +
"&response=" + encodeURIComponent(Recaptcha.get_response());
Recaptcha._add_script(scriptURL);
},
_ajax_verify_callback : function(data) {
Recaptcha.ajax_verify_cb(data);
},
_get_api_server : function() {
var protocol = window.location.protocol;
var server;
if (typeof(_RecaptchaOverrideApiServer) != "undefined") {
server = _RecaptchaOverrideApiServer;
} else if (protocol == 'https:') {
server = "api-secure.recaptcha.net";
} else {
server = "api.recaptcha.net";
}
return protocol + "//" + server;
},
_call_challenge: function(public_key) {
var scriptURL = Recaptcha._get_api_server() + "/challenge?k=" + public_key + "&ajax=1&cachestop=" + Math.random();
if (typeof(RecaptchaOptions.extra_challenge_params) != "undefined") {
scriptURL += "&" + RecaptchaOptions.extra_challenge_params;
}
Recaptcha._add_script(scriptURL);
},
_add_script: function(scriptURL) {
var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.src = scriptURL;
Recaptcha._get_script_area().appendChild(scriptTag);
},
_get_script_area: function() {
var parentElement = document.getElementsByTagName("head");
if (!parentElement || parentElement.length < 1) {
parentElement = document.body;
}
else {
parentElement = parentElement[0];
}
return parentElement;
},
_hash_merge : function(hashes) {
var r = {};
for (var h in hashes) {
for (var k in hashes[h]) {
r[k] = hashes[h][k]
}
}
return r;
},
_init_options: function(opts) {
RecaptchaOptions = Recaptcha._hash_merge([RecaptchaDefaultOptions, opts || {}]);
},
challenge_callback: function() {
var element = Recaptcha.widget;
Recaptcha._reset_timer ();
RecaptchaStr = Recaptcha._hash_merge([
RecaptchaStr_en,
RecaptchaLangMap[RecaptchaOptions.lang] || {},
RecaptchaOptions.custom_translations || {}]);
/* Try to avoid back/forward cache problems */
// firefox
if (window.addEventListener) {
window.addEventListener('unload', function(e){ Recaptcha.destroy(); }, false );
}
// IE
if (Recaptcha._is_ie() && window.attachEvent) {
window.attachEvent('onbeforeunload', function () {
// I think this may be causing some errors -- it seems
// that sometimes IE isn't submitting the form fully
// This may be breaking the back button functionality
// :-(
//Recaptcha.destroy();
});
}
// safari
if (navigator.userAgent.indexOf("KHTML") > 0) {
var iframe = document.createElement('iframe');
iframe.src = "about:blank";
iframe.style.height = "0px";
iframe.style.width = "0px";
iframe.style.visibility = "hidden";
iframe.style.border = "none";
var textNode = document.createTextNode("This frame prevents back/forward cache problems in Safari.");
iframe.appendChild(textNode);
document.body.appendChild(iframe);
}   
Recaptcha._finish_widget();
},
_add_css : function(css) {
var styleTag = document.createElement("style");
styleTag.type = "text/css";
if (styleTag.styleSheet) { // IE only
if (navigator.appVersion.indexOf("MSIE 5") != -1) { // IE 5 crashes if we add a style tag to the DOM
document.write("<style type='text/css'>" + css + "</style>");
}
else {
styleTag.styleSheet.cssText = css;
}
} else if (navigator.appVersion.indexOf("MSIE 5") != -1) {
document.write("<style type='text/css'>" + css + "</style>");
}
else {
var textNode = document.createTextNode(css);
styleTag.appendChild(textNode);
}
Recaptcha._get_script_area().appendChild(styleTag);
},
_set_style: function(css) {
// We only allow the style to be set once, because IE behaves
// poorly otherwise.  Same goes for Recaptcha.theme.
if (Recaptcha.style_set) {
return;
}
Recaptcha.style_set = true;
Recaptcha._add_css(css + "\n\n" +
".recaptcha_is_showing_audio .recaptcha_only_if_image," + 
".recaptcha_isnot_showing_audio .recaptcha_only_if_audio," +
".recaptcha_had_incorrect_sol .recaptcha_only_if_no_incorrect_sol," +
".recaptcha_nothad_incorrect_sol .recaptcha_only_if_incorrect_sol" +
"{display:none !important}");
},
_init_builtin_theme : function() {
var $ = Recaptcha.$;
var $_ = RecaptchaStr;
var $ST = RecaptchaState;
var css, html, imgfmt;
var server_no_slash = $ST.server;
if (server_no_slash[server_no_slash.length - 1] == "/")
server_no_slash = server_no_slash.substring (0, server_no_slash.length - 1);
var IMGROOT = server_no_slash + "/img/" + Recaptcha.theme;
if (Recaptcha.theme == 'clean') {
css = RecaptchaTemplates.CleanCss;
html = RecaptchaTemplates.CleanHtml;
imgfmt = 'png';
}
else {
css = RecaptchaTemplates.VertCss;
html = RecaptchaTemplates.VertHtml;
imgfmt = 'gif';
}
css = css.replace (/IMGROOT/g, IMGROOT);
Recaptcha._set_style(css);
Recaptcha.widget.innerHTML = "<div id='recaptcha_area'>" + html + "</div>";
$('recaptcha_reload').src = IMGROOT + "/refresh." + imgfmt;
$('recaptcha_switch_audio').src = IMGROOT + "/audio." + imgfmt;
$('recaptcha_switch_img').src = IMGROOT + "/text." + imgfmt;
$('recaptcha_whatsthis').src = IMGROOT + "/help." + imgfmt;
if (Recaptcha.theme == 'clean') {
$('recaptcha_logo').src = IMGROOT + "/logo." + imgfmt;
$('recaptcha_tagline').src = IMGROOT + "/tagline." + imgfmt;
}
$('recaptcha_reload').alt = $_.refresh_btn;
$('recaptcha_switch_audio').alt = $_.audio_challenge;
$('recaptcha_switch_img').alt = $_.visual_challenge;
$('recaptcha_whatsthis').alt = $_.help_btn;
$('recaptcha_reload_btn').href = "javascript:Recaptcha.reload ();";
$('recaptcha_reload_btn').title = $_.refresh_btn;
$('recaptcha_switch_audio_btn').href = "javascript:Recaptcha.switch_type('audio');";
$('recaptcha_switch_audio_btn').title = $_.audio_challenge;
$('recaptcha_switch_img_btn').href = "javascript:Recaptcha.switch_type('image');";
$('recaptcha_switch_img_btn').title = $_.visual_challenge;
$('recaptcha_whatsthis_btn').href = Recaptcha._get_help_link();
$('recaptcha_whatsthis_btn').target = "_blank";
$('recaptcha_whatsthis_btn').title = $_.help_btn;
$('recaptcha_whatsthis_btn').onclick = function () {
Recaptcha.showhelp();
return false; 
};
$('recaptcha_table').className = "recaptchatable " + "recaptcha_theme_" + Recaptcha.theme;
if ($("recaptcha_instructions_image")) {
$("recaptcha_instructions_image").appendChild(document.createTextNode($_.instructions_visual));
}
if ($("recaptcha_instructions_audio")) {
$("recaptcha_instructions_audio").appendChild(document.createTextNode($_.instructions_audio));
}
if ($("recaptcha_instructions_error")) {
$("recaptcha_instructions_error").appendChild(document.createTextNode($_.incorrect_try_again));
}
},
_finish_widget: function() {
var $ = Recaptcha.$;
var $_ = RecaptchaStr;
var $ST = RecaptchaState;
var $OPT = RecaptchaOptions;
var theme = $OPT.theme;
switch (theme) {
case 'red': case 'white': case 'blackglass': case 'clean': case 'custom':
break;
default:
theme = 'red';
break;
}
if (!Recaptcha.theme) {
Recaptcha.theme = theme;
}
if (Recaptcha.theme != "custom") {
Recaptcha._init_builtin_theme();
} else {
// get the rules for audio/visual error/no error
Recaptcha._set_style("");
}
var challengeFieldHolder = document.createElement("span");
challengeFieldHolder.id = "recaptcha_challenge_field_holder";
challengeFieldHolder.style.display = "none";
$('recaptcha_response_field').parentNode.insertBefore(challengeFieldHolder, $('recaptcha_response_field'));
$('recaptcha_response_field').setAttribute("autocomplete", "off");
$('recaptcha_image').style.width = '300px';
$('recaptcha_image').style.height = '57px';
Recaptcha.should_focus = false;
Recaptcha._set_challenge($ST.challenge, 'image');
if ($OPT.tabindex) {
$('recaptcha_response_field').tabIndex = $OPT.tabindex;
if (Recaptcha.theme != "custom") {
$('recaptcha_whatsthis_btn').tabIndex = $OPT.tabindex;
$('recaptcha_switch_img_btn').tabIndex = $OPT.tabindex;
$('recaptcha_switch_audio_btn').tabIndex = $OPT.tabindex;
$('recaptcha_reload_btn').tabIndex = $OPT.tabindex;
}
}
if (Recaptcha.widget) {
Recaptcha.widget.style.display = '';
}
if ($OPT.callback) {
$OPT.callback();
}
},
switch_type : function (new_type) {
var $C = Recaptcha;
$C.type = new_type;
$C.reload ($C.type == 'audio' ? 'a' : 'v');
},
reload: function (reason) {
var $C = Recaptcha;
var $ = $C.$;
var $ST = RecaptchaState;
if (typeof(reason) == "undefined")
reason = 'r';
var scriptURL = $ST.server + "reload?c=" + $ST.challenge + "&k=" + $ST.site + "&reason=" + reason + "&type=" + $C.type + "&lang=" + RecaptchaOptions.lang;
if (typeof(RecaptchaOptions.extra_challenge_params) != "undefined") {
scriptURL += "&" + RecaptchaOptions.extra_challenge_params;
}
if ($C.type == 'audio') {
if (RecaptchaOptions.audio_beta_12_08) {
scriptURL += "&audio_beta_12_08=1";
} else {
scriptURL += "&new_audio_default=1";
}
}
$C.should_focus = reason != 't';
$C._add_script(scriptURL);
},
finish_reload: function(new_challenge, type) {
RecaptchaState.is_incorrect = false;
Recaptcha._set_challenge(new_challenge, type);
},
_set_challenge: function (new_challenge, type) 
{
var $C = Recaptcha;
var $ST = RecaptchaState;
var $ = $C.$;
$ST.challenge = new_challenge;
// this should really be the case already...
$C.type = type;
// using innerHTML prevents back/forward from caching this
$('recaptcha_challenge_field_holder').innerHTML = "<input type='hidden' name='recaptcha_challenge_field' id='recaptcha_challenge_field' value='" + $ST.challenge + "'/>";
if (type == 'audio') {
$("recaptcha_image").innerHTML = Recaptcha.getAudioCaptchaHtml();
} else if (type == 'image') {
var imageurl = $ST.server + 'image?c=' + $ST.challenge;
// display:block due to http://developer.mozilla.org/en/docs/Images%2C_Tables%2C_and_Mysterious_Gap
// use innerHTML to avoid triggering a firefox dom preference
$('recaptcha_image').innerHTML = "<img style='display:block;' height='57' width='300' src='" + imageurl + "'/>";
}
Recaptcha._css_toggle("recaptcha_had_incorrect_sol", "recaptcha_nothad_incorrect_sol", $ST.is_incorrect);
Recaptcha._css_toggle("recaptcha_is_showing_audio", "recaptcha_isnot_showing_audio", type == 'audio');
$C._clear_input ();
if ($C.should_focus) {
$C.focus_response_field();
}
$C._reset_timer ();
},
_reset_timer : function () {
var $ST = RecaptchaState;
clearInterval(Recaptcha.timer_id);
Recaptcha.timer_id = setInterval ("Recaptcha.reload('t');", ($ST.timeout - 60*5) * 1000);
},
showhelp : function () {
window.open(Recaptcha._get_help_link(),"recaptcha_popup","width=460,height=570,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes");
},
_clear_input : function () {
var resp=Recaptcha.$('recaptcha_response_field');
resp.value = "";
},
_displayerror : function(msg) {
var $=Recaptcha.$;
$('recaptcha_image').innerHTML = '';
$('recaptcha_image').appendChild (document.createTextNode(msg));
},
reloaderror : function (msg) {
Recaptcha._displayerror(msg);
},
_is_ie : function () { return (navigator.userAgent.indexOf("MSIE") > 0) && !window.opera; },
_css_toggle : function (classT, classF, isset) {
// try to do these CSS toggles just on the recaptcha widget. But,
// if that wasn't passed in, go for the document body.
var element = Recaptcha.widget;
if (!element)
element = document.body;
var classname = element.className;
classname = classname.replace(
new RegExp("(^|\\s+)"+ classT + "(\\s+|$)"), ' ');
classname = classname.replace(
new RegExp("(^|\\s+)"+ classF + "(\\s+|$)"), ' ');
classname += " " + (isset ? classT : classF);
element.className = classname;
},
_get_help_link : function () {
var lang = RecaptchaOptions.lang;
return 'http://recaptcha.net/popuphelp/' + (lang == 'en' ? "" : (lang + ".html"));
},
playAgain : function () {
var $ = Recaptcha.$;
$("recaptcha_image").innerHTML = Recaptcha.getAudioCaptchaHtml();
},
getAudioCaptchaHtml : function () {
var $C = Recaptcha;
var $ST = RecaptchaState;
var $ = Recaptcha.$;
var httpwavurl = $ST.server + "image?c=" + $ST.challenge;
if (httpwavurl.indexOf("https://") == 0) {
httpwavurl = "http://" + httpwavurl.substring(8);
}
var swfUrl = $ST.server + "/img/audiocaptcha.swf?v2";
var embedCode;
if ($C._is_ie()) {
embedCode = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="' + swfUrl + '" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>';
} else {
embedCode = '<embed src="' + swfUrl + '" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"></embed> ';
}
var cantHearCode = (Recaptcha.checkFlashVer() ? '<br/><a class="recaptcha_audio_cant_hear_link" href="#" onclick="Recaptcha.playAgain(); return false;">' + RecaptchaStr.play_again + '</a>' : '') +
'<br/><a class="recaptcha_audio_cant_hear_link" target="_blank" href="' + httpwavurl + '">' + RecaptchaStr.cant_hear_this + '</a>';
return embedCode + cantHearCode;
},
gethttpwavurl : function () {
var $ST = RecaptchaState;
if (Recaptcha.type == 'audio') {
var httpwavurl = $ST.server + "image?c=" + $ST.challenge;
if (httpwavurl.indexOf("https://") == 0) {
httpwavurl = "http://" + httpwavurl.substring(8);
}
return httpwavurl;
}
return "";
},
checkFlashVer : function () {
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var flashVer = -1;
if (navigator.plugins != null && navigator.plugins.length > 0) {
if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
var descArray = flashDescription.split(" ");
var tempArrayMajor = descArray[2].split(".");
flashVer = tempArrayMajor[0];
}
} else if ( isIE && isWin && !isOpera ) {
try {
// version will be set for 7.X or greater players
var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
var flashVerStr = axo.GetVariable("$version");
flashVer = flashVerStr.split(" ")[1].split(",")[0];
} catch (e) {
}
}
return flashVer >= 9;
},
getlang : function() {
return RecaptchaOptions.lang;
} 
};
