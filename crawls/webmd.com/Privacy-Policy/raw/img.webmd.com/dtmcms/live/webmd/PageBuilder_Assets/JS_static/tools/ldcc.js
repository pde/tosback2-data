// Lotame Data Collector Call
$(function(){
	webmd = window.webmd || {};

	var ldcc_string;

	window.processauds = function(ldcc_response){
		ldcc_string = 'segvar';

		$.each(ldcc_response["Profile"]["Audiences"]["Audience"], function(k, v){
			ldcc_string += 'l_' + (ldcc_response["Profile"]["Audiences"]["Audience"][k]["abbr"]) + 'x';
		});

		webmd.cookie.setJson('ads_perm', {"segvar": ldcc_string}, {domain: "webmd.com"});
	};

	webmd.load({js: '//ad.crwdcntrl.net/5/c=932/pe=y/callback=processauds'});
	webmd.load({js: '//tags.crwdcntrl.net/c/932/cc_af.js'});
});