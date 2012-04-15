if(typeof webs === 'undefined') webs = {};


/*
 * Customize language selector dropdown
 * @author: Nick Swider
 */
webs.intlDrop = (function(){

	var
		containerSel = '.webs-intl-drop-contain',
		curLangSel = '.webs-intl-drop-current',
		listSel = '.webs-intl-drop-list',
		enSel = '.webs-intl-drop-list-en a',
		esSel = '.webs-intl-drop-list-es a',

		$continer,
		$curLang,
		$list,
		$en,
		$es,

		subdomains = ['www.', 'es.'],
		loggedIn = true,
		protocol,
		host,
		path,

		customize = function(){
			if(!loggedIn)
				$en.attr('href', protocol+'//www.'+host+path+'?resetSession=1');
			else
				$en.attr('href', protocol+'//'+host+path+'?resetSession=1');
			$es.attr('href', protocol+'//es.'+host+path+'?resetSession=1');
			$curLang.html('<span class="webs-intl-drop-word">'+glossary.Language+'</span> '+glossary.CURRENT_LANG);
		},

		init = function(){
			$continer = jQuery(containerSel),
			$curLang = $continer.find(curLangSel),
			$list = $continer.find(listSel),
			$en = $continer.find(enSel),
			$es = $continer.find(esSel),

			protocol = window.location.protocol;
			host = window.location.host;
			path = window.location.pathname;

			jQuery.each(subdomains, function(i, subdomain){
				if(host.indexOf(subdomain) == 0)
					host = host.replace(subdomain, '');
			});

			if(host.indexOf('members.') == -1)
				loggedIn = false;

			customize();
		};

	return {
		init: init
	};
}());

if(typeof jQuery === 'function'){
	jQuery(document).ready(function(){
		webs.intlDrop.init();
	});
}
